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
- Ý tưởng cho 10 video đầu (chỉ là danh sách đề tài, **chưa kiểm chứng**; mỗi tập phải qua kiểm chứng như mục dưới): thị trấn lạnh nhất có người ở; thành phố cao nhất thế giới; thị trấn sống dưới lòng đất ở vùng sa mạc; thị trấn cả dân sống trong một toà nhà; thị trấn phải dời đi vì mỏ; nơi có người ở xa đất liền nhất; thành phố trong lòng chảo nóng nhất; làng trên vách đá; đảo không có sân bay; thị trấn có đêm dài hai tháng.
- Sau 10 video: xem số lượt hiển thị, tỉ lệ nhấp, thời lượng xem trung bình. Chạy được thì mở sang hướng kề bên: lịch sử ("vì sao thành phố này được xây ở đây"), what if ("nếu ai cũng chuyển tới đây"). Không chạy thì đổi sang hướng địa lý kề bên, vẫn 10 video một hướng.
- **Không làm**: chiến sự, tranh chấp lãnh thổ đang nóng, địa chính trị (cầu thấp, 19.000 lượt; dễ sai luật chủ quyền Việt Nam).

## Nhân vật và giọng

- **Nhân vật Wob**: một quả địa cầu nhỏ, hơi méo nên đi lắc lư ("wobble"), chân ngắn, đeo ba lô quá to, cầm bản đồ giấy lúc nào cũng cầm ngược. Tính cách: du khách tự tin thái quá, tập nào cũng muốn chuyển tới nơi đó sống, rồi các sự thật lần lượt thuyết phục Wob đổi ý (hoặc không).
- Dựng Wob bằng **SVG tách bộ phận** (thân, mắt, miệng, tay, chân, ba lô), chuyển động bằng GSAP trong HyperFrames. Không tạo Wob bằng AI sinh ảnh, để tập nào Wob cũng giống hệt nhau. TODO: vẽ bộ phận và 6 biểu cảm gốc (hào hứng, lạnh run, nóng chảy, sốc, ngẫm nghĩ, đóng gói ba lô).
- **Phán quyết mỗi tập** (dấu ấn riêng, nhận định của kênh): con dấu "Would Wob move here?" với ba nhãn cố định **WOULD MOVE** / **SUMMER ONLY** / **NOPE**, đóng đúng một lần ở cuối video, kèm 1–2 câu lý do.
- Giọng đọc: tiếng Anh, một giọng cho cả kênh, Azure Neural HD (22 USD / 1 triệu ký tự; khoảng 0,31 USD cho video 15 phút). TODO: nghe thử 3 giọng en-US HD rồi chốt; dùng Azure (đã có key), **không** dùng gói miễn phí của ElevenLabs (cấm thương mại).
- Giọng văn: tò mò, khô, hài kiểu nói giảm (deadpan), như người bạn kể chuyện thú vị. Đùa về thời tiết, địa hình, nỗi khổ của Wob; **không đùa về người dân** ở nơi đó, không chê nghèo, không định kiến dân tộc.
- Mở đầu: vào thẳng câu hỏi trong 10 giây đầu, không chào, không giới thiệu kênh. Kết thúc: con dấu phán quyết + một câu hỏi kéo bình luận ("Would you last a winter here?"). Không dùng "you won't believe", "insane", "shocking", "nobody talks about".

## Hình ảnh và âm thanh

- Khung 1920×1080, 30 fps, video 10–15 phút.
- Bản đồ: vẽ bằng code (D3 + Natural Earth, dữ liệu public domain). Bản đồ nào có Biển Đông phải theo `.claude/rules/chinh-xac-va-ban-quyen.md` mục 6 (không "đường lưỡi bò"; `ve_ban_do.mjs` dùng Natural Earth bản quan điểm Việt Nam và tự đánh dấu khung chạm vùng này); giai đoạn 1 ưu tiên đề tài không cần vẽ vùng này.
- Minh hoạ cảnh: ảnh AI phong cách minh hoạ phẳng, **không** làm ảnh như ảnh chụp về nơi có thật (dễ gây hiểu lầm và phải gắn nhãn). Ảnh chụp thật chỉ dùng khi có giấy phép cho thương mại (ví dụ Wikimedia Commons CC BY, CC BY-SA kèm ghi công; **không** dùng CC BY-NC).
- Tránh phong cách vector phẳng giống Kurzgesagt: YouTube từng gắn nhầm kiểu hình này là AI slop. TODO: chốt bảng màu, font (giấy phép OFL), logo, phong cách ảnh minh hoạ (`templates/_shared/phong-cach-anh.txt`) trong hệ thiết kế riêng của kênh (`templates/_shared/frame.md` đang là bản tạm, font tạm Be Vietnam Pro). Chạy `/thiet-lap-kenh`.
- Chữ ký âm thanh: `sfx/dau-wob.wav` (tự tổng hợp), chỉ phát cùng con dấu phán quyết.
- Nhạc: YouTube Audio Library hoặc thư viện có giấy phép thương mại, ghi vào `music/GIAY-PHEP.md` (sổ đã lập, chưa có bài). TODO: chọn 3 bài theo bảng tâm trạng trong sổ.

## Kiểm chứng và báo cáo độ xác thực (cổng bắt buộc)

Người làm kênh **không duyệt kịch bản giữa chừng**. Mỗi video được giao kèm `out/bao-cao-xac-thuc.md` theo [mau-bao-cao-xac-thuc.md](mau-bao-cao-xac-thuc.md). Cách chạy: skill `/kiem-chung` (`gemini_kiem_chung.py`, `doi_chieu.py --cong`, `bao_cao.py`). Quy trình:

1. Kịch bản tách thành danh sách khẳng định có mã (C01, C02…): mọi con số, ngày tháng, tên riêng, quan hệ nhân quả.
2. **Vòng 1, Claude**: một agent kiểm chứng độc lập (không phải agent viết kịch bản) tìm nguồn web cho từng khẳng định.
3. **Vòng 2, mô hình hãng khác**: Gemini (Google) có tìm kiếm web, nhận **cùng danh sách khẳng định nhưng không thấy kết luận của vòng 1**, tự kiểm chứng. Chọn Gemini vì dự án đã định dùng Gemini để tạo ảnh, nên chỉ cần một key. TODO: thêm `GEMINI_API_KEY` vào `.env`; đo chi phí mỗi lượt sau video đầu.
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

- 1 video mỗi tuần trong 3 tháng đầu.
- Chế độ: tự động; người làm kênh chỉ xem video cuối cùng báo cáo độ xác thực.
- Dây chuyền: `/tao-video <nơi>` (repo này, dựng 15/11/2026, template `explainer`). Đã chạy thử trọn từ kịch bản tới MP4 và báo cáo trên một dự án giả; chưa làm tập thật nào.
