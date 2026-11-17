/* d05 · vẽ tay · gag trà đông (50,5–53,7 s tuyệt đối; 3,2 s). Vào "chen", ra "cat".
 * Cận Wob ôm cốc trà bốc hơi, nhấp một ngụm mãn nguyện; ở "The tea…" hơi trà đông cứng giữa không trung;
 * Wob chìa cốc ra dốc ngược, ở "up." khối trà tuột ra nguyên khối (kèm que hơi băng), lộn một vòng, rơi cạch xuống tuyết đứng thẳng như que kem.
 * Đồ Wob: mũ len đỏ, khăn đỏ, lông mi đóng băng. Không chữ (chu_tren_do_vat rỗng).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, GROUND = 930, WS = 0.9, WX = 880, CS = 0.8;
  var T_WARM = VT.tu("warm", 0), T_UP = VT.tu("up", 0), T_TEA2 = VT.tu("tea", 1), T_NOT = VT.tu("not", 0), T_UP2 = VT.tu("up", 1);
  var T_FREEZE = T_TEA2 - 0.02, T_FLIP0 = T_NOT + 0.04, T_FLIP1 = T_FLIP0 + 0.3, T_DROP = T_UP2 + 0.02;
  // khối trà rơi: g px/s², chạm đất khi đầu que hơi (hướng xuống) chạm mặt tuyết
  var G = 5200, HALF = 62 * CS * WS;

  VT.sfx("hoi-nuoc", 0.1, 0.45);
  VT.sfx("tach-bang", T_FREEZE, 0.7);
  VT.sfx("ting", T_DROP, 0.55);

  function bg(t) {
    return VT.sky() + VT.ridge(700, -80) + VT.farHouses(800, 60, t, 9) + VT.fog(t, 790, 2) +
      VT.house({ x: 300, y: GROUND - 40, w: 460, s: 0.95, t: t, seed: 7, icicles: true }) +
      VT.house({ x: 1640, y: GROUND - 40, w: 420, s: 0.9, t: t, seed: 8 }) + VT.snowGround(GROUND) +
      VT.diamondDust(t, 16, [0, 60, 1920, 860]);
  }
  // cốc trong hệ Wob: [x, y, góc]; gốc cốc ở đáy
  function cupPose(t) {
    return key(t, [[0, [300, 344, 0]], [T_WARM - 0.12, [300, 344, 0]], [T_WARM + 0.1, [236, 268, -20], "out"], [T_UP + 0.18, [240, 272, -20]],
      [T_UP + 0.42, [300, 344, 0], "io"], [T_FLIP0, [300, 344, 0]], [T_FLIP1, [430, 150, 180], "back"]]);
  }
  function rot(p, deg) { var a = deg * Math.PI / 180; return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)]; }
  var landT = null;
  function blockState(t, o) {
    // trả {x, y, land} của tâm khối (khung), khối lộn ngược (que hơi chĩa xuống)
    var cp = cupPose(T_DROP), c = VT.wobPt(o, cp[0], cp[1]), off = rot([0, -65 * CS], cp[2]);
    var x0 = c[0] + off[0] * WS, y0 = c[1] + off[1] * WS, dt = t - T_DROP, yLand = GROUND - HALF - 4;
    var y = y0 + 0.5 * G * dt * dt, tl = T_DROP + Math.sqrt(Math.max(0, 2 * (yLand - y0) / G));
    var k = VT.clamp(dt / Math.max(0.01, tl - T_DROP), 0, 1);
    return { x: x0 + 40 * k, y: Math.min(y, yLand), land: tl, rot: 180 + 180 * k }; // lộn một vòng, đáp xuống đứng thẳng
  }

  var shots = [];
  shots.push({ a: 0, b: D.thoi_luong, ten: "cận Wob ôm cốc trà: trà đông, dốc ra khối trà", ve: function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, t: t, beanie: true, scarf: true, cold: true, lashes: 1, lashIce: true, handL: "nam", handR: "nam" };
    var frozen = t >= T_FREEZE, dropped = t >= T_DROP;
    // biểu cảm
    if (t < T_WARM - 0.12) { o.eyes = "happy"; o.mouth = "content"; o.px = 6; }
    else if (t < T_UP + 0.42) { o.eyes = "closed"; o.mouth = "sip"; o.lean = -4; }
    else if (t < T_FREEZE) { o.eyes = "happy"; o.mouth = "smile"; o.sq = key(t, [[T_UP + 0.42, 1], [T_UP + 0.6, 1.04, "out"], [T_UP + 0.8, 1]]); }
    else if (t < T_FLIP0) { o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.px = 6; o.py = -10; o.sq = key(t, [[T_FREEZE, 1.08], [T_FREEZE + 0.2, 1, "out"]]); }
    else if (t < T_DROP + 0.1) { o.px = 8; o.py = -6; o.brows = "skeptic"; o.mouth = "flat"; o.legs = t > T_FLIP0 + 0.1 ? "tiptoe" : "stand"; }
    else if (t < T_DROP + 0.4) { o.px = 2; o.py = 14; o.brows = "up"; o.mouth = "oSmall"; o.eyes = "open"; }
    else { o.px = 0; o.py = 3; o.lid = 0.5; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; }
    if (!o.noBlink && o.eyes !== "closed" && o.eyes !== "happy") o.lid = Math.max(o.lid || 0, VT.blink(t, 2.9, 0.6));
    // cốc + hai tay cầm hai bên
    var cp = cupPose(t), cstate = dropped ? "empty" : frozen ? "frozen" : "hot";
    var shL = rot([-64 * CS, -70 * CS], cp[2]), shR = rot([64 * CS, -70 * CS], cp[2]);
    o.armL = [cp[0] + shL[0], cp[1] + shL[1]]; o.armR = [cp[0] + shR[0], cp[1] + shR[1]];
    if (t >= T_FLIP0 + 0.04) { o.armL = [56, 296]; o.handL = "tron"; } // lật cốc bằng một tay, tay trái buông
    var cupSvg = VT.cup({ x: cp[0], y: cp[1], s: CS, rot: cp[2], state: cstate, t: t, tFreeze: T_FREEZE, steam: !dropped });
    o.prop = cupSvg;
    var out = bg(t) + VT.wob(o);
    // khối trà tuột ra, rơi, đứng trên que hơi băng
    var shake = [0, 0];
    if (dropped) {
      var b = blockState(t, o), landed = t >= b.land;
      var blk = VT.g(VT.tr(b.x, b.y, CS * WS, b.rot), VT.steam({ x: 0, y: -60, t: t, frozen: 1, tFreeze: T_FREEZE, sparkle: false }) + VT.teaBlock({ x: 0, y: 0 }));
      out += blk;
      if (!landed) out += VT.speedLines({ x0: b.x - 70, y0: b.y - 120, n: 4, gap: 40, len: 60, dx: 0, dy: -1, sw: 5 });
      if (landed && t < b.land + 0.35) out += VT.puffBurst({ x: b.x, y: GROUND + 6, k: seg(t, b.land, b.land + 0.35), s: 0.7, spread: 90 });
      if (t >= T_DROP && t < T_DROP + 0.4) out += VT.sparkle({ x: b.x + 70, y: b.y - 40, s: 0.7 });
      shake = VT.shake(t, b.land, 0.2, 7);
    }
    if (frozen && t < T_FREEZE + 0.3) { // tách: tia toả quanh cột hơi đông
      var mouthC = VT.wobPt(o, cp[0], cp[1] - 130 * CS - 60);
      out += VT.radialLines(mouthC[0], mouthC[1], 70, 110, 10, 4, 6);
      shake = VT.shake(t, T_FREEZE, 0.2, 5);
    }
    // camera: cận mặt + cốc, nới ra khi lật cốc để thấy khối trà rơi xuống tuyết
    var cam = key(T, [[0, [930, 690, 2.05]], [T_FREEZE, [930, 680, 2.15], "sine"], [T_FLIP0, [930, 680, 2.15]], [T_FLIP1 + 0.1, [1000, 700, 1.55], "io3"]]);
    return { cam: cam, shake: shake, world: out, tint: "cold" };
  } });
  // bonk khi khối trà chạm đất: tính trước bằng cùng công thức rơi
  var o0 = { s: WS, x: WX, y: GROUND };
  var land = blockState(T_DROP, o0).land;
  if (land < D.thoi_luong) VT.sfx("bonk", land, 0.55);
  return shots;
};
