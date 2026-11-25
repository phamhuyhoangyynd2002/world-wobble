# Trạng thái sản xuất – 23/11/2026

Đọc file này trước khi làm tiếp. Nhật ký chi tiết ở `projects/<tập>/nhat-ky.md`.

## Tập 2 Coober Pedy (`projects/2026-11-16-coober-pedy`): XONG, chờ người làm kênh xem

- Video: `out/video.mp4` (9:53, 1,2 GB), `out/video-no-music.mp4`, `out/captions.srt`, `out/chapters.txt` (8 chương), `out/seo.md`.
- Cổng 0–7 đều ĐẠT. Báo cáo độ xác thực `out/bao-cao-xac-thuc.md`: 43 khẳng định (A23 B16 C4 D0), 94 nguồn. `ban-quyen.md` 0 CHẶN.
- Phán quyết: WOULD MOVE (phòng ngủ phải dưới đất).
- Khi đăng: Not made for kids; KHÔNG gắn nhãn altered/synthetic; KHÔNG bật quảng cáo (giọng Edge TTS, phải lồng lại Azure trước khi kiếm tiền); nghe lại phụ đề cảnh 16 (8:01–8:46) trước khi tải SRT. Đăng bằng `/dang-bai` khi được gọi.
- Chưa sửa (cần đổi lời → dựng lại nhiều đoạn): mở 0:13–0:50 chậm, chương nước 6:27–8:00 nhiều số ít cười, vài câu rào đón thừa. Gợi ý không bắt buộc: d37 Wob ngồi, d14 sang vẽ tay.
- Bài học: `docs/bai-hoc-san-xuat-tap-2-2026-11-23.md`.

## Tập 3 Whittier (`projects/2026-11-16-whittier`): đang ở bước 2 (kiểm chứng)

- Xong: research.md; script.json (15 cảnh, ~10,6 phút, 52 claims, khuôn chương đảo: mở ở cổng hầm, bàn kỷ vật giữa tập, con dấu SUMMER ONLY ở cổng hầm mùa hè; bản cũ `script.v2.json`); cổng 1 ĐẠT.
- Cổng 3 tài nguyên ĐẠT: 3 bản đồ code + 11 ảnh ComfyUI. 4 ảnh chính chưa đúng chi tiết (cổng hầm, khối 14 tầng, sông băng, toà đổ nát) → thợ dựng vẽ thêm.
- Kiểm chứng: vòng 1 (Claude) xong; vòng 2 (ChatGPT web) xong 7 lô; `doi_chieu`: A29 B13 C6 D0, lệch 9; vòng 3 xong (`kiem-chung/vong-3.json`).
- **Đang làm (23/11 chiều):** đã kiểm lại 7 mã; C33 bỏ, C34 viết dè dặt (script.v4.json là bản trước). Cổng 1 ĐẠT. Còn chặn: C34 cần kiểm lại 2 vòng — vòng 2 dán `kiem-chung/web/lo-9.txt` vào ChatGPT web (Browser MCP đang mất kết nối) rồi `gemini_web.py nhan`.
- **Việc tiếp theo:**
  1. Kiểm lại hai vòng các mã đổi statement (`gemini_web.py prompt --only ...` dán ChatGPT web qua clipboard; agent `kiem-chung-thong-tin` cho vòng 1) → `doi_chieu.py --cong` mã 0.
  2. Giọng Edge TTS (`tts.py --provider edge --only <id>` từng cảnh, nghỉ giữa các lần) → `whisper_khop.py` nếu cảnh nào `tts-raw` → `nghe_lai.py`.
  3. `/dung-hoat-hinh`: khẩu hình → đạo diễn phân cảnh → duyệt 5a → 4 thợ dựng (render với TMP=D:/YouTube/world-wobble/tmp) → `to_khung` + duyệt 6a → ghép → `xuat_timeline` → `kiem_dong_hinh` → kiểm định ∥ phản biện → `bao_cao.py` → SEO.

## Ghi chú môi trường

- Ổ C hay đầy: mọi file lớn ở `D:/YouTube/world-wobble/` (video/, du-an/, tmp/; quy ước trong README.md ở đó). Render với TMP/TEMP = `D:/YouTube/world-wobble/tmp`.
- Giới hạn API 5 giờ: 4 thợ dựng song song chạm giới hạn 2 lần/đêm; gọi lại agent cũ bằng SendMessage.
- Browser MCP hay bị tạm dừng → cần người làm kênh bấm Resume. ChatGPT web ổn định hơn Gemini web cho vòng 2.
- Bộ dựng cắt giấy riêng Coober Pedy: `projects/2026-11-16-coober-pedy/hoat-hinh/cat-giay-cp-prelude.js` (nên đưa vào `templates/hoat-hinh/cat-giay/lib`).
- Lịch kiểm tra (CronCreate) chỉ sống trong phiên; mở phiên mới thì đặt lại.

## Quyết định 24/11

- Tập 3 giữ 1080p. **Từ tập 4 xuất 2K (2560×1440)**: sửa khung template hoạt hình, script chuan_bi_doan/ghep_doan/to_khung, luật video-dai-youtube (vùng an toàn, cỡ chữ ×4/3), render thử 1 đoạn đo thời gian và dung lượng trước.
