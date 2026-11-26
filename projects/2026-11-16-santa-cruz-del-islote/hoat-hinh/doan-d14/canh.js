/* d14 · vẽ tay · chèn (231,133–244,283 s; 13,15 s). Vào "chen", ra "cat". Hồi ức ban đêm, không khẩu hình.
 * 1) Hình to bên kia kênh (đảo đước): bầy muỗi chụm đầu dưới ánh nến quanh tờ thực đơn chỉ có hình vẽ món (không chữ; có hình quả địa cầu tròn nhỏ);
 *    một con chỉ về phía Wob; cả bầy lắc đầu, lật sang trang khác.
 * 2) Cận Wob ở mép đảo dưới trăng: vẫy tay lần một nhẹ, lần hai mạnh, lần ba giơ tấm bảng vẽ dĩa + nĩa, mũi tên chỉ vào cánh tay (không chữ). Không muỗi nào tới.
 * 3) "I took my hat off": Wob bỏ mũ cói đặt sang bên, chìa cái đầu tròn ra mời; chờ. Từ đây KHÔNG mũ (mũ đặt cạnh).
 * 4) Phản ứng từ 12,33 (hai khung trước "It"): Wob chớp mắt, đầu trọc bóng loáng dưới trăng, không một con muỗi; giữ ≥ 0,8 s.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var S2 = VT.nhip(1), S3 = VT.nhip(2), S4 = VT.nhip(3);
  var T_POINT = VT.tu("planning"), T_DIN = VT.tu("dinner."), T_WAVE = VT.tu("waved"), T_LITTLE = VT.tu("little,"), T_TASTY = VT.tu("tastier."), T_STILL = VT.tu("still");
  var T_TOOK = VT.tu("took"), T_OFF = VT.tu("off,"), T_CASE = VT.tu("case"), T_IT = VT.tu("it", 0);
  var SEA = 640, EDGE = 905, WX = 960, WS = 1.0;
  var NIGHT = "#24324A", SEAN = "#2F5560";
  VT.sfx("muoi", 0.2, 0.5);
  VT.sfx("lat-giay", T_DIN + 0.35, 0.4);
  VT.sfx("im-lang", T_STILL + 0.05, 0.5);
  VT.sfx("pop", T_OFF + 0.35, 0.3);

  function nightSky() { return '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + NIGHT + '"/>' + VT.ell(1480, 230, 80, 80, "#F6EFC8", 6, { ox: 0, oy: 0 }) + '<circle cx="1480" cy="230" r="150" fill="#F6EFC8" opacity="0.12"/>' +
    [[300, 150], [620, 260], [880, 120], [1150, 300], [1760, 140], [200, 380]].map(function (p, i) { return VT.dot(p[0], p[1], 3 + (i % 2) * 2, "#F6EFC8"); }).join(""); }
  // ---------- 1 · bầy muỗi và tờ thực đơn ----------
  var shots = [];
  shots.push({ a: 0, b: S2, ten: "bầy muỗi đọc thực đơn", ve: function (t, lt, T) {
    var out = nightSky() + VT.bien({ y: 860, t: t, col: SEAN, deep: "#1F3A44", n: 10 });
    out += '<g opacity="0.85">' + VT.duoc({ x: 330, y: 860, s: 1.6, seed: 5 }) + VT.duoc({ x: 1620, y: 860, s: 1.7, seed: 9 }) + "</g>";
    out += '<circle cx="960" cy="560" r="420" fill="#FFE6A0" opacity="0.38"/>' + '<circle cx="960" cy="560" r="260" fill="#FFE6A0" opacity="0.35"/>';
    out += VT.line("M 760 820 C 860 790 1060 790 1160 820", 12, M.root);
    out += VT.shape("M 944 800 L 944 740 L 976 740 L 976 800 Z", "#FFFDF6", { sw: 4 }) + VT.shape("M 960 700 C 948 720 950 736 960 738 C 970 736 972 720 960 700 Z", "#F6C46A", { sw: 3 });
    var turn = seg(t, T_DIN + 0.3, T_DIN + 0.65);
    out += VT.thucDon({ x: 960, y: 520, s: 1.05, turn: turn });
    var shake = t >= T_DIN - 0.05 && t < T_DIN + 0.35 ? 16 * Math.sin((t - T_DIN) * 30) : 0;
    [[700, 420, 1], [690, 640, 1], [1220, 420, -1], [1240, 640, -1], [960, 250, 1]].forEach(function (m, i) {
      var pt = i === 3 && t >= T_POINT && t < T_DIN - 0.05;
      out += VT.muoi({ x: m[0], y: m[1] + 6 * Math.sin(t * 5 + i), s: 1.25, t: t + i * 0.1, sx: pt ? 1 : m[2], point: pt, pose: "bay", rot: shake * (i % 2 ? 1 : -1), px: pt ? 3 : -2 * m[2], py: 2 });
    });
    var cam = key(T, [[0, [960, 520, 1.3]], [S2, [960, 530, 1.38], "sine"]]);
    return { cam: cam, world: out, tint: "cold" };
  } });
  // ---------- 2–4 · Wob ở mép đảo ----------
  function shore(t) {
    var out = nightSky() + VT.bien({ y: SEA, t: t, col: SEAN, deep: "#1F3A44", n: 12 });
    out += '<g opacity="0.7">' + VT.duoc({ x: 260, y: SEA, s: 0.55, seed: 3 }) + VT.duoc({ x: 520, y: SEA, s: 0.6, seed: 6 }) + VT.duoc({ x: 1600, y: SEA, s: 0.55, seed: 12 }) + "</g>";
    out += '<path d="M 1390 ' + (SEA + 30) + ' L 1570 ' + (SEA + 30) + ' L 1560 ' + (SEA + 300) + ' L 1400 ' + (SEA + 300) + ' Z" fill="#F6EFC8" opacity="0.12"/>';
    out += '<rect x="-1200" y="' + EDGE + '" width="4320" height="1600" fill="#8C93A0"/>' + VT.line("M -1200 " + EDGE + " L 3100 " + EDGE, 7);
    return out;
  }
  function W(o) {
    var b = { s: WS, x: WX, y: EDGE, sunhat: "coi", noPack: true, t: o.t };
    for (var k in o) b[k] = o[k];
    if (b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.8, 0.3));
    return VT.wob(b);
  }
  function plateSign(x, y, s, rot) {
    return VT.g(VT.tr(x, y, s, rot), VT.line("M 0 60 L 0 200", 12, M.root) + VT.shape(VT.rrect(-130, -110, 130, 70, 12), "#FFFDF6", { sw: 6 }) +
      VT.ell(-20, -20, 62, 62, "#F4F1EA", 5, { ox: 0, oy: 0 }) + VT.ell(-20, -20, 40, 40, "none", 3) +
      VT.line("M 70 -80 L 70 40 M 56 -80 L 56 -40 M 84 -80 L 84 -40 M 56 -40 C 56 -26 84 -26 84 -40", 6) +
      VT.line("M -110 50 L 110 50", 7, M.red) + VT.line("M 90 34 L 112 50 L 90 66", 7, M.red));
  }
  shots.push({ a: S2, b: S3, ten: "vẫy tay ba lần, bảng dĩa nĩa", ve: function (t, lt, T) {
    var out = shore(t), o = { t: t, mouth: "content", py: -4 };
    if (t < T_WAVE) { o.px = VT.pick(t, [[S2, -12], [S2 + 0.7, 12], [S2 + 1.4, 0]]); }
    else if (t < T_LITTLE) { o.armR = [300 + 20 * Math.sin((t - T_WAVE) * 14), 120]; o.handR = "xoe"; o.mouth = "smile"; o.px = 10; }
    else if (t < T_TASTY - 0.1) { o.armR = [330 + 70 * Math.sin((t - T_LITTLE) * 22), 40]; o.armL = [60 - 50 * Math.sin((t - T_LITTLE) * 22), 50]; o.handR = "xoe"; o.handL = "xoe"; o.mouth = "D"; o.eyes = "wide"; o.bob = -14 * Math.abs(Math.sin((t - T_LITTLE) * 11)); }
    else {
      o.armR = [400, 200]; o.handR = "tron"; o.armL = [30, 150]; o.handL = "nam"; o.mouth = t < T_STILL ? "smile" : "flat"; o.eyes = t < T_STILL ? "happy" : null; o.brows = t < T_STILL ? "up" : "flat"; o.px = 10;
      var hp = VT.wobPt({ s: WS, x: WX, y: EDGE }, 30, 150);
      out += plateSign(hp[0] - 120, hp[1] - 60, 0.95 * VT.ease.back(seg(t, T_TASTY - 0.1, T_TASTY + 0.15)), -8);
    }
    out += W(o);
    var cam = key(T, [[S2, [960, 620, 1.35]], [T_TASTY, [940, 610, 1.42], "sine"], [S3, [940, 610, 1.46], "sine"]]);
    return { cam: cam, world: out, tint: "cold" };
  } });
  var HAT = [WX + 270, EDGE];
  shots.push({ a: S3, b: S4, ten: "bỏ mũ đặt bên, chìa đầu mời", ve: function (t, lt, T) {
    var out = shore(t), lift = seg(t, T_TOOK - 0.05, T_OFF + 0.35), o = { t: t, mouth: "content", py: -4, px: 8 };
    var hatOn = t < T_TOOK + 0.05;
    if (!hatOn) {
      var k = VT.ease.io(seg(t, T_TOOK + 0.05, T_OFF + 0.35)), head = VT.wobPt({ s: WS, x: WX, y: EDGE }, 200, 92);
      var hx = VT.lerp(head[0], HAT[0], k), hy = VT.lerp(head[1], HAT[1] - 30, k) - 120 * Math.sin(Math.PI * k);
      if (k < 1) { o.armR = VT.wobLocal({ s: WS, x: WX, y: EDGE }, hx + 120, hy + 10); o.handR = "nam"; }
      o.sunhat = false;
      if (t >= T_CASE) { o.lean = VT.lerp(0, 14, VT.ease.io(seg(t, T_CASE, T_CASE + 0.4))); o.mouth = "smile"; o.brows = "up"; o.arms = "shrug"; }
      out += W(o) + VT.sunhat({ x: hx, y: hy, s: WS, mau: "coi", rot: 8 * k });
    } else { o.armR = [300, 60]; o.handR = "nam"; out += W(o); }
    var cam = key(T, [[S3, [980, 640, 1.4]], [S4, [990, 640, 1.5], "sine"]]);
    return { cam: cam, world: out, tint: "cold" };
  } });
  shots.push({ a: S4, b: DUR, ten: "đầu trọc dưới trăng, vẫn không muỗi", ve: function (t, lt, T) {
    var out = shore(t), o = { t: t, sunhat: false, lean: 14, mouth: "flat", brows: "flat", noBlink: true, eyes: null, px: 6, py: -2 };
    o.lid = Math.max(VT.slowBlink(t, T_IT + 0.05, 0.3), 0.15);
    out += W(o) + VT.sunhat({ x: HAT[0], y: HAT[1] - 30, s: WS, mau: "coi", rot: 8 });
    var top = VT.wobPt({ s: WS, x: WX, y: EDGE, lean: 14 }, 250, 76);
    out += VT.sparkle({ x: top[0], y: top[1], s: 0.55 + 0.15 * (Math.round(t * 12) % 2) }) + VT.line("M " + (top[0] - 70) + " " + (top[1] + 20) + " q 30 -30 70 -36", 8, "#ffffff", 0.7);
    var h = VT.wobPt({ s: WS, x: WX, y: EDGE, lean: 14 }, 200, 170);
    var cam = key(T, [[S4, [h[0] + 30, h[1] - 10, 2.2]], [DUR, [h[0] + 30, h[1] - 12, 2.3], "sine"]]);
    return { cam: cam, world: out, tint: "cold" };
  } });
  return shots;
};
