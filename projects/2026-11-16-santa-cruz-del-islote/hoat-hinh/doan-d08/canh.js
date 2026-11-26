/* d08 · vẽ tay · chèn (133,597–141,05 s; 7,453 s). Vào "chen", ra "giay". Hồi ức, không khẩu hình.
 * Leo thang ba lần: Wob lôi từ ba lô khổng lồ mở nắp một cái ô, một phao vịt, rồi một GHẾ NHỰA y hệt những chiếc ghế trước mọi cửa sau lưng
 * (mỗi món ≥ 0,9 s). Tấm biển "BRING LESS" treo trên tường. Rồi: Wob và ba lô ngồi hai đầu ghế nhựa dài, quay lưng vào nhau, Wob khoanh tay; giữ, phủ giấy.
 * Đồ Wob: mũ cói; ba lô khổng lồ dưới đất, nắp mở (nhịp 1), "ngồi" một đầu ghế (nhịp 2). Chữ duy nhất: BRING LESS.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var T_RULE = VT.tu("rule:"), T_LESS = VT.tu("less."), T_BRING2 = VT.tu("bring", 1), T_AGAIN = VT.tu("again."), T_BY = VT.nhip(1), T_BP = VT.tu("backpack"), T_SPK = VT.tu("speaking.");
  var G = 900, WX = 720, WS = 0.82, PX = 1010, PS = 0.78;
  var ITEMS = [{ t: T_RULE - 0.1, k: "o" }, { t: T_LESS - 0.05, k: "vit" }, { t: T_BRING2 - 0.02, k: "ghe" }];
  VT.sfx("pop", ITEMS[0].t + 0.02, 0.5);
  VT.sfx("boing", ITEMS[1].t + 0.02, 0.45);
  VT.sfx("pop", ITEMS[2].t + 0.02, 0.6);
  VT.sfx("im-lang", T_SPK + 0.45, 0.5);

  function wall() {
    var out = '<rect x="-1200" y="-1200" width="4320" height="' + (1200 + G) + '" fill="#F2E2B8"/>';
    var cols = ["#F2C6A0", "#9CC8DC", "#F4E3A1", "#E8A9A0", "#B8D8B0"];
    for (var i = 0; i < 9; i++) {
      var x0 = -700 + i * 420;
      out += VT.shape("M " + x0 + " 160 L " + (x0 + 420) + " 160 L " + (x0 + 420) + " " + G + " L " + x0 + " " + G + " Z", cols[i % 5], { sw: 6, ox: 0, oy: 0 });
      out += VT.shape("M " + (x0 + 150) + " " + G + " l 0 -260 l 120 0 l 0 260 Z", "#7A5A3C", { sw: 5 });
      out += VT.dot(x0 + 250, G - 130, 7, "#E8C25A");
      out += VT.shape("M " + (x0 + 40) + " 400 l 80 0 l 0 90 l -80 0 Z", "#3A4A52", { sw: 5 });
    }
    out += '<rect x="-1200" y="' + G + '" width="4320" height="1600" fill="' + M.cement + '"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    for (var j = 0; j < 30; j++) out += VT.line("M " + (-1100 + j * 150) + " " + (G + 40 + (j % 3) * 30) + " l 40 0", 4, INK(), 0.25);
    return out;
  }
  function INK() { return VT.C.ink; }
  function sign() {
    return VT.line("M 950 230 L 1000 330 M 1350 230 L 1300 330", 4) + VT.dot(950, 228, 8) + VT.dot(1350, 228, 8) +
      VT.shape("M 930 330 L 1370 330 L 1366 450 L 934 452 Z", "#FFFDF6", { sw: 7 }) + VT.text(1150, 414, "BRING LESS", 66, { fill: "#A8361F" });
  }
  function chairs(skip) {
    var out = "";
    [-490, -70, 350, 1610, 2030].forEach(function (x, i) { if (skip !== i) out += VT.gheNhua({ x: x + 40, y: G + 6, s: 0.62 }); });
    return out;
  }
  function W(o) {
    var b = { s: WS, x: WX, y: G, sunhat: "coi", noPack: true, t: o.t };
    for (var k in o) b[k] = o[k];
    if (b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.7, 0.2));
    return VT.wob(b);
  }
  function item(kind, x, y, s, rot) {
    if (kind === "o") return VT.umbrella({ x: x, y: y + 140 * s, s: s, rot: rot, open: 1 });
    if (kind === "vit") return VT.phaoVit({ x: x, y: y, s: s, rot: rot });
    return VT.gheNhua({ x: x, y: y + 160 * s, s: s, rot: rot });
  }

  var shots = [];
  shots.push({ a: 0, b: T_BY, ten: "lôi ô, phao vịt, ghế nhựa từ ba lô", ve: function (t, lt, T) {
    var out = wall() + sign() + chairs();
    var mouth = [PX, G - 340 * PS], cur = null, ci = -1;
    for (var i = 0; i < ITEMS.length; i++) if (t >= ITEMS[i].t - 0.3) { cur = ITEMS[i]; ci = i; }
    // đống đồ đã vứt bên trái
    if (t >= ITEMS[0].t + 0.95) out += VT.umbrella({ x: 470, y: G - 20, s: 0.55, rot: -78, open: 1 });
    if (t >= ITEMS[1].t + 0.95) out += VT.phaoVit({ x: 430, y: G - 40, s: 0.55, rot: -8 });
    out += VT.baLoKhongLo({ x: PX, y: G, s: PS, open: 1 });
    var o = { t: t, mouth: "content", px: 10, py: -6 };
    var held = "";
    if (cur) {
      var t0 = cur.t, last = ci === ITEMS.length - 1;
      if (t < t0) { o.armR = VT.wobLocal({ s: WS, x: WX, y: G }, mouth[0] - 20, mouth[1] + 30); o.handR = "nam"; o.py = 10; o.mouth = "flat"; }
      else {
        var up = VT.ease.back(seg(t, t0, t0 + 0.28)), toss = last ? 0 : seg(t, t0 + 0.8, t0 + 0.95);
        var hR = VT.wobPt({ s: WS, x: WX, y: G }, 288, 40), hL = VT.wobPt({ s: WS, x: WX, y: G }, 112, 40);
        var hold = cur.k === "ghe" ? [WX, hR[1] - 100] : cur.k === "o" ? [hR[0], hR[1] - 120] : [hR[0] + 50, hR[1] - 20];
        var hx = VT.lerp(mouth[0], hold[0], up), hy = VT.lerp(mouth[1] + 40, hold[1], up);
        if (toss > 0) { hx = VT.lerp(hold[0], 450, toss); hy = VT.lerp(hold[1], G - 60, toss) - 160 * Math.sin(Math.PI * toss); }
        held = item(cur.k, hx, hy, cur.k === "ghe" ? 0.62 : 0.7, toss * 200);
        if (toss <= 0) { o.armR = up > 0.5 ? [288, 40] : VT.wobLocal({ s: WS, x: WX, y: G }, hx, hy + 60); o.handR = "nam"; o.mouth = "smile"; o.eyes = "happy"; }
        if (last) {
          o.armL = up > 0.5 ? [112, 40] : [62, 300]; o.handL = "nam";
          if (t > T_AGAIN + 0.15) { o.eyes = null; o.mouth = "flat"; o.brows = "flat"; o.px = VT.pick(t, [[0, -12], [T_AGAIN + 0.7, 12], [T_AGAIN + 1.0, -12]]); o.py = 2; o.lid = 0.35; }
        }
      }
    }
    out += W(o) + held;
    if (ci >= 0 && t >= cur.t && t < cur.t + 0.25) out += VT.puffBurst({ x: mouth[0], y: mouth[1], k: seg(t, cur.t, cur.t + 0.45), s: 0.45, spread: 60 });
    var cam = key(T, [[0, [960, 620, 1.32]], [ITEMS[2].t, [980, 610, 1.38], "sine"], [T_AGAIN + 0.25, [980, 610, 1.38]], [T_AGAIN + 0.7, [900, 600, 1.08], "io3"], [T_BY, [900, 600, 1.1], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  shots.push({ a: T_BY, b: DUR, ten: "ghế dài: Wob và ba lô quay lưng", ve: function (t, lt, T) {
    var SEAT = 760, out = wall() + chairs(2);
    out += VT.shape("M 520 " + SEAT + " L 1400 " + SEAT + " L 1390 " + (SEAT + 40) + " L 530 " + (SEAT + 40) + " Z", "#F4F1EA", { sw: 7 });
    [580, 860, 1060, 1340].forEach(function (x) { out += VT.line("M " + x + " " + (SEAT + 40) + " L " + (x + (x < 960 ? -14 : 14)) + " " + G, 15) + VT.line("M " + x + " " + (SEAT + 40) + " L " + (x + (x < 960 ? -14 : 14)) + " " + G, 7, "#F4F1EA"); });
    var turn = t >= T_BP - 0.05;
    out += VT.baLoKhongLo({ x: 680, y: SEAT + 4, s: 0.66, side: true, sx: -1, rot: turn ? -3 : 0 });
    var o = { t: t, x: 1210, y: SEAT + 82 * WS, mouth: turn ? "frown" : "flat", brows: "down", px: 12, py: -4, armL: [222, 286], armR: [178, 286], handL: "tron", handR: "tron", lean: turn ? 5 : 0 };
    if (turn) { o.eyes = "closed"; }
    out += W(o);
    if (t >= T_SPK + 0.3) out += VT.dot(930, 560, 9) + VT.dot(960, 560, 9) + VT.dot(990, 560, 9);
    var cam = key(T, [[T_BY, [960, 690, 1.32]], [DUR, [960, 694, 1.4], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
