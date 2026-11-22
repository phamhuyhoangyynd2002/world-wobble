#!/usr/bin/env python3
"""Dựng clip dọc 1080×1920 từ video dài theo out/clip-doc/ke-hoach.json.

Chạy:  python .claude/skills/cat-clip-doc/scripts/dung_clip_doc.py <dự án> [--chi k1,k3]
Ghi:   <dự án>/out/clip-doc/<id>.mp4        clip dọc 30 fps, H.264 + AAC
       <dự án>/out/clip-doc/<id>-khung.jpg  tờ 4 khung để xem bằng mắt
       <dự án>/out/clip-doc/<id>.md         chữ đăng cho Shorts / TikTok / Reels

Bố cục dựng lại (không chỉ thêm viền, luật video-dai-youtube.md):
  0–150     chừa cho thanh trên của ứng dụng
  150–420   câu mồi (tieu_de), Fraunces đậm, chữ mực trên giấy
  430–1240  cảnh hoạt hình: cắt 4:3 theo crop_x rồi phóng 1080×810 (hoặc toan_canh: cả khung 16:9)
  1270–1560 phụ đề to theo mốc từng từ, từ đang đọc tô màu nhấn
  1560–1920 Wob nhún nhảy (SVG của kênh) + dòng dẫn về bản dài
  2,5 giây cuối: thẻ "Full trip on YouTube"
Phụ đề lấy nguyên lời đọc đã kiểm chứng (timeline.json), không thêm khẳng định mới.
Cần FFmpeg (libass) và Chrome/Edge.
"""
import argparse
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[4]
SHARED = ROOT / "templates" / "_shared"
FONT = SHARED / "fonts" / "Fraunces-Variable.ttf"
sys.path.insert(0, str(ROOT / "kenh" / "nhan-dien" / "nguon"))
from tao_nhan_dien import find_browser  # noqa: E402

W, H = 1080, 1920
PAPER, INK, ACCENT, SEA = "#f7ecd3", "#1f2326", "#e0703a", "#5a9fb8"
VID_Y = 430


def u(p):
    return pathlib.Path(p).as_uri()


def shot(browser, html, dest, w, h, transparent=False):
    cmd = [browser, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--hide-scrollbars",
           f"--window-size={w},{h}", "--virtual-time-budget=2500", f"--screenshot={dest}"]
    if transparent:
        cmd.append("--default-background-color=00000000")
    subprocess.run(cmd + [u(html)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)


HEAD = """<!doctype html><html><head><meta charset="utf-8"><style>
@font-face {{ font-family: F; src: url("{font}"); font-weight: 100 900; }}
html,body {{ margin:0; width:{w}px; height:{h}px; overflow:hidden; background:{bg}; position:relative; }}
* {{ font-family: F, serif; font-variation-settings: "SOFT" 100, "WONK" 1; box-sizing:border-box; }}
</style></head><body>"""


def page(tmp, name, w, h, bg, body):
    p = pathlib.Path(tmp) / (name + ".html")
    p.write_text(HEAD.format(font=u(FONT), w=w, h=h, bg=bg) + body + "</body></html>", encoding="utf-8")
    return p


def nen_html(tieu_de, handle, vid_h):
    return f"""
<div style="position:absolute;left:70px;right:70px;top:150px;height:270px;display:flex;align-items:center;justify-content:center;text-align:center;text-wrap:balance;
  color:{INK};font-weight:900;font-size:{92 if len(tieu_de) <= 26 else 78}px;line-height:1.02">{tieu_de}</div>
<div style="position:absolute;left:0;right:0;top:{VID_Y - 12}px;height:{vid_h + 24}px;background:{INK}"></div>
<svg width="{W}" height="40" style="position:absolute;left:0;top:{VID_Y + vid_h + 14}px"><path d="M 60 20 C 200 4 340 34 540 18 C 740 2 880 34 1020 16" stroke="{ACCENT}" stroke-width="9" fill="none" stroke-linecap="round"/></svg>
<div style="position:absolute;left:330px;right:60px;top:1640px;color:{INK};font-weight:700;font-size:44px;line-height:1.2">
  Full trip on YouTube<div style="color:{ACCENT};font-size:40px">{handle}</div></div>"""


def the_cuoi_html(handle):
    return f"""<div style="position:absolute;inset:0;background:#f7ecd3"></div>
<img src="{u(SHARED / 'wob' / 'dong-goi.svg')}" style="position:absolute;left:290px;top:520px;width:500px;height:500px">
<div style="position:absolute;left:60px;right:60px;top:1060px;text-align:center;color:{INK};font-weight:900;font-size:96px;line-height:1">The full trip<br>is on YouTube</div>
<div style="position:absolute;left:0;right:0;top:1330px;text-align:center;color:{ACCENT};font-weight:800;font-size:64px">{handle}</div>"""


def ass_time(t):
    t = max(0, t)
    return "%d:%02d:%05.2f" % (t // 3600, (t % 3600) // 60, t % 60)


def ass_doc(caps, start, end, vid_h):
    """Phụ đề từng cụm 2–4 từ, từ đang đọc tô màu nhấn (karaoke bằng nhiều sự kiện)."""
    y = VID_Y + vid_h + 190
    acc = "&H%s%s%s&" % (ACCENT[5:7], ACCENT[3:5], ACCENT[1:3])
    ink = "&H%s%s%s&" % (INK[5:7], INK[3:5], INK[1:3])
    lines = [
        "[Script Info]", "ScriptType: v4.00+", f"PlayResX: {W}", f"PlayResY: {H}", "WrapStyle: 0", "",
        "[V4+ Styles]",
        "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
        f"Style: C,Fraunces,84,{ink},{ink},&H00F7ECD3,&H00000000,1,0,0,0,100,100,0,0,1,0,0,5,60,60,0,1",
        "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    ]
    words = [w for c in caps for w in c.get("words", []) if w["end"] > start and w["start"] < end]
    groups, cur = [], []
    for w in words:
        cur.append(w)
        if len(cur) >= 4 or w["text"].rstrip().endswith((".", "?", "!", ",")) and len(cur) >= 2:
            groups.append(cur)
            cur = []
    if cur:
        groups.append(cur)
    for gi, g in enumerate(groups):
        g_end = groups[gi + 1][0]["start"] if gi + 1 < len(groups) else g[-1]["end"] + 0.4
        g_end = min(g_end, g[-1]["end"] + 0.6)
        for wi, w in enumerate(g):
            s = w["start"]
            e = g[wi + 1]["start"] if wi + 1 < len(g) else g_end
            txt = " ".join(("{\\c%s}%s{\\c%s}" % (acc, x["text"], ink)) if k == wi else x["text"] for k, x in enumerate(g))
            lines.append("Dialogue: 0,%s,%s,C,,0,0,0,,{\\pos(%d,%d)}%s" % (ass_time(s - start), ass_time(e - start), W // 2, y, txt))
    return "\n".join(lines) + "\n"


def check_title(clip):
    warn = []
    t = clip.get("tieu_de", "")
    if len(t.split()) > 7:
        warn.append("tieu_de dài hơn 7 từ")
    if re.search(r"\d", t):
        warn.append("tieu_de có chữ số: phải khớp một khẳng định trong đoạn (%s)" % (", ".join(clip.get("claims", [])) or "đoạn không có khẳng định"))
    d = clip["end"] - clip["start"]
    if d > 60:
        warn.append("dài %.0fs > 60s (Shorts tối đa 3 phút, nhưng clip kéo người xem nên giữ ≤ 60s)" % d)
    if d < 15:
        warn.append("ngắn %.0fs" % d)
    return warn


def build(du_an, plan, clip, browser, tmp):
    src = du_an / plan.get("nguon", "out/video.mp4")
    out = du_an / "out" / "clip-doc"
    tl = json.loads((du_an / "timeline.json").read_text(encoding="utf-8"))
    start, end = float(clip["start"]), float(clip["end"])
    dur = end - start
    full = bool(clip.get("toan_canh"))
    vid_h = 608 if full else 810
    handle = plan.get("handle", "@WorldWobble")
    wob = clip.get("wob", "hao-hung")
    if not (SHARED / "wob" / (wob + ".svg")).exists():
        print("  CẢNH BÁO: không có biểu cảm", wob, "→ dùng hao-hung")
        wob = "hao-hung"

    d = pathlib.Path(tmp) / clip["id"]
    d.mkdir()
    shot(browser, page(d, "nen", W, H, PAPER, nen_html(clip["tieu_de"], handle, vid_h)), d / "nen.png", W, H)
    shot(browser, page(d, "cuoi", W, H, "transparent", the_cuoi_html(handle)), d / "cuoi.png", W, H, True)
    shot(browser, page(d, "wob", 300, 300, "transparent",
                       f'<img src="{u(SHARED / "wob" / (wob + ".svg"))}" style="width:300px;height:300px">'), d / "wob.png", 300, 300, True)
    (d / "c.ass").write_text(ass_doc(tl["captions"], start, end, vid_h), encoding="utf-8")
    shutil.copy(FONT, d / "Fraunces.ttf")

    if full:
        vf = "[0:v]scale=1080:608,setsar=1[v]"
    else:
        # vùng 4:3 bắt đầu từ y=140 để không lấy logo góc phải trên của bản dài (logo nằm trong y < 130);
        # giu_tren: true lấy cả chiều cao (khi đầu nhân vật ở sát mép trên), lúc đó chọn crop_x tránh góc phải
        cw, ch, cy = (1440, 1080, 0) if clip.get("giu_tren") else (1253, 940, 140)
        x = int((1920 - cw) * min(1, max(0, float(clip.get("crop_x", 0.5)))))
        vf = f"[0:v]crop={cw}:{ch}:{x}:{cy},scale=1080:810:flags=lanczos,setsar=1[v]"
    endcard_at = max(0, dur - 2.5)
    fc = (
        vf + ";"
        f"[1:v][v]overlay=0:{VID_Y}[a];"
        f"[a][2:v]overlay=x=30:y='1590+12*sin(2*PI*t*0.9)'[b];"
        f"[b]ass=c.ass:fontsdir=.[c];"
        f"[3:v]format=rgba,fade=t=in:st={endcard_at:.2f}:d=0.4:alpha=1[e];"
        f"[c][e]overlay=0:0:enable='gte(t,{endcard_at:.2f})',format=yuv420p[o];"
        f"[0:a]afade=t=in:d=0.25,afade=t=out:st={max(0, dur - 0.7):.2f}:d=0.7[au]"
    )
    dest = out / (clip["id"] + ".mp4")
    cmd = ["ffmpeg", "-y", "-v", "error", "-ss", f"{start:.3f}", "-t", f"{dur:.3f}", "-i", str(src),
           "-loop", "1", "-i", "nen.png", "-loop", "1", "-i", "wob.png", "-loop", "1", "-i", "cuoi.png",
           "-filter_complex", fc, "-map", "[o]", "-map", "[au]", "-t", f"{dur:.3f}", "-r", "30",
           "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(dest)]
    subprocess.run(cmd, cwd=d, check=True)

    # tờ 4 khung để xem bằng mắt
    sheet = out / (clip["id"] + "-khung.jpg")
    ts = [1.0, dur * 0.4, dur * 0.75, dur - 1.0]
    from PIL import Image
    tiles = []
    for k, t in enumerate(ts):
        f = d / ("k%d.png" % k)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", "%.2f" % t, "-i", str(dest), "-frames:v", "1",
                        "-vf", "scale=360:640", str(f)], check=True)
        tiles.append(Image.open(f).convert("RGB"))
    im = Image.new("RGB", (360 * len(tiles) + 12 * (len(tiles) - 1), 640), "#1f2326")
    for k, t in enumerate(tiles):
        im.paste(t, (k * 372, 0))
    im.save(sheet, quality=88)

    claims_ids = ", ".join(clip.get("claims", [])) or "không có"
    (out / (clip["id"] + ".md")).write_text(f"""# Clip {clip['id']}: {clip['tieu_de']}

- Đoạn gốc: {ass_time(start)} → {ass_time(end)} ({dur:.0f}s), khẳng định trong đoạn: {claims_ids}
- File: `{clip['id']}.mp4` (1080×1920)

## YouTube Shorts
Title: {clip['tieu_de']} #shorts
Description:
{clip.get('text', '')[:200]}...
Full trip: <link video dài>
Narration voice and illustrations are AI-assisted. Facts checked against sources in the full video.

## TikTok / Instagram Reels
{clip['tieu_de']}. Full trip on YouTube ({handle}).
Voice and illustrations AI-assisted.
#geography #travel #weirdplaces #worldwobble
""", encoding="utf-8")
    return dest, sheet


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("du_an")
    ap.add_argument("--chi", help="chỉ dựng các id, cách nhau bằng dấu phẩy")
    a = ap.parse_args()
    du_an = pathlib.Path(a.du_an).resolve()
    plan = json.loads((du_an / "out" / "clip-doc" / "ke-hoach.json").read_text(encoding="utf-8"))
    if not (du_an / plan.get("nguon", "out/video.mp4")).exists():
        sys.exit("LỖI: không có video nguồn " + plan.get("nguon", "out/video.mp4"))
    browser = find_browser()
    if not browser:
        sys.exit("LỖI: không thấy Chrome/Edge")
    only = set(a.chi.split(",")) if a.chi else None
    loi = 0
    with tempfile.TemporaryDirectory() as tmp:
        for clip in plan["clips"]:
            if only and clip["id"] not in only:
                continue
            for w in check_title(clip):
                print("  CẢNH BÁO", clip["id"], w)
            try:
                dest, sheet = build(du_an, plan, clip, browser, tmp)
                print("ghi", dest.relative_to(du_an), "+", sheet.name)
            except subprocess.CalledProcessError as e:
                loi += 1
                print("LỖI", clip["id"], e)
    sys.exit(1 if loi else 0)


if __name__ == "__main__":
    main()
