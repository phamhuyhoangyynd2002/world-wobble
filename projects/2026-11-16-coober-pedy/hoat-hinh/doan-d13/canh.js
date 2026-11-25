/* d13 · vẽ tay · chèn: hai lần đoán sai trên trang sổ (163,424–172,324 s; 8,9 s). Vào "chen", ra "cat".
 * 2 s đầu: cái mũ (bỏ việc ở d11) bò vào khung, leo lại lên đầu Wob khi Wob bắt đầu vẽ. Vẽ hầm có hòm opal giấu; "Wrong": gạch chéo đỏ.
 * Lật trang: vẽ hang có dơi treo, tự gạch, chừa một góc chưa gạch đúng "mostly".
 * Đồ Wob: mũ rộng vành kraft dải đỏ (leo lại lên đầu), ba lô ô liu + thảm đỏ; bút chì. Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, G = 960;
  var T_WRONG = VT.tu("wrong", 0), T_MY2 = VT.tu("my", 1), T_ALSO = VT.tu("also", 0), T_MOST = VT.tu("mostly", 0);
  var HAT_ON = 1.85, S1 = T_MY2 - 0.15;
  var WX = 640, WS = 0.95;
  VT.sfx("bonk", HAT_ON - 0.02, 0.35);
  VT.sfx("buzz-sai", T_WRONG - 0.02, 0.55);
  VT.sfx("whoosh", S1 + 0.02, 0.35);
  VT.sfx("xuoc-dia", T_ALSO - 0.1, 0.4);

  // hình 1: hầm dưới đất + hòm opal (toạ độ khung)
  var P1 = [
    [[760, 560], [1500, 560]],                                   // mặt đất
    [[1000, 560], [1000, 760], [1320, 760], [1320, 860], [1060, 860], [1060, 760]], // giếng + hầm
    [[1180, 860], [1180, 800], [1280, 800], [1280, 860]],         // hòm
  ];
  // hình 2: hang có dơi
  var P2 = [
    [[780, 860], [820, 620], [960, 470], [1150, 440], [1340, 480], [1460, 640], [1500, 860]],
    [[900, 860], [960, 700], [1150, 650], [1340, 700], [1390, 860]],
  ];
  function drawSet(P, k) { // vẽ dần từng nét theo k tổng; trả {svg, tip}
    var n = P.length, out = "", tip = P[0][0];
    for (var i = 0; i < n; i++) {
      var ki = VT.clamp(k * n - i, 0, 1); if (ki <= 0) break;
      out += VT.lineDraw(VT.smooth(P[i], false).replace(/C /g, "C "), ki, 7);
      tip = VT.alongPts(P[i], ki);
    }
    return { svg: out, tip: tip };
  }
  function polyD(pts) { return "M " + pts.map(function (p) { return p[0] + " " + p[1]; }).join(" L "); }
  function drawPoly(P, k) {
    var n = P.length, out = "", tip = P[0][0];
    for (var i = 0; i < n; i++) { var ki = VT.clamp(k * n - i, 0, 1); if (ki <= 0) break; out += VT.lineDraw(polyD(P[i]), ki, 7); tip = VT.alongPts(P[i], ki); }
    return { svg: out, tip: tip };
  }
  function W(o) { var b = { s: WS, x: WX, y: G, packColor: "oliu" }; for (var k in o) b[k] = o[k]; if (!b.noBlink && b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 2.6, 0.9)); return VT.wob(b); }
  var BG = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#FBF6EA" opacity="0.65"/>' + VT.line("M -1200 " + (G + 4) + " L 3100 " + (G + 4), 4, "#1f2326", 0.3);
  function withPencil(wo, tip) {
    var ly = VT.clamp(220 + (tip[1] - 700) * 0.3, 120, 300);
    wo.armR = [360, ly]; wo.handR = "nam";
    var hp = VT.wobPt({ s: WS, x: WX, y: G, sq: wo.sq }, 360, ly);
    return VT.pencilTo(hp, tip, { s: 0.8 });
  }

  var shots = [];
  shots.push({ a: 0, b: S1, ten: "mũ leo lại lên đầu; hầm giấu opal; gạch đỏ", ve: function (t, lt, T) {
    var k = seg(t, 0.4, T_WRONG - 0.5), d = drawPoly(P1, k), out = BG + d.svg;
    if (k >= 0.85) out += VT.opal({ x: 1230, y: 836, r: 14, t: t, glow: 0.5 });
    var wo = { t: t, sunhat: t >= HAT_ON, px: 14, py: 8, mouth: t < T_WRONG ? "content" : "frown", brows: t < T_WRONG ? null : "worried" };
    if (t >= HAT_ON && t < HAT_ON + 0.25) wo.sq = key(t, [[HAT_ON, 0.9], [HAT_ON + 0.25, 1, "out"]]);
    var pen = k > 0 && k < 1 ? withPencil(wo, d.tip) : "";
    if (!pen) { wo.armR = [330, 300]; }
    out += W(wo) + pen;
    if (t < HAT_ON) { // mũ bò từ mép phải tới, nhảy lên đầu Wob
      var head = VT.wobPt({ s: WS, x: WX, y: G }, 200, 92), jump = seg(t, HAT_ON - 0.35, HAT_ON);
      var hx = jump > 0 ? VT.lerp(WX + 260, head[0], jump) : VT.lerp(1950, WX + 260, VT.ease.out2(seg(t, 0, HAT_ON - 0.35)));
      var hy = jump > 0 ? VT.lerp(G - 30, head[1], jump) - 160 * Math.sin(Math.PI * jump) : G - 30;
      out += VT.sunhat({ x: hx, y: hy, s: WS, legs: jump > 0 ? false : t * 6, eyes: true, rot: jump * -20 });
    }
    if (t >= T_WRONG - 0.05) out += VT.bigX({ x: 1130, y: 700, s: 1.1, k: seg(t, T_WRONG - 0.05, T_WRONG + 0.12) });
    var cam = key(T, [[0, [1040, 640, 1.05]], [S1, [1040, 650, 1.1], "sine"]]);
    return { cam: cam, shake: VT.shake(t, T_WRONG + 0.1, 0.2, 5), world: out, tint: "warm" };
  } });
  shots.push({ a: S1, b: DUR, ten: "hang có dơi, gạch gần hết, chừa góc", ve: function (t, lt, T) {
    var k = seg(t, S1 + 0.15, T_ALSO - 0.25), d = drawSet(P2, k), out = BG + d.svg;
    if (k >= 0.9) [[1060, 520], [1180, 500], [1290, 530]].forEach(function (b, i) { // dơi treo ngược
      out += VT.line("M " + b[0] + " " + (b[1] - 40) + " L " + b[0] + " " + (b[1] - 20), 4) + VT.shape("M " + (b[0] - 30) + " " + b[1] + " Q " + b[0] + " " + (b[1] - 30) + " " + (b[0] + 30) + " " + b[1] + " Q " + b[0] + " " + (b[1] + 26) + " " + (b[0] - 30) + " " + b[1] + " Z", "#4a4f5a", { sw: 4 });
    });
    // gạch xoá: phủ phần lớn, chừa góc phải dưới
    var ks = seg(t, T_ALSO - 0.15, T_MOST - 0.05), scr = [[900, 520], [1300, 520], [880, 700], [1240, 650], [860, 820], [1150, 800], [1000, 600]];
    if (ks > 0) out += VT.scribble(scr, ks, 8, "#C8382A");
    var spare = t >= T_MOST - 0.05;
    var wo = { t: t, sunhat: true, px: 14, py: 6, mouth: spare ? "smirk" : (ks > 0 ? "chatter" : "content"), brows: spare ? "skeptic" : null };
    var tip = ks > 0 && ks < 1 ? scr[Math.floor(ks * 60) % scr.length] : d.tip;
    var pen = (k > 0 && k < 1) || (ks > 0 && ks < 1) ? withPencil(wo, [tip[0] + 0, tip[1]]) : "";
    if (spare) { var c = [1430, 800]; pen = withPencil(wo, [c[0] - 40, c[1] - 10]);
      out += VT.ell(c[0], c[1], 70, 50, "none", 5, { stroke: "#2c4f6e" }); }
    if (!pen) wo.armR = [330, 300];
    out += W(wo) + pen;
    var cam = key(T, [[S1, [1060, 640, 1.08]], [T_MOST - 0.1, [1080, 650, 1.12], "sine"], [T_MOST + 0.2, [1250, 720, 1.5], "io"], [DUR, [1260, 720, 1.54], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
