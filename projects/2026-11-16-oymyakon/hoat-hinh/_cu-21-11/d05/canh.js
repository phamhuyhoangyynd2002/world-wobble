/* d05 · vẽ tay · ba lô trên máy bay (52,25–57,05 s tuyệt đối; 4,8 s). Vào "chen", ra "cat".
 * S0 nhìn ngang khoang: Wob nhét ba lô xuống gầm ghế trước, ba lô kẹt rồi bật ra đập vào Wob.
 * S1 nhìn thẳng: Wob ngồi, ba lô trên đùi phồng to hơn cả ghế. S2: ba lô đè bẹp Wob, chỉ còn đôi giày đỏ đung đưa và đôi mắt ló dưới quai.
 * Đồ Wob: mũ len đỏ, khăn đỏ; ba lô tháo ra (noPack + VT.backpack). Chưa có lông mi, chưa có cá. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, DUR = D.thoi_luong;
  var T_FIT = VT.tu("fit"), T_SEAT = VT.tu("seat"), T_SO = VT.tu("so"), T_SAT = VT.tu("sat", 0), T_LAP = VT.tu("lap");
  var T_AND = VT.tu("and"), T_SAT2 = VT.tu("sat", 1), T_UNDER2 = VT.tu("under", 1), T_IT2 = VT.tu("it", 1);

  function W(t, o) {
    var b = { t: t, beanie: "khoa", scarf: true, noPack: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes !== "happy" && b.eyes !== "closed" && b.eyes !== "squint") b.lid = Math.max(b.lid || 0, VT.blink(t, 2.6, 0.3));
    return VT.wob(b);
  }
  var WALL = "#EDE6D6", FLOOR = "#7D8C95";
  function cabinSide(t) { // nhìn ngang: tường có dãy cửa sổ tròn, hộc hành lý trên đầu, sàn thảm
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + WALL + '"/>';
    s += VT.shape("M -1200 60 L 3100 60 L 3100 200 C 2000 230 0 230 -1200 200 Z", "#F6F2E8", { sw: 6, ox: 0, oy: 5 });
    for (var x = -400; x < 2600; x += 520) s += VT.line("M " + x + " 70 L " + x + " 205", 4, C.ink, 0.4);
    [190, 710, 1230, 1750].forEach(function (x) { s += VT.planeWindow({ x: x, y: 420, s: 0.8, t: t }); });
    s += VT.shape("M -1200 960 L 3100 960 L 3100 2400 L -1200 2400 Z", FLOOR, { sw: 6, ox: 0, oy: 4 });
    return s;
  }
  function seatSide(x, floor, col) {
    var s = VT.shape("M " + (x - 20) + " " + (floor - 170) + " L " + (x - 70) + " " + (floor - 500) + " C " + (x - 74) + " " + (floor - 540) + " " + (x - 20) + " " + (floor - 548) + " " + (x - 4) + " " + (floor - 520) + " L " + (x + 34) + " " + (floor - 170) + " Z", col || C.sea, { sw: 6, ox: 5, oy: 4 });
    s += VT.shape("M " + (x - 34) + " " + (floor - 176) + " L " + (x + 170) + " " + (floor - 176) + " C " + (x + 196) + " " + (floor - 176) + " " + (x + 196) + " " + (floor - 120) + " " + (x + 170) + " " + (floor - 114) + " L " + (x - 34) + " " + (floor - 114) + " Z", col || C.sea, { sw: 6, ox: 4, oy: 4 });
    s += VT.line("M " + (x + 4) + " " + (floor - 114) + " L " + (x - 6) + " " + floor + " M " + (x + 150) + " " + (floor - 114) + " L " + (x + 160) + " " + floor, 12);
    s += VT.shape("M " + (x - 50) + " " + (floor - 520) + " L " + (x - 6) + " " + (floor - 526) + " L " + (x - 2) + " " + (floor - 470) + " L " + (x - 44) + " " + (floor - 464) + " Z", "#F4F0E4", { sw: 4 });
    return s;
  }
  var shots = [];

  // ===== S0 · nhìn ngang: nhét ba lô xuống gầm ghế trước → kẹt → bật ra đập vào Wob =====
  var FLOOR_Y = 960, SA = 300, SB = 1180, B0 = T_SO - 0.06, T_POP = T_SEAT;
  VT.sfx("boing", T_POP, 0.7); VT.sfx("bonk", T_POP + 0.32, 0.6);
  shots.push({ a: 0, b: B0, ten: "nhét ba lô xuống gầm ghế, bật ra", ve: function (t, lt, T) {
    var o = { s: 0.66, x: 830, y: FLOOR_Y, flip: 1, px: 12, py: 8 };
    // ba lô: trượt vào khe (0,25 → fit), kẹt, ép (fit → seat), bật ra theo cung về phía Wob
    var push = key(t, [[0, 0], [T_FIT, 1, "io"], [T_POP - 0.05, 1.15, "in2"]]);
    var px, py, rot = 0, sqz = 0;
    if (t < T_POP) { px = VT.lerp(1010, 1130, Math.min(1, push)); py = FLOOR_Y; sqz = Math.max(0, push - 0.55) * 0.5; }
    else {
      var u = seg(t, T_POP, T_POP + 0.32), q = 1 - u, a0 = [1130, FLOOR_Y], m = [1060, 600], b = [890, 760];
      px = q * q * a0[0] + 2 * q * u * m[0] + u * u * b[0]; py = q * q * a0[1] + 2 * q * u * m[1] + u * u * b[1]; rot = -200 * u;
      if (t > T_POP + 0.32) { var v = seg(t, T_POP + 0.32, B0); px = 890 + 30 * v; py = VT.lerp(760, FLOOR_Y, VT.ease.bounce(v)); rot = VT.lerp(-200, -360, v); }
    }
    var pack = VT.g("translate(" + f(px) + " " + f(py) + ") rotate(" + f(rot) + " 0 -95) scale(" + f(1 + sqz * 0.6) + " " + f(1 - sqz) + ")", VT.backpack({ x: 0, y: 0, s: 0.95, straps: true }));
    if (t < T_POP) {
      o.x = px - 205;
      var hand = VT.wobLocal(o, px - 70, py - 90);
      o.armR = hand; o.handR = "xoe"; o.armL = VT.wobLocal(o, px - 70, py - 40); o.handL = "xoe";
      o.lean = 10 + 8 * push; o.legs = "apart"; o.brows = push > 0.9 ? "worried" : "down"; o.mouth = push > 0.9 ? "wobbly" : "flat";
      o.eyes = push > 1.05 ? "squint" : "open"; o.sq = 1 - 0.05 * Math.max(0, push - 0.9);
      if (push > 0.95) o.marks = "sweat";
    } else if (t < T_POP + 0.32) { o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.arms = "shock"; o.px = 6; o.py = -12; }
    else { o.eyes = "cross"; o.mouth = "wobbly"; o.lean = key(t, [[T_POP + 0.32, -14], [B0, -4, "elastic"]]); o.sq = key(t, [[T_POP + 0.32, 0.85], [T_POP + 0.6, 1, "back"]]); }
    var out = cabinSide(t) + seatSide(SA, FLOOR_Y, C.sea) + W(t, o) + seatSide(SB, FLOOR_Y, C.sea) + pack;
    if (t >= T_POP && t < T_POP + 0.3) out += VT.speedLines({ x0: 1180, y0: 820, n: 5, gap: 26, len: 90, dx: 1, dy: 0, sw: 5 });
    if (t >= T_POP + 0.32 && t < T_POP + 0.6) out += VT.impact({ x: 900, y: 700, s: 0.45, seed: 3 });
    if (t >= T_POP + 0.32) out += VT.dizzy({ x: 850, y: 690, s: 0.6, t: t });
    var cam = [key(T, [[0, 960], [B0, 980, "sine"]]), 700, key(T, [[0, 1.45], [B0, 1.52, "sine"]])];
    return { cam: cam, shake: VT.shakes(t, [[T_POP, 0.2, 6], [T_POP + 0.32, 0.2, 8]]), world: out, tint: "warm" };
  } });

  // ===== S1–S2 · nhìn thẳng: ngồi, ba lô trên đùi phồng to hơn ghế → đè bẹp Wob, chỉ còn giày đung đưa + đôi mắt =====
  var SEAT_X = 960, SEAT_Y = 1060, SS = 1.4, CUSH = SEAT_Y - 170 * SS, WS = 0.8, WY = CUSH + 92 * WS;
  var T_LAND = T_SAT + 0.05, T_PUFF = T_LAP - 0.04, T_DROP = T_SAT2 + 0.02;
  VT.sfx("drop", T_LAND, 0.45); VT.sfx("boing", T_PUFF, 0.45); VT.sfx("bonk", T_DROP + 0.12, 0.7); VT.sfx("liu-lo-buon", T_UNDER2 + 0.05, 0.6);
  function front(t) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + WALL + '"/>';
    s += VT.shape("M -1200 40 L 3100 40 L 3100 170 C 2000 200 0 200 -1200 170 Z", "#F6F2E8", { sw: 6, ox: 0, oy: 5 });
    s += VT.planeWindow({ x: 330, y: 470, s: 1.0, t: t }) + VT.planeWindow({ x: 1640, y: 470, s: 1.0, t: t + 0.7 });
    s += VT.planeSeat({ x: SEAT_X - 460, y: SEAT_Y, s: 1.2, color: "#4F7E86" }) + VT.planeSeat({ x: SEAT_X + 460, y: SEAT_Y, s: 1.2, color: "#4F7E86" });
    s += VT.shape("M -1200 1060 L 3100 1060 L 3100 2400 L -1200 2400 Z", FLOOR, { sw: 6, ox: 0, oy: 4 });
    s += VT.planeSeat({ x: SEAT_X, y: SEAT_Y, s: SS, color: C.sea, cushionOnly: false });
    return s;
  }
  function eyesPeek(x, y, t, k) { // đôi mắt ló ra trong khe tối dưới quai ba lô
    var out = VT.ell(x, y, 120 * k, 46 * k, "#1d2326", 0, { ox: 0, oy: 0 });
    var lid = VT.blink(t, 1.3, 0.2) > 0.5 ? 0.9 : 0.35;
    [-38, 38].forEach(function (dx) {
      out += VT.ell(x + dx, y + 4, 26 * k, 30 * k, "#fffdf6", 5, { ox: 0, oy: 0 }) + VT.dot(x + dx + 2, y + 10, 11 * k);
      out += '<path d="M ' + f(x + dx - 28 * k) + " " + f(y - 30 * k) + " L " + f(x + dx + 28 * k) + " " + f(y - 30 * k) + " L " + f(x + dx + 28 * k) + " " + f(y - 30 * k + 60 * k * lid) + " L " + f(x + dx - 28 * k) + " " + f(y - 30 * k + 60 * k * lid) + ' Z" fill="#9cc8dc"/>' +
        VT.line("M " + f(x + dx - 28 * k) + " " + f(y - 30 * k + 60 * k * lid) + " L " + f(x + dx + 28 * k) + " " + f(y - 30 * k + 60 * k * lid), 6);
    });
    return out;
  }
  shots.push({ a: B0, b: DUR, ten: "ba lô trên đùi phồng to, đè bẹp Wob", ve: function (t, lt, T) {
    var o = { s: WS, x: SEAT_X, y: WY, flip: 1, legs: "tuck" };
    var dropK = seg(t, T_DROP, T_DROP + 0.14);
    // ba lô: rơi xuống đùi ("sat"), phồng to ("lap"), rồi sụp đè ("sat" lần 2)
    var pS = key(t, [[B0, 0.9], [T_PUFF, 0.9], [T_PUFF + 0.28, 3.1, "back"]]);
    var puff = key(t, [[T_PUFF, 0], [T_PUFF + 0.28, 1, "back"]]);
    var lapY = VT.wobPt(o, 200, 336)[1];
    var pY = t < T_LAND ? VT.lerp(WY - 520, lapY, VT.ease.in2(seg(t, B0, T_LAND))) : lapY;
    if (t >= T_DROP) pY = VT.lerp(lapY, CUSH + 12, VT.ease.in2(dropK));
    var bounce = t >= T_LAND && t < T_LAND + 0.25 ? -18 * Math.sin(seg(t, T_LAND, T_LAND + 0.25) * Math.PI) : 0;
    var sqP = t >= T_DROP ? key(t, [[T_DROP + 0.14, 0.86], [T_DROP + 0.4, 1, "elastic"]]) : 1;
    var packSvg = VT.g("translate(" + f(SEAT_X) + " " + f(pY + bounce) + ") scale(" + f(1 / Math.sqrt(sqP)) + " " + f(sqP) + ")", VT.backpack({ x: 0, y: 0, s: pS, puff: puff, straps: true }));
    // Wob: ôm ba lô, tròn mắt khi nó phồng, bị đè bẹp
    if (t < T_PUFF) { o.armL = [150, 300]; o.armR = [250, 300]; o.handL = "nam"; o.handR = "nam"; o.eyes = "happy"; o.mouth = "content"; }
    else if (t < T_DROP) { o.arms = "shock"; o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.py = -14; o.lean = -4; }
    var out = front(t) + (t < T_DROP + 0.1 ? W(t, o) : "") + packSvg;
    if (t >= T_DROP + 0.1) { // chỉ còn đôi giày đỏ đung đưa dưới đáy ba lô
      var sw = Math.round(t * 6) % 2 ? 1 : -1;
      [[-34, sw], [34, -sw]].forEach(function (L) {
        var hx = SEAT_X + L[0], hy = CUSH + 6, fx = hx + L[1] * 14, fy = CUSH + 92;
        out += VT.line("M " + f(hx) + " " + f(hy) + " Q " + f(hx + L[1] * 4) + " " + f((hy + fy) / 2) + " " + f(fx) + " " + f(fy), 12);
        out += VT.g("rotate(" + f(L[1] * 12) + " " + f(fx) + " " + f(fy + 6) + ")", VT.ell(fx + (L[0] > 0 ? 6 : -6), fy + 6, 24, 11, "#d9543c", 5));
      });
    }
    if (t >= T_DROP + 0.12) {
      var pk = VT.wrap({ x: SEAT_X, y: CUSH + 12 }, "");
      out += pk + eyesPeek(SEAT_X, CUSH - 70, t, seg(t, T_UNDER2 - 0.08, T_UNDER2 + 0.1));
    }
    if (t >= T_PUFF && t < T_PUFF + 0.3) out += VT.radialLines(SEAT_X, lapY - 200, 330, 470, 14, 5, 6);
    if (t >= T_DROP + 0.12 && t < T_DROP + 0.45) out += VT.puffBurst({ x: SEAT_X - 260, y: CUSH + 10, k: seg(t, T_DROP + 0.12, T_DROP + 0.45), s: 0.55 }) + VT.puffBurst({ x: SEAT_X + 260, y: CUSH + 10, k: seg(t, T_DROP + 0.12, T_DROP + 0.45), s: 0.55 });
    var z = key(T, [[B0, 1.2], [T_PUFF, 1.24], [T_PUFF + 0.3, 1.02, "out"], [T_DROP, 1.04], [DUR, 1.12, "sine"]]);
    var cy = key(T, [[B0, 700], [T_PUFF, 720], [T_PUFF + 0.3, 600, "out"], [DUR, 640, "sine"]]);
    return { cam: [SEAT_X, cy, z], shake: VT.shake(t, T_DROP + 0.12, 0.25, 10), world: out, tint: "warm" };
  } });
  return shots;
};
