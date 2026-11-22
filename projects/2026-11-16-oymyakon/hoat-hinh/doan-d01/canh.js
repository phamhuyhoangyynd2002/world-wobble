/* d01 (diorama, cảnh ngoài trời 3D, hồi ức, 4,9 s; biên đạo lại 21/11/2026, nền từ _cu-21-11/d07): mở video, cold open.
 * Khung 0 đã chuyển động: làng tối xanh, khói dựng đứng, cửa xe hộp kraft đang bật mở, Wob nửa người ló ra rồi nhảy xuống tuyết,
 * lạch bạch tới chỗ tấm biển bé tí → máy đặt ngang vai Wob (chữ 'OYMYAKON' ≥ 40 px), Wob hăm hở giơ máy ảnh, flash đúng "photo"
 * → camera đẩy nhanh vào cận mặt [lao-vao-can-canh]: lông mi bé xíu bật ra đúng "eyelashes", đóng băng thành que đúng "froze";
 * Wob đứng im chưa biết; giữ tới cắt. Tay trái cầm đèn pin đã tắt (khớp d07).
 * KHUNG CHUNG d01 · d07 · d30: dungThungLung() (seed 18) GIỮ NGUYÊN; xe hộp, cột nhiệt kế, chỗ đứng chụp (WX, WZ) và CAM_ANH
 * giống hệt d07 để cú gọi lại khớp.
 */
window.CANH = function (api, data) {
  "use strict";
  var chu = data.chu_tren_do_vat;                 // ["OYMYAKON"] (nhiệt kế d01 chưa có nhãn: chữ JAN AVG… không thuộc đoạn này)
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z0-9]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; });   // 0, 1.3, 2.9
  var T = function (k, d) { return tu[k] != null ? tu[k] : d; };
  var tPhoto = T("photo", 2.71), tMi = T("eyelashes", 3.74), tDong = T("froze", 4.25);

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
  var nk = d3.nhietKe(1.78, -0.25, { cao: 0.3, w: 0.64, h: 0.95, yaw: -0.18, muc0: 0.62, nhan: [] });   // như d07, chưa hiện nhãn
  d3.tuyetRoi({ n: 900, vung: [-8, 10, 0, 6, -10, 6], toc: 0.45, co: 0.045 });

  // ---------------------------------------------------------------- Wob: mũ len, khăn, ba lô; máy ảnh tay phải; đèn pin (tắt) tay trái
  var WX = 0.0, WZ = 0.6;   // chỗ đứng chụp ảnh (chung với d07)
  var tl = api.tl;
  var w = d3.wob({ x: XE.x - 0.15, y: 0.32, z: XE.z + 0.95, trangPhuc: { mu: true, khan: true, muMau: "#C9463A", muVanh: "#A8352B", muBong: "#F6EEDC", khanMau: "#D9543C" }, sang: 0.4 });
  w.holdR.insertAdjacentHTML("beforeend", api.mayAnhSVG());
  var flash = w.holdR.querySelector(".flashAnh");
  gsap.set(w.holdR, api.TF(4, 16, 0, 0.9));
  api.armSet(w, "R", 8);
  w.holdL.insertAdjacentHTML("beforeend", api.denPinSVG());
  gsap.set(w.holdL, api.TF(-4, 14, 90, 0.9));             // đèn pin tắt, chúc xuống
  api.armSet(w, "L", 20);
  api.lidsSet(w, 0);
  api.breathe(w, 1.6, 4.9);

  // ---------------------------------------------------------------- 0–1.3: cửa xe đang bật mở, Wob ló nửa người, nhảy xuống tuyết, lạch bạch tới biển
  xe.moCua(-0.4, 0.5, 1.2);
  api.quaySet(w, 0.3);
  api.look(w, 0, 8, -4, 0.01);
  tl.fromTo(w.pos, { z: XE.z + 0.95 }, { z: XE.z + 1.4, duration: 0.42, ease: "power1.out", immediateRender: false }, 0.05);
  tl.fromTo(w.pos, { y: 0.32 }, { y: 0.62, duration: 0.2, ease: "power2.out", immediateRender: false }, 0.05);
  tl.to(w.pos, { y: 0, duration: 0.22, ease: "power2.in" }, 0.25);
  tl.to(w.lift, { scaleY: 0.86, scaleX: 1.1, duration: 0.06, ease: "power2.out" }, 0.47);
  tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.2, ease: "back.out(3)" }, 0.53);
  api.armTo(w, "R", 0.05, 0.2, -120, "power2.out");        // hai tay vung khi nhảy
  api.armTo(w, "L", 0.05, 0.2, 120, "power2.out");
  api.armTo(w, "R", 0.4, 0.2, 8, "power2.inOut");
  api.armTo(w, "L", 0.4, 0.2, 20, "power2.inOut");
  api.sfx("buoc-tuyet", 0.47, 0.55);
  w.x = XE.x - 0.15; w.z = XE.z + 1.4;
  api.walk(w, 0.6, 1.95, WX, WZ, { face: 0.55, endFace: 0.35, step: 0.16, keepR: true, sfx: "buoc-tuyet", vol: 0.3 });
  api.look(w, 0.6, 10, 2, 0.15);

  // ---------------------------------------------------------------- 1.3–2.9: giơ máy ảnh ngắm biển, flash đúng "photo"
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
  api.quay(w, tBam + 0.25, 0.1, 0.25);

  // ---------------------------------------------------------------- 2.9–4.9: lông mi bật ra đúng "eyelashes", đóng băng đúng "froze"
  tl.fromTo([w.lashL, w.lashR], { scale: 0 }, { scale: 1, duration: 0.18, ease: "back.out(3)", immediateRender: false }, tMi - 0.03);
  api.trangPhuc(w, { mi: true }, tDong - 0.02);
  tl.fromTo([w.lashL, w.lashR], { scale: 1.25 }, { scale: 1, duration: 0.2, ease: "power2.out", immediateRender: false }, tDong - 0.02);
  api.sfx("tach-bang", tDong - 0.02, 0.7);
  api.blink(w, tDong + 0.3, 0.15);

  // ---------------------------------------------------------------- camera
  var CAM_ANH = { pos: [0.5, 0.7, 3.3], nhin: [0.62, 0.42, 0] };      // khung chụp ảnh chung với d07
  d3.cameraDuong([
    { pos: [XE.x + 1.6, 1.0, 4.4], nhin: [XE.x - 0.1, 0.55, 1.0], mo: 6 },
    { tu: 0.55, den: N[1] + 0.5, kieu: "luot", pos: CAM_ANH.pos, nhin: CAM_ANH.nhin, mo: 8, net: "wob", day: 0.0022 },
    { tu: N[2], den: N[2] + 0.7, kieu: "luot", pos: d3.theo(w, [0.08, 0.63, 1.3]), nhin: d3.theo(w, [0.02, 0.6, 0]), mo: 12, net: "wob", day: 0.003 }
  ], { day: 0.0025 });
  // khung 0 lúc render: vẽ lại khi font + ảnh đã sẵn (lần dựng đầu có thể chưa có con rối)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { d3.veLai(); });
};
