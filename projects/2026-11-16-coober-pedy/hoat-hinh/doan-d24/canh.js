/* ---- Phần chung các đoạn cắt giấy Coober Pedy (d23–d36), chép vào đầu mỗi canh.js. Chỉ toạ độ viết tay, không ảnh. ----
   Trang phục khoá liên tục: mũ rộng vành giấy kraft #C9A46A, dải vải đỏ #C9463A; ba lô xanh ô liu #6E7B3E có cuộn thảm đỏ
   trên nắp (sẵn của Wob); từ d26: thêm cuộn cỏ nhân tạo xanh #5E9A4A cạnh cuộn đỏ. Mũ vẽ qua opts.phuKien (nhóm "<id>-mr"). */
var CP = (function () {
  "use strict";
  var INK = "#1f2326", KR = "#C9A46A", KRD = "#9C7A44", BAND = "#C9463A", OL = "#6E7B3E", OLD = "#4E5A2A", TURF = "#5E9A4A", TURFD = "#3F7434";
  function f1(n) { return (Math.round(n * 10) / 10).toString(); }
  function st(d, w, c, ex) { return '<path d="' + d + '" fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w || 4) + '" stroke-linecap="round" stroke-linejoin="round"' + (ex || "") + "/>"; }
  function fp(d, fill, sw, ex) { return '<path d="' + d + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (sw == null ? 5 : sw) + '" stroke-linejoin="round"' + (ex || "") + "/>"; }

  /* Mũ rộng vành, toạ độ gốc Wob 400×400 (đỉnh đầu ~y 56). */
  function hat() {
    var crown = "M 124 84 C 120 44 140 10 200 8 C 260 10 280 44 276 84 Z";
    var band = "M 123 62 C 160 54 240 54 277 62 L 277 84 C 240 78 160 78 123 84 Z";
    var brim = "M 30 88 C 90 66 310 66 370 88 C 386 98 362 108 330 106 C 262 96 138 96 70 106 C 38 108 16 98 30 88 Z";
    return '<g>' + '<path d="' + brim + '" fill="#0b1214" opacity="0.18" transform="translate(5,7)"/>' +
      fp(crown, KR, 6) + st("M 168 18 C 184 30 216 30 232 18", 4, KRD) + st("M 150 40 C 158 28 170 22 184 20", 5, "#ffffff", ' opacity="0.35"') +
      fp(band, BAND, 5) + fp(brim, KR, 6) + st("M 70 94 C 140 84 260 84 330 94", 3, KRD, ' opacity="0.7"') + "</g>";
  }
  /* Mũ cầm tay / đặt xuống: gốc giữa vành, cỡ s. */
  function hatProp(s) { return '<g transform="scale(' + (s || 1) + ') translate(-200,-92)">' + hat() + "</g>"; }
  /* cuộn cỏ nhân tạo (vẽ sau ba lô: packExtra nằm dưới ba lô) */
  function turfRoll() {
    return '<g><rect x="250" y="34" width="100" height="36" rx="18" fill="' + TURF + '" stroke="' + INK + '" stroke-width="7"/>' +
      st("M 262 40 L 266 32 M 280 40 L 283 31 M 300 40 L 302 31 M 320 40 L 323 32 M 338 40 L 340 33", 3, TURFD) +
      st("M 272 38 L 272 66 M 330 38 L 330 66", 4) + "</g>";
  }
  /* Wob của tập: o { mu: true (mặc định), co: false (cuộn cỏ), khongBalo, holdL, holdR, pk (phụ kiện thêm), bui (bụi bám) } */
  function wob(api, id, o) {
    o = o || {};
    var pk = (o.mu === false ? "" : '<g id="' + id + '-mr">' + hat() + "</g>") + (o.pk || "");
    if (o.bui) pk += '<g opacity="0.75">' + [[120, 250, 7], [150, 282, 5], [258, 270, 8], [232, 300, 5], [300, 236, 6], [96, 214, 4]].map(function (b) {
      return '<ellipse cx="' + b[0] + '" cy="' + b[1] + '" rx="' + b[2] + '" ry="' + f1(b[2] * 0.7) + '" fill="#C8A274"/>';
    }).join("") + "</g>";
    var w = api.wob(id, { phuKien: pk, packExtra: o.co ? turfRoll() : "", holdL: o.holdL, holdR: o.holdR });
    var s = w.svg.replace(/#b8743a/g, OL).replace(/#8e5527/g, OLD);
    if (o.khongBalo) s = s.replace(/<path d="M 300 96 C 286 130 284 168 300 206"[^>]*\/>/g, "");
    w.svg = s;
    if (o.mu !== false) api.origin("#" + id + "-mr", "200 90");
    if (o.khongBalo) api.set("#" + id + "-pack", 0, { opacity: 0 });
    return w;
  }
  /* Ba lô đặt dưới đất (đoạn d36): gốc đáy giữa, toạ độ gốc Wob. */
  function packProp(co) {
    return '<g transform="translate(-300,-256)">' + (co ? turfRoll() : "") +
      '<rect x="250" y="96" width="98" height="160" rx="30" fill="' + OL + '" stroke="' + INK + '" stroke-width="7"/>' +
      '<rect x="262" y="150" width="44" height="58" rx="12" fill="' + OLD + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="262" y="66" width="96" height="36" rx="18" fill="#d9543c" stroke="' + INK + '" stroke-width="7"/>' +
      st("M 282 70 L 282 98", 4) + st("M 336 70 L 336 98", 4) + "</g>";
  }
  /* Gậy golf cầm tay: tay ở gốc, thân chĩa theo +y (cánh tay thõng). len px (toạ độ Wob). */
  function club(len) {
    var L = len || 190;
    return '<g>' + st("M 0 -14 L 0 " + L, 7, "#9AA5A8") + st("M 0 -14 L 0 " + L, 2, INK, ' opacity="0.5"') +
      fp("M -6 " + (L - 4) + " L 30 " + (L + 2) + " L 30 " + (L + 16) + " L -8 " + (L + 14) + " Z", "#C9CED0", 4) +
      fp("M -8 -26 L 8 -26 L 8 30 L -8 30 Z", "#2E3A3C", 3) + "</g>";
  }
  function sky(id, stops) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' + stops.map(function (s) { return '<stop offset="' + s[0] + '" stop-color="' + s[1] + '"/>'; }).join("") + "</linearGradient>";
  }
  function defs() {
    return "<defs>" +
      sky("cpDay", [[0, "#A9CBD6"], [0.55, "#E4E6D6"], [1, "#F4E2BE"]]) +
      sky("cpEve", [[0, "#6F8FB0"], [0.5, "#E7B98A"], [1, "#F2C98E"]]) +
      sky("cpDusk", [[0, "#3D4E78"], [0.55, "#B98A86"], [1, "#E9A774"]]) +
      sky("cpNight", [[0, "#0F1A2E"], [0.6, "#1D2C48"], [1, "#2F4262"]]) +
      sky("cpNightTram", [[0, "#0C1424"], [0.6, "#18233A"], [1, "#26324A"]]) +
      '<radialGradient id="cpGlow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#8FF3FF" stop-opacity="0.95"/><stop offset="0.35" stop-color="#5BD6F0" stop-opacity="0.45"/><stop offset="1" stop-color="#5BD6F0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="cpUV" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#E3B8FF" stop-opacity="0.95"/><stop offset="0.4" stop-color="#9B5BE0" stop-opacity="0.4"/><stop offset="1" stop-color="#7A3FD0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="cpWarm" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE3A0" stop-opacity="0.75"/><stop offset="0.5" stop-color="#FFC46A" stop-opacity="0.22"/><stop offset="1" stop-color="#FFC46A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="cpHole" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stop-color="#050708"/><stop offset="0.7" stop-color="#11161A"/><stop offset="1" stop-color="#2A2622"/></radialGradient>' +
      "</defs>";
  }
  /* đống đất thải (mullock) hình nón. Gốc: giữa chân. */
  function mullock(D, w, h, seed, tone) {
    var c = tone || "#E6D3AE", sh = "#C9B28A";
    var pts = [[-w / 2, 0], [-w * 0.3, -h * 0.55], [-w * 0.08, -h * 0.97], [w * 0.06, -h], [w * 0.28, -h * 0.6], [w / 2, 0]];
    var s = D.paper(D.rough(pts, 3, seed, 18), c, { stroke: true, sw: 4, sx: 8, sy: 6, shOp: 0.18 });
    s += '<path d="' + D.rough([[w * 0.06, -h], [w * 0.28, -h * 0.6], [w / 2, 0], [w * 0.05, 0]], 2, seed + 1, 18) + '" fill="' + sh + '" opacity="0.8"/>';
    for (var i = 0; i < 4; i++) s += '<ellipse cx="' + f1(-w * 0.3 + i * w * 0.18) + '" cy="' + f1(-h * (0.12 + (i % 2) * 0.18)) + '" rx="' + f1(w * 0.03) + '" ry="' + f1(w * 0.018) + '" fill="#B99C70"/>';
    return s;
  }
  /* ống thông gió (dugout): gốc chân. h chiều cao. */
  function vent(D, h, seed) {
    var s = D.paper(D.rRect(-15, -h, 30, h, 1, seed), "#E9E7DF", { stroke: true, sw: 4, sx: 5, sy: 4 });
    s += '<rect x="-15" y="' + (-h) + '" width="9" height="' + h + '" fill="#FFFFFF" opacity="0.5"/>';
    s += fp("M -30 " + (-h - 4) + " L 0 " + (-h - 30) + " L 30 " + (-h - 4) + " Z", "#8C9396", 4);
    s += fp("M -10 " + (-h - 4) + " L 10 " + (-h - 4) + " L 10 " + (-h + 4) + " L -10 " + (-h + 4) + " Z", "#5E6668", 3);
    return s;
  }
  /* miệng giếng mỏ tròn. Gốc tâm. rx, ry. */
  function shaft(D, rx, ry, seed) {
    var s = D.paper(D.rEll(0, 0, rx + 16, ry + 8, 3, seed), "#B07A4E", { stroke: true, sw: 4, shadow: false });
    s += '<path d="' + D.rEll(0, 0, rx, ry, 2, seed + 1) + '" fill="url(#cpHole)" stroke="' + INK + '" stroke-width="4"/>';
    s += '<path d="M ' + f1(-rx * 0.9) + ' ' + f1(-ry * 0.1) + ' C ' + f1(-rx * 0.5) + ' ' + f1(-ry * 0.9) + ' ' + f1(rx * 0.5) + ' ' + f1(-ry * 0.9) + ' ' + f1(rx * 0.9) + ' ' + f1(-ry * 0.1) + '" fill="none" stroke="#6E4A30" stroke-width="5" opacity="0.6"/>';
    return s;
  }
  /* đá nhỏ */
  function rock(D, r, seed, c) { return D.paper(D.rEll(0, -r * 0.45, r, r * 0.55, 2.5, seed), c || "#B8774A", { stroke: true, sw: 3, sx: 3, sy: 3 }); }
  /* bụi cỏ muối (saltbush) */
  function bush(D, r, seed) {
    var s = "", R = D.rng(seed || 9);
    for (var i = 0; i < 5; i++) s += '<path d="' + D.rEll(-r * 0.6 + i * r * 0.3, -r * (0.45 + R() * 0.3), r * 0.42, r * 0.36, 2, seed + i) + '" fill="' + (i % 2 ? "#7F8F6A" : "#93A27A") + '" stroke="' + INK + '" stroke-width="3"/>';
    return s;
  }
  /* sao trời nhấp nháy (tất định): trả SVG, đăng ký khoá */
  function sao(api, pre, n, seed, box, t1) {
    var R = api.D.rng(seed), s = "";
    for (var i = 0; i < n; i++) {
      var x = Math.round(box[0] + R() * box[2]), y = Math.round(box[1] + R() * box[3]), r = 1.6 + R() * 2.4, id = pre + i;
      s += '<circle id="' + id + '" cx="' + x + '" cy="' + y + '" r="' + f1(r) + '" fill="#FFF6DA"/>';
      if (i % 3 === 0) { var ph = R() * 2; for (var t = ph; t < t1; t += 1.6 + R()) { api.key("#" + id, "opacity", t, 1, "sine.inOut"); api.key("#" + id, "opacity", t + 0.6, 0.35, "sine.inOut"); } }
    }
    return s;
  }
  /* mặt đất sa mạc lớp giữa từ x0 tới x1, mặt ở y mat. */
  function datSaMac(D, x0, x1, mat, seed, c) {
    var s = D.paper(D.rough([[x0, mat], [x1, mat - 6], [x1, mat + 1400], [x0, mat + 1400]], 3, seed, 40), c || "#D9A066", { shadow: false, stroke: true, sw: 4 });
    s += '<rect x="' + x0 + '" y="' + (mat + 60) + '" width="' + (x1 - x0) + '" height="1400" fill="url(#half)" opacity="0.06"/>';
    var R = D.rng(seed + 3);
    for (var x = x0 + 40; x < x1; x += 90 + R() * 160) s += '<ellipse cx="' + Math.round(x) + '" cy="' + Math.round(mat + 30 + R() * 160) + '" rx="' + Math.round(6 + R() * 12) + '" ry="' + Math.round(3 + R() * 5) + '" fill="#B9773F" opacity="0.7"/>';
    return s;
  }
  /* dãy đồi xa thấp */
  function doiXa(D, x0, x1, y, amp, seed, c) {
    var p = [[x0, y + 900], [x0, y]];
    for (var x = x0; x <= x1; x += 120) p.push([x, y - amp * (0.5 + 0.5 * Math.sin(x / 330 + seed)) - amp * 0.3 * Math.sin(x / 97 + seed * 2)]);
    p.push([x1, y + 900]);
    return D.paper(D.rough(p, 3, seed, 30), c, { shadow: false, stroke: true, sw: 3 });
  }
  /* mảnh giấy nhãn có chữ (chữ phải trong chu_tren_do_vat). Gốc tâm. */
  function nhan(D, id, chu, co, o) {
    o = o || {};
    var w = o.w || Math.round(chu.length * co * 0.56 + 44), h = Math.round(co * 1.45);
    return '<g id="' + id + '">' + D.paper(D.rRect(-w / 2, -h / 2, w, h, 1.6, o.seed || 611), o.nen || "#FFF8EC", { stroke: true, sw: 4, sx: 5, sy: 6 }) +
      D.txt(0, Math.round(co * 0.35), chu, co, { w: o.dam || 800, fill: o.mau }) + "</g>";
  }
  return { INK: INK, KR: KR, KRD: KRD, BAND: BAND, OL: OL, TURF: TURF, TURFD: TURFD, st: st, fp: fp, f1: f1, hat: hat, hatProp: hatProp, turfRoll: turfRoll, wob: wob, packProp: packProp, club: club, defs: defs, mullock: mullock, vent: vent, shaft: shaft, rock: rock, bush: bush, sao: sao, datSaMac: datSaMac, doiXa: doiXa, nhan: nhan };
})();
/* Đoạn d24 · cắt giấy parallax 4 lớp · hồi ức: mặt đất trên dãy đồi dugout, rừng ống thông gió, biển thị trấn pop-up,
   ba xe hút đất giống hệt nhau. Vào "cat", ra "giay".
   Lời: "The town picked its name around nineteen twenty, though records differ by a year or two, and got its own council in
   nineteen eighty-seven. Everyone here had the same idea, with the same machines."  Chữ: "~1920", "1987" (trên biển). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, P = D.paper, R = D.rough, st = CP.st, fp = CP.fp;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var MAT = 900;

  // ---- trời tĩnh + mặt trời ----
  var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#cpDay)"/>' +
    '<circle cx="1500" cy="210" r="150" fill="#FFF4D6" opacity="0.35"/><circle cx="1500" cy="210" r="74" fill="#FFF0C4" stroke="#1f2326" stroke-width="3" stroke-opacity="0.3"/>';
  // ---- lớp xa nhất: dãy đồi thấp màu nhạt ----
  var xa2 = CP.doiXa(D, -800, 3200, 700, 40, 2401, "#E3BE92") + '<rect x="-800" y="600" width="4000" height="800" fill="#F4E2BE" opacity="0.25"/>';
  // ---- lớp xa: đồi dugout có ống thông gió nhỏ ----
  var xa = CP.doiXa(D, -800, 3800, 790, 70, 2402, "#D79A62");
  for (var v = 0; v < 26; v++) xa += at(-500 + v * 160 + (v % 3) * 30, 770 - 40 * Math.sin(v * 0.9 + 2402) + (v % 2) * 18, '<g transform="scale(0.42)">' + CP.vent(D, 160 + (v % 4) * 30, 2410 + v) + "</g>");
  // ---- lớp giữa: mặt đồi, ống thông gió, biển, xe, Wob ----
  var giua = CP.datSaMac(D, -1200, 4600, MAT, 2420, "#D9A066");
  var vents = [[-300, 190], [80, 230], [420, 170], [1010, 210], [1280, 250], [1560, 180], [3150, 220], [3420, 190], [3700, 240]];
  vents.forEach(function (p, i) { giua += at(p[0], MAT + 6, CP.vent(D, p[1], 2430 + i)); });
  // gió thổi ra từ ống nghe (nét xoắn trôi lên)
  giua += at(1010, MAT - 240, g("wind", st("M 0 0 C 20 -20 -10 -40 14 -60 C 34 -78 10 -96 30 -112", 5, "#FFFFFF", ' opacity="0.85"') + st("M 22 6 C 44 -12 26 -30 48 -46", 4, "#FFFFFF", ' opacity="0.6"')));
  // biển thị trấn pop-up (sau lưng Wob)
  var sign = P(D.rRect(-12, -330, 24, 330, 1.2, 2440), "#7A5236", { stroke: true, sw: 4, sx: 5, sy: 5 }) +
    P(D.rRect(-210, -460, 420, 250, 2, 2441), "#E9D6AE", { stroke: true, sw: 5, half: 0.08 }) +
    fp("M -30 -440 L 0 -470 L 30 -440 L 0 -410 Z", "#7FD0C8", 4) + st("M -30 -440 L 30 -440 M 0 -470 L 0 -410", 2, "#FFFFFF", ' opacity="0.8"') +
    g("s1", D.paper(D.rRect(-160, -400, 320, 76, 1.5, 2442), "#FFF8EC", { stroke: true, sw: 4, sx: 4, sy: 5 }) + D.txt(0, -345, data.chu_tren_do_vat[0], 54, { w: 900 })) +
    g("s2", D.paper(D.rRect(-160, -312, 320, 76, 1.5, 2443), "#FFF8EC", { stroke: true, sw: 4, sx: 4, sy: 5 }) + D.txt(0, -257, data.chu_tren_do_vat[1], 54, { w: 900 }));
  giua += at(560, MAT + 4, g("sign", sign));
  // ba xe hút đất giống hệt nhau
  function xeHut(id) {
    var s = '<g id="' + id + '">';
    s += P(D.rRect(-220, -70, 440, 40, 1.5, 2450), "#4A4F52", { stroke: true, sw: 4 });
    s += P(D.rRect(-210, -230, 300, 160, 2, 2451), "#E7E2D6", { stroke: true, sw: 5, half: 0.08 });
    s += st("M -190 -200 L 70 -200 M -190 -110 L 70 -110", 3, "#B9B2A2");
    s += P("M 100 -70 L 100 -200 L 170 -200 L 220 -140 L 220 -70 Z", "#B5533C", { stroke: true, sw: 5 });
    s += fp("M 116 -186 L 162 -186 L 200 -142 L 116 -142 Z", "#CFE6EE", 4);
    s += P(D.rRect(-150, -430, 34, 200, 1, 2452), "#B5533C", { stroke: true, sw: 4, shadow: false });
    s += fp("M -170 -440 L -96 -440 L -96 -418 L -170 -418 Z", "#4A4F52", 4);
    s += st("M -133 -300 C -40 -300 -20 -150 -60 -90", 12, "#3A3F42") + st("M -133 -300 C -40 -300 -20 -150 -60 -90", 4, "#6A7072");
    [-150, 150].forEach(function (x) { s += '<circle cx="' + x + '" cy="-24" r="36" fill="#2a2f31" stroke="#1f2326" stroke-width="5"/><circle cx="' + x + '" cy="-24" r="13" fill="#9aa5a8" stroke="#1f2326" stroke-width="3"/>'; });
    return s + "</g>";
  }
  [2050, 2520, 2990].forEach(function (x, i) { giua += at(x, MAT + 14, '<g transform="scale(0.85)">' + xeHut("xe" + i) + "</g>"); });
  var W = CP.wob(api, "W", {});
  giua += W.svg;
  // ---- lớp gần: ống thông gió to, đá, bụi ----
  var gan = "";
  [[-200, 300], [700, 260], [2700, 280], [3500, 300]].forEach(function (p, i) { gan += at(p[0], 1100, '<g transform="scale(1.3)">' + CP.vent(D, p[1], 2460 + i) + "</g>"); });
  [[300, 70], [1300, 90], [2300, 80], [3100, 70]].forEach(function (p, i) { gan += at(p[0], 1110, CP.rock(D, p[1], 2470 + i, "#B06C40")) + at(p[0] + 160, 1120, CP.bush(D, 70, 2480 + i)); });

  api.dat(CP.defs() + troi + api.lop("xa2", xa2, 0.2, { mat: 700 }) + api.lop("xa", xa, 0.45, { mat: 790 }) + api.lop("giua", giua, 1, { mat: MAT }) + api.lop("gan", gan, 1.5, { mat: 1100 }));
  api.noi({});

  var t1920 = T("twenty", 0, 1.82), tRec = T("records", 0, 2.7), t87 = T("eighty-seven", 0, 6.81), tEvery = T("Everyone", 0, 7.75), tSame = T("same", 0, 8.69), tMach = T("machines", 0, 10.16);
  t87 = T("nineteen", 1, 6.44);

  api.camera([
    [0, 520, 620, 1.05], [2.4, 820, 630, 1.12, "sine.inOut"], [4.4, 900, 640, 1.2, "sine.inOut"],
    [5.6, 820, 600, 1.02, "power2.inOut"],              // lùi thấy biển sau lưng
    [7.3, 860, 600, 1.05, "sine.inOut"],
    [8.9, 2400, 640, 0.98, "power2.inOut"],             // lia theo Wob sang ba chiếc xe
    [DUR, 2440, 650, 1.04, "sine.inOut"]
  ]);

  // biển bật dựng sau lưng, hai năm hiện lần lượt
  api.origin("#sign", "0 0");
  api.key("#sign", "scaleY", 0, 0.3); api.key("#sign", "scaleY", 0.35, 1, "back.out(1.8)");
  api.sfx("whoosh", 0.0, 0.3);
  api.origin("#s1", "0 -362"); api.origin("#s2", "0 -274");
  api.pop("#s1", 0.3, 0.24); api.pop("#s2", t87 - 0.06, 0.24);
  api.sfx("pop", 0.3, 0.45); api.sfx("pop", t87 - 0.04, 0.45);

  // gió từ ống: xoắn trôi lên, lặp
  api.origin("#wind", "0 0");
  api.set("#wind", 0, { opacity: 0 });
  for (var tw = 2.6; tw < 5.4; tw += 0.7) { api.key("#wind", "y", tw, 10, "none"); api.key("#wind", "y", tw + 0.7, -40, "sine.out"); api.key("#wind", "opacity", tw, 0, "none"); api.key("#wind", "opacity", tw + 0.2, 1, "sine.out"); api.key("#wind", "opacity", tw + 0.7, 0, "sine.in"); }

  // ---- Wob đi dọc rừng ống, áp tai nghe gió ----
  W.set(0, { x: 330, y: MAT + 10, size: 0.7, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0 });
  W.mouth(0, "smirk");
  W.walk(0, 2.4, 330, 930, { step: 0.3 });
  W.pose(0.6, 0.2, { pupX: -8, pupY: -6 }, "power2.out"); W.pose(1.5, 0.2, { pupX: 8, pupY: -10 }, "power2.out");
  // áp tai vào ống
  W.pose(2.5, 0.3, { lean: 9, upRot: 6, pupX: 10, pupY: 0 }, "power2.out");
  W.pose(2.75, 0.25, { aRu: -60, aRf: -70 }, "power2.out");    // khum tay sau tai
  W.pose(2.9, 0.3, { lid: 50 }, "power2.inOut");
  W.mouth(3.0, "o");
  W.shiver(3.3, 3.8, 1.2, 10);
  W.mouth(3.9, "grin");
  api.sfx("hoi-nuoc", 2.9, 0.2);
  W.pose(4.6, 0.3, { lean: 0, upRot: 0, lid: 0, aRu: -18, aRf: 10 }, "power2.inOut");
  // quay nhìn biển sau lưng
  W.pose(5.0, 0.2, { pupX: -11, pupY: -10 }, "power2.out");
  W.mouth(5.1, "o");
  W.walk(5.3, 6.1, 930, 860, { step: 0.4 });
  W.pose(t87 - 0.1, 0.12, { eye: 1.15 }, "back.out(2)"); W.pose(t87 + 0.4, 0.3, { eye: 1 }, "power2.out");
  W.idle(6.2, 7.2, { seed: 241 });
  // sang ba chiếc xe
  W.pose(7.2, 0.2, { pupX: 10, pupY: 0 }, "power2.out");
  W.mouth(7.3, "smirk");
  W.walk(7.35, 8.9, 860, 1640, { step: 0.26 });
  // so từng chiếc: nghiêng đầu trái, phải, rồi nhìn thẳng
  var tilt = [[9.05, -9, 6], [9.8, 9, 10], [10.55, -12, 11]];
  W.pose(tilt[0][0], 0.25, { upRot: tilt[0][1], pupX: tilt[0][2], pupY: -4 }, "back.out(1.5)");
  W.walk(9.4, 9.8, 1640, 1720, { step: 0.2 });
  W.pose(tilt[1][0], 0.25, { upRot: tilt[1][1], pupX: tilt[1][2], pupY: -6 }, "back.out(1.5)");
  W.pose(tilt[1][0] + 0.3, 0.15, { eye: 1.2 }, "back.out(2)");   // xe thứ hai y hệt: giữ 0,8 s
  W.mouth(tilt[1][0] + 0.3, "o");
  W.pose(10.95, 0.25, { upRot: 0, pupX: 0, pupY: 0, eye: 1 }, "power2.out");
  W.nhunVai(11.1, 0.8); W.mouth(11.15, "flat");
  W.idle(11.0, DUR, { seed: 242, bien: 1.2 });
  W.autoBlink(0.5, 2.5, 2401); W.autoBlink(6.2, 9.0, 2402);
};
