# Đuôi tập dùng chung (`duoi-tap.js`)

Đoạn đuôi tập diorama theo `.claude/skills/mo-ket/SKILL.md` mục 2: bàn kỷ vật (`api.dungBan`), kệ kỷ vật bên trái có thẻ tên nơi, bản đồ giấy gợi ý (mảng lục địa trừu tượng, KHÔNG biên giới thật, không vùng Đông Nam Á/Biển Đông) có ghim mới + ghim trống vùng biển ấm (không nhãn), và lớp end screen phẳng: hai khung giấy trống 560×315 ở x 1180–1740 (y 130 và 480) + vòng trống Ø200 tâm (1460, 905). Bên trong khung và vòng không vẽ gì.

Cách dùng (ví dụ chạy được: `projects/2026-11-16-whittier/hoat-hinh/doan-d30/canh.js`):

1. `chuan_bi_doan.py` chép `_chung/` (gồm thư mục này) vào đoạn.
2. Thêm vào `index.html` của đoạn, sau `lib/dio-3d.js`: `<script src="_chung/mo-ket/duoi-tap.js"></script>` (`chuan_bi_doan.py` không ghi đè index đã có).
3. Trong `canh.js` chỉ nạp dữ liệu: `api.duoiTap(ban, { kyVat: [{the, ve, tang, cho, moi}], ghimMoi: {u, v, the}, ghimTrong: {u, v} })`, rồi gọi `datLen`, `rung`, `nhuc`, `moBanDo`, `camGhim`, `ghimRung`, `endScreen` theo mốc lời. Chú thích đầu file liệt kê đủ.

Kỷ vật có sẵn (`ve`): `tuDong` (Oymyakon: tủ đông nhỏ, đuôi cá vẫy), `loOpal` (Coober Pedy), `toLich` (Whittier: tờ lịch hầm còn băng dính), `ca`. Tập mới: thêm một khoá vào `VE` (chỉ thêm). Chữ thẻ phải có trong `chu_tren_do_vat`.

Lời đuôi tập ở `lop: "duoi"`: `api.khauHinh` chỉ chạy với `hien-tai`, nên đoạn đuôi tạm đặt `data.lop = "hien-tai"` quanh lệnh gọi (xem ví dụ).
