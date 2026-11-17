# Chấm hạng ảnh AI (`anh_ai`)

> Chốt 17/11/2026. Lượt ảnh của nguồn ngoài có hạn (ChatGPT Free vài ảnh/ngày; Gemini API tốn tiền), nên mỗi ảnh AI được chấm điểm ngay lúc viết kịch bản:
> - **Ảnh chính**: tạo bằng nguồn ngoài.
> - **Ảnh phụ**: tạo nội bộ bằng ComfyUI trên máy (miễn phí, không giới hạn lượt).
>
> Luật tính nằm ở `.claude/skills/lay-tai-nguyen/scripts/hang_anh.py`; sửa luật thì sửa cả file đó và file này.

## Vì sao chia như vậy

Thử ngày 17/11/2026 trên cùng prompt (`docs/thu-nghiem-comfyui-2026-11-17.md`):

| | Nội bộ (SDXL trên ComfyUI) | Nguồn ngoài (ChatGPT/Gemini) |
|---|---|---|
| Phong cách risograph, bảng màu kênh | Rất đúng | Hay lệch màu (trời cam, nước xanh dương) |
| Phong cảnh, không khí (đồi tuyết, rừng, làng nhìn xa) | Tốt | Tốt |
| Đồ vật, con vật, hành động cụ thể | **Hay sai**: nhà xí thành nhà ở, tuần lộc thành hươu đỏ, ngựa Yakut lông xù thành ngựa thường, không có khói, suối bốc hơi | Đúng |
| Chừa trống 1/3 trái cho chữ | Không theo | Theo |
| Giá, lượt | Miễn phí, khoảng 45 giây/ảnh, không giới hạn | Vài ảnh/ngày, hoặc khoảng 0,04–0,07 USD/ảnh |

Vậy: ảnh cần **đúng chi tiết** hoặc **được nhìn nhiều** thì dùng nguồn ngoài; ảnh **chỉ tạo không khí** thì tạo nội bộ.

## Bốn tiêu chí (mỗi tiêu chí 0–2 điểm)

| Tiêu chí | 2 | 1 | 0 |
|---|---|---|---|
| `vi_tri`: ảnh xuất hiện ở đâu | Cảnh hook / 10 giây đầu, ứng viên thumbnail, cảnh phán quyết | Mở chương | Giữa chương |
| `thoi_luong`: tổng thời gian trên hình | > 15 giây, hoặc dùng lại ở ≥ 2 cảnh | 6–15 giây | < 6 giây |
| `cu_the`: phải vẽ đúng tới đâu | Phải có đúng đồ vật, con vật, hành động, công trình chỉ có ở nơi đó, và lời đọc nhắc tới | Có vài chi tiết riêng nhưng sai một chút vẫn được | Phong cảnh, trời, rừng, tuyết, không khí chung |
| `tieu_diem`: mắt người xem ở đâu | Hình chính đầy khung, mắt dừng ở đó | Phông sau lưng Wob đang diễn | Lớp xa, nền mờ, khung chuyển cảnh |

## Quy ra hạng

1. `cu_the = 2` → **chính** (nội bộ hay vẽ sai chi tiết).
2. `vi_tri = 2` → **chính**.
3. Còn lại: tổng ≥ 5 → **chính**, dưới 5 → **phụ**.

Hạng khai báo phải khớp hạng tính. Muốn khác (ví dụ ảnh phụ nhưng là cảnh duy nhất của một chương quan trọng) thì ghi lý do vào `ghi_de`; `validate_script.py` báo LỖI nếu lệch mà không có `ghi_de`.

## Cách viết để tiết kiệm lượt ngoài

- **Mỗi chi tiết riêng một ảnh chính**: gom đồ vật cụ thể vào ít ảnh chính, phần không khí xung quanh để ảnh phụ.
- **Ảnh phụ tả cảnh chung chung**: "snowy larch valley at dawn, frost haze", không nhắc con vật hay đồ vật mà mô hình nội bộ dễ vẽ sai.
- Đồ vật, con vật cần đúng mà có thể vẽ bằng SVG (thư viện đạo cụ hoạt hình) thì vẽ SVG đặt lên ảnh phụ, khỏi tốn ảnh chính.
- Dự kiến một tập: **khoảng 4–6 ảnh chính**, phần còn lại là ảnh phụ. `validate_script.py` cảnh báo khi ảnh chính vượt `ANH_CHINH_TOI_DA` (mặc định 6, đổi trong `.env`).

## Ví dụ (Oymyakon)

| id | Cảnh | vi_tri | thoi_luong | cu_the | tieu_diem | Hạng |
|---|---|---|---|---|---|---|
| `ai-village-dusk` | Hook: làng gỗ chạng vạng, khói thẳng, tuần lộc uống ở suối bốc hơi | 2 | 2 | 2 | 2 | chính |
| `ai-outhouse` | Nhà xí gỗ ngoài sân tuyết | 0 | 1 | 2 | 2 | chính (cu_the = 2) |
| `ai-larch-valley` | Thung lũng rừng thông rụng lá phủ sương băng, sau lưng Wob đi bộ | 0 | 1 | 0 | 1 | phụ (tổng 2) |
| `ai-snow-hills-far` | Lớp xa: đồi tuyết dưới trời xanh nhạt | 0 | 2 | 0 | 0 | phụ (tổng 2) |
| `ai-summer-valley` | Mở chương mùa hè: thung lũng xanh, sông lặng | 1 | 2 | 0 | 2 | chính (tổng 5) |
