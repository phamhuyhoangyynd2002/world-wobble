/* d40 · vẽ tay · chèn (549,497–561,446 s; 11,95 s). Vào "chen" (tự whoosh), ra "cat". Bong bóng tưởng tượng (viền mây). Hồi ức, không khẩu hình. Không chữ.
 *  1. Hình to: một bàn tay chung thò từ mép phải trao chùm chìa khoá khổng lồ; đúng "keys" chùm chìa nặng kéo Wob ngồi bệt (bonk), tay vẫn ôm.
 *     Cận chùm chìa: móc khoá hình xe buýt, cửa hàng, chữ thập bệnh viện (xanh lá, không dùng chữ thập đỏ) lóe lên đúng "buses", "shops", "doctor";
 *     mỗi lần lóe Wob lún thêm một chút.
 *  2. "handing them back": Wob (vẫn ngồi) đẩy chùm chìa trả bàn tay; bàn tay oằn xuống vì nặng rồi rút đi. Wob chìa lòng bàn tay.
 *     Cận chiếc chìa nhỏ bằng sắt cũ treo trên móc khoá hình núi lửa (có ngôi nhà nhỏ dưới chân); camera lùi ra (lui-ra-toan-canh);
 *     đúng "key" Wob cầm chìa nhỏ là bật đứng dậy nhẹ tênh (boing), giữ 0,6 s; ở "erupted" núi lửa trên móc phụt một cụm khói nhỏ.
 * Trang phục: đồ ở nhà (không áo mưa, không ba lô).
 */
window.CANH = function (VT, D) {
  var B = window.VTB(VT, D), key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink, DUR = D.thoi_luong;
  var N1 = VT.nhip(1), T_KEYS = VT.tu("keys"), T_BUS = VT.tu("buses,"), T_SHOPS = VT.tu("shops"), T_DOC = VT.tu("doctor");
  var T_HANDING = VT.tu("handing"), T_ASK = VT.tu("asking"), T_KEY = VT.tu("key"), T_ERUPT = VT.tu("erupted");
  var GROUND = 900, WX = 760, WS = 0.9, RS = 1.15, RC = [WX + 270, GROUND - 110], RROT = -40;
  var GIVE = T_KEYS - 0.12, SIT0 = T_KEYS + 0.02, SIT1 = SIT0 + 0.18;
  var FL = [T_BUS - 0.05, T_SHOPS - 0.05, T_DOC - 0.05];
  var S_B = 2.45, S_C = N1 - 0.2, S_D = T_ASK - 0.2;
  var BACK = T_HANDING + 0.15, SAG = BACK + 0.25, OUT = SAG + 0.5;
  var TAKE = T_KEY, POP1 = TAKE + 0.3, PUFF = T_ERUPT;
  VT.sfx("bonk", SIT1, 0.8);
  FL.forEach(function (tt, i) { VT.sfx("pop", tt, 0.3 + 0.05 * i); });
  VT.sfx("whoosh", OUT - 0.2, 0.3);
  VT.sfx("boing", TAKE, 0.65);
  VT.sfx("pop", PUFF, 0.25);

  function room() {
    return B.fill("#EADBC0") + '<rect x="-1200" y="' + GROUND + '" width="4320" height="1600" fill="#C9A577"/>' + VT.line("M -1200 " + GROUND + " L 3100 " + GROUND, 6) +
      VT.line("M -1200 380 L 3100 380", 4, "#D2BE98", 0.8);
  }
  /* ---- móc khoá (fob) ---- */
  function fobBus(s) {
    return VT.g("scale(" + s + ")", VT.shape("M -56 -34 L 52 -34 C 60 -34 62 -26 62 -18 L 62 22 L -62 22 L -62 -26 C -62 -30 -60 -34 -56 -34 Z", "#E8C25A", { sw: 5 }) +
      VT.shape("M -50 -24 L -24 -24 L -24 -4 L -50 -4 Z M -16 -24 L 10 -24 L 10 -4 L -16 -4 Z M 18 -24 L 44 -24 L 44 -4 L 18 -4 Z", "#BFE0EC", { sw: 4 }) +
      VT.ell(-34, 24, 12, 12, "#4E5458", 4) + VT.ell(34, 24, 12, 12, "#4E5458", 4));
  }
  function fobShop(s) {
    var aw = "";
    for (var i = 0; i < 5; i++) aw += VT.shape("M " + (-60 + i * 24) + " -22 L " + (-36 + i * 24) + " -22 L " + (-36 + i * 24) + " -6 C " + (-40 + i * 24) + " 2 " + (-56 + i * 24) + " 2 " + (-60 + i * 24) + " -6 Z", i % 2 ? "#FFFDF6" : "#C9463A", { sw: 3, ox: 0, oy: 0 });
    return VT.g("scale(" + s + ")", VT.shape("M -52 -22 L 52 -22 L 52 40 L -52 40 Z", "#F3E6CC", { sw: 5 }) + VT.shape("M -64 -22 L 0 -60 L 64 -22 Z", "#9A6A40", { sw: 5 }) + aw +
      VT.shape("M -14 40 L -14 10 L 14 10 L 14 40 Z", "#8E5527", { sw: 4 }) + VT.shape("M 22 8 L 44 8 L 44 26 L 22 26 Z", "#BFE0EC", { sw: 4 }));
  }
  function fobCross(s) {
    return VT.g("scale(" + s + ")", VT.shape("M -50 -50 L 50 -50 L 50 50 L -50 50 Z", "#FFFDF6", { sw: 5 }) +
      VT.shape("M -12 -36 L 12 -36 L 12 -12 L 36 -12 L 36 12 L 12 12 L 12 36 L -12 36 L -12 12 L -36 12 L -36 -12 L -12 -12 Z", "#3E9A5A", { sw: 4 }));
  }
  /** Chùm chìa khổng lồ: gốc tâm vòng, s. Chìa và móc treo toả xuống dưới. t: lóe từng móc. sag: chùm oằn sang (độ). */
  function keyring(x, y, s, t, swing, rot) {
    var out = "", sw = swing || 0;
    var keys = [[60, 0.62, "#E8C25A"], [78, 0.7, "#C8CCD0"], [96, 0.66, "#E8C25A"], [112, 0.58, "#B9C2C6"], [128, 0.64, "#D9B24A"]];
    keys.forEach(function (k, i) {
      var a = k[0] + sw * (0.6 + 0.1 * i);
      out += VT.g("rotate(" + f(a) + ") translate(80 0) scale(" + k[1] + ")", VT.bigKey({ x: 50, y: 0 }).replace(/#E8C25A/g, k[2]));
    });
    var fobs = [[70, fobBus], [104, fobShop], [138, fobCross]];
    fobs.forEach(function (fb, i) {
      var a = (fb[0] + sw) * Math.PI / 180, L = 230, ex = Math.cos(a) * L, ey = Math.sin(a) * L;
      var k = seg(t, FL[i], FL[i] + 0.35), lit = t >= FL[i];
      var sc = 1 + 0.45 * Math.sin(Math.PI * Math.min(1, k * 1.4)) * (k < 1 ? 1 : 0) + (lit ? 0.08 : 0);
      out += VT.line("M " + f(Math.cos(a) * 66) + " " + f(Math.sin(a) * 66) + " L " + f(ex) + " " + f(ey - 40), 5, "#8A8F94");
      if (k > 0 && k < 1) out += VT.radialLines(ex, ey + 10, 70, 110 + 30 * k, 10, 4 + i, 5, "#E8C25A");
      out += VT.g("translate(" + f(ex) + " " + f(ey + 10) + ")", (i === 0 ? fobBus : i === 1 ? fobShop : fobCross)(0.9 * sc));
    });
    out += VT.ell(0, 0, 70, 70, "none", 14) + VT.ell(0, 0, 70, 70, "none", 7).replace(/stroke="[^"]*"/, 'stroke="#C8CCD0"');
    return VT.g(VT.tr(x, y, s, rot || 0), out);
  }
  /** Chìa sắt nhỏ cũ + móc khoá núi lửa (có nhà nhỏ dưới chân): gốc vòng chìa, chìa thõng xuống. puffK: khói. */
  function smallKey(x, y, s, t, puffK) {
    var out = VT.ell(0, 0, 18, 18, "none", 7).replace(/stroke="[^"]*"/, 'stroke="#5F6366"') + VT.ell(0, 0, 18, 18, "none", 3, { ox: 0, oy: 0 });
    out += VT.shape("M -6 16 L 6 16 L 6 96 L -6 96 Z", "#6E7376", { sw: 4 }) + VT.shape("M 6 76 L 22 76 L 22 84 L 14 84 L 14 92 L 6 92 Z", "#6E7376", { sw: 3 });
    out += VT.dot(-2, 40, 2.5, "#A0522D") + VT.dot(2, 62, 2, "#A0522D");
    // móc núi lửa treo bên cạnh trên vòng
    var vol = VT.line("M 12 10 L 40 40", 4, "#8A8F94") + VT.g("translate(56 92)",
      VT.shape("M -54 34 L -16 -36 L -6 -28 L 4 -38 L 14 -30 L 54 34 Z", "#8E5A44", { sw: 5 }) + VT.line("M -12 -32 L -4 -14 L 6 -26 L 12 -10", 4, "#C8502F") +
      VT.shape("M -44 34 L -44 14 L -26 2 L -8 14 L -8 34 Z", "#FFFDF6", { sw: 4 }) + VT.shape("M -30 34 L -30 22 L -22 22 L -22 34 Z", "#8E5527", { sw: 3, ox: 0, oy: 0 }));
    out += vol;
    var st = Math.round(t * 12);
    out += VT.line("M 60 52 c " + f(-6 + 4 * Math.sin(st)) + " -14 " + f(8 + 4 * Math.cos(st)) + " -22 0 -36", 3, "#9AA2A8", 0.8);
    if (puffK > 0 && puffK < 1) out += VT.puffBurst({ x: 60, y: 48, k: puffK, s: 0.35, spread: 40 });
    return VT.g(VT.tr(x, y, s, 0), out);
  }
  function hand(wx, wy, s, rot) { return VT.handGeneric({ x: wx, y: wy, s: s || 1, sx: -1, rot: rot || 0, sleeve: "#6B8FA6" }); }

  /** Toàn bộ cảnh theo t; trả world. */
  function scene(t, lt) {
    var out = room(), o = { t: t, s: WS, x: WX, y: GROUND, flip: -1, ao: false, noPack: true, mouth: "smile", brows: "up", px: 10, py: 0 };
    var sitK = VT.ease.in2(seg(t, SIT0, SIT1));
    var sitting = t >= SIT0 && t < TAKE;
    // độ lún dần theo mỗi lần lóe
    var extra = 0; FL.forEach(function (tt) { extra += 0.04 * VT.ease.out(seg(t, tt, tt + 0.2)); });
    if (t >= BACK) extra = 0;
    var popK = seg(t, TAKE, POP1), hop = t >= TAKE ? Math.sin(Math.PI * popK) * 70 : 0;
    var front = "";
    if (t < GIVE) {
      // bàn tay mang chùm chìa vào
      var kin = VT.ease.out(seg(t, 0, 0.8)), wx = VT.lerp(2300, 1330, kin), wy = 520;
      out += keyring(wx - 50, wy + 64, RS, t, -8 * (1 - kin)) + hand(wx, wy);
      o.eyes = "wide"; o.mouth = t > 0.4 ? "smile" : "o";
      o.armL = VT.wobLocal(o, 1020, 700); o.handL = "xoe";
      out += B.wob(o);
      return out;
    }
    if (t < BACK) {
      if (t < SIT0 + 0.6) { var hk = VT.ease.in2(seg(t, GIVE + 0.1, GIVE + 0.6)); out += hand(VT.lerp(1330, 2300, hk), 520); }
      var dropY = sitting ? VT.lerp(0, 92 * WS, sitK) : 0;
      o.y = GROUND + dropY;
      if (sitting && sitK >= 1) { o.legs = "sit"; o.sq = 1.0 + extra + (t < SIT1 + 0.25 ? 0.12 * (1 - seg(t, SIT1, SIT1 + 0.25)) : 0); }
      else o.sq = 1 + 0.15 * sitK;
      o.eyes = t < SIT1 + 0.2 ? "wide" : "open"; o.mouth = t < SIT1 + 0.2 ? "o" : "flat"; o.brows = t < SIT1 + 0.2 ? "up" : "flat";
      if (t >= FL[0] - 0.1) { o.eyes = "wide"; o.brows = "up"; o.mouth = "oSmall"; var li = t >= FL[2] ? 2 : t >= FL[1] ? 1 : 0; o.px = [6, 12, 18][li]; o.py = [10, 12, 14][li]; }
      var gk = VT.ease.out(seg(t, GIVE, SIT0)), rx = VT.lerp(1280, RC[0], gk), ry = VT.lerp(584, RC[1] - 92 * WS, gk) + dropY, rr = RROT * sitK;
      o.armL = VT.wobLocal(o, rx - 66, ry + 10); o.handL = "nam"; o.armR = VT.wobLocal(o, o.x + 40, o.y - 40 * WS);
      out += B.wob(o) + keyring(rx, ry, RS, t, 0, rr);
      if (t >= SIT1 && t < SIT1 + 0.3) out += VT.puffBurst({ x: WX - 120, y: GROUND, k: seg(t, SIT1, SIT1 + 0.3), s: 0.5, spread: 90 }) + VT.puffBurst({ x: WX + 150, y: GROUND, k: seg(t, SIT1, SIT1 + 0.3), s: 0.45, spread: 80 });
      return out;
    }
    // trả lại → nhận chìa nhỏ → bật dậy
    o.y = GROUND + 92 * WS; o.legs = "sit";
    if (t < S_D) {
      var hb = VT.ease.out(seg(t, N1 + 0.1, BACK - 0.05)), sag = VT.ease.in2(seg(t, SAG, SAG + 0.2)), go = VT.ease.in2(seg(t, OUT - 0.2, OUT + 0.25));
      var hwx = VT.lerp(2300, 1380, hb) + 900 * go, hwy = 560 + 140 * sag + 260 * go;
      var pushK = VT.ease.out(seg(t, T_HANDING - 0.1, BACK));
      var rcx = t < SAG ? VT.lerp(RC[0], hwx - 50, pushK) : hwx - 50, rcy = t < SAG ? VT.lerp(RC[1], hwy + 64, pushK) : hwy + 64, rrot = t < SAG ? RROT * (1 - pushK) : 0;
      o.eyes = "open"; o.brows = "flat"; o.mouth = "flat"; o.px = 14; o.py = 4;
      if (t < SAG) { o.armL = VT.wobLocal(o, rcx - 66, rcy + 10); o.handL = "xoe"; o.lean = -10 * pushK; }
      else if (t > T_ASK - 0.4) { o.armL = VT.wobLocal(o, WX + 200, GROUND - 60); o.handL = "xoe"; o.brows = "up"; o.mouth = "smile"; }
      out += B.wob(o) + keyring(rcx, rcy, RS, t, sag * 10, rrot) + (hwx < 2400 ? hand(hwx, hwy, 1, sag * 14) : "");
      return out;
    }
    // shot D
    var hin = VT.ease.out(seg(t, S_D - 0.3, S_D + 0.35)), hgo = VT.ease.in2(seg(t, TAKE + 0.1, TAKE + 0.6));
    var hx = VT.lerp(1500, 1240, hin) + 800 * hgo, hy = 740;
    var kx = hx - 100, ky = hy + 20;
    if (t >= TAKE) { o.y = GROUND - hop; o.legs = popK < 1 ? "tuck" : "stand"; o.sq = popK < 1 ? 0.92 : 1 - 0.08 * Math.sin(Math.PI * seg(t, POP1, POP1 + 0.2)); }
    o.eyes = "open"; o.mouth = "smile"; o.brows = "up"; o.px = 16; o.py = -2;
    if (t < TAKE) {
      var reach = VT.ease.out(seg(t, S_D + 0.2, TAKE));
      o.armL = VT.wobLocal(o, VT.lerp(WX + 200, kx - 10, reach), VT.lerp(GROUND - 60, ky + 20, reach)); o.handL = "xoe";
    } else {
      // cầm chìa giơ lên, nhẹ tênh
      var held = [o.x + 130 * WS, o.y - 400 * WS], up = VT.ease.back(seg(t, TAKE, POP1 + 0.1));
      var pt = [VT.lerp(kx, held[0], up), VT.lerp(ky, held[1], up)];
      kx = pt[0] - 6; ky = pt[1] - 4;
      o.armL = VT.wobLocal(o, pt[0], pt[1] + 10); o.handL = "nam"; o.eyes = t < POP1 + 0.1 ? "wide" : "happy"; o.mouth = t < POP1 + 0.1 ? "o" : "smile";
      o.bob = t > POP1 + 0.6 ? -5 * Math.abs(Math.sin((t - POP1) * 4)) : 0;
      if (t >= PUFF - 0.05 && t < PUFF + 0.9) { o.eyes = "open"; o.px = 18; o.py = -14; o.brows = "up"; o.mouth = "oSmall"; }
    }
    var ksv = smallKey(kx, ky, VT.lerp(1.0, 1.35, seg(t, TAKE, POP1)), t, seg(t, PUFF, PUFF + 0.8));
    out += B.wob(o);
    out += ksv;
    if (hx < 2300) out += hand(hx, hy);
    if (t >= TAKE && t < TAKE + 0.25) out += VT.sparkle({ x: kx + 40, y: ky - 30, s: 0.6 });
    return out;
  }
  return [
    { a: 0, b: S_B, ten: "bàn tay trao chùm chìa khổng lồ, Wob bị kéo ngồi bệt", ve: function (t, lt, T) {
      return { cam: key(T, [[0, [980, 600, 1.0]], [S_B, [930, 640, 1.08], "sine"]]), shake: VT.shake(T, SIT1, 0.25, 9), world: scene(t, lt), over: B.dream(t), tint: "warm" };
    } },
    { a: S_B, b: S_C, ten: "cận chùm chìa: xe buýt, cửa hàng, chữ thập lóe lên", ve: function (t, lt, T) {
      return { cam: key(T, [[S_B, [1050, 830, 1.45]], [S_C, [1060, 820, 1.55], "sine"]]), shake: VT.shake(T, FL[2], 0.15, 3), world: scene(t, lt), over: B.dream(t), tint: "warm" };
    } },
    { a: S_C, b: S_D, ten: "đẩy trả chùm chìa, bàn tay oằn xuống", ve: function (t, lt, T) {
      return { cam: key(T, [[S_C, [1040, 700, 1.25]], [S_D, [1060, 700, 1.3], "sine"]]), shake: VT.shake(T, SAG, 0.2, 5), world: scene(t, lt), over: B.dream(t), tint: "warm" };
    } },
    { a: S_D, b: DUR, ten: "chìa sắt nhỏ móc núi lửa, lùi ra, Wob bật dậy nhẹ tênh", ve: function (t, lt, T) {
      var k = B.sm(seg(T, S_D + 0.1, S_D + 2.7));
      var c0 = [1190, 800, 2.3], c1 = [900, 640, 1.3];
      var cam = [VT.lerp(c0[0], c1[0], k), VT.lerp(c0[1], c1[1], k), VT.lerp(c0[2], c1[2], k)];
      return { cam: cam, world: scene(t, lt), over: B.dream(t), tint: "warm" };
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
