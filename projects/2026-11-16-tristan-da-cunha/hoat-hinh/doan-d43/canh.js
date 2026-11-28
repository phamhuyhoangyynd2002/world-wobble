/* Đoạn d43 (diorama, hiện tại, 8,86 s) – nhận định của Wob. Vào cat, ra giay.
 * Sổ mở trang hình hòn đảo vẽ tay. Chùm chìa khoá giấy to nằm trên bàn bên phải.
 * "My best guess…": Wob nhìn chùm chìa khoá, "everything." đẩy nó trượt sang một bên.
 * [day-vao-cham] "It didn't have their land…": quay sang sổ, đặt bàn tay lên hình hòn đảo, nhìn xuống, gật nhẹ; camera đẩy chậm.
 * [lao-vao-hinh-ve] Sau "run." camera lao vào hòn đảo dưới tay Wob; 0,4 s cuối phủ giấy phẳng.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var WX = 400, WZ = -150, ONG_BUT;
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

  var DAO = { u: SO.w * 0.66, v: SO.d * 0.5 };
  so.themTo(api.trangNuiLuaSVG(SO.w, SO.d, { cx: DAO.u, cy: DAO.v, r: 92, seed: 43 }), { ben: "phai" });
  var dao = { x: SO.x + DAO.u, z: SO.z - SO.d / 2 + DAO.v };
  // chùm chìa khoá to nằm phẳng trên bàn
  var KC = { x: 590, z: -150 };
  var khoa = api.cut(the, 340, 340, '<g transform="translate(170 170) rotate(-20) scale(2.3)">' + api.chiaKhoaSVG() + "</g>", { pos: { x: KC.x, y: TY - 4, z: KC.z, rotationX: 90 }, ax: 170, ay: 170, f: api.F.AM_NHO });

  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  api.quaySet(w, 0.45);
  gsap.set([w.pupL, w.pupR], { x: 12, y: 12 });
  api.lidsSet(w, 0.2);

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 450, cy: 50, cz: -110, k: 430, rx: -24, ry: 2 });
  api.camTo(R, 0, 3.4, { k: 460, cx: 470 }, "sine.inOut");
  var tLand = tu.land || 4.55, tRun = tu.run || 7.57;
  api.camTo(R, 3.6, 0.9, { cx: 300, cy: 80, cz: -190, k: 470, rx: -32, ry: 0 }, "power2.inOut");
  api.camTo(R, 4.5, tRun - 4.5, { k: 560, cz: -210 }, "sine.inOut");       // đẩy chậm
  api.camTo(R, tRun + 0.12, DUR - tRun - 0.12, { cx: dao.x, cy: TY - 10, cz: dao.z, k: 1150, rx: -82, ry: 0 }, "power3.in");
  api.raGiay(null, 0.4);

  // ---------------------------------------------------------------- chùm chìa khoá
  api.look(w, 0.3, 14, 14, 0.2);
  api.nghieng(w, 0.9, 4, 0.4);
  var tEv = tu.everything || 2.96;
  api.armTo(w, "R", tEv - 0.45, 0.3, goc("R", 380, 300), "power2.out");
  tl.to(khoa, { x: KC.x + 220, z: KC.z + 30, duration: 0.5, ease: "power2.out" }, tEv - 0.1);
  api.armTo(w, "R", tEv - 0.12, 0.2, goc("R", 400, 290) - 6, "power2.out");
  api.sfx("pop", tEv - 0.05, 0.3);
  api.armTo(w, "R", tEv + 0.3, 0.35, 0, "sine.inOut");
  api.nghieng(w, tEv + 0.2, 0, 0.3);
  // ---------------------------------------------------------------- tay lên hòn đảo
  api.quay(w, 3.6, -0.45, 0.35);
  api.look(w, 3.65, -14, 14, 0.2);
  var AD = goc("L", 18, 318);
  api.armTo(w, "L", 3.9, 0.5, AD, "power2.inOut");
  api.lids(w, 4.6, 0.45, 0.4);
  // gật nhẹ hai lần ("shared between them", "say")
  [5.3, 6.6].forEach(function (t) {
    tl.to(w.talk, { y: 7, rotation: -1.5, svgOrigin: "200 290", duration: 0.18, ease: "power2.out" }, t);
    tl.to(w.talk, { y: 0, rotation: 0, svgOrigin: "200 290", duration: 0.3, ease: "sine.inOut" }, t + 0.2);
  });
  api.nghieng(w, 5.0, -3, 0.6, "sine.inOut");

  api.khauHinh(w);
  api.gatDau(w, { bo: [[5.1, DUR]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 1.6, 0.2); api.blink(w, 4.1, 0.2);
};
