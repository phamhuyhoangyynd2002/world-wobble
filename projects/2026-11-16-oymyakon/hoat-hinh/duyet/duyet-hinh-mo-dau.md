# Duyệt hình: Oymyakon, mở đầu mới d01–d08 (dựng 21/11/2026) · vòng 1

## Kết luận tổng thể: ĐẠT (T: 13/16). 6 ĐẠT, 2 SỬA NHỎ (d06, d07), 0 LÀM LẠI

**Đầu danh sách:** không có lỗi về người dân và không có đoạn lịch sử. Chữ khớp `chu_tren_do_vat`: ở d04 có '≈−68°C · ≈−90°F (1933)', '+34°C · +94°F' và '(JULY 2010)', dòng 1933 được làm mờ khi tới July. Ở d07 có 'JAN AVG', '−46°C', '−51°F', 'OYMYAKON'. Ở d05 có 'OYMYAKON', '~500 (2010)', 'PLAN: MOVE IN'. Ở d06 có '~4.5 h'. Không thấy chữ lạ. Ở mọi ô mắt Wob đều có con ngươi, không thành vòng rỗng, kể cả cặp mắt trong tối ở cuối d06.

| T | Điểm | Nhận xét, mốc |
|---|---|---|
| T1 | 1 | Khung 0 (soi/md/d01_0.png) chỉ có xe mở cửa, **chưa có Wob**. Tới 0,35 s Wob mới hiện. Cá hiện ở 10,9 s, "Why?" ở 35,4 s, câu hỏi trung tâm có hình ở d08 ô 2 (~81 s, bong bóng '?'). Gag lông mi (3,7 s) và máy ảnh tự tắt (7,2 s) giữ được 10 s đầu |
| T2 | 2 | Mồi ở 3,7 · 5,2 · 7,2 · 13,1 · 14,5 · 29,7 · 48,3 · 53,0 · 56,0 · 65,5 · 66,4 · 76,2 · 93,1 · 99,5 s. Khoảng trống dài nhất 33,0–48,3 s (~15 s, trong d05) |
| T3 | 2 | Phong cách đổi ở 4,9 / 10,9 / 21,7 / 33,0 / 50,6 / 66,1 / 78,5 s. Cỡ cảnh đổi trong từng đoạn. Hồi ức tông lạnh xanh, bàn tông ấm nâu, xen kẽ nhau |
| T4 | 2 | Cold open → bàn, mở cá → nhiệt kế → kế hoạch → đường đi → tới nơi, gọi lại cảnh mở (d07 ô 5–6) → câu hỏi và ba lần đoán (d08). Hai lớp thời gian tách rõ |
| T5 | 1 | Gag: lông mi 3,7 · không biết mình có lông mi 5,2 · máy ảnh tự tắt 7,2 · cá đứng 14,5 · nhiệt kế vọt và bút văng 29,7 · ba lô 48,3 · bản đồ ngược 56,0 · tắt đèn chỉ còn mắt 65,5 · đèn rọi mặt 66,4 · sông gõ lại 93,1 · dấu X và Wob ngã 99,5 s. **Gag "bản đồ ngược" lặp:** d06 ô 3 (56,0 s) và d09 ô 11 (~130 s) cách nhau ~75 s, cùng kiểu hình. Gag ba lô ở d05 ô 7 không đọc được |
| T6 | 2 | Diorama 45,7 s, vẽ tay 40,6 s, cắt giấy 15,5 s. Không có cửa sổ 15 s nào đổi phong cách quá 2 lần |
| T7 | 1 | Dòng thời gian: d01–d02 mũ đỏ, khăn đỏ, đèn pin tắt bên **trái màn hình**, máy ảnh bên phải, lông mi băng → d03–d05 không mũ, găng + cá → d06 mũ, khăn, **đèn pin bên phải màn hình, cùng phía với máy ảnh** (soi/md/d06_9.0.png, d06_13.0.png), chưa có lông mi → cuối d06 tối hẳn, không có đèn → d07 ở 0,00 s cảnh sáng nhưng không có Wob, tới 0,35 s Wob đã rọi đèn vào mặt bằng tay trái → khung cuối d07 đèn **đang bật** (soi/md/d07_end.png), trong khi ở d01 đèn tắt → d08 đèn đã cất, Wob cầm máy ảnh → d09 cầm sổ, ban ngày. Có hai chỗ nhảy: tay cầm đèn ở d06, và đèn bật/tắt ở cú gọi lại d07↔d01 |
| T8 | 2 | Phần kết nằm ngoài phạm vi. Nối d08→d09 (cat) hợp lý: d08 kết ở cảnh Wob ngã góc trang sổ, d09 mở ở cảnh Wob cầm sổ ban ngày. Trang phục và lông mi khớp, đèn pin đã cất. **Lưu ý:** tờ d09.jpg còn mốc cũ (116,93 s, làm 19/11). Chạy lại `to_khung.py --doan d09` để kiểm theo mốc mới 101,822 s |

## Từng đoạn

| Đoạn | Phong cách | D1..D10 | Tổng | Kết luận | Việc cần sửa |
|---|---|---|---|---|---|
| d01 | diorama | 2,2,2,1,2,2,2,2,2,2 | 19 | ĐẠT | D4/T1: từ 0,00 tới ~0,3 s chỉ có xe, Wob chưa hiện (việc (a) của vòng phân cảnh chưa làm). Đặt Wob nửa người ở cửa xe ngay từ khung 0. Đèn pin cầm tay trái, đang tắt: đúng. Khung cuối 4,85 s khớp bố cục khung cuối d07 (cận cảnh, biển bên phải, máy ảnh bên phải, đèn bên trái), đủ cho cú gọi lại; chỉ lệch ở chỗ đèn (xem d07) |
| d02 | vẽ tay | 2,2,2,2,2,1,2,2,2,2 | 19 | ĐẠT | D6: ô 2 (2,35 s) máy ảnh lơ lửng trên đầu Wob, không thấy tay hay dây đeo, dễ đọc nhầm. Cho máy nằm trong tay rồi màn hình tắt phụt |
| d03 | diorama | 2,2,2,2,2,2,2,2,2,2 | 20 | ĐẠT | Không |
| d04 | vẽ tay | 2,2,2,1,2,1,2,2,2,2 | 18 | ĐẠT | Chữ đúng. '(JULY 2010)' và dòng 1933 mờ chỉ cao ~38–40 px (soi/md/d04_9.9.png), sát ngưỡng: nếu dựng lại thì tăng cỡ 10 %. Mặt Wob chỉ ló ra ở 11,25 s, góc phải dưới, đúng ý đồ và bị cắt chưa quá nửa mặt |
| d05 | diorama | 1,1,1,2,2,2,2,2,2,2 | 17 | ĐẠT | D3: ô 7 (15,33 s), gag "whether I was unpacking" chỉ là một vệt mờ xanh ở tiền cảnh, tắt tiếng thì không đọc ra. Cho khoá ba lô bung rõ ở trung cảnh, Wob lấy bút đè xuống, giữ 0,6 s. Ra giấy ở 17,55 s: đúng |
| d06 | cắt giấy | 2,2,2,2,2,2,2,1,1,2 | 18 | **SỬA NHỎ** | D8: ở ô 5–6 (9,45–13,59 s) đèn pin nằm bên phải màn hình, cùng phía máy ảnh. Chuyển đèn sang bên trái màn hình như d01/d02/d07. D9: ô 7 (15,45 s) tối hẳn, chỉ còn mắt, không có đèn, rồi d07 mở bằng cảnh sáng. Ở ~15,2 s cho Wob bấm đèn, luồng sáng bật ra từ phía trái cặp mắt, cắt sang d07 đúng lúc đèn sáng |
| d07 | diorama | 2,2,2,2,2,2,2,1,1,2 | 18 | **SỬA NHỎ** | D9: khung 0,00 s (soi/md/d07_0.png) chỉ có biển và nhiệt kế, chưa có Wob, chưa có đèn. Mở thẳng vào Wob đang rọi đèn (như ô 1, 0,35 s) để nối với cú bật đèn cuối d06. D8: ở khung cuối 12,35 s đèn pin **đang bật** (luồng sáng bên trái), còn ở d01 đèn tắt. Cho Wob tắt đèn ở ~11,5 s, lúc giơ máy ảnh, để khung cuối khớp d01. D7: '−51°F' ở ô 3 (6,16 s) nhỏ hơn '−46°C', kiểm lại cao chữ ≥ 40 px |
| d08 | vẽ tay | 2,2,2,2,2,2,2,2,2,2 | 20 | ĐẠT | Đã có nhịp câu hỏi (ô 2), lá cờ "on purpose" (ô 3), ô tối có đầu bút tô mực (ô 5). Khung cuối Wob ngã ở góc phải dưới, nhưng không nằm trong 20 s cuối video nên không phạm vùng end screen |

## Danh sách sửa theo người làm
- dung-cat-giay: d06 chuyển đèn pin sang bên trái màn hình ở 9,45–15,4 s; thêm cú bật đèn ở ~15,2 s trước khi cắt.
- dung-diorama: d07 có Wob rọi đèn ngay từ khung 0; tắt đèn ở ~11,5 s để khung cuối khớp d01; kiểm cỡ chữ '−51°F'. d01 cho Wob hiện từ khung 0. d05 làm gag ba lô ở 15,33 s cho đọc được.
- dung-ve-tay (tuỳ chọn): d04 tăng cỡ nhãn phụ 10 %; d02 cho máy ảnh nằm trong tay ở 2,35 s.
- Đạo diễn: đổi hình gọi lại "bản đồ ngược" ở d09 cho khác d06 (ví dụ Wob tự lật bản đồ lại, rồi bản đồ tự lật về), hoặc ghi lý do giữ nguyên.
- Sau khi sửa: chạy `to_khung.py --doan d01 d05 d06 d07 d09`, rồi duyệt lại d06, d07 và chỗ nối d06→d07→d08.

## Gửi biên kịch (không tính điểm)
- Câu "My map was upside down" có ở cả d06 và d09, cách nhau ~75 s.
