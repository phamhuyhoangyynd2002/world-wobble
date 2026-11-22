/* d02 · vẽ tay · Wob mơ kế hoạch (22,23–27,60 s tuyệt đối; 5,37 s). Vào "chen", ra "cat".
 * Toàn khung là bong bóng tưởng tượng (viền mây VT.dreamFrame): đồi tuyết + làng tí hon → ném cờ trơn lên nóc nhà gỗ →
 * bìa tạp chí không chữ đóng sập quanh Wob, đèn flash, vương miện băng mọc trên mũ.
 * Đồ Wob (trong tưởng tượng): mũ len đỏ, khăn đỏ, ba lô; chưa có lông mi. Không chữ (chu_tren_do_vat rỗng).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f;
  var T_VILLAGE = VT.tu("village"), T_ANYONE = VT.tu("anyone"), T_OF = VT.tu("of", 0, "end");
  var T_LIVE = VT.tu("live"), T_AND = VT.tu("and"), T_FAMOUS = VT.tu("famous"), T_COLD = VT.tu("cold");
  var DUR = D.thoi_luong;

  function W(t, o) {
    var b = { t: t, beanie: "khoa", scarf: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes !== "happy" && b.eyes !== "closed") b.lid = Math.max(b.lid || 0, VT.blink(t, 2.7, 0.4));
    return VT.wob(b);
  }
  function hillY(x) { // mặt đồi Wob đứng (đỉnh ở x ≈ 560)
    var u = (x - 560) / 700;
    return x < 1250 ? 702 + 250 * u * u / (1 + 0.6 * u * u) : 702 + 250 * (690 / 700) * (690 / 700) / (1 + 0.6 * (690 / 700) * (690 / 700)) + (x - 1250) * 0.02;
  }
  function land(t) {
    var s = VT.sky("#CFE6F2", 1) + VT.ridge(640, -100, "#E3EEF3") + VT.ridge(760, 260, "#EEF5F8");
    s += VT.shape("M -1200 1000 C 200 930 900 920 3100 960 L 3100 2400 L -1200 2400 Z", "#F4F8FA", { sw: 5, ox: 0, oy: 4 });
    // làng tí hon dưới thung
    [[1420, 0.07], [1480, 0.06], [1540, 0.075], [1600, 0.06]].forEach(function (h, i) { s += VT.house({ x: h[0], y: hillY(h[0]) + 2, s: h[1], t: t, seed: i + 2, faint: true, smokeTop: -2600 }); });
    var pts = [];
    for (var x = -1200; x <= 3100; x += 100) pts.push([x, hillY(x)]);
    s += VT.shape(VT.smooth(pts, false) + " L 3100 2400 L -1200 2400 Z", C.snow, { sw: 6, ox: 0, oy: 5 });
    s += VT.line("M 300 760 C 360 750 420 756 470 752", 4, C.iceDeep, 0.5) + VT.line("M 640 790 C 700 784 760 790 800 800", 4, C.iceDeep, 0.5);
    return s;
  }
  var C = VT.C;
  var shots = [];

  // ===== S0 · trên đồi: ống nhòm quét → hạ ống nhòm, chỉ chấm làng nhỏ xíu → gật gù =====
  var B0 = T_OF + 0.12;
  VT.sfx("ting", T_VILLAGE + 0.05, 0.4);
  shots.push({ a: 0, b: B0, ten: "đồi tuyết, ống nhòm, chỉ làng tí hon", ve: function (t, lt, T) {
    var WX = 560, o = { s: 0.95, x: WX, y: hillY(WX) + 4, flip: 1 };
    var lower = seg(t, T_VILLAGE - 0.12, T_VILLAGE + 0.1);
    if (lower < 1) {
      // ống nhòm áp mắt, quét trái → phải
      o.lean = key(t, [[0, -6], [0.5, 6, "io"], [T_VILLAGE - 0.12, 2]]);
      o.armL = [150, 168]; o.armR = [250, 168]; o.handL = "nam"; o.handR = "nam";
      o.prop = VT.binoculars({ x: 200 + 40 * lower, y: 158 + 140 * lower, s: 1.1, rot: -90 });
      o.mouth = "content";
    } else {
      o.prop = VT.binoculars({ x: 150, y: 300, s: 0.9, rot: -70 }); o.armL = [150, 286]; o.handL = "nam";
      o.armR = [404, 196]; o.handR = "chi"; o.px = 12; o.py = 6;
      o.eyes = t > T_ANYONE - 0.1 ? "happy" : "open"; o.mouth = "smile";
      o.bob = -10 * Math.abs(Math.sin((t - T_ANYONE) * Math.PI * 2.2)) * (t > T_ANYONE ? 1 : 0); // gật gù
      o.sq = key(t, [[T_VILLAGE + 0.1, 0.92], [T_VILLAGE + 0.3, 1.04, "out"], [T_VILLAGE + 0.5, 1]]);
      o.brows = "up";
    }
    var out = land(t) + W(t, o);
    // chấm làng: vòng tròn đánh dấu + lấp lánh khi Wob chỉ
    if (t >= T_VILLAGE) {
      var k = seg(t, T_VILLAGE, T_VILLAGE + 0.3);
      out += VT.ell(1510, hillY(1510) - 22, 150 * VT.ease.back(k), 70 * VT.ease.back(k), "none", 6, { stroke: C.accent2 });
      out += VT.sparkle({ x: 1660, y: 780, s: 0.5 + 0.2 * Math.sin(Math.round(t * 12)) }) + VT.arc([[1000, 470], [1250, 520], [1450, 800]], 5, 0.5);
    }
    var cam = [key(T, [[0, 900], [B0, 1010, "sine"]]), key(T, [[0, 620], [B0, 650, "sine"]]), key(T, [[0, 1.12], [B0, 1.18, "sine"]])];
    return { cam: cam, world: out, over: VT.dreamFrame(t), tint: "warm" };
  } });

  // ===== S1 · ném cờ trơn lên nóc nhà gỗ nhỏ: cắm phập đúng "live"; khói ống khói bốc thẳng =====
  var A1 = B0, B1 = T_AND - 0.08, HX = 1120, HY = 820, HS = 0.62;
  var PEAK = [HX, HY - 370 * HS + 4], T_REL = T_LIVE - 0.14, T_HIT = T_LIVE + 0.02;
  VT.sfx("pop", T_HIT, 0.75);
  shots.push({ a: A1, b: B1, ten: "ném cờ lên nóc nhà", ve: function (t, lt, T) {
    var o = { s: 0.62, x: 760, y: 822, flip: 1 };
    var hand0 = [330, 120];
    if (t < T_REL) { // lấy đà: bẹp xuống, tay vung ra sau
      var k = seg(t, A1, T_REL);
      o.sq = key(t, [[A1, 1], [T_REL - 0.04, 0.86, "out"], [T_REL, 1.1]]); o.lean = -8 * k;
      o.armR = [VT.lerp(330, 380, k), VT.lerp(120, 60, k)]; o.handR = "nam"; o.brows = "down"; o.mouth = "smirk"; o.px = 12; o.py = -6;
    } else if (t < T_HIT + 0.3) {
      o.armR = [404, 120]; o.handR = "xoe"; o.sq = key(t, [[T_REL, 1.1], [T_REL + 0.2, 1, "back"]]); o.lean = key(t, [[T_REL, 8], [T_HIT + 0.3, 0]]);
      o.px = 14; o.py = -10; o.mouth = "o"; o.brows = "up";
    } else { o.arms = "up"; o.eyes = "happy"; o.mouth = "smile"; o.bob = -14 * Math.abs(Math.sin((t - T_HIT) * 7)); }
    var out = VT.sky("#CFE6F2", 1) + VT.ridge(600, 40, "#E3EEF3") + VT.snowGround(822);
    out += VT.house({ x: HX, y: HY, s: HS, w: 420, t: t, seed: 9, icicles: true, door: true, open: 0, smokeTop: -1800 });
    // cờ: trong tay → bay theo cung → cắm trên nóc
    var flagSvg;
    if (t < T_REL) { var hp = VT.wobPt(o, o.armR[0], o.armR[1]); flagSvg = VT.flag({ x: hp[0], y: hp[1] + 40, s: 0.45, rot: 20, t: t }); }
    else if (t < T_HIT) {
      var u = seg(t, T_REL, T_HIT), p0 = VT.wobPt({ s: 0.62, x: 760, y: 822 }, 380, 60), q = 1 - u;
      var mid = [(p0[0] + PEAK[0]) / 2, Math.min(p0[1], PEAK[1]) - 220];
      var x = q * q * p0[0] + 2 * q * u * mid[0] + u * u * PEAK[0], y = q * q * p0[1] + 2 * q * u * mid[1] + u * u * PEAK[1];
      flagSvg = VT.flag({ x: x, y: y, s: 0.45, rot: VT.lerp(60, 0, u), t: t }) + VT.arc([p0, mid, [x, y]], 5, 0.55);
    } else {
      var wob = 14 * Math.exp(-(t - T_HIT) * 6) * Math.sin((t - T_HIT) * 30);
      flagSvg = VT.flag({ x: PEAK[0], y: PEAK[1], s: 0.45, rot: wob, t: t });
      if (t < T_HIT + 0.3) flagSvg += VT.puffBurst({ x: PEAK[0], y: PEAK[1], k: seg(t, T_HIT, T_HIT + 0.3), s: 0.4 }) + VT.knockLines({ x: PEAK[0], y: PEAK[1] - 10, s: 0.5, k: seg(t, T_HIT, T_HIT + 0.3) });
    }
    out += W(t, o) + flagSvg;
    var cam = [key(T, [[A1, 930], [B1, 960, "sine"]]), 600, key(T, [[A1, 1.35], [B1, 1.42, "sine"]])];
    return { cam: cam, shake: VT.shake(t, T_HIT, 0.2, 5), world: out, over: VT.dreamFrame(t), tint: "warm" };
  } });

  // ===== S2 · bìa tạp chí (không chữ) đóng sập quanh Wob, flash, vương miện băng mọc ở "famous"; Wob tạo dáng, giữ hình =====
  var A2 = B1, CL = T_AND, CL1 = T_AND + 0.22, T_CROWN = T_FAMOUS - 0.03;
  VT.sfx("whoosh", CL, 0.35); VT.sfx("ting", T_CROWN, 0.6); VT.sfx("liu-lo-vui", T_FAMOUS + 0.25, 0.55);
  var FL = [T_CROWN + 0.05, T_FAMOUS + 0.42, T_COLD - 0.05];
  shots.push({ a: A2, b: DUR, ten: "bìa tạp chí, vương miện băng, tạo dáng", ve: function (t, lt, T) {
    var o = { s: 0.92, x: 960, y: 960, flip: 1 };
    if (t < CL1) { o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.sq = key(t, [[A2, 1], [CL1, 1.08, "out"]]); o.arms = "shock"; }
    else if (t < T_CROWN) { o.px = 0; o.py = -14; o.brows = "up"; o.mouth = "oSmall"; }
    else {
      // dáng ngôi sao: tay phải giơ cao, tay trái chống hông, nháy mắt
      o.armR = [372, 40]; o.handR = "xoe"; o.armL = [104, 268]; o.handL = "tron";
      o.lean = key(t, [[T_CROWN, 0], [T_CROWN + 0.25, -7, "back"]]);
      o.eyes = "happy"; o.mouth = "smile"; o.noBlink = true;
      o.sq = key(t, [[T_CROWN, 0.9], [T_CROWN + 0.12, 1.08, "out"], [T_CROWN + 0.35, 1, "back"]]);
      if (t > T_COLD + 0.05) { o.shiver = 3; o.mouth = "chatter"; o.eyes = "open"; o.lid = 0.45; o.px = 0; o.py = 2; o.brows = "flat"; o.marks = "shiver"; }
    }
    var ck = seg(t, T_CROWN, T_CROWN + 0.3);
    if (ck > 0) o.propFront = VT.iceCrown({ x: 200, y: 26, s: 0.78 * VT.ease.back(ck), glint: (Math.round(t * 12) % 3 === 0) ? 1 : 0.4 });
    var out = VT.sky("#BFD9EA", 1) + VT.ridge(700, 0, "#E3EEF3") + VT.snowGround(960) + VT.diamondDust(t, 12, [500, 140, 1420, 900]);
    out += W(t, o);
    out += VT.coverFrame({ x: 960, y: 590, w: 760, h: 900, k: seg(t, CL, CL1), color: C.accent2 });
    var over = VT.dreamFrame(t);
    FL.forEach(function (ft, i) { if (t >= ft && t < ft + 0.35) over += VT.flash({ x: [380, 1560, 420][i], y: [300, 360, 820][i], k: seg(t, ft, ft + 0.35), s: 0.9 }); });
    // lao vào cận mặt lúc vương miện mọc (26,2 s tuyệt đối), giữ ~0,6 s rồi lùi ra lại bìa tạp chí
    var face = VT.wobPt(o, 200, 110);
    var cz = key(T, [[A2, 0], [T_CROWN - 0.04, 0], [T_CROWN + 0.12, 1, "out"], [T_FAMOUS + 0.62, 1], [T_FAMOUS + 0.95, 0, "io3"]]);
    var z = VT.lerp(key(T, [[A2, 1.0], [T_CROWN, 1.02], [DUR, 1.1, "sine"]]), 2.3, cz);
    return { cam: [VT.lerp(960, face[0], cz), VT.lerp(key(T, [[A2, 560], [DUR, 520, "sine"]]), face[1], cz), z], shake: VT.shake(t, CL1, 0.2, 8), world: out, over: over, tint: "warm" };
  } });
  FL.forEach(function (ft) { VT.sfx("pop", ft, 0.35); });
  return shots;
};
