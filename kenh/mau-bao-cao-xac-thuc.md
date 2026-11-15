# Mẫu báo cáo độ xác thực (World Wobble)

> Mỗi video có một file `out/bao-cao-xac-thuc.md` theo mẫu này, giao cùng `out/video.mp4`. Báo cáo viết tiếng Việt cho người làm kênh; trích khẳng định giữ nguyên tiếng Anh như trong lời đọc. Quy trình và định nghĩa mức A–D ở [ho-so-kenh.md](ho-so-kenh.md), mục "Kiểm chứng".

---

# Báo cáo độ xác thực: <tiêu đề video>

- Video: `projects/<ngày>-<slug>/out/video.mp4` (<thời lượng>)
- Ngày kiểm chứng: <DD/MM/YYYY>
- Vòng 1: Claude (<model id>), agent kiểm chứng độc lập
- Vòng 2: Gemini (<model id>), có tìm kiếm web, không thấy kết luận của vòng 1
- Kết luận cổng: **ĐẠT / KHÔNG ĐẠT** (<lý do nếu không đạt>)

## Tóm tắt

| Mức | Số khẳng định | Tỉ lệ |
|---|---|---|
| A, xác thực | | |
| B, có cơ sở | | |
| C, còn tranh cãi (đã nói rõ trong lời) | | |
| D, không kiểm chứng được (đã bỏ) | | |
| **Tổng còn trong video** | | |

Hai mô hình lệch nhau ở <n> khẳng định; cách xử lý ở mục "Đã sửa hoặc bỏ".

## Từng khẳng định

| Mã | Thời điểm | Khẳng định (lời đọc) | Mức | Claude | Gemini | Nguồn | Ghi chú |
|---|---|---|---|---|---|---|---|
| C01 | 00:12 | "..." | A | Đúng | Đúng | [S1][S3] | |
| C02 | 01:05 | "..." | C | Đúng | Nguồn mâu thuẫn | [S2][S4] | Lời đọc đã thêm "estimates vary" |

## Đã sửa hoặc bỏ

| Mã | Lời cũ | Vấn đề | Xử lý |
|---|---|---|---|
| C07 | "..." | Chỉ có một blog, không nguồn gốc (D) | Bỏ |

## Phán quyết của kênh

- Con dấu: WOULD MOVE / SUMMER ONLY / NOPE
- Lý do trong video: "..."
- Đây là nhận định của kênh, không phải khẳng định cần kiểm chứng; các sự thật làm căn cứ cho nhận định đã nằm trong bảng trên.

## Nguồn

| Mã | Tiêu đề | Bên đăng | Loại (gốc / báo / bách khoa / khác) | Ngày đăng | Ngày truy cập | URL |
|---|---|---|---|---|---|---|
| S1 | | | gốc | | | |
