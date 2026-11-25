# Kiểm định: Locked Out of a Town That Lives in One Building (tập 3, Whittier, Alaska)

Ngày kiểm: 2026-11-24 · Người kiểm: agent kiểm định (không tham gia làm video) · Video: `out/video.mp4` (9:50,97, 1920×1080, 30 fps)

## Kết luận: GIAO ĐƯỢC

Không có lỗi mức Chặn. Có 6 việc Nên sửa (chủ yếu là chữ bị che và con dấu tràn khung). Nếu không sửa thì vẫn giao được, nhưng phải đặt end screen đúng như mục "Việc khi đăng".

## Kỹ thuật (kiem_ky_thuat.py): ĐẠT · 0 lỗi, 1 cảnh báo

- Cảnh báo: khoảng lặng 444,7–447,7 s (3,1 s). **Lặng có chủ ý:** `hoat-hinh/phan-canh.json` ghi d23 (động đất 1964) "lặng 1,5 s trước và sau, nhạc tắt ở cuối d22". Trong lúc lặng hình vẫn chạy: camera trôi chậm sang phải dọc cầu tàu, đèn thuyền sáng dần, cuối đoạn mờ chuyển sang d24 (khung `qa/kd-444.jpg`, `kd-445.5.jpg`, `kd-446.5.jpg`, `kd-447.5.jpg`). Không cần sửa.
- Âm lượng (`out/audio-report.json`): video.mp4 −14,1 LUFS, true peak −1,0 dBTP (đúng sát ngưỡng ≤ −1); video-no-music.mp4 −14,8 LUFS, TP −1,9.
- Đo chuyển động (`out/dong-hinh.json`): ĐẠT, 92,7 % khung có chuyển động, đoạn đứng lâu nhất 15 khung. Ghi chú: script đo trên `hoat-hinh/out/video.mp4`, không đo trên `out/video.mp4`. Hai file cùng độ dài 590,97 s nên coi là cùng hình.
- Chương (`out/chapters.txt`): 8 chương, chương đầu ở 0:00, chương ngắn nhất là "March 27, 1964" dài 27 s (≥ 10 s).

## Bản quyền (ban-quyen.md): ĐẠT · 0 mục CHẶN

- Cảnh báo: giọng Edge TTS `en-US-AndrewNeural`, được tạm cho phép vì có `CHO_PHEP_EDGE=1`. **Không bật quảng cáo** cho video này. Trước khi kiếm tiền phải lồng lại bằng Azure, cùng tên giọng.
- Tài nguyên hình trong video cuối chỉ có `map-whittier` (Natural Earth bản quan điểm Việt Nam, 00:19–00:30). Đã grep `hoat-hinh/doan-d*`: không đoạn nào dùng ảnh AI. 10 ảnh ComfyUI trong manifest không có mặt trong video, vì `phan-canh.json` cho thợ dựng vẽ lại bằng thư viện.
- Nhạc: 6 bài Kevin MacLeod CC BY 4.0, có trong sổ. Mô tả phải chép đủ `out/ghi-cong.txt`.

## Xem bằng mắt

Khung lưu ở `out/frames/qa/`: `kd-<giây>.jpg`, bảng ghép `sheet-a…d.jpg`, `sheet-cuoi.jpg`, ảnh cắt `crop-240.jpg`.

| Mốc | Khung | Vấn đề | Mức (Chặn/Nên sửa) | Sửa ở bước nào |
|---|---|---|---|---|
| 0:00–0:05 (d01) | `kd-0.jpg`, `kd-1.jpg`, `kd-5.jpg`, `tong-hop.jpg` | Đạt. Khung 0 là hình cổng hầm một làn trong tuyết, có Wob và đèn đỏ. Không đen, không có logo intro. Câu hỏi để thẻ hộ chiếu nói (theo skill mo-ket). Logo kênh nằm ở x 1505–1822, y 55–130, trong vùng an toàn | — | — |
| 0:10–0:13 (d01) | `kd-10.5.jpg`, `kd-12.jpg`, `kd-13.5.jpg` | Đạt. Thẻ hộ chiếu "WHITTIER · ALASKA · Would Wob move here?" ở góc trái trên, chữ to (tên nơi cao khoảng 50 px chữ hoa, dòng câu hỏi khoảng 40 px), không che mặt Wob. Mép trái thẻ ở x ≈ 97, y ≈ 55, vừa chạm vùng an toàn 96/54 | — | — |
| 0:21–0:31 (d02, bản đồ) | `kd-21.jpg`, `kd-24.jpg`, `kd-27.jpg`, `kd-30.jpg` | Bản đồ đúng nơi: ghim nằm ở bờ Prince William Sound, Alaska tô cam, Canada màu kem. Không chạm vùng Biển Đông, không sai chủ quyền. Nhãn viết đúng "WHITTIER", "ALASKA". **Nhưng nhãn bị che:** ở 0:24 núi giấy che chữ "AL" của ALASKA (chỉ còn "ASKA"). Từ khoảng 0:26,5 tới hết đoạn (0:30,7), toà pop-up 14 tầng che nửa sau chữ "WHITTIER", đọc thành "WHITTIEP". Thêm nữa, cạnh chân ghim có một chấm đỏ thừa (0:21 thấy hai vòng đỏ chồng nhau ở khoảng x 955, y 412 và x 972, y 428), có lẽ là dấu `marks` của SVG nằm chồng dưới ghim động | Nên sửa | Dựng lại d02 (thợ diorama): dời toà sang phải ra khỏi nhãn hoặc dời nhãn; tắt chấm `marks` của SVG khi dùng ghim động → ghép lại → kiem_ky_thuat |
| 2:17 (d06) | `kd-137.jpg`, `tong-hop.jpg` ô 2:19 | Xe đỏ trong hầm là sedan mui cứng màu nâu, còn ở d01, d03, d24, d29 là xe mui trần màu đỏ gạch. Hình không liền mạch | Nên sửa | d06 (thợ diorama): dùng đúng xe mui trần, hoặc cho mui đóng có vải thay vì sedan |
| 4:00 (d11) | `crop-240.jpg`, `sheet-a.jpg` | Chữ "BEGICH TOWERS" trên tờ sơ đồ chỉ cao khoảng 22 px chữ hoa (cỡ font khoảng 30 px), nhỏ hơn mức chữ phụ ≥ 40 px, khó đọc trên TV. Chữ "HODGE" gạch ngang cũng cùng cỡ | Nên sửa | d11: phóng chữ lên ≥ 40 px hoặc zoom camera vào tờ giấy lúc chữ hiện |
| 2:39, 4:58, 5:20, 5:50, 8:00 | `sheet-a.jpg`, `sheet-b.jpg`, `sheet-c.jpg` | Đạt. Nhãn đúng chính tả: "Portage Pass", "Cook Inlet", "~52 mi", "POST OFFICE", "BUCKNER", "~1960 ?", "ASBESTOS", "47 in · 1.2 m", "2026 · WWII Heritage City" | — | — |
| 7:02–7:27 (d23, động đất 1964) | `kd-422.jpg`, `kd-424.jpg`, `kd-432.jpg`, `kd-440.jpg` | Đúng hướng "nghiêm": chỉ có trang sổ ghi "March 27, 1964" và "13". Không vẽ sóng, người hay toà đổ, không gag, không sfx. **Nhưng Wob giữ nụ cười mặc định** (miệng cong, má hồng) đúng lúc lời nói về 13 người chết (khung 7:12). Vẻ mặt không hợp với nội dung tang thương | Nên sửa | d23 (thợ cắt giấy): đổi biểu cảm Wob sang trầm/buồn (miệng thẳng, mắt cụp) suốt d23 → ghép lại |
| 7:24–7:28 (d23→d24) | `kd-444.jpg` … `kd-447.5.jpg` | Lặng 3,1 s có chủ ý, hình vẫn trôi (xem mục Kỹ thuật) | — | — |
| 9:04–9:05 (d29, con dấu) | `kd-544.4.jpg`, `kd-545.4.jpg`, `sheet-c.jpg` | Nhãn đúng **SUMMER ONLY**, khớp `verdict`, đọc rõ, nằm trong vùng x < 1100. **Nhưng chữ tràn khung con dấu:** chữ "S" đè lên viền trái, chữ "Y" lấn ra ngoài viền phải của khung đỏ, ở mọi khung từ 9:04 tới 9:20 | Nên sửa | d29: thu cỡ chữ con dấu hoặc nới khung (áp cả cho thư viện con dấu dùng chung để tập sau không lặp lỗi) |
| 9:31–9:51 (d30, 20 giây cuối) | `sheet-cuoi.jpg` (573, 577, 583, 586–590 s), `sheet-d.jpg` | Không có chữ trong góc x > 1150, y > 560 (đạt luật chữ). Nhưng từ 9:31 tới khoảng 9:46, **Wob đứng ngay trong góc end screen** (x ≈ 1260–1840, y ≈ 400–920). Hai khung trống và vòng tròn chỉ bật lên đủ từ khoảng 9:47,7, tức chỉ còn khoảng 3,3 s trước khi video hết, trong khi end screen YouTube dài tối thiểu 5 s. Skill mo-ket muốn vùng này trống suốt đuôi tập | Nên sửa | d30: cho Wob đứng bên trái và cho khung end screen bật lên sớm (≥ 5–10 s trước khi hết). Nếu không sửa: đặt end screen 5 s cuối (từ 9:46) |
| Toàn video | `tong-hop.jpg`, mọi `kd-*` | Không có ảnh AI, không có hình giống ảnh chụp, không chữ lạ hay lỗi font. Hình đều là cắt giấy / vẽ tay / diorama vẽ bằng code | — | — |

**Cảnh 1964 và nhãn AI (Nghị định 142/2026, khoản 2 Điều 18):** manifest không có tài nguyên nào có `tai_hien_su_kien`. Cảnh d23 không tái hiện trận động đất hay sóng thần: chỉ có chữ ngày tháng, con số và cầu tàu tĩnh. Video cũng không mô phỏng ngoại hình hay giọng người thật. Vì vậy **không bắt buộc gắn nhãn AI trên hình**. Mô tả vẫn có dòng AI theo chính sách kênh, vì giọng đọc là TTS. Nếu sau này d23 được sửa thêm hình sóng hay toà đổ thì phải gắn nhãn trên hình ở cảnh đó và ghi trong mô tả.

## Việc khi đăng

- **Not made for kids** (phim hoạt hình nhưng nói về thảm hoạ 1964, khán giả mục tiêu là người lớn).
- Nhãn "altered or synthetic content": **không**. Video là hoạt hình hoàn toàn, không có cảnh trông như thật về người thật hay sự kiện có thật. Cảnh 1964 chỉ có chữ.
- Mô tả phải có: dòng "Narration voice and illustrations are AI-assisted. Every claim was checked by two independent AI models against the sources listed below.", mục Sources, và ghi công nhạc lấy từ `out/ghi-cong.txt` (6 bài Kevin MacLeod, CC BY 4.0).
- **Không bật quảng cáo** (giọng Edge TTS). Trước khi kiếm tiền phải lồng lại bằng Azure.
- Tải `out/captions.srt`, dán chương từ `out/chapters.txt`.
- End screen: nếu chưa sửa d30 thì đặt **5 s cuối (từ 9:46)**, khớp với hai khung trống ở bên phải (y khoảng 150–465 và 500–815) và vòng đăng ký bên dưới. Không đặt 20 s vì sẽ đè lên Wob và bản đồ nhá tập sau.

## Vòng sửa 1 (24/11/2026, phiên chính)

Đã sửa và ghép lại (591,27 s): d02 nhãn ALASKA/WHITTIER đọc trọn, bỏ chấm đỏ thừa (SVG bản sao bỏ 2 vòng marks, dữ liệu bản đồ giữ nguyên); d11 chữ sơ đồ 45–56 px; d19 nhãn "~5 m · ~16 ft" ra khỏi vùng logo; d23 Wob mặt trầm, nhãn "13 lives lost"; d28–d29 theo lời cảnh 15 mới, bảng 23:15, con dấu to giữa khung, chữ gọn trong viền; d30 Wob và bản đồ dồn trái, hai khung + vòng end screen đứng yên từ ~575,2 s tới hết (~16 s). Không sửa: d06 xe sedan (đã chấp nhận ở 6a).

Kiểm lại: kiem_dong_hinh ĐẠT (92,4%, tĩnh dài nhất 14 khung); kiem_ky_thuat ĐẠT (lặng 444,7–447,7 s có chủ ý); ban-quyen.md 0 chặn (cảnh báo Edge); doi_chieu --cong ĐẠT; bao-cao-xac-thuc.md ĐẠT. Xem khung out/frames/vong1/sheet.jpg.

**Kết luận sau vòng 1: GIAO ĐƯỢC.** End screen: đặt 15–16 s cuối (từ khoảng 9:35), khớp hai khung bên phải và vòng tròn dưới.
