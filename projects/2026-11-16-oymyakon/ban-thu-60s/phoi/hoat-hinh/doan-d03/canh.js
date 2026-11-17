/* d03 · vẽ tay · chợ cá (27,0–42,2 s tuyệt đối; 15,2 s). Vào "chen", ra "cat".
 * Mốc gag bám từ trong lời (VT.tu), không tự đặt số. Đồ Wob: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng; cuối đoạn vác cá trên vai.
 * Chữ trên đồ vật: không có (chu_tren_do_vat rỗng).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, GROUND = 800, WS = 0.62;

  // ---- mốc từ lời ----
  var T_MARKET = VT.tu("market"), T_FROZEN = VT.tu("frozen"), T_SOLID = VT.tu("solid");
  var T_VILLAGE = VT.tu("village"), T_FREEZER = VT.tu("freezer");
  var T_ASKED = VT.tu("asked"), T_BAG1 = VT.tu("bag", 0), T_FISH2 = VT.tu("fish", 1), T_BAG2 = VT.tu("bag", 1);
  var T_NEEDED = VT.tu("needed"), T_NOTHING = VT.tu("nothing"), T_HAD = VT.tu("had"), T_PEACE = VT.tu("peace");

  // ---- Wob mặc đồ của đoạn ----
  function W(t, o) {
    var b = { t: t, s: WS, beanie: true, scarf: true, cold: true, lashes: 1, lashIce: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    var bl = b.noBlink ? 0 : VT.blink(t, 3.1, 0.9);
    b.lid = Math.max(b.lid || 0, bl);
    return VT.wob(b);
  }
  function market(t, o) {
    o = o || {};
    var s = VT.sky() + VT.ridge(560, 120 + (o.par || 0) * 0.3) + VT.farHouses(650, -200 + (o.par || 0) * 0.6, t) + VT.fog(t, 640, 2) + VT.snowGround(GROUND);
    s += VT.house({ x: 200, y: GROUND, w: 440, t: t, seed: 4, icicles: true });
    s += VT.stall({ x: 1450, y: GROUND });
    if (o.barrelX !== null) s += VT.barrel({ x: o.barrelX || 960, y: GROUND + 10, s: 0.9, knock: 1, kk: o.kk || 0 });
    s += VT.diamondDust(t, 14, [-200, 80, 2120, 760]);
    return s;
  }
  // bước chân: sfx + khói phụt ở mỗi lần chạm
  function stepFx(t, wk) {
    var out = "";
    wk.steps.forEach(function (st, i) { if (t >= st.t && t < st.t + 0.3) out += VT.puff({ x: st.x + (i % 2 ? 22 : -22), y: GROUND + 4, s: 0.3 + (t - st.t) * 0.9 }); });
    return out;
  }
  function stepSfx(wk, vol) { wk.steps.forEach(function (st) { if (st.t < D.thoi_luong) VT.sfx("buoc-tuyet", st.t, vol); }); }
  // ba lô theo đà khi đi
  function packAngle(t, W0, t0) {
    return VT.conLac(t, t0, function (s) {
      var k = VT.buoc(s, W0), p = k.phase * 2 * Math.PI;
      return [k.x, GROUND - 12 * WS * Math.pow(Math.sin(p), 2) * (k.walking ? 1 : 0)];
    }, { gx: 1 / 500, gy: 1 / 900 });
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }

  // ===== S0 · toàn cảnh chợ: Wob lạch bạch tới (khung đầu đã rõ cảnh: đoạn chèn) =====
  var A0 = 0, B0 = 2.25;
  var WK0 = { t0: 0, t1: 1.62, x0: 360, x1: 760, chuKy: 0.72, s: WS };
  stepSfx(VT.buoc(0, WK0), 0.45);
  shot(A0, B0, "toàn cảnh chợ, Wob đi tới", function (t, lt, T) {
    var wk = VT.buoc(t, WK0), o = { x: wk.x, y: GROUND, flip: 1, pack: packAngle(t, WK0, -0.5) };
    if (wk.walking) { o.legs = "walk"; o.phase = wk.phase; o.stride = wk.stride; o.mouth = "content"; o.px = 6; }
    else {
      o.sq = key(t, [[1.62, 0.9], [1.8, 1.05, "out"], [1.95, 1]]);
      o.px = 12; o.py = 2; o.brows = t > 1.8 ? "up" : null; o.mouth = t > 1.8 ? "oSmall" : "content"; o.lean = key(t, [[1.62, 0], [1.9, 5, "back"]]);
    }
    var out = market(t) + W(t, o) + stepFx(t, wk);
    if (t > 1.85) out += VT.bubble({ x: wk.x + 110, y: GROUND - 330, s: key(t, [[1.85, 0.12], [2.0, 0.34, "back"]]), sym: "fish", tail: -1 });
    return { cam: [960 + Math.sin(T * 0.7) * 6, 540, 1.0 + 0.02 * seg(T, 0, 2.25)], world: out, tint: "cold" };
  });

  // ===== S1 · cận thùng cá dựng đứng: gõ hai cái "frozen … solid", cá không nhúc nhích =====
  var A1 = B0, B1 = 4.55, K1 = T_FROZEN + 0.02, K2 = T_SOLID + 0.02;
  VT.sfx("bonk", K1, 0.75); VT.sfx("bonk", K2, 0.6);
  shot(A1, B1, "gõ cá trong thùng", function (t) {
    var o = { s: WS, x: 828, y: GROUND, flip: 1, px: 12, py: -8, brows: "skeptic", mouth: "flat" };
    var target = [940, 566], rest = VT.wobPt(o, 338, 300);
    // lấy đà (kéo tay về) → gõ → dội; hai lần
    var w = key(t, [[A1, 0], [K1 - 0.45, 0], [K1 - 0.18, -0.35, "out"], [K1, 1, "in"], [K1 + 0.12, 0.8, "out"], [K2 - 0.16, -0.25], [K2, 1, "in"], [K2 + 0.14, 0.75, "out"], [K2 + 0.5, 0]]);
    var hx = w >= 0 ? VT.lerp(rest[0], target[0], w) : rest[0] + w * 80, hy = w >= 0 ? VT.lerp(rest[1], target[1], w) : rest[1] - w * 40;
    o.armR = VT.wobLocal(o, hx, hy); o.handR = "nam";
    if (w > 0.4) o.legs = "tiptoe";
    var hit1 = t >= K1 && t < K1 + 0.35, hit2 = t >= K2 && t < K2 + 0.35;
    if (hit1 || hit2) { var kk = hit1 ? seg(t, K1, K1 + 0.35) : seg(t, K2, K2 + 0.35); o.sq = 1 - 0.06 * (1 - kk); o.eyes = kk < 0.4 ? "squint" : "open"; }
    if (t >= K2 + 0.35) { o.px = 0; o.py = 3; o.lid = 0.48; o.brows = "flat"; o.noBlink = true; o.armR = null; o.arms = "rest"; }
    var kkB = t >= K2 ? seg(t, K2, K2 + 0.3) : t >= K1 ? seg(t, K1, K1 + 0.3) : 1;
    var out = market(t, { kk: kkB < 1 ? 1 - kkB : 0 }) + W(t, o);
    if (hit1) out += VT.knockLines({ x: target[0] + 8, y: target[1], s: 0.8, k: seg(t, K1, K1 + 0.35) });
    if (hit2) out += VT.knockLines({ x: target[0] + 8, y: target[1], s: 0.8, k: seg(t, K2, K2 + 0.35) });
    if (t >= K1 && t < K2 + 0.35) { // tay ê ẩm: vạch đau nhỏ
      var hp = VT.wobPt(o, o.armR ? o.armR[0] : 338, o.armR ? o.armR[1] : 300);
      if ((t > K1 + 0.1 && t < K1 + 0.3) || (t > K2 + 0.1 && t < K2 + 0.35)) out += VT.line("M " + VT.f(hp[0] - 14) + " " + VT.f(hp[1] - 26) + " l -10 -14 M " + VT.f(hp[0] + 2) + " " + VT.f(hp[1] - 30) + " l 0 -16", 5);
    }
    var sh = VT.shakes(t, [[K1, 0.18, 6], [K2, 0.18, 5]]);
    return { cam: [910, 590, 2.05], shake: sh, world: out, tint: "cold" };
  });

  // ===== S2 · lùi máy: cả làng nằm trong một tủ đông khổng lồ; cửa đóng sập ở "freezer" =====
  var A2 = B1, B2 = 6.72, SLAM = T_FREEZER;
  VT.sfx("drop", SLAM, 0.9); VT.sfx("bonk", SLAM + 0.03, 0.5);
  shot(A2, B2, "cả làng là tủ đông", function (t, lt, T) {
    var close = t < SLAM - 0.24 ? 0 : key(t, [[SLAM - 0.24, 0], [SLAM, 1, "in"]]);
    var z = key(T, [[A2, 2.7], [T_VILLAGE + 0.45, 1.0, "io3"]]), cx = key(T, [[A2, 930], [T_VILLAGE + 0.45, 960, "io3"]]), cy = key(T, [[A2, 790], [T_VILLAGE + 0.45, 545, "io3"]]);
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#cfe0e8"/>';
    var tiny = VT.wob({ t: t, x: 920, y: 868, s: 0.1, beanie: true, scarf: true, cold: true, lashes: 1, lashIce: true, px: 6, py: -10, brows: "up", mouth: t > SLAM - 0.5 ? "o" : "X" });
    var stallTiny = VT.stall({ x: 1150, y: 868, s: 0.16, icicles: false });
    s += VT.freezer({ part: "body", t: t, contents: (function () {
      var c = "";
      [[430, 0.3], [600, 0.26], [780, 0.32], [1320, 0.26], [1480, 0.29]].forEach(function (h, i) { c += VT.house({ x: h[0], y: 860, s: h[1], smokeTop: -1900, t: t, seed: i, faint: true }); });
      return c + stallTiny + tiny + VT.diamondDust(t, 14, [380, 240, 1540, 800]);
    })() });
    s += VT.freezer({ part: "door", close: close });
    if (t >= SLAM && t < SLAM + 0.7) {
      var k = seg(t, SLAM, SLAM + 0.7);
      [[230, 300], [230, 700], [1690, 200], [1690, 900], [600, 1000], [1300, 1000], [900, 90]].forEach(function (p, i) {
        s += VT.puff({ x: p[0] + (p[0] < 400 ? -1 : p[0] > 1600 ? 1 : 0) * k * 120, y: p[1] + (p[1] > 950 ? 1 : p[1] < 100 ? -1 : 0) * k * 80, s: 1.0 + k * 2.2 + VT.hash(i) * 0.4, op: 0.95 - k * 0.5 });
      });
    }
    return { cam: [cx, cy, z], shake: VT.shake(t, SLAM, 0.45, 22), world: s, tint: "cold" };
  });

  // ===== S3–S4 · quầy chợ: chìa túi, bàn tay đeo găng đưa cá, cá xuyên đáy túi, vác cá lên vai, nhún vai =====
  var WX = 880, SF = 0.6, SHOULDER = [250, 62, -16]; // cá vác trên vai phải (hệ Wob: x, y, góc)
  var BAG_HAND = [400, 140];                    // tay phải giơ túi (hệ Wob)
  var BAGTOP = VT.wobPt({ x: WX, y: GROUND, s: WS }, BAG_HAND[0], BAG_HAND[1]); // miệng túi khi giơ hẳn (khung)
  var T_RELEASE = T_BAG2 - 0.15, T_THROUGH = T_BAG2 + 0.02, T_STUCK = T_THROUGH + 0.12;
  var T_GRAB = T_STUCK + 0.42, T_LIFT = T_GRAB + 0.2, T_ON = T_LIFT + 0.26;
  VT.sfx("liu-lo-hoi", T_ASKED, 0.6);
  VT.sfx("pop", T_THROUGH, 0.75); VT.sfx("bonk", T_STUCK, 0.4);
  VT.sfx("whoosh", T_LIFT, 0.25); VT.sfx("bonk", T_ON, 0.35);
  function fishPose(t, o, bagTop) {
    // trả [cx, cy, rot] của cá trong khung
    var hang = [bagTop[0], bagTop[1] - 102 + 46];        // cá dựng đứng, mũi chúi vào miệng túi
    if (t < T_ASKED + 0.55) return null;
    if (t < 7.9) { var k = VT.ease.out(seg(t, T_ASKED + 0.55, 7.9)); return [VT.lerp(2150, 1190, k), 520, 180]; }
    if (t < 8.3) { var k2 = VT.ease.io(seg(t, 7.9, 8.3)); return [VT.lerp(1190, hang[0], k2), VT.lerp(520, hang[1], k2), VT.lerp(180, 90, k2)]; }
    if (t < T_RELEASE) return [hang[0], VT.lerp(hang[1], hang[1] + 34, VT.ease.io(seg(t, 8.3, T_RELEASE))), 90];
    var stuckY = GROUND + 22 - 102;
    if (t < T_STUCK) { var k3 = VT.ease.in2(seg(t, T_RELEASE, T_STUCK)); return [hang[0], VT.lerp(hang[1] + 34, stuckY, k3), 90]; }
    if (t < T_LIFT) { var w = seg(t, T_GRAB, T_LIFT); return [hang[0], stuckY - 18 * w, 90]; }
    var sp = VT.wobPt(o, SHOULDER[0], SHOULDER[1]), rotOn = SHOULDER[2] + (o.lean || 0);
    if (t < T_ON) { // vung qua đầu lên vai theo cung
      var k4 = VT.ease.io(seg(t, T_LIFT, T_ON)), mid = [(hang[0] + sp[0]) / 2 + 40, Math.min(stuckY, sp[1]) - 150];
      var q = 1 - k4;
      return [q * q * hang[0] + 2 * q * k4 * mid[0] + k4 * k4 * sp[0], q * q * (stuckY - 18) + 2 * q * k4 * mid[1] + k4 * k4 * sp[1], VT.lerp(90, rotOn - 360, k4) + 360 * (k4 > 0.999 ? 1 : 0)];
    }
    return [sp[0], sp[1], rotOn];
  }
  function stallScene(t) {
    var out = market(t, { barrelX: 560 });
    var o = { s: WS, x: WX, y: GROUND, flip: 1, mouth: "X" };
    // tay phải giơ túi từ lúc hỏi tới khi buông túi
    var raise = key(t, [[6.72, 0], [T_ASKED, 1, "back"]]);
    var holdBag = t < T_STUCK + 0.08;
    if (holdBag) { o.armR = [VT.lerp(338, BAG_HAND[0], raise), VT.lerp(300, BAG_HAND[1], raise)]; o.handR = "nam"; }
    // biểu cảm
    if (t < T_ASKED + 0.6) { o.eyes = "happy"; o.mouth = "smile"; }
    else if (t < 8.3) { o.px = 12; o.py = -6; o.brows = "up"; o.mouth = "content"; }
    else if (t < T_RELEASE) { o.px = 10; o.py = 8; o.brows = "up"; o.mouth = "oSmall"; }
    else if (t < T_GRAB - 0.05) { o.eyes = t < T_STUCK + 0.1 ? "wide" : "open"; o.px = t < T_STUCK + 0.1 ? 4 : 0; o.py = t < T_STUCK + 0.1 ? 12 : 3; o.lid = t < T_STUCK + 0.1 ? 0 : 0.5; o.brows = t < T_STUCK + 0.1 ? "up" : "flat"; o.mouth = t < T_STUCK + 0.1 ? "o" : "flat"; o.noBlink = true; o.sq = t >= T_STUCK && t < T_STUCK + 0.2 ? 1.06 : 1; }
    else if (t < T_ON + 0.1) { o.px = 10; o.py = 10; o.brows = "down"; o.mouth = "flat"; }
    else if (t < T_NEEDED - 0.05) { o.px = 12; o.py = -12; o.brows = "skeptic"; o.mouth = "flat"; }
    else if (t < T_NOTHING + 0.55) { o.px = 12; o.py = -12; o.brows = "up"; o.mouth = "flat"; }
    else { o.px = 0; o.py = 3; o.lid = 0.48; o.brows = "flat"; o.mouth = "flat"; o.noBlink = true; }
    // nhặt cá, vác lên vai: nhún xuống lấy đà, giãn lên khi vung, nén khi cá đặt lên vai
    if (t >= T_GRAB - 0.2 && t < T_ON + 0.3) {
      o.sq = key(t, [[T_GRAB - 0.2, 1], [T_GRAB, 0.86, "out"], [T_LIFT, 0.9], [T_LIFT + 0.12, 1.12, "out"], [T_ON, 1.0], [T_ON + 0.06, 0.9, "in"], [T_ON + 0.3, 1, "back"]]);
      o.lean = key(t, [[T_GRAB - 0.2, 0], [T_GRAB, 10, "out"], [T_LIFT + 0.1, -6], [T_ON + 0.3, 0, "back"]]);
      if (t >= T_LIFT + 0.08 && t < T_LIFT + 0.17) o.smear = 60;
    }
    var bagTopW = holdBag ? VT.wobPt(o, o.armR[0], o.armR[1]) : BAGTOP;
    var fp = fishPose(t, o, BAGTOP);
    // tay phải theo cá khi nhặt/vác
    if (t >= T_GRAB && fp) { var L = VT.wobLocal(o, fp[0], fp[1]); o.armR = t >= T_ON ? [300, 92] : L; o.handR = "nam"; }
    if (t >= T_NEEDED - 0.05 && t < T_NOTHING + 0.55) { o.armL = [26, 168]; o.handL = "xoe"; o.bob = -8 * VT.ease.out(seg(t, T_NEEDED - 0.05, T_NEEDED + 0.12)); }
    var fishEye = t >= T_STUCK && t < T_STUCK + 0.4 ? "wide" : "open";
    var fishSvg = fp ? VT.fish({ x: fp[0], y: fp[1], s: SF, rot: fp[2], eye: fishEye }) : "";
    var carry = t >= T_GRAB;
    // túi: trong tay → rách ở đáy khi cá xuyên → buông, tuột xuống chân cá
    var bagSvg = "";
    var torn = t >= T_THROUGH, bagY;
    if (holdBag) bagY = bagTopW[1] + 104;
    else bagY = key(t, [[T_STUCK + 0.08, bagTopW[1] + 104], [T_STUCK + 0.3, GROUND + 18, "in2"]]);
    var bagX = holdBag ? bagTopW[0] : BAGTOP[0];
    if (t < T_GRAB) bagSvg = VT.bag({ x: bagX, y: bagY, s: 0.7, torn: torn, tear: torn ? seg(t, T_THROUGH, T_THROUGH + 0.1) : 0 });
    else bagSvg = VT.bag({ x: BAGTOP[0] + 30, y: GROUND + 16, s: 0.7, torn: true, rot: -70 });
    // bàn tay đeo găng (người bán, không mặt): đưa cá, thả, rút về
    var gl = "";
    if (fp && t < T_RELEASE + 0.5) {
      var r = fp[2] * Math.PI / 180, tail = [fp[0] - Math.cos(r) * 120 * SF, fp[1] - Math.sin(r) * 120 * SF];
      var gRot = t < 7.9 ? -8 : VT.lerp(-8, -48, VT.ease.io(seg(t, 7.9, 8.3)));
      var open = seg(t, T_RELEASE - 0.06, T_RELEASE + 0.06);
      var away = t > T_RELEASE ? VT.ease.in2(seg(t, T_RELEASE + 0.06, T_RELEASE + 0.5)) : 0;
      var gp = t > T_RELEASE ? [VT.lerp(tail[0], 2300, away), VT.lerp(fishPose(T_RELEASE - 0.001, o, BAGTOP)[1] - 120 * SF, -300, away)] : tail;
      gl = VT.glove({ x: gp[0], y: gp[1], s: 0.62, rot: gRot, open: open });
    }
    var bub = "";
    if (t >= T_ASKED && t < 7.75) { var bp = VT.wobPt(o, 40, 10); bub = VT.bubble({ x: bp[0] - 40, y: bp[1] - 60, s: key(t, [[T_ASKED, 0.12], [T_ASKED + 0.15, 0.4, "back"]]), sym: "bag", tail: 1 }); }
    var wobSvg;
    if (carry && fp) {
      var Lc = VT.wobLocal(o, fp[0], fp[1]);
      var fishC = VT.fish({ x: Lc[0], y: Lc[1], s: SF / WS / (1 / Math.sqrt(o.sq || 1)), rot: fp[2] - (o.lean || 0), eye: t >= T_HAD ? "serene" : "open" });
      if (t >= T_ON) o.propBack = fishC; else o.prop = fishC; // trên vai: cá nằm sau đầu như tấm ván
      wobSvg = W(t, o);
      fishSvg = "";
    } else wobSvg = W(t, o);
    out += wobSvg + (t < T_RELEASE ? bagSvg + fishSvg : fishSvg + bagSvg) + gl + bub;
    if (t >= T_THROUGH && t < T_THROUGH + 0.25) out += VT.impact({ x: bagX, y: bagTopW[1] + 104, s: 0.45 });
    if (t >= T_STUCK && t < T_STUCK + 0.3) out += VT.puffBurst({ x: bagX, y: GROUND + 14, k: seg(t, T_STUCK, T_STUCK + 0.3), s: 0.5 });
    if (t >= T_LIFT && t < T_ON + 0.05 && fp) out += VT.arc([[1004, GROUND - 120], [1080, GROUND - 330], VT.wobPt(o, SHOULDER[0], SHOULDER[1])], 5, 0.6);
    if (t >= T_ON && t < T_ON + 0.25) out += VT.knockLines({ x: VT.wobPt(o, 250, 40)[0], y: VT.wobPt(o, 250, 40)[1], s: 0.6, k: seg(t, T_ON, T_ON + 0.25) });
    return { out: out, o: o };
  }
  var A3 = B2, B3 = T_FISH2 + 0.62, B4 = T_HAD - 0.04;
  shot(A3, B3, "chìa túi, găng tay đưa cá", function (t, lt, T) {
    var r = stallScene(t);
    return { cam: [key(T, [[A3, 1140], [B3, 1110]]), 560, key(T, [[A3, 1.5], [B3, 1.58]])], world: r.out, tint: "cold" };
  });
  shot(B3, B4, "cá xuyên túi, vác cá, nhún vai", function (t, lt, T) {
    var r = stallScene(t);
    return { cam: [1000, 590, 1.72], shake: VT.shakes(t, [[T_STUCK, 0.2, 7], [T_ON, 0.15, 4]]), world: r.out, tint: "cold" };
  });

  // ===== S5 · cận mặt con cá trên vai: mắt lim dim thanh thản, băng lấp lánh, GIỮ HÌNH =====
  var A5 = B4, B5 = 13.9;
  VT.sfx("ting", T_PEACE, 0.5);
  shot(A5, B5, "cá thanh thản", function (t, lt, T) {
    var o = { s: WS, x: WX, y: GROUND, flip: 1, armR: [300, 92], handR: "nam", px: 12, py: -12, lid: 0.4, brows: "flat", mouth: "flat", noBlink: true };
    o.propBack = VT.fish({ x: SHOULDER[0], y: SHOULDER[1], s: SF / WS, rot: SHOULDER[2], eye: "serene" });
    var out = market(t, { barrelX: 560 }) + W(t, o);
    var fs = SF / WS, ra = SHOULDER[2] * Math.PI / 180, ex = 112 * fs, ey = -14 * fs;
    var head = VT.wobPt(o, SHOULDER[0] + ex * Math.cos(ra) - ey * Math.sin(ra), SHOULDER[1] + ex * Math.sin(ra) + ey * Math.cos(ra));
    var over = VT.radialLines(960, 520, key(T, [[A5, 760], [A5 + 0.4, 560, "out"]]), 1300, 28, 3, 9, "#ffffff");
    if (t >= T_PEACE) { var kk = Math.floor(t * 6) % 3; [[1420, 300], [520, 280], [1500, 780], [640, 820]].forEach(function (p, j) { over += VT.sparkle({ x: p[0], y: p[1], s: (j + kk) % 3 === 0 ? 1.15 : 0.7 }); }); }
    var z = key(T, [[A5, 2.7], [B5, 2.95, "sine"]]);
    return { cam: [head[0] - 70, head[1] + 30, z], world: out, over: over, tint: "cold" };
  });

  // ===== S6 · Wob vác cá đi tiếp (chu kỳ bước thật) → cắt sang đoạn sau (cat) =====
  var A6 = B5, B6 = D.thoi_luong;
  var WK6 = { t0: A6 + 0.05, t1: B6 + 0.6, x0: WX, x1: WX + 330, chuKy: 0.76, s: WS };
  stepSfx(VT.buoc(A6, WK6), 0.42);
  shot(A6, B6, "vác cá đi tiếp", function (t, lt, T) {
    var wk = VT.buoc(t, WK6);
    var o = { s: WS, x: wk.x, y: GROUND, flip: 1, legs: "walk", phase: wk.phase, stride: wk.stride, armR: [300, 92], handR: "nam", lid: 0.4, px: 4, py: 2, brows: "flat", mouth: "flat", pack: packAngle(t, WK6, A6 - 0.3) };
    o.propBack = VT.fish({ x: SHOULDER[0], y: SHOULDER[1], s: SF / WS, rot: SHOULDER[2] - 4 * Math.sin(wk.phase * 2 * Math.PI), eye: "serene" });
    var out = market(t, { barrelX: 560 }) + W(t, o) + stepFx(t, wk);
    var camX = 1000 + (VT.buoc(T, WK6).x - WX) * 0.7;
    return { cam: [camX, 600, 1.38], world: out, tint: "cold" };
  });
  return shots;
};
