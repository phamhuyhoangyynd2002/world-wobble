#!/usr/bin/env python3
"""Kiểm chứng vòng 2 bằng Gemini (Google) có tìm kiếm web, độc lập với vòng 1 (Claude).

Cách dùng:
  python3 gemini_kiem_chung.py <thư mục dự án> [--only C03,C07] [--model <tên model>] [--batch 6]
  python3 gemini_kiem_chung.py --list-models

Cần trong môi trường (hoặc .env ở gốc repo): GEMINI_API_KEY, GEMINI_MODEL (model có Google Search grounding).
Gemini chỉ nhận `statement` của từng khẳng định cùng tên nơi và câu hỏi của tập; KHÔNG nhận kết luận, nguồn của vòng 1
hay nguồn người viết kịch bản đã dùng, để hai vòng thật sự độc lập (kenh/ho-so-kenh.md, mục Kiểm chứng).

Ghi: kiem-chung/vong-2-gemini.json (cùng khung với vong-1-claude.json), kèm lượng token đã dùng để tính chi phí.
Chạy --only thì gộp kết quả mới vào file cũ.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://generativelanguage.googleapis.com/v1beta"
VERDICTS = {"dung", "sai", "mau-thuan", "khong-ro"}
TYPES = {"goc", "bach-khoa", "bao", "khac"}

PROMPT = """You are an independent, skeptical fact-checker for an English-language YouTube documentary about the place "{place}" ({country}). The episode asks: "{question}".

Check each claim below using Google Search. Assume every claim may be wrong until you find it stated in a reliable source. Prefer primary sources (national statistics offices, government or municipal websites, peer-reviewed papers, official weather-service data), then reputable encyclopedias (e.g. Britannica), then reputable news outlets. Wikipedia, travel blogs, forums, social media and other YouTube videos do not count as sources on their own.

For each claim decide:
- "dung": reliable sources support the claim as worded (numbers may be rounded the same way).
- "sai": reliable sources contradict it; give the correct value.
- "mau-thuan": reliable sources disagree with each other, or the claim depends on a definition that sources treat differently (e.g. "coldest inhabited place").
- "khong-ro": you could not find a reliable source either way.

Reply with ONLY a JSON array, no prose, one object per claim, in this exact shape:
[{{"id": "C01", "verdict": "dung|sai|mau-thuan|khong-ro", "correct_value": "string or null", "note": "one short sentence", "sources": [{{"title": "page title", "publisher": "site or organisation", "url": "https://...", "type": "goc|bach-khoa|bao|khac", "published": "YYYY-MM-DD or null"}}]}}]

Claims:
{claims}
"""


def load_env(root: Path) -> None:
    env = root / ".env"
    if not env.exists():
        return
    for line in env.read_text(encoding="utf-8").splitlines():
        m = re.match(r"\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$", line)
        if m and m.group(1) not in os.environ and m.group(2):
            os.environ[m.group(1)] = m.group(2).strip().strip('"').strip("'")


def call(url: str, body: dict | None = None, attempts: int = 4) -> dict:
    data = json.dumps(body).encode() if body is not None else None
    for i in range(1, attempts + 1):
        req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"},
                                     method="POST" if data else "GET")
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")[:800]
            if e.code in (400, 401, 403, 404) or i == attempts:
                raise RuntimeError(f"Gemini API lỗi {e.code}: {msg}") from None
            print(f"  thử lại lần {i} sau lỗi {e.code}")
        except urllib.error.URLError as e:
            if i == attempts:
                raise RuntimeError(f"Không gọi được Gemini API: {e}") from None
            print(f"  thử lại lần {i} sau lỗi mạng")
        time.sleep(3 * i)
    raise RuntimeError("không tới được đây")


def resolve(url: str) -> str:
    """Link grounding của Gemini là link chuyển hướng; thử lấy địa chỉ thật (không được thì giữ nguyên)."""
    if "grounding-api-redirect" not in url:
        return url
    try:
        req = urllib.request.Request(url, method="HEAD")
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.geturl()
    except Exception:  # noqa: BLE001
        return url


def parse_json_array(text: str) -> list:
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text)
    m = re.search(r"\[.*\]", text, re.S)
    if not m:
        raise ValueError("không thấy mảng JSON trong câu trả lời")
    return json.loads(m.group(0))


def list_models(key: str) -> int:
    data = call(f"{API}/models?pageSize=200&key={urllib.parse.quote(key)}")
    for m in data.get("models", []):
        methods = m.get("supportedGenerationMethods", [])
        if "generateContent" in methods:
            print(f"{m['name'].removeprefix('models/'):45s} {m.get('displayName', '')}")
    print("Chọn model có tìm kiếm web cho GEMINI_MODEL; model tạo ảnh (tên có 'image') cho GEMINI_IMAGE_MODEL.")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project", nargs="?")
    ap.add_argument("--only", help="danh sách mã khẳng định, ví dụ C03,C07")
    ap.add_argument("--model")
    ap.add_argument("--batch", type=int, default=6, help="số khẳng định mỗi lần gọi")
    ap.add_argument("--list-models", action="store_true")
    args = ap.parse_args()

    here = Path(__file__).resolve()
    root = here.parents[4]
    load_env(root)
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        print("LỖI: chưa có GEMINI_API_KEY (điền vào .env ở gốc repo, mẫu ở .env.example)")
        return 1
    if args.list_models:
        return list_models(key)
    if not args.project:
        ap.error("cần thư mục dự án")
    model = args.model or os.environ.get("GEMINI_MODEL")
    if not model:
        print("LỖI: chưa có GEMINI_MODEL. Chạy --list-models rồi điền vào .env")
        return 1

    project = Path(args.project)
    script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    claims = script.get("claims") or []
    only = {x.strip() for x in args.only.split(",")} if args.only else None
    todo = [c for c in claims if not only or c["id"] in only]
    if not todo:
        print("Không có khẳng định nào để kiểm")
        return 0
    place = script.get("place") or {}

    out_path = project / "kiem-chung" / "vong-2-gemini.json"
    out_path.parent.mkdir(exist_ok=True)
    old = json.loads(out_path.read_text(encoding="utf-8")) if out_path.exists() else {}
    results = {r["id"]: r for r in old.get("ket_qua", [])} if only else {}
    usage = {"prompt_tokens": 0, "output_tokens": 0, "calls": 0}

    for i in range(0, len(todo), args.batch):
        batch = todo[i:i + args.batch]
        lines = "\n".join(f'{c["id"]}: {c["statement"]}' for c in batch)
        body = {
            "contents": [{"role": "user", "parts": [{"text": PROMPT.format(
                place=place.get("name", "?"), country=place.get("country", "?"),
                question=script.get("question", ""), claims=lines)}]}],
            "tools": [{"google_search": {}}],
            "generationConfig": {"temperature": 0.1},
        }
        print(f"- Gemini kiểm {', '.join(c['id'] for c in batch)}")
        data = call(f"{API}/models/{model}:generateContent?key={urllib.parse.quote(key)}", body)
        usage["calls"] += 1
        meta = data.get("usageMetadata") or {}
        usage["prompt_tokens"] += meta.get("promptTokenCount", 0)
        usage["output_tokens"] += meta.get("candidatesTokenCount", 0)
        cand = (data.get("candidates") or [{}])[0]
        text = "".join(p.get("text", "") for p in (cand.get("content") or {}).get("parts", []))
        chunks = [((c.get("web") or {}).get("uri", ""), (c.get("web") or {}).get("title", ""))
                  for c in (cand.get("groundingMetadata") or {}).get("groundingChunks", [])]
        if not chunks:
            print("  CẢNH BÁO: câu trả lời không có grounding (Gemini không tìm web?), kiểm lại model có hỗ trợ google_search")
        try:
            arr = parse_json_array(text)
        except (ValueError, json.JSONDecodeError) as e:
            print(f"  LỖI: không đọc được JSON của Gemini ({e}); các khẳng định này để khong-ro")
            arr = []
        got = {str(r.get("id")): r for r in arr if isinstance(r, dict)}
        grounded = [{"title": t, "url": resolve(u), "publisher": t, "type": "khac", "tu_grounding": True}
                    for u, t in chunks if u]
        for c in batch:
            r = got.get(c["id"])
            if not r:
                results[c["id"]] = {"id": c["id"], "statement": c["statement"], "verdict": "khong-ro",
                                    "gia_tri_dung": None, "ghi_chu": "Gemini không trả kết quả cho khẳng định này",
                                    "nguon": []}
                continue
            verdict = r.get("verdict") if r.get("verdict") in VERDICTS else "khong-ro"
            srcs = []
            for s in r.get("sources") or []:
                if not isinstance(s, dict) or not s.get("url"):
                    continue
                srcs.append({"title": s.get("title", ""), "url": resolve(s["url"]),
                             "publisher": s.get("publisher", ""),
                             "type": s.get("type") if s.get("type") in TYPES else "khac",
                             "published": s.get("published")})
            results[c["id"]] = {"id": c["id"], "statement": c["statement"], "verdict": verdict,
                                "gia_tri_dung": r.get("correct_value"), "ghi_chu": r.get("note", ""),
                                "nguon": srcs, "grounding": grounded}

    order = [c["id"] for c in claims]
    payload = {"vong": 2, "model": model, "ngay": dt.date.today().isoformat(),
               "ket_qua": [results[k] for k in order if k in results],
               "usage": usage}
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    counts = {}
    for r in payload["ket_qua"]:
        counts[r["verdict"]] = counts.get(r["verdict"], 0) + 1
    print(f"Xong: {out_path} · {counts} · {usage['calls']} lượt gọi, "
          f"{usage['prompt_tokens']} token vào, {usage['output_tokens']} token ra")
    return 0


if __name__ == "__main__":
    sys.exit(main())
