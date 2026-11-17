/* Đạo cụ, bối cảnh, hiệu ứng vẽ cùng nét mực – tái dùng được cho các tập sau.
 * Mỗi hàm nhận o = {x, y, s, rot, ...} và trả chuỗi SVG; toạ độ gốc ghi ở đầu mỗi hàm. Không ảnh, không chữ ngoài đồ vật.
 */
(function () {
  var B = window.WWB, C = B.C, f = B.f, INK = C.ink;
  function wrap(o, inner) { return B.g(B.tr(o.x || 0, o.y || 0, o.s == null ? 1 : o.s, o.rot || 0, o.sx), inner); }

  // ---------- cá đông cứng: tâm (0,0), dài ~340, đầu bên phải. bend > 0 = mềm oặt, hai đầu rủ xuống ----------
  B.fish = function (o) {
    var bend = o.bend || 0, top = [], bot = [], N = 14;
    var cl = function (u) { return bend * 70 * u * u; };
    var th = function (u) { return 50 * Math.pow(Math.max(0, 1 - u * u), 0.55) * (u < 0 ? 0.55 + 0.45 * (1 + u) : 1) + 6; };
    for (var i = 0; i <= N; i++) {
      var u = -0.86 + (1.86 * i) / N, x = 150 * u, y = cl(u), h = th(u);
      top.push([x, y - h]); bot.unshift([x, y + h * 0.9]);
    }
    var body = B.smooth(top.concat([[154, cl(1) + 2]]).concat(bot), true);
    var ty = cl(-0.86), ang = Math.atan(2 * bend * 70 * -0.86 / 150) * 180 / Math.PI;
    var col = o.thaw ? C.fishThaw : C.fishFrozen, out = [];
    // đuôi
    out.push(B.g("translate(-129 " + f(ty) + ") rotate(" + f(-ang * 0.9) + ")",
      B.shape("M 4 0 L -54 -44 C -44 -16 -44 16 -54 44 Z", col, { sw: 6 })));
    // vây lưng
    out.push(B.shape("M -40 " + f(cl(-0.27) - 50) + " L -6 " + f(cl(-0.04) - 86) + " L 30 " + f(cl(0.2) - 50) + " Z", col, { sw: 5 }));
    out.push(B.shape(body, col, { sw: 6 }));
    // bụng sáng
    out.push(B.line("M -100 " + f(cl(-0.66) + 22) + " Q 0 " + f(cl(0) + 48) + " 110 " + f(cl(0.73) + 24), 10, C.fishBelly, 0.85));
    // mang, vảy gợi ý
    out.push(B.line("M 78 " + f(cl(0.52) - 34) + " Q 64 " + f(cl(0.43)) + " 80 " + f(cl(0.53) + 36), 5));
    [-60, -20, 20].forEach(function (x) { out.push(B.line("M " + x + " " + f(cl(x / 150) - 10) + " q 12 10 0 20", 3, INK, 0.45)); });
    // mắt
    var ex = 112, ey = cl(0.75) - 14;
    if (o.eye === "serene") {
      out.push(B.ell(ex, ey, 15, 15, "#fffdf6", 4.5));
      out.push('<path d="M ' + (ex - 15) + " " + f(ey + 1) + " A 15 15 0 0 1 " + (ex + 15) + " " + f(ey + 1) + ' Z" fill="' + col + '" stroke="' + INK + '" stroke-width="4.5"/>');
      out.push(B.line("M " + (ex - 16) + " " + f(ey + 1) + " L " + (ex + 16) + " " + f(ey + 1), 6));
      out.push(B.line("M 128 " + f(cl(0.86) + 10) + " Q 138 " + f(cl(0.9) + 18) + " 150 " + f(cl(1) + 8), 5)); // mỉm cười
    } else if (o.eye === "limp") {
      out.push(B.ell(ex, ey, 14, 14, "#fffdf6", 4.5));
      out.push('<path d="M ' + (ex - 14) + " " + f(ey + 3) + " A 14 14 0 0 1 " + (ex + 14) + " " + f(ey + 3) + ' Z" fill="' + col + '" stroke="' + INK + '" stroke-width="4.5"/>');
      out.push(B.dot(ex + 3, ey + 7, 4));
      out.push(B.line("M 132 " + f(cl(0.9) + 14) + " Q 140 " + f(cl(0.92) + 8) + " 150 " + f(cl(1) + 12), 5));
    } else {
      out.push(B.ell(ex, ey, 15, 15, "#fffdf6", 4.5));
      out.push(B.dot(ex + 2, ey, 6));
      out.push(B.line("M 132 " + f(cl(0.9) + 14) + " L 152 " + f(cl(1) + 10), 5));
    }
    if (o.frost !== false && !o.thaw) {
      out.push('<path d="M -120 ' + f(cl(-0.8) - 18) + " L -90 " + f(cl(-0.6) - 34) + " L -70 " + f(cl(-0.47) - 26) + " L -40 " + f(cl(-0.27) - 44) + " L -40 " + f(cl(-0.27) - 30) + " L -104 " + f(cl(-0.7) - 14) + ' Z" fill="#ffffff" opacity="0.85"/>');
      out.push(B.line("M 40 -38 L 60 -40", 4, "#ffffff", 0.9));
    }
    if (o.thaw) { // bóng ướt, giọt nước
      out.push(B.line("M -60 " + f(cl(-0.4) - 26) + " Q 0 " + f(cl(0) - 40) + " 60 " + f(cl(0.4) - 28), 5, "#ffffff", 0.7));
    }
    return wrap(o, out.join(""));
  };

  // ---------- đèn bàn: gốc (0,0) ở đế trên mặt bàn; ánh đèn chiếu sang phải ----------
  B.lampLight = function (o) {
    return wrap(o, '<path d="M 140 -300 L 236 -250 L 900 0 L -40 0 Z" fill="' + C.lampLight + '" opacity="0.38"/>');
  };
  B.lamp = function (o) {
    return wrap(o,
      B.shape("M -80 0 C -80 -26 80 -26 80 0 Z", C.sea, { sw: 6 }) +
      B.line("M 0 -16 L 30 -230", 14) + B.line("M 0 -16 L 30 -230", 6, C.sea) +
      B.line("M 30 -230 L 150 -300", 14) + B.line("M 30 -230 L 150 -300", 6, C.sea) + B.ell(30, -230, 14, 14, C.sea, 5) +
      B.g("translate(160 -296) rotate(32)", B.shape("M -50 -40 L 50 -40 L 96 50 L -96 50 Z", C.accent, { sw: 6 }) + B.ell(0, 52, 34, 12, C.lampLight, 5)));
  };
  // ---------- bàn gỗ: mặt bàn ở y; phủ hết bề ngang ----------
  B.desk = function (y, o) {
    o = o || {};
    var out = B.shape("M -200 " + y + " L 2120 " + y + " L 2120 1400 L -200 1400 Z", C.wood, { sw: 8, ox: 0, oy: 6 });
    out += B.shape("M -200 " + (y + 46) + " L 2120 " + (y + 46) + " L 2120 1400 L -200 1400 Z", C.woodDark, { sw: 6, ox: 0, oy: 4 });
    [[120, 18, 520], [700, 28, 1180], [1300, 14, 1800], [260, 34, 600]].forEach(function (g) {
      out += B.line("M " + g[0] + " " + (y + g[1]) + " C " + (g[0] + 120) + " " + (y + g[1] - 6) + " " + (g[2] - 120) + " " + (y + g[1] + 6) + " " + g[2] + " " + (y + g[1]), 3, C.woodDark, 0.6);
    });
    return out;
  };
  // ---------- hộp kỷ vật mở nắp: gốc góc trái dưới trên mặt bàn, rộng 320 ----------
  B.box = function (o) {
    return wrap(o,
      B.shape("M 10 -150 L 60 -300 L 360 -300 L 310 -150 Z", C.woodDark, { sw: 6 }) + // nắp mở ra sau
      B.shape("M 0 -150 L 320 -150 L 320 -142 L 0 -142 Z", "#3a2a20", { sw: 0 }) +
      B.g("translate(70 -150) rotate(-12)", B.shape("M 0 0 L 0 -110 L 150 -110 L 150 0 Z", C.white, { sw: 5 }) + B.line("M 18 -84 L 120 -84", 4, C.sea, 0.7) + B.line("M 18 -60 L 96 -60", 4, C.sea, 0.7)) +
      B.g("translate(220 -150) rotate(14)", B.shape("M 0 0 L 0 -90 C 20 -110 50 -110 70 -90 L 70 0 Z", C.accent, { sw: 5 })) +
      B.shape("M 0 0 L 320 0 L 320 -150 L 0 -150 Z", C.wood, { sw: 6 }) +
      B.line("M 20 -120 L 300 -120", 3, C.woodDark, 0.6) + B.line("M 20 -60 L 300 -60", 3, C.woodDark, 0.6) +
      B.shape("M 145 -150 L 175 -150 L 175 -112 L 145 -112 Z", "#E8C25A", { sw: 4 }));
  };
  // ---------- sổ đóng nằm trên bàn: gốc giữa đáy ----------
  B.bookClosed = function (o) {
    return wrap(o, B.shape("M -170 0 L 170 0 L 150 -36 L -150 -36 Z", C.sea, { sw: 6 }) + B.line("M 60 -36 L 70 0", 6, C.accent) + B.shape("M -170 0 L 170 0 L 170 10 L -170 10 Z", C.white, { sw: 5 }));
  };

  // ---------- làng vẽ trong sổ (nét bút mảnh): gốc (0,0) ở giữa trang, trang rộng 760 cao 880 ----------
  B.pageVillage = function (o) {
    var out = [], lit = o.lit || 0;
    out.push(B.line("M -340 160 C -200 120 -60 170 60 140 C 180 110 280 150 340 130", 4));
    out.push(B.line("M -340 300 C -120 270 120 300 340 280", 3, INK, 0.5));
    [[-250, 175, 1], [-90, 200, 2], [70, 168, 3]].forEach(function (h) {
      var x = h[0], y = h[1];
      out.push(B.shape("M " + x + " " + y + " L " + x + " " + (y - 70) + " L " + (x + 120) + " " + (y - 70) + " L " + (x + 120) + " " + y + " Z", C.woodLight, { sw: 4, ox: 4, oy: 3 }));
      out.push(B.shape("M " + (x - 16) + " " + (y - 66) + " L " + (x + 60) + " " + (y - 120) + " L " + (x + 136) + " " + (y - 66) + " Z", C.snow, { sw: 4, ox: 3, oy: 2 }));
      out.push(B.shape("M " + (x + 84) + " " + (y - 104) + " L " + (x + 84) + " " + (y - 136) + " L " + (x + 102) + " " + (y - 136) + " L " + (x + 102) + " " + (y - 92) + " Z", C.woodDark, { sw: 4, ox: 2, oy: 2 }));
      out.push(B.line("M " + (x + 93) + " " + (y - 142) + " L " + (x + 93) + " " + (y - 330), 10, "#ffffff", 0.9));
      out.push(B.line("M " + (x + 87) + " " + (y - 142) + " L " + (x + 87) + " " + (y - 330) + " M " + (x + 99) + " " + (y - 142) + " L " + (x + 99) + " " + (y - 330), 2.5, INK, 0.7));
      var on = lit >= h[2];
      out.push(B.shape("M " + (x + 30) + " " + (y - 50) + " L " + (x + 62) + " " + (y - 50) + " L " + (x + 62) + " " + (y - 22) + " L " + (x + 30) + " " + (y - 22) + " Z", on ? C.window : "#d8d0bc", { sw: 3.5, ox: 2, oy: 2 }));
      if (on) out.push(B.line("M " + (x + 46) + " " + (y - 64) + " L " + (x + 46) + " " + (y - 72) + " M " + (x + 70) + " " + (y - 56) + " L " + (x + 78) + " " + (y - 62), 3, C.accent));
    });
    // biển tên làng
    out.push(B.line("M 150 230 L 150 60", 8) + B.line("M 300 230 L 300 60", 8));
    out.push(B.g("rotate(-3 225 0)", B.shape("M 30 -140 L 420 -140 L 420 80 L 30 80 Z", C.white, { sw: 6, ox: 6, oy: 5 }) +
      B.text(225, -52, "OYMYAKON", 54, { w: 900 }) + B.text(225, 44, "pop. ~500", 48, { w: 700, fill: C.sea })));
    return wrap(o, out.join(""));
  };
  // Sổ mở (nhìn từ trên): gốc giữa gáy; page = "village"
  B.bookOpen = function (o) {
    var out = [];
    out.push(B.shape("M -800 -460 L 800 -460 L 800 460 L -800 460 Z", C.sea, { sw: 7, ox: 10, oy: 10 }));
    out.push(B.shape("M -770 -440 L -14 -430 L -14 440 L -770 430 Z", "#FBF6E9", { sw: 5, ox: 3, oy: 3 }));
    out.push(B.shape("M 14 -430 L 770 -440 L 770 430 L 14 440 Z", "#FBF6E9", { sw: 5, ox: 3, oy: 3 }));
    for (var i = 0; i < 12; i++) out.push(B.ell(0, -400 + i * 72, 18, 10, "none", 5));
    // trang trái: phác thảo bông tuyết, cá, mũi tên (không chữ)
    out.push(B.g("translate(-560 -220)", [0, 60, 120].map(function (a) { return B.line("M " + f(-70 * Math.cos(a * Math.PI / 180)) + " " + f(-70 * Math.sin(a * Math.PI / 180)) + " L " + f(70 * Math.cos(a * Math.PI / 180)) + " " + f(70 * Math.sin(a * Math.PI / 180)), 4); }).join("")));
    out.push(B.fish({ x: -420, y: 120, s: 0.75, rot: -6, frost: false }));
    out.push(B.line("M -680 280 C -600 330 -480 330 -380 290", 4) + B.line("M -400 270 L -380 290 L -404 304", 4));
    out.push(B.line("M -300 -320 C -240 -360 -160 -330 -120 -290", 3, INK, 0.5));
    if (o.page === "village") out.push(B.pageVillage({ x: 340, y: 40, lit: o.lit }));
    return wrap(o, out.join(""));
  };
  // Trang đang lật (3 hình): k 0..1
  B.pageFlip = function (o) {
    var k = o.k, w = 760 * Math.cos(k * Math.PI), lift = Math.sin(k * Math.PI) * 120;
    var d = "M 0 -440 C " + f(w * 0.5) + " " + f(-440 - lift) + " " + f(w) + " " + f(-440 - lift * 0.4) + " " + f(w) + " -430 L " + f(w) + " 430 C " + f(w) + " " + f(430 - lift * 0.3) + " " + f(w * 0.5) + " " + f(440 - lift * 0.6) + " 0 440 Z";
    return wrap(o, B.shape(d, "#FFFBF0", { sw: 5, ox: k > 0.5 ? -8 : 8, oy: 6 }));
  };

  // ---------- nhà gỗ: gốc giữa đáy, rộng w (mặc định 420) ----------
  B.house = function (o) {
    var w = o.w || 420, h = o.h || 230, hw = w / 2, out = [], ink = o.faint ? 4 : 6;
    var smokeTop = o.smokeTop == null ? -900 : o.smokeTop;
    // khói thẳng đứng
    if (o.smoke !== false) {
      var cx = hw * 0.45, base = -h - 150, wob = o.t ? Math.sin(Math.round(o.t * 12) * 0.9) * 1.5 : 0;
      var dl = "M " + f(cx - 20) + " " + base + " ", dr = "";
      var ptsL = [], ptsR = [];
      for (var yy = base; yy >= smokeTop; yy -= 60) { var a = Math.sin(yy * 0.03 + (o.seed || 0)) * 4 + wob; ptsL.push([cx - 22 + a, yy]); ptsR.unshift([cx + 22 + a, yy]); }
      out.push(B.shape(B.smooth(ptsL.concat(ptsR), true), "#ffffff", { sw: o.faint ? 2.5 : 3.5, op: 0.92, sop: 0.6 }));
    }
    out.push(B.shape("M " + f(hw * 0.32) + " " + f(-h - 40) + " L " + f(hw * 0.32) + " " + f(-h - 150) + " L " + f(hw * 0.58) + " " + f(-h - 150) + " L " + f(hw * 0.58) + " " + f(-h - 20) + " Z", "#7a4a2a", { sw: ink }));
    out.push(B.shape("M " + (-hw) + " 0 L " + (-hw) + " " + (-h) + " L " + hw + " " + (-h) + " L " + hw + " 0 Z", o.wall || C.woodDark, { sw: ink }));
    for (var y = -h + 34; y < -10; y += 34) out.push(B.line("M " + (-hw + 6) + " " + y + " L " + (hw - 6) + " " + (y + 2), 3, INK, 0.45));
    out.push(B.shape("M " + (-hw - 40) + " " + (-h + 10) + " L 0 " + (-h - 140) + " L " + (hw + 40) + " " + (-h + 10) + " C " + (hw * 0.3) + " " + (-h - 12) + " " + (-hw * 0.3) + " " + (-h - 4) + " " + (-hw - 40) + " " + (-h + 10) + " Z", C.snow, { sw: ink }));
    if (o.window !== false) {
      var wx = o.door ? -hw * 0.62 : -45;
      out.push(B.shape("M " + f(wx) + " -170 L " + f(wx + 90) + " -170 L " + f(wx + 90) + " -90 L " + f(wx) + " -90 Z", C.window, { sw: ink - 1 }));
      out.push(B.line("M " + f(wx + 45) + " -170 L " + f(wx + 45) + " -90 M " + f(wx) + " -130 L " + f(wx + 90) + " -130", 4));
      out.push(B.shape("M " + f(wx - 8) + " -170 L " + f(wx + 98) + " -170 L " + f(wx + 90) + " -184 L " + f(wx) + " -184 Z", C.snow, { sw: 3.5 }));
    }
    if (o.door) {
      var open = o.open || 0, dw = 110 * (1 - open * 0.85);
      out.push(B.shape("M 40 0 L 40 -190 L 150 -190 L 150 0 Z", "#2a2320", { sw: ink }));
      out.push(B.shape("M 40 0 L 40 -190 L " + f(40 + dw) + " " + f(-190 - open * 14) + " L " + f(40 + dw) + " " + f(open * 10) + " Z", "#5c3a22", { sw: ink }));
      out.push(B.dot(40 + dw * 0.85, -95, 6));
    }
    out.push(B.shape("M " + (-hw - 30) + " 4 C " + (-hw + 60) + " -26 " + (hw - 60) + " -22 " + (hw + 30) + " 4 Z", C.snow, { sw: ink - 1 }));
    return wrap(o, out.join(""));
  };
  // ---------- nền phố tuyết: trời, đồi xa, nhà xa, sương băng, tuyết dưới chân (y mặt đất) ----------
  B.sky = function (col) { return '<rect x="-400" y="-400" width="2720" height="1880" fill="' + (col || C.sky) + '" opacity="0.85"/>'; };
  B.ridge = function (y, shift) {
    return B.g("translate(" + f(shift || 0) + " 0)", B.shape("M -400 " + y + " C -100 " + (y - 90) + " 200 " + (y - 30) + " 500 " + (y - 70) + " C 800 " + (y - 110) + " 1100 " + (y - 20) + " 1400 " + (y - 60) + " C 1700 " + (y - 100) + " 2000 " + (y - 40) + " 2400 " + (y - 70) + " L 2400 " + (y + 300) + " L -400 " + (y + 300) + " Z", "#E8F1F5", { sw: 4, sop: 0.5 }));
  };
  B.farHouses = function (y, shift, t) {
    var out = "";
    [[-100, 0.42], [260, 0.36], [620, 0.45], [1040, 0.38], [1420, 0.44], [1820, 0.4]].forEach(function (h, i) {
      out += B.house({ x: h[0] + (shift || 0), y: y, s: h[1], faint: true, smokeTop: -1700, t: t, seed: i, wall: "#a98466", window: i % 2 === 0 });
    });
    return '<g opacity="0.7">' + out + "</g>";
  };
  B.snowGround = function (y, o) {
    o = o || {};
    return B.shape("M -400 " + (y + 10) + " C 0 " + (y - 14) + " 500 " + (y + 16) + " 960 " + y + " C 1400 " + (y - 14) + " 1800 " + (y + 14) + " 2400 " + (y - 4) + " L 2400 1600 L -400 1600 Z", C.snow, { sw: 6, ox: 0, oy: 5 }) +
      B.line("M 200 " + (y + 90) + " C 400 " + (y + 80) + " 600 " + (y + 100) + " 800 " + (y + 92), 4, C.iceDeep, 0.5) +
      B.line("M 1100 " + (y + 160) + " C 1300 " + (y + 150) + " 1500 " + (y + 170) + " 1700 " + (y + 160), 4, C.iceDeep, 0.5);
  };
  B.fog = function (t, y0, n) {
    var out = "";
    for (var i = 0; i < (n || 2); i++) {
      var ph = t * 0.25 * (i % 2 ? 1 : -1) + i * 2, y = y0 + i * 50, pts = [];
      for (var x = -400; x <= 2400; x += 200) pts.push([x, y + Math.sin(x * 0.004 + ph) * 18]);
      var d = B.smooth(pts, false) + " L 2400 " + (y + 70) + " L -400 " + (y + 70) + " Z";
      out += '<path d="' + d + '" fill="#ffffff" opacity="0.35"/>';
    }
    return out;
  };
  /** Bụi kim cương (tinh thể băng lấp lánh trong không khí), nháy theo hình vẽ. */
  B.diamondDust = function (t, n, box) {
    var out = "", step = Math.round(t * 12);
    for (var i = 0; i < n; i++) {
      var x = box[0] + B.hash(i * 3.3) * (box[2] - box[0]), y = box[1] + B.hash(i * 9.1) * (box[3] - box[1]);
      if (B.hash(i * 1.7 + Math.floor(step / 3) * 0.37) < 0.45) out += B.sparkle({ x: x, y: y, s: 0.35 + B.hash(i) * 0.3 });
    }
    return out;
  };

  // ---------- nhiệt kế treo tường: gốc giữa đế, cao ~760; level 0..1 ----------
  B.thermo = function (o) {
    var lv = B.clamp(o.level, 0, 1), top = -660, bot = -150, yLv = bot - (bot - top) * lv, out = [];
    out.push(B.shape("M -150 0 L -150 -720 C -150 -750 250 -750 250 -720 L 250 0 Z", C.woodLight, { sw: 7, ox: 8, oy: 6 }));
    out.push(B.ell(-110, -690, 9, 9, "#7a4a2a", 3) + B.ell(210, -40, 9, 9, "#7a4a2a", 3));
    for (var i = 0; i <= 10; i++) { var y = top + i * (bot - top) / 10; out.push(B.line("M -60 " + f(y) + " L " + (i % 5 ? -84 : -96) + " " + f(y), 4)); }
    out.push(B.shape("M -36 " + bot + " L -36 " + (top - 20) + " C -36 " + (top - 50) + " 36 " + (top - 50) + " 36 " + (top - 20) + " L 36 " + bot + " Z", "#F4FAFC", { sw: 6 }));
    out.push('<rect x="-16" y="' + f(yLv) + '" width="32" height="' + f(bot - yLv + 20) + '" fill="' + C.accent2 + '"/>');
    out.push(B.ell(0, -100, 62, 62, C.accent2, 7));
    out.push(B.line("M -20 " + (top - 20) + " L -20 " + (bot - 30), 5, "#ffffff", 0.8));
    // vạch −46: ở level 0.12 (mặc định o.mark)
    var mk = bot - (bot - top) * (o.mark == null ? 0.12 : o.mark);
    out.push(B.line("M 40 " + f(mk) + " L 64 " + f(mk), 6, C.accent2));
    out.push(B.text(150, f(mk + 2), "−46°C", 56, { w: 900, anchor: "middle" }));
    out.push(B.text(150, f(mk + 66), "−51°F", 46, { w: 800, anchor: "middle", fill: "#2c4f54" }));
    if (o.frost) out.push('<path d="M -150 -720 L -70 -720 L -90 -690 L -110 -700 L -130 -660 L -150 -670 Z" fill="#ffffff" opacity="0.9"/><path d="M 250 -10 L 170 -10 L 190 -40 L 210 -26 L 230 -70 L 250 -60 Z" fill="#ffffff" opacity="0.9"/>');
    if (o.icicle) { var k = o.icicle; out.push(B.shape("M -60 0 L -46 " + f(60 * k) + " L -32 0 Z M 20 0 L 34 " + f(90 * k) + " L 48 0 Z M 90 0 L 100 " + f(44 * k) + " L 110 0 Z", "#DDF3FC", { sw: 4 })); }
    return wrap(o, out.join(""));
  };
  // ---------- tường gỗ phủ khung ----------
  B.logWall = function () {
    var out = B.shape("M -200 -200 L 2120 -200 L 2120 1300 L -200 1300 Z", "#9b6a45", { sw: 0, ox: 0, oy: 0 });
    for (var y = -60; y < 1200; y += 120) {
      out += B.shape("M -100 " + y + " C 600 " + (y - 8) + " 1300 " + (y + 8) + " 2020 " + y + " L 2020 " + (y + 110) + " C 1300 " + (y + 118) + " 600 " + (y + 102) + " -100 " + (y + 110) + " Z", "#a8754d", { sw: 5, ox: 0, oy: 3 });
      out += B.line("M " + (200 + (y * 7) % 500) + " " + (y + 40) + " q 60 -10 120 0", 3, INK, 0.35);
    }
    return out;
  };

  // ---------- quầy chợ: gốc giữa đáy quầy ----------
  B.stall = function (o) {
    var out = [];
    out.push(B.line("M -330 0 L -330 -520", 14) + B.line("M 330 0 L 330 -520", 14));
    out.push(B.line("M -330 0 L -330 -520", 6, C.woodLight) + B.line("M 330 0 L 330 -520", 6, C.woodLight));
    var aw = "";
    for (var i = 0; i < 8; i++) {
      var x0 = -380 + i * 95;
      aw += B.shape("M " + x0 + " -600 L " + (x0 + 95) + " -600 L " + (x0 + 95) + " -500 C " + (x0 + 70) + " -470 " + (x0 + 25) + " -470 " + x0 + " -500 Z", i % 2 ? C.white : C.accent, { sw: 5 });
    }
    out.push(aw);
    out.push(B.shape("M -380 -600 L 380 -600 L 340 -650 L -340 -650 Z", C.snow, { sw: 5 }));
    out.push(B.shape("M -300 0 L -300 -210 L 300 -210 L 300 0 Z", C.wood, { sw: 6 }));
    out.push(B.shape("M -320 -210 L 320 -210 L 320 -236 L -320 -236 Z", C.woodDark, { sw: 6 }));
    out.push(B.line("M -280 -140 L 280 -140 M -280 -70 L 280 -70", 3, C.woodDark, 0.6));
    // cá xếp trên quầy
    out.push(B.fish({ x: -150, y: -262, s: 0.55, rot: 0 }) + B.fish({ x: 130, y: -258, s: 0.55, rot: 180, sx: 1 }));
    return wrap(o, out.join(""));
  };
  /** Thùng cá dựng đứng như bó củi: gốc giữa đáy thùng. knock: chỉ số con bị gõ, k độ rung */
  B.barrel = function (o) {
    var out = [];
    [[-70, -330, -4], [-24, -360, 2], [24, -345, -1], [70, -325, 5]].forEach(function (p) {
      out.push(B.fish({ x: p[0], y: p[1], s: 0.62, rot: -90 + p[2] }));
    });
    out.push(B.shape("M -120 0 C -136 -80 -136 -150 -116 -210 L 116 -210 C 136 -150 136 -80 120 0 Z", C.wood, { sw: 6 }));
    out.push(B.line("M -130 -60 C -40 -50 40 -50 130 -60", 8, "#5b5b5b") + B.line("M -128 -160 C -40 -150 40 -150 128 -160", 8, "#5b5b5b"));
    out.push(B.line("M -60 -200 L -64 -10 M 0 -205 L 0 -6 M 60 -200 L 64 -10", 3, C.woodDark, 0.6));
    return wrap(o, out.join(""));
  };
  /** Bàn tay đeo găng (không mặt người): gốc ở cổ tay, ống tay đi sang phải ra khỏi khung. */
  B.glove = function (o) {
    return wrap(o,
      B.shape("M 40 -50 L 900 -70 L 900 70 L 40 50 Z", "#4a5b66", { sw: 6 }) +
      B.shape("M 20 -62 C 50 -70 70 -40 64 0 C 70 40 50 70 20 62 C 0 40 0 -40 20 -62 Z", C.white, { sw: 5 }) +
      B.shape("M 10 -50 C -60 -60 -110 -30 -110 10 C -110 50 -60 60 10 50 Z", "#7a3b2e", { sw: 6 }) +
      B.shape("M -40 -46 C -60 -90 -90 -90 -96 -60 C -90 -40 -70 -40 -56 -36 Z", "#7a3b2e", { sw: 5 }));
  };
  /** Túi giấy: gốc giữa đáy. torn = rách đáy */
  B.bag = function (o) {
    var out = B.shape("M -60 0 L -70 -150 L 70 -150 L 60 0 Z", "#E3C595", { sw: 5 }) + B.line("M -40 -150 L -36 -130 L -28 -150", 3);
    if (o.torn) out = B.shape("M -60 -20 L -70 -150 L 70 -150 L 60 -20 L 40 -4 L 22 -26 L 4 -2 L -14 -26 L -34 -4 Z", "#E3C595", { sw: 5 });
    return wrap(o, out);
  };

  // ---------- xe hơi: gốc giữa đáy, dài ~760. run: thời gian (xe rung + khói), snow: phủ tuyết ----------
  B.car = function (o) {
    var out = [], jig = 0;
    if (o.run != null) jig = (B.hash(Math.round(o.run * 12) * 4.7) - 0.5) * 5;
    var body = "M -380 -60 C -386 -150 -360 -170 -300 -176 L -190 -184 L -120 -300 C -110 -316 -96 -320 -80 -320 L 170 -320 C 200 -320 214 -312 228 -296 L 300 -190 L 350 -180 C 384 -170 392 -140 390 -60 Z";
    var inner = [];
    inner.push(B.shape(body, o.color || C.sea, { sw: 7 }));
    // cửa sổ: trước (ghế lái, phải) và sau
    inner.push(B.shape("M -170 -190 L -108 -292 L 40 -292 L 40 -190 Z", "#DDEFF5", { sw: 6 }));
    inner.push(B.shape("M 62 -190 L 62 -292 L 168 -292 C 186 -292 196 -286 206 -272 L 262 -190 Z", "#DDEFF5", { sw: 6 }));
    // ghế lái trống nhìn qua kính
    inner.push(B.shape("M 110 -190 L 104 -262 C 104 -276 130 -280 134 -266 L 146 -190 Z", "#8E5527", { sw: 4, ox: 2, oy: 2 }));
    inner.push(B.ell(122, -280, 16, 10, "#8E5527", 4));
    inner.push(B.line("M 196 -228 C 214 -248 228 -232 222 -212", 7));
    inner.push(B.line("M 50 -180 L 50 -70", 4, INK, 0.6) + B.line("M -80 -150 L -50 -150", 6) + B.line("M 110 -150 L 140 -150", 6));
    inner.push(B.shape("M 330 -150 L 384 -146 L 384 -120 L 336 -124 Z", "#F6E7A6", { sw: 4 }));
    inner.push(B.shape("M -384 -140 L -360 -140 L -360 -110 L -384 -110 Z", C.accent2, { sw: 4 }));
    if (o.snow) {
      inner.push(B.shape("M -390 -150 C -360 -230 -200 -200 -130 -320 C -60 -380 160 -380 230 -316 C 280 -250 330 -220 394 -170 C 380 -150 -380 -140 -390 -150 Z", C.snow, { sw: 6 }));
      inner.push(B.shape("M -170 -190 L -108 -292 L 40 -292 L 40 -190 Z M 62 -190 L 62 -292 L 168 -292 L 262 -190 Z", "#F1F8FB", { sw: 5 }));
      inner.push(B.shape("M -300 -60 L -290 -20 L -280 -60 Z M -120 -60 L -112 -30 L -104 -60 Z M 200 -60 L 210 -14 L 220 -60 Z", "#DDF3FC", { sw: 3.5 }));
    }
    out.push(B.g("translate(0 " + f(jig) + ")", inner.join("")));
    [-240, 230].forEach(function (x) { out.push(B.ell(x, -50, 62, 62, "#2b2f33", 7) + B.ell(x, -50, 26, 26, "#9aa3a8", 5)); });
    if (o.snow) out.push(B.shape("M -420 0 C -300 -60 -180 -40 -60 -30 C 100 -50 260 -60 420 0 Z", C.snow, { sw: 6 }));
    out.push(B.line("M -380 -70 L -420 -70", 12));
    if (o.run != null) for (var i = 0; i < 4; i++) {
      var p = ((o.run * 0.9 + i * 0.25) % 1), r = 22 + p * 60;
      out.push('<g opacity="' + f((1 - p) * 0.9 * 100) / 100 + '">' + B.ell(-440 - p * 260, -80 - p * 160, r, r * 0.8, "#ffffff", 4) + "</g>");
    }
    return wrap(o, out.join(""));
  };

  // ---------- cốc trà: gốc giữa đáy. state hot|frozen|flip ----------
  B.cup = function (o) {
    var out = [], st = o.state || "hot", t = o.t || 0;
    var cupD = "M -60 -130 L -50 0 C -48 10 48 10 50 0 L 60 -130 Z";
    if (st === "flip") {
      out.push(B.g("rotate(180 0 -65)",
        B.shape(cupD, o.color || C.accent, { sw: 6 }) + B.line("M 60 -100 C 110 -100 110 -30 54 -30", 10) + B.line("M 60 -100 C 110 -100 110 -30 54 -30", 4, o.color || C.accent)));
      var dy = o.drop || 0;
      out.push(B.shape("M -58 " + f(-4 + dy) + " L -54 " + f(70 + dy) + " C -30 " + f(84 + dy) + " 30 " + f(84 + dy) + " 54 " + f(70 + dy) + " L 58 " + f(-4 + dy) + " Z", "#6B3B1C", { sw: 6 }));
      out.push(B.line("M -40 " + f(18 + dy) + " L -36 " + f(60 + dy), 6, "#CFEFFF", 0.9) + B.line("M 10 " + f(14 + dy) + " L 30 " + f(40 + dy), 5, "#CFEFFF", 0.8));
      return wrap(o, out.join(""));
    }
    if (st === "hot") for (var i = 0; i < 3; i++) {
      var ph = Math.round(t * 12) * 0.55 + i * 2, x = -30 + i * 30, pts = [];
      for (var k = 0; k < 5; k++) pts.push([x + Math.sin(ph + k * 1.3) * 14, -150 - k * 40]);
      out.push(B.line(B.smooth(pts, false), 15) + B.line(B.smooth(pts, false), 8, "#ffffff"));
    }
    if (st === "frozen") for (var j = 0; j < 3; j++) {
      var xx = -30 + j * 30, p2 = [];
      for (var m = 0; m < 5; m++) p2.push([xx + Math.sin(j * 2 + m * 1.3) * 14, -150 - m * 40]);
      out.push(B.line(B.smooth(p2, false), 16) + B.line(B.smooth(p2, false), 9, "#CFEFFF"));
      out.push(B.sparkle({ x: xx + 10, y: -300 - j * 10, s: 0.4 }));
    }
    out.push(B.shape(cupD, o.color || C.accent, { sw: 6 }));
    out.push(B.ell(0, -130, 60, 14, st === "frozen" ? "#D7EEF7" : C.tea, 6, { ox: 0, oy: 0 }));
    out.push(B.line("M 60 -100 C 110 -100 110 -30 54 -30", 10) + B.line("M 60 -100 C 110 -100 110 -30 54 -30", 4, o.color || C.accent));
    if (st === "frozen") out.push('<path d="M -60 -130 L -54 -60 L -40 -90 L -30 -70 L -20 -120 Z" fill="#ffffff" opacity="0.85"/>');
    return wrap(o, out.join(""));
  };
  /** Vũng nước dưới con cá đã rã đông: gốc giữa */
  B.puddle = function (o) {
    return wrap(o, B.shape("M -200 0 C -200 -24 -60 -30 40 -24 C 160 -30 230 -14 220 4 C 200 24 -160 26 -200 0 Z", "#BFE0EE", { sw: 4, op: 0.85 }));
  };

  // ---------- tủ đông khổng lồ chứa cả làng ----------
  B.freezer = function (o) {
    var out = [], close = o.close || 0;
    if (!o.doorOnly) {
    out.push(B.shape("M 230 90 L 1690 90 L 1690 1000 L 230 1000 Z", "#EEF4F6", { sw: 9, ox: 10, oy: 8 }));
    out.push(B.shape("M 300 160 L 1620 160 L 1620 930 L 300 930 Z", "#D6EAF2", { sw: 6 }));
    out.push(B.line("M 300 160 L 360 210 L 1560 210 L 1620 160 M 360 210 L 360 880 L 300 930 M 1560 210 L 1560 880 L 1620 930 M 360 880 L 1560 880", 3, INK, 0.5));
    out.push(B.shape("M 300 840 C 600 820 1300 830 1620 840 L 1620 930 L 300 930 Z", C.snow, { sw: 5 }));
    [[430, 0.3], [600, 0.26], [780, 0.32], [960, 0.27], [1140, 0.31], [1320, 0.26], [1480, 0.29]].forEach(function (h, i) {
      out.push(B.house({ x: h[0], y: 860, s: h[1], smokeTop: -1900, t: o.t, seed: i, faint: true }));
    });
    out.push(B.diamondDust(o.t || 0, 14, [380, 240, 1540, 800]));
    out.push('<path d="M 300 160 L 520 160 L 470 190 L 420 176 L 370 214 L 330 196 L 300 240 Z" fill="#ffffff" opacity="0.9"/><path d="M 1620 160 L 1400 160 L 1450 192 L 1500 178 L 1560 220 L 1590 200 L 1620 250 Z" fill="#ffffff" opacity="0.9"/>');
    }
    if (o.doorless) return out.join("");
    // cửa: bản lề bên phải (x 1690); close 0 = mở hé ra ngoài, 1 = đóng kín
    var c = -0.14 + close * 1.14, w = 1460 * c, sk = (1 - Math.abs(c)) * 70;
    var x2 = 1690 - w;
    out.push(B.shape("M 1690 90 L " + f(x2) + " " + f(90 - sk) + " L " + f(x2) + " " + f(1000 + sk) + " L 1690 1000 Z", "#F5F9FA", { sw: 9, ox: c > 0 ? 8 : -8, oy: 8 }));
    if (c > 0.3) out.push(B.shape("M " + f(x2 + 60 * c) + " 380 L " + f(x2 + 90 * c) + " 380 L " + f(x2 + 90 * c) + " 700 L " + f(x2 + 60 * c) + " 700 Z", "#9aa3a8", { sw: 6 }));
    if (c > 0.3) out.push(B.line("M " + f(x2 + 20 * c) + " 120 L " + f(x2 + 20 * c) + " 970", 4, INK, 0.4));
    if (c > 0.95) {
      out.push(B.line("M 300 150 L 1640 150 L 1640 940 L 300 940 Z", 3, INK, 0.35));
      out.push('<path d="M 255 92 L 520 92 L 440 130 L 380 118 L 320 170 L 255 140 Z" fill="#DDF1FA"/><path d="M 1688 998 L 1420 998 L 1500 960 L 1560 972 L 1620 920 L 1688 950 Z" fill="#DDF1FA"/>');
      out.push(B.line("M 700 300 l 40 0 M 720 280 l 0 40 M 706 286 l 28 28 M 734 286 l -28 28", 4, "#9cc8dc") + B.line("M 1300 700 l 50 0 M 1325 675 l 0 50 M 1307 682 l 36 36 M 1343 682 l -36 36", 4, "#9cc8dc"));
    }
    return out.join("");
  };

  // ---------- hiệu ứng ----------
  B.sparkle = function (o) {
    return wrap(o, B.shape("M 0 -40 L 10 -10 L 40 0 L 10 10 L 0 40 L -10 10 L -40 0 L -10 -10 Z", "#ffffff", { sw: 4, ox: 2, oy: 2 }));
  };
  B.impact = function (o) {
    var pts = [], n = 12;
    for (var i = 0; i < n * 2; i++) { var a = i * Math.PI / n, r = i % 2 ? 40 : 90 + B.hash(i) * 30; pts.push((i ? "L " : "M ") + f(Math.cos(a) * r * 1.4) + " " + f(Math.sin(a) * r * 0.7)); }
    return wrap(o, B.shape(pts.join(" ") + " Z", "#FFF4C8", { sw: 6 }));
  };
  B.speedLines = function (o) {
    var out = "";
    for (var i = 0; i < (o.n || 8); i++) {
      var y = (o.y0 || 0) + i * (o.gap || 40) + B.hash(i * 4.4) * 14, L = (o.len || 160) * (0.6 + B.hash(i) * 0.6), x = (o.x0 || 0) + B.hash(i * 2.2) * 60;
      out += B.line("M " + f(x) + " " + f(y) + " L " + f(x + (o.dx || 1) * L) + " " + f(y + (o.dy || 0) * L), o.sw || 6, INK, 0.85);
    }
    return out;
  };
  B.radialLines = function (cx, cy, r0, r1, n, seed) {
    var out = "";
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + B.hash(i + (seed || 0)) * 0.2, rr = r0 + B.hash(i * 3 + (seed || 0)) * 80;
      out += B.line("M " + f(cx + Math.cos(a) * rr) + " " + f(cy + Math.sin(a) * rr) + " L " + f(cx + Math.cos(a) * r1) + " " + f(cy + Math.sin(a) * r1), 7, INK, 0.8);
    }
    return out;
  };
  B.puff = function (o) {
    return wrap(o, B.shape(B.smooth([[-40, 0], [-30, -28], [0, -40], [32, -30], [44, 0], [20, 22], [-16, 22]], true), "#ffffff", { sw: 4, op: 0.95 }));
  };
  B.drop = function (o) { return wrap(o, B.shape("M 0 -26 C -10 -8 -16 4 -14 12 C -10 24 10 24 14 12 C 16 4 10 -8 0 -26 Z", o.fill || "#8fd0ea", { sw: 4 })); };
  /** Bong bóng ký hiệu của Wob: sym ?!|!|...|bag; tail = hướng đuôi (-1 trái dưới, 1 phải dưới) */
  B.bubble = function (o) {
    var tail = o.tail || -1, out = [];
    out.push(B.shape("M " + (-40 * tail) + " 60 L " + (-110 * tail) + " 130 L " + (10 * tail) + " 70 Z", "#ffffff", { sw: 6, ox: 3, oy: 3 }));
    out.push(B.shape(B.smooth([[-130, 0], [-100, -70], [0, -96], [100, -70], [130, 0], [100, 68], [0, 92], [-100, 68]], true), "#ffffff", { sw: 6, ox: 6, oy: 5 }));
    out.push('<path d="M ' + (-40 * tail) + ' 62 L ' + (10 * tail) + ' 72" stroke="#ffffff" stroke-width="12"/>');
    if (o.sym === "bag") out.push(B.bag({ x: 0, y: 60, s: 0.72 }) + B.line("M -20 -58 C -20 -84 20 -84 20 -58", 5));
    else if (o.sym === "...") out.push(B.dot(-50, 6, 13) + B.dot(0, 6, 13) + B.dot(50, 6, 13));
    else out.push(B.text(0, 34, o.sym, 104, { w: 900 }));
    return wrap(o, out.join(""));
  };
})();
