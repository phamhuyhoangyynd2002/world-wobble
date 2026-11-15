#!/usr/bin/env python3
"""Tạo ảnh minh hoạ bằng Gemini image theo phong cách chung của kênh, ghi prompt và model vào manifest.

Cách dùng:
  python3 tao_anh_ai.py <thư mục dự án> --id ai-village-dusk --prompt "a tiny village of wooden houses at dusk, deep snow" \
      [--scenes 2,3] [--ratio 16:9] [--ref templates/_shared/wob/hao-hung.png] [--lam-lai] [--tai-hien-su-kien]

Cần GEMINI_API_KEY, GEMINI_IMAGE_MODEL (trong môi trường hoặc .env ở gốc repo).
- Phong cách chung đọc từ templates/_shared/phong-cach-anh.txt và đặt trước prompt, để mọi ảnh cùng một nét.
- Từ chối prompt xin ảnh như ảnh chụp, hoặc nhắc tên hoạ sĩ, studio, nhân vật có sẵn (.claude/rules/chinh-xac-va-ban-quyen.md mục 3),
  hoặc xin vẽ bản đồ (bản đồ luôn vẽ bằng code: ve_ban_do.mjs).
- Ảnh đã có thì không tạo lại (tốn tiền) trừ khi --lam-lai.
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import manifest  # noqa: E402

API = "https://generativelanguage.googleapis.com/v1beta"
BANNED = re.compile(r"\b(photo|photograph|photorealistic|photo-realistic|realistic photo|dslr|hyperrealistic|"
                    r"kurzgesagt|ghibli|pixar|disney|dreamworks|simpsons|in the style of|map of|world map)\b", re.I)
GUARD = ("Clearly an illustration, not a photograph. No text, no letters, no logos, no watermarks, no maps, "
         "no flags. Do not depict identifiable real people.")


def load_env(root: Path) -> None:
    env = root / ".env"
    if env.exists():
        for line in env.read_text(encoding="utf-8").splitlines():
            m = re.match(r"\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$", line)
            if m and m.group(1) not in os.environ and m.group(2):
                os.environ[m.group(1)] = m.group(2).strip().strip('"').strip("'")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--id", required=True)
    ap.add_argument("--prompt", required=True, help="mô tả cảnh bằng tiếng Anh, không cần nhắc phong cách")
    ap.add_argument("--scenes")
    ap.add_argument("--ratio", default="16:9")
    ap.add_argument("--ref", action="append", default=[], help="ảnh tham chiếu (ví dụ Wob), có thể lặp")
    ap.add_argument("--lam-lai", action="store_true")
    ap.add_argument("--tai-hien-su-kien", action="store_true",
                    help="ảnh tái hiện một sự kiện có thật: phải gắn nhãn AI (Nghị định 142/2026)")
    args = ap.parse_args()

    root = Path(__file__).resolve().parents[4]
    load_env(root)
    project = Path(args.project)
    dest = project / "assets" / "ai" / f"{args.id}.png"
    if dest.exists() and not args.lam_lai:
        print(f"Đã có {dest}, không tạo lại (thêm --lam-lai nếu thật sự cần)")
        return 0
    if BANNED.search(args.prompt):
        print(f"TỪ CHỐI: prompt có '{BANNED.search(args.prompt).group(0)}': không xin ảnh như ảnh chụp, không bắt chước "
              "phong cách hay nhân vật có sẵn, không vẽ bản đồ bằng AI")
        return 1
    key, model = os.environ.get("GEMINI_API_KEY"), os.environ.get("GEMINI_IMAGE_MODEL")
    if not key or not model:
        print("LỖI: thiếu GEMINI_API_KEY hoặc GEMINI_IMAGE_MODEL (.env ở gốc repo; xem .env.example)")
        return 1
    style_file = root / "templates" / "_shared" / "phong-cach-anh.txt"
    style = style_file.read_text(encoding="utf-8").strip() if style_file.exists() else ""
    if not style or style.startswith("TODO"):
        print("CẢNH BÁO: templates/_shared/phong-cach-anh.txt chưa chốt phong cách; ảnh giữa các tập sẽ khó đồng nhất")
    full = " ".join(x for x in (style, args.prompt.strip(), GUARD) if x and not x.startswith("TODO"))

    parts: list[dict] = [{"text": full}]
    for ref in args.ref:
        rp = (root / ref) if not Path(ref).is_absolute() else Path(ref)
        mime = "image/png" if rp.suffix.lower() == ".png" else "image/jpeg"
        parts.append({"inlineData": {"mimeType": mime, "data": base64.b64encode(rp.read_bytes()).decode()}})
    body = {"contents": [{"role": "user", "parts": parts}],
            "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": args.ratio}}}
    req = urllib.request.Request(f"{API}/models/{model}:generateContent?key={urllib.parse.quote(key)}",
                                 data=json.dumps(body).encode(), headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=240) as r:
            data = json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        print(f"LỖI: Gemini image {e.code}: {e.read().decode(errors='replace')[:600]}")
        return 1
    img = None
    for p in ((data.get("candidates") or [{}])[0].get("content") or {}).get("parts", []):
        if p.get("inlineData", {}).get("data"):
            img = base64.b64decode(p["inlineData"]["data"])
            break
    if not img:
        reason = (data.get("candidates") or [{}])[0].get("finishReason") or data.get("promptFeedback")
        print(f"LỖI: Gemini không trả ảnh ({reason})")
        return 1
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(img)
    dest.with_suffix(".prompt.txt").write_text(full + "\n", encoding="utf-8")
    manifest.put(project, args.id, {
        "file": dest.relative_to(project).as_posix(), "kind": "anh-ai", "basis": "ai-tao",
        "license": "Kênh tự tạo bằng AI (không có bản quyền ở Mỹ nếu chỉ từ prompt)", "author": "World Wobble (AI)",
        "source_url": None, "attribution": None, "prompt": full, "model": model,
        "refs": args.ref or None, "scenes": manifest.parse_scenes(args.scenes),
        "tai_hien_su_kien": True if args.tai_hien_su_kien else None,
    })
    usage = data.get("usageMetadata") or {}
    print(f"Xong: {dest} · model {model} · token {usage.get('totalTokenCount', '?')}")
    print("Mở ảnh xem (Read): rõ là tranh vẽ, không chữ, không bản đồ, không người nhận ra được, đúng nội dung lời đọc.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
