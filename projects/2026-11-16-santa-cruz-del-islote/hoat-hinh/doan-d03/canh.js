/* d03 · vẽ tay · chèn (39,2–48,525 s; 9,325 s). Vào "chen", ra "cat". Hồi ức, không khẩu hình.
 * Sửa 27/11/2026 (luật "không lộ đáp án sớm"): bỏ muỗi bay quanh mũ và muỗi xách va li (lộ đáp án ở 0:44).
 * 1) Hình to: hai mái nhà vẽ tay ép vào, Wob tự ép người dẹt như chen xe buýt, má phồng, mắt híp ("squeeze").
 * 2) Cận mặt Wob ghé sát ống kính, tay che miệng như kể bí mật ("The answer was very small.").
 * 3) Cận túi hông ba lô: bình xịt còn tem đỏ niêm phong lóe sáng ở "pocket"; nắp ba lô hé như ngoái lại. Không có muỗi.
 * 4) Toàn cảnh Wob trên thuyền: bong bóng ý nghĩ bật ra rương kho báu (gài cảnh 5); Wob gật gù tự tin ngay lúc lời nói "guessed wrong".
 * Đồ Wob: mũ cói (vành rơm, nét đan, dải xanh ngọc); ba lô khổng lồ trong thuyền.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var T_SQ = VT.tu("squeeze"), T_THE = VT.tu("the", 0), T_SMALL = VT.tu("small."), T_CLUE = VT.tu("clue"), T_POCKET = VT.tu("pocket"),
    T_WHOLE = VT.tu("whole"), T_AND = VT.tu("and"), T_GUESS = VT.tu("guessed"), T_WRONG = VT.tu("wrong.");
  var S1 = T_THE - 0.05, S2 = T_CLUE - 0.12, S3 = T_AND - 0.1;
  var SEA = 760, WX = 960, WY = 1004, WS = 0.9;
  var POP = T_GUESS - 0.12;
  VT.sfx("boing", T_SQ + 0.1, 0.35);
  VT.sfx("ting", T_POCKET + 0.05, 0.45);
  VT.sfx("pop", POP, 0.5);

  function sky() { return '<rect x="-1200" y="-1200" width="4320" height="' + (1200 + SEA) + '" fill="#F7EED8"/>' + VT.cloud({ x: 400, y: 260, s: 0.8 }) + VT.cloud({ x: 1500, y: 200, s: 0.6 }); }
  function mangroveIsland(x, y) {
    return VT.shape("M " + (x - 340) + " " + (y + 8) + " C " + (x - 260) + " " + (y - 26) + " " + (x + 260) + " " + (y - 26) + " " + (x + 340) + " " + (y + 8) + " Z", M.sand, { sw: 5 }) +
      VT.duoc({ x: x - 180, y: y, s: 0.62, seed: 2 }) + VT.duoc({ x: x + 10, y: y, s: 0.75, seed: 4 }) + VT.duoc({ x: x + 200, y: y, s: 0.58, seed: 7 });
  }
  function world(t) { return sky() + VT.daoNha({ x: 620, y: SEA, w: 660, seed: 11 }) + mangroveIsland(1500, SEA) + VT.bien({ y: SEA, t: t, n: 18 }); }
  function W(o) {
    var b = { s: WS, x: WX, y: WY, sunhat: "coi", noPack: true, t: o.t };
    for (var k in o) b[k] = o[k];
    if (b.eyes == null || b.eyes === "open") b.lid = Math.max(b.lid || 0, VT.blink(b.t, 3.1, 0.4));
    return VT.wob(b);
  }
  function boat(x, y, s, t) { return VT.thuyenCa({ x: x, y: y + 4 * Math.sin(Math.round(t * 12) * 0.5), s: s }); }

  var shots = [];
  // 1 · ép dẹt giữa hai mái nhà
  shots.push({ a: 0, b: S1, ten: "Wob ép dẹt giữa hai mái nhà", ve: function (t, lt, T) {
    var k = seg(t, T_SQ - 0.12, T_SQ + 0.2), sx = VT.lerp(1, 0.66, VT.ease.out(k)), sq = VT.lerp(1, 1.22, VT.ease.out(k));
    var o = { t: t, sxRaw: sx, sq: sq, eyes: k > 0.3 ? "squint" : "open", mouth: k > 0.3 ? "oSmall" : "content", px: 0, py: -4 };
    if (k > 0.3) { o.armL = [104, 306]; o.armR = [296, 306]; }
    if (k > 0.3) o.propFront = VT.ell(104, 196, 34, 28, "#e9806e", 4, { ox: 0, oy: 0 }) + VT.ell(296, 196, 34, 28, "#e9806e", 4, { ox: 0, oy: 0 });
    var edge = VT.lerp(300, 100 * sx * WS + 10, VT.ease.out(seg(t, T_SQ - 0.3, T_SQ + 0.2)));
    var house = function (x0, x1, col, roofTin) {
      return VT.shape("M " + x0 + " 640 L " + x1 + " 640 L " + x1 + " 1200 L " + x0 + " 1200 Z", col, { sw: 7 }) +
        VT.shape("M " + (x0 - 30) + " 650 L " + ((x0 + x1) / 2) + " 520 L " + (x1 + 30) + " 650 Z", roofTin ? "#A9B3B8" : "#C9603A", { sw: 7 }) +
        VT.shape("M " + ((x0 + x1) / 2 - 50) + " 760 l 100 0 l 0 90 l -100 0 Z", "#3A4A52", { sw: 5 });
    };
    var out = world(t) + W(o) + boat(WX, 1010, 1.1, t) +
      house(WX - edge - 360, WX - edge, "#F2C6A0", true) + house(WX + edge, WX + edge + 360, "#9CC8DC", false);
    if (k > 0 && k < 1) out += VT.speedLines({ x0: WX - edge - 120, y0: 700, n: 4, gap: 60, len: 80, dx: 1, dy: 0 }) + VT.speedLines({ x0: WX + edge + 40, y0: 700, n: 4, gap: 60, len: 80, dx: -1, dy: 0 });
    var cam = key(T, [[0, [960, 770, 1.85]], [S1, [960, 770, 1.95], "sine"]]);
    return { cam: cam, shake: VT.shake(t, T_SQ + 0.15, 0.25, 6), world: out, tint: "warm" };
  } });
  // 2 · Wob ghé sát ống kính, tay che miệng kể bí mật
  shots.push({ a: S1, b: S2, ten: "Wob ghé sát kể bí mật", ve: function (t, lt, T) {
    var k = VT.ease.out(seg(t, S1, S1 + 0.35));
    var o = { t: t, mouth: "smirk", brows: "skeptic", py: 2, px: 0, lean: -5 * k };
    o.armR = [VT.lerp(338, 262, k), VT.lerp(300, 226, k)]; o.handR = "xoe";
    if (t >= T_SMALL - 0.05) { o.lid = 0.55; o.brows = "skeptic"; o.mouth = "smirk"; }
    var out = world(t) + VT.baLoKhongLo({ x: WX + 250, y: 1040, s: 0.85 }) + W(o) + boat(WX, 1010, 1.1, t);
    var cam = key(T, [[S1, [960, 705, 2.3]], [T_SMALL, [968, 740, 2.8], "out"], [S2, [970, 742, 2.86], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 3 · cận túi hông ba lô: bình xịt niêm phong lóe sáng, nắp ba lô hé như ngoái lại
  shots.push({ a: S2, b: S3, ten: "bình xịt niêm phong lóe sáng", ve: function (t, lt, T) {
    var peek = VT.ease.io(seg(t, T_WHOLE - 0.1, T_WHOLE + 0.3)) * (1 - VT.ease.io(seg(t, S3 - 0.35, S3)));
    var bx = 1250, by = 1290, bs = 2.2;
    var out = world(t) +
      VT.shape("M -400 1250 L 2400 1250 L 2400 1600 L -400 1600 Z", "#B9875A", { sw: 7 }) +
      VT.line("M -400 1330 L 2400 1330", 4, VT.C.ink, 0.35) +
      VT.baLoKhongLo({ x: bx, y: by, s: bs, lidPeek: peek, noCan: true });
    // bình xịt cận: cắm cao hơn bản thường để thấy tem đỏ + nhãn, rồi vẽ lại mặt túi hông đè lên chân bình
    var can = [bx - 150 * bs, by - 120 * bs];
    out += VT.binhXit({ x: can[0], y: can[1], s: 0.9 * bs, rot: -8 }) +
      VT.g(VT.tr(bx, by, bs, 0), VT.shape(VT.rrect(-172, -150, -126, -30, 16), M.oliveDark, { sw: 5 }));
    var g = seg(t, T_POCKET - 0.05, T_POCKET + 0.55), gl = g > 0 && g < 1 ? Math.sin(Math.PI * g) : 0;
    if (gl > 0) out += VT.sparkle({ x: can[0] + 34, y: can[1] - 0.9 * bs * 120, s: 1.4 * gl }) + VT.sparkle({ x: can[0] - 46, y: can[1] - 0.9 * bs * 60, s: 0.7 * gl });
    var cam = key(T, [[S2, [980, 800, 1.2]], [S3, [940, 790, 1.34], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 4 · bong bóng rương kho báu, Wob gật gù tự tin
  shots.push({ a: S3, b: DUR, ten: "rương kho báu tưởng tượng, Wob tự tin", ve: function (t, lt, T) {
    var bx = 520, by = 1046, ws = 0.62;
    var p = seg(t, POP, POP + 0.3), ps = p <= 0 ? 0 : VT.ease.back(p);
    var nod = t > POP + 0.3 ? 4 * Math.sin(Math.round((t - POP) * 12) / 12 * 2 * Math.PI * 1.4) : 0;
    var o = { t: t, s: ws, x: bx, y: by - 26, mouth: t > POP ? "smirk" : "content", eyes: t > POP + 0.2 ? "happy" : "open", brows: t > POP ? "up" : "flat", px: 6, py: -8, bob: nod };
    var out = world(t) + VT.baLoKhongLo({ x: bx + 150, y: by - 40, s: 0.6 }) + W(o) + boat(bx, by, 0.85, t);
    if (ps > 0) {
      var chest = VT.ruong({ x: 0, y: 52, s: 0.7 }) + VT.ell(-48, 50, 16, 7, "#F6D36A", 3) + VT.ell(52, 52, 16, 7, "#F6D36A", 3) +
        VT.sparkle({ x: -62, y: -40, s: 0.42, fill: "#F6D36A" }) + VT.sparkle({ x: 66, y: -30, s: 0.32, fill: "#F6D36A" });
      out += VT.ell(bx + 120, by - 330, 11 * ps, 11 * ps, "#ffffff", 4) + VT.ell(bx + 165, by - 385, 17 * ps, 17 * ps, "#ffffff", 5);
      out += VT.bubble({ x: bx + 280, y: by - 470, s: 0.95 * ps, tail: -1, sym: chest });
    }
    var cam = key(T, [[S3, [660, 790, 1.62]], [DUR, [664, 786, 1.7], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
