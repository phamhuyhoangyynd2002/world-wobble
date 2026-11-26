---
name: viet-kich-ban
description: Viết hoặc sửa script.json (kịch bản chia cảnh, tiếng Anh) cho một tập video dài World Wobble từ brief.md và research.md, đúng schema (chương, nhịp hình, Wob, con dấu phán quyết, danh sách khẳng định claims), rồi kiểm tra bằng validate_script.py. Dùng mỗi khi cần viết kịch bản, sửa lời đọc, đổi mở đầu, thêm/bớt chương, rút ngắn, làm buồn cười hơn, kể cả khi người dùng chỉ nói "sửa cảnh 3" hay "mở đầu chưa cuốn".
argument-hint: "<thư mục dự án> [góp ý sửa]"
---

# Viết kịch bản

Đầu vào: `$ARGUMENTS`. Việc viết mới nên giao agent `bien-kich-video`. Schema đầy đủ: `references/schema.md`. **Công thức kể chuyện "Wob kể chuyến đi"** (nhịp chương, 8 khuôn chương, kho gag, mở/kết, ngôi thứ nhất): `references/cong-thuc-ke-chuyen.md`. Văn phong: `.claude/rules/van-phong-loi-doc.md`. Nhịp và cấu trúc: `.claude/rules/video-dai-youtube.md`. Thương hiệu: `.claude/rules/thuong-hieu.md`.

## Cấu trúc mặc định một tập (10–15 phút, khoảng 1.550–2.300 từ)

| Phần | Thời lượng | Việc |
|---|---|---|
| Hook (cảnh 1, chương đầu) | ≤ 15 giây | Wob ở bàn cầm một kỷ vật lạ của nơi này + một con số + câu hỏi trung tâm (định dạng cũ: Wob quyết định chuyển tới đó sống) |
| Lời hứa | 15–40 giây | Người xem sẽ biết điều gì khi xem hết; mở vòng "Would Wob move here?" |
| 4–6 chương | 1,5–3 phút mỗi chương | Mỗi chương một lý do sống ở đây hoặc một cái giá phải trả. Mở bằng câu hỏi nhỏ, đóng bằng phát hiện. Wob đổi ý ít nhất 2 lần trong cả tập |
| Outro | 30–60 giây | Phán quyết (con dấu) + 1–2 câu lý do + ai sẽ thích sống ở đây + câu hỏi kéo bình luận. |
| Đuôi tập (`duoi`) | 15–20 giây | Bắt buộc từ tập 3, ngay sau outro: cất kỷ vật lên kệ → nhìn lại tập trước → nhá tập sau; 25–50 từ, không con số; trường `duoi`. Xem skill [mo-ket](../mo-ket/SKILL.md) |

Đây là mặc định ban đầu; đề tài cần thì làm khác và ghi lý do vào `nhat-ky.md`.

## Cách viết

1. **Chốt lập luận trước**: một câu "People live in X because…, despite…". Mọi chương phục vụ câu này.
1b. **Viết cho hoạt hình** (mặc định từ 17/11/2026, video dựng bằng `/dung-hoat-hinh`): mỗi cảnh có `lop` (`hien-tai` | `hoi-uc`), lời ngôi thứ nhất; mỗi chương một hoạt động có thật và một `khuon` (≥ 4 khuôn khác nhau, hai chương liền không cùng khuôn); `y_hinh` ghi ý hình và gag cùng lúc với lời (mỗi câu phải vẽ được; đạo cụ mang câu đùa). Khuôn chương quyết định cách dựng: đạo diễn chọn phong cách và thẻ cảnh (`templates/hoat-hinh/_the-canh/`) theo khuôn. Với video hoạt hình, `shots` chỉ còn dùng cho bản đồ và ảnh nền (nếu có); thẻ số liệu và chữ to giữa màn hình bỏ, con số nằm trên đồ vật trong cảnh.
2. **Lên kế hoạch hình cùng lúc với lời**: mỗi 4–8 giây một nhịp hình (`shots`); bản đồ khi nói tới vị trí, khoảng cách; ảnh minh hoạ khi kể đời sống; thẻ số liệu (`fact:`) khi có con số đáng nhớ. Mỗi nhịp `asset:<id>` đặt id dự kiến (`map-region`, `ai-winter-street`…); agent `thu-thap-tai-nguyen` sẽ tạo đúng id đó.
   - Bản đồ ở cảnh hook: nơi đó phải nằm nửa phải khung (câu hỏi chiếm nửa trái): ghi vào `visual_hint` hoặc ghi chú cho người lấy tài nguyên (`--anchor 1320,560`).
   - **Chấm hạng mọi ảnh AI** (chốt 17/11/2026): mỗi id `ai-…` một mục trong `anh_ai`, gồm `canh` (tả cảnh tiếng Anh), `diem` theo 4 tiêu chí (`vi_tri`, `thoi_luong`, `cu_the`, `tieu_diem`, mỗi tiêu chí 0–2), và `hang`. Hạng `chinh` tạo bằng nguồn ngoài (lượt có hạn); hạng `phu` tạo nội bộ bằng ComfyUI. Luật và ví dụ: `references/hang-anh.md`. Gom chi tiết riêng của nơi đó vào ít ảnh chính (mặc định ≤ 6 mỗi tập); ảnh phụ chỉ tả không khí chung, vì mô hình nội bộ hay vẽ sai đồ vật, con vật cụ thể.
3. **Viết lời**: câu ngắn, số viết bằng chữ, deadpan; punchline thành câu riêng ngắn. Không thuật lại thứ đang hiện trên hình.
4. **Đăng ký khẳng định**: mọi câu có số, ngày, tên riêng mang tính sự thật, kỷ lục, quan hệ nhân quả → một mục trong `claims` (`quote` chép nguyên văn từ lời, `statement` viết đầy đủ có ngữ cảnh). Kỷ lục ghi rõ tiêu chí.
5. **Wob**: 6 biểu cảm gốc; đổi ở chỗ có lý do (gặp sự thật mới), không đổi cho vui. Wob xuất hiện mỗi chương ít nhất một lần.
6. **Phán quyết**: đúng một `verdict` ở cảnh outro; `cue` là chữ trong lời lúc con dấu đóng (thường chính là nhãn).
6b. **Không lộ đáp án sớm** (27/11/2026): hook và lời hứa chỉ treo câu hỏi + manh mối bằng hình (kỷ vật), không nói lời giải chính. Lời giải đặt ở chương thân thứ nhất hoặc thứ hai (~2:00–3:30), sau ít nhất một giả thuyết sai của Wob. Khai `dap_an_chinh` (schema). Chi tiết: `references/cong-thuc-ke-chuyen.md` mục 5.
7. **Chống lặp**: đọc `title`, câu mở, câu kết, `hook_type` của các tập trong `projects/*/script.json`; không lặp.

## Kiểm tra

```bash
python3 .claude/skills/viet-kich-ban/scripts/validate_script.py <thư mục dự án>
```

Hết LỖI mới đi tiếp. CẢNH BÁO thì đọc và sửa cái nào hợp lý; không sửa thì ghi lý do vào `nhat-ky.md`.

## Sửa theo góp ý

Sao lưu `script.v<N>.json`, sửa đúng phần được góp ý, validate lại. Khẳng định bị đổi `statement` phải kiểm chứng lại cả hai vòng (skill `/kiem-chung`, `--only`). Chỉ báo lại phần đã đổi.
