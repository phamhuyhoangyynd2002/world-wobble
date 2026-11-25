/* d15 · vẽ tay · bong bóng hồi tưởng sepia: rạp phim, bowling, phòng khám → một mái nhà, đèn tắt dần (9,48 s). Vào "chen", ra "cat".
 * Wob (đồ ngủ, dép lê, ba lô) ở mép trái, mặt thấy rõ; bong bóng mọc từ đầu Wob. Không chữ. Không dùng chữ thập đỏ (biểu tượng được bảo hộ): chữ thập màu nâu sepia.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, G = 1010, WS = 0.95, WX = 250;
  var SEP = "#6b4a2a", SEPF = "#E9D3A8", SEPL = "#F6E2B4", DARK = "#B89B70";
  var T_MOVIE = VT.tu("movie"), T_BOWL = VT.tu("bowling"), T_CLINIC = VT.tu("clinic."), T_TOWER = VT.tu("tower,"), T_ROOF = VT.tu("roof,"), T_FULL = VT.tu("full"), T_LONG = VT.tu("long.");
  var PX = [770, 1150, 1530], PY = 520, PW = 330, PH = 300;     // ba ô sepia
  var T_POP = [T_MOVIE - 0.05, T_BOWL - 0.05, T_CLINIC - 0.05];
  var T_OFF = [T_FULL - 1.0, T_FULL - 0.7, T_FULL - 0.4];      // đèn tắt từng ô
  var T_PIN = T_OFF[2] + 0.15;
  function W(t, o) {
    var b = { t: t, s: WS, x: WX, y: G, pajama: true, shoes: "dep", packColor: "oliu", flip: 1 };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 3.1, 1.1));
    return VT.wob(b);
  }
  function lit(t, i) { return t < T_OFF[i] ? 1 : 1 - seg(t, T_OFF[i], T_OFF[i] + 0.35); }
  function panel(t, i) {
    var k = seg(t, T_POP[i], T_POP[i] + 0.22), L = lit(t, i), out = "";
    out += VT.rectS(-PW / 2, -PH / 2, PW / 2, PH / 2, L > 0.5 ? SEPL : DARK, { sw: 6 });
    if (k <= 0) return VT.g("translate(" + PX[i] + " " + PY + ")", out);
    var sc = VT.ease.back(k), frameSvg = out, dim = ""; out = "";
    if (L < 1 && L > 0) dim += '<rect x="' + (-PW / 2) + '" y="' + (-PH / 2) + '" width="' + PW + '" height="' + PH + '" fill="#5a4630" opacity="' + VT.f(0.6 * (1 - L)) + '"/>';
    if (L <= 0) dim += '<rect x="' + (-PW / 2) + '" y="' + (-PH / 2) + '" width="' + PW + '" height="' + PH + '" fill="#5a4630" opacity="0.6"/>';
    if (i === 0) { // màn chiếu + chùm sáng máy chiếu + hàng ghế
      out += VT.rectS(-120, -110, 120, 10, "#FFF6DC", { sw: 5 });
      if (L > 0) out += '<path d="M 140 120 L -120 -110 L -120 10 Z" fill="#FFF3C8" opacity="' + VT.f(0.55 * L) + '"/>';
      for (var r = 0; r < 5; r++) out += VT.ell(-110 + r * 55, 90, 22, 18, SEP, 4);
    } else if (i === 1) { // làn bowling + hàng ki
      out += VT.shape("M -40 140 L 40 140 L 20 -40 L -20 -40 Z", "#E2C48E", { sw: 4 });
      [[-48, -60], [-16, -60], [16, -60], [48, -60], [-32, -30], [0, -30], [32, -30]].forEach(function (p, j) {
        var fall = (j === 6 && t >= T_PIN) ? VT.ease.in2(seg(t, T_PIN, T_PIN + 0.5)) : 0;
        out += VT.bowlingPin({ x: p[0], y: p[1] + 30, s: 0.55, fall: fall, fill: "#FFF6DC" });
      });
      out += VT.ell(0, 100, 26, 26, SEP, 5);
    } else { // phòng khám nhỏ: nhà một tầng, cửa, chữ thập nâu (không đỏ)
      out += VT.rectS(-110, -40, 110, 120, "#F4E2BE", { sw: 5 }) + VT.shape("M -130 -40 L 0 -110 L 130 -40 Z", "#C9A473", { sw: 5 });
      out += VT.shape("M -14 -10 L 14 -10 L 14 6 L 30 6 L 30 34 L 14 34 L 14 50 L -14 50 L -14 34 L -30 34 L -30 6 L -14 6 Z", "#8E5527", { sw: 4 });
      out += VT.rectS(50, 50, 90, 120, "#8E5527", { sw: 4 });
    }
    return VT.g("translate(" + PX[i] + " " + PY + ")", frameSvg + VT.g("scale(" + VT.f(sc) + ")", out) + dim);
  }
  function roof(t) { // ba ô gộp dưới một mái nhà dài
    var k = seg(t, T_ROOF - 0.35, T_ROOF); if (k <= 0) return "";
    var y = VT.lerp(-200, PY - PH / 2 - 10, VT.ease.bounce ? VT.ease.bounce(k) : VT.ease.out(k));
    return VT.shape("M 560 " + VT.f(y) + " L 1150 " + VT.f(y - 190) + " L 1740 " + VT.f(y) + " Z", "#A8794A", { sw: 7 }) +
      VT.line("M 600 " + VT.f(y - 8) + " L 1700 " + VT.f(y - 8), 4, SEP, 0.6) + (k >= 1 ? VT.rectS(585, PY - PH / 2 - 10, 1715, PY + PH / 2 + 10, "none", { sw: 6 }) : "");
  }
  function bubble(t) {
    var st = VT.twos(t), pts = [], cx = 1150, cy = 500, rx = 760, ry = 410;
    for (var i = 0; i < 26; i++) { var a = i / 26 * 2 * Math.PI, bump = 1 + 0.05 * Math.sin(i * 2.3 + st * 3) + (i % 2 ? 0.03 : -0.02); pts.push([cx + Math.cos(a) * rx * bump, cy + Math.sin(a) * ry * bump]); }
    var s = VT.shape(VT.smooth(pts, true), SEPF, { sw: 7 });
    // chuỗi chấm bong bóng mọc từ đỉnh đầu Wob
    [[410, 560, 28], [350, 610, 19], [305, 650, 12]].forEach(function (d) { s += VT.ell(d[0], d[1], d[2], d[2], SEPF, 5); });
    return s;
  }
  function room() { // sảnh tầng trệt (nền đơn giản, ấm)
    return '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#D9CDB4"/>' + '<rect x="-1200" y="' + G + '" width="4320" height="600" fill="#A89A80"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
  }

  T_POP.forEach(function (tp) { VT.sfx("pop", tp + 0.02, 0.5); });
  VT.sfx("bonk", T_ROOF, 0.4);
  VT.sfx("de-kem", T_OFF[0], 0.45);
  VT.sfx("drop", T_PIN + 0.3, 0.3);

  return [
    { a: 0, b: T_TOWER - 0.15, ten: "ba ô sepia bật lần lượt", ve: function (t, lt, T) {
      var look = t < T_POP[1] ? 0 : t < T_POP[2] ? 1 : 2;
      var o = { s: WS, x: WX, y: G, px: 10 + look * 3, py: -14, brows: "up", mouth: "content", arms: "low" };
      if (t > T_POP[2] + 0.2) { o.eyes = "happy"; o.mouth = "smile"; }
      var out = room() + W(t, o) + bubble(t) + panel(t, 0) + panel(t, 1) + panel(t, 2);
      return { cam: [960, 540, key(T, [[0, 1.0], [T_TOWER, 1.03]])], world: out, tint: "warm" };
    } },
    { a: T_TOWER - 0.15, b: D.thoi_luong, ten: "một mái nhà, đèn tắt dần", ve: function (t, lt, T) {
      var o = { s: WS, x: WX, y: G, px: 12, py: -10, brows: "up", mouth: "content", arms: "low" };
      if (t > T_ROOF) { o.eyes = "happy"; o.mouth = "smile"; }
      if (t > T_OFF[0]) { o.eyes = "open"; o.brows = "worried"; o.mouth = "flat"; o.lid = 0.25; }
      if (t > T_PIN + 0.2) { o.lid = 0.5; o.brows = "flat"; o.mouth = "wobbly"; o.noBlink = true; }
      var out = room() + W(t, o) + bubble(t) + panel(t, 0) + panel(t, 1) + panel(t, 2) + roof(t);
      return { cam: [key(T, [[T_TOWER, 960], [D.thoi_luong, 900]]), key(T, [[T_TOWER, 540], [D.thoi_luong, 580]]), key(T, [[T_TOWER, 1.03], [D.thoi_luong, 1.1, "sine"]])], world: out, tint: "warm" };
    } },
  ];
};
