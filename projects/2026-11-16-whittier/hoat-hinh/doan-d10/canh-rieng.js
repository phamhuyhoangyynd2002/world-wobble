/* Đoạn d10 · cắt giấy · mặt cắt hai ngọn núi, đường sắt quân đội đào xuyên núi, rồi bến cảng thập niên 40. Vào "chen", ra "giay".
   Người que đội mũ thợ là nhân vật chung, không vẽ mặt người thật; không chân dung. Chữ: April 23, 1943 · ANTON ANDERSON · 1,000+ */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, CH = data.chu_tren_do_vat, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var MAT = 900, RAY = 868;
  var W = WT.wob(api, "W", { holdR: g("W-xeng", '<g transform="rotate(150)">' + WT.shovel() + "</g>"), phuKien: g("W-kinh", WT.sunglassesFace()) });
  var V = WT.wob(api, "V", { holdR: g("V-kg", '<g transform="translate(0,10)">' + WT.sunglassesFold() + "</g>"), phuKien: g("V-kinh", WT.sunglassesFace()) });
  var NUI1 = "#B08A63", NUI2 = "#9C7A58", LONG = "#3A3029";
  var troi = WT.defs() + '<rect width="1920" height="1080" fill="url(#wtSang)"/>';
  var xa = WT.nuiXa(-900, 6000, 720, 11, "#A9B6BC", 300);
  var mid = "";
  mid += D.paper(D.rough([[-900, MAT], [6000, MAT], [6000, 1700], [-900, 1700]], 3, 1001, 30), "#CDB89A", { shadow: false });
  mid += '<rect x="-900" y="' + (MAT + 40) + '" width="6900" height="800" fill="url(#half)" opacity="0.08"/>';
  // núi 1 (x 300..1300), núi 2 dài hơn (x 1500..3300) – mặt cắt
  mid += D.paper(D.rough([[280, MAT], [520, 640], [800, 380], [1060, 600], [1320, MAT]], 4, 1002, 22), NUI1, { stroke: true, sw: 5, half: 0.12 });
  mid += D.paper(D.rough([[1480, MAT], [1800, 560], [2200, 300], [2700, 420], [3050, 600], [3320, MAT]], 4, 1003, 24), NUI2, { stroke: true, sw: 5, half: 0.12 });
  mid += D.paper(D.rough([[730, 450], [800, 380], [876, 452], [800, 430]], 2, 1004, 12), "#F6EEDC", { shadow: false });
  mid += D.paper(D.rough([[2100, 390], [2200, 300], [2330, 340], [2210, 360]], 2, 1005, 12), "#F6EEDC", { shadow: false });
  // lòng hầm 1 đang đào (mọc dần), hầm 2 có sẵn
  mid += g("bore1", '<rect x="400" y="' + (RAY - 150) + '" width="800" height="150" rx="40" fill="' + LONG + '" stroke="' + INK + '" stroke-width="4"/>');
  mid += '<rect x="1570" y="' + (RAY - 150) + '" width="1540" height="150" rx="40" fill="' + LONG + '" stroke="' + INK + '" stroke-width="4"/>';
  // đường Wob tự đào vòng về chỗ cũ
  var PW = api.duong([[350, 820], [520, 818], [660, 800], [700, 720], [620, 650], [500, 660], [430, 720], [380, 790]]);
  mid += '<path id="wDao" d="' + PW.den(0) + '" fill="none" stroke="' + LONG + '" stroke-width="112" stroke-linecap="round" stroke-linejoin="round"/>';
  // đường ray
  mid += D.line("M -900 " + RAY + " L 6000 " + RAY, 8, "#5A4A40");
  for (var x = -880; x < 6000; x += 44) mid += D.line("M " + x + " " + (RAY + 2) + " L " + (x + 18) + " " + (RAY + 14), 6, "#7A5236");
  // thợ đội mũ (người que chung) ở mặt đào
  for (var i = 0; i < 3; i++) mid += g("tho" + i, WT.nguoiQue("th" + i, { mau: "#5C4A3E", mu: "tho", huong: 1 }), "translate(" + (520 + i * 70) + "," + RAY + ") scale(0.85)");
  // cổng hầm dài (núi 2) + biển tên
  mid += D.paper('M 1480 ' + RAY + ' L 1480 690 C 1480 640 1530 620 1580 620 L 1600 620 L 1600 ' + RAY + ' Z', WT.BETONG, { stroke: true, sw: 4 });
  mid += at(1560, 600, g("bienAA", D.signBoard("aa", { w: 600, h: 96, cao: 0, chu: CH[1], co: 52 })));
  // biển gỗ ngày hoàn thành (giữa hai núi)
  mid += at(1395, MAT, g("bienNgay", D.signBoard("ng", { w: 440, h: 100, cao: 150, chu: CH[0], co: 46 })));
  // đoàn tàu nhỏ
  mid += g("tau", '<g transform="translate(0,' + (RAY - 6) + ')">' + trainSide() + "</g>");
  // bến cảng (x 3400..4900)
  mid += D.paper(D.rough([[3420, MAT + 6], [5800, MAT + 6], [5800, 1700], [3420, 1700]], 3, 1006, 30), "#5E8C96", { stroke: true, sw: 4, shadow: false });
  mid += D.paper(D.rRect(3380, MAT - 20, 900, 40, 1.5, 1007), "#7A5236", { stroke: true, sw: 4 });
  for (var p = 3400; p < 4280; p += 80) mid += D.line("M " + p + " " + (MAT + 20) + " L " + p + " " + (MAT + 120), 10, "#553521");
  mid += at(4720, MAT + 30, shipSide());
  mid += at(3700, MAT - 20, D.paper(D.rRect(-150, -170, 300, 170, 2, 1008), "#8E7A62", { stroke: true, sw: 4, half: 0.12 }) + D.paper("M -170 -170 L 0 -240 L 170 -170 Z", "#6B5444", { stroke: true, sw: 4 }));
  mid += at(4080, MAT - 20, D.paper(D.rRect(-110, -130, 220, 130, 2, 1009), "#9C8462", { stroke: true, sw: 4, half: 0.12 }) + D.paper("M -126 -130 L 0 -186 L 126 -130 Z", "#6B5444", { stroke: true, sw: 4 }));
  var NQ = [];
  for (var q = 0; q < 26; q++) {
    var qx = 3460 + (q * 137) % 860, qy = MAT - 20 - (q % 3) * 6;
    NQ.push("hq" + q);
    mid += g("hq" + q, WT.nguoiQue("hqq" + q, { mau: ["#5C4A3E", "#4E5A48", "#6B5444", "#3F4A52"][q % 4], huong: q % 2 ? 1 : -1, mu: q % 5 === 0 ? "tho" : null }), "translate(" + qx + "," + qy + ") scale(0.62)");
  }
  mid += at(4000, 560, g("tag1000", WT.tag("t1k", CH[2], 260, 100, 60, { seed: 1011 })));
  // hạt đá rơi từ vách
  mid += g("soi", at(3150, 772, D.paper(D.rEll(0, 0, 10, 8, 1, 1012), "#6F6A66", { stroke: true, sw: 3 })));
  mid += W.svg + V.svg;
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 720 }) + api.lop("giua", mid, 1, { mat: MAT }));
  api.noi({});

  function trainSide() {
    var s = "";
    for (var k = 0; k < 4; k++) s += D.paper(D.rRect(-120 - k * 130, -78, 120, 70, 2, 1020 + k), k === 0 ? "#3F6A70" : "#5E7F8C", { stroke: true, sw: 4 }) +
      '<circle cx="' + (-96 - k * 130) + '" cy="-6" r="14" fill="#2a2f31" stroke="' + INK + '" stroke-width="3"/><circle cx="' + (-24 - k * 130) + '" cy="-6" r="14" fill="#2a2f31" stroke="' + INK + '" stroke-width="3"/>';
    s += D.paper("M 0 -78 L 30 -60 L 30 -10 L 0 -10 Z", "#2B3033", { stroke: true, sw: 4, shadow: false });
    return s;
  }
  function shipSide() {
    var s = D.paper("M -330 0 L -300 -110 L 320 -110 L 360 -60 L 330 0 Z", "#5A6266", { stroke: true, sw: 5, half: 0.12 });
    s += D.paper(D.rRect(-120, -200, 220, 90, 2, 1031), "#D9D2C2", { stroke: true, sw: 4 }) + D.paper(D.rRect(-40, -270, 50, 70, 1.5, 1032), "#8E2C24", { stroke: true, sw: 4 });
    for (var k = 0; k < 4; k++) s += '<circle cx="' + (-90 + k * 50) + '" cy="-156" r="12" fill="#2A2F31"/>';
    return s;
  }

  var d0 = 0.5, d1 = 4.6;
  var tTo = T("to", 0, 0.15), tArmy = T("army", 0, 2.62), tRail = T("railway", 0, 3.27), tFin = T("finished", 0, 5.25), tApril = T("april", 0, 5.91), t43 = T("forty-three", 0, 7.64);
  var tLonger = T("longer", 0, 8.72), tAnton = T("anton", 0, 10.44), tBy = T("by", 0, 13.57), tThousand = T("thousand", 0, 15.44), tLived = T("lived", 0, 17.12);
  var tSun = T("sunglasses", 0, 18.43), tAway = T("away", 0, 19.01), tForgave = T("forgave", 0, 20.16), tCar = T("car", 0, 22.38);

  // ---- camera: núi 1 → lia theo tàu sang cổng hầm dài → bến cảng → Wob ----
  api.camera([
    [0, 520, 760, 2.1], [2.2, 560, 750, 2.0, "sine.inOut"], [d1 + 1.4, 560, 750, 1.95, "sine.inOut"], [tFin - 0.6, 900, 640, 1.12, "power2.inOut"],
    [tLonger - 0.4, 1100, 650, 1.12, "sine.inOut"], [tLonger + 0.6, 1560, 640, 1.25, "power2.inOut"], [tBy - 1.2, 1700, 640, 1.2, "sine.inOut"],
    [tBy + 0.2, 4000, 640, 1.0, "power3.inOut"], [tLived, 3950, 650, 1.02, "sine.inOut"], [tSun - 0.2, 3420, 720, 1.4, "power2.inOut"], [DUR, 3390, 720, 1.46, "sine.inOut"]
  ]);

  // ---- lòng hầm 1 mọc dần; thợ đào nhún ----
  api.origin("#bore1", "400 800");
  api.key("#bore1", "scaleX", 0, 0.22); api.key("#bore1", "scaleX", t43, 1, "power1.inOut");
  for (var h = 0; h < 3; h++) {
    var sel = "#tho" + h;
    api.key(sel, "x", 0, 520 + h * 70); api.key(sel, "x", t43, 1000 + h * 70, "power1.inOut");
    api.key(sel, "y", 0, RAY);
    for (var tb = 0.2 + h * 0.13; tb < t43; tb += 0.5) { api.key(sel, "y", tb, RAY - 10, "sine.out"); api.key(sel, "y", tb + 0.25, RAY, "sine.in"); }
    api.key(sel, "opacity", 0, 1); api.key(sel, "opacity", t43 + 0.4, 1, "none"); api.key(sel, "opacity", t43 + 0.7, 0, "power2.in");
  }

  // ---- Wob đào ngược hướng, chui ra đúng chỗ vừa vào ----
  W.set(0, { x: 350, y: 868, size: 0.4, lashes: 1, ice: 0, aRu: -100, aRf: -30, aLu: -40, aLf: -30, pupX: 8, hat: 10, op: 1 });
  W.mouth(0, "grin");
  var digOrder = [];
  api.moiKhung(function (t) {
    if (typeof document === "undefined") return;
    var e = document.getElementById("wDao"); if (!e) return;
    var u = Math.max(0, Math.min(1, (t - d0) / (d1 - d0)));
    e.setAttribute("d", PW.den(Math.max(0.001, u)));
  }, { twos: true });
  // Wob đi theo đường đào (khoá x/y mỗi 0.25 s)
  for (var td = d0; td <= d1 + 1e-6; td += 0.25) {
    var u = (td - d0) / (d1 - d0), pp = PW.at(u);
    W.pose(td, 0.25, { x: pp.x, y: pp.y + 60 }, "none");
    digOrder.push(td);
  }
  // nhịp xúc
  for (var tx = d0; tx < d1; tx += 0.36) { W.pose(tx, 0.12, { aRu: -130, aRf: -60 }, "power2.out"); W.pose(tx + 0.18, 0.14, { aRu: -90, aRf: -10 }, "power2.in"); }
  api.sfx("xuoc-dia", 1.0, 0.25); api.sfx("xuoc-dia", 2.6, 0.25);
  // ló ra, nhìn quanh: đúng chỗ cũ
  W.pose(d1 + 0.05, 0.25, { x: 360, y: 868, aRu: -40, aRf: 10 }, "back.out(1.6)");
  W.mouth(d1 + 0.2, "o");
  W.nhinQuanh(d1 + 0.4, { nhip: 0.4 });
  W.mouth(d1 + 1.6, "flat");
  W.idle(d1 + 1.6, 12.5, { seed: 101, bien: 1.6 });
  W.pose(tApril + 0.1, 0.3, { pupX: 12, pupY: -4 }, "power2.out");
  api.sfx("pop", d1 + 0.05, 0.4);
  // tàu chạy qua sau khi xong (lia theo tàu)
  api.origin("#tau", "0 0");
  api.key("#tau", "x", 0, -700); api.key("#tau", "x", t43 - 0.2, -700, "none"); api.key("#tau", "x", tBy + 0.4, 3600, "power1.inOut");
  api.key("#tau", "opacity", 0, 1); api.key("#tau", "opacity", tBy + 0.4, 1, "none"); api.key("#tau", "opacity", tBy + 0.6, 0, "none");
  // biển
  api.origin("#bienNgay", "0 0"); api.origin("#bienAA", "0 0");
  api.key("#bienNgay", "scaleY", 0, 0); api.key("#bienNgay", "scaleY", tApril - 0.1, 0, "none"); api.key("#bienNgay", "scaleY", tApril + 0.2, 1, "back.out(2)");
  api.key("#bienAA", "scaleY", 0, 0); api.key("#bienAA", "scaleY", T("named", 0, 9.68) - 0.15, 0, "none"); api.key("#bienAA", "scaleY", T("named", 0, 9.68) + 0.2, 1, "back.out(2)");
  api.sfx("bonk", tApril + 0.1, 0.35); api.key("#bienNgay", "opacity", 0, 1); api.key("#bienNgay", "opacity", tLonger, 1, "none"); api.key("#bienNgay", "opacity", tLonger + 0.4, 0, "power2.in"); api.sfx("bonk", tAnton + 0.1, 0.35);

  // ---- bến cảng đầy dần người que ----
  NQ.forEach(function (id, k) {
    var tq = tBy + 0.3 + k * 0.13;
    api.key("#" + id, "opacity", 0, 0, "step"); api.key("#" + id, "opacity", tq, 0, "none"); api.key("#" + id, "opacity", tq + 0.15, 1, "power2.out");
    WT.buocQue(api, "hqq" + k, tq, tq + 1.5 + (k % 4) * 0.4, 0.5);
  });
  api.origin("#tag1000", "0 0"); api.pop("#tag1000", tThousand, 0.3);
  api.sfx("ting", tThousand, 0.4);

  // ---- Wob ở bến, cất kính râm, vỗ vách hầm ----
  api.show("#W", 0, 1); api.show("#W", 12.4, 0);
  V.set(0, { x: 3335, y: 905, size: 0.7, lashes: 1, ice: 0, hat: 8, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 8, op: 1 });
  V.mouth(0, "smirk");
  api.show("#V-kg", 0, 0);
  V.idle(tBy, tSun, { seed: 102, bien: 1.6 });
  V.pose(tBy + 1.0, 0.4, { pupX: 12, pupY: 2 }, "sine.inOut");
  V.pose(tThousand + 0.2, 0.3, { pupX: 10, pupY: -8 }, "power2.out");
  // tháo kính, gấp, bỏ vào ba lô
  V.pose(tSun - 0.1, 0.25, { aRu: -150, aRf: -40 }, "power2.out");
  api.show("#V-kinh", 0, 1); api.show("#V-kinh", tSun + 0.15, 0);
  api.show("#V-kg", tSun + 0.15, 1);
  V.pose(tSun + 0.2, 0.3, { aRu: -120, aRf: -60, pupX: 6, pupY: 4 }, "power2.inOut");
  V.pose(tAway - 0.05, 0.3, { aRu: -170, aRf: 40, pupX: 12, pupY: -4 }, "power2.inOut");   // với ra sau lưng
  api.show("#V-kg", tAway + 0.3, 0);
  api.sfx("pop", tAway + 0.3, 0.3);
  V.pose(tAway + 0.35, 0.3, { aRu: -18, aRf: 10 }, "power2.inOut");
  V.blinkAt(tAway + 0.5);
  V.mouth(tAway + 0.4, "flat");
  // vỗ vách hầm như vỗ vai bạn
  V.pose(tForgave - 0.3, 0.3, { pupX: -12, pupY: -2, lean: -4 }, "power2.out");
  V.mouth(tForgave, "smirk");
  var taps = V.go(tForgave + 0.1, 2, "L");
  api.sfx("bonk", taps && taps[0] != null ? taps[0] : tForgave + 0.3, 0.25);
  var tSoi = tForgave + 1.1;
  api.origin("#soi", "0 0");
  api.key("#soi", "y", 0, 0); api.key("#soi", "y", tSoi, 0, "none"); api.key("#soi", "y", tSoi + 0.5, 128, "power2.in"); api.key("#soi", "y", tSoi + 0.65, 118, "sine.out"); api.key("#soi", "y", tSoi + 0.8, 128, "sine.in");
  api.key("#soi", "x", 0, 0); api.key("#soi", "x", tSoi + 0.8, 26, "power1.out");
  api.sfx("drop", tSoi + 0.5, 0.25);
  V.pose(tSoi + 0.5, 0.2, { pupX: -10, pupY: 10 }, "power2.out");
  V.idle(tForgave + 1.0, DUR, { seed: 103, bien: 1.2 });
  V.pose(tCar, 0.3, { lean: 0, pupX: 0, pupY: 3 }, "power2.inOut");
};
