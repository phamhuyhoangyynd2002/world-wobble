---
name: xuat-video
description: Dựng composition HyperFrames từ template explainer + timeline.json, kiểm bằng hyperframes check, chụp thử, render 1920×1080, rồi trộn nhạc và sfx ra out/video.mp4 và out/video-no-music.mp4 ở −14 LUFS. Dùng ở bước 6 của /tao-video, hoặc khi cần render lại sau khi sửa template, đổi nhạc.
argument-hint: "<thư mục dự án> [--template explainer]"
---

# Render video

Đầu vào: `$ARGUMENTS`. Việc này nên giao agent `bien-tap-video`.

## Điều kiện trước

- Có `timeline.json` mới hơn `script.json`, `audio/subtitles.json`, `assets/manifest.json`. Không thì chạy `/long-tieng` trước.
- **Node 22+**: máy này mặc định Node 20, Node 22 có qua nvm. Mỗi lệnh `npx hyperframes` chạy với `export PATH=$HOME/.nvm/versions/node/v22.23.3/bin:$PATH` (không sửa `.npmrc`). Kiểm: `npx hyperframes doctor`.

## Các bước

1. Chuẩn bị thư mục dựng (chép template, `_shared`, tài nguyên, chèn dữ liệu, danh sách biểu cảm Wob đã vẽ):
   ```bash
   python3 .claude/skills/xuat-video/scripts/prepare_render.py <dự án>
   ```
2. Cổng, trong `<dự án>/render/`: `npx hyperframes@0.8.85 check`, yêu cầu 0 lỗi. Sửa ở **template gốc** (`templates/explainer/`, `templates/_shared/`), không sửa trong `render/`, rồi chạy lại bước 1. Cảnh báo "chưa có SVG Wob" là bình thường cho tới khi vẽ xong Wob.
3. Chụp thử: `npx hyperframes@0.8.85 snapshot --at 0,<giữa mỗi chương>,<con dấu>,<cuối>` → `snapshots/contact-sheet.jpg`. Mở bằng Read: khung 0 có hình nơi đó và câu hỏi, câu hỏi không đè ghim bản đồ, chữ trong vùng an toàn, con dấu đọc rõ, 20 giây cuối góc phải dưới trống.
4. Render:
   ```bash
   npx hyperframes@0.8.85 render --quality draft --output ../out/render-raw.mp4      # trong các vòng tự sửa
   npx hyperframes@0.8.85 render --quality delivery --output ../out/render-raw.mp4   # bản cuối
   ```
   Video 15 phút render lâu (bản thử 18,6 giây mất 17 giây ở draft); chạy nền và chờ thông báo, không thăm dò liên tục. `test -s ../out/render-raw.mp4`.
5. Trộn âm và master:
   ```bash
   python3 .claude/skills/xuat-video/scripts/mix_audio.py <dự án>
   ```
   Ra `out/video.mp4` (giọng + sfx + nhạc tự nhỏ khi có lời), `out/video-no-music.mp4`, `out/audio-report.json`. Chuẩn hoá hai lượt về −14 LUFS, true peak ≤ −1 dBTP.
6. Kiểm nhanh: `python3 .claude/skills/kiem-tra-video/scripts/kiem_ky_thuat.py <dự án>`.

## Khi render lỗi

- Báo nguyên văn lỗi. Sửa chỗ rẻ nhất trong template rồi chạy lại đúng lệnh đã lỗi.
- Thử lần lượt: `check`; đường dẫn tài nguyên trong `render/`; `<audio>` thiếu `id` (render câm); font thiếu `@font-face`; ảnh quá lớn (ảnh AI 4K, SVG bản đồ > 2 MB: vẽ lại zoom hẹp hơn).
- Giọng mất trong bản render: ghép lại bằng FFmpeg (đặt `audio/scene-*.mp3` theo `timeline.scenes[].voice.start` bằng `adelay`, `amix`, `-map` vào video thành `render-raw.mp4`) rồi chạy lại `mix_audio.py`. Ghi lệnh vào `nhat-ky.md`.
- Hỏng sau 2 cách sửa: dừng, báo lỗi, không báo là xong.
