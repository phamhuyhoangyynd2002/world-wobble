#!/usr/bin/env python3
"""Kiểm tra kỹ thuật video cuối của World Wobble và trích khung để xem bằng mắt.

Cách dùng: python3 kiem_ky_thuat.py <thư mục dự án> [--video out/video.mp4]

LỖI (mã thoát 1): sai kích thước (theo khung xuất của dự án: hoat-hinh/phan-canh.json → xuat, mặc định 1920×1080), khung hình, codec; thiếu audio; độ dài lệch timeline > 0,5s; khung đen > 0,5s;
khung đầu tối (gần như đen); âm lượng lệch −14 LUFS quá 1 LU hoặc true peak > −1 dBTP; thiếu captions.srt, chapters.txt;
chương đầu không ở 0:00.
CẢNH BÁO: khoảng lặng > 2,5s; im lặng ở 2 giây cuối.
Ghi out/ky-thuat.json, trích khung vào out/frames/ và bảng ảnh out/frames/tong-hop.jpg (mở bằng Read để tự xem).
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "dung-hoat-hinh" / "scripts"))
from khung_xuat import doc_xuat_du_an  # noqa: E402


def run(cmd: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True)


def frame(video: Path, t: float, dest: Path) -> bool:
    r = run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{t:.2f}", "-i", str(video), "-frames:v", "1",
             "-vf", "scale=960:-2", str(dest)])
    return r.returncode == 0 and dest.exists()


def mean_luma(img: Path) -> float | None:
    try:
        from PIL import Image, ImageStat
        return ImageStat.Stat(Image.open(img).convert("L")).mean[0]
    except Exception:  # noqa: BLE001
        return None


def contact_sheet(frames: list[tuple[str, Path]], dest: Path) -> None:
    try:
        from PIL import Image, ImageDraw
    except ImportError:
        return
    imgs = [(label, Image.open(p)) for label, p in frames if p.exists()]
    if not imgs:
        return
    w, h = imgs[0][1].size
    cols = 3
    rows = (len(imgs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * w, rows * (h + 34)), "#111")
    d = ImageDraw.Draw(sheet)
    for i, (label, im) in enumerate(imgs):
        x, y = (i % cols) * w, (i // cols) * (h + 34)
        sheet.paste(im.resize((w, h)), (x, y + 34))
        d.text((x + 8, y + 8), label, fill="#ffd166")
    sheet.save(dest, quality=85)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--video", default="out/video.mp4")
    args = ap.parse_args()
    project = Path(args.project)
    video = project / args.video
    errors, warns = [], []
    if not video.exists():
        print(f"LỖI: không thấy {video}")
        return 1
    timeline = json.loads((project / "timeline.json").read_text(encoding="utf-8"))

    pr = json.loads(run(["ffprobe", "-v", "error", "-show_entries",
                         "stream=codec_type,codec_name,width,height,r_frame_rate:format=duration",
                         "-of", "json", str(video)]).stdout or "{}")
    vs = next((s for s in pr.get("streams", []) if s["codec_type"] == "video"), None)
    au = next((s for s in pr.get("streams", []) if s["codec_type"] == "audio"), None)
    dur = float(pr.get("format", {}).get("duration", 0))
    if not vs:
        errors.append("không có luồng hình")
    else:
        # Khung xuất theo dự án (hoat-hinh/phan-canh.json → xuat): 2560×1440 từ tập 4, 1920×1080 cho tập 1–3, trình chiếu cũ
        cw, ch = doc_xuat_du_an(project)
        if (vs.get("width"), vs.get("height")) != (cw, ch):
            errors.append(f"kích thước {vs.get('width')}×{vs.get('height')}, cần {cw}×{ch}")
        num, den = (vs.get("r_frame_rate") or "0/1").split("/")
        fps = float(num) / float(den or 1)
        if abs(fps - timeline.get("fps", 30)) > 0.05:
            errors.append(f"{fps:.2f} khung/giây, cần {timeline.get('fps', 30)}")
        if vs.get("codec_name") != "h264":
            errors.append(f"codec hình {vs.get('codec_name')}, cần h264")
    if not au:
        errors.append("không có luồng âm thanh")
    elif au.get("codec_name") != "aac":
        errors.append(f"codec âm thanh {au.get('codec_name')}, cần aac")
    if abs(dur - timeline["duration"]) > 0.5:
        errors.append(f"độ dài {dur:.2f}s lệch timeline {timeline['duration']:.2f}s")

    bd = run(["ffmpeg", "-hide_banner", "-i", str(video), "-vf", "blackdetect=d=0.5:pix_th=0.10", "-an", "-f", "null", "-"]).stderr
    blacks = [(float(a), float(b)) for a, b in re.findall(r"black_start:([\d.]+) black_end:([\d.]+)", bd)]
    for a, b in blacks:
        errors.append(f"khung đen {a:.1f}s–{b:.1f}s")
    sd = run(["ffmpeg", "-hide_banner", "-i", str(video), "-af", "silencedetect=noise=-45dB:d=2.5", "-vn", "-f", "null", "-"]).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", sd)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", sd)]
    for i, a in enumerate(starts):
        b = ends[i] if i < len(ends) else dur
        warns.append(f"khoảng lặng {a:.1f}s–{b:.1f}s ({b - a:.1f}s)")

    rep_p = project / "out" / "audio-report.json"
    if rep_p.exists():
        rep = json.loads(rep_p.read_text(encoding="utf-8"))
        r = (rep.get("files") or {}).get(video.name) or {}
        if r.get("lufs") is not None and abs(r["lufs"] + 14) > 1:
            errors.append(f"âm lượng {r['lufs']} LUFS, cần khoảng −14")
        if r.get("true_peak") is not None and r["true_peak"] > -1.0:
            errors.append(f"true peak {r['true_peak']} dBFS > −1")
    else:
        warns.append("chưa có out/audio-report.json (chạy mix_audio.py)")

    for name in ("captions.srt", "chapters.txt"):
        if not (project / "out" / name).exists():
            errors.append(f"thiếu out/{name} (chạy build_timeline.py)")
    ch = timeline.get("chapters") or []
    if ch and ch[0]["at"] != 0:
        errors.append("chương đầu không ở 0:00")

    frames_dir = project / "out" / "frames"
    frames_dir.mkdir(parents=True, exist_ok=True)
    marks = [("t=0", 0.0), ("t=3", 3.0), ("t=10", 10.0)]
    marks += [(f"chương: {c['title'][:28]}", c["at"] + min(4.0, (c["end"] - c["at"]) / 2)) for c in ch[1:]]
    stamp = next((s["verdict"]["at"] for s in timeline["scenes"] if s.get("verdict")), None)
    if stamp is not None:
        marks.append(("con dấu", stamp + 0.6))
    marks += [("20 giây cuối (end screen)", max(0.0, dur - 15)), ("khung cuối", max(0.0, dur - 0.2))]
    shot = []
    for i, (label, t) in enumerate(marks):
        p = frames_dir / f"kt-{i:02d}.jpg"
        if frame(video, min(t, max(0.0, dur - 0.1)), p):
            shot.append((f"{label} · {int(t) // 60}:{int(t) % 60:02d}", p))
    if shot:
        lum = mean_luma(shot[0][1])
        if lum is not None and lum < 18:
            errors.append(f"khung đầu gần như đen (độ sáng trung bình {lum:.0f}/255): khung 0 phải có hình nơi đó và câu hỏi")
    contact_sheet(shot, frames_dir / "tong-hop.jpg")

    result = {"video": str(video), "duration": dur, "errors": errors, "warnings": warns, "frames": [str(p) for _, p in shot]}
    (project / "out" / "ky-thuat.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    for e in errors:
        print(f"LỖI: {e}")
    for w in warns:
        print(f"CẢNH BÁO: {w}")
    print(f"{'KHÔNG ĐẠT' if errors else 'ĐẠT'}: {dur / 60:.1f} phút · {len(errors)} lỗi · {len(warns)} cảnh báo · "
          f"bảng ảnh {frames_dir / 'tong-hop.jpg'}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
