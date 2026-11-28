/* d06 – Tháng 2: phố cũ chiều tối → mở cửa phòng thuê bằng chìa trên chùm → phòng thuê đêm: cốc nước ngân, nhích, Wob trùm chăn, lò sưởi nín thở.
   Cắt giấy, nhóm A. Mốc lấy từ lời (api.tuDung). Chữ: không có (chu_tren_do_vat rỗng). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, DUR = api.DUR, at = api.at;
  function T(w, k, lo) { var t = api.tuDung(w, lo || 0, k || 0); return t == null ? null : t; }

  var tRented = T("rented"), tBed = T("bed,"), tRad = T("radiator,"), tGlass = T("glass"), tAt = T("at"), tHum = T("hum."),
    tShuf = T("shuffled"), tLay = T("lay"), tStill = T("still."), tRad2 = api.tuDung("radiator", 15, 0);
  var tCut = 4.36;

  /* ---------- cảnh 1: phố cũ ---------- */
  var P = XL.phoCu(api, "pc", { cua: 2050 });
  var camChum = '<g id="W-cam"><g transform="rotate(-10) scale(0.5)">' + XL.chumChia("W-cc2", { kiruna: true }) + "</g></g>";
  var W = XL.wob(api, "W", { chum: true, holdR: camChum });
  var c1 = '<g id="c1">' + P.troi + api.lop("xa", P.xa, 0.35, { mat: 790 }) + api.lop("giua", P.giua + W.svg, 1, { mat: 830 }) + api.lop("gan", P.gan, 1.4, { mat: 1080 }) + "</g>";

  /* ---------- cảnh 2: phòng thuê ---------- */
  var R = XL.phongThue(api, "pt", {});
  var B = XL.wob(api, "B", { ao: null, noPack: true });
  var c2 = '<g id="c2">' + api.lop("t2", R.tuong, 1, { mat: 860 }) + api.lop("g2", R.sau + B.svg + R.chan + R.truoc, 1, { mat: 860 }) + "</g>";

  api.dat(XL.defs() + c1 + c2);
  api.noi({ kieu: { t2: "khong", g2: "khong" } });
  api.show("#c1", 0, 1); api.show("#c2", 0, 0); api.fade("#c2", tCut - 0.12, 0.22, 1); api.show("#c1", tCut + 0.12, 0);

  /* ---- phố: Wob đi tới cửa ---- */
  var WY = 842, xCua = P.cua;
  W.set(0, { x: 1330, y: WY, size: 0.62 });
  api.show("#W-cam", 0, 0);
  W.walk(0.05, 2.0, 1330, 1915, { step: 0.3, tieng: true });
  W.autoBlink(0, tCut, 11);
  // rút chùm chìa từ quai ba lô
  W.pose(1.95, 0.22, { aRu: 150, aRf: -120, pupX: 6, pupY: 4 }, "power2.out");
  api.show(W.xl.chum, 2.2, 0); api.show("#W-cam", 2.2, 1);
  api.sfx("ting", 2.22, 0.35);
  W.pose(2.3, 0.34, { aRu: -84, aRf: -6, lean: -4, pupX: 10, pupY: 2 }, "back.out(1.4)");
  // mở khoá đúng "rented"
  api.origin("#W-hR", "0 0");
  api.to("#W-hR", tRented - 0.06, 0.14, { rotation: 70 }, "power2.out");
  api.to("#W-hR", tRented + 0.3, 0.14, { rotation: 0 }, "power2.in");
  api.sfx("ting", tRented, 0.5);
  W.pose(tRented + 0.08, 0.06, { sy: 0.96 }, "power2.out"); W.pose(tRented + 0.14, 0.2, { sy: 1 }, "back.out(2)");
  // cửa mở, ánh vàng
  api.key("#pc-cuaLa", "scaleX", 0, 1); api.key("#pc-cuaLa", "scaleX", tRented + 0.3, 1, "none"); api.key("#pc-cuaLa", "scaleX", tRented + 0.75, 0.14, "power2.inOut");
  W.pose(tRented + 0.5, 0.3, { aRu: -18, aRf: 10, lean: 0, pupX: 0 }, "power2.inOut");
  W.mouth(tRented + 0.6, "smirk");
  W.walk(tRented + 0.95, tCut - 0.18, 1915, xCua, { step: 0.28, tieng: true });
  W.pose(tCut - 0.5, 0.3, { size: 0.56 }, "power2.in");
  W.set(tCut - 0.18, { op: 1 }); W.pose(tCut - 0.2, 0.16, { op: 0 }, "power2.in");
  W.set(0, { op: 1 });
  api.camera([[0, 1420, 640, 1.12], [2.0, 1900, 650, 1.18, "sine.inOut"], [tRented + 0.1, 1990, 690, 1.42, "power2.inOut"], [tCut, 2030, 700, 1.5, "sine.out"]], ["xa", "giua", "gan"]);

  /* ---- phòng: giường, lò sưởi, cốc ---- */
  var G0 = R.vt.giuong[0];
  B.set(0, { op: 1 }); B.set(0, { x: 330, y: 862, size: 0.56, aLu: 18, aLf: -10, aRu: -18, aRf: 10 });
  B.idle(tCut, tGlass + 0.1, { seed: 5 });
  B.autoBlink(tCut, DUR, 21);
  B.mouth(0, "X");
  // nhấn từng đồ vật 0–3 khung trước chữ
  function nhan(sel, t, goc) { api.origin(sel, goc); api.key(sel, "scaleY", 0, 1); api.key(sel, "scaleY", t - 0.1, 1, "none"); api.key(sel, "scaleY", t - 0.02, 0.93, "power2.out"); api.key(sel, "scaleY", t + 0.22, 1, "back.out(3)"); }
  nhan("#pt-chanP", tBed, "700 820");
  nhan("#pt-ls", tRad, "0 0");
  nhan("#pt-coc", tGlass, "0 0");
  B.pose(tBed - 0.1, 0.3, { pupX: 6, pupY: 4 }, "power2.inOut"); B.pose(tRad - 0.1, 0.3, { pupX: 12, pupY: 0 }, "power2.inOut"); B.pose(tGlass - 0.1, 0.25, { pupX: 12, pupY: 6 }, "power2.inOut");
  // chui vào giường sau "glass"
  var tN = tGlass + 0.2;
  B.pose(tN, 0.16, { sy: 0.88, sx: 1.08 }, "power2.in");
  api.key("#B", "x", tN + 0.16, 330, "none"); api.key("#B", "x", tN + 0.9, 905, "sine.inOut");
  api.show("#B-legL", 0, 1); api.show("#B-legR", 0, 1); api.show("#B-legL", tN + 0.86, 0); api.show("#B-legR", tN + 0.86, 0);   // đã chui vào chăn: giấu chân dưới gầm giường
  api.key("#B", "y", tN + 0.16, 862, "none"); api.key("#B", "y", tN + 0.5, 600, "power2.out"); api.key("#B", "y", tN + 0.9, 812, "power2.in");
  B.pose(tN + 0.16, 0.2, { sy: 1.1, sx: 0.94, aLu: 120, aRu: -120 }, "power2.out");
  B.pose(tN + 0.9, 0.12, { sy: 0.9, sx: 1.06 }, "power2.out"); B.pose(tN + 1.02, 0.25, { sy: 1, sx: 1, aLu: 18, aRu: -18, pupX: 0, pupY: -4 }, "back.out(2)");
  B.mouth(tN + 1.1, "flat");
  api.sfx("pop", tN + 0.9, 0.25);
  api.camera([[tCut, 940, 580, 1.0], [tRad, 1040, 600, 1.05, "sine.inOut"], [tGlass, 1060, 610, 1.08, "sine.inOut"], [tAt - 0.2, 1060, 610, 1.1, "sine.inOut"]], ["t2", "g2"]);

  /* ---- cận tủ đầu giường: 1 giờ 15, cốc ngân ---- */
  api.origin("#pt-dh-kimG", "0 0"); api.origin("#pt-dh-kimP", "0 0");
  api.set("#pt-dh-kimG", 0, { rotation: 37.5 }); api.set("#pt-dh-kimP", 0, { rotation: 90 });
  var zC = 2.5;
  api.key("#B", "y", tAt - 0.3, 812, "none"); api.key("#B", "y", tAt, 846, "power2.inOut");   // Wob thụt vào chăn khi cận cốc
  api.camera([[tAt - 0.05, 1160, 625, zC, "expo.out"], [tShuf + 0.3, 1150, 628, zC + 0.18, "sine.inOut"]], ["t2", "g2"]);
  api.sfx("rise", tHum - 0.4, 0.45);
  api.show("#pt-coc-gon", tHum - 0.05, 1);
  for (var k = 0, t = tHum - 0.05; t < DUR; t += 0.42, k++) { api.key("#pt-coc-gon", "scale", t, 0.5, "none"); api.key("#pt-coc-gon", "scale", t + 0.4, 1.12, "sine.out"); }
  for (var j = 0, tt = tHum - 0.1; tt < tShuf + 0.6; tt += 0.05, j++) api.key("#pt-coc", "x", tt, (j % 2 ? 1 : -1) * 1.6, "none");
  // cốc nhích sang trái đúng "shuffled"
  api.key("#pt-coc", "x", tShuf - 0.04, 0, "none");
  api.key("#pt-coc", "x", tShuf + 0.12, -8, "power2.out"); api.key("#pt-coc", "x", tShuf + 0.3, -8, "none"); api.key("#pt-coc", "x", tShuf + 0.46, -16, "power2.out");
  api.key("#pt-coc", "y", 0, 0); api.key("#pt-coc", "y", tShuf - 0.04, 0, "none"); api.key("#pt-coc", "y", tShuf + 0.05, -4, "power2.out"); api.key("#pt-coc", "y", tShuf + 0.12, 0, "power2.in");
  api.key("#pt-coc", "y", tShuf + 0.36, -4, "power2.out"); api.key("#pt-coc", "y", tShuf + 0.46, 0, "power2.in");
  for (var j2 = 0, t3 = tShuf + 0.5; t3 < DUR; t3 += 0.06, j2++) api.key("#pt-coc", "x", t3, -16 + (j2 % 2 ? 1 : -1) * 1.2, "none");
  // đôi mắt Wob ló khỏi mép chăn, nhìn cốc
  var tLo = tShuf + 0.55;
  api.camera([[tLo, 1040, 650, 1.85, "power2.inOut"], [tLay, 1030, 652, 1.92, "sine.inOut"]], ["t2", "g2"]);
  api.key("#B", "y", tLo, 846, "none"); api.key("#B", "y", tLo + 0.35, 814, "power2.out");
  B.pose(tLo, 0.2, { pupX: 13, pupY: 6, eye: 1.12 }, "power2.out");
  B.blinkAt(tLo + 0.9);
  // trùm chăn đúng "still."
  var tTrum = tStill - 0.06;
  B.pose(tTrum - 0.2, 0.15, { pupX: 0, pupY: -10 }, "power2.out");
  api.key("#B", "y", tTrum - 0.08, 814, "none"); api.key("#B", "y", tTrum + 0.06, 880, "power2.in"); B.set(tTrum + 0.07, { op: 0 });
  api.show("#pt-chanP", 0, 1); api.show("#pt-chanP", tTrum, 0); api.show("#pt-chanC", tTrum, 1);
  api.origin("#pt-chanC", "900 822");
  api.key("#pt-chanC", "scaleY", 0, 1); api.key("#pt-chanC", "scaleY", tTrum, 0.82, "none"); api.key("#pt-chanC", "scaleY", tTrum + 0.12, 1.08, "power2.out"); api.key("#pt-chanC", "scaleY", tTrum + 0.34, 1, "back.out(2)");
  api.sfx("pop", tTrum, 0.2);
  // lò sưởi nín thở đúng "radiator."
  api.camera([[tTrum + 0.4, 1180, 650, 1.32, "power2.inOut"], [DUR, 1200, 655, 1.4, "sine.inOut"]], ["t2", "g2"]);
  api.origin("#pt-ls-mat", "0 0");
  api.show("#pt-ls-mat", tRad2 - 0.08, 1);
  api.key("#pt-ls-mat", "scale", 0, 0.2); api.key("#pt-ls-mat", "scale", tRad2 - 0.08, 0.2, "none"); api.key("#pt-ls-mat", "scale", tRad2 + 0.14, 1, "back.out(2.4)");
  for (var f = 0; f < 9; f++) {
    var dx = (4 - f) * 7;
    api.key("#pt-ls-l" + f, "x", 0, 0); api.key("#pt-ls-l" + f, "x", tRad2 + 0.05, 0, "none"); api.key("#pt-ls-l" + f, "x", tRad2 + 0.32, dx, "power3.out");
  }
  api.sfx("bonk", tRad2 + 0.1, 0.15);
};
