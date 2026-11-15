---
name: long-tieng
description: Tạo giọng đọc tiếng Anh bằng Azure AI Speech cho từng cảnh (mốc thời gian từng từ), nghe lại bằng nhận dạng lời để bắt lỗi đọc lặp/cụt, rồi dựng timeline.json theo độ dài audio thật, kèm out/captions.srt và out/chapters.txt. Dùng ở bước 4–5 của /tao-video, hoặc khi đổi giọng, đổi tốc độ, sửa lời một cảnh, đổi nhạc nền.
argument-hint: "<thư mục dự án> [--voice ...] [--rate ...] [--only 2,5] [--music ...]"
---

# Giọng đọc và timeline

Đầu vào: `$ARGUMENTS`.

## Bước 4 – Giọng đọc

```bash
python3 .claude/skills/long-tieng/scripts/tts.py <thư mục dự án> [--voice <giọng>] [--rate +0%] [--only 2,5]
```

- **Azure AI Speech** (bắt buộc cho bản giao): cần `pip install azure-cognitiveservices-speech`, `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`. Có khoá thì script tự chọn Azure. `--provider edge` chỉ để nháp; `kiem_tra_ban_quyen.py` chặn bản giao dùng Edge.
- Giọng lấy từ `script.json` → `voice.name` (giọng đã chốt trong hồ sơ kênh). Chưa chốt: nghe thử 3 giọng en-US (HD nếu có) bằng một đoạn 30 giây của tập, chọn một, ghi vào hồ sơ kênh; từ đó mọi tập dùng giọng này.
- Kết quả `timing` mỗi cảnh trong `audio/subtitles.json`:
  - `tts`: mốc từng từ khớp lời gốc. Tốt.
  - `tts-raw`: số từ TTS trả về khác lời gốc (thường do chữ số, ký hiệu). Viết số bằng chữ rồi tạo lại cảnh đó.
  - `approx`: TTS không trả mốc từ (giọng HD có thể như vậy). Dùng dự phòng bên dưới.
- **Dự phòng khi `approx`**: nhận dạng lời theo từng từ, `faster-whisper` model `small` (đa ngôn ngữ) hoặc `small.en`, `language="en"`, `word_timestamps=True`; hoặc `npx hyperframes transcribe audio/scene-<id>.mp3`. Ghi đè `words` của cảnh, đặt `timing: "whisper"`.
- Tên nơi đọc sai: thêm `pronunciation` (`"Oymyakon: oy-myah-KON"`) rồi tạo lại `--only`.
- Dịch vụ lỗi: báo người làm kênh. Không tự đăng ký dịch vụ trả phí, không dùng gói miễn phí của ElevenLabs.

**Nghe lại (bắt buộc sau mỗi lần tạo giọng)**:
```bash
python3 .claude/skills/long-tieng/scripts/nghe_lai.py <thư mục dự án> [--only 3,5]
```
LỖI khi đọc lặp cụm từ, nghe được < 80% số từ (âm thanh cụt) hoặc > 125% (đọc thừa): tạo lại cảnh đó. CẢNH BÁO khi khớp < 60%: tự nghe cảnh đó. Vì sao: bên GameReel từng có video đăng lên với tên bị đọc lặp và âm thanh cụt mà kiểm định không bắt được (agent không nghe được âm thanh).

## Bước 5 – Timeline

```bash
python3 .claude/skills/long-tieng/scripts/build_timeline.py <thư mục dự án> [--music music/abc.mp3 | --music none] [--music-volume 0.18]
```

- Độ dài mỗi cảnh = audio thật + 0,35 giây nghỉ; cảnh đầu 0,2 giây trước lời (hình đã có từ khung 0); cảnh cuối giữ thêm 1,5 giây.
- `timeline.json` có: `scenes[].shots` (nhịp hình khớp `cue`, kèm `src`, nhãn bản đồ), `scenes[].wob`, `scenes[].verdict`, `sfx` (gồm chữ ký `dau-wob` cùng con dấu), `music`, `chapters`, `claims` (mốc lúc đọc mỗi khẳng định, cho báo cáo độ xác thực), `captions`.
- Ghi thêm `out/captions.srt` (tải lên YouTube) và `out/chapters.txt` (dán vào mô tả).
- Nhạc nền: chỉ file có dòng trong `music/GIAY-PHEP.md`; sổ trống thì không nhạc và có cảnh báo. Trộn sau khi render (`mix_audio.py`), nhạc tự nhỏ khi có lời.
- LỖI (mã 1): cảnh thiếu giọng, asset không có trong manifest, chương ngắn hơn 10 giây. CẢNH BÁO: nhịp đứng > 10 giây hoặc < 2 giây, chương quá dài, độ dài ngoài mục tiêu, sfx dày. Đây là mặc định ban đầu; chỉnh theo `kenh/bai-hoc.md`.
- Tổng độ dài vượt mục tiêu: rút lời ở chương dài nhất (khẳng định bị đổi phải kiểm chứng lại), không tăng tốc độ đọc quá +5%.

Yêu cầu: `ffprobe` (đi kèm FFmpeg), `pip install faster-whisper` cho nghe lại.
