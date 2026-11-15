---
name: phan-tich-hieu-qua
description: Phân tích số liệu YouTube của các tập World Wobble đã đăng (lượt hiển thị, CTR thumbnail, lượt xem, thời lượng xem trung bình, % xem, đường giữ chân người xem, người đăng ký mới, bình luận, nguồn lưu lượng, thiết bị TV/điện thoại) rồi rút bài học ghi vào kenh/bai-hoc.md và chỉnh các mặc định ban đầu. Dùng khi người làm kênh dán số liệu, ảnh chụp YouTube Studio, hỏi "tập nào hiệu quả", "vì sao ít view", "người xem bỏ ở đâu", hoặc sau 10 tập đầu để quyết định hướng tiếp.
argument-hint: "[số liệu dán vào, đường dẫn ảnh chụp, hoặc tên dự án]"
---

# Phân tích hiệu quả

Đầu vào: `$ARGUMENTS`.

## Thu số liệu

- Người làm kênh dán số hoặc ảnh chụp YouTube Studio (tab Analytics của từng video: Reach, Engagement, Audience). Đọc ảnh bằng Read. Không đoán số không có.
- Ghi vào `projects/<dự án>/so-lieu.md`: ngày lấy số, số ngày kể từ khi đăng, mỗi chỉ số một dòng, kèm ghi chú nguồn (ảnh nào, tab nào).
- Chỉ số cần: lượt hiển thị, CTR, lượt xem, thời lượng xem trung bình, % trung bình đã xem, đường giữ chân (mốc người xem rời đi nhiều), người đăng ký mới, bình luận, thích, nguồn lưu lượng (Browse, Suggested, Search), thiết bị (TV, điện thoại, máy tính).

## Phân tích

1. **So với chính kênh** (không so với kênh lớn): tập này so với trung vị các tập trước.
2. **Đường giữ chân**: mốc rơi mạnh nhất ứng với câu nào trong `timeline.json` (đọc `scenes[].words` quanh mốc đó) và hình gì (`shots`). 30 giây đầu giữ được bao nhiêu phần trăm.
3. **CTR và tiêu đề/thumbnail**: tập CTR cao khác tập CTR thấp ở đâu (chữ, Wob, nơi).
4. **Thiết bị**: tỉ lệ xem trên TV; nếu cao, xem lại cỡ chữ, nhịp.
5. **Bình luận**: người xem hỏi gì, chê gì (sai sự thật? hình? giọng?). Lời chê về sự thật thì kiểm lại ngay và báo người làm kênh.

Mỗi kết luận ghi rõ là **[Đo]** (số đọc từ Studio), **[Nguồn]** (tài liệu có link) hay **Nhận định**; không ước đoán con số.

## Ghi bài học

Thêm vào `kenh/bai-hoc.md`, mỗi bài học một mục: ngày, căn cứ (tập nào, số nào), bài học, áp dụng ở đâu (quy tắc nào, mặc định nào trong `.claude/rules/video-dai-youtube.md` hay skill nào cần chỉnh). Đề xuất sửa mặc định ban đầu (nhịp hình, độ dài chương, cỡ chữ) khi có ít nhất 3 tập cùng chiều; hỏi người làm kênh trước khi sửa file trong `.claude/rules/`.

## Mốc 10 tập (hồ sơ kênh)

Sau tập 10: tổng hợp lượt hiển thị, CTR, thời lượng xem trung bình của cả 10 tập; đề xuất mở sang hướng kề bên (lịch sử "why was this city built here", what if) hay đổi hướng địa lý khác, kèm số liệu. Người làm kênh quyết định; ghi quyết định vào `kenh/ho-so-kenh.md`.
