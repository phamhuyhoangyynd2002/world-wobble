# Bài học từ đợt nghiên cứu 24/11/2026: ngày lễ, ngách kênh thứ hai, đối thủ, giọng đọc AI

> Tổng hợp bốn đợt đo trong ngày 24/11/2026 và những gì đã đưa vào World Wobble. Kênh thứ hai (động vật) là dự án riêng, không dùng chung repo; phần dành cho nó chỉ ghi ở mục 6 để tiện tra.

## 1. Bốn đợt đo

| Đợt | Hỏi gì | Kết luận | Tài liệu, dữ liệu |
|---|---|---|---|
| Ngày lễ | Mở kênh lễ hội thế giới? | Không. Cầu dồn vào 5 lễ lớn của Mỹ, theo mùa; góc "các nước ăn mừng khác nhau" cầu thấp nhất (4–20 nghìn); video mới năm 2026 đa số < 4.000 lượt | [danh-gia-thi-truong-kenh-le-hoi-2026-11-24.md](danh-gia-thi-truong-kenh-le-hoi-2026-11-24.md), [du-lieu-le-hoi-2026-11-24/](du-lieu-le-hoi-2026-11-24/) |
| Ngách kênh 2 | 21 nhánh con sinh vật và nguồn gốc đồ vật | Biển sâu (trung vị video 2026: 847.917), tiền sử (573.078), cá voi (116.272) mạnh; nguồn gốc đồ vật dạng chung gần như không ai tìm (27–206) | [du-lieu-ngach-kenh-2-2026-11-24/tom-tat.tsv](du-lieu-ngach-kenh-2-2026-11-24/tom-tat.tsv) |
| Mổ xẻ đối thủ | Vì sao 9 kênh lên, 9 kênh thấp trong cùng nhánh biển | Không phải hoạt hình hay cảnh thật. Kênh thấp có dấu hiệu "AI làm theo khuôn": tranh AI vẽ sai con vật, danh sách "Every X Explained", chép tiêu đề kênh lớn, phim 2–3 tiếng | [ghi-chu-mo-xe-kenh.md](du-lieu-ngach-kenh-2-2026-11-24/ghi-chu-mo-xe-kenh.md) |
| Giọng đọc AI | Giọng AI + hậu kỳ (autotune…) có ổn không | Autotune không giúp. Văn kiểu AI bị bắt nhiều hơn giọng. Có kênh bị nghi AI vẫn lên rất to; bỏ giọng AI thì được khen | [giong-doc-ai.md](du-lieu-ngach-kenh-2-2026-11-24/ghi-chu-agent/giong-doc-ai.md), [giong-doc/](du-lieu-ngach-kenh-2-2026-11-24/giong-doc/) |

## 2. Cách đo ngách: số quyết định là "video năm nay"

- Trung vị lượt xem 40 video đầu kết quả tìm kiếm **chỉ tính video đăng trong năm** (`yt_search.py tu-khoa.tsv nam-nay`, bộ lọc `sp=EgQIBRAB`) mới cho biết kênh mới còn chen được không. Trung vị "mọi lúc" đo cầu đã có, bị video cũ kéo lên.
- Ví dụ lệch: "thanksgiving explained" mọi lúc 384.003, năm 2026 chỉ 160. "deep sea creatures explained" mọi lúc 898.718, năm 2026 vẫn 847.917.
- Ngách tốt thì hai số gần nhau, và có kênh nhỏ (< 100 nghìn người đăng ký, < 1 năm tuổi) trong top.
- Tiêu đề trùng hàng loạt ở các kênh mới cùng tháng (ví dụ 6 kênh người que cùng làm "Why did humans start wearing clothes?" từ 10/2026) là dấu hiệu đổ xô theo khuôn: tránh.

## 3. Bài học về văn và giọng

1. **Văn kiểu AI bị bắt trước giọng.** Bình luận 887 thích dưới video 17,3 triệu lượt của Mr. Science: "does this script sound really AI? So many repeated phrases, 'where light is survival, survival is defense'". Các mẫu bị chê: câu đối xứng "It's not X, it's Y", đảo vòng, "Here's why", "Nothing about X is normal", "shouldn't exist", tính từ giật gân lặp. Hank Green bị nghi chỉ vì bốn từ "I appreciate the pushback" [G10].
2. **Autotune không làm TTS tự nhiên hơn**: nó sửa cao độ giọng hát; người nghe nhận ra giọng máy qua ngữ điệu, nhịp, chỗ ngắt, tốc độ, hơi thở [G2]. Hậu kỳ khác (tiếng phòng, EQ, nén, sắp lại chỗ ngắt) chỉ có lời khuyên, không có thử nghiệm độc lập.
3. **Nguồn giọng quan trọng hơn hậu kỳ**: giọng clone từ người thật được cho là người 58%, người thật 62%, giọng tổng hợp có sẵn 41% (PLOS One 2025) [G1].
4. **Bảng nghe mù Artificial Analysis (24/11/2026)**: Eleven v4 đứng đầu (Elo 1340); Azure Neural không có trong 30 hạng đầu đọc được; mô hình mở chạy trên máy (Kokoro, Chatterbox) kém khoảng 300 điểm [G15][G16].
5. **Thái độ người xem**: nghe mù thì gần như không phân biệt [G4], nhưng 47% người nghe podcast Mỹ nói sẽ nghe ít hơn nếu biết giọng AI [G6]. Khi bị nghi thì lượng bình luận chê tăng; khi kênh bỏ giọng AI thì được khen (Fossil, BeyondTheBlue). Mr. Science bị chê "AI" ở hai video lớn nhất mà vẫn có 17,3 triệu và 3,5 triệu lượt.
6. **YouTube** không nêu tên giọng TTS trong chính sách kiếm tiền; cái bị cấm là nội dung làm theo khuôn [G41]. Clone giọng chính mình để lồng tiếng không phải khai nhãn [G40].
7. **Ảnh AI vẽ con vật, đồ vật có thật bị bắt lỗi ngay** ("whatever AI you used… does not know what a crab looks like"; BeyondTheBlue mất người đăng ký vì ảnh AI vẽ cá heo to bằng orca).

## 4. Đã đưa vào World Wobble

| Bài học | Sửa ở đâu |
|---|---|
| Văn kiểu AI | `validate_script.py` thêm `check_van_ai` (câu đối xứng, đảo vòng, "here's why", cụm sáo, tính từ giật gân, 4 câu liền nhau dài bằng nhau); luật ở `.claude/rules/van-phong-loi-doc.md` mục "Văn kiểu AI" |
| Giọng đọc | `kenh/ho-so-kenh.md` (giọng): ghi bảng xếp hạng, kế hoạch nghe mù trước khi bật kiếm tiền; `long-tieng` SKILL: không autotune, cách làm giọng bớt máy |
| Ảnh AI con vật, đồ vật thật | `viet-kich-ban/references/hang-anh.md`: con vật có thật phải đối chiếu ảnh thật hoặc vẽ SVG |
| Cách đo ngách | `goi-y-chu-de` SKILL: dùng trung vị video năm nay; `docs/du-lieu-le-hoi-2026-11-24/yt_search.py` có tuỳ chọn `nam-nay` |
| Đọc bình luận đối thủ và của mình | `phan-tich-hieu-qua` SKILL: cào bình luận tìm chữ "AI", "voice" bằng `do_giong.py` |
| Tập theo mùa | `goi-y-chu-de` SKILL: một tập lễ hội gắn một nơi cụ thể là ứng viên hợp lệ nếu vẫn trả lời "vì sao sống ở đây" |
| Kênh thứ hai | `kenh/ho-so-kenh.md` và `.claude/rules/chinh-xac-va-ban-quyen.md` mục 9: cho phép một kênh khác hẳn (đề tài, nhân vật, hình thức, tài khoản), không phối hợp |

## 5. Còn mở

- Nghe mù 3 giọng (Andrew Neural hiện tại, Eleven v4 giọng có sẵn, Eleven v4 clone giọng người làm kênh) trên một đoạn 2 phút, trước khi bật kiếm tiền.
- Chưa có số liệu thật của World Wobble; các bài học trên lấy từ kênh khác, nên là mặc định ban đầu, không phải quy luật.

## 6. Cho kênh thứ hai (động vật)

- Nhánh mở: sinh vật biển sâu và động vật biển lớn, mỗi tập một loài hoặc một câu hỏi "vì sao". Dự phòng nếu biển bão hoà: động vật vùng cao, núi. Tránh nhánh orca/cá nhà táng đang bão hoà (video thấp nhất của cả kênh đang lên đều là đề tài này).
- Hình: xen cảnh quay công khai (cơ quan nhà nước các nước, kiểm giấy phép từng kho), sơ đồ và hoạt hình bằng code, ảnh AI chỉ làm nền; con vật không để AI vẽ.
- Giọng: AI đóng gói toàn bộ (người làm kênh chốt 24/11/2026); ưu tiên mô hình hạng đầu bảng mù hoặc clone giọng người làm kênh; kịch bản qua bộ kiểm văn AI.
- Dự án riêng, repo riêng, tài khoản riêng.
