/* d08 · vẽ tay · lông mi đóng băng, máy ảnh bỏ cuộc, ba lần đoán (84,93–116,93 s tuyệt đối; 32 s). Vào "cat", ra "cat".
 * S0–S5 mép làng ban đêm cạnh tấm biển bé (không chữ): lông mi bật ra rồi đóng băng (take chậm), lác mắt nhìn lông mi,
 *   máy ảnh "nhìn" trời rồi phụt khói tắt ngấm, Wob gãi đầu, chỉ xuống tuyết rồi camera lùi ra khoảng trắng mênh mông.
 * S6–S11 trang sổ phác thảo: bảng đoán ba ô (đánh dấu bằng chấm, không số). Ô 1 Wob vẽ núi rồi tối đen chỉ còn đôi mắt;
 *   ô 2 Wob gõ que xuống sông băng, sông gõ lại, que gãy, đầu que bật vào trán; ô 3 Wob mãn nguyện trước nhà, không nhìn trời
 *   (nhiệt kế tụt); Wob gật gù; dấu X đỏ đóng sập lên ô 3, Wob bật ngửa.
 * Đồ Wob: mũ len đỏ, khăn đỏ, ba lô; máy ảnh. Từ "froze": lông mi đóng băng (giữ tới hết). Không chữ (chu_tren_do_vat rỗng).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, DUR = D.thoi_luong;
  // ---- mốc từ lời ----
  var T_LASH = VT.tu("eyelashes", 0); // lời cảnh 4 mới (19/11): "My eyelashes froze." đã sang d07; d08 mở bằng "I didn't know I had eyelashes."
  var T_CAMERA = VT.tu("camera"), T_LOOK = VT.tu("look"), T_WEATHER = VT.tu("weather", 0), T_SWITCHED = VT.tu("switched"), T_OFF = VT.tu("off");
  var T_STANDING = VT.tu("standing"), T_QUESTION = VT.tu("question"), T_WHY = VT.tu("why"), T_SOMEBODY = VT.tu("somebody"), T_PICKED = VT.tu("picked");
  var T_SPOT = VT.tu("spot"), T_PURPOSE = VT.tu("purpose"), T_GUESSES = VT.tu("guesses");
  var T_FIRST = VT.tu("first"), T_VIEW = VT.tu("view"), T_DARK = VT.tu("dark");
  var T_SECOND = VT.tu("second"), T_FISHING = VT.tu("fishing"), T_TAPPED = VT.tu("tapped", 0), T_RIVER2 = VT.tu("river", 1), T_TAPPED2 = VT.tu("tapped", 1), T_BACK = VT.tu("back");
  var T_THIRD = VT.tu("third", 0), T_NOBODY = VT.tu("nobody"), T_WEATHER2 = VT.tu("weather", 1), T_MOVING = VT.tu("moving");
  var T_LIKED = VT.tu("liked"), T_THIRD3 = VT.tu("third", 2), T_WRONG = VT.tu("wrong");

  // ---- Wob mặc đồ của đoạn ----
  function W(t, o) {
    var b = { t: t, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && (b.eyes || "open") === "open") b.lid = Math.max(b.lid || 0, VT.blink(t, 3.0, 0.6));
    return VT.wob(b);
  }
  // ---- mép làng ban đêm ----
  var GROUND = 820, NIGHT = "#2F3E5E";
  function stars(t) {
    var s = "", st = Math.round(t * 12);
    for (var i = 0; i < 46; i++) {
      var x = -1100 + VT.hash(i * 3.1) * 4100, y = -1100 + VT.hash(i * 7.3) * 1600, on = VT.hash(i * 1.9 + Math.floor(st / 4) * 0.31) > 0.25;
      s += VT.dot(x, y, on ? 3.5 + VT.hash(i) * 3 : 2, "#F4F6FB");
    }
    return s;
  }
  function night(t, par, signX) { // signX: dời biển ra hẳn ngoài khung ở cận mặt (không để nửa chữ)
    par = par || 0;
    var s = VT.sky(NIGHT, 1) + stars(t);
    s += VT.ridge(600, -200 + par * 0.2, "#8EA2BC") + VT.ridge(680, 300 + par * 0.4, "#B4C3D5");
    s += VT.farHouses(712, -300 + par * 0.6, t, 9);
    s += VT.shape("M -1200 " + (GROUND + 8) + " C -300 " + (GROUND + 20) + " 400 " + (GROUND - 12) + " 1000 " + (GROUND + 10) + " C 1700 " + (GROUND - 8) + " 2400 " + (GROUND + 12) + " 3200 " + GROUND + " L 3200 2400 L -1200 2400 Z", "#D3DFEA", { sw: 6, ox: 0, oy: 5 });
    s += VT.line("M 200 " + (GROUND + 90) + " C 400 " + (GROUND + 80) + " 600 " + (GROUND + 100) + " 800 " + (GROUND + 92), 4, "#8EA2BC", 0.6);
    s += VT.signTiny({ x: signX || 1230, y: GROUND + 4, s: 0.55, w: 500, board: C.white, text: "OYMYAKON", size: 64 }); // biển làng như d07
    s += VT.diamondDust(t, 14, [-200, 200, 2200, 800]);
    return s;
  }
  var WX = 940, WS = 0.62;
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · cận mặt (nối d07: lông mi đã là que băng): Wob chưa biết → liếc lên, lác mắt nhìn que băng → dừng → hoảng đúng "eyelashes"; giữ =====
  var B0 = T_CAMERA - 0.16, B1 = B0;
  var T_GLANCE = 0.12, T_STILL = 0.42, T_SHOCK = T_LASH - 0.02;
  VT.sfx("pop", T_SHOCK + 0.02, 0.45); VT.sfx("liu-lo-soc", T_SHOCK, 0.7);
  shot(0, B0, "lông mi băng, take chậm", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, armR: [326, 250], handR: "nam", mouth: "content", lashes: 1, lashIce: true };
    o.prop = VT.photoCam({ x: 330, y: 250, s: 0.5, side: "back" });
    if (t >= T_GLANCE && t < T_STILL) { o.py = -14; o.noBlink = true; o.mouth = "flat"; }
    if (t >= T_STILL && t < T_SHOCK) { o.eyes = "cross"; o.noBlink = true; o.mouth = "flat"; o.brows = "flat"; }
    if (t >= T_SHOCK) {
      o.eyes = "wide"; o.py = -10; o.brows = "up"; o.mouth = "o"; o.noBlink = true; o.marks = "shock";
      o.sq = key(t, [[T_SHOCK, 1.12], [T_SHOCK + 0.35, 1, "elastic"]]); o.armL = [30, 150]; o.handL = "xoe";
    }
    var out = night(t, 0, 1700) + W(t, o);
    var face = VT.wobPt(o, 200, 150);
    if (t >= T_STILL && t < T_SHOCK) out += VT.sparkle({ x: face[0] + 38, y: face[1] - 48, s: 0.3 });
    if (t >= T_SHOCK) out += VT.bubble({ x: face[0] + 150, y: face[1] - 110, s: key(t, [[T_SHOCK, 0.1], [T_SHOCK + 0.12, 0.42, "back"]]), sym: "?!", tail: -1 });
    var z = key(T, [[0, 3.0], [T_SHOCK, 3.25, "sine"], [T_SHOCK + 0.1, 3.0, "out"], [B0, 3.1, "sine"]]);
    return { cam: [face[0] + 20, face[1] + 10, z], shake: VT.shake(t, T_SHOCK, 0.22, 4), world: out, tint: "cold" };
  });

  // ===== S2 · giơ máy ảnh lên trời: ống kính "nhìn" trời ở "look", rồi run =====
  var B2 = T_SWITCHED - 0.12;
  shot(B1, B2, "máy ảnh nhìn trời", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, px: 4, py: -14, mouth: "content" };
    var up = key(t, [[B1, 0], [B1 + 0.35, 1, "back"]]);
    o.armL = [VT.lerp(160, 168, up), VT.lerp(270, 30, up)]; o.armR = [VT.lerp(320, 232, up), VT.lerp(250, 30, up)]; o.handL = "nam"; o.handR = "nam";
    var lookUp = key(t, [[T_LOOK - 0.1, 0], [T_LOOK + 0.05, 1, "out"], [T_WEATHER + 0.15, 1], [T_WEATHER + 0.3, -0.2, "out"]]);
    var camC = VT.wobPt(o, 200, VT.lerp(250, 10, up));
    var jit = t > T_WEATHER + 0.3 ? (VT.hash(Math.round(t * 12)) - 0.5) * 8 : 0;
    var out = night(t) + W(t, o) + VT.photoCam({ x: camC[0] + jit, y: camC[1], s: 0.55, eye: [0, -lookUp] });
    if (t > T_WEATHER + 0.3) out += VT.line("M " + f(camC[0] - 70) + " " + f(camC[1] - 20) + " l -14 -6 M " + f(camC[0] + 70) + " " + f(camC[1] - 20) + " l 14 -6", 4, "#ffffff", 0.9);
    if (t >= T_LOOK && t < T_WEATHER + 0.3) out += VT.speedLines({ x0: camC[0] - 60, y0: camC[1] - 300, n: 4, gap: 40, len: 120, dx: 0, dy: -1, sw: 3, color: "#F4F6FB" });
    var z = key(T, [[B1, 2.1], [B2, 2.25, "sine"]]);
    return { cam: [WX + 20, key(T, [[B1, 620], [B2, 560, "sine"]]), z], world: out, tint: "cold" };
  });

  // ===== S3 · cận máy ảnh: phụt khói ("switched"), tắt ngấm ("off"), Wob lắc máy =====
  var G0 = VT.nhip(2), B3 = T_STANDING - 0.12, T_SHAKE0 = T_OFF + 0.08, T_SHAKE1 = G0 - 0.04;
  VT.sfx("hoi-nuoc", T_SWITCHED, 0.6);
  function camHold(t, o, sh) {
    var c = VT.wobPt(o, 370 + sh * 0.6, 262), off = t >= T_OFF;
    var cam = VT.photoCam({ x: c[0], y: c[1], s: 0.62, eye: [0, 0], screen: off ? "off" : "on" });
    if (off) cam += VT.line("M " + f(c[0] - 18) + " " + f(c[1] + 4) + " Q " + f(c[0]) + " " + f(c[1] + 14) + " " + f(c[0] + 18) + " " + f(c[1] + 4), 5, "#9aa3a8");
    return { c: c, svg: cam };
  }
  shot(B2, G0, "máy ảnh tắt ngấm", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, px: 12, py: 10, mouth: "flat" };
    var sh = t >= T_SHAKE0 && t < T_SHAKE1 ? Math.sin((t - T_SHAKE0) * 34) * 26 : 0;
    o.armL = [318 + sh * 0.6, 262]; o.armR = [420 + sh * 0.6, 262]; o.handL = "nam"; o.handR = "nam";
    if (t >= T_SWITCHED && t < T_OFF) { o.eyes = "wide"; o.mouth = "oSmall"; o.brows = "up"; o.noBlink = true; }
    if (t >= T_SHAKE0) { o.brows = "down"; o.mouth = "chatter"; o.shiver = 2; }
    var ch = camHold(t, o, sh), c = ch.c;
    var out = night(t) + W(t, o) + ch.svg;
    if (t >= T_SWITCHED && t < T_SWITCHED + 0.7) out += VT.puffBurst({ x: c[0] + 10, y: c[1] - 50, k: seg(t, T_SWITCHED, T_SWITCHED + 0.7), s: 0.45, spread: 50 });
    if (t >= T_SHAKE0) out += VT.line("M " + f(c[0] - 150) + " " + f(c[1] - 30) + " l -20 0 M " + f(c[0] - 150) + " " + f(c[1] + 10) + " l -26 0 M " + f(c[0] + 150) + " " + f(c[1] - 30) + " l 20 0 M " + f(c[0] + 150) + " " + f(c[1] + 10) + " l 26 0", 5, "#F4F6FB");
    var face = VT.wobPt(o, 200, 150);
    var z = key(T, [[B2, 2.05], [G0, 2.18, "sine"]]);
    return { cam: [(face[0] + c[0]) / 2, (face[1] + c[1]) / 2, z], world: out, tint: "cold" };
  });

  // ===== S3b · khoảng lặng (89,95–93,6 s): nhét máy ảnh vào khăn cho ấm; máy ló ra "nhìn" trời một cái, rụt vào; Wob tỉnh bơ nhìn người xem =====
  var TK0 = G0 + 0.05, TK1 = G0 + 0.6, PEEK0 = G0 + 1.35, PEEK1 = PEEK0 + 0.18, LOOK1 = PEEK1 + 0.55, DUCK = LOOK1 + 0.15, DEAD = DUCK + 0.35;
  VT.sfx("boing", PEEK0, 0.55); VT.sfx("pop", DUCK, 0.35);
  shot(G0, B3, "máy ảnh trốn trong khăn", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, px: 4, py: 12, mouth: "content" };
    var slot = [204, 262]; // nếp khăn quanh cổ (hệ Wob)
    var u = VT.ease.io(seg(t, TK0, TK1));
    var lx = VT.lerp(370, slot[0], u), ly = VT.lerp(262, slot[1], u);
    var rise = t < PEEK0 ? 0 : t < PEEK1 ? VT.ease.back(seg(t, PEEK0, PEEK1)) : t < DUCK ? 1 : 1 - VT.ease.in2(seg(t, DUCK, DUCK + 0.12));
    var tucked = t >= TK1;
    var camY = tucked ? slot[1] + 38 - 70 * rise : ly, camS = VT.lerp(0.62, 0.4, u);
    if (t < TK1) { o.armL = [lx - 52, ly]; o.armR = [lx + 52, ly]; o.handL = "nam"; o.handR = "nam"; o.lean = 4 * u; }
    else if (t < PEEK0) { o.armR = [262, 300 + 10 * Math.sin(Math.round(t * 12) * 1.7)]; o.handR = "xoe"; o.eyes = "happy"; o.mouth = "smile"; } // vỗ vỗ khăn
    else if (t < DEAD) { o.px = 2; o.py = 14; o.brows = "up"; o.mouth = "oSmall"; o.noBlink = true; }
    else { o.px = 0; o.py = 3; o.lid = 0.5 + 0.5 * VT.slowBlink(t, DEAD + 0.5, 0.35); o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; }
    var cp = VT.wobPt(o, tucked ? slot[0] : lx, camY);
    var lookUp = t >= PEEK1 && t < DUCK ? key(t, [[PEEK1, 0], [PEEK1 + 0.15, 1, "out"]]) : 0;
    var cam = VT.photoCam({ x: cp[0], y: cp[1], s: camS, eye: [0, -lookUp], screen: t >= PEEK1 && t < DUCK ? "on" : "off" });
    var out = night(t, 0, 1700) + W(t, o);
    var fold = "";
    if (tucked) { // nếp khăn đỏ phủ nửa dưới máy ảnh
      var a1 = VT.wobPt(o, slot[0] - 92, slot[1] + 8), a2 = VT.wobPt(o, slot[0] + 92, slot[1] + 4), a3 = VT.wobPt(o, slot[0] + 88, slot[1] + 66), a4 = VT.wobPt(o, slot[0] - 88, slot[1] + 70);
      fold = VT.shape("M " + f(a1[0]) + " " + f(a1[1]) + " Q " + f((a1[0] + a2[0]) / 2) + " " + f(a1[1] - 10) + " " + f(a2[0]) + " " + f(a2[1]) + " L " + f(a3[0]) + " " + f(a3[1]) + " Q " + f((a3[0] + a4[0]) / 2) + " " + f(a3[1] + 8) + " " + f(a4[0]) + " " + f(a4[1]) + " Z", "#D9543C", { sw: 5 }) +
        VT.line("M " + f(a1[0] + 20) + " " + f(a1[1] + 18) + " L " + f(a2[0] - 20) + " " + f(a2[1] + 18), 4, "#EFE3C8", 0.9);
    }
    out += cam + fold;
    if (t >= PEEK0 && t < PEEK0 + 0.25) out += VT.knockLines({ x: cp[0], y: cp[1] - 20, s: 0.4, k: seg(t, PEEK0, PEEK0 + 0.25) });
    if (lookUp > 0.5 && t < DUCK) out += VT.line("M " + f(cp[0] - 36) + " " + f(cp[1] - 60) + " l -8 -10 M " + f(cp[0] + 36) + " " + f(cp[1] - 60) + " l 8 -10", 4, "#F4F6FB") + VT.speedLines({ x0: cp[0] - 30, y0: cp[1] - 260, n: 3, gap: 30, len: 90, dx: 0, dy: -1, sw: 3, color: "#F4F6FB" });
    var face = VT.wobPt(o, 200, 190);
    var z = key(T, [[G0, 2.15], [PEEK0, 2.3, "sine"], [DEAD, 2.45, "sine"], [B3, 2.55, "sine"]]);
    return { cam: [face[0] + 10, face[1] + 30, z], shake: VT.shake(t, PEEK0, 0.15, 3), world: out, tint: "cold" };
  });

  // ===== S4 · cạnh tấm biển bé trong đêm: gãi đầu; bong bóng ? ở "question", phồng to ở "Why … at all?" =====
  var B4 = T_SOMEBODY - 0.08;
  VT.sfx("pop", T_QUESTION + 0.05, 0.5);
  function s4(t, lt, T, close) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, px: 10, py: -6, mouth: "flat", brows: "skeptic" };
    var scr = t > T_STANDING + 0.6 ? Math.sin(Math.round(t * 12) * 1.6) : 0;
    o.armR = t > T_STANDING + 0.6 ? [262 + scr * 10, 48 + scr * 6] : [338, 300]; o.handR = t > T_STANDING + 0.6 ? "xoe" : "tron";
    o.lean = t > T_STANDING + 0.6 ? -4 : 0;
    if (t > T_WHY) { o.px = -8; o.py = -12; o.brows = "up"; }
    var out = night(t, 0, close ? 1700 : 0) + W(t, o);
    if (t >= T_QUESTION) {
      var bs = key(t, [[T_QUESTION, 0.1], [T_QUESTION + 0.14, 0.42, "back"], [T_WHY, 0.42], [T_WHY + 0.3, 0.62, "back"]]);
      var hp = VT.wobPt(o, 60, 0);
      out += VT.bubble({ x: hp[0] - 70, y: hp[1] - 80 - 40 * seg(t, T_WHY, T_WHY + 0.3), s: bs, sym: "?", tail: 1 });
    }
    if (close) { var fc = VT.wobPt(o, 160, 100); return { cam: [fc[0] - 40, fc[1] - 20, key(T, [[T_WHY - 0.1, 2.3], [B4, 2.45, "sine"]])], world: out, tint: "cold" }; }
    var z = key(T, [[B3, 1.3], [B4, 1.42, "sine"]]);
    return { cam: [1020, 640, z], world: out, tint: "cold" };
  }
  shot(B3, T_WHY - 0.1, "gãi đầu cạnh biển bé", function (t, lt, T) { return s4(t, lt, T, false); });
  shot(T_WHY - 0.1, B4, "cận: bong bóng ? phồng to", function (t, lt, T) { return s4(t, lt, T, true); });

  // ===== S5 · chỉ xuống tuyết ("picked"), camera lùi ra khoảng trắng mênh mông, Wob nhìn quanh =====
  var B5 = T_GUESSES - 0.32;
  shot(B4, B5, "chỉ xuống tuyết, lùi ra mênh mông", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, mouth: "flat" };
    if (t < T_SPOT + 0.15) { o.armR = [330, 384]; o.handR = "chi"; o.px = 6; o.py = 14; o.brows = "down"; o.lean = 5; }
    else if (t < T_PURPOSE - 0.1) { var lk = Math.round((t - T_SPOT) * 2.6) % 2 ? 1 : -1; o.px = 13 * lk; o.py = -2; o.flip = lk; o.brows = "up"; o.mouth = "oSmall"; }
    else { o.px = 0; o.py = 3; o.lid = 0.45; o.brows = "skeptic"; o.mouth = "flat"; o.noBlink = true; }
    var out = night(t, 0) + W(t, o);
    if (t >= T_PICKED && t < T_PICKED + 0.4) out += VT.knockLines({ x: WX + 110, y: GROUND + 4, s: 0.5, k: seg(t, T_PICKED, T_PICKED + 0.4) });
    var k = VT.ease.io3(seg(T, T_SPOT - 0.05, T_SPOT + 1.1));
    var z = VT.lerp(1.55, 0.6, k), cy = VT.lerp(700, 560, k);
    return { cam: [VT.lerp(WX + 40, 960, k), cy, z], world: out, tint: "cold" };
  });

  // ===== Trang sổ: bảng đoán ba ô =====
  var PX = [150, 720, 1290], PY = 160, PW = 480, PH = 420, PAGE_FLOOR = 1010, BIG = 0.62;
  function pageBase() {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#6E4B32"/>';
    s += VT.shape("M 40 30 L 1880 30 L 1880 1050 L 40 1050 Z", "#FBF6E9", { sw: 7, ox: 10, oy: 8 });
    for (var y = 110; y < 1040; y += 56) s += VT.line("M 60 " + y + " L 1860 " + y, 2.5, "#9cc8dc", 0.45);
    for (var x = 120; x < 1840; x += 120) s += VT.ell(x, 58, 12, 8, "#6E4B32", 4);
    return s;
  }
  function panelBox(i, inner, t) {
    var x = PX[i], id = VT.uid("pn"), out = "";
    out += '<clipPath id="' + id + '"><rect x="' + x + '" y="' + PY + '" width="' + PW + '" height="' + PH + '"/></clipPath>';
    out += '<g clip-path="url(#' + id + ')"><rect x="' + x + '" y="' + PY + '" width="' + PW + '" height="' + PH + '" fill="#FFFDF6"/>' + VT.g("translate(" + x + " " + PY + ")", inner) + "</g>";
    out += VT.shape("M " + x + " " + PY + " L " + (x + PW) + " " + PY + " L " + (x + PW) + " " + (PY + PH) + " L " + x + " " + (PY + PH) + " Z", "none", { sw: 7 });
    for (var d = 0; d <= i; d++) out += VT.dot(x + 26 + d * 26, PY + PH + 30, 9); // đánh dấu ô bằng chấm, không số
    return out;
  }
  // ô 1: núi vẽ dần bằng bút chì to, rồi tối đen chỉ còn đôi mắt
  var MTN = [[30, 300], [100, 190], [150, 240], [230, 110], [300, 230], [360, 170], [450, 300]];
  var D1a = T_FIRST + 0.05, D1b = T_VIEW + 0.05, DK0 = T_DARK - 0.2, DK1 = T_DARK + 0.02;
  function panel1(t) {
    var k = seg(t, D1a, D1b), out = VT.line("M 0 330 C 120 322 340 336 480 328", 5, C.ink, 0.6);
    out += VT.lineDraw(VT.smooth(MTN, false), k, 7);
    if (k >= 1) out += VT.shape("M 200 140 L 230 110 L 262 146 L 246 140 L 232 152 L 216 140 Z", C.snow, { sw: 4 }) + VT.ell(400, 80, 30, 30, "#FFF4C8", 5);
    var tip = VT.alongPts(MTN, k);
    var wx = t < D1b ? VT.clamp(tip[0] - 70, 60, 420) : 140, o = { s: 0.5, x: wx, y: 400, flip: 1 };
    if (t < D1b + 0.1) { o.armR = [340, 40]; o.handR = "nam"; o.px = 10; o.py = -12; o.mouth = "content"; o.lean = 4; }
    else { o.eyes = "happy"; o.mouth = "smile"; o.armL = [104, 268]; o.armR = [296, 268]; }
    var wob = W(t, o);
    if (t < D1b + 0.1) wob += VT.pencilTo(VT.wobPt(o, 340, 40), tip, { s: 0.55 });
    out += wob;
    var dk = seg(t, DK0, DK1);
    if (dk > 0) {
      out += '<rect x="-10" y="-10" width="' + (PW + 20) + '" height="' + f((PH + 20) * VT.ease.in2(dk)) + '" fill="#141A22"/>';
      if (dk >= 1) { var e = VT.wobPt(o, 200, 156), bl = VT.blink(t, 1.1, 0.3) > 0.5; [-20, 20].forEach(function (dx) { out += bl ? VT.line("M " + f(e[0] + dx - 12) + " " + f(e[1]) + " L " + f(e[0] + dx + 12) + " " + f(e[1]), 5, "#fffdf6") : VT.ell(e[0] + dx, e[1], 12, 15, "#fffdf6", 0, { ox: 0, oy: 0 }) + VT.dot(e[0] + dx + 2, e[1] + 3, 5); }); }
    }
    return out;
  }
  // ô 2: sông băng, que gõ; sông gõ lại, que gãy, đầu que bật vào trán
  var TAPS = [T_TAPPED + 0.02, T_TAPPED + 0.32, T_TAPPED + 0.62], T_KNOCK = T_TAPPED2 + 0.02, T_SNAP = T_BACK - 0.1, T_HIT = T_BACK + 0.12;
  function panel2(t) {
    var out = VT.shape("M -10 250 C 120 240 360 258 490 246 L 490 330 C 360 340 120 332 -10 340 Z", C.ice, { sw: 5, ox: 0, oy: 3 });
    out += VT.line("M 60 290 l 40 -10 l 30 14 M 300 300 l 30 -16 l 40 8", 3, "#6E9FB8", 0.8) + VT.shape("M -10 340 L 490 330 L 490 440 L -10 440 Z", C.snow, { sw: 5, ox: 0, oy: 3 });
    out += VT.shape("M -10 250 C 120 240 360 258 490 246 L 490 140 L -10 150 Z", C.snow, { sw: 0, ox: 0, oy: 0, op: 0.5 });
    var o = { s: 0.5, x: 150, y: 296, flip: 1, px: 10, py: 10, mouth: "content" };
    var tipRest = [320, 296], tip = tipRest.slice(), hand = [330, 140];
    var tapK = 0; TAPS.forEach(function (ta) { if (t >= ta - 0.14 && t < ta + 0.12) tapK = t < ta ? 1 - seg(t, ta - 0.14, ta) : seg(t, ta, ta + 0.12); });
    if (t < T_TAPPED - 0.14) { tip = [330, 220]; hand = [320, 120]; o.eyes = "happy"; } // cầm que như cần câu
    else tip = [320, 296 - 26 * (t < T_KNOCK ? tapK : 0)];
    if (t >= T_KNOCK && t < T_SNAP) { var kj = seg(t, T_KNOCK, T_KNOCK + 0.12); tip = [320, 296 - 40 * Math.sin(kj * Math.PI)]; o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.noBlink = true; o.sq = 1.06; }
    var hw = VT.wobPt(o, hand[0], hand[1]);
    o.armR = hand; o.handR = "nam";
    var stickSvg, piece = "";
    if (t < T_SNAP) stickSvg = VT.line("M " + f(hw[0]) + " " + f(hw[1]) + " L " + f(tip[0]) + " " + f(tip[1]), 12) + VT.line("M " + f(hw[0]) + " " + f(hw[1]) + " L " + f(tip[0]) + " " + f(tip[1]), 5, C.woodLight);
    else {
      var mid = [(hw[0] + tip[0]) / 2, (hw[1] + tip[1]) / 2];
      stickSvg = VT.line("M " + f(hw[0]) + " " + f(hw[1]) + " L " + f(mid[0]) + " " + f(mid[1]), 12) + VT.line("M " + f(hw[0]) + " " + f(hw[1]) + " L " + f(mid[0]) + " " + f(mid[1]), 5, C.woodLight);
      var head = VT.wobPt(o, 200, 70), u = seg(t, T_SNAP, T_HIT), q = 1 - u, top = [mid[0] + 40, mid[1] - 160];
      var p = t < T_HIT ? [q * q * tip[0] + 2 * q * u * top[0] + u * u * head[0], q * q * tip[1] + 2 * q * u * top[1] + u * u * head[1]] : [head[0] + 70 * seg(t, T_HIT, T_HIT + 0.5), VT.lerp(head[1], 330, VT.ease.bounce(seg(t, T_HIT, T_HIT + 0.5)))];
      var rot = t < T_HIT ? 720 * u : 720 + 200 * seg(t, T_HIT, T_HIT + 0.5);
      piece = VT.g("translate(" + f(p[0]) + " " + f(p[1]) + ") rotate(" + f(rot) + ")", VT.line("M -46 0 L 46 0", 12) + VT.line("M -46 0 L 46 0", 5, C.woodLight));
      if (t >= T_HIT) { o.eyes = "cross"; o.mouth = "wobbly"; o.brows = "worried"; o.sq = key(t, [[T_HIT, 0.86], [T_HIT + 0.3, 1, "back"]]); o.lean = key(t, [[T_HIT, -10], [T_HIT + 0.6, -3, "elastic"]]); o.noBlink = true; }
      else { o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.py = -14; o.noBlink = true; }
    }
    out += W(t, o) + stickSvg + piece;
    TAPS.forEach(function (ta) { if (t >= ta && t < ta + 0.25 && t < T_KNOCK) out += VT.knockLines({ x: 320, y: 300, s: 0.45, k: seg(t, ta, ta + 0.25) }); });
    if (t >= T_KNOCK && t < T_KNOCK + 0.35) out += VT.knockLines({ x: 320, y: 312, s: 0.8, k: seg(t, T_KNOCK, T_KNOCK + 0.35) }) + VT.shape("M 280 300 C 300 270 340 270 360 300 Z", C.ice, { sw: 4 });
    if (t >= T_SNAP && t < T_SNAP + 0.2) { var m2 = [(hw[0] + tip[0]) / 2, (hw[1] + tip[1]) / 2]; out += VT.impact({ x: m2[0], y: m2[1], s: 0.25, seed: 5 }); }
    if (t >= T_HIT && t < T_HIT + 0.25) { var hh = VT.wobPt(o, 200, 60); out += VT.impact({ x: hh[0], y: hh[1], s: 0.3, seed: 8 }); }
    if (t >= T_HIT) { var hd = VT.wobPt(o, 200, 30); out += VT.dizzy({ x: hd[0], y: hd[1] - 10, s: 0.5, t: t }); }
    return out;
  }
  // ô 3: Wob mãn nguyện trước nhà, quay lưng với trời bão; nhiệt kế trên tường tụt
  function panel3(t) {
    var out = '<rect x="-10" y="-10" width="500" height="200" fill="#B8C6D3" opacity="0.6"/>';
    out += VT.cloud({ x: 140, y: 40, s: 0.9, fill: "#7F8E9C" }) + VT.cloud({ x: 380, y: 30, s: 0.8, fill: "#6F7E8C" });
    for (var i = 0; i < 9; i++) { var yy = 90 + i * 30, xo = ((Math.round(t * 12) * 37 + i * 61) % 520) - 40; out += VT.line("M " + f(xo) + " " + yy + " l 60 12", 4, "#ffffff", 0.9); }
    out += VT.snowGround(360).replace(/-1200/g, "-10");
    out += VT.house({ x: 340, y: 362, s: 0.42, w: 420, t: t, seed: 3, icicles: true, door: true });
    var lv = key(t, [[T_NOBODY, 0.6], [T_WEATHER2 + 0.3, 0.04, "in2"]]);
    out += VT.thermoMini({ x: 434, y: 330, s: 0.42, level: lv, color: lv < 0.2 ? C.iceDeep : C.accent2 });
    var o = { s: 0.5, x: 150, y: 362, flip: 1, eyes: "happy", mouth: "smile", arms: "hug", bob: -6 * Math.abs(Math.sin(t * 3)) };
    out += W(t, o) + VT.shape("M 210 362 L 210 312 L 268 312 L 268 362 Z", "#C9A06A", { sw: 4 }) + VT.line("M 210 330 L 268 330", 3, C.ink, 0.6);
    return out;
  }
  function page(t) { return pageBase() + panelBox(0, panel1(t), t) + panelBox(1, panel2(t), t) + panelBox(2, panel3(t), t); }

  // ===== S6 · trang sổ: Wob to đứng dưới, dùng bút chì chỉ lần lượt ba ô ("guesses") =====
  var B6 = T_FIRST - 0.2;
  VT.sfx("pop", T_GUESSES, 0.6);
  shot(B5, B6, "bảng đoán ba ô", function (t, lt, T) {
    var o = { s: BIG, x: 960, y: PAGE_FLOOR, flip: 1, mouth: "content", px: 0, py: -12 };
    var i = t < T_GUESSES ? 0 : Math.min(2, Math.floor((t - T_GUESSES) / 0.2));
    var tgt = [PX[i] + PW / 2, PY + PH - 20];
    o.armR = [372, 60]; o.handR = "nam"; o.px = [-12, 0, 12][i];
    var out = page(t) + W(t, o) + VT.pencilTo(VT.wobPt(o, 372, 60), tgt, { s: 1 });
    if (t >= T_GUESSES) out += VT.sparkle({ x: tgt[0] + 150, y: PY + 40, s: 0.4 });
    return { cam: [960, 560, key(T, [[B5, 1.0], [B6, 1.03]])], world: out, tint: null };
  });
  function camPanel(i, z) { return [PX[i] + PW / 2, PY + PH / 2 + 10, z]; }
  // ===== S7 · ô 1 =====
  var B7 = T_SECOND - 0.1;
  shot(B6, B7, "ô 1: ngắm cảnh → tối đen", function (t, lt, T) {
    var k = VT.ease.io3(seg(T, B6, B6 + 0.5));
    var c = VT.mix([960, 560, 1.03], camPanel(0, 2.25), k);
    c[2] *= 1 + 0.03 * seg(T, B6 + 0.5, B7);
    return { cam: c, world: page(t), tint: null };
  });
  // ===== S8 · ô 2 =====
  var B8 = T_THIRD - 0.1;
  VT.sfx("bonk", TAPS[0], 0.25); VT.sfx("bonk", T_KNOCK, 0.6); VT.sfx("bonk", T_HIT, 0.75);
  shot(B7, B8, "ô 2: sông gõ lại", function (t, lt, T) {
    var k = VT.ease.io3(seg(T, B7, B7 + 0.55));
    var c = VT.mix(camPanel(0, 2.25), camPanel(1, 2.25), k);
    c[2] *= 1 + 0.05 * seg(T, B7 + 0.55, B8);
    return { cam: c, shake: VT.shakes(t, [[T_KNOCK, 0.2, 6], [T_HIT, 0.22, 8]]), world: page(t), tint: null };
  });
  // ===== S9 · ô 3 =====
  var B9 = T_LIKED - 0.12;
  shot(B8, B9, "ô 3: không ai xem thời tiết", function (t, lt, T) {
    var k = VT.ease.io3(seg(T, B8, B8 + 0.55));
    var c = VT.mix(camPanel(1, 2.25), camPanel(2, 2.25), k);
    c[2] *= 1 + 0.04 * seg(T, B8 + 0.55, B9);
    return { cam: c, world: page(t), tint: null };
  });
  // ===== S10–S11 · Wob to gật gù trước ô 3 → dấu X đỏ đóng sập, Wob bật ngửa, giữ hình =====
  var T_X0 = T_WRONG - 0.16, T_X1 = T_WRONG + 0.04, T_LAND = T_X1 + 0.38;
  VT.sfx("buzz-sai", T_X1, 0.7); VT.sfx("bonk", T_LAND, 0.6); VT.sfx("liu-lo-buon", T_LAND + 0.35, 0.45);
  shot(B9, DUR, "gật gù → dấu X, bật ngửa", function (t, lt, T) {
    var bx = 1480, o = { s: BIG, x: bx, y: PAGE_FLOOR, flip: 1, mouth: "content", eyes: "happy", armL: [106, 268], armR: [294, 268] };
    if (t < T_X1) {
      o.bob = t > T_LIKED ? -10 * Math.abs(Math.sin((t - T_LIKED) * 6)) : 0;
      o.lean = -5;
      if (t > T_THIRD3 - 0.3) { o.eyes = "open"; o.px = 0; o.py = -14; o.mouth = "smirk"; o.brows = "up"; }
    }
    var wobSvg;
    if (t >= T_X1) { // bật ngửa: xoay quanh chân, rơi xuống, ba lô làm gối
      var fk = VT.ease.in2(seg(t, T_X1, T_LAND)), rot = 92 * fk + (t > T_LAND ? key(t, [[T_LAND, -8], [T_LAND + 0.5, 0, "elastic"]]) : 0);
      o.eyes = t > T_LAND ? "cross" : "wide"; o.mouth = t > T_LAND ? "wobbly" : "o"; o.brows = "up"; o.arms = "shock"; o.legs = "tuck"; o.noBlink = true;
      var px = bx + 60 * fk, py = PAGE_FLOOR - 70 * Math.sin(fk * Math.PI) + (t > T_LAND ? 0 : 0);
      o.x = px; o.y = py;
      wobSvg = VT.g("rotate(" + f(rot) + " " + f(px) + " " + f(py - 90 * BIG) + ")", W(t, o));
    } else wobSvg = W(t, o);
    var out = page(t);
    if (t >= T_X0) out += VT.bigX({ x: PX[2] + PW / 2, y: PY + PH / 2, s: 1.2, k: seg(t, T_X0, T_X1) });
    out += wobSvg;
    if (t >= T_X1 && t < T_X1 + 0.3) out += VT.radialLines(PX[2] + PW / 2, PY + PH / 2, 280, 420, 16, 9, 8);
    if (t >= T_LAND) out += VT.dizzy({ x: bx + 180, y: PAGE_FLOOR - 120, s: 0.6, t: t });
    if (t >= T_LAND && t < T_LAND + 0.3) out += VT.puffBurst({ x: bx + 90, y: PAGE_FLOOR, k: seg(t, T_LAND, T_LAND + 0.3), s: 0.6 });
    var z = key(T, [[B9, 1.12], [T_X0, 1.15], [T_X1, 1.1, "out"], [DUR, 1.16, "sine"]]);
    return { cam: [key(T, [[B9, 1000], [T_X1, 1030, "out"], [DUR, 1050]]), key(T, [[B9, 560], [DUR, 575]]), z], shake: VT.shakes(t, [[T_X1, 0.25, 14], [T_LAND, 0.2, 6]]), world: out, tint: null };
  });
  return shots;
};
