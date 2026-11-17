"""Luật chấm hạng ảnh AI của World Wobble: nguồn duy nhất, dùng chung cho validate_script.py và ke_hoach_anh.py.

Mỗi ảnh AI khai báo trong script.json → `anh_ai` được chấm 4 tiêu chí, mỗi tiêu chí 0–2 điểm.
Giải thích đầy đủ cho người viết: .claude/skills/viet-kich-ban/references/hang-anh.md (sửa luật thì sửa cả hai).

  hang "chinh": tạo bằng nguồn ngoài (Gemini API, hoặc ChatGPT web qua skill tao-anh-web)
  hang "phu":   tạo nội bộ bằng ComfyUI trên máy (tao_anh_noi_bo.py)

Căn cứ: thử nghiệm 17/11/2026 (docs/thu-nghiem-comfyui-2026-11-17.md). SDXL nội bộ ra phong cách risograph đúng bảng màu
nhưng bỏ qua đồ vật, con vật, hành động cụ thể; ảnh ngoài làm đúng các chi tiết đó.
"""
from __future__ import annotations

TIEU_CHI = {
    "vi_tri": "2 = cảnh hook / 10 giây đầu / ứng viên thumbnail / cảnh phán quyết; 1 = mở chương; 0 = giữa chương",
    "thoi_luong": "2 = trên hình > 15 giây hoặc dùng lại ở ≥ 2 cảnh; 1 = 6–15 giây; 0 = < 6 giây",
    "cu_the": "2 = phải vẽ đúng đồ vật, con vật, hành động, công trình chỉ có ở nơi đó; "
              "1 = có vài chi tiết riêng nhưng sai một chút vẫn được; 0 = phong cảnh, không khí chung",
    "tieu_diem": "2 = hình chính đầy khung mắt người xem dừng lại; 1 = phông sau lưng Wob đang diễn; "
                 "0 = lớp xa, nền mờ, khung chuyển cảnh",
}
HANG = {"chinh", "phu"}
NGUONG_CHINH = 5  # tổng điểm từ mức này trở lên là ảnh chính


def tinh_hang(diem: dict) -> tuple[str, int, str]:
    """Trả (hạng, tổng điểm, lý do). Ném ValueError khi điểm sai dạng."""
    for k in TIEU_CHI:
        v = diem.get(k)
        if not isinstance(v, int) or isinstance(v, bool) or v not in (0, 1, 2):
            raise ValueError(f"diem.{k} phải là 0, 1 hoặc 2 (đang là {v!r})")
    thua = set(diem) - set(TIEU_CHI)
    if thua:
        raise ValueError(f"diem có tiêu chí lạ: {sorted(thua)}")
    tong = sum(diem[k] for k in TIEU_CHI)
    if diem["cu_the"] == 2:
        return "chinh", tong, "cu_the = 2: mô hình nội bộ hay vẽ sai chi tiết riêng của nơi đó"
    if diem["vi_tri"] == 2:
        return "chinh", tong, "vi_tri = 2: hook, thumbnail hoặc phán quyết"
    if tong >= NGUONG_CHINH:
        return "chinh", tong, f"tổng {tong} ≥ {NGUONG_CHINH}"
    return "phu", tong, f"tổng {tong} < {NGUONG_CHINH}"


def kiem_muc(muc: dict) -> list[str]:
    """Lỗi của một mục anh_ai (đã có trường cơ bản). Hạng khai báo phải khớp hạng tính, trừ khi có ghi_de + lý do."""
    loi = []
    try:
        hang, _, ly_do = tinh_hang(muc.get("diem") or {})
    except ValueError as e:
        return [str(e)]
    khai = muc.get("hang")
    if khai not in HANG:
        loi.append(f"hang phải là {sorted(HANG)} (đang là {khai!r})")
    elif khai != hang:
        gd = muc.get("ghi_de")
        if not (isinstance(gd, str) and gd.strip()):
            loi.append(f"hang '{khai}' khác hạng tính từ điểm '{hang}' ({ly_do}); sửa điểm, "
                       "hoặc ghi lý do vào ghi_de")
    return loi
