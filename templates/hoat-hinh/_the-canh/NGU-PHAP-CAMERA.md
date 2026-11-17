# Ngữ pháp camera và nhịp hình (dùng chung mọi phong cách)

> 17/11/2026. Số đo lấy từ bản đo 20 clip hoạt hình kể chuyện trong `mromidev/claude-animated-shorts` (MIT, `references/reports/motion.md`, `depth.md`; đo trên clip dọc 1080×1920, ở đây quy về khung ngang 1920×1080) và hướng dẫn thời gian của `JohnHeibel/ClaudeAnimationBase` (MIT). Đã thử trên kênh: T2 (cắt giấy, bàn kỷ vật) và T4 (Wob trong phố 3D), xem `docs/thu-nghiem-thu-vien-hoat-hinh-2026-11-16.md`.
> Là **mặc định ban đầu**. Đoạn nào làm khác thì ghi lý do vào `nhat-ky.md`. Khi có đường giữ chân người xem thật, `/phan-tich-hieu-qua` chỉnh lại.

## 1. Mỗi lúc một điều để hiểu

- Với mỗi shot, liệt kê những gì người xem phải hiểu, theo thứ tự. Mỗi điều cần: thời gian để **tìm thấy**, để **hiểu**, và một nhịp để **đọng lại** trước điều tiếp theo.
- Nguyên nhân rồi mới phản ứng, không chồng lên nhau.
- Động tác có lấy đà thì làm rất nhanh được, nhưng **ý nghĩa cần giữ hình** sau đó. Đi nhanh qua chỗ không quan trọng, dừng lâu ở chỗ quan trọng.
- **Dẫn mắt** trước một điều quan trọng: cho nhân vật nhìn về phía đó, đưa camera tới, hoặc cho vật đó cử động, sáng lên trước.
- Đếm khung (30 khung = 1 giây). Một điều chỉ kéo dài vài khung, hoặc chung khung với điều khác, sẽ bị bỏ lỡ. Ví dụ đo được: lấy đà và ném 0,15 s · vật bay 0,8 s · tới nơi 0,45 s · phản ứng 0,6 s · giữ cuối 1,2 s. Bản đầu nén cả chuỗi vào 1,3 s, người xem không theo kịp.

## 2. Thời điểm so với lời

- Phản ứng bằng hình (đổi biểu cảm, đồ vật bật ra, cú va) rơi **0–3 khung trước** chữ tương ứng trong `subtitles.json`, không rơi sau.
- Punchline: giữ hình **0,6–1 giây** sau chữ cuối. Câu tỉnh bơ kết chương: giữ 1–1,5 giây.
- Khoảng lặng không lời giữa hai cảnh (0,8–2 giây) để dành cho gag bằng hình hoặc chuyển cảnh, không để trống.

## 3. Camera

| Luật | Số | Ghi chú |
|---|---|---|
| **Không có khung đứng yên** | Giữ hình vẫn đẩy vào **0,15–0,35 % mỗi khung**; ở chữ nhấn 0,6 %/khung | Khung giữ yên ≥ 12 khung bị `kiem_dong_hinh.py` báo là đứng hình (trừ khi nét sôi đang chạy) |
| Phần lớn thời gian là giữ hình (có đẩy chậm) | ~80% khung camera đi < 0,5 px/khung (720p) | Không lắc tay giả, không trôi lơ lửng liên tục |
| **Di chuyển = cú lướt smootherstep** | 18–40 khung, đỉnh tốc độ ≤ 25 px/khung ở 720p (≈ 35 px ở 1080p) | Smootherstep đối xứng: tăng tốc = giảm tốc ≈ 10 khung |
| Cú lao (burst) | Đỉnh tốc độ ở khung đầu, tắt dần trong 8–10 khung (ease-out) | Dùng khi lao vào cận cảnh, vào hình vẽ, vào trang sổ |
| Cắt cứng | Chỉ ở bước nhảy lớn (đổi nơi, đổi thời gian, "Anyway.") | Clip mẫu: 0–1 cắt cứng mỗi clip; còn lại là camera liền mạch |
| Rung va chạm | Đổi chiều **mỗi khung**, tắt trong **7 khung** | Chỉ khoảnh khắc hài có chủ ý, không rung khi kể nghiêm |
| Nghiêng (dutch) | 3,5–5° | Lúc ngã, lúc kịch tính, cận mặt punchline |
| Vật tiền cảnh | Khoảng **1/3 số shot** | Vật tiền cảnh phải nhận ra được (hàng rào, bút chì, cột điện); một mảng cây bị cắt mép trông như "quả bóng xanh" thì bỏ |
| Góc máy | Thấp, ngang tầm Wob (Wob cao khoảng 1 m) | Nơi đó trông to, Wob trông bé: tự có hài quy mô |

## 4. Chiều sâu, mờ ống kính

- Mờ ống kính khoảng **1/3 thời lượng**: cận cảnh, trung cảnh, cảnh chèn đồ vật. Cảnh toàn và cảnh mở nơi chốn giữ nét toàn khung.
- Bán kính mờ của nền xa (quy về khung 1080 cao): cận cảnh 12–14 px · trung cảnh 10–12 px · cảnh vừa 7 px · cảnh toàn 0. **Nét ở mắt Wob**.
- Sương xa trùng màu chân trời; lớp xa nhạt dần (cảnh lạnh: sương băng; sa mạc: bụi vàng).
- Bloom chỉ cho vật phát sáng (cửa sổ, đèn, mặt trời), không cho cả khung.

## 5. Chuyển cảnh

- Mỗi chỗ nối cần một cách chuyển: vào shot đầu, giữa các shot, ra shot cuối.
- Ưu tiên **chuyển bằng camera liền mạch**: lia theo một vật bay từ chủ thể này sang chủ thể kia, lia nhoè (whip pan), bay xuyên cửa sổ hoặc trang sổ, hoà tan 6–8 khung khi đổi nơi.
- Giữa hai phong cách: theo kiểu nối trong `HOP-DONG.md` mục 5 (`giay`, `cat`, `chen`).
- Quay người (đổi hướng mặt) đi qua các góc nhìn chính trong 0,12–0,25 s.

## 6. Màu, ánh sáng theo nhịp

- Ánh sáng đổi theo nhịp kể: trưa → chiều tà → đêm xanh cho đoạn giải thích hay hồi tưởng. Đổi ở chỗ nhịp đổi, không đổi mỗi shot.
- Bóng ngả lạnh (xanh tím), phần sáng ấm; không bao giờ để bóng nâu đục.
- Không đen tuyệt đối, không trắng tuyệt đối (trừ khung nối `giay` là giấy `#EFE3C8`).
- Không hạt phim: làm file nặng gấp 4 và YouTube nén thành bệt.

## 7. Tự kiểm (bắt buộc trước khi giao một đoạn)

1. **Bảng khung**: mỗi shot một bảng, bước 0,1–0,15 s. Mỗi điều phải đọc được chỉ từ bảng.
2. **Dải khung**: mọi khung của mỗi động tác chính và mỗi chuyển cảnh: tìm chỗ thiếu lấy đà, thiếu theo đà, khung giật.
3. **Ảnh cận** đủ độ phân giải ở mặt Wob, tay, chỗ chạm, chỗ sáng.
4. `python .claude/skills/kiem-tra-video/scripts/kiem_dong_hinh.py <clip.mp4>`: đứng hình, khung đen/trắng, khung giật, số cắt.
5. Câu hỏi cuối: "Trông như phim hoạt hình hay bộ slide?". Wob không ở trong cảnh, hoặc không làm gì, ở quá 2/12 khung rải đều thì làm lại.

Bẫy dễ đọc nhầm đã gặp (claude-animated-shorts): xích đu một dây khuất sau đứa trẻ trông như treo cổ (luôn hai dây); vật sát ống kính < 2 m thành mảng to bị cắt mép; biển hiệu bị nắng xiên thành xám không đọc được (mặt biển không nhận sáng); viền sáng làm kiểu bản sao lệch ra ngoài biến mũ thành khung ảnh; lan can ngang ngực cắt ngang người (đặt ống kính cao hơn để lan can cắt ngang chân); cờ đỏ sao vàng vô tình thành cờ Việt Nam (dùng cờ đúng thời, đúng nơi).
