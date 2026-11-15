# Selector cho Browser MCP

> Giao diện ChatGPT và Gemini đổi thường xuyên. Đây là điểm bắt đầu (viết 15/11/2026, **chưa chạy thử trên trang thật**). Hỏng thì `snapshot -i` hoặc `find "<chữ>"` tìm lại, rồi sửa file này kèm ngày. Ưu tiên locator theo vai trò, nhãn (`getByRole`, `getByLabel`) hơn CSS.

## ChatGPT web (`https://chatgpt.com/`)

| Việc | Thử trước | Dự phòng |
|---|---|---|
| Ô nhập | `#prompt-textarea` | `getByRole('textbox')` |
| Gửi | `[data-testid="send-button"]` | `press Enter` sau khi điền |
| Cuộc trò chuyện mới | `goto https://chatgpt.com/` | `getByRole('link', { name: 'New chat' })` |
| Temporary chat | `find "Temporary"` | bỏ qua nếu không có |
| Ảnh đã tạo | `img[alt^="Generated image"]` (lấy cái cuối) | `snapshot -i` tìm ảnh trong tin trả lời cuối |
| URL ảnh | `requests --static --filter estuary` | `get attr src <ảnh>` |
| Đang tạo xong chưa | `wait --text "Image created"` hoặc chờ nút Download hiện | `wait 5000` lặp, mỗi lần `snapshot` kiểm |
| Hết lượt | `find "limit"`, `find "Upgrade"` | |

## Gemini web (`https://gemini.google.com/app`)

| Việc | Thử trước | Dự phòng |
|---|---|---|
| Ô nhập | `getByRole('textbox')` | `rich-textarea .ql-editor` |
| Gửi | `getByLabel('Send message')` | `press Enter` |
| Ảnh đã tạo | `img.image` trong tin trả lời cuối | `snapshot -i` |
| URL ảnh | `requests --static --filter googleusercontent` | `get attr src <ảnh>` |
| Watermark | Xem bằng Read: ngôi sao 4 cánh ở góc phải dưới | |
