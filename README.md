# World Wobble

Dây chuyền làm video dài YouTube (16:9, 10–15 phút, tiếng Anh) cho kênh World Wobble, chạy bằng Claude Code: nghiên cứu → kịch bản → kiểm chứng hai mô hình (Claude + Gemini) → bản đồ vẽ bằng code, ảnh minh hoạ AI, ảnh Commons → giọng Azure → render HyperFrames → kiểm định → báo cáo độ xác thực → SEO.

Hướng dẫn cho Claude và cách dùng: [CLAUDE.md](CLAUDE.md). Hồ sơ kênh: [kenh/ho-so-kenh.md](kenh/ho-so-kenh.md). Căn cứ chọn hướng: [docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md](docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md).

## Cài đặt

```bash
cp .env.example .env        # điền khoá Azure, Gemini
npm install                 # d3-geo để vẽ bản đồ (Node 22+)
pip install azure-cognitiveservices-speech faster-whisper pillow
export PATH=$HOME/.nvm/versions/node/v22.23.3/bin:$PATH && npx hyperframes@0.8.85 doctor
```

## Cấu trúc

```
.claude/
  rules/      luật dùng chung (quy trình, chính xác và bản quyền, video dài, văn phong, thương hiệu, template)
  skills/     các bước: tao-video, nghien-cuu, viet-kich-ban, kiem-chung, lay-tai-nguyen, long-tieng,
              xuat-video, kiem-tra-video, seo-youtube, dang-bai, phan-tich-hieu-qua, goi-y-chu-de,
              thiet-lap-kenh, tao-template (mỗi skill có scripts/ nếu cần)
  agents/     agent chuyên trách
kenh/         hồ sơ kênh, mẫu báo cáo độ xác thực, bài học
docs/         nghiên cứu thị trường và dữ liệu đo
templates/    _shared (ww.js, ww.css, frame.md, font, gsap, wob/) và explainer (template khung ngang)
music/, sfx/  âm thanh kèm sổ giấy phép
projects/     mỗi tập một thư mục <YYYY-MM-DD>-<slug>
```

## Nguồn gốc

Chép lõi từ GameReel (dự án video ngắn của Game Vừa Ví, `~/Desktop/Gaming-related-videos`) ngày 15/11/2026: `mix_audio.py`, `prepare_render.py`, `tts.py`, `nghe_lai.py` chép rồi chỉnh; `build_timeline.py`, `validate_script.py`, runtime template, bộ kiểm chứng hai mô hình, bản đồ, Commons, ảnh AI, kiểm bản quyền và kiểm kỹ thuật viết mới cho video dài. Bộ sfx tự tổng hợp chép sang trừ chữ ký âm thanh của Game Vừa Ví; World Wobble có chữ ký riêng `dau-wob.wav`.
