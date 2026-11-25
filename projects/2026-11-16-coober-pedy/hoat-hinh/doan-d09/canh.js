/* d09 · vẽ tay · chèn: bong bóng tưởng tượng bánh kem nhiều lớp (123,186–130,286 s; 7,1 s). Vào "chen", ra "cat".
 * "squeezed": ống bơm mứt chọc vào hông bánh, vệt mứt luồn giữa hai lớp. Wob với tay bẻ một miếng, cắn: răng gặp đá, mặt cứng đờ, giữ.
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ. Chữ: "sea rock" trên lớp bánh.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong;
  var T_SQ = VT.tu("squeezed", 0), T_SEA = VT.tu("sea", 0), T_OPAL = VT.tu("opal", 0), T_JAM = VT.tu("jam", 1);
  var S1 = T_SEA - 0.15, T_GRAB = T_SEA + 0.35, T_BITE = T_OPAL + 0.05;
  VT.sfx("pop", 0.02, 0.6);
  VT.sfx("drop", T_SQ - 0.02, 0.5);
  VT.sfx("bonk", T_BITE, 0.8);

  // bánh: gốc giữa đáy, rộng 520; jam 0..1 vệt mứt; bite: mất góc phải
  function cake(t, o) {
    var out = "", L = [["#C9A46A", 0], ["#E8D9B5", -90], ["#C9A46A", -180]];
    out += VT.shape("M -280 10 C -280 40 280 40 280 10 L 280 0 L -280 0 Z", "#FFFDF6", { sw: 6 });
    L.forEach(function (l, i) { out += VT.shape("M -250 " + l[1] + " L 250 " + l[1] + " L 250 " + (l[1] - 90) + " L -250 " + (l[1] - 90) + " Z", l[0], { sw: 6 }); });
    // lớp đá trầm tích: chấm sỏi
    for (var i = 0; i < 14; i++) out += VT.dot(-220 + 34 * i, -40 - 90 * (i % 3) - 20 * VT.hash(i), 5, "#8E7650");
    out += VT.text(0, -112, "sea rock", 46, { fill: "#2c4f6e" });
    var j = o.jam || 0;
    if (j > 0) out += VT.line("M 250 -180 L " + VT.f(250 - 480 * j) + " -180", 16, "#B4405C") + VT.line("M 250 -180 L " + VT.f(250 - 480 * j) + " -180", 5, "#F2A1C8");
    if (j > 0.3) for (var k = 0; k < 4; k++) out += VT.dot(200 - 110 * k, -180, 9, VT.OPAL_MAU[k]);
    out += VT.shape("M -260 -270 C -200 -320 200 -320 260 -270 L 250 -270 L -250 -270 Z", "#FFFDF6", { sw: 6 });
    if (o.bite) out += '<path d="M 252 -275 L 252 5 L 140 5 L 150 -275 Z" fill="#FBF6EA"/>' + VT.line("M 150 -275 L 140 5", 6);
    return VT.wrap(o, out);
  }
  function piping(t, k) { // ống bơm mứt chọc từ bên phải vào hông bánh
    if (k <= 0) return "";
    var x = VT.lerp(560, 300, VT.ease.out(k));
    return VT.g("translate(" + VT.f(x) + " -180)", VT.shape("M 0 0 L 60 -26 L 260 -70 L 260 70 L 60 26 Z", "#F2A1C8", { sw: 6 }) + VT.line("M 120 -30 L 120 30", 4, "#1f2326", 0.5));
  }
  function W(o) { var b = { s: 1, sunhat: true, packColor: "oliu" }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.5, 0.5)); return VT.wob(b); }
  var BG = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FBF6EA" opacity="0.6"/>';
  function bubble(t, inner, k) {
    var sc = VT.ease.back(VT.clamp(k, 0, 1));
    return VT.g("translate(1180 420) scale(" + VT.f(sc * 2.6) + ")", VT.shape(VT.smooth([[-140, 0], [-110, -80], [0, -104], [110, -80], [140, 0], [110, 80], [0, 100], [-110, 80]], true), "#FFFFFF", { sw: 3 })) +
      VT.ell(760, 700, 30, 22, "#ffffff", 5) + VT.ell(700, 770, 18, 14, "#ffffff", 4) + (sc > 0.6 ? inner : "");
  }

  var shots = [];
  shots.push({ a: 0, b: S1, ten: "bong bóng bánh kem, mứt bơm vào", ve: function (t, lt, T) {
    var wo = { t: t, x: 520, y: 1020, s: 0.9, px: 10, py: -14, brows: "up", mouth: t > T_SQ ? "o" : "content" };
    var jam = seg(t, T_SQ, T_SQ + 0.8);
    var inner = VT.g("translate(1180 560) scale(0.95)", cake(t, { jam: jam }) + piping(t, seg(t, T_SQ - 0.35, T_SQ)));
    var out = BG + W(wo) + bubble(t, inner, seg(t, 0, 0.3));
    return { cam: key(T, [[0, [1000, 540, 1]], [S1, [1040, 530, 1.06], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S1, b: DUR, ten: "bẻ miếng bánh, cắn: răng gặp đá", ve: function (t, lt, T) {
    var wo = { t: t, x: 760, y: 1060, s: 1.1 }, got = t >= T_GRAB + 0.3, bitten = t >= T_BITE;
    var piece = VT.shape("M 0 0 L 110 0 L 100 -280 L -10 -280 Z", "#C9A46A", { sw: 6 }) + VT.line("M -6 -180 L 104 -180", 14, "#B4405C") + VT.line("M -8 -90 L 106 -90", 5, "#1f2326", 0.6);
    var hand = key(t, [[S1, [330, 300]], [T_GRAB, [470, 60], "io"], [T_GRAB + 0.3, [470, 60]], [T_BITE - 0.25, [330, 250], "io"]]);
    wo.armR = hand; wo.handR = "nam";
    if (got) wo.propFront = VT.g(VT.tr(hand[0] - 70, hand[1] + 10, 0.45, -80), piece);
    if (!bitten) { wo.px = 14; wo.py = -10; wo.mouth = got ? "o" : "smile"; wo.eyes = got ? null : "happy"; }
    else { wo.eyes = "wide"; wo.mouth = "G"; wo.brows = "up"; wo.noBlink = true; wo.sq = key(t, [[T_BITE, 0.9], [T_BITE + 0.15, 1.04, "out"], [T_BITE + 0.3, 1]]); }
    var out = BG + bubble(t, VT.g("translate(1180 560) scale(0.95)", cake(t, { jam: 1, bite: got })), 1) + W(wo);
    if (bitten && t < T_BITE + 0.35) { var m = VT.wobPt(wo, 200, 234); out += VT.radialLines(m[0], m[1], 70, 130, 10, 3, 7); }
    var cam = key(T, [[S1, [960, 560, 1.05]], [T_BITE - 0.05, [880, 700, 1.6], "io3"], [T_BITE + 0.12, [860, 690, 1.9], "out"], [DUR, [860, 690, 1.95], "sine"]]);
    return { cam: cam, shake: VT.shake(t, T_BITE, 0.23, 8), world: out, tint: "warm" };
  } });
  return shots;
};
