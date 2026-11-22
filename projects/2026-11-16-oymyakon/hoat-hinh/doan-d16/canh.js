/* d16 · vẽ tay · đứng chính giữa hai làng, trượt ngã, câu hỏi hay hơn, vòng Bắc Cực (285,08–306,11 s tuyệt đối; 21,03 s). Vào "chen", ra "cat".
 * S0 đường băng giữa hai tấm biển (biểu tượng thay chữ: đài tưởng niệm / nhiệt kế): Wob nhích từng chút cho đúng giữa, dang tay chỉ hai làng.
 * S1 trượt chân, xoay ba vòng (smear), ngã ngửa, ba lô làm gối. S2–S3 nằm nhìn trời; bong bóng ? mọc rồi phồng to.
 * S4 trang sổ: quả địa cầu phác tay (chỉ lưới kinh vĩ, không lục địa), Wob kẻ vòng nét đứt "Arctic Circle", chấm làng nằm dưới vòng,
 *   mũi tên nhỏ chỉ khoảng hở (vĩ độ làng ≈ 63,5° B, vòng Bắc Cực ≈ 66,6° B: vài độ về phía nam).
 * S5 ngáp ở "boring", mắt sáng rực ở "brilliant".
 * Đồ Wob: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng. Chữ: chỉ "Arctic Circle".
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, DUR = D.thoi_luong;
  var T_EXACTLY = VT.tu("exactly"), T_HALF = VT.tu("halfway", 0), T_BOTH = VT.tu("both");
  var T_HALF2 = VT.tu("halfway", 1), T_TURNED = VT.tu("turned"), T_FROZEN = VT.tu("frozen"), T_ROAD = VT.tu("road", 0, "end");
  var T_LYING = VT.tu("lying"), T_QUESTION = VT.tu("question"), T_WHY = VT.tu("why"), T_ALL = VT.tu("all", 0, "end");
  var T_OYM = VT.tu("oymyakon"), T_ARCTIC = VT.tu("arctic"), T_CIRCLE = VT.tu("circle", 0, "end");
  var T_SITS = VT.tu("sits"), T_DEGREES = VT.tu("degrees"), T_SOUTH = VT.tu("south"), T_REASON = VT.tu("reason"), T_BORING = VT.tu("boring"), T_BRILL = VT.tu("brilliant");

  function W(t, o) {
    var b = { t: t, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && (b.eyes || "open") === "open") b.lid = Math.max(b.lid || 0, VT.blink(t, 3.2, 0.4));
    return VT.wob(b);
  }
  // ---------- đường băng giữa hai làng ----------
  var ROAD = 840, WS = 0.62, MID = 960, LX = MID - 160; // LX: chỗ Wob nằm, tâm cách cột nhiệt kế (x = 1110) 310 px, đỉnh mũ cách cột ~160 px
  function iceRoad(t) {
    var s = VT.sky("#CFE2EC", 1) + VT.ridge(620, -60, "#E6EEF2") + VT.ridge(700, 380, "#EEF4F7");
    s += VT.snowGround(760);
    s += VT.shape("M -1200 770 C 0 760 1900 778 3200 766 L 3200 920 C 1900 930 0 914 -1200 924 Z", "#BFE3F2", { sw: 6, ox: 0, oy: 4 });
    [[100, 800, 260], [700, 860, 180], [1250, 812, 300], [1800, 870, 200], [-500, 850, 260]].forEach(function (h) { s += VT.line("M " + h[0] + " " + h[1] + " l " + h[2] + " -6", 7, "#ffffff", 0.85); });
    s += VT.signTiny({ x: 280, y: ROAD - 60, s: 0.9, w: 450, icon: "slab", text: "OYMYAKON", size: 46 }) + VT.signTiny({ x: 1660, y: ROAD - 60, s: 0.9, w: 360, icon: "thermo", text: "TOMTOR", size: 46 });
    s += VT.line("M 1110 " + (ROAD - 60) + " L 1110 " + (ROAD - 200), 8) + VT.thermoMini({ x: 1110, y: ROAD - 196, s: 0.5, level: 0.1, color: C.iceDeep });
    s += VT.diamondDust(t, 10, [-200, 120, 2200, 470]);
    return s;
  }
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · nhích cho đúng giữa, dang tay chỉ hai làng =====
  var B0 = T_HALF2 - 0.06;
  var NUDGE = [[0, MID - 60], [T_EXACTLY - 0.2, MID - 60], [T_EXACTLY, MID + 18, "out"], [T_EXACTLY + 0.3, MID + 18], [T_HALF - 0.1, MID - 4, "out"], [T_HALF + 0.1, MID]];
  VT.sfx("buoc-tuyet", T_EXACTLY, 0.3); VT.sfx("buoc-tuyet", T_HALF - 0.1, 0.3); VT.sfx("ting", T_HALF + 0.12, 0.35);
  shot(0, B0, "đứng đúng chính giữa", function (t, lt, T) {
    var o = { s: WS, x: key(t, NUDGE), y: ROAD, flip: 1 };
    if (t < T_HALF + 0.1) { o.legs = "tiptoe"; o.px = (t < T_EXACTLY ? -12 : 12); o.py = 10; o.brows = "skeptic"; o.mouth = "flat"; o.armL = [40, 230]; o.armR = [360, 230]; o.handL = "xoe"; o.handR = "xoe"; }
    else { o.armL = [-4, 170]; o.armR = [404, 170]; o.handL = "chi"; o.handR = "chi"; o.eyes = "happy"; o.mouth = "smile"; o.legs = "apart"; o.sq = key(t, [[T_HALF + 0.1, 0.9], [T_HALF + 0.35, 1.04, "out"], [T_HALF + 0.6, 1]]); }
    var out = iceRoad(t) + W(t, o);
    if (t >= T_BOTH && t < T_BOTH + 0.6) { out += VT.sparkle({ x: 250, y: ROAD - 260, s: 0.4 }) + VT.sparkle({ x: 1680, y: ROAD - 260, s: 0.4 }); }
    var z = key(T, [[0, 1.02], [B0, 1.12, "sine"]]);
    return { cam: [960, 560, z], world: out, tint: "cold" };
  });

  // ===== S1 · trượt chân, xoay ba vòng, ngã ngửa (ba lô làm gối) =====
  var B1 = T_ROAD + 0.12, T_SLIP = T_TURNED, T_SPIN0 = T_SLIP + 0.18, T_LAND = T_FROZEN + 0.02;
  VT.sfx("boing", T_SLIP, 0.6); VT.sfx("whoosh", T_SPIN0, 0.35); VT.sfx("bonk", T_LAND, 0.8);
  function fallPose(t) { // trả {cx, cy, rot, o}
    var o = { s: WS, flip: 1, legs: "tuck", eyes: "wide", mouth: "o", brows: "up", arms: "shock", noBlink: true };
    var sp = seg(t, T_SPIN0, T_LAND), rot = 0, cx = MID, cy = ROAD - 212 * WS;
    if (t < T_SPIN0) { var u = seg(t, T_SLIP, T_SPIN0); o.legs = "apart"; o.lean = -14 * u; rot = 0; cx = MID - 20 * u; }
    else { rot = 1170 * VT.ease.out2(sp); cx = MID - 20 - 70 * sp; cy = ROAD - 212 * WS - 150 * Math.sin(sp * Math.PI) + (ROAD - 80 - (ROAD - 212 * WS)) * sp; if (sp < 0.75) o.smear = 60; }
    if (t >= T_LAND) { rot = 90 + key(t, [[T_LAND, 10], [T_LAND + 0.5, 0, "elastic"]]); cx = LX; cy = ROAD - 80; o.eyes = "cross"; o.mouth = "wobbly"; o.arms = "rest"; o.legs = "stand"; o.smear = 0; }
    return { cx: cx, cy: cy, rot: rot, o: o };
  }
  function wobAt(t, P) { // Wob vẽ quanh tâm thân (cx, cy), xoay rot
    var o = P.o; o.x = 0; o.y = 212 * WS;
    return VT.g("translate(" + f(P.cx) + " " + f(P.cy) + ") rotate(" + f(P.rot) + ")", W(t, o));
  }
  shot(B0, B1, "trượt, xoay, ngã", function (t, lt, T) {
    var P = fallPose(t), out = iceRoad(t) + wobAt(t, P);
    if (t >= T_SLIP && t < T_SPIN0 + 0.2) out += VT.speedLines({ x0: MID - 120, y0: ROAD - 20, n: 3, gap: 14, len: 90, dx: -1, dy: 0, sw: 5 });
    if (t >= T_SPIN0 && t < T_LAND) out += VT.arc([[MID, ROAD - 140], [MID - 50, ROAD - 300], [LX, ROAD - 120]], 5, 0.5);
    if (t >= T_LAND && t < T_LAND + 0.35) out += VT.puffBurst({ x: LX, y: ROAD - 20, k: seg(t, T_LAND, T_LAND + 0.35), s: 0.7, spread: 120 });
    if (t >= T_LAND) out += VT.dizzy({ x: LX + 100, y: ROAD - 130, s: 0.55, t: t });
    var z = key(T, [[B0, 1.3], [T_SPIN0, 1.38], [B1, 1.5, "sine"]]);
    return { cam: [MID - 40, key(T, [[B0, 660], [B1, 700]]), z], shake: VT.shake(t, T_LAND, 0.25, 12), world: out, tint: "cold" };
  });

  // ===== S2 · nằm giữa đường băng nhìn trời, giữ hình =====
  var B2 = T_LYING + 1.2;
  function lying(t, o2) {
    var o = { s: WS, flip: 1, legs: "stand", px: -13, py: 0, mouth: "flat", lid: 0.35 };
    for (var k in o2) o[k] = o2[k];
    return wobAt(t, { cx: LX, cy: ROAD - 80, rot: 90, o: o });
  }
  shot(B1, B2, "nằm nhìn trời", function (t, lt, T) {
    var out = iceRoad(t) + lying(t, { lid: 0.35 + 0.6 * VT.slowBlink(t, T_LYING - 0.6, 0.45), noBlink: true });
    if (t < B1 + 1.2) out += VT.dizzy({ x: LX + 100, y: ROAD - 130, s: 0.55 * (1 - seg(t, B1, B1 + 1.2)), t: t });
    var z = key(T, [[B1, 1.7], [B2, 1.85, "sine"]]);
    return { cam: [LX + 20, ROAD - 110, z], world: out, tint: "cold" };
  });
  // ===== S3 · cận: bong bóng ? mọc ở "question", phồng to ở "Why … at all?" =====
  var B3 = T_OYM - 0.12;
  VT.sfx("pop", T_QUESTION + 0.05, 0.5); VT.sfx("pop", T_WHY + 0.05, 0.35);
  shot(B2, B3, "bong bóng ? phồng to", function (t, lt, T) {
    var out = iceRoad(t) + lying(t, { px: t > T_WHY ? -13 : -10, py: t > T_WHY ? -6 : 0, brows: t > T_QUESTION ? "up" : "flat", lid: t > T_WHY ? 0 : 0.3, eyes: "open", mouth: t > T_WHY ? "oSmall" : "flat" });
    if (t >= T_QUESTION) {
      var bs = key(t, [[T_QUESTION, 0.1], [T_QUESTION + 0.15, 0.4, "back"], [T_WHY, 0.42], [T_WHY + 0.3, 0.72, "back"], [T_ALL, 0.78]]);
      out += VT.bubble({ x: LX - 30, y: ROAD - 330 - 60 * seg(t, T_WHY, T_WHY + 0.3), s: bs, sym: "?", tail: -1 }); // đuôi chĩa vào đầu Wob (đầu ở bên phải thân khi nằm)
    }
    var z = key(T, [[B2, 1.6], [T_WHY, 1.5], [B3, 1.4, "sine"]]);
    return { cam: [LX + 10, key(T, [[B2, 640], [B3, 600]]), z], world: out, tint: "cold" };
  });

  // ===== S4 · trang sổ: quả địa cầu, chấm làng, vòng nét đứt "Arctic Circle", mũi tên khoảng hở =====
  var G = { x: 800, y: 600, r: 440, lat0: 64 }, LAT_AC = 66.56, LAT_OYM = 63.46;
  var DOT = VT.globePt(G, LAT_OYM, 0), ACF = VT.globePt(G, LAT_AC, 0), LBL = VT.globePt(G, LAT_AC, 75);
  var C0 = T_ARCTIC - 0.15, C1 = T_CIRCLE + 0.1, L0 = T_CIRCLE - 0.2, L1 = T_CIRCLE + 0.7, AR0 = T_DEGREES - 0.1, AR1 = T_SOUTH + 0.1;
  var WP = [1440, 730];
  VT.sfx("pop", T_OYM + 0.05, 0.5); VT.sfx("ting", T_SOUTH + 0.05, 0.4);
  function pageBase() {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#6E4B32"/>';
    s += VT.shape("M 40 30 L 1880 30 L 1880 1060 L 40 1060 Z", "#FBF6E9", { sw: 7, ox: 10, oy: 8 });
    for (var y = 110; y < 1050; y += 56) s += VT.line("M 60 " + y + " L 1860 " + y, 2.5, "#9cc8dc", 0.45);
    for (var x = 120; x < 1840; x += 120) s += VT.ell(x, 58, 12, 8, "#6E4B32", 4);
    return s;
  }
  function globeScene(t, noWob) {
    var kC = seg(t, C0, C1);
    var s = pageBase() + VT.globe({ x: G.x, y: G.y, r: G.r, lat0: G.lat0, lats: [0, 30], meridians: 8, dashed: { lat: LAT_AC, k: kC } });
    if (t >= T_OYM) { var dk = VT.ease.back(seg(t, T_OYM, T_OYM + 0.2)); s += VT.dot(DOT[0], DOT[1], 13 * dk, C.accent2) + VT.ell(DOT[0], DOT[1], 13 * dk, 13 * dk, "none", 4); }
    s += VT.textWrite(LBL[0] + 40, LBL[1] - 30, "Arctic Circle", 58, seg(t, L0, L1), { w: 800, fill: "#A8361F", anchor: "start" });
    var ka = seg(t, AR0, AR1);
    if (ka > 0) { // mũi tên hai đầu nhỏ giữa chấm làng và vòng
      // đường gióng kiểu bản vẽ kỹ thuật: hai vạch ngang (vĩ độ làng, vĩ độ vòng) + mũi tên hai đầu giữa chúng
      var ax = DOT[0] + 120, y0 = DOT[1], y1 = ACF[1];
      s += VT.lineDraw("M " + f(DOT[0] + 16) + " " + f(y0) + " L " + f(ax + 26) + " " + f(y0), ka, 3.5, C.ink);
      s += VT.lineDraw("M " + f(ACF[0] + 6) + " " + f(y1) + " L " + f(ax + 26) + " " + f(y1), ka, 3.5, C.accent2);
      if (ka >= 1) s += VT.line("M " + f(ax) + " " + f(y0 - 3) + " L " + f(ax) + " " + f(y1 + 3), 4) + VT.line("M " + f(ax - 5) + " " + f(y1 + 7) + " L " + f(ax) + " " + f(y1 + 1) + " L " + f(ax + 5) + " " + f(y1 + 7), 3.5) + VT.line("M " + f(ax - 5) + " " + f(y0 - 7) + " L " + f(ax) + " " + f(y0 - 1) + " L " + f(ax + 5) + " " + f(y0 - 7), 3.5);
    }
    // Wob: chỉ chấm làng, kẻ vòng bằng bút chì to, lắc đầu ở "isn't even inside"
    var o = { s: 0.66, x: WP[0], y: WP[1], flip: 1, px: -12, py: -10, mouth: "content" }, pen = "";
    if (t >= T_OYM - 0.1 && t < C0) { o.armL = [0, 160]; o.handL = "chi"; o.mouth = "flat"; if (t > T_OYM + 0.6) { o.flip = Math.round(t * 5) % 2 ? 1 : -1; o.brows = "skeptic"; } }
    var tip = null;
    if (t >= C0 && t < C1) tip = VT.globePt(G, LAT_AC, -180 + 360 * kC).slice(0, 2);
    else if (t >= L0 && t < L1) tip = VT.textTip(LBL[0] + 40, LBL[1] - 30, "Arctic Circle", 58, seg(t, L0, L1), "start");
    if (tip) { o.armL = [44, 150]; o.handL = "nam"; pen = VT.pencilTo(VT.wobPt(o, 44, 150), tip, { s: 0.85 }); o.mouth = "content"; o.lean = -4; }
    if (t >= AR1) { o.px = -12; o.py = -6; o.brows = "up"; o.mouth = "oSmall"; }
    if (!noWob) s += W(t, o) + pen;
    return s;
  }
  var B4 = T_REASON - 0.2;
  var CAMG = [[B3, [960, 560, 1.0]], [C0, [1010, 470, 1.2], "io3"], [L1, [1020, 460, 1.24]], [AR0, [DOT[0] + 70, DOT[1] - 12, 2.7], "io3"], [B4, [DOT[0] + 70, DOT[1] - 12, 2.82]]];
  shot(B3, B4, "địa cầu, vòng Bắc Cực", function (t, lt, T) { return { cam: key(T, CAMG), world: globeScene(t), tint: null }; });

  // ===== S5 · ngáp ở "boring", mắt sáng rực ở "brilliant"; giữ hình =====
  var T_YAWN = T_BORING - 0.05, T_SPARK = T_BRILL - 0.03;
  VT.sfx("ting", T_SPARK, 0.6);
  shot(B4, DUR, "ngáp → mắt sáng rực", function (t, lt, T) {
    var o = { s: 0.66, x: WP[0], y: WP[1], flip: 1, px: 0, py: 2, mouth: "flat", lid: 0.3 };
    if (t >= T_YAWN && t < T_SPARK - 0.05) { o.eyes = "closed"; o.mouth = "o"; o.arms = "up"; o.handL = "nam"; o.handR = "nam"; o.sq = key(t, [[T_YAWN, 1], [T_YAWN + 0.3, 1.1, "out"], [T_SPARK - 0.1, 1.06]]); o.lean = -4; }
    if (t >= T_SPARK - 0.05) { o.eyes = "wide"; o.mouth = "smile"; o.brows = "up"; o.lid = 0; o.noBlink = true; o.sq = key(t, [[T_SPARK - 0.05, 1.12], [T_SPARK + 0.35, 1, "elastic"]]); o.armL = [30, 150]; o.armR = [370, 150]; o.handL = "xoe"; o.handR = "xoe"; }
    var out = globeScene(t, true);
    out += W(t, o);
    var face = VT.wobPt(o, 200, 150);
    if (t >= T_YAWN + 0.2 && t < T_SPARK) out += VT.bubble({ x: face[0] + 160, y: face[1] - 130, s: 0.35, sym: "...", tail: -1 });
    if (t >= T_SPARK) {
      var kk = Math.round(t * 8) % 2;
      [[-30, -10], [30, -10]].forEach(function (d) { var e = VT.wobPt(o, 200 + d[0] * 2.6, 156); out += VT.sparkle({ x: e[0], y: e[1], s: kk ? 0.42 : 0.3, fill: "#FFF4C8" }); });
      out += VT.radialLines(face[0], face[1], 150, 230, 14, 6, 6, "#E8C25A");
    }
    var z = key(T, [[B4, 1.5], [T_SPARK, 1.56], [T_SPARK + 0.15, 1.66, "out"], [DUR, 1.7, "sine"]]);
    return { cam: [1270, 545, z], world: out, tint: null }; // giữ trọn nhãn "Arctic Circle" trong khung
  });
  return shots;
};
