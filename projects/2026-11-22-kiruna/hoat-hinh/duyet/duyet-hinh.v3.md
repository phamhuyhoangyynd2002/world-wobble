# Duyệt hình: tập 6 Kiruna · vòng 3

Người duyệt: agent `duyet-phan-canh`, chế độ `hinh` (cổng 6a), 28/11/2026. Sau phản biện, lời cảnh 6, 10, 12, 16, 17 đổi và `phan-canh.json` sinh lại (722,4 s). Chấm lại 19 đoạn dựng lại (d04 d13 d17 d18 d19 d20 d24 d28 d29 d33 d34 d39 d40 d41 d42 d43 d44 d46 d47) theo tờ khung mới (22:13–22:26, mới hơn từng `doan.mp4`) và khung trích từ `doan-<id>/out/doan.mp4` (`soi/v3-*.jpg` và các tờ w, x, y, z). Các đoạn khác chỉ dời mốc, nhịp tương đối không đổi (đã so với `phan-canh.v2.json`), giữ điểm vòng 2. Chấm lại T1–T8. Vòng 2 lưu ở `duyet-hinh.v2.md`, `.v2.json`.

## Kết luận tổng thể: ĐẠT  (T: 14/16; vòng 2: 16/16)

Đoạn: ĐẠT 42 · SỬA NHỎ 5 · LÀM LẠI 0 (vòng 2: ĐẠT 47 · SỬA NHỎ 0 · LÀM LẠI 0).

**Chưa qua cổng 6a, chưa ghép bản cuối.** Không lỗi nặng: không đùa về người dân (d34 nay chỉ mọc lông, giữ màu lục địa và biển; người Sámi, người chăn tuần lộc vẽ chung, tôn trọng), chữ đúng `chu_tren_do_vat` và đơn vị, đoạn nghiêm d38–d43 không gag, không sfx hài, góc end screen trống, không đứng hình. Mọi yêu cầu của phản biện đã lên hình. Còn **5 đoạn SỬA NHỎ, đều sửa trong `canh.js`, không đổi biên đạo**:
- **d39, d40, d41, d42**: Wob cầm chìa Kiruna suốt chương nghiêm, trong khi d38 vừa đặt chìa xuống dưới đèn ('I put the key down for this part') và d43 mở với chìa dưới đèn. Tắt đạo cụ chìa.
- **d18**: nhãn 'Luleå · freezes in winter' chỉ trọn chữ 0,05 s trước cắt rồi nhảy chỗ sang d19. Cho hiện ở 'freezes' 226.88 hoặc bỏ.

Sửa xong chạy `to_khung.py --doan d18,d39,d40,d41,d42`, duyệt vòng 4 chỉ các đoạn đó cùng T7; đạt thì ghép.

Hai chỗ nối được hỏi: **d16→d17→d18→d19** đọc được bằng mắt (khung cuối d18 và khung đầu d19 cùng ý vịnh băng, tàu kẹt) nhưng phạm luật đổi phong cách 3 lần trong 11,9 s (T6 = 1, không chặn). **d42→d43→d44** liền: cắt từ trang giấy sang bàn đèn 645.23, tắt đèn, d44 mở trong tối 649.13 với 4,4 s lặng trước 'Lamp on'; chỉ vướng chìa nhảy từ tay Wob (d42) xuống chân đèn (d43), xong khi sửa d39–d42.

| T | Điểm | So vòng 2 | Nhận xét, mốc |
|---|---|---|---|
| T1 | 2 | 2 | Không đổi: d01–d03 không dựng lại; không có tàu, cảng, Narvik, Luleå trước cảnh 6. d04 nay có Wob trọn khung ở mép trang. |
| T2 | 2 | 2 | Mốc mồi như vòng 2, thêm: 219 hòn quặng ngó ra mép sổ · 227 quặng đâm tàu kẹt băng (chèn mới) · 255–258 Wob đếm hai ngón · 329 đo đường bằng sải tay · 519 Wob mọc lông · 679 pop-up tuần lộc. Khoảng trống dài nhất ngoài đoạn nghiêm vẫn ≈ 24 s. |
| T3 | 2 | 2 | Không chuỗi > 90 s cùng phong cách; d18 đổi từ cửa hàng sang vịnh băng vẽ tay làm cụm 216–258 có thêm một cỡ cảnh ngang rộng khác hẳn bản đồ. |
| T4 | 2 | 2 | Không đổi; câu chốt cảnh 6 mới ('a furnace that liked it, and a train to the sea') có hình Wob đếm hai ngón ở đường ngang, đóng chương lời giải rõ hơn. |
| T5 | 2 | 2 | Gag mới đọc trong 1 s: quặng ngó ra mép sổ (219.3), quặng đâm tàu kẹt băng (227.9), Wob mọc lông (519.6). Không kiểu nào lặp quá 2 lần. Đoạn nghiêm d38–d43 không gag, sfx chỉ một tiếng lật giấy ở d39; d46 câu tuần lộc không gag. Lặng trước 'Lamp on' 4,4 s. |
| T6 | 1 | 2 | Cụm d16 (vẽ tay) → d17 (cắt giấy, 216.55) → d18 (vẽ tay, 226.29) → d19 (cắt giấy, 228.45): 3 lần đổi phong cách trong 11,9 s, vượt luật 'không đổi > 2 lần trong 15 s' (vòng 2 là 16,2 s nên chưa phạm). Xem bằng mắt nối vẫn đọc được: d18 là chèn 2,2 s, khung cuối d18 (vịnh băng, tàu kẹt) và khung đầu d19 (bản đồ vịnh phủ băng, tàu kẹt) cùng ý nên người xem không lạc. Không chặn. Nếu đạo diễn muốn sạch luật: dựng d18 bằng cắt giấy (cùng lib d17, d19) thay vì vẽ tay, hoặc gộp ý 'vịnh đóng băng' vào cuối d17 trên chính bản đồ như vòng 2. |
| T7 | 1 | 2 | Dòng trang phục không nhảy. Đồ cầm nhảy: chìa Kiruna nằm dưới chân đèn ở d38 (564) và d43 (645), nhưng nằm trong tay Wob suốt d39–d42 (565–645). Sửa ở d39–d42 (tắt đạo cụ chìa) là xong. Thẻ hộ chiếu d44 → d46 nay khớp. |
| T8 | 2 | 2 | Con dấu SUMMER ONLY một lần, không đè SWEDEN; câu hỏi cuối mới có hình; đuôi tập có chìa đung đưa, bưu thiếp tựa lọ opal, tất ẩm; end screen trống, không đứng hình. |

## Từng đoạn

Điểm theo thứ tự D1 D2 D3 D4 D5 D6 D7 D8 D9 D10. SỬA NHỎ lên đầu, rồi các đoạn chấm lại, rồi đoạn giữ điểm. Không có lỗi về người dân, chữ sai so với `claims` hay gag trong đoạn lịch sử.

| Đoạn | Phong cách | Giây | D1..D10 | Tổng | Kết luận | So vòng 2 | Nhận xét vòng 3, việc cần sửa |
|---|---|---|---|---|---|---|---|
| d18 | ve-tay | 226.288–228.45 | 2 2 2 2 2 2 1 2 2 2 | 19 | SỬA NHỎ | 20 ĐẠT | Chèn vẽ tay mới đọc được: băng lan quanh tàu, hòn quặng trượt đâm vào tàu kẹt băng 227.5–227.9, Wob nhăn mặt. Lỗi chữ: nhãn 'Luleå · freezes in winter' chỉ bắt đầu hiện ở ≈ 227.9 và trọn chữ ở 228.40, 0,05 s trước cắt, rồi d19 mở với cùng nhãn ở chỗ khác (trái dưới bản đồ): chữ chớp rồi nhảy chỗ. Sửa trong canh.js: cho nhãn hiện ở 'freezes' 226.88 như phân cảnh ghi (giữ ≥ 1,3 s), hoặc bỏ hẳn nhãn khỏi d18 vì d19 đã có. |
| d39 | cat-giay | 565.229–586.256 | 2 2 2 2 2 2 2 1 2 2 | 19 | SỬA NHỎ | 20 ĐẠT | Chìa Kiruna (thẻ gỗ dây đỏ) lủng lẳng trong tay Wob suốt đoạn (ô 1–6, cận ở 566.0), trong khi d38 vừa đặt chìa xuống dưới chân đèn ('I put the key down for this part', 562–564) và d43 mở với chìa vẫn nằm dưới đèn (645.3). Mô-típ chìa là xương sống của tập; đoạn nghiêm mà Wob vẫn cầm chìa thì ngược lời. Sửa trong canh.js, không đổi biên đạo: tắt đạo cụ chìa của rig (Wob tay không) từ khung 0 tới hết đoạn. Phần còn lại đạt: Wob đứng trọn mép trang, nhìn nhà bị nhấc, cửa sổ sáng, tờ kiến nghị; không gag, sfx chỉ lật giấy. |
| d40 | cat-giay | 586.256–601.926 | 2 2 2 2 2 2 2 1 2 2 | 19 | SỬA NHỎ | 20 ĐẠT | Chìa Kiruna (thẻ gỗ dây đỏ) lủng lẳng trong tay Wob suốt đoạn (ô 1–4), trong khi d38 vừa đặt chìa xuống dưới chân đèn ('I put the key down for this part', 562–564) và d43 mở với chìa vẫn nằm dưới đèn (645.3). Mô-típ chìa là xương sống của tập; đoạn nghiêm mà Wob vẫn cầm chìa thì ngược lời. Sửa trong canh.js, không đổi biên đạo: tắt đạo cụ chìa của rig (Wob tay không) từ khung 0 tới hết đoạn. Phần còn lại đạt: Wob trọn khung, đi theo vệt đường tuần lộc, buồn ở đoạn đường bị chắn; không gag, không sfx. |
| d41 | cat-giay | 601.926–629.046 | 2 2 2 2 2 2 2 1 2 2 | 19 | SỬA NHỎ | 20 ĐẠT | Chìa Kiruna (thẻ gỗ dây đỏ) lủng lẳng trong tay Wob suốt đoạn (ô 1–6), trong khi d38 vừa đặt chìa xuống dưới chân đèn ('I put the key down for this part', 562–564) và d43 mở với chìa vẫn nằm dưới đèn (645.3). Mô-típ chìa là xương sống của tập; đoạn nghiêm mà Wob vẫn cầm chìa thì ngược lời. Sửa trong canh.js, không đổi biên đạo: tắt đạo cụ chìa của rig (Wob tay không) từ khung 0 tới hết đoạn. Phần còn lại đạt: Per Geijer, GABNA / LKAB cùng cỡ, Wob đứng giữa hai thẻ trên mặt bàn; không gag, không sfx. |
| d42 | cat-giay | 629.046–645.226 | 2 2 2 2 2 2 2 1 2 2 | 19 | SỬA NHỎ | 20 ĐẠT | Chìa Kiruna (thẻ gỗ dây đỏ) lủng lẳng trong tay Wob suốt đoạn (ô 1–4, rõ ở 642.9 và khung cuối 645.2 Wob ngồi ghế cầm chìa), trong khi d38 vừa đặt chìa xuống dưới chân đèn ('I put the key down for this part', 562–564) và d43 mở với chìa vẫn nằm dưới đèn (645.3). Mô-típ chìa là xương sống của tập; đoạn nghiêm mà Wob vẫn cầm chìa thì ngược lời. Sửa trong canh.js, không đổi biên đạo: tắt đạo cụ chìa của rig (Wob tay không) từ khung 0 tới hết đoạn. Phần còn lại đạt: Wob ngồi vào một trong hai ghế trống cạnh tờ giấy trắng (việc trung lập, hết tay cao su); không gag, không sfx. |
| d04 | cat-giay | 39.512–51.55 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: Wob đứng trọn ở mép trang trái suốt đoạn, ngó người Sámi (vẽ chung, tôn trọng) trao quặng; túi tiền và giấy thuế gạch chéo; phủi tuyết tìm thấy cánh cửa băng nhỏ trên thước 1736 → 1900 (ô 4). |
| d13 | ve-tay | 143.514–168.114 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: thẻ '607,818 guest nights' + nhãn 'record' + '2024' trên gáy sổ, không chồng (163.5, 165.0); mũi tê trắng, dấu X lên thẻ cực quang giữ nguyên. |
| d17 | cat-giay | 216.55–226.288 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: Wob mở sổ ở đường ngang (216.56); hòn quặng ngó ra mép trang (219.3) rồi que (tay áo Wob) kéo về Kiruna (219.9); nhãn Kiruna, Luleå, Gulf of Bothnia trọn; Wob ló góc phải dưới khi sắp cắt (226.0). |
| d19 | cat-giay | 228.45–258.476 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: mở bằng bản đồ đã phủ băng khớp cuối d18; nhãn Narvik · ice-free trong lề (≈ 47 px hệ 1080 ở 250–252, sát vùng an toàn 54 px, chấp nhận); câu chốt mới có hình: Wob đủ người giữa khung, giơ một rồi hai ngón tay ở 'furnace' và 'train' (254.6–258.4), tàu quặng chạy sau lưng. |
| d20 | cat-giay | 258.476–279.126 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: Wob trọn ở góc phải dưới cạnh trang, có việc theo lời: nghiêng đầu nhìn nhà đầu tiên, nhìn người que địa chất, khăn bay khi gió lùa (271.0), lén đặt nhà tí hon xanh lá (276.8); thẻ 1900, 1910 trọn khung. |
| d24 | ve-tay | 318.948–349.824 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: thẻ '9 m → 24 m' (330.5); Wob đo đường bằng sải tay (328.6–332.0) đọc được nhưng Wob nhỏ (≈ 1/9 chiều cao khung), ghi chú không chặn. Đẩy nhà thờ, bốn mùa, vượt ba lần, đi lùi giữ nguyên. |
| d28 | cat-giay | 388.394–414.744 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: lời 'two thirds of the town itself' khớp thùng các-tông trên hai phần ba mái nhà (ô 4–7); thẻ ~12,000 people · ~5,400 homes. |
| d29 | ve-tay | 414.744–434.86 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: bong bóng 'packing a whole street into one van': xe tải chở dãy nhà và cây thông cúi rạp qua cầu (416.6–417.6); các nhịp sau giữ nguyên. |
| d33 | ve-tay | 485.328–503.128 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: thẻ '−11°C · 12°F' gõ dần đúng lúc đọc (488.0 → 489.6), vòng khói móc quả bông (490.3), tờ nghiên cứu có mũi tên xuống, muôi khí lạnh. |
| d34 | cat-giay | 503.128–527.202 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt, đúng luật: bong bóng 'grow feathers and sit in a snowbank' (518.6–521.0): Wob mọc lông vũ trắng quanh người, vẫn giữ màu lục địa xanh và biển, ngồi ụ tuyết cạnh gà gô; bong bóng tan thành lông bay. Không còn hình Wob trắng toàn thân. Biển Kiruna / Giron trọn khung. |
| d43 | diorama | 645.226–649.134 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: mở ngay sau d42 (645.25), chìa dưới chân đèn, Wob nhìn chìa không cầm, tắt đèn; nối sang d44 trong tối liền (649.10 → 649.15). |
| d44 | diorama | 649.134–670.334 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: 4,4 s tối lặng (649.13–653.58, gồm 1,5 s mới thêm) trước 'Lamp on.'; bật đèn đúng chữ (653.8); ôm chân đèn trọn hình; thẻ hộ chiếu kết ở chỗ cũ bên trái, khớp mở d46. |
| d46 | diorama | 676.722–702.4 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 19 ĐẠT | Đạt: câu 'Not everyone got to choose…' có pop-up đàn tuần lộc đi qua khe giữa hai khối xám, đèn dịu một nấc, không gag (678.8); con dấu SUMMER ONLY nằm dưới dòng SWEDEN, không đè (683.95–684.4); câu hỏi mới 'What would you refuse to move, even for a mine?' có hình Wob chỉ chìa trên đinh. Ghi chú nhỏ: ở 683.85 tay cầm con dấu che chữ 'here' của 'Would Wob move here?' khoảng 0,5 s lúc nhấc lên. |
| d47 | diorama | 702.4–722.4 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Đạt: chìa đung đưa trên đinh ở 'swings' (703.4), bưu thiếp tựa lọ opal (707.7), tất ẩm; hai khung và vòng tròn end screen trống, chữ trên kệ ở x < 1000; không đứng hình (kiem_dong_hinh 0 lỗi, 0 cảnh báo). |
| d01 | diorama | 0.0–3.263 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: khung 0 có Wob và chìa, bụi sỏi bay 1.8 s. |
| d02 | ve-tay | 3.263–7.362 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: cận lỗ chìa thấy cánh cửa, biển phố rơi. |
| d03 | diorama | 7.362–39.512 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: QUYẾT: KHÔNG CHẶN. Gag chìa khít viền trống 8.6–9.3 vẫn chưa có (thợ nói phải dựng lại 0–2,5 s đoạn). Lý do: d03 đã có 3 gag đọc rõ (đi dây vòng Bắc Cực 18.0, bút chì chặn mái 26.5, thiêu thân 1736 đậu chìa 38.9), khung 0 và lời hứa không phụ thuộc gag này, T1 và T5 vẫn 2. Ghi vào nhat-ky.md như một chỗ bỏ qua có lý do; làm nếu còn thời gian sau khi ghép. |
| d05 | diorama | 51.55–57.086 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: úp thẻ cực quang dưới cốc trà 55.6. |
| d06 | cat-giay | 57.086–73.953 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: cốc nhích, trùm chăn, lò sưởi mở mắt. |
| d07 | ve-tay | 73.953–83.211 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: nhãn 01:15–01:45 rõ 77.4, Wob quạt gối. |
| d08 | cat-giay | 83.211–95.032 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: cụng ly với cốc nước 93.7. |
| d09 | ve-tay | 95.032–99.219 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: mũ bảo hộ sụp che mắt 98.3. |
| d10 | cat-giay | 99.219–117.92 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đã sửa: camera vào gần lồng thang 106.0–108.8, Wob cao ≈ 1/4 khung, viên sỏi rơi thấy rõ (khung 108.0); 108.8–110.6 lia xuống đáy giếng hiện thẻ 1,365 m · ~4,480 ft (109.5), rồi về Wob ghé tai (111.5). Gag đọc được. |
| d11 | ve-tay | 117.92–125.769 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: ống khói thò tay bám mái. |
| d12 | cat-giay | 125.769–143.514 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: thẻ M 4.1 · May 2020 rõ; túi phồng, thẻ gỗ thò ra. |
| d14 | cat-giay | 168.114–189.848 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: biển Jukkasjärvi + ~17 km · ~11 mi rõ 171.5; vết sương in trên giường băng. |
| d15 | cat-giay | 189.848–204.698 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: thẻ up to 68 wagons · ~750 m, bảy sân bóng 200.6, xoay vòng hai lần. Ranh 189.848 không lộ đáp án. |
| d16 | ve-tay | 204.698–216.55 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đã sửa: nhãn 1870s hạ xuống, trọn chữ, trong vùng an toàn ở 211.4–213.0. |
| d21 | ve-tay | 279.126–294.888 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đã sửa: mảnh New Jersey đi dưới thẻ ~22,400 people (287.4, 288.2). |
| d22 | cat-giay | 294.888–300.31 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: rót trà mời tàu, thẻ gỗ thò khỏi túi. |
| d23 | cat-giay | 300.31–318.948 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: gõ cửa nhà thờ, thẻ 1912, bản đồ không nhãn núi. |
| d25 | cat-giay | 349.824–367.936 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: người que chung, cờ trơn, vương miện không người, chó và bánh quế. |
| d26 | ve-tay | 367.936–377.974 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: thẻ 180°, lịch 2027?. |
| d27 | cat-giay | 377.974–388.394 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: xỏ chìa lại vào chùm, cận rõ. |
| d30 | cat-giay | 434.86–459.122 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: ~3 km east, Sept 2022, đồng hồ quả quýt. |
| d31 | ve-tay | 459.122–470.166 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: lỗ chìa chỉ còn con quạ 470.4, quạ bay đi. |
| d32 | diorama | 470.166–485.328 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: thẻ ~11 Dec – 1 Jan 480.8, trời hồng rồi tắt, kéo khoá lên mắt 487.9. |
| d35 | diorama | 527.202–541.802 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: Wob ra khỏi khung ≈ 541.0–542.0 khi camera ngửa lên tháp đồng hồ 12 giờ là cố ý, Wob quay lại ở 542.6 với kính râm: chấp nhận. |
| d36 | ve-tay | 541.802–549.024 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: khăn, ba khăn, tủ; tia nắng vào một mắt. |
| d37 | cat-giay | 549.024–558.904 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: dải hè ngắn trên lịch, chìa loé phản vào kính râm. |
| d38 | diorama | 558.904–565.229 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: tháo chìa, đặt dưới chân đèn, gập pop-up nhà thờ; không gag. |
| d45 | ve-tay | 670.334–676.722 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | 20 ĐẠT | Không dựng lại (chỉ dời mốc theo lời mới, nhịp tương đối không đổi). Nhận xét vòng 2: Đạt: phố có chân đi theo nhà thờ, cận Wob khiêng chong chóng. |

## Danh sách sửa theo người làm

### dung-cat-giay B (d22–d42)
- d39, d40, d41, d42 (SỬA NHỎ, bắt buộc): tắt đạo cụ chìa Kiruna trong tay Wob từ khung 0 tới hết đoạn; Wob tay không trong cả chương nghiêm (chìa đang nằm dưới đèn từ d38).

### dung-ve-tay A (d02 d07 d09 d11 d13 d16 d18 d21 d31)
- d18 (SỬA NHỎ, bắt buộc): nhãn 'Luleå · freezes in winter' hiện ở 226.88 và giữ ≥ 1,3 s, hoặc bỏ nhãn khỏi d18 (d19 đã mở với nhãn này).

### dung-ve-tay B (không chặn)
- d24: đẩy camera vào Wob trong nhịp đo sải tay 328.1–332.0 cho Wob ≥ 1/4 chiều cao khung.

### dung-diorama (không chặn)
- d46: ở 683.6–684.1 nhấc con dấu theo hướng ra khỏi dòng 'Would Wob move here?' để không che chữ 'here'.

### Đạo diễn (không chặn)
- T6: cụm d16–d19 đổi phong cách 3 lần trong 11,9 s. Chấp nhận được như đã ghi nhật ký; nếu muốn sạch luật thì giao d18 cho dung-cat-giay A dựng bằng lib cắt giấy.

## Gửi biên kịch

Không có việc.
