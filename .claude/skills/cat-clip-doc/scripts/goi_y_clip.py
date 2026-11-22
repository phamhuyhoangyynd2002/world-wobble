#!/usr/bin/env python3
"""Gợi ý các đoạn 30–60 giây trong video dài để cắt clip dọc 9:16 (Shorts, TikTok, Reels).

Chạy:  python .claude/skills/cat-clip-doc/scripts/goi_y_clip.py <dự án> [--so 5] [--min 30] [--max 58]
Đọc:   <dự án>/timeline.json (captions có mốc từng từ, chapters, claims có mốc), <dự án>/out/video.mp4
Ghi:   <dự án>/out/clip-doc/goi-y.json     ứng viên đã chấm điểm, kèm chẩn đoán 5 giây đầu
       <dự án>/out/clip-doc/ke-hoach.json  bản nháp N clip tốt nhất (không ghi đè nếu đã có)

5 giây đầu quyết định clip sống hay chết, nên điểm câu mở nặng nhất:
  - câu mở có lỗi (từ nối, đại từ không có gì để chỉ, chỉ ngược về điều chưa kể, quá dài) → LOẠI hẳn;
  - khung hình đầu là giấy trống / chuyển cảnh (đo trên video) → LOẠI;
  - trong 5 giây đầu nói được < 8 từ (khoảng lặng dài) → LOẠI.
Phần thân: +1,5 mỗi khẳng định (tối đa 6), +1 câu cuối ngắn; −2 vắt hai chương; −3 chương cuối (lộ phán quyết);
−1 bắt đầu trong 5 giây đầu bản dài (mở đầu bản dài đã dùng làm hook, Shorts nên khác).
Còn gợi ý "teaser": câu đắt nhất trong đoạn (con số, punchline) để đặt lên đầu clip nếu câu mở chưa đủ mạnh.
"""
import argparse
import json
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mo_dau import danh_gia_cau_mo, SO_CHU  # noqa: E402
import re  # noqa: E402


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def chapter_at(chapters, t):
    for i, c in enumerate(chapters):
        if c["at"] <= t < c["end"]:
            return i
    return len(chapters) - 1


def words_in(caps, a, b):
    return [w for c in caps for w in c.get("words", []) if a <= w["start"] < b]


def khung_trong(video, t):
    """True nếu khung tại t gần như trống (giấy phẳng, màn đen, chuyển cảnh)."""
    try:
        raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", "%.2f" % t, "-i", video, "-frames:v", "1",
                              "-vf", "scale=96:54,format=gray", "-f", "rawvideo", "-"], capture_output=True, check=True).stdout
    except Exception:
        return False
    if not raw:
        return False
    px = list(raw)
    m = sum(px) / len(px)
    sd = (sum((p - m) ** 2 for p in px) / len(px)) ** 0.5
    return sd < 14


def teaser_cho(caps, a, b):
    """Câu ngắn đắt nhất trong đoạn (sau giây thứ 8): có số hoặc là punchline ≤ 6 từ."""
    best = None
    for c in caps:
        if c["start"] < a + 8 or c["end"] > b:
            continue
        txt = c["text"].strip()
        n = len(txt.split())
        # teaser phải là câu trọn vẹn, tự đứng được (cùng luật câu mở)
        if n < 3 or not txt[:1].isupper() or not txt.endswith((".", "!", "?")) or danh_gia_cau_mo(txt)[1]:
            continue
        sc = (3 if re.search(SO_CHU, txt.lower()) else 0) + (2 if n <= 6 else 0) - (0 if n <= 10 else 5)
        if sc > 0 and (best is None or sc > best[0]):
            best = (sc, c)
    if not best:
        return None
    c = best[1]
    return {"tu": round(c["start"] - 0.1, 2), "den": round(c["end"] + 0.25, 2), "cau": c["text"].strip()}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("du_an")
    ap.add_argument("--so", type=int, default=5)
    ap.add_argument("--min", type=float, default=30)
    ap.add_argument("--max", type=float, default=58)
    a = ap.parse_args()

    tl = load(os.path.join(a.du_an, "timeline.json"))
    video = os.path.join(a.du_an, "out", "video.mp4")
    caps = tl.get("captions") or []
    chapters = tl.get("chapters") or [{"title": "", "at": 0, "end": tl["duration"]}]
    claims = tl.get("claims") or []
    if not caps:
        sys.exit("LỖI: timeline.json không có captions")

    # câu mở của từng mốc bắt đầu (chấm một lần)
    mo = {}
    for i, c in enumerate(caps):
        ke = caps[i + 1]["text"] if i + 1 < len(caps) else ""
        mo[i] = danh_gia_cau_mo(c["text"], ke)

    cands, loai = [], {"cau_mo": 0, "it_tu": 0, "khung_trong": 0}
    for i in range(len(caps)):
        d_mo, loi_mo, uu_mo = mo[i]
        if loi_mo:
            loai["cau_mo"] += 1
            continue
        start = max(0.0, (caps[i]["words"][0]["start"] if caps[i].get("words") else caps[i]["start"]) - 0.08)
        n5 = len(words_in(caps, start, start + 5))
        if n5 < 8:
            loai["it_tu"] += 1
            continue
        for j in range(i, len(caps)):
            end = caps[j]["end"] + 0.35
            dur = end - start
            if dur > a.max:
                break
            if dur < a.min or not caps[j]["text"].strip().endswith((".", "!", "?")):
                continue
            last = caps[j]["text"].strip()
            score, why = 2.0 * d_mo, ["mở: " + ", ".join(uu_mo)]
            cl = [c["id"] for c in claims if start <= c["at"] <= end]
            if cl:
                score += min(6, 1.5 * len(cl))
                why.append("%d khẳng định" % len(cl))
            if len(last.split()) <= 6:
                score += 1
                why.append("kết câu ngắn")
            c0, c1 = chapter_at(chapters, start), chapter_at(chapters, end - 0.5)
            if c0 != c1:
                score -= 2
                why.append("vắt hai chương")
            if c0 == len(chapters) - 1:
                score -= 3
                why.append("chương cuối (lộ phán quyết)")
            if start < 5:
                score -= 1
                why.append("trùng mở đầu bản dài")
            cands.append({
                "start": round(start, 2), "end": round(end, 2), "duration": round(dur, 1),
                "chapter": chapters[c0]["title"], "claims": cl, "score": round(score, 2), "ly_do": why,
                "cau_mo": caps[i]["text"].strip(), "tu_trong_5s": n5,
                "teaser": teaser_cho(caps, start, end),
                "text": " ".join(c["text"] for c in caps[i:j + 1]),
            })

    cands.sort(key=lambda c: -c["score"])
    chosen = []
    for c in cands:
        if len(chosen) >= a.so:
            break
        if not all(c["end"] <= k["start"] or c["start"] >= k["end"] for k in chosen):
            continue
        if os.path.exists(video) and (khung_trong(video, c["start"] + 0.05) or khung_trong(video, c["start"] + 1.0)):
            loai["khung_trong"] += 1
            c["ly_do"].append("LOẠI: khung đầu trống")
            continue
        chosen.append(c)
    chosen.sort(key=lambda c: c["start"])

    out = os.path.join(a.du_an, "out", "clip-doc")
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, "goi-y.json"), "w", encoding="utf-8") as f:
        json.dump({"so_ung_vien": len(cands), "da_loai": loai, "chon": chosen, "tat_ca": cands[:60]}, f, ensure_ascii=False, indent=1)

    kh = os.path.join(out, "ke-hoach.json")
    if os.path.exists(kh):
        print("giữ nguyên", kh, "(đã có; xoá đi nếu muốn sinh lại)")
    else:
        plan = {
            "_ghi_chu": "Xem SKILL.md mục 2. tieu_de: câu mồi ≤ 7 từ, ý lấy từ lời của đoạn. teaser: null hoặc {tu, den} (giây tuyệt đối, "
                        "nằm trong đoạn) để đặt câu đắt nhất lên đầu clip. crop_x 0–1, toan_canh, giu_tren như SKILL.md.",
            "nguon": "out/video.mp4",
            "handle": "@WorldWobble",
            "clips": [
                {"id": "k%d" % (n + 1), "start": c["start"], "end": c["end"], "tieu_de": c["chapter"],
                 "wob": "hao-hung", "crop_x": 0.5, "toan_canh": False, "teaser": None, "goi_y_teaser": c["teaser"],
                 "cau_mo": c["cau_mo"], "claims": c["claims"], "text": c["text"]}
                for n, c in enumerate(chosen)
            ],
        }
        with open(kh, "w", encoding="utf-8") as f:
            json.dump(plan, f, ensure_ascii=False, indent=1)
        print("ghi", kh)
    print("đã loại: %(cau_mo)d mốc vì câu mở, %(it_tu)d vì nói ít trong 5s, %(khung_trong)d vì khung đầu trống" % loai)
    for c in chosen:
        print("%7.1f–%7.1f  %4.1fs  điểm %5.1f  mở: %-45s | %s" % (c["start"], c["end"], c["duration"], c["score"], c["cau_mo"][:45], "; ".join(c["ly_do"])))


if __name__ == "__main__":
    main()
