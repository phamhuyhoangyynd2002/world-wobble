/* Đoạn d04 · cắt giấy · hồi ức · trang sổ bản đồ (thẻ trang-so-ban-do, luot-smootherstep). Vào "giay", ra "cat".
   Lời: "...drew the route. First a plane. Then a very long drive. Then more of the drive. On paper, it's one short
   dotted line. In real life, the dotted line has opinions."
   Bản đồ: map-globe, map-yakutia (assets/manifest.json, vẽ bằng code; chép bằng cat-giay/cong-cu/chep_ban_do.py, đã bỏ
   mọi chấm vẽ sẵn: chỉ đặt chấm Oymyakon, ẨN Yakutsk, Verkhoyansk). Chữ duy nhất: "Oymyakon".
   Trang phục: Wob nhỏ mũ len đỏ, khăn đỏ, ló đầu qua máy bay giấy rồi xe hộp; bàn tay mực cầm bút ở mép trang. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var T = function (w, du) { var v = api.tuDung(w, 0); return v == null ? du : v; };
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * x * (x * (x * 6 - 15) + 10); }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function seg(t, t0, t1, a, b, e) { var u = (t - t0) / (t1 - t0); u = Math.max(0, Math.min(1, u)); return lerp(a, b, e ? e(u) : sm(u)); }
  function eIn(u) { return u * u; }
  function eOut(u) { return 1 - (1 - u) * (1 - u); }

  // ---- mốc lời ----
  var tPlane = T("First", 0.98), tDrive = T("Then", 1.97), tMore = T("more", 3.62), tPaper = T("On", 4.79),
    tReal = T("In", 7.35), tOpin = T("opinions", 9.33);

  // ---- bố cục trang (toạ độ lớp "trang") ----
  var GX = 160, GY = 300, GW = 960, GH = 540;        // map-globe ×0,5
  var YX = 1240, YY = 170, YW = 1440, YH = 810;      // map-yakutia ×0,75
  var dotG = [GX + 1344 * 0.5, GY + 434 * 0.5], dotY = [YX + 1042 * 0.75, YY + 561 * 0.75];
  var P1 = api.duong([[150, 1090], [300, 990], [520, 770], [700, 610], dotG]);
  var P2 = api.duong([dotG, [1000, 420], [1250, 360], [1460, 410], [1565, 580], [1590, 700]]);
  var P3 = api.duong([[1590, 700], [1700, 745], [1820, 692], [1930, 640], dotY]);
  var U3 = 0.55, s4 = P3.at(U3);
  // nét đứt có chính kiến: xoắn vòng rồi kéo hẳn ra khỏi mép trang (duyệt hình v1)
  var P4 = api.duong([[s4.x, s4.y], [1900, 800], [2010, 860], [2085, 780], [2010, 700], [1940, 770], [2010, 850], [2150, 870], [2265, 745],
    [2200, 640], [2115, 705], [2250, 810], [2420, 865], [2600, 770], [2780, 870], [2920, 815], [3010, 830]]);
  var P5 = api.duong([[3010, 830], [3090, 860], [3170, 960], [3230, 1100], [3250, 1190]]);

  // ---- bàn + trang ----
  var desk = '<rect x="-3000" y="-2200" width="11000" height="6000" fill="#8E6544"/>';
  for (var k = 0; k < 40; k++) desk += D.line("M -3000 " + (-2100 + k * 150) + " C 0 " + (-2080 + k * 150) + " 3000 " + (-2130 + k * 150) + " 8000 " + (-2100 + k * 150), 4, "#6E4A30", ' opacity="0.45"');
  desk += '<rect x="-3000" y="-2200" width="11000" height="6000" fill="url(#half)" opacity="0.08"/>';

  var page = "";
  page += at(2700, 760, '<g transform="rotate(3)">' + D.journalPage(1700, 1300, { seed: 305, mau: "#F2E8CF" }) + "</g>");
  page += D.journalPage(3000, 1500, { seed: 301 });
  page += at(GX, GY, D.mapSticker("ban-do/map-globe.svg", GW, GH, { id: "stG", seed: 311 }));
  page += at(YX, YY, D.mapSticker("ban-do/map-yakutia.svg", YW, YH, { id: "stY", seed: 315 }));
  page += at(dotG[0], dotG[1], D.mapDot("dG", { r: 10 }));
  page += at(dotY[0], dotY[1], D.mapDot("dY", { r: 16, nhan: data.chu_tren_do_vat[0], co: 64, ben: "trai" }));
  // đường nét đứt (vẽ lại mỗi khung, on twos)
  var dash = ' fill="none" stroke="#C23B2A" stroke-width="9" stroke-linecap="round" stroke-dasharray="2 22"';
  page += '<path id="p1" d=""' + dash + "/>" + '<path id="p2" d=""' + dash + "/>" + '<path id="p3" d=""' + dash + "/>" + '<path id="p4" d=""' + dash + "/>" + '<path id="p5" d=""' + dash + "/>";

  // ---- xe: máy bay giấy / xe hộp, Wob ngồi giữa ----
  var W = api.wob("W", { scarf: true, khan: "#D9543C", mu: "#C9463A" });
  var pl = D.paperPlane(), bc = D.boxCar("bc");
  var xe = '<g id="xe" transform="translate(' + dotG[0] + "," + dotG[1] + ') scale(0.0001)">' +
    g("xe-cb", bc.back) + g("xe-pb", pl.back) + W.svg + g("xe-pf", pl.front) + g("xe-cf", bc.front) + "</g>";
  page += xe;
  // bút chì + bàn tay mực (tay Wob ở bàn đang vẽ), tới từ góc dưới trái
  var but = '<g id="but" transform="translate(150,1090)">' + D.line("M -200 170 L -1300 1100", 44, INK) +
    D.pencil(560, { goc: 140 }) + '<circle cx="-200" cy="168" r="44" fill="' + INK + '"/></g>';
  page += but;

  api.dat(api.lop("ban", desk, 0.85, { mat: 1500 }) + api.lop("trang", page, 1, { mat: 1500 }));
  api.noi({ kieu: { ban: "khong" } });

  // ---- camera ----
  var tLand = tDrive + 0.0, tFold = tLand + 0.18;
  var yawnC = P3.at(uCar(tMore - 0.2)), yawnC2 = P3.at(uCar(tMore + 0.95));
  api.camera([
    [0, 640, 700, 1.22], [0.9, 700, 640, 1.3, "sine.inOut"],
    [tPlane + 0.05, 760, 560, 1.38, "sine.inOut"],
    [tDrive - 0.05, 1580, 640, 1.85, "power2.inOut"],                 // lướt theo máy bay sang map-yakutia
    [tMore - 0.2, Math.max(1650, yawnC.x + 60), 715, 2.6, "power2.inOut"],     // cận xe: Wob ngáp (nhãn vẫn trọn trong khung)
    [tMore + 0.95, Math.max(1655, yawnC2.x + 60), 718, 2.66, "sine.inOut"],
    [tPaper - 0.05, 1790, 670, 2.05, "power2.inOut"],                 // theo xe, đẩy chậm
    [tPaper + 1.25, 1500, 760, 0.64, "power2.inOut"],                 // lùi: nét đứt trên giấy ngắn tí
    [tReal - 0.05, 1500, 750, 0.68, "sine.inOut"],
    [tReal + 0.85, 2450, 820, 0.86, "power2.inOut"],                  // nét đứt xoắn vòng rồi kéo ra khỏi mép trang
    [tReal + 1.6, 2800, 860, 1.12, "power2.inOut"],
    [tReal + 2.15, 3200, 1080, 1.6, "power2.out"],                     // theo xe rơi sang trang mới
    [tReal + 2.6, 3250, 1115, 2.25, "power2.out"],                    // lao vào: Wob ló ra nhìn trang trống
    [DUR, 3252, 1116, 2.35, "sine.inOut"]
  ]);

  // ---- tiến độ các đường và xe (giây đoạn → u) ----
  function u1(t) { return seg(t, 0.12, 0.92, 0, 1); }
  function u2(t) { return seg(t, tPlane, tDrive - 0.02, 0, 1); }
  function uCar(t) { return t < tReal + 0.45 ? seg(t, tFold + 0.05, tReal + 0.2, 0, U3, function (u) { return u < 0.5 ? 2 * u * u * 0.9 + u * 0.1 : 1 - Math.pow(-2 * u + 2, 2) / 2 * 0.9 - (1 - u) * 0.1; }) : U3; }
  function u3draw(t) {
    if (t < tReal + 0.05) return seg(t, tFold + 0.05, tPaper + 0.2, 0.05, 1);
    return seg(t, tReal + 0.05, tReal + 0.45, 1, U3, eIn);                // đoạn trước mặt xe rút lại (nét đứt đổi ý)
  }
  function u4draw(t) { return seg(t, tReal + 0.08, tReal + 0.62, 0, 1); }
  function u5draw(t) { return seg(t, tReal + 0.62, tReal + 0.9, 0, 1); }
  function u4car(t) { return seg(t, tReal + 0.55, tReal + 1.75, 0, 1, function (u) { return u * u * (3 - 2 * u); }); }
  var tEdge = tReal + 1.75, tHit = tEdge + 0.42, landX = 3250, landY = 1190;
  api.sfx("whoosh", tPlane - 0.05, 0.45);
  api.sfx("may-no", tFold + 0.02, 0.4); api.sfx("may-no", tMore, 0.3);
  api.sfx("drop", tHit, 0.6); api.sfx("boing", tHit + 0.1, 0.55);

  function xeState(t) {
    if (t < tPlane) { var sp = seg(t, tPlane - 0.3, tPlane, 0.0001, 0.42, function (u) { return u; }); var a0 = P2.at(0); return { x: a0.x, y: a0.y - 6, a: -30, s: Math.max(0.0001, sp) }; }
    if (t < tDrive) {
      var q = P2.at(u2(t)), a = Math.max(-34, Math.min(40, q.a));
      return { x: q.x, y: q.y - 6, a: a, s: 0.42 };
    }
    var c;
    if (t < tReal + 0.55) c = P3.at(uCar(t));
    else if (t < tEdge) c = P4.at(u4car(t));
    else {
      // lật qua mép trang rồi rơi xuống trang dưới
      var f = Math.max(0, Math.min(1, (t - tEdge) / (tHit - tEdge))), e = P4.at(1);
      var x = lerp(e.x, landX, eOut(f)), y = lerp(e.y, landY, eIn(f)) - Math.sin(f * Math.PI) * 60;
      var rot = f < 1 ? lerp(0, 38, Math.min(1, f * 1.4)) : 0;
      var bounce = t < tHit ? 0 : Math.exp(-(t - tHit) * 7) * Math.sin((t - tHit) * 26) * 26;
      if (t >= tHit) rot = Math.exp(-(t - tHit) * 8) * 10 * Math.cos((t - tHit) * 22);
      return { x: x, y: y - Math.abs(bounce), a: rot, s: 0.45 * (1 - 0.08 * Math.sin(f * Math.PI)), sq: t >= tHit && t < tHit + 0.12 ? 0.82 : 1 };
    }
    var aa = Math.max(-22, Math.min(22, c.a));
    var bob = Math.sin(t * 19) * 2.2;
    return { x: c.x, y: c.y - 8 + bob, a: aa, s: 0.45 };
  }
  var nodes = null;
  api.moiKhung(function (t) {
    if (!nodes) nodes = {};
    var el = function (id) { return nodes[id] || (nodes[id] = document.getElementById(id)); };
    if (el("p1")) el("p1").setAttribute("d", P1.den(u1(t)));
    if (el("p2")) el("p2").setAttribute("d", t < tPlane ? "M 0 0" : P2.den(u2(t)));
    if (el("p3")) el("p3").setAttribute("d", t < tFold ? "M 0 0" : P3.den(u3draw(t)));
    if (el("p4")) el("p4").setAttribute("d", t < tReal + 0.08 ? "M 0 0" : P4.den(u4draw(t)));
    if (el("p5")) el("p5").setAttribute("d", t < tReal + 0.62 ? "M 0 0" : P5.den(u5draw(t)));
    var s = xeState(t);
    if (el("xe")) el("xe").setAttribute("transform", "translate(" + s.x.toFixed(1) + "," + s.y.toFixed(1) + ") rotate(" + s.a.toFixed(2) + ") scale(" + s.s.toFixed(4) + "," + (s.s * (s.sq || 1)).toFixed(4) + ")");
    // bánh xe quay theo quãng đường
    var turn = (t < tReal + 0.55 ? uCar(t) * P3.dai : U3 * P3.dai + u4car(t) * P4.dai) * 2.2;
    if (el("bc-b0")) el("bc-b0").setAttribute("transform", "rotate(" + turn.toFixed(1) + " -120 92)");
    if (el("bc-b1")) el("bc-b1").setAttribute("transform", "rotate(" + turn.toFixed(1) + " 120 92)");
    // bút: kẻ theo P1, rồi rút ra góc dưới trái
    var tip = P1.at(u1(t)), off = seg(t, 1.0, 1.6, 0, 1, eIn);
    if (el("but")) el("but").setAttribute("transform", "translate(" + (tip.x - off * 900).toFixed(1) + "," + (tip.y + off * 700).toFixed(1) + ")");
  }, { twos: true });

  // máy bay gập lại thành xe hộp
  api.origin("#xe-pb", "0 0"); api.origin("#xe-pf", "0 0"); api.origin("#xe-cb", "0 0"); api.origin("#xe-cf", "0 0");
  ["#xe-pb", "#xe-pf"].forEach(function (s) { api.key(s, "scaleY", 0, 1); api.key(s, "scaleY", tLand, 1, "none"); api.key(s, "scaleY", tFold, 0.02, "power2.in"); api.show(s, 0, 1); api.show(s, tFold, 0); });
  ["#xe-cb", "#xe-cf"].forEach(function (s) { api.key(s, "scaleX", 0, 0); api.key(s, "scaleX", tFold - 0.04, 0, "none"); api.key(s, "scaleX", tFold + 0.2, 1, "back.out(2.4)"); });
  api.sfx("pop", tFold, 0.4);

  // ---- Wob ----
  W.set(0, { x: -30, y: 30, size: 0.45, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 6, lashes: 0, ice: 0 });
  W.mouth(0, "X");
  // bay: hớn hở, khăn bay, ngó xuống trang
  W.pose(tPlane, 0.2, { pupX: 10, pupY: 6, upY: -10 }, "back.out(2)");
  W.mouth(tPlane + 0.1, "grin");
  W.vay(tPlane + 0.25, 3, "R");
  api.key("#W-scarfT", "rotation", tPlane, 0); api.key("#W-scarfT", "rotation", tPlane + 0.2, 40, "power2.out");
  for (var sc = tPlane + 0.35, sg = 1; sc < tDrive; sc += 0.12, sg = -sg) api.key("#W-scarfT", "rotation", sc, 40 + sg * 10, "sine.inOut");
  api.key("#W-scarfT", "rotation", tDrive + 0.3, 0, "back.out(2)");
  // đáp, gập: nhún
  W.pose(tLand - 0.05, 0.1, { sy: 0.86, sx: 1.08, upY: 6 }, "power2.in");
  W.pose(tFold + 0.1, 0.3, { sy: 1, sx: 1, upY: 0, pupY: -2 }, "back.out(3)");
  W.mouth(tFold, "o"); W.mouth(tFold + 0.45, "X");
  // lái mãi: nhìn chấm phía trước, rồi ngáp
  W.pose(tFold + 0.5, 0.25, { pupX: 10, pupY: -4 }, "power2.out");
  W.pose(tMore + 0.05, 0.35, { upY: -16, sy: 1.08, lid: 36, size: 0.54 }, "power2.out");
  W.mouth(tMore + 0.1, "o");
  W.pose(tMore + 0.95, 0.3, { upY: 0, sy: 1, lid: 18, size: 0.45 }, "power2.inOut");
  W.mouth(tMore + 1.0, "flat");
  W.idle(tMore + 1.3, tReal, { seed: 41, bien: 3, liec: true });
  W.blinkAt(tPaper + 0.9); W.blinkAt(tPaper + 2.3);
  // nét đứt đổi ý: Wob mở to mắt nhìn nét đứt rút lại
  W.pose(tReal - 0.02, 0.15, { lid: 0 }, "power2.out");
  W.soc(tReal + 0.25, { giuMat: true });
  W.pose(tReal + 0.4, 0.2, { pupX: 10, pupY: 2 }, "power2.out");
  // xe lượn theo đường có chính kiến: lắc lư
  for (var lc = tReal + 0.6, ls = 1; lc < tEdge; lc += 0.2, ls = -ls) W.pose(lc, 0.18, { lean: ls * 9 }, "sine.inOut");
  W.mouth(tReal + 0.6, "wobbly");
  // lộn qua mép trang
  W.pose(tEdge, 0.12, { lean: 0, upY: -22, eye: 1.3 }, "power2.out");
  W.mouth(tEdge, "o");
  W.pose(tHit, 0.08, { sy: 0.8, sx: 1.12, upY: 10, eye: 1 }, "power2.in");
  W.pose(tHit + 0.1, 0.35, { sy: 1, sx: 1, upY: 0 }, "back.out(3)");
  W.mouth(tHit + 0.05, "flat");
  // ló ra nhìn trang trống
  W.pose(tHit + 0.42, 0.3, { upY: -30, sy: 1.08 }, "back.out(1.6)");
  W.nhinQuanh(tHit + 0.5, { nhip: 0.28 });
  W.pose(DUR - 0.25, 0.2, { pupX: 0, pupY: 4, lid: 22 }, "power2.out");
  W.breathe(0, DUR, 2.2);
  W.autoBlink(0.3, tReal - 0.4, 404);
};
