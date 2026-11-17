---
name: kiem-tra-video
description: Kiểm tra video dài World Wobble đã render trước khi giao, đăng: thông số 1920×1080, âm lượng, khung đen, khoảng lặng, khung đầu, chương, phụ đề SRT, bản quyền từng tài nguyên (sinh ban-quyen.md), chủ quyền bản đồ, giọng Azure, trùng lời với tập khác, rồi xem khung hình bằng mắt và ghi out/qa-report.md. Dùng ở bước 7 của /tao-video hoặc trước khi đăng bất kỳ video nào.
argument-hint: "<thư mục dự án>"
---

# Kiểm tra video

Đầu vào: `$ARGUMENTS`. Việc này nên giao agent `kiem-dinh-video` (chạy song song `phan-bien-video`).

## 1. Kỹ thuật

```bash
python3 .claude/skills/kiem-tra-video/scripts/kiem_ky_thuat.py <dự án>
```
LỖI: kích thước, khung hình, codec, độ dài lệch timeline, khung đen > 0,5 giây, khung đầu tối, âm lượng lệch −14 LUFS > 1 LU, true peak > −1, thiếu `captions.srt`/`chapters.txt`, chương đầu không ở 0:00. Ghi `out/ky-thuat.json` và bảng ảnh `out/frames/tong-hop.jpg`.

```bash
python3 .claude/skills/kiem-tra-video/scripts/kiem_dong_hinh.py <dự án>/out/video.mp4 --json <dự án>/out/dong-hinh.json --bo-cuoi 1.5
```
Đo chuyển động từng khung (17/11/2026): LỖI khi đứng hình ≥ 24 khung, khung đen, khung giật một nhịp; CẢNH BÁO khi đứng hình 12–23 khung, khung trắng. In tỉ lệ khung có chuyển động, số cắt cứng. Video hoạt hình phải đạt; luật camera ở `templates/hoat-hinh/_the-canh/NGU-PHAP-CAMERA.md`.

## 2. Bản quyền và tuân thủ

```bash
python3 .claude/skills/kiem-tra-video/scripts/kiem_tra_ban_quyen.py <dự án>
```
Sinh `ban-quyen.md` và `out/ghi-cong.txt`. CHẶN: tài nguyên thiếu căn cứ, Commons NC/ND, thiếu ghi công, ảnh AI thiếu prompt/model hoặc xin ảnh như ảnh chụp, bản đồ chạm vùng Biển Đông chưa kiểm, nhạc/sfx/font không có trong sổ, giọng Edge.

## 3. Xem bằng mắt

Mở `out/frames/tong-hop.jpg` (Read), kiểm từng khung:
- **t = 0**: hình nơi đó + câu hỏi, không đen, không logo intro; câu hỏi không đè ghim bản đồ.
- **Chữ**: đọc được ở cỡ TV (tiêu đề ≥ 72px, chữ phụ ≥ 40px), trong vùng an toàn (96px trái phải, 54px trên dưới), không chữ lỗi font.
- **Bản đồ**: đúng nơi, nhãn đúng chính tả, không sai chủ quyền.
- **Ảnh AI**: rõ là tranh vẽ, không chữ lạ, không lỗi hình; cảnh tái hiện sự kiện có thật thì có nhãn AI (manifest `tai_hien_su_kien`).
- **Con dấu**: đúng nhãn của `verdict`, đọc rõ.
- **20 giây cuối**: góc phải dưới trống cho end screen.

## 4. Ghi `out/qa-report.md`

```markdown
# Kiểm định: <tiêu đề>
## Kết luận: GIAO ĐƯỢC | PHẢI SỬA
## Kỹ thuật (kiem_ky_thuat.py): ĐẠT/KHÔNG ĐẠT · <lỗi, cảnh báo>
## Bản quyền (ban-quyen.md): ĐẠT/CÒN CHẶN · <mục>
## Xem bằng mắt
| Mốc | Khung | Vấn đề | Mức (Chặn/Nên sửa) | Sửa ở bước nào |
## Việc khi đăng
- Not made for kids · nhãn altered/synthetic: có/không và vì sao · tải captions.srt · dán chương
```

Lỗi Chặn thì vòng tự sửa của `/tao-video` xử lý, tối đa 3 vòng.
