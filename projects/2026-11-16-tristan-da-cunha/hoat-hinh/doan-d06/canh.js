/* d06 · vẽ tay trên trang sổ phác (49,238–54,875 s; 5,637 s). Vào "giay", ra "cat". Hồi ức, không khẩu hình.
 * Từ giấy phẳng: nét mực vẽ dần núi lửa giữa biển kẻ sóng. Máy bay giấy bay vào, LAO THẲNG vào sườn núi đúng "airstrip"
 * (không lượn tìm chỗ đáp), trượt xuống sườn như cầu trượt, nằm bẹp ở chân núi; Wob (áo mưa cam, mũ trùm hạ, ba lô nhỏ) ở mép trang che mắt.
 * Đúng "sea," máy bay tự mở nếp gấp thành thuyền giấy, trượt xuống nước; Wob thổi phù cho thuyền trôi về mép phải trang (phía Cape Town).
 * Không chữ.
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

  var T_AIR = VT.tu("airstrip"), T_SEA = VT.tu("sea,"), T_CAPE = VT.tu("cape");
  var FLY0 = 0.85, HIT = T_AIR - 0.03, FOOT = HIT + 0.62, FOLD0 = T_SEA - 0.16, FOLD1 = T_SEA + 0.06, BLOW0 = T_CAPE - 0.3;
  VT.sfx("whoosh", FLY0 + 0.05, 0.4);
  VT.sfx("boing", HIT, 0.6);
  VT.sfx("lat-giay", FOLD0, 0.55);
  var IX = 1010, IY = 720, IW = 760, IH = 440, cw = IW * 0.07;
  var CONE = "M " + (IX - IW / 2) + " " + IY + " C " + (IX - IW * 0.3) + " " + (IY - IH * 0.2) + " " + (IX - cw * 2.2) + " " + (IY - IH * 0.78) + " " + (IX - cw) + " " + (IY - IH) + " L " + (IX + cw) + " " + (IY - IH) + " C " + (IX + cw * 2.2) + " " + (IY - IH * 0.78) + " " + (IX + IW * 0.3) + " " + (IY - IH * 0.2) + " " + (IX + IW / 2) + " " + IY;
  var P_HIT = [IX - IW * 0.26, IY - IH * 0.42], P_FOOT = [IX - IW * 0.46, IY - 14], SLOPE = Math.atan2(P_FOOT[1] - P_HIT[1], P_FOOT[0] - P_HIT[0]) * 180 / Math.PI;
  function plane(x, y, rot, s, cr) {
    var c = cr || 0, g = VT.shape("M 96 0 L -74 -40 L -38 0 Z", "#FFFDF6", { sw: 5, ox: 3, oy: 3 }) + VT.shape("M 96 0 L -38 0 L -66 30 Z", "#E6DCC6", { sw: 5, ox: 3, oy: 3 }) + VT.line("M 96 0 L -38 0", 3, INK, 0.5);
    if (c > 0) g += VT.line("M 70 -8 l 10 6 l -8 6 l 10 6", 4);
    return VT.g(VT.tr(x, y, s, rot) + " scale(" + f(1 - 0.35 * c) + " 1)", g);
  }
  var WX = 250, WY = 1000, WS = 0.55;
  return [{ a: 0, b: DUR, ten: "máy bay giấy lao vào núi, gấp thành thuyền", ve: function (t, lt, T) {
    var out = trangSo(110, 60, 1810, 1020);
    var kd = seg(t, 0.45, 1.0), kf = seg(t, 0.85, 1.15);
    out += songKe(1010, 800, 14, seg(t, 0.5, 1.1), t);
    out += VT.lineDraw(CONE, kd, 6);
    if (kf > 0) out += '<g opacity="' + f(kf) + '">' + nuiLua({ x: IX, y: IY, w: IW, h: IH, cloud: {}, cliff: false, ink: 5 }) + "</g>";
    out += VT.line("M 160 " + (IY + 6) + " L 1760 " + (IY + 6), 3, "#2c4f6e", 0.5 * seg(t, 0.5, 0.9));
    // máy bay giấy
    var pl = "";
    if (t >= FLY0 && t < FOLD1) {
      if (t < HIT) { var k = seg(t, FLY0, HIT); pl = plane(VT.lerp(260, P_HIT[0], k), VT.lerp(300, P_HIT[1], k) - 40 * Math.sin(Math.PI * k), 18, 0.9, 0); }
      else if (t < HIT + 0.14) pl = plane(P_HIT[0] - 6, P_HIT[1], 18, 0.9, 1) + VT.impact({ x: P_HIT[0] + 30, y: P_HIT[1], s: 0.45 });
      else if (t < FOOT) { var ks = VT.ease.in2(seg(t, HIT + 0.14, FOOT)); pl = VT.g("translate(" + f(VT.lerp(P_HIT[0], P_FOOT[0], ks)) + " " + f(VT.lerp(P_HIT[1], P_FOOT[1], ks) - 10) + ") rotate(" + f(SLOPE - 180) + ") scale(-1 1)", plane(0, 0, 0, 0.9, 1)); }
      else if (t < FOLD0) pl = VT.g("translate(" + f(P_FOOT[0]) + " " + f(P_FOOT[1]) + ") scale(1 0.55)", plane(0, 0, 0, 0.9, 1));
      else { var kk = seg(t, FOLD0, FOLD1); pl = '<g opacity="' + f(1 - kk) + '">' + plane(P_FOOT[0], P_FOOT[1] - 20 * kk, -30 * kk, 0.9 * (1 - 0.4 * kk), 1) + "</g>"; }
    }
    out += pl;
    if (t >= HIT && t < FOOT) out += VT.speedLines({ x0: P_HIT[0] + 60, y0: P_HIT[1] - 60, n: 4, gap: 30, len: 70, dx: 0.6, dy: -1, sw: 4 });
    // thuyền giấy
    if (t >= FOLD0 + 0.06) {
      var kb = VT.ease.back(seg(t, FOLD0 + 0.06, FOLD1 + 0.08)), sl = VT.ease.io(seg(t, FOLD1, FOLD1 + 0.35));
      var dr = VT.ease.io(seg(t, BLOW0 + 0.15, DUR - 0.1));
      var bx = VT.lerp(VT.lerp(P_FOOT[0], P_FOOT[0] - 40, sl), 1640, dr), by = VT.lerp(P_FOOT[1], IY + 70, sl) + Math.sin(Math.round(t * 12) * 0.8) * 5 * sl;
      out += VT.thuyenGiay({ x: bx, y: by, s: 0.85 * kb, rot: Math.sin(Math.round(t * 12) * 0.7) * 5 * sl });
      if (t >= FOLD0 + 0.06 && t < FOLD1 + 0.3) out += VT.puffBurst({ x: P_FOOT[0], y: P_FOOT[1] - 20, k: seg(t, FOLD0 + 0.06, FOLD1 + 0.3), s: 0.45 });
      if (sl >= 1) out += VT.line("M " + f(bx - 80) + " " + f(by + 8) + " q -40 8 -90 2", 3, "#2c4f6e", 0.6);
    }
    // Wob ở mép trang
    var grow = 1 + 0.3 * VT.ease.back(seg(t, HIT - 0.12, HIT + 0.08)) * (1 - VT.ease.io(seg(t, FOOT + 0.25, FOOT + 0.6))); // phóng Wob 1,3× lúc che mắt
    var o = { x: WX + 40 * (grow - 1), y: WY, s: WS * grow, flip: 1, mouth: "content", px: 12, py: -14 };
    if (t >= FLY0) { o.px = 16; o.py = -18; o.eyes = "wide"; o.mouth = "o"; }
    if (t >= HIT - 0.04 && t < FOLD0 - 0.1) {
      o.armL = [150, 152]; o.armR = [252, 152]; o.handL = "xoe"; o.handR = "xoe"; o.eyes = "closed"; o.mouth = "wobbly"; o.brows = "worried";
      if (t > FOOT + 0.1) { o.armL = [80, 270]; o.handL = "tron"; o.eyes = "open"; o.px = 18; o.py = -6; o.mouth = "frown"; }
    }
    if (t >= FOLD0 - 0.1 && t < BLOW0) { o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.px = 18; o.py = -4; }
    var blow = t >= BLOW0 && t < DUR - 0.15;
    if (blow) { o.mouth = "o"; o.sq = 1.04; o.eyes = "squint"; o.lean = 8; o.px = 16; o.arms = "low"; }
    out += VT.ell(WX, WY + 4, 70, 12, INK, 0, { op: 0.12, ox: 0, oy: 0 }) + wobDi(t, o);
    if (blow) {
      var mp = VT.wobPt({ x: WX, y: WY, s: WS, lean: 8, sq: 1.04 }, 300, 236), ph = Math.round(t * 12) % 3;
      for (var i = 0; i < 3; i++) out += VT.arrowWavy({ x0: mp[0] + 20 + ph * 30, y0: mp[1] - 30 + i * 30, x1: mp[0] + 320 + ph * 30, y1: mp[1] - 50 + i * 40, k: 1, amp: 10, n: 2, color: "#2c4f6e", sw: 5, head: 0.01 });
    }
    var cam = key(T, [[0, [960, 540, 1.0]], [FLY0, [960, 540, 1.02], "sine"], [HIT, [880, 570, 1.14], "io3"], [FOOT + 0.3, [830, 620, 1.22], "io3"], [BLOW0, [860, 640, 1.22], "sine"], [DUR, [1000, 640, 1.1], "io3"]]);
    return { cam: cam, shake: VT.shake(t, HIT, 0.22, 7), world: out, tint: "cold" };
  } }];
};
