#!/usr/bin/env python3
"""Ghép các đoạn hoạt hình (mỗi đoạn một phong cách) thành video cuối, theo templates/hoat-hinh/HOP-DONG.md.

Cách dùng:
  python ghep_doan.py <thư mục dự án> [--cho-thieu] [--khong-tron]

Làm gì:
1. Kiểm mỗi hoat-hinh/doan-<id>/out/doan.mp4: có, đúng khung xuất của dự án (phan-canh.json → xuat, xem khung_xuat.py:
   2560×1440 từ tập 4, 1920×1080 cho tập 1–3), độ dài khớp đoạn (lệch > 1 khung thì cảnh báo, > 0,5 s thì lỗi).
   --cho-thieu: đoạn chưa có clip thì thay bằng khung giấy phẳng #EFE3C8 (để nghe thử nhịp), có cảnh báo.
2. Nối hình (encode lại đồng nhất H.264 30 fps) → hoat-hinh/out/hinh.mp4.
3. Đặt giọng audio/scene-N.mp3 theo phan-canh.json → loi → hoat-hinh/out/render-raw.mp4 (hình + giọng).
4. Gom sfx.json của các đoạn (mốc + bat_dau của đoạn) + nhạc phan-canh.json → nhac → hoat-hinh/timeline.json.
5. Gọi .claude/skills/xuat-video/scripts/mix_audio.py hoat-hinh → hoat-hinh/out/video.mp4, video-no-music.mp4 (−14 LUFS).
6. Trích khung kiểm tra quanh mỗi chỗ nối → hoat-hinh/out/frames/noi-<a>-<b>-{truoc,sau}.png và bảng tong-hop.jpg.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from khung_xuat import THIET_KE, doc_xuat  # noqa: E402
MIX = REPO / ".claude" / "skills" / "xuat-video" / "scripts" / "mix_audio.py"
GIAY = "0xEFE3C8"


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"LỖI lệnh: {' '.join(map(str, cmd))}\n{r.stderr[-2000:]}")
    return r


def probe(p: Path) -> dict:
    r = run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate:format=duration",
             "-of", "json", str(p)])
    j = json.loads(r.stdout)
    st = j["streams"][0]
    num, den = st["r_frame_rate"].split("/")
    return {"w": st["width"], "h": st["height"], "fps": float(num) / float(den), "dur": float(j["format"]["duration"])}


def khung_noi(pc, out, khong_tron=False):
    """Bước 5: khung trước/sau mỗi chỗ nối + tong-hop.jpg. Trả về đường dẫn video đã dùng."""
    # 5. khung kiểm chỗ nối
    final = out / ("video.mp4" if (out / "video.mp4").exists() and not khong_tron else "render-raw.mp4")
    shots = []
    for s1, s2 in zip(pc["doan"], pc["doan"][1:]):
        t = float(s1["ket_thuc"])
        for tag, tt in (("truoc", t - 0.2), ("sau", t + 0.2)):
            f = out / "frames" / f"noi-{s1['id']}-{s2['id']}-{tag}.png"
            run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{max(0, tt):.3f}", "-i", str(final), "-frames:v", "1", str(f)])
            shots.append(f)
    if shots:
        cols = 4
        rows = (len(shots) + cols - 1) // cols
        ins = []
        for f in shots:
            ins += ["-i", str(f)]
        lay = "|".join(f"{(k % cols) * 480}_{(k // cols) * 270}" for k in range(len(shots)))
        sc = ";".join(f"[{k}:v]scale=480:270[s{k}]" for k in range(len(shots)))
        run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex",
             sc + ";" + "".join(f"[s{k}]" for k in range(len(shots))) + f"xstack=inputs={len(shots)}:layout={lay}:fill=black",
             "-frames:v", "1", str(out / "frames" / "tong-hop.jpg")]) if len(shots) > 1 else None
    return final


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--cho-thieu", action="store_true")
    ap.add_argument("--khong-tron", action="store_true", help="chỉ ghép hình + giọng, không chạy mix_audio")
    ap.add_argument("--khong-logo", action="store_true", help="không đóng logo góc phải trên")
    ap.add_argument("--chi-khung", action="store_true", help="chỉ chụp lại khung chỗ nối từ video đã ghép (bước 5)")
    args = ap.parse_args()
    project = Path(args.project).resolve()
    hh = project / "hoat-hinh"
    pc = json.loads((hh / "phan-canh.json").read_text(encoding="utf-8"))
    fps = pc.get("fps", 30)
    XW, XH = doc_xuat(pc)          # khung xuất, đọc từ một chỗ (phan-canh.json → xuat)
    K = XW / THIET_KE[0]           # vị trí, cỡ logo tính theo hệ thiết kế 1920×1080 rồi nhân K
    print(f"Khung xuất {XW}×{XH}" + ("" if "xuat" in pc else " (phan-canh.json không có xuat: chế độ tập 1–3)"))
    out = hh / "out"
    out.mkdir(parents=True, exist_ok=True)
    (out / "frames").mkdir(exist_ok=True)
    if args.chi_khung:
        print(f"Khung chỗ nối → {khung_noi(pc, out)} · {out / 'frames' / 'tong-hop.jpg'}")
        return

    # 1. kiểm clip
    inputs, filt, warn = [], [], []
    for i, seg in enumerate(pc["doan"]):
        dur = float(seg["ket_thuc"]) - float(seg["bat_dau"])
        clip = hh / f"doan-{seg['id']}" / "out" / "doan.mp4"
        if clip.exists():
            p = probe(clip)
            if (p["w"], p["h"]) != (XW, XH):
                sys.exit(f"LỖI: {clip} là {p['w']}×{p['h']}, dự án xuất {XW}×{XH} "
                         "(chạy lại chuan_bi_doan.py cho đoạn đó rồi render lại; không phóng clip bằng ffmpeg)")
            diff = p["dur"] - dur
            if abs(diff) > 0.5:
                sys.exit(f"LỖI: {clip} dài {p['dur']:.3f} s, đoạn cần {dur:.3f} s")
            if abs(diff) > 1.0 / fps + 1e-3:
                warn.append(f"doan-{seg['id']}: lệch {diff:+.3f} s (sẽ cắt/kéo khung cuối cho khớp)")
            inputs += ["-i", str(clip)]
        elif args.cho_thieu:
            warn.append(f"doan-{seg['id']}: CHƯA CÓ clip, thay bằng khung giấy phẳng")
            inputs += ["-f", "lavfi", "-t", f"{dur:.3f}", "-i", f"color=c={GIAY}:s={XW}x{XH}:r={fps}"]
        else:
            sys.exit(f"LỖI: thiếu {clip} (dùng --cho-thieu để ghép thử)")
        # chuẩn hoá: đúng fps, đúng độ dài (tpad giữ khung cuối nếu thiếu, trim nếu thừa)
        filt.append(f"[{i}:v]fps={fps},scale={XW}:{XH},setsar=1,format=yuv420p,"
                    f"tpad=stop_mode=clone:stop_duration=1,trim=duration={dur:.4f},setpts=PTS-STARTPTS[v{i}]")
    n = len(pc["doan"])
    logo = REPO / "templates/_shared/logo-goc-video.png"
    if not args.khong_logo and logo.exists():
        # Logo nhỏ góc phải trên, mờ 85% (thuong-hieu.md, frame.md); trong vùng an toàn 96/54 px của hệ thiết kế (×K ở khung xuất)
        inputs += ["-loop", "1", "-i", str(logo)]
        logo_2k = REPO / "templates/_shared/logo-goc-video-2k.png"  # 427×104, dựng lại từ logo.png cho khung 2560×1440
        if abs(K - 4 / 3) < 1e-3 and logo_2k.exists():
            inputs[-1] = str(logo_2k)
            lg_scale = ""
        else:
            lg_scale = "" if K == 1 else f"scale=iw*{K:.6f}:-1:flags=lanczos,"
        filt.append("".join(f"[v{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[vc]")
        # an_logo: [[giây bắt đầu, giây kết thúc], ...] trong phan-canh.json: ẩn logo khi chữ của cảnh nằm dưới góc logo
        an = pc.get("an_logo") or []
        en = (":enable='not(" + "+".join(f"between(t,{a:.2f},{b:.2f})" for a, b in an) + ")'") if an else ""
        filt.append(f"[{n}:v]{lg_scale}format=rgba,colorchannelmixer=aa=0.85[lg];"
                    f"[vc][lg]overlay=W-w-{round(96 * K)}:{round(54 * K)}:shortest=1{en}[v]")
    else:
        filt.append("".join(f"[v{i}]" for i in range(n)) + f"concat=n={n}:v=1:a=0[v]")
    hinh = out / "hinh.mp4"
    run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", ";".join(filt), "-map", "[v]",
         "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-r", str(fps), str(hinh)])
    total = float(pc["thoi_luong"])

    # 2. giọng
    vin, vparts = [], []
    for k, v in enumerate(pc.get("loi", [])):
        f = project / "audio" / f"scene-{v['scene']}.mp3"
        if not f.exists():
            sys.exit(f"LỖI: thiếu {f}")
        vin += ["-i", str(f)]
        ms = int(round(float(v["bat_dau"]) * 1000))
        vparts.append(f"[{k + 1}:a]aresample=48000,adelay={ms}|{ms}[a{k}]")
    raw = out / "render-raw.mp4"
    if vparts:
        graph = ";".join(vparts) + ";" + "".join(f"[a{k}]" for k in range(len(vparts))) + \
            f"amix=inputs={len(vparts)}:duration=longest:normalize=0,apad=whole_dur={total:.3f},atrim=0:{total:.3f}[a]"
        run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(hinh), *vin, "-filter_complex", graph,
             "-map", "0:v", "-map", "[a]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", str(raw)])
    else:
        run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(hinh), "-f", "lavfi", "-t", f"{total:.3f}", "-i",
             "anullsrc=r=48000:cl=stereo", "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", str(raw)])

    # 3. timeline cho mix_audio
    sfx = []
    for seg in pc["doan"]:
        p = hh / f"doan-{seg['id']}" / "sfx.json"
        if not p.exists():
            warn.append(f"doan-{seg['id']}: không có sfx.json")
            continue
        for fx in json.loads(p.read_text(encoding="utf-8")):
            src = REPO / "sfx" / f"{fx['ten']}.wav"
            if not src.exists():
                warn.append(f"doan-{seg['id']}: sfx '{fx['ten']}' không có trong sfx/ (bỏ)")
                continue
            at = float(seg["bat_dau"]) + float(fx["tai"])
            if 0 <= at < total:
                sfx.append({"src": src.as_posix(), "at": round(at, 3), "volume": fx.get("am_luong", 0.6), "doan": seg["id"]})
    scenes = []
    subs_p = project / "audio" / "subtitles.json"
    subs = {s["id"]: s for s in json.loads(subs_p.read_text(encoding="utf-8"))["scenes"]} if subs_p.exists() else {}
    for v in pc.get("loi", []):
        scenes.append({"id": v["scene"], "start": float(v["bat_dau"]), "duration": float(subs.get(v["scene"], {}).get("duration", 0))})
    timeline = {"duration": total, "scenes": scenes, "sfx": sorted(sfx, key=lambda x: x["at"])}
    if pc.get("nhac"):
        timeline["music"] = {"volume": pc.get("am_luong_nhac", 0.22), "crossfade": 0.5,
                             "segments": [{"src": (REPO / m["src"]).as_posix(), "start": float(m["bat_dau"]),
                                           "end": float(m["ket_thuc"]), "mood": m.get("mood")} for m in pc["nhac"]]}
    (hh / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=1), encoding="utf-8")

    # 4. trộn âm
    if not args.khong_tron:
        r = subprocess.run([sys.executable, str(MIX), str(hh)], capture_output=True, text=True)
        print(r.stdout[-1500:])
        if r.returncode != 0:
            sys.exit(f"LỖI mix_audio:\n{r.stderr[-2000:]}")

    final = khung_noi(pc, out, args.khong_tron)

    print(f"Xong: {n} đoạn, {total:.2f} s, {len(sfx)} sfx → {final}")
    from collections import Counter
    c = Counter(s["phong_cach"] for s in pc["doan"])
    secs = {k: sum(float(s["ket_thuc"]) - float(s["bat_dau"]) for s in pc["doan"] if s["phong_cach"] == k) for k in c}
    print("Tỉ lệ phong cách: " + ", ".join(f"{k} {secs[k] / total:.0%} ({c[k]} đoạn)" for k in sorted(c)))
    for w in warn:
        print("CẢNH BÁO:", w)


if __name__ == "__main__":
    main()
