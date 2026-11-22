/* d32 · vẽ tay · mùa hè, toàn đồ lông (530,12–537,93 s tuyệt đối; 7,81 s). Vào "chen", ra "cat".
 * Mép làng mùa hè, nắng gắt, cỏ. Đầu đoạn: Wob trùm áo lông kín, mũ lông, ba lô phồng, lông mi rủ, mồ hôi.
 * S1 mở ba lô · S2 đồ lông bay ra (áo, găng, tất, cục lông), giọt mồ hôi rơi xèo, lông mi rủ như cỏ héo
 * · S3 ném mũ lông, mở tung áo lông (vẫn khoác), dang tay giữa nắng · S4 nhún lấy đà, nhảy vì hào hứng, giữ.
 * Cuối đoạn: không mũ, áo lông mở (khoác), ba lô (khớp d33). Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, GROUND = 860, WS = 0.85, WX = 900;
  var SUM = { sky: "#9FD2EC", grass: "#8DBF5A", grassD: "#5F8F3A", hill: "#A7CF7F", hillFar: "#C4E0A6", sun: "#F7C948", fur: "#8B5E3C", furD: "#6A4428", trim: "#F3E9D6" };

  var T_BAG = VT.tu("bag"), T_EVERY = VT.tu("everything"), T_FUR = VT.tu("fur"), T_SWEATY = VT.tu("sweaty"), T_AFTER = VT.tu("afternoon");
  var T_MOVE = VT.tu("move"), T_AGAIN = VT.tu("again");
  var A2 = D.nhip[1].tai, A3 = D.nhip[2].tai, A4 = D.nhip[3].tai, END = D.thoi_luong;

  // ---------- nền mùa hè ----------
  function sun(x, y, t, pulse) {
    var n = Math.round(t * 12), out = "";
    for (var i = 0; i < 14; i++) {
      var a = i / 14 * Math.PI * 2 + n * 0.02, L = (i % 2 ? 60 : 95 + 10 * Math.sin(n * 0.7 + i)) * (pulse || 1);
      out += VT.line("M " + f(x + Math.cos(a) * 110) + " " + f(y + Math.sin(a) * 110) + " L " + f(x + Math.cos(a) * (110 + L)) + " " + f(y + Math.sin(a) * (110 + L)), 8, "#E9A93A");
    }
    return out + VT.ell(x, y, 92, 92, SUM.sun, 7);
  }
  function sHouse(x, y, s) {
    var o = VT.shape("M -170 0 L -170 -190 L 170 -190 L 170 0 Z", "#B98457", { sw: 6 });
    for (var yy = -160; yy < -10; yy += 32) o += VT.line("M -164 " + yy + " L 164 " + (yy + 2), 3, "#1f2326", 0.4);
    o += VT.shape("M -205 -180 L 0 -310 L 205 -180 Z", "#6C5A4E", { sw: 6 });
    o += VT.shape("M -60 -140 L 20 -140 L 20 -70 L -60 -70 Z", "#DCEFF6", { sw: 5 });
    o += VT.line("M -20 -140 L -20 -70 M -60 -105 L 20 -105", 4);
    o += VT.shape("M 70 0 L 70 -130 L 140 -130 L 140 0 Z", "#7A4A2A", { sw: 5 });
    return VT.g(VT.tr(x, y, s), o);
  }
  function tufts(y, xs, t, sc) {
    var out = "", n = Math.round(t * 12);
    xs.forEach(function (x, i) {
      var sw = Math.sin(n * 0.5 + i * 1.7) * 6 * (sc || 1), h = (34 + VT.hash(i * 3.7) * 26) * (sc || 1);
      [-14, 0, 14].forEach(function (dx, j) {
        out += VT.line("M " + f(x + dx) + " " + f(y) + " Q " + f(x + dx * 1.6 + sw * 0.5) + " " + f(y - h * 0.6) + " " + f(x + dx * 2.4 + sw) + " " + f(y - h * (j === 1 ? 1.15 : 0.85)), 5 * (sc || 1), SUM.grassD);
      });
    });
    return out;
  }
  function heat(t, x0, x1, y0) {
    var out = "", n = Math.round(t * 12);
    for (var i = 0; i < 6; i++) {
      var x = x0 + (x1 - x0) * (i + 0.5) / 6 + Math.sin(i * 2.3) * 40, yy = y0 - ((n * 6 + i * 37) % 120), pts = [];
      for (var k = 0; k < 4; k++) pts.push([x + Math.sin(n * 0.8 + k * 1.6 + i) * 9, yy - k * 26]);
      out += VT.line(VT.smooth(pts, false), 4, "#ffffff", 0.55);
    }
    return out;
  }
  function bg(t, pulse) {
    var s = VT.sky(SUM.sky, 1) + sun(1330, 400, t, pulse);
    s += VT.ridge(640, -60, SUM.hillFar) + VT.ridge(720, 200, SUM.hill);
    s += sHouse(260, 760, 0.55) + sHouse(560, 735, 0.4) + sHouse(1560, 740, 0.42);
    s += VT.shape("M -1200 " + (GROUND + 8) + " C -400 " + (GROUND - 6) + " 300 " + (GROUND + 14) + " 900 " + (GROUND - 2) + " C 1500 " + (GROUND - 14) + " 2200 " + (GROUND + 12) + " 3200 " + GROUND + " L 3200 2400 L -1200 2400 Z", SUM.grass, { sw: 6, ox: 0, oy: 5 });
    s += tufts(GROUND + 30, [120, 380, 560, 1240, 1420, 1650], t) + tufts(GROUND + 150, [0, 260, 500, 1300, 1560, 1800], t, 1.3);
    s += heat(t, 300, 1700, GROUND - 40);
    return s;
  }

  // ---------- đồ lông (hệ Wob) ----------
  function flapL() {
    var outer = [[146, 56], [104, 76], [68, 126], [52, 198], [58, 268], [84, 320], [120, 350], [172, 358]];
    var inner = [[174, 348], [152, 292], [136, 228], [126, 162], [130, 108], [148, 70]];
    var out = VT.shape(VT.smooth(outer.concat(inner), true), SUM.fur, { sw: 6 });
    out += VT.line("M 84 150 q 8 14 0 28 M 74 222 q 10 12 2 26 M 98 286 q 10 10 4 24 M 106 112 q 8 10 2 22 M 112 200 q 8 12 2 24", 4, SUM.furD, 0.8);
    var band = VT.smooth([[150, 64], [130, 108], [126, 162], [136, 228], [152, 292], [170, 350], [124, 352], [80, 330]], false);
    out += VT.line(band, 30) + VT.line(band, 21, SUM.trim);
    return out;
  }
  var FLAP = flapL();
  var COAT_OPEN = FLAP + VT.g("translate(400 0) scale(-1 1)", FLAP);
  var COAT_CLOSED = (function () {
    var pts = [];
    for (var i = 0; i < 28; i++) { var a = i / 28 * Math.PI * 2; pts.push([200 + 146 * Math.cos(a) * (1 + 0.04 * Math.sin(5 * a)), 200 + 158 * Math.sin(a)]); }
    var hole = "M 104 172 A 96 88 0 1 0 296 172 A 96 88 0 1 0 104 172 Z";
    var out = VT.shape(VT.smooth(pts, true) + " " + hole, SUM.fur, { sw: 6, rule: "evenodd" });
    out += VT.line("M 74 170 q 8 14 0 28 M 70 250 q 10 12 2 26 M 320 160 q 8 14 0 28 M 326 250 q 8 12 2 26 M 150 320 q 8 10 2 22 M 250 322 q 8 10 2 22", 4, SUM.furD, 0.8);
    out += '<ellipse cx="200" cy="172" rx="98" ry="90" fill="none" stroke="#1f2326" stroke-width="30"/><ellipse cx="200" cy="172" rx="98" ry="90" fill="none" stroke="' + SUM.trim + '" stroke-width="21"/>';
    out += VT.line("M 200 264 L 200 352", 5) + VT.shape("M 186 290 L 214 290 L 214 300 L 186 300 Z", "#E8C25A", { sw: 3.5 }) + VT.shape("M 186 322 L 214 322 L 214 332 L 186 332 Z", "#E8C25A", { sw: 3.5 });
    var hem = VT.smooth([[84, 320], [140, 352], [200, 360], [260, 352], [316, 320]], false);
    return out + VT.line(hem, 26) + VT.line(hem, 17, SUM.trim);
  })();
  // mũ lông: gốc hệ Wob (vẽ đè lên đầu); HAT_C là tâm để xoay khi ném
  var HAT_C = [200, 70];
  var HAT = VT.shape("M 92 104 C 88 0 312 0 308 104 Z", SUM.fur, { sw: 6 }) +
    VT.line("M 150 30 q 6 14 0 26 M 200 20 q 6 14 0 26 M 250 30 q 6 14 0 26", 4, SUM.furD, 0.8) +
    VT.shape("M 70 108 C 64 150 74 196 92 210 C 110 200 116 150 112 108 Z", SUM.fur, { sw: 5 }) +
    VT.shape("M 330 108 C 336 150 326 196 308 210 C 290 200 284 150 288 108 Z", SUM.fur, { sw: 5 }) +
    VT.shape("M 78 118 C 120 80 280 80 322 118 L 318 90 C 280 52 120 52 82 90 Z", SUM.trim, { sw: 6 });
  function hatAt(x, y, s, rot) { return VT.g(VT.tr(x, y, s, rot), VT.g("translate(" + (-HAT_C[0]) + " " + (-HAT_C[1]) + ")", HAT)); }
  // ba lô phồng (propBack, đè lên ba lô gốc); open 0..1 nắp lật
  function pack(open) {
    var out = VT.shape("M 236 110 C 228 60 380 56 376 110 L 384 236 C 386 286 236 290 232 240 Z", "#b8743a", { sw: 7, ox: 5, oy: 4 });
    out += VT.line("M 250 150 C 300 140 340 142 370 152 M 248 210 C 300 202 340 204 374 214", 3, "#8e5527", 0.7);
    out += VT.shape("M 300 170 L 350 170 L 352 230 L 302 232 Z", "#8e5527", { sw: 5 });
    if (open < 0.5) out += VT.shape("M 244 60 C 250 34 366 32 370 62 L 372 96 C 330 108 286 108 246 96 Z", "#d9543c", { sw: 7 });
    else {
      out += VT.ell(308, 64, 58, 16, "#3a2a20", 6, { ox: 0, oy: 0 });
      out += VT.g("rotate(" + f(-150 * Math.min(1, (open - 0.5) * 2) + 30) + " 360 60)", VT.shape("M 250 60 C 256 34 366 32 368 60 L 370 92 C 330 102 290 102 252 92 Z", "#d9543c", { sw: 7 }));
    }
    return out;
  }
  // lông mi rủ (hệ Wob): k 0 dựng, 1 rủ như cỏ héo
  function lashes(k) {
    var out = "";
    [160, 238].forEach(function (cx) {
      [-128, -90, -52].forEach(function (deg) {
        var a = deg * Math.PI / 180, bx = cx + 25 * Math.cos(a), by = 156 + 31 * Math.sin(a), L = 24;
        var dir = Math.cos(a) < -0.1 ? -1 : Math.cos(a) > 0.1 ? 1 : (cx < 200 ? -1 : 1);
        var c = [bx + Math.cos(a) * L * 0.8 + dir * 4, by + Math.sin(a) * L * 0.8];
        var tip = [VT.lerp(bx + Math.cos(a) * L, c[0] + dir * 18, k), VT.lerp(by + Math.sin(a) * L, c[1] + 22, k)];
        out += VT.line("M " + f(bx) + " " + f(by) + " Q " + f(c[0]) + " " + f(c[1]) + " " + f(tip[0]) + " " + f(tip[1]), 5);
      });
    });
    return out;
  }
  // đồ lông bay ra: gốc tâm
  var ITEMS = {
    coat: VT.shape("M -60 -70 L 60 -70 L 110 -10 L 84 14 L 56 -14 L 60 80 L -60 80 L -56 -14 L -84 14 L -110 -10 Z", SUM.fur, { sw: 6 }) + VT.line("M 0 -70 L 0 80", 5) + VT.line("M -24 -70 L 0 -40 L 24 -70", 12, SUM.trim) + VT.line("M -60 80 L 60 80", 12, SUM.trim),
    mitten: VT.shape("M -34 50 L -40 -20 C -42 -60 30 -66 34 -26 L 38 10 L 56 -6 C 70 -12 76 6 64 16 L 38 50 Z", SUM.fur, { sw: 6 }) + VT.line("M -40 50 L 42 50", 16, SUM.trim),
    sock: VT.shape("M -30 -70 L 22 -70 L 22 20 L 70 26 C 92 30 92 70 66 70 L -30 66 Z", SUM.fur, { sw: 6 }) + VT.line("M -32 -64 L 24 -64", 14, SUM.trim),
    ball: (function () { var p = []; for (var i = 0; i < 18; i++) { var a = i / 18 * Math.PI * 2; p.push([Math.cos(a) * (i % 2 ? 46 : 58), Math.sin(a) * (i % 2 ? 42 : 52)]); } return VT.shape(VT.smooth(p, true), "#9C6B47", { sw: 6 }) + VT.line("M -20 -10 q 8 8 0 16 M 12 -18 q 8 8 0 16 M 4 16 q 8 8 0 16", 4, SUM.furD); })(),
  };
  var FLY = [
    { id: "coat", t0: T_EVERY + 0.02, d: 0.5, to: [WX - 330, GROUND + 10], h: 300, spin: -380, s: 0.95 },
    { id: "mitten", t0: T_EVERY + 0.22, d: 0.45, to: [WX + 330, GROUND + 20], h: 260, spin: 300, s: 0.85 },
    { id: "sock", t0: T_EVERY + 0.42, d: 0.45, to: [WX - 200, GROUND + 60], h: 240, spin: -260, s: 0.85 },
    { id: "ball", t0: T_FUR - 0.04, d: 0.5, to: [WX + 220, GROUND + 70], h: 320, spin: 200, s: 0.9 },
  ];
  FLY.forEach(function (it) { VT.sfx(it.id === "ball" ? "drop" : "pop", it.id === "ball" ? it.t0 + it.d : it.t0, it.id === "ball" ? 0.6 : 0.4); });
  function items(t, from) {
    var out = "";
    FLY.forEach(function (it) {
      if (t < it.t0) return;
      var k = seg(t, it.t0, it.t0 + it.d), x = VT.lerp(from[0], it.to[0], k), y = VT.lerp(from[1], it.to[1], k) - it.h * 4 * k * (1 - k);
      var rot = k < 1 ? it.spin * k : 0, sq = t >= it.t0 + it.d && t < it.t0 + it.d + 0.15 ? 0.8 : 1;
      out += VT.g(VT.tr(x, y - 40 * it.s, it.s * WS, rot), VT.g("scale(" + f(1 / Math.sqrt(sq) * 100) / 100 + " " + sq + ")", ITEMS[it.id]));
      if (k > 0 && k < 1) out += VT.arc([[from[0], from[1]], [VT.lerp(from[0], it.to[0], k * 0.5), VT.lerp(from[1], it.to[1], k * 0.5) - it.h * k], [x, y - 40 * it.s]], 4, 0.45);
      if (t >= it.t0 + it.d && t < it.t0 + it.d + 0.3) out += VT.puffBurst({ x: it.to[0], y: it.to[1] + 4, k: seg(t, it.t0 + it.d, it.t0 + it.d + 0.3), s: 0.35, spread: 60 });
    });
    return out;
  }

  // tay áo lông (vẽ đè lên áo, theo đúng đường tay ống cao su của rig: cùng công thức armPath trong lib/10-wob.js)
  var SHO = { l: [88, 212], r: [312, 212] };
  function armQ(side, spec) {
    var sh = SHO[side], hx = spec[0], hy = spec[1], dx = hx - sh[0], dy = hy - sh[1], d = Math.sqrt(dx * dx + dy * dy) || 1;
    var bend = d < 128 ? Math.sqrt(128 * 128 - d * d) * 0.55 : 0, nx = -dy / d, ny = dx / d, sg = side === "l" ? -1 : 1;
    if (nx * sg + 0.6 * ny < 0) { nx = -nx; ny = -ny; }
    return [sh, [(sh[0] + hx) / 2 + nx * bend, (sh[1] + hy) / 2 + ny * bend], [hx, hy]];
  }
  function sleeves(o) {
    var pre = VT.ARM[o.arms || "rest"] || VT.ARM.rest, out = "";
    [["l", o.armL || pre.l], ["r", o.armR || pre.r]].forEach(function (a) {
      var q = armQ(a[0], a[1]), pts = [];
      for (var i = 0; i <= 6; i++) { var u = 0.66 * i / 6, w = 1 - u; pts.push([w * w * q[0][0] + 2 * w * u * q[1][0] + u * u * q[2][0], w * w * q[0][1] + 2 * w * u * q[1][1] + u * u * q[2][1]]); }
      var d = VT.smooth(pts, false), e = pts[6], pe = pts[5], ang = Math.atan2(e[1] - pe[1], e[0] - pe[0]);
      out += VT.line(d, 36) + VT.line(d, 26, SUM.fur);
      out += VT.line("M " + f(e[0] - Math.sin(ang) * 20) + " " + f(e[1] + Math.cos(ang) * 20) + " L " + f(e[0] + Math.sin(ang) * 20) + " " + f(e[1] - Math.cos(ang) * 20), 22) + VT.line("M " + f(e[0] - Math.sin(ang) * 17) + " " + f(e[1] + Math.cos(ang) * 17) + " L " + f(e[0] + Math.sin(ang) * 17) + " " + f(e[1] - Math.cos(ang) * 17), 14, SUM.trim);
    });
    return out;
  }

  function W(t, o) {
    var b = { t: t, s: WS, cold: false, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes !== "happy" && b.eyes !== "closed") b.lid = Math.max(b.lid || 0, VT.blink(t, 2.5, 0.3));
    b.propBack = pack(o.open || 0);
    b.prop = (o.closed ? COAT_CLOSED : COAT_OPEN) + sleeves(b) + lashes(o.droop == null ? 0.8 : o.droop) + (o.hat ? HAT : "");
    return VT.wob(b);
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S1 · Wob trùm lông giữa nắng, với ra sau mở ba lô =====
  var OPEN = T_BAG + 0.05;
  VT.sfx("liu-lo-buon", 0.25, 0.45);
  shot(0, A2, "mở ba lô", function (t, lt, T) {
    var o = { x: WX, y: GROUND, closed: true, hat: true, marks: "sweat", droop: key(t, [[0, 0.45], [A2, 0.6]]), lean: 3 + Math.sin(t * 5) * 1.5 };
    var reach = key(t, [[0, 0], [OPEN - 0.35, 1, "io"], [OPEN + 0.25, 1], [A2, 0.4, "io"]]);
    o.armR = VT.mix([338, 300], [330, 40], reach); o.handR = reach > 0.6 ? "nam" : "tron";
    o.open = t >= OPEN ? key(t, [[OPEN, 0.5], [OPEN + 0.12, 1, "out"]]) : 0;
    o.px = key(t, [[0, 0], [OPEN - 0.3, 12]]); o.py = key(t, [[0, 8], [OPEN - 0.3, -10]]); o.brows = "worried"; o.mouth = t < OPEN ? "wobbly" : "oSmall";
    o.sq = t >= OPEN && t < OPEN + 0.2 ? 1.04 : 1;
    var out = bg(t) + W(t, o);
    if (t >= OPEN && t < OPEN + 0.25) out += VT.puffBurst({ x: VT.wobPt(o, 308, 40)[0], y: VT.wobPt(o, 308, 40)[1], k: seg(t, OPEN, OPEN + 0.25), s: 0.35, spread: 50 });
    var z = key(T, [[0, 1.62], [A2, 1.7, "sine"]]);
    return { cam: [WX + 20, GROUND - 200, z], world: out, tint: "warm" };
  });

  // ===== S2 · đồ lông bay ra, giọt mồ hôi rơi xèo, mi rủ =====
  var DRIP0 = T_FUR + 0.2, DRIP1 = DRIP0 + 0.38;
  VT.sfx("hoi-nuoc", DRIP1, 0.55);
  shot(A2, A3, "đồ lông bay ra", function (t, lt, T) {
    var o = { x: WX, y: GROUND, closed: true, hat: true, open: 1, marks: "sweat", droop: key(t, [[A2, 0.6], [T_FUR + 0.1, 1, "io"]]) };
    var from = VT.wobPt(o, 308, 50);
    // mắt dõi theo món vừa bay
    var last = null; FLY.forEach(function (it) { if (t >= it.t0) last = it; });
    if (last) { var dx = last.to[0] - WX; o.px = dx > 0 ? 12 : -12; o.py = t < last.t0 + last.d * 0.5 ? -10 : 10; }
    o.brows = "worried"; o.mouth = t < T_FUR ? "oSmall" : "wobbly"; o.lid = t > T_FUR ? 0.35 : 0;
    o.sq = key(t, [[A2, 1], [T_FUR, 0.97], [A3, 0.94, "io"]]);
    o.armL = [62, 310]; o.armR = [340, 310];
    var out = bg(t) + items(t, from) + W(t, o);
    // giọt mồ hôi rơi từ cằm xuống đất, xèo
    if (t >= DRIP0 && t < DRIP1) { var p0 = VT.wobPt(o, 250, 250), k = VT.ease.in2(seg(t, DRIP0, DRIP1)); out += VT.drop({ x: p0[0] + 10, y: VT.lerp(p0[1], GROUND + 30, k), s: 0.9 }); }
    if (t >= DRIP1 && t < DRIP1 + 0.5) {
      var kk = seg(t, DRIP1, DRIP1 + 0.5), gx = VT.wobPt(o, 250, 250)[0] + 10;
      out += VT.ell(gx, GROUND + 34, 26 * (1 - kk * 0.5), 7, "#6E9F45", 0) + VT.puff({ x: gx - 10 + kk * 10, y: GROUND + 20 - kk * 60, s: 0.3 + kk * 0.3, op: 0.9 - kk * 0.6 }) + VT.puff({ x: gx + 18, y: GROUND + 10 - kk * 90, s: 0.22 + kk * 0.2, op: 0.8 - kk * 0.6 });
    }
    var z = key(T, [[A2, 1.28], [A3, 1.34, "sine"]]);
    return { cam: [WX, GROUND - 150, z], world: out, tint: "warm" };
  });

  // ===== S3 · ném mũ lông, mở tung áo, dang tay giữa nắng =====
  var THROW = A3 + 0.12, RIP = T_SWEATY - 0.06, SPREAD = T_AFTER - 0.02;
  VT.sfx("whoosh", THROW + 0.02, 0.4);
  VT.sfx("boing", RIP, 0.5);
  shot(A3, A4, "ném mũ, mở áo", function (t, lt, T) {
    var o = { x: WX, y: GROUND, open: 1, hat: t < THROW, closed: t < RIP, droop: 1, marks: t < RIP ? "sweat" : null };
    var out = bg(t, t >= SPREAD ? 1 + 0.15 * Math.sin((t - SPREAD) * 10) : 1) + items(t, [0, 0]);
    if (t < THROW + 0.05) { o.armR = key(t, [[A3, [338, 300]], [THROW - 0.04, [360, 260], "out"], [THROW + 0.05, [300, -20], "in"]]); o.handR = "nam"; o.brows = "down"; o.mouth = "flat"; o.px = -6; o.py = -12; o.lean = key(t, [[A3, 0], [THROW - 0.04, 6], [THROW + 0.05, -8, "in"]]); }
    else if (t < RIP) { o.armL = [176, 270]; o.armR = [224, 270]; o.handL = "nam"; o.handR = "nam"; o.brows = "down"; o.mouth = "G"; o.sq = key(t, [[THROW + 0.05, 1], [RIP, 0.92, "in2"]]); o.lean = key(t, [[THROW + 0.05, -8], [THROW + 0.3, 0, "back"]]); }
    else if (t < SPREAD) { o.armL = [22, 152]; o.armR = [378, 152]; o.handL = "xoe"; o.handR = "xoe"; o.eyes = "wide"; o.mouth = "o"; o.sq = key(t, [[RIP, 1.12], [RIP + 0.25, 1, "out"]]); }
    else { o.arms = "up"; o.eyes = "happy"; o.mouth = "smile"; o.lean = key(t, [[SPREAD, 0], [SPREAD + 0.3, -6, "back"]]); o.sq = 1.03 + 0.02 * Math.sin(t * 8); }
    out += W(t, o);
    // mũ lông bay đi theo cung
    if (t >= THROW) {
      var k = seg(t, THROW, THROW + 0.5), h0 = VT.wobPt(o, HAT_C[0], HAT_C[1]);
      var hx = VT.lerp(h0[0], h0[0] - 900, k), hy = h0[1] - 520 * k + 300 * k * k;
      if (k < 1) out += hatAt(hx, hy, WS * (1 - 0.3 * k), -540 * k) + VT.arc([[h0[0], h0[1]], [VT.lerp(h0[0], hx, 0.5), VT.lerp(h0[1], hy, 0.5) - 60], [hx, hy]], 5, 0.5);
    }
    if (t >= RIP && t < RIP + 0.3) { var c = VT.wobPt(o, 200, 250); out += VT.radialLines(c[0], c[1], 210, 330, 14, 7, 7) + VT.puffBurst({ x: c[0], y: c[1] + 60, k: seg(t, RIP, RIP + 0.3), s: 0.6, spread: 160 }); }
    if (t >= SPREAD) { var kk = Math.floor(t * 6) % 2; out += VT.sparkle({ x: WX + 260, y: GROUND - 380, s: kk ? 0.7 : 0.5 }) + VT.sparkle({ x: WX - 250, y: GROUND - 330, s: kk ? 0.5 : 0.7 }); }
    var z = key(T, [[A3, 1.3], [A4, 1.38, "sine"]]);
    return { cam: [WX + 30, GROUND - 190, z], shake: VT.shake(t, RIP, 0.2, 6), world: out, tint: "warm" };
  });

  // ===== S4 · nhún lấy đà, nhảy vì hào hứng, giữ =====
  var CR = A4 + 0.06, UP = T_MOVE - 0.1, LAND = T_AGAIN + 0.12;
  VT.sfx("liu-lo-vui", A4 + 0.04, 0.6);
  VT.sfx("boing", UP, 0.4);
  VT.sfx("bonk", LAND, 0.35);
  shot(A4, END, "nhảy vì hào hứng", function (t, lt, T) {
    var o = { x: WX, y: GROUND, open: 1, droop: 1, eyes: "happy", mouth: "smile" };
    var air = t >= UP && t < LAND, k = seg(t, UP, LAND);
    if (t < UP) { o.sq = key(t, [[A4, 1], [CR + 0.25, 0.8, "out"], [UP, 0.8]]); o.arms = "low"; o.lean = key(t, [[A4, 0], [CR + 0.25, 6]]); o.mouth = "content"; }
    else if (air) { o.y = GROUND - 250 * 4 * k * (1 - k); o.sq = k < 0.25 ? 1.16 : k > 0.8 ? 1.08 : 1; o.arms = "up"; o.legs = "tuck"; o.mouth = "D"; }
    else { o.sq = key(t, [[LAND, 0.76], [LAND + 0.3, 1, "elastic"]]) * (1 + 0.025 * Math.sin((t - LAND) * 7)); o.arms = "up"; o.lean = Math.sin((t - LAND) * 6) * 3; }
    o.pack = air ? -18 * Math.sin(k * Math.PI) : t >= LAND ? 14 * Math.exp(-(t - LAND) * 4) * Math.sin((t - LAND) * 18) : 0;
    var out = bg(t, 1.1) + items(t, [0, 0]) + W(t, o);
    if (t >= LAND && t < LAND + 0.3) out += VT.puffBurst({ x: WX - 110, y: GROUND, k: seg(t, LAND, LAND + 0.3), s: 0.45, spread: 80 }) + VT.puffBurst({ x: WX + 110, y: GROUND, k: seg(t, LAND, LAND + 0.3), s: 0.45, spread: 80 });
    if (air && k < 0.5) out += VT.speedLines({ x0: WX - 120, y0: o.y - 60, n: 4, gap: 80, len: 70, dx: 0, dy: 1, sw: 5 });
    if (t >= LAND) { var kk = Math.floor(t * 5) % 3; [[WX - 260, GROUND - 420], [WX + 270, GROUND - 450], [WX + 330, GROUND - 200], [WX - 320, GROUND - 180]].forEach(function (p, j) { out += VT.sparkle({ x: p[0], y: p[1], s: (j + kk) % 3 === 0 ? 0.8 : 0.5 }); }); }
    var z = key(T, [[A4, 1.36], [LAND, 1.42], [END, 1.56, "sine"]]);
    return { cam: [WX, GROUND - 230 - (air ? 0.45 * 250 * 4 * k * (1 - k) : 0), z], shake: VT.shake(t, LAND, 0.18, 5), world: out, tint: "warm" };
  });
  return shots;
};
