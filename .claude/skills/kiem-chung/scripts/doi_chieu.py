#!/usr/bin/env python3
"""Đối chiếu kiểm chứng vòng 1 (Claude) và vòng 2 (Gemini), xếp mức A–D cho từng khẳng định, và là cổng kiểm chứng.

Cách dùng: python3 doi_chieu.py <thư mục dự án> [--cong]

Đầu vào: script.json (claims, sources), kiem-chung/vong-1-claude.json, kiem-chung/vong-2-gemini.json,
         kiem-chung/vong-3.json (tuỳ chọn: tra lần ba cho khẳng định hai vòng lệch nhau, cùng khung).
Đầu ra:  kiem-chung/doi-chieu.json, kiem-chung/doi-chieu.md.

Mức (kenh/ho-so-kenh.md, mục Kiểm chứng):
  A  hai vòng cùng "dung", ≥ 2 nguồn độc lập (khác tên miền), trong đó ≥ 1 nguồn gốc
  B  hai vòng cùng "dung", ≥ 1 nguồn uy tín (gốc, bách khoa, báo)
  C  nguồn mâu thuẫn (một vòng "mau-thuan", hoặc tra lần ba ra "mau-thuan"): lời đọc phải nói rõ (hedged)
  D  không kiểm chứng được, hoặc sai mà chưa sửa: phải bỏ khỏi video
Hai vòng lệch nhau ("dung" với "sai"/"khong-ro") mà chưa có vòng 3 thì là LỆCH, chưa xếp mức.

--cong: thoát mã 1 nếu còn khẳng định mức D, mức C chưa hedged, chỗ lệch chưa xử lý, khẳng định thiếu ở một vòng,
hoặc statement trong script.json đã đổi sau khi kiểm (phải kiểm lại khẳng định đó).
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from urllib.parse import urlparse

REPUTABLE = {"goc", "bach-khoa", "bao"}
PRIMARY_HINTS = (".gov", ".gouv.", ".gob.", ".go.", ".gc.ca", "gov.uk", ".edu", ".ac.", "who.int", "un.org",
                 "worldbank.org", "noaa", "nasa", "usgs", "stat", "census", "meteo", "met.no", "bom.gov.au")
ENCYCLO_HINTS = ("britannica.com",)


def domain(src: dict) -> str:
    url = src.get("url") or ""
    host = urlparse(url).netloc.lower().removeprefix("www.")
    if not host or "vertexaisearch" in host or "googleapis" in host:
        host = (src.get("publisher") or src.get("title") or "").lower().removeprefix("www.")
    return host


def classify(src: dict) -> str:
    """Loại nguồn: tin loại do vòng kiểm chứng ghi, nhưng hạ Wikipedia về 'khac' và nâng tên miền chính phủ lên 'goc'."""
    d = domain(src)
    if "wikipedia.org" in d or "fandom.com" in d or "youtube.com" in d:
        return "khac"
    t = src.get("type") or "khac"
    if any(h in d for h in PRIMARY_HINTS):
        return "goc"
    if any(h in d for h in ENCYCLO_HINTS) and t == "khac":
        return "bach-khoa"
    return t


def load_round(path: Path) -> dict:
    if not path.exists():
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    return {"model": data.get("model"), "ngay": data.get("ngay"),
            "by_id": {r["id"]: r for r in data.get("ket_qua", [])}}


def level_from_sources(srcs: list[dict]) -> str:
    good = [s for s in srcs if classify(s) in REPUTABLE]
    if not good:
        return "D"
    domains = {domain(s) for s in good if domain(s)}
    if len(domains) >= 2 and any(classify(s) == "goc" for s in good):
        return "A"
    return "B"


def evaluate(project: Path) -> dict:
    script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    kc = project / "kiem-chung"
    r1 = load_round(kc / "vong-1-claude.json")
    r2 = load_round(kc / "vong-2-gemini.json")
    r3 = load_round(kc / "vong-3.json")
    rows, problems = [], []
    for c in script.get("claims") or []:
        cid = c["id"]
        a = (r1.get("by_id") or {}).get(cid)
        b = (r2.get("by_id") or {}).get(cid)
        t = (r3.get("by_id") or {}).get(cid)
        row = {"id": cid, "scene": c.get("scene"), "quote": c.get("quote"), "statement": c.get("statement"),
               "hedged": bool(c.get("hedged")), "claude": a.get("verdict") if a else None,
               "gemini": b.get("verdict") if b else None, "vong3": t.get("verdict") if t else None,
               "level": None, "issue": None, "nguon": []}
        # nguồn: của hai vòng (và vòng 3), bỏ trùng theo url
        seen = set()
        for r in (a, b, t):
            for s in (r or {}).get("nguon", []):
                key = s.get("url") or s.get("title")
                if key and key not in seen:
                    seen.add(key)
                    row["nguon"].append({**s, "type": classify(s)})
        stale = [name for name, r in (("Claude", a), ("Gemini", b)) if r and r.get("statement") != c.get("statement")]
        if not a or not b:
            row["issue"] = "chưa đủ hai vòng: thiếu " + ", ".join(n for n, r in (("Claude", a), ("Gemini", b)) if not r)
        elif stale:
            row["issue"] = f"statement đã đổi sau khi {', '.join(stale)} kiểm: kiểm lại khẳng định này"
        else:
            va, vb = a["verdict"], b["verdict"]
            if t:  # tra lần ba quyết định
                v = t["verdict"]
                row["level"] = {"dung": level_from_sources(row["nguon"]), "mau-thuan": "C"}.get(v, "D")
            elif va == vb == "dung":
                row["level"] = level_from_sources(row["nguon"])
            elif "mau-thuan" in (va, vb) and {va, vb} <= {"dung", "mau-thuan"}:
                row["level"] = "C"
            elif va == vb and va in ("khong-ro", "sai"):
                row["level"] = "D"
                if va == "sai":
                    row["issue"] = "cả hai vòng nói sai: sửa theo giá trị đúng rồi kiểm lại, hoặc bỏ"
            else:
                row["issue"] = f"LỆCH: Claude '{va}', Gemini '{vb}': tra lần ba (kiem-chung/vong-3.json), sửa lời dè dặt hơn, hoặc bỏ"
        if row["level"] == "D" and not row["issue"]:
            row["issue"] = "mức D: phải bỏ khỏi video"
        if row["level"] == "C" and not row["hedged"]:
            row["issue"] = "mức C nhưng lời đọc chưa nói rõ là còn tranh cãi (đặt hedged: true sau khi sửa lời)"
        if row["issue"]:
            problems.append(f"{cid}: {row['issue']}")
        rows.append(row)
    counts = {k: sum(1 for r in rows if r["level"] == k) for k in "ABCD"}
    return {"claude_model": r1.get("model"), "gemini_model": r2.get("model"), "ngay_claude": r1.get("ngay"),
            "ngay_gemini": r2.get("ngay"), "rows": rows, "counts": counts, "problems": problems,
            "lech": sum(1 for r in rows if r["claude"] and r["gemini"] and r["claude"] != r["gemini"])}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--cong", action="store_true", help="thoát mã 1 nếu chưa qua cổng kiểm chứng")
    args = ap.parse_args()
    project = Path(args.project)
    res = evaluate(project)
    kc = project / "kiem-chung"
    kc.mkdir(exist_ok=True)
    (kc / "doi-chieu.json").write_text(json.dumps(res, ensure_ascii=False, indent=2), encoding="utf-8")
    md = ["# Đối chiếu kiểm chứng", "",
          f"- Vòng 1 Claude: {res['claude_model']} ({res['ngay_claude']}) · Vòng 2 Gemini: {res['gemini_model']} ({res['ngay_gemini']})",
          f"- Mức: A {res['counts']['A']} · B {res['counts']['B']} · C {res['counts']['C']} · D {res['counts']['D']} · hai vòng lệch nhau: {res['lech']}",
          "", "| Mã | Cảnh | Khẳng định | Claude | Gemini | Vòng 3 | Mức | Việc cần làm |", "|---|---|---|---|---|---|---|---|"]
    for r in res["rows"]:
        md.append(f"| {r['id']} | {r['scene']} | {r['statement']} | {r['claude'] or '–'} | {r['gemini'] or '–'} | "
                  f"{r['vong3'] or '–'} | {r['level'] or '?'} | {r['issue'] or ''} |")
    (kc / "doi-chieu.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    for p in res["problems"]:
        print(f"{'LỖI' if args.cong else 'CẦN XỬ LÝ'}: {p}")
    ok = not res["problems"]
    print(f"{'ĐẠT' if ok else 'CHƯA ĐẠT'}: {len(res['rows'])} khẳng định · A {res['counts']['A']} · B {res['counts']['B']} · "
          f"C {res['counts']['C']} · D {res['counts']['D']} · lệch {res['lech']} → {kc / 'doi-chieu.md'}")
    return 1 if (args.cong and not ok) else 0


if __name__ == "__main__":
    sys.exit(main())
