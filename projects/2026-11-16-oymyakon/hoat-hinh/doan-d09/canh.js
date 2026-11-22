/* Đoạn d09 · cắt giấy · hồi ức · tên làng trên trang sổ, rồi thung lũng có suối ấm (thẻ luot-smootherstep, di-bo-parallax,
   leo-thang-ba-lan, giu-tinh-bo). Vào "cat", ra "cat".
   Lời: "Turns out the answer was hiding in the name. Oymyakon is usually explained as meaning water that does not freeze.
   Linguists argue about the roots. Some sources trace the word to the Even language, while others point to Sakha. But the
   story told about this valley is the same. Nearby there were warm springs, water that stayed open through the winter.
   So I went looking for one. I walked past it twice. It was steaming. I was reading my map. My map was upside down."
   Chữ: "OYMYAKON", "= water that does not freeze?", "Even?", "Sakha?" (dấu hỏi: khẳng định mức C).
   Trang phục: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng; cầm sổ, rồi bản đồ giấy cầm ngược.
   Thung lũng dùng CHUNG cấu hình với doan-d11 (THUNG, NHA_LANG, XSP). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var CH = data.chu_tren_do_vat;
  var T = function (w, du, k) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };

  // ---- mốc lời ----
  var tName = T("name", 1.74), tOym = T("Oymyakon", 2.49), tWater = T("water", 5.09, 0), tLing = T("Linguists", 7.04),
    tEven = T("Even", 10.92), tSakha = T("Sakha", 13.24), tBut = T("But", 14.4), tNear = T("Nearby", 17.27),
    tSpr = T("springs", 18.37), tWinter = T("winter", 20.74), tSo = T("So", 21.58), tPast = T("past", 23.3),
    tSteam = T("steaming", 24.79), tRead = T("reading", 25.83), tUp = T("upside", 27.43), tDown = T("down", 27.83);

  // ---- thung lũng (CHUNG với d11) ----
  var MAT = 872, XSP = 1300;
  var THUNG = {
    ten: "thung", seed: 900, tu: -900, den: 4200, mat: MAT, matTroi: [1320, 300],
    nhaXa: [[-200, 772], [2600, 768]], thong: [[-120, 800, 300], [240, 810, 260], [2350, 806, 300], [2700, 796, 340], [3000, 812, 280]],
    suong: 4
  };
  var NHA_LANG = [[XSP - 560, MAT - 74, 0.5, 0], [XSP - 300, MAT - 100, 0.4, 1], [XSP + 330, MAT - 92, 0.44, 2], [XSP + 600, MAT - 70, 0.52, 3]];
  var nen = CN.langTuyet(api, THUNG);
  var mid = nen.giua;
  NHA_LANG.forEach(function (h) {
    var spec = { w: 300, h: 180, seed: 910 + h[3] };
    mid += at(h[0], h[1], '<g transform="scale(' + h[2] + ')">' + D.logHouse(spec) + "</g>");
    var c = D.chimneyOf(spec);
    mid += api.khoi("kl" + h[3], h[0] + c[0] * h[2], h[1] + c[1] * h[2] - 2, { cao: 260, rong: 9, uon: 8, toc: 0.25, mo: 0.85 });
  });
  mid += api.khoi("hs0", XSP - 90, MAT - 14, { cao: 330, rong: 26, uon: 22, toc: 0.36, lech: -30, seed: 931 });
  mid += api.khoi("hs1", XSP + 30, MAT - 18, { cao: 420, rong: 30, uon: 26, toc: 0.3, lech: 20, seed: 932 });
  mid += api.khoi("hs2", XSP + 120, MAT - 12, { cao: 300, rong: 22, uon: 18, toc: 0.4, lech: 40, seed: 933 });
  mid += at(XSP, MAT - 4, D.warmSpring("su", 300, 941));

  // ---- Wob ngồi trên đống tuyết cạnh biển nhỏ, sổ trên đùi ----
  var XW = 860, FY = MAT - 26;                     // chân Wob khi ngồi trên đống tuyết
  mid += at(XW - 250, MAT + 30, D.signBoard("sgB", { w: 92, h: 56, cao: 70 }));
  mid += at(XW, MAT + 40, D.snowPile(300, 90, 951));
  var mapSvg = '<g transform="translate(200,262) scale(1.05)">' + D.paperMap(270, 180, { nguoc: true }) + "</g>";
  var M = api.wob("M", { scarf: true, khan: "#D9543C", mu: "#C9463A", phuKien: mapSvg });
  mid += M.svg;
  // sổ phác thảo + chữ viết tay
  // sổ rộng hơn: mọi chữ nằm trọn trang phải, cách gáy ≥ 60 px (phản biện vòng 1)
  var NBW = 660, NBH = 250, nbX = XW, nbY = FY + 172, PC = 190;   // PC: tâm vùng chữ trang phải
  var nb = D.notebookOpen(NBW, NBH, 961);
  nb += D.line("M -250 -60 C -200 -96 -150 -70 -110 -90 M -260 -40 L -90 -40", 4, "#6FA8C0", ' opacity="0.7"') +
    D.line("M -200 -112 C -205 -140 -190 -160 -200 -186 M -165 -108 C -170 -136 -156 -156 -166 -180", 3, "#9DB7C2", ' opacity="0.8"');   // phác suối bốc hơi (không chữ)
  nb += '<clipPath id="vietCl"><rect id="vietR" x="64" y="-236" width="262" height="58"/></clipPath>';
  nb += '<g clip-path="url(#vietCl)">' + D.txt(PC, -192, CH[0], 40, { w: 900, fill: "#26323A" }) + "</g>";
  nb += '<g id="dong2">' + D.txt(PC, -160, "= water that", 30, { w: 800, fill: "#26323A" }) + D.txt(PC, -124, "does not freeze?", 30, { w: 800, fill: "#26323A" }) + "</g>";
  nb += '<g id="mtT">' + D.line("M 160 -104 C 145 -92 130 -82 118 -70", 5, "#26323A") + D.line("M 120 -90 L 118 -70 L 136 -78", 5, "#26323A") + "</g>";
  nb += '<g id="mtP">' + D.line("M 220 -104 C 235 -92 250 -82 262 -70", 5, "#26323A") + D.line("M 244 -78 L 262 -70 L 260 -90", 5, "#26323A") + "</g>";
  nb += '<g id="tEven">' + D.txt(122, -30, CH[2], 30, { w: 800, fill: C.accent2 }) + "</g>";
  nb += '<g id="tSakha">' + D.txt(262, -30, CH[3], 30, { w: 800, fill: C.accent2 }) + "</g>";
  mid += at(nbX, nbY, '<g id="so">' + nb + "</g>");
  // tay mực cầm bút chì (tay phải của Wob đang viết)
  mid += '<g id="butTay"><path id="butCanh" d="M 0 0" fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"/>' +
    '<g id="butNam"><g transform="scale(0.3)">' + D.pencil(300, { goc: -55 }) + "</g>" + '<circle cx="16" cy="-22" r="10" fill="' + INK + '"/></g></g>';
  // hơi nước trùm mặt (lần đi thứ ba)
  var FYW = MAT + 40;
  mid += api.phut("hm", XSP + 6, FYW - 170, { n: 6, song: 1.3, cao: 60, troi: 20, r: 46, tu: tSteam - 0.2, den: tRead - 0.15, seed: 971 });

  api.dat(nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }));
  api.noi({});
  // lớp gần (ụ tuyết) ẩn khi cận trang sổ, hiện dần khi camera nâng lên thung lũng
  api.key("#L-gan-in", "opacity", 0, 0); api.key("#L-gan-in", "opacity", tBut + 0.6, 0, "none"); api.key("#L-gan-in", "opacity", tBut + 1.8, 1, "power1.inOut");

  // ---- suối chảy ----
  for (var k = 0; k < 3; k++) { api.key("#su-song" + k, "x", 0, 0); api.key("#su-song" + k, "x", DUR, -(150 + k * 40) * DUR / 6, "none"); }

  // ---- camera ----
  var cyNb = FY - 50;
  api.camera([
    [0, nbX + 70, cyNb, 1.98], [tOym - 0.1, nbX + 80, cyNb + 2, 2.02, "sine.inOut"],
    [tEven - 0.3, nbX + 80, cyNb + 4, 2.06, "sine.inOut"], [tBut - 0.05, nbX + 86, cyNb + 4, 2.09, "sine.inOut"],
    [tBut + 2.0, XW + 560, 600, 0.98, "power2.inOut"],                       // nâng khỏi trang sổ lên thung lũng
    [tSo - 0.1, XW + 600, 610, 1.03, "sine.inOut"],
    [tSo + 0.8, 1220, 660, 1.1, "power2.inOut"],
    [tSteam + 0.4, 1260, 660, 1.14, "sine.inOut"],
    [tRead + 0.25, XSP + 4, FYW - 125, 2.5, "power2.inOut"],                 // cận tấm bản đồ ngược
    [tUp, XSP + 4, FYW - 125, 2.62, "sine.inOut"],
    [DUR, XSP + 4, FYW - 128, 2.8, "sine.inOut"]
  ]);

  // ---- Wob ngồi đọc sổ ----
  M.set(0, { x: XW, y: FY, size: 0.7, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 1, ice: 1, legLs: 0.55, legRs: 0.55, legL: 24, legR: -24, pupY: 12, pupX: 0 });
  api.set("#M-pk", 0, { opacity: 0 });
  M.mouth(0, "X");
  // gõ bút suy nghĩ, rồi viết (tay mực vẽ mỗi khung: bàn tay + cánh tay vắt qua mép sổ)
  var w0 = tOym - 0.15, w1 = tOym + 1.6;
  var pen0 = [nbX + 250, nbY - 214], vai = [XW + 60, nbY - NBH - 4];
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function penAt(t) {
    if (t < tName) return [pen0[0], pen0[1] - 12 * Math.abs(Math.sin(t * Math.PI / 0.36))];
    if (t < w0) { var u = sm((t - tName) / (w0 - tName)); return [pen0[0] + (nbX + 85 - pen0[0]) * u, pen0[1] + (nbY - 200 - pen0[1]) * u]; }
    if (t < w1) { var v = (t - w0) / (w1 - w0); return [nbX + 85 + 215 * v, nbY - 200 - 14 * Math.abs(Math.sin(v * Math.PI * 8))]; }
    var z = sm((t - w1) / 0.5); return [nbX + 300 - 170 * z, nbY - 200 - 80 * z];   // viết xong: tay rút về trên mép sổ, không che chữ
  }
  var pn = null;
  api.moiKhung(function (t) {
    if (!pn) pn = [document.getElementById("butNam"), document.getElementById("butCanh")];
    var p = penAt(t);
    if (pn[0]) pn[0].setAttribute("transform", "translate(" + p[0].toFixed(1) + "," + p[1].toFixed(1) + ")");
    if (pn[1]) pn[1].setAttribute("d", "M " + vai[0] + " " + vai[1] + " Q " + ((vai[0] + p[0]) / 2 + 30).toFixed(1) + " " + (Math.min(vai[1], p[1]) - 10).toFixed(1) + " " + (p[0] + 16).toFixed(1) + " " + (p[1] - 22).toFixed(1));
  }, { twos: true });
  M.pose(0.2, 0.3, { pupY: -10, pupX: 8, upRot: 3 }, "power2.out");
  M.mouth(0.4, "smirk");
  M.pose(tName, 0.25, { pupY: 12, pupX: 0, upRot: 0 }, "power2.out");
  M.mouth(tName + 0.1, "X");
  api.origin("#vietR", "64 -200");
  api.key("#vietR", "scaleX", 0, 0.001); api.key("#vietR", "scaleX", w0, 0.001, "none"); api.key("#vietR", "scaleX", w1, 1, "none");
  M.pose(w0, 0.2, { pupX: -8, pupY: 12 }, "power2.out"); M.pose(w1 - 0.2, 0.3, { pupX: 8 }, "none");
  // dòng 2 hiện, dấu hỏi to
  api.origin("#dong2", PC + " -145"); api.pop("#dong2", tWater - 0.12, 0.25);
  api.sfx("ting", tWater - 0.1, 0.5);
  M.pose(tWater - 0.1, 0.2, { eye: 1.12, pupY: 14, pupX: 0 }, "back.out(2)");
  M.pose(tWater + 0.9, 0.3, { eye: 1 }, "power2.out");
  M.mouth(tWater, "o"); M.mouth(tWater + 0.8, "X");
  // hai mũi tên mọc ra hai phía
  api.origin("#mtT", "160 -104"); api.origin("#mtP", "220 -104");
  api.pop("#mtT", tLing - 0.05, 0.4); api.pop("#mtP", tLing + 0.3, 0.4);
  M.nhinQuanh(tLing + 0.1, { nhip: 0.45 });
  api.origin("#tEven", "122 -40"); api.origin("#tSakha", "262 -40");
  api.pop("#tEven", tEven - 0.1, 0.25); api.pop("#tSakha", tSakha - 0.1, 0.25);
  api.sfx("pop", tEven - 0.1, 0.35); api.sfx("pop", tSakha - 0.1, 0.35);
  M.pose(tEven - 0.05, 0.3, { upRot: -11, pupX: -12, pupY: 12 }, "power2.out");
  M.pose(tSakha - 0.05, 0.35, { upRot: 11, pupX: 12, pupY: 12 }, "power2.inOut");
  M.pose(tSakha + 0.9, 0.3, { upRot: 0, pupX: 0, lid: 18 }, "power2.inOut");
  M.mouth(tSakha + 0.9, "flat");
  // ngẩng lên nhìn thung lũng, chỉ suối, gập sổ
  M.pose(tBut + 0.5, 0.35, { pupX: 12, pupY: -6, lid: 0, upRot: 2 }, "power2.out");
  M.idle(tBut + 0.8, tSpr - 0.2, { seed: 91, bien: 1.8 });
  M.pose(tSpr - 0.2, 0.3, { aRu: -112, aRf: -18 }, "back.out(1.6)");
  M.mouth(tSpr - 0.1, "grin");
  M.pose(tWinter - 0.6, 0.3, { aRu: -18, aRf: 10 }, "power2.inOut");
  api.origin("#so", "0 -125");
  api.key("#so", "scaleX", 0, 1); api.key("#so", "scaleX", tWinter - 0.2, 1, "none"); api.key("#so", "scaleX", tWinter + 0.1, 0.5, "power2.in");
  api.key("#so", "scale", 0, 1); api.key("#so", "scale", tWinter + 0.1, 1, "none"); api.key("#so", "scale", tWinter + 0.35, 0, "power2.in");
  api.key("#butTay", "opacity", 0, 1); api.key("#butTay", "opacity", tWinter - 0.3, 1, "none"); api.key("#butTay", "opacity", tWinter, 0, "power1.in");
  api.sfx("bonk", tWinter + 0.1, 0.3);
  // đứng dậy, giơ bản đồ (ngược) lên trước mặt
  var tUpS = tSo - 0.15;
  M.pose(tUpS, 0.12, { sy: 0.86, sx: 1.08 }, "power2.in");
  api.key("#M", "y", tUpS + 0.12, FY, "none"); api.key("#M", "y", tUpS + 0.3, FY - 50, "power2.out"); api.key("#M", "y", tUpS + 0.5, FYW, "power2.in");
  api.key("#M", "x", tUpS + 0.12, XW, "none"); api.key("#M", "x", tUpS + 0.5, XW + 60, "power1.out");
  M.pose(tUpS + 0.12, 0.12, { sy: 1.1, sx: 0.95, legLs: 1, legRs: 1, legL: 0, legR: 0 }, "power2.out");
  M.pose(tUpS + 0.5, 0.08, { sy: 0.82, sx: 1.12 }, "power2.in"); M.pose(tUpS + 0.58, 0.25, { sy: 1, sx: 1 }, "back.out(3)");
  api.sfx("buoc-tuyet", tUpS + 0.5, 0.5);
  api.origin("#M-pk", "200 262");
  api.key("#M-pk", "opacity", tUpS + 0.6, 0, "none"); api.key("#M-pk", "opacity", tUpS + 0.65, 1, "none");
  api.key("#M-pk", "scale", 0, 1); api.key("#M-pk", "scale", tUpS + 0.6, 0.2, "none"); api.key("#M-pk", "scale", tUpS + 0.85, 1, "back.out(2)");
  M.pose(tUpS + 0.6, 0.25, { aLu: 35, aLf: -60, aRu: -35, aRf: 60, pupY: 10, pupX: 0 }, "power2.out");
  api.sfx("pop", tUpS + 0.62, 0.35);
  // lần 1: đi qua suối, không thấy
  var a0 = tUpS + 0.95, a1 = a0 + 1.17;
  M.walk(a0, a1, XW + 60, XSP + 260, { step: 0.24, arms: false, tieng: true });
  // lần 2: quay lại, vẫn không thấy
  var b0 = a1 + 0.15, b1 = tSteam - 0.2;
  M.pose(a1, 0.12, { pupX: -6 }, "power2.out");
  M.walk(b0, b1, XSP + 260, XSP - 220, { step: 0.24, arms: false, tieng: true });
  // lần 3: đi vào hơi nước, dừng, mới nhìn xuống
  var c0 = b1 + 0.08, c1 = tSteam + 0.55;
  M.walk(c0, c1, XSP - 220, XSP, { step: 0.24, arms: false, tieng: true });
  api.sfx("hoi-nuoc", tSteam - 0.05, 0.6);
  M.pose(c1 + 0.05, 0.2, { eye: 1.1 }, "power2.out");
  M.mouth(c1, "o");
  M.pose(c1 + 0.45, 0.35, { pupY: 14, pupX: -4 }, "power2.inOut");
  M.pose(tRead, 0.3, { pupY: 10, pupX: 0, eye: 1 }, "power2.out");
  M.mouth(tRead, "X");
  // cận bản đồ ngược, liếc người xem, tỉnh bơ
  M.pose(tUp - 0.05, 0.2, { pupX: 0, pupY: -2, lid: 26 }, "power2.out");
  M.mouth(tDown + 0.1, "flat");
  M.blinkAt(tDown + 0.75);
  api.key("#M-pk", "rotation", 0, 0); api.key("#M-pk", "rotation", tUp - 0.4, 0, "none"); api.key("#M-pk", "rotation", tUp - 0.1, -4, "power2.out");
  M.breathe(0, DUR, 2.4);
  M.autoBlink(0.4, tSo - 0.4, 92);
};
