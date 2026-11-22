/* d21 (diorama, cảnh ngoài trời 3D, hồi ức): một buổi sáng bình thường, trời còn tối. Mở sau hàng rào tiền cảnh
 * [tien-canh-khung]: cửa nhà gỗ mở, Wob bước ra phố, kéo khăn quấn kỹ → "Morning. Still dark.": camera ngửa lên đồng hồ treo
 * trên cửa (kim, không chữ số), trời xanh tối, cửa sổ vàng [dong-ho-troi] → Wob lạch bạch tới chiếc xe đang nổ máy giữa phố,
 * khói xả phụt từng cụm → nhón chân nhìn qua kính: ghế lái trống; Wob vẫy chào cái ghế (gag) → "Cars are often left running
 * for hours": camera lùi lên cao [lui-ra-toan-canh], dọc phố mấy xe khác cũng nổ máy, khói xả bốc đều như khói ống khói.
 * Ánh sáng chuyển dần từ đêm sang xanh sáng sớm. KHUNG CHO d23: thế giới dungPho() (seed 18), xe XE0 ở (1.2, 0.6).
 */
window.CANH = function (api, data) {
  "use strict";
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; });   // 0, 3.9, 5.65, 9.09, 10.28

  // ---------------------------------------------------------------- thế giới: phố làng tuyết buổi sáng còn tối
  var DEM = { anhSang: "dem", troiDinh: "#1b2b48", chanTroi: "#4a5f84", troiSang: { tren: "#6680b4", duoi: "#34405e", manh: 1.45 }, nang: { huong: [-20, 30, 14], mau: "#b4c6ff", manh: 1.05 } };
  var d3 = api.ngoaiTroi(Object.assign({ suong: [16, 110], seed: 18, bong: { tam: [0, -2], rong: 34, sau: 22 } }, DEM));
  var XE0 = { x: 1.2, z: 0.6 };
  function dungPho() {   // GIỮ NGUYÊN Ở d21 VÀ d23
    d3.duong({ z: 0, dai: 150, rong: 6 });
    var nha0 = d3.nha(-4.5, -9.5, { w: 7, d: 6, h: 3.1, cuaSo: 2, seed: 71, loiCua: true, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: -44, x1: -10.5, z: -10.5, seed: 3, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: 1.5, x1: 44, z: -10.5, seed: 4, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: -40, x1: 40, z: -24, seed: 8, cuaSo: 1, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: -44, x1: -9, z: 12.5, yaw: Math.PI, seed: 5, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: 13, x1: 44, z: 12.5, yaw: Math.PI, seed: 6, khoi: { troi: 0.4 } });
    d3.cotDien([-30, -16, -2, 12, 26], { z: -4.2 });
    d3.hangRao(-12.6, 4.6, 9);
    d3.dongTuyet(-14, 3.0, { r: 1.3, cao: 0.5 }); d3.dongTuyet(9.5, -3.4, { r: 1.5, cao: 0.5 }); d3.dongTuyet(19, 3.3, { r: 1.4, cao: 0.45 });
    d3.rungCay({ x0: -90, x1: 90, z0: -60, z1: -40, n: 70, loai: "tran", cao: [6, 10], seed: 4 });
    d3.nui([{ x: -70, z: -115, r: 38, cao: 26, loai: "nui" }, { x: 5, z: -135, r: 50, cao: 34, loai: "nui" }, { x: 80, z: -120, r: 42, cao: 24, loai: "nui" },
            { x: -30, z: -85, r: 30 }, { x: 45, z: -90, r: 34 }]);
    var dongHo = d3.dongHo(-4.5, 2.3, -6.46, { r: 0.3, gio: 8, phut: 56 });    // treo trên cửa, đèn hiên phía trên
    var xe0 = d3.xe(XE0.x, XE0.z, { yaw: Math.PI, mau: "#6f8a6a", denTrong: true, seed: 3 });
    d3.xe(-12, -1.0, { yaw: 0, mau: "#9a4a3a", seed: 5 });
    d3.xe(-17, 1.0, { yaw: Math.PI, mau: "#5b6b7a", seed: 11 });
    d3.xe(9.5, -1.0, { yaw: 0.04, mau: "#4f6f86", seed: 7 });
    d3.xe(17.5, 1.0, { yaw: Math.PI, mau: "#b9a46a", seed: 9 });
    d3.xe(27, -0.9, { yaw: 0, mau: "#7a6a8a", seed: 13 });
    return { nha0: nha0, dongHo: dongHo, xe0: xe0 };
  }
  var P = dungPho();
  d3.tuyetRoi({ n: 700, vung: [-14, 14, 0, 7, -9, 9], toc: 0.4, co: 0.04 });
  d3.anhSang(0, api.DUR, "sang-som", 0.85);                                     // đêm → xanh sáng sớm, chậm suốt đoạn

  // ---------------------------------------------------------------- Wob: mũ len, khăn quấn kỹ, ba lô, lông mi đóng băng
  var w = d3.wob({ x: -4.5, z: -6.85, trangPhuc: { mu: true, khan: true, mi: true, muMau: "#C9463A", muVanh: "#A8352B", muBong: "#F6EEDC", khanMau: "#D9543C" }, sang: 0.4 });   // đứng sau cánh cửa
  api.lidsSet(w, 0.2);
  var cua = P.nha0.userData.cua;
  api.tl.to(cua.rotation, { y: -1.7, duration: 0.5, ease: "power2.out" }, 0.55);
  api.tl.to(cua.rotation, { y: 0, duration: 0.35, ease: "power2.in" }, 2.85);
  api.walk(w, 0.85, 2.6, -3.7, -2.3, { face: 0.3, endFace: 0, step: 0.26, sfx: "buoc-tuyet", vol: 0.32 });
  // kéo khăn quấn kỹ, run
  api.armTo(w, "L", 2.7, 0.2, -38);
  api.tl.to(w.scarf, { scaleX: 1.08, scaleY: 0.94, svgOrigin: "200 270", duration: 0.12, ease: "power2.out" }, 2.85);
  api.tl.to(w.scarf, { scaleX: 1, scaleY: 1, svgOrigin: "200 270", duration: 0.3, ease: "back.out(3)" }, 2.98);
  api.armTo(w, "L", 3.3, 0.25, 0);
  api.shiver(w, 2.9, 3.35, 2.5);
  api.blinks(w, 0.9, 5.4, [], 0.2);
  // "Morning. Still dark." – Wob ngước nhìn đồng hồ cùng camera; kim phút nhích tới 9 giờ
  api.look(w, (tu.morning || 3.95) - 0.35, -2, -12, 0.3);
  P.dongHo.chay((tu.morning || 3.95) - 0.2, (tu.morning || 3.95) + 0.9, [8, 56], [9, 0]);
  api.lids(w, (tu.dark || 4.93) - 0.05, 0.5, 0.15);                         // tỉnh bơ: trời vẫn tối
  // "Outside, a car sat in the street with its engine running" – đi tới xe
  var tDi = (tu.outside || 5.7) - 0.1, tToi = 8.55;
  api.lids(w, tDi, 0.2, 0.12);
  api.walk(w, tDi, tToi, 0.42, 1.8, { face: 0.6, endFace: 0.5, step: 0.25, sfx: "buoc-tuyet", vol: 0.3 });
  api.sfx("may-no", (tu.car || 6.65) - 0.1, 0.55);
  // "and nobody in it." – nhón chân nhìn qua kính: ghế trống; vẫy chào cái ghế
  // gag chào ghế trống: nhón chân sát kính lái, QUAY MẶT nhìn vào ghế trống, vẫy 2 lần về phía ghế,
  // rồi mới quay ra người xem tỉnh bơ, giữ 0,6 s
  var tNhon = tToi + 0.05, tNobody = tu.nobody || 9.14, tVay = tNobody + 0.25, tQuay = tVay + 0.22 + 4 * 0.15 + 0.1, tHa = tQuay + 0.25 + 0.6;
  api.tl.to(w.lift, { y: -42, scaleY: 1.06, scaleX: 0.96, duration: 0.22, ease: "power2.out" }, tNhon);
  api.quay(w, tNhon, 0.85, 0.22);                                            // mặt hướng hẳn vào ô kính lái
  api.look(w, tNhon + 0.05, 15, -3, 0.2);
  api.look(w, tNobody - 0.06, 16, -4, 0.08, 1.2);                             // mắt tròn: ghế trống
  api.lids(w, tNobody - 0.06, 0, 0.06);
  api.armTo(w, "R", tVay, 0.22, -96, "back.out(2)");                         // tay đưa ngang về phía kính
  [-76, -112, -78, -100].forEach(function (a, i) { api.armTo(w, "R", tVay + 0.22 + i * 0.15, 0.15, a, "sine.inOut"); });   // 2 lần vẫy vào ghế
  api.sfx("liu-lo-hoi", tVay + 0.05, 0.6);
  // quay ra người xem, tỉnh bơ, giữ 0,6 s (tay còn giơ)
  api.quay(w, tQuay, 0, 0.22);
  api.look(w, tQuay, 0, 2, 0.2, 1);
  api.lids(w, tQuay + 0.05, 0.5, 0.15);
  api.armTo(w, "R", tHa, 0.25, 0);
  api.tl.to(w.lift, { y: 0, scaleY: 1, scaleX: 1, duration: 0.25, ease: "back.out(2)" }, tHa + 0.05);

  // ---------------------------------------------------------------- camera
  d3.cameraDuong([
    { pos: [-7.4, 2.0, 9.4], nhin: [-4.6, 1.0, -6.5], mo: 0 },                                         // sau hàng rào (cắt ngang chân)
    { tu: 1.25, den: 2.75, kieu: "luot", pos: [-5.0, 1.05, 2.4], nhin: d3.theo(w, [0.35, 0.55, 0]), mo: 8 },
    { tu: (tu.morning || 3.95) - 0.5, den: (tu.morning || 3.95) + 0.25, kieu: "luot", pos: [-2.5, 0.5, 1.7], nhin: [-4.2, 1.72, -6.5], mo: 4, net: [-4.5, 2.3, -6.4], day: 0.002 },
    { tu: tDi - 0.05, den: tDi + 1.6, kieu: "luot", pos: [-2.6, 1.15, 6.4], nhin: d3.theo(w, [1.2, 0.5, 0]), mo: 6, net: "wob", day: 0.0022 },
    { tu: tToi - 0.15, den: tToi + 0.55, kieu: "luot", pos: [1.05, 1.05, 4.6], nhin: [0.85, 0.86, 1.2], mo: 10, day: 0.003 },
    { tu: tQuay + 0.3, den: 12.55, kieu: "luot", pos: [3.5, 7.2, 19], nhin: [3, 0.8, -5], mo: 0, day: 0.0015 }
  ], { day: 0.0025 });
};
