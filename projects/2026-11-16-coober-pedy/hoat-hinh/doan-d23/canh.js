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
/* Đoạn d23 · cắt giấy · hồi ức: lòng nhà thờ khoét đá (không người). Vào "cat", ra "cat".
   Lời: "The Serbian Orthodox church of Saint Elijah was dug into the rock in nineteen ninety-three. I stood at the back with
   my hat in my hands and kept very quiet. Even the echo seemed polite."
   Trang phục: mũ rộng vành kraft (dải đỏ), ba lô ô liu có cuộn thảm đỏ; cởi mũ cầm hai tay ở nhịp 2. Chữ: "St Elijah · 1993". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, P = D.paper, R = D.rough, st = CP.st;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var SAND = "#D8B48A", SAND2 = "#C49A6C", SAND3 = "#E9D2AE", WOODC = "#7A5236";

  // ---- lớp xa: tường cuối gian thờ (vòm, vách gỗ có ô cửa vòm, đèn) + hàng ghế nhỏ ----
  var xa = '<rect x="-600" y="-400" width="3100" height="1900" fill="#B98E62"/>';
  xa += P(R([[260, 860], [260, 420], [960, 160], [1660, 420], [1660, 860]], 3, 2301, 30), SAND3, { shadow: false, stroke: true, sw: 4 });
  xa += '<ellipse cx="960" cy="520" rx="520" ry="300" fill="url(#cpWarm)"/>';
  xa += P(D.rRect(620, 470, 680, 330, 2, 2302), "#9A6A44", { stroke: true, sw: 5 });
  for (var a = 0; a < 5; a++) {
    var ax = 660 + a * 128;
    xa += P("M " + ax + " 780 L " + ax + " 560 C " + ax + " 520 " + (ax + 90) + " 520 " + (ax + 90) + " 560 L " + (ax + 90) + " 780 Z", a === 2 ? "#F2D49A" : "#C08A5A", { shadow: false, stroke: true, sw: 4 });
  }
  xa += st("M 960 470 L 960 410 M 940 428 L 980 428", 7, WOODC);
  for (var r = 0; r < 4; r++) xa += P(D.rRect(520 - r * 30, 812 + r * 22, 380 + r * 30, 26, 1.2, 2310 + r), WOODC, { stroke: true, sw: 3, sx: 3, sy: 4 }) + P(D.rRect(1020, 812 + r * 22, 380 + r * 30, 26, 1.2, 2320 + r), WOODC, { stroke: true, sw: 3, sx: 3, sy: 4 });
  [[700, 300], [1220, 300]].forEach(function (l, i) {
    xa += st("M " + l[0] + " 120 L " + l[0] + " " + (l[1] - 20), 3, INKC());
    xa += '<circle id="lampx' + i + '" cx="' + l[0] + '" cy="' + l[1] + '" r="90" fill="url(#cpWarm)"/>' + P(D.rEll(l[0], l[1], 20, 16, 1.5, 2330 + i), "#FFE3A0", { stroke: true, sw: 3, shadow: false });
  });
  function INKC() { return "#1f2326"; }

  // ---- lớp giữa: vách đá hai bên có hốc vòm + hàng ghế lớn hơn ----
  var giua = "";
  giua += P(R([[-500, -300], [520, -300], [560, 200], [430, 1300], [-500, 1300]], 4, 2340, 40), SAND2, { stroke: true, sw: 5, sx: 12, sy: 4 });
  giua += P(R([[1400, -300], [2420, -300], [2420, 1300], [1490, 1300], [1360, 200]], 4, 2341, 40), SAND2, { stroke: true, sw: 5, sx: -12, sy: 4 });
  [[260, 420], [1660, 420]].forEach(function (n, i) {
    giua += P("M " + (n[0] - 70) + " " + (n[1] + 200) + " L " + (n[0] - 70) + " " + n[1] + " C " + (n[0] - 70) + " " + (n[1] - 90) + " " + (n[0] + 70) + " " + (n[1] - 90) + " " + (n[0] + 70) + " " + n[1] + " L " + (n[0] + 70) + " " + (n[1] + 200) + " Z", "#8E6440", { shadow: false, stroke: true, sw: 4 });
    giua += '<ellipse cx="' + n[0] + '" cy="' + (n[1] + 90) + '" rx="120" ry="120" fill="url(#cpWarm)"/>' + P(D.rRect(n[0] - 10, n[1] + 70, 20, 60, 1, 2342 + i), "#FFF1C8", { stroke: true, sw: 3, shadow: false });
  });
  for (var k = 0; k < 7; k++) giua += st("M " + (80 + k * 40) + " " + (100 + k * 130) + " C " + (200 + k * 30) + " " + (90 + k * 130) + " " + (300 + k * 20) + " " + (120 + k * 130) + " " + (420 - k * 8) + " " + (110 + k * 130), 3, "#9B7350", ' opacity="0.7"') +
    st("M " + (1840 - k * 40) + " " + (100 + k * 130) + " C " + (1720 - k * 30) + " " + (90 + k * 130) + " " + (1620 - k * 20) + " " + (120 + k * 130) + " " + (1500 + k * 8) + " " + (110 + k * 130), 3, "#9B7350", ' opacity="0.7"');
  for (var q = 0; q < 3; q++) giua += P(D.rRect(420 - q * 60, 880 + q * 40, 450 + q * 60, 36, 1.4, 2350 + q), WOODC, { stroke: true, sw: 4, sx: 5, sy: 6, half: 0.08 }) + P(D.rRect(1050, 880 + q * 40, 450 + q * 60, 36, 1.4, 2360 + q), WOODC, { stroke: true, sw: 4, sx: 5, sy: 6, half: 0.08 });
  giua += P(R([[-500, 1000], [2420, 990], [2420, 1500], [-500, 1500]], 3, 2370, 40), "#B58A60", { shadow: false, stroke: true, sw: 4 });

  // ---- lớp gần: khung vòm đá tiền cảnh, cột trái có bảng năm, Wob đứng cuối phòng ----
  var W = CP.wob(api, "W", {});
  var gan = "";
  gan += P("M -700 -500 L 2620 -500 L 2620 1600 L 2050 1600 L 2050 300 C 1900 -120 20 -120 -130 300 L -130 1600 L -700 1600 Z", SAND, { stroke: true, sw: 6, sx: 0, sy: 14, half: 0.06 });
  gan += st("M -130 300 C 20 -120 1900 -120 2050 300", 5, "#9B7350", ' opacity="0.6"');
  gan += P(D.rRect(150, 380, 300, 1200, 3, 2380), "#CDA67A", { stroke: true, sw: 5, sx: 10, sy: 6 });
  gan += at(300, 620, g("plq", D.paper(D.rRect(-240, -60, 480, 120, 2, 2381), "#6E4A30", { stroke: true, sw: 5 }) + D.txt(0, 16, data.chu_tren_do_vat[0], 46, { fill: "#FFF1D0", w: 800 })));
  gan += P(R([[-700, 1130], [2620, 1124], [2620, 1700], [-700, 1700]], 3, 2390, 40), "#A9805A", { shadow: false, stroke: true, sw: 4 });
  gan += W.svg;
  // gợn tiếng vang (3 cung) – đi từ miệng Wob về phía gian thờ, rồi cúi chào
  var WX = 1380, WY = 1150, WS = 0.8;
  var echo = "";
  for (var e = 0; e < 3; e++) echo += st("M " + (-e * 26) + " -36 C " + (-24 - e * 30) + " -14 " + (-24 - e * 30) + " 14 " + (-e * 26) + " 36", 7 - e * 1.5, "#FFF1D0", ' opacity="' + (0.95 - e * 0.22) + '"');
  gan += at(WX - 40 * WS, WY - 170 * WS, g("echo", g("echoIn", echo)));

  api.dat(CP.defs() + api.lop("xa", xa, 0.35, { mat: 860 }) + api.lop("giua", giua, 1, { mat: 1000 }) + api.lop("gan", gan, 1.4, { mat: 1130 }));
  api.noi({});

  var tDug = T("dug", 0, 2.55), tStood = T("stood", 0, 5.16), tHat = T("hat", 0, 6.11), tKept = T("kept", 0, 7.44), tEcho = T("echo", 0, 9.1), tPolite = T("polite", 0, 9.8);
  // camera: (cx, cy) ở lớp p=1; bảng năm ở lớp gần (300,620) ↔ cx = 960 + (300-960)/1.4
  api.camera([
    [0, 500, 600, 1.12], [1.6, 520, 596, 1.16, "sine.inOut"],
    [3.9, 960, 560, 1.0, "power2.inOut"],                 // trượt dọc lòng nhà thờ về gian thờ
    [tStood - 0.1, 990, 600, 1.04, "sine.inOut"],
    [tHat + 0.4, 1150, 760, 1.32, "power2.inOut"],       // vào Wob cởi mũ
    [tEcho - 0.3, 1160, 760, 1.38, "sine.inOut"],
    [tPolite - 0.2, 1080, 700, 1.26, "power2.inOut"],    // lùi nhẹ thấy tiếng vang đi
    [DUR, 1070, 694, 1.29, "sine.inOut"]
  ]);
  [0, 1].forEach(function (i) { api.key("#lampx" + i, "opacity", 0, 0.85); for (var t = 0.4 + i * 0.5; t < DUR; t += 1.3) api.key("#lampx" + i, "opacity", t, i % 2 ? 1 : 0.75, "sine.inOut"); });

  // ---- Wob: ngước nhìn trần, đi chậm vào chỗ đứng cuối phòng, cởi mũ, đứng im lặng ----
  W.set(0, { x: WX + 260, y: WY, size: WS, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, pupY: -8, pupX: -6 });
  W.mouth(0, "o");
  W.walk(0.3, 1.9, WX + 260, WX, { step: 0.4 });
  W.pose(2.1, 0.4, { pupX: -10, pupY: -12, upRot: -2 }, "sine.inOut");
  W.pose(3.2, 0.5, { pupX: 4, pupY: -14, upRot: 2 }, "sine.inOut");
  W.pose(4.4, 0.4, { pupX: -6, pupY: -4, upRot: 0 }, "sine.inOut");
  W.mouth(2.4, "X");
  W.idle(2.0, tStood, { seed: 231, bien: 1.6 });
  // cởi mũ: hai tay lên vành, nhấc mũ, hạ xuống ngực
  var t0 = tHat - 0.45;
  W.pose(t0, 0.28, { aRu: -150, aRf: 18, aLu: 150, aLf: -18 }, "power2.out");
  api.key("#W-mr", "y", 0, 0); api.key("#W-mr", "y", t0 + 0.3, 0, "none"); api.key("#W-mr", "y", t0 + 0.48, -26, "back.out(2)");
  W.pose(t0 + 0.55, 0.5, { aRu: 25, aRf: 55, aLu: -25, aLf: -55 }, "power2.inOut");
  api.key("#W-mr", "y", t0 + 0.55, -26, "none"); api.key("#W-mr", "y", t0 + 1.05, 190, "power2.inOut");
  api.key("#W-mr", "scale", 0, 1); api.key("#W-mr", "scale", t0 + 0.55, 1, "none"); api.key("#W-mr", "scale", t0 + 1.05, 0.82, "power2.inOut");
  W.pose(t0 + 0.2, 0.3, { pupY: -6, pupX: 0 }, "power2.out");
  W.pose(tKept - 0.1, 0.3, { lid: 18, pupY: 4 }, "power2.inOut");     // mắt cụp xuống, giữ im lặng
  W.mouth(tKept, "flat");
  W.pose(tKept - 0.1, 0.4, { sy: 0.97, sx: 1.02 }, "sine.inOut");
  W.idle(tHat + 0.7, tEcho - 0.4, { seed: 232, bien: 1.1 });
  // hắng giọng khẽ → gợn tiếng vang đi, cúi chào, tan
  var tC = tEcho - 0.35;
  W.pose(tC, 0.1, { sy: 0.92, sx: 1.05, lid: 0 }, "power2.in"); W.pose(tC + 0.1, 0.18, { sy: 1, sx: 1 }, "back.out(2)");
  W.mouth(tC, "o"); W.mouth(tC + 0.3, "flat");
  api.sfx("pop", tC + 0.05, 0.18);
  api.origin("#echo", "0 0"); api.origin("#echoIn", "0 0");
  api.set("#echo", 0, { opacity: 0 });
  api.key("#echo", "opacity", tC + 0.08, 0, "none"); api.key("#echo", "opacity", tC + 0.2, 1, "power2.out");
  api.key("#echo", "x", 0, 0); api.key("#echo", "x", tC + 0.08, 0, "none"); api.key("#echo", "x", tPolite - 0.05, -330, "power1.out");
  api.key("#echo", "y", 0, 0); api.key("#echo", "y", tC + 0.08, 0, "none"); api.key("#echo", "y", tPolite - 0.05, -150, "power1.out");
  api.key("#echo", "scale", 0, 0.6); api.key("#echo", "scale", tC + 0.08, 0.6, "none"); api.key("#echo", "scale", tPolite - 0.05, 1.5, "power1.out");
  api.key("#echoIn", "rotation", 0, 0); api.key("#echoIn", "rotation", tPolite - 0.05, 0, "none");
  api.key("#echoIn", "rotation", tPolite + 0.3, -38, "power2.inOut"); api.key("#echoIn", "rotation", tPolite + 0.75, 0, "back.out(1.6)");
  api.key("#echo", "opacity", tPolite + 0.75, 1, "none"); api.key("#echo", "opacity", tPolite + 1.15, 0, "power2.in");
  api.sfx("ting", tPolite + 0.2, 0.15);
  // Wob nhìn theo tiếng vang, gật đáp lễ nhỏ
  W.pose(tC + 0.4, 0.3, { pupX: -10, pupY: -6 }, "power2.out");
  W.pose(tPolite + 0.35, 0.25, { upRot: -6, upY: 6 }, "power2.inOut"); W.pose(tPolite + 0.7, 0.3, { upRot: 0, upY: 0 }, "power2.out");
  W.mouth(tPolite + 0.5, "smirk");
  W.idle(tPolite, DUR, { seed: 233, bien: 1.0 });
  W.autoBlink(1.0, tKept - 0.4, 2301);
  W.blinkAt(tPolite + 1.0);
};
