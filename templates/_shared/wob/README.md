# Wob

Mỗi biểu cảm là một file SVG cùng khung (khuyên dùng viewBox vuông, nhân vật đứng chạm đáy), tên đúng như trường `bieu_cam` trong `script.json`:

| File | Biểu cảm |
|---|---|
| `hao-hung.svg` | hào hứng, muốn chuyển tới ngay |
| `lanh-run.svg` | lạnh run |
| `nong-chay.svg` | nóng chảy |
| `soc.svg` | sốc |
| `ngam-nghi.svg` | ngẫm nghĩ |
| `dong-goi.svg` | đóng gói ba lô (rời đi) |

TODO (hồ sơ kênh): vẽ Wob bằng SVG tách bộ phận (thân, mắt, miệng, tay, chân, ba lô). Không tạo Wob bằng AI sinh ảnh, để tập nào Wob cũng giống hệt nhau. Khi chưa có file, template bỏ qua lớp Wob và in cảnh báo; `prepare_render.py` liệt kê các biểu cảm đã có vào dữ liệu render.
