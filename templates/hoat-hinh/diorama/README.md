# Phong cách `diorama` – diorama giấy 2.5D / sách pop-up

Thư viện dùng chung cho mọi tập hoạt hình của World Wobble. Một **đoạn** = một composition HyperFrames, render ra clip câm, theo [`../HOP-DONG.md`](../HOP-DONG.md) (bắt buộc đọc trước). Tách từ bản thử `projects/2026-11-16-oymyakon/ban-thu-60s/c-diorama/` (16/11/2026).

## Hợp cảnh nào

- **Khung hiện tại của kênh**: Wob ở bàn kỷ vật kể chuyến đi (mở video, quay về giữa video, kết). Dùng lại nguyên mọi tập (`api.dungBan`).
- **Mở chương / vào hồi ức**: lật sổ du lịch, trang pop-up bật dựng, camera lao vào trang → nối `giay` sang đoạn sau (`api.soPopup`, `api.laoVao`, `api.raGiay`).
- **Cảnh "đến nơi" cần cảm giác không gian**, cảnh toàn: các lớp giấy ở nhiều độ sâu, camera dolly/lượn thật (thị sai), lớp gần mờ nhoè.
- **Cảnh ngoài trời có chiều sâu thật** (đi qua phố, làng, phong cảnh, camera đi trong không gian): **chế độ 3D** `api.ngoaiTroi` (three.js, mục "Chế độ cảnh ngoài trời 3D"). Chốt 18/11/2026: T4 gộp vào diorama, không thành phong cách thứ 4.
- Không hợp: chuỗi gag cắt nhanh, cận mặt liên tục (để `ve-tay`), cảnh phẳng nhiều lớp trượt ngang (`cat-giay`).

### Chọn chế độ: CSS 3D hay cảnh ngoài trời 3D

| | CSS 3D (mặc định) | Cảnh ngoài trời 3D (`api.ngoaiTroi`) |
|---|---|---|
| Dùng cho | Bàn kỷ vật (`dungBan`), sổ pop-up, mở chương, cảnh toàn kiểu sân khấu giấy | Hồi ức ngoài trời: phố, làng, rừng, núi; Wob đi trong không gian; camera lướt, đẩy, lao, mờ ống kính thật. Chữa điểm yếu "làng phẳng màu" của bản thử C |
| Thế giới | Tấm giấy SVG cắt đứng trong `perspective` CSS | Khối 3D tô 3 bậc + viền mực theo độ sâu, mặt trời thấp đổ bóng dài, sương trùng màu chân trời |
| Wob | Con rối SVG (`api.makeWob`) | **Cùng con rối đó**, vẽ lại mỗi khung lên tấm phẳng nhận sáng, đổ bóng (`d3.wob`) |
| Chữ trên đồ vật | `api.txt` trong SVG | `d3.bienChu` (biển không nhận sáng; chữ vẫn chỉ từ `chu_tren_do_vat`) |
| Render (máy này) | ~4–5 phút / 1 phút hoạt hình | ~46 s / 8 s (≈ 6× thời lượng), mục "Thời gian render" |

Một đoạn chỉ một cảnh 3D (`api.d3`). Muốn cắt giữa bàn kỷ vật và phố trong cùng đoạn: dựng cả hai, bật/tắt bằng `api.hien(ban.stage, t, on)` và `d3.hien(t, on)` (3D tắt thì không vẽ). Thường gọn hơn khi tách thành hai đoạn, nối `giay`.

## Thư mục

```
templates/hoat-hinh/diorama/
  lib/dio-loi.js     lõi: màu, PRNG, tấm giấy 3D (cut/plane/floorPlane), bộ lọc giấy, camera 3 lớp, sfx, kiểm chữ, hạt giấy, DIO.chay
  lib/dio-wob.js     con rối Wob (makeWob + hành động, khẩu hình từ HH_DATA)
  lib/dio-dao-cu.js  đồng hồ khung hình (moiKhung), khói/hơi liền, tuyết màn hình, tuyết giấy 3D, cá, cá mềm, nhà, biển, hàng rào, nhiệt kế, găng tay, cốc nóng, vũng nước
  lib/dio-ban.js     sân khấu bàn kỷ vật dựng sẵn (api.dungBan)
  lib/dio-so.js      sổ pop-up (api.soPopup) + lớp dựng sẵn (api.lopPopup.*)
  lib/dio-noi.js     nối `giay` vào/ra, camera lao vào / lùi ra, DIO.hoanTat
  lib/dio-3d.js      chế độ cảnh ngoài trời 3D (api.ngoaiTroi → d3): phố, làng, nhà (cửa mở được), khói, núi, cây, tuyết, biển chữ, xe nổ máy,
                     đồng hồ treo, ngựa, cỏ hoa, ánh sáng đổi theo giờ, đổi mùa đông/hè, Wob tấm phẳng (+ áo lông, mồ hôi…), camera, hậu kỳ
  lib/dio-3d-nap.js  module nạp three.js vào window.THREE (khung luôn có thẻ này; chỉ cảnh 3D chờ nó)
  lib/vendor/        three.module.min.js + three.core.min.js (three.js 0.181.0, MIT: three-LICENSE.txt, sổ GIAY-PHEP.md)
  khung/             index.html (+ hyperframes.json, meta.json) – chuan_bi_doan.py chép vào đoạn
  cong-cu/kiem_doan.py   sinh sfx.json + đo cỡ chữ trên đồ vật (Chrome headless, không render)
  vi-du/             canh.js mẫu: mở video có sổ pop-up (d01), về bàn quấn chăn (d06) của bản phối Oymyakon;
                     canh-ngoai-troi-lang-tuyet.js: cảnh ngoài trời 3D (Wob đi phố làng tuyết, gag hơi thở đóng băng)
```

## Quy trình một đoạn

```bash
python .claude/skills/dung-hoat-hinh/scripts/chuan_bi_doan.py <dự án> <id>     # chép _chung, lib, khung; sinh du-lieu.js
# viết hoat-hinh/doan-<id>/canh.js (dưới đây)
cd <dự án>/hoat-hinh/doan-<id>
npx --yes hyperframes@0.8.85 check                                      # 0 lỗi (vài "info" tràn khung của tấm 3D là bình thường)
npx --yes hyperframes@0.8.85 snapshot --at 0,2.5,6,… --no-end --describe false   # xem contact-sheet bằng Read
python <repo>/templates/hoat-hinh/diorama/cong-cu/kiem_doan.py . --do-chu 3.5,8.7   # sfx.json + cỡ chữ
npx --yes hyperframes@0.8.85 render --quality delivery -o out/doan.mp4
```

Sửa thư viện ở `templates/hoat-hinh/diorama/lib/` rồi chạy lại `chuan_bi_doan.py` (lib bị ghi đè mỗi lần). Sửa khung thì thêm `--khung-moi` (không đụng `canh.js`, `sfx.json`).

## Viết `canh.js`

`canh.js` chỉ viết biên đạo:

```js
window.CANH = function (api, data) {
  var tl = api.tl;                        // timeline GSAP paused duy nhất; mốc = giây từ đầu đoạn
  var tu = {};                            // mốc từng từ: data.loi[].tu (đã đổi sang mốc đoạn, có thể âm)
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var ban = api.dungBan({ wob: { x: 250, z: 60 }, caCung: true, so: { lop: [ api.lopPopup.doi(430, 170, { x: 230, banLe: -150 }) ] } });
  api.camSet(ban.rig, null, { cx: 100, cy: 30, cz: -150, k: 150, rx: -14, ry: 8 });
  ban.so.moBia(data.nhip[1].tai - 0.1);  ban.so.bat(data.nhip[1].tai + 0.3);
  api.khauHinh(ban.wob);  api.gatDau(ban.wob);  api.breathe(ban.wob, 0, api.DUR);
};
```

- Đọc `data.nhip[]` (tai, loi, hanh_dong, gag, dao_cu, sfx), `data.trang_phuc` (luật liên tục với đoạn trước/sau), `data.vao`/`data.ra`, `data.chu_tren_do_vat`. Không đọc file khác của dự án.
- Hình phải xong đúng lúc từ khoá được đọc: hiệu ứng bắt đầu sớm hơn mốc từ đúng bằng thời gian hiệu ứng.
- `api.camTo` gọi **theo thứ tự thời gian** (mỗi lệnh bắt đầu từ trạng thái cuối của lệnh trước).
- Khung t = 0 phải là cảnh đầy đủ (vào `cat`, `dau-video`), không mờ từ đen; khung cuối `cat`/`cuoi-video` giữ hình.
- Chữ: chỉ chữ có trong `chu_tren_do_vat`; `api.txt` tự bỏ chữ lạ (báo lỗi console). Cỡ chữ ≥ 40px ở khung cuối: kiểm bằng `kiem_doan.py --do-chu`.

## API

### Lõi (`dio-loi.js`)
| Hàm | Việc |
|---|---|
| `api.tl`, `api.data`, `api.DUR`, `api.fps`, `api.C` (màu) | timeline, HH_DATA, độ dài đoạn, bảng màu Mực & giấy + Wob |
| `api.rr(a,b)`, `api.rng(seed)` | số giả ngẫu nhiên có seed (tất định) |
| `api.P(parent, v)` | nút 3D rỗng; `v` = {x,y,z,rotationX,…} |
| `api.cut(parent, w, h, svgInner, {pos, ax, ay, f})` | tấm giấy cắt đứng (svg), neo mặc định giữa đáy |
| `api.plane(parent, v, w, h, css)` / `api.floorPlane(parent, x, y, z, w, d, css)` | tấm HTML đứng / nằm |
| `api.F.AM, AM_NHO, AM_GAN, LANH, LANH_NHO, XA, XA_MO, GAN, WOB_AM, WOB_LANH` | bộ lọc giấy: độ dày + bóng đổ (+ mờ theo độ sâu) |
| `api.sk(d,w,c)`, `api.fp(d,fill,w)`, `api.txt(x,y,cỡ,đậm,chữ,màu)`, `api.lumpy(...)` | nét mực, mảng tô viền mực, chữ trên đồ vật (đã kiểm), mép tuyết |
| `api.sanKhau()` → `{stage, rig, the}` | sân khấu 3D trống (cho cảnh không phải bàn) |
| `api.camSet(rig, t|null, {cx,cy,cz,k,rx,ry})`, `api.camTo(rig, t, d, {...}, ease)`, `api.camRung(rig, t, d, amp)` | camera: (cx,cy,cz) ở giữa khung; `k` tiến lại (tỉ lệ ≈ 1200/(1200−k)); rx ngẩng/cúi, ry lượn |
| `api.sfx(ten, tai, am_luong)` | ghi sfx (tên file trong `sfx/` có trong sổ) |
| `api.vignette(stage, "am"|"lanh")`, `api.hatGiay(op)`, `api.hien(el, t, on)` | viền tối, hạt giấy (tự thêm), bật/tắt sân khấu |

### Wob (`dio-wob.js`)
`api.makeWob(parent, {x, y, z, s, f, trangPhuc})` → `w`. Bộ phận: `w.pos` (vị trí), `w.lift` (nhún, run), `w.svg`, `w.upper`, `w.talk`, `w.armL/armR`, `w.holdL/holdR` (nhóm đồ cầm), `w.pupL/R`, `w.lidL/R`, `w.m` (miệng), `w.face`, `w.lands`, `w.extra`, `w.bubbles`.

| Hàm | Việc |
|---|---|
| `trangPhuc(w, {mu, khan, chan, mi}, t?)` | mũ len, khăn, chăn ca-rô, lông mi đóng băng |
| `walk(w, t0, t1, x1, z1, {face, endFace, sfx, keepL, keepR, step})`, `hop(w, t, cao, d)`, `shiver(w, t0, t1, amp)`, `breathe(w, t0, t1)`, `nghieng(w, t, độ)` | thân |
| `quay(w, t, h, d)`, `quaySet(w, h)` | xoay mặt h ∈ [−1, 1]: mặt, lục địa trượt trên quả cầu, ba lô trượt ngược. **Không dùng rotationY trên Wob** (lộ tấm mỏng) |
| `look(w, t, dx, dy, d, cỡ)`, `crossEyes`, `lids(w, t, v)`, `lidsSet`, `blink(w, t, nền, chậm)`, `blinks(w, t0, t1, bỏ)` | mắt; mí 0.5 = tỉnh bơ |
| `mouth(w, t, "A".."H"|"X"|"O"|"S"|"N"|"K")`, `khauHinh(w, {bo, sau})`, `gatDau(w, {bo, amp})` | miệng; khẩu hình đọc `HH_DATA.loi[].khau_hinh` (chỉ `lop = hien-tai`, mốc âm → miệng ở khung đầu) |
| `armTo(w, "L"|"R", t, d, độ)`, `armSet`, `holdPose(side, arm, x, y, góc)`, `camDai(side, arm, góc, khoảng)`, `handWorld`, `TF`, `wobTheGioi(w, px, py)` | tay, đồ cầm (toạ độ hệ 400×400 của Wob) |
| `addBubble(w, key, api.BUB.soc|cham|tim|tui)`, `bubble(w, key, t, dài)` | bong bóng ký hiệu, không chữ |

### Đạo cụ, hiệu ứng (`dio-dao-cu.js`)
- `api.moiKhung(fn(t))`: gọi `fn` mỗi khung (modifiers của tween đồng hồ) – dùng cho mọi chuyển động lặp.
- `api.cotKhoi({x, y, cao, r0, no, troi, n, per, loai: "khoi"|"xa"|"hoi"})` → `{svg, chay(scope, t0, t1)}`; `api.khoi(parent, x, y, z, {scale, cao, t0, t1})`: **cột khói liền một khối** (các cục chồng nhau, viền mực chung bằng filter, bóng lưỡi liềm).
- `api.tuyetManHinh(layer, {n, rmin, rmax, blur, t0, t1})`, `api.tuyetGiay(parent, {vung, n, co, toc, t0, t1})` (tuyết giấy 3D vào dần từ trên).
- SVG: `fishSVG(cls, lim_dim)`, `caMemSVG()` (đầu `.lhead`), `houseSVG(w, h, {chim, door, wins})`, `signSVG([{chu, co}], {w, h})`, `fenceSVG(w, seed)`, `thermoSVG([chu1, chu2])`, `gangTaySVG()`; `cocNong({caoHoi, troiHoi})`; `vungNuoc(...)`, `giotNuoc(...)`, `roiGiot(giot, t, yTu, yToi)`.

Thêm 18/11/2026 (tập 1 bản trọn tập, chỉ thêm, không đổi hàm cũ):
- `api.gangLoSVG()`, `api.deoGang(w, "L"|"R", on, t?)`: găng lò nướng trên tay Wob (chèn vào nhóm đồ cầm, vẽ đè đồ đang cầm, ẩn chấm bàn tay). Đồ muốn nằm dưới găng thì chèn bằng `insertAdjacentHTML("afterbegin", …)`.
- `api.caNamSVG(huong, serene)` (cá nằm trên bàn, khung 320×124; `serene` = mắt lim dim), `api.chaiNuocSVG(tan)` (chai nước nhỏ 90×170: đông cứng / đã tan, `.chai-nuoc` để lắc óc ách, `.chai-loe` quầng sáng), `api.toRoiSVG()` (tờ rơi gấp ba, không chữ), `api.butChiSVG()`, `api.ongButNhoSVG()`, `api.conDauSVG()` (con dấu cao su, gốc = tay cầm), `api.hopMucSVG()`, `api.dauPhanQuyetSVG(chu, cx, cy, cỡ, góc, cls)` (dấu đỏ sẫm `#a8322a` in trên trang: tương phản ≥ 3:1 dưới đèn, chữ qua `api.txt`), `api.banChaiSVG()`, `api.khanDoSVG()`, `api.banDoGiaySVG()` (bản đồ ĐỒ CHƠI chỉ có kí hiệu núi, cây, nhà, đường chấm, không địa lý thật, không chữ; nhóm `.bd-truoc` / `.bd-sau` để lật), `api.nhaNhoSVG`, `api.truongHocSVG`, `api.tramKhiTuongSVG`, `api.khachSVG` (khách dạng chung, không mặt) cho lớp pop-up.
- `api.baLoTo(parent, x, y, z, {s})` → `{truoc, sau, mieng}`: ba lô to quá cỡ hai lớp; đồ bay tới `mieng` rồi rơi xuống thì khuất sau lớp trước.
- `api.tuDong(parent, x, y, z, {w, h, d})` → `{cua, ke, keY, mo(t, d), dong(t, d), suong(t0, t1)}`: tủ đông nhỏ 3D, cửa bản lề trái mở về phía người xem, kệ giữa (`ke` để đặt đồ bên trong), hơi lạnh phả ra.

- **Mắt nhắm, nháy (19/11/2026, lỗi "mắt rỗng" phản biện tập 1 vòng 1–2):** mí của rig là mảng màu thân phủ dần xuống; mí ≥ ~0,85 thì lòng trắng mất mà viền mắt còn → hai vòng rỗng (cả lúc nháy nhanh, 2–4 khung). Gọi `api.matKhongRong(w)` ngay sau khi dựng Wob ở bàn kỷ vật: với Wob đó `api.lids`, `api.lidsSet`, `api.blink` (và `api.blinks`) không khép mí quá 0,8 (còn dải lòng trắng + mép mí); đúng khung chạm 0,8 thì ẩn nhóm mắt, hiện nét mí (`tl.set`, không mờ dần), mở thì bỏ nét mí ngay khung đầu. Wob không gọi `matKhongRong` giữ hành vi cũ. Thêm `api.nhamMat(w, t, d, {kieu: "cuoi"|"thang"})`, `api.moMat(w, t, d, nen)`, `api.nhayCham(w, t, nen)` (tự bật). Kiểm bằng trích khung DÀY quanh mỗi lần nháy. Gọi các lệnh mí theo thứ tự thời gian (helper nhớ trạng thái mí).
- `api.muLongSVG()`: mũ hè trùm lông nâu đậm viền kem (220×190, móc treo ở (110, 8)).

### Bàn kỷ vật (`dio-ban.js`)
`api.dungBan(o)` → `ban = {stage, rig, the, TY, hop, so, wob, ca, caDung, caMem, coc, omCoc, COC_THUONG, trongHop, den}`.

| Tham số | Mặc định | |
|---|---|---|
| `hop: {x, z, w, d, h, do}` | (−300, −380), 340×230×150, `["gang","anh","thong"]` | hộp kỷ vật mở nắp; `ban.hop.mieng` (y miệng), `ban.hop.truoc` (z mặt trước) |
| `wob: {x, z, s, trangPhuc}` / `false` | (250, 60), 0.9 | |
| `so: {x, z, w, d, lop, moSan}` | gáy 330, z −330, 460×580 | sổ pop-up; `lop: []` = sổ đóng |
| `caCung` | – | cá cứng trong tay trái (`ban.ca`, đặt bằng `api.camDai`) |
| `caDung` | – | cá đứng trên bàn, ẩn sẵn (`ban.caDung`) |
| `caMem: {dx, goc}` | – | cá mềm vắt mép hộp + vũng + giọt (`ban.caMem.dau/vung/giot/giotTu/giotToi`) |
| `coc: {caoHoi, troiHoi}` | – | cốc nóng tay phải, cạnh thân (hơi không che mặt); `ban.omCoc(t, {L, R, x, y, goc}, d)` – nhấp: `{R: 70, x: 238, y: 292, goc: -18}` |
| `den`, `ke`, `ongBut` | bật | đèn bàn, kệ sách, ống bút mờ phía trước (`false` để tắt) |
| `baLo: {x, z, s}` | – | ba lô to quá cỡ cạnh bàn (`ban.baLo`, xem `api.baLoTo`) |
| `tuDong: {x, z, w, h, d}` | – | tủ đông nhỏ (`ban.tuDong`, xem `api.tuDong`) |
| `ongButNho: {x, z, s}` | – | ống bút nhỏ sắc nét cạnh sổ (`ban.ongButNho`) |

`ban.diuDen(t|null, d, v)`: dịu đèn bàn (v 0 = sáng thường, 1 = tối hẳn; lớp tối phủ sân khấu + quầng đèn mờ theo) cho đoạn kể nghiêm.

### Sổ pop-up (`dio-so.js`)
`api.soPopup(parent, {x, y, z, w, d, lop, biaTrong, mauBia})` → `so` với `moBia(t, d)`, `batLop(i, t, d)`, `bat(t, bước, bỏ)`, `moSan()`, `dong(t)`, `diemLop(i, px, py)` / `tamLop(i)` (toạ độ thế giới để ngắm camera), `diemTrang(u, v)`, `vung(cao)` (hộp cho tuyết giấy).
Thêm 18/11/2026: `so.dongBia(t, d, ease)` (gấp bìa có hoạt hình), `so.gapLop(i, t, d)` (lớp pop-up nằm xuống; gập hết trước khi gấp bìa, không thì lớp đứng xuyên bìa), `so.veTrang(svg)` (vẽ phẳng lên trang phải, dưới các lớp), `so.themTo(svgTruoc, {ben: "phai"|"trai", sau})` → `to.lat(t, d, "trai"|"phai")`, `to.hien(t, on)`: tờ giấy lật quanh gáy (bên phải nằm dưới bìa đóng và trên lớp đã gập; bên trái nằm trên mặt trong bìa; mặt sau mặc định giống mặt trong bìa nên tờ "ẩn" được bên trái), `so.coverIn` (nút mặt trong bìa = trang trái: tìm phần tử trong `biaTrong` bằng `querySelector`). Chữ trên trang nằm phẳng bị nén phối cảnh: muốn đọc thì cẩu camera nhìn xuống (`rx` −55…−60, đo bằng `--do-chu`), không lao vào trang bằng `api.laoVao` (đặt `rx: 0`, nhìn trang ngang mép) mà dùng `api.camTo` với `rx: -80`.
Lớp dựng sẵn (nội dung qua tham số): `api.lopPopup.doi(w, h, {x, banLe})`, `.nha(w, h, {x, banLe, nha, khoiCao})` (khói liền chạy khi lớp bật), `.bien([{chu, co}], {x, banLe, w, h})`, `.langNho(w, h, {x, banLe, n})`, `.tuy(svg, w, h, {...})`. Trang: u ∈ [0, w] từ gáy, v ∈ [−d/2, d/2] từ mép xa tới mép gần; lớp phía trước có `banLe` lớn hơn.

### Nối (`dio-noi.js`)
- Tự động theo `data.vao`/`data.ra` = `giay` (0,5 s). Tự làm: `api.raGiay(t0|null, d)` (null = kết thúc trước khung cuối 2 khung → khung cuối phẳng `#EFE3C8`), `api.vaoGiay(d)`.
- `api.laoVao(rig, t, d, diem, kCuoi)`: camera lao vào một điểm (vd `so.diemLop(1, 225, 300)`), kết hợp `raGiay`. `api.lui(rig, diem, d, camSau)`: vào đoạn từ sát trang rồi lùi ra.
- Lớp nối z-index 100, trên hạt giấy (50) nên khung nối phẳng tuyệt đối.

## Chế độ cảnh ngoài trời 3D (`dio-3d.js`)

Đoạn bật chế độ này khi `canh.js` gọi `api.ngoaiTroi(...)` (hoặc đặt `window.CANH_3D = true` ở đầu file): `DIO.chay` chờ module `dio-3d-nap.js` gắn `window.THREE` rồi mới dựng. Đoạn CSS 3D không chờ gì, không đổi gì. Mọi đơn vị là **mét** (Wob cao khoảng 1 m, cửa sổ 1,2 m: nơi đó trông to, Wob trông bé). Phố mặc định chạy dọc trục x, camera nhìn về −z. Mẫu đầy đủ: `vi-du/canh-ngoai-troi-lang-tuyet.js`, dựng thử ở `projects/2026-11-16-oymyakon/ban-thu-thu-vien/t5-dio-3d/`.

```js
window.CANH = function (api, data) {
  var d3 = api.ngoaiTroi({ anhSang: "trua-dong", suong: [14, 95], seed: 18 });
  d3.duong({ z: 0, dai: 140, rong: 5 });
  d3.dayNha({ x0: -34, x1: 34, z: -10.5, seed: 3 });
  d3.bienChu(-3.4, -3.3, [{ chu: data.chu_tren_do_vat[0], co: 46 }], { w: 3, h: 0.95, cao: 1.3, yaw: -0.45 });
  var w = d3.wob({ x: -8, z: 0.6, trangPhuc: { mu: true, khan: true } });   // trang_phuc như mọi module diorama
  api.walk(w, 0.5, 4.3, -1.5, 0.6, { face: 0.7, sfx: "buoc-tuyet" });      // hàm của dio-wob chạy nguyên, x/z bằng mét
  d3.cameraDuong([
    { pos: [-13.5, 1.6, 9.5], nhin: [-6, 1, -1] },
    { tu: 0.4, den: 3.6, kieu: "luot", pos: [-4.4, 1.05, 6.4], nhin: d3.theo(w, [0.7, 0.6, 0]) },
    { tu: 5.3, den: 5.66, kieu: "lao", pos: d3.theo(w, [0.35, 0.3, 2.9]), nhin: d3.theo(w, [-0.3, 0.52, 0]), roll: 3.5, mo: 12 }
  ]);
};
```

### Dựng thế giới (`d3 = api.ngoaiTroi(o)`)
| Hàm | Việc |
|---|---|
| `api.ngoaiTroi({anhSang, suong, muc, mucTan, fov, vienToi, nen, bong, seed, troiDinh, chanTroi, nang, troiSang})` | Renderer, trời shader, sương, mặt trời đổ bóng, mặt đất tuyết. `anhSang`: `"trua-dong"` (nắng thấp ấm, bóng xanh), `"chieu-ta"`, `"dem"` (cửa sổ sáng hơn), `"sang-som"` (sáng sớm còn tối), `"ban-mai"` (giờ xanh, chân trời hồng), `"trua-he"` (nắng cao gắt, trời xanh đậm, cửa sổ tắt thành kính). Mọi trường của bộ ánh sáng ghi đè được (`troiDinh`, `chanTroi`, `nang`, `troiSang`, `cuaSo`). `mua`: `"dong"` (mặc định) \| `"he"`. `bong: {tam: [x, z], rong, sau}` = vùng có bóng (mặc định ±35 × ±20 m quanh gốc): dời khi cảnh ở xa gốc. `muc` độ dày viền mực (px ở khung 1080, mặc định 4,6) |
| `d3.duong({x, z, dai, rong, yaw})` | Đường tuyết có vệt bánh xe |
| `d3.nha(x, z, {w, d, h, yaw, go, khung, cuaSo, cua, dongTuyet, khoi, seed})` | Nhà gỗ khúc (vân gỗ vẽ có seed, chân tường bẩn, tuyết bắn), mái tuyết, đầu hồi gỗ, cửa sổ sáng ấm có khung + bậu tuyết, cửa, ống khói + **cột khói** (`khoi: true` hoặc tham số `d3.khoi`), đống tuyết chân tường. Mặt tiền nhìn +z; `yaw: Math.PI` cho dãy bên kia đường |
| `d3.nha(...)` thêm 18/11/2026 | Cửa có bản lề `g.userData.cua` (tween `rotation.y` âm để mở ra ngoài, sau cửa là ô sáng ấm), `loiCua: true` dời đống tuyết khỏi lối cửa, `mai` màu mái tôn mùa hè |
| `d3.dayNha({x0, x1, z, khoang, w, h, d, yaw, lech, seed, ...tham số nha})` | Dãy nhà dọc trục x; kích thước, khe, lệch rải có seed |
| `d3.khoi(x, y, z, {cao, r0, no, troi, n, per, mau, t0, t1, seed})` | Cột khói liền một khối: các cục cầu bốc theo t, **chỉ viền mực ngoài cả cột** (lớp riêng trong lượt viền) |
| `d3.cotDien(xs, {z, cao, vong})`, `d3.hangRao(x0, z, n, {buoc, cao, mau, yaw})` | Cột điện + dây võng; hàng rào gỗ (vật tiền cảnh tốt, ngữ pháp: ~1/3 số shot) |
| `d3.nui([{x, z, r, cao, loai: "nui" hoặc "doi", tuyet, mau}])` | Núi nón chóp tuyết / đồi tròn ở xa (sương làm nhạt) |
| `d3.cay(x, z, {cao, loai: "thong" hoặc "tran", seed})`, `d3.rungCay({x0, x1, z0, z1, n, cao: [a, b], loai, seed})` | Cây lá kim phủ tuyết / thông rụng lá mùa đông (cành trơ); rải cả cánh rừng |
| `d3.dongTuyet(x, z, {r, cao, dai})` | Đống tuyết ven đường (đừng đặt sát ống kính: thành cục trắng to bị cắt mép) |
| `d3.bienChu(x, z, [{chu, co}], {w, h, cao, yaw, nen, mauChu})` | Biển chữ trên cột; `co` = cỡ chữ tính bằng cm trên biển. Chữ không có trong `chu_tren_do_vat` bị bỏ, báo console. Mặt biển không nhận sáng nên nắng xiên không làm xám. Vẽ lại khi `document.fonts.ready` |
| `d3.tuyetRoi({n, vung: [x0, x1, y0, y1, z0, z1], toc, co, t0, t1})` | Tuyết rơi tất định theo t (không viền) |
| `d3.anhSang(t0, t1, ten, muc)` | Ánh sáng đổi theo nhịp (thẻ `dong-ho-troi`): chuyển dần (smootherstep) từ ánh sáng hiện tại sang bộ `ten`, `muc` 0..1 = đi bao xa; `t0 = t1` đổi ngay. Trời, sương, nắng (màu, hướng, độ mạnh), ánh trời, cửa sổ cùng đổi. Ví dụ d21: `d3.anhSang(0, api.DUR, "sang-som", 0.85)` |
| `d3.doiMua(t, "he", {anhSang})` | **Cắt cứng đổi mùa** trên cùng thế giới, cùng góc máy (thẻ `cat-cung-doi-mua`): tuyết → cỏ (mặt đất), đường tuyết → đường đất, mái tuyết → mái tôn sơn, bậu tuyết → bậu gỗ, thông rụng lá ra lá xanh, chóp tuyết núi tắt, sườn đồi xanh; đống tuyết, tuyết rơi, khói ống khói tắt; ngựa, cỏ hoa (`mua: "he"`) hiện. Ví dụ d30 (chép thế giới của d07) |
| `d3.matMua(dong, he)`, `d3.chiMua(obj, "dong"\|"he")`, `d3.muaLuc(t)` | Tự làm đồ theo mùa: vật liệu hai bộ `{map, color}`; vật chỉ có ở một mùa |
| `d3.lang({x, z, rx, rz, hang, khoiTiLe, seed, ...tham số nha})` | Làng nhỏ nhìn từ xa: các dãy nhà trong elip (dãy chẵn quay +z, lẻ quay −z), `khoiTiLe` tỉ lệ nhà có khói. `d3.dayNha` cũng nhận `khoiTiLe` |
| `d3.xe(x, z, {yaw, mau, noMay, den, tuyet, denTrong, khoi, seed})` | Xe hộp nhỏ dạng chung (không nhãn hiệu): mũi xe +x cục bộ, ghế lái −z (yaw π → ghế lái quay về camera); kính trong có sương bám mép, hai ghế trống, vô lăng; đèn pha + vũng sáng; tuyết trên nóc (chỉ mùa đông); `noMay`: thân rung từng khung + ống xả phụt khói **từng cụm**; `denTrong`: đèn trần, ghế đọc rõ qua kính trong cảnh tối. Trả `{g, than, rung(t0, d, amp), nhun(t0, d, cao) (thân lún `cao` m rồi bật lại, đầu xe chúc: vỗ nắp), diem("ongXa"\|"mui"\|"cuaLai"\|"nap"\|"ghe")}` |
| `d3.xe(..., {cua: true})` thêm 21/11/2026 | Cửa lái có bản lề (mép trước), sau cửa là lòng xe tối: `xe.moCua(t, d, goc)` (mở ra ngoài, ease-out; `t` âm được để khung 0 đã đang mở), `xe.dongCua(t, d)`. Mặc định không có cửa (đoạn cũ không đổi). Ví dụ Oymyakon d01: Wob ló nửa người khỏi cửa ở khung 0 |
| `d3.chumDen(goc, dich, {rGoc, rDich, mau, manh, sangDich})` thêm 21/11/2026 | Chùm đèn pin: nón sáng cộng màu + quầng ở đích. `chum.bat(t, on)`, `chum.toi(t, d, dich)` lia chùm (smootherstep). `goc` nên là hàm đọc tay Wob: `function () { var h = api.handWorld("L", gsap.getProperty(w.armL, "rotation")); return w.diem(h[0], h[1]); }`. Đích đặt lên chữ thì giảm `sangDich` (≤ 0,35) kẻo quầng làm nhạt chữ. Đi cùng `api.denPinSVG()` (đèn pin cầm tay, `.denPin-sang` = kính sáng) |
| `d3.nhietKe(x, z, {cao, w, h, yaw, nen, muc0, nhan: [{chu, co, x, y, mau}]})` thêm 21/11/2026 | Nhiệt kế giấy trên cột gỗ (mặt không nhận sáng): `nk.muc(t, d, v)` thuỷ ngân tới mức v ∈ 0..1, `nk.hien(i, t, on)` hiện nhãn i (chữ chỉ từ `chu_tren_do_vat`; `co` cm, bảng 0,64 m rộng chứa được 'JAN AVG' co 7,5), `nk.diem(u, v)` điểm trên mặt bảng. `kiem_doan.py --do-chu` không đo được chữ vẽ trên canvas này: kiểm bằng khung trích |
| `d3.phut(goc, t, {huong, quang, dai, co, n, lan, keo, sang, mau, seed})` | Phụt hơi/khói một lần (xe khịt mũi, ống xả): các cục khói liền viền mực chung bay theo `huong`; `keo` rải các cục thành luồng; `sang` tự sáng để hơi trắng không xám trong cảnh tối. `goc`: `[x, y, z]`, hàm, hoặc `d3.theo(...)` |
| `d3.dongHo(x, y, z, {r, yaw, gio, phut, den, vien})` | Đồng hồ treo (kim, **không chữ số**, vạch 12-3-6-9 dày) + đèn hiên nhỏ. `dh.dat(gio, phut)`, `dh.chay(t0, t1, [g0, p0], [g1, p1])` (kim chạy) |
| `d3.ngua(x, z, {yaw, mau, bom, cui, s, mua, seed})` | Ngựa dạng chung, chắc nịch; `cui` 0..1 ngẩng → cúi gặm cỏ; đuôi phe phẩy |
| `d3.hoaCo({x0, x1, z0, z1, n, co, tiLeHoa, mau, bo, mua, seed})` | Khóm cỏ + hoa nhỏ (mặc định chỉ mùa hè), không viền; `bo(x, z)` trả true để chừa chỗ (lòng đường) |
| `d3.vatLieu(màu hoặc {...})`, `d3.them(obj, {doBong, nhanBong})`, `d3.canvasTex(w, h, ve, lap)`, `d3.THREE`, `d3.scene` | Tự dựng đồ riêng bằng three (vật liệu tô 3 bậc, texture vẽ Canvas2D có seed qua `api.rng`) |
| `d3.moiKhung(fn(t))` | Hàm chạy mỗi khung trước khi chụp (đồ 3D tự chuyển động) |
| `d3.hien(t, on)` | Bật/tắt cảnh 3D tại t (tắt thì không vẽ) |

### Wob trong cảnh 3D
- `w = d3.wob({x, z, y, cao, trangPhuc, huong})`: `api.makeWob` dựng con rối ẩn (cùng tạo hình gốc `tao_wob.py`), mỗi khung vẽ lại lên Canvas2D 1440×1344 (đọc `transform` + computed style từng phần: miệng, mí, con ngươi, tay, đồ cầm, mũ, khăn, chăn ca-rô) rồi dán lên **tấm phẳng quay về camera**, nhận nắng, đổ bóng dài, có bóng tiếp đất. Viền mực của thế giới không vẽ đè lên Wob.
- Dùng nguyên các hàm Wob của `dio-wob.js`: `walk` (x, z bằng **mét**), `quay`, `look`, `lids`, `blink(s)`, `mouth`, `khauHinh`, `gatDau`, `trangPhuc(w, {mu, khan, chan, mi}, t)`, `armTo`, `holdPose`/`camDai` (đồ cầm chèn vào `w.holdL/holdR`), `shiver`, `hop`, `nghieng`, `breathe`, `addBubble`/`bubble` (bong bóng là tấm riêng, không đổ bóng). Nhún, run (`w.lift`) và quay (`w.svg` scaleX) được chuyển sang tấm 3D. Không xoay Wob quanh trục đứng: tấm luôn quay về camera.
- `w.viTri()` (Vector3 hiện tại), `w.diem(px, py)` (điểm trong hệ 400×400 của Wob → toạ độ thế giới, ví dụ để ngắm camera vào tay).
- `d3.wob({..., sang})`: `sang` 0..1 cho Wob tự sáng một phần để đọc rõ trong cảnh đêm (d07, d21, d23 dùng 0,4); đổi theo t bằng `d3.moiKhung(t => w.mesh.material.emissiveIntensity = …)` (d30: 0,4 đêm → 0,06 trưa hè).
- **Đồ khoác thêm cho con rối** (định nghĩa trong `dio-3d.js`, mở rộng `api.trangPhuc` của `dio-wob.js`, chạy cả CSS 3D; không đổi tạo hình gốc): `api.trangPhuc(w, {aoLong, muLong, miRu, baLoPhong}, t?)` – áo lông dày tới chân (mũ trùm viền lông quanh mặt, tay áo lông), mũ lông tai bèo, lông mi rủ như cỏ héo, ba lô phồng thò đuôi cá. `api.moHoi(w, t, {x, y, vx, roi, d, co})` giọt mồ hôi chảy/văng; `api.khanBay(w, t, d, amp, buoc)` đuôi khăn phần phật (`buoc`: dãy hệ số biên độ, ví dụ `[1, 0.85, 1, 0.8, 0.9, 0.4, 0]` để khăn bay ngang lâu); `api.mayAnhSVG()` máy ảnh nhỏ cầm tay (đặt vào `w.holdR`, lớp `.flashAnh` là chớp đèn).
- `d3.hoi(w, t, {dai, huong, co, dong: {tai, roi}, coDinh})`: hơi thở trắng từ miệng, bay chếch sang một bên (khỏi che mặt); có `dong` thì hơi đông thành cục băng viền mực, treo, rồi rơi nảy xuống đất (gag). Hơi bám vị trí **hiện tại** của Wob: cho Wob đứng yên suốt gag hoặc truyền `coDinh: [x, y, z]`.

### Camera theo ngữ pháp (`_the-canh/NGU-PHAP-CAMERA.md`)
- `d3.cameraDuong(keys, {day})`: `keys[0] = {pos, nhin, roll, fov, mo, net}` là trạng thái đầu; mỗi lệnh sau `{tu, den, kieu, ...trường đổi}` (mốc giây từ đầu đoạn, theo thứ tự). `kieu`: `"luot"` (smootherstep, 18–40 khung), `"lao"` (ease-out, nhanh nhất ở khung đầu, 8–12 khung), `"vao"` (tăng tốc, lao vào trang giấy trước nối `giay`), `"em"` (sine). `den = tu` là cắt cứng. Trường bỏ trống giữ nguyên.
- Giữa các lệnh camera **vẫn đẩy vào** `day` mỗi khung (mặc định 0,0025 = 0,25 %/khung); lệnh có `day` đổi tốc độ cho khoảng giữ hình sau nó (0,006 ở chữ nhấn). Không có khung đứng yên.
- `pos`/`nhin`: `[x, y, z]`, `d3.theo(w, [dx, dy, dz])` (bám Wob: camera đi theo Wob) hoặc hàm trả `Vector3`.
- `roll` độ nghiêng (3,5–5° lúc punchline), `fov`, `mo` bán kính mờ nền xa (px ở khung 1080: cận 12–14, trung 10–12, vừa 7, toàn 0), `net` điểm nét (`"wob"` mặc định = mắt Wob, hoặc `[x, y, z]`).
- `d3.rungMay(t, d, amp)`: rung va chạm đổi chiều mỗi khung, tắt dần trong `d` (mặc định 7 khung). Chỉ khoảnh khắc hài.
- `d3.camLuc(t)` trả trạng thái camera (để kiểm).

### Hậu kỳ
Lượt chính (MSAA 4×) → lượt pháp tuyến + độ sâu của thế giới (khói lượt riêng, đánh dấu alpha) → **viền mực** (mép gần chỗ nhảy độ sâu + nếp gấp, mực tan dần ở 45–120 m, không vẽ đè lên Wob) → **mờ ống kính** 48 mẫu theo độ sâu, nét ở `net` → viền tối nhẹ (`vienToi`) → tone map Neutral. Hạt giấy (`api.hatGiay`) và lớp nối giấy của `dio-noi.js` vẫn phủ trên canvas như ở chế độ CSS, nên khung nối `giay` vẫn phẳng `#EFE3C8`.

### Kiểm chữ
`kiem_doan.py --do-chu` đo cả chữ trên biển 3D (`api.doChu3d`: chiếu thân chữ lên khung 1080; đã chạy được qua `file://` với module ES). Ví dụ làng tuyết: biển `co: 46` cm ra 58 px ở cảnh toàn, 86–112 px ở trung cảnh.

### Cách vẽ khớp với HyperFrames (đừng đổi)
- Vẽ được kích hoạt bởi sự kiện **`hf-seek`** của runtime HyperFrames (phát sau mỗi lần tua, cả lúc render) và bởi `tl.render` đã vá (tua ngoài runtime: `kiem_doan.py`, `DIO.doChu`, puppeteer). Lúc render, runtime **không** gọi `render` của instance timeline: chỉ vá `tl.render` thì clip đứng hình (đã gặp 18/11/2026).
- Không ép render lại cả timeline trong modifiers của tween đồng hồ (đã thử: lớp nối giấy kẹt ở opacity 1, render chậm 4×). Cùng một t chỉ vẽ một lần.
- Không đọc trạng thái con rối trong một tween đồng hồ đặt ở vị trí 0: tween đó chạy **trước** các tween của Wob khi tua tới (trạng thái trễ một lần tua).
- Camera: đặt lại quaternion trước `lookAt` mỗi khung (một lần NaN làm hỏng mọi khung sau). Không trùng tên hàm trên `d3` (đã gặp: hai hàm `rung` đè nhau → NaN, cả khung một màu).
- `check` cần canvas có `data-layout-allow-overflow` (thư viện tự gắn), không thì cảnh báo `canvas_content_at_edge`.

## sfx.json

Gọi `api.sfx("bonk", t, 0.8)` trong `canh.js`, rồi `python templates/hoat-hinh/diorama/cong-cu/kiem_doan.py <doan>`: mở trang bằng Chrome headless, đọc danh sách, kiểm tên có trong `sfx/` và `sfx/GIAY-PHEP.md` (Thương mại = có), ghi `sfx.json` đúng HOP-DONG mục 6. `--do-chu 3.5,8.7` in cỡ chữ hiển thị (px) của từng chữ trên đồ vật ở các mốc, gắn cờ chữ < 40 px trong khung.

## Bẫy kỹ thuật đã gặp

- **Chuỗi `</script>` trong file JS** (kể cả trong chú thích) làm HyperFrames (gộp script vào HTML) đóng thẻ giữa chừng → `DIO is not defined` + hàng loạt lỗi `<circle> attribute cx`. Không viết chuỗi đó trong `lib/`, `canh.js`.
- Lint tĩnh cần thấy `window.__timelines` trong HTML: đăng ký ở script inline của khung (DIO.chay nhận hàm `dangKy`). HyperFrames có thể đổi thứ tự script: khối inline chờ `load` nếu lib chưa có.
- Timeline GSAP là *thenable*: không `resolve(tl)`; thư viện không dùng Promise.
- `svgOrigin` của GSAP tính theo toạ độ gốc svg → không dùng cho đồ nằm trong cánh tay đang quay: dùng `holdPose`/`camDai`/`TF` (thuộc tính `transform` dạng chuỗi).
- Wob xoay bằng `rotationY` lộ tấm mỏng → dùng `api.quay`.
- Chuyển động lặp viết bằng `api.moiKhung` (không `repeat: -1`, không vị trí âm trên timeline).
- Layout lint trong 3D báo nhầm (hộp chữ chiếu chồng, tấm tường/bàn tràn khung): chữ có `data-layout-allow-*`, tấm `plane` có `data-layout-allow-overflow`. `check` vẫn còn vài "info" `panel_out_of_canvas` của thẻ con – bỏ qua. Cỡ chữ kiểm bằng `kiem_doan.py --do-chu` + mắt.
- Không `mix-blend-mode` (tắt chụp nhanh): hạt giấy dùng độ mờ thường.
- Lúc lớp pop-up đang bật dựng (≈ 0,3 s) chữ bị nén phối cảnh dưới 40 px: chấp nhận được, chữ đọc được ở mọi khung giữ hình.
- Tấm Wob cắt xuyên một vách hộp (ví dụ thò tay vào hộp kỷ vật) render đúng (Chrome tách mặt phẳng), nhưng kiểm bằng snapshot.

- **Từ lặp trong câu** (18/11/2026, d07 "sign", d23 "car"): bảng `tu[k]` lấy lần đọc ĐẦU của từ; nhịp sau cần lần sau thì tìm từ sau mốc nhịp (`tuSau(k, N[i])` trong d07/d23), không thì gag rơi sai chỗ.
- Hai tween cùng thuộc tính: `walk` tự đặt lại tay ở `t1` (0,2 s); khoanh tay, giơ tay ngay sau khi đi thì cho `walk` kết thúc trước (tween bắt đầu sau trong timeline thắng).
- Cảnh đêm: Wob tấm phẳng nhận sáng yếu nên tối mặt → `sang: 0.4`; bộ `"dem"` gốc khá tối, d07/d21/d23 ghi đè `troiSang.manh` 1,45 cho đọc rõ.

## Thời gian render (máy 12 lõi, GPU phần cứng, 3 agent chạy song song)

Đoạn ngoài trời 3D tập 1 (18–19/11/2026, máy chạy song song với agent khác): d07 6,24 s → 59 s; d30 8,96 s → 1 phút 45 s; d21 12,67 s, d23 6,67 s: xem `out/render.log` của từng đoạn.

Chế độ cảnh ngoài trời 3D (đo 18/11/2026, ví dụ làng tuyết 8 s, máy chạy một mình, GPU AMD Radeon tích hợp): `render --quality delivery` **46 s cho 8 s** (≈ 6× thời lượng, 1 phút hoạt hình ≈ 6 phút), file 26,6 MB/8 s; `check` ≈ 35 s; `snapshot` 12 khung ≈ 1 phút. Tốn nhất là mờ ống kính (khung có `mo` > 0) và vẽ lại con rối mỗi khung.

Khoảng 4–5 phút render cho 1 phút hoạt hình ở `delivery` (bản thử 60 s: 5 phút). Đoạn 12,6 s và 6,6 s của bản phối Oymyakon: xem `out/render.log` của từng đoạn. `check` ≈ 1 phút, `snapshot` 6–10 khung ≈ 1 phút.
