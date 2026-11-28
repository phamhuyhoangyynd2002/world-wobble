/* Đoạn d11 · cắt giấy · lên bờ: camera lướt từ sườn núi xuống dải đất xanh có làng; Wob nhảy từ tảng đá lên bãi đá đen, kéo mũ trùm xuống.
   Tấm biển tên làng dài quá khổ: camera lia theo chữ, Wob đi mãi chưa hết; lùi nhanh cho cả dòng EDINBURGH OF THE SEVEN SEAS
   nằm trọn khung (chữ ≥ 80 px hệ 1920), giữ > 1 s trước "named". Wob chạy tới cuối biển, thở hắt; thẻ 1867; tàu buồm nhỏ ngoài khơi
   neo rồi đi. Tấm gỗ nhỏ "the Settlement" thả xuống ở đầu kia (dòng tên dài đã ra khỏi khung); Wob gật gù, chỉ. Kết: Wob đứng bãi đá
   khoanh tay nhìn núi, chiếc lá bay qua mặt, giữ rồi phủ thành giấy. Vào "cat" (từ d10 vẽ tay), ra "giay". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tOff = T("officially", 0, 3.08), tNamed = T("named", 0, 6.16), tEi = T("eighteen", 0, 10.74), tIsl = T("islanders", 0, 12.6),
    tThat = T("that.", 0, 13.66), tSet = T("settlement", 0, 14.66), tStood = T("stood", 0, 15.66), tNob = T("nobody", 0, 18.44), tPur = T("purpose", 0, 19.44);

  // ---------- XA (p 0.35): biển xám chân trời, núi lửa khổng lồ, mây quấn đỉnh, tàu buồm nhỏ ----------
  var xa = "";
  xa += TD.bien(api, "bX", { x0: -1200, x1: 4400, y: 640, n: 3, day: 60, cao: 1200, bien: 14, mau: ["#8C9C9F", "#76888C", "#617378"] });
  xa += at(1000, 700, TD.nui({ w: 2600, h: 1340, seed: 1101, phang: 0 }));
  xa += '<g id="mayDinh">' + at(1040, -520, TD.may(620, { seed: 1102, mau: "#EEF0EB", cao: 160 })) + at(760, -420, TD.may(380, { seed: 1103, mau: "#E4E7E2" })) + "</g>";
  xa += at(1700, 120, TD.may(420, { seed: 1104, mau: "#E4E7E2" })) + at(2900, 60, TD.may(460, { seed: 1105, mau: "#E4E7E2" }));
  xa += '<g id="tauX">' + TD.tauBuom("tb", { sep: false, dai: 230 }) + "</g>";

  // ---------- GIỮA (p 0.7): dải cỏ, dãy nhà đá mái tôn, bò ----------
  var gi = "";
  gi += D.paper("M -900 712 C -400 700 400 706 1200 700 C 2000 694 2800 704 3300 712 C 3360 716 3400 800 3420 1500 L -900 1500 Z", M.co, { stroke: true, sw: 5, sx: 0, sy: -6, half: 0.06 });
  var nhaX = [[-300, 270, 140], [120, 320, 150], [520, 280, 130], [960, 340, 160], [1420, 300, 140], [1860, 320, 150], [2300, 280, 136], [2740, 330, 150], [3120, 260, 130]];
  nhaX.forEach(function (n, j) { gi += at(n[0], 800, TD.nhaDa({ w: n[1], h: n[2], seed: 1110 + j, so: j % 3 === 0 ? 1 : 2 })); });
  gi += at(-100, 900, TD.tuongDa(700, 50, 1121)) + at(1200, 900, TD.tuongDa(900, 50, 1122)) + at(2500, 900, TD.tuongDa(700, 50, 1123));
  gi += '<g transform="translate(700,880) scale(0.62)">' + TD.bo("bo1", { mau: "#3B3532" }) + "</g>";
  gi += '<g transform="translate(2050,884) scale(0.58)">' + TD.bo("bo2", { mau: "#8A5A3A", lat: -1 }) + "</g>";
  gi += '<g transform="translate(2900,880) scale(0.55)">' + TD.bo("bo3", { mau: "#3B3532", lang: false }) + "</g>";

  // ---------- GẦN (p 1): bãi đá đen, đường đất, tấm biển tên làng dài, Wob ----------
  var BX0 = 1270, BX1 = 3640, BY0 = 520, BY1 = 690, TX = 1330, TW = 1820, FS = 110;
  var gan = "";
  
  gan += at(-1000, 910, TD.baiDa(6200, { seed: 1132, cao: 260 }));
  gan += D.paper("M -1000 890 C 1500 884 2600 892 3600 886 C 4200 884 4600 890 5100 888 L 5100 940 C 4200 946 2600 938 -1000 944 Z", M.dat, { stroke: true, sw: 4, shadow: false });
  [BX0 + 70, BX0 + 760, BX0 + 1460, BX1 - 80].forEach(function (x, j) { gan += D.paper(D.rRect(x - 14, BY1 - 6, 28, 912 - BY1, 1, 1140 + j), M.go, { stroke: true, sw: 4, sx: 4, sy: 5 }); });
  gan += D.paper(D.rRect(BX0, BY0, BX1 - BX0, BY1 - BY0, 1.6, 1145), "#F1E7D0", { stroke: true, sw: 6, sx: 8, sy: 10 });
  gan += D.line("M " + (BX0 + 14) + " " + (BY0 + 14) + " L " + (BX1 - 14) + " " + (BY0 + 14) + " M " + (BX0 + 14) + " " + (BY1 - 14) + " L " + (BX1 - 14) + " " + (BY1 - 14), 4, "#3F6E9A", ' opacity="0.8"');
  gan += D.txt(TX, BY0 + 125, CH[0], FS, { anchor: "start", w: 800, fill: "#2F4A6B", extra: ' textLength="' + TW + '" lengthAdjust="spacingAndGlyphs"' });
  // tấm gỗ nhỏ "the Settlement" treo dưới đầu cuối biển
  var SX = 3460, SY = 800;
  gan += '<g id="bNho"><g id="bNhoIn">' + D.line("M -150 -112 L -150 -40 M 150 -112 L 150 -40", 4, "#6E5236") +
    D.paper(D.rRect(-195, -46, 390, 96, 2, 1150), "#B08A5E", { stroke: true, sw: 5, sx: 5, sy: 7 }) +
    D.line("M -180 -10 L 180 -12 M -180 22 L 180 20", 2.5, M.goToi, ' opacity="0.5"') + D.txt(0, 20, CH[1], 56, { w: 700, fill: "#FFF8EC", extra: ' data-layout-allow-overlap' }) + "</g></g>";
  gan += '<g id="t67">' + TD.the("t67i", CH[2], 64, { seed: 1151 }) + "</g>";
  var W = TD.wob(api, "W", { muTrum: 1, uot: true });
  gan += '<g id="bui">' + [0, 1, 2, 3, 4, 5, 6, 7].map(function (j) { return '<g id="bu' + j + '"><path d="' + D.rEll(0, 0, 26, 16, 2, 1160 + j) + '" fill="#C8BBA4" stroke="' + D.INK + '" stroke-width="2.5"/></g>'; }).join("") + "</g>";
  gan += W.svg;
  gan += '<g id="la"><g id="laIn">' + D.paper("M 0 -26 C 22 -18 26 12 0 26 C -26 12 -22 -18 0 -26 Z", "#7C9A4A", { stroke: true, sw: 3, sx: 3, sy: 4 }) + D.line("M 0 -22 L 0 24", 2.5, "#4F6A2E") + "</g></g>";

  var truoc = at(-300, 1090, TD.baiDa(900, { seed: 1171, cao: 80 })) + at(2300, 1110, TD.baiDa(700, { seed: 1172, cao: 60 })) + at(4100, 1100, TD.baiDa(900, { seed: 1173, cao: 70 }));

  api.dat(TD.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiXam)"/>' +
    api.lop("xa", xa, 0.35, { mat: 700 }) + api.lop("giua", gi, 0.7, { mat: 800 }) + api.lop("gan", gan, 1, { mat: 900 }) + api.lop("truoc", truoc, 1.3, { mat: 1080 }));
  api.noi({});

  // ---------- camera ----------
  var tPan = tOff + 0.32, tPanE = 4.5, tBack = tPanE + 0.42, tRun0 = tNamed + 0.65, tRun1 = tRun0 + 2.6;
  api.camera([
    [0, 560, 420, 1.12], [2.9, 900, 800, 1.3, "power2.inOut"],
    [tPan, 1420, 650, 1.45, "power2.inOut"], [tPanE, 2300, 640, 1.45, "sine.inOut"],
    [tBack, 2240, 655, 0.78, "power3.out"], [tNamed + 0.15, 2240, 655, 0.8, "sine.inOut"],
    [tRun0, 1720, 760, 1.4, "power2.inOut"], [tRun1 + 0.1, 3810, 720, 1.5, "power1.inOut"], [tStood - 0.1, 3810, 720, 1.52, "sine.inOut"],
    [tStood + 0.9, 3930, 740, 1.42, "power2.inOut"], [DUR, 3940, 744, 1.46, "sine.inOut"]
  ]);

  // ---------- Wob ----------
  W.set(0, { x: 150, y: 956, size: 0.5, pupX: 8, pupY: -6 });
  W.walk(0, 0.5, 150, 360, { step: 0.25 });
  TD.bayCung(api, "#W", 0.62, 1.22, 360, 956, 900, 918, 110);
  W.pose(0.5, 0.12, { sy: 0.86, sx: 1.1 }, "power2.in"); W.pose(0.62, 0.15, { sy: 1.08, sx: 0.94, aLu: 120, aRu: -120 }, "power2.out");
  W.pose(1.22, 0.07, { sy: 0.84, sx: 1.12 }, "power3.out"); W.pose(1.29, 0.25, { sy: 1, sx: 1, aLu: 18, aRu: -18 }, "back.out(2)");
  api.sfx("pop", 1.22, 0.3);
  W.pose(1.5, 0.3, { pupX: 4, pupY: -12 }, "power2.inOut");
  W.muTrum(2.3, 0);
  W.mouth(2.45, "grin");
  W.idle(2.6, tOff + 0.2, { seed: 112, bien: 0.8 });
  // đi đọc dọc biển (chậm, ngước nhìn chữ)
  W.pose(tOff - 0.1, 0.25, { pupY: -14, pupX: 10, upRot: -4 }, "power2.inOut");
  W.walk(tOff + 0.05, tNamed + 0.3, 900, 1700, { step: 0.34 });
  W.mouth(tOff + 1.4, "o");
  // chạy nước rút tới cuối biển
  W.pose(tRun0 - 0.25, 0.2, { lean: 10, pupY: 0, pupX: 12, upRot: 0 }, "power2.out");
  W.mouth(tRun0 - 0.2, "flat");
  W.walk(tRun0, tRun1, 1700, 3780, { step: 0.16, ease: "power1.inOut" });
  function px(t) { var u = Math.max(0, Math.min(1, (t - tRun0) / (tRun1 - tRun0))); u = u < 0.5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u); return 1700 + 2080 * u; }
  for (var j = 0; j < 8; j++) {
    var tb = tRun0 + 0.25 + j * 0.3, sel = "#bu" + j;
    api.origin(sel, "0 0");
    api.key(sel, "x", 0, px(tb) - 50, "step"); api.key(sel, "y", 0, 912, "step");
    api.key(sel, "scale", 0, 0, "step"); api.key(sel, "scale", tb, 0.3, "none"); api.key(sel, "scale", tb + 0.15, 1.2, "power2.out"); api.key(sel, "scale", tb + 0.55, 0, "power2.in");
    api.key(sel, "x", tb, px(tb) - 50, "none"); api.key(sel, "x", tb + 0.55, px(tb) - 110, "power2.out");
  }
  api.sfx("whoosh", tRun0 + 0.1, 0.25);
  // thở hắt
  var tA = tRun1 + 0.02;
  W.pose(tA, 0.18, { lean: 16, sy: 0.92, sx: 1.05, aLu: 40, aLf: 30, aRu: -40, aRf: -30, pupY: 10, pupX: 0 }, "power2.out");
  W.mouth(tA, "o");
  for (var k = 0; k < 3; k++) { W.pose(tA + 0.25 + k * 0.32, 0.15, { sy: 0.97 }, "sine.inOut"); W.pose(tA + 0.4 + k * 0.32, 0.15, { sy: 0.9 }, "sine.inOut"); }
  W.pose(tA + 1.3, 0.35, { lean: 0, sy: 1, sx: 1, aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "power2.inOut");
  W.mouth(tA + 1.35, "flat");
  W.pose(tEi - 0.25, 0.3, { pupX: -12, pupY: -14 }, "power2.inOut");
  W.mouth(tEi + 0.3, "grin");
  api.fade(W.td.uot, tRun0, 2.5, 0);
  // gật gù, chỉ tấm nhỏ
  W.pose(tIsl, 0.3, { pupX: -14, pupY: 4 }, "power2.inOut");
  for (var n = 0; n < 2; n++) { W.pose(tThat - 0.2 + n * 0.36, 0.16, { upRot: 6, upY: 6 }, "sine.inOut"); W.pose(tThat - 0.04 + n * 0.36, 0.16, { upRot: 0, upY: 0 }, "sine.inOut"); }
  W.pose(tSet - 0.2, 0.22, { aLu: 92, aLf: 6, pupX: -14, pupY: 2 }, "back.out(1.6)");
  W.mouth(tSet, "smirk");
  W.pose(tSet + 0.9, 0.3, { aLu: 18, aLf: -10 }, "power2.inOut");
  // ra bãi đá, khoanh tay nhìn núi
  W.walk(tStood - 0.05, tStood + 0.7, 3780, 3960, { step: 0.3 });
  W.pose(tStood + 0.85, 0.35, { aLu: -30, aLf: -62, aRu: 30, aRf: 62, pupX: -14, pupY: -12, upRot: -3 }, "power2.inOut");
  W.mouth(tStood + 0.9, "flat");
  W.lid(tNob + 0.4, 0.3, 0.35);
  W.blinkAt(17.0); W.blinkAt(tNob + 0.05);
  W.breathe(tStood + 1.3, DUR, 2.2);
  W.autoBlink(2.6, tStood, 113);

  // ---------- tấm nhỏ, thẻ 1867, lá, tàu ----------
  api.origin("#bNho", "0 0"); api.origin("#bNhoIn", "0 -112");
  api.key("#bNho", "x", 0, SX, "step"); api.key("#bNho", "y", 0, SY - 520, "step");
  api.show("#bNho", 0, 0); api.show("#bNho", tIsl - 0.15, 1);
  api.key("#bNho", "y", tIsl - 0.15, SY - 520, "none"); api.key("#bNho", "y", tIsl + 0.25, SY, "power3.in");
  api.key("#bNhoIn", "rotation", 0, 0); api.key("#bNhoIn", "rotation", tIsl + 0.25, 0, "none");
  [8, -6, 4, -2, 0].forEach(function (v, i) { api.key("#bNhoIn", "rotation", tIsl + 0.45 + i * 0.32, v, "sine.inOut"); });
  api.sfx("bonk", tIsl + 0.25, 0.35);
  api.origin("#t67", "0 0");
  api.key("#t67", "x", 0, 3420, "step"); api.key("#t67", "y", 0, 606, "step"); api.key("#t67", "rotation", 0, -5, "step");
  api.pop("#t67", tEi - 0.1, 0.24);
  api.sfx("pop", tEi, 0.4);
  // lá bay qua mặt
  api.origin("#la", "0 0"); api.origin("#laIn", "0 0");
  var tL = tNob - 0.55;
  api.show("#la", 0, 0); api.show("#la", tL, 1); api.show("#la", tL + 1.1, 0);
  api.key("#la", "x", 0, 4500, "step"); api.key("#la", "y", 0, 780, "step");
  api.key("#la", "x", tL, 4500, "none"); api.key("#la", "x", tL + 0.5, 3975, "sine.out"); api.key("#la", "x", tL + 1.1, 3420, "sine.in");
  api.key("#la", "y", tL, 760, "none"); api.key("#la", "y", tL + 0.5, 816, "sine.inOut"); api.key("#la", "y", tL + 1.1, 770, "sine.inOut");
  api.key("#laIn", "rotation", 0, 0); api.key("#laIn", "rotation", tL, 0, "none"); api.key("#laIn", "rotation", tL + 1.1, -400, "sine.inOut");
  api.sfx("whoosh", tL + 0.2, 0.2);
  // tàu buồm nhỏ: ghé, neo, đi
  api.origin("#tauX", "0 0");
  api.key("#tauX", "x", 0, 3000, "step"); api.key("#tauX", "y", 0, 676, "step");
  api.key("#tauX", "x", tNamed, 3000, "none"); api.key("#tauX", "x", tNamed + 1.8, 2560, "power2.out");
  api.key("#tauX", "x", 10.4, 2560, "none"); api.key("#tauX", "x", 12.6, 3050, "power2.in");
  api.origin("#tb-neo", "0 0");
  api.key("#tb-neo", "y", 0, -36, "step"); api.key("#tb-neo", "y", tNamed + 1.9, -36, "none"); api.key("#tb-neo", "y", tNamed + 2.3, 0, "power2.in");
  api.key("#tb-neo", "y", 10.0, 0, "none"); api.key("#tb-neo", "y", 10.35, -36, "power2.out");
  api.key("#tauX", "rotation", 0, 0);
  for (var tr = 0.8, q = 0; tr < DUR; tr += 1.3, q++) api.key("#tauX", "rotation", tr, q % 2 ? 1.5 : -1.5, "sine.inOut");
  // bò nhai, vẫy đuôi
  ["bo1", "bo2", "bo3"].forEach(function (b, i) {
    api.origin("#" + b + "-dau", "0 0"); api.origin("#" + b + "-duoi", "-128 -150");
    api.key("#" + b + "-dau", "rotation", 0, 18);
    api.key("#" + b + "-duoi", "rotation", 0, 0);
    for (var t = 0.4 + i * 0.3, c = 0; t < DUR; t += 0.9 + i * 0.15, c++) { api.key("#" + b + "-duoi", "rotation", t, c % 2 ? 10 : -10, "sine.inOut"); api.key("#" + b + "-dau", "rotation", t, c % 2 ? 22 : 16, "sine.inOut"); }
  });
  // mây đỉnh núi trôi nhẹ
  api.key("#mayDinh", "x", 0, 0); api.key("#mayDinh", "x", DUR, -60, "sine.inOut");
};
