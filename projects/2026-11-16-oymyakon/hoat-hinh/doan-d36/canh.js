/* d36 · vẽ tay · marathon mặc áo lông (589,77–594,94 s tuyệt đối; 5,17 s). Vào "chen", ra "cat".
 * Mép làng mùa hè, nắng gắt, cỏ. Wob không mũ, áo lông mở (khoác), ba lô.
 * S1 ướm số áo "2025" lên áo lông, hãnh diện · S2 chạy tại chỗ hai bước, số áo dính mồ hôi trượt xuống chân
 * · S3 cận: ngồi phịch xuống cỏ, tỉnh bơ, giữ. Chữ trên đồ vật: chỉ "2025".
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, GROUND = 860, WS = 0.85, WX = 820;
  var SUM = { sky: "#A8D8EE", grass: "#8DBF5A", grassD: "#5F8F3A", hill: "#A7CF7F", hillFar: "#C4E0A6", sun: "#F7C948", fur: "#8B5E3C", furD: "#6A4428", trim: "#F3E9D6" };

  var T_TWENTY = VT.tu("twenty"), T_MARATHON = VT.tu("marathon"), T_IN2 = VT.tu("in", 1), T_COLD = VT.tu("cold");
  var T_ON = VT.tu("on"), T_PURPOSE = VT.tu("purpose");
  var A2 = D.nhip[1].tai, A3 = D.nhip[2].tai, END = D.thoi_luong;

  // ---------- nền mùa hè (vẽ tay, tất định) ----------
  function sun(x, y, t) {
    var n = Math.round(t * 12), out = "";
    for (var i = 0; i < 14; i++) {
      var a = i / 14 * Math.PI * 2 + n * 0.02, L = i % 2 ? 60 : 95 + 10 * Math.sin(n * 0.7 + i);
      out += VT.line("M " + f(x + Math.cos(a) * 110) + " " + f(y + Math.sin(a) * 110) + " L " + f(x + Math.cos(a) * (110 + L)) + " " + f(y + Math.sin(a) * (110 + L)), 8, "#E9A93A");
    }
    return out + VT.ell(x, y, 92, 92, SUM.sun, 7);
  }
  function sHouse(x, y, s, seed) {
    var o = "";
    o += VT.shape("M -170 0 L -170 -190 L 170 -190 L 170 0 Z", "#B98457", { sw: 6 });
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
  function fence(x0, y, n) {
    var out = "";
    for (var i = 0; i < n; i++) out += VT.shape("M " + (x0 + i * 90 - 9) + " " + y + " L " + (x0 + i * 90 - 9) + " " + (y - 150) + " L " + (x0 + i * 90) + " " + (y - 166) + " L " + (x0 + i * 90 + 9) + " " + (y - 150) + " L " + (x0 + i * 90 + 9) + " " + y + " Z", "#C9925F", { sw: 5, ox: 3, oy: 2 });
    out += VT.shape("M " + (x0 - 20) + " " + (y - 110) + " L " + (x0 + n * 90 - 70) + " " + (y - 116) + " L " + (x0 + n * 90 - 70) + " " + (y - 98) + " L " + (x0 - 20) + " " + (y - 92) + " Z", "#B47A48", { sw: 4 });
    out += VT.shape("M " + (x0 - 20) + " " + (y - 50) + " L " + (x0 + n * 90 - 70) + " " + (y - 54) + " L " + (x0 + n * 90 - 70) + " " + (y - 36) + " L " + (x0 - 20) + " " + (y - 32) + " Z", "#B47A48", { sw: 4 });
    return out;
  }
  function heat(t, x0, x1, y0) {
    var out = "", n = Math.round(t * 12);
    for (var i = 0; i < 5; i++) {
      var x = x0 + (x1 - x0) * (i + 0.5) / 5 + Math.sin(i * 2.3) * 40, yy = y0 - ((n * 6 + i * 37) % 120), pts = [];
      for (var k = 0; k < 4; k++) pts.push([x + Math.sin(n * 0.8 + k * 1.6 + i) * 9, yy - k * 26]);
      out += VT.line(VT.smooth(pts, false), 4, "#ffffff", 0.55);
    }
    return out;
  }
  function bg(t) {
    var s = VT.sky(SUM.sky, 1) + sun(1290, 420, t);
    s += VT.ridge(640, -60, SUM.hillFar) + VT.ridge(720, 200, SUM.hill);
    s += sHouse(180, 760, 0.55, 1) + sHouse(470, 740, 0.42, 2) + sHouse(1420, 735, 0.36, 3);
    s += fence(-120, GROUND - 20, 6);
    s += VT.shape("M -1200 " + (GROUND + 8) + " C -400 " + (GROUND - 6) + " 300 " + (GROUND + 14) + " 900 " + (GROUND - 2) + " C 1500 " + (GROUND - 14) + " 2200 " + (GROUND + 12) + " 3200 " + GROUND + " L 3200 2400 L -1200 2400 Z", SUM.grass, { sw: 6, ox: 0, oy: 5 });
    s += tufts(GROUND + 30, [80, 330, 560, 1130, 1350, 1580, 1800], t) + tufts(GROUND + 150, [-60, 240, 470, 1250, 1520, 1760, 2000], t, 1.3);
    s += heat(t, 300, 1700, GROUND - 40);
    return s;
  }

  // ---------- áo lông mở (hệ Wob) ----------
  function flapL() {
    var outer = [[146, 56], [104, 76], [68, 126], [52, 198], [58, 268], [84, 320], [120, 350], [172, 358]];
    var inner = [[174, 348], [152, 292], [136, 228], [126, 162], [130, 108], [148, 70]];
    var out = VT.shape(VT.smooth(outer.concat(inner), true), SUM.fur, { sw: 6 });
    out += VT.line("M 84 150 q 8 14 0 28 M 74 222 q 10 12 2 26 M 98 286 q 10 10 4 24 M 106 112 q 8 10 2 22 M 112 200 q 8 12 2 24", 4, SUM.furD, 0.8);
    var band = VT.smooth([[150, 64], [130, 108], [126, 162], [136, 228], [152, 292], [170, 350], [124, 352], [80, 330]], false);
    out += VT.line(band, 30) + VT.line(band, 21, SUM.trim);
    [[136, 90], [125, 135], [128, 190], [140, 250], [158, 314], [140, 352], [100, 342]].forEach(function (p, i) {
      out += VT.line("M " + (p[0] - 6) + " " + (p[1] - 4) + " l 8 6 M " + (p[0] + 2) + " " + (p[1] + 8) + " l 6 -6", 3, "#B9A88A", 0.9);
    });
    return out;
  }
  var FLAP = flapL();
  function coatOpen() { return FLAP + VT.g("translate(400 0) scale(-1 1)", FLAP); }

  // số áo chạy bộ: gốc tâm (hệ nào cũng được), rộng 150
  function bib(o) {
    var out = VT.shape("M -78 -46 L 78 -50 L 80 46 L -76 50 Z", "#FFFDF6", { sw: 5, ox: 4, oy: 4 });
    out += VT.line("M -66 -32 L 66 -35", 7, "#E0703A", 0.9);
    [[-62, -38], [62, -40], [-62, 38], [62, 38]].forEach(function (p) { out += VT.ell(p[0], p[1], 7, 4, "none", 3, { stroke: "#7d8a91" }); });
    out += VT.text(2, 30, "2025", 56, { w: 900 });
    return VT.wrap(o, out);
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
    if (!b.noBlink && b.eyes !== "happy" && b.eyes !== "closed") b.lid = Math.max(b.lid || 0, VT.blink(t, 2.7, 0.4));
    b.prop = coatOpen() + sleeves(b) + (o.prop || "");
    return VT.wob(b);
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S1 · ướm số áo lên áo lông, hãnh diện =====
  var P_ON = T_TWENTY + 0.35, REL = T_MARATHON - 0.45;
  VT.sfx("pop", P_ON, 0.45);
  VT.sfx("liu-lo-vui", T_MARATHON + 0.1, 0.5);
  shot(0, A2, "ướm số áo", function (t, lt, T) {
    var o = { x: WX, y: GROUND, flip: 1 };
    var bp = key(t, [[0, [300, 330, -14]], [0.3, [300, 330, -14]], [P_ON, [200, 296, 0], "back"]]);
    var out = bg(t), bibSvg = bib({ x: bp[0], y: bp[1], s: 1, rot: bp[2] });
    if (t < REL) {
      o.armL = [bp[0] - 70, bp[1] + 4]; o.armR = [bp[0] + 70, bp[1] + 2]; o.handL = "nam"; o.handR = "nam";
    } else {
      // buông tay, chống nạnh, ưỡn người; ở "marathon" giơ nắm tay
      var up = seg(t, T_MARATHON, T_MARATHON + 0.2);
      o.armL = [84, 262]; o.handL = "nam";
      o.armR = up > 0 ? VT.mix([316, 262], [330, 60], VT.ease.back(up)) : [316, 262]; o.handR = "nam";
    }
    if (t < P_ON) { o.px = 10; o.py = 12; o.brows = "up"; o.mouth = "content"; }
    else if (t < REL) { o.eyes = "happy"; o.mouth = "smile"; o.sq = key(t, [[P_ON, 0.94], [P_ON + 0.25, 1.04, "out"], [P_ON + 0.45, 1]]); }
    else { o.eyes = "happy"; o.mouth = "smile"; o.lean = key(t, [[REL, 0], [REL + 0.3, -5, "back"]]); o.sq = 1.03 + 0.02 * Math.sin(t * 9); o.bob = t > T_MARATHON ? -10 * Math.abs(Math.sin((t - T_MARATHON) * 7)) : 0; }
    o.prop = bibSvg;
    out += W(t, o);
    if (t >= P_ON && t < P_ON + 0.3) out += VT.sparkle({ x: WX + 120, y: GROUND - 120, s: 0.6 });
    if (t >= T_MARATHON) { var kk = Math.floor(t * 6) % 2; out += VT.sparkle({ x: WX + 190, y: GROUND - 360, s: kk ? 0.7 : 0.5 }) + VT.sparkle({ x: WX - 170, y: GROUND - 300, s: kk ? 0.45 : 0.65 }); }
    var z = key(T, [[0, 1.62], [A2, 1.72, "sine"]]);
    return { cam: [WX + 10, GROUND - 190, z], world: out, tint: "warm" };
  });

  // ===== S2 · chạy tại chỗ hai bước, số áo trượt xuống chân =====
  var J0 = T_IN2 + 0.04, J1 = J0 + 0.7, SL0 = T_COLD - 0.12, SL1 = SL0 + 0.5;
  VT.sfx("buoc-tuyet", J0 + 0.17, 0.25); VT.sfx("buoc-tuyet", J0 + 0.52, 0.25);
  VT.sfx("drop", SL1, 0.35);
  shot(A2, A3, "chạy tại chỗ, số áo trượt", function (t, lt, T) {
    var o = { x: WX, y: GROUND, flip: 1, marks: "sweat" };
    var out = bg(t);
    if (t >= J0 && t < J1) {
      var ph = seg(t, J0, J1);
      o.legs = "walk"; o.phase = ph; o.stride = 34; o.lift = 40; o.walkBob = 16;
      var sw = Math.sin(ph * 2 * Math.PI);
      o.armL = [96 - 30 * sw, 236 + 20 * sw]; o.armR = [304 - 30 * sw, 236 - 20 * sw]; o.handL = "nam"; o.handR = "nam";
      o.eyes = "squint"; o.mouth = "B";
    } else if (t < J0) { o.armL = [84, 262]; o.armR = [316, 262]; o.handL = "nam"; o.handR = "nam"; o.eyes = "happy"; o.mouth = "smile"; o.sq = key(t, [[A2, 1], [J0, 0.92, "in2"]]); }
    else { o.px = 2; o.py = 14; o.brows = "worried"; o.mouth = "wobbly"; o.lean = 4; }
    // số áo: dính trên áo tới SL0, rồi trượt xuống chân (theo mồ hôi)
    var onBody = VT.wobPt(o, 200, 296), feet = [WX + 6, GROUND - 6];
    var k = VT.ease.in2(seg(t, SL0, SL1));
    var bx = VT.lerp(onBody[0], feet[0], k), by = VT.lerp(onBody[1], feet[1], k), rot = VT.lerp(0, 11, k);
    var bibW = bib({ x: bx, y: by, s: WS, rot: rot });
    out += W(t, o) + bibW;
    if (t > SL0 && t < SL1) out += VT.line("M " + f(bx - 50) + " " + f(by - 70) + " l 0 -50 M " + f(bx + 50) + " " + f(by - 70) + " l 0 -50", 5, "#1f2326", 0.7);
    // giọt mồ hôi văng ra hai bên khi chạy
    if (t >= J0 && t < J1 + 0.2) [[-1, 0], [1, 0.12], [-1, 0.33], [1, 0.45]].forEach(function (d, i) {
      var q = seg(t, J0 + d[1], J0 + d[1] + 0.35); if (q <= 0 || q >= 1) return;
      var hp = VT.wobPt(o, 200 + d[0] * 110, 110);
      out += VT.drop({ x: hp[0] + d[0] * 140 * q, y: hp[1] - 60 * q + 160 * q * q, s: 0.8, rot: d[0] * 30 });
    });
    if (t >= SL1 && t < SL1 + 0.25) out += VT.puffBurst({ x: feet[0], y: GROUND, k: seg(t, SL1, SL1 + 0.25), s: 0.35, fill: "#ffffff" });
    var z = key(T, [[A2, 1.3], [A3, 1.36, "sine"]]);
    return { cam: [WX, GROUND - 170, z], world: out, tint: "warm" };
  });

  // ===== S3 · cận: ngồi phịch xuống cỏ, tỉnh bơ, giữ =====
  var DROP0 = A3 + 0.02, LAND = A3 + 0.2, SIT = 95 * WS;
  VT.sfx("bonk", LAND, 0.7);
  shot(A3, END, "ngồi phịch, tỉnh bơ", function (t, lt, T) {
    var fall = VT.ease.in2(seg(t, DROP0, LAND));
    var o = { x: WX, y: GROUND + SIT * fall, flip: 1, armL: [70, 300], armR: [330, 300] };
    if (t < LAND) { o.sq = 1.1; o.eyes = "wide"; o.mouth = "o"; o.armL = [40, 150]; o.armR = [360, 150]; o.handL = "xoe"; o.handR = "xoe"; }
    else {
      o.sq = key(t, [[LAND, 0.76], [LAND + 0.32, 1, "elastic"]]);
      o.px = 0; o.py = 3; o.lid = 0.5 + 0.5 * VT.slowBlink(t, T_PURPOSE + 0.45, 0.36); o.brows = "flat"; o.mouth = "flat"; o.noBlink = true;
    }
    var out = bg(t) + W(t, o);
    // cỏ tiền cảnh che chân khi ngồi
    var fy = GROUND + 52, blades = "";
    for (var i = 0; i < 30; i++) {
      var x = WX - 420 + i * 29 + VT.hash(i * 5.1) * 14, h = 34 + VT.hash(i * 2.7) * 50, lean = (VT.hash(i * 9.3) - 0.5) * 40 + Math.sin(Math.round(t * 12) * 0.6 + i) * 5, w = 9 + VT.hash(i * 1.3) * 8;
      blades += VT.shape("M " + f(x - w) + " " + f(fy + 30) + " Q " + f(x - w * 0.3 + lean * 0.3) + " " + f(fy - h * 0.55) + " " + f(x + lean) + " " + f(fy - h) + " Q " + f(x + w * 0.4 + lean * 0.3) + " " + f(fy - h * 0.5) + " " + f(x + w) + " " + f(fy + 30) + " Z", i % 3 ? "#7FB24E" : "#94C463", { sw: 2.5, ox: 2, oy: 2, stroke: "#4F7F33" });
    }
    out += VT.shape("M " + (WX - 600) + " " + (fy + 6) + " C " + (WX - 200) + " " + (fy - 8) + " " + (WX + 200) + " " + (fy + 8) + " " + (WX + 600) + " " + (fy - 4) + " L " + (WX + 600) + " " + (fy + 400) + " L " + (WX - 600) + " " + (fy + 400) + " Z", SUM.grass, { sw: 2.5, ox: 0, oy: 0, stroke: "#4F7F33" }) + bib({ x: WX + 230, y: fy + 40, s: WS, rot: -8 }) + blades;
    if (t >= LAND && t < LAND + 0.35) {
      var k = seg(t, LAND, LAND + 0.35);
      out += VT.puffBurst({ x: WX - 150, y: GROUND - 10, k: k, s: 0.5, spread: 90 }) + VT.puffBurst({ x: WX + 150, y: GROUND - 10, k: k, s: 0.5, spread: 90 });
    }
    if (t < LAND) out += VT.speedLines({ x0: WX - 130, y0: GROUND - 420, n: 4, gap: 80, len: 70, dx: 0, dy: -1, sw: 5 });
    var face = [WX, GROUND + SIT - 222 * WS];
    var z = key(T, [[A3, 2.05], [END, 2.18, "sine"]]);
    return { cam: [face[0], face[1] + 40, z], shake: VT.shake(t, LAND, 0.22, 7), world: out, tint: "warm" };
  });
  return shots;
};
