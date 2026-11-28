/* d17 – Wob ngồi cạnh đường ngang mở sổ; hòn quặng giấy nhảy khỏi hình núi; cận trang sổ: map-kiruna-rail lần đầu (KHÔNG chấm,
   KHÔNG nhãn, KHÔNG đường sang Narvik); hòn quặng nhảy lên tận mép trang nghển ra ngoài sổ tìm biển, ngón tay Wob kéo về chấm Kiruna;
   đẩy hòn quặng theo đường xám về Luleå; vịnh Bothnia CHƯA đóng băng (băng và tàu kẹt sang d18).
   Cắt giấy, nhóm A. Chữ: Kiruna, Luleå, Gulf of Bothnia. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper, CH = data.chu_tren_do_vat;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tProb = T("problem."), tMount = T("mountain."), tIt = T("it", 3), tSea = T("sea."), tSw = T("sweden's"), tLulea = T("luleå,"), tBoth = T("bothnia."), tIron = T("iron");
  var tC = tIron - 0.25, tKeo = tIt - 0.75;   // cắt vào cận trang trước "Iron is"; ngón tay kéo hòn quặng về

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
  ov += "</g>";
  ban += ov;
  ban += "</g>";
  var banN = '<g id="banN">';   // chấm + nhãn vẽ SAU tay và hòn quặng (không bị che)
  banN += at(KIR[0], KIR[1], D.mapDot("dK", { r: 14, nhan: CH[0], co: 48, ben: "trai", seed: 17090 }));
  banN += at(LUL[0], LUL[1], D.mapDot("dL", { r: 14 }));
  banN += at(LUL[0], LUL[1], '<g id="nL">' + D.mapDot("dL1", { r: 8, nhan: CH[1], co: 48, ben: "trai", seed: 17091 }) + "</g>");
  var GB = P(1330, 905);
  banN += '<g id="nG" transform="translate(' + GB[0].toFixed(0) + "," + GB[1].toFixed(0) + ')">' + D.mapDot("dG", { r: 0.1, nhan: CH[2], co: 48, ben: "phai", seed: 17093 }) + "</g>";
  banN += "</g>";
  var hq = '<g id="hqv">' + XL.honQuang("hq", 30) + "</g>";
  var tay = '<g id="tay">' + XL.tayWob(700, 118) + "</g>";
  var W2 = XL.wob(api, "V", { the: 1 });
  var cn2 = api.lop("n2", tr + ban + hq + tay + banN + W2.svg, 1, { mat: 900 });
  var c2 = '<g id="c2">' + cn2 + "</g>";

  api.dat(XL.defs() + c1 + c2);
  api.noi({});
  api.show("#c1", 0, 1); api.show("#c2", 0, 0); api.fade("#c2", tC - 0.1, 0.22, 1); api.show("#c1", tC + 0.14, 0);

  /* ---------- cảnh 1 ---------- */
  api.camera([[0, 960, 720, 1.32], [tProb, 930, 760, 1.45, "sine.inOut"], [tC - 0.3, 900, 930, 1.9, "power2.in"], [tC + 0.1, 900, 960, 3.2, "power2.in"]], ["n1", "w1"]);
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
  api.camera([[tC, 1040, 340, 1.5], [tC + 0.4, 1040, 320, 1.42, "power2.out"], [tKeo + 0.5, 1030, 360, 1.38, "sine.inOut"], [tIt - 0.05, 960, 540, 1.0, "power2.inOut"], [tSw, 990, 560, 1.02, "sine.inOut"], [tBoth - 0.5, 1060, 640, 1.12, "power2.inOut"], [DUR, 1080, 650, 1.16, "sine.out"]], ["n2"]);
  api.origin("#ban", "960 540"); api.origin("#banN", "960 540");
  api.key("#banN", "scale", 0, 0.9); api.key("#banN", "scale", tIt - 0.12, 0.9, "none"); api.key("#banN", "scale", tIt + 0.15, 1, "back.out(2)");
  api.show("#banN", 0, 0); api.show("#banN", tIt - 0.12, 1);
  api.key("#ban", "scale", 0, 0.9); api.key("#ban", "scale", tIt - 0.12, 0.9, "none"); api.key("#ban", "scale", tIt + 0.15, 1, "back.out(2)");
  api.show("#ban", 0, 0); api.show("#ban", tIt - 0.12, 1);
  api.sfx("lat-giay", tIt - 0.12, 0.5);
  api.show("#duongX", 0, 0); api.fade("#duongX", tIt + 0.2, 0.3, 1);
  api.pop("#dL", tIt + 0.25, 0.2);
  api.show("#nL", 0, 1); api.pop("#nL", tLulea - 0.12, 0.22);
  api.pop("#nG", tBoth - 0.12, 0.22);
  // hòn quặng ở chấm Kiruna nhảy qua nhảy lại tìm biển
  api.key("#hqv", "x", 0, KIR[0]); api.key("#hqv", "y", 0, KIR[1] - 2);
  api.pop("#hqv", tC + 0.05, 0.2);
  // gag: "Iron is…" hòn quặng nhảy lên tận mép trên trang, nghển ra ngoài sổ ngó tìm biển; ngón tay Wob kéo về chấm Kiruna
  var MEP = 32, hop = [[tIron, KIR[1] - 2, 270], [tIron + 0.32, 270, 110], [tIron + 0.62, 110, MEP]];
  hop.forEach(function (h) {
    api.key("#hqv", "y", h[0], h[1], "none"); api.key("#hqv", "y", h[0] + 0.14, Math.min(h[1], h[2]) - 50, "power2.out"); api.key("#hqv", "y", h[0] + 0.3, h[2], "power2.in");
  });
  api.key("#hqv", "x", tIron, KIR[0], "none"); api.key("#hqv", "x", tIron + 0.92, KIR[0] + 30, "sine.inOut");
  var tNg = tIron + 0.95;
  api.origin("#hq", "0 0");
  api.key("#hq", "scaleY", 0, 1); api.key("#hq", "scaleY", tNg, 1, "none"); api.key("#hq", "scaleY", tNg + 0.2, 1.3, "back.out(2)");
  api.key("#hq", "rotation", 0, 0); api.key("#hq", "rotation", tNg, 0, "none"); api.key("#hq", "rotation", tNg + 0.2, -8, "sine.out");
  api.key("#hq-mat", "y", 0, 0); api.key("#hq-mat", "y", tNg, -6, "none");
  [0, 0.25, 0.5].forEach(function (d, i) { api.key("#hq-mat", "x", tNg + d, i % 2 ? 7 : -7, "none"); api.key("#hq", "rotation", tNg + 0.2 + d, i % 2 ? 8 : -8, "sine.inOut"); });
  // ngón tay túm về
  api.key("#hq", "scaleY", tKeo, 1, "power2.out"); api.key("#hq", "rotation", tKeo, 0, "power2.out"); api.key("#hq-mat", "y", tKeo, 0, "none");
  api.key("#hqv", "x", tKeo, KIR[0] + 30, "none"); api.key("#hqv", "y", tKeo, MEP, "none");
  api.key("#hqv", "x", tKeo + 0.5, KIR[0], "power2.inOut"); api.key("#hqv", "y", tKeo + 0.5, KIR[1] - 2, "power2.inOut");
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
  api.key("#tay", "x", tKeo - 0.35, KIR[0] - 300, "none"); api.key("#tay", "y", tKeo - 0.35, KIR[1] + 900, "none");
  api.key("#tay", "x", tKeo, KIR[0] - 16, "power2.out"); api.key("#tay", "y", tKeo, MEP + 22, "power2.out");
  api.key("#tay", "x", tKeo + 0.5, KIR[0] - 46, "power2.inOut"); api.key("#tay", "y", tKeo + 0.5, KIR[1] + 20, "power2.inOut");
  api.key("#tay", "x", tKeo + 0.9, KIR[0] - 300, "power2.in"); api.key("#tay", "y", tKeo + 0.9, KIR[1] + 900, "power2.in");
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
  // Wob ló đầu ở mép dưới phải nhìn ra vịnh
  W2.set(0, { x: 1690, y: 1620, size: 1.0, aLu: 18, aLf: -10, aRu: 9, aRf: 3 });
  api.key("#V", "y", tBoth - 0.3, 1620, "none"); api.key("#V", "y", tBoth + 0.15, 1255, "back.out(1.6)");
  W2.mouth(0, "flat"); W2.pose(0, 0.01, { pupX: -14, pupY: -8 }, "none"); W2.autoBlink(tBoth, DUR, 172);
  W2.mouth(tBoth + 0.3, "smirk");
};
