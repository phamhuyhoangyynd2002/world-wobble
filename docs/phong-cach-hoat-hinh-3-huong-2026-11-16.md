# Ba phong cách hoạt hình và luật phối theo cảnh

> Ngày 16/11/2026. Ghi lại sau khi dựng ba bản thử 60 giây cùng lời, cùng giọng (`projects/2026-11-16-oymyakon/ban-thu-60s/`). Người làm kênh xem xong và quyết: **giữ cả ba, phối theo từng cảnh**, vì một video tri thức dài 10–15 phút chỉ một kiểu hình sẽ nhàm.
> Liên quan: [dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md](dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md), [cong-cu-hoat-hinh-moi-noi-2026-11-16.md](cong-cu-hoat-hinh-moi-noi-2026-11-16.md), [thu-nghiem-thu-vien-hoat-hinh-2026-11-16.md](thu-nghiem-thu-vien-hoat-hinh-2026-11-16.md) (phiên thử thư viện T1–T3).
> Kỹ thuật: hợp đồng [templates/hoat-hinh/HOP-DONG.md](../templates/hoat-hinh/HOP-DONG.md); skill `dung-hoat-hinh`; agent `dao-dien-hoat-hinh`, `dung-cat-giay`, `dung-ve-tay`, `dung-diorama`.

## Tóm tắt

- Ba phong cách, cùng một Wob (dựng từ cùng toạ độ gốc `tao_wob.py`), cùng bảng màu "Mực & giấy", cùng font:
  - **Cắt giấy có khớp** (`cat-giay`): hành trình, giải thích, lịch sử nghiêm túc.
  - **Animatic vẽ tay** (`ve-tay`): gag, punchline, đoạn chèn, sơ đồ vẽ tay.
  - **Diorama giấy 2.5D** (`diorama`): khung hiện tại (bàn kỷ vật), mở chương bằng sổ pop-up, cảnh toàn "đến nơi".
- Mỗi **đoạn** video dùng đúng một phong cách và là một composition riêng, render ra clip câm. `ghep_doan.py` nối các clip, đặt giọng, sfx, nhạc. Nhờ vậy ba agent dựng song song được, sửa đoạn nào render lại đoạn đó.
- Chỗ đổi phong cách phải **có lý do kể chuyện**: vào hồi ức, chèn gag, cắt cứng về hiện tại. Không đổi chỉ cho lạ.

## 1. Ba phong cách (kết quả bản thử 16/11/2026)

| | Cắt giấy có khớp | Animatic vẽ tay | Diorama giấy 2.5D |
|---|---|---|---|
| Trông như | Con rối giấy cắt, mép răng cưa, bóng đổ giữa các lớp, hạt in risograph | Bút mực dày trên sổ phác thảo, nét rung ("sôi"), màu lem, 12 hình/giây | Hộp diorama, sách pop-up, camera đi thật trong không gian |
| Mạnh | Chỉn chu; không gian nhiều lớp parallax; đi bộ có chu kỳ, co giãn, ba lô nảy trễ; giữ liên tục đồ Wob cầm | Giống phim hoạt hình kể chuyện nhất; cắt nhanh (24 shot/60 s); cận mặt punchline; render nhanh nhất | Ấn tượng nhất ở chuyển cảnh (sổ bật dựng); chiều sâu thật; ánh đèn ấm |
| Yếu (bản thử) | Wob chỉ có mặt trước; giấy hơi sạch; vài nhịp đứng chờ lời | Đi bộ chỉ trượt; tay que; nhà lặp | Cảnh ngoài trời phẳng màu; chữ nhỏ ở cảnh xa; render lâu nhất |
| Render 60 s (delivery, máy chạy song song) | 6 phút 40 giây | 3 phút 21 giây | 5 phút |
| Tự chấm "hoạt hình hay slide" | 7/10 | 7,5/10 | 7/10 |
| Bản thử | `ban-thu-60s/a-cat-giay/` | `ban-thu-60s/b-ve-tay/` | `ban-thu-60s/c-diorama/` |
| Thư viện | `templates/hoat-hinh/cat-giay/` | `templates/hoat-hinh/ve-tay/` | `templates/hoat-hinh/diorama/` |

## 2. Luật phối: cảnh nào dùng phong cách nào (mặc định ban đầu)

| Loại cảnh | Phong cách mặc định | Vì sao |
|---|---|---|
| Khung **hiện tại**: Wob ở bàn kể, mở tập, đóng tập, con dấu phán quyết | `diorama` | Bàn kỷ vật dùng lại mọi tập thành chữ ký hình của kênh; Wob mấp máy miệng ở đây |
| **Vào hồi ức / mở chương** (lật sổ, trang pop-up bật dựng) | `diorama` ra → `cat-giay` vào bằng nối `giay` | Cửa vào chuyến đi rõ ràng, người xem biết đang sang lớp thời gian khác |
| Cảnh toàn "đến nơi", cho thấy quy mô (làng giữa thung lũng, thị trấn giữa sa mạc) | `diorama` hoặc `cat-giay` | Cần chiều sâu |
| **Hành trình**, đi bộ dọc phố, đi xe, bản đồ trang sổ có đường nét đứt | `cat-giay` | Parallax nhiều lớp, đi bộ có chu kỳ |
| **Giải thích** một sự thật, tập quán, cơ chế có thật (xe để nổ máy, opal hình thành) | `cat-giay`; cơ chế trừu tượng thì `ve-tay` dạng sơ đồ vẽ tay | Bối cảnh liền mạch, dễ theo |
| **Lịch sử nghiêm túc** (Gulag, sơ tán, chiến tranh) | `cat-giay`, tông trầm, **không gag** | Giấy cắt kể nghiêm được, vẽ tay dễ thành đùa |
| **Gag, punchline**, Wob gặp nạn, phản ứng | `ve-tay` | Cắt nhanh, biểu cảm to, cận mặt, smear |
| **Đoạn chèn ngắn** 2–5 giây giữa một cảnh khác ("cutaway") | `ve-tay` nối `chen` | Ngắt nhịp, mồi lại sự chú ý |
| Giả định "nếu như", so sánh tưởng tượng, Wob tưởng tượng | `ve-tay` | Rõ là không có thật |
| **Cắt cứng về hiện tại** ("Anyway.") | bất kỳ → `diorama` nối `cat` | Mốc đùa đã thành thói quen của Wob |

**Tỉ lệ mục tiêu cho tập 12 phút** (mặc định ban đầu, chỉnh theo số liệu giữ chân): `cat-giay` 45–55%, `ve-tay` 25–35%, `diorama` 15–20%.

**Nhịp đổi phong cách:**
- Đoạn ngắn nhất 2 giây (chèn `ve-tay`); đoạn thường 6–40 giây.
- Không đổi phong cách quá 2 lần trong 15 giây, trừ khi là đoạn chèn gag.
- Một chương nên có ít nhất 2 phong cách. Đoạn liên tục cùng phong cách dài quá 90 giây thì chèn một đoạn khác, để mồi lại sự chú ý mỗi 60–90 giây theo luật giữ chân.
- Khung hiện tại giữ **một** phong cách (`diorama`) cả tập, không đổi qua lại.

**Nối giữa hai đoạn** (chi tiết ở hợp đồng mục 5): `giay` (qua toàn khung giấy phẳng `#EFE3C8`), `cat` (cắt cứng), `chen` (cắt cứng + `whoosh` vào đoạn gag ngắn).

**Liên tục:** `trang_phuc` của mỗi đoạn ghi Wob mặc gì, cầm gì; đoạn sau phải khớp đoạn trước (mũ, khăn, lông mi đóng băng, con cá trên vai…). Đổi phong cách không được làm đổi tạo hình Wob.

## 3. Quy trình một tập (skill `dung-hoat-hinh`)

```
script.json (đã kiểm chứng) → audio/ + subtitles.json (long-tieng) → khau-hinh/ (tao_khau_hinh.py)
   → hoat-hinh/phan-canh.json (agent dao-dien-hoat-hinh: chia đoạn, chọn phong cách, biên đạo nhịp, gag)
   → chuan_bi_doan.py --tat-ca
   → song song: dung-cat-giay ∥ dung-ve-tay ∥ dung-diorama (mỗi agent dựng các đoạn của phong cách mình)
   → ghep_doan.py (nối clip, giọng, sfx, nhạc, −14 LUFS, khung kiểm chỗ nối)
   → kiểm định + phản biện như cũ
```

## 4. Kỹ thuật từ phiên thử thư viện (T2, T3) dùng chung được

- **Phông nền vẽ cọ màu nước p5.brush** (MIT), tách lớp nền trong suốt, có seed: nguồn phông nền miễn phí, không giới hạn lượt, hợp `cat-giay` và `ve-tay`. Thay cho ảnh AI risograph khi không cần cảnh rất chi tiết.
- **Vật lý Matter.js** (MIT) tính trước thành dữ liệu cho gag rơi, đổ, nảy; giữ được tính tất định.
- Tay ống cao su, ba lô con lắc theo gia tốc, co giãn giữ thể tích: đưa vào rig của cả ba phong cách khi nâng cấp.
- **T4: Wob tấm phẳng có ánh sáng, đổ bóng trong phố 3D thật** (three.js trong HyperFrames, check đạt, 46 giây render cho 8 giây video; mẫu `ban-thu-thu-vien/t4-wob-3d/canh3d.js`, tài liệu thử nghiệm mục 9–10): ứng viên nâng cấp cho `diorama` khi cần cảnh ngoài trời có chiều sâu thật (điểm yếu "làng phẳng màu" của bản thử C). Chưa gộp vào thư viện; render chậm hơn CSS 3D khoảng 2 lần.

## 5. Còn mở

- Khẩu hình đang tính từ biên độ giọng (`tao_khau_hinh.py`). Rhubarb Lip Sync (MIT) chính xác hơn nhưng chạy `rhubarb.exe` đã bị hệ thống chặn; người làm kênh cần cho phép nếu muốn dùng.
- Schema `script.json` và agent `bien-kich-video` chưa viết theo bảng phân cảnh; hiện `dao-dien-hoat-hinh` tự suy hành động, gag từ lời đọc. Việc tiếp theo: thêm trường gợi ý hình vào kịch bản (định hướng mục 7.3).
- Ba rig Wob riêng cho ba phong cách (cùng toạ độ gốc). Về lâu dài nên gom phần hình học chung vào `templates/hoat-hinh/_chung/`.
- Tỉ lệ và nhịp đổi phong cách là mặc định ban đầu; chỉnh sau khi có đường giữ chân người xem thật (`/phan-tich-hieu-qua`).
