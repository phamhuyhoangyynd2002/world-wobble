/* ve-tay · rig Wob. Toạ độ gốc đúng templates/_shared/wob/nguon/tao_wob.py (thân méo, lục địa, ba lô, giày đỏ, tay nét mực + bàn tay tròn r=14).
 * Phong cách vẽ tay chỉ thêm: nét sôi (filter của bộ máy), tô lem, khớp để diễn.
 * Thêm so với bản thử B: chu kỳ đi bộ thật (chân trụ đứng yên, nhấc chân theo cung, nhún 2 lần/chu kỳ, lạch bạch, co giãn giữ thể tích,
 * tay vung ngược chân), tay ống cao su (độ dài cố định, gần thì cong, xa thì duỗi), bàn tay có tư thế cầm/chỉ/xoè,
 * ba lô xoay theo góc con lắc, smear là hình thân biến dạng thật.
 * Gọi: VT.wob({x, y, s, ...}) → chuỗi SVG. (x, y) là điểm giữa hai bàn chân trên khung; s = 1 cao ~400px.
 */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f;
  var INK = "#1f2326", SEA = "#5a9fb8", SEA_COLD = "#9cc8dc", LAND = "#efd9a2", EYE = "#fffdf6", CHEEK = "#e9806e",
    PACK = "#b8743a", PACK_DARK = "#8e5527", MAT = "#d9543c", SHOE = "#d9543c", FROST = "#e8f6ff";
  var SW = 7, CX = 200, CY = 178, R = 122;
  VT.WOB_COLORS = { ink: INK, sea: SEA, seaCold: SEA_COLD, land: LAND, eye: EYE, cheek: CHEEK, pack: PACK, packDark: PACK_DARK, mat: MAT, shoe: SHOE, frost: FROST };

  // ---------- thân: điểm của đường tròn méo (giống tao_wob.py) ----------
  var BODY_PTS = [];
  (function () {
    for (var i = 0; i < 48; i++) {
      var t = 2 * Math.PI * i / 48;
      var rr = R + 5.5 * Math.sin(3 * t) + 3.5 * Math.sin(5 * t + 1.3) + 2 * Math.sin(2 * t + 0.4);
      BODY_PTS.push([CX + rr * Math.cos(t), CY + rr * Math.sin(t) * 0.96]);
    }
  })();
  var BODY = VT.smooth(BODY_PTS, true);
  VT.WOB_BODY = BODY;
  /** Thân smear: phía sau hướng chuyển động kéo dài thành giọt (hình biến dạng thật, không phải bóng mờ). v: px theo trục x cục bộ (+ = đi sang phải). */
  function smearBody(v) {
    var sg = v > 0 ? 1 : -1, A = Math.abs(v);
    var pts = BODY_PTS.map(function (p) {
      var rel = (p[0] - CX) / R, hy = 1 - Math.min(1, Math.abs(p[1] - CY) / 125);
      var x = p[0], y = p[1];
      if (rel * sg < 0) { x -= sg * A * Math.pow(Math.abs(rel), 0.7) * (0.35 + 0.65 * hy); y = CY + (y - CY) * (1 - 0.25 * Math.abs(rel) * Math.min(1, A / 200)); }
      else x += sg * A * 0.08 * rel * sg;
      return [x, y];
    });
    return VT.smooth(pts, true);
  }
  var LANDS = [
    "M 92 120 C 110 92 150 88 168 104 C 182 118 170 140 186 152 C 198 162 190 186 168 188 C 146 190 140 172 122 176 C 100 180 84 160 88 142 Z",
    "M 236 196 C 252 182 284 186 300 204 C 316 222 312 252 292 266 C 276 278 258 268 252 252 C 246 236 226 228 228 212 Z",
    "M 232 82 C 246 74 268 78 272 92 C 276 104 262 112 250 110 C 238 108 226 94 232 82 Z",
    "M 150 262 C 162 254 182 258 186 270 C 190 282 176 292 162 290 C 148 288 140 272 150 262 Z",
  ];

  function backpack(angle) {
    var inner = '<rect x="255" y="100" width="98" height="160" rx="30" fill="' + PACK + '"/>' +
      '<rect x="250" y="96" width="98" height="160" rx="30" fill="none" stroke="' + INK + '" stroke-width="' + SW + '"/>' +
      '<rect x="300" y="150" width="44" height="58" rx="12" fill="' + PACK_DARK + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="266" y="70" width="96" height="36" rx="18" fill="' + MAT + '"/>' +
      '<rect x="262" y="66" width="96" height="36" rx="18" fill="none" stroke="' + INK + '" stroke-width="' + SW + '"/>' +
      VT.line("M 282 70 L 282 98", 4) + VT.line("M 336 70 L 336 98", 4);
    return angle ? VT.g("rotate(" + f(angle) + " 290 110)", inner) : inner;
  }

  function body(o, path) {
    var id = VT.uid("wc"), sea = o.cold ? SEA_COLD : SEA, out = [];
    out.push('<clipPath id="' + id + '"><path d="' + path + '"/></clipPath>');
    out.push('<path d="' + path + '" fill="' + sea + '" transform="translate(4 3)"/>');
    out.push('<g clip-path="url(#' + id + ')">');
    LANDS.forEach(function (d) { out.push('<path d="' + d + '" fill="' + LAND + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>'); });
    out.push(VT.line("M 200 46 C 130 138 130 218 200 310", 2.5, INK, 0.28));
    out.push(VT.line("M 200 46 C 270 138 270 218 200 310", 2.5, INK, 0.28));
    out.push(VT.line("M 68 188 C 160 218 240 218 332 188", 2.5, INK, 0.28));
    if (o.frost) out.push('<path d="M 60 90 C 120 40 280 40 340 90 L 340 60 L 60 60 Z" fill="' + FROST + '" opacity="0.9"/>');
    out.push(VT.line("M 112 112 C 122 96 136 86 152 80", 9, "#ffffff", 0.55));
    out.push("</g>");
    out.push('<path d="' + path + '" fill="none" stroke="' + INK + '" stroke-width="' + SW + '" stroke-linejoin="round"/>');
    out.push(VT.line("M 300 96 C 286 130 284 168 300 206", 10, PACK_DARK));
    out.push(VT.line("M 300 96 C 286 130 284 168 300 206", 3, INK, 0.6));
    if (o.frost) [120, 160, 205, 250].forEach(function (x) {
      out.push('<path d="M ' + (x - 7) + ' 72 L ' + x + ' 96 L ' + (x + 7) + ' 72 Z" fill="' + FROST + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>');
    });
    return out.join("");
  }

  // ---------- mắt ----------
  function lid(cx, cy, rx, ry, k, fill) {
    if (k <= 0.02) return "";
    if (k >= 0.97) return '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx + 3) + '" ry="' + f(ry + 3) + '" fill="' + fill + '"/>' +
      VT.line("M " + f(cx - rx) + " " + f(cy + 2) + " Q " + f(cx) + " " + f(cy + ry * 0.55) + " " + f(cx + rx) + " " + f(cy + 2), 6);
    var ly = cy - ry + k * 2 * ry, dy = (ly - cy) / ry, dx = rx * Math.sqrt(Math.max(0, 1 - dy * dy));
    var d = "M " + f(cx - dx) + " " + f(ly) + " A " + f(rx + 1) + " " + f(ry + 1) + " 0 " + (ly > cy ? 1 : 0) + " 1 " + f(cx + dx) + " " + f(ly) + " Z";
    return '<path d="' + d + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
      VT.line("M " + f(cx - dx - 2) + " " + f(ly) + " L " + f(cx + dx + 2) + " " + f(ly), 7);
  }
  function eyes(o, sea, shift) {
    var lx = 160 + shift, rx = 238 + shift, y = 156, kind = o.eyes || "open", px = o.px || 0, py = o.py || 0, k = o.lid || 0, out = [];
    if (kind === "squint") {
      out.push(VT.line("M " + (lx - 22) + " " + (y - 10) + " L " + (lx + 14) + " " + (y + 2) + " L " + (lx - 22) + " " + (y + 14), 7));
      out.push(VT.line("M " + (rx + 22) + " " + (y - 10) + " L " + (rx - 14) + " " + (y + 2) + " L " + (rx + 22) + " " + (y + 14), 7));
      return out.join("");
    }
    if (kind === "happy") {
      [lx, rx].forEach(function (x) { out.push(VT.line("M " + (x - 20) + " " + (y + 8) + " Q " + x + " " + (y - 24) + " " + (x + 20) + " " + (y + 8), 7)); });
      return out.join("");
    }
    if (kind === "closed") {
      [lx, rx].forEach(function (x) { out.push(VT.line("M " + (x - 22) + " " + (y + 2) + " Q " + x + " " + (y + 14) + " " + (x + 22) + " " + (y + 2), 7)); });
      return out.join("");
    }
    var E = kind === "wide" ? { rx: 31, ry: 37, dy: -4, pr: 6, hl: false } : { rx: 25, ry: 31, dy: 0, pr: 13, hl: true };
    [[lx, -1], [rx, 1]].forEach(function (p) {
      var x = p[0] + (kind === "wide" ? p[1] * 4 : 0), cy = y + E.dy;
      out.push('<ellipse cx="' + x + '" cy="' + cy + '" rx="' + E.rx + '" ry="' + E.ry + '" fill="' + EYE + '" stroke="' + INK + '" stroke-width="5"/>');
      var qx = px, qy = py;
      if (kind === "cross") { qx = -p[1] * 11; qy = -14; }
      var pcx = x + (kind === "wide" ? 0 : 3) + qx, pcy = cy + (kind === "wide" ? 2 : 4) + qy;
      out.push(VT.dot(pcx, pcy, kind === "cross" ? 11 : E.pr));
      if (E.hl) out.push(VT.dot(pcx + 5, pcy - 6, kind === "cross" ? 4 : 5, "#ffffff"));
      out.push(lid(x, cy, E.rx, E.ry, k, sea));
    });
    return out.join("");
  }
  function lashes(o, shift) {
    if (!o.lashes) return "";
    var pop = o.lashes, ice = o.lashIce, out = [];
    [160 + shift, 238 + shift].forEach(function (cx) {
      [-128, -90, -52].forEach(function (deg, i) {
        var a = deg * Math.PI / 180, bx = cx + 25 * Math.cos(a), by = 156 + 31 * Math.sin(a), L = (i === 1 ? 26 : 22) * pop;
        var ex = bx + Math.cos(a) * L, ey = by + Math.sin(a) * L;
        var d = "M " + f(bx) + " " + f(by) + " L " + f(ex) + " " + f(ey);
        if (ice) {
          out.push(VT.line(d, 11)); out.push(VT.line(d, 6, "#cfefff"));
          out.push('<path d="M ' + f(ex - 6) + " " + f(ey) + " L " + f(ex) + " " + f(ey - 9) + " L " + f(ex + 6) + " " + f(ey) + " L " + f(ex) + " " + f(ey + 7) +
            ' Z" fill="#ffffff" stroke="' + INK + '" stroke-width="2.5"/>');
        } else out.push(VT.line(d, 5));
      });
    });
    return out.join("");
  }
  function brows(kind, shift) {
    if (!kind) return "";
    var L = { up: ["M 134 104 Q 160 86 186 102", "M 212 102 Q 238 86 264 104"],
      flat: ["M 136 112 L 184 112", "M 214 112 L 262 112"],
      worried: ["M 136 104 Q 160 108 184 118", "M 214 118 Q 238 108 262 104"],
      skeptic: ["M 136 114 L 184 112", "M 214 102 Q 238 86 264 98"],
      down: ["M 138 104 L 184 118", "M 214 118 L 260 104"] }[kind];
    if (!L) return "";
    return VT.g(shift ? "translate(" + shift + " 0)" : "", VT.line(L[0], 6) + VT.line(L[1], 6));
  }

  // ---------- miệng: 9 hình khẩu hình (Rhubarb A–H, X) + biểu cảm ----------
  function mouth(m) {
    var T = '<path d="M 186 246 C 194 254 206 254 214 246 C 208 240 192 240 186 246 Z" fill="' + CHEEK + '"/>';
    switch (m) {
      case "A": return VT.line("M 176 230 C 190 233 210 233 224 230", 7) + VT.line("M 172 225 L 178 231", 4) + VT.line("M 228 225 L 222 231", 4);
      case "B": return '<path d="M 176 226 C 186 244 214 244 224 226 C 210 230 190 230 176 226 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M 182 229 C 194 233 206 233 218 229 L 216 235 C 204 238 196 238 184 235 Z" fill="' + EYE + '"/>';
      case "C": return '<path d="M 174 224 C 180 252 220 252 226 224 C 210 228 190 228 174 224 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' + T;
      case "D": return '<path d="M 170 220 C 172 266 228 266 230 220 C 212 226 188 226 170 220 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M 182 252 C 192 262 208 262 218 252 C 210 244 190 244 182 252 Z" fill="' + CHEEK + '"/>';
      case "E": return '<ellipse cx="200" cy="234" rx="17" ry="13" fill="' + INK + '"/>';
      case "F": return '<ellipse cx="200" cy="234" rx="10" ry="12" fill="' + INK + '" stroke="' + INK + '" stroke-width="4"/>';
      case "G": return '<path d="M 178 230 C 190 240 210 240 222 230 Z" fill="' + INK + '"/>' + '<rect x="186" y="224" width="28" height="9" rx="3" fill="' + EYE + '" stroke="' + INK + '" stroke-width="3"/>';
      case "H": return '<path d="M 176 224 C 182 250 218 250 224 224 C 210 228 190 228 176 224 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M 188 230 C 194 224 206 224 212 230 C 206 236 194 236 188 230 Z" fill="' + CHEEK + '"/>';
      case "smile": return '<path d="M 160 214 C 172 258 228 258 240 214 Z" fill="' + INK + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
        '<path d="M 176 236 C 190 252 212 252 226 236 C 214 228 188 228 176 236 Z" fill="' + CHEEK + '"/>';
      case "chatter": case "chatter2":
        var z = m === "chatter" ? "M 162 227 L 172 218 L 182 236 L 192 218 L 202 236 L 212 218 L 222 236 L 232 218 L 238 227" : "M 162 227 L 172 236 L 182 218 L 192 236 L 202 218 L 212 236 L 222 218 L 232 236 L 238 227";
        return '<rect x="160" y="212" width="80" height="30" rx="10" fill="' + EYE + '" stroke="' + INK + '" stroke-width="6"/>' + VT.line(z, 4);
      case "o": return '<ellipse cx="200" cy="234" rx="17" ry="24" fill="' + INK + '"/>';
      case "oSmall": return '<ellipse cx="200" cy="232" rx="9" ry="11" fill="' + INK + '"/>';
      case "flat": return VT.line("M 174 230 C 190 228 212 232 228 229", 6);
      case "smirk": return VT.line("M 176 222 C 196 240 222 236 236 214", 6);
      case "frown": return VT.line("M 176 238 C 190 222 212 222 226 238", 6);
      case "wobbly": return VT.line("M 170 232 C 180 222 188 240 198 230 C 208 220 216 240 230 228", 6);
      case "content": return VT.line("M 180 226 C 192 236 210 236 222 226", 6);
      case "sip": return VT.line("M 186 230 C 194 226 206 226 214 230", 6) + VT.dot(200, 236, 5);
      default: return VT.line("M 176 228 C 190 236 210 236 224 228", 6); // X: nghỉ, khép
    }
  }

  // ---------- tay ống cao su + bàn tay ----------
  var SH = { l: [88, 212], r: [312, 212] };
  VT.WOB_SHOULDER = SH;
  var ARM_LEN = 128;
  /** Tư thế tay đặt sẵn: [x, y] bàn tay trong hệ Wob (+ tư thế bàn tay). Hệ Wob: khung 400×400, chân y≈392, mặt ở giữa x=200. */
  VT.ARM = {
    rest: { l: [62, 300], r: [338, 300] },
    up: { l: [112, 36], r: [288, 36], hand: "xoe" },
    low: { l: [126, 300], r: [274, 300] },
    hug: { l: [184, 248], r: [216, 248] },
    cup: { l: [166, 268], r: [234, 268], hand: "nam" },
    point: { l: [62, 300], r: [400, 150], handR: "chi" },
    pointL: { l: [0, 160], r: [338, 300], handL: "chi" },
    shrug: { l: [34, 160], r: [366, 160], hand: "xoe" },
    shock: { l: [22, 152], r: [378, 152], hand: "xoe" },
    offer: { l: [62, 300], r: [404, 236], handR: "nam" },
    shoulder: { l: [62, 300], r: [292, 54], handR: "nam" },
    shoulderShrug: { l: [26, 168], r: [292, 54], handL: "xoe", handR: "nam" },
  };
  function armPath(side, spec) {
    var s = SH[side], hx = spec[0], hy = spec[1];
    var dx = hx - s[0], dy = hy - s[1], d = Math.sqrt(dx * dx + dy * dy) || 1, cx, cy;
    if (spec.length > 2 && spec[2] != null) { // tương thích bản thử: độ cong cho sẵn
      cx = (s[0] + hx) / 2 - dy / d * spec[2]; cy = (s[1] + hy) / 2 + dx / d * spec[2];
    } else { // ống cao su: dài cố định, gần thì cong ra ngoài/xuống, xa thì duỗi thẳng
      var bend = d < ARM_LEN ? Math.sqrt(ARM_LEN * ARM_LEN - d * d) * 0.55 : 0;
      var nx = -dy / d, ny = dx / d, sideSign = side === "l" ? -1 : 1;
      if (nx * sideSign + 0.6 * ny < 0) { nx = -nx; ny = -ny; }
      cx = (s[0] + hx) / 2 + nx * bend; cy = (s[1] + hy) / 2 + ny * bend;
    }
    return { d: "M " + f(s[0]) + " " + f(s[1]) + " Q " + f(cx) + " " + f(cy) + " " + f(hx) + " " + f(hy), hx: hx, hy: hy, ang: Math.atan2(hy - cy, hx - cx) };
  }
  /** Bàn tay: "tron" (đúng gốc: tròn r=14), "nam" (nắm/cầm: thêm ngón cái ôm vật), "chi" (ngón trỏ), "xoe" (xoè 3 ngón + cái). */
  function hand(a, pose, side) {
    var x = a.hx, y = a.hy, an = a.ang, ca = Math.cos(an), sa = Math.sin(an), sg = side === "l" ? -1 : 1, out = VT.dot(x, y, 14);
    if (pose === "nam") {
      var tx = x + ca * 6 - sa * 12 * sg, ty = y + sa * 6 + ca * 12 * sg;
      out += '<ellipse cx="' + f(tx) + '" cy="' + f(ty) + '" rx="9" ry="6" transform="rotate(' + f(an * 57.3) + " " + f(tx) + " " + f(ty) + ')" fill="' + INK + '"/>';
      out += VT.line("M " + f(x - sa * 9 + ca * 4) + " " + f(y + ca * 9 + sa * 4) + " L " + f(x + sa * 9 + ca * 4) + " " + f(y - ca * 9 + sa * 4), 2.5, "#5d6a72", 0.9);
    } else if (pose === "chi") {
      out += VT.line("M " + f(x) + " " + f(y) + " L " + f(x + ca * 30) + " " + f(y + sa * 30), 10);
    } else if (pose === "xoe") {
      [-0.7, 0, 0.7].forEach(function (k) { var aa = an + k; out += VT.line("M " + f(x) + " " + f(y) + " L " + f(x + Math.cos(aa) * 22) + " " + f(y + Math.sin(aa) * 22), 9); });
      var ta = an - 1.5 * sg; out += VT.line("M " + f(x) + " " + f(y) + " L " + f(x + Math.cos(ta) * 18) + " " + f(y + Math.sin(ta) * 18), 9);
    }
    return out;
  }

  // ---------- chân: đứng, đi bộ (chu kỳ thật), run, dạng, co, nhón ----------
  function legs(o, bob) {
    var mode = o.legs || "stand", hy = 290 + bob, out = [], fl, fr, rl = 0, rr = 0, knee = 0;
    if (mode === "walk") {
      var S = o.stride == null ? 40 : o.stride, H = o.lift == null ? 26 : o.lift, p = o.phase || 0;
      var foot = function (ph, base) {
        var q = ((ph % 1) + 1) % 1;
        if (q < 0.5) { var k = q / 0.5; return [base + S / 2 - S * k, 385, k > 0.8 ? -(k - 0.8) * 60 : 0]; } // trụ: đứng yên trên đất, cuối thì nhón gót
        var k2 = (q - 0.5) / 0.5, e = VT.ease.io(k2);
        return [base - S / 2 + S * e, 385 - H * Math.sin(Math.PI * k2), -18 * Math.sin(Math.PI * k2)]; // vung: nhấc theo cung, mũi giày hếch
      };
      var a = foot(p, 166), b = foot(p + 0.5, 234);
      fl = [a[0], a[1]]; fr = [b[0], b[1]]; rl = a[2]; rr = b[2];
    } else if (mode === "shiver") { fl = [166, 386]; fr = [236, 386]; knee = 18; }
    else if (mode === "apart") { fl = [146, 380]; fr = [254, 380]; }
    else if (mode === "tuck") { fl = [176, 352]; fr = [224, 352]; rl = -12; rr = 12; }
    else if (mode === "tiptoe") { fl = [160, 378]; fr = [240, 378]; rl = -20; rr = -20; }
    else { fl = [160, 385]; fr = [240, 385]; }
    out.push(VT.line("M 174 " + f(hy) + " Q " + f((174 + fl[0]) / 2 + knee - 4) + " " + f((hy + fl[1]) / 2) + " " + f(fl[0] + 4) + " " + f(fl[1] - 6), 15));
    out.push(VT.line("M 226 " + f(hy) + " Q " + f((226 + fr[0]) / 2 - knee + 4) + " " + f((hy + fr[1]) / 2) + " " + f(fr[0] - 4) + " " + f(fr[1] - 6), 15));
    out.push(VT.g(rl ? "rotate(" + f(rl) + " " + f(fl[0]) + " " + f(fl[1]) + ")" : "", VT.ell(fl[0] - 4, fl[1], 28, 12, SHOE, 5)));
    out.push(VT.g(rr ? "rotate(" + f(rr) + " " + f(fr[0]) + " " + f(fr[1]) + ")" : "", VT.ell(fr[0] + 4, fr[1], 28, 12, SHOE, 5)));
    return out.join("");
  }

  // ---------- đồ mặc ----------
  function beanie() {
    return VT.shape("M 118 86 C 118 24 282 24 282 86 Z", MAT, { sw: 6 }) +
      VT.line("M 150 40 L 156 82", 3, INK, 0.5) + VT.line("M 200 30 L 200 82", 3, INK, 0.5) + VT.line("M 250 40 L 244 82", 3, INK, 0.5) +
      VT.shape("M 104 104 C 140 76 260 76 296 104 L 292 80 C 256 56 144 56 108 80 Z", "#EFE3C8", { sw: 6 }) +
      VT.ell(200, 26, 20, 18, "#EFE3C8", 6);
  }
  function scarf(t) {
    var w = t != null ? Math.sin(Math.round(t * 12) * 1.3) * 4 : 0;
    return VT.shape("M 112 258 C 156 282 244 282 290 256 L 294 286 C 246 312 154 312 108 288 Z", MAT, { sw: 6 }) +
      VT.line("M 150 272 L 146 302", 4, "#EFE3C8") + VT.line("M 250 272 L 254 302", 4, "#EFE3C8") +
      VT.shape("M 134 292 C 128 322 " + f(118 + w) + " 346 " + f(106 + w) + " 372 L " + f(136 + w) + " 380 C 146 352 154 324 162 298 Z", MAT, { sw: 6 }) +
      VT.line("M " + f(112 + w) + " 378 L " + f(108 + w) + " 392", 4) + VT.line("M " + f(122 + w) + " 380 L " + f(120 + w) + " 394", 4) + VT.line("M " + f(132 + w) + " 382 L " + f(132 + w) + " 396", 4);
  }
  function blanket() {
    var d = "M 40 334 C 18 200 58 26 200 20 C 342 26 384 200 362 334 C 300 356 102 356 40 334 Z " +
      "M 94 182 A 106 96 0 1 0 306 182 A 106 96 0 1 0 94 182 Z";
    var st = "#F2C9A8";
    return VT.shape(d, "#C9603A", { sw: 7, rule: "evenodd" }) +
      VT.line("M 62 150 L 56 318", 5, st, 0.8) + VT.line("M 82 112 L 78 326", 5, st, 0.8) +
      VT.line("M 338 150 L 344 318", 5, st, 0.8) + VT.line("M 318 112 L 322 326", 5, st, 0.8) +
      VT.line("M 44 270 L 98 274", 5, st, 0.8) + VT.line("M 302 274 L 358 270", 5, st, 0.8) +
      VT.line("M 130 40 C 170 30 230 30 270 40", 5, st, 0.8);
  }
  function snowhat() {
    var pts = [[96, 100], [104, 62], [146, 34], [200, 24], [252, 32], [296, 60], [306, 100], [262, 92], [230, 102], [196, 92], [160, 102], [126, 92]];
    return VT.shape(VT.smooth(pts, true), C.snow, { sw: 6, ox: 3, oy: 3 }) + VT.line("M 140 60 C 160 50 180 48 196 50", 4, C.snowShade);
  }

  // ---------- ma trận (để đổi toạ độ khung ↔ hệ Wob) ----------
  function mul(m, n) { return [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]]; }
  function T(x, y) { return [1, 0, 0, 1, x, y]; }
  function Sc(x, y) { return [x, 0, 0, y, 0, 0]; }
  function Ro(deg, cx, cy) { var a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return mul(mul(T(cx, cy), [c, s, -s, c, 0, 0]), T(-cx, -cy)); }
  function inv(m) { var det = m[0] * m[3] - m[1] * m[2]; return [m[3] / det, -m[1] / det, -m[2] / det, m[0] / det, (m[2] * m[5] - m[3] * m[4]) / det, (m[1] * m[4] - m[0] * m[5]) / det]; }
  function ap(m, x, y) { return [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]; }

  /** Tính các đại lượng diễn (đi bộ tự nhún, lắc, co giãn) – dùng chung cho vẽ và đổi toạ độ. */
  function pose(o) {
    var bob = o.bob || 0, lean = o.lean || 0, sq = o.sq || 1;
    if (o.legs === "walk" && o.autoWalk !== false) {
      var p = (o.phase || 0) * 2 * Math.PI, A = o.walkBob == null ? 12 : o.walkBob;
      bob += -A * Math.pow(Math.sin(p), 2);             // thấp lúc chạm chân, cao lúc chân lướt qua
      lean += (o.waddle == null ? 7 : o.waddle) * Math.sin(p); // lạch bạch sang bên chân trụ
      sq *= 1 - 0.05 * Math.cos(2 * p);                 // nén khi chạm, giãn khi nhấc
    }
    var sx = o.sxRaw || 1 / Math.sqrt(sq);
    return { bob: bob, lean: lean, sq: sq, sx: sx };
  }
  function matrices(o, P) {
    var s = o.s || 1, fl = o.flip || 1;
    var root = mul(mul(T(o.x, o.y), Sc(s * fl, s)), T(-200, -392));
    var up = mul(mul(mul(mul(T(0, P.bob), Ro(P.lean, 200, 290)), T(200, 392)), Sc(P.sx, P.sq)), T(-200, -392));
    return { root: root, up: up, all: mul(root, up) };
  }
  /** Toạ độ khung của điểm (lx, ly) trên phần thân trên của Wob (tính cả nhún, nghiêng, co giãn). */
  VT.wobPt = function (o, lx, ly) { return ap(matrices(o, pose(o)).all, lx, ly); };
  /** Ngược lại: điểm khung (X, Y) → hệ Wob (để đặt bàn tay đúng vào một vật trong cảnh: armR: VT.wobLocal(o, X, Y)). */
  VT.wobLocal = function (o, X, Y) { return ap(inv(matrices(o, pose(o)).all), X, Y); };

  /** Vẽ Wob. Tham số:
   *  x, y, s, flip (1 nhìn phải / -1 lật), lean (độ), sq (co giãn dọc; ngang tự = 1/√sq), bob (px, âm = nhấc lên), t (thời gian, cho run/khăn)
   *  eyes: open|wide|cross|squint|happy|closed · px, py con ngươi · lid 0..1 · brows up|flat|worried|skeptic|down · lashes 0..1.4 · lashIce
   *  mouth: A–H|X|smile|chatter|chatter2|o|oSmall|flat|smirk|frown|wobbly|content|sip
   *  arms: tên trong VT.ARM · armL/armR: [x, y] bàn tay trong hệ Wob (ống cao su tự cong), hoặc [x, y, độ cong]
   *  handL/handR: tron|nam|chi|xoe · propBack (sau thân) · prop (giữa tay và bàn tay: bàn tay đè lên vật = đang cầm) · propFront
   *  legs: stand|walk|shiver|apart|tuck|tiptoe · phase, stride (đi bộ, lấy từ VT.buoc) · lift · autoWalk=false để tự điều khiển nhún
   *  pack: góc ba lô (độ, từ VT.conLac) · smear: px (thân kéo thành giọt theo hướng ngược chuyển động)
   *  cold, frost, beanie, scarf, blanket, snowhat · shiver (px rung) · marks: shiver|shock|sweat */
  VT.wob = function (o) {
    var P = pose(o), sea = o.cold ? SEA_COLD : SEA;
    var jx = 0, jy = 0;
    if (o.shiver) { var n = Math.round((o.t || 0) * 12); jx = (VT.hash(n * 5.3) - 0.5) * 2 * o.shiver; jy = (VT.hash(n * 2.1 + 4) - 0.5) * o.shiver; }
    var preset = VT.ARM[o.arms || "rest"] || VT.ARM.rest;
    var specL = (o.armL || preset.l).slice(), specR = (o.armR || preset.r).slice();
    if (o.legs === "walk" && !o.armL && !o.arms) specL = [specL[0] - 16 * Math.sin((o.phase || 0) * 2 * Math.PI), specL[1] - 6];
    if (o.legs === "walk" && !o.armR && !o.arms) specR = [specR[0] - 16 * Math.sin((o.phase || 0) * 2 * Math.PI), specR[1] - 6];
    var aL = armPath("l", specL), aR = armPath("r", specR);
    var hL = o.handL || preset.handL || preset.hand || "tron", hR = o.handR || preset.handR || preset.hand || "tron";
    var sm = o.smear || 0, path = sm ? smearBody(sm) : BODY, fs = sm ? sm * 0.12 : 0;
    var up = [];
    up.push(backpack(o.pack || 0));
    if (o.propBack) up.push(o.propBack);
    up.push(body(o, path));
    if (o.scarf) up.push(scarf(o.t));
    if (o.blanket) up.push(blanket());
    if (!o.cold && !o.blanket) up.push('<ellipse cx="' + (124 + fs) + '" cy="204" rx="16" ry="10" fill="' + CHEEK + '" opacity="0.55"/><ellipse cx="' + (276 + fs) + '" cy="204" rx="16" ry="10" fill="' + CHEEK + '" opacity="0.55"/>');
    up.push(eyes(o, sea, fs));
    up.push(lashes(o, fs));
    up.push(brows(o.brows, fs));
    up.push(fs ? VT.g("translate(" + f(fs) + " 0)", mouth(o.mouth || "X")) : mouth(o.mouth || "X"));
    if (o.beanie) up.push(beanie());
    if (o.snowhat) up.push(snowhat());
    up.push(VT.line(aL.d, 13) + VT.line(aR.d, 13));
    if (o.prop) up.push(o.prop);
    up.push(hand(aL, hL, "l") + hand(aR, hR, "r"));
    if (o.propFront) up.push(o.propFront);
    var upTr = "translate(0 " + f(P.bob) + ") rotate(" + f(P.lean) + " 200 290) translate(200 392) scale(" + Math.round(P.sx * 1000) / 1000 + " " + Math.round(P.sq * 1000) / 1000 + ") translate(-200 -392)";
    var upper = VT.g(upTr, up.join(""));
    var trail = "";
    if (sm) { // vệt tốc độ sau thân
      var sg = sm > 0 ? 1 : -1;
      for (var j = 0; j < 5; j++) { var yy = 90 + j * 45, x0 = sg > 0 ? 60 - Math.abs(sm) * 0.5 : 340 + Math.abs(sm) * 0.5; trail += VT.line("M " + f(x0) + " " + yy + " L " + f(x0 - sm * (0.8 + VT.hash(j) * 0.7)) + " " + yy, 5, INK, 0.8); }
    }
    var marks = "";
    if (o.marks === "shiver") [[24, 150, 1], [376, 150, -1], [30, 240, 1], [370, 240, -1]].forEach(function (m) {
      marks += VT.line("M " + m[0] + " " + m[1] + " L " + (m[0] + 14 * m[2]) + " " + (m[1] + 18) + " L " + m[0] + " " + (m[1] + 36), 5);
    });
    if (o.marks === "shock") ["M 104 50 L 84 16", "M 200 28 L 200 -6", "M 296 50 L 316 16", "M 58 92 L 24 76", "M 342 92 L 376 76"].forEach(function (d) { marks += VT.line(d, 7); });
    if (o.marks === "sweat") marks += VT.shape("M 322 92 C 314 108 310 118 314 126 C 318 134 330 134 334 126 C 338 118 332 108 322 92 Z", "#8fd0ea", { sw: 4 });
    var inner = trail + legs(o, P.bob) + upper + marks;
    var s = o.s || 1, fl = o.flip || 1;
    var tr = "translate(" + f(o.x + jx) + " " + f(o.y + jy) + ") scale(" + Math.round(s * fl * 1000) / 1000 + " " + Math.round(s * 1000) / 1000 + ") translate(-200 -392)";
    return VT.g(tr, inner);
  };
})();
