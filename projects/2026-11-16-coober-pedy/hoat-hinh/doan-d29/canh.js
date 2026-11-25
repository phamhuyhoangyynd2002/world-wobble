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
/* Đoạn d29 · cắt giấy · hồi ức: hai bưu thiếp cắt giấy trên mặt đá (sân cỏ dưới mưa / sân đá dưới sao), sợi chỉ đỏ nối.
   Vào "cat", ra "chen". Lời: "This club has a reciprocal arrangement with St Andrews in Scotland, often called the home of golf.
   Golf Digest reported that nobody knew of any St Andrews member who had actually come out to play."  Chữ: "ST ANDREWS". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, P = D.paper, R = D.rough, st = CP.st, fp = CP.fp;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tSt = T("St", 0, 2.04), tHome = T("home", 0, 4.62), tGD = T("Golf", 0, 5.76), tNob = T("nobody", 0, 7.14), tMem = T("member", 0, 9.28), tPlay = T("play", 0, 10.96);
  var CW = 640, CH = 430;
  function card(id, inner, seed) {
    return '<g id="' + id + '">' + P(D.rRect(-CW / 2 - 18, -CH / 2 - 18, CW + 36, CH + 36, 2, seed), "#FFF8EC", { stroke: true, sw: 5, sx: 12, sy: 16, shOp: 0.3 }) +
      '<clipPath id="' + id + '-c"><rect x="' + (-CW / 2) + '" y="' + (-CH / 2) + '" width="' + CW + '" height="' + CH + '"/></clipPath><g clip-path="url(#' + id + '-c)">' + inner + "</g>" +
      '<rect x="' + (-CW / 2) + '" y="' + (-CH / 2) + '" width="' + CW + '" height="' + CH + '" fill="none" stroke="#1f2326" stroke-width="4"/></g>';
  }
  // bưu thiếp trái: sân cỏ xanh mướt dưới mưa, một chiếc ô giấy đứng yên (không người)
  var L = '<rect x="-400" y="-300" width="800" height="600" fill="#8FA3AE"/>' + D.paper(D.rough([[-400, -40], [-100, -70], [200, -50], [400, -80], [400, 300], [-400, 300]], 3, 2901, 30), "#5E9A4A", { shadow: false, stroke: true, sw: 3 }) +
    D.paper(D.rough([[-400, 60], [0, 30], [400, 50], [400, 300], [-400, 300]], 3, 2902, 30), "#76B05A", { shadow: false, stroke: true, sw: 3 }) +
    [[-200, -170, 120], [80, -190, 150], [260, -150, 110]].map(function (c, i) { return at(c[0], c[1], D.puff(c[2] * 0.5, 2903 + i, "#6E7F8A")); }).join("") +
    at(40, 120, g("umb", st("M 0 -10 L 0 70 C 0 84 -16 84 -16 72", 6, "#3A2E28") + fp("M -90 -10 C -80 -80 80 -80 90 -10 C 60 -22 30 -22 0 -10 C -30 -22 -60 -22 -90 -10 Z", "#D9543C", 4))) +
    g("mua", (function () { var s = "", r = D.rng(2905); for (var i = 0; i < 46; i++) { var x = -330 + r() * 660, y = -260 + r() * 560; s += st("M " + CP.f1(x) + " " + CP.f1(y) + " l -10 34", 3, "#DCEBF0", ' opacity="0.8"'); } return s; })()) +
    at(0, 172, '<g>' + D.paper(D.rRect(-150, -30, 300, 60, 1.5, 2906), "#FFF8EC", { stroke: true, sw: 3, sx: 3, sy: 4 }) + D.txt(0, 16, data.chu_tren_do_vat[0], 44, { w: 900 }) + "</g>");
  // bưu thiếp phải: sân đá trắng dưới sao, ghế chờ khách trống phủ mạng nhện
  var Rr = '<rect x="-400" y="-300" width="800" height="600" fill="#1D2C48"/>' + (function () { var s = "", r = D.rng(2910); for (var i = 0; i < 40; i++) s += '<circle cx="' + CP.f1(-320 + r() * 640) + '" cy="' + CP.f1(-210 + r() * 200) + '" r="' + CP.f1(1.5 + r() * 2) + '" fill="#FFF6DA"/>'; return s; })() +
    D.paper(D.rough([[-400, 30], [400, 10], [400, 300], [-400, 300]], 3, 2911, 30), "#B07A4E", { shadow: false, stroke: true, sw: 3 }) +
    D.paper(D.rough([[-400, 80], [400, 60], [400, 160], [-400, 190]], 3, 2912, 30), "#EDE8DC", { shadow: false, stroke: true, sw: 3 }) +
    at(150, 70, '<g>' + D.paper(D.rRect(-90, -60, 180, 18, 1, 2913), "#7A5236", { stroke: true, sw: 3, sx: 3, sy: 3 }) + D.paper(D.rRect(-95, -20, 190, 18, 1, 2914), "#7A5236", { stroke: true, sw: 3, sx: 3, sy: 3 }) +
      st("M -80 -2 L -84 40 M 80 -2 L 84 40", 6, "#553521") + "</g>") +
    at(150, 40, g("web", st("M -80 -40 L 80 30 M -80 30 L 80 -40 M 0 -50 L 0 40 M -60 -5 L 60 -5", 2, "#F4F4F0", ' opacity="0.9"') +
      st("M -40 -22 Q 0 -10 40 -22 M -40 12 Q 0 0 40 12 M -60 -32 Q 0 -14 60 -32", 2, "#F4F4F0", ' opacity="0.8"')));
  var nen = '<rect x="-800" y="-600" width="3520" height="2300" fill="#B5683E"/>' + '<rect x="-800" y="-600" width="3520" height="2300" fill="url(#half)" opacity="0.07"/>';
  var Rd = D.rng(2920);
  for (var k = 0; k < 30; k++) nen += at(Math.round(-300 + Rd() * 2500), Math.round(-100 + Rd() * 1300), CP.rock(D, 14 + Rd() * 26, 2921 + k, "#9C5532"));
  nen += st("M 0 0 L 1 0", 1, "none");
  var giua = nen + at(560, 470, card("cL", L, 2930)) + at(1360, 470, card("cR", Rr, 2931));
  giua += '<path id="chi" d="M 560 270" fill="none" stroke="#D9543C" stroke-width="7" stroke-linecap="round"/>';
  giua += '<circle cx="560" cy="270" r="12" fill="#D9543C" stroke="#1f2326" stroke-width="3"/><circle id="ghim2" cx="1360" cy="270" r="12" fill="#D9543C" stroke="#1f2326" stroke-width="3"/>';
  var W = CP.wob(api, "W", { co: true });
  giua += W.svg;
  giua += g("thoi", [0, 1, 2].map(function (i) { return at(-i * 26, -i * 14, D.puff(14 + i * 5, 2940 + i, "#F4F1E8")); }).join(""));
  api.dat(CP.defs() + api.lop("giua", giua, 1, { mat: 1000 }));
  api.noi({});

  // đặt bưu thiếp
  api.duaRut("#cL", 0.15, { tu: [0, -900], giu: 99, vao: 0.45 }); api.duaRut("#cR", 0.7, { tu: [0, -900], giu: 99, vao: 0.45 });
  api.sfx("drop", 0.6, 0.3); api.sfx("drop", 1.15, 0.3);
  // sợi chỉ đỏ kéo căng từ ghim trái sang ghim phải
  var pth = api.duong([[560, 270], [760, 330], [960, 350], [1160, 330], [1360, 270]]);
  var t0c = 1.7, t1c = 3.5, el = null;
  api.moiKhung(function (t) {
    if (!el) el = window.document.getElementById("chi");
    if (!el) return;
    var u = Math.max(0, Math.min(1, (t - t0c) / (t1c - t0c)));
    var d = pth.den(u);
    if (t > t1c + 0.05) { var k = Math.min(1, (t - t1c) / 0.3); d = "M 560 270 Q 960 " + CP.f1(350 - 70 * k) + " 1360 270"; }
    el.setAttribute("d", d);
  });
  api.set("#ghim2", 0, { opacity: 0 }); api.show("#ghim2", t1c, 1);
  api.sfx("pop", t1c, 0.35);

  api.camera([
    [0, 960, 560, 0.92], [tHome, 960, 540, 0.96, "sine.inOut"],
    [tGD + 0.3, 600, 500, 1.6, "power2.inOut"],     // vào bưu thiếp sân cỏ dưới mưa
    [tNob + 0.2, 610, 510, 1.66, "sine.inOut"],
    [tNob + 1.1, 1440, 650, 1.22, "power2.inOut"],  // sang bưu thiếp sân đá
    [DUR, 1460, 655, 1.27, "sine.inOut"]
  ]);
  // mưa rơi
  api.origin("#mua", "0 0");
  for (var tm = 0; tm < DUR; tm += 0.25) { api.key("#mua", "y", tm, 0, "none"); api.key("#mua", "y", tm + 0.249, 60, "none"); }
  api.origin("#umb", "0 0"); api.key("#umb", "rotation", 0, -2); for (var tu = 0.8; tu < DUR; tu += 1.4) api.key("#umb", "rotation", tu, (tu % 2.8 < 1.4) ? 2 : -2, "sine.inOut");

  // Wob: đặt thiếp, kéo chỉ, rồi thổi bụi ghế chờ khách
  W.set(0, { x: 860, y: 1030, size: 0.62, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0 });
  W.mouth(0, "smirk");
  W.pose(0.1, 0.25, { aLu: -150, aLf: -20, aRu: 150, aRf: 20, pupY: -12 }, "power2.out");
  W.pose(1.2, 0.3, { aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupY: 0 }, "power2.inOut");
  W.walk(1.4, 1.75, 860, 600, { step: 0.18 });
  W.pose(1.75, 0.15, { aRu: -150, aRf: -10, pupX: 10, pupY: -12 }, "power2.out");
  W.walk(1.9, t1c, 600, 1200, { step: 0.3, arms: false });
  W.pose(t1c, 0.15, { lean: -8, sy: 0.95 }, "power2.out"); W.pose(t1c + 0.15, 0.3, { lean: 0, sy: 1, aRu: -18, aRf: 10 }, "back.out(2)");   // giật căng
  W.mouth(t1c + 0.1, "grin");
  W.idle(t1c + 0.5, tNob + 0.4, { seed: 291, liec: true });
  W.walk(tNob + 0.3, tNob + 1.2, 1200, 1700, { step: 0.26 });
  var tBlow = tMem - 0.6;
  W.pose(tBlow - 0.3, 0.3, { lean: -10, upRot: -8, pupX: -12, pupY: -8 }, "power2.out");
  W.mouth(tBlow - 0.05, "o");
  W.pose(tBlow, 0.12, { sy: 1.06, sx: 0.96 }, "power2.out"); W.pose(tBlow + 0.3, 0.2, { sy: 1, sx: 1 }, "power2.out");
  api.origin("#thoi", "0 0"); var mx = 1700 - 30, my = 1030 - 170;
  api.set("#thoi", 0, { x: mx, y: my, opacity: 0, scale: 0.5 });
  api.key("#thoi", "opacity", tBlow, 1, "none"); api.key("#thoi", "x", tBlow, mx, "none"); api.key("#thoi", "x", tBlow + 0.5, mx - 140, "power2.out");
  api.key("#thoi", "scale", tBlow, 0.5, "none"); api.key("#thoi", "scale", tBlow + 0.5, 1.4, "power2.out"); api.key("#thoi", "opacity", tBlow + 0.6, 0, "power2.in");
  api.sfx("hoi-nuoc", tBlow, 0.35);
  // mạng nhện bay lên rồi rơi lại đúng chỗ cũ
  api.origin("#web", "0 0");
  api.key("#web", "y", 0, 0); api.key("#web", "y", tBlow + 0.15, 0, "none"); api.key("#web", "y", tBlow + 0.6, -90, "power2.out"); api.key("#web", "y", tBlow + 1.3, 0, "sine.inOut");
  api.key("#web", "rotation", 0, 0); api.key("#web", "rotation", tBlow + 0.15, 0, "none"); api.key("#web", "rotation", tBlow + 0.6, -14, "power2.out"); api.key("#web", "rotation", tBlow + 1.3, 0, "sine.inOut");
  api.sfx("im-lang", tBlow + 1.4, 0.3);
  W.pose(tBlow + 0.5, 0.25, { lean: 0, upRot: 0, pupY: -16, pupX: -8 }, "power2.out");
  W.mouth(tBlow + 0.5, "flat");
  W.pose(tBlow + 1.4, 0.3, { pupX: 0, pupY: 0, lid: 24 }, "power2.out");    // nhìn ống kính, giữ
  W.idle(tBlow + 0.6, DUR, { seed: 292, bien: 0.9 });
  W.autoBlink(3.8, tNob, 2901);
};
