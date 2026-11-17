#!/usr/bin/env python3
"""Dựng index.html cho thử nghiệm T2 (cảnh 1 bản thử 60s: bàn kỷ vật, con cá).

Lấy thân + ba lô của Wob từ templates/_shared/wob/hao-hung.svg (không vẽ lại Wob),
mốc khẩu hình và mốc từ của cảnh 1, quỹ đạo cá do Matter.js tính trước (vat-ly-ca.json).
Tay, chân, mắt, mí, miệng của Wob do canh.js vẽ theo thời gian t.

Chạy:  python build.py
"""
import json
import os
import re
import shutil

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", "..", "..", ".."))
CHUNG = os.path.join(HERE, "..", "..", "ban-thu-60s", "chung")

svg = open(os.path.join(ROOT, "templates", "_shared", "wob", "hao-hung.svg"), encoding="utf-8").read()


def group(gid):
    m = re.search(r'<g id="%s">(.*?)</g>\n' % gid, svg, re.S)
    if not m:
        raise SystemExit("không thấy nhóm " + gid)
    return m.group(1)


data = {
    "wob": {"than": group("than"), "ba_lo": group("ba-lo")},
    "vat_ly": json.load(open(os.path.join(HERE, "vat-ly-ca.json"), encoding="utf-8")),
    "khau_hinh": json.load(open(os.path.join(CHUNG, "khau-hinh", "scene-1.json"), encoding="utf-8"))["mouthCues"],
    "tu": json.load(open(os.path.join(CHUNG, "audio", "subtitles.json"), encoding="utf-8"))["scenes"][0]["words"],
}

# vendor + font (chép vào thư mục thử để HyperFrames phục vụ cục bộ)
os.makedirs(os.path.join(HERE, "_shared", "vendor"), exist_ok=True)
os.makedirs(os.path.join(HERE, "_shared", "fonts"), exist_ok=True)
shutil.copy(os.path.join(ROOT, "templates", "_shared", "vendor", "gsap.min.js"), os.path.join(HERE, "_shared", "vendor"))
shutil.copy(os.path.join(ROOT, "templates", "_shared", "fonts", "Fraunces-Variable.ttf"), os.path.join(HERE, "_shared", "fonts"))

tpl = open(os.path.join(HERE, "khung.tpl"), encoding="utf-8").read()
out = tpl.replace("/*DATA*/", json.dumps(data, ensure_ascii=False))
open(os.path.join(HERE, "index.html"), "w", encoding="utf-8").write(out)
print("index.html", len(out), "byte")
