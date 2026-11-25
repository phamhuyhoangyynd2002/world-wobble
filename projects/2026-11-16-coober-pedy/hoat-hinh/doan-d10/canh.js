/* d10 · vẽ tay · bảng thông tin "PERMIT?" (130,286–135,544 s; 5,258 s). Vào "cat", ra "cat".
 * Wob đọc kỹ, ngón tay dò từng dòng, gật đầu, cất xẻng vào ba lô. Không khẳng định cần hay không cần giấy phép.
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ; xẻng nhỏ. Chữ: "PERMIT?" (tiêu đề bảng, to, không bị che).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, G = 940;
  var T_ASK = VT.tu("ask", 0), T_CHK = VT.tu("checked", 0), T_DUG = VT.tu("dug", 0);
  var S1 = T_ASK + 0.25;
  var BO = { x: 1180, y: G, w: 640, h: 420, post: 200, title: "PERMIT?", size: 110, lines: 6 };
  VT.sfx("pop", T_CHK, 0.4);
  VT.sfx("drop", T_DUG + 0.2, 0.4);
  function W(o) { var b = { s: 0.95, sunhat: true, packColor: "oliu" }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.4, 0.2)); return VT.wob(b); }
  function bg() { return VT.sky("#F7EED8", 0.9) + VT.mound({ x: 200, y: G, w: 600, h: 200, seed: 3 }) + VT.mound({ x: 1900, y: G, w: 700, h: 260, seed: 8 }) + VT.desertGround(G); }
  function lineAt(i) { var l = VT.infoBoardLine(BO, i); return { x0: BO.x + l.x0, x1: BO.x + l.x1, y: BO.y + l.y }; }

  var shots = [];
  shots.push({ a: 0, b: S1, ten: "dò từng dòng", ve: function (t, lt, T) {
    var nl = 4, per = S1 / nl, i = Math.min(nl - 1, Math.floor(t / per)), k = (t - i * per) / per, L = lineAt(i);
    var tip = [VT.lerp(L.x0, L.x1, k), L.y + 6];
    var wo = { t: t, x: 760, y: G, px: 14, py: VT.lerp(-6, 6, i / nl), brows: "skeptic", mouth: "flat", lean: 6 };
    wo.armR = VT.wobLocal(wo, tip[0], tip[1]); wo.handR = "chi";
    wo.propBack = VT.shovel({ x: 120, y: 330, s: 0.9, rot: 160 }); // xẻng cắm cạnh chân
    var out = bg() + VT.infoBoard(Object.assign({ hi: i }, BO)) + W(wo);
    return { cam: key(T, [[0, [1060, 540, 1.25]], [S1, [1090, 540, 1.3], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S1, b: DUR, ten: "gật đầu, cất xẻng", ve: function (t, lt, T) {
    var nod = Math.sin(seg(t, S1 + 0.1, T_CHK + 0.4) * Math.PI * 2) * 5, store = seg(t, T_CHK + 0.3, T_DUG + 0.2);
    var wo = { t: t, x: 760, y: G, mouth: "content", eyes: t < T_CHK + 0.4 ? "happy" : null, lean: nod, bob: Math.abs(nod) * 2 };
    var h = key(store, [[0, [330, 300]], [0.5, [330, 120], "io"], [1, [290, 60], "io"]]);
    wo.armR = h; wo.handR = "nam";
    var sh = VT.shovel({ x: h[0], y: h[1] - 40, s: 0.9, rot: key(store, [[0, -20], [1, 165, "io"]]) });
    if (store < 0.95) wo.prop = sh; else wo.propBack = VT.shovel({ x: 300, y: -10, s: 0.9, rot: 170 });
    var out = bg() + VT.infoBoard(BO) + W(wo);
    return { cam: key(T, [[S1, [980, 560, 1.12]], [DUR, [960, 560, 1.16], "sine"]]), world: out, tint: "warm" };
  } });
  return shots;
};
