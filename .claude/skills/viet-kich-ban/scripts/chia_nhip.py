#!/usr/bin/env python3
"""Chia nhịp hình theo độ dài thật của giọng đọc (chạy sau build_timeline.py, rồi chạy lại build_timeline.py).

Cách dùng: python chia_nhip.py <thư mục dự án> [--max 9.5] [--step 6.0] [--min 2.0]

- Nhịp đứng lâu hơn --max giây: chèn nhịp mới khoảng mỗi --step giây, cue là cụm 3–5 từ có thật trong lời đọc
  (lần xuất hiện đầu tiên của cụm phải đúng chỗ đó, vì build_timeline định vị cue theo lần đầu).
- Hình chèn: xoay vòng các tài nguyên khác của cùng cảnh (ảnh, bản đồ); cảnh chỉ có một tài nguyên thì dùng lại nó với
  kiểu máy quay khác (zoom-in ↔ pan, đổi điểm nhìn). Sau thẻ số liệu (fact:) chèn ảnh, không chèn thẻ khác.
- Nhịp ngắn hơn --min giây (không phải nhịp đầu cảnh, không phải fact): bỏ, nhịp trước kéo dài thay.
Sao lưu script.json thành script.pre-chia-nhip.json trước khi ghi. Chỉ đổi shots, không đổi lời đọc.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from pathlib import Path

MOVES_CYCLE = ["pan-left", "zoom-in", "pan-right", "zoom-out"]
FOCUS_CYCLE = [[0.35, 0.45], [0.65, 0.5], [0.5, 0.65], [0.45, 0.35]]


def norm(w: str) -> str:
    return re.sub(r"[^a-z0-9']", "", w.lower().replace("’", "'"))


def phrase_at(words: list[dict], idx: int, narration: str) -> str | None:
    """Cụm 3–5 từ bắt đầu ở words[idx] mà lần xuất hiện đầu tiên trong lời đọc đúng là vị trí này."""
    toks = [w.get("word", w.get("text", "")) for w in words]
    seq = [norm(t) for t in toks]
    for n in (3, 4, 5, 6):
        if idx + n > len(toks):
            break
        target = seq[idx:idx + n]
        if not all(target):
            continue
        first = next(i for i in range(len(seq) - n + 1) if seq[i:i + n] == target)
        if first == idx:
            phrase = " ".join(toks[idx:idx + n])
            phrase = re.sub(r"^[^\w]+|[^\w]+$", "", phrase)
            if phrase and phrase in narration:
                return phrase
    return None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--max", type=float, default=9.5)
    ap.add_argument("--step", type=float, default=6.0)
    ap.add_argument("--min", type=float, default=2.0)
    a = ap.parse_args()
    project = Path(a.project)
    sp = project / "script.json"
    script = json.loads(sp.read_text(encoding="utf-8"))
    tl = json.loads((project / "timeline.json").read_text(encoding="utf-8"))
    tl_by = {s["id"]: s for s in tl["scenes"]}
    added = removed = 0
    for sc in script["scenes"]:
        t = tl_by.get(sc["id"])
        if not t or not sc.get("shots"):
            continue
        words = t["words"]
        tshots = t["shots"]
        if len(tshots) != len(sc["shots"]):
            print(f"CẢNH BÁO: cảnh {sc['id']}: số nhịp trong timeline khác script (chạy lại build_timeline trước), bỏ qua")
            continue
        pool = []
        for sh in sc["shots"]:
            if sh["show"].startswith("asset:") and sh["show"] not in pool:
                pool.append(sh["show"])
        new_shots = []
        for i, (sh, ts) in enumerate(zip(sc["shots"], tshots)):
            dur = ts["end"] - ts["at"]
            is_fact = sh["show"].startswith("fact:")
            if i > 0 and dur < a.min and not is_fact and sh["show"] != "text":
                removed += 1
                continue
            new_shots.append(sh)
            if dur <= a.max:
                continue
            k = max(1, round(dur / a.step) - 1)
            base = sh["show"] if sh["show"].startswith("asset:") else (pool[0] if pool else None)
            if not base:
                continue
            for j in range(1, k + 1):
                target = ts["at"] + dur * j / (k + 1)
                idx = min(range(len(words)), key=lambda w: abs(words[w]["start"] - target))
                cue = None
                for off in (0, 1, -1, 2, -2, 3, -3):
                    if 0 <= idx + off < len(words):
                        cue = phrase_at(words, idx + off, sc["narration"])
                        if cue:
                            break
                if not cue:
                    continue
                others = [p for p in pool if p != base]
                n_add = added + j
                if others and not (is_fact and j == 1 and sh["show"] == base):
                    show = others[(n_add - 1) % len(others)]
                else:
                    show = base
                new_shots.append({"show": show, "cue": cue, "move": MOVES_CYCLE[n_add % 4],
                                  "focus": FOCUS_CYCLE[n_add % 4]})
                base = show if show != "text" else base
                added += 1
        sc["shots"] = new_shots
    shutil.copy2(sp, project / "script.pre-chia-nhip.json")
    sp.write_text(json.dumps(script, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Xong: chèn {added} nhịp, bỏ {removed} nhịp ngắn. Chạy lại build_timeline.py để cập nhật mốc.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
