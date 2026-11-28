/* Đoạn d13 · cắt giấy · trang lịch sử sepia: tàu buồm ba cột đi ngang xa xa, người giấy chung trên boong chỉ về hình núi; thẻ 1506.
   Wob đứng NGOÀI mép trang, trên bãi đá đen thật, nhón chân ngó vào. "Surely he moved in": Wob vẫy mời, chỉ bãi đất.
   "He sailed on": tàu kéo mỏ neo lên, vẫy lại Wob bằng cánh buồm mũi rồi lướt ra khỏi trang, tay Wob khựng giữa không, giữ.
   Thuyền con cập bãi cát đen trong trang, dấu chân đầu tiên; thẻ 1643; Wob bước tới mép trang ướm chân mình cạnh dấu chân.
   Vào "cat" (từ d12 vẽ tay), ra "cat" (sang d14 vẽ tay). Chữ: 1506, 1643. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M, S = M.S, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tFif = T("fifteen", 0, 2.24), tSure = T("surely", 0, 5.24), tSail = T("sailed", 0, 6.85), tFirst = T("first", 0, 8.04), tSix = T("sixteen", 0, 10.1), tDutch = T("dutch", 0, 11.85);
  var tHe = T("he", 1, 6.66);

  var PX = 60, PY = 70, PW = 1400, PH = 860;
  // ---------- trang sepia ----------
  var tr = '<clipPath id="pgClip"><rect x="' + (PX + 10) + '" y="' + (PY + 10) + '" width="' + (PW - 20) + '" height="' + (PH - 20) + '"/></clipPath>';
  tr += at(PX, PY, TD.trangCu(PW, PH, 1301));
  tr += '<g clip-path="url(#pgClip)">';
  tr += at(1060, 640, TD.nui({ w: 760, h: 400, seed: 1302, mau: S.co, mau2: "#978A5C", mauDinh: S.nau }).replace(/#1f2326/g, S.muc).replace(new RegExp(M.da, "g"), S.da));
  tr += at(1080, 250, TD.may(300, { seed: 1303, mau: S.giaySang }));
  tr += TD.bien(api, "bS", { x0: PX - 200, x1: PX + PW + 200, y: 640, n: 3, day: 46, cao: 400, bien: 10, mau: [S.bien, "#B79E70", S.bienToi], bot: false }).replace(/#1f2326/g, S.muc);
  // bãi cát đen trong trang (góc phải dưới)
  tr += D.paper("M 920 940 C 1000 850 1160 820 1300 810 C 1380 806 1440 812 1480 820 L 1480 940 Z", S.da, { stroke: true, sw: 4, shadow: false }).replace(/#1f2326/g, S.muc);
  tr += '<g id="tau"><g id="tauLac">' + TD.tauBuom("tb", { sep: true, dai: 380 }) + at(-40, -66, '<g transform="scale(0.26)">' + TD.nguoiCu("ng", {}) + "</g>") + "</g></g>";
  tr += '<g id="thc">' + TD.thuyenCon("tc", { sep: true, dai: 210 }) + at(-20, -40, '<g transform="scale(0.2)">' + TD.nguoiCu("ng2", { sau: false }) + "</g>") + "</g>";
  tr += '<g id="dauChan"><g transform="translate(1316,906) rotate(-12)">' + D.paper(D.rEll(0, 0, 22, 11, 1.2, 1304), S.muc, { shadow: false }) + D.paper(D.rEll(34, 2, 9, 7, 1, 1305), S.muc, { shadow: false }) + "</g></g>";
  tr += "</g>";
  tr += '<g id="t06">' + TD.the("t06i", CH[0], 64, { seed: 1306, nen: S.giaySang, mau: S.muc }) + "</g>";
  tr += '<g id="t43">' + TD.the("t43i", CH[1], 64, { seed: 1307, nen: S.giaySang, mau: S.muc }) + "</g>";

  // ---------- bờ đá thật bên phải ----------
  var bo = "";
  bo += at(1380, 930, TD.baiDa(1300, { seed: 1311, cao: 220 }));
  bo += at(-300, 1000, TD.baiDa(1800, { seed: 1312, cao: 160 }));
  var W = TD.wob(api, "W", { muTrum: 0 });
  bo += W.svg;

  api.dat(TD.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiXam)"/>' +
    TD.bien(api, "bT", { x0: -400, x1: 2400, y: 860, n: 3, day: 40, bien: 12 }) +
    api.lop("trang", tr, 1, { mat: 930 }) + api.lop("bo", bo, 1.08, { mat: 1000 }));
  api.noi({});

  api.camera([[0, 930, 560, 1.06], [tSure, 960, 560, 1.1, "sine.inOut"], [tFirst - 0.2, 1000, 600, 1.12, "sine.inOut"], [tSix - 0.4, 1240, 760, 1.42, "power2.inOut"], [DUR, 1262, 772, 1.46, "sine.inOut"]]);

  // ---------- tàu buồm ----------
  api.origin("#tau", "0 0"); api.origin("#tauLac", "0 0");
  api.key("#tau", "x", 0, 330, "step"); api.key("#tau", "y", 0, 676, "step");
  api.key("#tau", "x", tHe, 740, "power1.inOut");
  api.key("#tau", "x", tSail + 0.55, 760, "sine.out"); api.key("#tau", "x", tFirst + 0.5, 1700, "power2.in");
  api.key("#tauLac", "rotation", 0, 0);
  for (var t = 0.7, q = 0; t < DUR; t += 1.2, q++) api.key("#tauLac", "rotation", t, q % 2 ? 1.6 : -1.6, "sine.inOut");
  api.origin("#tb-neo", "0 0");
  api.origin("#tb-neo", "178 -53");
  api.key("#tb-neo", "scaleY", 0, 1); api.key("#tb-neo", "scaleY", tHe + 0.05, 1, "none"); api.key("#tb-neo", "scaleY", tHe + 0.55, 0.12, "power2.out");
  api.sfx("whoosh", tHe + 0.1, 0.25);
  var bv = "#tb-buomV";
  api.origin(bv, "113 -150");
  api.key(bv, "rotation", 0, 0); api.key(bv, "rotation", tSail + 0.2, 0, "none");
  [-16, 6, -14, 0].forEach(function (v, i) { api.key(bv, "rotation", tSail + 0.38 + i * 0.18, v, "sine.inOut"); });
  // người chỉ tay về núi
  api.origin("#ng-tayR", "0 0");
  api.key("#ng-tayR", "rotation", 0, 0); api.key("#ng-tayR", "rotation", 0.6, -105, "back.out(1.6)");
  api.key("#ng-tayR", "rotation", 3.4, -105, "none"); api.key("#ng-tayR", "rotation", 3.8, -10, "power2.inOut");
  [4.6, 5.2].forEach(function (t2, i) { api.key("#ng-tayR", "rotation", t2, i ? -10 : -30, "sine.inOut"); });
  // thẻ 1506
  api.origin("#t06", "0 0");
  api.key("#t06", "x", 0, 250, "step"); api.key("#t06", "y", 0, 170, "step"); api.key("#t06", "rotation", 0, -5, "step");
  api.pop("#t06", tFif - 0.1, 0.24); api.sfx("pop", tFif, 0.4);

  // ---------- thuyền con, dấu chân, 1643 ----------
  api.origin("#thc", "0 0");
  api.show("#thc", 0, 0); api.show("#thc", tFirst - 0.1, 1);
  api.key("#thc", "x", 0, 860, "step"); api.key("#thc", "y", 0, 700, "step"); api.key("#thc", "scale", 0, 0.7, "step");
  api.key("#thc", "x", tFirst - 0.1, 860, "none"); api.key("#thc", "x", tFirst + 0.9, 1150, "power2.out");
  api.key("#thc", "y", tFirst - 0.1, 700, "none"); api.key("#thc", "y", tFirst + 0.9, 836, "power2.out");
  api.key("#thc", "scale", tFirst - 0.1, 0.7, "none"); api.key("#thc", "scale", tFirst + 0.9, 1, "power2.out");
  api.key("#thc", "rotation", 0, 0); api.key("#thc", "rotation", tFirst + 0.9, 0, "none"); api.key("#thc", "rotation", tFirst + 1.0, -4, "power2.out"); api.key("#thc", "rotation", tFirst + 1.3, 0, "back.out(2)");
  api.sfx("bonk", tFirst + 0.9, 0.3);
  var tFp = tFirst + 1.45;
  api.show("#dauChan", 0, 0); api.show("#dauChan", tFp, 1);
  api.origin("#dauChan", "1316 906"); api.key("#dauChan", "scale", 0, 0.4, "step"); api.key("#dauChan", "scale", tFp, 0.4, "none"); api.key("#dauChan", "scale", tFp + 0.18, 1, "back.out(2)");
  api.sfx("pop", tFp, 0.25);
  api.origin("#t43", "0 0");
  api.key("#t43", "x", 0, 1090, "step"); api.key("#t43", "y", 0, 700, "step"); api.key("#t43", "rotation", 0, 4, "step");
  api.pop("#t43", tSix - 0.1, 0.24); api.sfx("pop", tSix, 0.4);

  // ---------- Wob ----------
  W.set(0, { x: 1660, y: 1000, size: 0.62, pupX: -12, pupY: -4 });
  W.nhonChan(0.35, tFif + 0.6, { lean: -8, nhin: [-13, -6] });
  W.mouth(0.6, "o");
  W.pose(1.4, 0.4, { pupX: -10, pupY: -8 }, "power2.inOut");
  W.pose(tFif + 0.2, 0.3, { pupX: -14, pupY: -12 }, "power2.inOut");
  W.mouth(tFif + 0.4, "grin");
  W.idle(tFif + 1.2, tSure - 0.2, { seed: 131, bien: 0.8, liec: false });
  // vẫy mời, chỉ bãi đất
  W.vay(tSure, 3, "L", { ve: false });
  W.mouth(tSure, "grin");
  W.pose(tSure + 0.8, 0.22, { aLu: 70, aLf: -20, pupX: -12, pupY: 6 }, "back.out(1.6)");
  // khựng
  W.pose(tHe - 0.05, 0.2, { aLu: 150, aLf: -30 }, "power2.out");
  W.mouth(tSail + 0.1, "flat");
  W.pose(tSail + 0.15, 0.25, { pupX: -4, pupY: -6, eye: 1.06 }, "power2.out");
  W.blinkAt(tSail + 0.9);
  W.pose(tFirst - 0.05, 0.35, { pupX: 8, pupY: -4 }, "sine.inOut");
  W.pose(tFirst + 0.2, 0.35, { aLu: 18, aLf: -10, eye: 1 }, "power2.inOut");
  // bước tới mép trang, ướm chân
  W.walk(tFirst + 0.7, tFirst + 1.6, 1660, 1462, { step: 0.3 });
  api.key("#W", "y", tFirst + 0.7, 1000, "none"); api.key("#W", "y", tFirst + 1.6, 930, "power1.inOut");
  W.pose(tFirst + 1.7, 0.3, { pupX: -8, pupY: 14, lean: -4 }, "power2.inOut");
  W.mouth(tFp + 0.2, "o");
  W.pose(tSix + 0.5, 0.25, { legL: 40, lean: 7 }, "power2.out");
  W.pose(tSix + 1.3, 0.2, { legL: 0, lean: 0 }, "power2.inOut");
  W.pose(tSix + 1.55, 0.25, { legL: 40, lean: 7 }, "power2.out");
  W.nhunVai(tDutch + 0.05, 0.5);
  W.mouth(tDutch + 0.1, "flat");
  W.autoBlink(0, tSail, 132);
};
