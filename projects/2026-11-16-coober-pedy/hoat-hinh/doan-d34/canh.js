/* d34 · vẽ tay · chèn: đi lùi đọc biển, lưng va đống đất, ngồi phịch, ba lô bật nắp (451,728–456,353 s; 4,625 s). Vào "chen", ra "cat".
 * KHÔNG có miệng giếng trong khung. Gag xong trước khoảng lặng; từ đó tới cuối đoạn giữ hình: Wob ngồi im phủi bụi rất chậm, không gag mới.
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ + cuộn cỏ xanh. Không chữ (biển chỉ có dòng kẻ).
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, G = 900, WS = 0.9;
  var T_BACK = VT.tu("backwards", 0), T_HIT = 1.25, T_SIT = T_HIT + 0.2, T_LID = T_SIT + 0.05, T_HOLD = T_SIT + 0.55; // gag xong sớm để giữ khung tĩnh ~2,6 s tới cuối
  var WK = { t0: 0, t1: T_HIT, x0: 760, x1: 1180, chuKy: 0.7, s: WS };
  VT.buoc(0, WK).steps.forEach(function (st) { VT.sfx("bonk", st.t, 0.1); });
  VT.sfx("bonk", T_HIT, 0.7);
  VT.sfx("pop", T_LID, 0.5);

  function bg() {
    var out = VT.sky("#F7EED8", 0.9) + VT.mound({ x: -100, y: G, w: 600, h: 230, seed: 6 }) + VT.desertGround(G);
    [420, 640].forEach(function (x, i) { out += VT.infoBoard({ x: x, y: G, s: 0.42, w: 420, h: 300, post: 260, lines: 5 }); });
    out += VT.mound({ x: 1420, y: G, w: 460, h: 300, seed: 12 }) + VT.rock({ x: 1230, y: G - 14, r: 26, seed: 4 });
    return out;
  }

  var shots = [];
  shots.push({ a: 0, b: DUR, ten: "đi lùi, va đống đất, ngồi phịch, giữ", ve: function (t, lt, T) {
    var o = { t: t, s: WS, y: G, packColor: "oliu", grassRoll: true, sunhat: true };
    if (t < T_HIT) {
      var wk = VT.buoc(t, WK);
      o.x = wk.x; o.legs = "walk"; o.phase = 1 - wk.phase; o.stride = wk.stride * 0.7; o.px = -16; o.py = -4; o.mouth = "flat"; o.brows = "skeptic"; o.lean = -4;
      o.armL = [40, 200]; o.handL = "chi";
    } else if (t < T_SIT) { // va: thân nén, nghiêng ra trước
      o.x = 1180; o.sq = 0.85; o.eyes = "wide"; o.mouth = "o"; o.brows = "up"; o.lean = -10; o.marks = "shock";
    } else { // ngồi phịch xuống chân đống đất
      o.x = 1180; o.y = G + 92 * WS; o.legs = "sit"; o.lean = -6; o.sq = key(t, [[T_SIT, 0.8], [T_SIT + 0.2, 1, "out"]]);
      o.packOpen = seg(t, T_LID, T_LID + 0.15);
      var dust = 0;
      if (t < T_HOLD) { o.eyes = "cross"; o.mouth = "wobbly"; o.noBlink = true; }
      else { o.lid = 0.5; o.noBlink = true; o.mouth = "flat"; o.brows = "flat"; o.armR = [300, 250]; o.handR = "xoe"; }
    }
    var out = bg() + VT.wob(o);
    if (t >= T_HIT && t < T_HIT + 0.3) out += VT.impact({ x: 1300, y: G - 160, s: 0.6 });
    if (t >= T_SIT && t < T_SIT + 0.4) out += VT.puffBurst({ x: 1180, y: G + 10, k: seg(t, T_SIT, T_SIT + 0.4), s: 0.8, spread: 140 });
    var cam = key(T, [[0, [900, 700, 1.25]], [T_HIT, [1120, 700, 1.3], "sine"], [T_SIT + 0.1, [1150, 760, 1.55], "out"], [DUR, [1150, 760, 1.6], "sine"]]);
    return { cam: cam, shake: VT.shakes(t, [[T_HIT, 0.23, 7], [T_SIT, 0.2, 6]]), world: out, tint: "warm" };
  } });
  return shots;
};
