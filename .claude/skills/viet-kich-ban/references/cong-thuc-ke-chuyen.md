# Công thức kể chuyện "Wob kể chuyến đi"

> Đúc kết 17/11/2026 từ: hướng dẫn hoạt hình của ClaudeAnimationBase (MIT), bản đo phong cách 20 clip của claude-animated-shorts (MIT), 5 video TikTok người làm kênh gửi, và bản thử 60s Oymyakon. Chi tiết, nguồn: [docs/thu-nghiem-thu-vien-hoat-hinh-2026-11-16.md](../../../../docs/thu-nghiem-thu-vien-hoat-hinh-2026-11-16.md).
> Đây là **mặc định ban đầu** cho người viết, không phải khuôn bắt buộc. Kênh cấm làm theo khuôn (luật `thuong-hieu.md`): công thức là bộ đồ nghề để **thay đổi** cách kể giữa các chương và giữa các tập, không phải để chép lặp.
> Áp cùng: `.claude/rules/van-phong-loi-doc.md` (văn phong, ngôi thứ nhất), `docs/dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md` mục 3–4 (hai lớp thời gian, luật trung thực).

## 1. Viết cho hình: mỗi câu là một nhịp hình

- Video là hoạt hình, nên **mỗi câu phải vẽ được**: một việc Wob làm, một đồ vật, một phản ứng, một cảnh. Câu không vẽ được ("Life here is complicated.") thì viết lại thành câu vẽ được ("I tried to open the door. The door had other plans.").
- Hình minh hoạ đúng điều câu nói; **lời không tả lại thứ người xem đang thấy** mà nói thêm điều hình không nói được (vì sao, bao nhiêu, cảm giác của Wob). Hình nói "cá dựng đứng trong thùng"; lời nói "The village itself is the freezer."
- **Đạo cụ mang câu đùa**: con cá cứng như tấm ván, cốc trà đông, chiếc xe nổ máy không người. Mỗi chương nên có một đạo cụ chính mà cả gag và sự thật xoay quanh nó.
- **Mỗi lúc một điều để hiểu** (ClaudeAnimationBase): nguyên nhân rồi mới phản ứng, không dồn hai ý vào một câu. Sau câu punchline, câu tiếp theo phải để người xem kịp cười: hoặc ngắt câu ngắn ("Anyway."), hoặc để đạo diễn giữ hình 0,6–1 giây (ghi `y_hinh`: "giữ hình").

## 2. Nhịp của một chương (khung gợi ý, 1,5–3 phút)

Rút từ cấu trúc chung của các clip hoạt hình kể chuyện được xem nhiều, đổi cho video dài và ngôi thứ nhất:

| # | Nhịp | Viết thế nào | Ví dụ (minh hoạ cú pháp, chưa kiểm chứng) |
|---|---|---|---|
| 1 | **Mở bằng một điều nghe vô lý, nói như sự thật** | 10–16 từ, không dẫn dắt | "In this village, the school only closes when it gets colder than a freezer." |
| 2 | Bối cảnh | 1–2 câu cụ thể: giờ, mùa, đồ vật, việc Wob đang làm | "It was nine in the morning. Still dark. I had a scarf and a plan." |
| 3 | **Leo thang 3–4 nhịp** | Wob thử, hỏng, thử lớn hơn, hỏng to hơn. Mỗi nhịp to hơn nhịp trước | Bước ra ngoài → lông mi đóng băng → đứng lâu hơn → … |
| 4 | Nhịp hỏi | Một câu hỏi ngắn, thường Wob tự hỏi | "So why would anyone stay?" |
| 5 | **Chuyển sang cơ chế thật** | Câu chuyển + sự thật có nguồn + **một so sánh đời thường** | "Here's the thing. … Think of your car on a winter morning, then multiply the winter." |
| 6 | Hệ quả | Tập quán, luật lệ, lựa chọn sinh ra từ cơ chế: đây là một mảnh câu trả lời "vì sao người ta sống ở đây" | |
| 7 | **Kết chương bằng câu ngắn** | Callback, mỉa nhẹ, hoặc câu đôi tỉnh bơ | "Luckily, the bus still came. Unluckily, so did January." |

- **Câu đôi tỉnh bơ** ("Luckily… / Unluckily…", "The good news… The bad news…"): tối đa một lần mỗi tập, đổi cách nói giữa các tập.
- **Câu chuyển ở nhịp 5 phải đổi**: "Here's the thing", "Turns out", "The reason is boring and brilliant", "Locals have a word for this…", hỏi ngược… Không dùng một câu chuyển cho mọi chương (`validate_script.py` sẽ cảnh báo khi cùng một cụm mở đầu câu xuất hiện ở ≥ 3 cảnh).
- **So sánh đời thường** là thứ biến một sự thật khô thành thứ người xem nhớ: tủ đông, cái xích đu, ấm nước, xe hơi buổi sáng. Mỗi chương giải thích có ít nhất một so sánh; so sánh không được làm sai sự thật.

## 3. Tám khuôn chương: đổi cách kể để đổi cách dựng

Mỗi khuôn kéo theo một kiểu hình khác, nên **đổi khuôn = đổi cách edit**. Đạo diễn (`dao-dien-hoat-hinh`) chọn phong cách và thẻ cảnh theo khuôn này (`templates/hoat-hinh/_the-canh/`).

| Khuôn (`khuon`) | Mạch | Hợp phong cách | Thẻ cảnh gợi ý |
|---|---|---|---|
| `thu-hong-hieu` | Wob thử một hoạt động có thật ở đó → hỏng theo cách buồn cười → hiểu ra vì sao người ở đây làm khác | cắt giấy + chèn vẽ tay ở chỗ hỏng | `leo-thang-ba-lan`, `take-cham`, `giu-tinh-bo` |
| `doan-sai-roi-lat` | Wob đoán một lý do (nghe hợp lý) → sai → lý do thật bất ngờ hơn | vẽ tay sơ đồ cho phần đoán, cắt giấy cho phần thật | `so-do-ve-tay`, `lat-the` |
| `phong-quy-mo` | Từ một chi tiết nhỏ kéo ra toàn cảnh (một con cá → cái chợ → cả làng là tủ đông) | diorama / thế giới 3D, camera lùi | `lui-ra-toan-canh`, `wob-be-ti` |
| `mot-ngay-o-day` | Một ngày theo giờ: sáng, trưa, tối, mỗi mốc một chi tiết có thật | cắt giấy hành trình | `dong-ho-troi`, `di-bo-parallax` |
| `so-sanh-doi-thuong` | Giải thích bằng một hình ảnh tưởng tượng ("Picture your fridge…") | vẽ tay, rõ là giả định | `bong-bong-tuong-tuong`, `so-do-ve-tay` |
| `trang-so-hanh-trinh` | Bản đồ trên trang sổ, đường nét đứt, phương tiện chạy theo đường; khoảng cách, độ xa | diorama sổ pop-up + bản đồ D3 | `trang-so-ban-do`, `ky-vat-chuyen-canh` |
| `lich-su-nghiem` | Chuyện nặng (Gulag, sơ tán, chiến tranh): Wob ở hiện tại đặt kỷ vật xuống, nói thẳng, **không gag** | cắt giấy tông trầm | `dat-ky-vat-xuong`, `lui-cham-im-lang` |
| `hai-mua` | Cùng một nơi ở hai mùa ("I went back in July"), cắt cứng giữa hai thời điểm | diorama / thế giới 3D cùng một bối cảnh, đổi ánh sáng | `cat-cung-doi-mua` |

Luật dùng khuôn (mặc định ban đầu):
- Một tập dùng **ít nhất 4 khuôn khác nhau**; **hai chương liền nhau không cùng khuôn**.
- `lich-su-nghiem` tối đa một chương, không đặt ở đầu tập.
- Khuôn của các tập trước nằm trong `script.json` cũ: chương mở tập (sau hook) không dùng lại khuôn chương mở của tập ngay trước.

## 4. Kho gag bằng hình

Hài của kênh vẫn nằm chủ yếu trong lời (deadpan), nhưng mỗi cảnh hồi ức cần **ít nhất một gag mà chỉ hình mới kể được**. Ghi gag vào `y_hinh` để đạo diễn biết:

| Loại | Cách | Ví dụ |
|---|---|---|
| Đạo cụ vô tri "có cảm xúc" | Đồ vật phản ứng thay người | Con cá thanh thản; cốc trà phủ băng |
| Take chậm | Sự cố xảy ra → Wob nhìn → **dừng** → mới phản ứng | Lông mi bật ra, Wob lác mắt nhìn lên |
| Giữ hình tỉnh bơ | Sau punchline, Wob nhìn thẳng người xem, không làm gì 0,6–1 s | "On purpose." |
| Ba lần, lần ba lệch | Lặp một việc hai lần bình thường, lần ba hỏng khác kiểu | Đi qua hai con suối, con thứ ba bốc hơi mà Wob không thấy |
| Quy mô | Wob bé tí cạnh vật to của nơi đó | Ba lô to hơn ghế máy bay; Wob thấp hơn bậu cửa sổ |
| Callback cuối tập | Đạo cụ ở hook quay lại ở outro, đã đổi trạng thái | Con cá rã đông trên bàn |
| Smear / cắt chèn | Một đoạn vẽ tay 2–5 giây chen giữa cảnh khác | Wob tưởng tượng ngày nghỉ tuyết |

Không gag về người dân, không gag trong `lich-su-nghiem`.

## 5. Mở tập, kết tập

- **Câu đầu ở hiện tại, cầm một kỷ vật lạ**, vào thẳng (≤ 10 giây): "This is a fish." Kỷ vật là câu hỏi bằng hình. Câu thứ hai nói nơi đó và một con số; câu thứ ba là câu hỏi trung tâm hoặc một câu tỉnh bơ.
- **Khoảng 30 giây đầu hứa một điều cụ thể** người xem sẽ biết, bằng giọng Wob ("By the end of this trip I understood why five hundred people choose this. It took losing my eyelashes.").
- **Kết** ở hiện tại: Wob xếp kỷ vật lại, ghép các mảnh "vì sao", đóng con dấu lên trang sổ, một câu hỏi kéo bình luận. **Kết đúng ở chữ cuối**, không câu đệm sau đó. Callback kỷ vật mở tập.

## 6. Ngôi thứ nhất và luật trung thực

- Wob tự kể ("I went…", "I tried…"). Được hư cấu: Wob đã đi, Wob cảm thấy gì, Wob gặp nạn gì, thứ tự chuyến đi. Không được hư cấu: mọi thứ Wob "thấy", "được kể", "học được" (đều là khẳng định có nguồn, đăng ký trong `claims`).
- Không bịa cuộc gặp người thật cụ thể ("the mayor told me"). "Locals told me…" chỉ khi nguồn là lời người địa phương được báo chí hoặc học thuật ghi lại.
- Nhảy mùa phải nói rõ ("I went back in July"). Không kể lễ hội tháng 3 và mùa hè 34°C như cùng một tuần.

## 7. Nhịp đọc

- Giọng Andrew đọc khoảng 150–165 từ/phút. Clip hoạt hình kể chuyện ngắn đọc nhanh hơn (khoảng 3,7 từ/giây) và gần như không ngừng; video dài của kênh giữ nhịp thường, **chỉ để khoảng lặng ở chỗ có gag bằng hình** (đạo diễn đặt 0,8–2 giây giữa hai cảnh).
- Câu trung bình khoảng 13 từ; câu punchline 2–6 từ.

## 8. Trường `y_hinh` (gợi ý hình cho đạo diễn)

Người viết ghi ý hình cùng lúc với lời, để đạo diễn và người dựng không phải đoán. Định dạng xem `schema.md` (trường cảnh `khuon`, `y_hinh`). Ghi **ý**, không ghi cách dựng chi tiết: "Wob chìa cái túi, bàn tay đeo găng đưa ra một con cá cứng đờ; cá không vừa túi" chứ không ghi toạ độ, easing.
