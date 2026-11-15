# Video dài khung ngang cho YouTube

Định dạng chính của kênh là **video dài 16:9, 10–15 phút** trên YouTube. Shorts chỉ cắt từ video dài để kéo người xem, không phải sản phẩm chính (hồ sơ kênh).

> Các ngưỡng nhịp, cỡ chữ ở file này là **mặc định ban đầu**, chưa có số liệu của chính kênh. Sau 3–5 video, `/phan-tich-hieu-qua` chỉnh lại theo đường giữ chân người xem thật và ghi vào `kenh/bai-hoc.md`.

## Thông số

| Mục | Giá trị |
|---|---|
| Khung hình | 1920×1080, 16:9, 30 fps, H.264 + AAC |
| Độ dài | 10–15 phút. Dưới 8 phút thì YouTube không cho chèn quảng cáo giữa video |
| Âm lượng | Khoảng −14 LUFS, true peak ≤ −1 dBTP (`mix_audio.py`) |
| Đầu ra | `out/video.mp4` (có nhạc), `out/video-no-music.mp4`, `out/captions.srt`, `out/chapters.txt` |

## Vùng an toàn và cỡ chữ (xem trên TV)

Nhiều người xem trên TV (YouTube chiếm 15,8% thời gian xem TV ở Mỹ, Nielsen 08/2026, tài liệu mục 4.3). Video phải **nghe được mà không cần nhìn**, và chữ phải đọc được từ sofa.

- Chữ quan trọng nằm trong vùng an toàn chữ: chừa **96px** trái phải, **54px** trên dưới (5% mỗi cạnh). Góc phải dưới chừa thêm cho màn hình kết thúc (end screen) ở 20 giây cuối: khu vực x > 1150, y > 560 không đặt chữ.
- Cỡ chữ tối thiểu ở khung 1920×1080: tiêu đề cảnh ≥ 72px, chữ phụ ≥ 40px, nhãn bản đồ ≥ 34px, phụ đề đốt vào hình (nếu bật) ≥ 46px.
- Mỗi lúc một khối chữ mới ngoài phụ đề. Chữ trên hình là điểm nhấn (con số, tên nơi), không chép lời đọc.

## Cấu trúc giữ chân người xem

- **10 giây đầu vào thẳng câu hỏi** (hồ sơ kênh): khung đầu đã có hình nơi đó và câu hỏi; không chào, không giới thiệu kênh, không logo intro, không màn đen.
- **Khoảng 30 giây đầu hứa một điều cụ thể** người xem sẽ biết khi xem hết, và đặt Wob vào thế muốn chuyển tới đó sống (mở vòng tò mò: "Would Wob move here?").
- **Thân bài chia chương** (YouTube chapters): mỗi chương một lý do khiến người ta sống ở đó hoặc một nỗi khổ phải chịu. Chương đầu ở 0:00, ít nhất 3 chương, mỗi chương ≥ 10 giây (điều kiện YouTube hiện chương). Mỗi chương mở bằng một câu hỏi nhỏ và đóng bằng một phát hiện.
- **Mồi lại sự chú ý mỗi 60–90 giây** (mặc định ban đầu): một bất ngờ, một lần Wob đổi ý, một câu hỏi mới. Không để một ý kéo quá 2 phút.
- **Hình luôn có chuyển động**: ảnh tự trôi chậm, bản đồ zoom, Wob phản ứng. Mặc định đổi hình mỗi 4–8 giây; `build_timeline.py` cảnh báo nhịp đứng quá 10 giây.
- **Kết**: con dấu phán quyết "Would Wob move here?" (WOULD MOVE / SUMMER ONLY / NOPE) + 1–2 câu lý do + một câu hỏi kéo bình luận. 20 giây cuối để trống góc cho end screen; không để im lặng ở cuối.
- Lời kêu gọi ngắn, một lần, không nài: không "smash that like button", không xin đăng ký ở đầu video.

## Tiêu đề, thumbnail

Với video dài, tỉ lệ nhấp thumbnail quyết định nhiều hơn video ngắn (video không tự phát trong feed).

- Tiêu đề giữ đúng hướng của giai đoạn (giai đoạn 1: "Why do people live here?") để YouTube hiểu kênh, nhưng **không dùng một khuôn tiêu đề cho mọi tập** (dấu hiệu "made with a template"). Tối đa 60 ký tự để không bị cắt trên TV, điện thoại.
- Thumbnail: một hình nơi đó dễ nhận ra + Wob với biểu cảm khớp phán quyết dự kiến + tối đa 3–4 chữ to. Chữ thumbnail không lặp tiêu đề. Không giật tít sai nội dung.
- Không dùng các cụm trong danh sách cấm của hồ sơ kênh ("you won't believe", "insane", "shocking", "nobody talks about").

## Shorts cắt từ video dài

- Chỉ cắt từ video dài đã đăng, chọn đoạn tự đứng được 30–60 giây, dựng lại khung 9:16 (không chỉ thêm viền). Cuối Shorts dẫn về video dài.
- Mỗi Shorts vẫn phải có nội dung đã kiểm chứng như bản dài; không thêm khẳng định mới.
- TODO: skill cắt Shorts khi đã có 3–5 video dài.

## Tần suất

- 1 video mỗi tuần trong 3 tháng đầu (hồ sơ kênh). Đều đặn quan trọng hơn dồn nhiều video một lúc; YouTube soi kênh đăng dày theo khuôn.
