# Bài học sản xuất tập 2 Coober Pedy (23/11/2026)

Không phải số liệu người xem (cái đó ở `kenh/bai-hoc.md`). Đây là bài học quy trình, áp dụng từ tập 3.

## Lời và nhịp (sửa ở kịch bản, trước khi lồng tiếng)

- **Chốt lời trước khi dựng hình.** Phản biện chỉ ra lời mở chậm (0:13–0:50, khoảng cách + dân số + 3 câu rào đón) và chương nước nhồi số (6:27–8:00, ~93 s gần như không cười). Sửa lời sau khi đã dựng làm lệch mốc mọi đoạn phía sau, nên tập 2 không sửa được. Từ tập 3: biên kịch tự đọc lại từng chương theo câu hỏi "chương này có gag hình nào không, có quá 60 s chỉ đọc số không" trước khi validate.
- **Rào đón chỉ đặt ở khẳng định mức C thật sự.** Câu dè dặt thừa (permit 2:16, tên gọi 8:46) làm nhạt nhịp. Gộp lời dè dặt vào một cụm ngắn, không nhắc lại.
- **Đảo khuôn chương.** Tập 2 lặp thứ tự của tập 1: bàn kỷ vật → bản đồ → hồi ức → nỗi khổ → con dấu ở bàn. Tập 3 đổi thứ tự (ví dụ mở thẳng ở hiện trường, bàn kỷ vật ở giữa). Tránh câu chuyển có sẵn trong hướng dẫn văn phong ("The reason is boring and brilliant").
- **Cảnh hồi ức vẫn phải có Wob và một gag hình.** Ghi thẳng vào phân cảnh, đừng để thợ dựng tự quyết.
- **Lời và hình phải khớp từng chi tiết đồ vật.** Lỗi nặng nhất cổng 6a vòng 1: lời nói "I left the hat in the car" nhưng Wob vẫn đội mũ (d36). Đạo diễn ghi trạng thái trang phục theo từng nhịp có lời nhắc tới đồ vật.

## Kỹ thuật

- **Edge TTS:** chạy từng cảnh, nghỉ 15–45 s giữa các lần; `tts.py` nay ghi `subtitles.json` sau mỗi cảnh. Edge gộp từ ở tên riêng dài và số → dùng `whisper_khop.py`.
- **Ổ đĩa:** mỗi tập hoạt hình chiếm nhiều GB; render với `TMP/TEMP=D:/YouTube/world-wobble/tmp`. Ổ C (OneDrive) từng đầy giữa lúc dựng. Nên cân nhắc chuyển repo hoặc thư mục render sang ổ D.
- **Giới hạn API 5 giờ:** 4 thợ dựng song song chạm giới hạn 2 lần trong một đêm. Đặt lịch kiểm tra ~5 giờ một lần; gọi lại agent cũ bằng SendMessage thay vì tạo agent mới.
- **Kiểm chứng vòng 2:** Gemini web hay treo ở bước tìm kiếm; ChatGPT web (không đăng nhập) trả lời ổn định hơn. Tải câu trả lời dài bằng Blob về `Downloads`.
- **Ảnh chính bằng ComfyUI SDXL** dùng được nhưng hay vẽ xương rồng saguaro (đã thêm vào NEG) và ảnh nội thất chung chung; ảnh tông khác nét cắt giấy nên dựng lại bằng giấy cắt (d18).
- **Thư viện thiếu trang phục theo nơi** (mũ rộng vành, ba lô) nên mỗi thợ tự vẽ một kiểu, rủi ro lệch màu. Đã thêm vào `ve-tay/lib` và `diorama/lib`; bộ cắt giấy còn nằm ở `projects/2026-11-16-coober-pedy/hoat-hinh/cat-giay-cp-prelude.js`, cần đưa vào `cat-giay/lib`. Con rối diorama chưa có tư thế ngồi.
- **Sfx:** tên sfx trong phân cảnh phần lớn không có trong sổ; đạo diễn nên chọn từ danh sách `sfx/GIAY-PHEP.md`.
