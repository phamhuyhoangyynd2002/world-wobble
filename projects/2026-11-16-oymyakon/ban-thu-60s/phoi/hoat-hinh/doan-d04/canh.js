/* Đoạn d04 · cắt giấy · hồi ức: đoạn khác của cùng con phố d02 (vùng x 2400–4700). Vào "cat", ra "cat".
   Lời: "Outside, a car sat running with nobody in it. People here often leave engines running,
   because a cold engine may not start again."
   Trang phục: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng, vác cá trên vai trái. Không có chữ trên hình. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR, C = api.C;
  var T = function (w, k, du) { var v = api.tu(w, k); return v == null ? du : v; };

  // ---- con phố (cấu hình CHUNG với doan-d02) ----
  var PHO = {
    ten: "pho", seed: 400, tu: -1400, den: 6600, mat: 872,
    nha: [[-260, 380, 230], [1480, 330, 200], [2640, 300, 190], [3620, 360, 220], [4560, 340, 210], [5400, 320, 200]],
    thong: [[1180, 690, 300], [1760, 650, 360], [2700, 640, 340], [4300, 650, 330]],
    rao: [[1100, 780]], cot: [1380, 2480, 3580, 4680], cui: [[5000, 150]]
  };
  var nen = CN.langTuyet(api, PHO);
  var M = api.wob("M", {
    scarf: true, khan: "#D9543C", mu: "#C9463A", tuyetDau: true,
    holdL: g("M-fishL", '<g transform="translate(-20,0)">' + D.fish({ seed: 173 }) + "</g>")
  });

  // ---- xe: một xe nổ máy sát lề, hai xe nổ máy bên kia đường, một xe tắt máy bị tuyết vùi ----
  var mid = nen.giua, S2 = 0.6;
  [["car2", 3560, "#5E8C8A", "#BFD8D6"], ["car3", 4520, "#A0523D", "#E3A58F"]].forEach(function (c) {
    mid += api.phut("ex-" + c[0], c[1] + 310 * S2, 862 - 43 * S2, { n: 4, song: 1.5, cao: 50, troi: 90, r: 12, seed: c[1] });
    mid += at(c[1], 862, '<g transform="scale(' + S2 + ')">' + D.car(c[0], { mau: c[2], vien: c[3] }) + "</g>");
  });
  mid += api.phut("ex1", 3412, 842, { n: 4, song: 1.4, cao: 72, troi: 150, r: 18, seed: 11 });
  mid += at(3100, 885, D.car("car"));
  mid += at(3980, 885, '<g transform="scale(1.2)">' + D.snowCar("sc") + "</g>");
  mid += M.svg;
  // cục tuyết rơi (vẽ sau Wob để rơi đè lên đầu); cục tuyết gốc của xe ẩn đi
  mid += at(3900, 552, g("lump", D.paper(D.rEll(0, 0, 55, 26, 3, 192), C.snow, { stroke: true, sw: 4, sy: 5 })));
  var fx = api.lapLanh("spk", 10, 502, [80, 60, 1760, 600], 0.3, DUR);
  api.dat(nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: 872 }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }) + g("fx", fx));
  api.noi({});
  api.show("#sc-lump", 0, 0);

  // ---- mốc lời ----
  var tNobody = T("nobody", 0, 2.05), tPeople = T("People", 0, 3.2), tCold = T("cold", 0, 6.05), tAgain = T("again", 0, 7.75);

  // ---- camera ----
  api.camera([
    [0, 2720, 640, 1.2], [1.85, 2935, 655, 1.45, "sine.inOut"], [tPeople - 0.1, 2955, 655, 1.5, "sine.inOut"],
    [tPeople + 1.4, 3560, 570, 0.86, "power2.inOut"],     // lùi + lia: thêm xe nổ máy bên kia đường
    [tCold - 0.5, 3630, 585, 0.92, "sine.inOut"],
    [tCold - 0.05, 3780, 650, 1.45, "power3.inOut"],      // vào xe tuyết vùi
    [DUR, 3772, 660, 1.56, "sine.inOut"]
  ]);

  // ---- xe rung, ống xả phụt đều ----
  ["#car", "#car2", "#car3"].forEach(function (sel, i) {
    api.key(sel, "y", 0, 0);
    for (var ct = i * 0.03, up = true; ct < DUR; ct += 1 / 12, up = !up) api.key(sel, "y", ct, up ? -2.4 : 0, "sine.inOut");
  });
  [0, 1.6, 3.2, 4.8, 6.4].forEach(function (t, i) { api.sfx("may-no", t, [0.3, 0.3, 0.26, 0.2, 0.14][i]); });

  // ---- Wob vác cá đi tới xe ----
  M.set(0, { x: 2440, y: 900, size: 0.7, aLu: 172, aLf: 28, aRu: -18, aRf: 10, lashes: 1, ice: 1, pupX: 8 });
  api.origin("#M-fishL", "0 0");
  api.set("#M-fishL", 0, { rotation: -150 });
  M.mouth(0, "X");
  M.walk(0.0, 1.85, 2440, 2985, { step: 0.29, arms: "R", tieng: true });
  // nhón chân ngó qua cửa kính: ghế lái trống
  M.nhonChan(tNobody - 0.15, 0.85, { lean: 7, nhin: [10, -9] });
  M.mouth(tNobody + 0.3, "o");
  // vẫy tay chào cái ghế trống
  M.vay(2.42, 4, "R");
  M.mouth(2.5, "grin");
  api.sfx("liu-lo-vui", 2.5, 0.5);
  M.mouth(3.35, "X");
  // đi tiếp sang xe bị tuyết vùi
  M.pose(tPeople + 0.1, 0.15, { pupX: 8, pupY: 0 }, "power2.out");
  M.walk(tPeople + 0.25, tCold - 0.25, 2985, 3700, { step: 0.29, arms: "R", tieng: true });
  // gõ lên xe: cộp cộp → cục tuyết trượt khỏi nóc, rơi trúng đầu
  var hits = M.go(tCold - 0.05, 2, "R", { goc: -100 });
  hits.forEach(function (h, i) { api.sfx("bonk", h, i ? 0.5 : 0.65); });
  var tFall = hits[1] + 0.12, tLand = tFall + 0.42;
  api.origin("#lump", "0 0");
  api.key("#lump", "x", 0, 0); api.key("#lump", "x", tFall, 0, "none"); api.key("#lump", "x", tFall + 0.12, -40, "power1.in"); api.key("#lump", "x", tLand, -200, "power1.out");
  api.key("#lump", "y", 0, 0); api.key("#lump", "y", tFall, 0, "none"); api.key("#lump", "y", tFall + 0.14, -10, "sine.out"); api.key("#lump", "y", tLand, 78, "power2.in");
  api.key("#lump", "rotation", 0, 0); api.key("#lump", "rotation", tFall, 0, "none"); api.key("#lump", "rotation", tLand, -24, "power1.in");
  api.show("#lump", 0, 1); api.show("#lump", tLand, 0);
  M.set(tLand, { snow: 1 });
  M.pose(tLand, 0.08, { sy: 0.88, sx: 1.08, upY: 8, lid: 20 }, "power2.in");
  M.pose(tLand + 0.08, 0.3, { sy: 1, sx: 1, upY: 0 }, "back.out(2)");
  api.shake(tLand, 5, 4);
  api.sfx("drop", tLand, 0.5);
  M.mouth(tLand, "flat");
  // tỉnh bơ, lác mắt nhìn lên đống tuyết trên đầu
  M.pose(tLand + 0.5, 0.25, { lid: 28 }, "power2.out");
  M.lacMat(tAgain - 0.05, null, { y: -16 });
  M.pose(tAgain - 0.05, 0.2, { lid: 10 }, "power2.out");
  M.shiver(tAgain + 0.3, DUR, 1.6, 14);
  M.breathe(0, DUR, 2.4);
  M.autoBlink(0.2, tCold - 0.4, 401);
};
