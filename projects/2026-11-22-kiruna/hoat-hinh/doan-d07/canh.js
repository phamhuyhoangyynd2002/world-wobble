/* d07 · vẽ tay · sơ đồ mặt cắt: mỏ nổ mỗi đêm (73,953–83,211 s tuyệt đối; 9,26 s). Vào "cat", ra "cat".
 * Trên cùng phòng thuê (giường, sàn), dưới là các lớp đất đá, sâu nhất là đường hầm: chấm nổ loé ở "blasts", vạch sóng mực bốc lên tới tai Wob,
 * thẻ 01:15–01:45 viết dần ở "one fifteen"; hầm trống + rào chắn không chữ ở "cleared"; quạt thông gió + mũi tên gió nét đứt ở "aired";
 * gag: Wob cầm gối quạt cho mình đúng nhịp cánh quạt dưới hầm.
 * Đồ Wob: TRONG PHÒNG THUÊ không áo khoác, không mũ, không khăn, không ba lô (noPack); áo phao xanh lam vắt lưng ghế (túi phải quay ra), mũ len, khăn trên ghế.
 * Chữ duy nhất: "01:15–01:45".
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, C = VT.C, f = VT.f;
  var T_BLAST = VT.tu("blasts"), T_ONE = VT.tu("one"), T_THE = VT.tu("The"), T_CLEAR = VT.tu("cleared"), T_AIRED = VT.tu("aired");
  var DUR = D.thoi_luong, FLOOR = 300, TUN = 880, BLAST = [1460, TUN], FAN = [430, TUN - 6], WS = 0.5;
  VT.sfx("bonk", T_BLAST, 0.7);
  VT.sfx("pop", T_ONE + 0.02, 0.5);

  function W(t, o) {
    var b = { t: t, s: WS, noPack: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.7, 0.3));
    return VT.wob(b);
  }
  function chair() { // ghế gỗ: áo phao vắt lưng ghế (túi phải quay ra), mũ len + khăn trên mặt ghế
    var x = 1180, y = FLOOR, s = "";
    s += VT.line("M " + (x - 50) + " " + y + " L " + (x - 46) + " " + (y - 70) + " M " + (x + 50) + " " + y + " L " + (x + 46) + " " + (y - 70) + " M " + (x + 46) + " " + (y - 70) + " L " + (x + 50) + " " + (y - 170), 9, C.woodDark);
    s += VT.rectS(x - 60, y - 82, x + 60, y - 66, C.wood, { sw: 5 });
    s += VT.shape("M " + (x + 26) + " " + (y - 172) + " C " + (x + 70) + " " + (y - 176) + " " + (x + 74) + " " + (y - 120) + " " + (x + 70) + " " + (y - 70) + " L " + (x + 20) + " " + (y - 76) + " C " + (x + 24) + " " + (y - 110) + " " + (x + 20) + " " + (y - 150) + " " + (x + 26) + " " + (y - 172) + " Z", VT.AO_PHAO.mau, { sw: 5 });
    s += VT.line("M " + (x + 24) + " " + (y - 140) + " L " + (x + 70) + " " + (y - 142) + " M " + (x + 22) + " " + (y - 108) + " L " + (x + 72) + " " + (y - 110), 3, VT.AO_PHAO.chan);
    s += VT.rectS(x + 34, y - 132, x + 60, y - 108, VT.AO_PHAO.mau, { sw: 3.5, ox: 1, oy: 1 }) + VT.rectS(x + 33, y - 133, x + 61, y - 124, VT.AO_PHAO.nap, { sw: 3, ox: 1, oy: 1 });
    s += VT.shape("M " + (x - 50) + " " + (y - 82) + " C " + (x - 40) + " " + (y - 104) + " " + (x - 4) + " " + (y - 104) + " " + (x + 4) + " " + (y - 82) + " Z", VT.MU_THONG.mu, { sw: 4 }) + VT.dot(x - 23, y - 104, 7, VT.MU_THONG.bong);
    s += VT.rectS(x - 2, y - 92, x + 44, y - 82, VT.KHAN_KEM_XANH.mau, { sw: 3.5, ox: 1, oy: 1 }) + VT.line("M " + (x + 10) + " " + (y - 92) + " L " + (x + 10) + " " + (y - 82) + " M " + (x + 26) + " " + (y - 92) + " L " + (x + 26) + " " + (y - 82), 4, VT.KHAN_KEM_XANH.soc);
    return s;
  }
  function fanAngle(t) { var k = seg(t, T_AIRED - 0.25, T_AIRED + 0.6); return k <= 0 ? 0 : 360 * 1.15 * Math.max(0, t - (T_AIRED - 0.25)) * (0.5 + 0.5 * k); }
  // ----- sơ đồ mặt cắt -----
  function soDo(t, o) {
    o = o || {};
    var s = VT.rectS(-1400, -1400, 3300, FLOOR, "#F3E8CF", { sw: 0, ox: 0, oy: 0 });
    s += VT.line("M 560 " + FLOOR + " L 560 40 L 1360 40 L 1360 " + FLOOR, 6, C.ink, 0.6);
    s += VT.rectS(1250, 90, 1330, 190, "#2C3A55", { sw: 5 }) + VT.line("M 1290 90 L 1290 190 M 1250 140 L 1330 140", 4, C.woodDark);
    s += VT.giuong({ x: 760, y: FLOOR, w: 300 }) + chair();
    var bands = [[FLOOR, 420, "#C9A77A"], [420, 600, "#B09A84"], [600, 780, "#958A7E"], [780, 1500, "#7A736C"]];
    bands.forEach(function (b, i) { s += VT.shape("M -1400 " + b[0] + " C -300 " + (b[0] + (i ? 14 : 0)) + " 900 " + (b[0] - (i ? 16 : 0)) + " 3300 " + (b[0] + (i ? 8 : 0)) + " L 3300 " + b[1] + " L -1400 " + b[1] + " Z", b[2], { sw: i ? 4 : 7, ox: 0, oy: 0 }); });
    for (var i = 0; i < 40; i++) { var x = -400 + VT.hash(i * 3.3) * 2800, y = 440 + VT.hash(i * 7.1) * 480; if (Math.abs(y - TUN) > 70) s += VT.ell(x, y, 8 + 10 * VT.hash(i), 6 + 6 * VT.hash(i + 2), "#6B645D", 2.5, { ox: 0, oy: 0 }); }
    s += VT.shape("M 260 " + (TUN - 52) + " L 1600 " + (TUN - 52) + " C 1640 " + (TUN - 52) + " 1650 " + (TUN + 46) + " 1600 " + (TUN + 46) + " L 260 " + (TUN + 46) + " Z", "#3A3631", { sw: 6, ox: 0, oy: 0 });
    s += VT.line("M 270 " + (TUN + 38) + " L 1600 " + (TUN + 38), 5, "#57514A");
    s += VT.shape("M 240 " + (TUN - 60) + " L 300 " + (TUN - 60) + " L 300 " + (TUN + 50) + " L 240 " + (TUN + 50) + " Z", "#5A5550", { sw: 5 });
    s += VT.quatGio({ x: FAN[0], y: FAN[1], r: 40, a: fanAngle(t) });
    if (o.barrier) s += VT.raoChan({ x: 1290, y: TUN + 40, s: 0.42 * o.barrier, w: 170 });
    return s;
  }
  function blastFx(t) {
    var k = seg(t, T_BLAST - 0.04, T_BLAST + 2.4), s = "", pulse = 1 + 0.25 * Math.sin(Math.round(t * 12) * 1.9);
    if (k <= 0 || k >= 1) return "";
    s += '<circle cx="' + BLAST[0] + '" cy="' + BLAST[1] + '" r="' + f((26 + 90 * E.out(Math.min(1, k * 4))) * pulse) + '" fill="#FFE6A0" opacity="' + f(0.95 * Math.sqrt(1 - k)) + '"/>' + '<circle cx="' + BLAST[0] + '" cy="' + BLAST[1] + '" r="' + f(22 * pulse) + '" fill="#FFFDF6" opacity="' + f(Math.sqrt(1 - k)) + '"/>';
    s += VT.radialLines(BLAST[0], BLAST[1], 20 + 30 * k, 50 + 70 * k, 10, 3, 5, "#F6D36A");
    return s;
  }
  // vạch sóng mực đi từ chỗ nổ lên tai Wob
  var EAR = [1000, FLOOR - 8];
  function waves(t) {
    var s = "";
    for (var i = 0; i < 4; i++) {
      var k = seg(t, T_BLAST + 0.1 + i * 0.32, T_BLAST + 1.5 + i * 0.32);
      if (k <= 0 || k >= 1) continue;
      var x = VT.lerp(BLAST[0], EAR[0], k), y = VT.lerp(BLAST[1] - 40, EAR[1] + 30, k), w = 40 + 30 * (1 - k);
      s += VT.line("M " + f(x - w) + " " + f(y + 10) + " Q " + f(x - w / 2) + " " + f(y - 8) + " " + f(x) + " " + f(y + 4) + " T " + f(x + w) + " " + f(y + 2), 6, C.ink, f(0.9 - 0.3 * k));
    }
    return s;
  }
  // thẻ 01:15–01:45 viết dần
  function card(t) {
    var k = seg(t, T_ONE, T_ONE + 1.3);
    if (k <= 0) return "";
    var pop = E.back(Math.min(1, seg(t, T_ONE - 0.1, T_ONE + 0.15)));
    return VT.g("translate(1600 640) rotate(-3) scale(" + f(pop) + ")", VT.rectS(-250, -60, 250, 60, "#FFFDF6", { sw: 6, ox: 5, oy: 4 }) + VT.textWrite(0, 26, "01:15–01:45", 72, k, { fill: "#2c4f6e" }));
  }
  // Wob nằm áp tai xuống sàn (thân nghiêng ~70°, má phải chạm sàn)
  function wobEar(t, o) {
    var k = o.k == null ? 1 : o.k;
    return VT.g("rotate(" + f(72 * k) + " " + EAR[0] + " " + FLOOR + ")", W(t, { x: EAR[0] - 20 * k, y: FLOOR, flip: -1, eyes: o.eyes || "open", px: -6, py: 10, brows: o.brows || "up", mouth: o.mouth || "oSmall", legs: k > 0.5 ? "tuck" : "stand", noBlink: true, lid: o.lid || 0 }));
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · cận giường → lùi ra xuyên sàn, lớp đất, tới hầm sâu; chấm nổ ở "blasts"; Wob nhảy xuống áp tai xuống sàn =====
  var B0 = 1.75;
  shot(0, B0, "lùi từ giường xuống hầm", function (t, lt, T) {
    var down = seg(t, T_BLAST + 0.25, T_BLAST + 0.75), out = soDo(t);
    if (down <= 0) out += W(t, { x: 840, y: FLOOR - 50, flip: -1, legs: "sit", eyes: t >= T_BLAST ? "wide" : "open", px: -4, py: 14, brows: t >= T_BLAST ? "up" : "flat", mouth: t >= T_BLAST ? "o" : "flat", sq: t >= T_BLAST && t < T_BLAST + 0.2 ? 1.12 : 1, marks: t >= T_BLAST && t < T_BLAST + 0.35 ? "shock" : null, noBlink: t >= T_BLAST });
    else if (down < 1) { var x = VT.lerp(820, EAR[0] - 20, down), y = VT.lerp(FLOOR - 78, FLOOR, down) - 70 * Math.sin(Math.PI * down); out += W(t, { x: x, y: y, flip: 1, legs: "tuck", eyes: "wide", brows: "up", mouth: "o", noBlink: true }); }
    else out += wobEar(t, { k: E.out(seg(t, T_BLAST + 0.75, T_BLAST + 0.95)) });
    out += blastFx(t) + waves(t);
    var pull = E.io3(seg(T, 0.05, 1.6));
    return { cam: [VT.lerp(860, 960, pull), VT.lerp(250, 560, pull), VT.lerp(2.3, 1.0, pull)], shake: VT.shake(T, T_BLAST, 0.25, 9), world: out, tint: "cold" };
  });

  // ===== S1 · toàn sơ đồ: sóng mực tới tai Wob; thẻ 01:15–01:45 viết dần =====
  shot(B0, T_THE, "toàn sơ đồ, thẻ giờ nổ", function (t, lt, T) {
    var out = soDo(t) + wobEar(t, { eyes: t > 2.6 ? "open" : "wide", brows: "up", mouth: t > 2.6 ? "flat" : "oSmall", lid: t > 3.2 ? 0.3 : 0 }) + blastFx(t) + waves(t) + card(t);
    return { cam: [980, 560, 1.0 + 0.04 * seg(T, B0, T_THE)], world: out, tint: "cold" };
  });

  // ===== S2 · cận hầm: trống, không người; rào chắn không chữ bật ra ở "cleared" =====
  var B2 = T_AIRED - 0.55;
  VT.sfx("pop", T_CLEAR, 0.45);
  shot(T_THE, B2, "hầm trống, rào chắn", function (t, lt, T) {
    var bk = E.back(seg(t, T_CLEAR - 0.12, T_CLEAR + 0.12));
    var out = soDo(t, { barrier: bk });
    return { cam: [VT.lerp(1300, 1220, E.io(seg(T, T_THE, B2))), TUN - 30, 2.1 + 0.08 * seg(T, T_THE, B2)], world: out, tint: "cold" };
  });

  // ===== S3 · quạt thông gió quay, mũi tên gió nét đứt chạy dọc hầm ở "aired"; lùi ra thấy Wob ở đỉnh sơ đồ quạt gối theo nhịp cánh quạt =====
  var T_PILLOW = T_AIRED + 0.55;
  shot(B2, DUR, "quạt gió; Wob quạt gối", function (t, lt, T) {
    var out = soDo(t, { barrier: 1 });
    for (var i = 0; i < 3; i++) {
      var k = seg(t, T_AIRED + i * 0.18, T_AIRED + 0.9 + i * 0.18), y = TUN - 22 + i * 18;
      if (k > 0) out += VT.lineDraw("M 480 " + y + " L 1560 " + y, k, 6, "#BFE3F2", { dash: "0.03 0.025" }) + (k >= 1 ? VT.line("M 1530 " + (y - 14) + " L 1562 " + y + " L 1530 " + (y + 14), 6, "#BFE3F2") : "");
    }
    var a = fanAngle(t), sw = Math.sin(a * Math.PI / 180 * 1) * 36;
    var hP = [370, 150];
    var o = { x: 1000, y: FLOOR, flip: -1, mouth: t > T_PILLOW ? "content" : "flat", eyes: t > T_PILLOW ? "squint" : "open", px: -10, py: 12, brows: "flat" };
    if (t > T_PILLOW - 0.35) { o.armR = [VT.lerp(338, hP[0], seg(t, T_PILLOW - 0.35, T_PILLOW)), VT.lerp(300, hP[1], seg(t, T_PILLOW - 0.35, T_PILLOW))]; o.handR = "nam"; o.propFront = VT.goi({ x: o.armR[0] - 10, y: o.armR[1] - 40, w: 120, rot: 60 + (t > T_PILLOW ? sw : 0) }); }
    else o.propFront = VT.goi({ x: 360, y: 290, w: 110, rot: 0 });
    out += W(t, o);
    var wide = E.io3(seg(T, T_AIRED + 0.35, T_AIRED + 1.05));
    return { cam: [VT.lerp(640, 720, wide), VT.lerp(TUN - 20, 560, wide), VT.lerp(2.0, 1.1, wide) + 0.04 * seg(T, T_AIRED + 1.05, DUR)], world: out, tint: "cold" };
  });

  return shots;
};
