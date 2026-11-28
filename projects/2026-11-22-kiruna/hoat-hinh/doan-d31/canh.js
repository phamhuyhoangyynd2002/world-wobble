/* d31 · vẽ tay · chèn: về trung tâm cũ trả chìa lần cuối (462,098–473,142 s tuyệt đối; 11,04 s). Vào "chen", ra "cat".
 * CÙNG KHUNG HÌNH d02 (đóng vòng hook): hàm bai() chép nguyên từ d02, biển phố trắng (rơi ở d02) nằm trên sỏi, cột biển trơ.
 * Gọi lại gag lỗ chìa: lần này trong lỗ chỉ có một con quạ vừa đáp xuống hàng rào. Wob chìa chìa khoá về phía quạ (lần "với tay rồi rút" DUY NHẤT của tập),
 * quạ bay đi ở "nobody"; Wob hạ tay, giữ chùm chìa trước ngực.
 * Đồ Wob (mùa hè, như d02): gi-lê kem túi phải, kính râm tròn đẩy lên trán, ba lô ô liu + thảm đỏ + áo phao cuộn; tay phải cầm chùm chìa, giơ riêng chìa Kiruna.
 * Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, GROUND = 905, WS = 0.72, KS = 0.75;
  var T_FIN = VT.tu("finally"), T_WHERE = VT.tu("Where"), T_GRAVEL = VT.tu("gravel"), T_FENCE = VT.tu("fence");
  var T_I = VT.tu("I", 1), T_KEY = VT.tu("key", 1), T_THERE = VT.tu("There"), T_NOBODY = VT.tu("nobody");
  var DUR = D.thoi_luong;
  var CROW = [1445, 795 - 230 - 2];

  function W(t, o) {
    var b = { t: t, s: WS, vest: true, sunglasses: "tran", packColor: "kiruna", coatRoll: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 3.1, 0.6));
    return VT.wob(b);
  }
  function keysInHand(h, sw) {
    return VT.chumChia({ x: h[0], y: h[1] + 8, s: 0.85, kiruna: false, swing: sw }) +
      VT.chiaKiruna({ x: h[0], y: h[1] - 70 * KS, s: KS, rot: 90, tagSwing: -60 + sw * 1.4 });
  }
  // ----- bối cảnh bãi sỏi: Y HỆT d02 -----
  function bai(t, o) {
    o = o || {};
    var s = VT.sky("#DCEAEE", 1) + VT.ridge(622, -80, "#C7D3CF");
    s += VT.nhaPhaDo({ x: 640, y: 628, w: 300, h: 240, seed: 2, op: 0.5 }) + VT.nhaPhaDo({ x: 1150, y: 628, w: 280, h: 200, seed: 7, op: 0.45 }) + VT.nhaPhaDo({ x: 1500, y: 628, w: 340, h: 260, seed: 4, op: 0.4 });
    s += VT.rectS(-1400, 622, 3300, 800, "#CBC3A6", { sw: 0, ox: 0, oy: 0 }) + VT.line("M -1400 624 L 3300 624", 4, VT.C.ink, 0.5);
    [[220, 700], [560, 660], [1420, 690], [1760, 650], [300, 760]].forEach(function (p) { s += VT.line("M " + p[0] + " " + p[1] + " l -8 -16 M " + (p[0] + 6) + " " + p[1] + " l 2 -20 M " + (p[0] + 12) + " " + p[1] + " l 10 -14", 4, "#6E8B4E"); });
    s += VT.baiSoi({ x: 1030, y: 790, w: 620, d: 168, dong: 0.55, seed: 3 });
    s += VT.g("translate(1175 770) scale(1.1 0.42) rotate(-8)", VT.bienPho({ x: 0, y: 0, off: true }));
    s += VT.hangRao({ x: -1220, y: 795, w: 1320 }) + VT.hangRao({ x: 100, y: 795, w: 660 }) + VT.hangRao({ x: 1300, y: 795, w: 660 });
    if (o.crow) s += o.crow;
    s += VT.shape("M -1400 800 L 3300 800 L 3300 2400 L -1400 2400 Z", "#D9D4C9", { sw: 5, ox: 0, oy: 0 });
    for (var x = -1300; x < 3300; x += 300) s += VT.line("M " + x + " 800 L " + (x - 120) + " 1060", 3, "#A9A398", 0.7);
    s += VT.line("M -1400 1060 L 3300 1060", 6, "#B3AC9F");
    s += VT.bienPho({ x: 1255, y: 800, post: 330, sign: false });
    return s;
  }
  // con quạ: bay vào, đáp xuống hàng rào ở "fence.", nhìn chìa, bay đi ở "nobody"
  var T_LAND = T_FENCE + 0.05, T_OFF = T_NOBODY;
  VT.sfx("drop", T_LAND, 0.25);
  function crow(t) {
    if (t < T_LAND - 0.7 || t > T_OFF + 1.4) return "";
    if (t < T_LAND) { var k = seg(t, T_LAND - 0.7, T_LAND); return VT.qua({ x: VT.lerp(CROW[0] + 560, CROW[0], E.out2(k)), y: CROW[1] - 260 * (1 - E.out2(k)), s: 0.9, pose: "bay", flap: Math.round(t * 12) % 2 ? 1 : 0.2, look: -1 }); }
    if (t < T_OFF) {
      var lookKey = t > T_KEY + 0.5;
      return VT.qua({ x: CROW[0], y: CROW[1], s: 0.9, look: -1, tilt: lookKey ? key(t, [[T_KEY + 0.5, 0], [T_KEY + 0.75, -22, "back"]]) : Math.round(t * 2) % 2 ? 8 : -6 });
    }
    var k2 = seg(t, T_OFF, T_OFF + 1.3);
    return VT.qua({ x: CROW[0] + 700 * E.in2(k2), y: CROW[1] - 520 * E.in2(k2) - 40 * k2, s: 0.9, pose: "bay", flap: Math.round(t * 12) % 2 ? 1 : 0.1, look: 1 });
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · lia nhoè về phía tây, rồi bám theo Wob đi nhanh dọc vỉa hè, giơ chìa như cầm vé =====
  var WK = { t0: 0.12, t1: T_WHERE - 0.2, x0: -560, x1: 800, chuKy: 0.5, s: WS };
  shot(0, T_WHERE, "lia nhoè, Wob đi nhanh dọc vỉa hè", function (t, lt, T) {
    var wk = VT.buoc(t, WK), o = { s: WS, x: wk.x, y: GROUND, flip: 1 };
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride * 1.15; o.mouth = "content"; o.px = 10; o.brows = "up"; }
    else { o.sq = key(t, [[WK.t1, 0.92], [WK.t1 + 0.15, 1.03, "out"], [WK.t1 + 0.3, 1]]); o.px = 10; o.mouth = "content"; }
    if (t >= T_FIN && t < T_FIN + 0.45 && wk.walking) { o.eyes = "happy"; o.mouth = "smile"; }
    o.pack = VT.conLac(t, -0.4, function (s) { var k = VT.buoc(s, WK); return [k.x, GROUND - 12 * Math.pow(Math.sin(k.phase * 2 * Math.PI), 2) * (k.walking ? 1 : 0)]; }, { gx: 1 / 500, gy: 1 / 900 });
    var h = [392, 196 + (wk.walking ? Math.sin(wk.phase * 4 * Math.PI) * 5 : 0)];
    o.armR = h; o.handR = "nam";
    o.prop = keysInHand(h, VT.conLac(t, -0.4, function (s) { var k = VT.buoc(s, WK); return [k.x, GROUND]; }, { gx: 1 / 300, gy: 1 / 900 }) * 1.2);
    var whip = 1 - E.out(seg(T, 0, 0.4));
    var out = bai(t) + W(t, o);
    if (whip > 0.05) out += VT.speedLines({ x0: wk.x - 600, y0: 520, n: 9, gap: 60, len: 700 * whip, dx: -1, dy: 0 });
    var fx = VT.buoc(T, WK).x + 170;
    var cx = Math.min(fx, 970) - 900 * whip * whip, z = 1.5 + 0.03 * seg(T, 2.4, T_WHERE);
    return { cam: [cx, 690, z], world: out, tint: "warm" };
  });

  // ===== S1 · ĐÚNG KHUNG d02: dừng trước bãi sỏi, biển phố vẫn nằm đó; Wob nhìn quanh =====
  var B1 = T_GRAVEL - 0.25;
  shot(T_WHERE, B1, "khung d02: dừng, nhìn quanh", function (t, lt, T) {
    var o = { s: WS, x: 800, y: GROUND, flip: 1, mouth: "flat", brows: "flat" };
    o.px = key(t, [[T_WHERE, 10], [T_WHERE + 0.5, -12, "io"], [T_WHERE + 1.2, -12], [T_WHERE + 1.5, 14, "io"]]);
    o.py = key(t, [[T_WHERE, -4], [T_WHERE + 1.5, 2]]);
    if (t > T_WHERE + 0.5 && t < T_WHERE + 1.2) o.flip = -1;
    var h = [392, 196];
    o.armR = h; o.handR = "nam"; o.prop = keysInHand(h, 2 * Math.sin(Math.round(t * 12) * 0.6));
    var out = bai(t, { crow: crow(t) }) + W(t, o);
    return { cam: [970, 690, 1.53 + 0.05 * seg(T, T_WHERE, B1)], world: out, tint: "warm" };
  });

  // ===== S2 · trung cảnh: Wob nhìn xuống bãi sỏi, rồi con quạ đáp xuống hàng rào ở "fence."; Wob giơ chìa lên mắt =====
  var T_LIFT0 = T_I + 0.02, T_LIFT1 = T_I + 0.3, B2 = T_LIFT1 + 0.04;
  shot(B1, B2, "nhìn bãi sỏi; quạ đáp; giơ chìa", function (t, lt, T) {
    var o = { s: WS, x: 960, y: GROUND, flip: 1, mouth: "flat", brows: "flat", lid: 0.25 };
    o.px = 12; o.py = key(t, [[B1, 10], [T_LAND - 0.3, 10], [T_LAND, -10, "out"]]);
    if (t >= T_LAND && t < T_LAND + 0.4) { o.brows = "up"; o.lid = 0; o.mouth = "oSmall"; }
    var lift = E.io(seg(t, T_LIFT0, T_LIFT1));
    var h = [VT.lerp(392, 238, lift), VT.lerp(196, 156 + 70 * KS + 4, lift)];
    o.armR = h; o.handR = "nam"; o.prop = keysInHand(h, lift > 0 && lift < 1 ? 14 : 2 * Math.sin(Math.round(t * 12) * 0.6));
    if (lift > 0.5) { o.px = 4; o.py = -2; }
    var out = bai(t, { crow: crow(t) }) + W(t, o);
    var face = VT.wobPt(o, 220, 170);
    var push = E.io3(seg(T, T_LIFT0 - 0.05, B2));
    return { cam: [VT.lerp(1180, face[0], push), VT.lerp(700, face[1], push), VT.lerp(1.45, 2.3, push) + 0.04 * seg(T, B1, T_LIFT0)], world: out, tint: "warm" };
  });

  // ===== S3 · CẬN lỗ chìa: không còn cánh cửa, chỉ có con quạ trên hàng rào; hạ chìa =====
  var T_DOWN0 = T_KEY + 0.42, T_DOWN1 = T_DOWN0 + 0.24, B3 = T_DOWN1 + 0.02;
  shot(B2, B3, "cận lỗ chìa: chỉ còn con quạ", function (t, lt, T) {
    var burst = 1 + 0.12 * (1 - E.out(seg(T, B2, B2 + 0.3)));
    var drop = 1300 * E.in2(seg(T, T_DOWN0, T_DOWN1));
    return { cam: [CROW[0], CROW[1] - 40, 1.7 * burst + 0.05 * seg(T, B2, B3)], world: bai(t, { crow: crow(t) }), over: VT.canLoChia({ cy: 520 + drop, t: t, dim: 1 - seg(T, T_DOWN0, T_DOWN1) }), tint: "warm" };
  });

  // ===== S4 · hai người: Wob chìa chìa khoá về phía quạ; quạ nhìn chìa rồi bay đi ở "nobody"; Wob từ từ hạ tay, ôm chùm chìa trước ngực =====
  var T_REACH = B3, T_REACH1 = B3 + 0.22, T_LOWER0 = T_OFF + 0.45, T_LOWER1 = T_OFF + 1.25;
  shot(B3, DUR, "chìa cho quạ; quạ bay; giữ chùm chìa", function (t, lt, T) {
    var o = { s: WS, x: 1060, y: GROUND, flip: 1, mouth: "flat", brows: "up", lid: 0.1, px: 12, py: -8, noBlink: t < T_LOWER0 };
    var reach = E.out(seg(t, T_REACH, T_REACH1)) * (1 - E.io(seg(t, T_LOWER0, T_LOWER1)));
    var hug = E.io(seg(t, T_LOWER0, T_LOWER1));
    var h = [VT.lerp(VT.lerp(392, 214, hug), 480, reach), VT.lerp(VT.lerp(196, 318, hug), 130, reach)];
    o.armR = h; o.handR = "nam";
    if (hug > 0.3) o.armL = [VT.lerp(62, 190, hug), VT.lerp(300, 322, hug)];
    if (reach > 0.5) o.legs = "tiptoe";
    o.lean = 11 * reach;
    var sw = 3 * Math.sin(Math.round(t * 12) * 0.7);
    o.prop = keysInHand(h, sw);
    if (t >= T_OFF) { o.px = VT.lerp(12, 16, seg(t, T_OFF, T_OFF + 0.5)); o.py = VT.lerp(-8, -22, seg(t, T_OFF, T_OFF + 0.6)); o.brows = "worried"; }
    if (t >= T_LOWER0) { o.px = key(t, [[T_LOWER0, 16], [T_LOWER1, 2]]); o.py = key(t, [[T_LOWER0, -22], [T_LOWER1, 6]]); o.lid = 0.35; o.brows = "worried"; o.mouth = "flat"; }
    var out = bai(t, { crow: crow(t) }) + W(t, o);
    if (t >= T_OFF && t < T_OFF + 0.4) out += VT.puff({ x: CROW[0] + 20, y: CROW[1] - 10, s: 0.3 + (t - T_OFF), fill: "#ffffff", op: 0.7 });
    var face = VT.wobPt(o, 200, 170);
    var push = E.io3(seg(T, T_LOWER1 - 0.3, T_LOWER1 + 0.6));
    var cx = VT.lerp(1270, face[0] + 40, push), cy = VT.lerp(700, face[1] + 30, push), z = VT.lerp(1.45, 2.05, push) + 0.05 * seg(T, B3, DUR);
    return { cam: [cx, cy, z], world: out, tint: "warm" };
  });

  return shots;
};
