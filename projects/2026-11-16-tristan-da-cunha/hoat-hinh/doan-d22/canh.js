/* d22 · vẽ tay (261,262–273,198 s; 11,94 s). Vào "cat", ra "giay". Hồi ức, không khẩu hình. Không chữ.
 *  1. Cửa nhà chung: bảy tấm thẻ gỗ (không chữ) lần lượt treo lên thanh gỗ trên cửa; Wob chỉ từng tấm đếm, tấm thứ bảy đúng "seven".
 *  2. Sổ khách khổng lồ trên bàn: từng chữ ký nguệch ngoạc nảy thành nhà mái thấp có ống khói ("every signature turned into a family").
 *  3. Cận góc trang: Wob ký bằng bút chì ngắn, chữ ký nảy thành túp lều xiêu vẹo ("In pencil." boing).
 *  4. Cận mặt [giu-tinh-bo]: "Just in case." Wob rút cục tẩy cầm sẵn tay kia, nhìn thẳng người xem, giữ ~1 s; rồi phủ giấy.
 * Trang phục: áo mưa cam mũ trùm hạ, ba lô nhỏ ô liu; bút chì ngắn từ đầu, thêm cục tẩy ở cuối (cuối đoạn cầm cả hai).
 */
window.CANH = function (VT, D) {
  var B = window.VTB(VT, D), key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink, DUR = D.thoi_luong;
  var N1 = VT.nhip(1), N2 = VT.nhip(2);
  var T_SEVEN = VT.tu("seven"), T_PENCIL = VT.tu("pencil."), T_JUST = VT.tu("just"), T_CASE = VT.tu("case."), T_SIGNED = VT.tu("signed");
  var S3B = T_JUST - 0.12;               // cắt vào cận mặt
  var TAG_T = [], i;
  for (i = 0; i < 7; i++) TAG_T.push(0.25 + i * (T_SEVEN - 0.03 - 0.25) / 6);
  TAG_T.forEach(function (tt) { VT.sfx("pop", tt, 0.32); });
  var SIG = [[560, 650], [770, 690], [570, 780], [790, 815], [1110, 680], [1330, 655], [1120, 795], [1320, 770]];
  var HOUSE_T = SIG.map(function (p, j) { return N1 + 0.6 + j * 0.3; });
  var MY = [1300, 852], W_SIG0 = T_SIGNED + 0.1, W_SIG1 = T_PENCIL - 0.15, HUT_T = T_PENCIL;
  VT.sfx("boing", HUT_T - 0.02, 0.55);
  VT.sfx("pop", T_JUST + 0.12, 0.3);

  // ---------- cảnh 1: cửa nhà chung ----------
  var TAG_X = [], GROUND = 900;
  for (i = 0; i < 7; i++) TAG_X.push(585 + i * 68);
  function tag(j, t) {
    var k = seg(t, TAG_T[j], TAG_T[j] + 0.25);
    if (k <= 0) return "";
    var sw = Math.sin((t - TAG_T[j]) * 9) * 14 * Math.exp(-(t - TAG_T[j]) * 2.4), sc = VT.ease.back(k);
    var wood = ["#C68A55", "#B87A48", "#D09A62", "#BF8350", "#C9925C", "#B57744", "#CC955E"][j];
    var inner = VT.line("M 0 0 L 0 18", 3) + VT.shape("M -26 18 L 26 18 L 26 92 L -26 92 Z", wood, { sw: 5, ox: 3, oy: 3 }) + VT.dot(0, 28, 4) + VT.line("M -14 50 L 14 50 M -14 66 L 10 66", 3, "#8E5527", 0.7);
    return VT.g("translate(" + TAG_X[j] + " 548) rotate(" + f(sw) + ") scale(" + f(sc * 100) / 100 + ")", inner);
  }
  function world1(t) {
    var out = B.fill("#DCE6E4");
    out += VT.shape("M -1200 520 C -600 380 -200 330 200 300 C 420 290 520 420 620 470 L 620 980 L -1200 980 Z", "#8FA88A", { sw: 5, ox: 0, oy: 0 }); // sườn núi xa
    out += B.grass(GROUND);
    out += VT.shape("M 160 900 L 160 420 L 1260 420 L 1260 900 Z", "#F4F1EA", { sw: 6 });
    for (var y = 470; y < 890; y += 46) out += VT.line("M 172 " + y + " C 500 " + (y + 4) + " 900 " + (y - 3) + " 1248 " + (y + 2), 2.5, INK, 0.18);
    out += VT.shape("M 120 430 C 300 300 1120 300 1300 430 Z", "#5E7A4A", { sw: 6 });
    for (var x = 200; x < 1240; x += 60) out += VT.line("M " + x + " 420 L " + (x + 18) + " 350", 3, "#41583A", 0.6);
    out += VT.shape("M 690 900 L 690 650 L 870 650 L 870 900 Z", "#3F6A70", { sw: 6 }) + VT.dot(848, 780, 7, "#E8C25A");
    out += VT.shape("M 320 560 L 450 560 L 450 680 L 320 680 Z", "#9CC8DC", { sw: 5 }) + VT.shape("M 1040 560 L 1170 560 L 1170 680 L 1040 680 Z", "#9CC8DC", { sw: 5 });
    out += VT.shape("M 540 536 L 1040 536 L 1040 552 L 540 552 Z", "#8E5527", { sw: 5 });
    for (var j = 0; j < 7; j++) out += tag(j, t);
    return out;
  }
  function wob1(t) {
    var o = { t: t, s: 0.9, x: 1440, y: GROUND, flip: -1, mouth: "content", brows: "up", armL: [74, 300], handL: "nam" };
    var cur = -1; for (var j = 0; j < 7; j++) if (t >= TAG_T[j] - 0.05) cur = j;
    if (cur >= 0 && t < T_SEVEN + 0.5) {
      var loc = VT.wobLocal(o, TAG_X[cur], 600), sh = [312, 212], dx = loc[0] - sh[0], dy = loc[1] - sh[1], d = Math.hypot(dx, dy) || 1;
      o.armR = [sh[0] + dx / d * 128, sh[1] + dy / d * 128]; o.handR = "chi";
      o.bob = -12 * (1 - seg(t, TAG_T[cur], TAG_T[cur] + 0.2));
      o.px = -12; o.py = -10;
    } else if (t >= T_SEVEN + 0.5) { o.armR = [330, 60]; o.handR = "xoe"; o.mouth = "smile"; o.eyes = "happy"; o.bob = -6 * Math.abs(Math.sin((t - T_SEVEN) * 6)); }
    else { o.px = -10; o.py = -6; }
    var hp = VT.wobPt(o, o.armL[0], o.armL[1]);
    return B.wob(o) + VT.pencil({ x: hp[0] - 4, y: hp[1] + 26, len: 130, s: 0.55, rot: 14 });
  }

  // ---------- cảnh 2–3: sổ khách khổng lồ ----------
  function scribble(x, y, seed) {
    var pts = [];
    for (var k = 0; k < 9; k++) pts.push([x - 64 + k * 16, y + (k % 2 ? -16 : 8) * (0.7 + 0.6 * VT.hash(seed * 7 + k))]);
    return VT.smooth(pts, false);
  }
  function book(t) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="2100" fill="#E9DCC0"/>' + '<rect x="-1200" y="900" width="4320" height="1600" fill="#B98A5A"/>' + VT.line("M -1200 900 L 3100 900", 6);
    for (var x = -1100; x < 3100; x += 240) out += VT.line("M " + x + " 920 C " + (x + 80) + " 960 " + (x + 160) + " 1000 " + (x + 200) + " 1080", 3, "#8E5527", 0.35);
    out += VT.shape("M 380 548 L 960 588 L 1540 548 L 1566 900 L 960 920 L 354 900 Z", "#7A4A2A", { sw: 6, ox: 6, oy: 8 });
    out += VT.shape("M 410 560 C 600 572 800 586 955 602 L 955 902 L 392 884 Z", "#FBF4E2", { sw: 5 });
    out += VT.shape("M 965 602 C 1120 586 1320 572 1510 560 L 1528 884 L 965 902 Z", "#FBF4E2", { sw: 5 });
    out += VT.line("M 960 600 L 960 906", 5, INK, 0.6);
    for (var yy = 0; yy < 7; yy++) { var y0 = 620 + yy * 40; out += VT.line("M 430 " + (y0 - 8 + yy * 1.2) + " L 935 " + (y0 + 14) , 2, "#9CC8DC", 0.4) + VT.line("M 985 " + (y0 + 14) + " L 1500 " + (y0 - 8 + yy * 1.2), 2, "#9CC8DC", 0.4); }
    SIG.forEach(function (p, j) {
      var k = seg(t, HOUSE_T[j], HOUSE_T[j] + 0.28), sc = VT.ease.back(k);
      if (k < 1) out += VT.line(scribble(p[0], p[1], j + 1), 4.5, "#2c4f6e", 1 - k);
      if (k > 0) {
        var roofs = ["#5E7A4A", "#B5523A", "#5E7A4A", "#6F8A9A", "#B5523A", "#5E7A4A", "#6F8A9A", "#5E7A4A"];
        out += B.cot({ x: p[0], y: p[1] + 14, w: 112, s: sc, roof: roofs[j] });
        var sm = seg(t, HOUSE_T[j] + 0.25, HOUSE_T[j] + 1.4);
        if (sm > 0) { var cx0 = p[0] + 34, cy0 = p[1] - 72, st = Math.round(t * 12); out += VT.line("M " + cx0 + " " + cy0 + " c " + f(-8 + 4 * Math.sin(st)) + " -14 " + f(10 + 4 * Math.cos(st)) + " -24 0 -40 c -8 -12 6 -22 2 -30", 3.5, "#8A8F94", 0.55 * Math.min(1, sm * 3)); }
      }
    });
    // chữ ký của Wob + túp lều xiêu vẹo
    var ks = seg(t, W_SIG0, W_SIG1);
    var myPts = [[MY[0] - 60, MY[1]], [MY[0] - 40, MY[1] - 22], [MY[0] - 30, MY[1] + 8], [MY[0] - 6, MY[1] - 18], [MY[0] + 6, MY[1] + 10], [MY[0] + 26, MY[1] - 26], [MY[0] + 40, MY[1] + 6], [MY[0] + 62, MY[1] - 4]];
    var kh = seg(t, HUT_T - 0.05, HUT_T + 0.22);
    if (ks > 0 && kh < 1) out += VT.lineDraw(VT.smooth(myPts, false), ks, 4.5, "#5A5A5A", { op: 1 - kh });
    if (kh > 0) {
      var wob2 = Math.sin((t - HUT_T) * 10) * 6 * Math.exp(-(t - HUT_T) * 2.5);
      out += VT.g("translate(" + MY[0] + " " + (MY[1] + 12) + ") rotate(" + f(-9 + wob2) + ") scale(" + f(VT.ease.back(kh) * 100) / 100 + ")",
        VT.shape("M -34 0 L -30 -46 L 30 -40 L 34 0 Z", "#D8D2C4", { sw: 4 }) + VT.shape("M -44 -40 L -4 -78 L 42 -36 Z", "#A3814A", { sw: 4 }) + VT.line("M -24 -60 L 26 -58", 3, INK, 0.5) + VT.shape("M -8 0 L -8 -22 L 8 -22 L 8 0 Z", "#7A5A3C", { sw: 3 }));
    }
    return out;
  }
  function eraser(x, y, s, rot) {
    return VT.g(VT.tr(x, y, s, rot || 0), VT.shape("M -40 -22 C -40 -30 -34 -34 -26 -34 L 40 -34 L 40 22 L -26 22 C -34 22 -40 18 -40 10 Z", "#EE9AA8", { sw: 5 }) + VT.shape("M 6 -36 L 40 -36 L 40 24 L 6 24 Z", "#5A8FC0", { sw: 5 }));
  }
  function wob2(t) {
    var look = t < HOUSE_T[0] ? 0 : 1, o = { t: t, s: 0.5, x: 1680, y: 900, flip: -1, eyes: look ? "wide" : "open", mouth: look ? "o" : "content", brows: "up", px: -14, py: 8, armL: [74, 300], handL: "nam" };
    if (t > HOUSE_T[4]) { o.mouth = "smile"; o.eyes = "open"; o.bob = -8 * Math.abs(Math.sin((t - HOUSE_T[4]) * 7)); }
    var hp = VT.wobPt(o, 74, 300);
    return B.wob(o) + VT.pencil({ x: hp[0] - 4, y: hp[1] + 16, len: 130, s: 0.3, rot: 200 });
  }
  function wobSign(t) {
    var writing = t >= W_SIG0 - 0.25 && t < W_SIG1 + 0.1;
    var o = { t: t, s: 0.55, x: 1520, y: 902, flip: -1, mouth: writing ? "flat" : "smile", brows: writing ? "down" : "up", lean: writing ? -10 : 0 };
    var myK = seg(t, W_SIG0, W_SIG1), tip = VT.alongPts([[MY[0] - 60, MY[1]], [MY[0] - 30, MY[1] - 6], [MY[0], MY[1] - 4], [MY[0] + 30, MY[1] - 10], [MY[0] + 62, MY[1] - 4]], myK);
    tip = [tip[0], tip[1] + (writing ? 6 * Math.sin(t * 40) : 0)];
    if (!writing) tip = t < W_SIG0 ? [MY[0] - 40, MY[1] - 50] : [MY[0] - 10, MY[1] - 40];
    var hand = [tip[0] + 38, tip[1] - 46];
    o.armR = VT.wobLocal(o, hand[0], hand[1]); o.handR = "nam"; o.px = -10; o.py = 14;
    if (t >= HUT_T) { o.eyes = "wide"; o.mouth = "o"; o.py = 18; o.bob = -10 * (1 - seg(t, HUT_T, HUT_T + 0.3)); }
    return B.wob(o) + VT.pencilTo(hand, tip, { s: 0.42, over: 10 });
  }
  function wobDeadpan(t) {
    var kE = seg(t, T_JUST, T_JUST + 0.3), o = { t: t, s: 0.55, x: 1520, y: 902, flip: -1, noBlink: true, brows: "flat", mouth: "flat" };
    o.lid = 0.45 + 0.55 * VT.slowBlink(t, T_CASE + 0.55, 0.36);
    o.armR = [292, 30]; o.handR = "nam";                       // bút chì giơ cao (tay đã ký)
    var er = VT.key(t, [[T_JUST, [150, 330]], [T_JUST + 0.3, [10, 206], "back"]]);
    o.armL = er; o.handL = "nam";                               // cục tẩy rút ra cầm sẵn
    o.px = 0; o.py = 2;
    var hR = VT.wobPt(o, 292, 30), hL = VT.wobPt(o, er[0], er[1]);
    var out = VT.pencil({ x: hR[0] + 6, y: hR[1] - 50, len: 130, s: 0.42, rot: 190 }) + B.wob(o);
    if (kE > 0) out += eraser(hL[0] + 8, hL[1] - 10, 0.6, 10);
    return out;
  }

  return [
    { a: 0, b: N1, ten: "cửa nhà chung, bảy thẻ gỗ, Wob đếm", ve: function (t, lt, T) {
      return { cam: key(T, [[0, [960, 560, 1.0]], [N1, [930, 566, 1.06], "sine"]]), world: world1(t) + wob1(t), tint: "warm" };
    } },
    { a: N1, b: N2, ten: "sổ khách khổng lồ, chữ ký nảy thành nhà", ve: function (t, lt, T) {
      return { cam: key(T, [[N1, [1000, 720, 1.12]], [N2, [1000, 726, 1.19], "sine"]]), world: book(t) + wob2(t), tint: "warm" };
    } },
    { a: N2, b: S3B, ten: "cận góc trang: Wob ký bút chì, lều xiêu vẹo", ve: function (t, lt, T) {
      return { cam: key(T, [[N2, [1420, 760, 2.05]], [S3B, [1420, 770, 2.15], "sine"]]), shake: VT.shake(T, HUT_T, 0.25, 4), world: book(t) + wobSign(t), tint: "warm" };
    } },
    { a: S3B, b: DUR, ten: "cận mặt tỉnh bơ, cục tẩy cầm sẵn", ve: function (t, lt, T) {
      var c = [1490, 740];
      return { cam: key(T, [[S3B, [c[0], c[1], 2.75]], [DUR, [c[0], c[1] + 4, 2.9], "sine"]]), world: book(t) + wobDeadpan(t), tint: "warm" };
    } },
  ];
};
/* ---- Bộ trợ giúp chung nhóm B (thợ ve-tay B, tập Tristan da Cunha, 28/11/2026): chép y hệt vào đầu mỗi canh.js của d22 d24 d26 d27 d29 d33 d34 d40 d45 d49.
 * Khoá trang phục Wob tập 5: áo mưa vải dầu cam #E07A2E (viền/đường may #B85A1E, cúc gỗ #8A5A33), ba lô nhỏ ô liu (#7C8646 / #566030) của rig, giày đỏ gốc.
 * Thư viện chung chỉ có áo mưa vàng tập 3: đổi màu CỤC BỘ trong composition của đoạn (VT.AO_MUA), không sửa templates/.
 * Đạo cụ riêng tập (tôm hùm gai, khoai, tem, túi thư, quầy bưu điện, sóng âm…) vẽ ở đây, nhận tham số, gốc toạ độ ghi kèm. */
window.VTB = function (VT, D) {
  var B = {}, f = VT.f, INK = VT.C.ink, key = VT.key, seg = VT.seg;
  if (VT.AO_MUA) { VT.AO_MUA.vang = "#E07A2E"; VT.AO_MUA.toi = "#B85A1E"; }
  B.AO = "#E07A2E"; B.AO_TOI = "#B85A1E"; B.CUC = "#8A5A33"; B.OLIU = "#7C8646"; B.OLIU_TOI = "#566030";
  B.SEA = "#7E9AA2"; B.SEA_DEEP = "#5E7C86"; B.GRASS = "#9DB86A"; B.ROCK = "#6E6A66";

  /** smootherstep đối xứng (luot-smootherstep). */
  B.sm = function (k) { k = VT.clamp(k, 0, 1); return k * k * k * (k * (k * 6 - 15) + 10); };
  /** Wob mặc đồ tập 5. o.ao: true (áo mưa, mũ trùm hạ) | "hood" (mũ trùm lên) | false (đồ ở nhà). Tự chớp mắt trừ khi noBlink. */
  B.wob = function (o) {
    var b = {}, k;
    for (k in o) b[k] = o[k];
    if (b.ao === undefined) b.ao = true;
    if (b.ao) b.raincoat = { hood: b.ao === "hood", wet: b.wet || 0 };
    if (!b.noPack) b.packColor = "oliu";
    if (!b.noBlink && (!b.eyes || b.eyes === "open" || b.eyes === "wide")) b.lid = Math.max(b.lid || 0, VT.blink(b.t || 0, b.blinkP || 3.3, b.blinkO || 0.4));
    var s = VT.wob(b);
    if (b.ao) s = s.replace(/<circle cx="214" cy="(266|296)" r="6" fill="#1f2326"\/>/g, function (m, y) { return VT.ell(214, +y, 9, 9, B.CUC, 4, { ox: 1, oy: 1 }); });
    return s;
  };
  /** Ba lô nhỏ ô liu tháo rời (ôm trước ngực, dưới giường): gốc giữa đáy, cao ~190 ở s = 1. */
  B.balo = function (o) { return VT.backpack(o).replace(/#b8743a/g, B.OLIU).replace(/#8e5527/g, B.OLIU_TOI); };
  /** Khung viền mây "tưởng tượng" (lớp over). */
  B.dream = function (t) { return VT.dreamFrame(t, { inset: 44 }); };
  /** Chữ z ngủ vẽ bằng nét (không phải chữ): gốc giữa, s, op. */
  B.zz = function (x, y, s, op) { return VT.g(VT.tr(x, y, s, -8), VT.line("M -20 -20 L 20 -20 L -20 20 L 20 20", 7, INK, op == null ? 1 : op)); };
  /** Chuỗi z bay lên từ (x, y) theo t. */
  B.zzz = function (t, x, y, s) {
    var out = "";
    for (var i = 0; i < 3; i++) { var p = ((t * 0.7 + i / 3) % 1); out += B.zz(x + 60 * p * s + 16 * Math.sin(p * 9) * s, y - 170 * p * s, s * (0.5 + 0.7 * p), VT.clamp(1.3 - p * 1.3, 0, 1)); }
    return out;
  };
  /** Một vòng sóng âm vẽ tay (các cung đứt) tâm (cx, cy), bán kính r, độ mờ op. gap: [góc0, góc1] (độ, 0 = phải, chiều kim đồng hồ) phần KHÔNG vẽ (để né đầu Wob). */
  B.ring = function (cx, cy, r, op, gap, sw, col) {
    if (op <= 0.02 || r <= 2) return "";
    var out = "", n = 10;
    for (var i = 0; i < n; i++) {
      var a0 = i / n * 360 + 6, a1 = a0 + 360 / n - 14;
      if (gap) { var m = (a0 + a1) / 2; if ((gap[0] <= gap[1] && m >= gap[0] && m <= gap[1]) || (gap[0] > gap[1] && (m >= gap[0] || m <= gap[1]))) continue; }
      var r0 = a0 * Math.PI / 180, r1 = a1 * Math.PI / 180, rr = r * (1 + 0.03 * Math.sin(i * 2.7));
      out += '<path d="M ' + f(cx + Math.cos(r0) * rr) + " " + f(cy + Math.sin(r0) * rr) + " A " + f(rr) + " " + f(rr) + " 0 0 1 " + f(cx + Math.cos(r1) * rr) + " " + f(cy + Math.sin(r1) * rr) +
        '" fill="none" stroke="' + (col || INK) + '" stroke-width="' + (sw || 7) + '" stroke-linecap="round" opacity="' + f(op * 100) / 100 + '"/>';
    }
    return out;
  };
  /** Củ khoai: gốc tâm, s (dài ~90 ở s = 1), rot, seed. */
  B.potato = function (o) {
    var sd = o.seed || 1, pts = [];
    for (var i = 0; i < 10; i++) { var a = i / 10 * Math.PI * 2; pts.push([Math.cos(a) * (46 + 5 * VT.hash(sd + i)), Math.sin(a) * (32 + 4 * VT.hash(sd * 3 + i))]); }
    var out = VT.shape(VT.smooth(pts, true), "#C9A15E", { sw: 5, ox: 3, oy: 3 }) + VT.dot(-14, -8, 3.5, "#7A5A30") + VT.dot(12, 6, 3.5, "#7A5A30") + VT.dot(24, -10, 3, "#7A5A30");
    return VT.wrap(o, out);
  };
  /** Tôm hùm gai (không càng lớn, râu dài gai): nhìn nghiêng, gốc giữa bụng, đầu về +x, dài ~300 ở s = 1. t: chân bò (phase), walk 0/1, stand: dựng đứng trên đuôi (lính gác). shift: đổi chân 0..1. */
  B.lobster = function (o) {
    var t = o.t || 0, wk = o.walk ? Math.round(t * 12) : 0, out = "", C1 = o.col || "#C8502F", C2 = "#9E3A22", sh = o.shift || 0;
    // râu dài
    out += VT.line("M 118 -34 C 200 -120 290 -150 360 -120", 7, C2) + VT.line("M 112 -20 C 210 -80 300 -70 370 -40", 7, C2);
    out += VT.line("M 130 -34 C 160 -60 190 -64 210 -50", 5) + VT.line("M 126 -24 C 156 -40 186 -36 204 -22", 5);
    // chân
    for (var i = 0; i < 5; i++) {
      var x = 70 - i * 26, ph = Math.sin(wk * 1.1 + i * 1.3) * (o.walk ? 12 : 0) + (i === 1 ? -sh * 18 : 0);
      out += VT.line("M " + x + " 6 L " + f(x + 10 + ph) + " 34 L " + f(x - 2 + ph) + " 56", 5);
    }
    // đuôi đốt + quạt đuôi
    var tail = "";
    for (var j = 0; j < 5; j++) { var x0 = -20 - j * 34; tail += VT.shape("M " + x0 + " -30 C " + (x0 - 20) + " -38 " + (x0 - 34) + " -26 " + (x0 - 36) + " -6 L " + (x0 - 32) + " 16 C " + (x0 - 18) + " 24 " + (x0 - 4) + " 20 " + x0 + " 14 Z", j % 2 ? C1 : "#D9643C", { sw: 5, ox: 2, oy: 2 }); }
    tail += VT.shape("M -190 -10 L -244 -46 L -236 -6 L -250 32 L -190 10 Z", C1, { sw: 5, ox: 2, oy: 2 });
    out += tail;
    // mai có gai
    out += VT.shape("M -24 -34 C 20 -50 90 -50 126 -30 C 142 -16 140 8 120 16 C 80 26 10 24 -24 16 Z", C1, { sw: 6 });
    for (var g = 0; g < 6; g++) { var gx = -10 + g * 22; out += VT.shape("M " + gx + " -40 L " + (gx + 6) + " -56 L " + (gx + 12) + " -42 Z", "#EFD0A0", { sw: 3, ox: 0, oy: 0 }); }
    for (var h = 0; h < 7; h++) out += VT.dot(-6 + h * 19, -10 + (h % 2) * 12, 4, "#F2D8B0");
    out += VT.ell(118, -36, 9, 9, "#FFFDF6", 4, { ox: 0, oy: 0 }) + VT.dot(120, -36, 4);
    var tr = o.stand ? "rotate(" + (o.flipX ? 90 : -90) + ")" : "";
    return VT.wrap(o, tr ? VT.g(tr, out) : out);
  };
  /** Tem có răng cưa: gốc tâm, w, h, design (hàm vẽ trong khung ±w/2 ±h/2), perf 0..1 (răng cưa mọc dần), col nền. */
  B.stamp = function (o) {
    var w = o.w || 150, h = o.h || 180, k = o.perf == null ? 1 : o.perf, out = "", r = 7, step = 18, hw = w / 2, hh = h / 2;
    var bg = o.col || "#FFFDF6";
    out += '<rect x="' + f(-hw) + '" y="' + f(-hh) + '" width="' + w + '" height="' + h + '" fill="' + bg + '"/>';
    if (k > 0) {
      var paper = o.paper || "#EFE3C8";
      for (var x = -hw + step / 2; x < hw; x += step) { out += VT.dot(x, -hh, r * k, paper) + VT.dot(x, hh, r * k, paper); }
      for (var y = -hh + step / 2; y < hh; y += step) { out += VT.dot(-hw, y, r * k, paper) + VT.dot(hw, y, r * k, paper); }
    }
    out += '<rect x="' + f(-hw + 4) + '" y="' + f(-hh + 4) + '" width="' + (w - 8) + '" height="' + (h - 8) + '" fill="none" stroke="' + INK + '" stroke-width="' + (k > 0.5 ? 4 : 5) + '" stroke-linejoin="round" opacity="' + (k > 0.5 ? 0.35 : 0.9) + '"/>';
    out += '<rect x="' + f(-hw + 16) + '" y="' + f(-hh + 16) + '" width="' + (w - 32) + '" height="' + (h - 32) + '" fill="none" stroke="' + INK + '" stroke-width="4"/>';
    if (o.design) out += o.design(w - 40, h - 40);
    return VT.wrap(o, out);
  };
  /** Chín hình mẫu tem nét mực đen trắng (KHÔNG chim cánh cụt, KHÔNG mệnh giá): B.TEM[i](w, h) trả SVG quanh gốc tâm. */
  var L = function (d, sw) { return VT.line(d, sw || 4); };
  B.TEM = [
    function (w, h) { return L("M " + f(-w * 0.45) + " " + f(h * 0.3) + " L " + f(-w * 0.1) + " " + f(-h * 0.25) + " L " + f(w * 0.1) + " " + f(-h * 0.25) + " L " + f(w * 0.45) + " " + f(h * 0.3)) + L("M -10 " + f(-h * 0.3) + " C -20 " + f(-h * 0.42) + " 6 " + f(-h * 0.44) + " -4 " + f(-h * 0.48), 3) + L("M " + f(-w * 0.5) + " " + f(h * 0.3) + " L " + f(w * 0.5) + " " + f(h * 0.3), 3); }, // núi lửa
    function (w, h) { return L("M " + f(-w * 0.42) + " 0 C " + f(-w * 0.2) + " " + f(h * 0.2) + " " + f(w * 0.2) + " " + f(h * 0.2) + " " + f(w * 0.42) + " 0 Z") + L("M -24 6 L -32 -18 M 0 8 L 0 -20 M 24 6 L 32 -18", 3) + L("M " + f(-w * 0.5) + " " + f(h * 0.28) + " q 15 -8 30 0 q 15 8 30 0 q 15 -8 30 0 q 15 8 30 0", 3); }, // thuyền dài
    function (w, h) { return L("M -40 " + f(h * 0.3) + " L -40 -2 L 40 -2 L 40 " + f(h * 0.3) + " Z") + L("M -50 0 C -30 -34 30 -34 50 0", 5) + L("M -10 " + f(h * 0.3) + " L -10 14 L 10 14 L 10 " + f(h * 0.3), 3) + L("M 22 10 L 32 10 L 32 20 L 22 20 Z", 3); }, // nhà mái thấp
    function (w, h) { return L("M -40 10 C -20 -6 20 -6 44 6 C 50 14 40 22 30 22 L -36 22 C -46 20 -48 14 -40 10 Z") + L("M 40 4 C 50 -20 60 -30 66 -40 M 36 4 C 30 -24 20 -36 8 -44", 3) + L("M -44 14 L -60 2 L -58 26 Z", 3); }, // tôm hùm
    function (w, h) { var s2 = ""; for (var i = -1; i <= 1; i++) s2 += L("M " + (i * 30 - 12) + " 20 C " + (i * 30 - 18) + " 0 " + (i * 30 + 18) + " 0 " + (i * 30 + 12) + " 20 Z", 3); return s2 + L("M -50 22 L 50 22", 3) + L("M -40 -10 C -20 -30 20 -30 40 -10", 3); }, // khoai
    function (w, h) { return L("M -46 10 L 46 10 L 34 26 L -34 26 Z") + L("M 0 10 L 0 -40 M 0 -40 L 30 0 L 0 0 M 0 -36 L -26 0 L 0 0", 3); }, // tàu buồm
    function (w, h) { return L("M -50 0 C -36 -10 -24 -10 -10 0 C 4 10 16 10 30 0 C 40 -6 48 -6 54 -2", 4) + L("M -50 22 C -36 12 -24 12 -10 22 C 4 32 16 32 30 22", 3) + L("M -20 -20 C -6 -44 22 -44 34 -24", 3); }, // sóng
    function (w, h) { return L("M -50 14 C -30 -30 30 -30 50 14 Z") + L("M -10 -16 L 0 -34 L 10 -16", 3) + L("M -56 22 L 56 22", 3); }, // hòn đảo
    function (w, h) { return L("M -30 30 L -30 -20 L 30 -20 L 30 30") + L("M -38 -20 L 0 -46 L 38 -20", 4) + L("M 0 -46 L 0 -60 M -8 -54 L 8 -54", 3) + L("M -8 30 L -8 6 L 8 6 L 8 30", 3); }, // nhà thờ nhỏ
  ];
  /** Bưu thiếp (mặt viết): gốc tâm, w 300, h 200, stampDesign (chỉ số B.TEM), stampOff (ẩn tem). */
  B.postcard = function (o) {
    var w = o.w || 300, h = o.h || 200, hw = w / 2, hh = h / 2, out = VT.shape("M " + (-hw) + " " + (-hh) + " L " + hw + " " + (-hh) + " L " + hw + " " + hh + " L " + (-hw) + " " + hh + " Z", "#FBF4E2", { sw: 5, ox: 4, oy: 4 });
    out += VT.line("M 0 " + (-hh + 24) + " L 0 " + (hh - 20), 3, INK, 0.5);
    for (var i = 0; i < 4; i++) out += VT.line("M " + (-hw + 24) + " " + (-hh + 50 + i * 30) + " C " + (-hw + 60) + " " + (-hh + 42 + i * 30) + " " + (-30) + " " + (-hh + 56 + i * 30) + " -18 " + (-hh + 48 + i * 30), 3.5, "#2c4f6e", 0.8);
    for (var j = 0; j < 3; j++) out += VT.line("M 18 " + (hh - 70 + j * 24) + " L " + (hw - 20) + " " + (hh - 70 + j * 24), 3, INK, 0.45);
    if (!o.stampOff) out += B.stamp({ x: hw - 48, y: -hh + 54, w: 64, h: 78, design: function (ww, hh2) { return VT.g("scale(0.42)", B.TEM[o.stampDesign == null ? 0 : o.stampDesign](ww / 0.42, hh2 / 0.42)); }, paper: "#FBF4E2" });
    return VT.wrap(o, out);
  };
  /** Túi thư vải bố nâu nhạt, dây rút: gốc giữa đáy, cao ~260 ở s = 1. open 0..1 (miệng mở), label: chữ trên thẻ (chu_tren_do_vat), labelSize. */
  B.mailBag = function (o) {
    var op = o.open == null ? 0 : o.open, out = "", CB = "#D8C29A", CBD = "#B79E72";
    var neck = VT.lerp(26, 70, op);
    out += VT.shape("M -110 -10 C -130 -120 -90 -200 " + f(-neck) + " -220 L " + f(neck) + " -220 C 90 -200 130 -120 110 -10 C 80 6 -80 6 -110 -10 Z", CB, { sw: 6, ox: 6, oy: 5 });
    out += VT.line("M -70 -150 C -76 -100 -72 -50 -60 -16", 3, CBD) + VT.line("M 66 -140 C 74 -90 70 -50 60 -18", 3, CBD) + VT.line("M -20 -190 C -24 -120 -20 -60 -14 -10", 3, CBD, 0.7);
    if (op > 0.05) out += VT.ell(0, -222, neck, 12 + 10 * op, "#5E4A30", 5, { ox: 0, oy: 0 });
    else out += VT.shape("M -34 -226 C -10 -250 10 -250 34 -226 C 14 -214 -14 -214 -34 -226 Z", CB, { sw: 5 });
    out += VT.line("M " + f(-neck - 6) + " -204 C -20 -194 20 -194 " + f(neck + 6) + " -204", 6, "#8A6A3A") + VT.line("M " + f(neck + 4) + " -204 C " + f(neck + 26) + " -190 " + f(neck + 20) + " -170 " + f(neck + 34) + " -160", 5, "#8A6A3A");
    if (o.label) {
      var ls = o.labelSize || 60, lw = VT.textW(o.label, ls) + 40;
      out += VT.line("M " + f(neck + 34) + " -160 L " + f(neck + 40) + " -130", 4) + VT.shape("M " + f(-lw / 2) + " -130 L " + f(lw / 2) + " -130 L " + f(lw / 2) + " " + f(-130 + ls * 1.5) + " L " + f(-lw / 2) + " " + f(-130 + ls * 1.5) + " Z", "#FFFDF6", { sw: 5 }) +
        VT.text(0, -130 + ls * 1.1, o.label, ls, { fill: "#2c4f6e" });
    }
    return VT.wrap(o, out);
  };
  /** Đồng xu: gốc tâm, r 30. */
  B.coin = function (o) { return VT.wrap(o, VT.ell(0, 0, o.r || 30, (o.r || 30) * (o.flat || 1), "#E8C25A", 5, { ox: 2, oy: 2 }) + VT.ell(0, 0, (o.r || 30) * 0.62, (o.r || 30) * 0.62 * (o.flat || 1), null, 3)); };
  /** Nhà Tristan mái thấp (tường đá quét vôi, mái xanh rêu/đỏ, ống khói): gốc giữa đáy, w 200. */
  B.cot = function (o) {
    var w = o.w || 200, h = w * 0.42, hw = w / 2, rf = o.roof || "#5E7A4A", out = "";
    if (o.chimney !== false) out += VT.shape("M " + f(hw * 0.5) + " " + f(-h - 30) + " L " + f(hw * 0.5) + " " + f(-h - 70) + " L " + f(hw * 0.72) + " " + f(-h - 70) + " L " + f(hw * 0.72) + " " + f(-h - 20) + " Z", "#D8D2C4", { sw: 5 });
    out += VT.shape("M " + (-hw) + " 0 L " + (-hw) + " " + f(-h) + " L " + hw + " " + f(-h) + " L " + hw + " 0 Z", o.wall || "#F4F1EA", { sw: 5 });
    out += VT.shape("M " + f(-hw - 14) + " " + f(-h + 4) + " C " + f(-hw * 0.6) + " " + f(-h - 56) + " " + f(hw * 0.6) + " " + f(-h - 56) + " " + f(hw + 14) + " " + f(-h + 4) + " Z", rf, { sw: 5 });
    out += VT.shape("M -12 0 L -12 " + f(-h * 0.6) + " L 12 " + f(-h * 0.6) + " L 12 0 Z", o.door || "#3F6A70", { sw: 4 });
    out += VT.shape("M " + f(-hw * 0.7) + " " + f(-h * 0.7) + " L " + f(-hw * 0.4) + " " + f(-h * 0.7) + " L " + f(-hw * 0.4) + " " + f(-h * 0.4) + " L " + f(-hw * 0.7) + " " + f(-h * 0.4) + " Z", o.lit ? "#F6C46A" : "#9CC8DC", { sw: 3 });
    out += VT.shape("M " + f(hw * 0.4) + " " + f(-h * 0.7) + " L " + f(hw * 0.7) + " " + f(-h * 0.7) + " L " + f(hw * 0.7) + " " + f(-h * 0.4) + " L " + f(hw * 0.4) + " " + f(-h * 0.4) + " Z", o.lit ? "#F6C46A" : "#9CC8DC", { sw: 3 });
    return VT.wrap(o, out);
  };
  /** Mặt đất cỏ vẽ tay từ y xuống (phủ rộng để camera lia). */
  B.grass = function (y, col) { return '<rect x="-1200" y="' + f(y) + '" width="4320" height="2400" fill="' + (col || B.GRASS) + '"/>' + VT.line("M -1200 " + f(y) + " C -400 " + f(y - 10) + " 400 " + f(y + 8) + " 1200 " + f(y - 4) + " S 2600 " + f(y + 6) + " 3100 " + f(y), 6); };
  /** Nền giấy tông màu (bầu trời / tường) phủ rộng. */
  B.fill = function (col) { return '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + col + '"/>'; };
  /** Rung nhỏ theo bậc hình (vật đang ngân): trả [dx, dy] biên độ amp, tắt dần trong dur. */
  B.vib = function (t, t0, dur, amp) { if (t < t0 || t > t0 + dur) return 0; var k = 1 - (t - t0) / dur; return (Math.round(t * 12) % 2 ? 1 : -1) * amp * k; };
  return B;
};
/* ---- hết bộ trợ giúp chung ---- */
