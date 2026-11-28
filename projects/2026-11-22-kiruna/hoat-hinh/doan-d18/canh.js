/* d18 · vẽ tay · chèn: bong bóng tưởng tượng "cửa hàng đóng băng" (228,45–232,723 s tuyệt đối; 4,27 s). Vào "chen", ra "cat".
 * Hình to ngay khung đầu: cửa hàng nhỏ, cửa trước đóng băng, cột băng rủ từ mái; hàng hòn quặng tí hon xách giỏ đứng chờ, tuyết trên đầu;
 * Wob nắm tay nắm cửa kéo. Đúng "shut": tay nắm gãy rời trong tay Wob (còn dính cột băng), cửa vẫn đóng; cắt vào CẬN tay nắm, Wob nhìn người xem; giữ tới cắt.
 * Đồ Wob: áo phao xanh lam túi phải, mũ len xanh lá thông bông kem, khăn kem sọc xanh lá thông, ba lô ô liu, giày đỏ. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, C = VT.C, f = VT.f;
  var DUR = D.thoi_luong, GROUND = 900, WS = 0.78;
  var T_SHOP = VT.tu("shop"), T_DOOR = VT.tu("door"), T_FREEZE = VT.tu("freezes"), T_SHUT = VT.tu("shut");
  VT.sfx("tach-bang", T_SHUT, 0.8);
  var SHOP = { x: 700, y: GROUND, w: 560, h: 400 }, HANDLE = [SHOP.x + 84, SHOP.y - 150];

  function W(t, o) {
    var b = { t: t, s: WS, puffer: true, beanie: "thong", scarf: "kem-xanh", packColor: "kiruna", keyRing: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.6, 0.9));
    return VT.wob(b);
  }
  function scene(t, broken) {
    var s = VT.rectS(-1400, -1400, 3300, GROUND, "#DCE8EE", { sw: 0, ox: 0, oy: 0 });
    s += VT.snowfall(t, 22, [-200, -100, 2200, 900], 0.5);
    s += VT.cuaHang({ x: SHOP.x, y: SHOP.y, w: SHOP.w, h: SHOP.h, frozen: 1, handle: !broken, t: t });
    s += VT.snowGround(GROUND);
    [[1250, 1, 3], [1365, 0.9, 7], [1475, 1.05, 2], [1585, 0.95, 9]].forEach(function (q, i) {
      var bob = Math.round(t * 12 + i * 3) % 6 < 3 ? 0 : 2;
      s += VT.quangTiHon({ x: q[0], y: GROUND, s: q[1] * 1.15, look: -1, snow: 1, seed: q[2], bob: bob, eyes: broken && t > T_SHUT + 0.2 ? "open" : (i === 1 && Math.round(t * 12) % 40 < 2 ? "closed" : "open") });
    });
    return s;
  }
  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · hình to: Wob nắm tay nắm kéo, cửa không nhúc nhích =====
  var B0 = T_SHUT;
  shot(0, B0, "cửa đóng băng, Wob kéo", function (t, lt, T) {
    var pull = E.io(seg(t, T_SHOP + 0.2, T_FREEZE + 0.2));
    var tug = t > T_FREEZE ? 4 * Math.abs(Math.sin(Math.round(t * 12) * 1.3)) : 0;
    var o = { s: WS, x: 1030 + 12 * pull, y: GROUND, flip: -1, lean: 14 * pull + tug, px: -16, py: 0, brows: pull > 0.3 ? "down" : "flat", mouth: pull > 0.3 ? "flat" : "content", legs: pull > 0.3 ? "apart" : "stand" };
    if (pull > 0.5) o.eyes = "squint";
    o.armR = VT.wobLocal(o, HANDLE[0] + 6, HANDLE[1]); o.handR = "nam";
    var s = scene(t, false) + W(t, o);
    if (t > T_FREEZE) s += VT.speedLines({ x0: o.x + 110, y0: GROUND - 260, n: 3, gap: 50, len: 50, dx: 1, sw: 5 });
    return { cam: [1000, 680, 1.36 + 0.06 * seg(T, 0, B0)], world: s, over: VT.dreamFrame(t), tint: null };
  });

  // ===== S1 · "shut": tay nắm gãy rời; cắt vào CẬN tay nắm trong tay Wob; Wob nhìn người xem; giữ =====
  shot(B0, DUR, "cận tay nắm gãy", function (t, lt, T) {
    var k = seg(t, T_SHUT, T_SHUT + 0.3);
    var o = { s: WS, x: VT.lerp(1040, 1070, E.out(k)), y: GROUND, flip: -1, lean: VT.lerp(-6, 2, E.out(k)), px: 0, py: 0, brows: "flat", mouth: "flat", eyes: "open", noBlink: true, legs: "apart" };
    var hand = VT.wobPt(o, 330, 190);
    o.armR = VT.wobLocal(o, hand[0], hand[1]); o.handR = "nam";
    var s = scene(t, true) + W(t, o);
    s += VT.tayNam({ x: hand[0] - 58, y: hand[1] + 4, s: 1.3, rot: -6 });
    if (k < 1) s += VT.impact({ x: hand[0] - 70, y: hand[1] - 4, s: 0.5 * (1 - k) });
    var c = VT.wobPt({ s: WS, x: o.x, y: o.y, flip: -1 }, 230, 190);
    return { cam: [(hand[0] - 40 + c[0]) / 2, (hand[1] + c[1]) / 2 + 10, 2.7 + 0.05 * seg(T, B0, DUR)], shake: VT.shake(T, T_SHUT, 0.2, 6), world: s, over: VT.dreamFrame(t), tint: null };
  });

  return shots;
};
