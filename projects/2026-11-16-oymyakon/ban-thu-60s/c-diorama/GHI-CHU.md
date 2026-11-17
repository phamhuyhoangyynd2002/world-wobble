# Bản thử C – Diorama giấy 2.5D / sách pop-up (16/11/2026)

## Cách làm
- Một composition HyperFrames: `index.html` (khai báo root, 5 `<audio>` giọng, đăng ký timeline) + `dio.js` (vẽ mọi thứ bằng SVG + dựng cảnh 3D + toàn bộ timeline GSAP). Không ảnh, không AI, không three.js.
- **CSS 3D transforms** thay three.js: đã thử nhanh, Chrome của HyperFrames chạy GPU phần cứng, `perspective` + `preserve-3d` render đúng, tất định, không cần đổi SVG sang texture. Hai "sân khấu" (bàn kỷ vật, làng) là hai khối 3D riêng; camera là 3 lớp lồng nhau (dolly/pitch → yaw → tâm ngắm) nên camera dolly, lượn, nghiêng thật trong không gian.
- Tấm giấy cắt = SVG đứng ở các độ sâu khác nhau; `drop-shadow` 2 lớp: lớp 0 px làm **độ dày giấy**, lớp mờ làm **bóng đổ lên lớp sau**; lớp xa thêm `blur` (độ nét sâu), lớp gần (ống bút, hàng rào) mờ mạnh và che Wob khi Wob đi phía sau.
- Chuyển cảnh vào hồi ức: Wob lật bìa sổ (bìa 2 mặt xoay quanh gáy), các lớp pop-up bật dựng, camera lao vào trang sổ, hoà sang làng nơi các lớp giấy cũng bật dựng lên. "Anyway." cắt cứng về bàn, nhạc ngắt cùng lúc.
- Wob: con rối giấy tách từ toạ độ gốc `tao_wob.py` (thân, lục địa, ba lô, giày giữ nguyên), thêm khớp tay/chân, mí mắt (chớp, tỉnh bơ), con ngươi (nhìn, lác mắt), lông mi bật ra, bộ miệng A–H/X + vài miệng biểu cảm. Đi lắc lư có nhún/co giãn, ba lô nảy trễ. Cảnh hiện tại mấp máy theo `khau-hinh/scene-1,5.json`; hồi ức chỉ biểu cảm + bong bóng ký hiệu + líu lo.
- Gag bằng hình: cá gõ bàn không cong rồi tự đứng trên bàn; nhiệt kế tụt; Wob lách qua cửa; lông mi bật ra rồi đóng băng; camera lùi xa thấy cả làng nằm trong tủ đông, cửa tủ đóng sầm; bàn tay đeo găng đưa cá, cá xuyên thủng túi, Wob vác cá trên đầu; mắt cá lim dim; vẫy tay với ghế trống; hơi trà đông giữa không trung, trà rơi ra thành khối; cá mềm oặt nhỏ giọt, Wob quấn chăn run.
- Âm thanh: sfx (59 mốc) do `dio.js` ghi ra `#sfx-out`, chép sang `timeline.json`; trộn bằng `mix_audio.py` (nhạc `frost-waltz` chỉ trong hồi ức 12,1–54,1 s).

## Kỹ thuật chính / bẫy đã gặp
- Timeline GSAP là *thenable*: `resolve(tl)` làm promise treo mãi → phải bọc `{tl}`.
- `svgOrigin` của GSAP tính theo toạ độ gốc của svg, không dùng được cho đồ vật nằm trong cánh tay đang quay → đồ cầm tay dùng thuộc tính `transform` dạng chuỗi (GSAP nội suy số) + hàm `holdPose()` tính ngược từ vị trí mong muốn trong hệ Wob.
- Chữ trên đồ vật trong 3D làm lớp layout/contrast của `check` báo nhầm (hộp chữ bị chiếu chồng, bị bìa sổ che) → đánh dấu `data-layout-allow-*`; vì vậy `check` không đo được contrast của chữ (0/0), độ đọc được kiểm bằng mắt trên ảnh chụp.
- Script được dựng khi DOM sẵn sàng (HyperFrames có thể dời script).

## Đẹp / chưa đẹp
- Đẹp: cảm giác hộp diorama thật (thị sai khi camera trượt, bóng giấy, hàng rào mờ phía trước); khoảnh khắc tủ đông; Wob có diễn (cầm, vác, vẫy, lác mắt), mặt tỉnh bơ "On purpose."; bảng màu Mực & giấy + hạt giấy.
- Chưa đẹp: làng hơi trắng phẳng (sương + tuyết + trời gần cùng tông); khói là vòng tròn rời rạc; tay đeo găng đưa cá phần lớn bị quầy che nên trao cá hơi "nhảy"; Wob vẫn là tấm phẳng nên khi xoay rotationY trông mỏng; chữ trên đồ vật ở cảnh trung/xa nhỏ hơn 40 px (chỉ ≥ 40 px khi camera đẩy vào: nhiệt kế ~60–80 px, biển ~45–55 px); chưa có bóng đổ thật lên mặt đất theo nguồn sáng (chỉ bóng tiếp đất + drop-shadow).

## Thời gian render
- 2 lần render đầy đủ (máy đang chạy song song 3 bản): draft 4 phút 12 giây (57,6 MB), delivery 5 phút 0,6 giây (223 MB; chụp khung 3 phút 27 giây, encode 1 phút 22 giây), GPU phần cứng, 60,0 giây, 1920×1080, 30 fps. Một phút hoạt hình mất khoảng 4–5 phút render → tập 12 phút khoảng 50–60 phút.
- Trộn âm `mix_audio.py`: cả 2 bản −14,0 LUFS, true peak −1,3 dBTP. `check` 0 lỗi (4 info tràn khung của chữ trên đồ vật khi camera lia). `kiem_ky_thuat.py` chỉ báo thiếu captions.srt/chapters.txt (bỏ qua với bản thử).

## Tái dùng cho tập 12 phút
- `dio.js` tách được thành thư viện: `cut/plane/floorPlane` (dựng tấm giấy 3D), `makeRig/camSet/camTo` (camera), `makeWob` + `walk/hop/look/lids/blink(s)/shiver/breathe/talkBobs/mouthCues/armTo/holdPose/bubble` (con rối Wob), bộ lọc giấy `F_WARM/F_COLD/F_FAR/F_FG`, hạt giấy, tuyết rơi `flakes`, khói `smoke`, đạo cụ `fishSVG/houseSVG/signSVG/fenceSVG`, nhiệt kế, xe, cốc, túi, chăn.
- Sân khấu bàn kỷ vật (hiện tại) dùng lại nguyên cho mọi tập; sổ pop-up là chuyển cảnh cố định của kênh.

## Ước công sức một tập 12 phút
- Bản 60 s này: khoảng 1 ngày làm việc của agent (dựng thư viện + cảnh). Với thư viện có sẵn, mỗi phút hoạt hình vẫn cần viết tay vị trí, camera, gag: ước 1–2 giờ agent/phút + 2–3 vòng chụp thử → tập 12 phút khoảng 2–3 ngày agent, render vài chục phút. Cần tách `dio.js` thành module + một "kịch bản hành động" dạng dữ liệu thì mới làm đều được.

## Tự chấm: hoạt hình hay trình chiếu
**7/10 – nghiêng về hoạt hình.** Camera đi thật trong không gian, Wob đi lại/cầm đồ/phản ứng, gag nằm trong hình chứ không trong chữ, không có chữ to giữa màn hình. Chưa tới 8–9 vì chuyển động của Wob còn cứng kiểu cắt giấy (ít tư thế trung gian, tay chân xoay quanh khớp), cảnh làng phẳng màu, và vài đoạn (giữa cảnh 2, đoạn xe) Wob đứng nói thầm bằng bong bóng hơi lâu.
