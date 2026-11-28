/* d13 · vẽ tay · giả thuyết "cực quang" (143,514–168,114 s tuyệt đối; 24,6 s). Vào "giay", ra "cat".
 * S0 sơ đồ trang sổ: tấm thẻ cực quang (đế lót ly ở d05) lật ngửa; mũi tên mực từ vệt cực quang xuống mái nhà; Wob ở mép trang viết "?", gõ bút đúng "sky.".
 * S1 cánh đồng tuyết đêm, Wob ngửa mặt, tay cầm bình trà bốc hơi. S2 cực quang từ "northern", ánh xanh phủ lên Wob, Wob há miệng.
 * S3 cận mặt: "nose" mảng lục địa giữa mặt tê trắng (rig landFrost); "Lovely." xoa hai cái, hồng lại; "wrong." ánh xanh tắt phụt, giữ.
 * S4–S5 sơ đồ: sổ khách tự lật vù vù, dày dần; "record" thẻ "607,818 guest nights" (dấu "record") + 2024 bật lên, dán vào gáy/bìa; sổ phồng gấp đôi, Wob ôm cho khỏi bung.
 * S6 thước thời gian: nhà nhỏ 1900 đầu trái; "tourists" sổ khách trượt về đầu phải; "followed." Wob gạch X lên thẻ cực quang; giữ.
 * Đồ Wob: áo phao xanh lam túi phải, mũ len xanh lá thông bông kem, khăn kem sọc xanh lá thông, ba lô ô liu, giày đỏ.
 * Chữ: "?", "607,818 guest nights", "record", "2024", "1900" (thẻ ghi rõ đơn vị: đêm lưu trú, không phải số khách).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, C = VT.C, f = VT.f;
  var DUR = D.thoi_luong;
  var T_SKY = VT.tu("sky"), T_I = VT.tu("I"), T_FLASK = VT.tu("flask"), T_THE = VT.tu("The", 1), T_NORTH = VT.tu("northern"), T_GREEN = VT.tu("green"),
    T_MY = VT.tu("My", 1), T_NOSE = VT.tu("nose"), T_NUMB = VT.tu("numb"), T_LOV = VT.tu("Lovely"), T_WRONG = VT.tu("wrong"), T_TOUR = VT.tu("Tourism"),
    T_IN = VT.tu("In"), T_REC = VT.tu("record"), T_BUT = VT.tu("But"), T_TOURISTS = VT.tu("tourists"), T_FOLL = VT.tu("followed");
  var BLUE = "#2c4f6e", RED = "#A8361F";
  VT.sfx("lat-giay", 0.6, 0.6);
  VT.sfx("hoi-nuoc", T_FLASK - 0.1, 0.5);
  VT.sfx("pop", T_REC + 0.05, 0.6);

  function W(t, o) {
    var b = { t: t, puffer: true, beanie: "thong", scarf: "kem-xanh", packColor: "kiruna", keyRing: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.9, 0.4));
    return VT.wob(b);
  }
  function page() {
    var s = VT.rectS(-1400, -1400, 3300, 2500, "#EFE3C8", { sw: 0, ox: 0, oy: 0 });
    for (var y = 120; y < 1080; y += 64) s += VT.line("M -200 " + y + " L 2120 " + y, 2, "#9cc8dc", 0.3);
    return s;
  }
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · sơ đồ: thẻ lật ngửa, mũi tên xuống mái nhà, Wob viết "?" rồi gõ bút đúng "sky." =====
  var CARD = [640, 420], ARROW = [[900, 360], [1060, 320], [1180, 500], [1160, 760]], Q = [1420, 610, 190];
  var B0 = T_I - 0.02;
  function cardFlip(t, x, y, w, h, cross) {
    var k = E.io(seg(t, 0.6, 1.15)), sx = Math.cos(Math.PI * k), lift = -40 * Math.sin(Math.PI * k);
    var inner;
    if (sx > 0) inner = VT.rectS(-w / 2, -h / 2, w / 2, h / 2, "#B98A5A", { sw: 6, ox: 4, oy: 4 }) +
      '<circle cx="' + f(-w * 0.1) + '" cy="' + f(h * 0.05) + '" r="' + f(w * 0.2) + '" fill="none" stroke="#7A4E2C" stroke-width="10" opacity="0.4"/>';
    else inner = VT.theCucQuang({ x: 0, y: 0, w: w, h: h, cross: cross || 0 });
    return VT.g("translate(" + f(x) + " " + f(y + lift) + ") scale(" + f(Math.max(0.02, Math.abs(sx))) + " 1)", inner);
  }
  function roofs(t, k0) {
    var s = "";
    [[1010, "#C9603A"], [1160, "#5B8A8A"], [1310, "#E2B33C"]].forEach(function (h, i) {
      var k = E.back(seg(t, k0 + 0.15 * i, k0 + 0.15 * i + 0.35));
      if (k > 0) s += VT.nhaTiHon({ x: h[0], y: 900, w: 120, s: k, col: h[1] });
    });
    return s + VT.line("M 900 900 L 1420 900", 5, C.ink, 0.7);
  }
  function arrowDraw(k) {
    if (k <= 0) return "";
    var s = VT.lineDraw(VT.smooth(ARROW, false), k, 9, C.ink);
    if (k >= 1) s += VT.line("M 1128 724 L 1160 770 L 1194 726", 9, C.ink);
    return s;
  }
  shot(0, B0, "sơ đồ: thẻ lật, mũi tên, dấu ?", function (t, lt, T) {
    var s = page() + cardFlip(t, CARD[0], CARD[1], 600, 390) + roofs(t, 1.25) + arrowDraw(E.io(seg(t, 1.8, 2.6)));
    var kq = seg(t, 2.65, 3.15);
    var o = { s: 0.8, x: 1660, y: 1030, flip: -1, px: -14, py: -6, brows: "up", mouth: "content", lean: 2 * Math.sin(Math.round(t * 12) * 0.45) };
    var hp = [330, 40], tip;
    if (kq <= 0) tip = [1500, 760 + 6 * Math.sin(Math.round(t * 12) * 0.8)];
    else if (kq < 1) { tip = VT.textTip(Q[0], Q[1], "?", Q[2], kq); o.brows = "down"; o.mouth = "flat"; }
    else {
      var tap = key(t, [[3.2, -60], [T_SKY - 0.3, -60], [T_SKY, 0, "in2"], [T_SKY + 0.12, -34, "out"], [T_SKY + 0.24, 0, "in2"], [T_SKY + 0.45, -50, "out"]]);
      tip = [Q[0] + 34, Q[1] - 8 + tap];
      if (t > T_SKY - 0.05) { o.mouth = "smile"; o.eyes = "happy"; o.px = -6; o.py = -4; }
    }
    o.armR = hp; o.handR = "nam";
    s += W(t, o) + VT.pencilTo(VT.wobPt(o, hp[0], hp[1]), tip, { s: 0.7 }) + VT.textWrite(Q[0], Q[1], "?", Q[2], kq, { fill: RED });
    return { cam: [960, 560, 1.0 + 0.05 * seg(T, 0, B0)], world: s, tint: null };
  });

  // ===== cánh đồng tuyết đêm (S1–S3) =====
  var WO = { s: 0.95, x: 960, y: 900, flip: 1 };
  function night(t, aur) {
    var s = VT.rectS(-1400, -1400, 3300, 2500, "#1C2640", { sw: 0, ox: 0, oy: 0 });
    for (var i = 0; i < 46; i++) s += VT.dot(-300 + VT.hash(i * 2.7) * 2500, -200 + VT.hash(i * 5.3) * 760, 2.5 + 2 * VT.hash(i + 9), "#FFFDF6");
    if (aur > 0) s += VT.cucQuang({ x0: -500, x1: 2400, y: 470, h: 360, t: t, op: aur });
    s += VT.shape("M -1400 760 C -400 720 300 790 900 750 C 1400 720 2000 770 3300 740 L 3300 2500 L -1400 2500 Z", "#3A4A66", { sw: 5, ox: 0, oy: 0 });
    [[300, 0.9], [420, 1.1], [1540, 1], [1660, 0.85]].forEach(function (h) { s += VT.g("translate(" + h[0] + " 772) scale(" + h[1] + ")", VT.shape("M -40 0 L -40 -46 L 0 -78 L 40 -46 L 40 0 Z", "#232C40", { sw: 3 }) + VT.rectS(-12, -34, 6, -18, "#F6C46A", { sw: 0, ox: 0, oy: 0 })); });
    s += VT.shape("M -1400 860 C -300 830 600 880 1200 850 C 1800 830 2400 870 3300 850 L 3300 2500 L -1400 2500 Z", "#C9D6E6", { sw: 6, ox: 0, oy: 0 });
    for (var j = 0; j < 9; j++) s += VT.line("M " + f(-200 + j * 260) + " " + f(930 + 40 * VT.hash(j)) + " q 60 -8 120 0", 3, "#8FA3BD", 0.6);
    return s;
  }
  function flaskWob(t, o) {
    o.armR = [330, 300]; o.handR = "nam";
    o.propFront = (o.propFront || "") + VT.binhTra({ x: 334, y: 352, s: 0.75, steam: true, t: t });
    return o;
  }
  function glow(o, g) {
    if (g <= 0) return "";
    var c = VT.wobPt(o, 200, 190);
    return '<rect x="-1400" y="-1400" width="4800" height="4000" fill="#5FD08A" opacity="' + f(0.14 * g) + '"/>';
  }

  // ===== S1 · Wob ngửa mặt nhìn trời, cầm bình trà bốc hơi =====
  var B1 = T_THE - 0.05;
  shot(B0, B1, "đêm tuyết, bình trà", function (t, lt, T) {
    var o = flaskWob(t, { s: WO.s, x: WO.x, y: WO.y, flip: 1, px: 4, py: -18, brows: "flat", mouth: "content", lean: -4 });
    if (t > T_FLASK && t < T_FLASK + 0.9) { o.mouth = "smile"; o.px = 8; }
    var s = night(t, 0) + W(t, o);
    var k = E.io(seg(T, B0, B1));
    return { cam: [960, VT.lerp(660, 620, k), VT.lerp(1.2, 1.42, k)], world: s, tint: null };
  });

  // ===== S2 · cực quang từ "northern"; ánh xanh phủ lên Wob; Wob há miệng =====
  var B2 = T_MY - 0.05;
  function aurOp(t) { return E.io(seg(t, T_NORTH - 0.05, T_NORTH + 1.3)) * (t < T_WRONG ? 1 : 0); }
  shot(B1, B2, "cực quang", function (t, lt, T) {
    var g = aurOp(t);
    var o = flaskWob(t, { s: WO.s, x: WO.x, y: WO.y, flip: 1, px: 2, py: -20, brows: "up", mouth: t > T_GREEN - 0.1 ? "o" : "oSmall", eyes: t > T_NORTH + 0.4 ? "wide" : "open", lean: -6 });
    var s = night(t, g) + W(t, o) + glow(o, g);
    var k = E.io(seg(T, B1, B2));
    return { cam: [960, VT.lerp(470, 520, k), VT.lerp(0.98, 1.08, k)], world: s, tint: null };
  });

  // ===== S3 · cận mặt: mảng lục địa tê trắng ("nose"), xoa hồng lại ("Lovely."), ánh xanh tắt phụt ("wrong."); giữ =====
  var B3 = T_TOUR - 0.03;
  shot(B2, B3, "cận mặt: lục địa tê", function (t, lt, T) {
    var g = aurOp(t);
    var frost = E.io(seg(t, T_NOSE, T_NUMB + 0.35)) * (1 - E.io(seg(t, T_LOV + 0.15, T_LOV + 0.8)));
    var pink = E.out(seg(t, T_LOV + 0.3, T_LOV + 0.75)) * (1 - 0.35 * seg(t, T_LOV + 0.8, T_WRONG));
    var o = flaskWob(t, { s: WO.s, x: WO.x, y: WO.y, flip: 1, px: 0, py: -16, brows: "up", mouth: "o", eyes: "wide", lean: -4, landFrost: { k: frost, pink: pink, i: 0 } });
    if (t > T_NOSE + 0.1) { o.brows = "worried"; o.mouth = "flat"; o.eyes = "open"; o.px = 6; o.py = 6; }
    if (t > T_NUMB) o.shiver = 1.5;
    var rub = seg(t, T_LOV - 0.05, T_LOV + 0.75);
    if (rub > 0 && rub < 1) {
      var osc = 0.5 - 0.5 * Math.cos(rub * Math.PI * 4);
      o.armL = [VT.lerp(108, 156, osc), VT.lerp(160, 128, osc)]; o.handL = "tron"; o.eyes = "happy"; o.mouth = "content"; o.shiver = 0;
    } else if (t >= T_LOV + 0.75) { o.eyes = "happy"; o.mouth = "smile"; o.shiver = 0; }
    if (t >= T_WRONG) { o.eyes = "open"; o.mouth = "flat"; o.brows = "flat"; o.px = 0; o.py = 0; o.noBlink = true; }
    var s = night(t, g) + W(t, o) + glow(o, g);
    var c = VT.wobPt({ s: WO.s, x: WO.x, y: WO.y, flip: 1 }, 190, 165);
    return { cam: [c[0], c[1], 3.4 + 0.12 * seg(T, B2, T_WRONG) + (T >= T_WRONG ? 0.3 : 0)], world: s, tint: null };
  });

  // ===== S4–S5 · sơ đồ: sổ khách lật vù vù, dày dần; thẻ 607,818 guest nights + dấu record + 2024; sổ phồng, Wob ôm =====
  var BOOK = { x: 880, y: 830, w: 460, s: 1.4 };
  function thick(t) { return 1 + 0.45 * E.io(seg(t, T_TOUR, T_IN + 0.6)) + 1.15 * E.io(seg(t, T_REC + 1.3, T_REC + 2.6)); }
  function bookFace(th) { // mặt gáy trước (toạ độ thế giới)
    var S = BOOK.s, x0 = BOOK.x + (-BOOK.w / 2 + 8) * S, x1 = BOOK.x + (BOOK.w / 2 - 4) * S, y0 = BOOK.y - 40 * th * S, y1 = BOOK.y - 6 * S;
    return { x0: x0, x1: x1, y0: y0, y1: y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, top: [BOOK.x + 20 * S, BOOK.y - (40 * th + 20) * S] };
  }
  function cards(t, th) {
    var s = "", fc = bookFace(th);
    var k1 = E.back(seg(t, T_REC, T_REC + 0.3)), m1 = E.io(seg(t, T_REC + 0.7, T_REC + 1.15));
    if (k1 > 0) {
      var x = VT.lerp(BOOK.x + 40, fc.cx, m1), y = VT.lerp(475, fc.cy + 4, m1), sc = k1 * VT.lerp(1.0, 0.86, m1), ks = E.back(seg(t, T_REC + 0.2, T_REC + 0.45));
      s += VT.g("translate(" + f(x) + " " + f(y) + ") scale(" + f(sc) + ") rotate(" + f(VT.lerp(-3, 0, m1)) + ")", VT.rectS(-362, -48, 362, 48, "#FFFDF6", { sw: 5, ox: 3, oy: 3 }) + VT.text(0, 21, "607,818 guest nights", 58, { fill: BLUE }) +
        (ks > 0 ? VT.g("translate(262 -84) rotate(7) scale(" + f(ks) + ")", VT.rectS(-96, -34, 96, 34, "#FFFDF6", { sw: 5, ox: 2, oy: 2 }) + VT.rectS(-86, -26, 86, 26, null, { sw: 3, ox: 0, oy: 0 }) + VT.text(0, 17, "record", 52, { fill: RED })) : ""));
    }
    var k2 = E.back(seg(t, T_REC + 0.15, T_REC + 0.45)), m2 = E.io(seg(t, T_REC + 1.15, T_REC + 1.55));
    if (k2 > 0) {
      var x2 = VT.lerp(BOOK.x - 420, fc.top[0] - 150, m2), y2 = VT.lerp(610, fc.top[1] - 44, m2);
      s += VT.g("translate(" + f(x2) + " " + f(y2) + ") scale(" + f(k2) + ") rotate(" + f(VT.lerp(-8, -4, m2)) + ")", VT.rectS(-118, -50, 118, 50, "#F6D36A", { sw: 5, ox: 3, oy: 3 }) + VT.text(0, 28, "2024", 80, { fill: RED }));
    }
    return s;
  }
  function book(t, th, flip, wob) {
    var rot = wob ? 1.6 * Math.sin(Math.round(t * 12) * 2.1) * wob : 0;
    return VT.g(rot ? "rotate(" + f(rot) + " " + BOOK.x + " " + BOOK.y + ")" : "", VT.soKhach({ x: BOOK.x, y: BOOK.y, w: BOOK.w, s: BOOK.s, thick: th, flip: flip, t: t }));
  }
  var B4 = T_IN - 0.05;
  shot(B3, B4, "sổ khách tự lật", function (t, lt, T) {
    var th = thick(t);
    var o = { s: 0.7, x: 1480, y: 860, flip: -1, px: -14 + 6 * Math.sin(Math.round(t * 12) * 1.7), py: -4, brows: "up", mouth: "oSmall", eyes: "wide" };
    var s = page() + VT.line("M 400 " + BOOK.y + " L 1720 " + BOOK.y, 5, C.ink, 0.6) + book(t, th, 1) + W(t, o);
    s += VT.speedLines({ x0: BOOK.x - 160, y0: BOOK.y - 330 + 12 * (Math.round(t * 12) % 2), n: 6, gap: 70, len: 70, dy: -1, sw: 5 });
    return { cam: [960, 690, 1.32 + 0.05 * seg(T, B3, B4)], world: s, tint: null };
  });
  var B5 = T_BUT - 0.05, T_HUG = T_REC + 1.2;
  shot(B4, B5, "thẻ record, sổ phồng, Wob ôm", function (t, lt, T) {
    var th = thick(t), flip = t < T_REC ? 1 : 0;
    var swell = seg(t, T_REC + 1.3, T_REC + 2.6);
    var hop = seg(t, T_HUG - 0.1, T_HUG + 0.35);
    var o = { s: 0.7, x: VT.lerp(1480, 1400, E.io(hop)), y: 860 - 50 * Math.sin(Math.PI * hop), flip: -1, px: -12, py: -4, brows: "up", mouth: "oSmall", eyes: "open" };
    if (t > T_REC - 0.05 && t < T_HUG) { o.eyes = "wide"; o.mouth = "o"; o.py = -14; }
    if (t >= T_HUG) {
      var fc = bookFace(th);
      o.armR = VT.wobLocal(o, fc.x1 + 52, fc.y0 + 30); o.handR = "nam";
      o.armL = VT.wobLocal(o, fc.x1 + 58, fc.y1 - 8); o.handL = "nam";
      o.brows = "worried"; o.mouth = "flat"; o.lean = -8 - 3 * swell; o.legs = "apart"; o.eyes = "squint";
      if (t > T_REC + 2.7) { o.eyes = "open"; o.brows = "flat"; o.lean = -6; o.px = -2; o.py = 2; }
    }
    var wob = t > T_REC + 1.3 && t < T_REC + 2.8 ? 1 : 0;
    var s = page() + VT.line("M 400 " + BOOK.y + " L 1720 " + BOOK.y, 5, C.ink, 0.6) + book(t, th, flip, wob);
    s += W(t, o) + cards(t, th);
    if (flip) s += VT.speedLines({ x0: BOOK.x - 160, y0: BOOK.y - 330 + 12 * (Math.round(t * 12) % 2), n: 6, gap: 70, len: 70, dy: -1, sw: 5 });
    if (wob) s += VT.knockLines({ x: BOOK.x - 330, y: BOOK.y - 140, s: 0.7 });
    var k = E.io3(seg(T, T_REC + 1.2, T_REC + 2.0));
    return { cam: [VT.lerp(960, 1040, k), VT.lerp(690, 690, k), VT.lerp(1.37, 1.55, k)], world: s, tint: null };
  });

  // ===== S6 · thước thời gian: nhà 1900 đầu trái; sổ khách trượt về đầu phải ("tourists"); Wob gạch X lên thẻ cực quang ("followed.") =====
  var TL = 800, CARD6 = [920, 330, 380, 250];
  shot(B5, DUR, "thước thời gian, gạch X thẻ", function (t, lt, T) {
    var s = page();
    s += VT.lineDraw("M 260 " + TL + " L 1660 " + TL, E.io(seg(t, B5, B5 + 0.45)), 8, C.ink);
    if (t > B5 + 0.45) s += VT.line("M 1630 " + (TL - 22) + " L 1666 " + TL + " L 1630 " + (TL + 22), 8, C.ink);
    [400, 760, 1120, 1480].forEach(function (x, i) { if (t > B5 + 0.1 * i) s += VT.line("M " + x + " " + (TL - 16) + " L " + x + " " + (TL + 16), 5, C.ink, 0.8); });
    s += VT.nhaTiHon({ x: 400, y: TL - 12, w: 130, col: "#C9603A", s: E.back(seg(t, B5 + 0.15, B5 + 0.5)) });
    s += VT.textWrite(400, TL + 92, "1900", 66, seg(t, B5 + 0.3, B5 + 0.8), { fill: BLUE });
    var slide = E.io3(seg(t, T_TOURISTS - 0.1, T_TOURISTS + 0.45));
    var bx = VT.lerp(560, 1500, slide), bk = E.back(seg(t, B5 + 0.35, B5 + 0.7));
    if (bk > 0) s += VT.soKhach({ x: bx, y: TL - 14, w: 220, s: 0.62 * bk, thick: 2.4 });
    if (slide > 0 && slide < 1) s += VT.speedLines({ x0: bx - 270, y0: TL - 100, n: 4, gap: 24, len: 110, dx: -1, sw: 5 });
    var cross = seg(t, T_FOLL - 0.12, T_FOLL + 0.12);
    s += VT.theCucQuang({ x: CARD6[0], y: CARD6[1], w: CARD6[2], h: CARD6[3], cross: cross });
    var o = { s: 0.72, x: 1370, y: 680, flip: -1, px: -14, py: -10, brows: "flat", mouth: "content" };
    var w2 = CARD6[2], h2 = CARD6[3], cx = CARD6[0], cy = CARD6[1], tip;
    var a1 = [cx - w2 * 0.42, cy - h2 * 0.4], b1 = [cx + w2 * 0.42, cy + h2 * 0.4], a2 = [cx + w2 * 0.42, cy - h2 * 0.4], b2 = [cx - w2 * 0.42, cy + h2 * 0.4];
    if (cross <= 0) { var rk = E.io(seg(t, T_TOURISTS + 0.1, T_FOLL - 0.14)); tip = [VT.lerp(1240, a1[0], rk), VT.lerp(470, a1[1], rk)]; if (t > T_TOURISTS) { o.brows = "down"; o.mouth = "flat"; } }
    else if (cross < 0.5) { var k1 = cross * 2; tip = [VT.lerp(a1[0], b1[0], k1), VT.lerp(a1[1], b1[1], k1)]; o.brows = "down"; o.mouth = "flat"; }
    else if (cross < 1) { var k2 = cross * 2 - 1; tip = [VT.lerp(a2[0], b2[0], k2), VT.lerp(a2[1], b2[1], k2)]; o.brows = "down"; o.mouth = "flat"; }
    else { tip = [b2[0] + 40, b2[1] + 40]; o.brows = "flat"; o.mouth = "flat"; o.px = 0; o.py = 0; o.noBlink = true; }
    var hp = [330, 40];
    o.armR = hp; o.handR = "nam";
    s += W(t, o) + VT.pencilTo(VT.wobPt(o, hp[0], hp[1]), tip, { s: 0.7 });
    return { cam: [960, 560, 1.0 + 0.03 * seg(T, B5, DUR)], world: s, tint: null };
  });

  return shots;
};
