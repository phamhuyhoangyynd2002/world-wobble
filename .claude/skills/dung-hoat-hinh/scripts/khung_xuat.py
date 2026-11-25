"""Độ phân giải xuất của một tập hoạt hình: đọc từ MỘT chỗ là `hoat-hinh/phan-canh.json` → `xuat`.

Hệ toạ độ thiết kế luôn là 1920×1080 (`rong`, `cao` trong phan-canh.json; mọi canh.js, lib, vùng an toàn, cỡ chữ
tính theo hệ này). Khung xuất là cỡ MP4 thật:
  - phan-canh.json có "xuat": {"w": 2560, "h": 1440}  → 2560×1440 (mặc định từ tập 4, chốt 26/11/2026)
  - không có "xuat"                                   → 1920×1080 (tập 1–3 đã giao, dựng lại y như cũ)
Ở khung 2560×1440, chuan_bi_doan.py phóng sân khấu 1920×1080 bằng CSS transform scale(4/3) và các lib vẽ canvas/WebGL
tăng bộ đệm vẽ theo `HH_DATA.xuat.ti_le`, nên hình được VẼ LẠI ở độ phân giải cao (không upscale bằng ffmpeg).

Dùng chung cho chuan_bi_doan.py, ghep_doan.py, to_khung.py, kiem_ky_thuat.py, dung_clip_doc.py.
"""
from __future__ import annotations

import json
from pathlib import Path

THIET_KE = (1920, 1080)          # hệ toạ độ thiết kế, không đổi
MAC_DINH_MOI = (2560, 1440)      # khung xuất mặc định cho dự án mới (tập 4 trở đi)


def doc_xuat(pc: dict) -> tuple[int, int]:
    """(w, h) khung xuất từ nội dung phan-canh.json. Không có `xuat` → 1920×1080."""
    x = pc.get("xuat")
    if not x:
        return THIET_KE
    if isinstance(x, str):                      # cho phép "2560x1440"
        w, h = (int(v) for v in x.lower().replace("×", "x").split("x"))
    else:
        w, h = int(x.get("w") or x.get("rong")), int(x.get("h") or x.get("cao"))
    if w % 2 or h % 2:
        raise ValueError(f"xuat {w}×{h}: rộng, cao phải chẵn (H.264 yuv420p)")
    if abs(w / h - 16 / 9) > 1e-3:
        raise ValueError(f"xuat {w}×{h}: phải đúng 16:9 như hệ thiết kế 1920×1080")
    return w, h


def ti_le(pc: dict) -> float:
    """Hệ số phóng từ hệ thiết kế ra khung xuất (1 hoặc 4/3)."""
    return doc_xuat(pc)[0] / THIET_KE[0]


def tim_phan_canh(p: Path) -> Path | None:
    """Tìm phan-canh.json từ thư mục dự án, thư mục hoat-hinh, hoặc chính file."""
    p = Path(p)
    for c in (p, p / "phan-canh.json", p / "hoat-hinh" / "phan-canh.json"):
        if c.is_file() and c.name == "phan-canh.json":
            return c
    return None


def doc_xuat_du_an(p: Path) -> tuple[int, int]:
    """(w, h) khung xuất của một dự án (thư mục dự án hoặc hoat-hinh/). Không có phan-canh.json → 1920×1080."""
    f = tim_phan_canh(p)
    if not f:
        return THIET_KE
    return doc_xuat(json.loads(f.read_text(encoding="utf-8")))
