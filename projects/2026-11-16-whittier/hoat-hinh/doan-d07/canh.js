/* d07 · vẽ tay · đãi vàng ra nắp chai (5,56 s). Vào "chen", ra "giay".
 * Đồ: mũ len kem bông đỏ (lệch từ gag mui xe), khăn kem, giày đỏ, ba lô ô liu cuộn thảm đỏ, cụm mây trên đầu; cầm chảo đãi. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, G = 860, WS = 0.62, WX = 820;
  var T_WHY = VT.tu("why"), T_HERE = VT.tu("here?"), T_GOLD = VT.tu("gold."), T_NOT = VT.tu("not"), T_WRONG = VT.tu("wrong"), T_PASS = VT.tu("passing");
  var T_FIND = T_GOLD - 0.1;                // nắp chai lộ ra trong chảo
  var T_POCKET = T_PASS - 0.1;              // nắp chai vào túi ba lô
  var HAT = { mu: "#EFE3C8", vanh: "#DCCBA4", bong: "#C9463A", rot: -14 };
  function W(t, o) {
    var b = { t: t, s: WS, x: WX, y: G, beanie: HAT, scarf: "kem", packColor: "oliu", flip: 1, cold: true };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.8, 0.6));
    var out = VT.wob(b), c = VT.wobPt(b, 196, -6);
    return out + VT.cloud({ x: c[0], y: c[1] + Math.sin(VT.twos(t) * 2) * 4, s: 0.36 * WS / 0.62 });
  }
  function world(t) {
    var s = VT.sky("#C5D0D4") + VT.ridge(600, 0);
    s += '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="#8A9488"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    s += VT.ell(1080, G + 40, 300, 40, "#7FA6B6", 5);
    var st = VT.twos(t); s += VT.ell(1080, G + 40, 120 + (st * 90) % 160, 14, "none", 3, { op: 0.5 });
    return s;
  }
  function panSwirl(t) { return t < T_FIND ? Math.sin(VT.twos(t) * 16) : 0; }

  VT.sfx("hoi-nuoc", 0.2, 0.3);
  VT.sfx("ka-ching", T_FIND + 0.05, 0.6);
  VT.sfx("pop", T_POCKET + 0.05, 0.4);

  var shots = [];
  // S0 · Wob ngồi xổm cạnh vũng nước, lắc chảo đãi hăng say (khung đầu rõ)
  var B0 = T_FIND - 0.05;
  shots.push({ a: 0, b: B0, ten: "đãi vàng hăng say", ve: function (t, lt, T) {
    var sw = panSwirl(t), o = { s: WS, x: WX, y: G, legs: "tuck", lean: 6 + sw * 4, px: 12, py: 16, brows: "down", mouth: "flat" };
    if (t > T_HERE) { o.brows = "up"; o.mouth = "content"; }
    var pan = [WX + 150 + sw * 26, G - 30];
    o.armL = VT.wobLocal(o, pan[0] - 90, pan[1]); o.armR = VT.wobLocal(o, pan[0] + 90, pan[1]); o.handL = o.handR = "nam";
    var out = world(t) + W(t, o) + VT.goldPan({ x: pan[0], y: pan[1], s: 0.8, rot: sw * 6, water: 1, t: t });
    if (Math.abs(sw) > 0.8) out += VT.drop({ x: pan[0] + sw * 110, y: pan[1] - 20, s: 0.5 }) + VT.drop({ x: pan[0] + sw * 80, y: pan[1] - 50, s: 0.35 });
    return { cam: [WX + 140, G - 160, key(T, [[0, 1.65], [B0, 1.75]])], world: out, tint: "cold" };
  } });
  // S1 · cận: nắp chai trong chảo, Wob giơ lên soi như kim cương, mắt lấp lánh
  var B1 = T_NOT - 0.1;
  shots.push({ a: B0, b: B1, ten: "nắp chai = kim cương", ve: function (t, lt, T) {
    var k = VT.ease.out(seg(t, B0, B0 + 0.35));
    var o = { s: WS, x: WX, y: G, legs: "tuck", lean: -6, px: 14, py: -10, eyes: "wide", brows: "up", mouth: "o", noBlink: true };
    var cap = [VT.lerp(WX + 150, WX + 120, k), VT.lerp(G - 40, G - 230, k)];
    o.armR = VT.wobLocal(o, cap[0] + 8, cap[1] + 18); o.handR = "nam"; o.armL = VT.wobLocal(o, WX + 60, G - 30); o.handL = "nam";
    var out = world(t) + VT.goldPan({ x: WX + 70, y: G - 20, s: 0.8, water: 0.5, t: t }) + W(t, o) + VT.bottleCap({ x: cap[0], y: cap[1], s: 1.2 });
    if (k > 0.6) {
      var gl = Math.floor(t * 8) % 2;
      out += VT.sparkle({ x: cap[0] + 30, y: cap[1] - 30, s: gl ? 0.7 : 0.45 }) + VT.sparkle({ x: cap[0] - 34, y: cap[1] - 10, s: gl ? 0.35 : 0.55 });
      var e1 = VT.wobPt(o, 160, 150), e2 = VT.wobPt(o, 238, 150);
      out += VT.sparkle({ x: e1[0], y: e1[1], s: 0.28, fill: "#FFE6A0" }) + VT.sparkle({ x: e2[0], y: e2[1], s: 0.28, fill: "#FFE6A0" });
    }
    var c = VT.wobPt(o, 230, 150);
    return { cam: [VT.lerp(c[0], cap[0], 0.35), VT.lerp(c[1], cap[1], 0.3), key(T, [[B0, 2.0], [B1, 2.2, "out"]])], world: out, tint: "cold" };
  } });
  // S2 · nhún vai, cận tay nhét nắp chai vào túi ba lô (để callback sau)
  shots.push({ a: B1, b: D.thoi_luong, ten: "nhún vai, cất nắp chai", ve: function (t, lt, T) {
    var o = { s: WS, x: WX, y: G, legs: "tuck", px: 8, py: 0, brows: "flat", mouth: "smirk", lid: 0.3 };
    var shrug = t < T_WRONG + 0.5;
    if (shrug) { o.arms = "shrug"; o.bob = -8 * VT.ease.out(seg(t, B1, B1 + 0.2)); }
    var pocket = VT.wobPt(o, 322, 178), cap;
    if (shrug) { var hp = VT.wobPt(o, 366, 160); cap = [hp[0], hp[1] - 6]; }
    else {
      var k = VT.ease.io(seg(t, T_WRONG + 0.5, T_POCKET)), h0 = VT.wobPt(o, 366, 160);
      cap = [VT.lerp(h0[0], pocket[0] + 6, k), VT.lerp(h0[1], pocket[1] - 30, k) - 50 * Math.sin(Math.PI * k)];
      if (t >= T_POCKET) cap = [pocket[0] + 6, pocket[1] - 6 + 30 * seg(t, T_POCKET, T_POCKET + 0.15)];
      o.armR = VT.wobLocal(o, cap[0], cap[1] + 10); o.handR = "nam";
    }
    var capSvg = t < T_POCKET + 0.15 ? VT.bottleCap({ x: cap[0], y: cap[1], s: 0.9 }) : "";
    var out = world(t) + VT.goldPan({ x: WX + 90, y: G - 10, s: 0.8, water: 0.4, t: t }) + W(t, o) + capSvg;
    if (t >= T_POCKET + 0.1 && t < T_POCKET + 0.35) out += VT.sparkle({ x: pocket[0], y: pocket[1] - 30, s: 0.4 });
    var z = key(T, [[B1, 1.7], [T_WRONG + 0.5, 1.75], [T_POCKET, 2.3, "io"], [D.thoi_luong, 2.4]]);
    var cx = key(T, [[B1, WX + 40], [T_WRONG + 0.5, WX + 40], [T_POCKET, pocket[0] - 40, "io"]]), cy = key(T, [[B1, G - 180], [T_WRONG + 0.5, G - 180], [T_POCKET, pocket[1] - 30, "io"]]);
    return { cam: [cx, cy, z], world: out, tint: "cold" };
  } });
  return shots;
};
