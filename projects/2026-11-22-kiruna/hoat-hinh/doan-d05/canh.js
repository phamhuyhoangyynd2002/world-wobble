/* Đoạn d05 (diorama, hiện tại, 5,54 s) – "So what was everyone waiting for? My first guesses were terrible. Both of them."
 * Vào cat, ra giay. Bố cục bàn chung tập 6 (ban6). Trang sổ phác: thước thời gian (hai chấm, khoảng trống dài, KHÔNG chữ)
 * + ngôi nhà nhỏ có ô cửa sổ sáng đèn. Chùm chìa (có chìa Kiruna) nằm cạnh sổ.
 * 0,05 Wob gõ ngón tay lên thước thời gian (hai cái), nhìn người xem, nhún vai đúng "for?" 1,25.
 * 1,95 giơ hai thẻ vẽ (cực quang, khối băng) lên tự hào; "terrible." 2,99 nhìn lại hai thẻ, xìu.
 * 3,3 úp thẻ cực quang dưới cốc trà làm đế lót ly; úp thẻ khối băng dưới góc sổ đúng "them." 4,25 (drop); giữ 0,6 s;
 * 4,85 [lao-vao-hinh-ve] camera lao vào ô cửa sổ sáng trên trang; ra giấy.
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
  var WX = 610, WZ = -420;
  var B = banTap6(api, data, { wob: { x: WX, z: WZ, s: 0.9 } });
  var w = B.w, R = B.R, TY = B.TY, the = B.the, so = B.so, goc = B.goc, SO = B.SO;
  // trang phác: thước thời gian + nhà nhỏ cửa sổ sáng
  var TLV = 92, TL0 = 150, TL1 = 452;
  var trang = '<path d="M ' + TL0 + " " + TLV + " L " + TL1 + " " + TLV + '" stroke="' + C.INK + '" stroke-width="6"/>';
  for (var u = TL0; u <= TL1; u += 25) trang += '<path d="M ' + u + " " + (TLV - (u % 75 === 0 ? 16 : 9)) + " L " + u + " " + (TLV + (u % 75 === 0 ? 16 : 9)) + '" stroke="' + C.INK + '" stroke-width="3"/>';
  trang += '<circle cx="' + (TL0 + 14) + '" cy="' + TLV + '" r="13" fill="' + C.TERRA + '" stroke="' + C.INK + '" stroke-width="4"/>' +
    '<circle cx="' + (TL1 - 26) + '" cy="' + TLV + '" r="13" fill="#4F7A5A" stroke="' + C.INK + '" stroke-width="4"/>' +
    sk("M " + (TL0 + 40) + " " + (TLV + 34) + " C " + (TL0 + 120) + " " + (TLV + 60) + " " + (TL1 - 120) + " " + (TLV + 60) + " " + (TL1 - 50) + " " + (TLV + 34), 3, C.INK, ' stroke-dasharray="3 9"');
  var NX = 300, NY = 225;                         // nhà phác + cửa sổ sáng
  trang += fp("M " + (NX - 80) + " " + (NY + 110) + " L " + (NX - 80) + " " + (NY + 10) + " L " + NX + " " + (NY - 60) + " L " + (NX + 80) + " " + (NY + 10) + " L " + (NX + 80) + " " + (NY + 110) + " Z", "none", 4) +
    sk("M " + (NX - 96) + " " + (NY + 24) + " L " + NX + " " + (NY - 74) + " L " + (NX + 96) + " " + (NY + 24), 5) +
    '<rect x="' + (NX - 30) + '" y="' + (NY + 18) + '" width="60" height="52" fill="#ffd36b" stroke="' + C.INK + '" stroke-width="4"/>' +
    sk("M " + NX + " " + (NY + 18) + " L " + NX + " " + (NY + 70) + " M " + (NX - 30) + " " + (NY + 44) + " L " + (NX + 30) + " " + (NY + 44), 3) +
    '<circle cx="' + NX + '" cy="' + (NY + 44) + '" r="60" fill="#ffd36b" opacity=".18"/>' +
    sk("M " + (NX - 140) + " " + (NY + 130) + " C " + (NX - 60) + " " + (NY + 116) + " " + (NX + 60) + " " + (NY + 140) + " " + (NX + 150) + " " + (NY + 124), 3, "#9aa7a8");
  so.veTrang(trang);
  var diemT = function (uu, vv) { return { x: SO.x + uu, y: TY - 3, z: SO.z - SO.d / 2 + vv }; };
  // chùm chìa (có chìa Kiruna) nằm cạnh sổ
  api.cut(the, 160, 180, '<g transform="translate(70 40) rotate(-20)">' + api.chumChiaNhaSVG({ kiruna: true }) + "</g>", { pos: { x: 440, y: TY - 4, z: -160, rotationX: 90 }, ax: 70, ay: 40, f: api.F.AM_NHO });
  // thẻ vẽ trong tay + thẻ úp nằm (mặt sau trơn)
  w.holdL.insertAdjacentHTML("beforeend", '<g class="tvA" opacity="0"><g transform="translate(-80 -104)">' + api.theVeSVG("cucQuang") + "</g></g>");
  w.holdR.insertAdjacentHTML("beforeend", '<g class="tvB" opacity="0"><g transform="translate(-80 -104)">' + api.theVeSVG("khoiBang") + "</g></g>");
  var tvA = w.holdL.querySelector(".tvA"), tvB = w.holdR.querySelector(".tvB");
  var lungThe = fp("M 4 4 L 156 4 L 156 106 L 4 106 Z", "#f6eedb", 5) + sk("M 24 30 L 136 30 M 24 55 L 136 55 M 24 80 L 110 80", 2.5, "#c9b991");
  var COC = B.COC;
  var theUpA = api.cut(the, 160, 110, lungThe, { pos: { x: COC.x - 4, y: TY - 2, z: COC.z + 6, rotationX: 90, scale: 0.9 }, ax: 80, ay: 55, f: api.F.AM_NHO });
  var theUpB = api.cut(the, 160, 110, '<g transform="rotate(14 80 55)">' + lungThe + "</g>", { pos: { x: SO.x + SO.w + 30, y: TY - 1, z: SO.z - SO.d / 2 + 30, rotationX: 90, scale: 0.9 }, ax: 80, ay: 55, f: api.F.AM_NHO });
  gsap.set([theUpA, theUpB], { opacity: 0 });
  var hp = function (side, A, wa, dx, dy) { var h = api.handWorld(side, A); return api.holdPose(side, A, h[0] + (dx || 0), h[1] + (dy || 0), wa || 0); };
  var cardArm = function (side, el, t, d, A, wa, ease) { api.armTo(w, side, t, d, A, ease); tl.to(el, Object.assign(hp(side, A, wa), { duration: d, ease: ease || "power2.inOut" }), t); };

  // ---------------------------------------------------------------- tư thế đầu, camera
  api.quaySet(w, -0.5);
  api.look(w, 0, -16, 14, 0.01);
  var wc = function (x, y) { return [200 + (x - WX) / 0.9, 392 + (y - TY) / 0.9]; };
  var TAP = diemT(TL1 - 30, TLV), tp = wc(TAP.x, TY - 4);
  var AT = goc("L", tp[0], tp[1]), ST = Math.hypot(tp[0] - 86, tp[1] - 212) / 96;
  api.camSet(R, null, { cx: 380, cy: 50, cz: -400, k: 520, rx: -26, ry: -6 });
  api.camTo(R, 0, 4.8, { cx: 395, k: 545 }, "sine.inOut");

  // ---------------------------------------------------------------- 0,05 gõ ngón tay lên thước thời gian
  api.armSet(w, "L", AT - 6);
  tl.set(w.armL, { scaleY: ST * 0.9, svgOrigin: "86 212" }, 0);
  [0.25, 0.55].forEach(function (t) {
    tl.to(w.armL, { rotation: AT, scaleY: ST, svgOrigin: "86 212", duration: 0.08, ease: "power2.in" }, t);
    tl.to(w.armL, { rotation: AT - 6, scaleY: ST * 0.9, svgOrigin: "86 212", duration: 0.12, ease: "power2.out" }, t + 0.09);
  });
  tl.to(w.armL, { rotation: 0, scaleY: 1, svgOrigin: "86 212", duration: 0.25, ease: "power2.inOut" }, 0.85);
  w.arm.L = 0;
  api.quay(w, 0.8, 0, 0.25);
  api.look(w, 0.85, 0, 2, 0.15);
  // "for?" nhún vai
  var tFor = tu["for"] || 1.25;
  api.armTo(w, "L", tFor - 0.15, 0.2, 52, "power2.out"); api.armTo(w, "R", tFor - 0.15, 0.2, -52, "power2.out");
  tl.to(w.upper, { y: -8, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, tFor - 0.1);
  api.lids(w, tFor - 0.1, 0.3, 0.12);
  api.armTo(w, "L", tFor + 0.35, 0.25, 6, "power2.inOut"); api.armTo(w, "R", tFor + 0.35, 0.25, -6, "power2.inOut");
  // 1,95 giơ hai thẻ lên tự hào
  var tMy = tu.my || 1.95;
  api.lids(w, tMy - 0.2, 0, 0.1);
  var AL = goc("L", 20, 120), AR = goc("R", 380, 120);
  tl.set([tvA, tvB], { opacity: 1 }, tMy - 0.18);
  tl.set(tvA, hp("L", 6, -10), tMy - 0.18); tl.set(tvB, hp("R", -6, 10), tMy - 0.18);
  cardArm("L", tvA, tMy - 0.15, 0.3, AL, -8, "back.out(1.7)");
  cardArm("R", tvB, tMy - 0.15, 0.3, AR, 8, "back.out(1.7)");
  api.hop(w, tMy, 10, 0.24);
  api.nghieng(w, tMy + 0.1, -3, 0.2);
  api.look(w, tMy + 0.05, 0, -2, 0.12);
  api.lids(w, tMy + 0.15, 0.35, 0.15);                         // tự hào
  // "terrible." nhìn lại hai thẻ, xìu
  var tTer = tu.terrible || 2.99;
  api.nghieng(w, tTer - 0.1, 0, 0.2);
  api.look(w, tTer - 0.05, -18, -8, 0.15);
  api.lids(w, tTer - 0.05, 0.1, 0.1);
  api.look(w, tTer + 0.3, 18, -8, 0.15);
  cardArm("L", tvA, tTer + 0.1, 0.3, goc("L", 40, 170), -4);
  cardArm("R", tvB, tTer + 0.1, 0.3, goc("R", 360, 170), 4);
  api.lids(w, tTer + 0.45, 0.45, 0.2);
  // 3,3 thẻ cực quang úp dưới cốc trà
  var cupW = wc(COC.x, TY - 40);
  var AC = goc("L", cupW[0], cupW[1]), SC = Math.hypot(cupW[0] - 86, cupW[1] - 212) / 96;
  api.quay(w, 3.25, -0.5, 0.2);
  api.look(w, 3.25, -18, 10, 0.12);
  api.armTo(w, "L", 3.3, 0.22, AC, "power2.inOut");
  tl.to(w.armL, { scaleY: Math.max(1, SC), svgOrigin: "86 212", duration: 0.22, ease: "power2.inOut" }, 3.3);
  tl.to(tvA, Object.assign(hp("L", AC, 80), { duration: 0.22 }), 3.3);
  tl.to(B.coc, { y: TY - 34, duration: 0.12, ease: "power2.out" }, 3.4);
  tl.set(tvA, { opacity: 0 }, 3.52); tl.set(theUpA, { opacity: 1 }, 3.52);
  tl.to(B.coc, { y: TY, duration: 0.12, ease: "power2.in" }, 3.56);
  api.sfx("lat-giay", 3.52, 0.2);
  tl.to(w.armL, { rotation: 4, scaleY: 1, svgOrigin: "86 212", duration: 0.25, ease: "power2.inOut" }, 3.72); w.arm.L = 4;
  // thẻ khối băng úp dưới góc sổ đúng "them."
  var tThem = tu.them || 4.25;
  var gocS = wc(SO.x + SO.w + 20, TY - 6);
  var AK = goc("R", gocS[0] + 220, gocS[1]);
  api.quay(w, tThem - 0.5, -0.7, 0.2);
  api.nghieng(w, tThem - 0.45, -14, 0.25);
  api.armTo(w, "R", tThem - 0.45, 0.25, goc("R", 300, 330), "power2.inOut");
  tl.to(tvB, Object.assign(hp("R", goc("R", 300, 330), 90), { duration: 0.25 }), tThem - 0.45);
  tl.set(tvB, { opacity: 0 }, tThem - 0.18); tl.set(theUpB, { opacity: 1 }, tThem - 0.18);
  tl.fromTo(theUpB, { x: SO.x + SO.w + 150 }, { x: SO.x + SO.w + 30, duration: 0.2, ease: "power3.out", immediateRender: false }, tThem - 0.18);
  api.sfx("drop", tThem, 0.45);
  api.nghieng(w, tThem + 0.1, 0, 0.25);
  api.armTo(w, "R", tThem + 0.1, 0.25, -4, "power2.inOut");
  api.quay(w, tThem + 0.15, 0, 0.25);
  api.look(w, tThem + 0.2, 0, 2, 0.15);
  api.lids(w, tThem + 0.2, 0.42, 0.15);                        // giữ 0,6 s, tỉnh bơ
  // 4,85 lao vào ô cửa sổ sáng trên trang
  var CS = diemT(NX, NY + 44);
  api.camTo(R, 4.82, DUR - 4.82, { cx: CS.x, cy: CS.y - 10, cz: CS.z, k: 1080, rx: -64, ry: 0 }, "power1.in");

  api.khauHinh(w);
  api.gatDau(w, { bo: [[0, 0.9], [3.2, 3.8]] });
  api.breathe(w, 0, DUR);
};
