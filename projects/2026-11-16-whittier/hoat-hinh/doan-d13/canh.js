/* d13 · vẽ tay · cả thị trấn trong một hành lang; trường học qua đường hầm; đôi ủng nhẹ nhõm (17,93 s). Vào "chen", ra "giay".
 * Đồ: đồ ngủ sọc, dép lê, ba lô ô liu cuộn thảm đỏ, ôm giỏ đồ giặt (đặt xuống ở mặt cắt). Chữ: CHURCH, CITY OFFICES, SCHOOL.
 * Người que học sinh: dạng chung, không mặt.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, G = 860, WS = 0.6;
  var T_CHURCH = VT.tu("church"), T_CITY = VT.tu("city"), T_PLAY = VT.tu("playground."), T_THINK = VT.tu("Think"), T_LOBBY = VT.tu("lobby."), T_TOWN = VT.tu("town");
  var T_SCHOOL = VT.tu("school?"), T_ROAD = VT.tu("road,"), T_CHILD = VT.tu("children"), T_TUNNEL = VT.tu("tunnel"), T_BOOTS = VT.tu("boots"), T_CLOSET = VT.tu("closet."), T_REL = VT.tu("relieved.");
  var WALL = "#E6DCC6", FLOOR = "#B9A98A";
  function W(t, o) {
    var b = { t: t, s: WS, pajama: true, shoes: "dep", packColor: "oliu", flip: 1 };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 3.0, 0.4));
    return VT.wob(b);
  }
  function carry(o) { o.armR = [372, 250]; o.handR = "nam"; var p = VT.wobPt(o, 380, 390); return VT.basket({ x: p[0], y: p[1], s: 0.7 * WS / 0.6 }); }
  function sign(x, y, str, k, w) {
    if (k <= 0) return "";
    return VT.g("translate(" + x + " " + y + ") scale(" + VT.f(VT.ease.back(k)) + ")", VT.rectS(-w / 2, -44, w / 2, 40, "#FFFDF6", { sw: 6 }) + VT.text(0, 18, str, 54, { fill: "#2c4f6e" }));
  }
  function door(x, k, kind) { // cửa bật mở: k 0..1
    var s = VT.rectS(x - 120, G - 360, x + 120, G, "#5C4A3A", { sw: 6 });
    if (kind === "church") s = VT.shape("M " + (x - 120) + " " + G + " L " + (x - 120) + " " + (G - 280) + " C " + (x - 120) + " " + (G - 420) + " " + (x + 120) + " " + (G - 420) + " " + (x + 120) + " " + (G - 280) + " L " + (x + 120) + " " + G + " Z", "#5C4A3A", { sw: 6 });
    var w = 240 * (1 - 0.8 * VT.ease.back(k));
    var leaf = kind === "church" ? VT.shape("M " + (x - 120) + " " + G + " L " + (x - 120) + " " + (G - 280) + " C " + (x - 120) + " " + (G - 400) + " " + (x - 120 + w) + " " + (G - 400) + " " + (x - 120 + w) + " " + (G - 280) + " L " + (x - 120 + w) + " " + G + " Z", "#A87A4E", { sw: 6 })
      : VT.rectS(x - 120, G - 360, x - 120 + w, G, "#A0B4BE", { sw: 6 });
    if (k > 0.1) s += kind === "church" ? '<path d="M ' + (x - 100) + " " + G + " L " + (x - 100) + " " + (G - 270) + " C " + (x - 100) + " " + (G - 380) + " " + (x + 100) + " " + (G - 380) + " " + (x + 100) + " " + (G - 270) + " L " + (x + 100) + " " + G + ' Z" fill="#FFE6A0" opacity="' + VT.f(0.8 * k) + '"/>' : '<rect x="' + (x - 100) + '" y="' + (G - 340) + '" width="200" height="340" fill="#FFE6A0" opacity="' + VT.f(0.7 * k) + '"/>';
    return s + leaf;
  }
  function slide(x, k, s) { // cầu trượt bật ra
    if (k <= 0) return "";
    var inner = VT.line("M -120 0 L -120 -300", 10) + VT.line("M -60 0 L -60 -300", 10) + VT.line("M -120 -100 L -60 -100 M -120 -200 L -60 -200", 7) +
      VT.shape("M -60 -300 L -30 -300 C 60 -200 120 -40 200 -10 L 200 10 C 110 -10 40 -170 -60 -270 Z", "#E2B33C", { sw: 6 });
    return VT.g("translate(" + x + " " + G + ") scale(" + VT.f((s || 1) * VT.ease.back(k)) + ")", inner);
  }
  function corridor(t) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + WALL + '"/>' + '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="' + FLOOR + '"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    for (var x = -400; x < 2600; x += 120) s += VT.line("M " + x + " " + (G - 600) + " L " + x + " " + G, 2, VT.C.ink, 0.12);
    s += door(420, seg(t, T_CHURCH - 0.05, T_CHURCH + 0.2), "church") + sign(420, G - 470, "CHURCH", seg(t, T_CHURCH - 0.05, T_CHURCH + 0.2), 300);
    s += door(1050, seg(t, T_CITY - 0.05, T_CITY + 0.2), "office") + sign(1050, G - 450, "CITY OFFICES", seg(t, T_CITY - 0.05, T_CITY + 0.2), 470);
    s += slide(1560, seg(t, T_PLAY - 0.05, T_PLAY + 0.25), 1);
    return s;
  }

  VT.sfx("pop", T_CHURCH, 0.45); VT.sfx("pop", T_CITY, 0.45); VT.sfx("pop", T_PLAY, 0.5);
  VT.sfx("whoosh", T_THINK - 0.1, 0.45);
  VT.sfx("bonk", T_TOWN + 0.6, 0.45);
  VT.sfx("ting", T_REL, 0.35);

  var shots = [];
  // S0 · hành lang: cửa nhà thờ, văn phòng, cầu trượt bật ra lần lượt; Wob ôm giỏ đồ đi ngang
  var B0 = T_THINK - 0.15;
  var WK = { t0: 0, t1: B0 + 0.4, x0: 120, x1: 1500, chuKy: 0.62, s: WS };
  shots.push({ a: 0, b: B0, ten: "hành lang bật cửa", ve: function (t, lt, T) {
    var wk = VT.buoc(t, WK), o = { s: WS, x: wk.x, y: G, legs: "walk", phase: wk.phase, stride: wk.stride, px: 10, mouth: "content" };
    var near = [T_CHURCH, T_CITY, T_PLAY].some(function (q) { return t > q && t < q + 0.5; });
    if (near) { o.eyes = "wide"; o.mouth = "o"; o.px = 0; o.py = -10; }
    var bk = carry(o);
    var out = corridor(t) + W(t, o) + bk;
    return { cam: [key(T, [[0, 640], [B0, 1300]]), G - 300, key(T, [[0, 1.3], [B0, 1.25]])], world: out, tint: "warm" };
  } });
  // S1 · sảnh chung cư nhồi tới trần: hộp thư, kệ hàng, chuông nhà thờ, cầu trượt; Wob chen giữa, giỏ đồ kẹt
  var B1 = T_SCHOOL - 0.2, STUCK = T_TOWN + 0.6;
  shots.push({ a: B0, b: B1, ten: "cả thị trấn trong sảnh", ve: function (t, lt, T) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + WALL + '"/>' + '<rect x="-1200" y="' + G + '" width="4320" height="900" fill="' + FLOOR + '"/>' + VT.line("M -1200 " + G + " L 3100 " + G, 6);
    s += VT.rectS(500, 160, 1420, 190, "#CFC3A8", { sw: 6 }); // trần sảnh
    var k = function (i) { return seg(t, B0 + 0.15 + i * 0.35, B0 + 0.4 + i * 0.35); };
    // 1 hộp thư (bưu điện)
    if (k(0) > 0) { var mb = ""; for (var i = 0; i < 4; i++) for (var j = 0; j < 3; j++) mb += VT.rectS(i * 60, j * 56, i * 60 + 54, j * 56 + 50, "#C9A46A", { sw: 4 }) + VT.dot(i * 60 + 44, j * 56 + 26, 4);
      s += VT.g("translate(540 " + (G - 180) + ") scale(" + VT.f(VT.ease.back(k(0))) + ")", mb); }
    // 2 kệ hàng
    if (k(1) > 0) { var sh = VT.rectS(0, 0, 220, 420, "#C68A55", { sw: 6 }); [100, 200, 300].forEach(function (y, n) { sh += VT.line("M 0 " + y + " L 220 " + y, 6); for (var q = 0; q < 4; q++) sh += VT.rectS(14 + q * 50, y - 60, 52 + q * 50, y - 4, ["#E04A3A", "#9CC8DC", "#E2B33C", "#7C8646"][(q + n) % 4], { sw: 3 }); });
      s += VT.g("translate(1180 " + (G - 420) + ") scale(" + VT.f(VT.ease.back(k(1))) + ")", sh); }
    // 3 chuông nhà thờ treo trần
    if (k(2) > 0) { var sw = Math.sin(VT.twos(t) * 6) * 10; s += VT.g("translate(820 190) rotate(" + VT.f(sw) + ") scale(" + VT.f(VT.ease.back(k(2))) + ")", VT.line("M 0 0 L 0 60", 6) + VT.shape("M -70 170 C -60 90 -40 60 0 60 C 40 60 60 90 70 170 Z", "#E2B33C", { sw: 6 }) + VT.dot(0, 182, 14)); }
    // 4 cầu trượt chạm trần
    s += slide(1360, k(3), 1.05);
    var o = { s: WS, x: 960, y: G, px: 0, py: -12, brows: "up", mouth: "oSmall", sq: 0.96 };
    var bk;
    if (t >= STUCK) { // giỏ kẹt giữa kệ và hộp thư, Wob giật
      var tug = Math.sin(VT.twos(t) * 18) * (t < STUCK + 0.8 ? 1 : 0);
      o.lean = -10 + tug * 4; o.brows = "down"; o.mouth = "wobbly"; o.px = 14; o.marks = "sweat";
      o.armL = [330, 290]; o.armR = [380, 290]; o.handL = o.handR = "nam";
      var bp = VT.wobPt(o, 400, 380); bk = VT.basket({ x: 1130 + tug * 4, y: G - 10, s: 0.85, rot: -8 });
    } else bk = carry(o);
    s += W(t, o) + bk;
    if (t >= STUCK && t < STUCK + 0.25) s += VT.impact({ x: 1140, y: G - 120, s: 0.45 });
    return { cam: [960, G - 360, key(T, [[B0, 1.3], [B1, 1.4]])], world: s, shake: VT.shake(t, STUCK, 0.25, 6), tint: "warm" };
  } });
  // S2 · lùi ra mặt cắt: tuyết bay ngang trên mặt đất, hầm sáng ấm bên dưới, người que học sinh đi qua; Wob đặt giỏ, vẫy
  var B2 = T_BOOTS - 0.25, GS = 560, TY0 = 630, TY1 = 900;   // mặt đất 560; hầm 630–900
  shots.push({ a: B1, b: B2, ten: "mặt cắt: hầm tới trường", ve: function (t, lt, T) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#C3CCCF"/>';
    s += VT.towerWall({ x: 160, y: GS, w: 560, h: 1300, cols: 4, rows: 12, lit: 0.5 });
    // trường học bên kia đường
    s += VT.rectS(1300, GS - 300, 1880, GS, "#C98F6A", { sw: 7 }) + VT.shape("M 1270 " + (GS - 300) + " L 1590 " + (GS - 420) + " L 1910 " + (GS - 300) + " Z", "#7A4A3A", { sw: 7 });
    for (var i = 0; i < 4; i++) s += VT.rectS(1340 + i * 130, GS - 230, 1420 + i * 130, GS - 150, VT.C.window, { sw: 4 });
    s += sign(1590, GS - 340, "SCHOOL", seg(t, T_SCHOOL - 0.1, T_SCHOOL + 0.15), 300);
    s += '<rect x="-1200" y="' + GS + '" width="4320" height="1200" fill="#8C7A62"/>' + VT.line("M -1200 " + GS + " L 3100 " + GS, 6);
    s += VT.rectS(-1200, GS - 30, 3100, GS, VT.C.snow, { sw: 5 }); // mặt đường tuyết
    // đường hầm sáng ấm
    s += VT.rectS(380, TY0, 1500, TY1, "#F6D99A", { sw: 7 });
    for (var x = 440; x < 1500; x += 160) s += VT.ell(x, TY0 + 18, 16, 8, "#FFF3C8", 3);
    // trục đứng (thang) nối hai bên
    s += VT.rectS(380, GS, 440, TY0, "#E9C98A", { sw: 5 }) + VT.rectS(1440, GS, 1500, TY0, "#E9C98A", { sw: 5 });
    var kc = seg(t, T_CHILD - 0.2, T_CHILD + 0.2);
    if (kc > 0) [0, 1, 2].forEach(function (n) {
      var x = 760 + ((t - T_CHILD + 0.2) * 150 + n * 240) % 700, ph = (t * 1.6 + n * 0.3) % 1;
      s += '<g opacity="' + VT.f(kc) + '">' + VT.rectS(x - 40, TY1 - 150, x - 10, TY1 - 96, "#7C8646", { sw: 3 }) + VT.stickPerson({ x: x, y: TY1 - 4, s: 0.72, phase: ph }) + "</g>";
    });
    // tuyết bay ngang trên mặt đất
    s += VT.rain(t, 40, [-400, 40, 2300, GS - 40], { slant: 600, speed: 300, len: 14, sw: 6, col: "#FFFFFF", op: 0.9 });
    // Wob ở đầu hầm (dưới chân toà nhà), giỏ đồ đặt xuống
    var o = { s: 0.56, x: 560, y: TY1, px: 14, py: 0, brows: "up", mouth: "smile" };
    if (t > T_TUNNEL) { var wv = Math.sin(VT.twos(t) * 12); o.armR = [380 + wv * 30, 60]; o.handR = "xoe"; }
    s += VT.basket({ x: 470, y: TY1, s: 0.6 }) + VT.wob({ t: t, s: 0.56, x: 560, y: TY1, pajama: true, shoes: "dep", packColor: "oliu", px: o.px, py: o.py, brows: o.brows, mouth: o.mouth, armR: o.armR, handR: o.handR, lid: VT.blink(t, 3, 0.3) });
    var z = key(T, [[B1, 0.92], [B2, 0.96]]);
    return { cam: [960, 520, z], world: s, tint: "cold" };
  } });
  // S3 · tủ để đồ: cửa hé, đôi ủng ngả lưng vào nhau thở phào; giữ hình
  shots.push({ a: B2, b: D.thoi_luong, ten: "ủng nhẹ nhõm", ve: function (t, lt, T) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="' + WALL + '"/>';
    s += VT.rectS(660, 160, 1260, 920, "#3b332c", { sw: 8 }) + VT.line("M 700 300 L 1220 300", 8, "#8E5527");
    s += VT.line("M 820 300 L 820 360 M 1100 300 L 1100 360", 4) + VT.shape("M 790 360 L 850 360 L 840 480 L 800 480 Z", "#E2B33C", { sw: 4 });
    var rel = VT.ease.io(seg(t, T_REL - 0.1, T_REL + 0.35));
    s += VT.boots({ x: 880, y: 900, s: 1.1, relieved: rel });
    if (rel > 0.3) { var pk = seg(t, T_REL, T_REL + 0.7); [[800, -1], [960, 1]].forEach(function (b) { var x = b[0], y = 700 - 120 * pk; s += VT.lineDraw("M " + x + " 700 C " + (x + b[1] * 40) + " 650 " + (x - b[1] * 30) + " 600 " + (x + b[1] * 20) + " 540", pk, 8, "#FFFFFF", { op: 0.9 }); }); }
    var open = key(t, [[B2, 0.5], [T_CLOSET, 0.78, "io"]]);
    s += VT.shape("M 1260 160 L " + VT.f(1260 - 600 * (1 - open)) + " 190 L " + VT.f(1260 - 600 * (1 - open)) + " 890 L 1260 920 Z", "#C68A55", { sw: 7 });
    s += VT.ell(1260 - 600 * (1 - open) + 30, 560, 10, 10, "#E2B33C", 4);
    return { cam: [key(T, [[B2, 1000], [D.thoi_luong, 970]]), 620, key(T, [[B2, 1.35], [T_REL, 1.55, "io"], [D.thoi_luong, 1.62]])], world: s, tint: "warm" };
  } });
  return shots;
};
