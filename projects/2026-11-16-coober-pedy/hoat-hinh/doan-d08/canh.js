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
    var m = mau || "#6A5444", s = '<g id="' + id + '">';
    s += D.line("M -60 -70 L -66 0 M -36 -70 L -30 0 M 40 -70 L 34 0 M 62 -70 L 70 0", 12, m) + D.line("M -60 -70 L -66 0 M -36 -70 L -30 0 M 40 -70 L 34 0 M 62 -70 L 70 0", 2, INK, ' opacity="0.5"');
    s += D.paper("M -84 -96 C -80 -122 60 -126 76 -104 L 96 -168 C 100 -180 116 -184 124 -176 L 150 -146 C 156 -138 150 -128 140 -130 L 116 -140 L 96 -84 C 84 -64 -70 -60 -84 -80 Z", m, { stroke: true, sw: 4, half: 0.12 });
    s += D.line("M 100 -176 L 104 -194 M 112 -180 L 118 -196", 5, m) + D.line("M -84 -94 C -104 -84 -110 -60 -104 -36", 9, m);
    return s + "</g>";
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
      var uu = px / w, top = -h * Math.sin(Math.PI * Math.min(1, uu * 1.1)) * (uu > 0.15 && uu < 0.85 ? 0.9 : 0.72) + 16;
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

/* Đoạn d08 · cắt giấy · giải thích địa chất. Vào "cat", ra "chen".
   Mặt cắt lòng đất nhiều lớp giấy: biển nội địa cổ tràn vào (cá cổ, Wob và mũ nổi lềnh bềnh), trầm tích đọng thành lớp;
   biển rút, Wob ngồi ướt trên lớp đá khô nhìn đồng hồ cát lật nhiều vòng; đúng "twelve" mạch opal len vào khe đá.
   Chữ duy nhất: ~12–16 million years ago (thẻ giấy cạnh đồng hồ cát). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = CP.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tHalf = T("half", 0, 1.43), tRock = T("rock", 0, 2.5), tInland = T("inland", 0, 5.44), tSea = T("sea.", 0, 5.8);
  var tOpal = T("opal", 1, 6.7), tLater = T("later.", 0, 8.01), tStudy = T("study", 0, 9.3), tTw = T("twelve", 0, 10.66), tGone = T("gone.", 0, 14.26);
  var S0 = 560, S1 = 500;  // mặt đất cũ, mặt lớp trầm tích mới

  // ---- mặt cắt: các lớp đá ----
  var mid = "";
  var bands = [[S0, "#D9A27A"], [650, "#C98B66"], [760, "#E2C29A"], [860, "#B97A5A"], [960, "#D6B08A"]];
  bands.forEach(function (b, i) { mid += D.paper(D.rRect(-600, b[0], 3200, 700, 3, 400 + i), b[1], { shadow: false, half: 0.1 }) + D.line("M -600 " + b[0] + " L 2600 " + b[0], 3.5, INK, ' opacity="0.55"'); });
  var r = D.rng(17);
  for (var p = 0; p < 40; p++) mid += at(CP.f1(-400 + r() * 2800), CP.f1(600 + r() * 460), CP.pebble(6 + r() * 10, 420 + p, r() < 0.5 ? "#A9846A" : "#E9D5BC"));
  // khe đá + mạch opal (vẽ dần)
  var crack = "M 1190 " + (S0 + 6) + " L 1210 640 L 1170 720 L 1240 800 L 1200 880 L 1260 960";
  mid += D.line(crack, 10, "#5E4636");
  mid += '<path id="vein" d="' + crack + '" fill="none" stroke="#8FE0D8" stroke-width="7" stroke-linecap="round" stroke-dasharray="560" stroke-dashoffset="560"/>';
  mid += '<g id="veinG">' + [[1210, 640], [1170, 720], [1240, 800], [1200, 880]].map(function (q, i) { return at(q[0], q[1], CP.opal("vo" + i, 9)); }).join("") + "</g>";
  // lớp trầm tích mới (mọc lên khi biển đọng)
  mid += '<g id="sed">' + D.paper(D.rRect(-600, S1, 3200, S0 - S1 + 6, 2.5, 431), "#E8CFAE", { shadow: false, half: 0.12 }) + D.line("M -600 " + S1 + " L 2600 " + S1, 4, INK, ' opacity="0.6"') + "</g>";
  // đồng hồ cát + thẻ
  var hg = '<g id="hg"><g transform="translate(0,-80)"><g id="hgR">' +
    D.paper(D.rRect(-48, -84, 96, 14, 1, 441), "#8A6440", { stroke: true, sw: 4, shadow: false }) + D.paper(D.rRect(-48, 70, 96, 14, 1, 442), "#8A6440", { stroke: true, sw: 4, shadow: false }) +
    '<path d="M -36 -70 L 36 -70 L 6 0 L 36 70 L -36 70 L -6 0 Z" fill="#EAF4F6" stroke="' + INK + '" stroke-width="4" opacity="0.95"/>' +
    '<path d="M -26 -60 L 26 -60 L 6 -14 L -6 -14 Z" fill="#E2B87C"/><path d="M -30 66 L 30 66 L 0 40 Z" fill="#E2B87C"/>' + "</g></g></g>";
  mid += at(820, S1, hg);
  mid += at(1380, 330, '<g id="tag">' + D.paper(D.rRect(-380, -60, 760, 110, 2, 451), "#F6EDD6", { stroke: true, sw: 5, sx: 8, sy: 10 }) + D.txt(0, 14, data.chu_tren_do_vat[0], 50, { w: 900 }) + "</g>");
  // biển nội địa cổ (trượt vào rồi rút)
  var sea = '<g id="sea"><path d="M 0 200 C 120 180 220 220 340 200 C 460 180 560 220 680 200 C 800 180 900 220 1020 200 C 1140 180 1240 220 1360 200 C 1480 180 1580 220 1700 200 C 1820 180 1920 220 2040 200 C 2160 180 2260 220 2380 200 L 2380 ' + (S0 + 4) + ' L 0 ' + (S0 + 4) + ' Z" fill="#5A9FB8" opacity="0.88" stroke="' + INK + '" stroke-width="4"/>' +
    '<rect x="0" y="210" width="2380" height="' + (S0 - 206) + '" fill="url(#half)" opacity="0.08"/>' +
    D.line("M 120 320 C 200 310 260 330 340 320 M 900 420 C 980 410 1040 430 1120 420 M 1600 300 C 1680 290 1740 310 1820 300", 4, "#BFE0EE") + "</g>";
  mid += sea;
  // cá cổ giấy
  function fishA(id, c) { return '<g id="' + id + '">' + D.paper("M -60 0 C -30 -34 30 -34 50 0 C 30 34 -30 34 -60 0 Z M 46 0 L 84 -26 L 78 0 L 84 26 Z", c, { stroke: true, sw: 4, sx: 4, sy: 5 }) + '<circle cx="-34" cy="-6" r="6" fill="#fffdf6" stroke="' + INK + '" stroke-width="2"/><circle cx="-34" cy="-6" r="2.5" fill="' + INK + '"/>' + D.line("M -10 -20 L -4 20 M 10 -18 L 16 18", 3, INK, ' opacity="0.4"') + "</g>"; }
  mid += at(0, 300, fishA("fa", "#E3B85C")) + at(0, 450, fishA("fb", "#D98E62"));
  // mũ rời
  mid += CP.hatProp("hatF", 0.7);
  // giọt nước
  for (var d = 0; d < 5; d++) mid += '<g id="dr' + d + '"><path d="M 0 -10 C 6 0 7 6 0 10 C -7 6 -6 0 0 -10 Z" fill="#7FC0D8" stroke="' + INK + '" stroke-width="2"/></g>';
  var W = CP.wob(api, "W", {});
  mid += W.svg;

  api.dat(CP.defs() + '<rect width="1920" height="1080" fill="url(#cpSky)"/>' + CP.sun(1650, 150, 60) + api.lop("giua", mid, 1, { mat: S0 }));
  api.noi({});
  api.camera([
    [0, 820, 520, 1.25], [tHalf + 0.6, 850, 525, 1.3, "sine.inOut"],
    [tRock, 960, 540, 1.0, "power2.inOut"],
    [tSea + 0.5, 960, 520, 1.04, "sine.inOut"],
    [tLater, 980, 540, 1.08, "sine.inOut"],
    [tTw - 0.4, 1060, 600, 1.15, "power2.inOut"],
    [DUR, 1080, 600, 1.2, "sine.inOut"]
  ]);

  // ---- Wob giơ ngón tay, nghiêng đầu ----
  W.set(0, { x: 560, y: S0, size: 0.7, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, op: 1 });
  W.mouth(0, "smirk");
  W.pose(0.1, 0.3, { aRu: -150, aRf: -10, upRot: 7, pupX: 8, pupY: -6 }, "back.out(1.8)");
  W.pose(tHalf, 0.2, { upRot: -6 }, "power2.inOut"); W.pose(tHalf + 0.35, 0.25, { upRot: 6 }, "power2.inOut");
  W.pose(tRock - 0.2, 0.35, { aRu: -18, aRf: 10, upRot: 0 }, "power2.inOut");
  W.idle(tHalf + 0.6, 4.1, { seed: 81, bien: 1.4 });
  // biển tràn vào
  api.key("#sea", "x", 0, 2300); api.key("#sea", "x", 4.0, 2300, "none"); api.key("#sea", "x", tInland, -230, "power2.out");
  api.key("#sea", "x", tOpal - 0.1, -230, "none"); api.key("#sea", "x", tLater + 0.2, -2700, "power2.in");
  api.sfx("hoi-nuoc", 4.1, 0.5); api.sfx("whoosh", tOpal, 0.35);
  W.soc(4.6, { mieng: "o" });
  W.pose(4.9, 0.9, { y: 380, aLu: 70, aLf: -40, aRu: -70, aRf: 40 }, "sine.out");
  for (var k = 0, tt = 5.8; tt < tOpal; tt += 0.5, k++) W.pose(tt, 0.5, { y: k % 2 ? 380 : 360, lean: k % 2 ? 5 : -5 }, "sine.inOut");
  W.mouth(5.6, "wobbly");
  // mũ nổi lên cạnh Wob
  api.show("#W-mu", 4.75, 0);
  api.origin("#hatF", "0 0");
  api.set("#hatF", 0, { x: 560, y: S0 - 248, opacity: 0 });
  api.show("#hatF", 4.75, 1);
  api.key("#hatF", "x", 4.75, 560, "none"); api.key("#hatF", "y", 4.75, S0 - 248, "none");
  api.key("#hatF", "x", 5.9, 760, "sine.out"); api.key("#hatF", "y", 5.9, 220, "sine.out");
  for (var h = 0, th = 6.2; th < tOpal; th += 0.45, h++) api.key("#hatF", "rotation", th, h % 2 ? 8 : -8, "sine.inOut");
  // cá bơi qua
  api.key("#fa", "x", 0, 2200); api.key("#fa", "x", tInland - 0.3, 2200, "none"); api.key("#fa", "x", tLater + 0.2, -500, "sine.inOut");
  api.key("#fb", "x", 0, 2400); api.key("#fb", "x", tInland, 2400, "none"); api.key("#fb", "x", tLater + 0.2, -300, "sine.inOut");
  api.set("#fa", 0, { scaleX: 1 }); api.set("#fb", 0, { scaleX: 1 });
  // trầm tích đọng thành lớp
  api.origin("#sed", "0 " + S0);
  api.key("#sed", "scaleY", 0, 0); api.key("#sed", "scaleY", tInland, 0, "none"); api.key("#sed", "scaleY", tOpal, 1, "power1.inOut");
  // biển rút: Wob rơi bịch, ngồi ướt
  W.pose(tOpal + 0.2, 0.45, { y: S1, lean: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "power2.in");
  W.pose(tOpal + 0.65, 0.12, { sy: 0.8, sx: 1.12 }, "power2.out");
  W.pose(tOpal + 0.8, 0.4, { sy: 0.88, sx: 1.06, legL: 50, legR: -50 }, "back.out(2)");
  api.sfx("bonk", tOpal + 0.62, 0.45);
  W.mouth(tOpal + 0.7, "flat");
  W.pose(tOpal + 0.9, 0.3, { lid: 20, pupX: 12, pupY: 4 }, "power2.out");
  // mũ rơi xuống cạnh
  api.key("#hatF", "x", tOpal, 760, "none"); api.key("#hatF", "y", tOpal, 220, "none"); api.key("#hatF", "rotation", tOpal, 0, "none");
  api.key("#hatF", "x", tOpal + 0.9, 360, "sine.inOut"); api.key("#hatF", "y", tOpal + 0.9, S1 - 10, "power2.in"); api.key("#hatF", "rotation", tOpal + 0.9, -12, "sine.inOut");
  // giọt nước nhỏ từ Wob
  for (var d2 = 0; d2 < 5; d2++) {
    var sel = "#dr" + d2, x0 = 500 + d2 * 30, y0 = S1 - 120 + (d2 % 2) * 30;
    api.set(sel, 0, { x: x0, y: y0, opacity: 0 });
    for (var tc = tOpal + 1 + d2 * 0.27; tc < DUR - 0.3; tc += 1.35) {
      api.key(sel, "y", tc, y0, "step"); api.key(sel, "opacity", tc, 1, "step");
      api.key(sel, "y", tc + 0.6, S1 - 4, "power2.in"); api.key(sel, "opacity", tc + 0.6, 0, "power3.in");
    }
  }
  // đồng hồ cát lật nhiều vòng
  api.origin("#hgR", "0 0");
  var rot = 0; api.key("#hgR", "rotation", 0, 0);
  for (var f = 0, tf = tLater + 0.3; tf < tTw - 0.1; tf += 0.42, f++) { rot += 180; api.key("#hgR", "rotation", tf, rot - 180, "none"); api.key("#hgR", "rotation", tf + 0.3, rot, "back.out(1.6)"); }
  api.sfx("whoosh", tLater + 0.3, 0.25); api.sfx("whoosh", tLater + 1.2, 0.25);
  W.idle(tOpal + 1.3, DUR, { seed: 83, bien: 1 });
  // mắt Wob theo đồng hồ cát rồi theo mạch opal
  W.pose(tTw - 0.3, 0.3, { lid: 0, pupX: 12, pupY: 10, eye: 1.15 }, "power2.out");
  W.mouth(tTw, "o");
  // mạch opal len vào khe đúng "twelve"
  api.key("#vein", "strokeDashoffset", 0, 560); api.key("#vein", "strokeDashoffset", tTw - 0.15, 560, "none"); api.key("#vein", "strokeDashoffset", tTw + 1.6, 0, "power2.out");
  api.show("#veinG", 0, 0); api.show("#veinG", tTw + 0.4, 1);
  api.sfx("ting", tTw - 0.05, 0.5);
  api.origin("#tag", "0 0"); api.pop("#tag", tTw - 0.1, 0.3);
  W.autoBlink(tOpal + 1.5, tTw - 0.5, 84);
  // nhặt mũ đội lại trước khi sang d09
  var tP = DUR - 1.1;
  W.pose(tP, 0.3, { lean: -12, aLu: 60, aLf: -20, pupX: -12, pupY: 8 }, "power2.out");
  api.key("#hatF", "x", tP + 0.3, 360, "none"); api.key("#hatF", "y", tP + 0.3, S1 - 10, "none"); api.key("#hatF", "rotation", tP + 0.3, -12, "none");
  api.key("#hatF", "x", tP + 0.7, 560, "power2.inOut"); api.key("#hatF", "y", tP + 0.55, S1 - 330, "power2.out"); api.key("#hatF", "y", tP + 0.7, S1 - 220, "power2.in"); api.key("#hatF", "rotation", tP + 0.7, 0, "sine.out");
  api.show("#hatF", tP + 0.72, 0); api.show("#W-mu", tP + 0.72, 1);
  W.pose(tP + 0.4, 0.3, { lean: 0, aLu: 18, aLf: -10, pupX: 4, pupY: -6 }, "power2.inOut");
  W.mouth(tP + 0.75, "smirk");
  api.sfx("pop", tP + 0.72, 0.4);
};
