#!/usr/bin/env python3
"""Dựng timeline.json từ script.json, audio/subtitles.json và assets/manifest.json (World Wobble, khung ngang).

Cách dùng:
  python3 build_timeline.py <thư mục dự án> [--gap 0.35] [--lead 0.2] [--tail 1.5]
                            [--music music/abc.mp3 | --music none] [--music-volume 0.18] [--fps 30]

Viết lại từ build_timeline.py của GameReel (15/11/2026): bỏ phần riêng của video dọc (gag, kiểu hình, tách từ tiếng
Việt), thêm Wob, chương YouTube, mốc thời gian của từng khẳng định (cho báo cáo độ xác thực) và phụ đề SRT.

Ghi ra:
- timeline.json: scenes[] (mốc, giọng, từng từ, shots[] có src, wob[], verdict), captions[], sfx[], music,
  chapters[], claims[] (mốc lúc đọc mỗi khẳng định).
- out/captions.srt: phụ đề để tải lên YouTube (≤ 42 ký tự mỗi dòng, ≤ 2 dòng, ≤ 6 giây mỗi cụm).
- out/chapters.txt: mốc chương để dán vào mô tả.
Mã thoát 1 khi có LỖI (thiếu giọng, asset không có trong manifest, chương ngắn hơn 10 giây).
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

WIDTH, HEIGHT = 1920, 1080
DEFAULT_TARGET = (600, 900)
AUDIO_EXT = {".mp3", ".wav", ".m4a", ".ogg", ".flac"}
# Mặc định ban đầu (.claude/rules/video-dai-youtube.md), chỉnh theo số liệu kênh ở kenh/bai-hoc.md
MAX_SHOT_SECONDS = 10.0
MIN_SHOT_SECONDS = 2.0
AUTO_SHOT_SECONDS = 6.0
REHOOK_SECONDS = 120.0       # một chương không nên kéo quá 2 phút không có điều mới
STAMP_HOLD = 1.5
CHAPTER_MIN = 10.0           # YouTube bỏ chương ngắn hơn 10 giây
CAPTION = {"line": 42, "lines": 2, "max_dur": 6.0, "pause": 0.45, "min_dur": 0.8, "linger": 0.25}
SIGNATURE_SFX = "dau-wob"


def probe(path: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


def norm(text: str) -> str:
    return re.sub(r"[^a-z0-9 ]", "", text.lower().replace("’", "'").replace("'", "").replace("-", " ")).strip()


def find_cue(words: list[dict], cue: str, from_idx: int = 0, max_tokens: int = 6) -> int | None:
    """Vị trí từ đầu tiên của cụm `cue` (so tối đa max_tokens chữ đầu) trong words, tìm từ from_idx trở đi."""
    target = norm(cue).split()[:max_tokens]
    if not target:
        return None
    flat = [norm(w["text"]) for w in words]
    for i in range(from_idx, len(flat)):
        joined = " ".join(flat[i:i + len(target) + 2]).split()
        if joined[:len(target)] == target:
            return i
    return None


def find_audio(folder: Path, name: str) -> Path | None:
    for ext in AUDIO_EXT:
        p = folder / f"{name}{ext}"
        if p.exists():
            return p
    return None


def ledger_files(path: Path) -> set[str]:
    """Tên file có dòng trong sổ giấy phép (cột đầu của bảng) và cột Thương mại = có."""
    if not path.exists():
        return set()
    ok = set()
    for line in path.read_text(encoding="utf-8").splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 4 and cells[0] and not cells[0].startswith(("File", "---", "<!--")) and cells[3].lower() == "có":
            ok.add(cells[0])
    return ok


def mmss(t: float) -> str:
    t = int(t)
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m}:{s:02d}"


def srt_time(t: float) -> str:
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def build_shots(sc: dict, words: list[dict], start: float, end: float, assets: dict, errors: list[str],
                warnings: list[str], is_hook: bool) -> list[dict]:
    declared = sc.get("shots") or []
    if not declared:
        pool = [k for k, a in assets.items() if sc["id"] in (a.get("scenes") or [])]
        if not pool:
            warnings.append(f"cảnh {sc['id']}: không khai báo shots và không có tài nguyên gắn với cảnh, dùng nhịp chữ")
            pool = []
        count = max(1, round((end - start) / AUTO_SHOT_SECONDS))
        step = (end - start) / count
        declared = [{"show": f"asset:{pool[i % len(pool)]}" if pool else "text", "auto": True} for i in range(count)]
        times = [start + i * step for i in range(count)]
    else:
        times, idx = [], 0
        for i, sh in enumerate(declared):
            if i == 0:
                times.append(start)
                continue
            pos = find_cue(words, sh.get("cue", ""), idx) if sh.get("cue") else None
            if pos is None:
                if sh.get("cue"):
                    warnings.append(f"cảnh {sc['id']}: không thấy cue '{sh['cue']}', nhịp đặt sau nhịp trước {AUTO_SHOT_SECONDS:g}s")
                times.append(min(end - 0.5, times[-1] + AUTO_SHOT_SECONDS))
            else:
                idx = pos + 1
                times.append(words[pos]["start"])
    shots = []
    for i, sh in enumerate(declared):
        entry = {k: v for k, v in sh.items() if k != "cue"}
        if sh.get("cue"):
            entry["cue"] = sh["cue"]
        entry["at"] = round(times[i], 3)
        entry["end"] = round(times[i + 1], 3) if i + 1 < len(declared) else round(end, 3)
        show = sh.get("show", "")
        if show.startswith("asset:"):
            a = assets.get(show[6:])
            if not a:
                errors.append(f"cảnh {sc['id']}: '{show}' không có trong assets/manifest.json")
            else:
                entry["src"] = a["file"]
                entry["kind"] = a.get("kind")
                if a.get("marks"):
                    entry["marks"] = a["marks"]  # nhãn bản đồ (toạ độ pixel trên khung 1920×1080), template dựng bằng HTML
        dur = entry["end"] - entry["at"]
        if dur > MAX_SHOT_SECONDS:
            warnings.append(f"cảnh {sc['id']}: nhịp '{show}' đứng {dur:.1f}s, nên đổi hình trong {MAX_SHOT_SECONDS:g}s")
        if dur < MIN_SHOT_SECONDS and not is_hook and i > 0:
            warnings.append(f"cảnh {sc['id']}: nhịp '{show}' chỉ {dur:.1f}s, video dài nên ≥ {MIN_SHOT_SECONDS:g}s")
        shots.append(entry)
    return shots


def build_wob(sc: dict, words: list[dict], start: float, end: float, warnings: list[str]) -> list[dict]:
    out = []
    for w in sc.get("wob") or []:
        at = start
        if w.get("cue"):
            pos = find_cue(words, w["cue"])
            if pos is None:
                warnings.append(f"cảnh {sc['id']}: không thấy wob cue '{w['cue']}', Wob đổi biểu cảm ở đầu cảnh")
            else:
                at = words[pos]["start"]
        out.append({"bieu_cam": w["bieu_cam"], "at": round(at, 3), "giu": w.get("giu")})
    out.sort(key=lambda x: x["at"])
    for i, e in enumerate(out):
        nxt = out[i + 1]["at"] if i + 1 < len(out) else end
        e["end"] = round(min(nxt, e["at"] + e["giu"]) if e.get("giu") else nxt, 3)
        e.pop("giu", None)
    return out


def group_captions(scenes: list[dict]) -> list[dict]:
    """Cụm phụ đề: ngắt ở dấu câu cuối câu, chỗ nghỉ dài, hoặc khi vượt 2 dòng × 42 ký tự / 6 giây."""
    limit = CAPTION["line"] * CAPTION["lines"]
    groups: list[dict] = []
    for sc in scenes:
        cur: list[dict] = []
        for w in sc["words"]:
            if cur:
                text = " ".join(x["text"] for x in cur + [w])
                gap = w["start"] - cur[-1]["end"]
                if (re.search(r"[.!?…]$", cur[-1]["text"]) or gap >= CAPTION["pause"] or len(text) > limit
                        or w["end"] - cur[0]["start"] > CAPTION["max_dur"]
                        or (re.search(r"[,;:]$", cur[-1]["text"]) and len(text) > CAPTION["line"])):
                    groups.append({"scene": sc["id"], "words": cur, "scene_end": sc["end"]})
                    cur = []
            cur.append(w)
        if cur:
            groups.append({"scene": sc["id"], "words": cur, "scene_end": sc["end"]})
    out = []
    for i, g in enumerate(groups):
        ws = g["words"]
        start = ws[0]["start"]
        nxt = groups[i + 1]["words"][0]["start"] - 0.05 if i + 1 < len(groups) else g["scene_end"]
        end = min(nxt, ws[-1]["end"] + CAPTION["linger"], g["scene_end"])
        end = max(end, start + CAPTION["min_dur"])
        out.append({"scene": g["scene"], "start": round(start, 3), "end": round(end, 3),
                    "text": " ".join(w["text"] for w in ws), "lines": wrap(" ".join(w["text"] for w in ws)),
                    "words": ws})
    return out


def wrap(text: str) -> list[str]:
    if len(text) <= CAPTION["line"]:
        return [text]
    toks = text.split()
    best, best_cost = [text], 1e9
    for k in range(1, len(toks)):
        a, b = " ".join(toks[:k]), " ".join(toks[k:])
        cost = max(len(a), len(b)) + (0 if len(a) <= CAPTION["line"] and len(b) <= CAPTION["line"] else 100)
        if cost < best_cost:
            best, best_cost = [a, b], cost
    return best


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--gap", type=float, default=0.35, help="nghỉ sau mỗi cảnh (giây)")
    ap.add_argument("--lead", type=float, default=0.2, help="nghỉ trước lời đọc đầu tiên; hình đã có từ khung 0")
    ap.add_argument("--tail", type=float, default=1.5, help="giữ cảnh cuối sau lời đọc")
    ap.add_argument("--music", help="đường dẫn nhạc nền, hoặc 'none'")
    ap.add_argument("--music-volume", type=float, default=0.18, help="trước khi tự giảm khi có lời đọc")
    ap.add_argument("--fps", type=int, default=30)
    args = ap.parse_args()

    project = Path(args.project).resolve()
    root = project.parent.parent
    script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    subs = json.loads((project / "audio/subtitles.json").read_text(encoding="utf-8"))
    mpath = project / "assets/manifest.json"
    assets = (json.loads(mpath.read_text(encoding="utf-8")).get("assets") or {}) if mpath.exists() else {}
    subs_by_id = {s["id"]: s for s in subs["scenes"]}

    errors: list[str] = []
    warnings: list[str] = []
    scenes, sfx = [], []
    cursor = 0.0
    n = len(script["scenes"])
    sfx_ok = ledger_files(root / "sfx/GIAY-PHEP.md")

    def add_sfx(name: str, at: float, volume: float, scene_id: int, **extra):
        src = find_audio(root / "sfx", name)
        if not src:
            warnings.append(f"cảnh {scene_id}: không có file sfx/{name}.*")
            return
        if src.name not in sfx_ok:
            warnings.append(f"sfx/{src.name} chưa có trong sfx/GIAY-PHEP.md (kiem_tra_ban_quyen.py sẽ chặn)")
        sfx.append({"src": str(src.resolve()), "at": round(at, 3), "volume": volume, "scene": scene_id, **extra})

    for idx, sc in enumerate(script["scenes"]):
        sub = subs_by_id.get(sc["id"])
        if not sub:
            errors.append(f"cảnh {sc['id']} chưa có giọng đọc, chạy tts.py")
            continue
        dur = probe(project / sub["audio"])
        lead = args.lead if idx == 0 else 0.0
        hold = args.tail if idx == n - 1 else args.gap
        voice_start = cursor + lead
        end = cursor + lead + dur + hold
        words = [{"text": w["text"], "start": round(voice_start + w["start"], 3),
                  "end": round(voice_start + w["end"], 3)} for w in sub["words"]]

        for fx in sc.get("sfx") or []:
            at = cursor
            if fx.get("cue"):
                pos = find_cue(words, fx["cue"])
                if pos is None:
                    warnings.append(f"cảnh {sc['id']}: sfx không thấy cue '{fx['cue']}'")
                else:
                    at = words[pos]["start"]
            add_sfx(fx["name"], at, fx.get("volume", 0.5), sc["id"])

        verdict = None
        if isinstance(sc.get("verdict"), dict) and sc["verdict"].get("label"):
            v = sc["verdict"]
            at = None
            if v.get("cue"):
                pos = find_cue(words, v["cue"])
                if pos is None:
                    warnings.append(f"cảnh {sc['id']}: không thấy verdict cue '{v['cue']}'")
                else:
                    at = words[pos]["start"]
            if at is None:
                at = max(cursor, end - STAMP_HOLD - 2)
            if end - at < STAMP_HOLD:
                warnings.append(f"con dấu chỉ đứng {end - at:.1f}s trước khi hết video, nên ≥ {STAMP_HOLD:g}s")
            verdict = {"label": v["label"], "at": round(at, 3)}
            add_sfx(SIGNATURE_SFX, at, 0.7, sc["id"], brand=True)

        scenes.append({
            "id": sc["id"], "type": sc["type"], "chapter": sc.get("chapter"),
            "start": round(cursor, 3), "end": round(end, 3), "duration": round(end - cursor, 3),
            "voice": {"src": sub["audio"], "start": round(voice_start, 3), "duration": round(dur, 3)},
            "words": words, "timing": sub.get("timing"),
            "shots": build_shots(sc, words, cursor, end, assets, errors, warnings, sc["type"] == "hook"),
            "wob": build_wob(sc, words, cursor, end, warnings),
            **({"verdict": verdict} if verdict else {}),
        })
        cursor = end

    total = cursor

    # chương YouTube
    chapters = []
    for s in scenes:
        if s.get("chapter"):
            chapters.append({"title": s["chapter"], "at": s["start"]})
    if chapters:
        chapters[0]["at"] = 0.0
    for i, c in enumerate(chapters):
        c["end"] = chapters[i + 1]["at"] if i + 1 < len(chapters) else total
        if c["end"] - c["at"] < CHAPTER_MIN:
            errors.append(f"chương '{c['title']}' dài {c['end'] - c['at']:.1f}s, YouTube cần ≥ {CHAPTER_MIN:g}s")
        if c["end"] - c["at"] > REHOOK_SECONDS * 2.5:
            warnings.append(f"chương '{c['title']}' dài {(c['end'] - c['at']) / 60:.1f} phút; nhớ có điều mới mỗi 60–90 giây")
    if len(chapters) < 3:
        warnings.append(f"chỉ có {len(chapters)} chương, YouTube cần ≥ 3 để hiện chương")

    # mốc thời gian từng khẳng định (cho báo cáo độ xác thực)
    claims_tl = []
    by_scene = {s["id"]: s for s in scenes}
    for c in script.get("claims") or []:
        s = by_scene.get(c.get("scene"))
        if not s:
            continue
        pos = find_cue(s["words"], c.get("quote", ""))
        if pos is None:
            warnings.append(f"khẳng định {c.get('id')}: không định vị được quote trong lời đọc, lấy mốc đầu cảnh")
            at = s["start"]
        else:
            at = s["words"][pos]["start"]
        claims_tl.append({"id": c["id"], "scene": s["id"], "at": round(at, 3), "time": mmss(at)})

    captions = group_captions(scenes)

    # nhạc nền: chỉ file có trong sổ giấy phép
    music = None
    music_ok = ledger_files(root / "music/GIAY-PHEP.md")
    if args.music != "none":
        if args.music:
            mp = Path(args.music)
        else:
            cands = sorted(p for p in (root / "music").glob("*") if p.suffix.lower() in AUDIO_EXT and p.name in music_ok)
            mp = cands[0] if cands else None
        if mp and mp.exists():
            if mp.name not in music_ok:
                warnings.append(f"music/{mp.name} chưa có trong music/GIAY-PHEP.md (kiem_tra_ban_quyen.py sẽ chặn)")
            music = {"src": str(mp.resolve()), "volume": args.music_volume, "duration": round(probe(mp), 3)}
        else:
            warnings.append("không có nhạc nền hợp lệ trong music/ (sổ giấy phép trống?): video sẽ không có nhạc")

    lo, hi = script.get("target_seconds") or DEFAULT_TARGET
    if not lo <= total <= hi:
        warnings.append(f"tổng độ dài {total / 60:.1f} phút ngoài mục tiêu {lo / 60:.0f}–{hi / 60:.0f} phút")
    if len(sfx) > max(6, total / 20):
        warnings.append(f"{len(sfx)} sfx trong {total / 60:.1f} phút là dày với giọng deadpan; giữ cho khoảnh khắc thật")

    timeline = {"format": "horizontal", "template": script.get("template", "explainer"), "width": WIDTH,
                "height": HEIGHT, "fps": args.fps, "duration": round(total, 3), "scenes": scenes,
                "captions": captions, "burn_captions": bool(script.get("burn_captions")), "sfx": sfx,
                "music": music, "chapters": chapters, "claims": claims_tl}
    (project / "timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=2), encoding="utf-8")

    out = project / "out"
    out.mkdir(exist_ok=True)
    srt = []
    for i, c in enumerate(captions, 1):
        srt += [str(i), f"{srt_time(c['start'])} --> {srt_time(c['end'])}", *c["lines"], ""]
    (out / "captions.srt").write_text("\n".join(srt), encoding="utf-8")
    (out / "chapters.txt").write_text("\n".join(f"{mmss(c['at'])} {c['title']}" for c in chapters) + "\n",
                                      encoding="utf-8")

    for e in errors:
        print(f"LỖI: {e}")
    for w in warnings:
        print(f"CẢNH BÁO: {w}")
    print(f"Xong: {len(scenes)} cảnh, {sum(len(s['shots']) for s in scenes)} nhịp hình, {len(chapters)} chương, "
          f"{len(captions)} cụm phụ đề, {len(sfx)} sfx, {total / 60:.1f} phút → {project / 'timeline.json'}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
