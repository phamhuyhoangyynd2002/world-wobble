# Tiêu chí duyệt phân cảnh và hình (từng đoạn + tổng thể)

> Chốt 19/11/2026 (người làm kênh): trước khi chuyển bước phải có **review từng cảnh một và review tổng thể**. Tập 1 Oymyakon dựng xong 40 đoạn mà chưa ai chấm bảng phân cảnh, chỉ có kiểm cấu trúc (`chuan_bi_doan.py`) và thợ dựng tự xem khung của mình. File này là bộ tiêu chí chung cho hai lần duyệt:
>
> - **Duyệt phân cảnh** (cổng 5a, trước khi giao thợ dựng): chấm `hoat-hinh/phan-canh.json` bằng chữ. Rẻ nhất để sửa.
> - **Duyệt hình** (cổng 6a, sau khi dựng các đoạn, trước khi ghép bản cuối và kiểm định): chấm tờ khung `hoat-hinh/duyet/to-khung/<id>.jpg` (`to_khung.py`) đặt cạnh ý định trong bảng phân cảnh.
>
> Người duyệt là agent `duyet-phan-canh`, độc lập với đạo diễn và thợ dựng: không sửa `phan-canh.json`, `canh.js`, chỉ chấm và ghi việc cần sửa.

## 1. Chấm từng đoạn (D1–D10)

Mỗi tiêu chí cho **0** (hỏng), **1** (tạm), **2** (tốt). Ghi bằng chứng: số nhịp hoặc số ô trên tờ khung, mốc giây.

| # | Tiêu chí | Hỏi gì | Lỗi điển hình |
|---|---|---|---|
| D1 | **Đọc được không cần lời** | Tắt tiếng, chỉ nhìn tờ khung: hiểu chuyện gì đang xảy ra? | Hình chung chung, đổi lời cũng không cần đổi hình |
| D2 | **Hình nói thêm điều lời không nói** | Có ít nhất một thông tin hay câu đùa mà chỉ hình kể? | Minh hoạ y nguyên lời (nói "cá" vẽ cá) suốt đoạn |
| D3 | **Gag** | Đoạn hồi ức có ≥ 1 gag bằng hình đọc được trong 1 giây; có lấy đà, giữ punchline 0,6–1 s (`NGU-PHAP-CAMERA.md` mục 1–2). Đoạn `lich-su-nghiem`: KHÔNG gag (gag ở đây là lỗi nặng) | Gag nằm ở góc nhỏ, chồng lên điều khác, chỉ kéo dài vài khung |
| D4 | **Wob diễn** | Wob trong cảnh và làm một việc cụ thể ở hầu hết nhịp; biểu cảm khớp lời; phản ứng rơi 0–3 khung trước chữ | Wob đứng nhìn, chỉ đổi mặt; Wob khuất hơn 2 ô liền |
| D5 | **Camera và cỡ cảnh** | Thẻ camera đúng ngữ pháp (đẩy chậm khi giữ, lướt smootherstep, lao khi nhấn); cỡ cảnh đổi theo ý (toàn → trung → cận); có vật tiền cảnh khoảng 1/3 shot | Cùng một cỡ cảnh suốt đoạn; camera đi không có lý do; đứng hình |
| D6 | **Một lúc một điều** | Mỗi nhịp người xem có thời gian tìm, hiểu, đọng; nguyên nhân trước phản ứng | Ba sự kiện chồng trong một giây; chữ hiện và tắt trước khi đọc kịp |
| D7 | **Chữ và số trên đồ vật** | Chỉ chữ trong `chu_tren_do_vat`; ≥ 40 px ở khung 1080; không bị che, cắt mép, tràn khung đồ vật; nhiệt độ đủ °C và °F; mức C giữ dấu dè dặt (≈, ?) | Khói che biển tên; chữ tràn nhiệt kế; chữ bị cắt khi camera đẩy vào |
| D8 | **Liên tục** | Trang phục, đồ cầm, màu (mũ, khăn), lông mi, mùa khớp đoạn trước và sau; hướng nhìn và vị trí hợp lý qua chỗ nối | Mũ đổi màu giữa hai phong cách; cá biến mất; đồ cầm đổi tay |
| D9 | **Chỗ nối vào/ra** | Đúng kiểu nối (`HOP-DONG.md` mục 5): `giay` ra/vào giấy phẳng `#EFE3C8`; `cat` khung đầu đã đầy đủ; không khung đen, khung trống | Khung đầu trống vài khung; nối giấy còn sót hình |
| D10 | **Luật kênh** | Không đùa về người dân; người dân vẽ dạng chung, tôn trọng; không người thật cụ thể; không bản đồ thật do AI vẽ; 20 giây cuối không chữ ở vùng x > 1150, y > 560; nhảy mùa rõ bằng hình | Vẽ mặt người thật; chữ trong góc end screen |

**Kết luận đoạn:**
- **ĐẠT**: không tiêu chí nào 0, tổng ≥ 15/20.
- **SỬA NHỎ**: không tiêu chí nào 0, tổng 12–14; hoặc một lỗi D7/D9 sửa được trong `canh.js` không đổi biên đạo.
- **LÀM LẠI**: có tiêu chí 0, hoặc tổng < 12. Với duyệt phân cảnh: đạo diễn viết lại đoạn đó. Với duyệt hình: thợ dựng của phong cách đó dựng lại.
- **Lỗi nặng** (một cái là LÀM LẠI, bất kể điểm): gag trong đoạn lịch sử nghiêm; đùa về người dân; chữ, số ngoài `chu_tren_do_vat` hay sai so với `claims`; người thật nhận ra được; chữ trong vùng end screen ở 20 giây cuối.

## 2. Chấm tổng thể (T1–T8)

Đọc cả bảng phân cảnh (hoặc tờ `_tong-the.jpg` + mọi tờ khung) theo thứ tự thời gian. Mỗi câu 0/1/2, kèm mốc.

| # | Tiêu chí | Hỏi gì |
|---|---|---|
| T1 | **10 giây đầu, 30 giây đầu** | Khung 0 đã có Wob và kỷ vật; người xem biết câu hỏi của tập trước 10 s; có lý do ở lại qua 30 s |
| T2 | **Nhịp giữ chân** | Mỗi 60–90 s có một mồi mới (gag lớn, Wob đổi ý, kỷ vật mới, cắt về hiện tại, đổi mùa); không đoạn nào > 90 s chỉ giải thích. Ghi danh sách mốc mồi và khoảng trống dài nhất |
| T3 | **Đa dạng hình** | Không chuỗi > 90 s cùng phong cách; cỡ cảnh, thẻ cảnh không lặp (thẻ nào > 20% số nhịp có thẻ là lỗi); ánh sáng, màu đổi theo nhịp kể |
| T4 | **Mạch hành trình** | Đọc riêng các khung đầu chương vẫn thấy một chuyến đi (tới nơi → các hoạt động → về); hai lớp hiện tại và hồi ức rõ ràng; kỷ vật mở và đóng vòng |
| T5 | **Cung hài** | Liệt kê mọi gag kèm mốc; đoạn khô dài nhất (s); gag nào lặp lại cùng kiểu quá 2 lần; chỗ nghiêm (lịch sử) có đủ khoảng lặng trước và sau |
| T6 | **Phối phong cách** | Tỉ lệ trong khoảng mục tiêu (`docs/phong-cach-hoat-hinh-3-huong-2026-11-16.md`); mỗi lần đổi phong cách có lý do kể chuyện; không đổi > 2 lần trong 15 s |
| T7 | **Liên tục toàn tập** | Một dòng thời gian trang phục, đồ cầm, mùa từ đầu tới cuối; không chỗ nào nhảy |
| T8 | **Cái kết** | Con dấu đúng một lần, đúng nhãn, rõ, có chữ ký âm thanh; câu hỏi cuối có hình; kết đúng chữ cuối, không im lặng; góc end screen trống |

**Kết luận tổng thể:** ĐẠT khi không câu nào 0 và tổng ≥ 12/16. Có câu 0 thì ghi đoạn nào gây ra và cách sửa (thường là sửa vài đoạn, không viết lại cả bảng).

## 3. Cổng và vòng sửa

| Cổng | Khi nào | Đạt khi | Không đạt |
|---|---|---|---|
| **5a Duyệt phân cảnh** | Sau khi đạo diễn viết `phan-canh.json`, trước khi giao thợ dựng | Tổng thể ĐẠT; không đoạn LÀM LẠI | Gửi `hoat-hinh/duyet/duyet-phan-canh.md` cho đạo diễn sửa đúng các đoạn đó, duyệt lại các đoạn đã sửa + tổng thể. Tối đa 3 vòng; quá thì giao tiếp kèm danh sách lỗi và ghi `nhat-ky.md` |
| **6a Duyệt hình** | Sau khi dựng đủ đoạn (chạy `to_khung.py`), trước ghép bản cuối, kiểm định, phản biện | Tổng thể ĐẠT; không đoạn LÀM LẠI; mọi SỬA NHỎ đã sửa hoặc ghi lý do bỏ qua | Gom lỗi theo phong cách, giao lại thợ dựng của đúng phong cách (`/dung-hoat-hinh <dự án> --doan <id>`), chạy lại `to_khung.py --doan` cho đoạn đã sửa, duyệt lại. Tối đa 3 vòng |

Duyệt hình không thay kiểm định (`kiem-dinh-video`) và phản biện (`phan-bien-video`): hai agent đó vẫn chạy trên video đã ghép, nhìn bằng mắt người xem cả video và kiểm kỹ thuật, bản quyền.

## 4. Đầu ra

`hoat-hinh/duyet/duyet-phan-canh.md` (cổng 5a) hoặc `hoat-hinh/duyet/duyet-hinh.md` (cổng 6a), cùng khung:

```markdown
# Duyệt <phân cảnh | hình>: <tập> · vòng <N>
## Kết luận tổng thể: ĐẠT | KHÔNG ĐẠT  (T: x/16)
| T | Điểm | Nhận xét, mốc |
## Từng đoạn
| Đoạn | Phong cách | D1..D10 | Tổng | Kết luận | Việc cần sửa (cụ thể: nhịp/ô, sửa thế nào) |
## Danh sách sửa theo người làm
- Đạo diễn / dung-cat-giay / dung-ve-tay / dung-diorama: <id>: <việc>
```

Kèm `duyet-<...>.json` cùng nội dung dạng máy đọc (`{"vong", "tong_the": {...}, "doan": [{"id", "diem": {"D1":..}, "tong", "ket_luan", "viec"}]}`) để vòng sau so tiến bộ.
