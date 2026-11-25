/* d17 · vẽ tay · bước ra ngoài, một bông tuyết, rồi cả họ hàng (7,28 s). Vào "giay", ra "cat".
 * Đồ: áo mưa vàng mới có mũ trùm, ba lô ô liu cuộn thảm đỏ, giày đỏ; nhãn giá ở tay áo tới khi bị giật. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, G = 860, WS = 0.62, WX = 960;
  var T_STEP = VT.tu("stepping"), T_OUT = VT.tu("outside."), T_ONE = VT.tu("One"), T_LAND = VT.tu("landed"), T_NOSE = VT.tu("nose.");
  var T_FAM = VT.tu("family"), T_NEI = VT.tu("neighbours.");
  var T_TAG = T_OUT + 0.15, T_YANK = T_OUT + 0.62;   // tay giơ lên khoe → nhãn giá đung đưa trước mặt → giật phăng
  var FLAKE_ON = T_NOSE - 0.05;
  function W(t, o) {
    var b = { t: t, s: WS, x: WX, y: G, raincoat: true, packColor: "oliu", flip: 1 };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 3.0, 0.8));
    return VT.wob(b);
  }
  function pile(t) { return key(t, [[T_NEI - 0.1, 0], [D.thoi_luong, 105, "out"]]); }
  function world(t) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#C3CCCF"/>';
    s += VT.towerWall({ x: 960, y: G, w: 1300, h: 1500, cols: 7, rows: 8, lit: 0.45, door: true });
    s += '<rect x="-1200" y="' + (G + 24) + '" width="4320" height="900" fill="#7C878B"/>' + VT.line("M -1200 " + (G + 24) + " L 3100 " + (G + 24), 6);
    var p = pile(t);
    if (p > 2) s += VT.shape(VT.smooth([[-1300, G + 40], [-1300, G - p], [-300, G - p - 40], [400, G - p + 10], [960, G - p - 30], [1500, G - p + 6], [2300, G - p - 30], [3200, G - p], [3200, G + 40]], false) + " Z", VT.C.snow, { sw: 6 });
    return s;
  }
  function flakes(t) { // nhịp leo thang: 1 → 6 → cả trời
    var out = "";
    if (t >= T_FAM - 0.1) {
      var k = seg(t, T_FAM - 0.1, T_FAM + 0.6);
      [[-120, -60], [110, -90], [-70, 70], [140, 40], [0, -150]].forEach(function (p, i) {
        var y0 = -400 - i * 40, dx = Math.sin(VT.twos(t) * 3 + i) * 10;
        out += VT.snowflake({ x: WX + p[0] + dx, y: VT.lerp(G - 260 + y0, G - 260 + p[1], VT.ease.out(VT.clamp(k * 1.2 - i * 0.06, 0, 1))), r: 28 });
      });
    }
    return out;
  }
  function heavy(t) { // lớp over (toạ độ khung): bông to, dày dần
    if (t < T_NEI - 0.15) return "";
    var n = Math.round(30 + 170 * seg(t, T_NEI - 0.15, T_NEI + 0.5)), st = VT.twos(t), out = "";
    for (var i = 0; i < n; i++) {
      var v = 300 + VT.hash(i * 2.9) * 260, y = ((VT.hash(i * 8.7) * 1300 + st * v) % 1300) - 110, x = VT.hash(i * 4.1) * 2000 - 40 + Math.sin(st * 2 + i) * 20, r = 7 + VT.hash(i * 1.3) * 9;
      out += '<circle cx="' + VT.f(x) + '" cy="' + VT.f(y) + '" r="' + VT.f(r) + '" fill="#FFFFFF" stroke="#8796a0" stroke-width="2"/>';
    }
    return out;
  }

  VT.sfx("whoosh", T_YANK, 0.35);
  VT.sfx("ting", FLAKE_ON, 0.35);
  VT.sfx("pop", T_FAM + 0.1, 0.35);
  VT.sfx("whoosh", T_NEI, 0.7);

  var shots = [];
  // S0 · Wob bước ra bậc cửa, ưỡn ngực; nhãn giá vướng mũi, giật phăng
  var B0 = T_ONE - 0.1;
  var WK = { t0: 0.3, t1: T_OUT, x0: WX - 40, x1: WX + 60, chuKy: 0.7, s: WS };
  VT.buoc(0, WK).steps.forEach(function (st) { VT.sfx("bonk", st.t, 0.15); });
  shots.push({ a: 0, b: B0, ten: "bước ra, giật nhãn giá", ve: function (t, lt, T) {
    var wk = VT.buoc(t, WK), o = { s: WS, x: wk.x, y: G, mouth: "content", px: 8 };
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; }
    else { o.sq = key(t, [[T_OUT, 1], [T_OUT + 0.15, 1.08, "out"]]); o.lean = key(t, [[T_OUT, 0], [T_OUT + 0.15, -8, "back"]]); o.eyes = "happy"; o.mouth = "smile"; }
    var out = world(t);
    var tagP = null;
    if (t >= T_TAG && t < T_YANK) { // tay phải giơ lên khoe: nhãn đung đưa ngay trước mặt
      o.armR = [250, 120]; o.handR = "xoe"; o.eyes = "cross"; o.mouth = "flat"; o.lean = -4;
      tagP = VT.wobPt(o, 238, 150);
    } else if (t >= T_YANK && t < T_YANK + 0.5) { // tay trái giật, ném đi
      o.armR = [300, 200]; o.armL = [60, 80]; o.handL = "nam"; o.brows = "down"; o.mouth = "flat"; o.eyes = "open";
      var k = seg(t, T_YANK, T_YANK + 0.5), p0 = VT.wobPt(o, 60, 80);
      tagP = [p0[0] - 600 * k, p0[1] - 500 * k + 900 * k * k];
    } else if (t < T_TAG) { tagP = VT.wobPt(o, 338, 300); }
    var w = W(t, o);
    var tag = tagP ? VT.priceTag({ x: tagP[0], y: tagP[1], s: 2.0, rot: Math.sin(VT.twos(t) * 8) * 18, dy: -20 }) : "";
    if (t >= T_YANK && t < T_YANK + 0.12) out += "";
    out += w + tag;
    if (t >= T_YANK && t < T_YANK + 0.2) out += VT.impact({ x: VT.wobPt(o, 60, 80)[0], y: VT.wobPt(o, 60, 80)[1], s: 0.35 });
    var cz = key(T, [[0, 1.25], [T_TAG, 1.6, "io"], [B0, 1.68]]);
    var c = [key(T, [[0, WX], [B0, WX + 60]]), key(T, [[0, G - 260], [T_TAG, G - 200, "io"]])];
    return { cam: [c[0], c[1], cz], world: out, tint: "cold" };
  } });
  // S1 · cận mặt: một bông tuyết lững thững rơi, đậu lên mũi; Wob lác mắt nhìn
  var B1 = T_FAM - 0.2;
  shots.push({ a: B0, b: B1, ten: "bông tuyết đậu mũi", ve: function (t, lt, T) {
    var o = { s: WS, x: WX + 60, y: G, mouth: "flat", brows: "flat", px: 6, py: -14 };
    var nose = VT.wobPt(o, 200, 196), fp;
    if (t < FLAKE_ON) { var k = seg(t, B0, FLAKE_ON); fp = [nose[0] + Math.sin(k * 9) * 50 * (1 - k), VT.lerp(nose[1] - 300, nose[1], VT.ease.out2 ? VT.ease.out2(k) : k)]; o.py = VT.lerp(-30, 4, k); o.px = Math.sin(k * 9) * 10 * (1 - k); }
    else { fp = nose; o.eyes = "cross"; o.noBlink = true; o.mouth = "oSmall"; o.brows = "up"; }
    var out = world(t) + W(t, o) + VT.snowflake({ x: fp[0], y: fp[1], r: 16 });
    var c = VT.wobPt(o, 200, 170);
    return { cam: [c[0], c[1], key(T, [[B0, 2.4], [B1, 2.62, "sine"]])], world: out, tint: "cold" };
  } });
  // S2 · leo thang: năm bông nữa, rồi cả trời trút xuống; camera lùi Wob → bậc cửa → cả mặt tiền
  shots.push({ a: B1, b: D.thoi_luong, ten: "cả họ hàng tuyết", ve: function (t, lt, T) {
    var o = { s: WS, x: WX + 60, y: G, eyes: "cross", noBlink: true, mouth: "flat", brows: "flat" };
    if (t >= T_FAM) { o.eyes = "open"; o.px = 0; o.py = -16; o.brows = "worried"; o.mouth = "o"; }
    if (t >= T_NEI) { o.eyes = "wide"; o.marks = "shock"; o.arms = "shock"; }
    var p = pile(t);
    if (p > 120) { o.y = G; }
    var nose = VT.wobPt(o, 200, 196);
    var out = world(t).replace(/$/, "") ;
    // Wob vẽ trước đống tuyết để bị vùi dần
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#C3CCCF"/>' + VT.towerWall({ x: 960, y: G, w: 1300, h: 1500, cols: 7, rows: 8, lit: 0.45, door: true }) +
      '<rect x="-1200" y="' + (G + 24) + '" width="4320" height="900" fill="#7C878B"/>';
    s += W(t, o) + VT.snowflake({ x: nose[0], y: nose[1], r: 16 }) + flakes(t);
    if (p > 2) s += VT.shape(VT.smooth([[-1300, G + 40], [-1300, G - p], [-300, G - p - 40], [400, G - p + 10], [960, G - p - 30], [1500, G - p + 6], [2300, G - p - 30], [3200, G - p], [3200, G + 40]], false) + " Z", VT.C.snow, { sw: 6 });
    var z = key(T, [[B1, 2.2], [T_FAM + 0.5, 1.5, "io"], [T_NEI, 1.2], [D.thoi_luong, 0.72, "out"]]);
    var cy = key(T, [[B1, G - 230], [T_NEI, G - 250], [D.thoi_luong, G - 480, "out"]]);
    return { cam: [WX + 60, cy, z], world: s, over: heavy(t), tint: "cold" };
  } });
  return shots;
};
