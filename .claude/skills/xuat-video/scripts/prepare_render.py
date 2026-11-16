#!/usr/bin/env python3
"""Chuẩn bị thư mục render/ cho HyperFrames: chép template + tài nguyên, chèn dữ liệu vào index.html.

Cách dùng: python3 prepare_render.py <thư mục dự án> [--template explainer]

Chép từ GameReel (15/11/2026), đổi thẻ dữ liệu thành ww-data.

Template phải có thẻ: <script id="ww-data" type="application/json"></script>
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from pathlib import Path

DATA_TAG = re.compile(r'(<script id="ww-data" type="application/json">)(.*?)(</script>)', re.S)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--template", help="ghi đè template trong script.json")
    args = ap.parse_args()

    project = Path(args.project).resolve()
    root = project.parent.parent
    script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    timeline = json.loads((project / "timeline.json").read_text(encoding="utf-8"))
    template = args.template or script["template"]

    tpl_dir = root / "templates" / template
    if not (tpl_dir / "index.html").exists():
        print(f"LỖI: chưa có templates/{template}/index.html. Chạy /tao-template {template} trước.")
        return 1

    render = project / "render"
    if render.exists():
        shutil.rmtree(render)
    shutil.copytree(tpl_dir, render)
    shared = root / "templates" / "_shared"
    if shared.exists():
        shutil.copytree(shared, render / "_shared")
        # HyperFrames đọc hệ thiết kế từ frame.md ở gốc project
        if (shared / "frame.md").exists() and not (render / "frame.md").exists():
            shutil.copy2(shared / "frame.md", render / "frame.md")
    for sub in ("assets", "audio"):
        if (project / sub).exists():
            shutil.copytree(project / sub, render / sub,
                            ignore=shutil.ignore_patterns("subtitles.json", "nghe-lai.json", "*.prompt.txt"))

    # Nhạc nền không đưa vào composition: mix_audio.py trộn sau khi render.
    timeline = {**timeline, "music": None}

    # biểu cảm Wob đã vẽ (templates/_shared/wob/<bieu_cam>.svg): ww.js chỉ dựng những biểu cảm có file
    wob_dir = root / "templates" / "_shared" / "wob"
    wob_files = sorted(p.stem for p in wob_dir.glob("*.svg")) if wob_dir.exists() else []
    # SVG nhúng thẳng vào trang để ww.js cử động từng bộ phận (16/11/2026). Mọi id gắn tiền tố "<bieu_cam>-" vì 6 file
    # dùng chung tên id (wob-clip…): nhúng cùng trang mà trùng id thì url(#…) trỏ nhầm.
    wob_svgs = {}
    for f in sorted(wob_dir.glob("*.svg")) if wob_dir.exists() else []:
        svg = f.read_text(encoding="utf-8")
        svg = re.sub(r"<\?xml[^>]*>\s*", "", svg)
        ids = set(re.findall(r'id="([^"]+)"', svg))
        for i in sorted(ids, key=len, reverse=True):
            svg = svg.replace(f'id="{i}"', f'id="{f.stem}-{i}"').replace(f"url(#{i})", f"url(#{f.stem}-{i})")
            svg = svg.replace(f'href="#{i}"', f'href="#{f.stem}-{i}"')
        wob_svgs[f.stem] = svg
    data = {"script": script, "timeline": timeline, "wob_files": wob_files, "wob_svgs": wob_svgs}
    payload = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    index = render / "index.html"
    html = index.read_text(encoding="utf-8")
    if not DATA_TAG.search(html):
        print('LỖI: index.html thiếu <script id="ww-data" type="application/json"></script>')
        return 1
    html = DATA_TAG.sub(lambda m: m.group(1) + payload + m.group(3), html, count=1)

    # Renderer HyperFrames đọc độ dài và <audio> từ HTML tĩnh (thuộc tính gán bằng JS lúc chạy bị bỏ qua):
    # ghi data-duration của root theo timeline và chèn sẵn <audio> giọng đọc từng cảnh.
    root_tag = re.compile(r'(<div id="root"[^>]*?data-duration=")[^"]*(")')
    if not root_tag.search(html):
        print('LỖI: index.html thiếu <div id="root" ... data-duration="...">')
        return 1
    html = root_tag.sub(lambda m: m.group(1) + f"{timeline['duration']:g}" + m.group(2), html, count=1)
    audios = []
    for s in timeline.get("scenes", []):
        v = s.get("voice") or {}
        if v.get("src"):
            track = 30 + (int(s["id"]) % 2)
            audios.append(
                f'<audio id="vo-{s["id"]}" src="{v["src"]}" preload="auto" data-start="{round(v["start"], 3):g}" '
                f'data-duration="{round(v["duration"], 3):g}" data-track-index="{track}"></audio>'
            )
    if audios:
        html = re.sub(r'(<div id="root"[^>]*>)', lambda m: m.group(1) + "\n      " + "\n      ".join(audios) + "\n    ", html, count=1)
    index.write_text(html, encoding="utf-8")
    print(f"Xong: {render} ({timeline['width']}x{timeline['height']}, {timeline['duration']}s, template {template})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
