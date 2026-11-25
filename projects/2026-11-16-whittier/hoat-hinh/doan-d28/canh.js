/* d28 · vẽ tay · sơ đồ tóm lập luận trên mặt sau tờ lịch (18,17 s; lời mới "The back of the timetable was blank, so I drew the whole story on it."). Vào "giay", ra "cat".
 * Đồ: mũ lưỡi trai xanh băng, không áo mưa, ba lô ô liu cuộn thảm đỏ, ủng cao su; ngồi xe mui trần ở bãi chờ đêm hè; tờ lịch trên vô lăng, bút chì.
 * Không chữ (chu_tren_do_vat rỗng). Máy bay không cờ, không ký hiệu.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f;
  var T_BACK = VT.tu("back"), T_PORT = VT.tu("port"), T_SHIPS = VT.tu("ships"), T_PLANES = VT.tu("planes"), T_SEE = VT.tu("see.");
  var T_FOG = VT.tu("fog"), T_TUN = VT.tu("tunnel"), T_ARMY = VT.tu("Army"), T_BUILD = VT.tu("building"), T_TOWN = VT.tu("town.");
  var T_WEATH = VT.tu("weather"), T_ROOF = VT.tu("roof"), T_SENS = VT.tu("sensible");
  // vị trí trên tờ giấy (thế giới tờ lịch, 1920×1080)
  var P = { anchor: [360, 360], plane: [420, 700], cloud: [800, 330], gate: [1230, 470], tower: [1600, 860], rain: [1600, 380] };
  function arrow(a, b, k, bend) {
    var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - (bend || 60);
    var d = "M " + f(a[0]) + " " + f(a[1]) + " Q " + f(mx) + " " + f(my) + " " + f(b[0]) + " " + f(b[1]);
    var out = VT.lineDraw(d, k, 8);
    if (k > 0.92) { var an = Math.atan2(b[1] - my, b[0] - mx); [-0.5, 0.5].forEach(function (q) { out += VT.line("M " + f(b[0]) + " " + f(b[1]) + " l " + f(-Math.cos(an + q) * 34) + " " + f(-Math.sin(an + q) * 34), 8); }); }
    return out;
  }
  function pop(t, t0) { return VT.ease.back(seg(t, t0 - 0.05, t0 + 0.2)); }
  function sheet(t) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#2E3B55"/>';
    s += VT.timetable({ x: 960, y: 560, w: 1700, h: 1000, back: true });
    var k;
    // nét chì phác mờ của cái neo, vẽ dần từ "drew" tới "port" (tờ giấy trống không đứng im)
    s += VT.lineDraw("M 360 262 C 334 262 334 300 360 300 C 386 300 386 262 360 262 M 360 300 L 360 440 M 318 330 L 402 330 M 284 392 Q 300 452 360 446 Q 420 452 436 392",
      seg(t, VT.tu("drew") - 0.05, T_PORT - 0.1), 5, "#7d7a72", { op: 0.55 });
    if ((k = pop(t, T_PORT)) > 0) s += VT.anchor({ x: P.anchor[0], y: P.anchor[1], s: 0.95 * k });
    if ((k = seg(t, T_SHIPS, T_SHIPS + 0.8)) > 0) s += VT.ship({ x: VT.lerp(160, 300, k), y: 520, s: 0.5 }) + VT.line("M 120 545 C 220 535 330 555 440 545", 5, "#2c4f6e");
    if ((k = pop(t, T_PLANES)) > 0) s += VT.planeSimple({ x: P.plane[0], y: P.plane[1], s: 1.15 * k, t: t, blind: seg(t, T_SEE - 0.1, T_SEE + 0.15) });
    s += arrow([480, 330], [640, 330], seg(t, T_FOG - 0.25, T_FOG + 0.15));
    if ((k = pop(t, T_FOG + 0.1)) > 0) s += VT.cloud({ x: P.cloud[0], y: P.cloud[1], s: 0.75 * k, fill: "#E8EEF0" });
    s += arrow([940, 350], [1080, 400], seg(t, T_TUN - 0.25, T_TUN + 0.15), 40);
    if ((k = pop(t, T_TUN + 0.1)) > 0) s += VT.tunnelGate({ x: P.gate[0], y: P.gate[1], s: 0.42 * k });
    s += arrow([1330, 420], [1530, 560], seg(t, T_BUILD - 0.3, T_BUILD + 0.1), 30);
    if ((k = pop(t, T_TOWN)) > 0) s += VT.towerWall({ x: P.tower[0], y: P.tower[1], w: 200 * k, h: 300 * k, cols: 3, rows: 7, lit: 0.6 });
    if ((k = pop(t, T_WEATH)) > 0) {
      s += VT.cloud({ x: P.rain[0], y: P.rain[1], s: 0.8 * k, fill: "#9AA7AE" });
      if (k >= 1) s += VT.rain(t, 14, [1470, 420, 1730, 540], { slant: 10, speed: 500, len: 26, sw: 5, col: "#2c4f6e", op: 0.8 });
    }
    return s;
  }
  function pencilAt(t) { // ngòi chì theo vật đang vẽ, tay Wob ở mép dưới phải
    var tip = t < T_PLANES ? P.anchor : t < T_FOG ? P.plane : t < T_TUN ? P.cloud : t < T_BUILD ? P.gate : t < T_WEATH ? P.tower : P.rain;
    var wig = Math.sin(VT.twos(t) * 13) * 10;
    var tp = [tip[0] + 60 + wig, tip[1] + 60], hand = [tp[0] + 260, tp[1] + 300];
    return VT.pencilTo(hand, tp, { s: 1.1 }) + VT.ell(hand[0], hand[1], 26, 26, "#1f2326", 0) + VT.ell(hand[0], hand[1], 22, 22, VT.WOB_COLORS.ink, 0);
  }
  function W(t, o) {
    var b = { t: t, s: 0.62, cap: true, packColor: "oliu", shoes: "ung", flip: 1 };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 3.1, 0.6));
    return VT.wob(b);
  }
  var CX = 960, CY = 900;  // xe
  function carScene(t, o, extra) {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#24304A"/>';
    [[200, 120], [700, 60], [1300, 140], [1750, 80], [-300, 90], [2300, 110]].forEach(function (p, i) { s += VT.dot(p[0], p[1], 4 + (i % 2) * 2, "#F6EEDC"); });
    s += VT.shape("M -1300 700 C -600 380 0 420 500 560 C 900 330 1500 360 2100 560 C 2600 430 3000 500 3200 600 L 3200 1200 L -1300 1200 Z", "#2F4A3A", { sw: 6 });
    s += '<rect x="-1200" y="760" width="4320" height="140" fill="#3B5A3F"/>' + '<rect x="-1200" y="900" width="4320" height="900" fill="#3A3F45"/>' + VT.line("M -1200 900 L 3100 900", 6) + VT.line("M -1200 1000 L 3100 1000", 5, "#E2B33C", 0.8);
    s += VT.signal({ x: 300, y: 900, s: 0.9, state: "red" }) + VT.tunnelGate({ x: 1650, y: 900, s: 0.7 });
    s += VT.convertible({ x: CX, y: CY, s: 1.15, part: "back", color: "#B04A3A" });
    var wo = { x: CX - 90, y: CY - 120, s: 0.62 };
    for (var k in o) wo[k] = o[k];
    s += W(t, wo);
    s += VT.convertible({ x: CX, y: CY, s: 1.15, part: "front", color: "#B04A3A" });
    // vô lăng + tờ lịch
    s += VT.line("M " + (CX + 230) + " " + (CY - 170) + " L " + (CX + 260) + " " + (CY - 130), 10) + VT.ell(CX + 220, CY - 190, 54, 20, "none", 8);
    return s + (extra || "");
  }

  VT.sfx("whoosh", T_BACK, 0.35);
  VT.sfx("pop", T_PORT, 0.45); VT.sfx("pop", T_PLANES, 0.4); VT.sfx("bonk", T_SEE, 0.35);
  VT.sfx("pop", T_FOG + 0.1, 0.5); VT.sfx("pop", T_TUN + 0.1, 0.5); VT.sfx("pop", T_TOWN, 0.45); VT.sfx("pop", T_WEATH, 0.4);
  VT.sfx("ting", T_ROOF, 0.4);

  var shots = [];
  // S0 · trong xe ở bãi chờ đêm hè: tay cầm bút chì, lật tờ lịch sang mặt sau
  var B0 = VT.tu("drew") - 0.1;   // "so I drew…": cắt sang tờ giấy trống, ngòi chì đã chạm mặt sau
  shots.push({ a: 0, b: B0, ten: "Wob lật tờ lịch", ve: function (t, lt, T) {
    var o = { px: 12, py: 14, brows: "up", mouth: "content", armR: [420, 230], handR: "nam" };
    var flip = seg(t, T_BACK - 0.1, T_BACK + 0.3);
    var hp = VT.wobPt({ x: CX - 90, y: CY - 120, s: 0.62 }, 420, 230);
    var tt = VT.timetable({ x: CX + 250, y: CY - 300, w: 220, h: 280, rot: 8, sx: Math.cos(Math.PI * flip) || 0.01, back: flip > 0.5, lines: 6 });
    var pen = VT.pencilTo([hp[0], hp[1]], [hp[0] + 70, hp[1] - 60], { s: 0.6 });
    var s = carScene(t, o, tt + pen);
    return { cam: [CX + 20, CY - 260, key(T, [[0, 1.35], [B0, 1.48]])], world: s, tint: "cold" };
  } });
  // S1 · tờ giấy (bắt đầu trống, bút chì đang vẽ): neo, tàu, máy bay bịt mắt; mũi tên → mây → cổng hầm
  var B1 = T_ARMY - 0.15;
  shots.push({ a: B0, b: B1, ten: "sơ đồ: cảng, máy bay, mây, hầm", ve: function (t, lt, T) {
    var cx = key(T, [[B0, 520], [T_SEE + 0.7, 560], [T_FOG, 760, "io"], [B1, 900]]), cy = key(T, [[B0, 480], [T_SEE + 0.7, 520], [T_FOG, 420, "io"]]);
    var z = key(T, [[B0, 1.45], [T_SEE + 0.7, 1.5], [T_FOG, 1.2, "io"], [B1, 1.25]]);
    return { cam: [cx, cy, z], world: sheet(t) + pencilAt(t), tint: "warm" };
  } });
  // S2 · cận mặt Wob trên vô lăng, gật theo mũi tên
  var B2 = T_BUILD - 0.35;
  shots.push({ a: B1, b: B2, ten: "Wob gật gù", ve: function (t, lt, T) {
    var nod = Math.max(0, Math.sin(VT.twos(t) * 9)) * 6;
    var o = { px: 14, py: 16, brows: "flat", mouth: "content", lean: 6 + nod, armR: [380, 250], handR: "nam", lid: 0.2 };
    var s = carScene(t, o, VT.timetable({ x: CX + 250, y: CY - 300, w: 220, h: 280, rot: 8, back: true }));
    var c = VT.wobPt({ x: CX - 90, y: CY - 120, s: 0.62, lean: 6 }, 210, 170);
    return { cam: [c[0] + 40, c[1] + 20, key(T, [[B1, 2.3], [B2, 2.45, "sine"]])], world: s, tint: "cold" };
  } });
  // S3 · về tờ giấy: mũi tên → toà 14 tầng → mây mưa phủ toà nhà
  var B3 = T_ROOF - 0.5;
  shots.push({ a: B2, b: B3, ten: "sơ đồ: toà nhà, mây mưa", ve: function (t, lt, T) {
    var z = key(T, [[B2, 1.35], [B3, 1.3]]);
    return { cam: [key(T, [[B2, 1350], [B3, 1400]]), key(T, [[B2, 600], [T_WEATH, 560, "io"]]), z], world: sheet(t) + pencilAt(t), tint: "warm" };
  } });
  // S4 · Wob đội mái nhà vẽ tay lên đầu, tỉnh bơ; giữ hình
  shots.push({ a: B3, b: D.thoi_luong, ten: "Wob đội mái nhà", ve: function (t, lt, T) {
    var o = { px: 14, py: -2, brows: "flat", mouth: "smirk", lid: 0.35, noBlink: t > T_SENS };
    var wo = { x: CX - 90, y: CY - 120, s: 0.62 };
    var put = VT.ease.out(seg(t, T_ROOF - 0.3, T_ROOF));
    if (put < 1) { o.arms = "up"; o.mouth = "content"; o.lid = 0; }
    var top = VT.wobPt(wo, 200, 62), ry = VT.lerp(top[1] - 200, top[1] + 4, put);
    var X = top[0], roofSvg = VT.rectS(X + 40, ry - 130, X + 80, ry - 50, "#C98F6A", { sw: 6 }) + VT.rectS(X + 32, ry - 142, X + 88, ry - 126, "#8E5527", { sw: 5 }) +
      VT.shape("M " + f(X - 150) + " " + f(ry) + " L " + f(X - 70) + " " + f(ry - 100) + " L " + f(X + 70) + " " + f(ry - 100) + " L " + f(X + 150) + " " + f(ry) + " Z", "#A8553E", { sw: 7 }) +
      VT.line("M " + f(X - 110) + " " + f(ry - 34) + " L " + f(X + 110) + " " + f(ry - 34) + " M " + f(X - 90) + " " + f(ry - 66) + " L " + f(X + 90) + " " + f(ry - 66), 4, VT.C.ink, 0.45);
    var drops = t > T_ROOF + 0.2 ? VT.rain(t, 16, [top[0] - 260, top[1] - 420, top[0] + 260, top[1] + 120], { slant: 8, speed: 700, len: 30, sw: 5, col: "#7FA6C0", op: 0.8 }) : "";
    var s = carScene(t, o, VT.timetable({ x: CX + 250, y: CY - 300, w: 220, h: 280, rot: 8, back: true }) + roofSvg + drops);
    if (t >= T_ROOF && t < T_ROOF + 0.2) s += VT.impact({ x: top[0], y: top[1] - 10, s: 0.4 });
    var c = VT.wobPt(wo, 200, 120);
    return { cam: [c[0] + 30, c[1] - 10, key(T, [[B3, 1.7], [D.thoi_luong, 1.85, "sine"]])], world: s, tint: "cold" };
  } });
  return shots;
};
