/* Đoạn d27 · cắt giấy · hồi ức: nhà gỗ buổi chiều chạng vạng, mặt cắt đất băng vĩnh cửu, đường ra nhà vệ sinh ngoài trời.
   Vào "cat", ra "cat". Trang phục: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng. Không chữ trên hình.
   Nhà cắt bổ (thấy trong nhà) + mặt tiền có cửa; dưới mặt đất: tuyết, lớp đất mỏng, khối băng xanh dày (các lớp giấy tách ra);
   ống nước đông thành que kem. Gag: đường tới chòi tự dài ra, chòi lùi xa; Wob gật đầu quyết rồi lặng lẽ đóng cửa. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var T = function (w, k, du) { var v = api.tu(w, k); return v == null ? du : v; };
  var MAT = 872, X0 = -900, X1 = 3600;

  // ---- trời chạng vạng (tĩnh) ----
  var troi = '<linearGradient id="d27-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6F82AA"/><stop offset="0.55" stop-color="#B9AFC6"/><stop offset="1" stop-color="#EDC7A6"/></linearGradient>' +
    '<rect x="0" y="0" width="1920" height="1080" fill="url(#d27-sky)"/>';
  // ---- lớp xa: đồi tím xanh, vài nhà xa sáng đèn ----
  var xa = "";
  var h1 = [[-1200, 1600], [-1200, 640]], h2 = [[-1200, 1600], [-1200, 700]];
  for (var x = -1200; x <= 2600; x += 140) { h1.push([x, 600 + 40 * Math.sin(x / 420) + 16 * Math.sin(x / 140)]); h2.push([x, 690 + 24 * Math.sin(x / 300 + 1)]); }
  h1.push([2600, 1600]); h2.push([2600, 1600]);
  xa += D.paper(D.rough(h1, 3, 2701, 30), "#9EA6C4", { shadow: false, stroke: true, sw: 3 });
  for (var t = 0, tx = -1000; tx < 2500; t++, tx += 190 + (t % 3) * 50) xa += at(tx, 640 + (t % 4) * 18, '<g transform="scale(' + (0.45 + (t % 3) * 0.1) + ')" opacity="0.7">' + D.larch(150 + (t % 5) * 20, 2710 + t) + "</g>");
  xa += D.paper(D.rough(h2, 3, 2702, 30), "#DCD6E2", { shadow: false, stroke: true, sw: 3 });
  [[-500, 742], [300, 736], [1500, 744], [2100, 738]].forEach(function (h, i) {
    xa += at(h[0], h[1], '<g transform="scale(0.34)">' + D.logHouse({ w: 300, h: 170, seed: 2720 + i }) + "</g>");
  });

  // ---- đạo cụ riêng ----
  /* chòi vệ sinh gỗ ngoài trời. Gốc: giữa chân chòi. */
  function choi() {
    var s = "";
    s += D.paper(D.rRect(-62, -206, 124, 206, 1.8, 2731), "#8A6243", { stroke: true, sw: 5, half: 0.18 });
    for (var k = -40; k <= 40; k += 26) s += D.line("M " + k + " -200 L " + (k + 1) + " -6", 3, "#4A2F1E", ' opacity="0.55"');
    s += D.paper(D.rRect(-38, -170, 76, 166, 1.4, 2732), "#6E4A31", { stroke: true, sw: 4, sx: 3, sy: 3 });
    s += '<path d="M 6 -150 C -10 -146 -10 -122 6 -118 C -4 -124 -4 -144 6 -150 Z" fill="#2B1C12"/>';         // lỗ trăng khuyết trên cửa
    s += '<circle cx="26" cy="-86" r="5" fill="#E8C66A" stroke="' + INK + '" stroke-width="2"/>';
    s += D.paper("M -84 -200 L 84 -224 L 84 -206 L -84 -182 Z", "#5A3B26", { stroke: true, sw: 5 });
    s += D.paper(D.rough([[-90, -200], [-40, -214], [30, -226], [90, -232], [88, -220], [-88, -190]], 2.5, 2733, 14), C.snow, { stroke: true, sw: 3.5, shadow: false });
    s += D.paper(D.rough([[-80, 4], [-60, -12], [60, -14], [84, 4]], 2.5, 2734, 14), C.snow, { stroke: true, sw: 3.5, shadow: false });
    return s;
  }

  var DO = "#C9463A", KHAN = "#D9543C";
  var M = api.wob("M", { scarf: true, khan: KHAN, mu: DO });

  // ---- lớp giữa ----
  var mid = "";
  // lớp đất cắt (vẽ trước để nhà đè lên): nền tối phía sau các lớp, lộ ra khi lớp tách
  mid += '<rect x="' + X0 + '" y="' + (MAT - 4) + '" width="' + (X1 - X0) + '" height="1000" fill="#1C2A30"/>';
  var bang = D.paper(D.rough([[X0, 962], [X1, 958], [X1, 1900], [X0, 1900]], 3, 2741, 34), "#8FBFD4", { shadow: false, stroke: true, sw: 5 });
  bang += '<rect x="' + X0 + '" y="1100" width="' + (X1 - X0) + '" height="800" fill="#4F86A0" opacity="0.35"/>';
  bang += '<rect x="' + X0 + '" y="1300" width="' + (X1 - X0) + '" height="600" fill="#3C6C84" opacity="0.35"/>';
  bang += '<rect x="' + X0 + '" y="962" width="' + (X1 - X0) + '" height="940" fill="url(#halfW)" opacity="0.28"/>';
  var rk = D.rng(2742);
  for (var k = 0; k < 26; k++) {
    var cx = X0 + rk() * (X1 - X0), cy = 1000 + rk() * 600;
    bang += D.line("M " + D.f1(cx) + " " + D.f1(cy) + " l " + D.f1(30 + rk() * 40) + " " + D.f1(rk() * 30 - 10) + " l " + D.f1(20 + rk() * 30) + " " + D.f1(rk() * 40 - 20), 3, "#E8F6FB", ' opacity="0.7"');
  }
  var dat = D.paper(D.rough([[X0, 908], [X1, 905], [X1, 966], [X0, 968]], 3, 2743, 26), "#6E4B36", { shadow: false, stroke: true, sw: 4, half: 0.2 });
  for (var p = 0; p < 40; p++) dat += '<ellipse cx="' + D.f1(X0 + rk() * (X1 - X0)) + '" cy="' + D.f1(920 + rk() * 34) + '" rx="' + D.f1(5 + rk() * 7) + '" ry="4" fill="#4C3324"/>';
  var tuyet = D.paper(D.rough([[X0, MAT], [X1, MAT - 3], [X1, 912], [X0, 914]], 3, 2744, 26), C.snow, { shadow: false, stroke: true, sw: 4 });
  // ống nước: từ sàn nhà xuống, chạy ngang trong khối băng
  var ong = D.line("M 700 880 L 700 1046 L 1720 1046", 30, INK) + D.line("M 700 880 L 700 1046 L 1720 1046", 20, "#9AA4A8");
  ong += D.line("M 694 900 L 694 1040", 4, "#ffffff", ' opacity="0.5"');
  var giot = "";
  for (var j = 0; j < 6; j++) giot += g("gt" + j, '<ellipse cx="0" cy="0" rx="10" ry="6" fill="#3F8FC0"/>');
  var kem = g("kem", '<g transform="translate(1300,1046)">' +
    D.paper("M -150 -44 C -150 -66 150 -66 150 -44 L 150 44 C 150 66 -150 66 -150 44 Z", "#D6F0FA", { stroke: true, sw: 5, sx: 5, sy: 6, half: 0.12 }) +
    D.line("M -120 -30 L 60 -34", 7, "#ffffff", ' opacity="0.8"') +
    D.line("M -90 18 L -60 6 M 40 24 L 80 12", 3, "#9FCBE0") + "</g>");
  var que = g("que", '<g transform="translate(1300,1094)">' + D.paper(D.rRect(-20, 0, 40, 120, 1, 2745), "#E3C38E", { stroke: true, sw: 5 }) + '<path d="M -20 100 C -20 130 20 130 20 100 Z" fill="#E3C38E" stroke="' + INK + '" stroke-width="5"/>' + D.line("M -8 20 L -8 96", 3, "#C9A46E") + '</g>');
  var bao = g("bao", '<rect x="686" y="1024" width="1040" height="44" rx="20" fill="#F4FBFE" stroke="' + INK + '" stroke-width="4"/>' +
    '<rect x="686" y="1028" width="1040" height="12" rx="6" fill="#ffffff"/>' + D.line("M 720 1060 L 760 1052 M 900 1062 L 950 1054 M 1500 1060 L 1560 1052", 3, "#9FCBE0"));
  mid += g("lp-bang", bang + ong + giot + bao + que + kem);
  mid += g("lp-dat", dat);
  mid += g("lp-tuyet", tuyet);
  // tấm tuyết phủ che mặt cắt (bóc ra khi camera hạ xuống)
  mid += g("phu", D.paper(D.rough([[X0, 900], [X1, 896], [X1, 1900], [X0, 1900]], 3, 2746, 30), "#EEF3F5", { shadow: false }) + '<rect x="' + X0 + '" y="960" width="' + (X1 - X0) + '" height="940" fill="url(#halfW)" opacity="0.4"/>');

  // con đường tuyết ra chòi + cọc mốc (giãn ra khi "đường tự dài")
  var XD = 1170;                                  // đầu đường (bậc cửa)
  mid += g("duong", D.paper("M 0 880 C 300 874 700 878 1130 876 L 1130 898 C 700 902 300 898 0 902 Z", "#DCE6EC", { shadow: false, stroke: true, sw: 2.5 }) +
    D.line("M 60 890 L 1100 888", 3, "#B9C9D3", ' stroke-dasharray="10 26"'), "translate(" + XD + ",0)");
  var cocX = [1450, 1750, 2050];
  cocX.forEach(function (cxk, i) { mid += at(cxk, 880, g("coc" + i, D.paper(D.rRect(-7, -70, 14, 70, 1, 2750 + i), C.woodDark, { stroke: true, sw: 3 }) + D.paper(D.rEll(0, -70, 11, 6, 1, 2760 + i), C.snow, { shadow: false }))); });
  mid += at(2330, 886, g("choi", choi()));
  // cổng trường xa (không chữ): hai trụ, xà ngang, mái nhỏ, toà nhà thấp phía sau
  mid += at(3260, 880, '<g transform="scale(0.8)">' + D.paper(D.rRect(-260, -230, 520, 230, 2, 2790), "#B9A27E", { stroke: true, sw: 5, half: 0.15 }) +
    [-180, -60, 60, 180].map(function (x) { return D.paper(D.rRect(x - 30, -180, 60, 70, 1.2, 2791 + x), "#FFD68A", { stroke: true, sw: 4, shadow: false }); }).join("") +
    D.paper(D.rough([[-290, -226], [0, -300], [290, -226], [290, -212], [-290, -212]], 2.5, 2795, 18), C.snow, { stroke: true, sw: 4 }) + "</g>");
  mid += at(3020, 886, D.line("M -150 0 L -150 -190 M 150 0 L 150 -190", 16, INK) + D.line("M -150 0 L -150 -190 M 150 0 L 150 -190", 9, C.woodDark) +
    D.paper(D.rRect(-176, -214, 352, 30, 1.5, 2796), C.wood, { stroke: true, sw: 4 }) + D.paper(D.rEll(0, -214, 180, 12, 2, 2797), C.snow, { shadow: false }));
  mid += at(2318, 640, g("bong1", D.sparkle(22, "#ffffff")));

  // nhà gỗ: nửa trái cắt bổ thấy trong nhà, nửa phải là mặt tiền có cửa
  var HX0 = 260, HX1 = 1180, HY = 520, DX0 = 950, DX1 = 1110, DY = 562;
  var nha = "";
  nha += '<rect x="' + HX0 + '" y="' + HY + '" width="' + (900 - HX0) + '" height="' + (MAT - HY) + '" fill="#6B4A33"/>';
  for (var ly = HY + 22; ly < MAT; ly += 28) nha += D.line("M " + HX0 + " " + ly + " L 900 " + (ly + 1), 4, "#4A3020", ' opacity="0.6"');
  nha += '<rect x="' + HX0 + '" y="' + HY + '" width="' + (900 - HX0) + '" height="' + (MAT - HY) + '" fill="url(#half)" opacity="0.12"/>';
  nha += '<ellipse cx="560" cy="640" rx="300" ry="220" fill="url(#lampG)"/>';
  nha += D.paper(D.rRect(380, 586, 130, 110, 1.5, 2770), "#E9B98F", { stroke: true, sw: 5, sx: 3, sy: 3 });                // cửa sổ sau: ánh chiều
  nha += D.line("M 445 586 L 445 696 M 380 641 L 510 641", 5);
  nha += D.line("M 640 " + HY + " L 640 600", 3) + '<path d="M 612 600 L 668 600 L 652 626 L 628 626 Z" fill="#E0703A" stroke="' + INK + '" stroke-width="4"/><circle cx="640" cy="632" r="8" fill="#FFF3C4"/>';
  nha += D.paper(D.rEll(560, MAT - 4, 190, 14, 2, 2771), "#A8352B", { shadow: false, stroke: true, sw: 3 });             // tấm thảm
  nha += D.paper(D.rRect(HX0 - 24, HY, 26, MAT - HY, 1.5, 2772), "#5A3B26", { stroke: true, sw: 4 });                   // vách trái (mặt cắt)
  nha += '<rect x="' + DX0 + '" y="' + DY + '" width="' + (DX1 - DX0) + '" height="' + (MAT - DY) + '" fill="#2A1D14"/>';            // lòng cửa tối
  mid += nha;
  // mặt tiền nửa phải (khoét cửa)
  var fac = "M 900 " + HY + " L " + HX1 + " " + HY + " L " + HX1 + " " + MAT + " L 900 " + MAT + " Z M " + DX0 + " " + DY + " L " + DX0 + " " + MAT + " L " + DX1 + " " + MAT + " L " + DX1 + " " + DY + " Z";
  mid += '<path d="' + fac + '" fill="#0b1214" opacity="0.22" fill-rule="evenodd" transform="translate(6,8)"/>';
  mid += '<path d="' + fac + '" fill="' + C.wood + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="5"/>';
  mid += '<clipPath id="d27-fc"><path d="' + fac + '" clip-rule="evenodd"/></clipPath><g clip-path="url(#d27-fc)">';
  for (var fy = HY + 24; fy < MAT; fy += 26) mid += D.line("M 904 " + fy + " L " + (HX1 - 4) + " " + (fy + 1), 3.5, "#3A2618", ' opacity="0.55"');
  mid += "</g>";
  mid += '<rect x="' + (DX0 - 4) + '" y="' + (DY - 4) + '" width="' + (DX1 - DX0 + 8) + '" height="' + (MAT - DY + 4) + '" fill="none" stroke="' + INK + '" stroke-width="7"/>';
  // mái phủ tuyết, ống khói
  mid += D.paper(D.rough([[HX0 - 60, HY + 4], [(HX0 + HX1) / 2, HY - 200], [HX1 + 60, HY + 4], [HX1 + 60, HY + 22], [HX0 - 60, HY + 22]], 3, 2773, 22), C.snow, { stroke: true, sw: 5, fringe: C.ice, sy: 10 });
  mid += D.paper(D.rRect(960, HY - 150, 50, 110, 1.5, 2774), "#5A4636", { stroke: true, sw: 4 });
  mid += api.khoi("d27-khoi", 985, HY - 156, { cao: 360, rong: 22, uon: 16, toc: 0.28 });
  // bậc cửa
  mid += D.paper(D.rRect(DX0 - 10, MAT - 6, DX1 - DX0 + 70, 22, 1.5, 2775), C.woodLight, { stroke: true, sw: 4 });
  mid += M.svg;
  // cánh cửa (vẽ sau Wob để đóng lại che Wob)
  mid += g("cua", D.paper(D.rRect(DX0, DY, DX1 - DX0, MAT - DY, 1.5, 2776), "#5E3D27", { stroke: true, sw: 5, sx: 4, sy: 4 }) +
    D.line("M " + (DX0 + 40) + " " + (DY + 14) + " L " + (DX0 + 40) + " " + (MAT - 12) + " M " + (DX0 + 80) + " " + (DY + 14) + " L " + (DX0 + 80) + " " + (MAT - 12) + " M " + (DX0 + 120) + " " + (DY + 14) + " L " + (DX0 + 120) + " " + (MAT - 12), 3, "#2E1D12", ' opacity="0.6"') +
    '<circle cx="' + (DX1 - 24) + '" cy="' + (DY + 170) + '" r="9" fill="#E8C66A" stroke="' + INK + '" stroke-width="3"/>');

  // lớp gần: ụ tuyết trái (chỉ khi ở trên mặt đất)
  var gan = "";
  var fx = api.lapLanh("spk", 6, 2790, [1060, 980, 500, 120], 8.0, 10.2);
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", mid + fx, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1060 }) +
    g("toi", '<rect x="0" y="0" width="1920" height="1080" fill="#1B2340"/>'));
  api.noi({});

  // ---- mốc lời ----
  var tNeed = T("needed", 0, 1.14), tBen = T("Beneath", 0, 2.32), tPerm = T("permafrost", 0, 4.0), tYear = T("year", 0, 5.94);
  var tWater = T("water", 0, 7.51), tPipes = T("pipes", 0, 7.87), tWork = T("working", 0, 9.26), tMany = T("Many", 0, 10.05);
  var tOut = T("outdoor", 0, 10.79), tYes = tOut + 0.35, tJan = tOut + 0.75   /* lời mới bỏ "Yes, even in January." */, tLook = T("looked", 0, 14.07);
  var tOn = T("way", 0, 17.12) - 0.15;   // "On the way back": cắt sang Wob rảo bước từ chòi về
  var tPath = T("path", 0, 14.46), tLong = T("long", 0, 15.77), tTime = T("time", 0, 16.04), tDec = T("decision", 0, 17.11), tWait = T("waited", 0, 18.10);

  // ---- camera ----
  api.camera([
    [0, 600, 712, 1.62], [tBen - 0.2, 590, 716, 1.68, "sine.inOut"],
    [tBen + 0.9, 980, 1070, 0.98, "power2.inOut"],                 // hạ xuống dưới mặt đất
    [tPerm + 1.2, 1040, 1080, 1.02, "sine.inOut"],
    [tWater - 0.3, 1300, 1040, 1.65, "power2.inOut"],               // vào ống nước
    [tWork + 0.4, 1305, 1040, 1.74, "sine.inOut"],
    [tMany + 0.8, 1640, 640, 0.86, "power2.inOut"],                 // trở lên: đường sau nhà, chòi ở cuối
    [tJan + 0.5, 1660, 636, 0.9, "sine.inOut"],
    [tLook + 0.1, 1960, 630, 0.88, "power2.inOut"],                  // giữ rộng: thấy đường dài ra, chòi lùi xa
    [tTime + 0.5, 1940, 636, 0.92, "sine.inOut"],
    [tDec + 0.2, 1110, 744, 1.62, "power2.inOut"],
    [tWait + 0.25, 1040, 744, 1.82, "sine.inOut"],
    [tOn - 0.03, 1038, 744, 1.86, "sine.out"],
    [tOn, 2600, 690, 1.22, "step"],                                 // cắt: trời tối thêm, Wob từ chòi về
    [DUR, 2860, 694, 1.28, "sine.inOut"]
  ]);

  // ---- Wob trong nhà: bắt chéo chân, nhấp nhổm, nhìn quanh ----
  M.set(0, { x: 560, y: 880, size: 0.7, aLu: 30, aLf: -40, aRu: -30, aRf: 40, lashes: 1, ice: 1, legL: -14, legR: 14 });
  M.mouth(0, "wobbly");
  for (var h = 0, th = 0.1; th < tBen + 0.6; h++, th += 0.34) {
    M.pose(th, 0.17, { y: 868, sy: 1.04, sx: 0.98, legL: -18, legR: 18 }, "power2.out");
    M.pose(th + 0.17, 0.17, { y: 880, sy: 0.96, sx: 1.03, legL: -12, legR: 12 }, "power2.in");
  }
  M.nhinQuanh(tNeed - 0.1, { nhip: 0.35 });
  M.pose(tNeed + 0.9, 0.15, { pupX: 8, pupY: 6 }, "power2.out");
  api.sfx("liu-lo-hoi", tNeed + 0.1, 0.55);
  // (khi camera dưới đất) Wob ra cửa, đứng ở bậc cửa
  M.set(tBen + 1.2, { x: 1030, y: 884, legL: 0, legR: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 10, pupY: 0 });
  M.mouth(tBen + 1.2, "X");
  // ở bậc cửa nhìn ra chòi: nhún nhảy chân bắt chéo (thấy khi camera trở lên)
  for (var h2 = 0, t2 = tMany + 0.2; t2 < tLook - 0.2; h2++, t2 += 0.42) {
    M.pose(t2, 0.2, { y: 874, legL: -16, legR: 16, sy: 1.03 }, "power2.out");
    M.pose(t2 + 0.21, 0.2, { y: 884, legL: -10, legR: 10, sy: 0.97 }, "power2.in");
  }
  M.pose(tOut, 0.2, { pupX: 11, pupY: -2 }, "power2.out");
  M.mouth(tYes, "o");
  M.shiver(tJan - 0.1, tJan + 0.6, 2.4, 16);
  // nhìn đường rất lâu (đường dài ra)
  M.pose(tLook, 0.25, { legL: 0, legR: 0, y: 884, sy: 1, pupX: 12, pupY: 2, eye: 1.08 }, "power2.out");
  M.mouth(tLook, "flat");
  M.pose(tPath + 0.6, 0.3, { lid: 18, upRot: 3 }, "power2.inOut");
  M.pose(tLong, 0.3, { eye: 1.18, lid: 0 }, "back.out(2)");
  M.mouth(tLong, "o");
  M.idle(tLook, tDec - 0.4, { seed: 271, bien: 1.2, tho: false });
  // gật đầu quả quyết
  M.pose(tDec - 0.35, 0.2, { upRot: 0, pupX: 0, pupY: 2, eye: 1 }, "power2.out");
  M.mouth(tDec - 0.3, "flat");
  M.pose(tDec - 0.1, 0.12, { upY: 14, upRot: -2 }, "power2.in"); M.pose(tDec + 0.05, 0.16, { upY: -4, upRot: 0 }, "back.out(2)");
  M.pose(tDec + 0.3, 0.12, { upY: 12 }, "power2.in"); M.pose(tDec + 0.45, 0.18, { upY: 0 }, "back.out(2)");
  M.pose(tDec + 0.5, 0.2, { lid: 14 }, "power2.out");
  // lặng lẽ lùi vào, cửa đóng
  M.pose(tWait - 0.25, 0.3, { size: 0.64, y: 878, op: 0.0 }, "power2.inOut");
  M.breathe(0, DUR, 2.4);
  M.autoBlink(tMany, tLook - 0.3, 2701);

  // ---- cửa: mở sẵn, đóng ở "I waited" ----
  api.origin("#cua", DX0 + " " + DY);
  api.set("#cua", 0, { scaleX: 0.12 });
  api.key("#cua", "scaleX", tWait - 0.25, 0.12, "none"); api.key("#cua", "scaleX", tWait + 0.1, 1, "power2.inOut");
  api.sfx("im-lang", tWait + 0.3, 0.55);

  // ---- các lớp đất tách ra ----
  api.origin("#phu", "0 0");
  api.key("#phu", "opacity", 0, 1); api.key("#phu", "opacity", tBen + 0.15, 1, "none"); api.key("#phu", "opacity", tBen + 0.75, 0, "power2.inOut");
  api.key("#phu", "y", 0, 0); api.key("#phu", "y", tBen + 0.15, 0, "none"); api.key("#phu", "y", tBen + 0.75, 70, "power2.in");
  api.key("#phu", "y", tMany + 0.5, 70, "step"); api.key("#phu", "y", tMany + 1.1, 0, "power2.out");
  api.key("#phu", "opacity", tMany + 0.5, 0, "none"); api.key("#phu", "opacity", tMany + 1.1, 1, "power2.out");
  ["#lp-tuyet", "#lp-dat"].forEach(function (s, i) {
    api.key(s, "y", 0, 0); api.key(s, "y", tBen + 0.5, 0, "none"); api.key(s, "y", tBen + 1.3 + i * 0.12, i ? -10 : -24, "back.out(1.4)");
    api.key(s, "y", tMany + 0.1, i ? -10 : -24, "none"); api.key(s, "y", tMany + 0.7, 0, "power2.inOut");
  });
  api.key("#lp-bang", "y", 0, 0); api.key("#lp-bang", "y", tBen + 0.5, 0, "none"); api.key("#lp-bang", "y", tBen + 1.4, 12, "back.out(1.4)");
  api.key("#lp-bang", "y", tMany + 0.1, 12, "none"); api.key("#lp-bang", "y", tMany + 0.7, 0, "power2.inOut");

  // ---- nước chảy trong ống rồi đông cứng ----
  var tFreeze = tWater - 0.08, tWhich = T("which", 0, 6.61);   // băng phủ ống dần từ "which", thành que kem trước "pipes"
  for (var q = 0; q < 6; q++) {
    var sel = "#gt" + q;
    api.origin(sel, "0 0");
    var per = 1.6, ph = q * per / 6;
    api.key(sel, "y", 0, 1046);
    for (var c0 = -ph; c0 < tFreeze; c0 += per) {
      var a0 = Math.max(0, c0), f0 = (a0 - c0) / per;
      api.key(sel, "x", a0, 760 + 940 * f0, "step"); api.key(sel, "x", Math.min(c0 + per, tFreeze), 760 + 940 * Math.min(1, (tFreeze - c0) / per), "none");
    }
    api.key(sel, "x", tFreeze + 0.01, 760 + 940 * ((tFreeze + ph) % per) / per, "step");
    api.key(sel, "scale", 0, 1); api.key(sel, "scale", tFreeze, 1, "none"); api.key(sel, "scale", tFreeze + 0.3, 0.6, "power2.out");
  }
  api.origin("#bao", "686 1046");
  api.key("#bao", "scaleX", 0, 0); api.key("#bao", "scaleX", tWhich - 0.05, 0, "none"); api.key("#bao", "scaleX", tFreeze, 1, "power1.inOut");
  api.set("#bao", 0, { opacity: 0 }); api.set("#bao", tWhich - 0.05, { opacity: 1 });
  api.sfx("tach-bang", tWhich, 0.35);
  api.origin("#kem", "1300 1046"); api.pop("#kem", tFreeze, 0.24);
  api.origin("#que", "1300 1094");
  api.key("#que", "y", 0, -80); api.key("#que", "y", tFreeze + 0.3, -80, "none"); api.key("#que", "y", tFreeze + 0.55, 0, "back.out(2.4)");
  api.show("#que", 0, 0); api.show("#que", tFreeze + 0.3, 1);
  api.sfx("tach-bang", tFreeze, 0.7);
  api.sfx("pop", tFreeze + 0.32, 0.4);

  // ---- bông tuyết rơi lên nóc chòi ----
  api.origin("#bong1", "0 0");
  api.key("#bong1", "y", 0, -300); api.key("#bong1", "y", tYes - 0.6, -300, "none"); api.key("#bong1", "y", tYes + 0.5, 0, "sine.inOut");
  api.key("#bong1", "x", 0, 30); api.key("#bong1", "x", tYes - 0.2, -18, "sine.inOut"); api.key("#bong1", "x", tYes + 0.5, 0, "sine.inOut");
  api.key("#bong1", "rotation", 0, 0); api.key("#bong1", "rotation", tYes + 0.5, 90, "sine.inOut");
  api.key("#bong1", "scale", 0, 1); api.key("#bong1", "scale", tJan + 0.6, 1, "none"); api.key("#bong1", "scale", tJan + 1.0, 0.6, "power2.out");

  // ---- đường tự dài ra, chòi lùi xa ----
  var t0 = tPath - 0.1, t1 = tTime + 0.5, KD = 1.45;
  api.origin("#duong", "0 0");
  api.key("#duong", "scaleX", 0, 1); api.key("#duong", "scaleX", t0, 1, "none"); api.key("#duong", "scaleX", t1, KD, "power1.inOut");
  api.origin("#choi", "0 0");
  api.key("#choi", "x", 0, 0); api.key("#choi", "x", t0, 0, "none"); api.key("#choi", "x", t1, (2330 - XD) * (KD - 1), "power1.inOut");
  api.key("#choi", "scale", 0, 1); api.key("#choi", "scale", t0, 1, "none"); api.key("#choi", "scale", t1, 0.62, "power1.inOut");
  api.key("#choi", "y", 0, 0); api.key("#choi", "y", t0, 0, "none"); api.key("#choi", "y", t1, -14, "power1.inOut");
  cocX.forEach(function (cxk, i) {
    api.origin("#coc" + i, "0 0");
    api.key("#coc" + i, "x", 0, 0); api.key("#coc" + i, "x", t0, 0, "none"); api.key("#coc" + i, "x", t1, (cxk - XD) * (KD - 1), "power1.inOut");
    api.key("#coc" + i, "scale", 0, 1); api.key("#coc" + i, "scale", t0, 1, "none"); api.key("#coc" + i, "scale", t1, 1 - 0.3 * (i + 1) / 3, "power1.inOut");
  });
  api.sfx("rise", t0 + 0.1, 0.5);

  // ---- "On the way back": trời tối thêm một bậc; đường, chòi về như cũ; Wob rảo bước từ chòi về, run cầm cập ----
  api.set("#toi", 0, { opacity: 0 }); api.set("#toi", tOn, { opacity: 0.3 });
  api.set("#duong", tOn, { scaleX: 1 }); api.set("#choi", tOn, { x: 0, y: 0, scale: 1 });
  cocX.forEach(function (cxk, i) { api.set("#coc" + i, tOn, { x: 0, scale: 1 }); });
  M.set(tOn, { x: 2440, y: 884, size: 0.7, op: 1, lid: 0, eye: 1.08, upY: 0, pupX: 10, pupY: 0 });
  M.walk(tOn + 0.02, DUR, 2440, 2980, { step: 0.24, tieng: true });
  M.shiver(tOn + 0.02, DUR, 3, 20);
  M.mouth(tOn, "chatter");
  api.sfx("brr", tOn + 0.15, 0.6);
};
