---
name: tao-anh-web
description: Tạo ảnh minh hoạ AI cho một tập World Wobble bằng giao diện web miễn phí (ChatGPT web trước, Gemini web sau) qua Browser MCP, với tài khoản riêng không dính kênh; ghép prompt theo phong cách kênh, tải ảnh gốc, xem từng ảnh loại watermark, cắt 16:9 và ghi assets/manifest.json. Dùng khi cần ảnh ai-<id> mà không muốn tốn API, khi người làm kênh nói "tạo ảnh bằng ChatGPT/Gemini web", "làm ảnh free", hoặc khi lay-tai-nguyen thiếu ảnh AI và chưa có GEMINI_API_KEY.
argument-hint: "<thư mục dự án> [--only <id>] [--nguon chatgpt-web|gemini-web]"
---

# Tạo ảnh bằng ChatGPT web / Gemini web

Đầu vào: `$ARGUMENTS`. Luật: `.claude/rules/chinh-xac-va-ban-quyen.md` mục 3. Script: `.claude/skills/tao-anh-web/scripts/anh_web.py`. Selector từng trang: `references/selectors.md`.

**Chạy ở phiên chính, không giao agent**: agent không có Browser MCP, và bước xác nhận tài khoản cần người làm kênh.

## Vì sao có hàng rào (chốt 15/11/2026)

Người làm kênh chọn đường này để không tốn API, sau khi đã nghe các rủi ro, và chấp nhận chúng:

- **Điều khoản**: OpenAI cấm trích xuất Output bằng cách tự động hoặc bằng chương trình; Google có thể khoá truy cập khi thấy dùng bất thường. Bị khoá là mất tài khoản đó → **chỉ dùng tài khoản riêng**, không bao giờ dùng tài khoản Google/YouTube giữ kênh.
- **Gemini web miễn phí ở Việt Nam có watermark ngôi sao hiện trên ảnh** (chỉ gói AI Ultra tắt được ở Việt Nam, tin 08/2026). Ảnh có watermark **không dùng**; **không** cắt, xoá, che watermark (lách điều khoản).
- **Hạn mức miễn phí thấp và thay đổi** (ChatGPT thường được nói là 2–3 ảnh/ngày). Một tập cần 30–50 ảnh, nên đường này thường **không đủ cho cả tập**: chỉ dùng cho ảnh hạng chính trong `anh_ai`; ảnh phụ tạo nội bộ bằng ComfyUI (`lay-tai-nguyen`, `tao_anh_noi_bo.py`).

## Bước 0: một lần mỗi phiên

1. `mcp__browsermcp__browser`: `tab list`, rồi `tab new https://chatgpt.com/` (luôn làm việc ở tab mới, không đụng tab người làm kênh đang mở).
2. Xem đang đăng nhập tài khoản nào (menu hồ sơ góc dưới trái, `snapshot -i`). Hỏi người làm kênh bằng AskUserQuestion: "Tài khoản <tên hiển thị> có phải tài khoản riêng, không phải tài khoản giữ kênh?" **Không ghi email vào file nào.** Chưa đăng nhập, hoặc người làm kênh trả lời không phải: dừng, nhờ họ tự đăng nhập tài khoản riêng.
3. Gemini làm tương tự ở `https://gemini.google.com/app` khi cần tới.
4. Ghi vào `nhat-ky.md`: "tao-anh-web: tài khoản riêng đã xác nhận (<nguồn>)".

## Bước 1: danh sách ảnh cần tạo

Chạy `python .claude/skills/lay-tai-nguyen/scripts/ke_hoach_anh.py <dự án>`, chỉ lấy các ảnh có việc `tao` hoặc `nang-hang` với nguồn `chatgpt-web` (hoặc chỉ `--only`). Ảnh phụ (`comfyui-noi-bo`) **không** tạo ở đây, để khỏi tốn lượt. Làm theo thứ tự điểm cao trước. `python3 …/anh_web.py dem` để biết hôm nay còn bao nhiêu lượt trong trần tự đặt.

## Bước 2: mỗi ảnh, lần lượt từng cái (không mở song song)

1. **Prompt**: `python3 .claude/skills/tao-anh-web/scripts/anh_web.py prompt <dự án> --id ai-<mô-tả> --prompt "<chỉ tả cảnh, tiếng Anh>" --nguon chatgpt-web`
   - Mã 1: prompt có từ cấm, sửa prompt. Mã 2: ảnh đã có, bỏ qua. Mã 3: chạm trần ngày, chuyển nguồn hoặc dừng.
   - Prompt tả nơi, thời tiết, hoạt động, bố cục; chừa trống phía trái nếu cảnh có tiêu đề. Không ảnh chụp, không tên hoạ sĩ/studio/nhân vật, không bản đồ, không người thật nhận ra được, không Wob (Wob là SVG).
2. **Gửi**: mở cuộc trò chuyện mới (ChatGPT: **không** dùng *Temporary chat*, vì chat tạm thời không tạo ảnh, kiểm 16/11/2026), điền prompt đầy đủ script in ra, gửi. Một prompt một ảnh, không xin nhiều phương án một lúc.
3. **Chờ**: `wait` tới khi ảnh xuất hiện (thường 30–120 giây). Không bấm gửi lại khi đang chờ.
4. **Dừng ngay** (không thử lại, không đổi tài khoản) khi thấy: thông báo hết lượt ("You've reached…", "limit", "Upgrade", "try again later"), captcha hay xác minh, cảnh báo vi phạm, đăng xuất. Ghi vào `nhat-ky.md` mốc giờ và nguyên văn thông báo, rồi sang bước "Khi hết lượt".
5. **Tải ảnh gốc**: `download <phần tử ảnh> --path <scratchpad>/<id>.<đuôi>` (lấy file gốc bằng cookie của trang). Không được thì tìm URL ảnh bằng `requests --static --filter <mẫu trong selectors.md>` rồi `download <url>`. Cách cuối: bấm nút Download của trang, lấy file mới nhất trong `~/Downloads`. **Không chụp màn hình thay ảnh** (mất độ phân giải).
6. **Xem ảnh bằng Read** (bắt buộc): không watermark, logo, ngôi sao Gemini ở góc; không chữ lạ; rõ là tranh vẽ, không như ảnh chụp; không bản đồ, cờ; không người thật nhận ra được; đúng nội dung lời đọc của cảnh; không lỗi hình (tay sáu ngón, nhà lơ lửng). Hỏng: tạo lại tối đa 2 lần với prompt sửa (mỗi lần tốn một lượt).
7. **Nhận**: `python3 .claude/skills/tao-anh-web/scripts/anh_web.py nhan <dự án> --id ai-<mô-tả> --file <file tải về> --nguon chatgpt-web --da-xem --tai-khoan-rieng [--model "<tên model nếu giao diện ghi>"] [--scenes 3] [--tai-hien-su-kien]`
   - Lưu bản gốc ở `assets/ai/goc/` (giữ C2PA, SynthID), bản dùng 1920×1080 ở `assets/ai/<id>.png`, ghi manifest (`nguon`, `watermark_da_kiem`, `tai_khoan_rieng`, prompt, điều khoản). `kiem_tra_ban_quyen.py` CHẶN ảnh web thiếu hai cờ kiểm.
   - Ảnh tái hiện một sự kiện có thật: thêm `--tai-hien-su-kien` (gắn nhãn AI theo Nghị định 142/2026).
8. Nghỉ vài giây giữa hai ảnh như người dùng thường; không chạy vòng lặp dồn dập.

## Khi hết lượt hoặc nguồn không dùng được

Theo thứ tự: (1) ChatGPT hết lượt → thử Gemini web: ảnh có ngôi sao watermark thì **dừng Gemini cho cả phiên**, không dùng ảnh đó. (2) Có `GEMINI_API_KEY` trong `.env` → hỏi người làm kênh có cho dùng API cho các ảnh còn lại không (`lay-tai-nguyen`, khoảng 0,04–0,07 USD/ảnh). (3) Không thì chạy lại `ke_hoach_anh.py <dự án> --luot-ngoai 0`, rồi chọn: để mai tạo tiếp (`--khi-thieu cho`), hoặc hạ hạng ảnh chính còn lại xuống ComfyUI nội bộ (`--khi-thieu ha-hang`, rồi `tao_anh_noi_bo.py tao … --ha-hang`). Ảnh có đồ vật, con vật cụ thể (`cu_the = 2`) mà hạ hạng thì xem kỹ, sai thì thay bằng đạo cụ SVG đặt trên ảnh phụ. Ghi CẢNH BÁO vào `nhat-ky.md` và báo lại khi giao video. Không đổi sang tài khoản khác để lấy thêm lượt.

## Xong khi

- Mọi ảnh cần đã có trong manifest, hoặc đã ghi rõ ảnh nào thiếu và phương án thay.
- `nhat-ky.md` có: nguồn, số ảnh tạo, số lần tạo lại, thông báo hết lượt (nếu có), giờ.
- Báo một dòng: tạo được bao nhiêu ảnh trên nguồn nào, còn thiếu id nào.
- Selector trong `references/selectors.md` không còn đúng → sửa file đó, ghi ngày.
