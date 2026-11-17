---
name: lay-tai-nguyen
description: Tạo và lấy hình cho một tập World Wobble theo các nhịp asset:<id> trong script.json: bản đồ vẽ bằng code (D3 + Natural Earth bản quan điểm Việt Nam), ảnh minh hoạ AI chia hạng (ảnh chính bằng nguồn ngoài Gemini API/ChatGPT web, ảnh phụ bằng ComfyUI nội bộ trên máy, theo anh_ai trong script.json), ảnh thật có giấy phép từ Wikimedia Commons (chỉ CC0/PD/CC BY/CC BY-SA), ghi assets/manifest.json kèm căn cứ sử dụng. Dùng ở bước 2 của /tao-video, khi cần đổi, vẽ lại bản đồ, tạo lại ảnh, hoặc tìm ảnh thật cho một nơi.
argument-hint: "<thư mục dự án> [--only <id>]"
---

# Lấy tài nguyên hình

Đầu vào: `$ARGUMENTS`. Việc này nên giao agent `thu-thap-tai-nguyen`. Luật: `.claude/rules/chinh-xac-va-ban-quyen.md` mục 3 và 6.

Đọc `script.json`, lập danh sách mọi `asset:<id>` trong `shots` và cảnh dùng nó. Mỗi id một tài nguyên, tên id cho biết loại: `map-…` bản đồ, `ai-…` ảnh AI, `commons-…` ảnh Commons.

## Bản đồ (luôn vẽ bằng code)

```bash
npm install   # một lần, để có d3-geo
node .claude/skills/lay-tai-nguyen/scripts/ve_ban_do.mjs <dự án> --id map-region --center <lon>,<lat> --zoom <n> \
  [--projection orthographic|mercator|naturalEarth] [--highlight <ADM0_A3>] [--mark "<lon>,<lat>,<Nhãn>"] \
  [--anchor <x>,<y>] [--scenes 1,2]
```

- `orthographic` (quả cầu, mặc định) cho cảnh "nơi này ở đâu trên Trái Đất"; `mercator` cho vùng gần (zoom 6–40).
- Bản đồ cảnh hook: `--anchor 1320,560` để nơi đó nằm nửa phải.
- Nhãn vẽ bằng HTML trong template (toạ độ ghi vào `marks`), nên nhãn tiếng Anh ngắn.
- Script báo khung chạm vùng Biển Đông thì: mở SVG (chuyển PNG bằng `qlmanage -t -s 1600 -o <thư mục tạm> <file.svg>`), xem Hoàng Sa, Trường Sa, không có "đường lưỡi bò", rồi đặt `"chu_quyen_da_kiem": true` cho id đó trong manifest. Không chắc thì đổi khung để không chạm vùng này.

## Ảnh minh hoạ AI: chia theo hạng (chốt 17/11/2026)

Biên kịch đã chấm hạng mọi ảnh AI trong `script.json` → `anh_ai` (luật: `.claude/skills/viet-kich-ban/references/hang-anh.md`). **Ảnh chính** tạo bằng nguồn ngoài, **ảnh phụ** tạo nội bộ bằng ComfyUI. Bước đầu luôn là lập kế hoạch:

```bash
python .claude/skills/lay-tai-nguyen/scripts/ke_hoach_anh.py <dự án> [--luot-ngoai N] [--khi-thieu cho|ha-hang]
```

- Nguồn ngoài: `gemini-api` khi `.env` có `GEMINI_API_KEY` + `GEMINI_IMAGE_MODEL`; không thì `chatgpt-web` (skill `/tao-anh-web`, chỉ chạy ở phiên chính).
- `--luot-ngoai N` khi biết còn bao nhiêu lượt ngoài hôm nay (ChatGPT Free thường chỉ vài ảnh). Ảnh chính vượt số lượt: `cho` (để mai, mặc định) hoặc `ha-hang` (tạo nội bộ, báo lại khi giao). Còn dư lượt: ảnh phụ điểm cao nhất được nâng lên nguồn ngoài.
- Ghi `assets/ke-hoach-anh.json` và in lệnh cho từng ảnh. Làm ảnh chính trước.
- Ảnh ngoài và ảnh nội bộ khác nét nhau một chút: sau khi đủ ảnh, mở ảnh của các cảnh liền nhau cạnh nhau, xem có lệch màu quá không. Lệch quá thì tạo lại ảnh phụ (rẻ), không tạo lại ảnh chính.

### Ảnh phụ: ComfyUI nội bộ

```bash
python .claude/skills/lay-tai-nguyen/scripts/tao_anh_noi_bo.py kiem                     # cấu hình, model, giấy phép
python .claude/skills/lay-tai-nguyen/scripts/tao_anh_noi_bo.py tao <dự án> --id ai-<mô-tả> [--so-ban 2]
python .claude/skills/lay-tai-nguyen/scripts/tao_anh_noi_bo.py chon <dự án> --id ai-<mô-tả> --seed <seed> --da-xem
python .claude/skills/lay-tai-nguyen/scripts/tao_anh_noi_bo.py tat                      # xong việc thì tắt, trả card đồ hoạ
```

- ComfyUI ở `D:/ComfyUI` (đổi bằng `COMFYUI_DIR` trong `.env`); `tao` tự bật nếu chưa chạy. Model SDXL base 1.0, khoảng 45 giây mỗi bản trên RTX 3050 4 GB; bản đầu lâu hơn vì nạp model.
- Prompt lấy từ `anh_ai[].canh`; phong cách kênh tự thêm. `tao` ra 2 bản khác seed ở `assets/ai/goc/`; mở từng bản bằng Read, chọn bản đúng hơn, rồi `chon` để phóng và cắt về 1920×1080, ghi manifest.
- Xem như ảnh ngoài: rõ là tranh vẽ, không chữ, không bản đồ, không người nhận ra được, không lỗi hình. Thêm: SDXL hay **tự thêm** mặt trăng, người cưỡi ngựa, đồ vật không có trong prompt; thấy thì tạo lại bằng seed khác (`--seed`).
- Ảnh hạng chính bị script chặn. Chỉ tạo nội bộ khi kế hoạch ghi `ha-hang`: thêm `--ha-hang`, manifest ghi `ha_hang: true`, ghi `nhat-ky.md`.
- Chỉ dùng model trong `MODELS` của script. Muốn thêm model (ví dụ Flux.1 schnell, Z-Image Turbo, cùng Apache-2.0): đọc giấy phép gốc trước, rồi thêm vào `MODELS` kèm link giấy phép.

### Ảnh chính: Gemini API

```bash
python3 .claude/skills/lay-tai-nguyen/scripts/tao_anh_ai.py <dự án> --id ai-<mô-tả> --prompt "<cảnh, tiếng Anh>" [--scenes 3] [--ref <ảnh tham chiếu>]
```

- Prompt chỉ tả **nội dung cảnh** (nơi, thời tiết, hoạt động, bố cục); phong cách chung tự thêm từ `templates/_shared/phong-cach-anh.txt`. Chừa khoảng trống phía trái nếu cảnh có tiêu đề.
- Không xin ảnh như ảnh chụp, không tên hoạ sĩ/studio/nhân vật có sẵn, không bản đồ, không người thật nhận ra được (script từ chối các từ này).
- Cảnh tái hiện một sự kiện có thật (một trận bão, một lần dời thị trấn): được, nhưng thêm cờ `--tai-hien-su-kien` (manifest ghi `tai_hien_su_kien: true`) để kiểm định và SEO gắn nhãn AI (Nghị định 142/2026).
- Mở từng ảnh bằng Read: đúng nội dung lời đọc, không chữ lạ, không lỗi hình (tay sáu ngón, nhà lơ lửng). Hỏng thì `--lam-lai` với prompt sửa; ghi số lần tạo lại vào `nhat-ky.md` (tính chi phí).
- Ảnh đã có không tạo lại (tốn tiền).
- Chưa có `GEMINI_API_KEY`: ảnh chính tạo bằng ChatGPT web qua skill `/tao-anh-web` (chạy ở phiên chính, tài khoản riêng, hạn mức thấp). Agent `thu-thap-tai-nguyen` không có Browser MCP: để trống các id đó, ghi vào báo cáo, phiên chính tạo sau.

## Ảnh thật từ Wikimedia Commons

```bash
python3 .claude/skills/lay-tai-nguyen/scripts/commons.py <dự án> --search "<nơi> <chủ đề>"
python3 .claude/skills/lay-tai-nguyen/scripts/commons.py <dự án> --file "File:<tên>.jpg" --id commons-<mô-tả> [--scenes 4]
```

Script từ chối NC, ND, GFDL đơn thuần, không rõ giấy phép, và ghi câu ghi công. Mở ảnh xem: không mặt người nhận ra được (trừ khi bối cảnh công cộng, không làm hại họ), không watermark, không bản đồ sai chủ quyền.

## Tài nguyên tự vẽ khác

Sơ đồ, biểu đồ, hình vẽ tay của kênh: lưu vào `assets/tu-tao/`, thêm vào manifest bằng `manifest.put()` (xem `scripts/manifest.py`) với `kind: "tu-tao"`, `basis: "tu-tao"`.

## Cổng

```bash
python3 .claude/skills/kiem-tra-video/scripts/kiem_tra_ban_quyen.py <dự án> --som
python3 .claude/skills/viet-kich-ban/scripts/validate_script.py <dự án>   # bắt asset: không có trong manifest
```

Cả hai mã 0 mới sang bước giọng đọc. Thiếu một tài nguyên thì dùng phương án dự phòng (bản đồ thay ảnh, nhịp `text`), ghi cảnh báo, không dừng cả luồng.
