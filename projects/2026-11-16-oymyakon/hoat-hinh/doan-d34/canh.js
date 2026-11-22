/* d34 · vẽ tay · trang sổ: ngựa Yakut thích nghi nhanh (545,79–563,97 s tuyệt đối; 18,18 s). Vào "cat", ra "cat".
 * Wob (không mũ, áo lông mở, ba lô) đứng trên trang sổ phác thảo làm người dẫn. Chữ duy nhất: "2015".
 * S1 tờ nghiên cứu vẽ tay "2015" + xoắn ADN · S2 cuốn lịch lật ngược nhanh vài trang rồi dừng (trang ngả vàng dần, không chữ số)
 * · S3 con ngựa nhà nhỏ (có dây dàm) bước ra từ trang lịch · S4 khung chuyển sang mùa đông, ngựa run, phồng lông như cuộn len, thân tròn chắc nịch
 * · S5 (tưởng tượng, viền mây) Wob thử áo khoác quá chật, bung cúc · S6 lông tự mọc thành áo trên người Wob; Wob ngắm, hài lòng.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, INK = C.ink, GROUND = 900, WS = 0.78;
  var FUR = "#8B5E3C", FURD = "#6A4428", TRIM = "#F3E9D6", PAGE = "#FBF6E9";
  var T_STUDY = VT.tu("study"), T_TWENTY = VT.tu("twenty"), T_DESCEND = VT.tu("descend"), T_HORSES = VT.tu("horses"), T_BROUGHT = VT.tu("brought"), T_AGO = VT.tu("ago");
  var T_COLD = VT.tu("cold"), T_FAST = VT.tu("fast"), T_COMPACT = VT.tu("compact"), T_THICK = VT.tu("thick"), T_COATS = VT.tu("coats");
  var T_JACKET = VT.tu("jacket", 0), T_BODY = VT.tu("body"), T_GROWS = VT.tu("grows"), T_JACKET2 = VT.tu("jacket", 1);
  var N = D.nhip.map(function (n) { return n.tai; }), END = D.thoi_luong;
  var A2 = N[1], A3 = N[2], A4 = N[3], A4b = 10.1, A5 = N[4], A6 = N[5];

  // ---------- trang sổ ----------
  function page(t, winter) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + PAGE + '"/>';
    for (var y = 60; y < 1100; y += 64) s += VT.line("M -400 " + y + " L 2400 " + y, 2.5, "#7FA6C9", 0.35);
    s += VT.line("M 150 -200 L 150 1300", 3, "#D9543C", 0.45);
    if (winter > 0) s += '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#CFE3EE" opacity="' + f(0.6 * winter * 100) / 100 + '"/>';
    s += VT.line("M -200 " + GROUND + " C 300 " + (GROUND - 6) + " 900 " + (GROUND + 8) + " 2200 " + (GROUND - 4), 6, INK, 0.85);
    if (winter > 0) s += VT.shape("M -200 " + GROUND + " C 300 " + (GROUND - 30 * winter) + " 900 " + (GROUND - 20 * winter) + " 2200 " + (GROUND - 30 * winter) + " L 2200 " + (GROUND + 30) + " L -200 " + (GROUND + 30) + " Z", C.snow, { sw: 4, op: winter });
    return s;
  }
  // ---------- áo lông mở + tay áo (như d32, d33) ----------
  function flapL() {
    var outer = [[146, 56], [104, 76], [68, 126], [52, 198], [58, 268], [84, 320], [120, 350], [172, 358]];
    var inner = [[174, 348], [152, 292], [136, 228], [126, 162], [130, 108], [148, 70]];
    var out = VT.shape(VT.smooth(outer.concat(inner), true), FUR, { sw: 6 });
    out += VT.line("M 84 150 q 8 14 0 28 M 74 222 q 10 12 2 26 M 98 286 q 10 10 4 24 M 106 112 q 8 10 2 22 M 112 200 q 8 12 2 24", 4, FURD, 0.8);
    var band = VT.smooth([[150, 64], [130, 108], [126, 162], [136, 228], [152, 292], [170, 350], [124, 352], [80, 330]], false);
    return out + VT.line(band, 30) + VT.line(band, 21, TRIM);
  }
  var FLAP = flapL(), COAT_OPEN = FLAP + VT.g("translate(400 0) scale(-1 1)", FLAP);
  var SHO = { l: [88, 212], r: [312, 212] };
  function armQ(side, spec) {
    var sh = SHO[side], hx = spec[0], hy = spec[1], dx = hx - sh[0], dy = hy - sh[1], d = Math.sqrt(dx * dx + dy * dy) || 1;
    var bend = d < 128 ? Math.sqrt(128 * 128 - d * d) * 0.55 : 0, nx = -dy / d, ny = dx / d, sg = side === "l" ? -1 : 1;
    if (nx * sg + 0.6 * ny < 0) { nx = -nx; ny = -ny; }
    return [sh, [(sh[0] + hx) / 2 + nx * bend, (sh[1] + hy) / 2 + ny * bend], [hx, hy]];
  }
  function sleeves(o, col, cuff) {
    var pre = VT.ARM[o.arms || "rest"] || VT.ARM.rest, out = "";
    [["l", o.armL || pre.l], ["r", o.armR || pre.r]].forEach(function (a) {
      var q = armQ(a[0], a[1]), pts = [];
      for (var i = 0; i <= 6; i++) { var u = 0.66 * i / 6, w = 1 - u; pts.push([w * w * q[0][0] + 2 * w * u * q[1][0] + u * u * q[2][0], w * w * q[0][1] + 2 * w * u * q[1][1] + u * u * q[2][1]]); }
      var d = VT.smooth(pts, false), e = pts[6], pe = pts[5], ang = Math.atan2(e[1] - pe[1], e[0] - pe[0]);
      out += VT.line(d, 36) + VT.line(d, 26, col || FUR);
      out += VT.line("M " + f(e[0] - Math.sin(ang) * 20) + " " + f(e[1] + Math.cos(ang) * 20) + " L " + f(e[0] + Math.sin(ang) * 20) + " " + f(e[1] - Math.cos(ang) * 20), 22) + VT.line("M " + f(e[0] - Math.sin(ang) * 17) + " " + f(e[1] + Math.cos(ang) * 17) + " L " + f(e[0] + Math.sin(ang) * 17) + " " + f(e[1] - Math.cos(ang) * 17), 14, cuff || TRIM);
    });
    return out;
  }
  function W(t, o) {
    var b = { t: t, s: WS, cold: false, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes !== "happy" && b.eyes !== "closed" && b.eyes !== "squint") b.lid = Math.max(b.lid || 0, VT.blink(t, 2.9, 0.2));
    if (!o.noCoat) b.prop = COAT_OPEN + sleeves(b) + (o.prop || "");
    return VT.wob(b);
  }

  // ---------- ngựa: gốc giữa hai chân trên đất, nhìn phải. fluff 0 ngựa nhà thon → 1 ngựa Yakut tròn, lông dày ----------
  function horse(o) {
    var fl = o.fluff || 0, L = VT.lerp(150, 78, fl), rx = VT.lerp(150, 158, fl), ry = VT.lerp(60, 104, fl), by = -L - ry * 0.7, n = Math.round((o.t || 0) * 12);
    var coat = fl > 0.05 ? "#B98A5E" : "#A8744F", out = [];
    var ph = (o.phase || 0) * 2 * Math.PI, sw = o.walking ? 1 : 0;
    var leg = function (x, k, back) {
      var a = sw * Math.sin(ph + k) * 22, top = [x, by + ry * 0.5], foot = [x + a, 0 - (sw ? Math.max(0, Math.sin(ph + k)) * 14 : 0)];
      return VT.line("M " + f(top[0]) + " " + f(top[1]) + " L " + f(foot[0]) + " " + f(foot[1] - 14), 22 + fl * 10, back ? "#6E4A30" : INK) + VT.line("M " + f(top[0]) + " " + f(top[1]) + " L " + f(foot[0]) + " " + f(foot[1] - 14), 13 + fl * 10, back ? "#8E6240" : coat) + VT.shape("M " + f(foot[0] - 14) + " " + f(foot[1]) + " L " + f(foot[0] + 16) + " " + f(foot[1]) + " L " + f(foot[0] + 12) + " " + f(foot[1] - 18) + " L " + f(foot[0] - 12) + " " + f(foot[1] - 18) + " Z", "#3a2a20", { sw: 4, ox: 1, oy: 1 });
    };
    out.push(leg(-rx * 0.55, Math.PI, true) + leg(rx * 0.5, 0, true));
    // đuôi
    out.push(VT.line("M " + f(-rx + 6) + " " + f(by - 10) + " C " + f(-rx - 50) + " " + f(by + 10) + " " + f(-rx - 40) + " " + f(by + 70) + " " + f(-rx - 60) + " " + f(by + 110 - fl * 30), 20 + fl * 14, "#3a2a20"));
    // thân (viền lông xù theo fluff)
    var pts = [], NP = 30;
    for (var i = 0; i < NP; i++) { var a = i / NP * Math.PI * 2, r = 1 + (i % 2 ? 1 : -1) * (0.012 + fl * 0.035) + (VT.hash(i + n * 0.0) - 0.5) * fl * 0.04; pts.push([Math.cos(a) * rx * r, by + Math.sin(a) * ry * r]); }
    out.push(VT.shape(VT.smooth(pts, true), coat, { sw: 6 }));
    if (fl > 0.15) for (var hh = 0; hh < 11; hh++) { var hx0 = -rx * 0.8 + hh * rx * 0.16, hy0 = by + ry * 0.85 * Math.sqrt(Math.max(0, 1 - Math.pow(hx0 / rx, 2))); out.push(VT.line("M " + f(hx0) + " " + f(hy0 - 6) + " q " + f(4 + (hh % 3) * 2) + " " + f(16 * fl) + " " + f(-2) + " " + f(30 * fl + 6), 7, "#8A6040", 0.95)); }
    if (fl > 0.2) for (var j = 0; j < 7; j++) { var xx = -rx * 0.7 + j * rx * 0.23, yy = by - ry * 0.2 + (j % 2) * ry * 0.4; out.push(VT.line("M " + f(xx) + " " + f(yy) + " q 8 10 0 22", 4, "#8A6040", fl)); }
    // cổ + đầu
    var hx = rx * 0.78 + 30, hy = by - VT.lerp(130, 90, fl) + (o.nod || 0);
    out.push(VT.shape("M " + f(rx * 0.45) + " " + f(by - ry * 0.6) + " L " + f(hx - 10) + " " + f(hy - 20) + " L " + f(hx + 40) + " " + f(hy + 6) + " L " + f(rx * 0.9) + " " + f(by + ry * 0.1) + " Z", coat, { sw: 6 }));
    out.push(VT.g("rotate(28 " + f(hx + 30) + " " + f(hy) + ")", VT.shape("M " + f(hx - 10) + " " + f(hy - 30) + " C " + f(hx + 40) + " " + f(hy - 40) + " " + f(hx + 110) + " " + f(hy - 20) + " " + f(hx + 112) + " " + f(hy + 8) + " C " + f(hx + 112) + " " + f(hy + 34) + " " + f(hx + 20) + " " + f(hy + 34) + " " + f(hx - 10) + " " + f(hy + 20) + " Z", coat, { sw: 6 }) +
      VT.dot(hx + 96, hy + 4, 4) + VT.line("M " + f(hx + 50) + " " + f(hy - 30) + " L " + f(hx + 56) + " " + f(hy + 30), 6, "#D9543C") + VT.line("M " + f(hx + 56) + " " + f(hy + 10) + " L " + f(hx + 112) + " " + f(hy + 2), 5, "#D9543C")));
    out.push(VT.shape("M " + f(hx - 4) + " " + f(hy - 34) + " L " + f(hx + 4) + " " + f(hy - 62) + " L " + f(hx + 16) + " " + f(hy - 30) + " Z", coat, { sw: 5 }));
    out.push(VT.dot(hx + 26, hy - 12, 7) + VT.dot(hx + 28, hy - 14, 2.5, "#ffffff"));
    // bờm
    for (var m = 0; m < 6; m++) { var u = m / 5, mx = VT.lerp(hx - 6, rx * 0.4, u), my = VT.lerp(hy - 26, by - ry * 0.7, u); out.push(VT.line("M " + f(mx) + " " + f(my) + " q " + f(-18 - fl * 16) + " 6 " + f(-24 - fl * 20) + " " + f(26 + fl * 16), 9 + fl * 6, "#3a2a20")); }
    var jx = o.shiver ? (VT.hash(n * 3.7) - 0.5) * 2 * o.shiver : 0;
    var sqk = o.sq || 1;
    return VT.g(VT.tr(o.x + jx, o.y, o.s, 0, o.flip || 1) + (sqk !== 1 ? " scale(" + f(1 / Math.sqrt(sqk) * 100) / 100 + " " + sqk + ")" : ""), out.join(""));
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }
  var WX = 480;

  // ===== S1 · tờ nghiên cứu "2015" + xoắn ADN =====
  var POP = 0.12, TAP = T_TWENTY - 0.05;
  VT.sfx("pop", POP, 0.6); VT.sfx("ting", TAP + 0.08, 0.45);
  function paperSheet(t, k, bounce) {
    var out = VT.shape("M -280 -360 L 280 -350 L 290 360 L -270 370 Z", "#FFFFFF", { sw: 6, ox: 10, oy: 10 });
    out += VT.g(VT.tr(-80, -250, bounce), VT.text(0, 36, "2015", 112, { w: 900 }));
    [-120, -60].forEach(function (y) { out += VT.line("M 20 " + y + " C 80 " + (y - 8) + " 140 " + (y + 8) + " 230 " + y, 5, "#7d8a91", 0.8); });
    out += VT.line("M -230 300 C -100 292 40 308 230 296 M -230 250 C -120 244 0 256 160 248", 5, "#7d8a91", 0.8);
    // xoắn ADN: hai sợi sin lệch pha, bậc thang nối
    var ph = Math.round(t * 12) * 0.35, a = "", b = "";
    for (var i = 0; i <= 24; i++) { var y = -20 + i * 10, x1 = Math.sin(i * 0.42 + ph) * 90, x2 = Math.sin(i * 0.42 + ph + Math.PI) * 90; a += (i ? " L " : "M ") + f(x1) + " " + f(y); b += (i ? " L " : "M ") + f(x2) + " " + f(y); if (i % 3 === 0) out += VT.line("M " + f(x1) + " " + f(y) + " L " + f(x2) + " " + f(y), 4, i % 2 ? C.accent : C.sea, 0.9); }
    out += VT.line(a, 8, C.sea) + VT.line(b, 8, C.accent);
    return VT.g(VT.tr(1180, 480, k, -3), out);
  }
  shot(0, A2, "tờ nghiên cứu 2015", function (t, lt, T) {
    var k = key(t, [[POP - 0.05, 0.2], [POP + 0.25, 1, "back"]]), bounce = key(t, [[TAP, 1], [TAP + 0.1, 1.18, "out"], [TAP + 0.45, 1, "elastic"]]);
    var o = { x: WX, y: GROUND, flip: 1, px: 12, py: -6, brows: "up", mouth: "content" };
    var reach = key(t, [[TAP - 0.4, 0], [TAP, 1, "out"], [TAP + 0.6, 1], [A2, 0.2, "io"]]);
    o.armR = VT.mix([338, 300], [560, 10], reach); o.handR = "chi";
    if (t >= TAP) { o.eyes = "happy"; o.mouth = "smile"; }
    var s = page(t, 0) + paperSheet(t, k, bounce) + W(t, o);
    var z = key(T, [[0, 1.0], [A2, 1.06, "sine"]]);
    return { cam: [900, 560, z], world: s, tint: "warm" };
  });

  // ===== S2 · cuốn lịch lật ngược nhanh rồi dừng =====
  var CAL = [1180, 300], CW = 420, CH = 520, FLIPS = [], tt = A2 + 0.08;
  [0.32, 0.24, 0.18, 0.14, 0.14, 0.18, 0.3].forEach(function (d) { FLIPS.push([tt, tt + d]); tt += d * 0.92; });
  var STOP = FLIPS[FLIPS.length - 1][1];
  VT.sfx("whoosh", A2 + 0.08, 0.35); VT.sfx("bonk", STOP, 0.4);
  var PCOL = ["#FFFFFF", "#FCF6E6", "#F8EDD2", "#F3E3BC", "#EEDAA8", "#E8CF95", "#E2C483", "#DCB873"];
  function calPage(col, horseIn) {
    var out = VT.shape("M -210 0 L 210 0 L 210 " + CH + " L -210 " + CH + " Z", col, { sw: 5, ox: 4, oy: 4 });
    out += VT.shape("M -190 24 L 190 24 L 190 100 L -190 100 Z", "#D9543C", { sw: 4, op: 0.85 });
    if (!horseIn) for (var r = 0; r < 5; r++) for (var c = 0; c < 7; c++) out += VT.dot(-160 + c * 53, 150 + r * 72, 7, "#7d8a91");
    return out;
  }
  function calendar(t, nFlipped, flipK, horseIn) {
    var out = VT.shape("M " + (CAL[0] - 236) + " " + (CAL[1] - 40) + " L " + (CAL[0] + 236) + " " + (CAL[1] - 40) + " L " + (CAL[0] + 236) + " " + (CAL[1] + CH + 30) + " L " + (CAL[0] - 236) + " " + (CAL[1] + CH + 30) + " Z", C.woodDark, { sw: 6 });
    var cur = Math.min(PCOL.length - 1, nFlipped);
    out += VT.g(VT.tr(CAL[0], CAL[1], 1), calPage(PCOL[cur], horseIn && cur === PCOL.length - 1));
    if (flipK > 0 && flipK < 1) { // trang cũ hơn rơi từ trên xuống đè lên (lật ngược thời gian)
      var c = Math.cos((1 - flipK) * Math.PI), col = PCOL[Math.min(PCOL.length - 1, nFlipped + 1)];
      out += VT.g("translate(" + CAL[0] + " " + CAL[1] + ") scale(1 " + f(c * 100) / 100 + ")", c > 0 ? calPage(col, false) : VT.shape("M -210 0 L 210 0 L 210 " + CH + " L -210 " + CH + " Z", "#E9E2D0", { sw: 5 }));
    }
    [-150, -50, 50, 150].forEach(function (x) { out += VT.ell(CAL[0] + x, CAL[1] - 6, 12, 22, "none", 6); });
    out += VT.dot(CAL[0], CAL[1] - 60, 9) + VT.line("M " + (CAL[0] - 120) + " " + (CAL[1] - 40) + " L " + CAL[0] + " " + (CAL[1] - 60) + " L " + (CAL[0] + 120) + " " + (CAL[1] - 40), 4);
    return out;
  }
  function flipState(t) {
    var n = 0, k = 0;
    FLIPS.forEach(function (fp, i) { if (t >= fp[1]) n = i + 1; else if (t >= fp[0]) k = seg(t, fp[0], fp[1]); });
    return [n, k];
  }
  shot(A2, A3, "lịch lật ngược", function (t, lt, T) {
    var st = flipState(t);
    var o = { x: WX + 60, y: GROUND, flip: 1, eyes: "wide", px: 10, py: st[1] > 0 ? -14 + 20 * st[1] : -6, brows: "up", mouth: "o", noBlink: true, lean: -4 };
    if (t >= STOP) { o.eyes = "open"; o.mouth = "oSmall"; o.lean = key(t, [[STOP, -4], [STOP + 0.3, 3, "back"]]); }
    var s = page(t, 0) + calendar(t, st[0], st[1], true) + W(t, o);
    if (t < STOP) s += VT.speedLines({ x0: CAL[0] - 330, y0: CAL[1] - 20, n: 4, gap: 60, len: 70, dx: 0, dy: 1, sw: 5 });
    var z = key(T, [[A2, 1.05], [A3, 1.12, "sine"]]);
    return { cam: [960, 560, z], shake: VT.shake(t, STOP, 0.15, 4), world: s, tint: "warm" };
  });

  // ===== S3 · con ngựa nhà nhỏ bước ra từ trang lịch =====
  var OUT0 = A3 + 0.15, OUT1 = T_BROUGHT + 0.35, TROT1 = T_AGO - 0.3;
  VT.sfx("boing", OUT1, 0.35);
  VT.sfx("liu-lo-vui", T_AGO - 0.2, 0.45);
  shot(A3, A4, "ngựa bước ra", function (t, lt, T) {
    var s = page(t, 0) + calendar(t, PCOL.length - 1, 0, t < OUT0);
    var hp;
    if (t < OUT0) hp = { x: CAL[0] - 30, y: CAL[1] + 440, s: 0.42 };
    else if (t < OUT1) { var k = seg(t, OUT0, OUT1); hp = { x: VT.lerp(CAL[0] - 30, 1100, k), y: VT.lerp(CAL[1] + 440, GROUND, k) - 160 * Math.sin(k * Math.PI), s: VT.lerp(0.42, 0.7, k), sq: k > 0.9 ? 0.85 : 1 }; }
    else { var w = VT.buoc(t, { t0: OUT1, t1: TROT1, x0: 1100, x1: 860, chuKy: 0.5, s: 0.7 }); hp = { x: w.x, y: GROUND, s: 0.7, walking: w.walking, phase: w.phase, flip: -1 }; }
    hp.t = t; hp.fluff = 0; hp.flip = hp.flip || -1;
    if (t >= TROT1) hp.nod = 10 * Math.sin(seg(t, TROT1, TROT1 + 0.6) * Math.PI * 2);
    s += horse(hp);
    var o = { x: WX, y: GROUND, flip: 1, px: 12, py: 4, brows: "up", mouth: "oSmall" };
    if (t >= T_BROUGHT) { o.eyes = "happy"; o.mouth = "smile"; o.arms = null; o.armR = [370, 60 + 20 * Math.sin(t * 14)]; o.handR = "xoe"; }
    s += W(t, o);
    var z = key(T, [[A3, 1.12], [A4, 1.2, "sine"]]);
    return { cam: [key(T, [[A3, 960], [A4, 820, "io"]]), 600, z], world: s, tint: "warm" };
  });

  // ===== S4 · mùa đông: ngựa run rồi phồng lông như cuộn len; thân tròn chắc nịch =====
  var WIN = A4 + 0.1, PUFF = T_FAST - 0.05, POKE = T_COATS + 0.15;
  VT.sfx("brr", T_COLD, 0.45); VT.sfx("boing", PUFF, 0.75); VT.sfx("boing", T_THICK, 0.4); VT.sfx("pop", POKE + 0.2, 0.35);
  function winterHorse(t) {
    var fl = key(t, [[PUFF, 0], [PUFF + 0.35, 0.6, "back"], [T_COMPACT, 0.6], [T_COMPACT + 0.5, 0.85, "io"], [T_THICK, 0.85], [T_THICK + 0.5, 1, "back"]]);
    var sq = t >= PUFF && t < PUFF + 0.35 ? key(t, [[PUFF, 1.15], [PUFF + 0.35, 1, "elastic"]]) : 1;
    return horse({ x: 860, y: GROUND, s: 0.7, flip: -1, fluff: fl, t: t, shiver: t >= T_COLD && t < PUFF ? 5 : 0, sq: sq });
  }
  shot(A4, A4b, "mùa đông tới, ngựa phồng lông", function (t, lt, T) {
    var w = seg(t, WIN, WIN + 0.6);
    var s = page(t, w) + winterHorse(t);
    s += VT.snowfall(t, Math.round(30 * w), [-200, -100, 2100, 900], 70);
    var o = { x: WX, y: GROUND, flip: 1, px: 12, py: 2, brows: "up", mouth: "oSmall", cold: w > 0.5 };
    if (t >= T_COLD - 0.1) { o.arms = "hug"; o.shiver = t < PUFF ? 3 : 1; o.mouth = t < PUFF ? (Math.round(t * 12) % 2 ? "chatter" : "chatter2") : "o"; o.brows = "worried"; }
    if (t >= PUFF) { o.eyes = "wide"; o.brows = "up"; o.sq = key(t, [[PUFF, 1.08], [PUFF + 0.3, 1, "out"]]); }
    s += W(t, o);
    if (t >= PUFF && t < PUFF + 0.3) s += VT.radialLines(860, GROUND - 160, 200, 300, 14, 3, 6);
    var z = key(T, [[A4, 1.12], [A4b, 1.2, "sine"]]);
    return { cam: [760, 620, z], shake: VT.shake(t, PUFF, 0.2, 6), world: s, tint: "cold" };
  });
  shot(A4b, A5, "ngựa tròn, lông dày; Wob chọc thử", function (t, lt, T) {
    var s = page(t, 1) + VT.snowfall(t, 30, [-200, -100, 2100, 900], 70) + winterHorse(t);
    var o = { x: 560, y: GROUND, flip: 1, px: 14, py: 0, brows: "up", mouth: "oSmall", cold: true, legs: "tiptoe" };
    var reach = key(t, [[POKE - 0.4, 0], [POKE, 1, "out"], [POKE + 0.5, 1], [A5, 0.3, "io"]]);
    o.armR = VT.mix([338, 300], [636, 262], reach); o.handR = reach > 0.8 ? "tron" : "chi";
    if (t >= POKE) { o.eyes = "happy"; o.mouth = "smile"; }
    s += W(t, o);
    if (t >= POKE && t < POKE + 0.5) { var hp = VT.wobPt({ x: 560, y: GROUND, s: WS }, 636, 262); s += VT.sparkle({ x: hp[0] + 20, y: hp[1] - 50, s: 0.5 }) + VT.knockLines({ x: hp[0] + 10, y: hp[1], s: 0.5, k: seg(t, POKE, POKE + 0.5) }); }
    var z = key(T, [[A4b, 1.6], [A5, 1.72, "sine"]]);
    return { cam: [760, 690, z], world: s, tint: "cold" };
  });

  // ---------- tưởng tượng: viền mây ----------
  function cloudFrame(k) {
    var pts = [], NN = 36, rx = 900 + (1 - k) * 600, ry = 480 + (1 - k) * 400;
    for (var i = 0; i < NN; i++) { var a = i / NN * Math.PI * 2, r = i % 2 ? 1 : 0.94; pts.push([960 + Math.cos(a) * rx * r, 540 + Math.sin(a) * ry * r]); }
    var hole = VT.smooth(pts, true);
    return '<path d="M -40 -40 L 1960 -40 L 1960 1120 L -40 1120 Z ' + hole + '" fill="#FBF6E9" fill-rule="evenodd"/><path d="' + hole + '" fill="none" stroke="' + INK + '" stroke-width="7"/>';
  }
  function shop(t) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#F2E3CC"/>' + VT.shape("M -400 " + GROUND + " L 2400 " + GROUND + " L 2400 1400 L -400 1400 Z", "#C79A6A", { sw: 6, ox: 0, oy: 4 });
    s += VT.line("M 1100 420 L 1700 420", 12) + VT.line("M 1120 420 L 1120 " + GROUND + " M 1680 420 L 1680 " + GROUND, 10);
    ["#5B7FA6", "#D9543C", "#6E9F45", "#E8C25A"].forEach(function (c, i) { var x = 1200 + i * 130; s += VT.line("M " + x + " 420 l 0 20", 5) + VT.shape("M " + (x - 50) + " 450 L " + (x + 50) + " 450 L " + (x + 56) + " 640 L " + (x - 56) + " 640 Z", c, { sw: 5 }); });
    s += VT.shape("M 300 200 L 520 200 L 520 760 L 300 760 Z", "#DCEFF6", { sw: 7 }) + VT.line("M 330 240 L 380 300 M 330 320 L 420 420", 5, "#ffffff", 0.9);
    return s;
  }
  // áo khoác chật (hệ Wob): bó chặt thân, vạch căng, cúc
  function tightJacket(pop) {
    var out = VT.shape("M 92 120 C 70 180 76 260 112 312 L 288 312 C 324 260 330 180 308 120 C 300 250 100 250 92 120 Z", "#5B7FA6", { sw: 6 });
    out += VT.line("M 200 250 L 200 312", 5) + VT.line("M 150 270 l 30 -12 M 220 258 l 30 12 M 140 296 l 34 -10 M 226 286 l 34 10", 3, INK, 0.6);
    if (!pop) out += VT.ell(200, 280, 9, 9, "#E8C25A", 4, { ox: 0, oy: 0 });
    return out;
  }

  // ===== S5 · tưởng tượng: áo khoác quá chật, bung cúc =====
  var BTN = T_JACKET + 0.1;
  VT.sfx("pop", A5 + 0.02, 0.4); VT.sfx("pop", BTN, 0.8);
  shot(A5, A6, "áo khoác quá chật", function (t, lt, T) {
    var s = shop(t);
    var squeeze = key(t, [[A5 + 0.2, 1], [BTN - 0.1, 1.16, "in2"], [BTN + 0.05, 1.04, "out"], [A6, 1.06]]);
    var o = { x: 760, y: GROUND, flip: 1, noCoat: true, sxRaw: 1 / squeeze, sq: squeeze, eyes: t < BTN ? "squint" : "wide", mouth: t < BTN ? "G" : "o", arms: "low", marks: t < BTN ? "sweat" : null, noBlink: true };
    o.prop = tightJacket(t >= BTN) + sleeves({ arms: "low" }, "#5B7FA6", "#41607F");
    s += W(t, o);
    if (t >= BTN) { var k = seg(t, BTN, BTN + 0.6), p0 = VT.wobPt({ x: 760, y: GROUND, s: WS }, 200, 280); s += VT.ell(p0[0] + 260 * k, p0[1] - 200 * k + 300 * k * k, 9, 9, "#E8C25A", 4) + (k < 0.3 ? VT.impact({ x: p0[0], y: p0[1], s: 0.3 }) : ""); }
    var z = key(T, [[A5, 1.2], [A6, 1.3, "sine"]]);
    return { cam: [900, 640, z], shake: VT.shake(t, BTN, 0.15, 5), world: s, over: cloudFrame(key(T, [[A5, 0.3], [A5 + 0.25, 1, "back"]])), tint: "warm" };
  });

  // ===== S6 · lông tự mọc thành áo; Wob ngắm, hài lòng =====
  var GROW0 = T_BODY - 0.1, GROW1 = T_JACKET2 + 0.2, HAPPY = T_JACKET2 + 0.3;
  VT.sfx("boing", T_GROWS, 0.4); VT.sfx("ting", HAPPY, 0.45);
  var COAT_FUR = (function () {
    var pts = [];
    for (var i = 0; i < 40; i++) { var a = i / 40 * Math.PI * 2, r = i % 2 ? 1.0 : 1.07; pts.push([200 + 140 * Math.cos(a) * r, 196 + 156 * Math.sin(a) * r]); }
    var hole = "M 108 168 A 92 86 0 1 0 292 168 A 92 86 0 1 0 108 168 Z";
    var out = VT.shape(VT.smooth(pts, true) + " " + hole, FUR, { sw: 6, rule: "evenodd" });
    for (var j = 0; j < 14; j++) { var a2 = j / 14 * Math.PI * 2, x = 200 + 120 * Math.cos(a2), y = 200 + 136 * Math.sin(a2); if (Math.abs(x - 200) < 90 && y < 260) continue; out += VT.line("M " + f(x) + " " + f(y) + " q 8 10 0 22", 4, FURD, 0.8); }
    return out;
  })();
  shot(A6, END, "lông tự mọc thành áo", function (t, lt, T) {
    var s = shop(t);
    var g = VT.ease.io(seg(t, GROW0, GROW1)), cut = VT.lerp(380, 20, g);
    var o = { x: 760, y: GROUND, flip: 1, noCoat: true };
    if (t < GROW0 + 0.2) { o.px = 0; o.py = 14; o.brows = "worried"; o.mouth = "oSmall"; }
    else if (t < HAPPY) { o.px = 4; o.py = 16; o.brows = "up"; o.mouth = "o"; o.eyes = "wide"; o.noBlink = true; }
    else { o.eyes = "happy"; o.mouth = "smile"; o.arms = "hug"; o.lean = 4 * Math.sin((t - HAPPY) * 6); o.sq = key(t, [[HAPPY, 0.94], [HAPPY + 0.3, 1.02, "back"]]); }
    var id = VT.uid("gr");
    var grown = '<clipPath id="' + id + '"><rect x="-100" y="' + f(cut) + '" width="600" height="600"/></clipPath><g clip-path="url(#' + id + ')">' + COAT_FUR + (g > 0.6 ? sleeves(o) : "") + "</g>";
    if (g > 0 && g < 1) for (var i = 0; i < 9; i++) { var x = 70 + i * 32, h = 10 + VT.hash(i * 3 + Math.round(t * 12)) * 16; grown += VT.line("M " + x + " " + f(cut + 4) + " l " + f((i % 2 ? 6 : -6)) + " " + f(-h), 6, FUR) ; }
    o.prop = grown;
    s += W(t, o);
    if (t >= HAPPY) { var kk = Math.floor(t * 6) % 2; s += VT.sparkle({ x: 1000, y: 420, s: kk ? 0.7 : 0.5 }) + VT.sparkle({ x: 520, y: 470, s: kk ? 0.5 : 0.7 }); }
    var z = key(T, [[A6, 1.3], [END, 1.5, "sine"]]);
    return { cam: [800, 650, z], world: s, over: cloudFrame(1), tint: "warm" };
  });
  return shots;
};
