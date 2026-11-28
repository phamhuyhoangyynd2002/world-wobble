/* d17 – Wob ngồi cạnh đường ngang mở sổ; hòn quặng giấy nhảy khỏi hình núi; cận trang sổ: map-kiruna-rail lần đầu (KHÔNG chấm,
   KHÔNG nhãn, KHÔNG đường sang Narvik); đẩy hòn quặng theo đường xám về Luleå; vịnh Bothnia đóng băng, hòn quặng trượt xoay tới con tàu kẹt.
   Cắt giấy, nhóm A. Chữ: Kiruna, Luleå, Gulf of Bothnia, Luleå · freezes in winter. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper, CH = data.chu_tren_do_vat;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tProb = T("problem."), tMount = T("mountain."), tIt = T("it", 3), tSea = T("sea."), tSw = T("sweden's"), tLulea = T("luleå,"), tBoth = T("bothnia."),
    tFreeze = T("freezes"), tWinter = T("winter.");
  var tC = tIt - 0.3;   // cắt vào cận trang

  /* ================= cảnh 1: ngồi cạnh đường ngang ================= */
  var n1 = '<rect x="-400" y="-400" width="2800" height="1200" fill="url(#xlTroiNgay)"/>';
  n1 += paper(D.rough([[-400, 600], [200, 470], [800, 560], [1400, 440], [2000, 540], [2400, 520], [2400, 760], [-400, 760]], 6, 17011, 30), "#B9C9D3", { stroke: true, sw: 4, shadow: false });
  var r1 = D.rng(17020);
  for (var k = 0; k < 22; k++) { var px = -380 + k * 130 + r1() * 50, ph = 50 + r1() * 50; n1 += paper("M " + px.toFixed(0) + " 712 L " + (px + 22).toFixed(0) + " " + (712 - ph).toFixed(0) + " L " + (px + 44).toFixed(0) + " 712 Z", "#4E6B5C", { stroke: true, sw: 3, shadow: false }); }
  n1 += paper("M -400 720 L 2400 720 L 2400 1500 L -400 1500 Z", "#F2F6F7", { stroke: true, sw: 4, shadow: false }) + XL.duongRay(-400, 2400, 760);
  n1 += at(1500, 905, XL.raoChan(api, "rao", 560));
  var cn1 = api.lop("n1", n1, 1, { mat: 900 });
  var W = XL.wob(api, "W", { the: 1 });
  // sổ mở trên đầu gối: trang trái có hình núi, hòn quặng nhảy ra
  var so = '<g id="so"><g id="soMo">' + paper(D.rRect(-230, -150, 230, 160, 2, 17030), "#F6EDD6", { stroke: true, sw: 5, sx: 6, sy: 8 }) + paper(D.rRect(0, -150, 230, 160, 2, 17031), "#F6EDD6", { stroke: true, sw: 5, sx: 6, sy: 8 }) +
    line("M -200 -10 L -150 -110 L -110 -60 L -80 -120 L -30 -10", 4, "#5E6B70") + line("M 30 -110 L 200 -110 M 30 -80 L 180 -80 M 30 -50 L 190 -50", 3, "#9DB7C2") + line("M 0 -150 L 0 10", 4) + "</g></g>";
  var hq1 = '<g id="hq1v">' + XL.honQuang("hq1", 30) + "</g>";
  var cw1 = api.lop("w1", W.svg + paper(D.rough([[-400, 1000], [600, 985], [1300, 1005], [2400, 990], [2400, 1500], [-400, 1500]], 4, 17040, 30), "#F7FBFC", { stroke: true, sw: 4, shadow: false }) + at(900, 1030, '<g transform="scale(0.85)">' + so + hq1 + "</g>"), 1, { mat: 900 });
  var c1 = '<g id="c1">' + cn1 + cw1 + "</g>";

  /* ================= cảnh 2: cận trang sổ, bản đồ ================= */
  var MX = 300, MY = 112, MS = 0.75;
  function P(x, y) { return [MX + x * MS, MY + y * MS]; }
  var KIR = P(987, 397), LUL = P(1111, 765);
  var tr = '<rect x="-200" y="-200" width="2320" height="1480" fill="#6E5A44"/>' + '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#xlGo)" opacity="0.8"/>';
  tr += at(80, 30, D.journalPage(1760, 1020, { seed: 17050, ke: true }));
  var ban = '<g id="ban">' + at(MX, MY, D.mapSticker("ban-do/map-kiruna-rail.svg", 1440, 810, { id: "map", seed: 17060 }));
  // lớp phủ toạ độ bản đồ: đường xám Kiruna → Luleå, băng vịnh, tàu kẹt
  var ov = '<g transform="translate(' + MX + "," + MY + ") scale(" + MS + ')">';
  ov += '<g id="duongX">' + line("M 987 397 C 1000 470 1030 560 1060 640 C 1080 700 1100 740 1111 765", 9, "#1f2326") + line("M 987 397 C 1000 470 1030 560 1060 640 C 1080 700 1100 740 1111 765", 5, "#B8BDC2", ' stroke-dasharray="16 10"') + "</g>";
  ov += '<clipPath id="mapCl"><rect x="0" y="0" width="1920" height="1080"/></clipPath><g clip-path="url(#mapCl)"><g id="bang">' + paper(D.rough([[1094, 760], [1160, 748], [1250, 760], [1312, 775], [1322, 860], [1280, 905], [1195, 960], [1155, 1090], [960, 1090], [1018, 960], [1056, 864], [1090, 800]], 4, 17070, 14), "#EAF5F9", { stroke: true, sw: 5, shadow: false }) +
    paper(D.rough([[1094, 760], [1160, 748], [1250, 760], [1312, 775], [1322, 860], [1280, 905], [1195, 960], [1155, 1090], [960, 1090], [1018, 960], [1056, 864], [1090, 800]], 4, 17070, 14), "url(#xlBangVan)", { shadow: false }) +
    line("M 1150 800 L 1190 840 L 1176 880 M 1240 820 L 1220 870 M 1100 940 L 1130 990", 3, "#9CC6D8") + "</g></g>";
  ov += '<g id="tauK" transform="translate(1215,838) scale(1.25)">' + XL.tauBien("tb", 120) + paper(D.rough([[-80, 4], [-40, -10], [40, -8], [86, 6], [60, 22], [-60, 22]], 3, 17080, 8), "#F7FBFC", { stroke: true, sw: 3.5, shadow: false }) + "</g>";
  ov += "</g>";
  ban += ov;
  ban += at(KIR[0], KIR[1], D.mapDot("dK", { r: 14, nhan: CH[0], co: 48, ben: "trai", seed: 17090 }));
  ban += at(LUL[0], LUL[1], D.mapDot("dL", { r: 14 }));
  ban += at(LUL[0], LUL[1], '<g id="nL">' + D.mapDot("dL1", { r: 8, nhan: CH[1], co: 48, ben: "trai", seed: 17091 }) + "</g>");
  ban += at(LUL[0], LUL[1], '<g id="nL2">' + D.mapDot("dL2", { r: 0.1, nhan: CH[3], co: 48, ben: "tren", seed: 17092 }) + "</g>");
  var GB = P(1330, 905);
  ban += '<g id="nG" transform="translate(' + GB[0].toFixed(0) + "," + GB[1].toFixed(0) + ')">' + D.mapDot("dG", { r: 0.1, nhan: CH[2], co: 48, ben: "phai", seed: 17093 }) + "</g>";
  ban += "</g>";
  var hq = '<g id="hqv">' + XL.honQuang("hq", 30) + "</g>";
  var tay = '<g id="tay">' + XL.tayWob(700, 118) + "</g>";
  var W2 = XL.wob(api, "V", { the: 1 });
  var cn2 = api.lop("n2", tr + ban + hq + tay + W2.svg, 1, { mat: 900 });
  var c2 = '<g id="c2">' + cn2 + "</g>";

  api.dat(XL.defs() + c1 + c2);
  api.noi({});
  api.show("#c1", 0, 1); api.show("#c2", 0, 0); api.fade("#c2", tC - 0.1, 0.22, 1); api.show("#c1", tC + 0.14, 0);

  /* ---------- cảnh 1 ---------- */
  api.camera([[0, 960, 700, 1.3], [1.4, 930, 720, 1.42, "sine.inOut"], [tC - 0.6, 900, 930, 1.9, "power2.in"], [tC + 0.1, 900, 960, 3.2, "power2.in"]], ["n1", "w1"]);
  api.key("#rao-tay", "rotation", 0, -80);
  // Wob vẫn ngồi phịch trên tuyết như cuối d15, hết choáng, mở sổ
  W.set(0, { x: 900, y: 935, size: 0.9, upY: 70, legL: 78, legR: -78, aRu: -30, aLu: 30, aRf: 20, aLf: -20, pupX: 0, pupY: 0 });
  W.choang(0, 1); W.choang(0.12, 0);
  W.mouth(0, "wobbly"); W.mouth(0.2, "flat");
  W.autoBlink(0.3, tC, 171);
  W.pose(0.05, 0.12, { lean: -5 }, "power2.out"); W.pose(0.2, 0.2, { lean: 0 }, "back.out(2)");
  W.pose(0.15, 0.3, { aRu: -20, aRf: -30, aLu: 20, aLf: 30, pupX: 0, pupY: 16 }, "power2.out");
  api.origin("#soMo", "0 0");
  api.key("#soMo", "scaleX", 0, 0.08); api.key("#soMo", "scaleX", 0.25, 0.08, "none"); api.key("#soMo", "scaleX", 0.55, 1, "back.out(1.6)");
  api.sfx("lat-giay", 0.25, 0.6);
  // hòn quặng nhảy khỏi hình núi đúng "problem."
  api.key("#hq1v", "x", 0, -115); api.key("#hq1v", "y", 0, -40);
  api.pop("#hq1v", tProb - 0.15, 0.2);
  api.key("#hq1v", "y", tProb, -40, "none"); api.key("#hq1v", "y", tProb + 0.25, -190, "power2.out"); api.key("#hq1v", "y", tProb + 0.5, -150, "power2.in");
  api.key("#hq1v", "x", tProb, -115, "none"); api.key("#hq1v", "x", tProb + 0.5, -175, "sine.inOut");
  for (var j = 0, th = tProb + 0.7; th < tC - 0.2; th += 0.5, j++) { api.key("#hq1v", "y", th, -150, "none"); api.key("#hq1v", "y", th + 0.18, -200, "power2.out"); api.key("#hq1v", "y", th + 0.36, -150, "power2.in"); }
  api.key("#hq1-mat", "x", 0, 0);
  for (var j1 = 0, t1 = tProb + 0.7; t1 < tC; t1 += 0.5, j1++) api.key("#hq1-mat", "x", t1, j1 % 2 ? 5 : -5, "none");
  W.pose(tProb + 0.1, 0.25, { pupX: -4, pupY: 2, eye: 1.1 }, "power2.out");
  W.pose(tMount - 0.2, 0.3, { lean: -6, pupX: 0, pupY: 6 }, "sine.inOut");

  /* ---------- cảnh 2: trang sổ ---------- */
  api.camera([[tC, 960, 540, 1.08], [tC + 0.5, 960, 540, 1.0, "power2.out"], [tSw, 990, 560, 1.02, "sine.inOut"], [tFreeze - 0.3, 1060, 640, 1.12, "power2.inOut"], [DUR, 1080, 650, 1.16, "sine.out"]], ["n2"]);
  api.origin("#ban", "960 540");
  api.key("#ban", "scale", 0, 0.9); api.key("#ban", "scale", tIt - 0.12, 0.9, "none"); api.key("#ban", "scale", tIt + 0.15, 1, "back.out(2)");
  api.show("#ban", 0, 0); api.show("#ban", tIt - 0.12, 1);
  api.sfx("lat-giay", tIt - 0.12, 0.5);
  api.show("#duongX", 0, 0); api.fade("#duongX", tIt + 0.2, 0.3, 1);
  api.pop("#dL", tIt + 0.25, 0.2);
  api.show("#nL", 0, 1); api.pop("#nL", tLulea - 0.12, 0.22); api.show("#nL", tFreeze - 0.06, 0);
  api.pop("#nL2", tFreeze - 0.06, 0.22);
  api.pop("#nG", tBoth - 0.12, 0.22);
  api.show("#bang", 0, 0); api.origin("#bang", "1111 765");
  api.key("#bang", "scale", 0, 0.2); api.key("#bang", "scale", tFreeze - 0.45, 0.2, "none"); api.key("#bang", "scale", tFreeze + 0.05, 1, "power2.out");
  api.fade("#bang", tFreeze - 0.45, 0.3, 1);
  api.show("#tauK", 0, 0); api.fade("#tauK", tFreeze - 0.2, 0.25, 1);
  api.sfx("tach-bang", tFreeze - 0.05, 0.6);
  // hòn quặng ở chấm Kiruna nhảy qua nhảy lại tìm biển
  api.key("#hqv", "x", 0, KIR[0]); api.key("#hqv", "y", 0, KIR[1] - 2);
  api.pop("#hqv", tIt + 0.1, 0.2);
  for (var b = 0, tb = tIt + 0.35; tb < tSw; tb += 0.42, b++) {
    api.key("#hqv", "y", tb, KIR[1] - 2, "none"); api.key("#hqv", "y", tb + 0.15, KIR[1] - 46, "power2.out"); api.key("#hqv", "y", tb + 0.3, KIR[1] - 2, "power2.in");
    api.key("#hqv", "x", tb + 0.3, KIR[0] + (b % 2 ? 10 : -10), "sine.inOut");
    api.key("#hq-mat", "x", tb, b % 2 ? 7 : -7, "none");
  }
  api.key("#hq-mat", "x", 0, 0);
  // tay Wob (ống tay áo phao) đẩy hòn quặng theo đường xám về phía đông
  var duong = [[KIR[0], KIR[1] - 2], P(1000, 470), P(1030, 560), P(1060, 640), P(1090, 720), [LUL[0], LUL[1] - 2]];
  var t0 = tSw - 0.05, t1 = tLulea - 0.05;
  api.key("#tay", "x", 0, KIR[0] - 300); api.key("#tay", "y", 0, KIR[1] + 900);
  api.key("#tay", "x", t0 - 0.45, KIR[0] - 300, "none"); api.key("#tay", "y", t0 - 0.45, KIR[1] + 900, "none");
  api.key("#tay", "x", t0, KIR[0] - 46, "power2.out"); api.key("#tay", "y", t0, KIR[1] + 20, "power2.out");
  duong.forEach(function (p, i) {
    var t = t0 + (t1 - t0) * i / (duong.length - 1);
    api.key("#hqv", "x", t, p[0], "sine.inOut"); api.key("#hqv", "y", t, p[1], "sine.inOut");
    if (i > 0) { api.key("#tay", "x", t, p[0] - 46, "sine.inOut"); api.key("#tay", "y", t, p[1] + 22, "sine.inOut"); }
  });
  api.key("#hq-mat", "x", t0, 7, "none");
  api.key("#tay", "x", t1 + 0.6, LUL[0] - 360, "power2.in"); api.key("#tay", "y", t1 + 0.6, LUL[1] + 900, "power2.in");
  // hòn quặng nhún ở Luleå, nhìn ra vịnh
  api.key("#hqv", "y", tBoth - 0.3, LUL[1] - 2, "none"); api.key("#hqv", "y", tBoth - 0.12, LUL[1] - 30, "power2.out"); api.key("#hqv", "y", tBoth + 0.05, LUL[1] - 2, "power2.in");
  api.key("#hq-mat", "x", tBoth, 4, "none"); api.key("#hq-mat", "y", 0, 0); api.key("#hq-mat", "y", tBoth, 5, "none");
  // băng tới: hòn quặng trượt xoay vòng qua cảng, đụng con tàu kẹt
  var TK = P(1215 - 80, 838 - 4), tS = tFreeze + 0.1, tH = tWinter - 0.05;
  api.origin("#hq", "0 -16");
  api.key("#hq", "rotation", 0, 0); api.key("#hq", "rotation", tS, 0, "none"); api.key("#hq", "rotation", tH, 900, "power1.out");
  api.key("#hqv", "x", tS, LUL[0], "none"); api.key("#hqv", "y", tS, LUL[1] - 2, "none");
  api.key("#hqv", "x", tS + (tH - tS) * 0.5, LUL[0] + 70, "sine.inOut"); api.key("#hqv", "y", tS + (tH - tS) * 0.5, LUL[1] + 40, "sine.inOut");
  api.key("#hqv", "x", tH, TK[0], "power1.out"); api.key("#hqv", "y", tH, TK[1], "power1.out");
  api.key("#hqv", "x", tH + 0.1, TK[0] - 14, "power2.out"); api.key("#hqv", "x", tH + 0.3, TK[0] - 8, "sine.inOut");
  api.key("#hq", "rotation", tH + 0.1, 880, "power2.out");
  api.key("#tauK", "rotation", 0, 0); api.origin("#tauK", "1215 838");
  api.key("#tauK", "rotation", tH, 0, "none"); api.key("#tauK", "rotation", tH + 0.08, 2, "power2.out"); api.key("#tauK", "rotation", tH + 0.3, 0, "sine.inOut");
  // Wob ló đầu ở mép dưới phải, nhăn mặt; giữ 0,6 s
  W2.set(0, { x: 1690, y: 1500, size: 1.0, aLu: 18, aLf: -10, aRu: 9, aRf: 3 });
  api.key("#V", "y", tFreeze, 1500, "none"); api.key("#V", "y", tFreeze + 0.45, 1255, "back.out(1.6)");
  W2.mouth(0, "flat"); W2.pose(0, 0.01, { pupX: -14, pupY: -8 }, "none");
  W2.pose(tH - 0.05, 0.15, { lid: 30, sy: 0.95, sx: 1.04 }, "power2.out"); W2.mouth(tH, "wobbly");
  W2.pose(tH + 0.3, 0.3, { sy: 1, sx: 1 }, "sine.inOut");
};
