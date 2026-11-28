/* d19 · vẽ tay chèn, bong bóng tưởng tượng (207,378–213,458 s; 6,08 s). Vào "chen", ra "cat". Không khẩu hình.
 * So sánh đời thường: Wob (áo mưa cam, mũ trùm hạ, ba lô nhỏ, chùm chìa khoá to) đạp xe qua nửa thành phố tới khoá cửa sau
 * một ngôi nhà, khoá ba ổ. Tên trộm giấy (người que chung, mặt nạ, không mặt chi tiết) đi ngang, nhìn cánh cửa khoá, nhún vai,
 * đi vào bằng cửa trước đang mở; Wob đứng ở cửa sau ôm chùm chìa khoá, mặt tỉnh bơ. Không chữ.
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

  var T_LOCK = VT.tu("locking"), T_HOUSE = VT.tu("house"), T_JUST = VT.tu("just"), T_BURG = VT.tu("burglar"), T_USES = VT.tu("uses"), T_SHORT = VT.tu("shortcut.");
  var B1 = T_HOUSE - 0.12, B2 = T_JUST - 0.08, L1 = B1 + 0.35, L2 = L1 + 0.38, L3 = L2 + 0.38;
  var ARR = T_BURG - 0.12, SHRUG0 = T_USES - 0.12, SHRUG1 = SHRUG0 + 0.35, WALK1 = T_SHORT, SHUT = T_SHORT + 0.15;
  [L1, L2, L3].forEach(function (x) { VT.sfx("pop", x, 0.35); });
  VT.sfx("bonk", SHUT, 0.6);
  var G = 900;
  function chumChia(x, y, s, t) {
    var j = Math.sin(Math.round(t * 12) * 1.7) * 8, o = VT.ell(0, 0, 30, 30, "none", 9) + VT.ell(0, 0, 30, 30, "none", 4, { stroke: "#E8C25A" });
    [[40 + j, 0.5], [90 + j, 0.45], [140 + j, 0.5]].forEach(function (k) { o += VT.g("rotate(" + f(k[0]) + ") translate(30 0)", VT.bigKey({ x: 50, y: 0, s: k[1] })); });
    return VT.g(VT.tr(x, y, s), o);
  }
  function xe(x, y, t) {
    var r = Math.round(t * 12) * 30, o = "";
    [-120, 120].forEach(function (dx) { o += VT.ell(x + dx, y - 70, 70, 70, "none", 7) + VT.g("rotate(" + r + " " + (x + dx) + " " + (y - 70) + ")", VT.line("M " + (x + dx - 66) + " " + (y - 70) + " L " + (x + dx + 66) + " " + (y - 70) + " M " + (x + dx) + " " + (y - 136) + " L " + (x + dx) + " " + (y - 4), 3, INK, 0.6)); });
    o += VT.line("M " + (x - 120) + " " + (y - 70) + " L " + (x - 20) + " " + (y - 70) + " L " + (x + 70) + " " + (y - 170) + " L " + (x - 40) + " " + (y - 170) + " Z M " + (x - 20) + " " + (y - 70) + " L " + (x - 50) + " " + (y - 190) + " M " + (x + 70) + " " + (y - 170) + " L " + (x + 120) + " " + (y - 70) + " M " + (x + 70) + " " + (y - 170) + " L " + (x + 60) + " " + (y - 220), 9, "#3F6E9A");
    o += VT.line("M " + (x + 40) + " " + (y - 222) + " L " + (x + 90) + " " + (y - 226), 9) + VT.shape("M " + (x - 86) + " " + (y - 196) + " L " + (x - 20) + " " + (y - 196) + " L " + (x - 30) + " " + (y - 184) + " L " + (x - 80) + " " + (y - 184) + " Z", "#2a2e30", { sw: 4 });
    return o;
  }
  var MAU = ["#E8A9A0", "#9CC8DC", "#F4E3A1", "#B8D8B0", "#D9B8E0", "#F2C6A0"];
  function phoXa(off) {
    var o = '<rect x="-1200" y="-1200" width="4320" height="3600" fill="#E6EDF0"/>';
    for (var i = -2; i < 10; i++) {
      var x = ((i * 330 - off) % 3300 + 3300) % 3300 - 600, h = 300 + (i * 97 % 5) * 50, c = MAU[((i % 6) + 6) % 6];
      o += VT.shape(rectD(x, G - h, x + 280, G), c, { sw: 6, ox: 4, oy: 4 }) + VT.shape("M " + (x - 20) + " " + (G - h) + " L " + (x + 140) + " " + (G - h - 110) + " L " + (x + 300) + " " + (G - h) + " Z", "#8E5527", { sw: 6, ox: 3, oy: 3 });
      o += VT.shape(rectD(x + 40, G - h + 50, x + 110, G - h + 120), "#CFE3EE", { sw: 4 }) + VT.shape(rectD(x + 170, G - h + 50, x + 240, G - h + 120), "#CFE3EE", { sw: 4 }) + VT.shape(rectD(x + 110, G - 130, x + 170, G), "#5c3a22", { sw: 4 });
    }
    return o + '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="#B8B2A6"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
  }
  // ngôi nhà: cửa sau (trái, ba ổ khoá) và cửa trước (phải, mở toang)
  var BD = 700, FD = 1340;
  function nha(t, locks, shut) {
    var o = '<rect x="-1200" y="-1200" width="4320" height="3600" fill="#E6EDF0"/>';
    o += VT.shape(rectD(420, 360, 1560, G), "#F4E3A1", { sw: 7, ox: 6, oy: 5 }) + VT.shape("M 380 370 L 990 120 L 1600 370 Z", "#C9463A", { sw: 7, ox: 4, oy: 4 });
    o += VT.shape(rectD(880, 460, 1100, 620), "#CFE3EE", { sw: 5 }) + VT.line("M 990 460 L 990 620 M 880 540 L 1100 540", 4);
    o += VT.shape(rectD(BD - 90, G - 300, BD + 90, G), "#4F8A5B", { sw: 6 }) + VT.dot(BD + 60, G - 150, 8);
    for (var i = 0; i < 3; i++) if (locks > i) { var ly = G - 240 + i * 80, k = VT.ease.back(Math.min(1, locks - i)); o += VT.g(VT.tr(BD + 40, ly, k), VT.shape(rectD(-24, -14, 24, 22), "#B9AFA0", { sw: 4 }) + VT.line("M -14 -14 C -14 -40 14 -40 14 -14", 6) + VT.dot(0, 4, 5)); }
    o += VT.shape(rectD(FD - 100, G - 300, FD + 100, G), "#2a2320", { sw: 6 });
    var op = shut ? 1 - VT.ease.out(Math.min(1, shut)) : 1;
    o += VT.shape("M " + (FD - 100) + " " + (G - 300) + " L " + f(FD - 100 + 200 * (1 - op * 0.82)) + " " + f(G - 300 - op * 18) + " L " + f(FD - 100 + 200 * (1 - op * 0.82)) + " " + f(G + op * 12) + " L " + (FD - 100) + " " + G + " Z", "#3F6E9A", { sw: 6 });
    o += VT.shape(rectD(FD - 120, G - 4, FD + 120, G + 18), "#C9A46A", { sw: 4 });
    return o + '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="#B8B2A6"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
  }
  function trom(x, t, o) {
    var p = VT.stickPerson({ x: x, y: G, s: 1.2, phase: o.phase || 0, fill: "#F6EEDC" });
    var hx = x, hy = G - 214 * 1.2;
    var m = VT.shape(rectD(hx - 30, hy - 12, hx + 30, hy + 8), "#2a2e30", { sw: 3, ox: 0, oy: 0 }) + VT.dot(hx - 12, hy - 2, 4, "#F6EEDC") + VT.dot(hx + 12, hy - 2, 4, "#F6EEDC");
    var bag = VT.shape("M " + (x - 70) + " " + (G - 230) + " C " + (x - 120) + " " + (G - 220) + " " + (x - 110) + " " + (G - 140) + " " + (x - 60) + " " + (G - 150) + " Z", "#B9AFA0", { sw: 5 });
    var sh = o.shrug ? VT.line("M " + (x - 50) + " " + (G - 250) + " l -16 -20 M " + (x + 50) + " " + (G - 250) + " l 16 -20", 5) : "";
    return bag + p + m + sh;
  }
  var shots = [];
  shots.push({ a: 0, b: B1, ten: "đạp xe qua thành phố", ve: function (t, lt, T) {
    var x = 900, sy = G - 190, s = 0.62;
    var out = phoXa(t * 900) + xe(x, G, t);
    var o = { x: x - 40, y: sy + 92 * s, s: s, flip: 1, legs: "walk", phase: t * 2.2, stride: 30, lean: 10, mouth: "smile", eyes: "squint", brows: "down", armR: [430, 250], handR: "nam", armL: [380, 260], handL: "nam" };
    out += wobDi(t, o) + chumChia(x + 80, G - 180, 0.55, t);
    out += VT.speedLines({ x0: 200, y0: G - 360, n: 5, gap: 50, len: 220, dx: -1, dy: 0, sw: 5 });
    return { cam: [key(T, [[0, 920], [B1, 940]]), 640, 1.12], world: out, over: VT.dreamFrame(t, { inset: 56 }), tint: "warm" };
  } });
  shots.push({ a: B1, b: B2, ten: "khoá ba ổ cửa sau", ve: function (t, lt, T) {
    var locks = (t >= L1 ? 1 + seg(t, L1, L1 + 0.15) - 1 + 1 : 0) + (t >= L2 ? 1 : 0) + (t >= L3 ? 1 : 0);
    locks = t < L1 ? 0 : t < L2 ? 1 : t < L3 ? 2 : 3;
    var out = nha(t, locks, 0) + xe(390, G, 0).replace(/<path/g, '<path opacity="0.95"');
    var cur = locks < 3 ? [L1, L2, L3][locks] : L3, ly = G - 240 + Math.min(2, locks) * 80;
    var o = { x: BD + 230, y: G, s: 0.72, flip: -1, mouth: "flat", brows: "down", px: 14, py: VT.lerp(-8, 10, Math.min(2, locks) / 2), lean: -6 };
    var hand = VT.wobLocal(o, BD + 70, ly + 10); o.armR = hand; o.handR = "nam";
    if (locks >= 3) { o.mouth = "smirk"; o.brows = "up"; o.eyes = "happy"; }
    var hp = VT.wobPt(o, hand[0], hand[1]);
    out += wobDi(t, o) + chumChia(hp[0] + 10, hp[1] + 20, 0.5, t);
    return { cam: [key(T, [[B1, 820], [B2, 830]]), 720, key(T, [[B1, 1.55], [B2, 1.62, "sine"]])], world: out, over: VT.dreamFrame(t, { inset: 56 }), tint: "warm" };
  } });
  shots.push({ a: B2, b: DUR, ten: "trộm đi cửa trước", ve: function (t, lt, T) {
    var shut = t >= SHUT - 0.05 ? seg(t, SHUT - 0.05, SHUT + 0.08) : 0;
    var out = nha(t, 3, shut);
    var o = { x: BD - 210, y: G, s: 0.72, flip: 1, arms: "hug", mouth: "flat", brows: "flat", px: 14, py: 0 };
    var x;
    if (t < ARR) x = VT.lerp(2000, BD + 40, seg(t, B2, ARR));
    else if (t < SHRUG1) x = BD + 40;
    else x = VT.lerp(BD + 40, FD, VT.ease.io(seg(t, SHRUG1, WALK1)));
    var walking = (t < ARR) || (t >= SHRUG1 && t < WALK1);
    var ph = walking ? t * 2.6 : 0;
    o.px = VT.clamp((x - o.x) / 25, -18, 18); if (x < o.x) o.flip = -1, o.px = 14;
    if (t >= SHUT) { o.lid = 0.5; o.noBlink = true; o.px = 18; o.py = 0; o.flip = 1; }
    var tr = "";
    if (t < SHUT - 0.05) tr = trom(x, t, { phase: ph, shrug: t >= SHRUG0 && t < SHRUG1 });
    var hp = VT.wobPt(o, 200, 250);
    out += tr + wobDi(t, o) + chumChia(hp[0], hp[1] + 10, 0.5, t);
    if (t >= SHUT && t < SHUT + 0.3) out += VT.knockLines({ x: FD, y: G - 150, k: seg(t, SHUT, SHUT + 0.3), s: 1.4 });
    var face = VT.wobPt({ x: BD - 210, y: G, s: 0.72 }, 200, 170);
    var cam = key(T, [[B2, [990, 600, 1.0]], [SHUT, [990, 600, 1.04], "sine"], [SHUT + 0.3, [face[0] + 180, face[1] + 60, 1.55], "io3"], [DUR, [face[0] + 180, face[1] + 60, 1.6], "sine"]]);
    return { cam: cam, world: out, over: VT.dreamFrame(t, { inset: 56 }), tint: "warm" };
  } });
  return shots;
};
