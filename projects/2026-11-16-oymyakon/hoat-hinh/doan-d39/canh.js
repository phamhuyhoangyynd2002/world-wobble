/* d39 · vẽ tay · lý do phán quyết: mùa đông dài, tối, lạnh; "about one cup of tea" (638,88–644,5 s tuyệt đối; 5,62 s).
 * Vào "chen", ra "cat". Đồ Wob: mũ len đỏ, khăn đỏ, lông mi đóng băng, quấn chăn kẻ ca-rô.
 * S1 làng đêm, gió tuyết quất ngang, Wob co ro trong chăn · S2 trong nhà gỗ: cận cốc trà có lớp băng (gọi lại d29), thìa gõ "cạch", tỉnh bơ.
 * Từ 2,84 s (641,72 s tuyệt đối) góc phải dưới (x > 1150, y > 560 trên khung) để trống cho end screen.
 * Không chữ (chu_tren_do_vat rỗng).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C;
  var T_LONG = VT.tu("long"), T_DARK = VT.tu("dark"), T_BRUT = VT.tu("brutally"), T_COLD = VT.tu("cold");
  var T_ONE = VT.tu("one"), T_CUP = VT.tu("cup"), T_TEA = VT.tu("tea");
  var A2 = D.nhip[1].tai, END = D.thoi_luong, ES = 4.7; // ES: bắt đầu vùng end screen

  function W(t, o) {
    var b = { t: t, s: 0.9, beanie: "khoa", scarf: true, blanket: true, cold: true, lashes: 1.1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes !== "closed") b.lid = Math.max(b.lid || 0, VT.blink(t, 2.6, 0.5));
    return VT.wob(b);
  }

  // ===== S1 · làng đêm, gió tuyết =====
  var GROUND = 760, WX = 640, WS = 0.9;
  var GUST = T_BRUT - 0.08;
  VT.sfx("brr", 0.1, 0.55);
  VT.sfx("whoosh", GUST, 0.5);
  function nightHouse(x, y, s, lit, seed) {
    var o = VT.shape("M -170 0 L -170 -180 L 170 -180 L 170 0 Z", "#4A3A34", { sw: 6 });
    o += VT.shape("M -205 -170 L 0 -300 L 205 -170 Z", "#DCE6F0", { sw: 6 });
    o += VT.shape("M -60 -140 L 20 -140 L 20 -70 L -60 -70 Z", lit ? C.window : "#2E3B52", { sw: 5 });
    o += VT.line("M -20 -140 L -20 -70 M -60 -105 L 20 -105", 4);
    o += VT.shape("M 60 -230 L 60 -300 L 100 -300 L 100 -210 Z", "#3a2a24", { sw: 5 });
    o += VT.shape("M -200 4 C -80 -24 80 -20 200 4 Z", "#DCE6F0", { sw: 5 });
    return VT.g(VT.tr(x, y, s), o);
  }
  function wind(t, box, n, seed) {
    var out = "", step = Math.round(t * 12);
    for (var i = 0; i < n; i++) {
      var y = box[1] + VT.hash(i * 3.1 + seed) * (box[3] - box[1]), L = 50 + VT.hash(i * 7.7 + seed) * 90;
      var span = box[2] - box[0] + 400, x = box[0] - 200 + ((VT.hash(i * 5.3 + seed) * span + step * (70 + VT.hash(i) * 40)) % span);
      out += VT.line("M " + f(x) + " " + f(y) + " L " + f(x + L) + " " + f(y + L * 0.12), 5, "#F4F9FC", 0.85);
      out += VT.dot(x + L + 12, y + L * 0.12 + 2, 5, "#ffffff");
    }
    return out;
  }
  function lamp(x, y, on, t) {
    var out = "";
    if (on) out += '<path d="M ' + (x + 60) + " " + (y - 330) + " L " + (x - 80) + " " + y + " L " + (x + 220) + " " + y + ' Z" fill="#FFE6A0" opacity="0.22"/>';
    out += VT.line("M " + x + " " + y + " L " + x + " " + (y - 360) + " Q " + x + " " + (y - 390) + " " + (x + 40) + " " + (y - 390) + " L " + (x + 70) + " " + (y - 390), 12);
    out += VT.line("M " + x + " " + y + " L " + x + " " + (y - 360), 5, "#6b7684");
    out += VT.shape("M " + (x + 40) + " " + (y - 392) + " L " + (x + 90) + " " + (y - 392) + " L " + (x + 80) + " " + (y - 366) + " L " + (x + 50) + " " + (y - 366) + " Z", "#3a4250", { sw: 5 });
    out += VT.ell(x + 65, y - 360, 14, 8, on ? "#FFE6A0" : "#5d6676", 4);
    return out;
  }
  // vùng end screen trên khung (x > 1150, y > 560) đổi sang toạ độ thế giới theo camera
  function esBox(cam) { return [cam[0] + (1150 - 960) / cam[2], cam[1] + (560 - 540) / cam[2]]; }

  var shots = [];
  shots.push({ a: 0, b: A2, ten: "làng đêm gió tuyết, Wob co ro", ve: function (t, lt, T) {
    var cam = [key(T, [[0, 860], [A2, 820, "sine"]]), 560, key(T, [[0, 1.28], [A2, 1.36, "sine"]])];
    var lampOn = false, lit1 = t < T_DARK - 0.3, lit3 = !(t >= T_DARK && (t < T_DARK + 0.08 || t >= T_DARK + 0.17));
    var s = VT.sky("#24344F", 1) + VT.ridge(600, -40, "#33476A") + VT.ridge(660, 160, "#3E5578");
    s += nightHouse(220, GROUND - 40, 0.62, lit3, 1) + nightHouse(520, GROUND - 60, 0.45, false, 2) + nightHouse(-80, GROUND - 70, 0.4, lit1, 3);
    s += VT.shape("M -1200 " + (GROUND + 8) + " C -300 " + (GROUND - 10) + " 500 " + (GROUND + 12) + " 1200 " + GROUND + " C 1800 " + (GROUND - 8) + " 2600 " + (GROUND + 10) + " 3200 " + GROUND + " L 3200 2400 L -1200 2400 Z", "#C9D8E6", { sw: 6, ox: 0, oy: 5 });
    s += lamp(890, GROUND + 6, lampOn, t);
    // Wob co ro trong chăn, run, nghiêng người chống gió; gió giật ở "brutally": trượt lùi, chăn bay
    var g = seg(t, GUST, GUST + 0.5), back = key(t, [[GUST, 0], [GUST + 0.35, -70, "out"]]);
    var o = { x: WX + back, y: GROUND + 20, s: WS, shiver: t < GUST ? 3 : 6, marks: "shiver", mouth: Math.round(t * 12) % 2 ? "chatter" : "chatter2", arms: "hug", legs: "shiver", lean: t < GUST ? 7 : key(t, [[GUST, 7], [GUST + 0.2, -6, "out"], [GUST + 0.7, 9, "back"]]) };
    if (t < T_DARK) { o.px = 6; o.py = -6; o.brows = "worried"; }
    else if (t < GUST) { o.px = 12; o.py = -4; o.brows = "worried"; o.eyes = "open"; }
    else { o.eyes = t < GUST + 0.4 ? "squint" : "open"; o.brows = "worried"; o.sq = key(t, [[GUST, 0.9], [GUST + 0.4, 1, "out"]]); o.lashes = 1.25; }
    s += W(t, o);
    if (t >= GUST - 0.02 && t < GUST + 0.75) { // mép chăn bị gió lật
      var fk = Math.sin(seg(t, GUST - 0.02, GUST + 0.75) * Math.PI), cp = VT.wobPt(o, 46, 300), fl = Math.sin(Math.round(t * 12) * 1.7) * 10;
      s += VT.g(VT.tr(cp[0], cp[1], WS, -70 * fk + fl), VT.shape("M 0 0 L -10 -60 L -120 -40 L -90 20 Z", "#C9603A", { sw: 6 }) + VT.line("M -30 -50 L -24 10 M -70 -46 L -60 16 M -8 -30 L -110 -14", 5, "#F2C9A8", 0.8));
    }
    if (t >= GUST && t < GUST + 0.6) s += VT.speedLines({ x0: WX - 420, y0: GROUND - 360, n: 6, gap: 55, len: 220, dx: 1, dy: 0, sw: 6, color: "#F4F9FC" });
    if (t >= GUST) s += VT.puffBurst({ x: WX + back + 120, y: GROUND + 20, k: seg(t, GUST, GUST + 0.4), s: 0.6, spread: 80 });
    // gió tuyết: từ 2,84 s không vẽ vào góc phải dưới
    var es = esBox(cam), dense = t < GUST ? 26 : 40;
    var sn = wind(t, [-200, 80, 2000, 980], dense, 1.3);
    if (T >= ES - 0.2) {
      var cid = VT.uid("es");
      sn = '<clipPath id="' + cid + '"><path d="M -1200 -1200 L 3200 -1200 L 3200 ' + f(es[1]) + " L " + f(es[0]) + " " + f(es[1]) + " L " + f(es[0]) + ' 2400 L -1200 2400 Z"/></clipPath><g clip-path="url(#' + cid + ')">' + sn + "</g>";
    }
    s += sn;
    return { cam: cam, shake: VT.shake(t, GUST, 0.3, 6), world: s, tint: "cold", bg: "#24344F" };
  } });

  // ===== S2 · trong nhà: cốc trà có lớp băng, thìa gõ "cạch", tỉnh bơ =====
  var CUPX = 800, CUPY = 748, CS = 1.6, TAP2 = T_TEA - 0.02, TAP1 = TAP2;
  VT.sfx("tach-bang", TAP2, 0.8);
  shots.push({ a: A2, b: END, ten: "cận cốc trà đóng băng, thìa gõ", ve: function (t, lt, T) {
    var s = VT.logWall();
    // cửa sổ đêm tuyết (phía trên, ngoài vùng end screen)
    s += VT.shape("M 1010 110 L 1470 110 L 1470 470 L 1010 470 Z", "#26385A", { sw: 9, ox: 6, oy: 6 });
    s += VT.snowfall(t, 18, [1020, 120, 1460, 460], 120);
    s += VT.line("M 1240 110 L 1240 470 M 1010 290 L 1470 290", 9);
    s += VT.shape("M 990 470 L 1490 470 L 1500 500 L 980 500 Z", C.woodLight, { sw: 6 });
    s += VT.shape("M 1010 110 L 1130 110 L 1080 140 L 1040 126 L 1010 170 Z", "#ffffff", { sw: 0, ox: 0, oy: 0 });
    // Wob sau bàn (bàn vẽ sau, che nửa dưới), tay phải cầm thìa gõ lớp băng
    var o = { x: 460, y: 846, s: 1.36, flip: 1, legs: "stand", noBlink: true };
    var rim = [CUPX - 18, CUPY - 130 * CS + 2];
    var hit = function (T0) { return [[T0 - 0.32, 0], [T0 - 0.12, -1, "out"], [T0, 0.0, "in"], [T0 + 0.1, -0.45, "out"], [T0 + 0.26, -0.2, "io"]]; };
    var lift = key(t, [[A2, -0.2], [T_CUP - 0.1, -0.35, "io"]].concat(hit(TAP2)).concat([[TAP2 + 0.4, -0.55, "io"]]));
    var tip = [rim[0] - 10, rim[1] + lift * 110 - 4];
    // thìa: cán từ bàn tay xuống mũi thìa
    var hand = [tip[0] - 70, tip[1] - 84];
    o.armR = VT.wobLocal(o, hand[0], hand[1]); o.handR = "nam"; o.arms = null; o.armL = [150, 250]; o.handL = "nam";
    if (t < TAP2 - 0.45) { o.px = 12; o.py = 10; o.brows = "skeptic"; o.mouth = "flat"; o.lid = 0.3; }
    else if (t < TAP2 + 0.35) { o.px = 14; o.py = 14; o.brows = "flat"; o.mouth = "flat"; o.lid = 0.45; o.eyes = (t >= TAP1 && t < TAP1 + 0.1) || (t >= TAP2 && t < TAP2 + 0.12) ? "squint" : "open"; }
    else { o.px = 0; o.py = 3; o.brows = "flat"; o.mouth = "flat"; o.lid = 0.5; }
    s += W(t, o);
    s += VT.shape("M -400 730 L 2320 730 L 2320 1600 L -400 1600 Z", C.wood, { sw: 8, ox: 0, oy: 6 });
    s += VT.line("M -300 780 C 100 772 500 788 1000 780", 3, C.woodDark, 0.6);
    s += VT.cup({ x: CUPX, y: CUPY, s: CS, state: "frozen", steam: false, color: "#F7F4EC" });
    // lớp băng bóng trên mặt trà
    s += '<ellipse cx="' + CUPX + '" cy="' + f(CUPY - 130 * CS) + '" rx="' + f(54 * CS) + '" ry="' + f(10 * CS) + '" fill="#EAF7FD" opacity="0.9"/>';
    s += VT.line("M " + f(CUPX - 50) + " " + f(CUPY - 130 * CS - 2) + " L " + f(CUPX - 6) + " " + f(CUPY - 130 * CS - 8), 5, "#ffffff", 0.95);
    var gl = Math.floor(t * 4) % 2;
    s += VT.sparkle({ x: CUPX + 46, y: CUPY - 130 * CS - 14, s: gl ? 0.42 : 0.3 });
    s += VT.line("M " + f(hand[0]) + " " + f(hand[1]) + " L " + f(tip[0]) + " " + f(tip[1] - 14), 9, "#1f2326") + VT.line("M " + f(hand[0]) + " " + f(hand[1]) + " L " + f(tip[0]) + " " + f(tip[1] - 14), 4, "#B8C4CA");
    s += VT.ell(tip[0] + 4, tip[1] - 6, 20, 13, "#C9D3D8", 5);
    [TAP2].forEach(function (T0, j) { j = 1;
      if (t >= T0 && t < T0 + 0.3) { s += VT.knockLines({ x: tip[0], y: tip[1], s: j ? 0.9 : 0.6, k: seg(t, T0, T0 + 0.3) }); s += VT.sparkle({ x: tip[0] + 40, y: tip[1] - 40, s: 0.5 }); }
    });
    var z = key(T, [[A2, 1.35], [END, 1.39, "sine"]]);
    return { cam: [850, 560, z], shake: VT.shakes(t, [[TAP2, 0.15, 3]]), world: s, tint: "warm" };
  } });
  return shots;
};
