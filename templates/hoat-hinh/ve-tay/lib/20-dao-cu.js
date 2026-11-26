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

/* ve-tay · đạo cụ thêm 18/11/2026 (tập 1 Oymyakon, các đoạn d02–d17). Chỉ thêm, không đổi hàm cũ.
 * Mọi hàm nhận o = {x, y, s, rot, sx, ...}, trả SVG; gốc toạ độ ghi ở đầu mỗi hàm. Không chữ (trừ khi truyền qua VT.text).
 */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f, INK = C.ink, wrap = VT.wrap;

  /** Bút chì to: gốc ở ĐẦU NGÒI, thân chĩa lên (rot xoay quanh ngòi, mặc định 30°). len: dài (300). */
  VT.pencil = function (o) {
    var L = o.len || 300;
    var inner = VT.shape("M 0 0 L -14 -40 L 14 -40 Z", C.woodLight, { sw: 4, ox: 1, oy: 1 }) + VT.shape("M 0 0 L -5 -14 L 5 -14 Z", INK, { sw: 0, ox: 0, oy: 0 }) +
      VT.shape("M -14 -40 L -14 " + (-L + 50) + " L 14 " + (-L + 50) + " L 14 -40 Z", "#F2C14E", { sw: 5 }) +
      VT.line("M 0 -44 L 0 " + (-L + 54), 3, INK, 0.35) +
      VT.shape("M -15 " + (-L + 50) + " L -15 " + (-L + 26) + " L 15 " + (-L + 26) + " L 15 " + (-L + 50) + " Z", "#A9B3B8", { sw: 4 }) +
      VT.shape("M -14 " + (-L + 26) + " L -14 " + (-L + 6) + " C -14 " + (-L - 4) + " 14 " + (-L - 4) + " 14 " + (-L + 6) + " L 14 " + (-L + 26) + " Z", "#E88C8C", { sw: 4 });
    return VT.g(VT.tr(o.x || 0, o.y || 0, o.s == null ? 1 : o.s, o.rot == null ? 30 : o.rot), inner);
  };

  /** Que gỗ: gốc ở đầu dưới, dài len (260) hướng lên. broken: chỉ còn nửa dưới (gãy). */
  VT.stick = function (o) {
    var L = o.len || 260, top = o.broken ? -L * 0.5 : -L;
    var d = "M 0 0 C 3 " + f(top * 0.3) + " -4 " + f(top * 0.7) + " 2 " + f(top);
    var out = VT.line(d, 16) + VT.line(d, 8, C.woodLight);
    if (o.broken) out += VT.line("M -8 " + f(top + 4) + " L -3 " + f(top - 8) + " L 2 " + f(top + 2) + " L 7 " + f(top - 10) + " L 10 " + f(top + 4), 4);
    else out += VT.line("M 0 " + f(top * 0.55) + " l 22 -26", 7) + VT.line("M 0 " + f(top * 0.55) + " l 22 -26", 3, C.woodLight);
    return wrap(o, out);
  };

  /** Máy ảnh nhỏ: gốc tâm thân (180×110). side "front" (ống kính) | "back" (màn hình). screen: on|off. eye: [px, py] -1..1 cho ống kính "nhìn" (mặt trước). */
  VT.photoCam = function (o) {
    var out = [], side = o.side || "front";
    out.push(VT.shape("M -60 -55 L -40 -76 L 10 -76 L 24 -55 Z", "#3c4448", { sw: 5 }));
    out.push(VT.shape("M -90 -55 L 90 -55 L 90 55 L -90 55 Z", "#4a5358", { sw: 6 }));
    out.push(VT.shape("M 50 -70 L 76 -70 L 76 -55 L 50 -55 Z", C.accent2, { sw: 4 }));
    if (side === "front") {
      var e = o.eye || [0, 0];
      out.push(VT.ell(0, 2, 44, 44, "#2b3134", 6));
      out.push(VT.ell(0, 2, 30, 30, o.screen === "off" ? "#1d2224" : "#5e7f8f", 5));
      out.push(VT.dot(e[0] * 10, 2 + e[1] * 10, 11, "#11161a"));
      if (o.screen !== "off") out.push(VT.dot(e[0] * 10 + 7, e[1] * 10 - 6, 6, "#ffffff"));
      out.push(VT.ell(-66, -36, 10, 7, "#FFF4C8", 3));
    } else {
      var on = o.screen !== "off";
      out.push(VT.shape("M -66 -38 L 46 -38 L 46 40 L -66 40 Z", on ? "#9fd3e6" : "#15191b", { sw: 5 }));
      if (on) out.push(VT.line("M -50 20 L -20 -6 L 0 12 L 24 -16", 4, "#ffffff", 0.8) + VT.dot(26, -24, 7, "#FFF4C8"));
      else out.push(VT.line("M -56 -28 L -40 -28", 4, "#ffffff", 0.25));
      out.push(VT.ell(70, -10, 9, 9, "#2b3134", 4) + VT.ell(70, 22, 9, 9, "#2b3134", 4));
    }
    return wrap(o, out.join(""));
  };

  /** Biển tên làng nhỏ trên hai cọc: gốc giữa chân cọc, cao ~290, rộng w (260). icon: "monument" | "slab" | "thermo" | null (có cả text thì icon dồn sang trái).
   *  text: chữ (phải có trong chu_tren_do_vat), size. board: màu tấm biển. */
  VT.signTiny = function (o) {
    var out = [], hw = (o.w || 260) / 2, both = o.text && o.icon, ix = both ? -hw + 46 : 0, tx = both ? 34 : 0;
    out.push(VT.line("M -70 0 L -70 -190", 12) + VT.line("M 70 0 L 70 -190", 12) + VT.line("M -70 0 L -70 -190", 5, C.woodLight) + VT.line("M 70 0 L 70 -190", 5, C.woodLight));
    out.push(VT.shape("M " + (-hw) + " -280 L " + hw + " -280 L " + hw + " -160 L " + (-hw) + " -160 Z", o.board || C.white, { sw: 6, ox: 5, oy: 4 }));
    out.push(VT.shape("M " + (-hw - 6) + " -282 C -60 -300 60 -296 " + (hw + 6) + " -284 L " + hw + " -276 L " + (-hw) + " -276 Z", C.snow, { sw: 4 }));
    if (o.icon === "monument") out.push(VT.monument({ x: ix, y: -170, s: 0.17, plain: true }));
    if (o.icon === "slab") out.push(VT.monumentSlab({ x: ix, y: -172, s: 0.17, plain: true }));
    if (o.icon === "thermo") out.push(VT.thermoMini({ x: ix, y: -170, s: 0.45, level: 0.15, color: C.iceDeep }));
    if (o.text) out.push(VT.text(tx, -204, o.text, o.size || 48, { w: 900 }));
    return wrap(o, out.join(""));
  };

  /** Dấu X đỏ to như đóng mực: gốc tâm, rộng ~360. k 0..1: đập xuống (to, mờ → đúng cỡ, đậm). */
  VT.bigX = function (o) {
    var k = o.k == null ? 1 : VT.clamp(o.k, 0, 1), sc = 1 + 0.9 * (1 - VT.ease.out(k)), op = 0.35 + 0.65 * k;
    var a = "M -170 -150 C -90 -80 -20 -10 40 50 C 90 100 130 140 170 168 L 140 196 C 90 150 40 100 -10 52 C -70 -6 -130 -70 -196 -128 Z";
    var b = "M 176 -160 C 110 -90 50 -20 0 34 C -60 98 -110 150 -160 186 L -186 156 C -130 110 -80 60 -30 4 C 20 -50 80 -120 146 -186 Z";
    var col = o.color || "#C8382A";
    return VT.g(VT.tr(o.x || 0, o.y || 0, (o.s == null ? 1 : o.s) * sc, o.rot == null ? -4 : o.rot), '<g opacity="' + f(op) + '">' + VT.shape(a, col, { sw: 5, ox: 4, oy: 3 }) + VT.shape(b, col, { sw: 5, ox: 4, oy: 3 }) + "</g>");
  };

  /** Vương miện băng: gốc giữa đáy vành, rộng ~180. glint 0..1: lấp lánh. */
  VT.iceCrown = function (o) {
    var out = VT.shape("M -84 0 L -92 -70 L -56 -34 L -30 -96 L 0 -40 L 30 -96 L 56 -34 L 92 -70 L 84 0 Z", C.ice, { sw: 5, ox: 3, oy: 3 });
    out += VT.shape("M -86 0 L 86 0 L 84 -18 L -84 -18 Z", "#DDF3FC", { sw: 4 });
    out += VT.line("M -60 -20 L -40 -64", 4, "#ffffff", 0.9) + VT.line("M 8 -24 L 26 -70", 4, "#ffffff", 0.9);
    [-30, 30].forEach(function (x) { out += VT.ell(x, -96, 9, 9, "#ffffff", 3); });
    if (o.glint) out += VT.sparkle({ x: 40, y: -112, s: 0.45 * o.glint }) + VT.sparkle({ x: -72, y: -84, s: 0.3 * o.glint });
    return wrap(o, out);
  };

  /** Cờ trơn không chữ: gốc chân cán, cán cao 284. t: bay phấp phới theo bậc hình. color. */
  VT.flag = function (o) {
    var t = o.t || 0, ph = Math.round(t * 12) * 0.8, w = Math.sin(ph) * 10, w2 = Math.cos(ph * 1.3) * 8;
    var cloth = "M 6 -276 C 50 " + f(-290 + w) + " 90 " + f(-262 - w) + " 140 " + f(-274 + w2) + " L 140 " + f(-184 + w2) + " C 90 " + f(-172 - w) + " 50 " + f(-200 + w) + " 6 -188 Z";
    return wrap(o, VT.shape(cloth, o.color || C.accent2, { sw: 5 }) + VT.line("M 0 0 L 0 -284", 9) + VT.dot(0, -290, 9, "#E8C25A"));
  };

  /** Ống nhòm (mặt kính hướng xuống/ra trước): gốc giữa hai ống. */
  VT.binoculars = function (o) {
    var out = "";
    [-34, 34].forEach(function (x) { out += VT.shape("M " + (x - 26) + " -44 L " + (x + 26) + " -44 L " + (x + 30) + " 44 L " + (x - 30) + " 44 Z", "#3c4448", { sw: 5 }) + VT.ell(x, 44, 30, 12, "#9fd3e6", 5); });
    out += VT.shape("M -10 -20 L 10 -20 L 10 20 L -10 20 Z", "#2b3134", { sw: 4 });
    return wrap(o, out);
  };

  /** Ghế máy bay (lưng + đệm): gốc giữa đáy, cao ~520, đệm ngồi ở y = −170..−90. color. */
  VT.planeSeat = function (o) {
    var col = o.color || C.sea, out = "";
    if (!o.cushionOnly) {
      out += VT.shape("M -130 -170 C -150 -330 -140 -480 -110 -510 C -60 -530 60 -530 110 -510 C 140 -480 150 -330 130 -170 Z", col, { sw: 6, ox: 6, oy: 4 });
      out += VT.shape("M -90 -500 C -40 -512 40 -512 90 -500 L 92 -440 L -92 -440 Z", "#F4F0E4", { sw: 5 });
      out += VT.line("M -100 -390 C -60 -360 60 -360 100 -390", 3, INK, 0.35);
    }
    if (!o.backOnly) {
      out += VT.shape("M -150 -170 L 150 -170 C 170 -170 176 -110 160 -90 L -160 -90 C -176 -110 -170 -170 -150 -170 Z", col, { sw: 6, ox: 4, oy: 4 });
      out += VT.line("M -110 -90 L -110 0 M 110 -90 L 110 0", 12) + VT.line("M -150 0 L 150 0", 8, INK, 0.5);
    }
    return wrap(o, out);
  };
  /** Cửa sổ máy bay bo tròn: gốc tâm, ~170×300. t: tuyết bay ngang ngoài cửa. */
  VT.planeWindow = function (o) {
    var id = VT.uid("pw"), t = o.t || 0, flakes = "";
    var win = "M -60 -80 C -60 -110 60 -110 60 -80 L 60 80 C 60 110 -60 110 -60 80 Z";
    for (var i = 0; i < 9; i++) {
      var x = -80 + ((VT.hash(i * 3.7) * 160 + t * 260 * (0.7 + VT.hash(i) * 0.6)) % 160), y = -100 + VT.hash(i * 7.1) * 200 + Math.sin(t * 2 + i) * 6;
      flakes += VT.dot(x, y, 4 + VT.hash(i * 2.2) * 3, "#ffffff");
    }
    return wrap(o, VT.shape("M -84 -112 C -84 -150 84 -150 84 -112 L 84 112 C 84 150 -84 150 -84 112 Z", "#E9E3D2", { sw: 6, ox: 4, oy: 4 }) +
      '<clipPath id="' + id + '"><path d="' + win + '"/></clipPath><path d="' + win + '" fill="#9EB7C6"/>' +
      '<g clip-path="url(#' + id + ')">' + VT.shape("M -80 60 C -30 40 30 50 80 30 L 80 120 L -80 120 Z", "#F4FAFC", { sw: 3 }) + flakes + "</g>" +
      '<path d="' + win + '" fill="none" stroke="' + INK + '" stroke-width="6"/>' + VT.line("M -40 -70 L -20 -90", 4, "#ffffff", 0.7));
  };

  /** Xe hộp nhỏ: gốc giữa đáy, dài ~440. Ô cửa sổ để TRỐNG (vẽ Wob trước rồi vẽ xe để thấy Wob ngồi trong).
   *  Ô cửa: x −40..120, y −250..−150 (hệ xe, s = 1). run: thời gian (rung + khói), lights: chùm đèn pha, color, snow. */
  VT.boxCar = function (o) {
    var jig = o.run != null ? (VT.hash(Math.round(o.run * 12) * 4.7) - 0.5) * 5 : 0, col = o.color || C.accent, out = [];
    var bodyD = "M -210 -40 L -210 -170 C -210 -184 -200 -190 -186 -190 L -80 -190 L -60 -270 C -56 -282 -48 -286 -36 -286 L 150 -286 C 164 -286 172 -278 174 -266 L 190 -190 L 196 -190 C 210 -190 220 -180 220 -166 L 220 -40 Z";
    var hole = "M -40 -250 L 110 -250 L 120 -150 L -40 -150 Z";
    var inner = [];
    if (o.lights) inner.push('<path d="M 216 -130 L 900 -230 L 900 30 Z" fill="' + C.lampLight + '" opacity="0.35"/>');
    inner.push(VT.shape(bodyD + " " + hole, col, { sw: 7, rule: "evenodd" }));
    inner.push('<path d="' + hole + '" fill="none" stroke="' + INK + '" stroke-width="6"/>');
    inner.push(VT.shape("M -190 -180 L -96 -180 L -80 -250 L -150 -250 Z", "#DDEFF5", { sw: 5 }));
    inner.push(VT.line("M -60 -150 L -60 -50", 4, INK, 0.5) + VT.line("M -30 -120 L 0 -120", 6));
    inner.push(VT.shape("M 200 -150 L 224 -148 L 224 -120 L 200 -122 Z", "#F6E7A6", { sw: 4 }));
    inner.push(VT.shape("M -214 -150 L -200 -150 L -200 -120 L -214 -120 Z", C.accent2, { sw: 4 }));
    if (o.snow) inner.push(VT.shape("M -70 -286 C -40 -320 140 -322 180 -288 C 150 -280 -40 -280 -70 -286 Z", C.snow, { sw: 5 }));
    out.push(VT.g("translate(0 " + f(jig) + ")", inner.join("")));
    [-130, 140].forEach(function (x) { out.push(VT.ell(x, -40, 48, 48, "#2b2f33", 7) + VT.ell(x, -40, 20, 20, "#9aa3a8", 5)); });
    if (o.run != null) for (var i = 0; i < 3; i++) {
      var p = ((o.run * 0.9 + i * 0.33) % 1), r = 16 + p * 44;
      out.push('<g opacity="' + f((1 - p) * 0.9 * 100) / 100 + '">' + VT.ell(-250 - p * 200, -70 - p * 120, r, r * 0.8, "#ffffff", 4) + "</g>");
    }
    return wrap(o, out.join(""));
  };

  /** Cột bơm xăng (không chữ): gốc giữa đáy, cao ~330. hose: có vòi (mặc định có). lit: màn hình sáng (mặc định sáng). */
  VT.gasPump = function (o) {
    var out = VT.shape("M -80 0 L -80 -300 C -80 -320 80 -320 80 -300 L 80 0 Z", o.color || C.accent2, { sw: 6, ox: 5, oy: 4 });
    out += VT.shape("M -54 -270 L 54 -270 L 54 -200 L -54 -200 Z", o.lit === false ? "#3a4146" : "#CFEFC8", { sw: 5 });
    out += VT.line("M -36 -246 L 30 -246 M -36 -224 L 10 -224", 5, INK, 0.45);
    out += VT.shape("M -40 -170 L 40 -170 L 40 -110 L -40 -110 Z", C.white, { sw: 4 });
    out += VT.shape("M -96 0 L 96 0 L 90 -26 L -90 -26 Z", "#9aa3a8", { sw: 5 });
    if (o.hose !== false) out += VT.line("M 80 -150 C 140 -150 150 -60 120 -40 C 104 -30 96 -60 100 -110", 10) + VT.shape("M 88 -150 L 112 -150 L 118 -112 L 94 -110 Z", "#2b3134", { sw: 4 });
    return wrap(o, out);
  };
  /** Trạm xăng đơn độc (không chữ): gốc giữa mặt đất dưới mái, rộng ~1300 (mái x −560..320, nhà x 260..620). glow 0..1: quầng đèn. */
  VT.gasStation = function (o) {
    var g = o.glow == null ? 1 : o.glow, out = [];
    out.push('<ellipse cx="0" cy="-40" rx="' + f(760 * (0.7 + 0.3 * g)) + '" ry="' + f(300 * (0.7 + 0.3 * g)) + '" fill="' + C.lampLight + '" opacity="' + f(0.28 * g) + '"/>');
    out.push(VT.shape("M 260 0 L 260 -300 L 620 -300 L 620 0 Z", "#B98A5E", { sw: 6 }));
    out.push(VT.shape("M 240 -300 L 640 -300 L 620 -340 L 260 -340 Z", C.snow, { sw: 5 }));
    out.push(VT.shape("M 300 -230 L 440 -230 L 440 -120 L 300 -120 Z", C.window, { sw: 5 }));
    out.push(VT.shape("M 480 -200 L 570 -200 L 570 0 L 480 0 Z", "#5c3a22", { sw: 5 }));
    out.push(VT.line("M -420 0 L -420 -420 M 180 0 L 180 -420", 18) + VT.line("M -420 0 L -420 -420 M 180 0 L 180 -420", 8, "#E9E3D2"));
    out.push(VT.shape("M -560 -420 L 320 -420 L 320 -500 L -560 -500 Z", C.white, { sw: 7, ox: 6, oy: 5 }));
    out.push(VT.shape("M -560 -455 L 320 -455 L 320 -430 L -560 -430 Z", C.accent2, { sw: 0, ox: 0, oy: 0 }));
    out.push(VT.shape("M -580 -500 C -300 -540 100 -536 340 -502 L 320 -496 L -560 -496 Z", C.snow, { sw: 5 }));
    [-380, -120, 140].forEach(function (x) { out.push(VT.ell(x, -412, 50, 10, g > 0.2 ? "#FFF4C8" : "#C9C3B2", 4)); });
    if (o.pumps !== false) out.push(VT.gasPump({ x: -260, y: 0, s: 0.8 }) + VT.gasPump({ x: 20, y: 0, s: 0.8 }));
    out.push(VT.shape("M -300 0 L 60 0 L 60 -16 L -300 -16 Z", "#9aa3a8", { sw: 4 }));
    return wrap(o, out.join(""));
  };

  /** Lều chớp đặt nhiệt kế (hộp trắng nan chớp trên bốn chân) + cột gió, vẽ tay kiểu sổ: gốc giữa đáy, cao ~620. old: tông giấy cũ. */
  VT.weatherStation = function (o) {
    var paper = o.old ? "#F1E6CC" : C.white, out = [];
    out.push(VT.line("M 220 0 L 220 -600", 8) + VT.line("M 150 -560 L 290 -560", 6));
    [150, 290].forEach(function (x) { out.push(VT.shape("M " + (x - 22) + " -560 C " + (x - 22) + " -590 " + (x + 22) + " -590 " + (x + 22) + " -560 Z", paper, { sw: 5 })); });
    out.push(VT.shape("M 220 -600 L 280 -620 L 270 -600 L 280 -584 Z", C.accent, { sw: 4 }));
    out.push(VT.line("M -150 0 L -140 -250 M 130 0 L 120 -250 M -110 0 L -104 -240 M 90 0 L 86 -240", 8));
    out.push(VT.shape("M -170 -250 L 150 -250 L 150 -470 L -170 -470 Z", paper, { sw: 7, ox: 6, oy: 5 }));
    out.push(VT.shape("M -190 -470 L -10 -540 L 170 -470 Z", paper, { sw: 6, ox: 4, oy: 3 }));
    for (var y = -450; y < -260; y += 22) out.push(VT.line("M -150 " + y + " L -20 " + (y + 10) + " M 0 " + y + " L 130 " + (y + 10), 3.5, INK, 0.55));
    out.push(VT.line("M -10 -470 L -10 -250", 5));
    out.push(VT.line("M -220 0 L 330 0", 6, INK, 0.5));
    return wrap(o, out.join(""));
  };

  /** Đài tưởng niệm vẽ chung, tối giản (bệ hai bậc + cột nhiệt kế cách điệu; KHÔNG chép thiết kế thật): gốc giữa đáy, cao ~620. plain: nét dày đơn giản (biểu tượng nhỏ). */
  VT.monument = function (o) {
    var out = [], sw = o.plain ? 14 : 6;
    out.push(VT.shape("M -260 0 L 260 0 L 240 -70 L -240 -70 Z", "#B7B2A6", { sw: sw }));
    out.push(VT.shape("M -180 -70 L 180 -70 L 166 -170 L -166 -170 Z", "#CBC6B9", { sw: sw }));
    out.push(VT.shape("M -54 -170 L -54 -560 C -54 -610 54 -610 54 -560 L 54 -170 Z", "#E9E6DE", { sw: sw }));
    out.push('<rect x="-14" y="-540" width="28" height="300" fill="' + C.accent2 + '"/>');
    out.push(VT.ell(0, -230, 52, 52, C.accent2, sw));
    if (!o.plain) {
      for (var i = 0; i < 8; i++) out.push(VT.line("M 22 " + (-520 + i * 36) + " L 40 " + (-520 + i * 36), 4));
      out.push(VT.shape("M -260 0 C -120 -24 120 -24 260 0 L 270 6 L -270 6 Z", C.snow, { sw: 4 }));
      out.push(VT.shape("M -60 -580 C -30 -620 30 -620 60 -580 C 30 -590 -30 -590 -60 -580 Z", C.snow, { sw: 4 }));
    }
    return wrap(o, out.join(""));
  };

  /** Nhiệt kế nhỏ KHÔNG số: gốc đáy bầu, cao ~240. level 0..1, color chất lỏng (đỏ ấm / xanh lạnh). */
  VT.thermoMini = function (o) {
    var lv = VT.clamp(o.level == null ? 0.5 : o.level, 0, 1), col = o.color || C.accent2, top = -210, bot = -60, yl = bot - (bot - top) * lv, out = "";
    out += VT.shape("M -18 -50 L -18 -214 C -18 -238 18 -238 18 -214 L 18 -50 Z", "#F4FAFC", { sw: 5 });
    out += '<rect x="-8" y="' + f(yl) + '" width="16" height="' + f(Math.max(0, -30 - yl)) + '" fill="' + col + '"/>';
    out += VT.ell(0, -32, 32, 32, col, 6);
    for (var i = 0; i < 5; i++) out += VT.line("M 22 " + (top + 16 + i * 30) + " L 34 " + (top + 16 + i * 30), 3.5);
    out += VT.line("M -8 -200 L -8 -70", 3, "#ffffff", 0.7);
    return wrap(o, out);
  };

  /** Quả địa cầu phác tay: CHỈ lưới kinh vĩ (không vẽ lục địa, biên giới; bản đồ thật phải vẽ bằng ve_ban_do.mjs). Gốc tâm (x, y), bán kính r.
   *  lat0: vĩ độ tâm nhìn (độ). lats: các vĩ tuyến mảnh. dashed: {lat, k vẽ dần 0..1, color} vĩ tuyến nét đứt. meridians: số kinh tuyến.
   *  VT.globePt(o, lat, lon) → [x, y, z] (z > 0 là mặt trước; lon tính từ kinh tuyến giữa). VT.globeLat(o, lat) → các đoạn path mặt trước. */
  VT.globePt = function (o, lat, lon) {
    var r = o.r || 300, p = lat * Math.PI / 180, l = lon * Math.PI / 180, p0 = (o.lat0 == null ? 50 : o.lat0) * Math.PI / 180;
    return [(o.x || 0) + r * Math.cos(p) * Math.sin(l), (o.y || 0) - r * (Math.sin(p) * Math.cos(p0) - Math.cos(p) * Math.sin(p0) * Math.cos(l)), Math.sin(p) * Math.sin(p0) + Math.cos(p) * Math.cos(p0) * Math.cos(l)];
  };
  function globeCurve(fn, n) {
    var segs = [], cur = [];
    for (var i = 0; i <= n; i++) { var q = fn(i / n); if (q[2] > 0.02) cur.push([q[0], q[1]]); else if (cur.length) { segs.push(cur); cur = []; } }
    if (cur.length) segs.push(cur);
    return segs.filter(function (s) { return s.length > 2; }).map(function (s) { return VT.smooth(s, false); });
  }
  VT.globeLat = function (o, lat, n) { return globeCurve(function (u) { return VT.globePt(o, lat, -180 + 360 * u); }, n || 72); };
  VT.globe = function (o) {
    var r = o.r || 300, cx = o.x || 0, cy = o.y || 0, out = [], M = o.meridians || 8;
    var g = { x: cx, y: cy, r: r, lat0: o.lat0 };
    out.push(VT.ell(cx, cy, r, r, o.fill || "#CFE6EE", 7, { ox: 8, oy: 6 }));
    for (var m = 0; m < M; m++) (function (lon) {
      globeCurve(function (u) { return VT.globePt(g, -90 + 180 * u, lon); }, 48).forEach(function (d) { out.push(VT.line(d, 3, INK, 0.3)); });
    })(m * 360 / M);
    (o.lats || [0, 30, 60]).forEach(function (la) { VT.globeLat(g, la).forEach(function (d) { out.push(VT.line(d, 3, INK, 0.4)); }); });
    if (o.dashed) VT.globeLat(g, o.dashed.lat, 120).forEach(function (d) { out.push(VT.lineDraw(d, o.dashed.k == null ? 1 : o.dashed.k, 8, o.dashed.color || C.accent2, { dash: "0.03 0.025" })); });
    var np = VT.globePt(g, 90, 0);
    if (np[2] > 0) out.push(VT.dot(np[0], np[1], 8));
    out.push(VT.line("M " + f(cx - r * 0.55) + " " + f(cy - r * 0.62) + " C " + f(cx - r * 0.75) + " " + f(cy - r * 0.35) + " " + f(cx - r * 0.8) + " " + f(cy - r * 0.1) + " " + f(cx - r * 0.78) + " " + f(cy + r * 0.1), 10, "#ffffff", 0.5));
    return out.join("");
  };

  /** Nắp chụp trong suốt to (kiểu lồng bàn đậy bánh): gốc giữa mép dưới, rộng w (1200), cao h (520). op: độ đục mặt nắp. */
  VT.domeLid = function (o) {
    var w = o.w || 1200, h = o.h || 520, hw = w / 2;
    var d = "M " + (-hw) + " 0 C " + f(-hw) + " " + f(-h * 1.33) + " " + f(hw) + " " + f(-h * 1.33) + " " + hw + " 0";
    var out = '<path d="' + d + ' Z" fill="#E8F6FC" opacity="' + (o.op == null ? 0.35 : o.op) + '"/>' + VT.line(d, 7);
    out += VT.line("M " + f(-hw - 14) + " 0 L " + f(hw + 14) + " 0", 9);
    out += VT.line("M " + f(-hw * 0.72) + " " + f(-h * 0.4) + " C " + f(-hw * 0.6) + " " + f(-h * 0.78) + " " + f(-hw * 0.3) + " " + f(-h * 0.92) + " " + f(-hw * 0.05) + " " + f(-h * 0.95), 12, "#ffffff", 0.75);
    out += VT.shape("M -40 " + f(-h * 0.99) + " C -40 " + f(-h * 0.99 - 50) + " 40 " + f(-h * 0.99 - 50) + " 40 " + f(-h * 0.99) + " Z", C.white, { sw: 6 });
    return wrap(o, out);
  };

  /** Mây bông: gốc tâm, rộng ~310. fill. */
  VT.cloud = function (o) {
    return wrap(o, VT.shape(VT.smooth([[-150, 30], [-140, -20], [-90, -50], [-40, -90], [30, -84], [70, -50], [120, -60], [158, -10], [150, 36], [60, 50], [-60, 50]], true), o.fill || C.white, { sw: 5, ox: 5, oy: 4 }));
  };

  /** Mũi tên lượn sóng vẽ tay (hơi ấm, gió): từ (x0, y0) tới (x1, y1); amp biên độ, n số sóng, k vẽ dần 0..1 (đầu mũi tên hiện khi k > 0,92), color, sw. */
  VT.arrowWavy = function (o) {
    var x0 = o.x0, y0 = o.y0, x1 = o.x1, y1 = o.y1, dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy) || 1, nx = -dy / L, ny = dx / L;
    var A = o.amp == null ? 16 : o.amp, n = o.n || 3, pts = [], k = VT.clamp(o.k == null ? 1 : o.k, 0, 1);
    for (var i = 0; i <= 24; i++) { var u = i / 24, w = Math.sin(u * n * 2 * Math.PI) * A * (1 - u * 0.6); pts.push([x0 + dx * u + nx * w, y0 + dy * u + ny * w]); }
    var col = o.color || C.accent, sw = o.sw || 9, out = VT.lineDraw(VT.smooth(pts, false), k, sw, col);
    if (k > 0.92) {
      var a = Math.atan2(dy, dx), hl = o.head || 34;
      out += VT.line("M " + f(x1 - Math.cos(a - 0.5) * hl) + " " + f(y1 - Math.sin(a - 0.5) * hl) + " L " + f(x1) + " " + f(y1) + " L " + f(x1 - Math.cos(a + 0.5) * hl) + " " + f(y1 - Math.sin(a + 0.5) * hl), sw, col);
    }
    return out;
  };

  /** Mặt cắt thung lũng hình cái bát (sơ đồ). Gốc (x, y) = giữa đáy bát. w: khoảng giữa hai vành (1600), depth: độ sâu (520), floor: đáy phẳng (360).
   *  mtn: [trái, phải] độ cao thêm của đỉnh núi ngoài vành, mtnW: bề rộng chân núi (600), ext: phần đất vẽ thêm ngoài vành mỗi bên (1500). fill 0..1: mực khí lạnh đọng (theo độ sâu), t: gợn mặt khí lạnh, coldColor, groundColor.
   *  VT.valleyY(o, x) → y mặt đất tại x (cùng o). */
  VT.valleyY = function (o, x) {
    var w = o.w || 1600, dp = o.depth || 520, fl = (o.floor || 360) / 2, cx = o.x || 0, ax = Math.abs(x - cx), hw = w / 2, y;
    if (ax <= fl) y = 0;
    else if (ax <= hw) { var u = (ax - fl) / (hw - fl); y = -dp * (u * u * (3 - 2 * u)); }
    else {
      var mw = o.mtnW || 600, mt = (o.mtn ? (x < cx ? o.mtn[0] : o.mtn[1]) : 0) || 0, v = (ax - hw) / mw;
      y = -dp - mt * Math.sin(Math.PI * Math.min(1, v)) + Math.max(0, v - 1) * 260 * 600 / mw;
    }
    return (o.y || 0) + y;
  };
  VT.valley = function (o) {
    var x0 = o.x || 0, y0 = o.y || 0, w = o.w || 1600, dp = o.depth || 520, out = [], pts = [], ext = o.ext || 1500, X0 = x0 - w / 2 - ext, X1 = x0 + w / 2 + ext;
    for (var x = X0; x <= X1; x += 30) pts.push([x, VT.valleyY(o, x)]);
    var ground = VT.smooth(pts, false);
    var fillK = VT.clamp(o.fill || 0, 0, 1);
    if (fillK > 0.001) {
      var lvl = y0 - dp * fillK, cp = [], t = o.t || 0;
      for (var xx = x0 - w / 2; xx <= x0 + w / 2; xx += 10) { var gy = VT.valleyY(o, xx); if (gy >= lvl - 0.5) cp.push([xx, gy]); }
      if (cp.length > 1) {
        var surf = [];
        for (var i = 0; i <= 16; i++) { var sx = VT.lerp(cp[0][0], cp[cp.length - 1][0], i / 16); surf.push([sx, lvl + (i > 0 && i < 16 ? Math.sin(i * 1.7 + Math.round(t * 12) * 0.6) * 6 : 0)]); }
        var top = VT.smooth(surf, false);
        var d = top + " L " + cp.slice().reverse().map(function (p) { return f(p[0]) + " " + f(p[1] + 4); }).join(" L ") + " Z";
        out.push('<path d="' + d + '" fill="' + (o.coldColor || "#6FA9CF") + '" opacity="0.6"/>');
        out.push(VT.line(top, 5, "#3F6A8A", 0.85));
      }
    }
    out.push(VT.shape(ground + " L " + f(X1) + " " + f(y0 + 900) + " L " + f(X0) + " " + f(y0 + 900) + " Z", o.groundColor || "#F4F1E8", { sw: 7, ox: 0, oy: 6 }));
    out.push(VT.line("M " + f(X0) + " " + f(y0 + 70) + " C " + f(x0 - 400) + " " + f(y0 + 100) + " " + f(x0 + 400) + " " + f(y0 + 60) + " " + f(X1) + " " + f(y0 + 90), 3, INK, 0.25));
    return out.join("");
  };

  /** Khung bìa tạp chí vẽ tay KHÔNG chữ (dải màu có sao, vạch mã vạch): gốc tâm, w × h (900 × 1100). k 0..1: đóng sập (to → vừa). color: dải đầu. */
  VT.coverFrame = function (o) {
    var w = o.w || 900, h = o.h || 1100, k = o.k == null ? 1 : VT.clamp(o.k, 0, 1), sc = 1 + 0.6 * (1 - VT.ease.out(k)), hw = w / 2, hh = h / 2, B = 46;
    var outer = "M " + (-hw) + " " + (-hh) + " L " + hw + " " + (-hh) + " L " + hw + " " + hh + " L " + (-hw) + " " + hh + " Z";
    var inner = "M " + (-hw + B) + " " + (-hh + 190) + " L " + (hw - B) + " " + (-hh + 190) + " L " + (hw - B) + " " + (hh - B) + " L " + (-hw + B) + " " + (hh - B) + " Z";
    var out = VT.shape(outer + " " + inner, C.white, { sw: 7, rule: "evenodd", ox: 8, oy: 6 });
    out += VT.shape("M " + (-hw + B) + " " + (-hh + 34) + " L " + (hw - B) + " " + (-hh + 34) + " L " + (hw - B) + " " + (-hh + 164) + " L " + (-hw + B) + " " + (-hh + 164) + " Z", o.color || C.accent2, { sw: 6 });
    [-0.3, 0, 0.3].forEach(function (u, i) { out += VT.sparkle({ x: u * w, y: -hh + 99, s: 0.95, fill: i === 1 ? "#F6D36A" : "#ffffff" }); });
    for (var i = 0; i < 9; i++) out += VT.line("M " + f(hw - 160 + i * 13) + " " + f(hh - 36) + " L " + f(hw - 160 + i * 13) + " " + f(hh - 8), i % 3 ? 3 : 6);
    return VT.g(VT.tr(o.x || 0, o.y || 0, (o.s == null ? 1 : o.s) * sc, o.rot || 0), out);
  };
})();

/* ve-tay · thêm 18/11/2026: bút chì nối từ bàn tay tới điểm đang vẽ, điểm chạy dọc đường gấp khúc. */
(function () {
  var VT = window.VT;
  /** Bút chì to cầm ở đuôi: đuôi ở hand [x, y], ngòi ở tip [x, y] (dài tự tính). o: {s độ dày (1), over: phần thò sau tay (40)}. */
  VT.pencilTo = function (hand, tip, o) {
    o = o || {};
    var s = o.s || 1, dx = hand[0] - tip[0], dy = hand[1] - tip[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
    return VT.pencil({ x: tip[0], y: tip[1], s: s, rot: Math.atan2(dx, -dy) * 180 / Math.PI, len: Math.max(140, L / s + (o.over == null ? 40 : o.over)) });
  };
  /** Điểm tại tiến độ k 0..1 dọc đường gấp khúc pts (theo độ dài), để đặt ngòi bút khi VT.lineDraw(VT.smooth(pts), k). */
  VT.alongPts = function (pts, k) {
    var L = [0], i;
    for (i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    var d = VT.clamp(k, 0, 1) * L[L.length - 1];
    for (i = 1; i < pts.length; i++) if (d <= L[i] || i === pts.length - 1) { var u = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); return [VT.lerp(pts[i - 1][0], pts[i][0], VT.clamp(u, 0, 1)), VT.lerp(pts[i - 1][1], pts[i][1], VT.clamp(u, 0, 1))]; }
    return pts[0];
  };
})();

/* ve-tay · thêm 19/11/2026: đài tưởng niệm dáng khối trắng, cột thuỷ ngân xanh (khoá liên tục d12–d13, khớp cat-giay). */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f;
  /** Đài tưởng niệm khối trắng thon đầu, cột thuỷ ngân XANH, bệ tuyết, bảng đá ở chân (vẽ chung, không chép thiết kế thật).
   *  Gốc giữa đáy, cao ~640, rộng bệ ~460. plaque: chữ trên bảng (chỉ truyền khi có trong chu_tren_do_vat; không có thì bảng trơn). plain: nét dày đơn giản (biểu tượng nhỏ). */
  VT.monumentSlab = function (o) {
    var out = [], sw = o.plain ? 14 : 6, MERC = "#4F8FA8";
    out.push(VT.shape("M -110 0 L -96 -600 C -60 -640 60 -640 96 -600 L 110 0 Z", "#F3F1EA", { sw: sw, ox: 6, oy: 5 }));
    out.push(VT.shape("M -30 -120 L -30 -560 C -30 -590 30 -590 30 -560 L 30 -120 Z", "#FFFFFF", { sw: sw * 0.8 }));
    out.push('<rect x="-12" y="-470" width="24" height="330" fill="' + MERC + '"/>');
    out.push(VT.ell(0, -126, 34, 34, MERC, sw * 0.8));
    if (!o.plain) {
      for (var i = 0; i < 9; i++) out.push(VT.line("M 40 " + (-540 + i * 44) + " L " + (i % 2 ? 56 : 66) + " " + (-540 + i * 44), 4));
      out.push(VT.shape("M -102 -606 C -50 -650 50 -650 102 -606 C 60 -618 -60 -618 -102 -606 Z", C.snow, { sw: 4 }));
      out.push(VT.shape("M 40 -10 L 400 -10 L 400 -120 L 40 -120 Z", "#E4E2DA", { sw: 6, ox: 5, oy: 4 }));
      out.push(VT.shape("M 34 -122 C 120 -136 300 -134 406 -122 L 400 -116 L 40 -116 Z", C.snow, { sw: 3 }));
      if (o.plaque) out.push(VT.text(220, -50, o.plaque, 44, { w: 900 }));
      out.push(VT.shape("M -170 6 C -60 -20 300 -22 460 6 Z", C.snow, { sw: 4 }));
    }
    return VT.wrap(o, out.join(""));
  };
})();

/* ve-tay · thêm 21/11/2026 (mở đầu mới d02, d08): đèn pin cầm tay. */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f;
  /** Đèn pin: gốc giữa thân, dài ~150 nằm ngang, đầu đèn bên phải. on: chùm sáng vàng nhạt (len, 420). rot, s như mọi đạo cụ. */
  VT.torch = function (o) {
    var out = [], L = o.len || 420;
    if (o.on) out.push('<path d="M 78 -20 L ' + L + ' -' + f(L * 0.28) + ' L ' + L + ' ' + f(L * 0.28) + ' L 78 20 Z" fill="#FFF4C8" opacity="0.45"/>');
    out.push(VT.shape("M -78 -16 L 40 -16 L 40 16 L -78 16 Z", "#3f4a52", { sw: 5 }));
    out.push(VT.shape("M 40 -16 L 78 -28 L 78 28 L 40 16 Z", "#5b6870", { sw: 5 }));
    out.push(VT.shape("M 78 -26 L 88 -26 L 88 26 L 78 26 Z", o.on ? "#FFF4C8" : "#9aa3a8", { sw: 4 }));
    out.push(VT.line("M -60 -4 L 20 -4", 3, "#ffffff", 0.35) + VT.dot(-10, 0, 6, C.accent2));
    return VT.wrap(o, out.join(""));
  };
})();

/* ve-tay · đạo cụ sa mạc, bãi opal, sơ đồ so sánh (thêm 23/11/2026, tập Coober Pedy). Chỉ thêm. Mỗi hàm nhận o = {x, y, s, rot, sx, ...}. */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f, INK = C.ink, wrap = VT.wrap;
  VT.C.sand = "#E6CFA0"; VT.C.sandShade = "#CDAE78"; VT.C.dirt = "#D8C2A0"; VT.C.dirtShade = "#B99C76"; VT.C.skyHot = "#F7EED8";
  var OPAL = ["#7FD3E8", "#9BE3B0", "#F2A1C8", "#F6D36A", "#B49BF0"];
  VT.OPAL_MAU = OPAL;

  function blob(r, seed, n, amp) {
    var pts = [];
    for (var i = 0; i < n; i++) { var a = 2 * Math.PI * i / n, k = 1 + (VT.hash(seed + i * 1.7) - 0.5) * amp; pts.push([Math.cos(a) * r * k, Math.sin(a) * r * k * 0.8]); }
    return VT.smooth(pts, true);
  }
  VT.blob = blob;
  /** Xẻng nhỏ: gốc ở tay cầm (đầu cán), lưỡi ở cuối cán hướng +y, dài ~210. dirt: có đất trên lưỡi. */
  VT.shovel = function (o) {
    var out = VT.line("M 0 0 L 0 140", 12, "#8E5527") + VT.line("M 0 0 L 0 140", 3, INK, 0.5) + VT.line("M -22 -4 L 22 -4", 12) +
      VT.shape("M -34 136 L 34 136 L 30 190 C 20 214 -20 214 -30 190 Z", "#9AA7AE", { sw: 6 });
    if (o.dirt) out += VT.g("translate(0 160)", VT.shape(blob(30, 3, 8, 0.5), C.dirtShade, { sw: 4 }));
    return wrap(o, out);
  };
  /** Hòn đá xám: gốc tâm, r (~60). smug: mắt lim dim tự mãn + nhếch mép. seed đổi dáng. */
  VT.rock = function (o) {
    var r = o.r || 60, out = VT.shape(blob(r, o.seed || 5, 9, 0.35), o.color || "#A7A9A6", { sw: 6 }) + VT.line("M " + f(-r * 0.4) + " " + f(-r * 0.3) + " q 10 -8 22 -4", 4, INK, 0.4);
    if (o.smug) {
      var ex = r * 0.3, ey = -r * 0.08, er = r * 0.18;
      [-ex, ex].forEach(function (x) {
        out += VT.ell(x, ey, er, er, "#fffdf6", 4) + VT.dot(x + er * 0.35, ey + er * 0.3, er * 0.42) +
          '<path d="M ' + f(x - er - 2) + " " + f(ey + 1) + " A " + f(er + 2) + " " + f(er + 2) + " 0 0 1 " + f(x + er + 2) + " " + f(ey + 1) + ' Z" fill="#8f918e" stroke="' + INK + '" stroke-width="4"/>';
      });
      out += VT.line("M " + f(-ex - er) + " " + f(ey - er * 1.5) + " L " + f(-ex + er) + " " + f(ey - er * 1.1), 5) + VT.line("M " + f(ex - er) + " " + f(ey - er * 1.1) + " L " + f(ex + er) + " " + f(ey - er * 1.7), 5);
      out += VT.line("M " + f(-r * 0.2) + " " + f(r * 0.34) + " C 0 " + f(r * 0.44) + " " + f(r * 0.2) + " " + f(r * 0.38) + " " + f(r * 0.36) + " " + f(r * 0.18), 5);
    }
    return wrap(o, out);
  };
  /** Viên opal / sỏi: gốc tâm, r ~18. glow 0..1 (vầng sáng nhiều màu + tia), t (tia xoay theo bậc). dull: sỏi xám thường. */
  VT.opal = function (o) {
    var r = o.r || 18, g = o.glow == null ? 1 : o.glow, out = "";
    if (o.dull) return wrap(o, VT.shape(blob(r, 9, 7, 0.3), "#B7B2A8", { sw: 4 }));
    if (g > 0) {
      var st = Math.round((o.t || 0) * 12);
      out += '<circle cx="0" cy="0" r="' + f(r * (2.4 + 0.4 * Math.sin(st))) + '" fill="#FFF6D6" opacity="' + f(0.55 * g) + '"/>';
      for (var i = 0; i < 8; i++) { var a = i * Math.PI / 4 + st * 0.15, r0 = r * 1.5, r1 = r * (2.6 + (i % 2) * 0.8); out += VT.line("M " + f(Math.cos(a) * r0) + " " + f(Math.sin(a) * r0) + " L " + f(Math.cos(a) * r1) + " " + f(Math.sin(a) * r1), 5, OPAL[i % 5], f(g)); }
    }
    out += VT.shape(blob(r, 9, 7, 0.3), "#BFE7F0", { sw: 4 });
    out += VT.line("M " + f(-r * 0.5) + " " + f(-r * 0.1) + " L " + f(r * 0.1) + " " + f(-r * 0.5), 5, "#F2A1C8") + VT.line("M " + f(-r * 0.3) + " " + f(r * 0.35) + " L " + f(r * 0.5) + " " + f(-r * 0.05), 5, "#9BE3B0") + VT.dot(r * 0.2, -r * 0.1, r * 0.18, "#ffffff");
    return wrap(o, out);
  };
  /** Đống đất (mullock heap): gốc giữa chân, w (~420), h (~220), seed. */
  VT.mound = function (o) {
    var w = o.w || 420, h = o.h || 220, sd = o.seed || 1, pts = [[-w / 2, 0]];
    for (var i = 1; i < 8; i++) { var u = i / 8, x = -w / 2 + w * u, y = -h * Math.sin(Math.PI * u) * (0.85 + 0.3 * VT.hash(sd + i)); pts.push([x, y]); }
    pts.push([w / 2, 0]);
    var d = VT.smooth(pts, false) + " Z", out = VT.shape(d, o.color || C.dirt, { sw: 6 });
    for (var j = 0; j < 7; j++) { var px = (VT.hash(sd * 3 + j) - 0.5) * w * 0.55, py = -h * (0.12 + 0.45 * VT.hash(sd * 7 + j)); out += VT.dot(px, py, 4 + 4 * VT.hash(j + sd), C.dirtShade); }
    return wrap(o, out);
  };
  /** Mặt đất sa mạc: từ y xuống, phủ −1200..3100. */
  VT.desertGround = function (y, col) {
    return VT.shape("M -1200 " + y + " L 3100 " + y + " L 3100 2400 L -1200 2400 Z", col || C.sand, { sw: 6, ox: 0, oy: 0 }) +
      [[-300, 40], [220, 90], [700, 30], [1240, 70], [1700, 110], [2200, 50]].map(function (p) { return VT.line("M " + p[0] + " " + (y + p[1]) + " l 60 0", 4, C.sandShade); }).join("");
  };
  /** Mặt trời to: gốc tâm, r, t (tia nhấp nháy theo bậc), col. */
  VT.sunBig = function (o) {
    var r = o.r || 120, st = Math.round((o.t || 0) * 12), out = "";
    out += '<circle cx="0" cy="0" r="' + f(r * 1.25) + '" fill="#FFE9A8" opacity="0.6"/>';
    for (var i = 0; i < 14; i++) { var a = i * 2 * Math.PI / 14 + (st % 2) * 0.1; out += VT.line("M " + f(Math.cos(a) * r * 1.12) + " " + f(Math.sin(a) * r * 1.12) + " L " + f(Math.cos(a) * r * 1.42) + " " + f(Math.sin(a) * r * 1.42), f(Math.max(6, r * 0.05)), "#E0703A"); }
    out += VT.shape(blob(r, 21, 12, 0.06), o.col || "#F6C445", { sw: f(Math.max(6, r * 0.035)) });
    return wrap(o, out);
  };
  /** Bảng thông tin trên hai cột: gốc giữa chân cột, w×h (520×360), post cao cột, title (chữ phải có trong chu_tren_do_vat), size cỡ tiêu đề, lines số dòng kẻ, hi dòng đang dò (tô vàng). */
  VT.infoBoard = function (o) {
    var w = o.w || 520, h = o.h || 360, post = o.post || 220, top = -post - h, out = "";
    out += VT.line("M " + f(-w * 0.3) + " 0 L " + f(-w * 0.3) + " " + f(-post), 16, "#8E5527") + VT.line("M " + f(w * 0.3) + " 0 L " + f(w * 0.3) + " " + f(-post), 16, "#8E5527");
    out += VT.shape("M " + f(-w / 2) + " " + f(top) + " L " + f(w / 2) + " " + f(top) + " L " + f(w / 2) + " " + f(-post) + " L " + f(-w / 2) + " " + f(-post) + " Z", "#F6EEDC", { sw: 7 });
    var size = o.size || 96;
    if (o.title) out += VT.text(0, top + size * 1.05, o.title, size, { fill: "#A8361F" });
    var n = o.lines || 6, y0 = top + size * 1.5, gap = (h - size * 1.5 - 30) / n;
    for (var i = 0; i < n; i++) {
      var y = y0 + gap * (i + 0.5), x0 = -w / 2 + 40, x1 = w / 2 - 40 - 60 * VT.hash(i * 5 + 1);
      if (o.hi === i) out += '<rect x="' + f(x0 - 10) + '" y="' + f(y - 14) + '" width="' + f(x1 - x0 + 20) + '" height="28" fill="#F6D36A" opacity="0.7"/>';
      var d = "M " + f(x0) + " " + f(y);
      for (var k = 1; k <= 10; k++) d += " L " + f(x0 + (x1 - x0) * k / 10) + " " + f(y + (k % 2 ? -4 : 4));
      out += VT.line(d, 4, INK, 0.55);
    }
    return wrap(o, out);
  };
  /** Toạ độ dòng thứ i của infoBoard (khung cục bộ, chưa nhân o.s): {x0, x1, y}. */
  VT.infoBoardLine = function (o, i) {
    var w = o.w || 520, h = o.h || 360, post = o.post || 220, top = -post - h, size = o.size || 96, n = o.lines || 6, y0 = top + size * 1.5, gap = (h - size * 1.5 - 30) / n;
    return { x0: -w / 2 + 40, x1: w / 2 - 40 - 60 * VT.hash(i * 5 + 1), y: y0 + gap * (i + 0.5) };
  };
  /** Người que chung (không mặt, không ai cụ thể): gốc giữa hai chân, cao ~240, phase đi bộ, hat (mũ chung). */
  VT.stickPerson = function (o) {
    var p = (o.phase || 0) * 2 * Math.PI, a = Math.sin(p) * 22, out = "";
    out += VT.line("M 0 -120 L " + f(-a) + " 0", 7) + VT.line("M 0 -120 L " + f(a) + " 0", 7) + VT.line("M 0 -120 L 0 -190", 7);
    out += VT.line("M 0 -175 L " + f(a * 0.8 + 30) + " -130", 7) + VT.line("M 0 -175 L " + f(-a * 0.8 - 26) + " -134", 7);
    out += VT.ell(0, -214, 24, 24, o.fill || "#F6EEDC", 6);
    if (o.hat) out += VT.shape("M -34 -230 L 34 -230 L 22 -244 C 18 -262 -18 -262 -22 -244 Z", "#A3814A", { sw: 5 });
    return wrap(o, out);
  };
  /** Mảnh ghép hình: gốc tâm, cỡ ~160, col, mark: số vạch đếm trên mảnh (không chữ số). */
  VT.puzzle = function (o) {
    var d = "M -80 -80 L -20 -80 C -24 -110 24 -110 20 -80 L 80 -80 L 80 -20 C 110 -24 110 24 80 20 L 80 80 L 20 80 C 24 50 -24 50 -20 80 L -80 80 L -80 20 C -50 24 -50 -24 -80 -20 Z";
    var out = VT.shape(d, o.col || "#E0703A", { sw: 7 });
    for (var i = 0; i < (o.mark || 0); i++) out += VT.line("M " + f(-10 + i * 24) + " -30 L " + f(-10 + i * 24) + " 34", 12, "#F6EEDC");
    return wrap(o, out);
  };
  /** Mặt cắt ngọn đồi có lớp đá: gốc giữa đáy, w (900), h (420), cut=false bỏ lớp đá. */
  VT.hillCut = function (o) {
    var w = o.w || 900, h = o.h || 420, top = "M " + f(-w / 2) + " 0 C " + f(-w * 0.35) + " " + f(-h * 0.6) + " " + f(-w * 0.2) + " " + f(-h) + " 0 " + f(-h) + " C " + f(w * 0.2) + " " + f(-h) + " " + f(w * 0.35) + " " + f(-h * 0.6) + " " + f(w / 2) + " 0";
    var out = VT.shape(top + " Z", o.col || "#E2B98A", { sw: 7 });
    if (o.cut !== false) for (var i = 1; i < 4; i++) { var y = -h * (1 - i * 0.24), xw = w * 0.5 * Math.sqrt(Math.max(0, 1 - Math.pow(y / h, 2))) * 0.72; out += VT.line("M " + f(-xw) + " " + f(y + 10) + " C " + f(-xw * 0.4) + " " + f(y - 8) + " " + f(xw * 0.4) + " " + f(y + 14) + " " + f(xw) + " " + f(y), 4, "#9C7650", 0.7); }
    return wrap(o, out);
  };
  /** Quạt bàn: gốc giữa đế, cao ~260. t, speed (vòng/giây), droop 0..1 (gục đầu). */
  VT.fan = function (o) {
    var dr = o.droop || 0, rot = (o.t || 0) * 360 * (o.speed == null ? 3 : o.speed), out = "";
    out += VT.shape("M -70 0 C -70 -24 70 -24 70 0 Z", "#7C8C96", { sw: 6 });
    var head = "";
    for (var i = 0; i < 3; i++) head += VT.g("rotate(" + f(rot + i * 120) + ")", VT.shape("M 0 0 C 20 -30 60 -70 30 -90 C 0 -100 -20 -40 0 0 Z", "#BFE3F2", { sw: 4 }));
    head += VT.ell(0, 0, 92, 92, "none", 5) + VT.dot(0, 0, 12);
    out += VT.line("M 0 -16 Q " + f(dr * 50) + " -90 " + f(dr * 70) + " " + f(-150 + dr * 70), 10);
    out += VT.g("translate(" + f(dr * 70) + " " + f(-170 + dr * 90) + ") rotate(" + f(dr * 70) + ")", head);
    return wrap(o, out);
  };
  /** Đồng hồ điện: gốc tâm, hộp 180, t, speed (vòng/giây kim). */
  VT.meter = function (o) {
    var a = (o.t || 0) * 2 * Math.PI * (o.speed == null ? 2 : o.speed), out = VT.shape("M -90 -90 L 90 -90 L 90 90 L -90 90 Z", "#D6DDE0", { sw: 6 }) + VT.ell(0, 0, 64, 64, "#FFFDF6", 5);
    for (var i = 0; i < 8; i++) { var b = i * Math.PI / 4; out += VT.line("M " + f(Math.cos(b) * 50) + " " + f(Math.sin(b) * 50) + " L " + f(Math.cos(b) * 60) + " " + f(Math.sin(b) * 60), 4); }
    out += VT.line("M 0 0 L " + f(Math.cos(a) * 50) + " " + f(Math.sin(a) * 50), 7, "#A8361F") + VT.dot(0, 0, 8);
    out += VT.shape("M -10 66 L 6 66 L -2 76 L 12 76 L -8 86 L -2 78 L -14 78 Z", "#F6C445", { sw: 3 });
    return wrap(o, out);
  };
  /** Lịch xé (không số): gốc tâm, k số trang đã xé (tờ đang bay ở phần lẻ). */
  VT.calendar = function (o) {
    var k = o.k || 0, fr = k - Math.floor(k), out = VT.shape("M -80 -100 L 80 -100 L 80 100 L -80 100 Z", "#FFFDF6", { sw: 6 }) + '<rect x="-80" y="-100" width="160" height="40" fill="#C9463A"/>' + VT.line("M -80 -60 L 80 -60", 6);
    out += VT.line("M -40 -10 L 40 -10", 14, INK, 0.75) + VT.line("M -50 40 L 50 40", 5, INK, 0.4) + VT.line("M -50 64 L 30 64", 5, INK, 0.4);
    if (fr > 0.05) out += VT.g("translate(" + f(fr * 160) + " " + f(-fr * 120) + ") rotate(" + f(fr * 70) + ")", VT.shape("M -80 -60 L 80 -60 L 80 100 L -80 100 Z", "#FFFDF6", { sw: 5, op: f(1 - fr * 0.5) }));
    return wrap(o, out);
  };
  /** Nhà tôn trên mặt đất: gốc giữa chân, w 360. hot: vệt nóng bốc trên mái (t). */
  VT.tinHouse = function (o) {
    var w = o.w || 360, h = 220, out = VT.shape("M " + f(-w / 2) + " 0 L " + f(-w / 2) + " " + (-h) + " L " + f(w / 2) + " " + (-h) + " L " + f(w / 2) + " 0 Z", "#C4CBCD", { sw: 6 });
    for (var x = -w / 2 + 30; x < w / 2; x += 30) out += VT.line("M " + f(x) + " " + (-h + 6) + " L " + f(x) + " -6", 3, INK, 0.35);
    out += VT.shape("M " + f(-w / 2 - 30) + " " + (-h) + " L 0 " + (-h - 110) + " L " + f(w / 2 + 30) + " " + (-h) + " Z", "#A9B3B6", { sw: 6 });
    out += VT.shape("M -40 0 L -40 -110 L 40 -110 L 40 0 Z", "#8E5527", { sw: 5 });
    if (o.hot) { var st = Math.round((o.t || 0) * 12); [-80, 0, 80].forEach(function (x, i) { var wv = Math.sin(st * 0.8 + i) * 10; out += VT.line("M " + x + " " + (-h - 130) + " c " + f(wv) + " -20 " + f(-wv) + " -40 0 -60", 5, "#E0703A", 0.8); }); }
    return wrap(o, out);
  };
  /** Tờ hoá đơn trống (không số): gốc tâm, cỡ 220×300. */
  VT.bill = function (o) {
    var out = VT.shape("M -110 -150 L 110 -150 L 110 130 L 90 150 L 70 130 L 50 150 L 30 130 L 10 150 L -10 130 L -30 150 L -50 130 L -70 150 L -90 130 L -110 150 Z", "#FFFDF6", { sw: 6 });
    out += VT.line("M -70 -110 L 70 -110", 8, INK, 0.6) + VT.line("M -80 -70 L 20 -70", 4, INK, 0.3) + VT.line("M -80 -40 L 50 -40", 4, INK, 0.3);
    return wrap(o, out);
  };
  /** Gậy golf: gốc ở tay cầm, cán hướng +y dài ~300, đầu gậy ở cuối hướng +x. */
  VT.golfClub = function (o) {
    return wrap(o, VT.line("M 0 0 L 0 290", 9, "#9AA7AE") + VT.line("M 0 -10 L 0 50", 16) + VT.shape("M -4 284 L 50 284 C 64 286 64 306 50 308 L -6 308 Z", "#7C8C96", { sw: 5 }));
  };
  /** Cuộn (cỏ nhân tạo, thảm): gốc tâm, len (180), r (34), col (mặc định xanh cỏ), unroll 0..1 (trải tấm phẳng sang phải). */
  VT.roll = function (o) {
    var L = o.len || 180, r = o.r || 34, col = o.col || "#5E9E48", u = o.unroll || 0, out = "";
    if (u > 0) out += VT.shape("M " + f(L / 2 - 10) + " " + f(r - 8) + " L " + f(L / 2 + u * 500) + " " + f(r - 8) + " L " + f(L / 2 + u * 500) + " " + f(r) + " L " + f(L / 2 - 10) + " " + f(r) + " Z", col, { sw: 5 });
    var rr = r * (1 - 0.5 * u);
    out += VT.shape("M " + f(-L / 2) + " " + f(-rr) + " L " + f(L / 2) + " " + f(-rr) + " A " + f(rr * 0.5) + " " + f(rr) + " 0 0 1 " + f(L / 2) + " " + f(rr) + " L " + f(-L / 2) + " " + f(rr) + " Z", col, { sw: 6 });
    out += VT.ell(-L / 2, 0, rr * 0.5, rr, col, 6) + VT.line("M " + f(-L / 2 - rr * 0.2) + " " + f(-rr * 0.4) + " q 8 8 0 18", 3);
    for (var i = 1; i < 5; i++) out += VT.line("M " + f(-L / 2 + L * i / 5) + " " + f(-rr + 4) + " l -2 10", 3, "#2F6B2A", 0.8);
    return wrap(o, out);
  };
  /** Chìa khoá to có thẻ nhãn: gốc giữa vòng chìa, dài ~260; tag: chữ trên thẻ (chu_tren_do_vat), tagSize. */
  VT.bigKey = function (o) {
    var out = VT.ell(0, 0, 50, 50, "#E8C25A", 14) + VT.shape("M 46 -12 L 260 -12 L 260 12 L 46 12 Z", "#E8C25A", { sw: 6 }) +
      VT.shape("M 200 12 L 200 46 L 222 46 L 222 12 Z", "#E8C25A", { sw: 5 }) + VT.shape("M 238 12 L 238 36 L 256 36 L 256 12 Z", "#E8C25A", { sw: 5 });
    if (o.tag) out += VT.line("M -30 30 L -60 90", 4) + VT.shape("M -200 90 L 80 90 L 80 170 L -200 170 Z", "#FFFDF6", { sw: 6 }) + VT.text(-60, 148, o.tag, o.tagSize || 52, { fill: "#2c4f6e" });
    return wrap(o, out);
  };
  /** Bàn tay chung (không người cụ thể) thò từ mép: gốc cổ tay, hướng +x. sleeve màu ống tay. */
  VT.handGeneric = function (o) {
    var out = VT.shape("M -260 -34 L 0 -30 L 0 30 L -260 34 Z", o.sleeve || "#6B8FA6", { sw: 6 }) +
      VT.shape("M 0 -36 C 40 -44 80 -30 86 -6 C 92 18 70 40 30 40 L 0 36 Z", "#E8B98E", { sw: 6 }) + VT.line("M 40 -30 C 56 -16 56 8 40 22", 4, INK, 0.6);
    return wrap(o, out);
  };
})();

/* ve-tay · đạo cụ thêm 23/11/2026 (tập Whittier): cầu một làn, đèn tín hiệu, tàu, xe mui trần, tờ lịch, chảo đãi, nắp chai, neo, tàu thuỷ,
 * thước dây, máy bay đơn giản (không cờ, không ký hiệu), cổng hầm, mặt đồng hồ, đôi ủng, giỏ đồ giặt, phao bơi, cột nước, ki bowling, bông tuyết, nhãn giá. Chỉ thêm. */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f, INK = C.ink, wrap = VT.wrap;
  function rect(x0, y0, x1, y1, fill, o) { return VT.shape("M " + f(x0) + " " + f(y0) + " L " + f(x1) + " " + f(y0) + " L " + f(x1) + " " + f(y1) + " L " + f(x0) + " " + f(y1) + " Z", fill, o || { sw: 5 }); }
  VT.rectS = rect;
  /** Cầu một làn: gốc đầu trái mặt cầu, dài len (600), trụ mỗi ~220 px, lan can. color mặt cầu. */
  VT.bridge1 = function (o) {
    var L = o.len || 600, out = "";
    for (var x = 60; x < L - 20; x += 220) out += VT.shape("M " + (x - 18) + " 20 L " + (x + 18) + " 20 L " + (x + 24) + " 190 L " + (x - 24) + " 190 Z", "#B9AFA0", { sw: 5 });
    out += rect(0, 0, L, 26, o.color || "#9E978C", { sw: 6 });
    out += VT.line("M 0 -50 L " + f(L) + " -50", 6);
    for (var y = 0; y <= L; y += 60) out += VT.line("M " + y + " -50 L " + y + " 0", 4);
    out += VT.line("M 12 13 L " + f(L - 12) + " 13", 3, "#F6EEDC", 0.8);
    return wrap(o, out);
  };
  /** Đèn tín hiệu: gốc chân cột, cao ~440. state "red"|"green"|"off". */
  VT.signal = function (o) {
    var st = o.state || "red", out = VT.line("M 0 0 L 0 -300", 14) + rect(-46, -440, 46, -290, "#3a4044", { sw: 6 });
    out += VT.ell(0, -405, 26, 26, st === "red" ? "#E04A3A" : "#5a3a36", 5) + VT.ell(0, -330, 26, 26, st === "green" ? "#4FC06A" : "#2f4a38", 5);
    if (st !== "off") out += '<circle cx="0" cy="' + (st === "red" ? -405 : -330) + '" r="46" fill="' + (st === "red" ? "#FF8A70" : "#9CF0A8") + '" opacity="0.35"/>';
    return wrap(o, out);
  };
  /** Đoàn tàu: gốc mũi đầu máy ở đáy bánh, toa kéo về −x. n toa (3), carLen (250), loco, car (màu), t. */
  VT.train = function (o) {
    var n = o.n == null ? 3 : o.n, cl = o.carLen || 250, out = "", t = o.t || 0, jig = Math.sin(Math.round(t * 12) * 2.1) * 2;
    for (var i = n; i >= 1; i--) {
      var x1 = -i * (cl + 14) - 190, x2 = x1 + cl;
      out += rect(x1, -150 + jig, x2, -30 + jig, o.car || "#C9463A", { sw: 6 });
      out += VT.line("M " + x2 + " -60 L " + (x2 + 14) + " -60", 6);
      for (var w = 0; w < 3; w++) out += rect(x1 + 24 + w * 74, -128 + jig, x1 + 76 + w * 74, -92 + jig, "#F6E7B8", { sw: 4 });
      out += VT.ell(x1 + 44, -18, 20, 20, "#555", 5) + VT.ell(x2 - 44, -18, 20, 20, "#555", 5);
    }
    out += VT.shape("M -190 " + (-190 + jig) + " L -40 " + (-190 + jig) + " C 0 -190 10 -150 10 -110 L 10 -30 L -190 -30 Z", o.loco || "#2E5A88", { sw: 6 });
    out += rect(-170, -170, -90, -120, "#F6E7B8", { sw: 4 }) + VT.line("M -190 -80 L 10 -80", 6, "#E2B33C");
    out += VT.ell(-150, -18, 22, 22, "#555", 5) + VT.ell(-40, -18, 22, 22, "#555", 5) + VT.ell(-2, -120, 10, 10, "#FFE6A0", 4);
    return wrap(o, out);
  };
  /** Xe mui trần: gốc giữa đáy, dài ~620, mũi xe về +x. part "back" (ghế + mui, vẽ TRƯỚC Wob) | "front" (thân, vẽ SAU Wob để Wob ngồi trong) | "all".
   *  roof 0 gấp .. 1 đóng. color, run (thời gian: rung). Wob s=0.5 ngồi: x ≈ −80, y ≈ −60 (hệ xe). */
  VT.convertible = function (o) {
    var col = o.color || "#5E8FB0", part = o.part || "all", out = "", r = o.roof || 0, t = o.t || 0, jig = o.run ? Math.sin(Math.round(t * 12) * 2.7) * 2 : 0;
    if (part !== "front") {
      out += VT.shape("M -170 -140 C -170 -240 -60 -246 -50 -140 Z", "#8E5527", { sw: 5 });
      if (r < 0.05) out += VT.shape("M -300 -136 C -300 -176 -190 -182 -180 -136 Z", "#3a3f44", { sw: 5 }) + VT.line("M -290 -150 C -250 -160 -210 -160 -186 -150", 3, "#888");
      else { var top = -146 - 190 * r; out += VT.shape("M -290 -140 C -280 " + f(top) + " " + f(-280 + 400 * r) + " " + f(top) + " " + f(-280 + 420 * r) + " -140 Z", "#3a3f44", { sw: 6 }); }
    }
    if (part !== "back") {
      out += VT.shape("M -310 " + (-40 + jig) + " C -312 -120 -280 -146 -200 -146 L 150 -146 L 196 -108 C 270 -104 312 -90 312 -40 L 312 -24 L -310 -24 Z", col, { sw: 6 });
      out += VT.line("M 150 -146 L 196 -200", 6) + VT.line("M -40 -140 L -40 -40", 4, INK, 0.5) + VT.ell(276, -86, 14, 10, "#FFE6A0", 4);
      out += VT.ell(-200, -20, 44, 44, "#2a2e30", 6) + VT.ell(-200, -20, 18, 18, "#aab", 4) + VT.ell(200, -20, 44, 44, "#2a2e30", 6) + VT.ell(200, -20, 18, 18, "#aab", 4);
    }
    return wrap(o, out);
  };
  /** Tờ lịch giờ hầm: gốc tâm, w (360), h (480). lines số dòng kẻ; texts [[x, y, chữ, cỡ, màu]] (chữ phải có trong chu_tren_do_vat); back: mặt sau trơn. */
  VT.timetable = function (o) {
    var w = o.w || 360, h = o.h || 480, out = rect(-w / 2, -h / 2, w / 2, h / 2, o.back ? "#F4EEDD" : "#FFFDF6", { sw: 6 });
    out += VT.line("M " + f(-w / 6) + " " + f(-h / 2) + " L " + f(-w / 6) + " " + f(h / 2), 2, INK, 0.25) + VT.line("M " + f(w / 6) + " " + f(-h / 2) + " L " + f(w / 6) + " " + f(h / 2), 2, INK, 0.25);
    if (!o.back) {
      out += rect(-w / 2 + 20, -h / 2 + 20, w / 2 - 20, -h / 2 + 56, "#2E5A88", { sw: 3 });
      var n = o.lines == null ? 9 : o.lines;
      for (var i = 0; i < n; i++) { var yy = -h / 2 + 90 + i * (h - 120) / n; out += VT.line("M " + f(-w / 2 + 26) + " " + f(yy) + " L " + f(w / 2 - 30 - 50 * VT.hash(i + 3)) + " " + f(yy), 5, INK, 0.45); }
    }
    (o.texts || []).forEach(function (tx) { out += VT.text(tx[0], tx[1], tx[2], tx[3], { fill: tx[4] }); });
    return wrap(o, out);
  };
  /** Chảo đãi vàng: gốc tâm, rộng ~240. water 0..1, t. */
  VT.goldPan = function (o) {
    var out = VT.ell(0, 0, 120, 40, "#5b5f62", 6) + VT.ell(0, -6, 92, 26, "#7d8286", 4);
    if (o.water) out += '<ellipse cx="' + f(Math.sin(Math.round((o.t || 0) * 12) * 1.7) * 14) + '" cy="-6" rx="70" ry="18" fill="#8fc4d8" opacity="' + f(0.8 * o.water) + '"/>';
    return wrap(o, out);
  };
  /** Nắp chai răng cưa: gốc tâm, r ~24. */
  VT.bottleCap = function (o) {
    var pts = []; for (var i = 0; i < 24; i++) { var a = i / 24 * 2 * Math.PI, rr = i % 2 ? 22 : 26; pts.push([Math.cos(a) * rr, Math.sin(a) * rr]); }
    return wrap(o, VT.shape(VT.smooth(pts, true), "#C9463A", { sw: 4 }) + VT.ell(0, 0, 14, 14, "#E86A58", 3));
  };
  /** Neo: gốc tâm, cao ~200. */
  VT.anchor = function (o) {
    return wrap(o, VT.ell(0, -86, 16, 16, "none", 8) + VT.line("M 0 -70 L 0 90", 12) + VT.line("M -44 -40 L 44 -40", 10) + VT.line("M -80 40 C -70 90 70 90 80 40", 12) + VT.line("M -92 52 L -80 36 L -64 52", 8) + VT.line("M 64 52 L 80 36 L 92 52", 8));
  };
  /** Tàu thuỷ vẽ tay đơn giản (không cờ, không ký hiệu): gốc giữa đường nước, dài ~300, mũi về +x. */
  VT.ship = function (o) {
    return wrap(o, VT.shape("M -150 -40 L 150 -40 L 116 20 L -120 20 Z", "#6B7F8E", { sw: 6 }) + rect(-60, -100, 50, -40, "#F4EEDD") +
      rect(-20, -146, 10, -100, "#C9463A") + VT.dot(-30, -70, 8, "#2E5A88") + VT.dot(0, -70, 8, "#2E5A88") + VT.dot(30, -70, 8, "#2E5A88"));
  };
  /** Thước dây: gốc tâm hộp; len độ dài lá thước kéo ra (về +x), droop võng. */
  VT.tape = function (o) {
    var L = o.len || 0, d = o.droop || 0, out = "";
    if (L > 4) out += VT.shape("M 30 -10 C " + f(30 + L * 0.5) + " " + f(-10 + d) + " " + f(30 + L * 0.5) + " " + f(-10 + d) + " " + f(30 + L) + " -10 L " + f(30 + L) + " 6 C " + f(30 + L * 0.5) + " " + f(6 + d) + " " + f(30 + L * 0.5) + " " + f(6 + d) + " 30 6 Z", "#F2CF4A", { sw: 4 }) + VT.line("M " + f(30 + L) + " -14 L " + f(30 + L) + " 12", 6);
    out += VT.shape("M -44 -44 L 40 -44 C 50 -44 50 44 40 44 L -44 44 C -54 44 -54 -44 -44 -44 Z", "#C9463A", { sw: 6 }) + VT.ell(-4, 0, 22, 22, "#8E2E24", 4);
    return wrap(o, out);
  };
  /** Máy bay vẽ đơn giản, KHÔNG cờ, KHÔNG ký hiệu: gốc tâm, mũi về +x, dài ~330. blind 0..1 dải bịt mắt trên buồng lái; t (cánh quạt). */
  VT.planeSimple = function (o) {
    var st = Math.round((o.t || 0) * 12) % 2, out = VT.shape("M -60 -10 L 40 -120 L 70 -120 L 40 -10 Z", "#C8CED2", { sw: 5 }) +
      VT.shape("M -140 -10 C -140 -36 120 -40 150 -10 C 120 22 -140 20 -140 -10 Z", "#DDE2E5", { sw: 6 }) + VT.shape("M -150 -10 L -180 -60 L -150 -60 L -110 -12 Z", "#C8CED2", { sw: 5 }) +
      VT.shape("M -20 30 L 40 100 L 66 100 L 40 10 Z", "#B8BEC2", { sw: 5 }) + VT.ell(90, -20, 22, 12, "#9CC8DC", 4) +
      VT.line(st ? "M 156 -50 L 156 30" : "M 150 -40 L 162 20", 6);
    if (o.blind) { var b = VT.clamp(o.blind, 0, 1); out += '<g opacity="' + f(b) + '">' + VT.shape("M 50 -46 L 128 -40 L 132 8 L 50 14 Z", "#2a2e30", { sw: 4 }) + VT.shape("M 50 -16 L 14 -46 L 22 -16 L 10 14 Z", "#2a2e30", { sw: 4 }) + "</g>"; }
    return wrap(o, out);
  };
  /** Cổng hầm bê tông: gốc giữa chân, rộng ~600, cao ~420. open 0..1 (cửa cuốn kéo lên). */
  VT.tunnelGate = function (o) {
    var op = VT.clamp(o.open || 0, 0, 1), out = rect(-300, -420, 300, 0, "#B4ADA2", { sw: 7 });
    out += VT.shape("M -200 0 L -200 -220 C -200 -330 200 -330 200 -220 L 200 0 Z", "#2b2f33", { sw: 5 });
    var dy = -310 * op, id = VT.uid("tg");
    out += '<clipPath id="' + id + '"><path d="M -200 0 L -200 -220 C -200 -330 200 -330 200 -220 L 200 0 Z"/></clipPath><g clip-path="url(#' + id + ')">';
    out += rect(-200, dy - 320, 200, dy, "#8A8F94", { sw: 5 });
    for (var i = 0; i < 6; i++) out += VT.line("M -200 " + f(dy - 40 - i * 48) + " L 200 " + f(dy - 40 - i * 48), 4, INK, 0.4);
    out += rect(-200, dy - 24, 200, dy, "#E2B33C", { sw: 4 }) + "</g>";
    out += rect(-320, -450, 320, -410, "#9C958A", { sw: 6 });
    return wrap(o, out);
  };
  /** Mặt đồng hồ: gốc tâm, r 70. a góc kim phút (độ, 0 = 12 giờ), wedge [a0, a1] cung tô xanh. */
  VT.clockFace = function (o) {
    var r = o.r || 70, out = VT.ell(0, 0, r, r, "#FFFDF6", 6);
    if (o.wedge) { var a0 = (o.wedge[0] - 90) * Math.PI / 180, a1 = (o.wedge[1] - 90) * Math.PI / 180, rr = r - 8;
      out += '<path d="M 0 0 L ' + f(Math.cos(a0) * rr) + " " + f(Math.sin(a0) * rr) + " A " + rr + " " + rr + " 0 0 1 " + f(Math.cos(a1) * rr) + " " + f(Math.sin(a1) * rr) + ' Z" fill="#4FC06A" opacity="0.7"/>'; }
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; out += VT.line("M " + f(Math.sin(a) * (r - 6)) + " " + f(-Math.cos(a) * (r - 6)) + " L " + f(Math.sin(a) * (r - 18)) + " " + f(-Math.cos(a) * (r - 18)), 4); }
    var am = (o.a || 0) * Math.PI / 180;
    out += VT.line("M 0 0 L " + f(Math.sin(am) * (r - 16)) + " " + f(-Math.cos(am) * (r - 16)), 6) + VT.line("M 0 0 L " + f(Math.sin(am / 12 + 2) * (r * 0.5)) + " " + f(-Math.cos(am / 12 + 2) * (r * 0.5)), 8) + VT.dot(0, 0, 7);
    return wrap(o, out);
  };
  /** Đôi ủng cao su: gốc giữa đáy, cao ~260. relieved 0..1 (mắt nhắm, miệng thở ra "o", ngả vào nhau). */
  VT.boots = function (o) {
    var k = o.relieved || 0, out = "";
    [-1, 1].forEach(function (sg) {
      var b = VT.shape("M -40 -250 L 36 -250 L 40 -50 C 90 -46 104 -20 100 0 L -44 0 Z", "#3E6E5A", { sw: 6 }) + VT.line("M -40 -230 L 36 -230", 5, "#2C5040");
      b += VT.line("M -26 -172 Q -14 -160 -2 -172", 5) + VT.line("M 6 -172 Q 18 -160 30 -172", 5); // mắt nhắm (không chấm: tránh đọc thành mắt mở)
      if (k > 0.2) b += VT.ell(2, -136, 8, 6 + 4 * k, "#22362d", 3);
      out += VT.g("translate(" + (sg * 50) + " 0) rotate(" + f(-sg * 10 * k) + " 0 0)" + (sg < 0 ? " scale(-1 1)" : ""), b);
    });
    return wrap(o, out);
  };
  /** Giỏ đồ giặt: gốc giữa đáy, rộng ~200. */
  VT.basket = function (o) {
    var out = VT.ell(-40, -120, 50, 26, "#E2B33C", 4) + VT.ell(30, -126, 46, 24, "#9CC8DC", 4) + VT.ell(0, -136, 34, 20, "#FFFDF6", 4) +
      VT.shape("M -100 -116 L 100 -116 L 84 0 L -84 0 Z", "#D8C39A", { sw: 6 });
    for (var i = -2; i <= 2; i++) out += VT.line("M " + (i * 34) + " -108 L " + (i * 30) + " -8", 3, INK, 0.45);
    return wrap(o, out);
  };
  /** Phao bơi tròn sọc đỏ trắng nhìn nghiêng: gốc tâm, r 80. part "back" | "front" | "all" (Wob chui giữa: back trước Wob, front sau Wob). */
  VT.floatRing = function (o) {
    var part = o.part || "all", out = "";
    function sg(a0, a1, col) { var r1 = 80, r0 = 44, k = 0.45, c0 = Math.cos(a0), s0 = Math.sin(a0), c1 = Math.cos(a1), s1 = Math.sin(a1);
      return '<path d="M ' + f(c0 * r1) + " " + f(s0 * r1 * k) + " A " + r1 + " " + f(r1 * k) + " 0 0 1 " + f(c1 * r1) + " " + f(s1 * r1 * k) + " L " + f(c1 * r0) + " " + f(s1 * r0 * k) + " A " + r0 + " " + f(r0 * k) + " 0 0 0 " + f(c0 * r0) + " " + f(s0 * r0 * k) + ' Z" fill="' + col + '" stroke="' + INK + '" stroke-width="5"/>'; }
    for (var i = 0; i < 8; i++) { var a0 = i * Math.PI / 4, back = i >= 4;
      if (part === "all" || (part === "back" && back) || (part === "front" && !back)) out += sg(a0, a0 + Math.PI / 4, i % 2 ? "#FFFDF6" : "#E04A3A"); }
    return wrap(o, out);
  };
  /** Cột nước: gốc giữa đáy, w (220), h (cao, px), t (sóng ở đỉnh). Trả "" khi h < 2. */
  VT.waterColumn = function (o) {
    var w = o.w || 220, h = o.h || 0, st = Math.round((o.t || 0) * 12);
    if (h < 2) return "";
    var wv = ""; for (var i = 0; i <= 6; i++) { var x = -w / 2 + i * w / 6; wv += (i ? " L " : "M ") + f(x) + " " + f(-h + Math.sin(st * 0.9 + i * 1.3) * 7); }
    return wrap(o, VT.shape(wv + " L " + f(w / 2) + " 0 L " + f(-w / 2) + " 0 Z", "#6FB3D2", { sw: 6 }) + VT.line("M " + f(-w / 2 + 26) + " " + f(-h + 30) + " L " + f(-w / 2 + 26) + " -20", 6, "#ffffff", 0.45));
  };
  /** Ki bowling: gốc giữa đáy, cao ~146. fall 0..1 đổ sang phải. fill. */
  VT.bowlingPin = function (o) {
    return wrap(o, VT.g("rotate(" + f(80 * (o.fall || 0)) + " 16 0)", VT.shape("M -14 0 C -34 -40 -26 -70 -12 -90 C -18 -110 -16 -140 0 -146 C 16 -140 18 -110 12 -90 C 26 -70 34 -40 14 0 Z", o.fill || "#F4E6C8", { sw: 5 }) + VT.line("M -12 -104 L 12 -104", 5, "#A8361F")));
  };
  /** Bông tuyết sáu cánh: gốc tâm, r 30, col. */
  VT.snowflake = function (o) {
    var out = "", r = o.r || 30;
    for (var i = 0; i < 3; i++) { var a = i * Math.PI / 3; out += VT.line("M " + f(-Math.cos(a) * r) + " " + f(-Math.sin(a) * r) + " L " + f(Math.cos(a) * r) + " " + f(Math.sin(a) * r), 5, o.col || INK); }
    return wrap(o, VT.dot(0, 0, r * 0.3, "#FFFFFF") + out);
  };
  /** Nhãn giá (không chữ): gốc lỗ buộc; dây tới (dx, dy). */
  VT.priceTag = function (o) {
    return wrap(o, VT.line("M 0 0 L " + f(o.dx || 0) + " " + f(o.dy == null ? -40 : o.dy), 3) + rect(-18, 4, 18, 60, "#FFFDF6", { sw: 4 }) + VT.ell(0, 14, 5, 5, "#EFE3C8", 3) + VT.line("M -8 34 L 8 34 M -8 46 L 4 46", 3, INK, 0.6));
  };
})();

/* ve-tay · thêm 23/11/2026 (tập Whittier, tiếp): mưa xiên, mặt toà nhà bê tông, áo mưa nhỏ. Chỉ thêm. */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f, INK = C.ink, wrap = VT.wrap;
  /** Mưa xiên (tất định theo bậc hình): n vạch trong box [x0, y0, x1, y1], slant px ngang mỗi 100 px dọc (gió), speed px/s, col, op. */
  VT.rain = function (t, n, box, o) {
    o = o || {}; var st = VT.twos(t), sl = o.slant == null ? 60 : o.slant, sp = o.speed || 1400, len = o.len || 70, out = "";
    var W = box[2] - box[0], H = box[3] - box[1];
    for (var i = 0; i < n; i++) {
      var y = box[1] + ((VT.hash(i * 3.1) * H + st * sp) % H), x = box[0] + ((VT.hash(i * 7.7 + 2) * W + st * sp * sl / 100) % W);
      out += VT.line("M " + f(x) + " " + f(y) + " l " + f(len * sl / 100) + " " + f(len), o.sw || 4, o.col || "#5f7f96", o.op == null ? 0.75 : o.op);
    }
    return out;
  };
  /** Mặt toà nhà bê tông nhiều tầng: gốc giữa chân, w, h, cols, rows, lit (tỉ lệ ô sáng), door (cửa chính giữa chân). */
  VT.towerWall = function (o) {
    var w = o.w || 700, h = o.h || 900, c = o.cols || 6, r = o.rows || 10, out = VT.rectS(-w / 2, -h, w / 2, 0, o.color || "#D8D2C4", { sw: 7 });
    var cw = (w - 80) / c, rh = (h - (o.door ? 260 : 80)) / r;
    for (var i = 0; i < c; i++) for (var j = 0; j < r; j++) {
      var x0 = -w / 2 + 40 + i * cw + 10, y0 = -h + 40 + j * rh + 8, lit = VT.hash(i * 13 + j * 7) < (o.lit == null ? 0.35 : o.lit);
      out += VT.rectS(x0, y0, x0 + cw - 20, y0 + rh - 18, lit ? C.window : "#7E8C94", { sw: 4 });
    }
    if (o.door) out += VT.rectS(-90, -200, 90, 0, "#6B5A48", { sw: 6 }) + VT.line("M 0 -200 L 0 0", 4) + VT.rectS(-130, -230, 130, -200, "#9C958A", { sw: 5 }) + VT.rectS(-160, 0, 160, 24, "#B4ADA2", { sw: 5 });
    return wrap(o, out);
  };
  /** Áo mưa vàng nhỏ (khoác lên vai): gốc giữa cổ áo, rộng ~240. wet 0..1 (giọt bám), drip pha giọt rơi (t). */
  VT.miniCoat = function (o) {
    var out = VT.shape("M -60 0 C -90 10 -120 40 -126 110 L -86 116 L -80 60 L -70 170 L 70 170 L 80 60 L 86 116 L 126 110 C 120 40 90 10 60 0 C 40 18 -40 18 -60 0 Z", "#E2B33C", { sw: 6 });
    out += VT.shape("M -60 0 C -64 -60 64 -60 60 0 C 40 18 -40 18 -60 0 Z", "#D4A52E", { sw: 5 }) + VT.line("M 0 14 L 0 166", 4, "#B98D22") + VT.dot(12, 60, 5) + VT.dot(12, 110, 5);
    if (o.wet) [[-100, 120], [96, 124], [-40, 176], [40, 178], [0, 176]].forEach(function (d, i) {
      var ph = ((o.t || 0) * 1.6 + i * 0.37) % 1, y = d[1] + ph * 90;
      out += VT.drop({ x: d[0], y: y, s: 0.5, fill: "#8fd0ea" });
    });
    return wrap(o, out);
  };
})();

/* ve-tay · đạo cụ thêm 26/11/2026 (tập Santa Cruz del Islote). Chỉ thêm, không đổi hàm cũ.
 * Ba lô khổng lồ (ô liu, cuộn thảm đỏ, bình xịt ở túi hông trái), bình xịt muỗi (tem đỏ còn niêm phong), con muỗi, va li tí hon, ghế nhựa,
 * phao vịt, ô, đồng hồ xăng (không chữ, không số), bấm đếm (không số), hũ kẹo + viên kẹo, quả cầu disco, cây đước, đảo kín nhà, mặt biển,
 * mũ tiệc, mũ phù thuỷ, máy lấy nước từ không khí, tấm pin mặt trời, chậu nhựa, cốc nhựa, cần cẩu, thuyền cá, thuyền giấy, cúc áo,
 * rương báu, xẻng nhựa gập, dây đèn, thánh giá quảng trường, tờ thực đơn hình vẽ, võng, túi hộp cơm. */
(function () {
  var VT = window.VT, C = VT.C, f = VT.f, INK = C.ink, wrap = VT.wrap;
  var M = VT.DAO_MAU = { sea: "#6FC2BA", seaDeep: "#3E8F95", seaLine: "#2E7D80", sand: "#EED9A4", cement: "#D3CBB8", teal: "#2A9D8F", red: "#C9463A",
    olive: "#7C8646", oliveDark: "#566030", mat: "#D9543C", cream: "#F3EBD8", leaf: "#5E9450", leafDark: "#3F6E3A", root: "#7A5A3C" };
  /** Đường chữ nhật bo góc. */
  function rr(x0, y0, x1, y1, r) {
    r = Math.min(r, (x1 - x0) / 2, (y1 - y0) / 2);
    return "M " + f(x0 + r) + " " + f(y0) + " L " + f(x1 - r) + " " + f(y0) + " Q " + f(x1) + " " + f(y0) + " " + f(x1) + " " + f(y0 + r) + " L " + f(x1) + " " + f(y1 - r) +
      " Q " + f(x1) + " " + f(y1) + " " + f(x1 - r) + " " + f(y1) + " L " + f(x0 + r) + " " + f(y1) + " Q " + f(x0) + " " + f(y1) + " " + f(x0) + " " + f(y1 - r) +
      " L " + f(x0) + " " + f(y0 + r) + " Q " + f(x0) + " " + f(y0) + " " + f(x0 + r) + " " + f(y0) + " Z";
  }
  VT.rrect = rr;
  function blobAt(x, y, r, seed, fill) { return VT.g("translate(" + f(x) + " " + f(y) + ")", VT.shape(VT.blob(r, seed, 9, 0.25), fill, { sw: 5 })); }

  /** Bình xịt muỗi: gốc giữa đáy, cao ~170. Trụ trắng kem, nắp xanh ngọc #2A9D8F, nhãn con muỗi gạch chéo (không chữ), tem đỏ #C9463A còn niêm phong. */
  VT.binhXit = function (o) {
    var out = VT.shape(rr(-28, -124, 28, 0, 10), M.cream, { sw: 5, ox: 3, oy: 2 }) +
      VT.shape("M -28 -118 C -28 -134 -18 -138 -16 -138 L 16 -138 C 18 -138 28 -134 28 -118 Z", M.cream, { sw: 5, ox: 2, oy: 1 }) +
      VT.shape(rr(-22, -166, 22, -134, 8), M.teal, { sw: 5, ox: 2, oy: 2 }) + VT.shape(rr(-6, -176, 8, -164, 3), M.teal, { sw: 4, ox: 1, oy: 1 }) +
      VT.ell(0, -62, 20, 20, "#FFFDF6", 4, { ox: 1, oy: 1 }) +
      VT.ell(-2, -60, 9, 4, INK, 0) + VT.line("M -6 -64 L -10 -72 M 2 -64 L 6 -72", 2.5) + VT.line("M 6 -60 L 13 -56", 2.5) +
      VT.line("M -13 -48 L 13 -76", 5, M.red) +
      VT.shape(rr(-25, -140, 25, -130, 2), M.red, { sw: 3, ox: 0, oy: 0 }) + VT.shape("M -5 -132 L 5 -132 L 5 -110 L 0 -104 L -5 -110 Z", M.red, { sw: 3, ox: 0, oy: 0 });
    return wrap(o, out);
  };

  /** Ba lô khổng lồ (khoá trang phục tập 4): gốc giữa đáy, cao ~410 ở s = 1 (≈ 1,6 thân Wob s = 1), ô liu #7C8646 viền #566030,
   *  cuộn thảm đỏ buộc trên nắp, bình xịt cắm túi hông TRÁI. o: {x, y, s, rot, sx, open 0..1 (nắp bật ra sau, lộ miệng tối, thảm lệch sang bên),
   *  wet 0..1 (sẫm + giọt), side (nhìn nghiêng: túi trước quay về +x, quai đeo phía −x), noCan (không bình xịt), lidPeek 0..1 (nắp hé như ngoái lại)}. */
  VT.baLoKhongLo = function (o) {
    var wet = o.wet || 0, P = wet > 0.5 ? "#69733A" : M.olive, PD = M.oliveDark, out = "", op = VT.clamp(o.open || 0, 0, 1);
    function mat(x, y, rot) {
      return VT.g("translate(" + f(x) + " " + f(y) + ") rotate(" + f(rot || 0) + ")",
        VT.shape(rr(-118, -36, 118, 36, 34), wet > 0.5 ? "#B8452F" : M.mat, { sw: 6 }) + VT.ell(-112, 0, 16, 34, "#E8806A", 5, { ox: 0, oy: 0 }) +
        VT.line("M -112 -16 C -100 -10 -100 10 -112 14", 3, INK, 0.7) + VT.line("M -60 -36 L -60 36", 8, PD) + VT.line("M 60 -36 L 60 36", 8, PD));
    }
    if (o.side) {
      out += VT.line("M -80 -290 C -124 -220 -124 -120 -84 -40", 13, PD) + VT.line("M -80 -290 C -124 -220 -124 -120 -84 -40", 3, INK, 0.6); // quai
      out += VT.shape(rr(-84, -330, 84, 0, 50), P, { sw: 7 });
      out += VT.shape("M 80 -260 C 136 -250 136 -60 80 -50 Z", PD, { sw: 6 });
      out += VT.shape("M -88 -330 C -88 -352 88 -352 88 -330 L 98 -262 C 60 -250 -20 -256 -88 -272 Z", PD, { sw: 6 });
      out += mat(0, -374, 0);
    } else {
      if (!o.noCan) out += VT.binhXit({ x: -150, y: -70, s: 0.72, rot: -8 });
      if (op > 0) out += VT.g("rotate(" + f(150 * op) + " 0 -330)", VT.shape("M -128 -330 L 128 -330 L 118 -244 C 60 -230 -60 -230 -118 -244 Z", PD, { sw: 6 }));
      out += VT.shape(rr(-136, -340, 136, 0, 64), P, { sw: 7 });
      out += VT.line("M -110 -60 C -40 -44 40 -44 110 -60", 4, INK, 0.35);
      out += VT.shape(rr(-92, -176, 92, -40, 30), PD, { sw: 6 });
      out += VT.line("M -70 -150 C -20 -140 20 -140 70 -150", 4, INK, 0.5);
      out += VT.shape(rr(-172, -150, -126, -30, 16), PD, { sw: 5 });
      out += VT.shape(rr(126, -150, 172, -30, 16), PD, { sw: 5 });
      if (op > 0) {
        out += VT.ell(0, -334, 110 * (0.6 + 0.4 * op), 24, "#2a2e2a", 5, { ox: 0, oy: 0 });
        out += mat(170 * op, -372 + 40 * op, 24 * op);
      } else {
        var pk = o.lidPeek || 0;
        out += VT.g("rotate(" + f(-16 * pk) + " -120 -334)", VT.shape("M -128 -334 C -128 -358 128 -358 128 -334 L 118 -240 C 60 -226 -60 -226 -118 -240 Z", PD, { sw: 6 }) +
          VT.shape(rr(-74, -262, -46, -214, 6), "#E8C25A", { sw: 3 }) + VT.shape(rr(46, -262, 74, -214, 6), "#E8C25A", { sw: 3 }));
        out += mat(0, -378 - 30 * pk, -6 * pk);
      }
    }
    if (wet > 0) [[-90, -20], [40, -8], [110, -120], [-120, -200]].forEach(function (d, i) { out += VT.drop({ x: d[0], y: d[1] + 20 * VT.hash(i + 3), s: 0.6 * wet }); });
    return wrap(o, out);
  };

  /** Con muỗi vẽ tay: gốc tâm ngực, đầu bên phải (+x), dài ~130 ở s = 1. o: {x, y, s, rot, sx (−1 quay trái), t (cánh vỗ theo bậc hình),
   *  pose: "bay"|"dung"|"hong" (đứng chống nạnh), eyes: "open"|"cross"|"closed"|"smug", px, py (con ngươi),
   *  hat: "tiec" (mũ tiệc trên đầu) | "tiec-tay" (mũ tiệc đã tháo, cầm ở chân), suitcase (xách va li tí hon), point (chân trước chỉ tới)}. */
  VT.muoi = function (o) {
    var t = o.t || 0, flap = Math.round(t * 24) % 2, pose = o.pose || "bay", out = "", BODY = "#5B5650", LIGHT = "#BDB6A8";
    var wA = flap ? -38 : 8;
    var wing = function (rot, dx) { return VT.g("rotate(" + rot + " " + dx + " -10)", '<ellipse cx="' + (dx - 26) + '" cy="-34" rx="34" ry="13" fill="#EAF6FA" opacity="0.75" stroke="' + INK + '" stroke-width="3"/>'); };
    out += wing(wA + 10, -6);
    var legs = pose === "bay" ? ["M -4 8 Q -14 30 -30 44", "M 2 10 Q -2 34 -14 50", "M 8 8 Q 14 30 6 50"] :
      ["M -4 8 Q -20 26 -30 46 L -38 46", "M 2 10 Q 0 30 -4 46 L -12 46", "M 8 8 Q 26 24 30 46 L 38 46"];
    legs.forEach(function (l) { out += VT.line(l, 3); });
    out += VT.g("rotate(22 -14 6)", '<ellipse cx="-50" cy="6" rx="40" ry="13" fill="' + BODY + '" stroke="' + INK + '" stroke-width="3.5"/>' +
      VT.line("M -70 -6 L -70 18 M -54 -8 L -54 20 M -38 -8 L -38 20", 4, LIGHT, 0.9));
    out += VT.ell(0, 0, 17, 15, BODY, 3.5, { ox: 0, oy: 0 });
    out += VT.ell(22, -10, 13, 12, BODY, 3.5, { ox: 0, oy: 0 });
    out += VT.line("M 33 -6 L 66 6", 3.5);
    var ey = o.eyes || "open";
    if (ey === "closed") out += VT.line("M 18 -12 Q 24 -6 30 -12", 3);
    else if (ey === "smug") out += VT.ell(25, -12, 7, 7, "#fffdf6", 2.5, { ox: 0, oy: 0 }) + VT.dot(27 + (o.px || 0), -10 + (o.py || 0), 3) + VT.line("M 17 -15 L 33 -15", 4);
    else { out += VT.ell(25, -13, 8, 8, "#fffdf6", 2.5, { ox: 0, oy: 0 }); out += ey === "cross" ? VT.dot(21, -12, 3.5) : VT.dot(26 + (o.px || 0), -12 + (o.py || 0), 3.5); }
    if (pose === "hong") out += VT.line("M 6 -2 Q 20 10 6 18", 3.5) + VT.line("M -6 -2 Q -22 10 -8 18", 3.5);
    else if (o.point) out += VT.line("M 8 0 Q 30 4 54 -12", 3.5);
    else if (o.suitcase) out += VT.line("M 6 4 L 10 34", 3.5) + VT.vali({ x: 10, y: 34, s: 0.6 });
    else out += VT.line("M 6 2 Q 18 14 16 24", 3);
    out += wing(-wA - 6, 4);
    if (o.hat === "tiec") out += VT.muTiec({ x: 24, y: -20, s: 0.32, rot: 14 });
    if (o.hat === "tiec-tay") out += VT.line("M 6 4 L 14 30", 3.5) + VT.muTiec({ x: 16, y: 26, s: 0.3, rot: 160 });
    return wrap(o, out);
  };
  /** Va li tí hon: gốc giữa quai (trên), rộng ~70. */
  VT.vali = function (o) {
    return wrap(o, VT.line("M -12 10 L -12 0 L 12 0 L 12 10", 5) + VT.shape(rr(-36, 10, 36, 58, 8), "#B8743A", { sw: 4, ox: 2, oy: 2 }) +
      VT.line("M -36 30 L 36 30", 3, INK, 0.6) + VT.shape(rr(-4, 24, 4, 36, 2), "#E8C25A", { sw: 2, ox: 0, oy: 0 }));
  };

  /** Ghế nhựa liền khối (nhìn chéo trước): gốc giữa đáy, cao ~320, mặt ghế ở y = −150. color (VT.GHE_MAU, trắng mặc định). */
  VT.GHE_MAU = { trang: "#F4F1EA", do: "#D9543C", xanh: "#5A8FC0" };
  VT.gheNhua = function (o) {
    var c = o.color || VT.GHE_MAU.trang, out = "";
    var leg = function (d) { return VT.line(d, 15) + VT.line(d, 7, c); };
    out += leg("M -92 -150 L -110 0") + leg("M 92 -150 L 110 0");
    out += VT.shape("M -96 -300 C -96 -322 96 -322 96 -300 L 90 -168 L -90 -168 Z", c, { sw: 6 });
    [-270, -240, -210].forEach(function (y) { out += VT.line("M -70 " + y + " L 70 " + y, 4, INK, 0.45); });
    out += VT.shape("M -114 -170 L 114 -170 L 104 -136 L -104 -136 Z", c, { sw: 6 });
    out += leg("M -70 -140 L -80 0") + leg("M 70 -140 L 80 0");
    return wrap(o, out);
  };

  /** Phao bơi hình vịt: gốc tâm vòng, rộng ~330. */
  VT.phaoVit = function (o) {
    var out = VT.shape("M -120 0 C -120 -60 120 -60 120 0 C 120 60 -120 60 -120 0 Z M -56 0 C -56 22 56 22 56 0 C 56 -22 -56 -22 -56 0 Z", "#F2C94C", { sw: 6, rule: "evenodd" });
    out += VT.shape("M 80 -30 C 70 -110 160 -130 170 -70 C 174 -40 150 -24 120 -22 Z", "#F2C94C", { sw: 6 });
    out += VT.shape("M 166 -82 L 206 -74 L 168 -60 Z", "#E0703A", { sw: 4 }) + VT.dot(148, -88, 7);
    out += VT.line("M -90 -30 C -60 -46 -20 -50 10 -48", 4, "#fff6c8", 0.9);
    return wrap(o, out);
  };
  /** Ô (dù): gốc đáy cán móc, dài ~320. open 0..1 (0 cụp, 1 xoè). color. */
  VT.umbrella = function (o) {
    var k = VT.clamp(o.open == null ? 1 : o.open, 0, 1), c = o.color || "#E0703A", w = VT.lerp(26, 170, k), h = VT.lerp(170, 110, k), out = "";
    out += VT.line("M 0 -280 L 0 -20 C 0 10 -36 10 -36 -14", 8);
    var top = -300, d = "M " + f(-w) + " " + f(top + h) + " C " + f(-w) + " " + f(top + h * 0.2) + " " + f(-w * 0.4) + " " + top + " 0 " + top + " C " + f(w * 0.4) + " " + top + " " + f(w) + " " + f(top + h * 0.2) + " " + f(w) + " " + f(top + h);
    for (var i = 0; i < 4; i++) { var x0 = VT.lerp(w, -w, i / 4), x1 = VT.lerp(w, -w, (i + 1) / 4); d += " Q " + f((x0 + x1) / 2) + " " + f(top + h - 26 * k) + " " + f(x1) + " " + f(top + h); }
    out += VT.shape(d + " Z", c, { sw: 6 });
    out += VT.line("M 0 " + top + " L 0 " + f(top - 24), 6);
    out += VT.line("M " + f(-w * 0.5) + " " + f(top + h) + " Q " + f(-w * 0.3) + " " + f(top + h * 0.3) + " 0 " + top, 3, INK, 0.5) + VT.line("M " + f(w * 0.5) + " " + f(top + h) + " Q " + f(w * 0.3) + " " + f(top + h * 0.3) + " 0 " + top, 3, INK, 0.5);
    return wrap(o, out);
  };

  /** Đồng hồ xăng: gốc tâm, bán kính ~150. KHÔNG chữ, KHÔNG số (không E/F): vạch, vạch đỏ phía rỗng, biểu tượng cây xăng, kim. level 0..1 (1 = đầy, kim lệch phải). */
  VT.dongHoXang = function (o) {
    var out = VT.ell(0, 0, 150, 150, "#2F3A3E", 8, { ox: 4, oy: 4 }) + VT.ell(0, 0, 128, 128, "#F6F0DC", 5, { ox: 0, oy: 0 });
    for (var i = 0; i <= 8; i++) {
      var a = (-60 + 15 * i) * Math.PI / 180, r0 = i % 2 ? 98 : 84, s = Math.sin(a), c = -Math.cos(a);
      out += VT.line("M " + f(r0 * s) + " " + f(r0 * c) + " L " + f(116 * s) + " " + f(116 * c), i % 2 ? 4 : 7, i < 2 ? M.red : INK);
    }
    out += VT.g("translate(-16 56)", VT.shape(rr(-20, -36, 16, 20, 4), INK, { sw: 0, ox: 0, oy: 0 }) + VT.shape(rr(-13, -29, 9, -14, 2), "#F6F0DC", { sw: 0, ox: 0, oy: 0 }) +
      VT.line("M 16 -26 L 28 -18 L 28 8 C 28 16 36 16 36 8 L 36 -14", 4));
    var ang = (-60 + 120 * VT.clamp(o.level == null ? 1 : o.level, 0, 1)) * Math.PI / 180;
    out += VT.line("M " + f(-16 * Math.sin(ang)) + " " + f(16 * Math.cos(ang)) + " L " + f(104 * Math.sin(ang)) + " " + f(-104 * Math.cos(ang)), 8, M.red);
    out += VT.ell(0, 0, 14, 14, INK, 0, { ox: 0, oy: 0 });
    out += VT.line("M -96 -60 C -70 -96 -30 -112 10 -112", 6, "#ffffff", 0.6);
    return wrap(o, out);
  };

  /** Bấm đếm cầm tay: gốc tâm thân, rộng ~180. KHÔNG số: ô hiển thị chỉ có vạch. press 0..1 (nút lún), heat 0..1 (đỏ nóng), smoke 0..1 + t (khói bốc). */
  VT.bamDem = function (o) {
    var p = VT.clamp(o.press || 0, 0, 1), h = o.heat || 0, out = "";
    var ring = "M -66 10 C -120 10 -120 80 -66 80 C -46 80 -40 64 -40 50";
    out += VT.line(ring, 14) + VT.line(ring, 6, "#B8C2C8");
    out += VT.shape(rr(36, -96 + 18 * p, 72, -60, 8), "#9AA7AE", { sw: 5 });
    out += VT.shape(rr(-70, -66, 76, 66, 40), "#C2CCD2", { sw: 7 });
    if (h > 0) out += '<path d="' + rr(-70, -66, 76, 66, 40) + '" fill="#E85D45" opacity="' + f(45 * h) / 100 + '"/>';
    out += VT.shape(rr(-44, -30, 52, 12, 6), "#2F3A3E", { sw: 4, ox: 0, oy: 0 });
    for (var i = 0; i < 4; i++) { var x = -30 + i * 23; out += VT.line("M " + x + " -22 L " + x + " 4", 4, "#9fd8a8", 0.9); }
    out += VT.ell(2, 40, 14, 10, "#9AA7AE", 4, { ox: 0, oy: 0 });
    if (o.smoke) {
      var st = Math.round((o.t || 0) * 12);
      [-30, 10, 50].forEach(function (x, i) { var w = Math.sin(st * 0.8 + i * 2.1) * 10; out += VT.line("M " + x + " -80 C " + f(x - 20 + w) + " -120 " + f(x + 20 - w) + " -150 " + f(x + w) + " -200", 10, "#8a8a8a", f(65 * o.smoke) / 100); });
    }
    return wrap(o, out);
  };

  /** Viên kẹo dẻo (jelly bean): gốc tâm, dài ~60. color, eyes (mắt chấm), hat (mũ cói nhỏ), legs (pha chân đi, số). */
  VT.keo = function (o) {
    var out = "";
    if (o.legs != null && o.legs !== false) { var a = Math.sin(o.legs * Math.PI * 2) * 6; out += VT.line("M -8 10 L " + f(-10 - a) + " 26", 3) + VT.line("M 8 10 L " + f(10 + a) + " 26", 3); }
    out += VT.shape("M -28 -2 C -30 -18 -10 -20 0 -14 C 10 -8 28 -20 30 -4 C 32 12 14 18 0 16 C -16 16 -26 12 -28 -2 Z", o.color || "#E85D45", { sw: 3.5, ox: 2, oy: 2 });
    out += VT.line("M -18 -8 C -12 -12 -6 -12 -2 -10", 3, "#ffffff", 0.7);
    if (o.eyes) out += VT.dot(-6, 0, 3) + VT.dot(8, 0, 3);
    if (o.hat) out += VT.sunhat({ x: 0, y: -14, s: 0.17, mau: "coi" });
    return wrap(o, out);
  };
  VT.KEO_MAU = ["#E85D45", "#F2C94C", "#5E9E48", "#8E6BBF", "#F29E4C", "#E86FA0", "#4FA3C7"];
  /** Hũ kẹo thuỷ tinh: gốc giữa đáy, cao ~380, rộng ~330; đầy kẹo tới mức fill (0..1). seed. lid: có nắp đỏ. */
  VT.huKeo = function (o) {
    var r = VT.rng(o.seed || 7), fill = o.fill == null ? 0.82 : o.fill, out = "", surf = VT.lerp(0, -340, fill);
    var jar = "M -130 -340 C -170 -320 -170 -40 -150 -14 C -140 0 140 0 150 -14 C 170 -40 170 -320 130 -340 Z";
    out += '<path d="' + jar + '" fill="#E3F1F4" opacity="0.75"/>';
    var id = VT.uid("hk");
    out += '<clipPath id="' + id + '"><path d="' + jar + '"/></clipPath><g clip-path="url(#' + id + ')">';
    for (var i = 0; i < 110; i++) {
      var x = -150 + r() * 300, y = -12 + r() * (surf + 12);
      out += VT.keo({ x: x, y: y, s: 0.8, rot: r() * 180, color: VT.KEO_MAU[i % VT.KEO_MAU.length] });
    }
    out += "</g>";
    out += VT.line(jar, 7) + VT.line("M -110 -300 C -130 -220 -130 -120 -116 -60", 8, "#ffffff", 0.7);
    out += VT.shape(rr(-140, -380, 140, -336, 14), "#E3F1F4", { sw: 6, op: 0.9 });
    if (o.lid) out += VT.shape(rr(-150, -420, 150, -376, 12), "#D9543C", { sw: 6 });
    return wrap(o, out);
  };

  /** Quả cầu disco treo: gốc điểm treo (trên), dây dài len (120), bán kính r (70), t (lấp lánh). */
  VT.discoBall = function (o) {
    var L = o.len == null ? 120 : o.len, R = o.r || 70, cy = L + R, out = VT.line("M 0 0 L 0 " + L, 4), id = VT.uid("dc");
    out += VT.ell(0, cy, R, R, "#B9C4CC", 6, { ox: 3, oy: 3 });
    out += '<clipPath id="' + id + '"><circle cx="0" cy="' + cy + '" r="' + R + '"/></clipPath><g clip-path="url(#' + id + ')">';
    var st = Math.round((o.t || 0) * 12);
    for (var gy = -R; gy < R; gy += 18) for (var gx = -R; gx < R; gx += 18) {
      var h = VT.hash(gx * 3.1 + gy * 7.3 + st * 1.7);
      if (h > 0.72) out += '<rect x="' + gx + '" y="' + (cy + gy) + '" width="17" height="17" fill="#FFFDF6" opacity="0.9"/>';
      else if (h < 0.12) out += '<rect x="' + gx + '" y="' + (cy + gy) + '" width="17" height="17" fill="#8E9BA4"/>';
    }
    for (var k = -R; k <= R; k += 18) out += VT.line("M " + k + " " + (cy - R) + " L " + k + " " + (cy + R), 2, INK, 0.5) + VT.line("M " + (-R) + " " + (cy + k) + " L " + R + " " + (cy + k), 2, INK, 0.5);
    out += "</g>" + VT.ell(0, cy, R, R, "none", 6);
    out += VT.sparkle({ x: R * 0.5, y: cy - R * 0.5, s: 0.45 + 0.25 * (st % 2) });
    return wrap(o, out);
  };

  /** Cây đước: gốc tâm mặt nước dưới cây, rộng ~300, cao ~380 ở s = 1. Rễ chống vòng cung cắm xuống nước. seed đổi dáng tán. */
  VT.duoc = function (o) {
    var sd = o.seed || 1, out = "";
    [-130, -86, -44, 6, 52, 96, 136].forEach(function (x, i) {
      var top = -110 - 20 * VT.hash(sd + i), mid = x * 0.35, d = "M " + f(mid) + " " + f(top) + " Q " + f(x * 1.1) + " " + f(top - 16) + " " + f(x) + " 24";
      out += VT.line(d, 8, M.root) + VT.line(d, 2.5, INK, 0.7);
    });
    out += VT.shape("M -18 -100 L -10 -210 L 10 -210 L 18 -100 Z", M.root, { sw: 5 });
    [[-90, -236, 80], [90, -230, 80], [0, -290, 96], [-40, -206, 70], [50, -200, 70]].forEach(function (b, i) { out += blobAt(b[0], b[1], b[2], sd * 5 + i, i % 2 ? M.leafDark : M.leaf); });
    return wrap(o, out);
  };

  /** Mặt biển: từ y xuống dưới, phủ ngang x0..x1 (mặc định −1200..3100). t: gợn sóng trôi. col, deep, n (số gợn). Trả SVG toạ độ thế giới. */
  VT.bien = function (o) {
    var y = o.y, x0 = o.x0 == null ? -1200 : o.x0, x1 = o.x1 == null ? 3100 : o.x1, st = Math.round((o.t || 0) * 12), out = "", W = x1 - x0;
    out += '<rect x="' + x0 + '" y="' + f(y) + '" width="' + W + '" height="2400" fill="' + (o.col || M.sea) + '"/>';
    out += '<rect x="' + x0 + '" y="' + f(y + 180) + '" width="' + W + '" height="2400" fill="' + (o.deep || M.seaDeep) + '" opacity="0.4"/>';
    var d = "M " + x0 + " " + f(y);
    for (var x = x0; x < x1; x += 60) d += " Q " + f(x + 30) + " " + f(y - 8 + 4 * Math.sin(st * 0.5 + x * 0.01)) + " " + f(x + 60) + " " + f(y);
    out += VT.line(d, 6);
    for (var i = 0; i < (o.n || 14); i++) {
      var xx = x0 + (((VT.hash(i * 3.3) * W + st * 5 * (i % 2 ? 1 : -1)) % W) + W) % W, yy = y + 40 + VT.hash(i * 1.7) * (o.depth || 260);
      out += VT.line("M " + f(xx) + " " + f(yy) + " q 22 -10 44 0 q 22 10 44 0", 4, M.seaLine, 0.55);
    }
    return out;
  };

  /** Đảo kín nhà nhìn ngang: gốc giữa mép nước, rộng w (900). Hai dãy nhà nhỏ sát nhau, mái tôn/ngói, cửa khép. seed, lit (cửa sổ sáng), faint (nhạt), door. */
  VT.NHA_MAU = ["#F2C6A0", "#9CC8DC", "#F4E3A1", "#E8A9A0", "#B8D8B0", "#F6EEDC", "#D9B8E0", "#F0B87A"];
  VT.daoNha = function (o) {
    var w = o.w || 900, hw = w / 2, r = VT.rng(o.seed || 11), out = "", ink = o.faint ? 3.5 : 5;
    var row = function (y0, hMin, hMax, sc) {
      var x = -hw + 10, s = "";
      while (x < hw - 30) {
        var ww = (56 + r() * 40) * sc, hh = hMin + r() * (hMax - hMin), col = VT.NHA_MAU[Math.floor(r() * VT.NHA_MAU.length)];
        if (x + ww > hw - 10) ww = hw - 10 - x;
        if (ww < 24) break;
        s += VT.shape("M " + f(x) + " " + f(y0) + " L " + f(x) + " " + f(y0 - hh) + " L " + f(x + ww) + " " + f(y0 - hh) + " L " + f(x + ww) + " " + f(y0) + " Z", col, { sw: ink, ox: 2, oy: 2 });
        var tin = r() < 0.6;
        s += VT.shape("M " + f(x - 6) + " " + f(y0 - hh) + " L " + f(x + ww * 0.5) + " " + f(y0 - hh - (tin ? 14 : 26) * sc) + " L " + f(x + ww + 6) + " " + f(y0 - hh) + " Z", tin ? "#A9B3B8" : "#C9603A", { sw: ink - 1, ox: 1, oy: 1 });
        if (ww > 40 * sc) s += VT.shape("M " + f(x + ww * 0.2) + " " + f(y0 - hh * 0.75) + " l " + f(14 * sc) + " 0 l 0 " + f(14 * sc) + " l " + f(-14 * sc) + " 0 Z", o.lit ? "#F6C46A" : "#3A4A52", { sw: 2.5, ox: 0, oy: 0 });
        if (o.door !== false && ww > 46 * sc) s += VT.shape("M " + f(x + ww * 0.58) + " " + f(y0) + " l 0 " + f(-28 * sc) + " l " + f(14 * sc) + " 0 l 0 " + f(28 * sc) + " Z", "#7A5A3C", { sw: 2.5, ox: 0, oy: 0 });
        x += ww + 2;
      }
      return s;
    };
    out += row(-40, 50, 90, 0.85);
    out += row(-10, 34, 70, 1);
    out += VT.shape("M " + (-hw - 20) + " 6 L " + (-hw) + " -14 L " + hw + " -14 L " + (hw + 20) + " 6 Z", M.cement, { sw: ink });
    var g = wrap(o, out);
    return o.faint ? '<g opacity="0.6">' + g + "</g>" : g;
  };

  /** Mũ tiệc giấy: gốc giữa đáy, cao ~130. color. */
  VT.muTiec = function (o) {
    var c = o.color || "#8E6BBF";
    return wrap(o, VT.shape("M -40 0 L 0 -110 L 40 0 C 20 8 -20 8 -40 0 Z", c, { sw: 5 }) + VT.line("M -28 -30 L 24 -46 M -18 -60 L 14 -72", 5, "#F2C94C") +
      VT.ell(0, -116, 12, 12, "#F2C94C", 4, { ox: 1, oy: 1 }));
  };
  /** Mũ phù thuỷ giấy: gốc giữa đáy, cao ~250. Sao vẽ nét (không chữ). color. */
  VT.muPhuThuy = function (o) {
    var c = o.color || "#5B4B8A", star = function (x, y, s) { return VT.g("translate(" + x + " " + y + ") scale(" + s + ")", VT.shape("M 0 -30 L 9 -9 L 30 -6 L 14 9 L 18 30 L 0 19 L -18 30 L -14 9 L -30 -6 L -9 -9 Z", "#F6D36A", { sw: 5, ox: 1, oy: 1 })); };
    return wrap(o, VT.shape("M -60 -10 C -40 -100 -20 -180 20 -230 C 40 -250 70 -240 80 -220 C 50 -226 40 -180 54 -10 Z", c, { sw: 6 }) +
      VT.shape("M -120 -6 C -80 -30 100 -30 130 -6 C 100 14 -90 14 -120 -6 Z", c, { sw: 6 }) + star(-6, -90, 0.6) + star(22, -150, 0.45) + VT.line("M -54 -30 C -10 -40 30 -40 56 -30", 10, "#F6D36A"));
  };

  /** Máy lấy nước từ không khí: gốc giữa đáy, cao ~360. t: quạt quay. water 0..1 mức nước trong bình chứa trong suốt ở dưới. */
  VT.mayHutAm = function (o) {
    var t = o.t || 0, out = "", a = Math.round(t * 12) * 37;
    out += VT.shape(rr(-130, -360, 130, -120, 18), "#A9C3CF", { sw: 7 });
    out += VT.ell(-20, -250, 76, 76, "#E6EEF2", 6, { ox: 2, oy: 2 });
    out += VT.g("rotate(" + a + " -20 -250)", [0, 120, 240].map(function (d) { return VT.g("rotate(" + d + " -20 -250)", VT.shape("M -20 -250 C -10 -300 30 -316 34 -296 C 34 -276 0 -260 -20 -250 Z", "#7FA9BC", { sw: 4 })); }).join(""));
    out += VT.ell(-20, -250, 12, 12, INK, 0, { ox: 0, oy: 0 });
    for (var y = -330; y < -170; y += 26) out += VT.line("M 76 " + y + " L 112 " + y, 5);
    out += VT.line("M 0 -120 L 0 -96", 10) + VT.line("M 0 -120 L 0 -96", 4, "#8fd0ea");
    out += VT.shape(rr(-90, -96, 90, 0, 16), "#E3F1F4", { sw: 6, op: 0.95 });
    var lv = VT.clamp(o.water == null ? 0.5 : o.water, 0, 1);
    if (lv > 0) out += '<path d="' + rr(-82, -8 - 80 * lv, 82, -8, 10) + '" fill="#8fd0ea" opacity="0.85"/>';
    return wrap(o, out);
  };
  /** Tấm pin mặt trời trên giá: gốc giữa đáy, cao ~260, rộng ~330. dashed: toàn bộ nét đứt, tô nhạt (dự án mới cân nhắc). */
  VT.pinMatTroi = function (o) {
    var dsh = o.dashed ? ' stroke-dasharray="18 14"' : "", ln = function (d, sw) { return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + sw + '" stroke-linecap="round"' + dsh + "/>"; };
    var panel = "M -160 -150 L 120 -260 L 170 -200 L -110 -90 Z", out = "";
    out += '<path d="' + panel + '" fill="#3E5C8A" opacity="' + (o.dashed ? 0.3 : 0.9) + '"/>' + ln(panel, 6);
    for (var i = 1; i < 4; i++) out += ln("M " + f(VT.lerp(-160, 120, i / 4)) + " " + f(VT.lerp(-150, -260, i / 4)) + " L " + f(VT.lerp(-110, 170, i / 4)) + " " + f(VT.lerp(-90, -200, i / 4)), 3);
    out += ln("M -135 -120 L 145 -230", 3) + ln("M 0 -150 L 0 0 M -60 0 L 60 0", 7);
    return wrap(o, out);
  };

  /** Chậu nhựa: gốc giữa đáy, rộng ~330, cao ~100. part: "back" (miệng sau + lòng) | "front" (thành trước) | "all". color. */
  VT.chauNhua = function (o) {
    var c = o.color || "#4FA3C7", part = o.part || "all", out = "";
    if (part !== "front") out += VT.ell(0, -100, 165, 32, "#2F7FA3", 6, { ox: 0, oy: 0 }) + VT.ell(0, -96, 146, 22, "#BFE3F2", 0, { ox: 0, oy: 0 });
    if (part !== "back") out += VT.shape("M -165 -100 C -140 -60 -140 -10 -120 0 C -60 12 60 12 120 0 C 140 -10 140 -60 165 -100 C 120 -72 -120 -72 -165 -100 Z", c, { sw: 6 }) +
      VT.line("M -150 -88 C -100 -64 100 -64 150 -88", 8, "#ffffff", 0.35);
    return wrap(o, out);
  };
  /** Cốc nhựa nhỏ: gốc giữa đáy, cao ~80. */
  VT.cocNhua = function (o) {
    return wrap(o, VT.shape("M -32 -80 L -24 0 L 24 0 L 32 -80 Z", "#E6F1F6", { sw: 5 }) + VT.ell(0, -80, 32, 8, "#BFE3F2", 4, { ox: 0, oy: 0 }) + VT.line("M -20 -64 L -16 -12", 4, "#ffffff", 0.8));
  };

  /** Cần cẩu giấy: gốc chân cột, cao h (520), cần dài len (420) chĩa +x, cáp dài cap (200). VT.canCauMoc(o) → toạ độ khung của móc. */
  VT.canCau = function (o) {
    var H = o.h || 520, L = o.len || 420, cap = o.cap == null ? 200 : o.cap, out = "", Y = "#E2B33C";
    out += VT.shape(rr(-70, -40, 70, 0, 8), "#8E9BA4", { sw: 6 });
    out += VT.shape("M -26 -40 L -26 " + (-H) + " L 26 " + (-H) + " L 26 -40 Z", Y, { sw: 6 });
    for (var y = -40; y > -H + 30; y -= 52) out += VT.line("M -26 " + y + " L 26 " + (y - 52) + " M 26 " + y + " L -26 " + (y - 52), 3, INK, 0.6);
    out += VT.shape("M -80 " + (-H - 34) + " L " + L + " " + (-H - 34) + " L " + L + " " + (-H + 6) + " L -80 " + (-H + 6) + " Z", Y, { sw: 6 });
    for (var x = -60; x < L - 20; x += 50) out += VT.line("M " + x + " " + (-H + 6) + " L " + (x + 25) + " " + (-H - 34) + " L " + (x + 50) + " " + (-H + 6), 3, INK, 0.6);
    out += VT.shape(rr(-110, -H - 60, -40, -H + 20, 6), "#5D6A72", { sw: 5 });
    out += VT.line("M " + (L - 20) + " " + (-H + 6) + " L " + (L - 20) + " " + (-H + 6 + cap), 4);
    out += VT.line("M " + (L - 20) + " " + (-H + 6 + cap) + " c 0 30 -30 30 -30 10", 7);
    return wrap(o, out);
  };
  VT.canCauMoc = function (o) { var s = o.s == null ? 1 : o.s, H = o.h || 520, L = o.len || 420, cap = o.cap == null ? 200 : o.cap; return [o.x + (L - 20) * s * (o.sx || 1), o.y + (-H + 6 + cap + 20) * s]; };

  /** Thuyền cá gỗ nhỏ có máy đuôi: gốc giữa mép nước, dài ~480. sink 0..1 (chìm, chúi đuôi). color viền. */
  VT.thuyenCa = function (o) {
    var sk = o.sink || 0, c = o.color || M.teal, out = "";
    var hull = "M -220 -80 L 230 -80 C 220 -30 190 10 150 20 L -170 20 C -200 0 -214 -40 -220 -80 Z";
    out += VT.shape(hull, "#F4F1EA", { sw: 7 });
    out += VT.line("M -216 -62 L 226 -62", 12, c) + VT.line("M -190 -6 C -60 4 80 4 180 -6", 8, M.red, 0.9);
    out += VT.shape(rr(-256, -124, -214, -60, 6), "#5D6A72", { sw: 5 }) + VT.line("M -236 -60 L -236 0", 8);
    return wrap(o, VT.g("translate(0 " + f(70 * sk) + ") rotate(" + f(-10 * sk) + " -200 0)", out));
  };
  /** Thuyền giấy: gốc giữa đáy, rộng ~140. color. */
  VT.thuyenGiay = function (o) {
    var c = o.color || "#FFFDF6";
    return wrap(o, VT.shape("M -36 -30 L 0 -96 L 36 -30 Z", c, { sw: 5 }) + VT.line("M 0 -96 L 0 -30", 3, INK, 0.5) + VT.shape("M -70 -30 L 70 -30 L 46 0 L -46 0 Z", c, { sw: 5 }));
  };
  /** Cúc áo: gốc tâm, bán kính r (14). Không tia sáng. color. */
  VT.cucAo = function (o) {
    var R = o.r || 14;
    return wrap(o, VT.ell(0, 0, R, R, o.color || "#C9A46A", 4, { ox: 1, oy: 1 }) + VT.dot(-R * 0.3, -R * 0.3, R * 0.15) + VT.dot(R * 0.3, -R * 0.3, R * 0.15) + VT.dot(-R * 0.3, R * 0.3, R * 0.15) + VT.dot(R * 0.3, R * 0.3, R * 0.15));
  };
  /** Rương báu: gốc giữa đáy, rộng ~200. open 0..1. */
  VT.ruong = function (o) {
    var k = VT.clamp(o.open || 0, 0, 1), out = "";
    out += VT.shape(rr(-100, -100, 100, 0, 8), C.wood, { sw: 6 }) + VT.line("M -60 -100 L -60 0 M 60 -100 L 60 0", 10, "#E8C25A");
    out += VT.g("rotate(" + f(-70 * k) + " -100 -100)", VT.shape("M -100 -100 C -100 -160 100 -160 100 -100 Z", C.woodDark, { sw: 6 }) + VT.line("M -60 -100 L -60 -150 M 60 -100 L 60 -150", 10, "#E8C25A"));
    out += VT.shape(rr(-14, -112, 14, -84, 4), "#E8C25A", { sw: 4 });
    return wrap(o, out);
  };
  /** Xẻng nhựa đỏ: gốc ở tay cầm (đầu cán), lưỡi hướng +y, dài ~230. fold 0..1 (gập đôi ở giữa cán như khăn giấy), square 0..1 (> 0,5: gấp gọn thành khối vuông). */
  VT.xengNhua = function (o) {
    var k = VT.clamp(o.fold || 0, 0, 1), sq = VT.clamp(o.square || 0, 0, 1), R = "#D9543C", out = "";
    if (sq > 0.5) {
      out += VT.shape(rr(-40, 40, 40, 110, 10), R, { sw: 6 }) + VT.line("M -40 75 L 40 75 M 0 40 L 0 110", 3, INK, 0.5) + VT.line("M -26 50 L 26 100", 3, INK, 0.35);
      return wrap(o, out);
    }
    out += VT.line("M -24 0 L 24 0", 14) + VT.line("M -24 0 L 24 0", 8, R) + VT.line("M 0 0 L 0 90", 16) + VT.line("M 0 0 L 0 90", 10, R);
    var low = VT.line("M 0 90 L 0 150", 16) + VT.line("M 0 90 L 0 150", 10, R) + VT.shape("M -40 146 L 40 146 L 34 206 C 22 232 -22 232 -34 206 Z", R, { sw: 6 });
    out += VT.g("rotate(" + f(-172 * k) + " 0 90)", low);
    if (k > 0.3) out += VT.line("M -12 88 Q 0 " + f(80 - 10 * k) + " 12 88", 3, INK, 0.7);
    return wrap(o, out);
  };
  /** Dây đèn: từ (x0, y0) tới (x1, y1), võng sag (60), n bóng (12), on 0..1 (quầng sáng). Trả SVG toạ độ thế giới. */
  VT.dayDen = function (o) {
    var n = o.n || 12, sag = o.sag == null ? 60 : o.sag, out = "", pts = [];
    for (var i = 0; i <= 20; i++) { var k = i / 20; pts.push([VT.lerp(o.x0, o.x1, k), VT.lerp(o.y0, o.y1, k) + sag * 4 * k * (1 - k)]); }
    out += VT.line(VT.smooth(pts, false), 4);
    var cols = ["#F6C46A", "#F29E4C", "#FFE6A0", "#E86FA0"];
    for (var j = 1; j < n; j++) {
      var p = VT.alongPts(pts, j / n);
      if (o.on) out += '<circle cx="' + f(p[0]) + '" cy="' + f(p[1] + 16) + '" r="26" fill="#FFE6A0" opacity="' + f(35 * o.on) / 100 + '"/>';
      out += VT.shape("M " + f(p[0] - 8) + " " + f(p[1] + 4) + " C " + f(p[0] - 12) + " " + f(p[1] + 24) + " " + f(p[0] + 12) + " " + f(p[1] + 24) + " " + f(p[0] + 8) + " " + f(p[1] + 4) + " Z", cols[j % 4], { sw: 3, ox: 0, oy: 0 });
    }
    return out;
  };
  /** Thánh giá giữa quảng trường (vẽ chung, trắng trơn trên bệ hai bậc): gốc giữa đáy, cao ~330. */
  VT.thanhGia = function (o) {
    return wrap(o, VT.shape(rr(-80, -40, 80, 0, 4), "#E6DFD0", { sw: 5 }) + VT.shape(rr(-54, -76, 54, -40, 4), "#EFE9DC", { sw: 5 }) +
      VT.shape("M -12 -76 L -12 -230 L -60 -230 L -60 -256 L -12 -256 L -12 -330 L 12 -330 L 12 -256 L 60 -256 L 60 -230 L 12 -230 L 12 -76 Z", "#FFFDF6", { sw: 6 }));
  };
  /** Tờ thực đơn chỉ có hình vẽ món (không chữ): gốc tâm, 260×340. page 0 (cá, đùi gà, bánh, một quả địa cầu tròn nhỏ) | 1 (món khác); turn 0..1 (đang lật). */
  VT.thucDon = function (o) {
    var tn = o.turn || 0, sx = Math.max(0.05, Math.abs(Math.cos(tn * Math.PI))), pg = tn > 0.5 ? 1 - (o.page || 0) : (o.page || 0), out = "";
    out += VT.shape(rr(-130, -170, 130, 170, 10), "#FFFDF6", { sw: 6 }) + VT.line("M -110 -150 L 110 -150 M -110 150 L 110 150", 3, M.red, 0.8);
    if (!pg) {
      out += VT.fish({ x: 0, y: -96, s: 0.3 });
      out += VT.g("translate(-56 8)", VT.shape("M -30 20 C -50 -10 -10 -40 20 -20 C 40 -4 30 26 0 30 Z", "#C68A55", { sw: 4 }) + VT.line("M 0 28 L 20 54", 8, "#F6EEDC") + VT.line("M 0 28 L 20 54", 3));
      out += VT.g("translate(56 8)", VT.shape("M -34 24 L 0 -30 L 34 24 Z", "#F2C14E", { sw: 4 }) + VT.line("M -24 8 L 24 8", 4, "#E86FA0"));
      out += VT.ell(0, 102, 34, 33, "#5a9fb8", 4) + VT.shape("M -16 94 C -6 82 10 86 8 98 C 6 110 -14 108 -16 94 Z", "#efd9a2", { sw: 2, ox: 0, oy: 0 }) + VT.dot(-9, 98, 3.5) + VT.dot(9, 98, 3.5);
    } else {
      out += VT.g("translate(-50 -70)", VT.ell(0, 0, 36, 24, "#E8A9A0", 4) + VT.line("M -20 -4 L 20 -4", 3, INK, 0.5));
      out += VT.g("translate(50 -70)", VT.shape("M -30 -20 L 30 -20 L 20 30 L -20 30 Z", "#9CC8DC", { sw: 4 }));
      out += VT.g("translate(0 60)", VT.ell(0, 0, 50, 30, "#B8D8B0", 4) + VT.dot(-14, -4, 6, "#5E9450") + VT.dot(12, 6, 6, "#5E9450"));
    }
    return wrap(o, VT.g("scale(" + f(sx * 100) / 100 + " 1)", out));
  };
  /** Võng: hai móc ở (−w/2, 0) và (w/2, 0) quanh gốc, võng sâu d (220). part "back" (dây, lòng võng) | "front" (mép trước che người) | "all". col. */
  VT.vong = function (o) {
    var w = o.w || 640, d = o.d == null ? 220 : o.d, hw = w / 2, c = o.col || "#E0703A", part = o.part || "all", out = "";
    var bot = function (k) { return d * 4 * k * (1 - k); };
    if (part !== "front") {
      out += VT.line("M " + (-hw - 60) + " -40 L " + (-hw) + " 0 M " + (hw + 60) + " -40 L " + hw + " 0", 5);
      var back = "M " + (-hw) + " 0 C " + f(-hw * 0.5) + " " + f(d * 1.33) + " " + f(hw * 0.5) + " " + f(d * 1.33) + " " + hw + " 0 C " + f(hw * 0.5) + " " + f(d * 0.5) + " " + f(-hw * 0.5) + " " + f(d * 0.5) + " " + (-hw) + " 0 Z";
      out += VT.shape(back, c, { sw: 6 });
      for (var i = 1; i < 6; i++) { var k = i / 6; out += VT.line("M " + f(-hw + w * k) + " " + f(bot(k) * 0.38) + " L " + f(-hw + w * k) + " " + f(bot(k) * 0.98), 6, "#F2C94C", 0.9); }
    }
    if (part !== "back") {
      var front = "M " + (-hw) + " 0 C " + f(-hw * 0.5) + " " + f(d * 1.33) + " " + f(hw * 0.5) + " " + f(d * 1.33) + " " + hw + " 0 C " + f(hw * 0.5) + " " + f(d * 0.95) + " " + f(-hw * 0.5) + " " + f(d * 0.95) + " " + (-hw) + " 0 Z";
      out += VT.shape(front, c, { sw: 6 });
      for (var j = 1; j < 8; j++) { var q = j / 8; out += VT.line("M " + f(-hw + w * q) + " " + f(bot(q) * 0.72) + " L " + f(-hw + w * q) + " " + f(bot(q) * 0.98), 5, "#2A9D8F", 0.8); }
    }
    return wrap(o, out);
  };
  /** Túi nhỏ cỡ hộp cơm trưa: gốc giữa quai (trên), rộng ~90. color. */
  VT.hopCom = function (o) {
    return wrap(o, VT.line("M -20 16 C -20 -8 20 -8 20 16", 6) + VT.shape(rr(-45, 14, 45, 74, 12), o.color || M.teal, { sw: 5 }) + VT.line("M -45 34 L 45 34", 3, INK, 0.5));
  };
})();

/* ve-tay · thêm 26/11/2026 (cổng 6a tập 4, khớp cắt giấy): võng sọc VT.vong({soc: [màu sọc, màu nền]}), bấm đếm tròn mặt kim VT.bamDemTron. Chỉ thêm. */
(function () {
  var VT = window.VT, f = VT.f, INK = VT.C.ink, wrap = VT.wrap, vongCu = VT.vong;
  /** VT.vong nhận thêm soc: [c1, c2] → sọc to ngang thân võng (vd. ["#2A9D8F", "#F4F1EA"] như võng cắt giấy d24). Không có soc thì vẽ như cũ. */
  VT.vong = function (o) {
    if (!o.soc) return vongCu(o);
    var w = o.w || 640, d = o.d == null ? 220 : o.d, hw = w / 2, part = o.part || "all", c1 = o.soc[0], c2 = o.soc[1] || "#F4F1EA", out = "";
    function striped(path) {
      var id = VT.uid("vs"), st = "";
      for (var x = -hw - 20, i = 0; x < hw + 40; x += 46, i++) if (i % 2 === 0) st += '<path d="M ' + f(x) + " -40 L " + f(x + 46) + " -40 L " + f(x + 30) + " " + f(d * 1.5) + " L " + f(x - 16) + " " + f(d * 1.5) + ' Z" fill="' + c1 + '"/>';
      return '<path d="' + path + '" fill="' + c2 + '" transform="translate(4 3)"/><clipPath id="' + id + '"><path d="' + path + '" transform="translate(4 3)"/></clipPath><g clip-path="url(#' + id + ')">' + st + "</g>" + VT.line(path, 6);
    }
    if (part !== "front") {
      out += VT.line("M " + (-hw - 60) + " -40 L " + (-hw) + " 0 M " + (hw + 60) + " -40 L " + hw + " 0", 5);
      out += striped("M " + (-hw) + " 0 C " + f(-hw * 0.5) + " " + f(d * 1.33) + " " + f(hw * 0.5) + " " + f(d * 1.33) + " " + hw + " 0 C " + f(hw * 0.5) + " " + f(d * 0.5) + " " + f(-hw * 0.5) + " " + f(d * 0.5) + " " + (-hw) + " 0 Z");
    }
    if (part !== "back") out += striped("M " + (-hw) + " 0 C " + f(-hw * 0.5) + " " + f(d * 1.33) + " " + f(hw * 0.5) + " " + f(d * 1.33) + " " + hw + " 0 C " + f(hw * 0.5) + " " + f(d * 0.95) + " " + f(-hw * 0.5) + " " + f(d * 0.95) + " " + (-hw) + " 0 Z");
    return wrap(o, out);
  };
  /** Bấm đếm tròn mặt kim (khớp d16/d18 cắt giấy): gốc tâm, bán kính ~80. KHÔNG số: mặt trắng chỉ có vạch + kim.
   *  kim 0..1 (vòng quay kim), press 0..1 (nút trên đỉnh lún), heat 0..1 (ửng đỏ), smoke 0..1 + t (khói bốc). */
  VT.bamDemTron = function (o) {
    var p = VT.clamp(o.press || 0, 0, 1), h = o.heat || 0, out = "";
    out += VT.shape(VT.rrect(-14, -110 + 16 * p, 14, -76, 5), "#9AA7AE", { sw: 5 });
    out += VT.line("M 66 -30 C 120 -40 130 40 70 34", 12) + VT.line("M 66 -30 C 120 -40 130 40 70 34", 5, "#B8C2C8");
    out += VT.ell(0, 0, 80, 80, "#C2CCD2", 7, { ox: 3, oy: 3 });
    if (h > 0) out += '<circle cx="0" cy="0" r="80" fill="#E85D45" opacity="' + f(45 * h) / 100 + '"/>';
    out += VT.ell(0, 0, 56, 56, "#FFFDF6", 5, { ox: 0, oy: 0 });
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; out += VT.line("M " + f(44 * Math.sin(a)) + " " + f(-44 * Math.cos(a)) + " L " + f(52 * Math.sin(a)) + " " + f(-52 * Math.cos(a)), i % 3 ? 3 : 5); }
    var k = (o.kim || 0) * 2 * Math.PI;
    out += VT.line("M 0 0 L " + f(40 * Math.sin(k)) + " " + f(-40 * Math.cos(k)), 6, VT.DAO_MAU ? VT.DAO_MAU.red : "#C9463A") + VT.dot(0, 0, 7);
    if (o.smoke) {
      var st = Math.round((o.t || 0) * 12);
      [-30, 10, 50].forEach(function (x, j) { var w = Math.sin(st * 0.8 + j * 2.1) * 10; out += VT.line("M " + x + " -90 C " + f(x - 20 + w) + " -130 " + f(x + 20 - w) + " -160 " + f(x + w) + " -210", 10, "#8a8a8a", f(65 * o.smoke) / 100); });
    }
    return wrap(o, out);
  };
})();
