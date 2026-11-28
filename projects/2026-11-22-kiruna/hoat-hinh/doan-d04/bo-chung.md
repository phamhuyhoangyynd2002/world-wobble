# Bộ chung cắt giấy tập 6 Kiruna (cho nhóm A và nhóm B)

Viết bởi thợ cắt giấy nhóm A, 28/11/2026. Mọi hàm nằm trong `window.XuLanh` (khối cuối `templates/hoat-hinh/cat-giay/lib/canh-nen.js`); đoạn nào dùng thì chạy lại `chuan_bi_doan.py <dự án> <id>` để chép lib mới. Trong `api.dat(...)` chèn `XL.defs()` một lần (gradient, vân gỗ, tường, băng). Mẫu chạy được: `doan-d06/canh.js` (phố cũ + phòng thuê).

## Trang phục Wob: `XL.wob(api, id, o)`

| Lớp thời gian | Gọi | Trông như |
|---|---|---|
| Mùa đông (tháng 2, tháng 12) | `XL.wob(api, "W", {})` | Áo phao xanh lam `#3D5A80` chần `#2B4262`, khoá kéo kem, MỘT túi vá bên phải (phía tay `R` của rig), mũ len xanh lá thông `#4F7A5A` vành `#3A5C43` quả bông kem, khăn kem sọc xanh lá thông dày (vẽ riêng đè lên cổ áo, có đuôi khăn bên trái), ba lô ô liu `#7C8646` cỡ thường, cuộn thảm đỏ `#C9463A` |
| Mùa hè (tháng 8, tháng 6) | `{ ao: "gile", kinh: 1, aoCuon: 1 }` | Gi-lê kem `#E9DDC3` viền `#B9A983`, túi vá phải, kính râm tròn gọng đen, không mũ, không khăn, áo phao cuộn trên nắp ba lô |
| Ở nhà | `{ ao: null, noPack: true }` | Không áo, không mũ, không khăn, không ba lô |

Tuỳ chọn thêm: `the: 1` (thẻ gỗ dây đỏ vắt qua nắp túi, thẻ treo ở mép PHẢI túi cho khăn không che – sửa lib 28/11, đoạn dùng `the: 1` phải chạy lại `chuan_bi_doan.py` trước khi render; túi phồng), `chum: true` (chùm chìa có chìa Kiruna móc ở quai ba lô) hoặc `chum: "nha"` (chùm chìa nhà, không có chìa Kiruna), `muBaoHo: true | "to"` (mũ bảo hộ trắng có đèn, thay mũ len), `khongMu`, `khongKhan`, và mọi tuỳ chọn của `api.wob` (`holdL`, `holdR`, `phuKien`).

Bộ điều khiển trả về như `api.wob`, thêm:
- `W.xl` selector: `the`, `cuc` (túi phồng), `tui`, `kinh`, `xoay` (mắt xoáy, ẩn), `mbh`, `mbhDen`, `khan`, `khanDuoi` (đuôi khăn, gốc ở chỗ buộc), `chum`, `pack`, `quai`.
- `W.theTui(t, 0|1)` bật/tắt thẻ gỗ thò khỏi túi (kèm túi phồng); `W.dutTui(t)` tay phải đút túi phải; `W.choang(t, 0|1)` mắt xoáy; `W.baLo(t, 0|1)`.
- Wob không lông mi (đặt sẵn `lashes: 0, ice: 0`). Khớp `scarf` của rig KHÔNG dùng (khăn vẽ riêng); đuôi khăn tự đung đưa khi `W.walk`, muốn bay phần phật thì khoá `rotation` của `W.xl.khanDuoi`.

## Chìa khoá

- `XL.chiaKhoa(id, { the, goc, s })`: chìa sắt than `#3A3F44`, đầu tròn có lỗ, răng thô; thẻ gỗ `#B98A5A` buộc dây đỏ `#C9463A`, vệt mực mờ, KHÔNG chữ, KHÔNG số. Gốc: tâm lỗ đầu chìa, thân hướng xuống. Dài ≈ 120 ở `s = 1`: cầm ở bàn với Wob size 1 dùng `s ≈ 1,1` (≈ 1/3 thân). Nhóm con `id-the` (thẻ) xoay được quanh lỗ.
- `XL.chumChia(id, { kiruna })`: vòng bạc + chìa đồng vàng `#C9A24A`, chìa bạc `#B8BDC2`, chìa đầu nhựa xanh lá thông `#4F7A5A`; `kiruna: true` thêm chìa Kiruna (nhóm `id-kir`, bật/tắt để luồn/tháo). Gốc: điểm treo đỉnh vòng. Cao ≈ 170.
- Đặt chìa vào tay: `holdR: '<g id="W-cam">' + XL.chumChia("W-cc", { kiruna: true }) + '</g>'` (thu nhỏ bằng `transform`), bật bằng `api.show`.

## Đèn bàn, bàn kỷ vật

- Đèn bàn nhìn ngang: dùng `DaoCu.deskLamp()` (chao cam `#E0703A`, cần xanh `#3F6A70`) như các tập trước.
- Bàn nhìn từ trên (đoạn Wob đứng mép trang, d04): `XL.banTuTren({ den: [x, y], coc: [x, y] | null })` → `{ nen, den }`: vân gỗ ấm, vệt đèn, cốc trà, chao đèn cam cùng màu `deskLamp` ở góc. Trang lịch sử tông cũ: `XL.trangCu(w, h, { seed, ke })`.

## Đạo cụ khác trong XuLanh (dùng lại được)

- Người giấy chung KHÔNG mặt: `XL.nguoiQue(api, id, { s, ao, quan, mu: "phot" | "toc" | "trum", dai, cam, camL, lat, sep })` (nhóm `id-vt` đặt x/y; `id-tL/tR/cL/cR/dau`), đi: `XL.queDi(api, id, t0, t1, x1)`.
- Nhà gỗ nhiều màu có tuyết mái: `XL.nhaGo({ w, h, mau, seed, cua, sang, sep })`; cột đèn có quầng: `XL.cotDen(h)`; phố cũ chiều tối: `XL.phoCu(api, id, { cua })`.
- Phòng thuê: `XL.phongThue(api, id, {...})` (giường, chăn phẳng/chăn cục, lò sưởi gang có mắt ẩn, tủ đầu giường, cốc nước gợn, đồng hồ báo thức không số, ghế vắt áo, móc + chùm chìa).
- Mỏ: `XL.matCatMo(api, id)`, `XL.mayDiaChan(id)`. Băng: `XL.nhaBang`, `XL.tuongBang`, `XL.giuongBang`, `XL.dieuKhacBang`.
- Đường sắt: `XL.duongRay(x0, x1, y)`, `XL.tauQuang(n)` (hai đầu máy + n toa, gốc mép phải đầu máy), `XL.raoChan(api, id, dai)` (cần `id-tay`: 0 hạ, −80 nâng), `XL.sanBongTuyet(w, h)`.
- Trang sổ bản đồ: `XL.honQuang(id, r)` (hòn quặng có mắt), `XL.tauBien`, `XL.tauPhaBang`, `XL.vuongMien` (vua chỉ là vương miện), `XL.keo`, `XL.tayWob(len, goc)` (tay áo phao thò vào khung), `XL.muiTenCong(pts, mau, w)`.
- Bản đồ: `python templates/hoat-hinh/cat-giay/cong-cu/chep_ban_do.py <dự án> <id> map-kiruna-centre` đã bỏ sẵn mọi chấm `<circle>`; tự đặt chấm + nhãn bằng `D.mapDot` đúng `chu_tren_do_vat` (hai ghim núi của map-kiruna-centre để trống).

## Bẫy đã gặp ở nhóm A

- `api.tuDung("radiator.")` khớp cả "radiator," (bỏ dấu câu): dùng `tMin` hoặc `k`.
- Nhóm có khoá opacity ở giữa đoạn (cảnh 1 ẩn sau khi cắt, chăn phẳng tắt khi trùm chăn) phải có khoá ở t = 0 trước, không thì ẩn từ đầu đoạn.
