/* d27 · vẽ tay (328,271–350,022 s; 21,75 s). Vào "cat", ra "cat". Hồi ức, không khẩu hình. Chữ: chỉ dấu "?" (vẽ bằng nét).
 *  1. Bến nhỏ: thuyền máy trên dốc bến, sóng to; Wob đẩy thử, sóng hất ngược.  2. Tờ lịch giấy, các ô lần lượt hiện dấu ? (không số); Wob gãi đầu.
 *  3. Đồng hồ báo thức giấy đầu giường: kim đứng yên, mạng nhện; Wob gõ thử, chẳng có gì, nhìn người xem.
 *  4. Tờ mờ sáng ở bến: người que dạng chung (nhỏ, không mặt) ngước nhìn trời, nhấc búa.  5. Gõ vào bình ôxy (cong), vòng sóng âm lan khắp mái nhà.
 *  6. Cận bình ôxy còn ngân, vòng sóng thứ hai.  7. Wob ngủ ngáy trong chăn (áo mưa treo móc, ba lô nhỏ dưới giường); cồng 343,00 s và 344,20 s,
 *     sóng âm lướt qua đầu, lần hai vòng né qua đầu Wob.  8. Sáng lặng tiếp theo: Wob ngồi ngủ dựa giá treo bình, áo mưa, mũ trùm LÊN, ôm ba lô nhỏ.
 *  9. Búa gõ 347,60 s: Wob rung bần bật như chuông 1,5 s, mắt mở trừng giữ tới cắt.
 */
window.CANH = function (VT, D) {
  var B = window.VTB(VT, D), key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink, DUR = D.thoi_luong;
  var N = [0, VT.nhip(1), VT.nhip(2), VT.nhip(3), VT.nhip(4), VT.nhip(5)];
  var T_EST = VT.tu("estimates"), T_LOT = VT.tu("lot."), T_CLOCK2 = VT.tu("clock.", 0), T_SKY = VT.tu("sky"), T_HAMMER = VT.tu("hammer"), T_OXY = VT.tu("oxygen");
  var S2 = T_EST - 0.2, S5 = T_HAMMER - 0.1, S7 = N[4] - 0.15;
  var BASE = D.bat_dau_tuyet_doi;
  var G1 = T_OXY, G2 = 343.0 - BASE, G3 = 344.2 - BASE, G4 = 347.6 - BASE, SHAKE_END = G4 + 1.5;
  var CRASH = 1.45;
  VT.sfx("song", CRASH - 0.25, 0.55);
  VT.sfx("cong", G1, 0.8); VT.sfx("cong", G2, 0.55); VT.sfx("cong", G3, 0.55); VT.sfx("cong", G4, 0.9);
  VT.sfx("boing", G4 + 0.05, 0.55);
  VT.sfx("bonk", T_CLOCK2 - 0.75, 0.3);

  // ---------- đạo cụ cục bộ ----------
  /** Bình ôxy cũ treo xích: gốc móc treo trên xà, cao ~330 ở s = 1. vib px. */
  function bottle(x, y, s, vib) {
    var inner = VT.line("M 0 0 L 0 50", 5, "#5A5A5A") + VT.line("M -6 8 L 6 14 M -6 22 L 6 28 M -6 36 L 6 42", 4, "#5A5A5A");
    inner += VT.g("translate(" + f(vib || 0) + " 0) rotate(" + f((vib || 0) * 0.4) + " 0 50)",
      VT.shape("M -16 50 L 16 50 L 16 74 L -16 74 Z", "#8A8F94", { sw: 4 }) +
      VT.shape("M -52 120 C -52 84 52 84 52 120 L 52 316 C 52 330 -52 330 -52 316 Z", "#B9BEC2", { sw: 6, ox: 5, oy: 4 }) +
      '<path d="M -50 150 L 50 150 L 50 190 L -50 190 Z" fill="#5E9E58" opacity="0.85"/>' + VT.shape("M -10 152 L 8 152 L 2 168 L 14 178 L -4 188 L -12 170 Z", "#B9BEC2", { sw: 0, ox: 0, oy: 0 }) +
      VT.shape("M 24 154 L 50 154 L 50 176 L 30 186 Z", "#B9BEC2", { sw: 0, ox: 0, oy: 0 }) +
      VT.line("M -50 150 L 50 150 M -50 190 L 50 190", 3, INK, 0.6) + VT.line("M -30 104 C -34 160 -34 260 -30 300", 8, "#FFFFFF", 0.45) +
      VT.dot(30, 240, 5, "#8A8F94") + VT.dot(-20, 280, 4, "#8A8F94"));
    return VT.g(VT.tr(x, y, s), inner);
  }
  /** Giá gỗ chữ A treo bình: gốc giữa chân, cao ~460. */
  function frame(x, y, s) {
    return VT.g(VT.tr(x, y, s), VT.shape("M -170 0 L -120 -470 L -100 -470 L -146 0 Z", "#9A6A40", { sw: 5 }) + VT.shape("M 170 0 L 120 -470 L 100 -470 L 146 0 Z", "#9A6A40", { sw: 5 }) +
      VT.shape("M -150 -470 L 150 -470 L 150 -440 L -150 -440 Z", "#8E5527", { sw: 5 }) + VT.line("M -132 -150 L 132 -150", 8, "#8E5527"));
  }
  /** Người que dạng chung (không mặt): gốc giữa chân, cao ~240·s; look (đầu ngửa), hammer: góc tay cầm búa (độ, 0 = thõng, 150 = giơ cao), walk phase. */
  function person(x, y, s, look, ang, ph) {
    var a = Math.sin((ph || 0) * 2 * Math.PI) * 18, out = VT.line("M 0 -120 L " + f(-a) + " 0", 7) + VT.line("M 0 -120 L " + f(a) + " 0", 7) + VT.line("M 0 -120 L 0 -190", 7);
    if (!look) out += VT.line("M 0 -175 L -26 -128", 7);
    var r = (ang || 0) * Math.PI / 180, hx = Math.sin(r) * 62, hy = -175 + Math.cos(r) * 62;
    out += VT.line("M 0 -175 L " + f(hx) + " " + f(hy), 7);
    var ex = hx + Math.sin(r) * 56, ey = hy + Math.cos(r) * 56;
    out += VT.line("M " + f(hx) + " " + f(hy) + " L " + f(ex) + " " + f(ey), 7, "#8E5527") + VT.g("translate(" + f(ex) + " " + f(ey) + ") rotate(" + f(-(ang || 0)) + ")", VT.shape("M -24 -10 L 24 -10 L 24 12 L -24 12 Z", "#5A5A5A", { sw: 4 }));
    var head = VT.ell(0, -214, 24, 24, "#F6EEDC", 6) + VT.shape("M -30 -226 C -26 -252 26 -252 30 -226 Z", "#6F8A9A", { sw: 4 });
    out += look ? VT.g("rotate(-28 0 -190)", head) + VT.line("M 0 -175 L -34 -214", 7) : head;
    return VT.g(VT.tr(x, y, s), out);
  }
  function waves(t, y, big) {
    var st = Math.round(t * 12), out = '<rect x="-1200" y="' + y + '" width="4320" height="1600" fill="' + B.SEA + '"/>';
    var d = "M -1200 " + y;
    for (var x = -1200; x < 3100; x += 120) d += " q 30 " + f(-(big ? 40 : 10) - (big ? 16 : 3) * Math.sin(st * 0.7 + x * 0.01)) + " 60 0 q 30 " + f((big ? 16 : 4)) + " 60 0";
    out += VT.line(d, 6);
    return out;
  }
  // ---------- 1: dốc bến, sóng to ----------
  function shot1(t) {
    var out = B.fill("#C9D6DA") + waves(t, 900, true);
    out += VT.shape("M -1200 880 L 760 880 L 1560 1080 L 1560 1400 L -1200 1400 Z", "#A39D90", { sw: 6, ox: 0, oy: 0 });
    out += VT.line("M 760 880 L 1560 1080", 4, "#7E786E") + VT.line("M 820 930 L 1500 1100 M 880 990 L 1440 1130", 3, INK, 0.25);
    var push = seg(t, 0.3, CRASH - 0.15), back = seg(t, CRASH, CRASH + 0.5);
    var bx = 1020 + 30 * push - 60 * back;
    out += VT.g("rotate(14 " + f(bx) + " " + f(880 + (bx - 760) * 0.25) + ")", VT.thuyenCa({ x: bx, y: 880 + (bx - 760) * 0.25 - 4, s: 0.62 }));
    // sóng to cuộn vào dốc bến
    var kc = seg(t, CRASH - 0.45, CRASH + 0.45);
    if (kc > 0 && kc < 1) {
      var h = Math.sin(kc * Math.PI) * 380, x0 = VT.lerp(1500, 1180, kc);
      out += VT.shape("M " + f(x0 - 260) + " 1000 C " + f(x0 - 200) + " " + f(990 - h * 0.6) + " " + f(x0 - 60) + " " + f(960 - h) + " " + f(x0 + 60) + " " + f(960 - h) + " C " + f(x0 + 160) + " " + f(960 - h) + " " + f(x0 + 220) + " " + f(990 - h * 0.6) + " " + f(x0 + 240) + " 1000 Z", "#6E95A0", { sw: 6, ox: 4, oy: 4 });
      var foam = "M " + f(x0 - 200) + " " + f(990 - h * 0.62);
      for (var q = 0; q < 6; q++) foam += " q " + f(14) + " -30 " + f(36) + " " + f(-h * 0.06);
      out += VT.shape(foam + " L " + f(x0 + 40) + " " + f(990 - h * 0.86) + " C " + f(x0 - 40) + " " + f(990 - h * 0.7) + " " + f(x0 - 120) + " " + f(990 - h * 0.5) + " " + f(x0 - 200) + " " + f(990 - h * 0.62) + " Z", "#F4F8F9", { sw: 5 });
      if (kc > 0.45) for (var i = 0; i < 7; i++) out += VT.drop({ x: x0 - 220 - i * 60 - 260 * (kc - 0.45), y: 900 - h * 0.7 + i * 14 - 120 * Math.sin((kc - 0.45) * 5), s: 0.6 });
    }
    var o = { t: t, s: 0.72, x: VT.lerp(720, 750, push) - 150 * VT.ease.out(back), y: 885, lean: 14 * push * (1 - back) - 10 * back, mouth: back > 0 ? "o" : "flat", brows: back > 0 ? "up" : "down", eyes: back > 0 ? "wide" : "open", wet: back, armR: [390, 220], armL: [380, 260], handR: "xoe", handL: "xoe" };
    if (back > 0) { o.armR = [330, 90]; o.armL = [70, 90]; o.marks = "shock"; o.legs = "apart"; }
    out += B.wob(o);
    return out;
  }
  // ---------- 2: tờ lịch dấu ? ----------
  var QSET = [3, 9, 10, 14, 17, 22, 23, 25, 29, 31];
  function shot2(t) {
    var out = B.fill("#E9DCC0");
    out += VT.shape("M 380 220 L 1180 220 L 1180 900 L 380 900 Z", "#FFFDF6", { sw: 6, ox: 8, oy: 8 }) + '<rect x="380" y="220" width="800" height="110" fill="#C9463A"/>' + VT.line("M 380 330 L 1180 330", 6);
    out += VT.dot(520, 250, 12) + VT.dot(1040, 250, 12);
    for (var r = 0; r < 5; r++) for (var c = 0; c < 7; c++) {
      var x0 = 400 + c * 108, y0 = 345 + r * 108, idx = r * 7 + c;
      out += VT.line("M " + x0 + " " + y0 + " L " + (x0 + 100) + " " + y0 + " L " + (x0 + 100) + " " + (y0 + 100) + " L " + x0 + " " + (y0 + 100) + " Z", 3, INK, 0.5);
      var qi = QSET.indexOf(idx);
      if (qi >= 0) { var tq = T_EST + 0.12 + qi * 0.22, k = VT.ease.back(seg(t, tq, tq + 0.2)); if (k > 0) out += VT.glyph({ x: x0 + 50, y: y0 + 64, s: 0.85 * k, sym: "?" }); }
    }
    var scratch = Math.round(t * 12) % 2;
    var o = { t: t, s: 0.95, x: 1480, y: 930, flip: -1, mouth: "wobbly", brows: "worried", px: -16, py: -10, armR: [300, scratch ? 40 : 30], handR: "chi" };
    if (t > T_LOT) { o.mouth = "flat"; o.brows = "skeptic"; o.armR = [338, 300]; o.handR = "tron"; o.px = 4; o.py = 0; }
    out += B.wob(o);
    if (t > T_EST + 0.4 && t < T_LOT) out += VT.glyph({ x: 1440, y: 420 + 6 * Math.sin(t * 6), s: 0.7, sym: "?" });
    return out;
  }
  // ---------- 3: đồng hồ báo thức giấy, mạng nhện ----------
  function alarm(x, y, s, jig) {
    var j = jig || 0, out = VT.line("M -60 70 L -80 110 M 60 70 L 80 110", 8);
    out += VT.g("rotate(" + f(-10 + j) + " -64 -76)", VT.ell(-64, -76, 38, 30, "#D9C27A", 6)) + VT.g("rotate(" + f(10 - j) + " 64 -76)", VT.ell(64, -76, 38, 30, "#D9C27A", 6)) + VT.line("M 0 -98 L 0 -120", 6) + VT.dot(0, -124, 10);
    out += VT.ell(0, 0, 100, 100, "#E8EEF0", 8) + VT.ell(0, 0, 82, 82, "#FFFDF6", 4);
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; out += VT.line("M " + f(Math.sin(a) * 70) + " " + f(-Math.cos(a) * 70) + " L " + f(Math.sin(a) * 60) + " " + f(-Math.cos(a) * 60), 4); }
    out += VT.line("M 0 0 L 32 -40", 7) + VT.line("M 0 0 L -10 52", 6) + VT.dot(0, 0, 8);
    // mạng nhện góc trên phải
    var c = [62, -52], web = "";
    [[96, -20], [90, -66], [60, -92], [30, -80]].forEach(function (p) { web += VT.line("M " + c[0] + " " + c[1] + " L " + p[0] + " " + p[1], 2, INK, 0.7); });
    [10, 20, 30].forEach(function (r) { web += VT.line("M " + (c[0] + r * 0.9) + " " + (c[1] + r * 0.9) + " Q " + (c[0] + r) + " " + (c[1] - r * 0.4) + " " + (c[0] + r * 0.3) + " " + (c[1] - r) + " Q " + (c[0] - r * 0.4) + " " + (c[1] - r * 0.9) + " " + (c[0] - r * 0.8) + " " + (c[1] - r * 0.6), 2, INK, 0.6); });
    out += web + VT.dot(c[0] + 18, c[1] - 6, 4);
    return VT.g(VT.tr(x, y, s), out);
  }
  function room(t, dawn) {
    var out = B.fill(dawn ? "#BFC9D6" : "#E6D6BC") + '<rect x="-1200" y="860" width="4320" height="1600" fill="' + (dawn ? "#8E7F72" : "#B98A5A") + '"/>' + VT.line("M -1200 860 L 3100 860", 6);
    out += VT.shape("M 150 240 L 430 240 L 430 520 L 150 520 Z", dawn ? "#F2C9A8" : "#CFE3EE", { sw: 6 }) + VT.line("M 290 240 L 290 520 M 150 380 L 430 380", 5);
    if (dawn) out += '<path d="M 150 520 L 430 520 L 760 860 L 300 860 Z" fill="#F6D9B8" opacity="0.35"/>';
    return out;
  }
  function bed(dawn) {
    return VT.shape("M 560 860 L 560 640 L 600 640 L 600 860 Z", "#8E5527", { sw: 5 }) + VT.shape("M 600 800 L 1540 800 L 1540 860 L 600 860 Z", "#9A6A40", { sw: 5 }) +
      VT.shape("M 600 720 L 1540 720 L 1540 800 L 600 800 Z", "#F4F1EA", { sw: 5 }) + VT.shape("M 1540 860 L 1540 700 L 1580 700 L 1580 860 Z", "#8E5527", { sw: 5 }) +
      VT.shape("M 640 650 C 640 610 800 610 800 650 L 800 720 L 640 720 Z", "#FFFDF6", { sw: 5 });
  }
  function shot3(t) {
    var out = room(t, false) + bed(false);
    out += VT.shape("M 1180 860 L 1180 600 L 1500 600 L 1500 860 Z", "#C68A55", { sw: 6 }) + VT.line("M 1200 700 L 1480 700", 4, INK, 0.5);
    var tap = T_CLOCK2 - 0.75, jig = t > tap && t < tap + 0.25 ? 3 : 0;
    out += alarm(1340, 470, 0.95, jig);
    if (t > tap && t < tap + 0.35) out += VT.puffBurst({ x: 1300, y: 380, k: seg(t, tap, tap + 0.35), s: 0.3 });
    var o = { t: t, s: 0.9, x: 960, y: 900, mouth: "flat", brows: "skeptic", px: 18, py: -4 };
    if (t > tap - 0.3 && t < tap + 0.3) { o.armR = VT.wobLocal(o, 1260, 470); o.handR = "chi"; o.lean = 6; }
    if (t > T_CLOCK2 - 0.1) { o.px = 0; o.py = 2; o.lid = 0.45; o.noBlink = true; o.brows = "flat"; }
    out += B.wob(o);
    return out;
  }
  // ---------- 4–6, 8–9: bến lúc sáng ----------
  var FX = 820, GROUND = 880;
  function dock(t, mood) {
    var sky = mood === "dawn" ? "#E8C3B0" : "#CFE0EA";
    var out = B.fill(sky);
    if (mood === "dawn") out += '<rect x="-1200" y="320" width="4320" height="240" fill="#F2D3BC" opacity="0.8"/>' + VT.ell(560, 560, 80, 80, "#F6C46A", 5, { op: 0.9 });
    out += waves(t, 560, false);
    // đất liền có làng + núi lửa phía sau (bên phải)
    out += VT.shape("M 1150 600 C 1500 380 1750 160 1900 120 C 2050 160 2300 380 2700 520 L 3100 560 L 3100 700 L 1150 700 Z", mood === "dawn" ? "#A7987E" : "#8FA88A", { sw: 6, ox: 0, oy: 0 });
    out += VT.shape("M 1050 700 C 1300 610 2200 600 3100 620 L 3100 900 L 1050 900 Z", mood === "dawn" ? "#B9B07E" : B.GRASS, { sw: 6, ox: 0, oy: 0 });
    out += VT.shape("M -1200 " + GROUND + " L 3100 " + GROUND + " L 3100 1400 L -1200 1400 Z", "#A39D90", { sw: 6, ox: 0, oy: 0 });
    for (var i = 0; i < 8; i++) out += VT.line("M " + (-800 + i * 500) + " " + (GROUND + 40) + " L " + (-760 + i * 500) + " " + (GROUND + 140), 4, INK, 0.25);
    return out;
  }
  function village(t, x0) {
    var out = "";
    for (var i = 0; i < 6; i++) out += B.cot({ x: x0 + i * 220, y: 700 - (i % 2) * 18, w: 170, roof: ["#5E7A4A", "#B5523A", "#6F8A9A"][i % 3], lit: true });
    return out;
  }
  function gongRings(t, cx, cy, t0, dur, rmax, n) {
    var out = "";
    for (var j = 0; j < (n || 3); j++) { var k = seg(t, t0 + j * 0.28, t0 + j * 0.28 + dur); if (k > 0 && k < 1) out += B.ring(cx, cy, 60 + rmax * VT.ease.out2(k), 1 - k, null, 7); }
    return out;
  }
  function shot4(t) {   // ngước nhìn trời, nhấc búa
    var out = dock(t, "dawn") + frame(FX, GROUND, 1) + bottle(FX, GROUND - 456, 0.9, 0);
    var look = t > T_SKY - 0.3 && t < S5 - 0.4, ang = VT.key(t, [[S5 - 0.55, 0], [S5 - 0.1, 150, "back"]]);
    out += person(FX + 300, GROUND, 1.25, look, ang, 0);
    if (look) out += VT.line("M " + (FX + 230) + " " + (GROUND - 360) + " l -18 -26 M " + (FX + 262) + " " + (GROUND - 372) + " l -4 -32", 4, INK, 0.6);
    return out;
  }
  function shot5(t) {   // gõ, sóng âm lan khắp mái nhà
    var out = dock(t, "dawn") + village(t, 1250) + frame(FX, GROUND, 1);
    var vib = B.vib(t, G1, 1.6, 10), ang = VT.key(t, [[S5, 150], [G1 - 0.05, 160], [G1, 60, "in2"], [G1 + 0.4, 70], [G1 + 0.9, 20]]);
    out += bottle(FX, GROUND - 456, 0.9, vib) + person(FX + 300, GROUND, 1.25, false, ang, 0);
    if (t >= G1 && t < G1 + 0.2) out += VT.impact({ x: FX + 50, y: GROUND - 250, s: 0.5 });
    out += gongRings(t, FX, GROUND - 280, G1, 1.1, 1300, 3);
    return out;
  }
  function shot6(t) {   // cận bình còn ngân
    var out = dock(t, "dawn") + frame(FX, GROUND, 1);
    var vib = B.vib(t, G1, 2.6, 8);
    out += bottle(FX, GROUND - 456, 0.9, vib) + gongRings(t, FX, GROUND - 280, N[3] + 0.2, 1.0, 520, 1);
    for (var i = 0; i < 2; i++) out += VT.knockLines({ x: FX + (i ? 70 : -70), y: GROUND - 260, k: seg(t, N[3] + i * 0.2, N[3] + 1.4), s: 0.8 });
    return out;
  }
  // ---------- 7: ngủ ngáy trong chăn ----------
  var WC = [850, 652], WSZ = 0.72;
  function shot7(t) {
    var out = room(t, true) + bed(true);
    // áo mưa cam treo móc, ba lô nhỏ dưới giường
    out += VT.dot(1700, 318, 9) + VT.shape("M 1700 322 C 1650 322 1640 360 1648 392 L 1752 392 C 1760 360 1750 322 1700 322 Z", B.AO_TOI, { sw: 6 }) +
      VT.shape("M 1640 380 C 1600 400 1580 470 1560 560 L 1600 570 L 1612 470 L 1606 640 L 1794 640 L 1788 470 L 1800 570 L 1840 560 C 1820 470 1800 400 1760 380 Z", B.AO, { sw: 6 }) +
      VT.line("M 1700 392 L 1700 640", 4, B.AO_TOI) + VT.ell(1716, 440, 8, 8, B.CUC, 3) + VT.ell(1716, 500, 8, 8, B.CUC, 3);
    out += B.balo({ x: 1260, y: 858, s: 0.42, rot: -6 });
    var snore = Math.round(t * 12) % 12 < 6;
    var o = { t: t, s: WSZ, x: WC[0], y: WC[1] + 214 * WSZ, noPack: true, ao: false, eyes: "closed", mouth: snore ? "o" : "oSmall", brows: "flat", sq: snore ? 1.03 : 0.98, armL: [62, 300], armR: [338, 300] };
    out += VT.g("rotate(-90 " + WC[0] + " " + WC[1] + ")", B.wob(o));
    out += VT.shape("M 905 700 C 920 610 1100 600 1200 610 C 1350 600 1500 620 1530 720 L 1530 800 L 905 800 Z", "#C9603A", { sw: 6 });
    for (var i = 0; i < 5; i++) out += VT.line("M " + (980 + i * 110) + " 640 L " + (970 + i * 110) + " 790", 5, "#F2C9A8", 0.8);
    out += B.zzz(t, WC[0] + 70, WC[1] - 60, 0.9);
    // sóng âm từ cửa sổ, lướt qua đầu không chạm (lần 2 vòng né đầu)
    [G2, G3].forEach(function (g, gi) {
      for (var j = 0; j < 2; j++) {
        var k = seg(t, g + j * 0.22, g + j * 0.22 + 1.1);
        if (k > 0 && k < 1) { var r = 180 + 1500 * k; out += B.ring(290, 380, r, 1 - k * 0.7, gi === 0 ? [20, 34] : [6, 40], 7); }
      }
    });
    return out;
  }
  // ---------- 8–9: ngồi ngủ dựa giá, búa gõ ----------
  function shot8(t, close) {
    var out = dock(t, "calm") + village(t, 1450) + frame(FX, GROUND, 1);
    var vibB = B.vib(t, G4, 2.0, 10);
    out += bottle(FX, GROUND - 456, 0.9, vibB);
    var appr = seg(t, N[5] + 0.3, G4 - 0.5), ang = VT.key(t, [[G4 - 0.55, 0], [G4 - 0.1, 150, "back"], [G4, 60, "in2"], [G4 + 0.5, 30]]);
    out += person(VT.lerp(1500, FX + 300, appr), GROUND, 1.25, false, ang, appr < 1 ? (t * 1.6) % 1 : 0);
    var hit = t >= G4, shk = t < SHAKE_END ? (hit ? (Math.round(t * 24) % 2 ? 1 : -1) * 16 * (1 - seg(t, G4, SHAKE_END)) : 0) : 0;
    var o = { t: t, s: 0.8, x: FX + 150 + shk, y: GROUND + 92 * 0.8 - 30, flip: -1, ao: "hood", legs: "sit", lean: hit ? shk * 0.3 : -10, arms: "hug", eyes: hit ? "wide" : "closed", mouth: hit ? "o" : "oSmall", brows: hit ? "up" : "flat", noBlink: true, px: 0, py: 0 };
    o.propFront = B.balo({ x: 200, y: 412, s: 0.55 });
    if (hit) { o.marks = t < SHAKE_END ? "shock" : null; o.sq = 1 + 0.06 * Math.sin(t * 60) * (1 - seg(t, G4, SHAKE_END)); }
    out += B.wob(o);
    if (!hit) out += B.zzz(t, FX + 190, GROUND - 260, 0.8);
    if (hit && t < SHAKE_END) { out += VT.line("M " + (FX + 30) + " " + (GROUND - 240) + " l -26 -10 M " + (FX + 30) + " " + (GROUND - 200) + " l -30 0 M " + (FX + 290) + " " + (GROUND - 240) + " l 26 -10 M " + (FX + 290) + " " + (GROUND - 200) + " l 30 0", 6); out += gongRings(t, FX, GROUND - 280, G4, 1.0, 900, 2); }
    if (t >= G4 && t < G4 + 0.18) out += VT.impact({ x: FX + 50, y: GROUND - 250, s: 0.5 });
    return out;
  }

  return [
    { a: 0, b: S2, ten: "dốc bến, Wob đẩy thuyền, sóng hất ngược", ve: function (t, lt, T) {
      return { cam: key(T, [[0, [1060, 800, 1.25]], [S2, [1040, 800, 1.31], "sine"]]), shake: VT.shake(T, CRASH, 0.25, 6), world: shot1(t), tint: "cold" };
    } },
    { a: S2, b: N[1], ten: "tờ lịch toàn dấu ?, Wob gãi đầu", ve: function (t, lt, T) {
      return { cam: key(T, [[S2, [940, 570, 1.0]], [N[1], [960, 570, 1.07], "sine"]]), world: shot2(t), tint: "warm" };
    } },
    { a: N[1], b: N[2], ten: "đồng hồ báo thức giấy, mạng nhện", ve: function (t, lt, T) {
      return { cam: key(T, [[N[1], [1180, 600, 1.45]], [N[2], [1170, 600, 1.55], "sine"]]), world: shot3(t), tint: "warm" };
    } },
    { a: N[2], b: S5, ten: "tờ mờ sáng: người que ngước trời, nhấc búa", ve: function (t, lt, T) {
      return { cam: key(T, [[N[2], [1000, 640, 1.35]], [S5, [1000, 650, 1.43], "sine"]]), world: shot4(t), tint: "warm" };
    } },
    { a: S5, b: N[3], ten: "gõ bình ôxy, sóng âm lan khắp mái nhà", ve: function (t, lt, T) {
      return { cam: key(T, [[S5, [1050, 640, 1.3]], [G1, [1100, 620, 1.2], "io"], [N[3], [1250, 560, 0.9], "io3"]]), shake: VT.shake(T, G1, 0.23, 7), world: shot5(t), tint: "warm" };
    } },
    { a: N[3], b: S7, ten: "cận bình ôxy còn ngân", ve: function (t, lt, T) {
      return { cam: key(T, [[N[3], [FX, GROUND - 300, 2.1]], [S7, [FX, GROUND - 300, 2.25], "sine"]]), world: shot6(t), tint: "warm" };
    } },
    { a: S7, b: N[5], ten: "Wob ngủ ngáy, cồng hai lần, sóng âm né đầu", ve: function (t, lt, T) {
      return { cam: key(T, [[S7, [960, 560, 1.0]], [N[5], [930, 600, 1.1], "sine"]]), world: shot7(t), tint: "cold" };
    } },
    { a: N[5], b: G4, ten: "sáng lặng: Wob ngồi ngủ dựa giá bình, mũ trùm lên", ve: function (t, lt, T) {
      return { cam: key(T, [[N[5], [1060, 680, 1.25]], [G4, [1020, 700, 1.36], "sine"]]), world: shot8(t), tint: "cold" };
    } },
    { a: G4, b: DUR, ten: "BOONG: Wob rung như chuông, mắt trừng giữ tới cắt", ve: function (t, lt, T) {
      var c = [FX + 150, GROUND - 190];
      return { cam: key(T, [[G4, [c[0], c[1], 1.95]], [G4 + 0.12, [c[0], c[1], 2.15], "out"], [DUR, [c[0], c[1] - 6, 2.3], "sine"]]), shake: VT.shake(T, G4, 0.24, 10), world: shot8(t, true), tint: "cold" };
    } },
  ];
};
/* ---- Bộ trợ giúp chung nhóm B (thợ ve-tay B, tập Tristan da Cunha, 28/11/2026): chép y hệt vào đầu mỗi canh.js của d22 d24 d26 d27 d29 d33 d34 d40 d45 d49.
 * Khoá trang phục Wob tập 5: áo mưa vải dầu cam #E07A2E (viền/đường may #B85A1E, cúc gỗ #8A5A33), ba lô nhỏ ô liu (#7C8646 / #566030) của rig, giày đỏ gốc.
 * Thư viện chung chỉ có áo mưa vàng tập 3: đổi màu CỤC BỘ trong composition của đoạn (VT.AO_MUA), không sửa templates/.
 * Đạo cụ riêng tập (tôm hùm gai, khoai, tem, túi thư, quầy bưu điện, sóng âm…) vẽ ở đây, nhận tham số, gốc toạ độ ghi kèm. */
window.VTB = function (VT, D) {
  var B = {}, f = VT.f, INK = VT.C.ink, key = VT.key, seg = VT.seg;
  if (VT.AO_MUA) { VT.AO_MUA.vang = "#E07A2E"; VT.AO_MUA.toi = "#B85A1E"; }
  B.AO = "#E07A2E"; B.AO_TOI = "#B85A1E"; B.CUC = "#8A5A33"; B.OLIU = "#7C8646"; B.OLIU_TOI = "#566030";
  B.SEA = "#7E9AA2"; B.SEA_DEEP = "#5E7C86"; B.GRASS = "#9DB86A"; B.ROCK = "#6E6A66";

  /** smootherstep đối xứng (luot-smootherstep). */
  B.sm = function (k) { k = VT.clamp(k, 0, 1); return k * k * k * (k * (k * 6 - 15) + 10); };
  /** Wob mặc đồ tập 5. o.ao: true (áo mưa, mũ trùm hạ) | "hood" (mũ trùm lên) | false (đồ ở nhà). Tự chớp mắt trừ khi noBlink. */
  B.wob = function (o) {
    var b = {}, k;
    for (k in o) b[k] = o[k];
    if (b.ao === undefined) b.ao = true;
    if (b.ao) b.raincoat = { hood: b.ao === "hood", wet: b.wet || 0 };
    if (!b.noPack) b.packColor = "oliu";
    if (!b.noBlink && (!b.eyes || b.eyes === "open" || b.eyes === "wide")) b.lid = Math.max(b.lid || 0, VT.blink(b.t || 0, b.blinkP || 3.3, b.blinkO || 0.4));
    var s = VT.wob(b);
    if (b.ao) s = s.replace(/<circle cx="214" cy="(266|296)" r="6" fill="#1f2326"\/>/g, function (m, y) { return VT.ell(214, +y, 9, 9, B.CUC, 4, { ox: 1, oy: 1 }); });
    return s;
  };
  /** Ba lô nhỏ ô liu tháo rời (ôm trước ngực, dưới giường): gốc giữa đáy, cao ~190 ở s = 1. */
  B.balo = function (o) { return VT.backpack(o).replace(/#b8743a/g, B.OLIU).replace(/#8e5527/g, B.OLIU_TOI); };
  /** Khung viền mây "tưởng tượng" (lớp over). */
  B.dream = function (t) { return VT.dreamFrame(t, { inset: 44 }); };
  /** Chữ z ngủ vẽ bằng nét (không phải chữ): gốc giữa, s, op. */
  B.zz = function (x, y, s, op) { return VT.g(VT.tr(x, y, s, -8), VT.line("M -20 -20 L 20 -20 L -20 20 L 20 20", 7, INK, op == null ? 1 : op)); };
  /** Chuỗi z bay lên từ (x, y) theo t. */
  B.zzz = function (t, x, y, s) {
    var out = "";
    for (var i = 0; i < 3; i++) { var p = ((t * 0.7 + i / 3) % 1); out += B.zz(x + 60 * p * s + 16 * Math.sin(p * 9) * s, y - 170 * p * s, s * (0.5 + 0.7 * p), VT.clamp(1.3 - p * 1.3, 0, 1)); }
    return out;
  };
  /** Một vòng sóng âm vẽ tay (các cung đứt) tâm (cx, cy), bán kính r, độ mờ op. gap: [góc0, góc1] (độ, 0 = phải, chiều kim đồng hồ) phần KHÔNG vẽ (để né đầu Wob). */
  B.ring = function (cx, cy, r, op, gap, sw, col) {
    if (op <= 0.02 || r <= 2) return "";
    var out = "", n = 10;
    for (var i = 0; i < n; i++) {
      var a0 = i / n * 360 + 6, a1 = a0 + 360 / n - 14;
      if (gap) { var m = (a0 + a1) / 2; if ((gap[0] <= gap[1] && m >= gap[0] && m <= gap[1]) || (gap[0] > gap[1] && (m >= gap[0] || m <= gap[1]))) continue; }
      var r0 = a0 * Math.PI / 180, r1 = a1 * Math.PI / 180, rr = r * (1 + 0.03 * Math.sin(i * 2.7));
      out += '<path d="M ' + f(cx + Math.cos(r0) * rr) + " " + f(cy + Math.sin(r0) * rr) + " A " + f(rr) + " " + f(rr) + " 0 0 1 " + f(cx + Math.cos(r1) * rr) + " " + f(cy + Math.sin(r1) * rr) +
        '" fill="none" stroke="' + (col || INK) + '" stroke-width="' + (sw || 7) + '" stroke-linecap="round" opacity="' + f(op * 100) / 100 + '"/>';
    }
    return out;
  };
  /** Củ khoai: gốc tâm, s (dài ~90 ở s = 1), rot, seed. */
  B.potato = function (o) {
    var sd = o.seed || 1, pts = [];
    for (var i = 0; i < 10; i++) { var a = i / 10 * Math.PI * 2; pts.push([Math.cos(a) * (46 + 5 * VT.hash(sd + i)), Math.sin(a) * (32 + 4 * VT.hash(sd * 3 + i))]); }
    var out = VT.shape(VT.smooth(pts, true), "#C9A15E", { sw: 5, ox: 3, oy: 3 }) + VT.dot(-14, -8, 3.5, "#7A5A30") + VT.dot(12, 6, 3.5, "#7A5A30") + VT.dot(24, -10, 3, "#7A5A30");
    return VT.wrap(o, out);
  };
  /** Tôm hùm gai (không càng lớn, râu dài gai): nhìn nghiêng, gốc giữa bụng, đầu về +x, dài ~300 ở s = 1. t: chân bò (phase), walk 0/1, stand: dựng đứng trên đuôi (lính gác). shift: đổi chân 0..1. */
  B.lobster = function (o) {
    var t = o.t || 0, wk = o.walk ? Math.round(t * 12) : 0, out = "", C1 = o.col || "#C8502F", C2 = "#9E3A22", sh = o.shift || 0;
    // râu dài
    out += VT.line("M 118 -34 C 200 -120 290 -150 360 -120", 7, C2) + VT.line("M 112 -20 C 210 -80 300 -70 370 -40", 7, C2);
    out += VT.line("M 130 -34 C 160 -60 190 -64 210 -50", 5) + VT.line("M 126 -24 C 156 -40 186 -36 204 -22", 5);
    // chân
    for (var i = 0; i < 5; i++) {
      var x = 70 - i * 26, ph = Math.sin(wk * 1.1 + i * 1.3) * (o.walk ? 12 : 0) + (i === 1 ? -sh * 18 : 0);
      out += VT.line("M " + x + " 6 L " + f(x + 10 + ph) + " 34 L " + f(x - 2 + ph) + " 56", 5);
    }
    // đuôi đốt + quạt đuôi
    var tail = "";
    for (var j = 0; j < 5; j++) { var x0 = -20 - j * 34; tail += VT.shape("M " + x0 + " -30 C " + (x0 - 20) + " -38 " + (x0 - 34) + " -26 " + (x0 - 36) + " -6 L " + (x0 - 32) + " 16 C " + (x0 - 18) + " 24 " + (x0 - 4) + " 20 " + x0 + " 14 Z", j % 2 ? C1 : "#D9643C", { sw: 5, ox: 2, oy: 2 }); }
    tail += VT.shape("M -190 -10 L -244 -46 L -236 -6 L -250 32 L -190 10 Z", C1, { sw: 5, ox: 2, oy: 2 });
    out += tail;
    // mai có gai
    out += VT.shape("M -24 -34 C 20 -50 90 -50 126 -30 C 142 -16 140 8 120 16 C 80 26 10 24 -24 16 Z", C1, { sw: 6 });
    for (var g = 0; g < 6; g++) { var gx = -10 + g * 22; out += VT.shape("M " + gx + " -40 L " + (gx + 6) + " -56 L " + (gx + 12) + " -42 Z", "#EFD0A0", { sw: 3, ox: 0, oy: 0 }); }
    for (var h = 0; h < 7; h++) out += VT.dot(-6 + h * 19, -10 + (h % 2) * 12, 4, "#F2D8B0");
    out += VT.ell(118, -36, 9, 9, "#FFFDF6", 4, { ox: 0, oy: 0 }) + VT.dot(120, -36, 4);
    var tr = o.stand ? "rotate(" + (o.flipX ? 90 : -90) + ")" : "";
    return VT.wrap(o, tr ? VT.g(tr, out) : out);
  };
  /** Tem có răng cưa: gốc tâm, w, h, design (hàm vẽ trong khung ±w/2 ±h/2), perf 0..1 (răng cưa mọc dần), col nền. */
  B.stamp = function (o) {
    var w = o.w || 150, h = o.h || 180, k = o.perf == null ? 1 : o.perf, out = "", r = 7, step = 18, hw = w / 2, hh = h / 2;
    var bg = o.col || "#FFFDF6";
    out += '<rect x="' + f(-hw) + '" y="' + f(-hh) + '" width="' + w + '" height="' + h + '" fill="' + bg + '"/>';
    if (k > 0) {
      var paper = o.paper || "#EFE3C8";
      for (var x = -hw + step / 2; x < hw; x += step) { out += VT.dot(x, -hh, r * k, paper) + VT.dot(x, hh, r * k, paper); }
      for (var y = -hh + step / 2; y < hh; y += step) { out += VT.dot(-hw, y, r * k, paper) + VT.dot(hw, y, r * k, paper); }
    }
    out += '<rect x="' + f(-hw + 4) + '" y="' + f(-hh + 4) + '" width="' + (w - 8) + '" height="' + (h - 8) + '" fill="none" stroke="' + INK + '" stroke-width="' + (k > 0.5 ? 4 : 5) + '" stroke-linejoin="round" opacity="' + (k > 0.5 ? 0.35 : 0.9) + '"/>';
    out += '<rect x="' + f(-hw + 16) + '" y="' + f(-hh + 16) + '" width="' + (w - 32) + '" height="' + (h - 32) + '" fill="none" stroke="' + INK + '" stroke-width="4"/>';
    if (o.design) out += o.design(w - 40, h - 40);
    return VT.wrap(o, out);
  };
  /** Chín hình mẫu tem nét mực đen trắng (KHÔNG chim cánh cụt, KHÔNG mệnh giá): B.TEM[i](w, h) trả SVG quanh gốc tâm. */
  var L = function (d, sw) { return VT.line(d, sw || 4); };
  B.TEM = [
    function (w, h) { return L("M " + f(-w * 0.45) + " " + f(h * 0.3) + " L " + f(-w * 0.1) + " " + f(-h * 0.25) + " L " + f(w * 0.1) + " " + f(-h * 0.25) + " L " + f(w * 0.45) + " " + f(h * 0.3)) + L("M -10 " + f(-h * 0.3) + " C -20 " + f(-h * 0.42) + " 6 " + f(-h * 0.44) + " -4 " + f(-h * 0.48), 3) + L("M " + f(-w * 0.5) + " " + f(h * 0.3) + " L " + f(w * 0.5) + " " + f(h * 0.3), 3); }, // núi lửa
    function (w, h) { return L("M " + f(-w * 0.42) + " 0 C " + f(-w * 0.2) + " " + f(h * 0.2) + " " + f(w * 0.2) + " " + f(h * 0.2) + " " + f(w * 0.42) + " 0 Z") + L("M -24 6 L -32 -18 M 0 8 L 0 -20 M 24 6 L 32 -18", 3) + L("M " + f(-w * 0.5) + " " + f(h * 0.28) + " q 15 -8 30 0 q 15 8 30 0 q 15 -8 30 0 q 15 8 30 0", 3); }, // thuyền dài
    function (w, h) { return L("M -40 " + f(h * 0.3) + " L -40 -2 L 40 -2 L 40 " + f(h * 0.3) + " Z") + L("M -50 0 C -30 -34 30 -34 50 0", 5) + L("M -10 " + f(h * 0.3) + " L -10 14 L 10 14 L 10 " + f(h * 0.3), 3) + L("M 22 10 L 32 10 L 32 20 L 22 20 Z", 3); }, // nhà mái thấp
    function (w, h) { return L("M -40 10 C -20 -6 20 -6 44 6 C 50 14 40 22 30 22 L -36 22 C -46 20 -48 14 -40 10 Z") + L("M 40 4 C 50 -20 60 -30 66 -40 M 36 4 C 30 -24 20 -36 8 -44", 3) + L("M -44 14 L -60 2 L -58 26 Z", 3); }, // tôm hùm
    function (w, h) { var s2 = ""; for (var i = -1; i <= 1; i++) s2 += L("M " + (i * 30 - 12) + " 20 C " + (i * 30 - 18) + " 0 " + (i * 30 + 18) + " 0 " + (i * 30 + 12) + " 20 Z", 3); return s2 + L("M -50 22 L 50 22", 3) + L("M -40 -10 C -20 -30 20 -30 40 -10", 3); }, // khoai
    function (w, h) { return L("M -46 10 L 46 10 L 34 26 L -34 26 Z") + L("M 0 10 L 0 -40 M 0 -40 L 30 0 L 0 0 M 0 -36 L -26 0 L 0 0", 3); }, // tàu buồm
    function (w, h) { return L("M -50 0 C -36 -10 -24 -10 -10 0 C 4 10 16 10 30 0 C 40 -6 48 -6 54 -2", 4) + L("M -50 22 C -36 12 -24 12 -10 22 C 4 32 16 32 30 22", 3) + L("M -20 -20 C -6 -44 22 -44 34 -24", 3); }, // sóng
    function (w, h) { return L("M -50 14 C -30 -30 30 -30 50 14 Z") + L("M -10 -16 L 0 -34 L 10 -16", 3) + L("M -56 22 L 56 22", 3); }, // hòn đảo
    function (w, h) { return L("M -30 30 L -30 -20 L 30 -20 L 30 30") + L("M -38 -20 L 0 -46 L 38 -20", 4) + L("M 0 -46 L 0 -60 M -8 -54 L 8 -54", 3) + L("M -8 30 L -8 6 L 8 6 L 8 30", 3); }, // nhà thờ nhỏ
  ];
  /** Bưu thiếp (mặt viết): gốc tâm, w 300, h 200, stampDesign (chỉ số B.TEM), stampOff (ẩn tem). */
  B.postcard = function (o) {
    var w = o.w || 300, h = o.h || 200, hw = w / 2, hh = h / 2, out = VT.shape("M " + (-hw) + " " + (-hh) + " L " + hw + " " + (-hh) + " L " + hw + " " + hh + " L " + (-hw) + " " + hh + " Z", "#FBF4E2", { sw: 5, ox: 4, oy: 4 });
    out += VT.line("M 0 " + (-hh + 24) + " L 0 " + (hh - 20), 3, INK, 0.5);
    for (var i = 0; i < 4; i++) out += VT.line("M " + (-hw + 24) + " " + (-hh + 50 + i * 30) + " C " + (-hw + 60) + " " + (-hh + 42 + i * 30) + " " + (-30) + " " + (-hh + 56 + i * 30) + " -18 " + (-hh + 48 + i * 30), 3.5, "#2c4f6e", 0.8);
    for (var j = 0; j < 3; j++) out += VT.line("M 18 " + (hh - 70 + j * 24) + " L " + (hw - 20) + " " + (hh - 70 + j * 24), 3, INK, 0.45);
    if (!o.stampOff) out += B.stamp({ x: hw - 48, y: -hh + 54, w: 64, h: 78, design: function (ww, hh2) { return VT.g("scale(0.42)", B.TEM[o.stampDesign == null ? 0 : o.stampDesign](ww / 0.42, hh2 / 0.42)); }, paper: "#FBF4E2" });
    return VT.wrap(o, out);
  };
  /** Túi thư vải bố nâu nhạt, dây rút: gốc giữa đáy, cao ~260 ở s = 1. open 0..1 (miệng mở), label: chữ trên thẻ (chu_tren_do_vat), labelSize. */
  B.mailBag = function (o) {
    var op = o.open == null ? 0 : o.open, out = "", CB = "#D8C29A", CBD = "#B79E72";
    var neck = VT.lerp(26, 70, op);
    out += VT.shape("M -110 -10 C -130 -120 -90 -200 " + f(-neck) + " -220 L " + f(neck) + " -220 C 90 -200 130 -120 110 -10 C 80 6 -80 6 -110 -10 Z", CB, { sw: 6, ox: 6, oy: 5 });
    out += VT.line("M -70 -150 C -76 -100 -72 -50 -60 -16", 3, CBD) + VT.line("M 66 -140 C 74 -90 70 -50 60 -18", 3, CBD) + VT.line("M -20 -190 C -24 -120 -20 -60 -14 -10", 3, CBD, 0.7);
    if (op > 0.05) out += VT.ell(0, -222, neck, 12 + 10 * op, "#5E4A30", 5, { ox: 0, oy: 0 });
    else out += VT.shape("M -34 -226 C -10 -250 10 -250 34 -226 C 14 -214 -14 -214 -34 -226 Z", CB, { sw: 5 });
    out += VT.line("M " + f(-neck - 6) + " -204 C -20 -194 20 -194 " + f(neck + 6) + " -204", 6, "#8A6A3A") + VT.line("M " + f(neck + 4) + " -204 C " + f(neck + 26) + " -190 " + f(neck + 20) + " -170 " + f(neck + 34) + " -160", 5, "#8A6A3A");
    if (o.label) {
      var ls = o.labelSize || 60, lw = VT.textW(o.label, ls) + 40;
      out += VT.line("M " + f(neck + 34) + " -160 L " + f(neck + 40) + " -130", 4) + VT.shape("M " + f(-lw / 2) + " -130 L " + f(lw / 2) + " -130 L " + f(lw / 2) + " " + f(-130 + ls * 1.5) + " L " + f(-lw / 2) + " " + f(-130 + ls * 1.5) + " Z", "#FFFDF6", { sw: 5 }) +
        VT.text(0, -130 + ls * 1.1, o.label, ls, { fill: "#2c4f6e" });
    }
    return VT.wrap(o, out);
  };
  /** Đồng xu: gốc tâm, r 30. */
  B.coin = function (o) { return VT.wrap(o, VT.ell(0, 0, o.r || 30, (o.r || 30) * (o.flat || 1), "#E8C25A", 5, { ox: 2, oy: 2 }) + VT.ell(0, 0, (o.r || 30) * 0.62, (o.r || 30) * 0.62 * (o.flat || 1), null, 3)); };
  /** Nhà Tristan mái thấp (tường đá quét vôi, mái xanh rêu/đỏ, ống khói): gốc giữa đáy, w 200. */
  B.cot = function (o) {
    var w = o.w || 200, h = w * 0.42, hw = w / 2, rf = o.roof || "#5E7A4A", out = "";
    if (o.chimney !== false) out += VT.shape("M " + f(hw * 0.5) + " " + f(-h - 30) + " L " + f(hw * 0.5) + " " + f(-h - 70) + " L " + f(hw * 0.72) + " " + f(-h - 70) + " L " + f(hw * 0.72) + " " + f(-h - 20) + " Z", "#D8D2C4", { sw: 5 });
    out += VT.shape("M " + (-hw) + " 0 L " + (-hw) + " " + f(-h) + " L " + hw + " " + f(-h) + " L " + hw + " 0 Z", o.wall || "#F4F1EA", { sw: 5 });
    out += VT.shape("M " + f(-hw - 14) + " " + f(-h + 4) + " C " + f(-hw * 0.6) + " " + f(-h - 56) + " " + f(hw * 0.6) + " " + f(-h - 56) + " " + f(hw + 14) + " " + f(-h + 4) + " Z", rf, { sw: 5 });
    out += VT.shape("M -12 0 L -12 " + f(-h * 0.6) + " L 12 " + f(-h * 0.6) + " L 12 0 Z", o.door || "#3F6A70", { sw: 4 });
    out += VT.shape("M " + f(-hw * 0.7) + " " + f(-h * 0.7) + " L " + f(-hw * 0.4) + " " + f(-h * 0.7) + " L " + f(-hw * 0.4) + " " + f(-h * 0.4) + " L " + f(-hw * 0.7) + " " + f(-h * 0.4) + " Z", o.lit ? "#F6C46A" : "#9CC8DC", { sw: 3 });
    out += VT.shape("M " + f(hw * 0.4) + " " + f(-h * 0.7) + " L " + f(hw * 0.7) + " " + f(-h * 0.7) + " L " + f(hw * 0.7) + " " + f(-h * 0.4) + " L " + f(hw * 0.4) + " " + f(-h * 0.4) + " Z", o.lit ? "#F6C46A" : "#9CC8DC", { sw: 3 });
    return VT.wrap(o, out);
  };
  /** Mặt đất cỏ vẽ tay từ y xuống (phủ rộng để camera lia). */
  B.grass = function (y, col) { return '<rect x="-1200" y="' + f(y) + '" width="4320" height="2400" fill="' + (col || B.GRASS) + '"/>' + VT.line("M -1200 " + f(y) + " C -400 " + f(y - 10) + " 400 " + f(y + 8) + " 1200 " + f(y - 4) + " S 2600 " + f(y + 6) + " 3100 " + f(y), 6); };
  /** Nền giấy tông màu (bầu trời / tường) phủ rộng. */
  B.fill = function (col) { return '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + col + '"/>'; };
  /** Rung nhỏ theo bậc hình (vật đang ngân): trả [dx, dy] biên độ amp, tắt dần trong dur. */
  B.vib = function (t, t0, dur, amp) { if (t < t0 || t > t0 + dur) return 0; var k = 1 - (t - t0) / dur; return (Math.round(t * 12) % 2 ? 1 : -1) * amp * k; };
  return B;
};
/* ---- hết bộ trợ giúp chung ---- */
