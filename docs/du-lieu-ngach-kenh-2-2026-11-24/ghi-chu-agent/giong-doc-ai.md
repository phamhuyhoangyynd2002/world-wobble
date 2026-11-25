# Giọng đọc AI cho kênh sinh vật biển sâu: hậu kỳ cho giống người có ổn không?

Ngày tra: 24/11/2026. Người tra: agent nghiên cứu (Claude). Mã [G..] trỏ tới bảng nguồn cuối file.

Quy ước độ tin:
- **ĐL** = nguồn độc lập (nghiên cứu, báo, bảng xếp hạng mù, trang chính sách gốc).
- **HÃNG** = nguồn của hãng bán công cụ hoặc khảo sát do hãng đặt hàng.
- **(chỉ thấy trong kết quả tìm kiếm)** = chưa mở được trang gốc, chỉ đọc đoạn trích do công cụ tìm kiếm trả về.
- Chỗ nào là **phép tính hoặc suy luận của tôi** thì ghi rõ, không phải số của nguồn.

---

## 0. Trả lời thẳng câu hỏi của người làm kênh

**Autotune: không.** Không tìm được nguồn nào (nghiên cứu, người làm nghề, cả blog của hãng) nói autotune / pitch correction làm giọng TTS tự nhiên hơn. Công cụ này sinh ra để sửa cao độ giọng hát [G14], còn thứ khiến người nghe nhận ra giọng máy lại nằm ở ngữ điệu, nhịp, độ trôi chảy, chỗ ngắt, tốc độ, hơi thở [G2]. Bài của Respeecher (hãng) còn nói ngược lại: chỉnh cao độ đồng loạt nghe giả, và hậu kỳ xoá hơi thở, tiếng miệng, độ trôi cao độ là xoá đúng những dấu hiệu người nghe dùng để nhận ra người thật [G13].

**Hậu kỳ nói chung: giúp được một phần, nhưng không có bằng chứng là đủ để qua mặt khán giả khó tính.** Thứ có bằng chứng tốt nhất không phải hậu kỳ mà là **chọn nguồn giọng**:
- Trong nghiên cứu PLOS One 2025, giọng **clone từ người thật** được cho là người thật 58% số lần, gần bằng giọng người thật (62%); giọng **tổng hợp có sẵn** (không dựa trên người thật) chỉ 41% [G1].
- Bảng xếp hạng mù tháng 11/2026 cho thấy mô hình mới bỏ xa mô hình cũ (Eleven v4 Elo 1340 so với Eleven v3 1191) [G15].

**Rủi ro lớn hơn giọng:** với YouTube, vấn đề không phải "giọng AI" mà là kênh trông như làm hàng loạt [G41][G42]. Với khán giả khoa học, phản ứng có thể nổ ra chỉ từ một cụm từ nghe như AI viết, kể cả khi giọng là người thật (vụ Hank Green, 8/2026) [G10].

**Ba phương án đáng thử, xếp theo bằng chứng** (xếp hạng này là nhận định của tôi từ các nguồn bên dưới):
1. Thuê người đọc bản ngữ: khoảng 600–1.700 USD mỗi video 3.500 từ theo bảng giá nghề, rẻ hơn nhiều trên Fiverr (mục 7). Đắt, nhưng là phương án duy nhất ghi "No AI used" được.
2. Tự đọc rồi dùng speech-to-speech đổi âm sắc: giữ nhịp, hơi thở thật của mình, nhưng **giữ luôn accent Việt** [G36].
3. TTS đời mới nhất (Eleven v4, Gemini 3.8 Flash TTS…) với giọng clone hoặc giọng có sẵn, tạo từng đoạn và chọn take: chi phí dưới 2 USD mỗi video [G15], nhưng không có nguồn nào bảo đảm khán giả mảng này không nhận ra.

---

## 1. Người nghe nhận ra giọng AI nhờ dấu hiệu gì?

### 1.1 Dấu hiệu

- Thí nghiệm nghe với 54 người (28 người nói tiếng Tây Ban Nha, 26 người nói tiếng Nhật), 80 mẫu, một nửa là giọng tổng hợp, có đoạn audiobook và phỏng vấn. Người nghe phải giải thích lựa chọn. Họ dựa chủ yếu vào đặc điểm **siêu đoạn tính và ngoài ngôn ngữ**: "intonation, rhythm, fluency, pauses, speed, breathing, and laughter", chứ không phải phát âm từng âm. Độ chính xác trung bình 59,11%, nhận đúng giọng thật tốt hơn nhận đúng giọng giả [G2] (ĐL, bản thảo arXiv 12/2025, gửi tạp chí Speech Communication; không phải tiếng Anh).
- Bài 404 Media về các kênh "Boring History for Sleep": phóng viên phát hiện giọng AI khi giọng đọc **lỗi kéo dài một âm** ("FEEEEEE") ở phút 75 của video 2 tiếng [G44] (ĐL).
- Một chủ đề diễn đàn nghi một kênh là AI vì người đọc "can't deal with numbers at all" (đọc số sai) [G46b] (chỉ thấy trong kết quả tìm kiếm; ý kiến người dùng).
- **Câu văn kiểu AI** cũng là dấu hiệu, độc lập với giọng: người xem nghi Hank Green dùng AI chỉ vì bốn từ "I appreciate the pushback"; sau đó ông thừa nhận dựa nhiều vào ChatGPT khi nghiên cứu kịch bản, xin lỗi và giảm nhịp ra video [G10] (ĐL, Scientific American 8/8/2026). Nhà nghiên cứu Daphne Ippolito trong bài cảnh báo dùng AI nhiều khiến người ta "talking and communicating like the AI" [G10].
- Phát âm sai tên khoa học, nhấn sai từ: **không tìm được** nghiên cứu đo riêng. Chỉ có tài liệu của hãng thừa nhận phải sửa bằng IPA hoặc từ điển phát âm (mục 2) [G12].

### 1.2 Tỷ lệ phân biệt được

| Nghiên cứu | Kết quả | Mã |
|---|---|---|
| Lavan và cộng sự, PLOS One, 24/9/2025. 80 đoạn (khoảng 40 người, 40 tổng hợp), giọng tạo bằng ElevenLabs với dưới 5 phút mẫu | Giọng người thật được cho là người: 62%. Giọng clone: 58% (không khác biệt có ý nghĩa thống kê). Giọng tổng hợp chung: 41%. Không có hiệu ứng "siêu thật". Một số clone được chấm đáng tin và áp đảo hơn giọng người | [G1] ĐL |
| Barrington, Cooper, Farid, Scientific Reports, 31/3/2025 | Người nghe nhận đúng giọng AI khoảng 60%; coi giọng clone là cùng một người với giọng gốc khoảng 80% | [G3] ĐL (chỉ thấy trong kết quả tìm kiếm) |
| San Segundo và cộng sự, arXiv 12/2025 | Chính xác 59,11% | [G2] ĐL |
| Edison Research cho Spoken, 7/2026, hơn 1.000 người nghe audiobook hư cấu ở Mỹ | 61% người nghe bản AI tưởng là người; 65% người nghe bản người tưởng là người | [G5] HÃNG |

Lưu ý cách đọc: các thí nghiệm trên dùng **đoạn ngắn**, người nghe đại chúng. Không tìm được nghiên cứu nào đo trên **narration 15–30 phút** với khán giả đã quen săn giọng AI. Lỗi của giọng AI trong bài 404 Media xuất hiện ở phút 75 [G44], nên đoạn dài có thêm rủi ro mà thí nghiệm đoạn ngắn không đo.

### 1.3 Phản ứng khi biết hoặc nghi là AI

- **Bằng chứng thí nghiệm (nghe thật):** nghiên cứu Đại học Vienna (Computers in Human Behavior Reports, tập 22, 5/2026): người nghe audiobook chấm đoạn văn học do AI và do diễn viên đọc; khác biệt "minute", và **việc tin người đọc là người hay máy không làm đổi điểm chấm**. Kết luận: giọng AI "currently function as a viable substitute for human audiobook narration" [G4] (ĐL; kết quả tìm kiếm mô tả thiết kế 2x2, 500 người, thị trường tiếng Đức, tôi chưa xác nhận được N trên trang gốc).
- Edison/Spoken: với truyện nhiều nhân vật, bản AI nhiều giọng được chấm cao hơn (ưa thích 61% so với 53%); nhưng **với đoạn dẫn chuyện một giọng, người đọc thật được chấm cao hơn**. Ý định mua: AI 46%, người 49% [G5] (HÃNG). Narration khoa học là dạng một giọng dẫn chuyện.
- **Bằng chứng khảo sát (thái độ tự khai):**
  - Podcast Landscape 2025 (Sounds Profitable, người Mỹ 18+ từng nghe podcast): 47% nói sẽ **ít nghe hơn** nếu podcast yêu thích dùng giọng AI (28% "ít hơn nhiều"); 21% nói nghe nhiều hơn. Người học càng cao càng phản đối: 49% ở nhóm sau đại học, 37% ở nhóm chưa xong phổ thông [G6][G7] (ĐL).
  - Hiệp hội Audio Publishers: tỷ lệ người nghe audiobook sẵn lòng thử bản AI đọc giảm từ 77% (2023) xuống 70% (2025) [G6] (ĐL).
  - Adobe Express, 850 người tiêu dùng Mỹ, đăng 18/2/2026: 88% từng nghe một giọng và tự hỏi có phải AI; 77% tin giọng người nhất; 14% không tin bất kỳ giọng nào họ cho là AI; mức thoải mái với giọng AI theo bối cảnh: trò chơi 51%, chăm sóc khách hàng 45%, **tin tức 9%, podcast 8%** [G8] (HÃNG).
  - Animoto State of Video 2026: khoảng 83% nói từng xem video nghi là AI; 36% nói video AI làm giảm tin tưởng thương hiệu [G9] (HÃNG, chỉ thấy trong kết quả tìm kiếm).
- Hai loại bằng chứng lệch nhau: nghe mù thì điểm gần bằng nhau [G4][G5], nhưng hỏi thái độ thì gần một nửa nói sẽ bỏ [G6]. Cả hai không đo đúng khán giả YouTube mảng tự nhiên; dữ liệu bình luận kênh đã đo ở thư mục này mới là bằng chứng trực tiếp.

---

## 2. Autotune và các bước hậu kỳ

### 2.1 Autotune / pitch correction

- Auto-Tune ra đời 1997 (Antares) để sửa cao độ trong thu âm nhạc; kỹ sư âm thanh mô tả nó dễ ra tiếng "robotic"; các phương pháp tổng hợp lại bằng DSP cổ điển "tend to introduce artifacts and robotic voice" [G14] (ĐL, chỉ thấy trong kết quả tìm kiếm: Wikipedia, Reverb, bài KaraTuner).
- **Không tìm được** bất kỳ nguồn nào thử autotune trên giọng TTS để tăng độ tự nhiên.
- Suy luận của tôi: autotune kéo cao độ về nốt nhạc, tức làm đường cao độ đều hơn; trong khi dấu hiệu lộ máy đầu tiên người nghe kể là ngữ điệu và nhịp [G2]. Vậy nó đi ngược hướng cần.

### 2.2 Các bước người làm nghề dùng, kèm mức bằng chứng

| Bước | Nguồn nói gì | Mức bằng chứng |
|---|---|---|
| Chọn mô hình đời mới | Elo mù: Eleven v4 1340, Eleven v3 1191, MiniMax Speech 2.8 HD 1173, Kokoro 1060, XTTS v2 914 [G15][G16] | **Mạnh nhất** (bình chọn mù của người bản ngữ, ĐL), nhưng đo trên đoạn ngắn [G17] |
| Dùng giọng clone từ người thật thay giọng có sẵn | 58% so với 41% được cho là người [G1] | Khá (một nghiên cứu, ĐL) |
| Tạo nhiều lần, chọn bản tốt | ElevenLabs: "generate more than once and select the best result" [G12] | Lời khuyên của hãng |
| Tạo theo đoạn nhỏ | Blog hãng khuyên tạo theo đoạn; ElevenLabs nói v4 có "request stitching" nối các lần tạo cho nội dung dài [G12b] | Lời khuyên của hãng (chỉ thấy trong kết quả tìm kiếm) |
| SSML break / prosody | Eleven v4 và v3 **không hỗ trợ SSML**; dùng dấu ba chấm, dấu câu, thẻ âm thanh. Ở mô hình cũ, `<break>` tối đa 3 giây và **dùng nhiều gây mất ổn định** (đọc nhanh lên, sinh tạp âm) [G12][G34]. Azure vẫn dùng SSML (dự án World Wobble đang dùng) | Tài liệu hãng |
| Chèn hơi thở | Nghiên cứu TTS: 40 người bản ngữ chấm, mô hình **huấn luyện có dấu hơi thở** nghe tự nhiên hơn; nhóm KTH: hơi thở tăng độ tự nhiên so với khoảng lặng [G11]. Đây là hơi thở do mô hình sinh, **không phải dán hơi thở vào hậu kỳ**; không tìm được thử nghiệm cho cách dán | Có nghiên cứu, nhưng không đúng cách làm hậu kỳ (chỉ thấy trong kết quả tìm kiếm) |
| Thẻ `[sighs]`, `[exhales]` | Có trên Eleven v4/v3; hãng tự nhận "They're not perfect yet" [G12][G34] | Tài liệu hãng |
| Sửa phát âm tên khoa học | Eleven v4 nhận IPA đặt giữa hai dấu gạch chéo; có từ điển phát âm (.PLS), phân biệt hoa thường [G12]. Azure có `<phoneme>` trong SSML | Tài liệu hãng; không có số đo |
| Room tone, EQ, nén | Blog khuyên chuẩn hoá âm lượng, thêm room tone, EQ, nén nhẹ; cảnh báo nén quá tay nghe "lifeless" [G13b]. Respeecher: đừng hậu kỳ quá tay [G13] | Chỉ có lời khuyên blog/hãng. **Không tìm được** thử nghiệm nghe |
| Đổi tốc độ | ElevenLabs: tốc độ 0,7–1,2; "Extreme values may affect the quality" [G12] | Tài liệu hãng |
| Viết kịch bản kiểu văn nói | Blog khuyên mỗi câu một ý [G13b]; vụ Hank Green cho thấy cụm từ kiểu AI tự nó gây nghi ngờ [G10] | Gián tiếp |
| Speech-to-speech (người đọc, AI đổi giọng) | Respeecher: giữ được thời điểm, ngập ngừng, hơi thở gốc; "the hesitation either happened when the line was recorded, or it didn't" [G13] | Lập luận của hãng bán S2S, không kèm thử nghiệm |

Tóm lại: **không tìm được thử nghiệm độc lập nào** so sánh "TTS thô" với "TTS đã hậu kỳ" về tỷ lệ bị nhận ra. Mọi bước hậu kỳ đang ở mức lời khuyên.

---

## 3. Mô hình TTS tốt nhất (11/2026)

### 3.1 Bảng xếp hạng mù độc lập

**Artificial Analysis Speech Arena** (mở trang ngày 24/11/2026) [G15]. Cách đo: hai đoạn cùng một văn bản, giấu tên, người chấm phần lớn là nhóm trả công, người bản ngữ tiếng Anh ở Mỹ hoặc Anh, không có lựa chọn hoà [G17]. **Không có bài đo narration dài** [G17].

| Hạng | Mô hình | Hãng | Elo | Giá USD / 1 triệu ký tự | Ước tính cho 1 video (21.000 ký tự)* |
|---|---|---|---|---|---|
| 1 | Eleven v4 Turbo | ElevenLabs | 1340 | 40,00 | 0,84 |
| 2 | Eleven v4 | ElevenLabs | 1340 | 80,00 | 1,68 |
| 3 | StepAudio 3 TTS | StepFun | 1307 | 14,00 | 0,29 |
| 4 | Qwen-Audio-3.1-TTS-Plus | Alibaba | 1298 | 19,31 | 0,41 |
| 5 | Sonic 3.6 | Cartesia | 1294 | 49,00 | 1,03 |
| 6 | Simba 3.5 | SpeechifyAI | 1293 | 6,58 | 0,14 |
| 7 | Gemini 3.8 Flash TTS | Google | 1282 | 16,49 | 0,35 |
| 8 | Fish Audio Drama 3 | Fish Audio | 1277 | 15,00 | 0,32 |
| 9 | Lightning V3.1 Pro | Smallest.ai | 1276 | 19,50 | 0,41 |
| 10 | Realtime TTS-2 | Inworld | 1269 | 20,83 | 0,44 |
| 12 | Gemini 3.8 Flash-Lite TTS | Google | 1261 | 11,03 | 0,23 |
| 16 | v3 Conversational | ElevenLabs | 1215 | 50,00 | 1,05 |
| 21 | Voxtral 3 TTS | Mistral | 1211 | 13,00 | 0,27 |
| 24 | Eleven v3 | ElevenLabs | 1191 | 100,00 | 2,10 |
| 28 | Speech 2.8 HD | MiniMax | 1173 | 100,00 | 2,10 |

\* Phép tính của tôi: 3.500 từ × khoảng 6 ký tự mỗi từ (kể cả dấu cách) = khoảng 21.000 ký tự. Tạo lại 2–3 lần để chọn take thì nhân 2–3. Giá là số Artificial Analysis quy đổi (gói thuê bao tính theo gói rẻ nhất, dùng 80%) [G17], không phải báo giá của hãng.

Không thấy trong 30 hạng đầu: **Azure HD / Dragon HD, OpenAI gpt-4o-mini-tts, Hume Octave, Google Chirp 3 HD**. Tôi không đọc được phần sau hạng 30 nên không ghi được Elo của chúng.

**TTS Arena V2 của Hugging Face**: mở được trang nhưng bảng hiện "0 of 0 models" (nội dung nạp động), **không lấy được thứ hạng** [G18]. Chỉ ghi được cách chấm: xếp theo sở thích của người nghe, mô hình cần 100 phiếu để hiện.

### 3.2 Dịch vụ: giấy phép và giá

| Dịch vụ | Thương mại trên YouTube? | Giá | Mã |
|---|---|---|---|
| ElevenLabs gói **Free** | **Không.** Điều khoản: "you may only use the Services for non-commercial purposes" | 0 USD, 10.000 credit | [G19][G20] HÃNG (trang gốc) |
| ElevenLabs Starter | Có (Commercial License), có Instant Voice Cloning | 6 USD/tháng, 30.000 credit (khoảng 1,4 video, phép tính của tôi với 1 credit/ký tự) | [G19] |
| ElevenLabs Creator | Có, có Professional Voice Cloning | 22 USD/tháng, 121.000 credit (khoảng 5,7 video chưa tính tạo lại) | [G19] |
| ElevenLabs Pro | Có | 99 USD/tháng, 600.000 credit | [G19] |
| Azure AI Speech Neural | Có theo gói Azure (luật kênh hiện tại) | 15 USD/1 triệu ký tự (khoảng 0,32 USD/video); miễn phí 0,5 triệu ký tự/tháng cho giọng Neural | [G21] (bảng giá bán lẻ công khai của Azure, vùng eastus) |
| Azure Neural HD | Như trên | 22 USD/1 triệu ký tự (khoảng 0,46 USD/video) | [G21] |
| Azure Personal Voice | Như trên | 24 USD/1 triệu ký tự; tạo giọng miễn phí | [G21] |
| OpenAI tts-1 / tts-1-hd | Chưa mở điều khoản | 15 / 30 USD mỗi 1 triệu ký tự (0,32 / 0,63 USD/video) | [G22] |
| OpenAI gpt-4o-mini-tts | Chưa mở điều khoản | 0,60 USD/1 triệu token chữ vào, 12 USD/1 triệu token âm thanh ra; không quy được ra phút từ trang này | [G22] |
| Gemini 3.8 Flash TTS | Chưa mở điều khoản bậc miễn phí | Trả tiền: 0,50 USD vào, 9 USD ra mỗi 1 triệu token đến 31/12/2026; từ 1/1/2027 là 1 và 18 USD. Có bậc miễn phí | [G23] |
| Gemini 3.8 Flash-Lite TTS | Như trên | 0,50 vào, 6 ra đến 31/12/2026; sau đó 1 và 12 | [G23] |

Chưa kiểm được điều khoản thương mại của StepFun, Alibaba Qwen, Cartesia, Speechify, Inworld, MiniMax, Hume. Phải đọc điều khoản gốc trước khi dùng.

### 3.3 Mô hình mã nguồn mở chạy trên GPU cá nhân

Elo lấy từ bảng open weights của Artificial Analysis [G16]. Giấy phép lấy từ trang gốc của từng mô hình.

| Mô hình | Elo [G16] | Giấy phép (trang gốc) | Dùng thương mại cho YouTube? |
|---|---|---|---|
| Fish Audio Drama 3 | 1277 | Thẻ Hugging Face ghi `fish-audio-research-license` nhưng phần mô tả ghi "Fish Audio Community License" (hai chỗ lệch nhau). Báo viết lại: miễn phí thương mại dưới 500.000 USD doanh thu/năm, phải ghi "Built with Fish Audio". 36 tỷ tham số; báo nói cần khoảng 48 GB VRAM | **Chưa chắc.** Chưa mở được file LICENSE (404). Không chạy được trên GPU cá nhân thông thường | [G27] |
| Breeze TTS 2 | 1228 | Chưa tra | Chưa rõ |
| Ming-3.0-tts (Ant Group) | 1179 | Chưa tra | Chưa rõ |
| Fish Audio S2 Pro | 1101 | Fish Audio Research License (báo: thương mại phải mua giấy phép) | **Loại** nếu không mua giấy phép [G27] (chỉ thấy trong kết quả tìm kiếm) |
| Kokoro 82M v1.0 | 1060 | `apache-2.0`; trang ghi đã được dùng trong "commercial APIs" | **Có.** Không clone giọng | [G24] |
| Higgs Audio V3 TTS | 1035 | "Boson Higgs TTS 3 Research and Non-Commercial License". Có **Creator Use Grant**: người sáng tạo được làm và kiếm tiền từ podcast, video miễn phí, **phải ghi công Boson AI Higgs Audio** trong âm thanh hoặc phần chữ đi kèm | **Có điều kiện** (ghi công). Đọc nguyên văn giấy phép trước khi dùng | [G28] |
| Chatterbox | 1019 | MIT. **Dự án đã ngừng từ 8/2026** ("retired research and is no longer maintained"). Mọi file ra đều có **watermark PerTh** không nghe thấy, sống sót qua nén MP3 | Có về giấy phép; không còn bảo trì; âm thanh mang dấu nhận biết AI | [G25] |
| VibeVoice 1.5B | 954 | Mã MIT, nhưng Microsoft đã gỡ mã TTS ngày 5/9/2025 vì bị lạm dụng; trọng số 1.5B ghi "Disabled"; Microsoft: "We do not recommend using VibeVoice in commercial or real-world applications" | **Không nên** | [G29] |
| XTTS v2 | 914 | Coqui Public Model License, phi thương mại | **Loại** [G27b] (chỉ thấy trong kết quả tìm kiếm) |
| F5-TTS | không có trong bảng | Thẻ `cc-by-nc-4.0` | **Loại** | [G26] |
| IndexTTS / IndexTTS2 | không có trong bảng | "bilibili Model Use License Agreement"; thương mại thì liên hệ hãng | **Chưa rõ**, coi như không dùng cho tới khi đọc giấy phép | [G30] |
| Orpheus TTS | không có trong bảng | Kho mã ghi Apache-2.0; nền Llama 3B; có thẻ `<laugh>`, `<sigh>`… | Có theo thẻ giấy phép | [G31] |
| Sesame CSM-1B | không có trong bảng | `apache-2.0`; ghi dùng cho "research and educational purposes"; cấm giả giọng người thật khi chưa đồng ý | Có theo thẻ giấy phép; là mô hình nền, chưa tinh chỉnh giọng | [G32] |

Nhận xét từ bảng [G15][G16]: mô hình mở dùng được thương mại và chạy được trên GPU cá nhân (Kokoro 1060, Chatterbox 1019) kém nhóm đầu khoảng 280–320 điểm Elo. Với khán giả phạt nặng giọng AI, khoảng cách này đáng kể.

---

## 4. Clone giọng của chính mình

### 4.1 TTS bằng giọng clone: accent Việt còn không?

Nguồn nói ngược nhau, nên phải thử thật:
- ElevenLabs (tài liệu Eleven v4): khi ngôn ngữ tạo ra **trùng** ngôn ngữ của mẫu giọng, "the original accent is preserved exactly as before". Khi khác ngôn ngữ, v4 "aims for fluent, natural-sounding speech in the target language rather than carrying over the reference accent" [G34] (HÃNG). Suy ra (suy luận của tôi): ghi mẫu bằng **tiếng Anh giọng Việt** thì bản clone có xu hướng giữ accent Việt; ghi mẫu bằng **tiếng Việt** rồi cho đọc tiếng Anh thì v4 hướng tới tiếng Anh trôi chảy mang âm sắc của mình. Tài liệu PVC khuyên thử trước khi tin [G35].
- ElevenLabs: Instant Voice Cloning "may struggle with uncommon accents or unique voices"; "You cannot change the accent or tone of a clone after it is created" [G33] (HÃNG).
- Trang trợ giúp của Synthesia và DeepBrain (dùng ElevenLabs): bản clone tức thời không phải lúc nào cũng giữ accent của người nói tiếng Anh không bản ngữ, vì dữ liệu accent tiếng Anh chỉ có Mỹ, Anh, Úc, Canada [G54] (HÃNG, chỉ thấy trong kết quả tìm kiếm).
- Nghiên cứu "Voice 'Cloning' is Style Transfer" (Zhou và cộng sự, arXiv 5/2026, gửi NeurIPS 2026): các mô hình clone phổ biến **không sao chép trung thành** mà áp phong cách; đầu ra **giảm độ đa dạng về accent**, tốc độ nói; người chấm thấy giọng clone uy quyền, ấm và giống người hơn giọng gốc [G38] (ĐL, chỉ đọc tóm tắt).
- Nghiên cứu về tiếng Quan Thoại chuẩn và giọng địa phương nặng (Yang và cộng sự, IEEE SLT 2026): bản clone của người có accent bị chấm **ít giống bản gốc hơn**; độ dễ hiểu **tăng** từ gốc sang clone, tăng nhiều hơn với giọng có accent [G37] (ĐL; không phải tiếng Anh giọng Việt).

Đọc chung: clone thường **làm nhạt** accent chứ không giữ nguyên, mức nhạt tuỳ hãng và tuỳ mẫu. Không tìm được nghiên cứu nào về tiếng Anh giọng Việt.

### 4.2 Speech-to-speech (voice changer, RVC)

- ElevenLabs Voice Changer: giữ "whispers, laughs, cries, accents, and subtle emotional cues" của bản thu gốc; mẫu vào quyết định đặc điểm đầu ra; ví dụ của hãng: giọng đích kiểu Anh, đầu vào giọng Mỹ thì ra giọng đích nói giọng Mỹ. Tối đa 5 phút mỗi đoạn. Tính phí 1.000 ký tự cho mỗi phút âm thanh [G36] (HÃNG). Vậy **đúng: S2S giữ accent và ngữ điệu gốc**; người làm kênh tự đọc thì accent Việt còn nguyên, chỉ đổi âm sắc. Phép tính của tôi: 25 phút là khoảng 25.000 credit.
- RVC: mã nguồn MIT; đường cao độ của nguồn nhìn chung được giữ; tham số "search feature ratio" ảnh hưởng độ mạnh accent, đặt cao sinh tạp âm. Giấy phép của mô hình nền và mô hình giọng bên thứ ba là chuyện riêng, chưa tra [G39] (chỉ thấy trong kết quả tìm kiếm).
- Hệ quả (suy luận của tôi): S2S chỉ có ích khi **người đọc gốc đọc tốt**. Một cách phối: thuê người bản ngữ đọc là đủ, không cần S2S; còn tự đọc giọng Việt rồi S2S thì không giải quyết phát âm.

### 4.3 Điều khoản clone giọng chính mình

- ElevenLabs Professional Voice Cloning: "For now, we only allow you to clone your own voice", không clone giọng người khác kể cả khi họ đồng ý; phải qua bước xác minh giọng; tối thiểu 30 phút âm thanh, khuyên 2–3 giờ; Eleven v4 hỗ trợ đầy đủ PVC [G35] (HÃNG, trang gốc).
- ElevenLabs điều khoản: "You may not provide Input or create Output for which you do not have all the rights necessary"; người dùng giữ quyền với Output [G20].
- Instant Voice Cloning có từ gói Starter 6 USD; PVC từ gói Creator 22 USD [G19].
- Azure Personal Voice: tạo giọng miễn phí, tổng hợp 24 USD/1 triệu ký tự [G21]. Điều kiện đồng ý của người nói: chưa mở trang điều khoản.
- YouTube: "Cloning one's own voice to create voice overs or dubs" nằm trong danh sách **không cần** khai báo [G40].

---

## 5. Chính sách YouTube về giọng AI

### 5.1 Kiếm tiền ("inauthentic content")

Trang chính sách kiếm tiền (mở 24/11/2026) **không nhắc** "synthetic voice", "text-to-speech" hay "narration" [G41]. Nguyên văn các câu liên quan:
- Thông báo 15/7/2025: "We are also renaming this policy from 'repetitious content' to 'inauthentic content.'" và "This type of content has always been ineligible for monetization under our existing policies".
- Không được kiếm tiền: "AI-generated content made with generic or unoriginal templates giving the impression of mass production"; "Image slideshows, templated storylines, or scrolling text with minimal or no narrative, commentary, or educational value"; "Similar or repetitive content with low educational value, commentary, narratives, or minimal variation across videos"; "Content that exclusively features readings of other materials you did not originally create".
- Được kiếm tiền: "If you use automated tools or templates to help create your content, … the final product must still demonstrate your creative vision"; "Content that utilizes creative tools to assist in delivering a unique, well-researched, or creative narrative".
- Mục "AI Personas Related to Sensitive Topics": kênh dùng nhân vật AI nói về y tế, tài chính, pháp luật không được kiếm tiền (ví dụ "An AI 'doctor' providing medical diagnoses…"). Sinh vật biển sâu không thuộc nhóm này.

Diễn giải của YouTube:
- TeamYouTube (15/7/2025): thay đổi là "a minor update to our longstanding guideline on repetitious content"; YouTube "allows creators to use AI tools in content to enhance their storytelling" [G43] (ĐL, ppc.land trích).
- Matt Halprin, phụ trách trust and safety (Creator Insider, hiệu lực 16/7/2026): ba nhóm inauthentic là nội dung chung chung/lặp/theo khuôn, nội dung gây khó chịu, và nhân vật AI nói chủ đề nhạy cảm. "AI can actually allow people to make a lot of videos… Sometimes those videos are great". Kênh có quá nhiều nội dung thuộc ba nhóm thì không được kiếm tiền. Bài TechCrunch không nhắc giọng AI [G42] (ĐL).

Kết luận từ nguồn: **giọng TTS tự nó không bị nêu tên là inauthentic**. Rủi ro là dáng vẻ làm hàng loạt.

### 5.2 Nhãn altered/synthetic

Trang trợ giúp (mở 24/11/2026) [G40]:
- Quy tắc: "We require creators to disclose AI-generated or altered content that seems realistic." Loại phải khai có "Makes a real person appear to say or do something they didn't do."
- Không cần khai: "Cloning one's own voice to create voice overs or dubs"; "Production assistance, like using generative AI tools to create or improve a video outline, script"; hoạt hình rõ là không thật.
- Trang **không có ví dụ nào nói thẳng** về giọng TTS có sẵn đọc cho video kiến thức. Danh sách được ghi là "not exhaustive".
- Kết quả tìm kiếm cho thấy bảng ví dụ có dòng về "voice cloning someone else's voice to use it for voiceover" (thuộc nhóm phải khai); tôi không thấy dòng này khi mở trang nên chưa xác nhận [G40b].
- Theo kết quả tìm kiếm, trang ghi khai báo AI không giới hạn người xem hay khả năng kiếm tiền của video [G40b] (chỉ thấy trong kết quả tìm kiếm).

Ngoài YouTube (không phải kết quả tra web, lấy từ bộ luật trong repo này): Luật Trí tuệ nhân tạo 134/2025/QH15 yêu cầu nội dung AI có dấu hiệu nhận biết. Hậu kỳ để **giấu** việc dùng AI đi ngược tinh thần đó và ngược dòng công khai AI mà World Wobble đang ghi trong mô tả. Cần người làm kênh cân nhắc riêng.

### 5.3 Vụ việc

- **Không tìm được** vụ nào có nguồn đáng tin nói một kênh bị tắt kiếm tiền **chỉ vì giọng AI**.
- Các blog nói YouTube gỡ hoặc tắt kiếm tiền ít nhất 16 kênh lớn làm clip AI hàng loạt (tổng hơn 35 triệu người đăng ký, 4,7 tỷ lượt xem), và kênh "AI voice đọc kịch bản trên stock footage" bị đánh nặng. Nguồn là blog SEO, ngày tháng lệch nhau, không nêu tên kênh [G46] (chỉ thấy trong kết quả tìm kiếm; độ tin thấp).
- The Next Web (15/6/2026) có bài tiêu đề "YouTube's AI slop purge is punishing the human creators who never showed their faces": kênh không lộ mặt do người làm cũng bị vạ lây. Không mở được bài (403), chỉ có tiêu đề [G46].
- Kotaku: Kurzgesagt nói công cụ dò AI tự động của YouTube nhầm video do người làm của họ là "AI Slop" [G52] (chỉ thấy trong kết quả tìm kiếm). Nghĩa là có dò tự động, và có nhầm.
- 404 Media (3/9/2025): sau khi YouTube tuyên bố xử kênh "mass produced", các kênh lịch sử ru ngủ dùng giọng AI vẫn hoạt động; những người được phỏng vấn không thấy thay đổi [G44].
- YouTube đang thử hỏi người xem video có giống "AI slop" không, thang 5 mức [G46c] (chỉ thấy trong kết quả tìm kiếm).

---

## 6. Ví dụ kênh và thái độ khán giả

### 6.1 Kênh kiến thức thành công dù dùng giọng AI (có nguồn nói rõ)

- **Sleepless Historian** và nhóm kênh "Boring History for Sleep" (Boring History Bites, History Before Sleep, The Snoozetorian, Historian Sleepy, Dreamoria): 404 Media xác định là AI; một video 2 tiếng đạt 2,3 triệu lượt xem [G44] (ĐL). Tường thuật lại nói Sleepless Historian có 614.000 người đăng ký, đăng mỗi ngày một video nhiều giờ [G44b] (chỉ thấy trong kết quả tìm kiếm). Lưu ý: đây là nội dung **để ngủ**, người nghe không chú tâm; người làm lịch sử thật (Pete Kelly, History Time) nói nội dung mơ hồ, hình sai [G44]. Không phải mô hình cho kênh muốn được tin.
- Báo cáo Kapwing (28/11/2025): các kênh "AI slop" lớn nhất có hàng tỷ lượt xem (Bandar Apna Dost 2,07 tỷ, ước tính 4,25 triệu USD/năm); 21% trong 500 Shorts đầu tiên của tài khoản mới là AI [G45] (HÃNG; chủ yếu Shorts giải trí, không phải kiến thức dài).
- Kênh **tự nhiên / khoa học dài** thành công với giọng AI có nguồn xác nhận: **không tìm được**.

### 6.2 Kênh đổi giọng AI sang người (hoặc ngược lại) kèm số liệu

**Không tìm được** trường hợp nào có số liệu trước và sau. Chỉ có bài tự kể không số, lời khuyên của hãng ("giọng mình tích luỹ tốt hơn khi đã có khán giả"), và chuyện kể trên diễn đàn bị người khác phản bác [G46d] (chỉ thấy trong kết quả tìm kiếm).

### 6.3 Khảo sát thái độ khán giả YouTube với giọng AI

- **Không tìm được** khảo sát 2026 nào đo riêng "giọng AI trên YouTube" (không có ở YouGov, Pew, Morning Consult trong kết quả tìm kiếm).
- Gần nhất: podcast 47% ít nghe hơn [G6]; Adobe 77% tin giọng người nhất [G8]; Animoto 36% giảm tin thương hiệu [G9].
- Khảo sát YouTube/NRG (22/10/2026, 694 người **đăng video** ở Mỹ): 72% dùng AI cho video và ảnh. Đây là người làm, không phải người xem; Tubefilter lưu ý YouTube có động cơ quảng bá AI [G51].
- Với giới khoa học: Joe Hanson: "All content creators depend on a trusted relationship with their audience" [G10].

---

## 7. Thuê người đọc bản ngữ (khoảng 3.500 từ, khoảng 25 phút)

| Nguồn giá | Mức | Quy ra 3.500 từ (phép tính của tôi) | Mã |
|---|---|---|---|
| Bảng giá nghề 2026 (VO Journey, xem lại 9/2026; tự do, không công đoàn; gộp "E-learning, YouTube and documentary narration"). 300 từ đầu tính theo 100 từ, sau đó theo từ | Mới vào nghề: 75–100 USD/100 từ rồi 0,12–0,16 USD/từ. Trung cấp: 100–200 rồi 0,14–0,18. Chuyên nghiệp: 200–300 rồi 0,16–0,25 | Mới: khoảng 610–810 USD. Trung cấp: khoảng 750–1.180. Chuyên nghiệp: khoảng 1.110–1.700. Chưa gồm phí bản quyền sử dụng, làm gấp | [G47] (trang đào tạo nghề lồng tiếng, không phải hãng AI) |
| Fiverr, người đọc Mỹ (tin rao lẻ) | 25–45 USD/100 từ; hạng Pro "From $150 / 150 words"; một người 75 USD cho 100 từ đầu rồi 25 USD/100 từ | 875–1.575 USD ở mức 25–45; khoảng 925 USD với kiểu 75 + 25 | [G48] (chỉ thấy trong kết quả tìm kiếm) |
| Fiverr, người đọc ngoài Mỹ | Có tin 2 USD/100 từ | Khoảng 70 USD; không đúng yêu cầu giọng bản ngữ | [G48] |
| Blog đại lý: "Podcast and YouTube Narration" | 100–500 USD mỗi tập | 100–500 USD | [G53] (chỉ thấy trong kết quả tìm kiếm; độ tin thấp) |
| ACX audiobook, theo giờ thành phẩm (PFH) | Phổ biến 100–200 và 200–400 USD/giờ thành phẩm; ACX nêu 10–100 cho người mới, 100–500 cho người có kinh nghiệm | 25 phút = 0,42 giờ: khoảng 42–167 USD ở mức 100–400. Đây là **giá audiobook**, không phải giá narration YouTube có kiếm tiền | [G49] (chỉ thấy trong kết quả tìm kiếm) |
| Voices.com, GVAA Rate Guide | **Không lấy được** (Voices.com 403; GVAA yêu cầu đồng ý điều khoản, cấm trích xuất) | | |

Thời gian giao: tin rao Fiverr ghi 24 giờ đến 5 ngày; một người nhận "24 to 48 hours, up to 10,000 words" [G48] (chỉ thấy trong kết quả tìm kiếm). ACX: người đọc mất khoảng 4 giờ làm việc cho 1 giờ thành phẩm [G49].

Ghi chú: ACX yêu cầu audiobook do người đọc trừ khi được cho phép riêng (theo các nguồn thứ cấp trích quy định 4/2026) [G50] (chỉ thấy trong kết quả tìm kiếm). Tức là ngành audiobook vẫn giữ cổng "người đọc".

So sánh chi phí (phép tính của tôi): TTS hạng đầu 1–5 USD mỗi video kể cả tạo lại; người đọc bản ngữ theo bảng giá nghề đắt hơn khoảng 150–1.000 lần. Với nhịp 1 video mỗi tuần, người đọc tầm trung là khoảng 3.000–4.700 USD mỗi tháng.

---

## Không tìm được

1. Nghiên cứu hoặc thử nghiệm cho thấy autotune / pitch correction làm TTS tự nhiên hơn.
2. Thử nghiệm nghe độc lập so sánh TTS thô với TTS đã hậu kỳ (room tone, EQ, nén, dán hơi thở, sắp lại chỗ ngắt).
3. Nghiên cứu về tỷ lệ nhận ra giọng AI trên narration dài 15–30 phút, hoặc với khán giả YouTube mảng tự nhiên.
4. Nghiên cứu đo riêng lỗi phát âm tên khoa học, nhấn sai từ như dấu hiệu lộ giọng AI.
5. Bảng TTS Arena V2 của Hugging Face (trang nạp động, không đọc được).
6. Elo của Azure HD/Dragon HD, OpenAI gpt-4o-mini-tts, Hume Octave, Google Chirp 3 HD trên Artificial Analysis (ngoài 30 hạng đầu đọc được).
7. Điều khoản thương mại của StepFun, Qwen, Cartesia, Speechify, Inworld, MiniMax, Hume, OpenAI, bậc miễn phí Gemini; file LICENSE của Fish Audio Drama 3; giấy phép của Breeze TTS 2, Ming-3.0-tts.
8. Nghiên cứu về clone giọng tiếng Anh accent Việt.
9. Vụ kênh bị tắt kiếm tiền chỉ vì giọng AI, có nguồn đáng tin và nêu tên kênh.
10. Kênh tự nhiên / khoa học dài thành công với giọng AI có nguồn xác nhận; kênh đổi giọng AI sang người (hoặc ngược lại) có số liệu trước và sau.
11. Khảo sát 2026 đo riêng thái độ người xem YouTube với giọng AI.
12. Bảng giá gốc của Voices.com và GVAA; phân bố giá Fiverr có cỡ mẫu.
13. Nguyên văn phát biểu của Rene Ritchie về giọng AI; bài The Next Web, WebProNews, Kotaku, PMC, Businesswire, Quartz (bị chặn 403 hoặc captcha).

---

## Bảng nguồn

Ngày tra của mọi dòng: 24/11/2026. "Mở" = đã mở trang gốc; "TK" = chỉ thấy trong kết quả tìm kiếm.

| Mã | Tiêu đề | URL | Ngày đăng | Mở/TK | Loại |
|---|---|---|---|---|---|
| G1 | Lavan và cộng sự, "Voice clones sound realistic but not (yet) hyperrealistic", PLOS One; đọc qua The Register | https://www.theregister.com/2025/10/09/voice_clone_detection_study/ (bài gốc: https://pmc.ncbi.nlm.nih.gov/articles/PMC12459763/, bị captcha) | 24/9/2025 (bài), 9/10/2025 (báo) | Mở bài báo; bài gốc không mở được | ĐL |
| G2 | San Segundo và cộng sự, "Human perception of audio deepfakes: the role of language and speaking style" | https://arxiv.org/abs/2512.09221 | 10/12/2025 | Mở (tóm tắt) | ĐL |
| G3 | Barrington, Cooper, Farid, "People are poorly equipped to detect AI-powered voice clones", Scientific Reports | https://pmc.ncbi.nlm.nih.gov/articles/PMC11958761/ | 31/3/2025 | TK | ĐL |
| G4 | Ahrens-Schwabe và cộng sự, "Who cares about artificial intelligence? Human and artificial voices in audiobooks", Computers in Human Behavior Reports 22 | https://ucrisportal.univie.ac.at/de/publications/who-cares-about-artificial-intelligence-human-and-artificial-voic/ | 5/2026 | Mở (trang cổng nghiên cứu) | ĐL |
| G5 | Edison Research / Spoken, thông cáo về audiobook AI nhiều giọng | https://podnews.net/press-release/edison-spoken | 15/7/2026 | Mở | HÃNG |
| G6 | Tom Webster, "How Do Humans Feel About AI Voices In Podcasting?", Sounds Profitable | https://soundsprofitable.com/article/how-do-humans-feel-about-ai-voices-in-podcasting/ | 24/9/2025 | Mở | ĐL |
| G7 | Radio Ink, "Studies Reveal Growing Listener Disdain For AI Use In Audio" | https://radioink.com/?p=95498 | 26/9/2025 | Mở | ĐL |
| G8 | Adobe Express, khảo sát niềm tin với giọng AI | https://www.adobe.com/express/learn/blog/ai-audio-consumer-trust | 18/2/2026 | Mở | HÃNG |
| G9 | Animoto State of Video 2026 (Businesswire, Quartz) | https://www.businesswire.com/news/home/20260121875037/en | 21/1/2026 | TK (403) | HÃNG |
| G10 | Scientific American, "Hank Green AI controversy raises questions for science communicators" | https://www.scientificamerican.com/article/hank-green-ai-controversy-raises-questions-for-science-communicators/ | 8/8/2026 | Mở | ĐL |
| G11 | Yang, Koriyama, Saito, "Frame-Wise Breath Detection with Self-Training…"; Székely và cộng sự (KTH), "Breathing and speech planning in spontaneous speech synthesis" | https://arxiv.org/abs/2402.00288 ; https://www.speech.kth.se/tts-demos/szekely2020breathing.pdf | 2024; 2020 | TK | ĐL |
| G12 | ElevenLabs, "Prompting Eleven v4" (best practices) | https://elevenlabs.io/docs/best-practices/prompting/eleven-v4 | không ghi | Mở | HÃNG |
| G12b | ElevenLabs, trang giới thiệu Eleven v4 và hướng dẫn thêm khoảng nghỉ | https://elevenlabs.io/v4 ; https://elevenlabs.io/blog/how-to-add-pauses-in-ai-voiceover | không ghi | TK | HÃNG |
| G13 | Respeecher, "How to make AI voice sound human" | https://www.respeecher.com/blog/how-to-make-ai-voice-sound-human | 14/4/2026 | Mở | HÃNG |
| G13b | Blog hướng dẫn hậu kỳ giọng AI (dev.to, CapCut, Podcastle…) | https://dev.to/ezinne_anne/why-your-ai-voiceovers-sounds-robotic-and-how-to-fix-them-4ga3 | không rõ | TK | Blog/HÃNG |
| G14 | Wikipedia "Auto-Tune"; Reverb "Autotuning…"; KaraTuner (arXiv 2110.09121) | https://www.wikipedia.org/wiki/AutoTune ; https://reverb.com/news/autotuning-making-the-most-of-pitch-correction-software ; https://arxiv.org/abs/2110.09121 | nhiều năm | TK | ĐL |
| G15 | Artificial Analysis, Speech Arena Leaderboard | https://artificialanalysis.ai/text-to-speech/leaderboard | cập nhật liên tục | Mở | ĐL |
| G16 | Artificial Analysis, bảng open weights | https://artificialanalysis.ai/text-to-speech/leaderboard/open-weights | cập nhật liên tục | Mở | ĐL |
| G17 | Artificial Analysis, Text to Speech Benchmarking Methodology | https://artificialanalysis.ai/methodology/text-to-speech | không ghi | Mở | ĐL |
| G18 | TTS Arena V2 (Hugging Face) | https://huggingface.co/spaces/TTS-AGI/TTS-Arena-V2 ; https://tts-agi-tts-arena-v2.hf.space/leaderboard | cập nhật liên tục | Mở nhưng bảng trống | ĐL |
| G19 | ElevenLabs Pricing | https://elevenlabs.io/pricing | không ghi | Mở | HÃNG (trang gốc) |
| G20 | ElevenLabs Terms of Use | https://elevenlabs.io/terms-of-use | không ghi | Mở | HÃNG (trang gốc) |
| G21 | Azure Retail Prices API (meter "Text to Speech", eastus) và trang giá Azure Speech | https://prices.azure.com/api/retail/prices ; https://azure.microsoft.com/en-us/pricing/details/speech/ | không ghi | Mở (API trả giá; trang web hiện "$-") | HÃNG (trang gốc) |
| G22 | OpenAI API Pricing | https://developers.openai.com/api/docs/pricing | không ghi | Mở | HÃNG (trang gốc) |
| G23 | Google AI Studio / Gemini API Pricing | https://aistudio.google.com/docs/pricing | không ghi | Mở (đọc 100.000 ký tự đầu) | HÃNG (trang gốc) |
| G24 | Kokoro-82M model card | https://huggingface.co/hexgrad/Kokoro-82M | không ghi | Mở | Trang gốc mô hình |
| G25 | Chatterbox README | https://github.com/resemble-ai/chatterbox | thông báo ngừng 8/2026 | Mở | Trang gốc mô hình |
| G26 | F5-TTS model card | https://huggingface.co/SWivid/F5-TTS | không ghi | Mở | Trang gốc mô hình |
| G27 | Fish Audio Drama 3 model card; báo về giấy phép | https://huggingface.co/fishaudio/drama-3 ; https://www.marktechpost.com/2026/10/14/fish-audio-drama-3-open-weight-tts-model/ | 10/2026 | Model card: mở; LICENSE: 404; báo: TK | Trang gốc + báo |
| G27b | Bài so sánh giấy phép TTS mở (XTTS v2, Fish S2…) | https://localaimaster.com/blog/xtts-coqui-commercial-license | không rõ | TK | Blog |
| G28 | Higgs Audio V3 TTS model card | https://huggingface.co/bosonai/higgs-audio-v3-tts-4b | không ghi | Mở | Trang gốc mô hình |
| G29 | VibeVoice README | https://github.com/microsoft/VibeVoice | ghi chú 5/9/2025 | Mở | Trang gốc mô hình |
| G30 | IndexTTS README | https://github.com/index-tts/index-tts | không ghi | Mở | Trang gốc mô hình |
| G31 | Orpheus TTS README | https://github.com/canopyai/Orpheus-TTS | không ghi | Mở | Trang gốc mô hình |
| G32 | Sesame CSM-1B model card | https://huggingface.co/sesame/csm-1b | không ghi | Mở | Trang gốc mô hình |
| G33 | ElevenLabs Help, "Why does my voice or accent not sound correct after cloning" | https://elevenlabs.io/docs/help-center/product/voices/voice-cloning/why-does-my-voice-or-accent-not-sound-correct-after-cloning.md | không ghi | Mở | HÃNG |
| G34 | ElevenLabs Docs, Eleven v4 | https://elevenlabs.io/docs/overview/capabilities/text-to-speech/eleven-v4.md | không ghi | Mở | HÃNG |
| G35 | ElevenLabs Docs, Professional Voice Cloning | https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/professional-voice-cloning.mdx | không ghi | Mở | HÃNG |
| G36 | ElevenLabs Docs, Voice changer | https://elevenlabs.io/docs/overview/capabilities/voice-changer.md ; https://elevenlabs.io/docs/product-guides/playground/voice-changer | không ghi | Trang đầu: mở; ví dụ accent Anh/Mỹ: TK | HÃNG |
| G37 | Yang và cộng sự, "Acoustic and perceptual differences between standard and accented speech and their voice clones" (IEEE SLT 2026) | https://arxiv.org/abs/2604.01562 | 2/4/2026 | Mở (tóm tắt) | ĐL |
| G38 | Zhou và cộng sự, "Voice 'Cloning' is Style Transfer" | https://arxiv.org/abs/2605.16578 | 15/5/2026 | Mở (tóm tắt) | ĐL |
| G39 | Wikipedia, "Retrieval-based Voice Conversion" | https://en.wikipedia.org/wiki/Retrieval-based_Voice_Conversion | không rõ | TK | ĐL |
| G40 | YouTube Help, "Disclosing use of altered or synthetic content" | https://support.google.com/youtube/answer/14328491?hl=en | không ghi | Mở | Chính sách gốc |
| G40b | Cùng trang trên, phần chỉ thấy qua đoạn trích tìm kiếm | như trên | | TK | Chính sách gốc |
| G41 | YouTube Help, "YouTube channel monetization policies" | https://support.google.com/youtube/answer/1311392?hl=en | thông báo 15/7/2025 | Mở | Chính sách gốc |
| G42 | TechCrunch, "YouTube clarifies policies around AI slop and upsetting videos" | https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/ | 20/7/2026 | Mở | ĐL |
| G43 | PPC Land, "YouTube clarifies inauthentic content policy changes" | https://ppc.land/youtube-clarifies-inauthentic-content-policy-changes/ | 15/7/2025 | Mở | ĐL |
| G44 | 404 Media, "AI Generated 'Boring History' Videos Are Flooding YouTube and Drowning Out Real History" | https://www.404media.co/ai-generated-boring-history-videos-are-flooding-youtube-and-drowning-out-real-history/ | 3/9/2025 | Mở | ĐL |
| G44b | Tường thuật lại bài 404 Media (số người đăng ký Sleepless Historian) | https://www.derstandard.at/story/3000000287806/kigeschichtskanaele-verdraengen-echte-historiker-auf-youtube | 9/2025 | TK | ĐL |
| G45 | Kapwing, "AI Slop Report: The Global Rise of Low-Quality AI Videos" | https://www.kapwing.com/blog/ai-slop-report-the-global-rise-of-low-quality-ai-videos/ | 28/11/2025 | Mở | HÃNG |
| G46 | The Next Web, "YouTube's AI slop purge is punishing the human creators who never showed their faces"; các blog về đợt xử kênh | https://thenextweb.com/news/youtube-ai-slop-crackdown-faceless-creators-collateral-damage ; https://air.io/en/news-air/how-youtube-treats-ai-in-2026-new-update | 15/6/2026 | TK (403) | ĐL (TNW) + blog |
| G46b | Straight Dope, "What's the deal with this YouTube channel? It's AI generated, right?" | https://boards.straightdope.com/t/whats-the-deal-with-this-youtube-channel-its-ai-generated-right/1031709 | không rõ | TK | Diễn đàn |
| G46c | Digital Trends, "YouTube is now asking viewers if videos feel like AI slop" | https://www.digitaltrends.com/movies/youtube-is-now-asking-viewers-if-videos-feel-like-ai-slop/ | 2026 | TK | ĐL |
| G46d | Bài tự kể và blog hãng về đổi giọng AI / giọng thật | https://narrationbox.com/blog/ai-voice-vs-your-own-voice-youtube ; https://www.blackhatworld.com/posts/21081211/ | không rõ | TK | HÃNG / diễn đàn |
| G47 | VO Journey, "Voice Over Rate Guide and Calculator 2026" | https://www.avosjourney.com/voice-over-rate-guide | xem lại 9/2026 | Mở | ĐL (trang đào tạo nghề) |
| G48 | Tin rao Fiverr (voice over, narration) | https://www.fiverr.com/categories/music-audio/voice-overs | không ghi | TK | Sàn |
| G49 | Backstage, "What Is PFH?…"; ACX Help | https://www.backstage.com/magazine/article/pfh-audiobook-rates-explained-76681/ ; https://help.acx.com/s/article/how-royalties-work | không rõ | TK | ĐL |
| G50 | ACX Audio Submission Requirements và bài viết lại | https://help.acx.com/s/article/acx-audio-submission-requirements | 4/2026 (theo nguồn thứ cấp) | TK | Chính sách gốc (chưa mở) |
| G51 | Tubefilter, "YouTube publishes study to show that creators love using AI, actually" | https://www.tubefilter.com/2026/10/22/youtube-culture-and-trends-nrg-survey-generative-ai/amp/ | 22/10/2026 | Mở | ĐL (về khảo sát của HÃNG) |
| G52 | Kotaku, "YouTube mistakenly penalizes popular science channel Kurzgesagt for AI-generated slop" | https://kotaku.com/youtube-mistakenly-penalizes-popular-science-channel-kurzgesagt-for-ai-generated-slop-2000722702 | 2026 | TK (403) | ĐL |
| G53 | Bookingagency.io, "Voiceover Artist Rates 2026" | https://bookingagency.io/blog/voiceover-artist-rates-2026 | 2026 | TK | Blog đại lý |
| G54 | Synthesia Help, "Why is my accent not being captured in my voice clone?" | https://help.synthesia.io/en/articles/9770805-why-is-my-accent-not-being-captured-in-my-voice-clone | không rõ | TK | HÃNG |
