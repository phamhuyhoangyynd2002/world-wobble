# Thẻ cảnh · Nhóm 1: Wob diễn

Mốc ghi theo chữ `cue` trong lời (âm là trước chữ). API: `CG` = `cat-giay` (`api.*` của `lib/phim.js`, Wob điều khiển qua `api.wob`), `VT` = `ve-tay` (`window.VT`), `DIO` = `diorama` (`api.*`, Wob qua `dio-wob.js`). "Mẫu" là mã đã chạy được.

---

## `leo-thang-ba-lan` · Thử ba lần, mỗi lần hỏng to hơn

- **Dùng khi**: khuôn `thu-hong-hieu`; một hoạt động có thật mà Wob làm dở (mở cửa, đi chợ, uống trà ngoài trời).
- **Nhịp**: lần 1 bình thường, hỏng nhỏ (1,5–2 s) → lần 2 cố hơn, hỏng rõ (2–3 s) → **lần 3 lệch kiểu**: hỏng theo cách không ai đoán (3–4 s, giữ hình 0,8 s sau). Mỗi lần có lấy đà trước (6 khung bẹp xuống) và phản ứng sau.
- **Camera**: lần 1, 2 cùng một khung (để người xem so sánh); lần 3 đẩy vào 0,6 %/khung hoặc cắt chèn cận mặt.
- **Âm thanh**: lần 1, 2 cùng một sfx; lần 3 sfx khác hẳn hoặc im lặng đột ngột.
- **Phong cách**: CG cho lần 1–2, chen `VT` 2–3 s cho lần 3 nếu cần cường điệu.
- **Bẫy**: ba lần giống hệt nhau là nhàm; lần 3 phải khác về **kiểu**, không chỉ to hơn.

## `take-cham` · Sự cố → nhìn → dừng → mới phản ứng

- **Dùng khi**: điều bất ngờ xảy ra với Wob (lông mi đóng băng, cá không vừa túi).
- **Nhịp**: sự cố (khung 0) → Wob **chưa biết** 6–10 khung → mắt liếc tới vật (4 khung) → **dừng 8–12 khung** (không gì động) → phản ứng to: mắt mở to (mí âm), thân bật lên kéo dài 1,1, bong bóng `?!` + `liu-lo-soc`, rồi lắng bằng lò xo.
- **Camera**: giữ, đẩy rất chậm; ở khung phản ứng có thể rung 7 khung biên độ nhỏ.
- **Phong cách, API**: DIO `look`, `lids(w, t, -0.2)`, `bubble(w, 'soc', t, d)`; CG `api.pop` cho bong bóng; VT `key` + `squash`.
- **Mẫu**: T2 `t2-canh-1/canh.js` (giật mình lúc cá va hộp: `lid` −0,2 ở 1,7 s).

## `giu-tinh-bo` · Nhìn thẳng người xem, không làm gì

- **Dùng khi**: sau câu punchline ngắn ("On purpose.", "Anyway.").
- **Nhịp**: −0,2 s Wob quay mặt ra trước (qua góc nhìn trung gian 0,12–0,25 s) → mí xuống 0,5 (tỉnh bơ) → **giữ 0,6–1 s**, có thể một cái chớp chậm (0,3–0,4 s) ở giữa → cắt.
- **Camera**: đẩy vào chậm (0,25 %/khung), không rung. Không nhạc chen lên.
- **API**: DIO `quay(w, t, 0)`, `lids(w, t, 0.5)`, `blink(w, t, 0.5, true)`; VT `slowBlink`.
- **Mẫu**: T2 (chớp chậm ở 10,9 s sau "On purpose.").

## `lay-da-nhay` · Lấy đà, bật, bay theo cung, chạm đất bẹp, dội

- **Dùng khi**: Wob nhảy qua chỗ khác, nhảy lên vì hào hứng, nhảy tránh vật.
- **Nhịp**: bẹp 0,12 s (`sy` 0,8, `sx = 1/√sy`) → bật kéo dài 0,07 s (`sy` 1,16) → bay theo parabol, chân co → kéo dài nhẹ trước khi chạm → chạm đất bẹp 0,76 → dội `elastic` 0,3 s. Ba lô theo đà (con lắc), không keyframe.
- **Âm thanh**: `boing` nhỏ lúc bật (tuỳ), tiếng chạm theo nền (tuyết: `buoc-tuyet`).
- **API**: DIO `hop(w, t, cao, d)`; VT `squash`, `conLac`; CG đi qua `api.wob(...)` (xem README).
- **Mẫu**: T1 (`t1-hyperframes/index.html`), T2 (nhảy từ hộp sang sổ, 2,2–2,9 s).

## `wob-be-ti` · Wob bé tí cạnh đồ vật của nơi đó

- **Dùng khi**: khuôn `phong-quy-mo`; cho thấy nơi đó to, xa, khắc nghiệt thế nào.
- **Cách**: đặt Wob (cao ~1 m) cạnh vật đúng tỉ lệ thật: bậu cửa sổ, bánh xe tải, đống củi, ống khói. Camera thấp ngang tầm Wob để vật trông càng to.
- **Nhịp**: cảnh mở ở cự ly gần chỉ thấy Wob → lùi ra 1,5–2,5 s (smootherstep) để lộ vật to → giữ 0,8 s.
- **Phong cách**: thế giới 3D (T4) hoặc DIO là đẹp nhất vì tỉ lệ thật; CG dùng parallax.
- **Mẫu**: T4 `t4-wob-3d/canh3d.js` (Wob thấp hơn cửa sổ nhà gỗ).

## `di-bo-parallax` · Wob đi dọc phố, các lớp trôi lệch nhau

- **Dùng khi**: khuôn `mot-ngay-o-day`, `trang-so-hanh-trinh`; chuyển giữa hai điểm của chuyến đi.
- **Nhịp**: bước 0,5 s mỗi chu kỳ (on twos), nảy 3–7% chiều cao, nghiêng 1–7°, chân trụ đứng yên khi chạm đất (không trượt). Dừng đúng lúc chạm chân, lắng nhẹ.
- **Camera**: theo Wob, lớp xa trôi 0,2–0,35×, lớp gần 1,2–1,4×; có vật tiền cảnh lướt qua một lần.
- **Âm thanh**: tiếng bước đúng từng lần chạm (CG `walk(..., {tieng: true})` tự thêm).
- **API**: VT `buoc(t, {...})`; DIO `walk(w, t0, t1, x1, z1, {...})`; CG `api.lop` + `api.camera`.
- **Mẫu**: T3 `t3-parallax/index.html`, thư viện `cat-giay`.

## `va-cham-vat-ly` · Đồ vật rơi, nảy, đổ theo vật lý thật

- **Dùng khi**: gag có đồ rơi, đổ, va (cá đông cứng đập bàn, đống củi đổ, mũ bay).
- **Cách**: mô phỏng trước bằng Matter.js (MIT) trong Node, cố định 60 bước/giây, lưu quỹ đạo 30 khung/giây thành JSON; trong cảnh chỉ đọc lại theo `t` (tất định). Mốc va chạm lấy từ mô phỏng để đặt sfx và rung camera đúng khung.
- **Nhịp**: lấy đà (vung lên) 0,12 s → đập xuống 0,12 s (`in2`) → thả cho vật lý chạy → Wob take theo từng nảy.
- **Âm thanh**: `bonk` ở va chạm mạnh nhất, `drop` ở lần chạm cuối.
- **Bẫy**: vật lý hay tạo gag tự nhiên không định trước (cá va mép hộp chênh vênh) → xem dải khung rồi giữ lại nếu hay.
- **Mẫu**: T2 `t2-canh-1/vat_ly_ca.mjs` + `canh.js` (`fishPose`).

## `dat-ky-vat-xuong` · Wob ở hiện tại đặt kỷ vật xuống, nói thẳng

- **Dùng khi**: khuôn `lich-su-nghiem` (Gulag, sơ tán, chiến tranh, thiên tai có người chết). **Không gag.**
- **Nhịp**: cắt cứng về bàn kỷ vật (không chuyển mềm) → Wob đặt kỷ vật xuống chậm 0,6 s → mí 0,3, không cười → nói 20–60 giây không chen gag → hết đoạn: một khoảng lặng 1 s rồi mới quay lại giọng thường.
- **Camera**: đẩy vào rất chậm, ánh đèn bàn ấm, nhạc ngắt hoặc rất nhỏ.
- **Phong cách**: DIO (bàn kỷ vật) xen CG tông trầm cho hình minh hoạ lịch sử (không vẽ người thật nhận ra được, không vẽ cảnh bạo lực).
