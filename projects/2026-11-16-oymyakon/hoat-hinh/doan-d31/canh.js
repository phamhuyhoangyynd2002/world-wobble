/* Đoạn d31 · cắt giấy · hồi ức: mép làng mùa hè tháng Bảy (nắng gắt, cỏ, trời xanh đậm), tấm biển tên (mặt trơn), cột có đồng hồ
   giấy và nhiệt kế giấy; rồi trang sổ có thước dài vẽ tay. Vào "cat", ra "cat".
   Trang phục: Wob trùm áo lông, mũ lông, ba lô phồng (đuôi cá bọc khăn thò ra); lông mi rủ như cỏ héo; mồ hôi.
   Chữ: "> 20 h", "July 2010", "+34.6°C", "+94°F", "−67.7", "+34.6", "≈ 102°". Gag: dang tay không với tới hai đầu thước (lần hai). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK, HE = window.HE_B;
  // mốc từ: chỉ xét từ của đoạn này (lời vắt từ đoạn trước có mốc âm, có thể trùng từ khoá)
  var TU = []; (data.loi || []).forEach(function (l) { (l.tu || []).forEach(function (w) { if (w.start > -0.3) TU.push(w); }); });
  var T = function (w, k, du) { var h = TU.filter(function (x) { return x.text.toLowerCase().indexOf(w.toLowerCase()) >= 0; })[k || 0]; return h ? h.start : du; };
  var CH = data.chu_tren_do_vat, MAT = 872;   // [> 20 h, July 2010, +34.6°C, +94°F, −67.7, +34.6, ≈ 102°]

  var nen = HE.dongCo(api, {
    seed: 3100, tu: -1200, den: 4200, mat: MAT, matTroi: [1500, 170],
    nha: [[2050, 340, 210], [2600, 300, 190, "#7A4A3A"], [3150, 360, 220]], nhaXa: [[700, 742], [1400, 736], [1900, 748]],
    cay: [[-200, MAT + 4, 420], [1720, MAT + 4, 380]]
  });

  // ---- đạo cụ ----
  function bien() {   // tấm biển tên làng nhỏ, mặt trơn (chữ không thuộc đoạn này)
    return D.line("M -40 0 L -40 -150 M 40 0 L 40 -150", 10, INK) + D.line("M -40 0 L -40 -150 M 40 0 L 40 -150", 5, C.wood) +
      D.paper(D.rRect(-80, -210, 160, 80, 1.8, 3111), "#E9DDC2", { stroke: true, sw: 5, half: 0.12 }) + D.line("M -56 -186 L 56 -186 M -56 -156 L 40 -156", 4, "#C8B790");
  }
  function dongHo(id) {   // đồng hồ giấy 24 giờ: gần như cả vòng vàng, một lát tối mỏng (~3,5 h). Gốc: tâm.
    var R = 86, a0 = -Math.PI / 2 - 0.46, a1 = -Math.PI / 2 + 0.46;
    var s = D.paper(D.rEll(0, 0, R + 16, R + 16, 2, 3121), "#E9DDC2", { stroke: true, sw: 5 });
    s += '<circle cx="0" cy="0" r="' + R + '" fill="#F2C94C" stroke="' + INK + '" stroke-width="4"/>';
    s += '<path d="M 0 0 L ' + D.f1(R * Math.cos(a0)) + " " + D.f1(R * Math.sin(a0)) + " A " + R + " " + R + " 0 0 1 " + D.f1(R * Math.cos(a1)) + " " + D.f1(R * Math.sin(a1)) + ' Z" fill="#23365A" stroke="' + INK + '" stroke-width="3"/>';
    for (var k = 0; k < 24; k++) { var an = k * Math.PI / 12; s += D.line("M " + D.f1((R - 10) * Math.cos(an)) + " " + D.f1((R - 10) * Math.sin(an)) + " L " + D.f1(R * Math.cos(an)) + " " + D.f1(R * Math.sin(an)), k % 6 ? 2 : 4, INK, ' opacity="0.6"'); }
    s += '<g id="' + id + '-kim">' + D.line("M 0 6 L 0 -70", 7, INK) + "</g>";
    s += '<circle cx="0" cy="0" r="9" fill="' + INK + '"/>';
    return s;
  }
  function the(id, chu, w, size, mau) {   // thẻ giấy treo dây. Gốc: điểm treo
    return '<g id="' + id + '">' + D.line("M 0 0 L 0 26", 3, INK) + D.paper(D.rRect(-w / 2, 26, w, size * 1.5, 1.6, 3130 + w), "#FFF8EC", { stroke: true, sw: 4, sx: 4, sy: 5 }) +
      D.txt(0, 26 + size * 1.12, chu, size, { w: 800, fill: mau || INK }) + "</g>";
  }

  var M = api.wob("M", { packExtra: HE.duoiCa() });
  M.svg = HE.mac(M.svg, "M", "trum");
  var P = api.wob("P", { packExtra: HE.duoiCa() });
  P.svg = HE.mac(P.svg, "P", "trum");

  var PX = 1260;
  var mid = nen.giua;
  mid += at(520, MAT + 8, bien());
  mid += D.paper(D.rRect(PX - 13, 230, 26, MAT - 222, 1.5, 3140), C.woodDark, { stroke: true, sw: 4 });
  mid += at(PX, 330, g("dh", dongHo("dh")));
  mid += at(PX + 140, 300, the("tDh", CH[0], 200, 50));
  // nhiệt kế + MỘT khối nhãn trên mặt (phản biện #16): 'July 2010' → '+34.6°C' → '+94°F' hiện lần lượt đúng chữ
  mid += at(PX - 85, 470, D.thermometer("th", {}) +
    g("thPlate", D.paper(D.rRect(-28, 272, 226, 152, 1.6, 3145), "#F1E7D0", { stroke: true, sw: 4, sx: 4, sy: 5 })) +
    g("tJul", D.txt(85, 314, CH[1], 40, { w: 800 })) +
    g("thC", D.txt(85, 362, CH[2], 44, { w: 900 })) + g("thF", D.txt(85, 408, CH[3], 40, { w: 800, fill: "#5A3A25" })));
  mid += M.svg;

  // ---- trang sổ (lớp riêng, trượt lên che cảnh) ----
  var tr = "";
  tr += D.paper(D.rRect(70, 36, 1780, 1010, 2, 3150), "#F4EBD6", { stroke: true, sw: 6, sx: 10, sy: 14, shOp: 0.3 });
  for (var ly = 150; ly < 1030; ly += 58) tr += D.line("M 130 " + ly + " L 1820 " + ly, 2.5, "#9CC3CF", ' opacity="0.7"');
  tr += D.line("M 200 50 L 200 1030", 3, "#E8A08E");
  for (var hy = 110; hy < 1000; hy += 90) tr += '<circle cx="110" cy="' + hy + '" r="13" fill="#2F3A3C" stroke="' + INK + '" stroke-width="3"/>';
  // thước dài vẽ tay
  var RX0 = 270, RX1 = 1690, RY = 860;
  var thuoc = D.paper(D.rough([[RX0, RY], [RX1, RY - 4], [RX1 + 4, RY + 62], [RX0 - 2, RY + 66]], 2, 3151, 40), "#F2D27A", { stroke: true, sw: 5, sx: 5, sy: 6 });
  for (var tx = RX0 + 20, k = 0; tx < RX1 - 10; tx += 40, k++) thuoc += D.line("M " + tx + " " + (RY + 2) + " L " + tx + " " + (RY + (k % 5 ? 20 : 36)), 3, INK);
  tr += g("thuoc", thuoc);
  tr += at(RX0 + 40, RY - 30, g("lLow", D.txt(0, 0, CH[4], 70, { w: 900, fill: "#2E5E7A" })));
  tr += at(RX1 - 40, RY - 30, g("lHigh", D.txt(0, 0, CH[5], 70, { w: 900, fill: "#C9463A" })));
  // mũi tên khoảng cách + nhãn giữa
  var mt = D.line("M " + (RX0 + 40) + " 420 L " + (RX1 - 40) + " 420", 6, INK, ' stroke-dasharray="18 14"') +
    '<path d="M ' + (RX0 + 40) + ' 420 l 30 -18 l 0 36 Z" fill="' + INK + '"/><path d="M ' + (RX1 - 40) + ' 420 l -30 -18 l 0 36 Z" fill="' + INK + '"/>';
  tr += g("muiTen", mt);
  tr += at(960, 340, g("lGap", D.paper(D.rRect(-230, -76, 460, 104, 2, 3152), "#FFF8EC", { stroke: true, sw: 5, sx: 5, sy: 6 }) + D.txt(0, 0, CH[6], 84, { w: 900 })));
  tr += P.svg;
  var csArm = function (k, dir) {   // một tay cao su: dây (scaleX = độ dài) + bàn tay (dịch x)
    return g("cs" + k, g("cs" + k + "-day", '<path d="M 0 -6.5 L ' + dir + ' -6.5 L ' + dir + ' 6.5 L 0 6.5 Z" fill="' + INK + '"/>') + g("cs" + k + "-tay", '<circle cx="0" cy="0" r="10" fill="' + INK + '"/>'));
  };
  tr += g("cs", at(D.f1(960 - 112 * 0.7 * 1.22), D.f1(RY + 2 + (210 - 392) * 0.7), csArm("L", -1)) + at(D.f1(960 + 112 * 0.7 * 1.22), D.f1(RY + 2 + (210 - 392) * 0.7), csArm("R", 1)));
  var trang = g("trangIn", tr);

  api.dat(HE.defs() + nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }) +
    api.lop("trang", trang, 1, { mat: 1080 }));
  api.noi({});

  // ---- mốc lời ----
  var tLong = T("long", 0, 0.83), tBy = T("By", 0, 1.97), tDay = T("daylight", 0, 3.05), tTw = T("twenty", 0, 4.29), tHours = T("hours", 0, 4.64);
  var tJuly = T("July", 0, 5.64), tTen = T("ten", 0, 6.29), tRec = T("recorded", 0, 7.52), tThirty = T("thirty-four", 0, 8.08), tCel = T("Celsius", 0, 9.65);
  var tNinety = T("ninety-four", 0, 11.19), tFah = T("Fahrenheit", 0, 11.72), tPut = T("Put", 0, 12.84), tLow = T("low", 0, 13.45), tHigh = T("high", 0, 14.47);
  var tSide = T("side", 0, 14.69), tGap = T("gap", 0, 16.16), tTwo = T("two", 0, 17.86), tVery = T("Very", 0, 19.02), tFar = T("far", 0, 22.23);

  // ---- camera cảnh làng ----
  api.camera([
    [0, 990, 600, 1.22], [tBy - 0.4, 1010, 580, 1.26, "sine.inOut"],
    [tBy + 0.4, PX - 80, 470, 1.42, "power2.inOut"],                 // đồng hồ giấy trên cột, Wob vẫn trong khung
    [tHours + 0.6, PX - 76, 474, 1.5, "sine.inOut"],
    [tJuly + 0.2, PX - 40, 640, 1.34, "power2.inOut"],               // nhiệt kế + Wob
    [tCel + 0.3, PX - 20, 660, 1.5, "sine.inOut"],
    [tFah + 0.3, PX - 16, 676, 1.66, "power2.inOut"],
    [DUR, PX - 10, 680, 1.7, "sine.inOut"]
  ], ["xa", "giua", "gan"]);
  api.camera([[0, 960, 540, 1.0], [tPut, 960, 560, 1.0], [tVery - 0.2, 960, 580, 1.06, "sine.inOut"], [tVery + 0.6, 960, 620, 1.14, "power2.inOut"], [DUR, 960, 630, 1.2, "sine.inOut"]], ["trang"]);

  // ---- Wob dưới nắng ----
  api.set("#M-pack", 0, { scale: 1.15 });
  M.set(0, { x: 1000, y: 900, size: 0.7, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -175, aRf: -55, pupX: 9, pupY: -12, lid: 24 });
  M.mouth(0, "wobbly");
  M.pose(tLong, 0.3, { upRot: -3, upY: 4 }, "sine.inOut");
  M.idle(0, tBy, { seed: 311, bien: 2 });
  HE.moHoi(api, "M", 0.1, DUR, 312);
  // nhìn đồng hồ
  M.pose(tBy - 0.1, 0.3, { aRu: -18, aRf: 10, lid: 0, pupX: 10, pupY: -10, upRot: 0, upY: 0 }, "power2.inOut");
  M.mouth(tTw, "o");
  M.pose(tTw, 0.12, { eye: 1.15 }, "back.out(2)"); M.pose(tHours + 0.4, 0.25, { eye: 1 }, "power2.out");
  M.mouth(tHours + 0.5, "flat");
  // quạt tay khi nhiệt kế dâng
  for (var q = 0, tq = tJuly; tq < tCel - 0.4; q++, tq += 0.26) M.pose(tq, 0.13, { aRu: q % 2 ? -120 : -150, aRf: q % 2 ? -60 : -100 }, "sine.inOut");
  M.pose(tRec, 0.25, { pupX: 11, pupY: -4 }, "power2.out");
  M.mouth(tThirty, "o");
  // lau mồ hôi trán
  M.pose(tCel - 0.3, 0.22, { aRu: -168, aRf: -80 }, "power2.out");
  M.pose(tCel - 0.08, 0.26, { aRu: -176, aRf: -40, upRot: 4 }, "power2.inOut");
  M.pose(tCel + 0.2, 0.2, { aRu: -110, aRf: -10, upRot: 0 }, "power2.out");
  M.pose(tCel + 0.45, 0.3, { aRu: -18, aRf: 10 }, "power2.inOut");
  M.mouth(tCel + 0.1, "wobbly");
  // độ F: xìu xuống
  M.pose(tNinety - 0.1, 0.2, { eye: 1.18, pupY: -6 }, "back.out(2)");
  M.pose(tFah + 0.3, 0.4, { sy: 0.93, sx: 1.05, upY: 10, lid: 26, eye: 1 }, "power2.inOut");
  M.mouth(tFah + 0.3, "flat");
  M.shiver(tFah + 0.2, tPut, 1.2, 8);
  M.idle(tBy + 0.4, tPut, { seed: 313, bien: 1.4, tho: false });
  M.breathe(0, DUR, 1.6);
  M.autoBlink(tBy + 0.5, tFah, 3101);

  // ---- đồng hồ: kim quay một vòng ngày; thẻ > 20 h ----
  api.origin("#dh-kim", "0 0");
  api.key("#dh-kim", "rotation", 0, -60, "none"); api.key("#dh-kim", "rotation", DUR, 300, "none");
  api.origin("#tDh", "0 0"); api.pop("#tDh", tTw - 0.2, 0.3, tJuly - 0.45);   // tắt trước khi "July 2010" hiện
  api.sfx("pop", tTw - 0.18, 0.4);
  // ---- nhiệt kế dâng tới +34.6°C, thẻ July 2010, rồi +94°F ----
  api.origin("#th-merc", "0 0");
  api.set("#th-merc", 0, { scaleY: 0.42 });
  api.key("#th-merc", "scaleY", tRec - 0.3, 0.42, "none"); api.key("#th-merc", "scaleY", tCel - 0.05, 0.97, "power2.inOut");
  api.key("#th-merc", "scaleY", tCel + 0.1, 0.94, "sine.inOut"); api.key("#th-merc", "scaleY", tCel + 0.3, 0.97, "sine.inOut");
  api.origin("#thC", "85 346"); api.origin("#thF", "85 394");
  api.pop("#thC", tThirty - 0.05, 0.26);
  api.pop("#thF", tNinety - 0.08, 0.26);
  api.origin("#thPlate", "85 272"); api.pop("#thPlate", tJuly - 0.25, 0.25);
  api.origin("#tJul", "85 300"); api.pop("#tJul", tJuly - 0.12, 0.26);
  api.sfx("rise", tRec - 0.3, 0.5);
  api.sfx("ting", tCel - 0.05, 0.5);
  api.sfx("ting", tNinety - 0.06, 0.35);

  // ---- trang sổ trượt lên ----
  var tIn = tPut - 0.45;
  api.origin("#trangIn", "960 1080");
  api.set("#trangIn", 0, { y: 1180, rotation: -4 });
  api.key("#trangIn", "y", tIn, 1180, "none"); api.key("#trangIn", "y", tIn + 0.5, 0, "power3.out");
  api.key("#trangIn", "rotation", tIn, -4, "none"); api.key("#trangIn", "rotation", tIn + 0.6, 0, "back.out(1.6)");
  api.sfx("whoosh", tIn, 0.4);
  api.origin("#thuoc", RX0 + " " + RY);
  api.key("#thuoc", "scaleX", 0, 0); api.key("#thuoc", "scaleX", tIn + 0.4, 0, "none"); api.key("#thuoc", "scaleX", tLow - 0.1, 1, "power2.inOut");
  api.origin("#lLow", "0 0"); api.pop("#lLow", tLow - 0.15, 0.26);
  api.origin("#lHigh", "0 0"); api.pop("#lHigh", tHigh - 0.15, 0.26);
  api.sfx("pop", tLow - 0.13, 0.4); api.sfx("pop", tHigh - 0.13, 0.4);
  api.origin("#muiTen", "960 420");
  api.key("#muiTen", "scaleX", 0, 0); api.key("#muiTen", "scaleX", tGap - 0.1, 0, "none"); api.key("#muiTen", "scaleX", tGap + 1.0, 1, "power2.inOut");
  api.origin("#lGap", "0 0"); api.pop("#lGap", tTwo - 0.25, 0.3);
  api.sfx("ting", tTwo - 0.22, 0.55);

  // ---- Wob trên trang: nhìn hai đầu thước, rồi dang tay không với tới ----
  api.set("#P-pack", 0, { scale: 1.15 });
  P.set(0, { x: 960, y: RY + 2, size: 0.7, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10 });
  P.mouth(0, "flat");
  HE.moHoi(api, "P", tIn, DUR, 314);
  P.pose(tLow - 0.1, 0.2, { pupX: -11, pupY: 2, upRot: -3 }, "power2.out");
  P.pose(tHigh - 0.1, 0.25, { pupX: 11, pupY: 2, upRot: 3 }, "power2.out");
  P.pose(tSide + 0.5, 0.2, { pupX: -11, upRot: -3 }, "power2.out");
  P.pose(tSide + 1.0, 0.2, { pupX: 0, pupY: -10, upRot: 0 }, "power2.out");
  P.pose(tTwo - 0.1, 0.2, { eye: 1.15 }, "back.out(2)"); P.pose(tTwo + 0.5, 0.25, { eye: 1, pupY: 0 }, "power2.out");
  P.mouth(tTwo - 0.1, "o");
  P.idle(tIn + 0.5, tVery - 0.1, { seed: 315, bien: 1.4, tho: false });
  // dang tay: tay cao su kéo dài về hai đầu thước, run, vẫn thiếu ~30 px mỗi bên (gọi lại gag ngón tay ở d14)
  var SXP = 1.22, SHY = RY + 2 + (210 - 392) * 0.7, SHL = 960 - 112 * 0.7 * SXP, SHR = 960 + 112 * 0.7 * SXP;
  var LL = SHL - (RX0 + 30 + 10), LR = (RX1 - 30 - 10) - SHR, tA = tVery - 0.05, tA1 = tA + 0.9;
  P.pose(tA - 0.1, 0.2, { aLu: 92, aLf: 0, aRu: -92, aRf: 0, pupX: -11, pupY: 0 }, "back.out(1.6)");
  api.show("#P-aLu", 0, 1); api.show("#P-aRu", 0, 1); api.show("#P-aLu", tA + 0.08, 0); api.show("#P-aRu", tA + 0.08, 0);
  api.show("#cs", 0, 0); api.show("#cs", tA + 0.08, 1);
  [["L", LL, -1], ["R", LR, 1]].forEach(function (a) {
    var dg = "#cs" + a[0] + "-day", tay = "#cs" + a[0] + "-tay";
    api.origin(dg, "0 0"); api.origin(tay, "0 0");
    api.key(dg, "scaleX", 0, 60); api.key(dg, "scaleX", tA + 0.08, 60, "none"); api.key(dg, "scaleX", tA1, a[1] - 40, "power3.out"); api.key(dg, "scaleX", tA1 + 1.0, a[1] - 46, "sine.inOut"); api.key(dg, "scaleX", tA1 + 1.4, a[1], "power2.out");
    api.key(tay, "x", 0, a[2] * 60); api.key(tay, "x", tA + 0.08, a[2] * 60, "none"); api.key(tay, "x", tA1, a[2] * (a[1] - 40), "power3.out"); api.key(tay, "x", tA1 + 1.0, a[2] * (a[1] - 46), "sine.inOut"); api.key(tay, "x", tA1 + 1.4, a[2] * a[1], "power2.out");
    api.key(tay, "x", tFar + 0.2, a[2] * a[1], "none"); api.key(tay, "x", tFar + 0.4, a[2] * 60, "back.in(1.5)");
    api.key(dg, "scaleX", tFar + 0.2, a[1], "none"); api.key(dg, "scaleX", tFar + 0.4, 60, "back.in(1.5)");
    var sg = "#cs" + a[0]; api.origin(sg, "0 0"); api.key(sg, "rotation", 0, 0);
    for (var tt = tA1, k = 0; tt < tFar + 0.2; tt += 1 / 15, k++) api.key(sg, "rotation", tt, (k % 2 ? 1 : -1) * 1.4, "none");
    api.key(sg, "rotation", tFar + 0.25, 0, "none");
  });
  api.show("#cs", tFar + 0.4, 0); api.show("#P-aLu", tFar + 0.4, 1); api.show("#P-aRu", tFar + 0.4, 1);
  P.mouth(tVery + 0.1, "chatter");
  P.pose(tVery + 0.3, 0.8, { sx: SXP, sy: 0.9 }, "power2.out");
  P.shiver(tA1, tFar + 0.2, 2.2, 18);
  P.pose(tA1 + 0.1, 0.25, { pupX: 11 }, "power2.out");
  P.pose(T("lows", 0, 21.77), 0.25, { pupX: -11 }, "power2.out");
  P.pose(tFar + 0.4, 0.22, { sx: 1, sy: 1, aLu: 18, aLf: -10, aRu: -18, aRf: 10, upY: 6 }, "back.out(2.4)");
  P.mouth(tFar + 0.45, "wobbly");
  P.pose(tFar + 0.7, 0.3, { lid: 24, pupX: 0, pupY: 2, upY: 0 }, "power2.out");
  api.sfx("boing", tFar + 0.42, 0.45);
  P.breathe(tIn, DUR, 2.0);
};

/* ===== Khối dùng chung các đoạn mùa hè nhóm cat-giay B (d31, d33, d35, d37) – chép y hệt vào từng canh.js vì đoạn
   không được sửa thư viện. Phông đồng cỏ mùa hè, áo lông của Wob, ngựa Yakut, tuyết rơi. Tất định theo seed. ===== */
window.HE_B = (function () {
  "use strict";
  function D() { return window.DaoCu; }
  /* defs riêng: lông thú, trời hè */
  function defs() {
    return "<defs>" +
      '<pattern id="furP" width="26" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(12)"><rect width="26" height="22" fill="#8A6240"/>' +
      '<path d="M 2 4 l 5 9 M 11 1 l 4 10 M 19 6 l 5 9 M 6 14 l 4 7 M 15 13 l 5 8" stroke="#5E3F27" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M 8 3 l 3 6 M 21 12 l 3 6" stroke="#B48A60" stroke-width="2" stroke-linecap="round"/></pattern>' +
      '<pattern id="furD" width="26" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(12)"><rect width="26" height="22" fill="#6A4529"/>' +
      '<path d="M 2 4 l 5 9 M 11 1 l 4 10 M 19 6 l 5 9 M 6 14 l 4 7 M 15 13 l 5 8" stroke="#452C19" stroke-width="2.4" stroke-linecap="round"/>' +
      '<path d="M 8 3 l 3 6 M 21 12 l 3 6" stroke="#8C6440" stroke-width="2" stroke-linecap="round"/></pattern>' +
      '<pattern id="furL" width="22" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-10)"><rect width="22" height="18" fill="#EADFC8"/>' +
      '<path d="M 3 3 l 3 7 M 11 1 l 3 8 M 17 6 l 3 7 M 7 11 l 3 6" stroke="#B9A98C" stroke-width="2" stroke-linecap="round"/></pattern>' +
      '<linearGradient id="skyHe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E69B0"/><stop offset="0.55" stop-color="#7DB6E0"/><stop offset="1" stop-color="#D9EED8"/></linearGradient>' +
      '<radialGradient id="nangG" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFF6C8" stop-opacity="0.9"/><stop offset="0.5" stop-color="#FFE68A" stop-opacity="0.35"/><stop offset="1" stop-color="#FFE68A" stop-opacity="0"/></radialGradient>' +
      "</defs>";
  }
  /* nhà gỗ mùa hè (mái tôn xanh rêu, không tuyết). Gốc: giữa chân tường. */
  function nhaHe(w, h, seed, mai) {
    var d = D(), s = "", rf = w * 0.3;
    s += d.paper(d.rRect(-w / 2, -h, w, h, 2, seed), "#8B6446", { stroke: true, sw: 5, half: 0.16 });
    for (var y = -h + 22; y < -6; y += 24) s += d.line("M " + (-w / 2 + 6) + " " + y + " L " + (w / 2 - 6) + " " + (y + 1), 3, "#3A2618", ' opacity="0.5"');
    s += d.paper(d.rough([[-w / 2 - 22, -h + 4], [0, -h - rf], [w / 2 + 22, -h + 4]], 2, seed + 1, 18), mai || "#4F6E5A", { stroke: true, sw: 5, half: 0.15 });
    s += d.paper(d.rRect(-w * 0.13, -h * 0.66, w * 0.26, h * 0.32, 1.5, seed + 2), "#CFE3EA", { stroke: true, sw: 4, shadow: false });
    s += d.line("M 0 " + d.f1(-h * 0.66) + " L 0 " + d.f1(-h * 0.34), 3);
    return s;
  }
  /* thông rụng lá mùa hè: tán xanh nhiều tầng. Gốc: gốc cây. */
  function thongHe(hh, seed) {
    var d = D(), r = d.rng(seed), s = d.line("M 0 0 L 0 " + (-hh), 6, "#4A3324");
    for (var k = 0; k < 4; k++) {
      var y0 = -hh * (0.28 + k * 0.2), w = hh * (0.3 - k * 0.055);
      s += d.paper(d.rough([[-w, y0 + 16], [0, y0 - hh * 0.26], [w, y0 + 16]], 2, seed + k, 12), k % 2 ? "#5E8C46" : "#6E9E50", { stroke: true, sw: 3.5, sx: 3, sy: 4, shOp: 0.18 });
    }
    return s;
  }
  /* đồng cỏ mùa hè. o: { seed, tu, den, mat, matTroi:[x,y], nha:[[x,w,h,mai]], nhaXa:[[x,y]], cay:[[x,y,h]], coCao (số bụi cỏ gần), tuyet (thêm nhóm phủ tuyết để nháy mùa đông) }
     Trả { troi, xa, giua, gan }. */
  function dongCo(api, o) {
    var d = D(), C = d.C, INK = d.INK, paper = d.paper, rough = d.rough, line = d.line, at = api.at, g = api.g;
    o = o || {};
    var seed = o.seed || 3300, X0 = o.tu == null ? -1400 : o.tu, X1 = o.den == null ? 5000 : o.den, MAT = o.mat || 872;
    var mt = o.matTroi || [1500, 190];
    var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#skyHe)"/>';
    var far = "";
    var fx0 = X0 * 0.35 - 1000, fx1 = X1 * 0.35 + 1600;
    far += '<circle cx="' + mt[0] + '" cy="' + mt[1] + '" r="210" fill="url(#nangG)"/>';
    far += '<circle cx="' + mt[0] + '" cy="' + mt[1] + '" r="78" fill="#FFF2B0" stroke="' + INK + '" stroke-width="4" stroke-opacity="0.5"/>';
    far += g("tiaNang", (function () { var s = ""; for (var a = 0; a < 12; a++) { var an = a * Math.PI / 6; s += line("M " + d.f1(mt[0] + 100 * Math.cos(an)) + " " + d.f1(mt[1] + 100 * Math.sin(an)) + " L " + d.f1(mt[0] + 140 * Math.cos(an)) + " " + d.f1(mt[1] + 140 * Math.sin(an)), 7, "#FFE68A"); } return s; })());
    api.origin("#tiaNang", mt[0] + " " + mt[1]);
    api.key("#tiaNang", "rotation", 0, 0, "none"); api.key("#tiaNang", "rotation", api.DUR, 3 * api.DUR, "none");
    var m0 = [[fx0, 1500], [fx0, 560]], h1 = [[fx0, 1500], [fx0, 640]], h2 = [[fx0, 1500], [fx0, 720]];
    for (var x = fx0; x <= fx1; x += 150) {
      m0.push([x, 520 + 70 * Math.sin(x / 520) + 30 * Math.sin(x / 170)]);
      h1.push([x, 620 + 40 * Math.sin(x / 400 + 2) + 16 * Math.sin(x / 120)]);
      h2.push([x, 712 + 24 * Math.sin(x / 300 + 1)]);
    }
    m0.push([fx1, 1500]); h1.push([fx1, 1500]); h2.push([fx1, 1500]);
    far += paper(rough(m0, 3, seed + 1, 30), "#7E9BB4", { shadow: false, stroke: true, sw: 3 });
    far += paper(rough(h1, 3, seed + 2, 30), "#6F9A55", { shadow: false, stroke: true, sw: 3 });
    for (var t = 0, tx = fx0 + 150; tx < fx1; t++, tx += 150 + (t % 3) * 50) far += at(tx, 650 + (t % 4) * 20, '<g transform="scale(' + (0.32 + (t % 3) * 0.06) + ')">' + thongHe(200 + (t % 5) * 20, seed + 10 + t) + "</g>");
    far += paper(rough(h2, 3, seed + 3, 30), "#A6C26E", { shadow: false, stroke: true, sw: 3 });
    (o.nhaXa || []).forEach(function (h, i) { far += at(h[0], h[1], '<g transform="scale(0.34)">' + nhaHe(300, 170, seed + 20 + i, i % 2 ? "#7A4A3A" : "#4F6E5A") + "</g>"); });
    if (o.tuyet) {
      var f2 = "";
      f2 += paper(rough(m0, 3, seed + 1, 30), "#DCE7EE", { shadow: false, stroke: true, sw: 3 });
      f2 += paper(rough(h1, 3, seed + 2, 30), "#EEF3F5", { shadow: false, stroke: true, sw: 3 });
      f2 += paper(rough(h2, 3, seed + 3, 30), "#F7FBFC", { shadow: false, stroke: true, sw: 3 });
      far += g("dongXa", f2);
    }
    // lớp giữa: cỏ xanh vàng, lối mòn đất, bụi cỏ, hoa
    var mid = "";
    mid += paper(rough([[X0, MAT], [X1, MAT - 4], [X1, MAT + 1700], [X0, MAT + 1700]], 3, seed + 30, 30), "#A3C25E", { shadow: false });
    mid += '<rect x="' + X0 + '" y="' + (MAT + 40) + '" width="' + (X1 - X0) + '" height="1660" fill="#93B652"/>';
    mid += paper("M " + X0 + " " + (MAT + 34) + " C " + (X0 + 1500) + " " + (MAT + 20) + " " + (X1 - 1500) + " " + (MAT + 44) + " " + X1 + " " + (MAT + 30) + " L " + X1 + " " + (MAT + 96) + " C " + (X1 - 1500) + " " + (MAT + 110) + " " + (X0 + 1500) + " " + (MAT + 90) + " " + X0 + " " + (MAT + 100) + " Z", "#CDB585", { shadow: false, stroke: true, sw: 3 });
    var r = d.rng(seed + 40);
    for (var k = 0; k < (X1 - X0) / 70; k++) {
      var gx = X0 + r() * (X1 - X0), gy = MAT + 6 + r() * 26;
      if (r() < 0.5) gy = MAT + 104 + r() * 120;
      mid += line("M " + d.f1(gx) + " " + d.f1(gy) + " l -6 -18 M " + d.f1(gx + 6) + " " + d.f1(gy) + " l 2 -22 M " + d.f1(gx + 12) + " " + d.f1(gy) + " l 8 -16", 3, "#4E7A34");
      if (r() < 0.35) mid += '<circle cx="' + d.f1(gx + 3) + '" cy="' + d.f1(gy - 20) + '" r="5" fill="' + ["#FFFDF6", "#F2C94C", "#B58AD0"][k % 3] + '" stroke="' + INK + '" stroke-width="1.5"/>';
    }
    (o.cay || []).forEach(function (c, i) { mid += at(c[0], c[1], thongHe(c[2], seed + 50 + i)); });
    (o.nha || []).forEach(function (h, i) { mid += at(h[0], MAT, nhaHe(h[1], h[2], seed + 60 + i, h[3])); });
    if (o.tuyet) mid += g("dongGiua", paper(rough([[X0, MAT - 6], [X1, MAT - 10], [X1, MAT + 1700], [X0, MAT + 1700]], 3, seed + 31, 30), "#F4F8FA", { shadow: false }) +
      '<rect x="' + X0 + '" y="' + (MAT + 120) + '" width="' + (X1 - X0) + '" height="1600" fill="url(#halfW)" opacity="0.4"/>');
    // lớp gần: bụi cỏ cao + hoa
    var near = "", nx0 = X0 * 1.4 - 600, nx1 = X1 * 1.4 + 600;
    for (var b = 0, bx = nx0; bx < nx1; b++, bx += 640 + (b % 3) * 120) {
      var bb = "";
      for (var q = 0; q < 9; q++) {
        var qx = bx + q * 22, qh = 110 + ((q * 37 + b * 13) % 60);
        bb += line("M " + qx + " 1120 C " + (qx - 4) + " " + (1120 - qh * 0.5) + " " + (qx + 10) + " " + (1120 - qh * 0.8) + " " + (qx + (q % 2 ? 22 : -14)) + " " + (1120 - qh), 6, INK) + line("M " + qx + " 1120 C " + (qx - 4) + " " + (1120 - qh * 0.5) + " " + (qx + 10) + " " + (1120 - qh * 0.8) + " " + (qx + (q % 2 ? 22 : -14)) + " " + (1120 - qh), 3.5, q % 3 ? "#6E9E50" : "#8DB860");
      }
      bb += '<circle cx="' + (bx + 60) + '" cy="' + 1000 + '" r="11" fill="#FFFDF6" stroke="' + INK + '" stroke-width="3"/><circle cx="' + (bx + 60) + '" cy="1000" r="4" fill="#F2C94C"/>';
      near += bb;
    }
    if (o.tuyet) near = near + g("dongGan", paper(rough([[nx0, 1300], [nx0, 1040], [nx1, 1030], [nx1, 1300]], 4, seed + 92, 26), "#F7FBFC", { shadow: false, stroke: true, sw: 4 }));
    return { troi: troi, xa: far, giua: mid, gan: near };
  }

  /* Áo lông cho Wob: chèn vào chuỗi SVG của con rối, ngay trước hai tay (nằm trong nhóm thân trên "-up").
     kieu: "trum" (mũ trùm + mũ lông, áo kín tới chân) | "mo" (áo khoác mở, vạt hai bên). Kèm lông mi rủ như cỏ héo và
     giọt mồ hôi (id: <id>-mh0..2, gốc ở đỉnh giọt). Dùng: W.svg = HE_B.mac(W.svg, id, kieu). */
  function mac(svg, id, kieu) {
    var d = D(), INK = d.INK, s = "";
    if (kieu === "trum") {
      // mũ trùm lông nâu đậm viền kem (khớp d30, d32): mũ trùm liền áo tới gối, dải lông kem ngang trán và ở gấu áo
      var out = "M 40 348 C 18 230 30 30 200 6 C 370 30 382 230 360 348 C 300 366 100 366 40 348 Z";
      var hole = " M 104 186 C 104 128 148 94 200 94 C 252 94 296 128 296 186 C 296 244 252 278 200 278 C 148 278 104 244 104 186 Z";
      s += '<path d="' + out + hole + '" fill="#0b1214" opacity="0.2" fill-rule="evenodd" transform="translate(5,7)"/>';
      s += '<path d="' + out + hole + '" fill="url(#furD)" stroke="' + INK + '" stroke-width="6" fill-rule="evenodd" stroke-linejoin="round"/>';
      s += '<path d="' + hole.trim() + '" fill="none" stroke="' + INK + '" stroke-width="5"/>';
      s += d.line("M 96 150 C 130 92 270 92 304 150", 34, INK) + d.line("M 96 150 C 130 92 270 92 304 150", 26, "url(#furL)");
      s += d.line("M 46 344 C 110 364 290 364 354 344", 22, INK) + d.line("M 46 344 C 110 364 290 364 354 344", 15, "url(#furL)");
      s += d.line("M 200 282 L 200 340", 4, INK, ' opacity="0.5"') + '<rect x="190" y="292" width="20" height="9" rx="3" fill="#E9DCC2" stroke="' + INK + '" stroke-width="2.5"/><rect x="190" y="318" width="20" height="9" rx="3" fill="#E9DCC2" stroke="' + INK + '" stroke-width="2.5"/>';
    } else {
      var L = "M 80 112 C 56 180 52 268 70 330 L 74 358 L 148 358 L 150 330 C 128 262 126 180 140 124 Z";
      var R = "M 320 112 C 344 180 348 268 330 330 L 326 358 L 252 358 L 250 330 C 272 262 274 180 260 124 Z";
      [L, R].forEach(function (p) {
        s += '<path d="' + p + '" fill="#0b1214" opacity="0.2" transform="translate(5,7)"/>';
        s += '<path d="' + p + '" fill="url(#furP)" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
      });
      s += d.line("M 140 126 C 126 184 128 262 150 330", 16, INK) + d.line("M 140 126 C 126 184 128 262 150 330", 10, "#EADFC8");
      s += d.line("M 260 126 C 274 184 272 262 250 330", 16, INK) + d.line("M 260 126 C 274 184 272 262 250 330", 10, "#EADFC8");
    }
    // lông mi rủ như cỏ héo
    [[160, 126], [238, 126]].forEach(function (e) {
      s += d.line("M " + (e[0] - 14) + " " + (e[1] + 2) + " C " + (e[0] - 26) + " " + (e[1] - 2) + " " + (e[0] - 32) + " " + (e[1] + 10) + " " + (e[0] - 30) + " " + (e[1] + 24) +
        " M " + e[0] + " " + (e[1] - 2) + " C " + (e[0] - 6) + " " + (e[1] - 14) + " " + (e[0] - 18) + " " + (e[1] - 8) + " " + (e[0] - 16) + " " + (e[1] + 10) +
        " M " + (e[0] + 14) + " " + (e[1] + 2) + " C " + (e[0] + 26) + " " + (e[1] - 4) + " " + (e[0] + 34) + " " + (e[1] + 8) + " " + (e[0] + 30) + " " + (e[1] + 22), 5, INK);
    });
    // giọt mồ hôi
    [[118, 104], [292, 118], [252, 70]].forEach(function (p, i) {
      s += '<g transform="translate(' + p[0] + "," + p[1] + ')"><g id="' + id + "-mh" + i + '"><path d="M 0 0 C -8 12 -10 20 0 24 C 10 20 8 12 0 0 Z" fill="#9FD3EA" stroke="' + INK + '" stroke-width="3"/></g></g>';
    });
    var mk = '<g transform="translate(88,210)">';
    var i = svg.lastIndexOf(mk);
    return svg.slice(0, i) + s + svg.slice(i);
  }
  /* mồ hôi chảy: mỗi giọt trượt xuống rồi rơi, lặp. */
  function moHoi(api, id, t0, t1, seed) {
    var r = window.DaoCu.rng(seed || 7);
    for (var i = 0; i < 3; i++) {
      var sel = "#" + id + "-mh" + i, per = 1.3 + r() * 0.6, ph = r() * per;
      api.origin(sel, "0 0");
      api.key(sel, "y", 0, 0); api.key(sel, "opacity", 0, 0, "step");
      for (var c = t0 + ph; c < t1; c += per) {
        api.key(sel, "y", c, 0, "step"); api.key(sel, "opacity", c, 1, "step");
        api.key(sel, "y", c + per * 0.7, 26, "sine.in"); api.key(sel, "y", c + per * 0.95, 70, "power2.in");
        api.key(sel, "opacity", c + per * 0.8, 1, "none"); api.key(sel, "opacity", c + per * 0.95, 0, "power1.in");
      }
    }
  }
  /* ba lô phồng có đuôi cá (bọc khăn kẻ ô) thò ra trên miệng – truyền vào opts.packExtra của api.wob */
  function duoiCa() {
    var INK = window.DaoCu.INK, C = window.DaoCu.C;
    return '<g transform="translate(318,70) rotate(-70) scale(0.7)"><path d="M 90 -5 L 134 -38 C 126 -14 126 14 134 38 L 90 5 Z" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="M 30 -32 C 70 -24 90 -12 96 -6 L 96 6 C 90 12 70 24 30 32 Z" fill="url(#plaid)" stroke="' + INK + '" stroke-width="6"/></g>';
  }

  /* Ngựa Yakut (nhìn nghiêng, quay trái): thấp, chân ngắn, thân tròn chắc, lông dày, bờm rậm.
     Gốc: mặt đất giữa bốn chân. Nhóm: <id>-dau (đầu+cổ, xoay quanh gốc cổ; -75 ≈ cúi gặm cỏ, 0 = ngẩng), <id>-duoi, <id>-mat (con ngươi), <id>-than.
     o: { long, bom, tuyet (lớp tuyết trên lưng, ẩn sẵn: <id>-tuyet) } */
  function ngua(id, o) {
    o = o || {};
    var d = D(), INK = d.INK, paper = d.paper, line = d.line, rough = d.rough;
    var L = o.long || "#D9D2C2", B = o.bom || "#7E766A", Ls = o.longToi || "#B9B09E", sd = o.seed || 3400;
    var s = '<g id="' + id + '">';
    s += '<ellipse cx="10" cy="4" rx="190" ry="16" fill="#0b1214" opacity="0.2"/>';
    // chân sau (tối hơn)
    [[-62, Ls], [70, Ls]].forEach(function (c, i) { s += paper(d.rRect(c[0] - 17, -112, 34, 100, 1.5, sd + i), c[1], { stroke: true, sw: 4.5, sx: 3, sy: 4 }) + '<rect x="' + (c[0] - 17) + '" y="-16" width="34" height="16" rx="5" fill="#3B3029" stroke="' + INK + '" stroke-width="4"/>'; });
    s += '<g transform="translate(0,38)">';
    // đuôi
    s += '<g transform="translate(150,-214)"><g id="' + id + '-duoi">' + paper("M 0 0 C 34 10 52 60 40 120 C 36 150 22 170 30 188 C 8 180 -8 150 -6 110 C -4 70 -14 30 0 0 Z", B, { stroke: true, sw: 5, sx: 4, sy: 5 }) +
      line("M 6 20 C 22 60 22 110 12 160 M 22 30 C 34 70 32 110 26 150", 3, "#00000033") + "</g></g>";
    // thân
    s += '<g id="' + id + '-than">' + paper(rough(d.ptsEllipse(14, -200, 172, 104, 40), 7, sd + 5, 12), L, { stroke: true, sw: 5.5, half: 0.12 });
    // lông xù dưới bụng, ngực, mông
    var by = function (x) { var u = (x - 14) / 172; return -200 + 100 * Math.sqrt(Math.max(0, 1 - u * u)); };
    var xu = "M -140 " + d.f1(by(-140) - 24) + " ";
    for (var q = 0; q <= 16; q++) { var qx = -140 + q * 18; xu += "L " + (qx + 9) + " " + d.f1(by(qx + 9) + 16) + " L " + (qx + 18) + " " + d.f1(by(qx + 18) - 2) + " "; }
    xu += "L 148 " + d.f1(by(148) - 24) + " Z";
    s += paper(xu, L, { stroke: true, sw: 4, shadow: false });
    s += paper("M -150 -240 L -176 -222 L -160 -210 L -184 -194 L -164 -184 L -182 -168 L -150 -160 Z", L, { stroke: true, sw: 4, shadow: false });
    s += '<path d="M -130 -160 C -60 -120 80 -118 170 -170" fill="none" stroke="' + Ls + '" stroke-width="10" opacity="0.6"/>';
    var r = d.rng(sd + 6);
    for (var k = 0; k < 16; k++) { var hx = -130 + k * 18, hy = -128 + Math.abs(k - 8) * 3; s += line("M " + hx + " " + d.f1(hy) + " l " + d.f1(r() * 6 - 3) + " 16", 3, INK, ' opacity="0.55"'); }
    s += g2(id + "-tuyet", paper(rough([[-110, -282], [-40, -300], [60, -302], [150, -280], [140, -264], [-100, -266]], 3, sd + 7, 16), "#F7FBFC", { stroke: true, sw: 4, shadow: false }));
    s += "</g>";
    s += "</g>";
    // chân trước
    [-100, 30].forEach(function (x, i) { s += paper(d.rRect(x - 18, -112, 36, 102, 1.5, sd + 10 + i), L, { stroke: true, sw: 4.5, sx: 3, sy: 4 }) + '<rect x="' + (x - 18) + '" y="-16" width="36" height="16" rx="5" fill="#3B3029" stroke="' + INK + '" stroke-width="4"/>' + line("M " + (x - 14) + " -40 C " + (x - 4) + " -30 " + (x + 6) + " -30 " + (x + 16) + " -40", 3, INK, ' opacity="0.5"'); });
    // đầu + cổ (xoay quanh gốc cổ -110,-215)
    var dau = "";
    dau += line("M -110 -215 L -205 -335", 86, INK) + line("M -110 -215 L -205 -335", 76, L);
    dau += paper("M -178 -378 C -150 -368 -150 -336 -170 -314 L -282 -244 C -304 -230 -326 -252 -314 -276 L -232 -356 C -216 -374 -196 -382 -178 -378 Z", L, { stroke: true, sw: 5, sx: 4, sy: 5 });
    dau += '<path d="M -296 -232 C -318 -236 -330 -256 -316 -274 L -292 -282 C -300 -262 -294 -246 -276 -238 Z" fill="' + Ls + '"/>';
    dau += '<ellipse cx="-306" cy="-262" rx="5" ry="3.5" fill="' + INK + '"/>';
    dau += line("M -290 -236 C -284 -240 -276 -240 -270 -236", 3, INK);
    dau += '<path d="M -190 -372 L -180 -410 L -164 -370 Z" fill="' + L + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    dau += '<ellipse cx="-214" cy="-338" rx="11" ry="10" fill="#FFFDF6" stroke="' + INK + '" stroke-width="3"/>';
    dau += '<g id="' + id + '-mat"><circle cx="-217" cy="-337" r="5.5" fill="' + INK + '"/></g>';
    dau += line("M -226 -348 C -218 -352 -208 -352 -200 -346", 3.5, INK);
    // bờm rậm dọc cổ + chỏm trán
    var bom = "M -96 -238 ", bx2 = [[-108, -270], [-130, -284], [-150, -306], [-168, -326], [-184, -350], [-196, -372]];
    bx2.forEach(function (p, i) { bom += "L " + (p[0] + (i % 2 ? 16 : 26)) + " " + (p[1] + (i % 2 ? 4 : 14)) + " L " + p[0] + " " + p[1] + " "; });
    bom += "L -214 -384 L -176 -394 L -150 -350 L -120 -310 L -84 -264 Z";
    dau += paper(bom, B, { stroke: true, sw: 4.5, sx: 3, sy: 4 });
    dau += paper("M -200 -376 C -214 -368 -232 -360 -236 -344 C -220 -350 -206 -352 -196 -360 Z", B, { stroke: true, sw: 3.5, shadow: false });
    s += '<g transform="translate(0,38)"><g id="' + id + '-dau">' + dau + "</g></g>";
    return s + "</g>";
    function g2(i, inner) { return '<g id="' + i + '">' + inner + "</g>"; }
  }
  /* gặm cỏ: cúi đầu, nhấm nhấm (đầu nhích nhẹ), đuôi phẩy. */
  function gam(api, id, t0, t1, seed) {
    var r = window.DaoCu.rng(seed || 3), sel = "#" + id + "-dau";
    api.key(sel, "rotation", t0, -80, "power2.inOut");
    for (var t = t0 + 0.4 + r() * 0.3; t < t1 - 0.2; t += 0.32 + r() * 0.2) api.key(sel, "rotation", t, -80 + (r() < 0.5 ? 3 : -2) - r() * 2, "sine.inOut");
  }
  function phayDuoi(api, id, t0, t1, seed) {
    var r = window.DaoCu.rng(seed || 5), sel = "#" + id + "-duoi";
    api.key(sel, "rotation", t0, 0, "none");
    for (var t = t0 + 0.5 + r(); t < t1 - 0.6; t += 1.4 + r() * 1.6) { api.key(sel, "rotation", t, 0, "none"); api.key(sel, "rotation", t + 0.2, 14, "power2.out"); api.key(sel, "rotation", t + 0.45, -6, "sine.inOut"); api.key(sel, "rotation", t + 0.7, 0, "sine.out"); }
  }
  function tuyetRoi(api, pre, n, seed, o) {
    var d = D(), r = d.rng(seed), s = "", DUR = api.DUR;
    for (var i = 0; i < n; i++) {
      var id = pre + i, sel = "#" + id, x = o.x0 + r() * (o.x1 - o.x0), rr = (o.r || 5) * (0.6 + r() * 0.8);
      var H = o.y1 - o.y0, v = (o.toc || 60) * (0.7 + r() * 0.6), per = H / v, tc = -r() * per;
      s += api.at(d.f1(x), o.y0, api.g(id, '<circle cx="0" cy="0" r="' + d.f1(rr) + '" fill="#F7FBFC" opacity="0.9"/>'));
      api.origin(sel, "0 0");
      api.key(sel, "y", 0, -tc * v, "none");
      for (var c = tc + per; c < DUR + per; c += per) { api.key(sel, "y", c, H, "none"); api.key(sel, "y", c, 0, "step"); }
    }
    return s;
  }
  return { defs: defs, nhaHe: nhaHe, thongHe: thongHe, dongCo: dongCo, mac: mac, moHoi: moHoi, duoiCa: duoiCa, ngua: ngua, gam: gam, phayDuoi: phayDuoi, tuyetRoi: tuyetRoi };
})();
