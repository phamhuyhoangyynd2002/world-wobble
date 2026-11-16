#!/usr/bin/env python3
"""Kiểm tra căn cứ sử dụng của mọi tài nguyên và sinh hồ sơ ban-quyen.md (World Wobble).

Cách dùng:
  python3 kiem_tra_ban_quyen.py <thư mục dự án> [--som]

--som: kiểm sớm sau bước tài nguyên (đọc shots trong script.json, chưa cần timeline, giọng, render).
Không có --som: kiểm bản giao (đọc timeline.json, audio/subtitles.json), ghi ban-quyen.md và out/ghi-cong.txt.

CHẶN (mã thoát 1): tài nguyên không có trong manifest hoặc thiếu căn cứ; ảnh Commons NC/ND/không rõ giấy phép hoặc thiếu
ghi công; ảnh AI thiếu prompt/model hoặc prompt xin ảnh như ảnh chụp; bản đồ chạm vùng Biển Đông chưa kiểm chủ quyền;
nhạc, sfx, font không có trong sổ giấy phép; giọng đọc Edge TTS (trừ khi CHO_PHEP_EDGE=1 trong .env: hạ xuống CẢNH BÁO).
CẢNH BÁO: lời đọc trùng > 30% với tập khác; danh sách ảnh AI cần tự xem (không giống ảnh chụp, không tái hiện sự kiện
có thật mà chưa gắn nhãn).
Luật: .claude/rules/chinh-xac-va-ban-quyen.md.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from pathlib import Path

DENY = re.compile(r"\b(nc|nd)\b|non-?commercial|no ?deriv|fair use|non-free", re.I)
PHOTO = re.compile(r"\b(photo|photograph|photorealistic|realistic photo|dslr|hyperrealistic)\b", re.I)
BASES = {"ai-tao", "giay-phep", "public-domain", "tu-tao"}


def cho_phep_edge(root: Path) -> bool:
    """CHO_PHEP_EDGE=1 (biến môi trường hoặc .env ở gốc repo): tạm cho giao bản dùng Edge TTS khi kênh chưa kiếm tiền."""
    import os
    if os.environ.get("CHO_PHEP_EDGE") == "1":
        return True
    env = root / ".env"
    if env.is_file():
        for line in env.read_text(encoding="utf-8").splitlines():
            if line.strip().replace(" ", "") == "CHO_PHEP_EDGE=1":
                return True
    return False


AUDIO_EXT = {".mp3", ".wav", ".m4a", ".ogg", ".flac"}
FONT_EXT = {".ttf", ".otf", ".woff", ".woff2"}


def ledger(path: Path) -> dict[str, list[str]]:
    rows = {}
    if not path.exists():
        return rows
    for line in path.read_text(encoding="utf-8").splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 2 and cells[0] and not cells[0].startswith(("File", "---", "<!--")) and "." in cells[0]:
            rows[cells[0]] = cells
    return rows


def ngrams(text: str, n: int = 5) -> set[tuple]:
    w = re.findall(r"[a-z0-9']+", text.lower())
    return {tuple(w[i:i + n]) for i in range(len(w) - n + 1)}


def mmss(t: float) -> str:
    m, s = divmod(int(t), 60)
    return f"{m:02d}:{s:02d}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--som", action="store_true")
    args = ap.parse_args()
    project = Path(args.project).resolve()
    root = project.parent.parent
    script = json.loads((project / "script.json").read_text(encoding="utf-8"))
    mpath = project / "assets" / "manifest.json"
    assets = (json.loads(mpath.read_text(encoding="utf-8")).get("assets") or {}) if mpath.exists() else {}
    block: list[str] = []
    warn: list[str] = []

    # tài nguyên hình thật sự dùng, kèm mốc xuất hiện
    used: dict[str, list[str]] = {}
    timeline = None
    if not args.som:
        tl_path = project / "timeline.json"
        if not tl_path.exists():
            print("LỖI: chưa có timeline.json (dùng --som để kiểm sớm)")
            return 1
        timeline = json.loads(tl_path.read_text(encoding="utf-8"))
        for s in timeline["scenes"]:
            for sh in s.get("shots") or []:
                if str(sh.get("show", "")).startswith("asset:"):
                    used.setdefault(sh["show"][6:], []).append(f"{mmss(sh['at'])}–{mmss(sh['end'])}")
    else:
        for sc in script["scenes"]:
            for sh in sc.get("shots") or []:
                if str(sh.get("show", "")).startswith("asset:"):
                    used.setdefault(sh["show"][6:], []).append(f"cảnh {sc['id']}")
        for k, a in assets.items():
            if a.get("scenes") and k not in used:
                used[k] = [f"cảnh {x}" for x in a["scenes"]]

    rows, credits, ai_list = [], [], []
    for aid, when in used.items():
        a = assets.get(aid)
        if not a:
            block.append(f"'{aid}' được dùng nhưng không có trong assets/manifest.json")
            continue
        f = project / a.get("file", "")
        if not f.exists():
            block.append(f"'{aid}': không thấy file {a.get('file')}")
        basis, kind = a.get("basis"), a.get("kind")
        if basis not in BASES:
            block.append(f"'{aid}': căn cứ '{basis}' không hợp lệ ({sorted(BASES)})")
        if kind == "anh-commons":
            if not a.get("license") or DENY.search(a.get("license", "")):
                block.append(f"'{aid}': giấy phép Commons '{a.get('license')}' không được dùng (NC/ND/không rõ)")
            if basis == "giay-phep" and not a.get("attribution"):
                block.append(f"'{aid}': giấy phép yêu cầu ghi công nhưng manifest thiếu attribution")
        if kind == "anh-ai":
            if not a.get("prompt") or not a.get("model"):
                block.append(f"'{aid}': ảnh AI thiếu prompt hoặc model trong manifest")
            elif PHOTO.search(a["prompt"]) and "not a photograph" not in a["prompt"]:
                block.append(f"'{aid}': prompt xin ảnh như ảnh chụp")
            # ảnh tạo trên giao diện web (skill tao-anh-web): phải đã xem không có watermark và dùng tài khoản riêng
            if a.get("nguon") in ("chatgpt-web", "gemini-web"):
                if a.get("watermark_da_kiem") is not True:
                    block.append(f"'{aid}': ảnh {a['nguon']} chưa kiểm watermark (watermark_da_kiem: true sau khi xem)")
                if a.get("tai_khoan_rieng") is not True:
                    block.append(f"'{aid}': ảnh {a['nguon']} không ghi đã dùng tài khoản riêng (không phải tài khoản kênh)")
                warn.append(f"'{aid}': tạo trên {a['nguon']} (giao diện web, điều khiển bằng Browser MCP): điều khoản "
                            "của dịch vụ hạn chế truy cập tự động; người làm kênh đã chấp nhận rủi ro ngày 15/11/2026")
            ai_list.append(aid)
        if kind == "ban-do" and a.get("vung_bien_dong") and a.get("chu_quyen_da_kiem") is not True:
            block.append(f"'{aid}': bản đồ chạm vùng Biển Đông chưa kiểm chủ quyền (chu_quyen_da_kiem: true sau khi xem)")
        if a.get("tai_hien_su_kien"):
            warn.append(f"'{aid}': ảnh AI tái hiện sự kiện có thật: gắn nhãn AI trên hình ở cảnh này và trong mô tả "
                        "(Nghị định 142/2026); YouTube: gắn nhãn altered/synthetic nếu trông như thật")
        if a.get("restrictions"):
            warn.append(f"'{aid}': ảnh có hạn chế thêm trên Commons: {a['restrictions']}")
        if a.get("attribution"):
            credits.append(a["attribution"])
        rows.append(f"| {aid} | {kind} | {basis} | {a.get('license') or ''} | {a.get('author') or ''} | "
                    f"{a.get('source_url') or ''} | {', '.join(when)} |")

    # âm thanh, font, giọng (chỉ bản giao)
    audio_rows, font_rows, voice_line = [], [], ""
    if timeline is not None:
        music_l = ledger(root / "music" / "GIAY-PHEP.md")
        sfx_l = ledger(root / "sfx" / "GIAY-PHEP.md")
        items = []
        if timeline.get("music"):
            segs = timeline["music"].get("segments") or [{"src": timeline["music"]["src"]}]
            for seg in segs:
                items.append(("nhạc", Path(seg["src"]), music_l))
        for fx in timeline.get("sfx") or []:
            items.append(("sfx", Path(fx["src"]), sfx_l))
        seen = set()
        for kind, p, led in items:
            if p.name in seen:
                continue
            seen.add(p.name)
            row = led.get(p.name)
            if not row:
                block.append(f"{kind} '{p.name}' không có trong sổ giấy phép")
                continue
            if len(row) < 4 or row[3].lower() != "có":
                block.append(f"{kind} '{p.name}': cột Thương mại khác 'có'")
            if len(row) >= 5 and row[4] and row[4].lower() not in ("không", "-", "–"):
                credits.append(row[4].strip('"'))
            audio_rows.append(f"| {p.name} | {kind} | {row[1] if len(row) > 1 else ''} | {row[2] if len(row) > 2 else ''} | "
                              f"{row[5] if len(row) > 5 else ''} |")
        fonts_dir = root / "templates" / "_shared" / "fonts"
        font_l = ledger(fonts_dir / "GIAY-PHEP.md")
        for fp in sorted(fonts_dir.glob("*")):
            if fp.suffix.lower() not in FONT_EXT:
                continue
            row = font_l.get(fp.name)
            if not row:
                block.append(f"font '{fp.name}' không có trong templates/_shared/fonts/GIAY-PHEP.md")
                continue
            lic_file = fonts_dir / (row[3] if len(row) > 3 else "")
            if not lic_file.is_file():
                block.append(f"font '{fp.name}': thiếu file giấy phép '{row[3] if len(row) > 3 else '?'}'")
            font_rows.append(f"| {fp.name} | {row[2] if len(row) > 2 else ''} |")
        subs_p = project / "audio" / "subtitles.json"
        subs = json.loads(subs_p.read_text(encoding="utf-8")) if subs_p.exists() else {}
        provider = subs.get("provider")
        voice_line = f"{provider or '?'} · {subs.get('voice', '?')} · {subs.get('rate', '?')}"
        if provider == "edge":
            if cho_phep_edge(root):
                warn.append("giọng đọc Edge TTS (tạm cho phép, CHO_PHEP_EDGE=1): KHÔNG bật quảng cáo cho video này; "
                            "trước khi kiếm tiền phải lồng lại bằng Azure cùng tên giọng")
            else:
                block.append("giọng đọc tạo bằng Edge TTS (chỉ để nháp): tạo lại bằng --provider azure")
        elif not provider:
            warn.append("không xác định được dịch vụ giọng đọc (audio/subtitles.json)")

    # trùng lời đọc với các tập khác
    mine = ngrams(" ".join(s.get("narration", "") for s in script["scenes"]))
    for p in sorted(project.parent.glob("*/script.json")):
        if p.parent.resolve() == project or not mine:
            continue
        try:
            other = json.loads(p.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        theirs = ngrams(" ".join(s.get("narration", "") for s in other.get("scenes", [])))
        overlap = len(mine & theirs) / len(mine)
        if overlap > 0.30:
            warn.append(f"lời đọc trùng {overlap:.0%} cụm 5 từ với tập {p.parent.name} (ngưỡng 30%)")
    if ai_list:
        warn.append(f"tự xem các ảnh AI ({', '.join(ai_list)}): rõ là tranh vẽ, không có chữ, không bản đồ, không người "
                    "nhận ra được; cảnh nào tái hiện sự kiện có thật thì phải gắn nhãn AI (Nghị định 142/2026)")

    tag = "kiểm sớm" if args.som else "bản giao"
    for b in block:
        print(f"CHẶN: {b}")
    for w in warn:
        print(f"CẢNH BÁO: {w}")
    print(f"{'KHÔNG ĐẠT' if block else 'ĐẠT'} ({tag}): {len(used)} tài nguyên hình, {len(block)} chặn, {len(warn)} cảnh báo")
    if args.som:
        return 1 if block else 0

    md = [f"# Hồ sơ bản quyền: {script['title']}", "",
          f"- Ngày lập: {dt.date.today().isoformat()} · Kết luận: **{'CÒN MỤC CHẶN' if block else 'ĐẠT'}**",
          f"- Giọng đọc: {voice_line}", "- Giữ hồ sơ này ít nhất 12 tháng.", ""]
    if block:
        md += ["## CHẶN", *[f"- {b}" for b in block], ""]
    if warn:
        md += ["## Cảnh báo", *[f"- {w}" for w in warn], ""]
    md += ["## Tài nguyên hình", "", "| Id | Loại | Căn cứ | Giấy phép | Tác giả | Nguồn | Xuất hiện |",
           "|---|---|---|---|---|---|---|", *rows, "",
           "## Âm thanh", "", "| File | Loại | Nguồn | Giấy phép | Bằng chứng |", "|---|---|---|---|---|", *audio_rows, "",
           "## Font", "", "| File | Giấy phép |", "|---|---|", *font_rows, "",
           "## Ghi công đưa vào mô tả", "", *([f"- {c}" for c in dict.fromkeys(credits)] or ["- Không có"]), ""]
    (project / "ban-quyen.md").write_text("\n".join(md), encoding="utf-8")
    out = project / "out"
    out.mkdir(exist_ok=True)
    (out / "ghi-cong.txt").write_text("\n".join(dict.fromkeys(credits)) + ("\n" if credits else ""), encoding="utf-8")
    print(f"Ghi {project / 'ban-quyen.md'} và {out / 'ghi-cong.txt'}")
    return 1 if block else 0


if __name__ == "__main__":
    sys.exit(main())
