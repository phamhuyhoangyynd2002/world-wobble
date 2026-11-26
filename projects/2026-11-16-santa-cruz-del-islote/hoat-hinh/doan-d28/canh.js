/* d28 · vẽ tay · chèn (507,18–535,28 s; 28,1 s). Vào "chen", ra "cat". Hồi ức, không khẩu hình.
 * Nhìn qua vai Wob (mũ cói + đầu Wob làm tiền cảnh trái dưới, lớp over) xuống trang sổ: chấm đảo ở giữa, các đường nét đứt màu khác nhau toả ra.
 * Sơ đồ KHÔNG đúng tỉ lệ, không biên giới, không phải bản đồ thật.
 *  - "One line": cắt về mặt Wob tập trung, lè lưỡi; rồi nét đứt xanh ra ngư trường (con cá, tấm lưới, mặt trời còn dưới chân trời).
 *  - "Another ... hotels": nét đứt cam sang đảo bên có mái khách sạn; gag: thuyền giấy chạy lạc ra mép trang, rơi khỏi sổ rồi lóng ngóng leo lại.
 *  - "A third ... school ... leave": nét đứt xanh lá vào đất liền; thuyền giấy nhỏ chở cặp sách đi chậm; KHÔNG gag.
 *  - Vòng nét đứt nhỏ quanh chấm đảo; cắt về mặt Wob gõ bút vào má; cá và mũ khách nhích lại gần; cận chấm đảo: ô cửa sổ sáng nhỏ dần như cây phả hệ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong, M = VT.DAO_MAU, INK = VT.C.ink;
  var N = function (i) { return VT.nhip(i); };
  var T_FISH = VT.tu("fishing"), T_NETS = VT.tu("nets"), T_SUN = VT.tu("sun"), T_DOOR = VT.tu("door,"), T_HOT = VT.tu("hotels."), T_MAIN = VT.tu("mainland,"), T_SCHOOL = VT.tu("school."), T_YOUNG = VT.tu("young"), T_LEAVE = VT.tu("leave.");
  var T_PIC = VT.tu("picture", 0), T_WALK = VT.tu("walk."), T_FISH2 = VT.tu("fish"), T_VIS = VT.tu("visitors."), T_FAM = VT.tu("families"), T_GEN = VT.tu("generations.");
  var FACE1 = N(1) + 1.05, DOT = [960, 560];
  var L1 = [[930, 520], [820, 430], [700, 400], [560, 330]], L2 = [[1010, 540], [1150, 500], [1300, 470], [1440, 430]], L3 = [[930, 610], [820, 700], [700, 770], [560, 840]];
  var BOAT2_0 = T_DOOR - 0.2, FALL = T_HOT + 0.25, BACK = N(3) - 0.15;
  VT.sfx("lat-giay", 0.25, 0.3);
  VT.sfx("drop", FALL + 0.05, 0.45);

  function dash(pts, k, col) {
    var out = "", n = 22;
    for (var i = 0; i < n; i++) { var u0 = i / n; if (u0 >= k) break; var p0 = VT.alongPts(pts, u0), p1 = VT.alongPts(pts, Math.min(u0 + 0.55 / n, k)); out += VT.line("M " + VT.f(p0[0]) + " " + VT.f(p0[1]) + " L " + VT.f(p1[0]) + " " + VT.f(p1[1]), 8, col); }
    return out;
  }
  function page() {
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#D8C7A4"/>' + VT.shape("M 160 90 L 1760 90 L 1760 990 L 160 990 Z", "#FBF4E2", { sw: 6, ox: 12, oy: 14 });
    for (var y = 150; y < 980; y += 56) out += VT.line("M 180 " + y + " L 1740 " + y, 2, "#9CC8DC", 0.3);
    out += VT.line("M 960 90 L 960 990", 3, INK, 0.15);
    return out;
  }
  function islandDot() { return VT.ell(DOT[0], DOT[1], 34, 30, "#E6CFA0", 6) + VT.shape("M 942 552 l 12 -14 l 12 14 Z M 962 556 l 10 -12 l 10 12 Z", "#C9603A", { sw: 3, ox: 0, oy: 0 }); }
  function fishing(t) {
    var out = "", a = seg(t, T_FISH - 0.1, T_FISH + 0.3), b = seg(t, T_NETS - 0.1, T_NETS + 0.3), c = seg(t, T_SUN - 0.1, T_SUN + 0.3);
    var near = VT.ease.io(seg(t, T_FISH2, T_FISH2 + 0.8)), fx = VT.lerp(470, 760, near), fy = VT.lerp(300, 450, near);
    if (a > 0) out += VT.fish({ x: fx, y: fy, s: 0.32 * a });
    if (b > 0) { out += '<g opacity="' + VT.f(b * 100) / 100 + '">'; for (var i = 0; i < 5; i++) out += VT.line("M " + (330 + i * 30) + " 380 L " + (360 + i * 30) + " 470", 3, "#2c4f6e") + VT.line("M 320 " + (390 + i * 20) + " L 480 " + (390 + i * 20), 3, "#2c4f6e"); out += "</g>"; }
    if (c > 0) out += '<g opacity="' + VT.f(c * 100) / 100 + '">' + VT.ell(310, 284, 46, 46, "#F6C445", 5, { ox: 0, oy: 0 }) + '<rect x="250" y="253" width="120" height="90" fill="#FBF4E2"/>' + VT.line("M 220 250 L 420 250", 6) + VT.line("M 280 236 L 272 220 M 310 232 L 310 214 M 340 236 L 348 220", 4, "#E0703A") + "</g>";
    return out;
  }
  function hotels(t) {
    var k = VT.ease.back(seg(t, T_DOOR - 0.1, T_DOOR + 0.3)), out = "";
    if (k <= 0) return "";
    out += VT.g(VT.tr(1540, 420, k, 0), VT.ell(0, 20, 120, 34, "#E6CFA0", 6) + VT.shape("M -80 10 L -80 -60 L -20 -60 L -20 10 Z", "#F4F1EA", { sw: 5 }) + VT.shape("M -6 10 L -6 -90 L 70 -90 L 70 10 Z", "#F4F1EA", { sw: 5 }) +
      VT.shape("M -90 -60 L -50 -84 L -10 -60 Z M -16 -90 L 32 -118 L 80 -90 Z", "#C9603A", { sw: 4 }) + VT.line("M -66 -40 l 30 0 M 6 -70 l 50 0 M 6 -44 l 50 0 M 6 -18 l 50 0", 4, "#5A8FC0"));
    return out;
  }
  function visitorHat(t) {
    if (t < T_DOOR) return "";
    var near = VT.ease.io(seg(t, T_VIS - 0.4, T_VIS + 0.5));
    return VT.sunhat({ x: VT.lerp(1560, 1200, near), y: VT.lerp(320, 470, near), s: 0.3 });
  }
  function mainland(t) {
    var k = seg(t, T_MAIN - 0.2, T_MAIN + 0.4), out = "";
    if (k <= 0) return "";
    out += '<g opacity="' + VT.f(k * 100) / 100 + '">' + VT.shape("M 160 900 C 300 860 380 900 480 860 C 560 830 640 880 720 900 L 720 990 L 160 990 Z", "#CFE0B8", { sw: 6, ox: 0, oy: 0 }) + "</g>";
    var s = VT.ease.back(seg(t, T_SCHOOL - 0.1, T_SCHOOL + 0.3));
    if (s > 0) out += VT.g(VT.tr(400, 900, s, 0), VT.shape("M -70 0 L -70 -80 L 70 -80 L 70 0 Z", "#F2C6A0", { sw: 5 }) + VT.shape("M -84 -80 L 0 -130 L 84 -80 Z", "#C9603A", { sw: 5 }) + VT.shape("M -14 0 l 0 -40 l 28 0 l 0 40 Z", "#7A5A3C", { sw: 3 }) + VT.line("M -50 -56 l 24 0 M 26 -56 l 24 0", 6, "#5A8FC0") + VT.ell(0, -102, 10, 10, "#F6C445", 3));
    return out;
  }
  function boat2(t) {
    if (t < BOAT2_0) return "";
    var k = seg(t, BOAT2_0, FALL), out = "";
    if (t < FALL) { var p = VT.alongPts(L2.concat([[1600, 400], [1790, 380]]), k); return VT.thuyenGiay({ x: p[0], y: p[1] + 6, s: 0.5, rot: 4 }); }
    var f = seg(t, FALL, FALL + 0.3), cl = seg(t, FALL + 0.45, BACK);
    if (cl <= 0) return VT.thuyenGiay({ x: 1800, y: 380 + 260 * VT.ease.in2(f), s: 0.5, rot: 60 * f });
    var x = VT.lerp(1800, 1700, cl), y = VT.lerp(640, 470, cl) + 10 * Math.sin(cl * 30);
    return VT.thuyenGiay({ x: x, y: y, s: 0.5, rot: VT.lerp(60, 0, cl) + 12 * Math.sin(cl * 25) });
  }
  function boat3(t) {
    var k = seg(t, T_YOUNG - 0.1, T_LEAVE + 0.4);
    if (k <= 0) return "";
    var p = VT.alongPts(L3, VT.ease.sine(k));
    return VT.thuyenGiay({ x: p[0], y: p[1] + 8, s: 0.46 }) + VT.shape(VT.rrect(p[0] - 18, p[1] - 46, p[0] + 18, p[1] - 14, 6), "#C9463A", { sw: 3 }) + VT.line("M " + (p[0] - 8) + " " + (p[1] - 46) + " q 8 -12 16 0", 3);
  }
  function loop(t) { var k = seg(t, T_PIC - 0.1, T_WALK + 0.2); if (k <= 0) return ""; var pts = []; for (var i = 0; i <= 24; i++) { var a = -Math.PI / 2 + i / 24 * Math.PI * 2; pts.push([DOT[0] + 92 * Math.cos(a), DOT[1] + 80 * Math.sin(a)]); } return dash(pts, k, "#C9463A"); }
  function family(t) {
    var out = "";
    [[6, 120, 36, T_FAM - 0.2], [10, 200, 26, T_FAM + 0.5], [14, 270, 18, T_GEN]].forEach(function (r, ri) {
      for (var i = 0; i < r[0]; i++) {
        var k = seg(t, r[3] + i * 0.04, r[3] + i * 0.04 + 0.2); if (k <= 0) continue;
        var a = -Math.PI / 2 + (i + ri * 0.5) / r[0] * Math.PI * 2, x = DOT[0] + r[1] * Math.cos(a), y = DOT[1] + r[1] * 0.85 * Math.sin(a), w = r[2] * k;
        var pr = ri === 0 ? DOT : [DOT[0] + (r[1] - 80) * Math.cos(a), DOT[1] + (r[1] - 80) * 0.85 * Math.sin(a)];
        out += VT.line("M " + VT.f(pr[0]) + " " + VT.f(pr[1]) + " L " + VT.f(x) + " " + VT.f(y), 2.5, INK, 0.4);
        out += '<circle cx="' + VT.f(x) + '" cy="' + VT.f(y) + '" r="' + VT.f(w * 1.1) + '" fill="#FFE6A0" opacity="0.6"/>' + VT.shape(VT.rrect(x - w / 2, y - w / 2, x + w / 2, y + w / 2, 3), "#F6C46A", { sw: 3, ox: 0, oy: 0 }) + VT.line("M " + VT.f(x) + " " + VT.f(y - w / 2) + " L " + VT.f(x) + " " + VT.f(y + w / 2), 2);
      }
    });
    return out;
  }
  function drawing(t) {
    var out = page() + islandDot();
    out += dash(L1, seg(t, N(1) + 1.15, T_FISH + 0.2), "#2c4f6e") + fishing(t);
    out += dash(L2, seg(t, N(2) + 0.05, T_DOOR), "#C9603A") + hotels(t) + visitorHat(t);
    out += dash(L3, seg(t, N(3) + 0.1, T_MAIN + 0.2), "#3F6E3A") + mainland(t);
    out += boat2(t) + boat3(t) + loop(t) + family(t);
    return out;
  }
  function tipNow(t) {
    if (t < N(1)) return VT.lerp(0, 1, seg(t, 0.2, 0.6)) < 1 ? [VT.lerp(1100, DOT[0] + 20, seg(t, 0.2, 0.6)), VT.lerp(700, DOT[1] + 10, seg(t, 0.2, 0.6))] : [DOT[0] + 20 + 14 * Math.sin(t * 9), DOT[1] + 10 + 8 * Math.cos(t * 9)];
    if (t < N(2)) return VT.alongPts(L1, seg(t, N(1) + 1.15, T_FISH + 0.2));
    if (t < N(3)) return VT.alongPts(L2, seg(t, N(2) + 0.05, T_DOOR));
    if (t < N(4)) { var k3 = seg(t, N(3) + 0.1, T_MAIN + 0.2); return k3 < 1 ? VT.alongPts(L3, k3) : [600, 760]; }
    var a = -Math.PI / 2 + seg(t, T_PIC - 0.1, T_WALK + 0.2) * Math.PI * 2; return [DOT[0] + 92 * Math.cos(a), DOT[1] + 80 * Math.sin(a)];
  }
  // tiền cảnh qua vai (toạ độ khung)
  function shoulder(t, cam, tip, showPen) {
    var out = VT.ell(170, 1200, 330, 300, "#5a9fb8", 7, { ox: 0, oy: 0 }) + VT.shape("M 40 960 C 90 930 160 940 190 980 C 210 1020 150 1050 90 1030 Z", "#efd9a2", { sw: 4, ox: 0, oy: 0 }) +
      VT.sunhat({ x: 190, y: 930, s: 1.9, mau: "coi", rot: -10 });
    if (showPen) {
      var sx = (tip[0] - cam[0]) * cam[2] + 960, sy = (tip[1] - cam[1]) * cam[2] + 540, hand = [sx - 90, sy + 150];
      out = VT.line("M 440 1000 Q " + VT.f((440 + hand[0]) / 2) + " " + VT.f(hand[1] + 120) + " " + VT.f(hand[0]) + " " + VT.f(hand[1]), 16) + out + VT.pencilTo(hand, [sx, sy], { s: 0.9 }) + VT.dot(hand[0], hand[1], 19);
    }
    return out;
  }
  function pageShot(a, b, ten, camFn, penFn) {
    return { a: a, b: b, ten: ten, ve: function (t, lt, T) {
      var cam = camFn(T), camT = camFn(t), pen = penFn ? penFn(t) : false;
      return { cam: cam, world: drawing(t), over: shoulder(t, camT, tipNow(t), pen), tint: "warm" };
    } };
  }
  function faceShot(a, b, ten, mode) {
    return { a: a, b: b, ten: ten, ve: function (t, lt, T) {
      var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#E9DCC0"/>' + '<rect x="-1200" y="860" width="4320" height="1600" fill="#FBF4E2"/>' + VT.line("M -1200 860 L 3100 860", 5);
      var o = { t: t, x: 960, y: 1180, s: 1.15, sunhat: "coi", noPack: true, propFront: "", armL: [120, 330], handL: "nam" };
      var pack = VT.baLoKhongLo({ x: 200, y: 560, s: 0.62, wet: 0.2 });
      if (mode === "luoi") { o.eyes = null; o.lid = 0.3; o.py = 16; o.px = -6; o.mouth = "content"; o.brows = "down"; o.propFront = VT.ell(222, 242, 13, 10, "#e9806e", 3, { ox: 0, oy: 0 }) + pack; o.armR = [330, 320]; o.handR = "nam"; }
      else { var tap = Math.round(t * 6) % 2; o.eyes = null; o.px = 10; o.py = -14; o.mouth = "flat"; o.brows = "flat"; o.armR = [300, 200 + 12 * tap]; o.handR = "nam"; o.lid = VT.blink(t, 2.2, 0.3); o.propFront = pack; }
      out += VT.wob(o);
      var hp = VT.wobPt(o, o.armR[0], o.armR[1]);
      out += mode === "luoi" ? VT.pencil({ x: hp[0] + 30, y: hp[1] + 80, s: 0.6, rot: -25 }) : VT.pencil({ x: hp[0] - 50, y: hp[1] - 26 - 8 * (Math.round(t * 6) % 2), s: 0.6, rot: 120 });
      var c = VT.wobPt(o, 200, 170);
      return { cam: key(T, [[a, [c[0], c[1] + 30, 2.0]], [b, [c[0], c[1] + 26, 2.1], "sine"]]), world: out, tint: "warm" };
    } };
  }
  var camA = function (T) { return key(T, [[0, [960, 560, 1.15]], [N(1), [960, 560, 1.2], "sine"]]); };
  var camC = function (T) { return key(T, [[FACE1, [760, 470, 1.3]], [N(2), [700, 440, 1.36], "sine"], [N(2) + 0.6, [1180, 480, 1.25], "io3"], [N(3), [1300, 470, 1.25], "sine"], [N(3) + 0.6, [780, 680, 1.2], "io3"], [N(4), [740, 700, 1.24], "sine"]]); };
  var camD = function (T) { return key(T, [[N(4), [960, 580, 1.4]], [N(5), [960, 570, 1.55], "sine"]]); };
  var camF = function (T) { return key(T, [[N(6), [960, 500, 1.0]], [N(7), [960, 520, 1.04], "sine"], [N(7) + 0.7, [960, 560, 1.95], "io3"], [DUR, [960, 560, 2.08], "sine"]]); };
  return [
    pageShot(0, N(1), "qua vai: bút bắt đầu từ chấm đảo", camA, function () { return true; }),
    faceShot(N(1), FACE1, "mặt Wob tập trung, lè lưỡi", "luoi"),
    pageShot(FACE1, N(4), "nét đứt: ngư trường, khách sạn (thuyền lạc), đất liền", camC, function (t) { return (t < T_FISH + 0.2) || (t >= N(2) && t < T_DOOR) || (t >= N(3) && t < T_MAIN + 0.2); }),
    pageShot(N(4), N(5), "vòng nét đứt quanh chấm đảo", camD, function (t) { return t >= T_PIC - 0.2; }),
    faceShot(N(5), N(6), "ngừng bút, gõ bút vào má", "go"),
    pageShot(N(6), DUR, "cá, mũ khách nhích lại; cửa sổ sáng như cây phả hệ", camF, function () { return false; }),
  ];
};
