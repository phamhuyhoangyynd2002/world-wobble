#!/usr/bin/env python3
"""Kiểm tra script.json của World Wobble trước khi kiểm chứng và tạo giọng.

Cách dùng: python3 validate_script.py <thư mục dự án>

LỖI (mã thoát 1, phải sửa): sai schema, câu có số/kỷ lục chưa đăng ký khẳng định, quote không nằm trong lời đọc,
nguồn không tồn tại, verdict sai số lần hoặc sai nhãn, từ cấm, câu mở hoặc câu kết dùng lại nguyên văn,
cue không có trong lời đọc, asset không có trong manifest (nếu đã có manifest).
CẢNH BÁO: độ dài ước tính ngoài mục tiêu, kiểu hook lặp 3 tập, tiêu đề giống khuôn tập trước, cảnh hook dài,
chương ít hơn 3, câu quá dài, câu đệm.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

WPM = 155  # tốc độ đọc ước tính (từ/phút) của giọng Azure en-US ở rate +0%
VERDICTS = {"WOULD MOVE", "SUMMER ONLY", "NOPE"}
SCENE_TYPES = {"hook", "section", "outro"}
SOURCE_TYPES = {"goc", "bach-khoa", "bao", "khac"}
WOB_FACES = {"hao-hung", "lanh-run", "nong-chay", "soc", "ngam-nghi", "dong-goi", "an"}  # "an": Wob rời khung (đoạn nghiêm túc)
WOB_ACTIONS = {"nhay", "di-ra", "di-vao"}
QUE_ACTIONS = {"di-bo", "chay", "run", "vay-tay", "nhay", "chi-tay"}
MOVES = {"zoom-in", "zoom-out", "pan-left", "pan-right", "still"}
BANNED = ["you won't believe", "insane", "shocking", "nobody talks about", "mind-blowing", "smash that like",
          "they don't want you to know"]
FILLERS = ["as you may know", "without further ado", "let's dive in", "let's dive right in", "in today's video",
           "welcome back", "hey guys", "what's up everyone"]
NUMBER_WORDS = {"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
                "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
                "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand",
                "million", "billion", "percent", "half", "quarter", "dozen", "dozens", "hundreds", "thousands",
                "millions", "degrees", "celsius", "fahrenheit", "kilometers", "kilometres", "meters", "metres",
                "miles", "feet"}
# "one" hay dùng như đại từ ("no one", "the one") nên không tính một mình
WEAK_NUMBER = {"one", "half", "quarter"}
# kỷ lục, so sánh nhất: "the only", "the first" mới tính ("summer only", "would you last" thì không)
RECORD_WORDS = re.compile(r"\b(coldest|hottest|highest|lowest|deepest|driest|wettest|most remote|remotest|"
                          r"northernmost|southernmost|largest|smallest|oldest|biggest|longest|record)\b|"
                          r"\bthe (only|first|last)\b", re.I)
HEDGES = re.compile(r"estimates? vary|according to|some sources|other sources|reportedly|locals (say|tell)|"
                    r"it'?s said|by some accounts|disputed|depending on (who|how)|records (differ|disagree)|"
                    r"no one (knows|agrees)|roughly|it'?s claimed|legend has it", re.I)
SHOW_RE = re.compile(r"^(asset:[\w.-]+|text|fact:.+)$")


def sentences(text: str) -> list[str]:
    return [s.strip() for s in re.split(r"(?<=[.!?…])\s+", text) if s.strip()]


def words(text: str) -> list[str]:
    return re.findall(r"[A-Za-z0-9'’-]+", text)


def norm(text: str) -> str:
    return re.sub(r"[^a-z0-9 ]", "", text.lower().replace("’", "'").replace("'", "")).strip()


def has_number(sentence: str) -> bool:
    if re.search(r"\d", sentence):
        return True
    toks = [t.lower().strip("'’") for t in words(sentence)]
    strong = [t for t in toks if t in NUMBER_WORDS and t not in WEAK_NUMBER]
    return bool(strong)


def first_sentence(script: dict) -> str:
    sc = script.get("scenes") or []
    return norm(sentences(sc[0]["narration"])[0]) if sc and sc[0].get("narration") else ""


def last_sentence(script: dict) -> str:
    sc = script.get("scenes") or []
    if not sc or not sc[-1].get("narration"):
        return ""
    return norm(sentences(sc[-1]["narration"])[-1])


def other_scripts(project: Path) -> list[tuple[str, dict]]:
    out = []
    for p in sorted(project.parent.glob("*/script.json")):
        if p.parent.resolve() == project.resolve():
            continue
        try:
            out.append((p.parent.name, json.loads(p.read_text(encoding="utf-8"))))
        except (json.JSONDecodeError, OSError):
            continue
    return out


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    project = Path(sys.argv[1])
    try:
        script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    except FileNotFoundError:
        print(f"LỖI: không có {project / 'script.json'}")
        return 1
    except json.JSONDecodeError as e:
        print(f"LỖI: script.json không phải JSON hợp lệ: {e}")
        return 1

    errors: list[str] = []
    warns: list[str] = []

    for key in ("title", "format", "template", "language", "place", "question", "message", "angle", "voice",
                "scenes", "claims", "sources"):
        if key not in script:
            errors.append(f"thiếu trường gốc '{key}'")
    if errors:
        for e in errors:
            print(f"LỖI: {e}")
        return 1
    if script["format"] != "horizontal":
        errors.append("format phải là 'horizontal'")
    if len(script["title"]) > 60:
        warns.append(f"tiêu đề {len(script['title'])} ký tự, nên ≤ 60 để không bị cắt")
    place = script["place"] or {}
    for k in ("name", "country", "lat", "lon"):
        if k not in place:
            errors.append(f"place thiếu '{k}'")
    if not (script.get("voice") or {}).get("name"):
        errors.append("voice.name trống: điền giọng Azure đã chốt trong kenh/ho-so-kenh.md")

    # ---- nguồn
    sources = {s.get("id"): s for s in script["sources"]}
    if not sources:
        errors.append("sources trống")
    for sid, s in sources.items():
        for k in ("title", "url", "type", "accessed"):
            if not s.get(k):
                errors.append(f"nguồn {sid}: thiếu '{k}'")
        if s.get("type") and s["type"] not in SOURCE_TYPES:
            errors.append(f"nguồn {sid}: type '{s['type']}' không thuộc {sorted(SOURCE_TYPES)}")

    # ---- cảnh
    scenes = script["scenes"]
    by_id = {}
    for i, sc in enumerate(scenes, 1):
        if sc.get("id") != i:
            errors.append(f"cảnh thứ {i} có id {sc.get('id')}, id phải liên tục từ 1")
        by_id[sc.get("id")] = sc
        if sc.get("type") not in SCENE_TYPES:
            errors.append(f"cảnh {sc.get('id')}: type '{sc.get('type')}' không thuộc {sorted(SCENE_TYPES)}")
        if not sc.get("narration"):
            errors.append(f"cảnh {sc.get('id')}: thiếu narration")
    if scenes:
        if scenes[0].get("type") != "hook":
            errors.append("cảnh đầu phải là 'hook'")
        if scenes[-1].get("type") != "outro":
            errors.append("cảnh cuối phải là 'outro'")
        if not scenes[0].get("chapter"):
            errors.append("cảnh 1 phải có 'chapter' (YouTube cần chương đầu ở 0:00)")
    if sum(1 for s in scenes if s.get("type") == "hook") != 1:
        errors.append("phải có đúng một cảnh 'hook'")
    if sum(1 for s in scenes if s.get("type") == "outro") != 1:
        errors.append("phải có đúng một cảnh 'outro'")
    chapters = [s["chapter"] for s in scenes if s.get("chapter")]
    if len(chapters) < 3:
        warns.append(f"chỉ có {len(chapters)} chương; YouTube cần ít nhất 3 chương để hiện chương")
    for c in chapters:
        if len(c) > 40:
            warns.append(f"chương '{c}' dài {len(c)} ký tự, nên ≤ 40")

    manifest_path = project / "assets" / "manifest.json"
    manifest_assets = None
    if manifest_path.exists():
        manifest_assets = (json.loads(manifest_path.read_text(encoding="utf-8")).get("assets") or {})

    all_text = []
    total_words = 0
    for sc in scenes:
        sid = sc.get("id")
        narr = sc.get("narration") or ""
        all_text.append(narr)
        n = len(words(narr))
        total_words += n
        low = narr.lower()
        for b in BANNED:
            if b in low:
                errors.append(f"cảnh {sid}: dùng cụm cấm '{b}'")
        for f in FILLERS:
            if f in low:
                (errors if sc.get("type") == "hook" else warns).append(f"cảnh {sid}: câu đệm/chào '{f}'")
        if re.search(r"[#&/→“”]", narr) or re.search(r"[\U0001F300-\U0001FAFF]", narr):
            errors.append(f"cảnh {sid}: lời đọc có ký tự đặc biệt (# & / → ngoặc cong, emoji)")
        if re.search(r"\d", narr):
            warns.append(f"cảnh {sid}: lời đọc có chữ số; viết số bằng chữ để mốc từng từ của TTS khớp")
        if sc.get("type") == "hook" and n > 35:
            warns.append(f"cảnh hook {n} từ (~{n / WPM * 60:.0f}s), nên ≤ 35 từ để vào câu hỏi trong 10 giây đầu")
        for s in sentences(narr):
            if len(words(s)) > 28:
                warns.append(f"cảnh {sid}: câu {len(words(s))} từ, nên tách: '{s[:60]}…'")
        if sc.get("on_screen_text") and len(words(sc["on_screen_text"])) > 6:
            warns.append(f"cảnh {sid}: on_screen_text quá 6 từ")
        lownorm = norm(narr)
        for sh in sc.get("shots") or []:
            show = sh.get("show", "")
            if not SHOW_RE.match(show):
                errors.append(f"cảnh {sid}: shot show '{show}' sai dạng (asset:<id> | text | fact:<nhãn>)")
            if show.startswith("asset:") and manifest_assets is not None and show[6:] not in manifest_assets:
                errors.append(f"cảnh {sid}: '{show}' không có trong assets/manifest.json")
            if show.startswith("fact:") and show[5:] not in {f.get("label") for f in sc.get("facts") or []}:
                errors.append(f"cảnh {sid}: '{show}' không trỏ tới thẻ nào trong facts của cảnh")
            if sh.get("cue") and norm(sh["cue"]) not in lownorm:
                errors.append(f"cảnh {sid}: cue '{sh['cue']}' không có trong lời đọc")
            if sh.get("move") and sh["move"] not in MOVES:
                errors.append(f"cảnh {sid}: move '{sh['move']}' không thuộc {sorted(MOVES)}")
        for w in sc.get("wob") or []:
            if w.get("bieu_cam") not in WOB_FACES:
                errors.append(f"cảnh {sid}: biểu cảm Wob '{w.get('bieu_cam')}' không thuộc {sorted(WOB_FACES)}")
            if w.get("cue") and norm(w["cue"]) not in lownorm:
                errors.append(f"cảnh {sid}: wob cue '{w['cue']}' không có trong lời đọc")
            if w.get("hanh_dong") and w["hanh_dong"] not in WOB_ACTIONS:
                errors.append(f"cảnh {sid}: hành động Wob '{w['hanh_dong']}' không thuộc {sorted(WOB_ACTIONS)}")
        for qq in sc.get("que") or []:
            if qq.get("hanh_dong") not in QUE_ACTIONS:
                errors.append(f"cảnh {sid}: người que '{qq.get('hanh_dong')}' không thuộc {sorted(QUE_ACTIONS)}")
            if qq.get("cue") and norm(qq["cue"]) not in lownorm:
                errors.append(f"cảnh {sid}: que cue '{qq['cue']}' không có trong lời đọc")
        for fx in sc.get("sfx") or []:
            if fx.get("cue") and norm(fx["cue"]) not in lownorm:
                errors.append(f"cảnh {sid}: sfx cue '{fx['cue']}' không có trong lời đọc")
            if fx.get("name") == "dau-wob":
                errors.append(f"cảnh {sid}: không khai báo 'dau-wob' (build_timeline.py tự thêm cùng con dấu)")

    # ---- verdict
    verdicts = [(s["id"], s["verdict"]) for s in scenes if s.get("verdict")]
    if len(verdicts) != 1:
        errors.append(f"phải có đúng một verdict (đang có {len(verdicts)})")
    for sid, v in verdicts:
        if v.get("label") not in VERDICTS:
            errors.append(f"cảnh {sid}: nhãn verdict '{v.get('label')}' không thuộc {sorted(VERDICTS)}")
        if not v.get("reason"):
            errors.append(f"cảnh {sid}: verdict thiếu reason")
        if by_id.get(sid, {}).get("type") != "outro":
            errors.append(f"cảnh {sid}: verdict phải ở cảnh outro")
        if v.get("cue") and norm(v["cue"]) not in norm(by_id[sid].get("narration", "")):
            errors.append(f"cảnh {sid}: verdict cue '{v['cue']}' không có trong lời đọc")

    # ---- khẳng định
    claims = script["claims"]
    seen = set()
    covered: dict[int, list[str]] = {}
    for c in claims:
        cid = c.get("id", "?")
        if not re.fullmatch(r"C\d{2,3}", str(cid)):
            errors.append(f"khẳng định '{cid}': id phải dạng C01")
        if cid in seen:
            errors.append(f"khẳng định {cid} bị trùng id")
        seen.add(cid)
        sc = by_id.get(c.get("scene"))
        if not sc:
            errors.append(f"khẳng định {cid}: cảnh {c.get('scene')} không tồn tại")
            continue
        quote = c.get("quote") or ""
        if not quote or norm(quote) not in norm(sc.get("narration", "")):
            errors.append(f"khẳng định {cid}: quote không phải chuỗi con của lời đọc cảnh {sc['id']}: '{quote[:60]}'")
        else:
            covered.setdefault(sc["id"], []).append(norm(quote))
        if c.get("hedged") and not HEDGES.search(sc.get("narration", "")):
            warns.append(f"khẳng định {cid}: hedged nhưng lời đọc cảnh {sc['id']} không có cụm nói dè dặt "
                         f"(estimates vary, according to, some sources…)")
        if not c.get("statement") or len(words(c["statement"])) < 5:
            errors.append(f"khẳng định {cid}: statement trống hoặc quá ngắn để tự đứng được")
        if not c.get("source_ids"):
            errors.append(f"khẳng định {cid}: thiếu source_ids")
        for s in c.get("source_ids") or []:
            if s not in sources:
                errors.append(f"khẳng định {cid}: nguồn '{s}' không có trong sources")
    for sc in scenes:
        for f in sc.get("facts") or []:
            for cid in f.get("claim_ids") or []:
                if cid not in seen:
                    errors.append(f"cảnh {sc['id']}: thẻ '{f.get('label')}' trỏ tới khẳng định '{cid}' không tồn tại")
            if not f.get("claim_ids"):
                errors.append(f"cảnh {sc['id']}: thẻ '{f.get('label')}' thiếu claim_ids")

    # câu có số hoặc kỷ lục phải nằm trong quote của ít nhất một khẳng định
    for sc in scenes:
        quotes = covered.get(sc["id"], [])
        for s in sentences(sc.get("narration") or ""):
            ns = norm(s)
            if not (has_number(s) or RECORD_WORDS.search(s)):
                continue
            if not any(q in ns or ns in q or (len(q) > 12 and q[: len(q) // 2] in ns) for q in quotes):
                kind = "số" if has_number(s) else "kỷ lục"
                errors.append(f"cảnh {sc['id']}: câu có {kind} chưa đăng ký khẳng định: '{s[:80]}'")

    # ---- lặp lại với các tập trước
    others = other_scripts(project)
    fs, ls = first_sentence(script), last_sentence(script)
    for name, o in others:
        if fs and fs == first_sentence(o):
            errors.append(f"câu mở trùng nguyên văn tập {name}")
        if ls and ls == last_sentence(o):
            errors.append(f"câu kết trùng nguyên văn tập {name}")
        t1, t2 = norm(script["title"]).split(), norm(o.get("title", "")).split()
        if t1[:4] and t1[:4] == t2[:4]:
            warns.append(f"tiêu đề cùng khuôn 4 chữ đầu với tập {name}: dấu hiệu 'made with a template'")
    recent = [o.get("hook_type") for _, o in others[-3:]]
    if script.get("hook_type") and len(recent) == 3 and all(h == script["hook_type"] for h in recent):
        warns.append(f"kiểu hook '{script['hook_type']}' đã dùng ở 3 tập gần nhất")

    # ---- độ dài
    est = total_words / WPM * 60
    lo, hi = script.get("target_seconds") or [600, 900]
    if not lo <= est <= hi:
        warns.append(f"độ dài ước tính {est / 60:.1f} phút ({total_words} từ) ngoài mục tiêu {lo / 60:.0f}–{hi / 60:.0f} phút")

    for e in errors:
        print(f"LỖI: {e}")
    for w in warns:
        print(f"CẢNH BÁO: {w}")
    print(f"{'KHÔNG ĐẠT' if errors else 'ĐẠT'}: {len(scenes)} cảnh, {len(chapters)} chương, {len(claims)} khẳng định, "
          f"{len(sources)} nguồn, ~{est / 60:.1f} phút, {len(errors)} lỗi, {len(warns)} cảnh báo")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
