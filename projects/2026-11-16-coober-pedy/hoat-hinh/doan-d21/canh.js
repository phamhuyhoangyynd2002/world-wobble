/* d21 · vẽ tay · chèn: hai ô so sánh: nhà tôn chạy quạt mãi mãi vs ngọn đồi đội mũ (266,082–287,184 s; 21,102 s). Vào "chen", ra "cat".
 * Wob phủi bụi mũ, đội lại; ô trái: quạt quay tít, đồng hồ điện quay nhanh, lịch xé; ô phải: đồi đội mũ rộng vành khổng lồ, bình thản;
 * Wob lật tờ hoá đơn trống trơn, nhún vai (không vẽ con số tiết kiệm); cuối: quạt gục, đồi vẫn bình thản, Wob đội mũ đứng cạnh, giữ 1 s.
 * Đồ Wob: mũ rộng vành kraft dải đỏ (nhặt lại, phủ bụi), ba lô ô liu + thảm đỏ. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong;
  var T_HERE = VT.tu("here's", 0), T_BUILD = VT.tu("building", 0), T_FAN = VT.tu("fan", 0), T_FOREVER = VT.tu("forever", 0);
  var T_DIG = VT.tu("digging", 0), T_HAT = VT.tu("hat", 0), T_ROCK = VT.tu("rock", 0), T_I = VT.tu("couldn't", 0), T_SAV = VT.tu("savings", 0), T_LOC = VT.tu("locals", 0);
  var S1 = T_BUILD - 0.2, S2 = T_DIG - 0.2, S3 = T_I - 0.2, S4 = D.nhip[4].tai;
  var LX = 520, RX = 1400, PY = 560, G = 900; // tâm hai ô
  VT.sfx("pop", T_HERE + 0.5, 0.35);
  VT.sfx("may-no", T_FAN - 0.3, 0.35);
  VT.sfx("whoosh", S2 + 0.05, 0.35);
  VT.sfx("whoosh", S3 + 0.05, 0.3);
  VT.sfx("xuoc-dia", T_SAV, 0.3);
  VT.sfx("de-kem", S4 + 0.05, 0.5);

  function W(o) { var b = { s: 0.8, sunhat: true, packColor: "oliu" }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.9, 0.1)); return VT.wob(b); }
  var BG = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FBF6EA" opacity="0.65"/>';
  function panel(cx, inner) { return VT.shape("M " + (cx - 400) + " " + (PY - 340) + " L " + (cx + 400) + " " + (PY - 340) + " L " + (cx + 400) + " " + (PY + 340) + " L " + (cx - 400) + " " + (PY + 340) + " Z", "#FFFDF6", { sw: 8 }) + inner; }
  function left(t, droop) {
    var on = t >= T_BUILD, speed = droop ? 0.2 : (t >= T_FAN ? 4 : 1.5);
    var out = VT.desertGround(PY + 230).replace(/-1200/g, String(LX - 395)).replace(/3100/g, String(LX + 395));
    out = VT.shape("M " + (LX - 396) + " " + (PY + 230) + " L " + (LX + 396) + " " + (PY + 230) + " L " + (LX + 396) + " " + (PY + 336) + " L " + (LX - 396) + " " + (PY + 336) + " Z", "#E6CFA0", { sw: 5, ox: 0, oy: 0 });
    out += VT.sunBig({ x: LX + 280, y: PY - 240, r: 50, t: t });
    out += VT.tinHouse({ x: LX - 130, y: PY + 230, s: 0.85, hot: true, t: t });
    if (on) {
      out += VT.fan({ x: LX + 170, y: PY + 230, s: 0.75, t: t, speed: speed, droop: droop || 0 });
      out += VT.meter({ x: LX + 250, y: PY - 80, s: 0.55, t: t, speed: droop ? 0 : 3 });
      out += VT.calendar({ x: LX - 300, y: PY - 210, s: 0.5, k: droop ? 0 : Math.max(0, (t - T_FAN + 0.5) * 2.2) });
    }
    if (droop) out += VT.puff({ x: LX + 230, y: PY + 120, s: 0.35, op: 0.7 });
    return panel(LX, out);
  }
  function right(t) {
    var out = VT.shape("M " + (RX - 396) + " " + (PY + 230) + " L " + (RX + 396) + " " + (PY + 230) + " L " + (RX + 396) + " " + (PY + 336) + " L " + (RX - 396) + " " + (PY + 336) + " Z", "#E6CFA0", { sw: 5, ox: 0, oy: 0 });
    out += VT.sunBig({ x: RX + 280, y: PY - 240, r: 50, t: t });
    if (t >= T_DIG) {
      var drop = seg(t, T_HAT - 0.5, T_HAT);
      out += VT.hillCut({ x: RX, y: PY + 230, w: 640, h: 260, cut: false });
      out += VT.line("M " + (RX - 70) + " " + (PY + 120) + " q 25 14 50 0", 6) + VT.line("M " + (RX + 30) + " " + (PY + 120) + " q 25 14 50 0", 6) + VT.line("M " + (RX - 30) + " " + (PY + 170) + " q 30 16 60 0", 5);
      out += VT.shape("M " + (RX - 60) + " " + (PY + 200) + " L " + (RX + 60) + " " + (PY + 200) + " L " + (RX + 40) + " " + (PY + 230) + " L " + (RX - 40) + " " + (PY + 230) + " Z", "#4a3a2a", { sw: 4 }); // cửa hầm
      if (drop > 0) out += VT.sunhat({ x: RX, y: VT.lerp(PY - 500, PY - 10, VT.ease.bounce(drop)), s: 2.3 });
    }
    return panel(RX, out);
  }

  var shots = [];
  shots.push({ a: 0, b: S1, ten: "phủi bụi mũ, đội lại", ve: function (t, lt, T) {
    var on = t >= T_HERE + 0.5, wo = { t: t, x: 960, y: 1000, s: 1.1, sunhat: on ? { dust: false } : false, mouth: "content", eyes: on ? "happy" : null, py: on ? 0 : 16 };
    var out = BG;
    if (!on) {
      var flick = Math.sin(t * 2 * Math.PI * 3);
      wo.armR = [330 + 30 * flick, 240]; wo.handR = "xoe"; wo.armL = [130, 250]; wo.handL = "nam";
      var hp = VT.wobPt(wo, 130, 250);
      out += W(wo) + VT.sunhat({ x: hp[0] + 60, y: hp[1] - 30, s: 0.95, dust: true, rot: 10 });
      for (var i = 0; i < 3; i++) { var a = ((t * 2 + i * 0.33) % 1); out += VT.puff({ x: hp[0] + 120 + 80 * a, y: hp[1] - 80 - 60 * a, s: 0.25 + 0.2 * a, op: VT.f(0.8 * (1 - a)) }); }
    } else { wo.sq = key(t, [[T_HERE + 0.5, 0.92], [T_HERE + 0.75, 1, "out"]]); out += W(wo); }
    return { cam: key(T, [[0, [960, 700, 1.4]], [S1, [960, 690, 1.45], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S1, b: S2, ten: "ô trái: quạt mãi mãi", ve: function (t, lt, T) {
    var out = BG + left(t) + right(t);
    return { cam: key(T, [[S1, [LX, PY, 1.25]], [S2, [LX + 20, PY, 1.32], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S2, b: S3, ten: "ô phải: đồi đội mũ", ve: function (t, lt, T) {
    var out = BG + left(t) + right(t);
    return { cam: key(T, [[S2, [LX + 20, PY, 1.32]], [S2 + 0.8, [RX, PY, 1.25], "io3"], [S3, [RX, PY, 1.3], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S3, b: S4, ten: "hoá đơn trống, nhún vai", ve: function (t, lt, T) {
    var flip = seg(t, T_SAV - 0.3, T_SAV + 0.1), shrug = t >= T_LOC - 0.2;
    var wo = { t: t, x: 960, y: G + 80, s: 0.95, mouth: shrug ? "flat" : "content", brows: shrug ? "up" : "skeptic", px: shrug ? 0 : 14, py: shrug ? 0 : 10 };
    wo.arms = shrug ? "shrug" : null;
    if (!shrug) { wo.armR = [380, 200]; wo.handR = "nam"; }
    var bp = VT.wobPt(wo, 430, 120);
    var bill = VT.g("translate(" + VT.f(bp[0] + 60) + " " + VT.f(bp[1]) + ") scale(" + VT.f(Math.cos(flip * Math.PI) || 0.01) + " 1)", VT.bill({ x: 0, y: 0, s: 0.75 }));
    var out = BG + left(t) + right(t) + W(wo) + (shrug ? VT.bill({ x: bp[0] + 120, y: bp[1] + 90, s: 0.6, rot: 20 }) : bill);
    return { cam: key(T, [[S3, [980, 760, 1.25]], [S4, [980, 750, 1.32], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S4, b: DUR, ten: "quạt gục, đồi bình thản, giữ", ve: function (t, lt, T) {
    var d = seg(t, S4, S4 + 0.5);
    var wo = { t: t, x: 960, y: G + 80, s: 0.8, mouth: "content", eyes: "happy", noBlink: true };
    var out = BG + left(t, VT.ease.bounce(d)) + right(t) + W(wo);
    return { cam: key(T, [[S4, [960, 620, 1.0]], [DUR, [960, 620, 1.03], "sine"]]), world: out, tint: "warm" };
  } });
  return shots;
};
