/* d02 · vẽ tay · lông mi que băng, máy ảnh bỏ cuộc (4,9–10,9 s tuyệt đối; 6 s). Vào "cat", ra "cat".
 * Tái dụng hoat-hinh/_cu-21-11/d08/canh.js (S0 take chậm lông mi, S2 máy ảnh nhìn trời, S3 phụt khói tắt ngấm), mốc lấy lại từ du-lieu.js mới.
 * S0 cận mặt: liếc lên, lác mắt nhìn que băng, dừng, hoảng đúng "eyelashes"; giữ.
 * S1 trung cảnh: mép tấm biển bé ở 1/3 trái làm tiền cảnh; máy ảnh "nhìn" trời ở "look".
 * S2 cận máy: phụt khói ở "switched", màn hình tắt ở "off"; nhịp 3 Wob lắc máy một cái, máy im, Wob nhìn thẳng người xem, giữ tới cú cắt.
 * Đồ: mũ len đỏ, khăn đỏ, ba lô, lông mi que băng; máy ảnh tay phải, đèn pin tắt tay trái. Không chữ (chu_tren_do_vat rỗng: biển trơn).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, DUR = D.thoi_luong;
  var T_LASH = VT.tu("eyelashes", 0);
  var T_CAMERA = VT.tu("camera"), T_LOOK = VT.tu("look"), T_WEATHER = VT.tu("weather", 0), T_SWITCHED = VT.tu("switched"), T_OFF = VT.tu("off");
  var T_HOLD = VT.nhip(2);

  function W(t, o) {
    var b = { t: t, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && (b.eyes || "open") === "open") b.lid = Math.max(b.lid || 0, VT.blink(t, 3.0, 0.6));
    return VT.wob(b);
  }
  var GROUND = 820, NIGHT = "#2F3E5E";
  function stars(t) {
    var s = "", st = Math.round(t * 12);
    for (var i = 0; i < 46; i++) {
      var x = -1100 + VT.hash(i * 3.1) * 4100, y = -1100 + VT.hash(i * 7.3) * 1600, on = VT.hash(i * 1.9 + Math.floor(st / 4) * 0.31) > 0.25;
      s += VT.dot(x, y, on ? 3.5 + VT.hash(i) * 3 : 2, "#F4F6FB");
    }
    return s;
  }
  function night(t) {
    var s = VT.sky(NIGHT, 1) + stars(t);
    s += VT.ridge(600, -200, "#8EA2BC") + VT.ridge(680, 300, "#B4C3D5");
    s += VT.farHouses(712, -300, t, 9);
    s += VT.shape("M -1200 " + (GROUND + 8) + " C -300 " + (GROUND + 20) + " 400 " + (GROUND - 12) + " 1000 " + (GROUND + 10) + " C 1700 " + (GROUND - 8) + " 2400 " + (GROUND + 12) + " 3200 " + GROUND + " L 3200 2400 L -1200 2400 Z", "#D3DFEA", { sw: 6, ox: 0, oy: 5 });
    s += VT.line("M 200 " + (GROUND + 90) + " C 400 " + (GROUND + 80) + " 600 " + (GROUND + 100) + " 800 " + (GROUND + 92), 4, "#8EA2BC", 0.6);
    s += VT.diamondDust(t, 14, [-200, 200, 2200, 800]);
    return s;
  }
  // tấm biển bé làm vật tiền cảnh (biển trơn, không chữ), vẽ SAU Wob
  function signFront(x) { return VT.signTiny({ x: x, y: GROUND + 120, s: 0.85, w: 480, board: VT.C.white }); }
  function torchL(o, hx, hy, rot) { var p = VT.wobPt(o, hx, hy); return VT.torch({ x: p[0] + 10, y: p[1] + 6, s: 0.5, rot: rot == null ? 70 : rot }); }

  var WX = 940, WS = 0.62, shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · cận mặt: take chậm lông mi =====
  var B0 = T_CAMERA - 0.16;
  var T_GLANCE = 0.12, T_STILL = 0.4, T_SHOCK = T_LASH - 0.02;
  VT.sfx("liu-lo-soc", T_SHOCK, 0.7); VT.sfx("pop", T_SHOCK + 0.02, 0.45);
  shot(0, B0, "lông mi băng, take chậm", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, armR: [326, 250], handR: "nam", armL: [70, 300], handL: "nam", mouth: "content" };
    o.prop = VT.photoCam({ x: 330, y: 250, s: 0.5, side: "back" });
    if (t >= T_GLANCE && t < T_STILL) { o.py = -14; o.noBlink = true; o.mouth = "flat"; }
    if (t >= T_STILL && t < T_SHOCK) { o.eyes = "cross"; o.noBlink = true; o.mouth = "flat"; o.brows = "flat"; }
    if (t >= T_SHOCK) {
      o.eyes = "wide"; o.py = -10; o.brows = "up"; o.mouth = "o"; o.noBlink = true; o.marks = "shock";
      o.sq = key(t, [[T_SHOCK, 1.12], [T_SHOCK + 0.35, 1, "elastic"]]);
    }
    var out = night(t) + W(t, o) + torchL(o, 70, 300);
    var face = VT.wobPt(o, 200, 150);
    if (t >= T_STILL && t < T_SHOCK) out += VT.sparkle({ x: face[0] + 38, y: face[1] - 48, s: 0.3 });
    if (t >= T_SHOCK) out += VT.bubble({ x: face[0] + 150, y: face[1] - 110, s: key(t, [[T_SHOCK, 0.1], [T_SHOCK + 0.12, 0.42, "back"]]), sym: "?!", tail: -1 });
    var z = key(T, [[0, 3.0], [T_SHOCK, 3.25, "sine"], [T_SHOCK + 0.1, 3.0, "out"], [B0, 3.1, "sine"]]);
    return { cam: [face[0] + 20, face[1] + 10, z], shake: VT.shake(t, T_SHOCK, 0.22, 4), world: out, tint: "cold" };
  });

  // ===== S1 · trung cảnh, biển bé tiền cảnh 1/3 trái: máy ảnh nhìn trời ở "look" =====
  var B1 = T_SWITCHED - 0.12;
  shot(B0, B1, "máy ảnh nhìn trời", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, px: 4, py: -14, mouth: "content" };
    var up = key(t, [[B0, 0], [B0 + 0.35, 1, "back"]]);
    o.armL = [VT.lerp(160, 140, up), VT.lerp(270, 230, up)]; o.armR = [VT.lerp(320, 232, up), VT.lerp(250, 30, up)]; o.handL = "nam"; o.handR = "nam";
    var lookUp = key(t, [[T_LOOK - 0.1, 0], [T_LOOK + 0.05, 1, "out"], [T_WEATHER + 0.15, 1], [T_WEATHER + 0.3, -0.2, "out"]]);
    var camC = VT.wobPt(o, 232, VT.lerp(250, 10, up));
    var jit = t > T_WEATHER + 0.3 ? (VT.hash(Math.round(t * 12)) - 0.5) * 8 : 0;
    var out = night(t) + W(t, o) + torchL(o, o.armL[0], o.armL[1], 40) + VT.photoCam({ x: camC[0] + jit, y: camC[1], s: 0.55, eye: [0, -lookUp] });
    if (t > T_WEATHER + 0.3) out += VT.line("M " + f(camC[0] - 70) + " " + f(camC[1] - 20) + " l -14 -6 M " + f(camC[0] + 70) + " " + f(camC[1] - 20) + " l 14 -6", 4, "#ffffff", 0.9);
    if (t >= T_LOOK && t < T_WEATHER + 0.3) out += VT.speedLines({ x0: camC[0] - 60, y0: camC[1] - 300, n: 4, gap: 40, len: 120, dx: 0, dy: -1, sw: 3, color: "#F4F6FB" });
    out += signFront(600);
    var z = key(T, [[B0, 2.05], [B1, 2.2, "sine"]]);
    return { cam: [WX - 40, key(T, [[B0, 600], [B1, 560, "sine"]]), z], world: out, tint: "cold" };
  });

  // ===== S2 · cận máy ảnh: phụt khói, tắt ngấm; lắc một cái; nhìn người xem tỉnh bơ =====
  var T_SH0 = T_HOLD, T_SH1 = T_HOLD + 0.38, T_DEAD = T_SH1 + 0.08;
  VT.sfx("hoi-nuoc", T_SWITCHED, 0.6);
  shot(B1, DUR, "máy ảnh tắt ngấm, Wob tỉnh bơ", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, px: 12, py: 10, mouth: "flat" };
    var sh = t >= T_SH0 && t < T_SH1 ? Math.sin((t - T_SH0) * 34) * 26 : 0;
    o.armL = [318 + sh * 0.6, 262]; o.armR = [420 + sh * 0.6, 262]; o.handL = "nam"; o.handR = "nam";
    if (t >= T_SWITCHED && t < T_OFF) { o.eyes = "wide"; o.mouth = "oSmall"; o.brows = "up"; o.noBlink = true; }
    if (t >= T_OFF && t < T_SH0) { o.brows = "worried"; o.mouth = "wobbly"; }
    if (t >= T_SH0 && t < T_DEAD) { o.brows = "down"; o.mouth = "chatter"; }
    if (t >= T_DEAD) { o.px = 0; o.py = 3; o.lid = 0.5; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; }
    var c = VT.wobPt(o, 370 + sh * 0.6, 262), off = t >= T_OFF;
    var cam = VT.photoCam({ x: c[0], y: c[1], s: 0.62, eye: [0, 0], screen: off ? "off" : "on" });
    if (off) cam += VT.line("M " + f(c[0] - 18) + " " + f(c[1] + 4) + " Q " + f(c[0]) + " " + f(c[1] + 14) + " " + f(c[0] + 18) + " " + f(c[1] + 4), 5, "#9aa3a8");
    var out = night(t) + W(t, o) + cam;
    if (t >= T_SWITCHED && t < T_SWITCHED + 0.7) out += VT.puffBurst({ x: c[0] + 10, y: c[1] - 50, k: seg(t, T_SWITCHED, T_SWITCHED + 0.7), s: 0.45, spread: 50 });
    if (t >= T_SH0 && t < T_SH1 + 0.1) out += VT.line("M " + f(c[0] - 150) + " " + f(c[1] - 30) + " l -20 0 M " + f(c[0] - 150) + " " + f(c[1] + 10) + " l -26 0 M " + f(c[0] + 150) + " " + f(c[1] - 30) + " l 20 0 M " + f(c[0] + 150) + " " + f(c[1] + 10) + " l 26 0", 5, "#F4F6FB");
    var face = VT.wobPt(o, 200, 150);
    var z = key(T, [[B1, 2.05], [T_SH1, 2.18, "sine"], [T_DEAD + 0.1, 2.5, "out"], [DUR, 2.58, "sine"]]);
    var k = VT.ease.io3(seg(T, T_SH1, T_DEAD + 0.15));
    return { cam: [VT.lerp((face[0] + c[0]) / 2, face[0] + 20, k), VT.lerp((face[1] + c[1]) / 2, face[1] + 40, k), z], world: out, tint: "cold" };
  });
  return shots;
};
