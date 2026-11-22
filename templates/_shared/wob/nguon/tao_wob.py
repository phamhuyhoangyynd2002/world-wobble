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
ACC_STAR = "#f6c445"

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
    elif kind == "cong":  # vui: mắt cong ^ ^
        for x in (lx, rx):
            o.append(stroke("M %d %d C %d %d %d %d %d %d" % (x - 22, y + 8, x - 12, y - 18, x + 12, y - 18, x + 22, y + 8), 8))
    elif kind == "buon":  # chân mày xếch lên giữa, con ngươi nhìn xuống
        for x, s in ((lx, 1), (rx, -1)):
            o.append(el("ellipse", cx=x, cy=y + 4, rx=23, ry=27, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x, cy=y + 14, r=11, fill=INK))
            o.append(el("circle", cx=x + 4, cy=y + 9, r=4, fill="#ffffff"))
            o.append(stroke("M %d %d L %d %d" % (x - 24 * s, y - 30, x + 20 * s, y - 44), 6))
    elif kind == "tuc":  # chân mày chụm xuống
        for x, s in ((lx, 1), (rx, -1)):
            o.append(el("ellipse", cx=x, cy=y + 6, rx=22, ry=22, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x + 5 * s, cy=y + 8, r=10, fill=INK))
            o.append(stroke("M %d %d L %d %d" % (x - 28 * s, y - 30, x + 22 * s, y - 12), 8))
    elif kind == "so":  # sợ: mắt to run, chân mày lượn sóng
        for x, s in ((lx - 2, 1), (rx + 2, -1)):
            o.append(el("ellipse", cx=x, cy=y, rx=27, ry=33, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x + 2 * s, cy=y + 6, r=7, fill=INK))
            o.append(stroke("M %d %d C %d %d %d %d %d %d" % (x - 22, y - 46, x - 10, y - 56, x + 4, y - 40, x + 22, y - 52), 6))
    elif kind == "ngu":  # buồn ngủ: mí sụp nửa mắt
        for x in (lx, rx):
            o.append(el("ellipse", cx=x, cy=y + 6, rx=23, ry=22, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x, cy=y + 16, r=9, fill=INK))
            o.append('<path d="M %d %d C %d %d %d %d %d %d Z" fill="%s" stroke="%s" stroke-width="5"/>' % (
                x - 24, y + 8, x - 22, y - 24, x + 22, y - 24, x + 24, y + 8, SEA, INK))
    elif kind == "tim":  # mê tít: mắt trái tim
        for x in (lx, rx):
            o.append('<path d="M %d %d C %d %d %d %d %d %d C %d %d %d %d %d %d Z" fill="%s" stroke="%s" stroke-width="5" stroke-linejoin="round"/>' % (
                x, y + 26, x - 40, y - 2, x - 18, y - 36, x, y - 14, x + 18, y - 36, x + 40, y - 2, x, y + 26, MAT, INK))
            o.append(el("circle", cx=x - 10, cy=y - 12, r=4, fill="#ffffff"))
    elif kind == "xoay":  # choáng: mắt xoắn ốc
        for x in (lx, rx):
            o.append(el("circle", cx=x, cy=y, r=26, fill=EYE, stroke=INK, stroke_width=5))
            o.append(stroke("M %d %d C %d %d %d %d %d %d C %d %d %d %d %d %d C %d %d %d %d %d %d" % (
                x, y, x + 6, y - 6, x + 12, y + 4, x + 4, y + 10, x - 8, y + 16, x - 16, y - 4, x - 6, y - 14,
                x + 8, y - 22, x + 22, y - 6, x + 18, y + 10), 4))
    elif kind == "nham":  # cười lăn: mắt nhắm > <
        o.append(stroke("M %d %d L %d %d L %d %d" % (lx - 20, y - 14, lx + 16, y, lx - 20, y + 14), 8))
        o.append(stroke("M %d %d L %d %d L %d %d" % (rx + 20, y - 14, rx - 16, y, rx + 20, y + 14), 8))
    elif kind == "nghi":  # nghi ngờ: mắt dẹt liếc ngang, một chân mày nhướn
        for x in (lx, rx):
            o.append(el("ellipse", cx=x, cy=y + 6, rx=24, ry=14, fill=EYE, stroke=INK, stroke_width=5))
            o.append(el("circle", cx=x - 10, cy=y + 6, r=9, fill=INK))
        o.append(stroke("M %d %d L %d %d" % (lx - 24, y - 14, lx + 24, y - 12), 6))
        o.append(stroke("M %d %d C %d %d %d %d %d %d" % (rx - 24, y - 30, rx - 8, y - 48, rx + 10, y - 48, rx + 26, y - 36), 6))
    elif kind == "sao":  # mắt sao lấp lánh
        for x in (lx, rx):
            o.append(el("ellipse", cx=x, cy=y, rx=26, ry=31, fill=EYE, stroke=INK, stroke_width=5))
            o.append('<path d="M %d %d L %d %d L %d %d L %d %d L %d %d L %d %d L %d %d L %d %d Z" fill="%s" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (
                x, y - 20, x + 6, y - 6, x + 20, y, x + 6, y + 6, x, y + 20, x - 6, y + 6, x - 20, y, x - 6, y - 6, ACC_STAR, INK))
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
    elif kind == "cuoi":
        o.append('<path d="M 168 216 C 180 246 220 246 232 216 C 214 224 186 224 168 216 Z" fill="%s" stroke="%s" stroke-width="6" stroke-linejoin="round"/>' % (INK, INK))
    elif kind == "meu":
        o.append(stroke("M 170 240 C 184 216 216 216 230 240", 6))
    elif kind == "nghien":  # nghiến răng
        o.append('<rect x="164" y="218" width="72" height="24" rx="6" fill="%s" stroke="%s" stroke-width="6"/>' % (EYE, INK))
        o.append(stroke("M 166 230 L 234 230", 4) + stroke("M 188 220 L 188 240", 4) + stroke("M 212 220 L 212 240", 4))
    elif kind == "song":  # miệng run lượn sóng
        o.append(stroke("M 166 230 L 178 222 L 190 234 L 202 222 L 214 234 L 226 222 L 236 230", 6))
    elif kind == "ngap":  # ngáp
        o.append(el("ellipse", cx=200, cy=232, rx=20, ry=15, fill=INK))
    elif kind == "cuoi-lon":  # cười há to
        o.append('<path d="M 150 208 C 160 272 240 272 250 208 Z" fill="%s" stroke="%s" stroke-width="6" stroke-linejoin="round"/>' % (INK, INK))
        o.append('<path d="M 172 240 C 188 262 212 262 228 240 C 214 230 186 230 172 240 Z" fill="%s"/>' % CHEEK)
        o.append('<path d="M 160 212 L 240 212 L 236 222 L 164 222 Z" fill="%s"/>' % EYE)
    elif kind == "xeo":  # méo lệch
        o.append(stroke("M 176 230 C 196 222 214 224 228 214", 6))
    elif kind == "choang":  # choáng: miệng lượn, lè lưỡi lệch
        o.append(stroke("M 168 222 C 184 236 200 214 216 228 C 224 234 232 226 236 220", 6))
        o.append('<path d="M 206 226 C 204 248 226 250 224 228 Z" fill="%s" stroke="%s" stroke-width="5" stroke-linejoin="round"/>' % (CHEEK, INK))
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
    elif kind == "vay":  # vẫy chào: tay trái giơ cao, tay phải buông
        o.append(stroke("M 86 198 C 62 176 46 146 44 110", 13) + hand(44, 104))
        o.append(stroke("M 316 212 C 330 246 334 274 326 300", 13) + hand(326, 304))
    elif kind == "chong-hong":  # tay chống hông
        o.append(stroke("M 86 196 C 50 210 48 246 84 262", 13) + hand(88, 262))
        o.append(stroke("M 314 196 C 350 210 352 246 316 262", 13) + hand(312, 262))
    elif kind == "che-mat":  # sợ: hai tay co lên trước mặt
        o.append(stroke("M 86 214 C 70 200 76 176 100 166", 13) + hand(104, 164))
        o.append(stroke("M 314 214 C 330 200 324 176 300 166", 13) + hand(296, 164))
    elif kind == "chap-tay":  # mê tít: chắp tay trước ngực
        o.append(stroke("M 88 212 C 110 246 150 270 190 264", 13) + hand(192, 262))
        o.append(stroke("M 312 212 C 290 246 250 270 210 264", 13) + hand(208, 262))
    elif kind == "om-bung":  # cười ôm bụng
        o.append(stroke("M 86 212 C 100 252 130 280 166 282", 13) + hand(170, 282))
        o.append(stroke("M 314 212 C 300 252 270 280 234 282", 13) + hand(230, 282))
    elif kind == "dui-mat":  # buồn ngủ: một tay dụi mắt
        o.append(stroke("M 86 214 C 70 250 74 276 82 300", 13) + hand(82, 304))
        o.append(stroke("M 316 214 C 312 196 290 180 262 176", 13) + hand(258, 176))
    elif kind == "khoanh":  # khoanh tay
        o.append(stroke("M 86 210 C 110 254 180 262 250 236", 13) + hand(254, 234))
        o.append(stroke("M 314 210 C 290 250 220 264 150 240", 13) + hand(146, 238))
    elif kind == "lac-lu":  # choáng: tay vung lỏng
        o.append(stroke("M 84 204 C 56 196 40 216 28 240", 13) + hand(26, 244))
        o.append(stroke("M 316 204 C 344 180 352 150 370 136", 13) + hand(372, 132))
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
    elif kind == "vui-ve":  # nét vẫy cạnh bàn tay
        o.append(stroke("M 16 96 C 10 110 10 124 16 136", 5) + stroke("M 70 80 C 80 90 84 104 80 118", 5))
    elif kind == "buon":  # giọt nước mắt + đám mây nhỏ
        o.append('<path d="M 150 186 C 140 206 140 218 150 222 C 160 218 160 206 150 186 Z" fill="%s" stroke="%s" stroke-width="4"/>' % (SWEAT, INK))
        o.append('<path d="M 150 40 C 150 20 180 14 192 28 C 204 10 238 16 238 38 C 256 38 260 62 240 66 L 160 66 C 136 66 134 42 150 40 Z" fill="#c9d3d6" stroke="%s" stroke-width="5" stroke-linejoin="round"/>' % INK)
        for x in (170, 200, 228):
            o.append(stroke("M %d 76 L %d 92" % (x, x - 4), 4, SWEAT))
    elif kind == "tuc-gian":  # dấu giận + khói
        o.append('<g transform="translate(316 70)">' + stroke("M -14 -4 C -6 -4 -4 -6 -4 -14", 6, MAT) + stroke("M 4 -14 C 4 -6 6 -4 14 -4", 6, MAT)
                 + stroke("M 14 4 C 6 4 4 6 4 14", 6, MAT) + stroke("M -4 14 C -4 6 -6 4 -14 4", 6, MAT) + "</g>")
        for x, s in ((60, 1), (340, -1)):
            o.append('<path d="M %d 40 C %d 20 %d 10 %d 26 C %d 8 %d 8 %d 30 C %d 44 %d 50 %d 40 Z" fill="#d8d2c4" stroke="%s" stroke-width="4"/>' % (
                x, x - 14 * s, x + 4 * s, x + 10 * s, x + 20 * s, x + 34 * s, x + 30 * s, x + 26 * s, x + 6 * s, x, INK))
    elif kind == "so-hai":  # mồ hôi lạnh + vạch run
        for x, y in ((88, 96), (312, 96)):
            o.append('<path d="M %d %d C %d %d %d %d %d %d C %d %d %d %d %d %d Z" fill="%s" stroke="%s" stroke-width="4"/>' % (
                x, y, x - 10, y + 16, x - 10, y + 28, x, y + 30, x + 10, y + 28, x + 10, y + 16, x, y, SWEAT, INK))
        for x, s in ((26, 1), (374, -1)):
            for y in (230, 260, 290):
                o.append(stroke("M %d %d L %d %d" % (x, y, x + 16 * s, y), 5, INK, ' opacity="0.7"'))
    elif kind == "buon-ngu":  # chữ Z vẽ bằng nét
        for x, y, s in ((300, 70, 18), (336, 40, 24), (376, 6, 0)):
            if s:
                o.append(stroke("M %d %d L %d %d L %d %d L %d %d" % (x, y, x + s, y, x, y + s, x + s, y + s), 5))
        o.append('<path d="M 140 196 C 130 214 132 224 140 228 C 148 224 150 214 140 196 Z" fill="%s" stroke="%s" stroke-width="3"/>' % (SWEAT, INK))
    elif kind == "me-tit":  # tim bay
        for x, y, s in ((54, 70, 1.0), (346, 50, 0.8), (36, 200, 0.6), (370, 190, 0.7)):
            o.append('<path d="M 0 16 C -24 0 -12 -22 0 -8 C 12 -22 24 0 0 16 Z" transform="translate(%d %d) scale(%.1f)" fill="%s" stroke="%s" stroke-width="4" stroke-linejoin="round"/>' % (x, y, s * 1.4, MAT, INK))
    elif kind == "choang-vang":  # sao bay vòng quanh đầu
        o.append('<ellipse cx="200" cy="40" rx="120" ry="22" fill="none" stroke="%s" stroke-width="3" stroke-dasharray="10 10" opacity="0.6"/>' % INK)
        for x, y in ((96, 46), (200, 18), (300, 52)):
            o.append('<path d="M %d %d L %d %d L %d %d L %d %d L %d %d L %d %d L %d %d L %d %d Z" fill="%s" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (
                x, y - 16, x + 5, y - 5, x + 16, y, x + 5, y + 5, x, y + 16, x - 5, y + 5, x - 16, y, x - 5, y - 5, ACC_STAR, INK))
    elif kind == "cuoi-lan":  # nước mắt vì cười văng ra hai bên
        for x, s in ((120, -1), (280, 1)):
            o.append('<path d="M %d 150 C %d 140 %d 150 %d 166 C %d 176 %d 172 %d 150 Z" fill="%s" stroke="%s" stroke-width="4"/>' % (
                x, x + 20 * s, x + 34 * s, x + 30 * s, x + 20 * s, x + 6 * s, x, SWEAT, INK))
        for d in ("M 60 60 L 40 36", "M 340 60 L 360 36", "M 30 120 L 6 112", "M 370 120 L 394 112"):
            o.append(stroke(d, 6))
    elif kind == "nghi-ngo":  # dấu hỏi vẽ nét
        o.append(stroke("M 330 40 C 330 14 372 12 372 38 C 372 58 350 58 350 78", 8))
        o.append(el("circle", cx=350, cy=98, r=6, fill=INK))
    elif kind == "lap-lanh":  # lấp lánh quanh người
        for x, y, s in ((40, 40, 18), (360, 30, 14), (30, 230, 12), (372, 220, 16), (200, 12, 10)):
            o.append('<path d="M %d %d L %d %d L %d %d L %d %d Z" fill="%s" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (
                x, y - s, x + s * 0.3, y, x, y + s, x - s * 0.3, y, ACC_STAR, INK))
            o.append('<path d="M %d %d L %d %d L %d %d L %d %d Z" fill="%s" stroke="%s" stroke-width="3" stroke-linejoin="round"/>' % (
                x - s, y, x, y - s * 0.3, x + s, y, x, y + s * 0.3, ACC_STAR, INK))
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
    # thêm 22/11/2026
    "vui-ve":      ("cong",  "cuoi",     "vay",       "dung",  -6, {}),
    "buon":        ("buon",  "meu",      "buong-thong", "dung", 4, {}),
    "tuc-gian":    ("tuc",   "nghien",   "chong-hong", "dung",  0, {}),
    "so-hai":      ("so",    "song",     "che-mat",   "run",    3, {}),
    "buon-ngu":    ("ngu",   "ngap",     "dui-mat",   "dung",   7, {}),
    "me-tit":      ("tim",   "cuoi-to",  "chap-tay",  "nhay",  -4, {}),
    "choang-vang": ("xoay",  "choang",   "lac-lu",    "buoc",  12, {}),
    "cuoi-lan":    ("nham",  "cuoi-lon", "om-bung",   "nhay",  -9, {}),
    "nghi-ngo":    ("nghi",  "xeo",      "khoanh",    "dung",  -3, {}),
    "lap-lanh":    ("sao",   "cuoi-to",  "gio-cao",   "nhay",   0, {}),
}

NO_CHEEKS = {"lanh-run", "so-hai", "tuc-gian", "buon"}


def build(name):
    e, m, a, lg, rot, bodyargs = EXPRESSIONS[name]
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">',
        "<title>Wob – %s</title>" % name,
        legs(lg),
        '<g id="wob-tren" transform="rotate(%d 200 290)">' % rot,
        backpack(),
        body(**bodyargs),
        cheeks() if name not in NO_CHEEKS else "",
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
