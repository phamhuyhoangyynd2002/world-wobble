/* d22 · vẽ tay · xe phải được hơ lửa; so sánh "chìa khoá của mùa đông" (392,27–402,83 s tuyệt đối; 10,56 s). Vào "chen", ra "cat".
 * Đồ Wob: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng. Không chữ (chu_tren_do_vat rỗng).
 * S1 đống lửa nhỏ dưới gầm xe, Wob ngồi xổm hơ tay · S2 cận động cơ vẽ tay: run cầm cập, khoanh tay quay mặt, không chịu nổ
 * · S3 (tưởng tượng, viền mây) xe thường phủ sương mỏng, Wob cạo kính hai cái, mỉm cười
 * · S4 (tưởng tượng) đám mây Mùa Đông (chỉ có mắt nét mực) chộp chùm chìa khoá, nhét vào túi tuyết, bay đi; Wob há hốc.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, INK = C.ink;
  var T_FIRE = VT.tu("fire"), T_FROZEN = VT.tu("frozen"), T_REFUSE = VT.tu("refuse"), T_START = VT.tu("start", 0), T_ALL = VT.tu("all");
  var T_CAR = VT.tu("car"), T_MORNING = VT.tu("morning"), T_WINTER2 = VT.tu("winter", 1), T_NEVER = VT.tu("never"), T_BACK = VT.tu("back"), T_KEYS = VT.tu("keys");
  var A2 = D.nhip[1].tai, A3 = D.nhip[2].tai, A4 = D.nhip[3].tai, END = D.thoi_luong;

  function W(t, o) {
    var b = { t: t, s: 0.8, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes !== "happy" && b.eyes !== "closed" && b.eyes !== "squint") b.lid = Math.max(b.lid || 0, VT.blink(t, 2.8, 0.7));
    return VT.wob(b);
  }
  // phố làng buổi sáng còn tối (khớp d21)
  function street(t, G) {
    var s = VT.sky("#40557A", 1) + VT.ridge(G - 230, -80, "#4E6489") + VT.farHouses(G - 120, 0, t, 9);
    s += VT.shape("M -1200 " + (G + 8) + " C -300 " + (G - 10) + " 500 " + (G + 12) + " 1200 " + G + " C 1800 " + (G - 8) + " 2600 " + (G + 10) + " 3200 " + G + " L 3200 2400 L -1200 2400 Z", "#D3E0EA", { sw: 6, ox: 0, oy: 5 });
    return s;
  }
  function flames(x, y, t, s) {
    var n = Math.round(t * 12), out = '<ellipse cx="' + x + '" cy="' + (y - 40 * s) + '" rx="' + f(150 * s) + '" ry="' + f(90 * s) + '" fill="#FFC870" opacity="0.28"/>';
    [[-34, 0.8, "#E85D45"], [0, 1.15, "#F29A3A"], [32, 0.85, "#E85D45"], [0, 0.6, "#FBD567"]].forEach(function (p, i) {
      var h = 110 * p[1] * s * (0.85 + 0.25 * VT.hash(n * 1.7 + i)), w = 34 * s * (i === 3 ? 0.7 : 1), lean = (VT.hash(n * 3.1 + i) - 0.5) * 24 * s;
      out += VT.shape("M " + f(x + p[0] * s - w) + " " + f(y) + " C " + f(x + p[0] * s - w) + " " + f(y - h * 0.5) + " " + f(x + p[0] * s + lean - w * 0.3) + " " + f(y - h * 0.8) + " " + f(x + p[0] * s + lean) + " " + f(y - h) + " C " + f(x + p[0] * s + lean + w * 0.3) + " " + f(y - h * 0.7) + " " + f(x + p[0] * s + w) + " " + f(y - h * 0.4) + " " + f(x + p[0] * s + w) + " " + f(y) + " Z", p[2], { sw: i === 3 ? 0 : 5, ox: 2, oy: 2 });
    });
    out += VT.shape("M " + f(x - 70 * s) + " " + f(y) + " L " + f(x + 70 * s) + " " + f(y) + " L " + f(x + 56 * s) + " " + f(y + 22 * s) + " L " + f(x - 56 * s) + " " + f(y + 22 * s) + " Z", "#5d6a72", { sw: 5 });
    return out;
  }
  function heatLines(x, y, t, n) {
    var out = "", step = Math.round(t * 12);
    for (var i = 0; i < n; i++) {
      var xx = x + (i - (n - 1) / 2) * 46, yy = y - ((step * 7 + i * 29) % 90), pts = [];
      for (var k = 0; k < 4; k++) pts.push([xx + Math.sin(step * 0.9 + k * 1.7 + i) * 10, yy - k * 28]);
      out += VT.line(VT.smooth(pts, false), 5, "#FFE6A0", 0.75);
    }
    return out;
  }
  // khung tưởng tượng: viền mây giấy quanh khung (lớp over)
  function cloudFrame(k) {
    if (k <= 0) return "";
    var pts = [], N = 36, cx = 960, cy = 540, rx = 900 + (1 - k) * 600, ry = 480 + (1 - k) * 400;
    for (var i = 0; i < N; i++) { var a = i / N * Math.PI * 2, r = i % 2 ? 1 : 0.94; pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]); }
    var hole = VT.smooth(pts, true);
    return '<path d="M -40 -40 L 1960 -40 L 1960 1120 L -40 1120 Z ' + hole + '" fill="#FBF6E9" fill-rule="evenodd"/>' + '<path d="' + hole + '" fill="none" stroke="' + INK + '" stroke-width="7"/>';
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S1 · lửa nhỏ dưới gầm xe, Wob ngồi xổm hơ tay =====
  var G1 = 820, CX1 = 900, FX = CX1 + 305, WX1 = 1460;
  VT.sfx("hoi-nuoc", T_FIRE, 0.3);
  shot(0, A2, "lửa dưới gầm xe", function (t, lt, T) {
    var s = street(t, G1);
    s += VT.house({ x: 220, y: G1 - 10, w: 440, s: 0.9, t: t, seed: 2, icicles: true });
    s += flames(FX, G1 + 4, t, 0.72);
    s += VT.car({ x: CX1, y: G1, s: 0.9, color: "#3F6A70" });
    s += heatLines(FX + 30, G1 - 70, t, 3);
    var warm = seg(t, 0.2, T_FIRE);
    var o = { x: WX1, y: G1 + 33 * 0.8, flip: -1, legs: "tuck", armL: [330, 262], armR: [408, 238], handL: "xoe", handR: "xoe", shiver: key(t, [[0, 3], [T_FIRE + 0.4, 1]]) };
    o.armR = [408 + 8 * Math.sin(Math.round(t * 12) * 1.1), 238]; // xoa tay
    o.eyes = t > T_FIRE ? "happy" : "open"; o.mouth = t > T_FIRE ? "content" : "chatter"; o.px = 10; o.py = 6; o.lean = -4 - 3 * warm;
    s += W(t, o);
    // ánh lửa ấm hắt lên Wob
    var z = key(T, [[0, 1.3], [A2, 1.38, "sine"]]);
    return { cam: [1240, 640, z], world: s, tint: "cold" };
  });

  // ===== S2 · cận động cơ: run, khoanh tay, quay mặt =====
  var FR = T_FROZEN + 0.02, REF = T_REFUSE - 0.04, TURN = T_START - 0.08;
  VT.sfx("brr", FR, 0.7);
  VT.sfx("liu-lo-hoi", TURN - 0.1, 0.45);
  VT.sfx("buzz-sai", T_ALL + 0.05, 0.35);
  function engine(t, o) {
    var out = [], frost = o.frost || 0, cross = o.cross || 0, away = o.away || 0, n = Math.round(t * 12);
    var jx = o.shiver ? (VT.hash(n * 5.1) - 0.5) * 2 * o.shiver : 0;
    // tay ống: buông → khoanh
    var mixP = function (P, Q) { return P.map(function (p, i) { return VT.mix(p, Q[i], cross); }); };
    var aL = mixP([[-236, 30], [-290, 80], [-280, 150]], [[-236, 40], [-160, 150], [100, 108]]);
    var aR = mixP([[236, 30], [290, 80], [280, 150]], [[236, 40], [160, 160], [-100, 124]]);
    var arm = function (p) { var d = "M " + p[0][0] + " " + p[0][1] + " Q " + f(p[1][0]) + " " + f(p[1][1]) + " " + f(p[2][0]) + " " + f(p[2][1]); return VT.line(d, 30) + VT.line(d, 20, "#9AA5AB") + VT.ell(p[2][0], p[2][1], 22, 22, "#7E8A91", 6, { ox: 0, oy: 0 }); };
    out.push(VT.shape("M -170 -170 L -100 -170 L -100 -130 L -170 -130 Z M -40 -176 L 30 -176 L 30 -130 L -40 -130 Z M 90 -170 L 160 -170 L 160 -130 L 90 -130 Z", "#7E8A91", { sw: 6 }));
    out.push(VT.shape("M -210 -130 L 210 -130 C 236 -130 240 -110 240 -90 L 240 110 C 240 136 220 140 200 140 L -200 140 C -226 140 -240 130 -240 104 L -240 -90 C -240 -116 -230 -130 -210 -130 Z", "#97A3AA", { sw: 7 }));
    out.push(VT.line("M -200 100 L 200 100 M -200 -90 L 200 -90", 4, INK, 0.4));
    if (cross < 0.5) out.push(arm(aL) + arm(aR));
    // mặt (vật, không phải mặt người): hai mắt nét mực, mày
    var ex = 60 * away, lidK = o.squeeze ? 1 : 0;
    [-70, 70].forEach(function (x, i) {
      if (lidK) out.push(VT.line("M " + (x + ex - 26) + " -14 L " + (x + ex + 22) + " -2 L " + (x + ex - 26) + " 12", 8));
      else { out.push(VT.ell(x + ex, -10, 30, 34, "#FFFDF6", 6, { ox: 0, oy: 0 })); out.push(VT.dot(x + ex + 14 * (away ? 1 : 0) + (o.px || 0), -4 + (o.py || 0), 12)); }
      out.push(VT.line("M " + (x + ex - 34) + " " + (i ? -66 : -52) + " L " + (x + ex + 30) + " " + (i ? -52 : -66), 8));
    });
    var mz = o.chatter ? (n % 2 ? "M -50 50 L -34 38 L -18 56 L -2 38 L 14 56 L 30 38 L 50 50" : "M -50 50 L -34 60 L -18 40 L -2 60 L 14 40 L 30 60 L 50 50") : "M " + (ex - 26) + " 58 C " + (ex - 14) + " 40 " + (ex + 14) + " 40 " + (ex + 26) + " 58";
    out.push(VT.line(mz, 7));
    if (cross >= 0.5) out.push(arm(aL) + arm(aR));
    // băng
    if (frost > 0) {
      out.push('<path d="M -240 -90 C -200 -130 -120 -130 -60 -130 L -110 -100 L -150 -110 L -200 -60 L -240 -70 Z" fill="#ffffff" opacity="' + f(0.9 * frost) + '"/>');
      out.push('<path d="M 240 -60 C 220 -120 150 -130 100 -130 L 150 -100 L 190 -104 L 240 -20 Z" fill="#ffffff" opacity="' + f(0.9 * frost) + '"/>');
      [-180, -110, -30, 50, 130, 190].forEach(function (x, i) { var L = (22 + VT.hash(i * 2.3) * 34) * frost; out.push(VT.shape("M " + (x - 9) + " 140 L " + x + " " + f(140 + L) + " L " + (x + 9) + " 140 Z", "#DDF3FC", { sw: 4, ox: 2, oy: 2 })); });
    }
    var sx = 1 - 0.18 * Math.sin(away * Math.PI);
    return VT.g(VT.tr(o.x + jx, o.y, o.s || 1, o.rot || 0) + " scale(" + f(sx * 100) / 100 + " 1)", out.join(""));
  }
  shot(A2, A3, "động cơ dỗi", function (t, lt, T) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#40557A"/>';
    // mui xe mở + khoang máy tối
    s += VT.shape("M 520 330 L 1780 330 L 1700 70 L 600 70 Z", "#3F6A70", { sw: 8 });
    s += VT.line("M 640 110 L 1660 110", 5, "#ffffff", 0.4);
    s += VT.shape("M 520 330 L 1780 330 L 1820 900 L 480 900 Z", "#262C35", { sw: 8, ox: 0, oy: 0 });
    s += VT.line("M 560 420 C 700 400 760 520 700 600 M 1740 420 C 1620 420 1580 520 1640 640", 14, "#4A535E");
    var frost = seg(t, FR - 0.1, FR + 0.5);
    var shiver = t >= FR && t < REF ? 6 : t >= REF ? 2 : 0;
    var cross = seg(t, REF, REF + 0.25), away = key(t, [[REF + 0.1, 0], [REF + 0.4, 1, "io"], [TURN + 0.1, 1], [TURN + 0.25, 0.85, "out"], [T_ALL, 1, "io"]]);
    var eo = { x: 1150, y: 620, s: 1.05, frost: frost, shiver: shiver, cross: cross, away: away, chatter: t >= FR && t < REF + 0.3, squeeze: t >= T_ALL - 0.05 && t < T_ALL + 0.5, py: t < FR ? 0 : 6 };
    if (t >= REF && t < REF + 0.5) eo.rot = key(t, [[REF, 0], [REF + 0.2, -4, "out"], [REF + 0.5, 0, "back"]]);
    s += engine(t, eo);
    if (t >= REF + 0.2 && t < REF + 0.75) s += VT.puff({ x: 1420 - seg(t, REF + 0.2, REF + 0.75) * -120, y: 560 - seg(t, REF + 0.2, REF + 0.75) * 40, s: 0.5 + seg(t, REF + 0.2, REF + 0.75) * 0.5, op: 0.9 - seg(t, REF + 0.2, REF + 0.75) * 0.6 });
    if (t >= FR && t < REF) s += VT.line("M 880 470 l -20 -16 M 870 520 l -26 0 M 880 570 l -20 16 M 1420 470 l 20 -16 M 1430 520 l 26 0 M 1420 570 l 20 16", 6, "#ffffff", 0.9);
    // cản trước, đèn
    s += VT.shape("M 400 880 L 1900 880 L 1900 1200 L 400 1200 Z", "#3F6A70", { sw: 8 });
    s += VT.shape("M 470 920 L 640 920 L 640 990 L 470 990 Z", "#F6E7A6", { sw: 6 }) + VT.shape("M 1660 920 L 1830 920 L 1830 990 L 1660 990 Z", "#F6E7A6", { sw: 6 });
    s += VT.line("M 760 960 L 1540 960 M 760 1010 L 1540 1010", 8, "#26313B");
    // Wob nhón chân bên trái, cầm chìa vặn
    var o = { x: 330, y: 1060, s: 0.95, flip: 1, legs: "tiptoe", armR: [350, 150], handR: "nam" };
    var tw = key(t, [[TURN - 0.15, 0], [TURN + 0.05, 1, "out"], [TURN + 0.22, 0.2, "io"], [TURN + 0.3, 1, "out"], [TURN + 0.5, 0, "io"]]);
    if (t < FR) { o.px = 12; o.py = -6; o.brows = "up"; o.mouth = "oSmall"; }
    else if (t < TURN - 0.2) { o.px = 12; o.py = -2; o.brows = "worried"; o.mouth = "flat"; o.lean = key(t, [[FR, 0], [REF, -6]]); }
    else if (t < T_ALL) { o.px = 12; o.py = -8; o.brows = "worried"; o.mouth = "G"; o.lean = 4; }
    else { o.px = 6; o.py = 10; o.brows = "worried"; o.mouth = "frown"; o.lid = 0.35; o.sq = key(t, [[T_ALL, 1], [T_ALL + 0.3, 0.94, "out"]]); o.legs = "stand"; o.armR = [338, 290]; }
    var hand = VT.wobPt(o, o.armR[0], o.armR[1]);
    var keySvg = VT.g(VT.tr(hand[0], hand[1] - 6, 0.95, -20 + tw * 80), VT.ell(0, -34, 20, 20, "#E8C25A", 6) + VT.dot(0, -34, 6, "#262C35") + VT.line("M 0 -14 L 0 40 M 0 22 L 14 22 M 0 34 L 12 34", 9) + VT.line("M 0 -14 L 0 40", 4, "#E8C25A"));
    s += W(t, o) + keySvg;
    if (t >= TURN && t < TURN + 0.5) s += VT.line("M " + f(hand[0] + 40) + " " + f(hand[1] - 60) + " A 50 50 0 0 1 " + f(hand[0] + 60) + " " + f(hand[1]), 5, INK, 0.7);
    var z = key(T, [[A2, 1.0], [A3, 1.05, "sine"]]);
    return { cam: [980, 600, z], shake: VT.shakes(t, [[FR, 0.25, 6], [T_ALL, 0.15, 4]]), world: s, tint: "cold" };
  });

  // ===== S3 · tưởng tượng: xe thường phủ sương, cạo kính hai cái là xong =====
  var G3 = 860, CX3 = 820, CS3 = 1.0, WX3 = CX3 + 520;
  var SW1 = T_CAR + 0.25, SW2 = SW1 + 0.45, SMILE = T_MORNING;
  VT.sfx("pop", A3 + 0.02, 0.4);
  VT.sfx("whoosh", SW1, 0.2); VT.sfx("whoosh", SW2, 0.2);
  VT.sfx("ting", SMILE + 0.05, 0.35);
  function suburb(t, winter) {
    var s = VT.sky(winter ? "#9FB3C6" : "#CFE4F0", 1) + VT.ridge(G3 - 200, 40, winter ? "#C7D5E0" : "#E4EEF2");
    s += VT.g(VT.tr(260, G3 - 4, 1), VT.shape("M -200 0 L -200 -260 L 200 -260 L 200 0 Z", "#E9D7B9", { sw: 6 }) + VT.shape("M -240 -250 L 0 -400 L 240 -250 Z", winter ? C.snow : "#B5564A", { sw: 6 }) +
      VT.shape("M -130 -200 L -50 -200 L -50 -120 L -130 -120 Z", "#DCEFF6", { sw: 5 }) + VT.shape("M 40 0 L 40 -150 L 120 -150 L 120 0 Z", "#7A4A2A", { sw: 5 }));
    s += VT.line("M 1660 " + G3 + " L 1660 " + (G3 - 260) + " M 1660 " + (G3 - 180) + " L 1600 " + (G3 - 240) + " M 1660 " + (G3 - 210) + " L 1720 " + (G3 - 270), 12, "#6E5444");
    s += VT.shape("M -1200 " + (G3 + 6) + " L 3200 " + (G3 - 4) + " L 3200 2400 L -1200 2400 Z", winter ? C.snow : "#C9C2B4", { sw: 6, ox: 0, oy: 5 });
    if (!winter) s += VT.line("M -200 " + (G3 + 30) + " L 2200 " + (G3 + 24), 4, "#ffffff", 0.7);
    return s;
  }
  // sương trên kính chắn gió (hệ xe): hai dải, dải nào bị cạo thì biến mất
  function frostGlass(k1, k2) {
    var out = "";
    if (k1 < 1) out += '<path d="M 62 -292 L 168 -292 C 186 -292 196 -286 206 -272 L 232 -236 L 62 -236 Z" fill="#F4FBFE" opacity="0.92"/>';
    if (k2 < 1) out += '<path d="M 62 -236 L 232 -236 L 262 -190 L 62 -190 Z" fill="#F4FBFE" opacity="0.92"/>';
    out += VT.line("M 80 -270 l 30 -10 M 140 -256 l 24 -8 M 90 -214 l 40 -6", 3, "#BFD7E2", 0.9);
    return out;
  }
  shot(A3, A4, "tưởng tượng: cạo kính", function (t, lt, T) {
    var s = suburb(t, false);
    var k1 = seg(t, SW1, SW1 + 0.3), k2 = seg(t, SW2, SW2 + 0.3);
    s += VT.car({ x: CX3, y: G3, s: CS3, color: "#E0703A" }) + VT.g(VT.tr(CX3, G3, CS3), frostGlass(k1, k2));
    // Wob đứng trước mũi xe, quay trái, cạo kính
    var o = { x: WX3, y: G3, s: 0.9, flip: -1 };
    var sweep = function (k, y) { return [VT.lerp(CX3 + 120, CX3 + 250, VT.ease.io(k)), y]; };
    var hp;
    if (t < SW1) hp = key(t, [[A3, [CX3 + 330, G3 - 120]], [SW1, [CX3 + 120, G3 - 270], "io"]]);
    else if (t < SW1 + 0.3) hp = sweep(k1, G3 - 270);
    else if (t < SW2) hp = key(t, [[SW1 + 0.3, [CX3 + 250, G3 - 270]], [SW2, [CX3 + 140, G3 - 214], "io"]]);
    else if (t < SW2 + 0.3) hp = [VT.lerp(CX3 + 140, CX3 + 260, VT.ease.io(k2)), G3 - 214];
    else { var fin = VT.wobPt(o, 390, 160); hp = key(t, [[SW2 + 0.3, [CX3 + 260, G3 - 214]], [SMILE, fin, "back"]]); }
    o.armR = VT.wobLocal(o, hp[0], hp[1]); o.handR = "nam";
    if (t < SMILE) { o.px = 12; o.py = 0; o.brows = "flat"; o.mouth = "content"; o.lean = t >= SW1 && t < SW2 + 0.3 ? 6 : 0; }
    else { o.eyes = "happy"; o.mouth = "smile"; o.sq = key(t, [[SMILE, 0.94], [SMILE + 0.3, 1, "back"]]); }
    var scraper = VT.g(VT.tr(hp[0], hp[1], 0.9, -30), VT.shape("M -8 -40 L 8 -40 L 10 10 L -10 10 Z", "#F6D36A", { sw: 5 }) + VT.shape("M -30 10 L 30 10 L 26 30 L -26 30 Z", "#E8C25A", { sw: 5 }));
    s += W(t, o) + scraper;
    if ((t >= SW1 && t < SW1 + 0.35) || (t >= SW2 && t < SW2 + 0.35)) s += VT.sparkle({ x: hp[0] - 20, y: hp[1] - 30, s: 0.4 }) + VT.puff({ x: hp[0] + 30, y: hp[1] + 20, s: 0.25 });
    if (t >= SMILE) { var kk = Math.floor(t * 6) % 2; s += VT.sparkle({ x: CX3 + 180, y: G3 - 330, s: kk ? 0.6 : 0.4 }); }
    var z = key(T, [[A3, 1.18], [A4, 1.24, "sine"]]);
    return { cam: [1020, 640, z], world: s, over: cloudFrame(key(T, [[A3, 0.3], [A3 + 0.25, 1, "back"]])), tint: "warm" };
  });

  // ===== S4 · mùa đông không trả chìa khoá =====
  var CL0 = T_WINTER2 - 0.15, GRAB = T_NEVER + 0.2, POCKET = T_BACK + 0.05, AWAY = T_KEYS - 0.1;
  VT.sfx("whoosh", CL0, 0.45);
  VT.sfx("pop", GRAB, 0.7);
  VT.sfx("bonk", POCKET + 0.15, 0.3);
  VT.sfx("liu-lo-soc", T_KEYS + 0.05, 0.7);
  function keyring(x, y, s, t, rot) {
    var j = Math.sin(Math.round(t * 12) * 1.9) * 10;
    var one = function (r) { return VT.g("rotate(" + f(r) + ")", VT.line("M 0 0 L 0 60", 12) + VT.line("M 0 0 L 0 60", 6, "#D9B44A") + VT.line("M 0 44 L 12 44 M 0 56 L 10 56", 6) + VT.ell(0, 0, 14, 14, "#E8C25A", 5)); };
    return VT.g(VT.tr(x, y, s, rot || 0), VT.ell(0, 0, 26, 26, "none", 6) + VT.g("translate(0 24)", one(-30 + j) + one(5 - j) + one(35 + j * 0.5)));
  }
  function winterCloud(x, y, s, t, o) {
    var pts = [[-260, 40], [-280, -20], [-220, -90], [-130, -110], [-60, -170], [40, -160], [110, -110], [200, -120], [270, -50], [260, 30], [180, 70], [60, 80], [-80, 76], [-190, 70]];
    var body = VT.shape(VT.smooth(pts, true), "#E7EEF3", { sw: 7, ox: 8, oy: 8 });
    body += VT.line("M -200 40 C -120 60 60 60 200 30", 4, "#B9C9D4", 0.8);
    var px = o.px || 0;
    [-70, 40].forEach(function (ex, i) {
      body += VT.ell(ex, -40, 24, 28, "#FFFDF6", 5, { ox: 0, oy: 0 }) + VT.dot(ex + 4 + px, -34, 10);
      body += VT.line("M " + (ex - 30) + " " + (i ? -86 : -76) + " L " + (ex + 26) + " " + (i ? -76 : -86), 7);
    });
    // túi tuyết trên bụng mây
    body += VT.g("rotate(-14 230 10)", VT.shape("M 180 -20 L 270 -26 L 268 40 C 250 58 200 58 184 42 Z", "#CFE0EA", { sw: 5 }) + '<path d="M 192 -12 L 262 -16 L 260 34 C 246 46 206 46 194 34 Z" fill="none" stroke="#1f2326" stroke-width="2.5" stroke-dasharray="6 7" opacity="0.7"/>' + VT.shape("M 176 -24 L 274 -30 L 262 2 L 188 6 Z", "#B9CFDC", { sw: 5 }));
    // dải tuyết rơi dưới mây
    var sn = "";
    for (var i = 0; i < 10; i++) { var xx = -230 + i * 50 + VT.hash(i) * 20, yy = 100 + ((Math.round(t * 12) * 9 + i * 37) % 160); sn += VT.dot(xx, yy, 5, "#ffffff"); }
    return VT.g(VT.tr(x, y, s, o.rot || 0), sn + body + (o.after || ""));
  }
  shot(A4, END, "mùa đông giữ chìa khoá", function (t, lt, T) {
    var s = suburb(t, true);
    s += VT.snowfall(t, 40, [-100, -60, 2100, 1000], 90);
    s += VT.car({ x: CX3, y: G3, s: CS3, color: "#E0703A", snow: true });
    s += VT.shape("M " + (CX3 - 460) + " " + (G3 + 6) + " C " + (CX3 - 300) + " " + (G3 - 120) + " " + (CX3 + 200) + " " + (G3 - 110) + " " + (CX3 + 460) + " " + (G3 + 6) + " Z", C.snow, { sw: 6 });
    var o = { x: WX3, y: G3, s: 0.9, flip: -1, cold: true };
    // tay giơ chùm chìa khoá (khoe), bị chộp mất ở GRAB
    var hp = VT.wobPt(o, 340, 40);
    if (t < GRAB) { o.armR = [340, 40]; o.handR = "nam"; o.eyes = "happy"; o.mouth = "smile"; o.bob = -6 * Math.abs(Math.sin(t * 9)); }
    else if (t < AWAY) { o.armR = [340, 40]; o.handR = "xoe"; o.eyes = "wide"; o.px = -10; o.py = -14; o.mouth = "oSmall"; o.brows = "up"; }
    else { o.armR = [360, 20]; o.armL = [40, 120]; o.handR = "xoe"; o.handL = "xoe"; o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.marks = "shock"; o.px = -14; o.py = -16; o.sq = key(t, [[AWAY, 1.1], [AWAY + 0.3, 1, "out"]]); }
    s += W(t, o);
    // mây bay vào, sà xuống, chộp, nhét túi, bay đi
    var cp = key(t, [[A4, [-500, 120]], [CL0, [-500, 120]], [GRAB - 0.08, [hp[0] - 390, hp[1] - 120], "out"], [POCKET + 0.2, [hp[0] - 430, hp[1] - 150], "io"], [AWAY, [hp[0] - 410, hp[1] - 170]], [AWAY + 0.5, [2500, -300], "in2"]]);
    var cs = 1.05, rot = t >= AWAY ? key(t, [[AWAY, 0], [AWAY + 0.3, 12]]) : 0;
    var keysSvg = "", after = "";
    if (t < GRAB) keysSvg = keyring(hp[0], hp[1] - 10, 0.9, t, 0);
    else if (t < POCKET) {
      // dải mây quấn chùm chìa, kéo về túi
      var k = VT.ease.io(seg(t, GRAB, POCKET)), tip = [VT.lerp(hp[0], cp[0] + 226 * cs, k), VT.lerp(hp[1] - 10, cp[1] - 10 * cs, k)];
      s += VT.line("M " + f(cp[0] - 40 * cs) + " " + f(cp[1] + 60 * cs) + " Q " + f((cp[0] + tip[0]) / 2 + 40) + " " + f(tip[1] + 80) + " " + f(tip[0]) + " " + f(tip[1]), 34) + VT.line("M " + f(cp[0] - 40 * cs) + " " + f(cp[1] + 60 * cs) + " Q " + f((cp[0] + tip[0]) / 2 + 40) + " " + f(tip[1] + 80) + " " + f(tip[0]) + " " + f(tip[1]), 24, "#E7EEF3");
      keysSvg = keyring(tip[0], tip[1], 0.9 * (1 - 0.3 * k), t, 20 * k);
    }
    if (t >= POCKET && t < AWAY + 0.5) after = VT.g("rotate(-14 230 10)", VT.ell(226, -30, 14, 14, "#E8C25A", 5) + VT.shape("M 176 -24 L 274 -30 L 262 2 L 188 6 Z", "#B9CFDC", { sw: 5 }));
    var cloudPx = t < GRAB ? 14 : t < AWAY ? 18 : -10;
    s += winterCloud(cp[0], cp[1], cs, t, { px: cloudPx, rot: rot, after: after });
    s += keysSvg;
    if (t >= GRAB && t < GRAB + 0.25) s += VT.impact({ x: hp[0], y: hp[1] - 10, s: 0.5 });
    if (t >= POCKET && t < POCKET + 0.3) s += VT.puffBurst({ x: cp[0] + 226 * cs, y: cp[1] - 10 * cs, k: seg(t, POCKET, POCKET + 0.3), s: 0.4, spread: 60 });
    if (t >= AWAY && t < AWAY + 0.5) s += VT.speedLines({ x0: cp[0] - 420, y0: cp[1] - 80, n: 5, gap: 50, len: 200, dx: -1, dy: 0.25, sw: 6 });
    var z = key(T, [[A4, 1.12], [AWAY, 1.18], [END, 1.45, "sine"]]), cx = key(T, [[A4, 980], [AWAY, 1020], [END, WX3 - 40, "sine"]]), cy = key(T, [[A4, 560], [AWAY, 560], [END, G3 - 250, "sine"]]);
    return { cam: [cx, cy, z], shake: VT.shake(t, GRAB, 0.2, 6), world: s, over: cloudFrame(1), tint: "cold" };
  });
  return shots;
};
