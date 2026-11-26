# Bài học sản xuất tập 4 Santa Cruz del Islote (26/11/2026)

Bài học quy trình (không phải số liệu người xem). Áp dụng từ tập 5. Đọc cùng [bai-hoc-san-xuat-tap-2-2026-11-23.md](bai-hoc-san-xuat-tap-2-2026-11-23.md).

## Lời (sửa ở kịch bản, trước khi lồng tiếng)

- **Câu chào là câu cố định của `mo-ket`**: "Hi, I'm Wob. I visit odd places and ask why anyone stays." Tập 4 lỡ viết câu khác vì phiên chính dặn biên kịch "đừng chép câu tập 3"; luật "không lặp câu mở" áp cho câu đầu tập, không áp cho câu chào nhận diện. Phải lồng lại cảnh 1.
- **Sau khi lộ đáp án sớm (luật "nhá điều tiêu đề hứa trong 60 s"), phải mở ngay một vòng tò mò mới.** Tập 4 nói "không muỗi" ở 0:44 rồi tới 2:55 mới có câu kéo tiếp ("That explains a stop. It doesn't explain a town."); ở giữa là 40 s gag ba lô và 20 s đào kho báu mà người xem biết là sai (phản biện: điểm rời dễ nhất 1:41–2:42). Câu kéo nên đặt ngay sau đáp án sớm.
- **Không đọc liền nhiều cơ quan nhà nước** (Hải quân, ngân hàng, Bộ Nhà ở, Bộ Năng lượng ở 5:52–6:31 nghe như thông cáo). Chọn 1–2 chi tiết đắt nhất, còn lại bỏ.
- **Rào đón chỉ đặt ở khẳng định mức C sau kiểm chứng.** Ba câu rào ("depending on who you ask", "By some accounts", "reportedly") rơi vào khẳng định cuối cùng là mức A/B. Khi sửa theo kiểm chứng, xem lại mức sau khi kiểm lại hai vòng rồi mới thêm rào.
- **Câu đùa hai nghĩa**: "the tourists are catching up with the fish" nghe như du khách đi bắt cá. Đọc to từng câu đùa một lần.
- **Phán quyết**: không viết câu khen/chê tổng quát về nơi đó trái với chương trước ("The island's fine" sau chương xói lở); không so "lý do của họ vừa một chiếc thuyền đánh cá" (sát chê nghèo). Gắn phán quyết vào cái giá cụ thể (nước, biển, chỗ ở) và lỗi của Wob.
- **Câu đã thành khuôn của kênh, không dùng lại**: "I gave the X one last shake. Still …", "I changed my mind (back)", câu tóm ba vế ở phán quyết ("So here's how it adds up / So here is how it fits"), "Would I move here/there?", cặp "It suits / It does not suit". Kịch bản Uros (tập 9) đang có "changed my mind back": sửa trước khi lồng.
- **Chương "một ngày ở đây" đã dùng 3 tập liền** (tập 1, 3, 4). Tập 5 dùng khuôn khác hoặc đặt tên chương không theo mốc giờ.

## Kỹ thuật

- **Giọng Edge có đỉnh nhọn**: `mix_audio.py` cũ hạ đích TP làm độ lớn tụt còn −15,3 LUFS. Đã sửa nhánh dự phòng (đo → tăng âm → alimiter chạy ở 192 kHz ≈ chặn true peak): ra −14,2 LUFS, TP −1,2.
- **Phiên âm tên có gạch nối** (`kar-tah-HAY-nah`) làm Edge tách thành nhiều từ → `timing=tts-raw` → phụ đề lộ phiên âm. Sau `tts.py` luôn xem dòng cảnh báo `tts-raw` và chạy `whisper_khop.py --only` cho cảnh đó.
- **Hàm `T()` trong `sinh-phan-canh.py` bỏ dấu câu** nên "Next:" khớp nhầm "next to" (d33). Đã sửa để khớp cả dấu câu; tập sau chép bản này.
- **Ảnh AI ComfyUI tập 4 không vào bản cuối**: thợ dựng vẽ mọi phông bằng code cho đồng tông. Tập 5 có thể bỏ hẳn bước ảnh AI phụ, hoặc chỉ tạo khi đạo diễn ghi rõ dùng ở đoạn nào.
- **Khung end screen mặc định** của `duoi-tap.js` lấn vùng logo; đã dời xuống y 160 / 500, vòng tâm y 922.
- **2K (2560×1440)**: thời gian render đoạn ×1,3–1,6; ghép 25–45 phút; ổ D ~7–8 GB/tập. Bốn thợ song song chạy được nhưng render đôi lúc lỗi `sub_timeline_script_failure` khi máy quá tải; render lại một mình là qua.
- **Thư mục scratchpad dùng chung giữa các thợ** làm một thợ ghi đè `render.sh` của thợ khác. Dặn mỗi thợ dùng thư mục con riêng.
