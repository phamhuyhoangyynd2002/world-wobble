#!/usr/bin/env python3
"""Kiểm tra script.json của World Wobble trước khi kiểm chứng và tạo giọng.

Cách dùng: python3 validate_script.py <thư mục dự án>

LỖI (mã thoát 1, phải sửa): sai schema, câu có số/kỷ lục chưa đăng ký khẳng định, quote không nằm trong lời đọc,
nguồn không tồn tại, verdict sai số lần hoặc sai nhãn, từ cấm, câu mở hoặc câu kết dùng lại nguyên văn,
cue không có trong lời đọc, asset không có trong manifest (nếu đã có manifest), ảnh asset:ai-… chưa khai báo
trong anh_ai hoặc hạng không khớp điểm (references/hang-anh.md).
CẢNH BÁO: độ dài ước tính ngoài mục tiêu, kiểu hook lặp 3 tập, tiêu đề giống khuôn tập trước, cảnh hook dài,
chương ít hơn 3, câu quá dài, câu đệm, văn kiểu AI (check_van_ai: câu đối xứng, cụm sáo, tính từ giật gân, nhịp câu đều).
Kịch bản "Wob kể chuyến đi" (cảnh có `lop`, từ 17/11/2026): thêm kiểm lop/khuon/y_hinh, ngôi thứ nhất, gag ở cảnh
hồi ức, khuôn chương đủ đa dạng, câu chuyển và câu đôi không lặp (check_ke_chuyen, references/cong-thuc-ke-chuyen.md).
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

WPM = 155  # tốc độ đọc ước tính (từ/phút) của giọng Azure en-US ở rate +0%
VERDICTS = {"WOULD MOVE", "SUMMER ONLY", "NOPE"}
SCENE_TYPES = {"hook", "section", "outro", "duoi"}
# Tập làm trước khi có luật đuôi tập (24/11/2026): không bắt cảnh 'duoi'
TAP_CU_KHONG_DUOI = ("oymyakon", "coober-pedy")
DUOI_CAM = ("subscribe", "like button", "hit the bell", "see you next time", "thanks for watching", "don't forget")
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
# Văn kiểu AI (bài học 24/11/2026, docs/bai-hoc-thi-truong-giong-doc-2026-11-24.md): người xem bắt câu chữ khuôn
# nhiều hơn bắt giọng. Mỗi mẫu: (regex, tối đa mỗi tập, tên). Vượt thì CẢNH BÁO.
VAN_AI = [
    (re.compile(r"\b(it|this|that)(?:'s| is| was|'s not| isn't| wasn't)\s+(?:not|n't)?\s*(?:just|only|merely|simply)?\s*"
                r"[\w\s'-]{1,40}?[,;.—-]+\s*(?:it|this|that)(?:'s| is| was)\b", re.I), 1, "đối xứng 'It's not X, it's Y'"),
    (re.compile(r"\bnot (?:just|only|merely) [\w\s'-]{1,40}?,? but (?:also )?", re.I), 1, "'not just X but Y'"),
    (re.compile(r"\bwhere (\w+) (?:is|means) (\w+), \2 (?:is|means)\b", re.I), 0, "đảo vòng 'where X is Y, Y is Z'"),
    (re.compile(r"\bhere'?s (?:why|the kicker|the catch|the twist|where it gets)\b", re.I), 1, "'here's why / the kicker'"),
    (re.compile(r"\b(?:delve|tapestry|testament to|symphony of|in a world where|let that sink in|buckle up|"
                r"the answer (?:may|might|will) surprise you|nothing about [\w\s]{1,30} is normal|"
                r"shouldn'?t (?:even )?exist|defies (?:all )?(?:logic|explanation))\b", re.I), 0, "cụm sáo của văn AI"),
    (re.compile(r"\b(?:terrifying|disturbing|horrifying|nightmare|creepiest|creepier|bizarre|mysterious)\b", re.I), 3,
     "tính từ giật gân"),
]


def check_anh_ai(script: dict, scenes: list, errors: list, warns: list) -> None:
    """Mọi asset:ai-… phải khai báo trong anh_ai; mỗi mục có điểm và hạng khớp luật hang_anh.py."""
    import os
    sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "lay-tai-nguyen" / "scripts"))
    from hang_anh import kiem_muc
    from tao_anh_ai import load_env

    load_env(Path(__file__).resolve().parents[4])
    ds = script.get("anh_ai") or []
    if not isinstance(ds, list):
        errors.append("anh_ai phải là danh sách")
        return
    ids_scene = {s.get("id") for s in scenes}
    khai = {}
    for m in ds:
        aid = m.get("id") if isinstance(m, dict) else None
        if not aid or not re.fullmatch(r"ai-[a-z0-9][a-z0-9.-]*", aid):
            errors.append(f"anh_ai: id '{aid}' phải dạng ai-<mô-tả> (chữ thường, số, gạch nối)")
            continue
        if aid in khai:
            errors.append(f"anh_ai: id '{aid}' khai báo hai lần")
        khai[aid] = m
        if not (m.get("canh") or "").strip():
            errors.append(f"anh_ai '{aid}': thiếu canh (nội dung cảnh tiếng Anh)")
        sc = m.get("scenes")
        if not sc or not isinstance(sc, list) or any(x not in ids_scene for x in sc):
            errors.append(f"anh_ai '{aid}': scenes phải là danh sách id cảnh có thật")
        for e in kiem_muc(m):
            errors.append(f"anh_ai '{aid}': {e}")
    thieu: dict[str, list] = {}
    for sc in scenes:
        for sh in sc.get("shots") or []:
            show = sh.get("show", "")
            if show.startswith("asset:ai-") and show[6:] not in khai:
                thieu.setdefault(show[6:], [])
                if sc.get("id") not in thieu[show[6:]]:
                    thieu[show[6:]].append(sc.get("id"))
    for aid, scs in thieu.items():
        errors.append(f"'{aid}' (cảnh {', '.join(map(str, scs))}) chưa khai báo trong anh_ai (điểm + hạng)")
    try:
        toi_da = int(os.environ.get("ANH_CHINH_TOI_DA", "6"))
    except ValueError:
        toi_da = 6
    so_chinh = sum(1 for m in khai.values() if m.get("hang") == "chinh")
    if so_chinh > toi_da:
        warns.append(f"anh_ai: {so_chinh} ảnh chính > {toi_da} (ANH_CHINH_TOI_DA); nguồn ngoài có hạn, "
                     "gom chi tiết riêng vào ít ảnh hơn hoặc vẽ đồ vật bằng SVG (references/hang-anh.md)")


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


LOPS = {"hien-tai", "hoi-uc"}
KHUONS = {"thu-hong-hieu", "doan-sai-roi-lat", "phong-quy-mo", "mot-ngay-o-day", "so-sanh-doi-thuong",
          "trang-so-hanh-trinh", "lich-su-nghiem", "hai-mua"}
FIRST_PERSON = re.compile(r"\b(i|i'm|i'd|i've|i'll|me|my|mine|myself)\b", re.I)
WOB_THIRD = re.compile(r"\bWob (has|is|was|decides|decided|wants|thinks|tries|tried|goes|went|feels)\b")
OPENER_SKIP = {"i", "the", "it", "my", "so", "and", "but", "a", "this", "that", "in", "at", "on", "then"}


def check_ke_chuyen(script: dict, scenes: list, others: list, errors: list, warns: list) -> None:
    """Định dạng "Wob kể chuyến đi" (cảnh có `lop`): ngôi thứ nhất, khuôn chương, gợi ý hình y_hinh, chống lặp câu chuyển.
    Luật: references/cong-thuc-ke-chuyen.md (đúc kết 17/11/2026). Kịch bản kiểu trình chiếu cũ (không có `lop`) bỏ qua."""
    if not any("lop" in s for s in scenes):
        return
    # khuôn của từng chương = khuôn khai ở cảnh mở chương (hoặc cảnh đầu tiên trong chương có khai)
    chuong: list[dict] = []
    for sc in scenes:
        sid = sc.get("id")
        if sc.get("lop") not in LOPS:
            errors.append(f"cảnh {sid}: lop '{sc.get('lop')}' không thuộc {sorted(LOPS)}")
        if sc.get("khuon") and sc["khuon"] not in KHUONS:
            errors.append(f"cảnh {sid}: khuon '{sc['khuon']}' không thuộc {sorted(KHUONS)}")
        if sc.get("chapter") or not chuong:
            chuong.append({"ten": sc.get("chapter"), "type": sc.get("type"), "khuon": sc.get("khuon"), "canh": [sc]})
        else:
            chuong[-1]["canh"].append(sc)
            chuong[-1]["khuon"] = chuong[-1]["khuon"] or sc.get("khuon")
        narr = sc.get("narration") or ""
        if WOB_THIRD.search(narr):
            warns.append(f"cảnh {sid}: lời kể Wob ở ngôi thứ ba ('{WOB_THIRD.search(narr).group(0)}'); Wob tự kể: 'I …'")
        if len(words(narr)) >= 15 and not FIRST_PERSON.search(narr):
            warns.append(f"cảnh {sid}: không có ngôi thứ nhất (I, my, me); Wob là người kể")
        lownorm = norm(narr)
        yh = sc.get("y_hinh") or []
        if not isinstance(yh, list):
            errors.append(f"cảnh {sid}: y_hinh phải là danh sách {{cue, y, gag?}}")
            yh = []
        for item in yh:
            if not item.get("y"):
                errors.append(f"cảnh {sid}: y_hinh thiếu 'y' (ý hình)")
            if item.get("cue") and norm(item["cue"]) not in lownorm:
                errors.append(f"cảnh {sid}: y_hinh cue '{item['cue']}' không có trong lời đọc")
    if scenes and scenes[0].get("lop") != "hien-tai":
        warns.append("cảnh hook nên ở lop 'hien-tai' (Wob ở bàn, cầm kỷ vật)")
    for ch in chuong:
        nghiem = ch["khuon"] == "lich-su-nghiem"
        for sc in ch["canh"]:
            if sc.get("lop") == "hoi-uc" and not nghiem and not any((y or {}).get("gag") for y in sc.get("y_hinh") or []):
                warns.append(f"cảnh {sc.get('id')} (hồi ức): chưa có gag bằng hình trong y_hinh")
            if nghiem and any((y or {}).get("gag") for y in sc.get("y_hinh") or []):
                errors.append(f"cảnh {sc.get('id')}: chương lich-su-nghiem không được có gag")
    giua = [c for c in chuong if c["type"] not in ("hook", "outro") and any(s.get("type") == "section" for s in c["canh"])]
    thieu = [c["ten"] for c in giua if not c["khuon"]]
    if thieu:
        warns.append(f"chương chưa khai khuon: {thieu}")
    k = [c["khuon"] for c in giua if c["khuon"]]
    if len(giua) >= 4 and len(set(k)) < 4:
        warns.append(f"chỉ dùng {len(set(k))} khuôn chương khác nhau ({sorted(set(k))}); nên ≥ 4 để đổi cách kể, cách dựng")
    for a, b in zip(k, k[1:]):
        if a == b:
            warns.append(f"hai chương liền nhau cùng khuôn '{a}'")
    if k.count("lich-su-nghiem") > 1:
        warns.append("lich-su-nghiem quá một chương")
    if k and k[0] == "lich-su-nghiem":
        warns.append("chương mở tập không nên là lich-su-nghiem")
    # câu chuyển, câu đôi tỉnh bơ lặp
    mo: dict[str, set] = {}
    for sc in scenes:
        for s in sentences(sc.get("narration") or ""):
            w = norm(s).split()
            if len(w) >= 3 and w[0] not in OPENER_SKIP:
                mo.setdefault(" ".join(w[:3]), set()).add(sc.get("id"))
    for op, ids in mo.items():
        if len(ids) >= 3:
            warns.append(f"cụm mở câu '{op}' lặp ở {len(ids)} cảnh {sorted(ids)}: đổi câu chuyển")
    luck = sum(len(re.findall(r"\bunluckily\b", sc.get("narration") or "", re.I)) for sc in scenes)
    if luck > 1:
        warns.append(f"câu đôi 'Luckily… Unluckily…' dùng {luck} lần; tối đa 1 lần mỗi tập")
    # chương mở tập không lặp khuôn chương mở của tập trước
    if k and others:
        prev = [s.get("khuon") for s in (others[-1][1].get("scenes") or []) if s.get("khuon")]
        if prev and prev[0] == k[0]:
            warns.append(f"chương mở dùng lại khuôn '{k[0]}' của tập {others[-1][0]}")


def check_van_ai(scenes: list, warns: list) -> None:
    """Đếm mẫu câu người xem hay gọi là 'AI script' (VAN_AI). Chỉ cảnh báo: lời đọc vẫn có thể dùng một lần có chủ ý."""
    for rx, toi_da, ten in VAN_AI:
        gap: list[tuple[str, str]] = []
        for sc in scenes:
            for m in rx.finditer(sc.get("narration") or ""):
                gap.append((sc.get("id"), m.group(0).strip()))
        if len(gap) > toi_da:
            vd = "; ".join(f"{i}: '{t[:40]}'" for i, t in gap[:4])
            warns.append(f"văn kiểu AI: {ten} {len(gap)} lần (tối đa {toi_da}) – {vd}. Viết lại cụ thể, bỏ khuôn")
    # nhịp câu đều: nhiều câu liền nhau cùng độ dài là dấu hiệu văn máy (và giọng máy đọc càng đều)
    for sc in scenes:
        dai = [len(words(s)) for s in sentences(sc.get("narration") or "")]
        for i in range(len(dai) - 3):
            khung = dai[i:i + 4]
            if min(khung) >= 6 and max(khung) - min(khung) <= 2:
                warns.append(f"cảnh {sc.get('id')}: 4 câu liền nhau dài gần bằng nhau ({khung} từ); xen một câu rất ngắn")
                break


NHAN_QUA = re.compile(r"\b(because|reason|why|explains?|that's how|so they|stayed|settled|the answer)\b", re.I)


def check_dap_an(script: dict, scenes: list, errors: list, warns: list) -> None:
    """Luật 'không lộ đáp án sớm' (27/11/2026, sau phản biện tập 4: lộ lý do không muỗi ở 0:44).

    script.json → dap_an_chinh = {"canh": <id cảnh lời giải>, "tu_khoa": ["mosquito", ...]}.
    - Lời giải nằm ở chương thân thứ nhất hoặc thứ hai, ước ~2:00–3:30 (sau ít nhất một giả thuyết sai).
    - Trước cảnh lời giải: cảnh hook được dùng từ khoá làm MANH MỐI (kỷ vật); các cảnh khác không được có câu vừa chứa
      từ khoá vừa nói nhân quả (LỖI); nhắc từ khoá không kèm nhân quả thì CẢNH BÁO để người viết xem lại.
    - Tiêu đề chương hiện cả danh sách ngay từ đầu (thanh tiến trình, mô tả) nên không chứa từ khoá (CẢNH BÁO).
    """
    da = script.get("dap_an_chinh")
    if not da:
        warns.append("chưa khai dap_an_chinh {canh, tu_khoa} (luật không lộ đáp án sớm, cong-thuc-ke-chuyen.md mục 5)")
        return
    ids = [sc.get("id") for sc in scenes]
    cid, kws = da.get("canh"), [k for k in (da.get("tu_khoa") or []) if k]
    if cid not in ids or not kws:
        errors.append("dap_an_chinh cần 'canh' là id cảnh có thật và 'tu_khoa' không rỗng")
        return
    rx = re.compile(r"\b(" + "|".join(re.escape(k) for k in kws) + r")", re.I)
    truoc = 0.0
    for sc in scenes:
        if sc.get("id") == cid:
            break
        truoc += len(words(sc.get("narration") or "")) / WPM * 60 + 1.3
    if truoc < 90:
        errors.append(f"dap_an_chinh: lời giải (cảnh {cid}) ước bắt đầu ở {truoc:.0f} s, quá sớm (cần ~120–210 s, sau một giả thuyết sai)")
    elif truoc < 120 or truoc > 240:
        warns.append(f"dap_an_chinh: lời giải (cảnh {cid}) ước bắt đầu ở {truoc:.0f} s, ngoài khoảng gợi ý 120–240 s")
    if not rx.search(next(sc for sc in scenes if sc.get("id") == cid).get("narration") or ""):
        warns.append(f"dap_an_chinh: cảnh {cid} không chứa từ khoá nào trong {kws}; khai đúng cảnh lời giải chưa?")
    for sc in scenes:
        if sc.get("id") == cid:
            break
        if sc.get("type") == "hook":
            continue
        for st in sentences(sc.get("narration") or ""):
            if rx.search(st):
                if NHAN_QUA.search(st):
                    errors.append(f"cảnh {sc['id']}: lộ đáp án trước cảnh lời giải {cid}: '{st[:90]}'")
                else:
                    warns.append(f"cảnh {sc['id']}: nhắc '{rx.search(st).group(0)}' trước lời giải; chỉ được là manh mối: '{st[:70]}'")
    for sc in scenes:
        if sc.get("chapter") and rx.search(sc["chapter"]):
            warns.append(f"chương '{sc['chapter']}' (cảnh {sc['id']}) chứa từ khoá đáp án: danh sách chương hiện từ đầu nên lộ đáp án")


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
        co_duoi = scenes[-1].get("type") == "duoi"
        if co_duoi:
            if len(scenes) < 2 or scenes[-2].get("type") != "outro":
                errors.append("cảnh 'duoi' phải đứng ngay sau cảnh 'outro'")
            d, dn = scenes[-1], len(words(scenes[-1].get("narration", "")))
            if not 25 <= dn <= 50:
                errors.append(f"cảnh duoi: lời {dn} từ, cần 25–50 từ (đuôi tập 15–20 giây, phần sau là nhạc và hình)")
            low = d.get("narration", "").lower()
            for c in DUOI_CAM:
                if c in low:
                    errors.append(f"cảnh duoi: cụm cấm '{c}' (đuôi tập mời bằng hình, không nài)")
            if any(has_number(s) for s in sentences(d.get("narration", ""))):
                errors.append("cảnh duoi: không đặt con số (đuôi tập không thêm khẳng định)")
            dd = d.get("duoi") or {}
            for k in ("ky_vat", "nha_tap_sau", "nhin_lai"):
                if not dd.get(k):
                    errors.append(f"cảnh duoi: thiếu duoi.{k} (xem skill mo-ket)")
            if d.get("verdict"):
                errors.append("cảnh duoi: không đặt verdict (con dấu chỉ ở outro)")
        elif scenes[-1].get("type") != "outro":
            errors.append("cảnh cuối phải là 'outro' hoặc 'duoi'")
        elif not any(x in project.name for x in TAP_CU_KHONG_DUOI):
            errors.append("thiếu cảnh 'duoi' (đuôi tập 15–20 giây sau outro, bắt buộc từ tập 3; xem skill mo-ket)")
        if sum(1 for s in scenes if s.get("type") == "duoi") > 1:
            errors.append("chỉ được một cảnh 'duoi'")
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
        if sc.get("type") == "hook":
            # lời chào nhận diện (skill mo-ket) không tính vào giới hạn câu mồi
            n = len(words(re.sub(r"Hi, I'm Wob\..*$", "", narr)))
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

    # ---- ảnh AI chấm hạng (anh_ai, chốt 17/11/2026; luật ở lay-tai-nguyen/scripts/hang_anh.py)
    check_anh_ai(script, scenes, errors, warns)

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

    # ---- kể chuyện ngôi thứ nhất: lop, khuon, y_hinh, chống lặp câu chuyển (references/cong-thuc-ke-chuyen.md)
    check_ke_chuyen(script, scenes, others, errors, warns)
    check_van_ai(scenes, warns)
    check_dap_an(script, scenes, errors, warns)

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
