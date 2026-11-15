# Browser MCP: những điều dùng chung

Chép từ GameReel (rút từ lần đăng đầu tiên 13/11/2026). World Wobble chỉ đăng YouTube; các đoạn nhắc TikTok, Facebook giữ lại vì là kinh nghiệm về cách Browser MCP xử lý form, không phải việc phải làm. Đọc trước khi mở YouTube Studio.

## Chọn đúng profile Chrome

- `tab list` liệt kê tab của mọi trình duyệt đang nối, gắn nhãn `[Chrome]`, `[Chrome 2]`, `[Chrome 3]`… Nhãn có thể đổi giữa các phiên, nên đừng tin nhãn trong `kenh/ho-so-kenh.md` hơn những gì thấy trên trang.
- Mở tab mới ở đúng profile: `tab new --browser "Chrome 3" <url>`. Nếu URL bị chuyển sang trang đăng nhập thì đó là profile sai: đóng tab vừa mở, thử profile khác.
- Luôn xác nhận **tên tài khoản** trên trang trước khi tải video (TikTok Studio hiện handle ở trang Home; YouTube Studio có `#entity-name`; Business Suite hiện tên Trang ở ô "Đăng lên"). Đăng nhầm tài khoản thì không rút lại được.
- Chỉ thao tác trên tab mình mở. Các tab khác của người dùng (mail, công việc, Facebook cá nhân) không đọc, không bấm.

## Khi người dùng tạm dừng Browser MCP

Lỗi `The user paused Browser MCP. Ask them to click Resume in its popup` là người dùng chủ động dừng. Dừng ngay, không thử lại liên tục. Báo rõ **profile nào** cần bấm Resume (ví dụ "cửa sổ Chrome đang mở YouTube Studio"), nói việc đang dở ở đâu, rồi chờ. Trong lúc dừng, người dùng có thể đã tự sửa form: khi tiếp tục, đọc lại trạng thái form, không ghi đè lựa chọn của họ mà không hỏi.

## Tải file lên

- `upload <target> <đường dẫn tuyệt đối>`; target là `input[type=file]` hoặc nút mở hộp chọn file (`getByRole('button', { name: 'Thêm video' })`).
- File phải dưới 50MB (Browser MCP báo "Cannot set buffer larger than 50Mb"). `chuan_bi_dang.py` đã tạo file dưới 45 MiB.
- Browser MCP gắn file với kiểu `application/octet-stream`. TikTok thấy kiểu sai thì **bỏ qua mà không báo lỗi** (trang vẫn đứng ở "Select video"). Trước mỗi lần tải, chạy đoạn sửa kiểu file này trong trang (chạy lại sau mỗi lần `goto` hoặc `reload`, vì tải lại trang thì đoạn này mất):

```
eval "() => { if(window.__fixMime) return 'da co'; window.__fixMime=1; const fix = e => { const t=e.target; if(t && t.type==='file' && t.files && t.files.length){ const f=t.files[0]; const n=f.name.toLowerCase(); let ty=null; if(n.endsWith('.mp4')) ty='video/mp4'; else if(n.endsWith('.jpg')||n.endsWith('.jpeg')) ty='image/jpeg'; else if(n.endsWith('.png')) ty='image/png'; if(ty && f.type!==ty){ const nf=new File([f], f.name, {type:ty, lastModified:f.lastModified}); const dt=new DataTransfer(); dt.items.add(nf); t.files=dt.files; } } }; window.addEventListener('input', fix, true); window.addEventListener('change', fix, true); return 'ok'; }"
```

  Sửa 14/11/2026, hai lỗi của bản cũ làm TikTok không nhận file suốt nửa giờ: (1) Browser MCP giữ nguyên `\\` trong lệnh `eval`, nên regex `/\\.mp4$/` thành "dấu \ + ký tự bất kỳ + mp4" và không bao giờ khớp, vì vậy **không dùng regex có `\` trong `eval`** (dùng `endsWith`, `includes`); (2) TikTok đọc file ở sự kiện `input`, xảy ra trước `change`, nên phải bắt cả hai, đặt ở `window` (capture). Chẩn đoán nhanh: gắn listener ghi `e.target.files[0].type` rồi tải thử; thấy `application/octet-stream` là đoạn sửa chưa chạy.

  Đoạn này chỉ đổi nhãn kiểu của chính file người dùng đang tải lên tài khoản của họ, ngay trước khi trang đọc file; nội dung file giữ nguyên.
- Tải xong, chụp màn hình để thấy tên file, dung lượng, trạng thái "Uploaded/Đã tải lên".

## Gõ chữ vào form

- Ô soạn thảo là `contenteditable` (Draft.js, Lexical). Cách chắc ăn: `click <ô>` → `press Meta+a` → `press Backspace` → `type "<dòng>"` → `press Enter` giữa các dòng. Dòng trống là thêm một `press Enter`.
- Hashtag: `type "#tag"` → `wait 1200` → `type " "`. Dấu cách đóng hộp gợi ý mà không chọn gợi ý nào. Không bấm Enter khi hộp gợi ý đang mở, vì Enter sẽ chọn gợi ý.
- **Không bấm Escape** để đóng gợi ý. Trên YouTube Studio, Escape đóng luôn hộp tải lên (bản nháp vẫn được lưu, mở lại bằng "Chỉnh sửa bản nháp" ở tab Shorts).
- Gõ xong mỗi ô thì đọc lại bằng `eval` (`innerText` của ô) và so với `noi-dung.json`. Lệch thì xoá và gõ lại, đừng sửa từng chữ.
- Gõ nội dung lấy từ `out/dang/noi-dung.json`, không gõ theo trí nhớ.

## Khi bấm không được

- `is covered by <...>`: có lớp phủ (popup hướng dẫn, thanh dưới dính đáy) che phần tử. Đóng popup trước (nút "Xong", "Đóng", dấu X). Nếu vẫn bị che thì `eval` để `focus()` rồi `type`, hoặc `click()` trực tiếp phần tử.
- `matched N elements`: dùng `find "<chữ>"` để lấy ref, hoặc `.first()`, `.last()`, `{ exact: true }`.
- Danh sách thả xuống (YouTube): mở bằng `click`, rồi chọn mục bằng `eval` tìm phần tử có `innerText` đúng chữ cần chọn và `.click()`. Mục nằm ngoài vùng nhìn thì `getByRole('option')` hay báo bị lớp phủ che.
- Công tắc (TikTok `.Switch__root`): `click` theo ref hay bị phần "thumb" che. Lấy thứ tự công tắc bằng `eval` (đọc nhãn chữ gần mỗi công tắc) rồi `click ".Switch__root >> nth=<i>"`.

## Kiểm tra trước và sau khi bấm nút cuối

- Trước khi bấm Đăng / Lên lịch / Chia sẻ: chụp màn hình phần cài đặt và đọc lại các ô chính (caption, tiêu đề, hiển thị, giờ hẹn, múi giờ). Giờ trong trình duyệt là giờ địa phương của máy (kiểm bằng `eval "() => new Date().toString()"`).
- Sau khi bấm: chờ trang chuyển, rồi mở trang danh sách bài của nền tảng và tìm bài theo dòng đầu caption hoặc tiêu đề. Chỉ báo "đã đăng" khi thấy bài trong danh sách.
