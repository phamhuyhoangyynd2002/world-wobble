/* d17 · vẽ tay · chèn: bong bóng tưởng tượng hầm rượu (204,317–211,564 s; 7,247 s). Vào "chen", ra "giay".
 * Bong bóng bật: hầm rượu, chai nằm yên trên giá. Ngoài cửa hầm mặt trời và mặt trăng thay nhau gõ cửa; chai rượu ngủ ngáy.
 * "ignores": thôi gõ, giữ hình cửa đóng 0,8 s, rồi tờ giấy phủ (ra giay).
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong;
  var T_CELLAR2 = VT.tu("cellar", 1), T_IGN = VT.tu("ignores", 0);
  var S1 = T_CELLAR2 - 0.1, KN = [];
  for (var t0 = S1 + 0.3; t0 < T_IGN - 0.15; t0 += 0.42) KN.push(t0);
  VT.sfx("pop", 0.03, 0.6);
  KN.forEach(function (k, i) { VT.sfx("bonk", k, 0.45 - (i % 2) * 0.1); });
  VT.sfx("im-lang", T_IGN + 0.1, 0.3);

  function W(o) { var b = { s: 0.85, sunhat: true, packColor: "oliu" }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.5, 0.5)); return VT.wob(b); }
  var BG = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FBF6EA" opacity="0.65"/>';
  function bottle(x, y, t, i, sleep) { // chai nằm ngang, cổ sang phải; mắt nhắm, bong bóng ngáy
    var out = VT.shape("M -70 -24 L 30 -24 C 50 -24 54 -10 80 -10 L 104 -10 L 104 10 L 80 10 C 54 10 50 24 30 24 L -70 24 C -84 24 -84 -24 -70 -24 Z", "#3E6B4A", { sw: 5 });
    out += VT.shape("M -40 -18 L 10 -18 L 10 18 L -40 18 Z", "#EFE3C8", { sw: 3 });
    if (sleep) { out += VT.line("M -62 -4 q 6 6 12 0", 3, "#F6EEDC"); var b = ((t * 1.2 + i * 0.37) % 1); out += VT.ell(-50 - 10 * b, -40 - 40 * b, 6 + 10 * b, 6 + 10 * b, "#ffffff", 3, { op: VT.f(1 - b) }); }
    return VT.g("translate(" + x + " " + y + ")", out);
  }
  function cellar(t) {
    var out = VT.shape("M 300 300 L 1300 300 L 1300 900 L 300 900 Z", "#C9B79A", { sw: 7 });
    out += VT.shape("M 300 300 C 500 180 1100 180 1300 300 Z", "#A89474", { sw: 6 }); // vòm đá
    for (var r = 0; r < 3; r++) { var y = 470 + r * 150; out += VT.line("M 360 " + (y + 34) + " L 1180 " + (y + 34), 8, "#8E5527"); for (var c = 0; c < 4; c++) out += bottle(440 + c * 200, y, t, r * 4 + c, true); }
    return out;
  }
  function door(t, knock) {
    var out = VT.shape("M 1300 420 L 1440 420 L 1440 900 L 1300 900 Z", "#8E5527", { sw: 7 }) + VT.dot(1320, 680, 9, "#E8C25A");
    out += VT.shape("M 1440 900 L 3100 900 L 3100 1600 L 1440 1600 Z", "#E6CFA0", { sw: 6, ox: 0, oy: 0 }) + VT.shape("M -1200 900 L 1300 900 L 1300 1600 L -1200 1600 Z", "#A89474", { sw: 6, ox: 0, oy: 0 });
    return out;
  }

  var shots = [];
  shots.push({ a: 0, b: S1, ten: "bong bóng hầm rượu bật ra", ve: function (t, lt, T) {
    var k = VT.ease.back(seg(t, 0, 0.3));
    var wo = { t: t, x: 380, y: 1010, px: 12, py: -14, mouth: "content", brows: "up" };
    var out = BG + W(wo) + VT.ell(560, 760, 22, 16, "#ffffff", 5) + VT.ell(620, 690, 32, 24, "#ffffff", 5);
    out += VT.g("translate(1180 470) scale(" + VT.f(k * 0.62) + ") translate(-870 -600)", VT.shape(VT.smooth([[150, 600], [250, 220], [870, 120], [1500, 220], [1600, 600], [1500, 980], [870, 1080], [250, 980]], true), "#ffffff", { sw: 8 }) + cellar(t));
    return { cam: key(T, [[0, [1000, 560, 1]], [S1, [1050, 540, 1.05], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S1, b: DUR, ten: "mặt trời, mặt trăng gõ cửa; chai ngáy", ve: function (t, lt, T) {
    var out = BG + '<rect x="1440" y="-400" width="1600" height="1300" fill="#F7EED8"/>' + cellar(t) + door(t);
    var stop = t >= T_IGN - 0.1, idx = -1;
    for (var i = KN.length - 1; i >= 0; i--) if (t >= KN[i] - 0.15) { idx = i; break; }
    if (!stop && idx >= 0) {
      var kk = seg(t, KN[idx] - 0.15, KN[idx]), back = seg(t, KN[idx], KN[idx] + 0.2), bx = 1560 - 60 * kk + 60 * back;
      if (idx % 2 === 0) out += VT.sunBig({ x: bx + 40, y: 640, r: 80, t: t });
      else out += VT.g("translate(" + VT.f(bx + 40) + " 640)", VT.shape("M -60 -70 C 20 -80 60 0 20 70 C 60 30 70 -40 -60 -70 Z", "#F6EEDC", { sw: 6 }) + VT.dot(10, -10, 6));
      if (t >= KN[idx] && t < KN[idx] + 0.25) out += VT.knockLines({ x: 1450, y: 640, k: seg(t, KN[idx], KN[idx] + 0.25) });
    }
    var cam = key(T, [[S1, [980, 600, 1.05]], [T_IGN - 0.1, [1120, 620, 1.2], "sine"], [T_IGN + 0.15, [1250, 640, 1.42], "out"], [DUR, [1250, 640, 1.46], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
