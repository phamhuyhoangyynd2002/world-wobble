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
/* Đoạn d27 (và cảnh chung với d28) · cắt giấy · hồi ức: sân golf đá về đêm, bóng phát sáng, đống đất ở rìa sân. Vào "cat", ra "cat".
   Lời: "Then night. The heat finally backed off, and the course changed shape in the dark. When the days get too hot, people
   here play in the dark with balls that glow. My ball glowed beautifully, all the way into a pile of dirt."
   Trang phục: mũ kraft, ba lô ô liu + thảm đỏ + cuộn cỏ xanh; gậy golf; bóng phát sáng. Không chữ. */
var NIGHT = function (api, o) {
  var D = api.D, at = api.at, g = api.g, P = D.paper, R = D.rough, st = CP.st, fp = CP.fp, MAT = 880;
  var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#cpDusk)"/><rect id="dem" x="0" y="0" width="1920" height="1080" fill="url(#cpNight)"/>' +
    CP.sao(api, "sao", 60, 2701, [0, 0, 1920, 560], api.DUR) + '<circle cx="380" cy="170" r="46" fill="#F4EBD0" stroke="#1f2326" stroke-width="3" stroke-opacity="0.4"/>';
  var xa = CP.doiXa(D, -900, 3600, 760, 50, 2702, "#6C5A6A");
  for (var m = 0; m < 12; m++) xa += at(-600 + m * 330, 772, '<g transform="scale(0.5)">' + CP.mullock(D, 280, 130 + (m % 3) * 30, 2710 + m, "#8C7C86") + "</g>");
  // người chơi xa dạng chung (bóng giấy, không mặt)
  function nguoi(id, c) {
    return '<g id="' + id + '">' + fp("M -18 0 L -14 -60 C -14 -80 14 -80 14 -60 L 18 0 Z", c, 3) + '<circle cx="0" cy="-92" r="15" fill="' + c + '" stroke="#1f2326" stroke-width="3"/>' +
      fp("M -18 -100 C -14 -116 14 -116 18 -100 Z", "#2A3550", 3) + st("M 10 -50 L 40 0", 4, "#9AA5A8") + "</g>";
  }
  xa += at(700, 800, nguoi("ng0", "#3A4766")) + at(1150, 796, nguoi("ng1", "#46405E"));
  for (var b = 0; b < 2; b++) xa += g("gb" + b, '<circle r="34" fill="url(#cpGlow)"/><circle r="7" fill="#C8FBFF"/>') + g("gt" + b, '<circle r="20" fill="url(#cpGlow)" opacity="0.6"/>');
  var giua = CP.datSaMac(D, -1200, 4400, MAT, 2720, "#A8714A");
  giua += P(R([[-1200, MAT + 40], [4400, MAT + 30], [4400, MAT + 150], [-1200, MAT + 170]], 3, 2721, 30), "#E9E4D8", { shadow: false, stroke: true, sw: 4 });
  giua += '<rect id="toiG" x="-1200" y="' + (MAT - 10) + '" width="5600" height="1400" fill="#0F1A2E" opacity="0"/>';
  // cờ lỗ có đèn
  var FX = 1150;
  giua += st("M " + FX + " " + (MAT + 90) + " L " + FX + " " + (MAT - 200), 6, "#D8D6CE") + fp("M " + FX + " " + (MAT - 200) + " L " + (FX + 90) + " " + (MAT - 175) + " L " + FX + " " + (MAT - 150) + " Z", "#D9543C", 4);
  giua += '<circle id="den" cx="' + FX + '" cy="' + (MAT + 88) + '" r="70" fill="url(#cpWarm)"/><ellipse cx="' + FX + '" cy="' + (MAT + 90) + '" rx="14" ry="5" fill="#FFE9A8"/>';
  // đống đất ở rìa sân
  var PX = 1920;
  giua += at(PX, MAT + 60, CP.mullock(D, 560, 330, 2730, "#9E8A72"));
  giua += g("bong", '<circle r="60" fill="url(#cpGlow)"/><circle r="11" fill="#C8FBFF" stroke="#1f2326" stroke-width="2"/>');
  giua += g("bui", [[-30, -10, 22], [10, -26, 26], [36, -6, 18]].map(function (p, i) { return at(p[0], p[1], D.puff(p[2], 2740 + i, "#D8C4A0")); }).join(""));
  var W = CP.wob(api, "W", { co: true, holdR: g("W-club", CP.club(200)) });
  giua += W.svg;
  var gan = '<rect id="toiN" x="-1500" y="1060" width="6000" height="800" fill="#0F1A2E" opacity="0"/>';
  [[-200, 90], [1000, 120], [2600, 100]].forEach(function (p, i) { gan += at(p[0], 1300, CP.rock(D, p[1], 2750 + i, "#6E4A3A")); });
  api.dat(CP.defs() + troi + api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", giua, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1100 }));
  return { W: W, MAT: MAT, PX: PX, FX: FX };
};
window.CANH = function (api, data) {
  "use strict";
  var DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var S = NIGHT(api, {}), W = S.W, MAT = S.MAT;
  api.noi({});
  var tNight = T("night", 0, 1.26), tCourse = T("course", 0, 4.0), tWhen = T("When", 0, 6.22), tGlow = T("glow", 0, 9.66), tMy = T("My", 0, 10.48), tPile = T("pile", 0, 13.44);

  // chiều → đêm
  api.set("#dem", 0, { opacity: 0 }); api.key("#dem", "opacity", 0.6, 0, "none"); api.key("#dem", "opacity", 2.6, 1, "sine.inOut");
  api.set("#toiG", 0, { opacity: 0 }); api.key("#toiG", "opacity", 0.6, 0, "none"); api.key("#toiG", "opacity", 2.6, 0.42, "sine.inOut");
  api.set("#toiN", 0, { opacity: 0 }); api.key("#toiN", "opacity", 0.6, 0, "none"); api.key("#toiN", "opacity", 2.6, 0.4, "sine.inOut");
  for (var i = 0; i < 60; i++) { api.key("#sao" + i, "opacity", 0, 0); api.key("#sao" + i, "opacity", 1.2 + (i % 7) * 0.12, 0, "none"); api.key("#sao" + i, "opacity", 2.4 + (i % 7) * 0.12, 1, "sine.out"); }
  api.set("#den", 0, { opacity: 0 }); api.key("#den", "opacity", 1.6, 0, "none"); api.key("#den", "opacity", 2.4, 1, "power2.out");
  for (var tl = 2.6; tl < DUR; tl += 0.9) api.key("#den", "opacity", tl, tl % 1.8 < 0.9 ? 0.8 : 1, "sine.inOut");
  api.sfx("im-lang", 2.4, 0.35);

  // bóng sáng của người chơi xa bay vòng cung (vệt theo sau)
  function bay(sel, t0, t1, x0, y0, x1, y1, h) {
    api.origin(sel, "0 0"); api.set(sel, 0, { opacity: 0 }); api.show(sel, t0, 1); api.show(sel, t1 + 0.6, 0);
    for (var k = 0; k <= 10; k++) { var u = k / 10, t = t0 + (t1 - t0) * u; api.key(sel, "x", t, x0 + (x1 - x0) * u, k ? "none" : "none"); api.key(sel, "y", t, y0 + (y1 - y0) * u - h * 4 * u * (1 - u), "none"); }
  }
  bay("#gb0", tWhen + 1.4, tWhen + 3.0, 740, 795, 1060, 790, 260); bay("#gt0", tWhen + 1.5, tWhen + 3.1, 740, 795, 1060, 790, 260);
  bay("#gb1", tWhen + 2.6, tWhen + 4.0, 1190, 792, 880, 800, 200); bay("#gt1", tWhen + 2.7, tWhen + 4.1, 1190, 792, 880, 800, 200);
  ["#ng0", "#ng1"].forEach(function (s, i) { api.origin(s, "0 0"); var th = tWhen + 1.35 + i * 1.2; api.key(s, "rotation", 0, 0); api.key(s, "rotation", th - 0.3, -10, "power2.out"); api.key(s, "rotation", th, 12, "power3.in"); api.key(s, "rotation", th + 0.4, 0, "power2.out"); });

  // camera
  api.camera([
    [0, 820, 600, 1.0], [tCourse, 900, 600, 1.06, "sine.inOut"], [tWhen + 0.6, 960, 560, 0.96, "power2.inOut"],
    [tMy - 0.4, 760, 640, 1.18, "power2.inOut"],
    [tMy + 0.4, 820, 620, 1.12, "power2.inOut"],
    [tPile - 0.1, 1700, 640, 1.3, "power2.inOut"],           // lia theo quả bóng tới đống đất
    [DUR, 1740, 660, 1.4, "sine.inOut"]
  ]);

  // Wob: đứng ngắm trời đêm, rồi vung gậy
  var X0 = 600;
  W.set(0, { x: X0, y: MAT + 110, size: 0.62, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, pupY: -10 });
  W.mouth(0, "o");
  W.pose(tNight, 0.4, { pupX: -8, pupY: -14 }, "sine.inOut"); W.pose(3.2, 0.5, { pupX: 8, pupY: -12 }, "sine.inOut");
  W.mouth(3.0, "smirk");
  W.idle(0, tWhen + 1, { seed: 271, liec: false });
  W.pose(tWhen + 1.3, 0.25, { pupX: 10, pupY: -6 }, "power2.out"); W.mouth(tWhen + 1.6, "o");
  W.pose(tWhen + 2.7, 0.25, { pupX: 4, pupY: -10 }, "power2.out");
  W.idle(tWhen + 1, tMy - 0.6, { seed: 272 });
  var tBack = tMy - 0.3, tHit = tMy + 0.15;
  W.pose(tBack, 0.3, { aRu: 150, aRf: 20, upRot: 6, lean: 4 }, "power2.out");
  W.pose(tHit - 0.08, 0.08, { aRu: -110, aRf: -10, upRot: -6, lean: -4 }, "power3.in");
  W.pose(tHit + 0.3, 0.4, { aRu: -18, aRf: 10, upRot: 0, lean: 0 }, "power2.out");
  W.mouth(tHit, "grin");
  api.sfx("whoosh", tHit - 0.05, 0.4); api.sfx("bonk", tHit, 0.35);
  // quả bóng của Wob bay vòng cung đẹp rồi cắm vào sườn đống đất
  var bx0 = X0 + 30, by0 = MAT + 100, bx1 = S.PX - 120, by1 = MAT - 70;
  api.origin("#bong", "0 0"); api.set("#bong", 0, { x: bx0, y: by0 });
  for (var k = 0; k <= 16; k++) { var u = k / 16, t = tHit + (tPile - tHit) * u; api.key("#bong", "x", t, bx0 + (bx1 - bx0) * u, "none"); api.key("#bong", "y", t, by0 + (by1 - by0) * u - 520 * 4 * u * (1 - u), "none"); }
  api.key("#bong", "scale", 0, 1); api.key("#bong", "scale", tPile, 1, "none"); api.key("#bong", "scale", tPile + 0.12, 0.7, "power2.out");
  api.origin("#bui", "0 0"); api.set("#bui", 0, { x: bx1, y: by1, opacity: 0, scale: 0.4 });
  api.key("#bui", "opacity", tPile, 1, "none"); api.key("#bui", "opacity", tPile + 0.7, 0, "power2.in");
  api.key("#bui", "scale", tPile, 0.4, "none"); api.key("#bui", "scale", tPile + 0.7, 1.5, "power2.out");
  api.key("#bui", "y", tPile, by1, "none"); api.key("#bui", "y", tPile + 0.7, by1 - 60, "power2.out");
  api.sfx("drop", tPile + 0.02, 0.4);
  W.pose(tHit + 0.3, 0.3, { pupX: 10, pupY: -12 }, "power2.out");
  W.walk(tMy + 1.8, DUR - 0.1, X0, 1560, { step: 0.24, arms: false });
  W.pose(tPile, 0.15, { eye: 1.2 }, "back.out(2)"); W.mouth(tPile + 0.1, "o");
  W.autoBlink(1.5, tMy - 0.5, 2701);
};
/* Đoạn d28 · cắt giấy · nối liền nhịp cuối d27 (cùng cảnh NIGHT, camera tiếp khoá cuối d27). Vào "cat", ra "cat".
   Lời: "Gone. And the strangest detail of all."  Ánh bóng tắt dần trong đống đất như ngọn nến; Wob cầm gậy đứng im. Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var DUR = api.DUR;
  var S = NIGHT(api, {}), W = S.W, MAT = S.MAT;
  api.noi({});
  api.set("#dem", 0, { opacity: 1 }); api.set("#toiG", 0, { opacity: 0.42 }); api.set("#toiN", 0, { opacity: 0.4 });
  ["#gb0", "#gt0", "#gb1", "#gt1"].forEach(function (s) { api.set(s, 0, { opacity: 0 }); });
  api.key("#den", "opacity", 0, 0.9); api.key("#den", "opacity", 1.2, 1, "sine.inOut"); api.key("#den", "opacity", 2.4, 0.85, "sine.inOut");
  api.set("#bui", 0, { opacity: 0 });
  var bx1 = S.PX - 120, by1 = MAT - 70;
  api.origin("#bong", "0 0"); api.set("#bong", 0, { x: bx1, y: by1, scale: 0.7 });
  // tắt như nến: chập chờn rồi lụi
  [[0.15, 1], [0.3, 0.7], [0.42, 0.95], [0.6, 0.55], [0.72, 0.8], [0.95, 0.35], [1.1, 0.5], [1.4, 0.12], [1.7, 0]].forEach(function (k, i) { api.key("#bong", "opacity", k[0], k[1], i ? "sine.inOut" : "none"); });
  api.key("#bong", "opacity", 0, 1);
  api.camera([[0, 1740, 660, 1.4], [0.9, 1720, 670, 1.5, "sine.inOut"], [DUR, 1700, 680, 1.56, "sine.inOut"]]);
  W.set(0, { x: 1560, y: MAT + 110, size: 0.62, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, pupX: 12, pupY: -2, eye: 1.2 });
  W.mouth(0, "o");
  W.pose(0.2, 0.3, { eye: 1 }, "power2.out");
  W.mouth(0.5, "flat");
  W.pose(1.5, 0.25, { lid: 22 }, "power2.out");
  W.pose(1.75, 0.3, { pupX: 0, pupY: 2 }, "power2.inOut");      // nhìn thẳng ống kính, tỉnh bơ, giữ 0,9 s
  W.idle(0, DUR, { seed: 281, bien: 0.8 });
};
