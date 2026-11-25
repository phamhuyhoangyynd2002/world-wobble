#!/usr/bin/env python3
"""Chuẩn bị thư mục một đoạn hoạt hình theo templates/hoat-hinh/HOP-DONG.md.

Cách dùng:
  python chuan_bi_doan.py <thư mục dự án> <id đoạn | --tat-ca> [--khung-moi]

Làm gì:
- Đọc <dự án>/hoat-hinh/phan-canh.json, lấy đoạn theo id (hoặc mọi đoạn).
- Chép templates/hoat-hinh/_chung/ → doan-<id>/_chung/ và templates/hoat-hinh/<phong_cach>/lib/ → doan-<id>/lib/
  (ghi đè mỗi lần: thư viện sửa ở templates/, không sửa trong đoạn).
- Chép khung templates/hoat-hinh/<phong_cach>/khung/ (index.html, …) nếu đoạn chưa có, hoặc khi --khung-moi.
  Không bao giờ ghi đè canh.js, sfx.json đã có.
- Ghi data-duration của root trong index.html đúng độ dài đoạn.
- Ghi khung xuất (phan-canh.json → `xuat`, xem khung_xuat.py) vào index.html: data-width/data-height của root,
  viewport, và khối <style id="hh-xuat">. Khung 2560×1440: sân khấu giữ hệ thiết kế 1920×1080, phóng bằng CSS
  transform scale(4/3) nên mọi canh.js cũ không phải sửa toạ độ; lib canvas/WebGL đọc HH_DATA.xuat.ti_le để vẽ
  bộ đệm ở độ phân giải cao. Không có `xuat` → 1920×1080 như tập 1–3 (khối hh-xuat bị gỡ).
- Sinh du-lieu.js (window.HH_DATA) với mọi mốc đổi sang giây tính từ đầu đoạn: nhịp, lời (từng từ), khẩu hình.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from khung_xuat import THIET_KE, doc_xuat  # noqa: E402

REPO = Path(__file__).resolve().parents[4]
TPL = REPO / "templates" / "hoat-hinh"
PHONG_CACH = {"cat-giay", "ve-tay", "diorama"}


def load_json(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))


def copy_tree(src: Path, dst: Path, overwrite: bool, keep: set[str] = frozenset()):
    for f in src.rglob("*"):
        if f.is_dir():
            continue
        rel = f.relative_to(src)
        out = dst / rel
        if out.exists() and (not overwrite or rel.as_posix() in keep):
            continue
        out.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(f, out)


def voice_for_segment(project: Path, pc: dict, seg: dict) -> list[dict]:
    subs_p = project / "audio" / "subtitles.json"
    subs = {s["id"]: s for s in load_json(subs_p)["scenes"]} if subs_p.exists() else {}
    a, b = seg["bat_dau"], seg["ket_thuc"]
    out = []
    for v in pc.get("loi", []):
        sc = subs.get(v["scene"])
        if not sc:
            print(f"CẢNH BÁO: không có scene {v['scene']} trong audio/subtitles.json", file=sys.stderr)
            continue
        start = float(v["bat_dau"])
        dur = float(sc.get("duration") or 0)
        if start + dur <= a or start >= b:
            continue
        off = start - a
        words = [{"text": w["text"], "start": round(w["start"] + off, 3), "end": round(w["end"] + off, 3)}
                 for w in sc.get("words", [])]
        kh_p = project / "khau-hinh" / f"scene-{v['scene']}.json"
        mouth = []
        if kh_p.exists():
            mouth = [{"start": round(c["start"] + off, 3), "end": round(c["end"] + off, 3), "value": c["value"]}
                     for c in load_json(kh_p).get("mouthCues", [])]
        out.append({"scene": v["scene"], "bat_dau": round(off, 3), "thoi_luong": dur, "tu": words, "khau_hinh": mouth})
    return out


def ghi_khung_xuat(html: str, xw: int, xh: int) -> str:
    """Ghi khung xuất vào index.html của đoạn (chạy lại nhiều lần vẫn ra cùng kết quả)."""
    tw, th = THIET_KE
    html, n = re.subn(r'(<div[^>]*id="root"[^>]*?)\s*data-width="[^"]*"\s*data-height="[^"]*"',
                      lambda m: f'{m.group(1)} data-width="{xw}" data-height="{xh}"', html, count=1)
    if n == 0:
        sys.exit("LỖI: root trong index.html thiếu data-width/data-height (khung phong cách sai hợp đồng)")
    html = re.sub(r'<meta name="viewport" content="[^"]*"\s*/?>',
                  f'<meta name="viewport" content="width={xw}, height={xh}" />', html, count=1)
    # html, body của khung = khung xuất (lint root_dimensions_mismatch; body overflow:hidden không được cắt sân khấu đã phóng)
    html, n = re.subn(r'(html,\s*body\s*\{[^}]*?width:\s*)\d+px([^}]*?height:\s*)\d+px',
                      lambda m: f"{m.group(1)}{xw}px{m.group(2)}{xh}px", html, count=1)
    if n == 0:
        print("CẢNH BÁO: khung không có 'html, body { width; height }' để ghi khung xuất", file=sys.stderr)
    # khối hh-xuat chèn ngay trước </head> và gỡ đúng phần đã chèn, nên chạy lại / đổi qua lại không dồn dòng trống
    html = re.sub(r'  <style id="hh-xuat">.*?</style>\n  (?=</head>)', "", html, flags=re.S)
    if (xw, xh) != (tw, th):
        k = xw / tw
        khoi = (
            '  <style id="hh-xuat">\n'
            f'      /* chuan_bi_doan.py ghi, KHÔNG sửa tay: khung xuất {xw}×{xh}. Sân khấu giữ hệ thiết kế {tw}×{th}, '
            f'phóng ×{k:.10g} bằng transform (Chrome vẽ lại vector, chữ ở độ phân giải cao). */\n'
            f'      #root {{ width: {tw}px !important; height: {th}px !important; transform: scale({k:.10g}); transform-origin: 0 0; }}\n'
            '    </style>\n  ')
        html = html.replace("</head>", khoi + "</head>", 1)
    return html


def prepare(project: Path, pc: dict, seg: dict, khung_moi: bool):
    style = seg["phong_cach"]
    if style not in PHONG_CACH:
        sys.exit(f"LỖI: đoạn {seg['id']} có phong_cach '{style}' không hợp lệ ({', '.join(sorted(PHONG_CACH))})")
    style_dir = TPL / style
    if not (style_dir / "lib").exists() or not (style_dir / "khung").exists():
        sys.exit(f"LỖI: thiếu {style_dir}/lib hoặc {style_dir}/khung")
    d = project / "hoat-hinh" / f"doan-{seg['id']}"
    d.mkdir(parents=True, exist_ok=True)
    copy_tree(TPL / "_chung", d / "_chung", overwrite=True)
    if (d / "lib").exists():
        shutil.rmtree(d / "lib")
    copy_tree(style_dir / "lib", d / "lib", overwrite=True)
    copy_tree(style_dir / "khung", d, overwrite=khung_moi, keep={"canh.js", "sfx.json"})

    dur = round(float(seg["ket_thuc"]) - float(seg["bat_dau"]), 3)
    idx = d / "index.html"
    html = idx.read_text(encoding="utf-8")
    html, n = re.subn(r'(<div[^>]*id="root"[^>]*data-duration=")[^"]*(")', lambda m: f"{m.group(1)}{dur:g}{m.group(2)}", html, count=1)
    if n == 0:
        sys.exit(f"LỖI: {idx} không có root data-duration (khung phong cách sai hợp đồng)")
    # Lớp .clip có data-start mà thiếu data-duration thì HyperFrames cảnh báo timeline_element_missing_timing:
    # ghi luôn độ dài đoạn. Chỗ nào trong khung ghi {{THOI_LUONG}} cũng thay bằng độ dài đoạn.
    def _clip(m):
        tag = m.group(0)
        if "data-duration" in tag or "data-start" not in tag:
            return tag
        return tag[:-1] + f' data-duration="{dur:g}">'
    html = re.sub(r'<[a-z]+[^>]*class="[^"]*\bclip\b[^"]*"[^>]*>', _clip, html)
    html = html.replace("{{THOI_LUONG}}", f"{dur:g}")
    xw, xh = doc_xuat(pc)
    html = ghi_khung_xuat(html, xw, xh)
    idx.write_text(html, encoding="utf-8")

    a = float(seg["bat_dau"])
    nhip = []
    for nh in seg.get("nhip", []):
        x = dict(nh)
        x["tai"] = round(float(nh["tai"]) - a, 3)
        nhip.append(x)
    data = {
        "id": seg["id"], "phong_cach": style,
        "fps": pc.get("fps", 30), "rong": THIET_KE[0], "cao": THIET_KE[1],   # hệ toạ độ thiết kế (canh.js vẽ theo hệ này)
        "xuat": {"rong": xw, "cao": xh, "ti_le": round(xw / THIET_KE[0], 10)},  # khung MP4 thật; lib canvas/WebGL nhân bộ đệm
        "thoi_luong": dur, "bat_dau_tuyet_doi": a,
        "lop": seg.get("lop"), "boi_canh": seg.get("boi_canh"), "trang_phuc": seg.get("trang_phuc"),
        "vao": seg.get("vao", "cat"), "ra": seg.get("ra", "cat"),
        "chu_tren_do_vat": seg.get("chu_tren_do_vat", []),
        "nhip": nhip,
        "loi": voice_for_segment(project, pc, seg),
    }
    (d / "du-lieu.js").write_text(
        "/* Sinh bởi chuan_bi_doan.py – KHÔNG sửa tay. Mốc tính từ đầu đoạn. */\nwindow.HH_DATA = "
        + json.dumps(data, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    print(f"- doan-{seg['id']} [{style}] {seg['bat_dau']}–{seg['ket_thuc']} s ({dur} s), {len(data['loi'])} lời, {len(nhip)} nhịp, "
          f"xuất {xw}×{xh} → {d}")
    if not (d / "canh.js").exists():
        print(f"  (doan-{seg['id']} chưa có canh.js: agent phong cách {style} sẽ viết)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("doan", help="id đoạn, hoặc --tat-ca", nargs="?")
    ap.add_argument("--tat-ca", action="store_true")
    ap.add_argument("--khung-moi", action="store_true", help="chép lại khung (trừ canh.js, sfx.json)")
    args = ap.parse_args()
    project = Path(args.project).resolve()
    pc = load_json(project / "hoat-hinh" / "phan-canh.json")
    segs = pc["doan"]
    # kiểm các đoạn nối liền
    for s1, s2 in zip(segs, segs[1:]):
        if abs(float(s1["ket_thuc"]) - float(s2["bat_dau"])) > 1e-6:
            sys.exit(f"LỖI: đoạn {s1['id']} kết thúc {s1['ket_thuc']} nhưng {s2['id']} bắt đầu {s2['bat_dau']}")
    if segs and float(segs[0]["bat_dau"]) != 0:
        sys.exit("LỖI: đoạn đầu phải bắt đầu ở 0")
    if segs and abs(float(segs[-1]["ket_thuc"]) - float(pc["thoi_luong"])) > 1e-6:
        sys.exit("LỖI: đoạn cuối phải kết thúc ở thoi_luong")
    if (pc.get("rong", THIET_KE[0]), pc.get("cao", THIET_KE[1])) != THIET_KE:
        sys.exit(f"LỖI: rong/cao trong phan-canh.json là hệ toạ độ thiết kế, phải là {THIET_KE[0]}×{THIET_KE[1]}; "
                 "khung xuất ghi ở \"xuat\": {\"w\": 2560, \"h\": 1440}")
    try:
        xw, xh = doc_xuat(pc)
    except ValueError as e:
        sys.exit(f"LỖI: phan-canh.json → {e}")
    if "xuat" not in pc:
        print(f"CẢNH BÁO: phan-canh.json không có \"xuat\" → dựng {xw}×{xh} (chế độ tập 1–3). "
              "Tập 4 trở đi ghi \"xuat\": {\"w\": 2560, \"h\": 1440}.", file=sys.stderr)
    chosen = segs if args.tat_ca or args.doan in (None, "--tat-ca") else [s for s in segs if s["id"] == args.doan]
    if not chosen:
        sys.exit(f"LỖI: không có đoạn '{args.doan}'")
    for seg in chosen:
        prepare(project, pc, seg, args.khung_moi)


if __name__ == "__main__":
    main()
