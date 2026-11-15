#!/usr/bin/env python3
"""Tìm và tải ảnh từ Wikimedia Commons, chỉ nhận giấy phép dùng thương mại được và cho phép chỉnh sửa.

Cách dùng:
  python3 commons.py <thư mục dự án> --search "Oymyakon winter" [--limit 12]
  python3 commons.py <thư mục dự án> --file "File:Ten_anh.jpg" --id commons-village [--scenes 3,4] [--width 2400]

Nhận: CC0, Public domain (PD-…), CC BY x.x, CC BY-SA x.x. Từ chối: mọi giấy phép có NC (phi thương mại),
ND (cấm chỉnh sửa: kênh có cắt, phóng, phủ chữ), GFDL đơn thuần, fair use, không rõ giấy phép
(.claude/rules/chinh-xac-va-ban-quyen.md, mục 3). Ghi tác giả, giấy phép, câu ghi công vào assets/manifest.json.
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import manifest  # noqa: E402

API = "https://commons.wikimedia.org/w/api.php"
UA = "WorldWobbleAssetFetcher/1.0 (asset licence checker)"
ALLOW = re.compile(r"^(cc0|cc[- ]?zero|public domain|pd\b|pd-|cc by(-sa)? \d|cc-by(-sa)?-\d)", re.I)
DENY = re.compile(r"\b(nc|nd)\b|non-?commercial|no ?deriv|fair use|non-free", re.I)


def get(params: dict) -> dict:
    url = API + "?" + urllib.parse.urlencode({**params, "format": "json", "formatversion": 2})
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())


def strip_html(text: str) -> str:
    return html.unescape(re.sub(r"<[^>]+>", "", text or "")).strip()


def licence_ok(meta: dict) -> tuple[bool, str]:
    short = strip_html((meta.get("LicenseShortName") or {}).get("value", ""))
    if not short:
        return False, "không rõ giấy phép"
    if DENY.search(short):
        return False, f"giấy phép '{short}' cấm thương mại hoặc cấm chỉnh sửa"
    if short.upper().startswith("GFDL") and "CC" not in short.upper():
        return False, f"chỉ có GFDL ('{short}'), phải kèm toàn văn giấy phép: không dùng"
    if not ALLOW.search(short):
        return False, f"giấy phép '{short}' không nằm trong danh sách được dùng"
    return True, short


def info(title: str, width: int) -> dict:
    data = get({"action": "query", "titles": title, "prop": "imageinfo",
                "iiprop": "url|extmetadata|size|mime", "iiurlwidth": width})
    pages = data.get("query", {}).get("pages", [])
    if not pages or pages[0].get("missing"):
        raise SystemExit(f"LỖI: không thấy '{title}' trên Commons")
    return pages[0]["imageinfo"][0]


def search(query: str, limit: int) -> int:
    data = get({"action": "query", "generator": "search", "gsrsearch": f"filetype:bitmap {query}",
                "gsrnamespace": 6, "gsrlimit": limit, "prop": "imageinfo", "iiprop": "extmetadata|size"})
    pages = sorted(data.get("query", {}).get("pages", []), key=lambda p: p.get("index", 0))
    for p in pages:
        ii = (p.get("imageinfo") or [{}])[0]
        ok, why = licence_ok(ii.get("extmetadata") or {})
        artist = strip_html((ii.get("extmetadata") or {}).get("Artist", {}).get("value", ""))[:40]
        print(f"{'OK ' if ok else 'BỎ'} {p['title']} · {ii.get('width')}×{ii.get('height')} · {why} · {artist}")
    print("Tải ảnh OK bằng --file \"File:...\" --id <id>. Mở ảnh xem trước khi dùng: không có người nhận ra mặt, không bản đồ sai chủ quyền.")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--search")
    ap.add_argument("--limit", type=int, default=12)
    ap.add_argument("--file")
    ap.add_argument("--id")
    ap.add_argument("--scenes")
    ap.add_argument("--width", type=int, default=2400, help="tải bản thu nhỏ rộng chừng này (Commons tự tạo)")
    args = ap.parse_args()
    project = Path(args.project)
    if args.search:
        return search(args.search, args.limit)
    if not (args.file and args.id):
        ap.error("cần --search, hoặc --file và --id")
    title = args.file if args.file.startswith("File:") else f"File:{args.file}"
    ii = info(title, args.width)
    meta = ii.get("extmetadata") or {}
    ok, why = licence_ok(meta)
    if not ok:
        print(f"TỪ CHỐI: {title}: {why}")
        return 1
    restrictions = strip_html(meta.get("Restrictions", {}).get("value", ""))
    url = ii.get("thumburl") or ii["url"]
    ext = Path(urllib.parse.urlparse(url).path).suffix.lower() or ".jpg"
    dest = project / "assets" / "commons" / f"{args.id}{ext}"
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r:
        dest.write_bytes(r.read())
    artist = strip_html(meta.get("Artist", {}).get("value", "")) or "unknown author"
    lic_url = strip_html(meta.get("LicenseUrl", {}).get("value", ""))
    page = ii.get("descriptionurl", f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(title)}")
    pd = bool(re.match(r"(?i)(cc0|public domain|pd)", why))
    attribution = f'"{title[5:]}" by {artist}, {why}{" (" + lic_url + ")" if lic_url else ""}, via Wikimedia Commons'
    manifest.put(project, args.id, {
        "file": dest.relative_to(project).as_posix(), "kind": "anh-commons",
        "basis": "public-domain" if pd else "giay-phep", "license": why, "license_url": lic_url,
        "author": artist, "source_url": page, "attribution": None if pd else attribution,
        "scenes": manifest.parse_scenes(args.scenes), "restrictions": restrictions or None,
    })
    print(f"Xong: {dest} · {why} · {artist}")
    if restrictions:
        print(f"CẢNH BÁO: ảnh có hạn chế thêm: {restrictions} (quyền nhân thân, nhãn hiệu…): đọc trang ảnh trước khi dùng")
    return 0


if __name__ == "__main__":
    sys.exit(main())
