/* d09 · vẽ tay (141,05–161,3 s; 20,25 s). Vào "giay", ra "cat". Hồi ức, không khẩu hình.
 * A) Trang sổ phác thảo: nét mực tự vẽ hòn đảo, rồi mũi tên nét đứt; Wob nhỏ chạy đuổi theo đầu nét, camera lướt smootherstep theo tới dấu X đỏ + rương báu;
 *    Wob chỉ vào X, mắt sáng rỡ ("something").
 * B) Nền xi măng lối đi, ba lô dựa tường: Wob cắm xẻng nhựa đỏ xuống, xẻng gập đôi như khăn giấy ("folded"); Wob gấp nốt cho vuông rồi giấu sau lưng.
 * C) Wob quỳ bới khe đá bằng hai tay, bụi giấy bay.
 * D) Đúng 3 động tác: giơ cúc ở "one" → ướm lên người ở "button" → kéo vành mũ cói sụp kín mắt ở "shame", giữ tới hết. Không tia sáng.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var T_SO = VT.tu("so"), T_I = VT.tu("i", 0), T_TREAS = VT.tu("treasure."), T_SOME = VT.tu("something.");
  var T_BORROW = VT.tu("borrowed"), T_SPADE = VT.tu("spade."), T_GROUND = VT.tu("ground"), T_CEM = VT.tu("cement."), T_FOLD = VT.tu("folded"), T_NAP = VT.tu("napkin.");
  var T_DUG = VT.tu("i", 2), T_ONE = VT.tu("one"), T_BUT = VT.tu("button"), T_STRONG = VT.tu("strong"), T_SHAME = VT.tu("shame.");
  var SB = VT.nhip(1), SC = VT.nhip(2), SD = T_ONE - 0.12;
  var STRIKE = T_CEM + 0.42, NEAT = T_NAP + 0.35, HIDE = SC - 0.35;
  var A0 = T_TREAS + 0.1, A1 = T_SOME - 0.35; // mũi tên vẽ dần
  VT.sfx("ting", A1 + 0.05, 0.55);
  VT.sfx("bonk", STRIKE, 0.6);
  VT.sfx("pop", NEAT, 0.35);
  VT.sfx("de-kem", T_SHAME + 0.05, 0.55);

  // ---------- A · trang sổ ----------
  var ISL = [[560, 560], [620, 440], [780, 380], [960, 400], [1140, 360], [1320, 420], [1400, 540], [1330, 660], [1140, 700], [960, 690], [760, 720], [600, 680]];
  var PATH = [[300, 860], [430, 780], [560, 800], [700, 700], [820, 600], [960, 620], [1080, 540], [1190, 520]];
  var XP = [1230, 510];
  function page(t) {
    var out = VT.shape("M 150 110 L 1770 110 L 1770 970 L 150 970 Z", "#FBF4E2", { sw: 6, ox: 10, oy: 12 });
    for (var y = 170; y < 960; y += 60) out += VT.line("M 170 " + y + " L 1750 " + y, 2, "#9CC8DC", 0.35);
    for (var i = 0; i < 11; i++) out += VT.ell(150, 170 + i * 75, 16, 22, "none", 5);
    var k = seg(t, T_SO - 0.3, T_I - 0.2);
    out += VT.lineDraw(VT.smooth(ISL, true), k, 7);
    if (k >= 1) {
      out += VT.lineDraw("M 430 470 q 20 -12 40 0 q 20 12 40 0 M 1480 420 q 20 -12 40 0 q 20 12 40 0 M 1460 780 q 20 -12 40 0 q 20 12 40 0 M 440 640 q 20 -12 40 0 q 20 12 40 0", seg(t, T_I - 0.2, T_I + 0.4), 5, "#2c4f6e");
      out += VT.lineDraw("M 800 520 L 800 440 M 800 440 c -30 -10 -50 0 -60 20 M 800 440 c 30 -14 50 -4 60 16 M 800 440 c -10 -30 0 -46 20 -50", seg(t, T_I + 0.2, T_I + 0.8), 5, "#3F6E3A");
    }
    return out;
  }
  function tipAt(k) { return VT.alongPts(PATH, k); }
  var shots = [];
  shots.push({ a: 0, b: SB, ten: "sơ đồ kho báu vẽ tay", ve: function (t, lt, T) {
    var out = page(t), ka = VT.ease.io3(seg(t, A0, A1));
    for (var di = 0; di < 34; di++) { var u0 = di / 34, u1 = u0 + 0.55 / 34; if (u0 >= ka) break; var p0 = tipAt(u0), p1 = tipAt(Math.min(u1, ka)); out += VT.line("M " + VT.f(p0[0]) + " " + VT.f(p0[1]) + " L " + VT.f(p1[0]) + " " + VT.f(p1[1]), 8); }
    if (ka >= 1) { var e1 = tipAt(0.97), e2 = PATH[PATH.length - 1], ang = Math.atan2(e2[1] - e1[1], e2[0] - e1[0]); out += VT.line("M " + VT.f(e2[0] - 40 * Math.cos(ang - 0.5)) + " " + VT.f(e2[1] - 40 * Math.sin(ang - 0.5)) + " L " + e2[0] + " " + e2[1] + " L " + VT.f(e2[0] - 40 * Math.cos(ang + 0.5)) + " " + VT.f(e2[1] - 40 * Math.sin(ang + 0.5)), 8); }
    if (ka > 0 && ka < 1) { var tp = tipAt(ka); out += VT.dot(tp[0], tp[1], 9); }
    if (t >= A1) {
      out += VT.bigX({ x: XP[0], y: XP[1], s: 0.55, k: seg(t, A1, A1 + 0.15) });
      var cp = VT.ease.back(seg(t, A1 + 0.1, A1 + 0.4));
      if (cp > 0) out += VT.ruong({ x: XP[0] + 150, y: XP[1] + 60, s: 0.55 * cp });
    }
    if (t >= T_I - 0.05) {
      var kw = t < A0 ? 0 : Math.max(0, VT.ease.io3(seg(t, A0, A1)) - 0.07), wp = tipAt(kw), pp = tipAt(Math.max(0, kw - 0.01));
      var running = t >= A0 && t < A1, pop = VT.ease.back(seg(t, T_I - 0.05, T_I + 0.2));
      var o = { t: t, x: wp[0], y: wp[1] + 4, s: 0.34 * pop, sunhat: "coi", noPack: true, mouth: running ? "smile" : "content", flip: 1 };
      if (running) { o.legs = "walk"; o.phase = t * 3; o.stride = 46; o.lean = 8; }
      if (t >= T_TREAS - 0.03 && !running) { o.eyes = "wide"; o.mouth = "o"; }
      if (t >= A1 + 0.05) { o.arms = "point"; o.eyes = "wide"; o.mouth = "smile"; o.brows = "up"; o.lashes = 0.8; }
      out += VT.wob(o);
      if (t >= A1 + 0.05) { var sp = VT.wobPt({ s: 0.34, x: wp[0], y: wp[1] + 4 }, 200, 120); out += VT.sparkle({ x: sp[0] - 40, y: sp[1] - 70, s: 0.4 + 0.12 * (Math.round(t * 12) % 2) }) + VT.sparkle({ x: sp[0] + 60, y: sp[1] - 60, s: 0.3 }); }
      if (t >= T_TREAS - 0.03 && t < A0 + 0.5) out += VT.bubble({ x: wp[0] + 120, y: wp[1] - 200, s: 0.42, sym: VT.ruong({ x: 0, y: 40, s: 0.6 }), tail: -1 });
    }
    var follow = VT.alongPts(PATH, Math.max(0, VT.ease.io3(seg(T, A0, A1)) - 0.07));
    var fk = VT.ease.io3(seg(T, A0 - 0.4, A0 + 0.3)), ek = VT.ease.io3(seg(T, A1, A1 + 0.5));
    var cx = VT.lerp(VT.lerp(960, follow[0] + 60, fk), XP[0] + 40, ek), cy = VT.lerp(VT.lerp(540, follow[1] - 40, fk), XP[1] + 10, ek);
    var z = VT.lerp(VT.lerp(1.0, 1.75, fk), 1.95, ek) + 0.04 * seg(T, A1 + 0.5, SB);
    return { cam: [cx, cy, z], world: out, tint: "warm" };
  } });

  // ---------- B, C, D · nền xi măng ----------
  var G = 880;
  function lane(t) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="' + (1200 + G) + '" fill="#F4E3A1"/>' + VT.line("M -1200 " + (G - 6) + " L 3100 " + (G - 6), 5, VT.C.ink, 0.4);
    out += VT.shape("M 120 " + G + " l 0 -330 l 150 0 l 0 330 Z", "#7A5A3C", { sw: 6 }) + VT.shape("M 1500 300 l 130 0 l 0 130 l -130 0 Z", "#3A4A52", { sw: 6 });
    out += '<rect x="-1200" y="' + G + '" width="4320" height="1600" fill="' + M.cement + '"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    var r = VT.rng(41);
    for (var i = 0; i < 46; i++) { var x = -600 + r() * 3000, y = G + 30 + r() * 300; out += VT.shape(VT.blob(6 + r() * 10, i, 7, 0.4), "#EFE6D6", { sw: 3 }).replace("<path", '<path transform="translate(' + VT.f(x) + " " + VT.f(y) + ')"').replace('<path d', '<path transform="translate(' + VT.f(x) + " " + VT.f(y) + ')" d'); }
    out += VT.line("M 1080 " + (G + 20) + " l 30 40 l -20 50 l 40 60", 5, VT.C.ink, 0.7);
    out += VT.baLoKhongLo({ x: 450, y: G + 4, s: 0.74, rot: -5 });
    return out;
  }
  var WX = 940, WS = 0.86;
  function W(o) {
    var b = { s: WS, x: WX, y: G, sunhat: "coi", noPack: true, t: o.t };
    for (var k in o) b[k] = o[k];
    if (b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.9, 0.6));
    return VT.wob(b);
  }
  shots.push({ a: SB, b: SC, ten: "xẻng nhựa gập như khăn giấy", ve: function (t, lt, T) {
    var out = lane(t), wk = { t0: SB, t1: T_BORROW + 0.7, x0: 1380, x1: WX, chuKy: 0.6, s: WS }, b = VT.buoc(t, wk);
    var o = { t: t, x: b.x, mouth: "content", flip: -1 };
    if (b.walking) { o.legs = "walk"; o.phase = b.phase; o.stride = b.stride; }
    var hand = [300, 250], spade = { fold: 0, square: 0 }, rot = 0, behind = false;
    if (t >= T_SPADE - 0.05 && t < T_GROUND) { hand = [330, 110]; o.mouth = "smile"; o.eyes = "happy"; }
    if (t >= T_GROUND && t < T_CEM + 0.1) { o.py = 14; o.px = 6; hand = [320, 230]; }
    if (t >= T_CEM + 0.1 && t < STRIKE) { hand = [300, 40]; rot = 0; o.mouth = "flat"; o.brows = "down"; }
    if (t >= STRIKE) { hand = [330, 250]; o.py = 14; o.px = 8; spade.fold = VT.ease.out(seg(t, STRIKE + 0.15, T_FOLD + 0.35)); o.eyes = t < T_FOLD ? "wide" : null; o.mouth = t < T_FOLD ? "o" : "flat"; o.lid = t >= T_FOLD ? 0.4 : 0; }
    if (t >= NEAT - 0.35) { hand = [250, 210]; o.armL = [150, 210]; o.handL = "nam"; spade.square = seg(t, NEAT - 0.35, NEAT); o.mouth = "content"; o.eyes = "happy"; o.lid = 0; o.py = 0; }
    if (t >= HIDE) { behind = true; o.armL = [60, 230]; o.mouth = "smirk"; o.eyes = null; o.px = -10; o.py = -6; }
    o.armR = behind ? [326, 262] : hand; o.handR = "nam";
    var hp = VT.wobPt({ s: WS, x: b.x, y: G, flip: -1 }, hand[0], hand[1]);
    var sp = behind ? "" : VT.xengNhua({ x: hp[0], y: hp[1] - 6, s: 0.8, rot: rot, fold: spade.fold, square: spade.square });
    if (behind) { var bp = VT.wobPt({ s: WS, x: b.x, y: G, flip: -1 }, 230, 200); sp = VT.xengNhua({ x: bp[0], y: bp[1] - 60, s: 0.6, square: 1 }); }
    out += (behind ? sp : "") + W(o) + (behind ? "" : sp);
    if (t >= STRIKE && t < STRIKE + 0.3) out += VT.knockLines({ x: hp[0], y: G, k: seg(t, STRIKE, STRIKE + 0.3), s: 1.2 });
    if (t >= NEAT && t < NEAT + 0.3) out += VT.puffBurst({ x: hp[0], y: hp[1] + 60, k: seg(t, NEAT, NEAT + 0.4), s: 0.35, spread: 50 });
    var cam = key(T, [[SB, [980, 640, 1.25]], [T_GROUND, [990, 660, 1.3], "sine"], [T_CEM, [960, 720, 1.42], "io3"], [T_FOLD, [900, 720, 1.6], "io3"], [SC, [900, 700, 1.64], "sine"]]);
    return { cam: cam, shake: VT.shake(t, STRIKE, 0.25, 7), world: out, tint: "warm" };
  } });
  shots.push({ a: SC, b: SD, ten: "quỳ bới khe đá bằng tay", ve: function (t, lt, T) {
    var out = lane(t), ph = Math.round(t * 12) % 2;
    var o = { t: t, legs: "tuck", y: G + 40 * WS, lean: 12, flip: -1, mouth: "flat", brows: "down", py: 16, px: 8 };
    o.armR = ph ? [330, 360] : [300, 300]; o.armL = ph ? [250, 300] : [280, 362]; o.handR = "xoe"; o.handL = "xoe";
    var bp = VT.wobPt({ s: WS, x: WX, y: G + 40 * WS, flip: -1, lean: 12 }, 50, 380);
    out = lane(t) + W(o);
    for (var i = 0; i < 3; i++) { var q = ((t - SC) * 1.6 + i / 3) % 1; out += VT.puff({ x: bp[0] - 60 + 220 * q, y: G - 30 - 160 * Math.sin(Math.PI * q), s: 0.25 + 0.2 * q, op: VT.f(0.9 * (1 - q)), fill: "#EFE6D6" }); out += VT.scrap({ x: bp[0] - 40 + 300 * q, y: G - 200 * Math.sin(Math.PI * q) - 20, s: 0.7, rot: q * 300 + i * 90 }); }
    var cam = key(T, [[SC, [900, 720, 1.7]], [SD, [900, 712, 1.78], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  shots.push({ a: SD, b: DUR, ten: "cúc áo, ướm, kéo mũ sụp", ve: function (t, lt, T) {
    var out = lane(t), WY = G + 40 * WS;
    var o = { t: t, legs: "tuck", y: WY, flip: -1, mouth: "content" };
    var hand = [310, 120], cuc = null;
    if (t < T_BUT - 0.03) { o.armR = [310, 120]; o.handR = "nam"; o.px = 12; o.py = -10; o.brows = "up"; o.eyes = "wide"; o.mouth = "oSmall"; hand = [310, 120]; }
    else if (t < T_SHAME - 0.05) { hand = [200, 262]; o.armR = [214, 262]; o.handR = "nam"; o.px = 4; o.py = 14; o.mouth = t < T_STRONG ? "smile" : "flat"; o.brows = t < T_STRONG ? "up" : "worried"; o.lid = t < T_STRONG ? 0 : 0.45; }
    else { var pk = VT.ease.out(seg(t, T_SHAME - 0.05, T_SHAME + 0.2)); hand = [300, 120]; o.armR = [300, VT.lerp(80, 128, pk)]; o.armL = [100, VT.lerp(80, 128, pk)]; o.handR = "nam"; o.handL = "nam"; o.sunhat = { mau: "coi", dy: 58 * pk }; o.eyes = "closed"; o.mouth = "wobbly"; }
    if (t < T_SHAME - 0.05) { var cp = VT.wobPt({ s: WS, x: WX, y: WY, flip: -1 }, hand[0], hand[1] - 18); cuc = VT.cucAo({ x: cp[0], y: cp[1], r: 15 }); }
    else { var cp2 = VT.wobPt({ s: WS, x: WX, y: WY, flip: -1 }, 300, 106 + 48 * VT.ease.out(seg(t, T_SHAME - 0.05, T_SHAME + 0.2))); cuc = VT.cucAo({ x: cp2[0], y: cp2[1] - 16, r: 15 }); }
    out += W(o) + cuc;
    var head = VT.wobPt({ s: WS, x: WX, y: WY }, 200, 180);
    var cam = key(T, [[SD, [head[0] - 20, head[1] - 10, 2.0]], [T_SHAME - 0.05, [head[0] - 20, head[1] - 10, 2.12], "sine"], [T_SHAME + 0.25, [head[0], head[1] - 4, 2.32], "out"], [DUR, [head[0], head[1] - 4, 2.36], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
