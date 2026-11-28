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

/* d29 · vẽ tay (414,744–434,860 s; 20,116 s; căn lại 28/11/2026 theo lời mới của cảnh 10). Vào "cat", ra "cat". Hồi ức tháng 8, không khẩu hình.
 * Bong bóng tưởng tượng (viền mây): xe tải dọn nhà chở NGUYÊN một dãy phố (nhà, cây thông, cột đèn); Wob ngồi trên nóc cabin giữ chặt chùm chìa;
 * ở "a whole street into one van," xe chui qua cầu: cây thông cúi rạp đầu, Wob (đã qua cầu rồi) cũng cúi rạp theo, rồi cả hai cùng ngẩng lên; giữ tới "it.";
 * ở "paying" tháp giếng mỏ tí hon thả một đồng xu theo dây cáp xuống bàn tay chung của bác tài (không mặt).
 * Sơ đồ: ngã ba với hai biển hình (ngôi nhà / đồng xu) → hai ngôi nhà giống hệt, dấu "=", Wob đảo chỗ như trò úp cốc rồi nhún vai →
 * cân đĩa: nhà giấy / chồng tiền, thêm một phần tư chồng ở "plus" (ka-ching), thẻ "market value +25%" → Wob đặt chùm chìa lên đĩa ở "key ring" →
 * cận mặt cân: kim nhích tới vạch hình trái tim nhỏ ở "sentimental."; Wob lấy chùm chìa lại ôm vào lòng; giữ. Không cờ hộp thư.
 * Chữ: chỉ "=" và "market value +25%". Mặt cân chỉ có vạch và một trái tim (không chữ, không số).
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var T_WHOLE = VT.tu("whole"), T_STREET = VT.tu("street"), T_PAY = VT.tu("paying"), T_VAN_E = VT.tu("van,", 0, "end"), T_IT_E = VT.tu("it.", 0, "end"),
    T_HOME_OWN = VT.tu("Homeowners"), T_LKAB = VT.tu("LKAB"), T_EQ = VT.tu("equivalent"), T_HOME_E = VT.tu("home.", 0, "end"),
    T_OR = VT.tu("Or"), T_PAYS = VT.tu("pays"), T_MARKET = VT.tu("market"), T_PLUS = VT.tu("plus"), T_25 = VT.tu("twenty-five"), T_PCT_E = VT.tu("percent,", 0, "end"),
    T_INDEP = VT.tu("independent"), T_ASKED = VT.tu("asked"), T_KEY = VT.tu("key"), T_WORTH_E = VT.tu("worth.", 0, "end"),
    T_SAID = VT.tu("said,"), T_SENT = VT.tu("sentimental."), T_SENT_E = VT.tu("sentimental.", 0, "end"), T_OR0 = VT.tu("Or"), T_AN = VT.tu("An", 2);
  // mốc cắt theo lời mới (cũ: 3.3, 5.15, 6.95, 9.35, 14.3, 17.0 với lời cũ dài hơn 0,56 s)
  var A2 = T_VAN_E + 0.12, B0 = T_HOME_OWN - 0.12, C0 = T_LKAB, D0 = T_OR0 - 0.03, E0 = T_ASKED - 0.29, F0 = T_AN - 0.06;
  var TX = 0.25; // dời chuyển động xe: cây thông chui cầu đúng "a whole street into one van,
  var ROAD = 860, XB = 1250;
  VT.sfx("whoosh", T_WHOLE - 0.05, 0.3);
  VT.sfx("ting", T_PAY + 0.42, 0.45);
  VT.sfx("pop", T_PAYS + 0.25, 0.4);
  VT.sfx("ka-ching", T_PLUS, 0.6);
  VT.sfx("ting", T_KEY + 0.25, 0.5);
  VT.sfx("ting", T_SENT_E + 0.1, 0.35);

  function W(t, o) { var b = { s: 0.5, mua: "he", moc: false }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }
  /** Chùm chìa cầm tay (có chìa Kiruna). */
  function chiaTay(x, y, s, lac) { return K.chumChia({ x: x, y: y, s: s || 0.6, kiruna: true, lac: lac || 0 }); }

  // ---------- A: xe tải dọn nhà ----------
  function x0(t) { return t < 3.5 ? 1850 + 300 * (t - 2.5) : key(t, [[3.5, 2150], [4.1, 2290, "out2"]]); } // cây thông ra khỏi cầu (xf ≥ 2220) ở t + TX ≈ 3,83
  function xeTai(xf, t, bow, wobO) {
    var tt = t + TX, s = "", run = tt < 4.05, a = (tt * 300 / 36) * 57.3;
    var deckY = ROAD - 84, bedL = xf - 980, bedR = xf - 210;
    // hàng phố trên sàn xe: vỉa hè, nhà, cột đèn, cây thông
    s += K.rect(bedL + 10, deckY - 22, bedR - 10, deckY, "#C9C2B2", { sw: 5, ox: 2, oy: 2 });
    s += K.nhaNho({ x: bedL + 150, y: deckY - 22, s: 0.78, col: "#D9A441" }) + K.nhaNho({ x: bedL + 560, y: deckY - 22, s: 0.72, col: "#C9463A", roof: "#3E3430" });
    s += VT.line("M " + f(bedL + 690) + " " + f(deckY - 22) + " L " + f(bedL + 690) + " " + f(deckY - 330), 9) + VT.line("M " + f(bedL + 690) + " " + f(deckY - 330) + " q 30 -10 44 14", 7) + VT.shape("M " + f(bedL + 722) + " " + f(deckY - 318) + " l 30 0 l -8 22 l -16 0 Z", "#F6D36A", { sw: 4, ox: 1, oy: 1 });
    s += K.cayThong({ x: bedL + 360, y: deckY - 22, h: 360, bow: bow });
    // sàn xe, cabin, bánh
    s += K.rect(bedL, deckY, bedR, deckY + 30, "#7C8C96", { sw: 6, ox: 3, oy: 3 });
    s += K.rect(bedR, ROAD - 250, xf, deckY + 30, "#E9DDC3", { sw: 6, ox: 4, oy: 3 }) + K.rect(bedR + 90, ROAD - 230, xf - 16, ROAD - 150, "#BFE3F2", { sw: 5, ox: 1, oy: 1 });
    s += K.rect(bedR + 10, ROAD - 140, xf - 10, ROAD - 128, "#C9463A", { sw: 0, ox: 0, oy: 0 }) + K.rect(xf - 24, deckY - 6, xf + 8, deckY + 22, "#F6D36A", { sw: 4, ox: 1, oy: 1 });
    [bedL + 110, bedL + 220, xf - 110].forEach(function (wx) { s += VT.g("translate(" + f(wx) + " " + f(ROAD - 34) + ") rotate(" + f(run ? a : 0) + ")", '<circle cx="0" cy="0" r="34" fill="#2b3134" stroke="#1f2326" stroke-width="5"/><circle cx="0" cy="0" r="12" fill="#8C969B"/>' + VT.line("M 0 -12 L 0 -28", 5, "#8C969B")); });
    if (wobO) s += W(t, wobO);
    return s;
  }
  function nenDuong(t) {
    var s = K.troiHe("#DCEAEE") + K.doiXa(600, -100) + K.coDat(700, "#B9C98F");
    s += K.rect(-1400, 700, 3800, ROAD + 40, M.duong, { sw: 6, ox: 0, oy: 3 });
    for (var x = -1400; x < 3800; x += 180) s += VT.line("M " + x + " " + (ROAD + 6) + " L " + (x + 90) + " " + (ROAD + 6), 6, "#F3EEDF", 0.8);
    s += K.coDat(ROAD + 40, M.co);
    return s;
  }
  function cau(front) {
    if (!front) return K.rect(XB - 210, 440, XB - 150, ROAD - 150, "#B9AFA0", { sw: 5, ox: 2, oy: 2 }) + K.rect(XB + 150, 440, XB + 210, ROAD - 150, "#B9AFA0", { sw: 5, ox: 2, oy: 2 });
    var s = K.rect(XB - 260, 380, XB + 260, 444, "#9E978C", { sw: 6, ox: 4, oy: 4 }) + VT.line("M " + (XB - 260) + " 330 L " + (XB + 260) + " 330", 6);
    for (var x = XB - 250; x <= XB + 250; x += 50) s += VT.line("M " + x + " 330 L " + x + " 380", 4);
    return s;
  }
  function thapGieng(x, y, coin) {
    var s = VT.line("M " + (x - 70) + " " + y + " L " + x + " " + (y - 260) + " L " + (x + 70) + " " + y, 9) + VT.line("M " + (x - 52) + " " + (y - 70) + " L " + (x + 52) + " " + (y - 70) + " M " + (x - 34) + " " + (y - 140) + " L " + (x + 34) + " " + (y - 140) + " M " + (x - 52) + " " + (y - 70) + " L " + (x + 34) + " " + (y - 140) + " M " + (x + 52) + " " + (y - 70) + " L " + (x - 34) + " " + (y - 140), 5);
    s += K.rect(x - 70, y - 40, x + 70, y, "#8E5527", { sw: 5, ox: 2, oy: 2 });
    var wy = y - 262;
    s += VT.ell(x, wy, 34, 34, "#C9C2B2", 6) + VT.line("M " + (x - 30) + " " + wy + " L " + (x + 30) + " " + wy + " M " + x + " " + (wy - 30) + " L " + x + " " + (wy + 30), 4) + VT.dot(x, wy, 7);
    if (coin) s += VT.line("M " + (x - 34) + " " + wy + " L " + f(coin[0]) + " " + f(coin[1] - 24), 3.5) + K.dongXu({ x: coin[0], y: coin[1], r: 22 });
    return s;
  }

  return [
    { a: 0, b: A2, ten: "xe cho ca pho", ve: function (t, lt, T) { return canhXe(t, T, "A1"); } },
    { a: A2, b: B0, ten: "thap gieng tra tien", ve: function (t, lt, T) { return canhXe(t, T, "A2"); } },
    // B · ngã ba hai biển hình
    { a: B0, b: C0, ten: "nga ba", ve: function (t, lt, T) {
      var s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#A9C487"/>';
      s += VT.shape("M 860 1200 L 900 700 C 820 560 560 420 260 330 L 380 250 C 640 330 880 470 960 600 C 1040 470 1280 330 1540 250 L 1660 330 C 1360 420 1100 560 1020 700 L 1060 1200 Z", M.duong, { sw: 6, ox: 4, oy: 4 });
      s += VT.line("M 960 1180 L 960 720", 6, "#F3EEDF") + VT.line("M 940 640 C 800 520 600 420 360 330", 5, "#F3EEDF", 0.7) + VT.line("M 980 640 C 1120 520 1320 420 1560 330", 5, "#F3EEDF", 0.7);
      // biển hai mũi tên có hình (không chữ)
      var pop = VT.ease.back(seg(t, B0 + 0.05, B0 + 0.4));
      s += VT.line("M 960 640 L 960 330", 12, "#6A4A30");
      s += VT.g("translate(960 380) scale(" + f(pop) + ")", K.rect(-250, -50, -20, 50, "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + VT.shape("M -250 -50 L -300 0 L -250 50 Z", "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + K.nhaNho({ x: -140, y: 32, s: 0.32, col: "#D9A441" }));
      s += VT.g("translate(960 470) scale(" + f(pop) + ")", K.rect(20, -50, 250, 50, "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + VT.shape("M 250 -50 L 300 0 L 250 50 Z", "#FFFDF6", { sw: 6, ox: 4, oy: 4 }) + K.dongXu({ x: 135, y: 0, r: 32 }));
      var look = t < T_HOME_OWN + 0.5 ? 0 : (Math.floor((t - T_HOME_OWN - 0.5) * 1.6) % 2 ? 12 : -12);
      var o = { x: 960, y: 1010, s: 0.62, px: look, py: -8, mouth: "flat", brows: "worried", armR: [270, 250], handR: "nam", propFront: chiaTay(258, 240, 0.7, Math.sin(t * 8) * 6) };
      s += W(t, o);
      return { cam: [960, key(T, [[B0, 600], [C0, 620]]), key(T, [[B0, 1.0], [C0, 1.05, "sine"]])], world: s };
    } },
    // C · hai ngôi nhà giống hệt, dấu =, Wob đảo như úp cốc, nhún vai
    { a: C0, b: D0, ten: "hai nha bang nhau", ve: function (t, lt, T) {
      var s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#E9E2D0"/>' + K.coDat(780, "#B9C98F");
      var sh0 = T_EQ - 0.2, sh1 = T_EQ + 0.55, k = seg(t, sh0, sh1), swaps = 3, ph = k * swaps, n = Math.floor(ph), fr = ph - n;
      var pA = 660, pB = 1260, xa, xb, ya = 0, yb = 0;
      var e = VT.ease.io(fr), aL = (n % 2 === 0), cur = [aL ? pA : pB, aL ? pB : pA], nxt = [cur[1], cur[0]];
      if (k <= 0) { xa = pA; xb = pB; } else if (k >= 1) { xa = swaps % 2 ? pB : pA; xb = swaps % 2 ? pA : pB; }
      else { xa = VT.lerp(cur[0], nxt[0], e); xb = VT.lerp(cur[1], nxt[1], e); ya = -Math.sin(fr * Math.PI) * 120; yb = Math.sin(fr * Math.PI) * 40; }
      s += K.nhaNho({ x: xb, y: 780 + yb, s: 1.3, col: "#C9463A", roof: "#3E3430" }) + K.nhaNho({ x: xa, y: 780 + ya, s: 1.3, col: "#C9463A", roof: "#3E3430" });
      s += VT.text(960, 640, "=", 130, { fill: "#2c4f6e" });
      var o = { x: 960, y: 1010, s: 0.6, mouth: "content", brows: "flat" };
      if (k > 0 && k < 1) { var c = Math.sin(k * Math.PI * 6); o.armL = [70, 120 + c * 40]; o.armR = [330, 120 - c * 40]; o.handL = "xoe"; o.handR = "xoe"; o.mouth = "smirk"; }
      if (t >= sh1) { var look = Math.floor((t - sh1) * 5) % 2 ? 12 : -12; o.px = t < T_HOME_E - 0.25 ? look : 0; o.brows = "worried"; o.mouth = "wobbly"; }
      if (t >= T_HOME_E - 0.25) { o.arms = "shrug"; o.brows = "up"; o.mouth = "flat"; o.sq = key(t, [[T_HOME_E - 0.25, 0.94], [T_HOME_E, 1.03], [T_HOME_E + 0.2, 1]]); }
      o.armR = o.armR || (o.arms ? undefined : [276, 250]); if (!o.arms && !(k > 0 && k < 1)) { o.handR = "nam"; o.propFront = chiaTay(264, 240, 0.7, 0); }
      s += W(t, o);
      return { cam: [960, key(T, [[C0, 600], [D0, 610]]), key(T, [[C0, 1.0], [D0, 1.06, "sine"]])], world: s };
    } },
    // D–F · cân đĩa
    { a: D0, b: E0, ten: "can gia tri", ve: function (t, lt, T) { return canhCan(t, T, "D"); } },
    { a: E0, b: F0, ten: "dat chum chia", ve: function (t, lt, T) { return canhCan(t, T, "E"); } },
    { a: F0, b: DUR, ten: "kim trai tim", ve: function (t, lt, T) { return canhCan(t, T, "F"); } },
  ];

  function canhXe(t, T, sh) {
    var xf = x0(t + TX), s = nenDuong(t);
    var tTree = seg(t, T_WHOLE + 0.02, T_WHOLE + 0.3), tUp = seg(t, 3.52 - TX + 0.25, 3.8 - TX + 0.25), bow = -70 * VT.ease.out(tTree) * (1 - VT.ease.back(tUp));
    var duck = tTree * (1 - tUp);
    s += cau(false);
    // tháp giếng mỏ tí hon bên đường (phía xa), đồng xu theo cáp
    var tx = 2420, ty = 720, coin = null;
    if (t >= T_PAY - 0.05) { var kc = seg(t, T_PAY - 0.05, T_PAY + 0.4); coin = [VT.lerp(tx - 34, xf - 14, kc), VT.lerp(ty - 262, ROAD - 214, kc)]; }
    s += thapGieng(tx, ty, t < T_PAY + 0.42 ? coin : null);
    var wo = { x: xf - 110, y: ROAD - 250 + 92 * 0.44, s: 0.44, legs: "sit", flip: 1, mouth: "content", brows: "flat", armL: [190, 250], armR: [214, 252], handL: "nam", handR: "nam",
      propFront: chiaTay(204, 236, 0.75, Math.sin(t * 10) * 5), lean: 0 };
    if (duck > 0) { wo.lean = -38 * duck; wo.bob = 40 * duck; wo.eyes = "squint"; wo.mouth = "wobbly"; wo.px = -10; }
    else if (t < T_STREET) { wo.px = 10; }
    else if (t > 3.8) { wo.px = 10; wo.mouth = "smirk"; }
    s += xeTai(xf, t, bow, wo);
    // bàn tay chung của bác tài thò cửa sổ nhận đồng xu
    var hk = seg(t, T_PAY - 0.3, T_PAY), hb = seg(t, T_PAY + 0.6, T_PAY + 0.9), hx = xf - 70 + 50 * hk * (1 - hb);
    if (hk > 0 && hb < 1) s += VT.g("translate(" + f(hx) + " " + f(ROAD - 186) + ") rotate(-28) scale(0.42)", VT.handGeneric({ x: 0, y: 0, sleeve: "#5E7E9A" }));
    if (t >= T_PAY + 0.42 && hb < 1) s += K.dongXu({ x: hx + 26, y: ROAD - 214, r: 22 });
    s += cau(true);
    var cam = sh === "A1" ? [key(T, [[0, 1100], [A2, xf - 330, "lin"]]), 560, key(T, [[0, 0.98], [T_STREET, 1.0], [A2, 1.05, "sine"]])]
      : [key(T, [[A2, 1880], [T_PAY - 0.2, 2060, "io"], [B0, 2080]]), key(T, [[A2, 600], [B0, 610]]), key(T, [[A2, 1.25], [T_PAY - 0.2, 1.4, "io"], [B0, 1.46, "sine"]])];
    return { cam: cam, world: s, over: VT.dreamFrame(t, { inset: 64 }) };
  }

  function canhCan(t, T, sh) {
    var PX = 960, PY = 430, HALF = 450, STR = 290, s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#E9E2D0"/>' + K.coDat(960, "#B9C98F");
    var houseOn = sh === "D", moneyK = sh === "D" ? seg(t, T_PAYS - 0.05, T_PAYS + 0.25) : 0, quarterK = sh === "D" ? seg(t, T_PLUS - 0.25, T_PLUS) : 0;
    var keysPlaced = sh === "E" ? seg(t, T_KEY - 0.1, T_KEY + 0.2) : (sh === "F" ? 1 : 0), takeBack = sh === "F" ? seg(t, T_SENT_E, T_SENT_E + 0.3) : 0;
    // góc đòn cân (dương = bên phải chìm xuống); kim chỉ theo đòn
    var ang;
    if (sh === "D") ang = key(t, [[D0, -9], [T_PAYS + 0.2, -9], [T_PAYS + 0.55, 0, "back"], [T_PLUS, 0], [T_PLUS + 0.3, 7, "back"]]);
    else if (sh === "E") ang = key(t, [[E0, 0], [T_KEY + 0.2, 0], [T_KEY + 0.6, -3, "out"]]);
    else ang = key(t, [[F0, -3], [T_SENT - 0.05, -13, "io"], [T_SENT_E + 0.2, -13], [T_SENT_E + 0.6, 0, "out"]]);
    var ar = ang * Math.PI / 180, lx = PX - HALF * Math.cos(ar), ly = PY - HALF * Math.sin(ar), rx = PX + HALF * Math.cos(ar), ry = PY + HALF * Math.sin(ar);
    // mặt cân hình cung: vạch, một trái tim (không chữ, không số)
    var R = 200;
    s += VT.shape("M " + (PX - 230) + " " + PY + " A 230 230 0 0 1 " + (PX + 230) + " " + PY + " Z", "#FFFDF6", { sw: 6, ox: 5, oy: 5 });
    for (var i = -4; i <= 4; i++) {
      var a = (-90 + i * 13) * Math.PI / 180, cx = PX + Math.cos(a) * R, cy = PY + Math.sin(a) * R;
      if (i === -1) s += VT.g("translate(" + f(PX + Math.cos(a) * (R - 6)) + " " + f(PY + Math.sin(a) * (R - 6)) + ") rotate(" + f(i * 13) + ")", VT.shape("M 0 10 C -24 -6 -16 -26 0 -14 C 16 -26 24 -6 0 10 Z", "#D8443A", { sw: 4, ox: 1, oy: 1 }));
      else s += VT.line("M " + f(cx) + " " + f(cy) + " L " + f(PX + Math.cos(a) * (R - (i === 0 ? 40 : 26))) + " " + f(PY + Math.sin(a) * (R - (i === 0 ? 40 : 26))), i === 0 ? 7 : 5);
    }
    // trụ, đế
    s += K.rect(PX - 20, PY, PX + 20, 900, "#B98A5A", { sw: 6, ox: 3, oy: 3 }) + VT.shape("M " + (PX - 200) + " 960 L " + (PX - 140) + " 880 L " + (PX + 140) + " 880 L " + (PX + 200) + " 960 Z", "#9C6A44", { sw: 6, ox: 4, oy: 4 });
    // thẻ market value +25%
    if (sh === "D" && t >= T_MARKET - 0.1) {
      s += K.rect(PX - 250, 735, PX + 250, 900, "#FFFDF6", { sw: 6, ox: 5, oy: 5 });
      s += VT.textWrite(PX, 798, "market value", 50, seg(t, T_MARKET - 0.05, T_MARKET + 0.5), { fill: "#2c4f6e" });
      s += VT.textWrite(PX, 874, "+25%", 50, seg(t, T_25 - 0.05, T_25 + 0.3), { fill: "#A8361F" });
    }
    // đòn, kim
    s += VT.line("M " + f(lx) + " " + f(ly) + " L " + f(rx) + " " + f(ry), 14, "#8E5527") + VT.line("M " + f(lx) + " " + f(ly) + " L " + f(rx) + " " + f(ry), 4, "#1f2326", 0.6);
    var na = (-90 + ang) * Math.PI / 180;
    s += VT.line("M " + PX + " " + PY + " L " + f(PX + Math.cos(na) * (R - 20)) + " " + f(PY + Math.sin(na) * (R - 20)), 8, "#A8361F") + VT.dot(PX, PY, 16, "#C9A24A") + VT.ell(PX, PY, 16, 16, "none", 4);
    // hai đĩa treo
    function dia(x, y, inner) { return VT.line("M " + f(x) + " " + f(y) + " L " + f(x - 120) + " " + f(y + STR) + " M " + f(x) + " " + f(y) + " L " + f(x + 120) + " " + f(y + STR), 4) + inner + VT.shape("M " + f(x - 150) + " " + f(y + STR) + " Q " + f(x) + " " + f(y + STR + 70) + " " + f(x + 150) + " " + f(y + STR) + " Z", "#C9A24A", { sw: 6, ox: 3, oy: 3 }) + VT.dot(x, y, 9); }
    var inL = "", inR = "", panLy = ly + STR, panRy = ry + STR;
    if (houseOn) inL += K.nhaNho({ x: lx, y: panLy, s: 0.72, col: "#C9463A", roof: "#3E3430" });
    if (moneyK > 0) inR += K.chongTien({ x: rx, y: panRy - (1 - VT.ease.in2(moneyK)) * 400, n: 7, seed: 2 });
    if (quarterK > 0) inR += K.chongTien({ x: rx + 6, y: panRy - 84 - (1 - VT.ease.in2(quarterK)) * 300, n: 2, seed: 9, w: 140 });
    var keyAt = null;
    if (keysPlaced > 0 && takeBack <= 0) keyAt = [VT.lerp(lx - 150, lx, keysPlaced), panLy - 60 * (1 - keysPlaced) - 10];
    if (keyAt && keysPlaced >= 1) inL += chiaTay(keyAt[0], keyAt[1] - 30, 0.75, 0);
    s += dia(lx, ly, inL) + dia(rx, ry, inR);
    if (sh === "D" && quarterK >= 1 && t < T_PLUS + 0.5) s += VT.sparkle({ x: rx + 120, y: panRy - 140, s: 0.7 * (1 - seg(t, T_PLUS, T_PLUS + 0.5)), fill: "#F6D36A" });
    // Wob
    var o = { x: 300, y: 960, s: 0.62, mouth: "content", brows: "flat", px: 10 };
    if (sh === "D") {
      if (t > T_PLUS) { o.mouth = "o"; o.brows = "up"; o.px = 12; o.py = -6; }
      if (t > T_INDEP - 0.1 && t < T_INDEP + 0.8) { o.bob = Math.abs(Math.sin((t - T_INDEP) * 9)) * 8; o.mouth = "content"; }
      o.armR = [276, 250]; o.handR = "nam"; o.propFront = chiaTay(264, 240, 0.7, 0);
    } else if (sh === "E") {
      o.x = key(t, [[E0, 220], [E0 + 0.5, 300, "out"]]);
      if (t < E0 + 0.5) { o.legs = "walk"; o.phase = (t - E0) * 2.2; o.stride = 26; }
      var reach = seg(t, T_KEY - 0.6, T_KEY - 0.1), back = seg(t, T_KEY + 0.25, T_KEY + 0.6);
      if (reach > 0 && back < 1) {
        var hp = keyAt || [lx - 150 + 150 * 0, panLy - 70];
        if (!keyAt) hp = [VT.lerp(o.x + 80, lx - 40, reach), VT.lerp(o.y - 150, panLy - 70, reach)];
        o.armR = VT.wobLocal(o, hp[0], hp[1] - 20); o.handR = "nam";
        if (keysPlaced < 1) s += "";
        o.propFront = keysPlaced < 1 ? chiaTayAt(o, hp) : "";
        o.mouth = "flat"; o.brows = "flat"; o.py = -8;
      } else if (reach <= 0) { o.armR = [276, 250]; o.handR = "nam"; o.propFront = chiaTay(264, 240, 0.7, 0); }
      if (t > T_KEY + 0.6) { o.py = -12; o.px = 12; o.mouth = "flat"; o.noBlink = t > T_WORTH_E; }
    } else {
      o.px = 12; o.py = -14; o.mouth = "flat"; o.noBlink = true;
      if (takeBack > 0) {
        var hold = VT.ease.out(takeBack);
        o.armR = [VT.lerp(390, 220, hold), VT.lerp(130, 240, hold)]; o.armL = [180, 246]; o.handL = "nam"; o.handR = "nam";
        o.propFront = chiaTay(VT.lerp(380, 202, hold), VT.lerp(120, 228, hold), 0.75, 0);
        if (takeBack >= 1) { o.eyes = "happy"; o.mouth = "content"; o.lean = -4 + Math.sin((t - T_SENT_E) * 4) * 2; o.brows = "flat"; }
      } else if (t > T_SENT_E - 0.3) { o.armR = VT.wobLocal(o, lx - 30, panLy - 60); o.handR = "xoe"; }
    }
    s += W(t, o);
    var cam;
    if (sh === "D") cam = [key(T, [[D0, 900], [E0, 920]]), key(T, [[D0, 560], [E0, 575]]), key(T, [[D0, 0.97], [T_PLUS - 0.1, 1.0, "sine"], [T_PLUS + 0.05, 1.06, "out"], [E0, 1.08]])];
    else if (sh === "E") cam = [key(T, [[E0, 620], [F0, 640]]), key(T, [[E0, 620], [F0, 630]]), key(T, [[E0, 1.3], [F0, 1.36, "sine"]])];
    else cam = [key(T, [[F0, 940], [T_SENT_E - 0.05, 930], [T_SENT_E + 0.35, 520, "io"], [DUR, 510]]), key(T, [[F0, 330], [T_SENT_E - 0.05, 320], [T_SENT_E + 0.35, 700, "io"], [DUR, 705]]),
      key(T, [[F0, 1.8], [T_SENT - 0.1, 2.0, "sine"], [T_SENT_E - 0.05, 2.02], [T_SENT_E + 0.35, 1.7, "io"], [DUR, 1.76, "sine"]])];
    return { cam: cam, world: s };
  }
  function chiaTayAt(o, hp) { var l = VT.wobLocal(o, hp[0], hp[1]); return chiaTay(l[0], l[1] - 10, 0.75 / 0.62 * 0.62, Math.sin(hp[0]) * 4); }
};
