/* Đoạn d43 (diorama, hiện tại, 3,91 s, NGHIÊM; vòng sửa 3: lặng dài thêm 0,75 s, với tay tắt đèn ở 3,11) – "I don't have a neat line for this part."
 * Vào cat, ra cat. Bố cục bàn chung tập 6 (ban6), đèn dịu như d38; chìa Kiruna nằm DƯỚI chân đèn (chỗ d38 đặt).
 * [day-vao-cham] Wob nhìn chìa dưới chân đèn, không cầm lên; camera đẩy rất chậm; sau "part." 1,47 lặng.
 * 3,11 trong khoảng lặng Wob với tay gạt công tắc tắt hẳn đèn bàn: tối xanh (d44 mở trong tối, khớp liền). Không sfx.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
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
  var WX = -330, WZ = -575;
  var B = banTap6(api, data, { wob: { x: WX, z: WZ, s: 0.9 } });
  var w = B.w, R = B.R, TY = B.TY, the = B.the, goc = B.goc, ban = B.ban;
  ban.diuDen(null, 0, 0.4);
  var CD = B.CHAN_DEN;
  api.cut(the, 200, 140, '<g transform="translate(50 30) rotate(-8)">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>", { pos: { x: CD.x, y: TY - 4, z: CD.z, rotationX: 90 }, ax: 50, ay: 30, f: api.F.AM_NHO });
  // chùm chìa nhà (đã tháo chìa Kiruna) cạnh chân đèn
  var chum = api.cut(the, 170, 190, '<g transform="translate(70 40) rotate(-25)">' + api.chumChiaNhaSVG({ kiruna: true }) + "</g>", { pos: { x: -425, y: TY - 4, z: -640, rotationX: 90 }, ax: 70, ay: 40, f: api.F.AM_NHO });
  gsap.set(chum.svg.querySelector(".ck-kiruna"), { opacity: 0 });
  // tối xanh khi đèn tắt hẳn
  var toiXanh = api.div("dio-ovl", ban.stage, "background:radial-gradient(ellipse 90% 80% at 40% 45%, rgba(10,22,48,.55), rgba(4,8,22,.85));");
  toiXanh.setAttribute("data-layout-allow-occlusion", "");
  gsap.set(toiXanh, { opacity: 0 });
  var sang = ban.den ? ban.den.svg.querySelector(".den-sang") : null;

  api.quaySet(w, -0.5);
  api.look(w, 0, -14, 16, 0.01);
  api.lidsSet(w, 0.4);
  api.camSet(R, null, { cx: -410, cy: 60, cz: -640, k: 590, rx: -16, ry: 8 });
  api.camTo(R, 0, DUR, { cx: -400, cy: 66, k: 640 }, "sine.inOut");    // đẩy rất chậm
  api.blink(w, 1.9, 0.4, true); api.blink(w, 2.65, 0.4, true);
  // 3,11 với tay tắt đèn (sau "part." 1,47 lặng 1,6 s)
  var CT = B.CT;
  var wc = function (x, y) { return [200 + (x - WX) / 0.9, 392 + (y - TY) / 0.9]; };
  var tp = wc(CT.x - 10, TY - 40), AS = goc("R", tp[0], tp[1]), SS = Math.max(1, Math.hypot(tp[0] - 314, tp[1] - 212) / 96);
  var tVoi = 3.11;
  api.quay(w, tVoi - 0.06, 0.3, 0.3);
  api.look(w, tVoi - 0.06, 14, 14, 0.2);
  api.nghieng(w, tVoi, 6, 0.3);
  api.armTo(w, "R", tVoi, 0.3, AS, "power2.inOut");
  tl.to(w.armR, { scaleY: SS, svgOrigin: "314 212", duration: 0.3, ease: "power2.inOut" }, tVoi);
  var tTat = tVoi + 0.32;
  tl.to(B.ctCan, { rotation: -30, svgOrigin: "80 46", duration: 0.08, ease: "power2.in" }, tTat);
  ban.diuDen(tTat + 0.05, 0.12, 1);
  if (sang) tl.to(sang, { opacity: 0, duration: 0.1 }, tTat + 0.05);
  tl.to(toiXanh, { opacity: 1, duration: 0.14, ease: "power1.out" }, tTat + 0.05);
  api.lids(w, tTat + 0.2, 0.3, 0.2);

  khauHinhTram(api, w);
  api.breathe(w, 0, DUR);
};
