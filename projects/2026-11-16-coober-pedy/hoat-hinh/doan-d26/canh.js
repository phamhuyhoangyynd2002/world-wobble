/* d26 · vẽ tay · chèn: cuộn cỏ kẹp nách, cuộn xanh cạnh cuộn đỏ, vung gậy hụt (339,843–351,024 s; 11,181 s). Vào "chen", ra "cat".
 * Đồ Wob: mũ rộng vành kraft dải đỏ, ba lô ô liu + thảm đỏ; miếng cỏ cuộn kẹp nách (từ "green" buộc lên ba lô cạnh cuộn đỏ); gậy golf. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, G = 920;
  var T_MY = VT.tu("my", 1), T_RED = VT.tu("red", 0), T_GREEN = VT.tu("green", 0), T_LOOKED = VT.tu("looked", 0), T_PREP = VT.tu("prepared", 0), T_SPORT = VT.tu("sport", 0);
  var S1 = T_MY - 0.15, S2 = T_LOOKED - 0.15, T_SWING = T_SPORT + 0.05, T_SPIN1 = T_SWING + 0.35;
  VT.sfx("pop", T_GREEN, 0.5);
  VT.sfx("whoosh", T_SWING, 0.55);
  VT.sfx("boing", T_SWING + 0.15, 0.45);
  VT.sfx("im-lang", T_SPIN1 + 0.3, 0.3);

  function W(o) { var b = { s: 0.95, sunhat: true, packColor: "oliu", x: 900, y: G }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.6, 0.7)); return VT.wob(b); }
  function bg() {
    return VT.sky("#F7EED8", 0.9) + VT.mound({ x: 200, y: G, w: 640, h: 230, seed: 4 }) + VT.mound({ x: 1750, y: G, w: 600, h: 200, seed: 7 }) + VT.desertGround(G) +
      VT.shape("M 1250 " + (G + 40) + " C 1250 " + (G + 20) + " 1400 " + (G + 20) + " 1400 " + (G + 40) + " C 1400 " + (G + 60) + " 1250 " + (G + 60) + " 1250 " + (G + 40) + " Z", "#5E9E48", { sw: 4 }) +
      VT.line("M 1330 " + (G + 40) + " L 1330 " + (G - 120), 4) + VT.shape("M 1330 " + (G - 120) + " L 1400 " + (G - 100) + " L 1330 " + (G - 80) + " Z", "#C9463A", { sw: 3 });
  }
  var underArm = function () { return VT.roll({ x: 130, y: 250, len: 200, r: 30, rot: -8 }); };

  var shots = [];
  shots.push({ a: 0, b: S1, ten: "kẹp cuộn cỏ dưới nách", ve: function (t, lt, T) {
    var wo = { t: t, armL: [150, 270], handL: "nam", armR: [340, 290], handR: "nam", mouth: "content", eyes: t > 1.6 ? "happy" : null, px: -6, propBack: underArm() };
    wo.prop = VT.golfClub({ x: 340, y: 290, s: 0.8, rot: -10 });
    wo.bob = Math.abs(Math.sin(t * 6)) * -6;
    var out = bg() + W(wo);
    return { cam: key(T, [[0, [900, 720, 1.5]], [S1, [880, 720, 1.55], "sine"]]), world: out, tint: "warm" };
  } });
  shots.push({ a: S1, b: S2, ten: "vòng ra sau: cuộn đỏ, rồi cuộn xanh", ve: function (t, lt, T) {
    var placed = t >= T_GREEN - 0.05;
    var wo = { t: t, flip: -1, grassRoll: placed, px: 10, mouth: placed ? "smile" : "content", eyes: placed ? "happy" : null };
    if (!placed) {
      var lift = seg(t, T_RED + 0.2, T_GREEN - 0.05);
      wo.armL = key(lift, [[0, [150, 270]], [1, [300, 40], "io"]]); wo.handL = "nam";
      var rp = wo.armL; wo.propFront = VT.roll({ x: rp[0], y: rp[1] - 10, len: 200, r: 30, rot: lift * 10 });
    }
    wo.armR = [340, 290]; wo.prop = VT.golfClub({ x: 340, y: 290, s: 0.8, rot: -10 });
    var out = bg() + W(wo);
    if (placed && t < T_GREEN + 0.3) out += VT.sparkle({ x: 760, y: 560, s: 0.6 });
    var cam = key(T, [[S1, [960, 700, 1.35]], [T_RED, [820, 580, 1.75], "io3"], [S2, [820, 590, 1.8], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  shots.push({ a: S2, b: DUR, ten: "tạo dáng, vung gậy hụt, xoay nửa vòng, giữ", ve: function (t, lt, T) {
    var wo = { t: t, grassRoll: true, legs: "apart" }, club;
    if (t < T_SWING - 0.3) { // tạo dáng oai vệ: giơ gậy cao sau vai
      wo.armR = [290, 50]; wo.armL = [260, 70]; wo.handR = "nam"; wo.handL = "nam"; wo.mouth = "smirk"; wo.brows = "down"; wo.px = 12; wo.lean = -6;
      club = VT.golfClub({ x: 290, y: 50, s: 0.85, rot: 150 });
    } else if (t < T_SPIN1) { // vung
      var k = seg(t, T_SWING - 0.3, T_SWING + 0.1);
      var h = key(k, [[0, [290, 50]], [1, [360, 320], "in2"]]);
      wo.armR = h; wo.armL = [h[0] - 30, h[1] + 10]; wo.handR = "nam"; wo.mouth = "o"; wo.eyes = "squint"; wo.smear = t > T_SWING ? 60 : 0;
      club = VT.golfClub({ x: h[0], y: h[1], s: 0.85, rot: VT.lerp(150, -70, k) });
    } else { // xoay nửa vòng: quay lưng, chóng mặt
      var spun = t >= T_SPIN1 + 0.12;
      wo.flip = spun ? -1 : 1; wo.sxRaw = spun ? 1 : 0.4; wo.armR = [380, 150]; wo.handR = "nam"; wo.eyes = "cross"; wo.mouth = "wobbly"; wo.noBlink = true;
      club = VT.golfClub({ x: 380, y: 150, s: 0.85, rot: -110 });
    }
    wo.prop = club;
    var out = bg() + W(wo);
    if (t >= T_SPIN1 + 0.12) out += VT.dizzy({ x: 900, y: G - 400, t: t, s: 0.8 });
    if (t >= T_SWING && t < T_SWING + 0.25) out += VT.speedLines({ x0: 1080, y0: G - 120, n: 4, gap: 30, len: 120, dx: 1, dy: 0 });
    var cam = key(T, [[S2, [900, 680, 1.25]], [T_SWING, [900, 690, 1.3], "sine"], [T_SPIN1, [900, 700, 1.55], "out"], [DUR, [900, 690, 1.6], "sine"]]);
    return { cam: cam, shake: VT.shake(t, T_SPIN1, 0.2, 5), world: out, tint: "warm" };
  } });
  return shots;
};
