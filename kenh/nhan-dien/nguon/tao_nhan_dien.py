#!/usr/bin/env python3
"""Dựng bộ nhận diện kênh World Wobble từ SVG của Wob + font Fraunces (không dùng AI sinh ảnh).

Chạy:  python3 kenh/nhan-dien/nguon/tao_nhan_dien.py
Ghi:   kenh/nhan-dien/avatar-800.png       ảnh đại diện kênh (YouTube cắt tròn)
       kenh/nhan-dien/banner-2560x1440.png banner kênh (nội dung chính trong vùng an toàn 1546×423 ở giữa)
       templates/_shared/logo.png          icon + chữ, nền trong suốt (mô tả, thumbnail, tài liệu)

Màu và font theo templates/_shared/frame.md (chốt 15/11/2026). Cần Google Chrome.
"""
import os
import subprocess
import tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SHARED = os.path.join(ROOT, "templates", "_shared")
OUT = os.path.join(ROOT, "kenh", "nhan-dien")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

GROUND, OCEAN, LAND, TEXT, ACCENT, INK = "#1e2a2b", "#3f6a70", "#efe3c8", "#fff8ec", "#e0703a", "#1f2326"

HEAD = """<!doctype html><html><head><meta charset="utf-8"><style>
@font-face {{ font-family: "Fraunces"; src: url("file://{shared}/fonts/Fraunces-Variable.ttf"); font-weight: 100 900; }}
html, body {{ margin: 0; width: {w}px; height: {h}px; overflow: hidden; background: {bg}; }}
* {{ font-family: "Fraunces", serif; font-variation-settings: "SOFT" 100, "WONK" 1; box-sizing: border-box; }}
</style></head><body>"""

PAGES = {
    "avatar-800.png": (800, 800, GROUND, f"""
<div style="position:absolute;inset:60px;border-radius:50%;background:{OCEAN};border:10px solid {INK}"></div>
<img src="file://{SHARED}/wob/hao-hung.svg" style="position:absolute;left:110px;top:96px;width:580px;height:580px">"""),

    "banner-2560x1440.png": (2560, 1440, GROUND, f"""
<svg width="2560" height="1440" style="position:absolute;inset:0">
  <path d="M0 1010 C 500 930 900 990 1300 960 C 1700 930 2100 990 2560 950 L2560 1440 L0 1440 Z" fill="{OCEAN}" stroke="{INK}" stroke-width="8"/>
  <path d="M0 1150 C 600 1090 1100 1130 1500 1110 C 1900 1090 2200 1130 2560 1100 L2560 1440 L0 1440 Z" fill="{LAND}" stroke="{INK}" stroke-width="8"/>
</svg>
<div style="position:absolute;left:507px;top:508px;width:1546px;height:423px;display:flex;align-items:center;gap:56px">
  <img src="file://{SHARED}/wob/hao-hung.svg" style="width:400px;height:400px;flex:none">
  <div>
    <div style="color:{TEXT};font-weight:900;font-size:150px;line-height:1;letter-spacing:0.01em">World Wobble</div>
    <div style="color:{ACCENT};font-weight:700;font-size:62px;line-height:1.2;margin-top:22px">Why on earth do people live <i>there</i>?</div>
  </div>
</div>"""),

    "logo.png": (1400, 360, "transparent", f"""
<div style="position:absolute;inset:0;display:flex;align-items:center;gap:36px;padding:20px 40px">
  <img src="file://{SHARED}/logo-icon.svg" style="width:320px;height:320px;flex:none">
  <div style="color:{INK};font-weight:900;font-size:150px;line-height:1;-webkit-text-stroke:0;paint-order:stroke">World Wobble</div>
</div>"""),
}


def main():
    os.makedirs(OUT, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for name, (w, h, bg, body) in PAGES.items():
            html = os.path.join(tmp, name + ".html")
            with open(html, "w", encoding="utf-8") as f:
                f.write(HEAD.format(shared=SHARED, w=w, h=h, bg=bg) + body + "</body></html>")
            dest = os.path.join(SHARED if name == "logo.png" else OUT, name)
            cmd = [CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--hide-scrollbars",
                   f"--window-size={w},{h}", "--virtual-time-budget=3000", f"--screenshot={dest}"]
            if bg == "transparent":
                cmd.append("--default-background-color=00000000")
            subprocess.run(cmd + ["file://" + html], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            print("ghi", os.path.relpath(dest, ROOT))


if __name__ == "__main__":
    main()
