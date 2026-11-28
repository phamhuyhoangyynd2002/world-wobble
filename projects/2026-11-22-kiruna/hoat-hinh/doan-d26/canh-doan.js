/* d26 · vẽ tay (370,84–380,878 s; 10,038 s). Vào "cat", ra "cat". Hồi ức tháng 8, không khẩu hình.
 * Sơ đồ ở chỗ mới: nhà thờ trên rơ-moóc xoay nửa vòng tại chỗ (mặt hồi có cửa đi từ phải sang trái), mũi tên cong vẽ dần, thẻ gỗ 180° viết ở "eighty".
 * Wob ĐỨNG TRÊN NỀN ĐẤT cạnh rơ-moóc (ghi chú duyệt 5a: không đứng trên rơ-moóc đang xoay), lúc đầu cùng hướng nhà thờ (quay lưng về thị trấn);
 * nhà thờ xoay xong thì Wob ngoái lại, đúng "faces the town." tự xoay người cho cùng hướng nhà thờ.
 * Cận cửa nhà thờ đóng: Wob gõ hai cái (gọi lại d23), không ai mở. Tờ lịch giấy trên cửa viết "2027?" ở "twenty twenty-seven." (dè dặt: giáo xứ chỉ hy vọng);
 * Wob nghiêng đầu nhìn dấu hỏi rồi vẫn ngồi xuống bậc cửa khoanh tay như định chờ; giữ tới cắt.
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var T_TURN = VT.tu("turned"), T_80 = VT.tu("eighty"), T_DEG_E = VT.tu("degrees,", 0, "end"), T_FACES = VT.tu("faces"), T_TOWN = VT.tu("town."),
    T_CLOSED = VT.tu("closed"), T_NOW = VT.tu("now."), T_PARISH = VT.tu("parish"), T_TW = VT.tu("twenty"), T_27 = VT.tu("twenty-seven."), T_27E = VT.tu("twenty-seven.", 0, "end");
  var A1 = 4.38, B0 = 5.85, GR = 830, DECK = 726, CX = 980;
  VT.sfx("bonk", T_CLOSED - 0.03, 0.4);
  VT.sfx("bonk", T_NOW - 0.03, 0.4);
  VT.sfx("pop", T_TW - 0.04, 0.4);
  VT.sfx("whoosh", T_TOWN - 0.12, 0.25);

  function W(t, o) { var b = { s: 0.56, mua: "he", tuiChia: true, moc: "nha" }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }
  function th(t) { return key(t, [[T_TURN - 0.05, 0], [T_DEG_E - 0.1, 180, "io"]]); }
  function nenMoi(t) {
    var s = K.troiHe("#D6E6EA") + K.doiXa(600, -200);
    // thị trấn mới phía trái (nhà nhỏ, toà tròn, tháp đồng hồ khung sắt) — xa, mờ
    var town = "";
    for (var i = 0; i < 6; i++) town += K.nhaNho({ x: -420 + i * 120, y: 690, s: 0.42, col: ["#D9A441", "#C9463A", "#E9DDC3", "#7FA9C9", "#D9A441", "#E9DDC3"][i], door: false });
    town += VT.ell(380, 650, 110, 40, "#BFD3DA", 5) + K.rect(270, 650, 490, 690, "#AFC6CE", { sw: 5, ox: 2, oy: 2 }) + VT.line("M 300 660 L 300 690 M 340 660 L 340 690 M 380 660 L 380 690 M 420 660 L 420 690 M 460 660 L 460 690", 3, "#1f2326", 0.4);
    town += VT.line("M 560 690 L 590 480 L 620 690 M 572 600 L 608 600 M 566 650 L 614 650", 5) + VT.ell(590, 470, 26, 26, "#FFFDF6", 4) + VT.line("M 590 470 L 590 454 M 590 470 L 602 474", 3);
    s += '<g opacity="0.8">' + town + "</g>";
    s += K.coDat(700, "#B9C98F") + K.rect(-1400, 760, 3400, 900, "#C9C2B2", { sw: 5, ox: 0, oy: 3 });
    for (var g = 0; g < 26; g++) s += VT.dot(-200 + VT.hash(g * 3.7) * 2400, 780 + VT.hash(g * 1.3) * 100, 4 + VT.hash(g) * 3, "#9E978C");
    s += K.coDat(900, M.co) + K.coLa(-1300, 3300, 980, 3);
    return s;
  }

  return [
    // A1 · sơ đồ: nhà thờ xoay nửa vòng, mũi tên cong vẽ dần, thẻ 180°
    { a: 0, b: A1, ten: "xoay 180", ve: function (t, lt, T) { return canhXoay(t, T, "A1"); } },
    // A2 · Wob ngoái lại rồi tự xoay cho cùng hướng nhà thờ
    { a: A1, b: B0, ten: "wob tu xoay", ve: function (t, lt, T) { return canhXoay(t, T, "A2"); } },
    // B · cận cửa đóng: gõ hai cái; tờ lịch 2027?; ngồi bậc cửa khoanh tay
    { a: B0, b: DUR, ten: "cua dong 2027?", ve: function (t, lt, T) {
      var s = '<rect x="-600" y="-600" width="3120" height="2280" fill="#D6E6EA" opacity="0.92"/>' + K.coDat(930, M.co);
      var cx = 820, sc = 2.3, base = 930;
      s += K.nhaTho({ x: cx, y: base - 70, th: 90, W: 250, s: sc });
      // bậc cửa gỗ (hai bậc)
      s += K.rect(cx - 200, base - 70, cx + 200, base - 36, "#9C6A44", { sw: 6, ox: 3, oy: 3 }) + K.rect(cx - 250, base - 36, cx + 250, base, "#8A5A38", { sw: 6, ox: 3, oy: 3 });
      s += VT.line("M " + (cx - 190) + " " + (base - 54) + " L " + (cx + 190) + " " + (base - 54), 2.5, "#1f2326", 0.3);
      // tờ lịch giấy treo trên cửa (đinh), chữ 2027? viết ở "twenty twenty-seven."
      var cy = base - 70 - 74 * sc, kS = seg(t, T_PARISH - 0.3, T_PARISH);
      if (kS > 0) {
        var sw = Math.sin((t - T_PARISH) * 9) * 6 * (1 - seg(t, T_PARISH, T_PARISH + 0.8));
        var cal = K.rect(-112, 0, 112, 190, "#FFFDF6", { sw: 6, ox: 5, oy: 5 }) + '<rect x="-112" y="0" width="224" height="40" fill="#C9463A"/>' + K.rect(-112, 0, 112, 40, "none", { sw: 6, ox: 0, oy: 0 }) +
          VT.dot(-56, 20, 6, "#FFFDF6") + VT.dot(56, 20, 6, "#FFFDF6") + VT.line("M -80 168 L 80 168", 4, "#1f2326", 0.25);
        cal += VT.textWrite(0, 128, "2027?", 56, seg(t, T_TW - 0.05, T_27 + 0.12), { fill: "#2c4f6e" });
        s += VT.dot(cx, cy - 12, 7) + VT.g("translate(" + cx + " " + f(cy - 12 - (1 - VT.ease.back(kS)) * 60) + ") rotate(" + f(sw) + ")", VT.line("M 0 0 L -40 10 M 0 0 L 40 10", 3) + VT.g("translate(0 10)", cal));
      }
      // Wob: đi tới gõ cửa hai cái, đứng đọc, nghiêng đầu, ngồi bậc cửa khoanh tay
      var sitT = T_27 + 0.32, ws = 0.62, o = { s: ws, flip: -1, mouth: "flat", brows: "flat" };
      var wx = key(t, [[B0, 1300], [B0 + 0.4, 1130, "out"]]), wy = base - 36;
      o.x = wx; o.y = wy;
      if (t < B0 + 0.4) { o.legs = "walk"; o.phase = (t - B0) * 2.6; o.stride = 30; }
      var knocks = [T_CLOSED, T_NOW];
      knocks.forEach(function (kt) { var k = seg(t, kt - 0.18, kt), b = seg(t, kt, kt + 0.2); if (k > 0 && b < 1) { var door = [cx + 70, base - 70 - 70 * sc]; var loc = VT.wobLocal(o, door[0] + (1 - k + b) * 40, door[1]); o.armR = loc; o.handR = "nam"; } });
      if (t > T_CLOSED + 0.25 && t < T_PARISH) { o.px = -8; o.py = -6; o.brows = "worried"; o.mouth = "flat"; }
      if (t >= T_PARISH) { o.py = -14; o.px = -6; o.noBlink = t > T_27; }
      var tilt = seg(t, T_27 + 0.08, T_27 + 0.24);
      if (t >= T_27 + 0.08 && t < sitT) { o.lean = -14 * tilt; o.brows = "skeptic"; o.mouth = "oSmall"; }
      if (t >= sitT) {
        var dn = seg(t, sitT, sitT + 0.16);
        o.legs = "sit"; o.y = VT.lerp(wy, base - 70 + 92 * ws * 0.62, VT.ease.in2(dn)); o.x = wx - 20 * dn; o.sq = key(t, [[sitT + 0.15, 1], [sitT + 0.17, 0.9], [sitT + 0.4, 1, "back"]]);
        o.armL = [252, 248]; o.armR = [148, 248]; o.lid = 0.38; o.brows = "flat"; o.mouth = "flat"; o.px = 0; o.py = 0; o.noBlink = true;
      }
      s += W(t, o);
      knocks.forEach(function (kt) { var kk = seg(t, kt, kt + 0.35); if (kk > 0 && kk < 1) s += VT.knockLines({ x: cx + 60, y: base - 70 - 70 * sc, k: kk, s: 0.9 }); });
      if (tilt > 0 && t < sitT + 0.3) s += VT.glyph({ x: wx - 20, y: wy - 300, s: 0.7 * Math.min(1, tilt * 1.4), sym: "?" });
      var cam = [key(T, [[B0, 960], [T_PARISH - 0.1, 970], [T_PARISH + 0.4, 960, "io"], [DUR, 960]]), key(T, [[B0, 640], [T_PARISH - 0.1, 640], [T_PARISH + 0.4, 560, "io"], [DUR, 575]]), key(T, [[B0, 1.12], [T_PARISH - 0.1, 1.16, "sine"], [T_PARISH + 0.4, 1.3, "io"], [DUR, 1.36, "sine"]])];
      return { cam: cam, world: s };
    } },
  ];

  function canhXoay(t, T, sh) {
    var s = nenMoi(t), ang = th(t), kA = ang / 180;
    // mũi tên cong quanh rơ-moóc (vẽ dần theo góc xoay)
    var rx = 330, ry = 78, cy0 = DECK - 520, pts = [];
    for (var i = 0; i <= 40; i++) { var a = Math.PI * 0.62 - Math.PI * 1.55 * i / 40; pts.push([CX + Math.cos(a) * rx, cy0 + Math.sin(a) * ry]); }
    var arrow = VT.smooth(pts, false), aDraw = seg(t, T_TURN - 0.05, T_DEG_E - 0.1);
    // nửa sau mũi tên (sau nhà thờ) vẽ trước
    s += K.roMooc({ x: CX, y: DECK, w: 760, t: 0, quay: 0 });
    s += K.nhaTho({ x: CX, y: DECK, th: ang, L: 560 });
    if (aDraw > 0) {
      s += VT.lineDraw(arrow, aDraw, 14, "#FFFDF6") + VT.lineDraw(arrow, aDraw, 8, "#C9463A");
      var tip = VT.alongPts(pts, aDraw), prev = VT.alongPts(pts, Math.max(0, aDraw - 0.04)), an = Math.atan2(tip[1] - prev[1], tip[0] - prev[0]) * 57.3;
      s += VT.g("translate(" + f(tip[0]) + " " + f(tip[1]) + ") rotate(" + f(an) + ")", VT.shape("M 6 0 L -30 -22 L -22 0 L -30 22 Z", "#C9463A", { sw: 5, ox: 2, oy: 2 }));
    }
    // thẻ gỗ cắm cọc: 180° ở "eighty"
    s += VT.line("M 330 930 L 330 830", 10, "#6A4A30") + K.rect(200, 740, 460, 840, "#F6EEDC", { sw: 6, ox: 5, oy: 5 }) + VT.textWrite(330, 815, "180°", 76, seg(t, T_80 - 0.08, T_80 + 0.25), { fill: "#2c4f6e" });
    // Wob đứng trên nền đất cạnh rơ-moóc (ngoài mép phải)
    var spin = seg(t, T_TOWN - 0.12, T_TOWN + 0.1), o = { x: 1600, y: 900, s: 0.56, flip: spin < 0.5 ? 1 : -1, sxRaw: Math.max(0.12, Math.abs(Math.cos(spin * Math.PI))), mouth: "content", brows: "flat", px: 10 };
    if (t >= T_TURN - 0.05 && t < T_DEG_E) { o.px = -12; o.mouth = "oSmall"; o.brows = "up"; }
    if (t >= T_DEG_E && t < T_TOWN - 0.12) { o.px = 12; o.mouth = "content"; }
    if (t >= T_FACES - 0.15 && t < T_TOWN - 0.12) { o.px = -12; o.brows = "skeptic"; o.mouth = "flat"; }
    if (spin > 0) { o.bob = -40 * Math.sin(spin * Math.PI); o.legs = spin < 1 ? "tuck" : "stand"; o.px = 10; o.mouth = "content"; }
    if (t > T_TOWN + 0.1) { o.sq = key(t, [[T_TOWN + 0.1, 0.9], [T_TOWN + 0.35, 1, "back"]]); o.lid = 0.25; o.mouth = "smirk"; o.brows = "flat"; }
    s += W(t, o);
    var cam = sh === "A1" ? [key(T, [[0, 960], [A1, 990, "sine"]]), 520, key(T, [[0, 0.98], [A1, 1.03, "sine"]])]
      : [key(T, [[A1, 1360], [B0, 1390, "sine"]]), key(T, [[A1, 680], [B0, 690]]), key(T, [[A1, 1.55], [T_TOWN - 0.15, 1.6, "sine"], [T_TOWN, 1.66, "out"], [B0, 1.68]])];
    return { cam: cam, world: s };
  }
};
