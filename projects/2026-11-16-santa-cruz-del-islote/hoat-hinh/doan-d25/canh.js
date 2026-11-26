/* d25 · vẽ tay (431,109–450,532 s; 19,423 s). Vào "cat", ra "cat". Hồi ức sáng sớm, không khẩu hình.
 * Võng sọc xanh ngọc #2A9D8F–trắng, khớp võng cắt giấy d24 (sửa theo cổng 6a).
 * Nhịp 1–3 khung CHẶT quanh võng và Wob (không thấy nhà): take chậm (mở mắt, nhìn nước, nhắm, bật dậy); mặt nước mọc đôi mắt lễ phép cúi chào, Wob cúi chào lại;
 * Wob co chân, kéo mũ cói vào lòng, kéo cả dép, cốc, cuốn sổ của Wob lên võng; võng trĩu sát nước.
 * Nhịp 4: lui chậm theo ba lô khổng lồ nổi trôi ra lối đi (nhà chỉ là tường mờ, cửa KHÉP; không đồ của người dân, không người); Wob với tay, ba lô trôi thêm một gang,
 * nắp hé như ngoái lại rồi trôi tiếp; giữ rồi cắt cứng. Chỉ đùa về Wob và đồ của Wob.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var S2 = VT.nhip(1), S3 = VT.nhip(2), S4 = VT.nhip(3);
  var T_POL = VT.tu("politely"), T_GUEST = VT.tu("guest"), T_LEGS = VT.tu("legs"), T_HAT = VT.tu("hat"), T_EVERY = VT.tu("everything"), T_REACH = VT.tu("reach.");
  var T_DRIFT = VT.tu("drifted"), T_LANE = VT.tu("lane"), T_SOME = VT.tu("somewhere"), T_BE = VT.tu("be.");
  var HX = 760, HY = 520, WATER = 738, SIT = 1.0;
  VT.sfx("liu-lo-soc", SIT, 0.5);
  VT.sfx("song", S2 + 0.15, 0.45);
  VT.sfx("song", T_DRIFT - 0.2, 0.35);

  function sky() { return '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#F7E6D4"/>'; }
  function posts() { return VT.shape("M 380 1200 L 380 380 L 412 380 L 412 1200 Z", M.root, { sw: 6 }) + VT.shape("M 1108 1200 L 1108 380 L 1140 380 L 1140 1200 Z", M.root, { sw: 6 }); }
  function water(t, x0, x1) { return VT.bien({ y: WATER, t: t, col: "#7CC0BC", deep: "#4E9FA6", n: 14, x0: x0, x1: x1, depth: 200 }); }
  function sag(t) { return VT.ease.io(seg(t, T_EVERY, T_REACH + 0.3)); }
  function hammock(t, part) { var k = sag(t); return VT.vong({ x: HX, y: HY + 30 * k, w: 700, d: 190 + 40 * k, part: part, soc: ["#2A9D8F", "#F4F1EA"] }); }
  function wobBase(t) { var k = sag(t); return [HX + 20, HY + 205 + 60 * k]; }
  function W(o) { var b = { s: 0.78, noPack: true, t: o.t }; for (var k in o) b[k] = o[k]; return VT.wob(b); }
  function flipflops(x, y, s) { return VT.g(VT.tr(x, y, s, 0), VT.ell(-26, 0, 22, 44, "#E0703A", 5) + VT.ell(26, 0, 22, 44, "#4FA3C7", 5) + VT.line("M -26 -20 L -36 6 M -26 -20 L -16 6 M 26 -20 L 16 6 M 26 -20 L 36 6", 3)); }
  function notebook(x, y, s, rot) { return VT.g(VT.tr(x, y, s, rot), VT.shape(VT.rrect(-50, -36, 50, 36, 6), "#5A8FC0", { sw: 5 }) + VT.line("M -36 -36 L -36 36", 4, "#2c4f6e")); }

  var shots = [];
  // 1 · take chậm
  shots.push({ a: 0, b: S2, ten: "mở một mắt, nhìn nước, nhắm, bật dậy", ve: function (t, lt, T) {
    var b = wobBase(t), up = t >= SIT;
    var o = { t: t, x: b[0], y: b[1], lean: up ? 0 : -24, sunhat: up ? { mau: "coi", dy: 14 } : { mau: "coi", dy: 72, rot: -18 }, mouth: "X" };
    if (!up) { var ph = VT.pick(t, [[0, "half"], [0.65, "shut"]]); o.eyes = ph === "half" ? null : "closed"; o.lid = ph === "half" ? 0.55 : 0; o.py = 14; o.px = 6; }
    else { var pop = seg(t, SIT, SIT + 0.25); o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.bob = -40 * Math.sin(Math.PI * pop); o.sq = 1 + 0.08 * Math.sin(Math.PI * pop); o.marks = pop < 1 ? "shock" : null; o.py = 12; }
    var out = sky() + posts() + hammock(t, "back") + W(o) + hammock(t, "front") + water(t);
    var cam = key(T, [[0, [780, 680, 1.85]], [SIT, [780, 676, 1.9], "sine"], [S2, [780, 672, 1.96], "out"]]);
    return { cam: cam, shake: VT.shake(t, SIT, 0.2, 4), world: out, tint: "warm" };
  } });
  // 2 · nước có mắt cúi chào
  shots.push({ a: S2, b: S3, ten: "mặt nước lễ phép đứng chờ, cúi chào", ve: function (t, lt, T) {
    var b = wobBase(t), bow = t >= T_POL - 0.05 && t < T_POL + 0.9 ? Math.sin(Math.PI * seg(t, T_POL - 0.05, T_POL + 0.9)) : 0;
    var wobBow = t >= T_POL + 0.35 && t < T_POL + 1.3 ? Math.sin(Math.PI * seg(t, T_POL + 0.35, T_POL + 1.3)) : 0;
    var o = { t: t, x: b[0], y: b[1], sunhat: { mau: "coi", dy: 14 }, eyes: "wide", py: 14, px: 4, mouth: wobBow > 0.1 ? "flat" : "oSmall", brows: "up", lean: 22 * wobBow };
    o.lid = VT.blink(t, 2.6, 0.2);
    var out = sky() + posts() + hammock(t, "back") + W(o) + hammock(t, "front") + water(t);
    var rise = VT.ease.out(seg(t, S2, S2 + 0.6)), mx = 860, my = WATER - 40 * rise + 24 * bow;
    out += VT.shape("M " + (mx - 200) + " " + WATER + " C " + (mx - 140) + " " + VT.f(my - 10) + " " + (mx + 140) + " " + VT.f(my - 10) + " " + (mx + 200) + " " + WATER + " Z", "#7CC0BC", { sw: 6, ox: 0, oy: 0 });
    if (rise > 0.3) {
      var ey = my + 12, tilt = 14 * bow;
      out += VT.g("rotate(" + VT.f(tilt) + " " + mx + " " + VT.f(ey) + ")", VT.ell(mx - 40, ey, 22, 26, "#FFFDF6", 5, { ox: 0, oy: 0 }) + VT.ell(mx + 40, ey, 22, 26, "#FFFDF6", 5, { ox: 0, oy: 0 }) +
        VT.dot(mx - 38, ey - 6 + 10 * bow, 9) + VT.dot(mx + 42, ey - 6 + 10 * bow, 9) + (bow > 0.3 ? VT.line("M " + (mx - 62) + " " + (ey - 30) + " L " + (mx - 20) + " " + (ey - 26) + " M " + (mx + 20) + " " + (ey - 26) + " L " + (mx + 62) + " " + (ey - 30), 5) : ""));
    }
    var cam = key(T, [[S2, [800, 680, 1.8]], [T_GUEST, [810, 690, 1.86], "sine"], [S3, [810, 690, 1.9], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 3 · kéo mọi thứ lên võng
  var ITEMS = [[T_EVERY - 0.05, "dep"], [T_EVERY + 0.3, "coc"], [T_EVERY + 0.6, "so"]];
  shots.push({ a: S3, b: S4, ten: "co chân, kéo mũ, kéo đồ, võng trĩu", ve: function (t, lt, T) {
    var b = wobBase(t), legsIn = t >= T_LEGS, hatIn = t >= T_HAT;
    var o = { t: t, x: b[0], y: b[1], legs: legsIn ? "tuck" : "stand", sunhat: hatIn ? false : { mau: "coi", dy: 14 }, mouth: "flat", brows: "worried", py: 10, px: 6 };
    o.lid = VT.blink(t, 2.4, 0.5);
    var lap = VT.wobPt({ s: 0.78, x: b[0], y: b[1] }, 200, 300), items = "";
    if (t >= T_HAT - 0.2 && t < T_HAT + 0.4) { var k = seg(t, T_HAT - 0.2, T_HAT + 0.4); o.armR = [VT.lerp(290, 220, k), VT.lerp(60, 270, k)]; o.handR = "nam"; }
    if (hatIn) items += VT.sunhat({ x: lap[0] + 10, y: lap[1] - 30 + (t < T_HAT + 0.4 ? -140 * (1 - seg(t, T_HAT, T_HAT + 0.4)) : 0), s: 0.62, mau: "coi", rot: 10 });
    if (t >= T_LEGS - 0.1 && t < T_LEGS + 0.3) o.bob = -12 * Math.sin(Math.PI * seg(t, T_LEGS - 0.1, T_LEGS + 0.3));
    ITEMS.forEach(function (it, i) {
      if (t < it[0]) return;
      var k = VT.ease.out(seg(t, it[0], it[0] + 0.3)), x = VT.lerp(b[0] + 220 + i * 40, lap[0] - 60 + i * 60, k), y = VT.lerp(WATER + 30, lap[1] - 40 - i * 10, k) - 90 * Math.sin(Math.PI * k);
      items += it[1] === "dep" ? flipflops(x, y, 0.6) : it[1] === "coc" ? VT.cocNhua({ x: x, y: y + 20, s: 0.7, rot: 10 }) : notebook(x, y, 0.75, -12);
      if (k < 1) { o.armL = VT.wobLocal({ s: 0.78, x: b[0], y: b[1] }, x + 20, y); o.handL = "nam"; }
    });
    if (t >= T_EVERY - 0.1) { o.eyes = "squint"; o.mouth = "chatter"; }
    var out = sky() + posts() + hammock(t, "back") + W(o) + items + hammock(t, "front") + water(t);
    if (sag(t) > 0.5) out += VT.line("M 640 " + (WATER - 4) + " q 20 -12 40 0 M 860 " + (WATER - 4) + " q 20 -12 40 0", 5, "#ffffff", 0.8);
    var cam = key(T, [[S3, [800, 690, 1.86]], [T_EVERY, [800, 700, 1.9], "sine"], [S4, [800, 710, 1.98], "io"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 4 · ba lô trôi đi
  var REACH = T_SOME - 0.35, PEEK = T_BE + 0.05;
  shots.push({ a: S4, b: DUR, ten: "ba lô trôi ra lối đi, nắp ngoái lại", ve: function (t, lt, T) {
    var b = wobBase(t);
    var out = sky() + '<g opacity="0.45">' + VT.shape("M 1240 1200 L 1240 260 L 2600 260 L 2600 1200 Z", "#E8D7B8", { sw: 5 }) + VT.shape("M 2060 " + WATER + " L 2060 440 L 2220 440 L 2220 " + WATER + " Z", "#A88D6C", { sw: 5 }) + VT.line("M 2140 440 L 2140 " + WATER, 3) +
      VT.shape("M 1500 600 l 130 0 l 0 -110 l -130 0 Z", "#C8BBA4", { sw: 4 }) + "</g>";
    out += posts() + hammock(t, "back");
    var o = { t: t, x: b[0], y: b[1], legs: "tuck", sunhat: false, mouth: "flat", brows: "worried", eyes: null, py: 12, px: 12, lid: VT.blink(t, 2.8, 0.1) };
    var dx = VT.lerp(0, 520, VT.ease.sine(seg(t, S4, T_LANE + 0.6))) + VT.lerp(0, 120, VT.ease.out(seg(t, REACH + 0.1, REACH + 0.6))) + 160 * VT.ease.io(seg(t, PEEK + 0.5, DUR));
    var bx = 980 + dx, by = WATER + 105 + 8 * Math.sin(t * 3), rot = -10 + 9 * Math.sin(t * 1.4);
    if (t >= REACH && t < PEEK + 0.5) { o.armR = VT.wobLocal({ s: 0.78, x: b[0], y: b[1] }, Math.min(bx - 140, b[0] + 260), by - 160); o.handR = "xoe"; o.lean = 10; o.mouth = "o"; }
    var lap = VT.wobPt({ s: 0.78, x: b[0], y: b[1] }, 200, 300);
    out += W(o) + VT.sunhat({ x: lap[0] + 10, y: lap[1] - 30, s: 0.62, mau: "coi", rot: 10 }) + flipflops(lap[0] - 60, lap[1] - 40, 0.6) + notebook(lap[0] + 120, lap[1] - 40, 0.75, -12) + hammock(t, "front");
    var pk = t >= PEEK - 0.2 && t < PEEK + 0.9 ? Math.sin(Math.PI * seg(t, PEEK - 0.2, PEEK + 0.9)) : 0;
    out += VT.baLoKhongLo({ x: bx, y: by, s: 0.62, rot: rot, wet: 0.3, lidPeek: pk });
    out += water(t);
    out += VT.line("M " + VT.f(bx - 140) + " " + VT.f(WATER + 10) + " q 30 -14 60 0 M " + VT.f(bx + 90) + " " + VT.f(WATER + 10) + " q 30 -14 60 0", 5, "#ffffff", 0.8);
    var cam = key(T, [[S4, [840, 700, 1.9]], [T_DRIFT, [1000, 640, 1.3], "io3"], [T_LANE + 0.6, [1250, 620, 1.12], "io"], [DUR, [1320, 616, 1.12], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
