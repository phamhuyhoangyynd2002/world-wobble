#!/usr/bin/env python3
"""Tự tổng hợp bộ hiệu ứng âm thanh của World Wobble (chép từ GameReel 15/11/2026, chữ ký riêng là dau-wob) (không dùng mẫu âm thanh của ai). Chạy lại: python3 sfx/nguon/tao_sfx.py"""
import math, random, struct, wave
from pathlib import Path
SR = 44100
OUT = Path(__file__).resolve().parent.parent
random.seed(7)

def write(name, samples):
    peak = max(1e-9, max(abs(s) for s in samples))
    with wave.open(str(OUT / f"{name}.wav"), "w") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b"".join(struct.pack("<h", int(s / peak * 0.89 * 32767)) for s in samples))

def env(i, n, a=0.005, curve=4.0):
    t = i / SR; att = min(1.0, t / a) if a else 1.0
    return att * (1 - i / n) ** curve

def lowpass(xs, k):
    y, out = 0.0, []
    for i, x in enumerate(xs):
        c = k(i) if callable(k) else k
        y += c * (x - y); out.append(y)
    return out

def whoosh(d=0.45):  # nhiễu lọc quét lên rồi xuống
    n = int(SR * d); noise = [random.uniform(-1, 1) for _ in range(n)]
    f = lowpass(noise, lambda i: 0.02 + 0.25 * math.sin(math.pi * i / n) ** 2)
    return [x * math.sin(math.pi * i / n) ** 1.5 for i, x in enumerate(f)]

def pop(d=0.12):  # sine tụt cao độ nhanh
    n = int(SR * d); ph = 0.0; out = []
    for i in range(n):
        ph += 2 * math.pi * (900 * math.exp(-i / SR * 40) + 180) / SR
        out.append(math.sin(ph) * env(i, n, 0.001, 3))
    return out

def ting(d=0.7, f=1760):  # chuông nhỏ, có hoạ âm
    n = int(SR * d)
    return [sum(a * math.sin(2 * math.pi * f * m * i / SR) for m, a in ((1, 1), (2.76, .35), (5.4, .12))) * env(i, n, 0.002, 5) for i in range(n)]

def drop(d=0.35):  # icon rơi vào hàng: trống trầm + tiếng tách
    n = int(SR * d); ph = 0.0; out = []
    for i in range(n):
        ph += 2 * math.pi * (160 * math.exp(-i / SR * 12) + 45) / SR
        click = random.uniform(-1, 1) * math.exp(-i / SR * 300) * 0.5
        out.append(math.sin(ph) * env(i, n, 0.001, 2.5) + click)
    return out

def rise(d=1.0):  # dâng lên trước khi lộ hạng
    n = int(SR * d); ph = 0.0; out = []
    noise = lowpass([random.uniform(-1, 1) for _ in range(n)], lambda i: 0.01 + 0.3 * (i / n) ** 2)
    for i in range(n):
        p = i / n; ph += 2 * math.pi * (200 + 900 * p * p) / SR
        out.append((0.5 * math.sin(ph) + 0.6 * noise[i]) * p ** 2 * (1 - max(0, p - 0.95) * 20))
    return out

def dau_wob():  # chữ ký World Wobble: dấu đóng "cộp" + một nốt lắc lư (wobble) đi xuống, dưới 1 giây
    stamp = drop(0.3); out = [0.0] * int(SR * 0.95)
    for i, s in enumerate(stamp): out[i] += s
    o = int(SR * 0.14); n = int(SR * 0.7); ph = 0.0
    for i in range(n):
        t = i / SR
        ph += 2 * math.pi * (660 - 180 * t / 0.7 + 25 * math.sin(2 * math.pi * 7 * t)) / SR
        if o + i < len(out): out[o + i] += 0.5 * math.sin(ph) * env(i, n, 0.004, 1.8)
    return out

# Bộ âm thanh hài (dùng tiết chế: kênh hài kiểu deadpan)

def bonk(d=0.25):  # gõ gỗ: hai hoạ âm không hài hoà tắt rất nhanh
    n = int(SR * d)
    return [(math.sin(2 * math.pi * 520 * i / SR) + 0.6 * math.sin(2 * math.pi * 1370 * i / SR)
             + random.uniform(-1, 1) * math.exp(-i / SR * 400)) * env(i, n, 0.0005, 8) for i in range(n)]

def boing(d=0.5):  # lò xo: cao độ rung lắc quanh một nốt đi lên
    n = int(SR * d); ph = 0.0; out = []
    for i in range(n):
        t = i / SR
        ph += 2 * math.pi * (220 + 160 * t / d + 90 * math.sin(2 * math.pi * 14 * t) * math.exp(-t * 4)) / SR
        out.append(math.sin(ph) * env(i, n, 0.002, 1.5))
    return out

def ka_ching(d=0.8):  # máy tính tiền: tiếng cơ khí lách cách rồi chuông kép
    out = [0.0] * int(SR * d)
    for k in range(3):
        o = int(SR * 0.03 * k)
        for i in range(int(SR * 0.02)):
            out[o + i] += random.uniform(-1, 1) * math.exp(-i / SR * 250) * 0.6
    for start, f in ((0.1, 2093.0), (0.16, 2637.0)):
        t = ting(0.6, f); o = int(SR * start)
        for i, s in enumerate(t):
            if o + i < len(out): out[o + i] += 0.7 * s
    return out

def buzz_sai(d=0.45):  # chuông báo sai: sóng vuông trầm, hai nhịp
    n = int(SR * d); out = []
    for i in range(n):
        t = i / SR; on = 1.0 if (t % 0.22) < 0.18 else 0.0
        sq = 1.0 if math.sin(2 * math.pi * 110 * t) > 0 else -1.0
        out.append((sq + 0.5 * math.sin(2 * math.pi * 165 * t)) * on * 0.6)
    return lowpass(out, 0.25)

def de_kem(d=1.6):  # kèn buồn: bốn nốt đi xuống, nốt cuối rung
    notes = ((0.0, 311.1, 0.3), (0.32, 293.7, 0.3), (0.64, 277.2, 0.3), (0.96, 261.6, 0.64))
    out = [0.0] * int(SR * d)
    for start, f, dur in notes:
        o = int(SR * start); n = int(SR * dur); ph = 0.0
        for i in range(n):
            t = i / SR
            vib = 6 * math.sin(2 * math.pi * 5.5 * t) if dur > 0.5 else 0
            ph += 2 * math.pi * (f + vib) / SR
            s = sum(math.sin(ph * m) / m for m in (1, 2, 3, 4)) * min(1, t / 0.03) * (1 - i / n) ** 0.6
            if o + i < len(out): out[o + i] += s
    return lowpass(out, 0.3)

def im_lang(d=1.2):  # tiếng dế: chuỗi xung cao lặp lại, im lặng xen kẽ
    n = int(SR * d); out = []
    for i in range(n):
        t = i / SR; phase = t % 0.4
        chirp = math.sin(2 * math.pi * 4500 * t) * (1 if phase < 0.12 and (phase % 0.03) < 0.018 else 0)
        out.append(chirp * 0.5)
    return out

def xuoc_dia(d=0.35):  # dừng đột ngột: nhiễu lọc quét xuống rất nhanh
    n = int(SR * d); noise = [random.uniform(-1, 1) for _ in range(n)]
    f = lowpass(noise, lambda i: 0.35 * (1 - i / n) ** 2 + 0.01)
    ph = 0.0; out = []
    for i, x in enumerate(f):
        ph += 2 * math.pi * (700 * (1 - i / n) ** 2 + 60) / SR
        out.append((x + 0.5 * math.sin(ph)) * env(i, n, 0.001, 1.2))
    return out

# ---- bổ sung 16/11/2026 cho hướng hoạt hình: tiếng líu lo của Wob và tiếng diễn ----
def _syllable(f0, f1, d, vib=6.0):  # một âm tiết "nói" vô nghĩa: hoạ âm + đường cao độ trượt + rung nhẹ
    n = int(SR * d); ph = 0.0; out = []
    for i in range(n):
        t = i / n
        f = f0 + (f1 - f0) * t
        f *= 1 + 0.03 * math.sin(2 * math.pi * vib * i / SR)
        ph += 2 * math.pi * f / SR
        a = math.sin(math.pi * t) ** 0.7
        out.append(a * (math.sin(ph) + 0.45 * math.sin(2 * ph) + 0.2 * math.sin(3 * ph)))
    return out

def _speech(contour, gap=0.035):  # chuỗi âm tiết, contour: [(f0, f1, d), ...]
    out = []
    for f0, f1, d in contour:
        out += _syllable(f0, f1, d) + [0.0] * int(SR * gap)
    return out

def liu_lo_vui():  # Wob hớn hở: lên xuống nhanh, kết đi lên
    return _speech([(620, 760, .09), (700, 560, .08), (640, 820, .1), (760, 980, .14)])

def liu_lo_hoi():  # Wob thắc mắc: kết vút lên
    return _speech([(560, 600, .1), (600, 540, .09), (520, 900, .2)])

def liu_lo_buon():  # Wob xìu: đi xuống, chậm
    return _speech([(620, 540, .14), (560, 470, .14), (480, 330, .3)], gap=0.06)

def liu_lo_soc():  # Wob giật mình: một tiếng ngắn vọt lên
    return _speech([(500, 1150, .16)])

def brr():  # Wob run: rung cao độ nhanh
    n = int(SR * 0.7); ph = 0.0; out = []
    for i in range(n):
        f = 420 + 120 * math.sin(2 * math.pi * 28 * i / SR)
        ph += 2 * math.pi * f / SR
        out.append((math.sin(ph) + 0.4 * math.sin(2 * ph)) * env(i, n, 0.02, 1.5))
    return out

def tach_bang(d=0.6):  # băng đóng: vài tiếng tách cao + chuông thuỷ tinh
    n = int(SR * d); out = [0.0] * n
    for k, (t0, f) in enumerate(((0.0, 3100), (0.07, 4200), (0.15, 3600))):
        s0 = int(SR * t0)
        for i in range(s0, n):
            j = i - s0
            out[i] += math.sin(2 * math.pi * f * j / SR) * math.exp(-j / SR * 28) * 0.6
            if j < 300: out[i] += random.uniform(-1, 1) * (1 - j / 300) * 0.5
    return out

def nuot(d=0.3):  # ực: cao độ tụt + bọt
    n = int(SR * d); ph = 0.0; out = []
    for i in range(n):
        ph += 2 * math.pi * (320 * math.exp(-i / SR * 9) + 90) / SR
        out.append(math.sin(ph) * env(i, n, 0.004, 2))
    return out

def buoc_tuyet(d=0.16):  # bước trên tuyết: nhiễu lọc ngắn, lạo xạo
    n = int(SR * d); noise = [random.uniform(-1, 1) * (1 if random.random() < 0.6 else 0.2) for _ in range(n)]
    f = lowpass(noise, 0.35)
    return [x * env(i, n, 0.003, 2.5) for i, x in enumerate(f)]

def may_no(d=1.6):  # xe nổ máy không tắt: xung trầm đều
    n = int(SR * d); out = []
    for i in range(n):
        t = i / SR
        pulse = math.exp(-((t * 14) % 1) * 6)
        out.append(pulse * math.sin(2 * math.pi * 70 * t) * min(1, t * 8, (d - t) * 8))
    return out

def hoi_nuoc(d=1.2):  # hơi nước bốc: nhiễu cao, êm
    n = int(SR * d); noise = [random.uniform(-1, 1) for _ in range(n)]
    lo = lowpass(noise, 0.5)
    return [(x - y) * math.sin(math.pi * i / n) for i, (x, y) in enumerate(zip(noise, lo))]

for name, fn in {"whoosh": whoosh, "pop": pop, "ting": ting, "drop": drop, "rise": rise, "dau-wob": dau_wob,
                 "bonk": bonk, "boing": boing, "ka-ching": ka_ching, "buzz-sai": buzz_sai, "de-kem": de_kem,
                 "im-lang": im_lang, "xuoc-dia": xuoc_dia}.items():
    write(name, fn())
    print("ok", name)
for name, fn in {"liu-lo-vui": liu_lo_vui, "liu-lo-hoi": liu_lo_hoi, "liu-lo-buon": liu_lo_buon, "liu-lo-soc": liu_lo_soc,
                 "brr": brr, "tach-bang": tach_bang, "nuot": nuot, "buoc-tuyet": buoc_tuyet, "may-no": may_no,
                 "hoi-nuoc": hoi_nuoc}.items():
    write(name, fn())
    print("ok", name)

# Thêm 26/11/2026 cho tập 4 (đảo Santa Cruz del Islote). Đặt sau hai vòng trên để các file cũ không đổi
# (random.seed(7) dùng theo thứ tự).

def muoi(d=1.4):  # muỗi vo ve bay ngang: sóng răng cưa mảnh ~620 Hz, rung cao độ, to dần rồi nhỏ dần
    n = int(SR * d); ph = 0.0; out = []
    for i in range(n):
        t = i / SR
        f = 620 + 35 * math.sin(2 * math.pi * 9 * t) + 20 * math.sin(2 * math.pi * 2.3 * t)
        ph += f / SR
        saw = 2 * (ph % 1) - 1
        out.append(saw * 0.6 * math.sin(math.pi * i / n) ** 1.2 * (0.8 + 0.2 * math.sin(2 * math.pi * 13 * t)))
    return lowpass(out, 0.35)

def lat_giay(d=0.32):  # lật một trang giấy: nhiễu cao ngắn hai nhịp, lọc nhẹ
    n = int(SR * d); noise = [random.uniform(-1, 1) for _ in range(n)]
    lo = lowpass(noise, 0.15)
    out = []
    for i, (x, y) in enumerate(zip(noise, lo)):
        t = i / SR
        g = math.exp(-((t - 0.05) / 0.035) ** 2) + 0.7 * math.exp(-((t - 0.19) / 0.06) ** 2)
        out.append((0.6 * (x - y) + 0.4 * y) * g)
    return out

def song(d=2.6):  # một con sóng nhỏ vỗ vào bờ: nhiễu trầm dâng lên, vỡ, rút xuống
    n = int(SR * d); noise = [random.uniform(-1, 1) for _ in range(n)]
    f = lowpass(noise, lambda i: 0.015 + 0.09 * math.sin(math.pi * i / n) ** 3)
    return [x * (math.sin(math.pi * min(1.0, i / (n * 0.45))) if i < n * 0.45 else (1 - (i - n * 0.45) / (n * 0.55)) ** 1.5)
            for i, x in enumerate(f)]

for name, fn in {"muoi": muoi, "lat-giay": lat_giay, "song": song}.items():
    write(name, fn())
    print("ok", name)
