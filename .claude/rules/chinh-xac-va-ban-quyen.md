# Độ chính xác, bản quyền và tuân thủ

> Hàng rào an toàn của kênh, không phải tư vấn pháp lý. Viết lại cho World Wobble ngày 15/11/2026 từ luật của GameReel và tài liệu `docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md`. Điều khoản của bên thứ ba thay đổi, nên xem lại mỗi 6 tháng. Khi kênh có doanh thu đáng kể, hỏi luật sư sở hữu trí tuệ.

## 1. Nguyên tắc nền

- **Không có "dùng tự do".** Mọi hình ảnh, âm thanh, font, dữ liệu mà kênh không tự tạo phải có căn cứ: giấy phép cho phép **dùng thương mại** trên YouTube, hoặc thuộc phạm vi công cộng (public domain). Điều khoản chỉ cho "phi thương mại" coi như **không được dùng**, kể cả khi kênh chưa kiếm tiền: video đăng bây giờ sẽ được kiếm tiền sau này.
- Mỗi dự án có hồ sơ `ban-quyen.md` do `kiem_tra_ban_quyen.py` sinh, liệt kê mọi tài nguyên trong video cuối: nguồn, tác giả, căn cứ, câu ghi công. Giữ ít nhất 12 tháng.
- Lời chê số một với kênh lịch sử, địa lý làm bằng AI là **sai sự thật** (tài liệu nghiên cứu mục 4.3). Kênh sống nhờ độ tin, nên kiểm chứng là cổng cứng, không phải bước tham khảo.

## 2. Khẳng định và nguồn

- Mọi con số, ngày tháng, tên riêng, quan hệ nhân quả trong lời đọc là một **khẳng định** và phải được đăng ký trong `script.json` → `claims` (mã C01, C02…), kèm `source_ids`. `validate_script.py` báo LỖI khi một câu có số mà không thuộc khẳng định nào.
- Thứ tự ưu tiên nguồn: **nguồn gốc** (cơ quan thống kê, chính phủ, chính quyền địa phương, bài khoa học có bình duyệt, dữ liệu khí tượng chính thức) → **bách khoa uy tín** (Britannica, Wikipedia chỉ để tìm nguồn gốc, không làm nguồn duy nhất) → **báo uy tín** (BBC, Reuters, AP, The Guardian, National Geographic, Smithsonian) → khác. Blog du lịch, diễn đàn, mạng xã hội, video YouTube khác chỉ để gợi ý, không làm nguồn.
- Mức độ xác thực A/B/C/D và quy trình hai mô hình (Claude rồi Gemini, không thấy kết quả của nhau) theo `kenh/ho-so-kenh.md`, mục "Kiểm chứng". Tóm tắt cổng:
  - **D (không kiểm chứng được) → bỏ khỏi video.**
  - **C (nguồn mâu thuẫn) → lời đọc phải nói rõ** ("estimates vary", "according to…", "locals say…"), và khẳng định được đánh dấu `hedged: true`.
  - Hai mô hình lệch nhau → tra lần ba, sửa lời dè dặt hơn, hoặc bỏ.
- Số liệu thay đổi theo thời gian (dân số, nhiệt độ kỷ lục, giá) ghi rõ năm của số liệu trong lời hoặc trên hình ("as of the 2020 census").
- Kỷ lục ("coldest", "highest", "most remote") là chỗ dễ sai nhất: nói rõ tiêu chí ("the coldest *permanently inhabited* town", "highest city *over 50,000 people*") và để mức C nếu nguồn tranh cãi.
- Không chép nguyên văn câu trong bài báo, bách khoa; tối đa một câu trích ngắn có nói nguồn. Lời đọc là lời kể mới của kênh.
- Mô tả video có mục **Sources** liệt kê nguồn chính (tiếng Anh) cho người xem.

## 3. Hình ảnh

| Nguồn | Được dùng? | Điều kiện |
|---|---|---|
| Ảnh AI kênh tự tạo (Gemini image) | Có, nguồn chính cho cảnh minh hoạ | Phong cách minh hoạ phẳng, rõ là tranh vẽ; **không** làm ảnh như ảnh chụp về nơi có thật, người thật, sự kiện có thật. Không nhắc tên hoạ sĩ, studio, nhân vật có sẵn trong prompt (dễ vi phạm, tài liệu [T27]). Lưu prompt, model, ngày tạo vào manifest. Ảnh AI chỉ từ prompt không có bản quyền ở Mỹ: người khác chép được; dấu ấn riêng của kênh nằm ở Wob, bản đồ, cách dựng |
| Ảnh AI tạo trên ChatGPT web / Gemini web, gói miễn phí (skill `tao-anh-web`, chốt 15/11/2026) | Có, có điều kiện | Cùng điều kiện như ảnh AI ở dòng trên, thêm: **chỉ tài khoản riêng** (không phải tài khoản Google/YouTube giữ kênh), vì điều khoản OpenAI cấm trích xuất Output tự động và Google có thể khoá truy cập bất thường (người làm kênh đã chấp nhận rủi ro); xem từng ảnh, **ảnh có watermark không dùng** và không cắt, xoá watermark (Gemini miễn phí ở Việt Nam có ngôi sao hiện trên ảnh); giữ bản gốc ở `assets/ai/goc/`; manifest có `nguon`, `watermark_da_kiem`, `tai_khoan_rieng`, không thì `kiem_tra_ban_quyen.py` CHẶN |
| Bản đồ vẽ bằng code (D3 + Natural Earth) | Có, nguồn chính cho bản đồ | Natural Earth là public domain. Mặc định dùng bản **theo quan điểm Việt Nam** (`ne_10m_admin_0_countries_vnm`), xem mục 6 |
| Wikimedia Commons | Có, khi cần ảnh thật | Chỉ **CC0, Public Domain, CC BY, CC BY-SA**. Ghi công đúng tác giả + giấy phép + link trong mô tả. **Không** dùng CC BY-NC, CC BY-ND (kênh có cắt, phóng, phủ chữ), "fair use" của Wikipedia. `commons.py` tự kiểm và từ chối |
| Ảnh của cơ quan chính phủ Mỹ (NASA, NOAA, USGS…) | Có, khi trang ghi rõ public domain | Ghi nguồn; kiểm từng ảnh vì một số ảnh trên trang chính phủ thuộc bên thứ ba |
| Google Images, Pinterest, ảnh báo, ảnh Instagram, Google Maps/Street View, ảnh chụp màn hình video khác, ảnh có watermark | **Không** | |
| Cảnh, clip cắt từ video, phim tài liệu, stream của người khác | **Không** | Kể cả vài giây, đã crop, lật, đổi tốc độ |
| Clip AI tạo từ ảnh (image-to-video) | Chỉ khi điều khoản công cụ cho thương mại | Đọc điều khoản trước khi dùng (Google Flow: chưa kiểm tra, tài liệu mục 10). Ghi vào manifest như ảnh AI |
| Ảnh AI mô phỏng ảnh chụp nơi có thật, người thật | **Không** | Gây hiểu lầm, và rơi vào diện bắt buộc gắn nhãn (mục 7) |

## 4. Âm thanh

- **Giọng đọc**: Azure AI Speech (dịch vụ chính thức, được dùng thương mại theo gói Azure). Edge TTS chỉ để nháp, `kiem_tra_ban_quyen.py` CHẶN bản giao dùng Edge. **Ngoại lệ tạm (chốt 16/11/2026):** khi `.env` có `CHO_PHEP_EDGE=1` (kênh chưa kiếm tiền), Edge hạ xuống cảnh báo; chỉ dùng giọng Neural có cùng tên trên Azure, video làm bằng Edge không bật quảng cáo, và trước khi bật kiếm tiền phải xoá cờ, lồng lại bằng Azure. **Không** dùng gói miễn phí ElevenLabs (cấm thương mại). Không nhân bản giọng người thật.
- **Nhạc nền** (`music/`): mỗi file một dòng trong `music/GIAY-PHEP.md` có cột Thương mại = `có` và bằng chứng; không có thì CHẶN. Không dùng nhạc phim, nhạc thương mại, nhạc tải từ YouTube, TikTok.
- **Sfx** (`sfx/`): cùng quy tắc sổ `sfx/GIAY-PHEP.md`. Cấm âm thanh meme cắt từ phim, TV, game, hệ điều hành.

## 5. Font, logo, tên

- Chỉ dùng font có giấy phép cho dùng thương mại và nhúng (SIL OFL…), file giấy phép để cạnh font trong `templates/_shared/fonts/`, mỗi file một dòng trong `GIAY-PHEP.md`.
- Logo, tên kênh, Wob không được giống thương hiệu khác. Không ngụ ý kênh hợp tác với cơ quan, thành phố, tổ chức du lịch khi không có.

## 6. Bản đồ và chủ quyền (luật Việt Nam)

- Kênh làm ở Việt Nam nên **không** được có bản đồ "đường lưỡi bò" hoặc bản đồ sai chủ quyền Việt Nam (Hoàng Sa, Trường Sa, Biển Đông), kể cả trong ảnh Commons, ảnh AI.
- `ve_ban_do.mjs` mặc định dùng Natural Earth theo quan điểm Việt Nam, và **đánh dấu** mọi bản đồ có khung chạm vùng Biển Đông (kinh độ 99–125°E, vĩ độ 0–26°N). Bản đồ bị đánh dấu phải được mở ra xem từng nét rồi ghi `chu_quyen_da_kiem: true` vào manifest; không thì `kiem_tra_ban_quyen.py` CHẶN.
- Ảnh AI không được vẽ bản đồ thật (AI vẽ bản đồ hay sai và có thể vẽ sai chủ quyền). Bản đồ luôn vẽ bằng code.
- Giai đoạn 1 ưu tiên đề tài không cần vẽ vùng Biển Đông. Không làm chiến sự, tranh chấp lãnh thổ đang nóng, địa chính trị (hồ sơ kênh).
- Biên giới tranh chấp khác (Kashmir, Crimea, Tây Sahara…): tránh vẽ cận; nếu buộc phải vẽ thì nói rõ "disputed" và không tô như lãnh thổ chắc chắn của một bên.

## 7. Nhãn AI

- **YouTube**: video hoạt hình hoàn toàn không bắt buộc gắn nhãn "altered or synthetic content". **Phải** gắn khi có cảnh trông như thật về người thật, sự kiện có thật (tài liệu [P15]). Liên tục không gắn khi phải gắn thì có thể bị đình chỉ YPP.
- **Luật Việt Nam**: Luật Trí tuệ nhân tạo (134/2025/QH15, hiệu lực 1/3/2026) yêu cầu nội dung AI có dấu hiệu nhận biết; Nghị định 142/2026/NĐ-CP, khoản 2 Điều 18 **bắt buộc** gắn nhãn khi mô phỏng ngoại hình, giọng nói người thật hoặc **tái hiện sự kiện có thật**. Tập nào có cảnh AI tái hiện một sự kiện có thật (một trận bão, một lần dời thị trấn…) thì gắn nhãn trên hình ở cảnh đó và trong mô tả.
- **Chính sách kênh** (hồ sơ kênh): mọi mô tả có dòng "Narration voice and illustrations are AI-assisted. Every claim was checked by two independent AI models against the sources listed below."

## 8. Nội dung và người dân

- **Không đùa về người dân** nơi đó, không chê nghèo, không định kiến dân tộc, tôn giáo (hồ sơ kênh). Đùa về thời tiết, địa hình, nỗi khổ của Wob.
- Người bản địa, cộng đồng thiểu số: gọi đúng tên họ tự gọi, nói theo nguồn của chính cộng đồng hoặc nguồn học thuật; không kể văn hoá của họ như chuyện lạ.
- Không phỉ báng: không cáo buộc cá nhân, công ty, chính quyền nếu không có nguồn chính thức hoặc báo uy tín, và phải nói rõ ai cáo buộc.
- Không dùng ảnh nhận ra mặt người thật không phải người của công chúng trừ khi giấy phép ảnh cho phép và bối cảnh không làm hại họ.
- Không khuyến khích đến nơi nguy hiểm, vào khu cấm.

## 9. Nội dung không xác thực, làm hàng loạt

- YouTube không cho kiếm tiền với nội dung "made with a template", ít khác biệt giữa các video, trình chiếu ảnh có rất ít lời dẫn, hoặc chỉ đọc lại tài liệu người khác viết (tài liệu mục 2.1). Kênh có nhiều video như vậy có thể bị loại khỏi YPP; bị loại thì 21 ngày để kháng nghị, 90 ngày sau mới nộp lại.
- Hàng rào của kênh (chi tiết ở `.claude/rules/thuong-hieu.md`): mỗi tập một lập luận và một phán quyết riêng; không lặp câu mở, câu kết, khuôn tiêu đề; `nhat-ky.md` lưu quy trình làm từng tập làm bằng chứng kháng nghị.
- Một kênh trên YouTube. Không trang trại kênh, không đổi email tạo kênh mới (chính sách spam áp dụng cho cả mạng lưới kênh phối hợp).

## 10. Khi bị nhận quyền hoặc khiếu nại

- Content ID nhận quyền: mở `ban-quyen.md` của dự án; nếu là nhạc có giấy phép thì kháng nghị kèm bằng chứng.
- Gỡ video, cảnh cáo bản quyền, bị loại khỏi YPP: báo người làm kênh ngay, không đăng lại video đó, dừng dùng loại tài nguyên liên quan cho tới khi xem xét xong.
- Không bao giờ tự gửi kháng nghị hay phản hồi pháp lý thay người làm kênh; chỉ soạn nháp kèm bằng chứng (`nhat-ky.md`, `kiem-chung/`, `ban-quyen.md`).

## Căn cứ

Nguồn về YouTube, công cụ, chi phí (link, ngày tra 14/11/2026): `docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md` mục "Nguồn" và `docs/du-lieu-kenh-dai-2026-11-14/ghi-chu-agent/`. Căn cứ pháp lý Việt Nam và chính sách nền tảng dưới đây chép từ bộ luật của GameReel (tra ngày 28/09/2026):

- Luật Trí tuệ nhân tạo (số 134/2025/QH15, hiệu lực 1/3/2026): https://genk.vn/tu-hom-nay-1-3-luat-tri-tue-nhan-tao-co-hieu-luc-noi-dung-ai-tao-ra-phai-co-dau-nhan-biet-165260301185217976.chn
- Nghị định 142/2026/NĐ-CP, hai trường hợp bắt buộc gắn nhãn nội dung AI: https://luatvietnam.vn/tin-van-ban-moi/2-truong-hop-noi-dung-do-ai-tao-ra-bat-buoc-phai-gan-nhan-tu-01-5-2026-186-108836-article.html
- Bộ VHTTDL về "đường lưỡi bò": https://bvhttdl.gov.vn/ngan-chan-duong-luoi-bo-phi-phap-chong-viec-tuyen-truyen-sai-lech-ve-chu-quyen-quoc-gia-20230719085600357.htm
- YouTube, nhãn nội dung thay đổi hoặc tổng hợp: https://blog.youtube/news-and-events/disclosing-ai-generated-content/
- YouTube, chính sách kiếm tiền (nội dung không nguyên bản, nội dung dùng lại): https://support.google.com/youtube/answer/1311392
- YouTube làm rõ chính sách nội dung không xác thực (16/7/2026): https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/
- YouTube, chính sách spam (áp dụng cả mạng lưới kênh phối hợp): https://support.google.com/youtube/answer/2801973
- Microsoft về Edge TTS và dùng thương mại: https://learn.microsoft.com/en-us/answers/questions/2088770/are-opensource-edge-tts-free-for-commercial-use
- Natural Earth (public domain, bản theo quan điểm từng nước): https://www.naturalearthdata.com/
- Wikimedia Commons, giấy phép được dùng lại: https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia
