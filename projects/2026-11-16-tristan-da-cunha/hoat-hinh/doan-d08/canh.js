/* d08 · vẽ tay chèn (83,95–87,776 s; 3,826 s). Vào "chen", ra "cat". Hồi ức, không khẩu hình.
 * Cabin tàu cá: giường tầng, ô cửa tròn biển xám. Wob (áo mưa cam, mũ trùm hạ, ba lô THÁO ra) đứng trên giường dưới
 * nhét đồ vào ba lô nhỏ ô liu rồi lôi ra, ba lần (đèn pin, áo len cuộn, sổ), lần sau nhanh hơn. Ba lô tự đóng nắp,
 * giơ lên một tờ giấy bé vẽ mặt cau có (không chữ) đúng "filed", rồi quay lưng lại với Wob đúng "complaint", khoá kéo mím chặt;
 * giữ tới cắt. Ba lô vẽ cục bộ (VT.backpack của lib chưa nhận màu ô liu): cùng hình ba lô của rig, màu khoá #7C8646/#566030, cuộn thảm đỏ.
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

  var T_PACK = VT.tu("packed"), T_UNT = VT.tu("until"), T_FILED = VT.tu("filed"), T_COMP = VT.tu("complaint.");
  var CYC = [[T_PACK, T_PACK + 0.72], [T_PACK + 0.72, T_PACK + 1.37], [T_PACK + 1.37, T_UNT]];
  var SHUT = T_UNT + 0.08, PAPER = T_FILED - 0.05, TURN0 = T_COMP - 0.12, TURN1 = T_COMP + 0.05;
  VT.sfx("pop", PAPER, 0.6);
  VT.sfx("bonk", SHUT + 0.1, 0.3);
  var M = { pack: "#7C8646", dark: "#566030", mat: "#D9543C" };
  var G = 770, BX = 1060, BS = 0.88, WX = 905, WS = 0.8;
  function baLo(open, back, sx, zip) {
    var o = "";
    if (!back) {
      o += VT.shape("M -49 -160 L 49 -160 C 49 -160 49 -160 49 -130 L 49 -28 C 49 -10 34 0 18 0 L -18 0 C -34 0 -49 -10 -49 -28 L -49 -130 C -49 -150 -34 -160 -18 -160 Z", M.pack, { sw: 7, ox: 5, oy: 4 });
      o += VT.shape("M 0 -108 L 44 -108 L 44 -50 L 0 -50 Z", M.dark, { sw: 5, ox: 2, oy: 2 }) + VT.line("M 6 -96 L 38 -96", 3, "#E8C25A");
      if (open > 0) {
        o += VT.ell(0, -160, 46, 14, "#2a2e2a", 5);
        o += VT.g("rotate(" + f(-120 * open) + " 46 -160)", VT.shape("M -48 -162 C -48 -178 48 -178 48 -162 L 48 -146 L -48 -146 Z", M.dark, { sw: 6 }) + VT.shape("M -44 -196 L 44 -196 C 62 -196 62 -164 44 -164 L -44 -164 C -62 -164 -62 -196 -44 -196 Z", M.mat, { sw: 6 }));
      } else o += VT.shape("M -48 -162 C -48 -178 48 -178 48 -162 L 48 -140 L -48 -140 Z", M.dark, { sw: 6 }) + VT.shape("M -44 -196 L 44 -196 C 62 -196 62 -164 44 -164 L -44 -164 C -62 -164 -62 -196 -44 -196 Z", M.mat, { sw: 6 }) + VT.line("M -26 -196 L -26 -164 M 26 -196 L 26 -164", 4);
    } else {
      o += VT.shape("M -49 -160 L 49 -160 L 49 -28 C 49 -10 34 0 18 0 L -18 0 C -34 0 -49 -10 -49 -28 Z", M.pack, { sw: 7, ox: 5, oy: 4 });
      o += VT.shape("M -34 -140 L 34 -140 L 34 -40 L -34 -40 Z", "#8C9656", { sw: 4, ox: 0, oy: 0 });
      o += VT.line("M -26 -156 C -40 -100 -40 -50 -26 -6", 18) + VT.line("M -26 -156 C -40 -100 -40 -50 -26 -6", 11, M.dark) + VT.line("M 26 -156 C 40 -100 40 -50 26 -6", 18) + VT.line("M 26 -156 C 40 -100 40 -50 26 -6", 11, M.dark);
      o += VT.shape("M -44 -196 L 44 -196 C 62 -196 62 -164 44 -164 L -44 -164 C -62 -164 -62 -196 -44 -196 Z", M.mat, { sw: 6 });
      if (zip) { o += VT.line("M -40 -150 C -20 -146 20 -146 40 -150", 7); for (var i = -3; i <= 3; i++) o += VT.line("M " + (i * 11) + " -153 l 0 8", 3); }
    }
    return VT.g("translate(" + BX + " " + G + ") scale(" + f(BS * sx) + " " + f(BS) + ")", o);
  }
  function giayCau(y, rot) {
    return VT.g(VT.tr(BX + 6, y, 1, rot), VT.line("M 0 40 L 0 120", 6, M.dark) + VT.shape(rectD(-46, -50, 46, 44), "#FFFDF6", { sw: 5, ox: 3, oy: 3 }) + VT.dot(-18, -16, 6) + VT.dot(18, -16, 6) + VT.line("M -22 -34 L -8 -26 M 22 -34 L 8 -26", 4) + VT.line("M -20 22 Q 0 4 20 22", 5));
  }
  function item(i, x, y, rot) {
    if (i === 0) return VT.torch({ x: x, y: y, s: 0.42, rot: rot - 70 });
    if (i === 1) return VT.g(VT.tr(x, y, 1, rot), VT.shape("M -40 -22 C -46 -34 40 -34 42 -20 L 42 20 C 40 34 -46 34 -40 22 Z", "#5B8FB8", { sw: 5 }) + VT.ell(-40, 0, 12, 22, "#4A7AA0", 4) + VT.line("M -10 -24 L -8 24 M 14 -24 L 16 24", 3, "#F6EEDC", 0.7));
    return VT.g(VT.tr(x, y, 1, rot), VT.shape(rectD(-34, -44, 34, 44), "#C9463A", { sw: 5 }) + VT.line("M -24 -44 L -24 44", 4, "#8E2E24"));
  }
  function cabin(t) {
    var o = '<rect x="-1200" y="-1200" width="4320" height="3600" fill="#C9A27A"/>';
    for (var y = 120; y < 1100; y += 64) o += VT.line("M -1200 " + y + " L 3100 " + (y + 4), 3, "#8E5527", 0.45);
    o += VT.ell(1500, 360, 120, 120, "#B4C2C6", 14, { ox: 0, oy: 0 }) + VT.ell(1500, 360, 100, 100, "none", 5);
    var st = Math.round(t * 12), sy = 380 + Math.sin(st * 0.5) * 18;
    o += '<clipPath id="por"><circle cx="1500" cy="360" r="100"/></clipPath><g clip-path="url(#por)"><rect x="1390" y="' + f(sy) + '" width="220" height="200" fill="#7F9298"/>' + VT.line("M 1390 " + f(sy) + " q 40 -10 80 0 q 40 10 80 0 q 40 -10 80 0", 4) + "</g>";
    for (var b = 0; b < 6; b++) o += VT.dot(1500 + Math.cos(b) * 112, 360 + Math.sin(b) * 112, 6, "#6B5A48");
    o += VT.shape(rectD(380, 260, 1720, 330), "#8E5527", { sw: 6 }) + VT.line("M 380 330 L 1720 330", 4);
    o += VT.shape(rectD(360, G, 1740, G + 70), "#E8E0CC", { sw: 6, ox: 4, oy: 4 }) + VT.shape(rectD(340, G + 70, 1760, G + 140), "#8E5527", { sw: 6 });
    o += VT.line("M 360 250 L 360 1100 M 1740 250 L 1740 1100", 18) + VT.line("M 360 250 L 360 1100 M 1740 250 L 1740 1100", 10, "#B07A48");
    o += VT.ell(600, G - 10, 70, 18, "#F6EEDC", 5) + VT.line("M 1360 " + (G - 6) + " l 40 -8 l 40 8", 6, "#9CC8DC");
    return o;
  }
  return [{ a: 0, b: DUR, ten: "nhét ra nhét vào, ba lô quay lưng", ve: function (t, lt, T) {
    var out = cabin(t), ci = -1, k = 0;
    for (var i = 0; i < 3; i++) if (t >= CYC[i][0] && t < CYC[i][1]) { ci = i; k = (t - CYC[i][0]) / (CYC[i][1] - CYC[i][0]); }
    var mouth = [BX, G - 165 * BS], hold = [WX + 70, G - 210], ip = hold, inside = false, rot = 0;
    if (ci >= 0) {
      if (k < 0.42) { var u = VT.ease.io(k / 0.42); ip = [VT.lerp(hold[0], mouth[0], u), VT.lerp(hold[1], mouth[1] - 40, u) - 60 * Math.sin(Math.PI * u)]; rot = 40 * u; }
      else if (k < 0.55) { ip = [mouth[0], mouth[1] + 30]; inside = true; rot = 90; }
      else { var v = VT.ease.out((k - 0.55) / 0.45); ip = [VT.lerp(mouth[0], hold[0] + 20, v), VT.lerp(mouth[1] + 20, hold[1] - 70, v)]; rot = VT.lerp(90, -10, v); }
    }
    var lastItem = t >= CYC[2][1] ? 2 : ci, open = t < SHUT ? 1 : 1 - seg(t, SHUT, SHUT + 0.12);
    var turn = seg(t, TURN0, TURN1), sx = turn < 0.5 ? 1 - turn * 2 : (turn - 0.5) * 2, back = turn >= 0.5;
    if (t < CYC[0][0]) open = 1;
    var o = { x: WX, y: G, s: WS, flip: 1, noPack: true, mouth: "content", px: 16, py: -6, brows: "flat" };
    var hand = ci >= 0 ? ip : (t >= CYC[2][1] ? [WX + 40, G - 150] : [WX + 70, G - 200]);
    if (ci >= 0) { o.brows = "down"; o.mouth = ci === 2 ? "chatter" : "flat"; o.px = 18; o.py = k < 0.55 ? 8 : -10; if (ci === 2) o.marks = "sweat"; o.lean = 6 * Math.sin(Math.PI * k); }
    if (t >= CYC[2][1]) { o.brows = "up"; o.mouth = "oSmall"; o.px = 18; o.py = -8; }
    if (t >= PAPER) { o.eyes = "wide"; o.mouth = "o"; o.py = -18; }
    if (t >= TURN1) { o.eyes = "open"; o.lid = 0.5; o.mouth = "flat"; o.brows = "flat"; o.px = 16; o.py = 0; o.noBlink = true; }
    o.armR = VT.wobLocal({ x: WX, y: G, s: WS }, hand[0] - 4, hand[1] + 6); o.handR = "nam";
    var it = "";
    if (ci >= 0 && !inside) it = item(ci, ip[0], ip[1], rot);
    else if (ci < 0 && lastItem === 2 && t >= CYC[2][1]) it = item(2, WX + 46, G - 168, 80);
    out += (inside ? item(ci, ip[0], ip[1], rot) : "") + baLo(open, back, sx, back) + wobDi(t, o) + it;
    if (t >= PAPER && t < TURN0) { var py = VT.lerp(G - 215, G - 320, VT.ease.back(seg(t, PAPER, PAPER + 0.2))); out += giayCau(py, Math.sin(Math.round(t * 12) * 1.2) * 6); }
    if (t >= TURN0 && t < TURN1 + 0.2) out += VT.puffBurst({ x: BX, y: G - 40, k: seg(t, TURN0, TURN1 + 0.2), s: 0.35, spread: 70 });
    if (t >= TURN1) out += VT.line("M " + (BX - 70) + " " + (G - 230) + " l 16 -26 M " + BX + " " + (G - 250) + " l 0 -30 M " + (BX + 70) + " " + (G - 230) + " l -16 -26", 5, INK, 1 - seg(t, TURN1, TURN1 + 0.5));
    var cam = key(T, [[0, [990, 600, 1.5]], [CYC[2][1], [990, 600, 1.56], "sine"], [TURN0, [1000, 610, 1.85], "io3"], [DUR, [1000, 610, 1.95], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } }];
};
