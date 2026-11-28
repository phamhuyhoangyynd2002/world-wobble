/* Đoạn d38 (diorama, hiện tại, 6,33 s, NGHIÊM) – "Back at my desk, I put the key down for this part. Moving a town is not only engineering."
 * Vào cat, ra giay. Bố cục bàn chung tập 6 (ban6). Đèn dịu (diuDen 0,4), không gag, không sfx hài, mặt trầm (khauHinhTram).
 * 0–1,1 lặng: Wob tháo chìa Kiruna khỏi chùm chìa nhà nằm cạnh chân đèn. "down" 2,79 đặt chìa một mình ngay DƯỚI chân đèn, rời tay.
 * 4,05 Wob nhẹ tay gập trang pop-up nhà thờ đỏ nằm xuống; nhìn người xem, im; camera đẩy chậm vào trang sổ; ra giấy.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
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
  var WX = -300, WZ = -560;
  var NT = { w: 230, h: 172 };
  var B = banTap6(api, data, { wob: { x: WX, z: WZ, s: 0.9 }, lop: [api.lopPopup.tuy(api.nhaThoGoSVG(NT.w, NT.h), NT.w, NT.h, { x: 150, banLe: -150 })] });
  var w = B.w, R = B.R, TY = B.TY, the = B.the, so = B.so, goc = B.goc, SO = B.SO, ban = B.ban;
  gsap.set(so.lop[0], { rotationX: -90 });
  ban.diuDen(null, 0, 0.4);
  // chùm chìa nhà (còn chìa Kiruna) nằm cạnh chân đèn
  var RING = { x: -425, z: -640 };
  var chumNam = api.cut(the, 170, 190, '<g transform="translate(70 40) rotate(-25)">' + api.chumChiaNhaSVG({ kiruna: true }) + "</g>", { pos: { x: RING.x, y: TY - 4, z: RING.z, rotationX: 90 }, ax: 70, ay: 40, f: api.F.AM_NHO });
  var chumK = chumNam.svg.querySelector(".ck-kiruna");
  // chìa Kiruna: trong tay trái, rồi nằm một mình dưới chân đèn
  w.holdL.insertAdjacentHTML("beforeend", '<g class="ck" opacity="0">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>");
  var ck = w.holdL.querySelector(".ck"), ckThe = ck.querySelector(".ck-the");
  var CD = B.CHAN_DEN;
  var ckNam = api.cut(the, 200, 140, '<g transform="translate(50 30) rotate(-8)">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>", { pos: { x: CD.x, y: TY - 4, z: CD.z, rotationX: 90 }, ax: 50, ay: 30, f: api.F.AM_NHO });
  gsap.set(ckNam, { opacity: 0 });
  var KSX = 1.2;
  var keyPose = function (A, KA) { var h = api.handWorld("L", A); return api.holdPose("L", A, h[0], h[1], KA, KSX); };
  var kaNow = -150;
  var keyArm = function (t, d, A, KA, ease) { api.armTo(w, "L", t, d, A, ease); tl.to(ck, Object.assign(keyPose(A, KA), { duration: d, ease: ease || "power2.inOut" }), t); };
  api.moiKhung(function (t) { ckThe.setAttribute("transform", "rotate(" + (t < 1.2 ? 240 : t < 2.4 ? 180 : 260).toFixed(1) + ")"); });

  // ---------------------------------------------------------------- tư thế đầu, camera
  api.quaySet(w, -0.45);
  api.look(w, 0, -14, 16, 0.01);
  api.lidsSet(w, 0.35);
  api.nghieng(w, 0, -12, 0.01);
  var A0 = goc("L", 50, 330);
  api.armSet(w, "L", A0); api.armSet(w, "R", goc("R", 230, 330));
  gsap.set(ck, keyPose(A0, -150));
  api.camSet(R, null, { cx: -390, cy: 50, cz: -620, k: 560, rx: -14, ry: 8 });
  api.camTo(R, 0, 3.2, { cx: -380, k: 575 }, "sine.inOut");
  // 0,1–1,0 tháo chìa khỏi vòng (vặn nhẹ hai lần)
  [0.2, 0.55].forEach(function (t) { api.armTo(w, "L", t, 0.15, A0 + 6, "sine.inOut"); api.armTo(w, "L", t + 0.15, 0.15, A0, "sine.inOut"); api.armTo(w, "R", t + 0.05, 0.15, goc("R", 230, 330) - 6, "sine.inOut"); api.armTo(w, "R", t + 0.2, 0.15, goc("R", 230, 330), "sine.inOut"); });
  tl.set(chumK, { opacity: 0 }, 0.95); tl.set(ck, { opacity: 1 }, 0.95);
  api.armTo(w, "R", 1.0, 0.3, 0, "power2.inOut");
  keyArm(1.05, 0.35, goc("L", 60, 250), -90, "power2.inOut");
  api.nghieng(w, 1.05, 0, 0.3);
  api.look(w, 1.15, -10, 4, 0.2);
  // nhìn chìa một lúc, rồi bước tới chân đèn
  api.walk(w, 1.6, 2.35, -405, -605, { face: -0.6, endFace: -0.5, step: 0.35, swing: 10, keepL: true });
  // "down": đặt chìa dưới chân đèn, rời tay
  var tDown = tu.down || 2.79;
  api.nghieng(w, tDown - 0.4, -14, 0.3);
  api.look(w, tDown - 0.35, -14, 16, 0.2);
  keyArm(tDown - 0.4, 0.35, goc("L", 60, 345), -170, "power2.inOut");
  tl.set(ck, { opacity: 0 }, tDown); tl.set(ckNam, { opacity: 1 }, tDown);
  keyArm(tDown + 0.12, 0.4, goc("L", 70, 320), -170, "sine.inOut");     // rời tay, tay còn lưng chừng
  api.armTo(w, "L", tDown + 0.6, 0.35, 4, "power2.inOut");
  api.nghieng(w, tDown + 0.6, 0, 0.35);
  // 3,4 tới sổ, nhẹ tay gập trang pop-up nhà thờ
  api.walk(w, 3.35, 3.95, -215, -430, { face: 0.5, endFace: 0.45, step: 0.3, swing: 10 });
  api.camTo(R, 3.3, 0.8, { cx: -170, cy: 70, cz: -470, k: 560, rx: -15, ry: 4 }, "power2.inOut");
  var tMov = tu.moving || 4.05;
  var top = so.diemLop(0, NT.w * 0.35, NT.h * 0.2);
  var wc = function (x, y) { return [200 + (x - (-215)) / 0.9, 392 + (y - TY) / 0.9]; };
  var tp = wc(top.x, top.y), AF = goc("R", tp[0], tp[1]), SF = Math.max(1, Math.hypot(tp[0] - 314, tp[1] - 212) / 96);
  api.look(w, tMov - 0.15, 14, -4, 0.2);
  api.armTo(w, "R", tMov - 0.1, 0.3, AF, "power2.out");
  tl.to(w.armR, { scaleY: SF, svgOrigin: "314 212", duration: 0.3, ease: "power2.out" }, tMov - 0.1);
  so.gapLop(0, tMov + 0.2, 0.8);
  var tp2 = wc(top.x + 20, TY - 20), AF2 = goc("R", tp2[0], tp2[1]);
  api.armTo(w, "R", tMov + 0.2, 0.8, AF2, "power1.inOut");
  tl.to(w.armR, { scaleY: Math.max(1, Math.hypot(tp2[0] - 314, tp2[1] - 212) / 96), svgOrigin: "314 212", duration: 0.8, ease: "power1.inOut" }, tMov + 0.2);
  api.nghieng(w, tMov + 0.3, 8, 0.5);
  tl.to(w.armR, { rotation: 0, scaleY: 1, svgOrigin: "314 212", duration: 0.35, ease: "power2.inOut" }, tMov + 1.05); w.arm.R = 0;
  api.nghieng(w, tMov + 1.05, 0, 0.35);
  // nhìn người xem, im
  api.quay(w, tMov + 1.1, 0.05, 0.3);
  api.look(w, tMov + 1.15, 0, 2, 0.2);
  api.lids(w, tMov + 1.15, 0.38, 0.2);
  // camera đẩy chậm vào trang sổ
  api.camTo(R, 5.35, DUR - 5.35, { cx: 0, cy: 170, cz: -330, k: 760, rx: -42, ry: 0 }, "sine.in");

  khauHinhTram(api, w);
  api.breathe(w, 0, DUR);
  api.blink(w, 1.5, 0.35, true);
};
