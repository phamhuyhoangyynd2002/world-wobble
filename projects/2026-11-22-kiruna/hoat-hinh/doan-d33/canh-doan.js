/* d33 · vẽ tay (488,304–506,104 s; 17,8 s). Vào "cat", ra "cat". Hồi ức tháng 12, không khẩu hình.
 * Nhiệt kế giấy to tụt xuống; một dòng "−11°C · 12°F" (đúng chu_tren_do_vat): "−11°C" viết ở "minus eleven", " · 12°F" ở "twelve".
 * Wob (áo phao xanh lam, mũ len xanh lá thông quả bông kem, khăn kem sọc xanh quấn hai vòng) thở ra khói trắng, cố thổi một vòng khói;
 * vòng khói bay lên móc vào quả bông mũ len (ở −11°C hơi thở chỉ thành khói, không đóng cục). Tờ nghiên cứu giấy (dòng kẻ, không chữ)
 * trượt vào, mũi tên chỉ xuống; Wob nhíu mày. Mặt cắt: trung tâm cũ trên chỗ cao, trung tâm mới trong chỗ trũng hình cái bát; nhiệt kế nhỏ
 * (không số) ở chỗ trũng tụt thấp hơn ở "lower". Khí lạnh xanh nhạt chảy xuống đọng đầy bát như nước; Wob đứng trên VÀNH bát phía trung tâm cũ,
 * múc một muôi khí lạnh lên nếm đúng "bowl.", rùng mình. Lời đã rào "can be noticeably lower": không số độ chênh trên hình.
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var T_MINUS = VT.tu("minus"), T_CEL_E = VT.tu("Celsius.", 0, "end"), T_TWELVE = VT.tu("twelve"), T_FAH_E = VT.tu("Fahrenheit.", 0, "end"),
    T_AND = VT.tu("And"), T_PROBLEM = VT.tu("problem"), T_ACC = VT.tu("According"), T_STUDY_E = VT.tu("study,", 0, "end"), T_WINTER = VT.tu("winter"),
    T_LOWER = VT.tu("lower"), T_OLD = VT.tu("old"), T_COLD = VT.tu("Cold"), T_POOLS = VT.tu("pools"), T_BUILT_E = VT.tu("built,", 0, "end"),
    T_WATER = VT.tu("water"), T_FILLS = VT.tu("fills"), T_BOWL = VT.tu("bowl."), T_BOWL_E = VT.tu("bowl.", 0, "end");
  var A2 = 2.6, B0 = 5.15, C0 = 7.6, C2 = 10.4, D0 = 14.0;
  VT.sfx("hoi-nuoc", T_CEL_E - 0.35, 0.35);
  VT.sfx("pop", 4.55, 0.4);
  VT.sfx("lat-giay", B0 + 0.05, 0.45);
  VT.sfx("brr", T_BOWL + 0.08, 0.55);

  function W(t, o) { var b = { s: 0.62, mua: "dong", moc: "kiruna" }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }
  var TH = { x: 640, y: 1000, s: 1.08 };
  var V = { x: 1180, y: 900, w: 1000, depth: 300, floor: 300, ext: 1400, mtn: [0, 160], mtnW: 520 };
  function lvl(t) { return key(t, [[0.15, 0.78], [T_MINUS - 0.05, 0.3, "io"]]); }
  function nhietKe(t) {
    var l = lvl(t), s = VT.thermo({ x: TH.x, y: TH.y, s: TH.s, level: l, mark: 0.3, frost: true });
    var mk = TH.y + TH.s * (-150 - (510) * 0.3);
    // một dòng đúng chu_tren_do_vat: "−11°C" viết ở "minus eleven", " · 12°F" ở "twelve"; thẻ giấy nền cho dễ đọc
    var STR = "−11°C · 12°F", SZ = 56, x0 = TH.x + TH.s * 66, tw = VT.textW(STR, SZ), ty = mk + 22;
    var kw = 0.44 * seg(t, T_MINUS - 0.05, T_MINUS + 0.4) + 0.56 * seg(t, T_TWELVE - 0.05, T_TWELVE + 0.35);
    if (kw > 0) s += K.rect(x0 - 16, ty - SZ * 0.95, x0 + tw * 0.8 + 18, ty + SZ * 0.4, "#FFFDF6", { sw: 5, ox: 4, oy: 4 }) + VT.textWrite(x0, ty, STR, SZ, kw, { anchor: "start", fill: "#1f2326" });
    return s;
  }
  function nenDong(t) { return '<rect x="-600" y="-600" width="3120" height="2280" fill="#DCE6EE"/>' + VT.snowGround(1000) + VT.snowfall(t, 26, [-300, -100, 2300, 1000], 50); }

  return [
    // A1 · nhiệt kế tụt, −11°C
    { a: 0, b: A2, ten: "nhiet ke", ve: function (t, lt, T) { return canhA(t, T, "A1"); } },
    // A2 · vòng khói móc quả bông mũ, 12°F
    { a: A2, b: B0, ten: "vong khoi", ve: function (t, lt, T) { return canhA(t, T, "A2"); } },
    // B · tờ nghiên cứu trượt vào, mũi tên chỉ xuống; Wob nhíu mày
    { a: B0, b: C0, ten: "to nghien cuu", ve: function (t, lt, T) {
      var s = nenDong(t), k = VT.ease.out(seg(t, B0, B0 + 0.4)), px = VT.lerp(2300, 1180, k), rot = VT.lerp(14, -3, k);
      var sheet = K.rect(-280, -360, 280, 360, "#FFFDF6", { sw: 6, ox: 8, oy: 8 });
      for (var i = 0; i < 7; i++) sheet += VT.line("M -220 " + (-290 + i * 44) + " L " + (i % 3 === 2 ? 60 : 220) + " " + (-290 + i * 44), 5, "#1f2326", 0.22);
      sheet += VT.line("M -220 220 L -220 20 M -220 220 L 220 220", 5) + VT.line("M -200 60 C -120 70 -60 110 0 140 C 60 170 120 180 200 204", 6, "#2c4f6e");
      var ak = seg(t, T_PROBLEM - 0.1, T_PROBLEM + 0.3);
      if (ak > 0) sheet += VT.g("translate(170 -40) scale(" + f(VT.ease.back(ak)) + ")", VT.shape("M -26 -110 L 26 -110 L 26 10 L 60 10 L 0 90 L -60 10 L -26 10 Z", "#6FA9CF", { sw: 6, ox: 3, oy: 3 }));
      s += VT.g("translate(" + f(px) + " 520) rotate(" + f(rot) + ")", sheet);
      var o = { x: 560, y: 1000, py: -4, px: key(t, [[B0, 0], [B0 + 0.4, 12]]), brows: t > T_AND + 0.3 ? "down" : "flat", mouth: t > T_PROBLEM ? "frown" : "flat", lean: t > T_AND + 0.3 ? 6 : 0 };
      s += W(t, o);
      return { cam: [key(T, [[B0, 900], [C0, 910]]), key(T, [[B0, 580], [C0, 590]]), key(T, [[B0, 1.0], [T_PROBLEM, 1.04, "sine"], [C0, 1.08, "sine"]])], world: s };
    } },
    // C · mặt cắt cái bát: trung tâm cũ trên cao, trung tâm mới trong trũng; nhiệt kế nhỏ
    { a: C0, b: C2, ten: "mat cat", ve: function (t, lt, T) { return canhBat(t, T, "C1"); } },
    { a: C2, b: D0, ten: "nhiet ke nho", ve: function (t, lt, T) { return canhBat(t, T, "C2"); } },
    // D · khí lạnh đọng đầy bát; Wob múc muôi nếm ở "bowl."
    { a: D0, b: DUR, ten: "muc muoi khi lanh", ve: function (t, lt, T) { return canhBat(t, T, "D"); } },
  ];

  function canhA(t, T, sh) {
    var s = nenDong(t) + nhietKe(t);
    var o = { x: 1300, y: 1000, mouth: "flat", brows: "flat", px: -10, py: 0 };
    if (t < T_MINUS) { o.px = -10; o.py = key(t, [[0, -10], [T_MINUS, 4]]); o.mouth = "oSmall"; }
    // thở ra khói rồi thổi vòng khói
    var breath = seg(t, T_CEL_E - 0.4, T_CEL_E + 0.2), ringT0 = 3.15, ringT1 = 4.55, rk = seg(t, ringT0, ringT1);
    if (breath > 0 && breath < 1) o.mouth = "o";
    if (t >= ringT0 - 0.3 && t < ringT0 + 0.15) { o.mouth = "o"; o.sq = 1.04; }
    if (t >= ringT0 + 0.15) { o.py = -14; o.px = 2; o.mouth = t > ringT1 ? "flat" : "oSmall"; o.brows = t > ringT1 ? "skeptic" : "up"; o.noBlink = t > ringT1 && t < ringT1 + 0.6; }
    s += W(t, o);
    var mouthP = VT.wobPt({ s: 0.62, x: o.x, y: o.y, sq: o.sq }, 210, 236), pom = VT.wobPt({ s: 0.62, x: o.x, y: o.y }, 200, 26);
    if (breath > 0 && breath < 1) s += VT.puffBurst({ x: mouthP[0] - 30, y: mouthP[1], k: breath, s: 0.5, spread: 60 });
    if (rk > 0) {
      var path = [[mouthP[0] - 10, mouthP[1] - 6], [mouthP[0] - 120, mouthP[1] - 90], [pom[0] - 120, pom[1] - 120], [pom[0], pom[1] - 8]];
      var p = VT.alongPts(path, VT.ease.io(rk)), r = 18 + 26 * Math.min(1, rk * 2);
      if (rk < 1) s += VT.g("translate(" + f(p[0]) + " " + f(p[1]) + ") rotate(" + f(-18 + rk * 30) + ")", VT.ell(0, 0, r, r * 0.6, "none", 14, { stroke: "#ffffff" }) + VT.ell(0, 0, r, r * 0.6, "none", 3, { stroke: "#9AAAB0" }));
      else {
        var wob = Math.sin((t - ringT1) * 14) * 3 * (1 - seg(t, ringT1, ringT1 + 0.6));
        s += VT.g("translate(" + f(pom[0]) + " " + f(pom[1] + 4) + ") rotate(" + f(-8 + wob) + ")", VT.ell(0, 0, 30, 12, "none", 13, { stroke: "#ffffff" }) + VT.ell(0, 0, 30, 12, "none", 3, { stroke: "#9AAAB0" }));
      }
    }
    var cam = sh === "A1" ? [key(T, [[0, 820], [A2, 850, "sine"]]), key(T, [[0, 560], [A2, 560]]), key(T, [[0, 1.08], [T_MINUS - 0.05, 1.12, "sine"], [T_MINUS + 0.08, 1.18, "out"], [A2, 1.2]])]
      : [key(T, [[A2, 1060], [B0, 1080, "sine"]]), key(T, [[A2, 600], [ringT1, 560, "io"], [B0, 560]]), key(T, [[A2, 1.2], [ringT1, 1.32, "io"], [B0, 1.36, "sine"]])];
    return { cam: cam, world: s, tint: "cold" };
  }

  function canhBat(t, T, sh) {
    var fill = sh === "D" ? key(t, [[T_COLD + 0.3, 0], [T_BUILT_E + 0.1, 0.5, "io"], [T_FILLS + 0.2, 0.62, "io"]]) : 0;
    var vo = {}; for (var k in V) vo[k] = V[k]; vo.fill = fill; vo.t = t; vo.coldColor = "#8EC3E6"; vo.groundColor = "#FBFDFE";
    var s = '<rect x="-600" y="-600" width="3120" height="2280" fill="#DCE6EE"/>' + VT.valley(vo);
    // trung tâm cũ trên chỗ cao (trái), trung tâm mới trong trũng (phải)
    var oldY = VT.valleyY(V, 400);
    s += K.nhaNho({ x: 250, y: oldY, s: 0.42, col: "#D9A441" }) + K.nhaNho({ x: 370, y: oldY, s: 0.38, col: "#E9DDC3" }) + K.nhaNho({ x: 480, y: oldY, s: 0.4, col: "#C9463A" });
    var nx = 1180, ny = 900;
    s += K.rect(nx - 170, ny - 70, nx + 30, ny, "#AFC6CE", { sw: 5, ox: 2, oy: 2 }) + VT.ell(nx - 70, ny - 70, 100, 30, "#BFD3DA", 5);
    for (var c = 0; c < 5; c++) s += VT.line("M " + (nx - 150 + c * 40) + " " + (ny - 60) + " L " + (nx - 150 + c * 40) + " " + ny, 3, "#1f2326", 0.4);
    s += VT.line("M " + (nx + 80) + " " + ny + " L " + (nx + 110) + " " + (ny - 200) + " L " + (nx + 140) + " " + ny + " M " + (nx + 92) + " " + (ny - 110) + " L " + (nx + 128) + " " + (ny - 110), 5) + VT.ell(nx + 110, ny - 214, 22, 22, "#FFFDF6", 4) + VT.line("M " + (nx + 110) + " " + (ny - 214) + " L " + (nx + 110) + " " + (ny - 228), 3);
    s += K.nhaNho({ x: nx + 230, y: ny, s: 0.36, col: "#7FA9C9" }) + K.nhaNho({ x: nx - 280, y: ny, s: 0.34, col: "#D9A441" });
    // nhiệt kế nhỏ không số
    var tShow = seg(t, T_WINTER - 0.2, T_WINTER + 0.2), lowK = seg(t, T_LOWER - 0.08, T_LOWER + 0.35);
    if (sh !== "C1" && tShow > 0) {
      s += VT.thermoMini({ x: 120, y: oldY - 4, s: 0.9 * VT.ease.back(tShow), level: 0.42, color: "#6FA9CF" });
      s += VT.thermoMini({ x: 900, y: ny - 10, s: 0.9 * VT.ease.back(tShow), level: 0.42 - 0.16 * VT.ease.io(lowK), color: "#6FA9CF" });
      if (lowK > 0 && lowK < 1) s += VT.arc([[960, ny - 190], [990, ny - 150], [960, ny - 110]], 5);
    }
    // khí lạnh chảy xuống từ sườn trái, phải (mũi tên lượn)
    if (sh === "D") {
      var ak = seg(t, T_COLD - 0.05, T_POOLS + 0.5);
      if (ak > 0) {
        s += VT.arrowWavy({ x0: 790, y0: oldY - 40, x1: 960, y1: ny - 130, k: ak, amp: 16, n: 4, color: "#4F86B0" });
        s += VT.arrowWavy({ x0: 1860, y0: VT.valleyY(V, 1860) - 140, x1: 1480, y1: ny - 120, k: ak, amp: 16, n: 4, color: "#4F86B0" });
      }
    }
    // Wob trên vành bát phía trung tâm cũ
    var wx = 650, wy = VT.valleyY(V, wx), o = { x: wx, y: wy, s: 0.5, mouth: "flat", brows: "flat", px: 10, py: 6 };
    if (sh === "C1") { o.px = key(t, [[C0, -8], [T_ACC + 0.6, -8], [T_STUDY_E, 12, "io"]]); o.armR = t > T_STUDY_E - 0.6 ? [400, 200] : undefined; o.handR = "chi"; }
    if (sh === "C2") { o.px = 12; o.py = 8; if (lowK > 0.3) { o.brows = "worried"; o.mouth = "wobbly"; } }
    var ladle = "";
    if (sh === "D") {
      var lvlY = V.y - V.depth * fill, sc = seg(t, T_WATER - 0.35, T_WATER + 0.2), up = seg(t, T_FILLS - 0.1, T_BOWL - 0.1);
      o.px = 12; o.py = 10; o.brows = fill > 0.3 ? "skeptic" : "flat";
      var bowlSvg = function (x, y, full) {
        var b = VT.shape("M " + f(x - 26) + " " + f(y) + " Q " + f(x) + " " + f(y + 34) + " " + f(x + 26) + " " + f(y) + " Z", "#AEB8BD", { sw: 5, ox: 1, oy: 1 });
        if (full) b += VT.ell(x, y - 2, 24, 8, "#E8F6FF", 3, { ox: 0, oy: 0 }) + VT.line("M " + f(x - 10) + " " + f(y - 10) + " q 7 -12 0 -24 M " + f(x + 8) + " " + f(y - 10) + " q 7 -12 0 -22", 4, "#4F86B0", 0.9);
        return b;
      };
      if (sc > 0 && up <= 0) { // thò muôi xuống múc
        var tipDown = [wx + 160, lvlY + 6], tip = [VT.lerp(wx + 120, tipDown[0], VT.ease.io(sc)), VT.lerp(wy - 70, tipDown[1], VT.ease.io(sc))], hp = [wx + 64, wy - 76];
        o.armR = VT.wobLocal(o, hp[0], hp[1]); o.handR = "nam";
        ladle = VT.line("M " + f(hp[0]) + " " + f(hp[1]) + " L " + f(tip[0]) + " " + f(tip[1] - 4), 10, "#1f2326") + VT.line("M " + f(hp[0]) + " " + f(hp[1]) + " L " + f(tip[0]) + " " + f(tip[1] - 4), 5, "#AEB8BD") + bowlSvg(tip[0], tip[1] - 4, sc >= 1);
      } else if (up > 0 && t < T_BOWL + 0.15) { // đưa muôi lên miệng (toạ độ hệ Wob)
        var e = VT.ease.io(up), bx = VT.lerp(440, 214, e), by = VT.lerp(330, 262, e), hx = VT.lerp(470, 350, e), hy = VT.lerp(300, 262, e);
        o.armR = [hx, hy]; o.handR = "nam";
        o.propFront = VT.line("M " + f(hx) + " " + f(hy) + " L " + f(bx + 40) + " " + f(by), 20, "#1f2326") + VT.line("M " + f(hx) + " " + f(hy) + " L " + f(bx + 40) + " " + f(by), 11, "#AEB8BD") +
          VT.g("translate(" + f(bx) + " " + f(by) + ") scale(2.1) translate(" + f(-bx) + " " + f(-by) + ")", bowlSvg(bx, by, true));
        if (up > 0.75) { o.mouth = "sip"; o.py = 8; o.px = 4; o.eyes = "closed"; }
      }
      if (t >= T_BOWL + 0.15) { o.armR = [360, 300]; o.handR = "nam"; o.propFront = VT.line("M 360 300 L 310 380", 20, "#1f2326") + VT.line("M 360 300 L 310 380", 11, "#AEB8BD") + VT.g("translate(300 384) scale(2) translate(-300 -384)", bowlSvg(300, 384, false)); }
      if (t >= T_BOWL) {
        o.shiver = 6; o.marks = "shiver"; o.eyes = "squint"; o.mouth = "chatter"; o.frost = t >= T_BOWL + 0.12; o.sq = key(t, [[T_BOWL, 1.06], [T_BOWL + 0.15, 0.94], [T_BOWL + 0.3, 1]]);
      }
    }
    s += W(t, o) + ladle;
    var cam;
    if (sh === "C1") cam = [key(T, [[C0, 700], [T_ACC + 0.5, 700], [C2, 1080, "io"]]), key(T, [[C0, 640], [C2, 640]]), key(T, [[C0, 1.25], [T_ACC + 0.5, 1.22], [C2, 0.98, "io"]])];
    else if (sh === "C2") cam = [key(T, [[C2, 1060], [D0, 1040]]), key(T, [[C2, 620], [D0, 620]]), key(T, [[C2, 0.98], [T_LOWER, 1.02, "sine"], [D0, 1.04]])];
    else cam = [key(T, [[D0, 1040], [T_WATER - 0.4, 1010], [T_FILLS, 760, "io"], [DUR, 750]]), key(T, [[D0, 620], [T_WATER - 0.4, 620], [T_FILLS, 600, "io"], [DUR, 598]]), key(T, [[D0, 1.04], [T_WATER - 0.4, 1.06], [T_FILLS, 1.72, "io"], [T_BOWL, 1.76, "sine"], [T_BOWL + 0.1, 1.84, "out"], [DUR, 1.86]])];
    return { cam: cam, world: s, tint: "cold", shake: sh === "D" ? VT.shake(T, T_BOWL + 0.05, 0.25, 4) : [0, 0] };
  }
};
