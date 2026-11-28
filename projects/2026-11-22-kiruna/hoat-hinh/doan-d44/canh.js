/* Đoạn d44 (diorama, hiện tại, 20,45 s) – "The key lives under my desk lamp now. Lamp on. That's June... Lamp off. That's December...
 * Lamp on again. I'm not made of stone. Kiruna didn't come here for the weather."
 * Vào cat (khớp d43: đèn tắt, tối xanh), ra chen. Bố cục bàn chung tập 6 (ban6). Công tắc đèn nhìn rõ.
 * 1,0 [luot-smootherstep] camera lướt tới chìa dưới chân đèn + trang hộ chiếu Kiruna dựng cạnh (ô dấu trống).
 * "on." 3,70 Wob bật công tắc: bàn sáng ấm (pop). Pop-up trên sổ: mặt trời (5,25), nhà thờ đỏ nhỏ (6,50), bánh quế (8,25); Wob chỉ từng cái.
 * "off." 10,43 tắt: tối xanh, ba pop-up gập; Wob run. 12,29 quảng trường giấy nhỏ có vũng lạnh bật dựng; Wob ôm mình (brr).
 * 15,89 mò công tắc hai nhịp; "again." 16,34 đèn bật (pop): Wob đang ôm chặt chân đèn; "stone." 17,73 quay ra người xem, giữ.
 * 18,5 buông, về mép sổ, lật tờ map-kiruna-rail (lat-giay), gõ ngón tay lên đường đỏ sang Narvik, cờ "Narvik · ice-free".
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // KIRUNA, SWEDEN, Would Wob move here?, Narvik · ice-free
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
  var sunL = fp("M 47 70 L 47 160 L 53 160 L 53 70 Z", "#d8b98a", 2.5) + '<g transform="translate(50 50)">' + api.matTroiGiaySVG(38) + "</g>";
  var NTN = { w: 150, h: 112 };
  var banh = fp("M 6 70 C 6 84 104 84 104 70 Z", "#f3ead2", 4) + '<g transform="translate(55 46)">' + api.banhQueSVG(34) + "</g>";
  var QT = { w: 300, h: 150 };
  var lop = [
    api.lopPopup.tuy(sunL, 100, 160, { x: 110, banLe: -230 }),
    api.lopPopup.tuy(api.nhaThoGoSVG(NTN.w, NTN.h), NTN.w, NTN.h, { x: 260, banLe: -150 }),
    api.lopPopup.tuy(banh, 110, 80, { x: 390, banLe: -60 }),
    api.lopPopup.tuy(api.quangTruongNhoSVG(QT.w, QT.h), QT.w, QT.h, { x: 250, banLe: -120 })
  ];
  var B = banTap6(api, data, { wob: { x: WX, z: WZ, s: 0.9 }, lop: lop, denTat: true });
  var w = B.w, R = B.R, TY = B.TY, the = B.the, so = B.so, goc = B.goc, ban = B.ban, SO = B.SO;
  lop.forEach(function (L, i) { gsap.set(so.lop[i], { visibility: "hidden" }); });
  // tờ map-kiruna-rail nằm bên trái (lật sang phải ở cuối)
  var MR = { x0: 690, y0: 210, k: 1.1 };
  var pg = function (px, py) { return [(px - MR.x0) / MR.k, (py - MR.y0) / MR.k]; };
  var KR = pg(987, 397), NV = pg(808, 297);
  var duongDo = "M " + KR[0].toFixed(1) + " " + KR[1].toFixed(1) + " C " + (KR[0] - 40).toFixed(1) + " " + (KR[1] - 40).toFixed(1) + " " + (NV[0] + 60).toFixed(1) + " " + (NV[1] + 30).toFixed(1) + " " + NV[0].toFixed(1) + " " + NV[1].toFixed(1);
  var toRail = so.themTo(B.trangMap('<path d="' + duongDo + '" stroke="#f6eedb" stroke-width="13" fill="none" stroke-linecap="round"/>' +
    '<path d="' + duongDo + '" stroke="#C9463A" stroke-width="7" fill="none" stroke-linecap="round"/>', "map-kiruna-rail", MR), { ben: "trai" });
  toRail.hien(null, false);
  // chìa dưới chân đèn, chùm chìa nhà, trang hộ chiếu dựng cạnh
  var CD = B.CHAN_DEN;
  api.cut(the, 200, 140, '<g transform="translate(50 30) rotate(-8)">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>", { pos: { x: CD.x, y: TY - 4, z: CD.z, rotationX: 90 }, ax: 50, ay: 30, f: api.F.AM_NHO });
  var chum = api.cut(the, 170, 190, '<g transform="translate(70 40) rotate(-25)">' + api.chumChiaNhaSVG({ kiruna: true }) + "</g>", { pos: { x: -425, y: TY - 4, z: -640, rotationX: 90 }, ax: 70, ay: 40, f: api.F.AM_NHO });
  gsap.set(chum.svg.querySelector(".ck-kiruna"), { opacity: 0 });
  var HB = api.HC_LON, HS = 0.34;
  var hcBan = api.cut(the, HB.W, HB.H, '<g data-layout-ignore>' + api.theHoChieuSVG({ noi: chu[0], nuoc: chu[1], hoi: chu[2], bo: HB }) + "</g>", { pos: { x: -395, y: TY, z: -735, scale: HS, rotationX: -8 }, ax: HB.W / 2, ay: HB.H, f: api.F.AM_NHO });
  // tối xanh (đèn tắt) – khớp cuối d43
  var toiXanh = api.div("dio-ovl", ban.stage, "background:radial-gradient(ellipse 90% 80% at 40% 45%, rgba(10,22,48,.55), rgba(4,8,22,.85));");
  toiXanh.setAttribute("data-layout-allow-occlusion", "");
  var sang = ban.den ? ban.den.svg.querySelector(".den-sang") : null;
  ban.diuDen(null, 0, 1); if (sang) gsap.set(sang, { opacity: 0 });
  var den = function (t, on) {
    tl.to(B.ctCan, { rotation: on ? 30 : -30, svgOrigin: "80 46", duration: 0.08, ease: "power2.in" }, t - 0.06);
    ban.diuDen(t, 0.12, on ? 0 : 1);
    if (sang) tl.to(sang, { opacity: on ? 1 : 0, duration: 0.1 }, t);
    tl.to(toiXanh, { opacity: on ? 0 : 1, duration: 0.14, ease: "power1.out" }, t);
  };
  var wc = function (x, y, wx) { return [200 + (x - (wx == null ? WX : wx)) / 0.9, 392 + (y - TY) / 0.9]; };
  var CT = B.CT, ctW = wc(CT.x + 10, TY - 40), ACT = goc("L", ctW[0], ctW[1]), SCT = Math.max(1, Math.hypot(ctW[0] - 86, ctW[1] - 212) / 96);
  var batTay = function (t) {           // tay trái gạt công tắc ở t (đèn đổi lúc t)
    api.look(w, t - 0.35, -16, 14, 0.15);
    api.armTo(w, "L", t - 0.3, 0.22, ACT, "power2.out");
    tl.to(w.armL, { scaleY: SCT, svgOrigin: "86 212", duration: 0.22, ease: "power2.out" }, t - 0.3);
    tl.to(w.armL, { rotation: 6, scaleY: 1, svgOrigin: "86 212", duration: 0.3, ease: "power2.inOut" }, t + 0.12); w.arm.L = 6;
  };

  // ---------------------------------------------------------------- tư thế đầu, camera
  api.quaySet(w, -0.4);
  api.look(w, 0, -12, 10, 0.01);
  api.lidsSet(w, 0.3);
  var smoother = function (x) { return x * x * x * (x * (x * 6 - 15) + 10); };
  api.camSet(R, null, { cx: -230, cy: 50, cz: -560, k: 470, rx: -14, ry: 6 });
  api.camTo(R, 0, 0.98, { cx: -250, cy: 56, k: 505 }, "sine.inOut");                       // đẩy chậm từ khung 0 (không đứng hình trong tối)
  api.camTo(R, 1.0, 1.9, { cx: -455, cy: 160, cz: -700, k: 690, rx: -20, ry: 6 }, smoother);       // [luot-smootherstep] chìa + hộ chiếu
  api.camTo(R, 2.95, 0.45, { cx: -200, cy: 70, cz: -580, k: 520, rx: -14, ry: 5 }, "power2.inOut");
  // "on."
  var tOn = tu.on || 3.70;
  batTay(tOn);
  den(tOn, true);
  api.sfx("pop", tOn, 0.45);
  api.lids(w, tOn + 0.05, 0, 0.1);
  api.camTo(R, 4.1, 0.9, { cx: 80, cy: 90, cz: -420, k: 500, rx: -24, ry: 0 }, "power2.inOut");   // sổ + Wob
  api.quay(w, 4.3, 0.4, 0.25);
  // ba pop-up + Wob chỉ từng cái
  var popAt = [tu.sun || 5.25, tu.church || 6.50, tu.cinnamon || 8.25];
  popAt.forEach(function (t, i) {
    tl.set(so.lop[i], { visibility: "visible" }, t - 0.2);
    so.batLop(i, t - 0.2, 0.18);
    var d = so.tamLop(i), p = wc(d.x, d.y), A = goc("R", p[0], p[1]), S = Math.max(1, Math.hypot(p[0] - 314, p[1] - 212) / 96 * 0.8);
    api.armTo(w, "R", t - 0.1, 0.25, A, "power2.out");
    tl.to(w.armR, { scaleY: S, svgOrigin: "314 212", duration: 0.25, ease: "power2.out" }, t - 0.1);
    api.look(w, t - 0.1, i === 0 ? 4 : 12, 8, 0.15);
    api.lids(w, t + 0.1, 0, 0.1);
    api.hop(w, t + 0.05, 6, 0.2);
  });
  api.armTo(w, "R", 9.6, 0.3, 0, "power2.inOut");
  tl.to(w.armR, { scaleY: 1, svgOrigin: "314 212", duration: 0.3 }, 9.6);
  // "off."
  var tOff = tu.off || 10.43;
  batTay(tOff);
  den(tOff, false);
  [0, 1, 2].forEach(function (i) { so.gapLop(i, tOff + 0.15 + i * 0.08, 0.3); tl.set(so.lop[i], { visibility: "hidden" }, tOff + 0.6 + i * 0.08); });
  api.shiver(w, tOff + 0.3, tOff + 1.4, 3);
  api.lids(w, tOff + 0.2, 0.35, 0.15);
  // 12,29 quảng trường giấy, vũng lạnh; Wob ôm mình
  var tWeeks = tu.weeks || 12.29;
  tl.set(so.lop[3], { visibility: "visible" }, tWeeks - 0.15);
  so.batLop(3, tWeeks - 0.15, 0.3);
  api.armTo(w, "L", tWeeks, 0.25, goc("L", 262, 270), "power2.out");
  api.armTo(w, "R", tWeeks, 0.25, goc("R", 138, 270), "power2.out");
  api.sfx("brr", tWeeks + 0.15, 0.4);
  api.shiver(w, tWeeks + 0.1, 15.6, 2.5);
  api.look(w, tWeeks + 0.2, 10, 10, 0.15);
  api.camTo(R, 15.0, 0.75, { cx: -170, cy: 50, cz: -560, k: 455, rx: -14, ry: 4 }, "sine.inOut");    // trong tối, mở rộng khung
  // 15,89 mò công tắc hai nhịp
  var tLamp2 = 15.89;
  api.armTo(w, "L", tLamp2, 0.2, 70, "sine.inOut"); api.armTo(w, "R", tLamp2, 0.2, -40, "sine.inOut");
  api.armTo(w, "L", tLamp2 + 0.22, 0.18, 30, "sine.inOut"); api.armTo(w, "R", tLamp2 + 0.22, 0.18, -70, "sine.inOut");
  api.look(w, tLamp2, -16, 4, 0.1); api.look(w, tLamp2 + 0.22, 16, 4, 0.1);
  // "again." đèn bật: Wob đang ôm chân đèn
  var tAg = tu.again || 16.34, HX = -648, HZ = -768;              // bên trái cột đèn, ôm sang phải
  tl.set(w.pos, { x: HX, z: HZ }, tAg - 0.04); w.x = HX; w.z = HZ;
  api.quay(w, tAg - 0.04, 0.85, 0.01);
  api.armTo(w, "R", tAg - 0.04, 0.01, goc("R", 395, 205));
  api.armTo(w, "L", tAg - 0.04, 0.01, goc("L", 350, 315));
  tl.to(w.armL, { scaleY: 2.75, svgOrigin: "86 212", duration: 0.01 }, tAg - 0.04);
  api.nghieng(w, tAg - 0.04, 8, 0.01);
  api.lids(w, tAg - 0.04, 0.6, 0.01);
  api.look(w, tAg - 0.04, 14, 0, 0.01);
  den(tAg, true);
  tl.set(B.ctCan, { rotation: 30, svgOrigin: "80 46" }, tAg);
  api.sfx("pop", tAg, 0.45);
  tl.fromTo(w.upper, { x: 3 }, { x: -3, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, tAg + 0.1);   // ôm chặt, dụi
  // "stone." quay ra người xem, vẫn ôm, giữ
  var tSt = tu.stone || 17.73;
  api.quay(w, tSt - 0.25, 0.15, 0.25);
  api.look(w, tSt - 0.2, 0, 2, 0.15);
  api.lids(w, tSt - 0.2, 0.4, 0.15);
  // 18,5 buông, về sổ, lật map-kiruna-rail, gõ đường đỏ sang Narvik
  tl.to(hcBan, { x: 60, duration: 0.35, ease: "power2.inOut" }, 15.69);   // trong tối: thẻ hộ chiếu dời sang phải, không che Wob ôm chân đèn
  var tKir = tu.kiruna || 18.5;
  api.camTo(R, 15.8, tKir + 0.05 - 15.8, { cx: -185, cy: 58, k: 492 }, "sine.inOut");         // đẩy chậm suốt lúc ôm cột đèn, quay ra người xem
  tl.to(w.armL, { scaleY: 1, svgOrigin: "86 212", duration: 0.15 }, tKir);
  api.armTo(w, "L", tKir, 0.15, 4); api.armTo(w, "R", tKir, 0.15, -4);
  api.nghieng(w, tKir, 0, 0.15);
  api.lids(w, tKir, 0, 0.1);
  so.gapLop(3, tKir, 0.25); tl.set(so.lop[3], { visibility: "hidden" }, tKir + 0.3);
  api.walk(w, tKir + 0.05, tKir + 0.55, -40, -590, { face: 0.5, endFace: 0.4, step: 0.17 });
  api.camTo(R, tKir + 0.1, 0.75, { cx: 40, cy: 110, cz: -430, k: 570, rx: -38, ry: 0 }, "power2.inOut");
  var tLat = tKir + 0.55;
  toRail.hien(tLat - 0.05, true);
  toRail.lat(tLat, 0.5, "phai");
  api.sfx("lat-giay", tLat, 0.45);
  api.armTo(w, "R", tLat - 0.05, 0.2, -70, "power2.out");
  api.armTo(w, "R", tLat + 0.3, 0.2, -10, "power2.inOut");
  var nvW = { x: SO.x + NV[0], z: SO.z - SO.d / 2 + NV[1] };
  var mid = { x: SO.x + (KR[0] + NV[0]) / 2 - 10, z: SO.z - SO.d / 2 + (KR[1] + NV[1]) / 2 - 6 };
  var tp = wc(mid.x, TY - 12, -40), AG = goc("R", tp[0], tp[1]), SG = Math.max(1, Math.hypot(tp[0] - 314, tp[1] - 212) / 96);
  var tTap = tLat + 0.62;
  [tTap, tTap + 0.2].forEach(function (t) {
    api.armTo(w, "R", t, 0.07, AG, "power2.in");
    tl.to(w.armR, { scaleY: SG, svgOrigin: "314 212", duration: 0.07, ease: "power2.in" }, t);
    tl.to(w.armR, { scaleY: SG * 0.85, svgOrigin: "314 212", duration: 0.1, ease: "power2.out" }, t + 0.08);
  });
  api.look(w, tTap - 0.1, 10, 14, 0.12);
  // cờ "Narvik · ice-free"
  var CO = 40, CW = 420, CH = CO + 30;
  var coNV = api.cut(the, CW, CH + 100, fp("M 4 " + CH + " L 4 " + (CH + 100) + " L 10 " + (CH + 100) + " L 10 " + CH + " Z", "#d8b98a", 2.5) +
    fp("M 4 4 L " + (CW - 4) + " 4 L " + (CW - 4) + " " + CH + " L 4 " + CH + " Z", "#f6eedb", 4) + api.txt(CW / 2 + 2, CH / 2 + CO * 0.36, CO, 700, chu[3], C.INK),
    { pos: { x: nvW.x - 4, y: TY - 12, z: nvW.z + 4 }, ax: 7, ay: CH + 100, f: api.F.AM_NHO });
  gsap.set(coNV, { scaleY: 0.001, opacity: 0 });
  tl.set(coNV, { opacity: 1 }, tTap + 0.05);
  tl.to(coNV, { scaleY: 1, duration: 0.22, ease: "back.out(2)" }, tTap + 0.05);
  api.sfx("pop", tTap + 0.08, 0.3);

  api.khauHinh(w);
  api.gatDau(w, { bo: [[16.2, 18.5]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 7.4, 0); api.blink(w, 13.6, 0.35);
};
