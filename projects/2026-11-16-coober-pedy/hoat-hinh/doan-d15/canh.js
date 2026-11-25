/* d15 · vẽ tay · chèn: sơ đồ mặt cắt ngọn đồi, mũi tên nóng mệt dần (179,892–189,867 s; 9,975 s). Vào "chen", ra "cat".
 * Wob vẽ mặt cắt ngọn đồi lên không khí bằng ngón tay; mũi tên nóng đỏ đập vào mặt trên, xuống sâu thì chậm, nhạt, bé dần; ở đáy mũi tên bé xíu ngáp.
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, G = 960;
  var T_REASON = VT.tu("reason", 0), T_BRIL = VT.tu("brilliant", 0), T_A = VT.tu("a", 0), T_ROCK = VT.tu("rock", 0), T_HEAT = VT.tu("heat", 0);
  var T_UNDER = VT.tu("underground", 0), T_HARD = VT.tu("hardly", 0), T_MOVES = VT.tu("moves", 0);
  var S1 = T_A - 0.2, HX = 1180, HB = 900, HW = 1100, HH = 520;
  // mũi tên: [mốc, y0, y1, độ dày, độ mờ]
  var AR = [[T_ROCK - 0.1, 200, 420, 16, 1], [T_HEAT, 440, 560, 11, 0.8], [T_UNDER - 0.2, 590, 680, 7, 0.55], [T_HARD - 0.2, 710, 770, 4, 0.4]];
  AR.forEach(function (a, i) { VT.sfx("whoosh", a[0], 0.4 - i * 0.07); });
  VT.sfx("bonk", AR[0][0] + 0.35, 0.4);
  VT.sfx("im-lang", T_MOVES, 0.35);

  function W(o) { var b = { s: 0.9, sunhat: true, packColor: "oliu" }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.7, 0.2)); return VT.wob(b); }
  var BG = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FBF6EA" opacity="0.65"/>';
  var HILL = [], AIR = [];
  for (var i = 0; i <= 20; i++) { var u = i / 20; HILL.push([HX - HW / 2 + HW * u, HB - HH * Math.pow(Math.sin(Math.PI * u), 1.3)]); AIR.push([780 + 380 * u, 640 - 240 * Math.pow(Math.sin(Math.PI * u), 1.3)]); }

  var shots = [];
  shots.push({ a: 0, b: S1, ten: "Wob vẽ đồi lên không khí", ve: function (t, lt, T) {
    var k = seg(t, 0.9, T_BRIL + 0.3), tip = VT.alongPts(AIR, k);
    var wo = { t: t, x: 600, y: G, mouth: t < T_BRIL ? "content" : "smile", px: 12, py: -6 };
    wo.armR = k > 0 && k < 1 ? VT.wobLocal(Object.assign({ s: 0.9 }, wo), tip[0], tip[1]) : (t < 0.9 ? [300, 40] : [330, 280]);
    wo.handR = t < 0.9 || (k > 0 && k < 1) ? "chi" : "tron";
    var out = BG + VT.lineDraw(VT.smooth(AIR, false), k, 8, "#1f2326", { dash: true }) + W(wo);
    if (t < 0.9) out += VT.sparkle({ x: 760, y: 470, s: 0.5 });
    return { cam: key(T, [[0, [860, 620, 1.18]], [S1, [900, 600, 1.08], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S1, b: DUR, ten: "mũi tên nóng mệt dần, ngáp ở đáy", ve: function (t, lt, T) {
    var out = BG + VT.hillCut({ x: HX, y: HB, w: HW, h: HH }) + VT.line(VT.smooth(HILL, false), 8);
    // lòng đất dưới chân đồi
    out += VT.shape("M " + (HX - HW / 2 - 300) + " " + HB + " L " + (HX + HW / 2 + 300) + " " + HB + " L " + (HX + HW / 2 + 300) + " 1400 L " + (HX - HW / 2 - 300) + " 1400 Z", "#C99B6E", { sw: 6, ox: 0, oy: 0 });
    var sunk = VT.sunBig({ x: HX + 380, y: 120, r: 70, t: t });
    out = sunk + out;
    // mặt cắt: vẽ lớp đá sâu bên trong
    AR.forEach(function (a, i) {
      if (t < a[0]) return;
      var k = seg(t, a[0], a[0] + 0.6 + i * 0.25), y0 = a[1] + 140, y1 = a[2] + 140;
      out += '<g opacity="' + a[4] + '">' + VT.arrowWavy({ x0: HX, y0: y0, x1: HX, y1: y1, k: k, amp: 14 - i * 2, n: 3 - (i > 1 ? 1 : 0), sw: a[3], head: 12 + a[3] * 1.4, color: "#C8382A" }) + "</g>";
    });
    if (t >= AR[0][0] + 0.35 && t < AR[0][0] + 0.7) out += VT.radialLines(HX, HB - HH + 30, 40, 90, 9, 4, 5);
    // mũi tên bé ở đáy ngáp
    var last = AR[3], ty = last[2] + 140;
    if (t >= T_MOVES - 0.1) { var yawn = seg(t, T_MOVES - 0.1, T_MOVES + 0.5); out += VT.ell(HX + 40, ty - 34, 12 * yawn + 3, 18 * yawn + 3, "#1f2326", 0); out += VT.line("M " + (HX + 18) + " " + (ty - 64) + " q 9 7 16 0", 4) + VT.line("M " + (HX + 46) + " " + (ty - 64) + " q 9 7 16 0", 4);
      if (yawn > 0.6) out += VT.text ? VT.line("M " + (HX + 44) + " " + (ty - 70) + " l 14 -10 l -10 0 l 14 -10", 3, "#1f2326", 0.6) : ""; }
    var wo = { t: t, x: 380, y: G, s: 0.8, px: 14, py: VT.lerp(-4, 14, seg(t, S1, T_MOVES)), mouth: "content", arms: "point" };
    out += W(wo);
    var cam = key(T, [[S1, [1080, 560, 1.0]], [T_HEAT, [1140, 600, 1.12], "sine"], [T_HARD - 0.3, [1180, 860, 1.6], "io3"], [T_MOVES + 0.2, [1190, 880, 2.0], "io"], [DUR, [1190, 880, 2.05], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
