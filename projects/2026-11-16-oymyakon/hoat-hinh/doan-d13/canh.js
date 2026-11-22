/* d13 · vẽ tay · kỷ lục 1933 và ba con số cãi nhau (196,11–228,03 s tuyệt đối; 31,92 s). Vào "cat", ra "cat".
 * S0 Wob ngước nhìn đài tưởng niệm (vẽ chung, tối giản), gãi đầu, bong bóng ?.
 * S1–S5 trang sổ phác thảo: Wob nhảy vào từ mép dưới, cầm bút chì to vẽ hộp nhiệt kế của trạm khí tượng, rồi nhảy lên dòng kẻ
 *   dưới từng con số, đi trước ngòi bút khi viết (chữ viết dần đúng lúc đọc, chỉ chữ trong chu_tren_do_vat).
 *   Hai con số của hai tổ chức ở hai bên; Wob nhìn qua lại.
 * S6 Wob gạch qua gạch lại giữa ba con số tới thủng trang, rồi nhìn người xem qua lỗ thủng.
 * S7–S8 cạnh đài tưởng niệm: ưỡn ngực, vương miện băng lấp lánh; "Well." khựng lại liếc mắt; "Almost." vương miện rơi cạch.
 * Đồ Wob: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng; vương miện băng nhỏ trên mũ (rơi ở "Almost.").
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, DUR = D.thoi_luong;
  var CH = D.chu_tren_do_vat; // ["6 Feb 1933","≈ −68°C","−90°F","−67.7°C","−67.8°C"]
  var T_MONU = VT.tu("monument"), T_BECAUSE = VT.tu("because"), T_STATION = VT.tu("station"), T_NINETEEN = VT.tu("nineteen"), T_FEB = VT.tu("february");
  var T_MINUS1 = VT.tu("minus", 0), T_68 = VT.tu("sixtyeight"), T_CELS = VT.tu("celsius", 0, "end");
  var T_MINUS2 = VT.tu("minus", 1), T_FAHR = VT.tu("fahrenheit", 0, "end");
  var T_GUIN = VT.tu("guinness"), T_MINUS3 = VT.tu("minus", 2), T_SEVEN = VT.tu("seven", 0, "end");
  var T_WMO = VT.tu("meteorological"), T_MINUS4 = VT.tu("minus", 3), T_EIGHT = VT.tu("eight", 0, "end");
  var T_SO = VT.tu("so"), T_ARG = VT.tu("argument"), T_EITHER = VT.tu("either"), T_LOWEST = VT.tu("lowest");
  var T_WELL = VT.tu("well"), T_ALMOST = VT.tu("almost");

  function W(t, o) {
    var b = { t: t, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && (b.eyes || "open") === "open") b.lid = Math.max(b.lid || 0, VT.blink(t, 3.1, 0.8));
    if (b.crown !== false && !b.propFront) b.propFront = VT.iceCrown({ x: 200, y: 30, s: 0.62, glint: b.glint || 0 });
    return VT.wob(b);
  }

  // ---------- ngoài trời: làng ban ngày ngắn, đài tưởng niệm ----------
  var GROUND = 840, MX = 520, PLAQUE = (D.chu_tren_do_vat || []).indexOf("POLE OF COLD") >= 0 ? "POLE OF COLD" : null;
  function village(t) {
    var s = VT.sky("#CFE2EC", 1) + VT.ridge(600, -150, "#E6EEF2") + VT.farHouses(700, 80, t, 9) + VT.fog(t, 690, 2);
    s += VT.snowGround(GROUND) + VT.monumentSlab({ x: MX, y: GROUND + 6, s: 0.95, plaque: PLAQUE }); // khối trắng, thuỷ ngân xanh như d12
    s += VT.diamondDust(t, 12, [-200, 120, 2200, 780]);
    return s;
  }
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · nhìn đài tưởng niệm, gãi đầu, "?" =====
  var B0 = T_BECAUSE - 0.08;
  VT.sfx("pop", T_MONU + 0.05, 0.45);
  shot(0, B0, "nhìn đài tưởng niệm, ?", function (t, lt, T) {
    var o = { s: 0.66, x: 1080, y: GROUND, flip: 1, px: -12, py: -12, brows: "skeptic", mouth: "flat" };
    var scr = Math.sin(Math.round(t * 12) * 1.6);
    o.armR = [262 + scr * 10, 48 + scr * 6]; o.handR = "xoe";
    var out = village(t) + W(t, o);
    if (t >= T_MONU) out += VT.bubble({ x: 1210, y: 430, s: key(t, [[T_MONU, 0.1], [T_MONU + 0.14, 0.45, "back"]]), sym: "?", tail: -1 });
    return { cam: [900, 560, key(T, [[0, 1.12], [B0, 1.16]])], world: out, tint: "cold" };
  });

  // ---------- trang sổ ----------
  // Bố cục mới (phản biện 19/11): Wob đứng cố định ở mép trái sổ, viết bằng bút chì to; vương miện cách mọi chữ ≥ 40 px;
  // '−90°F' ngay dưới '≈ −68°C'; không chữ trong vùng logo (x > 1500, y < 150).
  var WS = 0.95, STA = { x: 470, y: 560, s: 0.6 }, WP = [250, 1050];
  var TX = [
    { x: 1060, y: 230, s: 90, str: CH[0], a: T_NINETEEN - 0.05, b: T_FEB + 0.45, fill: C.ink },
    { x: 1060, y: 440, s: 118, str: CH[1], a: T_MINUS1 - 0.05, b: T_CELS, fill: "#2c4f6e" },
    { x: 1060, y: 600, s: 104, str: CH[2], a: T_MINUS2 - 0.05, b: T_FAHR, fill: C.ink },
    { x: 660, y: 820, s: 92, str: CH[3], a: T_MINUS3 - 0.05, b: T_SEVEN, fill: C.ink },
    { x: 1420, y: 820, s: 92, str: CH[4], a: T_MINUS4 - 0.05, b: T_EIGHT, fill: C.ink },
  ];
  TX.forEach(function (q) { q.x0 = q.x - VT.textW(q.str, q.s) / 2; q.x1 = q.x + VT.textW(q.str, q.s) / 2; });
  // "Gạch qua gạch lại" mà KHÔNG nét nào đè lên chữ số (phản biện vòng 2): khoanh ba nhóm số (≈ −68°C/−90°F là một nhóm),
  // rồi gạch điên cuồng trong khoảng trống giữa các vòng, nơi trang thủng.
  var RINGS = [[TX[1].x, 500, 420, 200], [TX[3].x, TX[3].y - 32, 245, 80], [TX[4].x, TX[4].y - 32, 245, 80]];
  var SBOX = [935, 722, 1145, 900];
  var SCR = [];
  for (var si = 0; si < 26; si++) SCR.push([VT.lerp(SBOX[0], SBOX[2], si % 2 ? 0.9 - VT.hash(si * 2.7) * 0.25 : 0.1 + VT.hash(si * 3.1) * 0.25), VT.lerp(SBOX[1], SBOX[3], VT.hash(si * 5.3))]);
  function ringPath(r, k) { var pts = []; for (var i = 0; i <= 24; i++) { var a = -Math.PI / 2 + i / 24 * Math.PI * 2.1; pts.push([r[0] + Math.cos(a) * r[2] * (1 + 0.03 * Math.sin(i * 1.9)), r[1] + Math.sin(a) * r[3]]); } return pts; }
  function scribbleDraw(t) {
    var k = seg(t, T_SCR0, T_SCR1), out = "", tip = null;
    RINGS.forEach(function (r, i) { var kk = VT.clamp(k * 4 - i * 0.7, 0, 1); if (kk > 0) { var pts = ringPath(r, kk); out += VT.lineDraw(VT.smooth(pts, false), kk, 7); if (kk < 1) tip = VT.alongPts(pts, kk); } });
    var kz = VT.clamp((k - 0.55) / 0.45, 0, 1);
    if (kz > 0) { out += VT.lineDraw("M " + SCR.map(function (q) { return f(q[0]) + " " + f(q[1]); }).join(" L "), kz, 7); if (kz < 1) tip = VT.alongPts(SCR, kz); }
    return { svg: out, tip: tip };
  }
  var HOLE = [1042, 812], T_SCR0 = T_SO + 0.05, T_SCR1 = T_ARG + 0.05, T_TEAR = T_ARG + 0.12, T_PEEK = T_TEAR + 0.32;
  var ST_A = T_BECAUSE + 0.35, ST_B = T_STATION + 0.25;
  function wobPage(t) {
    var r = { x: WP[0], y: WP[1], hop: 0, tip: null, k: 0 };
    var pop = seg(t, B0, B0 + 0.35);
    if (pop < 1) { r.y = VT.lerp(WP[1] + 320, WP[1], VT.ease.back(pop)); r.hop = pop; return r; }
    TX.forEach(function (q) { if (t >= q.a && t <= q.b) { r.k = seg(t, q.a, q.b); r.tip = VT.textTip(q.x, q.y, q.str, q.s, r.k); } });
    var ks = seg(t, ST_A, ST_B);
    if (t >= ST_A && t < ST_B) { var top = STA.y - 640 * STA.s, yk = VT.lerp(STA.y + 10, top - 10, ks), zig = Math.sin(ks * 50) * 0.5 + 0.5; r.tip = [STA.x - 100 + 300 * zig, yk + 4]; }
    return r;
  }
  function pageBase(hole) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#6E4B32"/>';
    var pg = "M 40 30 L 1880 30 L 1880 1060 L 40 1060 Z";
    if (hole) { var hp = holePath(hole); pg += " M " + hp.map(function (p) { return f(p[0]) + " " + f(p[1]); }).join(" L ") + " Z"; }
    s += VT.shape(pg, "#FBF6E9", { sw: 7, ox: 10, oy: 8, rule: "evenodd" });
    for (var y = 110; y < 1050; y += 56) s += VT.line("M 60 " + y + " L 1860 " + y, 2.5, "#9cc8dc", 0.45);
    for (var x = 120; x < 1840; x += 120) s += VT.ell(x, 58, 12, 8, "#6E4B32", 4);
    return s;
  }
  function holePath(k) {
    var pts = [];
    for (var i = 0; i < 14; i++) { var a = i / 14 * Math.PI * 2, r = (66 + VT.hash(i * 4.1) * 30) * k; pts.push([HOLE[0] + Math.cos(a) * r * 1.15, HOLE[1] + Math.sin(a) * r]); }
    return pts;
  }
  function drawings(t) {
    var s = "", ks = seg(t, ST_A, ST_B);
    if (ks > 0) {
      var top = STA.y - 640 * STA.s, yk = VT.lerp(STA.y + 10, top - 20, ks), id = VT.uid("st");
      s += '<clipPath id="' + id + '"><rect x="0" y="' + f(yk) + '" width="900" height="' + f(STA.y + 20 - yk) + '"/></clipPath><g clip-path="url(#' + id + ')">' + VT.weatherStation({ x: STA.x, y: STA.y, s: STA.s, old: true }) + "</g>";
    }
    TX.forEach(function (q) { var k = seg(t, q.a, q.b); if (k > 0) s += VT.textWrite(q.x, q.y, q.str, q.s, k, { w: 800, fill: q.fill }); });
    if (t >= T_SCR0) s += scribbleDraw(t).svg;
    return s;
  }
  function pageScene(t, extra) {
    var p = wobPage(t), o = { s: WS, x: p.x, y: p.y, flip: 1, mouth: "content", px: -10, py: -8 };
    if (p.hop > 0 && p.hop < 1) { o.legs = "tuck"; o.sq = p.hop < 0.5 ? 1.1 : 0.95; o.eyes = "happy"; o.mouth = "smile"; o.arms = "up"; }
    var scrib = t >= T_SCR0 && t < T_SCR1, tip = p.tip;
    if (scrib) tip = scribbleDraw(t).tip;
    if (extra) for (var k in extra) o[k] = extra[k];
    if (scrib) { o.brows = "down"; o.mouth = "chatter"; o.px = -6; o.py = -12; o.shiver = 3; }
    var pencil = "";
    if (tip) {
      var left = false, hp = [330, 40];
      if (left) { o.armL = hp; o.handL = "nam"; } else { o.armR = hp; o.handR = "nam"; }
      pencil = VT.pencilTo(VT.wobPt(o, hp[0], hp[1]), tip, { s: 0.75 });
      if (!scrib && Math.round(t * 6) % 2) o.lean = left ? -3 : 3;
    }
    return { out: pageBase(t >= T_TEAR ? VT.ease.back(seg(t, T_TEAR, T_TEAR + 0.15)) : 0) + W(t, o) + pencil + drawings(t), o: o, p: p }; // chữ số vẽ SAU bút chì: không nét nào đè lên số
  }
  // camera trang sổ: lướt smootherstep tới từng chỗ viết
  function C3(q, z, dx, dy) { return [q.x + (dx || 90), q.y + (dy || 40), z]; }
  var CAM = [ // khung rộng giữ cả Wob (mép trái) lẫn chữ đang viết; chừa ≥ 60 px trên '6 Feb 1933'
    [B0, [760, 620, 1.18]], [ST_B + 0.1, [800, 600, 1.12]],
    [TX[0].a, [880, 575, 1.08], "io3"], [TX[1].b, [890, 580, 1.1]],
    [TX[2].b + 0.3, [900, 585, 1.12]], [TX[3].a, [880, 600, 1.1], "io3"], [TX[4].b + 0.3, [900, 590, 1.08], "io3"],
    [T_SCR0, [900, 600, 1.06], "io3"], [T_TEAR, [HOLE[0] - 100, 620, 1.08], "out"],
  ];
  function camPage(T) { return key(T, CAM); }

  // ===== S1 · Wob nhảy vào từ mép dưới, vẽ hộp nhiệt kế trạm khí tượng =====
  var B1 = TX[0].a - 0.5;
  VT.sfx("boing", B0 + 0.04, 0.35);
  shot(B0, B1, "vẽ trạm khí tượng", function (t, lt, T) { return { cam: camPage(T), world: pageScene(t).out, tint: null }; });
  // ===== S2 · "6 Feb 1933", "≈ −68°C" =====
  var B2 = TX[2].a - 0.45;
  VT.sfx("ting", T_68 + 0.02, 0.5);
  shot(B1, B2, "viết ngày, ≈ −68°C", function (t, lt, T) {
    var x = t > TX[1].b + 0.1 ? { px: 12, py: -4, brows: "up", mouth: "oSmall" } : null;
    return { cam: camPage(T), world: pageScene(t, x).out, tint: null };
  });
  // ===== S3 · "−90°F" =====
  var B3 = T_GUIN - 0.15;
  shot(B2, B3, "viết −90°F", function (t, lt, T) {
    var x = t > TX[2].b + 0.1 ? { px: -12, py: -10, mouth: "flat", brows: "up", eyes: "open" } : null;
    return { cam: camPage(T), world: pageScene(t, x).out, tint: null };
  });
  // ===== S4 · Guinness: "−67.7°C"; Wob nhìn qua lại hai số =====
  var B4 = T_WMO - 0.4;
  shot(B3, B4, "viết −67.7°C", function (t, lt, T) {
    var x = t > TX[3].b + 0.05 ? { px: (Math.round((t - TX[3].b) * 2.4) % 2 ? -12 : 12), py: -10, brows: "skeptic", mouth: "flat" } : null;
    return { cam: camPage(T), world: pageScene(t, x).out, tint: null };
  });
  // ===== S5 · WMO: "−67.8°C"; Wob nhìn ba con số =====
  var B5 = T_SO - 0.06;
  shot(B4, B5, "viết −67.8°C", function (t, lt, T) {
    var x = t > TX[4].b + 0.05 ? { px: (Math.round((t - TX[4].b) * 3) % 3 - 1) * 12, py: -10, brows: "worried", mouth: "wobbly" } : null;
    return { cam: camPage(T), world: pageScene(t, x).out, tint: null };
  });
  // ===== S6 · gạch qua gạch lại tới thủng trang → nhìn người xem qua lỗ =====
  var B6 = T_EITHER - 0.1;
  VT.sfx("pop", T_TEAR, 0.75);
  shot(B5, B6, "gạch thủng trang, nhìn qua lỗ", function (t, lt, T) {
    if (t < T_PEEK) {
      var r = pageScene(t), out = r.out;
      if (t >= T_TEAR) { var hp = holePath(VT.ease.back(seg(t, T_TEAR, T_TEAR + 0.15))); out += VT.shape(VT.smooth(hp, true), "#5A3D2A", { sw: 6, ox: 0, oy: 0 }) + VT.impact({ x: HOLE[0], y: HOLE[1], s: 0.6 * (1 - seg(t, T_TEAR, T_PEEK)), seed: 2 }); r.o.eyes = "wide"; }
      return { cam: camPage(T), shake: VT.shake(t, T_TEAR, 0.2, 8), world: out, tint: null };
    }
    // nhìn qua lỗ: Wob ở phía sau trang, mặt hiện trong lỗ thủng
    var id = VT.uid("hl"), hp2 = holePath(1);
    var behind = '<clipPath id="' + id + '"><path d="' + VT.smooth(hp2, true) + '"/></clipPath><g clip-path="url(#' + id + ')"><rect x="900" y="300" width="800" height="600" fill="#5A3D2A"/>' +
      W(t, { s: 1.3, x: HOLE[0] + 10, y: HOLE[1] + (392 - 150) * 1.3, flip: 1, px: 0, py: 3, lid: VT.slowBlink(t, T_PEEK + 0.55, 0.35) * 0.5 + 0.45, brows: "flat", mouth: "flat", noBlink: true, crown: false }) + "</g>";
    var pg = pageBase(1) + drawings(t);
    var flaps = "";
    hp2.forEach(function (p, i) { if (i % 3 === 0) flaps += VT.shape("M " + f(p[0]) + " " + f(p[1]) + " L " + f(VT.lerp(p[0], HOLE[0], 0.25) + 10) + " " + f(VT.lerp(p[1], HOLE[1], 0.25)) + " L " + f(p[0] + 18) + " " + f(p[1] + 8) + " Z", "#F3EBD8", { sw: 3 }); });
    return { cam: [HOLE[0], HOLE[1], key(T, [[T_PEEK, 2.35], [B6, 2.5, "sine"]])], world: pg + behind + VT.line(VT.smooth(hp2, true), 6) + flaps, tint: null };
  });

  // ===== S7 · cạnh đài tưởng niệm: ưỡn ngực, vương miện băng lấp lánh =====
  var B7 = T_WELL - 0.12;
  VT.sfx("ting", T_LOWEST, 0.45);
  shot(B6, B7, "ưỡn ngực cạnh đài", function (t, lt, T) {
    var puff = key(t, [[B6, 1], [B6 + 0.4, 1.08, "back"]]);
    var o = { s: 0.7, x: 1060, y: GROUND, flip: 1, eyes: "happy", mouth: "smirk", sq: puff, lean: -6, py: -8, armL: [104, 268], armR: [296, 268], glint: (Math.round(t * 6) % 2) ? 1 : 0.4 };
    var out = village(t) + W(t, o);
    var cr = VT.wobPt(o, 200, -10);
    if (t >= T_LOWEST) [[cr[0] - 60, cr[1] - 30], [cr[0] + 70, cr[1] - 50], [cr[0], cr[1] - 80]].forEach(function (p, i) { out += VT.sparkle({ x: p[0], y: p[1], s: ((Math.round(t * 8) + i) % 3 === 0) ? 0.5 : 0.28 }); });
    var z = key(T, [[B6, 1.25], [B7, 1.42, "sine"]]);
    return { cam: [key(T, [[B6, 860], [B7, 940, "sine"]]), key(T, [[B6, 600], [B7, 620]]), z], world: out, tint: "cold" };
  });
  // ===== S8 · "Well." khựng, liếc; "Almost." vương miện rơi cạch, Wob nhìn xuống =====
  var T_FALL = T_ALMOST + 0.02, T_CLACK = T_FALL + 0.32;
  VT.sfx("tach-bang", T_CLACK, 0.75);
  shot(B7, DUR, "vương miện rơi", function (t, lt, T) {
    var o = { s: 0.7, x: 1060, y: GROUND, flip: 1, mouth: "flat", noBlink: true, armL: [104, 268], armR: [296, 268], sq: 1.04, lean: -4 };
    if (t < T_FALL) { o.px = -13; o.py = 0; o.lid = 0.3; o.brows = "flat"; o.eyes = "open"; }
    else { o.px = 2; o.py = 14; o.lid = 0.35; o.brows = "worried"; o.sq = key(t, [[T_FALL, 1.04], [T_CLACK, 0.97]]); o.lean = 0; }
    var crown = "";
    if (t >= T_FALL) {
      o.crown = false;
      var top = VT.wobPt(o, 200, 30), land = [top[0] + 110, GROUND + 4], u = seg(t, T_FALL, T_CLACK);
      var p = t < T_CLACK ? [VT.lerp(top[0], land[0], u), top[1] + (land[1] - top[1]) * u * u - 60 * Math.sin(u * Math.PI)] : land;
      var rot = t < T_CLACK ? 160 * u - 160 : key(t, [[T_CLACK, 14], [T_CLACK + 0.4, 0, "elastic"]]);
      crown = VT.iceCrown({ x: p[0], y: p[1], s: 0.62 * 0.7, rot: rot });
      if (t >= T_CLACK && t < T_CLACK + 0.3) crown += VT.puffBurst({ x: land[0], y: GROUND + 6, k: seg(t, T_CLACK, T_CLACK + 0.3), s: 0.35 }) + VT.knockLines({ x: land[0], y: GROUND - 20, s: 0.4, k: seg(t, T_CLACK, T_CLACK + 0.3) });
    }
    var out = village(t) + W(t, o) + crown;
    var face = VT.wobPt(o, 200, 170);
    var z = key(T, [[B7, 1.6], [T_FALL, 1.75, "out"], [DUR, 1.82]]);
    return { cam: [face[0] + 20, key(T, [[B7, face[1] + 60], [T_FALL, face[1] + 110, "io"]]), z], shake: VT.shake(t, T_CLACK, 0.15, 3), world: out, tint: "cold" };
  });
  return shots;
};
