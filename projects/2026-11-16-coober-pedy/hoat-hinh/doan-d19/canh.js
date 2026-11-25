/* d19 · vẽ tay · Wob nằm trên giường cạo trần đá bằng thìa cà phê (235,272–244,922 s; 9,65 s). Vào "cat", ra "cat".
 * Cạo mãi mới rơi một hạt bụi; Wob nhìn hạt bụi rồi nhìn người xem, giữ 0,7 s.
 * Đồ Wob: không mũ (mũ treo đầu giường); cầm thìa cà phê. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong;
  var T_STARE = VT.tu("stared", 0), T_WHO = VT.tu("who", 0), T_BED = VT.tu("bedroom", 0), T_SOME = VT.tu("someone", 0), T_LIV = VT.tu("living", 0);
  var S1 = T_WHO - 0.3, S2 = T_SOME - 0.1, T_DUST = T_BED + 0.05;
  var WS = 0.9, CX = 780, CY = 690, CEIL = 470;
  for (var tt = 1.2; tt < T_DUST; tt += 0.5) VT.sfx("xuoc-dia", tt, 0.22);
  VT.sfx("ting", T_DUST + 0.5, 0.35);
  VT.sfx("im-lang", T_LIV + 0.3, 0.3);

  function scraping(t) { return t > 1.0 && t < T_DUST + 0.2; }
  function wobLying(t, o) { // Wob nằm ngửa, đầu bên trái; o theo hệ Wob đứng (nhìn "phải" = nhìn lên trần)
    var b = { s: WS, x: 0, y: 214 * WS, packColor: "oliu", noPack: true, t: t };
    for (var k in o) b[k] = o[k];
    if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(t, 3.1, 0.4));
    return VT.g("translate(" + CX + " " + CY + ") rotate(-90)", VT.wob(b));
  }
  function toWorld(o, lx, ly) { var p = VT.wobPt(Object.assign({ s: WS, x: 0, y: 214 * WS }, o), lx, ly); return [CX + p[1], CY - p[0]]; }
  function spoon(x, y, rot) { // gốc ở cán, lòng thìa ở cuối hướng +y
    return VT.g(VT.tr(x, y, 1, rot), VT.line("M 0 0 L 0 70", 7, "#9AA7AE") + VT.ell(0, 86, 13, 20, "#C9D2D6", 5));
  }
  function room(t) {
    var out = VT.shape("M -1200 -1200 L 3100 -1200 L 3100 2400 L -1200 2400 Z", "#E2C49A", { sw: 0, ox: 0, oy: 0 });
    var pts = [[-1200, -400], [3100, -400], [3100, CEIL - 10]];
    for (var i = 0; i <= 24; i++) pts.push([3100 - i * 180, CEIL + 18 * Math.sin(i * 1.7) + 10 * VT.hash(i)]);
    out += VT.shape(VT.smooth(pts, true), "#C99B6E", { sw: 7 });
    for (var j = 0; j < 14; j++) out += VT.line("M " + (j * 160 - 200) + " " + (CEIL - 60 - 40 * VT.hash(j)) + " q 30 -10 60 0", 4, "#9C7650", 0.6);
    out += VT.shape("M -1200 980 L 3100 980 L 3100 2400 L -1200 2400 Z", "#B98A5E", { sw: 6, ox: 0, oy: 0 });
    // giường + đầu giường có mũ treo
    out += VT.shape("M 560 820 L 1360 820 L 1360 900 L 560 900 Z", "#C68A55", { sw: 7 }) + VT.line("M 580 900 L 580 980", 12) + VT.line("M 1340 900 L 1340 980", 12);
    out += VT.shape("M 540 640 L 580 640 L 580 980 L 540 980 Z", "#8E5527", { sw: 6 });
    out += VT.sunhat({ x: 520, y: 640, s: 0.55, rot: -14 });
    out += VT.shape("M 600 760 C 600 730 700 730 700 760 L 700 820 L 600 820 Z", "#F6EEDC", { sw: 5 }); // gối
    out += VT.backpack({ x: 1470, y: 980, s: 0.6, packColor: "oliu" });
    return out;
  }
  function body(t, extra) {
    var o = { px: 12, py: 0, mouth: "flat", brows: "flat" };
    if (scraping(t)) {
      var w = Math.sin(t * 2 * Math.PI * 2.4);
      o.armR = [380 + 12 * w, 120]; o.handR = "nam"; o.mouth = "chatter"; o.eyes = "squint";
    } else o.armR = [300, 260];
    for (var k in extra) o[k] = extra[k];
    var hand = toWorld(o, o.armR[0], o.armR[1]);
    return { svg: wobLying(t, o) + spoon(hand[0], hand[1], 180 + (scraping(t) ? 10 * Math.sin(t * 15) : 40)), hand: hand };
  }
  function dust(t) {
    if (t < T_DUST) return "";
    var tip = [CX + 140, CEIL + 10], k = seg(t, T_DUST, T_DUST + 0.6);
    return VT.dot(tip[0] + 6 * Math.sin(k * 9), VT.lerp(tip[1], 735, VT.ease.in2(k)), 10, "#7a5a3a");
  }

  var shots = [];
  shots.push({ a: 0, b: S1, ten: "Wob nằm cạo trần", ve: function (t, lt, T) {
    var b = body(t, t < 1.0 ? { eyes: "open", py: 0 } : {});
    return { cam: key(T, [[0, [950, 700, 1.15]], [S1, [960, 690, 1.2], "sine"]]), world: room(t) + b.svg, tint: "warm" };
  } });
  shots.push({ a: S1, b: S2, ten: "cận thìa: rơi một hạt bụi", ve: function (t, lt, T) {
    var b = body(t, t >= T_DUST ? { eyes: "wide", px: 16, py: 10, mouth: "oSmall" } : {});
    var cam = key(T, [[S1, [1030, 560, 2.2]], [T_DUST, [1040, 590, 2.35], "sine"], [S2, [1030, 640, 2.2], "io"]]);
    return { cam: cam, world: room(t) + b.svg + dust(t), tint: "warm" };
  } });
  shots.push({ a: S2, b: DUR, ten: "nhìn hạt bụi, nhìn người xem, giữ", ve: function (t, lt, T) {
    var look = t >= T_SOME + 0.7;
    var b = body(t, { px: look ? 0 : 14, py: look ? 0 : 14, lid: look ? 0.45 : 0, noBlink: look, brows: "flat", mouth: "flat" });
    var out = room(t) + b.svg + VT.dot(CX + 146, 735, 10, "#7a5a3a");
    var c = toWorld({}, 200, 170);
    var cam = key(T, [[S2, [c[0] + 60, c[1], 1.7]], [T_SOME + 0.7, [c[0] + 30, c[1], 1.85], "io"], [DUR, [c[0] + 30, c[1], 1.95], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
