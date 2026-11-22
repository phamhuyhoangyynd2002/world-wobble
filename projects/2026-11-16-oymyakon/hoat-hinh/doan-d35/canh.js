/* Đoạn d35 · cắt giấy · hồi ức: CÙNG đồng cỏ của d33 (cùng cấu hình DONG, cùng ngựa); rồi lia nhoè sang bảng tin gỗ ở rìa làng mùa hè:
   tờ rơi lễ hội vẽ tay ("POLE OF COLD", "every spring") và tờ lịch "JULY". Vào "cat", ra "cat".
   Trang phục: Wob không mũ, áo lông mở (khoác), ba lô phồng; cầm nắm cỏ; sau đó cầm sổ du lịch + bút chì.
   Chyskhaan chỉ trên tờ rơi: vẽ dạng chung, trang nghiêm (dáng cao, áo choàng trắng xanh đơn giản, mặt trơn không chi tiết),
   trước dinh thự băng nét mực; KHÔNG gag ở hình này. Gag ở phần ngựa: ngựa thờ ơ, quay đi gặm chỗ khác. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = api.INK, C = api.C, HE = window.HE_B;
  var TU = []; (data.loi || []).forEach(function (l) { (l.tu || []).forEach(function (w) { if (w.start > -0.3) TU.push(w); }); });
  var T = function (w, k, du) { var h = TU.filter(function (x) { return x.text.toLowerCase().indexOf(w.toLowerCase()) >= 0; })[k || 0]; return h ? h.start : du; };
  var MAT = 872, CH = data.chu_tren_do_vat;   // [POLE OF COLD, every spring, JULY]

  // ---- phông đồng cỏ (CHUNG với d33) ----
  var DONG = { seed: 3300, tu: -1400, den: 5200, mat: MAT, matTroi: [1400, 160], tuyet: true,
    nhaXa: [[300, 744], [1150, 738], [1700, 748]], cay: [[-260, MAT + 4, 440], [2650, MAT + 4, 400], [3150, MAT + 4, 460]],
    nha: [[3900, 320, 200], [4500, 360, 220, "#7A4A3A"]] };
  var NGUA = [
    ["n1", 1520, MAT + 26, 1.0, 1, "#D9D2C2", "#7E766A", "#B9B09E", 3401],
    ["n2", 2180, MAT + 8, 0.86, -1, "#8A5A3A", "#3B2A1F", "#6E4630", 3402],
    ["n3", 760, MAT - 6, 0.7, -1, "#B99568", "#5A4632", "#9A7A52", 3403]
  ];
  var nen = HE.dongCo(api, DONG);

  // ---- đạo cụ ----
  /* Chyskhaan dạng chung, trang nghiêm. Gốc: giữa chân. Cao ~330. */
  function chyskhaan() {
    var s = "";
    s += D.paper("M -40 -250 C -60 -180 -76 -80 -84 0 L 84 0 C 76 -80 60 -180 40 -250 Z", "#F2F6F8", { stroke: true, sw: 4, sx: 3, sy: 4 });
    s += '<path d="M -12 -246 L -20 0 L 20 0 L 12 -246 Z" fill="#8FB8D0" opacity="0.8"/>';
    s += D.line("M -82 -14 L 82 -14", 8, "#8FB8D0") + D.line("M -84 0 L 84 0", 4);
    s += D.paper("M -40 -246 C -70 -230 -82 -170 -78 -120 L -58 -116 C -58 -170 -50 -214 -34 -232 Z", "#E3ECF1", { stroke: true, sw: 3.5, shadow: false });
    s += D.paper("M 40 -246 C 70 -230 82 -170 78 -120 L 58 -116 C 58 -170 50 -214 34 -232 Z", "#E3ECF1", { stroke: true, sw: 3.5, shadow: false });
    s += D.line("M 70 -124 L 70 40", 5) + '<path d="M 70 -150 L 80 -128 L 70 -112 L 60 -128 Z" fill="#CFE8F4" stroke="' + INK + '" stroke-width="3"/>';
    s += '<ellipse cx="0" cy="-272" rx="24" ry="28" fill="#E6EEF2" stroke="' + INK + '" stroke-width="4"/>';
    s += D.paper("M -30 -292 L -22 -350 L 0 -372 L 22 -350 L 30 -292 C 10 -300 -10 -300 -30 -292 Z", "#DDEFF7", { stroke: true, sw: 4, shadow: false });
    s += D.line("M -24 -330 C -44 -342 -50 -362 -42 -380 M 24 -330 C 44 -342 50 -362 42 -380", 5);
    return s;
  }
  /* dinh thự băng nét mực. Gốc: giữa chân. */
  function dinhBang() {
    var s = "";
    [[-90, 150], [-40, 210], [20, 250], [80, 180], [128, 120]].forEach(function (c, i) {
      var w = 26 + (i % 2) * 10;
      s += '<path d="M ' + (c[0] - w) + " 0 L " + (c[0] - w) + " " + (-c[1]) + " L " + c[0] + " " + (-c[1] - 40) + " L " + (c[0] + w) + " " + (-c[1]) + " L " + (c[0] + w) + ' 0 Z" fill="#DDEFF7" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      s += D.line("M " + (c[0] - 8) + " " + (-c[1] + 30) + " L " + (c[0] - 8) + " " + (-c[1] + 60), 3, "#8FB8D0");
    });
    return s;
  }
  /* tờ rơi lễ hội 460×560. Gốc: góc trên trái. */
  function toRoi() {
    var s = D.paper(D.rRect(0, 0, 460, 560, 2, 3501), "#FFF8EC", { stroke: true, sw: 5, sx: 6, sy: 8 });
    s += '<rect x="12" y="12" width="436" height="92" fill="#2E5E7A"/>';
    s += D.txt(230, 78, CH[0], 52, { w: 900, fill: "#FFF8EC" });
    // làng nhỏ + cờ không chữ
    s += D.line("M 24 330 L 230 330", 3);
    [[60, 330, 60], [130, 330, 72], [196, 330, 54]].forEach(function (h) {
      s += '<path d="M ' + (h[0] - h[2] / 2) + " " + h[1] + " L " + (h[0] - h[2] / 2) + " " + (h[1] - h[2] * 0.6) + " L " + h[0] + " " + (h[1] - h[2]) + " L " + (h[0] + h[2] / 2) + " " + (h[1] - h[2] * 0.6) + " L " + (h[0] + h[2] / 2) + " " + h[1] + ' Z" fill="#E9D7A6" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
    });
    s += '<g id="co">' + D.line("M 20 190 Q 125 236 230 190", 2.5);
    ["#C9463A", "#2E5E7A", "#E0B23A", "#5E8C46", "#C9463A", "#2E5E7A"].forEach(function (c, i) {
      var x = 34 + i * 34, y = 190 + 46 * (1 - Math.pow((x - 125) / 105, 2)) * 0.5;
      s += '<path d="M ' + D.f1(x - 11) + " " + D.f1(y) + " L " + D.f1(x + 11) + " " + D.f1(y + 2) + " L " + D.f1(x) + " " + D.f1(y + 30) + ' Z" fill="' + c + '" stroke="' + INK + '" stroke-width="2"/>';
    });
    s += "</g>";
    // Chyskhaan + dinh thự băng
    s += at(352, 470, '<g transform="scale(0.78)">' + dinhBang() + "</g>");
    s += at(340, 476, '<g transform="scale(0.86)">' + chyskhaan() + "</g>");
    s += D.line("M 24 486 L 436 486", 2, INK, ' opacity="0.4"');
    s += D.txt(230, 536, CH[1], 44, { w: 700, fill: INK, extra: ' font-style="italic"' });
    return s;
  }
  /* tờ lịch tháng. Gốc: góc trên trái 320×330. */
  function lich() {
    var s = D.paper(D.rRect(0, 0, 320, 330, 2, 3502), "#FFFDF6", { stroke: true, sw: 5, sx: 5, sy: 7 });
    s += '<rect x="10" y="10" width="300" height="84" fill="#C9463A"/>';
    s += D.txt(160, 74, CH[2], 60, { w: 900, fill: "#FFF8EC" });
    for (var r = 0; r < 5; r++) for (var c = 0; c < 7; c++) s += '<rect x="' + (22 + c * 40) + '" y="' + (112 + r * 40) + '" width="32" height="32" fill="none" stroke="' + INK + '" stroke-width="2" opacity="0.45"/>';
    s += '<circle cx="160" cy="18" r="8" fill="#555" stroke="' + INK + '" stroke-width="3"/>';
    return s;
  }
  function bangTin(x0) {   // bảng tin gỗ có mái nhỏ. x0: mép trái. Mặt bảng y 300–860.
    var s = D.line("M " + (x0 + 60) + " " + (MAT + 8) + " L " + (x0 + 60) + " 860 M " + (x0 + 1040) + " " + (MAT + 8) + " L " + (x0 + 1040) + " 860", 18, INK) +
      D.line("M " + (x0 + 60) + " " + (MAT + 8) + " L " + (x0 + 60) + " 860 M " + (x0 + 1040) + " " + (MAT + 8) + " L " + (x0 + 1040) + " 860", 11, C.woodDark);
    s += D.paper(D.rRect(x0, 290, 1100, 580, 2, 3503), "#B98A5C", { stroke: true, sw: 6, half: 0.18 });
    s += '<rect x="' + (x0 + 20) + '" y="310" width="1060" height="540" fill="#C9A06E"/>';
    s += D.paper(D.rough([[x0 - 40, 296], [x0 + 550, 220], [x0 + 1140, 296], [x0 + 1140, 312], [x0 - 40, 312]], 2, 3504, 20), "#5A3B26", { stroke: true, sw: 5 });
    return s;
  }
  function soTay() {   // sổ du lịch mở, cầm tay trái. Gốc: bàn tay.
    return '<g transform="translate(-10,6) rotate(-8)">' + D.paper("M -70 0 L 0 8 L 0 96 L -70 88 Z", "#F4EBD6", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
      D.paper("M 0 8 L 70 0 L 70 88 L 0 96 Z", "#F4EBD6", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
      D.line("M -58 26 L -12 30 M -58 44 L -12 48 M -58 62 L -20 66", 2.5, "#9CC3CF") +
      '<g id="banSao"><rect x="12" y="16" width="46" height="58" fill="#FFF8EC" stroke="' + INK + '" stroke-width="3"/><rect x="16" y="20" width="38" height="10" fill="#2E5E7A"/>' + D.line("M 18 66 L 52 66", 3, "#C9463A") + "</g></g>";
  }
  function butChi() { return D.line("M 0 -40 L 0 50", 9, INK) + D.line("M 0 -40 L 0 50", 5, "#E0B23A") + '<path d="M -5 50 L 5 50 L 0 66 Z" fill="#E9D7A6" stroke="' + INK + '" stroke-width="2.5"/>'; }
  function nhumCo() {
    var s = "";
    for (var k = 0; k < 7; k++) s += D.line("M 0 0 C " + (-10 + k * 3) + " -20 " + (-16 + k * 5) + " -40 " + (-20 + k * 7) + " " + (-56 - (k % 3) * 8), 4, k % 2 ? "#5E8C46" : "#7FAE52");
    return '<g transform="translate(6,4)">' + s + '<circle cx="-2" cy="-58" r="5" fill="#F2C94C" stroke="' + INK + '" stroke-width="1.5"/></g>';
  }

  // ---- Wob ----
  var M = api.wob("M", { packExtra: HE.duoiCa(), holdR: g("co-tay", g("coR", nhumCo())) + g("soL", soTay()), holdL: g("butR", butChi()) });
  M.svg = HE.mac(M.svg, "M", "mo");

  var BX = 3420;   // mép trái bảng tin
  var mid = nen.giua;
  NGUA.slice().sort(function (a, b) { return a[2] - b[2]; }).forEach(function (n) {
    mid += at(n[1], n[2], '<g transform="scale(' + (n[3] * n[4]) + "," + n[3] + ')">' + g(n[0] + "-lat", HE.ngua(n[0], { long: n[5], bom: n[6], longToi: n[7], seed: n[8] })) + "</g>");
  });
  mid += bangTin(BX);
  mid += at(BX + 40, 300, g("toRoi", toRoi()));
  mid += at(BX + 760, 350, g("lich", lich()));
  mid += g("gach", D.line("M " + (BX + 40 + 266) + " " + (300 + 548) + " L " + (BX + 40 + 410) + " " + (300 + 546), 6, "#C9463A"));
  mid += M.svg;
  api.dat(HE.defs() + nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }));
  api.noi({});
  ["#dongXa", "#dongGiua", "#dongGan"].forEach(function (s) { api.set(s, 0, { opacity: 0 }); });

  // ---- mốc lời ----
  var tLarge = T("large", 0, 1.55), tBack = T("backpack", 0, 1.94), tTried = T("tried", 0, 3.05), tFr = T("friends", 0, 3.52);
  var tKept = T("kept", 0, 5.05), tEat = T("eating", 0, 5.34), tSeen = T("seen", 0, 6.55), tTour = T("tourists", 0, 6.83), tBef = T("before", 0, 7.22);
  var tHad = T("had", 0, 9.45), tParty = T("party", 0, 10.15), tEvery = T("Every", 0, 10.92), tSpring = T("spring", 0, 11.21), tFest = T("festival", 0, 12.8);
  var tPole = T("Pole", 0, 13.72), tWith = T("with", 1, 15.04), tVill = T("villages", 0, 15.66), tTom = T("Tomtor", 0, 18.12), tIts = T("Its", 0, 19.27), tChy = T("Chyskhaan", 0, 19.91);
  var tWhip = Math.min(tHad - 0.15, 9.2);

  // ---- camera ----
  api.camera([
    [0, 1290, 600, 1.22], [tBack + 0.3, 1300, 590, 1.18, "sine.inOut"],          // Wob cạnh ngựa: so ba lô với thân ngựa
    [tFr - 0.2, 1240, 640, 1.55, "power2.inOut"],                               // nắm cỏ
    [tEat + 0.4, 1340, 630, 1.4, "power2.inOut"],
    [tTour, 1300, 650, 1.62, "power2.inOut"],                                   // tỉnh bơ
    [tWhip, 1302, 652, 1.72, "sine.inOut"],
    [tWhip + 0.36, BX + 560, 600, 1.08, "power3.inOut"],                       // lia nhoè sang bảng tin
    [tEvery - 0.1, BX + 540, 610, 1.12, "sine.inOut"],
    [tSpring - 0.2, BX + 440, 720, 1.42, "power2.inOut"],                       // gạch chân "spring"
    [tFest - 0.5, BX + 700, 600, 1.16, "power2.inOut"],                         // liếc tờ lịch
    [tPole - 0.2, BX + 270, 520, 1.6, "power2.inOut"],                          // tiêu đề tờ rơi
    [tWith - 0.1, BX + 250, 524, 1.62, "sine.inOut"],
    [tVill - 0.1, BX + 160, 600, 1.95, "power2.inOut"],                         // hình làng nhỏ, cờ
    [tIts - 0.3, BX + 170, 604, 2.0, "sine.inOut"],
    [tChy, BX + 340, 660, 2.2, "power2.inOut"],                                // đẩy chậm vào Chyskhaan
    [DUR, BX + 350, 652, 2.48, "sine.inOut"]
  ]);
  api.sfx("whoosh", tWhip, 0.5);

  // ---- ngựa ----
  NGUA.forEach(function (n, i) {
    var id = n[0];
    api.origin("#" + id + "-dau", "-110 -215"); api.origin("#" + id + "-duoi", "0 0"); api.origin("#" + id + "-mat", "-217 -337");
    api.key("#" + id + "-dau", "rotation", 0, -80);
    HE.phayDuoi(api, id, 0, DUR, 3540 + i);
    api.set("#" + id + "-tuyet", 0, { opacity: 0 });
    if (i) HE.gam(api, id, 0, DUR, 3530 + i);
  });
  // n1: gặm; ngẩng nhìn ba lô; quay đi gặm chỗ khác; quay lại; liếc Wob; gặm tiếp
  HE.gam(api, "n1", 0, tLarge, 3551);
  api.key("#n1-dau", "rotation", tBack, -80, "none"); api.key("#n1-dau", "rotation", tBack + 0.35, -6, "power2.out");
  api.key("#n1-mat", "x", 0, 0); api.key("#n1-mat", "x", tBack + 0.3, 4, "power2.out");
  HE.gam(api, "n1", tTried, tFr + 0.3, 3552);
  api.origin("#n1-lat", "20 0");
  api.key("#n1-lat", "scaleX", 0, 1); api.key("#n1-lat", "scaleX", tKept - 0.15, 1, "none"); api.key("#n1-lat", "scaleX", tKept + 0.1, -1, "power2.inOut");
  HE.gam(api, "n1", tKept + 0.12, tEat + 0.55, 3553);
  api.key("#n1-lat", "scaleX", tEat + 0.5, -1, "none"); api.key("#n1-lat", "scaleX", tEat + 0.75, 1, "power2.inOut");
  HE.gam(api, "n1", tEat + 0.75, tSeen - 0.1, 3554);
  api.key("#n1-dau", "rotation", tSeen - 0.05, -80, "none"); api.key("#n1-dau", "rotation", tSeen + 0.25, -40, "power2.out");    // liếc Wob
  api.key("#n1-mat", "x", tSeen, 4, "none"); api.key("#n1-mat", "x", tSeen + 0.2, 3, "power2.out");
  api.key("#n1-dau", "rotation", tBef, -40, "none");
  HE.gam(api, "n1", tBef + 0.2, DUR, 3555);
  api.sfx("im-lang", tBef + 0.4, 0.4);

  // ---- Wob cạnh ngựa ----
  api.origin("#M-pack", "300 256");
  M.set(0, { x: 1060, y: 900, size: 0.7, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 10, pupY: -2 });
  api.set("#M-pack", 0, { scale: 1.15 });
  api.origin("#co-tay", "0 0"); api.origin("#coR", "0 0"); api.origin("#butR", "0 0"); api.origin("#soL", "0 0");
  api.set("#co-tay", 0, { opacity: 0 }); api.set("#butR", 0, { opacity: 0 }); api.set("#soL", 0, { opacity: 0 });
  M.mouth(0, "smirk");
  HE.moHoi(api, "M", 0.2, tWhip, 351);
  // ba lô phồng to ngang thân ngựa
  M.pose(tLarge - 0.2, 0.2, { upRot: 6, pupX: 11, pupY: 0 }, "power2.out");
  var tPh = tLarge - 0.25;   // phình 2,5× đứng cạnh thân ngựa, giữ ~1,5 s
  api.key("#M-pack", "scale", tPh, 1.15, "none"); api.key("#M-pack", "scale", tPh + 0.35, 2.5, "back.out(1.8)");
  api.key("#M-pack", "scale", tPh + 1.85, 2.5, "none"); api.key("#M-pack", "scale", tPh + 2.1, 1.15, "back.out(2)");
  api.sfx("boing", tPh + 0.05, 0.4);
  M.mouth(tBack, "grin");
  M.pose(tBack + 0.6, 0.25, { upRot: 0 }, "power2.out");
  // chìa nắm cỏ
  api.show("#co-tay", tTried + 0.1, 1);
  M.pose(tTried, 0.25, { aRu: -70, aRf: -20, pupX: 10, pupY: 4 }, "power2.out");
  api.set("#coR", 0, { rotation: 60 });
  M.mouth(tFr, "grin");
  M.nhonChan(tFr - 0.05, 0.6, { lean: 6, nhin: [11, 4] });
  // ngựa quay đi: Wob dịch theo
  M.walk(tKept + 0.15, tEat + 0.45, 1060, 1150, { step: 0.25, arms: false });
  M.pose(tEat + 0.6, 0.2, { pupX: -4 }, "power2.out");
  M.walk(tEat + 0.8, tSeen - 0.2, 1150, 1080, { step: 0.25, arms: false });
  // tỉnh bơ, nắm cỏ rủ xuống
  M.pose(tSeen + 0.1, 0.2, { pupX: 10, pupY: 2, eye: 1.1 }, "power2.out");
  M.mouth(tTour, "flat");
  M.pose(tBef, 0.5, { aRu: -30, aRf: 0, eye: 1, lid: 26 }, "power2.inOut");
  api.key("#coR", "rotation", tBef, 60, "none"); api.key("#coR", "rotation", tBef + 0.6, 150, "power2.in");
  M.pose(tBef + 0.8, 0.4, { pupX: 0, pupY: 3 }, "power2.out");
  M.idle(0, tWhip, { seed: 352, bien: 1.3, tho: false });

  // ---- sang bảng tin (lia nhoè): Wob đứng giữa tờ rơi và tờ lịch (không che chữ, không chồng hình Chyskhaan); sổ tay phải, bút chì tay trái ----
  var WX = BX + 620;
  M.set(tWhip + 0.18, { x: WX, y: 900, aRu: -40, aRf: -70, aLu: 18, aLf: -10, lid: 0, eye: 1, pupX: -8, pupY: -10 });
  api.show("#co-tay", tWhip + 0.18, 0); api.show("#soL", tWhip + 0.18, 1); api.show("#butR", tWhip + 0.18, 1);
  api.key("#soL", "rotation", 0, 0); api.key("#soL", "rotation", tWhip + 0.18, 110, "step");
  api.key("#butR", "rotation", 0, 0); api.key("#butR", "rotation", tWhip + 0.18, 170, "step");
  M.mouth(tWhip + 0.2, "flat");
  M.pose(tParty - 0.2, 0.3, { sy: 0.95, upY: 8, lid: 20 }, "power2.inOut");
  M.mouth(tParty, "wobbly");
  api.sfx("liu-lo-buon", tParty + 0.1, 0.5);
  // gạch chân "spring" bằng bút chì (tay trái với sang tờ rơi)
  M.walk(tEvery - 0.5, tEvery + 0.05, WX, WX - 50, { step: 0.25, arms: false });
  M.pose(tEvery + 0.05, 0.25, { sy: 1, upY: 0, lid: 0, aLu: 76, aLf: 10, lean: -6, pupX: -11, pupY: 4 }, "power2.out");
  api.key("#butR", "rotation", tEvery + 0.05, 170, "none"); api.key("#butR", "rotation", tEvery + 0.3, 110, "power2.out");
  M.pose(tSpring - 0.05, 0.4, { aLu: 70, aLf: -6 }, "power1.inOut");
  M.pose(tSpring + 0.45, 0.3, { aLu: 18, aLf: -10, lean: 0 }, "power2.inOut");
  api.key("#butR", "rotation", tSpring + 0.45, 110, "none"); api.key("#butR", "rotation", tSpring + 0.75, 170, "power2.inOut");
  api.origin("#gach", (BX + 40 + 410) + " " + (300 + 546));
  api.key("#gach", "scaleX", 0, 0); api.key("#gach", "scaleX", tSpring - 0.05, 0, "none"); api.key("#gach", "scaleX", tSpring + 0.4, 1, "power1.inOut");
  // liếc tờ lịch JULY
  M.pose(tSpring + 0.9, 0.2, { pupX: 11, pupY: -10, upRot: 4 }, "power2.out");
  M.mouth(tSpring + 1.0, "o");
  M.pose(tFest - 0.3, 0.3, { upRot: 0, pupX: -4, pupY: -12, sy: 0.96, upY: 6 }, "power2.inOut");
  M.mouth(tFest, "flat");
  // dán một bản sao tờ rơi vào sổ
  var tDan = tWith - 0.2;
  M.pose(tDan - 0.3, 0.25, { aRu: -60, aRf: -90, pupX: 6, pupY: 8, sy: 1, upY: 0 }, "power2.out");
  api.origin("#banSao", "35 45"); api.pop("#banSao", tDan, 0.25);
  api.sfx("pop", tDan, 0.35);
  M.go(tDan + 0.3, 2, "L", { goc: 40 }).forEach(function (h) { api.sfx("bonk", h, 0.2); });
  M.mouth(tDan + 0.4, "smirk");
  // nhìn lên tờ rơi, lặng (khi camera đẩy vào hình Chyskhaan: Wob ở tiền cảnh bên phải, không gag)
  M.pose(tIts - 0.9, 0.3, { pupX: 10, pupY: -6, aLu: 18, aLf: -10, aRu: -40, aRf: -70 }, "power2.inOut");
  M.mouth(tIts - 0.8, "X");
  M.idle(tWhip + 0.3, tIts - 0.7, { seed: 353, bien: 1.0, tho: false });
  // lặng lẽ bước sang phải ra khỏi khung, nhường hình Chyskhaan (trang nghiêm, không có Wob đè lên)
  M.walk(tIts - 0.6, tChy + 0.3, WX - 50, BX + 960, { step: 0.3, arms: false });
  M.breathe(0, DUR, 2.4);
  M.autoBlink(tWhip + 0.6, DUR, 3501);
  // cờ trên tờ rơi phấp phới nhẹ
  api.origin("#co", "125 200");
  api.key("#co", "rotation", 0, 0);
  for (var tc = 0.6, sc = 1; tc < DUR; tc += 0.9, sc = -sc) api.key("#co", "rotation", tc, sc * 1.6, "sine.inOut");
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
