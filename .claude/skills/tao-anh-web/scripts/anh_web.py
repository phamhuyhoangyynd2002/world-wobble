#!/usr/bin/env python3
"""Phần chạy được bằng lệnh của skill tao-anh-web (tạo ảnh trên ChatGPT web / Gemini web qua Browser MCP).

Claude điều khiển trình duyệt; script này lo phần trước và sau:

  prompt  Ghép prompt đầy đủ (phong cách kênh + cảnh + rào chắn), lọc từ cấm, kiểm ảnh đã có, kiểm số ảnh hôm nay.
          python3 anh_web.py prompt <dự án> --id ai-village-dusk --prompt "a tiny village ... at dusk" [--nguon chatgpt-web]

  nhan    Nhận file ảnh đã tải từ trình duyệt: lưu bản gốc (giữ siêu dữ liệu C2PA), cắt giữa về 16:9, đưa về 1920×1080,
          ghi assets/manifest.json, cộng số đếm.
          python3 anh_web.py nhan <dự án> --id ai-village-dusk --file <ảnh tải về> --nguon chatgpt-web \
              --da-xem --tai-khoan-rieng [--model "<tên model nếu giao diện ghi>"] [--scenes 2,3] [--tai-hien-su-kien]

  dem     Số ảnh đã tạo hôm nay theo từng nguồn.
          python3 anh_web.py dem

Luật: .claude/rules/chinh-xac-va-ban-quyen.md mục 3. Bộ lọc từ cấm và câu rào chắn dùng chung với tao_anh_ai.py.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(ROOT / ".claude" / "skills" / "lay-tai-nguyen" / "scripts"))
import manifest  # noqa: E402
from tao_anh_ai import BANNED, GUARD  # noqa: E402

NGUON = {
    "chatgpt-web": {
        "ten": "ChatGPT web (gói miễn phí)",
        "dieu_khoan": "https://openai.com/policies/row-terms-of-use/",
        "can_cu": "Điều khoản OpenAI: người dùng sở hữu Output; dùng thương mại được",
    },
    "gemini-web": {
        "ten": "Gemini web (gói miễn phí)",
        "dieu_khoan": "https://policies.google.com/terms/generative-ai",
        "can_cu": "Điều khoản Google: Google không nhận quyền sở hữu nội dung người dùng tạo",
    },
}
# Mức trần tự đặt mỗi ngày cho mỗi nguồn: gói miễn phí giới hạn động (ChatGPT thường 2–3 ảnh/ngày theo cộng đồng),
# và tạo dồn dập từ một tài khoản dễ bị coi là truy cập tự động. Gặp thông báo hết lượt thì dừng sớm hơn mức này.
TRAN_NGAY = {"chatgpt-web": 25, "gemini-web": 25}
DEM = ROOT / ".cache" / "anh-web-dem.json"
W, H = 1920, 1080


def doc_dem() -> dict:
    if DEM.exists():
        return json.loads(DEM.read_text(encoding="utf-8"))
    return {}


def hom_nay(dem: dict) -> dict:
    return dem.get(dt.date.today().isoformat(), {})


def cmd_prompt(a) -> int:
    project = Path(a.project)
    dest = project / "assets" / "ai" / f"{a.id}.png"
    if dest.exists() and not a.lam_lai:
        print(f"Đã có {dest}, không tạo lại (thêm --lam-lai nếu thật sự cần)")
        return 2
    m = BANNED.search(a.prompt)
    if m:
        print(f"TỪ CHỐI: prompt có '{m.group(0)}': không xin ảnh như ảnh chụp, không bắt chước phong cách hay nhân vật "
              "có sẵn, không vẽ bản đồ bằng AI")
        return 1
    if a.nguon:
        n = hom_nay(doc_dem()).get(a.nguon, 0)
        if n >= TRAN_NGAY[a.nguon]:
            print(f"DỪNG: hôm nay đã tạo {n} ảnh trên {a.nguon} (trần tự đặt {TRAN_NGAY[a.nguon]}). Chuyển nguồn khác hoặc để mai.")
            return 3
    style_file = ROOT / "templates" / "_shared" / "phong-cach-anh.txt"
    style = style_file.read_text(encoding="utf-8").strip() if style_file.exists() else ""
    if not style or style.startswith("TODO"):
        print("CẢNH BÁO: templates/_shared/phong-cach-anh.txt chưa chốt phong cách; dùng gợi ý khởi điểm trong file",
              file=sys.stderr)
        quoted = re.findall(r'"([^"]{40,})"', style)  # đoạn gợi ý dài nhất trong ngoặc kép
        style = max(quoted, key=len) if quoted else ""
    ratio = "Wide landscape 16:9 image." if a.ratio == "16:9" else f"Aspect ratio {a.ratio}."
    scene = a.prompt.strip()
    if scene and scene[-1] not in ".!?":
        scene += "."
    full = " ".join(x for x in (style, scene, GUARD, ratio) if x)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.with_suffix(".prompt.txt").write_text(full + "\n", encoding="utf-8")
    print(full)
    return 0


def cmd_nhan(a) -> int:
    from PIL import Image

    if not a.da_xem:
        print("LỖI: phải mở ảnh xem (Read) trước, rồi thêm --da-xem: không watermark/logo, không chữ lạ, rõ là tranh vẽ, "
              "không bản đồ, không người thật nhận ra được")
        return 1
    if not a.tai_khoan_rieng:
        print("LỖI: chỉ nhận ảnh tạo bằng tài khoản riêng (không phải tài khoản Google/YouTube của kênh): thêm "
              "--tai-khoan-rieng sau khi người làm kênh đã xác nhận trong phiên này")
        return 1
    project = Path(a.project)
    src = Path(a.file).expanduser()
    if not src.exists():
        print(f"LỖI: không thấy {src}")
        return 1
    prompt_file = project / "assets" / "ai" / f"{a.id}.prompt.txt"
    if not prompt_file.exists():
        print(f"LỖI: thiếu {prompt_file}; chạy lệnh prompt trước để prompt được ghi lại")
        return 1
    full = prompt_file.read_text(encoding="utf-8").strip()

    goc = project / "assets" / "ai" / "goc" / f"{a.id}{src.suffix.lower() or '.png'}"
    goc.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, goc)  # bản gốc giữ nguyên byte (gồm C2PA/SynthID nếu có)

    im = Image.open(src).convert("RGB")
    w, h = im.size
    target = W / H
    if w / h > target:
        nw = round(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = round(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    cw = im.size[0]
    if cw < 1280:
        print(f"CẢNH BÁO: ảnh gốc chỉ rộng {cw}px sau khi cắt 16:9; phóng lên 1920 sẽ mờ trên TV")
    im = im.resize((W, H), Image.LANCZOS)
    dest = project / "assets" / "ai" / f"{a.id}.png"
    im.save(dest, optimize=True)

    info = NGUON[a.nguon]
    manifest.put(project, a.id, {
        "file": dest.relative_to(project).as_posix(), "kind": "anh-ai", "basis": "ai-tao",
        "license": f"Kênh tự tạo bằng AI trên {info['ten']} (không có bản quyền ở Mỹ nếu chỉ từ prompt). {info['can_cu']}",
        "license_url": info["dieu_khoan"], "author": "World Wobble (AI)", "source_url": None, "attribution": None,
        "prompt": full, "model": a.model or f"{info['ten']}, model không hiển thị",
        "nguon": a.nguon, "file_goc": goc.relative_to(project).as_posix(), "kich_thuoc_goc": [w, h],
        "watermark_da_kiem": True, "tai_khoan_rieng": True,
        "scenes": manifest.parse_scenes(a.scenes), "tai_hien_su_kien": True if a.tai_hien_su_kien else None,
    })
    dem = doc_dem()
    today = dt.date.today().isoformat()
    dem.setdefault(today, {})[a.nguon] = dem.get(today, {}).get(a.nguon, 0) + 1
    DEM.parent.mkdir(parents=True, exist_ok=True)
    DEM.write_text(json.dumps(dem, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Xong: {dest} (gốc {w}×{h} → {W}×{H}) · {a.nguon} · hôm nay {dem[today][a.nguon]} ảnh trên nguồn này")
    return 0


def cmd_dem(_a) -> int:
    d = hom_nay(doc_dem())
    for k in NGUON:
        print(f"{k}: {d.get(k, 0)}/{TRAN_NGAY[k]} hôm nay")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("prompt")
    p.add_argument("project"); p.add_argument("--id", required=True); p.add_argument("--prompt", required=True)
    p.add_argument("--ratio", default="16:9"); p.add_argument("--nguon", choices=sorted(NGUON))
    p.add_argument("--lam-lai", action="store_true")
    n = sub.add_parser("nhan")
    n.add_argument("project"); n.add_argument("--id", required=True); n.add_argument("--file", required=True)
    n.add_argument("--nguon", required=True, choices=sorted(NGUON)); n.add_argument("--model")
    n.add_argument("--scenes"); n.add_argument("--tai-hien-su-kien", action="store_true")
    n.add_argument("--da-xem", action="store_true"); n.add_argument("--tai-khoan-rieng", action="store_true")
    sub.add_parser("dem")
    a = ap.parse_args()
    return {"prompt": cmd_prompt, "nhan": cmd_nhan, "dem": cmd_dem}[a.cmd](a)


if __name__ == "__main__":
    sys.exit(main())
