# Kiểm định: This Arctic Town Is Moving Away From Its Own Mine (tập 6, Kiruna)

Ngày kiểm: 28/11/2026 · Người kiểm: agent kiểm định (không tham gia làm tập) · Video: `out/video.mp4` (render 21:31, sau lần sửa d42/d44 lúc 20:56, nên là bản mới nhất).

## Kết luận: GIAO ĐƯỢC

Không có lỗi Chặn. Có 2 việc Nên sửa về hình (nhãn "Per Geijer" trượt ra mép trên và đè logo; nhãn "Kiruna" bị que chỉ che thoáng qua), 1 việc Nên sửa về âm (true peak bản không nhạc) và vài lỗi nhỏ ở phụ đề. Sửa được trong một vòng, không cần sửa trước khi giao.

## Kỹ thuật (kiem_ky_thuat.py): ĐẠT · 0 lỗi, 0 cảnh báo

- `out/ky-thuat.json`: 719,424 s (12:00), khớp timeline 719,412 s. ffprobe cả hai bản: H.264 2560×1440, 30 fps, AAC 48 kHz (mono).
- Âm lượng (`out/audio-report.json`): video.mp4 −14,2 LUFS, TP −1,0 dBTP (đúng sát ngưỡng). **video-no-music.mp4 TP −0,7 dBTP, vượt ngưỡng ≤ −1** (Nên sửa, xem bảng).
- Chuyển động (`hoat-hinh/out/dong-hinh.json`): 91,9 % khung có chuyển động, đứng hình dài nhất 21 khung (< 24), ĐẠT.
- Chương (`out/chapters.txt`): 8 chương, chương đầu 0:00, chương ngắn nhất 87 s (≥ 10 s). Không lộ đáp án (Narvik/ice-free không có trong tên chương).
- Phụ đề (`out/captions.srt`): 281 khối, kết ở 11:52,9 (đuôi 20 s không lời là chủ ý). Có 5 chỗ khối sau bắt đầu sớm hơn khối trước kết thúc 0,05–0,1 s (#44, #117, #184, #229, #246); 5 khối chỉ một chữ mồ côi ("down.", "Union.", "finally.", "gone.", "move."); 4 dòng dài 43–45 ký tự (#42, #115, #158, #229). YouTube vẫn nhận, nhưng nên sửa (xem bảng).

## Bản quyền (ban-quyen.md): ĐẠT · 0 CHẶN, 1 cảnh báo

- Hình: chỉ 3 bản đồ vẽ bằng code (Natural Earth bản quan điểm Việt Nam): `map-kiruna`, `map-kiruna-rail`, `map-kiruna-centre`. Không ảnh AI, không ảnh Commons (`anh_ai = []`, định dạng hoạt hình). Không bản đồ nào chạm vùng Biển Đông (khung Bắc Âu).
- Nhạc: 5 bài Kevin MacLeod CC BY 4.0, có trong sổ và bằng chứng; câu ghi công ở `out/ghi-cong.txt` phải dán vào mô tả.
- Sfx: 18 file tự tổng hợp, có trong sổ. Font Fraunces OFL. Thư viện GSAP (giấy phép Standard No Charge), three.js MIT.
- **Cảnh báo:** giọng Edge TTS `en-US-AndrewNeural`, chỉ chạy được nhờ `CHO_PHEP_EDGE=1`. **Không bật quảng cáo** cho video này; trước khi kiếm tiền phải lồng lại bằng Azure cùng tên giọng.
- Lỗi nhỏ của bộ sinh hồ sơ (không chặn): dòng GSAP trong `ban-quyen.md` bị cắt cụt ("tải từ … ngày ", "từ 2"), do script cắt chuỗi từ `templates/_shared/vendor/GIAY-PHEP.md`.

## Xem bằng mắt

Đã xem `out/frames/tong-hop.jpg` (13 khung) và 46 khung trích thêm ở mọi nhịp bản đồ (mốc `timeline.scenes[].shots`), mọi đoạn nghiêm d38–d43 (561–651 s), con dấu (679–698 s), đuôi tập (702–719 s); cùng hai dãy dày quanh 214–228 s và 612–626 s. Khung trích thu về hệ 1920×1080 để đo trực tiếp theo ngưỡng. Khung ở `D:/YouTube/world-wobble/tmp/kiem-dinh-t6/` (lưới xem nhanh `luoi-00…11.jpg`, `day-r.jpg`, `day-p.jpg`, `day-p2.jpg`); khung làm bằng chứng chép vào `out/frames/kd-*.jpg`.

| Mốc | Khung | Vấn đề | Mức (Chặn/Nên sửa) | Sửa ở bước nào |
|---|---|---|---|---|
| 10:16–10:21 (≈616,5–620,5 s, d41) | `out/frames/kd-618.jpg`, `kd-620.jpg`, `D:/…/kiem-dinh-t6/day-p2.jpg` (617, 619, 621 s) | Camera của d41 kéo nhãn "Per Geijer" lên quá mép trên: ở 617–619 s đỉnh chữ ở y ≈ 0 (ngoài lề an toàn 54 px, chữ bị cắt nửa trên), ở 620 s nhãn trượt xuống nằm dưới logo "World Wobble", đuôi chữ "r" bị logo che ("Per Geije"). Kéo dài khoảng 4 s, đúng đoạn nghiêm Gabna–LKAB, chỗ người xem cần đọc tên mỏ. 6a đã cho d41 ĐẠT nên lỗi lọt qua tờ khung | Nên sửa | `/dung-hoat-hinh`: sửa đường camera (hoặc vị trí nhãn) trong `hoat-hinh/doan-d41/canh.js` để nhãn luôn ở y ≥ 54 và không chồng vùng logo (x > ~1480, y < 140 hệ 1920); dựng lại d41, ghép lại, chạy lại `kiem_ky_thuat.py` |
| 3:42 (≈221,5–223 s, d17) | `out/frames/kd-222.jpg`, `D:/…/kiem-dinh-t6/day-r.jpg` | Lần đầu nhãn bản đồ "Kiruna" hiện ra thì que chỉ xanh đậm của Wob nằm đè chữ "a" (đọc thành "Kirun"). Từ 224 s nhãn sạch. Chỉ khoảng 1 s, người xem vẫn hiểu | Nên sửa (nhẹ) | `/dung-hoat-hinh`: d17 lùi que chỉ sang phải ghim hoặc hiện nhãn sau khi que rút; không bắt buộc |
| Cả video | `out/audio-report.json` | `video-no-music.mp4` true peak −0,7 dBTP (> −1). `video.mp4` −1,0 dBTP, đúng ngưỡng, không dư | Nên sửa | `mix_audio.py` chạy lại bản không nhạc với limiter −1,5 dBTP (mục tiêu TP −1,5 có trong báo cáo nhưng bản không nhạc không đạt) |
| 1:50, 4:57, 7:45, 9:34, 10:24 | `out/captions.srt` #44, #117, #184, #229, #246 | Khối phụ đề chồng khối trước 0,05–0,1 s; ngay trước mỗi chỗ là khối một chữ mồ côi. Thêm 4 dòng > 42 ký tự (#42, #115, #158, #229) | Nên sửa (nhẹ) | `xuat_timeline.py`/bước chia phụ đề: gộp chữ mồ côi vào khối trước, kẹp đầu khối không sớm hơn cuối khối trước, ngắt dòng ≤ 42 ký tự; xuất lại `captions.srt` (không cần render lại hình) |
| 0:00 | `out/frames/kt-00.jpg`, `D:/…/kd-1.5.jpg` | Không đen, không logo intro: Wob ở bàn cầm chìa khoá, bản đồ Bắc Âu trên bàn (Thuỵ Điển tô cam, nét Vòng Bắc Cực). Không có chữ câu hỏi trên hình ở t = 0; câu hỏi nằm trong lời và trong thẻ hộ chiếu 12,65–15,96 s (`kd-14.jpg`) | Ghi nhận | Thẻ hộ chiếu sớm hơn mặc định 20–35 s; đã ghi lý do trong `nhat-ky.md` (gộp với câu chào). Không cần sửa |
| 11:20,9–11:24 (680,9 s, d46) | `out/frames/kd-681.5.jpg`, `D:/…/kd-684.jpg`, `z-681.jpg` | Con dấu **SUMMER ONLY** khớp `verdict` cảnh 16, đọc rõ, có `dau-wob.wav` đúng một lần ở 680,921 s (timeline `sfx` chỉ có 1 lần). Đã soát mã: chỉ `doan-d46` dùng con dấu (các `lib/dao-cu.js` chỉ là thư viện đạo cụ). Chữ "SWEDEN" trên bưu thiếp lộ xuyên dưới con dấu, chữ "Y" chạm khung con dấu: thẩm mỹ, không ảnh hưởng đọc | Ghi nhận | Không cần sửa |
| 11:39–11:59 (699,4–719,4 s, d47) | `out/frames/kd-708.jpg`, `D:/…/kd-702.jpg`, `kd-714.jpg`, `kd-719.jpg`, `kt-11.jpg`, `kt-12.jpg` | Đuôi tập đúng 20 s. Góc phải dưới (x > 1150, y > 560 hệ 1920) chỉ có hai khung trống và vòng tròn trống cho end screen; nhãn kệ (OYMYAKON, KIRUNA, …) và Wob đều ở x < 1150. Logo ở góc trên phải, ngoài vùng. Không im lặng, không khung đen | ĐẠT | — |
| 9:21–10:51 (561–651 s, d38–d43, đoạn nghiêm Sámi/Gabna) | `D:/…/kd-564…649.jpg`, `out/frames/kd-595.jpg`, `D:/…/z-nguoi.jpg` | Không gag, không sfx hài; Wob mặt nghiêm. Người chăn tuần lộc (595 s) là người que nhỏ, **không vẽ mặt**; không chân dung Kuhmunen hay Moström (d41 dùng hai thẻ GABNA / LKAB cùng cỡ). Lời đọc cân bằng hai phía, nói rõ ai nói gì ("has said", "According to the Swedish news agency TT"), không đùa về người dân. Biển tên "Kiruna / Giron" (518 s) dùng đúng tên Bắc Sámi | ĐẠT | — |
| Bản đồ (0:00–0:57, 3:36–4:21, 4:57–10:47, 10:50–11:39) | `D:/…/kd-1.5, 10, 14, 222, 245, 595, 610, 630.jpg`, `r-224…228.jpg` | Bắc Âu đúng nơi: Kiruna trong Thuỵ Điển gần biên giới Na Uy, Narvik ở bờ biển Na Uy, Luleå ở vịnh Bothnia. Nhãn đúng chính tả: "Kiruna", "Narvik · ice-free", "Luleå · freezes in winter", "1900", "Luossavaara", "Per Geijer". Biên giới Na Uy, Thuỵ Điển, Phần Lan, Nga không tranh chấp; không chạm Biển Đông. Bản đồ trung tâm (map-kiruna-centre) là bản vẽ giấy không biên giới quốc gia | ĐẠT | — |
| Chữ trên hình (toàn video) | `luoi-00…11.jpg` | Mọi nhãn đo trên khung 1920: chiều cao chữ ≈ 44–80 px (nhãn bản đồ ≥ 34, chữ phụ ≥ 40). Không lỗi font, không ô vuông. Trong lề an toàn, trừ lỗi d41 ở trên. Chữ nhỏ trên bưu thiếp đặt trên bàn (≈ 20 px, 655 s, 679 s, 690 s) là đạo cụ lặp lại thẻ hộ chiếu đã hiện to, không phải khối chữ mới | ĐẠT | — |
| Ảnh AI | — | Không có ảnh AI trong video (manifest chỉ 3 bản đồ code; `anh_ai = []`). Cảnh dời nhà thờ (5:03–5:21, `kd-312.jpg`, `kd-360.jpg`, `kd-385.jpg`) là hoạt hình vẽ bằng code, rõ là tranh vẽ; người xem đứng xem là người que không mặt | ĐẠT | — |

## Việc khi đăng

- **Not made for kids.**
- **Nhãn altered/synthetic của YouTube: không.** Video là hoạt hình hoàn toàn, không cảnh nào trông như thật về người thật hay sự kiện có thật; giọng đọc AI không mô phỏng giọng người thật. Cảnh dời nhà thờ Kiruna 2025 là tái hiện sự kiện có thật nhưng bằng hình vẽ code rõ là hoạt hình, không phải ảnh AI, nên không vào diện Nghị định 142/2026 khoản 2 Điều 18 về ảnh AI tái hiện sự kiện; vẫn giữ dòng công bố AI của kênh trong mô tả (giọng đọc là AI). Gợi ý cho SEO: trong dòng công bố, chữ "illustrations are AI-assisted" không đúng với tập này (hình vẽ bằng code, không ảnh AI); nên viết theo đúng thực tế.
- **Không bật quảng cáo** (giọng Edge, `CHO_PHEP_EDGE=1`). Trước khi bật kiếm tiền: lồng lại bằng Azure, render lại, xoá cờ.
- Tải `out/captions.srt` (nên sửa các lỗi nhỏ ở trên trước khi tải).
- Dán chương từ `out/chapters.txt` (8 chương, bắt đầu 0:00).
- Dán ghi công nhạc từ `out/ghi-cong.txt` (5 bài Kevin MacLeod CC BY 4.0) và mục Sources vào mô tả.
- End screen: đặt hai video vào hai khung trống bên phải và nút đăng ký vào vòng tròn, trong 20 s cuối (11:39–11:59).
