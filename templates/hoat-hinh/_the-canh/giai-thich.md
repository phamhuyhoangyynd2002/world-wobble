# Thẻ cảnh · Nhóm 4: Giải thích một sự thật bằng hình

Mọi chữ, số trong các thẻ này phải nằm trong `chu_tren_do_vat` của đoạn (đã có trong lời hoặc `claims`). Không chữ to giữa màn hình; chữ nằm trên đồ vật, ≥ 40px ở khung cuối.

---

## `so-do-ve-tay` · Sơ đồ vẽ tay hiện từng nét

- **Dùng khi**: khuôn `doan-sai-roi-lat`, `so-sanh-doi-thuong`; cơ chế trừu tượng (khí lạnh đọng đáy thung lũng, opal hình thành, mạch nước).
- **Cách**: nét vẽ hiện dần theo lời (mỗi nét xong đúng chữ của nó), nét sôi 12 lần/giây; Wob đứng cạnh chỉ vào hoặc bị cuốn vào sơ đồ. Mũi tên vẽ tay: khối `hw-arrow` trong kho HyperFrames (có nét sôi, nảy khi tới đích).
- **Phong cách**: `ve-tay`.

## `bong-bong-tuong-tuong` · Wob tưởng tượng

- **Dùng khi**: so sánh đời thường dạng giả định ("Picture your fridge, then make it a village.").
- **Cách**: bong bóng mây hiện từ đầu Wob (pop 0,25 s, `back`), bên trong là cảnh vẽ tay đơn giản; hoặc cả khung chuyển sang đoạn `ve-tay` nối `chen`. Hết ý thì bong bóng vỡ (`pop`).
- **Âm thanh**: `pop` vào, `pop` ra.

## `lat-the` · Lật một đồ vật để lộ sự thật

- **Dùng khi**: khuôn `doan-sai-roi-lat`: Wob đoán sai → lật ra đáp án.
- **Cách**: đồ vật có hai mặt (tấm biển, mẩu giấy, bưu thiếp, nhiệt kế quay mặt): mặt trước là điều Wob đoán (hình, không chữ hoặc chữ đã có trong lời), lật 0,3 s quanh trục đứng, mặt sau là sự thật có nguồn (con số trên đồ vật). Giữ 1 s cho người xem đọc.
- **Âm thanh**: `whoosh` nhỏ khi lật, `ting` khi lộ.

## `trang-so-ban-do` · Bản đồ trên trang sổ, đường đi nét đứt

- **Dùng khi**: khuôn `trang-so-hanh-trinh`; nói khoảng cách, vị trí, độ xa.
- **Cách**: bản đồ **chỉ vẽ bằng `ve_ban_do.mjs`** (D3 + Natural Earth bản quan điểm Việt Nam; luật chủ quyền trong `.claude/rules/chinh-xac-va-ban-quyen.md` mục 6). Đặt lên trang sổ; đường đi nét đứt tự vẽ dần theo lời; máy bay, xe nhỏ chạy theo đường (đường đi tham số hoá, hướng xe theo tiếp tuyến). Nhãn tên nơi + một con số.
- **Phong cách**: DIO sổ pop-up.

## `dong-ho-troi` · Thời gian trôi trong một ngày

- **Dùng khi**: khuôn `mot-ngay-o-day`; nói về ngày ngắn, đêm dài, giờ giấc khác thường.
- **Cách**: cùng một khung cảnh, mặt trời/đèn đổi theo giờ (ánh sáng ấm → xanh đêm), đồng hồ trên tường hoặc bóng đổ quay; mỗi mốc giờ dừng 1–2 s cho một chi tiết có thật. Thế giới 3D làm được bằng cách đổi góc mặt trời.

## `nhiet-ke-tut` · Con số nằm trên đồ vật đang động

- **Dùng khi**: một con số đáng nhớ (nhiệt độ, dân số, độ sâu).
- **Cách**: con số nằm trên đồ vật trong cảnh: nhiệt kế kim tụt, biển tên làng, biên lai chợ, trang sổ chữ viết tay. Đồ vật cử động đúng lúc con số được đọc (kim rơi, biển nảy 1,1 rồi lắng `elastic`). Nhiệt độ ghi cả °C, °F.
- **Mẫu**: T2 (biển "OYMYAKON / pop. ~500" nảy ở chữ "five hundred").
