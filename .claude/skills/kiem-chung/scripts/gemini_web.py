#!/usr/bin/env python3
"""Kiểm chứng vòng 2 qua Gemini web (gemini.google.com, tài khoản riêng, Browser MCP), thay cho gọi API.

Chốt 16/11/2026: người làm kênh chưa có GEMINI_API_KEY, chọn chạy vòng 2 qua giao diện web miễn phí.
Claude điều khiển trình duyệt ở phiên chính; script này lo phần trước và sau, giữ đúng khung vong-2-gemini.json
mà doi_chieu.py đọc. Prompt dùng chung với gemini_kiem_chung.py (bản API), nên hai đường cho kết quả cùng khung.

  prompt  Chia khẳng định thành lô, ghi prompt từng lô ra kiem-chung/web/lo-<n>.txt.
          python gemini_web.py prompt <dự án> [--only C03,C07] [--batch 8]

  nhan    Đọc câu trả lời đã chép từ trang (file text chứa mảng JSON), chuẩn hoá, kiểm link nguồn còn sống,
          gộp vào kiem-chung/vong-2-gemini.json.
          python gemini_web.py nhan <dự án> --lo 1 --file <câu trả lời.txt> [--model "<tên model giao diện ghi>"]

Độc lập với vòng 1: prompt chỉ có statement, tên nơi, câu hỏi của tập; KHÔNG có kết luận, nguồn của vòng 1 hay nguồn
người viết kịch bản dùng. Không dán gì khác vào cuộc trò chuyện đó.

Khác bản API: giao diện web không trả groundingMetadata, nên không chứng minh được Gemini đã tìm web. Bù lại, `nhan`
mở thử từng URL nguồn: link chết (404, không phân giải được) bị đánh dấu `url_song: false`; khẳng định Gemini kết
luận "dung"/"sai" mà không còn nguồn nào sống bị hạ xuống "khong-ro" (Gemini có thể bịa link).
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from gemini_kiem_chung import PROMPT, TYPES, VERDICTS, parse_json_array  # noqa: E402

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"


def url_song(url: str) -> bool | None:
    """True: mở được (kể cả 401/403/429: trang có thật nhưng chặn máy). False: 404/410 hoặc không phân giải được.
    None: lỗi khác, không kết luận."""
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=15):
                return True
        except urllib.error.HTTPError as e:
            if e.code in (404, 410):
                return False
            if e.code in (401, 403, 429):
                return True
            if method == "GET":
                return None
        except (urllib.error.URLError, ValueError, TimeoutError, OSError) as e:
            if method == "GET":
                reason = str(getattr(e, "reason", e)).lower()
                return False if ("getaddrinfo" in reason or "name or service" in reason or "nodename" in reason) else None
    return None


def load_script(project: Path) -> dict:
    return json.loads((project / "script.json").read_text(encoding="utf-8"))


def cmd_prompt(a) -> int:
    project = Path(a.project)
    script = load_script(project)
    claims = script.get("claims") or []
    only = {x.strip() for x in a.only.split(",")} if a.only else None
    todo = [c for c in claims if not only or c["id"] in only]
    if not todo:
        print("Không có khẳng định nào để kiểm")
        return 0
    place = script.get("place") or {}
    web = project / "kiem-chung" / "web"
    web.mkdir(parents=True, exist_ok=True)
    lo_json = web / "lo.json"
    # --only: đánh số tiếp các lô cũ, không ghi đè prompt đã gửi (bằng chứng)
    old_lots = json.loads(lo_json.read_text(encoding="utf-8")) if (only and lo_json.exists()) else []
    start = max((x["lo"] for x in old_lots), default=0) + 1
    lots = []
    for n, i in enumerate(range(0, len(todo), a.batch), start):
        batch = todo[i:i + a.batch]
        text = PROMPT.format(place=place.get("name", "?"), country=place.get("country", "?"),
                             question=script.get("question", ""),
                             claims="\n".join(f'{c["id"]}: {c["statement"]}' for c in batch))
        text += ("\nRun a Google Search for EVERY claim before you answer, and list only URLs you actually found in this "
                 "search session. If you could not search or did not find the claim in a source, use \"khong-ro\" and say "
                 "so in the note; do not answer from memory.\n"
                 "If the full array does not fit, stop after a complete object and write CONTINUE on the last line; "
                 "do not cut an object in half.\n")
        f = web / f"lo-{n}.txt"
        f.write_text(text, encoding="utf-8")
        lots.append({"lo": n, "file": str(f), "ids": [c["id"] for c in batch]})
    lo_json.write_text(json.dumps(old_lots + lots, ensure_ascii=False, indent=2), encoding="utf-8")
    for x in lots:
        print(f"lô {x['lo']}: {', '.join(x['ids'])} → {x['file']}")
    print(f"{len(lots)} lô. Mỗi lô một cuộc trò chuyện Gemini MỚI (không dán hai lô vào cùng một cuộc).")
    return 0


def cmd_nhan(a) -> int:
    project = Path(a.project)
    script = load_script(project)
    claims = {c["id"]: c for c in script.get("claims") or []}
    lots = json.loads((project / "kiem-chung" / "web" / "lo.json").read_text(encoding="utf-8"))
    lot = next((x for x in lots if x["lo"] == a.lo), None)
    if not lot:
        print(f"LỖI: không có lô {a.lo} trong kiem-chung/web/lo.json (chạy lệnh prompt trước)")
        return 1
    raw = Path(a.file).read_text(encoding="utf-8")
    (project / "kiem-chung" / "web" / f"lo-{a.lo}-tra-loi.txt").write_text(raw, encoding="utf-8")
    try:
        arr = parse_json_array(raw)
    except (ValueError, json.JSONDecodeError) as e:
        print(f"LỖI: không đọc được mảng JSON ({e}). Nhờ Gemini trả lại đúng JSON trong cùng cuộc trò chuyện.")
        return 1
    got = {str(r.get("id")): r for r in arr if isinstance(r, dict)}

    out_path = project / "kiem-chung" / "vong-2-gemini.json"
    old = json.loads(out_path.read_text(encoding="utf-8")) if out_path.exists() else {}
    results = {r["id"]: r for r in old.get("ket_qua", [])}
    thieu, ha = [], []
    for cid in lot["ids"]:
        c = claims.get(cid)
        if not c:
            continue
        r = got.get(cid)
        if not r:
            thieu.append(cid)
            results[cid] = {"id": cid, "statement": c["statement"], "verdict": "khong-ro", "gia_tri_dung": None,
                            "ghi_chu": "Gemini web không trả kết quả cho khẳng định này", "nguon": []}
            continue
        verdict = r.get("verdict") if r.get("verdict") in VERDICTS else "khong-ro"
        srcs = []
        for s in r.get("sources") or []:
            if not isinstance(s, dict) or not s.get("url"):
                continue
            song = url_song(s["url"])
            srcs.append({"title": s.get("title", ""), "url": s["url"], "publisher": s.get("publisher", ""),
                         "type": s.get("type") if s.get("type") in TYPES else "khac",
                         "published": s.get("published"), "url_song": song})
        note = r.get("note", "")
        if verdict in ("dung", "sai") and not any(s["url_song"] is not False for s in srcs):
            ha.append(cid)
            note = f"[hạ từ '{verdict}': không còn nguồn nào mở được] {note}"
            verdict = "khong-ro"
        results[cid] = {"id": cid, "statement": c["statement"], "verdict": verdict,
                        "gia_tri_dung": r.get("correct_value"), "ghi_chu": note, "nguon": srcs}

    order = list(claims)
    lots_done = sorted(set(old.get("lo_da_nhan", [])) | {a.lo})
    payload = {"vong": 2, "model": f"Gemini web ({a.model or 'model không ghi'})", "nguon": "gemini-web",
               "ngay": dt.date.today().isoformat(), "lo_da_nhan": lots_done,
               "ket_qua": [results[k] for k in order if k in results],
               "usage": {"calls": len(lots_done), "ghi_chu": "giao diện web miễn phí, không tính token"}}
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    counts: dict[str, int] = {}
    for x in payload["ket_qua"]:
        counts[x["verdict"]] = counts.get(x["verdict"], 0) + 1
    con = [x["lo"] for x in lots if x["lo"] not in lots_done]
    print(f"Lô {a.lo}: nhận {len(lot['ids']) - len(thieu)}/{len(lot['ids'])}. Tổng {counts}.")
    if thieu:
        print(f"CẢNH BÁO: thiếu kết quả {', '.join(thieu)} → hỏi tiếp trong cùng cuộc trò chuyện (\"continue\") rồi nhận lại")
    if ha:
        print(f"CẢNH BÁO: hạ xuống khong-ro vì link nguồn chết hết: {', '.join(ha)}")
    print("Còn lô: " + (", ".join(map(str, con)) if con else "không, vòng 2 xong → chạy doi_chieu.py"))
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("prompt")
    p.add_argument("project")
    p.add_argument("--only")
    p.add_argument("--batch", type=int, default=8)
    p.set_defaults(fn=cmd_prompt)
    n = sub.add_parser("nhan")
    n.add_argument("project")
    n.add_argument("--lo", type=int, required=True)
    n.add_argument("--file", required=True)
    n.add_argument("--model")
    n.set_defaults(fn=cmd_nhan)
    a = ap.parse_args()
    return a.fn(a)


if __name__ == "__main__":
    sys.exit(main())
