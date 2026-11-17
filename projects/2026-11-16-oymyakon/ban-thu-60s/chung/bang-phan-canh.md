# Bảng phân cảnh chung – bản thử 60 giây "Wob kể chuyến đi Oymyakon"

> Ngày 16/11/2026. Dùng chung cho mọi phương án hình (a, b, c…). Lời, giọng, mốc từ, khẩu hình **giống nhau**; chỉ khác cách dựng hình.
> Định hướng: [docs/dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md](../../../../docs/dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md). Công cụ: [docs/cong-cu-hoat-hinh-moi-noi-2026-11-16.md](../../../../docs/cong-cu-hoat-hinh-moi-noi-2026-11-16.md).

## Đầu vào

| File | Nội dung |
|---|---|
| `script.json` | Lời 5 cảnh (tiếng Anh, Wob tự kể ngôi thứ nhất), khẳng định dùng (đã ĐẠT kiểm chứng ở tập 1: C01, C02, C03, C24, C27, C28) |
| `audio/scene-<id>.mp3` | Giọng Edge TTS `en-US-AndrewNeural` (nháp). Độ dài: 10,70 · 12,62 · 13,32 · 12,26 · 3,72 giây = 52,6 giây lời |
| `audio/subtitles.json` | Mốc từng từ (`scenes[].words[]` với `text`, `start`, `end`, tính từ đầu mỗi cảnh) |
| `khau-hinh/scene-<id>.json` | Mốc khẩu hình kiểu Rhubarb (`mouthCues[]`: `start`, `end`, `value` ∈ A,B,C,D,E,F,G,H,X), tính từ đầu mỗi cảnh. A = mím môi (m,b,p); B = hé, răng khép; C = mở vừa; D = mở to; E = hơi tròn; F = chu tròn (oo, w); G = răng chạm môi dưới (f,v); H = lưỡi (l); X = nghỉ, khép. Tạo bằng `.claude/skills/dung-hoat-hinh/scripts/tao_khau_hinh.py` (biên độ + mốc từ), không phải Rhubarb thật |

## Luật

- **Chuyến đi là tưởng tượng, sự thật là thật.** Chỉ nỗi khổ, phản ứng của Wob được hư cấu. Không thêm chữ, số nào ngoài các con số đã có trong lời.
- **Không ảnh chụp, không ảnh Commons, không ảnh AI.** Mọi thứ vẽ bằng code (SVG, CSS, canvas, Three.js).
- **Wob giữ đúng tạo hình** trong `templates/_shared/wob/` (quả địa cầu méo màu `#5A9FB8`, lục địa trừu tượng, nét mực viền, ba lô nâu có cuộn thảm đỏ, giày đỏ). Được tách bộ phận, thêm khớp, thêm bộ miệng và mí mắt cùng nét vẽ; không vẽ Wob kiểu khác, không tạo Wob bằng AI.
- **Người dân**: không vẽ mặt người. Người bán hàng chỉ là một bàn tay đeo găng. Không đùa về người dân.
- **Chữ chỉ nằm trên đồ vật** (nhiệt kế, biển tên làng, bảng giá), font Fraunces, cỡ ≥ 40px ở khung 1920×1080. Không chữ to giữa màn hình, không phụ đề đốt vào hình.
- **Bong bóng thoại của Wob** chỉ là ký hiệu ngắn (`?!`, `...`, `!`, hình cái túi, giọt mồ hôi), đi kèm tiếng líu lo `sfx/liu-lo-*.wav`.
- Bảng màu "Mực & giấy" trong `templates/_shared/frame.md`: nền `#1E2A2B`, biển `#3F6A70`, giấy `#EFE3C8`, đất nung `#E0703A`; thêm trắng tuyết, xanh băng cho cảnh lạnh.

## Phân cảnh

Mốc đặt giọng gợi ý (điều chỉnh được, miễn tổng 58–65 giây): cảnh 1 bắt đầu 0,4 s · cảnh 2 ở 12,6 s · cảnh 3 ở 27,0 s · cảnh 4 ở 42,2 s · cảnh 5 ở 56,2 s · hết ở khoảng 61 s. Khoảng trống giữa các cảnh dành cho chuyển cảnh và gag không lời.

### Cảnh 1 · HIỆN TẠI · bàn kỷ vật (~12 s)

> "This is a fish. I bought it in Oymyakon, a village often called the coldest permanently inhabited place on Earth. Roughly five hundred people live there. On purpose."

- Khung mở đã có hình (không màn đen): bàn gỗ dưới đèn bàn ấm, hộp kỷ vật mở nắp, sổ du lịch. Wob ngồi trên bàn, **giơ một con cá đông cứng như tấm ván** lên ngay chữ "fish".
- Wob gõ cá xuống bàn: *cộp* (`bonk.wav`). Cá không cong.
- "Oymyakon": Wob lật sổ, trang sổ có hình vẽ tay ngôi làng tuyết và **tấm biển "OYMYAKON · pop. ~500"**.
- "On purpose.": Wob quay ra nhìn thẳng người xem, mặt tỉnh bơ, **giữ hình** 0,6–1 s.
- Wob nói ở cảnh này: miệng mấp máy theo `khau-hinh/scene-1.json`.
- Chuyển cảnh: camera lao vào hình vẽ trên trang sổ; hình vẽ "sống dậy" thành cảnh hồi ức.

### Cảnh 2 · HỒI ỨC · bước ra ngoài (~14 s)

> "I went in January, when the average temperature is around minus forty-six Celsius. That's about minus fifty-one Fahrenheit. I stepped outside to look around. My eyelashes froze. I didn't know I had eyelashes."

- Phố làng tuyết: nhà gỗ thấp, cột khói bốc **thẳng đứng** từ ống khói, sương băng mờ, trời xanh nhạt lạnh. Có lớp gần, xa trôi lệch nhau.
- Nhiệt kế trên tường nhà: kim tụt xuống, mặt ghi **−46°C / −51°F**.
- "I stepped outside": cửa mở, Wob quấn khăn bước ra, đi lắc lư (`buoc-tuyet.wav`), nhìn trái, nhìn phải.
- "My eyelashes froze": **lông mi bật ra** trên mắt Wob (`pop.wav`), rồi đóng băng kêu răng rắc (`tach-bang.wav`). Bong bóng `?!` + `liu-lo-soc.wav`.
- "I didn't know I had eyelashes": Wob lác mắt cố nhìn lên lông mi của mình. Giữ hình.
- Wob trong hồi ức **không mấp máy miệng theo lời** (giọng là Wob ở hiện tại kể lại); chỉ biểu cảm, líu lo.

### Cảnh 3 · HỒI ỨC · chợ (~15 s)

> "So I went to the market. In winter, the fish here is sold frozen solid. The village itself is the freezer. I asked for a bag. The fish did not need a bag. The fish needed nothing. The fish had made peace with all of this."

- Wob đi lắc lư tới quầy chợ ngoài trời. Cá đông cứng **dựng đứng trong thùng** như bó củi.
- "The village itself is the freezer": camera lùi ra thấy cả làng, có thể thêm cánh cửa tủ đông khổng lồ đóng sập, hoặc hơi lạnh tràn quanh làng.
- "I asked for a bag": Wob chìa túi; bong bóng có hình cái túi + `liu-lo-hoi.wav`. Một **bàn tay đeo găng** đưa ra một con cá cứng đờ.
- "did not need a bag": cá không vào túi, chọc thủng hoặc dựng thẳng đứng; Wob vác cá trên vai như cây ván trượt.
- "made peace with all of this": cận mặt con cá, mắt lim dim thanh thản, vài hạt băng lấp lánh (`ting.wav`). Giữ hình.

### Cảnh 4 · HỒI ỨC · xe nổ máy, cốc trà (~14 s)

> "Outside, a car sat running with nobody in it. People here often leave engines running, because a cold engine may not start again. I made tea to warm up. The tea did not warm up. Anyway."

- Xe đỗ bên đường, rung nhẹ, ống xả phụt khói đều (`may-no.wav`), **ghế lái trống**. Wob ghé nhìn qua cửa kính, vẫy tay chào cái ghế trống.
- "a cold engine may not start again": có thể thoáng hiện một chiếc xe khác phủ tuyết, tắt máy.
- "I made tea": Wob cầm cốc trà bốc hơi.
- "The tea did not warm up": hơi trà đông lại giữa không trung, cốc phủ băng; Wob dốc cốc, trà là một khối cứng, *cạch* (`ting.wav` hoặc `tach-bang.wav`).
- "Anyway.": **cắt cứng** về hiện tại, không chuyển cảnh mềm.

### Cảnh 5 · HIỆN TẠI · bàn (~5 s)

> "Back home, the fish thawed in about an hour. I took a week."

- Con cá trên bàn giờ mềm oặt, có vũng nước nhỏ. Wob quấn chăn, run, ôm cốc nóng; mấp máy miệng theo `khau-hinh/scene-5.json`.
- Kết bằng giữ hình khoảng 1–1,5 s sau chữ cuối (không im lặng dài, không màn đen).

## Âm thanh

- Giọng: 5 file trong `audio/`, đặt theo mốc ở trên.
- Sfx có sổ giấy phép ở `sfx/GIAY-PHEP.md` (tự tổng hợp): `bonk`, `pop`, `tach-bang`, `buoc-tuyet`, `may-no`, `hoi-nuoc`, `ting`, `whoosh`, `drop`, `boing`, `brr`, `nuot`, `liu-lo-vui`, `liu-lo-hoi`, `liu-lo-soc`, `liu-lo-buon`…
- Nhạc (CC BY 4.0, có sổ ở `music/GIAY-PHEP.md`): gợi ý `frost-waltz.mp3` cho hồi ức, nhỏ dưới giọng khoảng −20 dB; có thể ngắt nhạc đúng ở "Anyway."
- Âm lượng cuối khoảng −14 LUFS.
