# Công cụ làm hoạt hình đang nổi: nên dùng gì cho World Wobble

> Ngày 16/11/2026. Người làm kênh thấy bản hiện tại khó có người xem, muốn biết các thư viện, công cụ hoạt hình mới nổi.
> Cách làm: tra web cùng ngày (mục Nguồn). Phần lớn nguồn là blog so sánh và trang của nhà bán; chỗ nào đã đọc tận tài liệu gốc thì ghi **(gốc)**. Giá và điều khoản thay đổi nhanh, phải kiểm lại trước khi trả tiền.
> Liên quan: [dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md](dinh-huong-hoat-hinh-ke-chuyen-2026-11-16.md) mục 6 (công cụ), mục 7 (việc phải đổi).

## Tóm tắt

- **Bộ máy dựng video (HyperFrames) không phải chỗ yếu.** Các đối thủ mới nổi (Remotion, Motion Canvas, Revideo, GenMotion) đều là "viết code ra MP4" giống HyperFrames, không cái nào có sẵn nhân vật biết diễn. Đổi sang chúng thì tốn công mà hình không đẹp hơn. HyperFrames còn có sẵn thứ ta chưa dùng: kho khoảng 450 khối (chuyển cảnh, camera, lớp phủ), gói chuyển cảnh shader, và adapter Lottie, Three.js **(gốc)**.
- **Chỗ yếu thật là Wob chưa biết diễn.** Wob hiện là 6 tư thế tĩnh, mỗi tư thế một file SVG, chỉ tách 7 nhóm thô (chân, ba lô, thân, mắt, miệng, tay, phụ). Các kênh hoạt hình kể chuyện được xem nhiều không đẹp nhờ công cụ render mà nhờ **nhân vật diễn**: co giãn, đà, khẩu hình theo lời, biểu cảm đổi nhanh, gag có nhịp.
- **Thứ thật sự mới năm 2026 là AI làm video**: Kling 3.0, Seedance 2.x, Veo 3.1, và mô hình mở Wan 2.2 Animate (Apache 2.0). Hình rất "điện ảnh", nhưng không giữ được Wob giống hệt qua các tập, và luật kênh cấm tạo Wob bằng AI. Chỗ hợp với AI là **làm phông nền chuyển động** (khói, bụi, nước, mây). Wob vẫn vẽ bằng SVG, đặt chồng lên trên.
- **Đề xuất dựng theo 3 lớp:**
  1. Giữ HyperFrames để ghép.
  2. Nâng Wob thành nhân vật có khớp bằng GSAP (giờ miễn phí cả MorphSVG) + Rhubarb Lip Sync (MIT, tự ra khẩu hình từ giọng đọc). Không tốn tiền, Claude tự chạy được, nên làm trong bản thử ~75 giây.
  3. Thử 2–3 clip phông nền bằng Veo 3.1 Lite/Fast hoặc Kling (khoảng 10–30 USD/tập nếu dùng cho khoảng 1/3 thời lượng).
  4. Nếu bản thử vẫn cứng thì mới chuyển rig Wob sang **Rive** (khoảng 9 USD/tháng, cần dựng rig tay một lần).
- **Không đề xuất** các nền tảng làm trọn video kiểu "faceless studio" (Higgsfield, LongStories.ai, StoryAnimator): chúng làm theo khuôn, nhân vật không phải của kênh, đúng loại YouTube gọi là nội dung lặp lại theo khuôn (chính sách 16/7/2026).

## 1. Vì sao bản hiện tại khó có người xem

| Kênh hoạt hình kể chuyện được xem nhiều làm | World Wobble tập 1 làm | Công cụ có giải được không |
|---|---|---|
| Nhân vật diễn: dáng điệu, co giãn, khẩu hình, biểu cảm đổi theo từng câu | Wob đứng góc, đổi giữa 6 hình tĩnh | Có: rig + GSAP, hoặc Rive |
| Gag bằng hình, có nhịp (chờ, bùm, giữ hình) | Gag chỉ nằm trong lời | Một phần: là việc của kịch bản bảng phân cảnh, công cụ chỉ giúp dựng |
| Cảnh có không khí, có lớp gần xa | Ảnh tĩnh trôi chậm | Có: parallax + phông nền AI chuyển động |
| Hoạt hình đơn giản kiểu animatic vẫn đủ | | Không cần hoạt hình từng khung |

Kết luận: **thư viện mới không tự làm video hay lên**. Bước nhảy là từ "trình chiếu" sang "nhân vật diễn". Công cụ chỉ quyết định việc đó rẻ hay đắt, tự động hay phải làm tay.

## 2. Bản đồ công cụ

### 2.1 Bộ máy dựng video bằng code

| Công cụ | Là gì | Giấy phép, giá | Hợp với kênh? |
|---|---|---|---|
| **HyperFrames** (đang dùng, bản 0.8.85) | HTML + GSAP → MP4, chạy được khung nào ra đúng khung đó; có skill cho Claude Code, Studio desktop, kho khoảng 450 khối, chuyển cảnh shader, adapter GSAP, Lottie, Three.js, Anime.js, CSS, WAAPI **(gốc)** | Apache 2.0, không phí render **(gốc)** | **Giữ.** Chưa dùng hết: chuyển cảnh shader, camera, Lottie |
| Remotion | React → MP4; từ tháng 1/2026 có Agent Skills cho Claude Code, bản demo được xem nhiều | Miễn phí cho cá nhân và công ty ≤ 3 người; trên đó 25 USD/người/tháng | Không hơn HyperFrames về nhân vật; đổi thì phải viết lại template |
| Motion Canvas | TypeScript, mạnh về giải thích toán, kỹ thuật, khớp lời đọc | MIT; bản phát hành cuối 12/2024, repo vẫn có commit | Không |
| Revideo | Nhánh của Motion Canvas cho render hàng loạt | MIT; nhóm đang dồn sức cho sản phẩm thương mại Midrender | Không |
| GenMotion | App desktop, agent viết từng cảnh bằng React | Miễn phí, chỉ chạy macOS Apple silicon | Không (máy là Windows) |

### 2.2 Làm nhân vật biết diễn (chỗ quyết định chất lượng)

| Công cụ | Là gì | Giấy phép, giá | Tự động bằng Claude? | Đánh giá |
|---|---|---|---|---|
| **GSAP + MorphSVG** | Biến hình SVG (miệng, mắt, co giãn thân), đường chuyển động, xếp lịch | **Miễn phí cả plugin** từ khi Webflow mua (2025), dùng thương mại được; chỉ cấm dùng để làm công cụ dựng hoạt hình kéo thả cạnh tranh | **Có**, HyperFrames chạy GSAP sẵn | **Làm trước.** Cần tách Wob kỹ hơn: tay, chân trái phải có khớp và điểm xoay, mí mắt, bộ miệng |
| **Rhubarb Lip Sync** | Đọc file giọng, xuất mốc khẩu hình (6 hình cơ bản A–F + 3 hình phụ) ra JSON | **MIT (gốc)** | **Có**, chạy dòng lệnh | **Làm trước.** Wob ở bàn hiện tại mấp máy miệng theo giọng Andrew; kênh storytime nào cũng có |
| **Rive** | Rig xương, biến dạng lưới, máy trạng thái (đi, chạy, ngã… chuyển mượt giữa các trạng thái) | Trình dựng miễn phí, **xuất file và video phải trả tiền**: gói Cadet khoảng 9 USD/người/tháng (nguồn phụ); runtime MIT; xuất MP4, WebM, chuỗi PNG, có xuất máy trạng thái thành video **(gốc)** | Dựng rig phải làm tay trên giao diện một lần; sau đó code điều khiển được. HyperFrames **chưa có adapter Rive**, phải tự viết hoặc xuất video rồi ghép | **Phương án nâng cấp** nếu rig GSAP vẫn cứng |
| Spine | Hoạt hình cắt giấy có xương, lâu đời trong game | Essential 69 USD, Professional 379 USD, mua đứt (nguồn phụ, 7/2026) | Như Rive: rig tay, runtime web | Ngang Rive nhưng đắt hơn, ít hợp video |
| Lottie (lottie-web, dotLottie) | Hoạt hình vector xuất từ After Effects, Lottie Creator | lottie-web MIT; từng file trên LottieFiles có giấy phép riêng | HyperFrames có adapter sẵn **(gốc)** | Dùng cho hiệu ứng nhỏ (tuyết, lửa, lấp lánh), không làm Wob |
| Cartoon Animator 5 (Reallusion) | Phần mềm hoạt hình 2D có rig, khẩu hình, kho chuyển động | Video xuất ra dùng thương mại, bật kiếm tiền YouTube được (diễn đàn Reallusion); giá mua đứt, không rõ giá hiện tại | **Không**, phần mềm desktop làm tay | Phá chế độ tự động; chỉ hợp nếu có người làm hoạt hình |

### 2.3 AI làm video

| Công cụ | Điểm mạnh | Giấy phép, giá | Rủi ro với kênh |
|---|---|---|---|
| **Kling 3.0** | Hay được khen giữ nhân vật qua nhiều cảnh nhờ kho "element" và bảng phân cảnh nhiều cảnh | Gói miễn phí có watermark, **cấm thương mại**; gói trả tiền từ khoảng 7–10 USD/tháng mới cho thương mại; API khoảng 0,084 USD/giây (720p) đến 0,112 USD/giây (1080p) | Vẫn không giữ Wob giống hệt như SVG |
| **Seedance 2.x** (ByteDance) | Nhận nhiều ảnh, video tham chiếu (tới 9 ảnh) | Thương mại khi qua API (fal.ai, BytePlus), tuỳ điều khoản | Như trên |
| **Veo 3.1** (Google) | Chất lượng cao, có bản Lite rẻ | Qua Gemini API được dùng thương mại; Lite 0,05 USD/giây (720p), Fast 0,10–0,12 USD/giây, Standard 0,40 USD/giây (nguồn phụ, đọc bảng giá Google 11/9/2026). Một nguồn nói endpoint Preview tắt 22/10/2026, chưa xác nhận | Khoá `GEMINI_API_KEY` đang thiếu |
| **Wan 2.2 Animate** (Alibaba) | Mô hình mở: lấy một ảnh nhân vật + một video chuyển động → nhân vật làm theo | **Apache 2.0**, chạy máy riêng, 480p/720p | Cần GPU mạnh; có báo cáo nhân vật đổi mặt, giảm chất lượng; chưa ai thử kỹ với nhân vật hoạt hình |
| SCAIL-2 (Z.ai, Thanh Hoa) | Chuyển chuyển động không cần khung xương, người đi bộ điều khiển được chú chó hoạt hình | Apache 2.0 (một nguồn, chưa xác nhận) | Mới, chưa kiểm |
| AniSora (Bilibili), ToonCrafter | Video kiểu anime; ToonCrafter vẽ khung chen giữa hai hình | Giấy phép chưa rõ, bài báo AniSora là CC BY-NC-SA | **Không dùng** cho tới khi đọc được LICENSE gốc |

### 2.4 Nền tảng làm trọn video "faceless"

Higgsfield Faceless Studio (tập 1–5 phút, giữ phong cách qua các tập), LongStories.ai (tới 15 phút qua chat), StoryAnimator (mỗi câu một ảnh AI), Synthesys. **Không dùng**: ra video theo khuôn của nền tảng, nhân vật không phải của kênh, khó khác nhau giữa các tập. YouTube từ 16/7/2026 tách rõ loại "generic or repetitive" không được kiếm tiền.

## 3. Đề xuất: dựng 3 lớp

| Lớp | Công cụ | Việc | Chi phí |
|---|---|---|---|
| Ghép, camera, chuyển cảnh | HyperFrames (giữ), thêm chuyển cảnh shader và khối camera trong kho | Dựng cảnh từ bảng phân cảnh | 0 |
| Wob diễn | SVG tách lại có khớp + GSAP (MorphSVG, đường đi) + Rhubarb Lip Sync | Đi lắc lư, nhảy, ngã, co giãn khi chạm đất, ba lô nảy theo đà, chớp mắt, khẩu hình khi kể ở bàn | 0 |
| Không khí cảnh | Ảnh AI risograph tách lớp (như định hướng) + **clip AI ngắn từ ảnh nền**, không có Wob | Khói bốc từ suối, bụi sa mạc, tuyết rơi, mây trôi; Wob SVG đặt chồng lên | Veo 3.1 Lite: 30% của tập 12 phút ≈ 216 giây × 0,05 USD ≈ 11 USD/tập; tính cả làm lại 2–3 lần thì 20–35 USD |

Vì sao không để AI làm cả Wob: Wob phải giống hệt mọi tập (luật thương hiệu), AI chưa giữ được; tốn tiền theo giây; và cảnh AI toàn bộ dễ bị người xem coi là "AI slop". Phông nền thì không cần giống hệt, nên AI hợp.

**Nhãn AI:** video hoạt hình rõ ràng không thật thì không cần nhãn "altered or synthetic" của YouTube. Theo Nghị định 142/2026, cảnh AI tái hiện một sự kiện có thật vẫn phải gắn nhãn, như luật hiện có.

## 4. Thử thế nào

1. **Bản thử ~75 giây** (đã có trong kế hoạch): dùng lớp Wob mới (rig GSAP + Rhubarb) và 2 clip phông nền AI. Đây là phép thử rẻ nhất cho câu hỏi "có ra hoạt hình không".
2. **Thử riêng phông AI**: lấy 1 ảnh risograph tập 1, cho chạy qua Veo 3.1 Lite và Kling (gói thấp nhất), xem hạt in và nét mực có giữ được không hay bị nhoè, nhấp nháy. Không đạt thì phông chỉ dùng parallax.
3. **Chấm bằng mắt**: chụp 12 khung, hỏi "trông như phim hoạt hình hay bộ slide?" (cổng 6b trong định hướng). Có thể đặt cạnh một khung của kênh storytime lớn để so.
4. Wob vẫn cứng thì mới tính Rive: dựng rig một lần (người làm kênh tự làm hoặc thuê), viết adapter Rive cho HyperFrames, hoặc xuất video có nền trong suốt (chưa xác nhận Rive xuất được kênh trong suốt).

## 5. Cần người làm kênh quyết

1. **Ngân sách clip AI phông nền**: khoảng 10–35 USD/tập (Veo qua Gemini API, cần tạo khoá) hoặc gói Kling trả tiền khoảng 7–10 USD/tháng? Hay chưa chi, chỉ dùng parallax?
2. **Nếu rig GSAP chưa đủ**: chấp nhận Rive khoảng 9 USD/tháng và một lần dựng rig tay không?
3. Bản thử ~75 giây làm theo lớp 3 tầng ở mục 3 luôn chứ?

## Nguồn (tra 16/11/2026)

Bộ máy dựng video:
- HyperFrames README **(gốc)**: https://raw.githubusercontent.com/heygen-com/hyperframes/main/README.md
- So sánh HyperFrames, Remotion, Revideo, Motion Canvas, GenMotion (GenMotion viết, 3/9/2026): https://genmotion.dev/blog/hyperframes-alternatives
- Remotion vs Motion Canvas vs Revideo 2026: https://www.pkgpulse.com/guides/remotion-vs-motion-canvas-vs-revideo-programmatic-video-2026 ; https://rendercomp.com/blog/best-programmatic-video-tools-2026/
- Remotion Agent Skills cho Claude Code: https://www.tella.com/blog/how-to-use-remotion-agent-skills-with-claude-code ; https://www.heyuan110.com/posts/ai/2026-01-26-claude-code-remotion-video/
- Adapter Lottie của HyperFrames: https://vibeindex.ai/skills/heygen-com/hyperframes/lottie

Nhân vật:
- GSAP miễn phí cả plugin: https://webflow.com/blog/gsap-becomes-free ; giấy phép: https://gsap.com/community/standard-license/
- Rhubarb Lip Sync, giấy phép MIT **(gốc)**: https://github.com/DanielSWolf/rhubarb-lip-sync ; https://raw.githubusercontent.com/DanielSWolf/rhubarb-lip-sync/master/LICENSE.md
- Rive xuất video, cần gói trả tiền **(gốc)**: https://rive.app/docs/editor/exporting/exporting-for-video-and-static-design ; giá: https://framer.rive.app/blog/rive-s-new-9-mo-plan ; https://toolradar.com/tools/rive/pricing ; hoạt hình nhân vật: https://rive.app/use-cases/character-animation
- Spine, giá: https://esotericsoftware.com/spine-purchase ; https://www.issoh.co.jp/tech/details/4936/
- Cartoon Animator, quyền thương mại: https://discussions.reallusion.com/t/commercial-rights/14208

AI làm video:
- So sánh Veo 3.1, Kling 3.0, Seedance 2.0: https://www.3daistudio.com/blog/best-ai-video-generator-2026 ; https://www.seeddance.io/blog/best-ai-video-generators-character-consistency-2026 ; https://app.cinevva.com/guides/long-reference-video-models
- Kling giá, thương mại: https://www.atlascloud.ai/blog/tips/kling-ai-pricing ; https://felloai.com/kling-ai-pricing/
- Veo 3.1 giá Gemini API: https://benchlm.ai/media-pricing/veo ; https://the-decoder.com/googles-veo-3-1-lite-cuts-video-generation-costs-by-more-than-half/ ; https://www.layer3labs.io/guides/veo-3-pricing
- Wan 2.2 Animate (Apache 2.0): https://huggingface.co/aiplexdeveloper/Wan2.2-Animate-14B/blob/main/README.md ; https://aiidelist.com/blog/wan2-2-animate-guide ; https://unifically.com/blogs/wan-2.2-animate
- SCAIL-2: https://studio.aifilms.ai/blog/scail-2-character-animation-without-skeleton
- AniSora, ToonCrafter: https://github.com/bilibili/Index-anisora ; https://github.com/ToonCrafter/ToonCrafter

Nền tảng faceless và chính sách:
- https://higgsfield.ai/blog/ai-video-generators-faceless-youtube-2026 ; https://longstories.ai/blog/scriptwriting-faceless-youtube-channels ; https://storyanimator.app/
- YouTube làm rõ chính sách nội dung không xác thực (16/7/2026): https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/ ; https://faceless.my/youtube/youtube-inauthentic-content-policy-faceless-ai-2026/
