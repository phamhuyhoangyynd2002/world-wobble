/* d07 (diorama, cảnh ngoài trời 3D, hồi ức, 12,4 s; biên đạo lại 21/11/2026, nền từ _cu-21-11/d07): mép làng ban đêm.
 * Trong tối Wob bật đèn pin, chùm sáng rọi thẳng vào mặt mình, nheo mắt; quay đèn lên nhiệt kế giấy trên cột: 'JAN AVG' hiện khi
 * đèn đã chiếu tới, thuỷ ngân tụt chạm '−46°C' đúng "forty-six", '−51°F' đúng "fifty-one", Wob rùng mình → chùm đèn hạ xuống dò trên
 * tuyết, tìm thấy tấm biển 'OYMYAKON' bé tí chỉ tới vai Wob; camera thấp ngang tầm Wob [wob-be-ti] → "So was the village.": camera
 * lùi lên cao [lui-ra-toan-canh], cả làng nhỏ xíu giữa thung lũng, giữ 0,3 s → hạ về đúng khung chụp ảnh của d01 (CAM_ANH),
 * flash đúng "photo", lông mi bật ra, đóng băng thành que; Wob đứng im tới cắt.
 * KHUNG CHUNG d01 · d07 · d30: dungThungLung() (seed 18) GIỮ NGUYÊN; xe hộp và cột nhiệt kế thêm 21/11 chỉ có ở d01, d07.
 */
window.CANH = function (api, data) {
  "use strict";
  var chu = data.chu_tren_do_vat;                 // ["JAN AVG", "−46°C", "−51°F", "OYMYAKON"]
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z0-9]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; });   // 0, 3.46, 5.81, 8.48, 9.79
  var T = function (k, d) { return tu[k] != null ? tu[k] : d; };
  var t46 = T("fortysix", 1.89), t51 = T("fiftyone", 4.14), tSmall = T("small", 7.64), tPhoto = T("photo", 10.43);

  // ---------------------------------------------------------------- thế giới: thung lũng lòng bát, làng nhỏ xa, biển tên bé
  var DEM = { anhSang: "dem", troiDinh: "#1b2b48", chanTroi: "#4a5f84", troiSang: { tren: "#6680b4", duoi: "#34405e", manh: 1.45 }, nang: { huong: [-20, 30, 14], mau: "#b4c6ff", manh: 1.05 } };
  var d3 = api.ngoaiTroi(Object.assign({ suong: [40, 330], mucTan: [80, 240], seed: 18, bong: { tam: [0, -4], rong: 26, sau: 22 } }, DEM));
  var V = function (x, y, z) { return new d3.THREE.Vector3(x, y, z); };
  function dungThungLung() {   // GIỮ NGUYÊN Ở d01, d07 VÀ d30
    d3.duong({ x: -5.8, z: -55, dai: 130, rong: 4.6, yaw: Math.PI / 2 + 0.06 });
    var trongDuong = function (x, z) { var dx = x + 5.8, dz = z + 55; return Math.abs(dx * 0.998 - dz * 0.06) < 2.7; };
    d3.bienChu(1.05, 0.0, [{ chu: "OYMYAKON", co: 12.5 }], { w: 0.92, h: 0.27, cao: 0.22, yaw: -0.12 });
    d3.hangRao(1.9, -1.9, 7, { cao: 1.05, buoc: 0.9 });
    d3.lang({ x: -6, z: -102, rx: 30, rz: 20, hang: 12, seed: 31, khoiTiLe: 0.8, khoi: { cao: 15, troi: 0.5, r0: 0.42, no: 2.2, n: 14, per: 9 } });
    d3.nha(-12, -40, { w: 6.5, h: 3.0, yaw: 0.5, seed: 61, khoi: { cao: 12, troi: 0.4, r0: 0.38, per: 9 } });
    d3.rungCay({ x0: -130, x1: -45, z0: -210, z1: -120, n: 55, loai: "tran", cao: [7, 11], seed: 4 });
    d3.rungCay({ x0: 35, x1: 125, z0: -215, z1: -125, n: 55, loai: "tran", cao: [7, 11], seed: 5 });
    d3.rungCay({ x0: -90, x1: 80, z0: -240, z1: -200, n: 60, loai: "tran", cao: [7, 12], seed: 6 });
    d3.rungCay({ x0: -75, x1: -28, z0: -70, z1: -18, n: 22, loai: "tran", cao: [6, 9], seed: 7 });
    d3.rungCay({ x0: 26, x1: 75, z0: -75, z1: -22, n: 22, loai: "tran", cao: [6, 9], seed: 8 });
    d3.nui([
      { x: -175, z: -150, r: 70, cao: 32 }, { x: -95, z: -235, r: 80, cao: 40 }, { x: 15, z: -255, r: 90, cao: 44 }, { x: 125, z: -230, r: 80, cao: 38 },
      { x: 190, z: -140, r: 70, cao: 32 }, { x: -200, z: -40, r: 60, cao: 26 }, { x: 205, z: -30, r: 60, cao: 24 },
      { x: -130, z: -255, r: 50, cao: 66, loai: "nui" }, { x: 60, z: -262, r: 55, cao: 74, loai: "nui" }, { x: 190, z: -225, r: 48, cao: 58, loai: "nui" }
    ]);
    d3.ngua(-10.5, -24, { yaw: 0.25, cui: 0.35, mau: "#b08a5a", bom: "#3a2a20", mua: "he", seed: 1 });
    d3.ngua(-7.6, -26.5, { yaw: Math.PI - 0.3, cui: 0.1, mau: "#8a6a4a", bom: "#3a2a20", mua: "he", seed: 2 });
    d3.ngua(4.5, -31, { yaw: 0.15, cui: 0.5, mau: "#6e5240", bom: "#2a1e18", mua: "he", seed: 3 });
    d3.hoaCo({ x0: -9, x1: 7, z0: -5, z1: 3.6, n: 380, co: 0.5, bo: trongDuong, seed: 41 });
    d3.hoaCo({ x0: -32, x1: 30, z0: -48, z1: -5, n: 1100, co: 0.9, tiLeHoa: 0.35, bo: trongDuong, seed: 42 });
  }
  dungThungLung();
  // thêm cho d01/d07 (21/11): xe hộp kraft đỗ trên đường (ghế lái quay về camera), cột nhiệt kế giấy cạnh biển
  var XE = { x: -3.4, z: 0.1 };
  var xe = d3.xe(XE.x, XE.z, { yaw: Math.PI, mau: "#c9a46a", noMay: false, den: false, cua: true, seed: 3 });
  var nk = d3.nhietKe(1.78, -0.25, { cao: 0.3, w: 0.64, h: 0.95, yaw: -0.18, muc0: 0.62, nhan: [
    { chu: chu[0], co: 7.5, x: 0.31, y: 0.12 },
    { chu: chu[1], co: 9.5, x: 0.33, y: 0.5, mau: "#163a5e" },
    { chu: chu[2], co: 10.5, x: 0.33, y: 0.68, mau: "#163a5e" }
  ] });
  d3.tuyetRoi({ n: 900, vung: [-8, 10, 0, 6, -10, 6], toc: 0.45, co: 0.045 });

  // ---------------------------------------------------------------- Wob: mũ len, khăn, ba lô; máy ảnh tay phải; đèn pin tay trái
  var WX = 0.0, WZ = 0.6;   // chỗ đứng chụp ảnh (chung với d01)
  var w = d3.wob({ x: WX, z: WZ, trangPhuc: { mu: true, khan: true, muMau: "#C9463A", muVanh: "#A8352B", muBong: "#F6EEDC", khanMau: "#D9543C" }, sang: 0.4 });
  w.holdR.insertAdjacentHTML("beforeend", api.mayAnhSVG());
  var flash = w.holdR.querySelector(".flashAnh");
  gsap.set(w.holdR, api.TF(4, 16, 0, 0.9));
  api.armSet(w, "R", 8);
  w.holdL.insertAdjacentHTML("beforeend", api.denPinSVG());
  var denSang = w.holdL.querySelector(".denPin-sang");
  api.armSet(w, "L", 150);
  gsap.set(w.holdL, api.TF(-6, 10, 35, 0.9));            // đèn chĩa về mặt mình
  api.lidsSet(w, 0.15);
  api.breathe(w, 0, 12.4);
  api.quaySet(w, 0.1);
  var tl = api.tl;

  // ---------------------------------------------------------------- chùm đèn
  var tay = function () { var h = api.handWorld("L", gsap.getProperty(w.armL, "rotation")); return w.diem(h[0] - 4, h[1] - 10); };
  var mat = function () { return w.diem(250, 195); };
  var chum = d3.chumDen(tay, mat, { rDich: 0.16, manh: 0.16, sangDich: 0.35 });
  var tBat = -0.05;   // khung 0 đèn đã bật (nối d06)
  chum.bat(tBat, true);
  tl.set(denSang, { opacity: 1 }, tBat);
  // mặt sáng loá, nheo mắt
  d3.moiKhung(function (t) {
    var k = t >= tBat && t < 0.75 ? 1 : (t >= 0.75 && t < 0.95 ? 1 - (t - 0.75) / 0.2 : 0);
    w.mesh.material.emissiveIntensity = 0.4 + 0.45 * k;
  });
  api.lids(w, tBat + 0.02, 0.75, 0.08);
  api.look(w, tBat, -6, -6, 0.1);
  // quay đèn lên nhiệt kế (0,6–0,95)
  api.armTo(w, "L", 0.6, 0.3, 125, "power2.inOut");
  tl.to(w.holdL, Object.assign(api.TF(-6, 10, -42, 0.9), { duration: 0.3, ease: "power2.inOut" }), 0.6);
  chum.toi(0.6, 0.32, function () { return nk.diem(0.2, 0.7); });
  api.lids(w, 0.75, 0.15, 0.15);
  api.look(w, 0.7, 10, -10, 0.15);
  api.quay(w, 0.65, 0.4, 0.25);
  nk.hien(0, 0.95, true);                                   // 'JAN AVG' hiện khi đèn đã chiếu tới
  api.sfx("pop", 0.95, 0.35);
  nk.muc(1.1, t46 - 1.1, 0.22);                             // thuỷ ngân tụt chạm vạch đúng "forty-six"
  api.sfx("drop", t46, 0.5);
  nk.hien(1, t46, true);
  chum.toi(t46 - 0.2, 0.3, function () { return nk.diem(0.2, 0.86); });
  nk.hien(2, t51, true);
  api.sfx("ting", t51, 0.45);
  api.shiver(w, t51 + 0.1, t51 + 0.85, 3.2);
  api.look(w, t51 + 0.9, 0, 2, 0.2);

  // ---------------------------------------------------------------- 5.81: chùm đèn hạ xuống dò trên tuyết, tìm thấy tấm biển bé tí
  api.armTo(w, "L", N[2], 0.4, 100, "sine.inOut");
  tl.to(w.holdL, Object.assign(api.TF(-6, 10, -15, 0.9), { duration: 0.4, ease: "sine.inOut" }), N[2]);
  chum.toi(N[2], 0.55, [0.2, 0.02, -0.2]);
  chum.toi(N[2] + 0.6, 0.5, [-0.2, 0.02, -0.5]);
  chum.toi(N[2] + 1.15, 0.45, [1.05, 0.36, 0.05]);           // dừng trên tấm biển
  api.look(w, N[2] + 0.1, 6, 10, 0.2);
  api.look(w, N[2] + 1.2, 12, 4, 0.2);
  api.quay(w, N[2] + 1.15, 0.35, 0.25);
  api.lids(w, tSmall - 0.08, 0.5, 0.16);
  api.look(w, tSmall - 0.1, 0, 2, 0.18);                    // tỉnh bơ nhìn ống kính đúng "small"
  api.quay(w, tSmall - 0.1, 0, 0.22);
  api.lids(w, N[3] + 0.05, 0.15, 0.15);
  api.look(w, N[3] + 0.1, -4, -10, 0.3);                    // nhìn về làng xa

  // ---------------------------------------------------------------- 9.79–: hạ về khung d01, giơ máy ảnh, flash đúng "photo"; lông mi
  // đèn chĩa xuống tuyết trước chân trái (chùm không cắt ngang người khi chụp)
  api.armTo(w, "L", N[4] - 0.1, 0.35, 70, "sine.inOut");
  tl.to(w.holdL, Object.assign(api.TF(-6, 10, 125, 0.9), { duration: 0.35, ease: "sine.inOut" }), N[4] - 0.1);
  chum.toi(N[4] - 0.1, 0.4, [WX - 0.7, 0.02, WZ + 0.5]);
  var tBam = tPhoto - 0.02, tGio = tBam - 0.55;
  api.look(w, tGio - 0.05, 8, 2, 0.2);
  api.armTo(w, "R", tGio, 0.3, -62, "back.out(1.6)");
  tl.to(w.holdR, { attr: api.TF(6, 10, 62, 0.9).attr, duration: 0.3, ease: "back.out(1.6)" }, tGio);
  api.lids(w, tBam - 0.18, 0.55, 0.1);
  tl.set(flash, { opacity: 1 }, tBam);
  tl.set(flash, { opacity: 0 }, tBam + 2 / 30);
  api.sfx("pop", tBam, 0.7);
  api.lids(w, tBam + 0.15, 0.15, 0.12);
  api.look(w, tBam + 0.3, 0, 1, 0.2);
  var tMi = 10.9, tDong = 11.3;
  api.tl.fromTo([w.lashL, w.lashR], { scale: 0 }, { scale: 1, duration: 0.18, ease: "back.out(3)", immediateRender: false }, tMi);
  api.trangPhuc(w, { mi: true }, tDong);
  api.tl.fromTo([w.lashL, w.lashR], { scale: 1.25 }, { scale: 1, duration: 0.2, ease: "power2.out", immediateRender: false }, tDong);
  api.sfx("tach-bang", tDong, 0.7);
  api.blink(w, tDong + 0.4, 0.15);
  chum.bat(11.5, false); tl.set(denSang, { opacity: 0 }, 11.5);   // tắt đèn: khung cuối khớp d01
  api.sfx("pop", 11.5, 0.3);

  // ---------------------------------------------------------------- camera
  var CAM_ANH = { pos: [0.5, 0.7, 3.3], nhin: [0.62, 0.42, 0] };      // khung chụp ảnh chung với d01
  d3.cameraDuong([
    { pos: [0.55, 0.85, 3.4], nhin: [0.8, 0.6, -0.1], mo: 7 },
    { tu: 0.55, den: 1.3, kieu: "luot", pos: [0.9, 0.95, 2.6], nhin: [1.6, 0.78, -0.25], mo: 9, net: [1.78, 0.75, -0.25], day: 0.002 },   // nhiệt kế ≥ 40 px
    { tu: N[2] - 0.1, den: N[2] + 0.7, kieu: "luot", pos: [0.05, 0.36, 2.35], nhin: [0.95, 0.3, 0], mo: 8, net: [1.05, 0.35, 0], day: 0.0025 },   // thấp ngang tầm Wob
    { tu: N[3], den: N[3] + 0.9, kieu: "luot", pos: [4, 14, 40], nhin: [-5, 0, -60], mo: 0, net: [-5, 0, -60], day: 0.0012 },   // toàn cảnh; giữ 0,3 s
    { tu: N[4] - 0.1, den: N[4] + 0.55, kieu: "luot", pos: CAM_ANH.pos, nhin: CAM_ANH.nhin, mo: 8, net: "wob", day: 0.0022 },
    { tu: tDong - 0.6, den: tDong - 0.1, kieu: "luot", pos: d3.theo(w, [0.08, 0.63, 1.3]), nhin: d3.theo(w, [0.02, 0.6, 0]), mo: 12, net: "wob", day: 0.003 }
  ], { day: 0.0025 });
  // khung 0 lúc render: vẽ lại khi font + ảnh đã sẵn (lần dựng đầu có thể chưa có con rối)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { d3.veLai(); });
};
