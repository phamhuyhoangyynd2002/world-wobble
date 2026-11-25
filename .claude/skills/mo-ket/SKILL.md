---
name: mo-ket
description: Khung mở và kết chung cho mọi tập World Wobble từ tập 3. Phần mở giữ mở lạnh, thêm thẻ hộ chiếu 3 giây nhận diện loạt; phần kết thêm "đuôi tập" 15–20 giây sau câu hỏi bình luận (kệ kỷ vật các tập trước, bản đồ nhá tập sau, chỗ cho end screen YouTube) để video không kết cụt và dẫn người xem sang tập khác. Dùng khi viết cảnh hook, outro, duoi trong script.json, khi đạo diễn chia đoạn đầu và đoạn cuối, khi dựng đoạn đuôi, khi đặt end screen lúc đăng, hoặc khi người làm kênh nói "kết cụt", "mở đầu", "đuôi video", "hẹn tập sau", "end screen".
argument-hint: "<thư mục dự án>"
---

# Mở và kết chung của kênh

Chốt 24/11/2026 sau khi người làm kênh xem tập 1: video dừng ngay sau câu hỏi bình luận, không dẫn sang tập khác, không có chỗ cho end screen. Luật cũ "kết đúng ở chữ cuối" bị thay bằng skill này. Tập 1 và 2 giữ nguyên, không làm lại; áp dụng từ tập 3.

Nguyên tắc: **khung cố định, nội dung mỗi tập khác nhau.** YouTube cho phép cùng intro, outro giữa các tập; rủi ro chỉ ở chỗ lời và hình lặp y nguyên. Vì thế bố cục đuôi tập giống nhau, còn kỷ vật, câu nhá, câu nhìn lại phải riêng từng tập.

## 1. Phần mở

| Mốc | Việc | Cố định hay đổi |
|---|---|---|
| 0–10 s | Mở lạnh: tình huống hoặc kỷ vật của tập, có hình nơi đó ngay khung đầu. Không chào, không logo, không tên kênh | Đổi theo tập (luật cũ, giữ nguyên) |
| Ngay sau câu mồi (~9–14 s) | **Lời chào nhận diện ~3–5 giây**, câu cố định mọi tập: "Hi, I'm Wob. I visit odd places and ask why anyone stays." (chốt 24/11/2026: người làm kênh thấy vào thẳng khó dẫn chuyện, nhưng chào dài 10 s lại chậm). Đặt cuối cảnh hook; validator không tính câu này vào giới hạn 35 từ của hook | Cố định |
| Cùng lúc lời chào | **Thẻ hộ chiếu** (thay vị trí cũ ~20–35 s, nay đi cùng lời chào): trang hộ chiếu giấy lật vào góc trái trên, ghi tên nơi, nước, dòng `Would Wob move here?`, ô con dấu còn trống. Hiện 3 giây rồi lật đi. Lời vẫn chạy, không dừng nhịp | Khung cố định, chữ đổi theo tập |
| Trong 30–40 s đầu | Lời hứa cụ thể của tập | Đổi theo tập |

- Thẻ hộ chiếu là lớp phủ trong đoạn hoạt hình chứa câu hỏi, không phải đoạn riêng. Đạo diễn ghi `the_ho_chieu: {"cue": "<chữ trong lời>", "noi": "Whittier", "nuoc": "Alaska, USA"}` vào đoạn đó trong `phan-canh.json`.
- Sfx: một tiếng lật giấy có trong `sfx/GIAY-PHEP.md`. Không dùng `dau-wob` (chỉ dành cho con dấu).
- Ô con dấu trống ở thẻ này được đóng ở outro: cùng trang hộ chiếu quay lại khi Wob đóng phán quyết. Đây là vòng mở, kết của mọi tập.

## 2. Phần kết: outro rồi đuôi tập

Outro giữ như cũ: phán quyết, lý do, ai hợp ai không, callback kỷ vật, **câu hỏi kéo bình luận**. Ngay sau đó là cảnh `duoi`.

### Cảnh `duoi` trong `script.json`

```json
{
  "id": 16, "type": "duoi", "lop": "hien-tai",
  "narration": "The timetable lives on my shelf now, next to a jar of almost no opals. The fish still lives in the freezer. The map has more pins to go. The next one is warm, very small, and already full. I am packing light.",
  "duoi": {
    "ky_vat": "tờ lịch hầm",
    "nhin_lai": ["2026-11-16-oymyakon", "2026-11-16-coober-pedy"],
    "nha_tap_sau": {"slug": "2026-11-16-santa-cruz-del-islote", "cue": "The next one is warm"}
  }
}
```

Luật lời (`validate_script.py` kiểm):

- 25–50 từ, khoảng 10–14 giây lời; phần còn lại của 15–20 giây là hình và nhạc.
- Ba ý theo thứ tự: **cất kỷ vật** của tập lên kệ → **nhìn lại** một hoặc hai tập trước bằng chính kỷ vật của chúng (mời xem lại) → **nhá tập sau** bằng một gợi ý về nét đặc thù của nơi đó ("warm, very small, and already full"), **không bao giờ nêu tên nơi, nước** (người làm kênh chốt 24/11/2026: nói rõ điểm đến thì mất hay); nhá chung chung cũng được.
- Không con số, không khẳng định mới (đuôi tập không qua kiểm chứng). Gợi ý nhá chỉ dùng nét chung đã chắc đúng trong `brief.md` của tập sau (khí hậu, cỡ, địa hình), không dùng chi tiết cần kiểm chứng.
- Không "subscribe", "like", "see you next time", "thanks for watching". Lời mời nằm ở hình.
- Câu cuối không trùng tập nào. Giọng vẫn deadpan, ngôi thứ nhất.
- Tập cuối một đợt (chưa biết tập sau): `nha_tap_sau.slug` để trống, nhá chung bằng bản đồ ("The map still has a lot of bad ideas on it.").
- Tập đầu tiên của kênh không có tập trước: `nhin_lai` là kệ trống ("The shelf is empty. That will not last.").

### Bố cục hình (khung 1920×1080, cố định mọi tập)

Toạ độ dưới đây theo hệ thiết kế 1920×1080. Tập 4 trở đi xuất 2560×1440 thì mọi vị trí tự nhân ×4/3 (cùng tỉ lệ khung, end screen YouTube đặt theo tỉ lệ nên khớp như cũ).

```
┌───────────────────────────────────────────────────────────┐
│  KỆ KỶ VẬT (trái, x 96–900)        ┌─────────┐ ┌─────────┐ │
│  cá · lọ opal · tờ lịch …          │ khung 1 │ │ khung 2 │ │
│  + thẻ tên nơi dưới mỗi món        │ tập mới │ │ gợi ý   │ │
│                                    └─────────┘ └─────────┘ │
│  BẢN ĐỒ + ghim (trái dưới)               ( vòng đăng ký )  │
│  Wob đứng giữa, chỉ tay sang phải                          │
└───────────────────────────────────────────────────────────┘
```

| Nhịp | Giây | Hình |
|---|---|---|
| 1 | 0–4 | Bàn kỷ vật. Wob đặt kỷ vật của tập lên kệ, cạnh kỷ vật các tập trước; mỗi món có thẻ tên nơi |
| 2 | 4–9 | Wob liếc sang món cũ được nhắc trong lời, món đó nhúc nhích (cá rã đông, lọ kêu lách cách) |
| 3 | 9–14 | Bản đồ mở ra, ghim mới cắm vào nơi vừa đi, một ghim trống rung ở vùng tập sau (không vẽ bản đồ chi tiết, chỉ hình giấy gợi ý) |
| 4 | 14–20 | Hai khung ảnh giấy trống và một vòng tròn giấy bật lên bên phải; Wob chỉ tay vào đó, chớp mắt, đứng thở. Nhạc nhỏ dần, không im lặng, không mờ đen trước giây cuối |

- **Vùng end screen:** hai khung 16:9 mỗi khung khoảng 560×315 ở x 1180–1740, y 150–465 và y 500–815 hoặc xếp ngang tuỳ bản dựng; vòng đăng ký đường kính khoảng 200 dưới chúng. Bên trong khung và vòng **không vẽ gì**, không chữ: YouTube sẽ phủ ô video và nút đăng ký lên đúng chỗ đó.
- Chữ trên hình chỉ có thẻ tên nơi trên kệ và nhãn ghim; không chữ "Subscribe", không "Watch next".
- Phong cách: **diorama** (cùng bàn kỷ vật với các đoạn `hien-tai`), một đoạn riêng `d<cuối>` trong `phan-canh.json`, `lop: "duoi"`, không gag chen ngang lời nhá.
- Trang phục Wob: bộ ở nhà của tập (không đồ đi đường).
- Kỷ vật các tập trước lấy từ `templates/hoat-hinh/_chung/mo-ket/ky-vat.json` (mỗi tập một dòng: slug, tên nơi, hàm vẽ SVG, trạng thái sau outro). Làm xong tập nào thì thêm kỷ vật tập đó vào file này.

### Thời lượng

- Đuôi tập dài **15–20 giây** (end screen YouTube cho tối đa 20 giây cuối). Tính vào `target_seconds`.
- Luật "20 giây cuối không đặt chữ ở x > 1150, y > 560" nay áp cho đoạn đuôi; cảnh outro được dùng cả khung.

## 3. Template

`templates/hoat-hinh/_chung/mo-ket/` chứa: `duoi-tap.js` (kệ, bản đồ, khung end screen, nhận dữ liệu từ cảnh `duoi`), `the-ho-chieu.js` (lớp phủ mở đầu, dùng được ở cả ba phong cách), `ky-vat.json`, `README.md`. **Trạng thái 24/11/2026: chưa dựng.** Bản đầu tiên được dựng cùng tập 3 Whittier rồi tách ra đây; từ tập 4 thợ dựng chỉ nạp dữ liệu, không vẽ lại.

## 4. Ai làm gì

| Bước | Người | Việc |
|---|---|---|
| Kịch bản | `bien-kich-video` | Viết cảnh `duoi` (mục 2); chọn câu có câu hỏi của tập làm chỗ đặt thẻ hộ chiếu |
| Phân cảnh | `dao-dien-hoat-hinh` | Thêm `the_ho_chieu` vào đoạn đầu; thêm đoạn `duoi` cuối cùng, phong cách diorama, 4 nhịp như bảng |
| Duyệt 5a, 6a | `duyet-phan-canh` | Kiểm thêm: có thẻ hộ chiếu trước giây 40; đuôi 15–20 s; khung end screen trống; kỷ vật tập trước đúng; không kết bằng khung đen |
| Dựng | `dung-diorama` | Dựng đoạn đuôi từ template |
| SEO | `seo-youtube` | Ghi vào `out/seo.md` mục "End screen": video 1 = tập mới nhất hoặc tập được nhá, video 2 = "Best for viewer", nút đăng ký; và playlist của loạt |
| Đăng | `/dang-bai` | Đặt end screen 20 giây cuối theo mục đó; thêm video vào playlist "Why do people live here?" |

## 5. Kiểm trước khi giao

- `validate_script.py` không LỖI về cảnh `duoi`.
- Xem 25 giây cuối video: lời hết ở khoảng giây 12–14 của đuôi, sau đó vẫn có chuyển động và nhạc; hai khung và vòng tròn trống; không khung đen, không im lặng.
- Xem giây 15–40: thẻ hộ chiếu hiện đủ 3 giây, không che mặt Wob, không che chữ khác.
- Câu nhá đúng với tập sau thật sự sắp đăng. Đổi thứ tự đăng thì sửa câu nhá hoặc dùng bản nhá chung.
