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

/* Đoạn d18 · cắt giấy · khách sạn dưới đất. Vào "giay", ra "cat".
   Chìa khoá thẻ gỗ rơi vào tay Wob; Wob nhão đi xuống hành lang (parallax trụ vòm), đúng "shape" bật tròn lại (boing), cái mũ nhảy lóc cóc
   theo sau rồi nhảy lên đầu; lia theo vách đá lên trần vòm sáng; ba ô cận cho ba chữ "No" (cửa sổ phấn bị xoá, xe đồ chơi đỗ yên,
   tia nắng ở khe cửa – cửa đóng sập); phòng (ảnh ai-underground-room làm phông): Wob ngủ, hòn đá đầu giường cũng ngủ, mũ treo đầu giường;
   cận sổ: gạch dòng cũ, viết dòng mới nét chắc. Chữ: I am not moving here, I was moving here after all. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = CP.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var Y = 900;
  var tBook = T("booked", 0, 1.15), tWalk = T("walked", 0, 3.63), tShape = T("shape", 0, 6.39), tWalls = T("walls", 0, 7.91), tCeil = T("ceiling.", 0, 10.71);
  var tNo1 = T("No", 0, 11.57), tNo2 = T("No", 1, 12.55), tNo3 = T("No", 2, 13.6), tIn = api.tuDung("in", 14) || 14.46, tSlept = T("slept", 0, 15.09), tRock2 = api.tuDung("rock", 16.2) || 16.77;
  var tBreak = T("breakfast", 0, 17.74), tCross = T("crossed", 0, 18.45), tWas = T("was", 0, 20.66), tAll = T("all.", 0, 21.63);
  var tA1 = tNo1 - 0.12, tA2 = tNo2 - 0.12, tA3 = tNo3 - 0.12, tB = tIn + 0.45, tC = tBreak - 0.25;

  // ================= A: hành lang =================
  var mid = D.paper(D.rRect(-600, -300, 4200, 1340, 3, 801), "#DDB48A", { shadow: false, half: 0.1 });
  for (var a = 0; a < 14; a++) mid += D.line("M " + (-500 + a * 300) + " " + (Y - 20) + " C " + (-420 + a * 300) + " 640 " + (-360 + a * 300) + " 420 " + (-280 + a * 300) + " 160", 3, "#B88E66", ' opacity="0.5"');
  mid += '<path d="M -600 160 C 600 -120 2400 -120 3600 160 L 3600 -900 L -600 -900 Z" fill="#F3EAD8" stroke="' + INK + '" stroke-width="5"/>';
  mid += D.line("M -600 110 C 600 -170 2400 -170 3600 110", 3, "#D8C8AA");
  mid += D.paper(D.rRect(-600, Y - 10, 4200, 400, 2, 802), "#B98A60", { shadow: false, half: 0.12 }) + D.line("M -600 " + (Y - 8) + " L 3600 " + (Y - 8), 4, INK, ' opacity="0.6"');
  // lối vào chói nắng bên trái
  mid += '<path d="M -120 ' + (Y - 8) + ' L -120 380 C -120 320 220 320 220 380 L 220 ' + (Y - 8) + ' Z" fill="#FFF8EA" stroke="' + INK + '" stroke-width="5"/>';
  [700, 1500, 2300].forEach(function (x) { mid += '<circle cx="' + x + '" cy="300" r="200" fill="url(#cpDen)"/>' + D.paper(D.rEll(x, 300, 34, 22, 1, 810), "#FFE7A8", { stroke: true, sw: 4 }); });
  // chìa khoá thẻ gỗ (rơi)
  var keyS = '<g>' + D.line("M 0 0 L 0 26", 3) + '<circle cx="0" cy="34" r="10" fill="none" stroke="#C9A04A" stroke-width="6"/>' + D.line("M 0 44 L 0 92 M 0 80 L 12 80 M 0 90 L 10 90", 6, "#C9A04A") +
    D.paper(D.rRect(-20, -70, 40, 70, 1.5, 821), "#A77B4E", { stroke: true, sw: 4, shadow: false }) + '<circle cx="0" cy="-56" r="5" fill="' + INK + '"/></g>';
  mid += '<g id="keyF">' + keyS + "</g>";
  mid += CP.hatProp("hatH", 0.7);
  var W = CP.wob(api, "W", { khongMu: true, holdR: '<g id="keyH" transform="rotate(180) scale(0.9)">' + keyS + "</g>" });
  mid += W.svg;
  var gan = "";
  for (var p = 0; p < 6; p++) gan += at(1150 + p * 900, 1080, D.paper("M -70 0 L -70 -900 L 70 -900 L 70 0 Z", "#C99A70", { stroke: true, sw: 6, half: 0.15, sx: 14, sy: 0 }) + D.line("M -40 -800 L -40 -60", 3, "#A9774E", ' opacity="0.6"'));

  // ================= ô cận "No" =================
  function card(id, inner) {
    return '<g id="' + id + '"><rect width="1920" height="1080" fill="#2E2621" opacity="0.6"/><g transform="translate(960,540)"><g id="' + id + 'z">' +
      D.paper(D.rRect(-640, -380, 1280, 760, 3, 830), "#DDB48A", { stroke: true, sw: 8, sx: 16, sy: 20, half: 0.1 }) + inner + "</g></g></g>";
  }
  var c1 = '<path d="' + D.rRect(-230, -230, 460, 400, 3, 841) + '" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linejoin="round"/>' + D.line("M 0 -230 L 0 170 M -230 -30 L 230 -30", 10, "#FFFFFF") +
    '<g transform="translate(-300,-260)"><g id="eras">' + D.paper("M 0 0 L 600 0 L 600 470 L 0 470 Z", "#DDB48A", { shadow: false }) + "</g></g>" +
    '<g id="erBlk">' + D.paper(D.rRect(-80, -50, 160, 100, 2, 842), "#3F6A70", { stroke: true, sw: 5 }) + D.paper(D.rRect(-80, 20, 160, 30, 2, 843), "#EDE6D8", { stroke: true, sw: 4, shadow: false }) + "</g>";
  var toy = '<g transform="translate(0,120)">' + D.paper("M -260 0 L -260 -90 L -150 -100 L -90 -190 L 120 -190 L 180 -100 L 260 -90 L 260 0 Z", "#C9463A", { stroke: true, sw: 6, half: 0.15 }) +
    '<path d="M -70 -110 L -40 -170 L 50 -170 L 50 -110 Z M 70 -110 L 70 -170 L 110 -170 L 150 -110 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="5"/>' +
    '<circle cx="-150" cy="0" r="52" fill="#2a2f31" stroke="' + INK + '" stroke-width="5"/><circle cx="150" cy="0" r="52" fill="#2a2f31" stroke="' + INK + '" stroke-width="5"/>' +
    '<circle cx="-150" cy="0" r="18" fill="#9aa5a8"/><circle cx="150" cy="0" r="18" fill="#9aa5a8"/>' + D.line("M -440 60 L 440 60", 5, INK, ' opacity="0.4"') + "</g>";
  var c3 = '<rect x="-200" y="-320" width="400" height="640" fill="#2B2420"/>' +
    '<path id="ray" d="M 0 -300 L 30 -300 L 600 320 L 260 320 Z" fill="#FFF0B8" opacity="0.85"/>' +
    '<g transform="translate(-200,-320)"><g id="dr3">' + D.paper("M 0 0 L 380 0 L 380 640 L 0 640 Z", "#8F6A45", { stroke: true, sw: 5, shadow: false, half: 0.12 }) +
    '<circle cx="340" cy="320" r="12" fill="#E3C27A" stroke="' + INK + '" stroke-width="3"/>' + "</g></g>";
  var cards = card("k1", c1) + card("k2", toy) + card("k3", c3);

  // ================= B: phòng ngủ =================
  var S = CP.wob(api, "S", { khongMu: true });
  var rock = '<g id="rk">' + D.paper(D.rEll(0, 0, 54, 40, 2, 851), "#9C948C", { stroke: true, sw: 4 }) + '<g id="rkE"><circle cx="-16" cy="-6" r="9" fill="#fffdf6" stroke="' + INK + '" stroke-width="3"/><circle cx="16" cy="-6" r="9" fill="#fffdf6" stroke="' + INK + '" stroke-width="3"/><circle cx="-14" cy="-4" r="4" fill="' + INK + '"/><circle cx="18" cy="-4" r="4" fill="' + INK + '"/></g>' +
    '<g id="rkL" opacity="0">' + D.line("M -26 -6 C -20 0 -10 0 -6 -6 M 6 -6 C 10 0 20 0 26 -6", 4) + "</g></g>";
  var rb = '<rect width="1920" height="1080" fill="#DDB48A"/>';
  for (var ra = 0; ra < 8; ra++) rb += D.line("M " + (ra * 280 - 100) + " 1000 C " + (ra * 280) + " 700 " + (ra * 280 + 60) + " 400 " + (ra * 280 + 140) + " 150", 3, "#B88E66", ' opacity="0.55"');
  rb += '<path d="M -20 260 C 500 20 1420 20 1940 260 L 1940 -20 L -20 -20 Z" fill="#F3EAD8" stroke="' + INK + '" stroke-width="5"/>';
  rb += D.paper(D.rRect(-20, 860, 1960, 260, 2, 871), "#B98A60", { shadow: false, half: 0.12 }) + D.line("M -20 862 L 1940 862", 4, INK, ' opacity="0.6"');
  rb += '<circle cx="1480" cy="560" r="300" fill="url(#cpDen)"/>';
  // giường: đầu giường gỗ, nệm kem, gối
  rb += D.paper(D.rRect(560, 470, 50, 400, 1.5, 872), "#8F6A45", { stroke: true, sw: 5 }) + D.paper(D.rRect(560, 540, 160, 120, 2, 873), "#A77B4E", { stroke: true, sw: 5, shadow: false });
  rb += D.paper(D.rRect(600, 700, 820, 90, 2, 874), "#F6EEDC", { stroke: true, sw: 5, half: 0.08 }) + D.paper(D.rRect(590, 780, 840, 40, 2, 875), "#8F6A45", { stroke: true, sw: 5, shadow: false });
  rb += D.line("M 620 820 L 620 862 M 1400 820 L 1400 862", 10, "#6B4E33");
  rb += D.paper(D.rRect(640, 650, 190, 60, 3, 876), "#FFFFFF", { stroke: true, sw: 4, shadow: false });
  // bàn đầu giường + đèn
  rb += D.paper(D.rRect(1440, 740, 130, 122, 2, 877), "#A77B4E", { stroke: true, sw: 5 }) + D.line("M 1530 740 L 1530 620", 6, "#6B4E33") + D.paper("M 1495 620 L 1565 620 L 1550 570 L 1510 570 Z", "#E3C27A", { stroke: true, sw: 4, shadow: false });
  var roomB = '<g id="roomB"><g id="roomBz">' + rb + at(590, 500, '<g transform="rotate(-10)">' + CP.hatProp("hatB", 0.6) + "</g>") + S.svg + at(1475, 712, '<g transform="scale(0.6)">' + rock + "</g>") + "</g></g>";

  // ================= C: cận sổ =================
  var pg = D.paper(D.rRect(-700, -400, 1400, 800, 3, 861), "#F8F0DC", { stroke: true, sw: 6, sx: 16, sy: 20 });
  for (var y = -300; y < 380; y += 90) pg += D.line("M -620 " + y + " L 640 " + y, 3, "#9DB7C2", ' opacity="0.45"');
  pg += '<g transform="rotate(-2)">' + D.txt(0, -110, data.chu_tren_do_vat[0], 72, { w: 600 }) + "</g>";
  pg += '<g transform="translate(-380,-130)"><g id="strike">' + D.line("M 0 0 C 200 -10 500 8 760 -4", 12, "#C9463A") + "</g></g>";
  pg += '<clipPath id="l2c"><rect id="l2r" x="-560" y="40" width="1120" height="140"/></clipPath><g clip-path="url(#l2c)">' + D.txt(0, 140, data.chu_tren_do_vat[1], 80, { w: 900 }) + "</g>";
  pg += '<g id="pen">' + D.line('M 300 -360 C 520 -420 760 -300 1500 -260', 26, INK) + D.pencil(460, { goc: -50 }) + '<circle cx="300" cy="-360" r="30" fill="' + INK + '"/>' + "</g>";
  var noteC = '<g id="noteC"><rect width="1920" height="1080" fill="#6E5440"/><g transform="translate(960,560)"><g id="noteCz">' + pg + "</g></g></g>";

  api.dat(CP.defs() + '<rect width="1920" height="1080" fill="#3A2F28"/>' + api.lop("giua", mid, 1, { mat: Y }) + api.lop("gan", gan, 1.4, { mat: 1080 }) + cards + roomB + noteC);
  api.noi({ vaoDai: 0.55 });
  api.sfx("whoosh", 0, 0.4);

  // ---- camera hành lang ----
  api.camera([
    [0, 500, 640, 1.35], [tBook + 0.8, 520, 650, 1.4, "sine.inOut"],
    [tWalk + 0.2, 700, 640, 1.25, "power2.inOut"],
    [tShape + 0.4, 1350, 650, 1.3, "power1.inOut"],     // theo Wob xuống hành lang
    [tWalls - 0.1, 1420, 640, 1.25, "sine.inOut"],
    [tCeil + 0.3, 1520, 120, 1.15, "power2.inOut"],      // lia theo vách lên trần vòm
    [DUR, 1540, 110, 1.18, "sine.inOut"]
  ]);
  // ---- chìa khoá rơi vào tay ----
  W.set(0, { x: 420, y: Y, size: 0.7, sy: 0.86, sx: 1.1, lashes: 0, ice: 0, aLu: 24, aLf: -4, aRu: -24, aRf: 4, lid: 26, op: 1 });
  W.mouth(0, "wobbly");
  W.idle(0.5, tWalk - 0.2, { seed: 181, bien: 1 });
  W.pose(tBook - 0.6, 0.3, { aRu: -70, aRf: -30, pupX: 10, pupY: -12 }, "power2.out");
  var hk = W.hand("R", tBook);
  api.origin("#keyF", "0 0");
  api.set("#keyF", 0, { x: hk.x, y: -200 });
  api.key("#keyF", "y", tBook - 0.6, -200, "none"); api.key("#keyF", "y", tBook, hk.y - 20, "power2.in");
  api.show("#keyF", 0, 1); api.show("#keyF", tBook + 0.02, 0);
  api.show("#keyH", 0, 0); api.show("#keyH", tBook + 0.02, 1);
  api.sfx("ting", tBook, 0.45);
  W.pose(tBook + 0.05, 0.12, { aRf: -10 }, "power2.out"); W.pose(tBook + 0.2, 0.3, { aRf: -30 }, "back.out(2)");
  W.mouth(tBook + 0.1, "smirk");
  // ---- đi xuống hành lang, bật tròn ----
  W.pose(tWalk - 0.3, 0.3, { aRu: -24, aRf: 4, lid: 14, pupX: 10, pupY: 0 }, "power2.inOut");
  W.walk(tWalk, tShape - 0.05, 420, 1350, { step: 0.32 });
  W.pose(tShape - 0.05, 0.08, { sy: 0.8, sx: 1.18 }, "power2.in");
  W.pose(tShape + 0.03, 0.45, { sy: 1, sx: 1, lid: 0, eye: 1.15 }, "elastic.out(1,0.35)");
  W.mouth(tShape + 0.05, "grin");
  api.sfx("boing", tShape, 0.6);
  // mũ nhảy lóc cóc theo sau rồi lên đầu
  api.origin("#hatH", "0 0");
  var hx0 = -40, hx1 = 1350, th0 = tWalk + 0.4, th1 = tShape + 0.6;
  api.set("#hatH", 0, { x: hx0, y: Y - 14 });
  api.key("#hatH", "x", th0, hx0, "none"); api.key("#hatH", "x", th1, hx1 - 90, "sine.inOut");
  for (var h = 0, tt = th0; tt < th1 - 0.2; tt += 0.3, h++) { api.key("#hatH", "y", tt, Y - 14, "power2.in"); api.key("#hatH", "y", tt + 0.15, Y - 74, "power2.out"); }
  api.key("#hatH", "y", th1 - 0.05, Y - 14, "power2.in");
  var tOn = tShape + 1.0;
  api.key("#hatH", "x", tOn, hx1 - 90, "none"); api.key("#hatH", "y", tOn, Y - 14, "none");
  api.key("#hatH", "x", tOn + 0.35, hx1, "power1.out"); api.key("#hatH", "y", tOn + 0.2, Y - 330, "power2.out"); api.key("#hatH", "y", tOn + 0.35, Y - 255, "power2.in");
  api.show("#hatH", 0, 1); api.show("#hatH", tOn + 0.36, 0); api.show("#W-mu", tOn + 0.36, 1);
  W.pose(tOn + 0.36, 0.1, { sy: 0.92 }, "power2.out"); W.pose(tOn + 0.46, 0.3, { sy: 1 }, "back.out(3)");
  api.sfx("pop", tOn + 0.36, 0.45);
  W.pose(tShape + 0.4, 0.3, { pupX: -12, pupY: 4 }, "power2.out");          // nhìn lại cái mũ
  W.pose(tWalls - 0.2, 0.4, { pupX: 6, pupY: -14, upRot: -4 }, "power2.inOut"); // ngước nhìn trần
  W.idle(tOn + 0.8, tNo1, { seed: 182, bien: 1.2 });
  W.autoBlink(tOn + 0.8, tNo1, 183);
  W.mouth(tWalls + 0.4, "o");

  // ---- ba ô "No" ----
  [["#k1", tA1, tA2], ["#k2", tA2, tA3], ["#k3", tA3, tB]].forEach(function (k, i) {
    api.show(k[0], 0, 0); api.show(k[0], k[1], 1); api.show(k[0], k[2], 0);
    api.origin(k[0] + "z", "0 0");
    api.key(k[0] + "z", "scale", 0, 0.9); api.key(k[0] + "z", "scale", k[1], 0.9, "none"); api.key(k[0] + "z", "scale", k[1] + 0.18, 1, "back.out(2)"); api.key(k[0] + "z", "scale", k[2], 1.04, "sine.out");
  });
  api.sfx("whoosh", tA1, 0.25);
  // xoá cửa sổ phấn
  api.origin("#eras", "0 0");
  api.key("#eras", "scaleX", 0, 0.001); api.key("#eras", "scaleX", tA1 + 0.3, 0.001, "none"); api.key("#eras", "scaleX", tA2 - 0.15, 1, "power1.inOut");
  api.key("#erBlk", "x", 0, -300); api.key("#erBlk", "x", tA1 + 0.3, -300, "none"); api.key("#erBlk", "x", tA2 - 0.15, 300, "power1.inOut");
  api.key("#erBlk", "y", 0, -60);
  for (var e = 0, te = tA1 + 0.3; te < tA2 - 0.15; te += 0.12, e++) api.key("#erBlk", "y", te, e % 2 ? 60 : -80, "sine.inOut");
  api.sfx("xuoc-dia", tA1 + 0.3, 0.4);
  // tia nắng, cửa sập
  api.origin("#dr3", "0 0");
  api.key("#dr3", "x", 0, -300); api.key("#dr3", "x", tA3 + 0.55, -300, "none"); api.key("#dr3", "x", tA3 + 0.7, 0, "power3.in");
  api.key("#ray", "opacity", 0, 0.85); api.key("#ray", "opacity", tA3 + 0.62, 0.85, "none"); api.key("#ray", "opacity", tA3 + 0.7, 0, "power2.in");
  api.sfx("bonk", tA3 + 0.7, 0.6);
  api.shake(tA3 + 0.7, 8, 7);

  // ---- B: phòng ngủ ----
  api.show("#roomB", 0, 0); api.show("#roomB", tB, 1); api.show("#roomB", tC, 0);
  api.origin("#roomBz", "960 700");
  api.key("#roomBz", "scale", 0, 1.02); api.key("#roomBz", "scale", tB, 1.02, "none"); api.key("#roomBz", "scale", tC, 1.12, "sine.inOut");
  S.set(0, { x: 1290, y: 622, size: 0.6, lean: -90, lid: 62, lashes: 0, ice: 0, aLu: 30, aLf: -50, aRu: -30, aRf: 50, op: 1 });
  S.mouth(0, "X");
  S.breathe(tB, tC, 1.8);
  api.origin("#rkL", "0 0");
  api.show("#rkE", 0, 1); api.show("#rkE", tRock2 - 0.1, 0); api.show("#rkL", 0, 0); api.key("#rkL", "opacity", tRock2 - 0.1, 1, "step");
  api.origin("#rk", "0 0"); api.key("#rk", "rotation", 0, 0); api.key("#rk", "rotation", tRock2 - 0.1, 0, "none"); api.key("#rk", "rotation", tRock2 + 0.4, -8, "sine.inOut");
  api.sfx("im-lang", tB, 0.2);

  // ---- C: sổ ----
  api.show("#noteC", 0, 0); api.show("#noteC", tC, 1);
  api.origin("#noteCz", "0 0");
  api.key("#noteCz", "scale", 0, 0.95); api.key("#noteCz", "scale", tC, 0.95, "none"); api.key("#noteCz", "scale", DUR, 1.08, "sine.inOut");
  api.origin("#strike", "0 0");
  api.key("#strike", "scaleX", 0, 0.001); api.key("#strike", "scaleX", tCross - 0.1, 0.001, "none"); api.key("#strike", "scaleX", tCross + 0.55, 1, "power1.inOut");
  api.origin("#l2r", "-560 0");
  api.key("#l2r", "scaleX", 0, 0.001); api.key("#l2r", "scaleX", tWas - 0.25, 0.001, "none"); api.key("#l2r", "scaleX", tAll + 0.4, 1, "power1.inOut");
  // bút chì theo nét
  api.set("#pen", 0, { x: 420, y: 260 });
  api.key("#pen", "x", tCross - 0.4, 420, "none"); api.key("#pen", "y", tCross - 0.4, 260, "none");
  api.key("#pen", "x", tCross - 0.1, -380, "power2.inOut"); api.key("#pen", "y", tCross - 0.1, -130, "power2.inOut");
  api.key("#pen", "x", tCross + 0.55, 380, "power1.inOut"); api.key("#pen", "y", tCross + 0.55, -134, "power1.inOut");
  api.key("#pen", "x", tWas - 0.25, -540, "power2.inOut"); api.key("#pen", "y", tWas - 0.25, 130, "power2.inOut");
  api.key("#pen", "x", tAll + 0.4, 560, "power1.inOut");
  for (var w = 0, tw = tWas - 0.2; tw < tAll + 0.4; tw += 0.14, w++) api.key("#pen", "y", tw, w % 2 ? 110 : 145, "sine.inOut");
  api.key("#pen", "x", tAll + 1.0, 420, "power2.out"); api.key("#pen", "y", tAll + 1.0, 240, "power2.out");
  api.sfx("xuoc-dia", tCross, 0.45); api.sfx("xuoc-dia", tWas - 0.1, 0.4); api.sfx("xuoc-dia", tWas + 0.6, 0.35);
};
