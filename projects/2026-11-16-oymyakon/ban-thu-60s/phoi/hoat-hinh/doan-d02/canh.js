/* Đoạn d02 · cắt giấy · hồi ức: phố làng tuyết. Vào "giay" (từ giấy phẳng các lớp bật dựng), ra "cat" (giữ cận mặt Wob lác mắt).
   Mốc theo HH_DATA (giây từ đầu đoạn). Lời: "I went in January … minus forty-six Celsius … minus fifty-one Fahrenheit.
   I stepped outside to look around. My eyelashes froze. I didn't know I had eyelashes."
   Trang phục: mũ len đỏ, khăn đỏ, ba lô; lông mi đóng băng từ "froze" tới hết. Chữ duy nhất: −46°C, −51°F (trên nhiệt kế). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tu(w, k); return v == null ? du : v; };

  // ---- con phố (cấu hình CHUNG với doan-d04 để là cùng một con phố) ----
  var PHO = {
    ten: "pho", seed: 400, tu: -1400, den: 6600, mat: 872,
    nha: [[-260, 380, 230], [1480, 330, 200], [2640, 300, 190], [3620, 360, 220], [4560, 340, 210], [5400, 320, 200]],
    thong: [[1180, 690, 300], [1760, 650, 360], [2700, 640, 340], [4300, 650, 330]],
    rao: [[1100, 780]], cot: [1380, 2480, 3580, 4680], cui: [[5000, 150]]
  };
  var nen = CN.langTuyet(api, PHO);
  var DO = "#C9463A", KHAN = "#D9543C";
  var OUTFIT = { scarf: true, khan: KHAN, mu: DO };

  // ---- Wob trong nhà (N) và Wob ngoài trời (M) ----
  var N = api.wob("N", OUTFIT);
  var M = api.wob("M", OUTFIT);
  var mid = nen.giua;
  mid += CN.nhaCua(api, { id: "nha", x: 280, y: 480, w: 760, h: 400, cuaSo: [240, 80, 180, 160], cua: [500, 120, 200, 280], trong: N.svg, khoi: { cao: 440 } });
  mid += at(300, 490, D.thermometer("th", { c: data.chu_tren_do_vat[0], f: data.chu_tren_do_vat[1] }));
  mid += M.svg;
  mid += at(1292, 676, g("bub", '<g transform="scale(0.62)">' + D.bubble("?!") + "</g>"));

  var fx = api.lapLanh("spk", 12, 501, [80, 60, 1760, 640], 0.8, DUR);
  api.dat(nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: 872 }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }) + g("fx", fx));

  // ---- nối vào: giấy phẳng → các lớp bật dựng ----
  api.noi({ vaoDai: 0.55 });
  api.sfx("whoosh", 0.0, 0.5);

  // ---- mốc lời ----
  var tJan = T("January", 0, 0.47), tMinus = T("minus", 0, 3.04), t46 = T("forty-six", 0, 3.41), tCel = T("Celsius", 0, 3.96);
  var t51 = T("fifty-one", 0, 5.88), tStep = T("stepped", 0, 7.54), tLook = T("look", 0, 8.31);
  var tLash = T("eyelashes", 0, 9.5), tFroze = T("froze", 0, 10.01), tKnow = T("didn't", 0, 10.96), tHad = T("eyelashes", 1, 11.56);

  // ---- camera (điểm ở lớp giữa nằm giữa khung) ----
  api.camera([
    [0, 1250, 560, 1.0], [0.55, 1250, 560, 1.0],
    [2.55, 830, 590, 1.06, "sine.inOut"],                 // lia chậm dọc phố về căn nhà
    [tMinus - 0.1, 545, 662, 1.55, "power3.inOut"],      // đẩy vào nhiệt kế + cửa sổ
    [6.75, 560, 655, 1.62, "sine.inOut"],
    [tStep - 0.15, 900, 640, 1.2, "power2.inOut"],       // lùi ra thấy cửa
    [tLook + 0.2, 1130, 650, 1.26, "sine.inOut"],        // theo Wob ra phố
    [tLash - 0.15, 1225, 700, 2.2, "power3.inOut"],      // đẩy vào mặt
    [tKnow - 0.4, 1228, 700, 2.28, "sine.inOut"],         // giữ cho bóng "?!" trọn trong khung
    [tKnow - 0.05, 1230, 706, 4.0, "power3.inOut"],      // cận mặt: lác mắt
    [DUR, 1230, 708, 4.12, "sine.inOut"]
  ]);

  // ================= Wob trong nhà sau cửa sổ =================
  N.set(0, { x: 610, y: 1000, size: 0.7, aLu: 30, aLf: -40, aRu: -30, aRf: 40, lashes: 0, ice: 0, pupX: 6 });
  N.mouth(0, "X");
  N.pose(0.62, 0.38, { y: 826 }, "back.out(1.7)");                      // ló lên cửa sổ
  N.pose(1.1, 0.3, { pupX: 10, pupY: -2 }, "power2.out");
  N.pose(2.0, 0.25, { pupX: 10, pupY: 5 }, "power2.out");               // liếc nhiệt kế
  N.idle(1.0, tMinus, { seed: 21, bien: 2 });
  // kim tụt → Wob trố mắt
  N.soc(t46 + 0.05, { mieng: "o", giuMat: true });
  N.mouth(tCel + 0.4, "wobbly");
  N.shiver(tCel + 0.3, tCel + 1.1, 2.5, 16);
  N.pose(t51 - 0.1, 0.12, { eye: 1.3 }, "back.out(3)"); N.pose(t51 + 0.3, 0.3, { eye: 1.1 }, "power2.out");
  N.idle(tCel + 1.2, 6.6, { seed: 22, bien: 1.6 });
  N.pose(6.75, 0.35, { y: 1000 }, "power2.in");                         // thụp xuống, đi ra cửa
  N.autoBlink(1.2, t46 - 0.3, 201);
  api.show("#N", 0, 1); api.show("#N", 7.2, 0);

  // ================= nhiệt kế =================
  api.origin("#th-merc", "0 0"); api.origin("#th-c", "85 300"); api.origin("#th-f", "85 350");
  api.set("#th-merc", 0, { scaleY: 0.66 });
  api.key("#th-merc", "scaleY", tMinus - 0.05, 0.66, "none"); api.key("#th-merc", "scaleY", t46 + 0.45, 0.1, "bounce.out");
  api.pop("#th-c", t46 + 0.12, 0.26);
  api.pop("#th-f", t51 - 0.06, 0.26);
  api.sfx("drop", tMinus + 0.02, 0.5);
  api.sfx("ting", t51, 0.45);

  // ================= cửa mở, Wob ra phố =================
  api.key("#nha-door", "scaleX", 0, 1); api.key("#nha-door", "scaleX", tStep - 0.3, 1, "none"); api.key("#nha-door", "scaleX", tStep - 0.08, 0.14, "power3.out");
  var x0 = 880, x1 = 1230;
  M.set(0, { x: x0, y: 900, size: 0.7, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, op: 0 });
  M.set(tStep - 0.12, { op: 1 });
  M.mouth(0, "smirk");
  M.walk(tStep - 0.05, tStep + 0.95, x0, x1, { step: 0.25, tieng: true });
  M.nhinQuanh(tLook - 0.05, { nhip: 0.36 });
  M.pose(tLook + 0.8, 0.2, { pupY: -3 }, "power2.out");
  // lông mi bật ra → đóng băng răng rắc
  M.pose(tLash - 0.02, 0.1, { lashes: 1.25 }, "back.out(3)"); M.pose(tLash + 0.08, 0.14, { lashes: 1 }, "power2.out");
  M.mouth(tLash, "o");
  M.pose(tFroze, 0.08, { ice: 1 }, "power2.out");
  M.pose(tFroze, 0.12, { eye: 1.18 }, "back.out(3)"); M.shiver(tFroze, tFroze + 0.32, 2.5, 18);
  M.mouth(tFroze + 0.12, "wobbly");
  api.origin("#bub", "0 0");
  api.pop("#bub", tFroze + 0.28, 0.22, tKnow - 0.12);
  api.sfx("pop", tLash, 0.75);
  api.sfx("tach-bang", tFroze, 0.6);
  api.sfx("liu-lo-soc", tFroze + 0.3, 0.55);
  // cận mặt: lác mắt cố nhìn lông mi, rồi thử chớp – mi đông cứng, mí kẹt nửa chừng
  M.lacMat(tKnow, null, { y: -15 });
  M.mouth(tKnow + 0.1, "flat");
  M.pose(tHad + 0.1, 0.18, { eye: 1.1 }, "back.out(2)");
  var tBlink = 12.9;
  M.pose(tBlink, 0.22, { lid: 30 }, "power2.in");
  M.shiver(tBlink + 0.22, tBlink + 0.5, 1.8, 20);
  M.pose(tBlink + 0.55, 0.12, { lid: 0 }, "back.out(2)");
  M.mouth(tBlink + 0.6, "wobbly");
  api.sfx("tach-bang", tBlink + 0.22, 0.28);
  M.idle(tFroze + 0.4, DUR, { seed: 31, bien: 1.4, tho: false });
  M.breathe(tStep + 1.0, DUR, 2.4);
  M.autoBlink(tStep + 1.0, tLash - 0.4, 301);
};
