#!/usr/bin/env python3
"""Tạo mốc khẩu hình (kiểu Rhubarb A–F, X) cho từng cảnh từ biên độ âm thanh + mốc từng từ.

Dùng thay Rhubarb Lip Sync khi chưa được phép chạy rhubarb.exe. Không chính xác theo âm vị như Rhubarb,
nhưng đủ cho nhân vật hoạt hình đơn giản: miệng mở theo độ to, hình O/U khi từ có nguyên âm tròn,
mím môi ở đầu từ bắt đầu bằng m/b/p.

Cách dùng: python tao_khau_hinh.py <thư mục chung>   (đọc audio/scene-*.mp3, audio/subtitles.json)
Ghi: khau-hinh/scene-<id>.json dạng {"mouthCues": [{"start": s, "end": s, "value": "A".."F"|"X"}]}
"""
import json
import subprocess
import sys
from array import array
from pathlib import Path

FPS = 30
SR = 16000


def rms_frames(mp3: Path) -> list[float]:
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(mp3), "-ac", "1", "-ar", str(SR),
                          "-f", "s16le", "-"], capture_output=True, check=True).stdout
    pcm = array("h", raw)
    hop = SR // FPS
    out = []
    for i in range(0, len(pcm), hop):
        chunk = pcm[i:i + hop]
        if not chunk:
            break
        out.append((sum(x * x for x in chunk) / len(chunk)) ** 0.5)
    peak = max(out) or 1.0
    return [v / peak for v in out]


def shape_for(level: float, word: str, at_word_start: bool) -> str:
    w = word.lower()
    if level < 0.06:
        return "X"
    if at_word_start and w[:1] in "mbp":
        return "A"
    if at_word_start and w[:1] in "fv":
        return "G"
    if any(v in w for v in ("oo", "ou", "ow", "u")) and level > 0.25:
        return "F"
    if level > 0.55:
        return "D"
    if level > 0.3:
        return "C"
    return "B"


def main():
    base = Path(sys.argv[1])
    subs = json.loads((base / "audio" / "subtitles.json").read_text(encoding="utf-8"))
    (base / "khau-hinh").mkdir(exist_ok=True)
    for sc in subs["scenes"]:
        levels = rms_frames(base / sc["audio"])
        words = sc.get("words", [])
        cues = []
        for f, lv in enumerate(levels):
            t = f / FPS
            cur = next((w for w in words if w["start"] <= t < w["end"]), None)
            word = (cur or {}).get("word") or (cur or {}).get("text") or ""
            start_flag = bool(cur) and t - cur["start"] < 1 / FPS
            val = shape_for(lv, word, start_flag) if cur else ("X" if lv < 0.1 else "B")
            if cues and cues[-1]["value"] == val:
                cues[-1]["end"] = round(t + 1 / FPS, 3)
            else:
                cues.append({"start": round(t, 3), "end": round(t + 1 / FPS, 3), "value": val})
        # gộp cue quá ngắn (< 2 khung) vào cue trước cho miệng đỡ giật
        merged = []
        for c in cues:
            if merged and c["end"] - c["start"] < 2 / FPS:
                merged[-1]["end"] = c["end"]
            else:
                merged.append(c)
        out = {"metadata": {"nguon": "tao_khau_hinh.py (bien do + moc tu)", "fps": FPS}, "mouthCues": merged}
        (base / "khau-hinh" / f"scene-{sc['id']}.json").write_text(json.dumps(out, indent=1), encoding="utf-8")
        print(f"cảnh {sc['id']}: {len(merged)} cue")


if __name__ == "__main__":
    main()
