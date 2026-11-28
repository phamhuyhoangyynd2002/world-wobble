/* d29 · vẽ tay (417,16–437,836 s; 20,676 s). Vào "cat", ra "cat". Hồi ức tháng 8, không khẩu hình.
 * Bong bóng tưởng tượng (viền mây): xe tải dọn nhà chở NGUYÊN một dãy phố (nhà, cây thông, cột đèn); Wob ngồi trên nóc cabin giữ chặt chùm chìa;
 * ở "street is moving too" xe chui qua cầu: cây thông cúi rạp đầu, Wob (đã qua cầu rồi) cũng cúi rạp theo, rồi cả hai cùng ngẩng lên;
 * ở "paying" tháp giếng mỏ tí hon thả một đồng xu theo dây cáp xuống bàn tay chung của bác tài (không mặt).
 * Sơ đồ: ngã ba với hai biển hình (ngôi nhà / đồng xu) → hai ngôi nhà giống hệt, dấu "=", Wob đảo chỗ như trò úp cốc rồi nhún vai →
 * cân đĩa: nhà giấy / chồng tiền, thêm một phần tư chồng ở "plus" (ka-ching), thẻ "market value +25%" → Wob đặt chùm chìa lên đĩa ở "key ring" →
 * cận mặt cân: kim nhích tới vạch hình trái tim nhỏ ở "sentimental."; Wob lấy chùm chìa lại ôm vào lòng; giữ. Không cờ hộp thư.
 * Chữ: chỉ "=" và "market value +25%". Mặt cân chỉ có vạch và một trái tim (không chữ, không số).
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var T_STREET = VT.tu("street"), T_TOO_E = VT.tu("too,", 0, "end"), T_PAY = VT.tu("paying"), T_VAN_E = VT.tu("van.", 0, "end"),
    T_HOME_OWN = VT.tu("Homeowners"), T_LKAB = VT.tu("LKAB"), T_EQ = VT.tu("equivalent"), T_HOME_E = VT.tu("home.", 0, "end"),
    T_OR = VT.tu("Or"), T_PAYS = VT.tu("pays"), T_MARKET = VT.tu("market"), T_PLUS = VT.tu("plus"), T_25 = VT.tu("twenty-five"), T_PCT_E = VT.tu("percent,", 0, "end"),
    T_INDEP = VT.tu("independent"), T_ASKED = VT.tu("asked"), T_KEY = VT.tu("key"), T_WORTH_E = VT.tu("worth.", 0, "end"),
    T_SAID = VT.tu("said,"), T_SENT = VT.tu("sentimental."), T_SENT_E = VT.tu("sentimental.", 0, "end");
  var A2 = 3.3, B0 = 5.15, C0 = 6.95, D0 = 9.35, E0 = 14.3, F0 = 17.0;
  var ROAD = 860, XB = 1250;
  VT.sfx("whoosh", T_STREET - 0.05, 0.3);
  VT.sfx("ting", T_PAY + 0.42, 0.45);
  VT.sfx("pop", T_PAYS + 0.25, 0.4);
  VT.sfx("ka-ching", T_PLUS, 0.6);
  VT.sfx("ting", T_KEY + 0.25, 0.5);
  VT.sfx("ting", T_SENT_E + 0.1, 0.35);

  function W(t, o) { var b = { s: 0.5, mua: "he", moc: false }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }
  /** Chùm chìa cầm tay (có chìa Kiruna). */
  function chiaTay(x, y, s, lac) { return K.chumChia({ x: x, y: y, s: s || 0.6, kiruna: true, lac: lac || 0 }); }

  // ---------- A: xe tải dọn nhà ----------
  function x0(t) { return t < 3.0 ? 1850 + 300 * (t - 2.5) : key(t, [[3.0, 2000], [3.75, 2130, "out2"]]); }
  function xeTai(xf, t, bow, wobO) {
    var s = "", run = t < 3.75, a = (t * 300 / 36) * 57.3;
    var deckY = ROAD - 84, bedL = xf - 980, bedR = xf - 210;
    // hàng phố trên sàn xe: vỉa hè, nhà, cột đèn, cây thông
    s += K.rect(bedL + 10, deckY - 22, bedR - 10, deckY, "#C9C2B2", { sw: 5, ox: 2, oy: 2 });
    s += K.nhaNho({ x: bedL + 150, y: deckY - 22, s: 0.78, col: "#D9A441" }) + K.nhaNho({ x: bedL + 560, y: deckY - 22, s: 0.72, col: "#C9463A", roof: "#3E3430" });
    s += VT.line("M " + f(bedL + 690) + " " + f(deckY - 22) + " L " + f(bedL + 690) + " " + f(deckY - 330), 9) + VT.line("M " + f(bedL + 690) + " " + f(deckY - 330) + " q 30 -10 44 14", 7) + VT.shape("M " + f(bedL + 722) + " " + f(deckY - 318) + " l 30 0 l -8 22 l -16 0 Z", "#F6D36A", { sw: 4, ox: 1, oy: 1 });
    s += K.cayThong({ x: bedL + 360, y: deckY - 22, h: 360, bow: bow });
    // sàn xe, cabin, bánh
    s += K.rect(bedL, deckY, bedR, deckY + 30, "#7C8C96", { sw: 6, ox: 3, oy: 3 });
    s += K.rect(bedR, ROAD - 250, xf, deckY + 30, "#E9DDC3", { sw: 6, ox: 4, oy: 3 }) + K.rect(bedR + 90, ROAD - 230, xf - 16, ROAD - 150, "#BFE3F2", { sw: 5, ox: 1, oy: 1 });
    s += K.rect(bedR + 10, ROAD - 140, xf - 10, ROAD - 128, "#C9463A", { sw: 0, ox: 0, oy: 0 }) + K.rect(xf - 24, deckY - 6, xf + 8, deckY + 22, "#F6D36A", { sw: 4, ox: 1, oy: 1 });
    [bedL + 110, bedL + 220, xf - 110].forEach(function (wx) { s += VT.g("translate(" + f(wx) + " " + f(ROAD - 34) + ") rotate(" + f(run ? a : 0) + ")", '<circle cx="0" cy="0" r="34" fill="#2b3134" stroke="#1f2326" stroke-width="5"/><circle cx="0" cy="0" r="12" fill="#8C969B"/>' + VT.line("M 0 -12 L 0 -28", 5, "#8C969B")); });
    if (wobO) s += W(t, wobO);
    return s;
  }
  function nenDuong(t) {
    var s = K.troiHe("#DCEAEE") + K.doiXa(600, -100) + K.coDat(700, "#B9C98F");
    s += K.rect(-1400, 700, 3800, ROAD + 40, M.duong, { sw: 6, ox: 0, oy: 3 });
    for (var x = -1400; x < 3800; x += 180) s += VT.line("M " + x + " " + (ROAD + 6) + " L " + (x + 90) + " " + (ROAD + 6), 6, "#F3EEDF", 0.8);
    s += K.coDat(ROAD + 40, M.co);
    return s;
  }
  function cau(front) {
    if (!front) return K.rect(XB - 210, 440, XB - 150, ROAD - 150, "#B9AFA0", { sw: 5, ox: 2, oy: 2 }) + K.rect(XB + 150, 440, XB + 210, ROAD - 150, "#B9AFA0", { sw: 5, ox: 2, oy: 2 });
    var s = K.rect(XB - 260, 380, XB + 260, 444, "#9E978C", { sw: 6, ox: 4, oy: 4 }) + VT.line("M " + (XB - 260) + " 330 L " + (XB + 260) + " 330", 6);
    for (var x = XB - 250; x <= XB + 250; x += 50) s += VT.line("M " + x + " 330 L " + x + " 380", 4);
    return s;
  }
  function thapGieng(x, y, coin) {
    var s = VT.line("M " + (x - 70) + " " + y + " L " + x + " " + (y - 260) + " L " + (x + 70) + " " + y, 9) + VT.line("M " + (x - 52) + " " + (y - 70) + " L " + (x + 52) + " " + (y - 70) + " M " + (x - 34) + " " + (y - 140) + " L " + (x + 34) + " " + (y - 140) + " M " + (x - 52) + " " + (y - 70) + " L " + (x + 34) + " " + (y - 140) + " M " + (x + 52) + " " + (y - 70) + " L " + (x - 34) + " " + (y - 140), 5);
    s += K.rect(x - 70, y - 40, x + 70, y, "#8E5527", { sw: 5, ox: 2, oy: 2 });
    var wy = y - 262;
    s += VT.ell(x, wy, 34, 34, "#C9C2B2", 6) + VT.line("M " + (x - 30) + " " + wy + " L " + (x + 30) + " " + wy + " M " + x + " " + (wy - 30) + " L " + x + " " + (wy + 30), 4) + VT.dot(x, wy, 7);
    if (coin) s += VT.line("M " + (x - 34) + " " + wy + " L " + f(coin[0]) + " " + f(coin[1] - 24), 3.5) + K.dongXu({ x: coin[0], y: coin[1], r: 22 });
    return s;
  }

  return [
    { a: 0, b: A2, ten: "xe cho ca pho", ve: function (t, lt, T) { return canhXe(t, T, "A1"); } },
    { a: A2, b: B0, ten: "thap gieng tra tien", ve: function (t, lt, T) { return canhXe(t, T, "A2"); } },
    // B · ngã ba hai biển hình
    { a: B0, b: C0, ten: "nga ba", ve: function (t, lt, T) {
      var s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#A9C487"/>';
      s += VT.shape("M 860 1200 L 900 700 C 820 560 560 420 260 330 L 380 250 C 640 330 880 470 960 600 C 1040 470 1280 330 1540 250 L 1660 330 C 1360 420 1100 560 1020 700 L 1060 1200 Z", M.duong, { sw: 6, ox: 4, oy: 4 });
      s += VT.line("M 960 1180 L 960 720", 6, "#F3EEDF") + VT.line("M 940 640 C 800 520 600 420 360 330", 5, "#F3EEDF", 0.7) + VT.line("M 980 640 C 1120 520 1320 420 1560 330", 5, "#F3EEDF", 0.7);
      // biển hai mũi tên có hình (không chữ)
      var pop = VT.ease.back(seg(t, B0 + 0.05, B0 + 0.4));
      s += VT.line("M 960 640 L 960 330", 12, "#6A4A30");
      s += VT.g("translate(960 380) scale(" + f(pop) + ")", K.rect(-250, -50, -20, 50, "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + VT.shape("M -250 -50 L -300 0 L -250 50 Z", "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + K.nhaNho({ x: -140, y: 32, s: 0.32, col: "#D9A441" }));
      s += VT.g("translate(960 470) scale(" + f(pop) + ")", K.rect(20, -50, 250, 50, "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + VT.shape("M 250 -50 L 300 0 L 250 50 Z", "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + K.dongXu({ x: 135, y: 0, r: 32 }));
      var look = t < T_HOME_OWN + 0.5 ? 0 : (Math.floor((t - T_HOME_OWN - 0.5) * 1.6) % 2 ? 12 : -12);
      var o = { x: 960, y: 1010, s: 0.62, px: look, py: -8, mouth: "flat", brows: "worried", armR: [270, 250], handR: "nam", propFront: chiaTay(258, 240, 0.7, Math.sin(t * 8) * 6) };
      s += W(t, o);
      return { cam: [960, key(T, [[B0, 600], [C0, 620]]), key(T, [[B0, 1.0], [C0, 1.05, "sine"]])], world: s };
    } },
    // C · hai ngôi nhà giống hệt, dấu =, Wob đảo như úp cốc, nhún vai
    { a: C0, b: D0, ten: "hai nha bang nhau", ve: function (t, lt, T) {
      var s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#E9E2D0"/>' + K.coDat(780, "#B9C98F");
      var sh0 = T_EQ - 0.2, sh1 = T_EQ + 0.55, k = seg(t, sh0, sh1), swaps = 3, ph = k * swaps, n = Math.floor(ph), fr = ph - n;
      var pA = 660, pB = 1260, xa, xb, ya = 0, yb = 0;
      var e = VT.ease.io(fr), aL = (n % 2 === 0), cur = [aL ? pA : pB, aL ? pB : pA], nxt = [cur[1], cur[0]];
      if (k <= 0) { xa = pA; xb = pB; } else if (k >= 1) { xa = swaps % 2 ? pB : pA; xb = swaps % 2 ? pA : pB; }
      else { xa = VT.lerp(cur[0], nxt[0], e); xb = VT.lerp(cur[1], nxt[1], e); ya = -Math.sin(fr * Math.PI) * 120; yb = Math.sin(fr * Math.PI) * 40; }
      s += K.nhaNho({ x: xb, y: 780 + yb, s: 1.3, col: "#C9463A", roof: "#3E3430" }) + K.nhaNho({ x: xa, y: 780 + ya, s: 1.3, col: "#C9463A", roof: "#3E3430" });
      s += VT.text(960, 640, "=", 130, { fill: "#2c4f6e" });
      var o = { x: 960, y: 1010, s: 0.6, mouth: "content", brows: "flat" };
      if (k > 0 && k < 1) { var c = Math.sin(k * Math.PI * 6); o.armL = [70, 120 + c * 40]; o.armR = [330, 120 - c * 40]; o.handL = "xoe"; o.handR = "xoe"; o.mouth = "smirk"; }
      if (t >= sh1) { var look = Math.floor((t - sh1) * 5) % 2 ? 12 : -12; o.px = t < T_HOME_E - 0.25 ? look : 0; o.brows = "worried"; o.mouth = "wobbly"; }
      if (t >= T_HOME_E - 0.25) { o.arms = "shrug"; o.brows = "up"; o.mouth = "flat"; o.sq = key(t, [[T_HOME_E - 0.25, 0.94], [T_HOME_E, 1.03], [T_HOME_E + 0.2, 1]]); }
      o.armR = o.armR || (o.arms ? undefined : [276, 250]); if (!o.arms && !(k > 0 && k < 1)) { o.handR = "nam"; o.propFront = chiaTay(264, 240, 0.7, 0); }
      s += W(t, o);
      return { cam: [960, key(T, [[C0, 600], [D0, 610]]), key(T, [[C0, 1.0], [D0, 1.06, "sine"]])], world: s };
    } },
    // D–F · cân đĩa
    { a: D0, b: E0, ten: "can gia tri", ve: function (t, lt, T) { return canhCan(t, T, "D"); } },
    { a: E0, b: F0, ten: "dat chum chia", ve: function (t, lt, T) { return canhCan(t, T, "E"); } },
    { a: F0, b: DUR, ten: "kim trai tim", ve: function (t, lt, T) { return canhCan(t, T, "F"); } },
  ];

  function canhXe(t, T, sh) {
    var xf = x0(t), s = nenDuong(t);
    var tTree = seg(t, T_STREET + 0.02, T_STREET + 0.3), tUp = seg(t, T_TOO_E - 0.3, T_TOO_E - 0.02), bow = -70 * VT.ease.out(tTree) * (1 - VT.ease.back(tUp));
    var duck = tTree * (1 - tUp);
    s += cau(false);
    // tháp giếng mỏ tí hon bên đường (phía xa), đồng xu theo cáp
    var tx = 2420, ty = 720, coin = null;
    if (t >= T_PAY - 0.05) { var kc = seg(t, T_PAY - 0.05, T_PAY + 0.4); coin = [VT.lerp(tx - 34, xf - 14, kc), VT.lerp(ty - 262, ROAD - 214, kc)]; }
    s += thapGieng(tx, ty, t < T_PAY + 0.42 ? coin : null);
    var wo = { x: xf - 110, y: ROAD - 250 + 92 * 0.44, s: 0.44, legs: "sit", flip: 1, mouth: "content", brows: "flat", armL: [190, 250], armR: [214, 252], handL: "nam", handR: "nam",
      propFront: chiaTay(204, 236, 0.75, Math.sin(t * 10) * 5), lean: 0 };
    if (duck > 0) { wo.lean = -38 * duck; wo.bob = 40 * duck; wo.eyes = "squint"; wo.mouth = "wobbly"; wo.px = -10; }
    else if (t < T_STREET) { wo.px = 10; }
    else if (t > T_TOO_E) { wo.px = 10; wo.mouth = "smirk"; }
    s += xeTai(xf, t, bow, wo);
    // bàn tay chung của bác tài thò cửa sổ nhận đồng xu
    var hk = seg(t, T_PAY - 0.3, T_PAY), hb = seg(t, T_PAY + 0.6, T_PAY + 0.9), hx = xf - 70 + 50 * hk * (1 - hb);
    if (hk > 0 && hb < 1) s += VT.g("translate(" + f(hx) + " " + f(ROAD - 186) + ") rotate(-28) scale(0.42)", VT.handGeneric({ x: 0, y: 0, sleeve: "#5E7E9A" }));
    if (t >= T_PAY + 0.42 && hb < 1) s += K.dongXu({ x: hx + 26, y: ROAD - 214, r: 22 });
    s += cau(true);
    var cam = sh === "A1" ? [key(T, [[0, 1100], [A2, xf - 330, "lin"]]), 560, key(T, [[0, 0.98], [T_STREET, 1.0], [A2, 1.05, "sine"]])]
      : [key(T, [[A2, 1880], [T_PAY - 0.2, 2060, "io"], [B0, 2080]]), key(T, [[A2, 600], [B0, 610]]), key(T, [[A2, 1.25], [T_PAY - 0.2, 1.4, "io"], [B0, 1.46, "sine"]])];
    return { cam: cam, world: s, over: VT.dreamFrame(t, { inset: 64 }) };
  }

  function canhCan(t, T, sh) {
    var PX = 960, PY = 430, HALF = 450, STR = 290, s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#E9E2D0"/>' + K.coDat(960, "#B9C98F");
    var houseOn = sh === "D", moneyK = sh === "D" ? seg(t, T_PAYS - 0.05, T_PAYS + 0.25) : 0, quarterK = sh === "D" ? seg(t, T_PLUS - 0.25, T_PLUS) : 0;
    var keysPlaced = sh === "E" ? seg(t, T_KEY - 0.1, T_KEY + 0.2) : (sh === "F" ? 1 : 0), takeBack = sh === "F" ? seg(t, T_SENT_E, T_SENT_E + 0.3) : 0;
    // góc đòn cân (dương = bên phải chìm xuống); kim chỉ theo đòn
    var ang;
    if (sh === "D") ang = key(t, [[D0, -9], [T_PAYS + 0.2, -9], [T_PAYS + 0.55, 0, "back"], [T_PLUS, 0], [T_PLUS + 0.3, 7, "back"]]);
    else if (sh === "E") ang = key(t, [[E0, 0], [T_KEY + 0.2, 0], [T_KEY + 0.6, -3, "out"]]);
    else ang = key(t, [[F0, -3], [T_SENT - 0.05, -13, "io"], [T_SENT_E + 0.2, -13], [T_SENT_E + 0.6, 0, "out"]]);
    var ar = ang * Math.PI / 180, lx = PX - HALF * Math.cos(ar), ly = PY - HALF * Math.sin(ar), rx = PX + HALF * Math.cos(ar), ry = PY + HALF * Math.sin(ar);
    // mặt cân hình cung: vạch, một trái tim (không chữ, không số)
    var R = 200;
    s += VT.shape("M " + (PX - 230) + " " + PY + " A 230 230 0 0 1 " + (PX + 230) + " " + PY + " Z", "#FFFDF6", { sw: 6, ox: 5, oy: 5 });
    for (var i = -4; i <= 4; i++) {
      var a = (-90 + i * 13) * Math.PI / 180, cx = PX + Math.cos(a) * R, cy = PY + Math.sin(a) * R;
      if (i === -1) s += VT.g("translate(" + f(PX + Math.cos(a) * (R - 6)) + " " + f(PY + Math.sin(a) * (R - 6)) + ") rotate(" + f(i * 13) + ")", VT.shape("M 0 10 C -24 -6 -16 -26 0 -14 C 16 -26 24 -6 0 10 Z", "#D8443A", { sw: 4, ox: 1, oy: 1 }));
      else s += VT.line("M " + f(cx) + " " + f(cy) + " L " + f(PX + Math.cos(a) * (R - (i === 0 ? 40 : 26))) + " " + f(PY + Math.sin(a) * (R - (i === 0 ? 40 : 26))), i === 0 ? 7 : 5);
    }
    // trụ, đế
    s += K.rect(PX - 20, PY, PX + 20, 900, "#B98A5A", { sw: 6, ox: 3, oy: 3 }) + VT.shape("M " + (PX - 200) + " 960 L " + (PX - 140) + " 880 L " + (PX + 140) + " 880 L " + (PX + 200) + " 960 Z", "#9C6A44", { sw: 6, ox: 4, oy: 4 });
    // thẻ market value +25%
    if (sh === "D" && t >= T_MARKET - 0.1) {
      s += K.rect(PX - 250, 735, PX + 250, 900, "#FFFDF6", { sw: 6, ox: 5, oy: 5 });
      s += VT.textWrite(PX, 798, "market value", 50, seg(t, T_MARKET - 0.05, T_MARKET + 0.5), { fill: "#2c4f6e" });
      s += VT.textWrite(PX, 874, "+25%", 50, seg(t, T_25 - 0.05, T_25 + 0.3), { fill: "#A8361F" });
    }
    // đòn, kim
    s += VT.line("M " + f(lx) + " " + f(ly) + " L " + f(rx) + " " + f(ry), 14, "#8E5527") + VT.line("M " + f(lx) + " " + f(ly) + " L " + f(rx) + " " + f(ry), 4, "#1f2326", 0.6);
    var na = (-90 + ang) * Math.PI / 180;
    s += VT.line("M " + PX + " " + PY + " L " + f(PX + Math.cos(na) * (R - 20)) + " " + f(PY + Math.sin(na) * (R - 20)), 8, "#A8361F") + VT.dot(PX, PY, 16, "#C9A24A") + VT.ell(PX, PY, 16, 16, "none", 4);
    // hai đĩa treo
    function dia(x, y, inner) { return VT.line("M " + f(x) + " " + f(y) + " L " + f(x - 120) + " " + f(y + STR) + " M " + f(x) + " " + f(y) + " L " + f(x + 120) + " " + f(y + STR), 4) + inner + VT.shape("M " + f(x - 150) + " " + f(y + STR) + " Q " + f(x) + " " + f(y + STR + 70) + " " + f(x + 150) + " " + f(y + STR) + " Z", "#C9A24A", { sw: 6, ox: 3, oy: 3 }) + VT.dot(x, y, 9); }
    var inL = "", inR = "", panLy = ly + STR, panRy = ry + STR;
    if (houseOn) inL += K.nhaNho({ x: lx, y: panLy, s: 0.72, col: "#C9463A", roof: "#3E3430" });
    if (moneyK > 0) inR += K.chongTien({ x: rx, y: panRy - (1 - VT.ease.in2(moneyK)) * 400, n: 7, seed: 2 });
    if (quarterK > 0) inR += K.chongTien({ x: rx + 6, y: panRy - 84 - (1 - VT.ease.in2(quarterK)) * 300, n: 2, seed: 9, w: 140 });
    var keyAt = null;
    if (keysPlaced > 0 && takeBack <= 0) keyAt = [VT.lerp(lx - 150, lx, keysPlaced), panLy - 60 * (1 - keysPlaced) - 10];
    if (keyAt && keysPlaced >= 1) inL += chiaTay(keyAt[0], keyAt[1] - 30, 0.75, 0);
    s += dia(lx, ly, inL) + dia(rx, ry, inR);
    if (sh === "D" && quarterK >= 1 && t < T_PLUS + 0.5) s += VT.sparkle({ x: rx + 120, y: panRy - 140, s: 0.7 * (1 - seg(t, T_PLUS, T_PLUS + 0.5)), fill: "#F6D36A" });
    // Wob
    var o = { x: 300, y: 960, s: 0.62, mouth: "content", brows: "flat", px: 10 };
    if (sh === "D") {
      if (t > T_PLUS) { o.mouth = "o"; o.brows = "up"; o.px = 12; o.py = -6; }
      if (t > T_INDEP - 0.1 && t < T_INDEP + 0.8) { o.bob = Math.abs(Math.sin((t - T_INDEP) * 9)) * 8; o.mouth = "content"; }
      o.armR = [276, 250]; o.handR = "nam"; o.propFront = chiaTay(264, 240, 0.7, 0);
    } else if (sh === "E") {
      o.x = key(t, [[E0, 220], [E0 + 0.5, 300, "out"]]);
      if (t < E0 + 0.5) { o.legs = "walk"; o.phase = (t - E0) * 2.2; o.stride = 26; }
      var reach = seg(t, T_KEY - 0.6, T_KEY - 0.1), back = seg(t, T_KEY + 0.25, T_KEY + 0.6);
      if (reach > 0 && back < 1) {
        var hp = keyAt || [lx - 150 + 150 * 0, panLy - 70];
        if (!keyAt) hp = [VT.lerp(o.x + 80, lx - 40, reach), VT.lerp(o.y - 150, panLy - 70, reach)];
        o.armR = VT.wobLocal(o, hp[0], hp[1] - 20); o.handR = "nam";
        if (keysPlaced < 1) s += "";
        o.propFront = keysPlaced < 1 ? chiaTayAt(o, hp) : "";
        o.mouth = "flat"; o.brows = "flat"; o.py = -8;
      } else if (reach <= 0) { o.armR = [276, 250]; o.handR = "nam"; o.propFront = chiaTay(264, 240, 0.7, 0); }
      if (t > T_KEY + 0.6) { o.py = -12; o.px = 12; o.mouth = "flat"; o.noBlink = t > T_WORTH_E; }
    } else {
      o.px = 12; o.py = -14; o.mouth = "flat"; o.noBlink = true;
      if (takeBack > 0) {
        var hold = VT.ease.out(takeBack);
        o.armR = [VT.lerp(390, 220, hold), VT.lerp(130, 240, hold)]; o.armL = [180, 246]; o.handL = "nam"; o.handR = "nam";
        o.propFront = chiaTay(VT.lerp(380, 202, hold), VT.lerp(120, 228, hold), 0.75, 0);
        if (takeBack >= 1) { o.eyes = "happy"; o.mouth = "content"; o.lean = -4 + Math.sin((t - T_SENT_E) * 4) * 2; o.brows = "flat"; }
      } else if (t > T_SENT_E - 0.3) { o.armR = VT.wobLocal(o, lx - 30, panLy - 60); o.handR = "xoe"; }
    }
    s += W(t, o);
    var cam;
    if (sh === "D") cam = [key(T, [[D0, 900], [E0, 920]]), key(T, [[D0, 560], [E0, 575]]), key(T, [[D0, 0.97], [T_PLUS - 0.1, 1.0, "sine"], [T_PLUS + 0.05, 1.06, "out"], [E0, 1.08]])];
    else if (sh === "E") cam = [key(T, [[E0, 620], [F0, 640]]), key(T, [[E0, 620], [F0, 630]]), key(T, [[E0, 1.3], [F0, 1.36, "sine"]])];
    else cam = [key(T, [[F0, 940], [T_SENT_E - 0.05, 930], [T_SENT_E + 0.35, 520, "io"], [DUR, 510]]), key(T, [[F0, 330], [T_SENT_E - 0.05, 320], [T_SENT_E + 0.35, 700, "io"], [DUR, 705]]),
      key(T, [[F0, 1.8], [T_SENT - 0.1, 2.0, "sine"], [T_SENT_E - 0.05, 2.02], [T_SENT_E + 0.35, 1.7, "io"], [DUR, 1.76, "sine"]])];
    return { cam: cam, world: s };
  }
  function chiaTayAt(o, hp) { var l = VT.wobLocal(o, hp[0], hp[1]); return chiaTay(l[0], l[1] - 10, 0.75 / 0.62 * 0.62, Math.sin(hp[0]) * 4); }
};
