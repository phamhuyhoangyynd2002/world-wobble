/* Wob tách bộ phận, vẽ lại đúng toạ độ của templates/_shared/wob/nguon/tao_wob.py (không vẽ kiểu khác).
 * Thêm khớp: mí (chớp, sụp), con ngươi nhìn quanh, mắt lác, lông mi (bật, đóng băng), lông mày,
 * bộ miệng 9 hình A–H/X + miệng biểu cảm, tay 2 đốt nối tới điểm cầm, chân đi bộ, đồ mặc (khăn, mũ len, chăn, mũ tuyết).
 * Gọi: WWB.wob({x, y, s, ...}) → chuỗi SVG; (x, y) là điểm giữa hai bàn chân trên khung 1920×1080.
 */
(function () {
  var B = window.WWB, C = B.C, f = B.f;
  var INK = "#1f2326", SEA = "#5a9fb8", SEA_COLD = "#9cc8dc", LAND = "#efd9a2", EYE = "#fffdf6", CHEEK = "#e9806e",
    PACK = "#b8743a", PACK_DARK = "#8e5527", MAT = "#d9543c", SHOE = "#d9543c", FROST = "#e8f6ff";
  var SW = 7, CX = 200, CY = 178, R = 122;

  function wobblyCircle(cx, cy, r, n, phase) {
    var pts = [];
    for (var i = 0; i < n; i++) {
      var t = 2 * Math.PI * i / n;
      var rr = r + 5.5 * Math.sin(3 * t + phase) + 3.5 * Math.sin(5 * t + 1.3 + phase) + 2 * Math.sin(2 * t + 0.4);
      pts.push([cx + rr * Math.cos(t), cy + rr * Math.sin(t) * 0.96]);
    }
    return B.smooth(pts, true);
  }
  var BODY = wobblyCircle(CX, CY, R, 48, 0);
  B.WOB_BODY = BODY;
  var LANDS = [
    "M 92 120 C 110 92 150 88 168 104 C 182 118 170 140 186 152 C 198 162 190 186 168 188 C 146 190 140 172 122 176 C 100 180 84 160 88 142 Z",
    "M 236 196 C 252 182 284 186 300 204 C 316 222 312 252 292 266 C 276 278 258 268 252 252 C 246 236 226 228 228 212 Z",
    "M 232 82 C 246 74 268 78 272 92 C 276 104 262 112 250 110 C 238 108 226 94 232 82 Z",
    "M 150 262 C 162 254 182 258 186 270 C 190 282 176 292 162 290 C 148 288 140 272 150 262 Z",
  ];

  function backpack() {
    return '<rect x="255" y="100" width="98" height="160" rx="30" fill="' + PACK + '"/>' +
      '<rect x="250" y="96" width="98" height="160" rx="30" fill="none" stroke="' + INK + '" stroke-width="' + SW + '"/>' +
      '<rect x="300" y="150" width="44" height="58" rx="12" fill="' + PACK_DARK + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="266" y="70" width="96" height="36" rx="18" fill="' + MAT + '"/>' +
      '<rect x="262" y="66" width="96" height="36" rx="18" fill="none" stroke="' + INK + '" stroke-width="' + SW + '"/>' +
      B.line("M 282 70 L 282 98", 4) + B.line("M 336 70 L 336 98", 4);
  }

  function body(cold, frost) {
    var id = B.uid("wc"), sea = cold ? SEA_COLD : SEA, o = [];
    o.push('<clipPath id="' + id + '"><path d="' + BODY + '"/></clipPath>');
    o.push('<path d="' + BODY + '" fill="' + sea + '" transform="translate(4 3)"/>');
    o.push('<g clip-path="url(#' + id + ')">');
    LANDS.forEach(function (d) { o.push('<path d="' + d + '" fill="' + LAND + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>'); });
    o.push(B.line("M 200 46 C 130 138 130 218 200 310", 2.5, INK, 0.28));
    o.push(B.line("M 200 46 C 270 138 270 218 200 310", 2.5, INK, 0.28));
    o.push(B.line("M 68 188 C 160 218 240 218 332 188", 2.5, INK, 0.28));
    if (frost) o.push('<path d="M 60 90 C 120 40 280 40 340 90 L 340 60 L 60 60 Z" fill="' + FROST + '" opacity="0.9"/>');
    o.push(B.line("M 112 112 C 122 96 136 86 152 80", 9, "#ffffff", 0.55));
    o.push("</g>");
    o.push('<path d="' + BODY + '" fill="none" stroke="' + INK + '" stroke-width="' + SW + '" stroke-linejoin="round"/>');
    o.push(B.line("M 300 96 C 286 130 284 168 300 206", 10, PACK_DARK));
    o.push(B.line("M 300 96 C 286 130 284 168 300 206", 3, INK, 0.6));
    if (frost) [120, 160, 205, 250].forEach(function (x) {
      o.push('<path d="M ' + (x - 7) + ' 72 L ' + x + ' 96 L ' + (x + 7) + ' 72 Z" fill="' + FROST + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>');
    });
    return o.join("");
  }

  // ---------- mắt ----------
  function lid(cx, cy, rx, ry, k, fill) {
    if (k <= 0.02) return "";
    if (k >= 0.97) return '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx + 3) + '" ry="' + f(ry + 3) + '" fill="' + fill + '"/>' +
      B.line("M " + f(cx - rx) + " " + f(cy + 2) + " Q " + f(cx) + " " + f(cy + ry * 0.55) + " " + f(cx + rx) + " " + f(cy + 2), 6);
    var ly = cy - ry + k * 2 * ry, dy = (ly - cy) / ry, dx = rx * Math.sqrt(Math.max(0, 1 - dy * dy));
    var d = "M " + f(cx - dx) + " " + f(ly) + " A " + f(rx + 1) + " " + f(ry + 1) + " 0 " + (ly > cy ? 1 : 0) + " 1 " + f(cx + dx) + " " + f(ly) + " Z";
    return '<path d="' + d + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
      B.line("M " + f(cx - dx - 2) + " " + f(ly) + " L " + f(cx + dx + 2) + " " + f(ly), 7);
  }
  function eyes(o, sea) {
    var lx = 160, rx = 238, y = 156, kind = o.eyes || "open", px = o.px || 0, py = o.py || 0, k = o.lid || 0, out = [];
    if (kind === "squint") {
      out.push(B.line("M " + (lx - 22) + " " + (y - 10) + " L " + (lx + 14) + " " + (y + 2) + " L " + (lx - 22) + " " + (y + 14), 7));
      out.push(B.line("M " + (rx + 22) + " " + (y - 10) + " L " + (rx - 14) + " " + (y + 2) + " L " + (rx + 22) + " " + (y + 14), 7));
      return out.join("");
    }
    if (kind === "happy") {
      [lx, rx].forEach(function (x) { out.push(B.line("M " + (x - 20) + " " + (y + 8) + " Q " + x + " " + (y - 24) + " " + (x + 20) + " " + (y + 8), 7)); });
      return out.join("");
    }
    var E = kind === "wide" ? { rx: 31, ry: 37, dy: -4, pr: 6, hl: false } : { rx: 25, ry: 31, dy: 0, pr: 13, hl: true };
    [[lx, -1], [rx, 1]].forEach(function (p) {
      var x = p[0] + (kind === "wide" ? p[1] * 4 : 0), cy = y + E.dy;
      out.push('<ellipse cx="' + x + '" cy="' + cy + '" rx="' + E.rx + '" ry="' + E.ry + '" fill="' + EYE + '" stroke="' + INK + '" stroke-width="5"/>');
      var qx = px, qy = py;
      if (kind === "cross") { qx = -p[1] * 11; qy = -14; }
      var pcx = x + (kind === "wide" ? 0 : 3) + qx, pcy = cy + (kind === "wide" ? 2 : 4) + qy;
      out.push(B.dot(pcx, pcy, kind === "cross" ? 11 : E.pr));
      if (E.hl) out.push(B.dot(pcx + 5, pcy - 6, kind === "cross" ? 4 : 5, "#ffffff"));
      out.push(lid(x, cy, E.rx, E.ry, k, sea));
    });
    return out.join("");
  }
  function lashes(o) {
    if (!o.lashes) return "";
    var pop = o.lashes, ice = o.lashIce, out = [];
    [160, 238].forEach(function (cx) {
      [-128, -90, -52].forEach(function (deg, i) {
        var a = deg * Math.PI / 180, bx = cx + 25 * Math.cos(a), by = 156 + 31 * Math.sin(a), L = (i === 1 ? 26 : 22) * pop;
        var ex = bx + Math.cos(a) * L, ey = by + Math.sin(a) * L;
        var d = "M " + f(bx) + " " + f(by) + " L " + f(ex) + " " + f(ey);
        if (ice) {
          out.push(B.line(d, 11)); out.push(B.line(d, 6, "#cfefff"));
          out.push('<path d="M ' + f(ex - 6) + " " + f(ey) + " L " + f(ex) + " " + f(ey - 9) + " L " + f(ex + 6) + " " + f(ey) + " L " + f(ex) + " " + f(ey + 7) +
            ' Z" fill="#ffffff" stroke="' + INK + '" stroke-width="2.5"/>');
        } else out.push(B.line(d, 5));
      });
    });
    return out.join("");
  }
  function brows(kind) {
    if (!kind) return "";
    var L = { up: ["M 134 104 Q 160 86 186 102", "M 212 102 Q 238 86 264 104"],
      flat: ["M 136 112 L 184 112", "M 214 112 L 262 112"],
      worried: ["M 136 104 Q 160 108 184 118", "M 214 118 Q 238 108 262 104"],
      skeptic: ["M 136 114 L 184 112", "M 214 102 Q 238 86 264 98"],
      down: ["M 138 104 L 184 118", "M 214 118 L 260 104"] }[kind];
    return L ? B.line(L[0], 6) + B.line(L[1], 6) : "";
  }

  // ---------- miệng: 9 hình khẩu hình + biểu cảm ----------
  function mouth(m) {
    var T = '<path d="M 186 246 C 194 254 206 254 214 246 C 208 240 192 240 186 246 Z" fill="' + CHEEK + '"/>';
    switch (m) {
      case "A": return B.line("M 176 230 C 190 233 210 233 224 230", 7) + B.line("M 172 225 L 178 231", 4) + B.line("M 228 225 L 222 231", 4);
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
        return '<rect x="160" y="212" width="80" height="30" rx="10" fill="' + EYE + '" stroke="' + INK + '" stroke-width="6"/>' + B.line(z, 4);
      case "o": return '<ellipse cx="200" cy="234" rx="17" ry="24" fill="' + INK + '"/>';
      case "flat": return B.line("M 174 230 C 190 228 212 232 228 229", 6);
      case "smirk": return B.line("M 176 222 C 196 240 222 236 236 214", 6);
      case "frown": return B.line("M 176 238 C 190 222 212 222 226 238", 6);
      case "wobbly": return B.line("M 170 232 C 180 222 188 240 198 230 C 208 220 216 240 230 228", 6);
      case "content": return B.line("M 180 226 C 192 236 210 236 222 226", 6);
      default: return B.line("M 176 228 C 190 236 210 236 224 228", 6); // X: nghỉ, khép
    }
  }

  // ---------- tay, chân ----------
  var SH = { l: [90, 212], r: [310, 212] };
  B.ARM = {
    rest: { l: [62, 300, -14], r: [338, 300, 14] },
    up: { l: [112, 36, -30], r: [288, 36, 30] },
    low: { l: [126, 300, -30], r: [274, 300, 30] },
    hug: { l: [184, 248, 30], r: [216, 248, -30] },
    cup: { l: [168, 268, 34], r: [232, 268, -34] },
    point: { l: [62, 300, -14], r: [396, 150, -10] },
    pointL: { l: [8, 160, 10], r: [338, 300, 14] },
    shrug: { l: [40, 150, 30], r: [360, 150, -30] },
    shock: { l: [22, 152, 0], r: [378, 152, 0] },
    offer: { l: [62, 300, -14], r: [404, 236, 16] },
    shoulder: { l: [62, 300, -14], r: [282, 52, -26] },
  };
  function arm(side, spec) {
    var s = SH[side], hx = spec[0], hy = spec[1], bend = spec[2] || 0;
    var mx = (s[0] + hx) / 2, my = (s[1] + hy) / 2, dx = hx - s[0], dy = hy - s[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
    var cx = mx - dy / L * bend, cy = my + dx / L * bend;
    return { d: "M " + f(s[0]) + " " + f(s[1]) + " Q " + f(cx) + " " + f(cy) + " " + f(hx) + " " + f(hy), hx: hx, hy: hy };
  }
  function legs(o, bob) {
    var mode = o.legs || "stand", hy = 290 + bob, out = [], fl, fr;
    if (mode === "walk") {
      var p = (o.phase || 0) * 2 * Math.PI, sn = Math.sin(p), cs = Math.cos(p);
      fl = [164 + 28 * sn, 384 - Math.max(0, cs) * 18]; fr = [236 - 28 * sn, 384 - Math.max(0, -cs) * 18];
    } else if (mode === "shiver") { fl = [166, 386]; fr = [236, 386]; }
    else if (mode === "apart") { fl = [146, 380]; fr = [254, 380]; }
    else { fl = [160, 385]; fr = [240, 385]; }
    var knee = mode === "shiver" ? 18 : 0;
    out.push(B.line("M 174 " + f(hy) + " Q " + f((174 + fl[0]) / 2 + knee) + " " + f((hy + fl[1]) / 2) + " " + f(fl[0] + 4) + " " + f(fl[1] - 4), 15));
    out.push(B.line("M 226 " + f(hy) + " Q " + f((226 + fr[0]) / 2 - knee) + " " + f((hy + fr[1]) / 2) + " " + f(fr[0] - 4) + " " + f(fr[1] - 4), 15));
    out.push(B.ell(fl[0] - 4, fl[1], 28, 12, SHOE, 5));
    out.push(B.ell(fr[0] + 4, fr[1], 28, 12, SHOE, 5));
    return out.join("");
  }

  // ---------- đồ mặc ----------
  function beanie() {
    return B.shape("M 118 86 C 118 24 282 24 282 86 Z", MAT, { sw: 6 }) +
      B.line("M 150 40 L 156 82", 3, INK, 0.5) + B.line("M 200 30 L 200 82", 3, INK, 0.5) + B.line("M 250 40 L 244 82", 3, INK, 0.5) +
      B.shape("M 104 104 C 140 76 260 76 296 104 L 292 80 C 256 56 144 56 108 80 Z", "#EFE3C8", { sw: 6 }) +
      B.ell(200, 26, 20, 18, "#EFE3C8", 6);
  }
  function scarf() {
    return B.shape("M 112 258 C 156 282 244 282 290 256 L 294 286 C 246 312 154 312 108 288 Z", MAT, { sw: 6 }) +
      B.line("M 150 272 L 146 302", 4, "#EFE3C8") + B.line("M 250 272 L 254 302", 4, "#EFE3C8") +
      B.shape("M 134 292 C 128 322 118 346 106 372 L 136 380 C 146 352 154 324 162 298 Z", MAT, { sw: 6 }) +
      B.line("M 112 378 L 108 392", 4) + B.line("M 122 380 L 120 394", 4) + B.line("M 132 382 L 132 396", 4);
  }
  function blanket() {
    var d = "M 40 334 C 18 200 58 26 200 20 C 342 26 384 200 362 334 C 300 356 102 356 40 334 Z " +
      "M 94 182 A 106 96 0 1 0 306 182 A 106 96 0 1 0 94 182 Z";
    var st = "#F2C9A8";
    return B.shape(d, "#C9603A", { sw: 7, rule: "evenodd" }) +
      B.line("M 62 150 L 56 318", 5, st, 0.8) + B.line("M 82 112 L 78 326", 5, st, 0.8) +
      B.line("M 338 150 L 344 318", 5, st, 0.8) + B.line("M 318 112 L 322 326", 5, st, 0.8) +
      B.line("M 44 270 L 98 274", 5, st, 0.8) + B.line("M 302 274 L 358 270", 5, st, 0.8) +
      B.line("M 130 40 C 170 30 230 30 270 40", 5, st, 0.8);
  }
  function snowhat() {
    var pts = [[96, 100], [104, 62], [146, 34], [200, 24], [252, 32], [296, 60], [306, 100], [262, 92], [230, 102], [196, 92], [160, 102], [126, 92]];
    return B.shape(B.smooth(pts, true), C.snow, { sw: 6, ox: 3, oy: 3 }) + B.line("M 140 60 C 160 50 180 48 196 50", 4, C.snowShade);
  }

  /** Vẽ Wob. Tham số chính:
   *  x,y,s (điểm chân, tỉ lệ; s=1 cao 400px) · flip (1 nhìn phải/-1 lật) · lean (độ) · sq (co giãn) · bob (px, âm = nhấc lên)
   *  eyes: open|wide|cross|squint|happy · px,py con ngươi · lid 0..1 · brows · lashes (0..1.3) · lashIce
   *  mouth: A–H|X|smile|chatter|o|flat|smirk|frown|wobbly|content · armL/armR [x,y,bend] hoặc arms: tên ARM
   *  propBack/prop: SVG trong toạ độ Wob (prop vẽ dưới bàn tay) · legs stand|walk|shiver|apart, phase
   *  cold, frost, beanie, scarf, blanket, snowhat · shiver (px rung) · smear (px vệt) · marks: shiver|shock */
  B.wob = function (o) {
    var flip = o.flip || 1, s = o.s || 1, sq = o.sq || 1, bob = o.bob || 0, sea = o.cold ? SEA_COLD : SEA;
    var jx = 0, jy = 0;
    if (o.shiver) { var n = Math.round((o.t || 0) * 12); jx = (B.hash(n * 5.3) - 0.5) * 2 * o.shiver; jy = (B.hash(n * 2.1 + 4) - 0.5) * o.shiver; }
    var sx = 1 - (sq - 1) * 0.8;
    var armSet = B.ARM[o.arms || "rest"];
    var aL = arm("l", o.armL || armSet.l), aR = arm("r", o.armR || armSet.r);
    var up = [];
    up.push(backpack());
    if (o.propBack) up.push(o.propBack);
    up.push(body(o.cold, o.frost));
    if (o.scarf) up.push(scarf());
    if (o.blanket) up.push(blanket());
    if (!o.cold && !o.blanket) up.push(B.ell(124, 204, 16, 10, null, 0) + '<ellipse cx="124" cy="204" rx="16" ry="10" fill="' + CHEEK + '" opacity="0.55"/><ellipse cx="276" cy="204" rx="16" ry="10" fill="' + CHEEK + '" opacity="0.55"/>');
    up.push(eyes(o, sea));
    up.push(lashes(o));
    up.push(brows(o.brows));
    up.push(mouth(o.mouth || "X"));
    if (o.beanie) up.push(beanie());
    if (o.snowhat) up.push(snowhat());
    up.push(B.line(aL.d, 13) + B.line(aR.d, 13));
    if (o.prop) up.push(o.prop);
    up.push(B.dot(aL.hx, aL.hy, 14) + B.dot(aR.hx, aR.hy, 14));
    if (o.propFront) up.push(o.propFront);
    var upTr = "translate(0 " + f(bob) + ") rotate(" + f(o.lean || 0) + " 200 290) translate(200 392) scale(" + f(sx * 1000) / 1000 + " " + f(sq * 1000) / 1000 + ") translate(-200 -392)";
    var upper = B.g(upTr, up.join(""));
    var ghosts = "";
    if (o.smear) {
      var gl = [];
      for (var k = 3; k >= 1; k--) gl.push('<g transform="translate(' + f(-o.smear * k * 0.45) + ' 0)" opacity="' + (0.16 + 0.08 * (3 - k)) + '"><path d="' + BODY + '" fill="' + sea + '" stroke="' + INK + '" stroke-width="5"/></g>');
      for (var j = 0; j < 5; j++) { var yy = 90 + j * 45, x0 = o.smear > 0 ? -40 : 440; gl.push(B.line("M " + x0 + " " + yy + " L " + (x0 - o.smear * (1.4 + B.hash(j) * 0.8)) + " " + yy, 5)); }
      ghosts = gl.join("");
    }
    var marks = "";
    if (o.marks === "shiver") [[24, 150, 1], [376, 150, -1], [30, 240, 1], [370, 240, -1]].forEach(function (m) {
      marks += B.line("M " + m[0] + " " + m[1] + " L " + (m[0] + 14 * m[2]) + " " + (m[1] + 18) + " L " + m[0] + " " + (m[1] + 36), 5);
    });
    if (o.marks === "shock") ["M 104 50 L 84 16", "M 200 28 L 200 -6", "M 296 50 L 316 16", "M 58 92 L 24 76", "M 342 92 L 376 76"].forEach(function (d) { marks += B.line(d, 7); });
    var inner = ghosts + legs(o, bob) + upper + marks;
    var tr = "translate(" + f(o.x + jx) + " " + f(o.y + jy) + ") scale(" + f(s * flip * 1000) / 1000 + " " + f(s * 1000) / 1000 + ") translate(-200 -392)";
    return B.g(tr, inner);
  };
  /** Toạ độ khung của một điểm (lx, ly) trong hệ Wob (bỏ qua nghiêng) – để đặt bong bóng, đồ vật cạnh Wob. */
  B.wobPt = function (o, lx, ly) { var s = o.s || 1, fl = o.flip || 1; return [o.x + (lx - 200) * s * fl, o.y + (ly - 392) * s + (o.bob || 0) * s]; };
})();
