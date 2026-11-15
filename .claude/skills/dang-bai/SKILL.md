---
name: dang-bai
description: Dựng thumbnail 1280×720 và điền chi tiết video (tiêu đề, mô tả, thumbnail, phụ đề, Not made for kids, nhãn AI, danh mục, hẹn giờ) trên YouTube Studio qua Browser MCP cho một tập World Wobble đã làm xong, rồi kiểm tra và ghi out/dang/ket-qua.md. Người làm kênh tự kéo file video vào YouTube Studio (video dài vượt giới hạn 50 MB của Browser MCP). Dùng khi người làm kênh nói "đăng", "up video", "hẹn giờ đăng", "làm thumbnail" cho một dự án trong projects/. Chỉ chạy khi được gọi rõ; /tao-video không tự gọi skill này.
argument-hint: "<thư mục dự án> [--chuan-bi]"
---

# Đăng lên YouTube

Đầu vào: `$ARGUMENTS`. `--chuan-bi`: chỉ dựng thumbnail và nội dung, không mở trình duyệt.

Đăng bài là việc ra ngoài, không rút lại hết được. Chỉ chạy khi người làm kênh gọi `/dang-bai` hoặc bảo rõ "đăng đi", nghĩa là họ đã xem video cuối. Nếu `nhat-ky.md` cho thấy video được render lại **sau** lần họ xem, hỏi lại một câu.

## 0. Cổng

Không đăng nếu: `ban-quyen.md` còn mục CHẶN; `out/bao-cao-xac-thuc.md` KHÔNG ĐẠT hoặc cũ hơn `out/video.mp4`; `out/dang/ket-qua.md` cho thấy video đã đăng. Báo lỗi và dừng.

## 1. Thumbnail

Theo phương án A trong `out/seo.md`: ảnh nền là ảnh đã dùng trong video (theo id trong manifest), Wob (khi đã có SVG) với biểu cảm ghi trong seo.md, tối đa 4 chữ to (font của kênh, viền tối, ≥ 120px trên khung 1280×720), chữ và Wob không nằm ở góc phải dưới (chỗ hiện thời lượng). Dựng bằng Pillow hoặc một composition HyperFrames 1280×720 chụp một khung; lưu `out/thumbnail/a.jpg` (< 2 MB), xem lại bằng Read ở cỡ nhỏ (320×180) để chắc chữ còn đọc được. TODO: viết script dựng thumbnail khi đã chốt hệ thiết kế và vẽ xong Wob.

## 2. Nội dung

Lấy từ `out/seo.md`: tiêu đề chính, mô tả (toàn văn), thẻ, bình luận ghim, cài đặt. Kiểm mô tả ≤ 5000 ký tự. Ghi `out/dang/noi-dung.json` (`tieu_de`, `mo_ta_dong` là mảng dòng, `the`, `thumbnail`, `phu_de`: `out/captions.srt`, `binh_luan_ghim`) để gõ từ file, không gõ theo trí nhớ.

**Giờ đăng**: theo yêu cầu của người làm kênh; không nêu thì hỏi một lần (giờ khán giả Mỹ khác giờ Việt Nam 11–15 tiếng; chưa có số liệu kênh để chọn mặc định). Ghi giờ đã chọn vào `nhat-ky.md`.

`--chuan-bi` dừng ở đây.

## 3. Tải video lên (người làm kênh làm)

Browser MCP không gắn được file từ 50 MB, còn video 10–15 phút nặng vài trăm MB. Nhờ người làm kênh: mở YouTube Studio đúng kênh World Wobble → Create → Upload videos → kéo `out/video.mp4` vào → báo lại khi hộp "Details" hiện ra. Chờ, không làm gì khác trong lúc đó. TODO: nếu sau này bật YouTube Data API (OAuth), thay bước này bằng script tải lên.

## 4. Điền chi tiết (Claude, qua Browser MCP)

Đọc `references/browser-mcp.md` trước. Rồi theo `references/youtube.md`:
1. Xác nhận tên kênh là World Wobble trên trang (`#entity-name`). Sai kênh thì dừng.
2. Tiêu đề, mô tả (gõ từng dòng, đọc lại so với `noi-dung.json`).
3. Thumbnail `out/thumbnail/a.jpg` (file nhỏ, Browser MCP gắn được).
4. "No, it's not made for kids". Hiện thêm: nhãn altered/synthetic theo `out/seo.md` (mặc định **No** với hoạt hình hoàn toàn); thẻ; ngôn ngữ English; danh mục theo seo.md; phụ đề tải `out/captions.srt` (ngôn ngữ English).
5. Video elements: end screen (mẫu 1 video + nút đăng ký) đặt ở góc phải dưới 20 giây cuối; chương tự nhận từ mô tả.
6. Checks: chờ "No issues found". Có vấn đề bản quyền thì dừng, chép nguyên văn cho người làm kênh.
7. Visibility: hẹn giờ theo bước 2 (hoặc Public nếu được bảo đăng ngay). Đọc lại form, chụp màn hình, rồi bấm Schedule/Publish.
8. Xác nhận video có trong danh sách Content, lấy liên kết. Ghim bình luận khi video đã công khai (nếu hẹn giờ thì ghi việc này vào "việc còn lại").

## 5. Ghi kết quả

`out/dang/ket-qua.md`:

```markdown
# Kết quả đăng: <tiêu đề>
| Nền tảng | Trạng thái | Lên sóng | Liên kết | Ghi chú |
|---|---|---|---|---|
| YouTube | đã hẹn | 2026-11-20 08:00 | https://youtu.be/... | thumbnail a.jpg, captions.srt, Not made for kids |
```

Trạng thái chỉ dùng `đã đăng`, `đã hẹn`, `lỗi`. Thêm một dòng vào `nhat-ky.md`.

## Không làm

- Không đăng khi cổng ở bước 0 chưa đạt; không đăng lại video đã có.
- Không đọc, bấm vào tab khác của người dùng; không thao tác trên kênh khác (kể cả Game Vừa Ví).
- Không bật nhạc của YouTube, không đổi video, không chấp nhận gợi ý thẻ tự động.
