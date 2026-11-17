#!/usr/bin/env python3
"""Chia ảnh AI của một tập cho nguồn ngoài hoặc nội bộ theo hạng, ghi assets/ke-hoach-anh.json.

  python ke_hoach_anh.py <dự án> [--luot-ngoai N] [--khi-thieu cho|ha-hang]

- Đọc script.json → anh_ai (hạng chấm theo hang_anh.py) và assets/manifest.json (ảnh nào đã có).
- Nguồn ngoài: "gemini-api" khi .env có GEMINI_API_KEY + GEMINI_IMAGE_MODEL (agent chạy được), không thì "chatgpt-web"
  (skill tao-anh-web, chỉ phiên chính). Nguồn nội bộ: "comfyui-noi-bo" (tao_anh_noi_bo.py).
- --luot-ngoai N: số ảnh nguồn ngoài còn dùng được hôm nay. Không ghi thì coi như đủ cho mọi ảnh chính.
  * Ảnh chính nhiều hơn N: ảnh điểm thấp nhất bị "cho" (để mai) hoặc "ha-hang" (tạo nội bộ, báo lại) theo --khi-thieu.
  * Còn dư lượt: nâng ảnh phụ điểm cao nhất lên nguồn ngoài ("nang-hang"), để ảnh ngoài và nội bộ xen kẽ hợp lý.
Mã thoát: 0 ổn; 1 anh_ai sai (chạy validate_script.py để xem chi tiết); 2 còn ảnh chính phải chờ.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
sys.path.insert(0, str(HERE))
import manifest  # noqa: E402
from hang_anh import kiem_muc, tinh_hang  # noqa: E402
from tao_anh_ai import load_env  # noqa: E402


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--luot-ngoai", type=int)
    ap.add_argument("--khi-thieu", choices=["cho", "ha-hang"], default="cho")
    a = ap.parse_args()
    project = Path(a.project)
    script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    ds = script.get("anh_ai") or []
    if not ds:
        print("script.json chưa có anh_ai: không có ảnh AI nào cần tạo.")
        return 0
    loi = [f"{m.get('id')}: {e}" for m in ds for e in kiem_muc(m)]
    if loi:
        print("LỖI anh_ai:\n  " + "\n  ".join(loi))
        return 1
    load_env(ROOT)
    ngoai = "gemini-api" if os.environ.get("GEMINI_API_KEY") and os.environ.get("GEMINI_IMAGE_MODEL") else "chatgpt-web"
    co = manifest.load(project)["assets"]

    hang_cho, viec = [], []
    for m in ds:
        _, tong, _ = tinh_hang(m["diem"])
        r = {"id": m["id"], "hang": m["hang"], "diem": tong, "scenes": m.get("scenes", []), "canh": m.get("canh")}
        if m["id"] in co:
            r.update(trang_thai="da-co", nguon=co[m["id"]].get("nguon") or co[m["id"]].get("model"))
            viec.append(r)
        else:
            hang_cho.append(r)
    chinh = sorted([r for r in hang_cho if r["hang"] == "chinh"], key=lambda r: -r["diem"])
    phu = sorted([r for r in hang_cho if r["hang"] == "phu"], key=lambda r: -r["diem"])
    luot = len(chinh) if a.luot_ngoai is None else a.luot_ngoai
    for i, r in enumerate(chinh):
        if i < luot:
            r.update(trang_thai="tao", nguon=ngoai)
        elif a.khi_thieu == "ha-hang":
            r.update(trang_thai="ha-hang", nguon="comfyui-noi-bo")
        else:
            r.update(trang_thai="cho", nguon=ngoai)
    du = max(0, luot - len(chinh)) if a.luot_ngoai is not None else 0
    for i, r in enumerate(phu):
        if i < du:
            r.update(trang_thai="nang-hang", nguon=ngoai)
        else:
            r.update(trang_thai="tao", nguon="comfyui-noi-bo")
    viec += chinh + phu

    out = project / "assets" / "ke-hoach-anh.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({"nguon_ngoai": ngoai, "luot_ngoai": a.luot_ngoai, "khi_thieu": a.khi_thieu,
                               "anh": viec}, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Nguồn ngoài: {ngoai}" + ("" if a.luot_ngoai is None else f" · còn {a.luot_ngoai} lượt"))
    print(f"{'id':28} {'hạng':6} {'điểm':>4}  {'việc':10} nguồn")
    for r in viec:
        print(f"{r['id']:28} {r['hang']:6} {r['diem']:>4}  {r['trang_thai']:10} {r['nguon']}")
    lenh = {
        "gemini-api": "python .claude/skills/lay-tai-nguyen/scripts/tao_anh_ai.py {p} --id {i} --prompt \"<canh>\"",
        "chatgpt-web": "phiên chính: /tao-anh-web {p} --only {i}",
        "comfyui-noi-bo": "python .claude/skills/lay-tai-nguyen/scripts/tao_anh_noi_bo.py tao {p} --id {i}",
    }
    can = [r for r in viec if r["trang_thai"] in ("tao", "nang-hang", "ha-hang")]
    if can:
        print("\nLệnh (ảnh chính trước):")
        for r in can:
            extra = " --ha-hang" if r["trang_thai"] == "ha-hang" else ""
            print("  " + lenh[r["nguon"]].format(p=a.project, i=r["id"]) + extra)
    so = {k: sum(1 for r in viec if r["trang_thai"] == k) for k in ("da-co", "tao", "nang-hang", "ha-hang", "cho")}
    print(f"\nTổng {len(viec)} ảnh: " + ", ".join(f"{k} {v}" for k, v in so.items() if v) + f" · ghi {out}")
    if so["ha-hang"]:
        print("CẢNH BÁO: có ảnh chính tạo nội bộ (hạ hạng): xem kỹ, ghi nhat-ky.md, báo lại khi giao video.")
    return 2 if so["cho"] else 0


if __name__ == "__main__":
    sys.exit(main())
