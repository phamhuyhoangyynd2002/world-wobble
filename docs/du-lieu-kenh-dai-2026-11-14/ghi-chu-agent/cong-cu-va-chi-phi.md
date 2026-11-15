# Công cụ sản xuất, chi phí, giấy phép thương mại: kênh YouTube video dài hoạt hình AI (EN, JP)

Ngày đọc mọi nguồn: **14/11/2026** (trừ khi ghi khác). Quy ước:
- **[Nguồn Tn]**: thông tin lấy từ trang đã mở được, mã ở cuối file.
- **[Đo]**: số tự đo, có ghi cách đo.
- **Nhận định**: suy luận của người nghiên cứu, không phải dữ kiện.
- **Giả định đầu vào**: tham số thiết kế do nhóm tự chọn (số ảnh, số clip), dùng để tính, đổi được.
- "Không mở được nguồn gốc": chỉ thấy trong đoạn trích tìm kiếm hoặc trang bị chặn (403/404/trang trống), **không dùng** số đó.

Giá đều là giá niêm yết USD (hoặc JPY), chưa gồm thuế VN, phí thẻ, chênh tỷ giá.

---

## 0. Độ dài lời đọc dùng để tính

- Tiếng Anh: đề bài cho ≈ 2.200 từ / video 15 phút. Đổi sang ký tự:
  - **[Đo]** Đếm trên 5 bài Wikipedia tiếng Anh (Ancient Rome, Plate tectonics, Silk Road, Volcano, Great Wall of China; lấy qua API `action=query&prop=extracts&explaintext=1` [T42], bỏ tiêu đề mục): 44.012 từ, 277.301 ký tự (tính cả dấu cách) → **6,3 ký tự/từ**.
  - → 2.200 × 6,3 = **13.860 ký tự / video**. Văn bách khoa thường dùng từ dài hơn lời kể, nên đây là mức trần hợp lý (Nhận định).
- Tiếng Nhật: đề bài cho 4.500–5.000 ký tự; dùng **5.000 ký tự** (mức cao). Google ghi rõ tiếng Nhật tính **mỗi ký tự là 1**, không tính theo byte UTF-8 [T8].

---

## 1. Giọng đọc (TTS)

### 1.1 Bảng giá và giấy phép

| Dịch vụ | Giá niêm yết | Gói miễn phí | Thương mại / YouTube kiếm tiền | Ghi công | Tiếng Nhật |
|---|---|---|---|---|---|
| **Azure AI Speech** | Neural **$15/1 triệu ký tự**; Neural HD **$22/1 triệu ký tự** (meter "S1 Neural Text To Speech Characters", "Neural HD Text to Speech Characters", vùng eastus, API giá bán lẻ của Microsoft) [T5] | F0: 0,5 triệu ký tự/tháng cho Neural [T6] | Trang giá không nói về YouTube. Chưa mở điều khoản sản phẩm (Product Terms) → **chưa tìm thấy** câu chữ chính thức về quyền với file âm thanh | Chưa tìm thấy yêu cầu | Có: ja-JP-NanamiNeural, KeitaNeural, AoiNeural, DaichiNeural, MayuNeural, NaokiNeural, ShioriNeural, MasaruMultilingualNeural; HD: ja-JP-Nanami:DragonHDLatestNeural, ja-JP-Masaru:DragonHDLatestNeural. en-US có nhiều giọng DragonHD (Andrew, Ava, Aria, Adam…) [T7] |
| **Google Cloud TTS** | Chirp 3 HD **$30/1 triệu**; Neural2 $16; WaveNet $4; Standard $4; Studio $160; Instant custom voice $60 [T8]. Gemini TTS tính theo token (vd Gemini 2.5 Pro TTS: $1/1M token chữ vào, $20/1M token âm thanh ra; 25 token/giây âm thanh) [T8] | Chirp 3 HD: 1 triệu ký tự đầu miễn phí; WaveNet/Standard 4 triệu; Neural2 1 triệu [T8] | Điều khoản Gemini API: "Google won't claim ownership" nội dung tạo ra [T20] (áp cho Gemini API; với Cloud TTS **chưa mở** điều khoản riêng) | Chưa tìm thấy | Có (trang giá nhắc ja-JP) [T8] |
| **OpenAI TTS** | tts-1 **$15/1 triệu ký tự**; tts-1-hd **$30/1 triệu ký tự**; gpt-4o-mini-tts $0,60/1M token chữ vào, $12/1M token âm thanh ra (không có giá theo phút) [T9] | Không | **Không mở được** điều khoản sử dụng OpenAI (403) | — | Chưa kiểm |
| | ⚠ **tts-1 và tts-1-hd ngừng ngày 06/01/2027**, thay bằng gpt-realtime-2.1-mini (thông báo 01/10/2026) [T10] | | | | |
| **ElevenLabs** | Starter $6/tháng, 30.000 credit; Creator $22 (tháng đầu $11), 121.000; Pro $99, 600.000; Scale $299, 1.800.000; Business $990, 6.000.000 [T1]. Multilingual v2: **1 credit/ký tự**; Flash: 0,5–1 credit/ký tự (API) [T1]. Eleven v3: không ghi số credit/ký tự [T1][T4] | Free 10.000 credit/tháng, **không có giấy phép thương mại** [T1][T2] | Mọi gói trả phí có giấy phép thương mại, **trừ khi dùng "Beta Services"**; nội dung tạo ngoài thời gian có gói trả phí (trước hoặc sau) **không** được dùng thương mại [T2]. Gói Free "cannot be used for any commercial purpose" [T2] | Gói Free phải ghi "elevenlabs.io" hoặc "11.ai" **trong tiêu đề** [T2]; gói trả phí: chưa thấy yêu cầu | Có: v3 (70+ ngôn ngữ), Multilingual v2 (29), Flash v2.5 (32) đều có tiếng Nhật [T4] |
| **MiniMax Speech** (tham khảo) | speech-2.8-hd $100/1 triệu ký tự; speech-2.8-turbo $60 [T17] | — | Chưa mở điều khoản | — | Chưa kiểm |
| **VOICEVOX** (phần mềm) | Miễn phí | — | Phần mềm: "商用・非商用問わず利用することができます", nhưng âm thanh phải theo **quy định của từng thư viện giọng (nhân vật)** [T11][T12] | Bắt buộc ghi công cho biết đã dùng VOICEVOX [T11] | Chỉ tiếng Nhật |
| VOICEVOX: **ずんだもん, 四国めたん** (dự án 東北ずん子) | Miễn phí khi ghi công; **không ghi công: 400.000 yên (chưa thuế) mỗi nhân vật** [T13] | — | "商用、非商用ともにご利用いただけます" [T13]. Cấm: trái thuần phong mỹ tục, **hoạt động chính trị/tôn giáo** (kể cả chỉ trích/ủng hộ người, nhóm cụ thể), 情報商材, nội dung **cố ý sai/gây hiểu lầm**, ngành giải trí người lớn, thế lực phản xã hội [T13] | **Bắt buộc**, ví dụ "VOICEVOX:ずんだもん"; với video: đặt ở chỗ người xem thấy (mô tả hoặc credit trên hình) [T13]. Trang sản phẩm 四国めたん dẫn tới cùng điều khoản zunko.jp/con_ongen_kiyaku.html [T12] | — |
| VOICEVOX: nhân vật khác (ví dụ) | — | — | **Khác nhau theo nhân vật**: 青山龍星, 後鬼: cá nhân dùng thương mại được, nhưng **"企業が携わる形"** phải hỏi trước; もち子: thương mại được trừ tác phẩm âm thanh, tư liệu âm thanh, game; **No.7, ユーレイちゃん: chỉ phi thương mại** (thu nhập đồng nhân/stream được), thương mại khác phải hỏi trước; Voidoll: pháp nhân phải hỏi riêng [T12] | "VOICEVOX:<tên>" [T12] | — |
| **AquesTalk** (SofTalk, ゆっくりMovieMaker, AquesTalkPlayer) | "使用ライセンス（商用コンテンツ向け）" **6.380 yên (gồm thuế)/năm/máy**, số video không giới hạn [T15] | Miễn phí chỉ khi cá nhân, sở thích, không quảng cáo, không chương trình kiếm tiền [T15] | **Bật kiếm tiền YouTube → bắt buộc mua**; công ty, nhóm, trường dùng → bắt buộc (dù không công khai); phải mua **trước khi bật quảng cáo**, không tính lùi ngày [T15]. Cá nhân vì lợi nhuận coi như pháp nhân [T14]. Âm thanh tạo ra được công bố, bán; **cấm dùng làm dữ liệu huấn luyện AI** [T14] | Ghi ID giấy phép trong mô tả là tuỳ chọn [T15] | Chỉ tiếng Nhật |
| | ⚠ Giấy chứng nhận giấy phép **gửi bưu điện, "海外発送は不可"** (không gửi ra nước ngoài) [T15] | | | | |
| **CoeFont** | Standard: 3.300 yên/tháng 6 tháng đầu, sau đó 4.400 yên/tháng (gồm thuế), gồm 1.000.000 ký tự/tháng, vượt 0,05 yên/ký tự; Plus 55.000 yên/tháng (có API) [T16] | Free: "personal and non-commercial use" [T16] | Gói trả phí có cho thương mại, kiếm tiền YouTube không: **chưa tìm thấy** trong nguồn đã mở (trang giá coefont.cloud/pricing 404) | Chưa tìm thấy | Có (Nhật, Anh, Trung) [T16] |

### 1.2 Chi phí giọng / video (chỉ tính phí dùng, bỏ qua gói miễn phí)

Công thức: chi phí = số ký tự × giá / 1.000.000. EN = 13.860 ký tự, JP = 5.000 ký tự.

| Dịch vụ | EN (13.860 ký tự) | JP (5.000 ký tự) |
|---|---|---|
| Azure Neural ($15) | 13.860 × 15 / 1e6 = **$0,21** | 5.000 × 15 / 1e6 = **$0,075** |
| Azure Neural HD ($22) | **$0,31** | **$0,11** |
| Google Chirp 3 HD ($30) | **$0,42** | **$0,15** |
| Google Neural2 ($16) | $0,22 | $0,08 |
| Google WaveNet ($4) | $0,055 | $0,02 |
| OpenAI tts-1 / tts-1-hd ($15 / $30) | $0,21 / $0,42 (ngừng 06/01/2027) | $0,075 / $0,15 |
| MiniMax speech-2.8-hd ($100) | $1,39 | $0,50 |
| ElevenLabs Creator ($22 / 121.000 credit, Multilingual v2 = 1 credit/ký tự) | 22 × 13.860 / 121.000 = **$2,52** (đủ 8,7 video/tháng) | 22 × 5.000 / 121.000 = **$0,91** (24 video/tháng) |
| ElevenLabs Pro ($99 / 600.000) | $2,29 (43 video/tháng) | $0,82 (120 video/tháng) |
| ElevenLabs Starter ($6 / 30.000) | $2,77 (2,16 video/tháng) | $1,00 (6 video/tháng) |
| VOICEVOX ずんだもん / 四国めたん | — | **$0** (bắt buộc ghi "VOICEVOX:ずんだもん"; muốn bỏ ghi công: 400.000 yên + thuế mỗi nhân vật, một lần [T13]) |
| AquesTalk | — | 6.380 yên/năm/máy, không theo video |
| CoeFont Standard | — | Phí cố định 4.400 yên/tháng cho 1.000.000 ký tự = 200 video JP/tháng; chia ra 22 yên/video nếu dùng hết hạn mức (quyền thương mại chưa xác nhận) |

ElevenLabs tính theo gói tháng: số trên đúng khi dùng hết credit trong tháng.

**Nhận định**
- Tiếng Anh: **Azure Neural HD** ($0,31/video) là lựa chọn rẻ, nhóm đã có hạ tầng Azure. ElevenLabs đắt hơn khoảng 8 lần nhưng nhiều giọng kể chuyện biểu cảm hơn; đáng thử mù (blind test) trên 1–2 video. Không xây trên OpenAI tts-1 vì sắp ngừng.
- Tiếng Nhật: **VOICEVOX ずんだもん / 四国めたん** miễn phí và quen với khán giả Nhật (kiểu 解説動画), nhưng **cấm nội dung chính trị, tôn giáo** và **nội dung cố ý gây hiểu lầm**. Kênh lịch sử, địa lý dễ chạm chủ đề chính trị (biên giới, chiến tranh), nên phải lọc chủ đề. Nếu sau này thành lập công ty, phải kiểm tra lại từng nhân vật vì nhiều nhân vật yêu cầu hỏi trước khi "企業が携わる". Phương án chính thống không ràng buộc nhân vật: Azure ja-JP Nanami/Masaru DragonHD.
- **AquesTalk (giọng ゆっくり): không khuyến nghị** cho nhóm ở Việt Nam, vì giấy phép gửi bưu điện không ship quốc tế, và nhóm bị tính là dùng cho tổ chức.

---

## 2. Hình và hoạt ảnh AI

### 2.1 Tạo ảnh (nhân vật nhất quán, cảnh minh hoạ 2D)

| Công cụ | Giá [Nguồn] | Quyền với output | Ghi chú |
|---|---|---|---|
| **Gemini image (Nano Banana)**, Gemini API | Nano Banana 2.1: **$0,0336/ảnh 1K, $0,0504/ảnh 2K**, $0,113/ảnh 4K; Batch bằng nửa giá ($0,0168 / $0,0252 / $0,0567). Gemini 3.1 Flash Image (Nano Banana 2): $0,045 (0,5K) / $0,067 (1K) / $0,101 (2K) / $0,151 (4K). Gemini 3 Pro Image (Nano Banana Pro): $0,134 (1K/2K), $0,24 (4K). Gemini 2.5 Flash Image $0,039, ngừng 15/03/2027 [T18] | "Google won't claim ownership" và có thể tạo nội dung giống hệt cho người khác; gói không trả phí: dữ liệu dùng để cải thiện sản phẩm, người duyệt có thể đọc input/output [T20] | Có giá cho **ảnh đầu vào** [T18], nên đưa được ảnh tham chiếu nhân vật vào prompt. Imagen 4 (standard/ultra/fast) **đã ngừng 17/08/2026** [T19] |
| **OpenAI GPT Image** | Bảng "Historical output costs": GPT-Image-2 medium $0,041 (1536×1024), high $0,165; gpt-image-1-mini medium $0,015, high $0,052 (1536×1024); GPT Image 1.5 medium $0,05 [T21]. Model mới (gpt-image-2.5/2.6 sunburst/flare) tính $30/1M token ảnh ra, không có giá theo ảnh [T9][T21] | **Không mở được** điều khoản OpenAI (403) | gpt-image-1 **ngừng 23/10/2026** [T10] |
| **Midjourney** | **Không mở được nguồn gốc** (docs.midjourney.com trả 403) | Không mở được | Không dùng số liệu từ bên thứ ba |
| Ảnh trong Pika (bán lại) | Nano Banana 2.1 1 ảnh 1K = 5 credit; GPT Image 2.6 1 ảnh 1K = 4 credit [T25] | Xem Pika ở 2.2 | — |

**Nhận định về "nhân vật nhất quán"**: chưa tìm thấy nguồn chính thức đo độ nhất quán nhân vật của từng model. Cách chắc chắn cho kênh hoạt hình 2D vui nhộn là **tạo nhân vật một lần** (ảnh mẫu, character sheet), tách thành các bộ phận (đầu, thân, tay, miệng, mắt) hoặc vẽ lại bằng SVG, rồi **cho cử động bằng code** (GSAP trong HyperFrames, Rive hoặc Lottie). Nhân vật luôn giống nhau vì là cùng một file, không phải sinh lại mỗi cảnh. Ảnh AI chỉ dùng cho **nền và cảnh minh hoạ**, đưa ảnh nhân vật làm tham chiếu khi cần cảnh có nhân vật.

### 2.2 Ảnh thành video (image-to-video)

| Công cụ | Giá [Nguồn] | Thương mại / quyền | Ghi chú |
|---|---|---|---|
| **Google Veo** (Gemini API) | — | — | **veo-3.1-generate-preview, veo-3.1-fast, veo-3.1-lite đã ngừng trên Gemini API ngày 22/10/2026**; chuyển sang Gemini Omni Flash hoặc Veo bản GA trên Gemini Enterprise Agent Platform [T19]. Giá Veo GA trên nền tảng doanh nghiệp: **chưa tìm thấy** (chưa mở) |
| **Gemini Omni 1.2 Flash** (Gemini API, thay Veo) | $12/1M token video ra; **≈ $0,07/giây 720p**, $0,023/giây 360p, $0,104/giây 1080p (upsampling), $0,209/giây 4K; clip tối đa 15 giây, có âm thanh [T18] | Như Gemini API [T20] | Trang giá ghi "video generation and editing"; khả năng **ảnh → video** chưa xác nhận trong nguồn đã mở |
| **MiniMax / Hailuo** (API) | MiniMax-H3 768P $0,08/giây, 2K $0,13/giây; H3-Lite 768P $0,04/giây, 480P $0,025/giây; Hailuo-2.3-Fast 768P **$0,19/clip 6 giây**, $0,32/clip 10 giây; Hailuo-2.3 768P $0,28/6 giây; 1080P $0,49/6 giây [T17] | Chưa mở điều khoản | Trang web cho người dùng (hailuoai.video) không hiện giá |
| **Runway** | Free $0 (125 credit một lần); Standard $15/tháng ($12 theo năm), 625 credit; Pro $35 ($28), 2.250; Max $95 ($76), 9.500. Gen-4.5: **12 credit/giây**; Aleph 2.0: 28 credit/giây; Kling 4.0 1080p: 118 credit/5 giây; Seedance 2.0 Pro 1080p: 160 credit/4 giây [T22] | "does not claim ownership of any of your Inputs or Outputs" và "does not restrict your commercial use" (mục 4.4, cập nhật 23/10/2026); Runway được dùng input/output để huấn luyện AI [T23]. Gói Free có watermark hay không: trang giá không nói; "No watermarks" chỉ ghi từ gói Standard [T22] | — |
| **Luma Dream Machine** | Plus $30/tháng ($25 theo năm), 10.000 credit, "Commercial use"; Pro $90 ($75), 40.000; Ultra $300 ($250), 150.000. Ray3.2: 720p **100 credit/5 giây**, 1080p 400 credit/5 giây [T24] | Thương mại từ gói Plus trở lên [T24] | Không thấy gói miễn phí trên trang |
| **Pika** | Free $0 (0 credit, chỉ mua gói credit); Starter $10 ($8), 600 credit; Creator $35 ($28), 2.600; Fancy từ $95 ($76), 8.550+. Pika 2.5 720p 20 credit/5 giây; Kling 4.0 1080p 118; Seedance 2.5 720p 122 [T25] | **Free: không có giấy phép thương mại**; trả phí: có [T25] | Không watermark ở mọi gói [T25] |
| **Kling** (giá gốc của Kuaishou) | **Không mở được nguồn gốc** (trang thành viên trả về trống). Chỉ có giá Kling qua bên bán lại: Runway, Pika ở trên | — | — |
| **OpenAI Sora** | — | — | **Videos API, sora-2, sora-2-pro đã ngừng 24/09/2026, không có model thay thế** [T10] |

### 2.3 Hoạt ảnh 2D cắt rời (cut-out), rig, điều khiển bằng code

| Công cụ | Giá, giấy phép [Nguồn] | Tự động hoá bằng code |
|---|---|---|
| **Lottie (lottie-web)** | MIT [T34] | Thư viện JS phát animation; không hỗ trợ ảnh chuỗi, video, âm thanh trong file AE [T34]. Nhận định: chạy được trong trang HTML của HyperFrames |
| **Rive** | Free $0 (xuất có màn splash Rive); Cadet $9; Voyager $32; Enterprise $120 (USD/ghế/tháng; trang không tách giá tháng và năm) [T29]. Runtime chính thức **MIT** [T30] | Có runtime Web (JS: canvas, webgl2, canvas-lite) [T30]. Điều khiển state machine bằng code trên web: trang đã mở **chưa xác nhận**. Xuất MP4 theo gói: chưa xác nhận [T29] |
| **Spine** | Essential $69 (giá gốc $99), Professional $379 ($449), Enterprise $2.499 + $379/người/năm; **doanh nghiệp doanh thu > $500.000/năm bắt buộc Enterprise** [T28] | Có runtime tích hợp vào phần mềm [T28]; CLI xuất tự động: trang mua không nhắc (**chưa tìm thấy**) |
| **Live2D Cubism** | Giá PRO tách hai mức: người dùng thường, doanh nghiệp nhỏ (doanh thu năm gần nhất **dưới 10 triệu yên**) và doanh nghiệp vừa, lớn [T32]; số tiền: **chưa tìm thấy** (trang giá 404). SDK: cá nhân và doanh nghiệp nhỏ được miễn giấy phép phát hành và phí (trừ Expandable Application); video tạo bằng công cụ có Cubism SDK thuộc diện Plan C "Running Royalty" với doanh nghiệp phải ký [T31] | Có SDK (Cubism SDK) [T31] |
| **Adobe Character Animator** | Bản Starter miễn phí; bản đầy đủ nằm trong Creative Cloud Pro (trang mở được hiện giá AUD theo vùng, không dùng) [T33] | Không thấy API scripting; chỉ có trigger gán phím [T33] |

**Nhận định**: nhóm đã có HyperFrames (HTML/GSAP). Cách ít ràng buộc giấy phép nhất là **nhân vật SVG/PNG tách bộ phận + GSAP** (không phí, không giấy phép bên thứ ba). Rive hoặc Lottie (MIT) dùng khi cần animation phức tạp làm sẵn. Spine và Live2D có ngưỡng doanh thu, phải theo dõi khi kênh lớn.

### 2.4 Bản quyền ảnh, video AI

**Mỹ: US Copyright Office, "Copyright and Artificial Intelligence, Part 2: Copyrightability", tháng 01/2025** [T26]. Kết luận (trích phần tóm tắt):
- "Copyright does not extend to purely AI-generated material, or material where there is insufficient human control over the expressive elements."
- "Based on the functioning of current generally available technology, prompts do not alone provide sufficient control."
- Con người được bảo hộ phần biểu đạt của mình còn thấy được trong output, cùng **việc lựa chọn, sắp xếp sáng tạo** và **chỉnh sửa sáng tạo** output; xét từng trường hợp.
- Dùng AI để hỗ trợ (không thay thế) sáng tạo của con người thì không ảnh hưởng tới việc được bảo hộ.

**Nhật: 文化審議会著作権分科会法制度小委員会「AIと著作権に関する考え方について」 (15/03/2024; bản tóm tắt tiếng Anh của Japan Copyright Office, 05/2024)** [T27]:
- Nội dung AI tự sinh, không có chỉ dẫn hoặc chỉ có prompt đơn giản ("Draw a cat") **không phải tác phẩm**. Khi con người dùng AI như "công cụ", có "ý định sáng tạo" và "đóng góp sáng tạo", thì là tác phẩm, người dùng là tác giả.
- Yếu tố xét: chỉ dẫn chi tiết, cụ thể về biểu đạt thì dễ được tính; **prompt dài nhưng chỉ nêu ý tưởng thì không**; số lần thử nhiều không tự thành đóng góp, nhưng thử lặp lại kèm kiểm tra và sửa chỉ dẫn có thể được tính; việc chọn lựa đơn thuần không được tính; phần con người thêm, sửa có tính sáng tạo thường là tác phẩm.
- Vi phạm: ảnh AI đăng mạng xã hội hoặc bán bị xét như vi phạm thường, cần **"類似性" (giống phần biểu đạt sáng tạo) và "依拠性" (dựa vào tác phẩm có trước)**. Nếu tác phẩm đã nằm trong dữ liệu huấn luyện thì thường bị suy đoán có 依拠性, kể cả khi người dùng không biết. Chủ quyền có thể yêu cầu dừng, huỷ ảnh vi phạm.
- Bản đầy đủ tiếng Nhật: https://www.bunka.go.jp/seisaku/bunkashingikai/chosakuken/pdf/94037901_01.pdf (chưa đọc toàn văn; ý trên lấy từ bản tóm tắt tiếng Anh đã mở).

**Nhận định**: ảnh, clip AI thuần gần như **không có bản quyền** ở Mỹ và Nhật, nên người khác có thể chép lại; Google còn ghi rõ có thể tạo nội dung giống hệt cho người khác [T20]. Giá trị được bảo hộ của kênh nằm ở **kịch bản, cách chọn và dựng, nhân vật đã chỉnh sửa bởi người, đồ hoạ bằng code**. Rủi ro ngược: prompt kiểu "theo phong cách <hãng>" hoặc nhân vật giống nhân vật có sẵn có thể vi phạm theo 類似性 + 依拠性.

---

## 3. Pipeline mẫu được công bố (nguồn tự công bố)

| Nguồn | Nội dung | Loại |
|---|---|---|
| Johnny Harris, "How I Make My Maps", 11/12/2020 [T36] | Bản đồ: Adobe After Effects + plugin **GeoLayers** (trả phí); thiết kế kiểu bản đồ riêng trong **Mapbox Studio** rồi đưa vào GeoLayers; trước đó dùng bản đồ thế giới nhiều lớp trong Adobe Illustrator; canh thời gian trong Premiere | Tự công bố bởi nhà sáng tạo (kênh có mặt người, không phải kênh AI) |
| OverseerOS blog, 02/07/2026 [T37] | Nêu khung chi phí "Lean AI-assisted $10–75/video", "Solid faceless long-form $75–300/video", "Premium documentary $300–1.500+/video". Không nêu công cụ cụ thể cho giọng, bản đồ, nhân vật | **Nhà bán công cụ tự công bố, không có căn cứ**, không dùng làm số liệu |
| Bài hướng dẫn trên fluxnote.io, atlabs.ai, aescripts.com… | Chỉ thấy trong đoạn trích tìm kiếm (nhắc GeoLayers cho RealLifeLore, Mapimator, QGIS + DaVinci Resolve) | **Không mở được nguồn gốc** (aescripts 403) hoặc chưa mở; không dùng |
| Stick-figure, minh hoạ lịch sử kiểu kênh AI | **Chưa tìm thấy** case study tự công bố mở được | — |

Dữ liệu bản đồ dùng được bằng code:
- **Natural Earth**: dữ liệu raster và vector "in the public domain", dùng thương mại, "Crediting the authors is unnecessary"; lưu ý một số dữ liệu bên thứ ba bên trong chỉ cho dùng để làm bản đồ nền [T35].
- Mapbox: giá, điều khoản cho video **chưa mở**; chỉ thấy trong trích tìm kiếm rằng dữ liệu OpenStreetMap cần ghi công. Không dùng.

**Nhận định**: với HyperFrames, vẽ bản đồ động bằng **D3 / SVG + dữ liệu Natural Earth** (public domain) là cách không phí bản quyền, không phụ thuộc After Effects. Lưu ý bản đồ có ranh giới tranh chấp (luật VN với "đường lưỡi bò" theo quy tắc hiện có của dự án; với khán giả Nhật: Takeshima/Senkaku/Lãnh thổ phương Bắc). Cách hiển thị ranh giới phải do nhóm quyết định.

---

## 4. Nhạc nền, sfx

| Nguồn | Điều khoản [Nguồn] |
|---|---|
| **YouTube Audio Library** | Thành viên YouTube Partner Program được kiếm tiền với nhạc, sfx trong thư viện; bài tải về "won't be claimed … through the Content ID system"; bài giấy phép Creative Commons **phải ghi công** trong mô tả; dùng ngoài YouTube: trang không nói [T39] |
| **Epidemic Sound** | Có các gói Creator, Pro, Business, Enterprise; giá: **không đọc được** (trang hiển thị giá bằng JS). Royalty-free, không phí thêm khi đăng hoặc kiếm tiền; nội dung đăng trong lúc dùng thử hoặc có gói **vẫn được bảo vệ sau khi huỷ**; quảng cáo trả tiền cần gói Pro/Enterprise [T38] |
| **Artlist** | **Không mở được nguồn gốc** (403) |
| **OpenTracks (trước là DOVA-SYNDROME, đổi tên 15/09/2026)** | Thương mại và phi thương mại, cá nhân và pháp nhân; YouTube là mục đích dùng nhạc nền được phép; **không cần ghi công** ("著作権表示・提供等の表示は不要です"); cấm đăng ký Content ID và hệ thống nhận dạng tương tự, cấm đăng ký JASRAC, cấm nội dung chính trị, tôn giáo, tư tưởng, cấm video mà nhạc là nội dung chính (作業用BGM), cấm dùng để huấn luyện AI; tác giả có thể đặt thêm điều kiện riêng [T40] |
| **甘茶の音楽工房** | "商用利用、個人利用問わず利用できます"; ghi công **không bắt buộc**; không được đăng ký video dùng nhạc này vào Content ID; cấm bán, phân phối lại riêng nhạc; cấm đăng ký JASRAC [T41] |

**Nhận định**: kênh mới, ngân sách thấp → YouTube Audio Library (chỉ đăng YouTube) + OpenTracks / 甘茶 cho bản tiếng Nhật, mỗi file ghi sổ giấy phép như quy trình hiện có của dự án. Lưu ý OpenTracks cấm nội dung chính trị, tôn giáo, tư tưởng: cùng loại rủi ro như VOICEVOX với chủ đề lịch sử.

---

## 5. Ước chi phí một video 15 phút

**Giả định đầu vào** (nhóm tự chọn, đổi được):
- Cấp (a): **120 ảnh** (đổi hình trung bình 7,5 giây), mỗi ảnh sinh **2 lần** để chọn, tổng 240 lượt sinh.
- Cấp (b): thêm **240 giây clip ảnh → video** (khoảng 27% thời lượng), tương đương 48 clip 5 giây hoặc 40 clip 6 giây, chưa tính sinh lại.
- Không tính: máy render (chạy máy nhà), thời gian người, Claude API viết kịch bản (ngoài phạm vi), thuế, phí thanh toán.
- Nhạc: YouTube Audio Library / OpenTracks / 甘茶 = $0.

### Cấp (a): ảnh tĩnh AI + chuyển động bằng code + TTS

| Hạng mục | Phép tính | EN | JP |
|---|---|---|---|
| Ảnh: Nano Banana 2.1 1K, Batch | 240 × $0,0168 [T18] | $4,03 | $4,03 |
| Ảnh: Nano Banana 2.1 2K, Standard (phương án nét hơn) | 240 × $0,0504 [T18] | ($12,10) | ($12,10) |
| Giọng: Azure Neural HD | EN 13.860 × 22/1e6; JP 5.000 × 22/1e6 [T5] | $0,31 | $0,11 |
| Giọng: VOICEVOX (JP) | miễn phí, ghi công [T13] | — | ($0) |
| Bản đồ, nhân vật cut-out, pan/zoom | code (GSAP, D3, Natural Earth) [T34][T35] | $0 | $0 |
| **Tổng (ảnh 1K batch + Azure HD)** | | **≈ $4,34** | **≈ $4,14** (VOICEVOX: $4,03) |
| Tổng nếu ảnh 2K standard + ElevenLabs Creator | $12,10 + $2,52 / + $0,91 [T1] | ≈ $14,62 | ≈ $13,01 |

### Cấp (b): cấp (a) + 240 giây image-to-video

| Công cụ clip | Phép tính | Chi phí clip | Tổng EN (a rẻ + clip) |
|---|---|---|---|
| Hailuo-2.3-Fast 768P (API) | 40 clip × $0,19 [T17] | $7,60 | ≈ $11,94 |
| MiniMax-H3-Lite 768P | 240 × $0,04 [T17] | $9,60 | ≈ $13,94 |
| Gemini Omni 1.2 Flash 720p | 240 × $0,07 [T18] (i2v chưa xác nhận) | $16,80 | ≈ $21,14 |
| Gemini Omni 1.2 Flash 1080p | 240 × $0,104 [T18] | $24,96 | ≈ $29,30 |
| Luma Ray3.2 720p, gói Plus | 48 × 100 credit = 4.800 credit; $30/10.000 credit → 4.800 × 0,003 [T24] | $14,40 | ≈ $18,74 |
| Luma Ray3.2 1080p, gói Pro | 48 × 400 = 19.200 credit; $90/40.000 → 19.200 × 0,00225 [T24] | $43,20 | ≈ $47,54 |
| Runway Gen-4.5, gói Max | 240 × 12 = 2.880 credit; $95/9.500 → 2.880 × 0,01 [T22] | $28,80 | ≈ $33,14 |
| Pika (Kling 4.0 1080p), gói Fancy | 48 × 118 = 5.664 credit; $95/8.550 → 5.664 × 0,01111 [T25] | $62,93 | ≈ $67,27 |

Bản JP: trừ $0,20 phần giọng so với EN (Azure HD).

Lưu ý tính theo gói tháng (Luma, Runway, Pika): số trên đúng khi dùng hết credit trong tháng; gói nhỏ không đủ credit cho 1 video (Runway Standard 625 credit < 2.880; Pika Creator 2.600 < 5.664). Clip AI thường phải sinh lại nhiều lần; tỉ lệ sinh lại **chưa có số đo**, cần đo trên 1–2 video thử.

**Nhận định**: chi phí công cụ mỗi video dao động khoảng **$4–15 (cấp a)** và **$12–70 (cấp b)**. Chi phí lớn nhất là clip video, và clip video cũng là phần khó đồng nhất với nhân vật cut-out. Với phong cách hoạt hình 2D vui nhộn, cấp (a) đủ dùng; chỉ thêm vài clip i2v cho khoảnh khắc "wow".

---

## 6. Rủi ro giấy phép (tổng hợp)

1. **ElevenLabs**: âm thanh tạo khi chưa có hoặc đã hết gói trả phí không được dùng thương mại; "Beta Services" không có giấy phép thương mại [T2]. Phải giữ gói suốt thời gian sản xuất.
2. **VOICEVOX**: bắt buộc ghi credit; điều khoản khác nhau theo từng nhân vật; ずんだもん/めたん cấm nội dung chính trị, tôn giáo, cố ý sai lệch [T13]; nhiều nhân vật yêu cầu hỏi trước khi doanh nghiệp tham gia [T12].
3. **AquesTalk**: kiếm tiền hoặc dùng theo nhóm thì bắt buộc mua; giấy phép gửi bưu điện, không ship ra nước ngoài [T15].
4. **Model bị khai tử**: Veo 3.1 preview (22/10/2026), Imagen 4 (17/08/2026), Sora API (24/09/2026), gpt-image-1 (23/10/2026), tts-1 (06/01/2027) [T10][T19]. Pipeline phải đổi model dễ dàng (tách lớp "nhà cung cấp").
5. **Ảnh, video AI không có bản quyền** khi chỉ dùng prompt (Mỹ, Nhật) [T26][T27]; output có thể trùng với người khác [T20]; prompt bắt chước phong cách, nhân vật có sẵn có thể vi phạm [T27].
6. **Runway** được dùng input/output của mình để huấn luyện AI [T23]; Gemini API gói miễn phí: dữ liệu dùng cải thiện sản phẩm, có người duyệt [T20].
7. **Spine** bắt buộc bản Enterprise khi doanh thu > $500.000/năm [T28]; **Live2D** tách giá theo ngưỡng 10 triệu yên [T32].
8. **Nhạc**: OpenTracks và 甘茶 cấm đăng ký Content ID; OpenTracks cấm nội dung chính trị, tôn giáo, tư tưởng [T40][T41]; YouTube Audio Library chưa rõ có dùng được ngoài YouTube [T39].

## 7. Chưa tìm thấy, không mở được

- Midjourney: giá, điều khoản (403).
- OpenAI: điều khoản sử dụng, quyền sở hữu output (403).
- Kling: giá chính thức (trang trống); chỉ có giá bán lại qua Runway, Pika.
- Hailuo: trang giá người dùng (trống); chỉ có giá API MiniMax.
- Artlist (403); giá Epidemic Sound (không render được).
- Azure: câu chữ chính thức về quyền dùng âm thanh TTS cho YouTube (chưa mở Product Terms).
- CoeFont: gói trả phí có cho thương mại, YouTube không.
- Live2D: số tiền gói PRO. Spine: CLI xuất tự động. Rive: xuất MP4 theo gói, điều khiển state machine trên web.
- Veo GA trên Gemini Enterprise Agent Platform: giá. Gemini Omni: có hỗ trợ ảnh → video không.
- GeoLayers: giá (aescripts 403). Mapbox: điều khoản cho video.
- Case study stick-figure / kênh AI lịch sử tự công bố có số liệu thật.
- Tỉ lệ sinh lại thực tế của ảnh, clip AI (cần đo khi làm thử).

---

## Nguồn (đọc 14/11/2026)

- [T1] ElevenLabs Pricing: https://elevenlabs.io/pricing
- [T2] ElevenLabs Help, "Can I publish the content I generate on the platform?": https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform
- [T3] ElevenLabs Billing: https://elevenlabs.io/docs/overview/administration/billing.md
- [T4] ElevenLabs Models: https://elevenlabs.io/docs/overview/models
- [T5] Azure Retail Prices API (serviceName 'Foundry Tools', productName chứa 'Speech', armRegionName 'eastus'): https://prices.azure.com/api/retail/prices?$filter=serviceName%20eq%20'Foundry%20Tools'%20and%20armRegionName%20eq%20'eastus'%20and%20contains(productName,'Speech') . Meter Neural HD hiệu lực từ 01/03/2026; Neural từ 01/02/2024
- [T6] Azure Speech pricing (trang hiện giá "$-", chỉ đọc được hạn mức F0): https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/
- [T7] Azure Speech language support (TTS): https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts
- [T8] Google Cloud Text-to-Speech pricing: https://cloud.google.com/text-to-speech/pricing
- [T9] OpenAI API pricing: https://developers.openai.com/api/docs/pricing
- [T10] OpenAI deprecations: https://developers.openai.com/api/docs/deprecations
- [T11] VOICEVOX 利用規約: https://voicevox.hiroshiba.jp/term/
- [T12] VOICEVOX trang 四国めたん (gồm ghi chú điều khoản các nhân vật, link điều khoản zunko.jp): https://voicevox.hiroshiba.jp/product/shikoku_metan/
- [T13] 東北ずん子・ずんだもんプロジェクト 音声ライブラリ利用規約 (không ghi ngày): https://zunko.jp/con_ongen_kiyaku.html
- [T14] AquesTalk ライセンス: https://www.a-quest.com/licence.html
- [T15] AquesTalk 動画での利用: https://www.a-quest.com/licence_video.html
- [T16] CoeFont llms.txt (tài liệu chính thức máy đọc): https://coefont.cloud/llms.txt
- [T17] MiniMax API pricing: https://platform.minimax.io/docs/pricing/overview
- [T18] Gemini Developer API pricing: https://ai.google.dev/gemini-api/docs/pricing (chuyển tới https://aistudio.google.com/docs/pricing)
- [T19] Veo 3.1 / Veo 3.1 Lite / Imagen (thông báo ngừng): https://aistudio.google.com/docs/models/veo-3.1-generate-preview.md , https://aistudio.google.com/docs/models/veo-3.1-lite-generate-preview.md , https://aistudio.google.com/docs/models/imagen.md
- [T20] Gemini API Additional Terms (hiệu lực 23/03/2026): https://aistudio.google.com/docs/terms
- [T21] OpenAI Image generation guide (bảng "Historical output costs"): https://developers.openai.com/api/docs/guides/image-generation
- [T22] Runway pricing: https://runway.com/pricing
- [T23] Runway Terms of Use (cập nhật 23/10/2026): https://runway.com/terms-of-use
- [T24] Luma pricing: https://lumalabs.ai/pricing
- [T25] Pika pricing: https://pika.art/pricing
- [T26] U.S. Copyright Office, Copyright and Artificial Intelligence Part 2: Copyrightability (01/2025): https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf
- [T27] Japan Copyright Office, "General Understanding on AI and Copyright in Japan – Overview" (05/2024): https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf ; trang gốc: https://www.bunka.go.jp/seisaku/chosakuken/aiandcopyright.html
- [T28] Spine purchase: https://esotericsoftware.com/spine-purchase
- [T29] Rive pricing: https://rive.app/pricing
- [T30] Rive runtimes: https://rive.app/docs/runtimes/getting-started
- [T31] Live2D SDK Release License: https://www.live2d.com/en/sdk/license/
- [T32] Live2D Help, PRO subscription (04/09/2019): https://help.live2d.com/en/license/license_01/
- [T33] Adobe Character Animator: https://www.adobe.com/products/character-animator.html
- [T34] lottie-web (MIT): https://github.com/airbnb/lottie-web
- [T35] Natural Earth Terms of Use: https://www.naturalearthdata.com/about/terms-of-use/
- [T36] Johnny Harris, "How I Make My Maps" (11/12/2020): https://rosetta.to/u/johnnyharris/how-i-make-my-maps
- [T37] OverseerOS blog (02/07/2026, nhà bán công cụ): https://www.overseeros.com/blog/faceless-ai-history-channels
- [T38] Epidemic Sound pricing (FAQ): https://www.epidemicsound.com/pricing/
- [T39] YouTube Help, Audio Library: https://support.google.com/youtube/answer/3376882
- [T40] OpenTracks (trước là DOVA-SYNDROME) 利用規約: https://opentracks.com/help/articles/license/
- [T41] 甘茶の音楽工房 利用規約: https://amachamusic.chagasi.com/terms.html
- [T42] Wikipedia API (mẫu đo ký tự/từ): https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=Ancient_Rome (và Plate_tectonics, Silk_Road, Volcano, Great_Wall_of_China)
