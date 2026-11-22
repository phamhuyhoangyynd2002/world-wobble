# Duyệt hình: Oymyakon (tập 1, bản hoạt hình) · vòng 1

> Người duyệt: agent `duyet-phan-canh`, chế độ `hinh`, ngày 19/11/2026. Chấm độc lập trên tờ khung `to-khung/*.jpg` (tạo sau lần render cuối) đặt cạnh `phan-canh.json`, `script.json`, `audio/subtitles.json`; khung soi thêm ở `soi/`. Chưa đọc nhận xét tự chấm của thợ dựng. Không nghe được âm thanh: lời đọc theo mốc `subtitles.json`.
>
> Quy ước: D3 với đoạn hiện tại (bàn) không bắt buộc gag, chấm 2 khi không có gag hỏng; đoạn lịch sử chấm 2 khi sạch gag. D4 với d19 chấm 2 vì Wob vắng có chủ ý. Lỗi khăn cam ở 4 đoạn 3D chấm D8 = 1 ở từng đoạn (mũ đúng, chỉ khăn lệch, sửa một hằng màu trong rig) nhưng tính vào T7 = 0 để bắt buộc sửa trước khi ghép.

## Kết luận tổng thể: KHÔNG ĐẠT  (T: 13/16)

Lý do: T7 = 0 (liên tục toàn tập) và còn 2 đoạn LÀM LẠI (d11, d29). Đếm đoạn: ĐẠT 35 · SỬA NHỎ 3 · LÀM LẠI 2.

Kiểm máy (đã chạy, không phải tự báo): 40/40 clip đúng độ dài (lệch ≤ 1 khung); `kiem_dong_hinh.py` 40/40 ĐẠT (đoạn tĩnh dài nhất 8 khung ở d38); mọi chỗ nối `giay` ra/vào đúng giấy phẳng (237,225,199); mọi chỗ nối `cat`/`chen` khung đầu và cuối có hình đầy đủ (không khung đen, trống). Kết quả: `soi/dong-hinh/*.json`.

| T | Điểm | Nhận xét, mốc |
|---|---|---|
| T1 | 2 | Khung 0 đã có Wob rút con cá phủ sương khỏi hộp kỷ vật (d01 ô 1). 'coldest permanently inhabited place' ở 4,9 s, câu hỏi 'Why would anyone choose that?' bắt đầu 9,76 s (vừa kịp mốc 10 s). Lý do ở lại qua 30 s: 'It isn't the cold. It's something that refused to be cold' + 'whether I was unpacking' (d03, 28–35 s). Trừ điểm nhỏ: hơi nước che biển 'OYMYAKON' ở 12,7 s và chữ 'PLAN: MOVE IN' không đọc được (d01). |
| T2 | 2 | Mốc mồi: 1,8 cá gõ · 18,7 bản đồ ngược · 22,2 bong bóng vương miện · 28–35 lời hứa · 42 nét đứt · 52 ba lô đè · 69,5 đèn pin rọi mặt · 79 làng bé tí 3D · 85 lông mi · 89 máy ảnh bỏ cuộc · 108 sông gõ lại · 115 dấu X · 141 đi qua suối 3 lần · 147 trạm xăng · 182 chai óc ách · 195 vương miện băng · 222 thủng trang · 228 rơi vương miện · 242 đo bằng ngón tay · 275 nhiệt kế cúi chào · 289 trượt ngã · 310 nắp Siberian High · 336 gõ khí lạnh · 343 trượt về đáy bát · 345,8 đặt cá xuống (đổi giọng nghiêm) · 379,6 phố 3D buổi sáng · 395 động cơ dỗi · 400 mùa đông giữ chìa · 424–435 cá không cần túi / làng trong tủ đông · 452 đường tới chòi dài ra · 476 bong bóng vỡ · 483 trà mọc da · 500,7 cắt cứng sang tháng Bảy · 532 toàn đồ lông · 545 chớp mùa đông · 553 ngựa phồng lông · 570 ngựa thờ ơ · 590 marathon · 609 bàn tổng kết · 645,5 NOPE · 656 cá đi nghỉ trong tủ đông. Khoảng trống dài nhất không mồi mới: 609,2→645,5 s (~36 s, tổng kết ở bàn) và 153,7→182,4 s (~29 s, đoạn sepia d11). Không đoạn nào > 90 s chỉ giải thích. |
| T3 | 2 | Chuỗi cùng phong cách dài nhất: ve-tay 285,1–345,6 s (60,5 s) < 90 s. 83 nhịp có thẻ, 28 thẻ khác nhau, thẻ nhiều nhất chen-ve-tay 9/83 = 10,8% (< 20%); giu-tinh-bo 5 lần, đúng 1 lần mỗi chương. Ánh sáng đổi theo nhịp: đêm xanh (đến nơi) → ngày ngắn → sepia (quá khứ) → trầm (Gulag) → sáng tối 3D → chiều tím → tối vàng trong nhà → hè xanh. Điểm yếu: nhiều đoạn cắt giấy cùng góc ngang, cỡ trung toàn (d11, d14, d15, d33). |
| T4 | 2 | Khung đầu chương: 0,4 bàn + cá · 38,3 bàn, vẽ đường đi · 93,6 mép làng đêm, câu hỏi · 185 phố làng đi tìm chỗ lạnh nhất · 345,8 bàn, đặt cá xuống · 379,8 sáng tối ở phố · 499,1 cắt sang tháng Bảy · 609,3 bàn tổng kết. Đọc riêng vẫn ra một chuyến đi (tới → ở → hiểu → về). Hai lớp rõ: bàn diorama ấm vs hồi ức. Kỷ vật con cá mở (0 s) và đóng (tủ đông 656 s). |
| T5 | 1 | Cung hài lên kế hoạch tốt (~45 gag, mỗi chương ≥ 3, chương Gulag sạch gag, có khoảng lặng trước/sau: đặt cá xuống 346 s, nhắm mắt 378 s). Nhưng khi dựng, 7 gag không đọc được trên hình: d21 chào ghế trống, d23 vỗ xe như ngựa, d24 xẻng bật lại, d29 ba lô không đóng được, d31 tay kéo dài lần hai, d35 ba lô to ngang ngựa, d36 số áo trượt. Đoạn khô dài nhất ngoài chương nghiêm: d11 sepia ~29 s (153,7–182,4 s). Gag lặp: bản đồ ngược (d01, d09, d29: 3 lần, chấp nhận vì là gọi lại), vương miện băng (d02, d12, d13, d14: mạch gag chạy, chấp nhận). |
| T6 | 2 | Tỉ lệ: cat-giay 302,6 s (45,7%), ve-tay 223,6 s (33,8%), diorama 135,5 s (20,5%, vượt trần 20% 0,5 điểm: chấp nhận). Không cửa sổ 15 s nào có quá 2 lần đổi phong cách ngoài đoạn chèn gag (dày nhất 392–410 s: 2 lần). Mỗi lần đổi có lý do: bàn = hiện tại, vẽ tay = tưởng tượng / sơ đồ / gag, 3D = cảnh toàn có chiều sâu. |
| T7 | 0 | Dòng thời gian trang phục: bàn (d01–d18 không mũ, găng + cá trong tay; d18 đặt cá, găng xuống bàn; d20–d40 cá, găng trên bàn; d40 cá vào tủ đông): KHỚP. Hồi ức mùa đông (d02–d29, d39: mũ len đỏ, khăn đỏ, ba lô; lông mi đóng băng từ 85 s): KHÔNG KHỚP ở: (1) khăn CAM ở cả 4 đoạn 3D d07, d21, d23, d30 trong khi cắt giấy, vẽ tay là khăn ĐỎ; (2) d29 con cá biến mất khỏi bậu cửa sổ, ba lô đóng kín, trong khi d30 vác ba lô có đuôi cá thò ra; (3) mũ hè: d30 và d32 mũ trùm lông nâu, d31 mũ tròn màu kem; (4) đài tưởng niệm d12 (khối trắng, thuỷ ngân xanh) ≠ d13 (cột thuỷ ngân đỏ); (5) cốc trà d29 trắng ≠ d39 cam; (6) xe hộp d04/d06 kraft ≠ d10 cam; (7) biển làng có tên ở d07, d15 nhưng trống ở d08, d16. Mũ len đỏ ở mọi phong cách kể cả 3D: ĐÚNG. Mùa: đông → hè ở 500,7 s rõ bằng cắt cứng cùng khung: đúng. |
| T8 | 2 | Con dấu 'NOPE' đóng đúng một lần (d40, 645,2 s), đúng nhãn, cỡ lớn ở cú lao vào (646,3 s); sfx dau-wob chỉ có trong d40 lúc 0,70 s, mặt dấu chạm giấy ~0,72–0,75 s (khớp). Câu hỏi cuối 'How long would you have lasted?' có Wob quay nhìn thẳng người xem. Chữ cuối kết thúc 659,84 s, giữ hình 1,9 s tới 661,72 s, không mờ đen. Góc end screen (x > 1150, y > 560) trống chữ từ 641,72 s (d39, d40). |

**Câu 0 gây ra bởi:** T7 ← dung-diorama (khăn 3D ở d07, d21, d23, d30), dung-cat-giay (d29 cá biến mất; d31 mũ hè), dung-ve-tay (d13 đài tưởng niệm, d39 cốc, d10 xe), đạo diễn (biển trống d08, d16 do `chu_tren_do_vat` rỗng; chưa khoá mẫu mũ hè, cốc trà, màu khăn 3D trong `trang_phuc`). Sửa các mục này là T7 lên 2; không phải viết lại bảng phân cảnh.

## Từng đoạn

| Đoạn | Phong cách | D1..D10 | Tổng | Kết luận | Việc cần sửa (cụ thể: nhịp/ô, sửa thế nào) |
|---|---|---|---|---|---|
| d01 | diorama (bàn) | 2 2 1 2 2 2 0 2 2 2 | 17/20 | **SỬA NHỎ** | D7 · ô 8 (12,72 s): ba cột hơi nước bốc từ trang pop-up che chữ 'OYMYAKON' trên biển (còn đọc 'OY…AKON'). Sửa: tắt hơi nước trước khi lật trang, hoặc đặt cột hơi sau biển / hạ dưới mép biển.<br>D7 · ô 8–12 (12,4–22,2 s): chữ 'PLAN: MOVE IN' trên trang sổ chỉ cao ~18–20 px ở khung 1080, nghiêng phối cảnh, không đọc được; ở 13,5 s chữ còn chưa hiện. Sửa: camera đẩy vào trang sổ từ 12,4 s cho chữ ≥ 40 px, hiện chữ đúng lúc 'move in' (~14,2 s), gạch chân hai lần, giữ 0,8 s rồi mới lùi ra cho nhịp ba lô.<br>D3 · ô 3 (1,45–2,4 s): cá vung xuống sàn rồi bật lên, không thấy cá chạm mép bàn và không cong. Sửa: đuôi cá gõ đúng mép bàn, rung va chạm 7 khung, cá thẳng đơ, giữ 0,6 s trước 'I bought it'. |
| d02 | ve-tay | 2 2 2 2 1 2 2 2 2 2 | 19/20 | **ĐẠT** | (tuỳ chọn) D5 · 4 ô cùng cỡ toàn: thêm một cận mặt Wob lúc vương miện mọc (26,2 s). |
| d03 | diorama (bàn) | 1 1 2 2 2 2 2 2 2 2 | 18/20 | **ĐẠT** | D1/D2 · ô 3 (32,6–34 s): chai nước 'lóe sáng' gần như không thấy, chai nhỏ bị tay Wob che. Sửa: Wob nhấc chai lên khỏi hộp 0,8 s, bloom nhẹ quanh chai, camera đẩy 0,6 %/khung, rồi đặt lại. |
| d04 | cat-giay | 2 2 1 1 2 2 1 2 2 2 | 17/20 | **ĐẠT** | D7 · ô 3 (44,3 s): nhãn 'Oymyakon' bị cắt mép phải ('Oymyak') khi camera lướt. Sửa: giữ nhãn trong vùng an toàn (x < 1824) suốt cú lướt.<br>D3 · ô 6 (49,7 s): gag 'nét đứt có chính kiến' yếu: nét chỉ uốn nhẹ, xe vẫn nằm trên bản đồ. Sửa: nét đứt ngoằn ngoèo vòng xoắn rồi kéo hẳn ra khỏi mép trang 1 s trước khi xe rơi sang trang mới.<br>D4 · ô 4 (45,8 s): Wob ngáp không thấy (Wob ~40 px trong xe). Sửa: cận xe 1 s, Wob ló đầu to hơn khi ngáp. |
| d05 | ve-tay | 2 2 2 2 1 2 2 2 2 2 | 19/20 | **ĐẠT** | Không có. |
| d06 | cat-giay | 2 2 2 2 2 1 1 2 2 2 | 18/20 | **ĐẠT** | D6 · ô 4 (từ ~62,6 s, 5,6 s đoạn): đồng hồ '~4.5 h', nhiệt kế và nhãn 'JAN avg' đã hiện trước lời 'sun is up' (65,3 s) và 'January' (71,8 s). Sửa: đồng hồ trượt vào lúc 8,0 s đoạn; nhiệt kế + 'JAN avg' chỉ hiện ở 14,6 s.<br>D7 · ô 8–9 (77,1–78,7 s): nhãn 'JAN avg' bị cắt mép trên khi camera đẩy vào nhiệt kế. Sửa: giảm độ đẩy hoặc hạ bảng nhiệt kế 80 px. |
| d07 | diorama (ngoài trời 3D) | 2 2 1 1 1 2 2 1 2 2 | 16/20 | **ĐẠT** | D8 (bắt buộc, xem T7) · cả đoạn: khăn của Wob 3D màu CAM sọc trắng, trong khi cắt giấy và vẽ tay là khăn ĐỎ (so sánh: duyet/soi/mau_khan_d07_d06.jpg). Sửa trong rig Wob 3D (dio-3d.js) cho khăn cùng màu đỏ như mũ, render lại.<br>D4 · ô 2–3 (81,8–83,9 s): Wob vắng mặt hẳn kể cả lúc lời 'I stepped out to take a photo of the sign' (83,1 s); Wob chỉ quay lại ở 0,8 s cuối. Sửa: để Wob bé tí thấy được trong cảnh toàn (wob-be-ti), hoặc hạ camera về Wob sớm hơn 0,8 s.<br>D5 · ô 2–3 (81,8–83,9 s): vật tiền cảnh đen mờ nhọn giữa đáy khung (cây chết sát ống kính) trông như vết bẩn. Sửa: bỏ, hoặc thay bằng cọc hàng rào nhận ra được ở mép khung. |
| d08 | ve-tay | 2 2 2 2 2 2 2 1 2 2 | 19/20 | **ĐẠT** | D8 · ô 4–5 (94–101 s): biển làng là tấm bảng xanh TRỐNG, trong khi d07 liền trước biển ghi 'OYMYAKON'. Sửa (sau khi đạo diễn thêm chữ vào chu_tren_do_vat): vẽ 'OYMYAKON' trên biển. |
| d09 | cat-giay | 2 2 2 1 2 2 1 2 2 2 | 18/20 | **ĐẠT** | D4 · ô 1–6 (117,3–134,5 s, ~17 s): sổ che kín Wob, chỉ thấy mũ và mắt ló trên mép sổ, mũ bị cắt mép trên khung; ô 4–5 'Wob nghiêng đầu nhìn hai bên' không thấy. Sửa: hạ sổ 120 px, Wob ló cả đầu và một tay; nghiêng đầu trái ở 'Even?' (128,2 s), phải ở 'Sakha?' (129,9 s).<br>D7 · ô 2–6: gáy sổ chạy dọc qua chữ 'that' của '= water that does not freeze?'. Sửa: dời dòng chữ sang trang phải hoặc ngắt dòng trước gáy. |
| d10 | ve-tay | 2 1 2 1 2 2 2 1 2 2 | 17/20 | **ĐẠT** | D8 · cả đoạn: xe hộp của Wob màu CAM; d04/d06 xe hộp màu nâu giấy kraft. Sửa: đổi về màu kraft.<br>D4 · ô 1 (147–152 s): Wob chỉ ngồi trong xe ~60 px suốt 5 s. Sửa: cận kính lái, Wob dí mặt lau kính, bão tuyết quất mạnh hơn. |
| d11 | cat-giay | 2 2 2 0 1 2 2 2 2 2 | 17/20 | **LÀM LẠI** | D4 = 0 · ô 1–6 (154,0–177,7 s, ~24 s): Wob vắng mặt 6/10 ô liền; bảng phân cảnh hẹn Wob ngồi xổm bên suối từ 171,9 s nhưng tới ~177,7 s mới hiện. Làm lại phần sepia (0–24 s đoạn); phần 2 (bình nước óc ách, ôm chai, 24–31 s) giữ nguyên.<br>D5 · ô 3–6 (164,8–177,7 s): cùng một khung toàn phẳng gần như đứng, chỉ thêm lều, nhà bé ~30 px: trông như slide. Sửa: ô 2 lia theo đàn tuần lộc qua 2/3 khung; ô 3 đẩy vào chấm nước tới trung cảnh; ô 4–5 lều bật dựng to gần camera (≥ 150 px), nhà gỗ mọc quanh suối.<br>Cách đưa Wob vào (theo đạo diễn chốt): Wob hiện đại (màu đầy đủ) ngồi ở mép khung xem 'phim quá khứ' trên trang sổ, hoặc Wob cầm đèn pin rọi vào cảnh sepia; Wob phải có mặt chậm nhất ở 171,9 s. |
| d12 | cat-giay | 2 2 2 2 2 2 1 2 2 2 | 19/20 | **ĐẠT** | D7 · ô 2–3 (188,4–190,2 s): nhãn 'POLE OF COLD' bị cắt mép phải ('POLE OF CO') đúng lúc lời gọi tên. Sửa: cú lướt camera xong trước 189,9 s, nhãn trọn trong khung. |
| d13 | ve-tay | 2 2 2 2 2 2 1 1 2 2 | 18/20 | **ĐẠT** | D8 · ô 1, 9–12: đài tưởng niệm vẽ tay là cột nhiệt kế thuỷ ngân ĐỎ trên bệ xám, khác hẳn d12 cắt giấy (khối trắng, thuỷ ngân XANH, bảng 'POLE OF COLD'). Sửa: đổi dáng khối trắng, thuỷ ngân xanh như d12.<br>D7 · ô 4 (203,4 s): Wob đứng đè lên chữ '1933' đang viết; ô 7 (214,9 s) '6 Feb 1933' cắt mép trên; ô 8 Wob che chữ số đầu của '−67.8°C'. Sửa: Wob viết từ phía dưới dòng chữ, khung chừa 60 px trên. |
| d14 | cat-giay | 2 2 2 1 2 2 1 2 2 2 | 18/20 | **ĐẠT** | D4 · ô 8–11 (253,4–265,3 s, 12 s): Wob đứng yên mặt ngạc nhiên dưới trang. Sửa: Wob đi theo nhiệt kế trượt, chỉ tay vào 'Tomtor' (255,7 s), nhìn đường băng (262,2 s). Ô 1 (228,4 s) chưa có Wob, ô 4 (238,7 s) Wob chỉ còn chóp mũ ở mép dưới.<br>D7 · ô 3 (236,0 s): vương miện chia đôi bị cắt mép trên khung. Sửa: hạ vương miện 80 px. |
| d15 | cat-giay | 2 2 2 2 2 2 1 2 2 2 | 19/20 | **ĐẠT** | D7 · ô 1 (265,7 s): 'OYMYAKON' cắt mép trái, 'TOMTO' cắt mép phải đúng lúc lời nói 'Tomtor'; ô 7 (285,0 s) 'AKON'/'TOM' cắt mép. Sửa: lùi camera hoặc dời hai biển vào trong 96 px; biển TOMTOR 'rướn cao ưỡn ngực' (nhịp 1) chưa thấy, làm rõ. |
| d16 | ve-tay | 2 2 2 2 2 1 1 1 2 2 | 17/20 | **ĐẠT** | D6 · ô 4–5 (293,2–298,2 s): Wob nằm đúng chỗ cột nhiệt kế, cột như cắm xuyên đầu Wob, bong bóng '?' mọc từ đầu nhiệt kế nên đọc như nhiệt kế đang hỏi. Sửa: Wob nằm lệch khỏi cột ~200 px, bong bóng nối từ đầu Wob.<br>D8 · ô 1–5: hai biển làng TRỐNG trong khi d15 ghi 'OYMYAKON'/'TOMTOR'. Sửa sau khi đạo diễn thêm chữ.<br>D7 · ô 9 (306,1 s): 'Arctic Circle' cắt mép trái ở khung cuối. Sửa: giữ nhãn trong khung khi lao vào Wob. |
| d17 | ve-tay | 2 2 2 1 2 2 1 2 2 2 | 18/20 | **ĐẠT** | D7 · ô 2 (310,2 s): nhãn 'Siberian High' chỉ còn 'Siber' (nắp đang hạ, chữ bị cắt mép trên) đúng lúc lời gọi tên. Sửa: nắp hạ xong trước 311,0 s.<br>D4 · ô 1–9 (306,5–336 s): Wob ~30 px đứng nhìn. Sửa: Wob ngước nhìn nắp úp xuống, rụt cổ khi khí lạnh đổ xuống đáy bát. |
| d18 | diorama (bàn) | 2 2 2 2 2 2 2 2 2 2 | 20/20 | **ĐẠT** | Không có. |
| d19 | cat-giay (lịch sử) | 2 2 2 2 1 2 2 2 2 2 | 19/20 | **ĐẠT** | (nhỏ) ô 2 (356,1–361,5 s): camera lùi lộ mép trang sổ rách và mảng nền đen ~220 px bên phải khung. Sửa: giữ trang phủ kín khung hoặc lùi ít hơn. Không gag, Wob vắng có chủ ý: đúng. |
| d20 | diorama (bàn) | 2 2 2 2 2 2 2 2 2 2 | 20/20 | **ĐẠT** | Không có. |
| d21 | diorama (ngoài trời 3D) | 2 2 1 1 1 2 2 1 2 2 | 16/20 | **ĐẠT** | D8 (bắt buộc, xem T7): khăn cam, đổi đỏ như d07.<br>D5 · ô 2–3 (383,9–386,5 s): camera lên đồng hồ, Wob bị cắt chỉ còn chóp mũ và quả bông ở mép dưới ~2,5 s, trông như lỗi khung. Sửa: hạ camera để thấy cả đầu Wob, Wob ngước nhìn đồng hồ.<br>D3 · ô 4 (389,0 s): gag 'chào ghế trống' không đọc được: Wob đứng trước đầu xe nhìn camera. Sửa: Wob nhón chân cạnh cửa kính lái, ghế lái trống rõ, vẫy 2 lần, giữ 0,6 s. |
| d22 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20/20 | **ĐẠT** | Không có. |
| d23 | diorama (ngoài trời 3D) | 1 1 1 1 2 1 2 1 2 2 | 14/20 | **SỬA NHỎ** | D8 (bắt buộc): khăn cam, đổi đỏ.<br>D4/D3 · ô 1 (403,2 s): không thấy tay Wob vỗ nắp capo. Sửa: tay chạm nắp 3 lần, nắp nhún theo.<br>D6/D1 · ô 2 (406,0 s): cụm khói phụt ra từ BÊN TRÁI Wob, chỗ không có xe (đầu xe hướng về Wob, ống xả ở đuôi xe ngoài khung): đọc như khói từ đâu đến. Sửa: đổi thành cú 'khịt mũi' phụt từ lưới tản nhiệt phía trước (đúng ý so sánh con ngựa) thổi khăn bay ngang 0,6 s; thân xe lắc 2–3 px như ngựa khịt. |
| d24 | cat-giay | 2 2 1 2 2 2 2 2 2 2 | 19/20 | **ĐẠT** | D3 · ô 4 (420,1–422,7 s): gag 'xẻng bật lại' không thấy: xẻng chỉ giơ trên vai rồi nghiêng, không chạm đất. Sửa: lấy đà 0,15 s, xẻng đập xuống đất 'keng', nảy ngược 40 px, rung 7 khung, Wob rung theo, giữ 0,6 s. |
| d25 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20/20 | **ĐẠT** | Không có. |
| d26 | diorama (bàn) | 2 2 2 2 2 2 2 2 2 2 | 20/20 | **ĐẠT** | Không có. |
| d27 | cat-giay | 2 1 2 2 2 2 2 2 2 2 | 19/20 | **ĐẠT** | D2 · ô 3 (445,0 s): ống nước chỉ là ống xám chấm xanh, chưa đọc ra 'đông cứng thành que kem'. Sửa: phủ băng trắng, thêm que gỗ ở đầu ống.<br>(nhỏ) ô 1 (438,4 s): phân cảnh nói 'Wob trong nhà' nhưng Wob đứng ngoài tường nhà trên thảm đỏ, không rõ trong hay ngoài. |
| d28 | ve-tay | 2 2 2 2 2 2 1 2 2 2 | 19/20 | **ĐẠT** | D7 · từ 466,0 s: camera lùi, nhãn '≈ −52°C · −62°F' còn ~36 px (< 40). Sửa: giữ trung cảnh hoặc phóng nhãn 1,2×. |
| d29 | cat-giay | 2 2 1 2 2 1 2 0 2 2 | 16/20 | **LÀM LẠI** | D8 = 0 · nhịp 8 (495,8–497,9 s): con cá bọc khăn kẻ ô đứng trên bậu cửa sổ ở 17,2 s đoạn (496,3 s) rồi BIẾN MẤT ở 17,9 s, không ai nhét vào ba lô; ba lô đóng kín, không có đuôi cá thò ra; Wob ngồi đè lên mà không có lý do. Mất gag 'ba lô không đóng được' và gãy liên tục với d30 (vác ba lô phồng, đuôi cá thò ra). Làm lại nhịp 8 (2 s cuối), phần còn lại giữ.<br>Cách làm: Wob bưng cá bọc khăn từ bậu cửa sổ (0,6 s), nhét vào ba lô, nắp bật lên 2 lần vì đuôi cá, Wob ngồi đè, khung cuối đuôi cá thò ra mép nắp (khớp d30). |
| d30 | diorama (ngoài trời 3D) | 2 2 2 2 1 2 2 1 2 2 | 18/20 | **ĐẠT** | D8 (bắt buộc): phần mùa đông (0–2,8 s) khăn cam, đổi đỏ. Đuôi cá thò khỏi ba lô: đúng.<br>D5 · ô 5 (503,2–505,5 s): mảng đen mờ nhọn giữa đáy khung (giống d07). Sửa: bỏ vật tiền cảnh này.<br>(nhỏ) ô 5: 'vài con ngựa xa' là cục trắng nâu trông như cừu. Sửa: dáng ngựa Yakut (thân tròn, chân ngắn) hoặc bỏ. |
| d31 | cat-giay | 2 2 1 1 2 2 0 1 2 2 | 15/20 | **SỬA NHỎ** | D7 = 0 · ô 3–4 (~515,9–519,9 s): chữ '+34.6°C' tràn ra ngoài mép phải thẻ nhiệt kế (chữ 'C' nằm ngoài thẻ). Sửa trong canh.js: thu cỡ chữ hoặc nới rộng thẻ 30%.<br>D4 · ô 2 (509,2–~512 s): Wob ra khỏi khung, chỉ còn chóp mũ ở góc trái dưới. Sửa: giữ Wob trong khung khi camera lên đồng hồ.<br>D8 · cả đoạn: mũ mùa hè là mũ tròn màu kem; d30 và d32 là mũ trùm lông nâu đậm viền kem. Sửa: dùng đúng mũ trùm lông như d30/d32.<br>D3 · ô 7 (526,2 s): gag 'tay không với tới, lần hai' yếu: Wob chỉ dang tay ngắn. Sửa: tay cao su kéo dài về hai đầu thước, run, còn thiếu ~30 px mỗi bên, giữ 0,8 s. |
| d32 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20/20 | **ĐẠT** | Không có. |
| d33 | cat-giay | 2 2 1 2 1 2 2 2 2 2 | 18/20 | **ĐẠT** | D3 · ô 2 (545,0–545,7 s): chớp mùa đông chỉ ~0,7 s, dễ lỡ. Sửa: giữ khung tuyết 1,0–1,2 s, ngựa phủ tuyết trên lưng, rồi về xanh.<br>D5: một cỡ cảnh trung toàn suốt 7,9 s; thêm một cận ngựa ngẩng lên nhìn Wob.<br>(chính xác hình) Ngựa vẽ chân dài, thân thon như ngựa thường; phân cảnh đòi ngựa Yakut chân ngắn, thân tròn, bờm dày. Sửa: rút chân 25%, thân tròn, lông xù (d34 vẽ tay đã đúng hơn). |
| d34 | ve-tay | 2 2 2 2 1 2 2 2 2 2 | 19/20 | **ĐẠT** | Không có. |
| d35 | cat-giay | 2 1 2 2 2 2 2 2 2 2 | 19/20 | **ĐẠT** | D2 · ô 1 (564,3 s): ý 'ba lô to ngang ngựa' chưa vẽ, ba lô Wob vẫn nhỏ. Sửa: phóng ba lô 2,5× đặt cạnh thân ngựa 1,5 s.<br>(nhịp nghiêm) ô 7–8 (583,5–589,7 s): khi đẩy vào hình Chyskhaan, đầu Wob to choán góc phải dưới, đè lên tờ rơi. Sửa: đưa Wob ra mép trái hoặc ra khỏi khung khi đẩy vào. |
| d36 | ve-tay | 1 2 1 2 2 1 2 2 2 2 | 17/20 | **ĐẠT** | D1/D6 · ô 3–4 (594,3–594,9 s): cỏ vẽ thành hàng tam giác đen viền dày như hàng chông; 'ngồi phịch xuống cỏ' đọc như ngồi trên chông. Sửa: cỏ mềm, màu xanh, nét mảnh.<br>D3 · ô 2 (593,3 s): 'số áo dính mồ hôi trượt xuống chân' không thấy (số áo ở ngực rồi biến mất). Sửa: số áo trượt xuống tới giày trong 0,5 s, giữ 0,4 s. |
| d37 | cat-giay | 2 2 1 1 2 2 2 2 2 2 | 18/20 | **ĐẠT** | (nhỏ) ô 1–4 (595,3–601,8 s): mặt Wob khổng lồ sau trang sổ bị cắt mép trên, không diễn. Có thể cho Wob gật theo từng mũi tên. |
| d38 | diorama (bàn) | 2 2 2 2 2 1 2 2 2 2 | 19/20 | **ĐẠT** | D6 · ô 1–4 (609,6–620,2 s): chai nước, nhiệt kế, con dấu đã nằm sẵn trên bàn ngay từ đầu; nhịp 'Wob đặt chai nước' (611,7 s) và 'đặt nhiệt kế' (620,2 s) không có hành động. Sửa: bàn trống lúc đầu, Wob đặt từng món đúng chữ. |
| d39 | ve-tay | 2 2 2 1 2 2 2 1 2 2 | 18/20 | **ĐẠT** | D8 · ô 2–3 (642,7–644,5 s): cốc trà gọi lại d29 nhưng màu CAM; d29 là cốc trắng. Sửa: cốc trắng như d29. Góc end screen trống: đúng. |
| d40 | diorama (bàn) | 2 2 2 2 2 2 2 2 2 2 | 20/20 | **ĐẠT** | Không có. |

## Danh sách sửa theo người làm

Thứ tự ưu tiên: LÀM LẠI → lỗi liên tục (T7) → SỬA NHỎ (D7) → còn lại. Không có lỗi về người dân, chữ sai so với `claims`, hay gag trong đoạn lịch sử.

### Đạo diễn (`dao-dien-hoat-hinh`, sửa `phan-canh.json` trước khi thợ dựng làm lại)
1. d11: biên đạo lại nhịp 1–5 cho Wob có mặt trong phần sepia (Wob hiện đại xem 'phim quá khứ' trên trang sổ ở mép khung, hoặc rọi đèn pin vào cảnh sepia), Wob có mặt chậm nhất 171,9 s; tả cỡ cảnh từng nhịp (lia theo đàn, đẩy vào chấm nước tới trung cảnh, lều to gần camera).
2. d08, d16: thêm 'OYMYAKON' (d08) và 'OYMYAKON', 'TOMTOR' (d16) vào `chu_tren_do_vat` để biển làng vẽ tay khớp d07, d15.
3. Khoá đạo cụ liên tục trong `trang_phuc`/`boi_canh`: khăn mùa đông đỏ cùng mã màu mũ ở MỌI phong cách kể cả 3D; mũ hè d30–d32 là một mũ trùm lông nâu đậm viền kem; cốc trà d29, d39 màu trắng; xe hộp của Wob màu giấy kraft (d04, d06, d10); đài tưởng niệm d12, d13 cùng dáng khối trắng thuỷ ngân xanh, bảng 'POLE OF COLD'.

### dung-cat-giay
1. **d11 LÀM LẠI phần sepia (0–24 s đoạn, 153,7–177,7 s)** theo bản biên đạo mới của đạo diễn; giữ nguyên phần 2 (24–31 s).
2. **d29 LÀM LẠI nhịp 8 (495,8–497,9 s)**: Wob bưng cá bọc khăn từ bậu cửa sổ nhét vào ba lô, nắp bật lên 2 lần, Wob ngồi đè, đuôi cá thò ra mép nắp ở khung cuối (khớp d30).
3. **d31 SỬA NHỎ**: '+34.6°C' tràn ngoài thẻ nhiệt kế (515,9–519,9 s): thu chữ hoặc nới thẻ 30%; giữ Wob trong khung 509–512 s; đổi mũ tròn kem thành mũ trùm lông nâu như d30/d32; tay kéo dài hai đầu thước ở 526,2 s.
4. d09: hạ sổ 120 px cho Wob ló cả đầu + một tay (117–134 s), nghiêng đầu ở 'Even?'/'Sakha?'; dời '= water that does not freeze?' khỏi gáy sổ.
5. d24: gag xẻng (420,1 s): xẻng đập đất, nảy 40 px, rung 7 khung, giữ 0,6 s.
6. d06: đồng hồ hiện ở 8,0 s đoạn, nhiệt kế + 'JAN avg' ở 14,6 s đoạn; không để 'JAN avg' cắt mép trên ở 77–78,7 s.
7. d04: nhãn 'Oymyakon' trong vùng an toàn ở 44,3 s; nét đứt kéo ra khỏi mép trang ở 49,7 s; cận Wob ngáp 45,8 s.
8. d12 (190 s), d15 (265,7 s và 285 s): nhãn 'POLE OF COLD', biển 'OYMYAKON'/'TOMTOR' trọn trong khung lúc lời gọi tên.
9. d14: Wob theo nhiệt kế, chỉ Tomtor, nhìn đường băng ở 253–265 s; hạ vương miện chia đôi khỏi mép trên (236 s).
10. d33: giữ khung tuyết 1,0–1,2 s ở 545 s; ngựa Yakut chân ngắn, thân tròn, lông xù; thêm một cận ngựa.
11. d35: ba lô phóng 2,5× cạnh thân ngựa ở 564,3 s; đưa Wob ra khỏi hình Chyskhaan khi đẩy vào (583,5–589,7 s).
12. d27: ống nước phủ băng + que gỗ thành 'que kem' (445 s). d19: không để lộ mảng nền đen bên phải (356–361,5 s). d37: (tuỳ chọn) Wob gật theo mũi tên.

### dung-ve-tay
1. d13: đài tưởng niệm đổi về khối trắng thuỷ ngân xanh như d12; Wob không đứng đè chữ '1933' (203,4 s), '−67.8°C' (219,9 s); chừa 60 px trên cho '6 Feb 1933' (214,9 s).
2. d16: dời Wob khỏi cột nhiệt kế ~200 px, bong bóng '?' nối từ đầu Wob (293–298 s); vẽ chữ trên hai biển sau khi đạo diễn thêm; 'Arctic Circle' không cắt mép ở 306 s.
3. d36: cỏ mềm xanh nét mảnh thay hàng tam giác đen như chông (594,3 s); số áo trượt xuống giày ở 593,3 s.
4. d39: cốc trà màu trắng như d29 (642,7–644,5 s).
5. d10: xe hộp màu kraft; cận kính lái, Wob dí mặt vào kính (147–152 s).
6. d08: vẽ 'OYMYAKON' lên biển làng (94–101 s) sau khi đạo diễn thêm chữ.
7. d17: nắp 'Siberian High' hạ xong trước 311,0 s để nhãn không cắt; Wob ngước nhìn nắp, rụt cổ khi khí lạnh đổ xuống.
8. d28: nhãn '≈ −52°C · −62°F' ≥ 40 px sau khi camera lùi (từ 466 s).
9. d02: (tuỳ chọn) cận mặt Wob lúc vương miện mọc (26,2 s).

### dung-diorama
**Ngoài trời 3D (dio-3d.js):**
1. **Khăn của Wob 3D từ cam sang đỏ cùng màu mũ** trong rig, render lại cả 4 đoạn d07, d21, d23, d30 (bắt buộc, T7).
2. **d23 SỬA NHỎ**: tay vỗ nắp capo 3 lần (403,2 s); khói 'khịt mũi' từ lưới tản nhiệt phía trước thổi khăn bay ngang, thân xe lắc 2–3 px (406 s), không để khói phụt từ khoảng trống bên trái Wob.
3. d21: hạ camera ở đồng hồ cho thấy cả đầu Wob (383,9–386,5 s); gag chào ghế trống: Wob nhón chân cạnh kính lái, vẫy 2 lần, giữ 0,6 s (389 s).
4. d07: Wob bé tí thấy được trong cảnh toàn, hạ về Wob sớm 0,8 s (81,8–83,9 s); bỏ vật tiền cảnh đen mờ giữa đáy khung.
5. d30: bỏ vật tiền cảnh đen mờ giữa đáy khung (503–505,5 s); ngựa xa đúng dáng ngựa Yakut hoặc bỏ.

**Bàn kỷ vật (2D/CSS):**
6. **d01 SỬA NHỎ**: hơi nước không che biển 'OYMYAKON' (12,7 s); đẩy camera vào trang sổ cho 'PLAN: MOVE IN' ≥ 40 px đúng chữ 'move in' (~14,2 s); đuôi cá gõ đúng mép bàn ở 1,45 s.
7. d38: bàn trống lúc đầu, Wob đặt chai nước (611,7 s), nhiệt kế (620,2 s) đúng chữ, không để sẵn.
8. d03: Wob nhấc chai nước lên 0,8 s, bloom nhẹ, đẩy camera (32,6–34 s).

## Gửi biên kịch

Không có. Lời đọc không có chỗ nào cần sửa từ góc nhìn hình.

## Vòng sau

Sau khi sửa: chạy `to_khung.py --doan d01 d03 d04 d06 d07 d08 d09 d10 d11 d12 d13 d14 d15 d16 d17 d21 d23 d24 d28 d29 d30 d31 d33 d35 d36 d38 d39` (ít nhất các đoạn LÀM LẠI, SỬA NHỎ và mọi đoạn dính T7: d07, d08, d10, d11, d13, d16, d21, d23, d29, d30, d31, d39), duyệt vòng 2 các đoạn đó + tổng thể; giữ file này thành `duyet-hinh.v1.md`.
