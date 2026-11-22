#!/usr/bin/env python3
"""Luật cho 5 giây đầu của clip dọc, dùng chung cho goi_y_clip.py, dung_clip_doc.py, kiem_5_giay.py.

Vì sao chặt: người xem Shorts/TikTok quyết định vuốt đi trong 1–3 giây đầu. Ba câu khán giả tự hỏi:
  (1) Tôi đang thấy gì?  (2) Sao tôi phải quan tâm?  (3) Sắp có gì?
Câu mở phải tự đứng được (người xem chưa nghe gì trước đó), có thứ cụ thể, và nói xong trong ~3 giây.
Các ngưỡng là mặc định ban đầu; chỉnh theo đường giữ chân thật trong kenh/bai-hoc.md.
"""
import re

# Mở bằng từ nối hoặc đại từ chỉ về điều chưa nói → người xem mới không hiểu
TU_NOI = {"so", "but", "and", "also", "then", "which", "because", "or", "plus", "still", "anyway", "well", "almost", "either"}
DAI_TU = {"it", "it's", "its", "they", "they're", "them", "he", "she", "that", "that's", "these", "those", "there's"}
# Cụm chỉ ngược về trước ở bất kỳ đâu trong câu đầu
CHI_NGUOC = [r"\bthat (village|town|place|day|night|sign|river|road|one|number|guess)\b", r"\bthe same\b",
             r"\bagain\b", r"\btoo\b\.?$", r"\bthe answer\b", r"\bmy (second|third|last|next) \w+", r"\bthe other\b",
             r"\bstill\b", r"\beither way\b", r"\bsame (station|town|village)\b",
             r"\b(with|of|for|at|like|in|past) (one|ones|it|them)[.?!]?$",
             r"\b(its|their|his|her) (half|share|part|turn|record|number)\b",
             r"\bthe (two|both|three) \w+", r"\bboth\b", r"\bthe (record|reading|station|village|town)\b(?! of| in| at)"]
# "one" không tính là số (hay là đại từ: "one look", "with one")
SO_CHU = r"\b(zero|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|minus)\b"
DONG_TU_HANH_DONG = r"\b(i|my)\b.*\b(froze|bought|walked|tapped|went|found|ate|drove|stepped|fell|lost|slept|tried|asked|dug|climbed|swam|took|grabbed|opened)\b"
TU_CAM = ["you won't believe", "insane", "shocking", "nobody talks about", "mind-blowing", "smash that like", "wait for it", "watch till the end"]


def danh_gia_cau_mo(cau, cau_ke=""):
    """Trả (điểm, lỗi[], ưu[]) cho câu mở. Lỗi nặng thì không dùng làm câu mở."""
    s = cau.strip()
    low = s.lower()
    words = re.findall(r"[a-z']+", low)
    loi, uu, diem = [], [], 0.0
    if not words:
        return -10, ["câu rỗng"], []
    w0 = words[0]
    if w0 in TU_NOI:
        loi.append("mở bằng từ nối '%s'" % w0)
        diem -= 5
    if w0 in DAI_TU and not re.match(r"^(it's|it is|they're) (minus|plus|\w+ degrees)", low):
        loi.append("mở bằng đại từ '%s' chưa có gì để chỉ" % w0)
        diem -= 5
    for pat in CHI_NGUOC:
        if re.search(pat, low):
            loi.append("chỉ ngược về điều chưa kể (%s)" % re.search(pat, low).group(0))
            diem -= 3
            break
    if w0 == "this" and not re.match(r"^this is (a|an|my|the)\b", low):
        loi.append("'This…' không chỉ vào vật đang thấy")
        diem -= 2
    for t in TU_CAM:
        if t in low:
            loi.append("từ cấm '%s'" % t)
            diem -= 10
    if s.endswith("?"):
        uu.append("câu hỏi")
        diem += 2.5
    if re.search(SO_CHU, low) or re.search(r"\d", low):
        uu.append("có con số")
        diem += 2
    if re.search(DONG_TU_HANH_DONG, low):
        uu.append("Wob làm một việc cụ thể")
        diem += 1.5
    if re.match(r"^this is (a|an|my)\b", low):
        uu.append("chỉ vào vật lạ trong hình")
        diem += 2
    n = len(words)
    if n <= 8:
        uu.append("ngắn %d từ" % n)
        diem += 1.5
    elif n > 14:
        loi.append("câu mở dài %d từ (nói không xong trong 3 giây)" % n)
        diem -= 2
    # câu kế tiếp nên là twist ngắn (punchline) → giữ người xem qua giây thứ 3–5
    if cau_ke and len(re.findall(r"[a-z']+", cau_ke.lower())) <= 7:
        uu.append("câu thứ hai ngắn (twist)")
        diem += 1
    return diem, loi, uu


def kiem_tieu_de(t):
    loi = []
    n = len(t.split())
    if n > 7:
        loi.append("câu mồi %d từ > 7" % n)
    if len(t) > 38:
        loi.append("câu mồi %d ký tự > 38 (đọc không kịp trong 1,5 giây)" % len(t))
    for x in TU_CAM:
        if x in t.lower():
            loi.append("câu mồi có từ cấm '%s'" % x)
    return loi


def trung_cau_mo(tieu_de, cau_mo):
    """Câu mồi lặp lại câu mở thì phí chỗ: chữ trên đầu phải thêm điều lời chưa nói (tò mò, lý do xem tiếp)."""
    a = set(re.findall(r"[a-z']+", tieu_de.lower()))
    b = set(re.findall(r"[a-z']+", cau_mo.lower()))
    if not a or not b:
        return False
    return len(a & b) / len(a) >= 0.8
