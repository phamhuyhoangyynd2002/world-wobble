/* d05 · vẽ tay · leo thang ba lần: đá, đá tự mãn, viên sỏi lấp lánh sau lưng (69,909–80,886 s; 10,977 s). Vào "cat", ra "cat".
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô xanh ô liu + cuộn thảm đỏ; xẻng nhỏ. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, G = 900, WS = 0.9, WX = 980;
  var T_ROCK = VT.tu("rock", 0), T_FAST = VT.tu("faster", 0), T_CONF = VT.tu("confident", 0), T_ROCK2 = VT.tu("rock", 1);
  var T_TOSS = VT.tu("tossed", 0), T_OVER = VT.tu("over", 0), T_SPK = VT.tu("sparkled", 0), T_DID = VT.tu("did", 0);
  var DUR = D.thoi_luong, S1 = VT.tu("I", 2), S2 = T_TOSS - 0.05, S3 = T_DID - 0.1;
  var PEB0 = T_OVER - 0.05, PEB1 = PEB0 + 0.75, SPK = T_SPK - 0.05;
  var MOUND = { x: 560, y: G, w: 520, h: 250, seed: 4 }, PEB_LAND = [600, G - 228];

  // nhát xẻng: lần 1 chậm (2 nhát), lần 2 nhanh (6 nhát), lần 3 tiếp tục đều sau khi ném
  var DIGS = [0.15, 0.6], i;
  for (i = 0; i < 6; i++) DIGS.push(T_FAST + 0.05 + i * 0.27);
  DIGS = DIGS.filter(function (d) { return d < T_CONF - 0.3; });
  for (i = 0; i < 12; i++) DIGS.push(PEB0 + 0.35 + i * 0.42);
  DIGS = DIGS.filter(function (d) { return d < DUR - 0.3; });
  DIGS.forEach(function (d) { VT.sfx("drop", d + 0.12, 0.35); });
  VT.sfx("pop", T_ROCK - 0.1, 0.6);
  VT.sfx("pop", T_CONF - 0.05, 0.7);
  VT.sfx("whoosh", PEB0, 0.3);
  VT.sfx("ting", SPK, 0.7);

  function digK(t) { // 0..1 trong một nhát gần nhất (0 = chuẩn bị, 0.4 = cắm, 1 = hất)
    for (var j = DIGS.length - 1; j >= 0; j--) if (t >= DIGS[j]) { var dur = j < 2 ? 0.42 : 0.26; return VT.clamp((t - DIGS[j]) / dur, 0, 1); }
    return 1;
  }
  function W(o) {
    var b = { s: WS, x: WX, y: G, sunhat: true, packColor: "oliu" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.7, 0.4));
    return VT.wob(b);
  }
  function digPose(t, o) { // tay + xẻng theo nhát
    var k = digK(t), ang = key(k, [[0, -20], [0.4, -62, "in2"], [1, -28, "out"]]);
    var h = key(k, [[0, [330, 236]], [0.4, [372, 318], "in2"], [1, [318, 214], "out"]]);
    o.armR = h; o.handR = "nam"; o.armL = [h[0] - 54, h[1] + 30]; o.handL = "nam"; o.lean = key(k, [[0, 6], [0.4, 14], [1, 4]]);
    o.prop = VT.shovel({ x: h[0], y: h[1], s: 0.9, rot: ang, dirt: k > 0.45 });
    return k;
  }
  function dirtFly(t) { // cục đất bay theo các nhát
    var out = "";
    DIGS.forEach(function (d, j) {
      var a = t - d - 0.12; if (a < 0 || a > 0.7) return;
      for (var n = 0; n < (j < 2 ? 2 : 4); n++) {
        var vx = 260 + 180 * VT.hash(j * 9 + n), vy = -620 - 260 * VT.hash(j * 3 + n * 7);
        out += VT.g(VT.tr(WX + 150 + vx * a, G - 80 + vy * a + 1500 * a * a, 0.5 + 0.4 * VT.hash(n + j), 0), VT.shape(VT.blob(20, j + n, 7, 0.5), VT.C.dirtShade, { sw: 4 }));
      }
    });
    return out;
  }
  function bg(t) {
    return VT.sky("#F7EED8", 0.9) + VT.mound({ x: -200, y: G, w: 700, h: 320, seed: 9 }) + VT.mound({ x: 1700, y: G, w: 620, h: 300, seed: 2 }) +
      VT.desertGround(G) + VT.mound(MOUND) + VT.mound({ x: WX + 300, y: G + 6, w: 260, h: 70, seed: 6 });
  }

  var shots = [];
  // 1. đào lần 1: hòn đá xám, Wob giơ lên
  shots.push({ a: 0, b: S1, ten: "lần 1: hòn đá", ve: function (t, lt, T) {
    var o = { t: t }, held = t >= T_ROCK - 0.12;
    if (!held) { digPose(t, o); o.mouth = "content"; o.eyes = "happy"; }
    else {
      o.armR = key(t, [[T_ROCK - 0.12, [330, 236]], [T_ROCK + 0.1, [296, 30], "back"]]); o.handR = "nam"; o.armL = [60, 300];
      o.prop = VT.rock({ x: o.armR[0], y: o.armR[1] - 46, s: 0.75, seed: 3 }); o.mouth = "smile"; o.brows = "up"; o.py = -10; o.px = 4;
      o.sq = key(t, [[T_ROCK - 0.12, 0.92], [T_ROCK + 0.15, 1.06, "out"], [T_ROCK + 0.35, 1]]);
    }
    var cam = key(T, [[0, [930, 700, 1.45]], [S1, [945, 690, 1.5], "sine"]]);
    return { cam: cam, world: bg(t) + W(o) + dirtFly(t), tint: "warm" };
  } });
  // 2. đào nhanh: đất bay; hòn đá to tự mãn bật ra, Wob cau mày
  shots.push({ a: S1, b: S2, ten: "lần 2: đá tự mãn", ve: function (t, lt, T) {
    var o = { t: t }, out = bg(t), popped = t >= T_CONF - 0.08;
    if (t < T_CONF - 0.08) { digPose(t, o); o.mouth = "chatter"; o.brows = "down"; o.eyes = "squint"; }
    else { o.armR = [330, 280]; o.armL = [80, 300]; o.prop = VT.shovel({ x: 330, y: 280, s: 0.9, rot: -40 }); o.brows = "skeptic"; o.mouth = "frown"; o.px = 12; o.py = 6; o.lean = -4; }
    out += W(o) + dirtFly(t);
    if (popped) {
      var k = seg(t, T_CONF - 0.08, T_CONF + 0.3), x = WX + 300, y = key(t, [[T_CONF - 0.08, G - 20], [T_CONF + 0.12, G - 260, "out"], [T_CONF + 0.32, G - 90, "in2"]]);
      out += VT.rock({ x: x, y: y, s: 1, r: 90, seed: 11, smug: t > T_CONF + 0.3, sx: -1 });
      if (k > 0.9 && t < T_CONF + 0.6) out += VT.puffBurst({ x: x, y: G - 10, k: seg(t, T_CONF + 0.3, T_CONF + 0.6), s: 0.6, spread: 70 });
    }
    var cam = key(T, [[S1, [1050, 690, 1.75]], [T_CONF, [1080, 700, 1.8], "sine"], [T_CONF + 0.15, [1110, 700, 1.95], "out"], [S2, [1120, 700, 1.98], "sine"]]);
    var sh = VT.shake(t, T_CONF + 0.3, 0.23, 6);
    return { cam: cam, shake: sh, world: out, tint: "warm" };
  } });
  // 3. ném viên sỏi qua vai, sau lưng nó lấp lánh
  shots.push({ a: S2, b: S3, ten: "ném sỏi qua vai, lấp lánh", ve: function (t, lt, T) {
    var o = { t: t }, out = bg(t);
    // đá tự mãn vẫn nằm đó bên phải
    out += VT.rock({ x: WX + 300, y: G - 90, s: 1, r: 90, seed: 11, smug: true, sx: -1 });
    var throwing = t >= PEB0 - 0.25 && t < PEB0 + 0.2;
    if (t < PEB0 - 0.25) { o.armR = [320, 300]; o.prop = VT.opal({ x: 320, y: 284, s: 1, dull: true }); o.armL = [90, 300]; o.mouth = "flat"; o.brows = "flat"; o.px = 10; o.py = 12; }
    else if (throwing) { o.armR = key(t, [[PEB0 - 0.25, [320, 300]], [PEB0, [250, 30], "in2"], [PEB0 + 0.2, [150, 20], "out"]]); o.armL = [90, 300]; o.mouth = "flat"; o.px = 10; o.py = 10; o.lean = -6;
      if (t < PEB0) o.prop = VT.opal({ x: o.armR[0], y: o.armR[1] - 16, dull: true }); }
    else digPose(t, o), o.mouth = "content", o.eyes = t > SPK - 0.1 ? "happy" : null;
    out += W(o);
    // viên sỏi bay qua vai ra sau lưng, rơi trên đống đất
    if (t >= PEB0 && t < PEB1) {
      var k = seg(t, PEB0, PEB1), p0 = VT.wobPt({ s: WS, x: WX, y: G, lean: -6 }, 250, 10);
      var px = VT.lerp(p0[0], PEB_LAND[0], k), py = VT.lerp(p0[1], PEB_LAND[1], k) - 260 * Math.sin(Math.PI * k);
      out += VT.opal({ x: px, y: py, dull: true, s: 1.2, rot: k * 400 }) + VT.arc([[p0[0], p0[1]], [VT.lerp(p0[0], px, 0.5), Math.min(p0[1], py) - 120 * Math.sin(Math.PI * k)], [px, py]], 4, 0.5);
    }
    if (t >= PEB1) {
      var g = t >= SPK ? 1 : 0;
      out += VT.opal({ x: PEB_LAND[0], y: PEB_LAND[1], s: 2.2, glow: g, t: t, dull: t < SPK });
      if (t >= SPK && t < SPK + 0.5) out += VT.sparkle({ x: PEB_LAND[0] + 90, y: PEB_LAND[1] - 100, s: 1.3 }) + VT.sparkle({ x: PEB_LAND[0] - 50, y: PEB_LAND[1] - 30, s: 0.5, fill: "#F2A1C8" });
    }
    out += dirtFly(t);
    var cam = key(T, [[S2, [820, 690, 1.15]], [PEB0, [800, 690, 1.18], "sine"], [SPK - 0.25, [740, 680, 1.22], "io"], [S3, [730, 680, 1.26], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 4. "I did not turn around." Wob vẫn cúi đào, ánh lấp lánh sau lưng tắt dần, giữ hình
  shots.push({ a: S3, b: DUR, ten: "không quay lại, giữ hình", ve: function (t, lt, T) {
    var o = { t: t }, out = bg(t);
    out += VT.rock({ x: WX + 300, y: G - 90, s: 1, r: 90, seed: 11, smug: true, sx: -1 });
    var fade = 1 - seg(t, S3 + 0.3, S3 + 1.5);
    out += VT.opal({ x: PEB_LAND[0], y: PEB_LAND[1], s: 2.2, glow: fade, t: t, dull: fade <= 0.02 });
    digPose(t, o); o.eyes = "closed"; o.mouth = "content"; o.noBlink = true;
    out += W(o) + dirtFly(t);
    var cam = key(T, [[S3, [800, 650, 1.32]], [DUR, [820, 650, 1.42], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
