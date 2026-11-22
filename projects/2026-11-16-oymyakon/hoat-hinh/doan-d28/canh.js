/* d28 · vẽ tay · cổng trường, ngày nghỉ vì lạnh (456,81–479,14 s tuyệt đối; 22,33 s). Vào "cat", ra "cat".
 * Đồ Wob: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng. Không vẽ trẻ em cụ thể: chỉ vài chiếc ba lô nhỏ treo móc.
 * Chữ duy nhất: "≈ −52°C · −62°F" (lấy nguyên chuỗi từ chu_tren_do_vat, mức dè dặt, kèm dấu "?" vẽ bằng nét).
 * S1 Wob đi ngang cổng trường · S2 ba lô nhỏ treo móc · S3 ngước nhìn nhiệt kế trên cổng · S4 nhiệt kế tụt, vạch khoanh đỏ + "?"
 * · S5 "?" lắc lư, Wob nhún vai · S6 bong bóng: trường nơi khác đóng cổng vì vài bông tuyết · S7 bong bóng: Wob đắp người tuyết giữa sân nắng
 * · S8 bong bóng đóng băng, nứt · S9 vỡ rơi lả tả xuống chân, Wob nhìn người xem tỉnh bơ, giữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, INK = C.ink, GROUND = 860, WS = 0.7;
  var LABEL = D.chu_tren_do_vat[0];
  var T_YOUNGER = VT.tu("younger"), T_OFF = VT.tu("off"), T_MINUS = VT.tu("minus"), T_FIFTY = VT.tu("fifty-two");
  var T_CUT = VT.tu("cut-off"), T_WHO = VT.tu("who"), T_ASK = VT.tu("ask"), T_CLOSE = VT.tu("close"), T_DUST = VT.tu("dusting");
  var T_ASKED = VT.tu("asked"), T_DAYS = VT.tu("days"), T_DOES = VT.tu("does"), T_SPEC = VT.tu("specific");
  var N = D.nhip.map(function (n) { return n.tai; }), END = D.thoi_luong;
  var A2 = 1.25, A3 = 3.3, A4 = N[2], A5 = N[3], A6 = N[4], A7 = N[5], A8 = N[6], A9 = N[7], A10 = N[8];

  function W(t, o) {
    var b = { t: t, s: WS, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes !== "happy" && b.eyes !== "closed" && b.eyes !== "squint") b.lid = Math.max(b.lid || 0, VT.blink(t, 3.2, 0.5));
    return VT.wob(b);
  }

  // ---------- cảnh cổng trường chiều tối ----------
  var GX0 = 760, GX1 = 1040, TH = { x: GX0, y: 812, s: 0.45 }, MARK = 0.12;
  var BAGS = [[1180, "#D9543C"], [1290, "#3F6A70"], [1400, "#E8C25A"], [1510, "#6E9F45"]];
  function school() {
    var s = VT.shape("M 1000 860 L 1000 420 L 2100 420 L 2100 860 Z", "#D8C08A", { sw: 7 });
    s += VT.shape("M 970 430 L 1300 330 L 2130 330 L 2130 430 Z", "#6C5A4E", { sw: 7 });
    s += VT.line("M 970 430 L 2130 430", 14, C.snow);
    [[1120, 480], [1300, 480], [1480, 480], [1660, 480], [1840, 480], [1120, 650], [1300, 650], [1480, 650], [1660, 650], [1840, 650]].forEach(function (w, i) {
      s += VT.shape("M " + w[0] + " " + w[1] + " L " + (w[0] + 100) + " " + w[1] + " L " + (w[0] + 100) + " " + (w[1] + 110) + " L " + w[0] + " " + (w[1] + 110) + " Z", i % 3 === 1 ? "#9FB0C8" : C.window, { sw: 5 });
      s += VT.line("M " + (w[0] + 50) + " " + w[1] + " L " + (w[0] + 50) + " " + (w[1] + 110), 4) + VT.line("M " + (w[0] - 6) + " " + (w[1] + 110) + " L " + (w[0] + 106) + " " + (w[1] + 110), 8, C.snow);
    });
    return s;
  }
  function fence(t) {
    var s = "";
    for (var x = -600; x < 2400; x += 60) {
      if (x > GX0 - 40 && x < GX1 + 40) continue;
      s += VT.shape("M " + (x - 14) + " " + GROUND + " L " + (x - 14) + " " + (GROUND - 150) + " L " + x + " " + (GROUND - 170) + " L " + (x + 14) + " " + (GROUND - 150) + " L " + (x + 14) + " " + GROUND + " Z", "#6E8A6A", { sw: 4, ox: 2, oy: 2 });
    }
    s += VT.line("M -600 " + (GROUND - 120) + " L " + (GX0 - 30) + " " + (GROUND - 120) + " M " + (GX1 + 30) + " " + (GROUND - 120) + " L 2400 " + (GROUND - 120), 10, "#4F6A4C");
    // móc + ba lô nhỏ đung đưa
    BAGS.forEach(function (b, i) {
      var sw = Math.sin(Math.round(t * 12) * 0.35 + i * 1.3) * 5, hx = b[0], hy = GROUND - 128;
      s += VT.line("M " + hx + " " + hy + " q 0 14 -10 16", 5);
      s += VT.g("rotate(" + f(sw) + " " + hx + " " + (hy + 14) + ")",
        VT.line("M " + (hx - 18) + " " + (hy + 14) + " Q " + hx + " " + (hy + 2) + " " + (hx + 18) + " " + (hy + 14), 5) +
        VT.shape("M " + (hx - 40) + " " + (hy + 24) + " C " + (hx - 44) + " " + (hy + 8) + " " + (hx + 44) + " " + (hy + 8) + " " + (hx + 40) + " " + (hy + 24) + " L " + (hx + 44) + " " + (hy + 104) + " C " + (hx + 44) + " " + (hy + 118) + " " + (hx - 44) + " " + (hy + 118) + " " + (hx - 44) + " " + (hy + 104) + " Z", b[1], { sw: 5 }) +
        VT.shape("M " + (hx - 26) + " " + (hy + 60) + " L " + (hx + 26) + " " + (hy + 60) + " L " + (hx + 26) + " " + (hy + 96) + " L " + (hx - 26) + " " + (hy + 96) + " Z", "#ffffff", { sw: 4, op: 0.35 }) +
        VT.line("M " + (hx - 40) + " " + (hy + 40) + " L " + (hx + 40) + " " + (hy + 40), 3, INK, 0.5));
    });
    return s;
  }
  function gate() {
    var s = "";
    [GX0, GX1].forEach(function (x) { s += VT.shape("M " + (x - 34) + " " + GROUND + " L " + (x - 34) + " " + (GROUND - 430) + " L " + (x + 34) + " " + (GROUND - 430) + " L " + (x + 34) + " " + GROUND + " Z", "#A65A44", { sw: 6 }); s += VT.shape("M " + (x - 44) + " " + (GROUND - 430) + " L " + (x + 44) + " " + (GROUND - 430) + " L " + (x + 36) + " " + (GROUND - 452) + " L " + (x - 36) + " " + (GROUND - 452) + " Z", C.snow, { sw: 5 }); });
    s += VT.shape("M " + (GX0 - 30) + " " + (GROUND - 400) + " Q " + ((GX0 + GX1) / 2) + " " + (GROUND - 500) + " " + (GX1 + 30) + " " + (GROUND - 400) + " L " + (GX1 + 30) + " " + (GROUND - 372) + " Q " + ((GX0 + GX1) / 2) + " " + (GROUND - 470) + " " + (GX0 - 30) + " " + (GROUND - 372) + " Z", "#4F6A4C", { sw: 6 });
    return s;
  }
  // nhiệt kế trên cổng: bảng gỗ rộng để có chỗ cho nhãn; label 0..1 hiện nhãn + khoanh đỏ; q: góc lắc dấu "?"
  function thermo(t, level, label, ring, q) {
    var mk = -150 - 510 * MARK, out = VT.shape("M -150 -730 L 600 -730 L 600 0 L -150 0 Z", "#E9C892", { sw: 7, ox: 8, oy: 6 });
    out += VT.ell(560, -690, 9, 9, "#7a4a2a", 3) + VT.ell(560, -40, 9, 9, "#7a4a2a", 3);
    out += VT.thermo({ x: 0, y: 0, level: level, mark: MARK, frost: true });
    if (label > 0) {
      out += '<g opacity="' + f(Math.min(1, label * 1.5) * 100) / 100 + '">' + VT.text(340, mk + 22, LABEL, 60, { w: 900, fill: INK }) + "</g>";
    }
    if (ring > 0) {
      var L = 1800;
      out += '<path d="M 70 ' + f(mk) + ' C 70 ' + f(mk - 90) + ' 600 ' + f(mk - 96) + ' 606 ' + f(mk - 6) + ' C 610 ' + f(mk + 80) + ' 80 ' + f(mk + 96) + ' 52 ' + f(mk + 10) + ' C 44 ' + f(mk - 20) + ' 80 ' + f(mk - 60) + ' 130 ' + f(mk - 70) + '" fill="none" stroke="' + C.accent2 + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + L + '" stroke-dashoffset="' + f(L * (1 - ring)) + '"/>';
    }
    if (q != null) out += VT.glyph({ x: 560, y: mk - 110, s: 0.6, sym: "?", rot: q });
    return VT.wrap(TH, out);
  }
  function scene(t, o) {
    o = o || {};
    var s = VT.sky("#7D8DB2", 1) + VT.ridge(560, -60, "#9AA7C6") + VT.ell(300, 300, 64, 64, "#F3C58A", 6);
    s += school() + VT.snowGround(GROUND) + fence(t) + gate();
    s += thermo(t, o.level == null ? 0.42 : o.level, o.label || 0, o.ring || 0, o.q);
    return s;
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S1 · Wob đi ngang cổng trường =====
  var WK = { t0: 0.0, t1: 1.05, x0: 560, x1: 980, chuKy: 0.7, s: WS };
  VT.buoc(0, WK).steps.forEach(function (st) { VT.sfx("buoc-tuyet", st.t, 0.4); });
  shot(0, A2, "đi ngang cổng trường", function (t, lt, T) {
    var wk = VT.buoc(t, WK), o = { x: wk.x, y: GROUND, flip: 1 };
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; o.px = 6; o.mouth = "content"; }
    else { o.px = 12; o.py = -14; o.brows = "up"; o.mouth = "oSmall"; o.sq = key(t, [[WK.t1, 0.92], [WK.t1 + 0.25, 1, "back"]]); }
    var s = scene(t) + W(t, o);
    wk.steps.forEach(function (st, i) { if (t >= st.t && t < st.t + 0.3) s += VT.puff({ x: st.x + (i % 2 ? 16 : -16), y: GROUND + 4, s: 0.25 + (t - st.t) * 0.8 }); });
    var z = key(T, [[0, 0.98], [A2, 1.04, "sine"]]);
    return { cam: [key(T, [[0, 820], [A2, 900, "sine"]]), 560, z], world: s, tint: "cold" };
  });

  // ===== S2 · ba lô nhỏ treo móc, Wob nhìn =====
  shot(A2, A3, "ba lô treo móc", function (t, lt, T) {
    var o = { x: 1000, y: GROUND, flip: 1, px: 12, py: 2, brows: "up", mouth: "content" };
    if (t >= T_YOUNGER) { o.legs = "tiptoe"; o.bob = -10; o.px = 14; o.py = 6; o.lean = 5; }
    var s = scene(t) + W(t, o);
    var z = key(T, [[A2, 1.62], [A3, 1.72, "sine"]]);
    return { cam: [key(T, [[A2, 1200], [A3, 1240, "sine"]]), 690, z], world: s, tint: "cold" };
  });

  // ===== S3 · ngước nhìn nhiệt kế trên cổng =====
  shot(A3, A4, "ngước nhìn nhiệt kế", function (t, lt, T) {
    var o = { x: 1000, y: GROUND, flip: -1, px: 8, py: -14, brows: "up", mouth: "oSmall", lean: key(t, [[A3, 0], [A3 + 0.4, -6, "io"]]) };
    if (t >= T_OFF - 0.1) { o.arms = "point"; o.armR = [400, 70]; o.handR = "chi"; }
    var s = scene(t, { level: 0.42 }) + W(t, o);
    var z = key(T, [[A3, 1.5], [A4, 1.75, "io"]]), cy = key(T, [[A3, 690], [A4, 560, "io"]]), cx = key(T, [[A3, 1000], [A4, 900, "io"]]);
    return { cam: [cx, cy, z], world: s, tint: "cold" };
  });

  // ===== S4 · nhiệt kế tụt tới vạch, nhãn + khoanh đỏ + "?" =====
  var DROP0 = T_MINUS - 0.05, DROP1 = T_FIFTY + 0.05;
  VT.sfx("drop", DROP1, 0.75);
  VT.sfx("pop", DROP1 + 0.35, 0.4);
  shot(A4, A5, "nhiệt kế tụt", function (t, lt, T) {
    var lv = key(t, [[DROP0, 0.42], [DROP1, MARK, "in2"]]), lab = seg(t, DROP1 - 0.05, DROP1 + 0.15), ring = seg(t, DROP1 + 0.1, DROP1 + 0.55);
    var s = scene(t, { level: lv, label: lab, ring: ring, q: t >= DROP1 + 0.35 ? key(t, [[DROP1 + 0.35, -30], [DROP1 + 0.6, 0, "back"]]) : null });
    if (t >= DROP0 && t < DROP1 + 0.1) s += VT.speedLines({ x0: TH.x - 70, y0: TH.y - 330, n: 3, gap: 26, len: 70, dx: 0, dy: -1, sw: 5 });
    // Wob ló đầu dưới góc trái, ngước nhìn
    s += W(t, { x: 1200, y: GROUND, flip: -1, px: 6, py: -16, brows: "up", mouth: t > DROP1 ? "o" : "oSmall", eyes: t > DROP1 && t < DROP1 + 0.4 ? "wide" : "open" });
    var z = key(T, [[A4, 2.25], [A5, 2.4, "sine"]]);
    return { cam: [915, 650, z], shake: VT.shake(t, DROP1, 0.2, 6), world: s, tint: "cold" };
  });

  // ===== S5 · "?" lắc lư, Wob nhún vai, ngó hai bên =====
  var SHRUG = T_ASK + 0.2;
  VT.sfx("liu-lo-hoi", SHRUG, 0.5);
  shot(A5, A6, "nhún vai", function (t, lt, T) {
    var q = Math.sin(t * 7) * 16;
    var s = scene(t, { level: MARK, label: 1, ring: 1, q: q });
    var o = { x: 1180, y: GROUND, flip: -1, px: 10, py: -10, brows: "skeptic", mouth: "flat" };
    if (t >= T_WHO - 0.05 && t < SHRUG) { o.px = Math.round(t * 3) % 2 ? 14 : -14; o.py = 0; o.brows = "worried"; }
    if (t >= SHRUG) { o.arms = "shrug"; o.bob = -10 * VT.ease.out(seg(t, SHRUG, SHRUG + 0.15)); o.brows = "up"; o.mouth = "wobbly"; o.px = 0; o.py = 2; }
    s += W(t, o);
    var z = key(T, [[A5, 1.95], [A6, 2.02, "sine"]]);
    return { cam: [990, 650, z], world: s, tint: "cold" };
  });

  // ---------- bong bóng tưởng tượng ----------
  var BC = [1210, 400], BR = [560, 300];
  function bubblePath(k) {
    var pts = [], n = 26;
    for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2, r = i % 2 ? 1 : 0.93; pts.push([BC[0] + Math.cos(a) * BR[0] * r * k, BC[1] + Math.sin(a) * BR[1] * r * k]); }
    return VT.smooth(pts, true);
  }
  function snowflake(x, y, s, rot) {
    var d = "";
    for (var i = 0; i < 3; i++) { var a = (rot + i * 60) * Math.PI / 180; d += "M " + f(x - Math.cos(a) * 14 * s) + " " + f(y - Math.sin(a) * 14 * s) + " L " + f(x + Math.cos(a) * 14 * s) + " " + f(y + Math.sin(a) * 14 * s) + " "; }
    return VT.line(d, 4 * s, "#ffffff") ;
  }
  function elsewhere(t) { // trường nơi khác: gạch đỏ, bãi cỏ, vài bông tuyết lất phất, cổng đóng
    var s = '<rect x="600" y="80" width="1240" height="660" fill="#BFD6E4"/>';
    s += VT.shape("M 600 600 L 1840 590 L 1840 760 L 600 760 Z", "#9CC27A", { sw: 0, ox: 0, oy: 0 });
    s += VT.shape("M 900 600 L 900 320 L 1500 320 L 1500 600 Z", "#B5564A", { sw: 6 });
    for (var y = 350; y < 600; y += 34) s += VT.line("M 906 " + y + " L 1494 " + y, 2.5, "#7E3A31", 0.6);
    [[960, 380], [1080, 380], [1320, 380], [1440, 380]].forEach(function (w) { s += VT.shape("M " + (w[0] - 30) + " " + w[1] + " L " + (w[0] + 30) + " " + w[1] + " L " + (w[0] + 30) + " " + (w[1] + 70) + " L " + (w[0] - 30) + " " + (w[1] + 70) + " Z", "#DCEFF6", { sw: 4 }); });
    s += VT.shape("M 880 330 L 1520 330 L 1500 300 L 900 300 Z", "#5d6a72", { sw: 5 });
    // cổng song sắt trượt đóng ở "close"
    var c = seg(t, T_CLOSE - 0.1, T_CLOSE + 0.25), gw = VT.lerp(40, 260, VT.ease.out(c));
    s += VT.line("M 1040 600 L 1040 470 M 1360 600 L 1360 470", 12);
    for (var i = 0; i < 6; i++) { var xx = 1060 + i * (gw / 5); s += VT.line("M " + f(xx) + " 600 L " + f(xx) + " 490", 6); }
    s += VT.line("M 1060 500 L " + f(1060 + gw) + " 500 M 1060 580 L " + f(1060 + gw) + " 580", 6);
    for (var j = 0; j < 5; j++) { var fx = 700 + VT.hash(j * 3.3) * 1060, fy = 100 + ((t * 40 + VT.hash(j * 7.1) * 500) % 520); s += snowflake(fx, fy, 1.1, t * 40 + j * 20); }
    return s;
  }
  function sunnyYard(t, k0) { // sân trường nắng ấm, Wob nhỏ đắp người tuyết
    var s = '<rect x="600" y="80" width="1240" height="660" fill="#A9D8EE"/>';
    s += VT.ell(1600, 200, 60, 60, "#F7C948", 6) + VT.shape("M 600 560 L 1840 550 L 1840 760 L 600 760 Z", "#F7FBFD", { sw: 5, ox: 0, oy: 0 });
    s += VT.shape("M 680 560 L 680 360 L 960 360 L 960 560 Z", "#D8C08A", { sw: 6 }) + VT.shape("M 660 370 L 820 300 L 980 370 Z", "#6C5A4E", { sw: 6 });
    var k = seg(t, k0, k0 + 1.2), head = VT.ease.back(seg(t, k0 + 0.8, k0 + 1.1));
    s += VT.ell(1240, 640, 90, 80, "#ffffff", 6) + VT.ell(1240, 530, 66, 58, "#ffffff", 6);
    if (head > 0) s += VT.g(VT.tr(1240, VT.lerp(380, 440, head), 1), VT.ell(0, 0, 46, 42, "#ffffff", 6) + VT.dot(-14, -6, 6) + VT.dot(14, -6, 6) + VT.shape("M -4 6 L 30 12 L -4 16 Z", C.accent, { sw: 3 }));
    var mini = { t: t, x: 1420, y: 700, s: 0.42, flip: -1, beanie: "khoa", scarf: true, cold: true, eyes: "happy", mouth: "smile", armR: head > 0 ? [400, 60] : [404, 200], handR: "xoe", bob: -6 * Math.abs(Math.sin(t * 8)) };
    s += VT.wob(mini);
    return s;
  }
  function bubbleLayer(t, content, k, freeze, crack) {
    var id = VT.uid("bb"), d = bubblePath(k), out = "";
    [[600, 650, 22], [660, 610, 32]].forEach(function (c, i) { if (k > 0.3 + i * 0.2) out += VT.ell(c[0], c[1], c[2], c[2] * 0.85, "#FBF6E9", 5); });
    out += '<clipPath id="' + id + '"><path d="' + d + '"/></clipPath><path d="' + d + '" fill="#FBF6E9" transform="translate(8 8)"/>';
    out += '<g clip-path="url(#' + id + ')">' + content;
    if (freeze > 0) {
      out += '<rect x="560" y="60" width="1320" height="720" fill="#CFEFFF" opacity="' + f(0.55 * freeze * 100) / 100 + '"/>';
      out += '<path d="M 640 260 L 720 200 L 700 300 L 800 230 L 760 160 L 660 160 Z M 1760 560 L 1700 640 L 1660 560 L 1600 640 L 1700 700 L 1800 660 Z" fill="#ffffff" opacity="' + f(0.9 * freeze) + '"/>';
    }
    if (crack > 0) {
      var cr = ["M 1210 400 L 1150 330 L 1170 260 L 1090 190", "M 1210 400 L 1300 360 L 1380 380 L 1470 300", "M 1210 400 L 1240 480 L 1200 560 L 1260 650", "M 1210 400 L 1120 450 L 1010 430 L 920 500"];
      cr.forEach(function (p, i) { out += '<path d="' + p + '" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="600" stroke-dashoffset="' + f(600 * (1 - VT.clamp(crack * 1.3 - i * 0.1, 0, 1))) + '"/>'; });
    }
    out += "</g>" + '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="7"/>';
    return out;
  }
  // mảnh vỡ của bong bóng: hình quạt quanh tâm, rơi theo trọng lực tới chân Wob
  var SHARDS = (function () {
    var list = [], n = 9;
    for (var i = 0; i < n; i++) {
      var a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2, am = (a0 + a1) / 2;
      var pts = [[0, 0], [Math.cos(a0) * BR[0] * 0.95, Math.sin(a0) * BR[1] * 0.95], [Math.cos(am) * BR[0] * 1.02, Math.sin(am) * BR[1] * 1.02], [Math.cos(a1) * BR[0] * 0.95, Math.sin(a1) * BR[1] * 0.95]];
      var cx = (pts[1][0] + pts[2][0] + pts[3][0]) / 4, cy = (pts[1][1] + pts[2][1] + pts[3][1]) / 4;
      list.push({ pts: pts.map(function (p) { return [p[0] - cx, p[1] - cy]; }), c: [BC[0] + cx, BC[1] + cy], land: [360 + VT.hash(i * 2.1) * 560, GROUND + 10 + VT.hash(i * 4.3) * 60], spin: (VT.hash(i * 7.7) - 0.5) * 300, delay: VT.hash(i * 1.9) * 0.18 });
    }
    return list;
  })();
  function shards(t, t0) {
    var out = "";
    SHARDS.forEach(function (sh) {
      var k = VT.ease.in2(seg(t, t0 + sh.delay, t0 + sh.delay + 0.55)), x = VT.lerp(sh.c[0], sh.land[0], k), y = VT.lerp(sh.c[1], sh.land[1], k) - 120 * Math.sin(k * Math.PI) * 0.4;
      var sc = VT.lerp(1, 0.22, k), d = "M " + sh.pts.map(function (p) { return f(p[0]) + " " + f(p[1]); }).join(" L ") + " Z";
      out += VT.g(VT.tr(x, y, sc, sh.spin * k), VT.shape(d, "#DDF1FA", { sw: 6 / Math.max(0.3, sc), ox: 3, oy: 3 }));
    });
    return out;
  }
  // Wob đứng bên trái, ngước nhìn bong bóng
  function wobLeft(t, o) { var b = { x: 380, y: GROUND + 40, s: 0.9, flip: 1 }; for (var k in o) b[k] = o[k]; return W(t, b); }

  // ===== S6 · bong bóng: trường nơi khác đóng cổng vì vài bông tuyết =====
  VT.sfx("pop", A6 + 0.05, 0.5);
  shot(A6, A7, "trường nơi khác", function (t, lt, T) {
    var k = key(t, [[A6, 0.1], [A6 + 0.25, 1, "back"]]);
    var s = scene(t, { level: MARK }) + '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#2B3550" opacity="0.25"/>';
    var o = { px: 12, py: -12, brows: "flat", mouth: "flat" };
    if (t >= T_CLOSE) { o.brows = "skeptic"; o.mouth = "smirk"; o.lid = 0.25; }
    s += wobLeft(t, o) + bubbleLayer(t, elsewhere(t), k, 0, 0);
    return { cam: [960, 540, key(T, [[A6, 1.0], [A7, 1.04, "sine"]])], world: s, tint: "cold" };
  });

  // ===== S7 · bong bóng: Wob đắp người tuyết giữa sân trường nắng =====
  VT.sfx("pop", A7 + 0.02, 0.45);
  shot(A7, A8, "tưởng tượng ngày nghỉ tuyết", function (t, lt, T) {
    var s = scene(t, { level: MARK }) + '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#2B3550" opacity="0.25"/>';
    var o = { px: 12, py: -12, eyes: t >= T_DAYS ? "happy" : "open", mouth: t >= T_DAYS ? "smile" : "content", brows: "up", bob: t >= T_DAYS ? -6 * Math.abs(Math.sin(t * 7)) : 0 };
    s += wobLeft(t, o) + bubbleLayer(t, sunnyYard(t, A7 + 0.2), 1, 0, 0);
    return { cam: [960, 540, key(T, [[A7, 1.04], [A8, 1.08, "sine"]])], world: s, tint: "cold" };
  });

  // ===== S8 · "It does." bong bóng đóng băng, nứt =====
  var FZ = T_DOES - 0.08;
  VT.sfx("tach-bang", FZ + 0.1, 0.8);
  shot(A8, A9, "bong bóng đóng băng", function (t, lt, T) {
    var s = scene(t, { level: MARK }) + '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#2B3550" opacity="0.25"/>';
    var o = { px: 12, py: -12, eyes: t < FZ ? "happy" : "open", mouth: t < FZ ? "smile" : "flat", brows: t < FZ ? "up" : "flat" };
    s += wobLeft(t, o) + bubbleLayer(t, sunnyYard(A8 - 0.01, A7 + 0.2), 1, seg(t, FZ, FZ + 0.3), seg(t, FZ + 0.25, FZ + 0.7));
    return { cam: [960, 540, 1.08], shake: VT.shake(t, FZ + 0.1, 0.25, 5), world: s, tint: "cold" };
  });

  // ===== S9 · vỡ rơi lả tả xuống chân Wob; Wob nhìn người xem, tỉnh bơ, giữ =====
  var BRK = A9 + 0.02;
  VT.sfx("drop", BRK + 0.55, 0.45);
  shot(A9, A10, "vỡ, tỉnh bơ", function (t, lt, T) {
    var s = scene(t, { level: MARK }) + '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#2B3550" opacity="' + f(0.25 * (1 - seg(t, BRK, BRK + 0.8)) * 100) / 100 + '"/>';
    var o = { px: key(t, [[BRK, 12], [BRK + 0.5, 4], [T_SPEC, 0, "io"]]), py: key(t, [[BRK, -12], [BRK + 0.5, 14], [T_SPEC, 3, "io"]]), brows: "flat", mouth: "flat", lid: key(t, [[BRK, 0.1], [T_SPEC, 0.5]]), noBlink: true };
    o.lid = Math.min(1, o.lid + 0.5 * VT.slowBlink(t, T_SPEC + 0.75, 0.36));
    s += wobLeft(t, o) + shards(t, BRK);
    if (t >= BRK + 0.55 && t < BRK + 0.9) s += VT.puffBurst({ x: 620, y: GROUND + 40, k: seg(t, BRK + 0.55, BRK + 0.9), s: 0.4, spread: 90 });
    var face = VT.wobPt({ x: 380, y: GROUND + 40, s: 0.9 }, 200, 170);
    var z = key(T, [[A9, 1.08], [T_SPEC - 0.3, 1.1], [T_SPEC + 0.1, 2.3, "io3"], [END, 2.45, "sine"]]);
    var cx = key(T, [[A9, 960], [T_SPEC - 0.3, 940], [T_SPEC + 0.1, face[0] + 60, "io3"]]), cy = key(T, [[A9, 540], [T_SPEC - 0.3, 560], [T_SPEC + 0.1, face[1] + 20, "io3"]]);
    return { cam: [cx, cy, z], world: s, tint: "cold" };
  });
  // ===== S10 · (không lời) nhặt hai mảnh, ghép như ghép hình, mảnh đóng băng dính tay; vẩy không rơi; bỏ đi; giữ cổng trống =====
  var SQ = A10 + 0.3, LIFT = A10 + 0.6, FIT = A10 + 0.95, STICK = A10 + 1.3, SHK = STICK + 0.1, WALK0 = STICK + 0.6, EXIT = END - 0.5;
  var PICK = [1, 5];
  VT.sfx("tach-bang", STICK, 0.8); VT.sfx("brr", SHK, 0.4); VT.sfx("liu-lo-soc", STICK + 0.08, 0.45);
  function shardAt(sh, x, y, sc, rot) { var d = "M " + sh.pts.map(function (p) { return f(p[0]) + " " + f(p[1]); }).join(" L ") + " Z"; return VT.g(VT.tr(x, y, sc, rot), VT.shape(d, "#DDF1FA", { sw: 6 / Math.max(0.3, sc), ox: 3, oy: 3 })); }
  shot(A10, END, "dính mảnh băng, bỏ đi", function (t, lt, T) {
    var s = scene(t, { level: MARK, label: 1, ring: 1 });
    SHARDS.forEach(function (sh, i) { if (PICK.indexOf(i) < 0) s += shardAt(sh, sh.land[0], sh.land[1], 0.22, sh.spin); });
    var wk = VT.buoc(t, { t0: WALK0, t1: EXIT, x0: 420, x1: -170, chuKy: 0.3, s: 0.9 });
    var down = key(t, [[A10, 0], [SQ, 1, "out"], [LIFT, 1], [FIT, 0.35, "io"]]);
    var o = { x: wk.x, y: GROUND + 40 + 30 * down, s: 0.9, flip: t >= WALK0 ? -1 : 1, legs: down > 0.5 ? "tuck" : "stand" };
    var held = t >= SQ + 0.25;
    var hL, hR;
    if (t < SQ + 0.25) { hL = key(t, [[A10, [62, 300]], [SQ + 0.25, [120, 390], "io"]]); hR = key(t, [[A10, [338, 300]], [SQ + 0.25, [290, 395], "io"]]); }
    else if (t < FIT) { hL = key(t, [[SQ + 0.25, [120, 390]], [FIT, [130, 240], "io"]]); hR = key(t, [[SQ + 0.25, [290, 395]], [FIT, [270, 240], "io"]]); }
    else if (t < STICK) { var g = VT.ease.io(seg(t, FIT, STICK - 0.1)), wig = Math.sin(Math.round(t * 12) * 2.1) * 8 * (1 - g); hL = [VT.lerp(130, 168, g), 240 + wig]; hR = [VT.lerp(270, 232, g), 240 - wig]; }
    else if (t < WALK0) { var sh = t >= SHK ? Math.sin((t - SHK) * 50) * 46 : 0; hL = [110, 230 + sh]; hR = [290, 230 - sh]; }
    else { hL = [140, 120]; hR = [260, 120]; }
    o.armL = hL; o.armR = hR; o.handL = "nam"; o.handR = "nam";
    if (t < FIT) { o.px = 0; o.py = 14; o.brows = "flat"; o.mouth = "flat"; o.lid = 0.3; }
    else if (t < STICK) { o.px = 0; o.py = 10; o.brows = "worried"; o.mouth = "G"; }
    else if (t < WALK0) { o.eyes = t < STICK + 0.25 ? "wide" : "squint"; o.brows = "up"; o.mouth = t < STICK + 0.25 ? "o" : "chatter"; o.noBlink = true; o.shiver = t >= SHK ? 4 : 0; }
    else { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; o.px = -8; o.py = 0; o.brows = "flat"; o.mouth = "flat"; o.lid = 0.45; o.smear = wk.walking ? -40 : 0; }
    s += W(t, o);
    // hai mảnh: dưới đất → trong tay → dính tay
    PICK.forEach(function (i, j) {
      var sh = SHARDS[i], hp = VT.wobPt(o, j ? hR[0] : hL[0], j ? hR[1] : hL[1]);
      if (!held) s += shardAt(sh, sh.land[0], sh.land[1], 0.22, sh.spin);
      else s += shardAt(sh, hp[0] + (j ? 18 : -18) * (o.flip || 1), hp[1] - 24, 0.26, (j ? 20 : -20) + (t >= SHK && t < WALK0 ? Math.sin((t - SHK) * 50) * 10 : 0));
      if (t >= STICK && t < STICK + 0.35) s += VT.sparkle({ x: hp[0], y: hp[1] - 40, s: 0.5 }) + VT.puffBurst({ x: hp[0], y: hp[1], k: seg(t, STICK, STICK + 0.35), s: 0.3, spread: 50 });
    });
    if (t >= SHK && t < WALK0) s += VT.line("M " + f(VT.wobPt(o, 60, 200)[0]) + " " + f(VT.wobPt(o, 60, 200)[1] - 40) + " l -24 0 m 0 40 l -24 0 M " + f(VT.wobPt(o, 340, 200)[0]) + " " + f(VT.wobPt(o, 340, 200)[1] - 40) + " l 24 0 m 0 40 l 24 0", 5);
    var z = key(T, [[A10, 1.75], [EXIT, 1.8], [END, 1.82, "sine"]]);
    return { cam: [760, 690, z], shake: VT.shake(t, STICK, 0.15, 4), world: s, tint: "cold" };
  });
  return shots;
};
