#!/usr/bin/env python3
"""Kiểm chuyển động từng khung của một video hoạt hình (cổng 6b, hợp đồng đoạn mục 6).

Bắt các lỗi mà xem bảng khung không thấy:
  - ĐỨNG HÌNH: chuỗi khung gần như không đổi. Luật kênh (templates/hoat-hinh/_the-canh/NGU-PHAP-CAMERA.md):
    giữ hình vẫn phải đẩy camera vào chậm, nên ≥ 12 khung đứng yên là CẢNH BÁO, ≥ 24 khung là LỖI.
  - KHUNG ĐEN / TRẮNG: độ sáng trung bình gần 0 hoặc gần 255 (khung nối `giay` màu #EFE3C8 không tính là trắng).
  - KHUNG GIẬT: một khung lệch hẳn so với cả khung trước và khung sau (khung lỗi, chớp, đồ vật nhảy chỗ một nhịp).
  - Thông tin: số lần cắt cứng, tỉ lệ khung có chuyển động, đoạn tĩnh dài nhất.
Học từ scripts/short_qa.py của mromidev/claude-animated-shorts (MIT); viết lại cho kênh.

Chạy:  python kiem_dong_hinh.py <video.mp4> [--json out/dong-hinh.json] [--dung 12] [--bo-cuoi 0]
Mã thoát: 0 đạt (có thể kèm CẢNH BÁO), 1 có LỖI, 2 không đọc được video.
"""
import argparse
import json
import subprocess
import sys

import numpy as np

W, H = 192, 108          # khung thu nhỏ để đo (đủ thấy chuyển động, nhanh)
NGUONG_DUNG = 0.12       # chênh trung bình (0–255) dưới mức này coi là không đổi; nét sôi, đẩy camera chậm đều vượt mức này
NGUONG_CAT = 28.0        # chênh lớn hơn mức này và gấp 4 lần hai khung lân cận: cắt cứng
NGUONG_GIAT = 10.0


def doc_khung(path):
    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate",
                            "-of", "csv=p=0", path], capture_output=True, text=True)
    if probe.returncode != 0:
        raise RuntimeError(probe.stderr.strip() or "ffprobe lỗi")
    num, den = (probe.stdout.strip().split("/") + ["1"])[:2]
    fps = float(num) / float(den or 1)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vf", f"scale={W}:{H}:flags=area,format=gray",
                          "-f", "rawvideo", "-"], capture_output=True)
    if raw.returncode != 0:
        raise RuntimeError(raw.stderr.decode(errors="replace").strip())
    n = len(raw.stdout) // (W * H)
    return fps, np.frombuffer(raw.stdout[: n * W * H], dtype=np.uint8).reshape(n, H, W).astype(np.float32)


def chuoi(mask):
    """[(bắt đầu, kết thúc)] các chuỗi True liên tiếp (kết thúc không tính)."""
    out, start = [], None
    for i, v in enumerate(mask):
        if v and start is None:
            start = i
        elif not v and start is not None:
            out.append((start, i)); start = None
    if start is not None:
        out.append((start, len(mask)))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--json")
    ap.add_argument("--dung", type=int, default=12, help="số khung đứng yên thì cảnh báo (gấp đôi thì lỗi)")
    ap.add_argument("--bo-cuoi", type=float, default=0.0, help="bỏ qua đứng hình trong N giây cuối (giữ hình kết video)")
    a = ap.parse_args()
    try:
        fps, f = doc_khung(a.video)
    except Exception as e:  # noqa: BLE001
        print(f"LỖI: không đọc được video: {e}")
        return 2
    n = len(f)
    if n < 3:
        print("LỖI: video quá ngắn"); return 2
    t = lambda i: round(i / fps, 2)  # noqa: E731
    sang = f.mean(axis=(1, 2))
    d = np.zeros(n); d[1:] = np.abs(f[1:] - f[:-1]).mean(axis=(1, 2))   # chênh với khung trước

    loi, canh_bao = [], []

    # đứng hình: chênh < ngưỡng (khung i giống khung i-1); chuỗi k khung giống nhau = k+1 khung tĩnh
    dung = [(s - 1, e) for s, e in chuoi(d < NGUONG_DUNG) if s > 0]
    gioi_han = n - int(a.bo_cuoi * fps)
    spans = []
    for s, e in dung:
        dai = e - s
        if dai < a.dung or s >= gioi_han:
            continue
        spans.append({"tu": t(s), "den": t(e), "khung": dai})
        (loi if dai >= 2 * a.dung else canh_bao).append(f"đứng hình {dai} khung ({t(s)}–{t(e)} s)")

    # khung đen / trắng
    for s, e in chuoi(sang < 8):
        loi.append(f"khung đen {e - s} khung ({t(s)}–{t(e)} s)")
    for s, e in chuoi(sang > 247):
        canh_bao.append(f"khung trắng {e - s} khung ({t(s)}–{t(e)} s)")

    # khung giật: lệch mạnh với cả trước lẫn sau, nhưng trước và sau giống nhau
    giat = []
    for i in range(1, n - 1):
        if d[i] > NGUONG_GIAT and d[i + 1] > NGUONG_GIAT:
            truoc_sau = np.abs(f[i + 1] - f[i - 1]).mean()
            if truoc_sau < 0.35 * min(d[i], d[i + 1]):
                giat.append(t(i))
    for g in giat:
        loi.append(f"khung giật ở {g} s")

    # cắt cứng
    cat = [t(i) for i in range(1, n) if d[i] > NGUONG_CAT and d[i] > 4 * max(d[i - 1], d[i + 1] if i + 1 < n else 0, 1e-3)]

    dong = float((d[1:] >= NGUONG_DUNG).mean())
    dai_nhat = max([e - s for s, e in dung], default=0)
    kq = {
        "video": a.video, "fps": round(fps, 3), "so_khung": n, "thoi_luong": t(n),
        "ti_le_khung_co_chuyen_dong": round(dong, 3), "doan_tinh_dai_nhat_khung": int(dai_nhat),
        "cat_cung": cat, "dung_hinh": spans, "khung_giat": giat,
        "loi": loi, "canh_bao": canh_bao,
    }
    if a.json:
        with open(a.json, "w", encoding="utf-8") as fh:
            json.dump(kq, fh, ensure_ascii=False, indent=2)

    print(f"{a.video}: {n} khung, {t(n)} s, {fps:g} fps")
    print(f"  khung có chuyển động: {dong:.1%} · đoạn tĩnh dài nhất: {dai_nhat} khung · cắt cứng: {len(cat)} {cat[:12]}")
    for x in loi:
        print(f"LỖI: {x}")
    for x in canh_bao:
        print(f"CẢNH BÁO: {x}")
    print("ĐẠT" if not loi else "KHÔNG ĐẠT")
    return 1 if loi else 0


if __name__ == "__main__":
    sys.exit(main())
