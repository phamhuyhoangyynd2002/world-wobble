/* Đoạn d15 · cắt giấy · hồi ức · con đường băng giữa hai làng (thẻ lia-nhoe, leo-thang-ba-lan lần 1–2). Vào "cat", ra "cat".
   Lời: "Some sources argue that Tomtor, not Oymyakon, is the real Pole of Cold. Oymyakon, meanwhile, has the official monument.
   So a village got famous partly because someone finally put a thermometer nearby. Thermometers are very good at making
   places famous. I went to the station. Then back to the monument."
   Chữ: "OYMYAKON", "TOMTOR" (hai tấm biển làng). Gag: nhiệt kế giấy là ngôi sao, được rọi đèn sân khấu, cúi chào.
   Trang phục: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng. Lần đi lại thứ ba lệch kiểu là đoạn chèn ve-tay d16. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var CH = data.chu_tren_do_vat;   // OYMYAKON, TOMTOR
  var T = function (w, du, k) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };

  var tTom = T("Tomtor,", 1.32), tReal = T("real", 4.24), tPole = T("Pole", 4.57), tOym = T("Oymyakon,", 5.87, 1), tOff = T("official", 8.19),
    tSo = T("So", 9.55), tTher = T("thermometer", 12.47), tTher2 = T("Thermometers", 13.95), tPlaces = T("places", 15.71),
    tWent = T("went", 17.12), tStation = T("station.", 17.45), tThen = T("Then", 18.34), tBack = T("back", 18.49);

  var MAT = 872, XO = 780, XT = 2020, XN = 1300, XW = 1540;   // hai biển dời vào trong (duyệt hình v1)
  var nen = CN.langTuyet(api, {
    ten: "duongbang", seed: 1500, tu: -1200, den: 4200, mat: MAT, matTroi: [1100, 330],
    nhaXa: [[150, 772], [330, 760], [1250, 768], [1420, 776]], thong: [[-200, 806, 300], [180, 812, 260], [2650, 800, 320], [2950, 810, 280]],
    suong: 4
  });
  var mid = nen.giua;
  // mặt đường băng bóng loáng
  mid += '<path d="M -1200 ' + (MAT + 34) + ' L 4200 ' + (MAT + 30) + ' L 4200 ' + (MAT + 126) + ' L -1200 ' + (MAT + 130) + ' Z" fill="#CFE6F0"/>';
  for (var i = 0, x = -1100; x < 4100; i++, x += 170 + (i % 3) * 60) mid += D.line("M " + x + " " + (MAT + 112) + " L " + (x + 70) + " " + (MAT + 48), 5, "#ffffff", ' opacity="0.8"');
  // hai tấm biển làng
  var iconMon = '<g transform="translate(0,52) scale(0.17)">' + D.monumentCold("icM") + "</g>";
  var iconNk = '<g transform="translate(-24,-52) scale(0.28)">' + D.thermometer("icN") + "</g>";
  mid += at(XO, MAT + 24, '<g id="glowO"><ellipse cx="0" cy="-290" rx="320" ry="170" fill="url(#lampG)"/></g>' +
    D.signBoard("sO", { w: 480, h: 132, cao: 220, chu: CH[0], co: 58, hinh: iconMon }));
  mid += at(XT, MAT + 24, D.signBoard("sT", { w: 430, h: 132, cao: 220, chu: CH[1], co: 58, hinh: iconNk }));
  // sân khấu tối dần quanh nhiệt kế (chỉ phủ phông + biển, không phủ nhiệt kế và Wob)
  mid += '<rect id="toi" x="-1200" y="-400" width="5400" height="2000" fill="#14202E"/>';
  mid += '<g id="den"><path d="M ' + (XN - 70) + ' -200 L ' + (XN + 70) + ' -200 L ' + (XN + 190) + ' ' + (MAT + 70) + ' L ' + (XN - 190) + ' ' + (MAT + 70) + ' Z" fill="#FFF3C4" opacity="0.38"/>' +
    '<ellipse cx="' + XN + '" cy="' + (MAT + 64) + '" rx="210" ry="34" fill="#FFF3C4" opacity="0.55"/></g>';
  // nhiệt kế giấy nhỏ trên cọc
  mid += at(XN, MAT + 60, D.paper(D.rRect(-8, -150, 16, 150, 1, 1501), C.woodDark, { stroke: true, sw: 4 }) +
    '<g id="nkC"><g transform="translate(-38,-310) scale(0.45)">' + D.thermometer("nkS") + "</g></g>");
  var W = api.wob("W", { scarf: true, khan: "#D9543C", mu: "#C9463A" });
  mid += W.svg;
  mid += '<g id="lapNk">' + api.lapLanh("ln", 7, 1511, [XN - 150, MAT - 330, 300, 260], tTher - 0.1, DUR - 3) + "</g>";

  var nhoe = api.locNhoe("nhoe", "canhNhoe", [[tOym - 0.08, tOym + 0.24, 26]]);
  api.dat("<defs>" + nhoe + '</defs><g id="canhNhoe">' + nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }) + "</g>");
  api.noi({});

  // ---- camera ----
  api.camera([
    [0, 1400, 620, 1.0], [tTom - 0.4, 1460, 620, 1.04, "sine.inOut"],
    [tTom + 0.9, XT - 280, 600, 1.22, "power2.inOut"],                 // lia sang biển TOMTOR
    [tOym - 0.08, XT - 250, 596, 1.3, "sine.inOut"],
    [tOym + 0.24, XO + 300, 600, 1.22, "power3.inOut"],                 // lia nhoè sang biển OYMYAKON
    [tSo - 0.1, XO + 290, 596, 1.32, "sine.inOut"],
    [tSo + 1.3, XN + 60, 640, 1.34, "power2.inOut"],                    // về nhiệt kế giữa đường
    [tTher - 0.1, XN + 70, 630, 1.4, "sine.inOut"],
    [tTher + 0.4, XN + 80, 620, 1.58, "power2.out"],
    [tWent - 0.1, XN + 100, 630, 1.5, "sine.inOut"],
    [tStation + 0.6, XN + 520, 640, 1.18, "power2.inOut"],
    [tBack + 0.2, XN + 560, 640, 1.16, "sine.inOut"],
    [DUR - 0.9, 1400, 630, 1.0, "power2.inOut"], [DUR, 1400, 628, 1.01, "sine.inOut"]
  ]);

  // ---- biển TOMTOR ưỡn ngực, biển OYMYAKON sáng lên ----
  api.origin("#sT-bang", "0 -220");
  api.key("#sT-bang", "scaleY", 0, 1); api.key("#sT-bang", "scaleY", tPole - 0.3, 1, "none"); api.key("#sT-bang", "scaleY", tPole + 0.05, 1.3, "back.out(2.4)");
  api.key("#sT-bang", "scaleY", tOym - 0.3, 1.3, "none"); api.key("#sT-bang", "scaleY", tOym, 1.08, "power2.inOut");
  api.key("#sT-bang", "scaleX", 0, 1); api.key("#sT-bang", "scaleX", tPole - 0.3, 1, "none"); api.key("#sT-bang", "scaleX", tPole + 0.05, 1.1, "back.out(2.4)"); api.key("#sT-bang", "scaleX", tOym - 0.3, 1.1, "none"); api.key("#sT-bang", "scaleX", tOym, 1.0, "power2.inOut");
  api.sfx("boing", tPole - 0.2, 0.3);
  // cả biển nhón lên như ưỡn ngực (rõ hơn)
  api.key("#sT", "y", 0, 0); api.key("#sT", "y", tReal - 0.15, 0, "none"); api.key("#sT", "y", tReal, 12, "power2.in");
  api.key("#sT", "y", tPole + 0.1, -60, "back.out(2)"); api.key("#sT", "y", tOym - 0.3, -60, "none"); api.key("#sT", "y", tOym, 0, "power2.inOut");
  api.sfx("whoosh", tOym - 0.08, 0.5);
  api.origin("#glowO", "0 -290");
  api.key("#glowO", "opacity", 0, 0); api.key("#glowO", "opacity", tOff - 0.2, 0, "none"); api.key("#glowO", "opacity", tOff + 0.2, 1, "power2.out");
  api.origin("#sO-bang", "0 -286");
  api.key("#sO-bang", "scale", 0, 1); api.key("#sO-bang", "scale", tOff - 0.15, 1, "none"); api.key("#sO-bang", "scale", tOff + 0.05, 1.08, "back.out(2)"); api.key("#sO-bang", "scale", tOff + 0.5, 1.02, "sine.inOut");
  api.sfx("ting", tOff - 0.1, 0.35);

  // ---- nhiệt kế là ngôi sao: tối sân khấu, đèn rọi, cúi chào ----
  api.key("#toi", "opacity", 0, 0); api.key("#toi", "opacity", tTher - 0.25, 0, "none"); api.key("#toi", "opacity", tTher + 0.05, 0.42, "power2.out");
  api.key("#toi", "opacity", tWent - 0.4, 0.42, "none"); api.key("#toi", "opacity", tWent + 0.2, 0, "power1.inOut");
  api.key("#den", "opacity", 0, 0); api.key("#den", "opacity", tTher - 0.2, 0, "none"); api.key("#den", "opacity", tTher, 1, "power2.out");
  api.key("#den", "opacity", tWent - 0.4, 1, "none"); api.key("#den", "opacity", tWent + 0.2, 0, "power1.inOut");
  api.sfx("ting", tTher - 0.05, 0.5);
  api.origin("#nkC", "0 0");
  api.key("#nkC", "rotation", 0, 0);
  for (var b = 0, tb = tTher + 0.35; tb < tWent - 0.3; b++, tb += 1.05) {
    api.key("#nkC", "rotation", tb, 0, "none"); api.key("#nkC", "rotation", tb + 0.3, -24, "power2.out"); api.key("#nkC", "rotation", tb + 0.65, -24, "none"); api.key("#nkC", "rotation", tb + 0.95, 0, "back.out(2)");
  }

  // ---- Wob ----
  W.set(0, { x: XW, y: MAT + 44, size: 0.7, lashes: 1, ice: 1, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 4 });
  W.mouth(0, "X");
  W.pose(tTom - 0.2, 0.25, { pupX: 13, pupY: -6, upRot: 3 }, "power2.out");
  W.idle(tTom, tPole - 0.3, { seed: 151, bien: 1.8 });
  W.soc(tPole + 0.02, { giuMat: true });
  W.pose(tPole + 0.4, 0.3, { lean: -5 }, "power2.out"); W.pose(tOym - 0.3, 0.2, { lean: 0 }, "power2.inOut");
  W.pose(tOym - 0.06, 0.12, { pupX: -14, pupY: -6, upRot: -4, eye: 1 }, "power3.out");   // quay phắt sang biển kia
  W.mouth(tOym, "X");
  W.idle(tOym + 0.3, tOff - 0.2, { seed: 152, bien: 1.6 });
  W.mouth(tOff + 0.05, "o"); W.mouth(tOff + 0.8, "smirk");
  W.pose(tSo + 0.3, 0.3, { pupX: -8, pupY: 4, upRot: 0 }, "power2.inOut");
  W.idle(tSo + 0.6, tTher - 0.3, { seed: 153, bien: 1.6, liec: true });
  W.pose(tTher - 0.1, 0.2, { pupX: -10, pupY: 0, eye: 1.12 }, "back.out(2)");
  W.mouth(tTher, "o");
  // vỗ tay lịch sự
  var c0 = tTher2 - 0.1, c1 = tWent - 0.35;
  W.pose(c0, 0.25, { aLu: -48, aLf: -60, aRu: 48, aRf: 60, eye: 1, lid: 16 }, "power2.out");
  for (var c = c0 + 0.3, s = 0; c < c1; c += 0.2, s++) W.pose(c, 0.1, s % 2 ? { aLu: -48, aRu: 48 } : { aLu: -30, aRu: 30 }, "sine.inOut");
  W.mouth(c0 + 0.1, "smirk");
  W.pose(c1, 0.25, { aLu: 18, aLf: -10, aRu: -18, aRf: 10, lid: 0 }, "power2.inOut");
  // lạch bạch sang trạm (TOMTOR), rồi quay về đài (OYMYAKON)
  W.walk(tWent - 0.05, tThen - 0.15, XW, XT - 330, { step: 0.26, tieng: true });
  W.pose(tThen - 0.12, 0.12, { pupX: -12 }, "power2.out");
  W.walk(tThen + 0.0, DUR - 0.75, XT - 330, XN + 40, { step: 0.26, tieng: true });
  W.mouth(tWent, "flat");
  W.breathe(0, DUR, 2.4);
  W.autoBlink(0.3, tWent - 0.4, 154);
};
