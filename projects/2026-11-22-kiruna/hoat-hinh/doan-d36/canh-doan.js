/* d36 · vẽ tay chèn (544,226–551,448 s; 7,222 s). Vào "chen" (whoosh tự khai), ra "cat". Hồi ức tháng 6, không khẩu hình.
 * Phòng thuê tháng 6, cửa sổ sáng choang lúc nửa đêm (mặt trời thấp sát chân trời), kính râm nằm trên bậu cửa sổ; ba lô dựa chân giường.
 * Leo thang ba lần nằm trong lời: (1) Wob đứng trên ghế đẩu dán một khăn tắm lên cửa sổ, băng dính bốn góc, nắng vẫn lọt quanh mép;
 * (2) dán thêm ba khăn chồng nhau, nắng vẫn lọt; (3) lệch: gồng mình đẩy cả tủ quần áo chắn kín cửa sổ đúng "wardrobe.", nhảy lên giường nhắm mắt.
 * Cắt vào CẬN mặt Wob trong giường tối: một tia nắng mảnh lách qua khe tủ, rọi đúng vào mắt đang nhắm ở "gap"; Wob mở một mắt nhìn tia nắng,
 * không nhúc nhích; giữ 0,56 s tới cắt (ghi chú duyệt 5a: thiếu 1 khung so với 0,6 s, chấp nhận). Không chữ.
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var T_TOWEL = VT.tu("towel"), T_WIN_E = VT.tu("window.", 0, "end"), T_MORE = VT.tu("more"), T_TOWELS_E = VT.tu("towels.", 0, "end"),
    T_THEN2 = VT.tu("Then", 1), T_WARD = VT.tu("wardrobe."), T_WARD_E = VT.tu("wardrobe.", 0, "end"), T_SUN = VT.tu("sun"), T_GAP = VT.tu("gap"), T_ANY_E = VT.tu("anyway.", 0, "end");
  var B0 = 2.5, C0 = T_THEN2 - 0.1, D0 = 5.0, FL = 900;
  var WIN = { x0: 760, y0: 440, x1: 1160, y1: 740 };
  var TAPES = [T_TOWEL + 0.14, T_TOWEL + 0.3, T_TOWEL + 0.46, T_TOWEL + 0.62], MORE = [T_MORE - 0.02, T_MORE + 0.24, T_MORE + 0.5];
  TAPES.forEach(function (tt) { VT.sfx("pop", tt, 0.3); });
  MORE.forEach(function (tt) { VT.sfx("pop", tt + 0.12, 0.42); });
  VT.sfx("bonk", T_WARD + 0.24, 0.55);
  VT.sfx("boing", T_WARD_E + 0.05, 0.35);
  VT.sfx("ting", T_GAP - 0.04, 0.3);

  function W(t, o) { var b = { s: 0.74, mua: "nha" }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }
  function phong(t, dim) {
    var s = '<rect x="-600" y="-600" width="3120" height="2280" fill="#EADFC6"/>';
    for (var x = -560; x < 2500; x += 90) s += VT.line("M " + x + " -600 L " + x + " " + FL, 6, "#DCCFB2", 0.8);
    s += K.rect(-600, FL, 2520, 1700, "#B98A5A", { sw: 6, ox: 0, oy: 4 });
    for (var y = FL + 50; y < 1300; y += 60) s += VT.line("M -600 " + y + " L 2520 " + y, 3, "#8E5527", 0.4);
    // cửa sổ: trời vàng nhạt sáng choang, mặt trời thấp sát đồi
    s += K.rect(WIN.x0 - 26, WIN.y0 - 26, WIN.x1 + 26, WIN.y1 + 10, "#FFFDF6", { sw: 6, ox: 4, oy: 4 });
    s += '<rect x="' + WIN.x0 + '" y="' + WIN.y0 + '" width="' + (WIN.x1 - WIN.x0) + '" height="' + (WIN.y1 - WIN.y0) + '" fill="#FFF3C4"/>';
    s += VT.shape("M " + WIN.x0 + " 690 C 860 650 960 680 1040 660 C 1100 650 1140 670 " + WIN.x1 + " 668 L " + WIN.x1 + " " + WIN.y1 + " L " + WIN.x0 + " " + WIN.y1 + " Z", "#C9D7B0", { sw: 4, ox: 0, oy: 0 });
    s += '<circle cx="1080" cy="650" r="46" fill="#F6D36A"/><circle cx="1080" cy="650" r="80" fill="#FFE9A8" opacity="0.5"/>';
    s += VT.line("M 960 " + WIN.y0 + " L 960 " + WIN.y1 + " M " + WIN.x0 + " 590 L " + WIN.x1 + " 590", 8, "#FFFDF6") + K.rect(WIN.x0, WIN.y0, WIN.x1, WIN.y1, "none", { sw: 6, ox: 0, oy: 0 });
    // bậu cửa sổ + kính râm đặt trên bậu
    s += K.rect(WIN.x0 - 60, WIN.y1 + 10, WIN.x1 + 60, WIN.y1 + 40, "#FFFDF6", { sw: 6, ox: 3, oy: 3 });
    s += VT.g("translate(1110 " + (WIN.y1 + 10) + ") scale(0.55)", VT.ell(-36, -24, 30, 26, "#2a3236", 5, { ox: 0, oy: 0 }) + VT.ell(36, -24, 30, 26, "#2a3236", 5, { ox: 0, oy: 0 }) + VT.line("M -6 -28 Q 0 -36 6 -28", 5) + VT.line("M -66 -28 L -100 -6 M 66 -28 L 100 -6", 5));
    // giường bên trái, ba lô dựa chân giường, chùm chìa nhà móc quai
    s += K.rect(60, 700, 120, FL, "#8E5527", { sw: 6, ox: 3, oy: 3 }) + K.rect(100, 770, 640, 850, "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + K.rect(100, 850, 640, 880, "#8E5527", { sw: 6, ox: 3, oy: 3 });
    s += VT.shape("M 150 770 C 150 730 290 730 300 770 Z", "#FFFDF6", { sw: 6, ox: 3, oy: 3 });
    s += VT.shape("M 300 760 L 640 760 L 650 860 L 290 860 Z", "#5E8E8A", { sw: 6, ox: 4, oy: 4 }) + VT.line("M 360 762 L 356 858 M 440 762 L 440 858 M 520 762 L 524 858 M 600 762 L 606 858", 4, "#3F6E6A", 0.6);
    s += K.rect(620, 760, 660, FL, "#8E5527", { sw: 6, ox: 3, oy: 3 });
    s += VT.backpack({ x: 740, y: FL, s: 0.62, packColor: "kiruna", straps: true }) + K.chumChia({ x: 712, y: FL - 76, s: 0.5, kiruna: false, lac: 4 });
    return s;
  }
  function khan(i, x0, y0, x1, y1, k) {
    var cols = [["#E07A7A", "#F6EEDC"], ["#7FB0C8", "#F6EEDC"], ["#E8C25A", "#FFFDF6"], ["#8DB06A", "#F6EEDC"]][i % 4];
    var sc = 0.6 + 0.4 * VT.ease.back(k), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    var s = K.rect(x0, y0, x1, y1, cols[0], { sw: 6, ox: 5, oy: 5 }) + VT.line("M " + f(x0) + " " + f(y1 - 34) + " L " + f(x1) + " " + f(y1 - 34), 10, cols[1]) + VT.line("M " + f(x0) + " " + f(y1 - 54) + " L " + f(x1) + " " + f(y1 - 54), 5, cols[1]);
    for (var j = 0; j < 4; j++) s += VT.line("M " + f(x0 + 14 + j * 8) + " " + f(y1) + " l -2 14", 3);
    return VT.g("translate(" + f(cx) + " " + f(cy) + ") scale(" + f(sc) + ") translate(" + f(-cx) + " " + f(-cy) + ")", s);
  }
  function bangDinh(x, y, rot) { return VT.g("translate(" + f(x) + " " + f(y) + ") rotate(" + f(rot) + ")", K.rect(-26, -10, 26, 10, "#E9E2D0", { sw: 3.5, ox: 1, oy: 1 })); }
  function nangLot(t, gap, n) { // vệt nắng lọt quanh mép khăn
    var s = "", st = Math.round(t * 12);
    [[WIN.x0 - 4, WIN.y0 - 4, -1, -1], [WIN.x1 + 4, WIN.y0 - 4, 1, -1], [WIN.x0 - 4, WIN.y1, -1, 1], [WIN.x1 + 4, WIN.y1, 1, 1]].forEach(function (c, i) {
      var L = 60 + 16 * Math.sin(st * 0.8 + i);
      s += VT.line("M " + c[0] + " " + c[1] + " l " + f(c[2] * L) + " " + f(c[3] * L * 0.7), 7, "#F6C445", 0.9);
    });
    s += '<rect x="' + (WIN.x0 - 8) + '" y="' + (WIN.y0 - 8) + '" width="' + (WIN.x1 - WIN.x0 + 16) + '" height="' + (WIN.y1 - WIN.y0 + 16) + '" fill="none" stroke="#FFE9A8" stroke-width="' + gap + '" opacity="0.8"/>';
    return s;
  }
  // tủ quần áo: gốc giữa chân, rộng 470
  function tu(x, y, push) {
    var s = K.rect(x - 235, y - 640, x + 235, y, "#B07A4A", { sw: 7, ox: 6, oy: 5 }) + K.rect(x - 250, y - 660, x + 250, y - 630, "#8E5527", { sw: 6, ox: 3, oy: 3 });
    s += VT.line("M " + x + " " + (y - 620) + " L " + x + " " + (y - 20), 5) + VT.dot(x - 22, y - 330, 9, "#E8C25A") + VT.dot(x + 22, y - 330, 9, "#E8C25A");
    s += K.rect(x - 200, y - 590, x - 30, y - 380, "none", { sw: 4, ox: 0, oy: 0 }) + K.rect(x + 30, y - 590, x + 200, y - 380, "none", { sw: 4, ox: 0, oy: 0 });
    if (push) s += VT.speedLines({ x0: x + 260, y0: y - 520, n: 5, gap: 90, len: 120, dx: 1, sw: 6 });
    return s;
  }

  return [
    // A · dán một khăn tắm, nắng vẫn lọt
    { a: 0, b: B0, ten: "mot khan", ve: function (t, lt, T) {
      var s = phong(t), k = seg(t, 0, 0.12);
      s += K.rect(1000, 780, 1160, 800, "#8E5527", { sw: 5, ox: 2, oy: 2 }) + VT.line("M 1016 800 L 1010 " + FL + " M 1144 800 L 1150 " + FL, 9, "#8E5527");
      var kk = seg(t, T_TOWEL - 0.1, T_TOWEL + 0.06);
      if (kk > 0) s += khan(0, WIN.x0 + 20, WIN.y0 + 14, WIN.x1 - 20, WIN.y1 - 10, kk);
      TAPES.forEach(function (tt, i) { if (t >= tt) s += bangDinh(i % 2 ? WIN.x1 - 22 : WIN.x0 + 22, i < 2 ? WIN.y0 + 16 : WIN.y1 - 14, i % 2 ? 30 : -30); });
      if (t >= T_WIN_E - 0.5) s += nangLot(t, 10, 4);
      var down = seg(t, T_WIN_E - 0.25, T_WIN_E + 0.05), o = { x: VT.lerp(1080, 1270, VT.ease.io(down)), y: VT.lerp(780, FL, VT.ease.in2(down)) - Math.sin(down * Math.PI) * 60, mouth: "content", brows: "flat" };
      if (t < T_TOWEL - 0.1) { // giơ khăn gấp lên, nhắm cửa sổ
        var lift = seg(t, 0.1, 0.6); o.flip = -1; o.px = -10; o.py = -14; o.handL = "xoe"; o.handR = "xoe";
        o.armL = VT.wobLocal(o, 1000, VT.lerp(720, 600, lift)); o.armR = VT.wobLocal(o, 1080, VT.lerp(720, 600, lift));
        o.propFront = "";
        s += W(t, o) + VT.g("translate(" + f(1040) + " " + f(VT.lerp(720, 600, lift)) + ") rotate(-6)", K.rect(-70, -34, 70, 34, "#E07A7A", { sw: 6, ox: 4, oy: 4 }) + VT.line("M -70 14 L 70 14", 8, "#F6EEDC"));
        return { cam: [1000, 610, key(T, [[0, 1.36], [B0, 1.42, "sine"]])], world: s };
      }
      if (down <= 0) {
        var ti = 0; TAPES.forEach(function (tt, i) { if (t >= tt - 0.2) ti = i; });
        var tx = ti % 2 ? WIN.x1 - 22 : WIN.x0 + 22, ty = ti < 2 ? WIN.y0 + 16 : WIN.y1 - 14;
        o.armR = VT.wobLocal(o, Math.max(tx, 990), Math.max(ty, 560)); o.armL = VT.wobLocal(o, 900, 600); o.handL = "xoe"; o.handR = "xoe"; o.py = -12; o.px = -8; o.flip = -1;
      } else { o.flip = -1; o.px = -10; o.py = -10; o.legs = down < 1 ? "tuck" : "stand"; }
      if (t > T_WIN_E + 0.05) { o.brows = "worried"; o.mouth = "flat"; o.sq = key(t, [[T_WIN_E + 0.05, 0.9], [T_WIN_E + 0.3, 1, "back"]]); }
      s += W(t, o);
      return { cam: [1000, 610, key(T, [[0, 1.36], [B0, 1.42, "sine"]])], world: s };
    } },
    // B · thêm ba khăn chồng nhau, nắng vẫn lọt
    { a: B0, b: C0, ten: "them khan", ve: function (t, lt, T) {
      var s = phong(t);
      s += K.rect(1000, 780, 1160, 800, "#8E5527", { sw: 5, ox: 2, oy: 2 }) + VT.line("M 1016 800 L 1010 " + FL + " M 1144 800 L 1150 " + FL, 9, "#8E5527");
      s += khan(0, WIN.x0 + 20, WIN.y0 + 14, WIN.x1 - 20, WIN.y1 - 10, 1);
      MORE.forEach(function (tt, i) { var k = seg(t, tt, tt + 0.14); if (k > 0) s += khan(i + 1, WIN.x0 + 10 + i * 18 - 20, WIN.y0 - 6 + i * 14, WIN.x1 - 30 + i * 22, WIN.y1 - 30 + i * 12, k); });
      s += nangLot(t, 12, 4);
      var o = { x: 1110, y: 780, flip: -1, mouth: "flat", brows: "worried", py: -10, px: -8 }, ti = -1;
      MORE.forEach(function (tt, i) { if (t >= tt - 0.16) ti = i; });
      if (ti >= 0 && t < MORE[2] + 0.25) { var sl = seg(t, MORE[ti] - 0.16, MORE[ti]); o.armR = VT.wobLocal(o, VT.lerp(1100, 980, sl), VT.lerp(640, 560, sl)); o.handR = "xoe"; o.armL = VT.wobLocal(o, VT.lerp(1000, 880, sl), VT.lerp(680, 600, sl)); o.handL = "xoe"; o.lean = -10 * sl; }
      if (t > MORE[2] + 0.3) { o.mouth = "frown"; o.brows = "down"; }
      s += W(t, o);
      return { cam: [key(T, [[B0, 980], [C0, 990]]), key(T, [[B0, 610], [C0, 600]]), key(T, [[B0, 1.4], [C0, 1.46, "sine"]])], world: s };
    } },
    // C · đẩy cả tủ quần áo chắn kín cửa sổ đúng "wardrobe.", nhảy lên giường
    { a: C0, b: D0, ten: "day tu", ve: function (t, lt, T) {
      var s = phong(t), arrive = T_WARD + 0.24, tx = key(t, [[C0, 1560], [arrive, 960, "in2"]]);
      s += khan(0, WIN.x0 + 20, WIN.y0 + 14, WIN.x1 - 20, WIN.y1 - 10, 1);
      for (var mi = 0; mi < 3; mi++) s += khan(mi + 1, WIN.x0 + 10 + mi * 18 - 20, WIN.y0 - 6 + mi * 14, WIN.x1 - 30 + mi * 22, WIN.y1 - 30 + mi * 12, 1);
      s += tu(tx, FL, t < arrive);
      var jump = seg(t, T_WARD_E - 0.05, D0 - 0.08), o;
      if (jump <= 0) {
        o = { x: tx + 235 + 150, y: FL, flip: -1, lean: -26, legs: "walk", phase: (t - C0) * 3.2, stride: 40, autoWalk: false, eyes: "squint", brows: "worried", mouth: "chatter", marks: "sweat" };
        o.armR = VT.wobLocal(o, tx + 238, FL - 300); o.armL = VT.wobLocal(o, tx + 238, FL - 200); o.handL = "xoe"; o.handR = "xoe";
        if (t >= arrive) { o.legs = "stand"; o.lean = key(t, [[arrive, -26], [arrive + 0.15, 0, "out"]]); o.eyes = "open"; o.mouth = "flat"; o.marks = ""; }
      } else {
        var e = VT.ease.io(jump);
        o = { x: VT.lerp(1345, 420, e), y: VT.lerp(FL, 800, e) - Math.sin(jump * Math.PI) * 360, flip: -1, legs: jump < 1 ? "tuck" : "stand", eyes: "closed", mouth: "content", arms: jump < 0.8 ? "up" : "rest", sq: jump > 0.9 ? 0.9 : 1.04 };
      }
      s += W(t, o);
      if (t >= arrive && t < arrive + 0.3) s += VT.impact({ x: WIN.x0 - 20, y: 560, s: 0.5 * (1 - seg(t, arrive, arrive + 0.3)) });
      return { cam: [key(T, [[C0, 980], [D0, 900, "io"]]), 560, key(T, [[C0, 1.0], [D0, 0.98]])], world: s, shake: VT.shake(T, arrive, 0.25, 6) };
    } },
    // D · cận mặt trong giường tối: tia nắng mảnh lách qua khe tủ vào mắt ở "gap"; mở một mắt, không nhúc nhích
    { a: D0, b: DUR, ten: "tia nang", ve: function (t, lt, T) {
      var s = '<rect x="-600" y="-600" width="3120" height="2280" fill="#3B4660"/>';
      for (var x = -560; x < 2500; x += 90) s += VT.line("M " + x + " -600 L " + x + " 1600", 6, "#34405A", 0.8);
      s += VT.shape("M 470 560 C 440 420 520 360 640 370 C 760 350 1000 350 1110 380 C 1220 400 1250 500 1220 600 Z", "#C9CED8", { sw: 6, ox: 6, oy: 6 }) + VT.line("M 560 420 C 700 400 900 400 1080 420", 4, "#9AA3B5", 0.6); // gối
      var o = { x: 860, y: 900, s: 1.1, eyes: "closed", mouth: "content", brows: "flat", noBlink: true, arms: "low" };
      var openK = seg(t, T_ANY_E - 0.35, T_ANY_E - 0.2), eye = "";
      if (openK > 0) {
        var lidK = 0.55 - 0.15 * openK;
        eye = VT.ell(238, 156, 25, 31, "#fffdf6", 5, { ox: 0, oy: 0 }) + VT.dot(254, 146, 12) + VT.dot(258, 141, 4, "#ffffff") +
          '<path d="M 211 ' + f(156 - 31) + ' L 265 ' + f(156 - 31) + ' L 265 ' + f(125 + 62 * lidK) + ' L 211 ' + f(125 + 62 * lidK) + ' Z" fill="' + VT.WOB_COLORS.sea + '"/>' +
          VT.line("M 212 " + f(125 + 62 * lidK) + " L 264 " + f(125 + 62 * lidK), 7) + VT.ell(238, 156, 25, 31, "none", 5);
        o.brows = "flat"; o.mouth = "flat";
      }
      o.propFront = eye;
      s += W(t, o);
      // chăn đắp tới ngực
      s += VT.shape("M 200 820 C 400 760 1300 760 1720 830 L 1760 1300 L 160 1300 Z", "#5E8E8A", { sw: 7, ox: 6, oy: 6 }) + VT.line("M 260 860 C 600 820 1100 820 1680 870", 5, "#3F6E6A", 0.6);
      for (var i = 0; i < 6; i++) s += VT.line("M " + (380 + i * 220) + " 800 L " + (370 + i * 220) + " 1200", 4, "#3F6E6A", 0.5);
      // tia nắng từ khe tủ (góc phải trên) tới mắt
      var eyeP = VT.wobPt(o, 238, 150), src = [1960, 120], kb = seg(t, T_SUN + 0.25, T_GAP - 0.05);
      if (kb > 0) {
        var ex = VT.lerp(src[0], eyeP[0] + 30, kb), ey = VT.lerp(src[1], eyeP[1], kb);
        s += '<path d="M ' + src[0] + ' ' + (src[1] - 10) + ' L ' + f(ex) + ' ' + f(ey - 8) + ' L ' + f(ex) + ' ' + f(ey + 8) + ' L ' + src[0] + ' ' + (src[1] + 18) + ' Z" fill="#FFE9A8" opacity="0.92"/>';
        s += VT.line("M " + src[0] + " " + src[1] + " L " + f(ex) + " " + f(ey), 3, "#F6C445", 0.9);
        if (kb >= 1 && openK <= 0) { s += '<circle cx="' + f(eyeP[0] + 6) + '" cy="' + f(eyeP[1] + 2) + '" r="' + f(30 + 4 * Math.sin(t * 20)) + '" fill="#FFE9A8" opacity="0.55"/>'; s += VT.sparkle({ x: eyeP[0] + 40, y: eyeP[1] - 30, s: 0.4, fill: "#FFF3C4" }); }
      }
      var hp = VT.wobPt(o, 200, 170);
      return { cam: [key(T, [[D0, hp[0] + 120], [DUR, hp[0] + 90, "sine"]]), key(T, [[D0, hp[1] + 20], [DUR, hp[1] + 10]]), key(T, [[D0, 1.95], [T_GAP - 0.05, 2.02, "sine"], [T_GAP + 0.05, 2.12, "out"], [DUR, 2.18, "sine"]])], world: s };
    } },
  ];
};
