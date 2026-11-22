/* Ví dụ chế độ CẢNH NGOÀI TRỜI 3D (dio-3d.js), ~8 s, lop "hoi-uc": Wob (mũ len, khăn) đi dọc phố làng tuyết,
 * camera mở sau hàng rào tiền cảnh rồi lướt theo Wob, giữ hình vẫn đẩy vào; khói ống khói bốc thẳng, tuyết lất phất,
 * biển tên làng (chữ lấy từ chu_tren_do_vat). Gag: Wob dừng, thở ra; hơi thở đông thành cục băng, treo lơ lửng một nhịp
 * rồi rơi "cạch" xuống tuyết; camera lao vào trung cảnh (nghiêng 3,5°, mờ ống kính), Wob nhìn xuống cục băng, tỉnh bơ, run.
 * Mốc ở đây viết cứng cho ví dụ; đoạn thật lấy từ data.nhip và mốc từ trong data.loi[].tu.
 * Dựng thử: projects/2026-11-16-oymyakon/ban-thu-thu-vien/t5-dio-3d/.
 */
window.CANH = function (api, data) {
  "use strict";
  var chu = data.chu_tren_do_vat; // ["OYMYAKON"]

  // ---------------------------------------------------------------- thế giới (mét; phố chạy dọc trục x, camera nhìn về −z)
  var d3 = api.ngoaiTroi({ anhSang: "trua-dong", suong: [14, 95], seed: 18 });
  d3.duong({ z: 0, dai: 140, rong: 5 });
  d3.dayNha({ x0: -34, x1: 34, z: -10.5, seed: 3 });                         // dãy nhà bên kia đường, mặt tiền nhìn ra phố
  d3.dayNha({ x0: -30, x1: 36, z: -24, seed: 8, cuaSo: 1 });                 // dãy sau, xa dần vào sương
  d3.cotDien([-28, -14, 0, 14, 28], { z: -4 });
  d3.hangRao(-17, 4.2, 12);                                                   // tiền cảnh lúc mở
  d3.dongTuyet(-12.5, 2.4, { r: 1.0, cao: 0.4 });
  d3.dongTuyet(5.5, 3.0, { r: 1.6, cao: 0.55 });
  d3.bienChu(-3.4, -3.3, [{ chu: chu[0], co: 46 }], { w: 3.0, h: 0.95, cao: 1.3, yaw: -0.45 });
  d3.rungCay({ x0: -90, x1: 90, z0: -58, z1: -40, n: 70, loai: "tran", cao: [6, 10], seed: 4 });
  d3.nui([{ x: -70, z: -115, r: 38, cao: 26, loai: "nui" }, { x: 5, z: -135, r: 50, cao: 34, loai: "nui" }, { x: 80, z: -120, r: 42, cao: 24, loai: "nui" },
          { x: -30, z: -85, r: 30 }, { x: 45, z: -90, r: 34 }]);
  d3.tuyetRoi({ n: 1200, toc: 0.6, co: 0.05 });

  // ---------------------------------------------------------------- Wob (con rối dio-wob, x/z tính bằng mét)
  var w = d3.wob({ x: -8, z: 0.6, trangPhuc: { mu: true, khan: true } });   // trang_phuc: "mũ len, khăn" (khớp đoạn trước/sau)
  api.lidsSet(w, 0.15);
  api.walk(w, 0.5, 4.3, -1.5, 0.6, { face: 0.7, endFace: 0, step: 0.32, sfx: "buoc-tuyet", vol: 0.3 });
  api.blinks(w, 0.2, 4.6);
  api.look(w, 4.45, 0, -9, 0.25);                                             // dừng, ngẩng nhìn trời
  // gag: hơi thở đóng băng
  var tHoi = 4.9, tDong = 5.45, tRoi = 6.25, tCham = 6.55;
  api.mouth(w, tHoi - 0.05, "O"); api.mouth(w, tHoi + 0.45, "X");
  d3.hoi(w, tHoi, { dai: 1.1, huong: -1, co: 0.75, dong: { tai: tDong, roi: tRoi } });
  api.sfx("hoi-nuoc", tHoi, 0.35);
  api.sfx("tach-bang", tDong - 0.02, 0.7);
  api.look(w, tDong - 0.03, -11, -7, 0.12, 1.15);                             // phản ứng 1 khung trước khi đông
  api.lids(w, tDong - 0.03, 0, 0.08);
  api.look(w, tRoi + 0.05, -10, 11, 0.3);                                     // mắt theo cục băng rơi
  api.sfx("drop", tCham, 0.8);
  api.lids(w, tCham + 0.35, 0.5, 0.2);                                        // tỉnh bơ
  api.look(w, tCham + 0.75, 0, 3, 0.25);                                      // quay lại nhìn ống kính
  api.shiver(w, 7.05, 7.5, 3);
  api.sfx("brr", 7.05, 0.5);

  // ---------------------------------------------------------------- camera: mở sau hàng rào → lướt theo Wob → giữ đẩy vào → lao
  d3.cameraDuong([
    { pos: [-13.5, 1.6, 9.5], nhin: [-6, 1.0, -1] },
    { tu: 0.4, den: 3.6, kieu: "luot", pos: [-4.4, 1.05, 6.4], nhin: d3.theo(w, [0.7, 0.6, 0]) },
    { tu: 5.3, den: 5.66, kieu: "lao", pos: d3.theo(w, [0.35, 0.3, 2.9]), nhin: d3.theo(w, [-0.3, 0.52, 0]), roll: 3.5, mo: 12, day: 0.002 }
  ], { day: 0.0025 });
  d3.rungMay(tCham, 7 / 30, 5);                                                   // cục băng chạm đất: rung nhẹ 7 khung
};
