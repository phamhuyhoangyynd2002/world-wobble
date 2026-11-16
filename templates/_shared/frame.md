---
version: 1
name: World Wobble — Frame (chốt 15/11/2026)
description: >
  Hệ thiết kế khung hình của World Wobble cho video dài 1920×1080 trên YouTube, nhiều người xem trên TV.
  Định dạng theo frame.md của HyperFrames: frontmatter là giá trị bắt buộc, phần chữ bên dưới là ý đồ.
  Chốt bằng /thiet-lap-kenh ngày 15/11/2026: bảng "Mực & giấy" + font Fraunces (phương án A, người làm kênh chọn).
  Khi đổi ở đây thì đổi cùng biến CSS trong templates/_shared/ww.css, hằng C trong ve_ban_do.mjs,
  màu trong kenh/nhan-dien/nguon/tao_nhan_dien.py.
unit: khung 1920×1080
principle: một thứ người xem thấy đầu tiên mỗi cảnh · đọc được từ sofa · nghe được không cần nhìn · số liệu lấy từ kịch bản

colors:
  ground: "#1E2A2B"      # nền chính (xanh rêu mực)
  ocean: "#3F6A70"       # biển trên bản đồ
  land: "#EFE3C8"        # đất trên bản đồ, nền thẻ sáng (màu giấy)
  map-border: "#8A7A5C"  # biên giới trên bản đồ
  text: "#FFF8EC"
  text-dark: "#1E2A2B"
  text-dim: "#CFC6B2"
  ink: "#1F2326"         # nét viền mực: Wob, thẻ số liệu, ghim bản đồ
  panel: "rgba(30,42,43,0.88)"  # nền nhãn, thẻ chương, logo
  accent: "#E0703A"      # đất nung: nơi đang nói, con số, nhãn SUMMER ONLY (4,6:1 trên ground)
  accent-2: "#E85D45"    # ghim bản đồ, nhãn NOPE; dùng ít (4,3:1 trên ground)
  move: "#5E9E6A"        # chỉ cho nhãn WOULD MOVE (4,6:1 trên ground)

typography:
  # Fraunces (OFL, variable), trục "SOFT" 100, "WONK" 1 đặt một lần ở #root. Không dùng Be Vietnam Pro (font của Game Vừa Ví)
  question:  { fontFamily: "Fraunces", px: 104, weight: 900, lineHeight: 1.08 }
  title:     { fontFamily: "Fraunces", px: 76, weight: 800, lineHeight: 1.12 }
  chapter:   { fontFamily: "Fraunces", px: 56, weight: 800 }
  label:     { fontFamily: "Fraunces", px: 38, weight: 800 }
  fact-label:{ fontFamily: "Fraunces", px: 34, weight: 600 }
  fact-value:{ fontFamily: "Fraunces", px: 72, weight: 900 }
  caption:   { fontFamily: "Fraunces", px: 46, weight: 700, lineHeight: 1.25 }
  stamp:     { fontFamily: "Fraunces", px: 120, weight: 900, lineHeight: 1.0, upper: true }
  bug:       { fontFamily: "Fraunces", px: 28, weight: 800, upper: true }   # 28px là sàn đọc được trên điện thoại (hyperframes check)

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

- **Hình nền của nhịp**: ảnh minh hoạ, ảnh Commons hoặc bản đồ phủ kín khung, tự trôi chậm. Chuyển nhịp (bản 2, 16/11/2026): trong cảnh hoà tan 0,7 giây kèm đẩy nhẹ (ảnh mới từ 1,035 về 1); bản đồ sang bản đồ thì zoom lùi (1,12 về 1); sang cảnh cùng chương thì hoà chéo (cảnh trước kéo dài thêm 0,7 giây); sang chương mới thì **tấm giấy** màu `land` viền mực trái lướt qua (0,55 + giữ 0,85 + 0,55 giây) mang "Chapter N" + tên chương hiện từng từ + gạch mực. Nhịp cũ ẩn hẳn khi nhịp mới hiện xong. Nhịp đứng tối đa ~9,5 giây (`chia_nhip.py`).
- **Bản đồ**: SVG của `ve_ban_do.mjs`; nhãn nơi (`marks`) dựng bằng HTML với font kênh, nền tối bo nhẹ, chữ `label`. Ghim đỏ `accent-2`.
- **Câu hỏi mở đầu** (cảnh hook): chữ `question` ở nửa trái, có từ khung 0, đè lên hình nơi đó (dải tối mờ phía sau).
- **Tiêu đề cảnh** (`on_screen_text`): chữ `title` góc trái trên, hiện 4 giây đầu cảnh.
- **Thẻ chương**: khi sang chương mới, dải dưới ghi tên chương (`chapter`), 3 giây; đặt từ x = 400px, bên phải vùng Wob, để không đè lên Wob.
- **Thẻ số liệu** (`fact:<nhãn>`): thẻ sáng `land` viền mực `ink` 4px, nhãn nhỏ + giá trị to, góc phải dưới (trừ 20 giây cuối).
- **Wob**: góc trái dưới, cao khoảng 300px, đổi biểu cảm theo `scenes[].wob`. Bản 2: SVG nhúng thẳng, cử động từng bộ phận: thở (co giãn 2,5%), chớp mắt mỗi 3–5 giây, lắc thân quanh bàn chân, tay đung đưa; riêng từng biểu cảm: hào hứng nhún nhảy, lạnh run từng đợt, nóng chảy xệ + mồ hôi, sốc nhảy dựng, ngẫm nghĩ nghiêng chậm. Đổi biểu cảm: nhún xuống – bật lên – rơi nảy, hoà chéo 0,12 giây. Lần đầu: đi lạch bạch vào từ mép trái 1,5 giây.
- **Người que** (`scenes[].que[]`): nét mực 9px có viền giấy, đầu tròn, tay xoè chéo, chân chữ A; đi bộ, chạy (nghiêng người), run (khép tay, rụt đầu), vẫy tay, nhảy (tay chữ V), chỉ tay. Đứng ở mép dưới bên phải Wob, cao 260px; chỉ cho người chung chung, không bao giờ cho người thật nhận ra được. SVG ở `templates/_shared/wob/`, dựng bằng `wob/nguon/tao_wob.py` (quả địa cầu méo, nét mực, ba lô có cuộn thảm đỏ). Màu Wob cố định, không đổi theo tập.
- **Con dấu "Would Wob move here?"**: dòng câu hỏi nhỏ phía trên, nhãn to nghiêng −6° ở giữa phải, màu theo nhãn (WOULD MOVE `move`, SUMMER ONLY `accent`, NOPE `accent-2`), đóng xuống trong 0,2 giây, đứng tới hết video. Nếu cảnh kết có chữ to giữa khung (`show: text`), chữ đó mờ đi 1,2 giây trước khi con dấu đóng để không bị đè.
- **Logo nhỏ**: icon đầu Wob (`templates/_shared/logo-icon.svg`) + chữ WORLD WOBBLE, góc phải trên, mờ 85%. Bản to: `templates/_shared/logo.png`; ảnh đại diện, banner kênh ở `kenh/nhan-dien/`.
- **Phụ đề đốt vào hình**: chỉ khi `burn_captions`, giữa dưới, tối đa 2 dòng.

## Không làm

- Không phong cách vector phẳng kiểu Kurzgesagt (màu bão hoà, nhân vật tròn không nét viền, chuyển động liên tục). Hướng của kênh: nét mực viền (Wob, thẻ, ghim), giấy có vân, màu đất trầm.
- Không chữ trang trí khắp nơi, không thẻ bo góc giống hệt nhau xếp hàng, không gradient chỉ để trang trí.
