---
paths:
  - "templates/**"
  - "projects/*/render/**"
---

# Quy ước template HyperFrames

Nếu đã cài plugin `hyperframes`, đọc skill `/hyperframes-core` trước khi viết HTML composition; nó là hợp đồng kỹ thuật gốc, file này chỉ tóm tắt và bổ sung phần riêng của World Wobble. Runtime `templates/_shared/ww.js` viết theo cách của `gamereel.js` bên GameReel, gọn lại cho khung ngang.

## Hợp đồng dữ liệu

- Template không chứa nội dung cố định. `prepare_render.py` điền `<script id="ww-data" type="application/json">` bằng `{ script, timeline }`, ghi `data-duration` cho root và chèn sẵn `<audio>` giọng đọc từng cảnh.
- Mọi thời gian lấy từ `timeline.json`: `scenes[].start/duration`, `scenes[].shots[].at/end`, `scenes[].wob[]`, `scenes[].verdict`, `captions[]`. Không tự tính lại từ độ dài chữ.
- Tài nguyên hình: `shots[].src` (đường dẫn tương đối `assets/...`, `build_timeline.py` chép từ manifest).
- Màu, font, khoảng cách theo `templates/_shared/frame.md`.
- Template **không** phát nhạc nền, sfx; `mix_audio.py` trộn sau khi render.

## Lỗi lint chắc chắn gặp nếu không viết đúng ngay lần đầu

- Không đặt CSS `transform` ban đầu rồi tween GSAP cùng thuộc tính; dùng `gsap.fromTo`. Căn giữa bằng flex/`inset`, không bằng `translate(-50%,-50%)`.
- Mỗi `<audio>` phải có `id`, nếu không bản render sẽ **câm**. Không đặt `crossorigin` trên `<audio>`/`<video>`.
- Không tween `display`, `visibility`, `autoAlpha` trên phần tử `.clip`; animate phần tử con.
- Font phải có `@font-face` trỏ tới file cục bộ trong `templates/_shared/fonts/` (không link Google Fonts).
- Mỗi composition đăng ký đúng **một** `gsap.timeline({ paused: true })` tại `window.__timelines["<id>"]`, đăng ký **sau khi** dựng xong và font đã tải.
- Cấm: `Math.random()` không seed, `Date.now()`, gọi mạng lúc render, `repeat: -1`, `<br>` trong chữ, `video.play()`.
- Nền toàn khung đặt trên một lớp `.clip` riêng, không đặt trên root.

## Bố cục (khung 1920×1080, xem trên TV)

- Hệ toạ độ thiết kế luôn 1920×1080. Video hoạt hình từ tập 4 xuất 2560×1440: `chuan_bi_doan.py` phóng sân khấu ×4/3 bằng CSS transform, canvas/WebGL nhân bộ đệm theo `HH_DATA.xuat.ti_le` (`templates/hoat-hinh/HOP-DONG.md` mục 4b). Không suy cỡ khung từ `innerWidth`, `devicePixelRatio`, `getBoundingClientRect()`.

- Mỗi cảnh một thứ người xem phải thấy đầu tiên (nơi đó, con số, Wob). Không thêm thứ thừa.
- Vùng an toàn chữ và cỡ chữ tối thiểu theo `.claude/rules/video-dai-youtube.md`. 20 giây cuối để trống góc phải dưới cho end screen.
- Bản đồ là SVG do `ve_ban_do.mjs` vẽ; template chỉ đặt và cho chuyển động (zoom, lia), không vẽ lại biên giới.
- Wob đặt ở một góc (mặc định trái dưới), không che chủ thể của ảnh; biểu cảm đổi theo `scenes[].wob[]`. Chưa có file SVG của biểu cảm thì template bỏ qua và in cảnh báo.

## Chuyển động

- Khung t = 0 đã có hình nơi đó và câu hỏi, không fade từ đen, không intro logo.
- Không dùng easing `linear`. Vào hình: `expo.out` / `power3.out`. Chuyển động liên tục: `power2.inOut` hoặc `sine.inOut` cho trôi chậm.
- Hình phải hiện xong đúng lúc từ khoá được đọc: shot có `at` là lúc từ bắt đầu; hiệu ứng vào bắt đầu sớm hơn đúng bằng thời gian hiệu ứng.
- Ảnh tĩnh luôn tự trôi chậm (zoom 1.0→1.06, lia nhẹ) suốt nhịp. Video dài nên chuyển động êm hơn video ngắn: chuyển cảnh 0,4–0,8 giây, không chớp sáng, không rung khung trừ khoảnh khắc hài có chủ ý.
- Trước khi tự viết một hiệu ứng có tên, tìm trong kho: `npx hyperframes catalog --query "<mô tả tiếng Anh>"`.

## Kiểm tra

- `npx hyperframes check` là cổng chính, yêu cầu 0 lỗi. Lint có lỗi thì `check` báo "0 samples", đừng hiểu nhầm là sạch.
- Chụp thử: `npx hyperframes snapshot --at <các mốc>`; mở bảng ảnh bằng Read, kiểm khung t = 0, giữa mỗi chương, con dấu, 20 giây cuối.

## Dựng thủ tục (hoạt hình Wob diễn) — lỗi đã gặp khi thử 16/11/2026

Chi tiết và bối cảnh: `docs/thu-nghiem-thu-vien-hoat-hinh-2026-11-16.md` mục 6; mẫu chạy được: `projects/2026-11-16-oymyakon/ban-thu-thu-vien/t2-canh-1/canh.js`.

- **Không resolve Promise bằng timeline GSAP** (`resolve(tl)`): timeline có `.then()` nên Promise chờ nó chạy hết, timeline không bao giờ được đăng ký và render ra toàn khung 0. Bọc lại: `resolve({ tl })`.
- HyperFrames chạy `<script src>` trước khi khối dữ liệu inline có trong trang: đọc dữ liệu sau `DOMContentLoaded`.
- `document.fonts.load()` gọi lúc trang đang dựng có thể treo: đăng ký timeline ngay, vẽ lại khi `document.fonts.ready`.
- Cảnh tính lại mỗi khung bằng `render(t)`: gọi trong `modifiers` của một tween đồng hồ (`tl.to(clock, { v: DUR, duration: DUR, ease: "none", modifiers: { v: v => (render(+v), v) } })`), vì `modifiers` chạy cả khi seek tắt callback.
- `check` báo `sweep_static` ("Timeline did not advance under seek") nghĩa là timeline chưa được đăng ký hoặc không chạy theo tua (thường do lỗi Promise ở trên); luôn xác nhận bằng `snapshot` nhiều mốc và xem bảng khung hình.
- `mix-blend-mode` làm tắt chế độ chụp nhanh; bản giao thay bằng độ mờ thường.
- Mỗi project chỉ một file `.html` có `data-composition-id`; file mẫu đặt đuôi khác (`.tpl`).
