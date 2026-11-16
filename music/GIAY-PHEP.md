# Sổ giấy phép nhạc nền

> Mỗi file trong `music/` phải có đúng một dòng ở bảng dưới. File không có trong sổ, hoặc cột "Thương mại" khác `có`, sẽ bị `kiem_tra_ban_quyen.py` chặn.
> "Thương mại" = được dùng trong video trên kênh YouTube có kiếm tiền (YPP).
> "Bằng chứng" = link trang giấy phép, mã hoá đơn, hoặc đường dẫn file PDF/ảnh chụp lưu trong `music/bang-chung/`.
> Nguồn dự kiến (hồ sơ kênh): YouTube Audio Library hoặc thư viện có giấy phép thương mại. Bài YouTube Audio Library có ghi "Attribution required" thì chép đúng câu ghi công vào cột "Ghi công bắt buộc"; `seo-youtube` sẽ đưa câu đó vào mô tả.
> Video 10–15 phút cần nhạc nhẹ, không lời, lặp được mà không mệt tai; tránh nhạc vui nhộn nhịp nhanh kiểu video ngắn.

| File | Nguồn | Giấy phép | Thương mại | Ghi công bắt buộc | Bằng chứng |
|---|---|---|---|---|---|
| wallpaper.mp3 | Kevin MacLeod, incompetech.com (tải 16/11/2026) | CC BY 4.0 | có | "Wallpaper Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 4.0 https://creativecommons.org/licenses/by/4.0/" | music/bang-chung/incompetech-2026-11-16.md |
| inspired.mp3 | Kevin MacLeod, incompetech.com (tải 16/11/2026) | CC BY 4.0 | có | "Inspired Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 4.0 https://creativecommons.org/licenses/by/4.0/" | music/bang-chung/incompetech-2026-11-16.md |
| lightless-dawn.mp3 | Kevin MacLeod, incompetech.com (tải 16/11/2026) | CC BY 4.0 | có | "Lightless Dawn Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 4.0 https://creativecommons.org/licenses/by/4.0/" | music/bang-chung/incompetech-2026-11-16.md |
| frost-waltz.mp3 | Kevin MacLeod, incompetech.com (tải 16/11/2026) | CC BY 4.0 | có | "Frost Waltz Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 4.0 https://creativecommons.org/licenses/by/4.0/" | music/bang-chung/incompetech-2026-11-16.md |
| investigations.mp3 | Kevin MacLeod, incompetech.com (tải 16/11/2026) | CC BY 4.0 | có | "Investigations Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 4.0 https://creativecommons.org/licenses/by/4.0/" | music/bang-chung/incompetech-2026-11-16.md |
| sneaky-snitch.mp3 | Kevin MacLeod, incompetech.com (tải 16/11/2026) | CC BY 4.0 | có | "Sneaky Snitch Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 4.0 https://creativecommons.org/licenses/by/4.0/" | music/bang-chung/incompetech-2026-11-16.md |
<!-- Ví dụ:
| calm-curiosity.mp3 | YouTube Audio Library (tải 20/11/2026) | YouTube Audio Library | có | không | music/bang-chung/calm-curiosity.png |
-->

## Gợi ý theo tâm trạng

> Máy đọc bảng này: cột đầu có mã tâm trạng trong dấu `…`, cột hai liệt kê file trong dấu `…`. `script.json` gắn `music_mood` (mã dưới đây) cho từng cảnh; `build_timeline.py` gộp cảnh liền nhau cùng tâm trạng thành một đoạn nhạc, xoay vòng giữa các bài cùng tâm trạng, chuyển bài bằng crossfade (chốt 16/11/2026: người làm kênh muốn đổi nhạc theo nhịp video).

| Tâm trạng | Bài |
|---|---|
| `to-mo` Tò mò, khám phá (mặc định) | `wallpaper.mp3`, `inspired.mp3` |
| `khac-nghiet` Khắc nghiệt, lạnh, hoang vắng | `lightless-dawn.mp3`, `frost-waltz.mp3` |
| `hai` Hài, Wob gặp nạn | `investigations.mp3`, `sneaky-snitch.mp3` |

Bài nào chưa ai nghe thì người làm kênh nghe lại sau tập 1 và loại nếu không hợp (Claude chọn theo tên và mô tả, không nghe được).
