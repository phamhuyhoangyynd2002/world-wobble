"""Dự phòng mốc từng từ bằng faster-whisper cho cảnh có timing khác "tts" (tts-raw, approx).

Nhận dạng audio/scene-<id>.mp3 với word_timestamps, rồi khớp chuỗi (difflib) vào các từ hiển thị
của lời gốc; từ không khớp được nội suy giữa hai mốc kề. Ghi đè `words`, đặt `timing: "whisper"`.

python whisper_khop.py <dự án> [--only 13,14] [--model small]
"""
import argparse
import difflib
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import tts  # noqa: E402  (dùng build_groups để tách từ hiển thị giống tts.py)


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--only", default="")
    ap.add_argument("--model", default="small")
    a = ap.parse_args()
    from faster_whisper import WhisperModel

    proj = Path(a.project)
    script = {s["id"]: s for s in json.loads((proj / "script.json").read_text(encoding="utf-8"))["scenes"]}
    subs_path = proj / "audio" / "subtitles.json"
    subs = json.loads(subs_path.read_text(encoding="utf-8"))
    only = {int(x) for x in a.only.split(",") if x}
    model = WhisperModel(a.model, device="cpu", compute_type="int8")

    for sc in subs["scenes"]:
        if (only and sc["id"] not in only) or (not only and sc.get("timing") == "tts"):
            continue
        _, groups = tts.build_groups(script[sc["id"]]["narration"], None, script[sc["id"]].get("pronunciation"))
        shown = [g for g, _ in groups]
        segs, _ = model.transcribe(str(proj / sc["audio"]), language="en", word_timestamps=True)
        heard = [w for s in segs for w in s.words]
        sm = difflib.SequenceMatcher(None, [norm(x) for x in shown], [norm(w.word) for w in heard], autojunk=False)
        times = [None] * len(shown)
        for blk in sm.get_matching_blocks():
            for k in range(blk.size):
                w = heard[blk.b + k]
                times[blk.a + k] = (w.start, w.end)
        known = [i for i, t in enumerate(times) if t]
        if not known:
            print(f"LỖI: cảnh {sc['id']}: không khớp được từ nào")
            continue
        dur = sc.get("duration") or heard[-1].end
        for i, t in enumerate(times):  # nội suy từ chưa khớp
            if t:
                continue
            prev = max((j for j in known if j < i), default=None)
            nxt = min((j for j in known if j > i), default=None)
            lo = times[prev][1] if prev is not None else 0.0
            hi = times[nxt][0] if nxt is not None else dur
            gap = [j for j in range(prev + 1 if prev is not None else 0, nxt if nxt is not None else len(shown))]
            step = (hi - lo) / max(len(gap), 1)
            p = gap.index(i)
            times[i] = (lo + p * step, lo + (p + 1) * step)
        sc["words"] = [{"text": s, "start": round(t[0], 3), "end": round(t[1], 3)} for s, t in zip(shown, times)]
        sc["timing"] = "whisper"
        print(f"- cảnh {sc['id']}: khớp {len(known)}/{len(shown)} từ, nội suy {len(shown) - len(known)} → whisper")

    subs_path.write_text(json.dumps(subs, ensure_ascii=False, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
