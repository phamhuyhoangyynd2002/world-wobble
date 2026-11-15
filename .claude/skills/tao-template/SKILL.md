---
name: tao-template
description: Tạo mới hoặc sửa template HyperFrames khung ngang 1920×1080 của World Wobble (explainer và các biến thể), runtime ww.js, kiểu ww.css: bố cục cảnh, chuyển động ảnh, bản đồ, Wob, con dấu, thẻ chương, phụ đề. Dùng khi muốn đổi phong cách, thêm kiểu cảnh (so sánh hai nơi, biểu đồ khí hậu, dòng thời gian), thêm hiệu ứng, hoặc sửa lỗi hiển thị.
argument-hint: "<tên template> [yêu cầu]"
---

# Tạo, sửa template

Đầu vào: `$ARGUMENTS`. Đọc trước: `.claude/rules/template-hyperframes.md`, `templates/_shared/frame.md`; nếu đã cài plugin `hyperframes`, skill `/hyperframes-core`.

## Cấu trúc

- `templates/_shared/ww.js`: runtime dùng chung (đọc `#ww-data`, dựng cảnh, nhịp hình, nhãn bản đồ, Wob, con dấu, chương, phụ đề, một timeline GSAP). Thêm kiểu cảnh mới bằng hàm dựng mới trong file này hoặc file riêng nạp sau nó.
- `templates/_shared/ww.css`: kiểu dùng chung, biến màu theo `frame.md`.
- `templates/explainer/index.html`: composition mỏng, chỉ nạp file và gọi `WW.run`.
- Thêm trường dữ liệu mới: khai báo ở `viet-kich-ban/references/schema.md`, kiểm ở `validate_script.py`, chép sang timeline ở `build_timeline.py`, rồi mới dùng trong template.

## Quy trình

1. Sửa ở `templates/`, không sửa trong `projects/*/render/`.
2. Dùng một dự án mẫu (hoặc tạo dự án thử trong `projects/_thu-nghiem/` với giọng nháp Edge), chạy `prepare_render.py` → `npx hyperframes@0.8.85 check` (0 lỗi) → `snapshot` → mở bảng ảnh bằng Read.
3. Kiểm: khung 0 có hình và câu hỏi; chữ ≥ cỡ tối thiểu; vùng an toàn; không lớp nào che chữ ngoài ý muốn (lỗi `text_occluded` của `check`); tương phản ≥ 3:1; 20 giây cuối góc phải dưới trống.
4. Nhớ: mỗi cảnh là một lớp xếp chồng riêng (`.ww-scene` có `isolation: isolate`), nên `z-index` bên trong cảnh không vượt lên logo, con dấu, chương. Lớp phủ toàn video đặt `z-index` riêng trong `ww.css`.
5. Xoá `projects/_thu-nghiem/` sau khi xong (không commit dự án thử).
