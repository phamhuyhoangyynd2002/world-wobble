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

/* Đoạn d22 · cắt giấy · mặt cắt dãy đồi nhiều lớp parallax. Vào "cat", ra "cat".
   Camera lùi từng nấc qua các lớp giấy: một phòng (Wob vẫy) → một nhà → khách sạn, cửa hàng, nhà thờ khoét trong đá;
   Wob nhỏ dần tới khi chỉ còn một chấm có cái ba lô. Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = CP.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tZoom = T("zoomed", 0, 1.1), tOne = T("One", 0, 2.09), tHouse = T("house.", 0, 2.96), tHouses = T("Houses", 0, 3.89), tHotel = T("hotel,", 0, 4.58), tShops = T("shops", 0, 5.49), tChurch = T("churches.", 0, 6.0);
  var SURF = 420, WX = 960, WY = 980;

  function room(x, y, w, h, inner, sd) {
    return at(x, y, D.paper(D.rRect(-w / 2, -h, w, h, 2, sd), "#4A3B31", { stroke: true, sw: 5, shadow: false }) + '<rect x="' + (-w / 2 + 6) + '" y="' + (-h + 6) + '" width="' + (w - 12) + '" height="' + (h - 12) + '" fill="url(#cpDen)" opacity="0.7"/>' +
      D.line("M " + (-w / 2) + " 0 L " + (w / 2) + " 0", 6, "#7A5A40") + (inner || ""));
  }
  function bed(s) { return '<g transform="scale(' + s + ')">' + D.paper(D.rRect(-60, -34, 120, 30, 1, 911), "#F6EEDC", { stroke: true, sw: 3, shadow: false }) + D.paper(D.rRect(-64, -8, 128, 8, 1, 912), "#A77B4E", { shadow: false }) + "</g>"; }
  function shelf(s) { var o = '<g transform="scale(' + s + ')">'; for (var k = 0; k < 3; k++) o += D.line("M -60 " + (-30 - k * 34) + " L 60 " + (-30 - k * 34), 5, "#A77B4E") + '<rect x="-50" y="' + (-50 - k * 34) + '" width="18" height="20" fill="#C9463A"/><rect x="-10" y="' + (-50 - k * 34) + '" width="18" height="20" fill="#E3B85C"/><rect x="30" y="' + (-50 - k * 34) + '" width="18" height="20" fill="#5A9FB8"/>'; return o + "</g>"; }
  function corridor(x0, x1, y) { return D.paper(D.rRect(x0, y - 70, x1 - x0, 70, 1.5, 920 + Math.round(x0)), "#4A3B31", { shadow: false }); }

  // ---- lớp xa: trời + dãy đồi trên mặt đất ----
  var xa = CP.mesas(-6000, 9000, SURF - 120, 81, "#E3BFA0");
  // ---- lớp giữa: mặt cắt đá với các phòng ----
  var mid = '<path d="M -6000 ' + SURF + ' L -4000 ' + (SURF - 60) + ' L -2600 ' + (SURF - 200) + ' L -1200 ' + (SURF - 80) + ' L 0 ' + (SURF - 160) + ' L 1400 ' + (SURF - 40) + ' L 2800 ' + (SURF - 220) + ' L 4200 ' + (SURF - 90) + ' L 6000 ' + (SURF - 180) + ' L 9000 ' + SURF + ' L 9000 5000 L -6000 5000 Z" fill="#D98E62" stroke="' + INK + '" stroke-width="8"/>';
  mid += '<rect x="-6000" y="' + (SURF + 400) + '" width="15000" height="5000" fill="#C98B66" opacity="0.6"/><rect x="-6000" y="' + (SURF + 1500) + '" width="15000" height="5000" fill="#B97A5A" opacity="0.6"/>';
  // phòng của Wob
  mid += room(WX, WY + 10, 300, 200, at(80, 0, bed(0.9)), 931);
  // nhà: các phòng nối nhau
  mid += corridor(1110, 1300, WY + 10) + room(1440, WY + 10, 280, 190, at(0, 0, shelf(0.6)), 932) + corridor(660, 810, WY + 10) + room(530, WY + 10, 260, 180, "", 933);
  mid += room(1000, WY - 230, 260, 170, at(-40, 0, bed(0.8)), 934) + D.line("M 1100 " + (WY - 220) + " L 1100 " + (WY - 190), 0);
  // khách sạn: lưới phòng
  for (var rr = 0; rr < 3; rr++) for (var cc = 0; cc < 5; cc++) mid += room(2300 + cc * 330, 900 + rr * 280, 270, 190, at(0, 0, bed(0.8)), 940 + rr * 5 + cc);
  mid += corridor(1580, 2165, WY + 10);
  // cửa hàng
  for (var s = 0; s < 4; s++) mid += room(-600 - s * 340, 1060, 290, 220, at(0, 0, shelf(0.8)), 960 + s);
  mid += corridor(-470, 400, 1060);
  // nhà thờ: sảnh cao vòm, hàng ghế
  var nave = '<path d="M -400 0 L -400 -420 C -400 -620 400 -620 400 -420 L 400 0 Z" fill="#4A3B31" stroke="' + INK + '" stroke-width="6"/><path d="M -380 -10 L -380 -420 C -380 -600 380 -600 380 -420 L 380 -10 Z" fill="url(#cpDen)" opacity="0.8"/>';
  for (var p = 0; p < 4; p++) nave += D.paper(D.rRect(-300 + p * 160, -60, 110, 40, 1, 970 + p), "#A77B4E", { shadow: false });
  nave += '<circle cx="0" cy="-440" r="60" fill="#FFE7A8" opacity="0.8"/>';
  mid += at(-2600, 1500, nave) + at(4600, 1600, nave);
  for (var h = 0; h < 10; h++) mid += room(-4400 + h * 480 + (h % 2) * 200, 2100 + (h % 3) * 300, 260, 180, at(0, 0, h % 2 ? bed(0.8) : shelf(0.6)), 980 + h);
  for (var h2 = 0; h2 < 10; h2++) mid += room(3000 + h2 * 420, 2200 + (h2 % 3) * 280, 260, 180, at(0, 0, h2 % 2 ? shelf(0.6) : bed(0.8)), 990 + h2);
  // ống thông gió trên mặt đất
  [-3000, -800, 600, 1800, 3500, 5200].forEach(function (x, k) { mid += at(x, SURF - 60 - (k % 2) * 80, D.paper(D.rRect(-12, -100, 24, 120, 1, 999 + k), "#F6F4EE", { stroke: true, sw: 4 })); });
  var W = CP.wob(api, "W", {});
  mid += W.svg;
  // ---- lớp gần: khung giấy cắt mép (tiền cảnh) ----
  var gan = '<path d="M -3000 -3000 L 6000 -3000 L 6000 5000 L -3000 5000 Z M 600 800 C 900 770 1050 780 1330 805 L 1345 1200 C 1100 1225 850 1222 590 1195 Z" fill="#B8704C" fill-rule="evenodd" stroke="' + INK + '" stroke-width="10"/>' +
    '<path d="M -3000 -3000 L 6000 -3000 L 6000 5000 L -3000 5000 Z M 600 800 C 900 770 1050 780 1330 805 L 1345 1200 C 1100 1225 850 1222 590 1195 Z" fill="url(#half)" fill-rule="evenodd" opacity="0.12"/>';

  api.dat(CP.defs() + '<rect width="1920" height="1080" fill="url(#cpSky)"/>' + api.lop("xa", xa, 0.35, { mat: SURF }) + api.lop("giua", mid, 1, { mat: SURF }) + '<g id="ganW">' + api.lop("gan", gan, 1.4, { mat: 1080 }) + "</g>");
  api.noi({});

  var cy = WY - 110;
  api.camera([
    [0, WX, cy, 3.3], [tZoom - 0.1, WX, cy, 3.4, "sine.inOut"],
    [tOne + 0.15, WX + 10, cy - 10, 2.2, "power3.inOut"],
    [tHouse + 0.1, 1000, cy - 60, 1.15, "power3.inOut"],
    [tHouses + 0.1, 1700, cy, 0.6, "power3.inOut"],
    [tHotel + 0.2, 1500, cy + 100, 0.42, "power3.inOut"],
    [tShops + 0.1, 800, cy + 300, 0.26, "power3.inOut"],
    [DUR, 800, cy + 380, 0.2, "power2.inOut"]
  ]);
  // tiền cảnh trôi ra khỏi khung sau nấc đầu
  api.fade("#ganW", tHouse, 0.5, 0);
  api.sfx("whoosh", tOne, 0.3); api.sfx("whoosh", tHouses, 0.3); api.sfx("whoosh", tShops, 0.3);

  W.set(0, { x: WX - 60, y: WY + 6, size: 0.4, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 4, pupY: -6, op: 1 });
  W.mouth(0, "smirk");
  W.vay(tZoom - 0.2, 3, "R");
  W.mouth(tZoom, "grin");
  W.pose(tOne + 0.4, 0.3, { eye: 1.2, pupY: -10 }, "back.out(2)");
  W.mouth(tHouse, "o");
  W.idle(tOne, DUR, { seed: 221, bien: 2 });
  W.autoBlink(0.3, DUR, 222);
};
