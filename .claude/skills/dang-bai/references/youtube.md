# YouTube Studio: điền chi tiết video dài

Rút từ quy trình đã chạy thật bên GameReel ngày 13/11/2026 (YouTube Shorts, giao diện tiếng Việt), chỉnh cho video dài. Giao diện của kênh World Wobble có thể là tiếng Anh: tên nút trong ngoặc là bản tiếng Anh. Lần đầu chạy thật với World Wobble, sửa file này theo những gì thấy trên trang.

1. **Xác nhận kênh**: `eval "() => document.querySelector('#entity-name').innerText"` phải là World Wobble.
2. **Hộp chi tiết**: người làm kênh đã kéo video vào và hộp "Chi tiết" (Details) đang mở. **Không bấm Escape** ở bất kỳ bước nào: hộp tải lên đóng lại (bản nháp vẫn lưu, mở lại bằng "Chỉnh sửa bản nháp"/"Edit draft" trong tab Nội dung/Content).
3. **Tiêu đề** `#title-textarea #textbox`: `click` → `Meta+a` → `Backspace` → `type` tiêu đề.
4. **Mô tả** `#description-textarea #textbox`: gõ từng dòng của `mo_ta_dong`, dòng trống là một Enter. Hashtag: `type "#tag"` → `wait 1200` → `type " "`. Đọc lại; ô hiện "n/5000". Dòng chương phải bắt đầu "0:00".
5. **Thumbnail**: `upload "#file-loader" <out/thumbnail/a.jpg>`.
6. **Đối tượng người xem**: `click getByRole('radio', { name: /not made for kids|không dành cho trẻ em/i })`.
7. **Hiện thêm** (Show more): `click getByRole('button', { name: /show advanced|hiện chế độ cài đặt nâng cao/i })`. Đọc trạng thái mọi radio:
   `eval "() => [...document.querySelectorAll('tp-yt-paper-radio-button')].map(r=>r.innerText.trim().replace(/\\s+/g,' ').slice(0,45)+'='+r.getAttribute('aria-checked')).join(' | ')"`
   - Quảng cáo trả phí (Paid promotion): No.
   - **Nội dung thay đổi hoặc tổng hợp** (Altered content): theo `out/seo.md`. Câu hỏi chỉ tính khi người thật nói/làm điều họ không làm, sửa cảnh quay sự kiện thật, cảnh giả trông như thật. Hoạt hình rõ là hoạt hình thì **No**. Ô đang "Yes" mà không phải do mình chọn thì hỏi người làm kênh.
   - Thẻ (Tags): gõ, cách nhau dấu phẩy.
   - Ngôn ngữ video: English. Danh mục: theo seo.md (chọn bằng `eval` tìm `tp-yt-paper-item` có đúng chữ rồi `.click()`).
   - Phụ đề (Subtitles): thêm ngôn ngữ English → Upload file → With timing → `out/captions.srt`.
8. **Các thành phần của video** (Video elements): Add end screen → mẫu "1 video, 1 subscribe" → kéo về 20 giây cuối nếu chưa đúng → Save.
9. **Kiểm tra** (Checks): chờ "No issues found"/"Không phát hiện vấn đề nào". Có vấn đề bản quyền thì dừng.
10. **Chế độ hiển thị** (Visibility): hẹn giờ `click getByText(/^(Schedule|Lên lịch)$/)` → ngày (`snapshot -i ytcp-date-picker` lấy ref) → giờ (`fill` ô giờ, bấm ra ngoài) → múi giờ: chọn đúng múi giờ người làm kênh đã nói. Đọc lại `ytcp-visibility-scheduler` → `click "#done-button"`.
11. **Xác nhận**: hộp xác nhận có liên kết `https://youtu.be/<id>`; chép, bấm Đóng (Close). Mở Content, thấy video ở trạng thái Scheduled/Public.
