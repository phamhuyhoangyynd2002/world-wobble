/* Đoạn d40 · cắt giấy · đoạn nghiêm, kể ở bàn kỷ vật (đồ ở nhà). Không gag, không sfx.
   Trang sổ tông trầm, trời xám nhạt, tuyết mỏng: núi Luossavaara thấp (nhãn), rừng bạch dương lùn; vệt đường nét đứt sau núi vẽ dần ở "reindeer route.".
   Đàn tuần lộc giấy đi hàng dọc theo vệt đường, người chăn dạng chung đội mũ len (KHÔNG mặt) đi cạnh; các lớp rừng trôi chậm; đầu Wob quay theo đàn.
   Lướt sang hồ: vệt đường cũ dọc hồ bị dải nhà và cửa hầm chắn ngang, nét đứt dừng ở "cut off"; Wob lần ngón tay theo nét đứt cũ tới chỗ dừng, nhấc tay.
   Wob đứng trên mặt bàn ngoài mép trang. Vào "giay", ra "cat". Chữ: chỉ "Luossavaara". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tMount = T("mountain", 0, 2.24), tRein = T("reindeer", 0, 4.32), tRoute = T("route.", 0, 4.56), tGabna = T("gabna,", 0, 4.88), tHerds = T("herds", 0, 8.94),
    tTheir = T("their", 0, 12.32), tLake = T("lake", 0, 13.28), tCut = T("cut", 0, 13.64), tOff = T("off", 0, 13.86);
  var B = KR.banTrang({ sd: 4001 }), P = B.P, TM = M.T;

  // ---------- nội dung trang (trong khung trang, cắt theo trang) ----------
  var HY = 560;   // chân núi / mặt tuyết
  // đàn tuần lộc + người chăn đội mũ len (KHÔNG mặt)
  var dan = '<g id="dan">';
  for (var r = 0; r < 6; r++) dan += '<g id="tl' + r + '">' + at(-r * 120, 0, D.reindeer("tln" + r, { mau: ["#8A6A4E", "#7A5E46", "#9A7A5C"][r % 3], seed: 4080 + r }), 0.26) + "</g>";
  dan += '<g id="ngc">' + at(-90, 20, KR.nguoi("ngch", { ao: "#5A5048", mu: "#4F5E6E", da: M.da2 }), 0.32) + "</g>";
  dan += "</g>";
  var tr = '<clipPath id="d40trang"><rect x="' + (P.x + 4) + '" y="' + (P.y + 4) + '" width="' + (P.w - 8) + '" height="' + (P.h - 8) + '"/></clipPath>';
  tr += '<g clip-path="url(#d40trang)">';
  tr += '<rect x="' + P.x + '" y="' + P.y + '" width="' + P.w + '" height="' + (HY - P.y) + '" fill="#D9D6CE"/>';
  tr += '<rect x="' + P.x + '" y="' + HY + '" width="' + P.w + '" height="' + (P.y + P.h - HY) + '" fill="#EEEDE8"/>';
  tr += dan;
  // núi Luossavaara thấp
  tr += paper("M 520 " + HY + " C 640 430 760 370 880 366 C 1000 362 1120 420 1260 " + HY + " Z", "#9C968C", { stroke: true, sw: 4, shadow: false });
  tr += '<path d="M 760 392 C 820 372 940 368 1010 384" fill="none" stroke="#F4F4F0" stroke-width="10" stroke-linecap="round"/>';
  // vệt đường nét đứt sau núi (vẽ dần): đi từ trái, vòng sau núi, xuống phải
  var dMoi = "M 360 420 C 520 330 760 300 900 300 C 1080 300 1260 330 1380 420 C 1460 480 1560 520 1740 540";
  tr += '<clipPath id="d40ve"><rect id="veRect" x="300" y="200" width="1500" height="500"/></clipPath>';
  tr += '<g clip-path="url(#d40ve)"><path d="' + dMoi + '" fill="none" stroke="' + TM.muc + '" stroke-width="6" stroke-dasharray="18 12" opacity="0.85"/></g>';
  // rừng bạch dương lùn (hai lớp trôi chậm)
  var rung1 = "", rung2 = "";
  for (var i = 0; i < 22; i++) rung1 += at(260 + i * 78, HY + 8, KR.cayBachDuong(52 + (i % 3) * 10, 4010 + i), 1);
  for (var j = 0; j < 18; j++) rung2 += at(300 + j * 96 + 40, HY + 120, KR.cayBachDuong(76 + (j % 2) * 14, 4040 + j), 1);
  tr += '<g id="rung1">' + rung1 + "</g>";
  // hồ và lối cũ dọc hồ (gần mép dưới trang để Wob với tới)
  tr += paper(D.rough([[1180, 700], [1300, 640], [1520, 630], [1700, 660], [1760, 740], [1640, 790], [1360, 800], [1220, 770]], 6, 4060, 30), "#8FB0B8", { stroke: true, sw: 4, shadow: false });
  var dCu = "M 1080 858 C 1200 852 1320 850 1440 852";
  tr += '<clipPath id="d40cu"><rect id="cuRect" x="1000" y="800" width="460" height="100"/></clipPath>';
  tr += '<g clip-path="url(#d40cu)"><path d="' + dCu + ' L 1600 852" fill="none" stroke="' + TM.muc + '" stroke-width="6" stroke-dasharray="18 12" opacity="0.85"/></g>';
  // dải nhà + cửa hầm chắn ngang lối cũ
  var chan = "";
  for (var k = 0; k < 4; k++) chan += at(1500 + k * 70, 870, KR.nhaGo({ w: 60, h: 46, mau: ["#8C8478", "#7E786E", "#958C80", "#857A62"][k], mai: "#4A4036", sd: 4070 + k }));
  chan += paper("M 1470 878 L 1470 812 C 1470 790 1500 780 1520 790", "#6E6A64", { stroke: true, sw: 4, shadow: false });
  chan += paper("M 1440 880 L 1440 810 C 1440 770 1500 760 1500 760 L 1500 880 Z", "#5E5A54", { stroke: true, sw: 4, shadow: false });
  tr += '<g id="chan">' + chan + "</g>";
  tr += '<g id="rung2">' + rung2 + "</g>";
  tr += "</g>";
  tr += '<g id="nhanL">' + at(890, 205, KR.the("nhanLi", CH[0], 50, { seed: 4090, nen: "#F3EAD8" })) + "</g>";

  var W = KR.wob(api, "W", { mua: "nha" });
  api.dat(KR.defs() + api.lop("ban", B.nen + KR.mocAo() + B.trang + tr + W.svg + B.den, 1, { mat: 1010 }));
  api.noi({});

  // ---------- camera ----------
  api.camera([[0, 1000, 540, 1.0], [tRein - 0.4, 980, 520, 1.06, "sine.inOut"], [tTheir - 0.05, 1010, 520, 1.1, "sine.inOut"], [tTheir + 1.15, 1350, 720, 1.42, "power2.inOut"], [DUR, 1356, 726, 1.46, "sine.inOut"]]);

  // ---------- nhãn, đường vẽ dần ----------
  api.origin("#nhanL", "890 205");
  api.pop("#nhanL", tMount + 0.1, 0.28);
  api.origin("#veRect", "300 0");
  api.key("#veRect", "scaleX", 0, 0.001); api.key("#veRect", "scaleX", tRein - 0.1, 0.001, "none"); api.key("#veRect", "scaleX", tRoute + 0.35, 1, "power1.inOut");
  // ---------- đàn đi hàng dọc theo vệt đường (theo đường cong sau núi) ----------
  var duong = api.duong([[300, 470], [520, 380], [760, 350], [900, 350], [1080, 350], [1260, 380], [1380, 470], [1560, 570], [1800, 590]]);
  var t0 = tGabna + 0.1, t1 = tTheir + 0.3;
  for (var n = 0; n < 7; n++) {
    var sel = n < 6 ? "#tl" + n : "#ngc", lag = n < 6 ? n * 0.11 : 0.36;
    api.origin(sel, "0 0");
    for (var s = 0; s <= 20; s++) {
      var u = Math.max(0, Math.min(1, s / 20 - lag)), tt = t0 + (t1 - t0) * (s / 20), p = duong.at(0.05 + u * 0.6);
      api.key(sel, "x", tt, p.x + (n < 6 ? n * 120 : 90), s ? "none" : undefined); api.key(sel, "y", tt, p.y + (n < 6 ? 0 : 30) + (s % 2 ? -3 : 0), s ? "none" : undefined);
    }
  }
  api.show("#dan", 0, 0); api.show("#dan", t0, 1);
  // lớp rừng trôi chậm (thị sai trong trang)
  api.key("#rung1", "x", 0, 0); api.key("#rung1", "x", t0, 0, "none"); api.key("#rung1", "x", t1, -40, "none");
  api.key("#rung2", "x", 0, 0); api.key("#rung2", "x", t0, 0, "none"); api.key("#rung2", "x", t1, -110, "none");
  // ---------- lối cũ bị cắt ở "cut off" ----------
  api.origin("#cuRect", "1000 0");
  api.key("#cuRect", "scaleX", 0, 1); api.key("#cuRect", "scaleX", tLake, 1, "none"); api.key("#cuRect", "scaleX", tOff, 440 / 460, "none");
  api.origin("#chan", "1600 880");
  api.key("#chan", "scaleY", 0, 1); api.key("#chan", "scaleY", tCut - 0.3, 1, "none"); api.key("#chan", "scaleY", tCut - 0.12, 1.08, "power2.out"); api.key("#chan", "scaleY", tCut + 0.05, 1, "power2.in");

  // ---------- Wob ----------
  var WX = 220, WY = 1010;
  W.set(0, { x: WX, y: WY, size: 0.6, pupX: 12, pupY: -16 });
  W.mouth(0, "thang");
  W.idle(0.4, tTheir - 0.6, { seed: 401, bien: 1.0 });
  W.pose(tMount, 0.5, { pupX: 16, pupY: -22, upRot: -2 }, "sine.inOut");
  // đầu quay theo đàn
  W.pose(t0 + 0.2, 0.5, { pupX: 4, pupY: -22, upRot: -3 }, "sine.inOut");
  W.pose(t0 + 2.4, 2.0, { pupX: 14, pupY: -20, upRot: 0 }, "sine.inOut");
  W.pose(t0 + 5.0, 2.0, { pupX: 18, pupY: -14, upRot: 2 }, "sine.inOut");
  // đi sang phải dưới lối cũ, lần ngón tay theo nét đứt tới chỗ dừng, nhấc tay
  var WX2 = 990;
  W.walk(tTheir - 0.45, tTheir + 0.55, WX, WX2, { step: 0.3 });
  W.pose(tTheir + 0.6, 0.25, { aRu: 176, aRf: 60, pupX: 16, pupY: -16, upRot: 0 }, "power2.out");
  W.walk(tTheir + 0.9, tOff + 0.05, WX2, 1350, { step: 0.32, arms: false });
  W.pose(tOff + 0.3, 0.3, { aRu: -170, aRf: 20, pupX: 16, pupY: -20 }, "power2.out");
  W.pose(tOff + 0.75, 0.5, { aRu: -18, aRf: 10, pupX: 18, pupY: -14 }, "sine.inOut");
  W.mouth(tOff + 0.3, "buon");
  W.idle(tOff + 1.0, DUR, { seed: 402, bien: 0.7 });
  W.autoBlink(0.4, DUR, 4001);
};
