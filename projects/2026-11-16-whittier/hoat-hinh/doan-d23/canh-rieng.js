/* Đoạn d23 · cắt giấy · ĐOẠN NGHIÊM (động đất 1964): bến cảng lúc chạng vạng, nước lặng, tông xám xanh.
   Không gag, không sfx, không rung, không vẽ sóng thần, không vẽ người, không đổ nát. Vào "giay", ra "giay".
   Trang phục: một áo mưa vàng mặc lại (lấy từ móc), mũ trùm HẠ xuống; ba lô ô liu có cuộn thảm đỏ, giày đỏ. Wob đứng xa, im lặng.
   Chữ: March 27, 1964 · 13 lives lost · ~70 trên trang sổ. Mặt Wob trầm (miệng thang/buon, mí cụp) suốt đoạn (mỗi số hiện riêng ≥ 2 s). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var C = data.chu_tren_do_vat;
  var GROUND = 830, SZ = 0.5;
  var W = WH.wob(api, "W", { ao: "ha" });

  var xa = WH.nui(-700, 3000, 640, 2301, { mau: "#5E6E7C", tuyet: "#C9D2D8", cao: [260, 420] });
  xa += WH.nui(-500, 3000, 660, 2302, { mau: "#4A5866", tuyet: false, cao: [120, 220], rong: [380, 620] });
  var mid = WH.nuoc("vinh", -900, 3000, 650, 500, { grad: "whNuocTram", seed: 2303, vet: 26 });
  // phản chiếu núi mờ trong nước lặng
  mid += '<g opacity="0.18" transform="translate(0,1300) scale(1,-1)">' + WH.nui(-700, 3000, 650, 2302, { mau: "#2E3A44", tuyet: false, cao: [120, 220], rong: [380, 620] }) + "</g>";
  mid += at(1850, 700, WH.tauNho("tau", 0.8));
  mid += at(-900, GROUND, WH.ben(2700, "#6B5E52"));
  for (var c = 0; c < 4; c++) mid += at(300 + c * 520, GROUND, D.paper(D.rRect(-14, -70, 28, 74, 1, 2304 + c), "#4E443B", { stroke: true, sw: 3 }));
  mid += W.svg;
  var gan = at(-200, 1120, D.paper(D.rRect(-40, -380, 80, 420, 1.4, 2310), "#3E3731", { stroke: true, sw: 4 })) +
    at(-200, 760, D.line("M 0 0 C 300 60 600 80 900 70", 6, "#5A5048"));

  // trang sổ (lớp phủ tĩnh, không theo camera)
  var trang = g("trang", at(150, 150, WH.toLich("tr", { w: 700, h: 760, seed: 2311 }) +
    g("c0", D.txt(350, 190, C[0], 68, { fill: "#2B3A44" })) +
    D.line("M 120 250 L 580 250", 3, "#2B3A44", ' opacity="0.35"') +
    g("c1", D.txt(350, 640, C[1], 130, { fill: "#2B3A44" })) +
    g("c2", D.txt(350, 430, C[2], 76, { fill: "#2B3A44" }))));

  api.dat('<rect width="1920" height="1080" fill="url(#whChang)"/>' + WH.defs() +
    api.lop("xa", xa, 0.35, { mat: 650 }) + api.lop("giua", mid, 1, { mat: GROUND }) + api.lop("gan", gan, 1.4, { mat: 1120 }) + trang);
  api.noi({ vaoDai: 0.6, raDai: 0.55 });

  var tMarch = T("march", 0, 1.91), tThir = T("thirteen", 0, 10.35), tSev = T("seventy", 0, 13.05), tWater = T("waterfront", 0, 14.85);
  var tToday = T("today", 0, 16.93), tPort = T("port", 0, 17.3), tStayed = T("stayed", 0, 20.95), tClever = T("clever.", 0, 23.35);

  // camera lùi rất chậm, không giật
  api.camera([[0, 1300, 600, 1.22], [tToday, 1250, 600, 1.1, "sine.inOut"], [DUR, 1200, 590, 1.0, "sine.inOut"]]);

  // trang sổ: trượt lên êm, chữ hiện nhẹ, rời đi trước "Today"
  api.key("#trang", "y", 0, 1100, "step"); api.key("#trang", "y", tMarch - 0.9, 1100, "none"); api.key("#trang", "y", tMarch - 0.1, 0, "power2.out");
  api.key("#trang", "opacity", 0, 1, "step"); api.key("#trang", "opacity", tToday - 0.8, 1, "none"); api.key("#trang", "opacity", tToday - 0.1, 0, "power1.inOut");
  api.show("#c0", 0, 0); api.fade("#c0", tMarch - 0.05, 0.4, 1);
  api.show("#c2", 0, 0); api.fade("#c2", tThir - 0.1, 0.4, 1);     // "13 lives lost"
  api.show("#c1", 0, 0); api.fade("#c1", tSev - 0.1, 0.4, 1);      // "~70"
  // đèn tàu sáng lên: cảng vẫn chạy
  api.show("#tau-den", 0, 0); api.fade("#tau-den", tPort - 0.2, 1.2, 1);
  api.key("#tau-ct", "fill", 0, "#55666B", "step"); api.key("#tau-ct", "fill", tPort - 0.2, "#55666B", "none"); api.key("#tau-ct", "fill", tPort + 0.8, "#FFD68A", "power1.inOut");
  WH.nhapNho(api, "#tau", 0, DUR, 3, 3.2, 0.4);

  // Wob nhỏ ở mép bến, nhìn ra nước, đứng yên (chỉ thở, chớp mắt chậm, liếc rất ít)
  // mặt trầm suốt đoạn: miệng thẳng, mí cụp nửa, mắt nhìn xuống (không nụ cười mặc định)
  W.set(0, { x: 1420, y: GROUND, size: SZ, lashes: 1, ice: 0, aLu: 14, aLf: -6, aRu: -14, aRf: 6, pupX: 12, pupY: 8, lean: 2, lid: 20 });
  W.mouth(0, "thang");
  W.breathe(0, DUR, 3.4);
  W.pose(tMarch + 0.6, 1.2, { pupX: -10, pupY: 6 }, "sine.inOut");      // nhìn về trang sổ
  W.pose(tThir + 1.2, 1.4, { lid: 30, pupY: 10, upY: 3 }, "sine.inOut");  // cúi mắt, thân trĩu xuống
  W.mouth(tThir + 1.2, "buon");
  W.pose(tWater, 1.4, { lid: 22, pupX: 12, pupY: 8, upY: 0 }, "sine.inOut"); // lại nhìn ra nước, vẫn trầm
  W.mouth(tWater + 0.6, "thang");
  W.pose(tPort, 1.0, { pupX: 14, pupY: 5, lid: 18 }, "sine.inOut");       // nhìn đèn tàu
  W.pose(tStayed, 1.6, { lean: 0, upY: 4, lid: 26, pupY: 9 }, "sine.inOut");
  W.pose(tClever + 0.8, 1.6, { upY: 2, lid: 22 }, "sine.inOut");
  W.blinkAt(4.5); W.blinkAt(8.6); W.blinkAt(15.6); W.blinkAt(19.2); W.blinkAt(22.4); W.blinkAt(25.3);
};
