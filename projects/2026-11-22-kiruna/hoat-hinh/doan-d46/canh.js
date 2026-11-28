/* Đoạn d46 (diorama, hiện tại, 21,77 s) – phán quyết SUMMER ONLY, treo chìa lên đinh cửa sổ chỉ về phía đông.
 * Vào cat, ra cat. Bố cục bàn chung tập 6 (ban6), đèn sáng. Hộ chiếu Kiruna dựng trên bàn, con dấu cao su cạnh Wob.
 * 0,05 Wob nhìn trang sổ, tay đặt lên ngực, gật chậm. 1,70 liếc công tắc, rùng mình.
 * 2,7 hộ chiếu lật ra GIỮA khung (HC_LON x 558, y 200), Wob nhấc dấu, hà hơi; dấu chạm giấy 3,28 (trước "Summer" 3,33):
 * SUMMER ONLY cỡ 120, khung đôi nghiêng, #a8322a; giữ to giữa khung 3,33–6,33, thu về ô dấu 6,33–6,63; dau-wob đúng lúc chạm. Đúng một lần.
 * "carry" 5,84 Wob vác thùng các-tông nặng. "leave before the sun" 7,31 vẫy chào mặt trời pop-up đang lặn sau đồi.
 * 8,87 [luot-smootherstep] pop-up nhà gỗ phủ tuyết có người giấy đọc sách bên cửa sổ, khói bếp; Wob chỉ vào nó, chỉ ra người xem, nhún vai.
 * 13,86 nhặt chìa dưới chân đèn, bước tới cửa sổ bên trái, treo lên đinh đúng "nail" 14,75; chìa đung đưa, dừng chỉ sang PHẢI đúng "east," 16,44,
 * rồi tự nhích thêm về phía đông; Wob nhìn nó, nhìn người xem; 18,70 [day-vao-cham] Wob chỉ vào chìa, camera đẩy chậm, giữ tới hết.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // KIRUNA, SWEDEN, Would Wob move here?, SUMMER ONLY
  // ---------------------------------------------------------------- BÀN TẬP 6 (khối chung d01 d03 d05 d38 d43 d44 d46; d47 dùng đuôi tập)
  // Sổ gáy x −120 z −240, trang 480×600 (map-kiruna dán trang phải, cắt quanh chấm Kiruna); đèn bàn (−380, −780) đế x −614…−366;
  // chìa "dưới chân đèn" ở CHAN_DEN (trước đế); ba lô nhỏ dựa đầu phải đế đèn (BALO); công tắc dây CT; cửa sổ ĐỨNG bên trái bàn (đinh cột phải);
  // áo phao xanh lam + mũ len xanh lá thông trên móc tường (x 300); hộp kỷ vật sau bên phải; cốc trà cạnh góc sổ.
  function banTap6(api, data, o) {
    o = o || {};
    var C = api.C, sk = api.sk, fp = api.fp;
    var SO = { x: -120, z: -240, w: 480, d: 600 };
    var MAP = { x0: 990, y0: 160, k: 1.1 };
    var mapUV = function (px, py) { return [(px - MAP.x0) / MAP.k, (py - MAP.y0) / MAP.k]; };
    var KIR = mapUV(1320, 520), BC_Y = (591.2 - MAP.y0) / MAP.k;          // chấm Kiruna, vòng Bắc Cực (66,56°N) trên trang
    var trangMap = function (them, src, mk) {
      var M = mk || MAP, vw = SO.w * M.k, vh = SO.d * M.k;
      return '<rect x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" fill="#3f6a70"/>' +
        '<svg x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" viewBox="' + (M.x0 + 14 * M.k) + " " + (M.y0 + 14 * M.k) + " " + (vw - 28 * M.k) + " " + (vh - 28 * M.k) +
        '" preserveAspectRatio="none"><image href="ban-do/' + (src || "map-kiruna") + '.svg" x="0" y="0" width="1920" height="1080"/></svg>' +
        '<rect x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" fill="none" stroke="' + C.INK + '" stroke-width="5"/>' +
        fp("M 0 30 L 46 0 L 70 22 L 24 54 Z", "#e9dcb4", 2, ' opacity=".85"') + fp("M " + (SO.w - 70) + " 22 L " + (SO.w - 46) + " 0 L " + SO.w + " 30 L " + (SO.w - 24) + " 54 Z", "#e9dcb4", 2, ' opacity=".85"') + (them || "");
    };
    var biaTrong = fp("M 80 330 L 170 220 L 220 280 L 270 200 L 380 330 Z", "#9aa7a8", 4) + fp("M 150 244 L 170 220 L 190 244 Z M 252 222 L 270 200 L 288 222 Z", "#fbfbf6", 3) +
      sk("M 70 120 l 0 -40 M 50 100 l 40 0 M 56 86 l 28 28 M 84 86 l -28 28", 4, C.ICE2) + sk("M 80 470 C 160 440 260 500 380 460", 3, C.INK, ' stroke-dasharray="2 10"');
    var DEN = { x: -380, z: -780 };
    var ban = api.dungBan({ hop: { x: 760, z: -840 }, den: DEN, wob: o.wob, ongBut: o.ongBut, so: { x: SO.x, z: SO.z, w: SO.w, d: SO.d, lop: o.lop || [], biaTrong: biaTrong } });
    var w = ban.wob, so = ban.so, TY = ban.TY, the = ban.the;
    gsap.set(so.cover, { rotationY: -180 });
    if (w) { api.matKhongRong(w); w.pack.style.display = "none"; w.strap.style.display = "none"; }   // ở nhà: không đeo ba lô
    api.cut(the, 220, 330, api.aoPhaoTreoSVG({ mu: true }), { pos: { x: 300, y: -440, z: -1270, scale: 1.5 }, ay: 4, f: api.F.AM });   // áo phao + mũ len trên móc tường
    var BALO = { x: -330, z: -765 };
    var baLo = api.cut(the, 130, 160, api.baLoNhoSVG(), { pos: { x: BALO.x, y: TY, z: BALO.z, rotationZ: -7 }, f: api.F.AM_NHO });  // ba lô nhỏ dựa đầu phải chân đèn
    var CS = { x: -880, z: -1000, w: 380, h: 520 };
    var cuaSo = api.cut(the, CS.w + 30, CS.h, '<g transform="translate(15 0)">' + api.cuaSoSVG(CS.w, CS.h, { troi: o.troiCuaSo || "dem", giot: o.giotCuaSo, seed: 66 }) + "</g>", { pos: { x: CS.x, y: TY, z: CS.z }, f: api.F.AM });
    var DD = api.cuaSoDinh(CS.w, CS.h), DINH = { x: CS.x - CS.w / 2 + DD[0], y: TY - CS.h + DD[1], z: CS.z + 2 };
    // dây đèn trên mặt bàn + công tắc
    api.cut(the, 200, 40, sk("M 4 20 C 60 4 120 36 196 18", 5, "#2f3b3c"), { pos: { x: -380, y: TY - 2, z: -735, rotationX: 90, rotationZ: -24 }, ax: 0, ay: 20 });
    var CT = { x: -190, z: -655 };
    var congTac = api.cut(the, 120, 70, api.congTacSVG(), { pos: { x: CT.x, y: TY, z: CT.z, scale: 1.1 }, f: api.F.AM_NHO });
    var ctCan = congTac.svg.querySelector(".ct-can");
    gsap.set(ctCan, { rotation: o.denTat ? -30 : 30, svgOrigin: "80 46" });
    var CHAN_DEN = { x: -520, z: -690 };                                     // chỗ chìa nằm "dưới chân đèn" (trước đế, trong quầng đèn)
    // cốc trà (hơi mảnh)
    var cocT = api.cocNong({ caoHoi: 70, troiHoi: 6, seed: 61 });
    var COC = { x: 470, z: -470 };
    var coc = api.cut(the, 140, 240, '<g transform="translate(60 228)">' + cocT.svg + "</g>", { pos: { x: COC.x, y: TY, z: COC.z, scale: 0.8 }, ax: 60, ay: 228, f: api.F.AM_NHO });
    cocT.hoi.chay(coc.svg, null, null);
    var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
    var goc = function (side, x, y) {
      var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
      var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
    };
    return { ban: ban, w: w, so: so, R: ban.rig, TY: TY, the: the, SO: SO, MAP: MAP, mapUV: mapUV, KIR: KIR, BC_Y: BC_Y, trangMap: trangMap,
      DEN: DEN, BALO: BALO, baLo: baLo, CS: CS, cuaSo: cuaSo, DINH: DINH, CT: CT, congTac: congTac, ctCan: ctCan, CHAN_DEN: CHAN_DEN, COC: COC, coc: coc, goc: goc,
      diemTrang: function (u, v, cao) { return { x: SO.x + u, y: TY - (cao || 10), z: SO.z - SO.d / 2 + v }; } };
  }
  // khẩu hình đoạn nghiêm: X, D (trông như cười) → N, C
  function khauHinhTram(api, w, o) {
    (api.data.loi || []).forEach(function (L) { (L.khau_hinh || []).forEach(function (c) { if (c.value === "X") c.value = "N"; else if (c.value === "D") c.value = "C"; }); });
    return api.khauHinh(w, Object.assign({ sau: "N" }, o || {}));
  }
  // mốc từ lần đọc đầu sau t0 (từ lặp trong câu)
  function tuSau(data, re, t0, mac) { var r = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (re.test(x.text) && x.start > t0 && r === null) r = x.start; }); }); return r === null ? mac : r; }
  // ---------------------------------------------------------------- hết khối chung
  var WX = -60, WZ = -600;
  // pop-up: mặt trời sau đồi (lặn được), nhà gỗ phủ tuyết + khói
  var sunL = '<g class="mt"><g transform="translate(80 70)">' + api.matTroiGiaySVG(34) + "</g></g>" +
    fp("M 0 200 L 0 130 C 40 104 70 118 100 128 C 130 112 150 116 160 126 L 160 200 Z", "#9bb3a0", 4);
  var NT = { w: 200, h: 170 }, NK = api.NHA_TUYET_KHOI(NT.w, NT.h);
  var khoi = api.cotKhoi({ x: NK[0], y: NK[1] + 110, cao: 110, r0: 6, no: 1.6, troi: 12, n: 16, per: 3.2, seed: 64 });
  var lop = [
    api.lopPopup.tuy(sunL, 160, 200, { x: 110, banLe: -210 }),
    api.lopPopup.tuy(khoi.svg + '<g transform="translate(0 110)">' + api.nhaTuyetDocSachSVG(NT.w, NT.h) + "</g>", NT.w, NT.h + 110, { x: 300, banLe: -90, khoi: [khoi] })
  ];
  var B = banTap6(api, data, { wob: { x: WX, z: WZ, s: 0.9 }, lop: lop });
  var w = B.w, R = B.R, TY = B.TY, the = B.the, so = B.so, goc = B.goc, ban = B.ban;
  gsap.set(so.lop[0], { rotationX: -90 });
  gsap.set(so.lop[1], { visibility: "hidden" });
  var mt = so.lop[0].svg.querySelector(".mt");
  // chìa dưới chân đèn, chùm chìa nhà, hộ chiếu dựng, con dấu trên bàn
  var CD = B.CHAN_DEN;
  var ckNam = api.cut(the, 200, 140, '<g transform="translate(50 30) rotate(-8)">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>", { pos: { x: CD.x, y: TY - 4, z: CD.z, rotationX: 90 }, ax: 50, ay: 30, f: api.F.AM_NHO });
  var chum = api.cut(the, 170, 190, '<g transform="translate(70 40) rotate(-25)">' + api.chumChiaNhaSVG({ kiruna: true }) + "</g>", { pos: { x: -425, y: TY - 4, z: -640, rotationX: 90 }, ax: 70, ay: 40, f: api.F.AM_NHO });
  gsap.set(chum.svg.querySelector(".ck-kiruna"), { opacity: 0 });
  var HB = api.HC_LON;
  var hcBan = api.cut(the, HB.W, HB.H, '<g data-layout-ignore>' + api.theHoChieuSVG({ noi: chu[0], nuoc: chu[1], hoi: chu[2], bo: HB }) + "</g>", { pos: { x: -395, y: TY, z: -735, scale: 0.34, rotationX: -8 }, ax: HB.W / 2, ay: HB.H, f: api.F.AM_NHO });
  var DB = { x: 95, z: -545 };
  var dauBan = api.cut(the, 120, 130, '<g transform="translate(60 22)">' + api.conDauSVG() + "</g>", { pos: { x: DB.x, y: TY, z: DB.z, scale: 0.8 }, f: api.F.AM_NHO });
  // đồ trong tay
  w.holdR.insertAdjacentHTML("beforeend", '<g class="dau-tay" opacity="0"><g transform="scale(.75)">' + api.conDauSVG() + "</g></g>");
  var dauTay = w.holdR.querySelector(".dau-tay");
  w.holdL.insertAdjacentHTML("beforeend", '<g class="ck" opacity="0">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>");
  var ck = w.holdL.querySelector(".ck");
  w.upper.insertAdjacentHTML("beforeend", '<g class="vac" opacity="0"><g transform="translate(300 96) scale(2.1)">' + api.thungGiaySVG() + "</g></g>");
  var vac = w.upper.querySelector(".vac");
  // chìa treo trên đinh cửa sổ (quay quanh lỗ đầu chìa; 0° = mũi chỉ sang phải)
  var D = B.DINH;
  var ckTreo = api.cut(the, 340, 340, '<g class="ckt" transform="translate(170 170)"><g class="ckt-r">' + api.chiaKirunaSVG({ dai: 130 }) + "</g></g>", { pos: { x: D.x, y: D.y + 170, z: D.z + 4 }, ax: 170, ay: 340, f: api.F.AM_NHO });
  var cktR = ckTreo.svg.querySelector(".ckt-r"), cktThe = ckTreo.svg.querySelector(".ck-the");
  gsap.set(ckTreo, { opacity: 0 });

  var wc = function (x, y, wx) { return [200 + (x - (wx == null ? w.x : wx)) / 0.9, 392 + (y - TY) / 0.9]; };
  var hp = function (side, A, wa, dx, dy, s) { var h = api.handWorld(side, A); return api.holdPose(side, A, h[0] + (dx || 0), h[1] + (dy || 0), wa || 0, s); };

  // ---------------------------------------------------------------- tư thế đầu, camera
  api.quaySet(w, 0.35);
  api.look(w, 0, 10, 12, 0.01);
  api.camSet(R, null, { cx: -60, cy: 70, cz: -470, k: 520, rx: -20, ry: 0 });
  // 0,05 tay lên ngực, gật chậm
  api.armTo(w, "R", 0.05, 0.4, goc("R", 236, 262), "power2.inOut");
  api.look(w, 0.5, 6, 18, 0.35); api.lids(w, 0.5, 0.5, 0.35);
  api.look(w, 1.05, 6, 4, 0.35); api.lids(w, 1.05, 0.25, 0.3);
  // 1,70 liếc công tắc, rùng mình
  api.armTo(w, "R", 1.6, 0.3, -6, "power2.inOut");
  api.quay(w, 1.7, -0.4, 0.2);
  api.look(w, 1.72, -18, 12, 0.12); api.lids(w, 1.72, 0, 0.1);
  api.shiver(w, 2.05, 2.5, 4);
  api.sfx("brr", 2.05, 0.3);
  // 2,55 camera để Wob ở nửa phải; hộ chiếu ra giữa khung
  api.camTo(R, 2.4, 0.45, { cx: -400, cy: 40, cz: -560, k: 560, rx: -14, ry: 0 }, "power2.inOut");
  var hc = api.theHoChieu({ noi: chu[0], nuoc: chu[1], hoi: chu[2], x: 558, y: 200, bo: HB });
  hc.vao(2.72, 0.36);
  tl.to(hcBan, { opacity: 0, duration: 0.12 }, 2.72);              // thẻ trên bàn "bay" ra thành thẻ lớn: không hiện hai thẻ cùng lúc
  api.sfx("lat-giay", 2.72, 0.5);
  // nhấc dấu, hà hơi
  var AD0 = goc("R", 360, 320), AD1 = goc("R", 362, 150);
  api.quay(w, 2.55, 0.35, 0.2); api.look(w, 2.6, 12, 12, 0.12);
  api.armTo(w, "R", 2.58, 0.15, AD0, "power2.out");
  tl.set(dauBan, { opacity: 0 }, 2.73);
  tl.set(dauTay, hp("R", AD0, 0, 0, -30), 2.73); tl.set(dauTay, { opacity: 1 }, 2.73);
  api.armTo(w, "R", 2.75, 0.2, AD1, "power2.inOut");
  tl.to(dauTay, Object.assign(hp("R", AD1, 180, 0, 10), { duration: 0.2, ease: "power2.inOut" }), 2.75);
  w.upper.insertAdjacentHTML("beforeend", '<g class="ha-hoi" opacity="0">' + sk("M 268 236 q 10 -6 18 2 q 8 -8 16 2", 3.5, "#9fb6c4") + sk("M 276 216 q 10 -6 18 2", 3, "#9fb6c4") + "</g>");
  var haHoi = w.upper.querySelector(".ha-hoi");
  api.mouth(w, 2.84, "O"); api.mouth(w, 3.02, "X");
  tl.fromTo(haHoi, { opacity: 0, y: 0 }, { opacity: 0.9, y: -12, duration: 0.14, immediateRender: false }, 2.86);
  tl.to(haHoi, { opacity: 0, y: -24, duration: 0.14 }, 3.0);
  api.look(w, 2.95, -12, -2, 0.1);
  // ---------------------------------------------------------------- dấu SUMMER ONLY (đúng một lần)
  var tDap = (tu.summer || 3.33) - 0.05;
  var ov = api.div("dio-ovl", api.root, "z-index:42;");
  ov.setAttribute("data-layout-allow-occlusion", "");
  ov.innerHTML = '<svg width="1920" height="1080" viewBox="0 0 1920 1080" style="position:absolute;left:0;top:0;overflow:visible" data-layout-allow-overflow>' +
    '<g class="dau-to"><g class="dau-to-s">' + api.dauEpSVG(chu[3], 0, 0, 120, -8, "dau-so") + "</g></g>" +
    '<g class="dau-cs"><g transform="scale(2.6)">' + api.conDauSVG() + "</g></g></svg>";
  var dauTo = ov.querySelector(".dau-to"), dauToS = ov.querySelector(".dau-to-s"), dauCs = ov.querySelector(".dau-cs");
  var TAM = [930, 450], O = hc.o();
  gsap.set(dauTo, { x: TAM[0], y: TAM[1], opacity: 0 }); gsap.set(dauToS, { scale: 1, svgOrigin: "0 0" });   // co quanh tâm dấu, không quanh góc hộp bao
  gsap.set(dauCs, { x: 1300, y: 1300, rotation: 25, opacity: 0 });
  tl.set(dauTay, { opacity: 0 }, tDap - 0.3);
  api.armTo(w, "R", tDap - 0.3, 0.22, goc("R", 340, 120), "power2.out");
  tl.set(dauCs, { opacity: 1 }, tDap - 0.3);
  tl.to(dauCs, { x: TAM[0], y: TAM[1] - 96 * 2.6, rotation: 0, duration: 0.2, ease: "power2.out" }, tDap - 0.3);
  tl.to(dauCs, { y: TAM[1] - 96 * 2.6 - 34, duration: 0.06, ease: "power1.out" }, tDap - 0.1);
  tl.to(dauCs, { y: TAM[1] - 96 * 2.6 + 6, duration: 0.04, ease: "power3.in" }, tDap - 0.04);
  tl.set(dauTo, { opacity: 1 }, tDap);
  tl.fromTo(dauToS, { scale: 1.08 }, { scale: 1, svgOrigin: "0 0", duration: 0.12, ease: "power2.out", immediateRender: false }, tDap);
  tl.to(dauCs, { x: 1350, y: 1260, rotation: 30, duration: 0.32, ease: "power2.in" }, tDap + 0.1);
  tl.set(dauCs, { opacity: 0 }, tDap + 0.44);
  api.sfx("dau-wob", tDap, 0.9);
  api.armTo(w, "R", tDap + 0.1, 0.3, -6, "power2.inOut");
  tl.set(dauBan, { opacity: 1 }, tDap + 0.4);
  api.hop(w, tDap + 0.05, 10, 0.3);
  api.look(w, tDap + 0.12, -14, -4, 0.15); api.lids(w, tDap + 0.12, 0.2, 0.1);
  api.quay(w, 4.3, 0.1, 0.25); api.look(w, 4.35, 0, 2, 0.15);
  // "carry" vác thùng nặng (dấu vẫn to giữa khung)
  var tCar = tu.carry || 5.84;
  api.armTo(w, "R", tCar - 0.2, 0.2, goc("R", 330, 110), "power2.out");
  api.armTo(w, "L", tCar - 0.2, 0.2, goc("L", 190, 90), "power2.out");
  tl.set(vac, { opacity: 1 }, tCar - 0.1);
  tl.fromTo(w.lift, { scaleY: 1, scaleX: 1 }, { scaleY: 0.92, scaleX: 1.05, duration: 0.2, ease: "power2.out", immediateRender: false }, tCar - 0.05);
  tl.to(w.lift, { scaleY: 0.96, scaleX: 1.02, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, tCar + 0.15);
  api.nghieng(w, tCar, -5, 0.25); api.lids(w, tCar, 0.35, 0.15);
  tl.set(vac, { opacity: 0 }, 6.75);
  tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.2 }, 6.75);
  api.nghieng(w, 6.75, 0, 0.2); api.armTo(w, "R", 6.75, 0.25, -6); api.armTo(w, "L", 6.75, 0.25, 6);
  // thu dấu về ô, hộ chiếu lật đi
  var tThu = tDap + 3.05, SC = 0.22;
  tl.to(dauTo, { x: O[0], y: O[1], duration: 0.3, ease: "power2.inOut" }, tThu);
  tl.to(dauToS, { scale: SC, svgOrigin: "0 0", duration: 0.3, ease: "power2.inOut" }, tThu);
  hc.svg.insertAdjacentHTML("beforeend", '<g class="dau-o" opacity="0"><g transform="translate(' + HB.o[0] + " " + HB.o[1] + ") scale(" + SC + ')">' + api.dauEpSVG(chu[3], 0, 0, 120, -8, "dau-nho") + "</g></g>");
  tl.set(hc.svg.querySelector(".dau-o"), { opacity: 1 }, tThu + 0.3); tl.set(dauTo, { opacity: 0 }, tThu + 0.3);
  hc.ra(tThu + 0.4, 0.3);
  tl.to(hcBan, { opacity: 1, duration: 0.15 }, tThu + 0.6);
  api.sfx("lat-giay", tThu + 0.4, 0.35);
  api.camTo(R, tThu + 0.4, 0.5, { cx: -40, cy: 80, cz: -460, k: 560, rx: -18, ry: 0 }, "power2.inOut");
  // "leave before the sun": vẫy chào mặt trời đang lặn sau đồi
  var tLeave = tu.leave || 7.31;
  tl.to(mt, { y: 92, duration: 1.4, ease: "sine.in" }, tLeave);
  api.quay(w, tLeave - 0.2, 0.4, 0.2); api.look(w, tLeave - 0.15, 14, 6, 0.15);
  api.armTo(w, "R", tLeave - 0.1, 0.2, -130, "power2.out");
  [0, 1, 2].forEach(function (i) { api.armTo(w, "R", tLeave + 0.1 + i * 0.25, 0.25, i % 2 ? -130 : -105, "sine.inOut"); });
  api.armTo(w, "R", tLeave + 0.9, 0.3, -6, "power2.inOut");
  api.lids(w, tLeave + 0.3, 0.3, 0.2);
  // 8,87 [luot-smootherstep] nhà gỗ phủ tuyết bật dựng
  var tIf = tu["if"] || 8.87;
  var smoother = function (x) { return x * x * x * (x * (x * 6 - 15) + 10); };
  api.camTo(R, tIf - 0.1, 1.3, { cx: 120, cy: 110, cz: -440, k: 600, rx: -16, ry: -4 }, smoother);
  tl.set(so.lop[1], { visibility: "visible" }, tIf - 0.05);
  so.batLop(1, tIf - 0.05, 0.4);
  api.sfx("pop", tIf + 0.1, 0.3);
  var nha = so.tamLop(1), pn = wc(nha.x, nha.y, WX), AN = goc("R", pn[0], pn[1]);
  api.lids(w, tIf, 0, 0.1);
  api.armTo(w, "R", (tu.snow || 9.37) - 0.15, 0.25, AN, "power2.out");
  tl.to(w.armR, { scaleY: Math.max(1, Math.hypot(pn[0] - 314, pn[1] - 212) / 96 * 0.75), svgOrigin: "314 212", duration: 0.25 }, (tu.snow || 9.37) - 0.15);
  api.look(w, (tu.snow || 9.37) - 0.1, 14, 6, 0.15);
  tl.to(w.armR, { scaleY: 1, svgOrigin: "314 212", duration: 0.25 }, 11.6);
  api.armTo(w, "R", 11.6, 0.25, -6, "power2.inOut");
  // "you'd outlast me": chỉ ra người xem, nhún vai
  var tYou = tu.youd || 12.26;
  api.quay(w, tYou - 0.2, 0, 0.2); api.look(w, tYou - 0.15, 0, 2, 0.12);
  api.armTo(w, "R", tYou - 0.1, 0.2, -40, "power2.out");
  api.armTo(w, "L", 12.7, 0.2, 52, "power2.out"); api.armTo(w, "R", 12.7, 0.2, -52, "power2.out");
  tl.to(w.upper, { y: -8, duration: 0.14, yoyo: true, repeat: 1 }, 12.72);
  api.lids(w, 12.7, 0.3, 0.12);
  api.armTo(w, "L", 13.0, 0.2, 6); api.armTo(w, "R", 13.0, 0.2, -6);
  // 13,0 tới chân đèn, 13,86 nhặt chìa, bước tới cửa sổ, treo lên đinh đúng "nail"
  api.camTo(R, 12.95, 0.8, { cx: -470, cy: 30, cz: -740, k: 520, rx: -12, ry: 6 }, "power2.inOut");
  api.walk(w, 13.0, 13.72, -455, -655, { face: -0.6, endFace: -0.5, step: 0.18 });
  var tHung = tu.i && tu.i > 13 ? tu.i : 13.86;
  api.lids(w, 13.0, 0, 0.1);
  api.nghieng(w, 13.74, -14, 0.14);
  api.armTo(w, "L", 13.74, 0.14, goc("L", 40, 350), "power2.out");
  tl.set(ckNam, { opacity: 0 }, 13.9); tl.set(ck, { opacity: 1 }, 13.9);
  tl.set(ck, hp("L", goc("L", 40, 350), -90, 0, 0, 1.2), 13.9);
  api.nghieng(w, 13.92, 0, 0.12);
  var WN = { x: -640, z: -925 };
  tl.to(hcBan, { x: -40, duration: 0.55, ease: "power2.inOut" }, 13.98);   // camera lia sang cửa sổ: thẻ trên bàn ra hẳn ngoài mép phải, không bị cắt nửa chữ
  api.walk(w, 13.98, 14.5, WN.x, WN.z, { face: -0.7, endFace: -0.6, step: 0.17, keepL: true });
  api.camTo(R, 13.95, 0.65, { cx: -660, cy: -40, cz: -880, k: 560, rx: -6, ry: 8 }, "power2.inOut");
  var tNail = tu.nail || 14.75;
  var pd = wc(D.x, D.y, WN.x), ANL = goc("L", pd[0], pd[1]), SNL = Math.hypot(pd[0] - 86, pd[1] - 212) / 96;
  api.armTo(w, "L", tNail - 0.25, 0.22, ANL, "power2.out");
  tl.to(w.armL, { scaleY: SNL, svgOrigin: "86 212", duration: 0.22, ease: "power2.out" }, tNail - 0.25);
  tl.to(ck, Object.assign(hp("L", ANL, 90, 0, 0, 1.2), { duration: 0.22 }), tNail - 0.25);
  api.look(w, tNail - 0.3, -10, -18, 0.15);
  tl.set(ck, { opacity: 0 }, tNail); tl.set(ckTreo, { opacity: 1 }, tNail);
  api.sfx("ting", tNail, 0.25);
  tl.to(w.armL, { rotation: 6, scaleY: 1, svgOrigin: "86 212", duration: 0.3, ease: "power2.inOut" }, tNail + 0.15); w.arm.L = 6;
  // chìa đung đưa rồi dừng chỉ sang phải đúng "east,", rồi tự nhích thêm
  var tEast = tu.east || 16.44, tNhich = tEast + 0.5;
  var gocChia = function (t) {
    if (t < tNail) return 90;
    if (t < tEast) { var u = (t - tNail) / (tEast - tNail); return 90 * (1 - u) * Math.cos(u * Math.PI * 3.5) * (1 - u) + 14 * u * u; }
    if (t < tNhich) return 14;
    var v = Math.min(1, (t - tNhich) / 0.35); return 14 - 12 * v * v * (3 - 2 * v);
  };
  api.moiKhung(function (t) {
    var a = gocChia(t);
    cktR.setAttribute("transform", "rotate(" + a.toFixed(2) + ")");
    if (cktThe) cktThe.setAttribute("transform", "rotate(" + (-a + 90 - 90 + 6 * Math.sin(t * 5)).toFixed(2) + ")");
  });
  api.look(w, tEast - 0.1, -8, -16, 0.15, 1.1);
  api.look(w, tNhich + 0.1, -12, -16, 0.15, 1.15);
  api.lids(w, tNhich + 0.1, 0.2, 0.1);
  // bước sang trái (xa cột đèn) để chìa ở phía trên bên phải Wob: tay phải chỉ chéo lên, không vắt ngang mặt
  var WX2 = WN.x - 250;
  api.walk(w, 17.25, 17.85, WX2, WN.z + 10, { face: -0.2, endFace: 0.1, step: 0.17, keepL: true });
  api.look(w, 17.9, 0, 2, 0.15);
  api.lids(w, 17.95, 0.4, 0.15);                               // giữ trước "Would"
  // 18,70 [day-vao-cham] quay ra người xem, chỉ vào chìa, camera đẩy chậm, giữ tới hết
  var tWould = tu.would || 18.70;
  var pd2 = wc(D.x, D.y + 60, WX2), AP = goc("R", pd2[0], pd2[1]), SP = Math.min(2.4, Math.max(1, Math.hypot(pd2[0] - 314, pd2[1] - 212) / 96 * 0.8));
  api.armTo(w, "R", tWould, 0.3, AP, "power2.out");
  tl.to(w.armR, { scaleY: SP, svgOrigin: "314 212", duration: 0.3 }, tWould);
  api.lids(w, tWould, 0.1, 0.15);
  api.camTo(R, tWould, DUR - tWould, { cx: -760, cy: -60, k: 620 }, "sine.inOut");

  api.khauHinh(w, { bo: [[2.8, 3.05]] });
  api.gatDau(w, { bo: [[13.0, 14.6]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 9.9, 0); api.blink(w, 20.4, 0.1);
};
