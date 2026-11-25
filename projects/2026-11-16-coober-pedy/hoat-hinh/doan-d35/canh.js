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
/* Đoạn d35 · cắt giấy tông trầm · hồi ức: đêm, miệng giếng tối dưới trời sao, một luồng đèn tím nhỏ xa xa (không tắt);
   không vẽ người, không vẽ người ngã, không gag. Tờ thông báo đặt xuống mép khung. Ban ngày: Wob đứng xa mép giếng, gấp biển
   mini cất vào ba lô. Vào "cat", ra "giay". Chữ: "Feb 2024", "~25 m", "MIND YOUR STEP IN OPAL FIELDS". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, P = D.paper, st = CP.st, MAT = 860, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tAfter = T("After", 0, 8.6), tMind = T("Mind", 0, 11.66), tStand = T("Standing", 0, 16.32), tMin = T("minute", 0, 18.74), tReady = T("ready", 0, 19.73);
  var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#cpDay)"/><g id="demT"><rect x="0" y="0" width="1920" height="1080" fill="url(#cpNightTram)"/>' + CP.sao(api, "sao", 70, 3501, [0, 0, 1920, 600], DUR) + "</g>";
  var xa = CP.doiXa(D, -2000, 4000, 690, 30, 3502, "#D7A878");
  for (var m = 0; m < 10; m++) xa += at(-1200 + m * 480, 700, '<g transform="scale(0.45)">' + CP.mullock(D, 300, 130 + (m % 3) * 30, 3510 + m) + "</g>");
  xa += '<rect id="toiX" x="-2000" y="300" width="6000" height="1600" fill="#0C1424" opacity="0.8"/>';
    var giua = CP.datSaMac(D, -2000, 5000, MAT, 3520, "#C98E58");
  [[300, 420, 220], [2700, 400, 200]].forEach(function (p, j) { giua += at(p[0], MAT + 6, CP.mullock(D, p[1], p[2], 3530 + j)); });
  giua += at(900, MAT + 120, CP.shaft(D, 150, 50, 3540));
  giua += '<rect id="toiG" x="-2000" y="' + (MAT - 300) + '" width="7000" height="2000" fill="#0C1424" opacity="0.72"/>';
  giua += '<g id="uv"><ellipse cx="1750" cy="' + (MAT + 4) + '" rx="90" ry="54" fill="url(#cpUV)"/><path d="M 1750 ' + (MAT + 4) + ' L 1830 ' + (MAT + 64) + ' L 1670 ' + (MAT + 64) + ' Z" fill="#B98BEA" opacity="0.3"/><circle cx="1750" cy="' + (MAT + 4) + '" r="6" fill="#F2E2FF"/></g>';
  // biển mini cầm tay
  var mini = '<g id="W-mini"><g id="W-miniIn" transform="translate(-50,70) rotate(0)">' + P(D.rRect(-200, -70, 400, 124, 1.5, 3550), "#FFF8EC", { stroke: true, sw: 5 }) +
    D.txt(0, -18, "MIND YOUR STEP", 34, { w: 900 }) + D.txt(0, 26, "IN OPAL FIELDS", 34, { w: 900 }) + "</g></g>";
  var W = CP.wob(api, "W", { co: true, bui: true, holdR: mini });
  giua += W.svg;
  var tin = g("tin", P(D.rRect(-520, -110, 1040, 260, 2, 3560), "#F4EFE4", { stroke: true, sw: 5, sx: 8, sy: -6 }) + D.txt(0, -34, CH[2], 50, { w: 900 }) +
    [20, 60, 100].map(function (y) { return st("M -440 " + y + " L 440 " + y, 6, "#B9B2A2"); }).join(""));
  var tags = g("tg1", CP.nhan(D, "n1", CH[0], 44, { seed: 3570 }).replace('<g id="n1">', '<g id="n1" transform="translate(250,950)">')) +
    g("tg2", CP.nhan(D, "n2", CH[1], 44, { seed: 3571 }).replace('<g id="n2">', '<g id="n2" transform="translate(470,950)">'));
  api.dat(CP.defs() + troi + api.lop("xa", xa, 0.35, { mat: 690 }) + api.lop("giua", giua, 1, { mat: MAT }) + at(960, 1250, tin) + tags);
  api.noi({});

  // camera: bắt đầu gần luồng đèn tím ở xa, lùi chậm rời khỏi nó, dừng ở miệng giếng tối (không đồng bộ chữ "fell")
  var cxUV = 1750, cyUV = MAT - 20;
  api.camera([
    [0, cxUV, cyUV, 2.2], [1.0, cxUV, cyUV, 2.15, "sine.inOut"],
    [8.4, 1000, 760, 1.15, "sine.inOut"],
    [tStand - 0.4, 980, 750, 1.22, "sine.inOut"],
    [tStand + 0.6, 1380, 790, 1.8, "power2.inOut"], [DUR, 1400, 790, 1.86, "sine.inOut"]
  ]);
  // nhãn lặng lẽ
  api.set("#tg1", 0, { opacity: 0 }); api.fade("#tg1", 1.0, 0.8, 1); api.fade("#tg1", tAfter - 0.4, 0.5, 0);
  api.set("#tg2", 0, { opacity: 0 }); api.fade("#tg2", 6.7, 0.8, 1); api.fade("#tg2", tAfter - 0.4, 0.5, 0);
  // tờ thông báo đặt xuống mép khung
  api.origin("#tin", "0 0"); api.key("#tin", "y", 0, 0); api.key("#tin", "y", tAfter + 0.4, 0, "none"); api.key("#tin", "y", tAfter + 1.0, -330, "power2.out");
  api.key("#tin", "rotation", 0, 2); api.key("#tin", "rotation", tAfter + 1.0, -1, "power2.out");
  api.key("#tin", "y", tStand - 0.9, -330, "none"); api.key("#tin", "y", tStand - 0.3, 0, "power2.in");
  api.sfx("drop", tAfter + 0.95, 0.15);
  // ban ngày trở lại (đèn tím vẫn sáng)
  [["#demT", 1], ["#toiX", 0.8], ["#toiG", 0.72]].forEach(function (o) { api.key(o[0], "opacity", 0, o[1]); api.key(o[0], "opacity", tStand - 0.6, o[1], "none"); api.key(o[0], "opacity", tStand + 0.3, 0, "sine.inOut"); });
  api.key("#uv", "opacity", 0, 1);
  // Wob (chỉ ban ngày): đứng xa mép, gấp biển, cất vào ba lô, chỉnh ba lô, quay đi
  W.set(0, { x: 1560, y: MAT + 160, size: 0.66, aLu: 18, aLf: -10, aRu: 10, aRf: 60, lashes: 0, ice: 0, op: 0, pupX: -10, pupY: 4 });
  api.origin("#W-mini", "0 0"); api.set("#W-mini", 0, { rotation: -70 });
  W.set(tStand - 0.2, { op: 1 });
  W.mouth(0, "flat");
  W.pose(tStand + 0.4, 0.4, { lid: 20 }, "sine.inOut");
  W.idle(tStand, DUR, { seed: 351, bien: 0.8 });
  api.origin("#W-miniIn", "0 -10");
  var tF = tMin - 0.3;
  W.pose(tF - 0.2, 0.3, { aLu: -30, aLf: -60 }, "power2.inOut");
  api.key("#W-miniIn", "scaleY", 0, 1); api.key("#W-miniIn", "scaleY", tF, 1, "none"); api.key("#W-miniIn", "scaleY", tF + 0.3, 0.12, "power2.inOut");
  api.sfx("drop", tF + 0.3, 0.1);
  W.pose(tF + 0.45, 0.4, { aRu: -150, aRf: -110, aLu: 18, aLf: -10 }, "power2.inOut");   // đưa ra sau ba lô
  api.show("#W-mini", 0, 1); api.show("#W-mini", tF + 0.85, 0);
  W.pose(tF + 1.0, 0.3, { aRu: -18, aRf: 10, pack: 6 }, "power2.out"); W.pose(tF + 1.3, 0.3, { pack: -4 }, "sine.inOut"); W.pose(tF + 1.6, 0.25, { pack: 0 }, "sine.out");
  W.pose(tReady, 0.3, { lid: 0, pupX: 10, pupY: 0 }, "power2.out");
  W.walk(tReady + 0.3, DUR, 1560, 1680, { step: 0.36 });
  W.autoBlink(tStand + 0.6, tF, 3501);
};
