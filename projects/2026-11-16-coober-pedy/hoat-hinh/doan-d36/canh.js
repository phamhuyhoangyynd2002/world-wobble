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
/* Đoạn d36 · cắt giấy tông trầm · lịch sử nghiêm, không gag: Kanku-Breakaways lúc chiều. CHỈ PHONG CẢNH: không người, không biểu
   tượng hay hoa văn thổ dân. Wob nhỏ ngồi xa chân đồi, không chạm gì; mũ để lại trên ghế xe. Vào "giay", ra "cat".
   Chữ: "Kanku-Breakaways", "Antakirinja Matu-Yankunytjatjara", "2011", "~79,000 km²" (dải giấy nhỏ dưới khung, vùng an toàn). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, P = D.paper, R = D.rough, st = CP.st, MAT = 880, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tDrove = T("drove", 0, 4.9), tKanku = 5.9, tLeft = T("left", 0, 9.72), tCar = T("car", 0, 10.4), tFlat = 10.66, tWhite = T("white", 0, 12.76), tYel = T("yellow", 0, 13.44),
    tOra = T("orange", 0, 14.22), tRed = T("red", 0, 15.22), tThis = T("This", 0, 15.92), tAnt = 17.1, tWhole = T("whole", 0, 21.0), tNot = T("not", 0, 25.46), tTouch = T("touch", 0, 25.9),
    tBel = T("belongs", 0, 27.74), t2011 = 33.6, t79 = T("seventy-nine", 0, 37.16), tAcc = T("According", 0, 43.56);
  var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#cpEve)"/>';
  // lớp xa: dãy đồi đỉnh bằng xa tới chân trời
  function mesa(x, w, h, top, c, seed) {
    var pts = [[x - w / 2, 0], [x - w / 2 + w * 0.12, -h * 0.75], [x - w / 2 + w * 0.2, -h], [x + w / 2 - w * 0.22, -h], [x + w / 2 - w * 0.1, -h * 0.7], [x + w / 2, 0]];
    return D.paper(D.rough(pts, 3, seed, 22), c, { stroke: true, sw: 3, shadow: false }) + '<path d="' + D.rough([[x - w / 2 + w * 0.2, -h], [x + w / 2 - w * 0.22, -h], [x + w / 2 - w * 0.2, -h * 0.82], [x - w / 2 + w * 0.18, -h * 0.82]], 2, seed + 1, 22) + '" fill="' + top + '" opacity="0.8"/>';
  }
  var xa = "";
  for (var i = 0; i < 9; i++) xa += at(0, 760, mesa(-1500 + i * 560, 420 + (i % 3) * 120, 110 + (i % 4) * 25, "#EDE0C8", i % 2 ? "#C79A78" : "#BE8C6C", 3601 + i * 3));
  xa += '<rect x="-2000" y="760" width="6000" height="900" fill="#D6A27A"/><rect x="-2000" y="560" width="6000" height="300" fill="#F2C98E" opacity="0.25"/>';
  // lớp giữa: đồi chính có các tầng màu, đồi phụ, mặt đất, xe, đá, Wob, ba lô
  var giua = CP.datSaMac(D, -2400, 5400, MAT, 3620, "#CF9466");
  giua += at(0, MAT + 4, mesa(-300, 700, 300, "#EDE0C8", "#B9805E", 3630)) + at(0, MAT + 4, mesa(2700, 900, 340, "#EDE0C8", "#B57A58", 3633));
  var MX = 1250, MW = 1100, MH = 470, mp = [[MX - MW / 2, MAT + 4], [MX - MW / 2 + 120, MAT - MH * 0.7], [MX - MW / 2 + 220, MAT - MH], [MX + MW / 2 - 240, MAT - MH], [MX + MW / 2 - 110, MAT - MH * 0.65], [MX + MW / 2, MAT + 4]];
  var md = D.rough(mp, 3, 3640, 22);
  giua += '<clipPath id="mcl"><path d="' + md + '"/></clipPath>' + '<path d="' + md + '" fill="#0b1214" opacity="0.2" transform="translate(10,8)"/>' + '<path d="' + md + '" fill="#A98C74"/>';
  var bands = [["#F3EDE1", MAT - MH - 10, 110], ["#E8C15A", MAT - MH + 100, 105], ["#D9803E", MAT - MH + 205, 120], ["#8E3A26", MAT - MH + 325, 160]];
  giua += '<g clip-path="url(#mcl)">' + bands.map(function (b, k) {
    return g("band" + k, '<path d="' + D.rough([[MX - 700, b[1]], [MX + 700, b[1] + 10], [MX + 700, b[1] + b[2] + 6], [MX - 700, b[1] + b[2]]], 5, 3641 + k, 40) + '" fill="' + b[0] + '"/>' + st("M " + (MX - 700) + " " + (b[1] + b[2] * 0.5) + " C " + (MX - 200) + " " + (b[1] + b[2] * 0.4) + " " + (MX + 200) + " " + (b[1] + b[2] * 0.62) + " " + (MX + 700) + " " + (b[1] + b[2] * 0.5), 3, "#1f2326", ' opacity="0.15"'));
  }).join("") + "</g>" + '<path d="' + md + '" fill="none" stroke="#1f2326" stroke-width="4" stroke-linejoin="round"/>';
  for (var r = 0; r < 6; r++) giua += at(MX - 520 + r * 210, MAT + 14 + (r % 2) * 10, CP.rock(D, 30 + (r % 3) * 14, 3650 + r, "#B5683E"));
  giua += at(1320, MAT + 112, g("da", CP.rock(D, 26, 3660, "#9C5532")));
  giua += at(1470, MAT + 120, '<g transform="scale(0.5)">' + CP.packProp(true) + "</g>");
  var bc = D.boxCar("bc");
  var W = CP.wob(api, "W", { co: true, mu: false });
  var CXc = 330;
  giua += g("xe", '<g transform="translate(0,' + (MAT - 30) + ') scale(0.8)">' + bc.back + g("muGhe", '<g transform="translate(-10,-30)">' + CP.hatProp(0.55) + "</g>") + "</g>" + W.svg + '<g transform="translate(0,' + (MAT - 30) + ') scale(0.8)">' + bc.front + "</g>");
  var gan = "";
  [[-400, 90], [700, 110], [2000, 100], [3000, 90]].forEach(function (p, j) { gan += at(p[0], 1330, CP.bush(D, p[1], 3670 + j)); });
  // ánh chiều và nhãn tĩnh
  var phu = '<rect id="chieu" x="0" y="0" width="1920" height="1080" fill="#E0703A" opacity="0"/><rect id="toi" x="0" y="0" width="1920" height="1080" fill="#2A2238" opacity="0"/>';
  var nh = g("nK", CP.nhan(D, "nK0", CH[0], 44, { seed: 3680 }).replace('<g id="nK0">', '<g id="nK0" transform="translate(960,970)">')) +
    g("nA", CP.nhan(D, "nA0", CH[1], 46, { seed: 3681 }).replace('<g id="nA0">', '<g id="nA0" transform="translate(960,970)">')) +
    g("n11", CP.nhan(D, "n110", CH[2], 44, { seed: 3682 }).replace('<g id="n110">', '<g id="n110" transform="translate(220,960)">')) +
    g("n79", CP.nhan(D, "n790", CH[3], 44, { seed: 3683 }).replace('<g id="n790">', '<g id="n790" transform="translate(480,960)">'));
  api.dat(CP.defs() + troi + api.lop("xa", xa, 0.3, { mat: 760 }) + api.lop("giua", giua, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1100 }) + phu + nh);
  api.noi({});

  // nhãn: hiện lặng lẽ
  function hien(sel, t0, t1) { api.set(sel, 0, { opacity: 0 }); api.fade(sel, t0, 0.7, 1); if (t1) api.fade(sel, t1, 0.6, 0); }
  hien("#nK", tKanku, tCar - 0.2); hien("#nA", tAnt, tBel - 0.2); hien("#n11", t2011 + 0.1); hien("#n79", t79 + 0.1);
  // tầng màu hiện theo từng màu được đọc
  [tWhite, tYel, tOra, tRed - 0.25].forEach(function (t, k) { api.set("#band" + k, 0, { opacity: 0.3 }); api.fade("#band" + k, t - 0.05, 0.6, 1); });
  // ánh sáng: chiều chuyển dần sang cam, rồi hạ một nấc
  api.key("#chieu", "opacity", 0, 0); api.key("#chieu", "opacity", tBel, 0, "none"); api.key("#chieu", "opacity", t2011, 0.16, "sine.inOut");
  api.key("#toi", "opacity", 0, 0); api.key("#toi", "opacity", tAcc - 0.2, 0, "none"); api.key("#toi", "opacity", tAcc + 1.5, 0.2, "sine.inOut");

  // camera: không rung, chỉ đẩy/lùi chậm
  api.camera([
    [0, 700, 640, 1.15], [tDrove, 760, 620, 1.1, "sine.inOut"], [tCar, 620, 700, 1.3, "sine.inOut"],
    [tFlat + 1.0, 1250, 700, 1.5, "power2.inOut"], [tRed + 0.4, 1260, 700, 1.56, "sine.inOut"],
    [tThis + 1.2, 1150, 600, 1.0, "power2.inOut"], [tWhole - 0.4, 1160, 600, 1.03, "sine.inOut"],
    [tWhole + 1.0, 1340, 790, 1.7, "power2.inOut"], [tBel - 0.2, 1340, 785, 1.76, "sine.inOut"],
    [t2011 - 0.3, 1200, 640, 1.0, "sine.inOut"],
    [t2011 + 3.0, 1150, 560, 0.62, "sine.inOut"], [tAcc, 1150, 560, 0.6, "sine.inOut"], [DUR, 1150, 560, 0.585, "sine.inOut"]
  ]);

  // xe giấy chạy vào, dừng ở mép khung
  api.origin("#xe", "0 0");
  api.key("#xe", "x", 0, -700); api.key("#xe", "x", 2.8, CXc, "power2.out");
  api.key("#xe", "y", 0, 0); for (var tb = 0; tb < 2.8; tb += 0.15) api.key("#xe", "y", tb, (Math.round(tb / 0.15) % 2) ? -3 : 0, "none"); api.key("#xe", "y", 2.85, 0, "none");
  api.sfx("may-no", 0.3, 0.2);
  api.set("#muGhe", 0, { opacity: 1 });
  // Wob trong xe (đội mũ), bước xuống, rồi đặt mũ lên ghế
  W.set(0, { x: 0, y: MAT - 14, size: 0.5, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, pupX: 8 });
  W.mouth(0, "flat");
  W.idle(0, 3.6, { seed: 361, bien: 0.8 });
  W.pose(3.6, 0.35, { y: MAT - 120, x: 140 }, "power2.out"); W.pose(3.95, 0.35, { y: MAT + 110, x: 300 }, "power2.in");
  W.pose(4.3, 0.12, { sy: 0.9, sx: 1.06 }, "power2.in"); W.pose(4.42, 0.25, { sy: 1, sx: 1 }, "back.out(2)");
  W.pose(4.8, 0.4, { pupX: 10, pupY: -8 }, "sine.inOut");
  W.idle(4.7, tLeft - 0.6, { seed: 362, bien: 1 });
  W.pose(tLeft - 0.5, 0.25, { pupX: -10, pupY: 0 }, "power2.out");
  W.pose(tLeft - 0.2, 0.3, { aLu: 110, aLf: 0, lean: -4 }, "power2.out");   // chỉ về chiếc mũ trên ghế xe
  W.pose(tLeft + 0.9, 0.4, { aLu: 18, aLf: -10, lean: 0, pupX: 6 }, "power2.inOut");
  // đi ra chỗ ngồi xa chân đồi (ngoài khung lúc camera vào vách đồi), ngồi xuống
  W.walk(tFlat + 0.3, tThis - 0.4, 300, 910, { step: 0.4 });
  var tSit = tThis - 0.2;
  W.pose(tSit, 0.5, { upY: 80, legL: 82, legR: -82, legLs: 0.7, legRs: 0.7, aLu: -20, aLf: -40, aRu: 20, aRf: 40 }, "power2.inOut");
  W.idle(tSit + 0.6, DUR, { seed: 363, bien: 0.6 });
  W.pose(tThis + 1.0, 0.6, { pupX: 0, pupY: -10 }, "sine.inOut");
  // tay vừa định chạm hòn đá thì rút về đặt lên gối
  W.pose(tNot - 0.6, 0.45, { aRu: -60, aRf: -30, lean: 5, pupX: 12, pupY: 8 }, "power2.out");
  W.pose(tTouch - 0.05, 0.5, { aRu: 20, aRf: 40, lean: 0, pupX: 0, pupY: 0 }, "power2.inOut");
  W.mouth(tTouch + 0.2, "X");
  W.pose(tBel + 1.0, 1.0, { pupX: 6, pupY: -10 }, "sine.inOut");
  W.pose(t2011 + 2, 1.0, { pupX: -4, pupY: -12 }, "sine.inOut");
  W.pose(tAcc + 0.5, 0.8, { lid: 14, pupY: -8 }, "sine.inOut");
  W.autoBlink(5, tFlat, 3601); W.autoBlink(tSit + 1, DUR - 0.5, 3602);
};
