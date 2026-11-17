/* Phân cảnh bản thử B: danh sách shot [a, b) theo giây tuyệt đối; mỗi shot là hàm thuần của thời gian t (đã nắn về bội số 1/12 s).
 * Mốc gag bám mốc từ trong ../chung/audio/subtitles.json (cộng mốc đặt giọng ở tools/tao_du_lieu.py).
 * Trả về { cam: [cx, cy, zoom], shake: [dx, dy], world: svg (theo camera), over: svg (theo khung), tint: "warm"|"cold" }.
 */
(function () {
  var B = window.WWB, C = B.C, key = B.key, pick = B.pick, seg = B.seg;

  function W(t, o) {
    o.t = t;
    if (o.mouth === "X" && o.rest) o.mouth = o.rest;
    var bl = o.noBlink ? 0 : B.blink(t, o.blinkP || 3.3, o.blinkOff == null ? 1.3 : o.blinkOff);
    o.lid = Math.max(o.lid || 0, bl);
    return B.wob(o);
  }
  function toLocal(o, X, Y) { var s = o.s || 1, fl = o.flip || 1; return [(X - o.x) / (s * fl) + 200, (Y - o.y) / s + 392 - (o.bob || 0)]; }
  function walk(t, t0, period) { return (t - t0) / period; }
  function talk(id, t) { return B.mouthAt(id, t); }

  // ---------- thế giới: bàn kỷ vật (hiện tại) ----------
  var DESK = 800;
  function deskWorld(t, o) {
    o = o || {};
    var s = "";
    s += '<rect x="-400" y="-400" width="2720" height="' + (DESK + 400) + '" fill="#F3D49B" opacity="0.28"/>';
    s += B.line("M -100 300 C 400 290 900 310 2100 296", 3, C.ink, 0.25); // gờ tường gợi ý
    s += B.lampLight({ x: 300, y: DESK });
    s += B.desk(DESK);
    s += B.box({ x: 1400, y: DESK });
    if (!o.noBook) s += B.bookClosed({ x: 1160, y: DESK });
    s += B.lamp({ x: 300, y: DESK });
    return s;
  }
  // ---------- thế giới: phố tuyết (hồi ức) ----------
  var GROUND = 800;
  function streetWorld(t, o) {
    o = o || {};
    var far = o.far || 0, s = "";
    s += B.sky();
    s += B.ridge(560, far * 0.5);
    s += B.farHouses(650, far, t);
    s += B.fog(t, 640, 2);
    s += B.snowGround(GROUND);
    if (o.houses !== false) {
      s += B.house({ x: 150 + (o.near || 0), y: GROUND, w: 440, s: 1.1, t: t, seed: 1 });
      s += B.house({ x: 980 + (o.near || 0), y: GROUND, w: 560, s: 1.3, door: true, open: o.open || 0, t: t, seed: 2 });
      s += B.thermo({ x: 1262 + (o.near || 0), y: GROUND - 40, s: 0.2, level: 0.12 });
      s += B.house({ x: 1780 + (o.near || 0), y: GROUND, w: 420, s: 1.05, t: t, seed: 3 });
    }
    s += B.diamondDust(t, 18, [0, 80, 1920, 760]);
    return s;
  }
  function marketWorld(t, o) {
    o = o || {};
    var s = B.sky() + B.ridge(560, 120) + B.farHouses(650, -200, t) + B.fog(t, 640, 2) + B.snowGround(GROUND);
    s += B.house({ x: 260, y: GROUND, w: 440, s: 1.0, t: t, seed: 4 });
    if (!o.noBarrel) s += B.barrel({ x: 960, y: GROUND + 10, s: 0.9 });
    s += B.stall({ x: 1400, y: GROUND, s: 1.0 });
    s += B.diamondDust(t, 14, [0, 80, 1920, 760]);
    return s;
  }
  function carWorld(t, o) {
    var s = B.sky() + B.ridge(560, -60) + B.farHouses(650, 140, t) + B.fog(t, 640, 2) + B.snowGround(GROUND);
    s += B.house({ x: 300, y: GROUND, w: 460, s: 1.1, t: t, seed: 5 });
    s += B.house({ x: 1720, y: GROUND, w: 420, s: 1.0, t: t, seed: 6 });
    return s;
  }

  var shots = [];
  function shot(a, b, fn) { shots.push({ a: a, b: b, fn: fn }); }

  // =============== CẢNH 1 · HIỆN TẠI · bàn kỷ vật ===============
  // A1: giơ cá (fish 0,80), gõ cá xuống bàn (bonk 1,62)
  shot(0, 2.3, function (t) {
    var o = { x: 760, y: DESK, s: 1.05, mouth: talk(1, t), brows: null }, fishL, out = "", over = "", sh = [0, 0];
    if (t < 0.58) { fishL = [200, 300, 0]; o.armL = [66, 300, -10]; o.armR = [334, 300, 10]; o.px = 2; o.bob = Math.sin(t * 6) * 3; }
    else if (t < 0.67) { fishL = [200, 150, 0]; o.armL = [80, 150, 20]; o.armR = [320, 150, -20]; o.sq = 1.14; o.eyes = "wide"; }
    else if (t < 1.33) {
      fishL = [200, 22, 0]; o.armL = [82, 30, -30]; o.armR = [318, 30, 30]; o.brows = "up";
      o.bob = key(t, [[0.67, -26], [0.92, 0, "out"]]); o.sq = key(t, [[0.67, 1.08], [0.92, 1, "out"]]);
    } else if (t < 1.5) { fishL = [200, 6, -14]; o.armL = [90, 14, -30]; o.armR = [310, 10, 30]; o.lean = -8; o.brows = "down"; }
    else if (t < 1.58) { fishL = [200, 200, 0]; o.armL = [70, 210, -10]; o.armR = [330, 210, 10]; o.sq = 0.92; o.eyes = "squint"; }
    else { fishL = [200, 366, 0]; o.armL = [64, 360, -10]; o.armR = [336, 360, 10]; o.sq = key(t, [[1.58, 0.88], [1.8, 1, "out"]]); o.py = 10; o.px = 4; o.brows = t > 1.85 ? "skeptic" : "up"; }
    o.prop = B.fish({ x: fishL[0], y: fishL[1], s: 0.85, rot: fishL[2] });
    out += deskWorld(t);
    out += W(t, o);
    if (t >= 0.67 && t < 1.2) { var k = Math.floor(t * 12) % 2; out += B.sparkle({ x: 900, y: 395, s: k ? 0.9 : 0.6 }) + B.sparkle({ x: 640, y: 420, s: k ? 0.5 : 0.8 }); }
    if (t >= 0.58 && t < 0.75) out += B.speedLines({ x0: 600, y0: 470, n: 1, len: 0 }) + B.line("M 610 520 L 610 640 M 910 520 L 910 640 M 680 500 L 680 600 M 840 500 L 840 600", 6);
    if (t >= 1.5 && t < 1.62) out += B.line("M 600 560 L 590 700 M 930 560 L 940 700 M 700 520 L 690 680 M 820 520 L 830 680", 6);
    if (t >= 1.58 && t < 1.85) { out += B.impact({ x: 610, y: 784, s: key(t, [[1.58, 0.6], [1.7, 1.1, "out"]]) }) + B.impact({ x: 912, y: 784, s: key(t, [[1.58, 0.5], [1.7, 0.9, "out"]]) }); sh = B.shake(t, 1.58, 0.3, 16); }
    return { cam: [930, 560, 1.08], shake: sh, world: out, tint: "warm" };
  });
  // A2: lật sổ (whoosh 2,38), chỉ vào biển; run khi nói "coldest permanently inhabited"
  shot(2.3, 7.0, function (t, lt) {
    var flipK = key(t, [[2.33, 0], [2.6, 1, "lin"]]), out = "";
    out += '<rect x="-200" y="-200" width="2320" height="1480" fill="' + C.wood + '"/>';
    for (var i = 0; i < 9; i++) out += B.line("M -100 " + (40 + i * 130) + " C 600 " + (30 + i * 130) + " 1300 " + (56 + i * 130) + " 2020 " + (40 + i * 130), 3, C.woodDark, 0.5);
    out += B.bookOpen({ x: 960, y: 560, page: flipK > 0.5 ? "village" : "", lit: 0 });
    if (flipK > 0 && flipK < 1) out += B.pageFlip({ x: 960, y: 560, k: flipK });
    var o = { x: 330, y: 1185, s: 1.25, mouth: talk(1, t), px: 8, py: -4, beanie: false };
    if (t < 2.62) {
      var edgeX = 960 + 760 * Math.cos(flipK * Math.PI), L = toLocal(o, edgeX, 560);
      o.armR = [L[0], L[1], -20]; o.lean = 6;
    } else if (t < 4.45) { o.arms = "point"; o.brows = "up"; }
    else if (t < 5.6) { o.arms = "hug"; o.shiver = 7; o.marks = "shiver"; o.brows = "worried"; o.cold = t > 4.7; }
    else { o.arms = "point"; o.px = t > 6.3 ? 0 : 8; o.py = t > 6.3 ? 2 : -4; o.brows = t > 6.3 ? "skeptic" : "up"; }
    out += W(t, o);
    var z = key(t, [[2.3, 1.0], [7.0, 1.05]]);
    return { cam: [960, 560, z], world: out, tint: "warm" };
  });
  // A3: cận làng trong sổ; tay Wob gõ từng nhà, đèn cửa sổ bật (7,95 · 8,27 · 8,55)
  var WIN = [[1096, 739], [1256, 764], [1416, 732]];
  shot(7.0, 9.55, function (t) {
    var lit = pick(t, [[0, 0], [7.95, 1], [8.27, 2], [8.55, 3]]), out = "";
    out += '<rect x="-200" y="-200" width="2320" height="1480" fill="' + C.wood + '"/>';
    out += B.bookOpen({ x: 960, y: 560, page: "village", lit: lit });
    var hand = key(t, [[7.0, [900, 1000]], [7.7, [1068, 760], "out"], [7.95, WIN[0], "io"], [8.12, [1188, 720]], [8.27, WIN[1]], [8.42, [1348, 700]], [8.55, WIN[2]], [8.8, [1408, 690]], [9.05, [1508, 610], "out"]]);
    var o = { x: 930, y: 965, s: 0.55, mouth: talk(1, t), px: 10, py: -8, brows: "up" };
    var L = toLocal(o, hand[0], hand[1]); o.armR = [L[0], L[1], -40];
    out += W(t, o);
    [7.95, 8.27, 8.55].forEach(function (tt, i) {
      if (t >= tt && t < tt + 0.25) { var r = 18 + (t - tt) * 120; out += B.ell(WIN[i][0], WIN[i][1], r, r * 0.8, "none", 4); }
    });
    return { cam: [1250, 680, 1.9], world: out, tint: "warm" };
  });
  // A4: quay phắt ra nhìn người xem (smear 9,62), "On purpose." giữ hình tỉnh bơ
  shot(9.55, 11.1, function (t) {
    var o = { x: 760, y: DESK, s: 1.05, mouth: talk(1, t) };
    var fish = B.fish({ x: 760, y: 768, s: 0.89 });
    if (t < 9.62) { o.px = 10; o.py = 10; o.flip = 1; o.lean = 6; o.brows = "up"; }
    else if (t < 9.71) { o.smear = 70; o.sq = 1.06; o.eyes = "squint"; }
    else { o.lid = 0.52; o.px = 0; o.py = 3; o.brows = "flat"; o.noBlink = true; o.rest = "flat"; }
    var out = deskWorld(t) + W(t, o) + fish;
    return { cam: [760, 600, 2.3], world: out, tint: "warm" };
  });
  // T1: lao vào hình vẽ trong sổ, hình "sống dậy" thành hồi ức
  shot(11.1, 12.45, function (t) {
    var out = '<rect x="-200" y="-200" width="2320" height="1480" fill="' + C.wood + '"/>' + B.bookOpen({ x: 960, y: 560, page: "village", lit: 3 });
    var z = key(t, [[11.1, 1.9], [12.4, 11, "in"]]), cx = key(t, [[11.1, 1250], [12.4, 1258]]), cy = key(t, [[11.1, 680], [12.4, 700]]);
    var over = "";
    if (t > 11.25) over += B.radialLines(960, 540, key(t, [[11.25, 700], [12.4, 380]]), 1300, 26, Math.floor(t * 12) % 3);
    var cold = seg(t, 11.7, 12.4);
    if (cold > 0) over = '<rect x="0" y="0" width="1920" height="1080" fill="' + C.sky + '" opacity="' + B.f(cold * 0.9 * 100) / 100 + '"/>' + over;
    return { cam: [cx, cy, z], world: out, over: over, tint: "warm" };
  });

  // =============== CẢNH 2 · HỒI ỨC · bước ra ngoài ===============
  // B1: phố làng, khói thẳng đứng, lớp xa gần trôi lệch
  shot(12.45, 15.3, function (t, lt) {
    var out = streetWorld(t, { far: -18 * lt, near: -40 * lt });
    return { cam: [960, 540, key(t, [[12.45, 1.0], [15.3, 1.05]])], world: out, tint: "cold" };
  });
  // B2: nhiệt kế tụt (drop 15,62), đóng băng (17,55); Wob nhìn qua cửa sổ
  shot(15.3, 19.9, function (t) {
    var lv = key(t, [[15.3, 0.56], [15.62, 0.56], [15.85, 0.08, "in"], [16.0, 0.135, "out"], [16.15, 0.12]]);
    var out = B.logWall();
    var sh = B.shake(t, 15.8, 0.25, 8);
    // cửa sổ có Wob bên trong
    var wx0 = 1180, wy0 = 250, ww = 480, wh = 470, clip = B.uid("win");
    out += '<clipPath id="' + clip + '"><rect x="' + wx0 + '" y="' + wy0 + '" width="' + ww + '" height="' + wh + '"/></clipPath>';
    out += B.shape("M " + (wx0 - 30) + " " + (wy0 - 30) + " L " + (wx0 + ww + 30) + " " + (wy0 - 30) + " L " + (wx0 + ww + 30) + " " + (wy0 + wh + 30) + " L " + (wx0 - 30) + " " + (wy0 + wh + 30) + " Z", C.woodDark, { sw: 7 });
    var o = { x: 1420, y: 870, s: 1.0, beanie: false, px: -12, py: 4, mouth: "X" };
    if (t >= 15.62 && t < 17.5) { o.eyes = "wide"; o.mouth = t < 16.2 ? "o" : "wobbly"; o.marks = t < 16.1 ? "shock" : null; o.sq = key(t, [[15.62, 1.1], [15.9, 1, "out"]]); o.arms = t < 16.1 ? "shock" : "hug"; }
    if (t >= 17.5) { o.shiver = 4; o.arms = "hug"; o.mouth = "chatter"; o.cold = true; o.brows = "worried"; }
    if (t >= 18.95) { o.mouth = pick(t, [[18.95, "o"], [19.5, "wobbly"]]); o.px = -6; o.py = 14; }
    out += '<g clip-path="url(#' + clip + ')"><rect x="' + wx0 + '" y="' + wy0 + '" width="' + ww + '" height="' + wh + '" fill="' + C.window + '"/>' + W(t, o) + "</g>";
    out += B.line("M " + (wx0 + ww / 2) + " " + wy0 + " L " + (wx0 + ww / 2) + " " + (wy0 + wh) + " M " + wx0 + " " + (wy0 + wh / 2) + " L " + (wx0 + ww) + " " + (wy0 + wh / 2), 12);
    out += B.line("M " + (wx0 + 40) + " " + (wy0 + 60) + " L " + (wx0 + 120) + " " + (wy0 + 20), 6, "#ffffff", 0.7);
    out += B.shape("M " + (wx0 - 40) + " " + (wy0 + wh + 30) + " L " + (wx0 + ww + 40) + " " + (wy0 + wh + 30) + " L " + (wx0 + ww + 20) + " " + (wy0 + wh + 60) + " L " + (wx0 - 20) + " " + (wy0 + wh + 60) + " Z", C.snow, { sw: 6 });
    if (t >= 17.55) out += '<path d="M ' + wx0 + " " + wy0 + " L " + (wx0 + 120) + " " + wy0 + " L " + (wx0 + 70) + " " + (wy0 + 40) + " L " + (wx0 + 40) + " " + (wy0 + 30) + " L " + wx0 + " " + (wy0 + 90) + ' Z" fill="#ffffff" opacity="0.85"/>';
    out += B.thermo({ x: 700, y: 1010, s: 1.15, level: lv, frost: t >= 17.55, icicle: t >= 17.55 ? key(t, [[17.55, 0], [17.8, 1, "back"]]) : 0 });
    if (t >= 15.62 && t < 15.95) out += B.speedLines({ x0: 560, y0: 300, n: 3, gap: 30, len: 240, dx: 0, dy: 1 }) + B.speedLines({ x0: 820, y0: 320, n: 3, gap: 30, len: 240, dx: 0, dy: 1 });
    return { cam: [960, 540, 1], shake: sh, world: out, tint: "cold" };
  });
  // B3: cửa mở, Wob quấn khăn bước ra (bước 20,25 · 20,62 · 21,00), nhìn trái, nhìn phải
  shot(19.9, 22.0, function (t) {
    var open = key(t, [[19.9, 0], [20.05, 1, "out"]]);
    var out = streetWorld(t, { open: open });
    var wx = key(t, [[20.05, 1104], [21.12, 830, "lin"]]);
    var o = { x: wx, y: GROUND, s: 0.55, beanie: true, scarf: true, flip: -1, mouth: "X" };
    if (t < 21.12) { o.legs = "walk"; o.phase = walk(t, 20.0, 0.75); o.bob = -Math.abs(Math.sin(o.phase * Math.PI * 2)) * 10; o.lean = Math.sin(o.phase * Math.PI * 2) * 6; o.mouth = "smile"; o.eyes = "happy"; }
    else if (t < 21.55) { o.flip = -1; o.px = -12; o.brows = "up"; }
    else { o.flip = 1; o.px = 12; o.brows = "up"; }
    if (t >= 20.05) {
      out += W(t, o);
      [20.25, 20.62, 21.0].forEach(function (tt, i) { if (t >= tt && t < tt + 0.3) out += B.puff({ x: wx + (i % 2 ? 30 : -30), y: GROUND, s: 0.35 + (t - tt) }); });
      [21.3, 21.72].forEach(function (tt) { if (t >= tt && t < tt + 0.45) { var p = B.wobPt(o, 200 + 150, 230); out += B.puff({ x: p[0] + (t - tt) * 60 * (o.flip || 1), y: p[1] - (t - tt) * 80, s: 0.3 + (t - tt) * 0.6 }); } });
    }
    return { cam: [990, 610, 1.55], world: out, tint: "cold" };
  });
  // B4: lông mi bật ra (pop 22,15), đóng băng (tach-bang 22,62), "?!" (22,92)
  shot(22.0, 23.42, function (t) {
    var out = streetWorld(t, { open: 1 });
    var o = { x: 830, y: GROUND, s: 0.55, beanie: true, scarf: true, flip: 1, px: 0, py: 0, mouth: "X" };
    o.lashes = t < 22.15 ? 0 : key(t, [[22.15, 0.2], [22.25, 1.4, "out"], [22.4, 1.0]]);
    o.lashIce = t >= 22.62; o.cold = t >= 22.62; o.frost = t >= 22.62;
    o.eyes = t >= 22.15 ? "wide" : "open"; o.brows = t >= 22.15 ? "up" : null;
    o.mouth = t >= 22.15 ? (t >= 22.62 ? "chatter" : "o") : "X";
    o.sq = t >= 22.15 ? key(t, [[22.15, 1.08], [22.35, 1, "out"]]) : 1;
    var sh = B.shake(t, 22.62, 0.25, 7);
    out += W(t, o);
    if (t >= 22.62 && t < 22.95) out += B.radialLines(B.wobPt(o, 200, 130)[0], B.wobPt(o, 200, 130)[1], 40, 70, 10, 2);
    if (t >= 22.92) { var p = B.wobPt(o, 20, 60); out += B.bubble({ x: p[0] - 40, y: p[1] - 30, s: key(t, [[22.92, 0.15], [23.05, 0.36, "back"]]), sym: "?!", tail: 1 }); }
    var c = B.wobPt(o, 200, 180);
    return { cam: [c[0] - 30, c[1] - 20, 3.4], shake: sh, world: out, tint: "cold" };
  });
  // B5: lác mắt nhìn lông mi của chính mình, giữ hình
  shot(23.42, 25.55, function (t) {
    var out = streetWorld(t, { open: 1 });
    var o = { x: 830, y: GROUND, s: 0.55, beanie: true, scarf: true, eyes: "cross", lashes: 1, lashIce: true, cold: true, frost: true, mouth: "wobbly", brows: "up", noBlink: true };
    o.shiver = Math.floor(t * 2) % 2 ? 1.2 : 0;
    out += W(t, o);
    var c = B.wobPt(o, 200, 150);
    return { cam: [c[0], c[1] + 4, 5.4], world: out, tint: "cold" };
  });

  // =============== CẢNH 3 · HỒI ỨC · chợ ===============
  // C1: lạch bạch tới chợ (bước 25,85 · 26,25 · 26,65 · 27,05), mừng rỡ ở "market"
  shot(25.55, 29.2, function (t) {
    var out = marketWorld(t);
    var wx = key(t, [[25.55, -140], [27.25, 640, "lin"]]);
    var o = { x: wx, y: GROUND, s: 0.62, beanie: true, scarf: true, cold: true, mouth: "X" };
    if (t < 27.25) { o.legs = "walk"; o.phase = walk(t, 25.65, 0.8); o.bob = -Math.abs(Math.sin(o.phase * Math.PI * 2)) * 10; o.lean = Math.sin(o.phase * Math.PI * 2) * 6; o.mouth = "content"; }
    else if (t < 28.15) { o.eyes = "happy"; o.mouth = "smile"; o.arms = "up"; o.bob = key(t, [[27.55, 0], [27.7, -40, "out"], [27.95, 0, "bounce"]]); }
    else { o.px = 12; o.py = 4; o.brows = "skeptic"; o.lean = 6; o.mouth = "flat"; }
    out += W(t, o);
    [25.85, 26.25, 26.65, 27.05].forEach(function (tt, i) { if (t >= tt && t < tt + 0.3) out += B.puff({ x: wx + (i % 2 ? 26 : -26), y: GROUND, s: 0.35 + (t - tt) }); });
    return { cam: [960, 540, 1], world: out, tint: "cold" };
  });
  // C2: cận thùng cá dựng đứng; Wob gõ thử (bonk 30,55), cá không nhúc nhích
  shot(29.2, 31.5, function (t) {
    var out = marketWorld(t);
    var o = { x: 760, y: GROUND, s: 0.62, beanie: true, scarf: true, cold: true, px: 12, py: -6, brows: "skeptic", mouth: "flat" };
    var hand = key(t, [[29.2, [0, 0]], [30.2, [0, 0]], [30.5, [1, 0], "out"], [30.55, [1, 1]], [30.62, [1, 0]], [30.9, [0, 0]]]);
    var L1 = toLocal(o, 920, 560);
    o.armR = [B.lerp(338, L1[0] - hand[1] * 10, hand[0]), B.lerp(300, L1[1], hand[0]), -10];
    if (t >= 30.55) o.sq = key(t, [[30.55, 0.95], [30.7, 1, "out"]]);
    if (t >= 30.95) { o.px = 0; o.py = 2; o.lid = 0.45; o.brows = "flat"; }
    out += W(t, o);
    if (t >= 30.55 && t < 30.8) { out += B.line("M 900 520 q -20 30 0 60", 6) + B.line("M 880 500 q -34 50 0 100", 6) + B.line("M 945 520 q 20 30 0 60", 6); }
    return { cam: [900, 560, 2.0], world: out, tint: "cold" };
  });
  // C3: lùi máy thấy cả làng nằm trong tủ đông; cửa tủ đóng sập (32,92)
  shot(31.5, 33.7, function (t) {
    var close = t < 32.7 ? 0 : key(t, [[32.7, 0], [32.92, 1, "in"]]);
    var z = key(t, [[31.5, 2.6], [32.45, 1.0, "out"]]), cx = key(t, [[31.5, 940], [32.45, 960, "out"]]), cy = key(t, [[31.5, 800], [32.45, 545, "out"]]);
    var tiny = { x: 920, y: 868, s: 0.1, beanie: true, scarf: true, cold: true, mouth: "X", noBlink: true };
    return { cam: [cx, cy, z], shake: B.shake(t, 32.92, 0.4, 20), world: freezerShot(t, close, tiny), tint: "cold" };
  });
  function freezerShot(t, close, tiny) {
    var s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#cfe0e8"/>';
    s += B.freezer({ close: 0, t: t, doorless: true });
    s += W(t, tiny);
    s += B.freezer({ close: close, t: t, doorOnly: true });
    if (t >= 32.92 && t < 33.6) {
      var k = seg(t, 32.92, 33.6);
      [[230, 300], [230, 700], [1690, 200], [1690, 900], [600, 1000], [1300, 1000], [900, 90]].forEach(function (p, i) {
        s += B.puff({ x: p[0] + (p[0] < 400 ? -1 : p[0] > 1600 ? 1 : 0) * k * 120, y: p[1] + (p[1] > 950 ? 1 : p[1] < 100 ? -1 : 0) * k * 80, s: 1.0 + k * 2.2 + B.hash(i) * 0.4 });
      });
    }
    return s;
  }
  // C4: chìa túi, bong bóng hình cái túi (liu-lo-hoi 34,00); bàn tay đeo găng đưa cá
  // C5: cá chọc thủng túi (pop 35,62); Wob nhìn người xem
  function marketMedium(t) {
    var out = marketWorld(t, { noBarrel: true });
    out += B.barrel({ x: 640, y: GROUND + 10, s: 0.9 });
    var o = { x: 960, y: GROUND, s: 0.62, beanie: true, scarf: true, cold: true, mouth: "X" };
    var bagW, fishW = null, torn = false;
    o.armR = [404, 236, 16];
    var handW = B.wobPt(o, 404, 236);
    bagW = [handW[0], handW[1] + 100];
    var gloveX = key(t, [[33.7, 2000], [34.3, 2000], [34.75, 1290, "out"], [35.2, 1290], [35.55, 2000, "in"]]);
    if (t < 34.75) { o.eyes = "open"; o.brows = "up"; o.mouth = "smile"; o.px = 10; }
    if (t >= 34.75 && t < 35.1) { o.px = 12; o.py = -2; o.brows = "skeptic"; o.mouth = "flat"; }
    if (t < 35.2) fishW = [gloveX - 230, 540, 0];
    else if (t < 35.62) { var k = seg(t, 35.2, 35.6); fishW = [B.lerp(1060, bagW[0], k), B.lerp(540, bagW[1] - 150, k), B.lerp(0, -90, k)]; o.eyes = "open"; o.px = 6; o.py = 10; o.brows = "up"; }
    else { fishW = [bagW[0], bagW[1] - 40, -90]; torn = true; o.eyes = t < 35.95 ? "wide" : "open"; o.lid = t >= 35.95 ? 0.5 : 0; o.px = t >= 35.95 ? 0 : 6; o.py = t >= 35.95 ? 3 : 10; o.brows = t >= 35.95 ? "flat" : "up"; o.mouth = t >= 35.95 ? "flat" : "o"; o.noBlink = t >= 35.95; }
    out += W(t, o);
    if (fishW) out += B.fish({ x: fishW[0], y: fishW[1], s: 0.6, rot: fishW[2] });
    out += B.bag({ x: bagW[0], y: bagW[1] + 30, s: 0.85, torn: torn });
    out += B.dot(handW[0], handW[1] - 30, 9);
    if (gloveX < 1990) out += B.glove({ x: gloveX, y: 540, s: 0.9 });
    if (t >= 33.9 && t < 34.8) { var p = B.wobPt(o, 60, 20); out += B.bubble({ x: p[0] - 30, y: p[1] - 40, s: key(t, [[33.9, 0.15], [34.05, 0.42, "back"]]), sym: "bag", tail: 1 }); }
    if (t >= 35.62 && t < 35.9) out += B.impact({ x: bagW[0], y: bagW[1] + 40, s: 0.5 });
    return out;
  }
  shot(33.7, 35.1, function (t) { return { cam: [1130, 560, 1.55], world: marketMedium(t), tint: "cold" }; });
  shot(35.1, 36.7, function (t) { return { cam: [1040, 600, 1.9], world: marketMedium(t), tint: "cold" }; });
  // C6: vác cá trên vai như tấm ván, lạch bạch đi (bước 36,95 · 37,35 · 37,75)
  shot(36.7, 38.4, function (t, lt) {
    var wx = 420 + lt * 280, camX = wx + 120;
    var out = streetWorld(t, { far: (camX - 960) * 0.55 });
    var o = { x: wx, y: GROUND, s: 0.62, beanie: true, scarf: true, cold: true, legs: "walk", phase: walk(t, 36.75, 0.8), lid: 0.4, brows: "flat", mouth: "flat", arms: "shoulder", py: 2 };
    o.bob = -Math.abs(Math.sin(o.phase * Math.PI * 2)) * 10; o.lean = Math.sin(o.phase * Math.PI * 2) * 5;
    o.prop = B.fish({ x: 220, y: 30, s: 0.9, rot: -12 });
    out += W(t, o);
    [36.95, 37.35, 37.75].forEach(function (tt, i) { if (t >= tt && t < tt + 0.3) out += B.puff({ x: wx + (i % 2 ? 26 : -26), y: GROUND, s: 0.35 + (t - tt) }); });
    return { cam: [camX, 620, 1.45], world: out, tint: "cold" };
  });
  // C7: cận mặt con cá thanh thản, băng lấp lánh (ting 39,05)
  shot(38.4, 41.0, function (t, lt) {
    var out = B.sky("#DCEAF0");
    for (var i = 0; i < 24; i++) { var a = i / 24 * Math.PI * 2; out += B.line("M " + B.f(960 + Math.cos(a) * 520) + " " + B.f(540 + Math.sin(a) * 330) + " L " + B.f(960 + Math.cos(a) * 1200) + " " + B.f(540 + Math.sin(a) * 800), 10, "#ffffff", 0.55); }
    out += B.fish({ x: 900, y: 560, s: 3.0, eye: "serene" });
    if (t >= 39.05) { var k = Math.floor(t * 6) % 3; [[1400, 330], [560, 300], [1500, 760], [700, 820]].forEach(function (p, j) { out += B.sparkle({ x: p[0], y: p[1], s: (j + k) % 3 === 0 ? 1.2 : 0.7 }); }); }
    out += B.diamondDust(t, 10, [100, 100, 1820, 980]);
    return { cam: [960, 540, key(t, [[38.4, 1.0], [41.0, 1.08]])], world: out, tint: "cold" };
  });

  // =============== CẢNH 4 · HỒI ỨC · xe nổ máy, cốc trà ===============
  // D1: xe nổ máy không người (máy nổ từ 41,10); Wob lạch bạch tới
  shot(41.0, 44.15, function (t) {
    var out = carWorld(t);
    out += B.car({ x: 1200, y: GROUND + 20, s: 0.9, run: t });
    var wx = key(t, [[41.0, -140], [42.75, 660, "lin"]]);
    var o = { x: wx, y: GROUND, s: 0.62, beanie: true, scarf: true, cold: true, mouth: "X" };
    if (t < 42.75) { o.legs = "walk"; o.phase = walk(t, 41.05, 0.8); o.bob = -Math.abs(Math.sin(o.phase * Math.PI * 2)) * 10; o.lean = Math.sin(o.phase * Math.PI * 2) * 6; }
    else { o.px = 12; o.brows = t > 43.2 ? "up" : null; o.lean = t > 43.8 ? 8 : 0; }
    out += W(t, o);
    return { cam: [960, 540, 1], world: out, tint: "cold" };
  });
  // D2: nhìn qua cửa kính: ghế lái trống; Wob vẫy tay chào cái ghế (liu-lo-vui 45,25)
  shot(44.15, 46.55, function (t) {
    var out = carWorld(t);
    out += B.car({ x: 1200, y: GROUND + 20, s: 0.9, run: t });
    var o = { x: 1080, y: GROUND, s: 0.62, beanie: true, scarf: true, cold: true, legs: "apart", bob: -70, px: 14, py: -6, mouth: "X", lean: 8 };
    if (t >= 44.25 && t < 44.9) { o.eyes = "wide"; o.brows = "up"; }
    if (t >= 44.9 && t < 45.9) { var w = Math.floor(t * 6) % 2; o.armR = [w ? 360 : 300, 50, -20]; o.eyes = "happy"; o.mouth = "smile"; }
    if (t >= 45.9) { o.lid = 0.5; o.px = -14; o.py = 3; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; o.lean = 0; }
    out += W(t, o);
    return { cam: [1240, 560, 2.1], world: out, tint: "cold" };
  });
  // D3: xe phủ tuyết, tắt máy; Wob vỗ nắp (bonk 48,30); mảng tuyết rơi trúng đầu (drop 49,95)
  shot(46.55, 50.5, function (t) {
    var out = carWorld(t);
    out += B.car({ x: 1150, y: GROUND + 20, s: 0.9, snow: true, color: "#6F8C93" });
    var o = { x: 690, y: GROUND, s: 0.62, beanie: true, scarf: true, cold: true, px: 12, py: -2, brows: "worried", mouth: "flat" };
    var pat = key(t, [[47.9, 0], [48.25, 1, "out"], [48.45, 0.8], [48.7, 0]]);
    var L = toLocal(o, 860, 676); o.armR = [B.lerp(338, L[0], pat), B.lerp(300, L[1], pat), -10];
    if (t >= 49.0 && t < 49.95) { o.py = -14; o.px = 10; o.brows = "up"; o.mouth = "o"; }
    var slabY = key(t, [[49.6, 560], [49.95, B.wobPt(o, 200, 60)[1], "in"]]), slabX = key(t, [[49.6, 1010], [49.95, 690, "in"]]);
    if (t >= 49.95) { o.snowhat = true; o.sq = key(t, [[49.95, 0.8], [50.15, 1, "out"]]); o.lid = t < 50.15 ? 1 : 0.5; o.px = 0; o.py = 3; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; }
    out += W(t, o);
    if (t >= 49.6 && t < 49.95) out += B.g(B.tr(slabX, slabY, 0.62), B.shape(B.smooth([[-110, 0], [-90, -40], [0, -60], [90, -40], [110, 0], [0, 20]], true), C.snow, { sw: 6 }));
    if (t >= 48.25 && t < 48.6) out += B.puff({ x: 870, y: 650, s: 0.5 + (t - 48.25) * 2 });
    if (t >= 49.95 && t < 50.35) { var k = seg(t, 49.95, 50.35); out += B.puff({ x: 640 - k * 80, y: 640, s: 0.5 + k }) + B.puff({ x: 740 + k * 80, y: 640, s: 0.5 + k }); }
    return { cam: [960, 580, 1.3], shake: B.shake(t, 49.95, 0.25, 10), world: out, tint: "cold" };
  });
  // D4: pha trà, hơi bốc (hoi-nuoc 50,85) · D5: hơi trà đông lại (52,30), dốc cốc, trà là khối cứng (ting 53,22)
  shot(50.5, 53.62, function (t) {
    var out = streetWorld(t, { open: 1 });
    var o = { x: 900, y: GROUND, s: 0.62, beanie: true, scarf: true, snowhat: true, cold: true, mouth: "smile", eyes: "happy" };
    var cupState = t < 52.3 ? "hot" : "frozen", cup;
    if (t < 52.85) {
      o.armL = [262, 292, 30]; o.armR = [352, 300, -10];
      cup = B.cup({ x: 312, y: 340, s: 0.72, state: cupState, t: t });
      if (t >= 52.3) { o.eyes = t < 52.6 ? "wide" : "open"; o.mouth = "o"; o.brows = "up"; o.px = 10; o.py = -8; }
    } else {
      var shk = t >= 53.2 && t < 53.45 ? (Math.floor(t * 12) % 2 ? 10 : -10) : 0;
      o.armL = [146 + shk, -50, -60]; o.armR = [254 + shk, -50, 60];
      cup = B.cup({ x: 200 + shk, y: -40, s: 0.72, state: "flip", drop: t >= 53.4 ? 6 : 0 });
      o.eyes = "open"; o.lid = 0.45; o.px = 0; o.py = -10; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true;
    }
    o.prop = cup;
    out += W(t, o);
    var sh = B.shake(t, 52.3, 0.2, 6);
    var c = B.wobPt(o, 210, 170);
    return { cam: [c[0] + 20, c[1] - 30, 2.3], shake: sh, world: out, tint: "cold" };
  });

  // =============== "Anyway." · CẢNH 5 · HIỆN TẠI ===============
  // E1: cắt cứng về hiện tại, cận mặt Wob trùm chăn: "Anyway."
  shot(53.62, 54.6, function (t) {
    var o = { x: 760, y: DESK, s: 1.05, blanket: true, lid: 0.5, brows: "flat", mouth: talk(4, t), noBlink: true, shiver: 1.5, armL: [236, 340, 30], armR: [352, 344, -10], rest: "flat" };
    o.prop = B.cup({ x: 318, y: 384, s: 0.72, state: "hot", t: t });
    var out = deskWorld(t) + B.puddle({ x: 1180, y: DESK + 8 }) + B.fish({ x: 1180, y: 772, s: 0.9, bend: 0.7, thaw: true, eye: "limp" }) + W(t, o);
    return { cam: [760, 610, 2.5], world: out, tint: "warm" };
  });
  function deskEnd(t) {
    var bend = key(t, [[56.6, 0.7], [56.8, 1.0, "back"]]);
    var o = { x: 760, y: DESK, s: 1.05, blanket: true, lid: 0.35, brows: "worried", mouth: talk(5, t), shiver: 3.5, marks: "shiver", armL: [236, 340, 30], armR: [352, 344, -10], py: 2 };
    if (t >= 56.2 && t < 57.3) { o.px = 14; o.py = 6; }
    if (t > 58.85) o.mouth = Math.floor(t * 6) % 2 ? "chatter" : "chatter2";
    o.prop = B.cup({ x: 318, y: 384, s: 0.72, state: "hot", t: t });
    var out = deskWorld(t) + B.puddle({ x: 1180, y: DESK + 8 }) + B.fish({ x: 1180, y: 772, s: 0.9, bend: bend, thaw: true, eye: "limp" });
    [[1040, 0], [1320, 0.4]].forEach(function (d, i) {
      var p = ((t + d[1]) % 0.8) / 0.8; out += B.drop({ x: d[0], y: 800 + p * 30, s: 0.55, fill: "#9fd3ea" });
    });
    out += W(t, o);
    return out;
  }
  // E2: bàn, cá mềm oặt có vũng nước, Wob trùm chăn run, ôm cốc nóng
  shot(54.6, 58.05, function (t) { return { cam: [930, 600, 1.2], world: deskEnd(t), tint: "warm" }; });
  // E3: "I took a week." cận mặt, răng va lập cập (brr 58,85), giữ hình tới hết
  shot(58.05, 60.31, function (t) { return { cam: [760, 610, 2.25], world: deskEnd(t), tint: "warm" }; });

  B.SHOTS = shots;
  B.drawShot = function (t) {
    for (var i = 0; i < shots.length; i++) if (t >= shots[i].a && t < shots[i].b) return shots[i].fn(t, t - shots[i].a);
    var l = shots[shots.length - 1]; return l.fn(t, t - l.a);
  };
})();
