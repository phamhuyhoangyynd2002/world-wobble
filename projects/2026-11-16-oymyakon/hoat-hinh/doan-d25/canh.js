/* d25 · vẽ tay · chợ: cá không cần túi, cả làng là tủ đông, vác cá về như tấm ván (422,73–435,03 s tuyệt đối; 12,3 s).
 * Vào "chen", ra "cat". Đồ Wob: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng; từ "I carried my fish home" vác cá trên vai trái như tấm ván.
 * Người bán chỉ là bàn tay đeo găng (không mặt). Không chữ (chu_tren_do_vat rỗng).
 * S1 chìa túi giấy, bong bóng hình túi, găng đưa cá · S2 cá chọc thủng đáy túi, túi rơi; găng dựng cá lên quầy
 * · S3 cá tự đứng trên quầy, mặt thanh thản · S4 cận mặt Wob, "!" · S5 lùi xa: cả làng trong tủ đông, cửa mở phả hơi lạnh
 * · S6 phố trưa: vác cá trên vai, quay người, đuôi cá suýt quét trúng cột đèn, Wob cúi né.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, GROUND = 800, WS = 0.62, SF = 0.6;
  var T_ASKED = VT.tu("asked"), T_NOT = VT.tu("not"), T_BAG2 = VT.tu("bag", 1), T_STAND = VT.tu("stand"), T_OWN = VT.tu("own");
  var T_CLICK = VT.tu("clicked"), T_VILLAGE = VT.tu("village"), T_FREEZER = VT.tu("freezer"), T_SHOULDER = VT.tu("shoulder"), T_PLANK = VT.tu("plank");
  var A2 = D.nhip[1].tai, A3 = D.nhip[2].tai, A4 = D.nhip[3].tai, A5 = D.nhip[4].tai, A6 = D.nhip[5].tai, END = D.thoi_luong;

  function W(t, o) {
    var b = { t: t, s: WS, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes !== "happy" && b.eyes !== "closed" && b.eyes !== "squint") b.lid = Math.max(b.lid || 0, VT.blink(t, 3.0, 0.8));
    return VT.wob(b);
  }
  function market(t) {
    return VT.sky("#CFE2EC", 1) + VT.ell(300, 330, 70, 70, "#FFF1C4", 6) + VT.ridge(560, 120, "#E3EEF3") + VT.farHouses(650, -200, t) + VT.fog(t, 640, 2) + VT.snowGround(GROUND) +
      VT.house({ x: 160, y: GROUND, w: 440, t: t, seed: 4, icicles: true }) + VT.barrel({ x: 560, y: GROUND + 10, s: 0.9 }) +
      VT.stall({ x: 1450, y: GROUND, goods: VT.fish({ x: 170, y: -26, s: 0.5, rot: 180 }) }) + VT.diamondDust(t, 12, [-200, 80, 2120, 760]);
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S1–S2 · chìa túi, găng đưa cá, cá xuyên đáy túi, túi rơi, găng dựng cá lên quầy =====
  var WX = 900, HAND = [400, 140], COUNTER = GROUND - 236, STANDX = 1290;
  var ARRIVE = A2 - 0.1, OVER = T_NOT - 0.1, PIERCE = T_NOT + 0.1, BAGOFF = PIERCE + 0.12, BAGLAND = BAGOFF + 0.32, PLACE0 = T_BAG2 + 0.1, PLACE1 = A3 - 0.25;
  VT.sfx("liu-lo-hoi", T_ASKED, 0.6);
  VT.sfx("pop", PIERCE, 0.8); VT.sfx("drop", BAGLAND, 0.45); VT.sfx("bonk", PLACE1, 0.45);
  var BAGTOP = VT.wobPt({ x: WX, y: GROUND, s: WS }, HAND[0], HAND[1]);
  function fishPose(t) { // [cx, cy, rot] của cá trong khung (rot -90: đầu lên, đuôi xuống)
    if (t < 0.25) return [2200, 470, 180];
    if (t < ARRIVE) { var k = VT.ease.out(seg(t, 0.25, ARRIVE)); return [VT.lerp(2200, 1260, k), 470, 180]; }
    if (t < OVER) { var k2 = VT.ease.io(seg(t, ARRIVE, OVER)); return [VT.lerp(1260, BAGTOP[0], k2), VT.lerp(470, BAGTOP[1] - 70, k2), VT.lerp(180, 270, k2)]; }
    if (t < PIERCE) return [BAGTOP[0], VT.lerp(BAGTOP[1] - 70, BAGTOP[1] + 6, VT.ease.in2(seg(t, OVER, PIERCE))), 270];
    if (t < PLACE0) return [BAGTOP[0], BAGTOP[1] + 6 - 10 * seg(t, PIERCE, PIERCE + 0.15), 270];
    var k3 = VT.ease.io(seg(t, PLACE0, PLACE1)), y1 = COUNTER - 102;
    return [VT.lerp(BAGTOP[0], STANDX, k3), VT.lerp(BAGTOP[1] - 4, y1, k3) - 90 * Math.sin(k3 * Math.PI), 270];
  }
  function stallScene(t) {
    var out = market(t), o = { x: WX, y: GROUND, s: WS, flip: 1 };
    var fp = fishPose(t), holdBag = t < BAGOFF;
    var raise = key(t, [[0, 0.3], [T_ASKED + 0.1, 1, "back"]]);
    if (holdBag) { o.armR = [VT.lerp(338, HAND[0], raise), VT.lerp(300, HAND[1], raise)]; o.handR = "nam"; }
    else o.armR = key(t, [[BAGOFF, HAND], [BAGOFF + 0.4, [340, 290], "io"]]);
    if (t < T_ASKED + 0.5) { o.eyes = "happy"; o.mouth = "smile"; }
    else if (t < OVER) { o.px = 12; o.py = -8; o.brows = "up"; o.mouth = "content"; }
    else if (t < PIERCE) { o.px = 10; o.py = 10; o.brows = "up"; o.mouth = "oSmall"; }
    else if (t < BAGLAND + 0.15) { o.eyes = "wide"; o.px = 2; o.py = 14; o.mouth = "o"; o.brows = "up"; o.sq = t < PIERCE + 0.2 ? 1.06 : 1; o.noBlink = true; }
    else { o.px = 12; o.py = -6; o.lid = 0.45; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; }
    out += W(t, o);
    // túi
    var bagTopW = holdBag ? VT.wobPt(o, o.armR[0], o.armR[1]) : BAGTOP, torn = t >= PIERCE;
    var bagY = holdBag ? bagTopW[1] + 104 : key(t, [[BAGOFF, bagTopW[1] + 104], [BAGLAND, GROUND + 18, "in2"]]);
    var bagRot = holdBag ? 0 : key(t, [[BAGOFF, 0], [BAGLAND, -64, "in2"]]);
    var bagSvg = VT.bag({ x: bagTopW[0], y: bagY, s: 0.7, torn: torn, tear: torn ? seg(t, PIERCE, PIERCE + 0.1) : 0, rot: bagRot });
    var fishSvg = VT.fish({ x: fp[0], y: fp[1], s: SF, rot: fp[2], eye: t >= PIERCE && t < PIERCE + 0.5 ? "wide" : t >= PLACE1 ? "serene" : "open" });
    out += (t < PIERCE ? fishSvg + bagSvg : bagSvg + fishSvg);
    // găng tay người bán: nắm đuôi trên (khi cá dựng) hoặc thân cá
    if (t < PLACE1 + 0.5) {
      var r = fp[2] * Math.PI / 180, grip = [fp[0] - Math.cos(r) * 110 * SF, fp[1] - Math.sin(r) * 110 * SF];
      if (fp[2] > 200) grip = [fp[0] + 40, fp[1] - 50]; // nắm gần đầu khi cá dựng đứng
      var gRot = fp[2] > 200 ? -20 : -8, op = seg(t, PLACE1 - 0.05, PLACE1 + 0.08);
      var away = VT.ease.in2(seg(t, PLACE1 + 0.08, PLACE1 + 0.5));
      out += VT.glove({ x: VT.lerp(grip[0], 2300, away), y: VT.lerp(grip[1], 200, away), s: 0.62, rot: gRot, open: op });
    }
    if (t >= T_ASKED && t < OVER - 0.2) { var bp = VT.wobPt(o, 40, 10); out += VT.bubble({ x: bp[0] - 40, y: bp[1] - 60, s: key(t, [[T_ASKED, 0.12], [T_ASKED + 0.15, 0.4, "back"]]), sym: "bag", tail: 1 }); }
    if (t >= PIERCE && t < PIERCE + 0.25) out += VT.impact({ x: bagTopW[0], y: bagTopW[1] + 104, s: 0.45 });
    if (t >= BAGLAND && t < BAGLAND + 0.3) out += VT.puffBurst({ x: bagTopW[0] - 20, y: GROUND + 14, k: seg(t, BAGLAND, BAGLAND + 0.3), s: 0.45 });
    if (t >= PLACE1 && t < PLACE1 + 0.25) out += VT.knockLines({ x: STANDX, y: COUNTER - 4, s: 0.6, k: seg(t, PLACE1, PLACE1 + 0.25) });
    return out;
  }
  shot(0, A2, "chìa túi, găng đưa cá", function (t, lt, T) {
    return { cam: [key(T, [[0, 1130], [A2, 1110]]), 600, key(T, [[0, 1.5], [A2, 1.56, "sine"]])], world: stallScene(t), tint: "cold" };
  });
  shot(A2, A3, "cá xuyên túi, túi rơi", function (t, lt, T) {
    var z = key(T, [[A2, 1.75], [A3, 1.82, "sine"]]);
    return { cam: [key(T, [[A2, 1060], [PLACE0, 1060], [A3, 1140, "io"]]), 620, z], shake: VT.shakes(t, [[PIERCE, 0.2, 7], [PLACE1, 0.12, 4]]), world: stallScene(t), tint: "cold" };
  });

  // ===== S3 · cá tự đứng trên quầy, thanh thản; Wob ghé nhìn =====
  VT.sfx("ting", T_OWN + 0.05, 0.55);
  shot(A3, A4, "cá tự đứng", function (t, lt, T) {
    var out = market(t);
    var o = { x: 1040, y: GROUND, s: WS, flip: 1, px: 12, py: -6, brows: "up", mouth: "oSmall", lean: key(t, [[A3, 0], [T_STAND, 8, "io"]]) };
    if (t >= T_OWN) { o.brows = "skeptic"; o.mouth = "flat"; o.lean = 4; }
    out += W(t, o);
    var wob = t >= T_STAND && t < T_STAND + 0.6 ? Math.sin((t - T_STAND) * 30) * 4 * (1 - seg(t, T_STAND, T_STAND + 0.6)) : 0;
    out += VT.fish({ x: STANDX, y: COUNTER - 102, s: SF, rot: 270 + wob, eye: "serene" });
    var over = "";
    if (t >= T_OWN) { var kk = Math.floor(t * 6) % 3; [[1500, 300], [520, 280], [1460, 760], [640, 820]].forEach(function (p, j) { over += VT.sparkle({ x: p[0], y: p[1], s: (j + kk) % 3 === 0 ? 1.0 : 0.6 }); }); }
    var z = key(T, [[A3, 2.3], [A4, 2.45, "sine"]]);
    return { cam: [1210, 500, z], world: out, over: over, tint: "cold" };
  });

  // ===== S4 · cận mặt Wob: "!" =====
  var CL = T_CLICK - 0.03;
  VT.sfx("ting", CL, 0.45);
  shot(A4, A5, "bừng hiểu", function (t, lt, T) {
    var out = market(t) + VT.fish({ x: STANDX, y: COUNTER - 102, s: SF, rot: 270, eye: "serene" });
    var o = { x: 1040, y: GROUND, s: WS, flip: 1, px: 10, py: -4, brows: "flat", mouth: "flat", lid: 0.3 };
    if (t >= CL) { o.eyes = "wide"; o.px = 0; o.py = -6; o.brows = "up"; o.mouth = "o"; o.lid = 0; o.noBlink = true; o.sq = key(t, [[CL, 1.12], [CL + 0.3, 1, "elastic"]]); }
    out += W(t, o);
    if (t >= CL) { var hp = VT.wobPt(o, 200, -40); out += VT.glyph({ x: hp[0], y: hp[1] - 20, s: key(t, [[CL, 0.2], [CL + 0.15, 0.85, "back"]]) * 0.9, sym: "!" }) + VT.radialLines(hp[0], hp[1] + 120, 150, 210, 12, 2, 5); }
    var face = VT.wobPt({ x: 1040, y: GROUND, s: WS }, 200, 150);
    var z = key(T, [[A4, 2.5], [CL, 2.6], [CL + 0.12, 2.85, "out"], [A5, 2.9]]);
    return { cam: [face[0] + 40, face[1] - 30, z], shake: VT.shake(t, CL, 0.15, 4), world: out, tint: "cold" };
  });

  // ===== S5 · lùi xa: cả làng trong một tủ đông, cửa mở phả hơi lạnh =====
  VT.sfx("whoosh", A5 + 0.05, 0.35);
  VT.sfx("drop", T_FREEZER + 0.02, 0.8);
  shot(A5, A6, "cả làng là tủ đông", function (t, lt, T) {
    var z = key(T, [[A5, 2.7], [T_VILLAGE + 0.5, 1.0, "io3"], [A6, 0.97]]), cx = key(T, [[A5, 920], [T_VILLAGE + 0.5, 960, "io3"]]), cy = key(T, [[A5, 790], [T_VILLAGE + 0.5, 545, "io3"]]);
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#cfe0e8"/>';
    var tiny = VT.wob({ t: t, x: 920, y: 868, s: 0.1, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, px: 6, py: -10, brows: "up", mouth: t > T_FREEZER - 0.3 ? "o" : "X", lean: Math.sin(t * 6) * 4 });
    s += VT.freezer({ part: "body", t: t, contents: (function () {
      var c = "";
      [[430, 0.3], [600, 0.26], [780, 0.32], [1320, 0.26], [1480, 0.29]].forEach(function (h, i) { c += VT.house({ x: h[0], y: 860, s: h[1], smokeTop: -1900, t: t, seed: i, faint: true }); });
      return c + VT.stall({ x: 1150, y: 868, s: 0.16, icicles: false }) + VT.fish({ x: 1150 + 30, y: 868 - 38 - 16, s: 0.1, rot: 270 }) + tiny + VT.diamondDust(t, 14, [380, 240, 1540, 800]);
    })() });
    var bump = t >= T_FREEZER ? key(t, [[T_FREEZER, 0.12], [T_FREEZER + 0.4, 0, "out"]]) : 0;
    s += VT.freezer({ part: "door", close: -bump });
    // hơi lạnh phả ra từ mép cửa, cuộn xuống sàn
    for (var i = 0; i < 6; i++) {
      var ph = ((t * 0.9 + i / 6) % 1), boost = t >= T_FREEZER ? 1.4 : 1;
      s += VT.puff({ x: 1690 + 40 + ph * 260 * boost, y: 300 + i * 120 + ph * 80, s: (0.6 + ph * 1.2) * boost, op: 0.85 * (1 - ph) });
    }
    return { cam: [cx, cy, z], shake: VT.shake(t, T_FREEZER, 0.3, 10), world: s, tint: "cold" };
  });

  // ===== S6 · phố trưa: vác cá như tấm ván, quay người, đuôi cá suýt trúng cột đèn, cúi né =====
  var G6 = 840, WS6 = 0.8, FS = 0.95, LX = 1260, STOP = T_SHOULDER - 0.15, TURN0 = STOP + 0.05, TURN1 = TURN0 + 0.24, DUCK = TURN1 + 0.02;
  var WK = { t0: A6 + 0.05, t1: STOP, x0: 500, x1: LX - 285, chuKy: 0.74, s: WS6 };
  var LSH = [138, 70, 8]; // cá trên vai trái (hệ Wob): tâm, góc
  VT.buoc(A6, WK).steps.forEach(function (st) { if (st.t < END) VT.sfx("buoc-tuyet", st.t, 0.4); });
  VT.sfx("whoosh", TURN0 + 0.06, 0.6);
  VT.sfx("liu-lo-soc", DUCK + 0.05, 0.5);
  function lamppost(x, y) {
    return VT.line("M " + x + " " + y + " L " + x + " " + (y - 520) + " Q " + x + " " + (y - 560) + " " + (x - 50) + " " + (y - 560) + " L " + (x - 90) + " " + (y - 560), 16) +
      VT.line("M " + x + " " + y + " L " + x + " " + (y - 520), 7, "#7d8a91") + VT.shape("M " + (x - 130) + " " + (y - 566) + " L " + (x - 60) + " " + (y - 566) + " L " + (x - 70) + " " + (y - 536) + " L " + (x - 120) + " " + (y - 536) + " Z", "#3a4250", { sw: 5 }) +
      VT.shape("M " + (x - 40) + " " + y + " L " + (x + 40) + " " + y + " L " + (x + 24) + " " + (y - 40) + " L " + (x - 24) + " " + (y - 40) + " Z", "#5d6a72", { sw: 5 }) + VT.line("M " + (x - 8) + " " + (y - 500) + " L " + (x - 8) + " " + (y - 380), 4, "#ffffff", 0.7);
  }
  shot(A6, END, "vác cá về, suýt trúng cột đèn", function (t, lt, T) {
    var s = VT.sky("#CFE2EC", 1) + VT.ridge(620, 0, "#E3EEF3") + VT.farHouses(700, 100, t, 9) + VT.snowGround(G6);
    s += VT.house({ x: 260, y: G6, w: 420, t: t, seed: 6, icicles: true }) + VT.house({ x: 1720, y: G6, w: 400, t: t, seed: 9 });
    s += lamppost(LX, G6 + 6);
    var wk = VT.buoc(t, WK), turnK = seg(t, TURN0, TURN1);
    var fl = t < TURN0 ? 1 : t >= TURN1 ? -1 : (Math.cos(turnK * Math.PI) >= 0 ? 1 : -1) * Math.max(0.28, Math.abs(Math.cos(turnK * Math.PI)));
    var o = { x: wk.x, y: G6, s: WS6, flip: fl, armL: [96, 96], handL: "nam" };
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; o.lid = 0.3; o.px = 6; o.mouth = "content"; }
    else if (t < TURN1) { o.px = -10; o.py = 0; o.mouth = "flat"; o.brows = "flat"; }
    else if (t < T_PLANK - 0.1) { o.eyes = t < DUCK + 0.35 ? "squint" : "open"; o.px = 12; o.py = -10; o.brows = "worried"; o.mouth = "G"; o.sq = key(t, [[DUCK, 1], [DUCK + 0.1, 0.8, "out"], [T_PLANK - 0.2, 0.84]]); o.legs = "apart"; o.noBlink = true; }
    else { o.sq = key(t, [[T_PLANK - 0.1, 0.84], [T_PLANK + 0.2, 1, "back"]]); o.px = 14; o.py = -8; o.lid = 0.5; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; }
    var rock = wk.walking ? 3 * Math.sin(wk.phase * 2 * Math.PI) : 0;
    o.propBack = VT.fish({ x: LSH[0], y: LSH[1], s: FS / WS6, rot: LSH[2] + rock, eye: "serene" });
    s += W(t, o);
    // vệt quét của cá khi quay + suýt chạm cột đèn
    if (t >= TURN0 && t < TURN1 + 0.25) {
      var c = VT.wobPt({ x: wk.x, y: G6, s: WS6 }, 200, 70);
      s += VT.arc([[c[0] + 220, c[1] + 10], [c[0] + 60, c[1] + 50], [c[0] - 120, c[1] + 30], [c[0] - 230, c[1] - 6]], 6, 0.7);
      s += VT.speedLines({ x0: LX - 60, y0: c[1] - 50, n: 3, gap: 40, len: 60, dx: -1, dy: 0, sw: 5 });
    }
    if (t >= TURN1 && t < TURN1 + 0.5) s += VT.radialLines(LX - 2, VT.wobPt({ x: wk.x, y: G6, s: WS6 }, 200, 70)[1], 70, 130, 8, 5, 5);
    var camX = key(T, [[A6, 760], [STOP, LX - 300, "io"]]);
    var z = key(T, [[A6, 1.25], [STOP, 1.3], [TURN1, 1.55, "out"], [END, 1.62, "sine"]]);
    var cy = key(T, [[A6, 640], [TURN1, 620, "out"]]);
    return { cam: [camX, cy, z], shake: VT.shake(t, TURN1, 0.18, 5), world: s, tint: "cold" };
  });
  return shots;
};
