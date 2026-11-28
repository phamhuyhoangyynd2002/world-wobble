/* d49 · vẽ tay · chèn (656,218–665,393 s; 9,175 s). Vào "chen" (tự whoosh), ra "cat". Hồi ức, không khẩu hình. Không chữ.
 * Hình vẽ nguệch ngoạc bên lề bưu thiếp sống dậy (giấy bưu thiếp, nét mực xanh đen sôi; chỉ Wob tô màu).
 *  1. Hình to: cửa bến vẽ tay đóng chặt; Wob nhỏ (đồ ở nhà) đứng chờ trên kè; con sóng ngồi cạnh cửa như người gác, đúng "sea agrees" gật gù hai lần (song),
 *     cửa bến mở ra, Wob bước qua.
 *  2. Nghiêm, KHÔNG gag: chữ thập bệnh viện ở mép xa; con tàu nhỏ bò từng nấc theo nét đứt dài, mặt trời mọc lặn ba lần trên đường; Wob đi bộ cạnh tàu, mặt nghiêm.
 *     Đúng "longer in bad weather" một con sóng lớn dựng lên ở mũi tàu, tàu khựng, chồm lùi; Wob dừng, quay lại nhìn; sóng lặn thì tàu bò tiếp (vẫn nghiêm).
 *  3. Danh sách đi chợ dài (nét nguệch ngoạc, không chữ) gấp lại bỏ vào phong bì; tờ lịch lật liền mấy tháng, gió lật thổi tung phong bì;
 *     Wob nhảy lên chụp được đúng "ahead.", giữ tới cắt.
 */
window.CANH = function (VT, D) {
  var B = window.VTB(VT, D), key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink, DUR = D.thoi_luong;
  var N1 = VT.nhip(1), N2 = VT.nhip(2), T_SEA = VT.tu("sea"), T_AGREES = VT.tu("agrees."), T_WEEK = VT.tu("week"), T_LONG = VT.tu("longer"), T_WEA = VT.tu("weather.");
  var T_ORDERED = VT.tu("ordered"), T_MONTHS = VT.tu("months"), T_AHEAD = VT.tu("ahead.");
  var PEN = "#2c4f6e", PAPER = "#F3E9D2";
  var NOD0 = T_SEA - 0.15, NOD1 = NOD0 + 0.75, OPEN0 = T_AGREES - 0.05, OPEN1 = OPEN0 + 0.4, WALK0 = OPEN1 - 0.05;
  var FOLD0 = N2 + 0.05, FOLD1 = T_ORDERED + 0.15, FLIP0 = T_MONTHS - 0.25, FLIP1 = T_AHEAD + 0.1, BLOW = T_MONTHS + 0.05, CATCH = T_AHEAD;
  VT.sfx("song", NOD0, 0.45);
  var WV0 = T_LONG - 0.12, WV1 = T_LONG + 0.3, WV2 = T_WEA + 0.1, WV3 = WV2 + 0.35; // sóng lớn: dựng, giữ, lặn
  VT.sfx("song", WV0, 0.35);
  VT.sfx("lat-giay", FLIP0, 0.45); VT.sfx("lat-giay", FLIP0 + 0.3, 0.4);
  VT.sfx("whoosh", BLOW, 0.3);
  VT.sfx("pop", CATCH, 0.4);

  function ink(d, w, op) { return VT.line(d, w || 5, PEN, op == null ? 1 : op); }
  function paper() {
    var out = B.fill(PAPER);
    for (var y = 140; y < 1000; y += 74) out += VT.line("M -400 " + y + " L 2400 " + y, 2, "#D9C9A6", 0.5);
    return out;
  }
  function wob(o) { o.ao = false; o.noPack = true; return B.wob(o); }

  /* ---- 1. cửa bến + con sóng gác cổng ---- */
  function gate(t) {
    var out = "", QY = 760;
    // kè đá bên trái, mặt biển bên phải
    out += VT.shape("M -300 " + QY + " L 980 " + QY + " L 980 1200 L -300 1200 Z", "#E4D6B8", { sw: 5 });
    for (var i = 0; i < 9; i++) out += ink("M " + (i * 120 - 60) + " " + (QY + 40 + (i % 2) * 50) + " l 70 0", 3, 0.5);
    var st = Math.round(t * 10);
    out += VT.shape("M 980 " + (QY + 20) + " L 2300 " + (QY + 20) + " L 2300 1200 L 980 1200 Z", "#C9DCE0", { sw: 0, ox: 0, oy: 0 });
    for (var w = 0; w < 6; w++) { var wx = 1040 + w * 180, wy = QY + 70 + (w % 2) * 60; out += ink("M " + wx + " " + wy + " q 30 " + f(-16 - 4 * Math.sin(st + w)) + " 60 0 q 30 16 60 0", 4, 0.7); }
    // hai trụ cổng
    [[760, 640], [1180, 640]].forEach(function (p) {
      out += VT.shape("M " + (p[0] - 46) + " " + QY + " L " + (p[0] - 46) + " 380 L " + (p[0] + 46) + " 380 L " + (p[0] + 46) + " " + QY + " Z", "#E9DDC2", { sw: 6 });
      out += VT.shape("M " + (p[0] - 60) + " 380 L " + (p[0] + 60) + " 380 L " + (p[0] + 54) + " 350 L " + (p[0] - 54) + " 350 Z", "#E9DDC2", { sw: 5 });
      for (var r = 0; r < 5; r++) out += ink("M " + (p[0] - 40) + " " + (420 + r * 70) + " L " + (p[0] + 40) + " " + (420 + r * 70), 3, 0.55);
    });
    // hai cánh cửa: bản lề ở trụ, mở = cánh hẹp lại về phía trụ
    var ok = VT.ease.out(seg(t, OPEN0, OPEN1)), half = 164, wL = half * (1 - 0.86 * ok);
    function door(x0, dir) {
      var x1 = x0 + dir * wL, y0 = 440 - 20 * ok, y1 = QY;
      var d = "M " + f(x0) + " 440 L " + f(x1) + " " + f(y0) + " L " + f(x1) + " " + f(y1 + 10 * ok) + " L " + f(x0) + " " + y1 + " Z";
      var o2 = VT.shape(d, "#D9B27A", { sw: 6 });
      for (var k = 1; k < 4; k++) { var xx = x0 + dir * wL * k / 4; o2 += ink("M " + f(xx) + " " + f(444 - 20 * ok * k / 4) + " L " + f(xx) + " " + f(QY - 4 + 10 * ok * k / 4), 3, 0.6); }
      o2 += ink("M " + f(x0) + " 520 L " + f(x1) + " " + f(520 - 10 * ok) + " M " + f(x0) + " 680 L " + f(x1) + " " + f(680 + 4 * ok), 4, 0.8);
      return o2;
    }
    out += door(806, 1) + door(1134, -1);
    if (ok < 0.05) out += ink("M 958 470 L 958 740 M 982 470 L 982 740", 4, 0.9) + VT.shape("M 950 570 L 990 570 L 990 610 L 950 610 Z", "#9AA2A8", { sw: 4 });
    // con sóng gác cổng (ngồi trên mặt biển bên phải trụ), gật gù ở "sea agrees"
    var nod = Math.sin(Math.PI * 2 * seg(t, NOD0, NOD1) * 2) * (t > NOD0 && t < NOD1 ? 1 : 0), bob = 6 * Math.sin(t * 3);
    var wv = VT.shape("M -110 0 C -100 -90 -40 -170 40 -170 C 110 -170 140 -110 110 -70 C 90 -40 50 -60 60 -90 C 20 -96 -10 -60 -10 0 Z", "#9CC3CC", { sw: 6 }) +
      ink("M 40 -150 C 80 -150 104 -126 100 -96", 4, 0.7) + VT.dot(10, -116, 7, PEN) + VT.dot(44, -122, 7, PEN) + ink("M -100 0 q 20 -14 40 0 q 20 14 40 0 q 20 -14 40 0", 4, 0.7);
    out += VT.g("translate(1380 " + f(QY + 50 + bob) + ") rotate(" + f(-4 + 16 * Math.max(0, nod)) + " 0 0)", wv);
    // Wob
    var wk = VT.buoc(t, { t0: WALK0, t1: WALK0 + 0.9, x0: 560, x1: 940, s: 0.62, chuKy: 0.6 });
    var o = { t: t, s: 0.62, x: t < WALK0 ? 560 : wk.x, y: QY, flip: -1, mouth: "flat", brows: "flat", px: 14, py: 0, arms: "rest" };
    if (t >= NOD0) { o.brows = "up"; o.px = 18; o.py = -4; }
    if (t >= OPEN0) { o.mouth = "content"; o.brows = "up"; }
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; }
    var wobSvg = wob(o);
    // Wob đi qua cổng: vẽ trước trụ phải (đi giữa hai cánh)
    out += wobSvg;
    return out;
  }

  /* ---- 2. nét đứt tới bệnh viện, mặt trời mọc lặn ---- */
  function voyage(t) {
    var out = "", HY = 740, L0 = 200, L1 = 1640;
    var k = seg(t, N1, N2);
    // đường chân trời mặt biển
    out += ink("M -300 " + HY + " L 2300 " + HY, 4, 0.8);
    var st = Math.round(t * 10);
    for (var w = 0; w < 10; w++) { var wx = -100 + w * 230, wy = HY + 60 + (w % 3) * 50; out += ink("M " + wx + " " + wy + " q 25 " + f(-12 - 3 * Math.sin(st + w)) + " 50 0 q 25 12 50 0", 3, 0.55); }
    // nét đứt dài
    for (var x = L0; x < L1; x += 44) out += ink("M " + x + " " + (HY + 20) + " L " + (x + 22) + " " + (HY + 20), 5, 0.9);
    // bệnh viện ở mép xa: nhà nhỏ có chữ thập (xanh lá)
    out += VT.shape("M 1660 " + HY + " L 1660 560 L 1860 560 L 1860 " + HY + " Z", "#FFFDF6", { sw: 6 }) + VT.shape("M 1640 560 L 1760 480 L 1880 560 Z", "#E9DDC2", { sw: 6 });
    out += VT.shape("M 1748 584 L 1772 584 L 1772 612 L 1800 612 L 1800 636 L 1772 636 L 1772 664 L 1748 664 L 1748 636 L 1720 636 L 1720 612 L 1748 612 Z", "#3E9A5A", { sw: 4 });
    out += VT.shape("M 1740 " + HY + " L 1740 690 L 1780 690 L 1780 " + HY + " Z", "#D9B27A", { sw: 4 });
    // mặt trời mọc lặn 3 lần (cung trên trời), ngày đêm qua sắc trời
    var cyc = 3, ph = (k * cyc) % 1, sx = VT.lerp(300, 1500, ph), sy = HY - Math.sin(Math.PI * ph) * 460;
    var sun = VT.ell(sx, sy, 48, 48, "#F2C14E", 6);
    for (var r = 0; r < 8; r++) { var a = r * Math.PI / 4 + t; sun += ink("M " + f(sx + Math.cos(a) * 64) + " " + f(sy + Math.sin(a) * 64) + " L " + f(sx + Math.cos(a) * 88) + " " + f(sy + Math.sin(a) * 88), 4, 0.8); }
    var night = Math.max(0, 1 - Math.sin(Math.PI * ph) * 3) * 0.18;
    out = '<rect x="-400" y="-300" width="2800" height="' + (HY + 300) + '" fill="#2c4f6e" opacity="' + f(night * 100) / 100 + '"/>' + (sy < HY - 10 ? sun : "") + out;
    // tàu bò từng nấc: 8 nấc, mỗi nấc trượt nhanh rồi đứng
    // tiến độ: 6 nấc tới "longer", khựng suốt "in bad weather", rồi 2 nấc nữa tới hết cảnh
    var kp = t < WV0 ? 0.75 * seg(t, N1, WV0) : t < WV3 ? 0.75 : 0.75 + 0.25 * seg(t, WV3, N2);
    var steps = 8, kk = Math.min(kp * steps, steps - 1e-6), i = Math.floor(kk), fr = t >= WV0 && t < WV3 ? 1 : kk - i, sk = Math.min(1, fr / 0.45);
    var pos = VT.clamp((i + VT.ease.io(sk)) / steps, 0, 1), shipX = VT.lerp(320, 1180, pos);
    var h = VT.ease.back(seg(t, WV0, WV1)) * (1 - VT.ease.io(seg(t, WV2, WV3))), rock = Math.sin(Math.round(t * 12) * 1.3) * 3 * h;
    out += VT.ship({ x: shipX - 46 * h, y: HY + 4 - 26 * h, s: 0.6, rot: (fr < 0.45 ? -2 : 0) - 12 * h + rock });
    if (h > 0.02) { // sóng lớn dựng ở mũi tàu
      var wx = shipX + 40, H = 190 * h;
      out += VT.shape("M " + f(wx - 120) + " " + HY + " C " + f(wx - 85) + " " + f(HY - 0.25 * H) + " " + f(wx - 30) + " " + f(HY - H) + " " + f(wx + 40) + " " + f(HY - 0.92 * H) + " C " + f(wx + 100) + " " + f(HY - 0.85 * H) + " " + f(wx + 96) + " " + f(HY - 0.5 * H) + " " + f(wx + 62) + " " + f(HY - 0.55 * H) + " C " + f(wx + 50) + " " + f(HY - 0.3 * H) + " " + f(wx + 80) + " " + f(HY - 0.08 * H) + " " + f(wx + 120) + " " + HY + " Z", "#BFD3DC", { sw: 5 });
      out += ink("M " + f(wx - 60) + " " + f(HY - 0.55 * H) + " q 30 -" + f(0.2 * H) + " 70 -" + f(0.3 * H), 3, 0.6);
      for (var d = 0; d < 3; d++) out += VT.ell(wx + 20 + d * 34, HY - H - 14 - 10 * Math.sin(Math.round(t * 12) + d), 7, 7, "#FFFDF6", 3);
    }
    // Wob đi bộ cạnh tàu (phía trước tàu, trên nét đứt), mặt nghiêm
    var o = { t: t, s: 0.5, x: shipX + 170 + 110 * VT.ease.out(seg(t, WV0, WV1)) * (1 - seg(t, WV2, WV3)), y: HY + 20, flip: -1, mouth: "flat", brows: "down", px: 16, py: 0, legs: fr < 0.45 ? "walk" : "stand", phase: kk * 1.1, stride: 40 };
    if (t >= WV0 + 0.1 && t < WV3) { o.flip = 1; o.brows = "worried"; o.px = -16; o.py = -6; o.legs = "stand"; }
    out += wob(o);
    return out;
  }

  /* ---- 3. danh sách gấp vào phong bì, lịch lật, gió thổi, Wob chụp ---- */
  function envelope(x, y, s, rot) {
    return VT.g(VT.tr(x, y, s, rot), VT.shape("M -90 -56 L 90 -56 L 90 56 L -90 56 Z", "#FFFDF6", { sw: 6 }) + ink("M -90 -56 L 0 8 L 90 -56", 5) + ink("M -90 56 L -26 4 M 90 56 L 26 4", 3, 0.6));
  }
  function list(x, y, len) {
    var out = VT.shape("M " + (x - 70) + " " + y + " L " + (x + 70) + " " + y + " L " + (x + 70) + " " + (y + len) + " L " + (x - 70) + " " + (y + len) + " Z", "#FFFDF6", { sw: 5 });
    for (var yy = y + 26, n = 0; yy < y + len - 14; yy += 30, n++) out += ink("M " + (x - 50) + " " + yy + " q 14 -8 26 0 t 26 0 t 26 0" + (n % 3 ? " t 24 0" : ""), 3, 0.8);
    return out;
  }
  function errands(t) {
    var out = "", GY = 900;
    out += ink("M -300 " + GY + " L 2300 " + GY, 4, 0.6);
    // lịch lật nhiều tháng
    var pages = 6 * VT.ease.io(seg(t, FLIP0, FLIP1)), CX = 1300, CY = 640;
    out += VT.calendar({ x: CX, y: CY, s: 1.25, k: pages });
    if (t > FLIP0 + 0.1 && t < FLIP1) for (var i = 0; i < 3; i++) out += VT.arc([[CX - 120, CY - 140 + i * 90], [CX - 300, CY - 170 + i * 90], [CX - 470, CY - 110 + i * 90]], 5, 0.5);
    // danh sách dài → gấp vào phong bì (gấp từ dưới lên)
    var fk = VT.ease.io(seg(t, FOLD0, FOLD1)), EX = 960, EY = GY - 62;
    var o = { t: t, s: 0.62, x: 720, y: GY, flip: -1, mouth: "content", brows: "up", px: 16, py: 0 };
    if (fk < 1) {
      var len = VT.lerp(560, 100, fk);
      out += list(EX, GY - 14 - len, len);
      if (fk > 0.6) out += envelope(EX, EY, 1, 0);
      o.armL = VT.wobLocal(o, EX - 76, GY - 120);
    } else {
      // phong bì nằm chờ; gió lật thổi bay lên trái; Wob nhảy chụp đúng "ahead."
      var bk = seg(t, BLOW, CATCH), held = t >= CATCH;
      var hopK = seg(t, CATCH - 0.3, CATCH + 0.16), hop = Math.sin(Math.PI * hopK) * 150;
      o.y = GY - hop;
      if (hopK > 0 && hopK < 1) o.legs = "tuck";
      var hand = [o.x + 70, o.y - 330 * 0.62 - 50];
      var ex, ey, er;
      if (!held) {
        var p0 = [EX, EY], p1 = [hand[0] + 60, hand[1] - 40], c = [EX + 40, 380];
        var u = VT.ease.out(bk);
        ex = (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * c[0] + u * u * p1[0]; ey = (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * c[1] + u * u * p1[1];
        er = 360 * u * 0.8 + 10 * Math.sin(t * 20) * (bk > 0 ? 1 : 0);
        if (bk > 0) o.px = 10; o.py = bk > 0 ? -16 : 0; o.eyes = bk > 0 ? "wide" : "open"; o.mouth = bk > 0 ? "o" : "content";
        if (bk > 0.5) o.armL = VT.wobLocal(o, VT.lerp(o.x + 60, hand[0], seg(t, CATCH - 0.3, CATCH)), VT.lerp(o.y - 150, hand[1], seg(t, CATCH - 0.3, CATCH)));
      } else {
        ex = hand[0] + 6; ey = hand[1] - 20; er = -12;
        o.armL = VT.wobLocal(o, hand[0], hand[1]); o.handL = "nam";
        o.eyes = t < CATCH + 0.3 ? "wide" : "open"; o.mouth = "flat"; o.brows = "flat"; o.lid = t < CATCH + 0.3 ? 0 : 0.35; o.px = 0; o.py = 0; o.noBlink = true;
        if (t < CATCH + 0.2) out += VT.sparkle({ x: ex + 70, y: ey - 50, s: 0.5 });
      }
      out += wob(o) + envelope(ex, ey, 0.8, er);
      return out;
    }
    out += wob(o);
    return out;
  }

  return [
    { a: 0, b: N1, ten: "cửa bến đóng, con sóng gật gù, cửa mở, Wob bước qua", ve: function (t, lt, T) {
      return { cam: key(T, [[0, [980, 560, 1.15]], [N1, [1010, 560, 1.2], "sine"]]), world: paper() + gate(t), tint: "warm" };
    } },
    { a: N1, b: N2, ten: "tàu bò theo nét đứt tới chữ thập, mặt trời mọc lặn", ve: function (t, lt, T) {
      return { cam: key(T, [[N1, [900, 560, 1.12]], [N2, [1060, 560, 1.15], "sine"]]), world: paper() + voyage(t), tint: "warm" };
    } },
    { a: N2, b: DUR, ten: "danh sách vào phong bì, lịch lật, gió thổi, Wob chụp", ve: function (t, lt, T) {
      return { cam: key(T, [[N2, [1020, 620, 1.3]], [CATCH, [930, 600, 1.38], "sine"], [DUR, [910, 600, 1.42], "sine"]]), shake: VT.shake(T, CATCH, 0.15, 4), world: paper() + errands(t), tint: "warm" };
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
