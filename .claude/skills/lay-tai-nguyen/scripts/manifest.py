"""Đọc, ghi assets/manifest.json dùng chung cho các script lấy tài nguyên của World Wobble.

Khung manifest:
{
  "assets": {
    "<id>": {
      "file": "assets/<thư mục>/<tên file>",     # đường dẫn tương đối từ thư mục dự án
      "kind": "anh-ai" | "anh-commons" | "ban-do" | "tu-tao" | "anh-cong",
      "basis": "ai-tao" | "giay-phep" | "public-domain" | "tu-tao",
      "license": "...", "license_url": "...", "author": "...", "source_url": "...",
      "attribution": "câu ghi công đưa vào mô tả (nếu giấy phép yêu cầu)",
      "scenes": [3, 4],                          # cảnh dùng (để build_timeline tự chia nhịp khi cảnh không khai báo shots)
      "created": "YYYY-MM-DD",
      ... trường riêng: prompt, model (ảnh AI); marks, bbox, vung_bien_dong, chu_quyen_da_kiem (bản đồ)
    }
  }
}
"""
from __future__ import annotations

import datetime as dt
import json
import re
from pathlib import Path


def path(project: Path) -> Path:
    return project / "assets" / "manifest.json"


def load(project: Path) -> dict:
    p = path(project)
    if p.exists():
        return json.loads(p.read_text(encoding="utf-8"))
    return {"assets": {}}


def save(project: Path, data: dict) -> None:
    p = path(project)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def put(project: Path, asset_id: str, entry: dict) -> None:
    if not re.fullmatch(r"[a-z0-9][a-z0-9.-]*", asset_id):
        raise SystemExit(f"LỖI: id '{asset_id}' chỉ được chữ thường, số, dấu chấm, gạch nối")
    data = load(project)
    old = data["assets"].get(asset_id, {})
    entry.setdefault("created", dt.date.today().isoformat())
    if old.get("scenes") and not entry.get("scenes"):
        entry["scenes"] = old["scenes"]
    data["assets"][asset_id] = {**old, **entry}
    save(project, data)


def parse_scenes(text: str | None) -> list[int]:
    return [int(x) for x in text.split(",") if x.strip()] if text else []
