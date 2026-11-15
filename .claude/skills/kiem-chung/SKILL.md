---
name: kiem-chung
description: Kiểm chứng mọi khẳng định trong script.json bằng hai mô hình độc lập (vòng 1 Claude qua agent kiem-chung-thong-tin, vòng 2 Gemini có tìm kiếm web), đối chiếu, xếp mức A/B/C/D, xử lý chỗ lệch (sửa, nói dè dặt, bỏ, tra lần ba), là cổng bắt buộc trước giọng đọc; sau render sinh out/bao-cao-xac-thuc.md. Dùng ở bước 2 và 7 của /tao-video, khi sửa lời có số liệu, hoặc khi người dùng hỏi "kiểm chứng lại", "số này đúng không", "báo cáo độ xác thực".
argument-hint: "<thư mục dự án> [--only C03,C07]"
---

# Kiểm chứng hai mô hình

Đầu vào: `$ARGUMENTS`. Quy trình và mức A–D là luật của kênh (`kenh/ho-so-kenh.md`, mục "Kiểm chứng"); file này là cách chạy.

## Khung kết quả mỗi vòng

`kiem-chung/vong-1-claude.json`, `kiem-chung/vong-2-gemini.json`, `kiem-chung/vong-3.json` cùng một khung:

```json
{ "vong": 1, "model": "<model id>", "ngay": "YYYY-MM-DD",
  "ket_qua": [
    { "id": "C01", "statement": "<chép nguyên statement đã kiểm>",
      "verdict": "dung | sai | mau-thuan | khong-ro",
      "gia_tri_dung": "<khi sai> | null", "ghi_chu": "một câu",
      "nguon": [ { "title": "", "publisher": "", "url": "", "type": "goc | bach-khoa | bao | khac", "published": "YYYY-MM-DD | null" } ] } ] }
```

`statement` chép nguyên để `doi_chieu.py` biết khẳng định đã đổi sau khi kiểm.

## Các bước

1. **Hai vòng, song song, không thấy nhau**:
   - Vòng 1: giao agent `kiem-chung-thong-tin`. Prompt gồm thư mục dự án và danh sách mã cần kiểm; **không** nhắc kết quả vòng 2.
   - Vòng 2: `python3 .claude/skills/kiem-chung/scripts/gemini_kiem_chung.py <dự án> [--only C03,C07]`. Script chỉ gửi `statement` + tên nơi + câu hỏi của tập, không gửi nguồn của người viết. Lần đầu: `--list-models` để chọn `GEMINI_MODEL`.
2. **Đối chiếu**: `python3 .claude/skills/kiem-chung/scripts/doi_chieu.py <dự án>` → `kiem-chung/doi-chieu.md`.
3. **Xử lý từng việc** (cột "Việc cần làm"):

   | Tình huống | Làm gì |
   |---|---|
   | Hai vòng "dung" nhưng mức D (không có nguồn uy tín) | Tìm nguồn gốc (thống kê, chính phủ, bài khoa học); không được thì bỏ |
   | LỆCH ("dung" với "sai"/"khong-ro") | Tra lần ba: tự mở nguồn gốc bằng WebFetch, ghi `kiem-chung/vong-3.json` cho khẳng định đó. Vẫn không chắc thì sửa lời dè dặt (mức C) hoặc bỏ |
   | Cả hai "sai" | Sửa theo giá trị đúng có nguồn, đổi `statement`, kiểm lại hai vòng cho khẳng định đó |
   | Mức C chưa hedged | Sửa lời có cụm dè dặt ("estimates vary", "according to…"), đặt `hedged: true` |
   | Mức D | Bỏ câu đó khỏi `narration` và khỏi `claims` (sửa câu chuyển tiếp cho liền mạch) |

   Mỗi lần sửa hoặc bỏ, thêm một dòng vào `kiem-chung/da-sua.json`: `{"id", "loi_cu", "van_de", "xu_ly"}` (báo cáo cuối dùng file này). Sao lưu `script.v<N>.json` trước khi sửa, chạy lại `validate_script.py`.
4. **Kiểm lại phần đã đổi** ở cả hai vòng (`--only`), rồi `doi_chieu.py <dự án> --cong` tới khi mã 0.
5. **Sau khi render** (bước 7): `python3 .claude/skills/kiem-chung/scripts/bao_cao.py <dự án>` → `out/bao-cao-xac-thuc.md` (mốc thời gian lấy từ `timeline.json`). Mã khác 0 là KHÔNG ĐẠT: không giao video.

## Lưu ý

- Hai vòng cùng sai là có thể (cùng đọc một nguồn sai). Vì vậy mức A đòi ≥ 2 nguồn khác tên miền, trong đó ≥ 1 nguồn gốc; Wikipedia không tính là nguồn uy tín.
- Kỷ lục ("coldest", "highest") hay sai vì tiêu chí: kiểm cả tiêu chí trong `statement`.
- Số liệu đổi theo năm: `statement` phải ghi năm; nguồn cũ hơn 10 năm cho số liệu dân số thì ghi chú.
- Ghi số lượt gọi và token Gemini (cuối file vòng 2, mục `usage`) vào `nhat-ky.md` để tính chi phí.
