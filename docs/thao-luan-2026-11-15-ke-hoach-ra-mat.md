# Thảo luận 15/11/2026: hướng nội dung, kế hoạch ra mắt, thiết lập kênh, tạo ảnh

> Ghi lại toàn bộ trao đổi giữa người làm kênh và Claude trong phiên 15/11/2026, để thảo luận tiếp sau. Mỗi mục có: câu hỏi, Claude đề xuất gì, người làm kênh quyết gì, đã làm gì, còn mở gì.
> Các ngưỡng và ước tính ghi "phỏng đoán" là của Claude, chưa có số liệu thật của kênh.

## Tóm tắt nhanh

| # | Chủ đề | Quyết định | Trạng thái |
|---|---|---|---|
| 1 | Có nên remake video cùng chủ đề đã nổi? | Không chép video; **được** chọn nơi đã có video lớn nếu có góc riêng | Đề xuất sửa `/goi-y-chu-de` và cổng `brief.md`: **chưa làm, chờ trả lời** |
| 2 | Lịch đăng 10 tập đầu | **5 tập liên tục trong 5 ngày**, rồi dừng xem số liệu (người làm kênh chọn; Claude khuyên 2 tập/tuần) | Đã ghi vào hồ sơ kênh |
| 3 | Danh sách đề tài | Bỏ danh sách nháp 10 nơi của Claude; **Claude chọn lại từ đầu** | **Chưa làm** (`/goi-y-chu-de`) |
| 4 | Thiết lập kênh | Wob 6 biểu cảm, bảng "Mực & giấy", font Fraunces, logo mặt Wob + chữ | **Đã làm**, đã chạy thử qua template |
| 5 | Tạo ảnh AI | Dùng ChatGPT web / Gemini web qua Browser MCP, tài khoản riêng (người làm kênh chọn, chấp nhận rủi ro) | Skill `/tao-anh-web` **đã viết, chưa chạy thử trên trang thật** |
| 6 | Khoá API, nhạc, giọng | Người làm kênh chưa có key nào | **Chờ người làm kênh** |

---

## 1. Có nên remake các video cùng chủ đề đã nổi tiếng?

**Câu hỏi**: kênh có nên theo hướng làm lại các video có chủ đề đã nổi?

**Claude trả lời: tách hai việc khác nhau.**

- **Chép một video cụ thể (tiêu đề, khung kịch bản, thứ tự ý): không làm.**
  - Số đo trong repo: tìm "What Happens If You Trap a Spider…", ngoài bản gốc 2,29 triệu lượt xem có **18 kênh đăng tiêu đề gần như y hệt, trung vị 491 lượt xem** ([docs mục 10](danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md)).
  - Dễ bị xếp vào "reused content", rủi ro mất YPP; luật thương hiệu của kênh cũng cấm chép tiêu đề, khuôn video khác.
- **Cùng một nơi đã nổi, nhưng lập luận riêng: nên làm**, vì ngách "why do people live here" vốn chạy như vậy. Số đo ([youtube-tim-kiem-ngach-dia-ly.tsv](du-lieu-kenh-dai-2026-11-14/youtube-tim-kiem-ngach-dia-ly.tsv)):
  - Bermuda: Geography By Geoff 7,7 triệu; Impossible Travel làm lại cùng nơi vẫn **1,66 triệu**.
  - "Rock with no resources": RealLifeLore làm nơi khác cùng kiểu được 1,33 triệu.
  - Thị trấn nóng nhất: Furnace Creek, Laughlin, Phoenix đều có nhiều kênh làm, đều có triệu view.
- **Cái bẫy**: người vừa xem video 7 triệu view sẽ không bấm vào bản kể lại y hệt. Phải có góc mới: câu hỏi bản gốc chưa trả lời (hoặc đã cũ, sai), ≥ 3 chi tiết kiểm chứng được mà video lớn nhất chưa có, phán quyết của Wob, nghiên cứu từ nguồn gốc (không dùng lời của video kia làm nguồn).
- **Tỉ lệ đề xuất** (phỏng đoán): trong 10 tập đầu, khoảng 6–7 nơi đã có video lớn (có nhu cầu sẵn) và 3–4 nơi ít người làm.

**Đề xuất sửa quy trình (chưa làm, chờ người làm kênh đồng ý):**
1. `/goi-y-chu-de` liệt kê 3 video lớn nhất về mỗi nơi, coi là bằng chứng có nhu cầu.
2. `brief.md` (cổng 0) thêm mục bắt buộc: "Video nổi nhất về nơi này đã nói gì, tập mình nói thêm gì". Hiện cổng 0 chỉ so với các tập của chính kênh.

**Cần thảo luận**: có đồng ý hai sửa đổi trên không? Tỉ lệ 6–7 / 3–4 có hợp không?

---

## 2. Kế hoạch 10 tập đầu và lịch đăng

**Câu hỏi**: thiết kế và triển khai 10 video đầu; nên đăng trong 5 ngày hay 10 ngày; mục tiêu là thử xem có nên đầu tư không.

### Claude đề xuất: 2 tập/tuần (≈ 5 tuần cho 10 tập)

Lý do không nên đăng dồn 5 hay 10 ngày:
- **Không kịp học từ tập trước.** Một video của kênh mới thường cần 1–3 tuần để YouTube thử với người xem. Đăng dồn thì tập 10 lên trước khi biết tập 1 hỏng ở đâu; nếu có lỗi (thumbnail, đoạn mở, độ dài), cả loạt cùng mắc và kết luận "kênh không ổn" có thể sai.
- **Đúng kiểu YouTube đang soi** (kênh mới, giọng AI, ảnh AI, nhiều video dài trong vài ngày; [docs mục 10](danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md)). Khi xét YPP, YouTube xem cả danh sách video của kênh.
- 1 tập/tuần (hồ sơ kênh cũ) thì 10 tuần mới có câu trả lời, quá chậm cho phép thử.
- Điểm dừng: sau tập 3 sửa theo đường giữ chân thật; sau tập 10 quyết đầu tư hay dừng.

### Người làm kênh quyết: 5 tập liên tục trong 5 ngày, rồi tính tiếp

Claude chấp nhận và thêm biện pháp giảm rủi ro (đã ghi vào [hồ sơ kênh](../kenh/ho-so-kenh.md), mục "Nhịp sản xuất", và [video-dai-youtube.md](../.claude/rules/video-dai-youtube.md)):
- Làm xong và sửa **tập 1 trước**, rồi mới làm tập 2–5.
- 5 tập khác nhau rõ về lý do định cư, khuôn tiêu đề, câu mở, phán quyết.
- Mọi tập vẫn qua đủ các cổng (kiểm chứng hai mô hình, bản quyền, chủ quyền).
- Sau đợt thử: quay về nhịp đều 1–2 video/tuần.

### Tiêu chí "có nên đầu tư" (đặt trước, phỏng đoán)

| Tín hiệu sau 10 tập | Dừng | Đáng đầu tư tiếp |
|---|---|---|
| Lượt hiển thị mỗi video | < 500 | Có tập > 10.000 |
| CTR thumbnail | < 2% | ≥ 4–5% |
| % thời lượng xem (video ~12 phút) | < 25% | ≥ 35–40% |
| Nguồn lượt xem | Chỉ tìm kiếm | Có "Suggested" từ video lớn |

- Mốc YPP mới: 8.000 giờ xem trong 365 ngày. Nếu mỗi lượt xem trung bình 5 phút → khoảng **96.000 lượt xem/năm**.
- Chi phí API ước tính dưới 5 USD/tập (Azure khoảng 0,31 USD; phần còn lại ảnh và lượt gọi Gemini). Đo thật sau tập 1.

### Danh sách nháp 10 nơi (đã bị bỏ)

Claude đưa: Oymyakon, Coober Pedy, Whittier, Naples–Vesuvius, Santa Cruz del Islote, Longyearbyen, Tristan da Cunha, Kiruna, Mawsynram, Lima (mỗi tập một lý do định cư khác nhau, không chạm Biển Đông). Người làm kênh chọn **"để Claude chọn lại từ đầu"** → việc tiếp theo là chạy `/goi-y-chu-de` (không cần key).

**Cần thảo luận**: tiêu chí trên có hợp không; đợt thử là 5 tập (theo quyết định) hay vẫn tính mốc quyết định ở tập 10; chọn 5 nơi nào cho đợt ra mắt.

---

## 3. Thiết lập kênh (`/thiet-lap-kenh`): đã làm

### Đã chốt (người làm kênh chọn qua AskUserQuestion)

| Mục | Chốt | File |
|---|---|---|
| Wob | 6 biểu cảm SVG, dựng bằng script (không AI sinh ảnh): quả địa cầu méo, nét mực viền, ba lô nâu có cuộn thảm đỏ, giày đỏ; màu Wob cố định | `templates/_shared/wob/*.svg`, `wob/nguon/tao_wob.py` |
| Bảng màu | Phương án A "Mực & giấy": nền `#1E2A2B`, biển `#3F6A70`, giấy `#EFE3C8`, nhấn `#E0703A`, NOPE `#E85D45`, WOULD MOVE `#5E9E6A` | `frame.md`, `ww.css`, `ve_ban_do.mjs` |
| Font | Fraunces (OFL, trục SOFT 100, WONK 1). Bỏ Be Vietnam Pro vì là font của Game Vừa Ví | `templates/_shared/fonts/` + `GIAY-PHEP.md` |
| Logo | Icon đầu Wob + chữ WORLD WOBBLE; ảnh đại diện 800×800, banner 2560×1440 | `templates/_shared/logo.png`, `logo-icon.svg`, `kenh/nhan-dien/` |

Phương án B (giấy sáng + Bricolage) và C (đêm cực + Rubik) không chọn: B phải chạy hai chế độ sáng/tối khi có ảnh; C giống kênh địa lý chung chung. Màu nhấn cũ `#F2B544` bị bỏ vì gần trùng màu vàng của Game Vừa Ví.

### Kiểm tra đã chạy
- Đo tương phản: NOPE cũ `#C2402F` chỉ đạt 2,86:1 trên nền → đổi `#E85D45` (4,28:1). Các màu khác đạt.
- Dự án mẫu 30 giây (2 bản đồ thật vùng Kiruna, không giọng), `hyperframes check` 0 lỗi sau khi sửa, chụp khung xem bằng mắt; dự án mẫu đã xoá.
- **Lỗi có từ trước trong template, đã sửa**: con dấu phán quyết đè chữ to ở cảnh kết (giờ chữ to mờ đi 1,2 giây trước con dấu); thẻ chương đè Wob ở góc trái dưới (thẻ chương dời sang x = 400px); logo góc lên 28px (sàn đọc được trên điện thoại); bỏ font dự phòng Georgia (HyperFrames tự tải EB Garamond từ Google Fonts).
- Fraunces có đủ ký tự cho chữ trên hình (`−`, `°`, `~`, `·`, dấu nháy cong).

### Còn mở trong thiết lập kênh
- Chưa vẽ tấm bản đồ giấy cầm ngược của Wob (hồ sơ kênh có nhắc); thêm khi kịch bản cần.
- **Giọng Azure**: cần `AZURE_SPEECH_KEY` để tạo 3 bản nghe thử.
- **Phong cách ảnh** (`phong-cach-anh.txt`): cần tạo thử 3 ảnh; giờ có thể làm bằng `/tao-anh-web` mà không cần key Gemini.
- **Nhạc**: người làm kênh tải 3 bài từ YouTube Audio Library (lọc "Attribution not required"): tò mò, khắc nghiệt, hài.
- **Kênh YouTube**: người làm kênh tự tạo kênh, giữ handle `@WorldWobble`, dùng ảnh đại diện và banner trong `kenh/nhan-dien/`.

---

## 4. Tạo ảnh AI bằng ChatGPT web / Gemini web

**Yêu cầu**: tạo skill dùng Browser MCP điều khiển ChatGPT web hoặc Gemini web để tạo ảnh, ưu tiên miễn phí.

### Claude phản biện (đã tra nguồn ngày 15/11/2026)
1. **Gemini web miễn phí ở Việt Nam có watermark ngôi sao hiện trên ảnh.** Tháng 8/2026 Google cho tắt watermark, nhưng theo TechRepublic (dẫn trang hỗ trợ Google) người dùng ở Ấn Độ, Hàn Quốc, **Việt Nam** chỉ tắt được với gói AI Ultra.
2. **Rủi ro tài khoản.** Điều khoản OpenAI cấm trích xuất Output bằng cách tự động hoặc bằng chương trình. Đã có nhiều báo cáo Google khoá tài khoản vì dùng công cụ agent bên thứ ba (chưa thấy câu riêng về điều khiển trình duyệt trong điều khoản Google). Nặng nhất: dùng tài khoản Google giữ kênh YouTube thì bị khoá có thể kéo cả kênh.
3. **Hạn mức không đủ.** ChatGPT miễn phí thường được nói là 2–3 ảnh/ngày (không chính thức, thay đổi theo tải; một lần thử ghi nhận 23 ảnh). Một tập cần 30–50 ảnh, đợt 5 tập cần 150–250 ảnh.
4. API Gemini: các nguồn bên thứ ba nói model ảnh không có gói miễn phí (cần kiểm trang giá chính thức).

**Phương án Claude đề xuất (không được chọn):**
- Chạy mô hình ảnh trên máy (M2, 16 GB RAM) bằng `mflux` với Z-Image Turbo hoặc FLUX.1 schnell (Apache 2.0): miễn phí, không giới hạn, không watermark, không rủi ro tài khoản; ước tính 15–40 giây/ảnh (chưa đo); bản nén khoảng 7 GB, ổ còn 13 GB trống.
- Dự phòng: API trả tiền, khoảng 0,04–0,07 USD/ảnh, 2–3 USD/tập.

### Người làm kênh quyết
Dùng **ChatGPT/Gemini web như đề nghị ban đầu**, với **tài khoản riêng, không dính kênh**, chấp nhận rủi ro điều khoản, hạn mức thấp và watermark Gemini.

### Đã làm: skill `/tao-anh-web`
- [SKILL.md](../.claude/skills/tao-anh-web/SKILL.md), [anh_web.py](../.claude/skills/tao-anh-web/scripts/anh_web.py) (`prompt`, `nhan`, `dem`), [selectors.md](../.claude/skills/tao-anh-web/references/selectors.md).
- Hàng rào: xác nhận tài khoản riêng mỗi phiên (không ghi email); bắt buộc xem từng ảnh, ảnh có watermark không dùng, không cắt/xoá watermark; dừng ngay khi gặp hết lượt, captcha, cảnh báo, không đổi tài khoản lấy thêm lượt; trần tự đặt 25 ảnh/ngày mỗi nguồn; giữ bản gốc (C2PA, SynthID) ở `assets/ai/goc/`.
- `kiem_tra_ban_quyen.py` CHẶN ảnh web thiếu `watermark_da_kiem` hoặc `tai_khoan_rieng`, và cảnh báo về điều khoản.
- Đã thêm vào bảng luật hình ảnh ([chinh-xac-va-ban-quyen.md](../.claude/rules/chinh-xac-va-ban-quyen.md)), skill `lay-tai-nguyen`, `CLAUDE.md`.
- Script đã chạy thử với ảnh giả (lọc từ cấm, cắt 1536×1024 → 1920×1080, ghi manifest): đúng.

### Giới hạn và còn mở
- **Chưa chạy thử trên trang thật**; selector là điểm bắt đầu, có thể đã lệch.
- Skill phải chạy ở phiên chính (agent `thu-thap-tai-nguyen` không có Browser MCP) → trong `/tao-video`, ảnh AI để trống rồi phiên chính tạo bù.
- Hạn mức thấp nên thực tế chỉ đủ cho ảnh quan trọng; phần còn lại dùng bản đồ, Commons, nhịp `text`, hoặc API.

**Cần thảo luận**: có xem lại phương án mô hình chạy trên máy (đo tốc độ thật trước khi quyết) không; khi hết lượt có cho dùng API cho phần còn lại không; tài khoản riêng nào sẽ dùng.

---

## 5. Việc tiếp theo

| Ai | Việc | Cần cho |
|---|---|---|
| Người làm kênh | Tạo `AZURE_SPEECH_KEY` (Speech, vùng East US) và `GEMINI_API_KEY`; `cp .env.example .env` rồi điền (không dán key vào chat) | Giọng đọc, kiểm chứng vòng 2 |
| Người làm kênh | Tải 3 bài nhạc vào `music/` | Nhạc nền |
| Người làm kênh | Đăng nhập tài khoản ChatGPT riêng trên Chrome | Chạy thử `/tao-anh-web` + chốt phong cách ảnh |
| Người làm kênh | Tạo kênh `@WorldWobble`, dùng ảnh trong `kenh/nhan-dien/` | Đăng bài |
| Claude | `/goi-y-chu-de` chọn 5 nơi cho đợt ra mắt (không cần key) | Tập 1–5 |
| Claude | Chạy thử `/tao-anh-web` với 3 ảnh cùng cảnh, sửa selector | Phong cách ảnh |
| Claude | Khi có key: 3 bản nghe thử giọng → chốt giọng | Tập 1 |
| Claude | Làm tập 1 trọn vẹn (`/tao-video`), người làm kênh xem, sửa dây chuyền | Tập 2–5 |
| Cả hai | Quyết hai sửa đổi ở mục 1 (`/goi-y-chu-de`, cổng `brief.md`) | Chọn đề tài |

## 6. Trạng thái git

Mọi thay đổi trong phiên **chưa commit** (đang ở nhánh `main`). Nếu commit thì nên tạo nhánh mới trước. File chính đã đổi hoặc thêm:
- Sửa: `CLAUDE.md`, `kenh/ho-so-kenh.md`, `.claude/rules/chinh-xac-va-ban-quyen.md`, `.claude/rules/video-dai-youtube.md`, `.claude/skills/lay-tai-nguyen/SKILL.md`, `.claude/skills/lay-tai-nguyen/scripts/ve_ban_do.mjs`, `.claude/skills/kiem-tra-video/scripts/kiem_tra_ban_quyen.py`, `templates/_shared/{frame.md, ww.css, ww.js, phong-cach-anh.txt, wob/README.md, fonts/GIAY-PHEP.md}`, `templates/explainer/index.html`.
- Xoá: `templates/_shared/fonts/BeVietnamPro-*.ttf`, `templates/_shared/fonts/OFL.txt`.
- Thêm: `templates/_shared/fonts/Fraunces-Variable.ttf` + `Fraunces-OFL.txt`, `templates/_shared/wob/*.svg` + `wob/nguon/`, `templates/_shared/logo.png`, `logo-icon.svg`, `kenh/nhan-dien/`, `.claude/skills/tao-anh-web/`, file này.

## Nguồn (tra 15/11/2026)

- [OpenAI Terms of Use](https://openai.com/policies/terms-of-use/), [bản ROW](https://openai.com/policies/row-terms-of-use/)
- [TechRepublic: Google cho tắt watermark Gemini, trừ Ấn Độ, Hàn Quốc, Việt Nam cần AI Ultra](https://www.techrepublic.com/article/news-google-gemini-visible-watermarks-optional/) · [PCWorld](https://pcworld.com/article/3213409/google-now-lets-you-nix-visible-gemini-image-watermarks.html)
- [SmartScope: hạn mức ảnh ChatGPT](https://smartscope.blog/en/blog/chatgpt-image-generation-limit-free-go-plus-2026/) · [Atlas Cloud: thử 23 ảnh/ngày](https://www.atlascloud.ai/blog/tips/chatgpt-image-generation-limit)
- [The Register: Google khoá tài khoản dùng Antigravity/Gemini với công cụ bên thứ ba](https://www.theregister.com/2026/02/23/google_antigravity_compute_burden/)
- [laozhang: model ảnh Gemini API không có gói miễn phí (bên thứ ba)](https://blog.laozhang.ai/en/posts/nano-banana-2-free-unlimited.md)
- [insiderllm: tạo ảnh trên Mac bằng MLX](https://insiderllm.com/guides/stable-diffusion-mac-mlx/)
- Số đo kênh và ngách: [docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md](danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md), [docs/du-lieu-kenh-dai-2026-11-14/](du-lieu-kenh-dai-2026-11-14/)
