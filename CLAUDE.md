# World Wobble – Hướng dẫn cho Claude Code

Dự án tự động làm **video dài YouTube khung ngang 16:9, 10–15 phút, tiếng Anh** cho kênh **World Wobble** (@WorldWobble): "Why on earth do people live *there*? Weird places, explained with a wobble." Nhân vật dẫn là **Wob**, quả địa cầu méo đi lắc lư. Giai đoạn 1 (10 tập đầu) chỉ làm một hướng: **"Why do people live here?"**.

Kênh tách hẳn khỏi Game Vừa Ví (dự án GameReel ở `~/Desktop/Gaming-related-videos`). Bộ công cụ ở đây chép lõi từ GameReel ngày 15/11/2026 rồi viết lại cho video dài: không dùng luật, nhân vật, màu, nhãn con dấu của Game Vừa Ví.

Hướng dẫn và báo cáo viết tiếng Việt; lời đọc, chữ trên hình, tiêu đề, mô tả viết tiếng Anh.

> **Định hướng đổi ngày 16/11/2026:** video là **hoạt hình "Wob kể chuyến đi"** (Wob tự kể ngôi thứ nhất, diễn trong cảnh vẽ, không ảnh thật). Đọc [docs/dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md](docs/dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md) trước mọi việc sản xuất. Template, schema, luật bên dưới còn theo kiểu trình chiếu cũ cho tới khi làm xong mục 7 của tài liệu đó; bước tiếp theo là bản thử ~75 giây. Tập 2–5 tạm dừng.

## Người làm kênh chỉ làm gì

- Nêu đề tài (hoặc để Claude chọn), rồi **xem video cuối cùng báo cáo độ xác thực**. Không duyệt kịch bản, không duyệt hình giữa chừng (chốt 14/11/2026).
- **Ngoại lệ cho đợt ra mắt 5 tập (chốt 16/11/2026):** sau nghiên cứu, Claude viết `tom-tat-duyet.md` (tiếng Việt: mạch chương, số liệu kèm mức dự kiến, chỗ đùa, phán quyết, câu hỏi cần quyết) và **dừng chờ người làm kênh duyệt** rồi mới viết kịch bản. Mục đích: thống nhất quan điểm trước khi tự động hoàn toàn. Sau đợt này người làm kênh quyết bỏ hay giữ điểm dừng.
- Vì không có người duyệt giữa chừng, **các cổng tự động thay cho người duyệt**, quan trọng nhất là kiểm chứng hai mô hình (Claude + Gemini).
- Đăng bài chỉ khi người làm kênh gọi `/dang-bai`.

## Cách dùng nhanh

| Muốn làm gì | Gõ |
|---|---|
| Hoàn tất hồ sơ kênh (giọng, màu, font, logo, Wob, phong cách ảnh, nhạc) | `/thiet-lap-kenh` |
| Chưa biết làm tập nào | `/goi-y-chu-de` |
| Làm trọn một tập | `/tao-video Oymyakon` |
| Chỉ nghiên cứu một nơi | `/nghien-cuu <nơi>` |
| Viết / sửa kịch bản | `/viet-kich-ban <thư mục dự án> [góp ý]` |
| Kiểm chứng (hai mô hình) và báo cáo độ xác thực | `/kiem-chung <thư mục dự án>` |
| Bản đồ, ảnh minh hoạ AI, ảnh Commons | `/lay-tai-nguyen <thư mục dự án>` |
| Ảnh AI miễn phí qua ChatGPT web / Gemini web (Browser MCP, tài khoản riêng) | `/tao-anh-web <thư mục dự án>` |
| Giọng đọc + timeline | `/long-tieng <thư mục dự án>` |
| Render MP4 | `/xuat-video <thư mục dự án>` |
| Kiểm tra trước khi giao | `/kiem-tra-video <thư mục dự án>` |
| Tiêu đề, mô tả, thumbnail | `/seo-youtube <thư mục dự án>` |
| Thumbnail + điền form YouTube Studio | `/dang-bai <thư mục dự án>` |
| Dán số liệu sau khi đăng để kênh học | `/phan-tich-hieu-qua` |
| Tạo / sửa template | `/tao-template <tên>` |

## Luồng xử lý

```
kenh/ (hồ sơ, bài học) ─────────────── đọc trước mọi việc ───────────────┐
                                                                          ▼
brief.md ─► research.md ─► script.json ─┬─► kiem-chung/ (Claude ∥ Gemini → đối chiếu → cổng)
 (cổng 0)                   (cổng 1)    └─► assets/ (bản đồ code, ảnh AI, Commons; cổng 3)
                                                     │
                       audio/ ─► timeline.json ─► render/ ─► out/video.mp4
                     (cổng 4)     (cổng 5)                     (cổng 6)
                                                                  │
            out/bao-cao-xac-thuc.md + ban-quyen.md + qa-report.md + phan-bien.md + seo.md (cổng 7)
                                                                  │
                                       người làm kênh xem ─► /dang-bai (khi được gọi)
```

- Mỗi tập nằm trong `projects/<YYYY-MM-DD>-<slug>/`, có `nhat-ky.md` ghi quyết định từng bước. Nhật ký cũng là bằng chứng quy trình khi phải kháng nghị YPP.
- Mỗi bước đọc file của bước trước và ghi file mới, nên chạy lại riêng một bước được.
- Trước khi giao video, Claude tự kiểm tra và tự sửa tối đa 3 vòng.

## Bộ nhớ kênh (`kenh/`)

- [ho-so-kenh.md](kenh/ho-so-kenh.md): kênh, hướng nội dung, Wob, giọng, hình ảnh, quy trình kiểm chứng (mức A–D), nhãn AI, nhịp sản xuất. Điều gì có ở đây thì không hỏi lại. Còn nhiều dòng TODO: chạy `/thiet-lap-kenh`.
- [mau-bao-cao-xac-thuc.md](kenh/mau-bao-cao-xac-thuc.md): mẫu báo cáo giao cùng mỗi video (`bao_cao.py` sinh theo mẫu này).
- [bai-hoc.md](kenh/bai-hoc.md): bài học rút từ số liệu thật.
- Căn cứ chọn kênh, mảng, công cụ: [docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md](docs/danh-gia-thi-truong-kenh-dai-en-ja-2026-11-14.md) và dữ liệu đo trong [docs/du-lieu-kenh-dai-2026-11-14/](docs/du-lieu-kenh-dai-2026-11-14/).
- Hệ thiết kế video (bản tạm): [templates/_shared/frame.md](templates/_shared/frame.md).

## Bộ quy tắc ([.claude/rules/](.claude/rules/), nạp tự động)

- [quy-trinh-san-xuat.md](.claude/rules/quy-trinh-san-xuat.md): chế độ tự động, các cổng, hợp đồng file, chạy lại, chạy song song.
- [chinh-xac-va-ban-quyen.md](.claude/rules/chinh-xac-va-ban-quyen.md): khẳng định và nguồn, hình ảnh (AI, Commons, bản đồ), âm thanh, **bản đồ và chủ quyền Việt Nam**, nhãn AI (YouTube + Nghị định 142/2026), người dân, nội dung không xác thực.
- [video-dai-youtube.md](.claude/rules/video-dai-youtube.md): thông số, vùng an toàn và cỡ chữ cho TV, cấu trúc giữ chân, chương, tiêu đề, thumbnail.
- [van-phong-loi-doc.md](.claude/rules/van-phong-loi-doc.md): lời đọc tiếng Anh deadpan cho TTS, số viết bằng chữ, cách nói dè dặt, từ cấm.
- [thuong-hieu.md](.claude/rules/thuong-hieu.md): Wob, con dấu WOULD MOVE / SUMMER ONLY / NOPE, chữ ký âm thanh, nội dung gốc.
- [template-hyperframes.md](.claude/rules/template-hyperframes.md): hợp đồng dữ liệu, lỗi lint hay gặp, bố cục ngang (chỉ nạp khi sửa `templates/`).

## Agent chuyên trách ([.claude/agents/](.claude/agents/))

| Agent | Việc |
|---|---|
| `nghien-cuu-dia-diem` | Nghiên cứu một nơi, ghi `research.md` có nguồn |
| `bien-kich-video` | Viết `script.json`: lập luận, chương, nhịp hình, Wob, phán quyết, `claims` |
| `kiem-chung-thong-tin` | Kiểm chứng vòng 1 (Claude), độc lập với Gemini; tra lần ba khi lệch |
| `thu-thap-tai-nguyen` | Bản đồ code, ảnh AI, ảnh Commons, `assets/manifest.json` |
| `bien-tap-video` | Dựng HyperFrames, render, trộn âm |
| `kiem-dinh-video` | Kỹ thuật, bản quyền, chủ quyền, xem khung hình |
| `phan-bien-video` | "Chê thẳng" như người xem YouTube, 5 việc nên sửa |
| `seo-youtube` | Tiêu đề, mô tả, thẻ, thumbnail |

Vòng 2 kiểm chứng không phải agent: mặc định chạy qua **Gemini web** ở phiên chính bằng Browser MCP (`.claude/skills/kiem-chung/scripts/gemini_web.py`, chốt 16/11/2026, tài khoản Google riêng); khi có `GEMINI_API_KEY` thì dùng `gemini_kiem_chung.py`.

## Môi trường

- **Node 22+** cho HyperFrames. Máy này mặc định Node 20; Node 22 có qua nvm: `export PATH=$HOME/.nvm/versions/node/v22.23.3/bin:$PATH` trước mỗi lệnh `npx hyperframes` (không sửa `.npmrc`). `npm install` một lần ở gốc repo để có `d3-geo` (vẽ bản đồ).
- FFmpeg, Chrome. Python 3.9+ với `pip install azure-cognitiveservices-speech faster-whisper pillow`; `edge-tts` chỉ để nháp.
- `.env` (mẫu ở `.env.example`): `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`, `GEMINI_API_KEY`, `GEMINI_MODEL` (có tìm kiếm web), `GEMINI_IMAGE_MODEL`. Chọn model bằng `python3 .claude/skills/kiem-chung/scripts/gemini_kiem_chung.py --list-models`.
- Người làm kênh tự điền và **ghi sổ giấy phép**: `music/` + `music/GIAY-PHEP.md`; `sfx/` đã có bộ tự tổng hợp (`sfx/nguon/tao_sfx.py`) kèm sổ. File không có trong sổ sẽ bị chặn.
- Bản đồ nền Natural Earth (bản quan điểm Việt Nam) tự tải vào `.cache/` lần đầu.

## Việc còn mở (xem TODO trong hồ sơ kênh)

Chọn giọng Azure en-US; phong cách ảnh (`templates/_shared/phong-cach-anh.txt`); sổ nhạc; `AZURE_SPEECH_KEY`, `GEMINI_API_KEY` (repo chưa có `.env`); script dựng thumbnail; tải video lên bằng YouTube Data API (hiện người làm kênh tự kéo file vào YouTube Studio vì Browser MCP chỉ nhận file dưới 50 MB); skill cắt Shorts từ video dài.
