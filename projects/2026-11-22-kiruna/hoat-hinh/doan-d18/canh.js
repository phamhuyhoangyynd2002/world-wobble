/* d18 · vẽ tay · chèn: "That sea freezes over every winter." (226,288–228,450 s tuyệt đối; 2,16 s). Vào "chen", ra "cat".
 * Hình to: vịnh nhìn nghiêng; bờ tuyết bên trái có Wob đứng đủ người; cảng Luleå bên phải có cần cẩu; một con tàu nhỏ giữa vịnh.
 * "freezes": băng trắng lan từ bờ ra phủ kín vịnh, đóng cứng quanh con tàu; nhãn "Luleå · freezes in winter" bật ra cùng lúc (dưới trái khung, cùng vùng nhãn Luleå đầu d19), giữ trọn tới cắt.
 * Gag: hòn quặng vẽ tay (hai chấm mắt) trượt xoay vòng trên băng mới, đụng con tàu kẹt; Wob nhăn mặt; giữ tới cắt.
 * Đồ Wob: áo phao xanh lam túi phải, mũ len xanh lá thông bông kem, khăn kem sọc xanh lá thông, ba lô ô liu, giày đỏ.
 * Chữ duy nhất: "Luleå · freezes in winter".
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, C = VT.C, f = VT.f;
  var DUR = D.thoi_luong, SEA = 660, WS = 0.78;
  var T_FREEZE = VT.tu("freezes"), T_WINTER = VT.tu("winter");
  var SHIP = [1010, SEA + 8], SHIP_S = 1.3, T_LOCK = T_FREEZE + 0.38, T_GO = T_FREEZE + 0.42, T_HIT = T_GO + 0.55;
  var HIT_X = SHIP[0] - 150 * SHIP_S - 52;
  VT.sfx("tach-bang", T_LOCK - 0.04, 0.8);
  VT.sfx("bonk", T_HIT, 0.45);

  function W(t, o) {
    var b = { t: t, s: WS, puffer: true, beanie: "thong", scarf: "kem-xanh", packColor: "kiruna", keyRing: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 3.1, 0.3));
    return VT.wob(b);
  }
  function iceEdge(t) { return VT.lerp(380, 2300, E.out(seg(t, T_FREEZE, T_FREEZE + 0.6))); }
  function oreX(t) { var k = seg(t, T_GO, T_HIT); return t < T_HIT ? VT.lerp(470, HIT_X, k) : HIT_X - 26 * Math.sin(Math.PI * Math.min(1, (t - T_HIT) / 0.25)); }

  var shots = [];
  shots.push({ a: 0, b: DUR, ten: "vịnh đóng băng, quặng trượt đụng tàu", ve: function (t, lt, T) {
    var s = VT.sky("#D3E5EE", 1) + VT.snowfall(t, 26, [-200, -100, 2200, 900], 0.6);
    s += VT.shape("M -300 " + (SEA - 40) + " C 300 " + (SEA - 120) + " 700 " + (SEA - 70) + " 1100 " + (SEA - 110) + " C 1500 " + (SEA - 140) + " 1900 " + (SEA - 80) + " 2300 " + (SEA - 100) + " L 2300 " + SEA + " L -300 " + SEA + " Z", "#E8F1F5", { sw: 5, ox: 0, oy: 0 });
    s += VT.bien({ y: SEA, t: t, x0: -300, x1: 2300, n: 10, depth: 300 });
    // băng lan từ bờ ra
    var xe = iceEdge(t);
    if (xe > 380) {
      var pts = [[300, SEA - 8]];
      for (var x = 300; x < xe; x += 70) pts.push([Math.min(xe, x + 70), SEA - 8 + 6 * VT.hash(x * 0.13)]);
      var d = "M " + pts.map(function (p) { return f(p[0]) + " " + f(p[1]); }).join(" L ") + " L " + f(xe + 16) + " " + (SEA + 22) + " L " + f(xe - 8) + " " + (SEA + 50) + " L 300 " + (SEA + 50) + " Z";
      s += VT.shape(d, C.snow, { sw: 6, ox: 0, oy: 0 }) + VT.line("M 300 " + (SEA + 36) + " L " + f(xe - 10) + " " + (SEA + 36), 6, C.ice, 0.9);
      for (var i = 0; i < 12; i++) { var cx = 360 + i * 150; if (cx < xe - 60) s += VT.line("M " + cx + " " + (SEA + 4 + 10 * VT.hash(i)) + " l 30 10 l -10 12 l 36 8", 3, C.iceDeep, 0.8); }
    }
    // bờ tuyết bên trái, cảng bên phải
    s += VT.shape("M -300 " + (SEA - 30) + " L 400 " + (SEA - 30) + " C 440 " + (SEA - 10) + " 440 " + (SEA + 40) + " 420 " + (SEA + 60) + " L -300 " + (SEA + 60) + " Z", C.snow, { sw: 6, ox: 0, oy: 0 });
    s += VT.rectS(1380, SEA - 40, 2400, SEA + 80, "#8E9BA4", { sw: 6, ox: 0, oy: 0 }) + VT.rectS(1380, SEA - 52, 2400, SEA - 36, C.snow, { sw: 4, ox: 0, oy: 0 });
    s += VT.canCau({ x: 1470, y: SEA - 40, s: 0.62, sx: -1, len: 380, cap: 160 });
    // tàu; băng đóng quanh thân tàu
    var bob = t < T_LOCK ? 4 * Math.sin(Math.round(t * 12) * 0.9) : 0;
    var jolt = t >= T_HIT ? VT.shake(T, T_HIT, 0.2, 5) : [0, 0];
    s += VT.ship({ x: SHIP[0] + jolt[0], y: SHIP[1] + bob, s: SHIP_S });
    var lk = E.back(seg(t, T_LOCK - 0.05, T_LOCK + 0.2));
    if (lk > 0) {
      s += VT.shape("M " + f(SHIP[0] - 230) + " " + (SEA + 30) + " C " + f(SHIP[0] - 200) + " " + f(SEA - 10 - 18 * lk) + " " + f(SHIP[0] - 120) + " " + f(SEA - 4 - 22 * lk) + " " + f(SHIP[0]) + " " + f(SEA - 6 - 20 * lk) + " C " + f(SHIP[0] + 120) + " " + f(SEA - 4 - 22 * lk) + " " + f(SHIP[0] + 200) + " " + f(SEA - 10 - 18 * lk) + " " + f(SHIP[0] + 230) + " " + (SEA + 30) + " Z", C.snow, { sw: 5 });
      if (seg(t, T_LOCK, T_LOCK + 0.3) < 1) s += VT.radialLines(SHIP[0], SEA - 10, 230, 290, 8, 4, 5, C.iceDeep);
    }
    // Wob trên bờ băng
    var hitK = seg(t, T_HIT, T_HIT + 0.12);
    var o = { s: WS, x: 250, y: SEA - 30, flip: 1, px: 14, py: 2, brows: "up", mouth: "content", eyes: "open" };
    if (t > T_FREEZE + 0.1 && t < T_GO) { o.eyes = "wide"; o.mouth = "oSmall"; }
    if (t >= T_GO && t < T_HIT) { o.px = 16; o.brows = "up"; o.mouth = "o"; }
    if (hitK > 0) { o.eyes = "squint"; o.brows = "worried"; o.mouth = "frown"; o.px = 12; o.lean = -6 * hitK; o.noBlink = true; }
    s += W(t, o);
    // hòn quặng có mắt trượt xoay vòng
    if (t >= T_GO - 0.12) {
      var ox = t < T_GO ? 470 : oreX(t), oy = SEA - 54, spin = t < T_HIT ? 1080 * seg(t, T_GO, T_HIT) : 1080 + 20 * Math.sin((t - T_HIT) * 30) * (1 - seg(t, T_HIT, T_HIT + 0.4));
      s += VT.g("rotate(" + f(spin) + " " + f(ox) + " " + f(oy) + ")", VT.honQuang({ x: ox, y: oy, r: 46, seed: 7, dots: 5 }));
      var dz = t >= T_HIT ? 1 : 0;
      s += VT.dot(ox - 12, oy - 6, 9, "#FFFDF6") + VT.dot(ox + 12, oy - 6, 9, "#FFFDF6") + VT.dot(ox - 12 + (dz ? 0 : 3), oy - 6, 4) + VT.dot(ox + 12 + (dz ? 0 : 3), oy - 6, 4);
      if (t < T_HIT) s += VT.speedLines({ x0: ox - 120, y0: oy - 26, n: 3, gap: 22, len: 70, dx: -1, sw: 4 });
      else if (seg(t, T_HIT, T_HIT + 0.5) < 1) s += VT.impact({ x: HIT_X + 36, y: oy - 6, s: 0.4 * (1 - seg(t, T_HIT, T_HIT + 0.3)) + 0.01 }) + VT.dizzy({ x: ox, y: oy - 56, s: 0.4, t: t });
    }
    // nhãn bật ra ở "freezes", giữ trọn tới cắt; đặt dưới trái khung (trên mặt nước) cùng vùng với nhãn Luleå đầu d19
    var kl = seg(t, T_FREEZE, T_FREEZE + 0.3);
    if (kl > 0) s += VT.g("translate(610 870) scale(" + f(E.back(Math.min(1, kl * 1.6))) + ")", VT.rectS(-470, -56, 470, 56, "#FFFDF6", { sw: 5, ox: 3, oy: 3 }) + VT.textWrite(0, 22, "Luleå · freezes in winter", 62, Math.min(1, kl * 1.25), { fill: "#2c4f6e" }));
    var push = seg(T, 0, DUR);
    return { cam: [VT.lerp(830, 800, push), VT.lerp(560, 575, push), 1.22 + 0.08 * push], world: s, tint: "cold" };
  } });
  return shots;
};
