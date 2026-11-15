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

Đã vẽ ngày 15/11/2026 bằng `nguon/tao_wob.py` (toạ độ viết tay, chạy lại ra y hệt; không dùng AI sinh ảnh). Sửa Wob thì sửa script rồi chạy lại: `python3 templates/_shared/wob/nguon/tao_wob.py` (ghi cả `templates/_shared/logo-icon.svg`), rồi chạy `python3 kenh/nhan-dien/nguon/tao_nhan_dien.py` để ảnh đại diện, banner, logo khớp theo.

Các nhóm trong SVG: `chan`, `ba-lo`, `than`, `mat`, `mieng`, `tay`, `phu` (hiệu ứng phụ như sao, mồ hôi, vạch run). Lục địa trên thân là mảng trừu tượng, không phải bản đồ thật.
