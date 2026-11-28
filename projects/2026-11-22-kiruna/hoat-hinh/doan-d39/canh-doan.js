/* Đoạn d39 · cắt giấy · đoạn nghiêm, kể ở bàn kỷ vật (đồ ở nhà, không ba lô). Không gag, chỉ sfx lật trang.
   Trang sổ tông trầm: dãy nhà gỗ cũ; từng nhà được nhấc khỏi trang để lại khoảng trống, biển tên phố cũ (không chữ) đứng một mình ở "streets";
   Wob đặt bàn tay phẳng ở mép trang cạnh khoảng trống. Đường chân trời giấy: các khối nhà cao hạ dần tới chỉ còn đường thẳng, nhãn 2023 (lùi chậm).
   Một ô cửa sổ còn sáng đèn. Tờ kiến nghị dài nhiều dòng chữ ký nét mực (không đọc được) trên bàn gỗ, Wob đứng cạnh, tay chắp trước.
   Wob lật trang sang núi Luossavaara thấp và vệt đường mảnh sau núi; camera lặng lẽ vào trang. Vào "giay", ra "giay". Chữ: chỉ "2023". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tThey = T("they", 0, 2.412), tStreets = T("streets", 0, 4.562), tIn = T("in", 0, 6.85), tTw = T("twenty-three,", 0, 7.712), tTall = T("tall", 0, 8.487),
    tDown = T("down.", 0, 10.737), tNot = T("not", 1, 11.437), tIn2 = T("in", 1, 13.0), tPet = T("petition", 0, 16.35), tAnd = T("and", 1, 18.163);
  var B = KR.banTrang({ sd: 3901 }), P = B.P, TM = M.T;
  var NAU = ["#8E6A5A", "#7C7468", "#6E7C80", "#9A8466", "#7A6A70", "#857A62"];

  // ---------- trang 2 (dưới): núi Luossavaara thấp + vệt đường mảnh sau núi ----------
  var pg2 = '<g id="pg2">' + paper(rRect(P.x, P.y, P.w, P.h, 2.5, 3902), TM.trang, { stroke: true, sw: 5, shadow: false });
  pg2 += line("M 380 640 L 1720 640", 4, TM.nau, ' opacity="0.6"');
  pg2 += line("M 420 470 C 700 420 900 400 1100 430 C 1300 455 1500 470 1680 440", 5, TM.muc, ' stroke-dasharray="16 12" opacity="0.8"');
  pg2 += paper("M 640 640 C 760 500 880 440 1000 440 C 1120 440 1260 520 1380 640 Z", TM.xam, { stroke: true, sw: 4, shadow: false });
  for (var c2 = 0; c2 < 14; c2++) pg2 += at(420 + c2 * 95 + (c2 % 2) * 20, 640, KR.cayBachDuong(70 + (c2 % 3) * 16, 3903 + c2), 1);
  pg2 += "</g>";

  // ---------- trang 1 (trên): nhà cũ, biển phố, đường chân trời ----------
  var pg1 = '<g id="pg1">' + B.trang;
  // đường chân trời + khối nhà cao
  var SKY = 300, khoi = [];
  pg1 += line("M 360 " + SKY + " L 1740 " + SKY, 5, TM.muc, ' opacity="0.8"');
  [[1060, 100, 160], [1180, 120, 220], [1320, 96, 180], [1450, 116, 240], [1590, 104, 150]].forEach(function (k, i) {
    var w = k[1], h = k[2], id = "kh" + i, s = paper(rRect(-w / 2, -h, w, h, 1.2, 3910 + i), ["#8C8478", "#7E786E", "#958C80"][i % 3], { stroke: true, sw: 3.5, shadow: false });
    for (var r = 0; r < Math.floor(h / 40) - 1; r++) s += line("M " + f1(-w / 2 + 14) + " " + f1(-h + 26 + r * 40) + " L " + f1(w / 2 - 14) + " " + f1(-h + 26 + r * 40), 6, "#6A645C", ' stroke-dasharray="12 10"');
    pg1 += '<g id="' + id + '">' + at(k[0], SKY, s) + "</g>"; khoi.push({ id: id, x: k[0] });
  });
  pg1 += '<g id="t2023">' + at(640, 210, KR.the("t2023i", CH[0], 60, { seed: 3920, nen: "#F3EAD8" })) + "</g>";
  // dãy nhà gỗ cũ trên phố
  var PH = 650, nha = [];
  pg1 += line("M 360 " + PH + " L 1740 " + PH, 5, TM.muc, ' opacity="0.7"');
  [450, 680, 910, 1140, 1370, 1600].forEach(function (x, i) {
    pg1 += '<rect id="trong' + i + '" x="' + (x - 92) + '" y="' + (PH - 210) + '" width="184" height="210" fill="#EEE6D6" opacity="0"/>';
    pg1 += '<g id="nh' + i + '">' + at(x, PH, KR.nhaGo({ w: 170, h: 130, mau: NAU[i], mai: "#4A4036", cua: i === 2, den: false, sd: 3930 + i * 9 })) + "</g>";
    nha.push({ id: "nh" + i, x: x });
  });
  // ô cửa sổ sáng đèn ở nhà còn lại (nhà cuối)
  pg1 += '<g id="denCua" opacity="0">' + at(1600 + 170 * 0.27, PH - 130 * 0.72 + 20, '<rect x="-17" y="-20" width="34" height="40" fill="#FFD68A" stroke="' + INK + '" stroke-width="3"/><ellipse cx="0" cy="0" rx="70" ry="60" fill="url(#krDen)"/>') + "</g>";
  // biển tên phố cũ (KHÔNG chữ)
  pg1 += at(1025, PH, line("M 0 0 L 0 -170", 9) + line("M 0 0 L 0 -170", 4, "#8E9497") + paper(rRect(-66, -200, 132, 44, 1, 3940), "#5E7A8A", { stroke: true, sw: 4, shadow: false }) + '<rect x="-56" y="-192" width="112" height="28" rx="4" fill="none" stroke="#E4DACA" stroke-width="3"/>');
  pg1 += '<g id="pg1toi" opacity="0"><rect x="' + P.x + '" y="' + P.y + '" width="' + P.w + '" height="' + P.h + '" fill="#6A5A48" opacity="0.35"/></g>';
  pg1 += "</g>";

  // ---------- tờ kiến nghị trên bàn (chữ ký nét mực, KHÔNG đọc được) ----------
  var kn = paper(rRect(0, 0, 640, 250, 1.5, 3950), "#F6F0E2", { stroke: true, sw: 4, sx: 6, sy: 8 });
  var rr = D.rng(3951);
  for (var dong = 0; dong < 9; dong++) {
    var y = 30 + dong * 24, d = "M 30 " + y;
    for (var x = 30; x < 600; x += 22) d += " Q " + f1(x + 6) + " " + f1(y - 6 - rr() * 8) + " " + f1(x + 11) + " " + f1(y) + " T " + f1(x + 22) + " " + f1(y + rr() * 3 - 1.5);
    kn += line(d, 2.2, dong % 3 ? "#3A4A6A" : "#2E2A28", ' opacity="0.8"');
    kn += line("M 24 " + (y + 9) + " L 616 " + (y + 9), 1, "#C9BFA8");
  }
  var kienNghi = '<g id="kn"><g transform="rotate(-4)">' + kn + "</g></g>";

  var W = KR.wob(api, "W", { mua: "nha" });
  api.dat(KR.defs() + api.lop("ban", B.nen + KR.mocAo() + pg2 + pg1 + kienNghi + W.svg + B.den, 1, { mat: 1010 }));
  api.noi({});
  api.show("#pg1", 0, 1);

  // ---------- camera ----------
  api.camera([[0, 1000, 540, 1.0], [tThey, 990, 548, 1.03, "sine.inOut"], [tIn - 0.1, 980, 560, 1.12, "sine.inOut"], [tNot - 0.1, 1000, 540, 1.0, "sine.inOut"],
    [tNot + 0.8, 1360, 600, 1.22, "power2.inOut"], [tIn2 + 0.3, 1340, 620, 1.2, "sine.inOut"], [tIn2 + 1.6, 1200, 760, 1.18, "power2.inOut"], [tAnd - 0.3, 1190, 760, 1.22, "sine.inOut"],
    [tAnd + 0.4, 1000, 560, 1.0, "power2.inOut"], [tAnd + 1.2, 1000, 556, 1.0, "none"], [DUR, 1000, 500, 1.5, "power2.in"]]);

  // ---------- Wob ----------
  var WX = 230, WY = 1010;
  W.set(0, { x: WX, y: WY, size: 0.6, pupX: 12, pupY: -14 });
  W.mouth(0, "thang");
  W.idle(0.3, tThey + 0.4, { seed: 391, bien: 1.0 });
  // nhà nhấc khỏi trang, để lại khoảng trống (trừ nhà cuối)
  nha.slice(0, 5).forEach(function (h, i) {
    var t0 = tThey + 0.25 + i * 0.42, sel = "#" + h.id;
    api.origin(sel, h.x + " " + PH);
    api.key(sel, "y", 0, 0); api.key(sel, "y", t0, 0, "none"); api.key(sel, "y", t0 + 0.25, -24, "power2.out"); api.key(sel, "y", t0 + 0.9, -420, "power2.in");
    api.key(sel, "opacity", 0, 1); api.key(sel, "opacity", t0 + 0.4, 1, "none"); api.key(sel, "opacity", t0 + 0.9, 0, "power1.in");
    api.key(sel, "rotation", 0, 0); api.key(sel, "rotation", t0 + 0.25, 0, "none"); api.key(sel, "rotation", t0 + 0.9, i % 2 ? 4 : -4, "sine.in");
    api.key("#trong" + i, "opacity", 0, 0); api.key("#trong" + i, "opacity", t0 + 0.3, 0, "none"); api.key("#trong" + i, "opacity", t0 + 0.7, 0.9, "sine.out");
  });
  W.pose(tThey + 0.3, 0.4, { pupX: 14, pupY: -20, upRot: -2 }, "sine.inOut");
  W.pose(tThey + 1.4, 1.6, { pupX: 16, pupY: -16 }, "sine.inOut");
  // bàn tay phẳng ở mép trang cạnh khoảng trống, đứng yên
  W.pose(tStreets - 0.1, 0.5, { aRu: -120, aRf: 40, pupX: 10, pupY: -10, upRot: 0 }, "sine.inOut");
  W.mouth(tStreets + 0.3, "buon");
  // đường chân trời: các khối cao hạ dần còn đường thẳng; nhãn 2023
  api.origin("#t2023", "640 210");
  api.pop("#t2023", tTw - 0.1, 0.28, tNot - 0.4);
  khoi.forEach(function (k, i) {
    var t0 = tTall + i * 0.42;
    api.origin("#" + k.id, k.x + " " + SKY);
    api.key("#" + k.id, "scaleY", 0, 1); api.key("#" + k.id, "scaleY", t0, 1, "none"); api.key("#" + k.id, "scaleY", t0 + 0.6, 0.02, "power1.inOut");
  });
  W.pose(tIn + 0.2, 0.6, { aRu: -18, aRf: 10, pupX: 14, pupY: -26, upRot: -3 }, "sine.inOut");
  W.pose(tTall + 0.4, 2.2, { pupX: 18, pupY: -24 }, "sine.inOut");
  // ô cửa sáng đèn
  api.key("#denCua", "opacity", 0, 0); api.key("#denCua", "opacity", tNot - 0.05, 0, "none"); api.key("#denCua", "opacity", tNot + 0.5, 1, "sine.out");
  W.pose(tNot, 0.5, { pupX: 18, pupY: -18, upRot: 0, lid: 8 }, "sine.inOut");
  W.mouth(tNot + 0.4, "thang");
  // tờ kiến nghị trải trên bàn; Wob đi tới cạnh, tay chắp trước
  api.origin("#kn", "0 0");
  api.key("#kn", "x", 0, 2100); api.key("#kn", "y", 0, 830); api.key("#kn", "x", tIn2 - 0.1, 2100, "none"); api.key("#kn", "x", tIn2 + 0.6, 1140, "power2.out");
  W.walk(tNot + 0.1, tNot + 1.3, WX, 990, { step: 0.34 });
  W.pose(tNot + 1.35, 0.4, { pupX: 18, pupY: -22, upRot: -2, lid: 8 }, "sine.inOut");
  W.pose(tIn2 + 1.5, 0.4, { aRu: 26, aRf: 34, aLu: -26, aLf: -34, pupX: 16, pupY: 10, lid: 12 }, "sine.inOut");
  W.mouth(tIn2 + 1.6, "buon");
  W.idle(tIn2 + 1.9, tAnd - 0.2, { seed: 392, bien: 0.8 });
  W.pose(tPet, 0.6, { pupX: 18, pupY: 14 }, "sine.inOut");
  // lật trang
  W.pose(tAnd - 0.1, 0.3, { aRu: -150, aRf: 20, aLu: 18, aLf: -10, pupX: 8, pupY: -16, lid: 0 }, "power2.out");
  var tLat = tAnd + 0.25;
  api.origin("#pg1", P.x + " 0");
  api.key("#pg1", "scaleX", 0, 1); api.key("#pg1", "scaleX", tLat, 1, "none"); api.key("#pg1", "scaleX", tLat + 0.55, 0.001, "power2.in");
  api.key("#pg1toi", "opacity", 0, 0); api.key("#pg1toi", "opacity", tLat, 0, "none"); api.key("#pg1toi", "opacity", tLat + 0.5, 1, "none");
  api.show("#pg1", tLat + 0.56, 0);
  api.sfx("lat-giay", tLat, 0.45);
  W.pose(tLat + 0.5, 0.4, { aRu: -18, aRf: 10, pupX: 4, pupY: -22 }, "sine.inOut");
  W.mouth(tLat + 0.6, "thang");
  W.autoBlink(0.4, DUR, 3901);
};
