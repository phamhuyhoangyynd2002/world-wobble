"""Chép một bản đồ vẽ bằng code (tài nguyên `map-*` trong assets/manifest.json) vào thư mục đoạn để dán lên trang sổ.

Chạy:
    python templates/hoat-hinh/cat-giay/cong-cu/chep_ban_do.py <dự án> <doan-id> <map-id> [--khung x y w h] [--ten hau-to] [--giu-cham]

- Chỉ nhận tài nguyên có trong manifest, `kind` = "ban-do", file có thật; bản đồ chạm vùng Biển Đông (`vung_bien_dong`)
  phải có `chu_quyen_da_kiem: true` (luật chủ quyền, .claude/rules/chinh-xac-va-ban-quyen.md mục 6). Không đạt: mã 1.
- Bỏ mọi chấm địa danh vẽ sẵn (`<circle>`) để canh.js tự đặt chấm + nhãn đúng `chu_tren_do_vat`
  (ẩn được các mốc không có trong lời, vd Yakutsk). `--giu-cham` để giữ lại.
- `--khung x y w h`: cắt/phóng bằng viewBox (vẫn là vector, nét không vỡ khi camera zoom). Mặc định cả khung 1920×1080.
- Ghi `<đoạn>/ban-do/<map-id>[-hau-to].svg`; in toạ độ các mốc của manifest đổi sang hệ toạ độ ảnh mới
  (0..w_anh theo bề ngang 1920 của ảnh khi đặt ở cỡ 1920×1080) để canh.js đặt chấm.
"""
import argparse
import json
import re
import sys
from pathlib import Path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("du_an")
    ap.add_argument("doan")
    ap.add_argument("map_id")
    ap.add_argument("--khung", nargs=4, type=float, metavar=("X", "Y", "W", "H"))
    ap.add_argument("--ten", default="")
    ap.add_argument("--giu-cham", action="store_true")
    a = ap.parse_args()

    du_an = Path(a.du_an)
    man = json.loads((du_an / "assets" / "manifest.json").read_text(encoding="utf-8"))
    tai = man.get("assets", man)
    m = tai.get(a.map_id)
    if not m:
        print(f"LỖI: {a.map_id} không có trong assets/manifest.json")
        return 1
    if m.get("kind") != "ban-do":
        print(f"LỖI: {a.map_id} không phải bản đồ vẽ bằng code (kind={m.get('kind')})")
        return 1
    if m.get("vung_bien_dong") and m.get("chu_quyen_da_kiem") is not True:
        print(f"LỖI: {a.map_id} chạm vùng Biển Đông mà chưa có chu_quyen_da_kiem: true")
        return 1
    src = du_an / m["file"]
    if not src.exists():
        print(f"LỖI: thiếu file {src}")
        return 1
    svg = src.read_text(encoding="utf-8")
    if not a.giu_cham:
        svg = re.sub(r"<circle\b[^>]*/>\s*", "", svg)
    svg = re.sub(r"<text\b.*?</text>\s*", "", svg, flags=re.S)
    x, y, w, h = a.khung if a.khung else (0, 0, 1920, 1080)
    if a.khung:
        svg = re.sub(r'viewBox="[^"]*"', f'viewBox="{x:g} {y:g} {w:g} {h:g}" preserveAspectRatio="xMidYMid slice"', svg, count=1)
    ra = du_an / "hoat-hinh" / f"doan-{a.doan}" / "ban-do"
    ra.mkdir(parents=True, exist_ok=True)
    ten = a.map_id + (f"-{a.ten}" if a.ten else "")
    (ra / f"{ten}.svg").write_text(svg, encoding="utf-8")
    k = 1920.0 / w
    print(f"ghi {ra / (ten + '.svg')}  (khung {x:g} {y:g} {w:g} {h:g}, phóng {k:.3g}×)")
    for mk in m.get("marks", []):
        print(f"  mốc {mk['label']}: ({(mk['x'] - x) * k:.1f}, {(mk['y'] - y) * k:.1f}) trên ảnh 1920×1080")
    return 0


if __name__ == "__main__":
    sys.exit(main())
