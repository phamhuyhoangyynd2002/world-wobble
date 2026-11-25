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
/* Đoạn d33 · cắt giấy · hồi ức: ban ngày giữa bãi đống đất, miệng giếng, tôn gỉ, lưới thép, đống đất lún; lùi ra cánh đồng chấm đen;
   biển cảnh báo (chỉ biểu tượng). Vào "cat", ra "chen". Không chữ.
   Lời: "Then there are the holes. Old mine shafts sit all around town, some unmarked, some hidden under sheets of iron or mesh or a
   heap of dirt. Nobody seems to have an exact count. One local rescuer, according to the ABC, put it at around two million.
   Warning signs stand at the entrances to the opal fields," */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, P = D.paper, R = D.rough, st = CP.st, fp = CP.fp, MAT = 880;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tHoles = T("holes", 0, 1.5), tOld = T("Old", 0, 2.41), tIron = T("iron", 0, 7.06), tMesh = T("mesh", 0, 7.55), tHeap = T("heap", 0, 8.35),
    tNobody = T("Nobody", 0, 9.45), tTwo = T("two", 0, 15.53), tWarn = T("Warning", 0, 16.68);
  var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#cpDay)"/><circle cx="1500" cy="200" r="70" fill="#FFF0C4" stroke="#1f2326" stroke-width="3" stroke-opacity="0.3"/>';
  // lớp xa: đồi + đống đất nhỏ + chấm đen tới chân trời
  var xa = CP.doiXa(D, -1500, 3600, 700, 40, 3301, "#DDB286") + '<rect x="-1500" y="700" width="5100" height="1200" fill="#D9A066"/>';
  var Rx = D.rng(3302);
  for (var i = 0; i < 260; i++) { var y = 705 + Math.pow(Rx(), 1.6) * 520, s = 0.25 + (y - 705) / 520 * 1.2; xa += '<ellipse cx="' + Math.round(-1400 + Rx() * 4900) + '" cy="' + Math.round(y) + '" rx="' + CP.f1(9 * s) + '" ry="' + CP.f1(3.4 * s) + '" fill="#1A1410"/>'; if (i % 4 === 0) xa += at(Math.round(-1400 + Rx() * 4900), Math.round(y), '<g transform="scale(' + CP.f1(0.12 * s + 0.08) + ')">' + CP.mullock(D, 300, 140, 3303 + i, "#E6D3AE") + "</g>"); }
  // lớp giữa
  var giua = CP.datSaMac(D, -2600, 6200, MAT, 3310, "#D9A066");
  var Rg = D.rng(3311);
  for (var k = 0; k < 220; k++) { var yy = MAT + 60 + Rg() * 1500, sc = 0.6 + (yy - MAT) / 900; giua += '<ellipse cx="' + Math.round(-2500 + Rg() * 8600) + '" cy="' + Math.round(yy) + '" rx="' + CP.f1(26 * sc) + '" ry="' + CP.f1(9 * sc) + '" fill="#1A1410"/>'; }
  [[-500, 420, 220], [1200, 380, 200], [2050, 460, 240], [3100, 400, 210], [3700, 500, 260]].forEach(function (m, j) { giua += at(m[0], MAT + 8, CP.mullock(D, m[1], m[2], 3320 + j)); });
  giua += at(900, MAT + 80, CP.shaft(D, 110, 38, 3330));                                       // miệng giếng trống
  giua += at(1420, MAT + 90, CP.shaft(D, 100, 34, 3331)) + at(1460, MAT + 82, '<g transform="rotate(-6)">' + P(D.rRect(-120, -26, 170, 52, 2, 3332), "#9A5A36", { stroke: true, sw: 4, half: 0.15 }) + st("M -110 -12 L 40 -12 M -110 4 L 40 4", 3, "#6E3A22") + "</g>");   // tôn gỉ che dở
  giua += at(1950, MAT + 90, CP.shaft(D, 100, 34, 3333)) + at(1950, MAT + 90, '<g opacity="0.9">' + st("M -110 -30 L 110 30 M -110 0 L 90 40 M -90 -36 L 110 4 M 110 -30 L -110 30 M 110 0 L -90 40 M 90 -36 L -110 4", 3, "#5E6668") + "</g>");   // lưới thép
  giua += at(2450, MAT + 70, '<g>' + P(D.rough([[-130, 20], [-90, -40], [0, -60], [90, -40], [130, 20]], 3, 3334, 16), "#D7BF96", { stroke: true, sw: 4 }) + '<ellipse cx="0" cy="-36" rx="40" ry="10" fill="#A8885E"/></g>');   // đống đất lún nhẹ
  // biển cảnh báo chỉ có biểu tượng
  var bien = P(D.rRect(-10, -300, 20, 300, 1, 3340), "#7A5236", { stroke: true, sw: 4 }) + P(D.rRect(-130, -470, 260, 200, 2, 3341), "#F6EEDC", { stroke: true, sw: 5 }) +
    fp("M 0 -455 L 110 -290 L -110 -290 Z", "#E8B04A", 6) + '<ellipse cx="10" cy="-312" rx="44" ry="11" fill="#1f2326"/>' +
    '<circle cx="-14" cy="-392" r="11" fill="#1f2326"/>' + st("M -6 -380 L 6 -340 M 0 -366 L -26 -372 M 0 -366 L 22 -386 M 6 -340 L -6 -322 M 6 -340 L 22 -326", 6);
  giua += at(2760, MAT + 20, g("bien", bien));
  var W = CP.wob(api, "W", {});
  giua += W.svg;
  var gan = "";
  [[-200, 90], [1100, 120], [2300, 100], [3500, 110]].forEach(function (p, j) { gan += at(p[0], 1290, CP.rock(D, p[1], 3350 + j, "#B06C40")); });
  // vành mũ tiền cảnh (tĩnh, ngoài camera)
  var brim = g("brim", '<path d="M -200 -40 C 300 160 1620 160 2120 -40 L 2120 -400 L -200 -400 Z" fill="#C9A46A" stroke="#1f2326" stroke-width="8"/>' + st("M 0 20 C 500 170 1420 170 1920 20", 4, "#9C7A44", ' opacity="0.7"') +
    '<path d="M -200 -40 C 300 160 1620 160 2120 -40" fill="none" stroke="#0b1214" stroke-opacity="0.25" stroke-width="22" transform="translate(0,14)"/>');
  api.dat(CP.defs() + troi + api.lop("xa", xa, 0.35, { mat: 700 }) + api.lop("giua", giua, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1100 }) + brim);
  api.noi({});

  api.camera([
    [0, 640, 620, 1.0], [0.8, 700, 640, 1.08, "sine.inOut"],
    [tHoles + 0.05, 900, MAT + 40, 2.3, "power3.out"],     // lao vào miệng giếng
    [tOld - 0.1, 905, MAT + 30, 2.4, "sine.inOut"],
    [tOld + 0.8, 1000, 680, 1.15, "power2.inOut"],
    [tIron, 1380, 690, 1.2, "sine.inOut"], [tMesh + 0.3, 1800, 690, 1.2, "sine.inOut"], [tHeap + 0.4, 2280, 690, 1.2, "sine.inOut"],
    [tNobody - 0.1, 2300, 690, 1.15, "sine.inOut"],
    [tNobody + 3.2, 2100, 820, 0.45, "power2.inOut"],      // lùi ra: chấm đen tới chân trời
    [tWarn - 0.3, 2140, 800, 0.47, "sine.inOut"],
    [tWarn + 1.2, 2700, 760, 1.2, "power2.inOut"], [DUR, 2710, 750, 1.26, "sine.inOut"]
  ]);
  api.set("#brim", 0, { y: -500 });
  api.key("#brim", "y", 0.5, -500, "none"); api.key("#brim", "y", 1.0, 0, "power2.out"); api.key("#brim", "y", tOld - 0.2, 0, "none"); api.key("#brim", "y", tOld + 0.3, -500, "power2.in");
  api.sfx("whoosh", tHoles - 0.3, 0.3);
  api.sfx("nuot", tHoles + 0.3, 0.4);

  // Wob dò từng bước
  W.set(0, { x: 250, y: MAT + 190, size: 0.62, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, pupX: 8 });
  W.mouth(0, "smirk");
  W.walk(0, 1.2, 250, 600, { step: 0.3 });
  W.pose(1.25, 0.15, { sy: 0.92, sx: 1.05, lean: -6, eye: 1.2, pupX: 12, pupY: 6 }, "power2.out");  // khựng lại, xa mép
  W.mouth(1.3, "o");
  W.pose(1.6, 0.3, { sy: 1, sx: 1, lean: 0, eye: 1 }, "power2.out");
  W.walk(tOld + 0.3, 4.6, 600, 1180, { step: 0.42 });
  W.nhonChan(4.8, 0.8, { lean: 8, nhin: [12, 8] }); W.mouth(5.0, "flat");
  W.walk(5.9, 7.0, 1180, 1700, { step: 0.4 });
  W.nhonChan(7.2, 0.5, { lean: 8, nhin: [12, 8] });
  W.walk(7.9, 8.9, 1700, 2230, { step: 0.4 });
  W.pose(9.0, 0.2, { pupX: 12, pupY: 6 }, "power2.out"); W.mouth(9.0, "wobbly");
  W.nhinQuanh(tNobody + 0.6, { nhip: 0.5 });
  W.shiver(tTwo, tTwo + 0.5, 1.6, 14); W.mouth(tTwo, "o");
  W.idle(9.2, tWarn, { seed: 331 });
  W.walk(tWarn, tWarn + 0.9, 2230, 2650, { step: 0.3 });
  W.pose(tWarn + 1.0, 0.3, { lean: 10, upRot: 8, upY: -4, pupX: 12, pupY: -10 }, "power2.out");   // dí mũi đọc biển
  W.mouth(tWarn + 1.1, "flat");
  W.idle(tWarn + 1.2, DUR, { seed: 332, bien: 0.8 });
  W.autoBlink(2, 9, 3301);
};
