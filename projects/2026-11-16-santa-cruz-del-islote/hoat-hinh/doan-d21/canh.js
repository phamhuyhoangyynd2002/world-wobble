/* d21 · vẽ tay (358,405–377,292 s; 18,887 s). Vào "cat", ra "cat". Hồi ức, không khẩu hình.
 * 1) Sơ đồ trên trang sổ (khung đầu đã đủ hình): cỗ máy hộp có quạt, hơi ẩm lượn đi vào, giọt nước lăn xuống bình chứa;
 *    Wob đội chồng mũ phù thuỷ giấy lên mũ cói, vẫy đũa ("magic").
 * 2) Bong bóng: cốc nước đá dưới mặt trời vẽ tay, giọt đọng chảy xuống; Wob tháo mũ phù thuỷ, gật gù.
 * 3) Sơ đồ NÉT ĐỨT (mới cân nhắc, chưa xây): tấm pin mặt trời → hộp, sóng biển vào, giọt nước ngọt ra; Wob cầm bút chì định tô liền nét đứt, ngập ngừng, không dám tô.
 * 4) Wob đứng trong chậu nhựa, cốc nhựa nhỏ đổ lên đầu: đúng ba giọt; chà xà phòng trịnh trọng; mũ cói treo móc, khăn vắt vai; giữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU, INK = VT.C.ink;
  var S2 = VT.nhip(1), S3 = VT.nhip(2), S4 = VT.nhip(3);
  var T_MACH = VT.tu("machine"), T_HUMID = VT.tu("humid"), T_MAGIC = VT.tu("magic."), T_TRICK = VT.tu("trick"), T_SWEAT = VT.tu("sweating"), T_SOLAR = VT.tu("solar-powered"), T_SEA = VT.tu("seawater"), T_DRINK = VT.tu("drinking", 1), T_SHOW = VT.tu("showered"), T_CUP = VT.tu("cup.");
  VT.sfx("ting", T_MAGIC + 0.02, 0.5);
  VT.sfx("drop", T_CUP + 0.12, 0.45);

  function page(t) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#E9DCC0"/>' + VT.shape("M 90 70 L 1830 70 L 1830 1010 L 90 1010 Z", "#FBF4E2", { sw: 6, ox: 10, oy: 12 });
    for (var y = 130; y < 1000; y += 60) out += VT.line("M 110 " + y + " L 1810 " + y, 2, "#9CC8DC", 0.3);
    return out;
  }
  function wand(x, y, rot, t) {
    return VT.g(VT.tr(x, y, 1, rot), VT.line("M 0 0 L 0 -150", 9, "#5B4B8A") + VT.g("translate(0 -170) scale(0.6)", VT.shape("M 0 -30 L 9 -9 L 30 -6 L 14 9 L 18 30 L 0 19 L -18 30 L -14 9 L -30 -6 L -9 -9 Z", "#F6D36A", { sw: 6, ox: 1, oy: 1 })));
  }
  var G = 900, WX = 560, WS = 0.95;
  function W(o) {
    var b = { s: WS, x: WX, y: G, sunhat: "coi", noPack: true, t: o.t };
    for (var k in o) b[k] = o[k];
    if (b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 3.0, 0.5));
    return VT.wob(b);
  }
  var shots = [];
  // 1 · máy hút ẩm, Wob phù thuỷ
  shots.push({ a: 0, b: S2, ten: "máy lấy nước từ không khí, Wob vẫy đũa", ve: function (t, lt, T) {
    var out = page(t), MX = 1260;
    out += VT.mayHutAm({ x: MX, y: G, s: 1.35, t: t, water: 0.15 + 0.6 * seg(t, 0.5, S2) });
    for (var i = 0; i < 3; i++) {
      var k = ((t * 0.5 + i / 3) % 1), y0 = 380 + i * 90;
      out += VT.arrowWavy({ x0: 760, y0: y0, x1: 1080, y1: 520, k: 1, amp: 18, n: 3, color: "#4FA3C7", head: 30, sw: 7 }).replace(/^/, "");
      out += VT.dot(VT.lerp(780, 1080, k), VT.lerp(y0, 520, k) + 16 * Math.sin(k * 18), 8, "#8fd0ea");
    }
    for (var j = 0; j < 2; j++) { var q = ((t * 0.9 + j * 0.5) % 1); out += VT.drop({ x: MX, y: G - 175 + 80 * q, s: 0.55 }); }
    var magic = t >= T_MAGIC - 0.1;
    var o = { t: t, mouth: magic ? "smile" : "content", eyes: magic ? "happy" : null, px: 12, py: -4, propFront: VT.muPhuThuy({ x: 200, y: 34, s: 0.62, rot: -6 }) };
    var wv = Math.sin(t * (magic ? 14 : 5));
    o.armR = [330 + 30 * wv, 110]; o.handR = "nam";
    var hp = VT.wobPt({ s: WS, x: WX, y: G }, o.armR[0], o.armR[1]);
    out += W(o) + wand(hp[0], hp[1] + 10, 30 + 20 * wv, t);
    if (magic) for (var s = 0; s < 4; s++) { var a = s * 1.6 + t * 3; out += VT.sparkle({ x: hp[0] + 120 + 90 * Math.cos(a), y: hp[1] - 200 + 60 * Math.sin(a), s: 0.35 + 0.1 * (s % 2) }); }
    var cam = key(T, [[0, [940, 580, 1.12]], [T_HUMID, [960, 580, 1.16], "sine"], [S2, [900, 600, 1.24], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 2 · bong bóng cốc nước đá
  shots.push({ a: S2, b: S3, ten: "cốc nước đá đổ mồ hôi, Wob gật gù", ve: function (t, lt, T) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#F7EED8"/>' + VT.sunBig({ x: 1450, y: 300, r: 110, t: t });
    out += '<rect x="-1200" y="840" width="4320" height="1600" fill="#E6CFA0"/>' + VT.line("M -1200 840 L 3100 840", 6);
    var GL = "M 820 360 L 1100 360 L 1070 840 L 850 840 Z";
    out += '<path d="' + GL + '" fill="#DDF3F6" opacity="0.8"/>' + '<path d="M 836 500 L 1084 500 L 1070 836 L 850 836 Z" fill="#8fd0ea" opacity="0.6"/>';
    [[880, 480, 10], [980, 520, -14], [920, 600, 6]].forEach(function (c) { out += VT.g(VT.tr(c[0], c[1], 1, c[2]), VT.shape("M -40 -40 L 40 -40 L 40 40 L -40 40 Z", "#F4FBFD", { sw: 5 })); });
    out += VT.line(GL, 7) + VT.line("M 850 400 L 870 800", 8, "#ffffff", 0.7);
    for (var i = 0; i < 6; i++) { var q = ((lt * 0.35 + i / 6) % 1), x = i % 2 ? 822 + 30 * q : 1098 - 30 * q, y = 420 + 400 * q; out += VT.drop({ x: x + (i % 2 ? -6 : 6), y: y, s: 0.55 }); }
    var off = seg(t, S2 + 0.3, S2 + 0.8), nod = t >= T_TRICK ? Math.abs(Math.sin((t - T_TRICK) * 6)) : 0;
    var o = { t: t, x: 420, y: 1010, s: 0.9, mouth: "content", px: 12, py: -2, lean: 6 * nod, bob: 10 * nod, eyes: t >= T_SWEAT ? "happy" : null };
    if (off < 1) { o.armR = [290, VT.lerp(60, 20, off)]; o.handR = "nam"; o.propFront = VT.muPhuThuy({ x: VT.lerp(200, 380, off), y: VT.lerp(34, -40, off), s: 0.62, rot: VT.lerp(-6, 40, off) }); }
    else o.propFront = "";
    out += W(o);
    if (off >= 1) out += VT.muPhuThuy({ x: 250, y: 1060, s: 0.5, rot: -80 });
    var cam = key(T, [[S2, [940, 620, 1.18]], [S3, [940, 620, 1.26], "sine"]]);
    return { cam: cam, world: out, over: VT.dreamFrame(t, { inset: 56 }), tint: "warm" };
  } });
  // 3 · sơ đồ nét đứt, không dám tô
  function dashed(d, sw, col) { return '<path d="' + d + '" fill="none" stroke="' + (col || INK) + '" stroke-width="' + (sw || 7) + '" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="22 18"/>'; }
  shots.push({ a: S3, b: S4, ten: "sơ đồ nét đứt, Wob ngập ngừng", ve: function (t, lt, T) {
    var out = page(t), k1 = seg(t, S3 + 0.1, T_SOLAR + 0.4), k2 = seg(t, T_SOLAR + 0.2, T_SEA), k3 = seg(t, T_SEA, T_DRINK + 0.3);
    if (k1 > 0) out += '<g opacity="' + VT.f(100 * k1) / 100 + '">' + VT.pinMatTroi({ x: 520, y: 640, s: 1.1, dashed: true }) + "</g>";
    if (k2 > 0) {
      out += '<g opacity="' + VT.f(100 * k2) / 100 + '">' + dashed("M 1000 360 L 1360 360 L 1360 640 L 1000 640 Z", 8) + dashed("M 1120 460 l 120 0 m -60 -60 l 0 120", 6) + dashed("M 690 400 C 800 330 900 340 1000 420", 6, "#C9603A") + "</g>";
      out += '<g opacity="' + VT.f(100 * k2) / 100 + '">' + dashed("M 620 820 q 50 -30 100 0 q 50 30 100 0 q 50 -30 100 0 q 50 30 100 0 L 1000 600", 7, "#2c4f6e") + dashed("M 960 580 L 1000 600 L 966 630", 7, "#2c4f6e") + "</g>";
    }
    if (k3 > 0) out += '<g opacity="' + VT.f(100 * k3) / 100 + '">' + dashed("M 1360 500 L 1520 500", 7, "#2c4f6e") + dashed("M 1600 420 C 1570 470 1556 500 1560 520 C 1566 550 1634 550 1640 520 C 1644 500 1630 470 1600 420 Z", 6, "#2c4f6e") + "</g>";
    var target = [1360, 520], appr = [[S4 - 3.1, 0], [S4 - 2.5, 1], [S4 - 2.0, 0.85], [S4 - 1.6, 0.3], [S4 - 1.2, 0.95], [S4 - 0.9, 0.2], [S4 - 0.6, 0]];
    var a = key(t, appr);
    var o = { t: t, x: 1180, y: 1060, s: 0.82, px: -10, py: -12, mouth: a > 0.5 ? "oSmall" : "flat", brows: a > 0.5 ? "worried" : "flat" };
    var hp = VT.wobPt(o, 250, 120), tip = [VT.lerp(hp[0] + 40, target[0] + 6, a), VT.lerp(hp[1] - 140, target[1] + 20, a)];
    o.armR = VT.wobLocal(o, VT.lerp(hp[0] + 20, tip[0] - 20, 0.4), VT.lerp(hp[1], tip[1] + 60, 0.4)); o.handR = "nam";
    var hand = VT.wobPt(o, o.armR[0], o.armR[1]);
    if (t >= S4 - 0.6) { o.marks = "sweat"; o.mouth = "wobbly"; }
    out += W(o) + VT.pencilTo(hand, tip, { s: 0.8 });
    var cam = key(T, [[S3, [980, 600, 1.08]], [T_SEA, [1020, 600, 1.12], "sine"], [S4 - 2.6, [1240, 640, 1.38], "io3"], [S4, [1250, 640, 1.44], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 4 · tắm bằng cốc
  shots.push({ a: S4, b: DUR, ten: "tắm ba giọt trong chậu nhựa", ve: function (t, lt, T) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#CFE6EA"/>';
    for (var x = -400; x < 2400; x += 110) out += VT.line("M " + x + " -200 L " + x + " 900", 3, "#9CC8DC", 0.8);
    for (var y = 0; y < 900; y += 110) out += VT.line("M -400 " + y + " L 2400 " + y, 3, "#9CC8DC", 0.8);
    out += '<rect x="-1200" y="900" width="4320" height="1600" fill="' + M.cement + '"/>' + VT.line("M -1200 900 L 3100 900", 6);
    out += VT.line("M 1180 560 L 1180 530 L 1210 530", 8) + VT.sunhat({ x: 1190, y: 600, s: 0.6, mau: "coi", rot: -8 });
    var BX = 900;
    out += VT.chauNhua({ x: BX, y: 920, s: 1.05, part: "back" });
    var scrub = t >= T_CUP + 0.5 ? Math.sin((t - T_CUP) * 16) : 0;
    var o = { t: t, x: BX, y: 880, s: 0.92, sunhat: false, noPack: true, mouth: "flat", brows: "flat", eyes: "closed", noBlink: true };
    o.armR = [300, 20]; o.handR = "nam";
    o.armL = t >= T_CUP + 0.4 ? [150 + 40 * scrub, 200 + 20 * scrub] : [60, 290]; o.handL = "nam";
    o.propFront = VT.shape("M 236 178 C 280 150 336 170 350 214 L 356 312 L 318 316 L 316 236 C 300 210 270 204 246 214 Z", "#F6EEDC", { sw: 5 }) + VT.line("M 320 270 L 354 268 M 318 292 L 356 290", 5, "#2A9D8F");
    out += VT.wob(o);
    var cp = VT.wobPt(o, 300, 20), tilt = VT.ease.io(seg(t, T_SHOW - 0.2, T_CUP));
    out += VT.cocNhua({ x: cp[0] + 10, y: cp[1] - 10, s: 0.9, rot: -150 * tilt });
    if (t >= T_CUP + 0.4) { var sp = VT.wobPt(o, o.armL[0], o.armL[1]); out += VT.shape(VT.rrect(sp[0] - 34, sp[1] - 20, sp[0] + 34, sp[1] + 20, 10), "#F6E7A6", { sw: 4 }); out += VT.ell(sp[0] + 40, sp[1] - 30, 18, 16, "#ffffff", 3) + VT.ell(sp[0] - 30, sp[1] - 44, 12, 11, "#ffffff", 3); }
    [0, 0.2, 0.4].forEach(function (d, i) { var k = seg(t, T_CUP + d, T_CUP + d + 0.35); if (k > 0 && k < 1) { var head = VT.wobPt(o, 230 - i * 30, 40); out += VT.drop({ x: cp[0] - 20 - i * 8, y: VT.lerp(cp[1] + 20, head[1] + 20, VT.ease.in2(k)), s: 0.6 }); } });
    out += VT.chauNhua({ x: BX, y: 920, s: 1.05, part: "front" });
    var head2 = VT.wobPt(o, 200, 150);
    var cam = key(T, [[S4, [head2[0] + 60, head2[1] + 60, 1.55]], [T_CUP, [head2[0] + 60, head2[1] + 50, 1.65], "sine"], [DUR, [head2[0] + 60, head2[1] + 50, 1.72], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
