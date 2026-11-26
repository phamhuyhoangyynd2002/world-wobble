# Duyệt hình: Santa Cruz del Islote (tập 4) · vòng 2

Chấm lại 15 đoạn thợ đã sửa và render lại: cắt giấy nhóm A (d02 d04 d05 d07 d10 d12 d15), cắt giấy nhóm B (d16 d19 d24 d29), vẽ tay (d17 d25), diorama (d30 d33). 18 đoạn không sửa giữ điểm vòng 1. Vòng 1 lưu ở `duyet-hinh.v1.md` / `.v1.json`.

Bằng chứng vòng này:
- Khung soi `soi/v2-*.jpg`, `soi/v2-gop-1.jpg`, `soi/v2-gop-2.jpg`, ảnh cắt `soi/v2-d15-crop*.png`.
- `kiem_dong_hinh.py` cho 15 đoạn sửa (`soi/dong-hinh-v2/`): **cả 15 ĐẠT** (d33: 80,1% khung có chuyển động).
- Đo riêng vùng end screen của d33 (x ≥ 1150 hệ 1920): sai khác giữa 1,5 s và 19,9 s ≤ 10/255, tức vẫn đứng yên, chỉ có nhiễu mã hoá.

## Kết luận tổng thể: ĐẠT (T: 15/16; vòng 1: 14/16) · CỔNG 6a: QUA

Đếm: **ĐẠT 33 · SỬA NHỎ 0 · LÀM LẠI 0** (vòng 1: ĐẠT 30 · SỬA NHỎ 2 · LÀM LẠI 1). Được ghép bản cuối.

### Lỗi ưu tiên đầu
- Không còn. Hai chỗ gần lỗi nặng ở vòng 1 đã sửa:
  - **d04:** thẻ `45 min–1 h` nay nằm sát nét đứt Tolú → đảo, đúng C06 (21–24 s).
  - **d16:** lúc câu CNN (7,7–11,8 s) không còn người ngồi giữa khung.

| T | Điểm | So vòng 1 | Nhận xét |
|---|---|---|---|
| T1 | 1 | 1 | Không đổi: khung 0 và thẻ hộ chiếu đạt; câu hỏi của tập ở 39 s nằm trong lời (việc của biên kịch). |
| T2 | 2 | 2 | Không đổi. |
| T3 | 2 | 2 | Không đổi. |
| T4 | 2 | 2 | Không đổi. |
| T5 | 2 | 2 | Gag yếu ở vòng 1 nay đọc được: bóng to rơi trúng mũ (d02, 12,6–12,9 s), Wob gật đầu cạnh vỏ sò (d12, 22,3–23,9 s). |
| T6 | 2 | 2 | Không đổi. |
| T7 | 2 | 1 → 2 | Võng d24 và d25 cùng sọc xanh ngọc–trắng. d15 chỉ còn một bình xịt. Bấm đếm tròn có kim ở cả d16, d17, d18. Mũ màu mới, ba lô ô liu, bình xịt niêm phong liền qua ba phong cách. |
| T8 | 2 | 2 | Như vòng 1. Thêm: d33 không còn đứng hình toàn khung, Wob thở và chớp mắt ở nửa trái, vùng end screen đứng yên. |

## Từng đoạn đã sửa

| Đoạn | Phong cách | D1..D10 | Tổng | Kết luận | So vòng 1 | Bằng chứng |
|---|---|---|---|---|---|---|
| d02 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Bóng to, rơi trúng vành mũ (12,6–12,9 s). |
| d04 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | SỬA NHỎ 18 → ĐẠT 20 | Thẻ `45 min–1 h` sát nét Tolú (21; 24 s). Khung cuối là cảnh thuyền (25,6–25,7 s), không còn giấy phẳng. |
| d05 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Wob ngước nhìn thánh giá, cỡ cảnh gần hơn (15,5–16,8 s). |
| d07 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Tranh cá không còn chạm mũ (29,5 s). |
| d10 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Mây bão trôi ngang trang, Wob kéo vành mũ (11,6–13,0 s). |
| d12 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 18 → 20 | Trung cảnh Wob gật đầu, mỉm cười cạnh vỏ sò trước khi phủ giấy (22,3–23,9 s). |
| d15 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Chỉ còn một bình xịt, túi hông trống (2,5 s; 6,8 s). |
| d16 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Không còn người ngồi ghế lúc câu CNN (8,1; 10,5 s). |
| d19 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Cận bình xịt gần nửa khung, tem đỏ rõ (15,3 s). |
| d24 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Wob nhắm mắt khi ngủ (7,0 s). |
| d29 | cat-giay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Hoa giấy ≈ 80 px trên trang sổ cận (7,8 s); Wob trầm. |
| d17 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | ĐẠT 19 → 20 | Bấm đếm tròn, mặt kim, không số (7,7 s). |
| d25 | ve-tay | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | LÀM LẠI 18 → ĐẠT 20 | Võng sọc xanh ngọc–trắng khớp d24 (0,4; 7,7 s); biên đạo giữ nguyên. |
| d30 | diorama | 2 2 2 2 2 1 2 2 2 2 | 19 | ĐẠT | 19 (giữ) | Sóng gõ từ chữ "sea". Nét sóng vẫn nhỏ ở mép đảo (24,0–25,2 s): chấp nhận. |
| d33 | diorama | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | SỬA NHỎ 17 → ĐẠT 20 | `kiem_dong_hinh` ĐẠT (80,1%). Wob đổi nét mặt, chớp mắt ở 3; 12; 17; 19,9 s. Vùng end screen đứng yên. Chấm lỗ treo thu nhỏ, tách khỏi chữ: đọc đúng `OYMYAKON`, `WHITTIER`. |

**Đoạn không sửa, giữ điểm vòng 1:**
- 20/20: d01 d03 d08 d09 d11 d13 d14 d21 d22 d23 d26 d27 d28 d31 d32.
- 19/20, chấp nhận không sửa:
  - d06: Wob nhỏ ở mép khung trong đoạn chèn 4,9 s.
  - d18: lối nhìn thẳng mặt tiền.
  - d20: Wob nửa người ở mép phải 0–1,5 s, lúc camera đang lướt tới.

## Việc còn lại
- **Thợ dựng, đạo diễn:** không còn việc.
- **Biên kịch:** T1 như các vòng trước (câu hỏi của tập ở 39 s), ghi cho tập sau.
- **Phiên chính, trước khi giao:** `out/captions.srt` (bản 02:19) vẫn còn 2 chỗ phiên âm `kar-tah-HAY-nah`, `toh-LOO`. Cần sinh lại phụ đề từ `audio/subtitles.json` mới (cảnh 3 đã khớp bằng whisper), rồi mới ghép và kiểm định.

## Vòng tự sửa 1 (sau kiểm định và phản biện)

Thay đổi: lời cảnh 1 (câu chào cố định của skill mo-ket) và cảnh 15 (viết lại phần phán quyết). d30–d33 dời +0,816 s, tổng 614,888 s. Đã render lại d01, d26, d30, d31, d32, d33.

Đã kiểm:
- Tờ khung mới của 6 đoạn, khung soi `soi/t1-*.jpg`.
- `kiem_dong_hinh.py`: **cả 6 ĐẠT** (`soi/dong-hinh-t1/`).
- Các đoạn nối liền, đoạn cuối hết ở 614,888.

**Kết luận: ĐẠT, cổng 6a giữ nguyên QUA (T 15/16). Không còn việc sửa.**

| Đoạn | D1..D10 | Tổng | Kết luận | Bằng chứng |
|---|---|---|---|---|
| d01 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Thẻ hộ chiếu lớn, tên nơi hai dòng đọc rõ (10,4 s), không che Wob, ngoài vùng logo. Câu chào mới vẫn rơi trong 10,03–14,5 s. |
| d26 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Mặt Wob nằm ngoài vùng logo (x > 1500, y < 150). Chỉ đỉnh đầu chạm mép góc ở 15; 22; 32,5 s, chấp nhận. Đầu không bị cắt. Ba nhãn có khung, ≥ 45 px. Wob trầm, không cười. |
| d30 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | NOPE to giữa khung từ 12,5 đến ≈ 15,2 s, rồi thu về ô con dấu (15,6 s). Ở "That stamp is about me" Wob đặt tay lên ngực mình (14,2 s). Dấu đè lên dòng chữ của hộ chiếu khi đang to, đúng bản chất con dấu; khi thu về thì mọi chữ đọc rõ. |
| d31 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Ba biểu tượng hiện lần lượt, không chữ: đồng hồ cát, thuyền, túi xách (1,2; 2,3; 3,3 s). Núi hành lý (6,6 s) có ba lô thứ hai nhỏ hơn ở giữa. Chấp nhận, xem ghi chú dưới bảng. Dù trên đỉnh núi, Wob vẫn đội mũ cói màu mới. |
| d32 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Ba lô rơi khỏi bàn ở "one small bag" (1,3 s). Đúng "very pleased" (≈ 9,6 s) muỗi ngồi vắt chân trên tem, Wob nhìn rồi mỉm cười (10,4 s). Câu hỏi cuối có cầu tàu và phao vịt (13,5 s). |
| d33 | 2 2 2 2 2 2 2 2 2 2 | 20 | ĐẠT | Chỉ dời mốc: các nhịp khớp lời mới (`Next:` ở 603,36 s). End screen trống, đứng yên. |

**Ghi chú d31:** ba lô thứ hai trong núi hành lý không phải lỗi liên tục, vì:
- đây là hình cường điệu, minh hoạ đúng chữ "a mountain of luggage";
- ba lô này nhỏ hơn và nằm giữa đống đồ;
- ba lô khổng lồ chính (có bình xịt ở túi hông) vẫn ở đáy.

Nếu muốn tránh người xem tưởng Wob có hai ba lô, đổi nó thành vali hoặc túi khác màu. Đây là tuỳ chọn, không bắt buộc.
