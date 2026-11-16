# Định hướng lại: hoạt hình "Wob kể chuyến đi"

> Ngày 16/11/2026. Viết sau khi người làm kênh xem bản giao tập 1 (Oymyakon) và chê "không khác mấy so với một bản trình bày PowerPoint".
> Căn cứ: đề bài gốc trong [danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md](danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md); số đo YouTube mới [du-lieu-kenh-dai-2026-11-14/youtube-tim-kiem-dinh-dang-ke-chuyen-2026-11-16.tsv](du-lieu-kenh-dai-2026-11-14/youtube-tim-kiem-dinh-dang-ke-chuyen-2026-11-16.tsv); nhật ký tập 1; tra web về công cụ (mục Nguồn).
> Trạng thái: **các quyết định ở mục 0 đã chốt**. Mục 7–9 là kế hoạch và câu hỏi còn mở, chưa làm.

## 0. Đã chốt (người làm kênh, 16/11/2026, qua AskUserQuestion)

| # | Quyết định |
|---|---|
| 1 | Kênh là **video hoạt hình**. Wob là **diễn viên trong cảnh vẽ** (hoạt hình cắt giấy 2D, nhiều lớp có parallax, Wob đi lại, cầm đồ vật, gag bằng hình), không phải linh vật đứng góc |
| 2 | **Bỏ hẳn ảnh chụp thật**. Mọi thứ là tranh vẽ |
| 3 | Định dạng: **Wob đi chuyến đó về rồi kể lại**: hành trình, các hoạt động ở vùng đất đó, mô tả nơi đã thăm |
| 4 | **Wob tự kể, ngôi thứ nhất**, giọng Andrew. Wob trong hồi ức chỉ phản ứng bằng **bong bóng thoại ngắn + tiếng líu lo** tự tổng hợp |
| 5 | Khung "hiện tại": **bàn có hộp kỷ vật + sổ du lịch** |
| 6 | Phông nền hồi ức: **ảnh AI phong cách risograph**, tách lớp; Wob và đồ vật chuyển động vẽ bằng **SVG** |
| 7 | Làm **bản thử ~75 giây với lời mới** để chốt phong cách, rồi mới làm lại cả tập 1 và áp cho tập 2–5. Tập 2 (Coober Pedy) tạm dừng |

## Tóm tắt

- **Không đổi hướng, mà quay về đề bài gốc.** Ngày 14/11 đề bài ghi "hoạt hình vui nhộn", kết luận là "hoạt hình hài có nhân vật riêng". Dây chuyền lệch khi chép lõi từ GameReel: template `explainer` dựng theo kiểu bản đồ + ảnh + thẻ số liệu, và mọi cổng tự động đều chỉ kiểm *đúng*, không kiểm *có phải hoạt hình không*.
- **Định dạng mới ghép hai thể loại đang rất mạnh trên YouTube** (đo 16/11): hoạt hình kể chuyến đi ngôi thứ nhất (JaidenAnimations "What my trip to Japan was like" 41,5 triệu lượt xem; 10/40 kết quả đầu "my trip animated" là của kênh này, trung vị video dài 12 triệu) và phim "tôi đã tới nơi khắc nghiệt" quay người thật (Ruhi Cenet, Oymyakon 122 triệu). Thứ kênh có mà cả hai không có: **câu hỏi "vì sao có người ở đây" và kiểm chứng hai mô hình**.
- **Xương sống của một tập là các hoạt động có thật ở vùng đất đó**, xếp thành hành trình theo thời gian. Mỗi chương là một việc Wob đã làm hoặc tận mắt thấy. Câu trả lời "vì sao người ta sống ở đây" lộ dần qua chuyến đi.
- **Ngôi thứ nhất cần luật trung thực mới:** chuyến đi là tưởng tượng, sự thật là thật. Chỉ nỗi khổ và phản ứng của Wob được hư cấu. Mọi thứ Wob "thấy" là khẳng định có nguồn (mục 4).
- **Điểm nghẽn lớn nhất là lượt ảnh AI miễn phí.** ChatGPT Free hết lượt sau vài ảnh mỗi ngày, Gemini web không tải ảnh về được (nhật ký tập 1). Phông nền cần khoảng 12–15 ảnh mỗi tập. Cần quyết: khoá Gemini API (khoảng 0,25–1 USD/tập) hoặc gói trả tiền, hoặc phông vẽ bằng code (mục 6, câu hỏi 1).
- **Lịch "5 tập trong 5 ngày" không còn giữ được** với bước dựng hoạt hình mới. Đề xuất: bản thử → tập 1 làm lại → các tập sau (mục 8).

## 1. Vì sao tập 1 lệch

| Triệu chứng (xem khung hình bản giao) | Gốc rễ |
|---|---|
| Wob đứng góc trái dưới như sticker, chỉ đổi biểu cảm | Template `explainer` coi Wob là lớp phủ (`frame.md`: "Wob góc trái dưới, cao khoảng 300px") |
| Nền là ảnh tĩnh trôi chậm, ba phong cách lẫn lộn (bản đồ phẳng, ảnh chụp ngựa Yakut, tranh risograph) | Kịch bản mô tả *nhịp hình* (`shots`), không mô tả *hành động*; ảnh AI thiếu lượt nên lấp bằng ảnh Commons |
| Chữ to giữa màn hình ("WHY HERE AT ALL?") | Kiểu `show: text` lấy từ khuôn video ngắn GameReel |
| Gag chỉ nằm trong lời ("Wob steps outside… They freeze anyway") nhưng hình không diễn | Không có hệ thống cho Wob *làm* việc gì; không có đạo cụ |
| Mọi cổng ĐẠT nhưng sản phẩm sai ý | Cổng kiểm đúng sự thật, bản quyền, kỹ thuật; không cổng nào hỏi "đây là hoạt hình hay trình chiếu?" |

Bài học ghi vào bộ nhớ: khi chấm một bản render, phải hỏi "trông như phim hoạt hình hay bộ slide?", không chỉ hỏi cổng có đạt không.

## 2. Bằng chứng thị trường cho định dạng mới

Đo bằng `yt_search.sh` (yt-dlp, 40 video đầu, chỉ video, hl=en, gl=US), ngày 16/11/2026. Dữ liệu thô: `youtube-tim-kiem-dinh-dang-ke-chuyen-2026-11-16.tsv`.

| Từ khoá | Trung vị lượt xem | Số video ≥ 1 triệu | Trung vị video ≥ 8 phút | Kênh nổi bật |
|---|---|---|---|---|
| my trip animated | 2.146.876 | 23 | 12.032.960 | JaidenAnimations (10/40) |
| animated storytime | 1.267.225 | 23 | 1.425.865 | 35 kênh khác nhau |
| i went to animated | 967.467 | 20 | 116.799 | lẫn phim hoạt hình TV |
| travel storytime animated | 852.620 | 18 | 995.250 | lẫn truyện thiếu nhi |
| living in the coldest place on earth animated | 158.095 | 14 | 801.106 | Ruhi Cenet, MrBeast (người thật) |
| what it's like to live in animated | 211.687 | 10 | 70.758 | lẫn thiếu nhi |
| animated travel story | 276 | 2 | 53.724 | hướng dẫn làm bản đồ |
| i spent a week in animated | 184 | 2 | 19.380 | rời rạc |

Video tiêu biểu: JaidenAnimations "What my trip to Japan was like" 41,5 triệu (10 phút), "I tried to go to Canada but got stuck in Minneapolis" 33,4 triệu, "An Uncomfortable Trip to the UK" 25,1 triệu, "Winter & My Traumatic Skiing Trip" 21,6 triệu; Ruhi Cenet "The Coldest Village on Earth: Oymyakon" 122 triệu (25 phút, người thật).

**Nhận định:**
- Hoạt hình kể chuyện ngôi thứ nhất ("storytime animation") là một thể loại riêng của YouTube: chuyện tự kể, thường hài, nhân vật dễ nhận ra, **hoạt hình đơn giản kiểu animatic** [S1]. Đây đúng là kiểu dựng mà SVG + GSAP làm được: tư thế nối tư thế, giữ hình, cắt nhanh, không cần hoạt hình từng khung.
- Hai thể loại lớn chưa gặp nhau: storytime kể chuyện đời tác giả, không giải thích địa lý; phim "tôi đã tới" giải thích bằng người thật, không hoạt hình. Từ khoá kiểu "animated travel story" gần như trống (trung vị 276): **chưa có ai chiếm chỗ này**, nhưng cũng nghĩa là người xem không tìm bằng cụm đó. Tiêu đề vẫn phải dựa vào tên nơi và câu hỏi "why", còn định dạng storytime giúp giữ chân và được đề xuất.
- Kết quả tìm kiếm trộn nhiều nội dung thiếu nhi. Kênh vẫn **"Not made for kids"**: giọng khô kiểu người lớn, chủ đề lịch sử và kinh tế. Wob dễ thương nhưng chuyện là cho người lớn.
- Giới hạn: số đo là kết quả tìm kiếm, không phải đường giữ chân người xem; video của Jaiden mạnh một phần vì kênh lâu năm. Chưa đo được định dạng này với kênh mới; 5 tập đầu là phép đo đó.

## 3. Định dạng một tập

### Hai lớp thời gian

| Lớp | Là gì | Thời lượng |
|---|---|---|
| **Hiện tại** | Wob ngồi bên bàn ở nhà, có hộp kỷ vật và sổ du lịch. Mở tập, mở hoặc đóng chương, chêm câu ("Anyway."), đóng con dấu | Khoảng 10% |
| **Hồi ức** | Cảnh hoạt hình đầy màn hình: Wob trong chuyến đi, diễn trong phông nền vẽ | Khoảng 90% |

### Mạch hành trình (khung chuẩn, mỗi tập đổi chi tiết)

| # | Phần | Câu hỏi mở / việc Wob làm | Đóng bằng |
|---|---|---|---|
| 0 | Mở (≤ 10 giây) | Wob ở hiện tại, cầm một kỷ vật lạ: "So. I went to the coldest village on Earth. On purpose." | Câu hỏi trung tâm: vì sao có người ở đây? |
| 1 | Lên đường | Trang sổ có bản đồ; Wob vẽ đường đi nét đứt, máy bay rồi xe chạy theo đường. Bản đồ là hành trình | Tới nơi: ấn tượng đầu tiên |
| 2–6 | Mỗi chương một **hoạt động** có thật ở đó | Wob làm hoặc tận mắt thấy một việc, gặp nạn nhỏ, học được một điều | Một mảnh của câu trả lời "vì sao" |
| 7 | Về nhà | Wob ở hiện tại xếp kỷ vật lại, ghép các mảnh: vì sao người ta sống ở đây | Con dấu đóng lên trang sổ + câu hỏi kéo bình luận |

Mồi lại sự chú ý mỗi 60–90 giây vẫn giữ, giờ bằng hình: Wob gặp nạn, một kỷ vật mới, cắt về hiện tại.

### Hoạt động là xương sống

Bước nghiên cứu (`research.md`) thêm một mục bắt buộc: **"Hoạt động và trải nghiệm ở nơi đó"**. Đó là những việc có thật người ở đó làm hoặc người tới thăm gặp, mỗi việc có nguồn, ghi rõ việc đó trả lời phần nào của câu hỏi "vì sao". Biên kịch chọn 5–6 hoạt động làm chương.

Ví dụ Oymyakon, chỉ dùng chi tiết đã qua kiểm chứng của tập 1:

| Chương | Hoạt động | Mảnh "vì sao" | Gag bằng hình |
|---|---|---|---|
| 1 | Bay tới Yakutsk, đi đường xa tới làng (độ dài và tên đường **phải kiểm chứng lại**) | Nơi này xa tới mức nào | Ba lô của Wob to hơn ghế máy bay |
| 2 | Tìm suối không đóng băng; đàn tuần lộc uống nước | Làng mọc quanh chỗ nước không đóng băng | Wob đi ngang qua con suối đang bốc hơi mà không thấy; cầm bản đồ ngược |
| 3 | Đứng cạnh đài tưởng niệm "Pole of Cold"; biết làng Tomtor cũng nhận danh hiệu này | Nhiệt kế làm nên tiếng tăm | Wob chạy qua lại giữa hai làng |
| 4 | Ra chợ: cá đông cứng xếp như củi; ra ngoài trời vài phút; cốc trà nguội tức thì | Sống trong tủ đông thế nào | Lông mi Wob (vốn không có) mọc ra rồi đóng băng |
| 5 | Trường nghỉ khi khoảng −52°C; xe để nổ máy | Người ta thích nghi ra sao | Wob hỏi có ngày nghỉ vì tuyết không |
| 6 | Quay lại mùa hè: 34,6°C; ngựa Yakut; lễ hội có Chyskhaan | Vì sao người ta ở lại, và vì sao khách tới | Wob mặc áo lông giữa mùa hè; con ngựa thờ ơ |

Đoạn lịch sử nặng (Gulag, đường Kolyma) vẫn kể ngắn, nghiêm túc, **không gag**. Wob ở hiện tại đặt kỷ vật xuống, nói thẳng, rồi mới quay lại giọng thường.

## 4. Luật trung thực cho ngôi thứ nhất

"Tôi đã tới đó" là lời của một nhân vật hoạt hình, nên người xem hiểu đó là chuyện kể. Nhưng kênh sống nhờ độ tin, nên phải phân rõ cái gì hư cấu, cái gì là thật:

| Được hư cấu (không cần nguồn) | Không được hư cấu (là khẳng định, cần nguồn, qua kiểm chứng) |
|---|---|
| Wob đã đi, Wob cảm thấy gì, Wob gặp nạn gì (ngã, lông mi đóng băng, trà nguội) | Mọi thứ Wob "thấy", "được kể", "học được": số liệu, ngày tháng, phong tục, đời sống, lịch sử |
| Bong bóng thoại của Wob, các con vật phản ứng (con ngựa thờ ơ) | Hoạt động có thật hay không, diễn ra ở đâu, mùa nào |
| Thứ tự chuyến đi (Wob tới đài tưởng niệm trước hay ra chợ trước) | Mùa: không kể Wob thấy lễ hội tháng 3 và mùa hè 34°C "trong cùng một tuần"; nhảy mùa phải nói rõ ("I went back in July") |

Thêm:
- **Không bịa cuộc gặp người thật cụ thể** ("the mayor told me", "a herder named…"). Người dân chỉ xuất hiện dạng chung, vẽ tôn trọng, không nói thay họ. Câu kiểu "locals told me…" chỉ dùng khi nguồn là lời người địa phương được báo chí hoặc học thuật ghi lại, và vẫn đăng ký khẳng định.
- Mọi luật cũ giữ nguyên: không đùa về người dân, mức C nói dè dặt trong lời, mức D bỏ.
- Mô tả video thêm một dòng: "Wob is a cartoon. The trip is imagined; the facts are real and sourced below." Dòng nhãn AI cũ giữ nguyên.
- Nhãn AI: video hoạt hình hoàn toàn không cần nhãn "altered or synthetic" của YouTube. Theo Nghị định 142/2026, phần tái hiện một sự kiện có thật cụ thể (ví dụ ngày đo kỷ lục 1933) bằng ảnh AI thì gắn nhãn ở cảnh đó, như luật hiện có.

## 5. Ngôn ngữ hình ảnh

- **Wob diễn, kiểu storytime**: tư thế nối tư thế, giữ hình, cắt nhanh (một khung mới mỗi 2–4 giây ở đoạn gag, 4–6 giây ở đoạn giải thích; mặc định cũ 4–8 giây là của trình chiếu). Wob có khớp: chân bước, tay giơ và cầm đồ, mắt và miệng thay được. Tách từ 6 SVG có sẵn, không vẽ lại Wob.
- **Phông nền hồi ức**: risograph theo `phong-cach-anh.txt`, tách 2–3 lớp (xa, giữa, gần) trôi lệch nhau để có chiều sâu. Lớp gần (tuyết, đá, bụi cây) vẽ bằng code cho đỡ lượt ảnh.
- **Đạo cụ và nhân vật phụ** vẽ bằng SVG cùng nét mực (tuần lộc, ngựa, cá đông cứng, cốc trà, xe, lều, nhà gỗ, nhiệt kế): làm thư viện dùng lại qua các tập.
- **Chuyển cảnh bằng kỷ vật**: cầm vé lên thì phóng vào sân bay; một tấm ảnh vẽ tay rơi xuống bàn rồi "sống dậy"; lật trang sổ để sang chương. Bỏ tấm giấy chuyển chương kiểu cũ.
- **Số liệu nằm trên đồ vật trong cảnh**: nhiệt kế Wob cầm, tấm biển "OYMYAKON pop. ~500", biên lai chợ, trang sổ có chữ viết tay. Bỏ thẻ số liệu và chữ to giữa màn hình. Cỡ chữ tối thiểu cho TV vẫn giữ.
- **Bản đồ** là trang sổ du lịch: vẫn vẽ bằng D3 + Natural Earth (luật chủ quyền giữ nguyên), thêm đường đi nét đứt và phương tiện chạy theo đường.
- **Âm thanh**: tiếng líu lo của Wob, tiếng diễn (bước tuyết, băng tách, ực, xe nổ máy, hơi nước) đã tổng hợp ngày 16/11 (`sfx/nguon/tao_sfx.py`, đã ghi sổ). Nhạc giữ bộ Kevin MacLeod, đổi theo nhịp.
- **Con dấu** đóng lên trang sổ du lịch ở cảnh hiện tại; ba nhãn cố định giữ nguyên.

## 6. Công cụ: dùng cái gì vào đâu

| Công cụ | Vai trò | Giấy phép, điều kiện | Kết luận |
|---|---|---|---|
| HyperFrames + GSAP + SVG | Xương sống: Wob có khớp, đạo cụ, chuyển cảnh, parallax, bản đồ hành trình | Đang dùng | **Dùng** |
| Ảnh AI qua ChatGPT web (gói Free) | Phông nền risograph | Tài khoản riêng; nhưng **hết lượt sau vài ảnh mỗi ngày** (tập 1: hết lượt lúc 02:50, chờ 23 giờ) | Chỉ đủ cho bản thử, không đủ cho 12–15 ảnh mỗi tập |
| Gemini web (gói Free) | Như trên | Ảnh có ngôi sao watermark; tập 1 không tải ảnh về được (CSP chặn blob) | Không dựa vào |
| Gemini API (`GEMINI_IMAGE_MODEL`) | Phông nền, có script sẵn trong `lay-tai-nguyen` | Khoảng 0,0168 USD/ảnh khi chạy batch [T18 trong tài liệu 14/11], khoảng 0,04–0,07 USD/ảnh thường (skill `tao-anh-web`) → **0,25–1 USD/tập** | **Đề xuất**, cần người làm kênh tạo khoá (câu hỏi 1) |
| Tách lớp phông nền | Mỗi lớp tạo riêng trên nền một màu phẳng (ví dụ magenta), rồi tách nền bằng ngưỡng màu trong Pillow | Không cần mô hình học máy, không vướng giấy phép | **Dùng** |
| Depth Anything V2 (ước độ sâu từ một ảnh, làm parallax 2.5D) | Dự phòng khi chỉ có một ảnh phẳng | Chỉ bản **Small** là Apache-2.0; Base, Large, Giant là CC-BY-NC-4.0 (cấm thương mại) [S2] | Dự phòng, chỉ dùng Small |
| rembg (tách nền) | Dự phòng | Mã MIT, nhưng mỗi mô hình có giấy phép riêng; BRIA RMBG là CC BY-NC [S3] | Không cần nếu tạo lớp trên nền phẳng |
| Clip AI ảnh-thành-video: Google Flow / Veo | Cảnh mở "wow" | Google không nhận quyền sở hữu nội dung tạo ra [S4]; điều kiện thương mại và watermark tuỳ gói, gói miễn phí chưa rõ [S5] | **Chưa dùng**; Wob không giữ được dáng |
| Kling | Như trên | Nhiều nguồn nói gói miễn phí cấm thương mại và có watermark; gói Standard khoảng 7–10 USD/tháng mới cho thương mại [S6] (chưa đọc được điều khoản gốc) | **Chưa dùng** |
| Lottie (LottieFiles miễn phí) | Hiệu ứng nhỏ (tuyết, lửa, lấp lánh) | Help center: hoạt hình miễn phí theo Lottie Simple License, được dùng thương mại [S7]; nhưng tài liệu khác nói giấy phép tuỳ từng file | Để sau; phải kiểm từng file và hợp phong cách mực |
| D3 + Natural Earth | Bản đồ trang sổ | Public domain; bản quan điểm Việt Nam | **Dùng**, như cũ |
| Edge TTS Andrew (tạm), Azure khi kiếm tiền | Giọng Wob kể | Như hồ sơ kênh | **Dùng** |
| Claude | Viết kịch bản dạng **bảng phân cảnh**; viết mã dàn dựng từng cảnh bằng thư viện đạo cụ | | **Dùng** |

Vì sao không để AI làm hoạt hình (clip ảnh-thành-video) thay SVG: Wob phải giống hệt nhau mọi tập (luật thương hiệu); clip AI không giữ được nhân vật, tốn tiền, điều khoản chưa rõ, và dễ bị coi là "AI slop". SVG thì miễn phí, chạy lại ra y hệt, Wob luôn đúng.

## 7. Những gì phải đổi trong repo (chưa làm)

Theo thứ tự làm:

1. **Thư viện hoạt hình** `templates/_shared/hh/`: Wob có khớp (tách từ 6 SVG), hành động (đi, chạy, ngã, nhảy, run, cầm, uống, chỉ, ngồi kể), bong bóng thoại, camera và parallax, kho đạo cụ vẽ bằng code, chuyển cảnh kỷ vật, trang sổ, bản đồ hành trình.
2. **Template mới** `templates/hoat-hinh/`: dựng cảnh từ bảng phân cảnh. Giữ `explainer` cho tới khi template mới qua bản thử.
3. **Schema kịch bản** (`viet-kich-ban/references/schema.md`, `validate_script.py`): mỗi cảnh có `lop` (`hien-tai` | `hoi-uc`), `boi_canh` (phông nền), `nhip[]` gồm lời + `wob` (hành động, biểu cảm) + `dao_cu` + `gag` + `bong_bong`; `ky_vat` của chương; bỏ `show: text` và thẻ số liệu. Kiểm thêm: mỗi cảnh hồi ức có ít nhất một gag bằng hình; lời là ngôi thứ nhất; khẳng định không nằm trong phần hư cấu.
4. **Luật**: `thuong-hieu.md` (Wob là người kể), `van-phong-loi-doc.md` (ngôi thứ nhất, ví dụ câu), `video-dai-youtube.md` (nhịp cắt 2–4 giây ở đoạn gag; không chữ to giữa màn hình), `chinh-xac-va-ban-quyen.md` (luật trung thực mục 4; ảnh Commons chuyển thành "không dùng"), `frame.md`.
5. **Agent và skill**: `nghien-cuu-dia-diem` thêm mục "Hoạt động và trải nghiệm"; `bien-kich-video` viết ngôi thứ nhất và bảng phân cảnh; `thu-thap-tai-nguyen` tạo phông nền tách lớp; `bien-tap-video` dàn dựng theo thư viện; `phan-bien-video` thêm câu hỏi "trông như hoạt hình hay trình chiếu?". Thêm cổng 6b: chụp 12 khung, nếu Wob không ở trong cảnh hoặc không có hành động ở quá 2 khung thì KHÔNG ĐẠT.
6. **Hồ sơ kênh, CLAUDE.md**: cập nhật mô tả quy trình.

## 8. Kế hoạch

| Bước | Việc | Ai duyệt |
|---|---|---|
| 1 | **Bản thử ~75 giây**: mở đầu (hiện tại, kỷ vật) + chương "ra chợ, ra ngoài trời, cốc trà". Lời mới ngôi thứ nhất chỉ dùng khẳng định đã kiểm chứng của tập 1; lồng Edge TTS; phông nền 2–3 ảnh (ChatGPT Free đủ) + đạo cụ SVG | Người làm kênh xem, góp ý |
| 2 | Sửa theo góp ý; chốt thư viện và template | |
| 3 | Đổi luật, schema, agent (mục 7) | |
| 4 | Làm lại tập 1 trọn vẹn: viết lại kịch bản (giữ nghiên cứu và phần lớn khẳng định; kiểm chứng lại các câu đổi), dựng hoạt hình, render | Người làm kênh xem bản cuối |
| 5 | Tập 2–5: tiếp tục từ nghiên cứu (Coober Pedy dừng ở bước 1a) | Điểm dừng `tom-tat-duyet.md` như cũ |

Ảnh hưởng tới lịch: dựng hoạt hình tốn công hơn trình chiếu nhiều. Lịch đăng 5 tập trong 5 ngày nên đổi thành: **đăng khi đủ 5 tập**, hoặc đăng tập 1 trước để lấy số liệu sớm (câu hỏi 3).

## 9. Câu hỏi còn mở cho người làm kênh

1. **Lượt ảnh phông nền**: tạo khoá Gemini API (khoảng 0,25–1 USD/tập, script đã có) hay mua ChatGPT Plus, hay chấp nhận phông vẽ bằng code (đơn giản hơn, không tốn gì)? Bản thử dùng ChatGPT Free được, nhưng cả tập thì không đủ lượt.
2. **Giọng Andrew cho Wob**: giọng người lớn trầm, điềm tĩnh trong một quả địa cầu bé xíu là chỗ buồn cười. Nghe bản thử rồi quyết giữ hay đổi.
3. **Lịch đợt ra mắt**: đăng khi đủ 5 tập, hay đăng tập 1 trước?
4. **Tên mục và chữ ký**: có muốn một câu mở cố định kiểu "Wob's travel journal, entry #N" không? (Lợi: dễ nhận ra; hại: luật chống lặp câu mở. Đề xuất: chỉ là chữ trên bìa sổ, không đọc.)

## Nguồn

- [S1] Định nghĩa storytime animation (chuyện tự kể, thường hài, hoạt hình kiểu animatic): https://pdxblackrose.myportfolio.com/storytime ; bối cảnh thể loại: https://www.creativebloq.com/features/become-a-rockstar-youtuber-with-animated-story-telling (tra 16/11/2026)
- [S2] Giấy phép Depth Anything V2 (Small: Apache-2.0; Base/Large/Giant: CC-BY-NC-4.0), README gốc: https://cdn.jsdelivr.net/gh/depthanything/depth-anything-v2@main/README.md ; https://huggingface.co/Acly/Depth-Anything-V2-GGUF
- [S3] rembg (mã MIT, giấy phép mô hình riêng): https://github.com/danielgatis/rembg ; https://aireiter.com/blog/best-background-removal-api
- [S4] Google Flow, quyền sở hữu nội dung tạo ra: https://support.google.com/flow/answer/16353333
- [S5] Điều kiện Veo theo gói (nguồn thứ cấp, chưa kiểm với trang giá của Google): https://clipjury.pages.dev/reviews/veo/ ; https://discuss.ai.google.dev/t/inquiry-about-commercial-use-of-videos-generated-via-google-labs-flow-free-tier-for-a-contest/169174
- [S6] Kling, gói miễn phí và thương mại (nguồn thứ cấp): https://licenseorg.com/blog/ai-video-licensing-2026 ; https://eesel.ai/blog/kling-ai-pricing
- [S7] LottieFiles, giấy phép hoạt hình miễn phí: https://help.lottiefiles.com/hc/en-us/articles/900002438343-Can-I-use-a-free-animation-on-Lottiefiles-for-commercial-business-use ; https://docs.lottiefiles.com/en/integrations/after-effects/02_explore/premium-animations
- Số đo YouTube: `docs/du-lieu-kenh-dai-2026-11-14/youtube-tim-kiem-dinh-dang-ke-chuyen-2026-11-16.tsv` (script `yt_search.sh`, `tom_tat_tim_kiem.py`)
- Lượt ảnh ChatGPT Free, Gemini web không tải được ảnh: `projects/2026-11-16-oymyakon/nhat-ky.md`, dòng bước 2
