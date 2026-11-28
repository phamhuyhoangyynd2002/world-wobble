/* Đoạn d03 (diorama, hiện tại, 32,15 s) – "The whole town centre had moved", lời chào, thẻ hộ chiếu, Kiruna trên Vòng Bắc Cực,
 * mỏ nuốt đất, thị trấn dọn sang đông, chùm chìa, thiêu thân 1736. Vào cat, ra giay. Bố cục bàn chung tập 6 (ban6).
 * 0–1,28: cụm mái nhà tí hon trên trang map-kiruna trượt sang phải đúng "moved.", để lại viền nét đứt.
 * 1,5 nhặt chìa trên bàn; "Hi," 2,03 quay ra người xem, vẫy bằng tay cầm chìa (thẻ gỗ đung đưa).
 * Thẻ hộ chiếu HC_LON x 96–900, y 54–540: vào 5,19, phẳng 5,29–8,60, lật đi xong 8,82. Camera đứng yên 5,1–9,3. Wob nửa phải, gật.
 * 7,55 đặt chìa xuống cạnh sổ, chỉ tay về thẻ đúng "Kiruna," 8,25.
 * 9,30 [luot-smootherstep] camera lướt xuống sổ; cờ giấy "Kiruna" và "Arctic Circle" bật lên; Wob đi dây trên vòng Bắc Cực nét đứt,
 * nhảy lên chấm Kiruna đúng "Circle." 11,68. Nhảy khỏi trang, nhặt lại chìa, 12,44 lật tờ bản đồ: mặt cắt đồi pop-up bật dựng.
 * "swallowing" 15,43 đất lõm, nhà nghiêng về phía đồi, một mái tự trượt; Wob chặn bằng bút chì 16,63, bút nghiêng 17,03, giữ tới 18,02.
 * Thùng các-tông bật trên mái, Wob dán băng thùng cuối, vuốt phẳng; mũi tên không chữ chỉ đông ở "east." 19,93.
 * Đoàn pop-up: nhà (20,64), cửa hàng (21,46), tháp đồng hồ (22,09), nhà thờ gỗ đỏ chậm nhất (24,19); Wob vẫy bút chì dẫn đường.
 * 25,02 Wob tới chân đèn kéo ba lô ôm vào lòng, gật. 26,45 [lao-vao-can-canh] chùm chìa nhà; luồn chìa Kiruna đúng "ring," 28,02;
 * giơ cả chùm "keys." 29,39, leng keng, giữ tới "But" 30,19. Thiêu thân 1736 lượn một vòng từ "small" 30,51, đậu lên chìa ở "bugging"
 * 31,45; camera lao vào cánh từ 31,62; ra giấy.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // KIRUNA, SWEDEN, Would Wob move here?, Kiruna, Arctic Circle, 1736
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
  var LOP = { w: 440, h: 300 };
  var B = banTap6(api, data, { wob: { x: 640, z: -110, s: 0.9 }, lop: [api.lopPopup.tuy(api.matCatDoiSVG(LOP.w, LOP.h), LOP.w, LOP.h, { x: 240, banLe: -60 })] });
  var w = B.w, R = B.R, TY = B.TY, the = B.the, so = B.so, goc = B.goc;
  var K = B.KIR, SO = B.SO;
  var Z_TRANG = function (v) { return SO.z - SO.d / 2 + v; };
  var X_TRANG = function (u) { return SO.x + u; };
  var YL = TY - 10;                               // đứng trên tờ lật
  // tờ bản đồ (lật được) + viền nét đứt dưới cụm mái
  var toMap = so.themTo(B.trangMap('<rect x="' + (K[0] - 52) + '" y="' + (K[1] - 18) + '" width="104" height="40" rx="10" fill="none" stroke="' + C.INK + '" stroke-width="3" stroke-dasharray="8 7" opacity=".8"/>' +
    '<path d="M 16 ' + B.BC_Y.toFixed(1) + ' L ' + (SO.w - 16) + ' ' + B.BC_Y.toFixed(1) + '" stroke="#f6eedb" stroke-width="7" stroke-dasharray="16 11" opacity=".95"/>' +
    '<path d="M 16 ' + B.BC_Y.toFixed(1) + ' L ' + (SO.w - 16) + ' ' + B.BC_Y.toFixed(1) + '" stroke="' + C.INK + '" stroke-width="3" stroke-dasharray="16 11"/>'));
  var lopMC = so.lop[0], mc = lopMC.svg;
  gsap.set(lopMC, { visibility: "hidden" });
  // cụm mái tí hon (như d01)
  var nhaTiHon = "";
  [[8, 34, "#e8d9b8"], [30, 40, "#c99a62"], [54, 32, "#e2b33c"], [76, 38, "#d98f6e"]].forEach(function (n) {
    nhaTiHon += fp("M " + n[0] + " 60 L " + n[0] + " " + (60 - n[1] * 0.55) + " L " + (n[0] + 9) + " " + (60 - n[1]) + " L " + (n[0] + 18) + " " + (60 - n[1] * 0.55) + " L " + (n[0] + 18) + " 60 Z", n[2], 2.5);
  });
  var maiTH = api.cut(the, 100, 62, nhaTiHon, { pos: { x: X_TRANG(K[0]), y: YL, z: Z_TRANG(K[1]) }, ax: 50, ay: 60, f: api.F.AM_NHO });
  // cờ giấy cắm tăm (đứng, mặt nhìn camera)
  var coSVG = function (txt, co, W) {
    var H = co + 30;
    return fp("M " + (W / 2 - 3) + " " + H + " L " + (W / 2 - 3) + " " + (H + 70) + " L " + (W / 2 + 3) + " " + (H + 70) + " L " + (W / 2 + 3) + " " + H + " Z", "#d8b98a", 2.5) +
      fp("M 4 4 L " + (W - 4) + " 4 L " + (W - 4) + " " + H + " L 4 " + H + " Z", "#f6eedb", 4) + api.txt(W / 2, H / 2 + co * 0.36, co, 700, txt, C.INK);
  };
  var coLech = function (txt, co, W) {          // cờ đuôi nheo: tăm ở mép trái
    var H = co + 30;
    return fp("M 4 " + H + " L 4 " + (H + 120) + " L 10 " + (H + 120) + " L 10 " + H + " Z", "#d8b98a", 2.5) +
      fp("M 4 4 L " + (W - 4) + " 4 L " + (W - 4) + " " + H + " L 4 " + H + " Z", "#f6eedb", 4) + api.txt(W / 2 + 2, H / 2 + co * 0.36, co, 700, txt, C.INK);
  };
  var coK = api.cut(the, 190, 194, coLech(chu[3], 44, 190), { pos: { x: 302, y: YL, z: Z_TRANG(K[1]) - 40 }, ax: 7, ay: 194, f: api.F.AM_NHO });
  var coBC = api.cut(the, 300, 140, coSVG(chu[4], 40, 300), { pos: { x: -10, y: YL, z: Z_TRANG(B.BC_Y) - 6 }, ax: 150, ay: 140, f: api.F.AM_NHO });
  gsap.set([coK, coBC], { scaleY: 0.001, opacity: 0 });

  // chìa trên bàn (nằm) + chìa trong tay trái
  var ckNam = api.cut(the, 200, 140, '<g transform="translate(50 30) rotate(-18)">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>", { pos: { x: 470, y: TY - 4, z: -40, rotationX: 90 }, ax: 50, ay: 30, f: api.F.AM_NHO });
  w.holdL.insertAdjacentHTML("beforeend", '<g class="ck" opacity="0">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>");
  var ck = w.holdL.querySelector(".ck"), ckThe = ck.querySelector(".ck-the");
  var KSX = 1.25, kaKeys = [[0, -90]];
  var keyPose = function (A, KA, dx, dy) { var h = api.handWorld("L", A); return api.holdPose("L", A, h[0] + (dx || 0), h[1] + (dy || 0), KA, KSX); };
  var keyArm = function (t, d, A, KA, ease) {
    api.armTo(w, "L", t, d, A, ease);
    tl.to(ck, Object.assign(keyPose(A, KA), { duration: d, ease: ease || "power2.inOut" }), t);
    kaKeys.push([t, kaKeys[kaKeys.length - 1][1]], [t + d, KA]);
  };
  var kaAt = function (t) {
    var v = kaKeys[0][1];
    for (var i = 1; i < kaKeys.length; i++) {
      var a = kaKeys[i - 1], b = kaKeys[i];
      if (t >= b[0]) v = b[1]; else if (t > a[0]) { v = a[1] + (b[1] - a[1]) * (t - a[0]) / Math.max(1e-6, b[0] - a[0]); break; } else break;
    }
    return v;
  };
  var swingAt = function (t) { return 12 * Math.sin(2 * Math.PI * 1.1 * t) * (0.4 + 0.6 * Math.exp(-((t - 2.4) * (t - 2.4)) / 0.6)); };
  api.moiKhung(function (t) { ckThe.setAttribute("transform", "rotate(" + (-kaAt(t) + 90 + swingAt(t)).toFixed(2) + ")"); });

  // bút chì trên bàn (Wob nhặt sau) + trong tay phải
  var butNam = api.cut(the, 190, 40, '<g transform="translate(95 20) rotate(12)">' + api.butChiSVG() + "</g>", { pos: { x: -200, y: TY - 4, z: -140, rotationX: 90 }, ax: 95, ay: 20, f: api.F.AM_NHO });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="but" opacity="0"><g transform="translate(78 0)">' + api.butChiSVG() + "</g></g>");
  var but = w.holdR.querySelector(".but");
  var butPose = function (A, ang, dx, dy) { var h = api.handWorld("R", A); return api.holdPose("R", A, h[0] + (dx || 0), h[1] + (dy || 0), ang); };
  // ba lô ôm + chùm chìa nhà (móc ở quai trái ba lô), chùm trong tay phải
  w.upper.insertAdjacentHTML("beforeend", '<g class="balo-om" opacity="0"><g transform="translate(138 196) scale(.95)">' + api.baLoNhoSVG() +
    '<g class="chum-balo" transform="translate(40 112) scale(.55)">' + api.chumChiaNhaSVG({}) + "</g></g></g>");
  var baloOm = w.upper.querySelector(".balo-om"), chumBalo = baloOm.querySelector(".chum-balo");
  w.holdR.insertAdjacentHTML("beforeend", '<g class="chum" opacity="0">' + api.chumChiaNhaSVG({ kiruna: true }) + "</g>");
  var chum = w.holdR.querySelector(".chum"), chumK = chum.querySelector(".ck-kiruna");
  gsap.set(chumK, { opacity: 0 });
  var CSX = 1.5;
  var chumPose = function (A, ang) { var h = api.handWorld("R", A); return api.holdPose("R", A, h[0], h[1] + 14, ang || 0, CSX); };
  // pop-up mặt cắt: các phần tử
  var nhaMC = [0, 1, 2, 3].map(function (i) { return mc.querySelector(".md-nha-" + i); });
  var maiMC0 = mc.querySelector(".md-mai-0"), lomMC = mc.querySelector(".md-lom"), muiMC = mc.querySelector(".md-mui");
  var thungMC = [0, 1, 2, 3].map(function (i) { return mc.querySelector(".md-thung-" + i); });
  var bangMC = thungMC.map(function (g) { return g.querySelector(".tg-bang"); });
  var CHAN = api.MAT_CAT_NHA(LOP.w, LOP.h);
  // đoàn pop-up đi trên trang (làn trước v +170)
  var ZD = SO.z + 170;
  var nhaGo = fp("M 10 90 L 10 40 L 80 40 L 80 90 Z", C.WOOD, 4) + fp("M 2 44 L 45 8 L 88 44 Z", "#9a4a32", 4) + '<rect x="30" y="56" width="22" height="20" fill="' + C.WIN + '" stroke="' + C.INK + '" stroke-width="3"/>';
  var DOAN = [
    { svg: nhaGo, w: 90, h: 92, x0: -60, x1: 312, tu: tu.houses || 20.64, di: 1.6 },
    { svg: api.cuaHangSVG(110, 92), w: 110, h: 92, x0: -60, x1: 205, tu: tu.shops || 21.46, di: 1.5 },
    { svg: api.thapDongHoSVG(70, 160), w: 70, h: 160, x0: -60, x1: 112, tu: tu.clock || 22.09, di: 1.4 },
    { svg: api.nhaThoGoSVG(200, 150), w: 200, h: 150, x0: -60, x1: -12, tu: tu.church || 24.19, di: 1.8 }
  ].map(function (o) {
    o.el = api.cut(the, o.w, o.h, o.svg, { pos: { x: o.x0, y: TY - 4, z: ZD }, ax: o.w / 2, ay: o.h, f: api.F.AM_NHO });
    gsap.set(o.el, { scaleY: 0.001, opacity: 0 });
    return o;
  });

  // ---------------------------------------------------------------- tư thế đầu
  var A0 = 4;
  api.armSet(w, "L", A0);
  gsap.set(ck, keyPose(A0, -90));
  api.quaySet(w, -0.3);
  api.look(w, 0, -14, 12, 0.01);
  var moveTo = function (t, d, x, z, ease) { tl.fromTo(w.pos, { x: w.x, z: w.z }, { x: x, z: z, duration: d, ease: ease || "power2.inOut", immediateRender: false }, t); w.x = x; w.z = z; };

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 330, cy: 40, cz: -200, k: 450, rx: -24, ry: 4 });
  api.camTo(R, 1.6, 2.6, { cx: 470, cy: 10, cz: -120, k: 520, rx: -10, ry: 4 }, "sine.inOut");
  api.camTo(R, 4.3, 0.8, { cx: 345, cy: 0, cz: -130, k: 500, rx: -9, ry: 4 }, "power2.inOut");   // Wob nửa phải cho thẻ hộ chiếu
  // 5,1–9,3: đứng yên
  var smoother = function (x) { return x * x * x * (x * (x * 6 - 15) + 10); };
  api.camTo(R, 9.3, 1.2, { cx: 190, cy: 40, cz: -240, k: 440, rx: -30, ry: 0 }, smoother);       // [luot-smootherstep]
  api.camTo(R, 10.5, 1.5, { cx: 200, k: 470 }, "sine.inOut");
  api.camTo(R, 12.2, 1.0, { cx: -20, cy: 100, cz: -300, k: 580, rx: -8, ry: 0 }, "power2.inOut");   // trước mặt cắt
  api.camTo(R, 15.1, 0.9, { cx: -20, cy: 95, k: 595 }, "sine.inOut");
  api.camTo(R, 17.9, 0.9, { cx: -10, cy: 105, cz: -250, k: 540, rx: -10 }, "power2.inOut");          // cả trang + đoàn
  api.camTo(R, 24.5, 0.8, { cx: -230, cy: 20, cz: -640, k: 520, rx: -8, ry: 5 }, "power2.inOut");   // chân đèn
  var WC = { x: -225, z: -628 };
  var RING = { x: WC.x + 60, y: TY - 165 };
  api.camTo(R, 26.45, 0.45, { cx: RING.x, cy: RING.y, cz: WC.z, k: 790, rx: -4, ry: 2 }, "power3.out");   // [lao-vao-can-canh]
  api.camTo(R, 26.9, 2.4, { k: 810 }, "sine.inOut");
  api.camTo(R, 29.3, 0.4, { cy: RING.y - 30 }, "power2.out");

  // ---------------------------------------------------------------- 0–1,28 cụm mái trượt khỏi chỗ cũ
  var tMoved = tu.moved || 1.28;
  tl.to(maiTH, { x: "+=78", duration: 0.42, ease: "power2.inOut" }, tMoved - 0.36);
  tl.to(maiTH, { rotationZ: 4, duration: 0.12, yoyo: true, repeat: 1 }, tMoved - 0.36);
  api.sfx("lat-giay", tMoved - 0.3, 0.2);
  api.look(w, tMoved + 0.1, -12, 16, 0.15);
  api.lids(w, tMoved + 0.1, 0.3, 0.15);
  // 1,5 nhặt chìa
  api.lids(w, 1.55, 0, 0.1);
  api.nghieng(w, 1.45, -14, 0.25);
  keyArm(1.45, 0.25, 22, -90, "power2.out");
  tl.set(ckNam, { opacity: 0 }, 1.72); tl.set(ck, { opacity: 1 }, 1.72);
  api.nghieng(w, 1.75, 0, 0.2);
  // "Hi," vẫy bằng tay cầm chìa
  var tHi = tu.hi || 2.03;
  api.quay(w, tHi - 0.25, 0.05, 0.25);
  api.look(w, tHi - 0.2, 0, 2, 0.15);
  keyArm(tHi - 0.15, 0.25, 150, -80, "back.out(1.6)");
  [0, 1, 2, 3].forEach(function (i) { keyArm(tHi + 0.12 + i * 0.2, 0.2, i % 2 ? 150 : 128, i % 2 ? -80 : -100, "sine.inOut"); });
  api.sfx("ting", tHi, 0.25);
  api.hop(w, (tu.wob || 2.9) - 0.05, 8, 0.22);
  keyArm(3.2, 0.35, 40, -90, "power2.inOut");
  var tVis = tu.visit || 3.76, tAsk = tu.ask || 4.84;
  api.armTo(w, "R", tVis - 0.1, 0.25, -64, "power2.out");
  api.look(w, tu.odd || 4.05, 6, -4, 0.15);
  api.armTo(w, "R", tAsk - 0.1, 0.3, -36, "power2.inOut"); keyArm(tAsk - 0.1, 0.3, 50, -80);
  api.look(w, tAsk + 0.3, 0, 2, 0.15);
  api.armTo(w, "R", 5.45, 0.3, 0, "power2.inOut"); keyArm(5.45, 0.3, A0, -90);
  // thẻ hộ chiếu
  var hc = api.theHoChieu({ noi: chu[0], nuoc: chu[1], hoi: chu[2], x: 96, y: 54, bo: api.HC_LON });
  hc.vao(5.19, 0.1);
  api.sfx("lat-giay", 5.17, 0.55);
  hc.ra(8.60, 0.22);
  api.sfx("lat-giay", 8.60, 0.4);
  api.look(w, 5.5, 0, 12, 0.12); api.look(w, 5.72, 0, 0, 0.14);       // gật một cái
  api.nghieng(w, 5.5, 3, 0.12); api.nghieng(w, 5.72, 0, 0.16);
  api.look(w, 6.4, -12, -8, 0.2);
  api.look(w, 7.1, 0, 2, 0.2);
  // 7,55 đặt chìa xuống cạnh sổ; "Kiruna," chỉ tay về thẻ
  api.nghieng(w, 7.45, -16, 0.25);
  keyArm(7.45, 0.3, 26, -160, "power2.inOut");
  tl.set(ck, { opacity: 0 }, 7.78); tl.set(ckNam, { opacity: 1, x: 440, z: -60 }, 7.78);
  api.sfx("lat-giay", 7.78, 0.2);
  api.nghieng(w, 7.8, 0, 0.2);
  var tKir = tu.kiruna || 8.25;
  api.armTo(w, "L", tKir - 0.25, 0.25, goc("L", -30, 80), "back.out(1.6)");
  api.look(w, tKir - 0.2, -16, -14, 0.15);
  api.armTo(w, "L", 8.95, 0.3, A0, "power2.inOut");

  // ---------------------------------------------------------------- 9,3 lên trang: cờ, đi dây trên vòng Bắc Cực, chấm Kiruna
  var ZBC = Z_TRANG(B.BC_Y);
  tl.set([coK, coBC], { opacity: 1 }, 9.5);
  tl.to(coBC, { scaleY: 1, duration: 0.3, ease: "back.out(2)" }, 9.55);
  tl.to(coK, { scaleY: 1, duration: 0.3, ease: "back.out(2)" }, 9.85);
  api.sfx("pop", 9.6, 0.3); api.sfx("pop", 9.9, 0.3);
  api.walk(w, 9.3, 10.2, 350, ZBC, { face: -0.6, endFace: -0.4, step: 0.22 });
  tl.to(w.pos, { y: YL, duration: 0.2 }, 10.0);
  // đi dây: dang tay, lắc thăng bằng
  api.armTo(w, "L", 10.2, 0.25, goc("L", -20, 200), "power2.out");
  api.armTo(w, "R", 10.2, 0.25, goc("R", 420, 200), "power2.out");
  api.walk(w, 10.3, 11.5, 196, ZBC, { step: 0.4, swing: 10, noArms: true, ease: "sine.inOut" });
  tl.fromTo(w.upper, { rotation: -5 }, { rotation: 5, svgOrigin: "200 300", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 10.3);
  tl.to(w.upper, { rotation: 0, svgOrigin: "200 300", duration: 0.15 }, 11.5);
  api.look(w, 10.3, -6, 18, 0.15);
  // nhảy lên chấm Kiruna đúng "Circle."
  var tCir = tu.circle || 11.68;
  moveTo(tCir - 0.22, 0.28, X_TRANG(K[0]), Z_TRANG(K[1]), "power1.inOut");
  api.hop(w, tCir - 0.3, 20, 0.28);
  api.armTo(w, "L", tCir, 0.2, 20, "power2.out"); api.armTo(w, "R", tCir, 0.2, -20, "power2.out");
  api.look(w, tCir, 0, 2, 0.15); api.quay(w, tCir - 0.1, 0, 0.2);
  // nhảy khỏi trang, nhặt chìa, lật tờ
  tl.to([coK, coBC, maiTH], { scaleY: 0.001, duration: 0.2, ease: "power2.in" }, 11.98);
  api.hop(w, 11.9, 18, 0.26);
  moveTo(11.95, 0.3, 560, -170, "power1.inOut");
  tl.to(w.pos, { y: TY, duration: 0.15 }, 12.15);
  api.quay(w, 11.95, -0.5, 0.2);
  keyArm(12.12, 0.14, 8, -160, "power2.out");
  tl.set(ckNam, { opacity: 0 }, 12.24); tl.set(ck, { opacity: 1 }, 12.24);
  keyArm(12.26, 0.18, goc("L", -10, 236), -90, "power2.out");    // vươn tay trái tới mép tờ
  var tLat = tu.under || 12.44;
  toMap.lat(tLat, 0.7, "trai");
  api.sfx("lat-giay", tLat, 0.5);
  tl.set(lopMC, { visibility: "visible" }, tLat);
  keyArm(tLat + 0.2, 0.3, 20, -90, "power2.inOut");
  so.batLop(0, tLat + 0.5, 0.55);
  api.sfx("pop", tLat + 0.62, 0.4);
  // Wob vòng ra sau mặt cắt sang mép trái
  api.walk(w, 13.0, 14.9, -310, -200, { face: -0.7, endFace: 0.45, step: 0.24, keepL: true });
  api.look(w, 15.0, 14, 6, 0.2);

  // ---------------------------------------------------------------- "swallowing": đất lõm, nhà nghiêng, mái trượt; chặn bằng bút chì
  var tSw = tu.swallowing || 15.43;
  tl.to(lomMC, { opacity: 1, duration: 0.8, ease: "sine.inOut" }, tSw);
  [-12, -9, -6, -3].forEach(function (g, i) {
    tl.to(nhaMC[i], { rotation: g, svgOrigin: CHAN[i][0] + " " + CHAN[i][1], duration: 0.9, ease: "sine.inOut" }, tSw + 0.1 + i * 0.05);
  });
  // nhặt bút chì trên bàn (trước đó)
  api.nghieng(w, 15.0, 10, 0.2);
  api.armTo(w, "R", 15.0, 0.2, -10, "power2.out");
  tl.set(butNam, { opacity: 0 }, 15.2); tl.set(but, { opacity: 1 }, 15.2);
  tl.set(but, butPose(-10, 80), 15.2);
  api.nghieng(w, 15.25, 0, 0.2);
  var tBlk = 16.63;
  var wc = function (x, y) { return [200 + (x - w.x) / 0.9, 392 + (y - TY) / 0.9]; };   // điểm thế giới → hệ Wob
  var RX0 = X_TRANG(240 - LOP.w / 2) , RF = wc(RX0 + CHAN[0][0] - LOP.w * 0.05 - 8, TY - 2 - (LOP.h - CHAN[0][1] + LOP.w * 0.1 * 0.9));
  var AB = goc("R", RF[0], RF[1]), GB = Math.atan2(RF[1] - 212, RF[0] - 314) * 180 / Math.PI;
  tl.to(maiMC0, { x: -16, rotation: -6, svgOrigin: CHAN[0][0] + " " + (CHAN[0][1] - 40), duration: 0.65, ease: "power1.in" }, tSw + 0.6);
  api.armTo(w, "R", tBlk - 0.3, 0.3, AB, "power3.out");
  tl.to(but, Object.assign(butPose(AB, GB), { duration: 0.3, ease: "power3.out" }), tBlk - 0.3);
  var SB = Math.hypot(RF[0] - 314, RF[1] - 212) / 250;
  tl.to(w.armR, { scaleY: SB, svgOrigin: "314 212", duration: 0.3, ease: "power3.out" }, tBlk - 0.3);
  api.look(w, tBlk - 0.3, 18, -2, 0.12);
  api.lids(w, tBlk - 0.1, 0.25, 0.12);
  // bút nghiêng (17,03): mái đẩy thêm chút
  var tSt = tu.stood || 17.03;
  tl.to(but, Object.assign(butPose(AB, GB + 12), { duration: 0.35, ease: "power2.out" }), tSt);
  tl.to(maiMC0, { x: -22, rotation: -9, duration: 0.35, ease: "power2.out" }, tSt);
  api.nghieng(w, tSt, 6, 0.3);
  api.look(w, tSt + 0.15, 10, -6, 0.12, 1.15);
  // 18,02 thả; thùng bật lên mái (3, 2, 1), Wob dán băng thùng 0
  var tSo = tu.so && tu.so > 17 ? tu.so : 18.02;
  tSo = 18.02;
  api.nghieng(w, tSo, 0, 0.2);
  tl.to(w.armR, { scaleY: 1, svgOrigin: "314 212", duration: 0.25 }, tSo);
  api.armTo(w, "R", tSo, 0.25, -20, "power2.inOut");
  tl.to(but, Object.assign(butPose(-20, 70), { duration: 0.25 }), tSo);
  api.lids(w, tSo, 0, 0.12);
  [3, 2, 1].forEach(function (i, k) {
    var o = CHAN[i][0] + " " + (CHAN[i][1] - LOP.w * 0.1 * 1.2);
    tl.set(bangMC[i], { scaleX: 1, svgOrigin: "-26 -46" }, 0);
    tl.fromTo(thungMC[i], { opacity: 1, scale: 0.01 }, { scale: 1, svgOrigin: o, duration: 0.22, ease: "back.out(2.2)", immediateRender: false }, 18.3 + k * 0.15);
  });
  api.sfx("pop", 18.32, 0.3);
  tl.set(bangMC[0], { scaleX: 0.001, svgOrigin: "-26 -46" }, 0);
  tl.fromTo(thungMC[0], { opacity: 1, scale: 0.01 }, { scale: 1, svgOrigin: CHAN[0][0] + " " + (CHAN[0][1] - LOP.w * 0.12), duration: 0.22, ease: "back.out(2.2)", immediateRender: false }, 18.75);
  var BX = wc(RX0 + CHAN[0][0], TY - 2 - (LOP.h - CHAN[0][1] + LOP.w * 0.1 * 1.25)), AT = goc("R", BX[0], BX[1]), GT = Math.atan2(BX[1] - 212, BX[0] - 314) * 180 / Math.PI;
  tl.to(but, Object.assign(butPose(AT, GT), { duration: 0.25 }), 19.0);
  api.armTo(w, "R", 19.0, 0.25, AT, "power2.out");
  tl.to(w.armR, { scaleY: Math.hypot(BX[0] - 314, BX[1] - 212) / 250, svgOrigin: "314 212", duration: 0.25, ease: "power2.out" }, 19.0);
  tl.to(bangMC[0], { scaleX: 1, duration: 0.35, ease: "power1.inOut" }, 19.2);
  api.sfx("lat-giay", 19.2, 0.25);
  [19.6, 19.78].forEach(function (t) { api.armTo(w, "R", t, 0.09, AT + 6, "sine.inOut"); api.armTo(w, "R", t + 0.09, 0.09, AT, "sine.inOut"); });   // vuốt phẳng
  tl.to(w.armR, { scaleY: 1, svgOrigin: "314 212", duration: 0.25 }, 19.98);
  api.armTo(w, "R", 19.98, 0.25, -20, "power2.inOut");
  var tEast = tu.east || 19.93;
  tl.fromTo(muiMC, { opacity: 1, scale: 0.01 }, { scale: 1, svgOrigin: (LOP.w * 0.5) + " " + (LOP.h * 0.42 - LOP.h * 0.33), duration: 0.25, ease: "back.out(2)", immediateRender: false }, tEast - 0.05);
  api.sfx("pop", tEast, 0.4);
  api.look(w, tEast, 16, -6, 0.15);

  // ---------------------------------------------------------------- đoàn pop-up đi hàng một sang phải; Wob vẫy bút chì
  DOAN.forEach(function (o, i) {
    var t0 = o.tu - 0.26;
    tl.set(o.el, { opacity: 1 }, t0);
    tl.to(o.el, { scaleY: 1, duration: 0.18, ease: "back.out(2)" }, t0);
    api.sfx("pop", t0 + 0.05, 0.28);
    tl.to(o.el, { x: o.x1, duration: o.di, ease: i === 3 ? "sine.inOut" : "power1.inOut" }, o.tu + 0.05);
    var n = Math.round(o.di / (i === 3 ? 0.45 : 0.25));
    tl.to(o.el, { y: TY - 4 - (i === 3 ? 6 : 12), duration: o.di / n / 2, yoyo: true, repeat: 2 * n - 1, ease: "sine.out" }, o.tu + 0.05);
  });
  api.armTo(w, "R", 20.4, 0.25, -110, "back.out(1.5)");
  tl.to(but, Object.assign(butPose(-110, -30), { duration: 0.25 }), 20.4);
  for (var vv = 0; vv < 8; vv++) {
    var tv = 20.7 + vv * 0.42, aa = vv % 2 ? -110 : -80;
    api.armTo(w, "R", tv, 0.42, aa, "sine.inOut");
    tl.to(but, Object.assign(butPose(aa, vv % 2 ? -30 : 10), { duration: 0.42, ease: "sine.inOut" }), tv);
  }
  api.look(w, 20.6, 18, 4, 0.2);
  api.look(w, 22.6, 6, 4, 0.2);
  api.look(w, 23.9, -2, 6, 0.2);           // nhà thờ chậm, chờ
  api.lids(w, 24.0, 0.3, 0.15);
  // 24,6 thả bút, 25,02 tới chân đèn kéo ba lô ôm vào lòng
  tl.set(but, { opacity: 0 }, 24.3); tl.set(butNam, { opacity: 1 }, 24.3);
  api.armTo(w, "R", 24.25, 0.2, 0, "power2.out");
  api.lids(w, 24.3, 0, 0.1);
  var tWent = 24.75;
  tl.set(B.congTac, { opacity: 0 }, 24.45);                       // công tắc khuất (tránh đè chùm chìa lúc cận)
  api.walk(w, 24.35, tWent + 0.4, WC.x, WC.z, { face: -0.2, endFace: -0.3, step: 0.2, keepL: true });
  api.armTo(w, "R", tWent + 0.4, 0.15, goc("R", 200, 330), "power2.out");
  api.nghieng(w, tWent + 0.4, -10, 0.15);
  tl.set(B.baLo, { opacity: 0 }, tWent + 0.55); tl.set(baloOm, { opacity: 1 }, tWent + 0.55);
  api.nghieng(w, tWent + 0.6, 0, 0.2);
  api.armTo(w, "R", tWent + 0.6, 0.2, goc("R", 250, 300), "power2.out");
  keyArm(tWent + 0.6, 0.2, goc("L", 150, 300), -60, "power2.out");
  var tIn = tu.in || 25.89;
  api.quay(w, tIn - 0.2, 0, 0.2);
  api.look(w, tIn - 0.15, 0, 14, 0.12); api.look(w, tIn + 0.1, 0, 0, 0.14);   // gật quả quyết
  api.nghieng(w, tIn - 0.15, 4, 0.12); api.nghieng(w, tIn + 0.1, 0, 0.14);
  api.lids(w, tIn - 0.1, 0.35, 0.12);

  // ---------------------------------------------------------------- 26,45 chùm chìa nhà (cận)
  var tEv = 26.3;
  tl.set(baloOm, { opacity: 0 }, tEv); tl.set(B.baLo, { opacity: 1, x: WC.x - 235, z: WC.z - 70, rotationZ: 4 }, tEv);
  api.lids(w, tEv, 0, 0.1);
  var AR1 = goc("R", 318, 215);
  api.armTo(w, "R", tEv, 0.3, AR1, "power2.out");
  tl.set(chumBalo, { opacity: 0 }, tEv);
  tl.set(chum, { opacity: 1 }, tEv);
  tl.fromTo(chum, chumPose(goc("R", 250, 300), 10), Object.assign(chumPose(AR1, 0), { duration: 0.3, ease: "power2.out", immediateRender: false }), tEv);
  var AL1 = goc("L", 96, 215);
  keyArm(tEv + 0.1, 0.3, AL1, 0, "power2.out");
  api.look(w, tEv + 0.3, 10, 10, 0.15);
  // luồn chìa Kiruna vào vòng đúng "ring,"
  var tRing = tu.ring || 28.02;
  var AL2 = goc("L", 214, 228);
  keyArm(tRing - 0.5, 0.45, AL2, 12, "power1.inOut");
  tl.set(ck, { opacity: 0 }, tRing); tl.set(chumK, { opacity: 1 }, tRing);
  tl.fromTo(chum, { rotation: "+=0" }, { rotation: "+=8", duration: 0.1, yoyo: true, repeat: 1, immediateRender: false }, tRing);
  api.sfx("ting", tRing, 0.28);
  keyArm(tRing + 0.1, 0.3, 6, -90, "power2.inOut");
  api.look(w, tRing + 0.1, 10, 6, 0.15);
  // "keys." giơ cả chùm, leng keng; giữ tới "But"
  var tKeys = tu.keys && tu.keys > 29 ? tu.keys : 29.39;
  var AR2 = goc("R", 372, 142);
  api.armTo(w, "R", tKeys - 0.2, 0.25, AR2, "back.out(1.6)");
  tl.to(chum, Object.assign(chumPose(AR2, 0), { duration: 0.25, ease: "back.out(1.6)" }), tKeys - 0.2);
  [0, 1, 2].forEach(function (i) { api.armTo(w, "R", tKeys + 0.05 + i * 0.12, 0.12, AR2 + (i % 2 ? -5 : 5), "sine.inOut"); });
  api.armTo(w, "R", tKeys + 0.41, 0.12, AR2, "sine.out");
  api.sfx("ting", tKeys, 0.35); api.sfx("ting", tKeys + 0.18, 0.25);
  api.look(w, tKeys - 0.1, 14, -8, 0.15);
  api.lids(w, tKeys + 0.1, 0.4, 0.15);                         // tự hào
  api.nghieng(w, tKeys, -4, 0.2);

  // ---------------------------------------------------------------- thiêu thân 1736: lượn một vòng quanh đầu, đậu lên chìa, camera lao vào
  var DAU = { x: WC.x, y: TY + (200 - 392) * 0.9, z: WC.z };
  var hR2 = api.handWorld("R", AR2);
  var DAP = { x: WC.x + (hR2[0] + 14 * CSX + 30 - 200) * 0.9, y: TY + (hR2[1] + 14 + 28 * CSX + 30 - 392) * 0.9, z: WC.z + 12 };
  var moth = api.cut(the, 240, 150, '<g transform="translate(120 75) scale(.9)">' + api.thieuThanSVG(chu[5], 40) + "</g>", { pos: { x: DAU.x + 260, y: DAU.y - 60, z: DAU.z }, ax: 120, ay: 75, f: api.F.AM_NHO });
  var canhMoth = [moth.svg.querySelector(".tt-canh"), moth.svg.querySelector(".tt-chu")];
  gsap.set(moth, { opacity: 0, scale: 0.55 });
  var tSmall = tu.small || 30.51, tBug = tu.bugging || 31.45;
  api.moiKhung(function (t) {
    if (t < tSmall - 0.25) { gsap.set(moth, { opacity: 0 }); return; }
    var x, y, z, s = 0.55, ry = 0;
    if (t < tSmall) { var e = (t - (tSmall - 0.25)) / 0.25; x = DAU.x + 300 - 140 * e; y = DAU.y - 110 + 40 * e; z = DAU.z; }
    else if (t < tBug - 0.25) {
      var u = (t - tSmall) / (tBug - 0.25 - tSmall), a = u * Math.PI * 2;
      x = DAU.x + 160 * Math.cos(a); z = DAU.z - 120 * Math.sin(a); y = DAU.y - 70 - 25 * Math.sin(a * 2);
    } else if (t < tBug) {
      var v = (t - (tBug - 0.25)) / 0.25, ev = v * v * (3 - 2 * v);
      x = DAU.x + 160 + (DAP.x - DAU.x - 160) * ev; y = DAU.y - 70 + (DAP.y - DAU.y + 70) * ev; z = DAU.z + (DAP.z - DAU.z) * ev; s = 0.55 + 0.05 * ev;
    } else { x = DAP.x; y = DAP.y; z = DAP.z; s = 0.6; }
    gsap.set(moth, { opacity: 1, x: x, y: y, z: z, scale: s });
    var vo = t < tBug ? Math.abs(Math.cos(t * Math.PI * 9)) : 0.85 + 0.15 * Math.cos((t - tBug) * Math.PI * 2.2);
    gsap.set(canhMoth, { scaleX: Math.max(0.15, vo), svgOrigin: "0 0" });
  });
  api.look(w, tSmall, 14, -14, 0.12);
  api.look(w, tSmall + 0.25, -14, -16, 0.12);
  api.look(w, tSmall + 0.5, -10, -6, 0.12);
  api.look(w, tBug - 0.2, 14, -4, 0.12, 1.15);
  api.lids(w, tBug - 0.2, 0, 0.1);
  api.camTo(R, 31.62, DUR - 31.62, { cx: DAP.x, cy: DAP.y, cz: DAP.z, k: 1000, rx: -2, ry: 0 }, "power3.in");

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[9.3, 15.0], [24.9, 25.6]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 3.0, 0); api.blink(w, 6.9, 0); api.blink(w, 14.2, 0); api.blink(w, 21.9, 0); api.blink(w, 27.2, 0);
};
