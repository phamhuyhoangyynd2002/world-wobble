# Hợp đồng đoạn hoạt hình (dùng chung cho 3 phong cách)

> Chốt 16/11/2026. Áp cho mọi phong cách trong `templates/hoat-hinh/` (`cat-giay`, `ve-tay`, `diorama`) và cho skill `dung-hoat-hinh`.
> Một tập phối nhiều phong cách: mỗi **đoạn** (một khoảng thời gian liền) dùng đúng một phong cách, dựng thành một composition HyperFrames riêng, render ra một clip câm; `ghep_doan.py` nối các clip, đặt giọng, sfx, nhạc rồi master.

## 1. Thư mục

```
projects/<tập>/
  audio/scene-<N>.mp3, audio/subtitles.json      giọng + mốc từng từ (skill long-tieng)
  khau-hinh/scene-<N>.json                        mốc khẩu hình (tao_khau_hinh.py hoặc Rhubarb)
  hoat-hinh/
    phan-canh.json                                bảng phân cảnh đa phong cách (agent dao-dien-hoat-hinh)
    doan-<id>/                                    một đoạn = một composition
      index.html          (chép từ khung của phong cách, có data-duration đúng độ dài đoạn)
      du-lieu.js          (chuan_bi_doan.py sinh: window.HH_DATA, KHÔNG sửa tay)
      lib/                (chép từ templates/hoat-hinh/<phong-cach>/lib, KHÔNG sửa ở đây)
      _chung/             (font, gsap: chép từ templates/hoat-hinh/_chung)
      canh.js             (agent viết: biên đạo đoạn này)
      sfx.json            (agent ghi: sfx của đoạn, mốc tính từ đầu đoạn)
      out/doan.mp4        (clip câm đúng khung xuất: 2560×1440 từ tập 4, 1920×1080 tập 1–3; 30 fps, đúng độ dài đoạn)
      out/frames/*.png    (3–6 khung agent đã tự xem)
    timeline.json, out/render-raw.mp4, out/video.mp4, out/video-no-music.mp4, out/frames/   (ghep_doan.py sinh)
```

## 2. `phan-canh.json`

```json
{
  "fps": 30, "rong": 1920, "cao": 1080,
  "xuat": {"w": 2560, "h": 1440},
  "thoi_luong": 60.3,
  "loi": [ {"scene": 1, "bat_dau": 0.4} ],
  "nhac": [ {"src": "music/frost-waltz.mp3", "bat_dau": 12.6, "ket_thuc": 53.7, "mood": "hoi-uc"} ],
  "doan": [
    {
      "id": "d01",
      "phong_cach": "diorama",
      "bat_dau": 0.0, "ket_thuc": 12.6,
      "lop": "hien-tai",
      "boi_canh": "Bàn kỷ vật dưới đèn bàn, hộp kỷ vật, sổ du lịch",
      "trang_phuc": "Wob không mũ, không khăn; cầm con cá đông cứng",
      "vao": "dau-video", "ra": "giay",
      "nhip": [ {"tai": 0.4, "loi": "This is a fish.", "hanh_dong": "Wob giơ cá cứng như tấm ván", "gag": "", "dao_cu": ["ca-dong-cung"], "sfx": ["bonk"]} ],
      "chu_tren_do_vat": ["OYMYAKON · pop. ~500"],
      "ly_do_phong_cach": "Khung hiện tại của kênh; sổ pop-up mở vào hồi ức"
    }
  ]
}
```

- `rong`, `cao` là **hệ toạ độ thiết kế**, luôn 1920×1080 (mọi `canh.js`, lib, vùng an toàn, cỡ chữ tính theo hệ này). `xuat` là **khung xuất** (cỡ MP4 thật): tập 4 trở đi ghi `{"w": 2560, "h": 1440}` (chốt 26/11/2026); thiếu `xuat` thì xuất 1920×1080 như tập 1–3 và `chuan_bi_doan.py` in CẢNH BÁO. Đây là chỗ DUY NHẤT khai độ phân giải: `chuan_bi_doan.py`, `ghep_doan.py`, `to_khung.py`, `kiem_ky_thuat.py`, `dung_clip_doc.py` đều đọc qua `.claude/skills/dung-hoat-hinh/scripts/khung_xuat.py`. Xem mục 4b.
- Mọi mốc trong `phan-canh.json` là **giây tuyệt đối** tính từ đầu video. Các đoạn nối liền nhau: `ket_thuc` đoạn trước = `bat_dau` đoạn sau; đoạn đầu bắt đầu 0, đoạn cuối kết thúc ở `thoi_luong`.
- `loi[]`: mỗi file giọng `audio/scene-N.mp3` đặt ở mốc tuyệt đối nào. Một câu thoại có thể vắt qua hai đoạn.
- `nhip[]`: biên đạo bằng chữ cho agent dựng (mốc tuyệt đối). Agent được thêm chi tiết, không được đổi lời, không thêm chữ, số ngoài lời.
- `chu_tren_do_vat[]`: chữ duy nhất được phép xuất hiện trong đoạn.

- `an_logo` (tuỳ chọn, mức gốc): `[[bắt đầu, kết thúc], ...]` giây tuyệt đối. Từ 19/11/2026 `ghep_doan.py` đóng logo nhỏ góc phải trên (vùng x > 1500, y < 150, mờ 85%) cho cả video; đoạn nào có chữ của cảnh nằm dưới góc đó thì khai khoảng thời gian vào đây để ẩn logo (tập 1: chữ 'Arctic Circle', 'JULY', 'POLE OF COLD'). Tốt hơn nữa: không đặt chữ ở vùng đó.

## 3. `du-lieu.js` (sinh tự động)

```js
window.HH_DATA = {
  id: "d03", phong_cach: "ve-tay", fps: 30, rong: 1920, cao: 1080,   // hệ thiết kế
  xuat: { rong: 2560, cao: 1440, ti_le: 1.333333333 },            // khung xuất (1920, 1080, 1 khi không có xuat)
  thoi_luong: 15.2,               // giây, = ket_thuc - bat_dau
  bat_dau_tuyet_doi: 27.0,
  lop, boi_canh, trang_phuc, vao, ra, chu_tren_do_vat,
  nhip: [ {tai /* giây tính từ đầu ĐOẠN */, loi, hanh_dong, gag, dao_cu, sfx} ],
  loi: [ { scene: 3, bat_dau: 0.0 /* tính từ đầu đoạn, có thể âm */, thoi_luong: 13.32,
           tu: [ {text, start, end} ],          // tính từ đầu ĐOẠN
           khau_hinh: [ {start, end, value} ] } ] // tính từ đầu ĐOẠN, value A–H, X
};
```

Mọi mốc trong `du-lieu.js` đã đổi sang **giây tính từ đầu đoạn**. `canh.js` đọc dữ liệu này, không đọc file nào khác của dự án.

## 4. Composition của một đoạn

- `index.html` của khung phong cách: root `<div id="root" data-composition-id="doan" data-start="0" data-duration="<thoi_luong>" data-width="1920" data-height="1080">` (khung gốc viết 1920×1080; `chuan_bi_doan.py` ghi lại theo khung xuất, mục 4b), nạp `_chung/gsap.min.js`, font Fraunces từ `_chung/fonts/`, `lib/*.js`, `du-lieu.js`, `canh.js`, rồi đăng ký `window.__timelines["doan"]`.
- **Không có `<audio>`** trong đoạn: clip render câm. Giọng, sfx, nhạc do `ghep_doan.py` đặt.
- Tất định: tua tới khung nào ra đúng khung đó. Không `Math.random` không seed, không `setTimeout`, không `requestAnimationFrame` tự chạy, không `repeat: -1`.
- Khẩu hình chỉ dùng khi `lop = "hien-tai"` (Wob ở bàn đang kể). Ở hồi ức Wob không mấp máy theo lời.
- Bẫy đã gặp (17/11/2026):
  - HyperFrames gộp các file JS vào HTML, nên **chuỗi `</script>` ở bất kỳ đâu trong file JS (kể cả chú thích) đóng thẻ giữa chừng** → lỗi "X is not defined" hàng loạt. Không viết chuỗi đó trong `lib/`, `canh.js`.
  - Lint tĩnh đòi thấy chữ `window.__timelines` ngay trong HTML: đăng ký timeline ở **script inline** của `index.html`. HyperFrames có thể đổi thứ tự chạy script: đọc dữ liệu, dựng cảnh sau `DOMContentLoaded`.
  - `chuan_bi_doan.py` không chép lại khung đã có trong đoạn: sửa `khung/` của phong cách thì chạy lại với `--khung-moi`.

## 4b. Khung xuất 2560×1440 (từ tập 4, chốt 26/11/2026)

Vì sao: YouTube cấp VP9 cho video ≥ 1440p, nét mực mảnh và hạt giấy đỡ vỡ khối hơn bản 1080p. **Không upscale bằng ffmpeg**: hình được Chrome vẽ lại ở 2560×1440.

Cách làm (tự động, thợ dựng không phải làm gì):
- `chuan_bi_doan.py` đọc `xuat` rồi ghi vào `index.html` của đoạn: `data-width="2560" data-height="1440"` cho root, viewport, `html, body` 2560×1440, và khối `<style id="hh-xuat">` giữ `#root` ở 1920×1080 rồi `transform: scale(1.333333333)` gốc `0 0`. Sân khấu vẫn là hệ thiết kế 1920×1080 nên **`canh.js` cũ và mới viết toạ độ như cũ**; SVG, chữ, CSS 3D được Chrome rasterize lại ở tỉ lệ ×4/3 (nét sắc thật). Không có `xuat` → khối `hh-xuat` bị gỡ, khung y như tập 1–3.
- Lib vẽ bằng bộ đệm điểm ảnh đọc `HH_DATA.xuat.ti_le` (K): diorama 3D (`dio-3d.js`) đặt bộ đệm WebGL và mọi render target BW×BH = 2560×1440, viền mực và mờ ống kính tự nhân theo `res.y / 1080`, texture con rối ×K. `DIO.doChu` chia số đo cho K nên `kiem_doan.py --do-chu` vẫn báo px thiết kế.
- Texture nền cố ý mềm (giấy `ve-tay` dựng 960×540, hạt giấy `cat-giay` ô 320 px) giữ nguyên ở mọi khung để màu, chất giấy giống hệt giữa hai độ phân giải.
- Thợ dựng viết canvas, WebGL riêng trong `canh.js` thì phải nhân bộ đệm theo `data.xuat.ti_le` (CSS giữ cỡ thiết kế). Không dùng `window.innerWidth`, `devicePixelRatio`, `getBoundingClientRect()` để suy cỡ khung (ở 2K số đo màn hình bị nhân K); đo vị trí theo hệ thiết kế (SVG `getBBox`, toạ độ tự tính).
- `ghep_doan.py` chặn clip sai cỡ (không tự phóng), nền giấy thay đoạn thiếu, logo góc (cỡ ×K, lề 96/54 × K) theo khung xuất. `to_khung.py` thu nhỏ về ô 480×270 nên dùng chung cho mọi khung.
- Đổi khung xuất giữa chừng một tập: sửa `xuat` rồi chạy lại `chuan_bi_doan.py --tat-ca` và render lại **mọi** đoạn (ghép báo LỖI nếu còn clip cỡ cũ).
- Thử 26/11/2026 (dựng lại d02, d14, d21 của Whittier và d01 3D của Oymyakon ở cả hai khung): bố cục trùng khít (lệch 0 px khi thu bản 2K về 1080), bản 1080p dựng lại khớp clip đã giao (sai khác trung bình ≤ 1,5/255). Render 2K chậm hơn ×1,25 (ve-tay) đến ×1,6 (diorama 3D), clip nặng hơn ×1,1 (cat-giay) đến ×1,6 (diorama); ghép ×1,7 thời gian. Cả tập 10 phút: render đoạn ≈ 80 phút thay ≈ 60, ổ D ≈ 7 GB thay ≈ 6 GB. Số từng phong cách ở README của phong cách.

## 5. Nối giữa hai đoạn (`vao`, `ra`)

| Kiểu | Bên ra | Bên vào |
|---|---|---|
| `cat` | Cắt cứng ở khung cuối | Khung đầu đã là cảnh đầy đủ |
| `giay` | 0,3–0,6 s cuối: hình phủ dần thành **toàn khung giấy phẳng `#EFE3C8`** (lao vào trang sổ, lật trang…) | 0,3–0,6 s đầu: từ toàn khung giấy `#EFE3C8` hiện dần thành cảnh |
| `chen` | Cắt cứng, kèm sfx `whoosh` ở đầu đoạn chèn | Dùng cho đoạn gag ngắn chèn giữa (thường `ve-tay`), khung đầu là hình to, rõ |
| `dau-video` / `cuoi-video` | Khung đầu có hình ngay (không màn đen); khung cuối giữ hình, không mờ đen | |

Khung nối `giay` phải đúng màu `#EFE3C8` phẳng để hai phong cách khớp nhau không vấp. Sau khi mã hoá H.264 màu đo được lệch 1–2 đơn vị (ví dụ 237,225,199): như vậy là đạt.

## 6. Đầu ra bắt buộc của một đoạn

1. `out/doan.mp4`: đúng khung xuất (2560×1440 khi có `xuat`, không thì 1920×1080), 30 fps, H.264, **câm**, độ dài = `thoi_luong` (lệch ≤ 1 khung).
2. `sfx.json`: `[{"ten": "bonk", "tai": 1.25, "am_luong": 0.8}]`. `ten` là tên file trong `sfx/` của repo (không `.wav`), `tai` tính từ đầu đoạn. Chỉ dùng sfx có trong `sfx/GIAY-PHEP.md`.
3. `out/frames/`: 3–6 PNG trích từ `doan.mp4`, đã tự xem bằng mắt.
4. `npx --yes hyperframes@0.8.85 check` 0 lỗi.

## 7. Luật chung mọi phong cách

- Wob dựng từ toạ độ gốc `templates/_shared/wob/nguon/tao_wob.py`: cùng màu, dáng, lục địa, ba lô, giày đỏ, nét mực. Phong cách chỉ đổi **cách vẽ** (giấy cắt, nét sôi, tấm giấy 3D), không đổi **tạo hình**.
- Bảng màu "Mực & giấy" (`templates/_shared/frame.md`) + trắng tuyết, xanh băng; font Fraunces; chữ chỉ nằm trên đồ vật, ≥ 40px theo hệ thiết kế 1920×1080 (≈ 53 px ở khung xuất 2560×1440).
- Không ảnh chụp, không Commons, không ảnh AI trừ khi `phan-canh.json` chỉ định tài nguyên có trong `assets/manifest.json`. Không vẽ mặt người thật; người dân chỉ vẽ dạng chung, tôn trọng.
- `trang_phuc` của đoạn là luật liên tục: đoạn sau phải khớp đồ Wob mặc, đồ Wob cầm ở cuối đoạn trước.
