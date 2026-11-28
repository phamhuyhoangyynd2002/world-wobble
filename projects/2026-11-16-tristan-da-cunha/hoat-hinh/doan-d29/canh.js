/* d29 · vẽ tay · chèn (365,674–370,536 s; 4,86 s). Vào "chen" (tự whoosh), ra "cat". Bong bóng tưởng tượng (viền mây). Hồi ức, không khẩu hình. Không chữ.
 *  1. Hình to: nồi súp lớn giữa bàn dài, người que (chung, không mặt) lần lượt múc bằng những cái muôi y hệt nhau; Wob đứng ghế ở đầu bàn, cũng cầm muôi y hệt.
 *  2. Cận: đúng "same ladle," Wob lén rút cái muôi to gấp đôi từ sau lưng, lấy đà giơ cao; vung xuống ở "nobody"; đúng "pot." lòng muôi
 *     to hơn miệng nồi, kẹt cứng (bonk); Wob bị giật khỏi ghế, treo lơ lửng ở đầu cán, nhìn thẳng người xem; giữ tới cắt.
 * Trang phục: áo mưa cam mũ trùm hạ, ba lô nhỏ ô liu.
 */
window.CANH = function (VT, D) {
  var B = window.VTB(VT, D), key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink, DUR = D.thoi_luong;
  var T_SAME = VT.tu("same"), T_LADLE = VT.tu("ladle,"), T_NOBODY = VT.tu("nobody"), T_POT = VT.tu("pot.");
  var S2 = T_SAME - 0.15, PULL0 = T_LADLE - 0.12, PULL1 = T_LADLE + 0.18, UP1 = T_NOBODY - 0.05, HIT = T_POT - 0.04;
  VT.sfx("whoosh", PULL0, 0.3);
  VT.sfx("whoosh", UP1 + 0.1, 0.35);
  VT.sfx("bonk", HIT, 0.75);
  var TABLE_Y = 640, POT = [960, 640], MOUTH_Y = 452, PEOPLE = [470, 650, 1270, 1450];

  /** Muôi: gốc ở đầu cán (chỗ cầm), hướng ang (độ, 0 = sang phải, chiều kim đồng hồ), dài L, bán kính lòng muôi R. */
  function ladle(x, y, ang, L, R, col) {
    var a = ang * Math.PI / 180, ex = x + Math.cos(a) * L, ey = y + Math.sin(a) * L;
    var out = VT.line("M " + f(x) + " " + f(y) + " L " + f(ex) + " " + f(ey), Math.max(6, R * 0.16), INK) + VT.line("M " + f(x) + " " + f(y) + " L " + f(ex) + " " + f(ey), Math.max(3, R * 0.09), col || "#C8CCD0");
    out += VT.g("translate(" + f(ex) + " " + f(ey) + ")", VT.shape("M " + f(-R) + " 0 C " + f(-R) + " " + f(R * 1.1) + " " + f(R) + " " + f(R * 1.1) + " " + f(R) + " 0 Z", col || "#C8CCD0", { sw: Math.max(4, R * 0.08) }) + VT.ell(0, 0, R, R * 0.28, "#9AA2A8", Math.max(3, R * 0.05)));
    return out;
  }
  function pot(t) {
    var out = VT.shape("M 820 460 C 800 560 820 630 860 640 L 1060 640 C 1100 630 1120 560 1100 460 Z", "#4E5458", { sw: 7, ox: 5, oy: 4 }) + VT.line("M 800 500 C 780 500 776 540 800 544 M 1120 500 C 1144 500 1148 540 1120 544", 8);
    out += VT.ell(960, MOUTH_Y, 142, 30, "#C98A3C", 7, { ox: 0, oy: 0 });
    var st = Math.round(t * 12);
    for (var i = 0; i < 3; i++) out += VT.line("M " + (900 + i * 60) + " 420 c " + f(-14 + 6 * Math.sin(st + i)) + " -30 " + f(18 + 6 * Math.cos(st + i)) + " -50 0 -90", 5, "#FFFFFF", 0.7);
    return out;
  }
  function person(x, i, t) {
    var tq = 0.25 + i * 0.5 + (t > 2.4 ? 2.0 : 0), k = Math.sin(Math.PI * seg(t, tq, tq + 0.45)), out = "";
    var y = TABLE_Y + 20, shx = x, shy = y - 175;
    out += VT.line("M " + x + " " + (y + 10) + " L " + x + " " + (y - 190), 7) + VT.ell(x, y - 214, 24, 24, "#F6EEDC", 6);
    var dir = x < 960 ? 1 : -1, hx = shx + dir * VT.lerp(60, 230, k), hy = shy + VT.lerp(40, -10, k);
    out += VT.line("M " + shx + " " + shy + " L " + f(hx) + " " + f(hy), 7) + VT.line("M " + shx + " " + shy + " L " + (shx - dir * 30) + " " + (shy + 50), 7);
    out += ladle(hx, hy, dir > 0 ? VT.lerp(-20, 40, k) : VT.lerp(200, 140, k), 110, 26);
    return out;
  }
  function table() {
    return VT.shape("M 280 " + TABLE_Y + " L 1660 " + TABLE_Y + " L 1660 " + (TABLE_Y + 34) + " L 280 " + (TABLE_Y + 34) + " Z", "#C68A55", { sw: 6 }) +
      VT.line("M 330 674 L 330 900 M 1610 674 L 1610 900 M 620 674 L 620 900 M 1320 674 L 1320 900", 12, "#8E5527");
  }
  function room() { return B.fill("#EADBC0") + '<rect x="-1200" y="900" width="4320" height="1600" fill="#B98A5A"/>' + VT.line("M -1200 900 L 3100 900", 6) + VT.line("M -1200 420 L 3100 420", 4, "#C9B590", 0.8); }
  function stool() { return VT.shape("M 1650 780 L 1810 780 L 1810 806 L 1650 806 Z", "#9A6A40", { sw: 5 }) + VT.line("M 1666 806 L 1660 900 M 1794 806 L 1800 900", 9, "#8E5527"); }

  function scene(t) {
    var out = room();
    PEOPLE.forEach(function (x, i) { out += person(x, i, t); });
    out += table() + pot(t) + stool();
    var WS = 0.72, o = { t: t, s: WS, x: 1730, y: 780, flip: -1, mouth: "content", brows: "up", px: -12, py: 6 };
    var big = "";
    if (t < PULL0) {
      // muôi y hệt mọi người
      o.armR = [330, 250]; o.handR = "nam";
      var hp = VT.wobPt(o, 330, 250);
      out += B.wob(o) + ladle(hp[0], hp[1], 210, 110, 26);
      return out;
    }
    if (t < HIT) {
      var kp = seg(t, PULL0, PULL1), up = seg(t, PULL1, UP1), dn = VT.ease.in2(seg(t, UP1, HIT));
      o.mouth = "smirk"; o.brows = "skeptic"; o.eyes = "squint";
      var hand = VT.wobPt(o, 340, 120 - 70 * up);
      var ang = t < UP1 ? VT.lerp(80, -60, VT.ease.out(Math.max(kp * 0.4, up))) : VT.lerp(-60, -170, dn);
      var gy = t < PULL1 ? VT.lerp(160, 0, VT.ease.back(kp)) : 0;
      o.armR = VT.wobLocal(o, hand[0], hand[1] + gy); o.armL = [62, 300]; o.handR = "nam";
      if (t >= UP1) { o.lean = -14 * dn; o.eyes = "open"; o.mouth = "o"; }
      big = ladle(hand[0], hand[1] + gy, ang, 480, 150);
      if (t < UP1) out += big + B.wob(o); else out += B.wob(o) + big;
      if (t >= UP1 && dn > 0.1 && dn < 0.95) out += VT.arc([[hand[0] + Math.cos(-60 * Math.PI / 180) * 480, hand[1] + Math.sin(-60 * Math.PI / 180) * 480], [hand[0] - 260, hand[1] - 420], [hand[0] - 470, hand[1] - 80]], 6, 0.6);
      return out;
    }
    // kẹt: lòng muôi nằm vắt trên miệng nồi, cán chĩa lên phải, Wob treo ở đầu cán
    var wob = Math.sin((t - HIT) * 30) * 6 * Math.exp(-(t - HIT) * 6);
    var bowl = [960, MOUTH_Y - 6], handle = [1360, 300 + wob], a = Math.atan2(bowl[1] - handle[1], bowl[0] - handle[0]) * 180 / Math.PI;
    out += ladle(handle[0], handle[1], a, Math.hypot(bowl[0] - handle[0], bowl[1] - handle[1]), 150);
    if (t < HIT + 0.2) out += VT.impact({ x: 820, y: MOUTH_Y, s: 0.6 }) + VT.impact({ x: 1100, y: MOUTH_Y, s: 0.5, seed: 3 });
    var hang = { t: t, s: WS, x: handle[0] + 70, y: handle[1] + 330 * WS + 20, flip: -1, arms: "up", legs: "tiptoe", noBlink: true, mouth: "flat", brows: "flat", lid: 0.4, px: 0, py: 2, sq: 1.06 };
    hang.armR = VT.wobLocal(hang, handle[0], handle[1] + 4); hang.armL = [30, 170 + 10 * Math.sin(t * 14)]; hang.handR = "nam"; hang.handL = "xoe"; hang.lean = 8;
    if (t < HIT + 0.25) { hang.eyes = "wide"; hang.lid = 0; hang.mouth = "o"; }
    out += B.wob(hang);
    return out;
  }
  return [
    { a: 0, b: S2, ten: "bàn dài, nồi súp, ai cũng một muôi y hệt", ve: function (t, lt, T) {
      return { cam: key(T, [[0, [1040, 560, 1.0]], [S2, [1060, 560, 1.06], "sine"]]), world: scene(t), over: B.dream(t), tint: "warm" };
    } },
    { a: S2, b: DUR, ten: "muôi to gấp đôi kẹt miệng nồi, Wob treo lơ lửng", ve: function (t, lt, T) {
      return { cam: key(T, [[S2, [1300, 540, 1.5]], [HIT, [1220, 520, 1.55], "io"], [DUR, [1210, 500, 1.62], "sine"]]), shake: VT.shake(T, HIT, 0.24, 8), world: scene(t), over: B.dream(t), tint: "warm" };
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
