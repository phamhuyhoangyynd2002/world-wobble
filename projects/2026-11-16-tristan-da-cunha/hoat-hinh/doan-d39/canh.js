/* Đoạn d39 (diorama, hiện tại, 13,72 s) – về bàn, mở chương bỏ phiếu. Vào cat, ra chen. Không gag.
 * Đèn bàn từ mức thấp của d37 sáng dần lên mức thường (0 → 6 s). Sổ mở trang bản đồ.
 * "By September…": Wob đặt một con tàu giấy nhỏ lên trang sổ (gần Tristan), mũi hướng về phía nam, đẩy nhẹ; "back on Tristan" lật
 * bưu thiếp đang úp lên MỘT NỬA (mép gần nhấc lên, thấy nửa mặt tranh), mặt ngẫm nghĩ.
 * "In December…" [lat-trang-so]: lật sang trang mới (lat-giay), đặt hộp phiếu gỗ nhỏ lên trang; lá phiếu gấp đôi (không chữ) rơi vào khe.
 * "A hundred and forty-eight…" [lao-vao-can-canh]: hai chồng phiếu mọc lên (cao vút / lùn tịt), thẻ "148 to 5" giữa hai chồng
 * (≥ 45 px, ting), Wob mắt mở to.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // 148 to 5
  var WX = 380, WZ = -110, ONG_BUT;
    // ---------------------------------------------------------------- BÀN TẬP 5 (khối chung)
  var SO = { x: -120, z: -240, w: 480, d: 600 };
  var MAP = { x0: 990, y0: -40, k: 1.65 };               // cắt map-tristan (1920×1080) dán lên trang phải 480×600
  var trangMap = function (o) {
    o = o || {};
    var vw = SO.w * MAP.k, vh = SO.d * MAP.k;
    var s = '<rect x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" fill="#3f6a70"/>' +
      '<svg x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" viewBox="' + (MAP.x0 + 14 * MAP.k) + " " + (MAP.y0 + 14 * MAP.k) + " " + (vw - 28 * MAP.k) + " " + (vh - 28 * MAP.k) +
      '" preserveAspectRatio="none"><image href="ban-do/map-tristan.svg" x="0" y="0" width="1920" height="1080"/></svg>' +
      '<rect x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" fill="none" stroke="' + C.INK + '" stroke-width="5"/>' +
      fp("M 0 30 L 46 0 L 70 22 L 24 54 Z", "#e9dcb4", 2, ' opacity=".85"') + fp("M " + (SO.w - 70) + " 22 L " + (SO.w - 46) + " 0 L " + SO.w + " 30 L " + (SO.w - 24) + " 54 Z", "#e9dcb4", 2, ' opacity=".85"');
    return s + (o.them || "");
  };
  var mapUV = function (px, py) { return [(px - MAP.x0) / MAP.k, (py - MAP.y0) / MAP.k]; };   // điểm bản đồ → toạ độ trang
  var TRI = mapUV(1320, 560);                                                                   // chấm Tristan trên trang
  var biaTrong = sk("M 70 120 q 30 -16 60 0 t 60 0 t 60 0 M 100 180 q 30 -16 60 0 t 60 0", 4, "#4f8fa8") +
    fp("M 150 330 L 250 250 L 350 330 Z", "#a08a66", 4) + fp("M 205 286 C 205 262 240 256 250 270 C 262 252 296 262 290 286 Z", "#fbfbf6", 3) +
    sk("M 80 470 C 160 440 260 500 380 460", 3, C.INK, ' stroke-dasharray="2 10"');
  var ban = api.dungBan({ hop: { x: -900, z: -640 }, wob: { x: WX, z: WZ, s: 0.9 }, ongBut: ONG_BUT, so: { x: SO.x, z: SO.z, w: SO.w, d: SO.d, lop: [], biaTrong: biaTrong } });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  gsap.set(so.cover, { rotationY: -180 });
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";                  // ở nhà: không đeo ba lô
  api.cut(the, 200, 340, api.aoMuaTreoSVG(), { pos: { x: 300, y: -420, z: -1270, scale: 1.5 }, ay: 12, f: api.F.AM });          // áo mưa cam trên móc tường
  api.cut(the, 130, 160, api.baLoNhoSVG(), { pos: { x: -740, y: TY, z: -560, rotationZ: -7 }, f: api.F.AM_NHO });               // ba lô nhỏ dựa chân đèn
  var veTau = api.cut(the, 150, 70, '<g transform="rotate(-14 75 35)">' + api.veTauSVG() + "</g>", { pos: { x: 470, y: TY - 4, z: 40, rotationX: 90 }, ax: 75, ay: 35, f: api.F.AM_NHO });
  // dãy chấm bút: trên trang (trong trangMap) + trên mặt bàn
  var chamBan = function (x0, z0, pts, r) {
    var s = "", n = 0;
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (var d = 0; d < L; d += 26) { var u = d / L; s += '<circle cx="' + (a[0] + (b[0] - a[0]) * u).toFixed(1) + '" cy="' + (a[1] + (b[1] - a[1]) * u).toFixed(1) + '" r="' + (r || 6) + '" fill="#2b3a5c"/>'; n++; }
    }
    return s;
  };
  var CHAM_TRANG = [[TRI[0] + 30, TRI[1] + 60], [TRI[0] + 120, TRI[1] + 110], [SO.w - 10, SO.d - 70]];
  api.cut(the, 1200, 420, chamBan(0, 0, [[0, 0], [260, 70], [560, 150], [900, 230], [1180, 300]]), { pos: { x: SO.x + SO.w + 6, y: TY - 4, z: SO.z - SO.d / 2 + SO.d - 70, rotationX: 90 }, ax: 0, ay: 0 });
  // ---------------------------------------------------------------- hết khối chung

  ban.diuDen(null, 0, 0.55);
  ban.diuDen(0.2, 5.8, 0);                                   // đèn sáng dần về mức thường
  var diem = function (u, v, cao) { return { x: SO.x + u, y: TY - 3 - (cao || 0), z: SO.z - SO.d / 2 + v }; };
  // trang dưới: giấy kẻ trống (trang mới); tờ trên: bản đồ (lật sang trái ở "In December")
  var to = so.themTo(trangMap({ them: chamBan(0, 0, CHAM_TRANG, 6) }), { ben: "phai" });
  // tàu giấy nhỏ đứng trên trang bản đồ
  var TAU0 = diem(345, 320), TAU1 = diem(270, 395);
  var tau = api.cut(the, 140, 130, '<g transform="translate(70 124) scale(.7)">' + api.tauBuomSVG() + "</g>", { pos: { x: TAU0.x, y: TAU0.y - 2, z: TAU0.z, rotationY: 50 }, ax: 70, ay: 124, f: api.F.AM_NHO });
  gsap.set(tau, { opacity: 0 });
  // bưu thiếp úp trên bàn: hai mặt, bản lề ở mép xa; lật nửa = nhấc mép gần lên (rotationX 90 → 138)
  // bưu thiếp úp trên bàn (mặt viết lên, như cuối d37) → Wob nhấc lên, cầm cạnh mặt cho thấy mặt tranh núi lửa → dựng nghiêng
  // trên bàn (mặt tranh ra, cùng chỗ đầu d41: x 650, z 60)
  var BT = { w: 220, h: 146 }, BP = { x: 540, z: 40 }, BD = { x: 650, z: 60 };
  var btNam = api.cut(the, 240, 170, '<g transform="translate(120 85) rotate(3)">' + api.buuThiepSVG({ w: BT.w, h: BT.h }) + "</g>", { pos: { x: BP.x, y: TY - 4, z: BP.z, rotationX: 90, scale: 0.9 }, ax: 120, ay: 85, f: api.F.AM_NHO });
  var btDung = api.cut(the, 240, 170, '<g transform="translate(120 85) rotate(-2)">' + api.buuThiepSVG({ w: BT.w, h: BT.h, mat: "tranh" }) + "</g>", { pos: { x: BD.x, y: TY, z: BD.z, rotationX: 8, scale: 0.9 }, ax: 120, ay: 160, f: api.F.AM_NHO });
  gsap.set(btDung, { opacity: 0 });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="btr" opacity="0"><g transform="scale(.8)">' + api.buuThiepSVG({ w: BT.w, h: BT.h, mat: "tranh" }) + "</g></g>");
  var btr = w.holdR.querySelector(".btr");
  // hộp phiếu + hai chồng phiếu + thẻ
  var HP = diem(240, 250);
  var hop = api.cut(the, 160, 130, '<g transform="translate(80 126)">' + api.hopPhieuSVG() + "</g>", { pos: { x: HP.x, y: HP.y, z: HP.z, scale: 0.9 }, ax: 80, ay: 126, f: api.F.AM_NHO });
  gsap.set(hop, { opacity: 0 });
  var chong = function (n) {
    var s = "";
    for (var i = 0; i < n; i++) s += '<g transform="translate(' + (30 + ((i * 7) % 5) - 2) + " " + (400 - 9 - i * 9) + ')">' + api.laPhieuSVG() + "</g>";
    return s;
  };
  var CA = diem(110, 420), CB = diem(380, 420);
  var chongCao = api.cut(the, 60, 400, chong(40), { pos: { x: CA.x, y: CA.y, z: CA.z }, ax: 30, ay: 400, f: api.F.AM_NHO });
  var chongLun = api.cut(the, 60, 400, chong(2), { pos: { x: CB.x, y: CB.y, z: CB.z }, ax: 30, ay: 400, f: api.F.AM_NHO });
  gsap.set([chongCao, chongLun], { scaleY: 0, opacity: 0 });
  var TH = diem(245, 440);
  var the148 = api.cut(the, 230, 110, fp("M 6 8 L 224 4 L 222 104 L 8 106 Z", C.PAPER, 4) + '<circle cx="20" cy="55" r="5" fill="' + C.INK + '"/>' + api.txt(122, 74, 54, 800, chu[0], C.INK), { pos: { x: TH.x, y: TH.y - 40, z: TH.z + 10, scale: 0.85 }, ax: 115, ay: 110, f: api.F.AM_NHO });
  gsap.set(the148, { opacity: 0, scale: 0 });

  // tay
  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  w.holdL.insertAdjacentHTML("beforeend", '<g class="tau-tay"><g transform="scale(.6)">' + api.tauBuomSVG() + "</g></g>");
  var tauTay = w.holdL.querySelector(".tau-tay");
  var AT = goc("L", 40, 250), hT = api.handWorld("L", AT);
  api.armSet(w, "L", AT);
  gsap.set(tauTay, api.holdPose("L", AT, hT[0], hT[1] + 18, 0));
  api.quaySet(w, -0.4);
  api.lidsSet(w, 0.35);
  gsap.set([w.pupL, w.pupR], { x: -10, y: 10 });

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 330, cy: 60, cz: -90, k: 380, rx: -22, ry: 3 });
  api.camTo(R, 0, 6.0, { k: 430, cx: 310 }, "sine.inOut");
  api.camTo(R, 6.0, 0.8, { cx: 230, cy: 90, cz: -170, k: 400, rx: -30, ry: 2 }, "power2.inOut");   // trang mới
  api.camTo(R, 6.8, 3.1, { k: 440 }, "sine.inOut");
  var tHund = tu.hundred || 10.16;
  api.camTo(R, tHund - 0.3, 0.5, { cx: 250, cy: TY - 95, cz: -100, k: 640, rx: -16, ry: 0 }, "power3.out");   // [lao-vao-can-canh]
  api.camTo(R, tHund + 0.2, DUR - tHund - 0.2, { k: 680 }, "sine.inOut");

  // ---------------------------------------------------------------- 0,15– đặt tàu giấy lên trang, đẩy nhẹ về phía nam
  var tSep = tu.september || 0.36;
  api.armTo(w, "L", 0.15, 0.4, goc("L", 30, 330), "power2.inOut");
  tl.set(tauTay, { opacity: 0 }, 0.55); tl.set(tau, { opacity: 1 }, 0.55);
  var tTw = tu.twelve || 1.15;
  tl.fromTo(tau, { x: TAU0.x, z: TAU0.z }, { x: TAU1.x, z: TAU1.z, duration: 1.1, ease: "power2.out", immediateRender: false }, tTw - 0.1);
  tl.fromTo(tau, { rotationZ: -3 }, { rotationZ: 3, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, tTw - 0.1);
  api.armTo(w, "L", tTw - 0.15, 0.2, goc("L", 10, 340), "power2.out");
  api.armTo(w, "L", tTw + 0.2, 0.35, 0, "power2.inOut");
  api.look(w, 0.2, -12, 14, 0.2);
  // "back on Tristan": quay sang bưu thiếp, lật lên một nửa
  var tBack = tu.back || 2.06;
  api.quay(w, tBack - 0.3, 0.45, 0.3);
  api.look(w, tBack - 0.25, 12, 14, 0.2);
  var PR = PIV.R.join(" "), xuong = { rotation: goc("R", 372, 380), scaleY: Math.hypot(372 - 314, 380 - 212) / 97, svgOrigin: PR };
  tl.to(w.armR, Object.assign({}, xuong, { duration: 0.28, ease: "power2.out" }), tBack - 0.25);
  var AC = goc("R", 352, 168), hC = api.handWorld("R", AC), dxC = (BT.w / 2 - 16) * 0.8;
  tl.set(btNam, { opacity: 0 }, tBack + 0.05);
  tl.set(btr, api.holdPose("R", AC, hC[0] + dxC, hC[1], -4), tBack + 0.05);
  tl.to(w.armR, { rotation: AC, scaleY: 1, svgOrigin: PR, duration: 0.3, ease: "back.out(1.4)" }, tBack + 0.05);
  tl.set(btr, { opacity: 1 }, tBack + 0.05);
  api.look(w, tBack + 0.3, 14, -2, 0.15);
  api.lids(w, tBack + 0.6, 0.45, 0.25);                      // ngẫm nghĩ nhìn mặt tranh
  api.nghieng(w, tBack + 0.6, 4, 0.4);
  // 3,7: dựng nghiêng bưu thiếp trên bàn, mặt tranh quay ra
  var tDat = 3.75, AD = goc("R", 380, 300), hD = api.handWorld("R", AD), pD = api.wobTheGioi(w, hD[0] + dxC, hD[1]);
  api.armTo(w, "R", tDat - 0.3, 0.3, AD, "power2.inOut");
  tl.to(btr, Object.assign(api.holdPose("R", AD, hD[0] + dxC, hD[1], 0), { duration: 0.3, ease: "power2.inOut" }), tDat - 0.3);
  tl.set(btr, { opacity: 0 }, tDat); tl.set(btDung, { opacity: 1 }, tDat);
  tl.fromTo(btDung, { x: pD.x, y: pD.y + 60, z: pD.z }, { x: BD.x, y: TY, z: BD.z, duration: 0.35, ease: "power2.inOut", immediateRender: false }, tDat);
  api.armTo(w, "R", tDat + 0.2, 0.35, 0, "sine.inOut");
  api.look(w, 4.2, 8, 8, 0.3);
  api.nghieng(w, 4.6, 0, 0.4);
  // ---------------------------------------------------------------- "In December…": lật trang, đặt hộp phiếu
  var tDec = tu.in || 6.21;
  api.quay(w, tDec - 0.35, -0.5, 0.25); api.look(w, tDec - 0.3, -14, 12, 0.2);
  api.lids(w, tDec - 0.3, 0.1, 0.15);
  api.armTo(w, "L", tDec - 0.25, 0.25, goc("L", 20, 320), "power2.out");
  to.lat(tDec, 0.7, "trai");
  tl.set(tau, { opacity: 0 }, tDec + 0.3);
  api.sfx("lat-giay", tDec, 0.55);
  api.armTo(w, "L", tDec + 0.05, 0.4, 120, "sine.inOut");
  api.armTo(w, "L", tDec + 0.5, 0.3, 0, "power2.inOut");
  var tHop = 7.3;
  tl.set(hop, { opacity: 1 }, tHop);
  tl.fromTo(hop, { y: HP.y - 120 }, { y: HP.y, duration: 0.3, ease: "power2.in", immediateRender: false }, tHop);
  tl.to(hop, { scaleY: 0.82, duration: 0.06, yoyo: true, repeat: 1 }, tHop + 0.3);
  api.armTo(w, "L", tHop - 0.25, 0.25, goc("L", 10, 300), "power2.out"); api.armTo(w, "L", tHop + 0.3, 0.3, 0, "power2.inOut");
  // lá phiếu rơi vào khe đúng "ballot."
  var tBal = tu.ballot || 9.22;
  var khe = { x: HP.x + 2, y: HP.y - 92 * 0.9, z: HP.z - 10 };
  [0, 1, 2].forEach(function (i) {
    var p = api.cut(the, 50, 36, '<g transform="translate(25 18)">' + api.laPhieuSVG() + "</g>", { pos: { x: khe.x, y: khe.y - 160, z: khe.z }, ax: 25, ay: 18, f: api.F.AM_NHO });
    gsap.set(p, { opacity: 0 });
    var t0 = tBal - 0.9 + i * 0.32;
    tl.set(p, { opacity: 1 }, t0);
    tl.fromTo(p, { y: khe.y - 160, rotationZ: -30 + i * 25, x: khe.x + (i - 1) * 30 }, { y: khe.y, rotationZ: 90, x: khe.x, duration: 0.32, ease: "power2.in", immediateRender: false }, t0);
    tl.set(p, { opacity: 0 }, t0 + 0.33);
  });
  api.look(w, tBal - 1.0, -14, 6, 0.2);
  // ---------------------------------------------------------------- 148 to 5
  tl.set([chongCao, chongLun], { opacity: 1 }, tHund - 0.1);
  tl.to(chongCao, { scaleY: 1, duration: 1.4, ease: "power2.out" }, tHund - 0.1);
  tl.to(chongLun, { scaleY: 1, duration: 0.25, ease: "back.out(2)" }, (tu.five || 12.4) - 0.1);
  var tForty = tu.fortyeight || 10.54;
  tl.to(the148, { opacity: 1, scale: 0.85, duration: 0.3, ease: "back.out(2)" }, tForty);
  api.sfx("ting", tForty + 0.05, 0.4);
  api.quay(w, tHund - 0.2, -0.3, 0.25);
  api.look(w, tHund, -12, -4, 0.15, 1.15); api.lids(w, tHund, 0, 0.12);
  api.look(w, (tu.five || 12.4) + 0.1, -4, 8, 0.15, 1.15);
  api.hop(w, tForty + 0.1, 8, 0.2);

  api.khauHinh(w);
  api.gatDau(w, { bo: [[10, 12]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 3.4, 0.5); api.blink(w, 8.4, 0.1);
};
