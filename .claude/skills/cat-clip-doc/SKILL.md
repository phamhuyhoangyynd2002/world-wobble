---
name: cat-clip-doc
description: Cắt clip dọc 9:16 (1080×1920, 30–60 giây) từ video dài đã làm xong của World Wobble cho YouTube Shorts, TikTok, Instagram Reels, Facebook Reels, với cổng bắt buộc cho 5 giây đầu (câu mở tự đứng được, khung 0 có hình, tiếng vào ngay, có chuyển động, không kêu gọi rời clip sớm). Gợi ý đoạn theo timeline.json, dựng lại bố cục dọc (câu mồi, cảnh 4:3, phụ đề từng từ, Wob, thẻ cuối dẫn về bản dài), kiểm tự động bằng kiem_5_giay.py rồi xem từng khung. Dùng khi người làm kênh nói "cắt Shorts", "làm clip TikTok/Reels", "clip dọc", "video ngắn", hoặc sau khi một tập đã có out/video.mp4.
argument-hint: "<thư mục dự án> [--so 5] [--chi k1,k3]"
---

# Cắt clip dọc từ video dài

Đầu vào: `$ARGUMENTS`. Luật: `.claude/rules/video-dai-youtube.md` mục "Shorts cắt từ video dài". Tóm tắt: chỉ cắt từ video dài; đoạn tự đứng được; dựng lại khung 9:16, không chỉ thêm viền; dẫn về bản dài; **không thêm khẳng định mới**.

## Vì sao 5 giây đầu là cổng cứng (chốt 23/11/2026, người làm kênh yêu cầu)

Trên Shorts, TikTok, Reels, người xem đang vuốt và quyết định ở lại hay đi trong 1–3 giây đầu. Mất họ ở đây thì phần còn lại hay đến mấy cũng không ai xem. Video dài của kênh mở chậm (Wob ở bàn kỷ vật) vì người xem đã chọn bấm vào; clip ngắn thì không ai chọn, nên không được mở chậm.

Trong 5 giây đầu, người xem phải tự trả lời được ba câu:
1. **Tôi đang thấy gì?** Khung 0 có cảnh rõ, có Wob hoặc vật lạ, không giấy trống, không màn đen, không chuyển cảnh.
2. **Sao tôi phải quan tâm?** Câu mở là câu hỏi, một con số, một vật lạ ("This is a fish."), hoặc Wob làm một việc cụ thể. Câu mồi trên đầu thêm một điều lời chưa nói.
3. **Sắp có gì?** Câu thứ hai là twist ngắn hoặc mở ra một câu hỏi; không có lời kêu gọi đi chỗ khác.

## Điều kiện trước

- Dự án có `out/video.mp4` bản cuối (tập đã giao: video ở `D:/YouTube/world-wobble/video/tap-NN-<slug>/video.mp4`, xem `out/VIDEO-O-DIA-D.md`; clip dọc xuất ra cùng thư mục đó, thư mục con `clip-doc/`) và `timeline.json` khớp video đó (video hoạt hình: đã chạy `xuat_timeline.py` của `dung-hoat-hinh`, vì `build_timeline.py` lệch mốc).
- `out/bao-cao-xac-thuc.md` kết luận ĐẠT: clip chỉ dùng lời đọc đã kiểm chứng.
- FFmpeg có libass, Chrome hoặc Edge, Python có Pillow.

## Các bước

### 1. Gợi ý đoạn

```bash
python .claude/skills/cat-clip-doc/scripts/goi_y_clip.py <dự án> --so 5
```

Ghi `out/clip-doc/goi-y.json` và `out/clip-doc/ke-hoach.json` (đã có thì không ghi đè; xoá đi nếu muốn sinh lại). Script **loại hẳn** mốc có câu mở lỗi, mốc nói dưới 8 từ trong 5 giây đầu, mốc có khung đầu trống (đo trên video). Điểm câu mở nhân đôi so với phần thân. Đọc dòng "đã loại" để biết lọc bao nhiêu.

### 2. Biên tập kế hoạch (`ke-hoach.json`): việc của Claude, làm kỹ từng clip

Đọc `text` của mỗi clip như một người chưa xem bản dài, rồi quyết:

**a. Câu mở.** Luật tự động ở `scripts/mo_dau.py`. Ngoài ra tự hỏi: câu đầu có nhắc tới thứ gì người xem chưa biết không ("Why a monument?" chỉ ổn nếu khung 0 đang thấy đài tưởng niệm)? Nếu cần, dời `start` sang câu khác (mốc lấy ở `timeline.json` → `captions[].words[0].start` trừ 0,08 s). Không cắt giữa câu.

**b. Teaser (tuỳ chọn).** Khi câu mở đúng luật nhưng chưa mạnh (không có số, không có vật lạ, không có câu hỏi), đặt `teaser: {"tu": …, "den": …}`, là một câu đắt **trong chính đoạn đó**, dài 0,8–4 giây, lên đầu clip. `goi_y_teaser` là gợi ý của script; chỉ dùng khi câu đó tự hiểu được khi đứng đầu (không "it", "that", "the same"). Câu mở đã mạnh thì để `teaser: null`, vì teaser làm clip dài thêm và lặp lời.

**c. Câu mồi `tieu_de`** (chữ trên đầu, có từ khung 0):
- ≤ 7 từ, ≤ 38 ký tự; đọc xong trong khoảng 1,5 giây;
- **không lặp lại câu mở** (script chặn khi trùng ≥ 80% từ): câu mồi phải thêm tò mò hoặc lý do xem tiếp. Ví dụ: câu mở "I asked for a bag." → câu mồi "Why my fish didn't need a bag";
- ý lấy từ lời của đoạn, không giật tít sai; có con số thì số đó phải nằm trong một khẳng định của đoạn (`claims`); không từ cấm (`van-phong-loi-doc.md`, `mo_dau.py`).

**d. Khung cảnh.** Mặc định cắt 4:3 ở giữa (`crop_x: 0.5`), bắt đầu từ y = 140 để không lấy logo góc của bản dài. Chủ thể lệch thì đặt `crop_x` 0–1. Cảnh có chữ, số, bản đồ, nhãn sát mép trái phải thì đặt `toan_canh: true`. Đầu nhân vật bị cụt thì đặt `giu_tren: true` và chọn `crop_x` tránh góc phải.

**e. Wob ở góc dưới (`wob`).** Chọn biểu cảm hợp cảm xúc của đoạn (`templates/_shared/wob/README.md`). Năm clip của một tập không dùng trùng một biểu cảm.

**f. Bỏ đoạn ở chương cuối**, vì nó lộ phán quyết và người xem khỏi cần xem bản dài. Mỗi tập chọn các đoạn khác chương nhau.

### 3. Dựng

```bash
python .claude/skills/cat-clip-doc/scripts/dung_clip_doc.py <dự án> [--chi k1,k3]
```

Script chặn (không dựng) clip có câu mở lỗi, câu mồi lỗi hoặc trùng câu mở, teaser nằm ngoài đoạn. Mỗi clip ra:
- `<id>.mp4`;
- `<id>-5giay.jpg`: 8 khung ở các mốc 0; 0,5; 1; 1,5; 2; 3; 4; 5 giây;
- `<id>-khung.jpg`: 4 khung rải phần còn lại;
- `<id>.md`: chữ đăng.

Xử lý 5 giây đầu có sẵn trong dựng:
- khung 0 đã có cảnh, câu mồi, phụ đề, Wob;
- tiếng vào ngay (fade 40 ms);
- cảnh phóng 1,07 rồi lùi về 1,0 trong 5 giây, để luôn có chuyển động;
- dòng "Full trip on YouTube" chỉ hiện sau giây thứ 5;
- mốc thời gian đặt lại về 0 sau khi tua, để không hụt khung đầu.

### 4. Cổng 5 giây đầu (tự động, bắt buộc)

```bash
python .claude/skills/cat-clip-doc/scripts/kiem_5_giay.py <dự án>
```

Script đo trên file mp4, không dựa vào kế hoạch. Mã 0 là đạt.

| Mục | Đạt khi |
|---|---|
| A. Tiếng | Âm vượt −35 dBFS trước 0,35 s |
| B. Khung 0 | Vùng cảnh có độ lệch sáng ≥ 14, giấy trống < 85% |
| C. Chuyển động | TB chênh lệch khung cách 0,5 s ≥ 1,2; không đứng hình > 1 s |
| D. Lời | ≥ 8 từ trong 5 giây đầu |
| E. Câu mở, câu mồi | Đúng luật `mo_dau.py`, câu mồi không lặp câu mở |
| F. Lời kêu gọi | Không hiện trước giây 5 |

Có LỖI thì sửa kế hoạch rồi dựng lại clip đó. Lần thử đầu, cổng này bắt được khung 0 đen ở cả 5 clip (lỗi mốc thời gian); đừng bỏ qua nó.

### 5. Xem bằng mắt (bắt buộc, cổng tự động không thay được)

Mở **từng** `<id>-5giay.jpg` bằng Read. Mỗi khung kiểm:
- Khung 0 tự kể được chuyện: thấy Wob hoặc vật lạ, đúng thứ câu mở nói tới.
- Trong 5 giây không có cảnh trống (trang giấy đang vẽ dở, chuyển cảnh), không có Wob bị cắt nửa người ở mép, không có chữ trong cảnh bị cắt ("Arctic Circl…").
- Câu mồi không vỡ dòng xấu (một chữ đứng riêng một dòng), không đè thanh trên của ứng dụng.
- Phụ đề khớp lời, không tràn hai bên.

Rồi mở `<id>-khung.jpg`: phần sau không có lỗi cắt khung, và thẻ cuối phủ kín.

Ghi cho từng clip một dòng "ĐẠT" hoặc "sửa gì". Lỗi thì sửa kế hoạch rồi dựng lại riêng clip đó (`--chi`), tối đa 3 vòng; quá 3 vòng thì bỏ clip đó, chọn đoạn khác trong `goi-y.json`.

Lỗi mắt đã gặp (23/11/2026, tập Oymyakon):
- k3: giây thứ 2 sang trang giấy vẽ dở, Wob cụt ở mép, nên chuyển `toan_canh`;
- k4: chữ "Arctic Circle" cụt ở mép phải, nên đặt `crop_x` 0,75;
- k5: câu mồi trùng câu mở, nên viết lại (từ đó có luật tự động).

### 6. Ghi nhật ký

Mỗi clip một dòng trong `nhat-ky.md` của dự án: đoạn (mốc), câu mở, câu mồi, teaser, khung, kết quả cổng, lỗi mắt đã sửa.

## Đăng

Skill này chỉ dựng file, không đăng. Đăng Shorts qua YouTube Studio (người làm kênh tự kéo file, hoặc `/dang-bai` khi được gọi); điền link video dài vào `<link video dài>` trong `<id>.md`.

Nhịp gợi ý (mặc định ban đầu): 2–3 clip mỗi tập, đăng rải 1 clip mỗi 1–2 ngày sau video dài, cùng clip lên TikTok và Reels. Nhãn AI: ghi trong chú thích; chỉ bật nhãn "altered or synthetic" khi có cảnh trông như thật về người hoặc sự kiện có thật.

Sau khi có số liệu (tỉ lệ xem qua 3 giây, % xem hết), ghi vào `kenh/bai-hoc.md` và chỉnh các ngưỡng trong `mo_dau.py`, `kiem_5_giay.py`.

## File

| File | Việc |
|---|---|
| `scripts/mo_dau.py` | Luật câu mở, câu mồi (dùng chung) |
| `scripts/goi_y_clip.py` | Gợi ý đoạn, lọc 5 giây đầu, gợi ý teaser |
| `scripts/dung_clip_doc.py` | Dựng clip, chặn kế hoạch lỗi, xuất tờ khung |
| `scripts/kiem_5_giay.py` | Cổng 5 giây đầu đo trên mp4 |
