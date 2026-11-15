# Thương hiệu và nội dung gốc

Giá trị cụ thể (tên kênh, lời hứa, Wob, giọng, từ cấm, nhãn AI) nằm trong `kenh/ho-so-kenh.md`. File này là luật áp cho mọi tập.

Nguyên tắc gốc: **giữ chung bộ nhận diện, còn nội dung mỗi tập phải khác nhau thật sự.** YouTube cho phép "same intro, outro, but the bulk of your content is different", và cho phép "using AI to visualize a unique character and narrative you invented", "a series following a set of characters across episodes" (tài liệu mục 2.1). Rủi ro không nằm ở chữ "AI" mà ở dấu hiệu làm hàng loạt.

## Cố định, linh hoạt, không được

| | Cố định (mọi tập) | Linh hoạt (theo nội dung) | Không được |
|---|---|---|---|
| Lời | Giọng deadpan, người kể là kênh; câu hỏi trung tâm "Why do people live here?"; một phán quyết của Wob có lý do; mọi khẳng định có nguồn | Cách mở, cách mồi lại sự chú ý, cấu trúc chương, câu hỏi cuối | Từ cấm của hồ sơ kênh; câu áp được cho mọi nơi; lặp câu mở, câu kết; đùa về người dân |
| Nhân vật | **Wob** (SVG tách bộ phận, cùng tạo hình, cùng bộ biểu cảm): muốn chuyển tới đó sống, rồi bị sự thật thuyết phục đổi ý (hoặc không) | Biểu cảm nào, lúc nào, Wob làm gì ở nơi đó | Tạo Wob bằng AI sinh ảnh; vẽ Wob kiểu khác; dùng nhân vật, meme của người khác |
| Giọng | Một giọng Azure cho cả kênh | Chỗ ngắt, chỗ nhấn | Đổi giọng giữa các tập; giả giọng người thật |
| Hình | Bản đồ vẽ bằng code theo `frame.md`; con dấu phán quyết và chữ ký âm thanh `dau-wob`; logo nhỏ góc trên | Bố cục cảnh, màu phụ theo nơi (lạnh, nóng, sa mạc), ảnh minh hoạ | Intro logo; phong cách vector phẳng giống Kurzgesagt (YouTube từng gắn nhầm là AI slop, tài liệu [E6]); ảnh AI như ảnh chụp |

## Con dấu phán quyết

- Câu hỏi cố định "Would Wob move here?", ba nhãn cố định **WOULD MOVE** / **SUMMER ONLY** / **NOPE**. Không tự đặt nhãn khác.
- Đóng **đúng một lần** mỗi tập, ở cảnh cuối, kèm 1–2 câu lý do. Khai báo bằng trường `verdict` của cảnh trong `script.json`.
- Chữ ký âm thanh `sfx/dau-wob.wav` (dưới 1 giây) chỉ phát cùng con dấu; `build_timeline.py` tự đặt.
- Phán quyết là nhận định của kênh, không phải khẳng định cần kiểm chứng; nhưng các sự thật làm căn cứ cho nó phải nằm trong `claims`.

## Nội dung gốc (quy tắc bắt buộc)

1. Mỗi tập có một **lập luận riêng**: vì sao người ta sống ở nơi này cụ thể (kinh tế, lịch sử, địa chất, văn hoá), không phải danh sách "facts" có thể ghép cho nơi khác.
2. Mỗi tập có ít nhất 3 chi tiết cụ thể, kiểm chứng được, chỉ đúng với nơi đó.
3. Lời đọc nói thêm điều hình không nói; không thuật lại thứ đang hiện trên màn hình. Không trình chiếu ảnh mà lời dẫn mỏng.
4. Không trùng khuôn tiêu đề, câu mở, câu kết với các tập trước; lời đọc không trùng quá 30% với tập nào (`kiem_tra_ban_quyen.py` đo).
5. Đề tài không lấy từ việc chép tiêu đề, khuôn của video khác (tài liệu mục 10: 18 bản chép tiêu đề video con nhện có trung vị 491 lượt xem).
6. `nhat-ky.md` ghi lại quy trình từng tập (nghiên cứu, kiểm chứng, quyết định), làm bằng chứng khi phải kháng nghị YPP.

## Kiểm tra tự động

- `validate_script.py` (bước 1): `verdict` đúng một lần, từ cấm, câu mở/kết lặp, khuôn tiêu đề lặp, câu có số chưa đăng ký khẳng định, chương hợp lệ.
- `doi_chieu.py --cong` (bước 2): cổng kiểm chứng.
- `kiem_tra_ban_quyen.py` (bước 3 và 7): căn cứ tài nguyên, sổ giấy phép, chủ quyền bản đồ, giọng Azure, độ trùng lời đọc.
- Agent `phan-bien-video` hỏi thêm: che tên kênh đi, người xem còn nhận ra đây là World Wobble không?
