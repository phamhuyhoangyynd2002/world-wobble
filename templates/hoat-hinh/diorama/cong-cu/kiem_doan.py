#!/usr/bin/env python3
"""Kiểm một đoạn diorama bằng Chrome headless (không render): sinh sfx.json + đo cỡ chữ trên đồ vật.

Cách dùng:
  python templates/hoat-hinh/diorama/cong-cu/kiem_doan.py <thư mục doan-xx> [--do-chu 8.5,9,9.4] [--khong-ghi-sfx]

Làm gì:
- Mở <doan>/index.html bằng Chrome headless (--dump-dom), để lib dựng đoạn như khi render.
- Đọc <script id="sfx-out"> (api.sfx(...) trong canh.js) → kiểm tên có trong sfx/ và sfx/GIAY-PHEP.md (cột Thương mại = có)
  → ghi <doan>/sfx.json theo HOP-DONG mục 6: [{"ten", "tai", "am_luong"}].
- --do-chu: tua tới từng mốc, đo cỡ chữ hiển thị (px trên khung 1920×1080) của mọi chữ trên đồ vật; báo chữ < 40 px đang trong khung.
Chrome: biến môi trường CHROME, hoặc đường dẫn cài đặt chuẩn trên Windows/macOS/Linux.
"""
from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
SFX_DIR = REPO / "sfx"


def find_chrome() -> str:
    cands = [os.environ.get("CHROME", ""),
             r"C:\Program Files\Google\Chrome\Application\chrome.exe",
             r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
             "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
             shutil.which("google-chrome") or "", shutil.which("chromium") or "", shutil.which("chrome") or ""]
    for c in cands:
        if c and Path(c).exists():
            return c
    sys.exit("LỖI: không tìm thấy Chrome (đặt biến CHROME)")


def licensed_sfx() -> set[str]:
    ok = set()
    reg = SFX_DIR / "GIAY-PHEP.md"
    for line in reg.read_text(encoding="utf-8").splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 4 and cells[0].endswith(".wav") and cells[3].lower() == "có":
            ok.add(cells[0][:-4])
    return ok


def dump(doan: Path, query: str) -> str:
    url = (doan / "index.html").resolve().as_uri() + query
    cmd = [find_chrome(), "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
           "--window-size=1920,1080", "--virtual-time-budget=8000", "--dump-dom", url]
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=180)
    if r.returncode != 0 or not r.stdout:
        sys.exit(f"LỖI Chrome: {r.stderr[-1500:]}")
    return r.stdout


def grab(dom: str, el_id: str, tag: str) -> str | None:
    m = re.search(rf'<{tag}[^>]*id="{el_id}"[^>]*>(.*?)</{tag}>', dom, re.S)
    return html.unescape(m.group(1)) if m else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("doan")
    ap.add_argument("--do-chu", default="")
    ap.add_argument("--khong-ghi-sfx", action="store_true")
    a = ap.parse_args()
    doan = Path(a.doan).resolve()
    q = f"?do-chu={a.do_chu}" if a.do_chu else ""
    dom = dump(doan, q)

    raw = grab(dom, "sfx-out", "script")
    sfx = json.loads(raw) if raw and raw.strip() else []
    lic = licensed_sfx()
    bad = [s for s in sfx if s["ten"] not in lic or not (SFX_DIR / f"{s['ten']}.wav").exists()]
    for s in bad:
        print(f"LỖI: sfx '{s['ten']}' không có trong sfx/ hoặc sổ GIAY-PHEP.md (bỏ)")
    sfx = sorted([s for s in sfx if s not in bad], key=lambda s: s["tai"])
    print(f"sfx: {len(sfx)} mốc ({', '.join(sorted({s['ten'] for s in sfx}))})")
    if not a.khong_ghi_sfx:
        (doan / "sfx.json").write_text(json.dumps(sfx, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        print(f"→ {doan / 'sfx.json'}")

    if a.do_chu:
        raw = grab(dom, "do-chu-out", "pre")
        rows = json.loads(raw) if raw and raw.strip() else []
        if not rows:
            print("(không có chữ trên đồ vật hoặc đo thất bại)")
        nho = 0
        for r in rows:
            flag = ""
            if r["trong_khung"] and r["px"] < 40:
                flag, nho = "  << DƯỚI 40px", nho + 1
            print(f"t={r['t']:>6}  {r['chu']:<14} {r['px']:>6.1f}px  {'trong khung' if r['trong_khung'] else 'ngoài/ẩn':<11} x={r['x']} y={r['y']} w={r['w']} h={r['h']}{flag}")
        if nho:
            print(f"CẢNH BÁO: {nho} lần chữ trong khung nhỏ hơn 40px")
    if bad:
        sys.exit(1)


if __name__ == "__main__":
    main()
