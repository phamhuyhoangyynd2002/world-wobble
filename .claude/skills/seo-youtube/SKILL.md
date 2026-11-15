---
name: seo-youtube
description: Viết tiêu đề, mô tả (chương, Sources, ghi công, dòng AI), thẻ, chữ và ý tưởng thumbnail, bình luận ghim cho một tập video dài YouTube của World Wobble từ script.json, báo cáo độ xác thực và ban-quyen.md, ghi out/seo.md. Dùng ở bước 7 của /tao-video hoặc khi cần viết lại tiêu đề, mô tả, thumbnail. Chỉ viết nội dung; việc đăng là của /dang-bai.
argument-hint: "<thư mục dự án>"
---

# Nội dung đăng YouTube

Đầu vào: `$ARGUMENTS`. Việc này nên giao agent `seo-youtube`. Luật: `.claude/rules/video-dai-youtube.md` (tiêu đề, thumbnail), `.claude/rules/chinh-xac-va-ban-quyen.md` mục 7 (nhãn AI).

Đọc: `script.json`, `out/chapters.txt`, `out/ghi-cong.txt`, `out/bao-cao-xac-thuc.md` (nguồn), `ban-quyen.md`, `kenh/ho-so-kenh.md`, tiêu đề các tập trước (`projects/*/out/seo.md`).

## Tiêu đề

- 3 phương án, ≤ 60 ký tự, tiếng Anh, giữ hướng "Why do people live here?" nhưng **không** cùng khuôn với các tập trước (so 4 chữ đầu). Có tên nơi hoặc chi tiết gây tò mò; không giật tít sai nội dung; không cụm cấm.
- Chọn một làm tiêu đề chính, ghi lý do.

## Thumbnail

- 2 phương án: hình nơi đó (ảnh đã dùng trong video) + Wob với biểu cảm khớp phán quyết + tối đa 4 chữ to không lặp tiêu đề. Ghi id ảnh trong manifest, biểu cảm Wob, chữ, bố cục. `/dang-bai` dựng ảnh 1280×720 từ phần này.

## Mô tả (≤ 5000 ký tự)

1. 2 câu mở có từ khoá (tên nơi, "why people live", nước), viết cho người đọc, không nhồi từ khoá.
2. Chương: dán nguyên `out/chapters.txt`.
3. **Sources**: nguồn chính trong báo cáo độ xác thực (ưu tiên nguồn gốc), mỗi dòng "Tiêu đề – Bên đăng – URL". Quá dài thì giữ nguồn của các con số có trong video.
4. **Credits**: dán nguyên `out/ghi-cong.txt` (ảnh Commons, nhạc cần ghi công). Không có thì bỏ mục.
5. Dòng AI bắt buộc (hồ sơ kênh): "Narration voice and illustrations are AI-assisted. Every claim was checked by two independent AI models against the sources listed below." (đặt trước Sources hoặc sửa "below" cho đúng vị trí).
6. Có cảnh AI tái hiện sự kiện có thật (manifest `tai_hien_su_kien`): thêm câu "Scenes depicting <sự kiện> are AI-generated illustrations, not footage."
7. 3 hashtag cuối mô tả (YouTube hiện trên tiêu đề): tên nơi, nước, một hashtag chủ đề.

## Thẻ và cài đặt

- 8–15 thẻ: tên nơi (các cách viết), nước, vùng, "why do people live here", chủ đề (cold town, high altitude…). Thẻ ít tác dụng, không mất thời gian nhiều.
- Danh mục: Education (hoặc Travel & Events nếu đề tài thiên về du lịch). Ngôn ngữ: English. Not made for kids. Nhãn altered/synthetic: có/không và vì sao.

## Bình luận ghim

Một câu hỏi khác câu hỏi cuối video, mời kể kinh nghiệm hoặc gợi ý nơi cho tập sau.

## Ghi `out/seo.md`

```markdown
# SEO: <tiêu đề làm việc>
## Tiêu đề
- Chính: ...
- Phương án: ... / ...
## Thumbnail
- A: ảnh <id> · Wob <biểu cảm> · chữ "<...>" · bố cục ...
- B: ...
## Mô tả
<toàn văn, đúng như sẽ dán>
## Thẻ
...
## Cài đặt
- Danh mục · Ngôn ngữ · Not made for kids · Nhãn altered/synthetic: ... · Phụ đề: out/captions.srt
## Bình luận ghim
...
```

Kiểm: mô tả ≤ 5000 ký tự, có dòng AI, có Sources, có chương bắt đầu 0:00.
