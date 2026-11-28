/* d16 · vẽ tay · sơ đồ: quặng phốt-pho và phương pháp Thomas (204,697–216,549 s tuyệt đối; 11,85 s). Vào "cat", ra "cat".
 * S0 hòn quặng to giữa trang, Wob gõ nhẹ búa nhỏ; "phosphorus," các chấm sáng lên.
 * S1 lò gạch cũ nhả một thanh sắt lên đe; Wob tay trái giữ đầu thanh, tay phải gõ búa đúng "brittle.": thanh sắt vỡ vụn, đầu búa văng,
 *    Wob chỉ còn cầm cán búa và một mẩu sắt; giữ.
 * S2 nhãn "1870s" viết mực; lò chuyển hình quả lê. S3 hòn quặng lốm đốm vào lò, lò nghiêng rót, ra một thanh sắt tốt.
 * S4 cận hòn quặng: Wob cài huy hiệu nơ đúng "point.", lùi lại ngắm; giữ. (Không có hòn quặng phồng ngực.)
 * Đồ Wob: áo phao xanh lam túi phải, mũ len xanh lá thông, khăn kem sọc xanh lá thông, ba lô ô liu, giày đỏ. Chữ duy nhất: "1870s".
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, C = VT.C, f = VT.f;
  var DUR = D.thoi_luong;
  var T_ORE = VT.tu("ore"), T_FLAW = VT.tu("flaw"), T_PHOS = VT.tu("phosphorus"), T_OLDER = VT.tu("older"), T_FURN = VT.tu("furnaces"), T_BRIT = VT.tu("brittle"),
    T_IN = VT.tu("In", 2), T_1870 = VT.tu("eighteen-seventies"), T_NEW = VT.tu("new"), T_THOMAS = VT.tu("Thomas"), T_PROC = VT.tu("process"), T_TURN = VT.tu("turned"),
    T_SELL = VT.tu("selling"), T_POINT = VT.tu("point");
  var BLUE = "#2c4f6e", GROUND = 900;
  VT.sfx("bonk", T_BRIT + 0.02, 0.7);
  VT.sfx("ting", T_POINT, 0.6);

  function W(t, o) {
    var b = { t: t, s: 0.8, puffer: true, beanie: "thong", scarf: "kem-xanh", packColor: "kiruna", keyRing: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.7, 0.6));
    return VT.wob(b);
  }
  function page() {
    var s = VT.rectS(-1400, -1400, 3300, 2500, "#EFE3C8", { sw: 0, ox: 0, oy: 0 });
    for (var y = 120; y < 1080; y += 64) s += VT.line("M -200 " + y + " L 2120 " + y, 2, "#9cc8dc", 0.3);
    return s + VT.line("M 160 " + GROUND + " L 1760 " + GROUND, 5, C.ink, 0.6);
  }
  // búa trong tay: gốc ở bàn tay (thế giới), đầu búa hướng về điểm head
  function hammer(hand, head, o) {
    o = o || {};
    var rot = Math.atan2(head[0] - hand[0], -(head[1] - hand[1])) * 180 / Math.PI;
    return VT.buaNho({ x: hand[0], y: hand[1], s: o.s || 0.9, rot: rot, head: o.head });
  }
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · hòn quặng to; Wob gõ nhẹ; "phosphorus," chấm sáng =====
  var ORE = [1010, 560, 210], B0 = T_OLDER - 0.1;
  shot(0, B0, "hòn quặng, gõ nhẹ, chấm sáng", function (t, lt, T) {
    var glow = E.out(seg(t, T_PHOS, T_PHOS + 0.45));
    var s = page() + VT.honQuang({ x: ORE[0], y: ORE[1], r: ORE[2], seed: 11, glow: glow });
    var o = { s: 0.8, x: 560, y: GROUND, flip: 1, px: 12, py: -4, brows: "up", mouth: "content" };
    o.armR = [345, 175]; o.handR = "nam";
    var hand = VT.wobPt(o, 345, 175);
    var tap = key(t, [[0, 0.7], [T_ORE - 0.2, 1], [T_ORE, 0, "in2"], [T_ORE + 0.15, 0.6, "out"], [T_FLAW - 0.05, 0, "in2"], [T_FLAW + 0.2, 0.9, "out"], [T_PHOS, 0.9]]);
    var hit = [ORE[0] - ORE[2] * 0.92, ORE[1] + 40], head = [hit[0] - 60 * tap, hit[1] - 170 * tap];
    if (t > T_PHOS + 0.1) { o.eyes = "wide"; o.mouth = "o"; o.py = -8; o.lean = -6; head = [hand[0] - 10, hand[1] - 150]; }
    s += W(t, o) + hammer(hand, head);
    [T_ORE, T_FLAW - 0.05].forEach(function (th) { var k = seg(t, th, th + 0.25); if (k > 0 && k < 1) s += VT.knockLines({ x: hit[0] - 6, y: hit[1] - 10, s: 0.7, k: k }); });
    return { cam: [900, 600, 1.2 + 0.04 * seg(T, 0, B0)], world: s, tint: null };
  });

  // ===== S1 · lò gạch nhả thanh sắt; "brittle." búa gõ: thanh vỡ vụn, đầu búa văng; giữ =====
  var B1 = T_IN - 0.02, FURN = [500, GROUND], ANVIL = [1010, GROUND], BAR_Y = GROUND - 86, BAR_X = 1000;
  shot(B0, B1, "lò gạch, búa gõ thanh sắt vỡ", function (t, lt, T) {
    var s = page();
    var glow = E.out(seg(t, T_FURN - 0.1, T_FURN + 0.2)) * (1 - 0.6 * seg(t, T_FURN + 0.8, T_BRIT));
    s += VT.loGach({ x: FURN[0], y: FURN[1], w: 300, h: 330, smoke: 1, t: t, glow: glow });
    s += VT.rectS(ANVIL[0] - 150, ANVIL[1] - 70, ANVIL[0] + 150, ANVIL[1], "#6F777C", { sw: 6 }) + VT.line("M " + (ANVIL[0] - 130) + " " + (ANVIL[1] - 56) + " L " + (ANVIL[0] + 120) + " " + (ANVIL[1] - 56), 4, "#9AA7AE");
    var ks = E.out(seg(t, T_FURN, T_FURN + 0.55));
    var bx = VT.lerp(FURN[0] + 40, BAR_X, ks), by = VT.lerp(GROUND - 40, BAR_Y, ks) - 80 * Math.sin(Math.PI * ks);
    var broken = 0.78 * seg(t, T_BRIT, T_BRIT + 0.55);
    if (ks > 0) s += VT.thanhSat({ x: bx, y: by, len: 300, broken: broken, rot: (1 - ks) * -10 });
    var o = { s: 0.8, x: 1360, y: GROUND, flip: -1, px: -12, py: 6, brows: "flat", mouth: "content" };
    var hold = [BAR_X + 150, BAR_Y], hk = seg(t, T_FURN + 0.45, T_FURN + 0.8);
    var rest = VT.wobPt(o, 60, 250);
    var lh = [VT.lerp(rest[0], hold[0], E.io(hk)), VT.lerp(rest[1], hold[1], E.io(hk))];
    o.armL = VT.wobLocal(o, lh[0], lh[1]); o.handL = "nam";
    var up = VT.wobPt(o, 300, 30), down = [BAR_X - 10 + 20, BAR_Y - 140];
    var sw = key(t, [[B0, 0.3], [T_FURN + 0.6, 0.3], [T_BRIT - 0.45, 1, "io"], [T_BRIT - 0.12, 1], [T_BRIT, 0, "in2"], [T_BRIT + 0.12, 0.08, "out"]]);
    var hand = [VT.lerp(down[0], up[0], sw), VT.lerp(down[1], up[1], sw)];
    o.armR = VT.wobLocal(o, hand[0], hand[1]); o.handR = "nam";
    var head = sw > 0.5 ? [hand[0] + 60, hand[1] - 140] : [VT.lerp(BAR_X - 30, hand[0] + 60, sw * 2), VT.lerp(BAR_Y - 10, hand[1] - 140, sw * 2)];
    var headOn = t < T_BRIT;
    if (t >= T_BRIT - 0.45 && t < T_BRIT) { o.brows = "down"; o.mouth = "flat"; o.eyes = "squint"; }
    if (t >= T_BRIT) { o.eyes = "open"; o.brows = "flat"; o.mouth = "flat"; o.px = 0; o.py = 0; o.noBlink = true; }
    s += W(t, o) + hammer(hand, head, { head: headOn });
    if (t >= T_BRIT) {
      s += VT.thanhSat({ x: lh[0] - 18, y: lh[1], len: 40, rot: 8 }); // mẩu sắt còn trong tay trái
      var fk = seg(t, T_BRIT, T_BRIT + 0.7), hx = hand[0] + 40 - 380 * fk, hy = hand[1] - 120 - 420 * fk + 900 * fk * fk;
      if (fk < 1) s += VT.g("translate(" + f(hx) + " " + f(hy) + ") rotate(" + f(-540 * fk) + ")", VT.rectS(-41, -18, 41, 18, "#6F777C", { sw: 5, ox: 2, oy: 2 }));
      s += VT.impact({ x: BAR_X + 20, y: BAR_Y - 6, s: 0.8 * (1 - seg(t, T_BRIT, T_BRIT + 0.25)) });
    }
    var sh = VT.shake(T, T_BRIT, 0.25, 9);
    return { cam: [930, 700, 1.42 + 0.05 * seg(T, B0, T_BRIT) + (T >= T_BRIT ? 0.12 : 0)], shake: sh, world: s, tint: null };
  });

  // ===== S2 · "1870s" viết mực; lò chuyển quả lê, rung nhẹ, miệng lò sáng =====
  var CONV = [1000, GROUND], B2 = T_THOMAS - 0.08;
  shot(B1, B2, "1870s, lò chuyển", function (t, lt, T) {
    var s = page() + VT.textWrite(960, 330, "1870s", 104, E.io(seg(t, T_1870, T_1870 + 0.8)), { fill: BLUE });
    var gl = E.out(seg(t, T_NEW, T_NEW + 0.5)), rock = gl * 4 * Math.sin(Math.round(t * 12) * 1.4);
    s += VT.loChuyen({ x: CONV[0], y: CONV[1], s: 1.2, tilt: rock, glow: gl, t: t });
    if (gl > 0) s += VT.puff({ x: CONV[0] + rock * 3, y: CONV[1] - 450 - 20 * Math.sin(Math.round(t * 12)), s: 0.5 * gl, fill: "#F6D36A", op: 0.5 });
    var o = { s: 0.8, x: 470, y: GROUND, flip: 1, px: 12, py: -10, brows: "up", mouth: t > T_NEW ? "oSmall" : "content", eyes: t > T_NEW ? "wide" : "open" };
    if (t < T_1870 + 0.9) { o.px = 6; o.py = -16; }
    s += W(t, o);
    return { cam: [960, 610, 1.18 + 0.06 * seg(T, B1, B2)], world: s, tint: null };
  });

  // ===== S3 · hòn quặng lốm đốm vào lò, lò nghiêng rót, ra thanh sắt tốt =====
  var B3 = T_SELL - 0.12;
  shot(B2, B3, "quặng vào lò, rót, thanh sắt tốt", function (t, lt, T) {
    var s = page();
    var tilt = 70 * E.io(seg(t, T_PROC, T_PROC + 0.5)) * (1 - E.io(seg(t, T_TURN + 0.4, T_TURN + 0.9)));
    var pour = seg(t, T_PROC + 0.45, T_PROC + 0.8) * (1 - seg(t, T_TURN + 0.3, T_TURN + 0.5));
    s += VT.loChuyen({ x: CONV[0], y: CONV[1], s: 1.2, tilt: tilt, glow: 1, pour: pour, t: t });
    // khuôn đúc bên phải
    s += VT.rectS(1330, GROUND - 60, 1630, GROUND, "#8A6A4A", { sw: 6 });
    if (pour > 0.3 && t < T_TURN) s += VT.rectS(1350, GROUND - 52, 1610, GROUND - 30, "#F08A3A", { sw: 0, ox: 0, oy: 0 });
    var mk = E.io(seg(t, B2, T_PROC - 0.05));
    if (mk < 1) {
      var mx = VT.lerp(560, CONV[0], mk), my = VT.lerp(640, CONV[1] - 430, mk) - 160 * Math.sin(Math.PI * mk);
      s += VT.honQuang({ x: mx, y: my, r: 64 * (1 - 0.4 * mk), seed: 11, glow: 0.6, dots: 8 });
    }
    var gk = E.back(seg(t, T_TURN, T_TURN + 0.35));
    if (gk > 0) s += VT.thanhSat({ x: 1480, y: GROUND - 82 - 30 * (1 - gk), len: 300, good: true, s: gk });
    var o = { s: 0.8, x: 560, y: GROUND, flip: 1, px: 14, py: -12, brows: "up", mouth: "oSmall" };
    if (t > T_TURN + 0.1) { o.eyes = "happy"; o.mouth = "smile"; o.arms = "up"; }
    s += W(t, o);
    return { cam: [VT.lerp(980, 1080, E.io(seg(T, B2, T_TURN))), 640, 1.3], world: s, tint: null };
  });

  // ===== S4 · cận hòn quặng: Wob cài huy hiệu nơ đúng "point.", lùi lại ngắm; giữ =====
  var BIG = [880, 590, 230];
  shot(B3, DUR, "cài huy hiệu nơ", function (t, lt, T) {
    var badge = E.back(seg(t, T_POINT - 0.12, T_POINT + 0.08));
    var s = page() + VT.honQuang({ x: BIG[0], y: BIG[1], r: BIG[2], seed: 11, glow: 0.35, badge: badge });
    var step = E.io(seg(t, T_POINT + 0.08, T_POINT + 0.4));
    var o = { s: 0.8, x: VT.lerp(1250, 1390, step), y: GROUND, flip: -1, px: -14, py: -10, brows: "up", mouth: "content", lean: 6 * step };
    var bp = [BIG[0] + BIG[2] * 0.55, BIG[1] - BIG[2] * 0.45];
    var reach = E.io(seg(t, B3, T_POINT - 0.12)) * (1 - step);
    if (badge <= 0) s += VT.huyHieuNo({ x: VT.lerp(1180, bp[0], reach), y: VT.lerp(700, bp[1], reach), s: 0.8, rot: 12 });
    var rest = VT.wobPt(o, 340, 260), hx = VT.lerp(rest[0], bp[0] + 30, reach), hy = VT.lerp(rest[1], bp[1] + 10, reach);
    o.armR = VT.wobLocal(o, hx, hy); o.handR = badge > 0 ? "chi" : "nam";
    if (step > 0.5) { o.eyes = "happy"; o.mouth = "smile"; o.armR = [330, 280]; o.handR = "nam"; o.noBlink = true; }
    s += W(t, o);
    if (badge > 0.5) s += VT.sparkle({ x: bp[0] + 60, y: bp[1] - 60, s: 0.5 * (1 - seg(t, T_POINT + 0.1, T_POINT + 0.5)) });
    return { cam: [1040, 640, 1.48 + 0.04 * seg(T, B3, DUR)], world: s, tint: null };
  });

  return shots;
};
