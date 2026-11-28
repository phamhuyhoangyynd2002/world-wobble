/* d26 · vẽ tay (314,834–328,271 s; 13,44 s). Vào "cat", ra "cat". Hồi ức, không khẩu hình. Không chữ, không số (mức C: lời đã rào).
 *  1. Wob cầm bảng kẹp ba ô (khoai đã gạch, tôm hùm, bò), chỉ vào ô tôm hùm đúng "lobster.".
 *  2. Tôm hùm gai vẽ tay bò ngang bãi đá, camera bám theo; [luot-smootherstep] lướt sang huy hiệu ở "There": con tôm bò tới cạnh khiên
 *     xanh trắng rồi dựng đứng làm lính gác bên trái; Wob đứng nghiêm bên phải bắt chước; đúng "arms." Wob liếc, con tôm phải đổi chân rồi nghiêm lại.
 *  3. [day-vao-cham] Chiếc bánh năm phần, bốn phần lần lượt hiện hình tôm hùm, một phần trống; Wob gạch ô tôm hùm bằng bút chì, gật gù.
 * Trang phục: áo mưa cam mũ trùm hạ, ba lô nhỏ ô liu, bảng kẹp (+ bút chì ngắn ở nhịp gạch).
 */
window.CANH = function (VT, D) {
  var B = window.VTB(VT, D), key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink, DUR = D.thoi_luong;
  var N1 = VT.nhip(1), N2 = VT.nhip(2);
  var T_LOB = VT.tu("lobster."), T_TRIS = VT.tu("tristan"), T_ARMS = VT.tu("arms."), T_FOUR = VT.tu("four-fifths"), T_ACC = VT.tu("according"), T_COUNCIL = VT.tu("council.");
  var S1B = T_TRIS - 0.12, G0 = N1, G1 = N1 + 0.9, S3B = T_ACC - 0.4;
  var SL_T = [T_FOUR - 0.55, T_FOUR - 0.15, T_FOUR + 0.25, T_FOUR + 0.65];
  var X_T0 = T_ACC + 0.15, X_T1 = X_T0 + 0.55;
  SL_T.forEach(function (tt) { VT.sfx("pop", tt, 0.3); });

  // ---------- bảng kẹp ----------
  function icon(i) {
    if (i === 0) return B.potato({ x: 0, y: 0, s: 0.6 });
    if (i === 1) return B.lobster({ x: 6, y: 4, s: 0.2 });
    return VT.shape("M -34 -6 C -34 -20 26 -22 30 -8 L 30 14 L -34 14 Z", "#F4F1EA", { sw: 4 }) + VT.shape("M 26 -14 C 34 -22 46 -18 46 -6 C 46 4 34 6 28 2 Z", "#F4F1EA", { sw: 4 }) + VT.dot(-10, -4, 6) + VT.dot(10, 6, 5) + VT.line("M -28 14 L -28 28 M -12 14 L -12 28 M 10 14 L 10 28 M 24 14 L 24 28", 4) + VT.line("M 36 -18 L 42 -28", 3);
  }
  function clipboard(o, xk1, xk2) {
    var out = VT.shape("M -120 -160 L 120 -160 L 120 160 L -120 160 Z", "#B98A5A", { sw: 6, ox: 6, oy: 6 }) + VT.shape("M -100 -134 L 100 -134 L 100 146 L -100 146 Z", "#FFFDF6", { sw: 4 });
    out += VT.shape("M -44 -176 L 44 -176 L 50 -136 L -50 -136 Z", "#A9B3B8", { sw: 5 });
    for (var i = 0; i < 3; i++) {
      var y = -86 + i * 86;
      out += VT.shape("M -40 " + (y - 36) + " L 40 " + (y - 36) + " L 40 " + (y + 36) + " L -40 " + (y + 36) + " Z", "#F6EEDC", { sw: 4, ox: 2, oy: 2 }) + VT.g("translate(0 " + y + ")", icon(i));
      var k = i === 0 ? xk1 : i === 1 ? xk2 : 0;
      if (k > 0) out += VT.lineDraw("M -52 " + (y - 46) + " L 52 " + (y + 46), Math.min(1, k * 2), 8, "#A8361F") + VT.lineDraw("M 52 " + (y - 46) + " L -52 " + (y + 46), Math.max(0, k * 2 - 1), 8, "#A8361F");
    }
    return VT.wrap(o, out);
  }
  // ---------- cảnh 1a: Wob + bảng kẹp ----------
  function shot1a(t) {
    var out = B.fill("#D6E3E6") + B.grass(860, "#B8B2A4");
    var o = { t: t, s: 0.95, x: 760, y: 900, mouth: "content", brows: "up", px: 14, py: 6 };
    var CB = [1050, 700], CBs = 1.05;
    o.armL = VT.wobLocal(o, CB[0] - 112, CB[1] + 150); o.handL = "nam";          // tay xa đỡ góc dưới bảng kẹp
    var pointK = seg(t, T_LOB - 0.35, T_LOB - 0.05);
    var tgt = [CB[0] - 8, CB[1]], rest = VT.wobPt(o, 338, 300);
    var hand = [VT.lerp(rest[0], tgt[0] - 70, pointK), VT.lerp(rest[1], tgt[1] + 6, pointK)];
    o.armR = VT.wobLocal(o, hand[0], hand[1]); o.handR = pointK > 0 ? "chi" : "tron";
    if (pointK > 0) o.mouth = "smile";
    if (t > T_LOB) o.bob = -8 * Math.abs(Math.sin((t - T_LOB) * 7));
    out += clipboard({ x: CB[0], y: CB[1], s: CBs, rot: 4 }, 1, 0) + B.wob(o);
    if (pointK > 0.9) out += VT.ell(tgt[0], tgt[1], 66, 56, null, 6, { stroke: "#A8361F" });
    return out;
  }
  // ---------- cảnh 1b–2: bãi đá, tôm hùm bò, huy hiệu ----------
  var SH = [1960, 560];
  function lobX(t) { return t < G0 ? VT.lerp(160, 1200, seg(t, S1B, G0)) : VT.lerp(1200, 1700, VT.ease.out2(seg(t, G0, G1 - 0.3))); }
  function shield() {
    var d = "M -150 -190 L 150 -190 L 150 20 C 150 120 60 170 0 196 C -60 170 -150 120 -150 20 Z", out = "";
    out += VT.shape(d, "#FFFDF6", { sw: 7, ox: 7, oy: 6 });
    var id = VT.uid("sh");
    out += '<clipPath id="' + id + '"><path d="' + d + '"/></clipPath><g clip-path="url(#' + id + ')">' + '<rect x="-160" y="-200" width="320" height="170" fill="#4A78A8"/>';
    for (var r = 0; r < 3; r++) out += VT.line("M -160 " + (-150 + r * 40) + " q 20 -12 40 0 q 20 12 40 0 q 20 -12 40 0 q 20 12 40 0 q 20 -12 40 0 q 20 12 40 0 q 20 -12 40 0 q 20 12 40 0", 5, "#FFFDF6", 0.9);
    for (var q = 0; q < 2; q++) out += VT.line("M -160 " + (40 + q * 60) + " q 20 -12 40 0 q 20 12 40 0 q 20 -12 40 0 q 20 12 40 0 q 20 -12 40 0 q 20 12 40 0 q 20 -12 40 0 q 20 12 40 0", 6, "#4A78A8");
    out += "</g>" + VT.line("M -150 -30 L 150 -30", 6) + VT.line(d, 7);
    return VT.g("translate(" + SH[0] + " " + SH[1] + ")", out);
  }
  function shore(t) {
    var out = B.fill("#D6E3E6") + '<rect x="-1200" y="560" width="4320" height="400" fill="' + B.SEA + '"/>' + VT.line("M -1200 560 L 3100 560", 5);
    for (var i = 0; i < 10; i++) { var x = -800 + i * 420 + 40 * Math.sin(Math.round(t * 12) * 0.4 + i); out += VT.line("M " + f(x) + " " + (600 + (i % 3) * 40) + " q 22 -10 44 0 q 22 10 44 0", 4, "#DCE8EA", 0.6); }
    out += B.grass(830, "#B8B2A4");
    for (var j = 0; j < 22; j++) { var px = -1000 + j * 200 + VT.hash(j) * 80, py = 870 + VT.hash(j * 3) * 160; out += VT.ell(px, py, 30 + VT.hash(j * 7) * 26, 16 + VT.hash(j * 5) * 10, "#8E8A82", 4); }
    return out;
  }
  function arms(t) {
    var out = shield();
    // lính gác phải (đổi chân ở "arms.")
    var sh = seg(t, T_ARMS + 0.05, T_ARMS + 0.25) - seg(t, T_ARMS + 0.45, T_ARMS + 0.65);
    out += B.lobster({ x: 2150, y: 600 + (sh > 0 ? -8 : 0), s: 0.85, stand: true, sx: -1, shift: sh });
    return out;
  }
  function crawler(t) {
    var x = lobX(t);
    if (t < G1 - 0.3) {
      var fast = t >= G0;
      return B.lobster({ x: x, y: 790, s: fast ? 0.85 : 0.95, t: t, walk: true }) + (fast ? VT.speedLines({ x0: x - 360, y0: 740, n: 4, gap: 26, len: 90, dx: -1 }) : "");
    }
    var k = VT.ease.back(seg(t, G1 - 0.3, G1));
    return B.lobster({ x: VT.lerp(1700, 1770, k), y: VT.lerp(790, 600, k), s: 0.85, rot: -90 * k, t: 0 });
  }
  function wobGuard(t) {
    var o = { t: t, s: 0.82, x: 2380, y: 880, flip: -1, arms: "up", legs: "stand", mouth: "flat", brows: "down", px: 0, py: 0, sq: 1.04 };
    var glance = seg(t, T_ARMS - 0.05, T_ARMS + 0.1) - seg(t, T_ARMS + 0.6, T_ARMS + 0.75);
    if (glance > 0) { o.px = -16 * glance; o.py = 4; o.brows = "skeptic"; }
    return B.wob(o);
  }
  // ---------- cảnh 3: chiếc bánh ----------
  var PC = [800, 540], PR = 300;
  function pie(t) {
    var out = B.fill("#F3E9D2") + VT.ell(PC[0], PC[1], PR, PR, "#FFFDF6", 7, { ox: 10, oy: 9 });
    for (var i = 0; i < 5; i++) {
      var a0 = (-90 + i * 72) * Math.PI / 180, a1 = (-90 + (i + 1) * 72) * Math.PI / 180, k = i < 4 ? seg(t, SL_T[i], SL_T[i] + 0.25) : 0;
      if (k > 0) out += '<path d="M ' + PC[0] + " " + PC[1] + " L " + f(PC[0] + Math.cos(a0) * PR) + " " + f(PC[1] + Math.sin(a0) * PR) + " A " + PR + " " + PR + " 0 0 1 " + f(PC[0] + Math.cos(a1) * PR) + " " + f(PC[1] + Math.sin(a1) * PR) + ' Z" fill="#F2B49A" opacity="' + f(k * 90) / 100 + '"/>';
      out += VT.line("M " + PC[0] + " " + PC[1] + " L " + f(PC[0] + Math.cos(a0) * PR) + " " + f(PC[1] + Math.sin(a0) * PR), 6);
      if (k > 0) { var am = (a0 + a1) / 2, sc = VT.ease.back(k); out += B.lobster({ x: PC[0] + Math.cos(am) * PR * 0.58, y: PC[1] + Math.sin(am) * PR * 0.58, s: 0.36 * sc, rot: am * 57.3 + 90 > 90 && am * 57.3 + 90 < 270 ? 0 : 0, t: t }); }
    }
    out += VT.ell(PC[0], PC[1], PR, PR, null, 7);
    return out;
  }
  function wobPie(t, close) {
    var o = { t: t, s: 0.95, x: 1520, y: 930, flip: -1, mouth: "content", brows: "up", px: -16, py: 0 };
    var CB = [1240, 760];
    o.armL = VT.wobLocal(o, CB[0] + 112, CB[1] + 150); o.handL = "nam";          // tay xa đỡ góc dưới bảng kẹp
    var xk = seg(t, X_T0, X_T1), tip;
    if (t < X_T0 - 0.2) { tip = [CB[0] + 140, CB[1] - 60]; }
    else { var y2 = CB[1], pts = [[CB[0] - 52, y2 - 46], [CB[0] + 52, y2 + 46], [CB[0] + 52, y2 - 46], [CB[0] - 52, y2 + 46]]; tip = VT.alongPts(pts, xk); if (t > X_T1) tip = [CB[0] + 130, CB[1] - 100]; }
    var hand = [Math.min(tip[0] + 70, 1420), tip[1] + 40];
    o.armR = VT.wobLocal(o, hand[0], hand[1]); o.handR = "nam";                   // tay gần cầm bút
    if (t >= X_T0 - 0.2 && t < X_T1) { o.mouth = "flat"; o.brows = "down"; o.py = 14; o.px = -12; }
    if (t >= X_T1) { o.mouth = "content"; o.eyes = "happy"; o.bob = 10 * Math.abs(Math.sin((t - X_T1) * 4.2)); o.lean = 4 * Math.sin((t - X_T1) * 4.2); }
    return clipboard({ x: CB[0], y: CB[1], s: 1, rot: -4 }, 1, xk) + B.wob(o) + VT.pencilTo(hand, tip, { s: 0.5, over: 20 });
  }

  return [
    { a: 0, b: S1B, ten: "Wob chỉ ô tôm hùm trên bảng kẹp", ve: function (t, lt, T) {
      return { cam: key(T, [[0, [920, 690, 1.4]], [S1B, [935, 690, 1.46], "sine"]]), world: shot1a(t), tint: "cold" };
    } },
    { a: S1B, b: G1 + 0.05, ten: "tôm hùm gai bò ngang bãi đá, lướt sang huy hiệu", ve: function (t, lt, T) {
      var lx = lobX(Math.min(T, G0)), c0 = [VT.clamp(lx + 160, 500, 1360), 700, 1.25];
      var cam = T < G0 ? c0 : (function () { var k = B.sm(seg(T, G0, G1)); return [VT.lerp(1360, 2060, k), VT.lerp(700, 610, k), VT.lerp(1.25, 1.18, k) - 0.18 * Math.sin(Math.PI * k)]; })();
      return { cam: cam, world: shore(t) + arms(t) + crawler(t) + wobGuard(t), tint: "cold" };
    } },
    { a: G1 + 0.05, b: N2, ten: "huy hiệu: hai tôm hùm gác khiên, Wob nghiêm, tôm đổi chân", ve: function (t, lt, T) {
      return { cam: key(T, [[G1 + 0.05, [2060, 610, 1.18]], [N2, [2080, 600, 1.26], "sine"]]), world: shore(t) + arms(t) + crawler(t) + wobGuard(t), tint: "cold" };
    } },
    { a: N2, b: S3B, ten: "chiếc bánh năm phần, bốn phần tôm hùm", ve: function (t, lt, T) {
      return { cam: key(T, [[N2, [1000, 560, 1.0]], [S3B, [980, 560, 1.07], "sine"]]), world: pie(t) + wobPie(t), tint: "warm" };
    } },
    { a: S3B, b: DUR, ten: "cận: Wob gạch ô tôm hùm, gật gù", ve: function (t, lt, T) {
      return { cam: key(T, [[S3B, [1350, 680, 1.8]], [DUR, [1360, 680, 1.9], "sine"]]), world: pie(t) + wobPie(t), tint: "warm" };
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
