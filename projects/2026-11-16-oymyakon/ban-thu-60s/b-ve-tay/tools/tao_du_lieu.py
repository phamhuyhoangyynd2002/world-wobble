#!/usr/bin/env python3
"""Sinh dữ liệu cho bản thử B (animatic vẽ tay), chạy lại ra y hệt.

1. js/du-lieu.js  : mốc bắt đầu từng cảnh (đặt giọng), mốc từ, mốc khẩu hình (đọc từ ../chung/, không sửa chung/).
2. assets/giay.jpg: nền giấy sổ phác thảo có thớ, vẽ bằng code (PIL, hạt giống cố định).
3. timeline.json  : tối thiểu cho mix_audio.py (độ dài, cảnh, sfx, nhạc).

Chạy: python tools/tao_du_lieu.py   (từ thư mục b-ve-tay)
"""
import json
import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHUNG = os.path.join(HERE, "..", "chung")

# Mốc đặt giọng (giây tuyệt đối). Theo bảng phân cảnh, riêng cảnh 5 kéo sớm lên 55,4 s vì "Anyway." đã cắt cứng về hiện tại.
STARTS = {1: 0.4, 2: 12.6, 3: 27.0, 4: 42.2, 5: 55.4}
DURATION = 60.3

# Sfx: (giây tuyệt đối, file, âm lượng). Đặt theo gag trong js/canh.js.
SFX = [
    (0.70, "whoosh", 0.30), (1.62, "bonk", 0.85), (2.38, "whoosh", 0.22),
    (9.60, "whoosh", 0.35), (11.20, "whoosh", 0.45),
    (15.62, "drop", 0.55), (17.55, "tach-bang", 0.40),
    (20.25, "buoc-tuyet", 0.55), (20.62, "buoc-tuyet", 0.55), (21.00, "buoc-tuyet", 0.55),
    (22.15, "pop", 0.75), (22.62, "tach-bang", 0.70), (22.92, "liu-lo-soc", 0.60),
    (25.85, "buoc-tuyet", 0.50), (26.25, "buoc-tuyet", 0.50), (26.65, "buoc-tuyet", 0.50), (27.05, "buoc-tuyet", 0.50),
    (30.55, "bonk", 0.60), (32.92, "drop", 0.90), (32.95, "bonk", 0.55),
    (34.00, "liu-lo-hoi", 0.60), (35.62, "pop", 0.60),
    (36.95, "buoc-tuyet", 0.45), (37.35, "buoc-tuyet", 0.45), (37.75, "buoc-tuyet", 0.45),
    (39.05, "ting", 0.50),
    (41.10, "may-no", 0.35), (42.60, "may-no", 0.35), (44.10, "may-no", 0.35), (45.60, "may-no", 0.30),
    (45.25, "liu-lo-vui", 0.55),
    (48.30, "bonk", 0.40), (49.95, "drop", 0.70),
    (50.85, "hoi-nuoc", 0.45), (52.30, "tach-bang", 0.70), (53.22, "ting", 0.55),
    (56.70, "drop", 0.25), (58.85, "brr", 0.60),
]
MUSIC = {"src": "music/frost-waltz.mp3", "start": 11.1, "end": 53.62, "volume": 0.22}


def du_lieu_js():
    subs = json.load(open(os.path.join(CHUNG, "audio", "subtitles.json"), encoding="utf-8"))
    scenes = []
    for s in subs["scenes"]:
        sid = s["id"]
        cues = json.load(open(os.path.join(CHUNG, "khau-hinh", "scene-%d.json" % sid), encoding="utf-8"))["mouthCues"]
        scenes.append({
            "id": sid,
            "start": STARTS[sid],
            "duration": s["duration"],
            "words": [[w["text"], round(w["start"], 3), round(w["end"], 3)] for w in s["words"]],
            "mouth": [[round(c["start"], 3), round(c["end"], 3), c["value"]] for c in cues],
        })
    js = ("/* Sinh bởi tools/tao_du_lieu.py – không sửa tay. Mốc từ, khẩu hình tính từ đầu mỗi cảnh. */\n"
          "window.WWB_DATA = " + json.dumps({"duration": DURATION, "scenes": scenes}, ensure_ascii=False) + ";\n")
    with open(os.path.join(HERE, "js", "du-lieu.js"), "w", encoding="utf-8") as f:
        f.write(js)


def giay():
    """Giấy sổ phác thảo: nền kem, hạt mịn, thớ sợi, viền tối nhẹ. Hạt giống cố định."""
    W, H = 1920, 1080
    rng = random.Random(1607)
    base = Image.new("RGB", (W, H), (241, 231, 207))
    # hạt: nhiễu thấp phân giải phóng lên (mềm) + nhiễu mịn
    small = Image.new("L", (W // 6, H // 6))
    small.putdata([128 + int(rng.gauss(0, 18)) for _ in range(small.width * small.height)])
    soft = small.resize((W, H), Image.BICUBIC).filter(ImageFilter.GaussianBlur(3))
    fine = Image.new("L", (W, H))
    fine.putdata([128 + int(rng.gauss(0, 10)) for _ in range(W * H)])
    px = base.load()
    sp, fp = soft.load(), fine.load()
    for y in range(H):
        for x in range(W):
            d = (sp[x, y] - 128) * 0.35 + (fp[x, y] - 128) * 0.45
            # viền tối nhẹ (giấy cũ)
            vx, vy = (x - W / 2) / (W / 2), (y - H / 2) / (H / 2)
            v = -10 * max(0.0, (vx * vx + vy * vy) - 0.45)
            r, g, b = px[x, y]
            px[x, y] = (max(0, min(255, int(r + d + v))), max(0, min(255, int(g + d + v))), max(0, min(255, int(b + d * 1.1 + v * 1.2))))
    # thớ sợi giấy
    dr = ImageDraw.Draw(base, "RGBA")
    for _ in range(900):
        x, y = rng.uniform(0, W), rng.uniform(0, H)
        a = rng.uniform(0, math.pi)
        L = rng.uniform(6, 26)
        c = rng.choice([(120, 100, 70, 22), (255, 252, 240, 40), (90, 80, 60, 16)])
        dr.line([(x, y), (x + L * math.cos(a), y + L * math.sin(a))], fill=c, width=1)
    base.save(os.path.join(HERE, "assets", "giay.jpg"), quality=90)


def timeline():
    tl = {
        "_ghi_chu": "Tối thiểu cho mix_audio.py, sinh bởi tools/tao_du_lieu.py",
        "duration": DURATION,
        "scenes": [{"id": k, "start": v} for k, v in sorted(STARTS.items())],
        "sfx": [{"src": os.path.join(HERE, "sfx", n + ".wav").replace("\\", "/"), "at": t, "volume": v} for t, n, v in SFX],
        "music": {"volume": MUSIC["volume"], "crossfade": 0.5,
                  "segments": [{"src": os.path.join(HERE, MUSIC["src"]).replace("\\", "/"), "start": MUSIC["start"],
                                "end": MUSIC["end"], "mood": "hoi-uc"}]},
    }
    with open(os.path.join(HERE, "timeline.json"), "w", encoding="utf-8") as f:
        json.dump(tl, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    du_lieu_js()
    timeline()
    if not os.path.exists(os.path.join(HERE, "assets", "giay.jpg")):
        giay()
    print("xong")
