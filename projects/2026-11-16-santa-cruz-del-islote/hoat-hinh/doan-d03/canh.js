/* d03 · vẽ tay · chèn (39,2–48,525 s; 9,325 s). Vào "chen", ra "cat". Hồi ức, không khẩu hình.
 * 1) Hình to: hai mái nhà vẽ tay ép vào, Wob tự ép người dẹt như chen xe buýt, má phồng, mắt híp ("squeeze").
 * 2) Cận đầu Wob: con muỗi bay ba vòng quanh vành mũ cói, mắt Wob đảo theo tới lác ở "buzzes".
 * 3) Toàn cảnh: muỗi xách va li tí hon bay từ đảo nhà sang đảo đước, không ngoái lại; cắt về đảo nhà yên lặng, giữ ≥ 0,6 s.
 * Đồ Wob: mũ cói (vành rơm, nét đan, dải xanh ngọc); ba lô khổng lồ trong thuyền (khuất dưới mép khung cận, thấy cuộn thảm + bình xịt ở cảnh toàn).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var T_SQ = VT.tu("squeeze"), T_THE = VT.tu("the", 0), T_SMALL = VT.tu("small,"), T_BUZZ = VT.tu("buzzes."), T_AS = VT.tu("as"), T_DIDNT = VT.tu("didn't.");
  var S1 = T_THE - 0.05, S2 = T_AS - 0.08, S3 = T_DIDNT - 0.12;
  var SEA = 760, WX = 960, WY = 1004, WS = 0.9;
  var ORB0 = S1 + 0.45, ORB1 = T_BUZZ + 0.05;
  VT.sfx("boing", T_SQ + 0.1, 0.35);
  VT.sfx("muoi", S1 + 0.15, 0.6);
  VT.sfx("muoi", S2 + 0.2, 0.4);

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
  // 2 · muỗi bay ba vòng quanh vành mũ, mắt Wob lác
  shots.push({ a: S1, b: S2, ten: "muỗi ba vòng quanh vành mũ", ve: function (t, lt, T) {
    var o = { t: t, mouth: "content", py: -6 };
    var hc = VT.wobPt({ s: WS, x: WX, y: WY }, 200, 74), rx = 215, ry = 56;
    var mx, my, behind = false, sx = -1;
    if (t < ORB0) { var e = VT.ease.out(seg(t, S1, ORB0)); mx = VT.lerp(WX + 620, hc[0] + rx, e); my = VT.lerp(hc[1] - 160, hc[1], e); }
    else if (t < ORB1) {
      var th = 2 * Math.PI * 3 * VT.ease.io(seg(t, ORB0, ORB1));
      mx = hc[0] + rx * Math.cos(th); my = hc[1] - 6 + ry * Math.sin(th) - 14 * Math.sin(th * 2);
      behind = Math.sin(th) < 0; sx = Math.sin(th) > 0 ? -1 : 1;
    } else { var e2 = VT.ease.out(seg(t, ORB1, ORB1 + 0.35)); var nose = VT.wobPt({ s: WS, x: WX, y: WY }, 200, 196); mx = VT.lerp(hc[0] + rx, nose[0] + 40, e2); my = VT.lerp(hc[1], nose[1] - 6, e2); sx = -1; }
    var head = VT.wobPt({ s: WS, x: WX, y: WY }, 200, 156);
    o.px = VT.clamp((mx - head[0]) / 14, -12, 12); o.py = VT.clamp((my - head[1]) / 10, -14, 10);
    if (t >= T_BUZZ - 0.08) { o.eyes = "cross"; o.mouth = "wobbly"; o.brows = "worried"; }
    else if (t >= T_SMALL) o.brows = "up";
    var mq = VT.muoi({ x: mx, y: my, s: 0.85, sx: sx, t: t });
    var out = world(t) + VT.baLoKhongLo({ x: WX + 250, y: 1040, s: 0.85 }) + (behind ? mq : "") + W(o) + boat(WX, 1010, 1.1, t) + (behind ? "" : mq);
    if (t >= ORB0 && t < ORB1) out += VT.arc([[mx - (sx < 0 ? -50 : 50), my + 6], [mx - (sx < 0 ? -90 : 90), my + 10]], 4, 0.5);
    var cam = key(T, [[S1, [960, 690, 2.05]], [T_BUZZ, [960, 700, 2.2], "sine"], [S2, [960, 704, 2.28], "out"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 3 · muỗi xách va li dọn sang đảo đước
  var FLY0 = S2 + 0.1, FLY1 = S3 - 0.45;
  shots.push({ a: S2, b: S3, ten: "muỗi xách va li dọn đi", ve: function (t, lt, T) {
    var k = seg(t, FLY0, FLY1), mx = VT.lerp(700, 1510, VT.ease.sine(k)), my = 600 - 40 * Math.sin(Math.PI * k) + 8 * Math.sin(t * 9);
    var land = seg(t, FLY1, FLY1 + 0.25);
    var bx = 520, by = 1046, ws = 0.62;
    var o = { t: t, s: ws, x: bx, y: by - 26, mouth: "flat", brows: "flat", px: VT.clamp((mx - bx) / 60, -12, 12), py: -10 };
    var out = world(t) + VT.baLoKhongLo({ x: bx + 150, y: by - 40, s: 0.6 }) + W(o) + boat(bx, by, 0.85, t);
    if (land < 1) out += VT.muoi({ x: mx, y: my + 50 * land, s: 1.15 * (1 - 0.5 * land), t: t, suitcase: true });
    var cam = key(T, [[S2, [1080, 700, 1.22]], [S3, [1080, 700, 1.27], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 4 · đảo nhà yên lặng
  shots.push({ a: S3, b: DUR, ten: "đảo nhà yên lặng, giữ", ve: function (t, lt, T) {
    var bx = 520, by = 1046, ws = 0.62;
    var o = { t: t, s: ws, x: bx, y: by - 26, mouth: "content", eyes: "happy", noBlink: true };
    var out = world(t) + VT.baLoKhongLo({ x: bx + 150, y: by - 40, s: 0.6 }) + W(o) + boat(bx, by, 0.85, t);
    var cam = key(T, [[S3, [640, 740, 1.6]], [DUR, [644, 738, 1.68], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
