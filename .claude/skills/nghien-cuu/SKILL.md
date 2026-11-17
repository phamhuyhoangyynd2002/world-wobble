---
name: nghien-cuu
description: Nghiên cứu một nơi cho tập "Why do people live here?" (lịch sử định cư, kinh tế, khí hậu, địa lý, đời sống, chi tiết bất ngờ, chất liệu hài) và ghi research.md có nguồn cho từng thông tin, ưu tiên nguồn gốc. Dùng ở bước 1 của /tao-video, khi cần tìm hiểu một nơi, hoặc khi người dùng hỏi về một nơi để làm video.
argument-hint: "<tên nơi | thư mục dự án>"
---

# Nghiên cứu một nơi

Đầu vào: `$ARGUMENTS`. Việc này nên giao agent `nghien-cuu-dia-diem`; skill này là cách làm.

## Tìm gì

1. **Câu trả lời cho câu hỏi trung tâm**: vì sao người ta tới đây và vì sao họ ở lại (tài nguyên, tuyến đường, tôn giáo, chính sách, gia đình, việc làm). Đây là xương sống của lập luận; tìm ít nhất 2–3 lý do có nguồn.
2. **Cái giá phải trả**: khí hậu, độ cao, cô lập, chi phí, nguy hiểm. Con số cụ thể có năm.
3. **Đời sống thường ngày**: đi lại, trường học, đồ ăn, internet, nhà cửa. Ưu tiên nguồn từ chính quyền địa phương, báo địa phương, nghiên cứu nhân học.
4. **Chi tiết chỉ đúng với nơi này** (ít nhất 5): thứ người xem sẽ kể lại cho người khác.
5. **Chất liệu hài** (có nguồn): sự tương phản, chuyện vô lý có thật, nơi này so với điều bình thường. Không lấy người dân làm trò cười.
6. **Bản đồ cần vẽ**: toạ độ (lat, lon) của nơi và các điểm liên quan, nước cần tô, khung có chạm vùng Biển Đông hay biên giới tranh chấp không.
7. **Ảnh thật có giấy phép** (nếu cần): chạy `commons.py --search` để biết có ảnh CC BY / CC BY-SA / CC0 dùng được không. Từ 16/11/2026 video là hoạt hình, không đưa ảnh thật vào video: ảnh chỉ để người vẽ tham khảo cho đúng.
8. **Hoạt động và trải nghiệm ở nơi đó** (bắt buộc, 5–8 mục, chốt 17/11/2026): việc có thật người ở đó làm hoặc người tới thăm gặp, mỗi việc ghi: làm gì, mùa nào, ở đâu, nguồn, **trả lời mảnh nào của câu hỏi "vì sao người ta sống ở đây"**, và khuôn chương gợi ý (`.claude/skills/viet-kich-ban/references/cong-thuc-ke-chuyen.md` mục 3). Đây là xương sống chương của biên kịch: mỗi chương là một việc Wob làm hoặc tận mắt thấy.
9. **Chất liệu để vẽ đúng**: nhà cửa (vật liệu, mái, màu), phương tiện, con vật, đồ vật đặc trưng, quần áo người dân (dạng chung), màu đất trời theo mùa, ánh sáng (giờ mặt trời mọc, lặn theo mùa). Có nguồn; người dựng hoạt hình dựa vào đây để không vẽ sai.
10. **So sánh đời thường** (2–4 ứng viên): hình ảnh quen thuộc giải thích được cơ chế của nơi này (tủ đông, ấm nước, xe hơi buổi sáng) mà không làm sai sự thật; ghi cơ chế thật bên cạnh.

## Nguồn

Theo `.claude/rules/chinh-xac-va-ban-quyen.md` mục 2: nguồn gốc → bách khoa uy tín → báo uy tín. Wikipedia chỉ để tìm nguồn gốc ở phần chú thích. Không dùng blog du lịch, video YouTube khác, diễn đàn làm nguồn. Hai nguồn mâu thuẫn thì ghi cả hai.

## Ghi `research.md`

```markdown
# Nghiên cứu: <nơi, nước> · ngày tra YYYY-MM-DD
## Câu trả lời ngắn (3 câu)
## Lý do người ta sống ở đây
- <lý do> — [S1][S3]
## Cái giá phải trả
## Đời sống thường ngày
## Chi tiết chỉ đúng với nơi này
## Chất liệu hài (có nguồn)
## Hoạt động và trải nghiệm
| Hoạt động | Mùa | Ở đâu | Mảnh "vì sao" | Khuôn gợi ý | Nguồn |
## Chất liệu để vẽ đúng
## So sánh đời thường (ứng viên)
## Số liệu
| Số liệu | Giá trị | Năm | Nguồn | Ghi chú (mâu thuẫn, tiêu chí) |
## Bản đồ
- Nơi: lat, lon · nước cần tô (ADM0_A3) · điểm phụ · có chạm vùng Biển Đông/biên giới tranh chấp không
## Ảnh Commons dùng được (nếu có)
## Phán quyết gợi ý của Wob (WOULD MOVE / SUMMER ONLY / NOPE) và lý do
## Nguồn
- S1: <tiêu đề> · <bên đăng> · <loại: goc/bach-khoa/bao/khac> · <ngày đăng> · <URL>
```

Tóm tắt bằng lời của mình, không chép nguyên văn (tối đa một câu trích có nguồn).
