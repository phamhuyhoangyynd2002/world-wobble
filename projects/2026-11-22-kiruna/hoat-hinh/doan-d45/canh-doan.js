/* d45 · vẽ tay chèn (671,258–677,646 s; 6,388 s). Vào "chen" (whoosh tự khai), ra "cat". Hồi ức tóm lại, không khẩu hình, không chữ.
 * A: hình to ngay khung đầu: lát cắt quả núi, hòn quặng (có hai chấm mắt) lóe sáng đúng "iron,"; Wob nhỏ đồ ở nhà đứng cạnh chìa tay giới thiệu.
 * B: toàn cảnh: hòn quặng trong núi kéo sợi dây buộc vào mép mặt đất; ở "pulling" dải đất dưới dãy nhà bị kéo trượt về phía núi, nhà chòng chành, nứt.
 * C: dãy nhà mọc chân que + tháp đồng hồ nhấc nhà thờ gỗ đỏ lên mái ở "picked up" như khiêng sô-pha, rồi bước sang phải.
 * D (gag): ở "kept going." cắt vào CẬN Wob đi cuối đoàn, gồng mình khiêng món nhỏ nhất: chiếc chong chóng gió; giữ tới cắt (≥ 0,6 s).
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var T_IRON = VT.tu("iron,"), T_PULL = VT.tu("pulling"), T_AWAY_E = VT.tu("away,", 0, "end"), T_PICK = VT.tu("picked"), T_UP_E = VT.tu("up", 0, "end"), T_KEPT = VT.tu("kept");
  var B0 = 1.55, C0 = 4.0, D0 = T_KEPT + 0.02, G = 860;
  VT.sfx("ting", T_IRON - 0.02, 0.45);
  VT.sfx("xuoc-dia", T_PULL - 0.04, 0.5);
  VT.sfx("rise", T_PICK - 0.05, 0.4);
  VT.sfx("bonk", D0 + 0.42, 0.25);

  function W(t, o) { var b = { s: 0.6, mua: "nha" }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }
  function nui(x, y, s, cut) { // quả núi xám; cut = lát cắt lộ vỉa quặng sẫm
    var out = VT.shape("M -520 0 C -420 -160 -300 -420 -140 -500 C -40 -560 60 -540 160 -470 C 300 -360 420 -150 520 0 Z", "#8C8F8A", { sw: 7, ox: 6, oy: 5 });
    out += VT.shape("M -170 -480 C -60 -560 60 -540 150 -480 C 90 -470 40 -440 -10 -455 C -60 -470 -110 -450 -170 -480 Z", "#F4F1EA", { sw: 5, ox: 2, oy: 2 });
    if (cut) out += VT.shape("M -260 0 C -220 -120 -150 -260 -40 -300 C 60 -330 150 -260 220 -140 C 250 -80 260 -30 270 0 Z", "#5B5E5A", { sw: 5, ox: 3, oy: 3 }) +
      VT.line("M -200 -60 C -100 -120 40 -150 200 -90", 4, "#3C3F3C", 0.6) + VT.line("M -150 -170 C -60 -210 40 -220 140 -190", 4, "#3C3F3C", 0.6);
    return VT.wrap({ x: x, y: y, s: s }, out);
  }
  function thapDongHo(o) { // tháp đồng hồ toà thị chính: gốc giữa chân, cao ~360; mặt đồng hồ không số
    var out = K.rect(-44, -300, 44, 0, "#B07A4A", { sw: 6, ox: 4, oy: 3 });
    for (var y = -280; y < -10; y += 26) out += VT.line("M -38 " + y + " L 38 " + y, 2.5, K.INK, 0.35);
    out += VT.ell(0, -250, 30, 30, "#FFFDF6", 5, { ox: 2, oy: 2 }) + VT.line("M 0 -250 L 0 -270 M 0 -250 L 14 -244", 4);
    out += VT.shape("M -58 -296 L 0 -380 L 58 -296 Z", M.mai, { sw: 6, ox: 4, oy: 3 }) + VT.line("M 0 -380 L 0 -410", 5);
    if (o.legs != null) { var p = o.legs * 2 * Math.PI, leg = ""; [-24, 24].forEach(function (x, i) { var a = Math.sin(p + i * Math.PI) * 14, lift = Math.max(0, Math.cos(p + i * Math.PI)) * 10; leg += VT.line("M " + x + " 0 L " + f(x + a) + " " + f(54 - lift), 7) + VT.ell(x + a + 8, 56 - lift, 14, 6, "#2b3134", 3); }); out = leg + out; }
    return VT.wrap(o, out);
  }
  var NHA = [["#D9A441", "#4A4A48"], ["#C9463A", "#3E3430"], ["#E8D9B0", "#4A4A48"], ["#7FA7B8", "#3E3430"]];
  function day(t, x0, dx, tilt, legs, lift) { // dãy 4 nhà + tháp, gốc chân từng nhà ở G
    var out = "", xs = [0, 230, 460, 760], st = Math.round(t * 12);
    xs.forEach(function (x, i) {
      var r = tilt ? tilt * Math.sin(st * 1.7 + i * 1.3) : 0, by = legs != null ? -54 : 0;
      out += VT.g("translate(" + f(x0 + dx + x) + " " + f(G + by) + ") rotate(" + f(r) + ")", K.nhaNho({ w: 190, h: 130, col: NHA[i][0], roof: NHA[i][1], legs: legs != null ? legs + i * 0.3 : null }));
    });
    out += VT.g("translate(" + f(x0 + dx + 610) + " " + f(G + (legs != null ? -54 : 0)) + ") rotate(" + f(tilt ? tilt * Math.sin(st * 1.5 + 9) : 0) + ")", thapDongHo({ legs: legs != null ? legs + 0.5 : null }));
    return out;
  }

  return [
    // A · hình to: lát cắt núi, hòn quặng lóe sáng ở "iron,"; Wob nhỏ giới thiệu
    { a: 0, b: B0, ten: "hon quang", ve: function (t, lt, T) {
      var s = K.troiHe() + K.doiXa(980, 0) + nui(900, 1000, 1.25, true) + K.coDat(1000, M.co);
      var pop = key(t, [[0, 0.92], [T_IRON - 0.04, 0.95], [T_IRON + 0.12, 1.12, "back"], [T_IRON + 0.4, 1.0, "out"]]), bob = 4 * Math.sin(Math.round(t * 12) * 0.9);
      s += K.honQuang({ x: 900, y: 760 + bob, r: 120, s: pop });
      if (t >= T_IRON) { var k = seg(t, T_IRON, T_IRON + 0.35); s += VT.sparkle({ x: 1080, y: 640, s: 0.9 * VT.ease.back(k), fill: "#FFF3C4" }) + VT.sparkle({ x: 740, y: 690, s: 0.55 * VT.ease.back(seg(t, T_IRON + 0.08, T_IRON + 0.4)), fill: "#FFF3C4" }); }
      var o = { x: 1330, y: 1000, flip: -1, arms: t > 0.3 ? "offer" : "rest", eyes: "happy", mouth: "content", brows: "up", lean: key(t, [[0, 0], [0.4, -8, "out"]]) };
      if (t >= T_IRON) { o.eyes = "wide"; o.mouth = "o"; o.marks = t < T_IRON + 0.3 ? "shock" : ""; }
      s += W(t, o);
      return { cam: [key(T, [[0, 1010], [B0, 1000]]), 780, key(T, [[0, 1.55], [B0, 1.62, "sine"]])], world: s };
    } },
    // B · hòn quặng trong núi kéo dây, dải đất dưới dãy nhà trượt về phía núi ở "pulling"
    { a: B0, b: C0, ten: "keo dat", ve: function (t, lt, T) {
      var s = K.troiHe() + K.doiXa(840, -200);
      var pull = key(t, [[T_PULL - 0.05, 0], [T_AWAY_E, 230, "io"]]), crack = seg(t, T_PULL, T_PULL + 0.3);
      s += K.rect(1840, G, 2600, 1500, M.co, { sw: 6, ox: 0, oy: 3 });
      s += K.rect(-300 - pull, G, 1880 - pull, 1500, "#A9C27C", { sw: 6, ox: 3, oy: 3 });
      for (var i = 0; i < 10; i++) s += VT.line("M " + f(-200 - pull + i * 210) + " " + (G + 60) + " l 40 0", 4, M.coToi, 0.7);
      if (crack > 0) s += VT.line("M " + f(1880 - pull + 4) + " " + G + " l -14 " + f(70 * crack) + " l 16 " + f(60 * crack) + " l -10 " + f(80 * crack), 6);
      if (pull > 20) s += VT.speedLines({ x0: 1900 - pull, y0: G + 140, n: 4, gap: 60, len: 140, dx: 1, sw: 6 });
      s += nui(260, G + 4, 0.95, true); // đất trượt vào dưới chân núi
      var oreX = 250, oreY = G - 120, tens = t >= T_PULL - 0.1, rx = 860 - pull;
      s += VT.line("M " + f(oreX + 70) + " " + f(oreY + 10) + (tens ? " L " : " Q " + f((oreX + rx) / 2 + 60) + " " + (G + 30) + " ") + f(rx) + " " + (G - 6), 7, "#8E5527") + VT.dot(rx, G - 6, 10, "#8E5527");
      s += K.honQuang({ x: oreX + (tens ? -10 * Math.abs(Math.sin(Math.round(t * 12))) : 0), y: oreY, r: 66, s: 1 }) + (tens ? VT.speedLines({ x0: oreX - 170, y0: oreY - 50, n: 3, gap: 50, len: 80, dx: 1, sw: 5 }) : "");
      s += day(t, 680, -pull, crack > 0 ? 6 * (1 - seg(t, T_AWAY_E, T_AWAY_E + 0.3)) + 2 : 0, null);
      s += K.nhaTho({ x: 1720 - pull, y: G, s: 0.42, th: 0 });
      return { cam: [key(T, [[B0, 1060], [C0, 1000, "sine"]]), 640, key(T, [[B0, 1.06], [C0, 1.0, "sine"]])], world: s, shake: VT.shake(T, T_PULL, 0.35, 5) };
    } },
    // C · nhà mọc chân, nhấc nhà thờ đỏ lên mái ở "picked up", khiêng sang phải
    { a: C0, b: D0, ten: "khieng nha tho", ve: function (t, lt, T) {
      var s = K.troiHe() + K.doiXa(840, 0) + nui(-200, G, 0.8, false) + K.coDat(G, M.co);
      var walk = Math.max(0, t - T_UP_E + 0.05), dx = walk * 360, legP = walk * 2.4, lift = seg(t, T_PICK - 0.02, T_UP_E + 0.04), st = Math.round(t * 12);
      var legsOn = t >= C0 + 0.05 ? legP : null;
      // nhà thờ: từ mặt đất (sau dãy nhà) nhấc lên đè trên mái, chòng chành theo bước
      var chY = VT.lerp(G - 40, G - 262, VT.ease.back(lift)), chR = lift >= 1 ? 3 * Math.sin(legP * 2 * Math.PI) : 0;
      if (lift >= 0.35) s += day(t, 520, dx, 0, legsOn);
      s += VT.g("translate(" + f(865 + dx) + " " + f(chY + (lift >= 1 ? 6 * Math.abs(Math.sin(legP * 2 * Math.PI)) : 0)) + ") rotate(" + f(chR) + ")", K.nhaTho({ s: 0.62, th: 0 }));
      if (lift < 0.35) s += day(t, 520, dx, 0, legsOn);
      if (lift >= 1) s += VT.speedLines({ x0: 360 + dx, y0: G - 300, n: 4, gap: 60, len: 120, dx: -1, sw: 6 });
      return { cam: [key(T, [[C0, 1000], [D0, 1080, "sine"]]), 620, key(T, [[C0, 1.0], [D0, 1.04]])], world: s };
    } },
    // D · CẬN Wob đi cuối đoàn, gồng mình khiêng chong chóng gió; giữ tới cắt
    { a: D0, b: DUR, ten: "chong chong", ve: function (t, lt, T) {
      var s = K.troiHe() + K.doiXa(860, -300) + K.coDat(G, M.co) + K.coLa(200, 1800, G + 40, 3);
      var walk = t - D0, ph = walk * 2.2, wx = 760 + walk * 90;
      // đuôi đoàn: chân que của nhà cuối và góc nhà thờ đang ra khỏi khung bên phải
      s += VT.g("translate(" + f(1280 + walk * 240) + " " + (G - 54) + ")", K.nhaNho({ w: 190, h: 130, col: NHA[0][0], roof: NHA[0][1], legs: ph * 1.1 + 0.2 }));
      var o = { x: wx, y: G, s: 0.95, legs: "walk", phase: ph, stride: 26, autoWalk: false, lean: 6, sq: 0.95 + 0.03 * Math.sin(ph * 4 * Math.PI), eyes: "squint", brows: "worried", mouth: "chatter", marks: "sweat", bob: -4 * Math.abs(Math.sin(ph * 2 * Math.PI)) };
      o.armL = [140, -30]; o.armR = [260, -30]; o.handL = "nam"; o.handR = "nam";
      var vane = K.chongChong({ s: 1.0 });
      var hp = VT.wobPt(o, 200, -50), wob = 4 * Math.sin(Math.round(t * 12) * 1.3);
      s += W(t, o);
      s += VT.g("translate(" + f(hp[0]) + " " + f(hp[1] - 10) + ") rotate(" + f(-4 + wob) + ")", VT.line("M 0 40 L 0 -10", 6) + vane);
      var wxT = 760 + (T - D0) * 90;
      return { cam: [wxT + 80, G - 250, key(T, [[D0, 1.85], [D0 + 0.2, 1.95, "out"], [DUR, 2.0]])], world: s };
    } },
  ];
};
