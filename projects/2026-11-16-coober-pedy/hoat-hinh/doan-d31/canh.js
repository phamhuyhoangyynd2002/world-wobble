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
/* Đoạn d31 · cắt giấy · hồi ức: trang sổ bản đồ (map-adelaide-route vẽ bằng code), xe giấy chạy theo nét đứt, rồi lật sang trang
   nước: chấm giếng phía đông bắc (approx.), mặt cắt ống chọc sâu, ống nét đứt về thị trấn, hộp lọc. Vào "giay", ra "chen".
   Chữ: "Adelaide", "Coober Pedy", "~9 hours", "bore ~60 m deep", "23–25 km NE (approx.)", "since 1985" (hai nhãn giếng không hiện cùng lúc). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, P = D.paper, st = CP.st, fp = CP.fp, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tBack = T("Back", 0, 1.4), tCost = T("costs", 0, 3.04), tDrive = T("drive", 0, 4.86), tAde = T("Adelaide", 0, 5.36), tNine = T("nine", 0, 6.42),
    tWater = T("Water", 0, 7.64), tTown = T("town", 0, 9.72), tSixty = T("sixty", 0, 11.86), tKm = T("kilometres", 0, 14.94), tRead = T("read", 0, 18.66),
    tFilt = T("filters", 0, 19.52), tSince = T("since", 0, 22.44);
  var nen = '<rect x="-600" y="-400" width="3120" height="1900" fill="#8E6A48"/><rect x="-600" y="-400" width="3120" height="1900" fill="url(#half)" opacity="0.06"/>';
  // ---- trang 2: nước ----
  var p2 = at(210, 70, D.journalPage(1500, 940, { seed: 3101, ke: false }));
  p2 += at(480, 130, D.mapSticker("ban-do/map-coober-pedy-water.svg", 900, 420, { id: "ms2", seed: 3102 }));
  var TX = 480 + 757 * 900 / 1920, TY = 130 + 694 * 420 / 1080, BX = 480 + 1216 * 900 / 1920, BY = 130 + 345 * 420 / 1080;
  p2 += st("M " + TX + " " + TY + " L " + BX + " " + BY, 6, "#1f2326", ' stroke-dasharray="16 12"');
  p2 += at(TX, TY, D.mapDot("dT", { r: 14, nhan: CH[1], co: 54, ben: "trai" })) + at(BX, BY, D.mapDot("dB", { r: 14, mau: "#5A9FB8" }));
  p2 += at(BX + 40, BY - 70, CP.nhan(D, "lbKm", CH[4], 56, { seed: 3103 }).replace('<g id="lbKm">', '<g id="lbKm" transform="translate(150,0)">'));
  // mặt cắt
  p2 += P(D.rRect(330, 640, 1300, 300, 2, 3104), "#D9A066", { stroke: true, sw: 4, shadow: false }) + '<rect x="330" y="640" width="1300" height="40" fill="#C9874F"/>';
  p2 += P(D.rRect(1290, 870, 160, 60, 2, 3105), "#5A9FB8", { stroke: true, sw: 3, shadow: false });
  p2 += st("M 1370 650 L 1370 900", 12, "#6E7A7E") + st("M 1370 650 L 1370 900", 4, "#1f2326", ' opacity="0.4"');
  p2 += st("M 1370 690 L 640 690", 10, "#6E7A7E", ' stroke-dasharray="26 10"');
  p2 += at(1110, 790, CP.nhan(D, "lb60", CH[3], 56, { seed: 3106 }));
  p2 += at(560, 690, g("loc", P(D.rRect(-90, -110, 180, 150, 2, 3107), "#E9E7DF", { stroke: true, sw: 5 }) + [-60, -20, 20].map(function (y) { return st("M -70 " + y + " L 70 " + y, 6, "#5A9FB8", ' stroke-dasharray="10 6"'); }).join("")));
  p2 += at(560, 560, CP.nhan(D, "lb85", CH[5], 56, { seed: 3108 }));
  for (var i = 0; i < 5; i++) p2 += g("gi" + i, '<path d="M 0 -14 C 8 -2 10 4 0 10 C -10 4 -8 -2 0 -14 Z" fill="#7EC4DE" stroke="#1f2326" stroke-width="3"/>');
  // ---- trang 1: bản đồ đường xe ----
  var p1 = at(0, 70, D.journalPage(1500, 940, { seed: 3110 })).replace("<g>", '<g transform="translate(210,0)">');
  p1 = at(0, 0, p1);
  var MS = 1100 / 1920, MX = 400, MY = 170;
  p1 += at(MX, MY, D.mapSticker("ban-do/map-adelaide-route.svg", 1100, 619, { id: "ms1", seed: 3111 }));
  var AX = MX + 1122 * MS, AY = MY + 840 * MS, CX = MX + 794 * MS, CY = MY + 244 * MS;
  var route = api.duong([[AX, AY], [AX - 40, AY - 120], [AX - 120, AY - 220], [CX + 90, CY + 150], [CX, CY]]);
  p1 += '<path d="' + route.d + '" fill="none" stroke="#1f2326" stroke-width="6" stroke-dasharray="16 12"/>';
  p1 += at(AX, AY, D.mapDot("dA", { r: 14, nhan: CH[0], co: 54, ben: "phai" })) + at(CX, CY, D.mapDot("dC", { r: 14, nhan: CH[1], co: 54, ben: "trai" }));
  [0.3, 0.55, 0.8].forEach(function (u, k) { var p = route.at(u); p1 += at(p.x + 40, p.y - 4, '<g transform="scale(0.45)">' + CP.bush(D, 70, 3120) + "</g>"); });
  var pm = route.at(0.5);
  p1 += at(pm.x + 190, pm.y + 10, CP.nhan(D, "lb9", CH[2], 54, { seed: 3121 }));
  for (var c = 0; c < 4; c++) p1 += g("xu" + c, at(330, 930 - c * 18, P(D.rEll(0, 0, 50, 16, 1.5, 3130 + c), "#E3B341", { stroke: true, sw: 4, sx: 3, sy: 4 })));
  var Wc = CP.wob(api, "Wc", {});
  var bc = D.boxCar("bc");
  p1 += g("car", '<g transform="scale(0.32)">' + bc.back + Wc.svg + bc.front + "</g>");
  p1 = g("p1", p1);
  var W = CP.wob(api, "W", { co: true });
  var giua = nen + p2 + p1 + W.svg;
  api.dat(CP.defs() + api.lop("giua", giua, 1, { mat: 1010 }));
  api.noi({ kieu: { giua: "dung" } });

  // ---- trang 1 ----
  api.camera([
    [0, 960, 540, 1.0], [tCost, 940, 560, 1.03, "sine.inOut"],
    [tAde + 0.1, AX - 30, AY - 60, 1.9, "power2.inOut"],
    [tNine + 0.9, (AX + CX) / 2, (AY + CY) / 2, 1.5, "sine.inOut"],
    [tWater - 0.1, 920, 540, 1.0, "power2.inOut"],
    [tTown + 0.6, 960, 540, 1.0, "sine.inOut"],
    [tSixty + 0.2, 1240, 720, 1.35, "power2.inOut"],
    [tKm - 0.3, 1200, 620, 1.12, "power2.inOut"], [tKm + 0.6, 1100, 380, 1.4, "power2.inOut"],
    [tRead, 960, 560, 1.05, "power2.inOut"],
    [tFilt + 0.3, 700, 680, 1.45, "power2.inOut"], [DUR, 690, 670, 1.5, "sine.inOut"]
  ]);
  for (var c2 = 0; c2 < 4; c2++) { var tc = tCost - 0.1 + c2 * 0.22; api.origin("#xu" + c2, "0 0"); api.key("#xu" + c2, "y", 0, -1300); api.key("#xu" + c2, "y", tc, -1300, "none"); api.show("#xu" + c2, 0, 0); api.show("#xu" + c2, tc, 1); api.key("#xu" + c2, "y", tc + 0.3, 0, "bounce.out"); api.sfx("ka-ching", tc + 0.28, c2 === 3 ? 0.4 : 0.15); }
  api.origin("#dA", "0 0"); api.pop("#dA", tAde - 0.05, 0.22); api.origin("#dC", "0 0"); api.pop("#dC", tNine + 0.5, 0.22);
  api.origin("#lb9", "0 0"); api.pop("#lb9", tNine - 0.05, 0.24);
  api.sfx("pop", tAde - 0.03, 0.4); api.sfx("pop", tNine - 0.03, 0.4);
  var c0 = tAde + 0.1, c1 = tWater - 0.3;
  api.origin("#car", "0 0");
  for (var k = 0; k <= 14; k++) { var u = k / 14, p = route.at(u * 0.86), t = c0 + (c1 - c0) * u; api.key("#car", "x", t, p.x, "none"); api.key("#car", "y", t, p.y - 10, "none"); }
  api.key("#car", "y", 0, AY - 10); api.key("#car", "x", 0, AX);
  for (var tb = 0; tb < c1; tb += 0.16) api.key("#car", "rotation", tb, (Math.round(tb / 0.16) % 2) ? -2 : 1, "none");
  api.sfx("may-no", c0, 0.25);
  Wc.set(0, { x: 0, y: 40, size: 0.62, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, pupX: 6 });
  Wc.mouth(0, "smirk");
  var tPt = c0 + (c1 - c0) * 0.78;
  Wc.pose(tPt - 0.15, 0.2, { aRu: -120, aRf: -20, pupX: 12, pupY: 6 }, "back.out(2)"); Wc.mouth(tPt, "o");
  api.sfx("liu-lo-hoi", tPt, 0.3);
  // lật trang
  api.origin("#p1", "210 540");
  api.key("#p1", "scaleX", 0, 1); api.key("#p1", "scaleX", tWater + 1.2, 1, "none"); api.key("#p1", "scaleX", tWater + 1.6, 0.001, "power2.in");
  api.show("#p1", 0, 1); api.show("#p1", tWater + 1.62, 0);
  api.sfx("whoosh", tWater + 1.2, 0.35);
  // ---- trang 2 ----
  api.origin("#lb60", "0 0"); api.pop("#lb60", tSixty - 0.05, 0.24, tKm - 0.45);
  api.origin("#lbKm", "0 0"); api.pop("#lbKm", tKm - 0.05, 0.24);
  api.sfx("pop", tSixty - 0.03, 0.4); api.sfx("pop", tKm - 0.03, 0.4);
  api.origin("#dB", "0 0"); api.pop("#dB", tTown + 0.3, 0.22);
  // giọt nước theo ống: lên từ giếng, chạy về thị trấn, qua hộp lọc
  for (var j = 0; j < 5; j++) {
    var s = "#gi" + j, a0 = tKm + 0.6 + j * 0.45; api.origin(s, "0 0");
    api.set(s, 0, { x: 1370, y: 900, opacity: 0 }); api.show(s, a0, 1);
    api.key(s, "y", a0, 900, "none"); api.key(s, "y", a0 + 0.6, 690, "power1.in");
    api.key(s, "x", a0 + 0.6, 1370, "none"); api.key(s, "x", tFilt + 0.2 + j * 0.3, 650, "none");
    api.key(s, "x", tFilt + 1.1 + j * 0.3, 470, "power1.out"); api.key(s, "y", tFilt + 0.2 + j * 0.3, 690, "none"); api.key(s, "y", tFilt + 1.1 + j * 0.3, 680, "sine.inOut");
    api.key(s, "opacity", tFilt + 1.1 + j * 0.3, 1, "none"); api.key(s, "opacity", tFilt + 1.4 + j * 0.3, 0, "power2.in");
  }
  api.sfx("hoi-nuoc", tFilt + 0.3, 0.25);
  api.origin("#loc", "0 0"); for (var tl = tFilt; tl < DUR; tl += 0.25) api.key("#loc", "x", tl, (Math.round(tl / 0.25) % 2) ? 2 : -2, "none");
  api.origin("#lb85", "0 0"); api.pop("#lb85", tSince - 0.05, 0.24); api.sfx("ting", tSince, 0.4);
  // Wob đứng mép trang: chỉ, đi theo dòng nước, gõ hộp lọc
  W.set(0, { x: 1580, y: 1010, size: 0.5, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, pupX: -8 });
  W.mouth(0, "smirk");
  W.pose(tBack, 0.25, { aLu: -120, aLf: -10, pupX: -10, pupY: -8 }, "back.out(1.6)"); W.pose(tBack + 1.2, 0.3, { aLu: 18, aLf: -10 }, "power2.inOut");
  W.pose(tCost + 0.3, 0.2, { pupX: -12, pupY: 6, eye: 1.15 }, "back.out(2)"); W.mouth(tCost + 0.4, "wobbly"); W.pose(tCost + 1.2, 0.3, { eye: 1 }, "power2.out");
  W.idle(0.5, tWater + 1, { seed: 311, liec: true });
  W.walk(tTown, tTown + 1.2, 1580, 1700, { step: 0.3 });
  W.pose(tSixty - 0.2, 0.25, { aLu: -110, aLf: -10, pupX: -12, pupY: -4 }, "back.out(1.6)"); W.pose(tKm - 0.4, 0.3, { aLu: 18, aLf: -10 }, "power2.inOut");
  W.idle(tTown + 1.3, tKm + 1.5, { seed: 312 });
  W.walk(tKm + 1.4, tFilt + 0.2, 1700, 760, { step: 0.3 });
  var hits = W.go(tFilt + 0.6, 2, "L");
  hits.forEach(function (h) { api.sfx("bonk", h, 0.3); });
  W.mouth(tFilt + 0.7, "o"); W.mouth(tSince, "grin");
  W.idle(tFilt + 1.4, DUR, { seed: 313 });
  W.autoBlink(2, 9, 3101); W.autoBlink(19, 23, 3102);
};
