# Báo cáo: làm lại tập 2 (Coober Pedy) theo định hướng hoạt hình

> Ngày 16/11/2026. Viết sau khi chốt định hướng "Wob kể chuyến đi" ([dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md](dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md)).
> Căn cứ: [ke-hoach-dot-ra-mat-5-tap-2026-11-16.md](ke-hoach-dot-ra-mat-5-tap-2026-11-16.md) mục 3 tập 2; `projects/2026-11-16-coober-pedy/brief.md`, `nhat-ky.md`; nhật ký tập 1.
> **Mọi chi tiết về Coober Pedy trong file này là giả thuyết, CHƯA KIỂM CHỨNG.** Tập 2 chưa có `research.md`. Chi tiết nào ghi *(C?)* là Claude biết có nhiều con số hoặc cách hiểu khác nhau.

## Tóm tắt

- **Tập 2 chưa mất gì.** Mới có `brief.md`; agent nghiên cứu bị dừng giữa chừng, chưa ghi `research.md`, chưa có kịch bản, tài nguyên, giọng. Làm lại gần như là làm từ đầu theo khuôn mới, không phải sửa.
- **Giữ:** đề tài, câu hỏi trung tâm, lập luận (opal → thợ mỏ biết đào → nhà dưới đất mát và rẻ), phán quyết dự kiến WOULD MOVE, các lưu ý về người bản địa.
- **Đổi:** người kể (kênh → Wob ngôi thứ nhất), xương sống (chương theo ý → chương theo **hoạt động có thật** Wob làm ở đó), hình (bản đồ + ảnh + thẻ số → hoạt hình cắt giấy, không ảnh thật), chữ (chữ to giữa màn hình → số liệu nằm trên đồ vật), câu mở, có thể cả tiêu đề.
- **Tin tốt riêng của tập này:** cảnh Coober Pedy (sa mạc phẳng, hàng nghìn đống đất đào hình nón, biển cảnh báo, cửa hầm khoét vào đồi) **rất dễ vẽ bằng code**. Có thể giảm số ảnh AI phông nền xuống còn khoảng 6–8 thay vì 12–15, đỡ đúng điểm nghẽn lớn nhất của định hướng mới (lượt ảnh miễn phí).
- **Phụ thuộc:** dựng hình phải chờ bản thử ~75 giây của tập 1 chốt thư viện và template `hoat-hinh`. Riêng bước nghiên cứu thì **làm trước được ngay**, chỉ cần thêm mục "Hoạt động và trải nghiệm".

## 1. Trạng thái hiện tại

| Hạng mục | Trạng thái |
|---|---|
| `brief.md` (cổng 0) | Có, viết theo khuôn cũ (template `explainer`, thông điệp ngôi thứ ba) |
| `research.md` | Chưa có (agent dừng giữa chừng theo yêu cầu người làm kênh) |
| `tom-tat-duyet.md`, kịch bản, kiểm chứng, tài nguyên, giọng, render | Chưa có |
| Khung chương trong kế hoạch 5 tập | Có, nhưng theo kiểu trình chiếu cũ (chương là câu hỏi, Wob chỉ đổi biểu cảm) |

## 2. Giữ gì, đổi gì

| Mục | Bản cũ (kế hoạch 16/11) | Bản mới |
|---|---|---|
| Câu hỏi trung tâm | Why do people live in Coober Pedy? | Giữ |
| Lập luận | Opal → kỹ năng đào → nhà dưới đất | Giữ, nhưng **lộ dần qua các hoạt động**, không giảng theo chương |
| Người kể | Kênh, Wob là nhân vật | **Wob tự kể** (giọng Andrew), Wob trong hồi ức chỉ líu lo + bong bóng thoại |
| Khung | 7 chương câu hỏi → phát hiện | Mở ở bàn kỷ vật → lên đường → 5 hoạt động → về nhà, đóng dấu |
| Hình | Bản đồ code + ảnh Commons + ảnh AI + thẻ số liệu, Wob góc trái dưới | Phông risograph tách lớp + đạo cụ SVG, Wob đi lại và làm việc trong cảnh; **không ảnh thật** |
| Số liệu trên hình | Thẻ số, chữ to giữa màn hình | Trên đồ vật: nhiệt kế, biển báo, nhãn lọ opal, trang sổ viết tay |
| Bản đồ | Bản đồ Úc có ghim | Trang sổ: đường đi nét đứt Adelaide → Coober Pedy, xe chạy theo đường (vẫn D3 + Natural Earth) |
| Câu mở | Tiếng cuốc đào, "The first house in this town wasn't built. It was dug." | Giữ ý âm thanh, chuyển sang ngôi thứ nhất (mục 4) |
| Phán quyết | WOULD MOVE (nếu được ở dưới đất) | Giữ dự kiến, chốt sau nghiên cứu |
| Câu kết | "Would you trade your windows for a room that's always twenty-four degrees?" | Giữ ý, con số phải kiểm chứng |

## 3. Mạch hành trình đề xuất

Mỗi chương là một việc Wob làm hoặc tận mắt thấy. Thứ tự chuyến đi được hư cấu; mọi thứ Wob "thấy" là khẳng định phải có nguồn.

| # | Phần | Hoạt động (giả thuyết, cần kiểm chứng) | Mảnh "vì sao" | Gag bằng hình | Kỷ vật |
|---|---|---|---|---|---|
| 0 | Mở, ≤ 10 giây | Wob ở bàn, lắc một lọ nhỏ đựng mảnh opal | Câu hỏi: vì sao cả thị trấn sống trong lòng đất? | Lọ opal lấp lánh, Wob giơ lên soi, lọ trống trơn ở mặt kia | Lọ opal |
| 1 | Lên đường | Đường dài qua sa mạc từ Adelaide *(khoảng cách cần kiểm)*; tới nơi thấy đồi đầy đống đất hình nón | Nơi này xa và trơ trọi thế nào | Trên trang sổ, xe của Wob chạy mãi, cảnh nền lặp y hệt ba lần | Vé xe |
| 2 | Đi "noodling" | Bới tìm opal trong đống đất thải ở khu công cộng *(cần kiểm khu nào cho phép)*; chuyện phát hiện opal năm 1915 *(cần nguồn)* | Thị trấn sinh ra từ opal; vì sao opal lại ở đây (biển nội địa cổ, *cần nguồn địa chất*) | Wob đào cả buổi chỉ được sỏi; hòn đá Wob vứt đi thì lấp lánh sau lưng | Mảnh opal |
| 3 | Một trưa hè trên mặt đất | Nắng mùa hè thường trên 40°C *(C?)*; ruồi | Vì sao không sống trên mặt đất | Wob `nong-chay` chảy dần như kem; một con ruồi bám theo mọi cảnh từ đây về sau | Nhiệt kế |
| 4 | Ngủ một đêm dưới đất | Nhà, khách sạn, nhà thờ dưới đất; nhiệt độ quanh năm khoảng 23–25°C *(C?)* | Đào rẻ và mát hơn xây + điều hoà; thợ mỏ sẵn kỹ năng và máy | Wob bước qua cửa hầm, từ chảy nhão bật lại tròn; định đào thêm phòng bằng cái thìa | Chìa khoá phòng |
| 5 | Đi bộ ngoài thị trấn | Hàng nghìn giếng mỏ bỏ hoang, biển cảnh báo *(cần nguồn)*; nước sinh hoạt lấy từ đâu *(cần nguồn)* | Cái giá phải trả | Biển báo đi lùi; Wob đọc biển, đi lùi, suýt rơi xuống giếng, ba lô quá to mắc lại ở miệng giếng | Biển báo mini |
| 6 | Ra Breakaways lúc chiều tối | Vùng đất của người Antakirinja Matu-Yankunytjatjara, công viên đồng quản lý *(cần nguồn)*; tên "kupa piti" và cách dịch phổ biến *(C?)* | Trước thợ mỏ là ai; đất này có chủ từ lâu | **Không gag** ở đoạn nói về người bản địa; Wob ngồi yên ngắm đồi | Tấm bưu thiếp vẽ tay |
| 7 | Về nhà | Wob xếp kỷ vật, ghép các mảnh | Opal kéo người tới, cái nóng đẩy họ xuống đất, kỹ năng đào làm việc đó thành rẻ | Con ruồi vẫn bám theo về tận bàn | Con dấu lên trang sổ |

Chất liệu dự phòng nếu nghiên cứu xác nhận được (thay một hoạt động nếu yếu): sân golf không có cỏ, chơi về đêm hoặc mùa mát *(C?, có giai thoại hay được nhắc về quyền chơi qua lại với một sân golf nổi tiếng, phải tìm nguồn gốc)*; rạp chiếu phim ngoài trời; xe hút đất ("blower") của thợ mỏ.

Mồi lại sự chú ý mỗi 60–90 giây bằng: kỷ vật mới, Wob gặp nạn, cắt về bàn ở hiện tại, con ruồi.

## 4. Câu mở và tiêu đề

- **Câu mở (nháp, tiếng Anh):** tiếng cuốc đào trong bóng tối, rồi đèn bật, Wob ở bàn: "The first night, I slept in a hole. I paid for the hole." Không lặp kiểu "On purpose." của bản thử tập 1.
- **Tiêu đề:** giữ "The Australian Town That Moved Underground" (dựa vào tên nơi và nghịch lý, đúng luật kênh). Phương án theo kiểu kể chuyện: "I Slept Underground in the Outback. A Whole Town Does." Quyết sau khi có bản thử và đo lại.
- **Thumbnail:** mặt cắt ngọn đồi, nửa trên Wob đang chảy, nửa dưới Wob tròn trịa trong phòng mát; chữ "24°C DOWN HERE" *(số cần kiểm)*.

## 5. Hình, đạo cụ, âm thanh

**Phông nền** (bảng "Mực & giấy" 4 màu, hợp sẵn với sa mạc: đất nung, cát giấy):

| Phông | Cách làm |
|---|---|
| Đồi đống đất hình nón, sa mạc phẳng, đường chân trời | **Vẽ bằng code** (lặp hình nón, hạt in, lệch màu) |
| Biển cảnh báo, miệng giếng, cửa hầm | **Vẽ bằng code** |
| Trang sổ bản đồ | D3 + Natural Earth như cũ; Úc không chạm vùng Biển Đông |
| Phòng dưới đất (vách đá khoét có vân), nhà thờ dưới đất, phố chính, đồi Breakaways lúc chiều tối, khu bới opal | **Ảnh AI risograph** tách lớp, khoảng 6–8 ảnh; prompt phải tả đúng kiến trúc khoét đá, không ra nhà kiểu châu Âu (bài học ảnh thử tập 1) |

**Đạo cụ SVG mới** (đưa vào thư viện dùng lại): cuốc, sàng, mảnh opal, lọ nhỏ, biển báo, nhiệt kế (dùng chung tập 1), xe hút đất, chìa khoá, con ruồi, bưu thiếp. Wob dùng biểu cảm có sẵn `nong-chay`, `hao-hung`, `soc`, `ngam-nghi`.

**Âm thanh:** dùng lại `xuoc-dia`, `may-no`, `bonk`, `ting`, `drop`, `liu-lo-*`. Cần tổng hợp thêm (bằng `sfx/nguon/tao_sfx.py`, ghi sổ): tiếng cuốc vào đất, ruồi vo ve, máy hút đất, tiếng vang trong hầm. Nhạc: bộ "tò mò" + "hài", không dùng bộ "khắc nghiệt" của tập 1 để hai tập nghe khác nhau.

## 6. Luật trung thực áp riêng cho tập này

- **Mùa:** cái nóng trên 40°C là mùa hè; nếu dùng sân golf thì đó là chuyện mùa mát hoặc ban đêm. Không kể chung "một tuần"; nhảy mùa phải nói rõ.
- **Không bịa người thật:** không "a miner told me", không đặt tên thợ mỏ. Thợ mỏ, dân thị trấn chỉ vẽ dạng chung, không nói thay họ.
- **Người Antakirinja Matu-Yankunytjatjara:** gọi đúng tên, nói theo nguồn của cộng đồng hoặc học thuật, không vẽ nhân vật bản địa kiểu biếm hoạ, không gag ở đoạn này. "Kupa piti" phải nói là cách dịch phổ biến, mức C nếu nguồn lệch.
- **Phim:** không dùng hình, nhân vật, âm nhạc của phim từng quay ở đây (Mad Max…), cả ở dạng vẽ lại.
- **An toàn:** đoạn giếng mỏ là lời cảnh báo, không khuyến khích đi vào khu mỏ.

## 7. Quy trình làm lại

| Bước | Việc | Chờ gì |
|---|---|---|
| 1 | Sửa `brief.md`: template `hoat-hinh`, thông điệp ngôi thứ nhất, mạch hành trình | Không |
| 2 | Nghiên cứu (`nghien-cuu-dia-diem`), thêm mục bắt buộc **"Hoạt động và trải nghiệm"**, kiểm các giả thuyết ở mục 3 | Không, chạy được ngay |
| 3 | Viết `tom-tat-duyet.md` và **dừng chờ người làm kênh duyệt** (ngoại lệ đợt ra mắt) | Bước 2 |
| 4 | Kịch bản dạng bảng phân cảnh (schema mới: `lop`, `boi_canh`, `nhip[]`, `wob`, `dao_cu`, `gag`, `ky_vat`) | Schema mới (mục 7.3 tài liệu định hướng) |
| 5 | Kiểm chứng hai mô hình | Bước 4 |
| 6 | Phông nền, đạo cụ, giọng, timeline, dựng, render | Thư viện `hh/` và template `hoat-hinh` qua bản thử tập 1 |
| 7 | Kiểm định, phản biện (thêm câu hỏi "hoạt hình hay trình chiếu?", cổng 6b chụp 12 khung) | Bước 6 |

Đề xuất: làm bước 1–3 song song với bản thử tập 1, vì nghiên cứu không phụ thuộc kiểu dựng. Khi bản thử chốt xong thì tập 2 đã có tóm tắt duyệt sẵn để viết kịch bản.

## 8. Câu hỏi cần người làm kênh quyết

1. **Chạy nghiên cứu tập 2 ngay** (song song bản thử tập 1), hay chờ bản thử xong mới đụng tới tập 2?
2. **Phông nền tập 2:** đồng ý vẽ bằng code phần sa mạc, đống đất, biển báo để chỉ cần khoảng 6–8 ảnh AI? (Vẫn còn câu hỏi chung về khoá Gemini API ở tài liệu định hướng, mục 9.)
3. **Con ruồi bám theo Wob** làm gag xuyên suốt tập: giữ hay bỏ? (Hợp thực tế vùng hẻo lánh Úc, nhưng cần nguồn nếu lời nói về ruồi như một sự thật.)
4. Tiêu đề giữ kiểu cũ "The Australian Town That Moved Underground" hay thử kiểu kể chuyện ngôi thứ nhất?
