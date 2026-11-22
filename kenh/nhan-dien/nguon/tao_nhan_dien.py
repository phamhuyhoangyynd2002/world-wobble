#!/usr/bin/env python3
"""Dựng bộ nhận diện kênh World Wobble từ SVG của Wob + font Fraunces (không dùng AI sinh ảnh).

Chạy:  python kenh/nhan-dien/nguon/tao_nhan_dien.py
Ghi:   kenh/nhan-dien/avatar-800.png        ảnh đại diện YouTube (800×800, YouTube cắt tròn)
       kenh/nhan-dien/banner-2560x1440.png  ảnh bìa (chữ chính trong vùng an toàn 1546×423 ở giữa)
       kenh/nhan-dien/bang-bieu-cam.png     bảng mọi biểu cảm của Wob (để xem, không đăng)
       templates/_shared/logo.png           icon + chữ, nền trong suốt

Bản 22/11/2026: ảnh bìa và ảnh đại diện làm lại tươi hơn (nền giấy sáng, mặt trời, đường đi vòng quanh
thế giới, nhiều Wob với biểu cảm khác nhau). Cảnh trong ảnh bìa là phong cảnh tưởng tượng, không phải bản đồ.
Cần Google Chrome hoặc Microsoft Edge.
"""
import os
import pathlib
import shutil
import subprocess
import tempfile

ROOT = pathlib.Path(__file__).resolve().parents[3]
SHARED = ROOT / "templates" / "_shared"
WOB = SHARED / "wob"
OUT = ROOT / "kenh" / "nhan-dien"

GROUND, OCEAN, LAND, TEXT, ACCENT, INK = "#1e2a2b", "#3f6a70", "#efe3c8", "#fff8ec", "#e0703a", "#1f2326"
SKY, SUN, GREEN, SAND, SNOW, SEA = "#f7ecd3", "#f6c445", "#7fae6a", "#e8b56a", "#fbfaf4", "#5a9fb8"


def find_browser():
    for p in (
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ):
        if os.path.exists(p):
            return p
    return shutil.which("google-chrome") or shutil.which("chromium")


def u(p):
    return pathlib.Path(p).as_uri()


def w(name):
    return u(WOB / (name + ".svg"))


HEAD = """<!doctype html><html><head><meta charset="utf-8"><style>
@font-face {{ font-family: "Fraunces"; src: url("{font}"); font-weight: 100 900; }}
html, body {{ margin: 0; width: {w}px; height: {h}px; overflow: hidden; background: {bg}; position: relative; }}
* {{ font-family: "Fraunces", serif; font-variation-settings: "SOFT" 100, "WONK" 1; box-sizing: border-box; }}
img {{ position: absolute; }}
</style></head><body>"""


def sun_rays(cx, cy, r1, r2, n, color, width):
    import math
    d = ""
    for i in range(n):
        a = 2 * math.pi * i / n
        d += "M %.0f %.0f L %.0f %.0f " % (cx + r1 * math.cos(a), cy + r1 * math.sin(a), cx + r2 * math.cos(a), cy + r2 * math.sin(a))
    return f'<path d="{d}" stroke="{color}" stroke-width="{width}" stroke-linecap="round"/>'


def burst(cx, cy, r1, r2, n, fill):
    import math
    pts = []
    for i in range(n * 2):
        a = math.pi * i / n
        r = r2 if i % 2 == 0 else r1
        pts.append("%.0f,%.0f" % (cx + r * math.cos(a), cy + r * math.sin(a)))
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'


def cloud(x, y, s=1.0):
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M0 60 C -10 20 40 0 70 20 C 90 -20 170 -20 185 25 '
            f'C 230 15 260 60 225 80 L 20 80 C -10 80 -15 65 0 60 Z" fill="{SNOW}" stroke="{INK}" stroke-width="7" stroke-linejoin="round"/></g>')


NEN_BIA = OUT / "nguon" / "goc" / "bia-nen-chatgpt.png"


def banner():
    """Bản 22/11/2026 (lần 2): phông cảnh do ChatGPT web tạo (tài khoản riêng, đã xem: không watermark,
    không chữ, không bản đồ). Wob và chữ vẫn ghép bằng code (luật: không tạo Wob bằng AI)."""
    if NEN_BIA.exists():
        return banner_chatgpt()
    return banner_code()


def banner_chatgpt():
    W, H = 2560, 1440
    sx, sy = 507, 508
    body = f"""<img src="{u(NEN_BIA)}" style="left:0;top:0;width:{W}px;height:{H}px;object-fit:cover">
<div style="position:absolute;left:{sx - 60}px;top:{sy - 30}px;width:1666px;height:483px;border-radius:60px;background:rgba(247,236,211,0.82)"></div>
<img src="{w('lanh-run')}" style="left:150px;top:820px;width:250px;height:250px">
<img src="{w('cuoi-lan')}" style="left:330px;top:1150px;width:230px;height:230px">
<img src="{w('me-tit')}" style="left:1180px;top:1110px;width:220px;height:220px">
<img src="{w('nong-chay')}" style="left:2150px;top:780px;width:250px;height:250px">
<img src="{w('choang-vang')}" style="left:1880px;top:1160px;width:230px;height:230px">
<div style="position:absolute;left:{sx}px;top:{sy}px;width:1546px;height:423px;display:flex;align-items:center;gap:40px">
  <img src="{w('vui-ve')}" style="position:static;width:420px;height:420px;flex:none">
  <div>
    <div style="color:{INK};font-weight:900;font-size:168px;line-height:0.95">World <span style="color:{ACCENT}">Wobble</span></div>
    <svg width="760" height="34" style="display:block;margin:6px 0 0 6px"><path d="M 4 18 C 80 2 150 32 230 16 C 310 0 380 32 460 16 C 540 0 610 32 700 14" fill="none" stroke="{ACCENT}" stroke-width="10" stroke-linecap="round"/></svg>
    <div style="color:{INK};font-weight:700;font-size:60px;line-height:1.15;margin-top:14px">Why on earth do people live <i style="color:{ACCENT}">there</i>?</div>
  </div>
</div>"""
    return W, H, SKY, body


def banner_code():
    W, H = 2560, 1440
    svg = f"""<svg width="{W}" height="{H}" style="position:absolute;inset:0">
  <rect width="{W}" height="{H}" fill="{SKY}"/>
  <!-- mặt trời -->
  {sun_rays(2240, 560, 120, 190, 14, SUN, 16)}
  <circle cx="2240" cy="560" r="100" fill="{SUN}" stroke="{INK}" stroke-width="8"/>
  <path d="M 2205 575 C 2220 600 2260 600 2275 575" fill="none" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>
  <circle cx="2205" cy="540" r="9" fill="{INK}"/><circle cx="2275" cy="540" r="9" fill="{INK}"/>
  {cloud(260, 470, 1.1)}{cloud(1880, 430, 0.8)}{cloud(1240, 360, 0.7)}{cloud(700, 1010, 0.6)}
  <!-- núi tuyết bên trái -->
  <path d="M -40 1000 L 180 640 L 300 800 L 420 600 L 640 1000 Z" fill="#9cc8dc" stroke="{INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M 140 705 L 180 640 L 225 712 L 200 700 L 180 728 L 160 700 Z M 380 668 L 420 600 L 462 672 L 440 662 L 420 690 L 400 662 Z" fill="{SNOW}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/>
  <!-- đồi cát + xương rồng bên phải -->
  <path d="M 1900 1000 C 2050 820 2250 820 2380 900 C 2460 950 2520 930 2600 900 L 2600 1000 Z" fill="{SAND}" stroke="{INK}" stroke-width="8" stroke-linejoin="round"/>
  <path d="M 2420 930 L 2420 820 M 2420 880 C 2390 880 2385 860 2385 840 M 2420 860 C 2450 860 2455 840 2455 820" stroke="{GREEN}" stroke-width="22" stroke-linecap="round" fill="none"/>
  <!-- biển gợn sóng -->
  <path d="M 0 990 C 200 960 400 1020 640 985 C 900 950 1100 1015 1380 985 C 1650 955 1900 1015 2150 985 C 2350 965 2460 1000 2560 985 L 2560 1440 L 0 1440 Z" fill="{SEA}" stroke="{INK}" stroke-width="8"/>
  <path d="M 120 1060 q 30 -20 60 0 q 30 20 60 0 M 980 1080 q 30 -20 60 0 q 30 20 60 0 M 1900 1070 q 30 -20 60 0 q 30 20 60 0" fill="none" stroke="{SNOW}" stroke-width="7" stroke-linecap="round"/>
  <!-- cây cọ trên bãi cát dưới --><g transform="translate(560 330)">
  <path d="M 1020 1010 C 1060 975 1180 975 1220 1010 Z" fill="{SAND}" stroke="{INK}" stroke-width="7"/>
  <path d="M 1120 990 C 1115 940 1125 900 1140 870" stroke="#8e5527" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M 1140 870 C 1100 850 1070 860 1050 885 M 1140 870 C 1180 845 1215 855 1230 880 M 1140 870 C 1130 835 1150 815 1175 810" stroke="{GREEN}" stroke-width="16" fill="none" stroke-linecap="round"/></g>
  <!-- đất dưới cùng -->
  <path d="M 0 1180 C 500 1120 900 1170 1300 1140 C 1700 1110 2100 1170 2560 1130 L 2560 1440 L 0 1440 Z" fill="{LAND}" stroke="{INK}" stroke-width="8"/>
  <!-- đường bay nét đứt + máy bay giấy -->
  <path d="M 120 560 C 300 300 700 380 760 470 M 1820 470 C 1950 380 2050 380 2110 430" fill="none" stroke="{ACCENT}" stroke-width="7" stroke-dasharray="22 18" stroke-linecap="round"/>
  <g transform="translate(2120 420) rotate(18)"><path d="M 0 0 L 70 22 L 0 44 L 14 22 Z" fill="{SNOW}" stroke="{INK}" stroke-width="6" stroke-linejoin="round"/></g>
  <!-- ghim địa điểm -->
  <g transform="translate(560 640)"><path d="M 0 0 C -36 0 -36 -50 0 -50 C 36 -50 36 0 0 0 Z M 0 0 L 0 26" fill="{ACCENT}" stroke="{INK}" stroke-width="6"/></g>
</svg>"""
    sx, sy = 507, 508  # vùng an toàn
    body = svg + f"""
<img src="{w('lanh-run')}" style="left:220px;top:610px;width:260px;height:260px">
<img src="{w('nong-chay')}" style="left:2150px;top:690px;width:260px;height:260px">
<img src="{w('me-tit')}" style="left:1060px;top:1090px;width:230px;height:230px">
<img src="{w('cuoi-lan')}" style="left:160px;top:1100px;width:220px;height:220px">
<img src="{w('choang-vang')}" style="left:2180px;top:1110px;width:220px;height:220px">
<div style="position:absolute;left:{sx}px;top:{sy}px;width:1546px;height:423px;display:flex;align-items:center;gap:40px">
  <img src="{w('vui-ve')}" style="position:static;width:420px;height:420px;flex:none">
  <div>
    <div style="color:{INK};font-weight:900;font-size:168px;line-height:0.95;letter-spacing:0.005em">World <span style="color:{ACCENT}">Wobble</span></div>
    <svg width="760" height="34" style="display:block;margin:6px 0 0 6px"><path d="M 4 18 C 80 2 150 32 230 16 C 310 0 380 32 460 16 C 540 0 610 32 700 14" fill="none" stroke="{ACCENT}" stroke-width="10" stroke-linecap="round"/></svg>
    <div style="color:{INK};font-weight:700;font-size:60px;line-height:1.15;margin-top:14px">Why on earth do people live <i style="color:{ACCENT}">there</i>?</div>
  </div>
</div>"""
    return W, H, SKY, body


NEN_AVATAR = OUT / "nguon" / "goc" / "avatar-nen-chatgpt.png"


def avatar():
    S = 800
    if NEN_AVATAR.exists():  # phông ChatGPT web (tài khoản riêng, đã xem), Wob ghép bằng code
        body = f"""<img src="{u(NEN_AVATAR)}" style="left:0;top:0;width:{S}px;height:{S}px">
<img src="{w('vui-ve')}" style="left:130px;top:100px;width:540px;height:540px">"""
        return S, S, SKY, body
    body = f"""<svg width="{S}" height="{S}" style="position:absolute;inset:0">
  <rect width="{S}" height="{S}" fill="{SKY}"/>
  {burst(400, 400, 300, 390, 16, SUN)}
  <circle cx="400" cy="400" r="292" fill="{ACCENT}" stroke="{INK}" stroke-width="12"/>
  <clipPath id="vong"><circle cx="400" cy="400" r="292"/></clipPath>
  <path clip-path="url(#vong)" d="M 100 560 C 260 520 340 590 420 560 C 500 530 580 590 650 555 C 680 540 700 560 720 560 L 720 720 L 100 720 Z" fill="{SEA}"/>
  <circle cx="400" cy="400" r="292" fill="none" stroke="{INK}" stroke-width="12"/>
</svg>
<img src="{w('vui-ve')}" style="left:120px;top:110px;width:560px;height:560px">"""
    return S, S, SKY, body


def sheet():
    names = sorted(p.stem for p in WOB.glob("*.svg"))
    cols = 4
    rows = (len(names) + cols - 1) // cols
    cw, ch = 360, 410
    cells = ""
    for i, n in enumerate(names):
        x, y = (i % cols) * cw, (i // cols) * ch
        cells += (f'<img src="{w(n)}" style="left:{x + 30}px;top:{y + 20}px;width:300px;height:300px">'
                  f'<div style="position:absolute;left:{x}px;top:{y + 330}px;width:{cw}px;text-align:center;'
                  f'font-size:34px;font-weight:700;color:{INK}">{n}</div>')
    return cols * cw, rows * ch, SKY, cells


def logo():
    body = f"""<div style="position:absolute;inset:0;display:flex;align-items:center;gap:36px;padding:20px 40px">
  <img src="{u(SHARED / 'logo-icon.svg')}" style="position:static;width:320px;height:320px;flex:none">
  <div style="color:{INK};font-weight:900;font-size:150px;line-height:1">World Wobble</div>
</div>"""
    return 1400, 360, "transparent", body


def watermark():  # watermark thương hiệu YouTube (150×150, nền trong suốt)
    return 150, 150, "transparent", f'<img src="{u(SHARED / "logo-icon.svg")}" style="left:0;top:0;width:150px;height:150px">'


PAGES = {
    OUT / "watermark-150.png": watermark,
    OUT / "avatar-800.png": avatar,
    OUT / "banner-2560x1440.png": banner,
    OUT / "bang-bieu-cam.png": sheet,
    SHARED / "logo.png": logo,
}


def main():
    browser = find_browser()
    if not browser:
        raise SystemExit("Không thấy Chrome/Edge")
    font = u(SHARED / "fonts" / "Fraunces-Variable.ttf")
    with tempfile.TemporaryDirectory() as tmp:
        for dest, fn in PAGES.items():
            W, H, bg, body = fn()
            html = pathlib.Path(tmp) / (dest.stem + ".html")
            html.write_text(HEAD.format(font=font, w=W, h=H, bg=bg) + body + "</body></html>", encoding="utf-8")
            cmd = [browser, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--hide-scrollbars",
                   f"--window-size={W},{H}", "--virtual-time-budget=3000", f"--screenshot={dest}"]
            if bg == "transparent":
                cmd.append("--default-background-color=00000000")
            subprocess.run(cmd + [u(html)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            print("ghi", dest.relative_to(ROOT))


if __name__ == "__main__":
    main()
