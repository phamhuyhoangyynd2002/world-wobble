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

3. **Chuẩn bị mọi đoạn** (chép `_chung`, `lib`, `khung`, sinh `du-lieu.js`, ghi `data-duration`):
   ```bash
   python .claude/skills/dung-hoat-hinh/scripts/chuan_bi_doan.py <dự án> --tat-ca
   ```
   Chạy lại an toàn: không ghi đè `canh.js`, `sfx.json` đã có. Đổi mốc trong `phan-canh.json` thì chạy lại bước này cho đoạn đó.

4. **Dựng song song**: giao cùng lúc ba agent, mỗi agent nhận danh sách id đoạn của phong cách mình:
   - `dung-cat-giay`: các đoạn `phong_cach = "cat-giay"`
   - `dung-ve-tay`: các đoạn `"ve-tay"`
   - `dung-diorama`: các đoạn `"diorama"`

   Prompt cho mỗi agent phải đủ: thư mục dự án, danh sách id đoạn, đường dẫn `phan-canh.json`, tiêu chí xong (hợp đồng mục 6). Một phong cách có nhiều đoạn dài (> 3 phút tổng) thì tách cho 2 agent cùng phong cách, mỗi agent một nhóm đoạn. Agent chỉ ghi vào `hoat-hinh/doan-<id>/` của mình; muốn sửa thư viện thì sửa `templates/hoat-hinh/<phong-cach>/` của đúng phong cách mình, rồi chạy lại bước 3 cho đoạn đó.

5. **Ghép**:
   ```bash
   python .claude/skills/dung-hoat-hinh/scripts/ghep_doan.py <dự án>
   ```
   Ra `hoat-hinh/out/video.mp4`, `video-no-music.mp4`, `audio-report.json`, `timeline.json`, `out/frames/noi-*.png` + `tong-hop.jpg`. Khi đang chờ đoạn thiếu, nghe thử nhịp bằng `--cho-thieu` (đoạn thiếu thành khung giấy phẳng).

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

## Sửa một đoạn

`/dung-hoat-hinh <dự án> --doan d03`: chạy bước 3 cho đoạn đó, giao agent của đúng phong cách sửa `canh.js` và render lại `doan.mp4`, rồi chạy bước 5. Đổi phong cách một đoạn: sửa `phong_cach` trong `phan-canh.json`, xoá `hoat-hinh/doan-<id>/`, rồi chạy bước 3–5 cho đoạn đó.

## Ghi nhật ký

Mỗi bước một dòng vào `nhat-ky.md`: tỉ lệ phong cách, số đoạn, đoạn nào làm lại vì sao, thời gian render từng phong cách.
