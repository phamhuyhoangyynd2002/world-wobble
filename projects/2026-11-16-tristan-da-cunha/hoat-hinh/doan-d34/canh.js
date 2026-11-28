/* d34 · vẽ tay (437,670–455,304 s; 17,63 s). Vào "cat", ra "giay". Hồi ức, không khẩu hình. Chữ: CAPE TOWN (thẻ túi thư), POST OFFICE (biển trên cửa sổ bán tem).
 *  [lui-ra-toan-canh] Lùi đúng 3 bậc, mỗi bậc giữ ≥ 0,8 s (mỗi bậc là một cú lùi nhanh + whoosh):
 *    0. con tem núi lửa trên bưu thiếp → 1. quầy bưu điện (Wob bé tí đứng trên quầy) → 2. cả hòn đảo; quanh đảo hiện thùng tôm hùm,
 *       xấp tem (nét mực đen trắng, KHÔNG chim cánh cụt, không mệnh giá) và chồng xu xếp như hàng gửi đi.
 *  Lùi tiếp: quả địa cầu giấy (chỉ lưới kinh vĩ, không bản đồ, không biên giới), bàn tay que chung cầm nhíp gắp tem vươn về một chấm giữa Nam Đại Tây Dương.
 *  Về quầy: Wob trả xu, lôi bốn củ khoai từ túi hông ba lô, đẩy về cửa sổ bán tem; bàn tay chung sau quầy đẩy trả từng củ; củ cuối nảy lên, Wob bắt bằng miệng ba lô.
 *  Wob thả bưu thiếp vào túi thư vải bố, vẫy chào; túi được buộc, đặt lên boong tàu.
 *  [lia-theo-vat] Camera bám túi thư trên boong (nhãn CAPE TOWN ≥ 45 px quanh "Cape Town"); camera dừng, tàu chạy khỏi khung về mép phải trên biển xám; rồi phủ giấy.
 * Trang phục: áo mưa cam mũ trùm hạ, ba lô nhỏ ô liu (túi hông có bốn củ khoai).
 */
window.CANH = function (VT, D) {
  var B = window.VTB(VT, D), key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink, DUR = D.thoi_luong;
  var N = [0, VT.nhip(1), VT.nhip(2), VT.nhip(3), VT.nhip(4)];
  var T_PAID = VT.tu("paid"), T_COINS2 = VT.tu("coins.", 0), T_DID = VT.tu("did"), T_POT = VT.tu("potatoes."), T_POSTCARD = VT.tu("postcard"), T_BAG = VT.tu("bag,"), T_SHIP = VT.tu("ship,"), T_CAPE = VT.tu("cape"), T_COLL = VT.tu("collectors");
  var L1 = 0.85, L2 = 1.95, L3 = T_COLL - 0.3, BURST = 0.3;     // các mốc lùi bậc
  var PUSH = T_POT + 0.05, BACK_T = [PUSH + 0.3, PUSH + 0.55, PUSH + 0.8, PUSH + 1.05], CATCH = BACK_T[3] + 0.42;
  var S3 = Math.max(N[3], CATCH + 0.25), DROP = T_BAG - 0.15, SHIP0 = T_SHIP - 0.15, STOP = T_CAPE + 1.2;
  [L1, L2, L3].forEach(function (tt) { VT.sfx("whoosh", tt, 0.4); });
  VT.sfx("pop", 2.45, 0.25); VT.sfx("pop", 2.95, 0.25); VT.sfx("pop", 3.45, 0.25);
  BACK_T.slice(0, 3).forEach(function (tt) { VT.sfx("bonk", tt + 0.02, 0.25); });
  VT.sfx("bonk", CATCH, 0.6);
  VT.sfx("lat-giay", DROP + 0.05, 0.35);
  VT.sfx("drop", SHIP0 + 0.35, 0.4);

  function burst(T, t0) { var k = seg(T, t0, t0 + BURST); return 1 + 0.55 * Math.pow(1 - k, 3); }
  // ---------- bậc 0: con tem cận cực gần ----------
  function stampClose(t) {
    var out = B.fill("#FBF4E2");
    for (var i = 0; i < 4; i++) out += VT.line("M 120 " + (300 + i * 110) + " C 300 " + (290 + i * 110) + " 420 " + (318 + i * 110) + " 560 " + (300 + i * 110), 10, "#2c4f6e", 0.7);
    out += VT.line("M 660 120 L 660 1000", 6, INK, 0.4);
    out += B.stamp({ x: 1160, y: 520, w: 420, h: 510, paper: "#FBF4E2", design: function (w, h) { return VT.g("scale(2.6)", B.TEM[0](w / 2.6, h / 2.6)); } });
    return out;
  }
  // ---------- quầy bưu điện ----------
  var CT = 640, WIN = [1080, 300, 1420, 600];
  function counter(t, o) {
    o = o || {};
    var out = B.fill("#E6D2B0") + '<rect x="-1200" y="' + CT + '" width="4320" height="1800" fill="#B98A5A"/>';
    for (var x = -1100; x < 3100; x += 140) out += VT.line("M " + x + " " + (CT + 40) + " L " + x + " 1500", 4, "#8E5527", 0.5);
    out += VT.shape("M -1200 " + (CT - 6) + " L 3100 " + (CT - 6) + " L 3100 " + (CT + 30) + " L -1200 " + (CT + 30) + " Z", "#C68A55", { sw: 6, ox: 0, oy: 3 });
    // cửa sổ bán tem
    out += VT.shape("M " + (WIN[0] - 26) + " " + (WIN[3] + 6) + " L " + (WIN[0] - 26) + " " + (WIN[1] - 26) + " L " + (WIN[2] + 26) + " " + (WIN[1] - 26) + " L " + (WIN[2] + 26) + " " + (WIN[3] + 6) + " Z", "#9A6A40", { sw: 6 });
    out += VT.shape("M " + WIN[0] + " " + WIN[3] + " L " + WIN[0] + " " + WIN[1] + " L " + WIN[2] + " " + WIN[1] + " L " + WIN[2] + " " + WIN[3] + " Z", "#6E5A46", { sw: 5 });
    out += '<rect x="' + WIN[0] + '" y="' + WIN[1] + '" width="' + (WIN[2] - WIN[0]) + '" height="80" fill="#8A7460" opacity="0.6"/>';
    // biển POST OFFICE
    out += VT.shape("M 1030 160 L 1500 160 L 1500 262 L 1030 262 Z", "#2E5A6E", { sw: 6, ox: 5, oy: 5 }) + VT.text(1265, 232, "POST OFFICE", 56, { fill: "#FFFDF6" });
    // túi thư vải bố trên quầy
    if (!o.noBag) out += B.mailBag({ x: 300, y: CT - 2, s: 0.82, open: o.bagOpen == null ? 1 : o.bagOpen, label: "CAPE TOWN", labelSize: 40 });
    return out;
  }
  function cardOnCounter() { return B.postcard({ x: 800, y: CT - 52, s: 0.42, rot: -4, stampDesign: 0 }); }
  function shotL1(t) {
    var out = counter(t) + cardOnCounter();
    out += B.wob({ t: t, s: 0.36, x: 900, y: CT, flip: -1, mouth: "content", brows: "up", px: -10, py: 4 });
    return out;
  }
  // ---------- bậc 2: cả hòn đảo + hàng gửi đi ----------
  function island(t) {
    var out = B.fill("#D6E0E2") + '<rect x="-1200" y="560" width="4320" height="2000" fill="' + B.SEA + '"/>' + VT.line("M -1200 560 L 3100 560", 5);
    for (var i = 0; i < 14; i++) { var x = -600 + i * 300 + 30 * Math.sin(Math.round(t * 12) * 0.5 + i), y = 640 + (i % 4) * 90; out += VT.line("M " + f(x) + " " + y + " q 22 -10 44 0 q 22 10 44 0", 4, "#DCE8EA", 0.6); }
    out += VT.shape("M 560 640 C 640 600 760 470 900 330 C 940 300 980 300 1020 330 C 1160 470 1280 600 1380 640 C 1200 680 740 680 560 640 Z", "#8FA88A", { sw: 6, ox: 5, oy: 4 });
    out += VT.shape("M 900 330 C 940 300 980 300 1020 330 C 1000 360 920 360 900 330 Z", "#6E8A6A", { sw: 4 }) + VT.line("M 640 630 C 700 600 760 600 820 610", 5, "#B5C77A");
    for (var h = 0; h < 6; h++) out += B.cot({ x: 640 + h * 34, y: 628 - (h % 2) * 6, w: 28, chimney: false, roof: ["#5E7A4A", "#B5523A", "#6F8A9A"][h % 3] });
    var goods = [["crate", 470, 720, 2.45], ["stamps", 1430, 700, 2.55], ["coins", 650, 820, 2.95], ["crate", 1300, 820, 3.05], ["stamps", 820, 760, 3.45], ["coins", 1120, 760, 3.5]];
    goods.forEach(function (g) {
      var k = VT.ease.back(seg(t, g[3], g[3] + 0.25)); if (k <= 0) return;
      var bob = 4 * Math.sin(t * 3 + g[1]), inner = "";
      if (g[0] === "crate") inner = VT.shape("M -60 -70 L 60 -70 L 60 0 L -60 0 Z", "#C68A55", { sw: 5 }) + VT.line("M -60 -46 L 60 -46 M -60 -22 L 60 -22", 3, "#8E5527") + B.lobster({ x: 4, y: -36, s: 0.18 });
      else if (g[0] === "stamps") { for (var q = 0; q < 3; q++) inner += B.stamp({ x: 0, y: -20 - q * 16, w: 90, h: 64, perf: 1, paper: B.SEA, design: function () { return VT.line("M -18 10 L 0 -12 L 18 10", 3); } }); inner += VT.line("M -46 -36 L 46 -36", 4, "#C9463A"); }
      else for (var c = 0; c < 4; c++) inner += B.coin({ x: 0, y: -10 - c * 12, r: 34, flat: 0.35 });
      out += VT.g("translate(" + g[1] + " " + f(g[2] + bob) + ") scale(" + f(k * 100) / 100 + ")", VT.ell(0, 4, 74, 12, "#5E7C86", 0, { op: 0.6 }) + inner);
    });
    return out;
  }
  // ---------- quả địa cầu + nhíp gắp tem ----------
  var GL = { x: 960, y: 560, r: 330, lat0: -18 };
  function globe(t) {
    var out = B.fill("#E9DCC0") + VT.globe({ x: GL.x, y: GL.y, r: GL.r, lat0: GL.lat0, lats: [-60, -30, 0, 30, 60], meridians: 10 });
    var p = VT.globePt(GL, -37, -10), pulse = 1 + 0.2 * Math.sin(Math.round(t * 12) * 0.9);
    out += VT.ell(p[0], p[1], 14 * pulse, 14 * pulse, "#C9463A", 5, { ox: 0, oy: 0 });
    var hands = [[-80, 300, T_COLL + 0.05, "#6B8FA6"], [700, -160, T_COLL + 0.35, "#9A7FA8"], [2000, 380, T_COLL + 0.6, "#7E9A5A"], [1750, 1240, T_COLL + 0.85, "#C9925C"], [100, 1180, T_COLL + 1.1, "#A8706A"]];
    hands.forEach(function (h, i) {
      var k = VT.ease.out(seg(t, h[2], h[2] + 0.55)); if (k <= 0) return;
      var a = Math.atan2(p[1] - h[1], p[0] - h[0]), dist = Math.hypot(p[0] - h[0], p[1] - h[1]), reach = VT.lerp(0, dist - 230 - (i % 2) * 40, k);
      var wx = h[0] + Math.cos(a) * reach, wy = h[1] + Math.sin(a) * reach, pinch = Math.round(t * 6 + i) % 2;
      var tw = VT.line("M 80 -6 L 200 " + (pinch ? -2 : -8), 5, "#8A8F94") + VT.line("M 80 6 L 200 " + (pinch ? 2 : 8), 5, "#8A8F94") + B.stamp({ x: 214, y: 0, w: 34, h: 40, perf: 1, paper: "#E9DCC0", s: 1 });
      out += VT.g("translate(" + f(wx) + " " + f(wy) + ") rotate(" + f(a * 57.3) + ")", VT.handGeneric({ x: 0, y: 0, s: 0.8, sleeve: h[3] }) + VT.g("scale(0.8)", tw));
    });
    return out;
  }
  // ---------- về quầy: trả xu, bốn củ khoai ----------
  var WX = 940, POT_X = [990, 1035, 1080, 1125];
  function potX(i, t) {
    var out0 = T_DID + i * 0.18, x = POT_X[i];
    if (t >= PUSH) x += 120 * VT.ease.out(seg(t, PUSH, PUSH + 0.25));
    if (i < 3 && t >= BACK_T[i]) x = VT.lerp(POT_X[i] + 120, 880 - i * 44, VT.ease.out(seg(t, BACK_T[i], BACK_T[i] + 0.3)));
    return x;
  }
  function shotPay(t) {
    var out = counter(t, { bagOpen: 1 });
    // xu
    for (var c = 0; c < 3; c++) {
      var tc = T_PAID + c * 0.15, kc = seg(t, tc, tc + 0.2);
      if (kc > 0 && t < T_DID) out += B.coin({ x: 1000 + c * 40, y: VT.lerp(470, CT - 10, VT.ease.bounce(kc)), r: 20, flat: kc < 1 ? 1 : 0.4 });
      else if (t >= T_DID && t < T_DID + 0.4) out += B.coin({ x: 1000 + c * 40 + 220 * seg(t, T_DID, T_DID + 0.4), y: CT - 10, r: 20, flat: 0.4 });
    }
    var hand = "";
    if (t > T_DID - 0.1 && t < T_DID + 0.5) hand = VT.handGeneric({ x: VT.lerp(1320, 1180, Math.sin(Math.PI * seg(t, T_DID - 0.1, T_DID + 0.5))), y: CT - 34, s: 0.7, sx: -1, sleeve: "#6B8FA6" });
    // khoai
    for (var i = 0; i < 4; i++) {
      var tin = T_DID + 0.15 + i * 0.18, ki = seg(t, tin, tin + 0.22);
      if (ki <= 0) continue;
      var px = potX(i, t), py = CT - 24, rot = (t - tin) * 200;
      if (ki < 1) { px = VT.lerp(WX + 70, POT_X[i], ki); py = VT.lerp(CT - 150, CT - 24, ki) - 80 * Math.sin(Math.PI * ki); }
      if (i === 3 && t >= BACK_T[3]) {
        var kb = seg(t, BACK_T[3], CATCH);
        if (kb >= 1) continue;
        px = VT.lerp(POT_X[3] + 120, WX + 80, kb); py = VT.lerp(CT - 24, CT - 200, kb) - 240 * Math.sin(Math.PI * kb);
      }
      if (t >= PUSH && t < BACK_T[Math.min(i, 3)] + 0.3) rot = (t - PUSH) * 500;
      out += B.potato({ x: px, y: py, s: 0.5, rot: rot, seed: i + 2 });
    }
    // bàn tay chung đẩy trả
    BACK_T.forEach(function (tb, i) {
      var k = Math.sin(Math.PI * seg(t, tb - 0.15, tb + 0.2));
      if (k > 0) hand += VT.handGeneric({ x: VT.lerp(WIN[0] + 260, POT_X[i] + 160, k), y: CT - 34, s: 0.7, sx: -1, sleeve: "#6B8FA6" });
    });
    out += hand;
    var o = { t: t, s: 0.6, x: WX, y: CT, mouth: "content", brows: "up", px: 12, py: 4 };
    if (t < T_DID) { var dropK = seg(t, T_PAID - 0.2, T_PAID + 0.3); o.armR = dropK > 0 && t < T_PAID + 0.6 ? [400, 200] : [338, 300]; o.handR = "xoe"; }
    else if (t < PUSH) { o.armR = [360, 160]; o.handR = "nam"; o.packOpen = 1; o.mouth = "smile"; o.brows = "up"; }
    else if (t < BACK_T[0]) { o.armR = [420, 260]; o.armL = [380, 270]; o.handR = "xoe"; o.handL = "xoe"; o.lean = 10; o.mouth = "smile"; }
    else if (t < BACK_T[3] + 0.1) { o.mouth = "frown"; o.brows = "worried"; o.px = 6; o.py = 14; }
    else { o.packOpen = 1; o.lean = -16; o.eyes = "wide"; o.mouth = "o"; o.px = 16; o.py = -16; o.armL = [40, 120]; o.handL = "xoe"; if (t > CATCH) { o.lean = -6; o.eyes = "open"; o.mouth = "flat"; o.brows = "flat"; o.lid = 0.35; o.noBlink = true; o.px = 0; o.py = 0; o.packOpen = 0.2; } }
    out += B.wob(o);
    return out;
  }
  // ---------- thả bưu thiếp vào túi thư ----------
  var WK = { t0: N[3] + 0.5, t1: T_POSTCARD + 0.45, x0: 860, x1: 480, chuKy: 0.6, s: 0.6 };
  function shotBag(t) {
    var cinch = seg(t, T_SHIP - 0.75, T_SHIP - 0.45);
    var out = counter(t, { bagOpen: 1 - cinch });
    var wk = VT.buoc(t, WK), o = { t: t, s: 0.6, x: wk.x, y: CT, flip: -1, mouth: "content", brows: "up", px: -12, py: 0 };
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; }
    var card = "", dropK = seg(t, DROP, DROP + 0.3);
    if (t < DROP) { o.armR = [340, 120]; o.handR = "nam"; var hp = VT.wobPt(o, 340, 120); card = B.postcard({ x: hp[0] - 30, y: hp[1] - 30, s: 0.36, rot: -20 }); }
    else if (dropK < 1) card = B.postcard({ x: VT.lerp(WK.x1 - 120, 300, dropK), y: VT.lerp(CT - 330, CT - 190, VT.ease.in2(dropK)), s: 0.36 * (1 - 0.4 * dropK), rot: -20 + 80 * dropK });
    if (t > DROP + 0.25) { o.armR = [330, Math.round(t * 8) % 2 ? 40 : 70]; o.handR = "xoe"; o.mouth = "smile"; o.eyes = "happy"; }
    if (cinch > 0) { o.armR = [338, 300]; o.handR = "tron"; o.eyes = "open"; o.mouth = "content"; }
    out += card + B.wob(o);
    if (cinch > 0 && cinch < 1) out += VT.line("M 270 " + (CT - 200) + " l -20 -14 M 330 " + (CT - 200) + " l 20 -14", 5);
    return out;
  }
  // ---------- boong tàu ----------
  function shipX(t) {
    var v0 = 150, x = 700 + v0 * (Math.min(t, STOP) - SHIP0);
    if (t > STOP) { var dt = t - STOP; x += v0 * dt + 640 * dt * dt; }
    return x;
  }
  function shipScene(t) {
    var out = B.fill("#CDD3D6") + '<rect x="-1200" y="720" width="5320" height="2000" fill="#8C9A9E"/>' + VT.line("M -1200 720 L 4100 720", 5);
    for (var i = 0; i < 26; i++) { var x = -1000 + i * 220 + 40 * Math.sin(Math.round(t * 12) * 0.4 + i), y = 760 + (i % 4) * 70; out += VT.line("M " + f(x) + " " + y + " q 22 -10 44 0 q 22 10 44 0", 4, "#DDE3E5", 0.55); }
    var sx = shipX(t), rock = 3 * Math.sin(t * 2.2);
    var hull = VT.shape("M -520 -40 L 520 -40 L 460 90 L -470 90 Z", "#56656E", { sw: 7 }) + VT.line("M -510 -18 L 510 -18", 10, "#C9463A") +
      VT.shape("M -520 -60 L 520 -60 L 520 -40 L -520 -40 Z", "#8A969C", { sw: 5 }) +
      VT.shape("M 180 -60 L 180 -230 L 420 -230 L 420 -60 Z", "#F4EEDD", { sw: 6 }) + VT.line("M 210 -180 L 390 -180", 14, "#5A8FC0") +
      VT.shape("M 300 -230 L 300 -320 L 360 -320 L 360 -230 Z", "#C9463A", { sw: 5 }) + VT.line("M -520 -110 L -120 -110", 4) + VT.line("M -500 -60 L -500 -110 M -380 -60 L -380 -110 M -260 -60 L -260 -110 M -140 -60 L -140 -110", 4);
    var bagY = -60, land = seg(t, SHIP0, SHIP0 + 0.35);
    if (land < 1) bagY = VT.lerp(-520, -60, VT.ease.in2(land));
    var bag = B.mailBag({ x: -150, y: bagY, s: 0.8, open: 0, label: "CAPE TOWN", labelSize: 44 });
    if (land < 1) bag = VT.line("M -150 " + f(bagY - 185) + " L -150 -900", 5) + bag;
    out += VT.g("translate(" + f(sx) + " 700) rotate(" + f(rock) + ")", hull + bag);
    if (t > STOP) out += VT.line("M " + f(sx - 560) + " 750 q -60 -14 -120 0 q -60 14 -120 0", 6, "#FFFFFF", 0.7);
    return out;
  }
  function wobTiny(t) { return ""; }

  return [
    { a: 0, b: L1, ten: "bậc 0: con tem núi lửa", ve: function (t, lt, T) {
      return { cam: key(T, [[0, [1100, 540, 1.0]], [L1, [1110, 540, 1.04], "sine"]]), world: stampClose(t), tint: "warm" };
    } },
    { a: L1, b: L2, ten: "bậc 1: quầy bưu điện, Wob bé tí trên quầy", ve: function (t, lt, T) {
      var z = burst(T, L1);
      return { cam: [VT.lerp(820, 960, seg(T, L1, L1 + BURST)), VT.lerp(560, 480, seg(T, L1, L1 + BURST)), 1.0 * z / 1.0 * (1 + 0.02 * seg(T, L1 + BURST, L2))], world: shotL1(t), tint: "warm" };
    } },
    { a: L2, b: L3, ten: "bậc 2: cả hòn đảo, hàng gửi đi quanh đảo", ve: function (t, lt, T) {
      var z = burst(T, L2) * (1 + 0.03 * seg(T, L2 + BURST, L3));
      return { cam: [960, 580, z], world: island(t), tint: "cold" };
    } },
    { a: L3, b: N[2], ten: "lùi tiếp: địa cầu giấy, nhíp gắp tem", ve: function (t, lt, T) {
      var z = burst(T, L3) * (1 + 0.04 * seg(T, L3 + BURST, N[2]));
      return { cam: [960, 560, z], world: globe(t), tint: "warm" };
    } },
    { a: N[2], b: S3, ten: "về quầy: trả xu, khoai bị đẩy trả, bắt bằng ba lô", ve: function (t, lt, T) {
      return { cam: key(T, [[N[2], [1080, 450, 1.5]], [S3, [1060, 460, 1.58], "sine"]]), shake: VT.shake(T, CATCH, 0.2, 4), world: shotPay(t), tint: "warm" };
    } },
    { a: S3, b: SHIP0, ten: "thả bưu thiếp vào túi thư, vẫy chào, túi buộc lại", ve: function (t, lt, T) {
      return { cam: key(T, [[S3, [470, 470, 1.7]], [SHIP0, [455, 474, 1.78], "sine"]]), world: shotBag(t), tint: "warm" };
    } },
    { a: SHIP0, b: DUR, ten: "lia theo túi thư trên boong; tàu chạy khỏi khung", ve: function (t, lt, T) {
      var bx = shipX(Math.min(T, STOP)) - 150, cam;
      if (T < STOP) cam = [bx + 60, 560, key(T, [[SHIP0, 1.8], [T_CAPE, 1.7, "io"]])];
      else { var k = B.sm(seg(T, STOP, STOP + 0.9)); cam = [bx + 60 + 300 * k, VT.lerp(560, 580, k), VT.lerp(1.7, 1.0, k)]; }
      return { cam: cam, shake: VT.shake(T, SHIP0 + 0.35, 0.2, 4), world: shipScene(t), tint: "cold" };
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
