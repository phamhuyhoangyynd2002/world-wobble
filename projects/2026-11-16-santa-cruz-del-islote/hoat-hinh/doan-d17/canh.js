/* d17 · vẽ tay · chèn (278,895–289,76 s; 10,865 s). Vào "chen", ra "cat". Hồi ức, không khẩu hình.
 * 1) Bong bóng tưởng tượng: hũ kẹo ở hội chợ; nhiều bàn tay chung (không người cụ thể) giơ phiếu đoán chỉ có "?"; Wob chen giữa, nhón chân đếm kẹo bằng ngón tay.
 *    Hũ có cầu tàu nhỏ: kẹo đội mũ cói xếp hàng lên thuyền, kẹo khác nhảy xuống. Gag: một viên kẹo đội mũ nhảy khỏi thuyền đáp lên đầu Wob.
 * 2) Cận Wob ở quảng trường: bấm đếm liên hồi (dạng tròn mặt kim như d16/d18, KHÔNG số), máy bốc khói; Wob thổi phù như thổi nến; khói xoắn thành dấu hỏi.
 * Đồ Wob: mũ cói. Chữ duy nhất: "?".
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var S2 = VT.nhip(1), T_EVERY = VT.tu("everyone"), T_NOBODY = VT.tu("nobody"), T_HOP = VT.tu("hopping"), T_OFF = VT.tu("off"), T_BOATS = VT.tu("boats.");
  var T_CLICK = VT.tu("clicker"), T_OVER = VT.tu("overheated.");
  var TABLE = 860, JX = 860, JS = 1.15, WX = 560, WS = 0.8;
  var MOUTH = [JX + 150, TABLE - 380 * JS + 10], BOWL = [1470, TABLE];
  var JUMP0 = T_OFF - 0.1, JUMP1 = T_BOATS + 0.35;
  VT.sfx("boing", JUMP1 - 0.02, 0.45);
  VT.sfx("pop", T_CLICK + 0.05, 0.25);
  VT.sfx("hoi-nuoc", T_OVER - 0.05, 0.55);
  VT.sfx("whoosh", T_OVER + 0.75, 0.3);

  function fair(t) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#F7EED8"/>';
    for (var i = 0; i < 14; i++) out += VT.shape("M " + (-200 + i * 180) + " 120 L " + (-20 + i * 180) + " 120 L " + (-110 + i * 180) + " 200 Z", ["#E85D45", "#F2C94C", "#4FA3C7", "#5E9E48"][i % 4], { sw: 4 });
    out += VT.line("M -300 118 L 2400 118", 5);
    out += VT.shape("M -400 " + TABLE + " L 2300 " + TABLE + " L 2300 1400 L -400 1400 Z", "#E8A9A0", { sw: 7, ox: 0, oy: 0 });
    for (var x = -400; x < 2300; x += 90) out += VT.line("M " + x + " " + (TABLE + 10) + " L " + x + " 1400", 18, "#F6EEDC", 0.6);
    return out;
  }
  function pier(t) {
    var out = VT.shape("M " + (BOWL[0] - 170) + " " + (TABLE - 100) + " C " + (BOWL[0] - 170) + " " + (TABLE + 6) + " " + (BOWL[0] + 170) + " " + (TABLE + 6) + " " + (BOWL[0] + 170) + " " + (TABLE - 100) + " Z", "#F4F1EA", { sw: 6 });
    out += VT.ell(BOWL[0], TABLE - 100, 170, 30, M.sea, 6, { ox: 0, oy: 0 });
    out += VT.line("M " + MOUTH[0] + " " + MOUTH[1] + " L " + (BOWL[0] - 110) + " " + (TABLE - 150), 16, M.root) + VT.line("M " + MOUTH[0] + " " + MOUTH[1] + " L " + (BOWL[0] - 110) + " " + (TABLE - 150), 3, VT.C.ink, 0.6);
    [0.3, 0.6, 0.9].forEach(function (k) { var x = VT.lerp(MOUTH[0], BOWL[0] - 110, k), y = VT.lerp(MOUTH[1], TABLE - 150, k); out += VT.line("M " + x + " " + y + " L " + x + " " + (TABLE - 110), 6, M.root); });
    out += VT.thuyenCa({ x: BOWL[0] + 20, y: TABLE - 106 + 3 * Math.sin(t * 6), s: 0.32 });
    return out;
  }
  function pierPt(k) { return [VT.lerp(MOUTH[0], BOWL[0] - 110, k), VT.lerp(MOUTH[1], TABLE - 150, k) - 22]; }
  function beans(t) {
    var out = "";
    for (var i = 0; i < 4; i++) { var k = ((t * 0.22 + i * 0.25) % 1), p = pierPt(k); out += VT.keo({ x: p[0], y: p[1], s: 0.9, hat: true, eyes: true, legs: t * 3 + i * 0.5, color: VT.KEO_MAU[i + 1] }); }
    for (var j = 0; j < 2; j++) { var q = ((t * 0.5 + j * 0.5) % 1), x = VT.lerp(BOWL[0] + 60, BOWL[0] + 230, q), y = TABLE - 130 - 170 * Math.sin(Math.PI * q) + 40 * q; out += VT.keo({ x: x, y: y, s: 0.85, eyes: true, rot: q * 360, color: VT.KEO_MAU[5 + j] }); }
    return out;
  }
  function hands(t) {
    var out = "", wig = t >= T_NOBODY ? 1 : 0.25;
    [[410, -6], [1070, 3], [1340, -2], [1620, 4]].forEach(function (h, i) {
      var up = t >= T_EVERY - 0.3 ? 0 : 80, tilt = h[1] + wig * 6 * Math.sin(t * 9 + i * 1.7), bx = h[0], by = 1050 + up + (i % 2) * 30;
      var tip = [bx + Math.sin(tilt * Math.PI / 180) * 330, by - Math.cos(tilt * Math.PI / 180) * 330];
      out += VT.g("translate(" + bx + " " + by + ") rotate(" + VT.f(tilt - 90) + ")", VT.handGeneric({ x: 250, y: 0, sleeve: ["#6B8FA6", "#B8743A", "#8E6BBF", "#5E9E48", "#C9603A"][i] }));
      out += VT.g("translate(" + VT.f(tip[0]) + " " + VT.f(tip[1] + 10) + ") rotate(" + VT.f(tilt * 0.6) + ")", VT.shape(VT.rrect(-62, -70, 62, 50, 6), "#FFFDF6", { sw: 5 }) + VT.text(0, 30, "?", 84, { fill: "#1f2326" }));
    });
    return out;
  }
  var shots = [];
  shots.push({ a: 0, b: S2, ten: "hũ kẹo hội chợ, cầu tàu, kẹo đáp lên đầu Wob", ve: function (t, lt, T) {
    var out = fair(t) + VT.huKeo({ x: JX, y: TABLE, s: JS, seed: 5 }) + pier(t) + beans(t);
    var o = { t: t, x: WX, y: TABLE + 70, s: WS, sunhat: "coi", noPack: true, legs: "tiptoe", mouth: "oSmall", px: 12, py: -6 };
    var tipJar = [JX - 150 + 30 * Math.sin(Math.round(t * 4) * 1.3), TABLE - 110 - 40 * (Math.round(t * 4) % 3)];
    o.armR = VT.wobLocal(o, tipJar[0] - 30, tipJar[1]); o.handR = "chi"; o.armL = [60, 150]; o.handL = "xoe";
    o.bob = -10 * Math.abs(Math.sin(t * 4));
    var landed = t >= JUMP1;
    if (landed) { o.py = -14; o.px = 2; o.mouth = "flat"; o.brows = "up"; o.eyes = null; }
    out += VT.wob(o);
    var head = VT.wobPt(o, 200, 4);
    if (t >= JUMP0) {
      var k = seg(t, JUMP0, JUMP1), x = VT.lerp(BOWL[0] + 40, head[0], k), y = VT.lerp(TABLE - 160, head[1] - 18, k) - 420 * Math.sin(Math.PI * k);
      out += VT.keo({ x: x, y: y, s: 0.95, hat: true, eyes: true, rot: landed ? 0 : k * 540, color: "#F29E4C" });
      if (k > 0 && k < 1) out += VT.arc([[VT.lerp(BOWL[0] + 40, head[0], Math.max(0, k - 0.15)), VT.lerp(TABLE - 160, head[1] - 18, Math.max(0, k - 0.15)) - 420 * Math.sin(Math.PI * Math.max(0, k - 0.15))], [x, y]], 5, 0.6);
    }
    out += hands(t);
    var cam = key(T, [[0, [960, 600, 1.3]], [T_HOP, [980, 600, 1.34], "sine"], [S2, [960, 610, 1.38], "sine"]]);
    return { cam: cam, shake: VT.shake(t, JUMP1, 0.18, 4), world: out, over: VT.dreamFrame(t, { inset: 50 }), tint: "warm" };
  } });
  var BLOW = T_OVER + 0.7;
  shots.push({ a: S2, b: DUR, ten: "bấm đếm bốc khói, thổi phù, khói thành dấu hỏi", ve: function (t, lt, T) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#F4E3A1"/>' + '<rect x="-1200" y="900" width="4320" height="1600" fill="' + M.cement + '"/>' + VT.line("M -1200 900 L 3100 900", 6);
    out += VT.dayDen({ x0: 200, y0: 260, x1: 1700, y1: 300, n: 14, sag: 90, on: 0.6 });
    var WXX = 900, WY = 1000, o = { t: t, x: WXX, y: WY, s: 1.0, sunhat: "coi", noPack: true, mouth: "flat", brows: "down", px: 12, py: 10 };
    var clicking = t >= T_CLICK - 0.1 && t < BLOW, press = clicking ? Math.round(t * 12) % 2 : 0, heat = seg(t, T_CLICK, T_OVER), smoke = seg(t, T_OVER - 0.3, T_OVER + 0.2);
    o.armR = [330, 210 + 6 * press]; o.handR = "nam";
    if (t >= T_OVER - 0.05) { o.eyes = "wide"; o.brows = "up"; o.mouth = "o"; }
    if (t >= BLOW) { o.eyes = "closed"; o.mouth = "o"; o.sq = 1.04; }
    var cp = VT.wobPt(o, 360, 190);
    out += VT.wob(o) + VT.bamDemTron({ x: cp[0] + 10, y: cp[1], s: 0.72, press: press, heat: heat, smoke: t < BLOW ? smoke : 0, t: t, kim: Math.round(Math.max(0, t - T_CLICK + 0.1) * 12) / 10 });
    if (t >= BLOW) {
      var k = seg(t, BLOW, BLOW + 0.6), mo = VT.wobPt(o, 200, 236);
      out += VT.speedLines({ x0: mo[0] + 40, y0: mo[1] - 30, n: 3, gap: 26, len: 70, dx: 1, dy: 0, sw: 5 });
      var qx = cp[0] + 40 + 60 * k, qy = cp[1] - 230 - 60 * k, sc = 1.2;
      out += '<g opacity="' + VT.f(90 - 30 * seg(t, BLOW + 0.4, DUR)) / 100 + '">' + VT.line("M " + (qx - 34 * sc) + " " + (qy - 40 * sc) + " C " + (qx - 34 * sc) + " " + (qy - 100 * sc) + " " + (qx + 40 * sc) + " " + (qy - 100 * sc) + " " + (qx + 38 * sc) + " " + (qy - 50 * sc) + " C " + (qx + 36 * sc) + " " + (qy - 16 * sc) + " " + qx + " " + (qy - 14 * sc) + " " + qx + " " + (qy + 20 * sc), 22, "#8a8a8a") +
        VT.ell(qx, qy + 58 * sc, 16, 16, "#8a8a8a", 0, { ox: 0, oy: 0 }) + "</g>";
    }
    var cam = key(T, [[S2, [WXX + 90, 760, 1.75]], [T_OVER, [WXX + 100, 740, 1.85], "sine"], [BLOW, [WXX + 110, 700, 1.7], "io"], [DUR, [WXX + 112, 696, 1.74], "sine"]]);
    return { cam: cam, shake: clicking && t > T_OVER - 0.4 ? VT.shake(t, T_OVER - 0.4, 0.9, 3) : [0, 0], world: out, tint: "warm" };
  } });
  return shots;
};
