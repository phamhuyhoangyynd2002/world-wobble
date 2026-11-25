/* Đoạn d18 · cắt giấy · trước toà nhà ngập tuyết, cột đo tuyết sơn vạch; hai tờ bảng số lơ lửng. Vào "cat", ra "chen".
   Wob áo mưa vàng có mũ trùm, ba lô ô liu có cuộn thảm đỏ. Chữ: 47 in · 1.2 m · ~20 ft · ~6 m · 241 in · 257 in (mức C: giữ ~ và hai con số). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, CH = data.chu_tren_do_vat, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var MAT = 960;
  var W = WT.wob(api, "W", { do: "ao-mua" });
  var troi = WT.defs() + '<rect width="1920" height="1080" fill="url(#wtSang)"/>';
  var xa = WT.nuiXa(-900, 3400, 600, 19, "#9DAAB0", 320);
  var mid = "";
  mid += at(1000, MAT, '<g transform="scale(3.2)">' + WT.towerBlock(320, 34) + "</g>");
  mid += D.paper(D.rough([[-900, MAT], [3400, MAT], [3400, 1700], [-900, 1700]], 3, 1801, 30), D.C.snow, { shadow: false });
  mid += D.paper(D.rough([[-900, MAT], [-400, 760], [100, 700], [300, 760], [420, MAT]], 4, 1802, 26), D.C.snow, { stroke: true, sw: 4, fringe: D.C.ice });
  mid += D.paper(D.rough([[1500, MAT], [1700, 740], [2100, 680], [2600, 760], [2800, MAT]], 4, 1803, 26), D.C.snow, { stroke: true, sw: 4, fringe: D.C.ice });
  mid += at(800, MAT, WT.snowGauge(720));
  // vạch 1,2 m (cao hơn đầu Wob) + nhãn
  mid += D.line("M 760 610 L 840 610", 8, INK) + D.line("M 670 610 L 760 610", 3, INK, ' stroke-dasharray="10 8"');
  mid += at(450, 600, g("t47", WT.tag("tg47", CH[0], 400, 84, 48, { seed: 1804, ghim: false })));
  mid += W.svg;
  // cuộn thảm đỏ nhô khỏi tuyết (thay cho Wob khi bị vùi)
  mid += at(1040, 676, g("tham", '<g transform="scale(3.2)">' + g("thamIn", D.paper(D.rRect(-30, -20, 70, 40, 1.5, 1805), WT.OLIU, { stroke: true, sw: 4 }) +
    '<rect x="-36" y="-52" width="70" height="28" rx="14" fill="#d9543c" stroke="' + INK + '" stroke-width="5"/>' + D.line("M -22 -50 L -22 -26 M 20 -50 L 20 -26", 3)) + "</g>"));
  // khối tuyết dâng
  mid += g("dang", D.paper(D.rough([[-900, 0], [300, -10], [600, 8], [900, -12], [1200, 6], [1500, -8], [3400, 0], [3400, 900], [-900, 900]], 6, 1806, 40), "#F2F7F9", { stroke: true, sw: 5, fringe: D.C.ice }) +
    D.line("M 400 40 C 600 30 800 50 1000 34 M 1100 60 C 1300 50 1500 70 1700 56", 4, "#C3D6DF"));
  // bảng số lơ lửng
  mid += at(560, 330, g("b241", WT.tag("tg241", CH[2], 280, 96, 56, { seed: 1807, ghim: false })));
  mid += at(1330, 330, g("b257", WT.tag("tg257", CH[3], 280, 96, 56, { seed: 1808, ghim: false })));
  mid += at(1110, 185, g("b20", WT.tag("tg20", CH[1], 440, 92, 52, { seed: 1809, ghim: false, mau: "#E2B33C" })));
  var roi = WT.tuyetRoi(api, "fx", { n: 50, toc: 80, seed: 1810, r: 5 });
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 600 }) + api.lop("giua", mid, 1, { mat: MAT }) + roi);
  api.noi({});

  var tMarch = T("march", 0, 0.25), t47 = T("forty-seven", 0, 2.96), tMet = T("metres", 0, 5.59), tShort = T("shorter", 0, 6.67), tOver = T("over", 0, 7.84);
  var tSome = T("somewhere", 0, 9.7), tTwenty = T("twenty", 0, 10.55), tSix = T("six", 0, 12.24), tTables = T("tables", 0, 13.95), tAgree = T("agree", 0, 14.9), tFig = T("figure", 0, 16.04);

  api.camera([
    [0, 860, 700, 1.25], [tMet, 870, 690, 1.3, "sine.inOut"], [tOver - 0.1, 930, 560, 1.12, "power2.inOut"], [DUR, 940, 540, 1.16, "sine.inOut"]
  ]);

  // ---- tuyết dâng; Wob bị vùi, chỉ còn cuộn thảm lắc lư ----
  var s0 = tMarch, s1 = tShort + 0.2, TOP = 690;
  api.origin("#dang", "0 0");
  api.key("#dang", "y", 0, 1010); api.key("#dang", "y", s0, 1010, "none"); api.key("#dang", "y", s1, TOP, "sine.inOut");
  api.sfx("rise", s0, 0.5);
  W.set(0, { x: 1000, y: MAT, size: 0.7, lashes: 1, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: -8, pupY: 4, op: 1 });
  W.mouth(0, "flat");
  W.idle(0.1, s1, { seed: 181, bien: 1.6 });
  W.pose(1.0, 0.3, { pupX: 0, pupY: 10 }, "power2.out");          // nhìn tuyết dâng
  W.mouth(1.4, "o");
  W.pose(t47 - 0.2, 0.3, { pupX: -12, pupY: -12 }, "power2.out");  // nhìn vạch đo
  W.mouth(t47 + 0.5, "wobbly");
  W.shiver(t47 + 0.6, t47 + 1.4, 1.8, 14);
  W.pose(4.4, 0.3, { aLu: 120, aLf: 20, aRu: -120, aRf: -20, pupX: 0, pupY: -14 }, "power2.out");   // giơ tay
  W.pose(5.2, 0.25, { aLu: 140, aRu: -140 }, "sine.inOut");
  api.show("#W", 0, 1); api.show("#W", s1 - 0.05, 0);
  api.origin("#thamIn", "0 0");
  api.show("#tham", 0, 0); api.show("#tham", s1 - 1.0, 1); api.show("#tham", tOver, 0);
  for (var t = s1 - 1.0, k = 0; t < tOver; t += 0.28, k++) api.key("#thamIn", "rotation", t, k % 2 ? 10 : -10, "sine.inOut");
  api.key("#thamIn", "rotation", 0, 0);
  api.origin("#t47", "0 0");
  api.key("#t47", "scale", 0, 0); api.key("#t47", "scale", t47 - 0.05, 0, "none"); api.key("#t47", "scale", t47 + 0.22, 1, "back.out(2.4)");
  api.sfx("ting", t47, 0.35);

  // ---- Wob chui lên khỏi tuyết ----
  var tUp = tOver + 0.05;
  W.set(tOver, { y: TOP + 260, op: 1, aLu: 160, aLf: 10, aRu: -160, aRf: -10, lean: 0 });
  api.show("#W", tOver, 1);
  W.pose(tUp, 0.3, { y: TOP + 6, sy: 1.08 }, "back.out(1.8)");
  W.pose(tUp + 0.35, 0.25, { sy: 1, aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "power2.out");
  W.mouth(tUp, "o"); W.mouth(tUp + 0.6, "grin");
  api.sfx("pop", tUp, 0.6);
  W.idle(tUp + 0.7, DUR, { seed: 182, bien: 1.4 });
  // bảng số: 241 in, 257 in; nhãn ~20 ft · ~6 m
  ["#b241", "#b257", "#b20"].forEach(function (s) { api.origin(s, "0 0"); });
  api.key("#b241", "scale", 0, 0); api.key("#b241", "scale", tSome - 0.05, 0, "none"); api.key("#b241", "scale", tSome + 0.22, 1, "back.out(2.4)");
  api.key("#b20", "scale", 0, 0); api.key("#b20", "scale", tTwenty - 0.05, 0, "none"); api.key("#b20", "scale", tTwenty + 0.22, 1, "back.out(2.4)");
  var t257 = tSix - 0.1;
  api.key("#b257", "scale", 0, 0); api.key("#b257", "scale", t257, 0, "none"); api.key("#b257", "scale", t257 + 0.22, 1, "back.out(2.4)");
  api.sfx("pop", tSome, 0.35); api.sfx("pop", t257, 0.35); api.sfx("ting", tTwenty, 0.3);
  for (var tb = tSome + 0.3, n = 0; tb < DUR; tb += 0.9, n++) {
    api.key("#b241", "y", tb, n % 2 ? 6 : -6, "sine.inOut"); api.key("#b257", "y", tb + 0.3, n % 2 ? -6 : 6, "sine.inOut");
  }
  api.key("#b241", "y", 0, 0); api.key("#b257", "y", 0, 0);
  // nhìn qua lại giữa hai con số
  W.pose(tSome + 0.1, 0.25, { pupX: -13, pupY: -12 }, "power2.out");
  W.pose(tTwenty + 0.1, 0.25, { pupX: 0, pupY: -14 }, "power2.out");
  W.pose(t257 + 0.1, 0.22, { pupX: 13, pupY: -12 }, "power2.out");
  W.pose(tTables - 0.3, 0.2, { pupX: -13, pupY: -12 }, "power2.out");
  W.pose(tTables + 0.3, 0.2, { pupX: 13, pupY: -12 }, "power2.out");
  W.pose(tAgree - 0.1, 0.2, { pupX: -13, pupY: -12 }, "power2.out");
  W.mouth(tTables, "flat");
  W.nhunVai(tAgree + 0.3, 0.5);
  W.pose(tFig, 0.25, { pupX: 0, pupY: 3 }, "power2.out");
  W.mouth(tFig + 0.1, "smirk");
  W.blinkAt(tSix + 0.5);
};
