# Kiểm định: Why Would Anyone Live in Oymyakon? I Tried. (tập 1 Oymyakon, bản hoạt hình, vòng kiểm 2)

Ngày kiểm: 19/11/2026 · Người kiểm: agent `kiem-dinh-video` (không tham gia làm video) · Video: `out/video.mp4` (643,33 s = 10:43) · Bản kiểm trước (661,77 s, lần ghép cũ): `out/qa-report.v1.md`

## Kết luận: GIAO ĐƯỢC

0 lỗi Chặn. Mọi mục được giao kiểm lại đều đạt: logo không che chữ (ba khoảng `an_logo` ẩn đúng lúc), con dấu NOPE đúng một lần và đọc rõ, 20 s cuối không có chữ trong vùng end screen, mắt Wob không còn khung nào chỉ có hai vòng rỗng, biển "~500 (2010)" hiện trọn, người chăn tuần lộc vẽ dạng chung và không bị rọi đèn, chữ ở d13 và d31 đủ cỡ. Còn 4 việc Nên sửa nhỏ, không bắt buộc render lại (bảng dưới).

## Kỹ thuật (kiem_ky_thuat.py): ĐẠT · 0 lỗi, 0 cảnh báo

- Chạy lại 19/11: `ĐẠT: 10.7 phút · 0 lỗi · 0 cảnh báo` (`out/ky-thuat.json`, độ dài 643,33 s; bảng ảnh `out/frames/tong-hop.jpg`).
- Âm lượng (`out/audio-report.json`): `video.mp4` −14,0 LUFS / TP −1,1 dBTP; `video-no-music.mp4` −14,6 LUFS / TP −1,9 dBTP. Đạt.
- Chuyển động: không chạy lại; theo bên giao việc `kiem_dong_hinh` 95,1% khung động.
- Đuôi video: câu cuối "Would you take that trade?" kết ở 641,64 s, video hết ở 643,33 s. 1,5 s cuối nhạc đã tắt dần (mean −61,9 dB, đo bằng `volumedetect` từ 641,8 s). Chấp nhận được (dưới 2 s, có hình động).

## Bản quyền (ban-quyen.md): ĐẠT · 0 CHẶN, 1 cảnh báo

- Chạy lại 19/11: `ĐẠT (bản giao): 4 tài nguyên hình, 0 chặn, 1 cảnh báo`.
- Hai lỗi công cụ của vòng 1 **đã sửa**: `ban-quyen.md` giờ chỉ liệt kê 4 bản đồ thật có trong video (map-globe, map-yakutia 00:42–00:52 và 03:48–04:25, map-tomtor 03:48–04:25, map-kolyma 05:51–06:10), có mục **Thư viện mã** (GSAP 3.14.2, three.js 0.181.0 MIT); `out/ghi-cong.txt` chỉ còn 5 dòng nhạc Kevin MacLeod CC BY 4.0. Ghi chú chủ quyền `map-globe` trong manifest đã sửa đúng khung thật (xuống ~7°N, chạm mép bắc vịnh Bắc Bộ, không Hoàng Sa/Trường Sa, không đường lưỡi bò).
- Cảnh báo còn lại, đúng: giọng Edge `en-US-AndrewNeural` (`CHO_PHEP_EDGE=1`). **Không bật quảng cáo**; trước khi kiếm tiền phải lồng lại bằng Azure cùng tên giọng.
- Nhỏ: dòng GSAP trong bảng "Thư viện mã" bị cắt ("tải ... ngày  " và "cho phép dùng thương mại miễn phí từ 2"): script cắt chuỗi từ `templates/_shared/vendor/GIAY-PHEP.md`. Không ảnh hưởng kết luận.

## Xem bằng mắt

Khung mới của vòng này nằm ở `out/frames/v2/` (khung `out/frames/kd-*.jpg` cũ là của bản 661,77 s, không dùng để kết luận). Video không có ảnh AI hay ảnh Commons nên không có mốc ảnh AI để trích; đã trích ở mọi nhịp bản đồ của `timeline.scenes[].shots` (42,01–52,25 · 228,03–265,32 · 351,01–370,62 s).

| Mốc | Khung | Vấn đề | Mức (Chặn/Nên sửa) | Sửa ở bước nào |
|---|---|---|---|---|
| Cả video, góc phải trên | `v2/logo-01.jpg`…`logo-04.jpg` (vùng x>1360, y<190, mỗi 2 s, 322 khung) | Logo "World Wobble" (x≈1505–1823, y≈55–131) không đè chữ nào ở 322 khung đã soát. Nền dưới logo chỉ là tường, giấy, bầu trời, mép bản đồ | Đạt | — |
| 5:01,2–5:03,9 (`an_logo` 1) | `v2/logo-an1.jpg` (mỗi 0,25 s 298–307 s), `v2/d16-arctic.jpg`, `v2/kd-302.jpg` | Chữ "Arctic Circle" vào góc lúc camera đẩy; logo ẩn đúng từ 5:01,25 tới 5:03,75, hiện lại khi chữ đã ra khỏi góc. "Arctic Circle" đọc trọn ở 5:01 và 5:04–5:05 (cao khoảng 50 px) | Đạt | — |
| 9:33,0–9:43,4 (`an_logo` 2, 3) | `v2/logo-an2.jpg` (mỗi 0,25 s 570–586 s) | Logo ẩn khi biển "JULY" (9:33–9:35,7) và "POLE OF COLD" (9:39,2–9:43,2) đi qua góc; không khung nào logo chồng chữ. Nhưng logo **tắt, bật, tắt** trong 10 s (hiện lại 575,8–578,9 s, 3,1 s), nhấp nháy dễ thấy | Nên sửa | Bước dựng (`/dung-hoat-hinh`): gộp hai khoảng thành `[573.0, 583.4]` trong `hoat-hinh/phan-canh.json` → `an_logo`, ghép lại (`ghep_doan.py`), trộn âm, chạy lại `kiem_ky_thuat.py`. Không cần dựng lại đoạn |
| 0:45,0–0:46,5 | `v2/kd-46.jpg`, `v2/logo-46.jpg` (mỗi 0,25 s 43,5–48,5 s, khung n6–n12) | Nhãn bản đồ "Oymyakon" phóng to (hộp x≈855–1690, y≈85–305) lướt qua góc: logo nằm đè **viền trên của hộp nhãn** khoảng 1,5 s. Chữ "Oymyakon" (y≈140–300) và chấm đỏ không bị che, đọc rõ (chữ cao khoảng 160 px). Lượt soát mỗi 2 s bỏ sót mốc này, phải xem dày mới thấy | Nên sửa | Như trên: thêm `[44.9, 46.7]` vào `an_logo`, ghép lại |
| 10:24,8–10:28,6 (con dấu) | `v2/con-dau.jpg` (mỗi 0,25 s 624–629 s), `v2/kd-626.jpg`, `v2/kd-628.jpg` | **NOPE đúng một lần**: `timeline.json` cảnh 19 `verdict.label = NOPE`, `at = 624,863`; `sfx` có đúng 1 lượt `dau-wob.wav` ở 624,863 s; trong code chỉ `doan-d40/canh.js` có "NOPE". Dấu chạm giấy ở 625,0 s; cận cảnh chữ sạch, không bị tay hay cán dấu che từ **625,75 tới 628,25 s** (2,5 s), chữ "NOPE" cao khoảng 90 px, "Would Wob move here?" đọc rõ. Lời đọc "My verdict is NOPE." 624,3–625,5 s khớp hình | Đạt | — |
| 10:23,3–10:43,3 (20 s cuối) | `v2/end-20s.jpg` (mỗi 1 s, khung đỏ x>1150, y>560) | Vùng end screen **không có chữ** ở cả 20 khung: chỉ có đạo cụ (trang sổ trống, tủ lạnh, chai nước, bản đồ gấp, nhiệt kế không số, Wob). Chữ "Would Wob move here?" nhỏ trên sổ ở góc nhìn rộng nằm x<1150. Logo ở y<190, không chạm vùng end screen. Câu hỏi cuối "Would you take that trade?" 640,5–641,6 s, gọi lại kỷ vật con cá ("The fish lives in my freezer now.") | Đạt | — |
| d03 27,6–35,6 s và 37,2–38,0 s | `v2/mat/A-1.jpg`, `A-2.jpg`, `A-3.jpg`, `B-1.jpg`, `B-2.jpg`, `C-1.jpg` (mọi khung, 30 fps, cắt quanh mặt Wob); `v2/mat/chk.jpg` | Nháy ở 28,73 s và 37,53–37,60 s: mắt thành hai nét mí thẳng; khung chuyển tiếp có mí che nửa mắt, vẫn thấy tròng đen. Mí tỉnh bơ (0,35) ở ~35,1–35,6 s bình thường. **Không khung nào chỉ còn hai vòng viền rỗng**. Ghi chú: 31,4–31,9 s tay Wob vắt ngang mắt phải (bàn tay tròn đen chồng lên mắt), đọc như dụi mắt, không phải lỗi mắt | Đạt | — |
| d18 347,5–349,3 s | `v2/mat/D-1.jpg`, `D-2.jpg`, phóng to `v2/mat/D-zoom-1.jpg` | Nháy chậm 348,03–348,27 s: 3 khung nét mí thẳng (n7–n9). Khung n6 (348,10 s) và n10 (348,23 s) mí khép tới 0,8: trong vòng viền còn **một vệt trắng hình lưỡi liềm** ở đáy mắt, nên vẫn đọc là mí đang khép, không phải vòng rỗng. Mí 0,4 từ 348,6 s bình thường | Đạt | — |
| d38 609,9–610,6 · 611,6–612,8 · 616,3–617,7 s | `v2/mat/E-1.jpg`, `F-1.jpg`, `G-1.jpg` | Nháy 610,20–610,23 s và 617,10–617,13 s: nét mí thẳng. Mí tỉnh bơ (0,35, 0,3) và mở lại ở 611,8–612,6 s, 616,5–617,4 s đều có tròng đen. Không khung vòng rỗng | Đạt | — |
| 0:10–0:12 (d01) | `v2/s-d01.jpg` (10 · 10,8 · 11,6 · 12,2 s) | Biển "OYMYAKON / ~500 (2010)" trọn khung ở cả 4 mốc, cách mép trên khoảng 140 px, cách mép phải khoảng 120 px; "~500 (2010)" cao khoảng 60 px, "OYMYAKON" khoảng 70 px | Đạt | — |
| 2:34–2:52 (d11) | `v2/s-d11.jpg`, `v2/d11-1s.jpg` (mỗi 1 s 153,7–173 s), `v2/d11-161.jpg` | Người chăn tuần lộc: hình nhỏ, chung, mặc áo trùm, mặt cười đơn giản, đứng làm việc cạnh tuần lộc và xe trượt; không nét dân tộc phóng đại, không bị đem ra đùa. Vệt đèn pin của Wob rọi vào **tuần lộc và hố nước**, không rọi vào người. Ở 161,2 và 161,7 s vệt đèn dừng ở con tuần lộc ngay cạnh một người, người đứng sát mép vệt sáng (chưa nằm trong vệt). Lều hình nón là đạo cụ chung | Đạt | — |
| 1:57–2:16 (d09) | `v2/s-d09.jpg`, `v2/d09-131.jpg` (mỗi 0,5 s 131–136 s) | Cận cảnh sổ: "OYMYAKON" cao khoảng 70 px, "= water that / does not freeze?" khoảng 50 px, "Even?" "Sakha?" khoảng 50 px. Nhưng "Sakha?" chỉ hiện trọn khoảng 1,3 s (131,0–132,3 s) rồi camera lùi: chữ trên sổ còn khoảng 25–30 px và gò tuyết tiền cảnh **che nửa chữ "Sakha?"** từ 132,5 s tới hết góc rộng (~136 s) | Nên sửa | Bước dựng đoạn d09 (`dung-cat-giay`): giữ cận cảnh thêm ~1 s sau khi "Sakha?" hiện, hoặc hạ gò tuyết tiền cảnh để không đè sổ; dựng lại d09, ghép lại |
| 3:16–3:48 (d13) | `v2/s-d13.jpg`, `v2/kd-204.jpg` | "6 Feb 1933" khoảng 80 px, "≈ −68°C" khoảng 100 px, "−90°F" khoảng 80 px, "−67.7°C" khoảng 70 px; quy đổi đúng (−67,7°C ≈ −89,9°F). "POLE OF COLD" 44–60 px. Ở 204 s "6 Feb 1933" kết thúc ở x≈1380, cách logo khoảng 120 px | Đạt | — |
| 8:27–8:50 (d31) | `v2/s-d31.jpg`, `v2/kd-529.5.jpg` | "July 2010 / +34.6°C" khoảng 60 px; "−67.7", "+34.6" khoảng 56–70 px; "≈ 102°C" khoảng 70–90 px; 34,6 + 67,7 = 102,3, đúng. Ở cú đẩy camera cuối đoạn (~528,5–530 s), "+34.6" chạy tới x≈1898 và "−67.7" bắt đầu ở x≈75, **ra ngoài vùng an toàn chữ** (96 px mỗi bên) khoảng 20–75 px, chữ vẫn trọn trong khung | Nên sửa | Bước dựng đoạn d31 (`dung-cat-giay`): giảm độ đẩy camera cuối đoạn (hoặc dời hai nhãn vào trong) để chữ nằm trong x 96–1824; dựng lại d31, ghép lại |
| 3:48–6:10 (bản đồ) | `v2/ban-do.jpg` (42,3 · 43,2 · 46 · 50 · 230 · 245 · 255 · 262 · 352 · 358 · 365 · 369 s), `v2/kd-240.jpg` | Bản đồ đúng nơi: chấm Oymyakon tây bắc biển Okhotsk, Verkhoyansk phía bắc, Tomtor ngay đông nam Oymyakon, "Kolyma" phía đông. Chính tả nhãn đúng. map-globe ở 42,3–43,2 s như vòng 1, không có Hoàng Sa, Trường Sa, đường lưỡi bò. Ở 240 s đạo cụ vương miện băng chạm chữ "k" cuối của "Verkhoyansk" và chữ "O" của "Oymyakon" một chút, vẫn đọc được | Đạt | — |
| 5:00–5:05 (d16) | `v2/d16-arctic.jpg` | Vòng Bắc Cực vẽ quanh cực, chấm Oymyakon nằm ngoài vòng về phía nam, khớp lời "It sits a few degrees of latitude south of it" (63,46°N so với 66,56°N) | Đạt | — |

Không có người thật, không có cảnh trông như ảnh chụp, không có đùa về người dân trong các khung đã xem.

## Việc khi đăng

- **Not made for kids** ("No, it's not made for kids"): khán giả mục tiêu là người lớn, có nội dung trại tù Kolyma.
- **Nhãn altered/synthetic: không bắt buộc.** Toàn bộ hình là hoạt hình vẽ bằng code, không ảnh AI, không cảnh trông như thật về người thật hay sự kiện có thật. Giọng TTS không mô phỏng giọng người thật, nên không thuộc khoản 2 Điều 18 NĐ 142/2026. Dòng AI trong mô tả nên nói đúng: giọng đọc là AI (TTS), hình là hoạt hình kênh tự dựng.
- **Không bật quảng cáo** (giọng Edge, `CHO_PHEP_EDGE=1`); trước khi kiếm tiền phải lồng lại bằng Azure.
- Tải `out/captions.srt` (tiếng Anh) và dán `out/chapters.txt` (8 chương, chương đầu 0:00) vào mô tả.
- Ghi công trong mô tả: 5 bài nhạc Kevin MacLeod CC BY 4.0, đúng như `out/ghi-cong.txt`. Có thể thêm "Maps: Natural Earth (public domain)".
- Đặt end screen ở góc phải dưới (x>1150, y>560) trong 20 s cuối (10:23–10:43); vùng này đã trống chữ.
