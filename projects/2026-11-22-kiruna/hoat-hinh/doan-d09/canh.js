/* d09 · vẽ tay · chèn: xe buýt tham quan vào mỏ (95,032–99,219 s tuyệt đối; 4,19 s). Vào "chen", ra "cat".
 * Hình to: xe buýt chạy vào cửa hầm trong lòng núi tuyết, Wob ngồi bên cửa kính đội mũ bảo hộ trắng quá to; trong hầm đèn vụt qua thành vệt.
 * Gag ("mountain"): xe xóc, mũ bảo hộ sụp che kín mắt; Wob KHÔNG đẩy lên, ngồi im trong tối, tỉnh bơ; giữ tới cắt.
 * Đồ Wob (mùa đông): áo phao xanh lam túi phải, khăn kem sọc xanh lá thông, ba lô ô liu (chùm chìa có chìa Kiruna móc quai), giày đỏ; MŨ BẢO HỘ thay mũ len.
 * Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, C = VT.C, f = VT.f;
  var T_MOUNT = VT.tu("mountain"), DUR = D.thoi_luong, GROUND = 860;
  var T_JOLT = T_MOUNT - 0.03;
  VT.sfx("bonk", T_JOLT, 0.7);

  function W(t, o) {
    var b = { t: t, puffer: true, scarf: "kem-xanh", packColor: "kiruna", keyRing: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.6, 0.5));
    return VT.wob(b);
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · ngoài trời: xe buýt chạy vào cửa hầm, Wob ở cửa kính đầu xe =====
  var B0 = 1.85, BS = 1.0;
  function busX(t) { return VT.lerp(260, 1080, E.out2(seg(t, 0, B0 + 0.4))); }
  shot(0, B0, "xe buýt vào cửa hầm", function (t, lt, T) {
    var bx = busX(t), by = GROUND + 4 + (Math.round(t * 12) % 3 === 0 ? -3 : 0);
    var s = VT.sky("#C7D8E4", 1) + VT.ridge(560, -200, "#E8F1F5") + VT.snowfall(t, 26, [-300, -100, 2300, 900], 0.6);
    s += VT.cuaHam({ x: 1560, y: GROUND, w: 380, mw: 1600, h: 640 });
    [-1, 1].forEach(function (sg) { s += VT.ell(1560 + sg * 230, GROUND - 330, 16, 16, "#FFE6A0", 5) + '<circle cx="' + (1560 + sg * 230) + '" cy="' + (GROUND - 330) + '" r="40" fill="#FFE6A0" opacity="0.35"/>'; });
    s += VT.snowGround(GROUND);
    var x0 = bx - 310 * BS;
    s += W(t, { s: 0.36 * BS / 0.85, x: x0 + 110 * BS + 10, y: by - 120 * BS, flip: 1, hardhat: { lamp: 1 }, eyes: "open", px: 10, py: -4, brows: "up", mouth: "content", legs: "tuck" });
    s += VT.xeBuyt({ x: bx, y: by, s: BS, run: 1, t: t, color: "#6E93A8" });
    s += VT.puff({ x: x0 - 30, y: by - 30, s: 0.4 + 0.1 * Math.sin(Math.round(t * 12)), fill: "#E8E4DA", op: 0.8 });
    return { cam: [VT.lerp(760, 1180, E.io(seg(T, 0, B0))), 640, 1.32 + 0.06 * seg(T, 0, B0)], world: s, tint: "cold" };
  });

  // ===== S1 · trong xe, trong hầm: đèn vụt qua thành vệt; "mountain" xe xóc, mũ sụp che mắt; Wob ngồi im tỉnh bơ =====
  shot(B0, DUR, "trong xe: mũ sụp che mắt", function (t, lt, T) {
    var s = VT.rectS(-1000, -1000, 3000, 2200, "#5E7F92", { sw: 0, ox: 0, oy: 0 });
    // khung cửa kính, ngoài là hầm tối, đèn vụt qua
    s += VT.rectS(420, 420, 1560, 860, "#1E2226", { sw: 0, ox: 0, oy: 0 });
    var st = Math.round(t * 12);
    for (var i = 0; i < 5; i++) {
      var ph = ((st * 0.11 + i * 0.37) % 1), x = 1700 - ph * 1500, w = 220;
      s += VT.line("M " + f(Math.max(430, x)) + " 640 L " + f(Math.min(1550, x + w)) + " 640", 18, "#FFE6A0", 0.9);
    }
    s += VT.line("M 420 790 L 1560 790", 5, "#3A3F44", 0.8);
    s += VT.shape("M 420 420 L 1560 420 L 1560 860 L 420 860 Z", null, { sw: 14 }) + VT.line("M 1300 420 L 1300 860", 10, "#6E93A8") + VT.line("M 1300 420 L 1300 860", 3, C.ink, 0.6);
    s += VT.rectS(-1000, 860, 3000, 960, "#4E6C7D", { sw: 5, ox: 0, oy: 0 });
    // ghế
    s += VT.shape("M 600 1500 L 600 830 C 600 760 1320 760 1320 830 L 1320 1500 Z", "#2F5D7C", { sw: 7 }) + VT.line("M 660 870 L 1260 870", 4, "#22465E");
    var jolt = seg(t, T_JOLT, T_JOLT + 0.35), bob = t >= T_JOLT ? -60 * Math.sin(Math.PI * Math.min(1, jolt * 1.6)) * (1 - jolt) : 0;
    var hatDy = t < T_JOLT ? 0 : key(t, [[T_JOLT, 0], [T_JOLT + 0.1, -26, "out"], [T_JOLT + 0.26, 80, "in2"], [T_JOLT + 0.36, 72, "out"]]);
    var dark = t >= T_JOLT + 0.26;
    var o = { s: 1.05, x: 960, y: 1240 + bob, flip: 1, legs: "tuck", hardhat: { dy: hatDy, lamp: !dark ? 1 : 0, rot: t >= T_JOLT ? key(t, [[T_JOLT, 0], [T_JOLT + 0.2, -6], [T_JOLT + 0.4, 2]]) : 0 },
      eyes: "open", px: 14, py: -6, brows: "up", mouth: "content", sq: t >= T_JOLT && jolt < 0.4 ? 1.06 : 1 };
    if (t < T_JOLT) { o.px = Math.round(t * 2) % 2 ? 14 : 6; }
    if (dark) { o.mouth = "flat"; o.noBlink = true; o.arms = "rest"; }
    s += W(t, o);
    var light = 0.5 + 0.5 * Math.sin(st * 1.3);
    s += '<rect x="-1000" y="-1000" width="4000" height="3000" fill="#FFE6A0" opacity="' + f(0.06 * light) + '"/>';
    var sh = VT.shake(T, T_JOLT, 0.25, 10);
    return { cam: [960, 900, 1.7 + 0.1 * seg(T, B0, DUR)], shake: sh, world: s, tint: "cold" };
  });

  return shots;
};
