/* Wob con rối có khớp + bộ khoá hình tất định – thư viện cắt giấy World Wobble (tách từ bản thử A, 16/11/2026).
   Tạo hình, màu, nét mực chép đúng từ templates/_shared/wob/nguon/tao_wob.py (toạ độ gốc 400×400, chân chạm y≈392).
   Thêm: khớp vai/khuỷu/hông, mí mắt, lông mi, 9 hình miệng A–H/X + miệng biểu cảm, trang phục (khăn, mũ len, chăn,
   tuyết trên đầu). Trang phục chỉ đè lên, không đổi tạo hình. Không dùng AI sinh ảnh. */
(function (G) {
  "use strict";
  var INK = "#1f2326", SEA = "#5a9fb8", LAND = "#efd9a2", EYE = "#fffdf6", CHEEK = "#e9806e",
    PACK = "#b8743a", PACK_DARK = "#8e5527", MAT = "#d9543c", SHOE = "#d9543c", LID = "#4c8ba4", ICE = "#dff3ff";
  var SW = 7, CX = 200, CY = 178, R = 122;

  function f1(n) { return (Math.round(n * 10) / 10).toFixed(1); }
  function wobblyCircle(cx, cy, r, n, phase) {
    var pts = [];
    for (var i = 0; i < n; i++) {
      var t = 2 * Math.PI * i / n;
      var rr = r + 5.5 * Math.sin(3 * t + phase) + 3.5 * Math.sin(5 * t + 1.3 + phase) + 2 * Math.sin(2 * t + 0.4);
      pts.push([cx + rr * Math.cos(t), cy + rr * Math.sin(t) * 0.96]);
    }
    var d = "M " + f1(pts[0][0]) + " " + f1(pts[0][1]) + " ";
    for (var k = 0; k < n; k++) {
      var p0 = pts[(k - 1 + n) % n], p1 = pts[k], p2 = pts[(k + 1) % n], p3 = pts[(k + 2) % n];
      var c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      var c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += "C " + f1(c1[0]) + " " + f1(c1[1]) + " " + f1(c2[0]) + " " + f1(c2[1]) + " " + f1(p2[0]) + " " + f1(p2[1]) + " ";
    }
    return d + "Z";
  }
  var BODY = wobblyCircle(CX, CY, R, 48, 0);
  var LANDS = [
    "M 92 120 C 110 92 150 88 168 104 C 182 118 170 140 186 152 C 198 162 190 186 168 188 C 146 190 140 172 122 176 C 100 180 84 160 88 142 Z",
    "M 236 196 C 252 182 284 186 300 204 C 316 222 312 252 292 266 C 276 278 258 268 252 252 C 246 236 226 228 228 212 Z",
    "M 232 82 C 246 74 268 78 272 92 C 276 104 262 112 250 110 C 238 108 226 94 232 82 Z",
    "M 150 262 C 162 254 182 258 186 270 C 190 282 176 292 162 290 C 148 288 140 272 150 262 Z"
  ];
  function st(d, w, c, extra) {
    return '<path d="' + d + '" fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w || SW) + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || "") + "/>";
  }

  var MOUTHS = {
    X: st("M -24 -2 C -10 8 10 8 24 -4", 6),
    A: st("M -22 0 C -8 4 8 4 22 0", 8.5),
    B: '<path d="M -26 -6 C -12 6 12 6 26 -6 C 18 13 -18 13 -26 -6 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/><path d="M -19 -2 C -8 4 8 4 19 -2 L 17 2 C 8 7 -8 7 -17 2 Z" fill="' + EYE + '"/>',
    C: '<path d="M -26 -8 C -16 4 16 4 26 -8 C 22 22 -22 22 -26 -8 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/><path d="M -12 10 C -4 4 6 4 14 10 C 8 15 -6 15 -12 10 Z" fill="' + CHEEK + '"/>',
    D: '<path d="M -32 -12 C -18 0 18 0 32 -12 C 28 36 -28 36 -32 -12 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/><path d="M -24 -6 C -10 2 10 2 24 -6 L 22 0 C 10 6 -10 6 -22 0 Z" fill="' + EYE + '"/><path d="M -16 18 C -6 8 8 8 18 18 C 10 25 -8 25 -16 18 Z" fill="' + CHEEK + '"/>',
    E: '<ellipse cx="0" cy="2" rx="20" ry="13" fill="' + INK + '"/><path d="M -9 9 C -3 5 4 5 9 9 C 4 12 -4 12 -9 9 Z" fill="' + CHEEK + '"/>',
    F: '<ellipse cx="0" cy="2" rx="9" ry="11" fill="' + INK + '"/><ellipse cx="0" cy="2" rx="15" ry="17" fill="none" stroke="' + INK + '" stroke-width="5"/>',
    G: '<path d="M -24 -4 C -10 2 10 2 24 -4 C 18 13 -18 13 -24 -4 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/><rect x="-15" y="-5" width="30" height="9" rx="2" fill="' + EYE + '" stroke="' + INK + '" stroke-width="2"/>',
    H: '<path d="M -26 -8 C -16 4 16 4 26 -8 C 22 22 -22 22 -26 -8 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/><path d="M -11 12 C -8 -4 8 -4 11 12 Z" fill="' + CHEEK + '"/>',
    chatter: '<rect x="-40" y="-16" width="80" height="30" rx="10" fill="' + EYE + '" stroke="' + INK + '" stroke-width="6"/>' + st("M -38 -1 L -28 -10 L -18 8 L -8 -10 L 2 8 L 12 -10 L 22 8 L 32 -10 L 38 -1", 4),
    o: '<ellipse cx="0" cy="6" rx="17" ry="24" fill="' + INK + '"/>',
    flat: st("M -28 2 C -10 -2 12 8 32 -2", 6),
    smirk: st("M -24 -6 C -4 12 22 8 36 -14", 6),
    grin: '<path d="M -40 -14 C -28 30 28 30 40 -14 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/><path d="M -24 8 C -10 24 12 24 26 8 C 14 0 -12 0 -24 8 Z" fill="' + CHEEK + '"/>',
    wobbly: st("M -28 4 C -18 -4 -10 8 0 2 C 10 -4 18 8 28 0", 6)
  };
  var MOUTH_NAMES = Object.keys(MOUTHS);

  function eye(id, side, x, y) {
    var s = '<g transform="translate(' + x + "," + y + ')"><g id="' + id + "-eye" + side + '">';
    s += '<ellipse cx="0" cy="0" rx="25" ry="31" fill="' + EYE + '" stroke="' + INK + '" stroke-width="5"/>';
    s += '<g id="' + id + "-pup" + side + '"><circle cx="3" cy="4" r="13" fill="' + INK + '"/><circle cx="8" cy="-2" r="5" fill="#ffffff"/></g>';
    s += '<clipPath id="' + id + "-ec" + side + '"><ellipse cx="0" cy="0" rx="27.5" ry="33.5"/></clipPath>';
    s += '<g clip-path="url(#' + id + "-ec" + side + ')"><g id="' + id + "-lid" + side + '"><rect x="-32" y="-104" width="64" height="72" fill="' + LID + '"/>' + st("M -30 -32 L 30 -32", 5) + "</g></g>";
    s += '<ellipse cx="0" cy="0" rx="25" ry="31" fill="none" stroke="' + INK + '" stroke-width="5"/>';
    var lash = "M -14 -27 L -24 -44 M 0 -31 L 0 -50 M 14 -27 L 24 -44";
    s += '<g id="' + id + "-lash" + side + '">' + st(lash, 5) + "</g>";
    s += '<g id="' + id + "-ilash" + side + '">' + st(lash, 10) + st(lash, 5, ICE) +
      '<path d="M -27 -46 L -24 -36 L -21 -46 Z M -3 -52 L 0 -42 L 3 -52 Z M 21 -46 L 24 -36 L 27 -46 Z" fill="' + ICE + '" stroke="' + INK + '" stroke-width="2"/></g>';
    return s + "</g></g>";
  }

  function arm(id, side, x, y, hold) {
    return '<g transform="translate(' + x + "," + y + ')"><g id="' + id + "-a" + side + 'u">' + st("M 0 0 L 0 48", 13) +
      '<g transform="translate(0,48)"><g id="' + id + "-a" + side + 'f">' + st("M 0 0 L 0 46", 13) +
      '<g transform="translate(0,52)"><g id="' + id + "-h" + side + '">' + (hold || "") + '<circle cx="0" cy="0" r="14" fill="' + INK + '"/></g></g>' +
      "</g></g></g></g>";
  }
  /* tay vẽ đè lên đồ cầm (nắm tay phía trước) – đồ cầm truyền vào qua o.holdL/holdR */

  function legs(id) {
    var l = '<g transform="translate(174,290)"><g id="' + id + '-legL">' + st("M 0 0 C -2 34 -4 60 -6 90", 15) +
      '<ellipse cx="-16" cy="95" rx="28" ry="12" fill="' + SHOE + '" stroke="' + INK + '" stroke-width="5"/></g></g>';
    var r = '<g transform="translate(226,290)"><g id="' + id + '-legR">' + st("M 0 0 C 2 34 4 60 6 90", 15) +
      '<ellipse cx="16" cy="95" rx="28" ry="12" fill="' + SHOE + '" stroke="' + INK + '" stroke-width="5"/></g></g>';
    return l + r;
  }

  function backpack(id, extra) {
    return '<g id="' + id + '-pack">' + (extra || "") +
      '<rect x="250" y="96" width="98" height="160" rx="30" fill="' + PACK + '" stroke="' + INK + '" stroke-width="' + SW + '"/>' +
      '<rect x="300" y="150" width="44" height="58" rx="12" fill="' + PACK_DARK + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="262" y="66" width="96" height="36" rx="18" fill="' + MAT + '" stroke="' + INK + '" stroke-width="' + SW + '"/>' +
      st("M 282 70 L 282 98", 4) + st("M 336 70 L 336 98", 4) + "</g>";
  }

  function body(id, o) {
    var s = '<clipPath id="' + id + '-clip"><path d="' + BODY + '"/></clipPath>';
    s += '<path d="' + BODY + '" fill="' + SEA + '"/>';
    s += '<g clip-path="url(#' + id + '-clip)">';
    LANDS.forEach(function (d) { s += '<path d="' + d + '" fill="' + LAND + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>'; });
    s += st("M 200 46 C 130 138 130 218 200 310", 2.5, INK, ' opacity="0.28"');
    s += st("M 200 46 C 270 138 270 218 200 310", 2.5, INK, ' opacity="0.28"');
    s += st("M 68 188 C 160 218 240 218 332 188", 2.5, INK, ' opacity="0.28"');
    s += '<path d="M 0 0 L 400 0 L 400 400 L 0 400 Z" fill="url(#half)" opacity="0.08"/>';
    if (o.scarf) {
      s += '<path d="M 50 250 C 120 272 280 272 350 250 L 350 300 C 280 318 120 318 50 300 Z" fill="' + scarfC(o) + '" stroke="' + INK + '" stroke-width="5"/>';
      s += st("M 50 266 C 120 288 280 288 350 266", 5, scarfS(o)) + st("M 50 282 C 120 304 280 304 350 282", 5, scarfS(o));
    }
    s += st("M 112 112 C 122 96 136 86 152 80", 9, "#ffffff", ' opacity="0.55"');
    s += "</g>";
    s += '<path d="' + BODY + '" fill="none" stroke="' + INK + '" stroke-width="' + SW + '" stroke-linejoin="round"/>';
    s += st("M 300 96 C 286 130 284 168 300 206", 10, PACK_DARK);
    s += st("M 300 96 C 286 130 284 168 300 206", 3, INK, ' opacity="0.6"');
    if (o.scarf) {
      s += '<g transform="translate(116,276)"><g id="' + id + '-scarfT"><path d="M -4 0 C -14 22 -22 52 -18 84 L 10 86 C 8 56 14 26 22 4 Z" fill="' + scarfC(o) + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        st("M -12 30 C -4 32 6 32 14 28 M -16 58 C -6 60 4 60 10 58", 4, scarfS(o)) +
        st("M -16 84 L -18 98 M -6 85 L -7 99 M 4 86 L 4 100", 4) + "</g></g>";
    }
    return s;
  }

  function scarfC(o) { return o.khan || (typeof o.scarf === "string" ? o.scarf : "#E0703A"); }
  function scarfS(o) { return o.khanSoc || (o.khan || typeof o.scarf === "string" ? "#F6EEDC" : "#F3C27A"); }

  /* Mũ len có quả bông (o.mu = true | màu). Đội trên đỉnh thân, không che mắt; lông mi vẽ đè lên vành mũ. */
  function hat(id, o) {
    var c = typeof o.mu === "string" ? o.mu : "#C9463A", cuff = o.muVanh || "#A8352B", cream = "#F6EEDC";
    var s = '<g id="' + id + '-hat">';
    s += '<path d="M 94 100 C 96 34 150 10 200 10 C 250 10 304 34 306 100 Z" fill="#0b1214" opacity="0.18" transform="translate(5,6)"/>';
    s += '<path d="M 94 100 C 96 34 150 10 200 10 C 250 10 304 34 306 100 Z" fill="' + c + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
    for (var k = 0; k < 3; k++) {
      var yy = 78 - k * 20;
      s += st("M " + (122 + k * 6) + " " + yy + " L " + 150 + " " + (yy - 14) + " L 178 " + yy + " M 222 " + yy + " L 250 " + (yy - 14) + " L " + (278 - k * 6) + " " + yy, 3.5, "#8E2C24", ' opacity="0.55"');
    }
    s += st("M 132 40 C 150 26 172 20 190 20", 6, "#ffffff", ' opacity="0.35"');
    s += '<path d="M 88 90 C 140 76 260 76 312 90 L 314 120 C 260 104 140 104 86 120 Z" fill="' + cuff + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
    for (var x = 100; x <= 300; x += 16) s += st("M " + x + " " + (86 + Math.abs(x - 200) * 0.04) + " L " + x + " " + (110 + Math.abs(x - 200) * 0.06), 3, "#6E2019", ' opacity="0.5"');
    s += '<g id="' + id + '-pom"><circle cx="203" cy="4" r="24" fill="#0b1214" opacity="0.18"/><path d="M 200 -22 L 208 -16 L 220 -18 L 222 -6 L 230 2 L 222 10 L 222 22 L 210 20 L 200 28 L 190 20 L 178 22 L 178 10 L 170 2 L 178 -6 L 180 -18 L 192 -16 Z" fill="' + cream + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/></g>';
    return s + "</g>";
  }

  /* Mũ tuyết trên đầu (gag tuyết rơi trúng đầu). o.tuyetDau = true. Ẩn sẵn: bật bằng set(t, { snow: 1 }). */
  function snowCap(id, o) {
    var top = o.mu ? -6 : 46;
    function y(v) { return top + v; }
    var d = "M 118 " + y(74) + " C 112 " + y(40) + " 140 " + y(10) + " 168 " + y(14) + " C 176 " + y(-14) + " 214 " + y(-22) + " 232 " + y(2) +
      " C 262 " + y(-2) + " 290 " + y(30) + " 284 " + y(72) + " C 262 " + y(82) + " 236 " + y(66) + " 214 " + y(80) + " C 190 " + y(92) + " 160 " + y(72) + " 140 " + y(84) + " C 130 " + y(88) + " 120 " + y(84) + " 118 " + y(74) + " Z";
    return '<g id="' + id + '-snow"><path d="' + d + '" fill="#0b1214" opacity="0.18" transform="translate(5,6)"/><path d="' + d + '" fill="#F7FBFC" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="url(#halfW)" opacity="0.5"/>' + st("M 146 " + y(30) + " C 160 " + y(16) + " 180 " + y(10) + " 196 " + y(12), 5, "#BFE0EE") + "</g>";
  }

  function blanket() {
    var outer = "M 34 330 C 22 220 30 70 200 26 C 370 70 380 220 366 330 C 300 352 100 352 34 330 Z";
    var hole = " M 104 196 C 104 140 150 108 200 108 C 250 108 296 140 296 196 C 296 252 250 280 200 280 C 150 280 104 252 104 196 Z";
    return '<path d="' + outer + hole + '" fill="#0b1214" opacity="0.2" fill-rule="evenodd" transform="translate(5,7)"/>' +
      '<path d="' + outer + hole + '" fill="url(#plaid)" stroke="' + INK + '" stroke-width="6" fill-rule="evenodd" stroke-linejoin="round"/>' +
      st("M 70 300 C 90 250 92 200 100 160", 4, INK, ' opacity="0.5"') + st("M 330 300 C 312 250 306 200 300 160", 4, INK, ' opacity="0.5"');
  }

  /* o: { scarf (true | màu), khan, khanSoc, mu (true | màu), muVanh, tuyetDau, blanket, holdL, holdR, packExtra } – mọi id có tiền tố id */
  function svg(id, o) {
    o = o || {};
    var s = '<g id="' + id + '"><g id="' + id + '-sz"><g id="' + id + '-sh">';
    s += '<ellipse id="' + id + '-shadow" cx="0" cy="2" rx="118" ry="15" fill="#0b1214" opacity="0.28"/>';
    s += '<g id="' + id + '-sq" filter="url(#pshadow)"><g id="' + id + '-br"><g transform="translate(-200,-392)">';
    s += legs(id);
    s += '<g id="' + id + '-up">';
    s += backpack(id, o.packExtra);
    s += body(id, o);
    if (o.mu) s += hat(id, o);
    if (o.tuyetDau) s += snowCap(id, o);
    s += '<ellipse cx="124" cy="204" rx="16" ry="10" fill="' + CHEEK + '" opacity="0.55"/><ellipse cx="276" cy="204" rx="16" ry="10" fill="' + CHEEK + '" opacity="0.55"/>';
    s += eye(id, "L", 160, 156) + eye(id, "R", 238, 156);
    s += '<g transform="translate(200,228)">';
    MOUTH_NAMES.forEach(function (m) { s += '<g id="' + id + "-m-" + m + '">' + MOUTHS[m] + "</g>"; });
    s += "</g>";
    if (o.blanket) s += blanket();
    s += arm(id, "L", 88, 210, o.holdL) + arm(id, "R", 312, 210, o.holdR);
    s += "</g></g></g></g></g></g></g>";
    return s;
  }

  /* ---------- khoá hình tất định ----------
     Mỗi (phần tử, thuộc tính) là một chuỗi khoá [t, giá trị, ease]. Phát ra fromTo nối tiếp (không chồng nhau),
     nên tua tới khung nào cũng ra đúng khung đó. */
  var DEF = { x: 0, y: 0, rotation: 0, scale: 1, scaleX: 1, scaleY: 1, opacity: 1 };
  function Keys() { this.m = {}; this.order = []; this.seq = 0; this.origins = {}; }
  Keys.prototype.add = function (sel, prop, t, v, ease) {
    var k = sel + "|" + prop;
    if (!this.m[k]) { this.m[k] = { sel: sel, prop: prop, k: [] }; this.order.push(k); }
    this.m[k].k.push({ t: Math.max(0, t), v: v, e: ease || "power2.inOut", i: this.seq++ });
  };
  Keys.prototype.at = function (sel, prop, t) {
    var tr = this.m[sel + "|" + prop];
    var best = null;
    if (tr) tr.k.forEach(function (k) { if (k.t <= t + 1e-6 && (!best || k.t > best.t || (k.t === best.t && k.i > best.i))) best = k; });
    return best ? best.v : (prop in DEF ? DEF[prop] : 0);
  };
  /* đổi tư thế: giữ giá trị cũ tới t rồi chuyển sang giá trị mới trong dur giây */
  Keys.prototype.to = function (sel, t, dur, props, ease) {
    var self = this;
    Object.keys(props).forEach(function (p) {
      var cur = self.at(sel, p, t);
      self.add(sel, p, t, cur, ease);
      self.add(sel, p, t + dur, props[p], ease);
    });
  };
  Keys.prototype.set = function (sel, t, props) {
    var self = this;
    Object.keys(props).forEach(function (p) { self.add(sel, p, t, props[p], "step"); });
  };
  Keys.prototype.origin = function (sel, o) { this.origins[sel] = o; };
  Keys.prototype.emit = function (tl, gsap) {
    var self = this;
    Object.keys(this.origins).forEach(function (sel) { gsap.set(sel, { svgOrigin: self.origins[sel] }); });
    var n = 0;
    this.order.forEach(function (key) {
      var tr = self.m[key];
      var ks = tr.k.slice().sort(function (a, b) { return a.t - b.t || a.i - b.i; });
      var p = tr.prop, v0 = {};
      v0[p] = ks[0].v;
      gsap.set(tr.sel, v0);
      tl.set(tr.sel, v0, 0); n++;
      for (var i = 1; i < ks.length; i++) {
        var a = ks[i - 1], b = ks[i];
        var to = {};
        to[p] = b.v;
        if (b.t - a.t < 1e-4 || b.e === "step") { if (a.v !== b.v) { tl.set(tr.sel, to, b.t); n++; } continue; }
        if (a.v === b.v) continue;
        var from = {};
        from[p] = a.v;
        to.duration = b.t - a.t; to.ease = b.e; to.immediateRender = false;
        tl.fromTo(tr.sel, from, to, a.t); n++;
      }
    });
    return n;
  };

  /* ---------- điều khiển một con rối ---------- */
  var MAP = {
    x: ["", "x"], y: ["", "y"], size: ["-sz", "scale"], shx: ["-sh", "x"],
    sx: ["-sq", "scaleX"], sy: ["-sq", "scaleY"], lean: ["-sq", "rotation"],
    upY: ["-up", "y"], upRot: ["-up", "rotation"],
    legL: ["-legL", "rotation"], legR: ["-legR", "rotation"], legLs: ["-legL", "scaleY"], legRs: ["-legR", "scaleY"],
    aLu: ["-aLu", "rotation"], aLf: ["-aLf", "rotation"], aRu: ["-aRu", "rotation"], aRf: ["-aRf", "rotation"],
    pack: ["-pack", "rotation"], packY: ["-pack", "y"], scarf: ["-scarfT", "rotation"],
    pLx: ["-pupL", "x"], pLy: ["-pupL", "y"], pRx: ["-pupR", "x"], pRy: ["-pupR", "y"],
    eyeL: ["-eyeL", "scale"], eyeR: ["-eyeR", "scale"],
    lash: ["-lashL", "scale"], lashR: ["-lashR", "scale"], ilash: ["-ilashL", "opacity"], ilashR: ["-ilashR", "opacity"],
    shadow: ["-shadow", "scaleX"], op: ["", "opacity"],
    sway: ["-br", "rotation"], hat: ["-hat", "rotation"], pom: ["-pom", "rotation"], snow: ["-snow", "opacity"], snowY: ["-snow", "y"]
  };
  var ALIAS = { lid: ["lidL", "lidR"], pupX: ["pLx", "pRx"], pupY: ["pLy", "pRy"], eye: ["eyeL", "eyeR"], lashes: ["lash", "lashR"], ice: ["ilash", "ilashR"] };

  function Wob(K, id, o) {
    this.K = K; this.id = id; this.o = o || {};
    this.lidKeys = [];      // [t, mức] mức 0 mở .. 62 nhắm
    this.mouthKeys = [];    // [t, hình]
    this.noBlink = [];
    this.steps = [];        // mốc chạm chân (cho tiếng bước)
    var sq = "#" + id;
    K.origin(sq + "-sz", "0 0"); K.origin(sq + "-sh", "0 0"); K.origin(sq + "-sq", "0 0"); K.origin(sq + "-br", "0 0");
    K.origin(sq + "-up", "200 290"); K.origin(sq + "-pack", "300 96");
    ["legL", "legR", "aLu", "aLf", "aRu", "aRf", "hL", "hR"].concat(this.o.scarf ? ["scarfT"] : []).forEach(function (p) { K.origin(sq + "-" + p, "0 0"); });
    K.origin(sq + "-eyeL", "0 0"); K.origin(sq + "-eyeR", "0 0");
    K.origin(sq + "-lashL", "0 -31"); K.origin(sq + "-lashR", "0 -31");
    K.origin(sq + "-shadow", "0 0");
    if (this.o.mu) { K.origin(sq + "-hat", "200 100"); K.origin(sq + "-pom", "200 26"); }
    if (this.o.tuyetDau) { K.origin(sq + "-snow", "200 60"); K.set(sq + "-snow", 0, { opacity: 0 }); }
    this.stepSounds = [];   // [{t, ten}]: tiếng bước do walk(..., {tieng}) sinh, phim.js gom vào sfx
  }
  Wob.prototype.sel = function (name) {
    var m = MAP[name];
    if (!m) throw new Error("Wob: không có khớp " + name);
    return ["#" + this.id + m[0], m[1]];
  };
  Wob.prototype.expand = function (props) {
    var out = {};
    Object.keys(props).forEach(function (k) {
      if (ALIAS[k]) ALIAS[k].forEach(function (a) { out[a] = props[k]; }); else out[k] = props[k];
    });
    return out;
  };
  Wob.prototype.pose = function (t, dur, props, ease) {
    var self = this, ps = this.expand(props);
    Object.keys(ps).forEach(function (k) {
      if (k === "lidL" || k === "lidR") { if (k === "lidL") self.lid(t, dur, ps[k]); return; }
      var s = self.sel(k), o = {};
      o[s[1]] = ps[k];
      self.K.to(s[0], t, dur, o, ease);
    });
    return this;
  };
  Wob.prototype.set = function (t, props) {
    var self = this, ps = this.expand(props);
    Object.keys(ps).forEach(function (k) {
      if (k === "lidL" || k === "lidR") { if (k === "lidL") self.lidKeys.push([t, ps[k], t, "step"]); return; }
      var s = self.sel(k), o = {};
      o[s[1]] = ps[k];
      self.K.set(s[0], t, o);
    });
    return this;
  };
  Wob.prototype.val = function (k, t) { var s = this.sel(k); return this.K.at(s[0], s[1], t); };
  Wob.prototype.lid = function (t, dur, v) { this.lidKeys.push([t, v, t + dur, "power2.inOut"]); return this; };
  Wob.prototype.mouth = function (t, shape) { this.mouthKeys.push([t, shape]); return this; };
  Wob.prototype.lipsync = function (cues, offset, t0, t1) {
    var self = this;
    cues.forEach(function (c) {
      var t = c.start + offset;
      if ((t0 == null || t >= t0 - 1e-6) && (t1 == null || t < t1)) self.mouthKeys.push([t, c.value]);
    });
    return this;
  };
  /* thở nhẹ: co giãn 1,8% quanh chân */
  Wob.prototype.breathe = function (t0, t1, period) {
    var p = period || 2.6, sel = "#" + this.id + "-br", t = t0, up = true;
    this.K.add(sel, "scaleY", t0, 1);
    while (t + p / 2 <= t1) { t += p / 2; this.K.add(sel, "scaleY", t, up ? 1.018 : 1, "sine.inOut"); up = !up; }
    return this;
  };
  /* run: rung ngang liên tục */
  Wob.prototype.shiver = function (t0, t1, amp, hz) {
    var sel = "#" + this.id + "-sh", dt = 1 / (hz || 14), t = t0, s = 1;
    this.K.add(sel, "x", t0, 0);
    while (t + dt <= t1) { t += dt; this.K.add(sel, "x", t, s * amp, "sine.inOut"); s = -s; }
    this.K.add(sel, "x", t + dt, 0, "sine.out");
    return this;
  };
  /* đi lạch bạch: chu kỳ bước, nhún – co giãn khi chạm đất, ba lô và khăn nảy trễ theo đà */
  Wob.prototype.walk = function (t0, t1, x0, x1, o) {
    o = o || {};
    var K = this.K, id = "#" + this.id, n = Math.max(2, Math.round((t1 - t0) / (o.step || 0.3))), dt = (t1 - t0) / n;
    var armsFree = o.arms !== false, rightOnly = o.arms === "R";
    var baseL = this.val("aLu", t0), baseR = this.val("aRu", t0);
    // giữ nguyên tư thế tới ngay trước bước đầu, để không trôi chậm từ khoá cũ
    var th = t0 - 0.1, self = this;
    [["-legL", "rotation"], ["-legR", "rotation"], ["-legL", "scaleY"], ["-legR", "scaleY"], ["-sq", "scaleX"], ["-sq", "scaleY"],
      ["-sq", "rotation"], ["-up", "y"], ["-pack", "rotation"], ["-pack", "y"]].concat(this.o.scarf ? [["-scarfT", "rotation"]] : []).concat(this.o.mu ? [["-pom", "rotation"]] : [])
      .concat(armsFree ? (rightOnly ? [["-aRu", "rotation"]] : [["-aLu", "rotation"], ["-aRu", "rotation"]]) : [])
      .forEach(function (p) { K.add(id + p[0], p[1], th, K.at(id + p[0], p[1], th)); });
    K.add(id, "x", t0, x0); K.add(id, "x", t1, x1, o.ease || "sine.inOut");
    var dir = x1 >= x0 ? 1 : -1;
    for (var k = 0; k < n; k++) {
      var tk = t0 + k * dt, tm = tk + dt / 2, left = k % 2 === 0, lag = dt * 0.28;
      K.add(id + "-legL", "rotation", tk, 0, "sine.inOut"); K.add(id + "-legR", "rotation", tk, 0, "sine.inOut");
      K.add(id + "-legL", "scaleY", tk, 1, "sine.inOut"); K.add(id + "-legR", "scaleY", tk, 1, "sine.inOut");
      K.add(id + (left ? "-legL" : "-legR"), "rotation", tm, left ? 16 : -16, "sine.out");
      K.add(id + (left ? "-legL" : "-legR"), "scaleY", tm, 0.8, "sine.out");
      K.add(id + "-sq", "scaleY", tk, k === 0 ? 1 : 0.94, "power2.in"); K.add(id + "-sq", "scaleX", tk, k === 0 ? 1 : 1.05, "power2.in");
      K.add(id + "-sq", "scaleY", tm, 1.03, "sine.out"); K.add(id + "-sq", "scaleX", tm, 0.98, "sine.out");
      K.add(id + "-sq", "rotation", tk, dir * 3, "sine.inOut"); K.add(id + "-sq", "rotation", tm, dir * 3 + (left ? 5 : -5), "sine.inOut");
      K.add(id + "-up", "y", tk, k === 0 ? 0 : 5, "power2.in"); K.add(id + "-up", "y", tm, -10, "sine.out");
      K.add(id + "-pack", "rotation", tm + lag, left ? -7 : 7, "sine.inOut"); K.add(id + "-pack", "y", tk + lag, k === 0 ? 0 : 7, "power2.in");
      K.add(id + "-pack", "y", tm + lag, -5, "sine.out");
      if (this.o.scarf) K.add(id + "-scarfT", "rotation", tm + lag, (left ? 12 : -4) - dir * 10, "sine.inOut");
      if (this.o.mu) K.add(id + "-pom", "rotation", tm + lag * 1.4, (left ? 14 : -14) - dir * 8, "sine.inOut");
      if (armsFree) {
        if (!rightOnly) K.add(id + "-aLu", "rotation", tm, baseL + (left ? -14 : 14), "sine.inOut");
        K.add(id + "-aRu", "rotation", tm, baseR + (left ? -14 : 14), "sine.inOut");
      }
      if (k > 0) { this.steps.push(tk); if (o.tieng) this.stepSounds.push({ t: tk, ten: o.tieng === true ? "buoc-tuyet" : o.tieng }); }
    }
    this.steps.push(t1);
    if (o.tieng) this.stepSounds.push({ t: t1, ten: o.tieng === true ? "buoc-tuyet" : o.tieng });
    var te = t1 + 0.18;
    K.add(id + "-legL", "rotation", t1, 0); K.add(id + "-legR", "rotation", t1, 0);
    K.add(id + "-legL", "scaleY", t1, 1); K.add(id + "-legR", "scaleY", t1, 1);
    K.add(id + "-sq", "scaleY", t1, 0.92, "power2.in"); K.add(id + "-sq", "scaleX", t1, 1.06, "power2.in");
    K.add(id + "-sq", "scaleY", te, 1, "back.out(3)"); K.add(id + "-sq", "scaleX", te, 1, "back.out(3)");
    K.add(id + "-sq", "rotation", t1, 0, "sine.out");
    K.add(id + "-up", "y", t1, 4, "power2.in"); K.add(id + "-up", "y", te, 0, "back.out(2)");
    K.add(id + "-pack", "rotation", t1 + 0.1, dir * -9, "sine.out"); K.add(id + "-pack", "rotation", t1 + 0.42, 0, "back.out(2)");
    K.add(id + "-pack", "y", t1 + 0.12, 6, "power2.in"); K.add(id + "-pack", "y", t1 + 0.4, 0, "back.out(2)");
    if (this.o.scarf) { K.add(id + "-scarfT", "rotation", t1 + 0.15, dir * -14, "sine.out"); K.add(id + "-scarfT", "rotation", t1 + 0.6, 0, "back.out(2)"); }
    if (this.o.mu) { K.add(id + "-pom", "rotation", t1 + 0.12, dir * -18, "sine.out"); K.add(id + "-pom", "rotation", t1 + 0.7, 0, "elastic.out(1,0.45)"); }
    if (armsFree) {
      if (!rightOnly) K.add(id + "-aLu", "rotation", te, baseL, "sine.out");
      K.add(id + "-aRu", "rotation", te, baseR, "sine.out");
    }
    this.noBlink.push([t0, t1]);
    return this;
  };
  /* chớp mắt ngẫu nhiên có seed, chỉ khi mí đang đứng yên */
  Wob.prototype.autoBlink = function (t0, t1, seed) {
    var r = G.DaoCu.rng(seed || 5), t = t0 + 0.8 + r() * 1.5, out = [];
    while (t < t1 - 0.3) { out.push(t); t += 2.2 + r() * 2.4; }
    this.blinks = (this.blinks || []).concat(out);
    return this;
  };
  Wob.prototype.blinkAt = function (t) { this.blinks = (this.blinks || []).concat([t]); return this; };

  Wob.prototype.finish = function (tl, gsap) {
    var K = this.K, self = this, id = this.id;
    // mí mắt: khoá nền + chớp mắt
    var lk = this.lidKeys.slice().sort(function (a, b) { return a[0] - b[0]; });
    var base = [[0, 0]];
    lk.forEach(function (k) {
      var prev = base[base.length - 1][1];
      base.push([k[0], prev, "none"]);
      base.push([k[2], k[1], k[3]]);
    });
    function baseAt(t) { var v = 0; base.forEach(function (b) { if (b[0] <= t + 1e-6) v = b[1]; }); return v; }
    function busy(t) {
      for (var i = 0; i < lk.length; i++) if (t > lk[i][0] - 0.25 && t < lk[i][2] + 0.25) return true;
      for (var j = 0; j < self.noBlink.length; j++) if (t > self.noBlink[j][0] && t < self.noBlink[j][1]) return true;
      return false;
    }
    var keys = base.slice();
    (this.blinks || []).forEach(function (tb) {
      if (busy(tb)) return;
      var b = baseAt(tb);
      if (b > 40) return;
      keys.push([tb, b, "none"], [tb + 0.06, 62, "power2.in"], [tb + 0.11, 62, "none"], [tb + 0.2, b, "power2.out"]);
    });
    keys.forEach(function (k) {
      K.add("#" + id + "-lidL", "y", k[0], k[1], k[2] || "power2.inOut");
      K.add("#" + id + "-lidR", "y", k[0], k[1], k[2] || "power2.inOut");
    });
    // miệng: ẩn/hiện từng hình
    var mk = this.mouthKeys.slice().sort(function (a, b) { return a[0] - b[0]; });
    var cur = mk.length && mk[0][0] <= 0 ? null : "X";
    MOUTH_NAMES.forEach(function (m) { gsap.set("#" + id + "-m-" + m, { opacity: m === cur ? 1 : 0 }); tl.set("#" + id + "-m-" + m, { opacity: m === cur ? 1 : 0 }, 0); });
    mk.forEach(function (k) {
      if (k[1] === cur) return;
      if (cur) tl.set("#" + id + "-m-" + cur, { opacity: 0 }, k[0]);
      tl.set("#" + id + "-m-" + k[1], { opacity: 1 }, k[0]);
      cur = k[1];
    });
  };

  /* động học thuận: vị trí bàn tay (toạ độ cha của con rối) – dùng để đặt đồ vật khi Wob buông tay */
  function rot(p, deg, o) {
    var a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), x = p[0] - o[0], y = p[1] - o[1];
    return [o[0] + x * c - y * s, o[1] + x * s + y * c];
  }
  Wob.prototype.hand = function (side, t) {
    var v = this.val.bind(this);
    var sh = side === "L" ? [88, 210] : [312, 210];
    var u = v("a" + side + "u", t), f = v("a" + side + "f", t);
    var p = [0, 52];
    p = rot(p, f, [0, 0]); p = [p[0], p[1] + 48]; p = rot(p, u, [0, 0]);
    p = [p[0] + sh[0], p[1] + sh[1]];
    p = rot([p[0], p[1] + v("upY", t)], v("upRot", t), [200, 290]);
    p = [p[0] - 200, p[1] - 392];
    p = rot(p, v("lean", t), [0, 0]);
    var s = v("size", t);
    return { x: v("x", t) + p[0] * s, y: v("y", t) + p[1] * s, angle: u + f + v("upRot", t) + v("lean", t), scale: s };
  };

  /* ---------- diễn xuất có tên (gom từ bản thử để canh.js ngắn) ----------
     Tư thế nghỉ của tay: trái { aLu: 18, aLf: -10 }, phải { aRu: -18, aRf: 10 }. Góc tay tính bằng độ, 0 = thõng xuống,
     tay phải giơ ngang ra ngoài ≈ -90, giơ thẳng lên ≈ -170; tay trái đối xứng (dương). */
  var REST = { L: { aLu: 18, aLf: -10 }, R: { aRu: -18, aRf: 10 } };
  function arms(side, u, f) { var o = {}; o["a" + side + "u"] = side === "L" ? -u : u; o["a" + side + "f"] = side === "L" ? -f : f; return o; }

  /* Đứng không trống: đung đưa dồn trọng tâm (xoay quanh chân, không đụng lean/khớp khác) + thở + liếc mắt.
     Chữa lỗi "đứng chờ lời" của bản thử. o: { seed, bien (độ, mặc định 2.4), tho (true), liec (false) } */
  Wob.prototype.idle = function (t0, t1, o) {
    o = o || {};
    var r = G.DaoCu.rng(o.seed || 17), sel = "#" + this.id + "-br", amp = o.bien == null ? 2.4 : o.bien, t = t0, sgn = r() < 0.5 ? -1 : 1;
    this.K.add(sel, "rotation", t0, this.K.at(sel, "rotation", t0), "sine.inOut");
    while (t < t1 - 0.6) {
      var step = Math.min(1.3 + r() * 1.1, t1 - t);
      t += step;
      this.K.add(sel, "rotation", t, sgn * amp * (0.55 + r() * 0.45), "sine.inOut");
      sgn = -sgn;
    }
    this.K.add(sel, "rotation", t1, 0, "sine.inOut");
    if (o.tho !== false) this.breathe(t0, t1);
    if (o.liec) {
      for (var g = t0 + 0.9 + r(); g < t1 - 0.8; g += 1.8 + r() * 1.6) {
        var px = (r() * 2 - 1) * 8;
        this.pose(g, 0.18, { pupX: px, pupY: (r() * 2 - 1) * 3 }, "power2.out");
      }
    }
    return this;
  };
  /* Giật mình: nhún, bật lên, mắt to, miệng "o"; về lại sau 0,5 s. */
  Wob.prototype.soc = function (t, o) {
    o = o || {};
    this.pose(t - 0.08, 0.08, { sy: 0.9, sx: 1.07 }, "power2.in");
    this.pose(t, 0.14, { sy: 1.08, sx: 0.95, upY: -18, eye: 1.25 }, "back.out(3)");
    this.pose(t + 0.32, 0.3, { sy: 1, sx: 1, upY: 0, eye: o.giuMat ? 1.12 : 1 }, "power2.out");
    this.mouth(t, o.mieng || "o");
    return this;
  };
  /* Nhón chân ngó qua vật cao (cửa kính…). o: { lean (độ, mặc định 6), nhin: [px, py] } */
  Wob.prototype.nhonChan = function (t, dur, o) {
    o = o || {};
    var n = o.nhin || [9, -9];
    this.pose(t, 0.25, { sy: 1.1, sx: 0.95, lean: o.lean == null ? 6 : o.lean, upY: -6, pupX: n[0], pupY: n[1] }, "back.out(1.5)");
    this.pose(t + dur, 0.22, { sy: 1, sx: 1, lean: 0, upY: 0, pupY: 0 }, "power2.inOut");
    return this;
  };
  /* Vẫy tay n lần. side "R" | "L". Trả về tay nghỉ ở cuối nếu o.ve !== false. */
  Wob.prototype.vay = function (t, n, side, o) {
    o = o || {}; side = side || "R";
    this.pose(t, 0.15, arms(side, -150, -30), "power2.out");
    for (var i = 0; i < (n || 4); i++) this.pose(t + 0.18 + i * 0.18, 0.16, arms(side, -150, i % 2 ? -32 : 22), "sine.inOut");
    if (o.ve !== false) this.pose(t + 0.2 + (n || 4) * 0.18, 0.25, REST[side], "power2.inOut");
    return this;
  };
  /* Nhún vai, giữ giu giây. */
  Wob.prototype.nhunVai = function (t, giu, o) {
    o = o || {};
    var p = { upRot: -3, upY: -4 };
    if (!o.boTrai) { p.aLu = 62; p.aLf = 70; }
    if (!o.boPhai) { p.aRu = -62; p.aRf = -70; }
    this.pose(t, 0.25, p, "back.out(1.6)");
    var b = { upRot: 0, upY: 0 };
    if (!o.boTrai) { b.aLu = 18; b.aLf = -10; }
    if (!o.boPhai) { b.aRu = -18; b.aRf = 10; }
    this.pose(t + (giu || 0.8), 0.3, b, "power2.inOut");
    return this;
  };
  /* Gõ/chọc vào vật trước mặt: với tay, n cú gõ. Trả về mảng mốc chạm (để đặt sfx bonk). */
  Wob.prototype.go = function (t, n, side, o) {
    o = o || {}; side = side || "R"; n = n || 2;
    var u = o.goc == null ? -96 : o.goc, hits = [];
    this.pose(t, 0.18, arms(side, u, -40), "power2.out");
    for (var i = 0; i < n; i++) {
      var th = t + 0.26 + i * 0.2;
      this.pose(th - 0.08, 0.08, arms(side, u, 6), "power3.in");
      this.pose(th, 0.1, arms(side, u, -30), "power2.out");
      hits.push(th);
    }
    if (o.ve !== false) this.pose(t + 0.3 + n * 0.2, 0.22, REST[side], "power2.out");
    return hits;
  };
  /* Nhìn trái, nhìn phải, về giữa (đầu nghiêng theo). */
  Wob.prototype.nhinQuanh = function (t, o) {
    o = o || {};
    var d = o.nhip || 0.4;
    this.pose(t, 0.15, { pupX: -10, upRot: -2 }, "power2.out");
    this.pose(t + d, 0.18, { pupX: 10, upRot: 2 }, "power2.out");
    this.pose(t + 2 * d, 0.15, { pupX: 0, pupY: 0, upRot: 0 }, "power2.out");
    return this;
  };
  /* Lác mắt nhìn lên (cố nhìn lông mi, tuyết trên đầu…). */
  Wob.prototype.lacMat = function (t, dur, o) {
    o = o || {};
    this.pose(t, 0.25, { pLx: 9, pRx: -9, pupY: o.y == null ? -14 : o.y, eye: 1.06 }, "power2.inOut");
    if (dur != null) this.pose(t + dur, 0.2, { pLx: 0, pRx: 0, pupY: 0, eye: 1 }, "power2.out");
    return this;
  };
  /* Vác đồ lên vai (đồ cầm trong holdL/holdR, xoay đồ riêng bằng K). */
  Wob.prototype.vacVai = function (t, side, dur) {
    side = side || "L";
    this.pose(t, dur || 0.22, arms(side, -172, -28), "back.out(1.6)");
    return this;
  };

  G.WobRig = { svg: svg, Keys: Keys, Wob: Wob, MOUTHS: MOUTH_NAMES, REST: REST };
})(typeof window !== "undefined" ? window : globalThis);
