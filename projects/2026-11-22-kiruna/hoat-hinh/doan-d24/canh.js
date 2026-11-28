/* ===== CHUNG NHÓM B · tập 6 Kiruna · dung-ve-tay nhóm B (d24 d26 d29 d33 d36 d45) =====
 * Nguồn chính: doan-d24/chung-b.js; ghep-b.sh chép nguyên vào đầu canh.js từng đoạn (kiem_doan.mjs chỉ nạp canh.js).
 * KHÔNG sửa lib chung (nhóm A giữ lib). Khoá trang phục: dùng khoá rig của nhóm A khi có (doan-d02/rig-chung.md),
 * thiếu khoá nào thì vẽ lớp áo cục bộ chèn giữa thân và quai ba lô (cùng chỗ rig vẽ áo).
 * Tất định: mọi "ngẫu nhiên" qua VT.hash; mọi thứ trong world theo t (bậc 12 hình/giây).
 */
window.KB = function (VT, D) {
  var f = VT.f, INK = VT.C.ink, key = VT.key, seg = VT.seg, clamp = VT.clamp;
  var M = {
    gile: "#E9DDC3", gileVien: "#B9A983", phao: "#3D5A80", phaoChan: "#2B4262", kem: "#EFE3C8",
    muXanh: "#4F7A5A", muVanh: "#3A5C43", bong: "#F6EEDC", oliu: "#7C8646", oliuToi: "#566030", tham: "#C9463A",
    nhaTho: "#A8322A", nhaThoToi: "#8A2620", mai: "#3E3430", maiSang: "#55473F", vien: "#F3E6C8",
    chiaThan: "#3A3F44", theGo: "#B98A5A", dayDo: "#C9463A", dong: "#C9A24A", bac: "#B8BDC2", nhuaXanh: "#4F7A5A",
    troiHe: "#CFE3EA", doi: "#A9BFA0", doiXa: "#C3D3C2", co: "#9DBA6E", coToi: "#7E9E57", duong: "#9E978C", duongToi: "#86807A",
    cam: "#E8742C", vang: "#F6D36A", nang: "#FFE9A8"
  };
  function rectD(x0, y0, x1, y1) { return "M " + f(x0) + " " + f(y0) + " L " + f(x1) + " " + f(y0) + " L " + f(x1) + " " + f(y1) + " L " + f(x0) + " " + f(y1) + " Z"; }
  function rect(x0, y0, x1, y1, fill, o) { return VT.shape(rectD(x0, y0, x1, y1), fill, o || { sw: 5 }); }

  // ---------- khoá rig nhóm A (rig-chung.md). Có khoá thì dùng, không thì lớp cục bộ. ----------
  var RIG = window.VT_RIG_KIRUNA || null; // nhóm A có thể khai; nếu không, dò trực tiếp tham số rig bên dưới
  function rigCo(ten) { return !!(VT.WOB_KHOA && VT.WOB_KHOA[ten]); }

  /** Chùm chìa nhà: gốc ở móc (đỉnh vòng). o: {x, y, s, rot, kiruna (có chìa Kiruna trên vòng), lac (độ lắc)}. */
  function chumChia(o) {
    if (VT.chumChia) return VT.chumChia({ x: o.x, y: o.y, s: (o.s || 0.6) * 0.82, rot: o.rot, kiruna: !!o.kiruna, swing: o.lac || 0 });
    return chumChiaCuc(o);
  }
  function chumChiaCuc(o) {
    var out = "", r = 22, lac = o.lac || 0;
    var keyShape = function (col, head, len, rot) {
      var g = VT.ell(0, 14, 13, 13, head || col, 4) + VT.dot(0, 10, 4, "#fffdf6") +
        rect(-5, 26, 5, 26 + len, col, { sw: 3.5, ox: 1, oy: 1 }) +
        VT.shape("M 5 " + f(16 + len) + " L 13 " + f(16 + len) + " L 13 " + f(22 + len) + " L 9 " + f(24 + len) + " L 13 " + f(28 + len) + " L 5 " + f(30 + len) + " Z", col, { sw: 3, ox: 0, oy: 0 });
      return VT.g("translate(0 " + f(r * 1.6) + ") rotate(" + f(rot) + " 0 " + f(-r * 0.6) + ")", g);
    };
    out += keyShape(M.dong, null, 46, 26 + lac) + keyShape(M.bac, null, 52, 4 + lac * 0.8) + keyShape(M.bac, M.nhuaXanh, 42, -22 + lac * 0.6);
    if (o.kiruna) {
      var kg = VT.ell(0, 16, 16, 16, M.chiaThan, 4.5) + VT.dot(0, 14, 6, "#fffdf6") + rect(-6, 30, 6, 96, M.chiaThan, { sw: 3.5, ox: 1, oy: 1 }) +
        VT.shape("M 6 78 L 18 78 L 18 84 L 12 86 L 18 90 L 18 96 L 6 96 Z", M.chiaThan, { sw: 3, ox: 0, oy: 0 }) +
        VT.line("M -8 6 C -40 0 -52 18 -48 34", 3.5, M.dayDo) + VT.g("rotate(-14 -48 34)", rect(-66, 34, -30, 58, M.theGo, { sw: 3.5, ox: 1, oy: 1 }) + VT.line("M -60 44 L -38 47", 3, INK, 0.3));
      out += VT.g("translate(0 " + f(r * 1.6) + ") rotate(" + f(-48 + lac * 0.5) + " 0 " + f(-r * 0.6) + ")", kg);
    }
    out += '<circle cx="0" cy="' + f(r) + '" r="' + r + '" fill="none" stroke="' + INK + '" stroke-width="9"/><circle cx="0" cy="' + f(r) + '" r="' + r + '" fill="none" stroke="' + M.bac + '" stroke-width="4.5"/>';
    return VT.wrap(o, out);
  }

  /** Lớp áo cục bộ (hệ Wob 400×400), chèn sau thân, trước quai ba lô. mua: he | dong. o.tuiChia: thẻ gỗ chìa Kiruna thò khỏi túi. */
  function lopAo(mua, o) {
    var id = VT.uid("kbao"), out = '<clipPath id="' + id + '"><path d="' + VT.WOB_BODY + '"/></clipPath>';
    if (mua === "he") {
      // gi-lê kem: hai vạt hai bên mặt, mở giữa (thấy quả cầu), viền #B9A983, túi vá bên phải Wob (trái khung)
      var L = "M 10 100 L 102 112 C 126 170 146 236 162 290 C 166 330 168 380 170 430 L 10 430 Z", R = "M 390 100 L 298 112 C 274 170 254 236 238 290 C 234 330 232 380 230 430 L 390 430 Z";
      out += '<g clip-path="url(#' + id + ')"><path d="' + L + '" fill="' + M.gile + '"/><path d="' + R + '" fill="' + M.gile + '"/>' +
        VT.line("M 102 112 C 126 170 146 236 162 290 C 166 330 168 380 170 430", 9, M.gileVien) + VT.line("M 298 112 C 274 170 254 236 238 290 C 234 330 232 380 230 430", 9, M.gileVien) +
        VT.line("M 108 108 C 132 168 152 234 168 288 C 172 330 174 380 176 430", 3, INK, 0.8) + VT.line("M 292 108 C 268 168 248 234 232 288 C 228 330 226 380 224 430", 3, INK, 0.8) +
        VT.line("M 40 150 C 60 200 70 250 80 300", 2.5, M.gileVien, 0.7) + VT.line("M 360 150 C 340 200 330 250 320 300", 2.5, M.gileVien, 0.7) + "</g>";
      out += VT.shape("M 94 206 L 132 210 L 134 248 L 98 246 Z", M.gile, { sw: 4, ox: 2, oy: 2 }) + VT.line("M 96 216 L 132 220", 3, M.gileVien);
      if (o.tuiChia) out += VT.line("M 116 208 C 114 194 120 184 128 180", 3.5, M.dayDo) + VT.g("rotate(-18 130 180)", rect(120, 158, 150, 180, M.theGo, { sw: 3.5, ox: 1, oy: 1 }));
    } else if (mua === "dong") {
      // áo phao xanh lam: ôm hai bên và dưới mặt (mặt thò ra), đường chần, khoá kéo kem, nắp túi bên phải Wob (trái khung)
      var cid = VT.uid("kbph"), reg = "M 0 112 L 400 112 L 400 440 L 0 440 Z M 112 176 A 88 98 0 1 0 288 176 A 88 98 0 1 0 112 176 Z";
      out += '<clipPath id="' + cid + '"><path d="' + reg + '" clip-rule="evenodd"/></clipPath>';
      out += '<g clip-path="url(#' + id + ')"><g clip-path="url(#' + cid + ')"><rect x="0" y="100" width="400" height="340" fill="' + M.phao + '"/>' +
        VT.line("M 0 170 C 30 168 60 172 120 176 M 280 176 C 340 172 370 168 400 170", 4, M.phaoChan) + VT.line("M 0 216 C 40 214 70 220 120 226 M 280 226 C 330 220 360 214 400 216", 4, M.phaoChan) +
        VT.line("M 0 262 C 80 270 320 270 400 262", 4, M.phaoChan) + VT.line("M 200 274 L 200 440", 6, M.kem) + "</g></g>" +
        VT.line("M 112 176 A 88 98 0 1 0 288 176", 6, M.phaoChan) + VT.line("M 112 176 A 88 98 0 1 0 288 176", 2.5, INK, 0.7) +
        VT.shape("M 92 222 L 132 226 L 130 240 L 94 238 Z", M.phaoChan, { sw: 4, ox: 1, oy: 1 });
    }
    if (o.moc) out += chumChia({ x: 300, y: 196, s: 0.55, kiruna: o.moc === "kiruna", lac: o.lac || 0 });
    return out;
  }

  /** Wob theo khoá trang phục (khoá rig nhóm A, README "Thêm 28/11/2026"). o như VT.wob, thêm: mua "he" | "dong" | "nha";
   *  kinh (kính râm tròn, mặc định có khi hè; "tran" đẩy lên trán; false); tuiChia (thẻ gỗ chìa Kiruna thò khỏi túi phải);
   *  moc ("nha" | "kiruna" | false: chùm chìa móc quai ba lô); vong (khăn quấn hai vòng, mặc định có khi đông). */
  function wob(t, o) {
    var b = { t: t }, k;
    for (k in o) if (["mua", "kinh", "tuiChia", "moc", "vong", "lac"].indexOf(k) < 0) b[k] = o[k];
    var mua = o.mua || "he", moc = o.moc === undefined ? "nha" : o.moc;
    if (mua === "nha") { b.noPack = true; }
    else {
      b.packColor = "kiruna";
      b.keyRing = moc === "kiruna" ? true : moc === "nha" ? "nha" : false;
      if (mua === "dong") {
        b.cold = o.cold !== false;
        b.puffer = { keyTag: o.tuiChia ? 1 : 0 };
        if (o.beanie !== false) b.beanie = o.beanie || "thong";
        if (o.scarf !== false) b.scarf = o.vong === false ? "kem-xanh" : { mau: "kem-xanh", vong: 2 };
      } else {
        b.vest = { keyTag: o.tuiChia ? 1 : 0 };
        b.coatRoll = true;
        if (o.kinh !== false) b.sunglasses = o.kinh === "tran" ? "tran" : "tron";
      }
    }
    if (b.lid == null) b.lid = 0;
    if (!o.noBlink && (!o.eyes || o.eyes === "open" || o.eyes === "wide")) b.lid = Math.max(b.lid, VT.blink(t, 3.3, o.blinkOff || 0.6));
    return VT.wob(b);
  }
  /** Kính râm tròn gọng đen (hệ Wob). */
  function kinhRam(fs) {
    var x0 = 160 + fs, x1 = 238 + fs;
    return VT.ell(x0, 156, 34, 32, "#2a3236", 6, { ox: 0, oy: 0 }) + VT.ell(x1, 156, 34, 32, "#2a3236", 6, { ox: 0, oy: 0 }) +
      VT.line("M " + (x0 + 34) + " 150 Q 199 140 " + (x1 - 34) + " 150", 6) + VT.line("M " + (x0 - 34) + " 150 L " + (x0 - 52) + " 144", 6) + VT.line("M " + (x1 + 34) + " 150 L " + (x1 + 52) + " 144", 6) +
      VT.line("M " + (x0 - 16) + " 142 L " + (x0 - 6) + " 156", 4, "#ffffff", 0.7) + VT.line("M " + (x1 - 16) + " 142 L " + (x1 - 6) + " 156", 4, "#ffffff", 0.7);
  }

  // ---------- nhà thờ gỗ đỏ cách điệu (mái dốc lớn sẫm gợi lều goahti) ----------
  /** Gốc giữa chân tường. o: {x, y, s, th (độ 0..180: xoay quanh trục đứng; 0 = cửa bên phải), L 560, W 250, door 0..1 (mở)}. */
  function nhaTho(o) {
    var th = (o.th || 0) * Math.PI / 180, L = o.L || 560, Wd = o.W || 250, HW = 150, HR = 300;
    var c = Math.abs(Math.cos(th)), sn = Math.sin(th), Ls = L * c, We = Wd * sn, tot = Ls + We, out = "";
    var leftEnd = (o.th || 0) > 90; // mặt hồi (có cửa) ở bên trái
    var sx0 = leftEnd ? -tot / 2 + We : -tot / 2, sx1 = sx0 + Ls, ex0 = leftEnd ? -tot / 2 : sx1, ex1 = ex0 + We;
    function sideFace() {
      if (Ls < 4) return "";
      var s = "", ov = 22 * c, ridge = Ls * 0.24;
      s += rect(sx0, -HW, sx1, 0, M.nhaTho, { sw: 6, ox: 5, oy: 3 });
      for (var x = sx0 + 24 * c; x < sx1 - 6; x += Math.max(10, 24 * c)) s += VT.line("M " + f(x) + " " + (-HW + 6) + " L " + f(x) + " -6", 2.5, INK, 0.35);
      for (var i = 0; i < 4; i++) {
        var wx = sx0 + Ls * (0.2 + i * 0.2), ww = 22 * c;
        if (ww > 3) s += VT.shape("M " + f(wx - ww) + " -48 L " + f(wx - ww) + " -100 Q " + f(wx) + " -124 " + f(wx + ww) + " -100 L " + f(wx + ww) + " -48 Z", "#F6E7B8", { sw: 4, ox: 2, oy: 2 }) + VT.line("M " + f(wx - ww - 4) + " -46 L " + f(wx + ww + 4) + " -46", 5, M.vien);
      }
      var mid = (sx0 + sx1) / 2;
      var roof = "M " + f(sx0 - ov) + " " + (-HW + 8) + " Q " + f(sx0 + Ls * 0.12) + " " + f(-HW - HR * 0.55) + " " + f(mid - ridge) + " " + f(-HW - HR) + " L " + f(mid + ridge) + " " + f(-HW - HR) + " Q " + f(sx1 - Ls * 0.12) + " " + f(-HW - HR * 0.55) + " " + f(sx1 + ov) + " " + (-HW + 8) + " Z";
      s += VT.shape(roof, M.mai, { sw: 6, ox: 6, oy: 4 });
      for (var r = 1; r < 6; r++) { var yy = -HW - HR * r / 6, kk = r / 6; s += VT.line("M " + f(sx0 - ov + (Ls * 0.12 + ridge * 0.5) * kk * 1.3) + " " + f(yy) + " L " + f(sx1 + ov - (Ls * 0.12 + ridge * 0.5) * kk * 1.3) + " " + f(yy), 2.5, M.maiSang, 0.8); }
      // tháp nhỏ trên nóc (đèn lồng gỗ), không chữ thập
      var tw = 26 * c;
      if (tw > 4) s += rect(mid - tw, -HW - HR - 70, mid + tw, -HW - HR + 4, M.nhaTho, { sw: 5, ox: 2, oy: 2 }) + VT.shape("M " + f(mid - tw - 8) + " " + f(-HW - HR - 66) + " L " + f(mid) + " " + f(-HW - HR - 150) + " L " + f(mid + tw + 8) + " " + f(-HW - HR - 66) + " Z", M.mai, { sw: 5, ox: 2, oy: 2 });
      // hiên cửa nhỏ ở đầu có cửa
      var pw = 70 * c, px = leftEnd ? sx0 : sx1, dir = leftEnd ? -1 : 1;
      if (pw > 4 && We < Wd * 0.9) s += rect(Math.min(px, px + dir * pw), -96, Math.max(px, px + dir * pw), 0, M.nhaThoToi, { sw: 5, ox: 2, oy: 2 }) +
        VT.shape("M " + f(px) + " -96 L " + f(px + dir * pw * 1.15) + " -96 L " + f(px) + " -150 Z", M.mai, { sw: 5, ox: 2, oy: 2 });
      return s;
    }
    function endFace() {
      if (We < 4) return "";
      var s = "", mid = (ex0 + ex1) / 2, hw = We / 2, ov = 22 * sn;
      s += rect(ex0, -HW, ex1, 0, M.nhaThoToi, { sw: 6, ox: 5, oy: 3 });
      s += VT.shape("M " + f(ex0 - ov) + " " + (-HW + 8) + " Q " + f(mid - hw * 0.35) + " " + f(-HW - HR * 0.6) + " " + f(mid) + " " + f(-HW - HR) + " Q " + f(mid + hw * 0.35) + " " + f(-HW - HR * 0.6) + " " + f(ex1 + ov) + " " + (-HW + 8) + " Z", M.mai, { sw: 6, ox: 6, oy: 4 });
      s += VT.shape("M " + f(mid - hw * 0.55) + " " + (-HW + 4) + " Q " + f(mid - hw * 0.2) + " " + f(-HW - HR * 0.45) + " " + f(mid) + " " + f(-HW - HR * 0.72) + " Q " + f(mid + hw * 0.2) + " " + f(-HW - HR * 0.45) + " " + f(mid + hw * 0.55) + " " + (-HW + 4) + " Z", M.nhaTho, { sw: 4, ox: 2, oy: 2 });
      var dw = 40 * sn, op = o.door || 0;
      if (dw > 3) {
        s += VT.shape("M " + f(mid - dw) + " 0 L " + f(mid - dw) + " -92 Q " + f(mid) + " -120 " + f(mid + dw) + " -92 L " + f(mid + dw) + " 0 Z", "#4A2A1E", { sw: 5, ox: 2, oy: 2 });
        s += VT.line("M " + f(mid) + " -112 L " + f(mid) + " 0", 3, INK, 0.7) + VT.line("M " + f(mid - dw - 8) + " -96 Q " + f(mid) + " -128 " + f(mid + dw + 8) + " -96", 5, M.vien);
        if (op) s += VT.shape("M " + f(mid) + " 0 L " + f(mid) + " -112 L " + f(mid + dw * (1 - op)) + " -100 L " + f(mid + dw * (1 - op)) + " 0 Z", "#6A3A26", { sw: 4 });
      }
      return s;
    }
    out += sideFace() + endFace();
    return VT.wrap(o, out);
  }
  /** Tháp chuông gỗ đứng riêng: gốc giữa chân, cao ~520. o.vane: vẽ chong chóng gió trên đỉnh (mặc định có); vaneRot. */
  function thapChuong(o) {
    var out = rect(-46, -330, 46, 0, M.nhaTho, { sw: 6, ox: 4, oy: 3 });
    for (var x = -30; x < 46; x += 22) out += VT.line("M " + x + " -320 L " + x + " -8", 2.5, INK, 0.35);
    out += rect(-54, -420, 54, -330, M.nhaThoToi, { sw: 6, ox: 3, oy: 2 }) + VT.shape("M -30 -342 L -30 -398 Q -18 -412 -6 -398 L -6 -342 Z M 6 -342 L 6 -398 Q 18 -412 30 -398 L 30 -342 Z", "#2A1E1A", { sw: 4, ox: 0, oy: 0 });
    out += VT.shape("M -66 -416 L 0 -540 L 66 -416 Z", M.mai, { sw: 6, ox: 4, oy: 3 });
    if (o.vane !== false) out += VT.line("M 0 -540 L 0 -600", 5) + VT.g("translate(0 -596) rotate(" + f(o.vaneRot || 0) + ")", chongChong({ s: 0.6 }));
    return VT.wrap(o, out);
  }
  /** Chong chóng gió (mũi tên trên trục, không chữ): gốc ở trục. */
  function chongChong(o) {
    var out = VT.line("M -60 0 L 60 0", 6) + VT.shape("M 60 -14 L 90 0 L 60 14 Z", M.dong, { sw: 4, ox: 1, oy: 1 }) +
      VT.shape("M -60 0 L -86 -26 L -70 0 L -86 26 Z", M.dong, { sw: 4, ox: 1, oy: 1 }) + VT.dot(0, 0, 8, M.dong) + VT.ell(0, 0, 8, 8, "none", 3);
    return VT.wrap(o, out);
  }

  // ---------- rơ-moóc nhiều bánh ----------
  /** Gốc giữa mặt sàn (đỉnh sàn). o: {x, y, s, w 760, t, quay (độ/giây bánh, 0 = đứng)}. Cao ~66. */
  function roMooc(o) {
    var w = o.w || 760, hw = w / 2, out = "", a = (o.t || 0) * (o.quay || 0);
    var n = Math.round(w / 46);
    for (var i = 0; i < n; i++) {
      var x = -hw + 23 + i * (w - 46) / (n - 1);
      out += VT.g("translate(" + f(x) + " 46) rotate(" + f(a + i * 17) + ")", '<circle cx="0" cy="0" r="18" fill="#2b3134" stroke="' + INK + '" stroke-width="4"/><circle cx="0" cy="0" r="7" fill="#8C969B"/>' + VT.line("M 0 -16 L 0 -8", 4, "#8C969B"));
    }
    out += rect(-hw, 0, hw, 28, "#4A5054", { sw: 6, ox: 3, oy: 3 });
    for (var j = 0; j < 12; j++) { var xx = -hw + 10 + j * (w - 20) / 12; out += VT.shape("M " + f(xx) + " 4 L " + f(xx + 22) + " 4 L " + f(xx + 34) + " 24 L " + f(xx + 12) + " 24 Z", M.vang, { sw: 0, ox: 0, oy: 0 }); }
    out += rect(-hw, 0, hw, 28, "none", { sw: 6, ox: 0, oy: 0 });
    return VT.wrap(o, out);
  }

  // ---------- nón giao thông, băng rào, người que ----------
  function nonGT(o) {
    var out = rect(-50, -12, 50, 0, "#C85A20", { sw: 5, ox: 2, oy: 2 }) +
      VT.shape("M -34 -12 L -9 -124 L 9 -124 L 34 -12 Z", M.cam, { sw: 5, ox: 3, oy: 2 }) +
      VT.shape("M -24 -56 L -18 -84 L 18 -84 L 24 -56 Z", "#FFFDF6", { sw: 3, ox: 0, oy: 0 });
    if (o.tuyet) out += VT.shape("M -14 -122 C -24 -140 22 -146 16 -122 Z", "#FBFDFE", { sw: 4, ox: 0, oy: 0 }) + VT.shape("M -60 -10 C -50 -26 50 -26 60 -10 L 60 2 L -60 2 Z", "#FBFDFE", { sw: 4, ox: 0, oy: 0 });
    return VT.wrap(o, out);
  }
  /** Dải băng rào an toàn đỏ trắng giữa các cọc, từ x0 tới x1 ở độ cao y (đỉnh cọc), t cho băng phất. */
  function bangRao(x0, x1, y, t, o) {
    o = o || {};
    var gap = o.gap || 300, h = o.h || 90, out = "", st = Math.round((t || 0) * 12);
    var posts = [];
    for (var x = x0; x <= x1 + 1; x += gap) posts.push(x);
    for (var i = 0; i < posts.length - 1; i++) {
      var a = posts[i], b = posts[i + 1], sag = 16 + 4 * Math.sin(st * 0.7 + i);
      var d = "M " + f(a) + " " + f(y + 12) + " Q " + f((a + b) / 2) + " " + f(y + 12 + sag * 2) + " " + f(b) + " " + f(y + 12);
      out += VT.line(d, 22) + VT.line(d, 15, "#FFFDF6") + '<path d="' + d + '" fill="none" stroke="#D8443A" stroke-width="15" stroke-dasharray="20 20"/>';
    }
    posts.forEach(function (x) { out += VT.line("M " + f(x) + " " + f(y + h) + " L " + f(x) + " " + f(y), 9) + VT.line("M " + f(x) + " " + f(y + h) + " L " + f(x) + " " + f(y), 4, "#E9E2D0") + VT.dot(x, y, 8, M.cam); });
    return out;
  }
  /** Người que chung (không mặt): gốc giữa hai chân. o: {phase, hat (mũ bảo hộ vàng), remote (hộp điều khiển trước ngực), fill, s}. */
  function nguoiQue(o) {
    var p = (o.phase || 0) * 2 * Math.PI, a = o.phase == null ? 0 : Math.sin(p) * 22, out = "";
    out += VT.line("M 0 -120 L " + f(-a) + " 0", 7) + VT.line("M 0 -120 L " + f(a) + " 0", 7) + VT.line("M 0 -120 L 0 -190", 7);
    if (o.remote) {
      out += VT.line("M 0 -176 L 26 -148 L 46 -150", 7) + VT.line("M 0 -176 L 30 -158 L 48 -154", 7);
      out += rect(38, -168, 74, -140, "#3c4448", { sw: 4, ox: 1, oy: 1 }) + VT.line("M 66 -168 L 76 -196", 4) + VT.dot(76, -198, 4, "#E04A3A") + VT.dot(50, -154, 4, M.vang);
    } else if (o.arms) out += VT.line("M 0 -175 L " + f(o.arms[0][0]) + " " + f(o.arms[0][1]), 7) + VT.line("M 0 -175 L " + f(o.arms[1][0]) + " " + f(o.arms[1][1]), 7);
    else out += VT.line("M 0 -175 L " + f(a * 0.8 + 30) + " -130", 7) + VT.line("M 0 -175 L " + f(-a * 0.8 - 26) + " -134", 7);
    out += VT.ell(0, -214, 24, 24, o.fill || "#F6EEDC", 6);
    if (o.hat) out += VT.shape("M -32 -224 C -30 -256 30 -256 32 -224 Z", M.vang, { sw: 5, ox: 1, oy: 1 }) + VT.line("M -38 -224 L 38 -224", 6);
    return VT.wrap(o, out);
  }

  // ---------- trời hè, đồi, cỏ, cây bạch dương ----------
  function troiHe(col) { return '<rect x="-1400" y="-1400" width="4800" height="3800" fill="' + (col || M.troiHe) + '" opacity="0.92"/>'; }
  function doiXa(y, shift, col) {
    return VT.g("translate(" + f(shift || 0) + " 0)", VT.shape("M -1400 " + y + " C -900 " + (y - 90) + " -500 " + (y - 150) + " -100 " + (y - 70) + " C 300 " + (y - 20) + " 500 " + (y - 230) + " 900 " + (y - 210) + " C 1200 " + (y - 190) + " 1500 " + (y - 60) + " 1900 " + (y - 80) + " C 2300 " + (y - 110) + " 2800 " + (y - 40) + " 3400 " + (y - 70) + " L 3400 " + (y + 600) + " L -1400 " + (y + 600) + " Z", col || M.doiXa, { sw: 4, sop: 0.55, ox: 0, oy: 3 }));
  }
  function bachDuong(o) {
    var h = o.h || 300, out = VT.line("M 0 0 C -4 " + f(-h * 0.4) + " 4 " + f(-h * 0.7) + " 0 " + f(-h), 12) + VT.line("M 0 0 C -4 " + f(-h * 0.4) + " 4 " + f(-h * 0.7) + " 0 " + f(-h), 7, "#F4F1EA");
    for (var i = 0; i < 4; i++) out += VT.line("M -3 " + f(-h * (0.2 + i * 0.18)) + " l 6 0", 3);
    out += VT.shape(VT.smooth([[-70, -h * 0.55], [-80, -h * 0.85], [-30, -h * 1.1], [30, -h * 1.12], [80, -h * 0.9], [74, -h * 0.58], [0, -h * 0.45]], true), o.col || "#8DB06A", { sw: 5, ox: 4, oy: 3 });
    return VT.wrap(o, out);
  }
  function coDat(y, col) {
    return VT.shape("M -1400 " + (y + 6) + " C -400 " + (y - 8) + " 400 " + (y + 10) + " 1100 " + (y - 4) + " C 1800 " + (y - 12) + " 2600 " + (y + 8) + " 3400 " + y + " L 3400 2600 L -1400 2600 Z", col || M.co, { sw: 6, ox: 0, oy: 4 });
  }
  function coLa(x0, x1, y, seed) {
    var out = "";
    for (var x = x0; x < x1; x += 70) { var h = 14 + VT.hash(x * 0.13 + (seed || 0)) * 16; out += VT.line("M " + f(x) + " " + f(y) + " l -6 " + f(-h) + " M " + f(x + 8) + " " + f(y) + " l 6 " + f(-h * 0.8), 3.5, M.coToi, 0.8); }
    return out;
  }

  // ---------- vật nhỏ ----------
  /** Hạt bồ công anh: gốc ở hạt. */
  function boCongAnh(o) {
    var out = VT.line("M 0 0 L 0 -46", 3);
    for (var i = 0; i < 11; i++) { var a = -Math.PI + i * Math.PI / 10; out += VT.line("M 0 -46 L " + f(Math.cos(a) * 30) + " " + f(-46 + Math.sin(a) * 30), 2.5, INK, 0.85) + VT.dot(Math.cos(a) * 30, -46 + Math.sin(a) * 30, 3, "#fffdf6"); }
    out += VT.ell(0, 4, 4, 7, "#8E5527", 2.5);
    return VT.wrap(o, out);
  }
  /** Mặt trời tròn có tia. */
  function matTroi(o) {
    var out = "", st = Math.round((o.t || 0) * 12);
    for (var i = 0; i < 10; i++) { var a = i * Math.PI / 5 + st * 0.05, r0 = 74, r1 = 104 + (i % 2) * 14; out += VT.line("M " + f(Math.cos(a) * r0) + " " + f(Math.sin(a) * r0) + " L " + f(Math.cos(a) * r1) + " " + f(Math.sin(a) * r1), 7, "#E8A93A"); }
    out += VT.ell(0, 0, 60, 60, M.vang, 6);
    return VT.wrap(o, out);
  }
  /** Ngôi nhà gỗ Bắc Âu nhỏ (tường màu, mái tam giác, cửa sổ trắng): gốc giữa chân. o: {w 200, h 140, col, roof, legs (pha bước: nhà có chân que), door}. */
  function nhaNho(o) {
    var w = o.w || 200, h = o.h || 140, hw = w / 2, out = "";
    if (o.legs != null) { var p = o.legs * 2 * Math.PI; [-hw * 0.5, hw * 0.5].forEach(function (x, i) { var a = Math.sin(p + i * Math.PI) * 16, lift = Math.max(0, Math.cos(p + i * Math.PI)) * 10; out += VT.line("M " + f(x) + " 0 L " + f(x + a) + " " + f(54 - lift), 7) + VT.ell(x + a + 8, 56 - lift, 14, 6, "#2b3134", 3); }); }
    out += rect(-hw, -h, hw, 0, o.col || "#D9A441", { sw: 6, ox: 4, oy: 3 });
    for (var y = -h + 22; y < -6; y += 22) out += VT.line("M " + f(-hw + 6) + " " + y + " L " + f(hw - 6) + " " + (y + 1), 2.5, INK, 0.3);
    out += VT.shape("M " + f(-hw - 18) + " " + f(-h + 6) + " L 0 " + f(-h - w * 0.42) + " L " + f(hw + 18) + " " + f(-h + 6) + " Z", o.roof || "#4A4A48", { sw: 6, ox: 4, oy: 3 });
    out += rect(-hw * 0.7, -h * 0.72, -hw * 0.18, -h * 0.36, "#F6E7B8", { sw: 4, ox: 1, oy: 1 }) + VT.line("M " + f(-hw * 0.44) + " " + f(-h * 0.72) + " L " + f(-hw * 0.44) + " " + f(-h * 0.36), 3);
    if (o.door !== false) out += rect(hw * 0.2, -h * 0.62, hw * 0.62, 0, "#6A3A26", { sw: 4, ox: 1, oy: 1 });
    return VT.wrap(o, out);
  }
  /** Cây thông: gốc chân thân. o: {h 260, bow (độ cúi, xoay quanh gốc)}. */
  function cayThong(o) {
    var h = o.h || 260, out = rect(-10, -30, 10, 0, "#6A4A30", { sw: 4, ox: 1, oy: 1 });
    for (var i = 0; i < 3; i++) { var y0 = -30 - i * h * 0.26, w = (3 - i) * 46; out += VT.shape("M " + (-w) + " " + f(y0) + " L 0 " + f(y0 - h * 0.42) + " L " + w + " " + f(y0) + " Z", i % 2 ? "#4F7A5A" : "#5E8E62", { sw: 5, ox: 3, oy: 2 }); }
    var g = VT.g(o.bow ? "rotate(" + f(o.bow) + " 0 0)" : "", out);
    return VT.wrap({ x: o.x, y: o.y, s: o.s }, g);
  }
  /** Đồng xu vàng (không số): gốc tâm, r 26, sx (lật nghiêng). */
  function dongXu(o) {
    var r = o.r || 26;
    return VT.wrap(o, VT.ell(0, 0, r, r, M.dong, 5, { ox: 2, oy: 2 }) + VT.ell(0, 0, r * 0.62, r * 0.62, "none", 3, { stroke: "#8E6E2A" }) + VT.line("M " + f(-r * 0.3) + " " + f(-r * 0.4) + " q 6 -6 14 -4", 3, "#fff4c8", 0.9));
  }
  /** Tờ tiền giấy chồng (không số, không chữ): gốc giữa đáy chồng, n tờ, w 150. */
  function chongTien(o) {
    var w = o.w || 150, n = o.n || 6, out = "";
    for (var i = 0; i < n; i++) { var y = -i * 12, dx = (VT.hash(i * 3.1 + (o.seed || 0)) - 0.5) * 10; out += rect(-w / 2 + dx, y - 14, w / 2 + dx, y, "#9DBA8A", { sw: 3.5, ox: 1, oy: 1 }) + VT.ell(dx, y - 7, 10, 4, "none", 2.5, { stroke: "#5E7E4E" }); }
    return VT.wrap(o, out);
  }
  /** Hòn quặng giấy (nhân vật xuyên suốt: lốm đốm chấm, hai chấm mắt): gốc tâm, r 70. */
  function honQuang(o) {
    var r = o.r || 70, pts = [];
    for (var i = 0; i < 9; i++) { var a = i * Math.PI * 2 / 9, rr = r * (0.82 + 0.3 * VT.hash(i * 2.7 + 11)); pts.push([Math.cos(a) * rr * 1.15, Math.sin(a) * rr * 0.9]); }
    var out = VT.shape(VT.smooth(pts, true), "#4D535C", { sw: 6, ox: 4, oy: 3 });
    for (var j = 0; j < 7; j++) out += VT.dot((VT.hash(j * 5.3) - 0.5) * r * 1.5, (VT.hash(j * 7.1) - 0.5) * r * 1.1, 4 + VT.hash(j) * 3, "#8C96A0");
    out += VT.line("M " + f(-r * 0.6) + " " + f(-r * 0.4) + " q 18 -14 40 -10", 5, "#A9B4BE", 0.8);
    if (o.mat !== false) out += VT.dot(-r * 0.25, -r * 0.08, 7, "#fffdf6") + VT.dot(r * 0.25, -r * 0.08, 7, "#fffdf6") + VT.dot(-r * 0.25 + 1, -r * 0.06, 3.5) + VT.dot(r * 0.25 + 1, -r * 0.06, 3.5);
    return VT.wrap(o, out);
  }

  return {
    M: M, f: f, INK: INK, key: key, seg: seg, clamp: clamp, rectD: rectD, rect: rect,
    wob: wob, chumChia: chumChia, kinhRam: kinhRam, nhaTho: nhaTho, thapChuong: thapChuong, chongChong: chongChong, roMooc: roMooc,
    nonGT: nonGT, bangRao: bangRao, nguoiQue: nguoiQue, troiHe: troiHe, doiXa: doiXa, bachDuong: bachDuong, coDat: coDat, coLa: coLa,
    boCongAnh: boCongAnh, matTroi: matTroi, nhaNho: nhaNho, cayThong: cayThong, dongXu: dongXu, chongTien: chongTien, honQuang: honQuang
  };
};

/* d24 · vẽ tay (321,852–352,728 s; 30,876 s). Vào "cat", ra "cat". Hồi ức tháng 8, không khẩu hình.
 * Nhà thờ gỗ đỏ trên rơ-moóc hơn 200 bánh: Wob ngồi xổm sau dải băng rào giơ ống nhòm → camera MỘT MÌNH lao vào gầm (hàng bánh quay chậm,
 * người que cầm hộp điều khiển) → rơ-moóc đứng chờ: Wob đẩy thử từ phía sau, chân trượt tại chỗ đúng "tonnes." → sơ đồ nhìn từ trên: người que
 * trải thêm dải đường, thẻ 9 m → 24 m viết ở "nine metres", Wob vác dải cuối đặt vào ở "year" → Wob ngồi cạnh nón giao thông, bốn mùa quay vòng,
 * mặt trời mọc lặn hai lần ở "two days.", Wob phủi tuyết, giữ → ba lần vượt (Wob luôn ở NGOÀI dải băng rào): vượt ở "overtook", dừng, gõ chân chờ,
 * vượt lại ở "again."; hạt bồ công anh cũng vượt; đi lùi vẫn trôi lên trước; "Still too fast." Wob đứng yên nhìn thẳng người xem, nhà thờ nhích sau lưng.
 * Không chữ nào ngoài "9 m → 24 m". C27 không nhãn số tấn.
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var tu = function (w, n, e) { return VT.tu(w, n, e); };
  var T_WHEELS = tu("wheels."), T_TONNES = tu("tonnes."), T_NINE = tu("nine"), T_24 = tu("twenty-four,"), T_YEAR = tu("year,"),
    T_A = tu("A"), T_TWO = tu("two", 1), T_DAYS = tu("days."), T_DAYS_E = tu("days.", 0, "end"), T_SIMPLE = tu("simple."), T_WALK = tu("Walk"),
    T_OVER1 = tu("overtook"), T_STOP = tu("stopped."), T_WAIT = tu("waited."), T_OVER2 = tu("overtook", 1), T_AGAIN = tu("again."),
    T_SLOWER = tu("slower"), T_TRIED = tu("tried"), T_STILL = tu("Still"), T_FAST_E = tu("fast.", 0, "end");
  var WS = 0.5, GW = 1000;              // Wob đi trên lề cỏ (y chân) ngoài dải băng
  var DECK = 700, ROAD0 = 650, ROAD1 = 880, TAPE = 836;

  function nen(t, o) {
    o = o || {};
    var s = K.troiHe(o.sky) + K.doiXa(560, -80) + K.doiXa(610, 260, "#B5C9B0");
    for (var i = 0; i < 9; i++) s += K.bachDuong({ x: -700 + i * 470 + VT.hash(i * 3.3) * 140, y: ROAD0 + 6, s: 0.8 + VT.hash(i) * 0.25, col: o.la });
    s += K.rect(-1400, ROAD0, 3400, ROAD1, M.duong, { sw: 6, ox: 0, oy: 3 });
    for (var x = -1400; x < 3400; x += 160) s += VT.line("M " + x + " 768 L " + (x + 80) + " 768", 6, "#F3EEDF", 0.85);
    s += K.coDat(ROAD1 + 4) + K.coLa(-1300, 3300, 960, 1) + K.coLa(-1260, 3300, 1060, 7);
    return s;
  }
  function xeNhaTho(cx, t, quay, th) { return K.roMooc({ x: cx, y: DECK, w: 760, t: t, quay: quay }) + K.nhaTho({ x: cx, y: DECK, th: th || 0, L: 560 }); }
  function W(t, o) { var b = { s: WS, mua: "he", tuiChia: true, moc: "nha" }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }

  // ---------- mốc, sfx ----------
  var B0 = 1.45, C0 = 3.95, D0 = 7.25, E0 = 13.55, F0 = 16.7, G0 = 20.05, H0 = 22.75, I0 = 25.05, J0 = 27.15, K0 = 28.85;
  VT.sfx("whoosh", B0, 0.35);
  var STRIPS = [[2, -1], [3, -1], [4, -1], [5, T_NINE - 1.0], [1, T_NINE - 0.35], [6, T_NINE + 0.45], [0, T_24 + 0.25], [7, T_YEAR]];
  STRIPS.forEach(function (s) { if (s[1] > 0) VT.sfx("pop", s[1] + 0.32, s[0] === 7 ? 0.55 : 0.35); });
  VT.sfx("whoosh", E0 + 0.25, 0.3);
  VT.sfx("ting", T_TWO, 0.35);
  VT.sfx("pop", T_DAYS_E + 0.02, 0.35);

  // vị trí chung đoạn đi bộ (F–K)
  function cxF(t) { return t < H0 ? 700 + 24 * (t - F0) : 1080 + 40 * (t - H0); }
  function wobX(t) {
    if (t < T_WALK) return 800;
    if (t < T_STOP) return 800 + 170 * (t - T_WALK);
    var xs = 800 + 170 * (T_STOP - T_WALK);
    if (t < T_OVER2) return xs;
    var xe = xs + 170 * Math.min(t - T_OVER2, 0.95);
    if (t < J0) return xe;
    return xe + 90 * (Math.min(t, K0) - J0);
  }

  return [
    // A · Wob ngồi xổm sau dải băng rào, ống nhòm; nhà thờ trên rơ-moóc lăn chậm
    { a: 0, b: B0, ten: "ong nhom sau rao", ve: function (t, lt, T) {
      var cx = 1270 + 30 * t, o = { x: 470, y: 1040, s: 0.64, legs: "tuck", bob: 22, flip: 1, armL: [160, 176], armR: [240, 176], handL: "nam", handR: "nam", noBlink: true, eyes: "closed", kinh: false,
        propFront: VT.binoculars({ x: 200, y: 156, s: 0.85, rot: -90 }) };
      var w = nen(t) + xeNhaTho(cx, t, 40) + K.nguoiQue({ x: cx - 470, y: 800, s: 0.95, phase: t * 0.55, remote: true, hat: true }) + K.bangRao(-600, 2600, TAPE, t) + W(t, o);
      return { cam: [960, 560, key(T, [[0, 1.0], [B0, 1.035, "sine"]])], world: w };
    } },
    // B · camera một mình lao vào gầm: hàng hàng bánh nhỏ quay rất chậm, người que đi bên cạnh
    { a: B0, b: C0, ten: "gam ro mooc", ve: function (t, lt, T) {
      var a = t * 22, s = "";
      s += '<rect x="-400" y="-400" width="2720" height="1880" fill="#EFE6CF"/>';
      s += K.rect(-400, 520, 2320, 900, "#DCE7E0", { sw: 0, ox: 0, oy: 0 }); // khe sáng phía xa
      s += K.coDat(560, "#B7CC9A");
      s += K.rect(-400, 640, 2320, 1500, M.duong, { sw: 6, ox: 0, oy: 4 });
      [[540, 40, 150, "#5b6468", 0.6], [640, 58, 210, "#3f474b", 0.8], [790, 84, 270, "#2b3134", 1]].forEach(function (row, ri) {
        var y = row[0], r = row[1], gap = row[2];
        s += VT.line("M -400 " + f(y) + " L 2320 " + f(y), r * 0.35, "#262b2e", row[4]);
        for (var x = -300 + ri * gap * 0.37; x < 2300; x += gap) {
          s += VT.g("translate(" + f(x) + " " + f(y) + ") rotate(" + f(a + x * 0.1) + ")", '<circle cx="0" cy="0" r="' + r + '" fill="' + row[3] + '" stroke="#1f2326" stroke-width="' + f(4 + ri * 2) + '"/>' +
            '<circle cx="0" cy="0" r="' + f(r * 0.4) + '" fill="#8C969B" stroke="#1f2326" stroke-width="3"/>' + VT.line("M 0 " + f(-r * 0.4) + " L 0 " + f(-r * 0.85), 5 + ri * 2, "#8C969B"));
        }
      });
      s += K.rect(-400, -400, 2320, 330, "#3a4044", { sw: 7, ox: 0, oy: 6 });
      for (var bx = -300; bx < 2300; bx += 260) s += K.rect(bx, 300, bx + 60, 470, "#2f3538", { sw: 5, ox: 2, oy: 2 });
      s += VT.line("M -400 400 L 2320 400", 18, "#2f3538") + VT.line("M -400 400 L 2320 400", 4, "#1f2326", 0.6);
      // người que đi bên cạnh (chỉ thấy chân và hộp điều khiển)
      var ph = t * 0.55 * 2 * Math.PI, sw = Math.sin(ph) * 60, px = 1560 + (t - B0) * 18;
      s += VT.line("M " + f(px) + " 360 L " + f(px - sw) + " 1000", 16) + VT.line("M " + f(px) + " 360 L " + f(px + sw) + " 1000", 16);
      s += VT.ell(px - sw + 18, 1004, 34, 12, "#2b3134", 4) + VT.ell(px + sw + 18, 1004, 34, 12, "#2b3134", 4);
      s += VT.line("M " + f(px) + " 200 L " + f(px - 60) + " 420", 16) + K.rect(px - 120, 400, px - 30, 470, "#3c4448", { sw: 5, ox: 2, oy: 2 }) + VT.line("M " + f(px - 44) + " 400 L " + f(px - 30) + " 330", 6) + VT.dot(px - 30, 326, 8, "#E04A3A") + VT.dot(px - 96, 430, 7, M.vang);
      var z = key(T, [[B0, 1.32], [B0 + 0.32, 1.0, "out"], [C0, 1.05, "sine"]]);
      return { cam: [960, 560, z], world: s, tint: "warm" };
    } },
    // C · rơ-moóc đứng chờ: Wob đẩy thử từ phía sau, chân trượt tại chỗ đúng "tonnes."
    { a: C0, b: D0, ten: "day thu", ve: function (t, lt, T) {
      var cx = 1150, rear = cx - 380, slip = t >= T_TONNES - 0.05 && t < T_TONNES + 0.5, push = t >= C0 + 0.55 && t < T_TONNES + 0.5;
      var wx = key(t, [[C0, rear - 420], [C0 + 0.5, rear - 128, "out"]]), lean = push ? (slip ? 30 : 22) : (t > T_TONNES + 0.5 ? 6 : 4);
      var o = { x: wx, y: 792, s: 0.56, flip: 1, lean: lean, eyes: push ? (slip ? "squint" : "open") : "open", brows: push ? "worried" : (t > T_TONNES + 0.5 ? "up" : "flat"),
        mouth: slip ? "chatter" : (push ? "wobbly" : "flat"), px: t > T_TONNES + 0.5 ? 6 : 8, py: t > T_TONNES + 0.5 ? -10 : 0, marks: slip ? "sweat" : "" };
      if (t < C0 + 0.5) { o.legs = "walk"; o.phase = (t - C0) * 2.4; o.stride = 30; }
      else if (push) { o.legs = "walk"; o.phase = slip ? (t - C0) * 7 : (t - C0) * 0.9; o.stride = slip ? 46 : 14; o.autoWalk = false; }
      if (push) { o.armR = VT.wobLocal(o, rear + 2, DECK + 6); o.armL = VT.wobLocal(o, rear + 2, DECK - 30); o.handL = "xoe"; o.handR = "xoe"; }
      var w = nen(t) + xeNhaTho(cx, t, 0) + K.nguoiQue({ x: cx + 470, y: 800, s: 0.95, remote: true, hat: true });
      if (slip) for (var i = 0; i < 3; i++) { var kk = ((t - T_TONNES) * 3 + i / 3) % 1; w += VT.puff({ x: wx - 60 - kk * 90, y: 794 - kk * 20, s: 0.35 + kk * 0.4, op: 0.8 - kk * 0.6, fill: "#E9E2D0" }); }
      w += W(t, o);
      var cam = [key(T, [[C0, rear - 60], [D0, rear - 40, "sine"]]), key(T, [[C0, 600], [D0, 610]]), key(T, [[C0, 1.34], [T_TONNES - 0.2, 1.4, "sine"], [T_TONNES, 1.46, "out"], [D0, 1.48]])];
      return { cam: cam, world: w, shake: slip ? VT.shake(T, T_TONNES, 0.25, 4) : [0, 0] };
    } },
    // D · sơ đồ nhìn từ trên: người que trải thêm dải đường; thẻ 9 m → 24 m; Wob vác dải cuối đặt vào
    { a: D0, b: E0, ten: "noi rong duong", ve: function (t, lt, T) {
      var s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#A9C487"/>';
      for (var g = 0; g < 40; g++) s += VT.line("M " + f(VT.hash(g * 3.1) * 2000 - 40) + " " + f(VT.hash(g * 7.3) * 1080) + " l -5 -14 m 9 14 l 5 -12", 3, M.coToi, 0.7);
      var top = 300, H = 66, n = 0, wobS = "";
      STRIPS.forEach(function (st, si) {
        var i = st[0], t0 = st[1], y = top + i * H, k = t0 < 0 ? 1 : seg(t, t0, t0 + 0.4);
        if (k <= 0 && !(i === 7 && t > T_YEAR - 0.9)) return;
        var from = (si % 2 ? -1 : 1), dx = (1 - VT.ease.out(k)) * 2200 * from;
        if (i === 7) {
          // Wob vác dải cuối vào từ trái (dải trên đầu), thả vào đúng "year"
          var tA = T_YEAR - 0.9;
          if (t < tA) return;
          var wx = key(t, [[tA, 260], [T_YEAR - 0.05, 960, "lin"]]), down = seg(t, T_YEAR - 0.05, T_YEAR + 0.12), lift = (1 - VT.ease.in2(down)) * 130;
          var sx0 = wx - 1220, sx1 = wx + 1220;
          s += K.rect(sx0, y + 4 - lift, sx1, y + H - lift, "#8F9496", { sw: 5, ox: 4, oy: 5 }) + VT.line("M " + f(sx0 + 30) + " " + f(y + H / 2 - lift) + " L " + f(sx1 - 30) + " " + f(y + H / 2 - lift), 4, "#F3EEDF", 0.7);
          var wk = VT.buoc(t, { t0: tA, t1: T_YEAR - 0.05, x0: 260, x1: 960, chuKy: 0.42, s: 0.5 }), carry = t < T_YEAR + 0.1;
          var wo = { x: wx, y: y + H + 82, s: 0.5, flip: 1, legs: t < T_YEAR - 0.05 ? "walk" : "stand", phase: wk.phase, stride: wk.stride,
            sq: t < T_YEAR - 0.05 ? 0.95 : key(t, [[T_YEAR, 0.9], [T_YEAR + 0.25, 1, "back"]]), mouth: t < T_YEAR ? "wobbly" : "content", brows: t < T_YEAR ? "worried" : "flat" };
          if (carry) { wo.armL = VT.wobLocal(wo, wx - 70, y + H - lift); wo.armR = VT.wobLocal(wo, wx + 70, y + H - lift); wo.handL = "xoe"; wo.handR = "xoe"; }
          if (t > T_YEAR + 0.35) { var cl = Math.sin((t - T_YEAR) * 22) * 18; wo.armL = [172 + cl, 250]; wo.armR = [228 - cl, 250]; }
          wobS = W(t, wo);
          if (down > 0 && t < T_YEAR + 0.45) wobS += VT.puffBurst({ x: wx + 300, y: y + H + 6, k: seg(t, T_YEAR + 0.05, T_YEAR + 0.45), s: 0.7, spread: 120 }) + VT.puffBurst({ x: wx - 400, y: y + H + 6, k: seg(t, T_YEAR + 0.05, T_YEAR + 0.45), s: 0.6, spread: 110 });
          return;
        }
        n++;
        s += K.rect(-260 + dx, y + 4, 2180 + dx, y + H, "#8F9496", { sw: 5, ox: 4, oy: 5 }) + VT.line("M " + f(-230 + dx) + " " + f(y + H / 2) + " L " + f(2150 + dx) + " " + f(y + H / 2), 4, "#F3EEDF", 0.7);
        if (t0 > 0 && k < 1) s += K.nguoiQue({ x: (from > 0 ? -220 : 2140) + dx, y: y + H + 4, s: 0.55, phase: t * 1.6, hat: true, arms: [[from > 0 ? 40 : -40, -150], [from > 0 ? 44 : -44, -140]] });
      });
      // người que công nhân đứng chờ hai bên mép, đổi chỗ theo dải
      s += K.nguoiQue({ x: 180, y: 270, s: 0.55, hat: true }) + K.nguoiQue({ x: 1750, y: 270, s: 0.55, hat: true, phase: 0.25 });
      // mũi tên đo bề rộng (không số)
      var stripsNow = STRIPS.filter(function (st) { return st[1] < 0 || t >= st[1] + 0.4; }).map(function (st) { return st[0]; });
      var mn = Math.min.apply(null, stripsNow), mx = Math.max.apply(null, stripsNow), y0 = top + mn * H + 8, y1 = top + (mx + 1) * H - 4;
      s += VT.line("M 1880 " + f(y0) + " L 1880 " + f(y1), 6) + VT.line("M 1864 " + f(y0 + 18) + " L 1880 " + f(y0) + " L 1896 " + f(y0 + 18), 6) + VT.line("M 1864 " + f(y1 - 18) + " L 1880 " + f(y1) + " L 1896 " + f(y1 - 18), 6);
      // thẻ gỗ cắm cọc: 9 m → 24 m viết dần từ "nine" tới "twenty-four"
      s += VT.line("M 1110 210 L 1110 296", 9, "#6A4A30") + K.rect(800, 118, 1420, 216, "#F6EEDC", { sw: 6, ox: 6, oy: 6 });
      s += VT.textWrite(1110, 190, "9 m → 24 m", 66, seg(t, T_NINE - 0.05, T_24 + 0.25), { fill: "#2c4f6e" });
      s += wobS;
      return { cam: [960, key(T, [[D0, 560], [E0, 575]]), key(T, [[D0, 1.0], [E0, 1.06, "sine"]])], world: s };
    } },
    // E · Wob ngồi cạnh nón giao thông; bốn mùa quay vòng; mặt trời mọc lặn hai lần ở "two days."; phủi tuyết; giữ
    { a: E0, b: F0, ten: "bon mua", ve: function (t, lt, T) {
      var sit = E0 + 0.28, ss = [[E0 + 0.3, "dong"], [E0 + 0.6, "xuan"], [E0 + 0.9, "thu"], [E0 + 1.2, "dong"]];
      var mua = "he"; ss.forEach(function (q) { if (t >= q[0]) mua = q[1]; });
      var snow = mua === "dong" && t < T_DAYS_E + 0.02;
      var sky = mua === "dong" ? "#DCE6EC" : mua === "thu" ? "#E9DCC0" : M.troiHe, la = mua === "dong" ? "#E8EEF0" : mua === "thu" ? "#D98A3A" : mua === "xuan" ? "#A8CC72" : null;
      var nightK = 0;
      if (t >= T_TWO - 0.02 && t < T_DAYS_E) { var q = ((t - T_TWO) / ((T_DAYS_E - T_TWO) / 2)) % 1; nightK = q > 0.78 ? 1 : 0; }
      var s = K.troiHe(sky) + K.doiXa(560, -80) + K.doiXa(610, 260, "#B5C9B0");
      if (t >= T_TWO - 0.02 && t < T_DAYS_E) { var qq = ((t - T_TWO) / ((T_DAYS_E - T_TWO) / 2)) % 1; s += K.matTroi({ x: VT.lerp(260, 1720, qq), y: 600 - Math.sin(qq * Math.PI) * 330, s: 0.75, t: t }); }
      else if (mua !== "dong") s += K.matTroi({ x: 1500, y: 330, s: 0.6, t: t });
      for (var i = 0; i < 6; i++) s += K.bachDuong({ x: -300 + i * 470 + VT.hash(i * 3.3) * 120, y: ROAD0 + 6, s: 0.85, col: la });
      s += K.rect(-1400, ROAD0, 3400, ROAD1, M.duong, { sw: 6, ox: 0, oy: 3 }) + K.coDat(ROAD1 + 4, mua === "thu" ? "#B7B46A" : M.co);
      if (snow) s += VT.shape("M -1400 " + (ROAD1 - 6) + " C 0 " + (ROAD1 - 20) + " 1200 " + (ROAD1 + 4) + " 3400 " + (ROAD1 - 10) + " L 3400 2600 L -1400 2600 Z", "#FBFDFE", { sw: 6, ox: 0, oy: 4 }) + K.rect(-1400, ROAD0, 3400, ROAD1 - 6, "#EEF3F5", { sw: 0, ox: 0, oy: 0 });
      if (mua === "xuan") for (var fl = 0; fl < 26; fl++) { var fx = 300 + VT.hash(fl * 4.1) * 1400, fy = 920 + VT.hash(fl * 2.3) * 140; s += VT.line("M " + f(fx) + " " + f(fy) + " l 0 22", 3, M.coToi) + VT.ell(fx, fy, 9, 9, ["#F2C14E", "#F6EEDC", "#E58BA0"][fl % 3], 3); }
      if (mua === "thu") for (var lf = 0; lf < 16; lf++) { var lx = 200 + VT.hash(lf * 5.7) * 1500, ly = 300 + ((VT.hash(lf * 1.9) * 700 + (t - E0) * 900) % 760); s += VT.g("translate(" + f(lx) + " " + f(ly) + ") rotate(" + f(lf * 40 + t * 300) + ")", VT.shape("M 0 -12 C 10 -6 10 6 0 12 C -10 6 -10 -6 0 -12 Z", lf % 2 ? "#D98A3A" : "#C9463A", { sw: 3, ox: 1, oy: 1 })); }
      if (snow && t < T_TWO) s += VT.snowfall(t, 40, [-200, -100, 2100, 1100], 300);
      var o = { x: 860, y: 905 + 92 * 0.6, s: 0.6, flip: 1, legs: t < sit ? "stand" : "sit", sq: key(t, [[sit - 0.01, 1], [sit, 0.88], [sit + 0.25, 1, "back"]]), mouth: "flat", brows: "flat", lid: 0.25, noBlink: t > T_DAYS_E,
        snowhat: (snow || (mua === "dong" && t < T_DAYS_E + 0.3)) ? true : false };
      if (t < sit) { o.y = key(t, [[E0, 905], [sit, 905 + 92 * 0.6, "in2"]]); o.legs = "tuck"; }
      if (t >= T_TWO - 0.02 && t < T_DAYS_E) { o.px = key(t, [[T_TWO, -10], [T_DAYS_E, 10, "lin"]]); o.py = -10; o.eyes = "open"; }
      if (t >= T_DAYS_E - 0.05 && t < T_DAYS_E + 0.35) { var bb = Math.sin((t - T_DAYS_E) * 30) * 22; o.armR = [250 + bb, 36]; o.handR = "xoe"; o.snowhat = t < T_DAYS_E + 0.12; }
      var cone = K.nonGT({ x: 1120, y: 960, s: 1.3, tuyet: snow || (mua === "dong" && t < T_DAYS_E + 0.3) });
      s += cone + W(t, o);
      if (t >= T_DAYS_E + 0.06 && t < T_DAYS_E + 0.4) s += VT.puffBurst({ x: VT.wobPt(o, 200, 20)[0], y: VT.wobPt(o, 200, 20)[1], k: seg(t, T_DAYS_E + 0.06, T_DAYS_E + 0.4), s: 0.6, spread: 70 });
      var cam = [990, key(T, [[E0, 640], [T_TWO - 0.3, 640], [T_DAYS_E + 0.1, 680, "io"]]), key(T, [[E0, 1.2], [T_TWO - 0.3, 1.24, "sine"], [T_DAYS_E + 0.1, 1.42, "io"], [F0, 1.5, "sine"]])];
      return { cam: cam, world: s + (nightK ? '<rect x="-400" y="-400" width="2720" height="1880" fill="#1E2A44" opacity="0.55"/>' : ""), tint: snow ? "cold" : "warm" };
    } },
    // F–J · đi bộ cạnh nhà thờ (Wob luôn ở lề cỏ ngoài dải băng)
    { a: F0, b: G0, ten: "di canh nha tho", ve: function (t, lt, T) { return diBo(t, T, "F"); } },
    { a: G0, b: H0, ten: "vuot lan 1", ve: function (t, lt, T) { return diBo(t, T, "G"); } },
    { a: H0, b: I0, ten: "cho roi vuot lai", ve: function (t, lt, T) { return diBo(t, T, "H"); } },
    { a: I0, b: J0, ten: "bo cong anh", ve: function (t, lt, T) { return diBo(t, T, "I"); } },
    { a: J0, b: K0, ten: "di lui", ve: function (t, lt, T) { return diBo(t, T, "J"); } },
    { a: K0, b: DUR, ten: "still too fast", ve: function (t, lt, T) { return diBo(t, T, "K"); } },
  ];

  function diBo(t, T, sh) {
    var cx = cxF(t), x = wobX(t), s = nen(t), o = { x: x, y: GW, flip: 1, mouth: "content", brows: "flat" };
    // người que đi bộ cùng nhà thờ (mép đường phía xa), rồi nhà thờ, người cầm hộp điều khiển đi sau rơ-moóc
    s += K.nguoiQue({ x: cx + 520, y: 676, s: 0.7, phase: t * 0.45 + 0.3 }) + K.nguoiQue({ x: cx - 560, y: 680, s: 0.72, phase: t * 0.45 + 0.6, fill: "#E9DDC3" }) + K.nguoiQue({ x: cx + 700, y: 672, s: 0.68, phase: t * 0.45 + 0.1 });
    s += xeNhaTho(cx, t, 34) + K.nguoiQue({ x: cx - 470, y: 800, s: 0.92, phase: t * 0.45, remote: true, hat: true });
    s += K.bangRao(-600, 3000, TAPE, t);
    // tư thế Wob theo mốc
    var walking = (t >= T_WALK && t < T_STOP) || (t >= T_OVER2 && t < T_OVER2 + 0.95) || (t >= J0 && t < K0);
    if (walking) {
      o.legs = "walk";
      if (t < T_STOP) o.phase = (t - T_WALK) / 0.52; else if (t < J0) o.phase = (t - T_OVER2) / 0.52; else o.phase = -(t - J0) / 0.62;
      o.stride = t >= J0 ? 26 : 44;
    }
    if (t < T_WALK) { // chỉnh kính râm
      var adj = seg(t, T_SIMPLE - 0.35, T_SIMPLE + 0.1), back = seg(t, T_SIMPLE + 0.25, T_SIMPLE + 0.5);
      if (adj > 0 && back < 1) { o.armR = [VT.lerp(338, 262, adj * (1 - back)), VT.lerp(300, 138, adj * (1 - back))]; o.handR = "chi"; }
      o.mouth = adj > 0 ? "smirk" : "content";
    }
    if (t >= T_OVER1 && t < T_STOP) { o.px = t > T_OVER1 + 0.4 && t < T_OVER1 + 1.3 ? -12 : 6; o.mouth = t > T_OVER1 + 0.4 ? "o" : "content"; o.brows = t > T_OVER1 + 0.4 ? "up" : "flat"; }
    if (t >= T_STOP && t < T_OVER2) { // dừng, gõ chân chờ, khoanh tay
      o.sq = key(t, [[T_STOP, 0.9], [T_STOP + 0.2, 1, "back"]]); o.lean = key(t, [[T_STOP, -8], [T_STOP + 0.25, 0, "out"]]);
      if (t >= T_WAIT - 0.1) { o.armL = [252, 252]; o.armR = [148, 252]; o.legs = Math.floor((t - T_WAIT) * 6) % 2 ? "tiptoe" : "stand"; o.px = -12; o.brows = "skeptic"; o.mouth = "flat"; }
      else { o.px = -12; o.mouth = "flat"; }
    }
    if (t >= T_OVER2 && t < I0) { o.mouth = "content"; o.px = 8; }
    var seedX = 0, seedY = 0;
    if (t >= I0 && t < J0) {
      var ks = (t - I0) / (J0 - I0); seedX = VT.lerp(980, 1700, ks) + Math.sin(ks * 9) * 14; seedY = VT.lerp(450, 860, ks) + Math.sin(ks * 13) * 24;
      var hc = VT.wobPt(o, 200, 156); o.px = clamp((seedX - hc[0]) * 0.03, -12, 12); o.py = clamp((seedY - hc[1]) * 0.03, -10, 10); o.mouth = "oSmall"; o.brows = "up"; o.noBlink = true;
      s += K.boCongAnh({ x: seedX, y: seedY, s: 1.9, rot: Math.sin(ks * 7) * 15 });
    }
    if (t >= J0 && t < K0) { o.flip = -1; o.px = 10; o.brows = "worried"; o.mouth = "flat"; }
    if (t >= K0) { // đứng yên hẳn, nhìn thẳng người xem, tỉnh bơ
      o.px = 0; o.py = 2; o.lid = key(t, [[K0, 0], [T_STILL + 0.3, 0.42]]); o.brows = "flat"; o.mouth = "flat"; o.noBlink = true;
      o.sq = key(t, [[K0, 0.94], [K0 + 0.2, 1, "back"]]);
      if (t > T_FAST_E + 0.2) o.lid = Math.max(o.lid, VT.slowBlink(t, T_FAST_E + 0.45, 0.3));
    }
    s += W(t, o);
    var cam;
    if (sh === "F") cam = [key(T, [[F0, 980], [T_WALK, 1000], [G0, 1270, "io"]]), 560, key(T, [[F0, 0.95], [G0, 0.98]])];
    else if (sh === "G") cam = [key(T, [[G0, 1300], [T_STOP, 1460, "io"], [H0, 1480]]), 640, key(T, [[G0, 1.18], [H0, 1.22]])];
    else if (sh === "H") cam = [key(T, [[H0, 1470], [T_OVER2, 1480], [I0, 1560, "io"]]), 680, key(T, [[H0, 1.4], [T_OVER2, 1.46, "sine"], [I0, 1.38]])];
    else if (sh === "I") cam = [key(T, [[I0, 1400], [J0, 1470, "sine"]]), 590, key(T, [[I0, 1.0], [J0, 1.04]])];
    else if (sh === "J") cam = [key(T, [[J0, 1640], [K0, 1760, "io"]]), 640, key(T, [[J0, 1.2], [K0, 1.24]])];
    else { var hp = VT.wobPt({ x: x, y: GW, s: WS }, 190, 190); cam = [hp[0] - 70, hp[1] - 20, key(T, [[K0, 2.1], [T_STILL, 2.12], [T_STILL + 0.15, 2.22, "out"], [DUR, 2.3, "sine"]])]; }
    return { cam: cam, world: s };
  }
};
