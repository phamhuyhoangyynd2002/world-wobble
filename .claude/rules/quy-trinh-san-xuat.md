# Quy trình sản xuất video

## Nguyên tắc làm việc với người làm kênh

- Chế độ duy nhất là **tự động** (hồ sơ kênh, chốt 14/11/2026). Người làm kênh nêu đề tài (hoặc để Claude chọn từ danh sách trong hồ sơ), rồi chỉ **xem video cuối kèm báo cáo độ xác thực**. Không dừng duyệt kịch bản, không dừng duyệt hình.
- Vì không có người duyệt giữa chừng, **các cổng tự động thay cho người duyệt**: cổng nào không đạt thì sửa tới khi đạt, không đi tiếp. Cổng quan trọng nhất là kiểm chứng hai mô hình (skill `kiem-chung`).
- Chỉ hỏi khi thiếu thông tin **không thể tự suy ra hợp lý**, và gộp vào một lần AskUserQuestion. Có mặc định hợp lý thì dùng, ghi vào `brief.md` và `nhat-ky.md`.
- **Đọc bộ nhớ kênh trước mọi việc**: `kenh/ho-so-kenh.md` (kênh, Wob, giọng, khán giả), `kenh/bai-hoc.md` (bài học từ số liệu thật). Điều gì đã có ở đó thì không hỏi lại.
- Chỉ đăng lên YouTube khi người làm kênh gọi `/dang-bai` hoặc bảo rõ "đăng đi", sau khi đã xem video, và khi `ban-quyen.md` không còn mục CHẶN, `out/bao-cao-xac-thuc.md` kết luận ĐẠT. `/tao-video` và các agent không tự đăng.
- Quy tắc trong các skill chia hai loại: **quy tắc bắt buộc** (sai là hỏng: kiểm chứng, bản quyền, chủ quyền, lỗi render) và **mặc định ban đầu** (độ dài cảnh, nhịp đổi hình, cỡ chữ). Loại thứ hai được làm khác khi nội dung cần, miễn ghi lý do vào `nhat-ky.md`; khi có số liệu thật của kênh thì chỉnh lại theo `kenh/bai-hoc.md`.

## Giá trị mặc định

| Mục | Mặc định |
|---|---|
| Khung hình | 1920×1080, 16:9, 30 fps |
| Độ dài | 10–15 phút (`target_seconds` = `[600, 900]`) |
| Hướng nội dung | Giai đoạn 1: chỉ "Why do people live here?" (hồ sơ kênh). Đề tài ngoài hướng này thì hỏi trước |
| Template | `explainer` |
| Giọng đọc | Theo hồ sơ kênh (Azure, tiếng Anh). Chưa chốt giọng thì dùng giọng ghi trong `script.json` và ghi CẢNH BÁO vào nhật ký |
| Nhạc nền | Bài đầu tiên hợp tâm trạng trong `music/GIAY-PHEP.md`; sổ trống thì xuất bản không nhạc và ghi rõ |
| Phụ đề | Không đốt vào hình; xuất `out/captions.srt` để tải lên YouTube. Đốt vào hình chỉ khi `script.json` có `"burn_captions": true` |
| Ngày của dự án | Ngày hiện tại, dạng `YYYY-MM-DD` |

## Các cổng (thay cho điểm dừng)

| Cổng | Sau bước | Đạt khi |
|---|---|---|
| 0 Brief | Nhận đề tài | `brief.md` có câu hỏi trung tâm, thông điệp nháp, phán quyết dự kiến của Wob, lý do đề tài khác các tập trước |
| 1 Kịch bản | Viết kịch bản | `validate_script.py` không LỖI |
| 2 Kiểm chứng | Kiểm chứng 2 vòng | `doi_chieu.py --cong` mã 0: không còn khẳng định mức D trong kịch bản, mọi mức C đã nói rõ trong lời, mọi chỗ lệch giữa hai mô hình đã xử lý |
| 3 Tài nguyên | Lấy và tạo hình | Mọi `asset:<id>` trong `shots` có trong `assets/manifest.json`, có căn cứ sử dụng; `kiem_tra_ban_quyen.py --som` không CHẶN; bản đồ vùng nhạy cảm đã kiểm chủ quyền |
| 4 Giọng đọc | Tạo giọng | Mọi cảnh có `timing` là `tts` hoặc `whisper`; `nghe_lai.py` mã 0 |
| 5 Timeline | Dựng timeline | `build_timeline.py` mã 0, đọc hết CẢNH BÁO và xử lý cái nào cần |
| 5a Duyệt phân cảnh (hoạt hình) | Đạo diễn viết `phan-canh.json` | Agent `duyet-phan-canh` (chế độ `phan-canh`) chấm từng đoạn và tổng thể theo `dung-hoat-hinh/references/tieu-chi-duyet.md`: tổng thể ĐẠT, không đoạn LÀM LẠI. Chưa đạt thì không giao thợ dựng |
| 6a Duyệt hình (hoạt hình) | Dựng đủ các đoạn | `to_khung.py` + agent `duyet-phan-canh` (chế độ `hinh`): tổng thể ĐẠT, không đoạn LÀM LẠI, SỬA NHỎ đã sửa hoặc ghi lý do. Chưa đạt thì không ghép bản cuối |
| 6 Render | Render + trộn âm | `npx hyperframes check` 0 lỗi; có 2 bản MP4; `audio-report.json` khoảng −14 LUFS |
| 7 Kiểm định | Tự kiểm tra | `kiem_ky_thuat.py` mã 0; `ban-quyen.md` 0 mục CHẶN; `bao_cao.py` kết luận ĐẠT |

Trước khi giao video, Claude tự sửa theo kiểm định và phản biện tối đa 3 vòng; quá 3 vòng thì giao kèm danh sách lỗi còn lại.

## Hợp đồng file (thư mục `projects/<YYYY-MM-DD>-<slug>/`)

| File | Bước tạo ra | Nội dung |
|---|---|---|
| `brief.md` | 0 | Đề tài, câu hỏi trung tâm, thông điệp nháp, phán quyết dự kiến, góc riêng của tập, mặc định đã áp dụng |
| `nhat-ky.md` | mọi bước | Mỗi bước một dòng: đã làm gì, quyết định gì, vì sao. Đây cũng là bằng chứng quy trình sản xuất khi phải kháng nghị YPP |
| `research.md` | 1 | Ghi chú theo chủ đề, bảng số liệu có cột nguồn, chất liệu hài có nguồn, danh sách nguồn |
| `script.json` | 1 | Đúng schema trong skill `viet-kich-ban`, gồm danh sách khẳng định `claims` |
| `kiem-chung/vong-1-claude.json` | 2 | Kết quả agent `kiem-chung-thong-tin` |
| `kiem-chung/vong-2-gemini.json` | 2 | Kết quả Gemini (web qua `gemini_web.py`, hoặc API qua `gemini_kiem_chung.py`), không thấy vòng 1; bản web lưu prompt và câu trả lời gốc ở `kiem-chung/web/` |
| `kiem-chung/doi-chieu.json`, `kiem-chung/doi-chieu.md` | 2 | Mức A–D từng khẳng định, chỗ lệch, cách xử lý |
| `assets/ke-hoach-anh.json` | 3 | Ảnh AI nào đi nguồn ngoài, ảnh nào tạo nội bộ (ComfyUI), ảnh nào chờ, hạ hạng, nâng hạng (`ke_hoach_anh.py`, theo `anh_ai` trong `script.json`) |
| `assets/manifest.json` + ảnh, bản đồ | 3 | Mỗi tài nguyên: file, loại, căn cứ, giấy phép, tác giả, nguồn, prompt và model (ảnh AI) |
| `audio/scene-<id>.mp3`, `audio/subtitles.json` | 4 | Mốc từng từ, tính từ đầu mỗi cảnh |
| `timeline.json` | 5 | Mốc tuyệt đối của cảnh, từ, nhịp hình, Wob, con dấu, sfx, nhạc, chương, mốc khẳng định |
| `out/captions.srt`, `out/chapters.txt` | 5 | Phụ đề và mốc chương để tải lên YouTube |
| `hoat-hinh/duyet/duyet-phan-canh.md`, `duyet-hinh.md` (+ `.json`), `hoat-hinh/duyet/to-khung/` | 5a, 6a | Kết quả duyệt từng đoạn (D1–D10) và tổng thể (T1–T8), việc cần sửa theo người làm; tờ khung hình từng đoạn |
| `render/` | 6 | Composition HyperFrames đã chèn dữ liệu (tạo lại mỗi lần) |
| `out/video.mp4`, `out/video-no-music.mp4`, `out/audio-report.json` | 6 | Video cuối, bản chỉ giọng + sfx, số đo âm lượng |
| `ban-quyen.md` | 7 | Hồ sơ bản quyền do `kiem_tra_ban_quyen.py` sinh. Giữ ít nhất 12 tháng |
| `out/ky-thuat.json`, `out/qa-report.md`, `out/phan-bien.md` | 7 | Kiểm tra kỹ thuật, kiểm định, phản biện |
| `out/bao-cao-xac-thuc.md` | 7 | Báo cáo độ xác thực theo `kenh/mau-bao-cao-xac-thuc.md`, giao cùng video |
| `out/seo.md` | 7 | Tiêu đề, mô tả (có Sources, chương, ghi công, dòng AI), thẻ, chữ thumbnail |
| `out/thumbnail/` | 8 (`/dang-bai`) | Ảnh thumbnail 1280×720 và các phương án |
| `out/dang/ket-qua.md` | 8 (`/dang-bai`) | Đăng lúc nào, liên kết; dùng để chặn đăng trùng |
| `so-lieu.md` | sau khi đăng | Số liệu người làm kênh dán vào `/phan-tich-hieu-qua` |

## Chạy lại và phụ thuộc

- Bước sau luôn đọc lại file của bước trước, không dùng dữ liệu trong trí nhớ hội thoại.
- Một file đổi thì mọi file phía sau bị coi là cũ. Sửa lời đọc trong `script.json` → kiểm chứng lại các khẳng định bị đổi → giọng đọc cảnh đó → timeline → render. Không cần lấy lại tài nguyên.
- Đổi giọng hoặc tốc độ: chạy lại từ bước 4. Đổi template: chạy lại bước 5–6.
- Trước khi ghi đè `script.json`, sao lưu thành `script.v<N>.json`.
- File bị sửa sau lần ghi cuối của Claude (xem `nhat-ky.md`) là chủ ý của người làm kênh: làm tiếp dựa trên bản đó, không ghi đè.
- Kết quả trung gian bất biến thì không tạo lại: ảnh AI đã tạo (tốn tiền), ảnh đã tải, giọng của cảnh không đổi lời.

## Chạy song song

- Việc độc lập thì giao nhiều agent cùng lúc: kiểm chứng vòng 1 (agent) + vòng 2 (Gemini) + lấy tài nguyên; kiểm định + phản biện; SEO + render.
- Mỗi agent chỉ ghi file của mình.
- Prompt giao cho agent phải tự đủ ý (agent không thấy hội thoại): thư mục dự án, file đầu vào, file đầu ra, tiêu chí xong.
- **Vòng 1 và vòng 2 không được thấy kết quả của nhau** trước khi đối chiếu.

## Báo cáo tiến độ

- Sau mỗi bước, báo một dòng: bước nào xong, file nào được tạo, có cảnh báo gì.
- Lỗi ở một tài nguyên không được làm dừng cả luồng: dùng phương án dự phòng, ghi cảnh báo, báo lại khi giao video.
- Một bước thất bại hẳn (render lỗi, API lỗi): báo nguyên văn lỗi và cách đã thử, không báo là xong.
- Ghi chi phí API mỗi tập (Azure ký tự, Gemini lượt gọi và ảnh) vào `nhat-ky.md`, để sau video đầu đo được chi phí thật (TODO trong hồ sơ kênh).
