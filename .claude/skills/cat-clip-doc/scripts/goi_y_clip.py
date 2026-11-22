#!/usr/bin/env python3
"""Gợi ý các đoạn 30–60 giây trong video dài để cắt clip dọc 9:16 (Shorts, TikTok, Reels).

Chạy:  python .claude/skills/cat-clip-doc/scripts/goi_y_clip.py <dự án> [--so 5] [--min 30] [--max 58]
Đọc:   <dự án>/timeline.json  (captions có mốc từng câu, chapters, claims có mốc)
Ghi:   <dự án>/out/clip-doc/goi-y.json     mọi ứng viên đã chấm điểm
       <dự án>/out/clip-doc/ke-hoach.json  bản nháp N clip tốt nhất, không trùng nhau (không ghi đè nếu đã có)

Chấm điểm (mặc định ban đầu, chỉnh theo số liệu thật trong kenh/bai-hoc.md):
  +2 mỗi khẳng định (claims) nằm trong đoạn: có sự thật cụ thể, kiểm chứng rồi
  +1.5 câu đầu là câu hỏi hoặc câu ngắn ≤ 8 từ: mở nhanh
  +1 câu cuối ngắn ≤ 6 từ: thường là punchline
  −2 đoạn vắt qua hai chương; −3 đoạn trong chương cuối (lộ phán quyết, người xem khỏi xem bản dài)
  −1 đoạn bắt đầu trong 5 giây đầu video (mở đầu đã là hook của bản dài, Shorts nên khác)
"""
import argparse
import json
import os
import sys


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def chapter_at(chapters, t):
    for i, c in enumerate(chapters):
        if c["at"] <= t < c["end"]:
            return i
    return len(chapters) - 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("du_an")
    ap.add_argument("--so", type=int, default=5)
    ap.add_argument("--min", type=float, default=30)
    ap.add_argument("--max", type=float, default=58)
    a = ap.parse_args()

    tl = load(os.path.join(a.du_an, "timeline.json"))
    caps = tl.get("captions") or []
    chapters = tl.get("chapters") or [{"title": "", "at": 0, "end": tl["duration"]}]
    claims = tl.get("claims") or []
    if not caps:
        sys.exit("LỖI: timeline.json không có captions")

    cands = []
    for i in range(len(caps)):
        start = max(0.0, caps[i]["start"] - 0.15)
        for j in range(i, len(caps)):
            end = caps[j]["end"] + 0.35
            dur = end - start
            if dur > a.max:
                break
            if dur < a.min:
                continue
            last = caps[j]["text"].strip()
            if not last.endswith((".", "!", "?")):
                continue
            first = caps[i]["text"].strip()
            score, why = 0.0, []
            cl = [c["id"] for c in claims if start <= c["at"] <= end]
            if cl:
                score += 2 * len(cl)
                why.append("%d khẳng định" % len(cl))
            if first.endswith("?") or len(first.split()) <= 8:
                score += 1.5
                why.append("mở nhanh")
            if len(last.split()) <= 6:
                score += 1
                why.append("kết bằng câu ngắn")
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
                "text": " ".join(c["text"] for c in caps[i:j + 1]),
            })

    cands.sort(key=lambda c: -c["score"])
    chosen = []
    for c in cands:
        if all(c["end"] <= k["start"] or c["start"] >= k["end"] for k in chosen):
            chosen.append(c)
        if len(chosen) >= a.so:
            break
    chosen.sort(key=lambda c: c["start"])

    out = os.path.join(a.du_an, "out", "clip-doc")
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, "goi-y.json"), "w", encoding="utf-8") as f:
        json.dump({"so_ung_vien": len(cands), "chon": chosen, "tat_ca": cands[:60]}, f, ensure_ascii=False, indent=1)

    kh = os.path.join(out, "ke-hoach.json")
    if os.path.exists(kh):
        print("giữ nguyên", kh, "(đã có; xoá đi nếu muốn sinh lại)")
    else:
        plan = {
            "_ghi_chu": "Sửa tieu_de (câu mồi ≤ 7 từ, lấy ý từ lời đọc của đoạn), wob (tên biểu cảm trong templates/_shared/wob/), "
                        "crop_x (0 = trái, 0.5 = giữa, 1 = phải; vùng cắt 4:3) hoặc toan_canh: true (giữ cả khung 16:9). "
                        "Không thêm sự thật mới vào tieu_de.",
            "nguon": "out/video.mp4",
            "handle": "@WorldWobble",
            "clips": [
                {"id": "k%d" % (n + 1), "start": c["start"], "end": c["end"], "tieu_de": c["chapter"],
                 "wob": "hao-hung", "crop_x": 0.5, "toan_canh": False, "claims": c["claims"], "text": c["text"]}
                for n, c in enumerate(chosen)
            ],
        }
        with open(kh, "w", encoding="utf-8") as f:
            json.dump(plan, f, ensure_ascii=False, indent=1)
        print("ghi", kh)
    for c in chosen:
        print("%7.1f–%7.1f  %4.1fs  điểm %4.1f  [%s]  %s" % (c["start"], c["end"], c["duration"], c["score"], c["chapter"], c["text"][:90]))


if __name__ == "__main__":
    main()
