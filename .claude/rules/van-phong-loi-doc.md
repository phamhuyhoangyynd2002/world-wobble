# Văn phong lời đọc và chữ trên hình

Lời đọc viết **tiếng Anh**, chữ trên hình tiếng Anh. Hướng dẫn này viết tiếng Việt cho người làm kênh đọc. Áp dụng cùng `.claude/rules/video-dai-youtube.md` và `.claude/rules/thuong-hieu.md`.

## Giọng văn (hồ sơ kênh)

- Tò mò, khô, hài kiểu nói giảm (deadpan), như một người bạn kể chuyện thú vị. Người kể là kênh; Wob là nhân vật trong chuyện, không phải người kể.
- Đùa về thời tiết, địa hình, sự vô lý của địa lý và nỗi khổ của Wob. **Không đùa về người dân** nơi đó, không chê nghèo, không định kiến.
- Hài nằm chủ yếu **trong lời**: nói giảm ("It gets a little chilly. Minus sixty-seven."), đặt một chi tiết bình thường cạnh một con số điên rồ, Wob tự tin rồi bị sự thật đánh bại. Punchline đứng thành câu ngắn riêng sau một câu dài.
- Nói quá phải rõ là đùa; không bao giờ đùa bằng con số nghe như thật mà sai.
- Có chính kiến: mỗi tập kết bằng phán quyết của Wob kèm lý do thật, và nói ai sẽ thích sống ở đó, ai không.

## Viết cho tai và cho TTS

- Câu ngắn, mỗi câu một ý, phần lớn dưới 20 từ. Tốc độ đọc mặc định khoảng 150–160 từ/phút; `validate_script.py` ước độ dài theo 155 từ/phút.
- **Số viết bằng chữ trong `narration`** ("minus sixty-seven degrees", "about five hundred people", "nineteen thirty-three") để mốc từng từ của TTS khớp lời gốc và phụ đề không lệch. Chữ trên hình dùng chữ số (`−67°C`, `~500`, `1933`).
- Nhiệt độ: nói độ C, lần đầu kèm độ F ("minus sixty-seven Celsius, that's about minus eighty-nine Fahrenheit"); chữ trên hình ghi cả hai. Khoảng cách, độ cao: nói đơn vị mét, ki-lô-mét, lần đầu kèm đơn vị Mỹ. Đây là mặc định ban đầu vì khán giả trộn Mỹ, Anh, Canada, Úc.
- Tên nơi khó đọc: thêm `pronunciation` cho cảnh (`"Oymyakon: oy-myah-KON"`), không đưa phiên âm vào `narration`. Sau khi tạo giọng, `nghe_lai.py` bắt lỗi đọc lặp, đọc cụt.
- Không ký tự đặc biệt trong lời đọc: `#`, `&`, `/`, `→`, emoji, ngoặc kép cong.
- Không câu đệm: "as you may know", "without further ado", "let's dive in", "in today's video".

## Mở và kết

- **Câu đầu là câu hỏi hoặc tình huống của tập**, vào thẳng trong 10 giây đầu. Không chào, không giới thiệu kênh, không "hey guys", "welcome back".
- Không lặp nguyên văn câu mở, câu kết của các tập trước (`validate_script.py` so với mọi `projects/*/script.json`).
- Cảnh cuối: đóng vòng "Would Wob move here?", nêu phán quyết (nhãn con dấu + 1–2 câu lý do), một câu hỏi kéo bình luận ("Would you last a winter here?"). Câu hỏi đổi theo từng tập.

## Từ cấm và cách nói dè dặt

- Cấm (hồ sơ kênh): "you won't believe", "insane", "shocking", "nobody talks about". Thêm: "mind-blowing", "literally" (khi không đúng nghĩa đen), "smash that like", "the truth they don't want you to know".
- Khẳng định mức C phải nói rõ trong lời: "estimates vary", "according to the town's own records", "some sources say… others…". Khẳng định là tin kể lại: "locals tell a story that…".
- Kỷ lục nói rõ tiêu chí: "the coldest permanently inhabited place", không chỉ "the coldest place".

## Chữ trên hình (`on_screen_text`, `facts`)

- Tiêu đề cảnh, chương: tối đa 6 từ. Nhãn bản đồ: tên nơi + một con số.
- Mỗi lúc một khối chữ mới ngoài phụ đề; hai khối không nói cùng một ý.
- Chữ trên hình là lớp cho người xem bằng mắt (TV tắt tiếng ít gặp, nhưng chữ phải tự đứng được): đọc riêng các tiêu đề chương vẫn hiểu video nói gì.
- Nhãn con dấu là chữ cố định: `WOULD MOVE`, `SUMMER ONLY`, `NOPE`.
