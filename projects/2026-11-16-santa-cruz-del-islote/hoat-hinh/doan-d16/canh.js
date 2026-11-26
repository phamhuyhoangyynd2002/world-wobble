/* Đoạn d16 · cắt giấy · hồi ức: quảng trường nhỏ ban ngày, "dân số bao nhiêu?".
   Vào "giay" (lớp bật dựng), ra "chen" (cắt cứng sang d17 vẽ tay).
   Shot: toàn quảng trường (Wob giơ bấm đếm) → trung cảnh mái nhà (biển 1, 2) → toàn (biển 3, 4 chen nhau) → CẬN Wob ("Estimates vary").
   Trang phục: mũ cói (NhietDoi), ba lô khổng lồ dựa chân (bình xịt túi hông), cầm cái bấm đếm (chỉ kim, vạch: không số).
   Chữ: bốn biển số (chu_tren_do_vat), mọi chữ dưới y 150, không chồng nhau. Người dân: bóng giấy chung, nhỏ, đi dạo phía sau. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, B = window.NhietDoiB, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var cx = data.chu_tren_do_vat;
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }

  var QT = B.quangTruong(api, { seed: 1600, thanhGia: 1240 });

  // ---------- bốn biển số sau mái nhà (gốc: chân cột y 470, khuất sau mái) ----------
  var BIEN = [
    { x: 305, w: 330, h: 124, co: 76, top: 196 },
    { x: 615, w: 250, h: 124, co: 76, top: 196 },
    { x: 1010, w: 500, h: 100, co: 48, top: 222 },
    { x: 1530, w: 500, h: 100, co: 48, top: 222 }
  ];
  var bienSvg = "";
  BIEN.forEach(function (b, i) {
    var top = b.top - 470;
    var s = D.line("M -6 0 L -6 " + (top + b.h)) + D.line("M -6 0 L -6 " + (top + b.h), 14, "#8A6440") + D.line("M -6 0 L -6 " + (top + b.h), 3, D.INK, ' opacity="0.5"');
    s += D.paper(D.rRect(-b.w / 2, top, b.w, b.h, 1.6, 1700 + i), i % 2 ? "#FBF3DC" : "#F6EDD6", { stroke: true, sw: 5, sx: 7, sy: 9 });
    s += '<rect x="' + (-b.w / 2 + 10) + '" y="' + (top + 8) + '" width="34" height="14" fill="#E9C46A" opacity="0.8" transform="rotate(-8 ' + (-b.w / 2 + 27) + " " + (top + 15) + ')"/>';
    s += D.txt(0, D.f1(top + b.h / 2 + b.co * 0.35), cx[i], b.co, { w: 800 });
    bienSvg += at(b.x, 470, '<g id="bs' + i + '">' + s + "</g>");
    api.origin("#bs" + i, "0 0");
  });

  // ---------- người đi dạo phía sau (dạng chung, nhỏ) ----------
  var nguoi = B.nguoiDat(api, "p0", -200, 850, 0.5, { ao: "#E9806E", quan: "#4F6A80", sau: false }) +
    B.nguoiDat(api, "p1", 2200, 846, 0.48, { ao: "#5FA8D3", quan: "#3E4A50", lat: -1 }) +
    B.nguoiDat(api, "p2", 1500, 852, 0.36, { nho: true, ao: "#F2CB57", quan: "#4F6A80" });

  // ---------- Wob + ba lô dựa chân ----------
  var XW = 860, YW = 935, SW = 0.62;
  var CLK = '<g transform="translate(0,-24)">' + D.clicker("clk", { r: 40 }) + "</g>";
  var W = ND.wob(api, "W", { lung: 0, truoc: 0, holdR: CLK });
  var baLo = at(1082, 944, '<g id="pk"><g transform="rotate(-7) scale(0.58)">' + ND.baLo("pkb", {}) + "</g></g>");

  var giua = bienSvg + QT.nen + QT.nha + QT.thanhGia + QT.ghe + nguoi + baLo + W.svg;
  api.dat(D.defsNhietDoi() + ND.defs() + QT.troi + api.lop("xa", QT.xa, 0.35, { mat: 720 }) + api.lop("giua", giua, 1, { mat: 800 }) + api.lop("gan", QT.gan, 1.4, { mat: 1090 }));
  api.noi({ vaoDai: 0.55 });

  // ---------- mốc lời ----------
  var tNext = T("Next,", 0, 0.85), tThought = T("thought.", 0, 2.61), tHow = T("How", 0, 3.3), tFig = T("figure", 0, 5.05);
  var tTwelve = T("twelve", 0, 6.78), tCNN = T("CNN", 0, 9.78), tNine = T("nine", 0, 11.16), tCensus = T("census", 0, 13.35);
  var tFour = T("four", 0, 15.85), tTwo = T("two", 0, 18.02), tEighty = T("eighty.", 0, 20.34), tEst = T("Estimates", 0, 21.0), tGently = T("gently.", 0, 22.4);

  // ---------- camera ----------
  var tCan = tEst - 0.12;
  api.camera([
    [0, 930, 600, 1.06], [tFig - 0.2, 940, 590, 1.1, "sine.inOut"],
    [tTwelve - 0.55, 600, 470, 1.32, "power2.inOut"],           // trung cảnh mái nhà: biển 1
    [tCNN, 640, 468, 1.36, "sine.inOut"],
    [tNine - 0.5, 700, 480, 1.3, "sine.inOut"],
    [tCensus - 0.55, 960, 540, 1.0, "power2.inOut"],             // toàn: đủ chỗ cho bốn biển
    [tEighty, 960, 548, 1.03, "sine.inOut"],
    [tCan, 960, 548, 1.03, "none"],
    [tCan + 0.3, XW + 20, YW - 150, 2.55, "expo.out"],            // lao vào cận Wob
    [DUR, XW + 20, YW - 152, 2.7, "sine.inOut"]
  ]);

  // ---------- biển bật lên từ sau mái ----------
  var tPop = [tTwelve - 0.08, tNine - 0.08, tCensus - 0.08, tTwo - 0.1];
  tPop.forEach(function (t, i) {
    var sel = "#bs" + i;
    api.key(sel, "y", 0, 300, "step"); api.key(sel, "y", t, 300, "none"); api.key(sel, "y", t + 0.32, -12, "back.out(2.2)"); api.key(sel, "y", t + 0.55, 0, "sine.out");
    api.key(sel, "rotation", 0, 0, "step");
    api.sfx("pop", t, 0.55);
  });
  // tấm sau chen lấn đẩy tấm trước nghiêng sang (nghiêng RA XA nhau, chữ không chồng)
  [[0, 1], [1, 2], [2, 3]].forEach(function (p) {
    var t = tPop[p[1]] + 0.2, sel = "#bs" + p[0];
    api.key(sel, "rotation", t, -10, "power2.out"); api.key(sel, "rotation", t + 0.7, -3, "elastic.out(1,0.5)");
    api.key(sel, "x", t, 0, "none"); api.key(sel, "x", t + 0.15, -8, "power2.out"); api.key(sel, "x", t + 0.8, 0, "sine.inOut");
  });
  // bốn tấm nhón lên cho cao hơn nhau (lần lượt), rồi lắng
  var tJ0 = tPop[3] + 0.7, tJ1 = tEst - 0.25;
  for (var i = 0; i < 4; i++) {
    var sel = "#bs" + i, k = 0;
    for (var t = tJ0 + i * 0.22; t < tJ1 - 0.4; t += 0.88, k++) {
      api.key(sel, "y", t, 0, "none"); api.key(sel, "y", t + 0.18, -28, "back.out(2)"); api.key(sel, "y", t + 0.5, 0, "power2.in");
      api.key(sel, "rotation", t + 0.18, i < 2 ? -4 - (k % 2) : 2 + (k % 2), "sine.out"); api.key(sel, "rotation", t + 0.5, i < 2 ? -3 : 1, "sine.inOut");
    }
  }

  // ---------- người đi dạo ----------
  // p0 chỉ vào khung sau câu "A man who'd lived here…" (7,7–11,8 s không có người nào gần ghế / giữa khung)
  B.nguoiDi(api, "p0", 12.9, DUR, 1100, { buoc: 0.4 });
  B.nguoiDi(api, "p1", 12.3, 15.8, 1450, { buoc: 0.42 });
  B.nguoiDi(api, "p1", 16.2, DUR, 700, { buoc: 0.42 });
  B.nguoiDi(api, "p2", 1.0, 9.0, 2100, { buoc: 0.26 });
  B.nguoiDi(api, "p2", 9.4, DUR, 120, { buoc: 0.26 });

  // ---------- Wob ----------
  W.set(0, { x: XW, y: YW, size: SW, aLu: 18, aLf: -10, aRu: -30, aRf: 20, op: 1 });
  W.idle(0.2, tNext - 0.1, { seed: 3, bien: 1.8 });
  api.origin("#clk-nut", "0 0"); api.origin("#clk-kim", "0 0");
  var kim = 0;
  function bam(t) {
    api.key("#clk-nut", "y", t - 0.04, 0, "none"); api.key("#clk-nut", "y", t, 7, "power3.in"); api.key("#clk-nut", "y", t + 0.12, 0, "power2.out");
    kim += 32; api.key("#clk-kim", "rotation", t, kim - 32, "none"); api.key("#clk-kim", "rotation", t + 0.16, kim, "back.out(3)");
    W.pose(t - 0.06, 0.06, { aRf: -26 }, "power2.in"); W.pose(t, 0.12, { aRf: -14 }, "power2.out");
  }
  api.key("#clk-kim", "rotation", 0, 0, "step"); api.key("#clk-nut", "y", 0, 0, "step");
  // giơ bấm đếm tự tin
  W.pose(tNext - 0.15, 0.32, { aRu: -142, aRf: -14, upRot: -3, pupX: 6, pupY: -6 }, "back.out(1.6)");
  W.mouth(tNext, "smirk");
  W.pose(tNext + 0.6, 0.3, { lean: -3 }, "sine.inOut"); W.pose(tThought - 0.4, 0.3, { lean: 0 }, "sine.inOut");
  bam(tThought);
  W.mouth(tThought + 0.15, "grin");
  // "How many people live here?": hạ tay, nhìn quanh quảng trường
  W.pose(tHow - 0.1, 0.3, { aRu: -70, aRf: -40, upRot: 0 }, "power2.inOut");
  W.mouth(tHow, "X");
  W.nhinQuanh(tHow + 0.1, { nhip: 0.45 });
  W.idle(tHow + 1.5, tTwelve - 0.5, { seed: 5, bien: 1.6, liec: true });
  // mỗi biển bật: Wob ngước nhìn, bấm một cái
  function nhin(t, px, py) { W.pose(t, 0.18, { pupX: px, pupY: py }, "power2.out"); }
  nhin(tPop[0] - 0.1, -12, -13); W.pose(tPop[0], 0.2, { upRot: -4, eye: 1.12 }, "back.out(2)"); bam(tPop[0] + 0.35); W.pose(tPop[0] + 0.7, 0.3, { eye: 1 }, "power2.out");
  W.mouth(tPop[0] + 0.1, "o");
  W.idle(tPop[0] + 0.8, tPop[1] - 0.3, { seed: 7, bien: 1.4 });
  W.mouth(tCNN, "flat");
  nhin(tPop[1] - 0.1, -9, -13); bam(tPop[1] + 0.35); W.mouth(tPop[1] + 0.1, "o");
  W.pose(tPop[1] + 0.5, 0.3, { upRot: 3, lean: 2 }, "sine.inOut");
  W.idle(tPop[1] + 0.9, tPop[2] - 0.3, { seed: 8, bien: 1.6 });
  nhin(tPop[2] - 0.1, 4, -12); bam(tPop[2] + 0.35); W.mouth(tPop[2] + 0.1, "wobbly");
  W.pose(tFour - 0.1, 0.25, { upRot: -2, lean: -2 }, "sine.inOut");
  bam(tFour + 0.1);
  W.idle(tFour + 0.5, tPop[3] - 0.3, { seed: 9, bien: 1.6 });
  nhin(tPop[3] - 0.1, 12, -12); bam(tPop[3] + 0.3); W.mouth(tPop[3] + 0.1, "o");
  // bốn biển chen nhau: mắt đảo qua lại theo từng tấm, bấm loạn
  var dao = [[-12, -13], [-6, -13], [4, -12], [12, -12]];
  for (var j = 0, tt = tJ0; tt < tJ1 - 0.5; tt += 0.44, j++) { var d = dao[j % 4]; nhin(tt, d[0], d[1]); }
  bam(tJ0 + 0.3); bam(tJ0 + 0.9); bam(tJ0 + 1.3);
  W.idle(tJ0, tJ1, { seed: 11, bien: 2.2 });
  // CẬN: nhìn bốn tấm biển, nhìn bấm đếm, nhìn người xem; giữ
  W.pose(tCan + 0.05, 0.2, { aRu: -60, aRf: -64, upRot: 0, lean: 0 }, "power2.out");
  W.mouth(tCan, "flat");
  nhin(tEst + 0.1, -11, -13);
  W.pose(tEst + 0.62, 0.2, { pupX: 12, pupY: 10, upRot: 3 }, "power2.inOut");
  W.pose(tEst + 1.22, 0.22, { pupX: 0, pupY: 0, upRot: 0 }, "power2.out");
  W.pose(tEst + 1.25, 0.2, { lid: 16 }, "power2.inOut");
  W.mouth(tGently - 0.1, "thang");
  W.breathe(tEst, DUR);
  W.autoBlink(0.6, tEst - 0.2, 61);
};
