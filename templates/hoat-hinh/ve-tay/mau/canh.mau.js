/* Mẫu canh.js cho phong cách ve-tay. Chép thành <doan-xx>/canh.js rồi sửa. Đọc templates/hoat-hinh/ve-tay/README.md.
 * Quy tắc: mọi mốc lấy từ VT.tu(...) hoặc D.nhip[i].tai; VT.sfx chỉ gọi ở thân CANH (không gọi trong ve).
 */
window.CANH = function (VT, D) {
  var key = VT.key, GROUND = 800, WS = 0.62;
  var T1 = D.nhip[1] ? D.nhip[1].tai : D.thoi_luong / 2;   // hoặc VT.tu("market")
  function W(t, o) {                                       // Wob mặc đồ theo D.trang_phuc của đoạn
    var b = { t: t, s: WS, beanie: true, scarf: true, cold: true };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 3.2, 0.7));
    return VT.wob(b);
  }
  function world(t) { return VT.sky() + VT.ridge(560, 0) + VT.farHouses(650, 0, t) + VT.fog(t, 640, 2) + VT.snowGround(GROUND); }

  var WK = { t0: 0, t1: T1, x0: 400, x1: 900, chuKy: 0.75, s: WS };
  VT.buoc(0, WK).steps.forEach(function (st) { VT.sfx("buoc-tuyet", st.t, 0.45); });

  return [
    { a: 0, b: T1, ten: "đi tới", ve: function (t, lt, T) {
      var wk = VT.buoc(t, WK);
      var o = { s: WS, x: wk.x, y: GROUND, legs: "walk", phase: wk.phase, stride: wk.stride, mouth: "content" };
      return { cam: [960, 540, 1], world: world(t) + W(t, o), tint: "cold" };
    } },
    { a: T1, b: D.thoi_luong, ten: "cận mặt, giữ hình", ve: function (t, lt, T) {
      var o = { s: WS, x: 900, y: GROUND, lid: 0.5, brows: "flat", mouth: "flat", noBlink: true };
      var c = VT.wobPt(o, 200, 170);
      return { cam: [c[0], c[1], key(T, [[T1, 2.6], [D.thoi_luong, 2.75, "sine"]])], world: world(t) + W(t, o), tint: "cold" };
    } },
  ];
};
