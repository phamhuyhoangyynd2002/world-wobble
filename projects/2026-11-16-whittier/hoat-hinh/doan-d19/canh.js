/* d19 · vẽ tay · cột nước ~5 m cạnh căn nhà hai tầng (11,44 s). Vào "chen", ra "cat".
 * Đồ: áo mưa vàng, ba lô ô liu cuộn thảm đỏ, phao bơi tròn. Chữ: "~5 m · ~16 ft" trên tấm bảng đo.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, G = 900, WS = 0.5;
  var HX = 700, HW = 460, HTOP = G - 520, RIDGE = G - 760;      // nhà hai tầng: thân 520, nóc 760
  var CX = 1130, CW = 230;                                       // cột nước
  var T_RAIN = VT.tu("rain"), T_FIVE = VT.tu("five"), T_FEET = VT.tu("feet."), T_IF = VT.tu("If"), T_TALL = VT.tu("tall"), T_HOUSE = VT.tu("house.");
  var T_UP0 = T_RAIN + 0.6, T_UP1 = T_HOUSE + 0.1;               // nước dâng từ "rain" tới "house"
  function level(t) { return key(t, [[0, 0], [T_UP0, 40], [T_FEET + 0.3, 430, "io"], [T_IF + 0.2, 470], [T_UP1, 760, "io"]]); }
  function W(t, o) {
    var b = { t: t, s: WS, raincoat: true, packColor: "oliu", flip: -1 };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.9, 0.4));
    return VT.wob(b);
  }
  function house2() {
    var s = VT.rectS(HX - HW / 2, HTOP, HX + HW / 2, G, "#C98F6A", { sw: 7 });
    s += VT.shape("M " + (HX - HW / 2 - 40) + " " + HTOP + " L " + HX + " " + RIDGE + " L " + (HX + HW / 2 + 40) + " " + HTOP + " Z", "#7A4A3A", { sw: 7 });
    [[-120, G - 420], [120, G - 420], [-120, G - 200]].forEach(function (w) { s += VT.rectS(HX + w[0] - 55, w[1], HX + w[0] + 55, w[1] + 110, VT.C.window, { sw: 5 }) + VT.line("M " + (HX + w[0]) + " " + w[1] + " L " + (HX + w[0]) + " " + (w[1] + 110), 4); });
    s += VT.rectS(HX + 70, G - 220, HX + 170, G, "#6B5A48", { sw: 6 });
    s += VT.line("M " + (HX - HW / 2) + " " + (G - 260) + " L " + (HX + HW / 2) + " " + (G - 260), 4, VT.C.ink, 0.5);
    return s;
  }
  function world(t) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#B6C1C4"/>' + VT.ridge(620, 0);
    s += '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="#6F7B80"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    s += house2();
    // ống kính trong suốt chứa nước + cột nước
    var h = level(t);
    s += VT.waterColumn({ x: CX, y: G, w: CW, h: h, t: t });
    s += VT.line("M " + (CX - CW / 2 - 6) + " " + G + " L " + (CX - CW / 2 - 6) + " " + (RIDGE - 40), 5, VT.C.ink, 0.55) + VT.line("M " + (CX + CW / 2 + 6) + " " + G + " L " + (CX + CW / 2 + 6) + " " + (RIDGE - 40), 5, VT.C.ink, 0.55);
    // bảng đo: cột mốc + tấm bảng có chữ, hiện ở "five"
    var kb = seg(t, T_FIVE - 0.05, T_FIVE + 0.2);
    if (kb > 0) {
      s += VT.line("M 1420 " + G + " L 1420 " + (RIDGE + 10), 8);
      for (var i = 0; i <= 10; i++) s += VT.line("M 1420 " + (G - i * 76) + " L " + (1420 - (i % 5 ? 22 : 40)) + " " + (G - i * 76), 5);
      var by = RIDGE + 150, sc = VT.ease.back(kb);   // bảng hạ 130 px: tránh logo kênh góc phải trên (x 1505–1822, y 55–130)
      s += VT.g("translate(1420 " + by + ") scale(" + VT.f(sc) + ")", VT.rectS(-10, -60, 420, 40, "#FFFDF6", { sw: 6 }) + VT.text(205, 10, "~5 m · ~16 ft", 64, { fill: "#2c4f6e" }));
      s += VT.line("M " + (CX + CW / 2 + 10) + " " + RIDGE + " L 1360 " + RIDGE + " L 1400 " + (by - 10), 4, "#2c4f6e", 0.8 * kb);
    }
    return s;
  }
  function wobOnTop(t, extra) {
    var h = level(t), bobv = Math.sin(VT.twos(t) * 5) * 6, y = G - h + 30 + bobv;
    var o = { s: WS, x: CX, y: y, legs: "tuck", flip: -1 };
    for (var k in extra) o[k] = extra[k];
    var ring = VT.wobPt(o, 200, 300);
    var out = VT.floatRing({ x: ring[0], y: ring[1], s: 0.95, part: "back" }) + W(t, o) + VT.floatRing({ x: ring[0], y: ring[1], s: 0.95, part: "front" });
    if (h > 60) out += VT.puff({ x: CX - 90, y: G - h + 6, s: 0.4, op: 0.6 }) + VT.puff({ x: CX + 90, y: G - h + 6, s: 0.35, op: 0.6 });
    return out;
  }
  function rainOver(t, n) { return VT.rain(t, n, [-200, -200, 2120, 1180], { slant: 25, speed: 1600, len: 70, sw: 4, col: "#4f6f86", op: 0.55 }); }

  VT.sfx("rise", T_UP0, 0.55);
  VT.sfx("ting", T_FIVE, 0.45);
  VT.sfx("rise", T_IF + 0.2, 0.45);
  VT.sfx("pop", T_HOUSE + 0.12, 0.5);

  var shots = [];
  // S0 · hình to: nhà hai tầng, ống rỗng, Wob đeo phao đứng dưới đáy ống nhìn lên mưa
  var B0 = T_FIVE - 0.25;
  shots.push({ a: 0, b: B0, ten: "nhà, ống, Wob đeo phao", ve: function (t, lt, T) {
    var o = { px: -6, py: -14, brows: "up", mouth: "oSmall" };
    if (t > T_UP0) { o.mouth = "o"; o.brows = "up"; o.py = 6; }
    var out = world(t) + wobOnTop(t, o);
    return { cam: [CX - 120, G - 260, key(T, [[0, 1.45], [B0, 1.52]])], world: out, over: rainOver(t, 50), tint: "cold" };
  } });
  // S1 · nước dâng, Wob bị nâng lên theo; camera ngước lên; bảng đo hiện "~5 m · ~16 ft"
  var B1 = T_IF + 0.1;
  shots.push({ a: B0, b: B1, ten: "nước dâng, bảng đo", ve: function (t, lt, T) {
    var o = { px: 10, py: -4, brows: "up", mouth: "content", arms: "shrug" };
    var out = world(t) + wobOnTop(t, o);
    var cy = key(T, [[B0, G - 380], [B1, G - 560, "io"]]);
    return { cam: [CX + 80, cy, key(T, [[B0, 1.15], [B1, 1.08]])], world: out, over: rainOver(t, 50), tint: "cold" };
  } });
  // S2 · toàn cảnh: cột nước cao bằng nóc nhà đúng "house"
  var B2 = T_HOUSE + 0.75;
  shots.push({ a: B1, b: B2, ten: "cột nước ngang nóc nhà", ve: function (t, lt, T) {
    var o = { px: -10, py: 0, brows: "flat", mouth: "smile", eyes: t > T_HOUSE ? "happy" : "open" };
    var wave = t > T_TALL ? Math.sin(VT.twos(t) * 14) : 0;
    o.armR = [370 + wave * 30, 40]; o.handR = "xoe";
    var out = world(t) + wobOnTop(t, o);
    if (t >= T_HOUSE + 0.1 && t < T_HOUSE + 0.4) out += VT.sparkle({ x: HX, y: RIDGE - 40, s: 0.8 }) + VT.sparkle({ x: CX, y: RIDGE - 60, s: 0.6 });
    return { cam: [980, key(T, [[B1, 470], [B2, 500]]), key(T, [[B1, 0.86], [B2, 0.9, "sine"]])], world: out, over: rainOver(t, 60), tint: "cold" };
  } });
  // S3 · cận Wob trên đỉnh cột vẫy tay, nhún trong phao; giữ hình
  shots.push({ a: B2, b: D.thoi_luong, ten: "Wob vẫy từ đỉnh cột", ve: function (t, lt, T) {
    var wave = Math.sin(VT.twos(t) * 12);
    var o = { px: 4, py: 8, brows: "up", mouth: "smile", armR: [380 + wave * 36, 30], handR: "xoe" };
    if (t > B2 + 0.9) { o.mouth = "content"; o.lid = 0.3; }
    var out = world(t) + wobOnTop(t, o);
    var top = G - level(t);
    return { cam: [CX + 340, top + 10, key(T, [[B2, 1.75], [D.thoi_luong, 1.86, "sine"]])], world: out, over: rainOver(t, 40), tint: "cold" };
  } });
  return shots;
};
