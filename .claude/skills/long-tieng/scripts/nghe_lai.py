#!/usr/bin/env python3
"""Nghe lại giọng đọc bằng nhận dạng lời, so với lời gốc trong script.json (chép từ GameReel 15/11/2026, đổi sang tiếng Anh).

Cách dùng:
  python3 nghe_lai.py <thư mục dự án> [--only 3,5] [--model small]

Vì sao có (06/10/2026): agent kiểm định và phản biện không nghe được âm thanh. Một lỗi phiên âm
làm TTS đọc "Hungry Shark Evolution, Hungry Shark Evolution, Megalodon, Megalodon" lọt qua cả
kiểm định lẫn phản biện, và hai video trước đó đã đăng với tên bị đọc lặp ("Luanti, Luanti",
"Genshin, Genshin"). Cùng ngày, Edge TTS trả về âm thanh cụt (12s thay vì 21s) mà không báo lỗi.

Báo LỖI khi:
- một cụm 1–3 từ bị đọc lặp liền nhau mà lời gốc không lặp (lỗi phiên âm, TTS đọc lặp);
- số từ nghe được ít hơn 80% lời gốc (âm thanh cụt, thiếu câu);
- số từ nghe được nhiều hơn 125% lời gốc (đọc thừa).
Báo CẢNH BÁO khi tỉ lệ từ khớp dưới 60% (thường do tên nơi lạ, số; nên tự nghe cảnh đó).
Kết quả ghi audio/nghe-lai.json; thoát mã 1 nếu có LỖI.
Cần: pip install faster-whisper (lần đầu tải model small khoảng 500MB).
"""
from __future__ import annotations

import argparse
import difflib
import json
import re
import sys
import unicodedata
from pathlib import Path


ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
        "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]


def say(n: int) -> list[str]:
    """Số nguyên → chữ tiếng Anh, đủ để so lời đọc với lời nhận dạng."""
    if n < 20:
        return [ONES[n]]
    if n < 100:
        return [TENS[n // 10]] + ([ONES[n % 10]] if n % 10 else [])
    for size, name in ((10 ** 9, "billion"), (10 ** 6, "million"), (1000, "thousand"), (100, "hundred")):
        if n >= size:
            head, rest = divmod(n, size)
            return say(head) + [name] + (say(rest) if rest else [])
    return [str(n)]


def norm(text: str) -> list[str]:
    # nhận dạng lời hay ghi chữ số ("500", "-67", "1,200"), lời gốc ghi bằng chữ ("five hundred"): đổi chữ số sang chữ
    text = re.sub(r"[-−](?=\d)", " minus ", text.lower())
    text = text.replace("…", " ").replace("’", "'").replace("-", " ").replace("°", " degrees ")
    out: list[str] = []
    for w in re.split(r"[^\w',.]+", text):
        w = w.strip("',.")
        if not w:
            continue
        digits = w.replace(",", "")
        if digits.isdigit() and len(digits) <= 10:
            n = int(digits)
            if "," not in w and (1100 <= n <= 1999 or 2010 <= n <= 2099):  # năm: 1933 → nineteen thirty three
                out += say(n // 100) + (say(n % 100) if n % 100 else ["hundred"])
            else:
                out += say(n)
        elif re.fullmatch(r"\d+(st|nd|rd|th)", w):
            out += say(int(re.match(r"\d+", w).group(0)))
        else:
            out += [x for x in re.split(r"[^\w']+", w) if x]
    # "and" trong "one hundred and five" hay bị thêm/bớt: bỏ để so
    return [w.replace("'", "") for w in out if w != "and"]


def fold(words: list[str]) -> list[str]:
    # nhận dạng lời hay mất dấu: "cuộc thi thì chịu" nghe thành "cuộc thi thi chiều" (27/10/2026),
    # nên so cụm lặp trên chữ bỏ dấu ở cả hai phía; lời gốc có "thi thì" thì không tính là đọc lặp
    return ["".join(c for c in unicodedata.normalize("NFD", w) if not unicodedata.combining(c)).replace("đ", "d")
            for w in words]


def similar(a: list[str], b: list[str]) -> bool:
    if a == b:
        return True
    # tên tiếng Anh bị nghe thành hai cụm gần giống: "ando strel ando treo" (Andor's Trail, an-đo trây-ồ)
    # phải trùng từ đầu: tên đọc lặp luôn bắt đầu giống nhau; "chơi bad piggies. mà bad piggies" chỉ trùng đuôi
    return (len(a) >= 2 and a[0] == b[0]
            and difflib.SequenceMatcher(None, " ".join(a), " ".join(b)).ratio() >= 0.75)


def repeats(words: list[str]) -> list[str]:
    """Cụm 1–3 từ lặp liền nhau, ví dụ 'luanti luanti' hoặc 'hungry shark hungry shark'."""
    found = []
    for n in (3, 2, 1):
        for i in range(len(words) - 2 * n + 1):
            a, b = words[i:i + n], words[i + n:i + 2 * n]
            if similar(a, b) and not (n == 1 and len(a[0]) <= 2):
                found.append(" ".join(a))
    return found


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--only", default="")
    ap.add_argument("--model", default="small")
    args = ap.parse_args()

    project = Path(args.project)
    script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    only = {int(x) for x in args.only.split(",") if x.strip()}

    try:
        from faster_whisper import WhisperModel
    except ImportError:
        sys.exit("LỖI: cần pip install faster-whisper")
    model = WhisperModel(args.model, compute_type="int8")
    lang = (script.get("language") or "en-US").split("-")[0]

    report, errors = [], 0
    for sc in script["scenes"]:
        if only and sc["id"] not in only:
            continue
        audio = project / "audio" / f"scene-{sc['id']}.mp3"
        if not audio.exists():
            print(f"LỖI: cảnh {sc['id']}: không có {audio.name}")
            errors += 1
            continue
        segs, _ = model.transcribe(str(audio), language=lang)
        heard = " ".join(s.text.strip() for s in segs)
        ref, hyp = norm(sc["narration"]), norm(heard)
        ratio = len(hyp) / max(len(ref), 1)
        match = difflib.SequenceMatcher(None, ref, hyp).ratio()
        new_rep = [r for r in repeats(fold(hyp)) if r not in repeats(fold(ref))]
        problems = []
        if new_rep:
            problems.append(f"đọc lặp: {', '.join(sorted(set(new_rep)))}")
        if ratio < 0.8:
            problems.append(f"nghe được {len(hyp)}/{len(ref)} từ, có thể âm thanh bị cụt")
        if ratio > 1.25:
            problems.append(f"nghe được {len(hyp)}/{len(ref)} từ, có thể đọc thừa")
        level = "LỖI" if problems else ("CẢNH BÁO" if match < 0.6 else "OK")
        if level == "LỖI":
            errors += 1
        note = "; ".join(problems) or (f"khớp {match:.0%}, nên tự nghe" if level == "CẢNH BÁO" else "")
        print(f"{level}: cảnh {sc['id']}: khớp {match:.0%}, {len(hyp)}/{len(ref)} từ{(' — ' + note) if note else ''}")
        report.append({"id": sc["id"], "level": level, "match": round(match, 3), "words": [len(hyp), len(ref)],
                       "problems": problems, "heard": heard})

    out = project / "audio" / "nghe-lai.json"
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Ghi {out}")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
