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

/* Đoạn d20 · cắt giấy · nửa đầu tông cũ (lịch sử, không gag): thợ mỏ dạng bóng chung vác cuốc từ miệng giếng có tời sang đào cửa hầm
   bên cạnh, cùng một cái cuốc. Nửa sau màu hiện tại: xe hút đất gầm, ống lớn cắm xuống đất, tờ giấy phép kẹp trên kính (cận PERMIT ≥ 40 px);
   Wob giữ mũ nhưng máy hút ăn luôn cái mũ, mũ bay vòng rồi rơi bịch xuống đỉnh đống đất. Cuối: mặt cắt hai hầm giống hệt nhau,
   một bên lật thẻ thêm giường, đèn bàn. Vào "cat", ra "chen". Chữ duy nhất: PERMIT. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = CP.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var Y = 900;
  var tState = T("state", 0, 0.56), tMiners = T("miners", 0, 2.5), tDig = T("digging", 0, 3.88), tFind = T("find.", 0, 5.84), tCouncil = T("council", 0, 7.1);
  var tPermit = T("permit", 0, 8.49), tBlower = T("blower,", 0, 9.18), tVac = T("vacuums", 0, 10.53), tOne = T("one", 0, 12.54), tPermit2 = T("permit", 1, 12.76);
  var tMining = T("mining", 0, 13.51), tHome = T("home.", 0, 14.75), tMine = T("mine", 0, 15.55), tBed = T("bedroom,", 0, 16.15), tFurn = T("furniture.", 0, 19.44);
  var tX = tMine - 0.2;  // cắt sang mặt cắt

  // ---------- lớp xa ----------
  var xa = CP.mesas(-1200, 6000, 770, 61, "#E0B494") + CP.ground(-1400, 6200, 780, "#E6C6A2", 62);
  var r = D.rng(31);
  for (var i = 0; i < 30; i++) xa += at(CP.f1(2000 + i * 150 + r() * 60), 800, '<g transform="scale(' + CP.f1(0.35 + r() * 0.2) + ')">' + CP.mound(220, 130, 700 + i) + "</g>");
  // ---------- lớp giữa ----------
  var mid = CP.ground(-1500, 6500, Y - 10, CP.CAT, 63);
  // cảnh cũ: giếng có tời, cửa hầm nhỏ có ống khói
  mid += at(420, Y - 6, CP.winch("", 1));
  mid += at(760, Y - 6, CP.hill("oh", 620, 230, 64, { doors: [[230, 100, 160]], pipes: [470] }));
  mid += at(560, Y - 8, '<g id="spoil">' + CP.mound(160, 70, 65) + "</g>");
  mid += '<g id="mnr">' + CP.person("mr", { mau: "#54473C", cuoc: true }) + "</g>";
  // giường kê vào hố vừa đào (gag), Wob đứng mép cảnh cũ
  mid += '<g id="bedO">' + D.paper(D.rRect(-70, -46, 140, 26, 1.5, 771), "#F6EEDC", { stroke: true, sw: 4 }) + D.paper(D.rRect(-74, -22, 148, 14, 1, 772), "#8F6A45", { stroke: true, sw: 3, shadow: false }) +
    D.line("M -66 -8 L -66 0 M 66 -8 L 66 0", 6, "#6B4E33") + D.paper(D.rRect(-66, -60, 40, 18, 1, 773), "#FFFFFF", { stroke: true, sw: 3, shadow: false }) + "</g>";
  var V = CP.wob(api, "V", {});
  mid += V.svg;
  // cảnh hiện tại
  [[2350, 380, 230], [3700, 420, 260], [4150, 340, 210]].forEach(function (d, k) { mid += at(d[0], Y - 8, CP.mound(d[1], d[2], 720 + k)); });
  var MX = 3700, MTOP = Y - 8 - 250;
  // xe hút đất
  var tr = '<g id="truck">';
  tr += D.paper(D.rRect(-60, -320, 470, 210, 3, 731), "#E0B84E", { stroke: true, sw: 6, half: 0.15 });
  tr += D.line("M 0 -290 L 0 -130 M 120 -290 L 120 -130 M 240 -290 L 240 -130", 4, "#B8923A");
  tr += D.paper("M -330 -60 L -330 -230 C -330 -280 -300 -310 -250 -310 L -60 -310 L -60 -60 Z", "#3F6A70", { stroke: true, sw: 6, half: 0.15 });
  tr += '<path d="M -300 -190 L -300 -240 C -300 -270 -280 -286 -250 -286 L -90 -286 L -90 -190 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="5"/>';
  tr += '<g id="pm" transform="translate(-196,-238) rotate(-3)">' + D.paper(D.rRect(-62, -26, 124, 54, 1, 732), "#FFFDF2", { stroke: true, sw: 3, shadow: false }) + D.txt(0, 10, data.chu_tren_do_vat[0], 28, { w: 900 }) +
    '<rect x="-14" y="-34" width="28" height="12" rx="3" fill="#9AA3A6" stroke="' + INK + '" stroke-width="2"/></g>';
  tr += D.paper(D.rRect(-340, -110, 770, 50, 2, 733), "#40494C", { stroke: true, sw: 5, shadow: false });
  [-230, 130, 320].forEach(function (x, k) { tr += '<g transform="translate(' + x + ',-40)"><g id="wh' + k + '"><circle r="52" fill="#2a2f31" stroke="' + INK + '" stroke-width="5"/><circle r="20" fill="#9aa5a8" stroke="' + INK + '" stroke-width="4"/>' + D.line("M -14 0 L 14 0", 4, INK) + "</g></g>"; });
  // ống hút lớn từ nóc bồn cắm xuống đất
  tr += '<path d="M 300 -320 C 300 -470 640 -470 640 -200 L 640 30" fill="none" stroke="' + INK + '" stroke-width="46" stroke-linecap="round"/>' +
    '<path d="M 300 -320 C 300 -470 640 -470 640 -200 L 640 30" fill="none" stroke="#6F7A7E" stroke-width="36" stroke-linecap="round"/>';
  for (var q = 0; q < 6; q++) tr += D.line("M 622 " + (-180 + q * 36) + " L 658 " + (-180 + q * 36), 3, "#4A5356");
  tr += '<ellipse cx="640" cy="34" rx="60" ry="14" fill="#2A2522" stroke="' + INK + '" stroke-width="4"/>';
  tr += '<g id="exh">' + D.paper(D.rRect(380, -380, 34, 70, 1, 734), "#9AA3A6", { stroke: true, sw: 4, shadow: false }) + "</g>";
  tr += "</g>";
  mid += at(3000, Y - 4, tr);
  mid += api.khoi("kh", 3000 + 397, Y - 4 - 385, { cao: 160, rong: 16, lech: -40, toc: 0.8, mo: 0.7 });
  mid += CP.hatProp("hatF", 0.7);
  var W = CP.wob(api, "W", {});
  mid += W.svg;
  // ---------- mặt cắt hai hầm (thẻ) ----------
  function tunnel(inner) {
    return '<path d="M -230 160 L -230 -60 C -230 -170 230 -170 230 -60 L 230 160 Z" fill="#3B2F28" stroke="' + INK + '" stroke-width="6"/>' + '<rect x="-230" y="150" width="460" height="14" fill="#5A4636"/>' + (inner || "");
  }
  var furn = D.paper(D.rRect(-170, 60, 230, 60, 2, 751), "#F6EEDC", { stroke: true, sw: 4 }) + D.paper(D.rRect(-170, 40, 70, 34, 2, 752), "#FFFFFF", { stroke: true, sw: 3, shadow: false }) +
    D.paper(D.rRect(-178, 110, 246, 40, 2, 753), "#A77B4E", { stroke: true, sw: 4, shadow: false }) +
    '<circle cx="140" cy="0" r="90" fill="url(#cpDen)"/>' + D.line("M 140 30 L 140 150 M 110 150 L 170 150", 6, "#6B4E33") + D.paper("M 110 30 L 170 30 L 158 -10 L 122 -10 Z", "#E3C27A", { stroke: true, sw: 4, shadow: false });
  var xs = '<g id="xs"><rect width="1920" height="1080" fill="#C98B66"/>' +
    D.paper(D.rRect(-40, 0, 2000, 230, 3, 761), "#E8CFAE", { shadow: false, half: 0.1 }) + '<rect width="1920" height="120" fill="url(#cpSky)"/>' + D.line("M 0 230 L 1920 230", 5) +
    D.paper(D.rRect(-40, 760, 2000, 400, 3, 762), "#B97A5A", { shadow: false, half: 0.12 }) +
    '<g transform="translate(560,560)">' + tunnel() + "</g>" +
    '<g transform="translate(1360,560)"><g id="flip"><g id="fA">' + tunnel() + '</g><g id="fB">' + tunnel(furn) + "</g></g></g>" +
    D.line("M 560 410 L 560 230 M 1360 410 L 1360 230", 14, "#3B2F28") + "</g>";

  var sep = api.locSepia("sep", [[0, 1], [tCouncil - 0.6, 1], [tCouncil + 0.4, 0], [DUR, 0]]);
  api.dat(CP.defs() + "<defs>" + sep + "</defs>" + '<g filter="url(#sep)"><rect width="1920" height="1080" fill="url(#cpSky)"/>' + CP.sun(1560, 170, 70) +
    api.lop("xa", xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: Y }) + "</g>" + xs);
  api.noi({});

  // ---------- camera ----------
  api.camera([
    [0, 640, 640, 1.25], [tMiners, 660, 650, 1.32, "sine.inOut"],
    [tFind, 680, 660, 1.3, "sine.inOut"],
    [tCouncil + 0.3, 3150, 650, 1.0, "power3.inOut"],      // lướt sang hiện tại
    [tVac, 3250, 640, 1.06, "sine.inOut"],
    [tPermit2 - 0.35, 2810, 665, 2.5, "power2.inOut"],     // cận giấy phép
    [tMining - 0.1, 2815, 666, 2.6, "sine.inOut"],
    [tMining + 0.5, 3200, 620, 0.95, "power2.inOut"],      // lùi ra: mũ bay
    [tX, 3300, 620, 0.98, "sine.inOut"]
  ]);

  // ---------- nửa đầu: thợ mỏ cùng một cái cuốc ----------
  api.origin("#mnr", "0 0"); api.origin("#mr-cuoc", "0 -130");
  api.set("#mnr", 0, { x: 470, y: Y - 4 });
  api.key("#mnr", "x", tMiners - 0.4, 470, "none"); api.key("#mnr", "x", tDig - 0.1, 900, "sine.inOut");
  for (var b = 0, tb = tMiners - 0.4; tb < tDig - 0.1; tb += 0.3, b++) api.key("#mnr", "y", tb, Y - 4 - (b % 2 ? 0 : 7), "sine.inOut");
  api.key("#mnr", "y", tDig - 0.1, Y - 4, "sine.out");
  for (var c = 0, tc = tDig; tc < tCouncil; tc += 0.55, c++) {
    api.key("#mr-cuoc", "rotation", tc, -40, "power2.out"); api.key("#mr-cuoc", "rotation", tc + 0.3, 30, "power3.in");
    if (c < 5) api.sfx("bonk", tc + 0.3, 0.3);
  }
  api.origin("#spoil", "0 0"); api.key("#spoil", "scale", 0, 0.5); api.key("#spoil", "scale", tCouncil, 1.1, "sine.inOut");

  // giường trượt vào cửa hầm, Wob gật gù
  api.origin("#bedO", "0 0");
  var tBd = tFind - 1.5;
  api.origin("#oh-door0", "0 0"); api.key("#oh-door0", "scaleX", 0, 1); api.key("#oh-door0", "scaleX", tBd, 1, "none"); api.key("#oh-door0", "scaleX", tBd + 0.3, 0.2, "power2.out");
  api.set("#bedO", 0, { x: 700, y: Y - 4, opacity: 0 }); api.show("#bedO", tBd, 1);
  api.key("#bedO", "x", tBd, 700, "none"); api.key("#bedO", "x", tBd + 0.9, 1040, "power2.inOut");
  api.key("#bedO", "y", tBd + 0.3, Y - 14, "sine.inOut"); api.key("#bedO", "y", tBd + 0.9, Y - 4, "sine.inOut");
  api.key("#mnr", "x", tBd, 900, "none"); api.key("#mnr", "x", tBd + 0.9, 940, "power2.inOut");
  api.sfx("whoosh", tBd + 0.1, 0.25); api.sfx("bonk", tBd + 0.9, 0.3);
  V.set(0, { x: 250, y: Y, size: 0.62, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 12, op: 1 });
  V.mouth(0, "X");
  V.idle(0, tBd, { seed: 211, bien: 1.2 });
  V.autoBlink(0.3, tCouncil, 212);
  V.pose(tBd + 0.2, 0.3, { pupX: 14, pupY: 4, eye: 1.12 }, "power2.out");
  V.pose(tBd + 1.0, 0.15, { upRot: 8 }, "power2.inOut"); V.pose(tBd + 1.2, 0.15, { upRot: -2 }, "power2.inOut");
  V.pose(tBd + 1.4, 0.15, { upRot: 8 }, "power2.inOut"); V.pose(tBd + 1.6, 0.2, { upRot: 0, eye: 1 }, "power2.inOut");
  V.mouth(tBd + 1.0, "smirk");

  // ---------- nửa sau: xe hút ----------
  var tRoar = tCouncil + 0.2;
  for (var k = 0, tk = tRoar; tk < tX; tk += 0.07, k++) api.key("#truck", "y", tk, k % 2 ? -2 : 2, "none");
  api.set("#truck", 0, { y: 0 });
  ["#wh0", "#wh1", "#wh2"].forEach(function (s) { api.origin(s, "0 0"); });
  api.sfx("may-no", tRoar, 0.55); api.sfx("may-no", tRoar + 3.5, 0.45);
  api.sfx("whoosh", tVac, 0.35);
  // Wob
  W.set(0, { x: 2470, y: Y, size: 0.7, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, op: 1 });
  W.mouth(0, "smirk");
  W.idle(tCouncil, tVac, { seed: 201, bien: 1.4 });
  W.pose(tPermit - 0.3, 0.3, { pupX: 14, pupY: -4 }, "power2.out");
  W.pose(tVac - 0.2, 0.3, { pupX: 14, pupY: 10, eye: 1.15 }, "back.out(2)");   // nhìn ống hút
  W.mouth(tVac, "o");
  // giữ mũ – mũ bị hút
  var tGrab = tMining - 0.2, tSuck = tMining + 0.4;
  W.pose(tGrab, 0.25, { aLu: 160, aLf: 20, lean: 6 }, "power2.out");
  W.pose(tGrab + 0.25, 0.4, { lean: 14, sx: 0.94, sy: 1.06 }, "sine.inOut");
  api.show("#W-mu", tSuck, 0);
  api.origin("#hatF", "0 0");
  var hx = 2470, hy = Y - 255;
  api.set("#hatF", 0, { x: hx, y: hy, opacity: 0 }); api.show("#hatF", tSuck, 1);
  api.key("#hatF", "x", tSuck, hx, "none"); api.key("#hatF", "y", tSuck, hy, "none"); api.key("#hatF", "rotation", tSuck, 0, "none");
  api.key("#hatF", "x", tSuck + 0.35, 3300, "power2.in"); api.key("#hatF", "y", tSuck + 0.35, Y - 4 - 440, "power2.in"); api.key("#hatF", "rotation", tSuck + 0.35, 200, "power2.in");
  api.key("#hatF", "x", tSuck + 1.0, MX - 100, "sine.out"); api.key("#hatF", "y", tSuck + 0.75, Y - 900, "power2.out"); api.key("#hatF", "rotation", tSuck + 1.0, 560, "sine.out");
  api.key("#hatF", "x", tSuck + 1.5, MX, "power1.in"); api.key("#hatF", "y", tSuck + 1.5, MTOP + 6, "power2.in"); api.key("#hatF", "rotation", tSuck + 1.5, 720, "power2.in");
  api.sfx("whoosh", tSuck, 0.5); api.sfx("bonk", tSuck + 1.5, 0.6);
  W.pose(tSuck + 0.05, 0.12, { sx: 1.08, sy: 0.92, lean: 0, aLu: 18, aLf: -10 }, "power2.out");
  W.pose(tSuck + 0.25, 0.3, { sx: 1, sy: 1 }, "back.out(2)");
  W.mouth(tSuck, "D");
  W.pose(tSuck + 0.3, 0.6, { pupX: 10, pupY: -16 }, "sine.inOut");
  W.pose(tSuck + 1.4, 0.3, { pupX: 14, pupY: 0, lid: 24 }, "power2.out");
  W.mouth(tSuck + 1.6, "flat");
  W.idle(tSuck + 1.6, tX, { seed: 202, bien: 1 });
  W.autoBlink(tCouncil + 0.5, tGrab - 0.3, 203);

  // ---------- mặt cắt hai hầm ----------
  api.show("#xs", 0, 0); api.show("#xs", tX, 1);
  api.origin("#xs", "960 560"); api.key("#xs", "scale", 0, 1); api.key("#xs", "scale", tX, 1, "none"); api.key("#xs", "scale", DUR, 1.08, "sine.inOut");
  api.origin("#flip", "0 0");
  api.key("#flip", "scaleX", 0, 1); api.key("#flip", "scaleX", tBed - 0.25, 1, "none"); api.key("#flip", "scaleX", tBed, 0.02, "power2.in"); api.key("#flip", "scaleX", tBed + 0.25, 1, "back.out(1.6)");
  api.show("#fA", 0, 1); api.show("#fA", tBed, 0); api.show("#fB", 0, 0); api.show("#fB", tBed, 1);
  api.sfx("whoosh", tBed - 0.2, 0.35);
};
