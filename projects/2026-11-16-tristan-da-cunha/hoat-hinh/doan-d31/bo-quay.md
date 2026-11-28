# Bộ quầy bưu điện dùng chung (d31, d47; d34 vẽ tay dùng túi thư)

Hàm dựng: `TB.buuDien({ chu, tuiX })` trong khối `TB` chép ở đầu `canh.js` của d31 và d47 (nguồn: `D:/YouTube/world-wobble/tmp/cat-giay-b/chung.js`). Hệ toạ độ thiết kế 1920×1080, camera (960, 540, 1).

## Bố cục

| Phần | Vị trí | Màu |
|---|---|---|
| Tường | ván sơn kem toàn khung, chân tường gỗ từ y 640, sàn y 1010 | tường `#E6D9BC`, chân tường `#B98C62`, sàn `#6E4E36` |
| Cửa sổ có núi lửa | x 180–580, y 250–580 | khung gỗ `#8A5A3A`, trời `#C8D3D6`, núi `#5C6B58`, mây `#F6F4EE` đội đỉnh, biển `#7D9097` |
| Biển POST OFFICE | x 780–1320, y 312–410 (gắn trên đỉnh vách quầy, ngay trên vòm ô bán tem, hai thanh treo lên tường), chữ 64 px. Dời ngày 28/11 khỏi vùng logo góc phải trên | nền xanh `#2F4A3A`, chữ `#F3E6C2`, viền mực |
| Vách quầy + ô bán tem | vách x 800–1420, y 300–770; ô tem vòm có song x 930–1290 | vách `#9B6B45`, song đồng `#C9A55A`; đèn treo chao `#3F5A4A` ở x 640 |
| Mặt quầy | quầy x 560–1700, mặt quầy y 790, mặt nghiêng viết x 760–1200 | thân `#8A5A3A`, mặt `#A87A50`, mặt nghiêng `#B88A5C` |
| Ngăn kéo tem | x 1240–1470, y 880–950, núm đồng (1355, 918); ruột ngăn kéo trống `nganLong` ẩn sẵn | mặt ngăn `#9E6E46`, lòng `#3A2A1E` |
| Túi thư vải bố treo móc | móc ở (tuiX = 760, 744), thân ~170 × 210 | vải `#CDB88E`, miếng vá `#B39A6C`, dây `#8A6440`, miệng túi `#4A3B2A`, móc đen |
| Tiền cảnh (lớp gần) | chồng bưu kiện buộc dây + con dấu cao su, góc trái dưới | bưu kiện `#C89A62` / `#B88A54`, dây `#E9DDC2` |

## Đạo cụ đi kèm

- Bưu thiếp `TB.buuThiep`: giấy kem, mặt tranh (núi lửa) và mặt viết (8 dòng chữ nguệch ngoạc không đọc được, 2 dòng dọc lề cho d47).
- Tem trên bưu thiếp `TB.temMuc`: **đen trắng**, núi lửa hình nón + thuyền dài có mái chèo; tem to (cận, d31) ghi `TRISTAN DA CUNHA`, tem nhỏ (xa) là vạch mực. **Không chim cánh cụt** (tờ tem đỏ chim cánh cụt chỉ có ở d32).
- d31: bưu thiếp nằm mặt viết úp xuống quầy rồi lật lên; d47: Wob viết, xoay viết dọc lề, nhắm mắt thả vào túi thư, túi đung đưa.

## Ghi cho phong cách khác

Vẽ tay (d34) chỉ cần túi thư: cùng dáng bao bố thắt miệng treo móc đen, màu vải `#CDB88E`, miếng vá `#B39A6C`, dây `#8A6440`.
