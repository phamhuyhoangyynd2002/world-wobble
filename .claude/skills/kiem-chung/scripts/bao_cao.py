#!/usr/bin/env python3
"""Sinh out/bao-cao-xac-thuc.md theo kenh/mau-bao-cao-xac-thuc.md, từ kết quả đối chiếu và timeline của video cuối.

Cách dùng: python3 bao_cao.py <thư mục dự án>

Đầu vào: script.json, timeline.json (mốc từng khẳng định), kiem-chung/vong-*.json (qua doi_chieu.evaluate),
         kiem-chung/da-sua.json (tuỳ chọn: [{"id", "loi_cu", "van_de", "xu_ly"}] những khẳng định đã sửa hoặc bỏ).
Thoát mã 1 khi kết luận cổng là KHÔNG ĐẠT (khi đó không giao video).
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from doi_chieu import evaluate  # noqa: E402

LEVEL_NAME = {"A": "A, xác thực", "B": "B, có cơ sở", "C": "C, còn tranh cãi (đã nói rõ trong lời)"}
VERDICT_VI = {"dung": "Đúng", "sai": "Sai", "mau-thuan": "Nguồn mâu thuẫn", "khong-ro": "Không rõ", None: "–"}
TYPE_VI = {"goc": "gốc", "bach-khoa": "bách khoa", "bao": "báo", "khac": "khác"}


def mmss(t: float) -> str:
    t = int(t)
    m, s = divmod(t, 60)
    return f"{m:02d}:{s:02d}"


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2
    project = Path(sys.argv[1])
    script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    tl_path = project / "timeline.json"
    timeline = json.loads(tl_path.read_text(encoding="utf-8")) if tl_path.exists() else {}
    times = {c["id"]: c["at"] for c in timeline.get("claims") or []}
    res = evaluate(project)
    rows = res["rows"]
    fixed_path = project / "kiem-chung" / "da-sua.json"
    fixed = json.loads(fixed_path.read_text(encoding="utf-8")) if fixed_path.exists() else []

    # đánh số nguồn chung cho cả báo cáo
    src_ids: dict[str, str] = {}
    src_list: list[dict] = []
    for r in rows:
        r["src_refs"] = []
        for s in r["nguon"]:
            key = s.get("url") or s.get("title")
            if key not in src_ids:
                src_ids[key] = f"S{len(src_ids) + 1}"
                src_list.append({**s, "sid": src_ids[key]})
            r["src_refs"].append(src_ids[key])

    ok = not res["problems"]
    verdict = next((sc["verdict"] for sc in script["scenes"] if sc.get("verdict")), {})
    total = len(rows)
    dur = timeline.get("duration")
    L = [f"# Báo cáo độ xác thực: {script['title']}", "",
         f"- Video: `{project.as_posix()}/out/video.mp4` ({mmss(dur) if dur else '?'})",
         f"- Ngày kiểm chứng: Claude {res['ngay_claude'] or '?'} · Gemini {res['ngay_gemini'] or '?'}",
         f"- Vòng 1: Claude ({res['claude_model'] or '?'}), agent kiểm chứng độc lập",
         f"- Vòng 2: Gemini ({res['gemini_model'] or '?'}), có tìm kiếm web, không thấy kết luận của vòng 1",
         f"- Kết luận cổng: **{'ĐẠT' if ok else 'KHÔNG ĐẠT'}**" + ("" if ok else f" ({'; '.join(res['problems'][:5])})"),
         "", "## Tóm tắt", "", "| Mức | Số khẳng định | Tỉ lệ |", "|---|---|---|"]
    for k in "ABC":
        n = res["counts"][k]
        L.append(f"| {LEVEL_NAME[k]} | {n} | {n / total:.0%} |" if total else f"| {LEVEL_NAME[k]} | 0 | – |")
    removed = [f for f in fixed if "bỏ" in str(f.get("xu_ly", "")).lower()]
    L += [f"| D, không kiểm chứng được (đã bỏ) | {len(removed)} | – |",
          f"| **Tổng còn trong video** | {total} | 100% |", "",
          f"Hai mô hình lệch nhau ở {res['lech']} khẳng định; cách xử lý ở mục \"Đã sửa hoặc bỏ\".", "",
          "## Từng khẳng định", "",
          "| Mã | Thời điểm | Khẳng định (lời đọc) | Mức | Claude | Gemini | Nguồn | Ghi chú |",
          "|---|---|---|---|---|---|---|---|"]
    for r in rows:
        at = times.get(r["id"])
        note = r["issue"] or ("lời đọc đã nói rõ còn tranh cãi" if r["level"] == "C" else "")
        if r["vong3"]:
            note = (note + "; " if note else "") + f"tra lần ba: {VERDICT_VI.get(r['vong3'])}"
        L.append(f"| {r['id']} | {mmss(at) if at is not None else '?'} | \"{r['quote']}\" | {r['level'] or '?'} | "
                 f"{VERDICT_VI.get(r['claude'])} | {VERDICT_VI.get(r['gemini'])} | "
                 f"{''.join('[' + s + ']' for s in r['src_refs'])} | {note} |")
    L += ["", "## Đã sửa hoặc bỏ", "", "| Mã | Lời cũ | Vấn đề | Xử lý |", "|---|---|---|---|"]
    for f in fixed:
        L.append(f"| {f.get('id', '')} | \"{f.get('loi_cu', '')}\" | {f.get('van_de', '')} | {f.get('xu_ly', '')} |")
    if not fixed:
        L.append("| – | – | – | Không có |")
    L += ["", "## Phán quyết của kênh", "",
          f"- Con dấu: {verdict.get('label', '?')}",
          f"- Lý do trong video: \"{verdict.get('reason', '')}\"",
          "- Đây là nhận định của kênh, không phải khẳng định cần kiểm chứng; các sự thật làm căn cứ cho nhận định đã nằm trong bảng trên.",
          "", "## Nguồn", "",
          "| Mã | Tiêu đề | Bên đăng | Loại | Ngày đăng | URL |", "|---|---|---|---|---|---|"]
    for s in src_list:
        L.append(f"| {s['sid']} | {s.get('title', '')} | {s.get('publisher', '')} | {TYPE_VI.get(s.get('type'), 'khác')} | "
                 f"{s.get('published') or '–'} | {s.get('url', '')} |")
    out = project / "out"
    out.mkdir(exist_ok=True)
    (out / "bao-cao-xac-thuc.md").write_text("\n".join(L) + "\n", encoding="utf-8")
    print(f"{'ĐẠT' if ok else 'KHÔNG ĐẠT'}: {out / 'bao-cao-xac-thuc.md'} · {total} khẳng định, {len(src_list)} nguồn")
    for p in res["problems"]:
        print(f"LỖI: {p}")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
