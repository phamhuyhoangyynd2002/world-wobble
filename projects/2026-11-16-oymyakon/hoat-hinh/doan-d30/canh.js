/* d30 (diorama, cảnh ngoài trời 3D, hồi ức): cắt cứng đổi mùa [cat-cung-doi-mua] trên ĐÚNG khung d07 (cùng seed 18,
 * cùng thế giới dungThungLung(), cùng góc máy trung cảnh CAM_TRUNG). Đêm mùa đông: Wob (mũ len, khăn, lông mi đóng băng,
 * ba lô phồng thò đuôi cá) lạch bạch rời tấm biển ra khỏi khung; khung trống, tuyết rơi. Ngay trước "July": cắt sang trưa
 * hè (d3.doiMua: cỏ, đường đất, mái tôn, cây xanh, không tuyết, không khói ống khói; ánh sáng "trua-he"). Wob bước vào,
 * trùm áo lông, mũ lông, lông mi rủ, mồ hôi; khoanh tay hất cằm; camera lướt qua thung lũng xanh, ngựa xa; về Wob gật đầu.
 */
window.CANH = function (api, data) {
  "use strict";
  var chu = data.chu_tren_do_vat;                 // ["OYMYAKON"]
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; });   // 0, 1.25, 2.44, 3.32, 4.89, 8.14

  // ---------------------------------------------------------------- thế giới: y hệt d07 (đêm), đổi mùa ở tCat
  var DEM = { anhSang: "dem", troiDinh: "#1b2b48", chanTroi: "#4a5f84", troiSang: { tren: "#6680b4", duoi: "#34405e", manh: 1.45 }, nang: { huong: [-20, 30, 14], mau: "#b4c6ff", manh: 1.05 } };
  var d3 = api.ngoaiTroi(Object.assign({ suong: [40, 330], mucTan: [80, 240], seed: 18, bong: { tam: [-2, -16], rong: 38, sau: 32 } }, DEM));
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
  d3.tuyetRoi({ n: 900, vung: [-8, 10, 0, 6, -10, 6], toc: 0.45, co: 0.045 });       // mùa hè tự tắt
  var tCat = Math.min(N[2], (tu.july || 2.51) - 0.07);                               // cắt cứng ngay trước "July"
  d3.doiMua(tCat, "he", { anhSang: "trua-he" });

  // ---------------------------------------------------------------- Wob
  var w = d3.wob({ x: -0.55, z: 0.9, trangPhuc: { mu: true, khan: true, mi: true, baLoPhong: true, muMau: "#C9463A", muVanh: "#A8352B", muBong: "#F6EEDC", khanMau: "#D9543C" }, sang: 0.4 });
  d3.moiKhung(function (t) { w.mesh.material.emissiveIntensity = t < tCat ? 0.4 : 0.06; });   // giữa trưa: Wob nhận nắng thật
  api.lidsSet(w, 0.2);
  // mùa đông: lạch bạch rời tấm biển, ra khỏi khung bên trái
  api.quaySet(w, -0.5);
  api.walk(w, 0.12, 1.5, -4.4, 1.5, { face: -0.6, endFace: -0.6, step: 0.2, swing: 26, sfx: "buoc-tuyet", vol: 0.32 });
  api.shiver(w, 0.12, 0.5, 2);
  // mùa hè: cùng con rối, đồ khác (luật liên tục với d31: áo lông, mũ lông, ba lô phồng, lông mi rủ, mồ hôi)
  api.trangPhuc(w, { mu: false, khan: false, mi: false, aoLong: true, muLong: true, miRu: true, baLoPhong: true }, tCat);
  var tVao = tCat + 0.08, tBuong = (tu.partly || 3.37) - 0.06;
  api.walk(w, tVao, tBuong - 0.06, -0.6, 0.95, { face: 0.55, endFace: 0, step: 0.24, swing: 14, sfx: "buoc-tuyet", vol: 0.22 });
  api.lids(w, tVao, 0.45, 0.1);
  api.blinks(w, tVao + 1.0, 4.6, [], 0.45);
  // "Partly out of stubbornness." – khoanh tay, hất cằm, mồ hôi rơi
  api.armTo(w, "L", tBuong, 0.22, -68, "back.out(1.8)");
  api.armTo(w, "R", tBuong + 0.03, 0.22, 68, "back.out(1.8)");
  api.nghieng(w, tBuong + 0.05, -5, 0.25);
  api.look(w, tBuong + 0.05, 6, -9, 0.2);
  api.lids(w, tBuong + 0.05, 0.55, 0.15);
  api.moHoi(w, (tu.stubbornness || 3.85) - 0.1, { x: 290, y: 118, roi: 90, d: 0.9 });
  api.moHoi(w, 4.45, { x: 116, y: 128, roi: 80, d: 0.85, co: 0.85 });
  api.moHoi(w, 5.5, { x: 300, y: 104, roi: 95, d: 0.9 });
  api.moHoi(w, 6.6, { x: 120, y: 118, roi: 85, d: 0.9, co: 0.9 });
  // "It does." – gật đầu, giọt mồ hôi văng
  var tGat = (tu.does || 8.29) - 0.12;
  api.nghieng(w, 7.3, 0, 0.3);
  api.look(w, 7.5, 0, 2, 0.2);
  api.lids(w, 7.5, 0.45, 0.15);
  api.tl.to(w.talk, { rotation: 0, y: 16, svgOrigin: "200 290", duration: 0.12, ease: "power2.out" }, tGat);
  api.tl.to(w.talk, { y: 0, svgOrigin: "200 290", duration: 0.3, ease: "back.out(2.5)" }, tGat + 0.14);
  api.moHoi(w, tGat + 0.1, { x: 300, y: 104, vx: 210, roi: 120, d: 0.55 });
  api.moHoi(w, tGat + 0.12, { x: 104, y: 120, vx: -190, roi: 110, d: 0.55, co: 0.85 });

  // ---------------------------------------------------------------- camera: khung trung cảnh của d07 → lướt thung lũng → về Wob
  var CAM_TRUNG = { pos: [-0.85, 0.9, 4.0], nhin: [0.08, 0.5, -0.2] };      // y hệt d07
  d3.cameraDuong([
    { pos: CAM_TRUNG.pos, nhin: CAM_TRUNG.nhin, mo: 6, net: "wob", day: 0.0012 },
    { tu: 1.45, den: 1.46, kieu: "luot", net: [0.4, 0.5, 0], day: 0.0012 },                    // khung trống: nét ở tấm biển
    { tu: tCat, den: tCat, pos: CAM_TRUNG.pos, nhin: CAM_TRUNG.nhin, net: "wob", day: 0.0016 },   // cắt cứng: đúng khung đầu
    { tu: (tu.mostly || 4.94) - 0.12, den: 6.35, kieu: "luot", pos: [-1.8, 4.6, -7], nhin: [-6, 0.5, -62], mo: 0, net: [-6, 0, -62], day: 0.0015 },
    { tu: 7.35, den: 8.0, kieu: "luot", pos: [-0.25, 0.78, 3.0], nhin: [-0.55, 0.52, 0.9], mo: 9, net: "wob", day: 0.003 }
  ], { day: 0.0025 });
};
