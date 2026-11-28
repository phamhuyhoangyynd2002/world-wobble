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
  // hòn đảo vẽ tay (duyệt 6a: bản cũ đọc như miệng có răng): nón núi có đường đồng mức xanh → nâu, miệng núi nhỏ lệch,
  // mây lệch lên đỉnh, một cụm nhà nhỏ trên dải bằng phía bắc; biển gợn quanh
  var veDao = function (cx, cy, R) {
    var s = "", vong = function (k, lech) {
      var d = "", n = 30;
      for (var i = 0; i <= n; i++) { var a = i / n * Math.PI * 2, q = R * k * (1 + 0.08 * Math.sin(a * 3 + 1.3) + 0.05 * Math.sin(a * 5 + 0.4));
        d += (i ? " L " : "M ") + (cx + lech[0] * (1 - k) + q * Math.cos(a)).toFixed(1) + " " + (cy + lech[1] * (1 - k) + q * Math.sin(a) * 0.9).toFixed(1); }
      return d + " Z";
    };
    s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (R * 1.55) + '" ry="' + (R * 1.4) + '" fill="#9fc7d3" opacity=".5"/>';
    [[-1.3, -1.05], [0.6, -1.25], [1.15, 0.6], [-1.2, 0.8], [0.1, 1.25]].forEach(function (b) { s += sk("M " + (cx + b[0] * R - 22) + " " + (cy + b[1] * R) + " q 11 -7 22 0 t 22 0", 2.6, "#4f8fa8", ' opacity=".7"'); });
    var mau = ["#8fb06a", "#a3b46e", "#b5a678", "#a08a66", "#8a7458"], LECH = [-10, 12];
    [1, 0.78, 0.58, 0.4, 0.24].forEach(function (k, i) { s += fp(vong(k, LECH), mau[i], i ? 2.5 : 4.5); });
    s += '<ellipse cx="' + (cx - 10 + 7) + '" cy="' + (cy + 12 - 6) + '" rx="' + (R * 0.09) + '" ry="' + (R * 0.07) + '" fill="#4a3d2c" stroke="' + C.INK + '" stroke-width="2.5"/>';
    // mây lệch lên phía trên bên phải đỉnh
    var mx = cx + R * 0.18, my = cy - R * 0.22;
    s += fp("M " + (mx - 34) + " " + my + " c 0 -18 22 -24 32 -12 c 8 -16 38 -12 38 6 c 14 0 14 22 0 22 l -60 0 c -14 0 -16 -16 -10 -16 Z", "#fbfbf6", 3);
    // cụm nhà nhỏ trên dải bằng phía bắc (mép trên đảo, lệch tây)
    for (var h = 0; h < 5; h++) {
      var hx = cx - R * 0.55 + h * 15 + (h % 2) * 3, hy = cy - R * 0.74 + (h % 2) * 7;
      s += fp("M " + hx + " " + (hy + 9) + " L " + hx + " " + hy + " L " + (hx + 6) + " " + (hy - 6) + " L " + (hx + 12) + " " + hy + " L " + (hx + 12) + " " + (hy + 9) + " Z", h % 2 ? "#f7f2e4" : "#e8d9b8", 1.8);
    }
    return s;
  };
  so.themTo(veDao(DAO.u, DAO.v, 100), { ben: "phai" });
  // lời mới 29/11: trang LÀNG nhỏ vẽ tay (mái còn nguyên) nằm trên trang đảo; trên cùng là trang bản đồ (lật đi ở đầu đoạn)
  var NHA = [[176, 340], [232, 296], [290, 336], [342, 292], [396, 336]];
  var veLang = function () {
    var s = sk("M 150 420 C 240 400 330 430 470 410", 3, "#4f8fa8", ' opacity=".6"') + sk("M 170 450 q 14 -8 28 0 t 28 0 M 330 456 q 14 -8 28 0 t 28 0", 2.4, "#4f8fa8", ' opacity=".6"');
    s += sk("M 140 386 C 220 378 320 390 440 380", 4, "#c9b48a");                          // đường làng
    s += fp("M 120 262 C 150 206 240 196 290 216 C 340 186 420 200 450 244 L 450 262 Z", "#a3b46e", 3, ' opacity=".7"');   // sườn núi sau làng
    NHA.forEach(function (h, i) {
      var x = h[0], y = h[1], a = 25, b = 30;
      s += fp("M " + (x - a) + " " + (y + b) + " L " + (x - a) + " " + y + " L " + (x + a) + " " + y + " L " + (x + a) + " " + (y + b) + " Z", i % 2 ? "#f7f2e4" : "#e8d9b8", 3);
      s += '<g class="mai mai-' + i + '">' + fp("M " + (x - a - 8) + " " + (y + 3) + " L " + x + " " + (y - 28) + " L " + (x + a + 8) + " " + (y + 3) + " Z", i % 2 ? "#8a5a3b" : "#a8754f", 3) + "</g>";
      s += '<rect x="' + (x - 6) + '" y="' + (y + 13) + '" width="12" height="17" fill="#6b4a33"/>';
    });
    return s;
  };
  var toLang = so.themTo(veLang(), { ben: "phai", sau: "" });
  var toMap = so.themTo(trangMap({ them: chamBan(0, 0, CHAM_TRANG, 6) }), { ben: "phai" });
  gsap.set(toLang.el, { z: 5 + so.lop.length }); gsap.set(toMap.el, { z: 6 + so.lop.length });
  var mai = function (i) { return toLang.truoc.querySelector(".mai-" + i); };
  var dao = { x: SO.x + DAO.u, z: SO.z - SO.d / 2 + DAO.v };
  // chùm chìa khoá to nằm phẳng trên bàn
  var KC = { x: 530, z: -140 };
  var khoa = api.cut(the, 340, 340, '<g transform="translate(170 170) rotate(-20) scale(2.3)">' + api.chiaKhoaSVG() + "</g>", { pos: { x: KC.x, y: TY - 4, z: KC.z, rotationX: 90 }, ax: 170, ay: 170, f: api.F.AM_NHO });

  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  api.quaySet(w, -0.45);
  gsap.set([w.pupL, w.pupR], { x: -12, y: 12 });
  api.lidsSet(w, 0.2);
  var PL = PIV.L.join(" "), PR = PIV.R.join(" ");
  var trongWob = function (X, Z) { return [200 + (X - w.x) / 0.9, 400 + (Z - w.z) / 0.9 * 0.55 - 30]; };
  var vuoi = function (side, q) { var P = PIV[side]; return { rotation: goc(side, q[0], q[1]), scaleY: Math.max(1, Math.hypot(q[0] - P[0], q[1] - P[1]) / 97), svgOrigin: P.join(" ") }; };
  var diemTrang = function (u, v) { return { x: SO.x + u, z: SO.z - SO.d / 2 + v }; };

  // ---------------------------------------------------------------- camera
  var tLand = tu.land || 10.51, tRun = tu.run || 13.54, tEv = tu.everything || 8.93, tRest = tu.rest || 6.19;
  api.camSet(R, null, { cx: 250, cy: 75, cz: -180, k: 440, rx: -32, ry: 0 });
  api.camTo(R, 0, 5.7, { k: 510, cz: -200, cx: 270 }, "sine.inOut");                                   // đẩy chậm vào trang làng
  api.camTo(R, 5.75, 0.8, { cx: 450, cy: 50, cz: -110, k: 440, rx: -24, ry: 2 }, "power2.inOut");   // sang chùm chìa
  api.camTo(R, 6.55, 9.2 - 6.55, { k: 465, cx: 470 }, "sine.inOut");
  api.camTo(R, 9.25, 0.9, { cx: 300, cy: 80, cz: -190, k: 470, rx: -32, ry: 0 }, "power2.inOut");
  api.camTo(R, 10.15, tRun - 10.15, { k: 560, cz: -210 }, "sine.inOut");                    // đẩy chậm
  api.camTo(R, tRun + 0.12, DUR - tRun - 0.12, { cx: dao.x, cy: TY - 10, cz: dao.z, k: 1150, rx: -82, ry: 0 }, "power3.in");
  api.raGiay(null, 0.4);

  // ---------------------------------------------------------------- 0,2 lật sổ về trang làng; chạm từng mái, gật chậm
  api.armTo(w, "L", 0.1, 0.3, goc("L", 10, 300), "power2.out");
  toMap.lat(0.3, 0.7, "trai");
  api.sfx("lat-giay", 0.3, 0.55);
  api.armTo(w, "L", 0.45, 0.4, 0, "sine.inOut");
  api.look(w, 0.9, -14, 16, 0.2);
  var tCham = [tu.scientists || 1.65, tu.found || 2.38, tu.village || 2.81, tu.standing || 3.42];
  [1, 2, 3, 4].forEach(function (k, i) {
    var n = NHA[k], p = diemTrang(n[0], n[1] - 8), q = trongWob(p.x, p.z), t = tCham[i];
    tl.to(w.armL, Object.assign(vuoi("L", q), { duration: 0.22, ease: "power2.inOut" }), t - 0.22);
    tl.to(mai(k), { y: 3, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.inOut" }, t);
    api.look(w, t - 0.15, -14 + i * 3, 16, 0.12);
  });
  tl.to(w.armL, { rotation: 0, scaleY: 1, svgOrigin: PL, duration: 0.35, ease: "sine.inOut" }, 3.9);
  api.lids(w, 3.9, 0.45, 0.3);
  [4.3, 5.05].forEach(function (t) {
    tl.to(w.talk, { y: 8, rotation: 0, svgOrigin: "200 290", duration: 0.28, ease: "sine.inOut" }, t);
    tl.to(w.talk, { y: 0, svgOrigin: "200 290", duration: 0.32, ease: "sine.inOut" }, t + 0.3);
  });
  // ---------------------------------------------------------------- "The rest is my guess…": chùm chìa
  api.quay(w, tRest - 0.3, 0.45, 0.3); api.lids(w, tRest - 0.2, 0.2, 0.2);
  api.look(w, tRest - 0.25, 14, 14, 0.2);
  api.nghieng(w, tRest + 0.6, 4, 0.4);
  tl.to(w.armR, Object.assign(vuoi("R", [292, 388]), { duration: 0.3, ease: "power2.out" }), tEv - 0.5);   // chạm vòng chìa 0,4 s
  tl.to(khoa, { x: KC.x + 170, z: KC.z + 24, duration: 0.5, ease: "power2.out" }, tEv - 0.1);
  tl.to(w.armR, Object.assign(vuoi("R", [446, 392]), { duration: 0.3, ease: "power2.out" }), tEv - 0.1);   // tay đi theo chùm chìa
  api.sfx("pop", tEv - 0.05, 0.3);
  tl.to(w.armR, { rotation: 0, scaleY: 1, svgOrigin: PR, duration: 0.35, ease: "sine.inOut" }, tEv + 0.3);
  api.nghieng(w, tEv + 0.2, 0, 0.3);
  // ---------------------------------------------------------------- lật trang làng → hình đảo, tay lên đảo
  api.quay(w, 9.2, -0.45, 0.35);
  api.look(w, 9.25, -14, 14, 0.2);
  api.armTo(w, "L", 9.2, 0.25, goc("L", 10, 300), "power2.out");
  toLang.lat(9.4, 0.7, "trai");
  api.sfx("lat-giay", 9.4, 0.5);
  var AD = goc("L", 18, 318);
  api.armTo(w, "L", 9.75, 0.45, AD, "power2.inOut");
  api.lids(w, tLand + 0.1, 0.45, 0.4);
  [11.3, 12.6].forEach(function (t) {
    tl.to(w.talk, { y: 7, rotation: -1.5, svgOrigin: "200 290", duration: 0.18, ease: "power2.out" }, t);
    tl.to(w.talk, { y: 0, rotation: 0, svgOrigin: "200 290", duration: 0.3, ease: "sine.inOut" }, t + 0.2);
  });
  api.nghieng(w, 11.0, -3, 0.6, "sine.inOut");

  api.khauHinh(w);
  api.gatDau(w, { bo: [[1.3, 5.8], [11.0, DUR]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 0.6, 0.2); api.blink(w, 7.2, 0.2);
};
