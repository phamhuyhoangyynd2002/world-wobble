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

/* d33 · vẽ tay (488,304–506,104 s; 17,8 s). Vào "cat", ra "cat". Hồi ức tháng 12, không khẩu hình.
 * Nhiệt kế giấy to tụt xuống; "−11°C" viết ở "minus eleven", "12°F" ở "twelve" (hai phần của đúng chữ trong chu_tren_do_vat).
 * Wob (áo phao xanh lam, mũ len xanh lá thông quả bông kem, khăn kem sọc xanh quấn hai vòng) thở ra khói trắng, cố thổi một vòng khói;
 * vòng khói bay lên móc vào quả bông mũ len (ở −11°C hơi thở chỉ thành khói, không đóng cục). Tờ nghiên cứu giấy (dòng kẻ, không chữ)
 * trượt vào, mũi tên chỉ xuống; Wob nhíu mày. Mặt cắt: trung tâm cũ trên chỗ cao, trung tâm mới trong chỗ trũng hình cái bát; nhiệt kế nhỏ
 * (không số) ở chỗ trũng tụt thấp hơn ở "lower". Khí lạnh xanh nhạt chảy xuống đọng đầy bát như nước; Wob đứng trên VÀNH bát phía trung tâm cũ,
 * múc một muôi khí lạnh lên nếm đúng "bowl.", rùng mình. Lời đã rào "can be noticeably lower": không số độ chênh trên hình.
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var T_MINUS = VT.tu("minus"), T_CEL_E = VT.tu("Celsius.", 0, "end"), T_TWELVE = VT.tu("twelve"), T_FAH_E = VT.tu("Fahrenheit.", 0, "end"),
    T_AND = VT.tu("And"), T_PROBLEM = VT.tu("problem"), T_ACC = VT.tu("According"), T_STUDY_E = VT.tu("study,", 0, "end"), T_WINTER = VT.tu("winter"),
    T_LOWER = VT.tu("lower"), T_OLD = VT.tu("old"), T_COLD = VT.tu("Cold"), T_POOLS = VT.tu("pools"), T_BUILT_E = VT.tu("built,", 0, "end"),
    T_WATER = VT.tu("water"), T_FILLS = VT.tu("fills"), T_BOWL = VT.tu("bowl."), T_BOWL_E = VT.tu("bowl.", 0, "end");
  var A2 = 2.6, B0 = 5.15, C0 = 7.6, C2 = 10.4, D0 = 14.0;
  VT.sfx("hoi-nuoc", T_CEL_E - 0.35, 0.35);
  VT.sfx("pop", 4.55, 0.4);
  VT.sfx("lat-giay", B0 + 0.05, 0.45);
  VT.sfx("brr", T_BOWL + 0.08, 0.55);

  function W(t, o) { var b = { s: 0.62, mua: "dong", moc: "kiruna" }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }
  var TH = { x: 640, y: 1000, s: 1.08 };
  var V = { x: 1180, y: 900, w: 1000, depth: 300, floor: 300, ext: 1400, mtn: [0, 160], mtnW: 520 };
  function lvl(t) { return key(t, [[0.15, 0.78], [T_MINUS - 0.05, 0.3, "io"]]); }
  function nhietKe(t) {
    var l = lvl(t), s = VT.thermo({ x: TH.x, y: TH.y, s: TH.s, level: l, mark: 0.3, frost: true });
    var mk = TH.y + TH.s * (-150 - (510) * 0.3);
    s += VT.textWrite(TH.x + TH.s * 66, mk + 22, "−11°C", 64, seg(t, T_MINUS - 0.05, T_MINUS + 0.4), { anchor: "start", fill: "#1f2326" });
    s += VT.textWrite(TH.x + TH.s * 66, mk + 96, "12°F", 58, seg(t, T_TWELVE - 0.05, T_TWELVE + 0.3), { anchor: "start", fill: "#2c4f6e" });
    return s;
  }
  function nenDong(t) { return '<rect x="-600" y="-600" width="3120" height="2280" fill="#DCE6EE"/>' + VT.snowGround(1000) + VT.snowfall(t, 26, [-300, -100, 2300, 1000], 50); }

  return [
    // A1 · nhiệt kế tụt, −11°C
    { a: 0, b: A2, ten: "nhiet ke", ve: function (t, lt, T) { return canhA(t, T, "A1"); } },
    // A2 · vòng khói móc quả bông mũ, 12°F
    { a: A2, b: B0, ten: "vong khoi", ve: function (t, lt, T) { return canhA(t, T, "A2"); } },
    // B · tờ nghiên cứu trượt vào, mũi tên chỉ xuống; Wob nhíu mày
    { a: B0, b: C0, ten: "to nghien cuu", ve: function (t, lt, T) {
      var s = nenDong(t), k = VT.ease.out(seg(t, B0, B0 + 0.4)), px = VT.lerp(2300, 1180, k), rot = VT.lerp(14, -3, k);
      var sheet = K.rect(-280, -360, 280, 360, "#FFFDF6", { sw: 6, ox: 8, oy: 8 });
      for (var i = 0; i < 7; i++) sheet += VT.line("M -220 " + (-290 + i * 44) + " L " + (i % 3 === 2 ? 60 : 220) + " " + (-290 + i * 44), 5, "#1f2326", 0.22);
      sheet += VT.line("M -220 220 L -220 20 M -220 220 L 220 220", 5) + VT.line("M -200 60 C -120 70 -60 110 0 140 C 60 170 120 180 200 204", 6, "#2c4f6e");
      var ak = seg(t, T_PROBLEM - 0.1, T_PROBLEM + 0.3);
      if (ak > 0) sheet += VT.g("translate(170 -40) scale(" + f(VT.ease.back(ak)) + ")", VT.shape("M -26 -110 L 26 -110 L 26 10 L 60 10 L 0 90 L -60 10 L -26 10 Z", "#6FA9CF", { sw: 6, ox: 3, oy: 3 }));
      s += VT.g("translate(" + f(px) + " 520) rotate(" + f(rot) + ")", sheet);
      var o = { x: 560, y: 1000, py: -4, px: key(t, [[B0, 0], [B0 + 0.4, 12]]), brows: t > T_AND + 0.3 ? "down" : "flat", mouth: t > T_PROBLEM ? "frown" : "flat", lean: t > T_AND + 0.3 ? 6 : 0 };
      s += W(t, o);
      return { cam: [key(T, [[B0, 900], [C0, 910]]), key(T, [[B0, 580], [C0, 590]]), key(T, [[B0, 1.0], [T_PROBLEM, 1.04, "sine"], [C0, 1.08, "sine"]])], world: s };
    } },
    // C · mặt cắt cái bát: trung tâm cũ trên cao, trung tâm mới trong trũng; nhiệt kế nhỏ
    { a: C0, b: C2, ten: "mat cat", ve: function (t, lt, T) { return canhBat(t, T, "C1"); } },
    { a: C2, b: D0, ten: "nhiet ke nho", ve: function (t, lt, T) { return canhBat(t, T, "C2"); } },
    // D · khí lạnh đọng đầy bát; Wob múc muôi nếm ở "bowl."
    { a: D0, b: DUR, ten: "muc muoi khi lanh", ve: function (t, lt, T) { return canhBat(t, T, "D"); } },
  ];

  function canhA(t, T, sh) {
    var s = nenDong(t) + nhietKe(t);
    var o = { x: 1300, y: 1000, mouth: "flat", brows: "flat", px: -10, py: 0 };
    if (t < T_MINUS) { o.px = -10; o.py = key(t, [[0, -10], [T_MINUS, 4]]); o.mouth = "oSmall"; }
    // thở ra khói rồi thổi vòng khói
    var breath = seg(t, T_CEL_E - 0.4, T_CEL_E + 0.2), ringT0 = 3.15, ringT1 = 4.55, rk = seg(t, ringT0, ringT1);
    if (breath > 0 && breath < 1) o.mouth = "o";
    if (t >= ringT0 - 0.3 && t < ringT0 + 0.15) { o.mouth = "o"; o.sq = 1.04; }
    if (t >= ringT0 + 0.15) { o.py = -14; o.px = 2; o.mouth = t > ringT1 ? "flat" : "oSmall"; o.brows = t > ringT1 ? "skeptic" : "up"; o.noBlink = t > ringT1 && t < ringT1 + 0.6; }
    s += W(t, o);
    var mouthP = VT.wobPt({ s: 0.62, x: o.x, y: o.y, sq: o.sq }, 210, 236), pom = VT.wobPt({ s: 0.62, x: o.x, y: o.y }, 200, 26);
    if (breath > 0 && breath < 1) s += VT.puffBurst({ x: mouthP[0] - 30, y: mouthP[1], k: breath, s: 0.5, spread: 60 });
    if (rk > 0) {
      var path = [[mouthP[0] - 10, mouthP[1] - 6], [mouthP[0] - 120, mouthP[1] - 90], [pom[0] - 120, pom[1] - 120], [pom[0], pom[1] - 8]];
      var p = VT.alongPts(path, VT.ease.io(rk)), r = 18 + 26 * Math.min(1, rk * 2);
      if (rk < 1) s += VT.g("translate(" + f(p[0]) + " " + f(p[1]) + ") rotate(" + f(-18 + rk * 30) + ")", VT.ell(0, 0, r, r * 0.6, "none", 14, { stroke: "#ffffff" }) + VT.ell(0, 0, r, r * 0.6, "none", 3, { stroke: "#9AAAB0" }));
      else {
        var wob = Math.sin((t - ringT1) * 14) * 3 * (1 - seg(t, ringT1, ringT1 + 0.6));
        s += VT.g("translate(" + f(pom[0]) + " " + f(pom[1] + 4) + ") rotate(" + f(-8 + wob) + ")", VT.ell(0, 0, 30, 12, "none", 13, { stroke: "#ffffff" }) + VT.ell(0, 0, 30, 12, "none", 3, { stroke: "#9AAAB0" }));
      }
    }
    var cam = sh === "A1" ? [key(T, [[0, 820], [A2, 850, "sine"]]), key(T, [[0, 560], [A2, 560]]), key(T, [[0, 1.08], [T_MINUS - 0.05, 1.12, "sine"], [T_MINUS + 0.08, 1.18, "out"], [A2, 1.2]])]
      : [key(T, [[A2, 1060], [B0, 1080, "sine"]]), key(T, [[A2, 600], [ringT1, 560, "io"], [B0, 560]]), key(T, [[A2, 1.2], [ringT1, 1.32, "io"], [B0, 1.36, "sine"]])];
    return { cam: cam, world: s, tint: "cold" };
  }

  function canhBat(t, T, sh) {
    var fill = sh === "D" ? key(t, [[T_COLD + 0.3, 0], [T_BUILT_E + 0.1, 0.5, "io"], [T_FILLS + 0.2, 0.62, "io"]]) : 0;
    var vo = {}; for (var k in V) vo[k] = V[k]; vo.fill = fill; vo.t = t; vo.coldColor = "#8EC3E6"; vo.groundColor = "#FBFDFE";
    var s = '<rect x="-600" y="-600" width="3120" height="2280" fill="#DCE6EE"/>' + VT.valley(vo);
    // trung tâm cũ trên chỗ cao (trái), trung tâm mới trong trũng (phải)
    var oldY = VT.valleyY(V, 400);
    s += K.nhaNho({ x: 250, y: oldY, s: 0.42, col: "#D9A441" }) + K.nhaNho({ x: 370, y: oldY, s: 0.38, col: "#E9DDC3" }) + K.nhaNho({ x: 480, y: oldY, s: 0.4, col: "#C9463A" });
    var nx = 1180, ny = 900;
    s += K.rect(nx - 170, ny - 70, nx + 30, ny, "#AFC6CE", { sw: 5, ox: 2, oy: 2 }) + VT.ell(nx - 70, ny - 70, 100, 30, "#BFD3DA", 5);
    for (var c = 0; c < 5; c++) s += VT.line("M " + (nx - 150 + c * 40) + " " + (ny - 60) + " L " + (nx - 150 + c * 40) + " " + ny, 3, "#1f2326", 0.4);
    s += VT.line("M " + (nx + 80) + " " + ny + " L " + (nx + 110) + " " + (ny - 200) + " L " + (nx + 140) + " " + ny + " M " + (nx + 92) + " " + (ny - 110) + " L " + (nx + 128) + " " + (ny - 110), 5) + VT.ell(nx + 110, ny - 214, 22, 22, "#FFFDF6", 4) + VT.line("M " + (nx + 110) + " " + (ny - 214) + " L " + (nx + 110) + " " + (ny - 228), 3);
    s += K.nhaNho({ x: nx + 230, y: ny, s: 0.36, col: "#7FA9C9" }) + K.nhaNho({ x: nx - 280, y: ny, s: 0.34, col: "#D9A441" });
    // nhiệt kế nhỏ không số
    var tShow = seg(t, T_WINTER - 0.2, T_WINTER + 0.2), lowK = seg(t, T_LOWER - 0.08, T_LOWER + 0.35);
    if (sh !== "C1" && tShow > 0) {
      s += VT.thermoMini({ x: 120, y: oldY - 4, s: 0.9 * VT.ease.back(tShow), level: 0.42, color: "#6FA9CF" });
      s += VT.thermoMini({ x: 900, y: ny - 10, s: 0.9 * VT.ease.back(tShow), level: 0.42 - 0.16 * VT.ease.io(lowK), color: "#6FA9CF" });
      if (lowK > 0 && lowK < 1) s += VT.arc([[960, ny - 190], [990, ny - 150], [960, ny - 110]], 5);
    }
    // khí lạnh chảy xuống từ sườn trái, phải (mũi tên lượn)
    if (sh === "D") {
      var ak = seg(t, T_COLD - 0.05, T_POOLS + 0.5);
      if (ak > 0) {
        s += VT.arrowWavy({ x0: 790, y0: oldY - 40, x1: 960, y1: ny - 130, k: ak, amp: 16, n: 4, color: "#4F86B0" });
        s += VT.arrowWavy({ x0: 1860, y0: VT.valleyY(V, 1860) - 140, x1: 1480, y1: ny - 120, k: ak, amp: 16, n: 4, color: "#4F86B0" });
      }
    }
    // Wob trên vành bát phía trung tâm cũ
    var wx = 650, wy = VT.valleyY(V, wx), o = { x: wx, y: wy, s: 0.5, mouth: "flat", brows: "flat", px: 10, py: 6 };
    if (sh === "C1") { o.px = key(t, [[C0, -8], [T_ACC + 0.6, -8], [T_STUDY_E, 12, "io"]]); o.armR = t > T_STUDY_E - 0.6 ? [400, 200] : undefined; o.handR = "chi"; }
    if (sh === "C2") { o.px = 12; o.py = 8; if (lowK > 0.3) { o.brows = "worried"; o.mouth = "wobbly"; } }
    var ladle = "";
    if (sh === "D") {
      var lvlY = V.y - V.depth * fill, sc = seg(t, T_WATER - 0.35, T_WATER + 0.2), up = seg(t, T_FILLS - 0.1, T_BOWL - 0.1);
      o.px = 12; o.py = 10; o.brows = fill > 0.3 ? "skeptic" : "flat";
      var bowlSvg = function (x, y, full) {
        var b = VT.shape("M " + f(x - 26) + " " + f(y) + " Q " + f(x) + " " + f(y + 34) + " " + f(x + 26) + " " + f(y) + " Z", "#AEB8BD", { sw: 5, ox: 1, oy: 1 });
        if (full) b += VT.ell(x, y - 2, 24, 8, "#E8F6FF", 3, { ox: 0, oy: 0 }) + VT.line("M " + f(x - 10) + " " + f(y - 10) + " q 7 -12 0 -24 M " + f(x + 8) + " " + f(y - 10) + " q 7 -12 0 -22", 4, "#4F86B0", 0.9);
        return b;
      };
      if (sc > 0 && up <= 0) { // thò muôi xuống múc
        var tipDown = [wx + 160, lvlY + 6], tip = [VT.lerp(wx + 120, tipDown[0], VT.ease.io(sc)), VT.lerp(wy - 70, tipDown[1], VT.ease.io(sc))], hp = [wx + 64, wy - 76];
        o.armR = VT.wobLocal(o, hp[0], hp[1]); o.handR = "nam";
        ladle = VT.line("M " + f(hp[0]) + " " + f(hp[1]) + " L " + f(tip[0]) + " " + f(tip[1] - 4), 10, "#1f2326") + VT.line("M " + f(hp[0]) + " " + f(hp[1]) + " L " + f(tip[0]) + " " + f(tip[1] - 4), 5, "#AEB8BD") + bowlSvg(tip[0], tip[1] - 4, sc >= 1);
      } else if (up > 0 && t < T_BOWL + 0.15) { // đưa muôi lên miệng (toạ độ hệ Wob)
        var e = VT.ease.io(up), bx = VT.lerp(440, 214, e), by = VT.lerp(330, 262, e), hx = VT.lerp(470, 350, e), hy = VT.lerp(300, 262, e);
        o.armR = [hx, hy]; o.handR = "nam";
        o.propFront = VT.line("M " + f(hx) + " " + f(hy) + " L " + f(bx + 40) + " " + f(by), 20, "#1f2326") + VT.line("M " + f(hx) + " " + f(hy) + " L " + f(bx + 40) + " " + f(by), 11, "#AEB8BD") +
          VT.g("translate(" + f(bx) + " " + f(by) + ") scale(2.1) translate(" + f(-bx) + " " + f(-by) + ")", bowlSvg(bx, by, true));
        if (up > 0.75) { o.mouth = "sip"; o.py = 8; o.px = 4; o.eyes = "closed"; }
      }
      if (t >= T_BOWL + 0.15) { o.armR = [360, 300]; o.handR = "nam"; o.propFront = VT.line("M 360 300 L 310 380", 20, "#1f2326") + VT.line("M 360 300 L 310 380", 11, "#AEB8BD") + VT.g("translate(300 384) scale(2) translate(-300 -384)", bowlSvg(300, 384, false)); }
      if (t >= T_BOWL) {
        o.shiver = 6; o.marks = "shiver"; o.eyes = "squint"; o.mouth = "chatter"; o.frost = t >= T_BOWL + 0.12; o.sq = key(t, [[T_BOWL, 1.06], [T_BOWL + 0.15, 0.94], [T_BOWL + 0.3, 1]]);
      }
    }
    s += W(t, o) + ladle;
    var cam;
    if (sh === "C1") cam = [key(T, [[C0, 700], [T_ACC + 0.5, 700], [C2, 1080, "io"]]), key(T, [[C0, 640], [C2, 640]]), key(T, [[C0, 1.25], [T_ACC + 0.5, 1.22], [C2, 0.98, "io"]])];
    else if (sh === "C2") cam = [key(T, [[C2, 1060], [D0, 1040]]), key(T, [[C2, 620], [D0, 620]]), key(T, [[C2, 0.98], [T_LOWER, 1.02, "sine"], [D0, 1.04]])];
    else cam = [key(T, [[D0, 1040], [T_WATER - 0.4, 1010], [T_FILLS, 760, "io"], [DUR, 750]]), key(T, [[D0, 620], [T_WATER - 0.4, 620], [T_FILLS, 600, "io"], [DUR, 598]]), key(T, [[D0, 1.04], [T_WATER - 0.4, 1.06], [T_FILLS, 1.72, "io"], [T_BOWL, 1.76, "sine"], [T_BOWL + 0.1, 1.84, "out"], [DUR, 1.86]])];
    return { cam: cam, world: s, tint: "cold", shake: sh === "D" ? VT.shake(T, T_BOWL + 0.05, 0.25, 4) : [0, 0] };
  }
};
