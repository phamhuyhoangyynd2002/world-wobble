# Bản thử A – "Cắt giấy có khớp" (16/11/2026)

## Cách làm

- Một composition HyperFrames (`index.html`), một SVG 1920×1080 do JS dựng lúc tải trang, rồi một `gsap.timeline` duy nhất.
- Ba thế giới trong cùng SVG: **hiện tại** (bàn kỷ vật dưới đèn), **hồi ức** (làng tuyết, 3 lớp xa/giữa/gần trôi lệch nhau), **cận cảnh** con cá. Chuyển cảnh: camera lao vào trang sổ có hình vẽ làng (giấy hoà dần thành cảnh màu), cắt cứng sang cận cảnh cá, cắt cứng về bàn ở "Anyway.".
- Wob là **con rối có khớp** dựng lại từ toạ độ gốc của `templates/_shared/wob/nguon/tao_wob.py` (thân, lục địa, ba lô, giày, nét mực giữ nguyên). Thêm: vai/khuỷu hai tay, hông hai chân, mí mắt (cắt theo lòng mắt), lông mi (thường + đóng băng), 9 miệng A–H/X + 6 miệng biểu cảm, khăn quàng, chăn kẻ ca-rô. Tay cầm đồ bằng nhóm lồng trong bàn tay; khi buông, vị trí đồ tính bằng động học thuận (`Wob.hand()`), nên cá rơi đúng chỗ tay vừa buông.
- Hiện tại: miệng mấp máy theo `khau-hinh/scene-1,4,5.json` (cộng mốc đầu cảnh; "Anyway." do Wob ở nhà nói). Hồi ức: chỉ đổi miệng biểu cảm, bong bóng ký hiệu (`?!`, túi, `...`) + líu lo.
- Chất giấy: mép răng cưa sinh từ toạ độ có seed, bóng đổ lệch giữa các lớp giấy, viền lệch màu kiểu in lụa ở vài mảng, lưới chấm risograph (SVG pattern), hạt giấy canvas có seed nhảy 8 hình/giây, loang mực tĩnh, đổ bóng mềm cho con rối.
- Âm thanh: composition chỉ có 5 file giọng; `tao_timeline.mjs` đọc `js/canh.js` sinh `timeline.json` (39 sfx đặt tay + 25 tiếng bước tuyết tính theo đúng công thức chia bước của `Wob.walk()`, nhạc `frost-waltz` 12,0–53,65 s, ngắt đúng "Anyway."), rồi `mix_audio.py` trộn và master hai lượt.

## Kỹ thuật chính

- **Khoá hình tất định** (`Keys` trong `js/wob-rig.js`): mỗi (phần tử, thuộc tính) là chuỗi khoá; phát ra `fromTo` nối tiếp không chồng nhau (`immediateRender:false`), khoá "step" thành `tl.set`. Tua tới khung nào ra đúng khung đó; không `onUpdate`, không `Math.random`, không hẹn giờ, không `repeat:-1`.
- **Diễn pose-to-pose**: `Wob.pose()` giữ tư thế rồi bật sang tư thế mới (back.out / power3.in cho cú gõ); `Wob.walk()` sinh chu kỳ bước: nhấc chân, nhún, co giãn khi chạm đất, nghiêng lạch bạch, ba lô và khăn nảy trễ theo đà, tay đánh ngược chân; `breathe`, `shiver`, `autoBlink` (seed) lớp lên trên.
- **Camera**: khoá (cx, cy, zoom) đổi thành x/y/scale riêng cho từng lớp theo hệ số parallax (0,35 / 1 / 1,4); rung khung chỉ ở các cú gag (cộp cá, tủ đông sập, túi thủng).
- `npx hyperframes check`: 0 lỗi (2 cảnh báo cấu trúc "nested_structure_needs_subcomposition", 1 cảnh báo tràn khung của nhóm camera – cố ý).

## Đẹp / chưa đẹp

Đẹp:
- Trông như phim hoạt hình cắt giấy: Wob đi lại, cầm cá, gõ cá, nhón chân nhìn vào xe, vẫy cái ghế trống, dốc ngược cốc trà đông. Gag nằm trong hình (tủ đông khổng lồ sập xuống trùm cả làng, cá chọc thủng túi, hơi trà đông giữa không trung, cá rũ nhỏ giọt).
- Liền mạch không gian: một con phố dài, camera lia theo Wob từ nhà → chợ → xe; lông mi đóng băng và con cá trên vai theo Wob suốt hồi ức, về nhà Wob vẫn còn lông mi.
- Chữ chỉ nằm trên đồ vật (biển làng, nhiệt kế), Fraunces ≥ 40px, không thêm số nào ngoài lời.

Chưa đẹp:
- Wob luôn nhìn thẳng (con rối mặt trước), đi ngang chỉ bằng nghiêng người và liếc mắt; chưa có góc nghiêng 3/4.
- Khói vẫn hơi giống chuỗi viên tròn; người bán chỉ là bàn tay trượt ra, chưa có nhịp "đưa – rụt" tự nhiên; vài chỗ Wob đi qua trước nhiệt kế che chữ trong tích tắc.
- Chất giấy còn sạch, gần vector; chưa có rung "boil" từng khung kiểu stop-motion cho nhân vật, chưa có lệch màu in lụa trên toàn khung (lọc toàn khung tốn render).

## Thời gian

- Dựng code + 2 vòng chụp thử: khoảng 3–4 giờ làm việc của agent (phần lớn là thư viện đạo cụ và con rối, làm một lần).
- Render: bản nháp 2 phút 18 giây (draft, 3 worker, GPU); bản cuối 6 phút 40 giây (delivery, 3 worker, máy đang chạy song song các render khác). File delivery 432 MB.
- Âm thanh (mix_audio.py): `out/video.mp4` −14,0 LUFS, true peak −1,0 dBTP; `out/video-no-music.mp4` −14,0 LUFS, −1,2 dBTP. `out/ban-thu.mp4` = bản có nhạc.

## Tái dùng cho tập 12 phút

- `js/wob-rig.js`: con rối Wob + `Keys` + `walk/pose/breathe/shiver/autoBlink/lipsync/hand` – dùng nguyên.
- `js/dao-cu.js`: helper giấy (`rough`, `paper`, `txt`, `defs` gồm pattern/filter) + đạo cụ (cá cứng/mềm, đèn, hộp, sổ, nhiệt kế, nhà gỗ, thông, hàng rào, quầy chợ, thùng cá, bàn tay găng, túi giấy, xe, xe vùi tuyết, cốc trà + hơi/đông, tủ đông, bong bóng, sao băng).
- Hàm `camera()`, `shake()`, `smokeAnim()`, `steamAnim()`, `grainTexture()`, `blotTexture()` trong `js/dung-phim.js`; `tao_timeline.mjs` (sinh sfx bước chân từ cùng dữ liệu).
- Phần riêng từng tập: bố cục cảnh và biên đạo (`choreograph()`), khoảng 250 dòng cho 60 giây.

## Ước công sức một tập 12 phút

- Biên đạo khoảng 4–5 dòng code mỗi giây phim → ~3.000–3.500 dòng choreography cho 12 phút, cộng 10–20 đạo cụ mới mỗi tập. Với agent: khoảng 2–3 ngày làm + 3–4 vòng chụp thử; render ước 25–30 phút mỗi lần (tuyến tính theo bản nháp).
- Cách giảm: gom các "diễn xuất" lặp lại thành hàm có tên (đến gần, chỉ tay, giơ đồ, sốc, run, nhún vai…), để biên kịch ghi hành động theo tên hàm trong `script.json`.

## Tự chấm: hoạt hình hay trình chiếu?

**7/10 – nghiêng hẳn về hoạt hình.** Wob là diễn viên thật: đi, cầm, gõ, phản ứng, mọi cảnh đều có chuyển động và gag bằng hình; không chữ to giữa màn, không nền ảnh tĩnh. Chưa lên 8–9 vì con rối chỉ có góc mặt trước, nhịp diễn ở một vài đoạn còn "đứng chờ lời" (cảnh 4 lúc "People here often leave engines running"), và chất giấy chưa đủ thô để ra hẳn cảm giác stop-motion.
