/* ---- Bộ dựng riêng tập Coober Pedy (chép giống nhau vào đầu canh.js các đoạn cắt giấy d04…d22 của agent này).
   Không sửa lib chung: trang phục mũ rộng vành + ba lô ô liu đè bằng phuKien và đổi màu chuỗi SVG; đạo cụ sa mạc vẽ bằng code.
   Tất định: mọi ngẫu nhiên đi qua DaoCu.rng(seed). Không chạm document. ---- */
var CP = (function () {
  "use strict";
  var D = window.DaoCu, INK = D.INK;
  var KRAFT = "#C9A46A", KRAFT_D = "#A8844C", BAND = "#C9463A";
  var CAT = "#E9CBA8", CAT_D = "#D2A982", DONG = "#EBD3C2", DONG_D = "#CFAF9B", DO_DAT = "#C9754A", TROI = "#F4EBDD";
  function f1(n) { return (Math.round(n * 10) / 10).toString(); }
  function defs() {
    return "<defs>" +
      '<linearGradient id="cpSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7F3EA"/><stop offset="0.6" stop-color="#F3E6D2"/><stop offset="1" stop-color="#EBCFAE"/></linearGradient>' +
      '<linearGradient id="cpSkyAm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7EEF0"/><stop offset="0.55" stop-color="#F2E7D4"/><stop offset="1" stop-color="#EDC9A0"/></linearGradient>' +
      '<linearGradient id="cpHam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B4A52"/><stop offset="1" stop-color="#1E2A30"/></linearGradient>' +
      '<radialGradient id="cpDen" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE3A6" stop-opacity="0.6"/><stop offset="1" stop-color="#FFE3A6" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="cpOpal" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.35" stop-color="#8FE0D8"/><stop offset="0.7" stop-color="#7C9CF0" stop-opacity="0.7"/><stop offset="1" stop-color="#F08CC8" stop-opacity="0"/></radialGradient>' +
      "</defs>";
  }
  /* mũ rộng vành, toạ độ gốc Wob 400×400 (đội trên đỉnh, không che mắt) */
  function hatInner(sd) {
    var s = "";
    s += '<path d="' + D.rEll(200, 96, 170, 24, 1.5, sd || 611) + '" fill="#0b1214" opacity="0.18" transform="translate(5,7)"/>';
    s += '<path d="' + D.rEll(200, 96, 170, 24, 1.5, sd || 611) + '" fill="' + KRAFT_D + '" stroke="' + INK + '" stroke-width="6"/>';
    s += '<path d="M 116 96 C 112 50 140 14 200 14 C 260 14 288 50 284 96 Z" fill="' + KRAFT + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
    s += '<path d="M 118 72 C 160 62 240 62 282 72 L 284 92 C 240 82 160 82 116 92 Z" fill="' + BAND + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    s += D.line("M 150 36 C 168 26 186 22 204 22", 6, "#FFFFFF", ' opacity="0.35"');
    s += '<rect x="110" y="20" width="180" height="80" fill="url(#half)" opacity="0.07"/>';
    return s;
  }
  /* Wob tập Coober Pedy. o.khongMu: không đội mũ (mũ vẫn có trong nhóm #id-mu nhưng ẩn bằng opacity). Mọi tuỳ chọn khác như api.wob */
  function wob(api, id, o) {
    o = o || {};
    var pk = '<g id="' + id + '-mu">' + hatInner() + "</g>" + (o.phuKien || "");
    var oo = {}; Object.keys(o).forEach(function (k) { oo[k] = o[k]; });
    oo.phuKien = pk;
    var W = api.wob(id, oo);
    W.svg = W.svg.replace(/#b8743a/g, "#76803F").replace(/#8e5527/g, "#525B2B");
    api.origin("#" + id + "-mu", "200 96");
    api.show("#" + id + "-mu", 0, o.khongMu ? 0 : 1);
    return W;
  }
  /* mũ rời (bay, rơi): gốc ở tâm vành, cỡ theo Wob size s */
  function hatProp(id, s) {
    return '<g id="' + id + '"><g transform="scale(' + (s || 0.7) + ') translate(-200,-96)">' + hatInner(612) + "</g></g>";
  }
  /* đống đất thải hình nón (mullock heap). Gốc: giữa chân. */
  function mound(w, h, seed, o) {
    o = o || {};
    var r = D.rng(seed || 1), pts = [], n = 16;
    for (var i = 0; i <= n; i++) {
      var u = i / n, x = -w / 2 + u * w, k = 1 - Math.pow(Math.abs(u - 0.5) * 2, 1.35);
      var y = -h * k * (0.92 + 0.08 * Math.cos((u - 0.5) * 6)) + (r() - 0.5) * h * 0.05;
      pts.push([x, Math.min(0, y)]);
    }
    var d = "M " + f1(-w / 2 - 8) + " 4 " + pts.map(function (p) { return "L " + f1(p[0]) + " " + f1(p[1]); }).join(" ") + " L " + f1(w / 2 + 8) + " 4 Z";
    var s = "<g>" + D.paper(d, o.mau || DONG, { stroke: true, sw: o.sw || 4, half: 0.12, sx: 8, sy: 6 });
    var dr = "M " + f1(w * 0.02) + " " + f1(-h * 0.97) + " C " + f1(w * 0.1) + " " + f1(-h * 0.5) + " " + f1(w * 0.18) + " " + f1(-h * 0.2) + " " + f1(w * 0.3) + " 2 L " + f1(w / 2 + 6) + " 3 C " + f1(w * 0.36) + " " + f1(-h * 0.25) + " " + f1(w * 0.2) + " " + f1(-h * 0.6) + " " + f1(w * 0.02) + " " + f1(-h * 0.97) + " Z";
    s += '<path d="' + dr + '" fill="' + (o.bong || DONG_D) + '" opacity="0.75"/>';
    for (var j = 0; j < Math.max(3, Math.round(w / 40)); j++) {
      var px = (r() - 0.5) * w * 0.7, py = -r() * h * 0.6 * (1 - Math.abs(px) / (w / 2));
      s += '<path d="' + D.rEll(px, py - 4, 4 + r() * 6, 3 + r() * 4, 1, seed * 7 + j) + '" fill="' + (r() < 0.5 ? "#B99A88" : "#F6E7DA") + '" stroke="' + INK + '" stroke-width="1.5"/>';
    }
    return s + "</g>";
  }
  /* dãy đồi đỉnh bằng xa (mesa), tông nhạt */
  function mesas(x0, x1, y, seed, mau) {
    var r = D.rng(seed || 3), d = "M " + x0 + " " + (y + 60) + " L " + x0 + " " + y, x = x0;
    while (x < x1) {
      var w = 160 + r() * 260, h = 40 + r() * 90;
      d += " L " + f1(x + 30) + " " + f1(y - h) + " L " + f1(x + w - 40) + " " + f1(y - h + (r() - 0.5) * 10) + " L " + f1(x + w) + " " + y;
      x += w + r() * 120; d += " L " + f1(x) + " " + y;
    }
    d += " L " + x1 + " " + y + " L " + x1 + " " + (y + 60) + " Z";
    return D.paper(d, mau || "#DDB596", { shadow: false, half: 0.08 });
  }
  function ground(x0, x1, y, mau, seed) {
    return D.paper(D.rRect(x0, y, x1 - x0, 900, 3, seed || 21), mau || CAT, { shadow: false, half: 0.1 }) +
      D.line("M " + x0 + " " + (y + 2) + " L " + x1 + " " + (y + 2), 4, INK, ' opacity="0.5"');
  }
  /* tời gỗ ba chân trên miệng giếng. Gốc: tâm miệng giếng (mặt đất). */
  function winch(id, s) {
    var g = '<g' + (id ? ' id="' + id + '"' : "") + ' transform="scale(' + (s || 1) + ')">';
    g += '<ellipse cx="0" cy="0" rx="70" ry="18" fill="#2A2522" stroke="' + INK + '" stroke-width="4"/>';
    g += D.line("M -90 6 L -6 -230 M 90 6 L 6 -230 M 0 30 L 0 -232", 14, "#8A6440") + D.line("M -90 6 L -6 -230 M 90 6 L 6 -230", 3, INK, ' opacity="0.6"');
    g += D.paper(D.rRect(-60, -160, 120, 34, 1.5, 81), "#A77B4E", { stroke: true, sw: 4 });
    g += D.line("M 0 -126 L 0 -10", 3, "#4A3A2C") + D.line("M 60 -143 L 92 -150 L 92 -120", 6, "#6B4E33");
    return g + "</g>";
  }
  /* sàng tròn có thẻ treo. Gốc: tay cầm (mép trái vành). o.chu: chữ trên thẻ. id-the: thẻ (đung đưa) */
  function sieve(id, o) {
    o = o || {};
    var s = '<g id="' + id + '">';
    s += '<ellipse cx="96" cy="8" rx="94" ry="30" fill="#8E7A5C" stroke="' + INK + '" stroke-width="5"/>';
    s += '<ellipse cx="96" cy="4" rx="80" ry="22" fill="#D8C9A8"/>';
    for (var k = -70; k <= 70; k += 14) s += D.line("M " + (96 + k) + " " + (4 - Math.sqrt(Math.max(0, 1 - k * k / 6400)) * 21) + " L " + (96 + k) + " " + (4 + Math.sqrt(Math.max(0, 1 - k * k / 6400)) * 21), 1.6, INK, ' opacity="0.5"');
    for (var j = -16; j <= 16; j += 8) s += D.line("M " + (96 - Math.sqrt(Math.max(0, 1 - j * j / 484)) * 79) + " " + (4 + j) + " L " + (96 + Math.sqrt(Math.max(0, 1 - j * j / 484)) * 79) + " " + (4 + j), 1.6, INK, ' opacity="0.5"');
    s += '<path d="M 2 8 C 2 34 190 34 190 8 L 190 18 C 186 46 6 46 2 18 Z" fill="#7A6548" stroke="' + INK + '" stroke-width="4"/>';
    if (o.chu) {
      s += '<g transform="translate(150,30)"><g id="' + id + '-the">' + D.line("M 0 0 L 0 26", 3) +
        D.paper(D.rRect(-170, 26, 340, 96, 1.5, 91), "#F6EDD6", { stroke: true, sw: 4, sx: 5, sy: 6 }) + D.txt(0, 94, o.chu, 64, { w: 900 }) + "</g></g>";
    }
    return s + "</g>";
  }
  function shovel() {
    return '<g>' + D.line("M 0 0 L 0 -150", 9, "#8A6440") + D.line("M -16 -150 L 16 -150", 9, "#8A6440") +
      D.paper("M -22 0 L 22 0 L 18 46 C 10 60 -10 60 -18 46 Z", "#9AA3A6", { stroke: true, sw: 4, shadow: false }) + "</g>";
  }
  /* bóng người giấy chung, không mặt (mũ rộng vành), dáng đứng. Gốc: giữa chân. o: mau, cuoc (vác cuốc) */
  function person(id, o) {
    o = o || {};
    var m = o.mau || "#5B4A3C", s = '<g id="' + id + '">';
    s += D.paper("M -30 0 L -26 -70 L -36 -150 C -34 -178 34 -178 36 -150 L 26 -70 L 30 0 L 8 0 L 4 -66 L -4 -66 L -8 0 Z", m, { stroke: true, sw: 4, half: 0.15 });
    s += D.paper(D.rEll(0, -194, 20, 22, 1, 451), m, { stroke: true, sw: 4, shadow: false });
    s += D.paper(D.rEll(0, -208, 40, 8, 1, 452), m, { stroke: true, sw: 4, shadow: false }) + D.paper("M -18 -208 C -18 -232 18 -232 18 -208 Z", m, { stroke: true, sw: 4, shadow: false });
    if (o.cuoc) s += '<g id="' + id + '-cuoc">' + D.line("M -40 -170 L 50 -90", 7, "#8A6440") + D.line("M -66 -150 C -50 -182 -24 -192 -10 -192", 8, "#6F7577") + "</g>";
    return s + "</g>";
  }
  function horse(id, mau) {
    var m = mau || "#6A5444";
    return '<g id="' + id + '">' + D.paper("M -90 -90 C -60 -110 40 -110 70 -92 L 108 -150 L 132 -146 L 120 -100 L 96 -70 C 90 -60 84 -56 76 -60 L 70 0 L 56 0 L 54 -56 L -50 -56 L -56 0 L -70 0 L -76 -56 C -96 -60 -100 -78 -90 -90 Z", m, { stroke: true, sw: 4, half: 0.12 }) +
      D.line("M -92 -86 C -112 -70 -116 -50 -110 -30", 7, m) + "</g>";
  }
  /* sườn đồi có cửa hầm. Gốc: chân trái của đồi. o: doors [[dx, w, h]], pipes [dx], wins [[dx, dy]] ; id+"-door<i>" mỗi cánh cửa (gốc bản lề trái) */
  function hill(id, w, h, seed, o) {
    o = o || {};
    var r = D.rng(seed || 5), pts = [[0, 0]], n = 10;
    for (var i = 1; i < n; i++) { var u = i / n; pts.push([u * w, -h * Math.sin(Math.PI * Math.min(1, u * 1.1)) * (0.9 + r() * 0.1) * (u > 0.15 && u < 0.85 ? 1 : 0.8)]); }
    pts.push([w, 0]);
    var d = "M " + pts.map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join(" L ") + " L " + w + " 40 L 0 40 Z";
    var s = '<g id="' + id + '">' + D.paper(d, o.mau || "#D98E62", { stroke: true, sw: 5, half: 0.14, sx: 10, sy: 8 });
    s += D.line("M " + f1(w * 0.1) + " " + f1(-h * 0.3) + " C " + f1(w * 0.3) + " " + f1(-h * 0.5) + " " + f1(w * 0.6) + " " + f1(-h * 0.4) + " " + f1(w * 0.85) + " " + f1(-h * 0.35), 3, "#A9603F", ' opacity="0.7"');
    (o.pipes || []).forEach(function (px, k) {
      var top = -h * 0.95 - 10;
      s += '<g transform="translate(' + px + "," + f1(top) + ')"><g id="' + id + '-pipe' + k + '">' + D.paper(D.rRect(-11, -90, 22, 110, 1, 60 + k), "#F6F4EE", { stroke: true, sw: 4, sx: 4, sy: 4 }) +
        D.paper("M -20 -90 L 20 -90 L 16 -108 L -16 -108 Z", "#E2E0DA", { stroke: true, sw: 4, shadow: false }) + "</g></g>";
    });
    (o.wins || []).forEach(function (wv) {
      s += D.paper(D.rRect(wv[0] - 30, wv[1] - 30, 60, 50, 1.5, 70), "#2C3A40", { stroke: true, sw: 4, shadow: false }) + D.line("M " + wv[0] + " " + (wv[1] - 30) + " L " + wv[0] + " " + (wv[1] + 20), 3, "#8A6440");
    });
    (o.doors || []).forEach(function (dv, k) {
      var dx = dv[0], dw = dv[1] || 110, dh = dv[2] || 190;
      s += D.paper("M " + (dx - 16) + " 2 L " + (dx - 16) + " " + (-dh - 16) + " L " + (dx + dw + 16) + " " + (-dh - 16) + " L " + (dx + dw + 16) + " 2 Z", "#B8704C", { stroke: true, sw: 4, shadow: false });
      s += '<rect x="' + dx + '" y="' + (-dh) + '" width="' + dw + '" height="' + dh + '" fill="url(#cpHam)"/>';
      s += '<g transform="translate(' + dx + ',0)"><g id="' + id + '-door' + k + '">' + D.paper(D.rRect(0, -dh, dw, dh, 1.2, 80 + k), "#8F6A45", { stroke: true, sw: 4, shadow: false, half: 0.12 });
      for (var pl = 1; pl < 4; pl++) s += D.line("M " + (dw * pl / 4) + " " + (-dh + 6) + " L " + (dw * pl / 4) + " -6", 2.5, "#5E4430");
      s += '<circle cx="' + (dw - 16) + '" cy="' + (-dh * 0.48) + '" r="6" fill="#E3C27A" stroke="' + INK + '" stroke-width="2"/></g></g>';
    });
    return s + "</g>";
  }
  function sun(x, y, r) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 1.8) + '" fill="#FFF4D6" opacity="0.6"/>' + D.paper(D.rEll(x, y, r, r, 1.5, 31), "#FBEFC7", { shadow: false, stroke: true, sw: 4 });
  }
  /* một viên opal nhỏ lấp lánh (màu duy nhất trong cảnh sepia). Gốc: tâm */
  function opal(id, r) {
    return '<g id="' + id + '"><circle r="' + (r * 3.2) + '" fill="url(#cpOpal)" opacity="0.8"/>' +
      D.paper(D.rEll(0, 0, r, r * 0.75, 1, 41), "#9FE6DD", { stroke: true, sw: 2.5, shadow: false }) +
      '<path d="M ' + (-r * 0.5) + ' 0 L 0 ' + (-r * 0.5) + ' L ' + (r * 0.5) + ' 0 Z" fill="#E59BD8" opacity="0.8"/><path d="M ' + (-r * 0.3) + ' ' + (r * 0.2) + ' L ' + (r * 0.4) + ' ' + (r * 0.3) + ' L 0 ' + (r * 0.5) + ' Z" fill="#7F9BF2" opacity="0.8"/>' +
      D.sparkle(r * 1.6, "#FFFFFF") + "</g>";
  }
  function pebble(r, seed, mau) { return D.paper(D.rEll(0, 0, r, r * 0.75, 1.2, seed || 51), mau || "#9C948C", { stroke: true, sw: 3, sx: 3, sy: 4 }); }
  return { D: D, INK: INK, KRAFT: KRAFT, BAND: BAND, CAT: CAT, CAT_D: CAT_D, DONG: DONG, DO_DAT: DO_DAT, TROI: TROI,
    defs: defs, wob: wob, hatProp: hatProp, mound: mound, mesas: mesas, ground: ground, winch: winch, sieve: sieve, shovel: shovel,
    person: person, horse: horse, hill: hill, sun: sun, opal: opal, pebble: pebble, f1: f1 };
})();

/* Đoạn d04 · cắt giấy · hồi ức: buổi sáng đầu tiên đi noodling giữa cánh đồng đống đất thải.
   Vào "giay" (lớp bật dựng từ giấy phẳng), ra "cat" sang d05 (vẽ tay, cận Wob và đống đất).
   Trang phục: mũ rộng vành kraft dải đỏ, ba lô ô liu cuộn thảm đỏ; tay phải cầm sàng (thẻ NOODLING), tay trái xẻng nhỏ.
   Gag: thứ duy nhất thợ mỏ "bỏ sót" trên đỉnh đống là một chiếc tất. Chữ duy nhất: NOODLING (thẻ treo sàng). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var Y = 900, XW = 760, XM = 1090;

  // ---- lớp xa: dãy mesa + đống nhỏ tới chân trời ----
  var xa = CP.mesas(-2600, 6800, 760, 11, "#E3BFA0");
  var r = D.rng(77);
  var xaD = "";
  for (var i = 0; i < 70; i++) { var xx = -2400 + i * 130 + r() * 60, s = 0.35 + r() * 0.25; xaD += at(CP.f1(xx), 790 + r() * 30, '<g transform="scale(' + CP.f1(s) + ')">' + CP.mound(220, 130, 300 + i) + "</g>"); }
  xa += xaD;
  // đống xa sẽ "hắt hơi" (trong lớp xa)
  var XS = 1720, YS = 800;
  xa += at(XS, YS, '<g id="snz">' + CP.mound(260, 160, 999) + "</g>");
  xa += '<g id="hatG">' + api.phut("hat", XS, YS - 150, { n: 5, song: 1.2, cao: 90, troi: 60, r: 26, tu: 15.0, den: 16.9, seed: 15 }) + "</g>";
  xa += CP.ground(-3000, 7000, 812, "#E6C6A2", 22);

  // ---- lớp giữa: mặt đất, đống đất, tời, Wob ----
  var mid = CP.ground(-3000, 8000, Y - 10, CP.CAT, 23);
  var dong = [[-700, 380, 230], [-200, 300, 180], [360, 260, 150], [1620, 360, 220], [2050, 330, 210], [2480, 360, 220], [2950, 300, 190], [3400, 380, 230], [3850, 320, 200], [4300, 360, 220], [4750, 330, 200], [5200, 360, 230]];
  for (var h2 = 0; h2 < 40; h2++) mid += at(-2200 + h2 * 230 + (h2 % 3) * 40, Y - 70, '<g transform="scale(0.62)">' + CP.mound(300, 190, 500 + h2) + "</g>");
  mid += CP.ground(-3000, 8000, Y - 40, CP.CAT, 24);
  dong.forEach(function (d, k) { mid += at(d[0], Y - 8, CP.mound(d[1], d[2], 120 + k)); });
  mid += at(-420, Y - 6, CP.winch("", 0.9)) + at(3150, Y - 6, CP.winch("", 0.9));
  // đống chính + chiếc tất trên đỉnh
  mid += at(XM, Y - 6, CP.mound(440, 270, 131));
  var sock = '<g id="sock">' + D.paper("M -10 -46 L 12 -46 L 14 -6 C 30 -2 40 8 34 16 C 26 24 4 20 -10 8 Z", "#F3EFE6", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) +
    D.line("M -9 -38 L 13 -38 M -9 -31 L 13 -31", 3, "#C9463A") + D.line("M 18 2 C 22 8 26 12 30 12", 2, CP.INK, ' opacity="0.4"') + "</g>";
  mid += at(XM + 6, Y - 270, sock);
  // cờ nhỏ (cắm ở đống giữa trong bộ ba) – không chữ
  var flag = '<g id="flag">' + D.line("M 0 0 L 0 -90", 5, "#6B4E33") + D.paper("M 0 -90 L 52 -76 L 0 -60 Z", "#C9463A", { stroke: true, sw: 3, sx: 3, sy: 3 }) + "</g>";
  mid += at(2050, Y - 214, flag);
  // bụi rơi dưới sàng
  var dust = '<g id="dust">';
  for (var b = 0; b < 9; b++) dust += '<g id="du' + b + '"><path d="' + D.rEll(0, 0, 4 + (b % 3) * 2, 3 + (b % 2) * 2, 1, 700 + b) + '" fill="#C9A486" stroke="' + CP.INK + '" stroke-width="1.5"/></g>';
  dust += "</g>";
  mid += dust;

  var sieveHold = '<g transform="rotate(90)">' + CP.sieve("sv", { chu: data.chu_tren_do_vat[0] }) + "</g>";
  var shovelHold = '<g transform="rotate(-8) translate(0,70)">' + CP.shovel() + "</g>";
  var W = CP.wob(api, "W", { holdR: sieveHold, holdL: shovelHold });
  mid += W.svg;

  // ---- lớp gần: sỏi, bụi cỏ muối (saltbush) ----
  var gan = "";
  var r2 = D.rng(88);
  for (var q = 0; q < 26; q++) {
    var gx = -2200 + q * 360 + r2() * 120;
    gan += at(CP.f1(gx), 1080 + r2() * 30, q % 3 === 0 ?
      D.paper(D.rEll(0, -30, 70, 38, 4, 800 + q), "#9AA78A", { stroke: true, sw: 4, half: 0.2 }) + D.paper(D.rEll(-30, -50, 40, 26, 3, 820 + q), "#AEB99C", { stroke: true, sw: 3, shadow: false }) :
      CP.pebble(14 + r2() * 12, 850 + q, r2() < 0.5 ? "#C79E86" : "#A9A097"));
  }

  api.dat(CP.defs() + '<rect width="1920" height="1080" fill="url(#cpSky)"/>' + CP.sun(1560, 190, 70) +
    api.lop("xa", xa, 0.35, { mat: 812 }) + api.lop("giua", mid, 1, { mat: Y }) + api.lop("gan", gan, 1.4, { mat: 1080 }));
  api.noi({ vaoDai: 0.55 });
  api.sfx("whoosh", 0, 0.45);

  // ---- mốc lời ----
  var tMorn = T("morning,", 0, 2.51), tNood = T("noodling.", 0, 3.39), tNood2 = T("Noodling", 0, 4.24), tSift = T("sifting", 0, 4.91);
  var tMiss = T("missed", 0, 9.28), tSome = T("something.", 0, 9.54), tEvery = T("everywhere.", 0, 10.89), tThou = T("Thousands", 0, 11.94);
  var tSnz = T("sneezing", 0, 15.21), tCent = T("century.", 0, 16.48), tPick = T("picked", 0, 17.51), tLucky = T("lucky.", 0, 18.44);
  var tExact = T("exactly", 0, 19.46), tOther = T("other", 0, 20.64);

  // ---- camera ----
  api.camera([
    [0, 820, 690, 1.15], [0.55, 820, 690, 1.15],
    [2.0, 800, 690, 1.18, "sine.inOut"],
    [tNood2 - 0.6, 960, 700, 1.5, "power2.inOut"],        // vào sàng + đống: thẻ NOODLING đọc rõ
    [8.6, 985, 700, 1.56, "sine.inOut"],
    [tSome - 0.3, 1060, 650, 1.62, "power2.inOut"],       // đưa lên chiếc tất
    [tEvery - 0.2, 1070, 655, 1.66, "sine.inOut"],
    [tThou + 1.4, 1500, 600, 0.6, "power3.inOut"],          // lùi ra: một đống, mười đống, cả cánh đồng
    [tSnz - 0.5, 1560, 610, 0.58, "sine.inOut"],
    [tCent + 0.5, 1600, 610, 0.6, "sine.inOut"],
    [tPick + 0.4, 1700, 690, 0.92, "power2.inOut"],       // vào bộ ba đống
    [tExact - 0.4, 1950, 700, 0.95, "sine.inOut"],
    [DUR, 3500, 640, 0.66, "power2.inOut"]                // lia ngang: cả trăm đống y hệt
  ]);

  // ---- Wob bước vào, vác sàng + xẻng ----
  W.set(0, { x: -160, y: Y, size: 0.7, aRu: -92, aRf: 0, aLu: 14, aLf: -6, lashes: 0, ice: 0, op: 1 });
  W.mouth(0, "grin");
    W.walk(0.6, tNood - 0.1, -160, XW, { step: 0.3, arms: false, tieng: "xuoc-dia" });
  W.pose(tNood - 0.1, 0.25, { pupX: 8, pupY: -4, eye: 1.12 }, "back.out(2)");
  W.mouth(tNood, "D");
  W.pose(tNood + 0.4, 0.3, { eye: 1 }, "power2.out");
  // lắc sàng: tay trước lắc ±, người nhún theo
  var tS0 = tSift - 0.2, tS1 = 8.7;
  W.mouth(tS0, "smirk");
  W.pose(tS0, 0.2, { pupX: 10, pupY: 8 }, "power2.out");
  for (var k = 0, tt = tS0; tt < tS1; tt += 0.24, k++) {
    W.pose(tt, 0.12, { aRf: k % 2 ? -9 : 9, sx: k % 2 ? 1.02 : 0.98 }, "sine.inOut");
    api.key("#sv-the", "rotation", tt + 0.06, k % 2 ? -10 : 10, "sine.inOut");
  }
  W.pose(tS1, 0.2, { aRf: 0, sx: 1 }, "power2.out");
  api.key("#sv-the", "rotation", tS1 + 0.5, 0, "elastic.out(1,0.4)");
  api.origin("#sv-the", "0 0");
  api.sfx("xuoc-dia", tS0 + 0.1, 0.35); api.sfx("xuoc-dia", tS0 + 1.6, 0.3); api.sfx("xuoc-dia", tS0 + 3.0, 0.3);
  // bụi rơi từ sàng: vị trí bàn tay phải lúc lắc
  var hp = W.hand("R", tS0 + 0.5);
  for (var b2 = 0; b2 < 9; b2++) {
    var sel = "#du" + b2, x0 = hp.x + 25 + (b2 * 13) % 100, y0 = hp.y + 10;
    api.set(sel, 0, { x: x0, y: y0, opacity: 0 });
    for (var c = 0, tc = tS0 + b2 * 0.13; tc < tS1 - 0.3; tc += 0.9, c++) {
      api.key(sel, "y", tc, y0, "step"); api.key(sel, "opacity", tc, 1, "step");
      api.key(sel, "y", tc + 0.75, y0 + 70 + (b2 % 3) * 14, "power2.in"); api.key(sel, "opacity", tc + 0.75, 0, "power2.in");
    }
  }
  // nhìn thấy chiếc tất: thất vọng
  W.pose(tMiss - 0.2, 0.3, { pupX: 12, pupY: -12, upRot: 4 }, "power2.inOut");
  W.mouth(tMiss, "flat");
  api.origin("#sock", "0 0");
  api.key("#sock", "rotation", 0, 0); api.key("#sock", "rotation", tSome - 0.05, 0, "none"); api.key("#sock", "rotation", tSome + 0.15, -14, "power2.out"); api.key("#sock", "rotation", tSome + 0.9, 0, "elastic.out(1,0.35)");
  api.sfx("boing", tSome - 0.02, 0.35);
  W.pose(tSome + 0.6, 0.18, { lid: 22 }, "power2.inOut");
  W.pose(tSome + 1.1, 0.3, { upRot: -3, lean: -3 }, "power2.inOut"); W.pose(tSome + 1.6, 0.3, { upRot: 0, lean: 0 }, "power2.inOut");
  W.idle(tEvery, tPick - 0.4, { seed: 6, bien: 2.2, liec: true });
  W.mouth(tEvery + 0.2, "o");
  W.pose(tEvery, 0.4, { lid: 0, pupX: 10, pupY: -3, eye: 1.15 }, "power2.out");

  // hắt hơi: đống xa co lại rồi phụt bụi
  api.origin("#snz", "0 0");
  api.key("#snz", "scaleY", 0, 1); api.key("#snz", "scaleY", tSnz - 0.45, 1, "none"); api.key("#snz", "scaleY", tSnz - 0.1, 1.12, "sine.out");
  api.key("#snz", "scaleY", tSnz + 0.02, 0.8, "power3.in"); api.key("#snz", "scaleY", tSnz + 0.5, 1, "elastic.out(1,0.4)");
  api.sfx("pop", tSnz, 0.5);
  api.show("#hatG", 0, 0); api.show("#hatG", tSnz - 0.05, 1);
  W.soc(tSnz + 0.05, { mieng: "o" });

  // chọn đống "may mắn": đi qua ba đống, cắm cờ đống giữa
  W.walk(tPick - 0.3, tLucky + 0.1, XW, 1880, { step: 0.26, arms: false, tieng: "xuoc-dia" });
  W.mouth(tPick, "smirk");
  W.pose(tLucky + 0.1, 0.25, { pupX: 9, pupY: -6 }, "power2.out");
  api.origin("#flag", "0 0");
  api.key("#flag", "scale", 0, 0); api.key("#flag", "scale", tLucky + 0.2, 0, "none"); api.key("#flag", "scale", tLucky + 0.45, 1, "back.out(2.5)");
  api.key("#flag", "rotation", tLucky + 0.45, -10, "none"); api.key("#flag", "rotation", tLucky + 1.4, 0, "elastic.out(1,0.3)");
  api.sfx("bonk", tLucky + 0.3, 0.5);
  W.mouth(tLucky + 0.4, "grin");
  W.nhinQuanh(tExact - 0.1, { nhip: 0.4 });
  W.mouth(tOther, "flat");
  W.pose(tOther, 0.25, { lid: 18 }, "power2.out");
  W.idle(tExact + 1.3, DUR, { seed: 9, bien: 1.6 });
  W.autoBlink(0.8, tS0, 41); W.autoBlink(tEvery + 0.6, tSnz - 0.3, 42);
};
