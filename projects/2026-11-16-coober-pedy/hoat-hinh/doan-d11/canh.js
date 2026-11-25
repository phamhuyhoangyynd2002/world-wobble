/* d11 · vẽ tay · mảnh ghép số 1, mặt trời phình, Wob chảy, cái mũ bỏ việc (135,544–152,887 s; 17,343 s). Vào "cat", ra "cat".
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ. Cuối đoạn mũ tuột khỏi đầu, bò vào bóng đống đất nằm nghỉ (khớp d12: Wob không mũ).
 * Không chữ (mảnh ghép chỉ có một vạch đếm, không chữ số).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, G = 920;
  var T_ONE = VT.tu("one", 0), T_OPAL = VT.tu("opal", 0), T_IT = VT.tu("it", 0), T_LUNCH = VT.tu("lunchtime", 0);
  var T_NOON = VT.tu("by", 0), T_MELT = VT.tu("melting", 0), T_RES = VT.tu("resigned", 0);
  var S1 = T_IT - 0.15, S2 = T_LUNCH + 1.0, S3 = T_NOON - 0.1;
  var MD = { x: 1500, y: G, w: 520, h: 260, seed: 5 }, HAT_REST = [1400, G - 12];
  VT.sfx("whoosh", 0.75, 0.35);
  VT.sfx("pop", T_ONE - 0.03, 0.6);
  VT.sfx("rise", T_LUNCH - 0.9, 0.4);
  VT.sfx("hoi-nuoc", S2 + 0.3, 0.5);
  VT.sfx("nuot", S2 + 1.4, 0.7);
  VT.sfx("de-kem", T_MELT, 0.45);
  VT.sfx("pop", T_RES - 0.03, 0.5);

  function W(o) { var b = { s: 0.9, sunhat: true, packColor: "oliu" }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.8, 0.6)); return VT.wob(b); }
  function sunR(t) { return key(t, [[S1, 90], [T_LUNCH - 0.1, 150], [T_LUNCH + 0.1, 420, "out"], [S2, 440], [S3, 560, "sine"], [DUR, 600]]); }
  function desert(t, hot) {
    var sky = hot ? '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FFF8E8" opacity="' + VT.f(0.5 + 0.4 * hot) + '"/>' : VT.sky("#F7EED8", 0.9);
    return sky + VT.sunBig({ x: 960, y: 60, r: sunR(t), t: t }) + VT.mound({ x: 300, y: G, w: 600, h: 220, seed: 2 }) + VT.desertGround(G) + VT.mound(MD) +
      '<path d="M ' + (MD.x - 260) + ' ' + G + ' C ' + (MD.x - 320) + ' ' + (G + 30) + ' ' + (MD.x - 120) + ' ' + (G + 44) + ' ' + MD.x + ' ' + (G + 30) + ' L ' + (MD.x - 60) + ' ' + G + ' Z" fill="#9C8A7A" opacity="0.45"/>';
  }

  var shots = [];
  // 1. sợi dây kéo người que vào giữa trang; mảnh ghép một vạch rơi vào chỗ
  shots.push({ a: 0, b: S1, ten: "sơ đồ: dây kéo người, mảnh ghép 1", ve: function (t, lt, T) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FBF6EA" opacity="0.7"/>';
    var pull = VT.ease.io(seg(t, 0.2, T_OPAL + 0.4)), people = [];
    for (var i = 0; i < 5; i++) {
      var side = i % 2 ? 1 : -1, x0 = 960 + side * (900 + 90 * i), x1 = 960 + side * (120 + 90 * Math.floor(i / 2)) - (i === 0 ? 0 : 0);
      var x = VT.lerp(x0, x1, pull);
      people.push([x, side]);
      out += VT.stickPerson({ x: x, y: 840, s: 0.95, phase: t * 1.6 + i * 0.3, hat: i % 2 === 0 });
    }
    // dây vẽ tay nối các người que về tâm
    people.forEach(function (p) { out += VT.line("M 960 640 Q " + VT.f((960 + p[0]) / 2) + " 560 " + VT.f(p[0]) + " " + 700, 5, "#8E5527"); });
    out += VT.opal({ x: 960, y: 620, r: 30, t: t, glow: 0.8 });
    // khung lỗ ghép + mảnh rơi vào
    out += VT.shape("M 860 160 L 1060 160 L 1060 360 L 860 360 Z", "none", { sw: 5, sop: 0.4 });
    var py = key(t, [[T_ONE - 0.45, -300], [T_ONE, 260, "in2"]]);
    out += VT.puzzle({ x: 960, y: Math.min(py, 260), s: 1, mark: 1, rot: key(t, [[T_ONE - 0.45, -30], [T_ONE, 0]]) });
    if (t >= T_ONE && t < T_ONE + 0.3) out += VT.radialLines(960, 260, 130, 190, 12, 2, 6);
    return { cam: key(T, [[0, [960, 540, 1]], [S1, [960, 520, 1.06], "sine"]]), shake: VT.shake(t, T_ONE, 0.23, 5), world: out, tint: "warm" };
  } });
  // 2. Wob giữa sa mạc, mặt trời phình tới nửa trời đúng "lunchtime"
  shots.push({ a: S1, b: S2, ten: "mặt trời phình", ve: function (t, lt, T) {
    var big = t >= T_LUNCH;
    var wo = { t: t, x: 760, y: G, mouth: big ? "o" : "content", eyes: big ? "wide" : null, brows: big ? "up" : null, py: big ? -16 : 0, px: big ? 4 : 0 };
    var out = desert(t, seg(t, T_LUNCH, S2)) + W(wo);
    return { cam: key(T, [[S1, [900, 640, 1.2]], [T_LUNCH - 0.1, [920, 600, 1.15], "sine"], [T_LUNCH + 0.15, [960, 460, 0.95], "out"], [S2, [960, 470, 0.97]]]), world: out, tint: "warm" };
  } });
  // 3. nghỉ không lời: mặt trời to thêm, mũ bốc khói, Wob nhìn lên, nuốt khan
  shots.push({ a: S2, b: S3, ten: "mũ bốc khói, nuốt khan", ve: function (t, lt, T) {
    var gulp = seg(t, S2 + 1.3, S2 + 1.7);
    var wo = { t: t, x: 760, y: G, sunhat: { smoke: seg(t, S2, S2 + 0.6) }, eyes: "open", py: -18, px: 6, brows: "worried", mouth: gulp > 0 && gulp < 1 ? "oSmall" : "wobbly", marks: "sweat",
      sq: 1 - 0.04 * Math.sin(gulp * Math.PI) };
    var out = desert(t, 1) + W(wo);
    var c = VT.wobPt(wo, 200, 120);
    return { cam: key(T, [[S2, [c[0], c[1] - 40, 1.9]], [S3, [c[0], c[1] - 60, 2.05], "sine"]]), world: out, tint: "warm" };
  } });
  // 4. Wob chảy như kem; "resigned": mũ tuột, bò vào bóng đống đất nằm nghỉ
  shots.push({ a: S3, b: DUR, ten: "Wob chảy, mũ bỏ việc", ve: function (t, lt, T) {
    var m = seg(t, S3 + 0.2, T_RES), sq = 1 - 0.3 * VT.ease.io(m);
    var hatOff = t >= T_RES - 0.05;
    var wo = { t: t, x: 760, y: G, sq: sq, sxRaw: 1 + 0.35 * VT.ease.io(m), lid: 0.55, noBlink: true, brows: "worried", mouth: "wobbly", marks: "sweat", legs: m > 0.5 ? "apart" : "stand",
      sunhat: hatOff ? false : { smoke: 1, dy: 40 * m } };
    var out = desert(t, 1);
    // vũng "kem" Wob dưới chân
    out += VT.ell(760, G + 6, 140 + 120 * m, 18 + 14 * m, "#5a9fb8", 5, { op: 0.9 });
    out += W(wo);
    for (var i = 0; i < 3; i++) { var dy = ((t * 1.3 + i * 0.33) % 1); out += VT.drop({ x: 680 + i * 80, y: G - 230 * sq + dy * 200, s: 0.7, fill: "#5a9fb8" }); }
    if (hatOff) {
      var k = seg(t, T_RES, DUR - 0.25), top = VT.wobPt(wo, 200, 70 + 40 * m);
      var hx, hy, rot = 0, legs = false;
      if (k < 0.2) { var a = k / 0.2; hx = VT.lerp(top[0], top[0] + 120, a); hy = VT.lerp(top[1], G - 14, VT.ease.in2(a)) - 60 * Math.sin(Math.PI * a); rot = 30 * a; }
      else { var b = (k - 0.2) / 0.8; hx = VT.lerp(top[0] + 120, HAT_REST[0], VT.ease.io(b)); hy = G - 30; legs = b < 1 ? t * 5 : false; rot = 0; }
      if (k >= 1) { hx = HAT_REST[0]; hy = G - 16; }
      out += VT.sunhat({ x: hx, y: hy, s: 0.9, rot: rot, legs: legs, eyes: k > 0.2, t: t });
      if (k >= 1) out += VT.puff({ x: hx + 120, y: hy - 70, s: 0.3, op: 0.6 }) ;
    }
    return { cam: key(T, [[S3, [900, 640, 1.25]], [T_RES - 0.2, [880, 660, 1.3], "sine"], [T_RES + 0.3, [1020, 680, 1.25], "io"], [DUR, [1040, 690, 1.27], "sine"]]), world: out, tint: "warm" };
  } });
  return shots;
};
