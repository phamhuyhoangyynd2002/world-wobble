/* Đoạn d07 · cắt giấy · hồi ức: trang sổ bản đồ Cape Town → Tristan (nét đứt vẽ dần, thẻ km), tàu giấy bò theo nét đứt,
   Wob tung sáu mặt trời giấy dọc đường; lịch 2026 chỉ 9 ô có tàu; boong tàu cá (quay lưng khoe ba lô nhỏ, gió giật ba lô như cờ);
   cabin: một chấm mỗi lần kim đồng hồ nhích, chấm bò khỏi trang, qua bàn, xuống sàn, Wob lót thêm tờ giấy; ô cửa sổ tròn biển xám,
   lịch nhỏ MONDAY → THURSDAY, mặt Wob bạc màu theo biển. Vào "cat", ra "chen" (sang d08 vẽ tay).
   Shot: A trang sổ + lịch (0–12,15) · B boong (12,15–14,26) · C cabin + cửa sổ (14,26–hết). Chữ: chỉ chu_tren_do_vat. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, DUR = api.DUR, K = api.K, at = TD.at, M = TD.M, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tB = T("I", 0, 12.15), tC = T("I", 1, 14.26), tSea = T("sea", 0, 23.66) - 0.2;

  // =================== A: trang sổ bản đồ + lịch ===================
  var MX = 230, MY = 120, MS = 0.75;
  var CT = [MX + 1551.7 * MS, MY + 457.3 * MS], TR = [MX + 408.4 * MS, MY + 603.9 * MS];
  var rt = api.duong([CT, [1180, 560], [900, 612], [680, 604], TR]);
  var a = '<g id="sA"><g id="sAk">';
  a += '<rect x="-600" y="-400" width="4000" height="2000" fill="#B9A27A"/><rect x="-600" y="-400" width="4000" height="2000" fill="url(#half)" opacity="0.07"/>';
  a += at(120, 70, D.journalPage(1680, 940, { seed: 7101 }));
  a += D.mapSticker("ban-do/map-tristan-route.svg", 1440, 810, { id: "map", seed: 7102 });
  a = a.replace('<g id="map">', '<g id="map" transform="translate(' + MX + "," + MY + ')">');
  a += '<path id="rtB" d="M 0 0" fill="none" stroke="#FFF8EC" stroke-width="14" stroke-linecap="round" stroke-dasharray="20 14" opacity="0.8"/>';
  a += '<path id="rt" d="M 0 0" fill="none" stroke="#C9463A" stroke-width="8" stroke-linecap="round" stroke-dasharray="20 14"/>';
  a += at(CT[0], CT[1], D.mapDot("dCT", { nhan: CH[3], ben: "tren", co: 46 }));
  a += at(TR[0], TR[1], D.mapDot("dTR", { nhan: CH[4], ben: "duoi", co: 46 }));
  // sáu mặt trời dọc đường
  var sunU = [0.13, 0.27, 0.41, 0.56, 0.71, 0.86], sunP = sunU.map(function (u) { var p = rt.at(u); return [p.x, p.y - 4]; });
  for (var i = 0; i < 6; i++) a += '<g id="sun' + i + '">' + TD.matTroi(24) + "</g>";
  // tàu giấy tí hon
  a += '<g id="tauNho">' + D.paper("M -34 0 L 34 0 L 24 14 L -24 14 Z", "#FFFDF6", { stroke: true, sw: 3.5, sx: 2, sy: 3 }) + D.line("M 0 0 L 0 -40", 3) + D.paper("M 2 -38 L 28 -6 L 2 -6 Z", "#FFFDF6", { stroke: true, sw: 3, shadow: false }) + "</g>";
  a += at(965, 812, TD.the("tKm", CH[0], 50, { seed: 7103 }));
  a += at(905, 492, TD.the("tDay", CH[1], 50, { seed: 7104 }));
  // lịch treo 2026: 13 × 4 ô tuần, chỉ 9 ô có tàu
  var LX = 1960, LY = 440, cell = 48, gap = 6;
  a += D.paper(D.rRect(LX, LY, 760, 400, 2, 7110), "#FBF5E6", { stroke: true, sw: 5, sx: 10, sy: 14 });
  a += D.paper(D.rRect(LX, LY, 760, 112, 1.5, 7111), "#C9463A", { stroke: true, sw: 5, shadow: false });
  a += D.txt(LX + 380, LY + 86, CH[2], 80, { fill: "#FFF8EC", w: 900 });
  for (var r0 = 0; r0 < 2; r0++) a += '<circle cx="' + (LX + 200 + r0 * 360) + '" cy="' + (LY - 6) + '" r="14" fill="#9AA4A6" stroke="' + D.INK + '" stroke-width="4"/>';
  var shipCells = [[1, 0], [4, 1], [6, 0], [8, 2], [10, 1], [12, 0], [3, 3], [9, 3], [11, 2]];
  for (var cy = 0; cy < 4; cy++) for (var cx = 0; cx < 13; cx++) a += '<rect x="' + (LX + 26 + cx * (cell + gap)) + '" y="' + (LY + 150 + cy * (cell + gap)) + '" width="' + cell + '" height="' + cell + '" rx="4" fill="#FFFDF6" stroke="#9DB7C2" stroke-width="3"/>';
  shipCells.forEach(function (c, j) {
    a += at(LX + 26 + c[0] * (cell + gap) + cell / 2, LY + 150 + c[1] * (cell + gap) + cell / 2 + 6, '<g id="cs' + j + '">' + D.paper("M -18 0 L 18 0 L 12 9 L -12 9 Z", "#3F6E9A", { stroke: true, sw: 2.5, shadow: false }) + D.line("M 0 0 L 0 -22", 2.5) + D.paper("M 1 -21 L 15 -4 L 1 -4 Z", "#FFFDF6", { stroke: true, sw: 2, shadow: false }) + "</g>");
  });
  var W1 = TD.wob(api, "W1", { muTrum: 0, holdR: '<g id="W1-sx">' + at(0, -20, TD.matTroi(18)) + "</g>" });
  a += W1.svg;
  a += "</g></g>";

  // =================== B: boong tàu cá ===================
  var b = '<g id="sB"><rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiXam)"/>';
  b += '<g id="sBx"><g id="sBxr">' + at(1500, 610, '<g opacity="0.85">' + TD.may(700, { seed: 7201, mau: "#D5DAD6" }) + "</g>") + at(380, 560, '<g opacity="0.8">' + TD.may(520, { seed: 7202, mau: "#CDD3CF" }) + "</g>") +
    TD.bien(api, "bB", { x0: -800, x1: 2800, y: 600, n: 4, day: 40 }) + "</g></g>";
  var deck = "";
  deck += D.paper(D.rRect(-300, 820, 2600, 500, 2, 7210), "#8E826E", { shadow: false, stroke: true, sw: 5 });
  for (var px = -300; px < 2300; px += 70) deck += D.line("M " + px + " 822 L " + (px - 60) + " 1300", 3, "#6E6352", ' opacity="0.6"');
  deck += D.paper(D.rRect(-200, 180, 640, 650, 2, 7211), "#EDEBE4", { stroke: true, sw: 6, sx: 10, sy: 10, half: 0.05 });
  deck += '<circle cx="180" cy="420" r="70" fill="#4E6670" stroke="' + D.INK + '" stroke-width="10"/><circle cx="180" cy="420" r="70" fill="none" stroke="#B9BDBE" stroke-width="5"/>' + D.line("M 150 390 L 196 360", 6, "#FFFFFF", ' opacity="0.4"');
  deck += D.paper(D.rRect(300, 470, 120, 350, 1.5, 7212), "#C9463A", { stroke: true, sw: 5, shadow: false });
  deck += D.line("M 1520 820 L 1520 -100", 18, "#3B4448") + D.line("M 1520 120 L 1900 260", 8, "#C98A3A");
  deck += at(1330, 860, '<ellipse cx="0" cy="0" rx="120" ry="34" fill="#B89A5E" stroke="' + D.INK + '" stroke-width="5"/><ellipse cx="0" cy="-6" rx="70" ry="18" fill="none" stroke="#8C7444" stroke-width="5"/><ellipse cx="0" cy="-10" rx="30" ry="8" fill="#6E5A34"/>');
  deck += at(620, 900, TD.thung(170, 7213));
  var W2 = TD.wob(api, "W2", { muTrum: 1 });
  var WL = TD.wobLung("WL");
  deck += WL + W2.svg;
  b += '<g id="sBg">' + deck + "</g>";
  var rail = "";
  for (var rx = -300; rx < 2400; rx += 180) rail += D.paper(D.rRect(rx - 12, 905, 24, 260, 1, 7220 + rx), "#9AA4A6", { stroke: true, sw: 5, sx: 6, sy: 8 });
  rail += D.paper(D.rRect(-400, 890, 3000, 34, 1.5, 7230), "#B9BDBE", { stroke: true, sw: 6, sx: 6, sy: 10 }) + D.paper(D.rRect(-400, 1010, 3000, 22, 1.5, 7231), "#9AA4A6", { stroke: true, sw: 5, shadow: false });
  b += '<g id="sBn">' + rail + "</g>";
  b += '<g id="gio" opacity="0">' + D.line("M 1900 300 C 1600 290 1400 320 1150 300 M 1950 420 C 1700 410 1500 440 1250 425 M 1880 560 C 1650 550 1460 575 1300 562", 6, "#FFFFFF", ' opacity="0.7"') + "</g>";
  b += "</g>";

  // =================== C: cabin ===================
  var c = '<g id="sC"><g id="sCk">';
  c += '<rect x="-400" y="-300" width="3400" height="1320" fill="url(#tdCabin)"/>';
  for (var wy = 160; wy < 1000; wy += 84) c += D.line("M -400 " + wy + " L 3000 " + wy, 2.5, "#9C8562", ' opacity="0.45"');
  c += D.paper(D.rRect(-400, 1000, 3400, 400, 2, 7301), "#5E4632", { shadow: false, stroke: true, sw: 5 });
  for (var fx = -400; fx < 3000; fx += 120) c += D.line("M " + fx + " 1004 L " + (fx + 40) + " 1400", 3, "#46342A", ' opacity="0.7"');
  // giường tầng
  c += D.paper(D.rRect(70, 300, 24, 700, 1, 7302), M.goToi, { stroke: true, sw: 4 }) + D.paper(D.rRect(640, 300, 24, 700, 1, 7303), M.goToi, { stroke: true, sw: 4 });
  [520, 820].forEach(function (y, j) {
    c += D.paper(D.rRect(80, y, 580, 46, 1.5, 7304 + j), M.go, { stroke: true, sw: 5 });
    c += D.paper(D.rRect(96, y - 40, 548, 44, 2, 7306 + j), "#E9E3D2", { stroke: true, sw: 4, shadow: false });
    c += D.paper(D.rRect(230, y - 46, 420, 48, 2, 7308 + j), "#B4443A", { stroke: true, sw: 4, shadow: false, half: 0.1 });
  });
  c += at(420, 776, TD.baLoNho("blGiuong"), 0.8);
  // bàn gấp + ghế đẩu
  c += D.paper("M 900 640 L 1540 640 L 1580 740 L 860 740 Z", M.goSang, { stroke: true, sw: 5, sx: 6, sy: 10 });
  c += D.paper(D.rRect(860, 740, 720, 30, 1, 7310), M.go, { stroke: true, sw: 5, shadow: false });
  c += D.paper(D.rRect(890, 770, 26, 230, 1, 7311), M.goToi, { stroke: true, sw: 4 }) + D.paper(D.rRect(1528, 770, 26, 230, 1, 7312), M.goToi, { stroke: true, sw: 4 });
  c += D.paper("M 930 728 L 1140 728 L 1140 656 L 952 662 Z", "#FBF5E6", { stroke: true, sw: 4, shadow: false }) + D.paper("M 1140 728 L 1350 728 L 1328 662 L 1140 656 Z", "#FBF5E6", { stroke: true, sw: 4, shadow: false });
  for (var ly = 672; ly < 724; ly += 14) c += D.line("M 958 " + ly + " L 1130 " + ly + " M 1150 " + ly + " L 1330 " + ly, 1.5, "#9DB7C2", ' opacity="0.6"');
  c += at(1010, 1000, D.paper(D.rRect(-80, -140, 160, 24, 1, 7313), M.go, { stroke: true, sw: 4 }) + D.line("M -66 -116 L -76 0 M 66 -116 L 76 0 M -70 -50 L 70 -50", 12, M.goToi));
  // đồng hồ treo vách
  c += at(1250, 330, TD.dongHoTreo("dh", 92));
  // cửa sổ tròn + lịch nhỏ
  var PX = 2050, PY = 400, PR = 125;
  c += '<clipPath id="pcl"><circle cx="' + PX + '" cy="' + PY + '" r="' + PR + '"/></clipPath>';
  c += '<g clip-path="url(#pcl)"><rect x="' + (PX - 200) + '" y="' + (PY - 200) + '" width="400" height="400" fill="url(#tdTroiXam)"/>' +
    '<g id="pMay">' + at(PX - 40, PY - 40, TD.may(260, { seed: 7320, mau: "#B3BBBA" })) + at(PX + 90, PY - 70, TD.may(200, { seed: 7321, mau: "#A3ACAB" })) + "</g>" +
    '<g id="pBien">' + TD.bien(api, "pB", { x0: PX - 400, x1: PX + 400, y: PY + 10, n: 4, day: 26, bien: 14, cao: 300 }) + "</g></g>";
  c += '<circle cx="' + PX + '" cy="' + PY + '" r="' + (PR + 18) + '" fill="none" stroke="#B9BDBE" stroke-width="30"/><circle cx="' + PX + '" cy="' + PY + '" r="' + (PR + 18) + '" fill="none" stroke="' + D.INK + '" stroke-width="5"/><circle cx="' + PX + '" cy="' + PY + '" r="' + (PR + 3) + '" fill="none" stroke="' + D.INK + '" stroke-width="5"/>';
  for (var bo = 0; bo < 8; bo++) { var aa = bo * Math.PI / 4; c += '<circle cx="' + D.f1(PX + Math.cos(aa) * (PR + 18)) + '" cy="' + D.f1(PY + Math.sin(aa) * (PR + 18)) + '" r="6" fill="#7E878A" stroke="' + D.INK + '" stroke-width="2"/>'; }
  c += D.line("M " + (PX - 70) + " " + (PY - 90) + " L " + (PX - 20) + " " + (PY - 110), 7, "#FFFFFF", ' opacity="0.35"');
  // lịch nhỏ: THURSDAY bên dưới, MONDAY lật lên
  var KX = 2220, KY = 300;
  c += D.paper(D.rRect(KX, KY, 300, 150, 1.5, 7330), "#FBF5E6", { stroke: true, sw: 4, sx: 5, sy: 7 }) + D.txt(KX + 150, KY + 92, CH[6], 38, { w: 900, extra: " data-layout-allow-overlap" });
  c += '<g id="lichT">' + D.paper(D.rRect(KX, KY, 300, 150, 1.5, 7331), "#FBF5E6", { stroke: true, sw: 4, shadow: false }) + D.txt(KX + 150, KY + 92, CH[5], 38, { w: 900, fill: "#2F4A6B", extra: " data-layout-allow-overlap" }) + "</g>";
  c += D.paper(D.rRect(KX + 95, KY - 14, 110, 26, 1, 7332), "#9AA4A6", { stroke: true, sw: 3.5, shadow: false });
  // chấm bút: trên trang → mép → mặt bàn → chân bàn → sàn → tờ giấy lót
  var dotPts = [];
  for (var dx0 = 1166; dx0 <= 1316; dx0 += 15) dotPts.push([dx0, 700]);
  for (var dx1 = 1352; dx1 <= 1544; dx1 += 16) dotPts.push([dx1, 700 + (dx1 - 1352) * 0.18]);
  dotPts.push([1562, 744], [1556, 778]);
  for (var dy = 800; dy <= 986; dy += 17) dotPts.push([1544, dy]);
  for (var dx2 = 1580; dx2 <= 1690; dx2 += 18) dotPts.push([dx2, 1018]);
  var nTren = 11, nDen = dotPts.length;
  dotPts.push([1752, 1018], [1792, 1016], [1832, 1014]);
  dotPts.forEach(function (p, j) { c += '<circle id="dot' + j + '" cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="#2F4A6B"/>'; });
  c += '<g id="toLot">' + D.paper("M -150 -26 L 140 -32 L 166 26 L -170 30 Z", "#FBF5E6", { stroke: true, sw: 4, sx: 3, sy: 5 }) +
    D.line("M -130 -12 L 132 -18 M -142 4 L 142 -1 M -152 18 L 150 14", 2.5, "#9DB7C2", ' opacity="0.7"') + D.line("M -112 -24 L -128 28", 2.5, "#D9776A", ' opacity="0.6"') + "</g>";
  var pen = '<g transform="rotate(-20)">' + D.line("M 0 0 L 0 -70", 10, D.INK) + D.line("M 0 0 L 0 -70", 6, "#2F4A6B") + '<path d="M -5 0 L 5 0 L 0 14 Z" fill="' + D.INK + '"/></g>';
  var W3 = TD.wob(api, "W3", { muTrum: 0, khongBaLo: true, holdR: '<g id="W3-but">' + pen + '</g><g id="W3-to2"><g transform="rotate(14)">' + D.paper("M -46 -128 L 50 -122 L 48 0 L -48 -4 Z", "#FBF5E6", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + D.line("M -36 -100 L 38 -96 M -38 -76 L 38 -72 M -38 -52 L 38 -48 M -38 -28 L 38 -24", 2.5, "#9DB7C2", ' opacity="0.8"') + "</g></g>", holdL: '<g id="W3-to">' + at(0, 0, D.paper("M -50 -6 L 50 -10 L 54 10 L -52 12 Z", "#FBF5E6", { stroke: true, sw: 3, shadow: false })) + "</g>" });
  c += at(1880, 1000, TD.thung(210, 7340)) + at(1880, 832, TD.thung(210, 7341));
  c += W3.svg;
  c += D.paper("M " + (PX - 300) + " 548 L " + (PX + 170) + " 548 L " + (PX + 180) + " 586 L " + (PX - 310) + " 586 Z", M.goSang, { stroke: true, sw: 5, sx: 4, sy: 8 });
  c += "</g></g>";

  var nhoe = api.locNhoe("nhoe", "sC", [[tSea - 0.3, tSea + 0.12, 26]]);
  api.dat(TD.defs() + ND.defs() + "<defs>" + nhoe + "</defs>" + a + b + c);
  api.noi({});
  TD.cat(api, "#sA", 0, tB); TD.cat(api, "#sB", tB, tC); TD.cat(api, "#sC", tC, null);

  // ---------- A: camera ----------
  var tLia = 7.95;
  TD.camNhom(api, [["#sAk", 1]], [[0, 960, 545, 1.0], [5.45, 975, 560, 1.06, "sine.inOut"], [5.85, 1040, 560, 1.0, "power2.inOut"], [tLia, 1060, 560, 1.02, "sine.inOut"],
    [tLia + 0.65, 2330, 650, 1.18, "power2.inOut"], [tB - 0.02, 2360, 660, 1.24, "sine.inOut"]]);
  // nét đứt vẽ dần, tàu giấy bò theo nét
  var r0t = 0.3, r1t = T("kilometres", 0, 1.56) + 0.05, s0 = T("crossing", 0, 5.81) - 0.1, s1 = T("days.", 0, 7.51) + 0.4;
  var nodes = null;
  api.moiKhung(function (t) {
    if (!api.dom) return;
    if (!nodes) nodes = [document.getElementById("rt"), document.getElementById("rtB"), document.getElementById("tauNho")];
    var u = TD.ss((t - r0t) / (r1t - r0t)), d = rt.den(u);
    nodes[0].setAttribute("d", d); nodes[1].setAttribute("d", d);
    var v = TD.ss((t - s0) / (s1 - s0)), p = rt.at(v), bob = Math.sin(t * 7) * 3;
    nodes[2].setAttribute("transform", "translate(" + p.x.toFixed(1) + "," + (p.y - 16 + bob).toFixed(1) + ") rotate(" + (Math.sin(t * 5) * 6).toFixed(1) + ")");
    nodes[2].setAttribute("opacity", t > s0 - 0.25 && t < tB ? "1" : "0");
  });
  api.pop("#dCT", 0.12, 0.25); api.pop("#dTR", r1t - 0.2, 0.25);
  api.origin("#tKm", "0 0"); api.pop("#tKm", T("miles.", 0, 4.74) - 0.24, 0.24);
  api.sfx("pop", T("miles.", 0, 4.74) - 0.12, 0.5);
  api.pop("#tDay", T("days.", 0, 7.51) - 0.24, 0.24);
  api.sfx("pop", T("days.", 0, 7.51) - 0.12, 0.45);

  // Wob ở mép phải trang tung mặt trời
  W1.set(0, { x: 2050, y: 1060, size: 0.9, op: 1 });
  W1.walk(5.15, 5.75, 2050, 1700, { step: 0.3 });
  W1.pose(5.75, 0.25, { pupX: -10, pupY: -8 }, "power2.out");
  var tosses = [5.9, 6.18, 6.46, 6.74, 7.02, 7.3];
  api.show("#W1-sx", 0, 0); api.show("#W1-sx", 5.8, 1); api.show("#W1-sx", tosses[5] + 0.05, 0);
  tosses.forEach(function (tt, j) {
    W1.pose(tt - 0.16, 0.12, { aRu: -40, aRf: 20, lean: 4 }, "power2.in");
    W1.pose(tt - 0.04, 0.1, { aRu: -150, aRf: -10, lean: -3 }, "power2.out");
    var h = W1.hand("R", tt + 0.06), sel = "#sun" + j;
    api.origin(sel, "0 0");
    api.show(sel, 0, 0); api.show(sel, tt, 1);
    TD.bayCung(api, sel, tt, tt + 0.42, h.x, h.y - 20, sunP[j][0], sunP[j][1], 120, { xoay: 220 });
    api.key(sel, "scale", 0, 1, "step"); api.key(sel, "scale", tt + 0.42, 1, "none"); api.key(sel, "scale", tt + 0.48, 1.25, "power2.out"); api.key(sel, "scale", tt + 0.62, 1, "back.out(2)");
    W1.pose(tt + 0.12, 0.12, { aRu: -60, aRf: 30, lean: 0 }, "power2.inOut");
    W1.pose(tt + 0.05, 0.15, { pupX: -12 + j * 0.5, pupY: -10 }, "power2.out");
  });
  W1.pose(tosses[5] + 0.3, 0.3, { aRu: -18, aRf: 10, pupX: -6, pupY: -4 }, "power2.inOut");
  W1.mouth(tosses[5] + 0.35, "smirk");
  // sang lịch: Wob đi theo, dò ngón tay qua hàng ô dưới cùng
  W1.walk(tLia + 0.1, tLia + 0.95, 1700, 2010, { step: 0.28 });
  W1.mouth(tLia + 0.2, "X");
  var tNine = T("nine", 0, 8.64);
  shipCells.forEach(function (cc, j) { api.pop("#cs" + j, tNine - 0.1 + j * 0.11, 0.2); api.origin("#cs" + j, "0 0"); });
  api.sfx("pop", tNine, 0.4);
  var f0 = T("from", 0, 9.45), f1t = T("schedule.", 0, 11.35) + 0.5;
  W1.pose(f0 - 0.3, 0.25, { aRu: -132, aRf: -28, pupX: 8, pupY: -10, lean: -2 }, "power2.out");
  W1.walk(f0, f1t, 2010, 2560, { step: 0.36, arms: "R" });
  W1.pose(f0, 0.01, { aRu: -132 }, "none");
  W1.pose(f1t + 0.05, 0.25, { aRu: -18, aRf: 10, pupX: 0, pupY: 0 }, "power2.inOut");
  W1.mouth(f1t, "flat");
  W1.autoBlink(0, tB, 71);

  // ---------- B: boong ----------
  TD.camNhom(api, [["#sBx", 0.35], ["#sBg", 1], ["#sBn", 1.4]], [[tB, 990, 720, 1.5], [tC, 1020, 712, 1.6, "sine.inOut"]]);
  api.origin("#sBxr", "960 600");
  api.key("#sBxr", "rotation", 0, -1.2, "step");
  for (var tr = tB; tr < tC + 1; tr += 1.1) api.key("#sBxr", "rotation", tr + 1.1, ((tr - tB) / 1.1) % 2 < 1 ? 1.4 : -1.4, "sine.inOut");
  var WX = 980, WY = 960;
  api.origin("#WL", "0 0"); api.origin("#WL-sz", "0 0"); api.origin("#WL-sq", "0 0"); api.origin("#WL-aR", "0 0"); api.origin("#WL-bl", "200 110");
  api.set("#WL", 0, { x: WX, y: WY }); api.set("#WL-sz", 0, { scale: 0.8 });
  var tSm = T("small", 0, 12.56), tTurn = T("this", 0, 13.41) - 0.35;
  api.key("#WL-aR", "rotation", 0, 0, "step"); api.key("#WL-aR", "rotation", tSm - 0.25, 0, "none"); api.key("#WL-aR", "rotation", tSm - 0.05, -150, "back.out(1.6)");
  api.key("#WL-aR", "rotation", tSm + 0.1, -136, "sine.inOut"); api.key("#WL-aR", "rotation", tSm + 0.22, -152, "sine.inOut");
  api.key("#WL-bl", "rotation", 0, 0, "step"); api.key("#WL-bl", "rotation", tSm, 0, "none"); api.key("#WL-bl", "rotation", tSm + 0.12, 5, "power2.out"); api.key("#WL-bl", "rotation", tSm + 0.4, 0, "back.out(2)");
  api.key("#WL-sq", "scaleY", 0, 1, "step"); api.key("#WL-sq", "scaleY", tB + 0.2, 1, "none"); api.key("#WL-sq", "scaleY", tSm - 0.05, 1.05, "sine.inOut"); api.key("#WL-sq", "scaleY", tTurn, 1, "sine.inOut");
  api.key("#WL-sq", "scaleX", 0, 1, "step"); api.key("#WL-sq", "scaleX", tTurn, 1, "none"); api.key("#WL-sq", "scaleX", tTurn + 0.12, 0.05, "power2.in");
  api.show("#WL", 0, 1); api.show("#WL", tTurn + 0.12, 0);
  W2.set(0, { x: WX, y: WY, size: 0.8, sx: 0.05, op: 0 });
  W2.set(tTurn + 0.12, { op: 1 });
  W2.pose(tTurn + 0.12, 0.12, { sx: 1 }, "power2.out");
  W2.pose(tTurn + 0.26, 0.22, { upY: -12, sy: 1.07, lean: -5, pupX: 4, pupY: -4 }, "back.out(1.8)");
  W2.mouth(tTurn + 0.26, "smirk");
  var tGio = T("time.", 0, 13.57) + 0.05;
  api.show("#gio", 0, 0); api.show("#gio", tGio, 1); api.show("#gio", tC, 0);
  api.key("#gio", "x", 0, 0, "step"); api.key("#gio", "x", tGio, 300, "none"); api.key("#gio", "x", tC, -500, "power1.in");
  api.key("#W2-pack", "rotation", tGio, 0, "none"); api.key("#W2-pack", "rotation", tGio + 0.12, -48, "power2.out");
  for (var fl = 0; fl < 4; fl++) api.key("#W2-pack", "rotation", tGio + 0.22 + fl * 0.1, fl % 2 ? -46 : -30, "sine.inOut");
  W2.pose(tGio + 0.05, 0.12, { upY: 0, sy: 1, lean: 9, sx: 1.03, eye: 1.15, aRu: -150, aRf: -40, pupX: 10, pupY: -6 }, "power2.out");
  W2.mouth(tGio + 0.05, "o");
  W2.shiver(tGio + 0.1, tC, 2, 16);
  api.sfx("whoosh", tGio, 0.4);
  api.origin("#W2-hUb", "200 200");
  api.key("#W2-hUb", "rotation", tGio, 0, "none"); api.key("#W2-hUb", "rotation", tGio + 0.15, -5, "sine.out"); api.key("#W2-hUb", "rotation", tGio + 0.3, 2, "sine.inOut"); api.key("#W2-hUb", "rotation", tGio + 0.45, -4, "sine.inOut");

  // ---------- C: cabin ----------
  var tCh = T("one", 0, 17.79), t3 = T("By", 0, 19.24), tOff = T("off", 0, 20.95), tTab = T("table.", 0, 22.71);
  TD.camNhom(api, [["#sCk", 1]], [[tC, 1130, 560, 1.28], [t3 - 0.05, 1190, 640, 1.48, "sine.inOut"], [t3 + 0.9, 1330, 760, 1.3, "power2.inOut"],
    [tOff + 0.4, 1520, 840, 1.25, "power2.inOut"], [tSea - 0.3, 1580, 860, 1.27, "sine.inOut"], [tSea + 0.12, 2100, 420, 1.95, "power3.out"], [DUR, 2110, 428, 2.06, "sine.inOut"]]);
  W3.set(0, { x: 1010, y: 862, size: 0.8, op: 1 });
  W3.set(0, { aRu: -70, aRf: -40, pupX: 10, pupY: 8 });
  // kim đồng hồ: nhích từng nấc, mỗi nấc một chấm
  api.origin("#dh-kimP", "0 0"); api.origin("#dh-kimG", "0 0");
  api.key("#dh-kimP", "rotation", 0, 0, "step"); api.key("#dh-kimG", "rotation", 0, 300, "step");
  var nTick = 0, tk0 = tC + 0.45;
  for (var tt2 = tk0; tt2 < t3 - 0.1 && nTick < nTren; tt2 += 0.44, nTick++) {
    api.key("#dh-kimP", "rotation", tt2, nTick * 30, "none"); api.key("#dh-kimP", "rotation", tt2 + 0.08, (nTick + 1) * 30, "back.out(3)");
    var hx = 1166 + nTick * 15;
    W3.pose(tt2 - 0.12, 0.1, { aRu: -78 - nTick * 1.4, aRf: -46 + nTick * 2.4, lean: nTick * 0.6 }, "power2.inOut");
    W3.pose(tt2, 0.06, { upY: 3 }, "power3.in"); W3.pose(tt2 + 0.06, 0.12, { upY: 0 }, "power2.out");
    api.show("#dot" + nTick, 0, 0); api.show("#dot" + nTick, tt2 + 0.04, 1);
    W3.pose(tt2 + 0.02, 0.1, { pupX: 10 + nTick * 0.3, pupY: 9 }, "power2.out");
  }
  // ngày thứ ba: kim quay nhanh, chấm tuôn khỏi trang
  var spin0 = t3, spin1 = tTab - 0.2;
  api.key("#dh-kimP", "rotation", spin0, nTick * 30, "none"); api.key("#dh-kimP", "rotation", spin1, nTick * 30 + 360 * 7, "sine.inOut");
  api.key("#dh-kimG", "rotation", spin0, 300, "none"); api.key("#dh-kimG", "rotation", spin1, 300 + 360 * 0.6, "sine.inOut");
  for (var j2 = nTren; j2 < nDen; j2++) { var tj = spin0 + 0.15 + (j2 - nTren) * ((tOff + 0.45 - spin0) / (nDen - nTren)); api.show("#dot" + j2, 0, 0); api.show("#dot" + j2, tj, 1); }
  for (var bp = spin0; bp < tOff + 0.4; bp += 0.22) { W3.pose(bp, 0.08, { upY: 3, aRf: -26 }, "power3.in"); W3.pose(bp + 0.08, 0.12, { upY: 0, aRf: -20 }, "power2.out"); }
  W3.mouth(spin0, "thang");
  // nhìn theo dãy chấm xuống sàn, dừng, rồi lót thêm tờ giấy
  W3.pose(tOff - 0.05, 0.4, { pupX: 12, pupY: 14, upRot: 6, aRu: -18, aRf: 10, lean: 0 }, "power2.inOut");
  W3.pose(tOff + 0.5, 0.2, { pupX: 4, pupY: 6, upRot: 0 }, "power2.inOut");
  W3.blinkAt(tOff + 0.62);
  var hop0 = tOff + 0.45, hop1 = hop0 + 0.34;
  api.key("#W3", "x", hop0, 1010, "none"); api.key("#W3", "x", hop1, 1230, "power1.inOut");
  api.key("#W3", "y", hop0, 862, "none"); api.key("#W3", "y", hop0 + 0.14, 820, "power2.out"); api.key("#W3", "y", hop1, 1006, "power2.in");
  W3.pose(hop1, 0.07, { sy: 0.88, sx: 1.08 }, "power2.in"); W3.pose(hop1 + 0.07, 0.2, { sy: 1, sx: 1 }, "back.out(2)");
  api.sfx("bonk", hop1, 0.3);
  api.show("#W3-to", 0, 0);
  api.show("#W3-to2", 0, 0); api.show("#W3-to2", hop1 + 0.05, 1); api.show("#W3-but", hop1 + 0.05, 0);
  W3.pose(hop1 + 0.05, 0.2, { aRu: -60, aRf: -20 }, "power2.out");
  W3.walk(hop1 + 0.15, hop1 + 0.5, 1230, 1540, { step: 0.18, arms: false });
  var tPlace = hop1 + 0.52;
  W3.pose(tPlace, 0.2, { lean: 20, upRot: 8, sy: 0.86, sx: 1.06, aRu: -40, aRf: -30, pupX: 12, pupY: 14 }, "power2.inOut");
  api.show("#W3-to2", tPlace + 0.2, 0);
  api.origin("#toLot", "0 0");
  api.key("#toLot", "x", 0, 1800, "step"); api.key("#toLot", "y", 0, 1018, "step");
  api.show("#toLot", 0, 0); api.show("#toLot", tPlace + 0.2, 1);
  api.key("#toLot", "x", tPlace + 0.2, 1760, "none"); api.key("#toLot", "x", tPlace + 0.36, 1800, "power2.out");
  api.show("#dot" + nDen, 0, 0); api.show("#dot" + nDen, tPlace + 0.45, 1);
  api.show("#dot" + (nDen + 1), 0, 0); api.show("#dot" + (nDen + 1), tPlace + 0.9, 1);
  api.show("#dot" + (nDen + 2), 0, 0); api.show("#dot" + (nDen + 2), tPlace + 1.2, 1);
  W3.pose(tPlace + 0.5, 0.2, { aRu: -46, aRf: -26, pupX: 14, pupY: 10 }, "power2.inOut");
  W3.pose(tPlace + 0.95, 0.12, { upY: -4 }, "power2.out"); W3.pose(tPlace + 1.07, 0.15, { upY: 0 }, "power2.in");
  W3.mouth(tPlace + 0.45, "smirk");
  // cửa sổ tròn: Wob tì cằm lên bậu
  var tW = tSea - 0.09;
  W3.set(tW, { x: 1880, y: 664, pupX: 11, pupY: -2, aLu: -70, aLf: -60, aRu: 70, aRf: 60, lean: 0, upRot: 0, sx: 1, sy: 1 });
  W3.mouth(tW, "thang"); api.show("#W3-but", 0, 1); api.show("#W3-but", tW, 0);
  W3.idle(tW + 0.2, DUR, { seed: 31, bien: 1.2, tho: true });
  api.show("#W3-xam", tW, 1);
  api.key("#W3-xam", "opacity", tW, 0, "none"); api.key("#W3-xam", "opacity", DUR - 0.4, 0.62, "sine.inOut");
  var tMon = T("Monday", 0, 25.16), tThu = T("Thursday", 0, 26.71), tCom = T("commitment.", 0, 28.39);
  W3.pose(tMon - 0.1, 0.4, { lid: 18, pupY: 0 }, "sine.inOut");
  W3.pose(tThu + 0.1, 0.5, { lid: 30, sy: 0.96, upY: 6 }, "sine.inOut");
  W3.mouth(tThu + 0.2, "buon");
  api.origin("#lichT", "0 300");
  api.key("#lichT", "scaleY", 0, 1, "step"); api.key("#lichT", "scaleY", tThu - 0.28, 1, "none"); api.key("#lichT", "scaleY", tThu - 0.04, 0, "power2.in");
  api.sfx("lat-giay", tThu - 0.25, 0.5);
  api.key("#pMay", "y", 0, 0, "step"); api.key("#pMay", "y", tSea, 0, "none"); api.key("#pMay", "y", DUR, 56, "sine.inOut");
  api.key("#pBien", "y", 0, 0, "step");
  for (var pb = tSea, kk = 0; pb < DUR + 1.2; pb += 1.2, kk++) api.key("#pBien", "y", pb + 1.2, (kk % 2 ? 12 : -12) - (pb > tThu ? 30 : 0), "sine.inOut");
  api.sfx("song", tSea + 0.1, 0.5);
  W3.autoBlink(tC, tSea, 73);
};
