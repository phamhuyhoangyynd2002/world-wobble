/* d21 · vẽ tay, trang sổ lịch sử (232,542–261,262 s; 28,72 s). Vào "cat", ra "cat". Hồi ức, không khẩu hình.
 * Khung trang lịch sử tông sepia ở giữa trang sổ; Wob (áo mưa cam, mũ trùm hạ, ba lô nhỏ) và hòn đá nhỏ của Wob đứng NGOÀI mép khung
 * bên phải, không bước vào cảnh, không chào, kéo hay chạm người thật nào. Người: người que/giấy chung, nhỏ, KHÔNG mặt chi tiết.
 * A) Thoả ước: ba bàn tay que cùng ký một tờ giấy (nét nguệch ngoạc, không chữ); đàn bò, bao hàng, đồng xu tự chia ba đống
 *    bằng nhau đúng "animals", "stores", "profits".
 * B) Ba người que đứng ngang hàng; Wob ở mép trang lén đứng lên hòn đá cho cao hơn, nhìn lại, lặng lẽ bước xuống.
 * C) Trang hòn đảo có bến: tàu giấy thứ nhất ghé, người que xách túi đi vào làng → Wob đánh dấu bút chì 1 lên mép hình;
 *    mảnh ván dạt vào, người que thứ hai trèo lên bến (một việc duy nhất); tàu thứ ba, thứ tư (hình cá voi trên buồm, không cờ)
 *    thả thêm hai người → dấu 2, 3, 4, Wob gõ đầu bút đếm lại bốn dấu.
 * D) Tàu giấy từ phía bắc, năm người que bước xuống bến; trang trọng, không gag; thẻ 1827.
 * E) Xa xa tàu giấy bốc khói mắc cạn (ITALIA trên mạn khi cận); hai người que lội lên bờ, người trên bờ ra đón; thẻ 1892.
 */
window.CANH = function (VT, D) {
  // ===== CHUNG NHÓM A (tập 5 Tristan da Cunha, dung-ve-tay nhóm A) =====
  // Khoá trang phục và bối cảnh dùng lại giữa các đoạn của nhóm A. Viết CỤC BỘ trong canh.js (không sửa lib dùng chung).
  var f = VT.f, INK = VT.C.ink, key = VT.key, seg = VT.seg, DUR = D.thoi_luong;
  // Áo mưa vải dầu cam #E07A2E (khoá trang phục tập 5): rig ve-tay chỉ có áo mưa vàng tập 3, đổi màu cục bộ đoạn này.
  VT.AO_MUA = { vang: "#E07A2E", toi: "#B85A1E" };
  var AO = { cam: "#E07A2E", vien: "#B85A1E", cuc: "#8A5A33" };
  var GIAY = "#FBF4E2", SEPIA = "#EADCBC", XAM = "#93A4A8", XAM_SAU = "#6E8389", COT = "#C9463A";
  function rectD(x0, y0, x1, y1) { return "M " + f(x0) + " " + f(y0) + " L " + f(x1) + " " + f(y0) + " L " + f(x1) + " " + f(y1) + " L " + f(x0) + " " + f(y1) + " Z"; }
  /** Hai cúc gỗ #8A5A33 trên áo mưa (hệ Wob). */
  function cucGo() { return VT.ell(214, 266, 9, 9, AO.cuc, 3.5, { ox: 1, oy: 1 }) + VT.ell(214, 298, 9, 9, AO.cuc, 3.5, { ox: 1, oy: 1 }); }
  /** Mũ trùm vẽ rời (hệ Wob), nhấc lên dy px, nghiêng rot độ (cho cú nhấc mũ chào). */
  function muTrum(dy, rot, wet) {
    var g = VT.line("M 74 214 C 46 36 354 36 326 214", 40, AO.cam) + VT.line("M 54 214 C 24 14 376 14 346 214", 6) + VT.line("M 96 210 C 74 66 326 66 304 210", 5) + VT.line("M 84 200 C 64 60 336 60 316 200", 3, AO.vien, 0.8);
    if (wet) g += VT.shape("M 120 60 c -5 9 -7 14 -5 18 c 3 5 10 5 12 0 c 2 -4 0 -9 -7 -18 Z", "#8fd0ea", { sw: 3 });
    return VT.g("translate(0 " + f(-(dy || 0)) + ") rotate(" + f(rot || 0) + " 200 120)", g);
  }
  /** Wob mặc đồ chuyến đi (áo mưa cam, ba lô nhỏ ô liu cuộn thảm đỏ, giày đỏ). o.hood: mũ trùm lên; o.wet; o.home: đồ ở nhà (không áo, không ba lô). */
  function wobDi(t, o) {
    var b = { t: t, packColor: "oliu" }, k;
    for (k in o) b[k] = o[k];
    if (o.home) { b.noPack = true; b.raincoat = false; }
    else {
      b.raincoat = { hood: !!o.hood && !o.hoodLift, wet: o.wet || 0 };
      b.prop = cucGo() + (o.hoodLift ? muTrum(o.hoodLift[0], o.hoodLift[1], o.wet) : "") + (o.prop || "");
    }
    if (b.lid == null) b.lid = 0;
    if (!o.noBlink && (!o.eyes || o.eyes === "open")) b.lid = Math.max(b.lid, VT.blink(t, 3.1, o.blinkOff || 0.4));
    return VT.wob(b);
  }
  /** Trang sổ phác (giấy kem, dòng kẻ xanh nhạt, gáy lò xo trái). */
  function trangSo(x0, y0, x1, y1, o) {
    o = o || {};
    var out = VT.shape(rectD(x0, y0, x1, y1), o.fill || GIAY, { sw: 6, ox: 10, oy: 12 });
    if (o.ke !== false) for (var y = y0 + 60; y < y1 - 20; y += 60) out += VT.line("M " + f(x0 + 24) + " " + y + " L " + f(x1 - 20) + " " + y, 2, "#9CC8DC", 0.35);
    if (o.lo !== false) for (var i = 0, n = Math.floor((y1 - y0 - 60) / 75); i <= n; i++) out += VT.ell(x0, y0 + 40 + i * 75, 16, 22, "none", 5);
    return out;
  }
  /** Khung trang lịch sử (giấy sepia, viền đôi). */
  function khungSepia(x0, y0, x1, y1) {
    return VT.shape(rectD(x0, y0, x1, y1), SEPIA, { sw: 7, ox: 9, oy: 10 }) + VT.line(rectD(x0 + 18, y0 + 18, x1 - 18, y1 - 18), 3, "#7A5A3C", 0.6);
  }
  /** Biển xám có sóng (toạ độ thế giới, từ y xuống). o: {x0, x1, col, n}. */
  function bienXam(y, t, o) {
    o = o || {};
    var x0 = o.x0 == null ? -1400 : o.x0, x1 = o.x1 == null ? 3300 : o.x1, W = x1 - x0, st = Math.round(t * 12), out = "";
    out += '<rect x="' + x0 + '" y="' + f(y) + '" width="' + W + '" height="2600" fill="' + (o.col || XAM) + '"/>';
    out += '<rect x="' + x0 + '" y="' + f(y + 170) + '" width="' + W + '" height="2600" fill="' + XAM_SAU + '" opacity="0.45"/>';
    var d = "M " + x0 + " " + f(y);
    for (var x = x0; x < x1; x += 70) d += " Q " + f(x + 35) + " " + f(y - 9 + 5 * Math.sin(st * 0.55 + x * 0.013)) + " " + f(x + 70) + " " + f(y);
    out += VT.line(d, 6);
    for (var i = 0; i < (o.n || 18); i++) {
      var xx = x0 + (((VT.hash(i * 3.3) * W + st * 4 * (i % 2 ? 1 : -1)) % W) + W) % W, yy = y + 34 + VT.hash(i * 1.7) * (o.depth || 300);
      out += VT.line("M " + f(xx) + " " + f(yy) + " q 24 -11 48 0 q 24 11 48 0", 4, "#56696F", 0.6);
    }
    return out;
  }
  /** Sóng kẻ nét mực trên trang sổ (không tô): hàng sóng nhỏ quanh điểm (x, y). k vẽ dần. */
  function songKe(x, y, n, k, t) {
    var out = "", st = Math.round((t || 0) * 12);
    for (var i = 0; i < n; i++) {
      var xx = x + (VT.hash(i * 2.7) - 0.5) * 900, yy = y + (VT.hash(i * 5.1) - 0.5) * 160, sh = Math.sin(st * 0.6 + i) * 4;
      out += VT.lineDraw("M " + f(xx + sh) + " " + f(yy) + " q 20 -12 40 0 q 20 12 40 0", VT.clamp(k * n - i * 0.6, 0, 1), 4, "#2c4f6e");
    }
    return out;
  }
  /** Đường mây múi tròn: các điểm trên elip (rx, ry, tâm cx, cy) nối bằng cung lồi ra ngoài. */
  function mayMui(cx, cy, rx, ry, n, seed) {
    var pts = [], d = "";
    for (var i = 0; i < n; i++) { var a = Math.PI * 2 * i / n + (seed || 0) * 0.1; pts.push([cx + Math.cos(a) * rx * (0.95 + 0.1 * VT.hash(i + (seed || 0))), cy + Math.sin(a) * ry * (0.95 + 0.1 * VT.hash(i * 3 + (seed || 0)))]); }
    d = "M " + f(pts[0][0]) + " " + f(pts[0][1]);
    for (var j = 1; j <= n; j++) { var p = pts[(j - 1) % n], q = pts[j % n], L = Math.hypot(q[0] - p[0], q[1] - p[1]); d += " A " + f(L * 0.62) + " " + f(L * 0.62) + " 0 0 1 " + f(q[0]) + " " + f(q[1]); }
    return d + " Z";
  }
  /** Mây quấn đỉnh như cái mũ (múi tròn, phủ xuống ôm đỉnh). Gốc = đỉnh núi. lift: nhấc lên (px), rot: nghiêng chào. */
  function mayMu(cw, o) {
    o = o || {};
    var RX = cw * 3.1, RY = cw * 1.05, cy = -cw * 0.2;
    var sh = VT.shape(mayMui(0, cy, RX, RY, 11, 2), "#FFFDF6", { sw: o.sw || 6, ox: 6, oy: 6 }) +
      VT.line("M " + f(-RX * 0.55) + " " + f(cy + RY * 0.3) + " C " + f(-RX * 0.2) + " " + f(cy + RY * 0.55) + " " + f(RX * 0.25) + " " + f(cy + RY * 0.5) + " " + f(RX * 0.55) + " " + f(cy + RY * 0.25), 3, "#9AAAB0", 0.75);
    return VT.g("translate(0 " + f(-(o.lift || 0)) + ") rotate(" + f(o.rot || 0) + " " + f(RX) + " " + f(cy) + ")", sh);
  }
  /** Nhà mái tôn nhỏ (tường trắng, mái màu). Gốc giữa chân. */
  var MAI = ["#4F8A5B", "#C9463A", "#3F6E9A", "#4F8A5B", "#8E5527", "#3F6E9A", "#C9463A"];
  function nhaNho(x, y, s, mai, ink) {
    return VT.g(VT.tr(x, y, s), VT.shape(rectD(-34, -40, 34, 0), "#F4F1EA", { sw: ink || 4, ox: 2, oy: 2 }) + VT.shape("M -42 -38 L 0 -66 L 42 -38 Z", mai, { sw: ink || 4, ox: 2, oy: 2 }) + VT.shape(rectD(-8, -22, 8, 0), "#5c3a22", { sw: 3, ox: 0, oy: 0 }));
  }
  /** Núi lửa hình nón (gốc giữa chân trên mặt nước). o: {w, h, cloud: {lift, rot} | false, plateau, houses (số nhà), smoke (t), faint, col, ink}. */
  function nuiLua(o) {
    var w = o.w || 1000, h = o.h || 640, hw = w / 2, cw = w * 0.07, out = "", ink = o.ink || (o.faint ? 4 : 6), id = VT.uid("nl");
    var cone = "M " + f(-hw) + " 0 C " + f(-hw * 0.6) + " " + f(-h * 0.2) + " " + f(-cw * 2.2) + " " + f(-h * 0.78) + " " + f(-cw) + " " + f(-h) + " L " + f(cw) + " " + f(-h) + " C " + f(cw * 2.2) + " " + f(-h * 0.78) + " " + f(hw * 0.6) + " " + f(-h * 0.2) + " " + f(hw) + " 0 Z";
    out += '<clipPath id="' + id + '"><path d="' + cone + '"/></clipPath>';
    out += VT.shape(cone, o.col || "#7F9163", { sw: 0, ox: 7, oy: 5 });
    out += '<g clip-path="url(#' + id + ')">';
    var yc = -h * 0.6, d = "M " + f(-hw) + " " + f(-h - 60) + " L " + f(hw) + " " + f(-h - 60);
    for (var i = 10; i >= 0; i--) { var x = -hw + w * i / 10; d += " L " + f(x) + " " + f(yc + Math.sin(i * 1.9) * h * 0.05 + (Math.abs(x) / hw) * h * 0.12); }
    out += '<path d="' + d + ' Z" fill="' + (o.scree || "#70665D") + '"/>';
    for (var g = 0; g < 9; g++) { var u = (g - 4) / 4.4, x0 = u * cw * 0.9, x1 = u * hw * 0.88; out += VT.line("M " + f(x0) + " " + f(-h + 6) + " Q " + f((x0 + x1) / 2 + Math.sin(g * 2.1) * 22) + " " + f(-h * 0.5) + " " + f(x1) + " " + f(-h * 0.07), Math.max(2, ink - 3), INK, 0.32); }
    if (o.cliff !== false) {
      out += '<rect x="' + f(-hw) + '" y="' + f(-h * 0.11) + '" width="' + w + '" height="' + f(h * 0.11 + 6) + '" fill="#4D4945"/>';
      for (var c = 0; c < 22; c++) { var cx = -hw + w * (c + 0.5) / 22; out += VT.line("M " + f(cx) + " " + f(-h * 0.105) + " L " + f(cx + 5) + " -4", 3, "#2C2A28", 0.6); }
    }
    out += "</g>" + VT.shape(cone, "none", { sw: ink });
    out += VT.line("M " + f(-cw) + " " + f(-h) + " Q 0 " + f(-h + 16) + " " + f(cw) + " " + f(-h), Math.max(2, ink - 1));
    if (o.plateau) {
      out += VT.shape("M " + f(-hw * 1.04) + " 2 L " + f(-hw * 1.0) + " " + f(-h * 0.045) + " L " + f(-hw * 0.3) + " " + f(-h * 0.05) + " L " + f(-hw * 0.2) + " 2 Z", "#9DBF6E", { sw: Math.max(2, ink - 1), ox: 3, oy: 2 });
      for (var n = 0; n < (o.houses || 0); n++) {
        var hx = -hw * 0.92 + n * (hw * 0.6 / Math.max(1, o.houses - 1)), hs = w / 1500;
        out += nhaNho(hx, -h * 0.045 + 2, hs * (0.9 + 0.2 * VT.hash(n)), MAI[n % MAI.length], Math.max(2.5, ink - 2));
      }
    }
    if (o.smoke != null) {
      var tt = Math.round(o.smoke * 12) / 12, sx = -hw * 0.25;
      for (var pi = 0; pi < 8; pi++) {
        var q = ((tt * 0.35 + pi / 8) % 1), px = sx + q * q * hw * 0.3 + Math.sin(q * 6 + pi) * 8, py = -h * 0.05 - q * h * 0.55;
        out += VT.puff({ x: px, y: py, s: (0.3 + 0.8 * q) * w / 1200, op: f(0.95 - q * 0.35), fill: "#E1E3E2" });
      }
    }
    if (o.cloud !== false) out += VT.g("translate(0 " + f(-h) + ")", mayMu(cw, o.cloud || {}));
    return VT.wrap(o, out);
  }
  /** Buồm vuông phồng (cho tàu buồm). */
  function buom(x, yT, yB, hw) { return VT.shape("M " + f(x - hw) + " " + f(yT) + " Q " + f(x) + " " + f(yT + 10) + " " + f(x + hw) + " " + f(yT) + " L " + f(x + hw * 0.92) + " " + f(yB) + " Q " + f(x + 6) + " " + f(yB + 22) + " " + f(x - hw * 0.92) + " " + f(yB) + " Z", "#F6EEDC", { sw: 5, ox: 3, oy: 3 }); }
  /** Tàu buồm vẽ tay KHÔNG cờ: gốc giữa đường nước, dài ~380, mũi về +x. o: {masts 2|3, broken (cột sau gãy), whale (hình cá voi trên buồm), hull, rot}. */
  function tauBuom(o) {
    var n = o.masts || 2, out = "", xs = n === 3 ? [-105, 5, 110] : [-60, 70];
    xs.forEach(function (x, i) {
      var H = (n === 3 ? i === 1 : i === 0) ? 310 : 250;
      if (o.broken && i === xs.length - 1) {
        out += VT.line("M " + x + " -40 L " + x + " -130", 10) + VT.line("M " + (x - 8) + " -130 l 5 -14 l 5 10 l 5 -12", 4);
        out += VT.g("rotate(70 " + x + " -132)", VT.line("M " + x + " -140 L " + x + " " + (-H), 10) + buom(x, -H + 30, -H + 120, 56));
        return;
      }
      out += VT.line("M " + x + " -40 L " + x + " " + (-H), 10);
      out += buom(x, -H + 26, -H + 118, 62) + buom(x, -H + 132, -H + 220 > -50 ? -60 : -H + 220, 70);
      if (o.whale && i === xs.length - 1) out += VT.g(VT.tr(x, -H + 100, 0.5), VT.shape("M -60 0 C -50 -30 30 -34 50 -6 L 74 -24 L 70 6 L 80 26 L 50 10 C 20 30 -50 26 -60 0 Z", "#5B7F96", { sw: 6 }) + VT.dot(-30, -6, 5));
    });
    out += VT.line("M " + xs[0] + " " + (-200) + " L -190 -46 M " + xs[xs.length - 1] + " -230 L 205 -48", 3, INK, 0.6);
    out += VT.shape("M -190 -50 L 205 -50 C 184 -8 150 12 116 18 L -150 18 C -172 2 -184 -22 -190 -50 Z", o.hull || "#8E5527", { sw: 6 });
    out += VT.line("M -184 -32 L 196 -32", 4, "#F6EEDC", 0.75);
    return VT.wrap(o, out);
  }
  /** Tàu giấy (gấp kiểu thuyền giấy) cỡ lớn: gốc giữa đáy, rộng ~300. o: {whale, name (chữ trên mạn), nameSize, smoke (t), col}. */
  function tauGiay(o) {
    var c = o.col || "#FFFDF6", out = "";
    if (o.smoke != null) {
      var st = Math.round(o.smoke * 12);
      for (var i = 0; i < 4; i++) { var q = ((st / 12) * 0.5 + i / 4) % 1; out += VT.puff({ x: -10 + 60 * q + Math.sin(i * 2) * 10, y: -170 - 220 * q, s: 0.5 + 0.9 * q, op: f(0.85 * (1 - q)), fill: "#9AA2A4" }); }
    }
    out += VT.shape("M -80 -64 L 0 -200 L 80 -64 Z", c, { sw: 5, ox: 4, oy: 3 }) + VT.line("M 0 -200 L 0 -64", 3, INK, 0.5);
    if (o.whale) out += VT.g(VT.tr(0, -112, 0.42), VT.shape("M -60 0 C -50 -30 30 -34 50 -6 L 74 -24 L 70 6 L 80 26 L 50 10 C 20 30 -50 26 -60 0 Z", "#5B7F96", { sw: 7 }) + VT.dot(-30, -6, 6));
    out += VT.shape("M -150 -64 L 150 -64 L 104 0 L -104 0 Z", c, { sw: 5, ox: 4, oy: 3 }) + VT.line("M -128 -34 L 128 -34", 3, INK, 0.3);
    if (o.name) out += VT.text(0, -18, o.name, o.nameSize || 40, { fill: "#2c4f6e" });
    return VT.wrap(o, out);
  }
  // ===== HẾT PHẦN CHUNG =====

  var T_SIGN = VT.tu("signed"), T_ANI = VT.tu("animals,"), T_STO = VT.tu("stores"), T_PRO = VT.tu("profits."), T_NOB = VT.tu("nobody"), T_STAND = VT.tu("stand"), T_OTH = VT.tu("others.");
  var T_OTHERS = VT.tu("others", 1), T_HAST = VT.tu("hastings."), T_DUTCH = VT.tu("dutchman"), T_WHALER = VT.tu("whaler,"), T_CAPT = VT.tu("captain."), T_1827 = VT.tu("eighteen", 0), T_FIVE = VT.tu("five");
  var T_1892 = VT.tu("eighteen", 1), T_TWO = VT.tu("two", 1), T_ASH = VT.tu("ashore"), T_ITA = VT.tu("italia,"), T_STAY = VT.tu("stayed.");
  var B1 = 3.6, B2 = T_NOB - 0.08, B3 = T_OTHERS - 0.1, B4 = T_1827 - 0.12, B5 = T_1892 - 0.12;
  var SPLIT = [T_ANI - 0.05, T_STO - 0.05, T_PRO - 0.05];
  var UP0 = T_STAND - 0.6, UP1 = UP0 + 0.3, DN0 = T_OTH + 0.3, DN1 = DN0 + 0.35;
  var MARK = [T_HAST + 0.15, T_WHALER + 0.05, T_WHALER + 0.75, T_CAPT + 0.05], COUNT0 = T_CAPT + 0.45, COUNT1 = B4 - 0.1;
  SPLIT.forEach(function (x) { VT.sfx("pop", x, 0.45); });
  VT.sfx("pop", T_1827, 0.35); VT.sfx("pop", T_1892, 0.35);
  // khung trang lịch sử
  var F = [130, 80, 1480, 940], FIN = [F[0] + 18, F[1] + 18, F[2] - 18, F[3] - 18];
  var WX = 1640, WY = 965, WS = 0.72, DA = [1555, 965];
  var PEO = "#F3E6C8", SEA_Y = 700;
  function khung(inner) {
    var id = VT.uid("ls");
    return khungSepia(F[0], F[1], F[2], F[3]) + '<clipPath id="' + id + '"><path d="' + rectD(FIN[0], FIN[1], FIN[2], FIN[3]) + '"/></clipPath><g clip-path="url(#' + id + ')">' + inner + "</g>";
  }
  function nguoi(x, y, s, ph, bag) { return VT.stickPerson({ x: x, y: y, s: s, phase: ph || 0, fill: PEO }) + (bag ? VT.shape("M " + f(x + 30 * s) + " " + f(y - 120 * s) + " L " + f(x + 66 * s) + " " + f(y - 120 * s) + " L " + f(x + 60 * s) + " " + f(y - 70 * s) + " L " + f(x + 34 * s) + " " + f(y - 70 * s) + " Z", "#B89A5E", { sw: 4 }) : ""); }
  function bo(x, y, s) { return VT.g(VT.tr(x, y, s), VT.shape("M -60 -80 C -60 -110 50 -110 56 -80 L 56 -40 C 50 -24 -54 -24 -60 -40 Z", "#F6EEDC", { sw: 5 }) + VT.ell(-20, -76, 14, 10, "#3a3330", 0) + VT.ell(26, -54, 12, 9, "#3a3330", 0) + VT.shape("M 52 -96 C 86 -104 96 -70 76 -60 L 56 -62 Z", "#F6EEDC", { sw: 5 }) + VT.line("M -46 -34 L -48 0 M -20 -30 L -20 0 M 18 -30 L 18 0 M 42 -34 L 44 0", 6) + VT.line("M 70 -98 l 6 -12 M 84 -96 l 8 -10", 4)); }
  function bao(x, y, s) { return VT.g(VT.tr(x, y, s), VT.shape("M -40 0 C -50 -40 -40 -80 -16 -92 L 16 -92 C 40 -80 50 -40 40 0 Z", "#C9A46A", { sw: 5 }) + VT.line("M -20 -92 L 20 -92", 7) + VT.line("M -14 -84 l 10 -14 l 10 14", 4)); }
  function xu(x, y, n, s) { var o = ""; for (var i = 0; i < n; i++) o += VT.ell(x, y - i * 14 * s, 34 * s, 12 * s, "#E8C25A", 4); return o; }
  // ---------- A: thoả ước + chia ba ----------
  function canhA(t) {
    var o = '<rect x="0" y="0" width="1920" height="1080" fill="#D8BF94"/>';
    for (var y = 140; y < 960; y += 70) o += VT.line("M 140 " + y + " L 1480 " + (y + 6), 3, "#8E5527", 0.35);
    return o;
  }
  function kyTen(t) {
    var o = VT.shape("M 560 330 L 1060 320 L 1080 820 L 540 830 Z", "#F6EEDC", { sw: 6, ox: 6, oy: 6 });
    var SIG = [[T_SIGN - 0.05, [640, 720], [400, 1000]], [T_SIGN + 0.35, [800, 735], [800, 1060]], [T_SIGN + 0.75, [960, 720], [1240, 1000]]];
    SIG.forEach(function (sg, i) {
      var k = seg(t, sg[0], sg[0] + 0.4), done = t >= sg[0] + 0.4;
      if (k > 0) o += VT.scribble([[sg[1][0] - 60, sg[1][1]], [sg[1][0] + 60, sg[1][1] - 10]], k, 4, "#2c4f6e");
      var arr = VT.ease.out(seg(t, sg[0] - 0.4, sg[0])) * (1 - VT.ease.io(seg(t, sg[0] + 0.5, sg[0] + 0.9)));
      if (arr > 0) { var hx = VT.lerp(sg[2][0], sg[1][0] + 40 * Math.sin(k * 12), arr), hy = VT.lerp(sg[2][1], sg[1][1] + 8, arr); o += VT.line("M " + sg[2][0] + " " + sg[2][1] + " L " + f(hx) + " " + f(hy), 9) + VT.ell(hx, hy, 18, 18, PEO, 5) + VT.line("M " + f(hx) + " " + f(hy) + " l -24 -40", 5); }
    });
    for (var j = 0; j < 4; j++) o += VT.line("M 610 " + (420 + j * 60) + " L " + (1000 - (j % 2) * 80) + " " + (418 + j * 60), 4, INK, 0.25);
    return o;
  }
  var COL = [460, 800, 1140];
  function chiaBa(t) {
    var o = "", ks = SPLIT.map(function (x) { return VT.ease.back(seg(t, x, x + 0.3)); });
    for (var i = 0; i < 3; i++) {
      var cx = VT.lerp(800 + (i - 1) * 60, COL[i], ks[0]); o += bo(cx, 560 + (i === 1 ? -20 : 0) * (1 - ks[0]), 0.9);
      var sx = VT.lerp(800 + (i - 1) * 50, COL[i], ks[1]); o += bao(sx - 40, 760, 0.8);
      var xx = VT.lerp(800 + (i - 1) * 30, COL[i] + 60, ks[2]); o += xu(xx, 790, ks[2] > 0.05 ? 3 : 0, 1);
    }
    if (ks[2] < 0.05) o += xu(800, 860, 9, 1);
    for (var c = 0; c < 3; c++) if (ks[2] >= 1) o += VT.line("M " + (COL[c] - 130) + " 880 L " + (COL[c] + 130) + " 880", 4, INK, 0.5);
    return o;
  }
  // ---------- B: ba người ngang hàng ----------
  function ngangHang() {
    return '<rect x="0" y="0" width="1920" height="1080" fill="#E2D2AE"/>' + VT.line("M 140 780 L 1480 780", 5) + nguoi(520, 780, 1.4) + nguoi(800, 780, 1.4) + nguoi(1080, 780, 1.4) + VT.line("M 360 440 L 1240 440", 4, "#7A5A3C", 0.5);
  }
  // ---------- C, D, E: trang hòn đảo có bến ----------
  var DOCK = [1000, 1150], DY = SEA_Y - 8, LANG = [[640, SEA_Y - 4], [705, SEA_Y + 6], [770, SEA_Y - 2], [835, SEA_Y + 8]];
  function daoBen(t) {
    var o = '<rect x="0" y="0" width="1920" height="1080" fill="#E6D8B6"/>';
    o += '<rect x="0" y="' + SEA_Y + '" width="1920" height="600" fill="#C7C6AE"/>' + VT.line("M 0 " + SEA_Y + " L 1920 " + SEA_Y, 4);
    for (var i = 0; i < 14; i++) { var xx = 160 + VT.hash(i * 2.1) * 1300, yy = SEA_Y + 40 + VT.hash(i * 4.3) * 200, sh = Math.sin(Math.round(t * 12) * 0.5 + i) * 5; o += VT.line("M " + f(xx + sh) + " " + f(yy) + " q 20 -10 40 0 q 20 10 40 0", 3, "#6E6A58", 0.7); }
    o += nuiLua({ x: 560, y: SEA_Y, w: 900, h: 470, cloud: {}, cliff: false, col: "#A9A27A", scree: "#8F8473", ink: 5 });
    o += VT.shape("M 520 " + SEA_Y + " L 560 " + (SEA_Y - 30) + " L 990 " + (SEA_Y - 30) + " L 1010 " + SEA_Y + " Z", "#B9B07E", { sw: 5, ox: 2, oy: 2 });
    [[600, "#A8A090"], [690, "#B9AFA0"], [880, "#A8A090"]].forEach(function (h) { o += VT.g(VT.tr(h[0], SEA_Y - 30, 0.75), VT.shape(rectD(-40, -50, 40, 0), h[1], { sw: 4 }) + VT.shape("M -50 -48 L 0 -86 L 50 -48 Z", "#8E7A5A", { sw: 4 })); });
    o += VT.shape(rectD(DOCK[0], DY - 14, DOCK[1], DY + 6), "#9E7A52", { sw: 5 }) + VT.line("M " + (DOCK[0] + 30) + " " + (DY + 6) + " l 0 40 M " + (DOCK[1] - 20) + " " + (DY + 6) + " l 0 40", 6);
    return o;
  }
  function den(t, tA, path, sc, sail, dwell) { // tàu giấy tới bến rồi rời đi
    var tD = tA + (dwell || 1.4); if (t < tA - 1.1 || t > tD + 1.2) return "";
    var k = t < tA ? VT.ease.out(seg(t, tA - 1.1, tA)) : 1 - VT.ease.in2(seg(t, tD, tD + 1.2));
    var x = VT.lerp(path[0][0], path[1][0], k), y = VT.lerp(path[0][1], path[1][1], k), s = VT.lerp(sc[0], sc[1], k);
    return tauGiay({ x: x, y: y + Math.sin(Math.round(t * 12) * 0.7) * 3, s: s, whale: sail === "whale" });
  }
  var PA = [[1400, 300], [1240, SEA_Y + 20]], SA = [0.25, 0.62];
  function nguoiDen(t, tOff, from, to, dur, s, bag) {
    if (t < tOff) return "";
    var k = seg(t, tOff, tOff + dur), x = VT.lerp(from[0], to[0], k), y = VT.lerp(from[1], to[1], k);
    return nguoi(x, y, s, k < 1 ? (t - tOff) * 2.4 : 0, bag);
  }
  var P1 = T_HAST - 0.35, PL = T_DUTCH + 0.75, P3 = T_WHALER + 0.5, P4 = T_CAPT - 0.2;
  function lang(t) {
    var o = "";
    o += nguoiDen(t, P1, [1110, DY - 4], LANG[0], 1.2, 0.42, true);
    // ván dạt vào, người thứ hai trèo lên bến
    if (t >= T_DUTCH - 0.2) {
      var kv = VT.ease.out(seg(t, T_DUTCH - 0.2, PL)), vx = VT.lerp(1460, 1180, kv), vy = SEA_Y + 40 - 20 * kv;
      o += VT.shape(rectD(vx - 70, vy - 10, vx + 70, vy + 10), "#9E7A52", { sw: 4 });
      if (t < PL + 0.1) o += nguoi(vx, vy - 6, 0.38, 0); else o += nguoiDen(t, PL + 0.1, [1150, DY - 4], LANG[1], 1.3, 0.42);
    }
    o += nguoiDen(t, P3, [1110, DY - 4], LANG[2], 1.1, 0.42);
    o += nguoiDen(t, P4, [1110, DY - 4], LANG[3], 1.0, 0.42);
    return o;
  }
  var NAM = [T_FIVE - 0.2, T_FIVE + 0.15, T_FIVE + 0.5, T_FIVE + 0.85, T_FIVE + 1.2];
  function namNguoi(t) {
    var o = "";
    NAM.forEach(function (tt, i) { o += nguoiDen(t, tt, [1120, DY - 4], [900 + i * 26, SEA_Y - 30 + (i % 2) * 4], 1.1, 0.4); });
    return o;
  }
  function the(t, t0, str) { var a = VT.ease.back(seg(t, t0, t0 + 0.2)); if (a <= 0) return ""; return VT.g(VT.tr(1230, 190, a, -4), VT.shape(rectD(-130, -66, 130, 66), "#FFFDF6", { sw: 6, ox: 6, oy: 6 }) + VT.dot(0, -52, 10, COT) + VT.text(0, 34, str, 92, { fill: "#A8361F" })); }
  // ---------- Wob ngoài mép khung ----------
  var MK = [[F[2] - 60, 818], [F[2] - 46, 818], [F[2] - 32, 818], [F[2] - 18, 818]];
  function vachDem(t) { var o = ""; MARK.forEach(function (m, i) { if (t >= m) o += VT.lineDraw("M " + MK[i][0] + " " + (MK[i][1] - 26) + " L " + (MK[i][0] + 2) + " " + (MK[i][1] + 26), seg(t, m, m + 0.12), 6, "#3a3a3a"); }); return o; }
  function wob(t, cfg) {
    var up = seg(t, UP0, UP1) * (1 - seg(t, DN0, DN1)), onRock = up > 0;
    var x = VT.lerp(WX, DA[0] + 6, up), y = WY - 52 * Math.sin(Math.PI * 0.5 * up) - (up > 0 && up < 1 ? 26 * Math.sin(Math.PI * up) : 0);
    var o = { x: x, y: y, s: WS, flip: -1, mouth: "content", brows: "flat", px: 14, py: -4 };
    for (var k in cfg) o[k] = cfg[k];
    var out = VT.shape("M " + (DA[0] - 70) + " " + DA[1] + " C " + (DA[0] - 66) + " " + (DA[1] - 50) + " " + (DA[0] + 60) + " " + (DA[1] - 58) + " " + (DA[0] + 70) + " " + DA[1] + " Z", "#9AA0A0", { sw: 5 });
    var pen = "";
    if (cfg.pen) {
      var tip = cfg.pen, sh = VT.wobPt(o, 312, 212), dx = tip[0] - sh[0], dy = tip[1] - sh[1], L = Math.hypot(dx, dy) || 1, hand = [sh[0] + dx / L * Math.min(85, L - 40), sh[1] + dy / L * Math.min(85, L - 40)];
      o.armR = VT.wobLocal(o, hand[0], hand[1]); o.handR = "nam";
      pen = VT.pencilTo(hand, tip, { s: 0.45 });
    }
    out += VT.ell(x, WY + 4, 80, 13, INK, 0, { op: 0.12, ox: 0, oy: 0 }) + wobDi(t, o) + pen;
    return out;
  }
  function penTip(t) {
    for (var i = 0; i < 4; i++) if (t >= MARK[i] - 0.3 && t < MARK[i] + 0.25) { var k = seg(t, MARK[i] - 0.05, MARK[i] + 0.12); return [MK[i][0] + 2 * k, MK[i][1] - 26 + 52 * k]; }
    if (t >= COUNT0 && t < COUNT1) { var j = Math.min(3, Math.floor((t - COUNT0) / ((COUNT1 - COUNT0) / 4))), tp = ((t - COUNT0) / ((COUNT1 - COUNT0) / 4)) % 1; return [MK[j][0], MK[j][1] - 40 + 14 * Math.abs(Math.sin(tp * Math.PI))]; }
    return [F[2] + 50, 860];
  }
  function bg() { return trangSo(60, 30, 1860, 1050, { lo: false }); }
  var shots = [];
  shots.push({ a: 0, b: B1, ten: "ba bàn tay ký thoả ước", ve: function (t, lt, T) {
    var out = bg() + khung(canhA(t) + kyTen(t)) + wob(t, { px: -14, py: 0 });
    return { cam: [key(T, [[0, 900], [B1, 930]]), 560, key(T, [[0, 1.1], [B1, 1.16, "sine"]])], world: out, tint: "warm" };
  } });
  shots.push({ a: B1, b: B2, ten: "chia ba đống bằng nhau", ve: function (t, lt, T) {
    var o = { px: -16, py: 4 };
    SPLIT.forEach(function (x) { if (t >= x && t < x + 0.4) { o.eyes = "wide"; o.mouth = "oSmall"; } });
    if (t >= SPLIT[2] + 0.4) { o.mouth = "smile"; o.eyes = "happy"; o.bob = 6 * Math.abs(Math.sin((t - SPLIT[2]) * 6)); }
    var out = bg() + khung(canhA(t) + chiaBa(t)) + wob(t, o);
    return { cam: [960, 560, key(T, [[B1, 1.02], [B2, 1.06, "sine"]])], world: out, tint: "warm" };
  } });
  shots.push({ a: B2, b: B3, ten: "ngang hàng, Wob đứng lên hòn đá", ve: function (t, lt, T) {
    var o = { px: -16, py: 0 };
    if (t >= UP1 && t < T_OTH) { o.mouth = "smirk"; o.brows = "up"; o.py = 6; }
    if (t >= T_OTH - 0.1 && t < DN0) { o.mouth = "flat"; o.brows = "worried"; o.eyes = "open"; o.px = -18; }
    if (t >= DN1) { o.mouth = "wobbly"; o.brows = "worried"; o.lid = 0.35; o.py = 8; }
    var out = bg() + khung(ngangHang()) + wob(t, o);
    return { cam: [key(T, [[B2, 1050], [B3, 1080]]), 640, key(T, [[B2, 1.12], [B3, 1.2, "sine"]])], world: out, tint: "warm" };
  } });
  shots.push({ a: B3, b: B4, ten: "người tới đảo, dấu bút chì", ve: function (t, lt, T) {
    var inner = daoBen(t) + den(t, P1 - 0.1, PA, SA, "", 1.3) + den(t, P3 - 0.1, PA, SA, "whale", 1.0) + den(t, P4 - 0.1, PA, SA, "whale", 1.0) + lang(t);
    var o = { pen: penTip(t), px: -16, py: 4 };
    if (t >= COUNT0) { o.brows = "skeptic"; o.mouth = "flat"; o.py = 10; }
    var out = bg() + khung(inner) + vachDem(t) + wob(t, o);
    var cam = key(T, [[B3, [1180, 470, 1.25]], [P1, [1120, 600, 1.2], "io3"], [T_DUTCH, [1150, 640, 1.22], "sine"], [T_WHALER, [1120, 620, 1.18], "io3"], [COUNT0, [1200, 660, 1.2], "sine"], [B4, [1240, 700, 1.32], "io3"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  var PN = [[1160, 120], [1220, SEA_Y + 20]];
  shots.push({ a: B4, b: B5, ten: "1827, năm người tới", ve: function (t, lt, T) {
    var inner = daoBen(t) + lang(B4 + 5) + den(t, T_FIVE - 0.4, PN, [0.3, 0.66], "", 2.3) + namNguoi(t) + the(t, T_1827 - 0.03, "1827");
    var out = bg() + khung(inner) + vachDem(t) + wob(t, { px: -16, py: 2, mouth: "flat", brows: "flat" });
    var cam = key(T, [[B4, [960, 540, 1.04]], [T_1827, [980, 520, 1.06], "sine"], [T_1827 + 0.3, [1140, 330, 1.7], "io3"], [T_FIVE - 0.45, [1150, 335, 1.74], "sine"], [T_FIVE + 0.25, [980, 540, 1.08], "io3"], [B5, [985, 540, 1.09], "sine"]]); // cận thẻ 1827 rồi lùi
    return { cam: cam, world: out, tint: "warm" };
  } });
  var IT = [1330, SEA_Y - 30], LOI0 = T_TWO + 0.1, LOI1 = T_ASH + 0.5, DON0 = T_ASH - 0.1;
  shots.push({ a: B5, b: DUR, ten: "1892, tàu Italia mắc cạn", ve: function (t, lt, T) {
    var inner = daoBen(t) + lang(B4 + 5) + namNguoi(B5) + the(t, T_1892 - 0.03, "1892");
    inner += VT.shape("M 1230 " + (SEA_Y + 10) + " C 1250 " + (SEA_Y - 40) + " 1420 " + (SEA_Y - 40) + " 1440 " + (SEA_Y + 10) + " Z", "#6E6A58", { sw: 5 });
    inner += tauGiay({ x: IT[0], y: IT[1], s: 0.9, rot: 12, smoke: t, name: "ITALIA", nameSize: 40 });
    var kl = seg(t, LOI0, LOI1);
    [0, 1].forEach(function (i) { if (t >= LOI0) { var x = VT.lerp(1260 - i * 40, 1135 - i * 42, kl), y = VT.lerp(SEA_Y + 40, DY - 4, kl); inner += nguoi(x, y, 0.42, kl < 1 ? t * 2.4 : 0); if (kl < 0.8) inner += VT.line("M " + f(x - 30) + " " + f(y - 30) + " q 15 -8 30 0 q 15 8 30 0", 4, "#6E6A58"); } });
    var kd = seg(t, DON0, DON0 + 1.0); inner += nguoi(VT.lerp(LANG[3][0], 1035, kd), VT.lerp(LANG[3][1], DY - 4, kd), 0.42, kd < 1 ? t * 2.4 : 0);
    var out = bg() + khung(inner) + vachDem(t) + wob(t, { px: -16, py: 0, mouth: "flat", brows: "flat" });
    var cam = key(T, [[B5, [960, 540, 1.05]], [T_ITA - 0.6, [1000, 560, 1.12], "sine"], [T_ITA - 0.05, [1330, 640, 2.0], "io3"], [T_STAY - 0.2, [1330, 640, 2.05], "sine"], [T_STAY + 0.35, [1180, 650, 1.35], "io3"], [DUR, [1190, 650, 1.38], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
