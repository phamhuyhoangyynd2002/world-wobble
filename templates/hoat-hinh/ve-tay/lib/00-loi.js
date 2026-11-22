/* ve-tay · lõi. Tách từ bản thử B (ban-thu-60s/b-ve-tay/js/loi.js), 16/11/2026.
 * Vẽ "immediate mode": mỗi khung dựng lại chuỗi SVG từ thời gian t, nên tua tới đâu ra đúng hình đó.
 * Không Math.random, không Date: mọi "ngẫu nhiên" lấy từ VT.hash(số) cố định.
 * Mọi mốc thời gian trong thư viện là giây tính từ ĐẦU ĐOẠN (như window.HH_DATA).
 */
(function () {
  var VT = (window.VT = window.VT || {});

  // Bảng màu "Mực & giấy" (templates/_shared/frame.md) + tuyết, băng.
  VT.C = {
    ink: "#1f2326", paper: "#EFE3C8", ground: "#1E2A2B", sea: "#3F6A70", accent: "#E0703A", accent2: "#E85D45",
    snow: "#FBFDFE", snowShade: "#D6E6EE", ice: "#BFE3F2", iceDeep: "#8CC3DB", sky: "#D3E5EE",
    wood: "#C68A55", woodDark: "#8E5527", woodLight: "#DDA672", lampLight: "#FFE6A0", window: "#F6C46A",
    fishFrozen: "#A8BDC8", fishBelly: "#E1EAEE", fishThaw: "#93AB9F", tea: "#9A5A2C", red: "#D9543C", white: "#FFFDF6",
    frost: "#CFEFFF",
  };
  var INK = VT.C.ink;
  VT.DRAW_FPS = 12; // nhân vật, đạo cụ nhảy bậc 12 hình/giây ("on twos" ở 30 fps chỉ gần đúng: 2–3 khung một hình)

  // ---------- số học ----------
  VT.clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  VT.lerp = function (a, b, k) { return a + (b - a) * k; };
  VT.mix = function (a, b, k) { return Array.isArray(a) ? a.map(function (v, i) { return v + (b[i] - v) * k; }) : a + (b - a) * k; };
  /** Tiến độ 0..1 của t trong [a, b]. */
  VT.seg = function (t, a, b) { return VT.clamp((t - a) / (b - a), 0, 1); };
  VT.hash = function (n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453123; return x - Math.floor(x); };
  /** Bộ sinh số có seed (LCG) cho việc dựng một lần (nền giấy, vị trí tuyết…). */
  VT.rng = function (seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
  VT.twos = function (t) { return Math.floor(t * VT.DRAW_FPS + 1e-6) / VT.DRAW_FPS; };
  VT.ease = {
    lin: function (k) { return k; },
    io: function (k) { return k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; },
    io3: function (k) { return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; },
    out: function (k) { return 1 - Math.pow(1 - k, 3); },
    out2: function (k) { return 1 - (1 - k) * (1 - k); },
    in: function (k) { return k * k * k; },
    in2: function (k) { return k * k; },
    sine: function (k) { return -(Math.cos(Math.PI * k) - 1) / 2; },
    back: function (k) { var c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); },
    elastic: function (k) { return k <= 0 ? 0 : k >= 1 ? 1 : Math.pow(2, -10 * k) * Math.sin((k * 10 - 0.75) * (2 * Math.PI) / 3) + 1; },
    bounce: function (k) { var n1 = 7.5625, d1 = 2.75;
      if (k < 1 / d1) return n1 * k * k; if (k < 2 / d1) return n1 * (k -= 1.5 / d1) * k + 0.75;
      if (k < 2.5 / d1) return n1 * (k -= 2.25 / d1) * k + 0.9375; return n1 * (k -= 2.625 / d1) * k + 0.984375; },
  };
  /** Nội suy khoá: frames = [[t, v, ease?], ...]; v là số hoặc mảng số. ease (tên trong VT.ease) áp cho đoạn đi TỚI khoá đó. */
  VT.key = function (t, frames) {
    if (t <= frames[0][0]) return frames[0][1];
    for (var i = 1; i < frames.length; i++) {
      if (t < frames[i][0]) {
        var a = frames[i - 1], b = frames[i];
        var k = (VT.ease[b[2] || "io"])((t - a[0]) / Math.max(1e-6, b[0] - a[0]));
        return VT.mix(a[1], b[1], k);
      }
    }
    return frames[frames.length - 1][1];
  };
  /** Giá trị bậc thang: list = [[t, v], ...] → v của mốc cuối cùng ≤ t. */
  VT.pick = function (t, list) {
    var v = list[0][1];
    for (var i = 0; i < list.length; i++) if (t >= list[i][0]) v = list[i][1];
    return v;
  };
  /** Rung máy: biên độ amp px trong [t0, t0+dur], tắt dần, đổi hướng theo hình vẽ. Trả [dx, dy]. */
  VT.shake = function (t, t0, dur, amp) {
    if (t < t0 || t > t0 + dur) return [0, 0];
    var k = 1 - (t - t0) / dur, n = Math.round(t * 12);
    return [(VT.hash(n * 3.1) - 0.5) * 2 * amp * k, (VT.hash(n * 7.7 + 1) - 0.5) * 2 * amp * k];
  };
  /** Cộng nhiều cú rung: VT.shakes(t, [[t0, dur, amp], ...]). */
  VT.shakes = function (t, list) {
    var x = 0, y = 0;
    list.forEach(function (s) { var d = VT.shake(t, s[0], s[1], s[2]); x += d[0]; y += d[1]; });
    return [x, y];
  };
  /** Chớp mắt tự động: độ sụp mí 0..1 (1 hình nửa, 1 hình nhắm, 1 hình nửa). */
  VT.blink = function (t, period, offset) {
    var p = (((t + (offset || 0)) % (period || 3.6)) + (period || 3.6)) % (period || 3.6);
    if (p < 1 / 12) return 0.6; if (p < 2 / 12) return 1; if (p < 3 / 12) return 0.5; return 0;
  };
  /** Chớp chậm tỉnh bơ quanh mốc at (giây), dài dur: trả độ sụp thêm 0..1. */
  VT.slowBlink = function (t, at, dur) { return Math.max(0, 1 - Math.abs(t - at) / ((dur || 0.4) / 2)); };
  /** Co giãn giữ thể tích: trả [sx, sy] với sx = 1/√sy. */
  VT.squash = function (sy) { return [1 / Math.sqrt(sy), sy]; };

  /** Con lắc tắt dần bị đẩy bởi gia tốc của một vật (theo đà thật, không keyframe).
   *  pos(s) → [x, y] vị trí vật ở thời điểm s. Tích phân bước cố định 1/240 s từ t0 tới t nên tua đâu cũng ra cùng góc.
   *  o: {k độ cứng 90, c giảm chấn 7, gx 1/900, gy 1/2600, max 0.7 rad, kick: [[t0, t1, lực]]}. Trả góc (độ). */
  VT.conLac = function (t, t0, pos, o) {
    o = o || {};
    var K = o.k || 90, Cc = o.c || 7, gx = o.gx || 1 / 900, gy = o.gy || 1 / 2600, mx = o.max || 0.7, kick = o.kick || [];
    var th = 0, w = 0, dt = 1 / 240, h = 1 / 120;
    for (var s = t0; s < t; s += dt) {
      var a = pos(s + h), b = pos(s), c = pos(s - h);
      var ax = (a[0] - 2 * b[0] + c[0]) / (h * h), ay = (a[1] - 2 * b[1] + c[1]) / (h * h);
      var f = 0;
      for (var i = 0; i < kick.length; i++) if (s >= kick[i][0] && s < kick[i][1]) f += kick[i][2];
      var acc = -K * th - Cc * w - ax * gx - ay * gy + f;
      w += acc * dt; th += w * dt;
      th = VT.clamp(th, -mx, mx);
    }
    return th * 57.2958;
  };

  /** Đi bộ có chu kỳ bước thật. o: {t0, t1, x0, x1, chuKy (giây cho 2 bước, mặc định 0.8), s (tỉ lệ Wob)}.
   *  Số bước làm tròn để kết thúc đúng lúc chạm chân. Chân trụ đứng yên trên đất (không trượt).
   *  Trả {x, phase, stride, walking, flip, steps:[{t, x}]} → truyền vào VT.wob({legs: "walk", phase, stride}). */
  VT.buoc = function (t, o) {
    var D = o.t1 - o.t0, P0 = o.chuKy || 0.8, s = o.s || 1;
    var n = Math.max(1, Math.round(D / (P0 / 2))), P = 2 * D / n;
    var k = VT.clamp((t - o.t0) / D, 0, 1);
    var x = VT.lerp(o.x0, o.x1, k);
    var stride = Math.abs(o.x1 - o.x0) / n / s;
    var phase = (VT.clamp(t, o.t0, o.t1) - o.t0) / P;
    var steps = [];
    for (var i = 1; i <= n; i++) steps.push({ t: o.t0 + i * P / 2, x: VT.lerp(o.x0, o.x1, i / n) });
    return { x: x, phase: phase, stride: stride, walking: t > o.t0 && t < o.t1, flip: o.x1 >= o.x0 ? 1 : -1, steps: steps, chuKy: P };
  };

  // ---------- SVG ----------
  var uidN = 0;
  VT.resetUid = function () { uidN = 0; };
  VT.uid = function (p) { uidN += 1; return (p || "u") + uidN; };
  VT.f = function (n) { return Math.round(n * 10) / 10; };
  /** Đường cong mượt qua các điểm (Catmull-Rom → Bezier). */
  VT.smooth = function (pts, closed) {
    var n = pts.length, f = VT.f;
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
  /** Mảng màu "tô lem": lớp màu lệch khỏi nét (như tô bút dạ vội), nét mực đè lên.
   *  o: {sw 6, ox 5, oy 4, op, sop, stroke, rule}. */
  VT.shape = function (d, fill, o) {
    o = o || {};
    var sw = o.sw == null ? 6 : o.sw, out = "";
    var ox = o.ox == null ? 5 : o.ox, oy = o.oy == null ? 4 : o.oy;
    if (fill && fill !== "none")
      out += '<path d="' + d + '" fill="' + fill + '"' + (o.op != null ? ' opacity="' + o.op + '"' : "") +
        (o.rule ? ' fill-rule="' + o.rule + '"' : "") + ((ox || oy) ? ' transform="translate(' + ox + " " + oy + ')"' : "") + "/>";
    if (sw > 0)
      out += '<path d="' + d + '" fill="none" stroke="' + (o.stroke || INK) + '" stroke-width="' + sw +
        '" stroke-linecap="round" stroke-linejoin="round"' + (o.sop != null ? ' opacity="' + o.sop + '"' : "") + "/>";
    return out;
  };
  VT.line = function (d, sw, color, op) {
    return '<path d="' + d + '" fill="none" stroke="' + (color || INK) + '" stroke-width="' + (sw || 6) +
      '" stroke-linecap="round" stroke-linejoin="round"' + (op != null ? ' opacity="' + op + '"' : "") + "/>";
  };
  VT.ell = function (cx, cy, rx, ry, fill, sw, o) {
    o = o || {};
    var f = VT.f, out = "";
    if (fill && fill !== "none")
      out += '<ellipse cx="' + f(cx + (o.ox == null ? 3 : o.ox)) + '" cy="' + f(cy + (o.oy == null ? 2 : o.oy)) + '" rx="' + f(rx) + '" ry="' + f(ry) +
        '" fill="' + fill + '"' + (o.op != null ? ' opacity="' + o.op + '"' : "") + "/>";
    if (sw) out += '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="none" stroke="' + (o.stroke || INK) + '" stroke-width="' + sw + '"/>';
    return out;
  };
  VT.dot = function (cx, cy, r, fill) { return '<circle cx="' + VT.f(cx) + '" cy="' + VT.f(cy) + '" r="' + VT.f(r) + '" fill="' + (fill || INK) + '"/>'; };
  VT.g = function (tr, inner, extra) { return "<g" + (tr ? ' transform="' + tr + '"' : "") + (extra || "") + ">" + inner + "</g>"; };
  /** Chuỗi transform: dịch (x, y), xoay rot (độ), tỉ lệ s (sx nhân thêm theo trục x, âm để lật). */
  VT.tr = function (x, y, s, rot, sx) {
    var t = "translate(" + VT.f(x) + " " + VT.f(y) + ")";
    if (rot) t += " rotate(" + VT.f(rot) + ")";
    if (s == null) s = 1;
    if (sx == null) sx = 1;
    if (s !== 1 || sx !== 1) t += " scale(" + Math.round(sx * s * 1000) / 1000 + " " + Math.round(s * 1000) / 1000 + ")";
    return t;
  };
  /** Bọc đạo cụ theo o = {x, y, s, rot, sx}. */
  VT.wrap = function (o, inner) { return VT.g(VT.tr(o.x || 0, o.y || 0, o.s == null ? 1 : o.s, o.rot || 0, o.sx), inner); };

  // ---------- chữ trên đồ vật (chỉ chữ có trong HH_DATA.chu_tren_do_vat) ----------
  VT._chuSai = [];
  function chuDuocPhep(str) {
    var ds = (window.HH_DATA && window.HH_DATA.chu_tren_do_vat) || [];
    for (var i = 0; i < ds.length; i++) if (ds[i] === str || ds[i].indexOf(str) >= 0) return true;
    return false;
  }
  /** Chữ Fraunces trên đồ vật. Chữ không có trong chu_tren_do_vat bị BỎ (ghi vào VT._chuSai, console.warn).
   *  Đặt ở chỗ cỡ hiển thị cuối cùng ≥ 40px (nhân cả zoom camera). o: {w 800, fill, anchor, rot}. */
  VT.text = function (x, y, str, size, o) {
    o = o || {};
    if (!chuDuocPhep(str)) {
      if (VT._chuSai.indexOf(str) < 0) { VT._chuSai.push(str); if (window.console) console.warn("[ve-tay] chữ không có trong chu_tren_do_vat, bỏ: " + str); }
      return "";
    }
    return '<text x="' + VT.f(x) + '" y="' + VT.f(y) + '" font-family="Fraunces" font-weight="' + (o.w || 800) + '" font-size="' + size +
      '" fill="' + (o.fill || INK) + '" text-anchor="' + (o.anchor || "middle") + '"' +
      (o.rot ? ' transform="rotate(' + o.rot + " " + VT.f(x) + " " + VT.f(y) + ')"' : "") +
      ' style="font-variation-settings: \'SOFT\' 100, \'WONK\' 1">' + str + "</text>";
  };

  // ---------- dữ liệu đoạn (HH_DATA) ----------
  VT.data = function () { return window.HH_DATA || { thoi_luong: 1, nhip: [], loi: [], chu_tren_do_vat: [] }; };
  function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9']/g, ""); }
  /** Mốc bắt đầu (giây từ đầu đoạn) của từ `word` lần thứ n (đếm từ 0) trong lời NẰM TRONG đoạn
   *  (bỏ qua từ của câu vắt ngoài đoạn, mốc âm hoặc sau thoi_luong). Không thấy thì NÉM LỖI.
   *  VT.tu("freezer") · VT.tu("fish", 2) · VT.tu("bag", 1, "end") → mốc kết thúc. */
  VT.tu = function (word, n, which) {
    var w = norm(word), c = 0, D = VT.data(), loi = D.loi || [];
    for (var i = 0; i < loi.length; i++) {
      var tu = loi[i].tu || [];
      for (var j = 0; j < tu.length; j++) {
        if (tu[j].end <= 0 || tu[j].start >= D.thoi_luong) continue;
        if (norm(tu[j].text) === w) { if (c === (n || 0)) return which === "end" ? tu[j].end : tu[j].start; c++; }
      }
    }
    throw new Error("[ve-tay] VT.tu: không có từ '" + word + "' lần " + (n || 0) + " trong lời của đoạn");
  };
  /** Mốc của nhịp thứ i trong HH_DATA.nhip. */
  VT.nhip = function (i) { var nh = VT.data().nhip[i]; if (!nh) throw new Error("[ve-tay] không có nhịp " + i); return nh.tai; };
  /** Hình miệng A–H/X ở thời điểm t (theo HH_DATA.loi[].khau_hinh). Chỉ khi lop = "hien-tai" (hợp đồng mục 4), trừ khi ep = true. */
  VT.khauHinh = function (t, ep) {
    var D = VT.data();
    if (D.lop !== "hien-tai" && !ep) return "X";
    var loi = D.loi || [];
    for (var i = 0; i < loi.length; i++) {
      var kh = loi[i].khau_hinh || [];
      for (var j = 0; j < kh.length; j++) if (t >= kh[j].start && t < kh[j].end) return kh[j].value;
    }
    return "X";
  };

  // ---------- sfx khai trong canh.js (cong-cu/kiem_doan.mjs gom ra sfx.json) ----------
  VT._sfx = [];
  /** Khai một sfx: tên file trong sfx/ (không .wav), mốc từ đầu đoạn, âm lượng 0..1. Không phát gì trong trình duyệt. */
  VT.sfx = function (ten, tai, am_luong) { VT._sfx.push({ ten: ten, tai: Math.round(tai * 1000) / 1000, am_luong: am_luong == null ? 0.6 : am_luong }); };

  // ---------- vẽ dần (thêm 18/11/2026 cho sơ đồ vẽ tay) ----------
  /** Nét hiện dần theo k 0..1 (bút đang kẻ): pathLength = 1 nên không cần biết độ dài. o: {op, dash: "a b" nét đứt (tỉ lệ theo độ dài 1)}. */
  VT.lineDraw = function (d, k, sw, color, o) {
    o = o || {};
    k = VT.clamp(k, 0, 1);
    if (k <= 0) return "";
    var common = ' fill="none" stroke="' + (color || INK) + '" stroke-width="' + (sw || 6) + '" stroke-linecap="round" stroke-linejoin="round"' + (o.op != null ? ' opacity="' + o.op + '"' : "");
    if (k >= 1 && !o.dash) return '<path d="' + d + '"' + common + "/>";
    if (!o.dash) return '<path d="' + d + '" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="' + (Math.round((1 - k) * 10000) / 10000) + '"' + common + "/>";
    // nét đứt hiện dần: che bằng mặt nạ nét liền vẽ dần
    var id = VT.uid("ld");
    return '<mask id="' + id + '" maskUnits="userSpaceOnUse" x="-4000" y="-4000" width="10000" height="10000"><path d="' + d + '" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="' + (Math.round((1 - k) * 10000) / 10000) +
      '" fill="none" stroke="#fff" stroke-width="' + ((sw || 6) + 12) + '" stroke-linecap="round"/></mask>' +
      '<path d="' + d + '" pathLength="1" stroke-dasharray="' + o.dash + '" mask="url(#' + id + ')"' + common + "/>";
  };
  /** Bề rộng ước của chữ Fraunces đậm (để viết dần, đặt đầu bút). */
  VT.textW = function (str, size) { return String(str).length * size * 0.6; };
  /** Chữ viết dần từ trái sang phải theo k 0..1 (đúng luật VT.text: chữ phải có trong chu_tren_do_vat). Cùng tham số VT.text. */
  VT.textWrite = function (x, y, str, size, k, o) {
    o = o || {};
    k = VT.clamp(k, 0, 1);
    if (k <= 0) return "";
    var full = VT.text(x, y, str, size, o);
    if (!full || k >= 1) return full;
    var w = VT.textW(str, size), an = o.anchor || "middle", x0 = an === "middle" ? x - w / 2 : an === "end" ? x - w : x, id = VT.uid("tw");
    return '<clipPath id="' + id + '"><rect x="' + VT.f(x0 - 12) + '" y="' + VT.f(y - size * 1.2) + '" width="' + VT.f((w + 24) * k) + '" height="' + VT.f(size * 1.7) + '"/></clipPath>' +
      '<g clip-path="url(#' + id + ')">' + full + "</g>";
  };
  /** Vị trí đầu bút khi viết dần chữ (toạ độ cùng hệ với VT.textWrite): [x, y]. */
  VT.textTip = function (x, y, str, size, k, anchor) {
    var w = VT.textW(str, size), an = anchor || "middle", x0 = an === "middle" ? x - w / 2 : an === "end" ? x - w : x;
    k = VT.clamp(k, 0, 1);
    return [x0 + w * k, y - size * 0.3 + Math.sin(k * 40) * size * 0.18];
  };
})();
