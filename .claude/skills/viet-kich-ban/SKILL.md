---
name: viet-kich-ban
description: Viết hoặc sửa script.json (kịch bản chia cảnh, tiếng Anh) cho một tập video dài World Wobble từ brief.md và research.md, đúng schema (chương, nhịp hình, Wob, con dấu phán quyết, danh sách khẳng định claims), rồi kiểm tra bằng validate_script.py. Dùng mỗi khi cần viết kịch bản, sửa lời đọc, đổi mở đầu, thêm/bớt chương, rút ngắn, làm buồn cười hơn, kể cả khi người dùng chỉ nói "sửa cảnh 3" hay "mở đầu chưa cuốn".
argument-hint: "<thư mục dự án> [góp ý sửa]"
---

# Viết kịch bản

Đầu vào: `$ARGUMENTS`. Việc viết mới nên giao agent `bien-kich-video`. Schema đầy đủ: `references/schema.md`. Văn phong: `.claude/rules/van-phong-loi-doc.md`. Nhịp và cấu trúc: `.claude/rules/video-dai-youtube.md`. Thương hiệu: `.claude/rules/thuong-hieu.md`.

## Cấu trúc mặc định một tập (10–15 phút, khoảng 1.550–2.300 từ)

| Phần | Thời lượng | Việc |
|---|---|---|
| Hook (cảnh 1, chương đầu) | ≤ 15 giây | Câu hỏi hoặc con số của nơi này; Wob quyết định chuyển tới đó sống |
| Lời hứa | 15–40 giây | Người xem sẽ biết điều gì khi xem hết; mở vòng "Would Wob move here?" |
| 4–6 chương | 1,5–3 phút mỗi chương | Mỗi chương một lý do sống ở đây hoặc một cái giá phải trả. Mở bằng câu hỏi nhỏ, đóng bằng phát hiện. Wob đổi ý ít nhất 2 lần trong cả tập |
| Outro | 30–60 giây | Phán quyết (con dấu) + 1–2 câu lý do + ai sẽ thích sống ở đây + câu hỏi kéo bình luận. 20 giây cuối không đặt chữ ở góc phải dưới |

Đây là mặc định ban đầu; đề tài cần thì làm khác và ghi lý do vào `nhat-ky.md`.

## Cách viết

1. **Chốt lập luận trước**: một câu "People live in X because…, despite…". Mọi chương phục vụ câu này.
2. **Lên kế hoạch hình cùng lúc với lời**: mỗi 4–8 giây một nhịp hình (`shots`); bản đồ khi nói tới vị trí, khoảng cách; ảnh minh hoạ khi kể đời sống; thẻ số liệu (`fact:`) khi có con số đáng nhớ. Mỗi nhịp `asset:<id>` đặt id dự kiến (`map-region`, `ai-winter-street`…); agent `thu-thap-tai-nguyen` sẽ tạo đúng id đó.
   - Bản đồ ở cảnh hook: nơi đó phải nằm nửa phải khung (câu hỏi chiếm nửa trái): ghi vào `visual_hint` hoặc ghi chú cho người lấy tài nguyên (`--anchor 1320,560`).
3. **Viết lời**: câu ngắn, số viết bằng chữ, deadpan; punchline thành câu riêng ngắn. Không thuật lại thứ đang hiện trên hình.
4. **Đăng ký khẳng định**: mọi câu có số, ngày, tên riêng mang tính sự thật, kỷ lục, quan hệ nhân quả → một mục trong `claims` (`quote` chép nguyên văn từ lời, `statement` viết đầy đủ có ngữ cảnh). Kỷ lục ghi rõ tiêu chí.
5. **Wob**: 6 biểu cảm gốc; đổi ở chỗ có lý do (gặp sự thật mới), không đổi cho vui. Wob xuất hiện mỗi chương ít nhất một lần.
6. **Phán quyết**: đúng một `verdict` ở cảnh outro; `cue` là chữ trong lời lúc con dấu đóng (thường chính là nhãn).
7. **Chống lặp**: đọc `title`, câu mở, câu kết, `hook_type` của các tập trong `projects/*/script.json`; không lặp.

## Kiểm tra

```bash
python3 .claude/skills/viet-kich-ban/scripts/validate_script.py <thư mục dự án>
```

Hết LỖI mới đi tiếp. CẢNH BÁO thì đọc và sửa cái nào hợp lý; không sửa thì ghi lý do vào `nhat-ky.md`.

## Sửa theo góp ý

Sao lưu `script.v<N>.json`, sửa đúng phần được góp ý, validate lại. Khẳng định bị đổi `statement` phải kiểm chứng lại cả hai vòng (skill `/kiem-chung`, `--only`). Chỉ báo lại phần đã đổi.
