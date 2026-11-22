#!/usr/bin/env python3
"""Cổng 5 giây đầu cho clip dọc đã dựng. Mã 0 = ĐẠT, 1 = có LỖI.

Chạy:  python .claude/skills/cat-clip-doc/scripts/kiem_5_giay.py <dự án> [--chi k1,k3]
Ghi:   <dự án>/out/clip-doc/kiem-5-giay.json (+ in bảng)

Đo trên chính file mp4 (không tin kế hoạch):
  A. Tiếng vào ngay: âm thanh vượt −35 dBFS trước 0,35 s.
  B. Khung 0 có nội dung: vùng cảnh (y 430–1240) có độ lệch sáng ≥ 14 và không ≥ 85% điểm ảnh màu giấy trống.
  C. Có chuyển động trong 5 giây đầu: chênh lệch trung bình giữa các khung cách 0,5 s ở vùng cảnh ≥ 1,2
     (ở mọi cặp liền nhau: không đoạn nào đứng hình quá 1 giây).
  D. Lời dày: từ được nói trong 5 giây đầu ≥ 8 (theo timeline.json và kế hoạch).
  E. Câu mở tự đứng được và câu mồi đọc kịp (mo_dau.py).
  F. Không có lời kêu gọi rời clip trước giây 5 (vùng 1600–1800 ở khung 2 s và 4 s không có chữ "Full trip").
     Đo gián tiếp: so vùng đó giữa khung 2 s và khung 6 s phải khác nhau (CTA hiện sau 5 s).
Ngưỡng là mặc định ban đầu; chỉnh theo đường giữ chân thật (kenh/bai-hoc.md).
"""
import argparse
import json
import pathlib
import re
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from mo_dau import danh_gia_cau_mo, kiem_tieu_de, trung_cau_mo  # noqa: E402

PAPER = (247, 236, 211)


def frame(mp4, t, crop=None, scale=(270, 480)):
    vf = (f"crop={crop}," if crop else "") + f"scale={scale[0]}:{scale[1]},format=rgb24"
    raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", "%.2f" % t, "-i", str(mp4), "-frames:v", "1",
                          "-vf", vf, "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
    return [tuple(raw[i:i + 3]) for i in range(0, len(raw), 3)]


def luma(px):
    return [0.299 * r + 0.587 * g + 0.114 * b for r, g, b in px]


def sd(v):
    m = sum(v) / len(v)
    return (sum((x - m) ** 2 for x in v) / len(v)) ** 0.5


def diff(a, b):
    return sum(abs(x - y) for x, y in zip(luma(a), luma(b))) / len(a)


def first_sound(mp4):
    r = subprocess.run(["ffmpeg", "-v", "info", "-t", "2", "-i", str(mp4), "-af", "silencedetect=noise=-35dB:d=0.05",
                        "-f", "null", "-"], capture_output=True, text=True, encoding="utf-8", errors="replace").stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r)]
    if not starts or starts[0] > 0.05:
        return 0.0
    return ends[0] if ends else 2.0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("du_an")
    ap.add_argument("--chi")
    a = ap.parse_args()
    du = pathlib.Path(a.du_an).resolve()
    out = du / "out" / "clip-doc"
    plan = json.loads((out / "ke-hoach.json").read_text(encoding="utf-8"))
    caps = json.loads((du / "timeline.json").read_text(encoding="utf-8"))["captions"]
    only = set(a.chi.split(",")) if a.chi else None
    report, bad = {}, 0
    for clip in plan["clips"]:
        if only and clip["id"] not in only:
            continue
        mp4 = out / (clip["id"] + ".mp4")
        r = {"loi": [], "do": {}}
        if not mp4.exists():
            r["loi"].append("chưa có file mp4")
            report[clip["id"]] = r
            bad += 1
            continue
        vid_h = 608 if clip.get("toan_canh") else 810
        crop = f"1080:{vid_h}:0:430"
        # A
        fs = first_sound(mp4)
        r["do"]["tieng_vao_s"] = round(fs, 2)
        if fs > 0.35:
            r["loi"].append("A: tiếng vào lúc %.2fs (> 0,35s)" % fs)
        # B
        f0 = frame(mp4, 0.0, crop, (216, 162))
        s0 = sd(luma(f0))
        giay = sum(1 for p in f0 if all(abs(p[i] - PAPER[i]) < 18 for i in range(3))) / len(f0)
        r["do"]["khung0_do_lech"] = round(s0, 1)
        r["do"]["khung0_ti_le_giay"] = round(giay, 2)
        if s0 < 14 or giay >= 0.85:
            r["loi"].append("B: khung 0 gần như trống (độ lệch %.1f, giấy %.0f%%)" % (s0, giay * 100))
        # C
        fr = [frame(mp4, t, crop, (216, 162)) for t in [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]]
        ds = [diff(fr[i], fr[i + 1]) for i in range(len(fr) - 1)]
        r["do"]["chuyen_dong"] = [round(x, 2) for x in ds]
        if sum(ds) / len(ds) < 1.2:
            r["loi"].append("C: 5 giây đầu ít chuyển động (TB %.2f)" % (sum(ds) / len(ds)))
        dung = [i for i in range(len(ds) - 1) if ds[i] < 0.3 and ds[i + 1] < 0.3]
        if dung:
            r["loi"].append("C: đứng hình > 1s quanh %.1fs" % (dung[0] * 0.5))
        # D, E
        t = clip.get("teaser")
        segs = ([(t["tu"], t["den"], 0.0)] if t else []) + [(clip["start"], clip["end"], (t["den"] - t["tu"]) if t else 0.0)]
        n5 = 0
        for s, e, off in segs:
            n5 += sum(1 for c in caps for w in c.get("words", []) if s <= w["start"] < e and w["start"] - s + off < 5)
        r["do"]["tu_trong_5s"] = n5
        if n5 < 8:
            r["loi"].append("D: chỉ %d từ trong 5 giây đầu" % n5)
        t0 = t["tu"] if t else clip["start"]
        idx = next((i for i, c in enumerate(caps) if c["end"] > t0 + 0.05), None)
        cau = caps[idx]["text"].strip() if idx is not None else ""
        ke = caps[idx + 1]["text"] if idx is not None and idx + 1 < len(caps) else ""
        diem, loi_mo, uu = danh_gia_cau_mo(cau, ke)
        r["do"]["cau_mo"] = cau
        r["do"]["diem_cau_mo"] = diem
        r["do"]["uu"] = uu
        r["loi"] += ["E: " + x for x in loi_mo + kiem_tieu_de(clip.get("tieu_de", ""))]
        if trung_cau_mo(clip.get("tieu_de", ""), cau):
            r["loi"].append("E: câu mồi lặp lại câu mở")
        # F
        z2 = frame(mp4, 2.0, "700:200:330:1600", (140, 40))
        z6 = frame(mp4, 6.5, "700:200:330:1600", (140, 40))
        if diff(z2, z6) < 2.0 and (clip["end"] - clip["start"]) > 9:
            r["loi"].append("F: vùng lời kêu gọi giống nhau ở 2s và 6.5s (CTA có thể hiện quá sớm)")
        report[clip["id"]] = r
        bad += 1 if r["loi"] else 0
    (out / "kiem-5-giay.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    for k, r in report.items():
        print("%-4s %s  tiếng %.2fs | khung0 %.0f | chuyển động TB %.1f | %d từ/5s | mở: %s" % (
            k, "ĐẠT  " if not r["loi"] else "LỖI  ", r["do"].get("tieng_vao_s", -1), r["do"].get("khung0_do_lech", 0),
            sum(r["do"].get("chuyen_dong", [0])) / max(1, len(r["do"].get("chuyen_dong", [0]))), r["do"].get("tu_trong_5s", 0),
            r["do"].get("cau_mo", "")[:50]))
        for e in r["loi"]:
            print("       ", e)
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
