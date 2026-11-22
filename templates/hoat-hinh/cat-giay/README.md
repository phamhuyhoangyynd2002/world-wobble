# Phong cách "cắt giấy có khớp" (`cat-giay`)

Thư viện dùng chung cho đoạn hoạt hình phong cách cắt giấy của World Wobble. Tách từ bản thử A (`projects/2026-11-16-oymyakon/ban-thu-60s/a-cat-giay/`) ngày 16–17/11/2026. Theo hợp đồng `templates/hoat-hinh/HOP-DONG.md`.

## Hợp với cảnh nào

- Cảnh **có không gian nhiều lớp và đi lại**: phố, làng, chợ, đường đi; camera lia dọc cảnh, 3 lớp xa/giữa/gần trôi lệch nhau.
- Cảnh Wob **cầm, vác, gõ đồ vật** (con rối có khớp, đồ cầm theo tay).
- Gag vật lý chậm rãi kiểu stop-motion: vật rơi, cửa mở, nhiệt kế tụt, tuyết rơi trúng đầu.
- Không hợp: chuỗi gag cắt nhanh cận mặt (dùng `ve-tay`), cảnh bàn kỷ vật nhìn chéo 3D (dùng `diorama`).

## File

| File | Việc |
|---|---|
| `lib/dao-cu.js` → `window.DaoCu` | Helper giấy (`rough`, `rRect`, `rEll`, `paper`, `line`, `txt`, `defs`, `rng`) + đạo cụ |
| `lib/wob-rig.js` → `window.WobRig` | Con rối Wob (`svg`, `Wob`), bộ khoá tất định `Keys`, diễn xuất có tên |
| `lib/canh-nen.js` → `window.CanhNen` | Phông dựng sẵn có tham số: `langTuyet` (phố làng tuyết), `nhaCua` (nhà gỗ có cửa sổ, cửa mở) |
| `lib/phim.js` → `window.HHCatGiay` | `taoApi` (đối tượng `api` cho canh.js), `khoiDong` (khởi động composition) |
| `khung/` | `index.html` đúng hợp đồng mục 4 + `hyperframes.json`, `meta.json`, `package.json` |
| `cong-cu/tao_sfx.mjs` | Sinh `sfx.json` từ chính `canh.js` (chạy Node, không cần trình duyệt) |
| `cong-cu/chep_ban_do.py` | Chép bản đồ `map-*` của `assets/manifest.json` vào `doan-<id>/ban-do/` (bỏ chấm vẽ sẵn, cắt khung bằng viewBox, kiểm chủ quyền) để dán lên trang sổ |
| `mau/canh-mau.js` | `canh.js` mẫu tối thiểu |

`chuan_bi_doan.py` chép `lib/` (ghi đè mỗi lần) và `khung/` (chỉ khi chưa có, hoặc `--khung-moi`) vào `doan-<id>/`. **Sửa ở đây, không sửa trong đoạn**, rồi chạy lại `chuan_bi_doan.py`.

## Quy trình một đoạn

```bash
python .claude/skills/dung-hoat-hinh/scripts/chuan_bi_doan.py <dự án> <id>   # sinh du-lieu.js, chép lib + khung
# viết <dự án>/hoat-hinh/doan-<id>/canh.js
node templates/hoat-hinh/cat-giay/cong-cu/tao_sfx.mjs <dự án>/hoat-hinh/doan-<id>   # ghi sfx.json, kiểm sổ giấy phép
export PATH=$HOME/.nvm/versions/node/v22.23.3/bin:$PATH
cd <dự án>/hoat-hinh/doan-<id>
npx --yes hyperframes@0.8.85 check                       # 0 lỗi (6 cảnh báo cấu trúc là bình thường, xem Bẫy)
npx --yes hyperframes@0.8.85 snapshot --at 0,1.5,... --no-end --describe false   # mở contact-sheet bằng Read
npx --yes hyperframes@0.8.85 render -o out/render.mp4 -q delivery -w 2
ffmpeg -i out/render.mp4 -map 0:v -c copy out/doan.mp4   # bỏ rãnh tiếng nếu có: clip phải câm
```

Rồi trích 4–6 khung từ `out/doan.mp4` vào `out/frames/` và tự xem.

## Viết `canh.js`

```js
window.CANH = function (api, data) {      // data = window.HH_DATA (mốc tính từ đầu ĐOẠN)
  var D = api.D, CN = window.CanhNen;
  var nen = CN.langTuyet(api, { seed: 400, nha: [[400, 330, 200]] });
  var W = api.wob("W", { scarf: true, khan: "#D9543C", mu: "#C9463A" });
  api.dat(nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 })
        + api.lop("giua", nen.giua + W.svg, 1, { mat: 872 }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }));
  api.noi({});                                          // nối vào/ra theo data.vao / data.ra
  api.camera([[0, 900, 600, 1.1], [api.DUR, 1100, 610, 1.2, "sine.inOut"]]);
  var t = api.tu("outside");                            // mốc từ trong lời; hoặc data.nhip[i].tai
  W.set(0, { x: 700, y: 900, size: 0.7 });
  W.walk(t, t + 1.2, 700, 1100, { step: 0.28, tieng: true });
  W.idle(t + 1.4, api.DUR, { seed: 3 });
};
```

Cách làm theo `HH_DATA.nhip`: mỗi nhịp một khối code; lấy mốc từ **từ khoá trong lời** (`api.tu(từ, lần)`), hiệu ứng vào bắt đầu sớm hơn đúng bằng thời gian hiệu ứng. Không đổi lời, không thêm chữ: chữ trên đồ vật lấy từ `data.chu_tren_do_vat[i]` (vd `D.thermometer("th", { c: data.chu_tren_do_vat[0] })`). `khoiDong` kiểm mọi `<text>` và in cảnh báo `chữ ngoài chu_tren_do_vat` (xem `window.__hhLoiChu`). `trang_phuc` là luật liên tục: đồ Wob cầm/mặc phải khớp đoạn trước, đoạn sau. Hai đoạn "cùng con phố" dùng **cùng cấu hình** `langTuyet` (seed, nhà, cột…), chỉ khác vùng camera (xem `doan-d02`, `doan-d04` của bản phối Oymyakon).

## API (`api` truyền vào `CANH`)

**Dựng cảnh**
- `api.lop(ten, svg, p, {mat})` → chuỗi SVG một lớp parallax (`p`: xa 0,35 · giữa 1 · gần 1,4; `mat`: y mặt đất, gốc bật dựng khi nối `giay`). Camera điều khiển `#L-<ten>`, nối điều khiển `#L-<ten>-in`: **không** tween hai nhóm này.
- `api.dat(svg)` đặt toàn bộ nội dung (gọi một lần). Phần ngoài `api.lop` là tĩnh (trời, lớp hiệu ứng màn hình).
- Khoá liên tục (19/11/2026): mũ len `#C9463A`, khăn `#D9543C` (mặc định của `scarf: true` nay là đỏ `#D9543C` sọc kem, trước là cam); xe hộp của Wob màu giấy kraft (`boxCar`, `boxCarKinh`).
- `api.wob(id, opts)` → bộ điều khiển Wob có `.svg` để chèn. `opts`: `scarf` (true | màu), `khan`, `khanSoc`, `mu` (true | màu), `muVanh`, `tuyetDau`, `blanket`, `holdL`/`holdR` (SVG đồ cầm, đặt trong bàn tay).
- `api.g(id, svg, transform)`, `api.at(x, y, svg)` gói nhóm.

**Khoá hình** (tất định, phát ra `fromTo` nối tiếp)
- `api.set(sel, t, props)`, `api.to(sel, t, dur, props, ease)`, `api.key(sel, prop, t, v, ease)`, `api.show(sel, t, 0|1)`, `api.fade(sel, t, dur, v)`, `api.origin(sel, "x y")`.
- `api.pop(sel, t, dur, thuLúc)` bật ra từ 0 (back.out), tuỳ chọn thu lại.
- `api.duaRut(sel, t, {tu:[dx,dy], giu, vao, ra, xoay})` đưa vào – vượt – lắng – giữ – lấy đà – rụt (tay người bán, đồ chìa vào khung).
- `api.camera([[t, cx, cy, zoom, ease]], [tên lớp])`; `api.shake(t, biên, n)` (chỉ khoảnh khắc hài).

**Hiệu ứng**
- `api.khoi(id, x, y, {cao, rong, lech, uon, toc, mo})` → SVG cột khói thủ tục (dải uốn, mép có thuỳ trôi lên, vẽ lại mỗi khung on twos).
- `api.phut(id, x, y, {n, song, cao, troi, r, tu, den})` → khói phụt từng cụm mây giấy (ống xả, hơi thở).
- `api.hoi(prefix, t0, t1)` hơi 3 sợi của `D.teaMug(prefix)`.
- `api.lapLanh(prefix, n, seed, [x,y,w,h], t0, t1)` → bụi kim cương nhấp nháy.
- `api.moiKhung(fn(t), {twos})` hàm vẽ mỗi khung (gọi trong `modifiers` của tween đồng hồ).
- `api.duong(pts)` → `{d, dai, at(u) → {x, y, a}, den(u)}`: đường cong mượt qua các điểm, lấy mẫu theo độ dài. Dùng cho nét đứt tự vẽ dần (`moiKhung` + `den(u)`) và xe, máy bay chạy theo đường (`at(u)`, `a` là hướng tiếp tuyến). Mẫu: d04 tập 1.
- `api.locSepia(id, [[t, k]])` → `<filter>` sepia (k = 1 giấy cũ … 0 màu thật) nội suy theo thời gian; gắn `filter="url(#id)"` lên nhóm **không transform** bọc cả cảnh (vùng lọc theo khung 1920×1080). Bỏ thuộc tính filter khi đã về màu để render nhanh. Mẫu: d11 tập 1 (hình dung quá khứ → hiện tại).
- `api.locNhoe(id, nhomId, [[t0, t1, đỉnh]])` → `<filter>` nhoè ngang cho lia nhoè; tự gắn/bỏ filter trên nhóm `nhomId` chỉ trong khoảng nhoè. Mẫu: d15 tập 1.

**Lời, âm thanh, nối**
- `api.tu(từ, k)` mốc bắt đầu của lần thứ k từ có chứa chuỗi đó (null nếu không có). **Bẫy:** so chuỗi con và tính cả từ của câu vắt từ đoạn trước (mốc âm): `tu("So")` khớp "sources", `tu("On")` khớp "long".
- `api.tuSau(từ, tMin, k)` như trên nhưng chỉ xét từ có mốc ≥ `tMin` (mặc định 0). `api.tuDung(từ, tMin, k)` **khớp nguyên từ** (bỏ dấu câu, không phân biệt hoa thường) và chỉ từ mốc ≥ `tMin`: nên dùng mặc định.
- `api.khauHinh(wob, t0, t1)` mấp máy theo `loi[].khau_hinh`; chỉ chạy khi `lop = "hien-tai"` (hồi ức thì bỏ qua và cảnh báo).
- `api.sfx(ten, tai, am_luong)` ghi vào `sfx.json` (không phát trong đoạn). `walk(..., {tieng: true})` tự thêm `buoc-tuyet` đúng từng bước chạm đất (`tieng: "<ten>"` cho tiếng khác).
- `api.noi({vaoDai, raDai, tre, kieu: {<lớp>: "dung"|"truot"|"truot-tren"|"khong"}})`. Không gọi thì khung tự gọi với mặc định.

## Bộ điều khiển Wob

- `opts.phuKien`: SVG đeo trên thân (toạ độ gốc 400×400, vẽ trên mặt, dưới tay), nằm trong nhóm `#<id>-pk` đi theo thân trên: máy ảnh đeo cổ, bản đồ cầm trước mặt, vương miện băng trên mũ, nước mắt. Bật/tắt bằng khoá `opacity` của `#<id>-pk` (hoặc id con).
- Khớp (dùng trong `set`/`pose`): `x y size` · `sx sy lean` (co giãn, nghiêng quanh chân) · `upY upRot` (thân trên) · `aLu aLf aRu aRf` (vai, khuỷu; độ, 0 = thõng) · `legL legR` · `pack packY scarf hat pom` · `pupX pupY pLx pRx` · `eye` (cỡ mắt) · `lid` (0 mở … 62 nhắm) · `lashes` (scale lông mi) · `ice` (lông mi đóng băng 0/1) · `snow` (tuyết trên đầu 0/1) · `sway` (đung đưa quanh chân) · `op`.
- Cơ bản: `set(t, props)`, `pose(t, dur, props, ease)`, `mouth(t, hình)` (A–H, X, `o flat smirk grin wobbly chatter`), `walk(t0, t1, x0, x1, {step, arms: false|"R", tieng})`, `breathe`, `shiver(t0, t1, biên, hz)`, `autoBlink(t0, t1, seed)`, `blinkAt(t)`, `hand("L"|"R", t)` (vị trí bàn tay để thả đồ đúng chỗ).
- Diễn xuất có tên: `idle(t0, t1, {seed, bien, liec})` (dồn trọng tâm + thở, chữa "đứng chờ lời"), `soc(t)`, `nhonChan(t, dur, {lean, nhin})`, `vay(t, n, side)`, `nhunVai(t, giu)`, `go(t, n, side)` → mảng mốc chạm (đặt `bonk`), `nhinQuanh(t)`, `lacMat(t, dur)`, `vacVai(t, side)`.
- Tư thế nghỉ tay: trái `{aLu: 18, aLf: -10}`, phải `{aRu: -18, aRf: 10}`; vác vai trái `{aLu: 172, aLf: 28}` + đồ cầm xoay `-150`.

## Đạo cụ có sẵn (`DaoCu`)

`fish({eye, frost, seed})`, `fishFloppy(id)`, `deskLamp()`, `memoryBox()`, `bookStack()`, `villageSketch(id, {dong1, dong2})`, `notesPage(seed)`, `bubble("?!" | "..." | "bag" | "?")`, `thermometer(id, {c, f})` (`id-merc` cột thuỷ ngân, `id-c`, `id-f` nhãn), `logHouse({w, h, roof, seed, tone})` + `chimneyOf(o)`, `larch(h, seed)`, `marketStall()` → `{back, front}`, `fishBarrel(id)` (`id-tap`), `gloveHand()`, `paperBag(torn)`, `car(id, {mau, vien})`, `snowCar(id)` (`id-lump`), `teaMug(id)` (`-steam -ice -frost`), `freezerFrame(...)`, `fence(w, seed)`, `sparkle(r, màu)`, `puff(r, seed)`, `pole(h, dx, seed)`, `woodpile(w, seed)`.
Thêm 18/11/2026 (tập 1 trọn tập): `journalPage(w, h, {seed, ke, gay, mau})` trang sổ kẻ dòng có lò xo; `mapSticker(href, w, h, {id, seed, bang})` bản đồ (file chép bằng `chep_ban_do.py`) dán trong khung giấy xé; `mapDot(id, {r, nhan, co, ben, mau})` chấm địa danh + nhãn (`id-nhan`); `paperPlane()`, `boxCar(id)` → `{back, front}` (Wob ngồi giữa, ló đầu); `boxCarKinh(id)` → `{back, kinh, front}` xe hộp có cabin kính (`id-kinh`, `id-phan` vệt phản chiếu, `id-mo` hơi thở mờ kính, `id-cua` cửa mở, `id-b0/b1` bánh); `pencil(len, {goc})`; `clockSun(id, {r, nhan, co, goc})` đồng hồ giờ có nắng (`id-lat` lát nắng); `flashlight(id)` (`id-den`) + `beam(len, rong)` chùm sáng; `cameraSmall({day})`; `snowPile(w, h, seed)`; `signBoard(id, {w, h, cao, chu, co, hinh})` biển trên cột (`id-bang`); `notebookOpen(w, h, seed)` sổ mở hai trang; `paperMap(w, h, {nguoc})` bản đồ giấy không chữ (cầm ngược); `warmSpring(id, w, seed)` suối không đóng băng giữa bờ băng (`id-song0..2`); `reindeer(id, {mau, sung, seed})` tuần lộc (`id-dau`, `id-cc0..3`); `herder(id, {mau})` người chăn dạng bóng giấy chung, không mặt (`id-gay`); `tentCone(w, h, seed)`; `waterBottle(id)` chai nước (`id-bang` lõi đá, `id-mat` mặt nước sóng sánh); `iceCrown({nua})` vương miện băng (cả hoặc nửa); `monumentCold(id, {chu, co})` đài tưởng niệm tối giản (không chép thiết kế thật); `weatherStation({cu})`, `airstrip(len, rong, {cu})` (tông giấy cũ); `tear(r)`, `flake(r, seed)`. Gradient mới trong `defs()`: `beamG`, `gayG`, `skyNight`, `skyDusk`. Gốc toạ độ ghi ở chú thích từng hàm. Đạo cụ mới: thêm hàm vào `lib/dao-cu.js`, nhận tham số, không cứng chữ của tập.

## Nối giữa đoạn

- `giay` vào: khung 0 là giấy phẳng `#EFE3C8` (lớp `#hh-giay` phủ kín, hạt giấy/viền tối tắt); ~0,5 s các lớp bật dựng từ mép đất (hoặc trượt vào), giấy tan.
- `giay` ra: ~0,45 s cuối các lớp gập xuống, giấy phủ kín; khung cuối là giấy phẳng.
- `cat`: không làm gì; khung đầu phải đã là cảnh đầy đủ (đặt sẵn tư thế ở `t = 0`).
- `chen`: `noi` tự thêm sfx `whoosh` ở 0 s; khung đầu nên là hình to, rõ.

## Bẫy đã gặp

- **Khoá đầu tiên của một thuộc tính quyết định giá trị từ t = 0.** `api.show(sel, 7, 0)` một mình làm phần tử ẩn suốt đoạn; luôn đặt khoá ở 0 trước (`api.show(sel, 0, 1)`).
- **Nhóm đồ cầm/xoay phải có `api.origin(sel, "0 0")`** trước khi xoay, không thì xoay quanh tâm hộp bao (cá không nằm trên vai).
- Lint đòi chuỗi `window.__timelines` có trong HTML: khung đăng ký ở script cuối (`khoiDong(function (tl) {...})`), không đăng ký bên trong lib.
- Lớp phủ (hạt giấy, giấy nối) che chữ → `text_occluded` là LỖI: các div phủ và `txt()` đã gắn `data-layout-allow-occlusion`. Đạo cụ có chữ phải dùng `D.txt`.
- Các `.clip` để không `data-duration` (vì `chuan_bi_doan.py` chỉ ghi duration của root) → 3 cảnh báo `timeline_element_missing_timing` + 3 `nested_structure_needs_subcomposition`: bình thường, không phải lỗi.
- Không dùng `mix-blend-mode` (tắt chụp nhanh): hạt giấy là PNG có alpha + `opacity`.
- Wob đi qua trước chữ trên đồ vật thì che chữ: bố trí đồ có chữ ở chỗ Wob không đi qua (d02 dời nhiệt kế sang trái cửa sổ).
- Chữ ≥ 40px ở khung cuối = cỡ chữ × zoom camera lúc chữ hiện; `thermometer` dùng 46/42px, giữ zoom ≥ 1 khi đọc số.
- Cận mặt Wob (size 0,7): zoom ~4 ở tâm mặt (`y_chân − 135`).
- Wob mặc định **có lông mi đóng băng hiện sẵn** (`ice` = opacity 1): đoạn trước khi Wob có lông mi phải đặt `{ lashes: 0, ice: 0 }` ở t = 0; đoạn sau đặt `{ lashes: 1, ice: 1 }`.
- `W.set(t, {op: 0})` một mình làm Wob ẩn từ đầu đoạn (khoá đầu tiên quyết định từ t = 0): đặt `{op: 1}` ở 0 trước.
- Sửa `lib/` trong lúc đoạn khác đang render: chạy lại `chuan_bi_doan.py` cho mọi đoạn có `canh.js` gọi hàm mới **trước** khi render, không thì `canh.js` lỗi và clip ra giấy trơn.
- Bản đồ dán bằng `<image>` SVG vẫn nét khi camera zoom ~2×. Vùng bản đồ toàn đất (phóng 8×) trông như trang trống: đặt kèm ô nhỏ bản đồ rộng + khung phóng + hai đường nét đứt (d14 tập 1).
- Ánh tối có lỗ (chỉ còn đôi mắt, vùng đèn pin rọi): `<mask>` trắng + vòng `radialGradient` đen ở mắt/vùng sáng, đặt trong lớp giữa (cùng toạ độ thế giới); chùm sáng vẽ **trên** lớp tối, đặt theo `W.hand("R", t)` (d06 tập 1).

## Thời gian render tham khảo

Máy đang chạy song song 3 agent, `-q delivery -w 2` (17/11/2026): d02 (14,4 s) 146 s và 105 s; d04 (8,3 s) 80 s, tức khoảng 7–10 giây máy cho mỗi giây phim. Snapshot 10–12 khung ~40–60 s; `check` ~60 s. File delivery ~5,3 MB/giây (d02 77 MB). Bản thử A (60 s, nhiều cảnh hơn) mất 2 phút 18 giây bản nháp, 6 phút 40 giây bản delivery.

## Sinh `sfx.json`

`node templates/hoat-hinh/cat-giay/cong-cu/tao_sfx.mjs <doan-dir> [--in]`: chạy `canh.js` trong Node với `api` không DOM, gom `api.sfx` + tiếng bước + whoosh của `chen`, kiểm từng tên có `sfx/<ten>.wav` và dòng "Thương mại = có" trong `sfx/GIAY-PHEP.md` (thiếu thì mã 1). Vì vậy `canh.js` **không được chạm `document`** trực tiếp; vẽ mỗi khung thì qua `api.moiKhung`.
