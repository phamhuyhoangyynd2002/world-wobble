# Selector cho Browser MCP

> Giao diện ChatGPT và Gemini đổi thường xuyên. Đây là điểm bắt đầu (viết 15/11/2026, **chưa chạy thử trên trang thật**). Hỏng thì `snapshot -i` hoặc `find "<chữ>"` tìm lại, rồi sửa file này kèm ngày. Ưu tiên locator theo vai trò, nhãn (`getByRole`, `getByLabel`) hơn CSS.

## ChatGPT web (`https://chatgpt.com/`)

| Việc | Thử trước | Dự phòng |
|---|---|---|
| Ô nhập | `#prompt-textarea` | `getByRole('textbox')` |
| Gửi | `[data-testid="send-button"]` | `press Enter` sau khi điền |
| Cuộc trò chuyện mới | `goto https://chatgpt.com/` | `getByRole('link', { name: 'New chat' })` |
| Temporary chat | **Không dùng** (16/11/2026: chat tạm thời trả lời "Image generation isn't available in this temporary chat") | trò chuyện thường, `goto https://chatgpt.com/` mỗi ảnh |
| Ảnh đã tạo | 16/11/2026 giao diện tiếng Việt: `img[alt='Ảnh được tạo 1']` (src là `blob:`; tải bằng `download <locator ảnh> --path ...`, được PNG 1672×941). Tiếng Anh: `img[alt^="Generated image"]` | `snapshot -i` tìm ảnh trong tin trả lời cuối |
| URL ảnh | `requests --static --filter estuary` | `get attr src <ảnh>` |
| Đang tạo xong chưa (16/11: mất 60–90 giây) | `wait --text "Image created"` hoặc chờ nút Download hiện | `wait 5000` lặp, mỗi lần `snapshot` kiểm |
| Hết lượt | `find "limit"`, `find "Upgrade"` | |

## Gemini web (`https://gemini.google.com/app`)

| Việc | Thử trước | Dự phòng |
|---|---|---|
| Ô nhập | `getByRole('textbox')` (16/11/2026 tiếng Việt: "Nhập câu lệnh cho Gemini"; `fill` chạy được với văn bản dài đã escape JSON) | `rich-textarea .ql-editor` |
| Gửi | 16/11/2026 tiếng Việt: `getByLabel('Gửi tin nhắn')`; tiếng Anh: `getByLabel('Send message')` | `press Enter` |
| Ảnh đã tạo | `img.image` trong tin trả lời cuối | `snapshot -i` |
| URL ảnh | `requests --static --filter googleusercontent` | `get attr src <ảnh>` |
| Watermark | Xem bằng Read: ngôi sao 4 cánh ở góc phải dưới | |
| Câu trả lời chữ (kiểm chứng vòng 2) | `eval "() => { const r=[...document.querySelectorAll('model-response')]; return r[r.length-1].innerText }"` (chạy được 16/11/2026, chế độ "Gemini Tự động") | `get text` tin trả lời cuối |
