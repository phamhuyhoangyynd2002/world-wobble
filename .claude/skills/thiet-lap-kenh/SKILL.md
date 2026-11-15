---
name: thiet-lap-kenh
description: Hoàn tất các mục TODO trong hồ sơ kênh World Wobble và hệ thiết kế video: chốt giọng Azure en-US, bảng màu, font OFL riêng, logo, phong cách ảnh minh hoạ, sổ nhạc, Wob (SVG 6 biểu cảm), khoá API. Cập nhật kenh/ho-so-kenh.md, templates/_shared/frame.md, ww.css, phong-cach-anh.txt, màu bản đồ cho khớp nhau. Dùng khi mới bắt đầu, khi người làm kênh đổi nhận diện, hoặc khi hồ sơ kênh còn dòng TODO.
argument-hint: "[mục cần chốt hoặc thay đổi cụ thể]"
---

# Thiết lập kênh

Đầu vào: `$ARGUMENTS`.

1. Đọc `kenh/ho-so-kenh.md`, liệt kê các dòng TODO. Hỏi người làm kênh bằng AskUserQuestion, tối đa 4 câu mỗi lần, phương án đề xuất đứng đầu. Mục nào tự làm được thì làm, không hỏi.
2. Các mục và nơi phải cập nhật cùng lúc (đổi một chỗ mà quên chỗ khác là lệch nhận diện):

| Mục | Cách chốt | Cập nhật |
|---|---|---|
| Giọng đọc | Tạo 3 bản nghe thử 30 giây (cùng một đoạn lời) bằng 3 giọng Azure en-US (HD nếu có), đưa đường dẫn để người làm kênh nghe | `kenh/ho-so-kenh.md` (Giọng đọc), mặc định `voice` trong `viet-kich-ban/references/schema.md` |
| Bảng màu | Đề xuất 2–3 bảng (không giống Kurzgesagt, không giống Game Vừa Ví), dựng một khung thử 1920×1080 cho mỗi bảng | `templates/_shared/frame.md`, biến CSS trong `ww.css`, hằng `C` trong `ve_ban_do.mjs` |
| Font | Font OFL đọc tốt trên TV, có đậm 800–900; tải file, ghi `fonts/GIAY-PHEP.md` kèm `OFL.txt` | `frame.md`, `@font-face` trong `ww.css` và `templates/explainer/index.html`, `FONT` trong `ww.js` |
| Logo | Người làm kênh đưa file, hoặc dựng logo chữ đơn giản | `templates/_shared/logo.png`, `.ww-bug` trong `ww.css` |
| Phong cách ảnh | Viết 1–3 câu tiếng Anh, tạo thử 3 ảnh cùng một cảnh bằng `tao_anh_ai.py`, người làm kênh chọn | `templates/_shared/phong-cach-anh.txt` |
| Wob | Vẽ SVG tách bộ phận, 6 biểu cảm, cùng khung; không dùng AI sinh ảnh | `templates/_shared/wob/*.svg`; chụp thử bằng một dự án mẫu |
| Nhạc | Người làm kênh tải bài từ YouTube Audio Library hoặc thư viện có giấy phép; Claude ghi sổ và bằng chứng | `music/`, `music/GIAY-PHEP.md`, `music/bang-chung/` |
| Khoá API | Người làm kênh điền `.env` theo `.env.example`; chạy `gemini_kiem_chung.py --list-models` để chọn model | `.env` (không commit) |

3. Sau khi đổi giao diện: chạy lại một dự án mẫu tới `hyperframes check` và chụp thử, xem bằng Read.
4. Ghi ngày chốt và lý do vào `kenh/ho-so-kenh.md`, xoá dòng TODO tương ứng.
