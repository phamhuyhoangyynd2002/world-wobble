/* Đoạn d27 · cắt giấy · hồi ức chiều muộn tháng 8: nhà thờ đỏ đứng yên ở chỗ mới, quay mặt về thị trấn; người que gấp ghế ra về; Wob đứng nhìn, bóng dài.
   MÔ-TÍP CHÌA 3 (cận): lấy chìa Kiruna khỏi túi phải gi-lê ("key out"), tháo chùm chìa nhà khỏi quai ba lô, luồn chìa vào vòng ("threaded"),
   lắc leng keng, mỉm cười; 0,45 s cuối phủ giấy. Vào "cat", ra "giay". Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, K = api.K, at = KR.at, M = KR.M, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tStay = T("stay.", 0, 5.3), tI = T("i", 0, 6.11), tOut = T("out", 0, 6.76), tPocket = T("pocket", 0, 7.1), tThr = T("threaded", 0, 7.67), tRing = T("ring.", 0, 9.01);

  var G = 940;
  var troi = '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#krChieu)"/>' + at(240, 520, '<circle r="90" fill="#FBE3A8" opacity="0.9"/>') + at(240, 520, '<circle r="190" fill="url(#krNang)" opacity="0.6"/>');
  var xa = KR.nuiXa(-700, 2600, 760, 100, "#B8B49A", 10001);
  xa += '<rect x="-800" y="756" width="3600" height="600" fill="#B8C48E"/>';
  // thị trấn mới phía trái: khối nhà, toà tròn mờ
  [[-120, 1], [90, 2], [300, 0], [480, 5]].forEach(function (n, i) { xa += at(n[0], 770, KR.nhaGo({ w: 170, h: 200, mau: M.nha[n[1]], mai: M.mai[i % 3], sd: 10010 + i * 9 }), 0.8); });
  xa += at(700, 770, paper("M -120 0 L -120 -120 C -120 -170 120 -170 120 -120 L 120 0 Z", "url(#krKinh)", { stroke: true, sw: 4, shadow: false }), 0.8);
  var gi = '<rect x="-800" y="' + (G - 8) + '" width="3600" height="600" fill="' + M.co + '"/>' + paper(rRect(-800, G - 16, 3600, 24, 3, 10020), M.coToi, { shadow: false });
  // bóng dài của nhà thờ và Wob đổ sang phải (nắng thấp bên trái)
  gi += '<path d="M 1060 ' + (G + 4) + ' L 1660 ' + (G + 4) + ' L 2400 ' + (G + 60) + ' L 1400 ' + (G + 60) + ' Z" fill="#3A3060" opacity="0.18"/>';
  gi += at(1380, G, KR.romooc("rm", 820)) + at(1380, G - 64, KR.nhaTho("nt"));
  gi += at(1960, G, KR.thapChuong("thap"), 1.0);
  // người que gấp ghế ra về
  var ng = [];
  [[380, 0], [520, 1], [980, 2]].forEach(function (p, i) {
    var id = "ng" + i;
    gi += '<g id="' + id + 'G" transform="translate(' + p[0] + "," + (G + 6) + ')">' + '<g id="' + id + 'Ghe">' + KR.gheGap(["#3F6E9A", "#B04A3A", "#4F7A5A"][i]) + "</g>" +
      at(-70, 0, KR.nguoi(id, { ao: M.ao1[i * 3 % 8], mu: i === 1 ? "#4F7A5A" : null, da: [M.da1, M.da3, M.da2][i] }), 0.78) + "</g>";
    ng.push(id);
  });
  gi += '<path id="bongW" d="M 0 0 L 520 22 L 520 46 L 0 20 Z" fill="#3A3060" opacity="0.2"/>';
  // Wob + đồ cầm (key trong tay phải, key trong tay trái, chùm chìa trong tay phải)
  var kR = '<g id="kR">' + KR.chiaKiruna("kRi", 1.1) + "</g>", kL = '<g id="kL">' + KR.chiaKiruna("kLi", 1.1) + "</g>", rR = '<g id="rR">' + KR.chumChia("rRi", { kr: true }) + "</g>";
  var W = KR.wob(api, "W", { mua: "he", tuiThe: 1, chum: 1, holdR: kR + rR, holdL: kL });
  var WX = 760;
  gi += W.svg;

  api.dat(KR.defs() + troi + api.lop("xa", xa, 0.4, { mat: 760 }) + api.lop("giua", gi, 1, { mat: G }));
  api.noi({});
  api.show(W.kr.chumQ, 0, 1);

  // ---------- camera: lùi chậm im lặng, rồi đẩy vào cận tay ----------
  var tCan = tI - 0.05;
  api.camera([[0, 1100, 690, 1.42], [tCan - 0.1, 1010, 610, 1.0, "sine.inOut"], [tCan + 0.75, 772, 790, 3.0, "power2.inOut"], [DUR, 774, 786, 3.12, "sine.inOut"]]);

  // ---------- người que gấp ghế, đi về bên trái ----------
  ng.forEach(function (id, i) {
    var t0 = 0.6 + i * 1.1, sel = "#" + id + "G", gh = "#" + id + "Ghe", x0 = [380, 520, 980][i];
    api.origin(gh, "0 0");
    api.key(gh, "scaleX", 0, 1); api.key(gh, "scaleX", t0, 1, "none"); api.key(gh, "scaleX", t0 + 0.35, 0.16, "power2.inOut");
    api.key(gh, "x", 0, 0); api.key(gh, "x", t0 + 0.35, 0, "none"); api.key(gh, "x", t0 + 0.6, -70, "power2.inOut");
    api.key(gh, "y", 0, 0); api.key(gh, "y", t0 + 0.35, 0, "none"); api.key(gh, "y", t0 + 0.6, -40, "power2.inOut");
    api.origin("#" + id + "-tayR", "22 -150"); api.key("#" + id + "-tayR", "rotation", t0 + 0.2, 0, "none"); api.key("#" + id + "-tayR", "rotation", t0 + 0.6, -20, "power2.out");
    api.key(sel, "x", 0, x0, "step"); api.key(sel, "x", t0 + 0.6, x0, "none"); api.key(sel, "x", t0 + 4.2, x0 - 900, "sine.in");
    for (var h = 0; h < 12; h++) api.key(sel, "y", t0 + 0.6 + h * 0.3, G + (h % 2 ? 0 : 6), "sine.inOut");
  });

  // ---------- Wob ----------
  W.set(0, { x: WX, y: G + 4, size: 0.62, pupX: 10, pupY: -6 });
  W.mouth(0, "flat");
  api.origin("#bongW", "0 0"); api.set("#bongW", 0, { x: WX + 20, y: G });
  W.idle(0, tCan, { seed: 27, bien: 1.4 });
  W.pose(2.6, 0.4, { pupX: -10, pupY: 0 }, "power2.inOut");    // nhìn người que ra về
  W.pose(4.4, 0.4, { pupX: 10, pupY: -8, upRot: 2 }, "power2.inOut");  // lại nhìn nhà thờ
  W.mouth(tStay - 0.3, "smirk");
  // tay phải vào túi gi-lê, rút chìa ("key out")
  api.show("#kR", 0, 0); api.show("#kL", 0, 0); api.show("#rR", 0, 0); api.show("#rRi-kr", 0, 0);
  W.pose(tI + 0.05, 0.3, { aRu: 9, aRf: 3, pupX: 8, pupY: 12, upRot: 4 }, "power2.inOut");
  W.theTui(tOut - 0.1, 0); api.show("#kR", tOut - 0.1, 1);
  W.pose(tOut, 0.3, { aRu: 56, aRf: 30, pupX: 0, pupY: 8, upRot: 0 }, "back.out(1.5)");     // giơ chìa ra trước ngực
  // tay trái đón chìa, tay phải tháo chùm chìa khỏi quai
  var tTraoL = tOut + 0.38;
  W.pose(tTraoL - 0.12, 0.22, { aLu: -56, aLf: -30 }, "power2.out");
  api.show("#kR", tTraoL, 0); api.show("#kL", tTraoL, 1);
  W.pose(tTraoL + 0.05, 0.28, { aRu: 32, aRf: 158, pupX: 12, pupY: -2 }, "power2.inOut");
  var tThao = tTraoL + 0.36;
  api.show(W.kr.chumQ, tThao, 0); api.show("#rR", tThao, 1);
  W.pose(tThao + 0.02, 0.26, { aRu: 56, aRf: 30, pupX: 0, pupY: 10 }, "power2.inOut");
  // luồn chìa vào vòng đúng "threaded"
  W.pose(tThr - 0.15, 0.12, { aLu: -60, aLf: -34, aRu: 52, aRf: 28 }, "power2.in");
  api.show("#kL", tThr, 0); api.show("#rRi-kr", tThr, 1);
  W.pose(tThr + 0.05, 0.25, { aLu: 18, aLf: -10, aRu: 46, aRf: 40 }, "power2.out");
  W.mouth(tThr + 0.1, "o");
  // lắc leng keng, mỉm cười
  var tLac = tThr + 0.45;
  for (var l = 0; l < 5; l++) W.pose(tLac + l * 0.1, 0.1, { aRf: l % 2 ? 40 : 26 }, "sine.inOut");
  api.sfx("ting", tLac + 0.05, 0.55); api.sfx("ting", tLac + 0.25, 0.4);
  W.mouth(tLac + 0.55, "grin");
  W.pose(tLac + 0.55, 0.3, { lid: 18, upRot: -3 }, "power2.out");
  KR.thong(api, W, "R", "#kR", 0, DUR, { goc: 0, lac: 0.6 });
  KR.thong(api, W, "L", "#kL", 0, DUR, { goc: 0, lac: 0.6 });
  KR.thong(api, W, "R", "#rR", 0, DUR, { goc: 0, lac: 1.4 });
  W.autoBlink(0, tThr, 2701);
};
