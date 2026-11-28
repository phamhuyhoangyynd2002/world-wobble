/* d10 – Mặt cắt núi mỏ nhiều lớp: lùi ra toàn cảnh (Wob là chấm có đèn mũ ở tầng trên); Wob nhìn xuống giếng, thả viên sỏi,
   camera lia xuống đáy giếng + thẻ "1,365 m · ~4,480 ft"; ghé tai chờ… tiếng "cạch" xa đúng "feet."; tầng dưới rút dải quặng,
   đá phía trên sụp theo; Wob đứng sau ô kính lùi nửa bước.
   Cắt giấy, nhóm A. Chữ: data.chu_tren_do_vat[0]. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, ND = window.NhietDoi, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper, CH = data.chu_tren_do_vat;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tIts = T("its"), tThou = T("thousand"), tMet = T("metres"), tThat = T("that's"), tFeet = T("feet."), tThey = T("they"), tLevel = T("level", 15), tLevel2 = T("level,"), tCave = T("cave");

  var MC = XL.matCatMo(api, "mc", {});
  var V = MC.vt, GX = V.gieng, TREN = V.tren, DAY = V.day;
  var soi = '<g id="soiTay"><circle cx="0" cy="0" r="9" fill="#8A8F94" stroke="#1f2326" stroke-width="3"/></g>';
  var W = XL.wob(api, "W", { muBaoHo: true, holdR: soi });
  var soiRoi = '<circle id="soi" cx="' + GX + '" cy="0" r="10" fill="#C8CDD2" stroke="#1f2326" stroke-width="3"/>';
  var bui = '<g id="bui" transform="translate(' + GX + "," + (DAY - 6) + ')">' + paper(D.rEll(-30, -10, 22, 12, 2, 1011), "#C8B48A", { shadow: false }) + paper(D.rEll(26, -14, 18, 10, 2, 1012), "#C8B48A", { shadow: false }) + "</g>";
  var the = '<g id="theSau" transform="translate(' + (GX + 330) + "," + (DAY - 70) + ') rotate(-2)">' + ND.theChu("", CH[0], 50, { seed: 1020 }) + "</g>";
  var lop = api.lop("mo", MC.troi + MC.dat + MC.giua + soiRoi + bui + W.svg + the, 1, { mat: 900 });
  api.dat(XL.defs() + lop);
  api.noi({});

  /* camera: cận Wob → lùi toàn cảnh → về Wob → lia xuống đáy giếng → về Wob → nửa dưới */
  var WX = GX + 62, WY = TREN + 6;
  api.camera([[0, WX, 490, 2.4], [0.35, WX, 490, 2.3, "sine.inOut"], [5.6, 1300, 880, 0.5, "power2.inOut"], [tIts - 0.15, 1300, 880, 0.5, "sine.inOut"],
    [tIts + 0.6, WX - 40, WY - 70, 3.4, "power2.inOut"], [tMet - 0.6, WX - 50, WY - 60, 3.5, "sine.inOut"], [tMet - 0.3, GX + 120, 760, 1.5, "power2.inOut"], [tMet + 0.4, GX + 170, DAY - 110, 1.3, "power2.out"],
    [tThat + 0.2, GX + 170, DAY - 100, 1.32, "sine.inOut"], [tThat + 0.8, WX - 30, WY - 70, 3.5, "power2.inOut"], [tThey - 0.1, WX - 30, WY - 70, 3.5, "sine.inOut"],
    [tThey + 0.7, 1300, 900, 1.0, "power2.inOut"], [DUR, 1310, 910, 1.03, "sine.inOut"]], ["mo"]);

  /* lồng thang ở tầng trên */
  api.key("#mc-long", "y", 0, TREN + 4);

  /* Wob: đội mũ bảo hộ, đèn mũ sáng */
  W.set(0, { x: WX, y: WY, size: 0.22, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: -6, pupY: 4 });
  api.show(W.xl.mbhDen, 0, 1);
  W.mouth(0, "flat"); W.autoBlink(0.3, DUR, 101);
  W.idle(0.2, tIts, { seed: 10, bien: 2 });
  api.show("#soiTay", 0, 0);
  // ló đầu nhìn xuống giếng, thả sỏi
  W.pose(tIts + 0.4, 0.4, { lean: -16, pupX: -10, pupY: 14 }, "power2.inOut");
  var tTha = tThou + 0.2;
  W.pose(tTha - 0.6, 0.3, { aRu: -120, aRf: -30 }, "power2.out"); api.show("#soiTay", tTha - 0.45, 1);
  W.pose(tTha - 0.1, 0.1, { aRf: 10 }, "power2.out"); api.show("#soiTay", tTha, 0);
  api.show("#soi", 0, 0); api.show("#soi", tTha, 1);
  var tDay = tMet + 0.75;
  api.key("#soi", "x", 0, -6); api.key("#soi", "y", 0, TREN - 10);
  api.key("#soi", "y", tTha, TREN - 10, "none"); api.key("#soi", "y", tDay, DAY - 10, "power2.in");
  api.show("#soi", tDay + 0.02, 0);
  api.show("#bui", 0, 0); api.pop("#bui", tDay, 0.2, tDay + 0.5);
  api.sfx("drop", tFeet - 0.04, 0.25);
  W.pose(tTha + 0.15, 0.3, { lean: -20, pupY: 16, eye: 1.08 }, "power2.out");
  // thẻ độ sâu ở đáy giếng đúng "metres"
  api.pop("#theSau", tMet - 0.1, 0.25); api.fade("#theSau", tThey + 0.2, 0.3, 0);
  // ghé tai chờ… chờ…
  W.pose(tThat + 0.5, 0.3, { lean: -8, aRu: -150, aRf: -70, pupX: 12, pupY: -12, eye: 1 }, "power2.inOut"); W.mouth(tThat + 0.5, "thang");
  for (var c = 0, tc = tThat + 0.9; tc < tFeet - 0.1; tc += 0.5, c++) W.pose(tc, 0.4, { lean: c % 2 ? -10 : -6 }, "sine.inOut");
  // "cạch" xa: mắt mở to, gật gù
  W.pose(tFeet, 0.12, { eye: 1.18, sy: 1.05, sx: 0.97 }, "power2.out"); W.mouth(tFeet, "o");
  W.pose(tFeet + 0.2, 0.25, { aRu: -18, aRf: 10, sy: 1, sx: 1, pupX: 0, pupY: 2 }, "power2.inOut");
  api.key("#W-up", "rotation", 0, 0);
  [0.3, 0.5, 0.7].forEach(function (d, i) { api.key("#W-up", "rotation", tFeet + d, i % 2 ? 0 : 8, "sine.inOut"); });
  api.key("#W-up", "rotation", tFeet + 0.9, 0, "sine.inOut");
  W.mouth(tFeet + 0.35, "smirk");

  /* tầng dưới: rút dải quặng từ đáy, đá trên sụp theo; Wob sau ô kính lùi nửa bước */
  var KX = V.kinh[0] + 46;
  W.walk(tThey, tThey + 0.6, WX, KX, { step: 0.2 });
  W.pose(tThey + 0.7, 0.3, { lean: 0, pupX: 12, pupY: 12, eye: 1.05 }, "sine.inOut");
  var tq = [tLevel - 0.15, tLevel2 - 0.1, tLevel2 + 0.3, tLevel2 + 0.6];
  for (var i = 0; i < 4; i++) {
    api.key("#mc-qd" + i, "x", 0, 0); api.key("#mc-qd" + i, "x", tq[i], 0, "none"); api.key("#mc-qd" + i, "x", tq[i] + 0.45, 420, "power2.in");
    api.show("#mc-qd" + i, 0, 1); api.fade("#mc-qd" + i, tq[i] + 0.3, 0.2, 0);
    var ts = tCave - 0.1 + i * 0.16;
    api.key("#mc-sup" + i, "y", 0, 0); api.key("#mc-sup" + i, "y", ts, 0, "none"); api.key("#mc-sup" + i, "y", ts + 0.3, 70 - i * 6, "bounce.out");
    api.key("#mc-sup" + i, "rotation", 0, 0); api.key("#mc-sup" + i, "rotation", ts, 0, "none"); api.key("#mc-sup" + i, "rotation", ts + 0.3, i % 2 ? 4 : -3, "power2.out");
  }
  api.sfx("xuoc-dia", tCave - 0.1, 0.35);
  W.pose(tCave - 0.05, 0.12, { eye: 1.2, sy: 1.06, sx: 0.96, lean: 6 }, "power2.out"); W.mouth(tCave, "o");
  api.key("#W", "x", tCave - 0.05, KX, "none"); api.key("#W", "x", tCave + 0.25, KX + 22, "power2.out");
  W.pose(tCave + 0.35, 0.3, { sy: 1, sx: 1, eye: 1.05, lean: 2 }, "sine.inOut");
};
