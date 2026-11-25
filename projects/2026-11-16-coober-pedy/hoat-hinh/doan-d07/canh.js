/* d07 · vẽ tay · chèn: khay mười ô (100,948–108,186 s; 7,238 s). Vào "chen", ra "cat".
 * "seventy": bảy ô sáng màu opal; "higher": ô thứ tám nhấp nháy nửa sáng (dè dặt); Wob cố nhét lọ opal rỗng vào ô thứ tám, lọ không vừa, khay nghiêng.
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ; cầm lọ opal rỗng. Chữ: "~70%" trên vành khay.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, OP = VT.OPAL_MAU;
  var T70 = VT.tu("seventy", 0), T_PCT = VT.tu("percent", 0), T_THOUGH = VT.tu("though", 0), T_HIGH = VT.tu("higher", 0);
  var S1 = T70 - 0.45, S2 = T_THOUGH - 0.1, T_PUSH = T_HIGH + 0.12, T_TILT = T_PUSH + 0.25;
  var CW = 140, CH = 120; // ô khay
  VT.sfx("ting", T70 - 0.04, 0.6);
  VT.sfx("pop", T_HIGH - 0.03, 0.35);
  VT.sfx("bonk", T_PUSH, 0.6);
  VT.sfx("bonk", T_TILT + 0.05, 0.4);

  function cellXY(i) { var c = i % 5, r = Math.floor(i / 5); return [-2 * CW + c * CW, -CH / 2 + r * CH]; }
  /** khay: gốc tâm ô; lit số ô sáng (0..7), half: độ sáng ô thứ tám, text: chữ trên vành. */
  function tray(t, o) {
    var out = VT.shape("M -380 -170 L 380 -170 L 400 230 L -400 230 Z", "#C68A55", { sw: 8 }); // khay gỗ + vành trước
    out += VT.shape("M -360 -150 L 360 -150 L 360 140 L -360 140 Z", "#8E5527", { sw: 5, ox: 0, oy: 0 });
    for (var i = 0; i < 10; i++) {
      var p = cellXY(i), x = p[0] - CW / 2 + 8, y = p[1] - CH / 2 + 8, lit = 0;
      var on = T70 - 0.06 + i * 0.05;
      if (i < 7 && t >= on) lit = 1;
      if (i === 7 && t >= T_HIGH - 0.04) lit = (Math.floor(t * 12) % 4 < 2) ? 0.55 : 0.25;
      out += '<rect x="' + VT.f(x) + '" y="' + VT.f(y) + '" width="' + (CW - 16) + '" height="' + (CH - 16) + '" rx="14" fill="#F6EEDC" stroke="#1f2326" stroke-width="5"/>';
      if (lit > 0) {
        out += '<rect x="' + VT.f(x + 6) + '" y="' + VT.f(y + 6) + '" width="' + (CW - 28) + '" height="' + (CH - 28) + '" rx="10" fill="' + OP[i % 5] + '" opacity="' + lit + '"/>';
        out += VT.line("M " + VT.f(x + 20) + " " + VT.f(y + 30) + " L " + VT.f(x + 50) + " " + VT.f(y + 18), 6, "#ffffff", 0.8 * lit);
        if (i < 7 && t < on + 0.25) out += VT.sparkle({ x: p[0] + 40, y: p[1] - 40, s: 0.45 });
      }
    }
    out += VT.text(0, 208, "~70%", 64, { fill: "#2c4f6e" });
    return VT.wrap(o, out);
  }
  function jar(o) { // lọ thuỷ tinh rỗng: gốc giữa đáy, cao ~150
    return VT.wrap(o, VT.shape("M -60 0 C -70 -40 -70 -100 -56 -120 L 56 -120 C 70 -100 70 -40 60 0 Z", "#DDEFF4", { sw: 6, op: 0.85 }) +
      VT.shape("M -48 -120 L 48 -120 L 48 -148 L -48 -148 Z", "#C9A46A", { sw: 6 }) + VT.line("M -36 -100 L -40 -30", 8, "#ffffff", 0.8));
  }
  function W(o) {
    var b = { s: 1, sunhat: true, packColor: "oliu" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.6, 0.3));
    return VT.wob(b);
  }
  var BG = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FBF6EA" opacity="0.6"/>';

  var shots = [];
  // 1. Wob giơ khay ra trước mặt (hình to ngay khung đầu)
  shots.push({ a: 0, b: S1, ten: "Wob cầm khay", ve: function (t, lt, T) {
    var TX = 960, TY = 900, wo = { t: t, s: 1.15, x: 960, y: 960, mouth: "smile", brows: "up", py: 14 };
    var hl = VT.wobLocal(wo, TX - 390, TY - 40), hr = VT.wobLocal(wo, TX + 390, TY - 40);
    wo.armL = hl; wo.armR = hr;
    var out = BG + W(wo) + tray(t, { x: TX, y: TY, s: 1 }) + VT.dot(TX - 392, TY - 36, 16) + VT.dot(TX + 392, TY - 36, 16);
    return { cam: key(T, [[0, [960, 640, 1.05]], [S1, [960, 650, 1.09], "sine"]]), world: out, tint: "warm" };
  } });
  // 2. cận khay: bảy ô sáng, rồi giữ
  shots.push({ a: S1, b: S2, ten: "cận khay: bảy ô sáng", ve: function (t, lt, T) {
    var TX = 960, TY = 620, out = BG + tray(t, { x: TX, y: TY, s: 1.1 }) + VT.dot(TX - 432, TY - 40, 18) + VT.dot(TX + 432, TY - 40, 18);
    // mắt Wob ló trên mép khay nhìn xuống
    var wo = { t: t, s: 1.3, x: 960, y: 1500, eyes: t > T70 ? "wide" : null, py: 18, mouth: "o", brows: "up" };
    wo = null;
    var cam = key(T, [[S1, [960, 600, 1.1]], [T70, [960, 600, 1.12], "sine"], [T70 + 0.2, [960, 610, 1.18], "out"], [S2, [960, 610, 1.22], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 3. nhét lọ vào ô thứ tám: không vừa, ấn mạnh, khay nghiêng
  shots.push({ a: S2, b: DUR, ten: "nhét lọ vào ô tám", ve: function (t, lt, T) {
    var TX = 1120, TY = 640, S = 0.8, rot = key(t, [[T_TILT - 0.05, 0], [T_TILT + 0.2, 9, "back"]]);
    var c8 = cellXY(7), tgt = [TX + c8[0] * S, TY + c8[1] * S]; // tâm ô tám (chưa nghiêng)
    var wo = { t: t, s: 0.95, x: 930, y: 1050 };
    var jp = key(t, [[S2, [760, 820]], [T_HIGH - 0.1, [tgt[0] - 10, tgt[1] - 30], "io"], [T_PUSH, [tgt[0], tgt[1] + 10], "in2"], [T_PUSH + 0.2, [tgt[0] + 6, tgt[1] + 18]]]);
    var squash = t >= T_PUSH ? key(t, [[T_PUSH, 0.82], [T_PUSH + 0.15, 0.9]]) : 1;
    wo.armR = VT.wobLocal(wo, jp[0] - 30, jp[1] - 70); wo.handR = "nam";
    wo.armL = t >= T_PUSH - 0.1 ? VT.wobLocal(wo, jp[0] - 20, jp[1] - 150) : [70, 300];
    if (t < T_HIGH - 0.1) { wo.mouth = "smile"; wo.eyes = "happy"; }
    else if (t < T_PUSH) { wo.mouth = "flat"; wo.brows = "flat"; wo.px = 12; }
    else { wo.eyes = "squint"; wo.mouth = "chatter"; wo.marks = "sweat"; wo.lean = 10; }
    var out = BG + VT.shape("M -1200 980 L 3100 980 L 3100 2400 L -1200 2400 Z", "#E9DCC0", { sw: 6, ox: 0, oy: 0 });
    out += VT.shape("M 800 980 L 1440 980 L 1440 790 L 800 790 Z", "#C68A55", { sw: 7 }); // thùng kê khay
    out += VT.g("rotate(" + VT.f(rot) + " " + (TX + 320) + " 780)", tray(t, { x: TX, y: TY, s: S }) + jar({ x: jp[0], y: jp[1] + 60, s: 0.85, sx: 1 / Math.sqrt(squash) }));
    out += W(wo);
    if (t >= T_PUSH && t < T_PUSH + 0.3) out += VT.impact({ x: tgt[0], y: tgt[1] - 60, s: 0.7 });
    var cam = key(T, [[S2, [960, 640, 1.08]], [T_PUSH, [1010, 640, 1.12], "sine"], [T_PUSH + 0.15, [1040, 640, 1.2], "out"], [DUR, [1050, 640, 1.23], "sine"]]);
    return { cam: cam, shake: VT.shake(t, T_PUSH, 0.23, 7), world: out, tint: "warm" };
  } });
  return shots;
};
