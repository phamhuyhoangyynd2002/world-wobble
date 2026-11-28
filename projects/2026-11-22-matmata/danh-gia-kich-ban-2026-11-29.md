# Đánh giá kịch bản tập 8 Matmata (29/11/2026)

Bản đánh giá: script.json bản 22/11 (13 cảnh, 1.555 từ, ~10 phút, 20 khẳng định). Viết trước các luật từ 24/11, nên phải sửa lớn. Căn cứ giống bản đánh giá tập 7 (`projects/2026-11-22-mawsynram/danh-gia-kich-ban-2026-11-29.md`).

## A. Lỗi chặn

1. **Thiếu cảnh `duoi`** (validator LỖI): kỷ vật mẩu vách lên kệ; nhìn lại chiếc tất Mawsynram (tập 7) và/hoặc chìa khoá Kiruna; nhá tập 9 Uros không nêu tên (gợi: nước, độ cao, đảo tự làm — chỉ nét chung chắc đúng trong brief tập 9).
2. **Thiếu lời chào cố định** cuối hook.
3. **Lộ đáp án ở cảnh 2** ("For centuries, Amazigh families… have lived here in homes dug down into the earth. Not caves in a cliff. Pits, open to the sky."), và cảnh 6 đã giải "mát hơn 15 °C" trước chương "Why Dig Down?". Thiếu `dap_an_chinh`. Lời giải ~2:00–3:30 sau giả thuyết sai ("thị trấn ma" ở c4 là giả thuyết sai tốt, giữ).
4. **Trùng góc tập 2 Coober Pedy**: "dưới đất thì mát" là đáp án chính của Coober Pedy. Tập 8 phải đặt lý do riêng lên trước (đất mềm đứng vách, gỗ/đá hiếm, sân trũng là trung tâm gia đình, phòng thủ/ẩn mình, nông nghiệp khe jessour, trận lũ cuối thập niên 1960 và thị trấn mới — chờ nghiên cứu bổ sung), "mát" chỉ là một mảnh, nói rõ khác Coober Pedy ở chỗ nào.
5. **Khuôn câu đã cấm**: "I changed my mind about holes" (c6); "So here is the whole answer" tóm ba vế (c13); "Would I move there? Yes." (c13); cặp "It suits… / It does not suit…" (c13).
6. **Văn kiểu AI**: "Here is how one of these homes works" (c5) + "here is the whole answer" (c13) — nhóm "here's…" tối đa 1; "Not caves in a cliff. Pits, open to the sky." là khuôn "not X, Y" (tối đa 1).
7. **Kết luận chung chung** c12: "But mostly, from everything I read, it is home" — câu áp cho mọi nơi; phải là lý do cụ thể chỉ đúng ở Matmata.

## B. Lỗi nặng

8. **Chương "một ngày" theo mốc giờ** (c6: Early morning / Mid-morning / Noon) — khuôn đã dùng nhiều tập; tập 5–7 tránh. Đổi khuôn hoặc không gọi theo giờ.
9. **Đọc tên nguồn liên tục**: Reuters ×3, AP, "one study", "some researchers", "some accounts" ×2. Giữ tên nguồn chỉ ở chỗ cần.
10. **Rào đón dày ở c9** ("According to some accounts… and that people sought help…" câu sai ngữ pháp) và mốc lũ "late 1960s" mức C: chờ nghiên cứu; nếu nguồn gốc chốt được năm (1969) thì nói thẳng.
11. **Phim**: c10 nói tên phim và năm quay là được (chỉ bằng lời); không vẽ nhân vật/đạo cụ/khung cảnh phim; y_hinh phải ghi rõ. Cân nhắc giảm thời lượng chương phim (dễ thành "fan trivia", lệch câu hỏi trung tâm).
12. **Câu tả người dân**: "a woman sorting olives" (c4) là cảnh vẽ, được; không vẽ mặt người thật cụ thể; lời người dân chỉ từ Reuters/AP.
13. **c3 hành trình dài 210 từ** gần như không có thông tin (chỉ khoảng cách Tunis); nhịp chậm ở phút 0:40–2:00. Rút còn ~120 từ, gài manh mối (vết lõm tròn) rồi đi tiếp.
14. **c11 lạc ngủ nhầm sân** vui nhưng 150 từ không có sự thật nào; rút hoặc gắn với chi tiết thật (nhiều sân nối bằng hầm, C14).

## C. Độ dài

15. 1.555 từ ≈ 10 phút; mục tiêu ~1.750–1.900 từ (11,5–12,5 phút) bằng lập luận riêng (đất, nước, jessour, gia đình quanh sân), không bằng thêm số.

## D. Giữ lại

- Hook "đi qua khách sạn hai lần vì nó ở bên dưới"; con dê kêu ở dưới chân; "The village was downstairs."; "a house turned inside out — every door looks in at the family"; xách hai xô nước lên dốc hầm, uống mất nửa → "That is why camels were involved."; mẩu vách rơi xuống gối nối với chuyện mưa là kẻ thù; "The visitors came for a film. The house was here first."
- Phán quyết WOULD MOVE (xen kẽ sau NOPE tập 7).

## E. Bản đồ

- Tunisia, khung Bắc Phi/Địa Trung Hải; không vùng nhạy cảm. Biên giới Libya vẽ bình thường; không vẽ Tây Sahara.

## F. Kết quả sửa

Viết lại 29/11/2026 (script.v2.json = bản 22/11). Bản mới: 13 cảnh, 7 chương, 1.801 từ (~11,6 phút), 37 khẳng định (1 hedged), 14 nguồn. `validate_script.py`: 0 lỗi, 0 cảnh báo.

| Mục | Đã xử lý thế nào |
|---|---|
| A1 thiếu `duoi` | Cảnh 13 (45 từ, không số): mẩu vách đặt lên đĩa hứng bụi trên kệ (mở bằng hành động, không dùng khung "X goes on the shelf"); nhìn lại chiếc tất ẩm (tập 7) và chìa khoá Kiruna chỉ hướng đông (tập 6); nhá tập 9 "people make the ground themselves, by hand. And it floats." (không tên nơi, nước). `nhin_lai` = mawsynram, kiruna; `nha_tap_sau.slug` = 2026-11-22-uros |
| A2 lời chào | Hook kết bằng câu cố định "Hi, I'm Wob. I visit odd places and ask why anyone stays." Hook 32 từ trước lời chào |
| A3 lộ đáp án, thiếu `dap_an_chinh` | Lời hứa (cảnh 2) chỉ treo câu hỏi "who really runs the place… It wasn't me. It wasn't the sun either" và manh mối "a camel makes a delivery through a roof"; không nói đất, mưa, nông nghiệp. Hai giả thuyết sai trước: làng bỏ hoang (cảnh 3), đào xuống trốn nắng, đúng một nửa với số đo 7/1997 (cảnh 4). `dap_an_chinh` = cảnh 5, từ khoá jessour/olive/farm, ước bắt đầu ~181 s (3:01). Tiêu đề chương, tiêu đề làm việc ("A Town You Can Walk Past Without Seeing") không chứa từ khoá |
| A4 trùng góc Coober Pedy | Lý do chính là nước: jessour giữ mưa và đất cho ô liu, vả, chà là (S18); nhà hố là nhà của nông trại (kho ô liu có lỗ trên nóc cho lạc đà đổ, giếng giữa sân hứng mưa, S11, S10); loess là cơ chế đào được (S10). "Mát" chỉ là giả thuyết đúng một nửa ở cảnh 4 và một mảnh ở cảnh 10 (giữ phòng dưới hố cho mùa nóng). Wob tự nhắc "I'd seen that trick before, on another trip" để tách khỏi tập 2 |
| A5 khuôn câu cấm | Bỏ hết: không "I changed my mind" (đổi ý bằng chiếc túi: dỡ, xếp lại, mở lại), không tóm ba vế, không "Would I move there?", không cặp suits/does not suit, không "one last shake" |
| A6 văn kiểu AI | Nhóm "here's…": 0. Câu đối xứng "not X, it's Y": 0 (bỏ "Not caves in a cliff. Pits…"). Không câu đảo vòng, không tính từ giật gân. Bỏ hai phép so sánh mở bằng "Picture…" |
| A7 kết chung chung | Bỏ "mostly, it is home". Lý do ở outro chỉ đúng ở Matmata: "People farm these hills because the rare rain can be caught, and they live inside them because the ground allows it. The price is that the rain gets a say." + người thợ đào nói với Reuters ông tới sửa sau mỗi trận mưa |
| B8 chương "một ngày" | Bỏ hẳn; không chương nào theo mốc giờ |
| B9 đọc tên nguồn | Trong lời chỉ còn: "researchers" (3 chỗ, mỗi chỗ một cách nói), Associated Press 1 lần (lời người dân), Reuters 1 lần + "the same reporters", Lucasfilm 1 lần (chuyện bão khi quay). Không gọi National Geographic, UNESCO trong lời |
| B10 rào đón, năm lũ | Lũ nói thẳng 1969 (S15 Nat Geo + S12 số liệu gốc), không hedged. Bỏ "little known to outsiders", "sought help". Thêm chi tiết có nguồn: mưa nhiều tuần, 3–8/10 vùng bờ biển 100–200 mm ≈ cả năm mưa của Matmata, >500 người chết, >70.000 nhà sập (tới cuối tháng 11), đất New Matmata 3 dinar/m², Haddej bỏ hoang từ thập niên 1990. Không chuyện chính trị, sắc tộc về chính sách dời dân; Bourguiba chỉ ở mức "xây thị trấn mới" |
| B11 phim | Cảnh 11: chỉ nói bằng lời tên phim + năm (1969 khách sạn, 1976 quay), cộng chuyện Lucasfilm kể trận bão hiếm gặp ở nam Tunisia (nối với lập luận mưa). Phần phim ~25–30 s. `y_hinh` ghi rõ: chỉ máy quay vẽ phác và ghế gấp trống, không nhân vật, trang phục, đạo cụ, chữ, logo, cảnh phim |
| B12 người dân | Không vẽ mặt người thật: người que, đồ vật. Không bịa cuộc gặp; lời người dân chỉ từ AP (bà lớn lên trong nhà hố, C20 sửa `statement`: không phải nhà Sidi Driss) và Reuters 2018 (C34). Bỏ "a woman sorting olives" (lộ đáp án) |
| B13 hành trình dài | Bỏ chương đường đi; khoảng cách Tunis gói vào câu nêu tên nơi ở cảnh 2 (thẻ hộ chiếu đúng chữ "Matmata") |
| B14 ngủ nhầm sân | Bỏ. C14 nhiều sân nối nhau (nguồn yếu) bỏ khỏi lời |
| C15 độ dài | 1.801 từ ≈ 11,6 phút; phần thêm là lập luận riêng (jessour, kho ô liu, giếng sân, loess, luật thợ đào, người giữ phòng dưới hố), không thêm số rời |
| Mục (c) research | C05 → 6–10 m sâu, 5–10 m rộng (S10, S11); C06 → kho trên cao, gia súc và nông cụ ở hốc bên đường hầm; C08 → số đo 46 °C / 27–28 °C ngày 24–25/7/1997 (S10, S27); C10 "soft rock" → loess; C12 → "according to researchers… raids and feuds", bỏ "crowded coasts", giữ hedged; C13 → sửa người; C16 → 1969; "filled with sand" → "slowly fell into ruin"; "for centuries" giữ, nguồn S13 + S10; không tuổi kiểu nhà, không tuổi người thợ |
| E bản đồ | `map-matmata` (Tunisia + ven Địa Trung Hải, Matmata ở nửa phải, ghim Tunis, Gabès; Tây Sahara ngoài khung) và `map-matmata-local` (Matmata, New Matmata, Gabès; không ghi số km tự tính). Không chạm Biển Đông |

Khung tập khác tập 6–7 (chi tiết ở `script.json` → `ghi_chu_khung`): 7 chương thay 8; một chuyến đi tháng 10, không nhảy mùa; chương thân mở bằng `doan-sai-roi-lat` (tập 6 `phong-quy-mo`, tập 7 dự kiến `so-sanh-doi-thuong`, tập 9 `thu-hong-hieu`); chương nghiêm ở hồi ức, không về bàn giữa tập; outro bằng khay cát và hai thìa nước, mẩu vách vá vào chỗ sụp. Phán quyết WOULD MOVE (xen kẽ sau SUMMER ONLY, NOPE), câu hỏi bình luận mới: "Would you rather fight the heat every summer, or fix your walls after every rain?"
