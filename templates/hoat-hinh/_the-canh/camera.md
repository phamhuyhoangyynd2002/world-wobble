# Thẻ cảnh · Nhóm 2: Camera

Số đo chung ở [NGU-PHAP-CAMERA.md](NGU-PHAP-CAMERA.md). API: CG `api.camera([[t, cx, cy, zoom, ease]])`, `api.shake`; VT `key`, `shake`; DIO `camSet`, `camTo`, `camRung`, `laoVao`, `lui`.

---

## `day-vao-cham` · Giữ hình nhưng không bao giờ đứng yên

- **Dùng khi**: mọi lúc giữ hình (Wob nói, nhân vật nghe, cảnh mô tả).
- **Cách**: tiến camera về điểm nhìn **0,15–0,35 % mỗi khung**, 0,6 %/khung ở chữ nhấn; công thức `pos = look + (pos0 − look) × (1 − k)^khung`.
- **Mẫu**: T4 `canh3d.js` (`creep` trong `camAt`).

## `luot-smootherstep` · Lướt từ góc này sang góc kia

- **Dùng khi**: đổi điểm nhìn trong cùng nơi (từ Wob sang biển tên, từ phố sang ống khói).
- **Cách**: smootherstep đối xứng `x³(x(6x−15)+10)`, 18–40 khung; đỉnh tốc độ ≤ 35 px/khung ở 1080p. Vừa đổi vị trí vừa đổi điểm nhìn.
- **Mẫu**: T4 (lướt 0,3–3,3 s), T2 (lia từ hộp sang sổ, `io3`).

## `lao-vao-can-canh` · Lao nhanh vào mặt Wob, nền mờ

- **Dùng khi**: chữ nhấn, punchline, phản ứng mạnh.
- **Cách**: ease-out, đỉnh tốc độ ở khung đầu, tắt trong 8–10 khung; nghiêng 3,5°; bật mờ ống kính 12 px trong 0,3 s, nét ở mắt.
- **Âm thanh**: `whoosh` ngắn ở khung đầu.
- **Mẫu**: T4 (5,4–5,75 s).

## `lui-ra-toan-canh` · Từ chi tiết lùi ra cho thấy cả nơi

- **Dùng khi**: khuôn `phong-quy-mo`; câu kiểu "The village itself is the freezer."
- **Cách**: bắt đầu cận một đồ vật (con cá), lùi 2–3 s smootherstep tới cảnh toàn (cả làng), tắt mờ ống kính dần về 0. Có thể kết bằng một chi tiết hài ở cảnh toàn (cánh cửa tủ đông khổng lồ).
- **Phong cách**: thế giới 3D hoặc DIO (`api.lui`); CG bằng `api.camera` zoom từ 2,4 về 1.

## `lia-theo-vat` · Theo một vật bay để sang chủ thể mới (thay cho cắt)

- **Dùng khi**: chuyển giữa hai chỗ trong cùng cảnh mà không cắt cứng.
- **Cách**: một vật (hơi nước, con chim, quả bóng tuyết, tờ vé) bay từ chủ thể A; camera bám theo vật với độ trễ 3–5 khung; vật dừng ở chủ thể B, camera lắng lại.
- **Âm thanh**: `whoosh` nhẹ theo vật.

## `lia-nhoe` · Lia nhoè (whip pan)

- **Dùng khi**: đổi nơi nhanh trong cùng phong cách, nhịp hài ("Meanwhile, in the market…").
- **Cách**: 6–8 khung lia ngang rất nhanh, nhoè chuyển động theo hướng lia (blur ngang), cắt ở khung nhoè nhất sang cảnh mới cũng đang nhoè rồi lắng.
- **Âm thanh**: `whoosh`.

## `tien-canh-khung` · Mở shot qua một vật tiền cảnh

- **Dùng khi**: khoảng 1/3 số shot, nhất là shot mở một nơi.
- **Cách**: một vật nhận ra được ở sát ống kính (hàng rào, cột điện, bút chì trên bàn, cửa sổ) trôi nhanh hơn cảnh khi camera đi (parallax gần 1,2–1,4×). Không để vật bị cắt mép thành mảng không rõ là gì.
- **Mẫu**: T4 (hàng rào gỗ mở cảnh, Wob ló qua), T2 (bút chì trên bàn).

## `rung-va-cham` · Rung khi va chạm

- **Dùng khi**: va mạnh có chủ ý hài (cá đập bàn, Wob ngã). Không dùng khi kể nghiêm.
- **Cách**: lệch đổi chiều **mỗi khung**, biên độ tắt trong 7 khung (`11 × e^(−14t)` px). Đặt đúng khung va chạm lấy từ mô phỏng vật lý.
- **API**: CG `api.shake(t, biên, n)`, VT `shake`, DIO `camRung`.
- **Mẫu**: T2 (1,68 s).

## `lui-cham-im-lang` · Lùi chậm trong im lặng

- **Dùng khi**: khuôn `lich-su-nghiem`, cuối một đoạn nặng.
- **Cách**: lùi rất chậm (0,1 %/khung), ánh sáng tối dần một nấc, nhạc tắt, chỉ còn tiếng nền (gió). 2–3 s rồi cắt về bàn.
