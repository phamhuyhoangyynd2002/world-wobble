/* Đoạn d06 (biên đạo lại 21/11/2026) · cắt giấy · hồi ức · 50,6–66,1 s. Vào "giay", ra "cat".
   Lời: "Getting there took a plane, then a very long drive, then more of the drive. My map was upside down for most of it.
   I arrived in late December. Around then, the sun is up for only about four and a half hours a day. I arrived during one
   of the hours it wasn't."
   Tái dùng: _cu-21-11/d04 (trang sổ map-yakutia, máy bay giấy, xe hộp) + _cu-21-11/d06 (xe kính trên đường tuyết, đồng hồ,
   tắt đèn). Bỏ map-globe, tấm biển trôi, nhiệt kế.
   Ba cảnh: A trang sổ (0–5,05) · B trong xe, bản đồ giấy cứng đầu (5,05–7,5) · C mép làng tối, đồng hồ, tắt phụt.
   Chữ: "Oymyakon" (chấm bản đồ), "~4.5 h" (đồng hồ). Bản đồ: map-yakutia (assets/manifest.json, chep_ban_do.py, bỏ chấm sẵn).
   Trang phục: mũ len đỏ, khăn đỏ, máy ảnh đeo cổ, đèn pin (tắt) tay phải ở cảnh C; chưa có lông mi. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var CH = data.chu_tren_do_vat;
  var T = function (w, du, k) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * x * (x * (x * 6 - 15) + 10); }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function seg(t, t0, t1, a, b, e) { var u = (t - t0) / (t1 - t0); u = Math.max(0, Math.min(1, u)); return lerp(a, b, e ? e(u) : sm(u)); }

  // ---- mốc lời ----
  var tPlane = T("plane", 1.213), tDrive = T("then", 2.05, 0), tMore = T("more", 3.812), tMap = T("My", 5.05),
    tArr = T("arrived", 7.487, 0), tAround = T("Around", 9.1), tFour = T("four", 11.425), tDay = T("day", 12.537),
    tArr2 = T("arrived", 13.35, 1), tWasnt = T("wasn't", 14.8);
  var TC = tMap;                       // cắt từ trang sổ vào trong xe
  var SH = tArr - 6.37;                // độ lệch so với biên đạo cũ của cảnh làng (_cu-21-11/d06)

  // =================== CẢNH A: trang sổ ===================
  var MX = 300, MY = 80, MS = 1.25, MW = 1920 * MS, MH = 1080 * MS;
  var dot = [MX + 1042 * MS, MY + 561 * MS], land = [MX + 819 * MS, MY + 614 * MS];
  var P2 = api.duong([[-220, 470], [250, 360], [760, 420], [1120, 640], land]);
  var P3 = api.duong([land, [1420, 960], [1560, 925], [1650, 830], [1720, 740], [1840, 690], [1960, 800], [2060, 960],
    [2200, 900], [2340, 1060], [2520, 1000], [2700, 1150]]);
  var P4 = api.duong([[2700, 1150], [2840, 1240], [2980, 1290], [3150, 1370], [3380, 1420]]);

  var desk = '<rect x="-3000" y="-2200" width="11000" height="6000" fill="#8E6544"/>';
  for (var k = 0; k < 40; k++) desk += D.line("M -3000 " + (-2100 + k * 150) + " C 0 " + (-2080 + k * 150) + " 3000 " + (-2130 + k * 150) + " 8000 " + (-2100 + k * 150), 4, "#6E4A30", ' opacity="0.45"');
  desk += '<rect x="-3000" y="-2200" width="11000" height="6000" fill="url(#half)" opacity="0.08"/>';

  var dash = ' fill="none" stroke="#C23B2A" stroke-width="9" stroke-linecap="round" stroke-dasharray="2 22"';
  var page = "";
  page += D.journalPage(3000, 1500, { seed: 305, mau: "#F2E8CF" });                   // trang trống bên dưới
  page += '<path id="p4" d=""' + dash + "/>";
  var pgA = D.journalPage(3000, 1500, { seed: 301 });
  pgA += at(MX, MY, D.mapSticker("ban-do/map-yakutia.svg", MW, MH, { id: "stY", seed: 315 }));
  pgA += at(dot[0], dot[1], D.mapDot("dY", { r: 18, nhan: CH[0], co: 72, ben: "trai" }));
  pgA += '<path id="p2" d=""' + dash + "/>" + '<path id="p3" d=""' + dash + "/>";
  page += '<g id="pgA">' + pgA + "</g>";

  var camA = '<g transform="translate(150,232) scale(0.5)">' + D.cameraSmall({ day: 110 }) + "</g>";
  var A = api.wob("A", { scarf: true, khan: "#D9543C", mu: "#C9463A", phuKien: camA });
  var pl = D.paperPlane(), bc = D.boxCar("bc");
  page += '<g id="xe1" transform="translate(' + P2.at(0).x + "," + P2.at(0).y + ') scale(0.6)">' +
    g("xe-cb", bc.back) + g("xe-pb", pl.back) + A.svg + g("xe-pf", pl.front) + g("xe-cf", bc.front) + "</g>";

  // =================== CẢNH B + C: đường tuyết, mép làng ===================
  var MAT = 872, CS = 1.2, CARY = MAT + 40 - 172 * CS;
  var XSTOP = 5084, XM = 5560, XP = 5730;
  function xCar(t) {
    var tt = t - SH;
    if (tt <= 5.2) return 600 + 760 * tt;
    var d = Math.min(1.4, tt - 5.2);
    return 600 + 760 * 5.2 + 760 * (d - d * d / 2.8);
  }
  var thong = [];
  for (var i = 0, x = 2300; x < 5300; i++, x += 300 + (i % 3) * 70) thong.push([x, MAT - 52 + (i % 3) * 16, 300 + (i % 4) * 30]);
  var nen = CN.langTuyet(api, {
    ten: "duong", seed: 600, tu: 2000, den: 7800, mat: MAT, matTroi: [1250, 600],
    nha: [[6250, 300, 190], [6820, 340, 210]], nhaXa: [[4300, 760], [4520, 772], [4790, 766]],
    thong: thong, cot: [3100, 4500], rao: [[5900, 250]], suong: 6
  });
  var near = nen.gan;
  for (var s = 0, nx = 2400; nx < 9600; s++, nx += 560 + (s % 3) * 90) {
    near += at(nx, 1040, D.paper(D.rRect(-10, -300, 20, 300, 1, 610 + s), "#F4F1E8", { stroke: true, sw: 4, sx: 5, sy: 6 }) +
      '<rect x="-9" y="-300" width="18" height="40" fill="' + C.accent2 + '"/><rect x="-9" y="-220" width="18" height="40" fill="' + C.accent2 + '"/>');
  }

  var cam = '<g transform="translate(262,300) scale(0.62)">' + D.cameraSmall({ day: 120 }) + "</g>";
  var holdFl = '<g transform="rotate(90) scale(0.8)">' + D.flashlight("fl") + "</g>";
  var W = api.wob("W", { scarf: true, khan: "#D9543C", mu: "#C9463A", phuKien: cam });
  var car = D.boxCarKinh("car");
  var bando = '<g transform="translate(-4,-22)"><g id="bd"><g id="bdIn">' + D.paperMap(160, 84, { nguoc: true }) + "</g></g></g>";
  var carSvg = '<g id="xe" transform="translate(' + xCar(TC) + "," + CARY + ") scale(" + CS + ')">' + car.back + W.svg + bando + car.kinh + car.front + "</g>";

  var M = api.wob("M", { scarf: true, khan: "#D9543C", mu: "#C9463A", phuKien: cam, holdL: holdFl });
  var mid = nen.giua;
  mid += at(XP, MAT + 6, D.pole(720, 0, 640));
  mid += D.line("M " + XP + " 196 L " + (XP - 200) + " 196", 10, INK) + D.line("M " + XP + " 196 L " + (XP - 200) + " 196", 5, C.woodDark);
  mid += D.line("M " + (XP - 170) + " 196 L " + (XP - 170) + " 236", 4);
  mid += '<g id="ckG">' + D.line("M " + (XP - 170) + " 196 L " + (XP - 170) + " 236", 4) + at(XP - 170, 330, D.clockSun("ck", { r: 92, nhan: CH[1], co: 50 })) + "</g>";
  mid += carSvg + M.svg;
  var eyeY = MAT + 28 - (392 - 156) * 0.7;
  mid += '<radialGradient id="lo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#000"/><stop offset="0.55" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>';
  mid += '<mask id="mToi" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="14000" height="6000"><rect x="-2000" y="-2000" width="14000" height="6000" fill="#fff"/>' +
    '<g id="loMat"><circle cx="' + (XM - 28) + '" cy="' + eyeY + '" r="34" fill="url(#lo)"/><circle cx="' + (XM + 27) + '" cy="' + eyeY + '" r="34" fill="url(#lo)"/></g></mask>';
  mid += '<rect id="toi" x="-2000" y="-2000" width="14000" height="6000" fill="#0B1424" mask="url(#mToi)"/>';
  mid += '<g id="chum1"><g transform="rotate(90)"><g transform="translate(62,0)">' + D.beam(260, 70) + "</g></g></g>";
  mid += '<circle id="flGlow" cx="0" cy="0" r="46" fill="url(#lampG)"/>';

  var fx = "", r = D.rng(606);
  for (var f = 0; f < 26; f++) fx += at(0, Math.round(40 + r() * 1000), g("sn" + f, D.flake(5 + Math.round(r() * 9), 620 + f)));

  api.dat(nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", near, 1.4, { mat: 1060 }) + g("fx", fx) +
    api.lop("ban", desk, 0.85, { mat: 1500 }) + api.lop("trang", page, 1, { mat: 1500 }));
  api.noi({ kieu: { ban: "khong", xa: "khong", giua: "khong", gan: "khong" } });
  // cắt cảnh: trang sổ biến mất đúng TC
  api.show("#L-ban", 0, 1); api.show("#L-ban", TC, 0);
  api.show("#L-trang", 0, 1); api.show("#L-trang", TC, 0);
  api.show("#fx", 0, 0); api.show("#fx", TC, 1);

  // =================== CAMERA ===================
  var tLand = tDrive, tFold = tLand + 0.18, tFlip = tMore;
  function u2(t) { return seg(t, 0.55, tDrive - 0.02, 0, 1); }
  function u3(t) { return seg(t, tFold + 0.05, tMore, 0, 1, function (u) { return u; }); }
  function u4(t) { return seg(t, tMore + 0.1, TC - 0.05, 0, 1, function (u) { return u; }); }
  var keys = [
    [0, 1500, 760, 0.64], [0.55, 1500, 760, 0.64, "none"],
    [tPlane, 900, 600, 0.86, "sine.inOut"],
    [tDrive, 1330, 820, 1.12, "power2.inOut"],
    [tDrive + 0.9, 1760, 860, 1.06, "sine.inOut"],
    [tMore - 0.1, 1900, 860, 0.68, "power2.inOut"],                  // lùi: nét đứt bò quá chấm, quá trang
    [tMore + 0.6, 2400, 1000, 0.8, "power2.inOut"],
    [TC - 0.02, 3000, 1220, 1.0, "sine.inOut"]
  ];
  // cảnh B: theo xe, cận Wob qua kính (lấy mẫu mỗi 0,1 s)
  for (var tk = TC; tk <= tArr - 0.1 + 1e-6; tk += 0.1) {
    var pb = sm((tk - (tArr - 0.5)) / 0.4);
    keys.push([tk, xCar(tk) - 6, lerp(556, 590, pb), lerp(2.6, 2.3, pb), tk === TC ? "none" : "none"]);
  }
  keys.push([tArr + 0.5, XSTOP + 260, 600, 1.12, "power2.inOut"]);
  keys.push([tAround - 0.05, XM + 80, 560, 1.18, "sine.inOut"]);
  keys.push([tAround + 0.75, XM + 30, 525, 1.5, "power2.inOut"]);
  keys.push([tDay + 0.3, XM + 34, 530, 1.56, "sine.inOut"]);
  keys.push([tArr2 + 0.7, XM + 60, 640, 1.5, "power2.inOut"]);
  keys.push([tWasnt - 0.05, XM + 50, 660, 1.56, "sine.inOut"]);
  keys.push([DUR, XM, eyeY + 40, 2.2, "power2.out"]);
  api.camera(keys);

  // =================== CẢNH A: máy bay, xe, nét đứt, lật trang ===================
  api.sfx("whoosh", 0.6, 0.45);
  api.sfx("may-no", tFold + 0.02, 0.35); api.sfx("may-no", tMore - 0.6, 0.3);
  api.sfx("pop", tFold, 0.4);
  api.sfx("whoosh", tFlip, 0.4);
  function xe1(t) {
    if (t < tDrive) { var q = P2.at(u2(t)); return { x: q.x, y: q.y - 6, a: Math.max(-30, Math.min(36, q.a)), s: t < 0.5 ? 0.0001 : 0.6 }; }
    var c = t < tMore ? P3.at(u3(t)) : P4.at(u4(t));
    return { x: c.x, y: c.y - 8 + Math.sin(t * 19) * 2.2, a: Math.max(-22, Math.min(22, c.a)), s: 0.6 };
  }
  var nodes = {};
  api.moiKhung(function (t) {
    var el = function (id) { return nodes[id] || (nodes[id] = document.getElementById(id)); };
    if (t < TC + 0.05) {
      if (el("p2")) el("p2").setAttribute("d", t < 0.6 ? "M 0 0" : P2.den(u2(t)));
      if (el("p3")) el("p3").setAttribute("d", t < tFold ? "M 0 0" : P3.den(Math.max(0.01, u3(t))));
      if (el("p4")) el("p4").setAttribute("d", t < tMore + 0.1 ? "M 0 0" : P4.den(Math.max(0.01, u4(t))));
      var q = xe1(t);
      if (el("xe1")) el("xe1").setAttribute("transform", "translate(" + q.x.toFixed(1) + "," + q.y.toFixed(1) + ") rotate(" + q.a.toFixed(2) + ") scale(" + q.s.toFixed(4) + ")");
      var turn = (t < tMore ? u3(t) * P3.dai : P3.dai + u4(t) * P4.dai) * 2.2;
      if (el("bc-b0")) el("bc-b0").setAttribute("transform", "rotate(" + turn.toFixed(1) + " -120 92)");
      if (el("bc-b1")) el("bc-b1").setAttribute("transform", "rotate(" + turn.toFixed(1) + " 120 92)");
    }
    if (t >= TC - 0.05) {
      var x = xCar(t), bob = x < 4500 + 760 * 1.5 ? Math.sin(t * 23) * 2.2 : 0;
      if (t - SH > 6.6) bob = 0;
      if (el("xe")) el("xe").setAttribute("transform", "translate(" + x.toFixed(1) + "," + (CARY + bob).toFixed(1) + ") scale(" + CS + ")");
      var tr = (x - 600) / 46 / CS * 57.3;
      if (el("car-b0")) el("car-b0").setAttribute("transform", "rotate(" + tr.toFixed(1) + " -170 126)");
      if (el("car-b1")) el("car-b1").setAttribute("transform", "rotate(" + tr.toFixed(1) + " 170 126)");
      if (el("car-phan")) el("car-phan").setAttribute("transform", "translate(" + (-((x * 0.55) % 260)).toFixed(1) + ",0)");
    }
  });
  // máy bay gập thành xe hộp
  ["#xe-pb", "#xe-pf", "#xe-cb", "#xe-cf"].forEach(function (s) { api.origin(s, "0 0"); });
  ["#xe-pb", "#xe-pf"].forEach(function (s) { api.key(s, "scaleY", 0, 1); api.key(s, "scaleY", tLand, 1, "none"); api.key(s, "scaleY", tFold, 0.02, "power2.in"); api.show(s, 0, 1); api.show(s, tFold, 0); });
  ["#xe-cb", "#xe-cf"].forEach(function (s) { api.key(s, "scaleX", 0, 0); api.key(s, "scaleX", tFold - 0.04, 0, "none"); api.key(s, "scaleX", tFold + 0.2, 1, "back.out(2.4)"); });
  // lật trang: trang có bản đồ gập lên khỏi gáy trên, lộ trang trống, xe vẫn chạy
  api.origin("#pgA", "0 0");
  api.key("#pgA", "scaleY", 0, 1); api.key("#pgA", "scaleY", tFlip, 1, "none"); api.key("#pgA", "scaleY", tFlip + 0.4, 0.0, "power2.in");
  api.key("#pgA", "skewX", 0, 0); api.key("#pgA", "skewX", tFlip, 0, "none"); api.key("#pgA", "skewX", tFlip + 0.4, -12, "power1.in");
  api.show("#pgA", 0, 1); api.show("#pgA", tFlip + 0.42, 0);

  // Wob nhỏ trên máy bay / xe hộp
  A.set(0, { x: -30, y: 30, size: 0.45, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 6, lashes: 0, ice: 0 });
  A.mouth(0, "X");
  A.pose(0.7, 0.2, { pupX: 10, pupY: 6, upY: -12 }, "back.out(2)");     // ló đầu nhìn xuống trang
  A.mouth(tPlane - 0.1, "grin");
  A.vay(tPlane + 0.05, 3, "R");
  api.key("#A-scarfT", "rotation", 0, 0); api.key("#A-scarfT", "rotation", 0.8, 40, "power2.out");
  for (var sc = 1.0, sg = 1; sc < tDrive; sc += 0.12, sg = -sg) api.key("#A-scarfT", "rotation", sc, 40 + sg * 10, "sine.inOut");
  api.key("#A-scarfT", "rotation", tDrive + 0.3, 0, "back.out(2)");
  A.pose(tLand - 0.05, 0.1, { sy: 0.86, sx: 1.08, upY: 6 }, "power2.in");
  A.pose(tFold + 0.1, 0.3, { sy: 1, sx: 1, upY: 0, pupY: -2 }, "back.out(3)");
  A.mouth(tFold, "o"); A.mouth(tFold + 0.45, "flat");
  A.pose(tFold + 0.5, 0.25, { pupX: 10, pupY: -4 }, "power2.out");
  A.pose(tFold + 1.0, 0.25, { pupX: -10, pupY: 4, lean: -6 }, "power2.out");   // ngoái lại chấm Oymyakon vừa chạy qua
  A.pose(tMore - 0.3, 0.3, { pupX: 10, pupY: 0, lean: 0, lid: 30 }, "power2.out");
  A.mouth(tMore, "wobbly");
  A.pose(tFlip + 0.1, 0.12, { upY: -20, eye: 1.25, lid: 0 }, "back.out(2)");   // trang lật vụt qua đầu
  A.pose(tFlip + 0.55, 0.3, { upY: 0, eye: 1, lid: 26, pupX: 10 }, "power2.inOut");
  A.mouth(tFlip + 0.6, "flat");
  A.breathe(0, TC, 2.2);
  A.autoBlink(0.3, TC, 404);

  // =================== CẢNH B: trong xe, bản đồ cứng đầu ===================
  var r2 = D.rng(607);
  for (var j = 0; j < 26; j++) {
    var sel = "#sn" + j, per = 0.55 + r2() * 0.5, ph = r2() * per;
    api.key(sel, "x", 0, 2000); api.key(sel, "opacity", 0, 1);
    for (var tc = TC - ph; tc < tArr + 0.2; tc += per) { api.key(sel, "x", Math.max(TC, tc), tc < TC ? 2000 - 2200 * ((TC - tc) / per) : 2000, "none"); api.key(sel, "x", tc + per, -200, "none"); }
    api.key(sel, "opacity", tArr, 1, "none"); api.key(sel, "opacity", tArr + 0.4, 0, "power1.out");
  }
  [TC, tArr - 1.0].forEach(function (t, i) { api.sfx("may-no", t, [0.22, 0.16][i]); });
  var s1 = TC + 0.95, s2 = TC + 1.65;   // hai lần xoay (≥ 0,7 s mỗi bước)
  W.set(0, { x: -5, y: 55, size: 0.62, aLu: 40, aLf: -40, aRu: -40, aRf: 40, pupX: 0, pupY: 8, lid: 14, lashes: 0, ice: 0, op: 1 });
  W.mouth(0, "flat");
  api.origin("#bd", "0 0"); api.origin("#bdIn", "0 0");
  api.set("#bd", 0, { scale: 0.3, rotation: 0 });
  api.key("#bd", "scale", TC + 0.05, 0.3, "none"); api.key("#bd", "scale", TC + 0.3, 1, "back.out(2)");
  api.sfx("pop", TC + 0.05, 0.3);
  W.pose(TC + 0.3, 0.25, { pupY: 14, pupX: -4, lid: 20, lean: 4 }, "power2.out");     // dí mắt vào bản đồ ngược
  W.mouth(TC + 0.5, "smirk");
  // lần 1: xoay nửa vòng... mặt bản đồ tự lộn lại
  api.key("#bd", "rotation", s1, 0, "none"); api.key("#bd", "rotation", s1 + 0.3, 180, "back.out(1.6)");
  api.key("#bdIn", "rotation", 0, 0); api.key("#bdIn", "rotation", s1 + 0.42, 0, "none"); api.key("#bdIn", "rotation", s1 + 0.52, 180, "power3.out");
  api.sfx("boing", s1 + 0.42, 0.45);
  W.pose(s1, 0.2, { lean: -6, upRot: -4 }, "power2.out");
  W.pose(s1 + 0.45, 0.12, { eye: 1.2, pupY: 12 }, "back.out(2)");
  W.mouth(s1 + 0.45, "o");
  // lần 2: xoay nữa, vẫn ngược
  api.key("#bd", "rotation", s2, 180, "none"); api.key("#bd", "rotation", s2 + 0.3, 360, "back.out(1.6)");
  api.key("#bdIn", "rotation", s2 + 0.42, 180, "none"); api.key("#bdIn", "rotation", s2 + 0.52, 360, "power3.out");
  api.sfx("boing", s2 + 0.42, 0.4);
  W.pose(s2, 0.2, { lean: 6, upRot: 4, eye: 1 }, "power2.out");
  W.pose(s2 + 0.45, 0.12, { eye: 1.15 }, "back.out(2)");
  W.mouth(s2 + 0.45, "wobbly");
  // liếc người xem, tỉnh bơ
  W.pose(s2 + 0.75, 0.25, { pupX: 0, pupY: 0, lid: 30, lean: 0, upRot: 0, eye: 1 }, "power2.out");
  W.mouth(s2 + 0.8, "flat");
  W.breathe(TC, tArr + 1, 2.4);
  W.blinkAt(TC + 0.7);

  // =================== CẢNH C: mép làng ===================
  var tDoor = tArr + 0.35, tOut = tDoor + 0.22, tLandM = tOut + 0.3;
  api.origin("#car-cua", "166 -130");
  api.key("#car-cua", "scaleX", 0, 1); api.key("#car-cua", "scaleX", tDoor, 1, "none"); api.key("#car-cua", "scaleX", tDoor + 0.25, 0.12, "power2.out");
  api.sfx("bonk", tDoor + 0.05, 0.3);
  W.set(tOut, { op: 0 }); api.show("#bd", 0, 1); api.show("#bd", tOut, 0);
  M.set(0, { x: XSTOP + 60, y: MAT + 28 - 70, size: 0.7, op: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 6, lashes: 0, ice: 0 });
  M.set(tOut, { op: 1, sy: 1.12, sx: 0.94 });
  api.key("#M", "y", tOut, MAT + 28 - 70, "none"); api.key("#M", "y", tOut + 0.12, MAT + 28 - 98, "power2.out"); api.key("#M", "y", tLandM, MAT + 28, "power2.in");
  api.key("#M", "x", tOut, XSTOP + 60, "none"); api.key("#M", "x", tLandM, XSTOP + 140, "power1.out");
  M.pose(tLandM - 0.02, 0.07, { sy: 0.78, sx: 1.18 }, "power2.in");
  M.pose(tLandM + 0.06, 0.3, { sy: 1, sx: 1 }, "elastic.out(1,0.5)");
  api.sfx("buoc-tuyet", tLandM, 0.5);
  M.mouth(tOut, "o"); M.mouth(tLandM + 0.1, "chatter");
  M.shiver(tLandM + 0.3, tLandM + 0.9, 2.2, 16);                   // run ngay khi chạm tuyết
  var tW0 = tLandM + 0.9, tW1 = tAround + 0.2;
  M.walk(tW0, tW1, XSTOP + 140, XM, { step: 0.29, arms: "R", tieng: true });
  M.mouth(tW0, "X");
  // đồng hồ trượt xuống cột đúng 'Around'
  var tCk = tAround;
  api.origin("#ckG", (XP - 170) + " 196");
  api.key("#ckG", "y", 0, -620); api.key("#ckG", "y", tCk - 0.4, -620, "none"); api.key("#ckG", "y", tCk, 0, "back.out(1.4)");
  api.key("#ckG", "rotation", 0, 0); api.key("#ckG", "rotation", tCk, 7, "none"); api.key("#ckG", "rotation", tCk + 0.35, -4, "sine.inOut"); api.key("#ckG", "rotation", tCk + 0.7, 0, "sine.inOut");
  api.sfx("whoosh", tCk - 0.35, 0.3); api.sfx("bonk", tCk, 0.3);
  // nhãn '~4.5 h' đúng 'four'
  api.show("#ck-nhan", 0, 0); api.show("#ck-nhan", tFour - 0.05, 1);
  api.origin("#ck-nhan", "0 138");
  api.pop("#ck-nhan", tFour - 0.05, 0.25);
  api.sfx("ting", tFour - 0.03, 0.4);
  M.pose(tW1 + 0.2, 0.3, { pupY: -14, pupX: -4, upRot: -3 }, "power2.out");
  M.idle(tW1 + 0.4, tFour - 0.2, { seed: 63, bien: 2 });
  M.pose(tFour - 0.2, 0.3, { aLu: 150, aLf: 12 }, "back.out(1.6)");
  M.pose(tDay - 0.3, 0.3, { aLu: 18, aLf: -10 }, "power2.inOut");
  api.origin("#ck-lat", "0 0");
  api.key("#ck-lat", "rotation", 0, -6); api.key("#ck-lat", "rotation", tAround, -6, "none"); api.key("#ck-lat", "rotation", tFour, 8, "sine.inOut");
  api.key("#ck-lat", "rotation", tDay - 0.1, 8, "none"); api.key("#ck-lat", "rotation", tDay + 0.6, 70, "power2.in");
  api.key("#ck-lat", "y", 0, 0); api.key("#ck-lat", "y", tDay - 0.1, 0, "none"); api.key("#ck-lat", "y", tDay + 0.9, 380, "power2.in");
  api.key("#ck-lat", "x", 0, 0); api.key("#ck-lat", "x", tDay - 0.1, 0, "none"); api.key("#ck-lat", "x", tDay + 0.9, 60, "power1.in");
  api.show("#ck-lat", 0, 1); api.fade("#ck-lat", tDay + 0.6, 0.3, 0);
  M.pose(tDay + 0.1, 0.5, { pupY: 12, pupX: 2, upRot: 2 }, "power2.in");
  M.mouth(tDay + 0.2, "o");
  api.sfx("drop", tDay + 0.85, 0.35);
  M.pose(tArr2 + 0.2, 0.3, { pupY: 0, pupX: 0, upRot: 0, lid: 22 }, "power2.out");
  M.mouth(tArr2 + 0.2, "flat");
  M.idle(tArr2 + 0.5, tWasnt - 0.1, { seed: 64, bien: 1.8 });

  // tắt phụt đúng 'wasn't': chỉ còn đôi mắt, giữ tới hết đoạn
  api.key("#toi", "opacity", 0, 0); api.key("#toi", "opacity", TC + 0.8, 0, "none"); api.key("#toi", "opacity", tAround - 0.2, 0.36, "sine.inOut");
  api.key("#toi", "opacity", tWasnt - 0.02, 0.36, "none"); api.key("#toi", "opacity", tWasnt + 0.04, 1, "power2.out");
  api.key("#L-gan-in", "opacity", 0, 1); api.key("#L-gan-in", "opacity", TC + 0.8, 1, "none"); api.key("#L-gan-in", "opacity", tAround - 0.2, 0.75, "sine.inOut");
  api.key("#L-gan-in", "opacity", tWasnt - 0.02, 0.75, "none"); api.key("#L-gan-in", "opacity", tWasnt + 0.04, 0, "power2.out");
  api.show("#loMat", 0, 0); api.show("#loMat", tWasnt + 0.02, 1);
  api.sfx("liu-lo-soc", tWasnt, 0.55);
  M.pose(tWasnt + 0.05, 0.12, { eye: 1.2, lid: 0, pupX: 0, pupY: 0 }, "back.out(2)");
  M.blinkAt(tWasnt + 0.45);
  M.pose(tWasnt + 0.6, 0.12, { pupX: -12 }, "power2.out");          // liếc trái, liếc phải trong bóng tối
  M.autoBlink(tW1, tWasnt - 0.3, 67);
  // bấm đèn pin (tay trái) trong bóng tối: chùm ngắn, nối sang d07 đang rọi
  var tFl = DUR - 0.3;
  M.pose(tFl - 0.25, 0.2, { aLu: 70, aLf: 20 }, "power2.out");
  api.show("#fl-den", 0, 0); api.show("#fl-den", tFl, 1);
  var hl = M.hand("L", tFl);
  api.origin("#chum1", "0 0");
  api.set("#chum1", 0, { x: hl.x, y: hl.y, rotation: hl.angle, scale: 0.7, opacity: 0 });
  api.key("#chum1", "opacity", tFl, 0, "none"); api.key("#chum1", "opacity", tFl + 0.05, 1, "power2.out");
  api.set("#flGlow", 0, { x: hl.x, y: hl.y, opacity: 0 });
  api.key("#flGlow", "opacity", tFl, 0, "none"); api.key("#flGlow", "opacity", tFl + 0.05, 0.9, "power2.out");
  api.sfx("pop", tFl, 0.5);
  M.breathe(tOut, DUR, 2.4);
};
