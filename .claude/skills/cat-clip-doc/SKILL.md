---
name: cat-clip-doc
description: Cắt clip dọc 9:16 (1080×1920, 30–60 giây) từ video dài đã làm xong của World Wobble cho YouTube Shorts, TikTok, Instagram Reels, Facebook Reels. Gợi ý đoạn đáng cắt theo timeline.json (khẳng định, câu mở, punchline, không lộ phán quyết), rồi dựng lại bố cục dọc: câu mồi trên, cảnh hoạt hình cắt 4:3 ở giữa, phụ đề to sáng từng từ, Wob nhún nhảy, thẻ cuối dẫn về bản dài; kèm chữ đăng cho từng nền tảng. Dùng khi người làm kênh nói "cắt Shorts", "làm clip TikTok/Reels", "clip dọc", hoặc sau khi một tập đã có out/video.mp4.
argument-hint: "<thư mục dự án> [--so 5] [--chi k1,k3]"
---

# Cắt clip dọc từ video dài

Đầu vào: `$ARGUMENTS`. Luật: `.claude/rules/video-dai-youtube.md` mục "Shorts cắt từ video dài" (chỉ cắt từ video dài, đoạn tự đứng được, dựng lại khung 9:16 chứ không chỉ thêm viền, dẫn về bản dài, **không thêm khẳng định mới**).

## Điều kiện trước

- Dự án có `out/video.mp4` bản cuối và `timeline.json` khớp video đó (video hoạt hình: đã chạy `xuat_timeline.py` của `dung-hoat-hinh`).
- `out/bao-cao-xac-thuc.md` kết luận ĐẠT: clip chỉ dùng lời đọc đã kiểm chứng.
- FFmpeg có libass, Chrome hoặc Edge, Python có Pillow.

## Các bước

1. **Gợi ý đoạn**:
   ```bash
   python .claude/skills/cat-clip-doc/scripts/goi_y_clip.py <dự án> --so 5
   ```
   Ghi `out/clip-doc/goi-y.json` (mọi ứng viên có điểm và lý do) và `out/clip-doc/ke-hoach.json` (N đoạn tốt nhất, không trùng nhau). Đã có `ke-hoach.json` thì không ghi đè.

2. **Sửa kế hoạch** (`ke-hoach.json`), mỗi clip:
   - Đọc `text`. Đoạn phải **tự hiểu được** khi không xem phần trước: câu đầu không bắt đầu bằng "So", "That", "It" chỉ về điều chưa nói; nếu có thì dời `start` tới câu sau (lấy mốc từ `timeline.json` → `captions`).
   - `tieu_de`: câu mồi tiếng Anh ≤ 7 từ, lấy ý **từ lời đọc của chính đoạn đó**, không giật tít sai, không từ cấm (`van-phong-loi-doc.md`). Có con số thì số đó phải nằm trong một khẳng định của đoạn (`claims`).
   - `wob`: biểu cảm hợp đoạn (danh sách ở `templates/_shared/wob/README.md`).
   - Khung: mặc định cắt 4:3 ở giữa (`crop_x: 0.5`), bắt đầu từ y = 140 để không lấy logo của bản dài. Cảnh có chữ, số, bản đồ sát mép trái phải → `toan_canh: true` (giữ cả khung 16:9). Chủ thể lệch một bên → `crop_x` 0–1. Đầu nhân vật bị cụt → `giu_tren: true`.
   - Bỏ đoạn ở chương cuối trừ khi có lý do (lộ phán quyết thì người xem khỏi xem bản dài).

3. **Dựng**:
   ```bash
   python .claude/skills/cat-clip-doc/scripts/dung_clip_doc.py <dự án> [--chi k1,k3]
   ```
   Ra `out/clip-doc/<id>.mp4`, `<id>-khung.jpg` (4 khung), `<id>.md` (chữ đăng Shorts / TikTok / Reels).

4. **Xem từng tờ khung bằng Read** (bắt buộc). Kiểm:
   - câu mồi không vỡ dòng xấu, không đè thanh trên của ứng dụng;
   - cảnh giữa không cắt mất chữ, số, mặt Wob, không lấy logo cụt;
   - phụ đề khớp lời, không tràn hai bên;
   - thẻ cuối phủ kín (không lộ phụ đề phía sau).
   Lỗi thì sửa `ke-hoach.json` rồi dựng lại riêng clip đó (`--chi`). Tối đa 3 vòng.

5. **Ghi nhật ký** `nhat-ky.md`: số clip, đoạn nào, câu mồi, khung, lý do chỉnh.

## Đăng

Skill này chỉ dựng file, không đăng. Đăng Shorts qua YouTube Studio (người làm kênh tự kéo file, hoặc `/dang-bai` khi được gọi); điền link video dài vào chỗ `<link video dài>` trong `<id>.md`. Nhịp đăng gợi ý (mặc định ban đầu): 2–3 clip mỗi tập, đăng rải 1 clip mỗi 1–2 ngày sau video dài, cùng clip lên TikTok và Reels. Clip hoạt hình Wob: nhãn AI ghi trong chú thích; chỉ bật nhãn "altered or synthetic" khi có cảnh trông như thật về người hoặc sự kiện có thật.

## Ghi chú kỹ thuật

- Bố cục và mốc toạ độ ở đầu `dung_clip_doc.py`. Đổi bố cục thì sửa `nen_html`, `ass_doc`, `VID_Y`.
- Âm thanh lấy nguyên từ bản dài (đã ở −14 LUFS), chỉ thêm fade đầu 0,25 s, cuối 0,7 s.
- Phụ đề đốt vào hình bằng ASS (font Fraunces), mỗi cụm 2–4 từ, từ đang đọc tô màu nhấn `#E0703A`.
- Làm thử lần đầu 23/11/2026 trên tập 1 Oymyakon: 4 clip 45–57 giây; clip k3 (bảng số, bản đồ sát mép) phải dùng `toan_canh`.
