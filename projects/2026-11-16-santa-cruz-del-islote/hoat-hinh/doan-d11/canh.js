/* d11 · vẽ tay · chèn (185,054–199,529 s; 14,475 s). Vào "chen", ra "cat". Hồi ức, không khẩu hình.
 * 1) Hình to: đảo bên cạnh có đước + dải cát; bầy muỗi nhảy dưới quả cầu disco treo trên cành đước; Wob ló đầu sau bụi đước, ánh disco quét qua mặt ba lần.
 *    Gag: một con muỗi ra "quầy" gọi đồ uống, quầy là một vũng nước đọng.
 * 2) "Locals say": cắt về mép đảo tiệc, lướt sang hòn đảo xưa trơ trụi (không đước, không cát); Wob đứng mép đảo bên này; con muỗi chống nạnh lắc đầu.
 * 3) Bong bóng tưởng tượng: cửa bữa tiệc dán biển con muỗi gạch chéo (không chữ); bên trong Wob đội mũ tiệc vẫy tay; cửa khép.
 * 4) Con muỗi đội mũ tiệc gõ cửa, không ai mở, chờ, lẳng lặng tháo mũ.
 * Đồ Wob: mũ cói (đổi sang mũ tiệc chỉ trong bong bóng). Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU;
  var S2 = VT.nhip(1), S3 = VT.nhip(2), S4 = VT.nhip(3);
  var T_BEACH = VT.tu("beaches,"), T_BITE = VT.tu("biting"), T_NEI = VT.tu("neither,"), T_STAY = VT.tu("stayed"), T_THERE = VT.tu("there."), T_BITES = VT.tu("bites."), T_TOO = VT.tu("too.");
  var SEA = 820, BALL = [1450, 250], WP = [1110, SEA];
  var KNOCK = S4 + 0.2, HATOFF = T_TOO + 0.05;
  VT.sfx("muoi", 0.35, 0.55);
  VT.sfx("muoi", S2 + 0.1, 0.3);
  VT.sfx("bonk", KNOCK, 0.4);
  VT.sfx("bonk", KNOCK + 0.22, 0.35);

  function sky() { return '<rect x="-1200" y="-1200" width="4320" height="' + (1200 + SEA) + '" fill="#F7EED8"/>'; }
  function partyIsland(t) {
    var out = VT.shape("M 940 " + (SEA + 10) + " C 1000 " + (SEA - 40) + " 1950 " + (SEA - 40) + " 2400 " + (SEA + 10) + " Z", M.sand, { sw: 6 });
    out += VT.duoc({ x: 1150, y: SEA, s: 1.25, seed: 3 }) + VT.duoc({ x: 1800, y: SEA, s: 1.35, seed: 8 });
    out += VT.line("M 1760 330 C 1640 250 1540 240 " + BALL[0] + " " + BALL[1], 14, M.root) + VT.line("M 1760 330 C 1640 250 1540 240 " + BALL[0] + " " + BALL[1], 3, VT.C.ink, 0.7);
    out += VT.shape("M 1560 " + (SEA - 18) + " C 1560 " + (SEA - 40) + " 1760 " + (SEA - 40) + " 1760 " + (SEA - 18) + " C 1760 " + (SEA - 4) + " 1560 " + (SEA - 4) + " 1560 " + (SEA - 18) + " Z", "#8FA67A", { sw: 5 });
    return out;
  }
  function beams(t, under) {
    var out = "", th0 = 120 + 70 * t, cols = ["#E86FA0", "#F6D36A", "#7FD3E0", "#9BD27A"], c = [BALL[0], BALL[1] + 120];
    for (var i = 0; i < 4; i++) {
      var a = (th0 + i * 90) * Math.PI / 180, w = 0.13, L = 1100;
      out += '<path d="M ' + c[0] + " " + c[1] + " L " + VT.f(c[0] + L * Math.cos(a - w)) + " " + VT.f(c[1] + L * Math.sin(a - w)) + " L " + VT.f(c[0] + L * Math.cos(a + w)) + " " + VT.f(c[1] + L * Math.sin(a + w)) + ' Z" fill="' + cols[i] + '" opacity="0.32"/>';
    }
    return out;
  }
  function swarm(t) {
    var out = "", beat = Math.round(t * 12);
    for (var i = 0; i < 7; i++) {
      var a = i / 7 * Math.PI * 2 + t * 0.9, x = BALL[0] + 70 + 160 * Math.cos(a), y = 600 + 60 * Math.sin(a) - 26 * Math.abs(Math.sin(t * 7 + i));
      out += VT.muoi({ x: x, y: y, s: 0.8, t: t + i * 0.13, sx: (beat + i) % 4 < 2 ? 1 : -1, rot: (i % 2 ? 1 : -1) * 12 * Math.sin(t * 7 + i), eyes: "closed" });
    }
    var bar = t >= T_BEACH;
    out += VT.muoi({ x: 1610, y: SEA - 60, s: 0.85, t: t, pose: "dung", point: bar && t < T_BITE + 0.6, sx: 1 });
    return out;
  }
  function homeIsland() { return VT.daoNha({ x: 250, y: SEA, w: 720, seed: 31 }); }
  function W(o) {
    var b = { s: 0.75, sunhat: "coi", noPack: true, t: o.t };
    for (var k in o) b[k] = o[k];
    if (b.eyes == null) b.lid = Math.max(b.lid || 0, VT.blink(b.t, 3.0, 0.5));
    return VT.wob(b);
  }

  var shots = [];
  shots.push({ a: 0, b: S2, ten: "disco dưới cành đước, Wob ló đầu", ve: function (t, lt, T) {
    var out = sky() + homeIsland() + partyIsland(t) + VT.bien({ y: SEA, t: t, n: 20 });
    out += W({ t: t, x: WP[0], y: WP[1] - 4, s: 0.75, px: 12, py: -6, mouth: t < T_BITE ? "oSmall" : "flat", brows: t < T_BITE ? "up" : "skeptic", lean: 10 });
    out += VT.g("", ["", ""].join("")) + [[1000, 700, 90], [1070, 760, 80], [960, 800, 70]].map(function (b, i) { return VT.g("translate(" + b[0] + " " + b[1] + ")", VT.shape(VT.blob(b[2], 40 + i, 9, 0.25), i % 2 ? M.leafDark : M.leaf, { sw: 5 })); }).join("");
    out += VT.discoBall({ x: BALL[0], y: BALL[1], len: 60, r: 62, t: t }) + swarm(t) + beams(t);
    var cam = key(T, [[0, [1360, 560, 1.42]], [S2, [1340, 570, 1.5], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  shots.push({ a: S2, b: S3, ten: "đảo trơ trụi, muỗi lắc đầu", ve: function (t, lt, T) {
    var out = sky() + homeIsland() + partyIsland(t) + VT.bien({ y: SEA, t: t, n: 20 });
    out += VT.discoBall({ x: BALL[0], y: BALL[1], len: 60, r: 62, t: t }) + beams(t);
    var shake = t >= T_STAY - 0.1 && t < T_THERE + 0.4 ? 14 * Math.sin((t - T_STAY) * 22) : 0;
    out += VT.muoi({ x: 1010, y: SEA - 84, s: 1.45, t: t, pose: "hong", sx: -1, rot: shake, eyes: "smug" });
    var look = t >= T_NEI;
    out += W({ t: t, x: 540, y: SEA - 12, s: 0.6, px: look ? 12 : 0, py: -2, mouth: look ? "flat" : "content", brows: look ? "flat" : null });
    var cam = key(T, [[S2, [1080, 640, 1.5]], [S2 + 0.25, [1080, 640, 1.5]], [T_NEI, [700, 620, 1.12], "io3"], [S3, [700, 620, 1.16], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  // bong bóng: cửa bữa tiệc
  var DX = 960, DTOP = 380, G = 900;
  function facade(t, open) {
    var out = '<rect x="-1200" y="-1200" width="4320" height="' + (1200 + G) + '" fill="#F2C6A0"/>' + '<rect x="-1200" y="' + G + '" width="4320" height="1600" fill="' + M.cement + '"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    out += VT.shape("M " + (DX + 340) + " 420 l 260 0 l 0 220 l -260 0 Z", "#FFE6A0", { sw: 7 }) + VT.dayDen({ x0: DX + 350, y0: 450, x1: DX + 590, y1: 450, n: 6, sag: 30, on: 1 });
    out += VT.ell(DX + 420, 560, 30, 38, "#E86FA0", 4) + VT.ell(DX + 510, 540, 30, 38, "#7FD3E0", 4);
    out += noMozSign(DX + 225, 600, 0.85);
    out += VT.shape("M " + (DX - 130) + " " + G + " L " + (DX - 130) + " " + DTOP + " L " + (DX + 130) + " " + DTOP + " L " + (DX + 130) + " " + G + " Z", open ? "#FFE6A0" : "#7A5A3C", { sw: 8 });
    if (open) out += VT.dayDen({ x0: DX - 120, y0: DTOP + 40, x1: DX + 120, y1: DTOP + 40, n: 6, sag: 40, on: 1 });
    return out;
  }
  function noMozSign(x, y, s) {
    return VT.g(VT.tr(x, y, s, 0), VT.ell(0, 0, 70, 70, "#FFFDF6", 7) + VT.muoi({ x: -4, y: 4, s: 0.55, eyes: "open" }) + VT.line("M -48 48 L 48 -48", 12, M.red) + VT.ell(0, 0, 70, 70, "none", 10, { stroke: M.red }));
  }
  shots.push({ a: S3, b: S4, ten: "bong bóng: cửa tiệc, biển muỗi gạch chéo, Wob vẫy", ve: function (t, lt, T) {
    var close = seg(t, S4 - 0.45, S4 - 0.15), out = facade(t, close < 1);
    if (close < 1) {
      out += W({ t: t, x: DX, y: G - 10, s: 0.72, sunhat: false, mouth: "smile", eyes: "happy", armR: [330 + 40 * Math.sin(t * 14), 70], handR: "xoe", propFront: VT.muTiec({ x: 200, y: 50, s: 0.9, rot: -8 }) });
      out += VT.shape("M " + (DX + 130) + " " + G + " L " + (DX + 130) + " " + DTOP + " L " + VT.f(DX + 130 - 260 * close) + " " + DTOP + " L " + VT.f(DX + 130 - 260 * close) + " " + G + " Z", "#7A5A3C", { sw: 8 });
    }
    var cam = key(T, [[S3, [DX + 80, 620, 1.2]], [S4, [DX + 60, 630, 1.28], "sine"]]);
    return { cam: cam, world: out, over: VT.dreamFrame(t, { inset: 56 }), tint: "warm" };
  } });
  shots.push({ a: S4, b: DUR, ten: "muỗi gõ cửa, không ai mở, tháo mũ", ve: function (t, lt, T) {
    var out = facade(t, false);
    var knock = (t >= KNOCK - 0.05 && t < KNOCK + 0.1) || (t >= KNOCK + 0.17 && t < KNOCK + 0.32);
    var off = t >= HATOFF;
    out += VT.muoi({ x: DX + 290, y: 800, s: 1.6, t: t, sx: -1, point: knock, hat: off ? "tiec-tay" : "tiec", eyes: off ? "closed" : "open", py: t > KNOCK + 0.6 ? -4 : 0, rot: off ? 8 : 0 });
    if (t >= KNOCK && t < KNOCK + 0.6) out += VT.knockLines({ x: DX + 140, y: 780, k: seg(t, KNOCK, KNOCK + 0.6) });
    var cam = key(T, [[S4, [DX + 160, 640, 1.5]], [DUR, [DX + 170, 650, 1.62], "sine"]]);
    return { cam: cam, world: out, over: VT.dreamFrame(t, { inset: 56 }), tint: "warm" };
  } });
  return shots;
};
