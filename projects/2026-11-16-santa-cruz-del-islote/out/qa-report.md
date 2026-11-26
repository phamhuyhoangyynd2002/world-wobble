# Kiểm định: The Mosquito Story Behind Santa Cruz del Islote (tập 4)

Ngày kiểm: 26/11/2026 · Người kiểm: agent `kiem-dinh-video` (không tham gia làm video) · Video: `out/video.mp4` (hard link từ `hoat-hinh/out/video.mp4`), 2560×1440, 30 fps, H.264 + AAC, 614,08 s (10:14).

## Kết luận: GIAO ĐƯỢC

0 lỗi Chặn. 4 mục Nên sửa (không bắt buộc trước khi giao, nên làm nếu còn vòng tự sửa), 2 mục Nên xem. Video làm bằng Edge TTS: **không bật quảng cáo** cho tới khi lồng lại bằng Azure.

## Kỹ thuật (kiem_ky_thuat.py): ĐẠT · 0 lỗi · 0 cảnh báo

- `kiem_ky_thuat.py` mã 0: khung 2560×1440 (đọc `hoat-hinh/phan-canh.json` → `xuat`), 30 fps, codec đúng, độ dài khớp timeline, không khung đen > 0,5 s, khung đầu không tối, có `captions.srt` (236 dòng) và `chapters.txt` (8 chương, chương đầu 0:00, ngắn nhất 46 s). Kết quả: `out/ky-thuat.json`, bảng ảnh `out/frames/tong-hop.jpg`.
- Âm lượng (`out/audio-report.json`): video.mp4 −14,2 LUFS, TP −1,2 dBTP; video-no-music.mp4 −14,2 LUFS, TP −1,3 dBTP; cảnh cuối −14,4 LUFS. Đạt (lệch < 1 LU, TP ≤ −1).
- Chuyển động (`kiem_dong_hinh.py` trên `out/video.mp4`, `--bo-cuoi 1.5`, kết quả `out/frames/dong-hinh.json`): ĐẠT · 93,3% khung có chuyển động · đoạn tĩnh dài nhất 12 khung · 50 cắt cứng · 0 đứng hình, 0 khung giật, 0 khung đen.
- Ghi chú: `timeline.json` ghi `width/height` 1920×1080 vì là hệ toạ độ thiết kế; khung xuất thật 2560×1440 theo `phan-canh.json`. Không phải lỗi.

## Bản quyền (ban-quyen.md): ĐẠT · 0 CHẶN · 1 cảnh báo

- `kiem_tra_ban_quyen.py` mã 0, sinh `ban-quyen.md` và `out/ghi-cong.txt`.
- Cảnh báo duy nhất: giọng Edge TTS `en-US-AndrewNeural` (được hạ cảnh báo nhờ `CHO_PHEP_EDGE=1`). Không bật quảng cáo; trước khi kiếm tiền phải xoá cờ và lồng lại bằng Azure cùng tên giọng.
- Hình trong bản cuối chỉ có 2 bản đồ D3 + Natural Earth (`map-islote` 0:00–0:15, `map-san-bernardo` 0:48–1:14). Còn lại vẽ bằng code (cắt giấy, vẽ tay, diorama).
- **Ảnh AI:** manifest có 9 ảnh ComfyUI (SDXL base 1.0) nhưng **không ảnh nào vào bản cuối**. Đã kiểm: `grep` toàn bộ `hoat-hinh/doan-d*/` (trừ `du-lieu.js` là ghi chú phân cảnh) không có đường dẫn `assets/ai` hay `ai-*.png`; `timeline.scenes[].shots` chỉ có hai bản đồ. Vì vậy không có cảnh AI tái hiện sự kiện có thật.
- Âm thanh: 5 bài Kevin MacLeod CC BY 4.0 có trong sổ kèm bằng chứng; 18 sfx tự tổng hợp có trong sổ, gồm 3 tiếng mới `muoi`, `lat-giay`, `song`. Font Fraunces OFL. GSAP Standard License, three.js MIT.
- Ghi công: `out/ghi-cong.txt` (5 dòng nhạc) khớp mục Credits trong `out/seo.md` (dòng 44–48) và dòng Natural Earth (dòng 49). Ghi chú ở dòng 86 của seo.md ("chưa có ban-quyen.md, ghi-cong.txt") nay đã xong; đã đối chiếu và không lệch.
- Chủ quyền: cả hai bản đồ ở vùng Caribe quanh 75–76°W, 9,5–10,4°N, xa vùng Biển Đông (99–125°E); `vung_bien_dong: false`. Bản đồ trên kệ ở đuôi tập (10:03–10:14) chỉ là các khối hình bầu dục cách điệu, không phải địa lý thật (`out/frames/tam/c-kemap.jpg`). Không có vấn đề chủ quyền.
- Vị trí trên bản đồ đúng tương đối: Cartagena ở đông bắc, Tolú ở đông nam đảo, tỉ lệ dx/dy khớp toạ độ (`kd-68.jpg`, `kd-72.jpg`). Nhãn đúng chính tả: "Santa Cruz del Islote", "Cartagena", "Tolú".

## Xem bằng mắt

Khung đã xem: `out/frames/tong-hop.jpg`, 70 khung `out/frames/kd-<t>.jpg`, gồm mỗi nhịp bản đồ (0, 2, 5, 8, 50, 56, 62, 68, 72), thẻ hộ chiếu (9.8–13.5), giữa mỗi chương, con dấu (557–559.6), đuôi tập (594.5–613.5). Bảng ảnh: `out/frames/tam/kd-sheet-01…08.jpg`, `out/frames/kd-sheet-b1…b3.jpg`. Ảnh cắt để đo: `out/frames/tam/c-*.jpg`.

**Đạt:**
- t = 0 (`kd-0.jpg`): Wob ở bàn kỷ vật cầm bình xịt, bản đồ bờ Caribe trên bàn. Không đen, không logo intro, không chào. Đúng khuôn mở hoạt hình.
- Thẻ hộ chiếu hiện từ ~10,0 s tới ~13,3 s (khoảng 3,3 s), khớp lời "Hi, I'm Wob". Thẻ ở góc trái trên, mép trái 102 px và mép trên 60 px tính theo hệ 1920, nên vẫn trong vùng an toàn dù sát mép. Chữ trên thẻ đọc rõ (`kd-sheet-b3.jpg`).
- Chữ trên đồ vật đọc được và trong vùng an toàn: "~1 ha · 2 soccer fields" (0:27), "~2 h by boat" (1:00), "45 min–1 h" (1:08), "120 houses · Census 2018" (1:24), "BRING LESS" (2:17), "~150 years ago" (2:48–3:35), bốn bảng dân số (4:22–4:36; "580 · Census 2005" cao ~34 px chữ hoa tính theo hệ 1920, mép phải còn 110 px, xem `tam/c-276.jpg`), "2021" (6:26).
- Người dân được vẽ dạng hình người giấy chung, nhỏ, không có mặt chi tiết và không bị chế giễu. Các gag đều dồn vào Wob và ba lô.
- Cảnh hồi ức "~150 years ago" (2:41–3:35) là tranh cắt giấy tông sepia, rõ là hình vẽ. Vệt tối hình elip ở 2:52 là bóng của đám mây bão đang trôi (có chủ ý, `tam/c-d10.jpg`), không phải lỗi hình.
- Con dấu đúng nhãn `NOPE` (verdict cảnh 15, mốc 557,406 s), đóng lên thẻ hộ chiếu, chữ to và đọc rõ.
- 20 giây cuối (594,1–614,1): hai khung trống và vòng tròn trống nằm ở x ≈ 1170–1760 hệ 1920. Vùng x > 1150, y > 560 không có chữ. Vùng này đứng yên từ ~598 s: sai khác điểm ảnh 598→603 là 1,8/255, 603→608 là 0, 608→613,5 là 1,3. Wob và các nhãn kệ nằm bên trái.
- Logo "World Wobble" ở góc phải trên suốt video, mép phải còn ~95 px.

| Mốc | Khung | Vấn đề | Mức | Sửa ở bước nào |
|---|---|---|---|---|
| 7:44–8:15 (d26 diorama) | `kd-465.jpg`, `kd-466.jpg`, `kd-469.jpg`, `kd-475.jpg`, `kd-479.jpg`, `kd-480.jpg`, `kd-484.jpg`, `kd-492.jpg`, `tam/c-misc.jpg` | Camera cận làm đầu Wob bị cắt ở mép trên, và **logo góc phải trên đè lên mắt, mặt Wob** trong gần cả chương biển dâng. Đây là chương nghiêm, mặt Wob trầm là nhịp cảm xúc chính | Nên sửa | `/dung-hoat-hinh`: dựng lại riêng đoạn d26 (lùi camera hoặc dời Wob sang trái, khỏi vùng x > 1500, y < 150 hệ 1920), rồi ghép lại, trộn âm lại (`mix_audio.py`) và chạy lại `kiem_ky_thuat.py` |
| 7:43–8:06 (d26) | `kd-466.jpg` (`tam/c-466.jpg`), `kd-475.jpg`, `kd-484.jpg` | Ba nhãn số viết trên sổ ("~2 m · ~6.5 ft", "~45% · 2014", "up to ~30 cm · ~1 ft / 2050") **nhỏ hơn mức phân cảnh**. Chữ số "6.5" cao ~37 px ở khung 2560 (~28 px hệ 1920), tức cỡ chữ ~40 px, dưới mức ≥ 45 px trong `phan-canh.json` và sát mức chữ phụ 40 px. Chữ nghiêng, màu xám đậm trên giấy be, lại nằm trong phối cảnh nghiêng nên khó đọc trên TV | Nên sửa | Gộp với mục trên khi dựng lại d26: tăng cỡ chữ trên sổ hoặc cận trang lúc chữ hiện |
| 9:17,4–9:19,5 (d30) | `kd-557.6.jpg`, `kd-558.2.jpg`, `kd-559.jpg`, `kd-sheet-b3.jpg` (559.2, 559.4), `kd-559.6.jpg` | Con dấu NOPE cỡ lớn chỉ đọc rõ **~1,7 s** (557,5→~559,2) rồi thu nhỏ vào ô tem, và thẻ biến mất ở ~559,5. Lúc to, con dấu che mất "DEL ISLOTE", "COLOMBIA" và một phần "Would Wob move here?". Đây là khoảnh khắc nhận diện của loạt nhưng lướt quá nhanh | Nên sửa | `/dung-hoat-hinh` đoạn d30: giữ con dấu lớn ≥ 3 s (tới khoảng "blames the island" 560,7 s) rồi mới thu vào ô tem |
| 0:10–0:14 (cảnh 1) | `kd-10.5.jpg` | Câu chào "Hi, I'm Wob. I collect odd places, and the reasons people stay in them." **khác câu cố định** trong skill `mo-ket` ("Hi, I'm Wob. I visit odd places and ask why anyone stays.", tập 3 đã dùng). Skill ghi đây là câu cố định mọi tập. `nhat-ky.md` (dòng 11) ghi là "lời chào mới" nhưng không nêu lý do đổi khuôn nhận diện | Nên sửa (thương hiệu) | Người làm kênh chọn một trong hai: (a) chốt câu mới làm câu cố định từ tập 4 (sửa `mo-ket/SKILL.md`, ghi nhật ký); (b) sửa lời cảnh 1 → lồng tiếng cảnh 1 → timeline → ghép |
| 0:27,5 (d02) | `kd-27.5.jpg` | Nhãn "~1 ha · 2 soccer fields": 1 ha chỉ bằng ~1,4 sân FIFA (7.140 m²), nên người xem kỹ tính sẽ thấy hai vế lệch nhau. Lời đọc chỉ nói "two soccer fields" (C01 hai nguồn, đã qua cổng) | Nên xem | Không bắt buộc. Nếu dựng lại d02 thì để một vế ("about 2 soccer fields") cho khớp lời |
| 1:45 (d07) | `kd-105.jpg`, `tam/c-misc.jpg` | Bên phải mặt đồng hồ có một hình đen giống chìa khoá hoặc que, nhìn không ra là vật gì | Nên xem | Xem lại d07 ở `hoat-hinh/duyet/to-khung/`; bỏ đi nếu là đồ thừa |

## Nhãn AI

- **YouTube altered/synthetic: không tick.** Bản cuối là hoạt hình hoàn toàn: Wob SVG, cắt giấy, vẽ tay, diorama vẽ bằng code, bản đồ D3. Không ảnh AI nào vào bản cuối, không cảnh trông như thật về người thật hay sự kiện có thật, không giọng nhái người thật.
- **Nghị định 142/2026:** không cần nhãn trên hình. Cảnh hồi ức ngư dân "~150 years ago" kể theo lời truyền của người dân ("As locals tell it"), vẽ cắt giấy cách điệu, không mô phỏng như thật. Cảnh võng ngập nước (7:06–7:30) là trải nghiệm hư cấu của Wob, không tái hiện sự kiện có thật nào. Dòng "Narration voice and illustrations are AI-assisted…" đã có trong mô tả (`out/seo.md` dòng 39).

## Việc khi đăng

- Not made for kids.
- Nhãn altered/synthetic: **không**, vì là hoạt hình hoàn toàn và không ảnh AI dạng ảnh thật (lý do ở mục Nhãn AI).
- **Không bật kiếm tiền, quảng cáo** cho video này: giọng là Edge TTS (`CHO_PHEP_EDGE=1`).
- Tải `out/captions.srt` (tiếng Anh). Dán `out/chapters.txt` vào mô tả (8 chương, 0:00 đầu).
- Mô tả: dán Credits đúng `out/ghi-cong.txt` (5 bài Kevin MacLeod CC BY 4.0) + dòng Natural Earth + dòng AI. Bản trong `out/seo.md` đã khớp.
- End screen: bắt đầu **9:54** (20 s cuối), đặt 2 ô video và nút đăng ký trùng ba khung trống. Hai khung ở x ≈ 1170–1760, y ≈ 160–475 và 500–815; vòng tròn ở x ≈ 1355–1555, y ≈ 820–1020 (hệ 1920; YouTube tính theo tỉ lệ khung). Không đặt end screen thì ba khung trống trông như lỗi.
- Trước khi đăng, chuyển video cuối sang ổ D theo quy ước: `luu_o_d.py <dự án> --tap 04 --giao`.

## Vòng tự sửa 1 (26/11/2026)

Sửa theo mục "Nên sửa" ở trên và phản biện: câu chào đổi về câu cố định của mo-ket (cảnh 1); phán quyết cảnh 15 viết lại (bỏ "The island's fine", "Their reasons fit in a fishing boat", khuôn "one last shake / Still sealed. Still smug"); con dấu NOPE giữ ~3 s (d30); d26 mặt Wob ra khỏi vùng logo, nhãn ≥51 px; thẻ hộ chiếu tên nơi 74 px. Render lại d01 d26 d30 d31 d32 d33, duyệt 6a ĐẠT (20/20 mỗi đoạn). Ghép lại 614,89 s: kiem_ky_thuat ĐẠT 0 lỗi 0 cảnh báo; kiem_dong_hinh ĐẠT 93,4%; −14,3 LUFS, TP −1,6; ban-quyen 0 CHẶN (1 cảnh báo Edge); doi_chieu --cong ĐẠT; bao_cao ĐẠT. Kết luận: **GIAO ĐƯỢC**.

Không sửa (đổi lời cảnh 2–11, lệch mốc gần cả video): đoạn chậm 1:41–2:42 và 5:52–6:31, rào đón ở khẳng định mức A/B, câu "tourists are catching up with the fish", nhãn "~1 ha · 2 soccer fields" (đúng khẳng định C01). Ghi ở docs/bai-hoc-san-xuat-tap-4-2026-11-26.md.
