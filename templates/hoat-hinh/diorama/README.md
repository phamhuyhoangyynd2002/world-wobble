# Phong cách `diorama` – diorama giấy 2.5D / sách pop-up

Thư viện dùng chung cho mọi tập hoạt hình của World Wobble. Một **đoạn** = một composition HyperFrames, render ra clip câm, theo [`../HOP-DONG.md`](../HOP-DONG.md) (bắt buộc đọc trước). Tách từ bản thử `projects/2026-11-16-oymyakon/ban-thu-60s/c-diorama/` (16/11/2026).

## Hợp cảnh nào

- **Khung hiện tại của kênh**: Wob ở bàn kỷ vật kể chuyến đi (mở video, quay về giữa video, kết). Dùng lại nguyên mọi tập (`api.dungBan`).
- **Mở chương / vào hồi ức**: lật sổ du lịch, trang pop-up bật dựng, camera lao vào trang → nối `giay` sang đoạn sau (`api.soPopup`, `api.laoVao`, `api.raGiay`).
- **Cảnh "đến nơi" cần cảm giác không gian**, cảnh toàn: các lớp giấy ở nhiều độ sâu, camera dolly/lượn thật (thị sai), lớp gần mờ nhoè.
- Không hợp: chuỗi gag cắt nhanh, cận mặt liên tục (để `ve-tay`), cảnh phẳng nhiều lớp trượt ngang (`cat-giay`).

## Thư mục

```
templates/hoat-hinh/diorama/
  lib/dio-loi.js     lõi: màu, PRNG, tấm giấy 3D (cut/plane/floorPlane), bộ lọc giấy, camera 3 lớp, sfx, kiểm chữ, hạt giấy, DIO.chay
  lib/dio-wob.js     con rối Wob (makeWob + hành động, khẩu hình từ HH_DATA)
  lib/dio-dao-cu.js  đồng hồ khung hình (moiKhung), khói/hơi liền, tuyết màn hình, tuyết giấy 3D, cá, cá mềm, nhà, biển, hàng rào, nhiệt kế, găng tay, cốc nóng, vũng nước
  lib/dio-ban.js     sân khấu bàn kỷ vật dựng sẵn (api.dungBan)
  lib/dio-so.js      sổ pop-up (api.soPopup) + lớp dựng sẵn (api.lopPopup.*)
  lib/dio-noi.js     nối `giay` vào/ra, camera lao vào / lùi ra, DIO.hoanTat
  khung/             index.html (+ hyperframes.json, meta.json) – chuan_bi_doan.py chép vào đoạn
  cong-cu/kiem_doan.py   sinh sfx.json + đo cỡ chữ trên đồ vật (Chrome headless, không render)
  vi-du/             canh.js mẫu: mở video có sổ pop-up (d01), về bàn quấn chăn (d06) của bản phối Oymyakon
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

### Sổ pop-up (`dio-so.js`)
`api.soPopup(parent, {x, y, z, w, d, lop, biaTrong, mauBia})` → `so` với `moBia(t, d)`, `batLop(i, t, d)`, `bat(t, bước, bỏ)`, `moSan()`, `dong(t)`, `diemLop(i, px, py)` / `tamLop(i)` (toạ độ thế giới để ngắm camera), `diemTrang(u, v)`, `vung(cao)` (hộp cho tuyết giấy).
Lớp dựng sẵn (nội dung qua tham số): `api.lopPopup.doi(w, h, {x, banLe})`, `.nha(w, h, {x, banLe, nha, khoiCao})` (khói liền chạy khi lớp bật), `.bien([{chu, co}], {x, banLe, w, h})`, `.langNho(w, h, {x, banLe, n})`, `.tuy(svg, w, h, {...})`. Trang: u ∈ [0, w] từ gáy, v ∈ [−d/2, d/2] từ mép xa tới mép gần; lớp phía trước có `banLe` lớn hơn.

### Nối (`dio-noi.js`)
- Tự động theo `data.vao`/`data.ra` = `giay` (0,5 s). Tự làm: `api.raGiay(t0|null, d)` (null = kết thúc trước khung cuối 2 khung → khung cuối phẳng `#EFE3C8`), `api.vaoGiay(d)`.
- `api.laoVao(rig, t, d, diem, kCuoi)`: camera lao vào một điểm (vd `so.diemLop(1, 225, 300)`), kết hợp `raGiay`. `api.lui(rig, diem, d, camSau)`: vào đoạn từ sát trang rồi lùi ra.
- Lớp nối z-index 100, trên hạt giấy (50) nên khung nối phẳng tuyệt đối.

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

## Thời gian render (máy 12 lõi, GPU phần cứng, 3 agent chạy song song)

Khoảng 4–5 phút render cho 1 phút hoạt hình ở `delivery` (bản thử 60 s: 5 phút). Đoạn 12,6 s và 6,6 s của bản phối Oymyakon: xem `out/render.log` của từng đoạn. `check` ≈ 1 phút, `snapshot` 6–10 khung ≈ 1 phút.
