/* d09 · vẽ tay · sương mù là điểm cộng: sơ đồ vịnh, nước sâu không đóng băng, ~52 mi tới Seward, chăn mây che cảng (27,0 s). Vào "giay", ra "chen".
 * Đồ: mũ len kem bông đỏ (lệch), khăn kem, kính râm, ba lô ô liu cuộn thảm đỏ; cầm tấm bìa mặt trời. Cụm mây đã bay lên làm "chăn".
 * Sơ đồ vẽ tay không đúng tỉ lệ, không biên giới. Máy bay vẽ đơn giản, không cờ, không ký hiệu; không đùa về quân đội, chiến tranh.
 * Chữ: deep, no ice, ~52 mi, Seward, Whittier.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, INK = VT.C.ink;
  var T_FOG0 = VT.tu("fog", 0), T_POINT = VT.tu("point."), T_ARMY = VT.tu("Army"), T_PORT0 = VT.tu("port", 0), T_IT = VT.tu("it.");
  var T_DEEP = VT.tu("deep"), T_FREEZE = VT.tu("freeze,"), T_SHIPS = VT.tu("ships"), T_YEAR = VT.tu("year.");
  var T_ACC = VT.tu("According"), T_SEW = VT.tu("Seward"), T_52 = VT.tu("fifty-two"), T_SAIL = VT.tu("sailing.");
  var T_AND = VT.tu("low") - 0.2, T_FOG2 = VT.tu("fog", 1), T_PLANES = VT.tu("planes."), T_AIR = VT.tu("air,"), T_BLANKET = VT.tu("blanket"), T_HARB = VT.tu("harbour.");
  var SEA = "#BFD9E2", LAND = "#E8D7AE", PAGE = "#F4EEDD";
  var WH = [945, 325], SW = [520, 735];
  var LAND_N = VT.smooth([[-300, -300], [2300, -300], [2300, 540], [1700, 590], [1320, 430], [945, 318], [1250, 520], [1520, 680], [1150, 720], [820, 690], [600, 700], [-300, 720]], true);
  var LAND_K = VT.smooth([[-300, 640], [760, 650], [1040, 790], [990, 960], [700, 1040], [600, 1040], [560, 880], [520, 735], [470, 880], [420, 1040], [-300, 1060]], true);
  var ROUTE_W = "M 1780 1010 C 1600 900 1480 800 1420 640 C 1360 520 1150 440 955 335";
  var ROUTE_S = "M 1780 1010 C 1500 1110 900 1120 640 1090 C 540 1070 520 960 520 750";
  function map(t) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#D9CDB4"/>' + VT.rectS(60, 40, 1860, 1120, PAGE, { sw: 6 });
    var id = VT.uid("mp");
    s += '<clipPath id="' + id + '"><rect x="70" y="50" width="1780" height="1060"/></clipPath><g clip-path="url(#' + id + ')">';
    var k = VT.ease.io(seg(t, T_POINT + 0.55, T_PORT0 - 0.6)); // nét mực vẽ dần bờ biển
    s += '<rect x="70" y="50" width="1780" height="1060" fill="' + SEA + '" opacity="' + f(0.25 + 0.75 * k) + '"/>';
    s += '<path d="' + LAND_N + '" fill="' + LAND + '" opacity="' + f(k) + '"/>' + '<path d="' + LAND_K + '" fill="' + LAND + '" opacity="' + f(k) + '"/>';
    s += VT.lineDraw(LAND_N, k, 7) + VT.lineDraw(LAND_K, k, 7);
    // núi vẽ tay trên đất
    if (k > 0.6) [[400, 300], [700, 180], [1250, 230], [1600, 300], [250, 860], [800, 820]].forEach(function (m) { s += VT.line("M " + (m[0] - 60) + " " + (m[1] + 40) + " L " + m[0] + " " + (m[1] - 40) + " L " + (m[0] + 60) + " " + (m[1] + 40), 5, "#8a7a5a", 0.8); });
    s += "</g>";
    var ka = VT.ease.back(seg(t, T_PORT0 - 0.1, T_PORT0 + 0.15));
    if (ka > 0) s += VT.anchor({ x: WH[0] - 20, y: WH[1] - 80, s: 0.42 * ka }) + VT.g("translate(" + (WH[0] - 20) + " 200) scale(" + f(ka) + ")", VT.text(0, 0, "Whittier", 60, { fill: "#2c4f6e" }));
    var ks = VT.ease.back(seg(t, T_SEW - 0.1, T_SEW + 0.15));
    if (ks > 0) s += VT.dot(SW[0], SW[1], 12, "#2c4f6e") + VT.g("translate(330 610) scale(" + f(ks) + ")", VT.text(0, 0, "Seward", 60, { fill: "#2c4f6e" }));
    return s;
  }
  function labelArrow(t, t0, x, y, dir, str) { // mũi tên vẽ tay + chữ
    var k = seg(t, t0 - 0.1, t0 + 0.3); if (k <= 0) return "";
    var d = dir === "down" ? "M " + x + " " + (y - 120) + " L " + x + " " + y : "M " + (x - 140) + " " + y + " L " + x + " " + y;
    var out = VT.lineDraw(d, k, 8, "#A8361F");
    if (k > 0.9) out += dir === "down" ? VT.line("M " + (x - 22) + " " + (y - 26) + " L " + x + " " + y + " L " + (x + 22) + " " + (y - 26), 8, "#A8361F") : VT.line("M " + (x - 26) + " " + (y - 22) + " L " + x + " " + y + " L " + (x - 26) + " " + (y + 22), 8, "#A8361F");
    if (k > 0) out += dir === "down" ? VT.text(x, y - 150, str, 58, { fill: "#A8361F" }) : VT.text(x - 220, y + 18, str, 58, { fill: "#A8361F", anchor: "end" });
    return out;
  }
  function ptOn(d, k) { var p = document.createElementNS ? null : null; return p; }
  // điểm trên đường biển Whittier (tham số hoá thô bằng các mốc)
  var PW = [[1780, 1010], [1600, 880], [1440, 700], [1360, 540], [1150, 440], [960, 340]];
  var PS = [[1780, 1010], [1500, 1100], [1100, 1110], [700, 1090], [560, 1040], [522, 900], [520, 760]];
  function along(pts, k) { return VT.alongPts(pts, VT.clamp(k, 0, 1)); }
  function wobSmall(t, x, y, s, o) {
    var b = { t: t, x: x, y: y, s: s, beanie: { rot: -14 }, scarf: "kem", packColor: "oliu", sunglasses: true, flip: 1, cold: true };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, VT.blink(t, 3.0, 0.2));
    return VT.wob(b);
  }

  VT.sfx("whoosh", 1.25, 0.6);
  VT.sfx("pop", T_PORT0, 0.45);
  VT.sfx("pop", T_DEEP, 0.45); VT.sfx("pop", T_FREEZE, 0.45);
  VT.sfx("ting", T_52, 0.5);
  VT.sfx("bonk", T_SAIL + 0.15, 0.55);
  VT.sfx("whoosh", T_FOG2 - 0.2, 0.4);

  var shots = [];
  // S0 · Wob đeo kính râm giơ bìa mặt trời chờ nắng; một đám mây thò tay giật tấm bìa
  var B0 = T_POINT + 0.55, GRAB = 1.25;
  shots.push({ a: 0, b: B0, ten: "mây giật mặt trời", ve: function (t, lt, T) {
    var G = 880, WX = 820;
    var s = VT.sky("#B9C3C6") + VT.ridge(560, 0) + '<rect x="-1200" y="700" width="4320" height="200" fill="#7E97A0"/>' + '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="#8A9488"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    var o = { s: 0.7, x: WX, y: G, beanie: { rot: -14 }, scarf: "kem", packColor: "oliu", sunglasses: true, cold: true, mouth: "smile", armR: [360, 30], handR: "nam" };
    var hand = VT.wobPt(o, 360, 30), card;
    var cloudX = key(t, [[0, 1700], [GRAB - 0.35, 1350, "out"], [GRAB + 0.6, 1800, "in2"]]), cloudY = 250;
    if (t < GRAB) card = [hand[0] + 10, hand[1] - 90];
    else { var kk = VT.ease.in2(seg(t, GRAB, GRAB + 0.6)); card = [VT.lerp(hand[0] + 10, cloudX - 120, kk), VT.lerp(hand[1] - 90, cloudY + 60, kk)]; }
    if (t >= GRAB) { o.armR = [360, 30]; o.handR = "xoe"; o.mouth = "o"; o.brows = "up"; o.marks = t < GRAB + 0.4 ? "shock" : null; }
    if (t > GRAB + 0.7) { o.mouth = "flat"; o.brows = "flat"; o.arms = "rest"; o.armR = null; o.handR = null; }
    var sunCard = VT.line("M " + f(card[0]) + " " + f(card[1] + 60) + " L " + f(card[0]) + " " + f(card[1] + 120), 8, "#8E5527") + VT.g("translate(" + f(card[0]) + " " + f(card[1]) + ")", (function () { var r = ""; for (var i = 0; i < 10; i++) { var a = i * Math.PI / 5; r += VT.line("M " + f(Math.cos(a) * 66) + " " + f(Math.sin(a) * 66) + " L " + f(Math.cos(a) * 96) + " " + f(Math.sin(a) * 96), 9, "#C9A46A"); } return r + VT.ell(0, 0, 62, 62, "#E8C25A", 6) + VT.ell(-20, -10, 6, 6, INK, 0) + VT.ell(20, -10, 6, 6, INK, 0) + VT.line("M -20 16 Q 0 30 20 16", 5); })());
    // tay mây: ống trắng viền mực từ đám mây tới tấm bìa
    var armEnd = t < GRAB - 0.35 ? [cloudX - 60, cloudY + 40] : t < GRAB ? [VT.lerp(cloudX - 60, card[0] + 40, seg(t, GRAB - 0.35, GRAB)), VT.lerp(cloudY + 40, card[1], seg(t, GRAB - 0.35, GRAB))] : [card[0] + 40, card[1]];
    var arm = VT.line("M " + f(cloudX - 60) + " " + f(cloudY + 30) + " Q " + f((cloudX + armEnd[0]) / 2) + " " + f(cloudY + 160) + " " + f(armEnd[0]) + " " + f(armEnd[1]), 30) + VT.line("M " + f(cloudX - 60) + " " + f(cloudY + 30) + " Q " + f((cloudX + armEnd[0]) / 2) + " " + f(cloudY + 160) + " " + f(armEnd[0]) + " " + f(armEnd[1]), 20, "#FFFFFF");
    s += VT.wob(o) + sunCard + arm + VT.ell(armEnd[0], armEnd[1], 22, 22, "#FFFFFF", 5) + VT.cloud({ x: cloudX, y: cloudY, s: 1.1, fill: "#F2F4F5" });
    return { cam: [key(T, [[0, 1000], [B0, 1060]]), 560, key(T, [[0, 1.2], [B0, 1.26]])], world: s, tint: "cold" };
  } });
  // S1 · sơ đồ: nét mực vẽ vịnh, neo nhỏ ở Whittier
  var B1 = T_DEEP - 0.6;
  shots.push({ a: B0, b: B1, ten: "sơ đồ vịnh, neo", ve: function (t, lt, T) {
    var z = key(T, [[B0, 1.0], [T_PORT0, 1.08, "sine"], [B1, 1.3, "io"]]), cx = key(T, [[B0, 960], [T_PORT0, 960], [B1, 1100, "io"]]), cy = key(T, [[B0, 580], [T_PORT0, 560], [B1, 520, "io"]]);
    return { cam: [cx, cy, z], world: map(t), tint: "warm" };
  } });
  // S2 · "deep", "no ice"; tàu vào, ra, vào; Wob nhỏ vẫy từ bờ
  var B2 = T_ACC - 0.1;
  shots.push({ a: B1, b: B2, ten: "nước sâu, không băng, tàu ra vào", ve: function (t, lt, T) {
    var s = map(t);
    s += labelArrow(t, T_DEEP, 1430, 700, "down", "deep") + labelArrow(t, T_FREEZE, 1390, 525, "right", "no ice");
    var kk = key(t, [[T_SHIPS - 0.3, 0.1], [T_SHIPS + 0.5, 0.85, "io"], [T_YEAR, 0.45, "io"], [B2, 0.9, "io"]]);
    var p = along(PW, kk), q = along(PW, kk + 0.02), back = t > T_SHIPS + 0.5 && t < T_YEAR;
    s += VT.ship({ x: p[0], y: p[1] + 10, s: 0.32, sx: (q[0] < p[0]) !== back ? 1 : -1 });
    var wv = Math.sin(VT.twos(t) * 12);
    s += wobSmall(t, 1150, 382, 0.22, { mouth: "smile", armR: [370 + wv * 30, 40], handR: "xoe" });
    return { cam: [key(T, [[B1, 1150], [B2, 1200]]), 560, key(T, [[B1, 1.3], [B2, 1.36]])], world: s, tint: "warm" };
  } });
  // S3 · hai đường biển; Wob nhỏ trên mũi tàu kéo thước dây, thước bật cuộn kẹp mũi; ~52 mi
  var SNAP = T_SAIL + 0.15, B3 = SNAP + 0.9;
  shots.push({ a: B2, b: B3, ten: "hai đường biển, thước dây kẹp mũi", ve: function (t, lt, T) {
    var s = map(t);
    s += VT.lineDraw(ROUTE_W, seg(t, B2, B2 + 1.0), 6, "#2c4f6e", { dash: "18 14" });
    s += VT.lineDraw(ROUTE_S, seg(t, T_SEW - 0.9, T_SEW + 0.2), 6, "#A8361F", { dash: "18 14" });
    // tàu với Wob ngồi mũi tàu, ở đoạn đường Seward phía nam
    var SX = 1200, SY = 1100, wob = { x: SX + 70, y: SY - 22, s: 0.24 };
    var pull = key(t, [[T_52 - 0.7, 0], [T_52 + 0.2, 1, "io"], [SNAP - 0.05, 1], [SNAP, 0, "in2"]]);
    var o = { legs: "sit", mouth: "content", brows: "up", px: -12, flip: -1 };
    if (pull > 0 && t < SNAP) { o.brows = "down"; o.mouth = "flat"; o.lean = 8; }
    if (t >= SNAP) { o.eyes = t < SNAP + 0.5 ? "squint" : "cross"; o.mouth = "wobbly"; o.brows = "worried"; o.noBlink = true; }
    var body = wobSmall(t, wob.x, wob.y + 22, wob.s, o);
    var nose = VT.wobPt({ x: wob.x, y: wob.y + 22, s: wob.s, flip: -1 }, 200, 190);
    var tapeBox = t >= SNAP ? [nose[0] - 4, nose[1] + 14] : [nose[0] - 26, nose[1] + 34];
    var tapeLen = 260 * pull;
    s += VT.ship({ x: SX, y: SY, s: 0.42, sx: -1 }) + body + VT.tape({ x: tapeBox[0], y: tapeBox[1], s: 0.16, rot: 180, len: tapeLen / 0.16, droop: 30 });
    if (t >= SNAP && t < SNAP + 0.25) s += VT.impact({ x: nose[0], y: nose[1], s: 0.25 });
    var kl = VT.ease.back(seg(t, T_52 - 0.05, T_52 + 0.2));
    if (kl > 0) s += VT.g("translate(" + f(nose[0] - 150) + " " + f(nose[1] - 70) + ") scale(" + f(0.55 * kl) + ")", VT.rectS(-120, -46, 120, 30, PAGE, { sw: 5 }) + VT.text(0, 12, "~52 mi", 56, { fill: "#A8361F" }));
    var z = key(T, [[B2, 0.98], [T_SEW + 0.3, 1.0], [T_52 - 0.3, 3.4, "io"], [B3, 3.6]]), cx = key(T, [[B2, 960], [T_SEW + 0.3, 960], [T_52 - 0.3, nose[0] - 80, "io"]]), cy = key(T, [[B2, 580], [T_SEW + 0.3, 600], [T_52 - 0.3, nose[1] - 30, "io"]]);
    return { cam: [cx, cy, z], shake: VT.shake(t, SNAP, 0.23, 6), world: s, tint: "warm" };
  } });
  // S4 · chăn mây kéo phủ bến cảng; máy bay giấy lượn, ngập ngừng, quay đi
  shots.push({ a: B3, b: D.thoi_luong, ten: "chăn mây che cảng", ve: function (t, lt, T) {
    var s = map(t);
    var kb = VT.ease.io(seg(t, T_FOG2 - 0.3, T_FOG2 + 0.9));
    var bx = VT.lerp(300, WH[0] + 60, kb);
    // chăn mây: dải mây dài, mép trước có "tay" kéo
    s += VT.g("translate(" + f(bx) + " " + f(WH[1] + 20) + ")", VT.shape(VT.smooth([[-520, 40], [-500, -40], [-380, -90], [-240, -70], [-120, -110], [20, -90], [140, -110], [260, -60], [300, 20], [200, 80], [0, 70], [-260, 90], [-460, 80]], true), "#F2F4F5", { sw: 6, ox: 5, oy: 4 }));
    // máy bay: vòng lượn quanh cảng, chậm lại, quay đi
    var ang = key(t, [[B3, -1.2], [T_AIR, 2.4], [T_BLANKET + 0.2, 3.3, "out"], [T_HARB, 3.6]]);
    var away = seg(t, T_BLANKET + 0.4, D.thoi_luong);
    var px = WH[0] + Math.cos(ang) * 360 + away * 900, py = 230 + Math.sin(ang) * 120 - away * 200;
    var dir = -Math.sin(ang) >= 0 ? 1 : -1; if (away > 0) dir = 1;
    s += VT.planeSimple({ x: px, y: py, s: 0.45, sx: dir, t: t, rot: away > 0 ? -12 : 0 });
    var py0 = Math.min(0, py - WH[1]); s += wobSmall(t, WH[0] + 170, WH[1] + 150, 0.24, { px: (px > WH[0] + 170 ? 14 : -14), py: -18, brows: "up", mouth: "oSmall" });
    if (t > T_AIR && t < T_BLANKET + 0.4) s += VT.glyph({ x: px, y: py - 90, s: 0.5, sym: "?" });
    return { cam: [key(T, [[B3, 960], [D.thoi_luong, 1000]]), key(T, [[B3, 520], [D.thoi_luong, 500]]), key(T, [[B3, 1.15], [D.thoi_luong, 1.22, "sine"]])], world: s, tint: "warm" };
  } });
  return shots;
};
