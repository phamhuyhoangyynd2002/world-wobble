---
name: goi-y-chu-de
description: Gợi ý 10 nơi cho các tập "Why do people live here?" tiếp theo của World Wobble, xếp hạng theo độ tò mò, độ có nguồn tốt, độ khác các tập đã làm, rủi ro (chủ quyền, chính trị, người dân dễ bị chê), khả năng có ảnh/bản đồ, và nhu cầu tìm kiếm đo được trên YouTube. Dùng khi người làm kênh hỏi "làm tập nào tiếp", "gợi ý đề tài", "lên lịch tháng này", hoặc /tao-video không có đề tài.
argument-hint: "[số đề tài] [hướng, ví dụ: lạnh, cao, đảo]"
---

# Gợi ý đề tài

Đầu vào: `$ARGUMENTS`.

1. Đọc `kenh/ho-so-kenh.md` (hướng của giai đoạn, danh sách ý tưởng, mục "Không làm"), `kenh/bai-hoc.md`, `brief.md` của mọi tập đã làm.
2. Lập danh sách ứng viên: ý tưởng trong hồ sơ chưa làm + tìm thêm (nơi khắc nghiệt, kỳ lạ có người ở thường trực).
3. Với mỗi ứng viên, đo nhu cầu nếu có thể: tìm trên YouTube (yt-dlp hoặc trang tìm kiếm) "why do people live in <nơi>", ghi số video và lượt xem của vài video đầu, ngày đăng; cách làm ở `docs/du-lieu-le-hoi-2026-11-24/yt_search.py` (`python yt_search.py tu-khoa.tsv` và `... nam-nay`). **Số quyết định là trung vị lượt xem của video đăng trong năm nay** (`nam-nay`): nó cho biết video mới còn lên được không; trung vị "mọi lúc" bị video cũ kéo lên (ví dụ "thanksgiving explained" mọi lúc 384.003, năm 2026 chỉ 160; `docs/bai-hoc-thi-truong-giong-doc-2026-11-24.md` mục 2). Không đo được thì ghi "chưa đo", không đoán.
   - **Tập theo mùa**: lễ hội gắn với một nơi cụ thể (La Tomatina ở Buñol, Día de Muertos ở Oaxaca, Giáng sinh ở Rovaniemi) là ứng viên hợp lệ nếu vẫn trả lời "vì sao người ta sống ở đây". Đăng 2–4 tuần trước ngày lễ; quý 4 có CPM cao nhất, tháng 1 thấp hơn tháng 12 khoảng 30–50%. Không làm video so sánh Tết Việt/Trung/Hàn (tranh cãi "Chinese/Lunar New Year"), không làm lễ tôn giáo làm trọng tâm. Căn cứ: `docs/danh-gia-thi-truong-kenh-le-hoi-2026-11-24.md`.
4. Chấm mỗi tiêu chí 1–5:
   - **Tò mò**: người xem có tự hỏi "sao lại sống ở đó?" không.
   - **Nguồn**: có nguồn gốc (thống kê, chính quyền, nghiên cứu) để đạt mức A/B không.
   - **Khác biệt**: khác các tập đã làm (khí hậu, châu lục, lý do định cư).
   - **Hình**: vẽ bản đồ được, có ảnh Commons dùng được không.
   - **An toàn** (điểm cao = ít rủi ro): xa vùng Biển Đông, biên giới tranh chấp, chiến sự; người dân không dễ bị biến thành trò cười.
   - **Nhu cầu** [Đo]: từ bước 3.
5. Bảng 10 đề tài xếp theo tổng điểm, mỗi đề tài: nơi, nước, câu hỏi gợi ý, lập luận dự kiến (1 câu), phán quyết dự kiến của Wob, điểm từng tiêu chí, rủi ro cần lưu ý.

Không chép tiêu đề, khuôn của video khác. Đề tài ngoài hướng của giai đoạn thì đánh dấu rõ.
