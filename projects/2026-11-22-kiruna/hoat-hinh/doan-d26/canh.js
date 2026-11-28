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
