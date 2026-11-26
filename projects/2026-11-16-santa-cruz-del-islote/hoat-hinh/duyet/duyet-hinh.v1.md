# Duyệt hình: Santa Cruz del Islote (tập 4) · vòng 1

Đầu vào: 33 `doan-<id>/out/doan.mp4` (2560×1440), tờ khung `to-khung/<id>.jpg`, `_tong-the.jpg`, `_muc-luc.json`; đặt cạnh `phan-canh.json` (vòng 2 đã duyệt 5a).

Đã kiểm thêm:
- **Khung soi** ở `soi/<id>-*.jpg` và các ảnh cắt `soi/d15-crop*.png`, `soi/d33-tags.png`.
- **`kiem_dong_hinh.py` cho cả 33 clip** (`soi/dong-hinh/<id>.txt|json`): 32 đoạn ĐẠT; d33 KHÔNG ĐẠT vì đứng hình.
- **Khung đầu và khung cuối mọi clip:**
  - Mọi nối `giay` ra/vào đúng giấy phẳng (236,224,197).
  - Riêng d04 (`ra: cat`) kết bằng giấy phẳng.

## Kết luận tổng thể: ĐẠT (T: 14/16) · CỔNG 6a: CHƯA QUA (1 đoạn LÀM LẠI: d25)

Đếm: **ĐẠT 30 · SỬA NHỎ 2 (d04, d33) · LÀM LẠI 1 (d25)**.

d25 phải dựng lại vì võng đổi màu qua chỗ cắt cứng d24 → d25. Việc chỉ là đổi màu võng rồi render lại, biên đạo giữ nguyên. Sau khi sửa d25, d04, d33 (và các việc "nên" làm cùng lượt), chạy `to_khung.py --doan` cho các đoạn đó rồi duyệt lại.

### Lỗi ưu tiên đầu (người dân, chữ sai claims, gag đoạn nghiêm)
- **Gần lỗi chữ sai claims: d04, 20,6–25,5 s.** Thẻ `45 min–1 h` nằm ngay cạnh nhãn `Cartagena` ở góc trên phải bản đồ. Đặt như vậy, người xem đọc thành "Cartagena = 45 min–1 h", trong khi C06 nói đây là tuyến Tolú. Chữ đúng, chỉ chỗ đặt sai. Phải dời thẻ xuống sát nét đứt Tolú → đảo.
- **Người dân: d16, 7,7–11,8 s.** Một người giấy ngồi ghế trắng ngay giữa khung, đúng câu "A man who'd lived here his whole life told CNN". Người xem dễ hiểu người này chính là người được phỏng vấn, trong khi luật trung thực cấm vẽ người thật cụ thể. Nên bỏ người ngồi ghế trong khoảng này, hoặc dời ra xa, ra mép khung.
- **Những chỗ khác đạt:**
  - Người dân vẽ dạng chung, mặt chấm, tôn trọng; d10 vẽ từ sau lưng.
  - d26 và d29: Wob mắt sụp, miệng thẳng, không cười, không gag. Ở d29 cuốn sổ che miệng Wob.
  - d25: khung chặt quanh võng, nhà chỉ là tường nền, cửa khép.

| T | Điểm | Nhận xét, mốc |
|---|---|---|
| T1 | 1 | Khung 0 (0,0 s) có Wob đứng trên bàn, giơ bình xịt có tem đỏ. Đảo kín nhà bật dựng trước 5,9 s. Wob nảy còn bình xịt đứng yên (7,55 s). Muỗi lờ Wob (8,9 s). Thẻ hộ chiếu 10–13 s đọc rõ. Trừ 1 như ở 5a: câu hỏi của tập nằm trong lời ở 39 s (việc của biên kịch). |
| T2 | 2 | Mồi đều 15–30 s một lần; không đoạn nào đứng ý quá 60 s. Chỗ chỉ giải thích dài nhất là d26 (47,5 s), có chủ ý nghiêm và có 4 trang sổ khác nhau. |
| T3 | 2 | Ánh sáng: trưa (d02–d09), sepia (d10, d12), đêm trăng (d13–d15, d24), bình minh hồng (d20), chạng vạng tím (d19), đèn bàn lạnh (d26), nắng sớm ở bàn (d30). Cỡ cảnh đổi đều: toàn từ trên cao (d02, d07, d12), trung, cận (d06 đồng hồ xăng, d07 mèo, d26 trang sổ). |
| T4 | 2 | Khung đầu các chương nối thành chuyến đi: thuyền tới (d04) → sổ kho báu (d09) → quảng trường đếm người (d16) → cầu tàu bình minh (d20) → võng đêm (d24) → thuyền rời (d27) → bàn và con dấu (d30). Bình xịt mở vòng ở d01 và đóng ở d33 (lên kệ, có thẻ tên). |
| T5 | 2 | Gag nào cũng đọc được trong 1 s: Wob nảy (d01), ép dẹt (d03), thuyền nghiêng (d04), xe hết đảo nhưng kim xăng đầy (d06), kéo co, mèo (d07), ô → phao vịt → ghế nhựa (d08), xẻng gập, cúc áo (d09), vợt gác muỗi (d10), disco (d11), bảng dĩa nĩa, đầu trọc (d14), bốn biển số chen nhau (d16), khói thành dấu hỏi (d17), mùi hình cá (d19), cột mũ đuổi cột cá (d20), mũ phù thuỷ, tắm cốc (d21), ắc quy có mắt (d22), nước biển có mắt (d25), cần cẩu (d31), muỗi ngồi trên tem (d32). Gag yếu: bóng rơi trúng mũ (d02, nhìn từ trên cao quá nhỏ); Wob gật đầu (d12, không thấy). |
| T6 | 2 | Đổi phong cách đúng bảng phân cảnh. Màu mũ mới (vành rơm, dải xanh ngọc) và ba lô ô liu có cuộn thảm đỏ khớp giữa cả ba phong cách (d02/d03, d08/d09, d27/d28/d29). |
| T7 | 1 | Trừ 1 vì: (1) võng sọc xanh ngọc–trắng ở d24 thành võng cam ở d25; (2) d15 có **hai bình xịt** cùng lúc, Wob ôm một cái và một cái vẫn cắm túi hông ba lô (soi `d15-crop3.png`, 2,5 s; còn thấy ở 6,8 s); (3) bấm đếm tròn có kim ở d16/d18 thành hộp chữ nhật ở d17. Phần còn lại liền: mũ bỏ ra, đội lại đúng mốc (d14/d15/d16, d21); ba lô ướt (d04), mất (d25), ẩm (d27–d29), rơi sau bàn (d32), dưới chân bàn (d33). |
| T8 | 2 | Con dấu NOPE to giữa khung, đỏ, khung đôi, đúng một lần (d30, 12,5 s). Câu hỏi cuối có hình (cầu tàu, phao vịt, d32). Đuôi: hai khung và vòng tròn trống đúng toạ độ (y 152–480 / 500–808, tâm 1452, 920 hệ 1920), đứng yên từ 1,2 s, không chữ ở x > 1150, y > 560. Đứng hình toàn khung ở d33 tính vào điểm đoạn, không vào T8. |

## Từng đoạn

D1 đọc không lời · D2 hình nói thêm · D3 gag · D4 Wob diễn · D5 camera · D6 một lúc một điều · D7 chữ · D8 liên tục · D9 nối · D10 luật kênh.

| Đoạn | Phong cách | D1..D10 | Tổng | Kết luận | Bằng chứng, việc cần sửa |
|---|---|---|---|---|---|
| d01 | diorama | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Hộ chiếu hai dòng, cỡ chữ ≈ 60 px (11,6 s). Chấm tay che đáy nhãn bình xịt ở khung 0: không ảnh hưởng hình muỗi gạch chéo, chấp nhận. |
| d02 | cat-giay | 2 2 1 2 2 2 2 2 2 2 | 19 | ĐẠT | Hai sân bóng úp kín đảo, thẻ ≥ 45 px (12,4 s). Bình xịt thấy ở túi hông (14,6 s). Nên: gag bóng rơi trúng mũ (12,4–13,0 s) quá nhỏ ở góc từ trên cao. Phóng bóng to ×2, hoặc đẩy camera vào thuyền 0,8 s khi bóng chạm mũ. |
| d03 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Ép dẹt (0,9 s), mắt đảo theo muỗi (4,4 s), muỗi xách va li (5,6 s). |
| d04 | cat-giay | 2 2 2 2 2 2 1 2 1 2 | 18 | **SỬA NHỎ** | **(a) D7:** dời thẻ `45 min–1 h` (20,6–25,5 s) từ cạnh nhãn Cartagena xuống sát giữa nét đứt Tolú → đảo, dưới nhãn Santa Cruz del Islote. Thẻ `~2 h by boat` đặt đúng (10,8 s). **(b) D9:** nối ra là `cat` nhưng 3 khung cuối (25,63–25,73 s) là giấy phẳng. Bỏ phần phủ giấy, giữ cảnh tới khung cuối. Thuyền nghiêng (4,0 s), trèo lên ba lô (5,6 s), ba lô vắt đùi che mặt (15,5 s, đúng ý "đè lút") đều đạt. |
| d05 | cat-giay | 2 2 2 2 1 2 2 2 2 2 | 19 | ĐẠT | Bút chì (1,5–3,0 s), thẻ 120 houses rất rõ (9,9 s), SCHOOL ≥ 45 px. Nên: nhịp `wob-be-ti` (15,5 s) chưa có cận thánh giá và Wob chưa ngước nhìn. |
| d06 | ve-tay | 2 2 2 1 2 2 2 2 2 2 | 19 | ĐẠT | Xe lao khỏi đảo (2,2–3,2 s); cận đồng hồ xăng không chữ, kim đầy (4,5 s). |
| d07 | cat-giay | 1 2 2 2 2 2 2 2 2 2 | 19 | ĐẠT | Đi vòng từ trên cao (5,8 s), đồng hồ không số (7,6 s), kéo co (15,9 s), cậu bé (20,5 s), mèo cận (34,3 s). Nên: tranh cá trên tường cam nằm đúng đỉnh mũ Wob (26–33 s), đọc thành "cá trên đầu". Dời tranh lên cao ≈ 120 px hoặc sang trái. |
| d08 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Ô (1,0 s) → phao vịt (2,0 s) → ghế nhựa (3,0 s), BRING LESS to; giận ba lô (3,6 s). |
| d09 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Sơ đồ có Wob chạy theo nét đứt (8,0 s), xẻng gập vuông (14,8 s), cúc áo không tia sáng, kéo mũ (20,0 s). Sơ đồ thiếu dấu X (không trừ điểm). |
| d10 | cat-giay | 2 1 2 2 2 2 2 2 2 2 | 19 | ĐẠT | Trang sepia, Wob ở mép trang; gag vợt rồi ngủ gật (18,1–23,7 s). Nên: "wait out storms" (10–14 s) chưa có mây bão, Wob chưa kéo vành mũ. Thêm một đám mây tối trôi ngang trang. |
| d11 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Wob ló sau cành đước dưới đèn disco, muỗi tháo mũ tiệc (14,4 s). |
| d12 | cat-giay | 2 2 1 1 2 2 2 2 2 2 | 18 | ĐẠT | Wob đếm nấc bằng ngón tay (6,2 s); khớp hình từ sepia sang màu (10,9 → 14,6 s). Nên: người đắp đảo quá nhỏ ở xa (4,9–8,2 s). Cú gật đầu sau cảnh từ trên cao (22,2 s) không thấy vì Wob không có trong khung: thêm 0,6 s trung cảnh Wob gật đầu trước khi phủ giấy. |
| d13 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Tiền cảnh mái tối, Wob chìa tay, lưỡi câu buộc ngón tay (7,5 s). Bình xịt ở túi hông. |
| d14 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Thực đơn hình (0,4 s), bảng dĩa nĩa (7,9 s), đầu trọc lấp lánh (12,7 s). |
| d15 | cat-giay | 2 2 2 2 2 2 2 1 2 2 | 19 | ĐẠT | Nên sửa cùng lượt (liên tục kỷ vật): có hai bình xịt, một trong tay Wob và một ở túi hông ba lô (2,5 s, `d15-crop3.png`; 6,8 s). Ẩn bình xịt ở túi hông cả đoạn. Wob ngủ quay lưng ra máy (2,5 s): chấp nhận. |
| d16 | cat-giay | 2 2 2 2 2 2 2 2 2 1 | 19 | ĐẠT | Bốn biển ≥ 45 px, dưới y 150, không chồng chữ (20,8 s). Nên (D10): bỏ hoặc dời người ngồi ghế trắng giữa khung lúc 7,7–11,8 s (câu CNN). |
| d17 | ve-tay | 2 2 2 2 2 2 2 1 2 2 | 19 | ĐẠT | Hũ kẹo, phiếu dấu hỏi, khói thành dấu hỏi (10,8 s). Nên (D8): vẽ bấm đếm tròn, mặt kim, không số, như d16 và d18. |
| d18 | cat-giay | 2 2 2 2 1 2 2 2 2 2 | 19 | ĐẠT | Bóng thoại hình vẽ, ba lô ướm vào lối (9,6 s), Wob giơ ba lô cho trẻ con chạy qua (13,3 s). Lối nhìn thẳng mặt tiền: chấp nhận, vì khe lối vẫn có chiều sâu ở giữa khung. |
| d19 | cat-giay | 1 2 2 2 2 2 2 2 2 2 | 19 | ĐẠT | Radio, mùi hình cá (10,0 s). Nên: cận "my spray was still sealed" (15,2 s) đang ngắm vào ba lô, bình xịt chỉ chiếm ≈ 1/12 khung và bị túi che. Ngắm vào bình xịt, tem chiếm ≥ 1/4 khung. |
| d20 | cat-giay | 2 2 2 2 1 2 2 2 2 2 | 19 | ĐẠT | Cột mũ đuổi cột cá (11,4 s), khăn tắm, thuyền Hải quân, chuyền can (21,6 s). Wob bị cắt nửa ở mép phải 0–1,5 s (camera đang lướt về Wob): chấp nhận. |
| d21 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Mũ phù thuỷ, cốc nước đọng giọt, sơ đồ nét mờ có Wob cầm bút, tắm cốc, mũ treo móc. |
| d22 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Tem `2021` cận và to (3,3 s); ắc quy có mắt (16,0 s). |
| d23 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Khách đội mũ trắng, khác mũ cói dải xanh ngọc của Wob. Que kem (5,0–13,0 s), sổ kín thuyền (20,2 s), đảo lên đèn (23,6 s). |
| d24 | cat-giay | 2 2 2 1 2 2 2 2 2 2 | 19 | ĐẠT | Võng sọc xanh ngọc–trắng; Wob lật qua võng (4,3 s). Nên: Wob đang ngủ mà mắt mở nhìn máy (6,0–9,8 s); đổi sang mắt nhắm. |
| d25 | ve-tay | 2 2 2 2 2 2 2 0 2 2 | 18 | **LÀM LẠI** | **D8 = 0:** võng cam có dây vàng, trong khi d24 ngay trước (cắt cứng) là võng sọc xanh ngọc–trắng. Vẽ lại võng sọc xanh ngọc #2A9D8F–trắng, cùng dáng, rồi render lại. Giữ nguyên mọi thứ còn lại: take thức dậy (0,35 s), nước có mắt (2,0 s), ba lô trôi (12,4–19,4 s), khung chặt, cửa khép. |
| d26 | diorama | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Ba nhãn ≥ 45 px ở cận trang: `~2 m · ~6.5 ft` (15 s), `~45% · 2014` (22 s), `up to ~30 cm · ~1 ft / 2050` (32,5 s); bồn tắm (39,4 s). Wob trầm suốt đoạn. Trang chiếm ≈ 62% khung: đạt ngưỡng ≥ 60%. |
| d27 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Đo đảo giữa hai ngón tay (9,1 s). |
| d28 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Thuyền giấy rơi ở câu khách sạn (7,9–8,6 s); câu đi học sạch, thuyền chở cặp (13,5 s); cắt về mặt Wob; cây phả hệ ô cửa (28,1 s). Biểu tượng "mũ khách" dải đỏ, khác dải xanh ngọc của Wob: chấp nhận. |
| d29 | cat-giay | 1 2 2 2 2 2 2 2 2 2 | 19 | ĐẠT | Wob mắt sụp, sổ che miệng, không cười; nét đứt sang đảo khác (5,5 s). Nên: hoa giấy (7,8 s) chỉ ≈ 20 px. Cận tay Wob đặt hoa, hoa ≥ 80 px. |
| d30 | diorama | 2 2 2 2 2 1 2 2 2 2 | 19 | ĐẠT | Con dấu NOPE giữa khung (12,5 s); ba lô nhấc khỏi hình đảo (14,6 s); pop-up có thuyền chở bồn nước (25,2 s). Nên: tiếng gõ thứ ba rơi sát chỗ cắt (≈ 25,1 s). Cho gõ từ chữ "sea" (≈ 24,1 s). |
| d31 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Hai nửa hiện lần lượt (0,35 / 2,6 s); tung túi cỡ hộp cơm ở quảng trường. |
| d32 | diorama | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Ba lô bị đẩy khỏi bàn ở "one small bag" (1,3 s), muỗi vắt chân trên tem (10,0 s), cầu tàu và phao vịt (13,8 s). Ba lô rơi ra khỏi khung là đúng ý. |
| d33 | diorama | 2 2 2 1 1 2 1 2 2 2 | 17 | **SỬA NHỎ** | **(a) D4/D5:** `kiem_dong_hinh` báo đứng hình **toàn khung** 2,1–5,2 / 8,9–14,0 / 15,6–20,0 s (chỉ 16,5% số khung có chuyển động). Vùng end screen phải đứng yên, nhưng Wob ở nửa trái phải "đứng thở" (theo skill): thêm vòng thở, chớp mắt 3–4 s một lần, nhún nhẹ, chỉ ở x < 1100. **(b) D7:** chấm lỗ treo dính sát chữ nên đọc thành `.OYMYAKON`, `.WHITTIER` (`soi/d33-tags.png`). Lùi chữ sang phải ≥ 24 px hoặc bỏ chấm. Phần còn lại đạt: kỷ vật 3 tập đúng, thẻ ≥ 45 px, ghim không nhãn, không mặt trời, khung và vòng đúng toạ độ, ba lô khổng lồ dưới chân bàn. |

## Việc sửa theo phong cách

**Bắt buộc** (LÀM LẠI, SỬA NHỎ) phải xong trước khi ghép. **Nên** là việc rẻ, cùng thợ, nên làm cùng lượt; không làm thì ghi lý do.

- **dung-cat-giay, nhóm A (d02 d04 d05 d07 d10 d12 d13 d15):**
  - **Bắt buộc d04:** dời thẻ `45 min–1 h` xuống cạnh nét đứt Tolú (20,6–25,5 s); bỏ 3 khung giấy phẳng cuối (25,63–25,73 s).
  - Nên d15: ẩn bình xịt ở túi hông cả đoạn (đang có hai bình xịt).
  - Nên d07: dời tranh cá khỏi đỉnh mũ (26–33 s).
  - Nên d12: thêm 0,6 s Wob gật đầu sau cảnh từ trên cao (≈ 22,2 s).
  - Nên d10: thêm mây bão trôi ngang trang và Wob kéo vành mũ (10–14 s).
  - Nên d02: phóng to bóng hoặc đẩy camera vào thuyền lúc bóng chạm mũ (12,4–13,0 s).
  - Nên d05: cận thánh giá, Wob ngước nhìn (15–17 s).
  - d13: không có việc.
- **dung-cat-giay, nhóm B (d16 d18 d19 d20 d22 d23 d24 d27 d29):** không có việc bắt buộc.
  - Nên d16: bỏ hoặc dời người ngồi ghế giữa khung lúc 7,7–11,8 s (câu CNN).
  - Nên d19: cận bình xịt, tem ≥ 1/4 khung (15,0–16,4 s).
  - Nên d24: Wob nhắm mắt khi ngủ (6,0–9,8 s).
  - Nên d29: cận tay Wob đặt hoa, hoa ≥ 80 px (≈ 7,5 s).
  - d18, d20, d22, d23, d27: không có việc (d18 lối nhìn thẳng, d20 Wob ở mép: chấp nhận).
- **dung-ve-tay:**
  - **LÀM LẠI d25:** võng sọc xanh ngọc #2A9D8F–trắng như d24, giữ nguyên biên đạo.
  - Nên d17: bấm đếm tròn, mặt kim, như d16 và d18.
- **dung-diorama:**
  - **Bắt buộc d33:** Wob thở, chớp mắt suốt đoạn ở x < 1100, vùng end screen vẫn đứng yên; lùi chữ trên thẻ `OYMYAKON` / `WHITTIER` khỏi chấm lỗ treo.
  - Nên d30: bắt đầu gõ từ chữ "sea".
- **Đạo diễn:** không có việc. **Biên kịch:** T1 như ở 5a (câu hỏi ở 39 s).

## Ghi chú cho phiên chính
- Logo góc phải trên sẽ được đóng lúc ghép. Đã soát: không đoạn nào có chữ ở x > 1500, y < 150. Gần nhất là biển `580 · Census 2005` ở d16 (mép trên ≈ y 170) và khung end screen 1 ở d33 (mép trên ≈ y 152); không cần `an_logo`.
- Sau khi sửa, chạy lại `kiem_dong_hinh.py` cho d33. Đứng hình được chấp nhận ở vùng x ≥ 1150, còn toàn khung thì không. Nếu công cụ vẫn báo vì vùng phải đứng yên quá rộng, ghi lý do vào `nhat-ky.md`.
