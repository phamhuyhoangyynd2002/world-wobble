/* Đoạn d37 · cắt giấy · hồi ức: Wob ngồi dưới bóng cây ở rìa làng mùa hè, sổ mở trên đùi; cận trang sổ cắt giấy: ba hình nhỏ
   (con suối bốc hơi + đàn tuần lộc nhỏ → nhiệt kế đội vương miện băng → hàng khách áo phao dạng chung giơ máy ảnh) nối bằng mũi tên;
   rồi lùi ra: Wob nhìn ra thung lũng mùa hè, gấp sổ; 0,5 s cuối phủ giấy phẳng. Vào "cat", ra "giay". Không chữ.
   Trang phục: Wob không mũ, áo lông mở, ba lô phồng; cầm bút, sổ. Người chỉ dạng chung, không mặt chi tiết. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = api.INK, C = api.C, HE = window.HE_B;
  var TU = []; (data.loi || []).forEach(function (l) { (l.tu || []).forEach(function (w) { if (w.start > -0.3) TU.push(w); }); });
  var T = function (w, k, du) { var h = TU.filter(function (x) { return x.text.toLowerCase().indexOf(w.toLowerCase()) >= 0; })[k || 0]; return h ? h.start : du; };
  var MAT = 872;

  var nen = HE.dongCo(api, {
    seed: 3700, tu: -1400, den: 4400, mat: MAT, matTroi: [1250, 150],
    nhaXa: [[1050, 742], [1380, 736], [1620, 748], [1900, 740]], cay: [[1700, MAT + 4, 360]],
    nha: [[2400, 340, 210], [2900, 300, 190, "#7A4A3A"]]
  });
  // con suối nhỏ uốn qua thung lũng ở lớp xa
  var xa = nen.xa + D.paper("M 760 760 C 900 740 1100 770 1300 748 C 1500 728 1700 760 2000 744 L 2000 756 C 1700 774 1500 742 1300 762 C 1100 784 900 754 760 772 Z", "#7DB8D8", { shadow: false, stroke: true, sw: 2.5 });

  // ---- đạo cụ: ba hình trên trang sổ ----
  function suoi() {   // suối bốc hơi + 3 tuần lộc nhỏ. Gốc: tâm hình
    var s = D.paper(D.rEll(-6, 22, 46, 14, 1.5, 3701), "#7DB8D8", { stroke: true, sw: 2.5, shadow: false });
    s += '<g id="hs">' + [-24, -4, 16].map(function (x) { return D.line("M " + x + " 14 C " + (x - 8) + " 2 " + (x + 8) + " -8 " + x + " -20 C " + (x - 6) + " -28 " + (x + 4) + " -34 " + x + " -40", 2.5, "#9AA7AB"); }).join("") + "</g>";
    [[-40, 50], [-16, 54], [10, 50]].forEach(function (p, i) {
      s += '<g transform="translate(' + p[0] + "," + p[1] + ')">' + '<ellipse cx="0" cy="0" rx="10" ry="6" fill="#8A6A4A" stroke="' + INK + '" stroke-width="1.8"/>' +
        D.line("M -6 4 L -7 13 M 6 4 L 7 13 M -9 -2 L -14 -9", 1.8) + '<circle cx="-14" cy="-10" r="3.5" fill="#8A6A4A" stroke="' + INK + '" stroke-width="1.5"/>' +
        D.line("M -15 -13 L -19 -21 M -18 -18 L -22 -18 M -13 -13 L -11 -21", 1.5) + "</g>";
    });
    return s;
  }
  function nhietKeVuongMien() {   // nhiệt kế đội vương miện băng nhỏ
    var s = '<rect x="-7" y="-36" width="14" height="66" rx="7" fill="#FFFDF6" stroke="' + INK + '" stroke-width="2.5"/>';
    s += '<rect x="-3" y="-6" width="6" height="34" fill="#E85D45"/><circle cx="0" cy="34" r="10" fill="#E85D45" stroke="' + INK + '" stroke-width="2.5"/>';
    s += '<g id="vm"><path d="M -14 -38 L -14 -52 L -7 -45 L 0 -56 L 7 -45 L 14 -52 L 14 -38 Z" fill="#CFE8F4" stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round"/></g>';
    return s;
  }
  function khach() {   // hàng khách mặc áo phao dạng chung, giơ máy ảnh; mặt trơn trong mũ trùm
    var s = "";
    ["#E0703A", "#3F9FB0", "#C9463A", "#E0B23A"].forEach(function (c, i) {
      var x = -36 + i * 24;
      s += '<g transform="translate(' + x + ',0)">' + D.paper("M -10 24 C -12 10 -11 -2 -8 -8 L 8 -8 C 11 -2 12 10 10 24 Z", c, { stroke: true, sw: 2, shadow: false }) +
        D.line("M -10 4 L 10 4 M -11 14 L 11 14", 1.5, INK, ' opacity="0.5"') +
        '<circle cx="0" cy="-15" r="8" fill="' + c + '" stroke="' + INK + '" stroke-width="2"/><circle cx="0" cy="-14" r="4.5" fill="#F3E3CF"/>' +
        '<rect x="5" y="-26" width="10" height="7" rx="1.5" fill="' + INK + '"/>' + D.line("M 6 -6 L 9 -19", 2.2, INK) + "</g>";
    });
    return s;
  }
  function muiTen(id, d) { return g(id, D.line(d, 3, INK, ' stroke-dasharray="7 6"')); }
  /* sổ mở 340×210 trên đùi. Gốc: giữa gáy (mép trên). Trang phải gập được: so-p (mặt trước so-pf, mặt sau so-pb). */
  function so() {
    var s = "";
    s += D.paper("M -176 -6 L 0 0 L 0 214 L -176 208 Z", "#7A5236", { stroke: true, sw: 4, sx: 5, sy: 7 });
    s += D.paper("M -168 0 L 0 6 L 0 206 L -168 200 Z", "#F4EBD6", { stroke: true, sw: 3, shadow: false });
    s += '<g transform="translate(-86,96)">' + g("h1", suoi()) + "</g>";
    var pf = D.paper("M 0 6 L 168 0 L 168 200 L 0 206 Z", "#F4EBD6", { stroke: true, sw: 3, shadow: false });
    pf += '<g transform="translate(74,60)">' + g("h2", nhietKeVuongMien()) + "</g>";
    pf += '<g transform="translate(96,160)">' + g("h3", khach()) + "</g>";
    pf += muiTen("m2", "M 84 100 C 88 116 90 124 94 130");
    var pb = D.paper("M 0 6 L 176 0 L 176 208 L 0 214 Z", "#7A5236", { stroke: true, sw: 4, shadow: false }) + D.line("M 20 30 L 150 26", 3, "#5A3B26");
    s += muiTen("m1", "M -40 70 C -10 30 20 30 50 52");
    s += g("so-p", g("so-pf", pf) + g("so-pb", pb));
    s += D.line("M 0 0 L 0 210", 4, "#5A3B26");
    return s;
  }
  function butChi() { return D.line("M 0 -40 L 0 50", 9, INK) + D.line("M 0 -40 L 0 50", 5, "#E0B23A") + '<path d="M -5 50 L 5 50 L 0 66 Z" fill="#E9D7A6" stroke="' + INK + '" stroke-width="2.5"/>'; }

  // ---- Wob ngồi dưới cây ----
  var M = api.wob("M", { packExtra: HE.duoiCa(), holdR: g("butR", butChi()) });
  M.svg = HE.mac(M.svg, "M", "mo");
  var WX = 760, WY = 948, SX = WX, SY = 846, KS = 0.62;   // KS: tỉ lệ cuốn sổ
  var mid = nen.giua;
  mid += '<ellipse cx="' + (WX - 40) + '" cy="' + (MAT + 50) + '" rx="380" ry="40" fill="#3E5E2E" opacity="0.35"/>';
  mid += at(WX - 260, MAT + 6, '<g transform="scale(1.7)">' + HE.thongHe(420, 3710) + "</g>");
  mid += M.svg;
  mid += at(SX, SY, '<g transform="scale(' + KS + ')">' + g("so", so()) + "</g>");
  var gan = "";   // bỏ cỏ lớp gần: khi cận trang sổ nó phóng to che trang
  api.dat(HE.defs() + nen.troi + api.lop("xa", xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1060 }));
  api.noi({ raDai: 0.5 });

  // ---- mốc lời ----
  var tHerd = T("herders", 0, 1.10), tTherm = T("thermometer", 0, 1.99), tFame = T("fame", 0, 2.98), tCold = T("cold", 0, 4.35);
  var tVis = T("visitors", 0, 5.53), tVill = T("village", 0, 6.60), tFreeze = T("freeze", 0, 8.78), tWel = T("welcomes", 0, 9.54);
  var tEvery = T("everything", 0, 11.08), tDoes = T("does", 0, 11.70);

  // ---- camera: cận trang sổ → lùi ra toàn cảnh ----
  var NX = SX, NY = SY + 105 * KS, Z = 1 / KS;
  api.camera([
    [0, NX - 43, NY, 4.6 * Z], [tHerd + 0.3, NX - 37, NY, 4.7 * Z, "sine.inOut"],
    [tTherm - 0.25, NX + 19, NY - 12, 4.4 * Z, "power2.inOut"],
    [tCold - 0.2, NX + 37, NY + 6, 4.3 * Z, "power2.inOut"],
    [tVis + 0.4, NX + 43, NY + 19, 4.5 * Z, "sine.inOut"],
    [tVill - 0.1, NX + 25, NY + 6, 4.2 * Z, "sine.inOut"],
    [tVill + 1.5, 1060, 640, 1.18, "power2.inOut"],                     // lùi khỏi trang: Wob dưới bóng cây, thung lũng hè
    [tWel, 1110, 620, 1.04, "sine.inOut"],
    [DUR, 1090, 630, 1.1, "sine.inOut"]
  ]);

  // ---- ba hình bật lên, mũi tên vẽ dần ----
  ["#h1", "#h2", "#h3"].forEach(function (s) { api.origin(s, "0 0"); });
  api.pop("#h1", 0.05, 0.3);
  api.sfx("pop", 0.08, 0.5);
  api.origin("#m1", "-40 70"); api.key("#m1", "scaleX", 0, 0); api.key("#m1", "scaleX", tTherm - 0.6, 0, "none"); api.key("#m1", "scaleX", tTherm - 0.05, 1, "power2.inOut");
  api.key("#m1", "scaleY", 0, 0); api.key("#m1", "scaleY", tTherm - 0.6, 0, "none"); api.key("#m1", "scaleY", tTherm - 0.05, 1, "power2.inOut");
  api.pop("#h2", tTherm - 0.05, 0.28);
  api.origin("#vm", "0 -40"); api.key("#vm", "y", 0, -30); api.key("#vm", "y", tFame - 0.4, -30, "none"); api.key("#vm", "y", tFame, 0, "bounce.out");
  api.sfx("ting", tFame, 0.35);
  api.origin("#m2", "84 100"); api.key("#m2", "scale", 0, 0); api.key("#m2", "scale", tCold - 0.3, 0, "none"); api.key("#m2", "scale", tVis - 0.4, 1, "power2.inOut");
  api.pop("#h3", tVis - 0.25, 0.3);
  api.sfx("pop", tVis - 0.22, 0.4);
  // hơi suối bay lên nhẹ
  api.origin("#hs", "0 14");
  api.key("#hs", "y", 0, 0);
  for (var th = 0.3, up = true; th < DUR; th += 0.6, up = !up) api.key("#hs", "y", th, up ? -5 : 0, "sine.inOut");
  // khách giơ máy ảnh lắc nhẹ
  api.key("#h3", "rotation", tVis + 0.2, 0, "none");
  for (var tk = tVis + 0.4, sk = 1; tk < DUR; tk += 0.5, sk = -sk) api.key("#h3", "rotation", tk, sk * 2, "sine.inOut");

  // ---- Wob: ngồi (chân ngắn lại, dạng ra), tay trái giữ sổ, tay phải cầm bút vẽ mũi tên ----
  api.set("#M-pack", 0, { scale: 1.15 });
  api.origin("#butR", "0 0"); api.set("#butR", 0, { rotation: 150 });
  M.set(0, { x: WX, y: WY, size: 0.7, lashes: 0, ice: 0, legLs: 0.42, legRs: 0.42, legL: 58, legR: -58, aLu: 30, aLf: -40, aRu: -40, aRf: -60, pupX: 2, pupY: 12 });
  M.mouth(0, "smirk");
  HE.moHoi(api, "M", 0.4, DUR, 371);
  // vẽ mũi tên: tay phải nhích theo
  [tTherm - 0.6, tCold - 0.3].forEach(function (t0, i) {
    for (var k = 0; k < 4; k++) M.pose(t0 + k * 0.12, 0.12, { aRu: -40 - (k % 2 ? 10 : 0) - i * 8, aRf: -60 + (k % 2 ? 12 : 0) }, "sine.inOut");
  });
  M.pose(tFame, 0.2, { upRot: 4 }, "power2.out"); M.pose(tFame + 0.6, 0.3, { upRot: 0 }, "power2.inOut");
  M.mouth(tVis, "grin");
  M.idle(0, tVill, { seed: 372, bien: 0.8, tho: false });
  // lùi ra: nhìn ra thung lũng, rồi gấp sổ
  M.pose(tVill + 0.6, 0.4, { pupX: 11, pupY: -4, upRot: 3, aRu: -20, aRf: 10 }, "power2.inOut");
  M.mouth(tVill + 0.8, "X");
  M.pose(tFreeze, 0.3, { lid: 18 }, "power2.inOut");
  M.pose(tWel + 0.3, 0.3, { lid: 0, pupX: 6, pupY: 10, upRot: 0 }, "power2.inOut");
  var tGap = tEvery - 0.2;
  M.pose(tGap - 0.2, 0.25, { aRu: -60, aRf: -70 }, "power2.out");
  api.origin("#so-p", "0 0");
  api.key("#so-p", "scaleX", 0, 1); api.key("#so-p", "scaleX", tGap, 1, "none"); api.key("#so-p", "scaleX", tGap + 0.45, -1, "power2.inOut");
  api.show("#so-pf", 0, 1); api.show("#so-pf", tGap + 0.22, 0); api.show("#so-pb", 0, 0); api.show("#so-pb", tGap + 0.22, 1);
  api.sfx("bonk", tGap + 0.45, 0.25);
  M.pose(tGap + 0.5, 0.3, { aRu: -40, aRf: -60, pupX: 2, pupY: -2 }, "power2.inOut");
  M.mouth(tDoes, "smirk");
  M.pose(tDoes + 0.2, 0.4, { pupX: 10, pupY: -4, lid: 12 }, "power2.inOut");
  M.idle(tVill, DUR, { seed: 373, bien: 1.0, tho: false });
  M.breathe(0, DUR, 2.4);
  M.autoBlink(tVill + 0.5, DUR - 0.6, 3701);
  api.origin("#so", "0 0");
  api.key("#so", "y", 0, 0);
  for (var ts = 1.3, ss = 1; ts < DUR; ts += 1.2, ss = -ss) api.key("#so", "y", ts, ss * 1.2, "sine.inOut");
};

/* ===== Khối dùng chung các đoạn mùa hè nhóm cat-giay B (d31, d33, d35, d37) – chép y hệt vào từng canh.js vì đoạn
   không được sửa thư viện. Phông đồng cỏ mùa hè, áo lông của Wob, ngựa Yakut, tuyết rơi. Tất định theo seed. ===== */
window.HE_B = (function () {
  "use strict";
  function D() { return window.DaoCu; }
  /* defs riêng: lông thú, trời hè */
  function defs() {
    return "<defs>" +
      '<pattern id="furP" width="26" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(12)"><rect width="26" height="22" fill="#8A6240"/>' +
      '<path d="M 2 4 l 5 9 M 11 1 l 4 10 M 19 6 l 5 9 M 6 14 l 4 7 M 15 13 l 5 8" stroke="#5E3F27" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M 8 3 l 3 6 M 21 12 l 3 6" stroke="#B48A60" stroke-width="2" stroke-linecap="round"/></pattern>' +
      '<pattern id="furL" width="22" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-10)"><rect width="22" height="18" fill="#EADFC8"/>' +
      '<path d="M 3 3 l 3 7 M 11 1 l 3 8 M 17 6 l 3 7 M 7 11 l 3 6" stroke="#B9A98C" stroke-width="2" stroke-linecap="round"/></pattern>' +
      '<linearGradient id="skyHe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E69B0"/><stop offset="0.55" stop-color="#7DB6E0"/><stop offset="1" stop-color="#D9EED8"/></linearGradient>' +
      '<radialGradient id="nangG" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFF6C8" stop-opacity="0.9"/><stop offset="0.5" stop-color="#FFE68A" stop-opacity="0.35"/><stop offset="1" stop-color="#FFE68A" stop-opacity="0"/></radialGradient>' +
      "</defs>";
  }
  /* nhà gỗ mùa hè (mái tôn xanh rêu, không tuyết). Gốc: giữa chân tường. */
  function nhaHe(w, h, seed, mai) {
    var d = D(), s = "", rf = w * 0.3;
    s += d.paper(d.rRect(-w / 2, -h, w, h, 2, seed), "#8B6446", { stroke: true, sw: 5, half: 0.16 });
    for (var y = -h + 22; y < -6; y += 24) s += d.line("M " + (-w / 2 + 6) + " " + y + " L " + (w / 2 - 6) + " " + (y + 1), 3, "#3A2618", ' opacity="0.5"');
    s += d.paper(d.rough([[-w / 2 - 22, -h + 4], [0, -h - rf], [w / 2 + 22, -h + 4]], 2, seed + 1, 18), mai || "#4F6E5A", { stroke: true, sw: 5, half: 0.15 });
    s += d.paper(d.rRect(-w * 0.13, -h * 0.66, w * 0.26, h * 0.32, 1.5, seed + 2), "#CFE3EA", { stroke: true, sw: 4, shadow: false });
    s += d.line("M 0 " + d.f1(-h * 0.66) + " L 0 " + d.f1(-h * 0.34), 3);
    return s;
  }
  /* thông rụng lá mùa hè: tán xanh nhiều tầng. Gốc: gốc cây. */
  function thongHe(hh, seed) {
    var d = D(), r = d.rng(seed), s = d.line("M 0 0 L 0 " + (-hh), 6, "#4A3324");
    for (var k = 0; k < 4; k++) {
      var y0 = -hh * (0.28 + k * 0.2), w = hh * (0.3 - k * 0.055);
      s += d.paper(d.rough([[-w, y0 + 16], [0, y0 - hh * 0.26], [w, y0 + 16]], 2, seed + k, 12), k % 2 ? "#5E8C46" : "#6E9E50", { stroke: true, sw: 3.5, sx: 3, sy: 4, shOp: 0.18 });
    }
    return s;
  }
  /* đồng cỏ mùa hè. o: { seed, tu, den, mat, matTroi:[x,y], nha:[[x,w,h,mai]], nhaXa:[[x,y]], cay:[[x,y,h]], coCao (số bụi cỏ gần), tuyet (thêm nhóm phủ tuyết để nháy mùa đông) }
     Trả { troi, xa, giua, gan }. */
  function dongCo(api, o) {
    var d = D(), C = d.C, INK = d.INK, paper = d.paper, rough = d.rough, line = d.line, at = api.at, g = api.g;
    o = o || {};
    var seed = o.seed || 3300, X0 = o.tu == null ? -1400 : o.tu, X1 = o.den == null ? 5000 : o.den, MAT = o.mat || 872;
    var mt = o.matTroi || [1500, 190];
    var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#skyHe)"/>';
    var far = "";
    var fx0 = X0 * 0.35 - 1000, fx1 = X1 * 0.35 + 1600;
    far += '<circle cx="' + mt[0] + '" cy="' + mt[1] + '" r="210" fill="url(#nangG)"/>';
    far += '<circle cx="' + mt[0] + '" cy="' + mt[1] + '" r="78" fill="#FFF2B0" stroke="' + INK + '" stroke-width="4" stroke-opacity="0.5"/>';
    far += g("tiaNang", (function () { var s = ""; for (var a = 0; a < 12; a++) { var an = a * Math.PI / 6; s += line("M " + d.f1(mt[0] + 100 * Math.cos(an)) + " " + d.f1(mt[1] + 100 * Math.sin(an)) + " L " + d.f1(mt[0] + 140 * Math.cos(an)) + " " + d.f1(mt[1] + 140 * Math.sin(an)), 7, "#FFE68A"); } return s; })());
    api.origin("#tiaNang", mt[0] + " " + mt[1]);
    api.key("#tiaNang", "rotation", 0, 0, "none"); api.key("#tiaNang", "rotation", api.DUR, 3 * api.DUR, "none");
    var m0 = [[fx0, 1500], [fx0, 560]], h1 = [[fx0, 1500], [fx0, 640]], h2 = [[fx0, 1500], [fx0, 720]];
    for (var x = fx0; x <= fx1; x += 150) {
      m0.push([x, 520 + 70 * Math.sin(x / 520) + 30 * Math.sin(x / 170)]);
      h1.push([x, 620 + 40 * Math.sin(x / 400 + 2) + 16 * Math.sin(x / 120)]);
      h2.push([x, 712 + 24 * Math.sin(x / 300 + 1)]);
    }
    m0.push([fx1, 1500]); h1.push([fx1, 1500]); h2.push([fx1, 1500]);
    far += paper(rough(m0, 3, seed + 1, 30), "#7E9BB4", { shadow: false, stroke: true, sw: 3 });
    far += paper(rough(h1, 3, seed + 2, 30), "#6F9A55", { shadow: false, stroke: true, sw: 3 });
    for (var t = 0, tx = fx0 + 150; tx < fx1; t++, tx += 150 + (t % 3) * 50) far += at(tx, 650 + (t % 4) * 20, '<g transform="scale(' + (0.32 + (t % 3) * 0.06) + ')">' + thongHe(200 + (t % 5) * 20, seed + 10 + t) + "</g>");
    far += paper(rough(h2, 3, seed + 3, 30), "#A6C26E", { shadow: false, stroke: true, sw: 3 });
    (o.nhaXa || []).forEach(function (h, i) { far += at(h[0], h[1], '<g transform="scale(0.34)">' + nhaHe(300, 170, seed + 20 + i, i % 2 ? "#7A4A3A" : "#4F6E5A") + "</g>"); });
    if (o.tuyet) {
      var f2 = "";
      f2 += paper(rough(m0, 3, seed + 1, 30), "#DCE7EE", { shadow: false, stroke: true, sw: 3 });
      f2 += paper(rough(h1, 3, seed + 2, 30), "#EEF3F5", { shadow: false, stroke: true, sw: 3 });
      f2 += paper(rough(h2, 3, seed + 3, 30), "#F7FBFC", { shadow: false, stroke: true, sw: 3 });
      far += g("dongXa", f2);
    }
    // lớp giữa: cỏ xanh vàng, lối mòn đất, bụi cỏ, hoa
    var mid = "";
    mid += paper(rough([[X0, MAT], [X1, MAT - 4], [X1, MAT + 1700], [X0, MAT + 1700]], 3, seed + 30, 30), "#A3C25E", { shadow: false });
    mid += '<rect x="' + X0 + '" y="' + (MAT + 40) + '" width="' + (X1 - X0) + '" height="1660" fill="#93B652"/>';
    mid += paper("M " + X0 + " " + (MAT + 34) + " C " + (X0 + 1500) + " " + (MAT + 20) + " " + (X1 - 1500) + " " + (MAT + 44) + " " + X1 + " " + (MAT + 30) + " L " + X1 + " " + (MAT + 96) + " C " + (X1 - 1500) + " " + (MAT + 110) + " " + (X0 + 1500) + " " + (MAT + 90) + " " + X0 + " " + (MAT + 100) + " Z", "#CDB585", { shadow: false, stroke: true, sw: 3 });
    var r = d.rng(seed + 40);
    for (var k = 0; k < (X1 - X0) / 70; k++) {
      var gx = X0 + r() * (X1 - X0), gy = MAT + 6 + r() * 26;
      if (r() < 0.5) gy = MAT + 104 + r() * 120;
      mid += line("M " + d.f1(gx) + " " + d.f1(gy) + " l -6 -18 M " + d.f1(gx + 6) + " " + d.f1(gy) + " l 2 -22 M " + d.f1(gx + 12) + " " + d.f1(gy) + " l 8 -16", 3, "#4E7A34");
      if (r() < 0.35) mid += '<circle cx="' + d.f1(gx + 3) + '" cy="' + d.f1(gy - 20) + '" r="5" fill="' + ["#FFFDF6", "#F2C94C", "#B58AD0"][k % 3] + '" stroke="' + INK + '" stroke-width="1.5"/>';
    }
    (o.cay || []).forEach(function (c, i) { mid += at(c[0], c[1], thongHe(c[2], seed + 50 + i)); });
    (o.nha || []).forEach(function (h, i) { mid += at(h[0], MAT, nhaHe(h[1], h[2], seed + 60 + i, h[3])); });
    if (o.tuyet) mid += g("dongGiua", paper(rough([[X0, MAT - 6], [X1, MAT - 10], [X1, MAT + 1700], [X0, MAT + 1700]], 3, seed + 31, 30), "#F4F8FA", { shadow: false }) +
      '<rect x="' + X0 + '" y="' + (MAT + 120) + '" width="' + (X1 - X0) + '" height="1600" fill="url(#halfW)" opacity="0.4"/>');
    // lớp gần: bụi cỏ cao + hoa
    var near = "", nx0 = X0 * 1.4 - 600, nx1 = X1 * 1.4 + 600;
    for (var b = 0, bx = nx0; bx < nx1; b++, bx += 640 + (b % 3) * 120) {
      var bb = "";
      for (var q = 0; q < 9; q++) {
        var qx = bx + q * 22, qh = 110 + ((q * 37 + b * 13) % 60);
        bb += line("M " + qx + " 1120 C " + (qx - 4) + " " + (1120 - qh * 0.5) + " " + (qx + 10) + " " + (1120 - qh * 0.8) + " " + (qx + (q % 2 ? 22 : -14)) + " " + (1120 - qh), 6, INK) + line("M " + qx + " 1120 C " + (qx - 4) + " " + (1120 - qh * 0.5) + " " + (qx + 10) + " " + (1120 - qh * 0.8) + " " + (qx + (q % 2 ? 22 : -14)) + " " + (1120 - qh), 3.5, q % 3 ? "#6E9E50" : "#8DB860");
      }
      bb += '<circle cx="' + (bx + 60) + '" cy="' + 1000 + '" r="11" fill="#FFFDF6" stroke="' + INK + '" stroke-width="3"/><circle cx="' + (bx + 60) + '" cy="1000" r="4" fill="#F2C94C"/>';
      near += bb;
    }
    if (o.tuyet) near = near + g("dongGan", paper(rough([[nx0, 1300], [nx0, 1040], [nx1, 1030], [nx1, 1300]], 4, seed + 92, 26), "#F7FBFC", { shadow: false, stroke: true, sw: 4 }));
    return { troi: troi, xa: far, giua: mid, gan: near };
  }

  /* Áo lông cho Wob: chèn vào chuỗi SVG của con rối, ngay trước hai tay (nằm trong nhóm thân trên "-up").
     kieu: "trum" (mũ trùm + mũ lông, áo kín tới chân) | "mo" (áo khoác mở, vạt hai bên). Kèm lông mi rủ như cỏ héo và
     giọt mồ hôi (id: <id>-mh0..2, gốc ở đỉnh giọt). Dùng: W.svg = HE_B.mac(W.svg, id, kieu). */
  function mac(svg, id, kieu) {
    var d = D(), INK = d.INK, s = "";
    if (kieu === "trum") {
      var out = "M 40 348 C 18 230 36 40 200 18 C 364 40 382 230 360 348 C 300 366 100 366 40 348 Z";
      var hole = " M 100 182 C 100 124 146 88 200 88 C 254 88 300 124 300 182 C 300 240 254 276 200 276 C 146 276 100 240 100 182 Z";
      s += '<path d="' + out + hole + '" fill="#0b1214" opacity="0.2" fill-rule="evenodd" transform="translate(5,7)"/>';
      s += '<path d="' + out + hole + '" fill="url(#furP)" stroke="' + INK + '" stroke-width="6" fill-rule="evenodd" stroke-linejoin="round"/>';
      s += '<ellipse cx="200" cy="182" rx="104" ry="98" fill="none" stroke="' + INK + '" stroke-width="28"/><ellipse cx="200" cy="182" rx="104" ry="98" fill="none" stroke="url(#furL)" stroke-width="20"/>';
      s += d.line("M 200 280 L 200 356", 4, INK, ' opacity="0.5"') + '<circle cx="200" cy="304" r="7" fill="#E8C66A" stroke="' + INK + '" stroke-width="3"/><circle cx="200" cy="334" r="7" fill="#E8C66A" stroke="' + INK + '" stroke-width="3"/>';
      // mũ lông trên đỉnh
      s += '<path d="M 96 64 C 96 6 150 -18 200 -18 C 250 -18 304 6 304 64 C 260 50 140 50 96 64 Z" fill="url(#furL)" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
      s += '<path d="M 118 40 C 150 22 250 22 282 40" fill="none" stroke="#B9A98C" stroke-width="4"/>';
    } else {
      var L = "M 80 112 C 56 180 52 268 70 330 L 74 358 L 148 358 L 150 330 C 128 262 126 180 140 124 Z";
      var R = "M 320 112 C 344 180 348 268 330 330 L 326 358 L 252 358 L 250 330 C 272 262 274 180 260 124 Z";
      [L, R].forEach(function (p) {
        s += '<path d="' + p + '" fill="#0b1214" opacity="0.2" transform="translate(5,7)"/>';
        s += '<path d="' + p + '" fill="url(#furP)" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
      });
      s += d.line("M 140 126 C 126 184 128 262 150 330", 16, INK) + d.line("M 140 126 C 126 184 128 262 150 330", 10, "#EADFC8");
      s += d.line("M 260 126 C 274 184 272 262 250 330", 16, INK) + d.line("M 260 126 C 274 184 272 262 250 330", 10, "#EADFC8");
    }
    // lông mi rủ như cỏ héo
    [[160, 126], [238, 126]].forEach(function (e) {
      s += d.line("M " + (e[0] - 14) + " " + (e[1] + 2) + " C " + (e[0] - 26) + " " + (e[1] - 2) + " " + (e[0] - 32) + " " + (e[1] + 10) + " " + (e[0] - 30) + " " + (e[1] + 24) +
        " M " + e[0] + " " + (e[1] - 2) + " C " + (e[0] - 6) + " " + (e[1] - 14) + " " + (e[0] - 18) + " " + (e[1] - 8) + " " + (e[0] - 16) + " " + (e[1] + 10) +
        " M " + (e[0] + 14) + " " + (e[1] + 2) + " C " + (e[0] + 26) + " " + (e[1] - 4) + " " + (e[0] + 34) + " " + (e[1] + 8) + " " + (e[0] + 30) + " " + (e[1] + 22), 5, INK);
    });
    // giọt mồ hôi
    [[118, 104], [292, 118], [252, 70]].forEach(function (p, i) {
      s += '<g transform="translate(' + p[0] + "," + p[1] + ')"><g id="' + id + "-mh" + i + '"><path d="M 0 0 C -8 12 -10 20 0 24 C 10 20 8 12 0 0 Z" fill="#9FD3EA" stroke="' + INK + '" stroke-width="3"/></g></g>';
    });
    var mk = '<g transform="translate(88,210)">';
    var i = svg.lastIndexOf(mk);
    return svg.slice(0, i) + s + svg.slice(i);
  }
  /* mồ hôi chảy: mỗi giọt trượt xuống rồi rơi, lặp. */
  function moHoi(api, id, t0, t1, seed) {
    var r = window.DaoCu.rng(seed || 7);
    for (var i = 0; i < 3; i++) {
      var sel = "#" + id + "-mh" + i, per = 1.3 + r() * 0.6, ph = r() * per;
      api.origin(sel, "0 0");
      api.key(sel, "y", 0, 0); api.key(sel, "opacity", 0, 0, "step");
      for (var c = t0 + ph; c < t1; c += per) {
        api.key(sel, "y", c, 0, "step"); api.key(sel, "opacity", c, 1, "step");
        api.key(sel, "y", c + per * 0.7, 26, "sine.in"); api.key(sel, "y", c + per * 0.95, 70, "power2.in");
        api.key(sel, "opacity", c + per * 0.8, 1, "none"); api.key(sel, "opacity", c + per * 0.95, 0, "power1.in");
      }
    }
  }
  /* ba lô phồng có đuôi cá (bọc khăn kẻ ô) thò ra trên miệng – truyền vào opts.packExtra của api.wob */
  function duoiCa() {
    var INK = window.DaoCu.INK, C = window.DaoCu.C;
    return '<g transform="translate(318,70) rotate(-70) scale(0.7)"><path d="M 90 -5 L 134 -38 C 126 -14 126 14 134 38 L 90 5 Z" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="M 30 -32 C 70 -24 90 -12 96 -6 L 96 6 C 90 12 70 24 30 32 Z" fill="url(#plaid)" stroke="' + INK + '" stroke-width="6"/></g>';
  }

  /* Ngựa Yakut (nhìn nghiêng, quay trái): thấp, chân ngắn, thân tròn chắc, lông dày, bờm rậm.
     Gốc: mặt đất giữa bốn chân. Nhóm: <id>-dau (đầu+cổ, xoay quanh gốc cổ; -75 ≈ cúi gặm cỏ, 0 = ngẩng), <id>-duoi, <id>-mat (con ngươi), <id>-than.
     o: { long, bom, tuyet (lớp tuyết trên lưng, ẩn sẵn: <id>-tuyet) } */
  function ngua(id, o) {
    o = o || {};
    var d = D(), INK = d.INK, paper = d.paper, line = d.line, rough = d.rough;
    var L = o.long || "#D9D2C2", B = o.bom || "#7E766A", Ls = o.longToi || "#B9B09E", sd = o.seed || 3400;
    var s = '<g id="' + id + '">';
    s += '<ellipse cx="10" cy="4" rx="190" ry="16" fill="#0b1214" opacity="0.2"/>';
    // chân sau (tối hơn)
    [[-62, Ls], [70, Ls]].forEach(function (c, i) { s += paper(d.rRect(c[0] - 15, -150, 30, 138, 1.5, sd + i), c[1], { stroke: true, sw: 4.5, sx: 3, sy: 4 }) + '<rect x="' + (c[0] - 17) + '" y="-16" width="34" height="16" rx="5" fill="#3B3029" stroke="' + INK + '" stroke-width="4"/>'; });
    // đuôi
    s += '<g transform="translate(150,-214)"><g id="' + id + '-duoi">' + paper("M 0 0 C 34 10 52 60 40 120 C 36 150 22 170 30 188 C 8 180 -8 150 -6 110 C -4 70 -14 30 0 0 Z", B, { stroke: true, sw: 5, sx: 4, sy: 5 }) +
      line("M 6 20 C 22 60 22 110 12 160 M 22 30 C 34 70 32 110 26 150", 3, "#00000033") + "</g></g>";
    // thân
    s += '<g id="' + id + '-than">' + paper(rough(d.ptsEllipse(16, -206, 164, 94, 34), 5, sd + 5, 14), L, { stroke: true, sw: 5.5, half: 0.12 });
    s += '<path d="M -130 -160 C -60 -120 80 -118 170 -170" fill="none" stroke="' + Ls + '" stroke-width="10" opacity="0.6"/>';
    var r = d.rng(sd + 6);
    for (var k = 0; k < 16; k++) { var hx = -130 + k * 18, hy = -128 + Math.abs(k - 8) * 3; s += line("M " + hx + " " + d.f1(hy) + " l " + d.f1(r() * 6 - 3) + " 16", 3, INK, ' opacity="0.55"'); }
    s += g2(id + "-tuyet", paper(rough([[-110, -282], [-40, -300], [60, -302], [150, -280], [140, -264], [-100, -266]], 3, sd + 7, 16), "#F7FBFC", { stroke: true, sw: 4, shadow: false }));
    s += "</g>";
    // chân trước
    [-100, 30].forEach(function (x, i) { s += paper(d.rRect(x - 16, -150, 32, 140, 1.5, sd + 10 + i), L, { stroke: true, sw: 4.5, sx: 3, sy: 4 }) + '<rect x="' + (x - 18) + '" y="-16" width="36" height="16" rx="5" fill="#3B3029" stroke="' + INK + '" stroke-width="4"/>' + line("M " + (x - 14) + " -40 C " + (x - 4) + " -30 " + (x + 6) + " -30 " + (x + 16) + " -40", 3, INK, ' opacity="0.5"'); });
    // đầu + cổ (xoay quanh gốc cổ -110,-215)
    var dau = "";
    dau += line("M -110 -215 L -205 -335", 86, INK) + line("M -110 -215 L -205 -335", 76, L);
    dau += paper("M -178 -378 C -150 -368 -150 -336 -170 -314 L -282 -244 C -304 -230 -326 -252 -314 -276 L -232 -356 C -216 -374 -196 -382 -178 -378 Z", L, { stroke: true, sw: 5, sx: 4, sy: 5 });
    dau += '<path d="M -296 -232 C -318 -236 -330 -256 -316 -274 L -292 -282 C -300 -262 -294 -246 -276 -238 Z" fill="' + Ls + '"/>';
    dau += '<ellipse cx="-306" cy="-262" rx="5" ry="3.5" fill="' + INK + '"/>';
    dau += line("M -290 -236 C -284 -240 -276 -240 -270 -236", 3, INK);
    dau += '<path d="M -190 -372 L -180 -410 L -164 -370 Z" fill="' + L + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    dau += '<ellipse cx="-214" cy="-338" rx="11" ry="10" fill="#FFFDF6" stroke="' + INK + '" stroke-width="3"/>';
    dau += '<g id="' + id + '-mat"><circle cx="-217" cy="-337" r="5.5" fill="' + INK + '"/></g>';
    dau += line("M -226 -348 C -218 -352 -208 -352 -200 -346", 3.5, INK);
    // bờm rậm dọc cổ + chỏm trán
    var bom = "M -96 -238 ", bx2 = [[-108, -270], [-130, -284], [-150, -306], [-168, -326], [-184, -350], [-196, -372]];
    bx2.forEach(function (p, i) { bom += "L " + (p[0] + (i % 2 ? 16 : 26)) + " " + (p[1] + (i % 2 ? 4 : 14)) + " L " + p[0] + " " + p[1] + " "; });
    bom += "L -214 -384 L -176 -394 L -150 -350 L -120 -310 L -84 -264 Z";
    dau += paper(bom, B, { stroke: true, sw: 4.5, sx: 3, sy: 4 });
    dau += paper("M -200 -376 C -214 -368 -232 -360 -236 -344 C -220 -350 -206 -352 -196 -360 Z", B, { stroke: true, sw: 3.5, shadow: false });
    s += '<g id="' + id + '-dau">' + dau + "</g>";
    return s + "</g>";
    function g2(i, inner) { return '<g id="' + i + '">' + inner + "</g>"; }
  }
  /* gặm cỏ: cúi đầu, nhấm nhấm (đầu nhích nhẹ), đuôi phẩy. */
  function gam(api, id, t0, t1, seed) {
    var r = window.DaoCu.rng(seed || 3), sel = "#" + id + "-dau";
    api.key(sel, "rotation", t0, -80, "power2.inOut");
    for (var t = t0 + 0.4 + r() * 0.3; t < t1 - 0.2; t += 0.32 + r() * 0.2) api.key(sel, "rotation", t, -80 + (r() < 0.5 ? 3 : -2) - r() * 2, "sine.inOut");
  }
  function phayDuoi(api, id, t0, t1, seed) {
    var r = window.DaoCu.rng(seed || 5), sel = "#" + id + "-duoi";
    api.key(sel, "rotation", t0, 0, "none");
    for (var t = t0 + 0.5 + r(); t < t1 - 0.6; t += 1.4 + r() * 1.6) { api.key(sel, "rotation", t, 0, "none"); api.key(sel, "rotation", t + 0.2, 14, "power2.out"); api.key(sel, "rotation", t + 0.45, -6, "sine.inOut"); api.key(sel, "rotation", t + 0.7, 0, "sine.out"); }
  }
  function tuyetRoi(api, pre, n, seed, o) {
    var d = D(), r = d.rng(seed), s = "", DUR = api.DUR;
    for (var i = 0; i < n; i++) {
      var id = pre + i, sel = "#" + id, x = o.x0 + r() * (o.x1 - o.x0), rr = (o.r || 5) * (0.6 + r() * 0.8);
      var H = o.y1 - o.y0, v = (o.toc || 60) * (0.7 + r() * 0.6), per = H / v, tc = -r() * per;
      s += api.at(d.f1(x), o.y0, api.g(id, '<circle cx="0" cy="0" r="' + d.f1(rr) + '" fill="#F7FBFC" opacity="0.9"/>'));
      api.origin(sel, "0 0");
      api.key(sel, "y", 0, -tc * v, "none");
      for (var c = tc + per; c < DUR + per; c += per) { api.key(sel, "y", c, H, "none"); api.key(sel, "y", c, 0, "step"); }
    }
    return s;
  }
  return { defs: defs, nhaHe: nhaHe, thongHe: thongHe, dongCo: dongCo, mac: mac, moHoi: moHoi, duoiCa: duoiCa, ngua: ngua, gam: gam, phayDuoi: phayDuoi, tuyetRoi: tuyetRoi };
})();
