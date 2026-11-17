# Thẻ công thức cảnh (`_the-canh/`)

> 17/11/2026. Đúc kết từ bản thử T1–T4 (`docs/thu-nghiem-thu-vien-hoat-hinh-2026-11-16.md`), cách tổ chức "shot recipe card" của `vincentwei1021/video-shotcraft` (Apache-2.0, chỉ học cách tổ chức, không chép nội dung), số đo camera của `mromidev/claude-animated-shorts` (MIT) và hướng dẫn hoạt hình của `JohnHeibel/ClaudeAnimationBase` (MIT).
> Ai đọc: agent `dao-dien-hoat-hinh` (chọn thẻ khi biên đạo `nhip[]`), `dung-cat-giay`, `dung-ve-tay`, `dung-diorama` (dựng đúng nhịp của thẻ). Biên kịch chọn **khuôn chương** trong `.claude/skills/viet-kich-ban/references/cong-thuc-ke-chuyen.md`; khuôn gợi ý thẻ.

## Là gì

Mỗi thẻ là một kiểu cảnh dùng lại được, có tên: dùng khi nào, nhịp tính bằng khung so với chữ trong lời, camera, âm thanh, phong cách và hàm thư viện tương ứng, mã mẫu đã chạy, bẫy đã gặp. Thẻ **không phải khuôn bắt buộc**: nó giúp đổi cách dựng giữa các cảnh và giữa các tập, và giúp ba agent dựng hiểu nhau khi đạo diễn chỉ cần viết một cái tên.

Luật chung, số đo camera: [NGU-PHAP-CAMERA.md](NGU-PHAP-CAMERA.md) (đọc trước).

## Cách dùng trong `phan-canh.json`

Không đổi hợp đồng: đạo diễn ghi id thẻ trong ngoặc vuông ở đầu `hanh_dong` của nhịp, rồi tả cụ thể:

```json
{"tai": 21.4, "loi": "My eyelashes froze.", "hanh_dong": "[take-cham] lông mi bật ra trên mắt Wob, Wob chưa biết, liếc lên, dừng, rồi giật mình", "gag": "Wob không biết mình có lông mi", "dao_cu": [], "sfx": ["pop", "tach-bang", "liu-lo-soc"]}
```

Agent dựng thấy `[id]` thì mở thẻ đó và làm theo nhịp của thẻ, trừ khi `hanh_dong` nói khác.

## Mục lục

| Thẻ | Nhóm | Dùng khi | Phong cách hợp |
|---|---|---|---|
| [`leo-thang-ba-lan`](dien-wob.md) | Diễn | Wob thử một việc, hỏng to dần, lần ba lệch kiểu | cắt giấy + chèn vẽ tay |
| [`take-cham`](dien-wob.md) | Diễn | Sự cố → nhìn → dừng → phản ứng | mọi phong cách |
| [`giu-tinh-bo`](dien-wob.md) | Diễn | Sau punchline ngắn | diorama, vẽ tay |
| [`lay-da-nhay`](dien-wob.md) | Diễn | Nhảy qua chỗ khác, nhảy vì hào hứng | mọi phong cách |
| [`wob-be-ti`](dien-wob.md) | Diễn | Cho thấy quy mô nơi đó | thế giới 3D, diorama |
| [`di-bo-parallax`](dien-wob.md) | Diễn | Hành trình, đi dọc phố | cắt giấy |
| [`va-cham-vat-ly`](dien-wob.md) | Diễn | Đồ rơi, đổ, nảy (Matter.js tính trước) | mọi phong cách |
| [`dat-ky-vat-xuong`](dien-wob.md) | Diễn | Lịch sử nghiêm, không gag | diorama + cắt giấy trầm |
| [`day-vao-cham`](camera.md) | Camera | Mọi lúc giữ hình | mọi phong cách |
| [`luot-smootherstep`](camera.md) | Camera | Đổi điểm nhìn trong cùng nơi | mọi phong cách |
| [`lao-vao-can-canh`](camera.md) | Camera | Chữ nhấn, punchline | diorama, thế giới 3D |
| [`lui-ra-toan-canh`](camera.md) | Camera | Chi tiết → cả nơi | diorama, thế giới 3D |
| [`lia-theo-vat`](camera.md) | Camera | Chuyển chủ thể không cắt | mọi phong cách |
| [`lia-nhoe`](camera.md) | Camera | Đổi nơi nhanh, nhịp hài | cắt giấy, vẽ tay |
| [`tien-canh-khung`](camera.md) | Camera | Mở một nơi, ~1/3 số shot | mọi phong cách |
| [`rung-va-cham`](camera.md) | Camera | Va mạnh có chủ ý hài | mọi phong cách |
| [`lui-cham-im-lang`](camera.md) | Camera | Cuối đoạn nặng | cắt giấy, diorama |
| [`ky-vat-chuyen-canh`](chuyen-canh.md) | Chuyển | Hiện tại → hồi ức qua kỷ vật | diorama → (giay) |
| [`lao-vao-hinh-ve`](chuyen-canh.md) | Chuyển | Vào hồi ức từ hình vẽ trên sổ | diorama |
| [`lat-trang-so`](chuyen-canh.md) | Chuyển | Đổi chương ở bàn | diorama |
| [`cat-cung-ve-hien-tai`](chuyen-canh.md) | Chuyển | "Anyway." | (cat) |
| [`cat-cung-doi-mua`](chuyen-canh.md) | Chuyển | Cùng nơi, hai mùa | thế giới 3D, diorama |
| [`chen-ve-tay`](chuyen-canh.md) | Chuyển | Tưởng tượng, cường điệu, mồi chú ý | vẽ tay (chen) |
| [`xe-giay`](chuyen-canh.md) | Chuyển | Đổi nơi lớn trong hồi ức | khối HyperFrames |
| [`so-do-ve-tay`](giai-thich.md) | Giải thích | Cơ chế trừu tượng | vẽ tay |
| [`bong-bong-tuong-tuong`](giai-thich.md) | Giải thích | So sánh dạng giả định | vẽ tay |
| [`lat-the`](giai-thich.md) | Giải thích | Đoán sai → lật đáp án | cắt giấy, diorama |
| [`trang-so-ban-do`](giai-thich.md) | Giải thích | Khoảng cách, vị trí | diorama + `ve_ban_do.mjs` |
| [`dong-ho-troi`](giai-thich.md) | Giải thích | Một ngày ở đây, ngày ngắn | thế giới 3D, cắt giấy |
| [`nhiet-ke-tut`](giai-thich.md) | Giải thích | Một con số đáng nhớ trên đồ vật | mọi phong cách |

## Khuôn chương → thẻ gợi ý

| Khuôn (biên kịch chọn) | Thẻ chính |
|---|---|
| `thu-hong-hieu` | `leo-thang-ba-lan`, `take-cham`, `giu-tinh-bo`, `chen-ve-tay` |
| `doan-sai-roi-lat` | `so-do-ve-tay`, `lat-the`, `giu-tinh-bo` |
| `phong-quy-mo` | `lui-ra-toan-canh`, `wob-be-ti`, `tien-canh-khung` |
| `mot-ngay-o-day` | `dong-ho-troi`, `di-bo-parallax`, `luot-smootherstep` |
| `so-sanh-doi-thuong` | `bong-bong-tuong-tuong`, `so-do-ve-tay`, `chen-ve-tay` |
| `trang-so-hanh-trinh` | `trang-so-ban-do`, `ky-vat-chuyen-canh`, `lat-trang-so` |
| `lich-su-nghiem` | `dat-ky-vat-xuong`, `lui-cham-im-lang`, `day-vao-cham` |
| `hai-mua` | `cat-cung-doi-mua`, `wob-be-ti` |

## Chống lặp (mặc định ban đầu)

- Một tập dùng **ít nhất 12 thẻ khác nhau**; không thẻ nào chiếm quá 20% số nhịp có thẻ.
- Không dùng cùng một thẻ chuyển cảnh cho hai lần đổi chương liền nhau.
- `giu-tinh-bo` tối đa 1 lần mỗi chương (dùng nhiều thì hết buồn cười).

## Thêm thẻ mới

Khi một cách dựng mới chạy tốt trong một đoạn: thêm một mục vào đúng file nhóm (cùng mẫu: Dùng khi / Nhịp / Camera / Âm thanh / Phong cách, API / Mẫu / Bẫy), thêm một dòng vào mục lục, chỉ đường dẫn tới mã mẫu đã chạy. Thẻ chưa có mã chạy được thì ghi "chưa thử".
