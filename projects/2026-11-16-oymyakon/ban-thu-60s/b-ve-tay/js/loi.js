/* Lõi bản thử B "animatic vẽ tay" – tái dùng được cho cả tập.
 * - Vẽ kiểu "immediate mode": mỗi hình (12 hình/giây) dựng lại chuỗi SVG của cảnh từ thời gian t, nên seek tới đâu ra đúng hình đó.
 * - Không Math.random, không Date: mọi "ngẫu nhiên" lấy từ hash(số) cố định.
 * - Nét sôi: feTurbulence + feDisplacementMap ở index.html, seed đổi theo số hình vẽ (mỗi 2 khung 30 fps).
 */
(function () {
  var B = (window.WWB = window.WWB || {});

  B.C = {
    ink: "#1f2326", paper: "#EFE3C8", ground: "#1E2A2B", sea: "#3F6A70", accent: "#E0703A", accent2: "#E85D45",
    snow: "#FBFDFE", snowShade: "#D6E6EE", ice: "#BFE3F2", iceDeep: "#8CC3DB", sky: "#D3E5EE",
    wood: "#C68A55", woodDark: "#8E5527", woodLight: "#DDA672", lampLight: "#FFE6A0", window: "#F6C46A",
    fishFrozen: "#A8BDC8", fishBelly: "#E1EAEE", fishThaw: "#93AB9F", tea: "#9A5A2C", red: "#D9543C", white: "#FFFDF6",
  };
  var INK = B.C.ink;
  B.DRAW_FPS = 12;

  // ---------- số học ----------
  B.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  B.lerp = function (a, b, k) { return a + (b - a) * k; };
  B.seg = function (t, a, b) { return B.clamp((t - a) / (b - a), 0, 1); };
  B.hash = function (n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453123; return x - Math.floor(x); };
  B.ease = {
    lin: function (k) { return k; },
    io: function (k) { return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; },
    out: function (k) { return 1 - Math.pow(1 - k, 3); },
    in: function (k) { return k * k * k; },
    back: function (k) { var c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
    bounce: function (k) { var n1 = 7.5625, d1 = 2.75;
      if (k < 1 / d1) return n1 * k * k; if (k < 2 / d1) return n1 * (k -= 1.5 / d1) * k + 0.75;
      if (k < 2.5 / d1) return n1 * (k -= 2.25 / d1) * k + 0.9375; return n1 * (k -= 2.625 / d1) * k + 0.984375; },
  };
  /** Nội suy khoá: frames = [[t, v, ease?], ...]; v là số hoặc mảng số. ease áp cho đoạn đi TỚI khoá đó. */
  B.key = function (t, frames) {
    if (t <= frames[0][0]) return frames[0][1];
    for (var i = 1; i < frames.length; i++) {
      if (t < frames[i][0]) {
        var a = frames[i - 1], b = frames[i];
        var k = (B.ease[b[2] || "io"])((t - a[0]) / (b[0] - a[0]));
        if (Array.isArray(a[1])) return a[1].map(function (v, j) { return B.lerp(v, b[1][j], k); });
        return B.lerp(a[1], b[1], k);
      }
    }
    return frames[frames.length - 1][1];
  };
  /** Giá trị bậc thang: list = [[t, v], ...] → v của mốc cuối cùng ≤ t. */
  B.pick = function (t, list) {
    var v = list[0][1];
    for (var i = 0; i < list.length; i++) if (t >= list[i][0]) v = list[i][1];
    return v;
  };
  /** Rung máy (on twos): biên độ amp px trong [t0, t0+dur], tắt dần. */
  B.shake = function (t, t0, dur, amp) {
    if (t < t0 || t > t0 + dur) return [0, 0];
    var k = 1 - (t - t0) / dur, n = Math.round(t * 12);
    return [(B.hash(n * 3.1) - 0.5) * 2 * amp * k, (B.hash(n * 7.7 + 1) - 0.5) * 2 * amp * k];
  };
  /** Chớp mắt tự động: trả về độ sụp mí 0..1 (1 hình nhắm giữa 2 hình nửa). */
  B.blink = function (t, period, offset) {
    var p = (t + (offset || 0)) % (period || 3.6);
    if (p < 1 / 12) return 0.6; if (p < 2 / 12) return 1; if (p < 3 / 12) return 0.5; return 0;
  };

  // ---------- SVG ----------
  var uidN = 0;
  B.resetUid = function () { uidN = 0; };
  B.uid = function (p) { uidN += 1; return (p || "u") + uidN; };
  B.f = function (n) { return Math.round(n * 10) / 10; };
  /** Đường cong mượt qua các điểm (Catmull-Rom → Bezier). */
  B.smooth = function (pts, closed) {
    var n = pts.length, f = B.f;
    var d = "M " + f(pts[0][0]) + " " + f(pts[0][1]) + " ";
    var last = closed ? n : n - 1;
    for (var i = 0; i < last; i++) {
      var p0 = pts[closed ? (i - 1 + n) % n : Math.max(0, i - 1)], p1 = pts[i], p2 = pts[(i + 1) % n],
        p3 = pts[closed ? (i + 2) % n : Math.min(n - 1, i + 2)];
      d += "C " + f(p1[0] + (p2[0] - p0[0]) / 6) + " " + f(p1[1] + (p2[1] - p0[1]) / 6) + " " +
        f(p2[0] - (p3[0] - p1[0]) / 6) + " " + f(p2[1] - (p3[1] - p1[1]) / 6) + " " + f(p2[0]) + " " + f(p2[1]) + " ";
    }
    return d + (closed ? "Z" : "");
  };
  /** Mảng màu "tô lem": lớp màu lệch khỏi nét (như tô bằng bút dạ vội), rồi nét mực đè lên. */
  B.shape = function (d, fill, o) {
    o = o || {};
    var sw = o.sw == null ? 6 : o.sw, out = "";
    var ox = o.ox == null ? 5 : o.ox, oy = o.oy == null ? 4 : o.oy;
    if (fill && fill !== "none")
      out += '<path d="' + d + '" fill="' + fill + '"' + (o.op != null ? ' opacity="' + o.op + '"' : "") +
        (o.rule ? ' fill-rule="' + o.rule + '"' : "") + ' transform="translate(' + ox + " " + oy + ')"/>';
    if (sw > 0)
      out += '<path d="' + d + '" fill="none" stroke="' + (o.stroke || INK) + '" stroke-width="' + sw +
        '" stroke-linecap="round" stroke-linejoin="round"' + (o.sop != null ? ' opacity="' + o.sop + '"' : "") + "/>";
    return out;
  };
  B.line = function (d, sw, color, op) {
    return '<path d="' + d + '" fill="none" stroke="' + (color || INK) + '" stroke-width="' + (sw || 6) +
      '" stroke-linecap="round" stroke-linejoin="round"' + (op != null ? ' opacity="' + op + '"' : "") + "/>";
  };
  B.ell = function (cx, cy, rx, ry, fill, sw, o) {
    o = o || {};
    var f = B.f, out = "";
    if (fill && fill !== "none")
      out += '<ellipse cx="' + f(cx + (o.ox == null ? 3 : o.ox)) + '" cy="' + f(cy + (o.oy == null ? 2 : o.oy)) + '" rx="' + f(rx) + '" ry="' + f(ry) +
        '" fill="' + fill + '"' + (o.op != null ? ' opacity="' + o.op + '"' : "") + "/>";
    if (sw) out += '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="none" stroke="' + (o.stroke || INK) + '" stroke-width="' + sw + '"/>';
    return out;
  };
  B.dot = function (cx, cy, r, fill) { return '<circle cx="' + B.f(cx) + '" cy="' + B.f(cy) + '" r="' + B.f(r) + '" fill="' + (fill || INK) + '"/>'; };
  B.g = function (tr, inner, extra) { return "<g" + (tr ? ' transform="' + tr + '"' : "") + (extra || "") + ">" + inner + "</g>"; };
  B.tr = function (x, y, s, rot, sx) {
    var t = "translate(" + B.f(x) + " " + B.f(y) + ")";
    if (rot) t += " rotate(" + B.f(rot) + ")";
    if (s == null) s = 1;
    if (sx == null) sx = 1;
    if (s !== 1 || sx !== 1) t += " scale(" + Math.round(sx * s * 1000) / 1000 + " " + Math.round(s * 1000) / 1000 + ")";
    return t;
  };
  /** Chữ trên đồ vật (Fraunces). Gọi ở chỗ cỡ hiển thị ≥ 40px. */
  B.text = function (x, y, str, size, o) {
    o = o || {};
    return '<text x="' + B.f(x) + '" y="' + B.f(y) + '" font-family="Fraunces" font-weight="' + (o.w || 800) + '" font-size="' + size +
      '" fill="' + (o.fill || INK) + '" text-anchor="' + (o.anchor || "middle") + '"' +
      (o.rot ? ' transform="rotate(' + o.rot + " " + B.f(x) + " " + B.f(y) + ')"' : "") +
      ' style="font-variation-settings: \'SOFT\' 100, \'WONK\' 1">' + str + "</text>";
  };

  // ---------- giọng, khẩu hình ----------
  B.sceneById = function (id) { return window.WWB_DATA.scenes.filter(function (s) { return s.id === id; })[0]; };
  /** Hình miệng A–H/X của cảnh id ở thời gian tuyệt đối t (X nếu ngoài lời). */
  B.mouthAt = function (id, t) {
    var s = B.sceneById(id), lt = t - s.start;
    if (lt < 0 || lt > s.duration) return "X";
    for (var i = 0; i < s.mouth.length; i++) { var c = s.mouth[i]; if (lt >= c[0] && lt < c[1]) return c[2]; }
    return "X";
  };
  /** Mốc tuyệt đối của từ thứ n (đếm từ 0) trong cảnh id. */
  B.wordAt = function (id, n) { var s = B.sceneById(id); return s.start + s.words[n][1]; };
})();
