/* d06 · vẽ tay · chèn (91,574–96,434 s; 4,86 s). Vào "chen", ra "cat". Hồi ức tưởng tượng, không khẩu hình.
 * Bong bóng tưởng tượng: đảo kín nhà nhìn ngang; xe đồ chơi nổ máy, chạy qua ba căn nhà, lao khỏi mép đảo đúng "island", rơi tõm.
 * Đúng "fuel": cắt cận đồng hồ xăng dưới nước, kim chỉ ĐẦY, bong bóng nổi; đồng hồ KHÔNG chữ, KHÔNG số (chỉ vạch + biểu tượng cây xăng, không E/F).
 * Wob nhỏ ở góc trái dưới (ngoài viền mây): bịt mắt khi xe tới mép, rồi hé qua kẽ ngón ở cảnh đồng hồ. Mũ cói.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var T_A = VT.tu("a", 0), T_HERE = VT.tu("here"), T_ISL = VT.tu("island"), T_LONG = VT.tu("long"), T_FUEL = VT.nhip(1);
  var SEA = 690, IX = 900, IW = 620, EDGE = IX + IW / 2 + 10;
  var GO = T_A + 0.25, OFF = T_ISL + 0.02, SPL = T_LONG + 0.12;
  VT.sfx("may-no", T_A + 0.05, 0.4);
  VT.sfx("drop", SPL - 0.02, 0.6);

  function carPos(t) {
    if (t < GO) return { x: IX - IW / 2 + 90, y: SEA - 14, rot: 0, on: t >= T_A };
    if (t < OFF) { var k = VT.ease.in2(seg(t, GO, OFF)); return { x: VT.lerp(IX - IW / 2 + 90, EDGE, k), y: SEA - 14, rot: 0, on: true }; }
    var u = seg(t, OFF, SPL), x = VT.lerp(EDGE, EDGE + 230, u), y = SEA - 14 - 70 * Math.sin(Math.PI * u * 0.6) + 120 * u * u;
    return { x: x, y: Math.min(y, SEA + 40), rot: 55 * u, on: true, air: true };
  }
  // Wob ở góc (lớp over, ngoài viền mây)
  function wobCorner(t, mode) {
    var o = { t: t, x: 230, y: 1190, s: 0.86, sunhat: "coi", noPack: true, mouth: "wobbly", brows: "worried" };
    if (mode === "nhin") { o.mouth = "oSmall"; o.px = 12; o.py = -6; o.lid = VT.blink(t, 2.4, 0.3); }
    if (mode === "bit") { o.armL = [150, 150]; o.armR = [246, 150]; o.handL = "xoe"; o.handR = "xoe"; o.eyes = "closed"; }
    if (mode === "he") { o.armL = [150, 150]; o.armR = [258, 196]; o.handL = "xoe"; o.handR = "xoe"; o.px = 12; o.py = -8; }
    return VT.wob(o);
  }
  var shots = [];
  shots.push({ a: 0, b: T_FUEL, ten: "xe đồ chơi hết đảo, rơi tõm", ve: function (t, lt, T) {
    var p = carPos(t), out = '<rect x="-1200" y="-1200" width="4320" height="' + (1200 + SEA) + '" fill="#F7EED8"/>' + VT.cloud({ x: 560, y: 300, s: 0.7 });
    out += VT.daoNha({ x: IX, y: SEA, w: IW, seed: 23 });
    if (!p.air || p.y < SEA - 10) out += VT.car({ x: p.x, y: p.y, s: 0.22, rot: p.rot, color: "#D9543C", run: p.on ? t : null });
    out += VT.bien({ y: SEA, t: t, n: 16 });
    if (p.air && p.y >= SEA - 10 && t < SPL) out += VT.car({ x: p.x, y: p.y, s: 0.22, rot: p.rot, color: "#D9543C" });
    if (t >= SPL) {
      var k = seg(t, SPL, SPL + 0.7);
      out += VT.puffBurst({ x: EDGE + 230, y: SEA - 10, k: k, s: 0.9, spread: 110 });
      if (k < 1) [-1, 1].forEach(function (d, i) { out += VT.drop({ x: EDGE + 230 + d * 90 * k, y: SEA - 60 - 140 * Math.sin(Math.PI * k), s: 0.9, rot: d * 30 }); });
      for (var i = 0; i < 4; i++) { var q = ((t - SPL) * 0.9 + i * 0.27) % 1; out += VT.ell(EDGE + 220 + 18 * Math.sin(i * 2 + t * 4), SEA + 120 - 110 * q, 9 + 4 * i % 3, 9 + 4 * i % 3, "#DDF3F6", 3, { ox: 0, oy: 0 }); }
    }
    if (p.on && !p.air) out += VT.speedLines({ x0: p.x - 220, y0: SEA - 60, n: 3, gap: 22, len: 60, dx: -1, dy: 0, sw: 4 });
    var over = VT.dreamFrame(t, { inset: 56 }) + wobCorner(t, t < OFF - 0.25 ? "nhin" : "bit");
    var cam = key(T, [[0, [970, 600, 1.85]], [OFF, [1010, 606, 1.92], "sine"], [T_FUEL, [1120, 650, 2.06], "sine"]]);
    return { cam: cam, shake: VT.shake(t, SPL, 0.22, 5), world: out, over: over, tint: "warm" };
  } });
  shots.push({ a: T_FUEL, b: DUR, ten: "cận đồng hồ xăng dưới nước, kim đầy", ve: function (t, lt, T) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#4E9FA6"/>';
    [[300, 0.18], [900, 0.12], [1500, 0.16]].forEach(function (r) { out += '<path d="M ' + r[0] + ' -100 L ' + (r[0] + 160) + ' -100 L ' + (r[0] + 420) + ' 1200 L ' + (r[0] + 180) + ' 1200 Z" fill="#FFFDF6" opacity="' + r[1] + '"/>'; });
    out += VT.shape("M 560 280 C 700 180 1500 180 1640 280 L 1680 900 L 520 900 Z", "#B8452F", { sw: 8 });
    out += VT.shape("M 600 330 C 740 250 1460 250 1600 330 L 1600 400 L 600 400 Z", "#8E3426", { sw: 5 });
    out += VT.dongHoXang({ x: 1100, y: 590, s: 1.45, level: 1 });
    for (var i = 0; i < 7; i++) { var q = (lt * 0.8 + i / 7) % 1, x = 760 + i * 95 + 14 * Math.sin(i * 3 + lt * 6); out += VT.ell(x, 900 - 760 * q, 10 + (i % 3) * 6, 10 + (i % 3) * 6, "#DDF3F6", 4, { ox: 0, oy: 0 }); }
    var over = VT.dreamFrame(t, { inset: 56 }) + wobCorner(t, "he");
    var cam = key(T, [[T_FUEL, [1060, 580, 1.0]], [DUR, [1070, 582, 1.06], "sine"]]);
    return { cam: cam, world: out, over: over, tint: "cold" };
  } });
  return shots;
};
