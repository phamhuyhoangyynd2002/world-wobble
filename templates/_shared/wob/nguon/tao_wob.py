#!/usr/bin/env python3
"""Dựng 6 biểu cảm của Wob (SVG tách bộ phận) từ cùng một bộ phận gốc.

Wob: quả địa cầu méo, nét mực viền, đeo ba lô có cuộn thảm, chân ngắn đi giày.
Không dùng AI sinh ảnh (hồ sơ kênh): mọi nét ở đây là toạ độ viết tay, chạy lại ra đúng y hệt.

Chạy:  python3 templates/_shared/wob/nguon/tao_wob.py
Ghi:   templates/_shared/wob/<bieu_cam>.svg  (viewBox 0 0 400 400, chân chạm đáy y≈392)

Lục địa trên thân Wob là mảng trừu tượng, KHÔNG phải bản đồ thật (luật chủ quyền: bản đồ thật chỉ vẽ bằng code từ Natural Earth).
"""
import math
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")

# Màu cố định của Wob (không đổi theo bảng màu tập, để Wob luôn giống nhau)
INK = "#1f2326"
SEA = "#5a9fb8"
SEA_COLD = "#9cc8dc"
SEA_HOT = "#e7926b"
LAND = "#efd9a2"
LAND_HOT = "#f3c27a"
EYE = "#fffdf6"
CHEEK = "#e9806e"
PACK = "#b8743a"
PACK_DARK = "#8e5527"
MAT = "#d9543c"
SHOE = "#d9543c"
FROST = "#e8f6ff"
SWEAT = "#8fd0ea"

SW = 7  # độ dày nét viền chính
CX, CY, R = 200, 178, 122


def wobbly_circle(cx, cy, r, n=48, phase=0.0):
    """Đường tròn méo, khép kín, làm mượt bằng Catmull-Rom -> Bezier bậc ba."""
    pts = []
    for i in range(n):
        t = 2 * math.pi * i / n
        rr = r + 5.5 * math.sin(3 * t + phase) + 3.5 * math.sin(5 * t + 1.3 + phase) + 2 * math.sin(2 * t + 0.4)
        pts.append((cx + rr * math.cos(t), cy + rr * math.sin(t) * 0.96))
    d = "M %.1f %.1f " % pts[0]
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += "C %.1f %.1f %.1f %.1f %.1f %.1f " % (c1[0], c1[1], c2[0], c2[1], p2[0], p2[1])
    return d + "Z"


BODY = wobbly_circle(CX, CY, R)

# Lục địa trừu tượng (bị cắt theo thân)
LANDS = [
    "M 92 120 C 110 92 150 88 168 104 C 182 118 170 140 186 152 C 198 162 190 186 168 188 "
    "C 146 190 140 172 122 176 C 100 180 84 160 88 142 Z",
    "M 236 196 C 252 182 284 186 300 204 C 316 222 312 252 292 266 C 276 278 258 268 252 252 "
    "C 246 236 226 228 228 212 Z",
    "M 232 82 C 246 74 268 78 272 92 C 276 104 262 112 250 110 C 238 108 226 94 232 82 Z",
    "M 150 262 C 162 254 182 258 186 270 C 190 282 176 292 162 290 C 148 288 140 272 150 262 Z",
]


def el(tag, **a):
    attrs = " ".join('%s="%s"' % (k.rstrip("_").replace("_", "-"), v) for k, v in a.items())
    return "<%s %s/>" % (tag, attrs)


def stroke(d, w=SW, color=INK, extra=""):
    return '<path d="%s" fill="none" stroke="%s" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round"%s/>' % (
        d, color, w, extra)


# ---------- bộ phận ----------

def backpack():
    # nằm sau thân, ló ra bên phải; cuộn thảm trên nóc
    return (
        '<g id="ba-lo">'
        + '<rect x="250" y="96" width="98" height="160" rx="30" fill="%s" stroke="%s" stroke-width="%d"/>' % (PACK, INK, SW)
        + '<rect x="300" y="150" width="44" height="58" rx="12" fill="%s" stroke="%s" stroke-width="5"/>' % (PACK_DARK, INK)
        + '<rect x="262" y="66" width="96" height="36" rx="18" fill="%s" stroke="%s" stroke-width="%d"/>' % (MAT, INK, SW)
        + stroke("M 282 70 L 282 98", 4) + stroke("M 336 70 L 336 98", 4)
        + "</g>"
    )


def legs(pose="dung"):
    if pose == "buoc":  # bước đi (đóng gói rời đi)
        l = stroke("M 172 288 C 166 320 150 350 140 380", 15)
        r = stroke("M 228 288 C 236 320 250 348 268 372", 15)
        shoes = (el("ellipse", cx=128, cy=384, rx=28, ry=13, fill=SHOE, stroke=INK, stroke_width=5)
                 + '<ellipse cx="282" cy="376" rx="28" ry="13" fill="%s" stroke="%s" stroke-width="5" transform="rotate(-18 282 376)"/>' % (SHOE, INK))
    elif pose == "run":  # đầu gối khuỳnh vào nhau vì lạnh
        l = stroke("M 176 290 C 186 326 196 350 176 382", 15)
        r = stroke("M 224 290 C 214 326 204 350 224 382", 15)
        shoes = (el("ellipse", cx=166, cy=386, rx=27, ry=12, fill=SHOE, stroke=INK, stroke_width=5)
                 + el("ellipse", cx=236, cy=386, rx=27, ry=12, fill=SHOE, stroke=INK, stroke_width=5))
    elif pose == "nhay":  # nhún lên vì hào hứng
        l = stroke("M 172 288 C 166 318 160 344 156 372", 15)
        r = stroke("M 228 288 C 234 318 240 344 244 372", 15)
        shoes = (el("ellipse", cx=146, cy=378, rx=27, ry=12, fill=SHOE, stroke=INK, stroke_width=5)
                 + el("ellipse", cx=254, cy=378, rx=27, ry=12, fill=SHOE, stroke=INK, stroke_width=5))
    else:
        l = stroke("M 174 290 C 172 324 170 350 168 380", 15)
        r = stroke("M 226 290 C 228 324 230 350 232 380", 15)
        shoes = (el("ellipse", cx=158, cy=385, rx=28, ry=12, fill=SHOE, stroke=INK, stroke_width=5)
                 + el("ellipse", cx=242, cy=385, rx=28, ry=12, fill=SHOE, stroke=INK, stroke_width=5))
    return '<g id="chan">' + l + r + shoes + "</g>"


def body(sea=SEA, land=LAND, drips=False, frost=False):
    out = ['<g id="than">']
    out.append('<clipPath id="wob-clip"><path d="%s"/></clipPath>' % BODY)
    out.append('<path d="%s" fill="%s"/>' % (BODY, sea))
    out.append('<g clip-path="url(#wob-clip)">')
    for d in LANDS:
        out.append('<path d="%s" fill="%s" stroke="%s" stroke-width="3.5" stroke-linejoin="round"/>' % (d, land, INK))
    # kinh tuyến, vĩ tuyến mờ: gợi quả địa cầu
    out.append(stroke("M %d %d C %d %d %d %d %d %d" % (CX, CY - R - 10, CX - 70, CY - 40, CX - 70, CY + 40, CX, CY + R + 10), 2.5, INK, ' opacity="0.28"'))
    out.append(stroke("M %d %d C %d %d %d %d %d %d" % (CX, CY - R - 10, CX + 70, CY - 40, CX + 70, CY + 40, CX, CY + R + 10), 2.5, INK, ' opacity="0.28"'))
    out.append(stroke("M %d %d C %d %d %d %d %d %d" % (CX - R - 10, CY + 10, CX - 40, CY + 40, CX + 40, CY + 40, CX + R + 10, CY + 10), 2.5, INK, ' opacity="0.28"'))
    if frost:
        out.append('<path d="M 60 90 C 120 40 280 40 340 90 L 340 60 L 60 60 Z" fill="%s" opacity="0.9"/>' % FROST)
    # bóng sáng góc trái trên (nét bút, không gradient)
    out.append(stroke("M 112 112 C 122 96 136 86 152 80", 9, "#ffffff", ' opacity="0.55"'))
    out.append("</g>")
    if drips:  # nóng chảy: giọt chảy xuống từ đáy thân
        for x, h in ((150, 34), (196, 52), (246, 28)):
            out.append('<path d="M %d 288 C %d %d %d %d %d %d C %d %d %d %d %d 288 Z" fill="%s" stroke="%s" stroke-width="5" stroke-linejoin="round"/>' % (
                x - 13, x - 13, 288 + h * 0.6, x - 10, 288 + h, x, 288 + h, x + 10, 288 + h, x + 13, 288 + h * 0.6, x + 13, sea, INK))
    out.append('<path d="%s" fill="none" stroke="%s" stroke-width="%d" stroke-linejoin="round"/>' % (BODY, INK, SW))
    # quai ba lô vắt qua vai
    out.append(stroke("M 300 96 C 286 130 284 168 300 206", 10, PACK_DARK))
    out.append(stroke("M 300 96 C 286 130 284 168 300 206", 3, INK, ' opacity="0.6"'))
    if frost:  # đóng băng: viền trên có băng nhũ
        for x in (120, 160, 205, 250):
            out.append('<path d="M %d 72 L %d 96 L %d 72 Z" fill="%s" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (x - 7, x, x + 7, FROST, INK))
    out.append("</g>")
    return "".join(out)


def eyes(kind):
    lx, rx, y = 160, 238, 156
    o = ['<g id="mat">']
    if kind == "sang":  # mắt to, có đốm sáng
        for x in (lx, rx):
            o.append(el("ellipse", cx=x, cy=y, rx=25, ry=31, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x + 3, cy=y + 4, r=13, fill=INK))
            o.append(el("circle", cx=x + 8, cy=y - 2, r=5, fill="#ffffff"))
    elif kind == "nheo":  # nheo vì lạnh
        o.append(stroke("M %d %d L %d %d L %d %d" % (lx - 22, y - 10, lx + 14, y + 2, lx - 22, y + 14), 7))
        o.append(stroke("M %d %d L %d %d L %d %d" % (rx + 22, y - 10, rx - 14, y + 2, rx + 22, y + 14), 7))
    elif kind == "lu-du":  # mí sụp vì nóng
        for x in (lx, rx):
            o.append(el("ellipse", cx=x, cy=y + 4, rx=24, ry=26, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x, cy=y + 14, r=11, fill=INK))
            o.append('<path d="M %d %d C %d %d %d %d %d %d Z" fill="%s" stroke="%s" stroke-width="5"/>' % (
                x - 25, y + 6, x - 22, y - 30, x + 22, y - 30, x + 25, y + 6, SEA_HOT, INK))
    elif kind == "tron-xoe":  # sốc: mắt to, con ngươi nhỏ
        for x in (lx - 4, rx + 4):
            o.append(el("ellipse", cx=x, cy=y - 4, rx=31, ry=37, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x, cy=y - 2, r=6, fill=INK))
    elif kind == "lech":  # ngẫm nghĩ: một mắt híp, mắt kia nhìn lên
        o.append(el("ellipse", cx=lx, cy=y, rx=24, ry=29, fill=EYE, stroke=INK, stroke_width=5))
        o.append(el("circle", cx=lx + 8, cy=y - 10, r=11, fill=INK))
        o.append(el("ellipse", cx=rx, cy=y + 4, rx=24, ry=17, fill=EYE, stroke=INK, stroke_width=5))
        o.append(el("circle", cx=rx + 8, cy=y + 2, r=10, fill=INK))
        o.append(stroke("M %d %d L %d %d" % (rx - 26, y - 22, rx + 24, y - 30), 6))
        o.append(stroke("M %d %d C %d %d %d %d %d %d" % (lx - 24, y - 44, lx - 8, y - 56, lx + 12, y - 56, lx + 26, y - 46), 6))
    elif kind == "quyet":  # đóng gói: nhìn sang phải, chân mày quyết tâm
        for x in (lx + 6, rx + 6):
            o.append(el("ellipse", cx=x, cy=y, rx=23, ry=28, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x - 9, cy=y + 2, r=11, fill=INK))
        o.append(stroke("M %d %d L %d %d" % (lx - 18, y - 42, lx + 28, y - 32), 6))
        o.append(stroke("M %d %d L %d %d" % (rx - 16, y - 32, rx + 30, y - 42), 6))
    o.append("</g>")
    return "".join(o)


def mouth(kind):
    o = ['<g id="mieng">']
    if kind == "cuoi-to":
        o.append('<path d="M 160 214 C 172 258 228 258 240 214 Z" fill="%s" stroke="%s" stroke-width="6" stroke-linejoin="round"/>' % (INK, INK))
        o.append('<path d="M 176 236 C 190 252 212 252 226 236 C 214 228 188 228 176 236 Z" fill="%s"/>' % CHEEK)
    elif kind == "run-cap":  # răng va lập cập
        o.append('<rect x="160" y="212" width="80" height="30" rx="10" fill="%s" stroke="%s" stroke-width="6"/>' % (EYE, INK))
        o.append(stroke("M 162 227 L 172 218 L 182 236 L 192 218 L 202 236 L 212 218 L 222 236 L 232 218 L 238 227", 4))
    elif kind == "le-luoi":  # nóng: miệng méo, lè lưỡi
        o.append(stroke("M 162 224 C 178 214 190 232 204 222 C 218 212 228 226 240 220", 6))
        o.append('<path d="M 192 226 C 192 250 216 252 216 226 Z" fill="%s" stroke="%s" stroke-width="5" stroke-linejoin="round"/>' % (CHEEK, INK))
    elif kind == "chu-o":
        o.append(el("ellipse", cx=200, cy=234, rx=17, ry=24, fill=INK))
    elif kind == "ngang":
        o.append(stroke("M 172 230 C 190 226 212 236 232 226", 6))
    elif kind == "cuoi-nhech":
        o.append(stroke("M 176 222 C 196 240 222 236 236 214", 6))
    o.append("</g>")
    return "".join(o)


def cheeks():
    return (el("ellipse", cx=124, cy=204, rx=16, ry=10, fill=CHEEK, opacity="0.55")
            + el("ellipse", cx=276, cy=204, rx=16, ry=10, fill=CHEEK, opacity="0.55"))


def hand(x, y):
    return el("circle", cx=x, cy=y, r=14, fill=INK)


def arms(kind):
    o = ['<g id="tay">']
    if kind == "gio-cao":
        o.append(stroke("M 86 196 C 60 160 44 120 50 84", 13) + hand(50, 80))
        o.append(stroke("M 314 196 C 342 160 358 120 352 84", 13) + hand(352, 80))
    elif kind == "om-minh":  # ôm mình run
        o.append(stroke("M 88 214 C 110 250 150 262 182 248", 13) + hand(186, 246))
        o.append(stroke("M 312 214 C 290 250 250 262 218 248", 13) + hand(214, 246))
    elif kind == "buong-thong":  # nóng: tay rũ
        o.append(stroke("M 84 212 C 70 246 66 276 72 304", 13) + hand(72, 308))
        o.append(stroke("M 316 212 C 330 246 334 276 328 304", 13) + hand(328, 308))
    elif kind == "dang-ra":  # sốc: tay xoè cứng
        o.append(stroke("M 84 198 L 26 156", 13) + hand(22, 152))
        o.append(stroke("M 316 198 L 374 156", 13) + hand(378, 152))
    elif kind == "chong-cam":  # ngẫm nghĩ: tay chống cằm
        o.append(stroke("M 86 214 C 70 250 74 276 82 300", 13) + hand(82, 304))
        o.append(stroke("M 316 214 C 300 266 262 276 236 256", 13) + hand(232, 252))
    elif kind == "keo-vali":  # đóng gói: một tay chỉ đường, một tay kéo quai ba lô
        o.append(stroke("M 86 204 C 74 198 62 190 52 180", 13) + hand(48, 176))
        o.append(stroke("M 316 206 C 330 180 322 150 304 132", 13) + hand(302, 128))
    o.append("</g>")
    return "".join(o)


def extras(kind):
    o = ['<g id="phu">']
    if kind == "lanh-run":
        for x, y, s in ((30, 150, 1), (370, 150, -1), (36, 240, 1), (364, 240, -1)):
            o.append(stroke("M %d %d L %d %d" % (x, y, x + 14 * s, y + 18), 5) )
            o.append(stroke("M %d %d L %d %d" % (x + 14 * s, y + 18, x, y + 36), 5))
    elif kind == "nong-chay":
        for x, y in ((96, 104), (306, 120), (330, 168)):
            o.append('<path d="M %d %d C %d %d %d %d %d %d C %d %d %d %d %d %d Z" fill="%s" stroke="%s" stroke-width="4"/>' % (
                x, y, x - 10, y + 16, x - 10, y + 28, x, y + 30, x + 10, y + 28, x + 10, y + 16, x, y, SWEAT, INK))
        for x in (150, 200, 250):
            o.append(stroke("M %d 30 C %d 18 %d 10 %d 0" % (x, x + 10, x - 10, x), 5, INK, ' opacity="0.7"'))
    elif kind == "soc":
        for d in ("M 104 56 L 84 22", "M 200 34 L 200 0", "M 296 56 L 316 22", "M 58 98 L 24 82", "M 342 98 L 376 82"):
            o.append(stroke(d, 7))
    elif kind == "ngam-nghi":
        for x, y, r in ((92, 56, 9), (66, 32, 12), (36, 12, 0)):
            if r:
                o.append(el("circle", cx=x, cy=y, r=r, fill=EYE, stroke=INK, stroke_width=4))
    elif kind == "dong-goi":
        for y in (238, 272, 306):
            o.append(stroke("M 360 %d L 392 %d" % (y, y), 5, INK, ' opacity="0.6"'))
    elif kind == "hao-hung":
        for x, y, s in ((40, 30, 16), (366, 36, 13), (20, 210, 11)):
            o.append('<path d="M %d %d L %d %d L %d %d L %d %d Z" fill="%s" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (
                x, y - s, x + s * 0.35, y, x, y + s, x - s * 0.35, y, LAND, INK))
            o.append('<path d="M %d %d L %d %d L %d %d L %d %d Z" fill="%s" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (
                x - s, y, x, y - s * 0.35, x + s, y, x, y + s * 0.35, LAND, INK))
    o.append("</g>")
    return "".join(o)


EXPRESSIONS = {
    #             mắt         miệng        tay            chân     xoay  thân
    "hao-hung":  ("sang",     "cuoi-to",   "gio-cao",     "nhay",  -8, {}),
    "lanh-run":  ("nheo",     "run-cap",   "om-minh",     "run",    0, {"sea": SEA_COLD, "frost": True}),
    "nong-chay": ("lu-du",    "le-luoi",   "buong-thong", "dung",   6, {"sea": SEA_HOT, "land": LAND_HOT, "drips": True}),
    "soc":       ("tron-xoe", "chu-o",     "dang-ra",     "dung",   0, {}),
    "ngam-nghi": ("lech",     "ngang",     "chong-cam",   "dung",  -5, {}),
    "dong-goi":  ("quyet",    "cuoi-nhech", "keo-vali",   "buoc",  -10, {}),
}


def build(name):
    e, m, a, lg, rot, bodyargs = EXPRESSIONS[name]
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">',
        "<title>Wob – %s</title>" % name,
        legs(lg),
        '<g id="wob-tren" transform="rotate(%d 200 290)">' % rot,
        backpack(),
        body(**bodyargs),
        cheeks() if name != "lanh-run" else "",
        eyes(e),
        mouth(m),
        arms(a),  # tay vẽ sau mặt để tay chống cằm, tay ôm mình nằm trên thân
        "</g>",
        extras(name),
        "</svg>",
    ]
    return "\n".join(p for p in parts if p)


def build_icon():
    """Icon logo: thân + ba lô + mặt hào hứng, không tay chân, khung vuông (đọc được ở 44px)."""
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="52 26 320 320" width="320" height="320">',
        "<title>World Wobble – icon</title>",
        '<g transform="rotate(-8 200 190)">',
        backpack(),
        body(),
        cheeks(),
        eyes("sang"),
        mouth("cuoi-to"),
        "</g>",
        "</svg>",
    ]
    return "\n".join(parts)


if __name__ == "__main__":
    for name in EXPRESSIONS:
        path = os.path.join(OUT, name + ".svg")
        with open(path, "w", encoding="utf-8") as f:
            f.write(build(name) + "\n")
        print("ghi", os.path.relpath(path))
    icon = os.path.join(OUT, "..", "logo-icon.svg")
    with open(icon, "w", encoding="utf-8") as f:
        f.write(build_icon() + "\n")
    print("ghi", os.path.relpath(icon))
