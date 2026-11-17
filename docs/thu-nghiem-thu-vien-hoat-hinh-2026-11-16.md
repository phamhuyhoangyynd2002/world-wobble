# Thử nghiệm: làm hoạt hình hoàn toàn bằng thư viện code (trào lưu TikTok)

> Ngày 16/11/2026. Người làm kênh thấy trên TikTok các video hướng dẫn làm video chuyển động, hoạt hình hoàn toàn bằng thư viện, muốn biết cụ thể chúng làm thế nào, có hợp với World Wobble không, và dùng chúng để nâng cấp phong cách dựng.
> Cách làm: tra web (mục Nguồn), đọc mã nguồn và hướng dẫn của các repo sát với kênh, rồi **dựng thử 3 bài trên máy này** và chấm bằng mắt.
> Toàn bộ bài thử: `projects/2026-11-16-oymyakon/ban-thu-thu-vien/` (video `.mp4` không vào git, chạy lại được).
> Liên quan: [cong-cu-hoat-hinh-moi-noi-2026-11-16.md](cong-cu-hoat-hinh-moi-noi-2026-11-16.md), [dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md](dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md).

> **Cập nhật cùng ngày (phần 2, mục 8–10):** người làm kênh gửi 5 video TikTok mới hơn. Phát hiện chính là repo **claude-animated-shorts** (MIT): nhân vật 2D dạng tấm phẳng trong thế giới 3D. Bài thử **T4** đưa Wob vào phố Oymyakon 3D theo cách đó và cho kết quả tốt nhất trong các bài thử. Đọc mục 8–10 trước.

## Tóm tắt

- **Trào lưu trên TikTok gần như toàn bộ là "Claude Code + skill Remotion"**: cài skill, viết prompt, Claude viết mã React, Remotion xuất MP4, "không mở After Effects, không keyframe". Sản phẩm phần lớn là motion graphics (chữ động, biểu đồ, quảng cáo sản phẩm), **không phải nhân vật diễn**.
- **Bộ máy không phải chỗ khác biệt.** Cùng một cú nhảy của Wob, Remotion và HyperFrames (đang dùng) ra **gần như giống hệt từng khung**, render ngang nhau (13 giây và 13,6 giây cho 5 giây video). Đổi sang Remotion phải viết lại template mà không được gì thêm. **Giữ HyperFrames.**
- **Thứ đáng học là kỹ thuật hoạt hình mà các repo giỏi nhất mã hoá thành code**, nhất là ClaudeAnimationBase (MIT) và line-art-animation (MIT): lấy đà, co giãn giữ thể tích, vượt rồi dội lại, đồ vật đung đưa theo đà, nét "sôi", vẽ "on twos", tay chân tính bằng toán thay vì vẽ sẵn, vật lý thật, tự kiểm bằng bảng khung hình.
- **Dựng thử cảnh 1 của bản thử 60s theo cách đó (T2) cho kết quả khác hẳn tập 1**: Wob giật con cá ra khỏi hộp, giơ lên, đập xuống; cá (mô phỏng bằng Matter.js) va mép hộp, chênh vênh rồi đổ sập; Wob bật nhảy sang sổ, lật trang, run, chỉ biển, nhìn thẳng tỉnh bơ; camera lao vào hình vẽ đang có tuyết rơi. Không dùng ảnh nào, Wob giữ đúng tạo hình gốc.
- **Phát hiện phụ có giá trị lớn (T3)**: phông nền **vẽ bằng cọ màu nước p5.brush (MIT)**, tách lớp nền trong suốt để làm parallax, đẹp và miễn phí không giới hạn. Gỡ được điểm nghẽn "hết lượt ảnh AI" trong định hướng mục 6.
- **Cái giá thật là công dàn dựng**, không phải tiền: cảnh 12,6 giây cần khoảng 400 dòng mã. Muốn làm cả tập 10–15 phút thì phải gom thành **thư viện dùng lại** (rig Wob, đạo cụ, camera, nét sôi, chuyển cảnh) để mỗi tập chỉ còn viết "kịch bản diễn". Đúng là việc số 1 ở mục 7 của định hướng.

## 1. Trào lưu trên TikTok cụ thể là gì

| Kiểu video | Công cụ | Ví dụ | Hợp kênh? |
|---|---|---|---|
| "Mọi motion graphics trong reel này làm bằng Claude Code" | Claude Code + skill Remotion (`npx skills add remotion-dev/skills`), render `npx remotion render` | @luzzidigital, @danyltn, @monixette (Antigravity + Remotion) | Kỹ thuật dùng được; sản phẩm của họ là chữ động, quảng cáo |
| "Vox-style" cắt dán giấy từ một tấm ảnh | invideo + Claude Motion (beta, chỉ gói Team/Enterprise) | @joeurbinati | Không: gói không có, phụ thuộc nền tảng |
| Lottie qua MCP | LottieFiles MCP | Video tiếng Nga | Chỉ cho hiệu ứng nhỏ |
| "36 phong cách motion graphics với Claude" | GSAP, D3, three.js, p5.js, rough.js, Zdog, Matter.js, Manim, HyperFrames | bài mndr.ai | Một số kỹ thuật dùng ngay (mục 4) |

Ngoài TikTok, kho [awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills) liệt kê khoảng 180 repo. Các repo **sát với kênh** đã đọc kỹ:

| Repo | Làm gì | Bài học lấy về |
|---|---|---|
| **ClaudeAnimationBase** (MIT) | Nhân vật vẽ cọ p5.js + p5.brush, 31 biểu cảm, nét sôi, render headless ra MP4 | Hướng dẫn hoạt hình rất cụ thể: "mỗi lúc một điều để hiểu", nhanh ở động tác nhưng **giữ hình** ở ý nghĩa; nét sôi đổi seed 12 lần/giây, mỗi phần tử seed riêng; quy trình **bảng phân cảnh → dựng từng shot → tự xem bảng khung hình, dải khung, ảnh cận** |
| **line-art-animation** (MIT) | Người vẽ nét SVG tự đi bộ, phản ứng | Dáng đi **giải bằng toán** (chân trụ trượt theo tốc độ, chân bước theo đường ít giật), lò xo cho tay áo và túi, con lắc cho đồ treo; chụp từng khung bằng DevTools nên không phụ thuộc tốc độ máy |
| **Paper-Cut** (MIT) | Video giải thích cắt dán giấy, **dựng bằng HyperFrames** | Ảnh nền được duyệt trước, tách vài lớp từ chính ảnh đó, chuyển động camera chậm + lớp GSAP + âm thanh giấy |
| sweety-statechart-video, parallax-doc, cinematic-skill | Phim ngắn vẽ tay có lời kể; phim tài liệu 2.5D; camera theo lời đọc | Chưa đọc mã; ghi lại để tham khảo |

## 2. T1 · Remotion đấu HyperFrames

Cùng một clip 5 giây, 1920×1080: Wob nhảy 3 lần (lấy đà bẹp, bật kéo dài, bay theo cung, chạm đất bẹp, dội lại bằng lò xo).

| | Remotion 4.0.544 | HyperFrames 0.8.85 (đang dùng) |
|---|---|---|
| Cài | 23 giây, 246 MB (`react`, `remotion`, `@remotion/cli`) | Đã có (npx) |
| Render 5 giây | 37 giây lần đầu, **13 giây** khi đã ấm | **13,6 giây** |
| Mã | React, `spring()` có sẵn | HTML + GSAP, `elastic.out` |
| Kết quả | Gần như giống hệt từng khung ([so-sanh/t1-nhay.png](../projects/2026-11-16-oymyakon/ban-thu-thu-vien/so-sanh/t1-nhay.png), hàng trên Remotion, hàng dưới HyperFrames) | |
| Giấy phép | Miễn phí cho cá nhân và công ty ≤ 3 người, **gồm cả dùng thương mại**; trên đó 25 USD/người/tháng | Apache 2.0 |

**Kết luận: không đổi.** Thứ làm video trên TikTok trông "xịn" là mã hoạt hình, không phải Remotion. Đổi bộ máy thì phải viết lại template, `prepare_render.py`, luật lint mà hình không đẹp hơn.

## 3. T2 · Dựng cảnh 1 bản thử 60s theo kỹ thuật hoạt hình

Thư mục `ban-thu-thu-vien/t2-canh-1/` · video `out/canh-1.mp4` (12,6 giây, có giọng Andrew, sfx, nhạc) · `build.py` + `canh.js` (~420 dòng) + `vat_ly_ca.mjs`.

### Kỹ thuật đã áp dụng

| Kỹ thuật | Cách làm trong code | Thấy ở đâu |
|---|---|---|
| **Dựng thủ tục theo thời gian** | Mỗi khung gọi `render(t)` tính lại toàn cảnh; GSAP chỉ làm đồng hồ | Toàn cảnh. Tua tới đâu ra đúng khung đó |
| **On twos** | Nhân vật, đạo cụ lấy `t` làm tròn xuống 1/12 giây (mỗi tư thế giữ 2 khung); camera vẫn mượt 30 khung | Cảm giác "phim hoạt hình" thay vì "slide trôi" |
| **Nét sôi** | Bộ lọc `feTurbulence` + `feDisplacementMap` đặt ở không gian màn hình, đổi seed 12 lần/giây | Mọi nét rung nhẹ như vẽ tay |
| Lấy đà, co giãn, vượt rồi dội | Bảng mốc `sy` (co giãn), `sx = 1/√sy` để giữ thể tích; easing `back`, `elastic` | Trước khi giật cá, trước cú nhảy, lúc chạm đất |
| **Theo đà thật** | Ba lô là con lắc tắt dần, bị đẩy bởi gia tốc của Wob (giải phương trình mỗi khung, không keyframe) | Ba lô văng khi Wob nhảy, đập cá |
| **Tay ống cao su** | Tay là đường cong bậc hai từ vai tới bàn tay; khoảng cách ngắn thì tự cong, dài thì duỗi; tay nằm sau thân, chỉ ra trước khi ôm người | Cầm cá, đập trang sổ, chỉ biển, ôm người run |
| **Vật lý** | Matter.js (MIT) mô phỏng cá cứng rơi, tính trước thành 49 khung, cố định 60 bước/giây nên chạy lại ra y hệt | Cá va mép hộp, chênh vênh, đổ sập (gag tự nhiên, không định trước) |
| Khẩu hình | 9 hình miệng theo mốc `khau-hinh/scene-1.json` | Wob nói ở cảnh hiện tại |
| Mắt, mí | Con ngươi nhìn theo vật, mí hạ khi run, mở to khi giật mình, **chớp chậm tỉnh bơ** sau "On purpose." | Gag mặt |
| Camera | Trôi nhẹ, lia theo hành động, rung khi va chạm, đẩy vào mặt Wob, lao vào hình vẽ | Dẫn mắt người xem |
| Parallax | Tường trôi chậm hơn bàn, bút chì tiền cảnh trôi nhanh hơn | Chiều sâu |
| Hình vẽ "sống dậy" | Khi camera lao vào trang sổ: khói bốc, tuyết rơi trong hình | Chuyển cảnh sang hồi ức |
| Chữ trên đồ vật | Biển "OYMYAKON / pop. ~500" cỡ 40px trên trang sổ | Không còn chữ to giữa màn hình |

### Kết quả

- `hyperframes check` **ĐẠT** (sau khi sửa 4 lỗi kỹ thuật, mục 6). Render 12,6 giây mất 36 giây, tức tập 12 phút khoảng 35 phút, ngang tập 1.
- So với tập 1: [so-sanh/truoc-sau.png](../projects/2026-11-16-oymyakon/ban-thu-thu-vien/so-sanh/truoc-sau.png). Trên: ảnh chụp thật, Wob như sticker ở góc, người que. Dưới: cảnh vẽ, Wob diễn và cầm đồ vật, số liệu nằm trên đồ vật.
- Cổng 6b ("trông như hoạt hình hay bộ slide?"): trong 14 khung đã xem, **Wob ở trong cảnh và đang làm một việc ở 12 khung**; 2 khung cuối là hình vẽ đầy màn hình (chuyển sang hồi ức), vẫn trong ngưỡng "không quá 2 khung" của cổng.
- Còn yếu: cá chênh vênh hơi lâu và che thân Wob; Wob chưa có đi bộ (chỉ nhảy); bàn tay là chấm tròn, chưa cầm nắm thật; chưa thử cảnh hồi ức ngoài trời. Âm lượng −15,7 LUFS (trộn một lượt, bản giao phải về −14).

## 4. T3 · Phông nền vẽ bằng cọ màu nước (p5.brush)

Thư mục `ban-thu-thu-vien/t3-phong-nen-p5brush/` (vẽ) và `t3-parallax/` (clip 6 giây có Wob đi qua).

- p5.brush 3.0.0 (MIT) chạy trên p5.js 2.4.0 (LGPL-2.1, chỉ dùng để vẽ, không sửa thư viện). Có cọ bút, chì, phấn, màu nước loang, gạch bóng, trường hướng "tay run".
- Vẽ phố làng Oymyakon thành **3 lớp**: xa (trời, núi, sương), giữa (nhà gỗ, khói thẳng đứng, cột điện, tuyết chân nhà), gần (bờ tuyết, hàng rào), lớp giữa và gần nền trong suốt. Có seed nên chạy lại ra y hệt. Mất khoảng 30 giây lớp đầu (biên dịch shader WebGL phần mềm), 7–11 giây mỗi lớp sau. Chỉ vẽ một lần mỗi cảnh, không vẽ mỗi khung.
- Ghép trong HyperFrames, lia camera: núi trôi 30px, nhà 120px, hàng rào 260px → có chiều sâu thật.
- **Phong cách**: Wob nét đậm màu phẳng trên nền màu nước nét mảnh **tách lớp rõ, Wob nổi bật**. Đây là cách làm quen thuộc của phim hoạt hình (nền vẽ cọ, nhân vật nét gọn), không bị lệch tông như trộn ảnh chụp, bản đồ phẳng và risograph ở tập 1.
- Lỗi còn lại: lớp gần không đủ rộng cho cú lia 260px (lộ mép trắng góc phải); Wob to ngang nhà (phải chỉnh tỉ lệ bố cục); khói còn hơi đặc.

**So với phông ảnh AI risograph trong định hướng:**

| | Ảnh AI (ChatGPT web Free) | p5.brush vẽ bằng code |
|---|---|---|
| Chi phí, lượt | Hết lượt sau vài ảnh mỗi ngày | 0, không giới hạn |
| Tách lớp parallax | Phải tạo từng lớp trên nền màu phẳng rồi cắt | Có sẵn, nền trong suốt |
| Giữ phong cách qua các tập | Phụ thuộc prompt, mỗi lần một khác | Cùng hàm vẽ, cùng bảng màu |
| Giấy phép, nhãn | Điều khoản ChatGPT, tài khoản riêng, kiểm watermark | MIT, kênh tự tạo, không phải ảnh AI |
| Độ phong phú | Rất chi tiết | Đơn giản hơn; mỗi loại cảnh (làng tuyết, sa mạc, mỏ) phải viết hàm vẽ một lần |

Đề xuất: **lấy p5.brush làm nguồn phông chính**, ảnh AI chỉ dùng khi cần một cảnh rất chi tiết không vẽ nổi bằng code.

## 5. Nâng cấp phong cách dựng: áp vào kênh thế nào

Theo thứ tự nên làm:

1. **Thư viện hoạt hình `templates/_shared/hh/`** gom từ `canh.js`: `kf()` (bảng mốc có easing), `twos()`, rig Wob (thân, ba lô con lắc, tay chân ống cao su, mắt, mí, miệng), camera (trôi, lia, rung, đẩy), nét sôi, hạt giấy, parallax. Mỗi cảnh chỉ còn khai báo "Wob làm gì lúc nào".
2. **Thêm động tác cho Wob**: đi bộ kiểu giải chân (học line-art-animation), chạy, ngã, ngồi, uống, cầm đồ bằng bàn tay có ngón.
3. **Thư viện đạo cụ** vẽ bằng code, cùng nét mực: cá, cốc trà, xe, nhiệt kế, tuần lộc, ngựa, nhà gỗ. Mỗi đạo cụ một hàm, dùng lại qua các tập.
4. **Thư viện phông p5.brush** theo loại địa hình (làng tuyết, sa mạc, núi, biển), có tham số nên mỗi tập vẫn khác.
5. **Vật lý Matter.js** cho gag rơi, đổ, nảy: tính trước thành dữ liệu, giữ được tính chạy lại ra y hệt.
6. **Khối có sẵn của HyperFrames** đáng thử: `torn-paper-rip`, `paper-collage-reveal` (chuyển chương kiểu sổ), `iris-reveal` (đóng cảnh), `hw-arrow` (mũi tên vẽ tay có nét sôi, vẽ đường đi trên bản đồ sổ), `camera-shake`.
7. **Cổng tự kiểm kiểu ClaudeAnimationBase**: mỗi shot một bảng khung hình (bước 0,1–0,15 giây), mỗi động tác chính một dải khung, mỗi khuôn mặt mang chuyện một ảnh cận. Thêm vào cổng 6b.

**Không làm**: đổi sang Remotion; nền tảng "faceless" làm trọn video; tạo Wob bằng AI; vẽ lại Wob kiểu khác (rig chỉ tách và thêm khớp cho đúng tạo hình gốc).

## 6. Lỗi kỹ thuật đã gặp (đã ghi vào `.claude/rules/template-hyperframes.md`)

1. **Không resolve một Promise bằng timeline GSAP**: timeline có hàm `.then()` nên Promise chờ nó chạy hết, mà timeline đang tạm dừng nên chờ mãi, và timeline không bao giờ được đăng ký. Bọc lại: `resolve({ tl })`.
2. Khi biên dịch, HyperFrames chạy `<script src>` **trước** khi khối dữ liệu inline có trong trang: đọc dữ liệu sau `DOMContentLoaded`.
3. Gọi `document.fonts.load()` lúc trang đang dựng có thể treo trong Chrome không giao diện: đăng ký timeline ngay, vẽ lại khi `document.fonts.ready`.
4. Dựng thủ tục: gọi `render(t)` trong `modifiers` của một tween, vì `modifiers` chạy cả khi `seek` tắt callback (`onUpdate` thì không chắc).
5. `mix-blend-mode` làm HyperFrames tắt chế độ chụp nhanh. Bản giao nên thay bằng độ mờ thường để render nhanh hơn.
6. Lint đếm mọi file `.html` có `data-composition-id`: file mẫu đặt đuôi khác (`khung.tpl`).

## 7. Cần người làm kênh quyết

1. **Xem 3 video thử** (đường dẫn ở cuối) và nói phong cách T2 + phông T3 đã đúng hướng "hoạt hình" chưa.
2. **Phông nền**: chuyển sang p5.brush làm nguồn chính (không tốn tiền, không hết lượt) thay cho ảnh AI risograph? Nếu đồng ý thì câu hỏi "khoá Gemini API" trong định hướng mục 9 không còn gấp.
3. Đồng ý bước tiếp theo là **gom thư viện `hh/`** rồi làm bản thử 60s đủ 5 cảnh (thêm 3 cảnh hồi ức ngoài trời trên phông p5.brush)?

## 8. Phần 2 · Năm video TikTok mới người làm kênh gửi

Xem bằng Chrome qua Browser MCP (TikTok chặn tải bằng yt-dlp, bước vượt chặn bị hệ thống từ chối nên không làm), chụp khung theo mốc thời gian, đọc mô tả, rồi tìm và đọc repo được nhắc tới. Ảnh chụp không lưu vào repo.

| # | Video | Là gì | Công cụ thật | Bài học cho kênh |
|---|---|---|---|---|
| 1 | Phổ Cập AI: "Làm video motion chuyên nghiệp cần đúng 5 khâu, 20 repo" (103 giây, 182 tim, 177 lưu) | Danh sách repo theo 5 khâu | Khung: Remotion, HyperFrames · Chuyển động: Anime.js, React Spring, GL Transitions · Đồ hoạ: PixiJS, p5.js, Three.js, OGL · Vật lý: Matter.js, Rapier · Âm thanh, phụ đề: Tone.js, Faster Whisper, OBS | Danh sách gần như trùng với phần 1. **Chính video này mới đáng học**: hoạt hình cắt giấy dựng bằng code, tường chấm bi, đèn rọi hình nón, bảng treo dây, chữ dán như nhãn giấy, mỗi cảnh 4–5 giây, chuyển cảnh lia có nhoè, đổi màu nền theo từng khâu. Đúng hướng T2. (Nhân vật của họ giống phong cách một phim hoạt hình có sẵn: kênh không chép kiểu đó) |
| 2 | Huan.academy: "Video lịch sử hoạt hình người que 2D bằng AI" (107 giây, 845 tim, 512 lưu) | Hướng dẫn quy trình, ví dụ kênh Genius History (18,7 nghìn người đăng ký, 527 nghìn lượt xem/28 ngày) | ChatGPT viết kịch bản có [SCENE] → mỗi cảnh một prompt ảnh ("2D vector cartoon, stick figure style, flat colors, clean bold lines") + prompt chuyển động → **Google Flow** (Nano Banana tạo ảnh, Veo làm chuyển động) → giọng → CapCut | **Đường AI tạo video, không phải thư viện code.** Bằng chứng có cầu cho hoạt hình lịch sử 2D. Không dùng cho Wob (luật thương hiệu, không giữ được Wob giống hệt) |
| 3 | Kiến thức AI: "Claude AI bật mí bí quyết tạo video ngắn triệu view" (13 phút, 3.194 tim, 2.244 lưu) | Kể lại bài của @chrisdadiva trên X: Claude dựng quy trình làm clip kiểu "nhân vật 2D trong thế giới 3D" | **claude-animated-shorts** (mục 9) và bản fork 3D | **Phát hiện quan trọng nhất**, đã thử thành T4 |
| 4 | AI Thú Vị: "Pháp sư Trung Hoa làm repo free" (58 giây, 11.900 tim, 10.500 lưu) | Giới thiệu **vincentwei1021/video-shotcraft** (13.700 sao, Apache-2.0) | Skill Claude Code dựng video quảng cáo sản phẩm bằng Remotion: 124 thẻ công thức cảnh quay trong 10 nhóm, xuất MP4 hoặc bản nháp CapCut/JianYing | Chỉ làm video sản phẩm từ ảnh chụp màn hình, không có nhân vật. Lấy **ý tưởng "thẻ công thức cảnh"**: mỗi kiểu cảnh là một file mô tả + một mẫu chạy được, chọn theo tên |
| 5 | Huan.academy: "Tạo video hoạt hình 2D bằng Claude Code, 14 video → khoảng 6 triệu lượt xem" (62 giây, 4.152 tim, 1.703 lưu) | Quảng cáo plugin riêng của tác giả, bán kèm khoá học | Không công khai | Phong cách: người que trong cảnh phẳng có **ánh sáng điện ảnh** (ô cửa sổ chiều tà, đèn rọi), xen cận cảnh bàn tay, đồ vật. Thêm bằng chứng cầu; không có mã để học |

Nhận định chung: video mới hơn chia làm hai đường. (a) **AI tạo video** (Flow/Veo, ảnh → chuyển động): nhanh nhưng nhân vật không cố định, phụ thuộc nền tảng; không hợp luật Wob. (b) **Claude viết mã dựng từng khung** (Remotion/HyperFrames + three.js): chậm dựng hơn nhưng nhân vật cố định, chạy lại ra y hệt, không tốn tiền theo giây. Kênh đi đường (b), và repo hay nhất của đường (b) hiện nay là claude-animated-shorts.

## 9. claude-animated-shorts: họ làm thế nào

[mromidev/claude-animated-shorts](https://github.com/mromidev/claude-animated-shorts) (MIT, © 2026 Mr omi, khoảng 2.200 sao, commit cuối 1/11/2026). Clip dọc 55–70 giây "nhân vật 2D trong thế giới 3D", bằng three.js trong Remotion, **không dùng mô hình AI video**. Đã tải bản nông về `ban-thu-thu-vien/repo-ngoai/cas/` (36 MB) và đọc `SKILL.md`, `STYLE_BIBLE.md`, `cast.ts`, `ink.ts`, `lensblur.ts`, `story.ts`. Chưa chạy mã của họ.

| Phần | Cách làm |
|---|---|
| Nhân vật | Vẽ bằng Canvas2D (thư viện `Pen` tự viết, đầu hạt đậu, tay que, viền tím than dày ở phía tối, 14 biểu cảm), dán lên **tấm phẳng luôn quay về camera**. Tấm **nhận ánh sáng của cảnh** (không tự phát sáng), có bóng tiếp đất mờ, đổ bóng khi nắng xế. Vẽ ở 4 mức độ phân giải theo khoảng cách. Chớp mắt cách nhau 0,5–2,3 giây, mỗi lần 4 khung, chớp đúng lúc đổi biểu cảm để giấu chỗ đổi |
| Thế giới | three.js: nhà, phố dựng từ khối, kit đồ vật Kenney (CC0) đổi màu, **texture vẽ bằng Canvas2D**, trời bằng shader, sương mù trùng màu chân trời, mặt trời đặt theo camera và đứng yên trong mỗi shot |
| Viền mực | Lượt riêng chỉ cho thế giới: dò chỗ độ sâu nhảy bậc (viền ngoài, chỉ vẽ ở phía gần) và chỗ pháp tuyến gấp góc trên 35–50° (nếp gấp). Nhân vật nằm ở lớp không viền nên không bị viền hình chữ nhật. Viền 5,1 px ở gần, 3,3 px ở xa (khung 1080×1920) |
| Hậu kỳ | Viền mực → mờ ống kính theo độ sâu (chỉ ở cận và trung cảnh, khoảng 1/3 thời lượng, nét ở mắt nhân vật) → bloom chỉ cho vật phát sáng → tone map → chỉnh màu. Tắt hạt phim (làm file nặng gấp 4 mà YouTube nén nát) |
| Camera | Đo từ 20 clip mẫu: khoảng 80% thời gian giữ hình nhưng **giữ hình vẫn đẩy vào 0,15–0,35 %/khung**, 0,6 %/khung ở chữ nhấn. Di chuyển là cú lướt smootherstep 18–40 khung, hầu như không cắt cứng. Va chạm thì rung đổi chiều mỗi khung, tắt trong 7 khung. Nghiêng 4–5°. Vật tiền cảnh ở khoảng 1/3 số shot. Mọi phản ứng hình rơi 0–3 khung **trước** chữ tương ứng |
| Âm thanh | Tự tổng hợp sfx và nhạc bằng Python, giảm nhạc khi có giọng, −14 LUFS |
| Quy trình | (1) **Đo phong cách mẫu thành con số**: 7 báo cáo (chuyển động, chiều sâu, chất liệu, nhân vật, ánh sáng, viền, màu), viết bằng số, không bằng tính từ. (2) Mỗi phần một agent sở hữu một nhóm file, làm trong bản sao riêng. (3) Gộp lại. (4) Một agent chấm độc lập đặt khung hình cạnh khung mẫu, cho điểm từng mặt trên 10, kèm danh sách sửa theo số khung. Lặp 4 vòng: điểm từ 5/3/4/5/4/7/4/6 lên khoảng 7/5–6/5–6/6/5–6/7/6–7/6–7 |
| Kiểm tra | Script dò từng khung đen, trắng, đứng hình (giữ yên ≥ 12 khung bị coi là lỗi), khung giật, âm lượng |

Lưu ý bản quyền: mã và tài liệu MIT; **khung hình mẫu trong `references/` chỉ để nghiên cứu**, không dùng lại. Phong cách họ nhắm là một kênh có thật; kênh mình không chép kiểu đó, chỉ học kỹ thuật. Bản fork [thuann-vn/claude-3d-animated-shorts](https://github.com/thuann-vn/claude-3d-animated-shorts) (MIT) chuyển nhân vật sang 3D có xương (rig Xbot của three.js, đồ đạc Kenney, KayKit, Poly Haven đều CC0); kênh không cần vì Wob phải giữ đúng nét 2D.

## 10. T4 · Wob trong phố Oymyakon 3D

Thư mục `ban-thu-thu-vien/t4-wob-3d/` · video `out/t4.mp4` (8 giây, có tiếng bước tuyết, run, hơi thở, nhạc) · `canh3d.js` khoảng 300 dòng, three.js 0.181 (MIT), chạy trong HyperFrames.

- **Wob vẫn là SVG gốc**: `lanh-run.svg` được đọc bằng DOMParser rồi vẽ lại lên Canvas2D bằng `Path2D` (path, ellipse, circle, rect, vùng cắt), **đồng bộ, không phải chờ tải ảnh**, nên sau này rig T2 (tay ống cao su, mắt, miệng) vẽ lại được mỗi khung ngay trong cảnh 3D.
- Wob là tấm phẳng quay về camera, cao khoảng 1 m (bé hơn cửa sổ, cho thấy nơi này lớn thế nào), nhận ánh sáng mặt trời thấp mùa đông, **đổ bóng dài trên tuyết**, có bóng tiếp đất. Đi lắc lư "on twos", dừng lại thì bẹp rồi dội, sau đó run cầm cập, thở ra mây trắng.
- Phố: 10 nhà gỗ khúc (texture vân gỗ vẽ bằng code, có seed), mái phủ tuyết, cửa sổ sáng ấm, ống khói có cột khói bốc thẳng, cột điện có dây võng, hàng rào tiền cảnh, đồi xa, **sương băng** (sương trùng màu chân trời), vật liệu tô 3 bậc kiểu hoạt hình.
- Hậu kỳ tự viết (học ý của repo, không chép mã): viền mực theo độ sâu và nếp gấp chỉ cho thế giới; mờ ống kính 48 mẫu khi lao vào cận cảnh, nét ở Wob; tone map, viền tối nhẹ.
- Camera theo ngữ pháp đo được: mở bằng hàng rào tiền cảnh, lướt smootherstep 3 giây, giữ hình vẫn đẩy vào 0,25 %/khung, rồi lao ease-out vào cận cảnh với nghiêng 3,5°.
- `hyperframes check` ĐẠT ngay lần đầu (module ES + promise giữ chỗ trong `index.html` chạy được). Render 8 giây mất 46 giây (khoảng 6 lần thời lượng; tập 12 phút khoảng 70 phút).
- Sửa sau lần chụp đầu: mặt trời từ phía sau làm cả con đường chìm trong bóng xám → đổi sang chiếu chếch từ trước bên trái; viền mực mảnh → dày hơn; bờ tuyết tiền cảnh bị cắt mép trông như cục trắng → bỏ; Wob mờ ở cận cảnh → vẽ canvas 2048 px.
- Còn yếu: Wob chưa có tay chân diễn (mới dùng hình tĩnh `lanh-run`); nhà cửa còn đơn giản và sạch quá, thiếu chi tiết bẩn, cũ; màu chưa được đo và chỉnh như quy trình 4 vòng của họ.

**So sánh các hướng đã thử:**

| | T2 cắt giấy 2D (bàn kỷ vật) | T3 phông màu nước p5.brush | T4 tấm phẳng trong thế giới 3D |
|---|---|---|---|
| Hợp cảnh nào | Cảnh "hiện tại" ở bàn, gag gần, nhân vật diễn kỹ | Phông tĩnh có parallax, cảnh mô tả | **Cảnh hồi ức ngoài trời**: đi qua phố, phong cảnh, camera lướt |
| Camera | Phóng, lia trên mặt phẳng | Parallax vài lớp | **Đi thật trong không gian**, thay góc tự do, mờ ống kính thật |
| Ánh sáng, bóng | Vẽ tay | Vẽ sẵn | **Tự có** theo mặt trời, đổi giờ trong ngày bằng một tham số |
| Công dựng mỗi địa điểm | Vẽ từng đạo cụ | Một hàm vẽ cho mỗi loại cảnh | Một bộ khối nhà, địa hình cho mỗi loại địa điểm; dùng lại nhiều góc máy |
| Render | ~3× thời lượng | Vẽ một lần | ~6× thời lượng |

Đề xuất: **phối hợp** đúng như phiên làm hệ đa phong cách đang dựng: bàn kỷ vật dùng T2, hồi ức ngoài trời dùng T4, phông p5.brush làm trời và cảnh xa. Việc tiếp theo có giá trị nhất là **ghép rig Wob của T2 vào tấm phẳng T4** (Path2D đã chứng minh làm được), rồi áp **quy trình đo phong cách thành số + chấm điểm 4 vòng** của claude-animated-shorts vào cổng 6b.

## 11. Đã đúc kết vào công cụ (17/11/2026)

Chia việc với hai phiên đang chạy song song: `world-wobble-08` giữ hệ hoạt hình đa phong cách (`templates/hoat-hinh/`, skill `dung-hoat-hinh`, 4 agent), `world-wobble-e1` giữ phần chấm hạng ảnh AI (`anh_ai`). Phiên này chỉ thêm, sửa từng đoạn, không ghi đè phần của hai phiên kia.

| Khâu | Thay đổi | File |
|---|---|---|
| Nghiên cứu | Bắt buộc mục **Hoạt động và trải nghiệm** (5–8 việc có thật, mỗi việc trả lời một mảnh "vì sao", có khuôn gợi ý), **Chất liệu để vẽ đúng**, **So sánh đời thường** | `skills/nghien-cuu/SKILL.md`, `agents/nghien-cuu-dia-diem.md` |
| Viết kịch bản | Công thức kể chuyện: viết cho hình, nhịp chương 7 bước, **8 khuôn chương** (mỗi khuôn kéo theo một cách dựng), kho gag bằng hình, mở/kết bằng kỷ vật, ngôi thứ nhất, nhịp đọc | `skills/viet-kich-ban/references/cong-thuc-ke-chuyen.md` (mới) |
| | Trường cảnh mới `lop`, `khuon`, `y_hinh` (ý hình + gag cho đạo diễn) | `references/schema.md`, `SKILL.md`, `agents/bien-kich-video.md` |
| | `validate_script.py` thêm `check_ke_chuyen()` (chỉ bật khi có `lop`): ngôi thứ ba, thiếu ngôi thứ nhất, cảnh hồi ức thiếu gag, gag trong chương lịch sử nghiêm (LỖI), < 4 khuôn, hai chương liền cùng khuôn, câu chuyển lặp ≥ 3 cảnh, câu đôi "Luckily/Unluckily" > 1, chương mở trùng khuôn tập trước. Thử: bắt đủ 9 lỗi cài sẵn; kịch bản cũ không đổi kết quả | `scripts/validate_script.py` |
| | Văn phong: Wob kể ngôi thứ nhất, mỗi câu vẽ được, so sánh đời thường, đổi câu chuyển | `rules/van-phong-loi-doc.md` |
| Đạo diễn, dựng | **Thư viện thẻ công thức cảnh** 30 thẻ trong 4 nhóm (Wob diễn, camera, chuyển cảnh, giải thích), mỗi thẻ: dùng khi, nhịp theo khung, camera, âm thanh, hàm thư viện của từng phong cách, mã mẫu, bẫy; bảng khuôn chương → thẻ; luật chống lặp thẻ. Đạo diễn ghi `[id-thẻ]` ở đầu `hanh_dong`, không đổi hợp đồng | `templates/hoat-hinh/_the-canh/` (mới) |
| | **Ngữ pháp camera** bằng số: giữ hình vẫn đẩy vào 0,15–0,35 %/khung, lướt smootherstep 18–40 khung, lao ease-out 8–10 khung, rung đổi chiều tắt trong 7 khung, phản ứng 0–3 khung trước chữ, ~1/3 shot có tiền cảnh, mờ ống kính ~1/3 thời lượng, tự kiểm 5 bước, bẫy dễ đọc nhầm | `_the-canh/NGU-PHAP-CAMERA.md` (mới) |
| | Agent đạo diễn và 3 agent dựng đọc thẻ cảnh, ngữ pháp camera; đạo diễn chọn phong cách và thẻ theo `khuon`, giữ gag của `y_hinh` | `agents/dao-dien-hoat-hinh.md`, `dung-cat-giay.md`, `dung-ve-tay.md`, `dung-diorama.md` |
| Kiểm định | **`kiem_dong_hinh.py`**: đo từng khung: đứng hình (≥ 12 khung cảnh báo, ≥ 24 lỗi), khung đen/trắng, khung giật, số cắt cứng, tỉ lệ khung có chuyển động. Đo thử: T2 97,1%, T4 99,2%, bản phối 60s 91,6% (ĐẠT); tập 1 kiểu trình chiếu KHÔNG ĐẠT (đứng hình tới 71 khung) | `skills/kiem-tra-video/scripts/kiem_dong_hinh.py` (mới), `kiem-tra-video/SKILL.md`, bước 7 `dung-hoat-hinh/SKILL.md` |
| Phản biện | Câu hỏi 9: hoạt hình hay trình chiếu, gag chỉ hình kể được, cách dựng có đổi đủ không | `agents/phan-bien-video.md` |

Chưa làm (cần người làm kênh quyết): biến T4 (Wob trong thế giới 3D) thành phong cách thứ 4 `the-gioi-3d`; ranh giới đã thống nhất với phiên 08 (thư mục `templates/hoat-hinh/the-gioi-3d/`, thêm vào `PHONG_CACH` của `chuan_bi_doan.py`, một dòng luật phối, agent `dung-the-gioi-3d`).

## File

| File | Là gì |
|---|---|
| `ban-thu-thu-vien/t4-wob-3d/out/t4.mp4` | T4, Wob trong phố 3D (có tiếng) |
| `ban-thu-thu-vien/repo-ngoai/cas/` | Bản tải nông claude-animated-shorts để đọc (MIT; khung mẫu chỉ để nghiên cứu) |
| `ban-thu-thu-vien/t1-remotion/out/wob-jump-remotion.mp4`, `t1-hyperframes/out/wob-jump-hyperframes.mp4` | T1, cùng cú nhảy trên hai bộ máy |
| `ban-thu-thu-vien/t2-canh-1/out/canh-1.mp4` | T2, cảnh 1 có tiếng (bản có tiếng); `out/canh-1-hinh.mp4` chỉ hình |
| `ban-thu-thu-vien/t3-parallax/out/parallax.mp4` | T3, phông p5.brush 3 lớp + Wob đi |
| `ban-thu-thu-vien/t3-phong-nen-p5brush/out/lop-*.png`, `ghep.png` | Các lớp phông |
| `ban-thu-thu-vien/so-sanh/` | Ảnh so sánh T1, dải khung T2, trước/sau, parallax |
| `ban-thu-thu-vien/cong-cu/` | Script gỡ lỗi tua timeline và xuất lớp p5.brush |

## Nguồn (tra 16/11/2026)

Trào lưu:
- TikTok: https://www.tiktok.com/@luzzidigital/video/7644299191434349844 ; https://www.tiktok.com/@danyltn/video/7628687650492386582 ; https://www.tiktok.com/@joeurbinati/video/7696164192306416910 ; https://www.tiktok.com/@monixette/video/7620667727610481928 ; https://www.tiktok.com/discover/remotion-claude-code
- Hướng dẫn Claude Code + Remotion: https://www.sabrina.dev/p/claude-just-changed-content-creation-remotion-video ; https://louisedesadeleer.substack.com/p/how-i-make-custom-motion-graphics ; https://adlibrary.com/guides/build-viral-animated-videos-claude-code-remotion
- 36 phong cách motion graphics với Claude: https://mndr.ai/blog/motion-graphics-with-claude/
- Kho skill làm video: https://github.com/zhuyansen/awesome-claude-video-skills

Repo đã đọc **(gốc)**:
- ClaudeAnimationBase (MIT): https://github.com/JohnHeibel/ClaudeAnimationBase ; hướng dẫn: https://raw.githubusercontent.com/JohnHeibel/ClaudeAnimationBase/main/ANIMATION_GUIDE.md
- line-art-animation (MIT): https://github.com/JDhruv14/line-art-animation
- Paper-Cut (MIT, dựng bằng HyperFrames): https://github.com/aijiduonadegou/Paper-Cut
- p5.brush (MIT): https://github.com/acamposuribe/p5.brush
- HyperFrames README: https://raw.githubusercontent.com/heygen-com/hyperframes/main/README.md

Giấy phép:
- Remotion: https://www.remotion.dev/license
- Phiên bản, giấy phép npm (tra bằng `npm view`): matter-js 0.20.0 MIT; p5 2.4.0 LGPL-2.1; p5.brush 3.0.0 MIT; roughjs 4.6.6 MIT; hyperframes mới nhất 0.9.56 (kênh đang ghim 0.8.85)

Phần 2 (tra 16/11/2026):
- 5 video người làm kênh gửi: https://www.tiktok.com/@phocapaivn/video/7708340180054297876 ; https://www.tiktok.com/@huandaotaoyoutube/video/7695780530595319048 ; https://www.tiktok.com/@cunghocainha/video/7704583885060984072 ; https://www.tiktok.com/@ai_thu_vi/video/7701185347778006279 ; https://www.tiktok.com/@huandaotaoyoutube/video/7707275526913707272
- claude-animated-shorts (MIT) **(gốc, đã đọc mã)**: https://github.com/mromidev/claude-animated-shorts ; bài giới thiệu: https://explainx.ai/blog/claude-animated-shorts-remotion-threejs-agent-skill-github-trending-guide-2026 ; https://x.com/RoundtableSpace/status/2117236532482396349
- Bản fork 3D (MIT): https://github.com/thuann-vn/claude-3d-animated-shorts
- video-shotcraft (Apache-2.0): https://github.com/vincentwei1021/video-shotcraft
- three.js 0.181.0 (MIT), tra bằng `npm view three`
