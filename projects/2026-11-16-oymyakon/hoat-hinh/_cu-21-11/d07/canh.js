/* d07 (diorama, cảnh ngoài trời 3D, hồi ức): mép làng ban đêm. Cận Wob cạnh tấm biển tên làng bé tí (biển chỉ tới vai Wob),
 * camera thấp ngang tầm Wob [wob-be-ti] → "So was the village.": camera lùi lên cao [lui-ra-toan-canh], cả làng nhỏ giữa thung
 * lũng trắng như lòng bát → hạ về trung cảnh, Wob lùi một bước, giơ máy ảnh chụp tấm biển ("tách").
 * KHUNG GỐC CHO d30 (tháng Bảy): thế giới dựng trong dungThungLung() với seed 18 — d30 chép nguyên hàm này và góc máy CAM_TRUNG.
 */
window.CANH = function (api, data) {
  "use strict";
  var chu = data.chu_tren_do_vat;                 // ["OYMYAKON"]
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; });   // 0, 2.76, 4.06
  function tuSau(k, sau, macDinh) {   // mốc từ k đầu tiên sau mốc `sau` (từ lặp: "sign" ở nhịp 1 và nhịp 3)
    var t = null;
    data.loi.forEach(function (L) { L.tu.forEach(function (w) { if (t == null && w.start >= sau && w.text.replace(/[^A-Za-z]/g, "").toLowerCase() === k) t = w.start; }); });
    return t == null ? macDinh : t;
  }

  // ---------------------------------------------------------------- thế giới: thung lũng lòng bát, làng nhỏ xa, biển tên bé
  // đêm xanh nhưng đọc rõ: trời, đất sáng hơn bộ "dem" gốc một bậc (khung d06 kết ở đêm xanh đen)
  var DEM = { anhSang: "dem", troiDinh: "#1b2b48", chanTroi: "#4a5f84", troiSang: { tren: "#6680b4", duoi: "#34405e", manh: 1.45 }, nang: { huong: [-20, 30, 14], mau: "#b4c6ff", manh: 1.05 } };
  var d3 = api.ngoaiTroi(Object.assign({ suong: [40, 330], mucTan: [80, 240], seed: 18, bong: { tam: [0, -4], rong: 26, sau: 22 } }, DEM));
  function dungThungLung() {   // GIỮ NGUYÊN Ở d07 VÀ d30
    d3.duong({ x: -5.8, z: -55, dai: 130, rong: 4.6, yaw: Math.PI / 2 + 0.06 });   // ở z = 0 lòng đường x ∈ [−4.8, −0.2]: biển đứng bên lề phải
    var trongDuong = function (x, z) { var dx = x + 5.8, dz = z + 55; return Math.abs(dx * 0.998 - dz * 0.06) < 2.7; };   // true: trong lòng đường
    d3.bienChu(1.05, 0.0, [{ chu: chu[0], co: 12.5 }], { w: 0.92, h: 0.27, cao: 0.22, yaw: -0.12 });
    d3.hangRao(1.9, -1.9, 7, { cao: 1.05, buoc: 0.9 });   // ngang khung sau tấm biển: cảnh toàn vẫn đọc ra hàng rào, không thành vệt đen
    d3.lang({ x: -6, z: -102, rx: 30, rz: 20, hang: 12, seed: 31, khoiTiLe: 0.8, khoi: { cao: 15, troi: 0.5, r0: 0.42, no: 2.2, n: 14, per: 9 } });
    d3.nha(-12, -40, { w: 6.5, h: 3.0, yaw: 0.5, seed: 61, khoi: { cao: 12, troi: 0.4, r0: 0.38, per: 9 } });   // nhà lẻ đầu làng
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
    d3.ngua(-10.5, -24, { yaw: 0.25, cui: 0.35, mau: "#b08a5a", bom: "#3a2a20", mua: "he", seed: 1 });   // ngựa Yakut, chỉ có ở cảnh hè (d30)
    d3.ngua(-7.6, -26.5, { yaw: Math.PI - 0.3, cui: 0.1, mau: "#8a6a4a", bom: "#3a2a20", mua: "he", seed: 2 });
    d3.ngua(4.5, -31, { yaw: 0.15, cui: 0.5, mau: "#6e5240", bom: "#2a1e18", mua: "he", seed: 3 });
    d3.hoaCo({ x0: -9, x1: 7, z0: -5, z1: 3.6, n: 380, co: 0.5, bo: trongDuong, seed: 41 });
    d3.hoaCo({ x0: -32, x1: 30, z0: -48, z1: -5, n: 1100, co: 0.9, tiLeHoa: 0.35, bo: trongDuong, seed: 42 });
  }
  dungThungLung();
  d3.tuyetRoi({ n: 900, vung: [-8, 10, 0, 6, -10, 6], toc: 0.45, co: 0.045 });

  // ---------------------------------------------------------------- Wob: mũ len, khăn, ba lô; máy ảnh nhỏ tay phải; chưa có lông mi
  var w = d3.wob({ x: 0.12, z: 0.35, trangPhuc: { mu: true, khan: true, muMau: "#C9463A", muVanh: "#A8352B", muBong: "#F6EEDC", khanMau: "#D9543C" }, sang: 0.4 });
  w.holdR.insertAdjacentHTML("beforeend", api.mayAnhSVG());
  var flash = w.holdR.querySelector(".flashAnh");
  gsap.set(w.holdR, api.TF(4, 16, 0, 0.9));
  api.armSet(w, "R", 8);
  api.lidsSet(w, 0.15);
  api.breathe(w, 0, 4.4);

  // Lời cảnh 4 đổi (19/11): đoạn mở giữa câu "…was very small." (small 0,47), "So was the village." (1,31–1,7),
  // "I stepped out to take a photo of the sign." (2,61–4,01), "My eyelashes froze." (4,82–5,51), take chậm nối sang d08.
  var tSmall = tu.small != null ? tu.small : 0.47;
  // nhịp 1: liếc tấm biển bé tí rồi nhìn ống kính, tỉnh bơ đúng "small"
  api.quaySet(w, 0.35); api.look(w, 0, 9, 9, 0.01); api.nghieng(w, 0, 3, 0.01);
  api.look(w, tSmall - 0.12, 0, 2, 0.18);
  api.quay(w, tSmall - 0.12, 0, 0.22);
  api.nghieng(w, tSmall - 0.12, 0, 0.22);
  api.lids(w, tSmall - 0.08, 0.5, 0.16);
  // nhịp 2: "So was the village." – mắt đưa lên nhìn về làng xa (camera lùi lên toàn cảnh)
  api.lids(w, N[1] + 0.05, 0.15, 0.15);
  api.look(w, N[1] + 0.1, -4, -10, 0.3);
  // nhịp 3: lùi một bước (thấy bé tí trong toàn cảnh), giơ máy ảnh, bấm đúng "sign": flash 2 khung
  var tStep = tu.stepped != null ? tu.stepped : 2.68;
  api.walk(w, tStep - 0.05, tStep + 0.65, -0.75, 0.95, { face: -0.3, endFace: 0.45, step: 0.22, keepR: true, sfx: "buoc-tuyet", vol: 0.35 });
  var tBam = tuSau("sign", N[2], 4.01) - 0.02, tGio = tBam - 0.62;
  api.look(w, tGio - 0.05, 8, 2, 0.2);
  api.armTo(w, "R", tGio, 0.3, -62, "back.out(1.6)");
  api.tl.to(w.holdR, { attr: api.TF(6, 10, 62, 0.9).attr, duration: 0.3, ease: "back.out(1.6)" }, tGio);   // máy ảnh giữ ngang, ống kính về tấm biển
  api.lids(w, tBam - 0.18, 0.55, 0.1);                                         // nheo mắt ngắm
  api.tl.set(flash, { opacity: 1 }, tBam);
  api.tl.set(flash, { opacity: 0 }, tBam + 2 / 30);                           // chớp đúng 2 khung
  api.sfx("pop", tBam, 0.7);
  api.lids(w, tBam + 0.15, 0.15, 0.12);
  api.look(w, tBam + 0.3, 0, 1, 0.2);                                         // nhìn ống kính, chưa biết gì
  // nhịp 4: "My eyelashes froze." – cận mặt; lông mi bé xíu bật ra đúng "eyelashes", đóng băng thành que đúng "froze"
  var tMi = tuSau("eyelashes", N[3], 5.0), tDong = tuSau("froze", N[3], 5.51);
  api.tl.fromTo([w.lashL, w.lashR], { scale: 0 }, { scale: 1, duration: 0.18, ease: "back.out(3)", immediateRender: false }, tMi - 0.03);
  api.trangPhuc(w, { mi: true }, tDong - 0.02);                               // que băng trắng, nét xanh băng
  api.tl.fromTo([w.lashL, w.lashR], { scale: 1.25 }, { scale: 1, duration: 0.2, ease: "power2.out", immediateRender: false }, tDong - 0.02);
  api.sfx("tach-bang", tDong - 0.02, 0.7);
  api.blink(w, tDong + 0.3, 0.15);                                             // đứng im, chớp mắt, chưa biết gì

  // ---------------------------------------------------------------- camera
  var CAM_TRUNG = { pos: [-0.85, 0.9, 4.0], nhin: [0.08, 0.5, -0.2] };      // d30 dùng lại
  d3.cameraDuong([
    { pos: [0.72, 0.6, 2.7], nhin: [0.52, 0.46, 0], mo: 9 },
    { tu: N[1], den: N[1] + 1.5, kieu: "luot", pos: [4, 14, 40], nhin: [-5, 0, -60], mo: 0, net: [-5, 0, -60], day: 0.0015 },   // toàn cảnh: Wob bé tí ở đáy khung, làng xa; giữ 0,6 s
    { tu: N[1] + 2.1, den: N[1] + 2.95, kieu: "luot", pos: CAM_TRUNG.pos, nhin: CAM_TRUNG.nhin, mo: 6, net: "wob", day: 0.0025 },
    { tu: N[3] - 0.15, den: N[3] + 0.45, kieu: "luot", pos: [-0.72, 0.68, 2.25], nhin: [-0.74, 0.63, 0.95], mo: 12, net: "wob", day: 0.0035 }   // cận mặt cho lông mi
  ], { day: 0.0025 });
};
