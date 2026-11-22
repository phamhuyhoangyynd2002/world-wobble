/* d10 · vẽ tay · so sánh tưởng tượng: trạm xăng đơn độc giữa bão tuyết (146,64–153,69 s tuyệt đối; 7,05 s). Vào "chen", ra "cat".
 * Toàn khung là bong bóng tưởng tượng (VT.dreamFrame). S0 đường cao tốc đêm trống trơn, bão tuyết quất ngang, chấm sáng xa;
 * xe hộp của Wob lắc lư. S1 bão dày lên, trạm xăng lớn dần. S2 dưới mái trạm: Wob nhảy khỏi xe, ôm cột bơm như phao cứu sinh.
 * Đồ Wob (tưởng tượng): mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng; lái xe hộp nhỏ. Không chữ (chu_tren_do_vat rỗng).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, DUR = D.thoi_luong;
  var T_SINGLE = VT.tu("single"), T_STATION = VT.tu("station"), T_EMPTY = VT.tu("empty"), T_NIGHT = VT.tu("night");
  var T_BLIZZ = VT.tu("blizzard"), T_YOU = VT.tu("you"), T_STOP = VT.tu("stop"), T_PRETTY = VT.tu("pretty");
  var NIGHT = "#26324C", ROAD = 840, KRAFT = "#C4904F"; // xe hộp màu giấy kraft như d04, d06

  function W(t, o) {
    var b = { t: t, beanie: "khoa", scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && (b.eyes || "open") === "open") b.lid = Math.max(b.lid || 0, VT.blink(t, 2.8, 0.5));
    return VT.wob(b);
  }
  function blizzard(t, n, speed) { // vệt tuyết quất ngang, tất định theo t
    var s = "";
    for (var i = 0; i < n; i++) {
      var y = -300 + VT.hash(i * 5.3) * 1500, L = 50 + VT.hash(i * 2.1) * 80, v = speed * (0.7 + VT.hash(i * 1.7) * 0.6);
      var x = 2600 - ((VT.hash(i * 3.9) * 3800 + t * v) % 3800);
      s += VT.line("M " + f(x) + " " + f(y) + " l " + f(L) + " " + f(-L * 0.18), 4, "#F4F8FB", 0.85);
    }
    return s;
  }
  function road(t, speed) {
    var s = VT.sky(NIGHT, 1) + VT.ridge(700, -100, "#4D5D79") + VT.ridge(760, 400, "#6A7B97");
    s += VT.shape("M -1200 " + (ROAD - 50) + " L 3200 " + (ROAD - 50) + " L 3200 2400 L -1200 2400 Z", "#C3CFDB", { sw: 5, ox: 0, oy: 4 });
    s += VT.shape("M -1200 " + (ROAD - 30) + " L 3200 " + (ROAD - 30) + " L 3200 " + (ROAD + 60) + " L -1200 " + (ROAD + 60) + " Z", "#3E464D", { sw: 6, ox: 0, oy: 3 });
    var off = (t * speed) % 260;
    for (var x = -1200; x < 3300; x += 260) s += VT.line("M " + f(x - off) + " " + (ROAD + 15) + " l 120 0", 7, "#E8D27A", 0.9);
    for (var j = 0; j < 14; j++) { var px = -1100 + j * 340 - (t * speed * 0.6) % 340; s += VT.line("M " + f(px) + " " + (ROAD - 40) + " l 0 -60", 6, C.ink, 0.6) + VT.dot(px, ROAD - 104, 6, "#E06A4E"); }
    return s;
  }
  function wobInCar(t, cx, cy, cs, o) { // Wob ngồi trong xe hộp: đầu ló qua ô cửa
    var ws = 0.5 * cs / 0.8, wo = { s: ws, x: cx + 34 * cs, y: cy - 200 * cs + 222 * ws + 6, flip: 1, armL: [180, 250], armR: [240, 250], handL: "nam", handR: "nam" };
    for (var k in o) wo[k] = o[k];
    return W(t, wo);
  }
  var shots = [];

  // ===== S0 · đường cao tốc trống, đêm, bão tuyết; chấm sáng xa; xe hộp lắc lư =====
  var B0 = T_EMPTY - 0.3;
  VT.sfx("may-no", 0.15, 0.35); VT.sfx("ting", T_SINGLE + 0.02, 0.4);
  shots.push({ a: 0, b: B0, ten: "đường trống, bão, chấm sáng xa", ve: function (t, lt, T) {
    var cx = 640, cy = ROAD + 30, rock = Math.sin(Math.round(t * 12) * 1.1) * 3;
    var out = road(t, 900);
    var glow = 0.6 + 0.4 * Math.sin(Math.round(t * 12) * 0.9);
    out += '<circle cx="1700" cy="' + (ROAD - 70) + '" r="' + f(40 + 10 * glow) + '" fill="' + C.lampLight + '" opacity="0.45"/>' + VT.dot(1700, ROAD - 70, 9, "#FFF4C8");
    if (t >= T_SINGLE) out += VT.sparkle({ x: 1700, y: ROAD - 70, s: 0.4 + 0.15 * glow, fill: "#FFF4C8" });
    out += VT.g("rotate(" + f(rock) + " " + cx + " " + cy + ")", wobInCar(t, cx, cy, 0.8, { px: 12, py: 0, brows: "worried", mouth: "flat" }) + VT.boxCar({ x: cx, y: cy, s: 0.8, run: t, lights: true, snow: true, color: KRAFT }));
    out += blizzard(t, 50, 1600);
    var z = key(T, [[0, 1.05], [B0, 1.12, "sine"]]);
    return { cam: [key(T, [[0, 960], [B0, 1000, "sine"]]), 640, z], world: out, over: VT.dreamFrame(t), tint: "cold" };
  } });

  // ===== S1 · cận kính lái (nhìn từ trước mũi xe): Wob dí mặt vào kính, lau kính; bão tuyết quất vào kính, dày lên ở "blizzard" =====
  var B1 = T_BLIZZ + 0.23;
  VT.sfx("brr", T_NIGHT + 0.05, 0.4);
  function windshield(t, T) {
    var hard = seg(t, T_BLIZZ - 0.1, T_BLIZZ + 0.3), out = VT.sky(NIGHT, 1);
    // cabin trong xe (tối), Wob dí mặt vào kính
    out += '<rect x="440" y="300" width="1040" height="520" fill="#3A3F4A"/>';
    var wipe = (t - B0) * 5.2, wr = [300 + 50 * Math.cos(wipe), 120 + 40 * Math.sin(wipe)];
    var o = { s: 1.3, x: 960, y: 560 + (392 - 170) * 1.3, flip: 1, sq: 0.9, sxRaw: 1.16, px: 0, py: -4, brows: "worried", mouth: "flat", noBlink: true,
      armL: [40, 120], handL: "xoe", armR: wr, handR: "nam" };
    if (t > T_NIGHT && t < T_BLIZZ) { o.eyes = "wide"; o.mouth = "oSmall"; }
    if (t >= T_BLIZZ) { o.eyes = "squint"; o.mouth = "chatter"; o.shiver = 3; }
    out += W(t, o);
    // kính: lớp mờ, sương giá ở góc, vết lau tròn trong theo bàn tay
    var hp = VT.wobPt(o, wr[0], wr[1]);
    out += '<path d="M 520 340 L 1400 340 C 1430 340 1440 360 1440 390 L 1440 760 L 480 760 L 480 390 C 480 360 490 340 520 340 Z" fill="#DDEFF5" opacity="0.28"/>';
    out += '<path d="M 480 760 L 480 560 C 560 600 600 700 720 760 Z M 1440 760 L 1440 520 C 1360 580 1300 690 1200 760 Z" fill="#F4FAFC" opacity="' + f(0.55 + 0.35 * hard) + '"/>';
    out += VT.ell(hp[0], hp[1], 70, 50, "none", 4, { stroke: "#ffffff" });
    out += VT.line("M 560 380 L 640 360 M 1240 380 L 1330 360", 8, "#ffffff", 0.55);
    // vết mũi, má áp vào kính
    out += VT.ell(960, 640, 46, 26, "none", 3, { stroke: "#ffffff" });
    // thân xe kraft quanh khung kính
    out += VT.shape("M 300 1200 L 300 320 C 300 230 380 200 470 200 L 1450 200 C 1540 200 1620 230 1620 320 L 1620 1200 Z M 520 340 L 1400 340 C 1430 340 1440 360 1440 390 L 1440 760 L 480 760 L 480 390 C 480 360 490 340 520 340 Z", KRAFT, { sw: 8, rule: "evenodd" });
    out += VT.shape("M 300 230 C 600 150 1300 150 1620 230 L 1620 260 C 1300 190 600 190 300 260 Z", C.snow, { sw: 5 });
    [[600, 920], [1320, 920]].forEach(function (p) { out += VT.ell(p[0], p[1], 90, 70, "#F6E7A6", 7) + '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="150" ry="120" fill="' + C.lampLight + '" opacity="0.35"/>'; });
    out += VT.shape("M 260 1020 L 1660 1020 L 1660 1100 L 260 1100 Z", "#5b5b5b", { sw: 6 });
    // gạt nước quét qua lại
    var wa = -40 + 70 * (0.5 + 0.5 * Math.sin((t - B0) * 6));
    out += VT.g("rotate(" + f(wa) + " 700 760)", VT.line("M 700 760 L 700 470", 10) + VT.line("M 700 760 L 700 470", 4, "#9aa3a8"));
    // tuyết quất vào kính, bám thành chấm
    for (var i = 0; i < 26 + Math.round(30 * hard); i++) {
      var ph = ((t * (1.6 + hard) + VT.hash(i * 3.3)) % 1), x = 200 + VT.hash(i * 7.1) * 1600, y = 120 + VT.hash(i * 2.9) * 900;
      out += VT.line("M " + f(x - 160 * (1 - ph)) + " " + f(y - 40 * (1 - ph)) + " l " + f(60 + 60 * ph) + " " + f(12 + 10 * ph), 4 + 3 * ph, "#F4F8FB", 0.9);
    }
    for (var j = 0; j < 14; j++) { var tj = B0 + j * 0.18; if (t > tj) out += VT.dot(520 + VT.hash(j * 5.5) * 880, 360 + VT.hash(j * 9.1) * 380, 7, "#ffffff"); }
    return out;
  }
  shots.push({ a: B0, b: B1, ten: "cận kính lái: dí mặt, lau kính, bão", ve: function (t, lt, T) {
    var rock = Math.sin(Math.round(t * 12) * 1.3) * (4 + 8 * seg(t, T_BLIZZ - 0.1, T_BLIZZ + 0.3));
    var z = key(T, [[B0, 1.0], [B1, 1.12, "sine"]]);
    return { cam: [960, 600, z], shake: [rock, rock * 0.4], world: windshield(t, T), over: VT.dreamFrame(t), tint: "cold" };
  } });

  // ===== S2 · dưới mái trạm: Wob nhảy khỏi xe, ôm cột bơm như phao cứu sinh; giữ hình =====
  var SX = 1100, SY = ROAD + 20, SS = 0.85, PUMP = [SX - 260 * SS, SY];
  var T_JUMP = T_YOU - 0.2, T_HUG = T_STOP - 0.02, T_PARK = T_JUMP - 0.1;
  VT.sfx("boing", T_JUMP, 0.4); VT.sfx("bonk", T_HUG, 0.35); VT.sfx("liu-lo-vui", T_HUG + 0.15, 0.6);
  shots.push({ a: B1, b: DUR, ten: "ôm cột bơm", ve: function (t, lt, T) {
    var out = road(t, 0).replace(NIGHT, NIGHT);
    out += VT.gasStation({ x: SX, y: SY, s: SS, glow: 1 });
    var carX = key(t, [[B1, -260], [T_PARK, 380, "out"]]), carRun = t < T_PARK ? t : null;
    if (t < T_PARK) out += wobInCar(t, carX, SY + 10, 0.8, { px: 14, py: -4, eyes: "wide", mouth: "smile", brows: "up" });
    out += VT.boxCar({ x: carX, y: SY + 10, s: 0.8, snow: true, color: KRAFT, run: carRun, lights: t < T_PARK });
    if (t < T_PARK) out += VT.speedLines({ x0: carX - 420, y0: SY - 220, n: 4, gap: 50, len: 140, dx: -1, dy: 0, sw: 5, color: "#F4F8FB" });
    var ws = 0.55, o = { s: ws, flip: 1 };
    var start = [407, SY - 40], end = [PUMP[0] + 78, SY];
    if (t < T_PARK) { o = null; }
    else if (t < T_JUMP) { o.x = start[0]; o.y = SY - 40; o.sq = key(t, [[T_PARK, 1], [T_JUMP, 0.82, "out"]]); o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.px = 14; }
    else if (t < T_HUG) {
      var u = seg(t, T_JUMP, T_HUG), q = 1 - u, mid = [(start[0] + end[0]) / 2, SY - 330];
      o.x = q * q * start[0] + 2 * q * u * mid[0] + u * u * end[0]; o.y = q * q * (SY - 40) + 2 * q * u * mid[1] + u * u * end[1];
      o.arms = "up"; o.legs = "tuck"; o.eyes = "happy"; o.mouth = "smile"; o.sq = 1.12; o.smear = u < 0.6 ? 70 : 0;
    } else {
      o.x = end[0]; o.y = end[1];
      o.armL = [-40, 236]; o.armR = [40, 270]; o.handL = "nam"; o.handR = "nam"; // hai tay vòng qua mặt trước cột bơm
      o.eyes = "closed"; o.mouth = "smile"; o.noBlink = true; o.lean = -11 + 3 * Math.sin(Math.round(t * 12) * 0.7);
      o.sq = key(t, [[T_HUG, 0.84], [T_HUG + 0.35, 1, "elastic"]]);
    }
    var hugging = t >= T_HUG;
    out += hugging ? VT.gasPump({ x: PUMP[0], y: PUMP[1], s: 0.85 * SS }) : "";
    if (o) out += W(t, o);
    if (hugging) {
      var e = VT.wobPt(o, 160, 180), e2 = VT.wobPt(o, 240, 180);
      var tk = ((t - T_HUG) * 1.6) % 1;
      out += VT.drop({ x: e[0] - 6, y: e[1] + 30 + 60 * tk, s: 0.45 }) + VT.drop({ x: e2[0] + 6, y: e2[1] + 30 + 60 * ((tk + 0.5) % 1), s: 0.45 });
      [[PUMP[0] - 150, SY - 260], [PUMP[0] + 170, SY - 300], [PUMP[0] + 40, SY - 380]].forEach(function (p, i) { out += VT.sparkle({ x: p[0], y: p[1], s: (Math.round(t * 6) + i) % 2 ? 0.55 : 0.35, fill: "#FFF4C8" }); });
      if (t < T_HUG + 0.3) out += VT.puffBurst({ x: end[0], y: SY + 4, k: seg(t, T_HUG, T_HUG + 0.3), s: 0.5 });
    }
    out += blizzard(t, 40, 1500).replace(/opacity="0.85"/g, 'opacity="0.55"');
    var z = key(T, [[B1, 1.25], [T_HUG, 1.32], [T_HUG + 0.4, 1.55, "out"], [DUR, 1.62, "sine"]]);
    var cxy = key(T, [[B1, [760, 600]], [T_HUG, [PUMP[0] + 20, 620]], [T_HUG + 0.4, [PUMP[0] + 20, 640], "out"], [DUR, [PUMP[0] + 20, 640]]]);
    return { cam: [cxy[0], cxy[1], z], shake: VT.shake(t, T_HUG, 0.2, 6), world: out, over: VT.dreamFrame(t), tint: "warm" };
  } });
  return shots;
};
