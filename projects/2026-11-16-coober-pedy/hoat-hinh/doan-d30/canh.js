/* d30 · vẽ tay · chèn: lê bước về trên đường đá trắng ban đêm (379,924–385,876 s; 5,952 s). Vào "chen", ra "giay".
 * Wob ôm cuộn cỏ, gậy golf kéo lê thành vệt trên đá; "dignity": mũ trượt lệch che một mắt; giữ hình rồi tờ giấy phủ.
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ + cuộn cỏ xanh (từ d26); miếng cỏ cuộn ôm tay; gậy golf. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, G = 900, WS = 0.85;
  var T_LOST = VT.tu("lost", 0), T_DIG = VT.tu("dignity", 0), T_ORDER = VT.tu("order", 0);
  var WK = { t0: 0, t1: T_ORDER + 0.3, x0: 1420, x1: 860, chuKy: 0.9, s: WS };
  VT.sfx("xuoc-dia", 0.3, 0.25);
  VT.buoc(0, WK).steps.forEach(function (st) { VT.sfx("bonk", st.t, 0.12); });
  VT.sfx("de-kem", T_DIG - 0.05, 0.4);

  function bg(t) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#2E3D5C"/>';
    for (var i = 0; i < 26; i++) out += VT.dot(-400 + VT.hash(i) * 2800, -300 + VT.hash(i + 40) * 900, 3 + 2 * VT.hash(i + 9), "#F6EEDC");
    out += VT.shape("M 1500 140 C 1580 130 1620 220 1580 280 C 1620 230 1610 150 1500 140 Z", "#F6EEDC", { sw: 4 });
    out += VT.mound({ x: 200, y: G, w: 700, h: 260, seed: 3, color: "#55627A" }) + VT.mound({ x: 1800, y: G, w: 700, h: 220, seed: 8, color: "#55627A" });
    out += VT.shape("M -1200 " + G + " L 3100 " + G + " L 3100 2400 L -1200 2400 Z", "#E8E2D0", { sw: 6, ox: 0, oy: 0 });
    return out;
  }

  var shots = [];
  shots.push({ a: 0, b: DUR, ten: "lê bước, mũ lệch che mắt, giữ", ve: function (t, lt, T) {
    var wk = VT.buoc(t, WK), slid = seg(t, T_DIG - 0.1, T_DIG + 0.15);
    var wo = { t: t, s: WS, x: wk.x, y: G, flip: 1, packColor: "oliu", grassRoll: true, legs: wk.walking ? "walk" : "stand", phase: wk.phase, stride: wk.stride * 0.6, waddle: 3,
      sunhat: { rot: -16 * VT.ease.back(slid), dx: 30 * slid, dy: 46 * VT.ease.back(slid) }, lid: 0.45, brows: "worried", mouth: "frown", py: 12, noBlink: true };
    wo.armL = [100, 250]; wo.handL = "nam"; wo.propFront = VT.roll({ x: 110, y: 262, len: 150, r: 26, rot: 0 });
    wo.armR = [350, 310]; wo.handR = "nam";
    var gp = VT.wobPt(wo, 350, 310), head = [gp[0] + 170, G - 6];
    var out = bg(t);
    out += VT.line("M " + VT.f(head[0]) + " " + (G + 4) + " L 1700 " + (G + 4), 6, "#9AA0A6", 0.8); // vệt kéo lê
    out += VT.line("M " + VT.f(gp[0]) + " " + VT.f(gp[1]) + " L " + VT.f(head[0]) + " " + VT.f(head[1]), 9, "#9AA7AE") + VT.shape("M " + VT.f(head[0]) + " " + (G - 14) + " l 50 0 l 0 22 l -54 0 Z", "#7C8C96", { sw: 4 });
    out += VT.wob(wo);
    var face = VT.wobPt(wo, 200, 170);
    var cam = key(T, [[0, [1150, 680, 1.15]], [T_DIG - 0.3, [face[0], 640, 1.3], "sine"], [T_DIG + 0.2, [face[0], face[1] + 20, 1.9], "out"], [DUR, [face[0], face[1] + 20, 1.98], "sine"]]);
    return { cam: cam, world: out, tint: "cold" };
  } });
  return shots;
};
