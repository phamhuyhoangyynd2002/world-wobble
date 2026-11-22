# Kiểm định: Who Would Choose to Live at Minus Fifty? (tập 1 Oymyakon, bản hoạt hình)

Ngày kiểm: 19/11/2026 · Người kiểm: agent `kiem-dinh-video` (không tham gia làm video) · Video: `out/video.mp4` (661,77 s)

## Kết luận: GIAO ĐƯỢC

0 lỗi Chặn. Có 2 việc Nên sửa ở **công cụ và hồ sơ**, không phải ở video, nên không phải render lại: (1) `xuat_timeline.py` chép `shots` kiểu trình chiếu cũ sang `timeline.json`, làm `kiem_tra_ban_quyen.py` liệt kê sai tài nguyên; (2) ghi chú chủ quyền của `map-globe` trong manifest mô tả sai khung cắt. Chi tiết ở dưới.

## Kỹ thuật (kiem_ky_thuat.py): ĐẠT · 0 lỗi, 0 cảnh báo

- `out/ky-thuat.json`: 1920×1080, độ dài 661,77 s, timeline 661,72 s (lệch 0,05 s); không khung đen, khung đầu không tối; có `captions.srt` (255 khối, khối cuối 10:58,6–11:00,1) và `chapters.txt` (8 chương, chương đầu 0:00, chương ngắn nhất 34 s).
- Âm lượng (`out/audio-report.json`): `video.mp4` −14,3 LUFS / TP −1,5 dBTP; `video-no-music.mp4` −14,0 LUFS / TP −1,0 dBTP (vừa chạm ngưỡng ≤ −1, đạt).
- Chuyển động: không chạy lại; theo bên giao việc, `kiem_dong_hinh` cả video 95,2% khung động, đứng hình dài nhất 6 khung (ngưỡng LỖI ≥ 24) (`hoat-hinh/out/dong-hinh.json`).

## Bản quyền (ban-quyen.md): ĐẠT · 0 CHẶN, 3 cảnh báo (1 cảnh báo đúng, 2 cảnh báo sai do lỗi công cụ)

| Cảnh báo của script | Đúng với video? | Ghi chú |
|---|---|---|
| Giọng Edge TTS `en-US-AndrewNeural`, `CHO_PHEP_EDGE=1` | **Đúng** | Không bật quảng cáo. Trước khi kiếm tiền phải lồng lại bằng Azure cùng tên giọng, rồi trộn và render lại |
| `ai-village-dusk` tạo trên ChatGPT web | **Sai, lỗi công cụ** | Ảnh này không có trong video hoạt hình |
| Tự xem ảnh AI `ai-village-dusk` | **Sai, lỗi công cụ** | Như trên |

### Lỗi công cụ: hồ sơ bản quyền liệt kê theo `shots` cũ, không theo cái có trong video

- **Bằng chứng:** `timeline.json` (format `hoat-hinh`) cảnh 1 vẫn có `shots`: `asset:map-globe` 0,2–5,9 s rồi `asset:commons-street` 5,9–11,7 s. Khung `out/frames/kt-00.jpg` (0:00) và `kt-02.jpg` (0:10) thật ra là bàn diorama có Wob và con cá, không có bản đồ hay ảnh Commons. Nguyên nhân ở `.claude/skills/dung-hoat-hinh/scripts/xuat_timeline.py` dòng 55: `for key in ("wob", "que", "shots")` chỉ dời mốc các `shots` lấy từ `build_timeline.py` (tức `script.json`), không thay bằng tài nguyên thật của `hoat-hinh/`. Sau đó `kiem_tra_ban_quyen.py` (dòng 92–94) đọc `timeline.scenes[].shots` và ra 17 tài nguyên hình với mốc "Xuất hiện" sai, ví dụ `commons-street` 00:05–00:11.
- **Hậu quả:** `ban-quyen.md` liệt kê 11 ảnh Commons, 1 ảnh AI (`ai-village-dusk`) và 1 ảnh `tu-tao-bat-khi-lanh`, nhưng không ảnh nào xuất hiện trong video. Bản `out/ghi-cong.txt` script sinh ra có 11 dòng ghi công Commons cho ảnh không dùng. Ngược lại, script không truy được tài nguyên thật: nhãn dán bản đồ trong `hoat-hinh/doan-*/ban-do/` (có `map-yakutia-nho.svg`, bản cắt khung của `map-yakutia.svg`, cùng 135.246 byte), bản đồ `map-kolyma` chép hình học vào `doan-d19/canh.js`, three.js, GSAP.
- **Đã làm trong vòng kiểm này** (nằm trong phạm vi file được ghi): thêm mục "Đối chiếu với video hoạt hình" vào cuối `ban-quyen.md`; ghi lại `out/ghi-cong.txt` chỉ còn 5 dòng nhạc Kevin MacLeod. Chạy lại `kiem_tra_ban_quyen.py` thì hai file này bị ghi đè về bản sai, cho tới khi sửa công cụ.
- **Cần chạy lại:** sửa `xuat_timeline.py` (format `hoat-hinh`: bỏ `shots` cũ, hoặc dựng `shots` từ `hoat-hinh/phan-canh.json` và các `mapSticker`) và `kiem_tra_ban_quyen.py` (format `hoat-hinh`: quét `hoat-hinh/doan-*/` để biết bản đồ, ảnh, thư viện thật sự dùng). Sau đó chạy lại `xuat_timeline.py`, rồi `kiem_tra_ban_quyen.py`. Không cần render lại.

### Tài nguyên thật sự có trong video (đối chiếu `hoat-hinh/phan-canh.json`, `doan-*/canh.js`, `index.html`, file trong `doan-*/`)

| Tài nguyên | Ở đâu, khi nào | Căn cứ | Kết quả |
|---|---|---|---|
| `map-globe` (orthographic, Natural Earth bản VN) | d04, nhãn dán trang sổ, khoảng 42,0–44 s | Public domain, vẽ bằng D3; manifest `vung_bien_dong: true`, `chu_quyen_da_kiem: true` | Đạt; ghi chú chủ quyền sai (mục Xem bằng mắt, dòng 1) |
| `map-yakutia` | d04 khoảng 43–52 s; d14 228,0–~249 s | Public domain | Đạt |
| `map-yakutia-nho.svg` (bản cắt khung `0 100 1920 800` của `map-yakutia`) | d14 ~249–265 s, ô nhỏ cạnh `map-tomtor` | Như `map-yakutia` | Đạt; không có dòng riêng trong manifest (là bản phái sinh) |
| `map-tomtor` | d14 ~249–265 s | Public domain | Đạt |
| `map-kolyma` (hình học chép vào `doan-d19/canh.js`) | d19 351,0–~362 s | Public domain; `vung_bien_dong: false` | Đạt |
| Font Fraunces Variable | 40/40 đoạn (`_chung/fonts/`); `font-family` duy nhất trong code là Fraunces | SIL OFL 1.1, `templates/_shared/fonts/GIAY-PHEP.md` | Đạt |
| GSAP 3.14.2 (`_chung/gsap.min.js`) | 40/40 đoạn | GSAP Standard "No Charge" License, ghi ở `templates/_shared/vendor/GIAY-PHEP.md`; file giống hệt bản trong sổ (`cmp` không khác) | Đạt |
| three.js 0.181.0 | 11 đoạn diorama (`lib/vendor/`) | MIT, `three-LICENSE.txt` + `GIAY-PHEP.md` đi kèm | Đạt |
| Nhạc: wallpaper, inspired, frost-waltz, investigations, sneaky-snitch | `hoat-hinh/timeline.json` → `music` | CC BY 4.0, Kevin MacLeod, có trong `music/GIAY-PHEP.md` và bằng chứng | Đạt, **phải ghi công trong mô tả** |
| 19 loại sfx (370 lượt) | `hoat-hinh/timeline.json` → `sfx` | Tự tổng hợp, có trong `sfx/GIAY-PHEP.md` | Đạt |
| Giọng Edge `en-US-AndrewNeural` | cả video | Ngoại lệ `CHO_PHEP_EDGE=1` | Cảnh báo (không quảng cáo) |
| Ảnh Commons, ảnh AI | **Không có.** Các file `*.jpg`/`*.png` trong `hoat-hinh/doan-*/` chỉ là `snapshots/` (ảnh chụp kiểm tra, không nạp vào cảnh); `40-nen.js` chỉ nhắc `giay.jpg` trong chú thích ("Thay assets/giay.jpg của bản thử B") | | Không áp dụng |

## Xem bằng mắt

Khung đã xem: `out/frames/tong-hop.jpg` (13 khung của script) và khung tự trích `out/frames/kd-*.jpg` ở mọi nhịp bản đồ (18,3 · 42,2 · 42,6 · 43,5 · 46,8 · 50,0 · 138,5 · 143,9 · 228,5 · 238,4 · 249,4 · 258,0 · 348,1 · 352,0 · 358,0 · 364,0 · 369,0 s), các chữ trên đồ vật (185,5 · 188,0 · 190,0 · 192,5 · 195,0 · 465,0 · 486,1 · 495,5 s), con dấu (644,6 · 645,2 · 645,9 · 646,4 · 647,0 · 647,5 · 648,0 s) và 20 giây cuối (641,8 · 643,0 · 652,0 · 656,0 · 660,0 · 661,6 s). Bảng ghép: `kd-m1.jpg`…`kd-m8.jpg`; `kd-m8.jpg` có khung đỏ đánh dấu vùng end screen. Video không có ảnh AI hay ảnh Commons nên không có mốc ảnh AI để trích.

| Mốc | Khung | Vấn đề | Mức (Chặn/Nên sửa) | Sửa ở bước nào |
|---|---|---|---|---|
| 0:42–0:44 | `kd-42.2.jpg`, phóng to `kd-42.2-cat-day.jpg`, `kd-42.2-bien-dong.jpg` | **Bản đồ, chủ quyền.** Nhãn dán `map-globe` ở trang sổ hiện tới tận Ấn Độ, Sri Lanka (khoảng 7°N), vịnh Bengal, quần đảo Andaman, Myanmar, bắc Đông Dương; mép dưới chạm đúng mép bắc vịnh Bắc Bộ (khoảng 21°N, ở x≈815–845, y≈895). **Không** thấy Hoàng Sa, Trường Sa, Hải Nam phía nam, không có đường lưỡi bò, ranh giới theo bản Natural Earth quan điểm VN, nên **không vi phạm**. Nhưng `ghi_chu_chu_quyen` của `map-globe` trong manifest ghi "khung cắt ở khoảng 30°N … không hiện Biển Đông": sai với hình thật | Nên sửa (hồ sơ) | Bước 3: sửa ghi chú `map-globe` trong `assets/manifest.json` cho đúng (khung xuống ~7°N ở 80°E, ~21°N ở 105–108°E; chạm mép bắc vịnh Bắc Bộ; không có đảo, không đường lưỡi bò), ghi người kiểm và ngày. Không cần sửa hình |
| 0:43,5 | `kd-43.5.jpg` | Lúc camera lướt sang `map-yakutia`, nhãn "Oymyakon" bị mép phải cắt còn "Oymya". Sang 0:46,8 (`kd-46.8.jpg`) nhãn đã trọn, chữ cao khoảng 70 px | Không sửa (chuyển động camera, dưới 1 s) | — |
| 3:04–3:09 | `tong-hop.jpg` ô 3:08, `kd-188.0.jpg` | Biển "POLE OF COLD" bị mép phải cắt ("POLE O"). Camera lia tới 3:10 (`kd-190.0.jpg`, `kd-192.5.jpg`, `kd-195.0.jpg`) thì biển hiện trọn, đọc rõ (chữ hoa cao khoảng 32–40 px) | Không sửa (lộ dần có chủ ý) | — |
| 0:00 | `kt-00.jpg` | Khung đầu không đen, không logo intro: bàn kỷ vật diorama, Wob rút con cá khỏi hộp. Câu hỏi được nói ("Why would anyone choose that?", khoảng 9,8 s), biển "OYMYAKON ~500" hiện từ 0:03 (`kt-01.jpg`). Đúng khuôn mở của định dạng hoạt hình (`van-phong-loi-doc.md`: Wob ở bàn cầm kỷ vật) | Đạt | — |
| 0:18 | `kd-18.3.jpg` | "PLAN: MOVE IN" nhỏ (khoảng 22 px) khi camera lùi; lúc hiện đúng chữ "move in" (14,4 s) đã đẩy vào, chữ khoảng 65 px (duyệt hình v2, d01). Chữ đạo cụ phụ | Đạt | — |
| 7:45 | `kd-465.0.jpg` | "≈ −52°C · −62°F" trên nhiệt kế ở cổng, chữ khoảng 44 px, có cả độ C và độ F, quy đổi đúng (−52°C ≈ −61,6°F) | Đạt | — |
| 2:18–2:24 | `kd-138.5.jpg`, `kd-143.9.jpg` | Bản đồ giấy trong tay Wob là hình vẽ tượng trưng (cây, đường đỏ, mặt trời), không phải bản đồ địa lý thật | Đạt | — |
| 3:48–4:25 | `kd-m1.jpg` (228,5 · 238,4 · 249,4 · 258,0 s) | `map-yakutia`, `map-tomtor`: chấm Oymyakon nằm tây bắc biển Okhotsk, Verkhoyansk ở phía bắc; nhãn "Oymyakon", "Verkhoyansk", "1892" đúng chính tả, chữ khoảng 50–60 px | Đạt | — |
| 5:51–6:02 | `kd-m2.jpg` (352,0 · 358,0 s) | `map-kolyma`: nhãn "Oymyakon", "Kolyma" đúng chính tả; khung nằm hẳn ở Viễn Đông Nga, không chạm Biển Đông | Đạt | — |
| 10:44,6–10:48 | `kd-644.6.jpg`, `kd-645.9.jpg`, `kd-m8.jpg` | **Con dấu đúng một lần**: NOPE (đúng nhãn của `verdict`, `timeline.json` cảnh 19 `label: NOPE`, `at: 645.2`); `dau-wob.wav` phát đúng 1 lần ở 645,2 s. Chữ "NOPE" ở 10:46,4–10:47,5 cao khoảng 80 px, đọc rõ. Trong `phan-canh.json`, "NOPE" chỉ có ở d40 (d38, d39 chỉ có từ "NOPE." trong lời đọc). Ở 645,9 s Wob và cán dấu còn che một phần chữ, 0,5 s sau thì hiện trọn | Đạt | — |
| 10:41,7–11:01,7 (20 s cuối) | `kd-641.8` · `643.0` · `644.6` · `645.9` · `646.4` · `647.0` · `647.5` · `648.0` · `652.0` · `656.0` · `660.0` · `661.6.jpg`, `kd-m8.jpg` (khung đỏ) | Vùng end screen x > 1150, y > 560 **không có chữ** ở mọi khung đã xem. Chữ gần nhất là "Would Wob move here?" ở 645,9 s, mép phải x≈1130, y≈715, cách biên 20 px. Trong vùng này chỉ có đạo cụ (tủ lạnh, sổ, nhà giấy). Câu cuối kết ở 11:00,1, video hết ở 11:01,8, không có khoảng im lặng dài | Đạt | — |
| cả video | `tong-hop.jpg` | Không có thẻ tiêu đề chương trên hình. Đúng định hướng hoạt hình ("Bỏ tấm giấy chuyển chương kiểu cũ", `docs/dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md` dòng 121); chương có trong `chapters.txt` để dán vào mô tả | Đạt | — |
| cả video | `tong-hop.jpg` | Chữ "chương" bị lỗi font trong nhãn của bảng ghép. Đây là lỗi hiển thị của `kiem_ky_thuat.py` khi vẽ nhãn, không nằm trong video | Lỗi công cụ, bỏ qua | — |

Không có người thật, không có cảnh trông như ảnh chụp, không có đùa về người dân trong các khung đã xem (người ở 10:46 là hình nộm giấy tròn trên trang sổ).

## Việc khi đăng

- **Not made for kids** ("No, it's not made for kids"). Nhân vật hoạt hình, nhưng khán giả mục tiêu là người lớn, nội dung có trại tù Kolyma.
- **Nhãn altered/synthetic: không bắt buộc.** Toàn bộ hình là hoạt hình vẽ bằng code, không có ảnh AI, không có cảnh trông như thật về người thật hay sự kiện có thật. Giọng TTS là giọng tổng hợp, không giả giọng người thật, nên không thuộc khoản 2 Điều 18 NĐ 142/2026. Dòng AI của kênh trong mô tả nên sửa cho đúng bản này: hình là hoạt hình vẽ bằng code, không phải "illustrations are AI-assisted"; giọng đọc là AI (TTS).
- **Không bật quảng cáo** (giọng Edge, `CHO_PHEP_EDGE=1`). Trước khi bật kiếm tiền phải lồng lại bằng Azure.
- Tải `out/captions.srt` (tiếng Anh) và dán `out/chapters.txt` (8 chương, bắt đầu 0:00) vào mô tả.
- **Ghi công trong mô tả: chỉ 5 bài nhạc Kevin MacLeod, CC BY 4.0** (theo `out/ghi-cong.txt` đã sửa). **Không** dán 11 dòng ghi công ảnh Commons trong bản `ban-quyen.md` do script sinh, vì các ảnh đó không có trong video. Có thể thêm "Maps: Natural Earth (public domain)" (không bắt buộc).
- Mô tả có mục Sources theo `kiem-chung/`; báo cáo độ xác thực `out/bao-cao-xac-thuc.md` của bản hoạt hình phải được sinh lại (bản cũ đã chuyển vào `out/v6-trinh-chieu/`).
