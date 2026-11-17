/* ve-tay · đạo cụ và bối cảnh vẽ cùng nét mực. Tách từ bản thử B (js/dao-cu.js), bỏ chữ, số cứng của tập.
 * Mỗi hàm nhận o = {x, y, s, rot, sx, ...} và trả chuỗi SVG; gốc toạ độ ghi ở đầu mỗi hàm.
 * Chữ chỉ qua VT.text (tự bỏ chữ không có trong HH_DATA.chu_tren_do_vat). Không ảnh.
 */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f, INK = C.ink, wrap = VT.wrap;

  // ---------- cá: tâm (0,0), dài ~340, đầu bên phải. bend > 0 = mềm oặt. eye: open|serene|limp|wide ----------
  VT.fish = function (o) {
    var bend = o.bend || 0, top = [], bot = [], N = 14;
    var cl = function (u) { return bend * 70 * u * u; };
    var th = function (u) { return 50 * Math.pow(Math.max(0, 1 - u * u), 0.55) * (u < 0 ? 0.55 + 0.45 * (1 + u) : 1) + 6; };
    for (var i = 0; i <= N; i++) {
      var u = -0.86 + (1.86 * i) / N, x = 150 * u, y = cl(u), h = th(u);
      top.push([x, y - h]); bot.unshift([x, y + h * 0.9]);
    }
    var body = VT.smooth(top.concat([[154, cl(1) + 2]]).concat(bot), true);
    var ty = cl(-0.86), ang = Math.atan(2 * bend * 70 * -0.86 / 150) * 180 / Math.PI;
    var col = o.color || (o.thaw ? C.fishThaw : C.fishFrozen), out = [];
    out.push(VT.g("translate(-129 " + f(ty) + ") rotate(" + f(-ang * 0.9) + ")", VT.shape("M 4 0 L -54 -44 C -44 -16 -44 16 -54 44 Z", col, { sw: 6 })));
    out.push(VT.shape("M -40 " + f(cl(-0.27) - 50) + " L -6 " + f(cl(-0.04) - 86) + " L 30 " + f(cl(0.2) - 50) + " Z", col, { sw: 5 }));
    out.push(VT.shape(body, col, { sw: 6 }));
    out.push(VT.line("M -100 " + f(cl(-0.66) + 22) + " Q 0 " + f(cl(0) + 48) + " 110 " + f(cl(0.73) + 24), 10, C.fishBelly, 0.85));
    out.push(VT.line("M 78 " + f(cl(0.52) - 34) + " Q 64 " + f(cl(0.43)) + " 80 " + f(cl(0.53) + 36), 5));
    [-60, -20, 20].forEach(function (x) { out.push(VT.line("M " + x + " " + f(cl(x / 150) - 10) + " q 12 10 0 20", 3, INK, 0.45)); });
    var ex = 112, ey = cl(0.75) - 14;
    if (o.eye === "serene") {
      out.push(VT.ell(ex, ey, 15, 15, "#fffdf6", 4.5));
      out.push('<path d="M ' + (ex - 15) + " " + f(ey + 1) + " A 15 15 0 0 1 " + (ex + 15) + " " + f(ey + 1) + ' Z" fill="' + col + '" stroke="' + INK + '" stroke-width="4.5"/>');
      out.push(VT.line("M " + (ex - 16) + " " + f(ey + 1) + " L " + (ex + 16) + " " + f(ey + 1), 6));
      out.push(VT.line("M 128 " + f(cl(0.86) + 10) + " Q 138 " + f(cl(0.9) + 18) + " 150 " + f(cl(1) + 8), 5));
    } else if (o.eye === "limp") {
      out.push(VT.ell(ex, ey, 14, 14, "#fffdf6", 4.5));
      out.push('<path d="M ' + (ex - 14) + " " + f(ey + 3) + " A 14 14 0 0 1 " + (ex + 14) + " " + f(ey + 3) + ' Z" fill="' + col + '" stroke="' + INK + '" stroke-width="4.5"/>');
      out.push(VT.dot(ex + 3, ey + 7, 4));
      out.push(VT.line("M 132 " + f(cl(0.9) + 14) + " Q 140 " + f(cl(0.92) + 8) + " 150 " + f(cl(1) + 12), 5));
    } else if (o.eye === "wide") {
      out.push(VT.ell(ex, ey, 18, 18, "#fffdf6", 4.5));
      out.push(VT.dot(ex + 1, ey, 4));
      out.push(VT.line("M 132 " + f(cl(0.9) + 14) + " L 152 " + f(cl(1) + 10), 5));
    } else {
      out.push(VT.ell(ex, ey, 15, 15, "#fffdf6", 4.5));
      out.push(VT.dot(ex + 2, ey, 6));
      out.push(VT.line("M 132 " + f(cl(0.9) + 14) + " L 152 " + f(cl(1) + 10), 5));
    }
    if (o.frost !== false && !o.thaw) {
      out.push('<path d="M -120 ' + f(cl(-0.8) - 18) + " L -90 " + f(cl(-0.6) - 34) + " L -70 " + f(cl(-0.47) - 26) + " L -40 " + f(cl(-0.27) - 44) + " L -40 " + f(cl(-0.27) - 30) + " L -104 " + f(cl(-0.7) - 14) + ' Z" fill="#ffffff" opacity="0.85"/>');
      out.push(VT.line("M 40 -38 L 60 -40", 4, "#ffffff", 0.9));
    }
    if (o.thaw) out.push(VT.line("M -60 " + f(cl(-0.4) - 26) + " Q 0 " + f(cl(0) - 40) + " 60 " + f(cl(0.4) - 28), 5, "#ffffff", 0.7));
    return wrap(o, out.join(""));
  };

  // ---------- bàn làm việc, đèn, hộp, sổ ----------
  /** Ánh đèn bàn (vẽ trước bàn): gốc ở đế đèn. */
  VT.lampLight = function (o) { return wrap(o, '<path d="M 140 -300 L 236 -250 L 900 0 L -40 0 Z" fill="' + C.lampLight + '" opacity="0.38"/>'); };
  /** Đèn bàn: gốc (0,0) ở đế trên mặt bàn, chao đèn hướng phải. */
  VT.lamp = function (o) {
    return wrap(o,
      VT.shape("M -80 0 C -80 -26 80 -26 80 0 Z", C.sea, { sw: 6 }) +
      VT.line("M 0 -16 L 30 -230", 14) + VT.line("M 0 -16 L 30 -230", 6, C.sea) +
      VT.line("M 30 -230 L 150 -300", 14) + VT.line("M 30 -230 L 150 -300", 6, C.sea) + VT.ell(30, -230, 14, 14, C.sea, 5) +
      VT.g("translate(160 -296) rotate(32)", VT.shape("M -50 -40 L 50 -40 L 96 50 L -96 50 Z", C.accent, { sw: 6 }) + VT.ell(0, 52, 34, 12, C.lampLight, 5)));
  };
  /** Bàn gỗ phủ hết bề ngang; mặt bàn ở y. */
  VT.desk = function (y) {
    var out = VT.shape("M -400 " + y + " L 2320 " + y + " L 2320 1600 L -400 1600 Z", C.wood, { sw: 8, ox: 0, oy: 6 });
    out += VT.shape("M -400 " + (y + 46) + " L 2320 " + (y + 46) + " L 2320 1600 L -400 1600 Z", C.woodDark, { sw: 6, ox: 0, oy: 4 });
    [[120, 18, 520], [700, 28, 1180], [1300, 14, 1800], [260, 34, 600]].forEach(function (g) {
      out += VT.line("M " + g[0] + " " + (y + g[1]) + " C " + (g[0] + 120) + " " + (y + g[1] - 6) + " " + (g[2] - 120) + " " + (y + g[1] + 6) + " " + g[2] + " " + (y + g[1]), 3, C.woodDark, 0.6);
    });
    return out;
  };
  /** Hộp kỷ vật mở nắp: gốc góc trái dưới, rộng 320. */
  VT.box = function (o) {
    return wrap(o,
      VT.shape("M 10 -150 L 60 -300 L 360 -300 L 310 -150 Z", C.woodDark, { sw: 6 }) +
      VT.shape("M 0 -150 L 320 -150 L 320 -142 L 0 -142 Z", "#3a2a20", { sw: 0 }) +
      VT.g("translate(70 -150) rotate(-12)", VT.shape("M 0 0 L 0 -110 L 150 -110 L 150 0 Z", C.white, { sw: 5 }) + VT.line("M 18 -84 L 120 -84", 4, C.sea, 0.7) + VT.line("M 18 -60 L 96 -60", 4, C.sea, 0.7)) +
      VT.g("translate(220 -150) rotate(14)", VT.shape("M 0 0 L 0 -90 C 20 -110 50 -110 70 -90 L 70 0 Z", C.accent, { sw: 5 })) +
      VT.shape("M 0 0 L 320 0 L 320 -150 L 0 -150 Z", C.wood, { sw: 6 }) +
      VT.line("M 20 -120 L 300 -120", 3, C.woodDark, 0.6) + VT.line("M 20 -60 L 300 -60", 3, C.woodDark, 0.6) +
      VT.shape("M 145 -150 L 175 -150 L 175 -112 L 145 -112 Z", "#E8C25A", { sw: 4 }));
  };
  /** Sổ đóng nằm trên bàn: gốc giữa đáy. */
  VT.bookClosed = function (o) {
    return wrap(o, VT.shape("M -170 0 L 170 0 L 150 -36 L -150 -36 Z", C.sea, { sw: 6 }) + VT.line("M 60 -36 L 70 0", 6, C.accent) + VT.shape("M -170 0 L 170 0 L 170 10 L -170 10 Z", C.white, { sw: 5 }));
  };
  /** Sổ mở nhìn từ trên: gốc giữa gáy, mỗi trang 760×880. left/right: chuỗi SVG vẽ trong toạ độ trang (gốc giữa trang). */
  VT.bookOpen = function (o) {
    var out = [];
    out.push(VT.shape("M -800 -460 L 800 -460 L 800 460 L -800 460 Z", o.cover || C.sea, { sw: 7, ox: 10, oy: 10 }));
    out.push(VT.shape("M -770 -440 L -14 -430 L -14 440 L -770 430 Z", "#FBF6E9", { sw: 5, ox: 3, oy: 3 }));
    out.push(VT.shape("M 14 -430 L 770 -440 L 770 430 L 14 440 Z", "#FBF6E9", { sw: 5, ox: 3, oy: 3 }));
    for (var i = 0; i < 12; i++) out.push(VT.ell(0, -400 + i * 72, 18, 10, "none", 5));
    if (o.left) out.push(VT.g("translate(-392 0)", o.left));
    if (o.right) out.push(VT.g("translate(392 0)", o.right));
    return wrap(o, out.join(""));
  };
  /** Trang đang lật: k 0..1, gốc giữa gáy. */
  VT.pageFlip = function (o) {
    var k = o.k, w = 760 * Math.cos(k * Math.PI), lift = Math.sin(k * Math.PI) * 120;
    var d = "M 0 -440 C " + f(w * 0.5) + " " + f(-440 - lift) + " " + f(w) + " " + f(-440 - lift * 0.4) + " " + f(w) + " -430 L " + f(w) + " 430 C " + f(w) + " " + f(430 - lift * 0.3) + " " + f(w * 0.5) + " " + f(440 - lift * 0.6) + " 0 440 Z";
    return wrap(o, VT.shape(d, "#FFFBF0", { sw: 5, ox: k > 0.5 ? -8 : 8, oy: 6 }));
  };
  /** Làng phác bút mảnh trên trang: gốc giữa trang. lit = số cửa sổ sáng (0–3). sign = [dòng 1, dòng 2] (chữ phải có trong chu_tren_do_vat). */
  VT.pageVillage = function (o) {
    var out = [], lit = o.lit || 0;
    out.push(VT.line("M -340 160 C -200 120 -60 170 60 140 C 180 110 280 150 340 130", 4));
    out.push(VT.line("M -340 300 C -120 270 120 300 340 280", 3, INK, 0.5));
    [[-250, 175, 1], [-90, 200, 2], [70, 168, 3]].forEach(function (h) {
      var x = h[0], y = h[1];
      out.push(VT.shape("M " + x + " " + y + " L " + x + " " + (y - 70) + " L " + (x + 120) + " " + (y - 70) + " L " + (x + 120) + " " + y + " Z", C.woodLight, { sw: 4, ox: 4, oy: 3 }));
      out.push(VT.shape("M " + (x - 16) + " " + (y - 66) + " L " + (x + 60) + " " + (y - 120) + " L " + (x + 136) + " " + (y - 66) + " Z", C.snow, { sw: 4, ox: 3, oy: 2 }));
      out.push(VT.shape("M " + (x + 84) + " " + (y - 104) + " L " + (x + 84) + " " + (y - 136) + " L " + (x + 102) + " " + (y - 136) + " L " + (x + 102) + " " + (y - 92) + " Z", C.woodDark, { sw: 4, ox: 2, oy: 2 }));
      out.push(VT.line("M " + (x + 93) + " " + (y - 142) + " L " + (x + 93) + " " + (y - 330), 10, "#ffffff", 0.9));
      var on = lit >= h[2];
      out.push(VT.shape("M " + (x + 30) + " " + (y - 50) + " L " + (x + 62) + " " + (y - 50) + " L " + (x + 62) + " " + (y - 22) + " L " + (x + 30) + " " + (y - 22) + " Z", on ? C.window : "#d8d0bc", { sw: 3.5, ox: 2, oy: 2 }));
    });
    if (o.sign) {
      out.push(VT.line("M 150 230 L 150 60", 8) + VT.line("M 300 230 L 300 60", 8));
      out.push(VT.g("rotate(-3 225 0)", VT.shape("M 30 -140 L 420 -140 L 420 80 L 30 80 Z", C.white, { sw: 6, ox: 6, oy: 5 }) +
        VT.text(225, -52, o.sign[0], 54, { w: 900 }) + (o.sign[1] ? VT.text(225, 44, o.sign[1], 48, { w: 700, fill: C.sea }) : "")));
    }
    return wrap(o, out.join(""));
  };

  // ---------- nhà gỗ, phố tuyết ----------
  /** Nhà gỗ: gốc giữa đáy, rộng w (420). smoke (cột khói thẳng), door + open 0..1, window, faint (nét mảnh, cho nhà xa). */
  VT.house = function (o) {
    var w = o.w || 420, h = o.h || 230, hw = w / 2, out = [], ink = o.faint ? 4 : 6;
    var smokeTop = o.smokeTop == null ? -900 : o.smokeTop;
    if (o.smoke !== false) {
      var cx = hw * 0.45, base = -h - 150, wob = o.t ? Math.sin(Math.round(o.t * 12) * 0.9) * 1.5 : 0;
      var ptsL = [], ptsR = [];
      for (var yy = base; yy >= smokeTop; yy -= 60) { var a = Math.sin(yy * 0.03 + (o.seed || 0)) * 4 + wob; ptsL.push([cx - 22 + a, yy]); ptsR.unshift([cx + 22 + a, yy]); }
      out.push(VT.shape(VT.smooth(ptsL.concat(ptsR), true), "#ffffff", { sw: o.faint ? 2.5 : 3.5, op: 0.92, sop: 0.6 }));
    }
    out.push(VT.shape("M " + f(hw * 0.32) + " " + f(-h - 40) + " L " + f(hw * 0.32) + " " + f(-h - 150) + " L " + f(hw * 0.58) + " " + f(-h - 150) + " L " + f(hw * 0.58) + " " + f(-h - 20) + " Z", "#7a4a2a", { sw: ink }));
    out.push(VT.shape("M " + (-hw) + " 0 L " + (-hw) + " " + (-h) + " L " + hw + " " + (-h) + " L " + hw + " 0 Z", o.wall || C.woodDark, { sw: ink }));
    for (var y = -h + 34; y < -10; y += 34) out.push(VT.line("M " + (-hw + 6) + " " + y + " L " + (hw - 6) + " " + (y + 2), 3, INK, 0.45));
    out.push(VT.shape("M " + (-hw - 40) + " " + (-h + 10) + " L 0 " + (-h - 140) + " L " + (hw + 40) + " " + (-h + 10) + " C " + (hw * 0.3) + " " + (-h - 12) + " " + (-hw * 0.3) + " " + (-h - 4) + " " + (-hw - 40) + " " + (-h + 10) + " Z", C.snow, { sw: ink }));
    if (o.window !== false) {
      var wx = o.door ? -hw * 0.62 : -45;
      out.push(VT.shape("M " + f(wx) + " -170 L " + f(wx + 90) + " -170 L " + f(wx + 90) + " -90 L " + f(wx) + " -90 Z", C.window, { sw: ink - 1 }));
      out.push(VT.line("M " + f(wx + 45) + " -170 L " + f(wx + 45) + " -90 M " + f(wx) + " -130 L " + f(wx + 90) + " -130", 4));
      out.push(VT.shape("M " + f(wx - 8) + " -170 L " + f(wx + 98) + " -170 L " + f(wx + 90) + " -184 L " + f(wx) + " -184 Z", C.snow, { sw: 3.5 }));
    }
    if (o.door) {
      var open = o.open || 0, dw = 110 * (1 - open * 0.85);
      out.push(VT.shape("M 40 0 L 40 -190 L 150 -190 L 150 0 Z", "#2a2320", { sw: ink }));
      out.push(VT.shape("M 40 0 L 40 -190 L " + f(40 + dw) + " " + f(-190 - open * 14) + " L " + f(40 + dw) + " " + f(open * 10) + " Z", "#5c3a22", { sw: ink }));
      out.push(VT.dot(40 + dw * 0.85, -95, 6));
    }
    if (o.icicles) [-hw * 0.7, -hw * 0.35, 0, hw * 0.4, hw * 0.75].forEach(function (x, i) {
      var L = 26 + VT.hash(i + (o.seed || 0)) * 30;
      out.push(VT.shape("M " + f(x - 8) + " " + (-h + 12) + " L " + f(x) + " " + f(-h + 12 + L) + " L " + f(x + 8) + " " + (-h + 12) + " Z", "#DDF3FC", { sw: 3.5, ox: 2, oy: 2 }));
    });
    out.push(VT.shape("M " + (-hw - 30) + " 4 C " + (-hw + 60) + " -26 " + (hw - 60) + " -22 " + (hw + 30) + " 4 Z", C.snow, { sw: ink - 1 }));
    return wrap(o, out.join(""));
  };
  /** Trời phủ rộng (để camera lia/zoom không lộ mép). */
  VT.sky = function (col, op) { return '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + (col || C.sky) + '" opacity="' + (op == null ? 0.85 : op) + '"/>'; };
  /** Dải đồi xa ở cao độ y, dịch ngang shift (parallax). */
  VT.ridge = function (y, shift, col) {
    return VT.g("translate(" + f(shift || 0) + " 0)", VT.shape("M -1000 " + y + " C -400 " + (y - 60) + " -100 " + (y - 90) + " 200 " + (y - 30) + " C 500 " + (y - 70) + " 800 " + (y - 110) + " 1100 " + (y - 20) + " C 1400 " + (y - 60) + " 1700 " + (y - 100) + " 2000 " + (y - 40) + " C 2400 " + (y - 70) + " 2700 " + (y - 30) + " 3000 " + (y - 60) + " L 3000 " + (y + 400) + " L -1000 " + (y + 400) + " Z", col || "#E8F1F5", { sw: 4, sop: 0.5 }));
  };
  /** Dãy nhà xa có khói thẳng đứng (mờ). */
  VT.farHouses = function (y, shift, t, n) {
    var out = "", N = n || 9;
    for (var i = 0; i < N; i++) {
      var x = -700 + i * 400 + VT.hash(i * 2.3) * 120 + (shift || 0), s = 0.36 + VT.hash(i * 5.1) * 0.1;
      out += VT.house({ x: x, y: y, s: s, faint: true, smokeTop: -1700, t: t, seed: i, wall: "#a98466", window: i % 2 === 0 });
    }
    return '<g opacity="0.7">' + out + "</g>";
  };
  /** Mặt tuyết từ y xuống hết khung. */
  VT.snowGround = function (y) {
    return VT.shape("M -1200 " + (y + 10) + " C -400 " + (y + 20) + " 0 " + (y - 14) + " 500 " + (y + 16) + " C 960 " + y + " 1400 " + (y - 14) + " 1800 " + (y + 14) + " C 2400 " + (y - 4) + " 2800 " + (y + 10) + " 3200 " + (y - 4) + " L 3200 2400 L -1200 2400 Z", C.snow, { sw: 6, ox: 0, oy: 5 }) +
      VT.line("M 200 " + (y + 90) + " C 400 " + (y + 80) + " 600 " + (y + 100) + " 800 " + (y + 92), 4, C.iceDeep, 0.5) +
      VT.line("M 1100 " + (y + 160) + " C 1300 " + (y + 150) + " 1500 " + (y + 170) + " 1700 " + (y + 160), 4, C.iceDeep, 0.5) +
      VT.line("M -300 " + (y + 140) + " C -100 " + (y + 130) + " 60 " + (y + 150) + " 140 " + (y + 140), 4, C.iceDeep, 0.5);
  };
  /** Sương băng trôi ngang (n dải từ y0). */
  VT.fog = function (t, y0, n) {
    var out = "";
    for (var i = 0; i < (n || 2); i++) {
      var ph = t * 0.25 * (i % 2 ? 1 : -1) + i * 2, y = y0 + i * 50, pts = [];
      for (var x = -1200; x <= 3200; x += 200) pts.push([x, y + Math.sin(x * 0.004 + ph) * 18]);
      out += '<path d="' + VT.smooth(pts, false) + " L 3200 " + (y + 70) + " L -1200 " + (y + 70) + ' Z" fill="#ffffff" opacity="0.35"/>';
    }
    return out;
  };
  /** Bụi kim cương (tinh thể băng lấp lánh), nháy theo hình vẽ. box = [x0, y0, x1, y1]. */
  VT.diamondDust = function (t, n, box) {
    var out = "", step = Math.round(t * 12);
    for (var i = 0; i < n; i++) {
      var x = box[0] + VT.hash(i * 3.3) * (box[2] - box[0]), y = box[1] + VT.hash(i * 9.1) * (box[3] - box[1]);
      if (VT.hash(i * 1.7 + Math.floor(step / 3) * 0.37) < 0.45) out += VT.sparkle({ x: x, y: y, s: 0.35 + VT.hash(i) * 0.3 });
    }
    return out;
  };
  /** Tuyết rơi chậm trong box, tất định theo t. */
  VT.snowfall = function (t, n, box, speed) {
    var out = "", H = box[3] - box[1];
    for (var i = 0; i < n; i++) {
      var x = box[0] + VT.hash(i * 4.1) * (box[2] - box[0]), y0 = VT.hash(i * 8.7) * H, v = (speed || 40) * (0.6 + VT.hash(i * 2.9) * 0.8);
      var y = box[1] + ((y0 + t * v) % H), xx = x + Math.sin(t * 1.3 + i) * 10;
      out += VT.dot(xx, y, 3 + VT.hash(i * 6.6) * 3, "#ffffff");
    }
    return out;
  };

  /** Nhiệt kế treo tường: gốc giữa đế, cao ~760; level 0..1. labels: [[chữ, cỡ, màu]] cạnh vạch mark (chữ phải có trong chu_tren_do_vat). */
  VT.thermo = function (o) {
    var lv = VT.clamp(o.level, 0, 1), top = -660, bot = -150, yLv = bot - (bot - top) * lv, out = [];
    out.push(VT.shape("M -150 0 L -150 -720 C -150 -750 250 -750 250 -720 L 250 0 Z", C.woodLight, { sw: 7, ox: 8, oy: 6 }));
    out.push(VT.ell(-110, -690, 9, 9, "#7a4a2a", 3) + VT.ell(210, -40, 9, 9, "#7a4a2a", 3));
    for (var i = 0; i <= 10; i++) { var y = top + i * (bot - top) / 10; out.push(VT.line("M -60 " + f(y) + " L " + (i % 5 ? -84 : -96) + " " + f(y), 4)); }
    out.push(VT.shape("M -36 " + bot + " L -36 " + (top - 20) + " C -36 " + (top - 50) + " 36 " + (top - 50) + " 36 " + (top - 20) + " L 36 " + bot + " Z", "#F4FAFC", { sw: 6 }));
    out.push('<rect x="-16" y="' + f(yLv) + '" width="32" height="' + f(bot - yLv + 20) + '" fill="' + C.accent2 + '"/>');
    out.push(VT.ell(0, -100, 62, 62, C.accent2, 7));
    out.push(VT.line("M -20 " + (top - 20) + " L -20 " + (bot - 30), 5, "#ffffff", 0.8));
    var mk = bot - (bot - top) * (o.mark == null ? 0.12 : o.mark);
    out.push(VT.line("M 40 " + f(mk) + " L 64 " + f(mk), 6, C.accent2));
    (o.labels || []).forEach(function (L, j) { out.push(VT.text(150, f(mk + 2 + j * 64), L[0], L[1] || 56, { w: j ? 800 : 900, fill: L[2] || (j ? "#2c4f54" : INK) })); });
    if (o.frost) out.push('<path d="M -150 -720 L -70 -720 L -90 -690 L -110 -700 L -130 -660 L -150 -670 Z" fill="#ffffff" opacity="0.9"/><path d="M 250 -10 L 170 -10 L 190 -40 L 210 -26 L 230 -70 L 250 -60 Z" fill="#ffffff" opacity="0.9"/>');
    if (o.icicle) { var k = o.icicle; out.push(VT.shape("M -60 0 L -46 " + f(60 * k) + " L -32 0 Z M 20 0 L 34 " + f(90 * k) + " L 48 0 Z M 90 0 L 100 " + f(44 * k) + " L 110 0 Z", "#DDF3FC", { sw: 4 })); }
    return wrap(o, out.join(""));
  };
  /** Tường gỗ phủ khung. */
  VT.logWall = function () {
    var out = VT.shape("M -1200 -1200 L 3120 -1200 L 3120 2300 L -1200 2300 Z", "#9b6a45", { sw: 0, ox: 0, oy: 0 });
    for (var y = -540; y < 1700; y += 120) {
      out += VT.shape("M -1100 " + y + " C 0 " + (y - 8) + " 1300 " + (y + 8) + " 3020 " + y + " L 3020 " + (y + 110) + " C 1300 " + (y + 118) + " 0 " + (y + 102) + " -1100 " + (y + 110) + " Z", "#a8754d", { sw: 5, ox: 0, oy: 3 });
      out += VT.line("M " + (200 + (y * 7) % 500) + " " + (y + 40) + " q 60 -10 120 0", 3, INK, 0.35);
    }
    return out;
  };

  // ---------- chợ ----------
  /** Quầy chợ có mái sọc: gốc giữa đáy, rộng ~760. goods: SVG đặt trên mặt quầy (gốc giữa mặt quầy, y = 0 là mặt quầy). Mặc định 2 con cá. */
  VT.stall = function (o) {
    var out = [], stripe = o.stripe || C.accent;
    out.push(VT.line("M -330 0 L -330 -520", 14) + VT.line("M 330 0 L 330 -520", 14));
    out.push(VT.line("M -330 0 L -330 -520", 6, C.woodLight) + VT.line("M 330 0 L 330 -520", 6, C.woodLight));
    for (var i = 0; i < 8; i++) {
      var x0 = -380 + i * 95;
      out.push(VT.shape("M " + x0 + " -600 L " + (x0 + 95) + " -600 L " + (x0 + 95) + " -500 C " + (x0 + 70) + " -470 " + (x0 + 25) + " -470 " + x0 + " -500 Z", i % 2 ? C.white : stripe, { sw: 5 }));
    }
    out.push(VT.shape("M -380 -600 L 380 -600 L 340 -650 L -340 -650 Z", C.snow, { sw: 5 }));
    if (o.icicles !== false) [-340, -250, -140, -40, 70, 180, 290].forEach(function (x, j) {
      var L = 20 + VT.hash(j * 3.3) * 34; out.push(VT.shape("M " + (x - 7) + " -478 L " + x + " " + f(-478 + L) + " L " + (x + 7) + " -478 Z", "#DDF3FC", { sw: 3, ox: 2, oy: 2 }));
    });
    out.push(VT.shape("M -300 0 L -300 -210 L 300 -210 L 300 0 Z", C.wood, { sw: 6 }));
    out.push(VT.shape("M -320 -210 L 320 -210 L 320 -236 L -320 -236 Z", C.woodDark, { sw: 6 }));
    out.push(VT.line("M -280 -140 L 280 -140 M -280 -70 L 280 -70", 3, C.woodDark, 0.6));
    out.push(VT.g("translate(0 -236)", o.goods != null ? o.goods : VT.fish({ x: -150, y: -26, s: 0.55 }) + VT.fish({ x: 130, y: -22, s: 0.55, rot: 180 })));
    return wrap(o, out.join(""));
  };
  /** Thùng cá dựng đứng như bó củi: gốc giữa đáy. n con (4), knock: chỉ số con bị gõ, kk: độ rung 0..1 (con cá KHÔNG cong, chỉ rung cả khối). */
  VT.barrel = function (o) {
    var out = [], n = o.n || 4;
    for (var i = 0; i < n; i++) {
      var u = n === 1 ? 0 : i / (n - 1), x = -70 + 140 * u, y = -330 - VT.hash(i * 1.9) * 30, r = -90 + (VT.hash(i * 4.3) - 0.5) * 10;
      var jig = o.knock === i && o.kk ? Math.sin(o.kk * 40) * 3 * o.kk : 0;
      out.push(VT.fish({ x: x + jig, y: y, s: 0.62, rot: r, eye: o.eyes ? o.eyes[i] : undefined }));
    }
    out.push(VT.shape("M -120 0 C -136 -80 -136 -150 -116 -210 L 116 -210 C 136 -150 136 -80 120 0 Z", C.wood, { sw: 6 }));
    out.push(VT.line("M -130 -60 C -40 -50 40 -50 130 -60", 8, "#5b5b5b") + VT.line("M -128 -160 C -40 -150 40 -150 128 -160", 8, "#5b5b5b"));
    out.push(VT.line("M -60 -200 L -64 -10 M 0 -205 L 0 -6 M 60 -200 L 64 -10", 3, C.woodDark, 0.6));
    return wrap(o, out.join(""));
  };
  /** Bàn tay đeo găng (người bán, KHÔNG mặt người): gốc ở giữa nắm tay, ống tay áo đi sang phải ra khỏi khung (rot để đổi hướng).
   *  hold: SVG vật đang cầm, vẽ DƯỚI các ngón (gốc ở giữa nắm tay). open: 0..1 xoè ra thả vật. */
  VT.glove = function (o) {
    var op = o.open || 0, out = [];
    out.push(VT.shape("M 60 -54 L 1000 -74 L 1000 74 L 60 54 Z", o.sleeve || "#4a5b66", { sw: 6 }));
    out.push(VT.line("M 200 -50 L 200 50 M 420 -56 L 420 56", 3, INK, 0.35));
    out.push(VT.shape("M 40 -66 C 72 -74 92 -44 86 0 C 92 44 72 74 40 66 C 18 44 18 -44 40 -66 Z", C.white, { sw: 5 }));
    if (o.hold) out.push(o.hold);
    var GL = o.color || "#7a3b2e";
    out.push(VT.shape("M 40 -54 C -20 -64 -66 -40 -70 -6 C -72 30 -36 58 40 54 Z", GL, { sw: 6 }));
    // ngón: nắm (op 0) → xoè (op 1)
    for (var i = 0; i < 3; i++) {
      var yy = -30 + i * 26, ex = -70 - 40 * op, ey = yy + (i - 1) * 16 * op;
      out.push(VT.line("M -20 " + yy + " Q " + f(-60 - 10 * op) + " " + f(yy - 6) + " " + f(ex) + " " + f(ey + (1 - op) * 22), 22));
      out.push(VT.line("M -20 " + yy + " Q " + f(-60 - 10 * op) + " " + f(yy - 6) + " " + f(ex) + " " + f(ey + (1 - op) * 22), 12, GL));
    }
    out.push(VT.shape("M -10 -50 C -30 -96 -66 -96 -72 -66 C -66 -46 -44 -44 -28 -40 Z", GL, { sw: 5 }));
    return wrap(o, out.join(""));
  };
  /** Túi giấy: gốc giữa đáy (cao 150). torn = rách đáy; tear 0..1 = miệng rách mở dần; handle = có quai. */
  VT.bag = function (o) {
    var out;
    if (o.torn) {
      var k = o.tear == null ? 1 : o.tear;
      out = VT.shape("M -60 -20 L -70 -150 L 70 -150 L 60 -20 L " + f(40 + 10 * k) + " " + f(-4 + 18 * k) + " L 22 " + f(-26 - 6 * k) + " L 4 " + f(-2 + 20 * k) + " L -14 " + f(-26 - 6 * k) + " L " + f(-34 - 10 * k) + " " + f(-4 + 18 * k) + " Z", "#E3C595", { sw: 5 });
    } else out = VT.shape("M -60 0 L -70 -150 L 70 -150 L 60 0 Z", "#E3C595", { sw: 5 });
    out += VT.line("M -40 -150 L -36 -130 L -28 -150", 3) + VT.line("M -50 -110 L 50 -112", 3, C.woodDark, 0.4);
    if (o.handle) out += VT.line("M -26 -150 C -26 -186 26 -186 26 -150", 5);
    return wrap(o, out);
  };
  /** Mảnh giấy rách rơi: gốc tâm. */
  VT.scrap = function (o) { return wrap(o, VT.shape("M -18 -10 L 14 -16 L 20 6 L -4 14 L -20 4 Z", "#E3C595", { sw: 4 })); };

  // ---------- xe ----------
  /** Xe hơi: gốc giữa đáy, dài ~760. run: thời gian (xe rung + khói), snow: phủ tuyết, color. */
  VT.car = function (o) {
    var out = [], jig = 0;
    if (o.run != null) jig = (VT.hash(Math.round(o.run * 12) * 4.7) - 0.5) * 5;
    var body = "M -380 -60 C -386 -150 -360 -170 -300 -176 L -190 -184 L -120 -300 C -110 -316 -96 -320 -80 -320 L 170 -320 C 200 -320 214 -312 228 -296 L 300 -190 L 350 -180 C 384 -170 392 -140 390 -60 Z";
    var inner = [];
    inner.push(VT.shape(body, o.color || C.sea, { sw: 7 }));
    inner.push(VT.shape("M -170 -190 L -108 -292 L 40 -292 L 40 -190 Z", "#DDEFF5", { sw: 6 }));
    inner.push(VT.shape("M 62 -190 L 62 -292 L 168 -292 C 186 -292 196 -286 206 -272 L 262 -190 Z", "#DDEFF5", { sw: 6 }));
    inner.push(VT.shape("M 110 -190 L 104 -262 C 104 -276 130 -280 134 -266 L 146 -190 Z", "#8E5527", { sw: 4, ox: 2, oy: 2 }));
    inner.push(VT.ell(122, -280, 16, 10, "#8E5527", 4));
    inner.push(VT.line("M 196 -228 C 214 -248 228 -232 222 -212", 7));
    inner.push(VT.line("M 50 -180 L 50 -70", 4, INK, 0.6) + VT.line("M -80 -150 L -50 -150", 6) + VT.line("M 110 -150 L 140 -150", 6));
    inner.push(VT.shape("M 330 -150 L 384 -146 L 384 -120 L 336 -124 Z", "#F6E7A6", { sw: 4 }));
    inner.push(VT.shape("M -384 -140 L -360 -140 L -360 -110 L -384 -110 Z", C.accent2, { sw: 4 }));
    if (o.snow) {
      inner.push(VT.shape("M -390 -150 C -360 -230 -200 -200 -130 -320 C -60 -380 160 -380 230 -316 C 280 -250 330 -220 394 -170 C 380 -150 -380 -140 -390 -150 Z", C.snow, { sw: 6 }));
      inner.push(VT.shape("M -170 -190 L -108 -292 L 40 -292 L 40 -190 Z M 62 -190 L 62 -292 L 168 -292 L 262 -190 Z", "#F1F8FB", { sw: 5 }));
    }
    out.push(VT.g("translate(0 " + f(jig) + ")", inner.join("")));
    [-240, 230].forEach(function (x) { out.push(VT.ell(x, -50, 62, 62, "#2b2f33", 7) + VT.ell(x, -50, 26, 26, "#9aa3a8", 5)); });
    if (o.snow) out.push(VT.shape("M -420 0 C -300 -60 -180 -40 -60 -30 C 100 -50 260 -60 420 0 Z", C.snow, { sw: 6 }));
    out.push(VT.line("M -380 -70 L -420 -70", 12));
    if (o.run != null) for (var i = 0; i < 4; i++) {
      var p = ((o.run * 0.9 + i * 0.25) % 1), r = 22 + p * 60;
      out.push('<g opacity="' + f((1 - p) * 0.9 * 100) / 100 + '">' + VT.ell(-440 - p * 260, -80 - p * 160, r, r * 0.8, "#ffffff", 4) + "</g>");
    }
    return wrap(o, out.join(""));
  };

  // ---------- cốc trà, hơi, khối trà ----------
  var CUP = "M -60 -130 L -50 0 C -48 10 48 10 50 0 L 60 -130 Z";
  /** Hơi bốc từ miệng cốc: gốc ở miệng cốc (0,0), cột hơi đi lên. frozen 0..1: 0 = hơi mềm uốn theo t, 1 = đông cứng thành que băng (giữ nguyên dáng lúc đông). */
  VT.steam = function (o) {
    var out = [], t = o.t || 0, fz = o.frozen || 0, tf = o.tFreeze == null ? t : o.tFreeze, n = o.n || 3;
    for (var i = 0; i < n; i++) {
      var tt = fz > 0 ? tf : t, ph = Math.round(tt * 12) * 0.55 + i * 2, x = -30 + i * 30, pts = [];
      for (var k = 0; k < 5; k++) pts.push([x + Math.sin(ph + k * 1.3) * 14, -20 - k * 40]);
      var d = VT.smooth(pts, false);
      if (fz < 0.5) out.push(VT.line(d, 15) + VT.line(d, 8, "#ffffff"));
      else {
        out.push(VT.line(d, 17) + VT.line(d, 10, C.frost));
        out.push(VT.line(d, 3, "#ffffff", 0.9));
        if (o.sparkle !== false) out.push(VT.sparkle({ x: pts[4][0] + 6, y: pts[4][1] - 6, s: 0.38 }));
      }
    }
    return wrap(o, out.join(""));
  };
  /** Cốc: gốc giữa đáy. state hot|frozen|empty|flip (lộn ngược, miệng xuống, gốc vẫn ở đáy cốc lúc đứng). */
  VT.cup = function (o) {
    var out = [], st = o.state || "hot", col = o.color || C.accent;
    var handle = VT.line("M 60 -100 C 110 -100 110 -30 54 -30", 10) + VT.line("M 60 -100 C 110 -100 110 -30 54 -30", 4, col);
    if (st === "flip") return wrap(o, VT.g("rotate(180 0 -65)", VT.shape(CUP, col, { sw: 6 }) + handle + VT.ell(0, -130, 60, 14, "#3a2a20", 5, { ox: 0, oy: 0 })));
    if (st === "hot" && o.steam !== false) out.push(VT.steam({ x: 0, y: -130, t: o.t }));
    if (st === "frozen" && o.steam !== false) out.push(VT.steam({ x: 0, y: -130, t: o.t, frozen: 1, tFreeze: o.tFreeze }));
    out.push(VT.shape(CUP, col, { sw: 6 }));
    out.push(VT.ell(0, -130, 60, 14, st === "frozen" ? "#D7EEF7" : st === "empty" ? "#3a2a20" : C.tea, 6, { ox: 0, oy: 0 }));
    out.push(handle);
    if (st === "frozen") out.push('<path d="M -60 -130 L -54 -60 L -40 -90 L -30 -70 L -20 -120 Z" fill="#ffffff" opacity="0.85"/>');
    return wrap(o, out.join(""));
  };
  /** Khối trà đông đúng dáng lòng cốc (cụt nón): gốc tâm khối. stick: có que hơi băng cắm trên. */
  VT.teaBlock = function (o) {
    var out = VT.shape("M -54 -60 L -46 58 C -44 66 44 66 46 58 L 54 -60 C 30 -68 -30 -68 -54 -60 Z", "#6B3B1C", { sw: 6 });
    out += VT.ell(0, -60, 54, 12, "#8A5230", 5, { ox: 0, oy: 0 });
    out += VT.line("M -36 -30 L -30 34", 6, C.frost, 0.9) + VT.line("M 14 -40 L 30 -6", 5, C.frost, 0.8);
    out += '<path d="M -54 -60 L -44 -20 L -34 -46 L -22 -30 L -14 -62 Z" fill="#ffffff" opacity="0.7"/>';
    return wrap(o, out);
  };
  /** Vũng nước: gốc giữa. */
  VT.puddle = function (o) { return wrap(o, VT.shape("M -200 0 C -200 -24 -60 -30 40 -24 C 160 -30 230 -14 220 4 C 200 24 -160 26 -200 0 Z", "#BFE0EE", { sw: 4, op: 0.85 })); };

  // ---------- tủ đông khổng lồ ----------
  /** Tủ đông chiếm khung 230..1690 × 90..1000 (toạ độ thế giới). part: "body" (thân + lòng tủ + contents) | "door" | "all".
   *  contents: SVG đặt trong lòng tủ (mặc định: dãy nhà phủ tuyết + bụi băng). close 0..1 (0 = cửa mở hé, 1 = đóng kín). */
  VT.freezer = function (o) {
    var out = [], close = o.close || 0, part = o.part || "all";
    if (part !== "door") {
      out.push(VT.shape("M 230 90 L 1690 90 L 1690 1000 L 230 1000 Z", "#EEF4F6", { sw: 9, ox: 10, oy: 8 }));
      out.push(VT.shape("M 300 160 L 1620 160 L 1620 930 L 300 930 Z", "#D6EAF2", { sw: 6 }));
      out.push(VT.line("M 300 160 L 360 210 L 1560 210 L 1620 160 M 360 210 L 360 880 L 300 930 M 1560 210 L 1560 880 L 1620 930 M 360 880 L 1560 880", 3, INK, 0.5));
      out.push(VT.shape("M 300 840 C 600 820 1300 830 1620 840 L 1620 930 L 300 930 Z", C.snow, { sw: 5 }));
      if (o.contents != null) out.push(o.contents);
      else {
        [[430, 0.3], [600, 0.26], [780, 0.32], [960, 0.27], [1140, 0.31], [1320, 0.26], [1480, 0.29]].forEach(function (h, i) {
          out.push(VT.house({ x: h[0], y: 860, s: h[1], smokeTop: -1900, t: o.t, seed: i, faint: true }));
        });
        out.push(VT.diamondDust(o.t || 0, 14, [380, 240, 1540, 800]));
      }
      out.push('<path d="M 300 160 L 520 160 L 470 190 L 420 176 L 370 214 L 330 196 L 300 240 Z" fill="#ffffff" opacity="0.9"/><path d="M 1620 160 L 1400 160 L 1450 192 L 1500 178 L 1560 220 L 1590 200 L 1620 250 Z" fill="#ffffff" opacity="0.9"/>');
    }
    if (part === "body") return out.join("");
    var c = -0.14 + close * 1.14, w = 1460 * c, sk = (1 - Math.abs(c)) * 70, x2 = 1690 - w;
    out.push(VT.shape("M 1690 90 L " + f(x2) + " " + f(90 - sk) + " L " + f(x2) + " " + f(1000 + sk) + " L 1690 1000 Z", "#F5F9FA", { sw: 9, ox: c > 0 ? 8 : -8, oy: 8 }));
    if (c > 0.3) out.push(VT.shape("M " + f(x2 + 60 * c) + " 380 L " + f(x2 + 90 * c) + " 380 L " + f(x2 + 90 * c) + " 700 L " + f(x2 + 60 * c) + " 700 Z", "#9aa3a8", { sw: 6 }));
    if (c > 0.3) out.push(VT.line("M " + f(x2 + 20 * c) + " 120 L " + f(x2 + 20 * c) + " 970", 4, INK, 0.4));
    if (c > 0.95) {
      out.push(VT.line("M 300 150 L 1640 150 L 1640 940 L 300 940 Z", 3, INK, 0.35));
      out.push('<path d="M 255 92 L 520 92 L 440 130 L 380 118 L 320 170 L 255 140 Z" fill="#DDF1FA"/><path d="M 1688 998 L 1420 998 L 1500 960 L 1560 972 L 1620 920 L 1688 950 Z" fill="#DDF1FA"/>');
      out.push(VT.line("M 700 300 l 40 0 M 720 280 l 0 40 M 706 286 l 28 28 M 734 286 l -28 28", 4, "#9cc8dc") + VT.line("M 1300 700 l 50 0 M 1325 675 l 0 50 M 1307 682 l 36 36 M 1343 682 l -36 36", 4, "#9cc8dc"));
    }
    return out.join("");
  };
})();
