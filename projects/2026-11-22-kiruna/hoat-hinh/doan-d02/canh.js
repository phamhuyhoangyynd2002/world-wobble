/* d02 · vẽ tay · chèn: về trả chìa tháng 8 (3,263–7,362 s tuyệt đối; 4,1 s). Vào "chen", ra "cat".
 * Bố cục bãi sỏi DÙNG LẠI ở d31 (cùng hàm baiSoi, cùng toạ độ): vỉa hè khô, hai đoạn hàng rào lưới thép, bãi sỏi ở giữa, cột biển tên phố trắng.
 * Gag: nhìn qua lỗ đầu chìa thấy cánh cửa cũ ("door"), hạ chìa thì chỉ còn sỏi ("gone."), biển phố rơi ("street.").
 * Đồ Wob (mùa hè): gi-lê kem túi phải, kính râm tròn đẩy lên trán, ba lô ô liu + thảm đỏ + áo phao cuộn; tay phải cầm chùm chìa nhà, giơ riêng chìa Kiruna.
 * Không chữ (chu_tren_do_vat rỗng).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, GROUND = 905, WS = 0.72, KS = 0.75;
  var T_DOOR = VT.tu("door"), T_GONE = VT.tu("gone."), T_SO = VT.tu("So"), T_STREET = VT.tu("street.");
  var DUR = D.thoi_luong;

  function W(t, o) {
    var b = { t: t, s: WS, vest: true, sunglasses: "tran", packColor: "kiruna", coatRoll: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.9, 0.4));
    return VT.wob(b);
  }
  // chìa trong tay (hệ Wob): bàn tay nắm thân chìa, đầu chìa có lỗ ở TRÊN nắm tay; chùm chìa nhà rủ dưới nắm tay
  function keysInHand(h, sw, t) {
    return VT.chumChia({ x: h[0], y: h[1] + 8, s: 0.85, kiruna: false, swing: sw }) +
      VT.chiaKiruna({ x: h[0], y: h[1] - 70 * KS, s: KS, rot: 90, tagSwing: -60 + sw * 1.4 });
  }
  // ----- bối cảnh bãi sỏi (y hệt d31) -----
  function bai(t, o) {
    o = o || {};
    var s = VT.sky("#DCEAEE", 1) + VT.ridge(622, -80, "#C7D3CF");
    s += VT.nhaPhaDo({ x: 640, y: 628, w: 300, h: 240, seed: 2, op: 0.5 }) + VT.nhaPhaDo({ x: 1150, y: 628, w: 280, h: 200, seed: 7, op: 0.45 }) + VT.nhaPhaDo({ x: 1500, y: 628, w: 340, h: 260, seed: 4, op: 0.4 });
    s += VT.rectS(-1400, 622, 3300, 800, "#CBC3A6", { sw: 0, ox: 0, oy: 0 }) + VT.line("M -1400 624 L 3300 624", 4, VT.C.ink, 0.5);
    [[220, 700], [560, 660], [1420, 690], [1760, 650], [300, 760]].forEach(function (p) { s += VT.line("M " + p[0] + " " + p[1] + " l -8 -16 M " + (p[0] + 6) + " " + p[1] + " l 2 -20 M " + (p[0] + 12) + " " + p[1] + " l 10 -14", 4, "#6E8B4E"); });
    s += VT.baiSoi({ x: 1030, y: 790, w: 620, d: 168, dong: 0.55, seed: 3 });
    if (o.door) s += VT.rectS(870, 560, 1190, 790, "#D8CDB8", { sw: 3, ox: 0, oy: 0, sop: 0.4 }) + VT.cuaGo({ x: 1030, y: 790, w: 150, h: 300, op: 0.85 });
    if (o.signLie) s += VT.g("translate(1175 770) scale(1.1 0.42) rotate(-8)", VT.bienPho({ x: 0, y: 0, off: true }));
    s += VT.hangRao({ x: 100, y: 795, w: 660 }) + VT.hangRao({ x: 1300, y: 795, w: 660 });
    s += VT.shape("M -1400 800 L 3300 800 L 3300 2400 L -1400 2400 Z", "#D9D4C9", { sw: 5, ox: 0, oy: 0 });
    for (var x = -1300; x < 3300; x += 300) s += VT.line("M " + x + " 800 L " + (x - 120) + " 1060", 3, "#A9A398", 0.7);
    s += VT.line("M -1400 1060 L 3300 1060", 6, "#B3AC9F");
    if (o.signPost !== false) s += VT.bienPho({ x: 1255, y: 800, post: 330, sign: o.sign !== false });
    return s;
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · Wob đi dọc vỉa hè, giơ chìa như cầm vé; dừng trước bãi sỏi; giơ chìa lên mắt, camera đẩy vào mặt =====
  var WK = { t0: 0, t1: 1.25, x0: 380, x1: 800, chuKy: 0.62, s: WS };
  var T_LIFT0 = T_DOOR - 0.42, T_LIFT1 = T_DOOR - 0.12;
  shot(0, T_DOOR, "đi tới, giơ chìa lên mắt", function (t, lt, T) {
    var wk = VT.buoc(t, WK), o = { s: WS, x: wk.x, y: GROUND, flip: 1 };
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; o.mouth = "content"; o.px = 8; }
    else { o.sq = key(t, [[1.25, 0.93], [1.4, 1.03, "out"], [1.55, 1]]); o.px = 12; o.py = -4; o.brows = "up"; o.mouth = "oSmall"; }
    o.pack = VT.conLac(t, -0.4, function (s) { var k = VT.buoc(s, WK); return [k.x, GROUND - 12 * Math.pow(Math.sin(k.phase * 2 * Math.PI), 2) * (k.walking ? 1 : 0)]; }, { gx: 1 / 500, gy: 1 / 900 });
    var lift = E.io(seg(t, T_LIFT0, T_LIFT1));
    var h = [VT.lerp(392, 238, lift), VT.lerp(196, 156 + 70 * KS + 4, lift)];
    if (wk.walking) h[1] += Math.sin(wk.phase * 4 * Math.PI) * 5;
    o.armR = h; o.handR = "nam";
    var sw = VT.conLac(t, -0.4, function (s) { var k = VT.buoc(s, WK); return [k.x, GROUND]; }, { gx: 1 / 300, gy: 1 / 900 }) * 1.2 + (lift > 0 && lift < 1 ? 14 : 0);
    o.prop = keysInHand(h, sw, t);
    if (lift > 0.5) { o.px = 4; o.py = -2; o.mouth = "flat"; o.brows = "flat"; o.eyes = "open"; }
    var out = bai(t) + W(t, o);
    var face = VT.wobPt(o, 220, 170);
    var push = E.io3(seg(T, T_LIFT0 - 0.05, T_DOOR - 0.02));
    var fx = VT.buoc(T, WK).x + 170;
    var cx = VT.lerp(fx, face[0], push), cy = VT.lerp(690, face[1], push), z = VT.lerp(1.5, 2.3, push) + 0.03 * seg(T, 0, 1.4);
    return { cam: [cx, cy, z], world: out, tint: "warm" };
  });

  // ===== S1 · CẬN lỗ chìa (góc nhìn của Wob): trong lỗ là cánh cửa cũ; "gone." hạ chìa → chỉ còn sỏi và hàng rào =====
  var T_DOWN0 = T_GONE, T_DOWN1 = T_GONE + 0.26, B1 = T_GONE + 0.32;
  shot(T_DOOR, B1, "cận lỗ chìa: cánh cửa / hạ chìa: chỉ còn sỏi", function (t, lt, T) {
    var door = t < T_DOWN0;
    var world = bai(t, { door: door });
    var burst = 1 + 0.12 * (1 - E.out(seg(T, T_DOOR, T_DOOR + 0.3)));
    var cam = [1030, 650, 1.55 * burst + 0.04 * seg(T, T_DOOR, B1)];
    var drop = 1300 * E.in2(seg(T, T_DOWN0, T_DOWN1)), cx = 960, cy = 520 + drop, R0 = 205, R1 = 345;
    var over = "";
    var dim = 1 - seg(T, T_DOWN0, T_DOWN1);
    if (dim > 0) over += '<rect x="-40" y="-40" width="2000" height="1160" fill="#1f2326" opacity="' + VT.f(0.55 * dim) + '"/>';
    if (cy < 1700) {
      var ring = "M " + (cx - R1) + " " + cy + " A " + R1 + " " + R1 + " 0 1 0 " + (cx + R1) + " " + cy + " A " + R1 + " " + R1 + " 0 1 0 " + (cx - R1) + " " + cy + " Z M " +
        (cx - R0) + " " + cy + " A " + R0 + " " + R0 + " 0 1 1 " + (cx + R0) + " " + cy + " A " + R0 + " " + R0 + " 0 1 1 " + (cx - R0) + " " + cy + " Z";
      over += VT.shape("M " + (cx - 95) + " " + (cy + R1 - 40) + " L " + (cx + 95) + " " + (cy + R1 - 40) + " L " + (cx + 95) + " 1400 L " + (cx - 95) + " 1400 Z", "#3A3F44", { sw: 8, ox: 0, oy: 0 });
      over += VT.line("M " + (cx - 40) + " " + (cy + R1) + " L " + (cx - 40) + " " + (cy + R1 + 300), 10, "#6E767D", 0.7);
      over += VT.ell(cx - 10, cy + R1 + 250, 210, 120, "#1f2326", 0, { ox: 0, oy: 0 }) + VT.ell(cx - 150, cy + R1 + 175, 60, 42, "#1f2326", 0, { ox: 0, oy: 0 });
      over += '<path d="' + ring + '" fill="#3A3F44" fill-rule="evenodd"/>' + VT.ell(cx, cy, R0 + 16, R0 + 16, null, 8, { stroke: "#5A6168" }) + VT.ell(cx, cy, R1 - 18, R1 - 18, null, 5, { stroke: "#2A2E33" }) + VT.ell(cx, cy, R1, R1, null, 9) + VT.ell(cx, cy, R0, R0, null, 9);
      [[0.3, 0.4], [-0.5, 0.2], [0.55, -0.35]].forEach(function (p) { over += VT.dot(cx + p[0] * (R0 + R1) * 0.5 * 1.6, cy + p[1] * (R0 + R1) * 0.5 * 1.6, 7, "#2A2E33"); });
      over += VT.line("M " + (cx - R1 * 0.62) + " " + (cy - R1 * 0.55) + " A " + (R1 * 0.83) + " " + (R1 * 0.83) + " 0 0 1 " + (cx + R1 * 0.2) + " " + (cy - R1 * 0.82), 14, "#6E767D", 0.8);
      var sw = Math.sin(Math.round(t * 12) * 0.9) * 3;
      over += VT.line("M " + (cx - R1 * 0.7) + " " + (cy + R1 * 0.5) + " C " + (cx - R1 * 0.95) + " " + (cy + R1 * 0.75) + " " + (cx - R1 - 40 + sw) + " " + (cy + R1 * 0.95) + " " + (cx - R1 - 60 + sw) + " " + (cy + R1 + 60), 10, "#C9463A");
      over += VT.g("translate(" + (cx - R1 - 60 + sw) + " " + (cy + R1 + 60) + ") rotate(" + (8 + sw) + ")", VT.shape("M -80 0 L 80 -10 L 90 120 L -70 130 Z", "#B98A5A", { sw: 8 }) + VT.line("M -40 60 C -10 50 20 64 50 52", 6, VT.C.ink, 0.3));
    }
    return { cam: cam, world: world, over: over, tint: "warm" };
  });

  // ===== S2 · Wob nhìn thẳng người xem (giữ); "So was the street." biển phố rời cột, xoay, rơi nằm trên sỏi; Wob cúi nhìn =====
  var T_SIGN0 = T_SO + 0.02, T_LAND = T_STREET - 0.02;
  VT.sfx("drop", T_LAND, 0.7);
  var P0 = [1255 + 81, 800 - 330 + 34], P1 = [1175, 770];
  shot(B1, DUR, "nhìn người xem; biển phố rơi", function (t, lt, T) {
    var o = { s: WS, x: 905, y: GROUND, flip: 1, px: 0, py: 2, lid: 0.32, brows: "flat", mouth: "flat", noBlink: t < T_SIGN0 };
    var hk = [300, 300];
    o.armR = hk; o.handR = "nam";
    o.prop = VT.chumChia({ x: hk[0], y: hk[1] + 6, s: 0.85, kiruna: true, swing: Math.sin(Math.round(t * 12) * 0.7) * 3 * (1 - seg(t, B1, B1 + 1)) });
    var k = seg(t, T_SIGN0 + 0.08, T_LAND), fallen = t >= T_LAND, sign = "";
    if (t < T_SIGN0 + 0.08) {
      var wig = t >= T_SIGN0 ? Math.sin(Math.round(t * 24) * 2.2) * 6 : 0;
      sign = VT.g("translate(" + P0[0] + " " + P0[1] + ") rotate(" + VT.f(wig) + ")", VT.bienPho({ x: 0, y: 0, off: true }));
    } else if (!fallen) {
      var x = VT.lerp(P0[0], P1[0], k), y = VT.lerp(P0[1], P1[1], E.in2(k)) - 60 * Math.sin(Math.PI * k) * 0.6, rot = -400 * k;
      sign = VT.g("translate(" + VT.f(x) + " " + VT.f(y) + ") rotate(" + VT.f(rot) + ") scale(" + VT.f(VT.lerp(1, 1.1, k)) + " " + VT.f(VT.lerp(1, 0.5, k)) + ")", VT.bienPho({ x: 0, y: 0, off: true }));
    }
    if (t >= T_SIGN0) { o.noBlink = false; o.lid = 0.1; o.brows = "up"; o.px = 10; o.py = VT.lerp(-12, 12, E.io(k)); o.mouth = "oSmall"; }
    if (fallen) { o.px = 10; o.py = 14; o.lid = 0.38; o.brows = "flat"; o.mouth = "flat"; o.lean = key(t, [[T_LAND, 0], [T_LAND + 0.25, 5, "out"]]); }
    var out = bai(t, { sign: false, signLie: fallen }) + sign + W(t, o);
    if (fallen && t < T_LAND + 0.25) out += VT.puff({ x: P1[0] - 70, y: P1[1] + 6, s: 0.4 + (t - T_LAND) * 1.2, fill: "#C9C6BD" }) + VT.puff({ x: P1[0] + 80, y: P1[1] + 4, s: 0.35 + (t - T_LAND), fill: "#C9C6BD" });
    var face = VT.wobPt(o, 210, 175);
    var pull = E.io3(seg(T, T_SIGN0 - 0.06, T_SIGN0 + 0.4));
    var cx = VT.lerp(face[0], 1050, pull), cy = VT.lerp(face[1], 760, pull), z = VT.lerp(2.05 + 0.08 * seg(T, B1, T_SIGN0), 1.6, pull) + 0.06 * seg(T, T_SIGN0 + 0.4, DUR);
    var sh = VT.shake(T, T_LAND, 0.23, 6);
    return { cam: [cx, cy, z], shake: sh, world: out, tint: "warm" };
  });

  return shots;
};
