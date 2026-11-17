# Schema `script.json` (World Wobble)

Rút gọn và đổi từ schema GameReel cho video dài khung ngang. Điểm mới quan trọng nhất: **`claims`**, danh sách khẳng định có mã, là đầu vào của kiểm chứng hai mô hình và của báo cáo độ xác thực.

## Trường cấp gốc

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `title` | string | có | Tiêu đề làm việc (tiếng Anh, ≤ 60 ký tự). Tiêu đề đăng chốt ở `out/seo.md` |
| `format` | `"horizontal"` | có | |
| `template` | `"explainer"` | có | |
| `language` | `"en-US"` | có | Mã ngôn ngữ cho TTS và nhận dạng lời |
| `place` | `{ "name", "country", "lat", "lon" }` | có | Nơi của tập; `lat`, `lon` dùng để vẽ bản đồ và kiểm vùng Biển Đông |
| `question` | string | có | Câu hỏi trung tâm, ví dụ "Why do people live in Oymyakon?" |
| `message` | string | có | Một câu: "This video tells [ai] that [điều gì]". Mọi cảnh phục vụ câu này |
| `angle` | string | có | Lập luận riêng của tập (vì sao người ta sống ở đây), lấy từ `brief.md` |
| `hook_type` | string | nên có | `cau-hoi`, `tinh-huong`, `con-so`, `wob-hanh-dong`… để `validate_script.py` tránh lặp kiểu hook 3 tập liền |
| `target_seconds` | `[min, max]` | không | Mặc định `[600, 900]` |
| `voice` | `{ "name", "rate"?, "style"? }` | có | Giọng theo hồ sơ kênh (Edge/Azure cùng tên), ví dụ `{ "name": "en-US-AndrewNeural", "rate": "+0%" }` |
| `burn_captions` | bool | không | Mặc định `false` (phụ đề tải lên YouTube bằng `out/captions.srt`) |
| `music_mood` | string | không | Tâm trạng nhạc mặc định của tập: `to-mo` \| `khac-nghiet` \| `hai` (bảng trong `music/GIAY-PHEP.md`). Mặc định `to-mo` |
| `scenes` | Scene[] | có | |
| `anh_ai` | AnhAI[] | khi có ảnh AI | Mọi ảnh AI tập cần, kèm điểm và hạng chính/phụ (xem dưới). Bắt buộc khi `shots` có `asset:ai-…` |
| `claims` | Claim[] | có | Mọi khẳng định có thể sai |
| `sources` | Source[] | có | |

## Scene

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `id` | số nguyên | có | 1, 2, 3… liên tục |
| `type` | `"hook"` \| `"section"` \| `"outro"` | có | Đúng một `hook` (cảnh đầu), đúng một `outro` (cảnh cuối) |
| `chapter` | string | cảnh 1 bắt buộc | Tên chương YouTube (≤ 40 ký tự). Cảnh không có `chapter` thuộc chương của cảnh trước. Ít nhất 3 chương |
| `role` | string | nên có | Việc của cảnh: "hook: câu hỏi + Wob muốn chuyển tới", "lý do 1: mỏ kim cương", "mồi lại: Wob đổi ý"… |
| `narration` | string | có | Lời đọc tiếng Anh, số viết bằng chữ. Cảnh hook ≤ 35 từ; cảnh khác thường 60–250 từ. Định dạng hoạt hình: Wob kể ngôi thứ nhất ("I went…") |
| `lop` | `"hien-tai"` \| `"hoi-uc"` | có (hoạt hình) | Lớp thời gian (17/11/2026): `hien-tai` = Wob ở bàn kỷ vật kể, mấp máy miệng; `hoi-uc` = cảnh trong chuyến đi. Có `lop` ở bất kỳ cảnh nào thì `validate_script.py` bật kiểm định dạng hoạt hình |
| `khuon` | string | nên có ở cảnh mở chương | Khuôn chương: `thu-hong-hieu` \| `doan-sai-roi-lat` \| `phong-quy-mo` \| `mot-ngay-o-day` \| `so-sanh-doi-thuong` \| `trang-so-hanh-trinh` \| `lich-su-nghiem` \| `hai-mua` (giải thích ở `cong-thuc-ke-chuyen.md` mục 3). ≥ 4 khuôn mỗi tập, hai chương liền không cùng khuôn |
| `y_hinh` | `{ "cue"?, "y", "gag"? }[]` | nên có (hoạt hình) | Ý hình cho đạo diễn: `cue` là chữ có trong `narration`, `y` tả ý (Wob làm gì, đạo cụ, cỡ cảnh, "giữ hình"), `gag` tả câu đùa bằng hình (nếu có). Mỗi cảnh `hoi-uc` ít nhất một mục có `gag`, trừ chương `lich-su-nghiem` (cấm gag). Ghi ý, không ghi toạ độ hay easing |
| `on_screen_text` | string | không | Tiêu đề cảnh/chương hiện ở đầu cảnh, ≤ 6 từ |
| `facts` | `{ "label", "value", "claim_ids": string[] }[]` | không | Thẻ số liệu trên hình (dạng hiển thị: `−67°C · −89°F`). Mỗi thẻ trỏ tới khẳng định chứa số đó |
| `pronunciation` | string | không | `"Tên: phiên âm; Tên: phiên âm"`, tên viết đúng như trong `narration` |
| `shots` | Shot[] | nên có | Nhịp đổi hình, xem dưới. Không có thì tự chia mỗi ~6 giây trên các tài nguyên của cảnh |
| `wob` | Wob[] | nên có | Wob phản ứng, xem dưới |
| `que` | `{ "cue", "hanh_dong", "tu"?, "so_luong"?, "giu"? }[]` | không | Người que nét mực (16/11/2026): `hanh_dong` = `di-bo` \| `chay` \| `run` (co ro vì lạnh) \| `vay-tay` \| `nhay` \| `chi-tay`; `tu` = `trai` \| `phai` (hướng đi vào, cho `di-bo`, `chay`); `so_luong` 1–4; `giu` giây (mặc định 4). Dùng cho người không cụ thể (người chăn tuần lộc, học sinh, người chạy), không bao giờ cho người thật nhận ra được. Đứng ở mép dưới, bên phải Wob; tránh lúc đang có thẻ số liệu |
| `music_mood` | string | không | Đổi nhạc theo nhịp (16/11/2026): `to-mo` \| `khac-nghiet` \| `hai`. Không ghi thì theo cảnh trước / mức tập. Đổi tâm trạng ở chỗ nhịp thật sự đổi (sang nỗi khổ, Wob gặp nạn), không đổi mỗi cảnh; đoạn < 20 giây bị gộp vào đoạn trước |
| `sfx` | `{ "name", "cue"?, "volume"? }[]` | không | File ở `sfx/<name>.*`. Không khai báo `dau-wob` (tự thêm cùng con dấu) |
| `verdict` | `{ "label": "WOULD MOVE"\|"SUMMER ONLY"\|"NOPE", "reason": string, "cue": string }` | cảnh outro | Đúng một lần mỗi video. `cue` là chữ trong lời đọc lúc con dấu đóng |
| `emphasis` | string[] | không | Chỉ khi `burn_captions`: từ khoá tô màu trong phụ đề |

Cảnh định dạng hoạt hình (rút gọn, số liệu chưa kiểm chứng):

```json
{
  "id": 3, "type": "section", "chapter": "The market", "lop": "hoi-uc", "khuon": "thu-hong-hieu",
  "narration": "So I went to the market. I asked for a bag. The fish did not need a bag.",
  "y_hinh": [
    { "cue": "I asked for a bag", "y": "Wob chìa cái túi; một bàn tay đeo găng đưa ra con cá cứng đờ", "gag": "cá chọc thủng túi, Wob vác cá trên vai như ván trượt" },
    { "cue": "did not need a bag", "y": "cận con cá, giữ hình" }
  ]
}
```

## Shot

| Trường | Ghi chú |
|---|---|
| `show` | `asset:<id>` (ảnh, bản đồ trong `assets/manifest.json`), `text` (tiêu đề cảnh to giữa khung, nền là ảnh của nhịp trước làm mờ), `fact:<label>` (thẻ số liệu của cảnh) |
| `cue` | Chữ hoặc cụm chữ **có trong `narration`**; hình hiện xong đúng lúc chữ đó được đọc. Bỏ trống ở shot đầu |
| `move` | Chuyển động trong nhịp: `zoom-in` (mặc định), `zoom-out`, `pan-left`, `pan-right`, `still` |
| `focus` | Tâm zoom `[x, y]` theo tỉ lệ 0–1 của ảnh, mặc định `[0.5, 0.5]` |
| `zoom` | Độ phóng cuối, mặc định 1.06; bản đồ có thể tới 1.6 |

Mặc định đổi hình mỗi 4–8 giây; `build_timeline.py` cảnh báo nhịp đứng quá 10 giây.

## Wob

| Trường | Ghi chú |
|---|---|
| `cue` | Chữ trong `narration` lúc Wob đổi biểu cảm |
| `bieu_cam` | Một trong 6 biểu cảm gốc (hồ sơ kênh): `hao-hung`, `lanh-run`, `nong-chay`, `soc`, `ngam-nghi`, `dong-goi` |
| `giu` | Giây giữ biểu cảm, mặc định tới lần đổi kế tiếp |

File SVG ở `templates/_shared/wob/<bieu_cam>.svg`. Chưa vẽ thì template bỏ qua lớp Wob (TODO trong hồ sơ kênh).

## AnhAI: ảnh AI cần tạo, kèm hạng (chốt 17/11/2026)

Mỗi ảnh AI (id `ai-…`) mà `shots` hoặc bảng phân cảnh hoạt hình dùng phải khai báo ở đây. Biên kịch chấm điểm ngay lúc viết. Luật chấm và ví dụ: `references/hang-anh.md`.

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `id` | string | có | `ai-<mô-tả>`, trùng id trong `shots` |
| `scenes` | số nguyên[] | có | Cảnh dùng ảnh này |
| `canh` | string | có | Nội dung cảnh bằng tiếng Anh, chỉ tả cảnh (phong cách kênh tự thêm). Không ảnh chụp, không tên hoạ sĩ/studio, không bản đồ, không người thật nhận ra được, không Wob |
| `diem` | `{ "vi_tri", "thoi_luong", "cu_the", "tieu_diem" }` | có | Mỗi tiêu chí 0, 1 hoặc 2 |
| `hang` | `"chinh"` \| `"phu"` | có | `chinh`: nguồn ngoài (Gemini API / ChatGPT web). `phu`: ComfyUI nội bộ. Phải khớp hạng tính từ `diem` |
| `ghi_de` | string | không | Lý do khi `hang` khác hạng tính |
| `ly_do` | string | nên có | Một câu: vì sao chấm vậy |
| `tai_hien_su_kien` | bool | không | Ảnh tái hiện sự kiện có thật: gắn nhãn AI (Nghị định 142/2026) |

```json
"anh_ai": [
  { "id": "ai-village-dusk", "scenes": [1],
    "canh": "a small remote village of wooden houses in deep winter at dusk, smoke rising straight up from chimneys, reindeer drinking at a small steaming spring",
    "diem": { "vi_tri": 2, "thoi_luong": 2, "cu_the": 2, "tieu_diem": 2 }, "hang": "chinh",
    "ly_do": "Hook và ứng viên thumbnail; cần đúng tuần lộc, suối bốc hơi" },
  { "id": "ai-snow-hills-far", "scenes": [3, 4],
    "canh": "distant snowy hills under a pale cold sky, frost haze",
    "diem": { "vi_tri": 0, "thoi_luong": 2, "cu_the": 0, "tieu_diem": 0 }, "hang": "phu",
    "ly_do": "Lớp xa sau lưng Wob, chỉ tạo không khí" }
]
```

## Claim: khẳng định cần kiểm chứng

| Trường | Ghi chú |
|---|---|
| `id` | `C01`, `C02`… duy nhất, theo thứ tự xuất hiện |
| `scene` | id cảnh chứa khẳng định |
| `quote` | **Chuỗi con nguyên văn** của `narration` cảnh đó (để tính mốc thời gian và kiểm câu có số đã được đăng ký) |
| `statement` | Câu khẳng định đầy đủ, tự đứng được, tiếng Anh, có ngữ cảnh (nơi, năm, tiêu chí). Đây là thứ hai mô hình nhận để kiểm chứng; không chứa kết luận hay nguồn |
| `source_ids` | Nguồn người viết đã dùng |
| `hedged` | `true` khi lời đọc đã nói rõ là còn tranh cãi (bắt buộc với mức C) |

Mọi câu trong `narration` có con số (chữ số hoặc số viết bằng chữ), ngày tháng, kỷ lục ("coldest", "highest", "only"…) phải nằm trong `quote` của ít nhất một khẳng định. Phán quyết của Wob và câu đùa nói quá rõ ràng không phải khẳng định.

## Source

`{ "id": "S1", "title", "publisher", "type": "goc"|"bach-khoa"|"bao"|"khac", "url", "published": "YYYY-MM-DD"|null, "accessed": "YYYY-MM-DD" }`

`type`: `goc` là nguồn gốc (cơ quan thống kê, chính phủ, bài khoa học, dữ liệu khí tượng chính thức); `bach-khoa` là bách khoa uy tín; `bao` là báo uy tín.

## Ví dụ rút gọn

```json
{
  "title": "Why Would Anyone Live in a Town at −67°C?",
  "format": "horizontal",
  "template": "explainer",
  "language": "en-US",
  "place": { "name": "Oymyakon", "country": "Russia", "lat": 63.46, "lon": 142.79 },
  "question": "Why do people live in Oymyakon?",
  "message": "This video tells curious adults that a village survives at minus sixty because of one warm spring and a road.",
  "angle": "The village exists because of what it once offered herders, not despite the cold.",
  "hook_type": "con-so",
  "voice": { "name": "en-US-AndrewNeural", "rate": "+0%" },
  "scenes": [
    {
      "id": 1, "type": "hook", "chapter": "The coldest village",
      "role": "hook: con số + Wob muốn chuyển tới",
      "narration": "Around five hundred people live in a village that once hit minus sixty-seven. Wob has decided to move there.",
      "on_screen_text": "WHY LIVE HERE?",
      "shots": [
        { "show": "asset:map-yakutia", "move": "zoom-in", "zoom": 1.5, "focus": [0.62, 0.41] },
        { "show": "asset:ai-village-dusk", "cue": "Wob has decided" }
      ],
      "wob": [{ "cue": "Wob has decided", "bieu_cam": "hao-hung" }]
    }
  ],
  "claims": [
    {
      "id": "C01", "scene": 1,
      "quote": "Around five hundred people live in a village",
      "statement": "Oymyakon, a village in the Sakha Republic of Russia, has a population of roughly 500 people.",
      "source_ids": ["S1"], "hedged": false
    }
  ],
  "sources": [
    { "id": "S1", "title": "…", "publisher": "…", "type": "goc", "url": "https://…", "published": null, "accessed": "2026-11-20" }
  ]
}
```

Các con số trong ví dụ chỉ minh hoạ cú pháp, **chưa kiểm chứng**; không chép vào kịch bản thật.
