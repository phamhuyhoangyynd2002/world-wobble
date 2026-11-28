/* Đoạn d30 · cắt giấy · tháng 8: tới trung tâm mới.
   1 trang sổ map-kiruna-centre: Wob tí hon đeo ba lô đi theo nét đứt Old centre → New centre (approx.), thẻ "~3 km east" ở "three".
   2 phố hè cỏ xanh, đi bộ thị sai. 3 quảng trường mới, dây cờ giấy, thẻ "Sept 2022" ở "September"; gag: nhặt mẩu hoa giấy sót, ngắm, bỏ túi gi-lê.
   4 Kristallen (toà tròn kính và đá, không chữ) lấp lánh, mặt kính phản chiếu Wob tí hon, kính râm loé (ting). 5 Wob chắp tay đi một vòng quanh toà nhà.
   6 lướt sang tháp đồng hồ khung sắt (chỉ kim, vạch), Wob ngửa cổ. 7 Wob bé tí dưới chân tháp. 8 đồng hồ quả quýt chạy nhanh, Wob lặng lẽ vặn lại;
   kim phút tháp nhích một nấc đúng "minute.", giữ tới cắt. Vào "cat", ra "chen". Chữ: chỉ chu_tren_do_vat. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tThree = T("three", 0, 1.8), tGoing = T("going.", 0, 3.725), tThe = T("the", 0, 4.438), tSep = T("september", 0, 5.588), tParty = T("party.", 0, 7.713),
    tHall = T("the", 1, 8.475), tKris = T("kristallen,", 0, 10.613), tIt = T("it", 0, 12.863), tNext = T("next", 0, 15.188), tStood = T("i", 1, 19.75),
    tClock = T("the", 5, 21.087), tMin = T("minute.", 0, 23.325);
  var t1 = tGoing - 0.45, t2 = tThe - 0.04;

  // =================== quảng trường (lớp có thị sai) ===================
  var G = 900;
  var troi = '<rect x="-800" y="-800" width="3600" height="2600" fill="url(#krHe)"/>' + at(300, 120, KR.may(260, 3001)) + at(1300, 60, KR.may(220, 3002)) + at(2200, 150, KR.may(240, 3003));
  var xa = KR.nuiXa(-900, 2900, 760, 110, "#B7C9B0", 3011) + '<rect x="-900" y="756" width="3800" height="900" fill="' + M.coSang + '"/>';
  [[-300, 0], [-60, 2], [2050, 4], [2300, 1], [2560, 5]].forEach(function (n, i) { xa += at(n[0], 770, KR.nhaGo({ w: 200, h: 220, mau: M.nha[n[1]], mai: M.mai[i % 3], sd: 3020 + i * 7 }), 0.9); });
  var gi = '<rect x="-900" y="' + (G - 40) + '" width="3800" height="900" fill="#CFC6B4"/>';
  for (var px = -900; px < 2900; px += 90) gi += line("M " + px + " " + (G - 36) + " L " + (px - 60) + " " + (G + 300), 3, "#B6AC98", ' opacity="0.7"');
  for (var py = G - 10; py < G + 300; py += 46) gi += line("M -900 " + py + " L 2900 " + py, 2.5, "#B6AC98", ' opacity="0.6"');
  // Kristallen: toà tròn, dải kính xen dải đá, mái phẳng elip; KHÔNG chữ
  var KX = 900, KW = 760, KH = 360, ky = G - 40;
  var kr = '<g id="kris">';
  kr += '<ellipse cx="' + KX + '" cy="' + ky + '" rx="' + (KW / 2 + 30) + '" ry="40" fill="#000" opacity="0.12"/>';
  kr += paper("M " + (KX - KW / 2) + " " + (ky - KH) + " L " + (KX + KW / 2) + " " + (ky - KH) + " L " + (KX + KW / 2) + " " + ky + " C " + (KX + KW / 2) + " " + (ky + 40) + " " + (KX - KW / 2) + " " + (ky + 40) + " " + (KX - KW / 2) + " " + ky + " Z", "#9E9A90", { stroke: true, sw: 5, sx: 6, sy: 8 });
  for (var b = 0; b < 3; b++) {
    var by = ky - KH + 30 + b * 110;
    kr += '<path d="M ' + (KX - KW / 2 + 6) + " " + by + " L " + (KX + KW / 2 - 6) + " " + by + " L " + (KX + KW / 2 - 6) + " " + (by + 72) + " C " + (KX + KW / 4) + " " + (by + 92) + " " + (KX - KW / 4) + " " + (by + 92) + " " + (KX - KW / 2 + 6) + " " + (by + 72) + ' Z" fill="url(#krKinh)" stroke="' + INK + '" stroke-width="3.5"/>';
    for (var mx = -5; mx <= 5; mx++) kr += line("M " + (KX + mx * 64) + " " + by + " L " + (KX + mx * 64) + " " + (by + 72 + 18 * Math.cos(mx / 6)), 2.5, "#4A6474", ' opacity="0.7"');
  }
  kr += paper("M " + (KX - KW / 2 - 20) + " " + (ky - KH) + " C " + (KX - KW / 2 - 20) + " " + (ky - KH - 50) + " " + (KX + KW / 2 + 20) + " " + (ky - KH - 50) + " " + (KX + KW / 2 + 20) + " " + (ky - KH) + " C " + (KX + KW / 2 + 20) + " " + (ky - KH + 30) + " " + (KX - KW / 2 - 20) + " " + (ky - KH + 30) + " " + (KX - KW / 2 - 20) + " " + (ky - KH) + " Z", "#7E7A72", { stroke: true, sw: 5, shadow: false });
  kr += line("M " + (KX - 300) + " " + (ky - KH + 50) + " L " + (KX - 220) + " " + (ky - KH + 130) + " M " + (KX + 120) + " " + (ky - KH + 160) + " L " + (KX + 200) + " " + (ky - KH + 240), 8, "#FFFFFF", ' opacity="0.45"');
  kr += paper(rRect(KX - 60, ky - 120, 120, 120, 1.2, 3031), "url(#krKinh)", { stroke: true, sw: 4, shadow: false }) + line("M " + KX + " " + (ky - 120) + " L " + KX + " " + ky, 3);
  // phản chiếu Wob tí hon trong kính (nhóm id "phan")
  var Wr = KR.wob(api, "Wr", { mua: "he", kinh: 1 });
  kr += '<g id="phan" opacity="0.5">' + Wr.svg + "</g>";
  var lap = [];
  [[KX - 240, ky - KH + 70], [KX + 180, ky - KH + 190], [KX - 60, ky - KH + 300], [KX + 300, ky - KH + 60], [KX - 330, ky - KH + 260]].forEach(function (q, i) {
    kr += '<g id="lap' + i + '">' + at(q[0], q[1], D.sparkle(34, "#FFF8D8")) + "</g>"; lap.push("#lap" + i);
  });
  kr += "</g>";
  gi += kr;
  // tháp đồng hồ khung sắt cũ (chỉ kim, vạch; KHÔNG số)
  var TX = 1720, TOP = 90, CLY = 230, CR = 84;
  var th = "";
  th += line("M " + (TX - 90) + " " + G + " L " + (TX - 50) + " " + (TOP + 60) + " M " + (TX + 90) + " " + G + " L " + (TX + 50) + " " + (TOP + 60), 16) + line("M " + (TX - 90) + " " + G + " L " + (TX - 50) + " " + (TOP + 60) + " M " + (TX + 90) + " " + G + " L " + (TX + 50) + " " + (TOP + 60), 9, "#4A5450");
  for (var ty = G - 80; ty > CLY + 100; ty -= 110) {
    var w0 = 90 - (G - ty) * (40 / (G - TOP - 60)), w1 = 90 - (G - ty + 110) * (40 / (G - TOP - 60));
    th += line("M " + f1(TX - w0) + " " + ty + " L " + f1(TX + w1) + " " + (ty - 110) + " M " + f1(TX + w0) + " " + ty + " L " + f1(TX - w1) + " " + (ty - 110) + " M " + f1(TX - w0) + " " + ty + " L " + f1(TX + w0) + " " + ty, 6, "#4A5450");
  }
  th += paper("M " + (TX - 70) + " " + (TOP + 60) + " L " + TX + " " + TOP + " L " + (TX + 70) + " " + (TOP + 60) + " Z", "#3E4644", { stroke: true, sw: 5, shadow: false });
  th += line("M " + TX + " " + TOP + " L " + TX + " " + (TOP - 40), 6);
  th += '<circle cx="' + TX + '" cy="' + CLY + '" r="' + (CR + 14) + '" fill="#3E4644" stroke="' + INK + '" stroke-width="5"/><circle cx="' + TX + '" cy="' + CLY + '" r="' + CR + '" fill="#F4EEDC" stroke="' + INK + '" stroke-width="4"/>';
  for (var v = 0; v < 60; v++) { var aa = v * 6 * Math.PI / 180, r0 = v % 5 ? CR - 8 : CR - 18; th += line("M " + f1(TX + Math.sin(aa) * r0) + " " + f1(CLY - Math.cos(aa) * r0) + " L " + f1(TX + Math.sin(aa) * (CR - 3)) + " " + f1(CLY - Math.cos(aa) * (CR - 3)), v % 5 ? 2 : 5); }
  th += '<g id="kimGio">' + line("M " + TX + " " + CLY + " L " + TX + " " + (CLY - 44), 9) + "</g>";
  th += '<g id="kimPhut">' + line("M " + TX + " " + (CLY + 10) + " L " + TX + " " + (CLY - 70), 6) + "</g>";
  th += '<circle cx="' + TX + '" cy="' + CLY + '" r="8" fill="' + INK + '"/>';
  gi += th;
  // cột đèn mới + dây cờ giấy
  [[300, 0], [1460, 1], [2150, 2]].forEach(function (c) {
    gi += at(c[0], G, line("M 0 0 L 0 -470", 14) + line("M 0 0 L 0 -470", 8, "#5A6260") + line("M 0 -470 C 0 -500 40 -510 60 -496", 8) + '<ellipse cx="62" cy="-490" rx="22" ry="10" fill="#FFF0C0" stroke="' + INK + '" stroke-width="3"/>');
  });
  function dayCo(id, x0, x1, y0, sag, sd) {
    var s = '<g id="' + id + '">' + line("M " + x0 + " " + y0 + " Q " + ((x0 + x1) / 2) + " " + (y0 + sag * 2) + " " + x1 + " " + y0, 3, "#6A5A48"), n = Math.round((x1 - x0) / 56);
    for (var i = 1; i < n; i++) {
      var u = i / n, x = x0 + (x1 - x0) * u, y = y0 + 4 * sag * u * (1 - u);
      s += at(x, y, paper("M -18 0 L 18 0 L 0 34 Z", ["#C9463A", "#E2C46A", "#3F6E9A", "#5E8E6A", "#EFE3C8"][(i + sd) % 5], { stroke: true, sw: 2.5, shadow: false }));
    }
    return s + "</g>";
  }
  gi += dayCo("co1", 300, 1460, 440, 70, 1) + dayCo("co2", 1460, 2150, 440, 50, 3);
  // hoa giấy sót trên mặt đá; mẩu "hg" là mẩu Wob nhặt
  var HGX = 470;
  [[200, 930, "#C9463A", 20], [380, 960, "#3F6E9A", -30], [620, 940, "#E2C46A", 40], [1150, 975, "#5E8E6A", 10], [1340, 935, "#C9463A", -15], [1880, 955, "#E2C46A", 25]].forEach(function (q) {
    gi += at(q[0], q[1], paper(rRect(-10, -7, 20, 14, 1, 3040 + q[0]), q[2], { stroke: true, sw: 2, shadow: false }), 1, q[3]);
  });
  gi += '<g id="hg">' + at(HGX, 948, paper(rRect(-11, -8, 22, 16, 1, 3049), "#D97A9A", { stroke: true, sw: 2.5, shadow: false }), 1, -12) + "</g>";
  var hgTay = '<g id="hgT"><g transform="translate(0,-6) rotate(-12)">' + paper(rRect(-16, -12, 32, 24, 1, 3050), "#D97A9A", { stroke: true, sw: 3, shadow: false }) + "</g></g>";
  var dq = '<g id="dq">' + line("M 0 -30 C -14 -50 10 -60 4 -76", 3, "#C9A24A") + '<circle cx="0" cy="0" r="30" fill="#C9A24A" stroke="' + INK + '" stroke-width="4"/><circle cx="0" cy="0" r="22" fill="#FBF5E4" stroke="' + INK + '" stroke-width="2"/>' +
    '<rect x="-5" y="-40" width="10" height="10" fill="#C9A24A" stroke="' + INK + '" stroke-width="2"/>' + line("M 0 0 L 0 -16", 3) + line("M 0 0 L 10 4", 3) + "</g>";
  gi += '<g id="tSep">' + at(760, 560, KR.the("tSepi", CH[3], 52, { seed: 3045 })) + "</g>";
  var W = KR.wob(api, "W", { mua: "he", chum: "kr", holdR: hgTay + dq });
  gi += W.svg;
  var gan = at(-200, 1100, paper("M -300 0 L -260 -80 L 200 -70 L 260 0 Z", "#B6AC98", { shadow: false }));

  // =================== 1: trang sổ bản đồ ===================
  var MX = 230, MY = 120, MS = 0.75;
  var OLD = [MX + 556.8 * MS, MY + 576 * MS], NEW = [MX + 1305.6 * MS, MY + 362.4 * MS];
  var rt = api.duong([OLD, [OLD[0] + 160, OLD[1] + 40], [OLD[0] + 360, OLD[1] - 10], [NEW[0] - 160, NEW[1] + 60], NEW]);
  var s1 = '<g id="s1"><g id="s1k">';
  s1 += '<rect x="-600" y="-400" width="3200" height="2000" fill="#B9A27A"/><rect x="-600" y="-400" width="3200" height="2000" fill="url(#half)" opacity="0.07"/>';
  s1 += at(120, 70, D.journalPage(1680, 940, { seed: 3060 }));
  s1 += D.mapSticker("ban-do/map-kiruna-centre.svg", 1440, 810, { id: "map", seed: 3061 }).replace('<g id="map">', '<g id="map" transform="translate(' + MX + "," + MY + ')">');
  s1 += KR.phacMap(OLD, NEW, 3069);
  s1 += '<path d="' + rt.d + '" fill="none" stroke="#FFF8EC" stroke-width="14" stroke-linecap="round" stroke-dasharray="20 14" opacity="0.85"/>';
  s1 += '<path d="' + rt.d + '" fill="none" stroke="#A8322A" stroke-width="7" stroke-linecap="round" stroke-dasharray="20 14"/>';
  s1 += at(OLD[0], OLD[1], D.mapDot("dOld", { nhan: CH[0], ben: "trai", co: 50, mau: "#B8BDC2", seed: 3062 }));
  s1 += at(NEW[0], NEW[1], D.mapDot("dNew", { nhan: CH[1], ben: "tren", co: 50, seed: 3063 }));
  var Wm = KR.wob(api, "Wm", { mua: "he" });
  s1 += '<g id="wmG">' + Wm.svg + "</g>";
  s1 += '<g id="t3km">' + at(1180, 770, KR.the("t3kmi", CH[2], 50, { seed: 3064 })) + "</g>";
  s1 += "</g></g>";

  // =================== 2: phố hè, đi bộ thị sai ===================
  var s2 = '<g id="s2"><rect x="-600" y="-400" width="3200" height="2000" fill="url(#krHe)"/>';
  s2 += '<g id="s2xa">' + KR.nuiXa(-600, 3200, 640, 120, "#B7C9B0", 3070) + '<rect x="-600" y="636" width="3800" height="600" fill="' + M.coSang + '"/></g>';
  var nh2 = "";
  for (var n2 = 0; n2 < 12; n2++) nh2 += at(-200 + n2 * 260, 780, KR.nhaGo({ w: 210, h: 170, mau: M.nha[(n2 * 5) % 6], mai: M.mai[n2 % 3], sd: 3080 + n2 * 5 }), 0.95);
  s2 += '<g id="s2gi">' + nh2 + '<rect x="-600" y="776" width="3800" height="600" fill="' + M.co + '"/>' + paper(rRect(-600, 860, 3800, 220, 2, 3095), "#CFC8BA", { shadow: false }) + "</g>";
  var Ws = KR.wob(api, "Ws", { mua: "he", chum: "kr" });
  s2 += Ws.svg;
  var hr = "";
  for (var f = 0; f < 30; f++) hr += at(-400 + f * 130, 1080, line("M 0 0 L 0 -150", 18) + line("M 0 0 L 0 -150", 11, M.goSang) + line("M -70 -110 L 70 -110 M -70 -50 L 70 -50", 11) + line("M -70 -110 L 70 -110 M -70 -50 L 70 -50", 6, M.goSang));
  s2 += '<g id="s2gan">' + hr + "</g></g>";

  // =================== đồng hồ phóng to (bong bóng giấy) ===================
  var BX = 560, BY = 520, BR = 190;
  var bb = '<g id="bong">' + paper("M " + (BX + 120) + " " + (BY + 140) + " L " + (BX + 330) + " " + (BY + 300) + " L " + (BX + 160) + " " + (BY + 90) + " Z", "#FFF8EC", { stroke: true, sw: 4, shadow: false });
  bb += '<circle cx="' + BX + '" cy="' + BY + '" r="' + BR + '" fill="#FFF8EC" stroke="' + INK + '" stroke-width="6"/>';
  bb += '<rect x="' + (BX - 22) + '" y="' + (BY - 162) + '" width="44" height="34" rx="6" fill="#C9A24A" stroke="' + INK + '" stroke-width="4"/>';
  bb += '<circle cx="' + BX + '" cy="' + BY + '" r="132" fill="#C9A24A" stroke="' + INK + '" stroke-width="6"/><circle cx="' + BX + '" cy="' + BY + '" r="112" fill="#FBF5E4" stroke="' + INK + '" stroke-width="4"/>';
  for (var v2 = 0; v2 < 60; v2++) { var a2 = v2 * 6 * Math.PI / 180, q0 = v2 % 5 ? 100 : 88; bb += line("M " + f1(BX + Math.sin(a2) * q0) + " " + f1(BY - Math.cos(a2) * q0) + " L " + f1(BX + Math.sin(a2) * 108) + " " + f1(BY - Math.cos(a2) * 108), v2 % 5 ? 2.5 : 6); }
  bb += '<g id="dqGio">' + line("M " + BX + " " + BY + " L " + BX + " " + (BY - 58), 11) + "</g>";
  bb += '<g id="dqPhut">' + line("M " + BX + " " + (BY + 12) + " L " + BX + " " + (BY - 92), 7) + "</g>";
  bb += '<circle cx="' + BX + '" cy="' + BY + '" r="10" fill="' + INK + '"/>';
  bb += '<g id="ngonV"><circle cx="' + (BX + 34) + '" cy="' + (BY - 150) + '" r="26" fill="' + INK + '"/>' + line("M " + (BX + 34) + " " + (BY - 150) + " L " + (BX + 160) + " " + (BY - 230), 30) + line("M " + (BX + 34) + " " + (BY - 150) + " L " + (BX + 160) + " " + (BY - 230), 18, "#5a9fb8") + "</g>";
  bb += "</g>";

  api.dat(KR.defs() + troi + api.lop("xa", xa, 0.4, { mat: 760 }) + api.lop("giua", gi, 1, { mat: G }) + api.lop("gan", gan, 1.3, { mat: 1080 }) + s2 + s1 + bb);
  api.noi({});
  api.show("#hg", 0, 1);

  // =================== 1 ===================
  KR.cat(api, "#s1", 0, t1);
  KR.camNhom(api, [["#s1k", 1]], [[0, 900, 520, 1.2], [t1, 930, 500, 1.27, "sine.inOut"]]);
  var c0 = 0.35, c1 = t1 - 0.25, N = 24;
  api.origin("#wmG", "0 0");
  Wm.set(0, { x: 0, y: 0, size: 0.16, pupX: 12, pupY: -6 });
  for (var s = 0; s <= N; s++) {
    var u = s / N, tt = c0 + (c1 - c0) * u, pp = rt.at(u);
    api.key("#wmG", "x", tt, pp.x, s ? "none" : undefined); api.key("#wmG", "y", tt, pp.y + 6, s ? "none" : undefined);
  }
  Wm.walk(c0, c1, 0, 0, { step: 0.2 });
  Wm.mouth(0, "smile");
  api.pop("#t3km", tThree - 0.06, 0.24);
  api.origin("#t3km", "1180 770");

  // =================== 2 ===================
  KR.cat(api, "#s2", t1, t2);
  Ws.set(0, { x: 760, y: 985, size: 0.6, pupX: 14, pupY: -4 });
  Ws.mouth(0, "smile");
  Ws.walk(t1, t2, 760, 900, { step: 0.26 });
  [["#s2xa", -50], ["#s2gi", -220], ["#s2gan", -520]].forEach(function (q) { api.key(q[0], "x", 0, 0); api.key(q[0], "x", t1, 0, "none"); api.key(q[0], "x", t2, q[1], "none"); });

  // =================== quảng trường: camera ===================
  var tVong = tIt + 0.05, tLuot = tNext + 0.1;
  api.camera([[0, 560, 640, 1.3], [t2, 560, 640, 1.3, "none"], [tHall - 0.3, 600, 630, 1.34, "sine.inOut"], [tHall + 0.6, 900, 600, 1.18, "power2.inOut"],
    [tLuot, 920, 596, 1.2, "sine.inOut"], [tLuot + 1.3, 1640, 470, 1.0, "power2.inOut"], [tStood - 0.1, 1650, 460, 1.04, "sine.inOut"],
    [tStood + 0.5, 1560, 470, 0.8, "power2.inOut"], [tClock + 0.1, 1560, 472, 0.82, "sine.inOut"], [tClock + 0.9, 1640, 520, 1.05, "power2.inOut"], [DUR, 1644, 516, 1.08, "sine.inOut"]]);

  // =================== 3: quảng trường, hoa giấy ===================
  var WX0 = 160, WX1 = 400;
  W.set(0, { x: WX0, y: G + 40, size: 0.62, pupX: 12, pupY: -8 });
  W.mouth(0, "smile");
  api.show("#hgT", 0, 0); api.show("#dq", 0, 0);
  W.walk(t2 + 0.02, t2 + 0.9, WX0, WX1, { step: 0.28 });
  W.pose(t2 + 1.0, 0.3, { pupX: 6, pupY: -18, upRot: -3 }, "power2.out");     // nhìn dây cờ
  // dây cờ đung đưa
  ["#co1", "#co2"].forEach(function (sel, k) { api.origin(sel, (k ? 1460 : 300) + " 440"); for (var i = 0; i < 12; i++) api.key(sel, "rotation", i * 1.9 + k * 0.6, i % 2 ? 0.8 : -0.8, "sine.inOut"); });
  var tSepC = tSep - 0.06;
  // thẻ Sept 2022 treo dưới dây cờ
  // (gắn ở lớp giữa để đi theo camera)
  var tNhat = tSep + 0.75;
  W.pose(tNhat - 0.3, 0.3, { pupX: 8, pupY: 18, upRot: 4 }, "power2.out");
  W.pose(tNhat, 0.32, { sy: 0.8, sx: 1.12, lean: 10, aRu: -24, aRf: 6, legL: 14, legR: -14 }, "power2.inOut");
  api.show("#hg", tNhat + 0.32, 0); api.show("#hgT", tNhat + 0.32, 1);
  W.pose(tNhat + 0.4, 0.32, { sy: 1, sx: 1, lean: 0, legL: 0, legR: 0, aRu: 98, aRf: 52, pupX: 2, pupY: 4, upRot: 0 }, "power2.inOut");
  W.mouth(tNhat + 0.5, "o");
  api.origin("#hgT", "0 0");
  for (var q = 0; q < 4; q++) api.key("#hgT", "rotation", tNhat + 0.8 + q * 0.22, q % 2 ? -40 : 40, "sine.inOut");
  W.mouth(tNhat + 1.2, "smile");
  W.dutTui(tParty - 0.2, 0.3);
  api.show("#hgT", tParty + 0.12, 0);
  W.pose(tParty + 0.25, 0.3, { aRu: -18, aRf: 10, pupX: 12, pupY: -8 }, "power2.inOut");

  // =================== 4: Kristallen ===================
  var WX2 = 720;
  W.walk(tHall - 0.2, tHall + 0.7, WX1, WX2, { step: 0.28 });
  Wr.set(0, { x: WX2 + 300, y: ky - KH + 286, size: 0.2, pupX: -6 });
  api.show("#phan", 0, 0); api.show("#phan", tHall + 0.6, 1);
  api.key("#Wr", "x", 0, WX2 + 300); api.key("#Wr", "x", tHall + 0.6, WX2 + 300, "none");
  W.pose(tHall + 0.8, 0.4, { pupX: 10, pupY: -22, upRot: -5, lean: -3 }, "power2.out");
  Wr.pose(tHall + 0.8, 0.4, { pupX: -10, pupY: -22, upRot: 5 }, "power2.out");
  lap.forEach(function (sel, i) {
    var tl = tHall + 0.5 + i * 0.55;
    api.origin(sel, "0 0");
    api.key(sel, "scale", 0, 0); api.key(sel, "scale", tl, 0, "none"); api.key(sel, "scale", tl + 0.18, 1, "back.out(2)"); api.key(sel, "scale", tl + 0.5, 0, "power2.in");
  });
  // kính râm loé đúng "Kristallen"
  api.origin(W.kr.kinhLoe, "250 142");
  api.show(W.kr.kinhLoe, tKris - 0.02, 1); api.key(W.kr.kinhLoe, "scale", tKris - 0.02, 0.3); api.key(W.kr.kinhLoe, "scale", tKris + 0.14, 1.2, "back.out(2)");
  api.key(W.kr.kinhLoe, "scale", tKris + 0.45, 0, "power2.in"); api.show(W.kr.kinhLoe, tKris + 0.5, 0);
  api.sfx("ting", tKris, 0.5);
  W.mouth(tKris + 0.1, "grin"); W.mouth(tKris + 0.9, "smile");
  W.idle(tHall + 1.2, tVong - 0.1, { seed: 301, bien: 1.2 });

  // =================== 5: chắp tay đi một vòng quanh toà nhà ===================
  W.pose(tVong, 0.3, { aRu: 26, aRf: 34, aLu: -26, aLf: -34, upRot: 0, lean: 0, pupX: 12, pupY: -10 }, "power2.inOut");
  var tSau = tVong + 0.95;
  W.walk(tVong + 0.1, tSau, WX2, 1240, { step: 0.3, arms: false });
  W.pose(tVong + 0.1, tSau - tVong - 0.1, { y: G - 6, size: 0.55 }, "sine.in");
  api.key("#W", "opacity", 0, 1); api.key("#W", "opacity", tSau - 0.15, 1, "none"); api.key("#W", "opacity", tSau, 0, "power1.in");
  api.key("#Wr", "x", tVong + 0.1, WX2 + 300, "none"); api.key("#Wr", "x", tSau, 1200, "sine.inOut");
  api.show("#phan", tSau, 0);
  var tRa = tNext - 0.35;
  W.pose(tSau + 0.05, 0.05, { x: 560, y: G - 6 }, "none");
  api.key("#W", "opacity", tRa - 0.4, 0, "none"); api.key("#W", "opacity", tRa - 0.2, 1, "power1.out");
  W.walk(tRa - 0.4, tNext + 0.15, 560, 640, { step: 0.3, arms: false });
  W.pose(tRa - 0.4, 0.55, { y: G + 40, size: 0.62 }, "sine.out");

  // =================== 6: lướt sang tháp đồng hồ ===================
  W.pose(tNext + 0.2, 0.25, { aRu: -18, aRf: 10, aLu: 18, aLf: -10 }, "power2.inOut");
  var WX3 = 1520;
  W.walk(tNext + 0.3, tNext + 1.9, 640, WX3, { step: 0.26 });
  W.pose(tNext + 2.0, 0.45, { pupX: 8, pupY: -24, upRot: -7, lean: -5 }, "power2.out");
  W.mouth(tNext + 2.2, "o"); W.mouth(tNext + 3.2, "smile");
  W.idle(tNext + 2.5, tStood, { seed: 302, bien: 1.0 });

  // =================== 7: bé tí dưới chân tháp ===================
  W.walk(tStood, tStood + 0.6, WX3, 1610, { step: 0.3 });
  W.pose(tStood + 0.65, 0.4, { pupX: 4, pupY: -26, upRot: -8, lean: -6 }, "power2.out");
  // kim đồng hồ tháp: giờ ~ 10, phút ở vạch 30 (180°); nhích một nấc đúng "minute."
  api.origin("#kimGio", TX + " " + CLY); api.origin("#kimPhut", TX + " " + CLY);
  api.set("#kimGio", 0, { rotation: 315 });
  api.key("#kimPhut", "rotation", 0, 180); api.key("#kimPhut", "rotation", tMin - 0.01, 180, "none"); api.key("#kimPhut", "rotation", tMin + 0.1, 186, "back.out(3)");

  // =================== 8: đồng hồ quả quýt chạy nhanh, vặn lại ===================
  var tRut = tClock + 0.1;
  W.dutTui(tRut, 0.25);
  api.show("#dq", tRut + 0.28, 1);
  W.pose(tRut + 0.32, 0.35, { aRu: 56, aRf: 30, pupX: 0, pupY: 10, upRot: 0, lean: 0 }, "power2.inOut");
  KR.thong(api, W, "R", "#dq", tRut + 0.28, DUR, { goc: 0, lac: 0.4 });
  api.pop("#bong", tRut + 0.55, 0.26);
  api.origin("#bong", BX + " " + BY);
  // quả quýt: kim giờ như tháp, kim phút nhanh hơn hai nấc (192°)
  api.origin("#dqGio", BX + " " + BY); api.origin("#dqPhut", BX + " " + BY); api.origin("#ngonV", (BX + 34) + " " + (BY - 150));
  api.set("#dqGio", 0, { rotation: 315 });
  api.key("#dqPhut", "rotation", 0, 192);
  W.pose(tRut + 0.9, 0.3, { pupX: 10, pupY: -26, upRot: -5 }, "power2.out");    // nhìn tháp
  W.pose(tRut + 1.4, 0.3, { pupX: 0, pupY: 10, upRot: 0 }, "power2.out");        // lại nhìn quả quýt
  W.mouth(tRut + 1.4, "flat");
  var tVan = tRut + 1.6;
  api.show("#ngonV", 0, 0); api.show("#ngonV", tVan - 0.25, 1); api.show("#ngonV", tVan + 1.2, 0);
  api.key("#ngonV", "x", 0, 260); api.key("#ngonV", "y", 0, -120); api.key("#ngonV", "x", tVan - 0.25, 260, "none"); api.key("#ngonV", "y", tVan - 0.25, -120, "none");
  api.key("#ngonV", "x", tVan, 0, "power2.out"); api.key("#ngonV", "y", tVan, 0, "power2.out");
  for (var vv = 0; vv < 5; vv++) api.key("#ngonV", "rotation", tVan + 0.1 + vv * 0.16, vv % 2 ? 0 : -24, "sine.inOut");
  api.key("#dqPhut", "rotation", tVan + 0.05, 192, "none"); api.key("#dqPhut", "rotation", tVan + 0.85, 180, "power1.inOut");
  api.key("#ngonV", "x", tVan + 0.95, 0, "none"); api.key("#ngonV", "y", tVan + 0.95, 0, "none"); api.key("#ngonV", "x", tVan + 1.2, 260, "power2.in"); api.key("#ngonV", "y", tVan + 1.2, -120, "power2.in");
  api.key("#dqPhut", "rotation", tMin - 0.01, 180, "none"); api.key("#dqPhut", "rotation", tMin + 0.1, 186, "back.out(3)");
  W.pose(tMin - 0.1, 0.25, { pupX: 8, pupY: -24, upRot: -4 }, "power2.out");
  W.mouth(tMin + 0.15, "smile");
  W.autoBlink(t2, DUR, 3011);
  // thẻ Sept 2022: bật dưới dây cờ (lớp giữa)
  api.pop("#tSep", tSepC, 0.24, tHall - 0.45);
  api.origin("#tSep", "760 560");
};
