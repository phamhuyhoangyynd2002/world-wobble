/* d21 · vẽ tay · sơ đồ: dân số kommun, cỡ New Jersey, quặng đi khắp châu Âu (282,03–297,792 s tuyệt đối; 15,76 s). Vào "cat", ra "cat".
 * S0 đường viền kommun Kiruna (giản lược) vẽ dần, chấm người lấp vào; thẻ "~22,400 people" ở "twenty-two".
 * S1 Wob khiêng tấm "New Jersey" cắt giấy, đặt chồng lên đúng "Jersey.": gần khít, mép kommun thò ra; Wob nhét mép xuống, mép bật ra lại; Wob buông, giữ.
 * S2 Wob nhặt một hòn quặng, nhìn về phía nam.
 * S3 lùi ra bản đồ châu Âu giản lược (KHÔNG biên giới); thẻ ">80%" ở "eighty"; Wob trao quặng cho từng mũi tên, nhanh dần; mũi tên DÀI THÊM khi nhận; giữ.
 * Đồ Wob: áo phao xanh lam túi phải, mũ len xanh lá thông, khăn kem sọc xanh lá thông, ba lô ô liu, giày đỏ.
 * Chữ: "~22,400 people", "New Jersey", ">80%".
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, C = VT.C, f = VT.f;
  var DUR = D.thoi_luong, GROUND = 920, BLUE = "#2c4f6e", RED = "#A8361F";
  var T_MUNI = VT.tu("municipality"), T_22 = VT.tu("twenty-two"), T_THEY = VT.tu("They're"), T_SIZE = VT.tu("size"), T_JER = VT.tu("Jersey"),
    T_AND = VT.tu("And"), T_MINE = VT.tu("mine"), T_FAR = VT.tu("far"), T_LKAB = VT.tu("LKAB"), T_80 = VT.tu("eighty"), T_UNION = VT.tu("Union");
  var KOM = { x: 820, y: 560, s: 1.6 };

  function W(t, o) {
    var b = { t: t, s: 0.75, puffer: true, beanie: "thong", scarf: "kem-xanh", packColor: "kiruna", keyRing: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.8, 1.1));
    return VT.wob(b);
  }
  function page() {
    var s = VT.rectS(-1400, -1400, 3300, 2500, "#EFE3C8", { sw: 0, ox: 0, oy: 0 });
    for (var y = 120; y < 1080; y += 64) s += VT.line("M -200 " + y + " L 2120 " + y, 2, "#9cc8dc", 0.3);
    return s;
  }
  // chấm người: phần lớn dồn ở thị trấn, rải rác phần còn lại
  var DOTS = [];
  (function () {
    for (var i = 0; i < 70; i++) {
      var town = i < 44, a = VT.hash(i * 3.7) * 6.283, r = Math.sqrt(VT.hash(i * 5.1 + 2));
      DOTS.push(town ? [KOM.x + 40 + Math.cos(a) * r * 70, KOM.y + 20 + Math.sin(a) * r * 46] : [KOM.x - 20 + Math.cos(a) * r * 300, KOM.y - 10 + Math.sin(a) * r * 170]);
    }
  })();
  function kommun(t, o) {
    o = o || {};
    var k = E.io(seg(t, 0.25, 2.0)), s = "";
    if (o.bump != null) { // mép kommun thò ra ở đầu phải (dưới tấm New Jersey)
      var bx = KOM.x + 250 * KOM.s, by = KOM.y + 6 * KOM.s;
      s += VT.g("translate(" + f(bx) + " " + f(by) + ") scale(" + f(Math.max(0.1, o.bump)) + " 1)", VT.shape("M -40 -46 C 10 -56 46 -20 40 6 C 34 34 -4 50 -40 44 Z", "#C9D8B0", { sw: 6 }));
    }
    s += VT.hinhGianLuoc({ ten: "kommun-kiruna", x: KOM.x, y: KOM.y, s: KOM.s, k: k, fill: "#C9D8B0", sw: 6 / KOM.s });
    var kd = seg(t, 1.7, 3.0);
    DOTS.forEach(function (p, i) { if (kd * DOTS.length > i) s += VT.dot(p[0], p[1], 7, BLUE); });
    return s;
  }
  function card22(t) {
    var k = E.back(seg(t, T_22, T_22 + 0.3));
    if (k <= 0) return "";
    return VT.g("translate(1370 300) scale(" + f(k) + ") rotate(-3)", VT.rectS(-270, -50, 270, 50, "#FFFDF6", { sw: 5, ox: 3, oy: 3 }) + VT.text(0, 22, "~22,400 people", 60, { fill: BLUE }));
  }
  var NJ_ROT = -78, NJ_S = 1.74, NJ_X = KOM.x - 34, NJ_Y = KOM.y + 22;
  function njPaper(x, y, rot, sc) {
    return VT.g("translate(" + f(x) + " " + f(y) + ") rotate(" + f(rot) + ") scale(" + f(sc) + ")",
      VT.hinhGianLuoc({ ten: "new-jersey", x: 6 / sc * 0, y: 0, fill: "#F3DFA8", sw: 5 / sc, op: 0.9 })) +
      VT.text(x, y + 20, "New Jersey", 58, { fill: RED, rot: -4 });
  }
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · viền kommun vẽ dần, chấm người, thẻ ~22,400 people =====
  var B0 = T_THEY - 0.05;
  shot(0, B0, "kommun, chấm người, thẻ dân số", function (t, lt, T) {
    var s = page() + kommun(t) + card22(t);
    var o = { s: 0.75, x: 1560, y: GROUND, flip: -1, px: -14, py: -6, brows: "up", mouth: "content" };
    if (t > T_22) { o.eyes = "wide"; o.mouth = "oSmall"; o.py = -16; }
    s += W(t, o);
    return { cam: [960, 570, 1.02 + 0.04 * seg(T, 0, B0)], world: s, tint: null };
  });

  // ===== S1 · Wob khiêng tấm New Jersey, đặt đúng "Jersey."; nhét mép kommun; mép bật ra; buông; giữ =====
  var B1 = T_AND + 0.42, T_PRESS = T_JER + 0.15, T_POP = T_JER + 0.62;
  shot(B0, B1, "đặt tấm New Jersey, mép bật", function (t, lt, T) {
    var carry = E.io(seg(t, B0, T_SIZE)), place = E.io3(seg(t, T_SIZE + 0.05, T_JER));
    var wx = VT.lerp(1680, 1340, carry), o = { s: 0.75, x: wx, y: GROUND - (carry < 1 ? 8 * Math.abs(Math.sin(Math.round(t * 12) * 0.9)) : 0), flip: -1, px: -14, py: -14, brows: "up", mouth: "content" };
    var px = VT.lerp(wx - 20, NJ_X, place), py = VT.lerp(GROUND - 395, NJ_Y, place), rot = VT.lerp(-70, NJ_ROT, place), sc = VT.lerp(1.0, NJ_S, place);
    var bump = 1;
    if (t >= T_JER) {
      bump = key(t, [[T_JER, 1], [T_PRESS, 1], [T_PRESS + 0.2, 0.15, "io"], [T_POP, 0.15], [T_POP + 0.12, 1.25, "out"], [T_POP + 0.3, 1, "io"]]);
    }
    var s = page() + kommun(t, { bump: bump });
    if (place < 1) {
      o.armR = VT.wobLocal(o, px + 60, py + 60); o.handR = "nam"; o.armL = VT.wobLocal(o, px + 130, py + 30); o.handL = "nam";
      s += W(t, o) + njPaper(px, py, rot, sc) + card22(t);
    } else {
      s += njPaper(px, py, rot, sc) + card22(t);
      var tip = [KOM.x + 250 * KOM.s + 10, KOM.y + 6 * KOM.s - 10];
      var press = t >= T_PRESS - 0.1 && t < T_POP + 0.05;
      var hop = E.io(seg(t, T_JER, T_PRESS - 0.1)); o.x = VT.lerp(1340, 1480, hop); o.y = GROUND - 170 * hop - 60 * Math.sin(Math.PI * hop);
      if (press) { o.armR = VT.wobLocal(o, tip[0] + 10, tip[1] + 6); o.handR = "xoe"; o.brows = "down"; o.mouth = "flat"; o.lean = -10; }
      else if (t >= T_POP + 0.05) { o.brows = "flat"; o.mouth = "flat"; o.eyes = "open"; o.px = 0; o.py = 0; o.noBlink = t > T_POP + 0.3; if (t < T_POP + 0.3) { o.eyes = "wide"; o.lean = 6; } }
      s += W(t, o);
    }
    return { cam: [VT.lerp(1020, 1000, place), 570, 1.08 + 0.12 * E.io(seg(T, T_JER, T_POP))], world: s, tint: null };
  });

  // ===== S2 · Wob nhặt một hòn quặng, nhìn về phía nam =====
  var B2 = T_LKAB - 0.03, WY = GROUND - 170, ORE = [1370, WY - 6];
  shot(B1, B2, "nhặt hòn quặng, nhìn về nam", function (t, lt, T) {
    var s = page() + kommun(t, { bump: 1 }) + njPaper(NJ_X, NJ_Y, NJ_ROT, NJ_S);
    var bend = E.io(seg(t, B1, T_MINE + 0.3)) * (1 - E.io(seg(t, T_MINE + 0.35, T_FAR - 0.05)));
    var o = { s: 0.75, x: 1480, y: WY, flip: -1, px: -14, py: 10, brows: "flat", mouth: "content", lean: -18 * bend };
    var hold = t >= T_MINE + 0.3, rest = VT.wobPt(o, 330, 290);
    var hand = hold ? [rest[0] - 10, rest[1] - 40] : [VT.lerp(rest[0], ORE[0] + 10, bend), VT.lerp(rest[1], ORE[1] - 30, bend)];
    o.armR = VT.wobLocal(o, hand[0], hand[1]); o.handR = "nam";
    var oreP = hold ? [hand[0] - 14, hand[1] - 22] : ORE;
    if (t > T_FAR - 0.05) { o.px = -6; o.py = 16; o.brows = "up"; o.mouth = "oSmall"; o.armL = [200, 120]; o.handL = "xoe"; }
    s += VT.honQuang({ x: oreP[0], y: oreP[1] - 20, r: 42, seed: 5, dots: 6 }) + W(t, o);
    if (t > T_FAR) s += VT.lineDraw("M 1620 650 L 1620 780", seg(t, T_FAR, T_FAR + 0.3), 7, C.ink) + (t > T_FAR + 0.3 ? VT.line("M 1596 750 L 1620 782 L 1644 750", 7) : "");
    return { cam: [1420, 580, 1.75 + 0.06 * seg(T, B1, B2)], world: s, tint: null };
  });

  // ===== S3 · lùi ra bản đồ châu Âu giản lược; ">80%"; trao quặng cho từng mũi tên, mũi tên dài thêm; giữ =====
  var EU = { x: 880, y: 600, s: 0.95 };
  function eu(lon, lat) { var p = VT.chauAuPt(lon, lat); return [EU.x + p[0] * EU.s, EU.y + p[1] * EU.s]; }
  var KIR = eu(20.2, 67.85);
  var TARGETS = [[14, 53.6], [7.5, 52.5], [11, 49.5], [2.5, 50.5], [18, 50], [-2, 47.5]];
  var GIVE = [12.0, 12.75, 13.35, 13.85, 14.25, 14.6];
  GIVE.forEach(function (g, i) { VT.sfx("pop", g, i ? 0.4 : 0.6); });
  shot(B2, DUR, "châu Âu, mũi tên nhận quặng", function (t, lt, T) {
    var s = page() + VT.hinhGianLuoc({ ten: "chau-au", x: EU.x, y: EU.y, s: EU.s, fill: "#C9D8B0", sw: 5 / EU.s });
    s += VT.dot(KIR[0], KIR[1], 12, RED) + VT.ell(KIR[0], KIR[1], 22, 22, null, 4);
    var nextI = -1;
    TARGETS.forEach(function (tg, i) {
      var end = eu(tg[0], tg[1]), appear = E.out(seg(t, T_LKAB + 0.5 + 0.08 * i, T_LKAB + 0.8 + 0.08 * i));
      if (appear <= 0) return;
      var grow = E.back(seg(t, GIVE[i], GIVE[i] + 0.25)), L = 0.28 * appear + 0.72 * grow;
      var x1 = VT.lerp(KIR[0], end[0], L), y1 = VT.lerp(KIR[1] + 26, end[1], L), x0 = KIR[0], y0 = KIR[1] + 26;
      var dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
      s += VT.line("M " + f(x0) + " " + f(y0) + " L " + f(x1) + " " + f(y1), 8, RED);
      s += VT.line("M " + f(x1 - ux * 26 - uy * 16) + " " + f(y1 - uy * 26 + ux * 16) + " L " + f(x1) + " " + f(y1) + " L " + f(x1 - ux * 26 + uy * 16) + " " + f(y1 - uy * 26 - ux * 16), 8, RED);
      if (t >= GIVE[i]) { var ride = seg(t, GIVE[i], GIVE[i] + 0.3); s += VT.honQuang({ x: VT.lerp(x0, x1, 0.82 * ride + 0.1) - uy * 22, y: VT.lerp(y0, y1, 0.82 * ride + 0.1) + ux * 22, r: 14, seed: 5 + i, dots: 3 }); }
      if (nextI < 0 && t < GIVE[i] + 0.05) nextI = i;
    });
    // Wob ở Kiruna, đống quặng dưới chân
    var o = { s: 0.5, x: KIR[0] + 122, y: KIR[1] + 104, flip: -1, px: -10, py: 10, brows: "flat", mouth: "content" };
    for (var p = 0; p < 4 - Math.min(4, Math.floor(seg(t, GIVE[0], GIVE[5]) * 4)); p++) s += VT.honQuang({ x: KIR[0] + 200 + (p % 2) * 22, y: KIR[1] + 82 - Math.floor(p / 2) * 18, r: 13, seed: 9 + p, dots: 3 });
    if (nextI >= 0 && t > T_LKAB + 0.6) {
      var tg2 = eu(TARGETS[nextI][0], TARGETS[nextI][1]), ax = KIR[0] + (tg2[0] - KIR[0]) * 0.12, ay = KIR[1] + 26 + (tg2[1] - KIR[1] - 26) * 0.12;
      var prev = nextI ? GIVE[nextI - 1] + 0.12 : T_80 - 0.6, rk = E.io(seg(t, prev, GIVE[nextI]));
      var rest = VT.wobPt(o, 330, 300), hx = VT.lerp(rest[0], ax + 18, rk), hy = VT.lerp(rest[1], ay + 10, rk);
      o.armR = VT.wobLocal(o, hx, hy); o.handR = "nam";
      if (rk < 1) s += VT.honQuang({ x: hx - 8, y: hy - 10, r: 13, seed: 5 + nextI, dots: 3 });
      o.brows = "down"; o.mouth = nextI > 2 ? "flat" : "content"; o.px = -12; o.py = 12;
    } else if (t > GIVE[5] + 0.1) { o.brows = "flat"; o.mouth = "content"; o.px = 0; o.py = 0; o.noBlink = true; o.eyes = "open"; }
    s += W(t, o);
    var k80 = E.back(seg(t, T_80, T_80 + 0.3));
    if (k80 > 0) s += VT.g("translate(1440 470) scale(" + f(k80) + ") rotate(4)", VT.rectS(-130, -66, 130, 66, "#F6D36A", { sw: 5, ox: 3, oy: 3 }) + VT.text(0, 32, ">80%", 96, { fill: RED }));
    var pull = E.io3(seg(T, B2, B2 + 0.85));
    return { cam: [VT.lerp(KIR[0] + 120, 940, pull), VT.lerp(KIR[1] + 60, 600, pull), VT.lerp(2.4, 1.12, pull)], world: s, tint: null };
  });

  return shots;
};
