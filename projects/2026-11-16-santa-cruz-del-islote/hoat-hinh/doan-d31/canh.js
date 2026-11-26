/* d31 · vẽ tay · chèn (568,538–581,288 s; 12,75 s). Vào "chen", ra "cat". Hồi ức tưởng tượng, KHÔNG khẩu hình. Dựng lại theo lời mới (vòng tự sửa 1).
 * 1) Hình to: cầu tàu nhỏ, ba biểu tượng KHÔNG chữ bật ra lần lượt: đồng hồ cát ("patience"), thuyền gỗ ("boat"), túi xách tí hon ("luggage"). Không Wob, không đùa.
 * 2) Cầu tàu trống: núi hành lý của Wob (ba lô khổng lồ, ghế nhựa, phao vịt, ô, cúc áo trên chóp) chọc mây; Wob mũ cói đứng trên đỉnh nhìn quanh;
 *    camera lia xuống chân cầu tàu: mặt nước trống, không thuyền.
 * 3) "no boat": sóng nhỏ vỗ chân cầu tàu; Wob trên đỉnh giơ ngón cái vẫy xin đi nhờ về phía biển trống, giữ.
 * 4) Tưởng tượng quay lại quảng trường chạng vạng: mũ cói, KHÔNG ba lô khổng lồ, túi bé bằng hộp cơm; nhảy chân sáo, tung túi bắt lại, ngồi phịch ghế nhựa.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU, INK = VT.C.ink;
  var S2 = VT.nhip(1), S3 = VT.nhip(2), S4 = VT.nhip(3);
  var T_PAT = VT.tu("patience,"), T_BOAT = VT.tu("boat"), T_LUG = VT.tu("luggage."), T_MOUNT = VT.tu("mountain"), T_NO = VT.tu("no");
  var T_GO = VT.tu("go"), T_EVE = VT.tu("evening"), T_CARRY = VT.tu("carrying"), T_LUNCH = VT.tu("lunchbox.");
  var SEA = 820, PIER = 800;
  VT.sfx("pop", T_PAT, 0.4);
  VT.sfx("pop", T_BOAT, 0.4);
  VT.sfx("pop", T_LUG, 0.35);
  VT.sfx("song", S3 + 0.02, 0.5);
  VT.sfx("liu-lo-vui", T_GO, 0.45);
  VT.sfx("pop", T_EVE + 0.55, 0.3);
  VT.sfx("bonk", T_CARRY + 0.1, 0.3);

  function sky(top) { return '<rect x="-1200" y="' + (top || -2400) + '" width="4320" height="' + (SEA - (top || -2400)) + '" fill="#F7EED8"/>'; }
  function pier(x0, x1) {
    var out = "";
    for (var x = x0 + 40; x < x1; x += 160) out += VT.shape("M " + (x - 14) + " " + PIER + " L " + (x + 14) + " " + PIER + " L " + (x + 14) + " " + (SEA + 140) + " L " + (x - 14) + " " + (SEA + 140) + " Z", M.root, { sw: 5 });
    out += VT.shape("M " + x0 + " " + (PIER - 30) + " L " + x1 + " " + (PIER - 30) + " L " + x1 + " " + PIER + " L " + x0 + " " + PIER + " Z", "#C68A55", { sw: 6 });
    for (var y = x0 + 60; y < x1; y += 60) out += VT.line("M " + y + " " + (PIER - 30) + " L " + y + " " + PIER, 3, INK, 0.4);
    return out;
  }
  function hourglass(x, y, s, t) {
    var k = VT.clamp((t || 0) % 3 / 3, 0, 1);
    return VT.g(VT.tr(x, y, s, 0), VT.shape("M -60 -170 L 60 -170 L 60 -150 L -60 -150 Z M -60 0 L 60 0 L 60 -20 L -60 -20 Z", "#8E5527", { sw: 5 }) +
      VT.shape("M -46 -150 C -46 -110 -8 -95 -8 -85 C -8 -75 -46 -60 -46 -20 L 46 -20 C 46 -60 8 -75 8 -85 C 8 -95 46 -110 46 -150 Z", "#E3F1F4", { sw: 5, op: 0.9 }) +
      VT.shape("M " + VT.f(-30 + 20 * k) + " " + VT.f(-130 + 40 * k) + " L " + VT.f(30 - 20 * k) + " " + VT.f(-130 + 40 * k) + " L 0 -90 Z", "#E6CFA0", { sw: 0, ox: 0, oy: 0 }) +
      VT.shape("M -40 -22 C -30 " + VT.f(-40 - 20 * k) + " 30 " + VT.f(-40 - 20 * k) + " 40 -22 Z", "#E6CFA0", { sw: 0, ox: 0, oy: 0 }) + VT.line("M 0 -88 L 0 -24", 3, "#C9A46A"));
  }
  var shots = [];
  // 1 · ba biểu tượng trên cầu tàu nhỏ
  shots.push({ a: 0, b: S2, ten: "ba biểu tượng: đồng hồ cát, thuyền, túi tí hon", ve: function (t, lt, T) {
    var out = sky() + pier(360, 1560) + VT.bien({ y: SEA, t: t, n: 12 });
    var a = VT.ease.back(seg(t, T_PAT - 0.05, T_PAT + 0.25)), b = VT.ease.back(seg(t, T_BOAT - 0.05, T_BOAT + 0.25)), c = VT.ease.back(seg(t, T_LUG - 0.05, T_LUG + 0.25));
    if (a > 0) out += hourglass(700, PIER - 30, 1.15 * a, t);
    if (b > 0) out += VT.thuyenCa({ x: 960, y: SEA + 30 + 4 * Math.sin(t * 3), s: 0.7 * b });
    if (c > 0) out += VT.hopCom({ x: 1230, y: PIER - 30 - 67 * c, s: 0.9 * c });
    var cam = key(T, [[0, [960, 660, 1.75]], [S2, [960, 660, 1.85], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 2–3 · núi hành lý trên cầu tàu không thuyền
  var MX = 900;
  function mountain(t) {
    var out = VT.baLoKhongLo({ x: MX, y: PIER - 30, s: 1.35 });
    out += VT.gheNhua({ x: MX + 20, y: PIER - 30 - 545, s: 1.05, rot: 4 });
    out += VT.phaoVit({ x: MX - 10, y: PIER - 30 - 545 - 340, s: 1.1, rot: -6 });
    out += VT.baLoKhongLo({ x: MX + 10, y: PIER - 30 - 545 - 380, s: 0.9, rot: 3, noCan: true });
    out += VT.umbrella({ x: MX - 60, y: PIER - 30 - 545 - 380 - 340, s: 1.0, rot: -12, open: 1 });
    out += VT.cucAo({ x: MX + 40, y: PIER - 30 - 545 - 380 - 380, r: 30 });
    return out;
  }
  var TOP = PIER - 30 - 545 - 380 - 400;
  function clouds() { return VT.cloud({ x: 560, y: TOP + 60, s: 1.3 }) + VT.cloud({ x: 1300, y: TOP + 160, s: 1.1 }) + VT.cloud({ x: 300, y: TOP - 200, s: 0.9 }); }
  function wobTop(t, mode) {
    var o = { t: t, x: MX + 40, y: TOP + 4, s: 0.82, sunhat: "coi", noPack: true, mouth: "flat", brows: "up" };
    if (mode === "nhin") { o.px = VT.pick(t, [[S2, -12], [S2 + 0.5, 12], [S2 + 1.0, 0]]); o.py = 6; o.lid = VT.blink(t, 2.5, 0.2); o.armL = [70, 120]; o.handL = "xoe"; }
    else { o.armR = [420, 150]; o.handR = "nam"; o.px = 12; o.py = 6; o.mouth = "smile"; o.brows = "up"; o.lean = 6; }
    var out = VT.wob(o);
    if (mode !== "nhin") { var h = VT.wobPt(o, 420, 150); out += VT.line("M " + VT.f(h[0] + 2) + " " + VT.f(h[1] - 8) + " L " + VT.f(h[0] + 4) + " " + VT.f(h[1] - 36), 10); }
    return out;
  }
  shots.push({ a: S2, b: S3, ten: "núi hành lý chọc mây, Wob trên đỉnh; lia xuống nước trống", ve: function (t, lt, T) {
    var out = sky() + clouds() + pier(500, 1500) + mountain(t) + wobTop(t, "nhin") + VT.bien({ y: SEA, t: t, n: 14 });
    var cam = key(T, [[S2, [940, TOP + 40, 1.3]], [T_MOUNT + 0.2, [940, TOP + 60, 1.32], "sine"], [T_MOUNT + 0.75, [980, 260, 0.62], "io3"], [S3 - 0.05, [1060, 700, 1.0], "io3"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  shots.push({ a: S3, b: S4, ten: "sóng vỗ chân cầu, Wob vẫy xin đi nhờ biển trống", ve: function (t, lt, T) {
    var out = sky() + clouds() + pier(500, 1500) + mountain(t) + wobTop(t, "nho") + VT.bien({ y: SEA, t: t, n: 14 });
    var k = seg(t, S3, S3 + 0.6);
    if (k < 1) out += VT.puffBurst({ x: 1460, y: SEA - 10, k: k, s: 0.5, spread: 70, fill: "#ffffff" });
    var cam = key(T, [[S3, [1080, -10, 0.56]], [S4, [1080, -20, 0.58], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // 4 · quảng trường chạng vạng
  var G = 900, CH = [1280, G], TOSS0 = T_EVE + 0.1, TOSS1 = T_EVE + 0.55, SIT = T_CARRY;
  var WK = { t0: S4 + 0.25, t1: TOSS0, x0: 260, x1: 880, chuKy: 0.5, s: 0.62 };
  var WK2 = { t0: TOSS1 + 0.1, t1: SIT - 0.1, x0: 880, x1: CH[0], chuKy: 0.5, s: 0.62 };
  function square(t) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="' + (1200 + 500) + '" fill="#E9A880"/>' + '<rect x="-1200" y="300" width="4320" height="' + (G - 300) + '" fill="#F2C4A0"/>';
    out += VT.daoNha({ x: 960, y: 640, w: 1900, seed: 77, lit: true, door: true }).replace("<g", '<g opacity="0.8"');
    out += '<rect x="-1200" y="640" width="4320" height="' + (G - 640) + '" fill="#E2D6C0"/>' + '<rect x="-1200" y="' + G + '" width="4320" height="1600" fill="' + M.cement + '"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    out += VT.thanhGia({ x: 760, y: G - 60, s: 0.95 });
    out += VT.dayDen({ x0: -100, y0: 400, x1: 760, y1: 470, n: 10, sag: 60, on: 1 }) + VT.dayDen({ x0: 760, y0: 470, x1: 2000, y1: 400, n: 12, sag: 70, on: 1 });
    [[420, "trang"], [1080, "trang"], [1560, "do"], [1760, "trang"]].forEach(function (c) { out += VT.gheNhua({ x: c[0], y: G + 4, s: 0.62, color: VT.GHE_MAU[c[1]] }); });
    out += VT.gheNhua({ x: CH[0], y: CH[1] + 4, s: 0.72, color: VT.GHE_MAU.xanh });
    return out;
  }
  shots.push({ a: S4, b: DUR, ten: "quảng trường chạng vạng: nhảy chân sáo, tung túi, ngồi phịch", ve: function (t, lt, T) {
    var out = square(t), o = { t: t, s: 0.62, sunhat: "coi", noPack: true, mouth: "smile", eyes: "happy" }, bag;
    var seat = CH[1] + 4 - 170 * 0.72;
    if (t < TOSS0) {
      var b = VT.buoc(t, WK); o.x = b.x; o.y = G; o.legs = b.walking ? "walk" : "stand"; o.phase = b.phase; o.stride = b.stride;
      if (t < WK.t0) { o.sq = 0.9; o.legs = "apart"; }
      if (b.walking) o.bob = -70 * Math.abs(Math.sin(Math.PI * b.phase * 2));
      o.armR = [340, 230]; o.handR = "nam";
    } else if (t < TOSS1 + 0.1) {
      var k = seg(t, TOSS0, TOSS1); o.x = 880; o.y = G; o.armR = [300, k < 0.5 ? 60 : 120]; o.handR = k < 0.15 || k > 0.85 ? "nam" : "xoe"; o.py = -14; o.eyes = null; o.mouth = "smile";
      var hp0 = VT.wobPt(o, 300, 60);
      bag = VT.hopCom({ x: hp0[0], y: hp0[1] - 10 - 260 * Math.sin(Math.PI * k), s: 0.5, rot: 360 * k });
    } else if (t < SIT) {
      var b2 = VT.buoc(t, WK2); o.x = b2.x; o.y = G; o.legs = b2.walking ? "walk" : "stand"; o.phase = b2.phase; o.stride = b2.stride; o.armR = [340, 230]; o.handR = "nam";
    } else {
      var p = seg(t, SIT, SIT + 0.25); o.x = CH[0]; o.y = VT.lerp(G - 40, seat + 82 * 0.62, VT.ease.bounce(p)); o.sq = p < 1 ? 1 - 0.1 * Math.sin(Math.PI * p) : 1; o.armR = t >= T_LUNCH - 0.1 ? [320, 110] : [340, 260]; o.handR = "nam"; o.eyes = "happy"; o.mouth = "content";
    }
    if (!bag) { var hp = VT.wobPt(o, o.armR[0], o.armR[1]); bag = VT.hopCom({ x: hp[0], y: hp[1] - 6, s: 0.5 }); }
    out += VT.wob(o) + bag;
    var cam = key(T, [[S4, [700, 700, 1.5]], [TOSS0, [880, 690, 1.55], "sine"], [SIT, [1150, 700, 1.6], "io"], [DUR, [1180, 700, 1.7], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
