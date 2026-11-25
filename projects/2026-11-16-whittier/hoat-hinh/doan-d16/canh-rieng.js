/* Đoạn d16 · cắt giấy · ngoài trời trước toà Buckner (bê tông SÁU tầng dài, ô cửa trống, vệt nước), hàng rào lưới, tuyết.
   Vào "cat", ra "giay". Wob áo khoác kem, mũ len kem quả bông đỏ, ba lô ô liu, giày đỏ. Không bước qua rào.
   Chữ: ~1960 ? (tờ lịch sử, giữ dấu ? vì nguồn lệch) · ASBESTOS (biển trên rào). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, CH = data.chu_tren_do_vat, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var MAT = 920;
  var W = WT.wob(api, "W", { do: "ao-khoac", holdR: g("W-bong", '<g transform="translate(0,30)">' + WT.bowlingBall(26) + "</g>") });
  var M = WT.wob(api, "m", { do: "ao-khoac" });
  var troi = WT.defs() + '<rect width="1920" height="1080" fill="url(#wtSang)"/>';
  var xa = WT.nuiXa(-900, 3400, 640, 17, "#9DAAB0", 330) + at(2050, 700, '<g transform="scale(0.9)">' + WT.towerBlock(200, 26) + "</g>") +
    '<rect x="-900" y="600" width="4300" height="700" fill="#FFFFFF" opacity="0.2"/>';
  var mid = "";
  mid += D.paper(D.rough([[-900, 700], [3400, 698], [3400, 1700], [-900, 1700]], 3, 1601, 30), D.C.snow, { shadow: false });
  mid += at(860, 790, WT.buckner("bk", { w: 1300 }));
  mid += '<rect x="-900" y="930" width="4300" height="70" fill="#C7D3D8"/>' + D.line("M -900 965 L 3400 965", 4, "#F6EEDC", ' stroke-dasharray="40 30"');
  // xe tải rời đi
  for (var k = 0; k < 3; k++) mid += g("tr" + k, WT.truck("trk" + k), "translate(" + (300 + k * 330) + ",985) scale(0.8)");
  mid += at(120, 905, WT.fenceChain(1540, 170, 1602));
  mid += at(1060, 820, g("bienA", WT.tag("tA", CH[1], 330, 80, 50, { seed: 1603, mau: "#E2B33C", ghim: false })));
  // tờ lịch sử lơ lửng
  mid += at(480, 330, g("ls", '<g transform="rotate(-5)">' + WT.tag("tLS", CH[0], 330, 120, 60, { seed: 1604, dy: 6 }) + "</g>"));
  mid += W.svg;
  // bong bóng tưởng tượng: Wob mini ném bóng bowling
  var bub = D.paper("M -230 40 C -280 40 -290 -40 -240 -60 C -250 -140 -150 -170 -100 -130 C -60 -190 60 -190 90 -130 C 150 -170 260 -130 240 -60 C 290 -40 280 40 230 40 C 200 80 -200 80 -230 40 Z", "#F6EFDD", { stroke: true, sw: 5, half: 0.06 });
  bub += '<circle cx="80" cy="96" r="22" fill="#F6EFDD" stroke="' + INK + '" stroke-width="4"/><circle cx="110" cy="138" r="13" fill="#F6EFDD" stroke="' + INK + '" stroke-width="4"/>';
  bub += D.line("M -220 40 L 230 40", 4, "#B8A07E") + D.line("M 150 40 L 150 -10 M 175 40 L 175 -14 M 200 40 L 200 -10", 6, "#F6EEDC") + D.line("M 150 40 L 150 -10 M 175 40 L 175 -14 M 200 40 L 200 -10", 2, INK);
  mid += at(1200, 560, g("bub", bub + M.svg));
  mid += g("ball", WT.bowlingBall(26));
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 640 }) + api.lop("giua", mid, 1, { mat: MAT }));
  api.noi({});

  var tArmy = T("army", 0, 0.25), t60 = T("sixty", 0, 2.17), tDiffer = T("differ", 0, 3.59), tToday = T("today", 0, 6.17), tWin = T("windows", 0, 8.07), tAsb = T("asbestos", 0, 9.5);
  var tFenced = T("fenced", 0, 11.59), tSo = T("so", 0, 12.77), tOutside = T("outside", 0, 13.6), tSensible = T("sensible", 0, 15.66), tImag = T("imagined", 0, 17.37), tBowl = T("bowling", 0, 17.87), tAnyway = T("anyway", 0, 18.56);

  api.camera([
    [0, 820, 640, 1.22], [tToday - 0.2, 860, 620, 1.2, "sine.inOut"], [tWin + 0.4, 960, 560, 1.0, "power2.inOut"], [tFenced, 980, 570, 1.02, "sine.inOut"],
    [tSo + 0.3, 1260, 690, 1.32, "power2.inOut"], [tImag - 0.2, 1270, 660, 1.28, "sine.inOut"], [tImag + 0.3, 1260, 610, 1.22, "power2.inOut"], [DUR, 1420, 640, 1.22, "sine.inOut"]
  ]);

  // ---- xe tải rời đi xa dần ----
  for (var j = 0; j < 3; j++) {
    var s = "#tr" + j, x0 = 300 + j * 330, t0 = tArmy + j * 0.35;
    api.key(s, "x", 0, x0); api.key(s, "x", t0, x0, "none"); api.key(s, "x", t0 + 4.5, x0 + 1900, "power1.in");
    api.key(s, "y", 0, 985); api.key(s, "y", t0 + 4.5, 900, "power1.in");
    api.key(s, "scale", 0, 0.8); api.key(s, "scale", t0, 0.8, "none"); api.key(s, "scale", t0 + 4.5, 0.32, "power1.in");
    api.key(s, "opacity", 0, 1); api.key(s, "opacity", t0 + 4.0, 1, "none"); api.key(s, "opacity", t0 + 4.5, 0, "none");
  }
  api.sfx("whoosh", tArmy + 0.3, 0.2);
  // ---- tờ lịch sử ----
  api.origin("#ls", "0 0");
  api.key("#ls", "scale", 0, 0); api.key("#ls", "scale", t60 - 0.25, 0, "none"); api.key("#ls", "scale", t60, 1, "back.out(2)");
  api.key("#ls", "rotation", 0, 0); for (var f = 0, tf = t60; tf < tToday; tf += 0.8, f++) api.key("#ls", "rotation", tf, f % 2 ? 3 : -3, "sine.inOut");
  api.key("#ls", "y", 0, 0); api.key("#ls", "y", tToday - 0.3, 0, "none"); api.key("#ls", "y", tToday + 0.4, -420, "power2.in");
  api.sfx("pop", t60, 0.35);
  // ---- biển ASBESTOS ----
  api.origin("#bienA", "0 -40");
  api.key("#bienA", "rotation", 0, 0); api.key("#bienA", "rotation", tAsb - 0.05, 0, "none"); api.key("#bienA", "rotation", tAsb + 0.12, 8, "sine.out"); api.key("#bienA", "rotation", tAsb + 0.3, -5, "sine.inOut"); api.key("#bienA", "rotation", tAsb + 0.5, 0, "sine.inOut");
  api.key("#bienA", "scale", 0, 1); api.key("#bienA", "scale", tAsb - 0.05, 1, "none"); api.key("#bienA", "scale", tAsb + 0.12, 1.15, "back.out(2)"); api.key("#bienA", "scale", tAsb + 0.5, 1, "sine.inOut");
  api.sfx("ting", tAsb, 0.3);

  // ---- Wob ngoài rào ----
  W.set(0, { x: 1300, y: 1010, size: 0.72, lashes: 1, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: -10, pupY: -4 });
  W.mouth(0, "flat");
  api.show("#W-bong", 0, 0);
  W.idle(0.2, tSo, { seed: 161, bien: 1.8 });
  W.pose(t60 - 0.2, 0.3, { pupX: -14, pupY: -10 }, "power2.out");
  W.pose(tDiffer + 0.2, 0.3, { pupX: -6, pupY: -2 }, "sine.inOut");
  W.nhunVai(tDiffer + 0.4, 0.4);
  W.pose(tToday, 0.4, { pupX: -10, pupY: -12 }, "sine.inOut");
  W.pose(tAsb - 0.1, 0.2, { pupX: -14, pupY: -2 }, "power2.out");
  W.mouth(tAsb, "o"); W.mouth(tAsb + 0.8, "flat");
  W.pose(tAsb + 0.4, 0.15, { sx: 0.96, lean: 4 }, "power2.out"); W.pose(tAsb + 0.6, 0.3, { sx: 1, lean: 0 }, "sine.inOut");
  W.blinkAt(4.6); W.blinkAt(7.4); W.blinkAt(11.0);
  // tay sau lưng, nhón chân, ba lô kéo ngả ngửa, lảo đảo đứng lại
  W.pose(tSo, 0.3, { aLu: -14, aLf: -6, aRu: 14, aRf: 6, pupX: -8, pupY: -6 }, "power2.inOut");
  W.mouth(tSo + 0.2, "smirk");
  var tn = tOutside + 0.2;
  W.pose(tn, 0.35, { y: 990, sy: 1.06 }, "power2.out");
  W.pose(tn + 0.5, 0.3, { lean: 25, packY: 8, aLu: 120, aRu: -120, aLf: 40, aRf: -40 }, "power2.in");
  W.pose(tn + 0.85, 0.15, { lean: 19, aLu: 150, aRu: -100 }, "sine.inOut");
  W.pose(tn + 1.0, 0.15, { lean: 25, aLu: 100, aRu: -150 }, "sine.inOut");
  W.pose(tn + 1.15, 0.15, { lean: 20, aLu: 150, aRu: -110 }, "sine.inOut");
  W.pose(tn + 1.35, 0.3, { lean: 0, y: 1010, sy: 1, packY: 0, aLu: 60, aRu: -60 }, "back.out(2)");
  W.mouth(tn + 0.6, "o");
  W.pose(tn + 1.9, 0.3, { aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "power2.inOut");
  W.mouth(tn + 1.8, "flat");
  api.sfx("bonk", tn + 1.35, 0.45); api.sfx("liu-lo-soc", tn + 0.55, 0.4);
  W.idle(tn + 2.0, tImag, { seed: 162, bien: 1.4 });
  // ---- bong bóng tưởng tượng ----
  api.origin("#bub", "110 138");
  api.key("#bub", "scale", 0, 0); api.key("#bub", "scale", tImag - 0.05, 0, "none"); api.key("#bub", "scale", tImag + 0.3, 1, "back.out(1.8)");
  api.key("#bub", "scale", DUR - 1.6, 1, "none"); api.key("#bub", "scale", DUR - 1.3, 0, "power2.in");
  api.sfx("pop", tImag, 0.35);
  M.set(0, { x: -150, y: 40, size: 0.26, lashes: 1, ice: 0, aRu: -30, aRf: 10, aLu: 18, aLf: -10 });
  M.mouth(0, "grin");
  M.pose(tBowl - 0.4, 0.3, { aRu: -150, aRf: -10, lean: -6 }, "power2.out");
  M.pose(tBowl, 0.15, { aRu: 30, aRf: 10, lean: 8 }, "power3.in");
  M.pose(tBowl + 0.4, 0.3, { lean: 0 }, "sine.out");
  // bóng: lăn trong bong bóng → ra khỏi bong bóng → rơi xuống tuyết cạnh chân Wob
  var bx0 = 1200 - 150 + 30, by0 = 560 + 40 - 26, tR = tBowl + 0.12, tOut = tR + 0.7, tLand = tOut + 0.42;
  api.origin("#ball", "0 0");
  api.key("#ball", "x", 0, bx0); api.key("#ball", "y", 0, by0);
  api.key("#ball", "x", tR, bx0, "none"); api.key("#ball", "x", tOut, 1450, "none"); api.key("#ball", "x", tLand, 1440 + 60, "power1.out");
  api.key("#ball", "y", tOut, by0, "none"); api.key("#ball", "y", tLand, 984, "power2.in"); api.key("#ball", "y", tLand + 0.15, 960, "sine.out"); api.key("#ball", "y", tLand + 0.3, 984, "sine.in");
  api.key("#ball", "rotation", 0, 0); api.key("#ball", "rotation", tR, 0, "none"); api.key("#ball", "rotation", tLand + 0.3, 540, "power1.out");
  api.key("#ball", "opacity", 0, 0, "step"); api.key("#ball", "opacity", tBowl, 1, "step");
  api.sfx("xuoc-dia", tR, 0.2); api.sfx("drop", tLand, 0.6);
  W.pose(tImag + 0.2, 0.3, { pupX: -4, pupY: -14 }, "power2.out");
  W.mouth(tImag + 0.3, "grin");
  W.pose(tOut, 0.25, { pupX: 12, pupY: -6 }, "power2.out");
  W.pose(tLand, 0.2, { pupX: 14, pupY: 12 }, "power2.out");
  W.mouth(tLand, "o"); W.mouth(tLand + 0.4, "flat");
  // nhìn quả bóng 0,8 s rồi nhặt bóng, đi về phía toà tháp
  var tNhat = tLand + 0.85;
  W.pose(tNhat, 0.3, { aRu: -40, aRf: -10, lean: 8, sy: 0.94 }, "power2.inOut");
  api.key("#ball", "opacity", tNhat + 0.3, 0, "step");
  api.show("#W-bong", tNhat + 0.3, 1);
  W.pose(tNhat + 0.35, 0.3, { aRu: -30, aRf: 40, lean: 0, sy: 1 }, "back.out(1.6)");
  W.mouth(tNhat + 0.4, "smirk");
  W.walk(tNhat + 0.55, DUR - 0.1, 1300, 1300 + (DUR - 0.1 - tNhat - 0.55) * 240, { step: 0.3, arms: false, tieng: true });
};
