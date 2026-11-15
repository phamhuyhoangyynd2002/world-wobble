---
name: tao-video
description: Làm trọn một tập video dài YouTube (16:9, 10–15 phút, tiếng Anh) cho kênh World Wobble từ đề tài đến file MP4 kèm báo cáo độ xác thực: nghiên cứu, kịch bản, kiểm chứng hai mô hình (Claude + Gemini), tài nguyên (bản đồ vẽ bằng code, ảnh minh hoạ AI, ảnh Commons), giọng đọc Azure, render HyperFrames, kiểm định, SEO. Chạy tự động, không dừng duyệt giữa chừng; người làm kênh chỉ xem video cuối và báo cáo. Dùng khi người dùng muốn "làm video", "làm tập mới", "làm tập về <nơi>", "why do people live in…", "tập tiếp theo", hoặc chỉ đưa tên một nơi.
argument-hint: "<tên nơi hoặc đề tài> [ý chính...] | <thư mục dự án dở>"
---

# Làm một tập từ đề tài

Bạn là người điều phối. Tự chạy các bước, giao việc nặng cho agent, đi qua đủ các **cổng** trong `.claude/rules/quy-trinh-san-xuat.md`. Không có điểm dừng duyệt: cổng nào không đạt thì sửa tới khi đạt.

Đầu vào: `$ARGUMENTS`

Vì sao không dừng duyệt mà vẫn an toàn: kênh sống nhờ độ tin, nên thay người duyệt bằng kiểm chứng hai mô hình độc lập và báo cáo độ xác thực giao cùng video. Người làm kênh vẫn xem video cuối trước khi đăng.

## Bước 0 – Nhận đề tài, tạo dự án

1. Đọc `kenh/ho-so-kenh.md`, `kenh/bai-hoc.md`, và `brief.md` của 3 tập gần nhất trong `projects/`.
2. Đầu vào là thư mục dự án có sẵn → **Tiếp tục dự án dở**.
3. Không có đề tài: chọn đề tài chưa làm trong danh sách ý tưởng của hồ sơ kênh, hoặc gọi `/goi-y-chu-de`. Đề tài ngoài hướng của giai đoạn (giai đoạn 1: "Why do people live here?") thì hỏi một câu trước.
4. Tạo `projects/<YYYY-MM-DD>-<slug>/` (slug tiếng Anh không dấu, chữ thường, nối `-`, ≤ 50 ký tự).
5. Ghi `brief.md` và mở `nhat-ky.md`:

```markdown
# <Nơi, nước>
- Câu hỏi trung tâm: Why do people live in <nơi>?
- Thông điệp (nháp): This video tells <khán giả> that <...>
- Lập luận riêng của tập: <vì sao người ta sống ở đây: kinh tế, lịch sử, địa chất, văn hoá>
- Phán quyết dự kiến của Wob: WOULD MOVE | SUMMER ONLY | NOPE (chốt sau khi nghiên cứu)
- Khác các tập trước ở: <...>
- Vùng nhạy cảm: <có cần vẽ bản đồ gần Biển Đông, biên giới tranh chấp không>
- Mặc định đã áp dụng: 10–15 phút, template explainer, giọng <...>
```

**Cổng 0:** `brief.md` đủ các dòng trên.

## Bước 1 – Nghiên cứu, kịch bản

1. Agent `nghien-cuu-dia-diem` → `research.md`.
2. Agent `bien-kich-video` → `script.json` (có `claims`, `chapters`, `wob`, `verdict`).
3. `python3 .claude/skills/viet-kich-ban/scripts/validate_script.py <dự án>`. Có LỖI thì sửa tới khi hết.

**Cổng 1:** validate không LỖI.

## Bước 2 – Kiểm chứng hai vòng + tài nguyên (song song)

Chạy cùng lúc, mỗi bên ghi file riêng:
- Agent `kiem-chung-thong-tin` (vòng 1, Claude) → `kiem-chung/vong-1-claude.json`. Prompt **không** kèm kết quả Gemini.
- `python3 .claude/skills/kiem-chung/scripts/gemini_kiem_chung.py <dự án>` (vòng 2) → `kiem-chung/vong-2-gemini.json`.
- Agent `thu-thap-tai-nguyen` → `assets/` + `assets/manifest.json` (không phụ thuộc kết quả kiểm chứng).

Rồi theo skill `/kiem-chung`: `doi_chieu.py`, xử lý từng việc (sửa lời, hedge, bỏ, tra lần ba), ghi `kiem-chung/da-sua.json`, kiểm lại phần đã đổi, lặp tới khi cổng đạt. Sửa `script.json` thì sao lưu `script.v<N>.json` và chạy lại validate.

**Cổng 2:** `doi_chieu.py <dự án> --cong` mã 0.
**Cổng 3:** `kiem_tra_ban_quyen.py <dự án> --som` mã 0; mọi `asset:<id>` trong `shots` có trong manifest (validate đã kiểm).

## Bước 3 → 7 – Tự chạy liền mạch

| Bước | Cách làm | Cổng |
|---|---|---|
| 4 Giọng đọc | Skill `/long-tieng` (Azure) | Mọi cảnh `timing` = `tts` hoặc `whisper`; `nghe_lai.py` mã 0 |
| 5 Timeline | Skill `/long-tieng` (`build_timeline.py`) | Mã 0; đọc hết CẢNH BÁO |
| 6 Render + trộn âm | Agent `bien-tap-video` (skill `/xuat-video`) | `hyperframes check` 0 lỗi; 2 bản MP4; khoảng −14 LUFS |
| 7 Kiểm định | Agent `kiem-dinh-video` **song song** agent `phan-bien-video`; rồi `bao_cao.py` | `kiem_ky_thuat.py` mã 0; `ban-quyen.md` 0 CHẶN; `bao_cao.py` ĐẠT |
| 7 SEO | Agent `seo-youtube`, song song bước 6–7 | `out/seo.md` đủ mục, mô tả ≤ 5000 ký tự |

- **Vòng tự sửa**: lỗi chặn, hoặc 5 việc đầu của `phan-bien-video` mà sửa được → sửa → chạy lại từ bước bị ảnh hưởng → kiểm lại. Tối đa 3 vòng.
- Sửa lời sau khi đã kiểm chứng: khẳng định bị đổi phải kiểm lại cả hai vòng (`gemini_kiem_chung.py --only C07`, agent vòng 1 chỉ cho C07), rồi `doi_chieu.py --cong`.
- Sau mỗi bước, thêm một dòng vào `nhat-ky.md`, kèm chi phí API nếu có.

## Giao video

Gửi người làm kênh, theo thứ tự:
1. `out/video.mp4` (độ dài, dung lượng) và bảng ảnh `out/frames/tong-hop.jpg`.
2. **Báo cáo độ xác thực** `out/bao-cao-xac-thuc.md`: kết luận cổng, số khẳng định mỗi mức, các chỗ hai mô hình lệch và cách xử lý.
3. Phán quyết của Wob và lý do (người làm kênh xác nhận khi xem; ghi vào `nhat-ky.md`).
4. Tóm tắt kiểm định + 3 nhận xét đáng giá nhất của phản biện (kể cả phần chưa sửa).
5. Từ `out/seo.md`: tiêu đề, 2 phương án thumbnail, mô tả rút gọn.
6. Việc khi đăng: chọn "Not made for kids"; nhãn "altered or synthetic" chỉ khi có cảnh như thật về người thật, sự kiện có thật; tải `out/captions.srt`; dán chương; gọi `/dang-bai` nếu muốn Claude điền form.
7. Chi phí tập này (Azure ký tự, Gemini lượt gọi, ảnh).

Còn mục CHẶN trong `ban-quyen.md` hoặc báo cáo KHÔNG ĐẠT thì **không giao**, nói rõ lỗi. Nhắc: sau 7 ngày dán số liệu vào `/phan-tich-hieu-qua`.

## Tiếp tục dự án dở

Đọc `nhat-ky.md`, tóm tắt phiên trước trong **một câu**, rồi xác định bước tiếp theo theo file đã có:
- Có `brief.md`, chưa có `script.json` → Bước 1.
- Có `script.json`, `doi_chieu.py --cong` chưa đạt → Bước 2.
- `script.json` mới hơn `audio/subtitles.json` → Bước 4 (chỉ các cảnh đổi lời: `--only`).
- `timeline.json` cũ hơn `audio/subtitles.json` hoặc `assets/manifest.json` → Bước 5.
- `timeline.json` mới hơn `out/video.mp4` → Bước 6.
- Có video, chưa có `out/bao-cao-xac-thuc.md` → Bước 7.

File bị sửa sau dòng cuối của `nhat-ky.md` là chủ ý của người làm kênh: làm tiếp dựa trên bản đó.

## Sửa nhanh sau khi xem video

| Yêu cầu | Chạy lại từ |
|---|---|
| Sửa lời một cảnh | `script.json` → validate → kiểm chứng lại khẳng định bị đổi → giọng `--only` → timeline → render |
| Đổi ảnh, bản đồ | Bước 3 cho tài nguyên đó → `--som` → timeline → render |
| Đổi giọng, tốc độ | Bước 4 → 5 → 6 |
| Đổi nhạc, âm lượng nhạc | `build_timeline.py --music` → chỉ chạy lại `mix_audio.py` |
| Đổi phán quyết | Sửa `verdict` + lời cảnh cuối → validate → giọng cảnh cuối → timeline → render |
