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
- Đồ: `cold` (biển nhạt), `frost`, `beanie`, `scarf`, `blanket`, `snowhat`.
- Đổi toạ độ: `wobPt(o, lx, ly)` hệ Wob → khung; `wobLocal(o, X, Y)` khung → hệ Wob (đặt bàn tay đúng vào vật: `o.armR = VT.wobLocal(o, X, Y)`). Cả hai tính nhún, nghiêng, co giãn; `o` phải có cùng `s` như lúc vẽ.

**Đạo cụ** (gốc toạ độ ghi trong code): `fish {bend, thaw, eye: open|serene|limp|wide, frost}`, `cup {state: hot|frozen|empty|flip, t, tFreeze, steam}`, `steam {t, frozen, tFreeze}`, `teaBlock`, `bag {torn, tear, handle}`, `scrap`, `glove {open, rot, sleeve, color}` (người bán = bàn tay đeo găng, không mặt), `stall {goods, stripe, icicles}`, `barrel {n, knock, kk}`, `freezer {part: body|door|all, close, contents}`, `house {w, h, door, open, window, smoke, icicles, faint}`, `car {run, snow, color}`, `thermo {level, mark, labels, frost, icicle}`, `desk(y)`, `lamp`, `lampLight`, `box`, `bookClosed`, `bookOpen {left, right}`, `pageFlip {k}`, `pageVillage {lit, sign}`, `logWall()`, `puddle`.
Bối cảnh: `sky(màu, op)`, `ridge(y, shift)`, `farHouses(y, shift, t, n)`, `snowGround(y)`, `fog(t, y0, n)`, `diamondDust(t, n, box)`, `snowfall(t, n, box, speed)`. Bối cảnh phủ rộng −1200..3100 để camera lia, zoom không lộ mép.

**Hiệu ứng**: `sparkle`, `impact`, `speedLines {x0, y0, n, gap, len, dx, dy}`, `radialLines(cx, cy, r0, r1, n, seed, sw, màu)`, `puff`, `puffBurst {k, spread}`, `drop`, `knockLines {k}`, `arc(pts)`, `dizzy {t}`, `glyph {sym: ?|!|?!}`, `bubble {sym: ?!|?|!|...|bag|fish|SVG, tail}`.

## Nối đoạn (tự động theo `D.vao` / `D.ra`)

- `giay` vào: 0,45 s đầu tờ giấy `#EFE3C8` phẳng kín khung bị kéo sang phải (mép cong như trang lật). `giay` ra: 0,45 s cuối tờ giấy trượt vào từ trái, khung cuối kín giấy phẳng. Lớp nối vẽ trên cùng, ngoài filter nét sôi, nên đúng màu.
- `chen` vào: khung đầu là cảnh đầy đủ, camera đập vào 0,3 s (zoom 1,07 → 1, dội), **tự khai** sfx `whoosh` ở 0 (đừng khai thêm).
- `cat`, `dau-video`, `cuoi-video`: không làm gì; shot đầu/cuối phải là cảnh đầy đủ.
- Đổi thời lượng: `VT.NOI.giay`, `VT.NOI.chen` (đặt trong canh.js nếu cần).

## sfx.json

Khai `VT.sfx("ten", tai, am_luong)` ở thân `CANH`; `cong-cu/kiem_doan.mjs` gom (kể cả whoosh của `chen`), kiểm có file `sfx/<ten>.wav` và dòng `Thương mại = có` trong `sfx/GIAY-PHEP.md`, mốc trong đoạn, rồi ghi `sfx.json`. Ví dụ bước chân: `VT.buoc(0, WK).steps.forEach(st => VT.sfx("buoc-tuyet", st.t, 0.45))`.

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
- Nền giấy dựng bằng canvas lúc nạp (~0,2 s mỗi worker), tất định nhờ seed `D.seed_giay` (mặc định 1607).

## Thời gian render (máy này, 4 worker, 3 agent render song song)

- `--quality delivery --workers 4`: d03 15,2 s (456 khung) mất 70 s; d05 3,2 s (96 khung) mất 22 s, tức ~4,6 s render cho 1 s video (kể cả khởi động). Tập 12 phút ước 55–60 phút nếu dựng toàn bộ bằng ve-tay.
- `snapshot` 10–14 mốc: khoảng 1 phút. `kiem_doan.mjs` vẽ thử mọi khung: dưới 5 s.
