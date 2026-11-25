/* d32 · vẽ tay · chèn: ống nước rò, ngôi sao giấy, chìa khoá trao tay, ống hút dài cả trang (409,996–431,716 s; 21,72 s). Vào "chen", ra "cat".
 * Không vẽ bản đồ thật: "bản đồ bang" là một tấm giấy trơn có một ngôi sao (bản đồ chỉ vẽ bằng code ve_ban_do.mjs).
 * Hai bàn tay chung (không người cụ thể) trao chìa khoá. Chữ: "≈30–50%", "SA Water", "2026".
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ + cuộn cỏ xanh.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong;
  var T_PIPES = VT.tu("pipes", 0), T_30 = VT.tu("thirty", 0), T_PCT = VT.tu("percent", 0), T_COUNCIL = VT.tu("the", 1), T_ONLY = VT.tu("only", 0), T_WATER2 = VT.tu("water", 1), T_POWER = VT.tu("power", 0);
  var T_IN = VT.tu("in", 1), T_MOVING = VT.tu("moving", 0), T_SA = VT.tu("sa", 0), T_IMAG = VT.tu("imagine", 0), T_STRAW = VT.tu("straw", 0), T_LONG = VT.tu("long", 0);
  var S1 = T_COUNCIL - 0.1, S2 = T_IN - 0.1, S3 = T_IMAG - 0.1, T_PLUG = T_30 - 0.3, T_DRIP = T_LONG + 0.25;
  VT.sfx("drop", 0.4, 0.4); VT.sfx("drop", 1.6, 0.35); VT.sfx("drop", T_PLUG + 0.3, 0.45); VT.sfx("drop", T_PCT, 0.35);
  VT.sfx("pop", T_ONLY + 0.1, 0.5); VT.sfx("pop", T_WATER2, 0.4); VT.sfx("pop", T_POWER, 0.4);
  VT.sfx("whoosh", T_MOVING, 0.35); VT.sfx("bonk", T_SA - 0.05, 0.35);
  VT.sfx("nuot", T_STRAW + 0.2, 0.45); VT.sfx("drop", T_DRIP, 0.6);

  function W(o) { var b = { s: 0.85, sunhat: true, packColor: "oliu", grassRoll: true }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.7, 0.3)); return VT.wob(b); }
  var BG = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FBF6EA" opacity="0.65"/>';
  var HOLES = [460, 760, 1000, 1240];

  var shots = [];
  // 1. ống rò, vạch nước tụt giữa hai mốc, Wob bịt một lỗ, lỗ khác phụt
  shots.push({ a: 0, b: S1, ten: "ống rò, vạch nước tụt", ve: function (t, lt, T) {
    var out = BG + VT.shape("M 260 470 L 1380 470 L 1380 550 L 260 550 Z", "#9AA7AE", { sw: 7 });
    var plugged = t >= T_PLUG;
    HOLES.forEach(function (x, i) {
      var spurt = !(plugged && i === 1) || false, big = plugged && i === 2;
      if (!spurt) return;
      for (var j = 0; j < 3; j++) { var a = ((t * 1.4 + j * 0.33 + i * 0.21) % 1); out += VT.drop({ x: x + 40 * a * (i % 2 ? 1 : -1) * (big ? 2 : 1), y: 560 + 280 * a * a + (big ? -40 : 0), s: big ? 0.9 : 0.6 }); }
      if (big) out += VT.line("M " + x + " 550 C " + (x + 40) + " 620 " + (x + 120) + " 640 " + (x + 160) + " 700", 10, "#8fd0ea");
    });
    // vạch đo: ống thuỷ tinh đứng, hai mốc, mực nước tụt
    var lv = key(t, [[0, 0.95], [T_30, 0.62, "io"], [S1, 0.52, "sine"]]);
    out += VT.shape("M 1640 260 L 1720 260 L 1720 860 L 1640 860 Z", "#FFFDF6", { sw: 6 });
    out += '<rect x="1646" y="' + VT.f(860 - 600 * lv) + '" width="68" height="' + VT.f(600 * lv) + '" fill="#8fd0ea"/>';
    out += VT.line("M 1620 440 L 1740 440", 5, "#A8361F") + VT.line("M 1620 560 L 1740 560", 5, "#A8361F");
    if (t >= T_PIPES) out += VT.text(1610, 518, "≈30–50%", 54, { anchor: "end", fill: "#A8361F" });
    var wo = { t: t, x: 640, y: 980, px: 6, py: -10 };
    if (plugged) { wo.armR = VT.wobLocal(Object.assign({ s: 0.85 }, wo), 760, 560); wo.handR = "chi"; wo.eyes = t > T_PLUG + 0.3 ? "wide" : null; wo.mouth = "o"; wo.brows = "worried"; wo.px = 16; }
    else { wo.mouth = "flat"; wo.brows = "worried"; }
    out += W(wo);
    return { cam: key(T, [[0, [1000, 580, 1.0]], [T_30, [1080, 580, 1.08], "sine"], [S1, [1100, 580, 1.1]]]), world: out, tint: "warm" };
  } });
  // 2. tấm giấy trơn một ngôi sao; Wob gắn giọt nước và tia điện
  shots.push({ a: S1, b: S2, ten: "ngôi sao giấy duy nhất", ve: function (t, lt, T) {
    var out = BG + VT.shape("M 560 240 L 1360 220 L 1380 860 L 540 880 Z", "#EAD9B4", { sw: 6, ox: 6, oy: 6 });
    var star = "M 0 -70 L 20 -22 L 70 -20 L 30 12 L 44 64 L 0 34 L -44 64 L -30 12 L -70 -20 L -20 -22 Z";
    var sp = VT.ease.back(seg(t, T_ONLY - 0.1, T_ONLY + 0.2));
    if (sp > 0) out += VT.g("translate(1000 540) scale(" + VT.f(sp * 1.6) + ")", VT.shape(star, "#F6D36A", { sw: 6 }));
    // vòi nước + cột điện nhỏ chung một ổ khoá (một hội đồng tự lo cả hai)
    out += VT.line("M 700 800 L 700 680 L 780 680 L 780 705", 14, "#9AA7AE") + VT.line("M 1250 820 L 1250 600 M 1200 615 L 1300 615 M 1210 660 L 1290 660", 10, "#8E5527") + VT.dot(1205, 600, 9, "#9AD0E0") + VT.dot(1295, 600, 9, "#9AD0E0") + VT.dot(1215, 645, 9, "#9AD0E0") + VT.dot(1285, 645, 9, "#9AD0E0") + VT.line("M 1205 600 C 1150 560 1100 560 1060 590", 3, "#1f2326", 0.6);
    out += VT.line("M 700 760 C 800 840 1150 840 1250 760", 5, "#1f2326", 0.7) + VT.shape("M 950 800 L 1010 800 L 1010 850 L 950 850 Z", "#E8C25A", { sw: 5 }) + VT.line("M 960 800 C 960 770 1000 770 1000 800", 6);
    if (t >= T_WATER2) out += VT.drop({ x: 1170, y: 470, s: 1.8 });
    if (t >= T_POWER) out += VT.shape("M 1180 600 L 1150 680 L 1180 680 L 1150 760 L 1230 660 L 1195 660 L 1225 600 Z", "#F6C445", { sw: 5 });
    var wo = { t: t, x: 1560, y: 1000, mouth: "content", px: -14, flip: 1 };
    var tgt = t < T_POWER ? [1170, 470] : [1190, 680];
    if (t >= T_WATER2 - 0.4 && t < T_POWER + 0.4) { wo.armL = VT.wobLocal(Object.assign({ s: 0.85 }, wo), tgt[0] + 40, tgt[1]); wo.handL = "nam"; }
    out += W(wo);
    return { cam: key(T, [[S1, [1080, 560, 1.1]], [S2, [1100, 560, 1.15], "sine"]]), world: out, tint: "warm" };
  } });
  // 3. chìa khoá to có nhãn trao từ tay này sang tay kia; Wob đỡ hộ
  shots.push({ a: S2, b: S3, ten: "trao chìa khoá", ve: function (t, lt, T) {
    var k = seg(t, T_MOVING - 0.2, T_SA);
    var kx = VT.lerp(640, 1180, VT.ease.io(k)), ky = 470 - 60 * Math.sin(Math.PI * k);
    var out = BG + VT.shape("M 200 820 L 420 820 L 420 960 L 200 960 Z", "#FFFDF6", { sw: 5 }) + VT.text(310, 912, "2026", 60, { fill: "#2c4f6e" });
    out += VT.handGeneric({ x: 470, y: 480, s: 1, sleeve: "#6B8FA6" });
    out += VT.handGeneric({ x: 1500, y: 480, s: 1, sx: -1, sleeve: "#8E6FA6" });
    out += VT.bigKey({ x: kx, y: ky, s: 1, tag: "SA Water", tagSize: 54 });
    var wo = { t: t, x: kx + 60, y: 1000, mouth: "chatter", eyes: "squint", marks: "sweat" };
    wo.armL = VT.wobLocal(Object.assign({ s: 0.85 }, wo), kx + 20, ky + 180); wo.armR = VT.wobLocal(Object.assign({ s: 0.85 }, wo), kx + 200, ky + 20); wo.handL = "xoe"; wo.handR = "xoe";
    out += W(wo);
    return { cam: key(T, [[S2, [960, 600, 1.0]], [S3, [980, 600, 1.05], "sine"]]), world: out, tint: "warm" };
  } });
  // 4. bồn rửa, ống hút dài vắt qua cả trang, má hóp, chờ mãi mới có một giọt
  shots.push({ a: S3, b: DUR, ten: "ống hút dài cả trang", ve: function (t, lt, T) {
    var sink = VT.shape("M 160 800 L 860 800 L 820 1000 L 200 1000 Z", "#C9D2D6", { sw: 7 }) + VT.line("M 760 800 L 760 680 L 680 680", 12, "#9AA7AE");
    var out = BG;
    var suck = t >= T_STRAW - 0.3;
    var wo = { t: t, x: 470, y: 880, s: 0.8, flip: 1, mouth: suck ? "oSmall" : "content", eyes: suck ? "closed" : null, sxRaw: suck ? 0.9 : null, sq: suck ? 1.05 : 1, armR: [330, 300] };
    out += W(wo) + sink + VT.line("M 476 752 C 900 680 1400 640 2600 560", 10, "#E85D45") + VT.line("M 476 752 C 900 680 1400 640 2600 560", 3, "#FFFDF6", 0.8);
    if (t >= T_DRIP) { var k = seg(t, T_DRIP, T_DRIP + 0.4); out += VT.drop({ x: 500, y: 735 - 20 * k, s: 0.6 }); }
    var cam = key(T, [[S3, [1400, 600, 0.8]], [T_STRAW, [900, 660, 1.0], "io3"], [T_DRIP - 0.2, [600, 730, 1.6], "io"], [DUR, [600, 730, 1.68], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
