# Thẻ cảnh · Nhóm 3: Chuyển cảnh

Giữa hai **đoạn** khác phong cách, theo kiểu nối trong `../HOP-DONG.md` mục 5 (`giay`, `cat`, `chen`). Các thẻ dưới đây là cách làm **bên trong** đoạn hoặc cách chọn kiểu nối cho có ý kể chuyện.

---

## `ky-vat-chuyen-canh` · Cầm kỷ vật lên → phóng vào nơi đó

- **Dùng khi**: từ hiện tại (bàn) vào hồi ức; mở chương.
- **Cách**: Wob cầm một kỷ vật của chương (vé máy bay, tấm ảnh vẽ tay, con cá) → camera lao vào kỷ vật (ease-out) → kỷ vật phủ kín khung → nối `giay` sang đoạn hồi ức.
- **API**: DIO `laoVao(rig, t, d, diem, kCuoi)` + `raGiay`.

## `lao-vao-hinh-ve` · Lao vào hình vẽ trên trang sổ, hình vẽ sống dậy

- **Dùng khi**: mở hồi ức từ sổ du lịch.
- **Cách**: camera lao vào hình vẽ trên trang (phóng tới 5–7 lần, `io3`) → hình vẽ bắt đầu cử động trước khi phủ kín khung (khói bốc, tuyết rơi trong hình) → sang cảnh hồi ức cùng bố cục.
- **Mẫu**: T2 (11,3–12,6 s: khói và tuyết trong hình vẽ hiện dần khi camera lao vào).

## `lat-trang-so` · Lật trang sổ sang chương mới

- **Dùng khi**: đổi chương ở khung hiện tại.
- **Cách**: tờ giấy co ngang quanh gáy (`scaleX` 1 → −1, `io2`, 0,4 s); nửa đầu thấy mặt trước, nửa sau thấy mặt sau; trang mới lộ ra bên dưới. Wob có thể đập tay vào mép trang.
- **Âm thanh**: `whoosh` nhỏ.
- **API**: DIO sổ pop-up (`dio-so.js`); **Mẫu**: T2 (2,8–3,2 s).

## `cat-cung-ve-hien-tai` · "Anyway." cắt cứng về bàn

- **Dùng khi**: kết một gag hồi ức bằng câu tỉnh bơ; quay lại khung hiện tại.
- **Cách**: cắt cứng đúng chữ (không chuyển mềm), ngắt nhạc cùng lúc. Đoạn sau mở bằng Wob ở bàn đã ở tư thế xong (nối `cat`).

## `cat-cung-doi-mua` · Cùng một nơi, hai mùa

- **Dùng khi**: khuôn `hai-mua` ("I went back in July.").
- **Cách**: giữ **đúng bố cục, đúng góc máy**, cắt cứng sang cùng cảnh ở mùa khác (tuyết → cỏ, xanh lạnh → vàng ấm). Wob đổi trang phục cho đúng mùa (luật liên tục `trang_phuc`). Gag: một chi tiết không đổi (Wob vẫn mặc áo lông).
- **Phong cách**: thế giới 3D hợp nhất (đổi ánh sáng, mặt đất bằng tham số); DIO, CG phải dựng hai bộ phông cùng bố cục.

## `chen-ve-tay` · Đoạn chèn vẽ tay 2–5 giây

- **Dùng khi**: Wob tưởng tượng, so sánh phóng đại, punchline cần cường điệu; mồi lại sự chú ý mỗi 60–90 giây.
- **Cách**: đoạn `ve-tay` nối `chen` (khung đầu là hình to, rõ, camera đập vào 0,3 s, tự có `whoosh`), rồi `cat` quay lại đoạn chính.
- **Bẫy**: không chèn khi đang kể lịch sử nghiêm; không chèn hai lần trong 30 giây.

## `xe-giay` · Xé giấy chuyển cảnh

- **Dùng khi**: đổi nơi lớn trong hồi ức (từ làng sang mỏ, từ mùa đông sang lịch sử).
- **Cách**: khối có sẵn trong kho HyperFrames: `npx hyperframes add torn-paper-rip` (vết xé sợi giấy chạy ngang khung, tờ giấy nhấc đi để lộ cảnh sau) hoặc `paper-collage-reveal` (các mảnh giấy cắt bay đi). Đổi màu giấy về `#EFE3C8`, kiểm giấy phép trong `meta.json` của khối trước khi dùng.
