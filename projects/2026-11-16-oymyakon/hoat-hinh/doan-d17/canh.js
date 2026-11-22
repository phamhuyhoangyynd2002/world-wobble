/* d17 · vẽ tay · sơ đồ: áp cao Siberia như chiếc nắp + thung lũng là cái bát giữ khí lạnh (306,11–345,61 s tuyệt đối; 39,5 s). Vào "cat", ra "cat".
 * Bảng A (trang sổ): vùng đất phác tay có làng tí hon và Wob tí hon; chiếc nắp trong suốt to hạ xuống úp lên (nhãn "Siberian High");
 *   mây bị đẩy ra ngoài mép nắp, trời trong, sao hiện; các mũi tên hơi ấm lượn sóng bay thẳng lên khỏi mặt đất ra tới các ngôi sao.
 * Lướt (thu nhỏ khi lướt để không quá nhanh) sang bảng B: mặt cắt thung lũng hình cái bát. Khí lạnh cuộn như cục bột rơi bịch,
 *   chảy xuống đáy như nước, làng chìm dưới đáy; vành núi chặn mũi tên hơi ấm; hai nhiệt kế không số (trên sườn đỏ hơn, dưới đáy xanh hơn);
 *   Wob gõ khí lạnh như thạch; leo nửa sườn nhìn lên chỗ ấm; núi vươn cao vút; Wob ngồi lên ba lô trượt về đáy, tỉnh bơ.
 * Đúng ý khẳng định: áp cao mùa đông → trời trong, khô → mặt đất mất nhiệt lên không gian; khí lạnh nặng, trượt xuống, đọng đáy thung;
 *   sườn núi phía trên có thể ấm hơn đáy thung nhiều (nghịch nhiệt). Không số, không bản đồ.
 * Đồ Wob: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng. Chữ: chỉ "Siberian High".
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, DUR = D.thoi_luong;
  var T_HUGE = VT.tu("huge"), T_SIB = VT.tu("siberian"), T_SETTLES = VT.tu("settles"), T_ASIA = VT.tu("asia", 0, "end");
  var T_BRINGS = VT.tu("brings"), T_CLEAR = VT.tu("clear", 0), T_SKIES = VT.tu("skies", 0, "end"), T_CLEAR2 = VT.tu("clear", 1), T_LOSE = VT.tu("lose"), T_UP = VT.tu("up", 0), T_SPACE = VT.tu("space", 0, "end");
  var T_THEN = VT.tu("then"), T_VALLEY = VT.tu("valley", 0), T_COLD = VT.tu("cold", 0), T_HEAVY = VT.tu("heavy");
  var T_SLIDES = VT.tu("slides"), T_POOLS = VT.tu("pools"), T_WATER = VT.tu("water"), T_BOWL = VT.tu("bowl", 0);
  var T_MOUNT = VT.tu("mountains"), T_KEEP = VT.tu("keep"), T_OUT = VT.tu("out", 0, "end");
  var T_RES = VT.tu("researchers"), T_SLOPES = VT.tu("slopes"), T_WARMER = VT.tu("warmer", 0), T_FLOOR2 = VT.tu("floor", 1);
  var T_SO = VT.tu("so"), T_SPOT = VT.tu("spot"), T_WHOLE = VT.tu("whole"), T_BOWL2 = VT.tu("bowl", 1);
  var T_THOUGHT = VT.tu("thought"), T_CLIMB = VT.tu("climbing"), T_UP2 = VT.tu("up", 1), T_WARMER2 = VT.tu("warmer", 1);
  var T_UP3 = VT.tu("up", 2), T_MOUNTAIN = VT.tu("mountain", 1), T_STAYED = VT.tu("stayed"), T_BOWL3 = VT.tu("bowl", 2, "end");

  function W(t, o) {
    var b = { t: t, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && (b.eyes || "open") === "open") b.lid = Math.max(b.lid || 0, VT.blink(t, 3.0, 0.2));
    return VT.wob(b);
  }
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ================= BẢNG A: nắp áp cao =================
  var LAND = 800, LID_W = 1760, LID_H = 640, LX = 960;
  var T_LID0 = T_HUGE - 0.1, T_LAND = T_SIB - 0.2; // nắp hạ xong trước chữ "Siberian" để nhãn hiện trọn
  var NIGHT0 = T_CLEAR + 0.4, NIGHT1 = T_SKIES + 0.4;
  function lidY(t) { return t < T_LID0 ? -900 : key(t, [[T_LID0, -760], [T_LAND, LAND, "in2"]]); }
  function boardA(t, o) {
    o = o || {};
    var night = seg(t, NIGHT0, NIGHT1), s = "";
    // trời: rửa màu xanh nhạt → đêm sâu có sao (nét bút lông viền thô)
    var wash = "M -300 -320 C 400 -340 1500 -300 2220 -330 L 2230 " + (LAND + 6) + " L -310 " + (LAND + 6) + " Z";
    s += VT.shape(wash, "#D8E7F0", { sw: 0, ox: 0, oy: 0 });
    if (night > 0) {
      s += '<path d="' + wash + '" fill="#26324C" opacity="' + f(night) + '"/>';
      for (var i = 0; i < 40; i++) { var sx = -250 + VT.hash(i * 3.1) * 2400, sy = -280 + VT.hash(i * 7.9) * 820; if (sy < LAND - 140) s += VT.dot(sx, sy, (VT.hash(i * 1.3 + Math.floor(t * 3) * 0.17) > 0.3 ? 5 : 3) * night, "#F6F2E2"); }
    }
    // mây: trước "brings" lơ lửng trong vùng nắp; bị đẩy ra ngoài hai mép
    var push = VT.ease.in2(seg(t, T_BRINGS, T_SKIES + 0.2));
    [[600, 250, 1, 0.9], [1260, 210, 1, 0.8], [820, 590, -1, 0.7], [1440, 470, 1, 0.75]].forEach(function (c, i) {
      var dir = c[0] < LX ? -1 : 1, x = c[0] + dir * push * (1400 + i * 80), y = c[1] - push * 60;
      if (push < 1) s += '<g opacity="' + f(1 - push * 0.8) + '">' + VT.cloud({ x: x, y: y, s: c[3], fill: night > 0.5 ? "#9AA6B8" : "#FFFFFF" }) + "</g>";
    });
    if (push > 0 && push < 1) s += VT.speedLines({ x0: 180, y0: 200, n: 4, gap: 60, len: 140, dx: -1, dy: 0, sw: 5, color: "#ffffff" }) + VT.speedLines({ x0: 1700, y0: 200, n: 4, gap: 60, len: 140, dx: 1, dy: 0, sw: 5, color: "#ffffff" });
    // đất, làng tí hon, Wob tí hon
    var cool = seg(t, T_LOSE, T_SPACE);
    s += VT.shape("M -320 " + (LAND + 4) + " C 200 " + (LAND - 30) + " 600 " + (LAND + 20) + " 960 " + (LAND - 10) + " C 1300 " + (LAND - 34) + " 1800 " + (LAND + 16) + " 2240 " + LAND + " L 2240 1240 L -320 1240 Z", cool > 0.5 ? "#D7E6F0" : "#F2EEE3", { sw: 6, ox: 0, oy: 5 });
    [[860, 0.13], [930, 0.11], [1000, 0.14], [1070, 0.12]].forEach(function (h, i) { s += VT.house({ x: h[0], y: LAND - 6, s: h[1], t: t, seed: i, smokeTop: -1300 }); });
    var wo = { s: 0.5, x: 1290, y: LAND - 4, flip: 1, px: -4, py: -14, mouth: "content" };
    if (o.wob) for (var k in o.wob) wo[k] = o.wob[k];
    s += W(t, wo);
    // mũi tên hơi ấm thoát thẳng lên trời
    if (t >= T_CLEAR2) {
      [-700, -420, -140, 140, 420, 700].forEach(function (dx, i) {
        var t0 = T_LOSE - 0.25 + i * 0.12, k = seg(t, t0, t0 + 1.4), x0 = LX + dx + 40;
        s += VT.arrowWavy({ x0: x0, y0: LAND - 30, x1: x0 + 10, y1: -220, k: k, amp: 14, n: 4, color: C.accent, sw: 9 });
      });
      var wk = seg(t, T_UP - 0.4, T_UP + 0.8);
      s += VT.arrowWavy({ x0: 1292, y0: LAND - 230, x1: 1296, y1: LAND - 520, k: wk, amp: 8, n: 2, color: C.accent, sw: 6, head: 18 });
    }
    // nắp
    var ly = lidY(t);
    if (ly > -880) {
      s += VT.domeLid({ x: LX, y: ly, w: LID_W, h: LID_H, op: 0.28 });
      s += VT.textWrite(LX, ly - LID_H * 0.62, "Siberian High", 84, seg(t, T_SIB - 0.05, T_SIB + 0.85), { w: 800, fill: night > 0.35 ? "#F4EFDF" : "#2c4f6e" });
    }
    if (t >= T_LAND && t < T_LAND + 0.4) {
      var k2 = seg(t, T_LAND, T_LAND + 0.4);
      [-1, 1].forEach(function (d) { s += VT.puffBurst({ x: LX + d * (LID_W / 2 + 10), y: LAND, k: k2, s: 0.9, spread: 140 }); });
    }
    return s;
  }
  // ===== S0 · nắp trong suốt to hạ xuống, nhãn "Siberian High", đặt sập ở "settles" =====
  var B0 = T_SETTLES + 0.62;
  VT.sfx("whoosh", T_LID0 + 0.3, 0.35); VT.sfx("drop", T_LAND, 0.9);
  shot(0, B0, "nắp áp cao hạ xuống", function (t, lt, T) {
    var cam = key(T, [[0, [960, 360, 0.86]], [T_LAND, [960, 470, 0.9], "io"], [B0, [960, 480, 0.94]]]);
    // Wob ngước nhìn nắp hạ xuống, ngả người ra sau; nắp đặt sập thì rụt cổ, hai tay ôm mũ
    var wob = { px: 0, py: -14, lean: t > T_LID0 + 0.3 ? -8 : 0, eyes: t > T_LID0 + 0.4 ? "wide" : "open", mouth: t > T_LID0 + 0.4 ? "o" : "content", brows: "up", noBlink: t > T_LID0 + 0.4 };
    if (t >= T_LAND) { wob.sq = key(t, [[T_LAND, 0.8], [T_LAND + 0.5, 0.88, "out"]]); wob.armL = [120, 60]; wob.armR = [280, 60]; wob.handL = "xoe"; wob.handR = "xoe"; wob.eyes = t < T_LAND + 0.4 ? "squint" : "open"; wob.lean = 0; }
    return { cam: cam, shake: VT.shake(t, T_LAND, 0.3, 12), world: boardA(t, { wob: wob }), tint: null };
  });
  // ===== S1 · cận Wob tí hon dưới nắp khổng lồ: giữ mũ, ngước nhìn =====
  var B1 = T_BRINGS - 0.1;
  shot(B0, B1, "Wob tí hon dưới nắp", function (t, lt, T) {
    var wob = { px: 0, py: -14, eyes: "open", brows: "up", mouth: "oSmall", armL: [120, 60], armR: [280, 60], handL: "xoe", handR: "xoe", noBlink: true, lid: 0 };
    var z = key(T, [[B0, 1.6], [B1, 1.65, "sine"]]);
    return { cam: [1200, 600, z], world: boardA(t, { wob: wob }), tint: null };
  });
  // ===== S2 · mây bị đẩy ra ngoài, trời trong, khô; đêm, sao =====
  var B2 = T_CLEAR2 - 0.2;
  shot(B1, B2, "mây bị đẩy ra, trời trong", function (t, lt, T) {
    var wob = { px: t < T_SKIES ? (Math.round(t * 3) % 2 ? -12 : 12) : 0, py: -12, mouth: "content", armR: [300, 90], handR: "xoe" };
    return { cam: key(T, [[B1, [960, 470, 0.92]], [B2, [960, 450, 0.96], "sine"]]), world: boardA(t, { wob: wob }), tint: null };
  });
  // ===== S3 · hơi ấm của mặt đất bay thẳng lên ra không gian; Wob run, xanh lại =====
  var B3 = T_THEN - 0.06;
  VT.sfx("brr", T_UP + 0.1, 0.5);
  shot(B2, B3, "mặt đất mất nhiệt lên không gian", function (t, lt, T) {
    var sh = t > T_UP ? 2 : 0;
    var wob = { px: 0, py: -14, mouth: t > T_UP ? "chatter" : "oSmall", brows: "worried", shiver: sh, marks: t > T_UP + 0.3 ? "shiver" : null, arms: "hug" };
    return { cam: key(T, [[B2, [960, 450, 0.96]], [B3, [990, 420, 1.04], "sine"]]), world: boardA(t, { wob: wob }), tint: null };
  });

  // ================= BẢNG B: thung lũng hình cái bát =================
  var VX = 3900, VY = 860, V = { x: VX, y: VY, w: 1560, depth: 480, floor: 320, mtn: [160, 160] };
  function vo(t, extra) {
    var o = { x: V.x, y: V.y, w: V.w, depth: V.depth, floor: V.floor, t: t, ext: 900, mtnW: 900 };
    o.mtn = [160, key(t, [[T_UP3 - 0.05, 160], [T_UP3 + 0.6, 980, "back"]])];
    o.fill = key(t, [[T_SLIDES, 0], [T_WATER, 0.42, "io"], [T_BOWL, 0.46], [T_WHOLE, 0.5], [T_BOWL2 + 0.2, 0.68, "io"]]);
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  var THU = { x: VX + 560, k: 0 }, THL = { x: VX + 70 };
  function boardB(t, o) {
    o = o || {};
    var v = vo(t), s = "";
    s += VT.shape("M " + (VX - 1640) + " -900 C " + (VX - 400) + " -920 " + (VX + 600) + " -880 " + (VX + 2400) + " -910 L " + (VX + 2410) + " 1300 L " + (VX - 1650) + " 1300 Z", "#E4EEF4", { sw: 0, ox: 0, oy: 0 });
    for (var i = 0; i < 26; i++) { var sx = VX - 1400 + VT.hash(i * 5.1) * 2800, sy = -260 + VT.hash(i * 2.7) * 420; s += VT.dot(sx, sy, VT.hash(i * 1.7 + Math.floor(t * 3) * 0.2) > 0.3 ? 4 : 2.5, "#9AA6B8"); }
    // làng tí hon dưới đáy (trước khi khí lạnh phủ)
    [[-90, 0.1], [-30, 0.085], [30, 0.1], [90, 0.09]].forEach(function (h, i) { s += VT.house({ x: VX + h[0], y: VY - 4, s: h[1], t: t, seed: i + 5, smokeTop: -1100 }); });
    s += VT.valley(v);
    // mũi tên hơi ấm bị vành núi chặn (ngoài bát)
    var wk = seg(t, T_MOUNT - 0.2, T_KEEP + 0.5);
    if (wk > 0 && t < T_RES + 0.4) {
      [-1, 1].forEach(function (d) {
        var rim = [VX + d * V.w / 2, VY - V.depth];
        s += VT.arrowWavy({ x0: rim[0] + d * 330, y0: rim[1] - 280, x1: rim[0] + d * 90, y1: rim[1] - 60, k: wk, amp: 12, n: 3, color: C.accent, sw: 9 });
        if (wk >= 1) s += VT.knockLines({ x: rim[0] + d * 70, y: rim[1] - 40, s: 0.6, k: seg(t, T_KEEP + 0.5, T_KEEP + 0.9) }) + VT.arrowWavy({ x0: rim[0] + d * 90, y0: rim[1] - 70, x1: rim[0] + d * 260, y1: rim[1] - 360, k: seg(t, T_KEEP + 0.5, T_OUT + 0.4), amp: 8, n: 2, color: C.accent, sw: 7, head: 22 });
      });
    }
    // hai nhiệt kế không số: trên sườn (đỏ, cao) và dưới đáy (xanh, thấp)
    var tk = seg(t, T_RES + 0.2, T_RES + 0.5);
    if (tk > 0) {
      var yU = VT.valleyY(v, THU.x), yL = VT.valleyY(v, THL.x);
      var lvU = key(t, [[T_WARMER - 0.1, 0.4], [T_WARMER + 0.5, 0.8, "back"]]), lvL = key(t, [[T_FLOOR2 - 0.2, 0.32], [T_FLOOR2 + 0.4, 0.06, "out"]]);
      s += VT.line("M " + THU.x + " " + f(yU) + " L " + THU.x + " " + f(yU - 30), 8) + VT.thermoMini({ x: THU.x, y: yU - 24, s: 0.62 * VT.ease.back(tk), level: lvU, color: C.accent2 });
      s += VT.line("M " + THL.x + " " + f(yL) + " L " + THL.x + " " + f(yL - 30), 8) + VT.thermoMini({ x: THL.x, y: yL - 24, s: 0.62 * VT.ease.back(tk), level: lvL, color: C.iceDeep });
      if (t > T_WARMER + 0.4 && t < T_FLOOR2 + 1.2) s += VT.sparkle({ x: THU.x + 40, y: yU - 190, s: 0.35, fill: "#FFE6A0" });
    }
    if (o.wob) s += o.wob;
    // khí lạnh phủ lên làng (vẽ lại lớp lạnh mờ trên làng để làng "chìm")
    if (v.fill > 0.05) { var lvl = VY - V.depth * v.fill; s += '<rect x="' + (VX - V.floor / 2 - 40) + '" y="' + f(lvl + 6) + '" width="' + (V.floor + 80) + '" height="' + f(VY - lvl - 6) + '" fill="#6FA9CF" opacity="0.18"/>'; }
    if (o.over) s += o.over;
    return s;
  }
  function wobOn(t, x, o) { var v = vo(t), b = { s: 0.46, x: x, y: VT.valleyY(v, x) + 2, flip: 1 }; for (var k in o) b[k] = o[k]; return W(t, b); }
  // ===== S4 · lướt từ bảng A sang mặt cắt thung lũng (thu nhỏ khi lướt) =====
  var B4 = T_COLD - 0.12, P0 = T_THEN - 0.05, P1 = T_COLD - 0.12;
  VT.sfx("whoosh", P0 + 0.1, 0.4);
  shot(B3, B4, "lướt sang cái bát", function (t, lt, T) {
    var u = VT.ease.io3(seg(T, P0, P1));
    var z = key(T, [[P0, 1.04], [(P0 + P1) / 2, 0.42, "io"], [P1, 0.95, "io"], [B4, 0.97]]);
    var cam = [VT.lerp(990, VX, u), VT.lerp(420, 560, u), z];
    var wob = wobOn(t, VX + 180, { px: -10, py: -6, mouth: "content" });
    return { cam: cam, world: boardA(t, { wob: { px: 0, py: -14, arms: "hug", mouth: "chatter", shiver: 2 } }) + boardB(t, { wob: wob }), tint: null };
  });
  // ===== S5 · khí lạnh cuộn như cục bột, rơi bịch ("heavy") =====
  var B5 = T_SLIDES - 0.1, BLOB_DROP = T_HEAVY + 0.02;
  VT.sfx("drop", BLOB_DROP, 0.85);
  function blob(t) { // cục khí lạnh: hiện trên trời, rơi xuống sườn trái
    var y0 = VY - V.depth - 320, xL = VX - 520, yL = VT.valleyY(vo(t), xL) - 70;
    if (t < T_COLD) return "";
    var y = t < BLOB_DROP ? VT.lerp(y0, yL, VT.ease.in2(seg(t, T_COLD + 0.3, BLOB_DROP))) : yL;
    var sq = t < BLOB_DROP ? 1.08 : key(t, [[BLOB_DROP, 0.6], [BLOB_DROP + 0.35, 0.85, "elastic"]]);
    var sc = VT.ease.back(seg(t, T_COLD, T_COLD + 0.3));
    if (t >= T_SLIDES) { sq *= 1 - 0.5 * seg(t, T_SLIDES, T_SLIDES + 0.8); sc *= 1 - seg(t, T_SLIDES + 0.4, T_SLIDES + 1.0); }
    if (sc <= 0.01) return "";
    var pts = [];
    for (var i = 0; i < 12; i++) { var a = i / 12 * Math.PI * 2, r = 90 + Math.sin(i * 2.1 + Math.round(t * 12) * 0.7) * 8; pts.push([Math.cos(a) * r / Math.sqrt(sq), Math.sin(a) * r * sq]); }
    var out = VT.g("translate(" + f(xL) + " " + f(y + 90 * (1 - sq)) + ") scale(" + f(sc) + ")", VT.shape(VT.smooth(pts, true), "#6FA9CF", { sw: 6, op: 0.85 }) + VT.line("M -40 -20 C -10 -40 20 -40 40 -14", 5, "#ffffff", 0.7) + VT.line("M -50 20 C -20 0 20 0 50 24", 4, "#3F6A8A", 0.6));
    if (t < BLOB_DROP) out += VT.speedLines({ x0: xL - 60, y0: y - 200, n: 4, gap: 40, len: 80, dx: 0, dy: -1, sw: 5 });
    if (t >= BLOB_DROP && t < BLOB_DROP + 0.3) out += VT.puffBurst({ x: xL, y: yL + 70, k: seg(t, BLOB_DROP, BLOB_DROP + 0.3), s: 0.7, spread: 110 });
    return out;
  }
  shot(B4, B5, "cục khí lạnh rơi bịch", function (t, lt, T) {
    var wob = wobOn(t, VX + 180, { px: -12, py: -12, eyes: t > BLOB_DROP ? "squint" : "open", mouth: t > BLOB_DROP ? "wobbly" : "flat", brows: "up", sq: t > BLOB_DROP ? key(t, [[BLOB_DROP, 1.08], [BLOB_DROP + 0.15, 0.8, "out"]]) : 1, arms: t > BLOB_DROP ? "hug" : "rest" }); // rụt cổ khi cục khí lạnh rơi
    return { cam: key(T, [[B4, [VX - 160, 520, 1.05]], [B5, [VX - 180, 530, 1.12], "sine"]]), shake: VT.shake(t, BLOB_DROP, 0.25, 10), world: boardB(t, { wob: wob, over: blob(t) }), tint: null };
  });
  // ===== S6 · khí lạnh trượt xuống, đọng đáy như nước trong bát; làng chìm =====
  var B6 = T_MOUNT - 0.25;
  shot(B5, B6, "khí lạnh đọng đáy như nước", function (t, lt, T) {
    var over = blob(t);
    if (t < T_POOLS + 0.4) { // dòng khí lạnh chảy xuống sườn trái
      var xs = VX - 520, k = seg(t, T_SLIDES, T_POOLS + 0.4), pts = [];
      for (var i = 0; i <= 10; i++) { var x = VT.lerp(xs, VX - 60, i / 10); pts.push([x, VT.valleyY(vo(t), x) - 22]); }
      over += VT.lineDraw(VT.smooth(pts, false), k, 34, "#6FA9CF", { op: 0.75 }) + VT.arrowWavy({ x0: xs + 40, y0: VT.valleyY(vo(t), xs + 40) - 80, x1: VX - 200, y1: VT.valleyY(vo(t), VX - 200) - 60, k: k, amp: 6, n: 2, color: "#3F6A8A", sw: 6, head: 20 });
    }
    var wob = wobOn(t, VX + 180, { px: -10, py: 8, mouth: "chatter", brows: "worried", shiver: t > T_POOLS ? 2.5 : 1, arms: "hug", sq: 0.82, eyes: Math.round(t * 2) % 3 ? "squint" : "open", marks: t > T_POOLS ? "shiver" : null }); // rụt cổ, run khi khí lạnh đổ xuống
    if (t >= T_WATER) { var ripple = Math.round(t * 12) % 2; over += VT.line("M " + (VX - 260) + " " + f(VY - V.depth * 0.42 - 14 - ripple * 4) + " q 30 -10 60 0 q 30 10 60 0", 4, "#ffffff", 0.8); }
    return { cam: key(T, [[B5, [VX - 180, 530, 1.12]], [T_POOLS, [VX - 60, 600, 1.2], "io3"], [B6, [VX - 20, 620, 1.26], "sine"]]), world: boardB(t, { wob: wob, over: over }), tint: null };
  });
  // ===== S7 · vành núi chặn hơi ấm ở ngoài =====
  var B7 = T_RES - 0.1;
  shot(B6, B7, "vành núi chặn hơi ấm", function (t, lt, T) {
    var wob = wobOn(t, VX + 180, { px: (Math.round(t * 2.5) % 2 ? -12 : 12), py: -12, mouth: "flat", brows: "skeptic", arms: "hug", shiver: 1.5 });
    return { cam: key(T, [[B6, [VX, 400, 0.74]], [B7, [VX, 390, 0.78], "sine"]]), world: boardB(t, { wob: wob }), tint: null };
  });
  // ===== S8 · hai nhiệt kế: trên sườn đỏ hơn, dưới đáy xanh hơn =====
  var B8 = T_SLOPES + 0.9;
  shot(B7, B8, "nhiệt kế trên sườn", function (t, lt, T) {
    var wob = wobOn(t, VX + 180, { px: 12, py: -10, mouth: "oSmall", brows: "up", arms: "hug" });
    var yU = VT.valleyY(vo(t), THU.x);
    return { cam: key(T, [[B7, [VX + 300, 520, 1.25]], [B8, [THU.x - 60, yU - 140, 1.6], "io3"]]), world: boardB(t, { wob: wob }), tint: null };
  });
  var B9 = T_SO - 0.08;
  shot(B8, B9, "ấm trên sườn, lạnh dưới đáy", function (t, lt, T) {
    var wob = wobOn(t, VX + 180, { px: t > T_FLOOR2 - 0.3 ? -12 : 12, py: t > T_FLOOR2 - 0.3 ? 8 : -12, mouth: t > T_FLOOR2 ? "chatter" : "flat", brows: t > T_FLOOR2 ? "worried" : "up", arms: "hug", shiver: t > T_FLOOR2 ? 2.5 : 0 });
    var yU = VT.valleyY(vo(t), THU.x);
    return { cam: key(T, [[B8, [THU.x - 60, yU - 140, 1.6]], [T_WARMER + 0.6, [THU.x - 60, yU - 140, 1.65]], [T_FLOOR2 - 0.4, [VX + 280, 620, 1.2], "io3"], [B9, [VX + 260, 640, 1.24]]]), world: boardB(t, { wob: wob }), tint: null };
  });
  // ===== S9 · Wob gõ khí lạnh như gõ thạch; "the whole bowl" lùi ra =====
  var B10 = T_THOUGHT - 0.1, TAP1 = T_SPOT, TAP2 = T_BOWL2;
  VT.sfx("boing", TAP1, 0.45); VT.sfx("boing", TAP2, 0.5);
  shot(B9, B10, "gõ khí lạnh như thạch", function (t, lt, T) {
    var tap = 0;
    [TAP1, TAP2].forEach(function (ta) { if (t >= ta - 0.15 && t < ta + 0.15) tap = 1 - Math.abs(t - ta) / 0.15; });
    var wob = wobOn(t, VX + 180, { px: -12, py: 0, mouth: "flat", brows: "skeptic", armL: [VT.lerp(80, 10, tap), VT.lerp(260, 150, tap)], handL: "chi", lid: 0.3 });
    var over = "";
    [TAP1, TAP2].forEach(function (ta) { if (t >= ta && t < ta + 0.5) over += VT.knockLines({ x: VX + 140, y: VY - 150, s: 0.45, k: seg(t, ta, ta + 0.5) }); });
    var jig = 0;
    [TAP1, TAP2].forEach(function (ta) { if (t >= ta && t < ta + 0.7) jig = Math.sin((t - ta) * 30) * 14 * (1 - seg(t, ta, ta + 0.7)); });
    var w = boardB(t, { wob: wob, over: over });
    if (jig) w = '<g transform="translate(0 ' + f(jig * 0.3) + ')">' + w + "</g>";
    var cam = key(T, [[B9, [VX + 150, 700, 2.2]], [T_WHOLE - 0.1, [VX + 150, 700, 2.3]], [T_BOWL2 + 0.4, [VX, 520, 0.95], "io3"], [B10, [VX, 520, 0.97]]]);
    return { cam: cam, world: w, tint: null };
  });
  // ===== S10 · leo nửa sườn phải, nhìn lên chỗ ấm =====
  var B11 = T_UP3 - 0.12, CL0 = T_CLIMB - 0.2, CL1 = T_UP2 - 0.1, XC1 = VX + 520;
  shot(B10, B11, "leo nửa sườn", function (t, lt, T) {
    var wk = VT.buoc(t, { t0: CL0, t1: CL1, x0: VX + 180, x1: XC1, chuKy: 0.5, s: 0.46 });
    var o = { px: 12, py: -8, mouth: "content", lean: wk.walking ? 12 : 4 };
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; }
    if (t >= CL1) { o.px = 8; o.py = -14; o.eyes = "happy"; o.mouth = "smile"; o.armR = [380, 100]; o.handR = "chi"; }
    var over = "";
    if (t >= T_UP2 - 0.1) { var rim = [VX + V.w / 2, VY - V.depth]; over += '<ellipse cx="' + f(rim[0] + 60) + '" cy="' + f(rim[1] - 60) + '" rx="260" ry="150" fill="#FFE6A0" opacity="' + f(0.45 * seg(t, T_UP2 - 0.1, T_WARMER2)) + '"/>' + VT.sparkle({ x: rim[0] + 40, y: rim[1] - 120, s: 0.5, fill: "#FFE6A0" }); }
    var wob = wobOn(t, wk.x, o);
    return { cam: key(T, [[B10, [VX + 300, 560, 1.3]], [B11, [VX + 520, 420, 1.4], "io3"]]), world: boardB(t, { wob: wob, over: over }), tint: null };
  });
  // ===== S11 · núi vươn cao vút, Wob ngửa cổ =====
  var B12 = T_STAYED - 0.06;
  VT.sfx("rise", T_UP3, 0.6);
  shot(B11, B12, "núi vươn cao vút", function (t, lt, T) {
    var wob = wobOn(t, XC1, { px: 4, py: -14, eyes: "wide", mouth: "o", brows: "up", lean: -10, noBlink: true });
    var cam = key(T, [[B11, [VX + 560, 420, 1.4]], [T_UP3 + 0.6, [VX + 760, 60, 0.8], "out"], [B12, [VX + 760, 50, 0.82]]]);
    return { cam: cam, world: boardB(t, { wob: wob }), tint: null };
  });
  // ===== S12 · ngồi lên ba lô, trượt về đáy bát như xe trượt; tỉnh bơ nhìn người xem tới hết đoạn =====
  var SL0 = T_STAYED + 0.08, SL1 = T_BOWL3 - 0.05;
  VT.sfx("whoosh", SL0, 0.5); VT.sfx("drop", SL1, 0.7);
  shot(B12, DUR, "trượt về đáy bát", function (t, lt, T) {
    var v = vo(t), u = VT.ease.in2(seg(t, SL0, SL1)), x = VT.lerp(XC1, VX - 110, u), gy = VT.valleyY(v, x);
    var slope = Math.atan2(VT.valleyY(v, x + 10) - VT.valleyY(v, x - 10), 20) * 57.3;
    var pk = VT.g("translate(49 -26) rotate(-90)", VT.backpack({ x: 0, y: 0, s: 0.506 }));
    var o = { s: 0.46, x: 0, y: -9.5, flip: 1, noPack: true, legs: "tuck", armL: [60, 300], armR: [340, 300], handL: "nam", handR: "nam" };
    if (t < SL0) { o.px = 10; o.py = 6; o.mouth = "flat"; }
    else if (t < SL1) { o.eyes = "squint"; o.mouth = "smile"; o.smear = -50 * seg(t, SL0, SL0 + 0.2); }
    else { o.px = 0; o.py = 3; o.lid = 0.5; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; o.lid = 0.5 + 0.5 * VT.slowBlink(t, SL1 + 1.0, 0.4); }
    var tilt = t < SL1 ? slope : key(t, [[SL1, -6], [SL1 + 0.4, 0, "elastic"]]);
    var sled = VT.g("translate(" + f(x) + " " + f(gy) + ") rotate(" + f(tilt) + ")", pk + W(t, o));
    var over = "";
    if (t >= SL0 && t < SL1) over += VT.speedLines({ x0: x + 60, y0: gy - 90, n: 4, gap: 22, len: 70, dx: 1, dy: -0.4, sw: 4 });
    if (t >= SL1 && t < SL1 + 0.35) over += VT.puffBurst({ x: x - 30, y: gy, k: seg(t, SL1, SL1 + 0.35), s: 0.4 });
    var cam = key(T, [[B12, [VX + 560, 360, 1.0]], [SL1, [VX - 100, 700, 1.9], "io3"], [DUR, [VX - 110, 710, 2.05], "sine"]]);
    return { cam: cam, shake: VT.shake(t, SL1, 0.2, 5), world: boardB(t, { wob: sled + over }), tint: null };
  });
  return shots;
};
