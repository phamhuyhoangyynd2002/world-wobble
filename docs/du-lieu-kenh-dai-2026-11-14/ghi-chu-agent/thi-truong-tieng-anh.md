# Thị trường TIẾNG ANH: kênh YouTube video dài, không lộ mặt, hoạt hình/minh hoạ, có dùng AI

Ngày tra: 14/11/2026. Phạm vi: chỉ thị trường tiếng Anh (thị trường Nhật và chính sách YouTube do người khác làm, ở đây chỉ nhắc chính sách khi nguồn gắn với phản ứng của khán giả).

Quy ước:
- **[Nguồn Ex]**: điều nguồn nói, nguồn đã mở được, có ngày đăng.
- **[Đo]**: tôi tự kiểm tra trực tiếp trên YouTube (tải trang kênh bằng curl ngày 14/11/2026, đọc `og:title`, `vanityChannelUrl`, `externalId`, mô tả kênh). Không ghi số người đăng ký, vì bạn sẽ đo bằng yt-dlp.
- **Nhận định**: suy luận của tôi, không phải số liệu.
- "không mở được nguồn gốc": chỉ thấy trong đoạn trích tìm kiếm hoặc bài đưa lại, không dùng làm kết luận.

---

## 1. Danh sách kênh để đo

File: `kenh-en.tsv` (cùng thư mục), có 76 kênh chia 11 mảng, cột `mang, handle_hoac_url, ten_kenh, loai (moc|moi), dung_AI (co|khong|khong-ro), ma_nguon`.

### 1.1 Cách xác minh handle [Đo, E23]
- Mọi handle trong TSV đều mở được ở `https://www.youtube.com/@<handle>` ngày 14/11/2026 (HTTP 200). Tên kênh lấy từ `og:title` khớp với tên trong TSV. Tôi ghi handle đúng như `vanityChannelUrl` YouTube trả về. YouTube không phân biệt hoa thường ở handle.
- Đã loại hoặc sửa các handle sai:
  - `@SleepyHistory` là một kênh tiếng Thái ("ประวัติศาสตร์ข้างหมอน"), không phải "Sleepy History" như đề bài nêu. Tìm theo tên "Sleepy History" ra nhiều kênh nhỏ (`@SleepyHistoryShow`, `@Sleepy-History-Official`, `@TheSleepyHistoryChannel`…). Chưa có nguồn nào nói về các kênh này, nên tôi không đưa vào TSV.
  - Company Man có handle thật là `@companyman114`. Trang `@companyman` là một kênh khác, không có mô tả.
  - Casual Geographic có handle thật là `@mndiaye_97`. Trang `@CasualGeographic` tự ghi "I am not actually Casual Geographic".
  - Handle `@BoringHistoryofficial` mà Fortune [E3] dẫn link hiện trả lỗi **404**. Kênh "Boring History" của Adavia Davis **chưa xác định được handle hiện tại**. Còn `@OfficialBoringHistory` (Starbelo [E19] nêu) có mô tả theo kiểu "roasted, toasted" và không nói về giấc ngủ, nên **không chắc** đây là kênh Fortune viết.
  - `@PracticalPsychologyTV`, `@WhatIfShow`, `@HistoryBeforeSleep`, `@SproutsSchools`, `@Alltime10s` không tồn tại hoặc không có dữ liệu. Tôi bỏ Alltime10s vì không tìm được handle gốc.
- **Hai kênh trùng tên "Sleepless Historian"**: `@SleeplessHistorian` (ID `UCy3Hgwj12x3fDQUcutNm2DA`) là kênh lớn mà vidIQ và Starbelo [E19] dùng. `@SleeplessHistorianOfficial` (ID `UCyy_7Oqjjql84IZM7ETtklQ`) là kênh rất nhỏ, mô tả theo khuôn khác. Tìm tiêu đề video mà 404 Media nêu ("Boring History For Sleep | How Medieval PEASANTS Survived The Coldest Nights and more") ra video trên `@SleeplessHistorian`.
- **Chưa xác định chắc** handle của hai kênh 404 Media [E2] chỉ nêu tên:
  - "History Before Sleep": có ít nhất 3 kênh trùng tên (`@historybeforesleep88`, `@HistoryBeforeSleep-p9y`, `@HistoryBeforeSleepps`). TSV ghi `@historybeforesleep88` vì kênh này đứng đầu kết quả tìm kiếm.
  - "The Snoozetorian": có ít nhất 6 kênh trùng tên hoặc gần giống (`@thesnoozetorian` hiện mang tên "The Anoozetorian" và không có mô tả, `@SleepySnoozetorian`, `@Snoozetorian1`, `@SnoozetorianHistory`, `@THESnoozetorianmini`, `@SleepyWisdomUSA`). TSV ghi `@SleepySnoozetorian` vì mô tả của kênh này đúng thể loại lịch sử ru ngủ, nhưng **chưa chắc** đây là kênh 404 Media nói tới.

### 1.2 Kênh có bằng chứng dùng AI (cột `dung_AI = co`)
| Kênh | Căn cứ |
|---|---|
| @SleeplessHistorian | [E2] Phóng viên 404 Media đánh giá là AI: giọng đọc bị lỗi ("FEEEE"), giọng Anh giả. Video "How Medieval PEASANTS Survived…" dài 2 giờ, có 2,3 triệu lượt xem lúc đăng bài (03/09/2025). Đây là đánh giá của phóng viên, kênh không tự công bố. Mô tả kênh hiện chỉ có link Spotify và email tài trợ [Đo]. |
| @BoringHistoryBites | [E2] có tên trong danh sách 404 Media. **Kênh tự ghi** trong mô tả [Đo]: "DISCLAIMER INAUTHENTIC CONTENT: THIS VIDEO PRESENTS AN AI-GENERATED VISUAL RECONSTRUCTION… USING ARTIFICIAL INTELLIGENCE". |
| @BoringHistorySecrets | **Kênh tự ghi** đoạn miễn trừ giống hệt Boring History Bites, chỉ khác tên người sáng lập (Bites ghi "Mr Hoat", Secrets ghi "Michael Tan") [Đo]. Blog [E17] gọi đây là video "fully AI-made". |
| @HistorianSleepy, @Dreamoria | [E2] có tên trong danh sách kênh mà 404 Media cho là AI. Lưu ý: mô tả hiện tại của Dreamoria nói kênh đăng Shorts, truyện hư cấu và truyện thật [Đo]. Có thể kênh đã đổi nội dung, cần đo lại. |
| @NewMind, @ModernMBA, @HowMoneyWorks | [E20] OutlierKit (bên bán công cụ) ghi các kênh này dùng "AI-assisted narration". **Độ tin thấp**: không thấy kênh tự ghi. Mô tả của Modern MBA còn nhấn mạnh phân tích "you won't get from a search engine or LLM" [Đo]. |

- `dung_AI = khong` chỉ ghi khi có nguồn: Kurzgesagt (YouTube xác nhận đã gắn nhầm cờ AI slop cho video do người làm [E6]; video [E15] nói kịch bản do 2–3 người kiểm chứng) và History Time (404 Media giới thiệu Pete Kelly là người tự nghiên cứu, tự làm [E2]).
- Các kênh còn lại ghi `khong-ro`. Kể cả "Sciencephile the AI": tên kênh có chữ AI nhưng tôi không tìm thấy nguồn nói kênh dùng AI để sản xuất.

### 1.3 Kênh "mới" có nguồn nêu tên (2024–2026)
- Sleep history (404 Media [E2], 03/09/2025): Sleepless Historian, Boring History Bites, History Before Sleep, The Snoozetorian, Historian Sleepy, Dreamoria. Năm lập kênh **chưa xác minh**, cần đo bằng yt-dlp.
- Boring History của Adavia Davis (Fortune [E3], 30/12/2025): handle trong bài hiện là 404 (xem 1.1).
- Starbelo [E19] (không ghi ngày đăng, số liệu kiểm ngày 20/10/2026) nêu các kênh nhỏ đang lên theo khuôn của kênh lớn: Ifverse (`@IfverseTales`, what-if người que), The Curious Stick (lịch sử người que), SwarmTheory (đối đầu giữa các loài vật; phần credit ghi tên người viết, người đọc, hoạ sĩ và người dựng), GoDocs (địa lý minh hoạ). Starbelo **không tìm thấy nguồn** nói các kênh này dùng AI.
- True Crime Case Files (Tubefilter [E4], 14/02/2025): kênh true crime AI, hơn 150 video, toàn bộ vụ án là bịa. Một video 26 phút có khoảng 2 triệu lượt xem và được bật kiếm tiền. YouTube đã **xoá kênh** vì vi phạm nguyên tắc cộng đồng, trong đó có chính sách an toàn trẻ em. Kênh không còn để đo nên không có trong TSV.
- **[Đo] Hiện tượng nhân bản tên kênh**: tìm "Boring History" ra `@OfficialBoringHistory`, `@OfficalBoringHistory`, `@Boringhistorysleeper`, `@DullHistorySleep`, `@BoringHistory_101`, `@theboringhistorians`, `@MOSTBORINGHISTORYOFEVER`… Riêng tiêu đề video mà 404 Media nêu bị nhiều kênh khác chép lại gần nguyên văn.
  - Nhận định: mảng "history for sleep" đã có rất nhiều bản sao, tên kênh và tiêu đề gần như trùng nhau. Muốn nổi bật trong mảng này bằng cùng một khuôn là khó.

---

## 2. Báo cáo, bài phân tích về kênh faceless và AI làm video dài (2025–2026)

### 2.1 Quy mô "AI slop"
- [Nguồn E1] Kapwing, "AI Slop Report", 28/11/2025, số liệu đến 10/2025:
  - Cách làm: xét 100 kênh thịnh hành nhất ở mỗi nước (theo playboard.co), số liệu kênh lấy từ Social Blade.
  - Số kênh chỉ đăng nội dung AI slop trong top 100: Pakistan 20, Ai Cập 14, Hàn Quốc 11, **Mỹ 9**, Tây Ban Nha 8.
  - Tài khoản mới: trong 500 video Shorts đầu tiên, 104 video (21%) là AI, 165 video (33%) là "brainrot".
  - Kênh dẫn đầu: Bandar Apna Dost (Ấn Độ), 2,07 tỉ lượt xem, ước tính khoảng 4.251.500 USD/năm (ước theo Social Blade, không phải số kênh công bố).
  - Báo cáo **không** tách riêng mảng video dài hay mảng giáo dục.
- [Nguồn E5] Search Engine Journal (02/03/2026) dẫn lại Kapwing: 278 kênh chỉ đăng AI slop trên tổng 15.000 kênh, tổng 63 tỉ lượt xem, 221 triệu người đăng ký, ước tính 117 triệu USD/năm. Tôi **không thấy** các con số tổng này trên trang Kapwing đã mở, nên đây là số dẫn lại.
- Guardian (phân tích dữ liệu Playboard, 2025): 9 trong 100 kênh tăng nhanh nhất tháng 7/2025 chỉ đăng nội dung AI. **Không mở được nguồn gốc** (theguardian.com chặn công cụ). Số này chỉ thấy qua [E5] và đoạn trích tìm kiếm.

### 2.2 Case study video dài
- [Nguồn E3] Fortune, 30/12/2025, về Adavia Davis, 22 tuổi:
  - Có 5 kênh đang chạy. Kênh lãi nhất là "Boring History", video "history to sleep to" dài tới 6 giờ.
  - Công cụ: dây chuyền TubeGen do cộng sự tự viết, Claude viết kịch bản và tạo hình, ElevenLabs đọc lời. Chi phí có thể chỉ khoảng 60 USD mỗi video.
  - Doanh thu **tự công bố** 40.000–60.000 USD/tháng, chi phí khoảng 6.500 USD/tháng (tự công bố).
  - Fortune tự ước khoảng 700.000 USD/năm sau khi xem ảnh chụp số liệu phân tích và lịch sử thanh toán AdSense.
  - Toàn mạng lưới khoảng 2 triệu lượt xem/ngày (tự công bố).
  - Davis cho rằng còn khoảng tới năm 2027 thì mô hình này còn sinh lời.
- [Nguồn E21] HackerNoon, 02/10/2026: "Alex" tự công bố kiếm khoảng 250.000–300.000 USD trong 3 năm, làm các mảng lịch sử, true crime, thần thoại, khoa học phổ thông, tâm lý (tiếng Séc). **Tác giả bài làm ở công ty bán trình duyệt chống phát hiện**, có lợi ích thương mại. Số liệu chưa kiểm chứng.
- [Nguồn E2] 404 Media, 03/09/2025:
  - Hầu hết video sleep history trong danh sách dài trên 3 giờ.
  - Một kênh không nêu tên phát trực tiếp nội dung này 24/7 suốt nhiều tuần.
  - Bài viết cho biết chưa rõ đợt siết nội dung "mass produced" của YouTube có làm giảm loại nội dung này hay không.

### 2.3 Phản ứng của khán giả, giới làm nghề và nền tảng
- [Nguồn E2, E16] Pete Kelly (History Time) cho rằng các video này "not accurate", hình ảnh "completely inaccurate often". Theo ông, trước đây làm một video mất 6 tháng nghiên cứu, giờ người ta làm trong một ngày.
- [Nguồn E16] WizCase, 04/09/2025, dẫn 404 Media:
  - Kênh Ancient Americas chê video AI "vague and surface-level", hình kiểu "slideshow-quality".
  - Kênh "The French Whisperer" cho biết lượt xem giảm 60% trong một năm và cho là do nội dung AI.
- [Nguồn E15] Kurzgesagt đăng video "AI Slop Is Destroying The Internet" ngày 07/10/2025, dài 592 giây [Đo metadata].
- [Nguồn E6] Dexerto, 07/08/2026:
  - Hệ thống phát hiện AI slop của YouTube gắn nhầm cờ cho video "superpredators" của Kurzgesagt (hoạt hình do người làm). Video có kết quả tệ nhất của kênh kể từ 2013 dù các chỉ số đều cao hơn mức trung bình.
  - YouTube xác nhận đây là lỗi. Kurzgesagt gỡ video để đăng lại.
  - Một kênh khoảng 5 triệu người đăng ký (không nêu tên) cũng bị sụt tương tự.
  - Bài **Kotaku** cùng chủ đề trả lỗi 403, không mở được.
  - Nhận định: phong cách vector phẳng kiểu Kurzgesagt có thể bị máy nhầm là AI. Kênh hoạt hình làm bằng AI hay không cũng chịu rủi ro này. Cần có dấu ấn hình ảnh riêng và tín hiệu "có người làm" (credit, nguồn tham khảo).
- [Nguồn E7] Raptive, cập nhật 22/08/2025, khảo sát 3.000 người trưởng thành ở Mỹ:
  - Khi người xem **nghi** nội dung do AI làm (dù thật ra không phải): độ tin cậy giảm 48%, độ chân thực giảm 57%, gắn kết cảm xúc giảm 60%.
  - Quảng cáo đặt cạnh nội dung đó: ý định mua giảm 14%.
  - Đây là khảo sát về nội dung nói chung, không riêng YouTube.
- [Nguồn E8] Thư CEO YouTube, 21/01/2026:
  - Thừa nhận lo ngại về "AI slop" và sẽ dựa trên hệ thống chống spam, chống clickbait để giảm "low quality AI content".
  - Tháng 12/2025 trung bình có hơn 1 triệu kênh dùng công cụ AI của YouTube mỗi ngày.
  - Phần chính sách chi tiết do người khác làm.
- [Nguồn E18] Blog cá nhân của Bill Conrad (Goodreads, 05/11/2025), chỉ dùng tham khảo:
  - Ông chặn hết kênh dùng giọng máy, sau đó chặn cả kênh không có người dẫn.
  - Ông thấy kênh lịch sử Thế chiến II làm bằng AI có "glaring flaws", và nhiều kênh dùng cùng một khuôn.
- [Nguồn E17] Blog Professional Moron (07/02/2026), chỉ dùng tham khảo:
  - Người viết **thích** video Boring History để ngủ.
  - Điểm trừ: sau khoảng 60 phút thì nội dung lặp lại, hay nói "modern scholars think" mà không dẫn nguồn.
  - Điểm cộng: có câu cửa miệng "You probably won't survive this", người xem để lại bình luận nơi ở và giờ địa phương để tạo cảm giác cộng đồng.
- Reddit: **không truy cập được** (công cụ bị chặn reddit.com). Chưa có trích dẫn bình luận Reddit.

### 2.4 Niche "đang lên" theo bài của bên bán công cụ (độ tin thấp)
- [Nguồn E20] OutlierKit, cập nhật 13/09/2026:
  - Liệt kê các mảng mới: "sleep-focused storytelling", "niche history compilations", "AI kids explainers"… **không kèm số liệu tăng trưởng**.
  - Bảng CPM tự ghi là "planning estimates, not a survey": lịch sử và true crime 5–12 USD, giấc ngủ và thư giãn 4–10 USD, tài chính 15–45 USD.
  - **Không dùng làm kết luận.**
- Các bài "phân tích 10.000 kênh faceless" (reelsmakerai, frameloop, miraflow…) chỉ thấy qua đoạn trích tìm kiếm, đều của bên bán công cụ AI, không có dữ liệu gốc. **Không dùng.**

---

## 3. Xu hướng khán giả có nguồn

- **YouTube xem trên TV (Mỹ)**:
  - [Nguồn E9] YouTube, 11/02/2025: tính theo thời lượng xem, TV là thiết bị xem YouTube số 1 ở Mỹ (tính đến 12/2024). Trung bình hơn 1 tỉ giờ xem YouTube trên TV mỗi ngày (toàn cầu).
  - [Nguồn E11] TheWrap, 22/10/2026 và [E12] Tubefilter, 22/10/2026: theo Nielsen The Gauge tháng 8/2026, YouTube chiếm **15,8%** tổng thời gian xem TV ở Mỹ, cao kỷ lục, gấp đôi Netflix (7,7%). Nhóm từ 50 tuổi trở lên xem nhiều hơn 9%.
  - Trang gốc của Nielsen trả lỗi 403, không mở được.
- **Podcast trên TV**: [Nguồn E10] YouTube, 18/12/2025: tháng 10/2025 người xem xem hơn **700 triệu giờ podcast** trên thiết bị phòng khách, so với 400 triệu giờ một năm trước. [E13] TechCrunch (14/05/2026) đưa lại số này, kèm số hơn 2 tỉ giờ Shorts trên TV mỗi tháng.
- **Học trên YouTube**:
  - [Nguồn E8] Theo khảo sát Kantar 2025, 93% người xem ở Mỹ từ 18–27 tuổi nói YouTube giúp họ học kỹ năng mới.
  - Theo khảo sát Oxford Economics 2025, 79% giáo viên Mỹ có dùng YouTube nói YouTube giúp học sinh học.
  - Cả hai số đều do YouTube dẫn trong thư CEO.
- **Culture & Trends 2026**: [Nguồn E14] Tubefilter, 10/09/2026, dẫn dữ liệu NRG:
  - 67% người 14–44 tuổi xem nhiều kênh "no one else they personally know is watching" hơn so với 5 năm trước.
  - 65% đồng ý rằng nội dung "feels more real or legitimate" khi xuất hiện trên YouTube.
  - Bài không nói về giáo dục, nội dung ngủ hay nội dung AI.
- **Think with Google** (86% người xem ở Mỹ thường dùng YouTube để học điều mới; 500 triệu lượt xem nội dung học tập mỗi ngày): **không mở được nguồn gốc** (trang chuyển hướng sang business.google.com). Số liệu này cũng là dữ liệu cũ (2017–2019).
- **Google Trends**: chưa tìm thấy dữ liệu đã công bố về "history for sleep", "sleep documentary"… Tôi chưa tự kéo được (trang Trends cần JavaScript). Nếu cần thì đo bằng pytrends.
- **Nội dung ngủ**: chưa tìm thấy báo cáo chính thức năm 2025–2026 về độ tăng của mảng này. Số theo dõi của vidIQ chỉ là ước tính, không dùng.

---

## 4. Khoảng trống (Nhận định, dựa trên nguồn ở mục 2–3)

1. **Lịch sử, khoa học ru ngủ "có kiểm chứng"**
   - Cầu: đã có video sleep history 2 giờ đạt 2,3 triệu lượt xem [E2], và có kênh tự công bố doanh thu cao [E3].
   - Chất lượng: lời phàn nàn lặp lại ở nhiều nguồn là sai sự thật, lặp ý sau khoảng 60 phút, không dẫn nguồn, hình sai thời kỳ [E2][E16][E17].
   - Tên kênh và tiêu đề bị nhân bản tràn lan [Đo].
   - Khoảng trống: video ngủ dài nhưng có danh mục nguồn, hình minh hoạ đúng thời kỳ, giọng ổn định, không lặp ý. Muốn phân biệt được thì phải có thương hiệu nhìn ra ngay, không theo khuôn "Boring History…".
   - Chưa có số liệu đo chất lượng của cả mảng.
2. **Hoạt hình vui nhộn, có nhân vật riêng cho video dài 8–30 phút**
   - Các kênh mốc có giọng hài và nhân vật (OverSimplified, Sam O'Nella, Half as Interesting) là kênh do người làm.
   - Nhóm kênh AI có nguồn nêu tên gần như toàn là giọng ru ngủ đều đều, ảnh AI tĩnh.
   - Nhận định: ít thấy kênh AI làm hài có chất lượng. Đây là suy luận từ danh sách, **chưa đo**. Cần đo số video và lượt xem trung bình của nhóm "moi" để xác nhận.
3. **Xem trên TV và nghe như podcast**
   - YouTube chiếm 15,8% thời gian xem TV ở Mỹ [E11], podcast trên TV tăng từ 400 lên 700 triệu giờ/tháng [E10], nhóm từ 50 tuổi trở lên tăng 9% [E11].
   - Nhận định: video dài kiểu giải thích, kể chuyện, nghe được mà không cần nhìn có môi trường xem tốt. Kênh nên làm sao cho xem trên TV vẫn đẹp (độ phân giải, chữ đủ to).
4. **Mảng nên tránh hoặc rất cẩn trọng**
   - True crime AI bịa chuyện đã bị xoá kênh [E4].
   - Nội dung trẻ em gặp rủi ro chính sách (đã nêu ở [E1] [E21]).
   - Phong cách vector phẳng kiểu explainer có thể bị máy phát hiện AI gắn nhầm cờ [E6].
5. **Rủi ro niềm tin**: người xem chỉ cần **nghi** là AI thì độ tin cậy đã giảm 48% [E7]. Nhận định: nên công khai rõ phần nào dùng AI và nhấn vào phần do người làm (nghiên cứu, kiểm chứng, nguồn), thay vì giấu.

---

## 5. Chưa tìm thấy hoặc không mở được
- Danh sách kênh AI faceless tiếng Anh do báo chí nêu tên trong các mảng địa lý, kinh tế, tâm lý, sinh vật, what-if, kể chuyện Reddit: **chưa tìm thấy** bài báo uy tín nào nêu tên cụ thể. Chỉ có bài của bên bán công cụ ([E19], [E20]).
- Năm lập kênh của các kênh "moi": chưa xác minh. Cần đo `channel creation date` bằng yt-dlp hoặc trang About.
- Kênh Boring History của Adavia Davis: link trong Fortune đã 404.
- Nguồn gốc của Guardian (Playboard 9/100, bài 12/2025 về người làm AI slop ở nước thu nhập trung bình), Nielsen (403), Kotaku (403), báo cáo Columbia SIPA "AI Slop and the Information Ecosystem" (6/2026, PDF không đọc được), Think with Google (chuyển hướng), Reddit (bị chặn): **không mở được nguồn gốc**.
- Bright Side và The Infographics Show có dùng AI không: **chưa tìm thấy** nguồn nào.

---

## 6. Danh mục nguồn
- [E1] Kapwing, "AI Slop Report: The Global Rise of Low-Quality AI Videos", 28/11/2025. https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/
- [E2] Jason Koebler, 404 Media, "AI Generated 'Boring History' Videos Are Flooding YouTube and Drowning Out Real History", 03/09/2025. https://www.404media.co/ai-generated-boring-history-videos-are-flooding-youtube-and-drowning-out-real-history/
- [E3] Eva Roytburg, Fortune, bài về Adavia Davis và các kênh AI faceless, 30/12/2025. https://fortune.com/2025/12/30/ai-slop-faceless-youtube-accounts-adavia-davis-user-generated-content/
- [E4] Tubefilter, "YouTube shuts down 'true crime' channel that was all AI lies", 14/02/2025. https://www.tubefilter.com/2025/02/14/youtube-true-crime-case-files-ai-crime-channel-terminated/
- [E5] Matt G. Southern, Search Engine Journal, "YouTube's AI Slop Problem And How Marketers Can Compete", 02/03/2026. https://www.searchenginejournal.com/youtubes-ai-slop-problem-and-how-marketers-can-compete/567297/
- [E6] Michael Gwilliam, Dexerto, bài về việc hệ thống phát hiện AI slop của YouTube gắn nhầm cờ cho Kurzgesagt, 07/08/2026. https://www.dexerto.com/youtube/youtubes-ai-slop-detector-incorrectly-targets-kurzgesagt-as-other-creators-fear-same-fate-3395930/
- [E7] Raptive, "The 'AI stink' is real, and it's costing brands", cập nhật 22/08/2025. https://raptive.com/blog/the-ai-stink-is-real-and-its-costing-brands/
- [E8] Neal Mohan, YouTube Blog, "The Future of YouTube 2026", 21/01/2026. https://blog.youtube/inside-youtube/the-future-of-youtube-2026/
- [E9] Neal Mohan, YouTube Blog, "Our Big Bets for 2025", 11/02/2025. https://blog.youtube/inside-youtube/our-big-bets-for-2025/
- [E10] YouTube Blog, "Podcasts in the living room in 2025", 18/12/2025. https://blog.youtube/news-and-events/podcasts-living-room-in-2025/
- [E11] TheWrap, bài về Nielsen The Gauge tháng 8/2026, 22/10/2026. https://www.thewrap.com/media-platforms/tv/youtube-netflix-disney-tv-viewership-nielsen-gauge-august-2026/
- [E12] Sam Gutelle, Tubefilter, "YouTube now gets twice as much watch time on U.S. TVs as any other platform", 22/10/2026. https://www.tubefilter.com/2026/10/22/nielsen-the-gauge-youtube-record-watch-time-share-us-tv/
- [E13] Amanda Silberling, TechCrunch, "YouTube viewers watch 2 billion hours of Shorts on TVs each month", 14/05/2026. https://techcrunch.com/2026/05/14/youtube-viewers-watch-2-billion-hours-of-shorts-on-tvs-each-month/
- [E14] Tubefilter, bài về báo cáo Culture & Trends, 10/09/2026. https://www.tubefilter.com/2026/09/10/youtube-culture-and-trends-report-mainstream-not-dead/
- [E15] Kurzgesagt, video "AI Slop Is Destroying The Internet", đăng 07/10/2025 (đọc metadata trang xem video). https://www.youtube.com/watch?v=_zfN9wnPvU0
- [E16] WizCase, "Historians Alarmed As AI Floods YouTube With Inaccurate History", 04/09/2025. https://www.wizcase.com/news/youtube-ai-history-creator-challenges/
- [E17] Professional Moron (blog), "The Sleepy World of Boring History AI Videos", 07/02/2026. https://professionalmoron.com/2026/02/07/the-sleepy-world-of-boring-history-ai-videos/ (blog cá nhân, chỉ tham khảo)
- [E18] Bill Conrad, "More YouTube AI Junk", Goodreads author blog, 05/11/2025. https://www.goodreads.com/author_blog_posts/26173927-more-youtube-ai-junk (ý kiến cá nhân, chỉ tham khảo)
- [E19] Starbelo, "What Faceless AI Creators Copy From YouTube's Giants", không ghi ngày đăng, số liệu kiểm 20/10/2026. https://starbelo.com/guides/faceless-ai-creators-youtube-giants/ (bên bán dịch vụ, độ tin trung bình–thấp)
- [E20] OutlierKit, "Best Faceless YouTube Niches & Channel Ideas in 2026", cập nhật 13/09/2026. https://outlierkit.com/resources/faceless-youtube-channels/ (bên bán công cụ, độ tin thấp)
- [E21] Sid Wudraq, HackerNoon, "He Made $300K from Videos People Fall Asleep To…", 02/10/2026. https://hackernoon.com/he-made-$300k-from-videos-people-fall-asleep-to-inside-youtubes-ai-slop-economy (tác giả có lợi ích thương mại)
- [E23] [Đo] Trang kênh YouTube `https://www.youtube.com/@<handle>` và trang tìm kiếm YouTube (lọc theo kênh), tải bằng curl ngày 14/11/2026. Script: `/private/tmp/claude-501/-Users-hoang-pham-Desktop-Gaming-related-videos/59b9540e-2b11-4964-a2cc-0c98ba3d5e92/scratchpad/scripts/yt_check.py`, `yt_search.py`.
