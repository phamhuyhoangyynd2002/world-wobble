#!/usr/bin/env python3
"""Dựng clip dọc 1080×1920 từ video dài theo out/clip-doc/ke-hoach.json.

Chạy:  python .claude/skills/cat-clip-doc/scripts/dung_clip_doc.py <dự án> [--chi k1,k3]
Ghi:   <dự án>/out/clip-doc/<id>.mp4        clip dọc 30 fps, H.264 + AAC
       <dự án>/out/clip-doc/<id>-5giay.jpg  8 khung trong 5 giây đầu (0; 0,5; 1; 1,5; 2; 3; 4; 5 s)
       <dự án>/out/clip-doc/<id>-khung.jpg  4 khung rải phần còn lại
       <dự án>/out/clip-doc/<id>.md         chữ đăng cho Shorts / TikTok / Reels
Sau đó BẮT BUỘC chạy kiem_5_giay.py.

Bố cục dựng lại (không chỉ thêm viền, luật video-dai-youtube.md):
  0–150     chừa cho thanh trên của ứng dụng
  150–420   câu mồi (tieu_de), có ngay từ khung 0
  430–1240  cảnh hoạt hình: cắt 4:3 từ y=140 (bỏ logo bản dài) theo crop_x, hoặc toan_canh: cả khung 16:9
  1270–1560 phụ đề to theo mốc từng từ, từ đang đọc tô màu nhấn; cụm đầu hiện từ khung 0
  1560–1920 Wob nhún nhảy; dòng "Full trip on YouTube" chỉ hiện SAU giây thứ 5
  2,5 giây cuối: thẻ "The full trip is on YouTube" phủ kín

5 giây đầu (mo_dau.py giải thích vì sao):
  - Khung 0 đã có cảnh, câu mồi, phụ đề, Wob; tiếng vào ngay (fade 40 ms, không nuốt chữ đầu).
  - Cảnh bắt đầu phóng 1,07 rồi lùi về 1,0 trong 5 giây: luôn có chuyển động kể cả khi cảnh gốc đứng.
  - Không có lời kêu gọi rời clip trong 5 giây đầu.
  - teaser {tu, den} (tuỳ chọn): đặt câu đắt nhất của chính đoạn đó lên đầu, rồi cắt về đầu đoạn.
    Câu teaser nằm trong đoạn, nên người xem nghe lại nó đúng ngữ cảnh; không thêm khẳng định mới.
Phụ đề lấy nguyên lời đọc đã kiểm chứng (timeline.json).
"""
import argparse
import json
import pathlib
import shutil
import subprocess
import sys
import tempfile

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[3]
SHARED = ROOT / "templates" / "_shared"
FONT = SHARED / "fonts" / "Fraunces-Variable.ttf"
sys.path.insert(0, str(ROOT / "kenh" / "nhan-dien" / "nguon"))
sys.path.insert(0, str(HERE))
from tao_nhan_dien import find_browser  # noqa: E402
from mo_dau import danh_gia_cau_mo, kiem_tieu_de, trung_cau_mo  # noqa: E402

W, H = 1080, 1920
PAPER, INK, ACCENT = "#f7ecd3", "#1f2326", "#e0703a"
VID_Y = 430
CTA_SAU = 5.0      # giây: lời kêu gọi rời clip chỉ hiện sau mốc này
ZOOM0 = 1.07       # phóng ban đầu, lùi về 1,0 trong 5 giây
FADE_IN = 0.04


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


def nen_html(tieu_de, vid_h):
    size = 96 if len(tieu_de) <= 24 else (84 if len(tieu_de) <= 32 else 74)
    return f"""
<div style="position:absolute;left:70px;right:70px;top:150px;height:270px;display:flex;align-items:center;justify-content:center;
  text-align:center;text-wrap:balance;color:{INK};font-weight:900;font-size:{size}px;line-height:1.02">{tieu_de}</div>
<div style="position:absolute;left:0;right:0;top:{VID_Y - 12}px;height:{vid_h + 24}px;background:{INK}"></div>
<svg width="{W}" height="40" style="position:absolute;left:0;top:{VID_Y + vid_h + 14}px"><path d="M 60 20 C 200 4 340 34 540 18 C 740 2 880 34 1020 16" stroke="{ACCENT}" stroke-width="9" fill="none" stroke-linecap="round"/></svg>"""


def cta_html(handle):
    return f"""<div style="position:absolute;left:330px;right:60px;top:1640px;color:{INK};font-weight:700;font-size:44px;line-height:1.2">
  Full trip on YouTube<div style="color:{ACCENT};font-size:40px">{handle}</div></div>"""


def the_cuoi_html(handle):
    return f"""<div style="position:absolute;inset:0;background:{PAPER}"></div>
<img src="{u(SHARED / 'wob' / 'dong-goi.svg')}" style="position:absolute;left:290px;top:520px;width:500px;height:500px">
<div style="position:absolute;left:60px;right:60px;top:1060px;text-align:center;color:{INK};font-weight:900;font-size:96px;line-height:1">The full trip<br>is on YouTube</div>
<div style="position:absolute;left:0;right:0;top:1330px;text-align:center;color:{ACCENT};font-weight:800;font-size:64px">{handle}</div>"""


def ass_time(t):
    t = max(0, t)
    return "%d:%02d:%05.2f" % (t // 3600, (t % 3600) // 60, t % 60)


def ass_doc(caps, segs, vid_h):
    """segs: [(a, b, offset)] giây tuyệt đối trong bản dài → giây trong clip = t − a + offset.
    Phụ đề từng cụm 2–4 từ, từ đang đọc tô màu nhấn. Cụm đầu tiên hiện từ khung 0."""
    y = VID_Y + vid_h + 190
    acc = "&H%s%s%s&" % (ACCENT[5:7], ACCENT[3:5], ACCENT[1:3])
    ink = "&H%s%s%s&" % (INK[5:7], INK[3:5], INK[1:3])
    out = [
        "[Script Info]", "ScriptType: v4.00+", f"PlayResX: {W}", f"PlayResY: {H}", "WrapStyle: 0", "",
        "[V4+ Styles]",
        "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
        f"Style: C,Fraunces,84,{ink},{ink},&H00F7ECD3,&H00000000,1,0,0,0,100,100,0,0,1,0,0,5,60,60,0,1",
        "", "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    ]
    first = True
    for a, b, off in segs:
        words = [dict(w, start=w["start"] - a + off, end=w["end"] - a + off)
                 for c in caps for w in c.get("words", []) if w["end"] > a and w["start"] < b]
        seg_end = b - a + off
        groups, cur = [], []
        for w in words:
            cur.append(w)
            if len(cur) >= 4 or (w["text"].rstrip().endswith((".", "?", "!", ",")) and len(cur) >= 2):
                groups.append(cur)
                cur = []
        if cur:
            groups.append(cur)
        for gi, g in enumerate(groups):
            g_end = groups[gi + 1][0]["start"] if gi + 1 < len(groups) else min(seg_end, g[-1]["end"] + 0.6)
            g_end = min(g_end, g[-1]["end"] + 0.6, seg_end)
            for wi, w in enumerate(g):
                s = w["start"]
                if first:
                    s, first = off, False  # khung 0 đã có chữ
                e = g[wi + 1]["start"] if wi + 1 < len(g) else g_end
                txt = " ".join(("{\\c%s}%s{\\c%s}" % (acc, x["text"], ink)) if k == wi else x["text"] for k, x in enumerate(g))
                out.append("Dialogue: 0,%s,%s,C,,0,0,0,,{\\pos(%d,%d)}%s" % (ass_time(s), ass_time(e), W // 2, y, txt))
    return "\n".join(out) + "\n"


def cau_dau(caps, t):
    for i, c in enumerate(caps):
        if c["end"] > t + 0.05:
            return c["text"].strip(), (caps[i + 1]["text"] if i + 1 < len(caps) else "")
    return "", ""


def kiem_ke_hoach(clip, caps):
    """Cảnh báo (in ra) và lỗi (chặn dựng)."""
    warn, err = [], []
    err += kiem_tieu_de(clip.get("tieu_de", ""))
    d = clip["end"] - clip["start"]
    if d > 60:
        warn.append("đoạn dài %.0fs > 60s" % d)
    if d < 15:
        warn.append("đoạn ngắn %.0fs" % d)
    t = clip.get("teaser")
    cau, ke = cau_dau(caps, t["tu"] if t else clip["start"])
    _, loi, _ = danh_gia_cau_mo(cau, ke)
    if loi:
        err.append("câu mở '%s': %s" % (cau, "; ".join(loi)))
    if trung_cau_mo(clip.get("tieu_de", ""), cau):
        err.append("câu mồi lặp lại câu mở '%s': chữ trên đầu phải thêm điều lời chưa nói" % cau)
    if t:
        if not (clip["start"] <= t["tu"] < t["den"] <= clip["end"]):
            err.append("teaser phải nằm trong đoạn (để không thêm lời mới)")
        if not 0.8 <= t["den"] - t["tu"] <= 4.0:
            err.append("teaser dài %.1fs, cần 0,8–4 s" % (t["den"] - t["tu"]))
    return warn, err


def strip(dest, times, path, d, w=270, h=480):
    from PIL import Image
    tiles = []
    for k, t in enumerate(times):
        f = d / ("s%d.png" % k)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", "%.2f" % t, "-i", str(dest), "-frames:v", "1",
                        "-vf", f"scale={w}:{h}", str(f)], check=True)
        tiles.append(Image.open(f).convert("RGB"))
    im = Image.new("RGB", (w * len(tiles) + 10 * (len(tiles) - 1), h), "#1f2326")
    for k, t in enumerate(tiles):
        im.paste(t, (k * (w + 10), 0))
    im.save(path, quality=88)


def build(du_an, plan, clip, browser, tmp):
    src = du_an / plan.get("nguon", "out/video.mp4")
    out = du_an / "out" / "clip-doc"
    tl = json.loads((du_an / "timeline.json").read_text(encoding="utf-8"))
    start, end = float(clip["start"]), float(clip["end"])
    dur = end - start
    t = clip.get("teaser")
    tlen = (t["den"] - t["tu"]) if t else 0.0
    total = tlen + dur
    full = bool(clip.get("toan_canh"))
    vid_h = 608 if full else 810
    handle = plan.get("handle", "@WorldWobble")
    wob = clip.get("wob", "hao-hung")
    if not (SHARED / "wob" / (wob + ".svg")).exists():
        print("  CẢNH BÁO: không có biểu cảm", wob, "→ dùng hao-hung")
        wob = "hao-hung"

    d = pathlib.Path(tmp) / clip["id"]
    d.mkdir()
    shot(browser, page(d, "nen", W, H, PAPER, nen_html(clip["tieu_de"], vid_h)), d / "nen.png", W, H)
    shot(browser, page(d, "cta", W, H, "transparent", cta_html(handle)), d / "cta.png", W, H, True)
    shot(browser, page(d, "cuoi", W, H, "transparent", the_cuoi_html(handle)), d / "cuoi.png", W, H, True)
    shot(browser, page(d, "wob", 300, 300, "transparent",
                       f'<img src="{u(SHARED / "wob" / (wob + ".svg"))}" style="width:300px;height:300px">'), d / "wob.png", 300, 300, True)
    segs = ([(t["tu"], t["den"], 0.0)] if t else []) + [(start, end, tlen)]
    (d / "c.ass").write_text(ass_doc(tl["captions"], segs, vid_h), encoding="utf-8")
    shutil.copy(FONT, d / "Fraunces.ttf")

    # đầu vào: 0 = đoạn chính, 1 nền, 2 wob, 3 thẻ cuối, 4 cta, [5 = teaser]
    inputs = ["-ss", f"{start:.3f}", "-t", f"{dur:.3f}", "-i", str(src),
              "-loop", "1", "-i", "nen.png", "-loop", "1", "-i", "wob.png", "-loop", "1", "-i", "cuoi.png",
              "-loop", "1", "-i", "cta.png"]
    if t:
        inputs += ["-ss", f"{t['tu']:.3f}", "-t", f"{tlen:.3f}", "-i", str(src)]
        # mốc thời gian sau khi tua không bắt đầu từ 0 → đặt lại, nếu không khung 0 thiếu cảnh (lỗi đã gặp 23/11)
        pre = ("[5:v]setpts=PTS-STARTPTS[tv];[0:v]setpts=PTS-STARTPTS[mv];"
               "[5:a]asetpts=PTS-STARTPTS,afade=t=out:st=%.2f:d=0.05[ta];[0:a]asetpts=PTS-STARTPTS,afade=t=in:d=0.03[ma];"
               "[tv][ta][mv][ma]concat=n=2:v=1:a=1[cv][ca];" % max(0, tlen - 0.05))
        vin, ain = "[cv]", "[ca]"
    else:
        pre, vin, ain = "[0:v]setpts=PTS-STARTPTS[mv];[0:a]asetpts=PTS-STARTPTS[ma];", "[mv]", "[ma]"

    if full:
        base = f"{vin}scale=1080:608:flags=lanczos,setsar=1"
        bw, bh = 1080, 608
    else:
        # vùng 4:3 bắt đầu từ y=140 để không lấy logo góc phải trên của bản dài (logo nằm trong y < 130).
        # Số đo theo hệ thiết kế 1920×1080; bản dài 2560×1440 (từ tập 4) thì nhân k để cắt từ hình nét hơn.
        sw = int(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width",
                                 "-of", "csv=p=0", str(src)], capture_output=True, text=True, check=True).stdout.strip())
        k = sw / 1920
        cw, ch, cy = (1440, 1080, 0) if clip.get("giu_tren") else (1253, 940, 140)
        cw, ch, cy = (2 * round(v * k / 2) for v in (cw, ch, cy))
        x = int((sw - cw) * min(1, max(0, float(clip.get("crop_x", 0.5)))))
        base = f"{vin}crop={cw}:{ch}:{x}:{cy},scale=1080:810:flags=lanczos,setsar=1"
        bw, bh = 1080, 810
    z = f"(1+{ZOOM0 - 1:.3f}*max(0\\,1-t/5))"
    zoom = (f",scale=w='2*trunc({bw}*{z}/2)':h='2*trunc({bh}*{z}/2)':eval=frame:flags=bicubic,"
            f"crop={bw}:{bh}:(iw-{bw})/2:(ih-{bh})/2[v]")
    endcard_at = max(0, total - 2.5)
    fc = (
        pre + base + zoom + ";"
        f"[1:v][v]overlay=0:{VID_Y}[a];"
        f"[a][4:v]overlay=0:0:enable='gte(t,{CTA_SAU})'[a2];"
        f"[a2][2:v]overlay=x=30:y='1590+12*sin(2*PI*t*0.9)'[b];"
        f"[b]ass=c.ass:fontsdir=.[c];"
        f"[3:v]format=rgba,fade=t=in:st={endcard_at:.2f}:d=0.4:alpha=1[e];"
        f"[c][e]overlay=0:0:enable='gte(t,{endcard_at:.2f})',format=yuv420p[o];"
        f"{ain}afade=t=in:d={FADE_IN},afade=t=out:st={max(0, total - 0.7):.2f}:d=0.7[au]"
    )
    dest = out / (clip["id"] + ".mp4")
    cmd = ["ffmpeg", "-y", "-v", "error"] + inputs + [
        "-filter_complex", fc, "-map", "[o]", "-map", "[au]", "-t", f"{total:.3f}", "-r", "30",
        "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(dest)]
    subprocess.run(cmd, cwd=d, check=True)

    strip(dest, [0.0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0], out / (clip["id"] + "-5giay.jpg"), d)
    strip(dest, [6.0, total * 0.45, total * 0.75, total - 1.0], out / (clip["id"] + "-khung.jpg"), d, 360, 640)

    claims_ids = ", ".join(clip.get("claims", [])) or "không có"
    (out / (clip["id"] + ".md")).write_text(f"""# Clip {clip['id']}: {clip['tieu_de']}

- Đoạn gốc: {ass_time(start)} → {ass_time(end)} ({dur:.0f}s){'; teaser ' + ass_time(t['tu']) + '–' + ass_time(t['den']) if t else ''}
- Tổng: {total:.0f}s, khẳng định trong đoạn: {claims_ids}
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
    return dest


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("du_an")
    ap.add_argument("--chi", help="chỉ dựng các id, cách nhau bằng dấu phẩy")
    a = ap.parse_args()
    du_an = pathlib.Path(a.du_an).resolve()
    plan = json.loads((du_an / "out" / "clip-doc" / "ke-hoach.json").read_text(encoding="utf-8"))
    if not (du_an / plan.get("nguon", "out/video.mp4")).exists():
        sys.exit("LỖI: không có video nguồn " + plan.get("nguon", "out/video.mp4"))
    caps = json.loads((du_an / "timeline.json").read_text(encoding="utf-8"))["captions"]
    browser = find_browser()
    if not browser:
        sys.exit("LỖI: không thấy Chrome/Edge")
    only = set(a.chi.split(",")) if a.chi else None
    loi = 0
    with tempfile.TemporaryDirectory() as tmp:
        for clip in plan["clips"]:
            if only and clip["id"] not in only:
                continue
            warn, err = kiem_ke_hoach(clip, caps)
            for w in warn:
                print("  CẢNH BÁO", clip["id"], w)
            if err:
                loi += 1
                for e in err:
                    print("  LỖI", clip["id"], e)
                print("  bỏ qua", clip["id"], "(sửa ke-hoach.json rồi dựng lại)")
                continue
            try:
                dest = build(du_an, plan, clip, browser, tmp)
                print("ghi", dest.relative_to(du_an), "+ 5giay.jpg + khung.jpg")
            except subprocess.CalledProcessError as e:
                loi += 1
                print("LỖI", clip["id"], e)
    sys.exit(1 if loi else 0)


if __name__ == "__main__":
    main()
