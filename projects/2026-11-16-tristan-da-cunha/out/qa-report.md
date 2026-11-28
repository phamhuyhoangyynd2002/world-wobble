# Kiểm định: They Evacuated the World's Remotest Island. Then Went Back.

> Agent `kiem-dinh-video`, 28/11/2026. Kiểm `out/video.mp4` (2560×1440, 30 fps, H.264 + AAC, 705,386 s) và `out/video-no-music.mp4` (cùng thông số, cùng độ dài). Mốc lấy theo `timeline.json` ở gốc dự án (dựng lại bằng `xuat_timeline.py`). Mọi số px quy về hệ thiết kế 1920×1080 (đo trên khung 2560 rồi chia 4/3).

## Kết luận: GIAO ĐƯỢC

Không có lỗi mức Chặn. Có 3 việc Nên sửa nhỏ (chữ con dấu chồng lên dòng "SOUTH ATLANTIC", mũ Napoleon chạm nhãn St Helena, một quãng đứng hình 13 khung) và vài ghi chú về hồ sơ. Không sửa thì vẫn giao được. Cổng 7 **chưa đóng**: chưa có `out/bao-cao-xac-thuc.md` (chạy `bao_cao.py`) và chưa có `out/seo.md`.

## Kỹ thuật (kiem_ky_thuat.py): ĐẠT · 0 lỗi, 0 cảnh báo

- `kiem_ky_thuat.py` mã 0: 11,8 phút, khung 2560×1440 khớp `hoat-hinh/phan-canh.json` → `xuat`. Không có khung đen, khoảng lặng hay khung đầu tối. Ghi `out/ky-thuat.json`, bảng ảnh `out/frames/tong-hop.jpg`.
- Âm lượng (`out/audio-report.json`): video.mp4 −14,3 LUFS, true peak −1,1 dBTP. video-no-music.mp4 −14,2 LUFS, TP −1,1. Đạt cả hai (lệch ≤ 1 LU, TP ≤ −1).
- `ffprobe`: cả hai file h264 2560×1440 30/1 + aac, cùng 705,386 s. Lệch timeline (705,38 s) 0,006 s.
- Đo chuyển động `kiem_dong_hinh.py` (`out/dong-hinh.json`): ĐẠT. 92,7 % khung có chuyển động, 90 lần cắt cứng. Hai cảnh báo:
  - 502,2–502,63 s: đứng 13 khung, lúc cắt về bàn ở đầu d37. Duyệt 6a ghi d37 "hết cảnh báo" ở mức đoạn, nhưng trên bản ghép vẫn còn. Xem bảng dưới.
  - 698,1–698,5 s: đứng 12 khung, ở đuôi tập d51. Cảnh báo này đã được chấp nhận ở 6a.
- Chương (`out/chapters.txt`): 8 chương, chương đầu ở 0:00, khớp mốc `timeline.json` (2:20 = 140,81 s; 4:33 = 273,95; 6:39 = 399,01; 7:36 = 456,3; 9:01 = 541,88; 10:34 = 634,51). Chương ngắn nhất là "A Penny, or Four Potatoes", 57 s (≥ 10 s).
- Phụ đề `out/captions.srt`: 275 khối, từ 00:00:00,500 tới 00:11:39,430. Định dạng đúng.

## Bản quyền (ban-quyen.md): ĐẠT · 0 mục CHẶN

- `kiem_tra_ban_quyen.py` mã 0: 3 tài nguyên hình, 0 chặn, 1 cảnh báo. Đã sinh `ban-quyen.md` và `out/ghi-cong.txt`.
- Cảnh báo: giọng đọc là Edge TTS `en-US-AndrewNeural`, được tạm cho phép vì `.env` có `CHO_PHEP_EDGE=1`. **Không bật quảng cáo** cho video này. Trước khi kiếm tiền phải lồng lại bằng Azure, cùng tên giọng.
- Hình: chỉ có 3 bản đồ vẽ bằng code từ Natural Earth (bản quan điểm Việt Nam): `map-tristan` (orthographic, tâm 12,28°W 37,11°S), `map-tristan-route` (tâm 3°E 35°S), `map-napoleon` (tâm 9°W 26,5°S). Cả ba đều `vung_bien_dong: false`. Khung nhìn chỉ có Nam Đại Tây Dương và bờ tây châu Phi, xa vùng 99–125°E. Manifest không có ảnh AI, không có ảnh Commons. Mọi hình khác đều do thư viện hoạt hình vẽ bằng code.
- Nhạc: 4 bài Kevin MacLeod (CC BY 4.0), có trong sổ. Sfx: 13 file tự tổng hợp. Font: Fraunces (OFL). Thư viện mã: GSAP (Standard No Charge), three.js (MIT).
- Ghi chú hồ sơ, không chặn:
  - Cột "Xuất hiện" của `map-tristan` lấy từ `timeline.json` → `shots`, nên ghi cả những quãng bản đồ không có trong khung. Ví dụ 08:55–09:09 (d39) và 10:41–10:50 (d48): camera đã quay khỏi tấm bản đồ trên bàn (`kd-547.jpg`, `kd-645.jpg`). Thông tin thừa này vô hại vì bản đồ là public domain.
  - Dòng GSAP trong bảng "Thư viện mã" bị cụt chữ ("tải ... ngày "). Lỗi nằm ở cách script đọc sổ `templates/_shared/vendor/GIAY-PHEP.md`.

## Xem bằng mắt

Khung lưu ở `out/frames/`: `tong-hop.jpg` (bảng của kiem_ky_thuat), các khung `kd-<giây>.jpg`, bảng ghép `kd-sheet-0…4.jpg`, `kd-sheet-hochieu.jpg`, `kd-sheet-endscreen.jpg`, khung gốc 2560 `kd-full-*.png`, ảnh cắt `kd-crop-679-dau.png` và `kd-crop-180.png`.

| Mốc | Khung | Vấn đề | Mức (Chặn/Nên sửa) | Sửa ở bước nào |
|---|---|---|---|---|
| 0:00–0:05 (d01) | `tong-hop.jpg` ô 0:00, `kd-1.0.jpg` | Đạt. Khung 0 có Wob cầm bưu thiếp (kỷ vật) và bản đồ Tristan trên bàn có chấm đỏ. Không đen, không có logo intro. Câu đầu "This postcard arrived this morning." vào thẳng tình huống | — | — |
| 0:11–0:21 (lời chào, thẻ hộ chiếu) | `kd-sheet-hochieu.jpg` (14 / 16,5 / 18 / 19,5 / 21 s), `kd-sheet-0.jpg` ô t=20 | Đạt. Lời chào cố định ở 11,2 s. Thẻ hộ chiếu hiện khoảng 17,7–20,5 s, ở chữ "The island is Tristan da Cunha". Mốc này lệch mặc định của skill mo-ket (cùng lúc lời chào), nhưng đúng ý đã ghi ở `phan-canh.json`. Thẻ ghi "TRISTAN DA CUNHA · SOUTH ATLANTIC · Would Wob move here?", chữ câu hỏi khoảng 44 px. Mép thẻ ở x ≈ 100, y ≈ 60, trong vùng an toàn 96/54. Thẻ không che mặt Wob | — | — |
| 0:30 (d03) | `kd-sheet-0.jpg` ô t=30 | Đạt. Thẻ "~220 islanders Nov 2026" chữ to, khớp C-quote dòng 1763 của `script.json` (cập nhật dân số 18/11/2026) | — | — |
| 0:40–0:46 (d05) | `kd-sheet-0.jpg` ô t=40, `kd-46.jpg` | Đạt. "WHY GO BACK?" nằm trong vùng an toàn ở 0:40 (đáy chữ cách mép dưới khoảng 90 px). Ở 0:46 chữ trượt ra mép dưới, nhưng đó là lúc camera đang chuyển cảnh, chữ đã đọc trọn từ trước | — | — |
| 0:55–1:24 (d07, bản đồ đường biển) | `kd-sheet-1.jpg` ô t=60 | Đạt. Bản đồ đúng nơi: Cape Town ở mũi tây nam châu Phi, Tristan ở giữa đại dương phía tây nam. Nhãn đúng chính tả "Cape Town", "Tristan da Cunha". Số "~2,810 km · ~1,750 mi" khớp C06. Nhãn không đè logo | — | — |
| 2:58–3:07 (d16, bản đồ Napoleon) | `kd-sheet-1.jpg` ô t=180 / t=185, `kd-crop-180.png` | Bản đồ đúng: St Helena ở phía bắc và hơi về phía đông so với Tristan, bờ châu Phi ở bên phải. Nhãn "St Helena", "Tristan" đúng chính tả. **Nhưng** ở khoảng 3:00 mép phải của mũ Napoleon chạm góc trên trái chữ "S" của nhãn "St Helena". Chữ vẫn đọc được. Tới 3:05 mũ đã dời, nhãn trọn | Nên sửa (nhỏ) | d16 (thợ vẽ tay): dời mũ sang trái khoảng 20 px, hoặc đặt nhãn lên trên mũ → ghép lại |
| 8:22 (d37, cắt về bàn) | `kd-504.jpg` (`kd-sheet-1.jpg` ô t=504); `out/dong-hinh.json` | Hình đúng: bàn, bưu thiếp úp, ảnh núi lửa. Nhưng 502,2–502,63 s đứng 13 khung, đúng nhịp cắt. Đây là mức cảnh báo, 6a ghi d37 đã hết cảnh báo ở mức đoạn | Nên sửa (nhỏ) | Kiểm d37 lúc 0–0,5 s đầu đoạn: cho camera hoặc Wob thở ngay từ khung đầu; hoặc chấp nhận và ghi vào `nhat-ky.md` |
| 9:00–9:46 (d39–d43, bàn, phiếu bầu) | `kd-sheet-2.jpg` (540 / 547 / 565 / 582 s), `kd-546.jpg` | Đạt. "148 to 5" khớp C04 và C58. Bản đồ Tristan trên bàn ở 9:00 đúng hướng (bờ châu Phi bên phải, chấm đỏ giữa biển). Đảo đồng mức ở 9:42 là hình vẽ minh hoạ, không phải bản đồ thật, không có biên giới | — | — |
| 10:45–11:20 (d48–d50) | `kd-sheet-2.jpg` ô 645 / 660, `kd-sheet-3.jpg` | Đạt. Chữ viết tay chỉ "Dear me," và "Love, me" đọc được, đúng ý phân cảnh | — | — |
| 11:17–11:20 (d50, con dấu) | `kd-sheet-3.jpg` (676 / 677,5 / 678,5 / 680 s), `kd-crop-679-dau.png` | Nhãn đúng **WOULD MOVE**, khớp `verdict` (`at` 677,292 s, sfx `dau-wob` 677,292 s), chỉ một lần trong tập. Dấu nằm trọn trên trang hộ chiếu, trong vùng an toàn, đọc rõ, giữ tới khoảng 680,4 s. **Nhưng:** (1) khung dấu đặt chồng lên dòng "SOUTH ATLANTIC" (chữ xanh, cùng cỡ) và cắt chân chữ "DA CUNHA", nên hai lớp chữ chồng nhau và dòng tên nước không đọc được suốt 3 s chữ to nhất. (2) Chữ hoa trong dấu đo trên khung 2560 cao khoảng 95–110 px, tức khoảng 70–80 px hệ 1920. Vẫn đạt mức tiêu đề ≥ 72 px, nhưng thấp hơn mục tiêu "≥ 120 px" ghi ở `phan-canh.json` d50 (thợ và 6a báo "~161 px", có lẽ là cỡ font chứ không phải chiều cao chữ hoa) | Nên sửa (nhỏ) | d50 (thợ diorama): hạ dấu xuống vùng trống giữa dòng kẻ và "Would Wob move here?", hoặc làm mờ hay ẩn "SOUTH ATLANTIC" khi dấu chạm. Có thể phóng dấu thêm ~1,3 lần → ghép lại → kiem_ky_thuat |
| 11:22–11:25 (d50, câu hỏi cuối) | `kd-sheet-3.jpg` ô 681,5 / 684 | Đạt. Gag dây thừng "not become cargo" đọc rõ. Góc phải dưới chỉ có ngăn kéo, không có chữ | — | — |
| 11:25–11:45 (d51, 20 s cuối) | `kd-sheet-endscreen.jpg` (685,6 / 686,3 / 687 / 704,9 s), `kd-sheet-4.jpg` (688 / 693 / 698 / 703 s), `tong-hop.jpg` ô 11:30 / 11:45 | Đạt. Hai khung trống và vòng tròn end screen hiện đủ từ khoảng 686,3 s tới hết (≈ 19 s), ở x ≈ 1180–1830, y ≈ 165–1030. Wob, kệ và nhãn đều nằm ở x < 1100. Không có chữ ở góc x > 1150, y > 560. Kệ có đủ 5 nhãn đúng chính tả (COOBER PEDY, OYMYAKON, SANTA CRUZ DEL ISLOTE, TRISTAN DA CUNHA, WHITTIER). Bản đồ nhá tập sau là bản đồ hình khối cách điệu, không phải bản đồ thật, nên không có rủi ro chủ quyền. Lời nhá ("Somewhere much colder, a town is moving out…") không có số, không có "subscribe". Không có khung đen ở cuối. Ghi chú: nhãn "TRISTAN DA CUNHA" và "WHITTIER" chạm mép nhãn "SANTA CRUZ DEL ISLOTE" nhưng vẫn đọc được | — | — |
| Toàn video | `tong-hop.jpg`, mọi `kd-*` | Đạt. Không có ảnh AI, không có hình giống ảnh chụp, không có chữ lạ, không lỗi font. Logo kênh ở x ≈ 1500–1820, y ≈ 55–130, trong vùng an toàn. Ba phong cách (diorama bàn, vẽ tay, cắt giấy) đúng như phân cảnh | — | — |

**Nhãn AI (Nghị định 142/2026, khoản 2 Điều 18):** manifest không có tài nguyên `tai_hien_su_kien`, và video không có ảnh AI sinh ảnh. Chương "October 1961" (7:36–9:01) kể cuộc sơ tán bằng hoạt hình vẽ tay, cách điệu rõ: Wob, núi lửa, rìa dung nham. Không có cảnh trông như thật, không mô phỏng người thật hay giọng người thật. Vì vậy **không bắt buộc gắn nhãn trên hình**. Mô tả vẫn có dòng AI theo chính sách kênh, vì giọng đọc là TTS.

## Việc khi đăng

- **Not made for kids.** Phim hoạt hình, nhưng khán giả mục tiêu là người lớn và nội dung có thiên tai, sơ tán.
- Nhãn "altered or synthetic content": **không**. Video là hoạt hình hoàn toàn, không có cảnh trông như thật về người thật hay sự kiện có thật. Giọng TTS không giả giọng người thật.
- **Không bật quảng cáo** vì giọng là Edge TTS (`CHO_PHEP_EDGE=1`). Trước khi kiếm tiền phải lồng lại bằng Azure.
- Mô tả phải có:
  - dòng "Narration voice and illustrations are AI-assisted. Every claim was checked by two independent AI models against the sources listed below.";
  - mục Sources;
  - ghi công 4 bài nhạc Kevin MacLeod, chép nguyên `out/ghi-cong.txt`.
- Tải `out/captions.srt`. Dán chương từ `out/chapters.txt` (8 chương).
- End screen: đặt **19 s cuối (từ khoảng 11:26)**, khớp hai khung bên phải (x ≈ 1180–1830 hệ 1920, y ≈ 165–475 và 500–815) và vòng tròn bên dưới.
- Trước khi đăng còn thiếu `out/bao-cao-xac-thuc.md` (`bao_cao.py`, phải kết luận ĐẠT) và `out/seo.md`.
- File 1,34 GB. Theo quy ước, chuyển sang `D:/YouTube/world-wobble/video/tap-05-tristan-da-cunha/` bằng `luu_o_d.py --tap 05 --giao` khi giao.
