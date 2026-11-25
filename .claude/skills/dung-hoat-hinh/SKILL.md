---
name: dung-hoat-hinh
description: Dựng video hoạt hình "Wob kể chuyến đi" phối 3 phong cách theo cảnh (cắt giấy có khớp, animatic vẽ tay, diorama giấy 2.5D). Từ giọng đọc đã có, agent dao-dien-hoat-hinh viết hoat-hinh/phan-canh.json (chia đoạn, chọn phong cách, biên đạo), ba agent dung-cat-giay / dung-ve-tay / dung-diorama dựng song song từng đoạn thành clip câm, rồi ghep_doan.py nối, đặt giọng, sfx, nhạc ở −14 LUFS. Dùng thay xuat-video cho video hoạt hình, khi làm bản thử, khi sửa hay render lại một đoạn, hoặc khi người làm kênh nói "dựng hoạt hình", "đổi phong cách cảnh này".
argument-hint: "<thư mục dự án> [--doan d03] [--chi-ghep]"
---

# Dựng hoạt hình đa phong cách

Đầu vào: `$ARGUMENTS`. Đọc trước: [templates/hoat-hinh/HOP-DONG.md](../../../templates/hoat-hinh/HOP-DONG.md) (hợp đồng đoạn), [docs/phong-cach-hoat-hinh-3-huong-2026-11-16.md](../../../docs/phong-cach-hoat-hinh-3-huong-2026-11-16.md) (ba phong cách, luật phối), README của từng phong cách trong `templates/hoat-hinh/<phong-cach>/`.

## Điều kiện trước

- `script.json` đã qua cổng kiểm chứng (`doi_chieu.py --cong` mã 0). Hoạt hình không thêm khẳng định mới.
- `audio/scene-<N>.mp3` + `audio/subtitles.json` (skill `long-tieng`), `nghe_lai.py` đạt.
- Node 22+ cho `npx --yes hyperframes@0.8.85`; FFmpeg; Python 3.9+.

## Các bước

1. **Khẩu hình** cho mọi cảnh có lời:
   ```bash
   python .claude/skills/dung-hoat-hinh/scripts/tao_khau_hinh.py <dự án>
   ```
   Ghi `khau-hinh/scene-<N>.json`. (Tính từ biên độ + mốc từ. Rhubarb chính xác hơn, chỉ dùng khi người làm kênh đã cho phép chạy `rhubarb.exe`.)

2. **Bảng phân cảnh**: giao agent `dao-dien-hoat-hinh` viết `hoat-hinh/phan-canh.json` theo hợp đồng mục 2 và luật phối. Cổng:
   - các đoạn nối liền từ 0 tới `thoi_luong`, mỗi đoạn có `phong_cach`, `vao`, `ra`, `trang_phuc`, `nhip`, `ly_do_phong_cach`;
   - tỉ lệ phong cách nằm trong khoảng mục tiêu (lệch phải ghi lý do vào `nhat-ky.md`);
   - khung hiện tại chỉ dùng `diorama`; đoạn lịch sử nghiêm túc không có `gag`;
   - mọi chữ trong `chu_tren_do_vat` đã có trong lời hoặc trong `claims`.

2b. **Duyệt phân cảnh (cổng 5a, bắt buộc từ 19/11/2026)**: giao agent `duyet-phan-canh`, chế độ `phan-canh`, chấm **từng đoạn** (D1–D10) và **tổng thể** (T1–T8) theo [references/tieu-chi-duyet.md](references/tieu-chi-duyet.md) → `hoat-hinh/duyet/duyet-phan-canh.md`. Không đạt thì giao lại đạo diễn sửa đúng các đoạn bị chấm LÀM LẠI / SỬA NHỎ, rồi duyệt lại các đoạn đó + tổng thể (tối đa 3 vòng). **Chưa qua cổng này thì không giao thợ dựng.** Vì sao: tập 1 Oymyakon giao dựng 40 đoạn khi bảng phân cảnh mới qua kiểm cấu trúc; lỗi nội dung (chữ bị che, mũ đổi màu giữa phong cách, gag khó đọc) chỉ lộ ra sau khi render, lúc sửa đã tốn gấp nhiều lần.

3. **Chuẩn bị mọi đoạn** (chép `_chung`, `lib`, `khung`, sinh `du-lieu.js`, ghi `data-duration`):
   ```bash
   python .claude/skills/dung-hoat-hinh/scripts/chuan_bi_doan.py <dự án> --tat-ca
   ```
   Chạy lại an toàn: không ghi đè `canh.js`, `sfx.json` đã có. Đổi mốc trong `phan-canh.json` thì chạy lại bước này cho đoạn đó.
   Khung xuất lấy từ `phan-canh.json` → `xuat` (tập 4 trở đi `{"w": 2560, "h": 1440}`; không có thì 1920×1080 như tập 1–3, script in CẢNH BÁO). Script ghi khung xuất vào `index.html` của từng đoạn, sân khấu vẫn là hệ 1920×1080 phóng ×4/3 (HOP-DONG mục 4b). Đổi `xuat` thì chạy lại bước này cho mọi đoạn và render lại hết; `ghep_doan.py` báo LỖI khi còn clip cỡ cũ.

4. **Dựng song song**: giao cùng lúc ba agent, mỗi agent nhận danh sách id đoạn của phong cách mình:
   - `dung-cat-giay`: các đoạn `phong_cach = "cat-giay"`
   - `dung-ve-tay`: các đoạn `"ve-tay"`
   - `dung-diorama`: các đoạn `"diorama"`

   Prompt cho mỗi agent phải đủ: thư mục dự án, danh sách id đoạn, đường dẫn `phan-canh.json`, tiêu chí xong (hợp đồng mục 6). Một phong cách có nhiều đoạn dài (> 3 phút tổng) thì tách cho 2 agent cùng phong cách, mỗi agent một nhóm đoạn. Agent chỉ ghi vào `hoat-hinh/doan-<id>/` của mình; muốn sửa thư viện thì sửa `templates/hoat-hinh/<phong-cach>/` của đúng phong cách mình, rồi chạy lại bước 3 cho đoạn đó.

4b. **Duyệt hình (cổng 6a, bắt buộc từ 19/11/2026)**: khi đủ mọi `out/doan.mp4`:
   ```bash
   python .claude/skills/dung-hoat-hinh/scripts/to_khung.py <dự án>
   ```
   Ra `hoat-hinh/duyet/to-khung/<id>.jpg` (một khung tại mỗi nhịp + khung cuối, có chú thích lời và thẻ), `_tong-the.jpg` (khung giữa mỗi đoạn, tô màu theo phong cách), `_muc-luc.json`. Giao agent `duyet-phan-canh`, chế độ `hinh`: chấm từng đoạn trên tờ khung đặt cạnh ý định trong `phan-canh.json`, và chấm tổng thể → `hoat-hinh/duyet/duyet-hinh.md`. Đoạn LÀM LẠI / SỬA NHỎ: gom theo phong cách, giao lại thợ dựng của đúng phong cách (mục "Sửa một đoạn"), chạy `to_khung.py --doan <id>` rồi duyệt lại các đoạn đó (tối đa 3 vòng). Qua cổng này mới ghép bản cuối.

5. **Ghép**:
   ```bash
   python .claude/skills/dung-hoat-hinh/scripts/ghep_doan.py <dự án>
   ```
   Ra `hoat-hinh/out/video.mp4`, `video-no-music.mp4`, `audio-report.json`, `timeline.json`, `out/frames/noi-*.png` + `tong-hop.jpg`. Khi đang chờ đoạn thiếu, nghe thử nhịp bằng `--cho-thieu` (đoạn thiếu thành khung giấy phẳng).

   Rồi dựng `timeline.json` đầy đủ ở gốc dự án (mốc từ, chương, khẳng định, phụ đề, con dấu) theo mốc giọng thật trong `phan-canh.json`, ghi lại `out/captions.srt`, `out/chapters.txt`:
   ```bash
   python .claude/skills/dung-hoat-hinh/scripts/xuat_timeline.py <dự án>
   ```
   Bắt buộc trước kiểm định, báo cáo độ xác thực, SEO: `build_timeline.py` đặt giọng nối liền nên mốc của nó lệch video hoạt hình (đến hàng chục giây ở cuối tập).

6. **Kiểm chỗ nối**: mở `hoat-hinh/out/frames/tong-hop.jpg` bằng Read.
   - Nối `giay`: khung trước và khung sau đều gần như giấy phẳng `#EFE3C8`.
   - Nối `cat`, `chen`: khung sau đã là cảnh đầy đủ, không khung đen, không khung trống.
   - Trang phục Wob khớp hai bên chỗ nối.
   Lỗi ở đoạn nào thì giao lại agent phong cách đó, rồi chạy lại bước 5 (chỉ ghép, không render lại đoạn khác).

7. **Cổng "hoạt hình hay trình chiếu"** (cổng 6b): chụp 12 khung rải đều video; Wob không ở trong cảnh hoặc không làm gì ở quá 2 khung thì KHÔNG ĐẠT. Rồi đo chuyển động từng khung:
   ```bash
   python .claude/skills/kiem-tra-video/scripts/kiem_dong_hinh.py <dự án>/hoat-hinh/out/video.mp4 --json <dự án>/hoat-hinh/out/dong-hinh.json --bo-cuoi 1.5
   ```
   Mã 1 (đứng hình ≥ 24 khung, khung đen, khung giật) thì sửa đoạn chứa mốc đó rồi ghép lại; CẢNH BÁO đứng hình 12–23 khung thì thêm đẩy camera chậm (thẻ `day-vao-cham`). Mẫu đo 17/11: bản phối 60s ĐẠT (91,6% khung có chuyển động); tập 1 kiểu trình chiếu KHÔNG ĐẠT (đứng hình tới 71 khung). Sau đó chép `hoat-hinh/out/video.mp4`, `video-no-music.mp4` sang `out/` của dự án và chạy kiểm định, phản biện như quy trình cũ.

8. **Lưu ra ổ D** (quy tắc "Nơi lưu file lớn" trong `quy-trinh-san-xuat.md`): bản cho người làm kênh xem → `python .claude/skills/dung-hoat-hinh/scripts/luu_o_d.py <dự án> --tap NN --nhap "<ghi chú>"`, gửi đường dẫn `D:/YouTube/world-wobble/video/...`. Giao xong → `--giao`. Mọi render (thợ dựng, ghép) đặt TMP/TEMP = `D:/YouTube/world-wobble/tmp`.

## Sửa một đoạn

`/dung-hoat-hinh <dự án> --doan d03`: chạy bước 3 cho đoạn đó, giao agent của đúng phong cách sửa `canh.js` và render lại `doan.mp4`, rồi chạy bước 5. Đổi phong cách một đoạn: sửa `phong_cach` trong `phan-canh.json`, xoá `hoat-hinh/doan-<id>/`, rồi chạy bước 3–5 cho đoạn đó.

## Ghi nhật ký

Mỗi bước một dòng vào `nhat-ky.md`: tỉ lệ phong cách, số đoạn, kết quả hai lần duyệt (điểm tổng thể, số đoạn ĐẠT / SỬA NHỎ / LÀM LẠI, số vòng), đoạn nào làm lại vì sao, thời gian render từng phong cách.
