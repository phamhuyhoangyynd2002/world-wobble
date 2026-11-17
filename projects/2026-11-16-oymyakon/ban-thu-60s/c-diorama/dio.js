/* World Wobble – ban thu C "diorama giay 2.5D / sach pop-up" (16/11/2026).
 * Moi hinh ve bang code: SVG trong khong gian CSS 3D, mot gsap.timeline paused duy nhat.
 * Tat dinh: PRNG co seed (mulberry32), khong Date, khong Math.random, khong requestAnimationFrame.
 * Wob: toa do lay tu templates/_shared/wob/nguon/tao_wob.py (than meo, luc dia, ba lo, giay), tach bo phan
 * + them mi mat, bo mieng A–H/X, khop tay chan. Moc thoi gian: bang-phan-canh.md (canh 1 @0.4, 2 @12.6, 3 @27.0,
 * 4 @42.2, 5 @55.0) + moc tu trong subtitles.json + khau-hinh/scene-N.json (nhung ben duoi).
 */
window.__dioReady = new Promise(function (resolveDio) {
function buildDio() {
  "use strict";
  // ------------------------------------------------------------------ mau
  const INK = "#1f2326", SEA = "#5a9fb8", LAND = "#efd9a2", EYE = "#fffdf6", CHEEK = "#e9806e";
  const PACK = "#b8743a", PACK_DARK = "#8e5527", MAT = "#d9543c", SHOE = "#d9543c", FROST = "#e8f6ff";
  const PAPER = "#EFE3C8", PAPER2 = "#e2d2ae", TERRA = "#E0703A", TEAL = "#3F6A70";
  const SNOW = "#f7fafb", SNOW2 = "#dfe9ee", ICE = "#bfe3f0", ICE2 = "#6fa9c2";
  const WOOD = "#6b4a33", WOOD2 = "#4a3122", WIN = "#f3c46a", FISH1 = "#4f7486", FISH2 = "#8fb0bf", FISH3 = "#d6e3e8";

  // Moc canh (giay, tuyet doi)
  const S1 = 0.4, S2 = 12.6, S3 = 27.0, S4 = 42.2, S5 = 55.0, END = 60.0;
  const CUT_VILLAGE = 12.1, CUT_ANYWAY = 54.1;

  // Khau hinh (chep tu chung/khau-hinh/scene-1.json va scene-5.json: [start, value])
  const MOUTH1 = [[0,"X"],[0.2,"B"],[0.433,"X"],[0.667,"B"],[0.767,"C"],[0.9,"X"],[1.567,"F"],[1.8,"B"],[1.9,"C"],[2.067,"B"],[2.267,"C"],[2.533,"B"],[2.633,"C"],[2.833,"D"],[3.267,"X"],[3.467,"B"],[3.567,"X"],[3.667,"E"],[3.8,"X"],[4.0,"C"],[4.267,"B"],[4.4,"H"],[4.567,"C"],[4.767,"D"],[4.9,"C"],[5.233,"A"],[5.4,"B"],[5.667,"C"],[5.833,"B"],[6.167,"C"],[6.467,"B"],[6.6,"A"],[6.767,"C"],[6.967,"D"],[7.167,"C"],[7.333,"X"],[7.733,"B"],[7.9,"C"],[8.033,"G"],[8.167,"C"],[8.367,"B"],[8.533,"A"],[8.833,"H"],[9.1,"C"],[9.4,"X"],[9.833,"B"],[9.967,"A"],[10.233,"C"],[10.533,"X"]];
  const MOUTH5 = [[0,"X"],[0.2,"A"],[0.367,"C"],[0.567,"B"],[0.767,"X"],[0.967,"B"],[1.133,"G"],[1.267,"C"],[1.6,"B"],[1.8,"C"],[2.067,"B"],[2.267,"C"],[2.433,"X"],[2.8,"C"],[2.967,"B"],[3.233,"C"],[3.4,"X"]];

  // ------------------------------------------------------------------ tien ich
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const rnd = mulberry32(20261116);
  const rr = (a, b) => a + (b - a) * rnd();
  const root = document.getElementById("root");
  const tl = gsap.timeline({ paused: true });
  const SFX = [];
  function sfx(name, at, volume) { SFX.push({ src: "sfx/" + name + ".wav", at: Math.round(at * 1000) / 1000, volume: volume == null ? 0.5 : volume }); }
  let uid = 0; const nid = (p) => (p || "i") + (++uid);

  function div(cls, parent, css) { const d = document.createElement("div"); d.className = cls; if (css) d.style.cssText = css; parent.appendChild(d); return d; }
  function P(parent, v) { const d = div("p", parent); gsap.set(d, Object.assign({ x: 0, y: 0, z: 0 }, v || {})); return d; }
  // Standee: svg w×h, diem neo (ax, ay) dat tai goc node (mac dinh: giua day)
  function cut(parent, w, h, inner, o) {
    o = o || {};
    const p = P(parent, o.pos);
    const ax = o.ax != null ? o.ax : w / 2, ay = o.ay != null ? o.ay : h;
    p.insertAdjacentHTML("beforeend", '<svg class="cut ' + (o.cls || "") + '" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h +
      '" style="left:' + (-ax) + "px;top:" + (-ay) + "px;" + (o.f ? "filter:" + o.f + ";" : "") + '">' + inner + "</svg>");
    p.svg = p.lastElementChild;
    return p;
  }
  function plane(parent, v, w, h, css, cls) { const p = P(parent, v); div("face " + (cls || ""), p, "left:" + (-w / 2) + "px;top:" + (-h / 2) + "px;width:" + w + "px;height:" + h + "px;" + css); p.face = p.lastElementChild; return p; }
  function floorPlane(parent, x, y, z, w, d, css) { return plane(parent, { x: x, y: y, z: z, rotationX: 90 }, w, d, css); }

  // Bo loc giay: lop 1 = do day giay (vien sang lech 2-3px), lop 2 = bong do len lop sau theo nguon sang
  const F_WARM = "drop-shadow(2px 3px 0 #a8946c) drop-shadow(16px 12px 9px rgba(25,12,0,.45))";
  const F_COLD = "drop-shadow(2px 3px 0 #b9c9d0) drop-shadow(14px 10px 9px rgba(40,72,92,.38))";
  const F_COLDS = "drop-shadow(1px 2px 0 #b9c9d0) drop-shadow(7px 5px 5px rgba(40,72,92,.3))";
  const F_FAR = "drop-shadow(1px 2px 0 #c9d6dc) drop-shadow(6px 5px 5px rgba(40,72,92,.22)) blur(1.4px)";
  const F_FARR = "blur(2.4px)";
  const F_FG = "drop-shadow(2px 3px 0 #b9c9d0) blur(3px)";

  // ------------------------------------------------------------------ defs dung chung
  root.insertAdjacentHTML("beforeend",
    '<svg width="0" height="0" style="position:absolute"><defs>' +
    '<pattern id="plaid" width="56" height="56" patternUnits="userSpaceOnUse"><rect width="56" height="56" fill="' + TERRA + '"/>' +
    '<rect x="0" y="20" width="56" height="16" fill="' + PAPER + '" opacity=".8"/><rect x="20" y="0" width="16" height="56" fill="' + PAPER + '" opacity=".55"/>' +
    '<rect x="0" y="26" width="56" height="4" fill="' + TEAL + '"/><rect x="26" y="0" width="4" height="56" fill="' + TEAL + '"/></pattern>' +
    '<radialGradient id="glowW"><stop offset="0" stop-color="#fff2c4" stop-opacity=".9"/><stop offset=".45" stop-color="#ffd27a" stop-opacity=".35"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="glowC"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="coneW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6a6" stop-opacity=".55"/><stop offset="1" stop-color="#ffe6a6" stop-opacity="0"/></linearGradient>' +
    '<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch"/>' +
    '<feColorMatrix type="matrix" values="0 0 0 0 .12  0 0 0 0 .1  0 0 0 0 .08  0 0 0 1.4 -.55"/></filter>' +
    "</defs></svg>");

  // ------------------------------------------------------------------ ve chung
  const sk = (d, w, c, extra) => '<path d="' + d + '" fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w || 5) + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || "") + "/>";
  const fp = (d, fill, w, extra) => '<path d="' + d + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (w == null ? 5 : w) + '" stroke-linejoin="round"' + (extra || "") + "/>";
  const txt = (x, y, s, wgt, str, fill, extra) => '<text x="' + x + '" y="' + y + '" font-family="Fraunces" font-size="' + s + '" font-weight="' + wgt + '" text-anchor="middle" data-layout-allow-overlap data-layout-allow-occlusion data-layout-allow-overflow fill="' + (fill || INK) + '"' + (extra || "") + ">" + str + "</text>";
  function lumpy(x0, x1, y, amp, n, seed) { // mep tuyet gon song
    const r = mulberry32(seed || 3); let d = "M " + x0 + " " + y; const st = (x1 - x0) / n;
    for (let i = 0; i < n; i++) { const xa = x0 + st * i, xb = xa + st; d += " Q " + (xa + st / 2).toFixed(1) + " " + (y + amp * (0.6 + 0.8 * r())).toFixed(1) + " " + xb.toFixed(1) + " " + y; }
    return d;
  }

  // Ca dong cung: tam o (0,0), dau huong +x, dai ~260
  function fishSVG(cls, serene) {
    const body = "M -118 0 C -88 -34 2 -44 62 -34 C 92 -28 114 -12 118 0 C 114 12 92 28 62 32 C 2 42 -88 32 -118 0 Z";
    let s = '<g class="' + (cls || "") + '">';
    s += fp("M -112 0 L -152 -32 C -144 -10 -144 10 -152 32 Z", FISH1, 5);
    s += fp("M -40 -40 C -20 -64 22 -62 38 -38 Z", FISH1, 5);
    s += fp(body, FISH2, 6);
    s += '<path d="M -110 4 C -80 30 0 38 60 30 C 90 26 110 12 116 4 Z" fill="' + FISH3 + '"/>';
    s += '<path d="M -114 -2 C -80 -30 0 -40 60 -31 C 84 -27 104 -16 112 -6 C 90 -14 40 -18 0 -16 C -50 -14 -90 -8 -114 -2 Z" fill="' + FISH1 + '" opacity=".75"/>';
    s += sk("M 78 -24 C 68 -8 68 8 78 24", 4);
    for (let i = 0; i < 5; i++) s += sk("M " + (-60 + i * 26) + " -6 q 8 8 0 16", 2.5, INK, ' opacity=".35"');
    s += '<path d="M -70 -26 l 8 -6 l 10 4 l 12 -5 l 10 6 z M 10 -32 l 10 -5 l 14 5 z M -30 24 l 10 8 l 8 -6 z M 40 26 l 8 6 l 10 -5 z" fill="#fff" opacity=".85"/>';
    s += '<path d="M -60 31 l 5 14 l 5 -13 M -20 35 l 4 11 l 4 -11 M 30 32 l 5 12 l 4 -12" fill="' + FROST + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>';
    s += '<g class="feyeO"' + (serene ? ' opacity="0"' : "") + '><circle cx="94" cy="-8" r="8" fill="#fff" stroke="' + INK + '" stroke-width="3.5"/><circle cx="96" cy="-8" r="3.6" fill="' + INK + '"/></g>';
    s += '<g class="feyeS"' + (serene ? "" : ' opacity="0"') + ">" + sk("M 86 -9 C 90 -3 98 -3 102 -9", 4) + sk("M 104 7 C 108 10 112 9 114 6", 3) + "</g>";
    s += sk("M 108 6 C 112 6 116 4 118 2", 3);
    return s + "</g>";
  }

  // ------------------------------------------------------------------ Wob (con roi giay co khop)
  function wobbly(cx, cy, r, n, phase) {
    n = n || 48; phase = phase || 0; const pts = [];
    for (let i = 0; i < n; i++) { const t = 2 * Math.PI * i / n; const q = r + 5.5 * Math.sin(3 * t + phase) + 3.5 * Math.sin(5 * t + 1.3 + phase) + 2 * Math.sin(2 * t + 0.4); pts.push([cx + q * Math.cos(t), cy + q * Math.sin(t) * 0.96]); }
    const f = (v) => v.toFixed(1); let d = "M " + f(pts[0][0]) + " " + f(pts[0][1]) + " ";
    for (let i = 0; i < n; i++) { const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      d += "C " + f(p1[0] + (p2[0] - p0[0]) / 6) + " " + f(p1[1] + (p2[1] - p0[1]) / 6) + " " + f(p2[0] - (p3[0] - p1[0]) / 6) + " " + f(p2[1] - (p3[1] - p1[1]) / 6) + " " + f(p2[0]) + " " + f(p2[1]) + " "; }
    return d + "Z";
  }
  const BODY = wobbly(200, 178, 122);
  const LANDS = [
    "M 92 120 C 110 92 150 88 168 104 C 182 118 170 140 186 152 C 198 162 190 186 168 188 C 146 190 140 172 122 176 C 100 180 84 160 88 142 Z",
    "M 236 196 C 252 182 284 186 300 204 C 316 222 312 252 292 266 C 276 278 258 268 252 252 C 246 236 226 228 228 212 Z",
    "M 232 82 C 246 74 268 78 272 92 C 276 104 262 112 250 110 C 238 108 226 94 232 82 Z",
    "M 150 262 C 162 254 182 258 186 270 C 190 282 176 292 162 290 C 148 288 140 272 150 262 Z"];
  const MOUTHS = {
    X: sk("M 180 226 C 192 236 210 236 222 224", 6),
    A: sk("M 178 230 C 192 233 210 233 224 229", 8),
    B: '<rect x="179" y="221" width="44" height="17" rx="8" fill="' + INK + '"/><rect x="184" y="223" width="34" height="6" rx="2" fill="' + EYE + '"/>',
    C: '<ellipse cx="201" cy="230" rx="19" ry="13" fill="' + INK + '"/><ellipse cx="201" cy="237" rx="10" ry="5" fill="' + CHEEK + '"/>',
    D: fp("M 174 220 C 178 260 224 260 228 220 Z", INK, 4) + '<path d="M 186 244 C 194 254 210 254 216 244 C 208 238 194 238 186 244 Z" fill="' + CHEEK + '"/>',
    E: '<ellipse cx="201" cy="230" rx="14" ry="12" fill="' + INK + '"/><ellipse cx="201" cy="236" rx="7" ry="4" fill="' + CHEEK + '"/>',
    F: '<ellipse cx="201" cy="230" rx="9" ry="10" fill="' + INK + '"/>',
    G: '<rect x="183" y="222" width="36" height="16" rx="7" fill="' + INK + '"/><rect x="186" y="221" width="30" height="8" rx="2" fill="' + EYE + '"/>',
    H: '<ellipse cx="201" cy="230" rx="17" ry="12" fill="' + INK + '"/><ellipse cx="201" cy="225" rx="8" ry="5" fill="' + CHEEK + '"/>',
    O: '<ellipse cx="200" cy="234" rx="15" ry="21" fill="' + INK + '"/>',
    S: fp("M 160 214 C 172 258 228 258 240 214 Z", INK, 6) + '<path d="M 176 236 C 190 252 212 252 226 236 C 214 228 188 228 176 236 Z" fill="' + CHEEK + '"/>',
    N: sk("M 176 230 C 192 228 210 232 226 228", 6),
    K: '<rect x="166" y="214" width="70" height="28" rx="10" fill="' + EYE + '" stroke="' + INK + '" stroke-width="6"/>' + sk("M 168 228 L 177 220 L 186 236 L 195 220 L 204 236 L 213 220 L 222 236 L 230 222 L 234 228", 4)
  };
  const ARM_PIV = { L: [86, 212], R: [314, 212] }, ARM_HAND = { L: [72, 308], R: [328, 308] };

  function wobSVG(id, size) {
    const s = [];
    s.push('<svg class="cut wobsvg" width="' + size + '" height="' + size + '" viewBox="0 0 400 400">');
    s.push('<defs><clipPath id="wc' + id + '"><path d="' + BODY + '"/></clipPath>' +
      '<clipPath id="el' + id + '"><ellipse cx="160" cy="156" rx="25" ry="31"/></clipPath><clipPath id="er' + id + '"><ellipse cx="238" cy="156" rx="25" ry="31"/></clipPath></defs>');
    // chan
    s.push('<g class="legL">' + sk("M 174 290 C 172 324 170 350 168 380", 15) + '<ellipse cx="158" cy="385" rx="28" ry="12" fill="' + SHOE + '" stroke="' + INK + '" stroke-width="5"/></g>');
    s.push('<g class="legR">' + sk("M 226 290 C 228 324 230 350 232 380", 15) + '<ellipse cx="242" cy="385" rx="28" ry="12" fill="' + SHOE + '" stroke="' + INK + '" stroke-width="5"/></g>');
    s.push('<g class="upper"><g class="talk">');
    // ba lo (nay tre)
    s.push('<g class="pack"><rect x="250" y="96" width="98" height="160" rx="30" fill="' + PACK + '" stroke="' + INK + '" stroke-width="7"/>' +
      '<rect x="300" y="150" width="44" height="58" rx="12" fill="' + PACK_DARK + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="262" y="66" width="96" height="36" rx="18" fill="' + MAT + '" stroke="' + INK + '" stroke-width="7"/>' + sk("M 282 70 L 282 98", 4) + sk("M 336 70 L 336 98", 4) + "</g>");
    // than
    let b = '<g class="body"><path d="' + BODY + '" fill="' + SEA + '"/><g clip-path="url(#wc' + id + ')">';
    LANDS.forEach(function (d) { b += '<path d="' + d + '" fill="' + LAND + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>'; });
    b += sk("M 200 46 C 130 138 130 218 200 310", 2.5, INK, ' opacity="0.28"') + sk("M 200 46 C 270 138 270 218 200 310", 2.5, INK, ' opacity="0.28"') + sk("M 68 188 C 160 218 240 218 332 188", 2.5, INK, ' opacity="0.28"');
    b += '<path class="frostcap" opacity="0" d="M 60 96 C 120 46 280 46 340 96 L 340 50 L 60 50 Z" fill="' + FROST + '"/>';
    b += sk("M 112 112 C 122 96 136 86 152 80", 9, "#ffffff", ' opacity="0.55"') + "</g>";
    b += '<path d="' + BODY + '" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>';
    b += sk("M 300 96 C 286 130 284 168 300 206", 10, PACK_DARK) + sk("M 300 96 C 286 130 284 168 300 206", 3, INK, ' opacity="0.6"') + "</g>";
    s.push(b);
    s.push('<g class="cheeks"><ellipse cx="124" cy="204" rx="16" ry="10" fill="' + CHEEK + '" opacity="0.55"/><ellipse cx="276" cy="204" rx="16" ry="10" fill="' + CHEEK + '" opacity="0.55"/></g>');
    // khan quang (hoi uc)
    s.push('<g class="scarf" opacity="0">' + fp("M 132 270 L 118 340 L 150 344 L 158 278 Z", TERRA, 5) + sk("M 122 322 L 148 326", 4, PAPER) +
      sk("M 120 342 l -2 10 M 130 343 l -1 10 M 140 344 l 0 10", 3) +
      fp("M 96 244 C 150 280 250 280 304 244 L 300 272 C 248 306 152 306 100 272 Z", TERRA, 6) +
      sk("M 130 266 C 140 274 150 278 160 280", 5, PAPER, ' opacity=".9"') + sk("M 220 282 C 240 280 256 276 270 268", 5, PAPER, ' opacity=".9"') + "</g>");
    // mat
    const eye = function (cx, side) {
      return '<g class="eye' + side + '"><ellipse cx="' + cx + '" cy="156" rx="25" ry="31" fill="' + EYE + '"/>' +
        '<g class="pup' + side + '"><circle cx="' + (cx + 3) + '" cy="160" r="13" fill="' + INK + '"/><circle cx="' + (cx + 8) + '" cy="154" r="5" fill="#fff"/></g>' +
        '<g clip-path="url(#e' + side.toLowerCase() + id + ')"><ellipse class="lid' + side + '" cx="' + cx + '" cy="156" rx="26" ry="32" fill="' + SEA + '" stroke="' + INK + '" stroke-width="5"/></g>' +
        '<ellipse cx="' + cx + '" cy="156" rx="25" ry="31" fill="none" stroke="' + INK + '" stroke-width="5"/></g>';
    };
    const lash = function (cx, side) {
      return '<g class="lash' + side + '"><g class="lashS">' + sk("M " + (cx - 15) + " 131 L " + (cx - 24) + " 114", 4.5) + sk("M " + cx + " 125 L " + cx + " 106", 4.5) + sk("M " + (cx + 15) + " 131 L " + (cx + 24) + " 114", 4.5) + "</g>" +
        '<g class="lashI" opacity="0">' + ["M " + (cx - 27) + " 112 l 6 0 l -3 9 z", "M " + (cx - 3) + " 104 l 6 0 l -3 9 z", "M " + (cx + 21) + " 112 l 6 0 l -3 9 z"].map(function (d) { return '<path d="' + d + '" fill="' + FROST + '" stroke="' + INK + '" stroke-width="2"/>'; }).join("") + "</g></g>";
    };
    s.push('<g class="eyes">' + eye(160, "L") + eye(238, "R") + lash(160, "L") + lash(238, "R") + "</g>");
    // mieng
    let m = '<g class="m" data-m="X">';
    Object.keys(MOUTHS).forEach(function (k) { m += '<g class="m' + k + '">' + MOUTHS[k] + "</g>"; });
    s.push(m + "</g>");
    // mu len (hoi uc)
    s.push('<g class="beanie" opacity="0">' + fp("M 116 96 C 120 34 280 34 284 96 Z", TEAL, 6) + sk("M 150 50 L 156 92 M 200 40 L 200 92 M 250 50 L 244 92", 3, PAPER, ' opacity=".5"') +
      fp("M 108 92 C 150 80 250 80 292 92 L 290 112 C 250 100 150 100 110 112 Z", PAPER, 5) + '<circle cx="200" cy="30" r="17" fill="' + TERRA + '" stroke="' + INK + '" stroke-width="5"/></g>');
    // chan (canh 5)
    s.push('<g class="blanket" opacity="0">' +
      fp("M 200 24 C 302 24 354 98 358 190 C 362 270 352 330 334 374 L 66 374 C 48 330 38 270 42 190 C 46 98 98 24 200 24 Z M 200 102 C 270 102 302 150 298 196 C 294 250 252 270 200 270 C 148 270 106 250 102 196 C 98 150 130 102 200 102 Z", "url(#plaid)", 6, ' fill-rule="evenodd"') +
      sk("M 90 300 C 120 320 150 330 180 334", 4, INK, ' opacity=".5"') + sk("M 310 300 C 290 318 260 330 230 334", 4, INK, ' opacity=".5"') + "</g>");
    // tay + do cam
    ["L", "R"].forEach(function (sd) {
      const d = sd === "L" ? "M 86 212 C 70 246 66 276 72 304" : "M 314 212 C 330 246 334 276 328 304";
      const h = ARM_HAND[sd];
      s.push('<g class="arm' + sd + '">' + sk(d, 13) + '<g transform="translate(' + h[0] + " " + h[1] + ')"><g class="hold' + sd + '"></g></g>' +
        '<circle class="hand' + sd + '" cx="' + h[0] + '" cy="' + h[1] + '" r="14" fill="' + INK + '"/></g>');
    });
    s.push('<g class="extra"></g>');
    s.push("</g></g></svg>");
    return s.join("");
  }

  function makeWob(parent, id, o) {
    const w = { id: id, s: o.s, x: o.x, y: o.y, z: o.z };
    w.pos = P(parent, { x: o.x, y: o.y, z: o.z });
    // bong tiep dat
    const sh = P(w.pos, { rotationX: 90 });
    div("face", sh, "left:" + (-150 * o.s) + "px;top:" + (-50 * o.s) + "px;width:" + (300 * o.s) + "px;height:" + (100 * o.s) + "px;border-radius:50%;background:radial-gradient(closest-side," + (o.shadow || "rgba(20,12,4,.55)") + ",rgba(0,0,0,0))");
    w.shadow = sh;
    w.lift = P(w.pos, {});
    const size = 400 * o.s;
    w.lift.insertAdjacentHTML("beforeend", wobSVG(id, size));
    w.svg = w.lift.lastElementChild;
    w.svg.style.left = (-200 * o.s) + "px"; w.svg.style.top = (-392 * o.s) + "px"; w.svg.style.filter = o.f;
    const q = (c) => w.svg.querySelector("." + c);
    ["legL", "legR", "upper", "talk", "pack", "armL", "armR", "holdL", "holdR", "pupL", "pupR", "lidL", "lidR", "lashL", "lashR", "m", "scarf", "beanie", "blanket", "frostcap", "extra", "cheeks", "body"].forEach(function (c) { w[c] = q(c); });
    w.lashIce = w.svg.querySelectorAll(".lashI"); w.lashStroke = w.svg.querySelectorAll(".lashS path");
    gsap.set(w.legL, { smoothOrigin: false, svgOrigin: "174 290" }); gsap.set(w.legR, { smoothOrigin: false, svgOrigin: "226 290" });
    gsap.set(w.upper, { smoothOrigin: false, svgOrigin: "200 300" }); gsap.set(w.talk, { smoothOrigin: false, svgOrigin: "200 290" });
    gsap.set(w.armL, { smoothOrigin: false, svgOrigin: "86 212", rotation: 0 }); gsap.set(w.armR, { smoothOrigin: false, svgOrigin: "314 212", rotation: 0 });
    gsap.set(w.lidL, { smoothOrigin: false, svgOrigin: "160 124", scaleY: 0 }); gsap.set(w.lidR, { smoothOrigin: false, svgOrigin: "238 124", scaleY: 0 });
    gsap.set(w.lashL, { smoothOrigin: false, svgOrigin: "160 126", scale: 0 }); gsap.set(w.lashR, { smoothOrigin: false, svgOrigin: "238 126", scale: 0 });
    gsap.set(w.pack, { smoothOrigin: false, svgOrigin: "300 250" });
    w.arm = { L: 0, R: 0 }; w.lid = 0;
    // bong thoai (ky hieu, khong chu)
    w.bubbles = {};
    return w;
  }
  function addBubble(w, key, inner) {
    const s = w.s, bw = 190, bh = 160;
    w.lift.insertAdjacentHTML("beforeend", '<svg class="cut bub" width="' + (bw * s) + '" height="' + (bh * s) + '" viewBox="0 0 ' + bw + " " + bh + '" style="left:' + (70 * s) + "px;top:" + (-520 * s) + 'px;overflow:visible">' +
      fp("M 20 20 C 20 6 30 4 44 4 L 156 4 C 172 4 182 10 182 26 L 182 100 C 182 116 172 122 156 122 L 70 122 L 26 156 L 46 122 L 40 122 C 26 122 20 114 20 100 Z", PAPER, 6) + inner + "</svg>");
    const el = w.lift.lastElementChild; gsap.set(el, { scale: 0, transformOrigin: "20% 100%", filter: "drop-shadow(2px 3px 0 #b9c9d0) drop-shadow(10px 8px 6px rgba(40,72,92,.3))" });
    w.bubbles[key] = el; return el;
  }
  function bubble(w, key, t, dur) {
    const el = w.bubbles[key];
    tl.fromTo(el, { scale: 0, rotation: -12 }, { scale: 1, rotation: 0, duration: 0.28, ease: "back.out(2.6)", immediateRender: false }, t);
    tl.to(el, { scale: 0, duration: 0.18, ease: "power2.in" }, t + dur);
  }

  // ---- hanh dong Wob
  function armTo(w, side, t, d, rot, ease) { tl.to(w["arm" + side], { rotation: rot, svgOrigin: ARM_PIV[side].join(" "), duration: d, ease: ease || "power2.inOut" }, t); w.arm[side] = rot; }
  // Dat do vat trong tay sao cho trong he toa do Wob: tam (wx,wy), goc wa (do), khi canh tay quay armDeg
  // Bien doi cuc bo bang thuoc tinh transform (GSAP noi suy so trong chuoi): svgOrigin cua GSAP tinh theo toa do goc svg,
  // khong dung duoc cho do vat long trong canh tay dang quay.
  const f2 = (v) => (Math.round(v * 100) / 100).toFixed(2);
  function TF(x, y, r, sx) { return { attr: { transform: "translate(" + f2(x) + " " + f2(y) + ") rotate(" + f2(r) + ") scale(" + f2(sx == null ? 1 : sx) + " 1)" } }; }
  function holdPose(side, armDeg, wx, wy, wa, sx) {
    const pv = ARM_PIV[side], h = ARM_HAND[side], a = armDeg * Math.PI / 180;
    const rx = h[0] - pv[0], ry = h[1] - pv[1];
    const hx = pv[0] + rx * Math.cos(a) - ry * Math.sin(a), hy = pv[1] + rx * Math.sin(a) + ry * Math.cos(a);
    const dx = wx - hx, dy = wy - hy; // vector the gioi -> doi ve he toa do tay (quay -a)
    return TF(dx * Math.cos(-a) - dy * Math.sin(-a), dx * Math.sin(-a) + dy * Math.cos(-a), wa - armDeg, sx);
  }
  function handWorld(side, armDeg) { const pv = ARM_PIV[side], h = ARM_HAND[side], a = armDeg * Math.PI / 180, rx = h[0] - pv[0], ry = h[1] - pv[1]; return [pv[0] + rx * Math.cos(a) - ry * Math.sin(a), pv[1] + rx * Math.sin(a) + ry * Math.cos(a)]; }
  function look(w, t, dx, dy, d, pupScale) {
    tl.to([w.pupL, w.pupR], { x: dx, y: dy, scale: pupScale || 1, transformOrigin: "50% 50%", duration: d || 0.18, ease: "power2.out" }, t);
  }
  function crossEyes(w, t, d) {
    tl.to(w.pupL, { x: 10, y: -13, duration: d, ease: "power2.inOut" }, t);
    tl.to(w.pupR, { x: -12, y: -13, duration: d, ease: "power2.inOut" }, t);
  }
  function lids(w, t, v, d) { tl.to([w.lidL, w.lidR], { scaleY: v, duration: d || 0.15, ease: "power2.inOut" }, t); w.lid = v; }
  function blink(w, t, base) { const b = base == null ? w.lid : base; tl.fromTo([w.lidL, w.lidR], { scaleY: b }, { scaleY: 1, duration: 0.06, ease: "power1.in", immediateRender: false }, t); tl.fromTo([w.lidL, w.lidR], { scaleY: 1 }, { scaleY: b, duration: 0.09, ease: "power1.out", immediateRender: false }, t + 0.06); }
  function blinks(w, t0, t1, skip, base) {
    let t = t0 + rr(0.6, 1.6);
    while (t < t1 - 0.3) {
      const bad = (skip || []).some(function (r) { return t > r[0] - 0.25 && t < r[1] + 0.1; });
      if (!bad) blink(w, t, base);
      t += rr(2.4, 4.2);
    }
  }
  function mouth(w, t, v) { tl.set(w.m, { attr: { "data-m": v } }, t); }
  function mouthCues(w, start, cues) { cues.forEach(function (c) { mouth(w, start + c[0], c[1]); }); }
  function breathe(w, t0, t1) { // tho: co gian than 2.5%
    const per = 1.6, n = Math.max(1, Math.floor((t1 - t0) / per));
    tl.fromTo(w.upper, { scaleY: 1, scaleX: 1 }, { scaleY: 1.025, scaleX: 0.99, duration: per / 2, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t0);
  }
  function talkBobs(w, start, words) { // gat dau theo tu nhan
    words.forEach(function (wd, i) {
      const t = start + wd[0], a = (i % 2 ? 1 : -1) * (1.5 + (wd[1] || 0));
      tl.to(w.talk, { rotation: a, y: -3 - (wd[1] || 0) * 2, svgOrigin: "200 290", duration: 0.12, ease: "power2.out" }, t);
      tl.to(w.talk, { rotation: 0, y: 0, svgOrigin: "200 290", duration: 0.3, ease: "sine.inOut" }, t + 0.14);
    });
  }
  function shiver(w, t0, t1, amp) { // run cam cap
    const per = 0.05, n = Math.max(2, Math.round((t1 - t0) / per));
    tl.fromTo(w.lift, { x: -amp }, { x: amp, duration: per, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
    tl.to(w.lift, { x: 0, duration: 0.08, ease: "power1.out" }, t0 + n * per);
  }
  function hop(w, t, h, d) { // nhun – bat len – roi – nen
    tl.to(w.lift, { scaleY: 0.9, scaleX: 1.08, duration: 0.08, ease: "power2.out" }, t);
    tl.to(w.lift, { y: -h, scaleY: 1.06, scaleX: 0.96, duration: d * 0.45, ease: "power2.out" }, t + 0.08);
    tl.to(w.lift, { y: 0, scaleY: 1, scaleX: 1, duration: d * 0.4, ease: "power2.in" }, t + 0.08 + d * 0.45);
    tl.to(w.lift, { scaleY: 0.92, scaleX: 1.06, duration: 0.06, ease: "power2.out" }, t + 0.08 + d * 0.85);
    tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.25, ease: "back.out(3)" }, t + 0.14 + d * 0.85);
  }
  function walk(w, t0, t1, x1, z1, o) {
    o = o || {};
    const dur = t1 - t0, n = Math.max(2, Math.round(dur / (o.step || 0.3))), st = dur / n;
    tl.fromTo(w.pos, { x: w.x, z: w.z }, { x: x1, z: z1, duration: dur, ease: o.ease || "power1.inOut", immediateRender: false }, t0);
    const sw = o.swing || 20;
    tl.fromTo(w.legL, { rotation: -sw }, { rotation: sw, svgOrigin: "174 290", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
    tl.fromTo(w.legR, { rotation: sw }, { rotation: -sw, svgOrigin: "226 290", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
    tl.to([w.legL, w.legR], { rotation: 0, duration: 0.14, ease: "power2.out" }, t1);
    tl.fromTo(w.lift, { y: 0, scaleY: 0.95, scaleX: 1.04 }, { y: -15 * w.s, scaleY: 1.03, scaleX: 0.98, duration: st / 2, ease: "sine.out", yoyo: true, repeat: 2 * n - 1, immediateRender: false }, t0);
    tl.to(w.lift, { y: 0, scaleY: 1, scaleX: 1, duration: 0.2, ease: "back.out(2)" }, t1);
    tl.fromTo(w.talk, { rotation: -5 }, { rotation: 5, svgOrigin: "200 290", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
    tl.to(w.talk, { rotation: 0, svgOrigin: "200 290", duration: 0.2, ease: "power2.out" }, t1);
    tl.fromTo(w.pack, { y: 0, rotation: 0 }, { y: -12, rotation: -4, svgOrigin: "300 250", duration: st / 2, ease: "sine.inOut", yoyo: true, repeat: 2 * n - 1, immediateRender: false }, t0 + 0.07);
    tl.to(w.pack, { y: 0, rotation: 0, svgOrigin: "300 250", duration: 0.35, ease: "back.out(4)" }, t1 + 0.07);
    if (!o.noArms) {
      const aL = w.arm.L, aR = w.arm.R;
      tl.fromTo(w.armL, { rotation: aL + 14 }, { rotation: aL - 14, svgOrigin: "86 212", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
      tl.to(w.armL, { rotation: aL, svgOrigin: "86 212", duration: 0.2 }, t1);
      if (!o.keepR) {
        tl.fromTo(w.armR, { rotation: aR + 14 }, { rotation: aR - 14, svgOrigin: "314 212", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
        tl.to(w.armR, { rotation: aR, svgOrigin: "314 212", duration: 0.2 }, t1);
      }
    }
    if (o.face != null) { tl.to(w.lift, { rotationY: o.face, duration: 0.25, ease: "power2.out" }, t0); tl.to(w.lift, { rotationY: o.endFace || 0, duration: 0.3, ease: "power2.inOut" }, t1 - 0.1); }
    if (o.sfx) for (let k = 0; k < n; k++) sfx(o.sfx, t0 + st * k + st * 0.45, o.vol || 0.32);
    w.x = x1; w.z = z1;
  }

  // ------------------------------------------------------------------ camera
  function makeRig(stage) { const cam = div("cam", stage); const cy = P(cam, {}); const ct = P(cy, {}); return { cam: cam, camY: cy, camT: ct, st: null }; }
  function camSet(r, t, s) {
    const a = Object.assign({}, r.st || {}, s);
    if (t == null) { gsap.set(r.cam, { z: a.k, rotationX: a.rx }); gsap.set(r.camY, { rotationY: a.ry }); gsap.set(r.camT, { x: -a.cx, y: -a.cy, z: -a.cz }); }
    else { tl.set(r.cam, { z: a.k, rotationX: a.rx }, t); tl.set(r.camY, { rotationY: a.ry }, t); tl.set(r.camT, { x: -a.cx, y: -a.cy, z: -a.cz }, t); }
    r.st = a;
  }
  function camTo(r, t, d, s, ease) {
    const a = r.st, b = Object.assign({}, a, s); ease = ease || "power2.inOut";
    tl.fromTo(r.cam, { z: a.k, rotationX: a.rx }, { z: b.k, rotationX: b.rx, duration: d, ease: ease, immediateRender: false }, t);
    tl.fromTo(r.camY, { rotationY: a.ry }, { rotationY: b.ry, duration: d, ease: ease, immediateRender: false }, t);
    tl.fromTo(r.camT, { x: -a.cx, y: -a.cy, z: -a.cz }, { x: -b.cx, y: -b.cy, z: -b.cz, duration: d, ease: ease, immediateRender: false }, t);
    r.st = b;
  }

  // ================================================================== SAN KHAU 1: BAN KY VAT (hien tai)
  const deskStage = div("stage", root);
  const D = makeRig(deskStage);
  const dw = D.camT;
  const TY = 260; // mat ban
  // tuong + den chieu
  plane(dw, { x: 0, y: -900, z: -1300 }, 6200, 2600,
    "background:radial-gradient(ellipse 900px 700px at 2250px 1300px, rgba(255,196,110,.42), rgba(255,196,110,0) 70%), repeating-linear-gradient(90deg, rgba(255,240,220,.035) 0 70px, rgba(0,0,0,0) 70px 140px), #2e2522;");
  // ke sach tren tuong
  (function () {
    let s = fp("M 0 250 L 900 250 L 900 272 L 0 272 Z", WOOD, 5);
    const cols = [TERRA, TEAL, PAPER2, "#9c5b3b", SEA, PAPER, "#7d6a4b", TERRA, TEAL];
    let x = 30;
    for (let i = 0; i < 9; i++) { const bw = 44 + (i * 17) % 30, bh = 150 + (i * 37) % 70; s += fp("M " + x + " " + (250 - bh) + " h " + bw + " v " + bh + " h " + (-bw) + " Z", cols[i], 4) + sk("M " + (x + 8) + " " + (250 - bh + 20) + " h " + (bw - 16), 3, INK, ' opacity=".4"'); x += bw + 6; }
    s += fp("M 640 250 C 640 200 700 196 712 250 Z", "#7d6a4b", 4) + fp("M 676 200 C 650 140 640 110 660 90 C 680 120 686 160 676 200 Z M 680 200 C 700 150 730 130 750 130 C 742 160 716 190 680 200 Z", "#5E9E6A", 4);
    s += fp("M 760 250 l 0 -100 l 110 0 l 0 100 Z", PAPER, 5) + fp("M 776 166 l 78 0 l 0 68 l -78 0 Z", "#cfe3ec", 3) + fp("M 776 234 l 26 -40 l 18 24 l 14 -16 l 20 32 Z", SNOW, 3);
    cut(dw, 900, 280, s, { pos: { x: 620, y: -230, z: -1290 }, f: F_WARM });
  })();
  // mat ban go + vung sang cua den
  floorPlane(dw, 0, TY, -500, 4400, 2600,
    "background:radial-gradient(ellipse 1100px 900px at 1950px 1150px, rgba(255,205,130,.55), rgba(255,205,130,0) 70%), repeating-linear-gradient(90deg, rgba(0,0,0,0) 0 236px, rgba(40,20,8,.55) 236px 242px), repeating-linear-gradient(90deg, rgba(255,230,190,.05) 0 9px, rgba(0,0,0,0) 9px 31px), #7a4b2b;");
  // den ban
  (function () {
    let s = '<circle cx="330" cy="300" r="230" fill="url(#glowW)"/>';
    s += '<path d="M 300 300 L 620 700 L 60 700 Z" fill="url(#coneW)" opacity=".55"/>';
    s += fp("M 100 696 C 100 660 340 660 340 696 Z", "#2f3b3c", 6) + '<ellipse cx="220" cy="696" rx="124" ry="16" fill="#2f3b3c" stroke="' + INK + '" stroke-width="6"/>';
    s += sk("M 220 670 L 150 400", 18) + sk("M 220 670 L 150 400", 9, "#9aa39a") + '<circle cx="150" cy="400" r="15" fill="' + TERRA + '" stroke="' + INK + '" stroke-width="5"/>';
    s += sk("M 150 400 L 290 200", 18) + sk("M 150 400 L 290 200", 9, "#9aa39a") + '<circle cx="290" cy="200" r="15" fill="' + TERRA + '" stroke="' + INK + '" stroke-width="5"/>';
    s += '<g transform="rotate(-28 300 200)">' + fp("M 262 176 L 338 176 L 410 316 L 190 316 Z", TERRA, 7) + sk("M 250 200 L 350 200", 4, INK, ' opacity=".35"') +
      '<ellipse cx="300" cy="316" rx="110" ry="24" fill="#ffe6a3" stroke="' + INK + '" stroke-width="6"/><circle cx="300" cy="312" r="30" fill="#fff7d8"/></g>';
    cut(dw, 660, 720, s, { pos: { x: -760, y: TY, z: -560 }, f: F_WARM });
  })();
  // hop ky vat (hop 3D that, nap mo)
  const BOX = { x: -230, z: -330, w: 340, d: 230, h: 150 };
  (function () {
    const bx = BOX.x, bz = BOX.z, hw = BOX.w, hd = BOX.d, hh = BOX.h, yc = TY - hh / 2;
    const side = "background:linear-gradient(#4b7d84,#335a60);border:6px solid " + INK + ";";
    floorPlane(dw, bx, TY - 2, bz, hw, hd, "background:#22393c;");
    plane(dw, { x: bx, y: yc, z: bz - hd / 2 }, hw, hh, side);
    plane(dw, { x: bx - hw / 2, y: yc, z: bz, rotationY: 90 }, hd, hh, side);
    plane(dw, { x: bx + hw / 2, y: yc, z: bz, rotationY: 90 }, hd, hh, side);
    // do ben trong (gang tay, the, qua thong)
    cut(dw, 120, 150, fp("M 30 150 L 26 60 C 24 30 40 14 60 18 C 70 4 96 8 96 34 L 98 150 Z", TERRA, 5) + fp("M 24 64 C 6 60 4 90 26 96", TERRA, 5) + sk("M 30 120 L 96 120", 5, PAPER), { pos: { x: bx - 90, y: TY - 30, z: bz - 20 }, f: F_WARM });
    cut(dw, 130, 170, fp("M 10 170 L 20 20 L 120 30 L 112 170 Z", PAPER, 5) + fp("M 34 50 L 98 56 L 92 120 L 30 114 Z", "#cfe3ec", 3) + fp("M 30 114 L 52 80 L 66 98 L 78 84 L 92 120 Z", SNOW, 3), { pos: { x: bx + 10, y: TY - 30, z: bz - 50, rotationZ: 6 }, f: F_WARM });
    cut(dw, 100, 120, fp("M 50 6 C 86 30 92 80 50 116 C 8 80 14 30 50 6 Z", "#8a5a3b", 5) + sk("M 30 40 L 70 40 M 24 64 L 76 64 M 30 88 L 70 88", 3, INK, ' opacity=".5"'), { pos: { x: bx + 105, y: TY - 30, z: bz - 10 }, f: F_WARM });
    plane(dw, { x: bx, y: yc, z: bz + hd / 2 }, hw, hh, side + "box-shadow: inset 0 -10px 0 rgba(0,0,0,.18);");
    // nhan giay tren mat hop (khong chu)
    plane(dw, { x: bx, y: yc + 6, z: bz + hd / 2 + 1 }, 150, 56, "background:" + PAPER + ";border:4px solid " + INK + ";border-radius:6px;");
    const lid = P(dw, { x: bx, y: TY - hh, z: bz - hd / 2, rotationX: 18 });
    div("face", lid, "left:" + (-hw / 2) + "px;top:" + (-hd) + "px;width:" + hw + "px;height:" + hd + "px;background:linear-gradient(#5d9097,#3F6A70);border:6px solid " + INK + ";");
  })();
  // ong but phia truoc (lop gan, mo nhoe)
  cut(dw, 220, 330, fp("M 30 330 L 20 120 L 200 120 L 190 330 Z", TEAL, 7) + sk("M 24 170 L 196 170", 5, PAPER) + fp("M 60 120 L 40 10 L 70 10 L 84 120 Z", "#e7b34b", 5) + fp("M 110 120 L 120 30 L 146 32 L 136 120 Z", TERRA, 5) + fp("M 150 120 L 176 0 L 196 6 L 170 120 Z", SEA, 5),
    { pos: { x: -880, y: TY, z: 380 }, f: "drop-shadow(2px 3px 0 #a8946c) blur(5px)" });

  // So du lich (nam phang tren ban, lat bia, trang pop-up)
  const NB = { x: 540, z: -300, w: 380, d: 500 };
  const book = P(dw, { x: NB.x, y: TY - 3, z: NB.z, rotationX: 90 });
  div("face", book, "left:-12px;top:" + (-NB.d / 2 - 12) + "px;width:" + (NB.w + 24) + "px;height:" + (NB.d + 24) + "px;background:#a9522f;border:6px solid " + INK + ";border-radius:10px;");
  // trang phai: ky hoa
  const pageR = P(book, { z: 1 });
  pageR.insertAdjacentHTML("beforeend", '<svg class="cut" width="' + NB.w + '" height="' + NB.d + '" viewBox="0 0 380 500" style="left:0;top:-250px">' +
    '<rect x="0" y="0" width="380" height="500" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="5"/>' +
    (function () { let s = ""; for (let y = 60; y < 480; y += 34) s += sk("M 24 " + y + " L 356 " + y, 2, "#9fb7c4", ' opacity=".5"'); return s; })() +
    sk("M 30 470 C 90 440 120 470 180 450 C 240 430 300 460 350 440", 3, INK, ' stroke-dasharray="2 10"') + "</svg>");
  // lop pop-up (ban le o day, nam phang roi bat dung)
  function popLayer(w, h, hingeY, x, inner, zz) {
    const p = P(book, { x: x, y: hingeY, z: zz, rotationX: 0 });
    p.insertAdjacentHTML("beforeend", '<svg class="cut" data-layout-allow-occlusion data-layout-allow-overlap width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h + '" style="left:' + (-w / 2) + "px;top:" + (-h) + 'px;filter:drop-shadow(2px 3px 0 #a8946c) drop-shadow(8px 10px 6px rgba(25,12,0,.35))">' + inner + "</svg>");
    return p;
  }
  const popHills = popLayer(360, 150, -110, 190,
    fp("M 4 150 L 4 96 Q 40 40 80 70 Q 120 10 170 60 Q 220 0 270 56 Q 310 30 356 80 L 356 150 Z", SNOW, 5) + sk("M 120 34 Q 132 60 116 86 M 222 18 Q 236 50 220 80", 3, ICE2, ' opacity=".7"') + sk("M 30 110 Q 120 96 200 112 Q 280 126 340 108", 3, ICE2, ' opacity=".6"'), 2);
  const popHouses = popLayer(330, 150, -10, 180,
    (function () {
      let s = fp("M 0 150 L 0 130 Q 160 110 330 130 L 330 150 Z", SNOW, 4);
      [[30, 70, 90], [150, 60, 80], [240, 74, 70]].forEach(function (h) {
        const x = h[0], hw = h[1], hy = 150 - h[2];
        s += fp("M " + x + " 140 L " + x + " " + (hy + 22) + " L " + (x + hw) + " " + (hy + 22) + " L " + (x + hw) + " 140 Z", WOOD, 4);
        s += fp("M " + (x - 8) + " " + (hy + 26) + " L " + (x + hw / 2) + " " + hy + " L " + (x + hw + 8) + " " + (hy + 26) + " Z", SNOW, 4);
        s += fp("M " + (x + hw * 0.3) + " " + (hy + 50) + " h 18 v 18 h -18 Z", WIN, 3);
        s += fp("M " + (x + hw - 18) + " " + (hy + 2) + " v -22 h 12 v 26 Z", "#7a4a3a", 3);
        for (let k = 0; k < 3; k++) s += '<circle cx="' + (x + hw - 12) + '" cy="' + (hy - 30 - k * 18) + '" r="' + (6 + k * 2) + '" fill="#fff" stroke="' + INK + '" stroke-width="2.5"/>';
      });
      return s;
    })(), 3);
  function signSVG() {
    return fp("M 46 330 L 50 140 L 70 140 L 66 330 Z", WOOD, 5) + fp("M 274 330 L 270 140 L 290 140 L 294 330 Z", WOOD, 5) +
      fp("M 10 24 L 330 18 L 334 168 L 6 172 Z", PAPER, 7) + fp(lumpy(8, 332, 24, -14, 9, 5) + " L 332 18 C 300 4 40 6 8 24 Z", SNOW, 4) +
      txt(170, 90, 47, 800, "OYMYAKON") + txt(170, 150, 44, 700, "pop. ~500", TEAL) +
      fp(lumpy(30, 310, 330, -22, 6, 9) + " L 310 330 Z", SNOW, 4);
  }
  const popSign = popLayer(340, 330, 120, 190, signSVG(), 4);
  const popTiny = popLayer(320, 70, 215, 190,
    (function () { let s = ""; for (let i = 0; i < 5; i++) { const x = 16 + i * 62; s += fp("M " + x + " 70 L " + x + " 36 L " + (x + 40) + " 36 L " + (x + 40) + " 70 Z", WOOD, 3) + fp("M " + (x - 5) + " 38 L " + (x + 20) + " 14 L " + (x + 45) + " 38 Z", SNOW, 3) + '<rect x="' + (x + 14) + '" y="46" width="11" height="11" fill="' + WIN + '" stroke="' + INK + '" stroke-width="2"/>'; } return s; })(), 5);
  // bia so (2 mat), ban le o gay
  const cover = P(book, { z: 7, rotationY: 0 });
  div("face bfh", cover, "left:0;top:-250px;width:380px;height:500px;background:#b85c35;border:6px solid " + INK + ";border-radius:4px 10px 10px 4px;box-shadow: inset 0 0 0 14px #b85c35, inset 0 0 0 17px rgba(255,236,200,.6);");
  const coverIn = P(cover, { x: 190, rotationY: 180 });
  coverIn.insertAdjacentHTML("beforeend", '<svg class="cut bfh" width="380" height="500" viewBox="0 0 380 500" style="left:-190px;top:-250px;backface-visibility:hidden">' +
    '<rect x="0" y="0" width="380" height="500" fill="' + PAPER + '" stroke="' + INK + '" stroke-width="5"/>' +
    (function () { let s = ""; for (let y = 60; y < 480; y += 34) s += sk("M 24 " + y + " L 356 " + y, 2, "#9fb7c4", ' opacity=".5"'); return s; })() +
    sk("M 120 140 l 0 -60 M 90 110 l 60 0 M 99 89 l 42 42 M 141 89 l -42 42", 5, ICE2) +
    fp("M 230 300 l 70 0 l -6 70 l -58 0 Z", PAPER, 4) + sk("M 300 316 c 24 0 24 30 -4 30", 4) + sk("M 250 290 c -8 -14 8 -20 0 -34 M 272 290 c -8 -14 8 -20 0 -34", 3, INK, ' opacity=".6"') +
    fp("M 60 330 C 70 300 150 300 160 330 L 160 400 L 60 400 Z", "#cfe3ec", 3) + "</svg>");
  // dai chun giu bia
  plane(cover, { x: 330, y: 0, z: 1 }, 18, 500, "background:#2f3b3c;");

  // Wob o ban (canh 1)
  const wobD = makeWob(dw, "d", { x: 250, y: TY, z: 70, s: 0.9, f: "drop-shadow(2px 3px 0 #a8946c) drop-shadow(18px 10px 8px rgba(25,12,0,.45))" });
  // ca trong tay trai
  wobD.holdL.insertAdjacentHTML("beforeend", '<g class="hfish">' + fishSVG("") + "</g>");
  const hfish = wobD.holdL.querySelector(".hfish");
  // coc nong trong tay phai (canh 5)
  wobD.holdR.insertAdjacentHTML("beforeend", '<g class="mug" opacity="0">' + fp("M -40 -60 L 40 -60 L 34 20 L -34 20 Z", PAPER, 6) + sk("M 40 -44 C 66 -44 66 -6 36 -6", 6) + sk("M -38 -34 L 38 -34", 6, TERRA) +
    '<g class="msteam">' + sk("M -16 -74 C -30 -96 -2 -110 -16 -134", 5, "#fff", ' opacity=".9"') + sk("M 12 -72 C -2 -94 26 -108 12 -132", 5, "#fff", ' opacity=".9"') + "</g></g>");
  const mug = wobD.holdR.querySelector(".mug"), msteam = wobD.holdR.querySelector(".msteam");
  // ca dung tren ban (sau khi Wob dat xuong)
  const standFish = cut(dw, 120, 300, '<g transform="translate(60 150) rotate(-90)">' + fishSVG("") + "</g>", { pos: { x: 0, y: 0, z: 0 }, f: F_WARM, ay: 300 });
  // ca mem oat (canh 5): vat tren mep hop, dau ru xuong
  const limp = cut(dw, 420, 260,
    '<g transform="translate(150 60)">' + fp("M -118 0 C -88 -30 0 -38 60 -30 C 80 -26 96 -16 104 -8 L 104 26 C 80 30 0 36 -118 0 Z", FISH2, 6) + fp("M -112 0 L -150 -28 C -142 -8 -142 10 -148 30 Z", FISH1, 5) +
    '<path d="M -110 2 C -60 20 20 30 100 24 L 100 30 C 20 36 -80 26 -110 2 Z" fill="' + FISH3 + '"/></g>' +
    '<g class="limpHead" transform="translate(250 72)"><g class="lhead">' + fp("M 0 -20 C 30 -18 60 -10 78 4 C 96 18 100 32 92 40 C 70 50 30 40 0 26 Z", FISH2, 6) + sk("M 30 -12 C 22 4 22 18 30 30", 4) +
    sk("M 58 6 C 62 12 70 12 74 6", 4) + sk("M 84 30 C 88 34 92 34 94 30", 3) + "</g></g>",
    { pos: { x: BOX.x + 40, y: TY - BOX.h + 62, z: BOX.z + BOX.d / 2 + 6 }, f: F_WARM, ax: 150, ay: 72 });
  const lhead = limp.svg.querySelector(".lhead");
  gsap.set(lhead, TF(0, 0, 28));
  const puddle = floorPlane(dw, BOX.x + 120, TY - 1, BOX.z + BOX.d / 2 + 70, 260, 110, "border-radius:50%;background:radial-gradient(closest-side, rgba(170,215,235,.85), rgba(150,200,225,.75) 70%, rgba(150,200,225,0));border:4px solid rgba(31,35,38,.6);");
  const drip = cut(dw, 30, 40, '<path d="M 15 2 C 22 16 28 24 28 30 C 28 38 2 38 2 30 C 2 24 8 16 15 2 Z" fill="#bfe3f0" stroke="' + INK + '" stroke-width="3"/>', { pos: { x: BOX.x + 120, y: TY - 120, z: BOX.z + BOX.d / 2 + 30 }, f: F_WARM });
  // bong thoai/hieu ung nho cho ban
  // vignette am
  div("ovl", deskStage, "background:radial-gradient(ellipse 75% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(12,6,2,.55) 100%);");

  // ================================================================== SAN KHAU 2: LANG OYMYAKON (hoi uc)
  const vStage = div("stage", root);
  const V = makeRig(vStage);
  const vw = V.camT;
  const GY = 300;
  // troi + mat troi thap mo (suong bang)
  plane(vw, { x: 1100, y: -1700, z: -2600 }, 16000, 7000, "background:radial-gradient(circle 420px at 6200px 3900px, rgba(255,250,228,.95), rgba(255,250,228,0) 70%), linear-gradient(#7fb2cc 0%, #a9cfe0 38%, #d6e9f0 58%, #eef6f8 70%);");
  // doi xa
  cut(vw, 11000, 900, fp("M 0 900 L 0 520 Q 500 300 1000 460 Q 1500 220 2100 420 Q 2600 180 3200 400 Q 3800 260 4400 430 Q 5000 200 5600 410 Q 6200 280 6800 440 Q 7400 240 8000 420 Q 8700 260 9300 450 Q 10000 300 11000 470 L 11000 900 Z", "#e9f2f5", 6) +
    sk("M 1500 240 Q 1560 340 1500 430 M 2600 200 Q 2680 300 2620 410 M 5000 220 Q 5080 320 5010 400 M 7400 260 Q 7460 340 7400 420", 6, "#a9c4d0"),
    { pos: { x: 1000, y: GY + 40, z: -2000 }, f: F_FARR });
  // suong xa
  plane(vw, { x: 1100, y: GY - 500, z: -1500 }, 14000, 1100, "background:linear-gradient(rgba(240,248,250,0), rgba(240,248,250,.85));");
  // mat dat tuyet
  floorPlane(vw, 1100, GY, -900, 16000, 3700,
    "background:radial-gradient(ellipse 1400px 500px at 4300px 2300px, rgba(130,175,200,.3), rgba(130,175,200,0)), repeating-linear-gradient(0deg, rgba(0,0,0,0) 0 180px, rgba(120,165,190,.16) 180px 186px), linear-gradient(#d3e4ec, #f4f9fb);");
  // khoi bay thang dung: chuoi tron giay
  const SMOKES = [];
  function smoke(parent, x, y, z, scale, far) {
    const p = P(parent, { x: x, y: y, z: z });
    let s = ""; const n = 10;
    for (let i = 0; i < n; i++) s += '<circle class="pf" cx="60" cy="560" r="' + (14 + i) + '" fill="#f4f7f8" stroke="' + (far ? "#b9c9d0" : INK) + '" stroke-width="' + (far ? 2 : 3) + '"/>';
    p.insertAdjacentHTML("beforeend", '<svg class="cut" width="' + (120 * scale) + '" height="' + (600 * scale) + '" viewBox="0 0 120 600" style="left:' + (-60 * scale) + "px;top:" + (-580 * scale) + "px;" + (far ? "filter:blur(1.2px);" : "filter:" + F_COLDS + ";") + '">' + s + "</svg>");
    SMOKES.push({ els: p.querySelectorAll(".pf"), n: n });
    return p;
  }
  // nha go (lo cua tuy chon)
  function houseSVG(w, h, o) {
    o = o || {};
    const wt = Math.round(h * 0.42), r = mulberry32(o.seed || 11);
    let s = "";
    if (o.chim != null) s += fp("M " + o.chim + " " + (wt - 30) + " L " + o.chim + " " + Math.round(h * 0.12) + " L " + (o.chim + 44) + " " + Math.round(h * 0.12) + " L " + (o.chim + 44) + " " + (wt - 30) + " Z", "#7a4a3a", 5) + fp("M " + (o.chim - 6) + " " + Math.round(h * 0.12) + " C " + o.chim + " " + Math.round(h * 0.12 - 18) + " " + (o.chim + 44) + " " + Math.round(h * 0.12 - 18) + " " + (o.chim + 50) + " " + Math.round(h * 0.12) + " Z", SNOW, 4);
    let wall = "M 24 " + wt + " L " + (w - 24) + " " + wt + " L " + (w - 24) + " " + h + " L 24 " + h + " Z";
    if (o.door) wall += " M " + o.door[0] + " " + h + " L " + o.door[0] + " " + (h - o.door[2] + 20) + " Q " + (o.door[0] + o.door[1] / 2) + " " + (h - o.door[2] - 8) + " " + (o.door[0] + o.door[1]) + " " + (h - o.door[2] + 20) + " L " + (o.door[0] + o.door[1]) + " " + h + " Z";
    s += fp(wall, o.col || WOOD, 6, ' fill-rule="evenodd"');
    for (let y = wt + 28; y < h - 6; y += 30) {
      if (o.door && y > h - o.door[2]) { s += sk("M 30 " + y + " L " + (o.door[0] - 6) + " " + y, 3, WOOD2) + sk("M " + (o.door[0] + o.door[1] + 6) + " " + y + " L " + (w - 30) + " " + y, 3, WOOD2); }
      else s += sk("M 30 " + y + " L " + (w - 30) + " " + y, 3, WOOD2);
    }
    s += fp("M 0 " + (wt + 16) + " L " + (w / 2) + " " + Math.round(h * 0.08) + " L " + w + " " + (wt + 16) + " Z", "#4a3122", 6);
    s += fp("M -6 " + (wt + 20) + " L " + (w / 2) + " " + Math.round(h * 0.06) + " L " + (w + 6) + " " + (wt + 20) + " " + lumpy(w + 6, -6, wt + 20, 22, 10, o.seed || 4).replace(/^M [\d.\-]+ [\d.\-]+/, "") + " Z", SNOW, 6);
    (o.wins || []).forEach(function (wi) {
      s += fp("M " + wi[0] + " " + wi[1] + " h " + wi[2] + " v " + wi[3] + " h " + (-wi[2]) + " Z", WIN, 5) + sk("M " + (wi[0] + wi[2] / 2) + " " + wi[1] + " v " + wi[3] + " M " + wi[0] + " " + (wi[1] + wi[3] / 2) + " h " + wi[2], 4) +
        '<path d="M ' + (wi[0] + 3) + " " + (wi[1] + 3) + " l " + (wi[2] * 0.35) + " 0 l " + (-wi[2] * 0.35) + " " + (wi[3] * 0.35) + ' z" fill="#fff" opacity=".8"/>' +
        fp("M " + (wi[0] - 10) + " " + (wi[1] + wi[3]) + " h " + (wi[2] + 20) + " v 12 h " + (-wi[2] - 20) + " Z", PAPER, 4);
    });
    s += fp(lumpy(10, w - 10, h, -18 - 10 * r(), 8, (o.seed || 4) + 3) + " L " + (w - 10) + " " + h + " Z", SNOW, 5);
    return s;
  }
  // day nha xa
  for (let i = 0; i < 16; i++) {
    const x = -2600 + i * 560 + rr(-90, 90), hw = rr(260, 360), hh = rr(240, 320);
    cut(vw, hw, hh, houseSVG(hw, hh, { chim: hw * 0.62, wins: [[hw * 0.25, hh * 0.58, 40, 34]], seed: 20 + i }), { pos: { x: x, y: GY, z: -1150 }, f: F_FAR });
    smoke(vw, x - hw / 2 + hw * 0.62 + 22, GY - hh * 0.88, -1152, 0.9, true);
  }
  plane(vw, { x: 1100, y: GY - 300, z: -800 }, 14000, 700, "background:linear-gradient(rgba(240,248,250,0), rgba(240,248,250,.6));");

  // Nha A: cua mo + nhiet ke
  const HA = { x: -760, z: -360, w: 780, h: 760 };
  const DOOR = { lx: 110, w: 230, h: 360 }; // trong he toa do nha
  const houseA = cut(vw, HA.w, HA.h, houseSVG(HA.w, HA.h, { chim: 560, door: [DOOR.lx, DOOR.w, DOOR.h], wins: [[600, 470, 110, 96]], seed: 7 }), { pos: { x: HA.x, y: GY, z: HA.z }, f: F_COLD });
  const smokeA = smoke(vw, HA.x - HA.w / 2 + 582, GY - HA.h * 0.88 + 10, HA.z - 2, 1.3, false);
  const doorX0 = HA.x - HA.w / 2 + DOOR.lx;
  // long nha toi phia sau lo cua
  plane(vw, { x: doorX0 + DOOR.w / 2, y: GY - DOOR.h / 2, z: HA.z - 150 }, DOOR.w + 120, DOOR.h + 40, "background:radial-gradient(ellipse at 50% 70%, #8a5a2c, #2a1a10 75%);");
  floorPlane(vw, doorX0 + DOOR.w / 2, GY - 1, HA.z - 75, DOOR.w + 120, 150, "background:#3a2616;");
  plane(vw, { x: doorX0 - 20, y: GY - DOOR.h / 2, z: HA.z - 75, rotationY: 90 }, 150, DOOR.h + 40, "background:#24160d;");
  plane(vw, { x: doorX0 + DOOR.w + 20, y: GY - DOOR.h / 2, z: HA.z - 75, rotationY: 90 }, 150, DOOR.h + 40, "background:#24160d;");
  const door = cut(vw, DOOR.w, DOOR.h, fp("M 4 " + DOOR.h + " L 4 26 Q " + (DOOR.w / 2) + " -10 " + (DOOR.w - 4) + " 26 L " + (DOOR.w - 4) + " " + DOOR.h + " Z", "#8a5a3b", 6) +
    sk("M 40 60 L 40 330 M 80 40 L 80 340 M 120 36 L 120 340 M 160 40 L 160 340 M 196 56 L 196 330", 3, WOOD2) + fp("M 14 120 h 200 v 26 h -200 Z M 14 260 h 200 v 26 h -200 Z", PAPER2, 4) + '<circle cx="196" cy="200" r="11" fill="' + TERRA + '" stroke="' + INK + '" stroke-width="4"/>',
    { pos: { x: doorX0, y: GY, z: HA.z + 4, rotationY: 0 }, ax: 0, ay: DOOR.h, f: F_COLDS });
  // nhiet ke tren tuong
  const thermo = cut(vw, 230, 600,
    fp("M 20 30 C 20 12 30 8 46 8 L 184 8 C 200 8 210 12 210 30 L 210 572 C 210 588 200 592 184 592 L 46 592 C 30 592 20 588 20 572 Z", PAPER, 7) +
    '<circle cx="115" cy="24" r="6" fill="' + INK + '"/>' +
    fp("M 101 50 C 101 40 129 40 129 50 L 129 352 L 101 352 Z", "#ffffff", 5) +
    (function () { let s = ""; for (let i = 0; i < 14; i++) s += sk("M 138 " + (70 + i * 20) + " L " + (i % 2 ? 152 : 162) + " " + (70 + i * 20), 3); return s; })() +
    '<rect class="merc" x="108" y="64" width="14" height="300" rx="5" fill="' + MAT + '"/>' +
    '<circle cx="115" cy="384" r="30" fill="' + MAT + '" stroke="' + INK + '" stroke-width="6"/>' + sk("M 104 372 Q 108 366 116 366", 4, "#fff", ' opacity=".7"') +
    txt(115, 476, 50, 900, "−46°C") + txt(115, 546, 50, 900, "−51°F", TEAL),
    { pos: { x: HA.x + 50, y: GY - 14, z: HA.z + 8, scale: 0.72 }, f: F_COLDS });
  const merc = thermo.svg.querySelector(".merc");
  gsap.set(merc, { smoothOrigin: false, svgOrigin: "115 364", scaleY: 1 });
  const thermoFrost = null;
  // bien ten lang
  const signV = cut(vw, 340, 330, signSVG(), { pos: { x: -1330, y: GY, z: -120 }, f: F_COLD });

  // Nha B, C, D, E
  const houseB = cut(vw, 620, 560, houseSVG(620, 560, { chim: 420, wins: [[110, 330, 100, 90], [400, 330, 100, 90]], seed: 31 }), { pos: { x: 280, y: GY, z: -420 }, f: F_COLD });
  smoke(vw, 280 - 310 + 442, GY - 560 * 0.88 + 8, -422, 1.2, false);
  cut(vw, 700, 600, houseSVG(700, 600, { chim: 160, wins: [[420, 350, 120, 100]], seed: 41, col: "#5f4430" }), { pos: { x: 1520, y: GY, z: -520 }, f: F_COLD });
  smoke(vw, 1520 - 350 + 182, GY - 600 * 0.88 + 8, -522, 1.2, false);
  cut(vw, 640, 580, houseSVG(640, 580, { chim: 470, wins: [[90, 340, 110, 96], [300, 340, 110, 96]], seed: 51 }), { pos: { x: 2700, y: GY, z: -560 }, f: F_COLD });
  smoke(vw, 2700 - 320 + 492, GY - 580 * 0.88 + 8, -562, 1.2, false);
  cut(vw, 600, 540, houseSVG(600, 540, { chim: 120, wins: [[330, 320, 110, 96]], seed: 61, col: "#5f4430" }), { pos: { x: 3700, y: GY, z: -520 }, f: F_COLD });
  smoke(vw, 3700 - 300 + 142, GY - 540 * 0.88 + 8, -522, 1.2, false);
  // suong gan mat dat
  plane(vw, { x: 1100, y: GY - 120, z: -300 }, 14000, 240, "background:linear-gradient(rgba(244,250,252,0), rgba(244,250,252,.55));");

  // Quay cho
  const ST = { x: 1520, z: -200 };
  (function () {
    let s = fp("M 40 520 L 44 90 L 64 90 L 60 520 Z", WOOD, 5) + fp("M 540 520 L 536 90 L 556 90 L 560 520 Z", WOOD, 5);
    s += fp("M 70 200 L 530 200 L 530 216 L 70 216 Z", WOOD, 4);
    for (let i = 0; i < 5; i++) { const x = 110 + i * 86; s += '<g transform="translate(' + x + ' 250) rotate(90) scale(.42)">' + fishSVG("") + "</g>"; }
    s += sk("M 70 196 L 530 196", 3);
    let aw = "M 10 110 L 590 110 L 590 40 L 10 40 Z";
    s += fp(aw, PAPER, 6);
    for (let i = 0; i < 8; i += 2) s += '<path d="M ' + (10 + i * 72.5) + " 40 h 72.5 v 70 h -72.5 Z" + '" fill="' + TERRA + '"/>';
    let sc = "M 10 110"; for (let i = 0; i < 8; i++) sc += " q 36.25 34 72.5 0"; s += fp(sc + " Z", TERRA, 5);
    s += fp(lumpy(4, 596, 42, -20, 10, 13) + " L 596 42 L 4 42 Z", SNOW, 5);
    cut(vw, 600, 520, s, { pos: { x: ST.x, y: GY, z: ST.z - 70 }, f: F_COLD });
  })();
  // ban tay deo gang (khong mat nguoi), cam ca
  const glove = P(vw, { x: ST.x - 80, y: GY + 40, z: ST.z - 15 });
  glove.insertAdjacentHTML("beforeend", '<svg class="cut" width="420" height="520" viewBox="0 0 420 520" style="left:-210px;top:-520px;filter:' + F_COLDS + '">' +
    '<g class="gfish"><g transform="translate(232 250) rotate(90) scale(.8)"><g class="gfr">' + fishSVG("") + "</g></g></g>" +
    fp("M 220 520 L 214 260 C 214 230 290 230 292 262 L 300 520 Z", "#2f3b3c", 6) + fp("M 206 270 C 206 240 300 240 302 270 L 304 300 C 280 312 230 312 206 300 Z", PAPER, 5) +
    fp("M 212 270 C 190 230 196 170 230 150 C 250 136 284 150 292 180 C 300 210 296 246 290 270 Z", TEAL, 6) + fp("M 216 200 C 186 196 176 170 196 160 C 210 152 226 168 228 186", TEAL, 5) +
    sk("M 226 236 C 246 242 270 242 288 236", 4, PAPER, ' opacity=".7"') + "</svg>");
  const gfish = glove.querySelector(".gfish"), gfr = glove.querySelector(".gfr");
  gsap.set(gfr, TF(0, 0, 0));
  // mat quay (lop truoc tay)
  (function () {
    let s = fp("M 20 230 L 20 30 L 520 30 L 520 230 Z", "#8a5a3b", 6);
    for (let x = 80; x < 520; x += 70) s += sk("M " + x + " 40 L " + x + " 224", 3, WOOD2);
    s += fp("M 6 34 L 534 34 L 534 8 L 6 8 Z", PAPER2, 5) + fp(lumpy(6, 534, 10, -14, 9, 17) + " L 534 10 Z", SNOW, 4);
    s += '<g transform="translate(150 -16) scale(.5)">' + fishSVG("") + '</g><g transform="translate(300 -14) scale(.5) rotate(6)">' + fishSVG("") + "</g>";
    s += fp(lumpy(16, 524, 230, -16, 8, 19) + " L 524 230 Z", SNOW, 5);
    cut(vw, 540, 230, s, { pos: { x: ST.x, y: GY, z: ST.z, scaleY: 0.74 }, f: F_COLD, ay: 230 });
  })();
  // thung ca dung dung nhu bo cui
  (function () {
    let s = "";
    const tilts = [-9, -4, 2, 6, 10, -6, 4];
    for (let i = 0; i < 7; i++) { const x = 40 + i * 26, y = 190 - (i % 3) * 18; s += '<g transform="translate(' + x + " " + y + ") rotate(" + (-90 + tilts[i]) + ') scale(.62)">' + fishSVG("") + "</g>"; }
    cut(vw, 240, 300, s, { pos: { x: ST.x + 380, y: GY - 80, z: ST.z + 140 }, f: F_COLDS });
    let b = fp("M 20 20 C 60 4 140 4 180 20 L 172 190 C 130 204 70 204 28 190 Z", "#8a5a3b", 6);
    b += sk("M 22 60 C 70 72 130 72 178 60", 6, "#3a3f42") + sk("M 26 150 C 70 162 130 162 174 150", 6, "#3a3f42");
    for (let x = 50; x < 170; x += 30) b += sk("M " + x + " 14 L " + (x + 2) + " 196", 3, WOOD2);
    b += fp(lumpy(28, 172, 194, -10, 5, 23) + " L 172 194 Z", SNOW, 4);
    cut(vw, 200, 210, b, { pos: { x: ST.x + 380, y: GY, z: ST.z + 175 }, f: F_COLD });
  })();

  // Xe no may, ghe trong
  const CAR = { x: 2860, z: -40 };
  const carP = P(vw, { x: CAR.x, y: GY, z: CAR.z });
  const carBody = P(carP, {});
  carBody.insertAdjacentHTML("beforeend", '<svg class="cut" width="660" height="330" viewBox="0 0 660 330" style="left:-330px;top:-330px;filter:' + F_COLD + '">' +
    fp("M 30 250 L 30 120 C 30 70 60 46 120 44 L 520 40 C 600 40 630 70 632 140 L 634 250 C 634 270 620 276 600 276 L 60 276 C 40 276 30 270 30 250 Z", "#7fa39e", 7) +
    fp("M 36 200 L 630 200 L 630 222 L 36 222 Z", PAPER, 4) +
    fp(lumpy(70, 600, 46, -18, 8, 29) + " L 600 46 C 560 30 110 30 70 46 Z", SNOW, 5) +
    // cua so lai: ghe trong + vo lang
    fp("M 70 90 L 220 86 L 222 176 L 64 176 Z", "#cfe7f1", 5) +
    fp("M 150 176 L 150 112 C 150 98 196 98 196 112 L 196 176 Z", "#8a5a3b", 4) + fp("M 158 104 C 158 88 188 88 188 104 Z", "#8a5a3b", 4) +
    sk("M 84 150 C 90 128 118 124 128 146", 6) +
    '<path d="M 74 96 l 40 -2 l -38 40 z" fill="#fff" opacity=".7"/>' +
    fp("M 250 86 L 400 84 L 400 176 L 250 176 Z", "#cfe7f1", 5) + fp("M 430 84 L 590 84 C 606 84 612 96 612 116 L 612 176 L 430 176 Z", "#cfe7f1", 5) +
    sk("M 236 80 L 236 270 M 416 80 L 416 270", 4) + '<rect x="250" y="190" width="30" height="8" rx="3" fill="' + INK + '"/>' +
    fp("M 24 170 C 14 170 14 196 24 196 L 40 196 L 40 170 Z", "#ffe08a", 4) +
    fp(lumpy(40, 620, 276, 10, 10, 33) + " L 620 276 Z", SNOW, 4) +
    fp("M 610 262 L 652 262 L 652 276 L 610 276 Z", "#3a3f42", 4) +
    "</svg>");
  const wheels = [];
  [150, 500].forEach(function (wx) {
    const wp = cut(carP, 120, 120, '<circle cx="60" cy="60" r="52" fill="#2b2f31" stroke="' + INK + '" stroke-width="6"/><circle cx="60" cy="60" r="22" fill="' + PAPER2 + '" stroke="' + INK + '" stroke-width="5"/>' + sk("M 60 42 L 60 78 M 42 60 L 78 60", 4), { pos: { x: wx - 330, y: 0, z: 2 }, f: F_COLDS });
    wheels.push(wp);
  });
  // khoi ong xa
  const exhaust = P(vw, { x: CAR.x + 330, y: GY - 62, z: CAR.z + 4 });
  exhaust.insertAdjacentHTML("beforeend", '<svg class="cut" width="400" height="300" viewBox="0 0 400 300" style="left:-10px;top:-260px;overflow:visible;filter:' + F_COLDS + '">' +
    (function () { let s = ""; for (let i = 0; i < 8; i++) s += '<circle class="ex" cx="20" cy="250" r="16" fill="#eef3f5" stroke="' + INK + '" stroke-width="3"/>'; return s; })() + "</svg>");
  const exPuffs = exhaust.querySelectorAll(".ex");
  // xe phu tuyet, tat may
  const snowCar = cut(vw, 620, 300,
    fp("M 20 300 C 10 200 40 120 120 100 C 200 60 420 50 520 100 C 600 130 620 220 606 300 Z", SNOW, 7) +
    sk("M 120 140 C 220 110 400 110 500 150", 5, "#a9c4d0") + sk("M 80 230 C 200 210 420 210 560 236", 5, "#a9c4d0") +
    fp("M 56 276 C 56 236 120 236 120 276 Z", "#2b2f31", 5) + fp("M 470 276 C 470 236 534 236 534 276 Z", "#2b2f31", 5) +
    fp("M 590 180 L 618 170 L 620 196 L 594 200 Z", "#7fa39e", 4) +
    '<path d="M 180 290 l 8 26 l 8 -26 z M 300 292 l 7 22 l 7 -22 z" fill="' + FROST + '" stroke="' + INK + '" stroke-width="3"/>',
    { pos: { x: CAR.x + 640, y: GY, z: CAR.z - 200 }, f: F_COLD });
  const icicle = cut(vw, 30, 50, '<path d="M 4 4 L 26 4 L 15 46 Z" fill="' + FROST + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>', { pos: { x: CAR.x + 640 - 310 + 420, y: GY - 8, z: CAR.z - 196 }, f: F_COLDS });

  // Lop gan (nho, mo): bo rao + u tuyet
  function fenceSVG(w, seed) {
    let s = ""; const r = mulberry32(seed);
    for (let x = 30; x < w - 20; x += 120) s += fp("M " + x + " 300 L " + (x + 4) + " " + (60 + r() * 30) + " L " + (x + 34) + " " + (54 + r() * 30) + " L " + (x + 38) + " 300 Z", WOOD, 6) + fp("M " + (x - 4) + " " + (64 + r() * 20) + " C " + x + " 40 " + (x + 38) + " 40 " + (x + 42) + " " + (60 + r() * 20) + " Z", SNOW, 4);
    s += fp("M 10 130 L " + (w - 10) + " 124 L " + (w - 10) + " 146 L 10 152 Z", "#8a5a3b", 5) + fp("M 10 210 L " + (w - 10) + " 204 L " + (w - 10) + " 226 L 10 232 Z", "#8a5a3b", 5);
    s += fp(lumpy(0, w, 300, -60, 6, seed + 1) + " L " + w + " 300 Z", SNOW, 6);
    return s;
  }
  const FENCES = [];
  [[-1700, 900], [-120, 700], [880, 520], [1880, 560], [4100, 900]].forEach(function (f, i) {
    FENCES[i] = cut(vw, f[1], 300, fenceSVG(f[1], 70 + i), { pos: { x: f[0], y: GY + 30, z: 230 }, f: F_FG });
  });

  // Tu dong khong lo (chi hien luc "the village itself is the freezer")
  const FZ = { x0: -2000, x1: 4200, yT: -1800, yB: GY, zB: -2700, zF: 1000 };
  const frz = P(vw, {});
  gsap.set(frz, { visibility: "hidden" });
  const frzLeaves = [];
  (function () {
    const W = FZ.x1 - FZ.x0, H = FZ.yB - FZ.yT, Dp = FZ.zF - FZ.zB, cx = (FZ.x0 + FZ.x1) / 2, cy = (FZ.yT + FZ.yB) / 2, cz = (FZ.zB + FZ.zF) / 2;
    const wallCss = "background:linear-gradient(90deg, #dfeef4, #f4fafc 40%, #e6f2f6);";
    frzLeaves.push(plane(frz, { x: FZ.x0, y: cy, z: cz, rotationY: 90 }, Dp, H, wallCss).face);
    frzLeaves.push(plane(frz, { x: FZ.x1, y: cy, z: cz, rotationY: 90 }, Dp, H, wallCss).face);
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yT, z: cz, rotationX: 90 }, W, Dp, "background:linear-gradient(#e9f4f8,#ffffff);").face);
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yT + 2, z: FZ.zF - 300, rotationX: 90 }, 1600, 120, "background:#fffbe6;box-shadow:0 0 80px 40px rgba(255,255,240,.9);border-radius:60px;").face);
    // vo tu (kem, vien muc) + can phong toi phia ngoai (cung tuong voi ban ky vat)
    const front = "background:linear-gradient(#f3ead2,#e2d6b6);border:22px solid " + INK + ";";
    const B = 650, R = 30000;
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yT - B / 2, z: FZ.zF }, W + 2 * B, B, front + "border-radius:120px 120px 0 0;").face);
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yB + B / 2, z: FZ.zF }, W + 2 * B, B, front + "border-radius:0 0 120px 120px;").face);
    frzLeaves.push(plane(frz, { x: FZ.x0 - B / 2, y: cy, z: FZ.zF }, B, H + 40, front).face);
    frzLeaves.push(plane(frz, { x: FZ.x1 + B / 2, y: cy, z: FZ.zF }, B, H + 40, front).face);
    const room = "background:repeating-linear-gradient(90deg, rgba(255,240,220,.035) 0 260px, rgba(0,0,0,0) 260px 520px), #2e2522;";
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yT - B - R / 2, z: FZ.zF - 60 }, R * 2, R, room).face);
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yB + B + R / 2, z: FZ.zF - 60 }, R * 2, R, "background:#5a3820;").face);
    frzLeaves.push(plane(frz, { x: FZ.x0 - B - R / 2, y: cy, z: FZ.zF - 60 }, R, H + 2 * B + 40, room).face);
    frzLeaves.push(plane(frz, { x: FZ.x1 + B + R / 2, y: cy, z: FZ.zF - 60 }, R, H + 2 * B + 40, room).face);
    // bang tuyet bam quanh mieng tu
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yT + 40, z: FZ.zF + 4 }, W, 80, "background:repeating-linear-gradient(90deg,#ffffff 0 70px,#d9eef7 70px 110px);border-bottom:10px solid " + INK + ";border-radius:0 0 40px 40px;").face);
    // gioang cao su + bang tuyet o mep
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yT + 30, z: FZ.zF + 2 }, W, 60, "background:repeating-linear-gradient(90deg,#ffffff 0 60px,#dff1f8 60px 90px);border-bottom:8px solid " + INK + ";").face);
    frzLeaves.push(plane(frz, { x: cx, y: FZ.yB + 40, z: FZ.zF + 2 }, W + 120, 80, "background:#9aa4a6;border:8px solid " + INK + ";").face);
  })();
  // hai canh cua
  const doors = [];
  [[FZ.x0, 1], [FZ.x1, -1]].forEach(function (d) {
    const W2 = (FZ.x1 - FZ.x0) / 2, H = FZ.yB - FZ.yT + 160;
    const hinge = P(frz, { x: d[0], y: (FZ.yT + FZ.yB) / 2, z: FZ.zF + 20, rotationY: d[1] > 0 ? -100 : 100 });
    const lf = div("face", hinge, "left:" + (d[1] > 0 ? 0 : -W2) + "px;top:" + (-H / 2) + "px;width:" + W2 + "px;height:" + H + "px;background:linear-gradient(90deg,#f6f8f7,#e3e9e7);border:16px solid " + INK + ";box-sizing:border-box;");
    div("face", lf, "left:" + (d[1] > 0 ? W2 - 260 : 140) + "px;top:" + (H / 2 - 500) + "px;width:90px;height:1000px;background:#c9d1d0;border:12px solid " + INK + ";border-radius:45px;");
    frzLeaves.push(lf); doors.push({ hinge: hinge, open: d[1] > 0 ? -100 : 100 });
  });
  // lop tuyet roi (khong gian man hinh, 2 lop)
  const snowFar = div("ovl", vStage, "");
  const snowNear = div("ovl", vStage, "");
  function flakes(layer, n, rmin, rmax, blur, seed) {
    const r = mulberry32(seed); let s = "";
    const data = [];
    for (let i = 0; i < n; i++) { const fx = r() * 1920, rad = rmin + r() * (rmax - rmin); data.push({ x: fx, r: rad, v: 70 + rad * 14 + r() * 40, ph: r(), sw: 10 + r() * 24 }); s += '<circle class="fl" cx="' + fx.toFixed(1) + '" cy="0" r="' + rad.toFixed(1) + '" fill="#ffffff" stroke="#b9c9d0" stroke-width="1.5"/>'; }
    layer.insertAdjacentHTML("beforeend", '<svg width="1920" height="1080" viewBox="0 0 1920 1080" style="position:absolute;left:0;top:0;overflow:visible;' + (blur ? "filter:blur(" + blur + "px);" : "") + '">' + s + "</svg>");
    const els = layer.querySelectorAll(".fl");
    const T0 = CUT_VILLAGE - 0.5, T1 = CUT_ANYWAY + 0.1;
    data.forEach(function (d, i) {
      const el = els[i], span = 1180, per = span / d.v;
      const y0 = -50 + d.ph * span, firstDur = (1130 - y0) / d.v;
      tl.fromTo(el, { y: y0 }, { y: 1130, duration: firstDur, ease: "none", immediateRender: true }, T0);
      const rest = T1 - (T0 + firstDur);
      if (rest > 0) tl.fromTo(el, { y: -50 }, { y: 1130, duration: per, ease: "none", repeat: Math.ceil(rest / per) - 1, immediateRender: false }, T0 + firstDur);
      const swPer = 1.6 + r() * 1.4;
      tl.fromTo(el, { x: -d.sw }, { x: d.sw, duration: swPer, ease: "sine.inOut", yoyo: true, repeat: Math.ceil((T1 - T0) / swPer), immediateRender: true }, T0);
    });
  }
  flakes(snowFar, 46, 2.2, 4.2, 0, 101);
  flakes(snowNear, 22, 7, 11, 1.6, 202);
  // mau lanh + vignette
  div("ovl", vStage, "background:linear-gradient(rgba(170,210,230,.12), rgba(0,0,0,0) 40%), radial-gradient(ellipse 78% 72% at 50% 46%, rgba(0,0,0,0) 58%, rgba(20,40,55,.42) 100%);");

  // Wob o lang (hoi uc): mu len + khan
  const wobV = makeWob(vw, "v", { x: doorX0 + DOOR.w / 2, y: GY, z: HA.z - 70, s: 0.8, f: "drop-shadow(2px 3px 0 #b9c9d0) drop-shadow(14px 9px 8px rgba(40,72,92,.38))", shadow: "rgba(60,95,120,.45)" });
  gsap.set([wobV.scarf, wobV.beanie], { opacity: 1 });
  addBubble(wobV, "soc", txt(101, 92, 76, 900, "?!", TERRA));
  addBubble(wobV, "bag", fp("M 72 44 L 130 44 L 136 108 L 66 108 Z", "#c9a46a", 5) + sk("M 86 44 C 86 22 116 22 116 44", 5) + sk("M 76 60 L 126 60", 3, INK, ' opacity=".4"'));
  addBubble(wobV, "dots", '<circle cx="66" cy="64" r="11" fill="' + INK + '"/><circle cx="101" cy="64" r="11" fill="' + INK + '"/><circle cx="136" cy="64" r="11" fill="' + INK + '"/>');
  addBubble(wobV, "vui", sk("M 70 64 C 70 40 100 40 100 62 C 100 40 130 40 130 64 C 130 84 100 98 100 104 C 100 98 70 84 70 64 Z", 5, TERRA));
  // do cam tay phai: tui giay, ca, coc tra
  wobV.holdR.insertAdjacentHTML("beforeend",
    '<g class="bfish" opacity="0">' + fishSVG("bfishIn") + "</g>" +
    '<g class="bag" opacity="0">' + '<g class="bagOk">' + fp("M -50 8 L 50 8 L 58 130 L -58 130 Z", "#c9a46a", 5) + sk("M -46 30 L 48 30", 3, INK, ' opacity=".35"') + "</g>" +
    '<g class="bagTorn" opacity="0">' + fp("M -50 8 L 50 8 L 58 130 L 40 116 L 26 134 L 10 112 L -6 134 L -22 112 L -38 132 L -58 120 Z", "#c9a46a", 5) + "</g>" +
    sk("M -26 10 C -26 -12 26 -12 26 10", 5) + "</g>" +
    '<g class="cup" opacity="0">' + '<g class="steam">' + sk("M -12 -80 C -28 -100 4 -116 -12 -140", 11, INK) + sk("M 16 -78 C 0 -98 32 -114 16 -138", 11, INK) + sk("M -12 -80 C -28 -100 4 -116 -12 -140", 6, "#ffffff") + sk("M 16 -78 C 0 -98 32 -114 16 -138", 6, "#ffffff") + "</g>" +
    '<g class="steamIce" opacity="0">' + fp("M -16 -80 C -32 -100 0 -116 -16 -140 L -6 -140 C -10 -116 -22 -100 -6 -80 Z", ICE, 3) + fp("M 12 -78 C -4 -98 28 -114 12 -138 L 22 -138 C 18 -114 6 -98 22 -78 Z", ICE, 3) + "</g>" +
    fp("M -42 -64 L 42 -64 L 36 18 L -36 18 Z", PAPER, 6) + sk("M 42 -48 C 70 -48 70 -8 38 -8", 6) + sk("M -40 -40 L 40 -40", 6, TERRA) +
    '<ellipse cx="0" cy="-62" rx="38" ry="7" fill="#8a4f24" stroke="' + INK + '" stroke-width="3"/>' +
    '<g class="cupIce" opacity="0">' + fp("M -44 -66 L 44 -66 L 44 -52 L 30 -50 L 26 -36 L 18 -50 L 0 -48 L -6 -30 L -14 -48 L -44 -50 Z", FROST, 3) + "</g></g>");
  const bfish = wobV.holdR.querySelector(".bfish"), bag = wobV.holdR.querySelector(".bag"), bagOk = wobV.holdR.querySelector(".bagOk"), bagTorn = wobV.holdR.querySelector(".bagTorn");
  const cup = wobV.holdR.querySelector(".cup"), steam = wobV.holdR.querySelector(".steam"), steamIce = wobV.holdR.querySelector(".steamIce"), cupIce = wobV.holdR.querySelector(".cupIce");
  const bfishIn = wobV.holdR.querySelector(".bfishIn");
  wobV.extra.insertAdjacentHTML("beforeend", '<g class="teaBlock" opacity="0">' + fp("M -34 -40 L 34 -40 L 30 40 L -30 40 Z", "#8a4f24", 6) + '<path d="M -24 -30 L -8 -30 L -14 20 Z" fill="#fff" opacity=".6"/>' + "</g>");
  const teaBlock = wobV.extra.querySelector(".teaBlock");
  // tia lap lanh tren ca
  wobV.holdR.insertAdjacentHTML("beforeend", '<g class="spark" opacity="0">' + [[-60, -60, 1], [10, -70, 0.8], [70, -40, 1.1], [-20, 40, 0.7]].map(function (p) { return '<path transform="translate(' + p[0] + " " + p[1] + ") scale(" + p[2] + ')" d="M 0 -18 L 5 -5 L 18 0 L 5 5 L 0 18 L -5 5 L -18 0 L -5 -5 Z" fill="#ffffff" stroke="' + INK + '" stroke-width="3"/>'; }).join("") + "</g>");
  const spark = wobV.holdR.querySelector(".spark");

  // ------------------------------------------------------------------ lop phu toan khung: hat giay
  root.insertAdjacentHTML("beforeend", '<svg class="ovl" width="1920" height="1080" style="mix-blend-mode:multiply;opacity:.5"><rect width="1920" height="1080" filter="url(#grain)"/></svg>');

  // ================================================================== TIMELINE
  // --- hien/an san khau
  gsap.set(vStage, { opacity: 0, visibility: "hidden" });
  tl.set(vStage, { visibility: "visible" }, CUT_VILLAGE - 0.01);
  tl.fromTo(vStage, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.inOut", immediateRender: false }, CUT_VILLAGE);
  tl.fromTo(deskStage, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power1.inOut", immediateRender: false }, CUT_VILLAGE);
  tl.set(deskStage, { visibility: "hidden" }, CUT_VILLAGE + 0.55);
  tl.set(vStage, { opacity: 0, visibility: "hidden" }, CUT_ANYWAY);
  tl.set(deskStage, { opacity: 1, visibility: "visible" }, CUT_ANYWAY);

  // ---------------- CANH 1 (ban)
  camSet(D, null, { cx: 160, cy: 40, cz: -200, k: -120, rx: -17, ry: 12 });
  camTo(D, 0, 2.3, { cx: 200, cy: 30, k: 60, ry: 7 }, "sine.inOut");
  camTo(D, 2.3, 1.4, { cx: 420, cy: 20, cz: -230, k: 140, ry: -2, rx: -16 }, "power2.inOut");
  camTo(D, 3.7, 6.0, { cx: 410, cy: 10, k: 250, ry: -9, rx: -14 }, "sine.inOut");
  camTo(D, 9.78, 0.32, { cx: 262, cy: -30, cz: 60, k: 640, rx: -5, ry: 0 }, "power3.out");
  camTo(D, 10.1, 0.85, { k: 670 }, "sine.inOut");
  camTo(D, 10.95, 1.4, { cx: NB.x + 190, cy: 150, cz: -330, k: 960, rx: -3, ry: 0 }, "power2.inOut");

  const w1 = wobD;
  // tu the dau: cam ca thap
  const L0 = 22;
  gsap.set(w1.armL, { rotation: L0, svgOrigin: "86 212" }); w1.arm.L = L0;
  gsap.set(hfish, holdPose("L", L0, 54, 220, -90 + 8));
  // dich ca: tam ca cach tay 96 theo truc ca
  function fishAt(armDeg, ang) { const h = handWorld("L", armDeg), a = ang * Math.PI / 180; return holdPose("L", armDeg, h[0] + 96 * Math.cos(a), h[1] + 96 * Math.sin(a), ang); }
  gsap.set(hfish, fishAt(L0, -82));
  look(w1, 0, -6, 2, 0.01);
  breathe(w1, 0, 12);
  // "fish" 0.8: gio ca len cao
  tl.to(w1.armL, { rotation: 150, svgOrigin: "86 212", duration: 0.34, ease: "back.out(1.6)" }, S1 + 0.18); w1.arm.L = 150;
  tl.to(hfish, Object.assign(fishAt(150, -90), { duration: 0.34, ease: "back.out(1.6)" }), S1 + 0.18);
  hop(w1, S1 + 0.12, 14, 0.36);
  look(w1, S1 + 0.25, -9, -10, 0.15);
  // go ca xuong ban 2 lan: cop
  [[S1 + 0.95, 1.0], [S1 + 1.32, 0.85]].forEach(function (k, i) {
    tl.to(w1.armL, { rotation: 40, svgOrigin: "86 212", duration: 0.13, ease: "power3.in" }, k[0]);
    tl.to(hfish, Object.assign(fishAt(40, 146), { duration: 0.13, ease: "power3.in" }), k[0]);
    sfx("bonk", k[0] + 0.12, 0.75 * k[1]);
    tl.to(w1.armL, { rotation: 92, svgOrigin: "86 212", duration: 0.16, ease: "power2.out" }, k[0] + 0.14);
    tl.to(hfish, Object.assign(fishAt(92, 160), { duration: 0.16, ease: "power2.out" }), k[0] + 0.14);
    tl.fromTo(w1.lift, { y: 0 }, { y: 4, duration: 0.05, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, k[0] + 0.12);
  });
  look(w1, S1 + 0.95, -12, 8, 0.12);
  // dat ca dung len ban (ca tu dung, cung nhu van)
  const PLACE = S1 + 1.85, LP = 8;
  tl.to(w1.armL, { rotation: LP, svgOrigin: "86 212", duration: 0.32, ease: "power2.inOut" }, S1 + 1.55); w1.arm.L = LP;
  tl.to(hfish, Object.assign(fishAt(LP, -90), { duration: 0.32, ease: "power2.inOut" }), S1 + 1.55);
  (function () {
    const h = handWorld("L", LP); // tam ca trong he Wob: (h.x, h.y - 96)
    const fx = w1.x + (h[0] - 200) * w1.s, fyc = TY + (h[1] - 96 - 392) * w1.s;
    const bottomNow = fyc + 152 * w1.s; // duoi ca
    gsap.set(standFish, { x: fx, y: bottomNow, z: w1.z + 6, opacity: 0, scale: w1.s, transformOrigin: "0 0" });
    tl.set(standFish, { opacity: 1 }, PLACE); tl.set(hfish, { opacity: 0 }, PLACE);
    tl.to(standFish, { y: TY, duration: 0.18, ease: "power2.in" }, PLACE + 0.02);
    tl.to(standFish, { rotationZ: -4, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.out" }, PLACE + 0.2);
    sfx("drop", PLACE + 0.2, 0.55);
  })();
  tl.to(w1.armL, { rotation: 0, svgOrigin: "86 212", duration: 0.3, ease: "power2.out" }, PLACE + 0.1); w1.arm.L = 0;
  // "Oymyakon" 2.45: vung tay phai lat bia so
  tl.to(w1.lift, { rotationY: -18, duration: 0.3, ease: "power2.out" }, S1 + 1.8);
  look(w1, S1 + 1.8, 10, 4, 0.15);
  armTo(w1, "R", S1 + 1.85, 0.3, -125, "power2.out");
  armTo(w1, "R", S1 + 2.2, 0.35, -60, "power2.inOut");
  tl.fromTo(cover, { rotationY: 0 }, { rotationY: -180, duration: 0.7, ease: "power2.inOut", immediateRender: false }, S1 + 1.95);
  sfx("whoosh", S1 + 2.0, 0.45);
  // pop-up bat dung
  [[popHills, 2.55], [popHouses, 2.7], [popSign, 2.88]].forEach(function (pp) {
    tl.fromTo(pp[0], { rotationX: 0 }, { rotationX: -90, duration: 0.5, ease: "back.out(1.7)", immediateRender: false }, S1 + pp[1]);
  });
  sfx("pop", S1 + 2.75, 0.5); sfx("pop", S1 + 3.05, 0.6);
  hop(w1, S1 + 3.0, 10, 0.3);
  // chi vao bien ten
  armTo(w1, "R", S1 + 3.4, 0.4, -88, "back.out(1.5)");
  // "coldest" 4.89: rung minh
  shiver(w1, S1 + 4.5, S1 + 5.2, 3);
  sfx("brr", S1 + 4.5, 0.35);
  look(w1, S1 + 4.5, 0, -4, 0.12);
  look(w1, S1 + 5.6, 9, 2, 0.2);
  // "five hundred people" 8.3: lang ti hon bat len, Wob dem
  tl.fromTo(popTiny, { rotationX: 0 }, { rotationX: -90, duration: 0.45, ease: "back.out(2)", immediateRender: false }, S1 + 7.75);
  sfx("pop", S1 + 7.9, 0.45);
  [8.0, 8.35, 8.7].forEach(function (t) { tl.to(w1.armR, { rotation: -78, svgOrigin: "314 212", duration: 0.09, yoyo: true, repeat: 1, ease: "power1.inOut" }, S1 + t); });
  // "On purpose." 9.7: quay ra nhin thang, mat tinh bo, giu hinh
  armTo(w1, "R", S1 + 9.15, 0.35, 0, "power2.inOut");
  tl.to(w1.lift, { rotationY: 0, duration: 0.3, ease: "power2.inOut" }, S1 + 9.2);
  look(w1, S1 + 9.3, 0, 2, 0.2);
  lids(w1, S1 + 9.45, 0.5, 0.18);
  talkBobs(w1, S1, [[0.1, 0.5], [1.31, 0], [2.05, 1], [3.35, 0], [4.49, 1], [5.08, 0], [6.34, 0], [7.59, 0.5], [7.9, 0], [8.51, 0]]);
  mouthCues(w1, S1, MOUTH1);
  blinks(w1, 0, 9.3, [[0.5, 1.2]], 0);

  // ---------------- CANH 2 (lang, hoi uc)
  // pop-up cua ca lang khi vao hoi uc: cac lop giay dung len tu mat dat
  camSet(V, null, { cx: -620, cy: -40, cz: -300, k: -180, rx: -7, ry: -9 });
  camTo(V, CUT_VILLAGE, 3.2, { cx: -560, cy: -60, cz: -320, k: 120, rx: -5, ry: 2 }, "power2.out");
  // lop giay bat dung len nhu sach pop-up (noi tiep trang so)
  [[signV, 0.0], [houseA, 0.08], [door, 0.08], [thermo, 0.22], [houseB, 0.18], [FENCES[0], 0.3], [FENCES[1], 0.36]].forEach(function (pp) {
    tl.fromTo(pp[0], { rotationX: 84 }, { rotationX: 0, duration: 0.6, ease: "back.out(1.5)", immediateRender: true }, CUT_VILLAGE + 0.05 + pp[1]);
  });
  tl.fromTo(smokeA, { opacity: 0 }, { opacity: 1, duration: 0.5, immediateRender: true }, CUT_VILLAGE + 0.5);
  sfx("pop", CUT_VILLAGE + 0.25, 0.4); sfx("pop", CUT_VILLAGE + 0.45, 0.35);
  camTo(V, 15.3, 1.0, { cx: HA.x + 50, cy: 60, cz: HA.z, k: 560, rx: -2, ry: 6 }, "power2.inOut");
  camTo(V, 16.3, 2.8, { k: 600, ry: 2 }, "sine.inOut");
  camTo(V, 19.1, 1.1, { cx: -700, cy: -40, cz: -240, k: 250, rx: -5, ry: -4 }, "power2.inOut");
  // nhiet ke: kim tut
  tl.fromTo(merc, { scaleY: 1 }, { scaleY: 0.1, svgOrigin: "115 364", duration: 0.9, ease: "power3.in", immediateRender: false }, 15.4);
  tl.to(merc, { scaleY: 0.16, svgOrigin: "115 364", duration: 0.12, yoyo: true, repeat: 1, ease: "power1.out" }, 16.3);
  sfx("tach-bang", 16.25, 0.35);
  // cua mo, Wob lach ra
  gsap.set(wobV.lift, { scaleX: 1 });
  tl.fromTo(door.svg.parentNode, { rotationY: 0 }, { rotationY: -105, duration: 0.45, ease: "back.out(1.3)", immediateRender: false }, 19.95);
  sfx("whoosh", 19.95, 0.3);
  tl.to(wobV.lift, { scaleX: 0.72, scaleY: 1.08, duration: 0.12, ease: "power2.out" }, 20.2);
  tl.fromTo(wobV.pos, { z: HA.z - 70 }, { z: HA.z + 60, duration: 0.42, ease: "power2.in", immediateRender: false }, 20.25);
  wobV.z = HA.z + 60;
  tl.to(wobV.lift, { scaleX: 1.08, scaleY: 0.92, duration: 0.1, ease: "power2.out" }, 20.67);
  tl.to(wobV.lift, { scaleX: 1, scaleY: 1, duration: 0.3, ease: "back.out(3)" }, 20.77);
  sfx("boing", 20.66, 0.35);
  walk(wobV, 20.8, 21.55, -560, -60, { sfx: "buoc-tuyet", face: 16, endFace: 0 });
  look(wobV, 21.6, -10, 0, 0.12); tl.to(wobV.lift, { rotationY: -14, duration: 0.18 }, 21.6);
  look(wobV, 21.92, 10, 0, 0.12); tl.to(wobV.lift, { rotationY: 14, duration: 0.18 }, 21.92);
  tl.to(wobV.lift, { rotationY: 0, duration: 0.2 }, 22.22); look(wobV, 22.22, 0, 0, 0.12);
  // lan dau: dong bang loi lanh
  shiver(wobV, 20.9, 21.5, 1.5);
  // day vao mat Wob
  const faceY = GY + (150 - 392) * 0.8;
  camTo(V, 21.9, 0.4, { cx: -560 + 0, cy: faceY - 10, cz: -60, k: 640, rx: -3, ry: 0 }, "power3.out");
  camTo(V, 22.3, 2.9, { k: 690, ry: 3 }, "sine.inOut");
  // long mi bat ra (pop) roi dong bang (tach)
  tl.fromTo([wobV.lashL, wobV.lashR], { scale: 0 }, { scale: 1, duration: 0.18, ease: "back.out(3)", immediateRender: false }, 22.33);
  sfx("pop", 22.33, 0.6);
  tl.to(wobV.lashStroke, { stroke: ICE2, duration: 0.15 }, 22.62);
  tl.to(wobV.lashIce, { opacity: 1, duration: 0.12 }, 22.62);
  tl.to(wobV.frostcap, { opacity: 0.9, duration: 0.3 }, 22.62);
  sfx("tach-bang", 22.6, 0.6);
  look(wobV, 22.65, 0, -2, 0.08, 0.55);
  mouth(wobV, 22.66, "O");
  hop(wobV, 22.66, 12, 0.3);
  bubble(wobV, "soc", 22.85, 1.2);
  sfx("liu-lo-soc", 22.88, 0.5);
  // lac mat nhin len long mi
  tl.to([wobV.pupL, wobV.pupR], { scale: 1, duration: 0.2 }, 23.45);
  crossEyes(wobV, 23.45, 0.35);
  mouth(wobV, 23.5, "N");
  tl.to(wobV.talk, { rotation: -4, svgOrigin: "200 290", duration: 0.5, ease: "sine.inOut" }, 23.5);
  tl.to(wobV.talk, { rotation: 0, svgOrigin: "200 290", duration: 0.4, ease: "sine.inOut" }, 25.2);
  look(wobV, 25.3, 8, 0, 0.2);
  mouth(wobV, 25.35, "X");

  // ---------------- CANH 3 (cho)
  camTo(V, 25.35, 3.4, { cx: ST.x - 120, cy: -70, cz: -80, k: 230, rx: -6, ry: -6 }, "power1.inOut");
  walk(wobV, 25.55, 28.55, ST.x - 290, -140, { sfx: "buoc-tuyet", face: 22, endFace: 0, step: 0.3 });
  look(wobV, 28.6, 10, 2, 0.2);
  // "frozen solid": camera luon toi thung ca
  camTo(V, 28.75, 2.2, { cx: ST.x + 160, cy: -40, cz: -40, k: 380, ry: 8, rx: -5 }, "sine.inOut");
  sfx("ting", S3 + 3.75, 0.35);
  // "The village itself is the freezer": lui xa thay ca lang nam trong tu dong
  tl.set(frz, { visibility: "visible" }, 31.1);
  tl.fromTo(frzLeaves, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.in", immediateRender: false }, 31.2);
  tl.to([snowFar, snowNear], { opacity: 0, duration: 0.3 }, 31.15);
  camTo(V, 31.15, 1.6, { cx: 1100, cy: -720, cz: -800, k: -5600, rx: -4, ry: 0 }, "power2.inOut");
  sfx("whoosh", 31.15, 0.5);
  sfx("brr", 32.3, 0.35);
  // dong sam cua tu
  doors.forEach(function (d) { tl.fromTo(d.hinge, { rotationY: d.open }, { rotationY: 0, duration: 0.33, ease: "power3.in", immediateRender: false }, 32.98); });
  sfx("bonk", 33.3, 0.85); sfx("whoosh", 33.0, 0.35);
  // cat ve quay cho
  tl.set(frz, { visibility: "hidden" }, 33.55);
  doors.forEach(function (d) { tl.set(d.hinge, { rotationY: d.open }, 33.56); });
  tl.set([snowFar, snowNear], { opacity: 1 }, 33.55);
  camSet(V, 33.55, { cx: ST.x - 160, cy: -60, cz: -150, k: 380, rx: -6, ry: -4 });
  camTo(V, 33.55, 4.8, { k: 430, ry: 3 }, "sine.inOut");
  // Wob chia tui
  const BAG_ARM = -150;
  armTo(wobV, "R", 33.3, 0.01, BAG_ARM);
  tl.set(bag, { opacity: 1 }, 33.5);
  gsap.set(bag, holdPose("R", BAG_ARM, 0, 0, 0));
  (function () { const h = handWorld("R", BAG_ARM); gsap.set(bag, holdPose("R", BAG_ARM, h[0], h[1], 0)); })();
  look(wobV, 33.6, 10, -4, 0.15);
  tl.fromTo(wobV.armR, { rotation: BAG_ARM }, { rotation: BAG_ARM - 10, svgOrigin: "314 212", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 34.2);
  bubble(wobV, "bag", 34.25, 1.05);
  sfx("liu-lo-hoi", 34.3, 0.55);
  // ban tay deo gang dua ca
  const bagHand = handWorld("R", BAG_ARM);
  const bagWX = wobV.x + (bagHand[0] - 200) * 0.8, bagWY = GY + (bagHand[1] - 392) * 0.8; // diem tay Wob (the gioi)
  // tam ca treo duoi gang = goc gang + (22, -270); ca cung dung thang, cam o duoi
  const GF = { x: bagWX - 22, y: bagWY + 8 + 270, z: ST.z - 15 };
  gsap.set(glove, { x: GF.x + 140, y: GF.y + 300, z: GF.z });
  tl.to(glove, { x: GF.x + 40, y: GF.y - 40, duration: 0.5, ease: "power2.out" }, 34.6);
  tl.to(glove, { x: GF.x, duration: 0.4, ease: "power2.inOut" }, 35.1);
  tl.to(glove, { y: GF.y, duration: 0.12, ease: "power2.in" }, 35.5);
  // trao ca: ca trong tui, xuyen thung day tui
  const BF_SET = 35.62;
  gsap.set(bfish, holdPose("R", BAG_ARM, bagHand[0], bagHand[1] + 10, 90));
  tl.set(gfish, { opacity: 0 }, BF_SET); tl.set(bfish, { opacity: 1 }, BF_SET);
  tl.fromTo(bfish, holdPose("R", BAG_ARM, bagHand[0], bagHand[1] + 10, 90), Object.assign(holdPose("R", BAG_ARM, bagHand[0], bagHand[1] + 70, 90), { duration: 0.16, ease: "power3.in", immediateRender: false }), BF_SET);
  tl.set(bagOk, { opacity: 0 }, BF_SET + 0.15); tl.set(bagTorn, { opacity: 1 }, BF_SET + 0.15);
  sfx("pop", BF_SET + 0.15, 0.55); sfx("tach-bang", BF_SET + 0.17, 0.35);
  tl.to(glove, { y: GF.y + 320, x: GF.x + 120, duration: 0.55, ease: "power2.in" }, 35.85);
  look(wobV, 35.8, 4, 10, 0.15);
  // tui tuot xuong, ca len vai nhu tam van
  tl.to(bag, Object.assign(holdPose("R", BAG_ARM, bagHand[0] - 10, bagHand[1] + 170, 25), { opacity: 0, duration: 0.45, ease: "power2.in" }), 36.2);
  sfx("drop", 36.55, 0.4);
  const SH_ARM = -168;
  tl.to(wobV.armR, { rotation: SH_ARM, svgOrigin: "314 212", duration: 0.45, ease: "back.out(1.4)" }, 36.45); wobV.arm.R = SH_ARM;
  tl.to(bfish, Object.assign(holdPose("R", SH_ARM, 236, 28, 6, -1), { duration: 0.45, ease: "back.out(1.4)" }), 36.45);
  hop(wobV, 36.4, 10, 0.3);
  look(wobV, 36.9, -6, -8, 0.2);
  tl.to(wobV.lift, { rotationY: -10, duration: 0.6, ease: "sine.inOut" }, 37.2);
  // can mat ca, mat lim dim than nhien
  const fishWX = wobV.x + (142 - 200) * 0.8 + 40, fishWY = GY + (20 - 392) * 0.8;
  camTo(V, 38.3, 0.7, { cx: fishWX - 40, cy: fishWY - 60, cz: wobV.z, k: 780, rx: -2, ry: 0 }, "power3.inOut");
  camTo(V, 39.0, 1.9, { k: 840, ry: -3 }, "sine.inOut");
  tl.to(bfishIn.querySelector(".feyeO"), { opacity: 0, duration: 0.15 }, 38.95);
  tl.to(bfishIn.querySelector(".feyeS"), { opacity: 1, duration: 0.15 }, 38.95);
  gsap.set(spark, holdPose("R", SH_ARM, 160, 20, 0));
  tl.fromTo(spark, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)", immediateRender: false }, 39.15);
  tl.to(spark, { opacity: 0, duration: 0.4 }, 40.5);
  sfx("ting", 39.15, 0.5);

  // ---------------- CANH 4 (xe, tra)
  camTo(V, 40.9, 2.0, { cx: CAR.x - 120, cy: -70, cz: -20, k: 230, rx: -6, ry: 5 }, "power2.inOut");
  walk(wobV, 41.0, 42.8, CAR.x - 470, 110, { sfx: "buoc-tuyet", face: 22, endFace: -8, keepR: true });
  // xe rung + khoi xa deu
  const RUM0 = 40.0, RUM1 = CUT_ANYWAY;
  tl.fromTo(carBody, { y: 0 }, { y: -3, duration: 0.07, ease: "sine.inOut", yoyo: true, repeat: Math.round((RUM1 - RUM0) / 0.07), immediateRender: false }, RUM0);
  exPuffs.forEach(function (pf, i) {
    const per = 1.6, off = i * per / exPuffs.length;
    tl.fromTo(pf, { x: 0, y: 0, scale: 0.4, opacity: 0.95, transformOrigin: "50% 50%" }, { x: 220, y: -120, scale: 2.4, opacity: 0, duration: per, ease: "power1.out", repeat: Math.floor((RUM1 - RUM0 - off) / per) - 1, immediateRender: true }, RUM0 + off);
  });
  [42.3, 43.9, 45.5, 47.1].forEach(function (t) { sfx("may-no", t, 0.4); });
  // ca tro ve ba lo: ha tay
  tl.to(bfish, { opacity: 0, duration: 0.2 }, 42.9);
  armTo(wobV, "R", 42.9, 0.35, 0, "power2.inOut");
  // ghe nhin qua cua kinh, vay tay voi ghe trong
  camTo(V, 42.95, 4.8, { k: 320, ry: -4 }, "sine.inOut");
  tl.to(wobV.lift, { rotationY: -16, duration: 0.3 }, 43.3);
  tl.to(wobV.upper, { rotation: 9, svgOrigin: "200 300", duration: 0.4, ease: "power2.out" }, 43.4);
  look(wobV, 43.4, 12, -2, 0.2);
  armTo(wobV, "R", 44.4, 0.25, -140, "power2.out");
  [44.65, 44.95, 45.25].forEach(function (t) { tl.to(wobV.armR, { rotation: -115, svgOrigin: "314 212", duration: 0.14, yoyo: true, repeat: 1, ease: "sine.inOut" }, t); });
  mouth(wobV, 44.5, "S");
  bubble(wobV, "vui", 44.6, 0.9); sfx("liu-lo-vui", 44.65, 0.5);
  armTo(wobV, "R", 45.6, 0.3, 0, "power2.inOut");
  mouth(wobV, 45.7, "X");
  tl.to(wobV.upper, { rotation: 0, svgOrigin: "200 300", duration: 0.35 }, 45.7);
  bubble(wobV, "dots", 46.1, 1.1);
  look(wobV, 46.1, 6, 6, 0.2);
  // "a cold engine may not start again": lia sang xe phu tuyet, tat may
  camTo(V, 47.8, 0.9, { cx: CAR.x + 560, cy: -40, cz: -220, k: 330, ry: -8 }, "power2.inOut");
  look(wobV, 47.9, 12, 0, 0.2);
  tl.fromTo(icicle, { y: GY - 8, rotationZ: 0, opacity: 1 }, { y: GY + 26, rotationZ: 20, opacity: 0, duration: 0.3, ease: "power2.in", immediateRender: false }, 49.55);
  sfx("drop", 49.8, 0.35);
  camTo(V, 50.05, 0.5, { cx: wobV.x + 80, cy: 120, cz: wobV.z, k: 560, rx: -4, ry: 0 }, "power2.inOut");
  camTo(V, 50.55, 3.55, { k: 630 }, "sine.inOut");
  tl.to(wobV.lift, { rotationY: 0, duration: 0.3 }, 50.0);
  // pha tra
  const CUP_ARM = -62;
  armTo(wobV, "R", 50.3, 0.35, CUP_ARM, "back.out(1.6)");
  (function () { const h = handWorld("R", CUP_ARM); gsap.set(cup, holdPose("R", CUP_ARM, h[0] + 10, h[1] - 10, 0)); })();
  tl.set(cup, { opacity: 1 }, 50.3);
  look(wobV, 50.6, 8, -2, 0.2); mouth(wobV, 50.7, "S");
  sfx("hoi-nuoc", 50.75, 0.4);
  tl.fromTo(steam, { y: 6, opacity: 0.5 }, { y: -8, opacity: 1, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 4, immediateRender: false }, 50.6);
  // "did not warm up": hoi dong bang giua khong trung
  tl.set(steam, { opacity: 0 }, 52.85); tl.set(steamIce, { opacity: 1 }, 52.85);
  tl.to(cupIce, { opacity: 1, duration: 0.25 }, 52.85);
  sfx("tach-bang", 52.85, 0.55);
  mouth(wobV, 52.9, "N"); look(wobV, 52.9, 8, -6, 0.1, 0.6);
  // doc coc: khoi tra cung roi xuong, cach
  tl.to(wobV.armR, { rotation: CUP_ARM - 40, svgOrigin: "314 212", duration: 0.18, ease: "power2.out" }, 53.15);
  tl.to(cup, Object.assign(holdPose("R", CUP_ARM - 40, handWorld("R", CUP_ARM - 40)[0] + 10, handWorld("R", CUP_ARM - 40)[1] - 10, 170), { duration: 0.18, ease: "power2.out" }), 53.15);
  (function () {
    const h = handWorld("R", CUP_ARM - 40);
    gsap.set(teaBlock, TF(h[0] + 10, h[1] + 10, 170));
    tl.set(teaBlock, { opacity: 1 }, 53.33);
    tl.to(teaBlock, Object.assign(TF(h[0] + 14, 352, 180), { duration: 0.24, ease: "power2.in" }), 53.33);
    tl.to(teaBlock, Object.assign(TF(h[0] + 14, 346, 186), { duration: 0.07, yoyo: true, repeat: 1 }), 53.57);
  })();
  sfx("ting", 53.56, 0.45); sfx("bonk", 53.56, 0.35);
  // "Anyway." nhin thang, tinh bo
  tl.to([wobV.pupL, wobV.pupR], { x: 0, y: 2, scale: 1, duration: 0.15 }, 53.68);
  lids(wobV, 53.7, 0.48, 0.15);
  mouth(wobV, 53.72, "A");
  blinks(wobV, CUT_VILLAGE, CUT_ANYWAY, [[22.2, 25.3], [53.5, 54.2]], 0);
  breathe(wobV, CUT_VILLAGE, CUT_ANYWAY);
  // khoi bay
  SMOKES.forEach(function (sm, j) {
    const per = 4.2, T0 = CUT_VILLAGE - 0.6, T1 = CUT_ANYWAY;
    sm.els.forEach(function (c, i) {
      const off = (i / sm.n) * per;
      tl.fromTo(c, { y: 0, scale: 0.6, opacity: 0.95, transformOrigin: "50% 50%" }, { y: -380, scale: 2.0, opacity: 0, duration: per, ease: "sine.out", repeat: Math.ceil((T1 - T0 + off) / per), immediateRender: true }, T0 - off);
    });
  });

  // ---------------- CANH 5 (ban, hien tai): ca mem, Wob quan chan run
  tl.set([popHills, popHouses, popSign, popTiny], { rotationX: 0 }, CUT_ANYWAY);
  tl.set(cover, { rotationY: 0 }, CUT_ANYWAY);
  tl.set(standFish, { opacity: 0 }, CUT_ANYWAY);
  gsap.set([limp, puddle, drip], { opacity: 0 });
  tl.set([limp, puddle], { opacity: 1 }, CUT_ANYWAY);
  tl.set(w1.blanket, { opacity: 1 }, CUT_ANYWAY);
  tl.set(w1.cheeks, { opacity: 0 }, CUT_ANYWAY);
  tl.set(w1.lift, { rotationY: 0 }, CUT_ANYWAY);
  tl.set(w1.armL, { rotation: -62, svgOrigin: "86 212" }, CUT_ANYWAY);
  tl.set(w1.armR, { rotation: 62, svgOrigin: "314 212" }, CUT_ANYWAY);
  (function () { const hL = handWorld("L", -62), hR = handWorld("R", 62); tl.set(mug, Object.assign(holdPose("R", 62, (hL[0] + hR[0]) / 2, (hL[1] + hR[1]) / 2 + 10, 0), { opacity: 1 }), CUT_ANYWAY); })();
  tl.set([w1.pupL, w1.pupR], { x: 0, y: 4 }, CUT_ANYWAY);
  tl.set([w1.lidL, w1.lidR], { scaleY: 0.4 }, CUT_ANYWAY); w1.lid = 0.4;
  tl.set(wobD.pos, { x: 170, z: 40 }, CUT_ANYWAY);
  camSet(D, CUT_ANYWAY, { cx: 40, cy: 30, cz: -140, k: 160, rx: -12, ry: -8 });
  camTo(D, CUT_ANYWAY, 5.9, { cx: 120, cy: 20, cz: -60, k: 470, ry: -3 }, "sine.inOut");
  shiver(w1, CUT_ANYWAY, END - 0.05, 2.2);
  sfx("brr", CUT_ANYWAY + 0.15, 0.4);
  tl.fromTo(msteam, { y: 4, opacity: 0.6 }, { y: -10, opacity: 1, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 10, immediateRender: false }, CUT_ANYWAY);
  // "thawed" 56.27: dau ca ru them, giot nuoc roi
  tl.to(lhead, Object.assign(TF(0, 0, 68), { duration: 0.5, ease: "bounce.out" }), S5 + 1.2);
  sfx("nuot", S5 + 1.25, 0.4);
  tl.fromTo(drip, { opacity: 1, y: TY - 110 }, { y: TY - 10, duration: 0.3, ease: "power2.in", immediateRender: false }, S5 + 1.75);
  tl.set(drip, { opacity: 0 }, S5 + 2.06);
  tl.fromTo(puddle, { scale: 1 }, { scale: 1.18, duration: 0.3, ease: "back.out(2)", immediateRender: false }, S5 + 2.05);
  sfx("drop", S5 + 2.05, 0.3);
  mouthCues(w1, S5, MOUTH5);
  talkBobs(w1, S5, [[0.11, 0.3], [1.0, 0], [1.27, 0.5], [2.73, 0], [3.01, 0.6]]);
  look(w1, S5 + 0.9, -10, 6, 0.2);
  look(w1, S5 + 2.6, 0, 3, 0.2);
  // "I took a week." run manh hon roi tinh bo nhin thang
  tl.to(w1.lift, { scaleY: 0.95, scaleX: 1.04, duration: 0.15, yoyo: true, repeat: 1 }, S5 + 2.7);
  sfx("brr", S5 + 3.5, 0.35);
  mouth(w1, S5 + 3.45, "K");
  tl.fromTo(w1.m, { y: 0 }, { y: 2, duration: 0.05, yoyo: true, repeat: 15, immediateRender: false }, S5 + 3.45);
  mouth(w1, END - 1.0, "N");
  blink(w1, S5 + 4.2);

  // ------------------------------------------------------------------ xuat
  document.getElementById("sfx-out").textContent = JSON.stringify(SFX);
  window.__dioTimeline = tl;
  resolveDio({ tl: tl }); // boc lai: timeline GSAP la thenable
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildDio); else buildDio();
});
