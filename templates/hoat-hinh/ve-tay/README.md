# Phong cách `ve-tay`: animatic vẽ tay kiểu storytime

Thư viện dựng một **đoạn** hoạt hình vẽ tay theo `templates/hoat-hinh/HOP-DONG.md`. Tách từ bản thử B (`projects/2026-11-16-oymyakon/ban-thu-60s/b-ve-tay/`) ngày 16–17/11/2026. Mẫu đã chạy: `projects/2026-11-16-oymyakon/ban-thu-60s/phoi/hoat-hinh/doan-d03/canh.js` (15,2 s, 7 shot) và `doan-d05/canh.js` (3,2 s, 1 shot).

## Hợp cảnh nào

Chuỗi gag cắt nhanh, punchline, cận mặt giữ hình tỉnh bơ, đoạn chèn ngắn (`vao: "chen"`), giả định "nếu như", sơ đồ giải thích vẽ tay. Không hợp: cảnh cần không gian nhiều lớp sâu (dùng `diorama`), lia dài dọc phố nhiều lớp giấy (dùng `cat-giay`).

Nhìn: nét mực rung ("nét sôi"), mảng màu tô lệch khỏi nét, giấy có thớ, nhân vật và đạo cụ nhảy bậc 12 hình/giây, camera mượt 30 khung.

## Thư mục

```
ve-tay/
  lib/00-loi.js       lõi: số học, nội suy khoá, bậc thang, rung, chớp mắt, co giãn, con lắc, đi bộ, SVG, chữ trên đồ vật, dữ liệu HH_DATA, khai sfx
  lib/10-wob.js       rig Wob (toạ độ gốc tao_wob.py)
  lib/20-dao-cu.js    đạo cụ, bối cảnh
  lib/30-hieu-ung.js  hiệu ứng hoạt hình, ký hiệu ?! bằng nét
  lib/40-nen.js       nền giấy + hạt giấy sinh bằng canvas, seed cố định (không file ảnh)
  lib/50-noi.js       nối đoạn: giay, chen (cat không cần gì)
  lib/90-may.js       bộ máy: dựng SVG, đồng hồ GSAP, đăng ký timeline
  khung/              index.html, hyperframes.json, meta.json (chuan_bi_doan.py chép vào đoạn)
  cong-cu/kiem_doan.mjs   kiểm đoạn không cần trình duyệt + sinh sfx.json
  cong-cu/xuat_doan.sh    check / snapshot / render + trích khung
  mau/canh.mau.js     mẫu canh.js tối thiểu
```

## Quy trình một đoạn

```bash
python .claude/skills/dung-hoat-hinh/scripts/chuan_bi_doan.py <dự án> d07      # chép lib, khung, sinh du-lieu.js
cp templates/hoat-hinh/ve-tay/mau/canh.mau.js <dự án>/hoat-hinh/doan-d07/canh.js   # rồi viết biên đạo
node templates/hoat-hinh/ve-tay/cong-cu/kiem_doan.mjs <doan-d07>                # vẽ thử mọi khung, ghi sfx.json
cd <doan-d07> && npx --yes hyperframes@0.8.85 check                             # 0 lỗi
npx --yes hyperframes@0.8.85 snapshot --at "0,1.2,3.4"                          # xem snapshots/contact-sheet*.jpg bằng Read
WORKERS=4 bash templates/hoat-hinh/ve-tay/cong-cu/xuat_doan.sh <doan-d07> render delivery "0.2,2,5"   # out/doan.mp4 + out/frames/
```

Sửa thư viện ở `templates/hoat-hinh/ve-tay/lib/`, rồi chạy lại `chuan_bi_doan.py` (nó ghi đè `lib/` của đoạn, không đụng `canh.js`, `sfx.json`). Sửa khung thì thêm `--khung-moi`.

## Viết `canh.js`

```js
window.CANH = function (VT, D) {          // D = window.HH_DATA (mốc tính từ đầu đoạn)
  var T_BAG = VT.tu("bag", 1);           // mốc từ trong lời; lần thứ n (đếm từ 0) trong ĐOẠN
  VT.sfx("pop", T_BAG + 0.02, 0.75);     // khai sfx ở thân CANH, KHÔNG trong ve()
  return [
    { a: 0, b: 2.2, ten: "toàn cảnh", ve: function (t, lt, T) {
        return { cam: [960, 540, 1], shake: [0, 0], world: "<svg…>", over: "", tint: "cold" };
    } },
    …                                     // các shot nối liền phủ [0, D.thoi_luong]
  ];
};
```

- `ve(t, lt, T)`: `t` là thời gian đã nắn về bậc 1/12 s, dùng cho **mọi thứ** trong `world`/`over`; `lt = t − a`; `T` là thời gian liên tục, **chỉ** dùng cho camera (world chỉ dựng lại khi bậc đổi, nên world dùng `T` sẽ lệch).
- Trả: `cam [cx, cy, zoom]` (toạ độ thế giới 1920×1080), `shake [dx, dy]`, `world` (theo camera), `over` (theo khung, vẫn qua nét sôi), `tint` `"warm"|"cold"`, `bg` (màu nền thay giấy).
- Đọc `D.nhip[]` để biết việc từng nhịp (`hanh_dong`, `gag`, `dao_cu`, `sfx`), `D.trang_phuc` (luật liên tục đồ mặc), `D.boi_canh`, `D.vao`/`D.ra`. Được thêm chi tiết, **không** đổi lời, **không** thêm chữ, số ngoài `D.chu_tren_do_vat`.
- Mốc gag lấy bằng `VT.tu(...)` (bám lời thật) hoặc `D.nhip[i].tai`. Không tự tính từ độ dài chữ.
- Nhịp mặc định đã thử: shot 1–3 s, cận mặt giữ hình 2–4 s ở punchline.

## API chính (`window.VT`)

**Thời gian, chuyển động**
- `key(t, [[t0, v, ease?], …])` nội suy (v số hoặc mảng); ease: `lin io io3 out out2 in in2 sine back elastic bounce` áp cho đoạn đi TỚI khoá đó. `pick(t, [[t0, v], …])` bậc thang. `seg(t, a, b)` 0..1.
- `shake(t, t0, dur, amp)`, `shakes(t, [[t0, dur, amp], …])`; `blink(t, chu kỳ, lệch)`; `slowBlink(t, at, dur)`.
- `squash(sy)` → `[1/√sy, sy]`. `conLac(t, t0, pos, o)` góc con lắc tắt dần theo gia tốc của `pos(s) → [x, y]` (cho ba lô, đồ treo).
- `buoc(t, {t0, t1, x0, x1, chuKy, s})` → `{x, phase, stride, walking, flip, steps:[{t, x}]}`; số bước làm tròn để dừng đúng lúc chạm chân. `steps` dùng cho sfx `buoc-tuyet` và khói chân.

**Dữ liệu**: `tu(word, n, "end"?)` (ném lỗi nếu không có), `nhip(i)`, `khauHinh(t)` (A–H/X, chỉ khi `lop = "hien-tai"`), `sfx(ten, tai, am_luong)`, `data()`.

**SVG**: `shape(d, fill, {sw, ox, oy, op, rule})` mảng tô lem + nét; `line(d, sw, màu, op)`; `ell`; `dot`; `g(transform, inner)`; `tr(x, y, s, rot, sx)`; `wrap(o, inner)`; `smooth(pts, closed)`; `text(x, y, chữ, cỡ, o)` (tự BỎ chữ không có trong `chu_tren_do_vat`; cỡ hiển thị cuối ≥ 40px tính cả zoom).

**Wob**: `VT.wob(o)` → SVG. `(x, y)` điểm giữa hai bàn chân, **luôn truyền `s`** (mặc định 1 = cao ~400px).
- Thân: `flip`, `lean`, `sq` (ngang tự giữ thể tích), `bob`, `smear` (px: thân kéo thành giọt thật + vệt tốc độ), `pack` (góc ba lô), `shiver`, `marks: shiver|shock|sweat`.
- Mặt: `eyes: open|wide|cross|squint|happy|closed`, `px py` con ngươi, `lid`, `brows: up|flat|worried|skeptic|down`, `lashes` 0..1.4 + `lashIce`, `mouth: A–H|X|smile|chatter|chatter2|o|oSmall|flat|smirk|frown|wobbly|content|sip`.
- Tay ống cao su: `arms` (tên trong `VT.ARM`: `rest up low hug cup point pointL shrug shock offer shoulder shoulderShrug`) hoặc `armL/armR: [x, y]` bàn tay trong hệ Wob (gần thì tay tự cong, xa thì duỗi). Bàn tay `handL/handR: tron|nam|chi|xoe` (`tron` đúng hình gốc).
- Cầm đồ: `prop` vẽ giữa tay và bàn tay (bàn tay đè lên vật = đang cầm), `propBack` sau thân (vác trên vai), `propFront`.
- Chân: `legs: stand|walk|shiver|apart|tuck|tiptoe`; đi bộ: `phase`, `stride` từ `VT.buoc` (chân trụ đứng yên, chân vung theo cung, mũi giày hếch, thân nhún 2 lần/chu kỳ, lạch bạch, tay vung ngược).
- Đồ: `cold` (biển nhạt), `frost`, `beanie`, `scarf`, `blanket`, `snowhat`, `noPack` (ba lô đã tháo: không vẽ ba lô và quai; vẽ riêng bằng `VT.backpack`). Màu mũ khoá liên tục (19/11/2026, khớp cat-giay, diorama): `beanie: "khoa"` (mũ `#C9463A`, vành `#A8352B`, bông `#F6EEDC`; `VT.MU_KHOA`); `beanie: true` giữ màu cũ (vành kem) để không đổi đoạn đã dựng.
- Đổi toạ độ: `wobPt(o, lx, ly)` hệ Wob → khung; `wobLocal(o, X, Y)` khung → hệ Wob (đặt bàn tay đúng vào vật: `o.armR = VT.wobLocal(o, X, Y)`). Cả hai tính nhún, nghiêng, co giãn; `o` phải có cùng `s` như lúc vẽ.

**Đạo cụ** (gốc toạ độ ghi trong code): `fish {bend, thaw, eye: open|serene|limp|wide, frost}`, `cup {state: hot|frozen|empty|flip, t, tFreeze, steam}`, `steam {t, frozen, tFreeze}`, `teaBlock`, `bag {torn, tear, handle}`, `scrap`, `glove {open, rot, sleeve, color}` (người bán = bàn tay đeo găng, không mặt), `stall {goods, stripe, icicles}`, `barrel {n, knock, kk}`, `freezer {part: body|door|all, close, contents}`, `house {w, h, door, open, window, smoke, icicles, faint}`, `car {run, snow, color}`, `thermo {level, mark, labels, frost, icicle}`, `desk(y)`, `lamp`, `lampLight`, `box`, `bookClosed`, `bookOpen {left, right}`, `pageFlip {k}`, `pageVillage {lit, sign}`, `logWall()`, `puddle`.
Thêm 18/11/2026 (tập 1, d02–d17): `backpack {puff, straps}` (ba lô tháo rời, gốc giữa đáy, cùng hình ba lô của rig), `pencil {len, rot}` (gốc ở ngòi), `pencilTo(hand, tip, {s})` (bút chì to nối từ bàn tay tới điểm đang vẽ), `alongPts(pts, k)` (điểm dọc đường gấp khúc để đặt ngòi), `stick {broken}`, `photoCam {side: front|back, screen: on|off, eye}` (ống kính "nhìn" được), `signTiny {icon: monument|thermo, text, board}` (biển làng nhỏ, biểu tượng thay chữ), `bigX {k}` (dấu X đỏ đóng sập), `iceCrown {glint}`, `flag {t}` (cờ trơn), `binoculars`, `planeSeat {cushionOnly, backOnly}`, `planeWindow {t}`, `boxCar {run, lights, snow}` (xe hộp, ô cửa trống để thấy Wob ngồi trong: vẽ Wob trước rồi vẽ xe), `gasPump`, `gasStation {glow, pumps}` (không chữ), `weatherStation {old}` (lều chớp đặt nhiệt kế + cột gió), `monument {plain}` (đài tưởng niệm vẽ chung, không chép thiết kế thật), `thermoMini {level, color}` (nhiệt kế không số), `globe {r, lat0, lats, dashed: {lat, k}}` + `globePt(o, lat, lon)` + `globeLat(o, lat)` (địa cầu CHỈ có lưới kinh vĩ, không lục địa; bản đồ thật vẫn chỉ vẽ bằng `ve_ban_do.mjs`), `domeLid {w, h, op}` (nắp chụp trong suốt), `cloud`, `arrowWavy {x0, y0, x1, y1, k, amp, n, color, head}` (mũi tên lượn sóng vẽ dần), `valley {w, depth, floor, mtn, mtnW, ext, fill, t}` + `valleyY(o, x)` (mặt cắt thung lũng hình bát, khí lạnh đọng theo `fill`), `coverFrame {k}` (bìa tạp chí không chữ đóng sập). Thêm 19/11/2026: `monumentSlab {plaque, plain}` (đài tưởng niệm khối trắng, cột thuỷ ngân xanh, bảng ở chân: dáng khoá liên tục d12–d13; `plaque` chỉ truyền khi chữ có trong `chu_tren_do_vat`), `signTiny {w, icon: "slab"}` (biển rộng hơn, có cả biểu tượng và chữ thì biểu tượng dồn trái). Thêm 21/11/2026: `torch {on, len}` (đèn pin, gốc giữa thân, đầu đèn bên phải; `on` có chùm sáng).
Thêm 23/11/2026 (tập Coober Pedy): rig Wob có `sunhat` (mũ rộng vành kraft `#C9A46A` dải đỏ `#C9463A`, `true` hoặc `{rot, dx, dy, smoke, dust}`), `packColor: "oliu"` (ba lô xanh ô liu, `VT.PACK_MAU`), `grassRoll` (cuộn cỏ xanh trên nắp ba lô), `packOpen 0..1` (nắp bật); `VT.sunhat {legs (pha bò), eyes, smoke, dust}` (mũ đứng riêng: rơi, bò, treo; gốc giữa vành); `VT.backpack` nhận `packColor`, `grassRoll`. Đạo cụ: `shovel {dirt}`, `rock {r, smug, seed}`, `opal {r, glow, t, dull}`, `mound {w, h, seed, color}`, `desertGround(y)`, `sunBig {r, t}`, `infoBoard {w, h, post, title, size, lines, hi}` + `infoBoardLine(o, i)`, `stickPerson {phase, hat}` (người que chung, không mặt), `puzzle {mark}` (vạch đếm, không chữ số), `hillCut {w, h, cut}`, `fan {t, speed, droop}`, `meter {t, speed}`, `calendar {k}`, `tinHouse {hot, t}`, `bill`, `golfClub`, `roll {len, r, col, unroll}`, `bigKey {tag}`, `handGeneric {sleeve}` (bàn tay chung, không người cụ thể), `blob(r, seed, n, amp)`; màu `C.sand`, `C.dirt`, `VT.OPAL_MAU`.
Thêm 23/11/2026 (tập Whittier): rig Wob có `raincoat` (áo mưa vàng `#E2B33C`, `true` hoặc `{hood, wet}`), `pajama` (áo ngủ sọc xanh), `cap` (mũ lưỡi trai xanh băng), `sunglasses`, `shoes: "dep"|"ung"` (dép lê, ủng cao su), `scarf: "kem"` (khăn kem sọc đỏ), `beanie: "kem"` (mũ len kem bông đỏ `VT.MU_KEM`) hoặc `{rot}` (mũ lệch). Đạo cụ: `bridge1 {len}` (cầu một làn, gốc đầu trái mặt cầu), `signal {state: red|green|off}`, `train {n, carLen, loco, car, t}` (gốc mũi đầu máy, toa kéo về −x), `convertible {part: back|front|all, roof 0..1, color, run}` (vẽ back → Wob → front để Wob ngồi trong), `timetable {w, h, lines, texts, back}`, `goldPan {water, t}`, `bottleCap`, `anchor`, `ship` (không cờ), `tape {len, droop}` (thước dây), `planeSimple {blind, t}` (không cờ, không ký hiệu), `tunnelGate {open}`, `clockFace {a, wedge}`, `boots {relieved}`, `basket`, `floatRing {part}`, `waterColumn {w, h, t}`, `bowlingPin {fall}`, `snowflake {r}`, `priceTag {dx, dy}`, `rectS(x0, y0, x1, y1, fill)`, `rain(t, n, box, {slant, speed, len})` (mưa xiên tất định), `towerWall {w, h, cols, rows, lit, door}`, `miniCoat {wet, t}` (áo mưa nhỏ).
Thêm 26/11/2026 (tập Santa Cruz del Islote, chỉ thêm): rig Wob nhận `sunhat: "coi"` hoặc `{mau: "coi", rot, dx, dy}` (mũ cói: cùng dáng, vành rơm `#DDBF7A`, nét đan chéo `#B08A48`, dải xanh ngọc `#2A9D8F`; `VT.MU_COI`), `VT.sunhat({mau: "coi"})`; không truyền `mau` thì giữ màu kraft cũ. Kéo mũ sụp che mắt: `sunhat: {mau: "coi", dy: 58}`. Đạo cụ (gốc toạ độ ghi trong code): `baLoKhongLo {open, wet, side, noCan, lidPeek}` (ba lô khổng lồ ô liu cao ~410 ≈ 1,6 thân Wob, cuộn thảm đỏ trên nắp, bình xịt ở túi hông trái; dùng với Wob `noPack: true`; ôm trước ngực = truyền vào `propFront` theo hệ Wob), `binhXit` (nắp xanh ngọc, nhãn muỗi gạch chéo, tem đỏ còn niêm phong, không chữ), `muoi {t, pose: bay|dung|hong, eyes: open|cross|closed|smug, hat: tiec|tiec-tay, suitcase, point}`, `vali`, `gheNhua {color}` + `VT.GHE_MAU`, `phaoVit`, `umbrella {open}`, `dongHoXang {level}` (không chữ, không số, không E/F), `bamDem {press, heat, smoke, t}` (không số), `keo {color, eyes, hat, legs}` + `VT.KEO_MAU`, `huKeo {fill, seed, lid}`, `discoBall {len, r, t}`, `duoc {seed}` (cây đước rễ chống), `bien {y, t, col, deep, n, x0, x1, depth}` (mặt biển), `daoNha {w, seed, lit, faint, door}` (đảo kín nhà nhìn ngang), `muTiec`, `muPhuThuy`, `mayHutAm {t, water}`, `pinMatTroi {dashed}`, `chauNhua {part: back|front}` (vẽ back → Wob → front), `cocNhua`, `canCau {h, len, cap}` + `canCauMoc(o)`, `thuyenCa {sink, color}`, `thuyenGiay`, `cucAo {r}`, `ruong {open}`, `xengNhua {fold, square}`, `dayDen {x0, y0, x1, y1, n, sag, on}`, `thanhGia`, `thucDon {page, turn}` (chỉ hình vẽ món), `vong {w, d, part: back|front}` (võng), `hopCom`, `rrect(x0, y0, x1, y1, r)`; màu `VT.DAO_MAU`, `VT.NHA_MAU`.
Bối cảnh: `sky(màu, op)`, `ridge(y, shift)`, `farHouses(y, shift, t, n)`, `snowGround(y)`, `fog(t, y0, n)`, `diamondDust(t, n, box)`, `snowfall(t, n, box, speed)`. Bối cảnh phủ rộng −1200..3100 để camera lia, zoom không lộ mép.

**Vẽ dần** (thêm 18/11/2026): `lineDraw(d, k, sw, màu, {dash})` nét hiện dần theo k (pathLength = 1, có cả nét đứt hiện dần); `textWrite(x, y, chữ, cỡ, k, o)` chữ viết dần (cùng luật `VT.text`); `textTip(...)` vị trí đầu bút; `textW(chữ, cỡ)` bề rộng ước.

**Hiệu ứng**: `dreamFrame(t, {inset})` (viền mây toàn khung, lớp `over`: báo cảnh là tưởng tượng), `flash {k}` (đèn flash), `scribble(pts, k)` (gạch qua gạch lại), `sparkle`, `impact`, `speedLines {x0, y0, n, gap, len, dx, dy}`, `radialLines(cx, cy, r0, r1, n, seed, sw, màu)`, `puff`, `puffBurst {k, spread}`, `drop`, `knockLines {k}`, `arc(pts)`, `dizzy {t}`, `glyph {sym: ?|!|?!}`, `bubble {sym: ?!|?|!|...|bag|fish|SVG, tail}`.

## Nối đoạn (tự động theo `D.vao` / `D.ra`)

- `giay` vào: 0,45 s đầu tờ giấy `#EFE3C8` phẳng kín khung bị kéo sang phải (mép cong như trang lật). `giay` ra: 0,45 s cuối tờ giấy trượt vào từ trái, khung cuối kín giấy phẳng. Lớp nối vẽ trên cùng, ngoài filter nét sôi, nên đúng màu.
- `chen` vào: khung đầu là cảnh đầy đủ, camera đập vào 0,3 s (zoom 1,07 → 1, dội), **tự khai** sfx `whoosh` ở 0 (đừng khai thêm).
- `cat`, `dau-video`, `cuoi-video`: không làm gì; shot đầu/cuối phải là cảnh đầy đủ.
- Đổi thời lượng: `VT.NOI.giay`, `VT.NOI.chen` (đặt trong canh.js nếu cần).

## sfx.json

Khai `VT.sfx("ten", tai, am_luong)` ở thân `CANH`; `cong-cu/kiem_doan.mjs` gom (kể cả whoosh của `chen`), kiểm có file `sfx/<ten>.wav` và dòng `Thương mại = có` trong `sfx/GIAY-PHEP.md`, mốc trong đoạn, rồi ghi `sfx.json`. Ví dụ bước chân: `VT.buoc(0, WK).steps.forEach(st => VT.sfx("buoc-tuyet", st.t, 0.45))`.

## Khung xuất 2560×1440 (từ tập 4)

`phan-canh.json` có `"xuat": {"w": 2560, "h": 1440}` thì `chuan_bi_doan.py` ghi khung 2K vào `index.html` (HOP-DONG mục 4b). `cam`, `world`, `over` vẫn theo toạ độ 1920×1080; sân khấu SVG được phóng ×4/3 nên nét sôi, chữ vẽ lại sắc (bộ lọc nét sôi tính theo đơn vị người dùng nên độ rung trông y như bản 1080p). Nền giấy (`VT.giayNen`, `VT.giayHat`) cố ý dựng 960×540 rồi phóng, giữ nguyên ở mọi khung. `xuat_doan.sh` không đổi. Thử 26/11/2026 (Whittier d21, 5 s, `-q delivery -w 2`, máy rảnh): 1080p 23 s / 8,5 MB → 2K 29 s / 12,3 MB (≈ ×1,25 thời gian, ×1,45 dung lượng). Tập 4 (26/11/2026, 11 đoạn 2K `delivery`, 3 worker, máy bận vì 3 thợ khác render cùng lúc): 9,3 s → 55 s; 20,3 s → 136 s; 28,1 s → 351 s (chạy song song hai lô) — tính ≈ 6–12 s render cho 1 s video khi máy bận.

## Bẫy kỹ thuật

- **Quên `s` trong đối tượng Wob** khi dùng `wobPt`/`wobLocal`: toạ độ tính với tỉ lệ 1, cầm đồ lệch cả trăm px (đã gặp ở d03). Luôn `{ s: WS, x, y, … }`.
- `VT.tu` đếm từ **trong đoạn**; câu vắt ngoài đoạn bị bỏ qua (trước đây "not" bắt nhầm câu trước, cốc lật từ khung 0).
- Khoá `key()` phải tăng dần theo thời gian; mốc lấy từ lời có thể đảo thứ tự nếu chọn sai từ → kiểm bằng snapshot.
- `VT.sfx` trong `ve()` sẽ bị gọi mỗi khung (kiem_doan bỏ trùng nhưng đừng làm).
- Chuỗi SVG có `NaN` làm trình duyệt báo `console_error` và `check` FAIL (đã gặp: `Math.sqrt` số âm). `kiem_doan.mjs` bắt NaN trong world/over/cam/shake trước khi chạy check.
- `check` cảnh báo `container_overflow` nếu nhóm camera thiếu `data-layout-allow-overflow` (bộ máy đã đặt sẵn).
- Lint đòi chuỗi `window.__timelines` nằm trong `index.html`: khung đăng ký ở script inline, `VT.chay()` trả timeline.
- Không `mix-blend-mode` (tắt chụp nhanh); hạt giấy và tint dùng độ mờ thường.
- Đối tượng ở xa camera zoom lớn: nét cũng phóng theo (nét 6px × zoom 3 = 18px). Cận mặt nên zoom ≤ 3.
- Chữ màu sáng trên giấy (ví dụ `C.accent2` đỏ cam) không đạt tương phản 3:1, `check` báo LỖI contrast (đã gặp ở d16): chữ đỏ dùng `#A8361F`, chữ xanh `#2c4f6e`.
- Bút chì cầm tay phải mà ngòi ở bên trái Wob sẽ chắn ngang mặt (đã gặp ở d13): chọn tay theo phía của ngòi (`tip.x < wob.x` thì tay trái).
- Hai bảng sơ đồ đặt cạnh nhau trong cùng thế giới (lướt camera từ bảng này sang bảng kia): `valley` mặc định vẽ đất thêm 1500 px mỗi bên, tràn sang bảng bên cạnh; đặt `ext` nhỏ lại. Lướt xa thì thu nhỏ camera giữa đường để tốc độ trên màn hình không quá lớn.
- Nền giấy dựng bằng canvas lúc nạp (~0,2 s mỗi worker), tất định nhờ seed `D.seed_giay` (mặc định 1607).

## Thời gian render (máy này, 4 worker, 3 agent render song song)

- `--quality delivery --workers 4`: d03 15,2 s (456 khung) mất 70 s; d05 3,2 s (96 khung) mất 22 s, tức ~4,6 s render cho 1 s video (kể cả khởi động). Tập 12 phút ước 55–60 phút nếu dựng toàn bộ bằng ve-tay.
- `snapshot` 10–14 mốc: khoảng 1 phút. `kiem_doan.mjs` vẽ thử mọi khung: dưới 5 s.
