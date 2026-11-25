# Đánh giá và sửa cảnh mở tập 3–10 (22/11/2026)

Phạm vi: cảnh 1 (hook) và cảnh 2 (lời hứa) của 8 kịch bản. Bản cũ giữ ở `projects/<tập>/script.v1.json`. Chi tiết từng tập ghi trong `nhat-ky.md` của tập đó.

## Vấn đề chung ở bản cũ
1. **Cùng một khuôn cho cả 8 tập**: "This is a [đồ vật]." → 1–2 câu → "I went to find out / see why." (6/8 tập kết hook bằng gần đúng câu đó, tập 2 Coober Pedy cũng vậy). Kênh cấm làm theo khuôn; người xem cày liền vài tập sẽ thấy ngay.
2. **`hook_type` ghi một đằng, lời viết một nẻo**: ghi `cau-hoi`, `con-so`, `ket-cuc-truoc`, `tinh-huong`, `wob-hanh-dong` nhưng cả 8 tập đều mở bằng kỷ vật.
3. **Lời hứa quá dài**: 91–121 từ (35–47 giây). Hook cộng lời hứa dài 49–61 giây, trong khi mục tiêu là hứa xong trước giây 40.
4. **Gag hành lý lặp ở 6/10 tập** (Coober Pedy, Santa Cruz, Tristan, Kiruna, Mawsynram, Longyearbyen), có tập dùng mà về sau không gọi lại.
5. **Vòng "Would Wob move here?"** chỉ được mở rõ ở 1/8 tập.
6. **Lỗi sự thật hoặc dễ bị hiểu sai**:
   - Longyearbyen: "mỏ đó đào hơn một thế kỷ". Sai, vì Mỏ 7 mở năm 1966.
   - Whittier: "cả thị trấn ở một toà nhà" (đúng ra là phần lớn), và câu "thang máy chạy được hầu hết các ngày" chưa có nguồn.
   - Santa Cruz: "đảo trống". Đúng ra là các đảo rộng hơn, không phải không có người.
   - Kiruna: chìa khoá "của ngôi nhà đã dời". Phần lớn nhà bị phá dỡ, chỉ một số được dời.
7. **Chi tiết dễ phản cảm**:
   - Matmata: Wob cạo tường phòng ngủ bằng thìa, tức là phá nhà người ta.
   - Whittier: đùa "giáo phái/khách sạn" về cách người dân sống, dễ thành đùa về người dân.
   - Mawsynram: câu dè dặt "By some accounts, it came from…" vụng, làm hỏng câu đắt nhất.

## Sau khi sửa: mỗi tập mở một kiểu khác

| Tập | Kiểu mở | Câu đầu | Hook | Lời hứa |
|---|---|---|---|---|
| 3 Whittier | Wob hành động (khung chèn hồi ức) | I reached the tunnel just after it closed for the night. | 35 từ | 76 từ |
| 4 Santa Cruz | Câu hỏi | On a coast with plenty of roomier islands, would you pick the smallest one? | 28 | 75 |
| 5 Tristan | Kết cục trước | In nineteen sixty-one, a volcano forced everyone off this island. | 34 | 61 |
| 6 Kiruna | Con số | Three kilometres east. | 35 | 70 |
| 7 Mawsynram | Tình huống | I hung this sock up to dry in June. | 34 | 78 |
| 8 Matmata | Wob hành động (khung chèn hồi ức) | I walked straight past my hotel. | 32 | 73 |
| 9 Uros | Kỷ vật | This is floor. | 33 | 72 |
| 10 Longyearbyen | Luật lạ | In this town, you are advised to take a rifle when you leave it. | 32 | 72 |

- Hook ≤ 35 từ (khoảng 13–14 giây); lời hứa 61–78 từ (24–30 giây), nên phần hứa xong trong khoảng giây 37–44.
- Câu kết hook khác nhau ở cả 8 tập. Mỗi lời hứa mở vòng "Wob có sống được ở đây không" bằng một cách nói riêng.
- Gag hành lý chỉ giữ ở Santa Cruz (ba lô xuyên suốt cả tập). Mawsynram giữ tất, Uros giữ cái chân ướt, vì về sau đều có cảnh gọi lại.
- Dữ kiện bị cắt khỏi lời hứa được chuyển sang cảnh 3 (Kiruna: số dân; Mawsynram: các nơi tranh danh hiệu; Longyearbyen: cây và gấu), không mất khẳng định nào có nguồn. Mỗi tập vẫn khoảng 10 phút.
- Khẳng định mới hoặc đổi nội dung, cần đưa vào vòng kiểm chứng:
  - Whittier: "most people share one front door".
  - Tristan: sang Anh rồi bỏ phiếu quay về.
  - Mawsynram: các nơi tranh danh hiệu.
  - Uros: phải thêm lau mới khi lớp dưới mục.
  - Longyearbyen: lời khuyên mang súng; Mỏ 7 đóng năm 2025.

## Còn để ngỏ
- Validator vẫn báo Kiruna trùng khuôn chương mở với Uros, vì nó so theo tên thư mục chứ không theo thứ tự phát. Hai tập này không phát liền nhau.
- Tiêu đề Mawsynram "Rainiest Village on Earth" nói chắc, trong khi lời đọc nói danh hiệu này còn tranh cãi. Nên cân nhắc đổi khi làm thumbnail và tiêu đề (ví dụ "One of the Rainiest Villages on Earth", hoặc chuyển con số lên tiêu đề).
- Whittier và Matmata mở bằng khung chèn hồi ức trước khi lùi ra bàn kỷ vật. Đạo diễn hoạt hình cần làm khung chèn này đủ khác cảnh bàn, để hai tập không trông giống các tập kỷ vật.
