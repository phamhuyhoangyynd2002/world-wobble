---
version: draft
name: World Wobble — Frame (bản tạm 15/11/2026)
description: >
  Hệ thiết kế khung hình của World Wobble cho video dài 1920×1080 trên YouTube, nhiều người xem trên TV.
  Định dạng theo frame.md của HyperFrames: frontmatter là giá trị bắt buộc, phần chữ bên dưới là ý đồ.
  BẢN TẠM: bảng màu, font, logo chưa chốt (TODO trong kenh/ho-so-kenh.md). Chạy /thiet-lap-kenh để chốt;
  khi đổi ở đây thì đổi cùng biến CSS trong templates/_shared/ww.css và màu trong ve_ban_do.mjs.
unit: khung 1920×1080
principle: một thứ người xem thấy đầu tiên mỗi cảnh · đọc được từ sofa · nghe được không cần nhìn · số liệu lấy từ kịch bản

colors:
  ground: "#10212E"      # nền chính (xanh đêm)
  ocean: "#1D3B53"       # biển trên bản đồ
  land: "#E9DCC3"        # đất trên bản đồ, nền thẻ sáng
  text: "#FFFFFF"
  text-dark: "#10212E"
  text-dim: "#C8D3DC"
  accent: "#F2B544"      # nơi đang nói, con số, nhãn SUMMER ONLY
  accent-2: "#E4572E"    # ghim bản đồ, nhãn NOPE; dùng ít
  move: "#3BB273"        # chỉ cho nhãn WOULD MOVE

typography:
  # Font tạm: Be Vietnam Pro (OFL, đã có sẵn). TODO: chọn font OFL riêng cho kênh, tránh trùng Game Vừa Ví
  question:  { fontFamily: "Be Vietnam Pro", px: 104, weight: 900, lineHeight: 1.08 }
  title:     { fontFamily: "Be Vietnam Pro", px: 76, weight: 800, lineHeight: 1.12 }
  chapter:   { fontFamily: "Be Vietnam Pro", px: 56, weight: 800 }
  label:     { fontFamily: "Be Vietnam Pro", px: 38, weight: 800 }
  fact-label:{ fontFamily: "Be Vietnam Pro", px: 34, weight: 600 }
  fact-value:{ fontFamily: "Be Vietnam Pro", px: 72, weight: 900 }
  caption:   { fontFamily: "Be Vietnam Pro", px: 46, weight: 700, lineHeight: 1.25 }
  stamp:     { fontFamily: "Be Vietnam Pro", px: 120, weight: 900, lineHeight: 1.0, upper: true }
  bug:       { fontFamily: "Be Vietnam Pro", px: 26, weight: 800, upper: true }

spacing:
  safe-x: "96px"
  safe-y: "54px"
  end-screen-zone: "x > 1150, y > 560 trong 20 giây cuối"

motion:
  ease-in: "expo.out"
  ease-flow: "sine.inOut"     # ảnh tự trôi
  enter: "0.4–0.8s"
  drift: "zoom 1.00→1.06 hoặc lia 40px suốt nhịp"
  no: "chớp sáng, rung khung (trừ khoảnh khắc hài có chủ ý), easing linear"
---

# Ý đồ

## Thành phần

- **Hình nền của nhịp**: ảnh minh hoạ, ảnh Commons hoặc bản đồ phủ kín khung, tự trôi chậm. Chuyển nhịp bằng hoà tan 0,6 giây.
- **Bản đồ**: SVG của `ve_ban_do.mjs`; nhãn nơi (`marks`) dựng bằng HTML với font kênh, nền tối bo nhẹ, chữ `label`. Ghim đỏ `accent-2`.
- **Câu hỏi mở đầu** (cảnh hook): chữ `question` ở nửa trái, có từ khung 0, đè lên hình nơi đó (dải tối mờ phía sau).
- **Tiêu đề cảnh** (`on_screen_text`): chữ `title` góc trái trên, hiện 4 giây đầu cảnh.
- **Thẻ chương**: khi sang chương mới, dải dưới trái ghi tên chương (`chapter`), 3 giây.
- **Thẻ số liệu** (`fact:<nhãn>`): thẻ sáng `land`, nhãn nhỏ + giá trị to, góc phải dưới (trừ 20 giây cuối).
- **Wob**: góc trái dưới, cao khoảng 300px, đổi biểu cảm theo `scenes[].wob`. SVG ở `templates/_shared/wob/`.
- **Con dấu "Would Wob move here?"**: dòng câu hỏi nhỏ phía trên, nhãn to nghiêng −6° ở giữa phải, màu theo nhãn (WOULD MOVE `move`, SUMMER ONLY `accent`, NOPE `accent-2`), đóng xuống trong 0,2 giây, đứng tới hết video.
- **Logo nhỏ**: chữ WORLD WOBBLE góc phải trên, mờ 70%. TODO: thay bằng logo khi có.
- **Phụ đề đốt vào hình**: chỉ khi `burn_captions`, giữa dưới, tối đa 2 dòng.

## Không làm

- Không phong cách vector phẳng kiểu Kurzgesagt (màu bão hoà, nhân vật tròn không nét viền, chuyển động liên tục). Hướng tạm: tranh minh hoạ có nét bút, giấy có vân, màu đất trầm.
- Không chữ trang trí khắp nơi, không thẻ bo góc giống hệt nhau xếp hàng, không gradient chỉ để trang trí.
