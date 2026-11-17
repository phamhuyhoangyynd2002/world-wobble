# Bản thử B: animatic vẽ tay kiểu storytime (16/11/2026)

Video: `out/ban-thu.mp4` (có nhạc, −14,0 LUFS, true peak −1,4 dBTP), `out/video-no-music.mp4` (−14,0 LUFS, −1,2 dBTP). 1920×1080, 30 fps, H.264 + AAC, 60,3 giây. `check`: 0 lỗi, 0 cảnh báo. `kiem_ky_thuat.py` chỉ báo thiếu captions.srt và chapters.txt (bản thử không cần).

## Cách làm

- Mọi hình là SVG viết bằng code, kể cả nền giấy (`assets/giay.jpg` do `tools/tao_du_lieu.py` vẽ bằng PIL, hạt giống cố định). Không ảnh chụp, không ảnh AI, không Commons.
- **Vẽ "immediate mode"**: mỗi hình vẽ là một hàm thuần của thời gian: `canh.js` trả chuỗi SVG cho thời gian t, `index.html` thay `innerHTML` của nhóm camera. Seek tới khung nào thì ra đúng khung đó, không cần GSAP cho từng chuyển động.
- **Đồng hồ 12 hình/giây**: timeline GSAP chỉ có một tween `steps(724)` ghi vào một thuộc tính có setter. Setter gọi `draw(t)`, nắn t về bội số 1/12 giây. Mọi chuyển động (Wob, camera, khẩu hình) vì thế nhảy bậc "on twos" như vẽ tay. Tween vẫn chạy khi HyperFrames seek với `suppressEvents`, vì nó là thuộc tính chứ không phải callback.
- **Nét sôi**: một filter `feTurbulence` + `feDisplacementMap` (scale 6, baseFrequency 0,024) đặt ngoài nhóm camera, nên độ rung theo khung chứ không phóng to theo zoom. Seed đổi theo số hình vẽ, quay vòng 4 giá trị.
- **Tô lem**: mỗi mảng màu lệch 3–5 px khỏi nét mực (`B.shape`), trông như tô bút dạ vội.
- **Wob**: `wob.js` dựng lại đúng toạ độ của `tao_wob.py` (thân méo, lục địa, ba lô, giày). Phần thêm: mí mắt (chớp, sụp), con ngươi, mắt lác, lông mi bật ra / đóng băng, lông mày, 9 hình miệng A–H/X + 10 miệng biểu cảm, tay nối tới điểm bất kỳ (cầm đồ, gõ, vẫy), chân đi lạch bạch, smear (vệt + bóng mờ), khăn, mũ len, chăn, mũ tuyết. Ở cảnh hiện tại Wob mấp máy theo `khau-hinh/`; ở hồi ức chỉ biểu cảm.
- 24 shot / 60 giây, mỗi shot 1–4,7 giây. Gag bằng hình: cá gõ xuống bàn không cong, đèn cửa sổ bật khi Wob gõ từng nhà, nhiệt kế tụt kèm icicle, lông mi bật rồi đóng băng, lác mắt nhìn lông mi, cả làng nằm trong tủ đông rồi cửa đóng sập, cá chọc thủng túi, vác cá như ván, cá thanh thản, vẫy chào ghế lái trống, tuyết rơi trúng đầu, hơi trà đông giữa không trung, dốc cốc ra khối trà đặc, cắt cứng "Anyway." về Wob trùm chăn, cá rã đông mềm oặt.
- Âm thanh: giọng chèn tĩnh bằng `<audio>`; 40 sfx + nhạc `frost-waltz` (11,1 s → ngắt đúng "Anyway." ở 53,62 s) khai trong `timeline.json`, trộn bằng `mix_audio.py` của repo.

## File tái dùng được cho tập 12 phút

- `js/loi.js`: nội suy khoá, bậc thang, rung máy, chớp mắt, đường mượt, tô lem, chữ trên đồ vật, khẩu hình theo cảnh. Dùng nguyên.
- `js/wob.js`: rig Wob đầy đủ. Dùng nguyên, chỉ thêm đồ mặc / tư thế.
- `js/dao-cu.js`: cá, đèn, bàn, hộp, sổ, nhà gỗ, phố tuyết, nhiệt kế, quầy chợ, thùng cá, găng tay, túi, xe (chạy / phủ tuyết), cốc trà, tủ đông, hiệu ứng (sparkle, impact, speed lines, puff, giọt, bong bóng). Đồ của Oymyakon thì dùng lại được trong tập; tập khác phải vẽ thêm đạo cụ.
- `index.html` (đồng hồ, filter nét sôi, camera), `tools/tao_du_lieu.py` (dữ liệu từ, khẩu hình, timeline cho mix_audio). Dùng nguyên.
- Phần viết riêng cho từng tập: `js/canh.js` (phân cảnh từng shot, khoảng 400 dòng cho 60 giây).

## Đẹp / chưa đẹp

- Đẹp: trông như phim hoạt hình vẽ tay thật. Nét rung, màu lem, giấy có thớ, nhịp 12 hình/giây. Wob diễn (cầm cá, gõ, vẫy, lác mắt, trùm chăn) chứ không đứng làm sticker. Cắt cảnh nhanh, punchline có cận mặt giữ hình. Nhân vật giữ đúng tạo hình.
- Chưa đẹp: chuyển động còn cứng kiểu cắt giấy, ít khung trung gian nên không có độ "dẻo". Tay là một nét cong chấm tròn, chưa có bàn tay cầm nắm. Smear mới là bóng mờ, chưa là hình vẽ biến dạng thật. Bối cảnh lặp lại một bộ nhà gỗ. Wob đi bộ chỉ có trượt + lắc, chưa có chu kỳ đi thật. Khẩu hình lấy từ `tao_khau_hinh.py` (biên độ), không phải Rhubarb nên không khớp từng âm. Mũ tuyết trông hơi giống bịt tai. Chưa nghe lại độ cân giữa sfx và giọng bằng tai người.

## Thời gian

- Render (4 worker, GPU, máy đang chạy song song các bản khác): bản nháp 96 giây, bản delivery 3 phút 21 giây cho 60,3 giây video. Trộn âm thêm khoảng 30 giây. Filter nét sôi không làm chậm đáng kể. 2 lần render đầy đủ.
- Công sức cho bản thử này: khoảng 1 phiên agent, phần lớn là viết rig Wob và đạo cụ (một lần) và `canh.js` (riêng từng tập).

## Ước công sức một tập 12 phút theo kiểu này

- 60 giây cần khoảng 400 dòng phân cảnh, 24 shot. 12 phút là khoảng 280–300 shot, 4.000–5.000 dòng `canh.js`, cùng 20–40 đạo cụ mới mỗi tập. Không viết tay từng shot như bản thử này được: cần một lớp "kịch bản shot" dạng JSON (shot, bối cảnh, tư thế Wob, đạo cụ, gag theo mốc từ) để agent sinh ra, rồi `canh.js` chung đọc JSON đó.
- Ước tính khi đã có lớp JSON: 1 ngày agent mỗi tập (phân cảnh + đạo cụ mới + 2–3 vòng chụp thử). Render 12 phút khoảng 20–25 phút.

## Tự chấm: 7,5/10 (thiên về hoạt hình)

Có nhân vật diễn, có gag bằng hình, cắt cảnh nhanh, không có chữ to giữa màn hình, nét sống động. Không ai nhìn ra đây là bộ slide. Chưa lên 9 vì chuyển động vẫn là "nhảy tư thế" (pose-to-pose rất ít khung giữa), đi bộ chưa có chu kỳ thật, và một số shot (cửa tủ đông đóng kín, cá thanh thản) chỉ là một hình giữ yên kèm hiệu ứng nhỏ.
