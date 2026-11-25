/* d21 · vẽ tay · "My raincoat needed a raincoat." (5,0 s). Vào "chen", ra "cat".
 * Đồ: áo mưa vàng có mũ trùm, ba lô ô liu cuộn thảm đỏ; khoác thêm áo mưa nhỏ lên vai. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, G = 880, WS = 0.95, WX = 900;
  var T_WET = VT.tu("wet,"), T_TIME = VT.tu("time."), T_RC1 = VT.tu("raincoat", 0), T_NEED = VT.tu("needed"), T_RC2 = VT.tu("raincoat.", 0);
  var T_ON = T_NEED - 0.25;              // áo nhỏ chạm vai ngay trước "needed"
  function W(t, o) {
    var b = { t: t, s: WS, x: WX, y: G, raincoat: { wet: 1 }, packColor: "oliu", flip: 1 };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.6, 0.5));
    return VT.wob(b);
  }
  function world(t) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#AEB9BD"/>';
    s += VT.towerWall({ x: 300, y: G, w: 900, h: 1300, cols: 6, rows: 9, lit: 0.3, door: true });
    s += '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="#6F7B80"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    // vũng nước gợn theo bậc hình
    var st = VT.twos(t);
    s += VT.ell(1180, G + 60, 240, 26, "#8FA9B6", 4) + VT.ell(1180, G + 60, 60 + (st * 120) % 160, 8 + (st * 15) % 18, "none", 3, { op: 0.6 });
    return s;
  }
  function rainOver(t, n) { return VT.rain(t, n, [-200, -200, 2120, 1180], { slant: 140, speed: 1900, len: 90, sw: 5, col: "#4f6f86", op: 0.7 }); }
  function drips(t, o, pts) { // giọt rơi tong tỏng từ mép áo
    var out = "";
    pts.forEach(function (p, i) { var ph = (t * 1.8 + i * 0.41) % 1, q = VT.wobPt(o, p[0], p[1]); out += VT.drop({ x: q[0], y: q[1] + ph * 120, s: 0.55 }); });
    return out;
  }
  function coatPose(t, o) { // áo nhỏ: từ tay trái giơ lên → chụp lên vai
    var shoulder = VT.wobPt(o, 200, 28);
    if (t >= T_ON) return { x: shoulder[0], y: shoulder[1], rot: 0, s: WS * 0.52 };
    var k = VT.ease.io(seg(t, T_TIME - 0.1, T_ON));
    var start = VT.wobPt(o, -40, 160);
    return { x: VT.lerp(start[0], shoulder[0], k), y: VT.lerp(start[1], shoulder[1], k) - 140 * Math.sin(Math.PI * k), rot: VT.lerp(-30, 0, k), s: WS * 0.52 };
  }

  VT.sfx("pop", T_ON + 0.02, 0.5);
  VT.sfx("drop", T_RC2 + 0.25, 0.35);

  var shots = [];
  // S0 · trung cảnh: mưa ngang quất, Wob đứng ướt sũng, mặt tỉnh bơ (khung đầu rõ: đoạn chèn)
  var B0 = T_TIME - 0.15;
  shots.push({ a: 0, b: B0, ten: "mưa ngang, Wob ướt", ve: function (t, lt, T) {
    var o = { s: WS, x: WX, y: G, lean: -6 + Math.sin(VT.twos(t) * 9) * 1.5, px: 10, py: 4, lid: 0.35, brows: "flat", mouth: "flat", shiver: 2, noBlink: false };
    if (t > T_WET - 0.05) { o.lid = 0.5; o.mouth = "wobbly"; o.px = 14; o.py = -2; }
    var out = world(t) + W(t, o) + drips(t, o, [[60, 330], [340, 330], [200, 350]]);
    return { cam: [WX + 40, G - 260, key(T, [[0, 1.55], [B0, 1.62]])], world: out, over: rainOver(t, 70), tint: "cold" };
  } });
  // S1 · Wob rút áo mưa nhỏ từ ba lô, chụp lên vai
  var B1 = T_RC1 + 0.35;
  shots.push({ a: B0, b: B1, ten: "khoác áo mưa nhỏ", ve: function (t, lt, T) {
    var o = { s: WS, x: WX, y: G, px: 0, py: -12, brows: "up", mouth: "content", lean: -4 };
    var cp = coatPose(t, o);
    if (t < T_ON) { o.armL = VT.wobLocal(o, cp.x - 40, cp.y + 30); o.handL = "nam"; o.armR = VT.wobLocal(o, cp.x + 40, cp.y + 30); o.handR = "nam"; }
    else { o.sq = key(t, [[T_ON, 0.92, "out"], [T_ON + 0.2, 1, "back"]]); o.brows = "flat"; o.mouth = "smirk"; o.px = 12; o.py = 6; }
    var coat = VT.miniCoat({ x: cp.x, y: cp.y, s: cp.s, rot: cp.rot, wet: 0.6, t: t });
    var out = world(t) + W(t, o) + coat + drips(t, o, [[60, 330], [340, 330]]);
    if (t >= T_ON && t < T_ON + 0.25) out += VT.puffBurst({ x: cp.x, y: cp.y + 20, k: seg(t, T_ON, T_ON + 0.25), s: 0.5 });
    return { cam: [WX + 20, G - 300, key(T, [[B0, 1.9], [B1, 2.0]])], world: out, over: rainOver(t, 60), tint: "cold" };
  } });
  // S2 · cận mặt: áo thứ hai cũng sũng, nhỏ nước tong tỏng; giữ hình tỉnh bơ
  shots.push({ a: B1, b: D.thoi_luong, ten: "cận mặt, áo sũng", ve: function (t, lt, T) {
    var o = { s: WS, x: WX, y: G, px: 14, py: 2, lid: 0.5, brows: "flat", mouth: "flat", noBlink: true };
    var sh = VT.wobPt(o, 200, 28);
    var coat = VT.miniCoat({ x: sh[0], y: sh[1], s: WS * 0.52, wet: 1, t: t });
    var out = world(t) + W(t, o) + coat;
    var c = VT.wobPt(o, 210, 170);
    return { cam: [c[0] + 20, c[1] - 30, key(T, [[B1, 2.5], [D.thoi_luong, 2.68, "sine"]])], world: out, over: rainOver(t, 45), tint: "cold" };
  } });
  return shots;
};
