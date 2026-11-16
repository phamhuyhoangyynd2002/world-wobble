# Kế hoạch đợt ra mắt: 5 tập "Why do people live here?"

> Ngày 16/11/2026. Claude chọn lại từ đầu theo quyết định 15/11 ([thảo luận](thao-luan-2026-11-15-ke-hoach-ra-mat.md), mục 3) và skill `/goi-y-chu-de`.
> **Mọi con số, ngày tháng, chi tiết lịch sử trong file này là nháp, CHƯA KIỂM CHỨNG.** Chúng chỉ là giả thuyết cho bước nghiên cứu; tập nào cũng phải qua đủ cổng kiểm chứng hai mô hình. Chi tiết nào ghi *(C?)* là Claude đã biết có nhiều con số khác nhau, nhiều khả năng phải nói "estimates vary".
> Phán quyết của Wob ở đây là dự kiến, chốt sau khi nghiên cứu.

## 1. Chọn 5 nơi

### Đo nhu cầu (YouTube, 16/11/2026)

Tìm "why do people live in <nơi>" (lọc video, hl=en, gl=US), 20 kết quả đầu. Dữ liệu thô: [youtube-tim-kiem-dot-ra-mat-2026-11-16.tsv](du-lieu-kenh-dai-2026-11-14/youtube-tim-kiem-dot-ra-mat-2026-11-16.tsv). Trung vị 10 kết quả đầu không có nhiều ý nghĩa vì trang tìm kiếm trộn nhiều video nhỏ; dùng "video lớn nhất" và "số video ≥ 1 triệu" làm bằng chứng có nhu cầu.

| Nơi | Video lớn nhất | Số video ≥ 1 triệu | Ghi chú |
|---|---|---|---|
| Oymyakon (Nga) | 121,9 triệu | 5 | Đa số là vlog đi tới đó; ít video giải thích *vì sao* có làng |
| Santa Cruz del Islote (Colombia) | 61,0 triệu | 4 | Vlog + Great Big Story 16,6 triệu |
| Tristan da Cunha (Anh, Nam Đại Tây Dương) | 31,8 triệu | 4 | Có bản giải thích của Geography By Geoff 4,8 triệu |
| Whittier (Alaska, Mỹ) | 13,8 triệu | 4 | Vlog; AmericaUnranked 1,9 triệu là bản giải thích |
| Utqiagvik (Alaska) | 9,5 triệu | 2 | Wendover đã làm rất kỹ |
| La Rinconada (Peru) | 67,8 triệu | 2 | **Loại**: mỏ vàng, điều kiện sống cực khổ, rủi ro biến người nghèo thành cảnh lạ |
| Longyearbyen (Na Uy) | 3,2 triệu | 3 | Đề tài "chết là phạm luật" đã bị làm nhiều; để giai đoạn sau |
| Coober Pedy (Úc) | 0,53 triệu | 0 | Ít người làm; hình rất mạnh (nhà dưới đất) |
| Kiruna (Thuỵ Điển) | 0,41 triệu | 0 | Ít người làm; để tập 6–10 |
| Mawsynram, Ushuaia, Matmata, Uros, Vesuvius | ≤ 14 triệu, phần lớn lệch đề | 0–3 | Để danh sách dự phòng |

### 5 nơi được chọn

Theo tỉ lệ đề xuất 15/11: 4 nơi đã có video lớn (nhu cầu sẵn) + 1 nơi ít người làm.

| Tập | Nơi | Lý do định cư (mỗi tập một kiểu) | Khí hậu | Châu lục | Wob | Phán quyết dự kiến |
|---|---|---|---|---|---|---|
| 1 | Oymyakon | Suối không đóng băng cho tuần lộc; chính sách định cư dân du mục thời Xô viết | Lạnh cực | Châu Á | `lanh-run` | NOPE |
| 2 | Coober Pedy | Mỏ opal; đào nhà dưới đất để trốn nóng | Sa mạc nóng | Châu Đại Dương | `nong-chay` | WOULD MOVE |
| 3 | Whittier | Quân đội xây cảng bí mật, để lại một toà nhà | Lạnh, tuyết, mưa | Bắc Mỹ | `soc` | SUMMER ONLY |
| 4 | Santa Cruz del Islote | Ngư dân chọn đảo vì không có muỗi | Nhiệt đới | Nam Mỹ | `ngam-nghi` | NOPE (vì ba lô của Wob không vừa đảo, không phải vì người dân) |
| 5 | Tristan da Cunha | Đồn lính canh Napoleon; núi lửa phun, cả đảo sơ tán rồi bỏ phiếu quay về | Ôn đới gió | Châu Phi / Đại Tây Dương | `dong-goi` | WOULD MOVE |

Vì sao thứ tự này:
- **Tập 1 Oymyakon**: nhu cầu lớn nhất, ai cũng hiểu "lạnh nhất" ngay ở thumbnail, Wob run rẩy là hình mở kênh dễ nhớ. Làm xong và sửa tập này trước rồi mới làm tập 2–5 (hồ sơ kênh).
- **Tập 2 Coober Pedy** đổi hẳn sang nóng, để hai tập liền nhau không giống nhau.
- **Tập 5 Tristan** có cú lật mạnh nhất (bị sơ tán sang Anh rồi phần lớn chọn quay về), hợp làm tập đóng đợt và phán quyết WOULD MOVE.
- Phán quyết chia 2 NOPE / 1 SUMMER ONLY / 2 WOULD MOVE, không lặp hai tập liền nhau.

### Không chọn và vì sao

- La Rinconada: dễ thành "nghèo khổ làm cảnh", trái giọng văn kênh.
- Bất kỳ nơi gần Biển Đông, biên giới tranh chấp, vùng chiến sự: luật kênh. Oymyakon ở Nga nhưng đề tài là khí hậu và lịch sử định cư thời Xô viết, **không** đụng chiến sự hay chính trị hiện tại.

## 2. Luật chung cho cả 5 tập (chống "inauthentic content")

| Mục | Cách làm khác nhau |
|---|---|
| Tiêu đề | 5 khuôn khác nhau (câu hỏi, câu kể có số, nghịch lý, câu chuyện, mệnh lệnh). Không tập nào bắt đầu bằng "Why do people live in…" |
| Câu mở (10 giây đầu) | 5 kiểu: số liệu gây sốc, âm thanh, Wob làm sai, câu hỏi thẳng người xem, kết cục trước rồi quay lại |
| Chương | Số chương 5–7, tên chương không lặp cấu trúc |
| Câu kết kéo bình luận | Mỗi tập một câu khác |
| Nhạc | Tập lạnh/khắc nghiệt dùng nhạc "khắc nghiệt", còn lại "tò mò"; đoạn Wob gặp nạn dùng nhạc "hài" |
| Người dân | Đùa về thời tiết, địa hình, Wob; không đùa về người dân, không chê nghèo |

Độ dài mục tiêu: 11–13 phút mỗi tập (≈ 1.600–1.900 từ lời đọc với giọng Andrew `+0%`, cần đo lại sau tập 1).

## 3. Khung kịch bản từng tập

Mốc thời gian là ước lượng. Mỗi chương mở bằng một câu hỏi nhỏ, đóng bằng một phát hiện; mỗi 60–90 giây có một lần mồi lại (bất ngờ, Wob đổi ý, câu hỏi mới).

### Tập 1 – Oymyakon, Nga

- **Tiêu đề (nháp)**: "Who Would Choose to Live at Minus Fifty?" · phương án: "The Coldest Village on Earth Was Built on Purpose"
- **Thumbnail**: làng phủ sương giá + Wob `lanh-run`, chữ "−50°C… ON PURPOSE?"
- **Mở (số liệu)**: "In winter here, your eyelashes freeze, your car stays running all night, and around five hundred people *(C?)* think this is fine." Wob đã xếp vali.
- **Góc riêng so với video lớn**: video lớn đi tới làng và quay cái lạnh; tập này trả lời *vì sao có làng ở đây*: suối nước không đóng băng, tuần lộc, và quyết định định cư thời Xô viết.

| # | Chương | Câu hỏi mở | Phát hiện đóng | Wob |
|---|---|---|---|---|
| 0 | (0:00) Hook | Ai lại chọn sống ở đây? | Hứa: cuối video Wob sẽ quyết có chuyển tới không | `hao-hung` |
| 1 | How cold is "coldest"? | Lạnh nhất là bao nhiêu? | Kỷ lục −67,7°C năm 1933 là con số chính thức; có tranh cãi với Verkhoyansk và con số −71°C *(C?)* | `lanh-run` |
| 2 | The water that never froze | Cái tên Oymyakon nghĩa là gì? | Tên được giải thích là "nước không đóng băng": suối ấm nơi người chăn tuần lộc cho đàn uống *(cần nguồn ngôn ngữ học)* | `ngam-nghi` |
| 3 | Why a village, not a camp | Sao dân du mục lại ở yên một chỗ? | Chính sách định cư thời Xô viết những năm 1920–30, trạm khí tượng, sân bay *(C?)* | `soc` |
| 4 | Living inside a freezer | Đời sống hằng ngày ra sao? | Đất băng vĩnh cửu: nhà vệ sinh ngoài trời, đào mộ phải hơ lửa, xe để nổ máy, trường chỉ nghỉ khi dưới khoảng −52°C *(C?)* | `lanh-run`, rồi Wob đổi ý lần 1 |
| 5 | The summer twist | Có mùa hè không? | Mùa hè có thể lên trên 30°C: biên độ nhiệt năm vào loại lớn nhất thế giới | Wob đổi ý lần 2 (`hao-hung`) |
| 6 | Why they stay | Sao giờ vẫn ở? | Gia đình, tuần lộc, du lịch "Pole of Cold", lòng tự hào của làng | `ngam-nghi` |
| 7 | Verdict | — | Con dấu **NOPE** + 1–2 câu (Wob chỉ chịu được 4 phút ngoài trời) | `lanh-run` |

- **Câu kết**: "How many minutes would you last outside here?"
- **Rủi ro**: không nói về chính trị Nga hiện tại; dân tộc Sakha và Even phải được nói tôn trọng; bản đồ Nga không có vùng nhạy cảm của Việt Nam.

### Tập 2 – Coober Pedy, Úc

- **Tiêu đề (nháp)**: "The Australian Town That Moved Underground"
- **Thumbnail**: mặt cắt ngọn đồi, phòng khách dưới đất, Wob `nong-chay` trên mặt đất, chữ "IT'S 24°C DOWN HERE"
- **Mở (âm thanh)**: tiếng cuốc đào, rồi "The first house in this town wasn't built. It was dug." Wob tan chảy trên mặt đất.
- **Góc riêng**: video lớn (Channel 4, BBC) chỉ là phóng sự ngắn; tập này giải thích dây chuyền: opal → thợ mỏ có sẵn kỹ năng đào → đào nhà là rẻ và mát nhất.

| # | Chương | Câu hỏi mở | Phát hiện đóng | Wob |
|---|---|---|---|---|
| 0 | Hook | Ai lại sống trong hang? | Hứa: tìm ra vì sao đào rẻ hơn xây | `nong-chay` |
| 1 | A boy, a rock, 1915 | Thị trấn bắt đầu từ đâu? | Opal được tìm thấy năm 1915, chuyện cậu thiếu niên Willie Hutchison *(cần nguồn)* | `soc` |
| 2 | Why opal, why here | Sao opal lại ở đây? | Địa chất: biển nội địa cổ, nước thấm vào đá tạo opal *(cần nguồn địa chất)*; Coober Pedy cung cấp phần lớn opal thế giới *(C?)* | `ngam-nghi` |
| 3 | Too hot to live on top | Nóng tới mức nào? | Mùa hè thường trên 40°C; dưới đất giữ khoảng 23–25°C quanh năm *(C?)* | `nong-chay` |
| 4 | Digging is cheaper than building | Đào nhà tốn bao nhiêu? | Thợ mỏ có máy và kỹ năng; không cần điều hoà; nhà thờ, khách sạn, hiệu sách dưới đất | `hao-hung` (Wob muốn đào ngay) |
| 5 | The holes everywhere | Mặt trái là gì? | Hàng nghìn giếng mỏ bỏ hoang, biển cảnh báo đi bộ lùi; thiếu nước | Wob gặp nạn (nhạc hài), `soc` |
| 6 | Who was here first | Trước thợ mỏ là ai? | Người Antakirinja Matu-Yankunytjatjara; tên gọi "kupa piti" thường được dịch là "white man in a hole" *(C?, phải nói rõ là cách dịch phổ biến)* | `ngam-nghi` |
| 7 | Verdict | — | **WOULD MOVE** (nếu được ở dưới đất) | `hao-hung` |

- **Câu kết**: "Would you trade your windows for a room that's always twenty-four degrees?"
- **Rủi ro**: nội dung về người bản địa phải chính xác, không dùng hình người thật nhận ra được; không dùng cảnh phim Mad Max.

### Tập 3 – Whittier, Alaska, Mỹ

- **Tiêu đề (nháp)**: "An Entire Town Lives in One Building. Blame the Army."
- **Thumbnail**: toà nhà 14 tầng giữa núi tuyết, Wob `soc`, chữ "ONE BUILDING. WHOLE TOWN."
- **Mở (Wob làm sai)**: Wob tới muộn 5 phút, cửa đường hầm đã đóng. "Welcome to the only town in America with a bedtime for its road." *(cần kiểm giờ đóng hầm)*
- **Góc riêng**: vlog quay cuộc sống trong toà nhà; tập này kể chuỗi quyết định quân sự thời Thế chiến II tạo ra thị trấn.

| # | Chương | Câu hỏi mở | Phát hiện đóng | Wob |
|---|---|---|---|---|
| 0 | Hook | Sao cả thị trấn lại ở trong một toà nhà? | Hứa: câu trả lời là một quyết định quân sự | `soc` |
| 1 | A port nobody could see | Sao lại xây ở đây? | Cảng không đóng băng, mây phủ gần như quanh năm che khỏi máy bay ném bom *(C?)* | `ngam-nghi` |
| 2 | The tunnel | Đi vào bằng cách nào? | Đường hầm Anton Anderson, một làn, ô tô và tàu hoả dùng chung, theo lịch, đóng ban đêm | Wob bị kẹt ngoài hầm (nhạc hài) |
| 3 | Begich Towers | Toà nhà là gì? | Doanh trại quân đội cũ thành chung cư; bưu điện, cửa hàng, đồn cảnh sát trong cùng toà nhà; trường nối bằng đường hầm *(cần nguồn)* | `hao-hung` |
| 4 | The other building | Toà nhà kia sao bị bỏ? | Buckner Building, "city under one roof" cũ, bỏ hoang; động đất 1964 và sóng thần *(cần nguồn)* | `soc` |
| 5 | Snow, wind, rain | Thời tiết ra sao? | Tuyết, gió, mưa nhiều; vì vậy ở trong nhà là hợp lý chứ không lạ *(C?)* | `lanh-run` |
| 6 | Why people stay | Giờ ai còn ở? | Cảng, du thuyền, câu cá mùa hè; mùa hè dân số tăng nhiều | `ngam-nghi` |
| 7 | Verdict | — | **SUMMER ONLY** | `dong-goi` |

- **Câu kết**: "Could you live a whole winter without leaving one building?"

### Tập 4 – Santa Cruz del Islote, Colombia

- **Tiêu đề (nháp)**: "The Tiny Island People Chose Because It Had No Mosquitoes"
- **Thumbnail**: hòn đảo nhỏ kín nhà nhìn từ trên cao, Wob `ngam-nghi` với ba lô quá to, chữ "NO MOSQUITOES. NO SPACE."
- **Mở (câu hỏi thẳng người xem)**: "If you could live anywhere on a coast full of empty islands, would you pick the smallest one?"
- **Góc riêng**: video lớn quay cảnh đông đúc; tập này giải thích lý do chọn đảo, và tranh cãi về danh hiệu "đông dân nhất" (dân số được ước lượng rất khác nhau *(C?)*).

| # | Chương | Câu hỏi mở | Phát hiện đóng | Wob |
|---|---|---|---|---|
| 0 | Hook | Sao lại chen nhau trên đảo nhỏ nhất? | Hứa: lý do rất đời thường | `ngam-nghi` |
| 1 | How small is small | Đảo rộng bao nhiêu? | Khoảng một hecta, so với sân bóng đá *(cần nguồn)* | `soc` |
| 2 | The mosquito reason | Sao ngư dân chọn đảo này? | Theo lời kể, ngư dân từ vùng Barú dừng lại vì không có muỗi, gần ngư trường *(C?)* | `hao-hung` |
| 3 | How many people, really? | Có bao nhiêu người? | Các con số khác nhau nhiều; có điều tra dân số mới cho con số thấp hơn danh hiệu hay được nhắc *(C?, chương này dành cho "estimates vary")* | `ngam-nghi` |
| 4 | Water, school, no cars | Sống thế nào? | Nước ngọt chở từ đất liền, điện, trường học, không có xe *(cần nguồn)* | Wob gặp nạn: ba lô kẹt giữa hai nhà (nhạc hài) |
| 5 | The sea is rising | Tương lai ra sao? | Đảo thấp, rủi ro nước biển dâng *(cần nguồn khoa học)* | `soc` |
| 6 | Why they stay | Sao không chuyển lên đất liền? | Cộng đồng, nghề cá, du lịch | `ngam-nghi` |
| 7 | Verdict | — | **NOPE**, lý do: ba lô của Wob không vừa đảo (đùa về Wob, không về người dân) | `dong-goi` |

- **Câu kết**: "What would you give up to live somewhere with no mosquitoes?"
- **Rủi ro**: **không** đùa về nghèo, đông đúc như "khu ổ chuột"; không ảnh người thật nhận ra được; vùng biển Caribe không có vấn đề chủ quyền với Việt Nam.

### Tập 5 – Tristan da Cunha, Anh (lãnh thổ hải ngoại)

- **Tiêu đề (nháp)**: "They Evacuated the World's Remotest Island. Then Went Back."
- **Thumbnail**: núi lửa và làng nhỏ giữa biển, Wob `dong-goi`, chữ "THEY CAME BACK"
- **Mở (kết cục trước)**: "In 1961 a volcano forced every person on this island onto a ship to England. Two years later, most of them voted to go home." *(cần kiểm năm và tỉ lệ)* Rồi lùi lại: vì sao có người ở đây ngay từ đầu?
- **Góc riêng**: video lớn tập trung vào sự xa xôi; tập này xoay quanh *lựa chọn quay về* và cách đảo giữ cộng đồng (đất chung, không bán cho người ngoài *(C?)*).

| # | Chương | Câu hỏi mở | Phát hiện đóng | Wob |
|---|---|---|---|---|
| 0 | Hook | Sao lại quay về nơi xa nhất thế giới? | Hứa: hiểu vì sao họ chọn về | `soc` |
| 1 | How remote is remote | Xa tới mức nào? | Khoảng 2.400 km tới St Helena, không sân bay, tàu mất nhiều ngày *(C?)* | `ngam-nghi` |
| 2 | Guarding Napoleon | Ai tới đầu tiên? | Đồn lính Anh năm 1816, gắn với việc Napoleon bị đày ở St Helena; William Glass ở lại *(cần nguồn)* | `hao-hung` |
| 3 | Seven surnames | Cộng đồng hình thành ra sao? | Người đi biển, người bị đắm tàu ở lại; vài họ chung cả đảo *(C?)* | `ngam-nghi` |
| 4 | 1961 | Núi lửa làm gì? | Phun trào, sơ tán cả đảo sang Anh | `soc` |
| 5 | The vote to go home | Sao về? | Cuộc sống ở Anh và lựa chọn quay về năm 1963 *(cần nguồn)* | Wob đổi ý (`dong-goi`) |
| 6 | How the island stays the island | Ngày nay ra sao? | Đất chung, tôm hùm đá, tem; muốn nhập cư phải được cộng đồng đồng ý *(C?)* | `ngam-nghi` |
| 7 | Verdict | — | **WOULD MOVE** (nếu đảo chịu nhận Wob) | `hao-hung` |

- **Câu kết**: "Would you go back after two years in a big city?"
- **Ghi chú**: tập đóng đợt; câu cuối có thể mời xem lại 4 tập trước bằng end screen, không nói "subscribe" ở đầu.

## 4. Thứ tự sản xuất và việc còn thiếu

1. Làm trọn **tập 1** qua `/tao-video projects/2026-11-16-oymyakon`, người làm kênh xem, sửa dây chuyền.
2. Rồi tập 2–5 theo thứ tự trên; mỗi tập dùng `brief.md` đã tạo sẵn trong `projects/`.
3. Thiếu trước khi chạy:
   - `GEMINI_API_KEY` cho kiểm chứng vòng 2. **Không có thì cổng 2 không đạt được** (vòng 2 là bắt buộc).
   - Phong cách ảnh (`/tao-anh-web` qua Browser MCP).
   - Chốt 3 bài nhạc trong danh sách ứng viên (Kevin MacLeod, CC BY 4.0).

## 5. Danh sách dự phòng (tập 6–10)

Kiruna (thị trấn dời đi vì mỏ), Longyearbyen (cấm chết, cấm mèo: góc mới cần tìm), Utqiagvik (đêm dài hai tháng), Matmata (nhà hố dưới đất ở sa mạc), Uros (đảo nổi bằng lau sậy), Mawsynram (nơi mưa nhiều nhất).

## 6. Ứng viên đợt tập 6–10: thành phố thứ hai (ý của người làm kênh, 16/11/2026)

Người làm kênh đề xuất thử các thành phố lớn thứ hai (thủ đô thì nhiều người nhớ, thành phố thứ hai ít người biết). Đo cùng ngày ([dữ liệu](du-lieu-kenh-dai-2026-11-14/youtube-tim-kiem-thanh-pho-thu-hai-2026-11-16.tsv)): video đúng chủ đề về một thành phố thứ hai cụ thể thường chỉ 70 nghìn đến khoảng 1 triệu lượt (Santa Cruz de la Sierra ~68 nghìn, Córdoba ~78 nghìn, "Why Istanbul isn't the capital" ~574 nghìn, Gothenburg/B1M ~1,1 triệu); với Busan, Osaka, Porto, Guadalajara, kết quả lớn nói về cả nước hoặc chuyện khác. Nghĩa là ít đối thủ nhưng cũng ít người tìm.

**Quyết định:** đợt ra mắt giữ 5 nơi khắc nghiệt; thành phố thứ hai làm đợt tập 6–10 (đúng hướng mở rộng "vì sao thành phố này được xây ở đây" trong tài liệu thị trường), nếu số liệu 5 tập đầu cho thấy kênh có người xem.

Muốn chạy được thì mỗi tập phải có một **nghịch lý**, không giới thiệu thành phố chung chung. Ứng viên (chưa kiểm chứng):
- Almaty: lớn nhất nước nhưng mất ngôi thủ đô.
- Santa Cruz de la Sierra: giàu và đông hơn La Paz.
- Alexandria: từng là thành phố hàng đầu thế giới rồi tụt hạng.
- Porto: đặt tên cho cả nước Bồ Đào Nha.
- Istanbul: lớn hơn Ankara nhiều lần mà không phải thủ đô.
- Lagos: thủ đô bị dời đi Abuja.
- Busan: thủ đô tạm thời thời chiến tranh Triều Tiên (cẩn trọng: chiến tranh là lịch sử, không phải chính trị hiện tại).

Tránh: thành phố đang có chiến sự, tranh chấp lãnh thổ, hoặc nổi tiếng chủ yếu vì tội phạm (Guadalajara ra kết quả về cartel).
