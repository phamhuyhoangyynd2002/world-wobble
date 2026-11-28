/* d04 · vẽ tay chèn, bong bóng tưởng tượng (31,137–34,324 s; 3,187 s). Vào "chen", ra "cat". Không khẩu hình.
 * Con phố Anh vẽ tay trong viền mây: xe buýt hai tầng chạy vào kịp "buses", cửa hàng mái hiên bật đèn kịp "shops",
 * dây phơi tất. Một chiếc tất khô cứng bật đứng thẳng trên dây trước "socks"; Wob (đồ ở nhà) gõ nó kêu cộc; giữ mặt tỉnh tới cắt.
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

  var T_BUS = VT.tu("buses,"), T_SHOP = VT.tu("shops"), T_SOCK = VT.tu("socks.");
  var BUS_IN = T_BUS - 0.07, LIGHT = T_SHOP - 0.07, SNAP = 2.263, TAP = 2.663;
  VT.sfx("bonk", TAP, 0.7);
  var G = 880, WS = 0.8, WX = 710;
  function bus(x, t, run) {
    var o = "", wr = run ? Math.round(t * 12) * 40 : 0;
    o += VT.shape(rectD(-260, -330, 260, -40), "#C9463A", { sw: 7, ox: 7, oy: 6 }) + VT.line("M -260 -190 L 260 -190", 6) + VT.line("M -254 -60 L 254 -60", 4, "#8E2E24");
    for (var i = 0; i < 5; i++) { var wx = -230 + i * 96; o += VT.shape(rectD(wx, -306, wx + 74, -226), "#CFE3EE", { sw: 4, ox: 2, oy: 2 }) + VT.shape(rectD(wx, -168, wx + 74, -96), "#CFE3EE", { sw: 4, ox: 2, oy: 2 }); }
    o += VT.shape(rectD(-250, -168, -196, -46), "#8E2E24", { sw: 4 });
    [-170, 170].forEach(function (cx) { o += VT.ell(cx, -40, 46, 46, "#2a2e30", 6) + VT.ell(cx, -40, 18, 18, "#A9B3B8", 4) + VT.g("rotate(" + wr + " " + cx + " -40)", VT.line("M " + (cx - 30) + " -40 L " + (cx + 30) + " -40", 4, "#A9B3B8")); });
    o += VT.ell(250, -84, 12, 12, "#F6D36A", 4);
    return VT.g("translate(" + f(x) + " " + G + ")", o);
  }
  function shop(on, t) {
    var o = VT.shape(rectD(1260, 340, 1760, G), "#EADCC4", { sw: 7, ox: 7, oy: 6 }) + VT.shape(rectD(1240, 300, 1780, 360), "#8E5527", { sw: 6 });
    o += VT.shape(rectD(1300, 520, 1600, 760), on ? "#F6C46A" : "#6E7A80", { sw: 6 });
    if (on) { o += VT.line("M 1450 520 L 1450 760 M 1300 640 L 1600 640", 4); var k = Math.min(1, (t - LIGHT) / 0.25); o += VT.radialLines(1450, 640, 190, 190 + 70 * k, 14, 3, 5, "#E8A33A"); }
    else o += VT.line("M 1450 520 L 1450 760 M 1300 640 L 1600 640", 4);
    o += VT.shape(rectD(1630, 560, 1730, G), "#4F8A5B", { sw: 6 }) + VT.dot(1645, 720, 6);
    var aw = "M 1250 400 L 1770 400 L 1790 490";
    for (var i = 0; i < 10; i++) aw += " q -26 30 -54 0";
    o += VT.shape(aw + " Z", "#F6EEDC", { sw: 6 });
    for (var j = 0; j < 10; j += 2) o += VT.shape("M " + (1256 + j * 52) + " 400 L " + (1308 + j * 52) + " 400 L " + (1332 + j * 52) + " 490 q -26 30 -54 0 Z", "#C9463A", { sw: 0, ox: 0, oy: 0 });
    o += VT.line(aw + " Z", 6);
    return o;
  }
  var LX0 = 120, LX1 = 590, LY = 700;
  function sock(x, rot, col) {
    var d = "M -16 0 L 16 0 L 16 96 C 16 112 30 118 52 118 C 66 118 66 146 50 146 L 0 146 C -12 146 -16 136 -16 124 Z";
    return VT.g("translate(" + f(x) + " " + LY + ") rotate(" + f(rot) + ")", VT.shape(d, col, { sw: 5, ox: 3, oy: 2 }) + VT.line("M -16 22 L 16 22", 6, "#F6EEDC", 0.9)) + VT.shape(rectD(x - 7, LY - 14, x + 7, LY + 12), "#C68A55", { sw: 3, ox: 0, oy: 0 });
  }
  function scene(t) {
    var o = '<rect x="-1200" y="-1200" width="4320" height="' + (1200 + G) + '" fill="#E6EDF0"/>';
    o += VT.shape(rectD(-1200, 230, 1180, G), "#D8CFBE", { sw: 5, ox: 0, oy: 0 }) + VT.line("M -1200 600 L 1180 600", 3, INK, 0.2);
    for (var i = 0; i < 5; i++) o += VT.shape(rectD(-300 + i * 300, 330, -180 + i * 300, 470), "#B9C9D2", { sw: 4 });
    o += shop(t >= LIGHT, t);
    o += '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="#B8B2A6"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6) + VT.line("M -1200 " + (G + 70) + " L 3100 " + (G + 70), 3, INK, 0.35);
    var bk = VT.ease.out(seg(t, 0.05, BUS_IN)), bx = VT.lerp(2400, 1090, bk), run = t < BUS_IN;
    o += VT.g("translate(0 " + f(t >= BUS_IN && t < BUS_IN + 0.17 ? -6 : 0) + ")", bus(bx, t, run));
    if (run) o += VT.speedLines({ x0: bx + 280, y0: G - 300, n: 5, gap: 55, len: 180, dx: 1, dy: 0, sw: 5 });
    o += VT.line("M " + LX0 + " " + (G) + " L " + LX0 + " " + (LY - 40), 10) + VT.line("M " + (LX1 + 40) + " " + G + " L " + (LX1 + 40) + " " + (LY - 40), 10);
    o += VT.line("M " + LX0 + " " + (LY - 4) + " Q " + ((LX0 + LX1) / 2) + " " + (LY + 10) + " " + (LX1 + 40) + " " + (LY - 4), 4);
    var sr = 180 * VT.ease.back(seg(t, SNAP - 0.12, SNAP));
    o += sock(190, 0, "#9CC8DC") + sock(290, 0, "#F2C14E") + sock(390, 0, "#E8A9A0") + sock(560, sr, "#B8D8B0");
    return o;
  }
  return [{ a: 0, b: DUR, ten: "phố Anh, tất cứng", ve: function (t, lt, T) {
    var o = { x: WX, y: G, s: WS, home: true, flip: 1, mouth: "content", px: 14, py: -4 };
    if (t >= T_BUS - 0.1) { o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; }
    if (t >= LIGHT) { o.px = 20; o.py = -10; o.eyes = "happy"; o.mouth = "smile"; o.brows = null; }
    if (t >= SNAP - 0.12) { o.flip = -1; o.px = 12; o.py = -16; o.eyes = "open"; o.mouth = "flat"; o.brows = "skeptic"; }
    var tip = [568, 642];
    if (t >= TAP - 0.2) {
      var lift = VT.ease.out(seg(t, TAP - 0.2, TAP)), back = seg(t, TAP + 0.15, TAP + 0.45);
      var hp = VT.wobLocal({ x: WX, y: G, s: WS, flip: -1 }, tip[0] + 6, tip[1]);
      o.armR = [VT.lerp(338, hp[0], lift * (1 - back)), VT.lerp(300, hp[1], lift * (1 - back))]; o.handR = "chi";
      if (t >= TAP) { o.eyes = "open"; o.lid = 0.45; o.mouth = "flat"; o.brows = "flat"; o.noBlink = true; }
    }
    var out = scene(t) + wobDi(t, o);
    if (t >= TAP && t < TAP + 0.35) out += VT.knockLines({ x: tip[0], y: tip[1], k: seg(t, TAP, TAP + 0.35), s: 1 });
    var cam = key(T, [[0, [960, 560, 1.0]], [1.8, [960, 560, 1.03], "sine"], [2.25, [640, 660, 1.6], "io3"], [DUR, [640, 660, 1.68], "sine"]]);
    return { cam: cam, world: out, over: VT.dreamFrame(t, { inset: 56 }), tint: "warm" };
  } }];
};
