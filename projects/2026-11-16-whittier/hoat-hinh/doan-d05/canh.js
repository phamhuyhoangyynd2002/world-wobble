/* d05 · vẽ tay · cầu một làn kéo dài → bãi chờ (giữ bố cục d04: đèn đỏ bên trái, xe đỏ của Wob ở làn đầu, cổng hầm bên phải)
 * → tàu chạy qua, đếm toa → xe ngược chiều ai cũng đọc lịch → giờ trễ 15–30 min → mui xe nuốt Wob → luật lạnh 32°F · 0°C, cổng hé-khép-hé (46,66 s).
 * Vào "chen", ra "giay". Đồ: mũ len kem bông đỏ (lệch sau gag mui), khăn kem, giày đỏ, ba lô ô liu cuộn thảm đỏ; tờ lịch trên vô lăng.
 * Tài xế giấy và người que: dạng chung, không mặt.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink;
  var tu = VT.tu;
  var T_BRIDGE = tu("bridge", 0), T_LIGHT = tu("light."), T_NOW = tu("Now"), T_MILES = tu("miles"), T_FOUR = tu("four"), T_TRAIN0 = tu("train", 0), T_IT1 = tu("borrowed");
  var T_WIN = tu("window", 0), T_COUNT = tu("counted"), T_CARR = tu("carriages."), T_THEN = tu("Then"), T_OTHER = tu("way."), T_WAVED = tu("waved"), T_BACK = tu("back."), T_BUSY = tu("busy"), T_TT = tu("timetables.");
  var T_SAYS = tu("says"), T_FIFT = tu("fifteen", 0), T_NOTE = tu("note"), T_MINE = tu("mine."), T_RENTAL = tu("rental"), T_CLOSE = tu("close"), T_WREST = tu("wrestled"), T_WATCH = tu("watched.");
  var T_COLD = tu("cold"), T_32 = tu("thirty-two"), T_ZERO = tu("zero"), T_TRAFFIC = tu("traffic", 2), T_FIVE = tu("five"), T_WINDOW = tu("window.");
  var G = 860, CX = 980, RED = "#B04A3A";
  var T_ENGULF = T_WREST - 0.1;
  function hat(t) { return t < T_ENGULF ? "kem" : { rot: -14 }; }
  function W(t, o) {
    var b = { t: t, s: 0.55, x: CX - 80, y: G - 30, scarf: "kem", packColor: "oliu", flip: 1, cold: true };
    b.beanie = hat(t);
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 3.0, 0.9));
    return VT.wob(b);
  }
  function lot(t, o) { // bãi chờ: trời xám, núi tuyết, các làn ngang, đèn đỏ tiền cảnh trái, cổng hầm phải
    o = o || {};
    var s = VT.sky("#C3CCCF") + VT.ridge(470, 0) + '<rect x="-1200" y="560" width="4320" height="1400" fill="#8F989C"/>';
    [600, 700, 900].forEach(function (y) { s += VT.line("M -1200 " + y + " L 3100 " + y, 6, "#E8E8E0", 0.9); });
    s += VT.tunnelGate({ x: 1820, y: 900, s: 0.75, open: o.gate || 0 });
    s += VT.convertible({ x: CX, y: G + 60, s: 1, part: "back", color: RED, roof: o.roof || 0 });
    return s;
  }
  function carFront(t) { return VT.convertible({ x: CX, y: G + 60, s: 1, part: "front", color: RED, run: t }); }
  function fg(t, state) { return VT.signal({ x: 230, y: 1080, s: 1.5, state: state || "red" }); }
  function tt(x, y, s, o) { o = o || {}; return VT.timetable({ x: x, y: y, s: s, w: 260, h: 320, rot: o.rot || -6, lines: 7, texts: o.texts }); }

  VT.sfx("rise", T_NOW + 0.2, 0.5);
  VT.sfx("pop", T_MILES, 0.4); VT.sfx("pop", T_FOUR, 0.4);
  VT.sfx("whoosh", T_TRAIN0, 0.4);
  VT.sfx("pop", T_FIFT, 0.4);
  VT.sfx("im-lang", T_MINE + 0.2, 0.5);
  VT.sfx("whoosh", T_ENGULF, 0.55); VT.sfx("bonk", T_ENGULF + 0.25, 0.6);
  VT.sfx("brr", T_32, 0.45); VT.sfx("ting", T_ZERO, 0.4);
  VT.sfx("may-no", T_FIVE - 0.3, 0.55); VT.sfx("bonk", T_FIVE + 0.25, 0.35);

  var shots = [];
  // S0 · bong bóng tưởng tượng: cầu một làn, đèn đổi chiều, hai hàng xe chờ (khung đầu rõ)
  var B0 = T_NOW - 0.1, BY = 640;
  function bridgeScene(t, len, x0) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#EAF2F4"/>' + '<rect x="-1200" y="' + (BY + 120) + '" width="4320" height="900" fill="#9CC8DC"/>';
    s += VT.bridge1({ x: x0, y: BY, len: len });
    s += VT.signal({ x: x0 - 40, y: BY, s: 0.45, state: "green" }) + VT.signal({ x: x0 + len + 40, y: BY, s: 0.45, state: "red" });
    s += '<rect x="-1200" y="' + BY + '" width="' + (x0 + 1200) + '" height="40" fill="#8F989C"/>' + '<rect x="' + (x0 + len) + '" y="' + BY + '" width="3000" height="40" fill="#8F989C"/>';
    [0, 1, 2].forEach(function (i) { s += VT.boxCar({ x: x0 - 200 - i * 230, y: BY, s: 0.42, color: ["#B8443A", "#5E8FB0", "#E2B33C"][i] }); s += VT.boxCar({ x: x0 + len + 200 + i * 230, y: BY, s: 0.42, sx: -1, color: ["#7C8646", "#B8443A", "#5E8FB0"][i] }); });
    return s;
  }
  shots.push({ a: 0, b: B0, ten: "bong bóng: cầu một làn", ve: function (t, lt, T) {
    var s = bridgeScene(t, 520, 700);
    s += VT.wob({ t: t, s: 0.3, x: 380, y: BY - 50, beanie: "kem", scarf: "kem", packColor: "oliu", cold: true, mouth: "content", px: 10, lid: VT.blink(t, 3, 0.2) });
    return { cam: [960, 560, key(T, [[0, 1.0], [B0, 1.04]])], world: s, over: VT.dreamFrame(t, {}), tint: "cold" };
  } });
  // S1 · hai bàn tay kéo cầu dài như kẹo cao su; đầu cầu chui vào núi; ~2.5 mi rồi ~4 km; tàu chui vào cầu
  var B1 = T_IT1 + 0.1;
  shots.push({ a: B0, b: B1, ten: "kéo cầu như kẹo cao su", ve: function (t, lt, T) {
    var stretch = key(t, [[B0, 0], [T_MILES, 0.55, "io"], [T_FOUR + 0.3, 1, "io"]]);
    var x0 = 700 - 500 * stretch, len = 520 + 2300 * stretch;
    var s = bridgeScene(t, len, x0);
    // núi nuốt đầu phải
    s += VT.shape("M " + f(x0 + len - 200) + " " + (BY + 140) + " L " + f(x0 + len + 300) + " " + (BY - 420) + " L " + f(x0 + len + 900) + " " + (BY + 140) + " Z", "#9AA7AE", { sw: 7 }) + VT.shape("M " + f(x0 + len + 210) + " " + (BY - 300) + " L " + f(x0 + len + 300) + " " + (BY - 420) + " L " + f(x0 + len + 390) + " " + (BY - 300) + " Z", VT.C.snow, { sw: 5 });
    if (t < T_FOUR + 0.4) { // hai bàn tay chung kéo hai đầu
      s += VT.handGeneric({ x: x0 - 30, y: BY - 20, s: 0.8, rot: 180, sleeve: "#6B8FA6" }) + VT.handGeneric({ x: x0 + len + 30, y: BY - 20, s: 0.8, sleeve: "#6B8FA6" });
    }
    var lab = t < T_FOUR - 0.05 ? "~2.5 mi" : "~4 km", kl = VT.ease.back(seg(t, (t < T_FOUR - 0.05 ? T_MILES : T_FOUR) - 0.05, (t < T_FOUR - 0.05 ? T_MILES : T_FOUR) + 0.2));
    if (t > T_MILES - 0.05) s += VT.g("translate(" + f(x0 + len / 2) + " " + (BY - 260) + ") scale(" + f(1.6 * kl) + ")", VT.rectS(-170, -50, 170, 34, "#FFFDF6", { sw: 6 }) + VT.text(0, 14, lab, 62, { fill: "#2c4f6e" }));
    if (t > T_TRAIN0 - 0.2) { var kx = seg(t, T_TRAIN0 - 0.2, B1 + 0.5); s += VT.train({ x: x0 - 400 + kx * 1500, y: BY, s: 0.42, n: 4, t: t }); }
    var z = key(T, [[B0, 1.04], [T_FOUR + 0.3, 0.62, "io"], [B1, 0.6]]);
    return { cam: [960, 520, z], world: s, over: VT.dreamFrame(t, {}), tint: "cold" };
  } });
  // S2 · bãi chờ: đoàn tàu chạy ngang ngay trước mũi xe; Wob đếm toa: ngón tay → giày đỏ → chỉ bánh xe
  var B2 = T_THEN - 0.15;
  shots.push({ a: B1, b: B2, ten: "tàu qua, đếm toa", ve: function (t, lt, T) {
    var up = VT.ease.out(seg(t, B1, B1 + 0.4)), WY = G - 30 - 45 * up;
    var o = { y: WY, px: -14, py: -6, brows: "up", mouth: "content", flip: -1 };
    var c = t - T_COUNT, extra = "";
    var wo = { x: CX - 80, y: WY, s: 0.55, flip: -1 };
    if (c > -0.6 && c < 0.6) { var n = Math.floor(VT.twos(t) * 4) % 2; o.armR = [380, 60 + n * 30]; o.handR = "xoe"; o.armL = [20, 60 + (1 - n) * 30]; o.handL = "xoe"; o.mouth = "oSmall"; }
    if (c >= 0.6 && c < 1.3) { o.brows = "worried"; o.mouth = "wobbly"; o.armL = [60, 300]; o.handL = "nam"; var hp = VT.wobPt(wo, 120, 170), hip = VT.wobPt(wo, 230, 300);
      extra = VT.line("M " + f(hip[0]) + " " + f(hip[1]) + " Q " + f(hp[0] + 40) + " " + f(hip[1] - 20) + " " + f(hp[0]) + " " + f(hp[1]), 9) + VT.g("translate(" + f(hp[0]) + " " + f(hp[1]) + ") rotate(-40)", VT.ell(0, 0, 32, 14, "#d9543c", 5)); }
    if (c >= 1.3) { o.armR = [420, 330]; o.handR = "chi"; o.mouth = "flat"; o.px = -10; o.py = 18; o.brows = "flat"; }
    var tx = key(t, [[B1, -300], [B2 + 2, 3400]]);
    var s = lot(t) + VT.train({ x: tx, y: 690, s: 0.75, n: 7, t: t }) + VT.convertible({ x: CX, y: G + 60, s: 1, part: "back", color: RED });
    s += W(t, o) + carFront(t) + extra + tt(CX + 230, G - 120, 0.45) + fg(t);
    if (c >= 1.3) { var wh = [CX + 200, G + 40]; s += VT.sparkle({ x: wh[0], y: wh[1] - 60, s: 0.35 }); }
    return { cam: [CX + 20, G - 200, key(T, [[B1, 1.3], [B2, 1.36]])], world: s, tint: "cold" };
  } });
  // S3 · hàng xe ngược chiều qua; Wob vẫy nhiệt tình; tài xế giấy nào cũng giơ tờ lịch che mặt
  var B3 = T_BACK - 0.6, B4 = T_SAYS - 0.6;
  function oncoming(t, t0, speed) {
    var s = "";
    for (var i = 0; i < 6; i++) {
      var x = 2400 - (t - t0) * speed + i * 520;
      if (x < -600 || x > 2700) continue;
      var col = ["#5E8FB0", "#7C8646", "#E2B33C", "#6B5A48", "#9AA7AE", "#5E8FB0"][i];
      s += VT.boxCar({ x: x, y: 650, s: 0.6, sx: -1, color: col }) +
        VT.g("translate(" + f(x + 20) + " 520)", VT.ell(0, 0, 22, 22, "#F6EEDC", 5) + VT.rectS(-46, -30, 10, 40, "#FFFDF6", { sw: 4 }) + VT.line("M -38 -10 L 0 -10 M -38 6 L -6 6 M -38 22 L 2 22", 3, INK, 0.5));
    }
    return s;
  }
  shots.push({ a: B2, b: B3, ten: "xe ngược chiều, Wob vẫy", ve: function (t, lt, T) {
    var wv = t > T_WAVED - 0.1 ? Math.sin(VT.twos(t) * 16) : 0;
    var o = { px: 12, py: -14, brows: "up", mouth: t > T_WAVED ? "smile" : "content" };
    if (t > T_WAVED - 0.1) { o.armR = [360 + wv * 40, 20]; o.handR = "xoe"; o.eyes = "happy"; }
    var s = lot(t) + oncoming(t, T_THEN, 380) + W(t, o) + carFront(t) + fg(t);
    return { cam: [CX + 120, G - 220, key(T, [[B2, 1.0], [B3, 1.06]])], world: s, tint: "cold" };
  } });
  shots.push({ a: B3, b: B4, ten: "ai cũng đọc lịch", ve: function (t, lt, T) {
    var wv = Math.sin(VT.twos(t) * 16) * (1 - seg(t, T_BACK, T_BUSY));
    var o = { px: 14, py: -10, brows: "up", mouth: "smile", armR: [360 + wv * 40, 20], handR: "xoe" };
    if (t > T_BACK) { o.mouth = "flat"; o.eyes = "open"; o.brows = "flat"; o.lid = 0.3; }
    if (t > T_TT) { o.armR = null; o.handR = null; o.lid = 0.5; o.noBlink = true; }
    var s = lot(t) + oncoming(t, T_THEN, 380) + W(t, o) + carFront(t) + fg(t);
    return { cam: [key(T, [[B3, CX + 300], [B4, CX + 260]]), G - 300, key(T, [[B3, 1.6], [B4, 1.7]])], world: s, tint: "cold" };
  } });
  // S4 · cận tờ lịch trên vô lăng: ngón tay dò dòng chữ nhỏ; 15–30 min
  var B5 = T_NOTE - 0.3;
  shots.push({ a: B4, b: B5, ten: "dò lịch: 15–30 min", ve: function (t, lt, T) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#8F989C"/>';
    var kl = seg(t, T_FIFT - 0.05, T_FIFT + 0.2);
    s += VT.timetable({ x: 960, y: 560, s: 2.2, w: 520, h: 420, rot: -3, lines: 6, texts: kl > 0 ? [[0, 150, "15–30 min", 46, "#A8361F"]] : [] });
    var ln = key(t, [[B4, 0], [T_FIFT - 0.1, 1, "io"]]), fx = VT.lerp(560, 1260, ln), fy = 330 + Math.floor(ln * 3) * 80;
    if (kl > 0) { fx = 1300; fy = 860; }
    s += VT.line("M " + f(fx + 40) + " " + f(fy + 40) + " L " + f(fx + 300) + " " + f(fy + 380), 26) + VT.line("M " + f(fx + 40) + " " + f(fy + 40) + " L " + f(fx + 300) + " " + f(fy + 380), 16, VT.WOB_COLORS.ink) + VT.ell(fx, fy, 30, 30, "#FFFDF6", 6) + VT.line("M " + f(fx) + " " + f(fy) + " l -40 -30", 10);
    if (kl > 0 && kl < 1) s += VT.sparkle({ x: 1180, y: 840, s: 0.5 });
    return { cam: [key(T, [[B4, 920], [B5, 960]]), 600, key(T, [[B4, 1.0], [B5, 1.06]])], world: s, tint: "cold" };
  } });
  // S5 · giữ tỉnh bơ: Wob chậm rãi nhìn lên mui xe đang mở (gấp phía sau)
  var B6 = T_RENTAL - 0.2;
  shots.push({ a: B5, b: B6, ten: "nhìn lên mui xe", ve: function (t, lt, T) {
    var k = VT.ease.io(seg(t, T_NOTE, T_MINE + 0.3));
    var o = { px: VT.lerp(12, -16, k), py: VT.lerp(14, -16, k), brows: "flat", mouth: "flat", lid: 0.35, noBlink: true };
    var s = lot(t) + W(t, o) + carFront(t) + tt(CX + 230, G - 120, 0.45) + fg(t);
    var c = VT.wobPt({ x: CX - 80, y: G - 30, s: 0.55 }, 160, 160);
    return { cam: [c[0] - 60, c[1] - 60, key(T, [[B5, 2.8], [B6, 3.0, "sine"]])], world: s, tint: "cold" };
  } });
  // S6 · Wob đứng trên ghế vật lộn kéo mui; mui bật ngược trùm kín Wob, chỉ còn đôi giày đỏ đạp; người que xe sau vỗ tay chậm
  var B7 = T_COLD - 0.35;
  shots.push({ a: B6, b: B7, ten: "mui xe nuốt Wob", ve: function (t, lt, T) {
    var stand = seg(t, T_CLOSE - 0.4, T_CLOSE);
    var tug = t > T_CLOSE + 0.5 && t < T_ENGULF ? Math.abs(Math.sin(VT.twos(t) * 7)) : 0;
    var roof = t < T_ENGULF ? 0.15 + 0.35 * tug : 1;
    var o = { y: G - 30 - 130 * stand, legs: "stand", px: 10, py: -8, brows: t > T_CLOSE + 0.5 ? "down" : "flat", mouth: t > T_CLOSE + 0.5 ? "wobbly" : "flat" };
    if (t > T_CLOSE + 0.5) { o.armL = [40, 40]; o.armR = [120, 20]; o.handL = o.handR = "nam"; o.lean = -12 - 8 * tug; o.marks = "sweat"; }
    var s = lot(t, { roof: t < T_ENGULF ? roof : 0 });
    // xe sau (bên trái, phía xa) có người que vỗ tay chậm
    s += VT.boxCar({ x: 300, y: 700, s: 0.55, color: "#5E8FB0" });
    var clap = t > T_WATCH - 0.4 ? Math.max(0, Math.sin((t - T_WATCH) * 6)) : 0.5;
    s += VT.g("translate(330 560)", VT.ell(0, 0, 22, 22, "#F6EEDC", 5) + VT.line("M -10 40 L " + f(-20 + 14 * clap) + " 10 M 10 40 L " + f(20 - 14 * clap) + " 10", 7));
    if (t < T_ENGULF) s += W(t, o);
    else { // khối mui vải trùm kín; giày đỏ đạp đạp
      var kk = VT.ease.out(seg(t, T_ENGULF, T_ENGULF + 0.25)), kick = Math.sin(VT.twos(t) * 18) * 16;
      var cx0 = CX - 80, cy0 = G - 230;
      var shoes = VT.line("M " + (cx0 - 20) + " " + (cy0 + 115) + " L " + (cx0 - 40 + kick) + " " + (cy0 + 165), 12) + VT.line("M " + (cx0 + 30) + " " + (cy0 + 115) + " L " + (cx0 + 50 - kick) + " " + (cy0 + 165), 12) + VT.ell(cx0 - 44 + kick, cy0 + 172, 30, 13, "#d9543c", 5) + VT.ell(cx0 + 54 - kick, cy0 + 172, 30, 13, "#d9543c", 5);
      s += VT.shape(VT.smooth([[cx0 - 170, cy0 + 130], [cx0 - 190, cy0 - 40 * kk], [cx0 - 60, cy0 - 170 * kk], [cx0 + 110, cy0 - 140 * kk], [cx0 + 190, cy0 + 20], [cx0 + 160, cy0 + 130]], true), "#3a3f44", { sw: 7 });
      s += VT.line("M " + (cx0 - 120) + " " + (cy0 + 40) + " C " + (cx0 - 40) + " " + (cy0 - 40) + " " + (cx0 + 60) + " " + (cy0 - 30) + " " + (cx0 + 130) + " " + (cy0 + 50), 4, "#888");
      if (t < T_ENGULF + 0.25) s += VT.impact({ x: cx0, y: cy0 - 120, s: 0.5 });
    }
    s += carFront(t) + (typeof shoes !== "undefined" ? shoes : "") + fg(t);
    return { cam: [key(T, [[B6, CX], [T_ENGULF, CX - 60, "io"], [B7, CX - 200]]), key(T, [[B6, G - 200], [T_ENGULF, G - 250]]), key(T, [[B6, 1.5], [T_ENGULF, 1.65, "io"], [T_WATCH, 1.2, "io"], [B7, 1.15]])], shake: VT.shake(t, T_ENGULF + 0.25, 0.23, 8), world: s, tint: "cold" };
  } });
  // S7 · cổng hầm: nhiệt kế giấy tụt về 32°F · 0°C, GIỮ 0,6 s; rồi đồng hồ quay nhanh, cổng chỉ hé ở 5 phút cuối: hé, khép, hé
  var B8 = T_TRAFFIC - 0.3;
  function gateScene(t, gate, clockA, wedge) {
    var s = lot(t, { gate: gate, roof: 1 });
    // nhiệt kế giấy và đồng hồ gắn trên cổng
    var lv = key(t, [[B7, 0.8], [T_32 - 0.1, 0.8], [T_32 + 0.6, 0.35, "io"]]);
    s += VT.thermoMini({ x: 1600, y: 590, s: 0.8, level: lv, color: lv < 0.5 ? "#5a9fb8" : "#d9543c" });
    var kt = VT.ease.back(seg(t, T_32 - 0.05, T_32 + 0.2));
    if (kt > 0) s += VT.g("translate(1600 330) scale(" + f(kt) + ")", VT.rectS(-170, -42, 170, 30, "#FFFDF6", { sw: 5 }) + VT.text(0, 12, "32°F · 0°C", 50, { fill: "#2c4f6e" }));
    s += VT.clockFace({ x: 2030, y: 420, r: 70, a: clockA, wedge: wedge });
    var k5 = VT.ease.back(seg(t, T_FIVE - 0.05, T_FIVE + 0.2));
    if (k5 > 0) s += VT.g("translate(2030 290) scale(" + f(k5) + ")", VT.rectS(-100, -40, 100, 28, "#FFFDF6", { sw: 5 }) + VT.text(0, 10, "5 min", 48, { fill: "#A8361F" }));
    return s;
  }
  shots.push({ a: B7, b: B8, ten: "nhiệt kế tụt, giữ", ve: function (t, lt, T) {
    var o = { px: 16, py: -8, brows: "up", mouth: "o", shiver: t > T_32 ? 2 : 0, marks: t > T_32 + 0.3 && t < T_ZERO ? "shiver" : null };
    var s = gateScene(t, 0, 0, null) + W(t, o) + carFront(t);
    return { cam: [key(T, [[B7, 1640], [B8, 1650]]), key(T, [[B7, 470], [B8, 480]]), key(T, [[B7, 2.0], [B8, 2.15, "sine"]])], world: s, tint: "cold" };
  } });
  shots.push({ a: B8, b: D.thoi_luong, ten: "đồng hồ quay, cổng hé-khép-hé", ve: function (t, lt, T) {
    var spin = key(t, [[B8, 0], [T_FIVE - 0.2, 300, "io"], [D.thoi_luong, 330]]);
    var gate = key(t, [[B8, 0], [T_FIVE - 0.3, 0], [T_FIVE, 0.35, "out"], [T_FIVE + 0.3, 0.08, "in"], [T_WINDOW + 0.1, 0.08], [T_WINDOW + 0.4, 0.4, "out"]]);
    var o = { px: 16, py: -4, brows: "up", mouth: "content", armR: [400, 260], handR: "nam" };
    if (t > T_FIVE + 0.25) { o.brows = "worried"; o.mouth = "wobbly"; }
    if (t > T_WINDOW + 0.4) { o.brows = "up"; o.mouth = "o"; }
    var s = gateScene(t, gate, spin, t > T_FIVE - 0.2 ? [300, 360] : null) + W(t, o) + carFront(t) + fg(t);
    return { cam: [1400, 600, key(T, [[B8, 0.95], [D.thoi_luong, 1.0]])], world: s, tint: "cold" };
  } });
  return shots;
};
