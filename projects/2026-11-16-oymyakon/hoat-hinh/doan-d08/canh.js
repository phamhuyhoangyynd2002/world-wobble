/* d08 · vẽ tay · câu hỏi ở tấm biển bé, ba lần đoán (78,5–101,822 s tuyệt đối; 23,322 s). Vào "cat", ra "cat".
 * Biên đạo lại 21/11/2026. Tái dụng hoat-hinh/_cu-21-11/d08/canh.js phần bảng đoán ba ô (S6–S11 cũ, mốc lấy lại từ du-lieu.js mới);
 * phần lông mi/máy ảnh cũ đã sang d02.
 * S0 mép làng ban đêm cạnh biển "OYMYAKON": Wob (lông mi que băng) cất đèn pin vào ba lô, nhét máy ảnh tắt vào khăn đỏ; bong bóng '?' nhú ở "question".
 * S1 máy lùi ra toàn cảnh: '?' phình thành dấu hỏi lớn trùm lên ngôi làng đúng "village"; Wob ngước nhìn; giữ.
 * S2 Wob cắm cờ giấy trơn xuống tuyết đúng "on purpose", máy lùi ra khoảng trắng mênh mông, Wob nhìn quanh.
 * S3–S8 trang sổ: bảng đoán ba ô (chấm, không số). Ô 1 Wob vẽ cửa sổ cảnh đẹp, nét bút mực to tô đen kín ô ở "dark";
 *   ô 2 sông gõ lại, que gãy bật vào trán; ô 3 Wob mãn nguyện trước nhà; gật gù; máy lao vào ô 3 lúc dấu X đỏ đóng sập, Wob bật ngửa.
 * Đồ Wob: mũ len đỏ, khăn đỏ, ba lô, lông mi que băng (giữ tới hết); máy ảnh trong khăn từ S0. Chữ duy nhất: "OYMYAKON" trên biển (chỉ khi đủ cỡ).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, DUR = D.thoi_luong;
  // ---- mốc từ lời ----
  var T_STANDING = VT.tu("standing"), T_SIGN = VT.tu("sign"), T_QUESTION = VT.tu("question"), T_WHY = VT.tu("why"), T_VILLAGE = VT.tu("village");
  var T_SOMEBODY = VT.tu("somebody"), T_PICKED = VT.tu("picked"), T_SPOT = VT.tu("spot"), T_ON = VT.tu("on", 0), T_PURPOSE = VT.tu("purpose"), T_GUESSES = VT.tu("guesses");
  var T_FIRST = VT.tu("first"), T_VIEW = VT.tu("view"), T_DARK = VT.tu("dark");
  var T_SECOND = VT.tu("second"), T_FISHING = VT.tu("fishing"), T_TAPPED = VT.tu("tapped", 0), T_TAPPED2 = VT.tu("tapped", 1), T_BACK = VT.tu("back");
  var T_THIRD = VT.tu("third", 0), T_NOBODY = VT.tu("nobody"), T_WEATHER2 = VT.tu("weather", 0), T_MOVING = VT.tu("moving");
  var T_LIKED = VT.tu("liked"), T_THIRD3 = VT.tu("third", 2), T_WRONG = VT.tu("wrong");

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
  // signText: chỉ ghi chữ khi biển đủ to trên màn hình (≥ 40px)
  function night(t, signText, extra) {
    var s = VT.sky(NIGHT, 1) + stars(t);
    s += VT.ridge(600, -200, "#8EA2BC") + VT.ridge(680, 300, "#B4C3D5");
    s += VT.farHouses(712, -300, t, 9);
    if (extra) s += extra;
    s += VT.shape("M -1200 " + (GROUND + 8) + " C -300 " + (GROUND + 20) + " 400 " + (GROUND - 12) + " 1000 " + (GROUND + 10) + " C 1700 " + (GROUND - 8) + " 2400 " + (GROUND + 12) + " 3200 " + GROUND + " L 3200 2400 L -1200 2400 Z", "#D3DFEA", { sw: 6, ox: 0, oy: 5 });
    s += VT.line("M 200 " + (GROUND + 90) + " C 400 " + (GROUND + 80) + " 600 " + (GROUND + 100) + " 800 " + (GROUND + 92), 4, "#8EA2BC", 0.6);
    s += VT.signTiny({ x: 1230, y: GROUND + 4, s: 0.55, w: 500, board: C.white, text: signText ? "OYMYAKON" : null, size: 64 });
    s += VT.diamondDust(t, 14, [-200, 200, 2200, 800]);
    return s;
  }
  var WX = 940, WS = 0.62;
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · cạnh biển bé: cất đèn pin vào ba lô, nhét máy ảnh vào khăn; '?' nhú ở "question" =====
  var TP0 = 0.15, TP1 = 0.85, TK0 = 1.0, TK1 = 1.6, B0 = T_WHY - 0.1;
  VT.sfx("pop", T_QUESTION + 0.05, 0.5);
  function scarfFold(o, slot) {
    var a1 = VT.wobPt(o, slot[0] - 92, slot[1] + 8), a2 = VT.wobPt(o, slot[0] + 92, slot[1] + 4), a3 = VT.wobPt(o, slot[0] + 88, slot[1] + 66), a4 = VT.wobPt(o, slot[0] - 88, slot[1] + 70);
    return VT.shape("M " + f(a1[0]) + " " + f(a1[1]) + " Q " + f((a1[0] + a2[0]) / 2) + " " + f(a1[1] - 10) + " " + f(a2[0]) + " " + f(a2[1]) + " L " + f(a3[0]) + " " + f(a3[1]) + " Q " + f((a3[0] + a4[0]) / 2) + " " + f(a3[1] + 8) + " " + f(a4[0]) + " " + f(a4[1]) + " Z", "#D9543C", { sw: 5 }) +
      VT.line("M " + f(a1[0] + 20) + " " + f(a1[1] + 18) + " L " + f(a2[0] - 20) + " " + f(a2[1] + 18), 4, "#EFE3C8", 0.9);
  }
  function stow(t, o) { // trả SVG đèn pin + máy ảnh theo t, đặt tay vào o
    var out = "", slot = [204, 262];
    // đèn pin: tay trái vòng ra sau, thả vào ba lô (ba lô ở phía sau bên phải thân khi flip 1)
    var u = VT.ease.io(seg(t, TP0, TP1));
    if (t < TP1) {
      var hx = VT.lerp(70, 330, u), hy = VT.lerp(300, 60 - 80 * Math.sin(u * Math.PI), u);
      o.armL = [hx, hy]; o.handL = "nam";
      var p = VT.wobPt(o, hx, hy);
      out += VT.torch({ x: p[0] + 8, y: p[1] + 4, s: 0.5 * (1 - 0.5 * seg(t, TP1 - 0.2, TP1)), rot: VT.lerp(70, 160, u) });
    } else { o.armL = [80, 290]; o.handL = "tron"; }
    // máy ảnh: tay phải đưa vào nếp khăn
    var k = VT.ease.io(seg(t, TK0, TK1)), cx = VT.lerp(330, slot[0], k), cy = VT.lerp(250, slot[1] + 38, k);
    if (t < TK1) { o.armR = [cx + 40, cy]; o.handR = "nam"; }
    else if (t < TK1 + 0.5) { o.armR = [262, 300 + 10 * Math.sin(Math.round(t * 12) * 1.7)]; o.handR = "xoe"; } // vỗ vỗ khăn
    else { o.armR = [338, 300]; o.handR = "tron"; }
    var cp = VT.wobPt(o, cx, cy);
    var cam = VT.photoCam({ x: cp[0], y: cp[1], s: VT.lerp(0.5, 0.4, k), side: "back", screen: "off" });
    return { pre: "", post: cam + (t >= TK1 - 0.1 ? scarfFold(o, slot) : "") + out };
  }
  shot(0, B0, "cất đèn pin, nhét máy ảnh, '?'", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, mouth: "content", px: 6, py: 4 };
    if (t >= TK1 + 0.5) { o.mouth = "flat"; o.brows = "skeptic"; o.px = 8; o.py = -10; }
    var st = stow(t, o);
    var out = night(t, true) + W(t, o) + st.post;
    if (t >= T_QUESTION) { var hp = VT.wobPt(o, 60, 0); out += VT.bubble({ x: hp[0] - 70, y: hp[1] - 80, s: key(t, [[T_QUESTION, 0.1], [T_QUESTION + 0.14, 0.42, "back"]]), sym: "?", tail: 1 }); }
    var z = key(T, [[0, 1.3], [B0, 1.4, "sine"]]);
    return { cam: [1040, 600, z], world: out, tint: "cold" };
  });

  // ===== S1 · lùi ra toàn cảnh: '?' phình thành dấu hỏi lớn trùm làng ở "village"; Wob ngước nhìn; giữ =====
  var B1 = T_SOMEBODY - 0.08, QG0 = T_VILLAGE - 0.05, QG1 = T_VILLAGE + 0.35;
  VT.sfx("boing", T_VILLAGE, 0.55);
  shot(B0, B1, "dấu hỏi lớn trùm làng", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, mouth: "oSmall", brows: "up", px: -4, py: -16, armL: [80, 290], armR: [338, 300], noBlink: t > QG0 };
    var out = night(t, false) + W(t, o);
    var cpp = VT.wobPt(o, 204, 300); out += VT.photoCam({ x: cpp[0], y: cpp[1], s: 0.4, side: "back", screen: "off" }) + scarfFold(o, [204, 262]);
    var hp = VT.wobPt(o, 60, 0), g = VT.ease.back(seg(t, QG0, QG1));
    var bx = VT.lerp(hp[0] - 70, 760, g), by = VT.lerp(hp[1] - 80, 200, g), bs = VT.lerp(0.42, 2.6, g);
    if (g < 0.98) out += VT.bubble({ x: bx, y: by, s: bs, sym: "?", tail: 1 });
    else out += VT.glyph({ x: 760, y: 260, s: 4.2, sym: "?" });
    var k = VT.ease.io3(seg(T, B0, B0 + 0.9));
    return { cam: [VT.lerp(1040, 900, k), VT.lerp(600, 480, k), VT.lerp(1.4, 0.72, k)], shake: VT.shake(t, QG1, 0.2, 5), world: out, tint: "cold" };
  });

  // ===== S2 · cắm cờ trơn ở "on purpose", lùi ra khoảng trắng mênh mông, Wob nhìn quanh =====
  var T_PLANT = T_PURPOSE + 0.05, B2 = T_GUESSES - 0.32;
  VT.sfx("bonk", T_PLANT, 0.35);
  shot(B1, B2, "cắm cờ, khoảng trắng mênh mông", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, mouth: "flat", armL: [80, 290] };
    var FX = WX + 170, fy;
    if (t < T_PLANT) { var lift = key(t, [[B1, 0], [T_ON, 1, "out"], [T_PLANT, 0, "in2"]]); o.armR = [360, 200 - 100 * lift]; o.handR = "nam"; o.brows = "down"; o.lean = 4; fy = GROUND - 30 - 120 * lift; }
    else if (t < T_PLANT + 1.0) { var lk = Math.round((t - T_PLANT) * 2.6) % 2 ? 1 : -1; o.px = 13 * lk; o.py = -2; o.brows = "up"; o.mouth = "oSmall"; o.armR = [338, 300]; fy = GROUND + 20; }
    else { o.px = 0; o.py = 3; o.lid = 0.45; o.brows = "skeptic"; o.mouth = "flat"; o.noBlink = true; o.armR = [338, 300]; fy = GROUND + 20; }
    var out = night(t, t < T_PLANT + 0.2) + W(t, o);
    var cpp = VT.wobPt(o, 204, 300); out += VT.photoCam({ x: cpp[0], y: cpp[1], s: 0.4, side: "back", screen: "off" }) + scarfFold(o, [204, 262]);
    out += VT.flag({ x: FX, y: fy, s: 0.6, t: t, color: "#F4F6FB" });
    if (t >= T_PLANT && t < T_PLANT + 0.35) out += VT.knockLines({ x: FX, y: GROUND + 20, s: 0.5, k: seg(t, T_PLANT, T_PLANT + 0.35) }) + VT.puffBurst({ x: FX, y: GROUND + 20, k: seg(t, T_PLANT, T_PLANT + 0.35), s: 0.4 });
    var k = VT.ease.io3(seg(T, T_PLANT + 0.1, T_PLANT + 1.2));
    return { cam: [VT.lerp(WX + 80, 960, k), VT.lerp(640, 520, k), VT.lerp(1.5, 0.55, k)], world: out, tint: "cold" };
  });
  var B5 = B2;
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
  // ô 1: Wob vẽ khung cửa sổ ngắm cảnh (núi, mặt trời), rồi một nét bút mực to tô đen kín ô ở "dark"
  var WIN = "M 150 70 L 430 70 L 430 300 L 150 300 Z M 290 70 L 290 300 M 150 185 L 430 185";
  var WINP = [[150, 70], [430, 70], [430, 300], [150, 300], [150, 70]];
  var MTN = [[160, 290], [220, 210], [260, 245], [320, 150], [380, 230], [420, 200]];
  var D1a = T_FIRST + 0.05, D1b = T_VIEW + 0.05, DK0 = T_DARK - 0.25, DK1 = T_DARK + 0.12;
  var BRUSH = "M -40 40 L 520 20 L -30 130 L 520 110 L -30 220 L 520 200 L -30 310 L 520 290 L -30 400 L 520 400";
  function panel1(t) {
    var k = seg(t, D1a, D1b), out = VT.line("M 0 380 C 120 372 340 386 480 378", 5, C.ink, 0.6);
    if (k >= 1) {
      out += '<rect x="150" y="70" width="280" height="230" fill="#CFE6F2"/>' + VT.ell(380, 120, 26, 26, "#FFF4C8", 5);
      out += VT.shape(VT.smooth(MTN, false) + " L 430 300 L 150 300 Z", "#9DB4C6", { sw: 5, ox: 0, oy: 0 });
      out += VT.shape("M 300 166 L 320 150 L 342 170 L 330 168 L 320 176 L 310 168 Z", C.snow, { sw: 3 });
    }
    out += VT.lineDraw(WIN, k, 8);
    var tip = VT.alongPts(WINP, k);
    var o = { s: 0.45, x: t < D1b ? 90 : 80, y: 420, flip: 1 };
    if (t < D1b + 0.1) { o.armR = [360, 20]; o.handR = "nam"; o.px = 10; o.py = -12; o.mouth = "content"; o.lean = 4; }
    else { o.eyes = "happy"; o.mouth = "smile"; o.armL = [104, 268]; o.armR = [296, 268]; }
    out += W(t, o);
    if (t < D1b + 0.1) out += VT.pencilTo(VT.wobPt(o, 360, 20), tip, { s: 0.5 });
    var dk = seg(t, DK0, DK1);
    if (dk > 0) {
      out += VT.lineDraw(BRUSH, dk, 120, "#141A22");
      if (dk < 1) { var bp = VT.alongPts([[-40, 40], [520, 20], [-30, 130], [520, 110], [-30, 220], [520, 200], [-30, 310], [520, 290], [-30, 400], [520, 400]], dk); out += VT.pencil({ x: bp[0], y: bp[1], s: 1.1, rot: 20 }); }
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
    var z = key(T, [[B9, 1.12], [T_X0 - 0.1, 1.15], [T_X1, 1.24, "in2"], [T_X1 + 0.12, 1.1, "out"], [DUR, 1.12, "sine"]]);
    return { cam: [key(T, [[B9, 1000], [T_X0 - 0.1, 1030], [T_X1, 1420, "in2"], [T_X1 + 0.5, 1260, "io3"], [DUR, 1250]]), key(T, [[B9, 560], [T_X0 - 0.1, 565], [T_X1, 560, "in2"], [DUR, 600, "sine"]]), z], shake: VT.shakes(t, [[T_X1, 0.25, 14], [T_LAND, 0.2, 6]]), world: out, tint: null };
  });
  return shots;
};
