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

/* Đoạn d16 · cắt giấy · trong phòng khoét đá, nhìn từ trong ra khung cửa sáng gắt. Vào "cat", ra "chen".
   Nhiệt kế trên vách: cột đỏ tụt từ đỉnh dừng ở 23°C (73°F); Wob ló đầu ở khung cửa nhìn theo. Cạnh đó tờ giấy nhỏ ~24°C (~75°F)
   (số người dân kể); máy điều hoà trên vách phủ bụi, mạng nhện. Wob vào ngồi trên ba lô trong bóng râm, đếm ngón tay,
   không đủ ngón nên giơ cả chân lên đếm. Chữ: 23°C, 73°F (nhãn nhiệt kế), ~24°C (~75°F) (tờ giấy). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = CP.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var Y = 900;
  var tNasa = T("NASA", 0, 0), t23 = T("twenty-three", 0, 1.31), t73 = T("seventy-three", 0, 3.46), tRes = T("Residents", 0, 5.2), t24 = T("twenty-four", 0, 6.6);
  var tAir = T("air", 0, 8.49), tHeat = T("heater.", 0, 9.79), tSat = T("sat", 0, 10.65), tCount = T("counted", 0, 12.29), tTwice = T("twice.", 0, 13.46);
  var C23 = data.chu_tren_do_vat[0].split(" ")[0], F73 = data.chu_tren_do_vat[0].split(" ")[1].replace(/[()]/g, "");

  var mid = "";
  // vách đá, trần vòm sáng, sàn
  mid += D.paper(D.rRect(-400, 120, 2800, 900, 3, 601), "#DDB48A", { shadow: false, half: 0.1 });
  for (var a = 0; a < 9; a++) mid += D.line("M " + (-300 + a * 300) + " " + (900 - (a % 3) * 30) + " C " + (-200 + a * 300) + " 600 " + (-120 + a * 300) + " 400 " + (-40 + a * 300) + " 200", 3, "#B88E66", ' opacity="0.55"');
  mid += '<path d="M -400 120 C 400 -60 1600 -60 2400 120 L 2400 -400 L -400 -400 Z" fill="#F3EAD8" stroke="' + INK + '" stroke-width="4"/>';
  mid += D.paper(D.rRect(-400, Y - 10, 2800, 400, 2, 602), "#B98A60", { shadow: false, half: 0.12 }) + D.line("M -400 " + (Y - 8) + " L 2400 " + (Y - 8), 4, INK, ' opacity="0.6"');
  // khung cửa sáng (ra ngoài nắng)
  mid += '<path d="M 180 ' + (Y - 8) + ' L 180 420 C 180 360 520 360 520 420 L 520 ' + (Y - 8) + ' Z" fill="#FFF8EA" stroke="' + INK + '" stroke-width="5"/>';
  mid += '<path d="M 180 ' + (Y - 8) + ' L 180 760 L 520 760 L 520 ' + (Y - 8) + ' Z" fill="#F1D9B8"/>';
  // đèn vàng
  mid += '<circle cx="1500" cy="260" r="260" fill="url(#cpDen)"/>' + D.paper(D.rEll(1500, 230, 40, 26, 1, 611), "#FFE7A8", { stroke: true, sw: 4 }) + D.line("M 1500 120 L 1500 204", 4);
  // nhiệt kế
  mid += at(860, 240, D.thermometer("th", { c: C23, f: F73 }));
  // tờ giấy số dân kể
  mid += at(1240, 420, '<g id="note"><g transform="rotate(3)">' + D.paper(D.rRect(-190, -60, 380, 110, 2, 621), "#F8F0DC", { stroke: true, sw: 4, sx: 6, sy: 8 }) +
    '<circle cx="0" cy="-50" r="8" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/>' + D.txt(0, 16, data.chu_tren_do_vat[1], 46, { w: 800 }) + "</g></g>");
  // máy điều hoà phủ bụi, mạng nhện
  var ac = D.paper(D.rRect(-150, -70, 300, 140, 2, 631), "#D7D8D2", { stroke: true, sw: 5, sx: 6, sy: 8 });
  for (var v = -40; v <= 40; v += 16) ac += D.line("M -120 " + v + " L 120 " + v, 3, "#9A9C96");
  ac += '<path d="' + D.rRect(-150, -70, 300, 50, 6, 632) + '" fill="#B8A88E" opacity="0.6"/>';
  ac += D.line("M 150 -70 L 210 -130 M 150 -70 L 220 -60 M 150 -70 L 180 -150 M 168 -88 C 182 -92 196 -86 204 -78 M 160 -108 C 180 -116 196 -100 212 -92", 2, "#FFFFFF", ' opacity="0.9"');
  mid += at(1700, 560, '<g id="ac">' + ac + "</g>");
  // ba lô để ngồi
  mid += at(760, Y - 6, '<g id="bag">' + D.paper(D.rRect(-60, -110, 120, 110, 3, 641), "#76803F", { stroke: true, sw: 5 }) + D.paper(D.rRect(-62, -150, 124, 40, 2, 642), "#D9543C", { stroke: true, sw: 5, shadow: false }) + "</g>");
  var W = CP.wob(api, "W", {});
  mid += W.svg;
  // trụ cửa phía trước (Wob ló đầu qua mép)
  mid += D.paper("M 520 " + (Y - 8) + " L 520 420 C 540 380 600 380 620 420 L 620 " + (Y - 8) + " Z", "#C99A70", { stroke: true, sw: 5, half: 0.15, sx: 10, sy: 0 });

  api.dat(CP.defs() + '<rect width="1920" height="1080" fill="#3A2F28"/>' + api.lop("giua", mid, 1, { mat: Y }));
  api.noi({});
  api.camera([
    [0, 800, 520, 1.3], [t23 + 0.5, 830, 500, 1.36, "sine.inOut"],
    [t73 + 0.8, 850, 505, 1.4, "sine.inOut"],
    [tRes + 0.5, 1120, 520, 1.0, "power2.inOut"],      // tờ giấy + máy lạnh
    [tHeat, 1150, 525, 1.04, "sine.inOut"],
    [tSat + 0.2, 820, 640, 1.25, "power2.inOut"],      // Wob ngồi
    [tCount, 820, 660, 1.3, "power2.inOut"],
    [DUR, 815, 665, 1.36, "sine.inOut"]
  ]);

  // ---- nhiệt kế tụt về 23°C ----
  api.origin("#th-merc", "0 0"); api.origin("#th-c", "85 300"); api.origin("#th-f", "85 350");
  api.set("#th-merc", 0, { scaleY: 1 });
  api.key("#th-merc", "scaleY", 0.3, 1, "none"); api.key("#th-merc", "scaleY", t23 - 0.05, 0.42, "back.out(1.2)");
  api.pop("#th-c", t23 - 0.05, 0.26); api.pop("#th-f", t73 - 0.05, 0.26);
  api.sfx("drop", 0.35, 0.35); api.sfx("ting", t23 - 0.05, 0.45);
  // ---- Wob ló đầu ----
  W.set(0, { x: 440, y: Y, size: 0.7, lashes: 0, ice: 0, lean: 12, aLu: 18, aLf: -10, aRu: -50, aRf: -40, pupX: 12, pupY: -10, op: 1 });
  W.mouth(0, "o");
  W.pose(0.4, 1.0, { pupY: 4 }, "sine.inOut");   // mắt theo cột đỏ đi xuống
  W.idle(0.2, tRes, { seed: 161, bien: 1 });
  W.pose(t23, 0.15, { eye: 1.2 }, "back.out(2)"); W.pose(t23 + 0.6, 0.3, { eye: 1 }, "power2.out");
  W.mouth(t73, "smirk");
  W.pose(tRes - 0.2, 0.35, { lean: 16, pupX: 14, pupY: -2, lid: 22 }, "power2.inOut");    // nheo nhìn
  W.mouth(tRes, "flat");
  api.origin("#note", "0 0"); api.pop("#note", t24 - 0.25, 0.3);
  api.sfx("pop", t24 - 0.2, 0.35);
  api.origin("#ac", "0 0");
  api.key("#ac", "rotation", 0, 0); api.key("#ac", "rotation", tAir, 0, "none"); api.key("#ac", "rotation", tAir + 0.15, -2, "power2.out"); api.key("#ac", "rotation", tAir + 0.7, 0, "elastic.out(1,0.3)");
  // ---- vào ngồi trên ba lô ----
  W.pose(tHeat - 0.4, 0.25, { lean: 0, lid: 0, aRu: -18, aRf: 10 }, "power2.inOut");
  W.walk(tHeat - 0.1, tSat, 440, 760, { step: 0.28 });
  api.show("#W-pack", 0, 1); api.show("#W-pack", tSat - 0.2, 0);
  api.show("#bag", 0, 0); api.show("#bag", tSat - 0.2, 1);
  W.pose(tSat, 0.3, { y: Y - 128, sy: 0.92, sx: 1.06, legL: 70, legR: -70 }, "power2.inOut");
  api.sfx("bonk", tSat + 0.25, 0.3);
  // đếm ngón tay hai lần
  W.mouth(tCount - 0.4, "flat");
  W.pose(tCount - 0.3, 0.3, { aLu: -60, aLf: -60, aRu: 60, aRf: 60, pupX: 0, pupY: 10 }, "power2.out");
  for (var k = 0, tt = tCount; tt < tTwice - 0.1; tt += 0.22, k++) W.pose(tt, 0.1, { aRf: k % 2 ? 60 : 78 }, "sine.inOut");
  // không đủ ngón: giơ chân lên đếm tiếp
  W.pose(tTwice - 0.1, 0.3, { legL: 105, legR: -105, lean: -8, pupY: 14 }, "back.out(1.6)");
  W.mouth(tTwice + 0.2, "wobbly");
  api.sfx("boing", tTwice - 0.05, 0.3);
  W.autoBlink(tSat + 0.5, tCount - 0.3, 162);
};
