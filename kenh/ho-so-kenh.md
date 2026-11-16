# Hồ sơ kênh World Wobble

> Bản 1, ngày 14/11/2026. Căn cứ: [docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md](../docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md) (mục 8, 10, 11).
> Kênh này **tách hẳn** khỏi Game Vừa Ví (dự án GameReel ở `~/Desktop/Gaming-related-videos`): khác ngôn ngữ, khác khán giả, khác định dạng. Từ 15/11/2026 kênh có repo và bộ luật riêng trong `.claude/rules/` của repo này (bản quyền, chủ quyền, nhãn AI ở `chinh-xac-va-ban-quyen.md`; thương hiệu ở `thuong-hieu.md`); luật của Game Vừa Ví không áp cho kênh này.
> Dòng `TODO` là chưa có thông tin.

## Kênh

- Tên kênh: **World Wobble**, handle `@WorldWobble` (còn trống ngày 14/11/2026; TODO: người làm kênh tự tạo kênh và giữ handle)
- Lời hứa (tiếng Anh, dùng trong mô tả kênh): "Why on earth do people live *there*? Weird places, explained with a wobble."
- Ngôn ngữ: tiếng Anh. Thị trường Nhật tạm bỏ (chốt 14/11/2026)
- Khán giả: người lớn nói tiếng Anh, 18–44 tuổi, ở Mỹ, Anh, Canada, Úc; nhiều người xem trên TV. **Không** nhắm trẻ em: khi đăng chọn "Not made for kids"
- Nền tảng: YouTube, video dài khung ngang 16:9. Shorts chỉ cắt từ video dài để kéo người xem, không phải sản phẩm chính
- Kênh có kiếm tiền: chưa. Ngưỡng YPP cho kênh mới là 8.000 giờ xem trong 365 ngày (từ 01/02/2027). Khi được duyệt, khai thông tin thuế Mỹ trong AdSense ngay; hỏi kế toán về thuế Việt Nam 2026

## Mảng và hướng nội dung

- **Giai đoạn 1 (10 video đầu)**: chỉ một hướng: **"Why do people live here?"**, tức vì sao người ta sống ở những nơi khắc nghiệt hoặc kỳ lạ (lạnh nhất, cao nhất, dưới lòng đất, cả thị trấn trong một toà nhà, thị trấn phải dời đi…). Căn cứ: hướng duy nhất mà video đăng năm 2026 vẫn có trung vị 52.414 lượt xem (mục 11 tài liệu nghiên cứu). Giữ tiêu đề, mô tả, thẻ trong đúng hướng này để YouTube hiểu kênh.
- Đợt ra mắt 5 tập (Claude chọn lại 16/11/2026, đo nhu cầu YouTube): Oymyakon, Coober Pedy, Whittier, Santa Cruz del Islote, Tristan da Cunha; khung chương và lý do chọn ở [docs/ke-hoach-dot-ra-mat-5-tap-2026-11-16.md](../docs/ke-hoach-dot-ra-mat-5-tap-2026-11-16.md), brief từng tập ở `projects/2026-11-16-*`. Dự phòng tập 6–10 ở mục 5 của file đó. Danh sách nháp cũ (14–15/11) đã bỏ.
- Sau 10 video: xem số lượt hiển thị, tỉ lệ nhấp, thời lượng xem trung bình. Chạy được thì mở sang hướng kề bên: lịch sử ("vì sao thành phố này được xây ở đây"), what if ("nếu ai cũng chuyển tới đây"). Không chạy thì đổi sang hướng địa lý kề bên, vẫn 10 video một hướng.
- **Không làm**: chiến sự, tranh chấp lãnh thổ đang nóng, địa chính trị (cầu thấp, 19.000 lượt; dễ sai luật chủ quyền Việt Nam).

## Nhân vật và giọng

- **Nhân vật Wob**: một quả địa cầu nhỏ, hơi méo nên đi lắc lư ("wobble"), chân ngắn, đeo ba lô quá to, cầm bản đồ giấy lúc nào cũng cầm ngược. Tính cách: du khách tự tin thái quá, tập nào cũng muốn chuyển tới nơi đó sống, rồi các sự thật lần lượt thuyết phục Wob đổi ý (hoặc không).
- Dựng Wob bằng **SVG tách bộ phận** (thân, mắt, miệng, tay, chân, ba lô), chuyển động bằng GSAP trong HyperFrames. Không tạo Wob bằng AI sinh ảnh, để tập nào Wob cũng giống hệt nhau. **Đã vẽ** (chốt 15/11/2026): 6 biểu cảm `hao-hung`, `lanh-run`, `nong-chay`, `soc`, `ngam-nghi`, `dong-goi` ở `templates/_shared/wob/`, dựng lại bằng `wob/nguon/tao_wob.py`: quả địa cầu méo màu biển `#5A9FB8` với lục địa trừu tượng (không phải bản đồ thật), nét mực viền, ba lô nâu có cuộn thảm đỏ, giày đỏ. Màu Wob cố định, không đổi theo bảng màu tập. Chưa có: tấm bản đồ giấy cầm ngược (thêm sau nếu kịch bản cần).
- **Phán quyết mỗi tập** (dấu ấn riêng, nhận định của kênh): con dấu "Would Wob move here?" với ba nhãn cố định **WOULD MOVE** / **SUMMER ONLY** / **NOPE**, đóng đúng một lần ở cuối video, kèm 1–2 câu lý do.
- Giọng đọc (chốt 16/11/2026, người làm kênh chọn sau khi nghe thử 4 giọng Andrew, Brian, Christopher, Ava): **`en-US-AndrewNeural`**, tốc độ `+0%`, một giọng cho cả kênh. Dùng bản Neural thường, **không** dùng bản HD (`DragonHD`), vì Edge TTS và Azure cùng có giọng Neural này nên chuyển dịch vụ không đổi giọng; bản HD là mô hình khác. Dịch vụ: **tạm dùng Edge TTS** khi kênh chưa kiếm tiền (`CHO_PHEP_EDGE=1` trong `.env`); video làm bằng Edge không bật quảng cáo. Trước khi bật kiếm tiền: tạo khoá Azure Speech, xoá cờ, lồng lại bằng Azure cùng tên giọng. **Không** dùng gói miễn phí của ElevenLabs (cấm thương mại).
- Giọng văn: tò mò, khô, hài kiểu nói giảm (deadpan), như người bạn kể chuyện thú vị. Đùa về thời tiết, địa hình, nỗi khổ của Wob; **không đùa về người dân** ở nơi đó, không chê nghèo, không định kiến dân tộc.
- Mở đầu: vào thẳng câu hỏi trong 10 giây đầu, không chào, không giới thiệu kênh. Kết thúc: con dấu phán quyết + một câu hỏi kéo bình luận ("Would you last a winter here?"). Không dùng "you won't believe", "insane", "shocking", "nobody talks about".

## Hình ảnh và âm thanh

- **Hướng hình chính (chốt 16/11/2026, sau khi xem bản giao tập 1):** kênh là **video hoạt hình "Wob kể chuyến đi"**: Wob đi chuyến đó về và **tự kể ngôi thứ nhất** (giọng Andrew), từ bàn có hộp kỷ vật + sổ du lịch; 90% là hồi ức hoạt hình, Wob **diễn trong cảnh vẽ** (cắt giấy 2D, parallax), mỗi chương là một hoạt động có thật ở vùng đất đó; Wob trong hồi ức chỉ líu lo + bong bóng thoại; phông nền AI risograph tách lớp, Wob và đồ vật bằng SVG; **không ảnh chụp thật**; không chữ to giữa màn hình, số liệu nằm trên đồ vật trong cảnh. Chuyến đi là tưởng tượng, sự thật là thật (luật trung thực). Chi tiết, bằng chứng, công cụ, kế hoạch: [docs/dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md](../docs/dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md). Các dòng khác trong hồ sơ và luật trong `.claude/rules/` còn theo kiểu cũ (người kể là kênh, ảnh Commons, thẻ số liệu) cho tới khi sửa theo mục 7 của tài liệu đó; khi lệch thì theo tài liệu định hướng.

- Khung 1920×1080, 30 fps, video 10–15 phút.
- Bản đồ: vẽ bằng code (D3 + Natural Earth, dữ liệu public domain). Bản đồ nào có Biển Đông phải theo `.claude/rules/chinh-xac-va-ban-quyen.md` mục 6 (không "đường lưỡi bò"; `ve_ban_do.mjs` dùng Natural Earth bản quan điểm Việt Nam và tự đánh dấu khung chạm vùng này); giai đoạn 1 ưu tiên đề tài không cần vẽ vùng này.
- Minh hoạ cảnh: ảnh AI phong cách minh hoạ phẳng, **không** làm ảnh như ảnh chụp về nơi có thật (dễ gây hiểu lầm và phải gắn nhãn). Ảnh chụp thật chỉ dùng khi có giấy phép cho thương mại (ví dụ Wikimedia Commons CC BY, CC BY-SA kèm ghi công; **không** dùng CC BY-NC).
- Tránh phong cách vector phẳng giống Kurzgesagt: YouTube từng gắn nhầm kiểu hình này là AI slop. Dấu riêng của kênh là **nét mực viền** (Wob, thẻ số liệu, ghim bản đồ).
- Hệ thiết kế (chốt 15/11/2026, `/thiet-lap-kenh`, người làm kênh chọn phương án A trong 3 khung thử): bảng **"Mực & giấy"**, nền `#1E2A2B`, biển `#3F6A70`, đất/giấy `#EFE3C8`, nhấn đất nung `#E0703A`, NOPE `#E85D45`, WOULD MOVE `#5E9E6A`; font **Fraunces** (OFL, trục SOFT 100, WONK 1: nét hơi lắc, hợp tên Wobble). Lý do: khác hẳn Game Vừa Ví (Be Vietnam Pro, tím, vàng `#FFC23D`) và khác đa số kênh địa lý (font không chân trên nền navy). Màu NOPE cũ `#C2402F` bị loại vì chỉ đạt 2,9:1 trên nền. Giá trị gốc ở `templates/_shared/frame.md`.
- Logo (chốt 15/11/2026): icon đầu Wob + chữ WORLD WOBBLE. File: `templates/_shared/logo.png`, `templates/_shared/logo-icon.svg`; ảnh đại diện `kenh/nhan-dien/avatar-800.png`, banner `kenh/nhan-dien/banner-2560x1440.png` (dựng lại bằng `kenh/nhan-dien/nguon/tao_nhan_dien.py`).
- Phong cách ảnh minh hoạ (chốt 16/11/2026, `/thiet-lap-kenh`, người làm kênh chọn phương án C trong 3 ảnh thử cùng cảnh làng Oymyakon tạo bằng ChatGPT web): **risograph / khắc gỗ**, nét mực khắc đậm, hình khối đơn giản, hạt in, chỉ 4 màu của bảng "Mực & giấy". Câu phong cách ở `templates/_shared/phong-cach-anh.txt`; ảnh thử A (mực & giấy), B (gouache), C ở `kenh/nhan-dien/phong-cach-anh/`. Lý do: khác biệt nhất, đúng bảng màu, hợp nét mực viền của Wob, xa kiểu vector phẳng bị coi là AI slop. Khi làm ảnh thật phải tả rõ kiến trúc địa phương (ảnh thử ra nhà gỗ kiểu châu Âu thay vì Siberia).
- Chữ ký âm thanh: `sfx/dau-wob.wav` (tự tổng hợp), chỉ phát cùng con dấu phán quyết.
- Nhạc (chốt 16/11/2026): 6 bài Kevin MacLeod (incompetech.com, CC BY 4.0, được dùng trên video kiếm tiền, phải ghi công trong mô tả), 2 bài cho mỗi tâm trạng `to-mo` / `khac-nghiet` / `hai`, sổ và câu ghi công ở `music/GIAY-PHEP.md`, bằng chứng ở `music/bang-chung/`. **Đổi nhạc theo nhịp** (người làm kênh muốn): mỗi cảnh gắn `music_mood`, `build_timeline.py` nối các đoạn bằng crossfade 1,5 giây, đoạn dưới 20 giây gộp vào đoạn trước. Claude chọn bài theo tên và mô tả, chưa nghe; người làm kênh nghe lại sau tập 1. Nhạc CC vẫn có thể bị Content ID nhận nhầm: ghi công đúng mẫu trước khi kháng nghị.

## Kiểm chứng và báo cáo độ xác thực (cổng bắt buộc)

Người làm kênh **không duyệt kịch bản giữa chừng**. Mỗi video được giao kèm `out/bao-cao-xac-thuc.md` theo [mau-bao-cao-xac-thuc.md](mau-bao-cao-xac-thuc.md). Cách chạy: skill `/kiem-chung` (`gemini_kiem_chung.py`, `doi_chieu.py --cong`, `bao_cao.py`). Quy trình:

1. Kịch bản tách thành danh sách khẳng định có mã (C01, C02…): mọi con số, ngày tháng, tên riêng, quan hệ nhân quả.
2. **Vòng 1, Claude**: một agent kiểm chứng độc lập (không phải agent viết kịch bản) tìm nguồn web cho từng khẳng định.
3. **Vòng 2, mô hình hãng khác**: Gemini (Google) có tìm kiếm web, nhận **cùng danh sách khẳng định nhưng không thấy kết luận của vòng 1**, tự kiểm chứng. Chốt 16/11/2026: chạy qua **Gemini web miễn phí** (Browser MCP, tài khoản Google riêng không giữ kênh; `gemini_web.py`) vì chưa có `GEMINI_API_KEY`. Bản web không có dữ liệu grounding, nên script mở thử mọi link nguồn và hạ kết luận không còn nguồn sống xuống "khong-ro". Có key thì chuyển sang API (`gemini_kiem_chung.py`), cùng prompt, cùng khung kết quả.
4. **Đối chiếu**: hai bên cùng kết luận thì giữ; lệch nhau thì tra lại lần ba, sửa lời cho dè dặt hơn, hoặc bỏ khẳng định.
5. Mức độ:
   - **A, xác thực**: ít nhất 2 nguồn độc lập, trong đó 1 nguồn gốc (cơ quan thống kê, chính phủ, bài khoa học, bách khoa uy tín); hai mô hình đồng ý.
   - **B, có cơ sở**: 1 nguồn uy tín; hai mô hình đồng ý.
   - **C, còn tranh cãi**: nguồn mâu thuẫn. Lời đọc phải nói rõ ("estimates vary", "according to…").
   - **D, không kiểm chứng được**: **bỏ khỏi video**.
6. Cổng xuất video: không còn khẳng định mức D; mọi mức C đã được nói rõ trong lời; mọi chỗ lệch giữa hai mô hình đã xử lý.
7. Mô tả video có mục "Sources" liệt kê nguồn chính (tiếng Anh) cho người xem.

## Nhãn AI và tuân thủ

- YouTube: video hoạt hình hoàn toàn không bắt buộc gắn nhãn "altered or synthetic". Phải gắn khi có cảnh trông như thật về người thật, sự kiện có thật.
- Mô tả mọi video có dòng: "Narration voice and illustrations are AI-assisted. Every claim was checked by two independent AI models against the sources listed below."
- Luật Việt Nam (Nghị định 142/2026): tái hiện sự kiện có thật bằng AI phải gắn nhãn.
- Chống "inauthentic content": mỗi tập phải khác nhau thật sự về đề tài, lập luận, phán quyết; không lặp nguyên văn câu mở, câu kết; không dùng một khuôn tiêu đề cho mọi tập.
- Một kênh trên YouTube. Không chạy nhiều kênh song song, không đổi email tạo kênh mới (chính sách spam áp dụng cho cả mạng lưới kênh phối hợp).

## Nhịp sản xuất

- **Đợt thử ra mắt (chốt 15/11/2026, người làm kênh quyết):** đăng **5 tập liên tục trong 5 ngày**, rồi dừng để xem số liệu trước khi quyết làm tiếp tập 6–10 và có đầu tư tiếp không. Claude đã khuyên 2 tập/tuần vì đăng dồn thì tập sau không kịp học từ tập trước và dễ bị coi là làm hàng loạt; người làm kênh chọn 5/5 để có tín hiệu nhanh. Biện pháp giảm rủi ro: làm xong và sửa tập 1 trước rồi mới làm tập 2–5; 5 tập khác nhau rõ về lý do định cư, khuôn tiêu đề, câu mở, phán quyết; mọi tập vẫn qua đủ các cổng.
- Tiêu chí sau 10 tập (ngưỡng ban đầu Claude đặt, chưa có số liệu kênh): dừng nếu mỗi video < 500 lượt hiển thị, CTR < 2%, % thời lượng xem < 25%; đáng đầu tư nếu có tập > 10.000 lượt hiển thị, CTR ≥ 4–5%, % xem ≥ 35–40%, có lượt xem từ "Suggested". Mốc YPP 8.000 giờ ≈ 96.000 lượt xem/năm nếu mỗi lượt xem trung bình 5 phút.
- Sau đợt thử: quay về nhịp đều (mặc định 1–2 video mỗi tuần), chỉnh theo `kenh/bai-hoc.md`.
- Chế độ: tự động; người làm kênh chỉ xem video cuối cùng báo cáo độ xác thực. **Ngoại lệ đợt ra mắt 5 tập (16/11/2026):** dừng một lần sau nghiên cứu để người làm kênh duyệt bản tóm tắt tiếng Việt `tom-tat-duyet.md`, rồi mới viết kịch bản.
- Dây chuyền: `/tao-video <nơi>` (repo này, dựng 15/11/2026, template `explainer`). Đã chạy thử trọn từ kịch bản tới MP4 và báo cáo trên một dự án giả; chưa làm tập thật nào.
