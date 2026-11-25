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
/* Đoạn d25 · cắt giấy · hồi ức: trang sổ có đồng hồ quay tới chiều → sân golf đá trắng lúc chiều tà. Vào "giay", ra "chen".
   Lời: "Late afternoon, when the sun finally lowered its voice, I went to play golf. The Opal Fields Golf Club was set up in
   nineteen seventy-six, and it has no grass at all. The fairways are white crushed rock. The greens, which they call scrapes,
   are rock dust mixed with waste oil. Players carry a small square of artificial turf to hit from."
   Chữ: "OPAL FIELDS GOLF CLUB · 1976", "scrapes". Trang phục: mũ kraft, ba lô ô liu + thảm đỏ; gậy golf. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, P = D.paper, R = D.rough, st = CP.st, fp = CP.fp;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var MAT = 880;
  var tLate = T("Late", 0, 1.6), tLow = T("lowered", 0, 3.65), tGolf = T("golf", 0, 5.49), tClub = T("Club", 0, 7.36), tNo = T("no", 0, 10.25),
    tGrass = T("grass", 0, 10.5), tFair = T("fairways", 0, 11.76), tScr = T("scrapes", 0, 15.24), tDust = T("dust", 0, 16.68), tPl = T("Players", 0, 18.66), tTurf = T("turf", 0, 20.99);

  // ================= sân golf =================
  var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#cpEve)"/>';
  var xa = '<circle cx="1640" cy="560" r="190" fill="#FFE2A8" opacity="0.35"/><circle cx="1640" cy="560" r="86" fill="#FFD27A" stroke="#1f2326" stroke-width="3" stroke-opacity="0.3"/>';
  xa += CP.doiXa(D, -900, 3400, 760, 50, 2501, "#C98A5A");
  for (var m = 0; m < 14; m++) xa += at(-700 + m * 300 + (m % 3) * 60, 770, '<g transform="scale(0.5)">' + CP.mullock(D, 260 + (m % 3) * 60, 120 + (m % 4) * 30, 2510 + m, "#E2C9A0") + "</g>");
  var giua = CP.datSaMac(D, -1200, 4600, MAT, 2520, "#C9874F");
  // đường đá trắng + bóng dài
  giua += P(R([[-1200, MAT + 40], [4600, MAT + 30], [4600, MAT + 150], [-1200, MAT + 170]], 3, 2521, 30), "#F1ECE0", { shadow: false, stroke: true, sw: 4 });
  var Rg = D.rng(2522);
  for (var k = 0; k < 90; k++) giua += '<ellipse cx="' + Math.round(-1100 + Rg() * 5600) + '" cy="' + Math.round(MAT + 55 + Rg() * 100) + '" rx="' + Math.round(4 + Rg() * 6) + '" ry="3" fill="#CFC6B2"/>';
  // vùng tròn sẫm (scrape) + cờ lỗ
  var SX = 2700;
  giua += '<g id="scr">' + P(D.rEll(SX, MAT + 95, 260, 50, 3, 2523), "#3A302A", { stroke: true, sw: 4, shadow: false }) + '<ellipse cx="' + (SX - 60) + '" cy="' + (MAT + 82) + '" rx="120" ry="14" fill="#6A5A50" opacity="0.6"/></g>';
  giua += '<path d="M ' + (SX + 8) + ' ' + (MAT + 95) + ' L ' + (SX - 300) + ' ' + (MAT + 125) + '" stroke="#5B3A28" stroke-width="10" opacity="0.35"/>';
  giua += st("M " + SX + " " + (MAT + 95) + " L " + SX + " " + (MAT - 220), 7, "#E9E7DF") + g("flag", fp("M " + SX + " " + (MAT - 220) + " L " + (SX + 110) + " " + (MAT - 190) + " L " + SX + " " + (MAT - 160) + " Z", "#D9543C", 4));
  giua += '<ellipse cx="' + SX + '" cy="' + (MAT + 95) + '" rx="16" ry="6" fill="#050708"/>';
  giua += at(SX + 240, MAT + 20, g("tag", P(D.rRect(-6, -150, 12, 150, 1, 2524), "#7A5236", { stroke: true, sw: 3 }) + CP.nhan(D, "tagN", data.chu_tren_do_vat[1], 48, { seed: 2525 }).replace('<g id="tagN">', '<g id="tagN" transform="translate(0,-170)">')));
  // biển câu lạc bộ
  var bw = 800;
  giua += at(820, MAT + 10, g("club", P(D.rRect(-300, -270, 16, 270, 1, 2526), "#7A5236", { stroke: true, sw: 4 }) + P(D.rRect(284, -270, 16, 270, 1, 2527), "#7A5236", { stroke: true, sw: 4 }) +
    P(D.rRect(-bw / 2, -380, bw, 130, 2, 2528), "#F6EEDC", { stroke: true, sw: 5, half: 0.08 }) + D.txt(0, -300, data.chu_tren_do_vat[0], 42, { w: 900 })));
  // miếng cỏ vuông + bóng (đặt xuống)
  giua += at(0, 0, g("sq", P(D.rRect(-55, -14, 110, 28, 1.5, 2529), "#5E9A4A", { stroke: true, sw: 4, sx: 3, sy: 4 }) + st("M -46 -14 L -44 -22 M -24 -14 L -22 -23 M 0 -14 L 2 -22 M 24 -14 L 26 -23 M 44 -14 L 46 -21", 3, "#3F7434")));
  giua += g("ball", '<circle cx="0" cy="-34" r="16" fill="#FFFFFF" stroke="#1f2326" stroke-width="4"/>');
  var lens = '<g transform="translate(0,-10)"><circle cx="0" cy="-60" r="40" fill="#CFE6EE" fill-opacity="0.5" stroke="#1f2326" stroke-width="7"/>' + st("M 0 -20 L 0 30", 10, "#7A5236") + "</g>";
  var turfH = '<g transform="translate(0,22)">' + P(D.rRect(-50, -12, 100, 24, 1.5, 2530), "#5E9A4A", { stroke: true, sw: 4, shadow: false }) + "</g>";
  var W = CP.wob(api, "W", { holdL: g("W-club", CP.club(200)), holdR: g("W-lens", lens) + g("W-turf", turfH) + g("W-da", '<g transform="translate(0,-6)">' + P(D.rEll(0, 0, 22, 16, 2, 2533), "#F4F0E6", { stroke: true, sw: 4 }) + "</g>") });
  giua += W.svg;
  // bong bóng phóng to: mặt đá trắng, đúng một hạt sỏi
  giua += g("zoom", P(D.rEll(0, 0, 170, 170, 2, 2531), "#F1ECE0", { stroke: true, sw: 7 }) + '<circle cx="0" cy="0" r="160" fill="url(#half)" opacity="0.05"/>' +
    '<circle cx="-60" cy="40" r="10" fill="#E2DACA"/><circle cx="70" cy="-50" r="8" fill="#E2DACA"/>' + P(D.rEll(18, 22, 24, 17, 2, 2532), "#9C8F7C", { stroke: true, sw: 4 }));
  var gan = "";
  [[-300, 80], [900, 110], [2100, 90], [3300, 100]].forEach(function (p, i) { gan += at(p[0], 1290, CP.rock(D, p[1], 2540 + i, "#9E5E36")) + at(p[0] + 200, 1300, CP.bush(D, 80, 2550 + i)); });

  // ================= trang sổ có đồng hồ =================
  var tr = '<rect x="-400" y="-300" width="2720" height="1680" fill="#CDBB94"/>';
  tr += at(260, 90, D.journalPage(1400, 900, { seed: 2560 }));
  var CX = 960, CY = 520;
  var clock = P(D.rEll(0, 0, 250, 250, 2, 2561), "#FFF8EC", { stroke: true, sw: 7, sx: 10, sy: 12 });
  for (var h = 0; h < 12; h++) { var a = h * Math.PI / 6; clock += st("M " + CP.f1(Math.sin(a) * 200) + " " + CP.f1(-Math.cos(a) * 200) + " L " + CP.f1(Math.sin(a) * 232) + " " + CP.f1(-Math.cos(a) * 232), h % 3 ? 5 : 9); }
  clock += g("kimP", st("M 0 20 L 0 -205", 7, "#D9543C")) + g("kimG", st("M 0 16 L 0 -130", 13)) + '<circle cx="0" cy="0" r="16" fill="#1f2326"/>';
  tr += at(CX, CY, clock);
  // mặt trời nhỏ trên cung, hạ dần
  tr += st("M 1290 640 C 1330 360 1480 300 1590 640", 3, "#C9A46A", ' stroke-dasharray="10 12"');
  tr += g("sunP", '<circle cx="0" cy="0" r="38" fill="#FFD27A" stroke="#1f2326" stroke-width="4"/>' + st("M 0 -52 L 0 -64 M 52 0 L 64 0 M -52 0 L -64 0 M 37 -37 L 46 -46 M -37 -37 L -46 -46", 5, "#E0A33A"));
  var Wp = CP.wob(api, "Wp", { holdL: CP.club(200) });
  tr += Wp.svg;
  tr = g("pg", tr);

  api.dat(CP.defs() + troi + api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", giua, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1120 }) + api.lop("trang", tr, 1, { mat: 990 }));
  api.noi({ kieu: { xa: "khong", giua: "khong", gan: "khong", trang: "khong" } });

  // ---- trang sổ: kim quay tới chiều, mặt trời hạ, rồi lao vào mặt đồng hồ, trang tan ----
  api.origin("#kimP", "0 0"); api.origin("#kimG", "0 0");
  api.key("#kimP", "rotation", 0, 0); api.key("#kimP", "rotation", tLate - 0.1, 0, "none"); api.key("#kimP", "rotation", tLow + 0.6, 360 * 4 + 300, "power2.inOut");
  api.key("#kimG", "rotation", 0, 0); api.key("#kimG", "rotation", tLate - 0.1, 0, "none"); api.key("#kimG", "rotation", tLow + 0.6, 145, "power2.inOut");
  for (var ts = tLate; ts < tLow + 0.6; ts += 0.5) api.sfx("bonk", ts, 0.12);
  var sunPath = api.duong([[1290, 640], [1350, 420], [1440, 340], [1530, 420], [1590, 640]]);
  api.origin("#sunP", "0 0");
  [0, 0.3, 0.45, 0.6, 0.75, 0.88].forEach(function (u, i) { var p = sunPath.at(u), t = i === 0 ? 0 : tLate + (tLow + 0.6 - tLate) * (i / 5); api.key("#sunP", "x", t, p.x, i ? "sine.inOut" : "none"); api.key("#sunP", "y", t, p.y, i ? "sine.inOut" : "none"); });
  Wp.set(0, { x: 1520, y: 990, size: 0.5, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, pupX: -10, pupY: -6 });
  Wp.mouth(0, "flat");
  Wp.pose(tLate, 0.3, { pupX: -12, pupY: -10 }, "power2.out");
  Wp.pose(tLow - 0.3, 0.2, { pupX: -4, pupY: -12 }, "power2.out"); Wp.mouth(tLow, "smirk");
  Wp.idle(0.3, 4.4, { seed: 251 });
  Wp.walk(4.0, 4.5, 1520, 1300, { step: 0.25 });
  api.camera([[0, 960, 560, 1.0], [3.9, 960, 540, 1.06, "sine.inOut"], [4.6, CX, CY, 3.2, "power3.in"], [DUR, CX, CY, 3.2]], ["trang"]);
  api.key("#pg", "opacity", 0, 1); api.key("#pg", "opacity", 4.35, 1, "none"); api.key("#pg", "opacity", 4.65, 0, "power2.in");
  api.show("#L-trang", 0, 1); api.show("#L-trang", 4.7, 0);
  api.sfx("whoosh", 4.2, 0.35);

  // ---- camera sân golf ----
  api.camera([
    [0, 700, 560, 1.4], [4.4, 700, 560, 1.4], [5.1, 640, 600, 1.0, "power3.out"],
    [6.3, 760, 590, 1.0, "sine.inOut"], [tClub + 0.4, 820, 560, 1.05, "sine.inOut"],
    [tNo - 0.3, 1080, 700, 1.25, "power2.inOut"], [tGrass + 0.9, 1100, 690, 1.3, "sine.inOut"],
    [tFair + 0.4, 1150, 640, 1.05, "power2.inOut"],
    [tFair + 2.2, 2700, 660, 1.08, "power2.inOut"],    // lướt dọc đường đá trắng tới vùng tròn sẫm
    [tDust, 2860, 660, 1.14, "sine.inOut"],
    [tPl + 0.2, 2500, 760, 1.35, "power2.inOut"], [DUR, 2480, 780, 1.42, "sine.inOut"]
  ], ["xa", "giua", "gan"]);

  // ---- Wob vác gậy bước ra, đọc biển ----
  W.set(0, { x: 300, y: MAT + 120, size: 0.62, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0 });
  api.set("#W-lens", 0, { opacity: 0 }); api.set("#W-da", 0, { opacity: 0 }); api.set("#W-turf", 0, { opacity: 0 });
  W.mouth(0, "smirk");
  W.walk(4.7, 6.6, 300, 1000, { step: 0.3, arms: "R" });
  api.origin("#club", "0 0"); api.key("#club", "scaleY", 0, 0.02); api.key("#club", "scaleY", tClub - 0.4, 0.02, "none"); api.key("#club", "scaleY", tClub, 1, "back.out(1.8)");
  api.sfx("pop", tClub - 0.05, 0.4);
  W.pose(tClub - 0.2, 0.25, { pupX: -10, pupY: -12 }, "power2.out"); W.mouth(tClub, "grin");
  W.idle(6.6, tNo - 0.6, { seed: 252, liec: false });
  // kính lúp tìm cỏ: chỉ một hạt sỏi
  var tB = tNo - 0.45;
  W.set(tB - 0.05, {}); api.show("#W-lens", tB, 1);
  W.pose(tB, 0.35, { lean: 14, upY: 18, aRu: 40, aRf: 30, pupX: 8, pupY: 12 }, "power2.out");
  W.mouth(tB + 0.2, "o");
  var hz = W.hand("R", tB + 0.4);
  api.origin("#zoom", "0 0");
  api.set("#zoom", 0, { x: hz.x + 170, y: hz.y - 300 });
  api.set("#zoom", 0, { scale: 0 });
  // cúi tìm cỏ, chỉ nhặt được một viên đá trắng: giơ lên, giữ 0,8 s
  api.show("#W-lens", tGrass - 0.35, 0); api.show("#W-da", tGrass - 0.35, 1);
  W.pose(tGrass - 0.3, 0.35, { lean: 0, upY: 0, aRu: -150, aRf: -20, pupX: 10, pupY: -14 }, "back.out(1.5)");
  api.sfx("pop", tGrass, 0.4);
  W.pose(tGrass + 0.3, 0.2, { eye: 1.2 }, "back.out(2)"); W.mouth(tGrass + 0.4, "wobbly");
  W.pose(tFair - 0.4, 0.3, { lean: 0, upY: 0, aRu: -18, aRf: 10, eye: 1, pupY: 0 }, "power2.inOut");
  api.show("#W-da", tFair - 0.15, 0);
  api.sfx("liu-lo-hoi", tGrass + 0.4, 0.4);
  // đi dọc đường đá trắng tới vùng tròn
  W.walk(tFair + 0.1, tScr - 0.3, 1000, 2350, { step: 0.3, arms: "R" });
  W.mouth(tFair + 0.2, "smirk");
  api.origin("#tag", "0 0"); api.key("#tag", "scaleY", 0, 0.02); api.key("#tag", "scaleY", tScr - 0.3, 0.02, "none"); api.key("#tag", "scaleY", tScr + 0.05, 1, "back.out(2)");
  api.sfx("pop", tScr - 0.05, 0.4);
  W.pose(tScr, 0.25, { pupX: 12, pupY: -4 }, "power2.out"); W.mouth(tScr + 0.1, "o");
  // vệt bóng dầu trên scrape
  api.origin("#flag", CP.f1(SX) + " " + (MAT - 190));
  for (var tf = 0; tf < DUR; tf += 0.6) api.key("#flag", "scaleX", tf + 0.3, tf % 1.2 < 0.6 ? 0.85 : 1, "sine.inOut");
  W.nhonChan(tDust - 0.2, 1.0, { lean: 6, nhin: [12, 8] });
  W.mouth(tDust + 0.5, "flat");
  W.idle(tScr + 0.3, tPl - 0.3, { seed: 253 });
  // đặt miếng cỏ vuông xuống đá, đặt bóng lên
  api.show("#W-turf", tPl - 0.1, 1);
  W.pose(tPl, 0.5, { lean: 16, upY: 26, sy: 0.92, aRu: 38, aRf: 4, pupX: 6, pupY: 14 }, "power2.inOut");
  W.mouth(tPl + 0.2, "smirk");
  var tPut = tPl + 1.1, hp = W.hand("R", tPut);
  api.show("#W-turf", tPut, 0);
  api.set("#sq", 0, { x: hp.x + 70, y: MAT + 110, opacity: 0 }); api.show("#sq", tPut, 1);
  api.set("#ball", 0, { x: hp.x + 70, y: MAT + 110, opacity: 0 });
  api.sfx("drop", tPut, 0.35);
  W.pose(tPut + 0.3, 0.4, { lean: 0, upY: 0, sy: 1, aRu: -18, aRf: 10, pupY: 10 }, "power2.inOut");
  api.key("#ball", "y", tTurf - 0.4, MAT + 10, "none"); api.key("#ball", "y", tTurf, MAT + 110, "bounce.out");
  api.show("#ball", tTurf - 0.4, 1);
  api.sfx("bonk", tTurf + 0.05, 0.3);
  W.mouth(tTurf + 0.2, "grin");
  W.idle(tPut + 0.7, DUR, { seed: 254, bien: 1.4 });
  W.autoBlink(5, 9.5, 2501); W.autoBlink(13, 18, 2502);
};
