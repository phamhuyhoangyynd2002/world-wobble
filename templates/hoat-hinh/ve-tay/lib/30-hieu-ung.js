/* ve-tay · hiệu ứng hoạt hình vẽ cùng nét mực: lấp lánh, va chạm, vệt tốc độ, tia toả, khói phụt, giọt, bong bóng ký hiệu,
 * vạch rung khi gõ, cung chuyển động, sao choáng. Ký hiệu ?! vẽ bằng nét (không dùng chữ, nên không cần chu_tren_do_vat).
 */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f, INK = C.ink, wrap = VT.wrap;

  /** Lấp lánh 4 cánh: gốc tâm. */
  VT.sparkle = function (o) { return wrap(o, VT.shape("M 0 -40 L 10 -10 L 40 0 L 10 10 L 0 40 L -10 10 L -40 0 L -10 -10 Z", o.fill || "#ffffff", { sw: 4, ox: 2, oy: 2 })); };
  /** Hình nổ va chạm (dẹt): gốc tâm. */
  VT.impact = function (o) {
    var pts = [], n = 12;
    for (var i = 0; i < n * 2; i++) { var a = i * Math.PI / n, r = i % 2 ? 40 : 90 + VT.hash(i + (o.seed || 0)) * 30; pts.push((i ? "L " : "M ") + f(Math.cos(a) * r * 1.4) + " " + f(Math.sin(a) * r * 0.7)); }
    return wrap(o, VT.shape(pts.join(" ") + " Z", o.fill || "#FFF4C8", { sw: 6 }));
  };
  /** Vệt tốc độ: n vạch từ (x0, y0), cách gap, dài len, hướng (dx, dy). */
  VT.speedLines = function (o) {
    var out = "";
    for (var i = 0; i < (o.n || 8); i++) {
      var y = (o.y0 || 0) + i * (o.gap || 40) + VT.hash(i * 4.4) * 14, L = (o.len || 160) * (0.6 + VT.hash(i) * 0.6), x = (o.x0 || 0) + VT.hash(i * 2.2) * 60;
      if (o.dy && !o.dx) { x = (o.x0 || 0) + i * (o.gap || 40) + VT.hash(i * 4.4) * 14; y = (o.y0 || 0) + VT.hash(i * 2.2) * 60; }
      out += VT.line("M " + f(x) + " " + f(y) + " L " + f(x + (o.dx || 0) * L) + " " + f(y + (o.dy || 0) * L), o.sw || 6, o.color || INK, 0.85);
    }
    return out;
  };
  /** Tia toả quanh (cx, cy) từ bán kính r0 tới r1 (lớp khung: tập trung mắt, lao vào hình). */
  VT.radialLines = function (cx, cy, r0, r1, n, seed, sw, color) {
    var out = "";
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + VT.hash(i + (seed || 0)) * 0.2, rr = r0 + VT.hash(i * 3 + (seed || 0)) * 80;
      out += VT.line("M " + f(cx + Math.cos(a) * rr) + " " + f(cy + Math.sin(a) * rr) + " L " + f(cx + Math.cos(a) * r1) + " " + f(cy + Math.sin(a) * r1), sw || 7, color || INK, 0.8);
    }
    return out;
  };
  /** Khói phụt (bước chân trên tuyết, va chạm): gốc tâm đáy. */
  VT.puff = function (o) { return wrap(o, VT.shape(VT.smooth([[-40, 0], [-30, -28], [0, -40], [32, -30], [44, 0], [20, 22], [-16, 22]], true), o.fill || "#ffffff", { sw: 4, op: o.op == null ? 0.95 : o.op })); };
  /** Một chùm khói nở theo k 0..1 (2–3 cục toả ra rồi tan). */
  VT.puffBurst = function (o) {
    var k = VT.clamp(o.k, 0, 1), out = "";
    if (k >= 1) return "";
    [[-1, -0.3], [1, -0.3], [0, -1]].forEach(function (d, i) {
      out += VT.puff({ x: d[0] * k * (o.spread || 60), y: d[1] * k * (o.spread || 60) * 0.6, s: (o.s || 0.5) * (0.6 + k * 0.8) * (1 - 0.25 * i), op: 0.95 * (1 - k * 0.6) });
    });
    return wrap({ x: o.x, y: o.y }, out);
  };
  /** Giọt nước/mồ hôi: gốc tâm. */
  VT.drop = function (o) { return wrap(o, VT.shape("M 0 -26 C -10 -8 -16 4 -14 12 C -10 24 10 24 14 12 C 16 4 10 -8 0 -26 Z", o.fill || "#8fd0ea", { sw: 4 })); };
  /** Vạch rung khi gõ vào vật cứng (3 vòng cung hai bên): gốc điểm gõ, k 0..1 tắt dần. */
  VT.knockLines = function (o) {
    var k = 1 - VT.clamp(o.k || 0, 0, 1), out = "";
    if (k <= 0) return "";
    [1, 2, 3].forEach(function (i) {
      var r = 18 + i * 16;
      out += VT.line("M " + f(-r) + " " + f(-r * 0.7) + " Q " + f(-r - 12) + " 0 " + f(-r) + " " + f(r * 0.7), 5, INK, k);
      out += VT.line("M " + f(r) + " " + f(-r * 0.7) + " Q " + f(r + 12) + " 0 " + f(r) + " " + f(r * 0.7), 5, INK, k);
    });
    return wrap(o, out);
  };
  /** Cung chuyển động (vệt theo đường đi): pts là danh sách điểm, vẽ nét đứt mảnh. */
  VT.arc = function (pts, sw, op) { return '<path d="' + VT.smooth(pts, false) + '" fill="none" stroke="' + INK + '" stroke-width="' + (sw || 5) + '" stroke-linecap="round" stroke-dasharray="2 16" opacity="' + (op == null ? 0.7 : op) + '"/>'; };
  /** Sao choáng xoay quanh đầu: gốc tâm vòng, t để xoay. */
  VT.dizzy = function (o) {
    var out = "", t = Math.round((o.t || 0) * 12) / 12;
    for (var i = 0; i < 3; i++) {
      var a = t * 5 + i * 2.09, x = Math.cos(a) * 90, y = Math.sin(a) * 22;
      out += VT.g("translate(" + f(x) + " " + f(y) + ") scale(0.5)", VT.shape("M 0 -30 L 9 -9 L 30 -6 L 14 9 L 18 30 L 0 19 L -18 30 L -14 9 L -30 -6 L -9 -9 Z", "#F6D36A", { sw: 6, ox: 2, oy: 2 }));
    }
    return wrap(o, out);
  };

  // ---------- ký hiệu vẽ bằng nét ----------
  function glyphQ(x, s) { return VT.line("M " + f(x - 22 * s) + " " + f(-34 * s) + " C " + f(x - 20 * s) + " " + f(-62 * s) + " " + f(x + 26 * s) + " " + f(-62 * s) + " " + f(x + 24 * s) + " " + f(-34 * s) + " C " + f(x + 22 * s) + " " + f(-14 * s) + " " + f(x) + " " + f(-12 * s) + " " + f(x) + " " + f(10 * s), 14 * s) + VT.dot(x, 40 * s, 10 * s); }
  function glyphE(x, s) { return VT.shape("M " + f(x - 12 * s) + " " + f(-58 * s) + " L " + f(x + 12 * s) + " " + f(-58 * s) + " L " + f(x + 5 * s) + " " + f(16 * s) + " L " + f(x - 5 * s) + " " + f(16 * s) + " Z", INK, { sw: 6 * s, ox: 0, oy: 0 }) + VT.dot(x, 40 * s, 10 * s); }
  /** Ký hiệu ?, !, ?! bằng nét mực: gốc tâm. */
  VT.glyph = function (o) {
    var s = o.s || 1, sym = o.sym || "?!", out = "";
    if (sym === "?") out = glyphQ(0, 1); else if (sym === "!") out = glyphE(0, 1); else out = glyphQ(-26, 1) + glyphE(30, 1);
    return VT.g(VT.tr(o.x || 0, o.y || 0, s, o.rot || 0), out);
  };
  /** Bong bóng ký hiệu của Wob: sym "?!"|"?"|"!"|"..."|"bag"|"fish"|SVG tuỳ ý (gốc tâm bóng). tail: -1 đuôi chĩa trái dưới, 1 phải dưới. */
  VT.bubble = function (o) {
    var tail = o.tail || -1, out = [];
    out.push(VT.shape("M " + (-40 * tail) + " 60 L " + (-110 * tail) + " 130 L " + (10 * tail) + " 70 Z", "#ffffff", { sw: 6, ox: 3, oy: 3 }));
    out.push(VT.shape(VT.smooth([[-130, 0], [-100, -70], [0, -96], [100, -70], [130, 0], [100, 68], [0, 92], [-100, 68]], true), "#ffffff", { sw: 6, ox: 6, oy: 5 }));
    out.push('<path d="M ' + (-40 * tail) + ' 62 L ' + (10 * tail) + ' 72" stroke="#ffffff" stroke-width="12"/>');
    var sym = o.sym;
    if (sym === "bag") out.push(VT.bag({ x: 0, y: 66, s: 0.72, handle: true }));
    else if (sym === "fish") out.push(VT.fish({ x: 0, y: 0, s: 0.55 }));
    else if (sym === "...") out.push(VT.dot(-50, 6, 13) + VT.dot(0, 6, 13) + VT.dot(50, 6, 13));
    else if (sym === "?" || sym === "!" || sym === "?!") out.push(VT.glyph({ x: 0, y: 6, s: 1, sym: sym }));
    else if (sym) out.push(sym);
    return wrap(o, out.join(""));
  };
})();

/* ve-tay · hiệu ứng thêm 18/11/2026: viền bong bóng tưởng tượng, chớp đèn flash, nét gạch xoáy. Chỉ thêm. */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f, INK = C.ink;

  /** Viền mây toàn khung báo "đây là tưởng tượng" (đặt ở lớp over, toạ độ khung 1920×1080).
   *  t: thời gian (mép mây phập phồng theo bậc hình), inset: độ dày viền (70), fill: màu viền, dots: chuỗi chấm bong bóng ở góc trái dưới. */
  VT.dreamFrame = function (t, o) {
    o = o || {};
    var ins = o.inset == null ? 70 : o.inset, step = Math.round((t || 0) * 12), W = 1920, H = 1080, pts = [];
    var side = function (x0, y0, x1, y1, n) { for (var i = 0; i < n; i++) pts.push([VT.lerp(x0, x1, i / n), VT.lerp(y0, y1, i / n)]); };
    side(ins, ins, W - ins, ins, 13); side(W - ins, ins, W - ins, H - ins, 7); side(W - ins, H - ins, ins, H - ins, 13); side(ins, H - ins, ins, ins, 7);
    var d = "M " + f(pts[0][0]) + " " + f(pts[0][1]);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i], q = pts[(i + 1) % pts.length], L = Math.sqrt((q[0] - p[0]) * (q[0] - p[0]) + (q[1] - p[1]) * (q[1] - p[1]));
      var r = L * (0.56 + 0.06 * Math.sin(i * 2.3 + step * 0.4));
      d += " A " + f(r) + " " + f(r) + " 0 0 1 " + f(q[0]) + " " + f(q[1]);
    }
    d += " Z";
    var out = '<path d="M -40 -40 L 1960 -40 L 1960 1120 L -40 1120 Z ' + d + '" fill="' + (o.fill || "#F6EEDC") + '" fill-rule="evenodd"/>' + VT.line(d, 6);
    if (o.dots !== false) [[150, 1000, 16], [100, 1040, 10]].forEach(function (d) { out += VT.ell(d[0], d[1] - 20, d[2], d[2], "#ffffff", 5); });
    return out;
  };

  /** Chớp đèn flash: gốc tâm, k 0..1 (nở rồi tắt). */
  VT.flash = function (o) {
    var k = VT.clamp(o.k, 0, 1);
    if (k >= 1) return "";
    var r = 60 + 240 * VT.ease.out(k), op = 1 - k;
    return VT.g(VT.tr(o.x || 0, o.y || 0, o.s == null ? 1 : o.s, 0),
      '<circle cx="0" cy="0" r="' + f(r) + '" fill="#FFF8DC" opacity="' + f(op * 0.8) + '"/>' +
      VT.radialLines(0, 0, r * 0.55, r * 1.25, 12, 7, 7, "#F6D36A") + VT.sparkle({ x: 0, y: 0, s: 1.2 * (1 - k * 0.5), fill: "#ffffff" }));
  };

  /** Nét gạch qua gạch lại (bút gạch xoá điên cuồng) nối các điểm pts, vẽ dần theo k 0..1 (đường gấp khúc, rung theo hash cố định). Trả SVG. */
  VT.scribble = function (pts, k, sw, color) {
    var path = [], n = pts.length;
    for (var i = 0; i < n * 9; i++) { var p = pts[(i * 2) % n], j = VT.hash(i * 3.3) - 0.5, q = VT.hash(i * 7.7) - 0.5; path.push([p[0] + j * 190, p[1] + q * 90]); }
    var d = "M " + path.map(function (p) { return f(p[0]) + " " + f(p[1]); }).join(" L ");
    return VT.lineDraw(d, k, sw || 7, color || INK);
  };
})();
