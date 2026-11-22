/* Đoạn d29 · cắt giấy · hồi ức: trong nhà gỗ buổi tối (ngoài cửa sổ xanh đêm, tuyết; trong nhà đèn vàng ấm).
   Vào "cat", ra "cat". Không chữ trên hình.
   Trang phục: mũ len đỏ, khăn đỏ, lông mi đóng băng; ba lô DƯỚI SÀN (ẩn ba lô trên lưng). Cuối đoạn: ba lô phồng không đóng được
   (đuôi cá thò ra), Wob ngồi đè lên.
   Gag: trà mọc da (băng mỏng bóng, thìa nảy, sợi hơi cuối rũ xuống); cá thanh thản bên cửa sổ; ba lô không đóng được. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var T = function (w, k, du) { var v = api.tu(w, k); return v == null ? du : v; };
  var SAN = 900;

  function tuyetRoi(pre, n, seed, o) {
    var r = D.rng(seed), s = "";
    for (var i = 0; i < n; i++) {
      var id = pre + i, sel = "#" + id, x = o.x0 + r() * (o.x1 - o.x0), rr = (o.r || 5) * (0.6 + r() * 0.8);
      var H = o.y1 - o.y0, v = (o.toc || 50) * (0.7 + r() * 0.6), per = H / v, tc = -r() * per;
      s += at(D.f1(x), o.y0, g(id, '<circle cx="0" cy="0" r="' + D.f1(rr) + '" fill="#F2F7FA" opacity="' + (o.mo || 0.85) + '"/>'));
      api.origin(sel, "0 0");
      api.key(sel, "y", 0, -tc * v, "none");
      for (var c = tc + per; c < DUR + per; c += per) { api.key(sel, "y", c, H, "none"); api.key(sel, "y", c, 0, "step"); }
      var dr = (o.lac || 10) * (0.5 + r()), sg = r() < 0.5 ? -1 : 1;
      api.key(sel, "x", 0, 0, "none");
      for (var tx = 1.0 + r(); tx < DUR; tx += 1.4 + r() * 0.8) { api.key(sel, "x", tx, sg * dr, "sine.inOut"); sg = -sg; }
    }
    return s;
  }
  /* bản đồ giấy treo tường (không chữ): biển, đất, hoa gió có mũi tên đỏ chỉ hướng bắc. Gốc: tâm tờ. */
  function banDo() {
    var s = D.paper(D.rRect(-140, -100, 280, 200, 2, 2901), "#EFE3C8", { stroke: true, sw: 5, sx: 5, sy: 6 });
    s += '<rect x="-124" y="-84" width="248" height="168" fill="#9CC3CF"/>';
    s += D.paper("M -110 -70 C -60 -84 -20 -60 10 -66 C 40 -70 50 -40 30 -20 C 10 0 -40 -10 -70 10 C -100 30 -120 0 -110 -70 Z", "#E9D7A6", { shadow: false, stroke: true, sw: 3 });
    s += D.paper("M 40 20 C 70 0 110 10 116 40 C 120 70 80 82 50 70 C 30 60 20 36 40 20 Z", "#E9D7A6", { shadow: false, stroke: true, sw: 3 });
    s += D.line("M -60 40 C -30 50 0 30 30 46", 3, INK, ' stroke-dasharray="6 8" opacity="0.6"');
    s += '<g transform="translate(-80,52)"><circle r="20" fill="#FFF8EC" stroke="' + INK + '" stroke-width="3"/><path d="M 0 -18 L 6 0 L 0 18 L -6 0 Z" fill="' + INK + '"/><path d="M 0 -18 L 6 0 L -6 0 Z" fill="#D9543C"/></g>';
    s += '<circle cx="0" cy="-92" r="7" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/>';
    return s;
  }
  /* ba lô to dưới sàn. Gốc: giữa đáy. nắp "bl-nap" bản lề sau, đuôi cá "bl-duoi" ẩn sẵn. */
  function baLo() {
    var s = g("bl-duoi", '<g transform="translate(64,-186) rotate(-50) scale(0.82)">' + '<path d="M 90 -5 L 134 -38 C 126 -14 126 14 134 38 L 90 5 Z" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="M 40 -30 C 70 -24 90 -12 96 -6 L 96 6 C 90 12 70 24 40 30 Z" fill="url(#plaid)" stroke="' + INK + '" stroke-width="6"/></g>');
    s += g("bl-than", '<rect x="-84" y="-196" width="168" height="196" rx="46" fill="#b8743a" stroke="' + INK + '" stroke-width="7"/>' +
      '<rect x="-46" y="-110" width="92" height="74" rx="16" fill="#8e5527" stroke="' + INK + '" stroke-width="5"/>' +
      D.line("M -40 -150 L 40 -150", 4, INK, ' opacity="0.35"'));
    s += g("bl-nap", '<path d="M -88 -200 C -88 -236 88 -236 88 -200 L 80 -160 C 40 -150 -40 -150 -80 -160 Z" fill="#d9543c" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
      '<rect x="-12" y="-170" width="24" height="26" rx="5" fill="#E8C66A" stroke="' + INK + '" stroke-width="3"/>');
    return s;
  }
  function thia() { return D.line("M 0 -10 L 0 70", 7, INK) + D.line("M 0 -10 L 0 70", 3, "#C9D3D6") + '<ellipse cx="0" cy="84" rx="11" ry="16" fill="#C9D3D6" stroke="' + INK + '" stroke-width="4"/>'; }
  function banChai() { return D.paper(D.rRect(-6, -70, 12, 80, 1, 2905), "#3F9FB0", { stroke: true, sw: 3, shadow: false }) + '<rect x="-8" y="-92" width="16" height="24" rx="3" fill="#F4F1E8" stroke="' + INK + '" stroke-width="3"/>'; }

  // ---- phòng ----
  var phong = "";
  phong += '<rect x="-600" y="-200" width="3200" height="1200" fill="#7A5638"/>';
  for (var ly = -180; ly < SAN; ly += 30) phong += D.line("M -600 " + ly + " C 200 " + (ly + 4) + " 1200 " + (ly - 3) + " 2600 " + (ly + 2), 4, "#4E3423", ' opacity="0.55"');
  phong += '<rect x="-600" y="-200" width="3200" height="1200" fill="url(#half)" opacity="0.1"/>';
  phong += '<ellipse cx="820" cy="420" rx="760" ry="520" fill="url(#lampG)"/>';
  // cửa sổ: đêm xanh, tuyết rơi, đèn nhà xa
  var WX0 = 1080, WX1 = 1480, WY0 = 300, WY1 = 640;
  phong += '<clipPath id="d29-win"><rect x="' + WX0 + '" y="' + WY0 + '" width="' + (WX1 - WX0) + '" height="' + (WY1 - WY0) + '"/></clipPath>';
  phong += '<linearGradient id="d29-dem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14243F"/><stop offset="1" stop-color="#2E4C6E"/></linearGradient>';
  var ngoai = '<rect x="' + WX0 + '" y="' + WY0 + '" width="400" height="340" fill="url(#d29-dem)"/>';
  ngoai += D.paper(D.rough([[1060, 580], [1200, 560], [1340, 572], [1500, 556], [1500, 660], [1060, 660]], 2, 2910, 20), "#C9D8E4", { shadow: false });
  ngoai += at(1180, 566, '<g transform="scale(0.3)">' + D.logHouse({ w: 300, h: 170, seed: 2911 }) + "</g>");
  ngoai += at(1390, 560, '<g transform="scale(0.24)">' + D.logHouse({ w: 300, h: 170, seed: 2912 }) + "</g>");
  [[1120, 340], [1250, 330], [1440, 350], [1330, 380]].forEach(function (p) { ngoai += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.5" fill="#FFF8D8"/>'; });
  ngoai += tuyetRoi("ws", 16, 2913, { x0: WX0, x1: WX1, y0: WY0 - 10, y1: WY1 + 10, toc: 46, r: 4, mo: 0.9 });
  phong += '<g clip-path="url(#d29-win)">' + ngoai + "</g>";
  phong += '<rect x="' + WX0 + '" y="' + WY0 + '" width="400" height="340" fill="none" stroke="' + INK + '" stroke-width="12"/>' + D.line("M 1280 300 L 1280 640 M 1080 470 L 1480 470", 9);
  phong += D.line("M 1110 600 L 1170 330 M 1150 620 L 1210 350", 5, "#ffffff", ' opacity="0.25"');
  phong += D.paper(D.rRect(WX0 - 24, WY1 - 4, 448, 22, 1.5, 2914), C.woodLight, { stroke: true, sw: 4 });
  // sàn
  phong += D.paper(D.rough([[-600, SAN - 6], [2600, SAN - 8], [2600, 1400], [-600, 1400]], 2, 2915, 30), "#5A3B26", { shadow: false, stroke: true, sw: 4 });
  for (var fx0 = -560; fx0 < 2600; fx0 += 180) phong += D.line("M " + fx0 + " " + (SAN + 4) + " L " + (fx0 - 60) + " 1400", 3, "#3A2618", ' opacity="0.6"');
  // đèn treo
  phong += D.line("M 820 -200 L 820 170", 4) + '<path d="M 770 170 L 870 170 L 846 214 L 794 214 Z" fill="#E0703A" stroke="' + INK + '" stroke-width="5"/><circle cx="820" cy="222" r="12" fill="#FFF3C4"/>';
  // bàn + ghế đẩu
  var ban = D.paper(D.rRect(520, 770, 340, 22, 1.5, 2916), C.woodLight, { stroke: true, sw: 5 });
  ban += D.paper(D.rRect(546, 790, 20, 112, 1, 2917), C.wood, { stroke: true, sw: 4 }) + D.paper(D.rRect(814, 790, 20, 112, 1, 2918), C.wood, { stroke: true, sw: 4 });
  var ghe = D.paper(D.rRect(910, 806, 140, 20, 1.5, 2919), C.woodLight, { stroke: true, sw: 4 }) + D.line("M 928 824 L 916 900 M 1032 824 L 1044 900", 10, INK) + D.line("M 928 824 L 916 900 M 1032 824 L 1044 900", 5, C.wood);

  // ---- Wob ----
  var DO = "#C9463A", KHAN = "#D9543C";
  var M = api.wob("M", { scarf: true, khan: KHAN, mu: DO,
    holdR: g("hcoc", '<g transform="translate(26,30) scale(0.62)">' + D.teaMug("mh") + "</g>") + g("hthia", thia()) });

  var mid = phong;
  mid += at(430, 390, g("bando", banDo()));
  mid += ban + at(600, 772, g("mtG", '<g transform="scale(0.62)">' + D.teaMug("mt") + "</g>"));
  mid += at(760, 772, g("chai", '<g transform="scale(0.7)">' + banChai() + "</g>"));
  mid += ghe;
  // cá dựng đứng trên bậu cửa sổ, mặt thanh thản; khăn kẻ ô bọc (ẩn sẵn)
  mid += at(1410, 545, g("ca", '<g transform="rotate(90) scale(0.74)">' + D.fish({ eye: "calm", seed: 2930 }) + "</g>" +
    g("ca-khan", '<g transform="rotate(90) scale(0.74)"><path d="M -100 -40 C -40 -50 40 -46 92 -30 L 96 30 C 40 46 -40 50 -100 40 Z" fill="url(#plaid)" stroke="' + INK + '" stroke-width="6"/></g>')));
  mid += at(1190, SAN + 2, g("balo", baLo()));
  mid += M.svg;
  var lap = api.lapLanh("spk", 7, 2940, [1340, 380, 150, 330], 13.0, 15.6);
  api.dat(api.lop("giua", mid + lap, 1, { mat: SAN }));
  api.noi({});

  // ---- mốc lời ----
  var tMade = T("made", 0, 0.95), tWarm = T("warm", 0, 1.45), tTea2 = T("tea", 1, 2.42), tNot = T("not", 0, 2.77), tGrew = T("grew", 0, 4.0);
  var tShiny = T("shiny", 0, 5.04), tSkin = T("skin", 0, 5.41), tGave = T("gave", 0, 6.08), tSat = T("sat", 0, 7.07), tScarf = T("scarf", 0, 8.24);
  var tUps = T("upside-down", 0, 9.12), tFish = T("fish", 0, 10.62), tClear = T("clearly", 0, 11.21), tFish2 = T("fish", 1, 13.52);
  var tPeace = T("peace", 0, 14.14), tNot2 = T("not", 1, 15.65), tHad = T("had", 1, 15.51), tNight = T("night", 0, 16.55), tPack = T("packing", 0, 17.42);

  // ---- camera ----
  api.camera([
    [0, 820, 560, 1.32], [tMade, 760, 600, 1.42, "sine.inOut"],                 // đẩy chậm: cửa sổ tối, đèn vàng
    [tTea2 + 0.2, 640, 680, 1.9, "power2.inOut"],                                // vào cốc
    [tGrew, 610, 712, 2.75, "power2.inOut"],                                      // cận cốc
    [tGave + 0.6, 608, 716, 2.95, "sine.inOut"],
    [tSat + 0.7, 1010, 590, 1.18, "power2.inOut"],                                // lùi: Wob ra ngồi cạnh cửa sổ
    [tUps - 0.3, 960, 580, 1.14, "sine.inOut"],
    [tFish - 0.1, 1210, 580, 1.42, "power2.inOut"],
    [tFish2 - 0.25, 1300, 560, 1.6, "sine.inOut"],
    [tFish2 + 0.3, 1405, 480, 3.0, "power3.inOut"],                              // cận mặt cá
    [tHad - 0.3, 1410, 478, 3.15, "sine.inOut"],
    [tHad + 0.15, 985, 600, 2.1, "power3.inOut"],                                 // Wob run lập cập
    [tNight - 0.15, 990, 604, 2.2, "sine.inOut"],
    [tNight + 0.4, 1150, 610, 1.3, "power2.inOut"],                              // lùi: cửa sổ + ba lô (đóng gói)
    [DUR, 1170, 628, 1.42, "sine.inOut"]
  ]);

  // ---- Wob: ẩn ba lô trên lưng (ba lô ở dưới sàn) ----
  api.set("#M-pack", 0, { opacity: 0 });
  M.set(0, { x: 430, y: SAN, size: 0.7, aLu: 30, aLf: -96, aRu: -22, aRf: -108, lashes: 1, ice: 1, pupX: 4, pupY: 2 });
  M.mouth(0, "smirk");
  // đồ cầm tay phải: cốc (xoay ngược để cốc đứng thẳng), thìa (ẩn)
  api.origin("#hcoc", "0 0"); api.origin("#hthia", "0 0");
  api.set("#hcoc", 0, { rotation: 130 }); api.set("#hthia", 0, { opacity: 0 });
  api.hoi("mh", 0, tNot + 0.1);
  api.set("#mh-ice", 0, { opacity: 0 }); api.set("#mh-frost", 0, { opacity: 0 });
  M.pose(tMade, 0.3, { aRf: -118, upY: -4, lid: 16 }, "power2.out");           // nâng cốc, mắt lim dim hưởng hơi ấm
  api.key("#hcoc", "rotation", tMade, 130, "none"); api.key("#hcoc", "rotation", tMade + 0.3, 140, "power2.out");
  M.mouth(tWarm, "grin");
  api.sfx("hoi-nuoc", tMade + 0.05, 0.55);
  // hơi tắt phụt
  api.origin("#mh-steam", "0 -96");
  api.key("#mh-steam", "scale", 0, 1); api.key("#mh-steam", "scale", tNot - 0.05, 1, "none"); api.key("#mh-steam", "scale", tNot + 0.08, 0.2, "power3.in");
  api.show("#mh-steam", 0, 1); api.show("#mh-steam", tNot + 0.09, 0);
  M.pose(tNot, 0.15, { lid: 0, eye: 1.12, upY: 0 }, "back.out(2)");
  M.mouth(tNot, "flat");
  // đặt cốc lên bàn
  var tDat = tNot + 0.55;
  M.pose(tDat, 0.35, { aRu: -62, aRf: -30 }, "power2.inOut");
  api.key("#hcoc", "rotation", tDat, 140, "none"); api.key("#hcoc", "rotation", tDat + 0.35, 92, "power2.inOut");
  api.show("#hcoc", 0, 1); api.show("#hcoc", tDat + 0.36, 0);
  api.show("#mtG", 0, 0); api.show("#mtG", tDat + 0.36, 1);
  api.show("#hthia", tDat + 0.36, 1);
  api.key("#hthia", "rotation", 0, 60); api.key("#hthia", "rotation", tDat + 0.36, 60, "none");
  // cận: mặt trà mọc da băng bóng
  api.set("#mt-steam", 0, { opacity: 0 }); api.set("#mt-ice", 0, { opacity: 0 });
  api.set("#mt-frost", 0, { opacity: 0 }); api.to("#mt-frost", tShiny - 0.3, 0.5, { opacity: 1 }, "power2.out");
  api.sfx("tach-bang", tShiny - 0.25, 0.55);
  M.pose(tGrew, 0.2, { pupX: 8, pupY: 10 }, "power2.out");
  M.mouth(tShiny, "o");
  // gõ thìa: cạch, thìa nảy
  var tGo = tSkin + 0.25;
  M.pose(tGo - 0.2, 0.18, { aRu: -70, aRf: -50 }, "power2.out");
  api.key("#hthia", "rotation", tGo - 0.2, 60, "none"); api.key("#hthia", "rotation", tGo - 0.02, 112, "power2.out");
  M.pose(tGo - 0.02, 0.08, { aRu: -56, aRf: -30 }, "power3.in");
  M.pose(tGo + 0.08, 0.16, { aRu: -96, aRf: -70, eye: 1.2 }, "back.out(3)");
  api.key("#hthia", "rotation", tGo + 0.08, 112, "none"); api.key("#hthia", "rotation", tGo + 0.26, 40, "back.out(3)");
  api.sfx("bonk", tGo + 0.06, 0.6);
  M.mouth(tGo + 0.1, "wobbly");
  // sợi hơi cuối cùng ló lên rồi rũ xuống
  api.set("#mt-st0", 0, { opacity: 0 }); api.set("#mt-st2", 0, { opacity: 0 });
  api.origin("#mt-st1", "0 -96");
  api.show("#mt-steam", tGave - 0.5, 1);
  api.key("#mt-st1", "scaleY", 0, 0.1); api.key("#mt-st1", "scaleY", tGave - 0.5, 0.1, "none"); api.key("#mt-st1", "scaleY", tGave - 0.15, 0.7, "power2.out");
  api.key("#mt-st1", "rotation", 0, 0); api.key("#mt-st1", "rotation", tGave + 0.05, 0, "none"); api.key("#mt-st1", "rotation", tGave + 0.55, -95, "power2.in");
  api.key("#mt-st1", "scaleY", tGave + 0.05, 0.7, "none"); api.key("#mt-st1", "scaleY", tGave + 0.55, 0.45, "power2.in");
  api.key("#mt-st1", "opacity", 0, 1); api.key("#mt-st1", "opacity", tGave + 0.4, 1, "none"); api.key("#mt-st1", "opacity", tGave + 0.9, 0, "power2.in");
  M.pose(tGave + 0.2, 0.3, { eye: 1, lid: 26, aRu: -18, aRf: 10 }, "power2.inOut");
  api.show("#hthia", tGave + 0.5, 0);
  M.mouth(tGave + 0.3, "flat");

  // ---- ra ngồi cạnh cửa sổ (ghế đẩu) ----
  M.pose(tSat - 0.1, 0.2, { lid: 0, pupX: 10, pupY: 0 }, "power2.out");
  M.walk(tSat, tSat + 0.8, 430, 980, { step: 0.27 });
  M.pose(tSat + 0.82, 0.22, { y: 818, sy: 0.92, sx: 1.06 }, "power2.out");    // nhảy lên ghế
  M.pose(tSat + 1.04, 0.2, { sy: 1, sx: 1, legL: 6, legR: -6 }, "back.out(2)");
  // kéo khăn
  M.pose(tScarf - 0.15, 0.2, { aLu: -40, aLf: 120 }, "power2.out");
  M.pose(tScarf + 0.35, 0.25, { aLu: 18, aLf: -10 }, "power2.inOut");
  M.pose(tScarf - 0.1, 0.25, { scarf: -20 }, "back.out(2)"); M.pose(tScarf + 0.4, 0.3, { scarf: 0 }, "power2.out");
  M.mouth(tScarf, "smirk");
  // bản đồ trên tường lộn ngược
  api.origin("#bando", "0 0");
  api.key("#bando", "rotation", 0, 4); api.key("#bando", "rotation", tUps - 0.2, 4, "none"); api.key("#bando", "rotation", tUps + 0.35, 180, "back.out(1.6)");
  M.pose(tUps - 0.25, 0.2, { pupX: -11, pupY: -6 }, "power2.out");
  M.pose(tUps + 0.5, 0.15, { upRot: 8 }, "power2.out"); M.pose(tUps + 0.9, 0.2, { upRot: 0 }, "power2.out");
  // nhìn cá, run cầm cập
  M.pose(tFish - 0.2, 0.2, { pupX: 11, pupY: -4 }, "power2.out");
  M.shiver(tClear - 0.1, tFish2 - 0.2, 2.4, 16);
  M.mouth(tClear, "wobbly");
  api.sfx("brr", tClear - 0.05, 0.6);
  M.idle(tSat + 1.3, tHad - 0.1, { seed: 291, bien: 1.2, tho: false });
  // cá: thở rất nhẹ, mí cá không đổi (thanh thản)
  api.origin("#ca", "0 0");
  api.key("#ca", "rotation", 0, 0);
  for (var tc = 0.8, sc = 1; tc < tNight - 0.4; tc += 1.7, sc = -sc) api.key("#ca", "rotation", tc, sc * 1.2, "sine.inOut");
  // "I had not": run mạnh, răng đánh lập cập
  M.shiver(tHad - 0.1, tNight - 0.25, 5, 24);
  M.mouth(tHad - 0.05, "chatter");
  M.pose(tHad - 0.1, 0.12, { eye: 1.15, sy: 0.96 }, "back.out(2)");
  api.sfx("brr", tHad, 0.7);

  // ---- đóng gói (làm lại vòng 1): bản đồ, bàn chải bay vào ba lô; Wob xuống ghế, bưng cá bọc khăn từ bậu cửa sổ
  //      qua đầu như tấm ván, nhét vào ba lô; nắp bật lên 2 lần vì đuôi cá; Wob ngồi đè; khung cuối đuôi cá thò ra mép nắp (khớp d30) ----
  var BX = 1190, BY = SAN - 150, tN = tNight - 0.25;   // nén bưng/nhét để punchline giữ ≥ 0,7 s
  function bayVao(sel, x0, y0, t, dur) {
    api.key(sel, "x", 0, 0); api.key(sel, "x", t, 0, "none"); api.key(sel, "x", t + dur, BX - x0, "power1.inOut");
    api.key(sel, "y", 0, 0); api.key(sel, "y", t, 0, "none"); api.key(sel, "y", t + dur * 0.45, (BY - y0) / 2 - 160, "power2.out"); api.key(sel, "y", t + dur, BY - y0, "power2.in");
    api.key(sel, "scale", 0, 1); api.key(sel, "scale", t + dur * 0.6, 1, "none"); api.key(sel, "scale", t + dur, 0.2, "power2.in");
    api.show(sel, 0, 1); api.show(sel, t + dur, 0);
  }
  api.origin("#bl-nap", "0 -200");
  api.key("#bl-nap", "rotation", 0, 0); api.key("#bl-nap", "rotation", tN, 0, "none"); api.key("#bl-nap", "rotation", tN + 0.2, -64, "back.out(2)");
  api.key("#bando", "rotation", tN, 180, "none"); api.key("#bando", "rotation", tN + 0.4, 540, "power1.inOut");
  bayVao("#bando", 430, 390, tN, 0.4);
  api.origin("#chai", "0 0");
  bayVao("#chai", 760, 772, tN + 0.14, 0.38);
  // Wob nhảy xuống ghế, chạy tới bậu cửa sổ
  M.mouth(tN, "flat");
  M.pose(tN, 0.12, { sy: 1, eye: 1, pupX: 10, pupY: -8, legL: 0, legR: 0 }, "power2.out");
  M.pose(tN + 0.05, 0.16, { y: SAN }, "power2.in");
  M.walk(tN + 0.08, tN + 0.33, 980, 1400, { step: 0.125, arms: false });
  var tG = tN + 0.36;
  M.pose(tG - 0.04, 0.14, { aRu: -168, aRf: -10, aLu: 168, aLf: 10, sy: 1.06, pupX: 8, pupY: -14 }, "back.out(1.6)");
  // bọc khăn kẻ ô
  api.show("#ca-khan", 0, 0); api.show("#ca-khan", tG + 0.06, 1);
  api.origin("#ca-khan", "0 0"); api.pop("#ca-khan", tG + 0.04, 0.16);
  api.sfx("pop", tG + 0.06, 0.35);
  // bưng qua đầu như tấm ván (0,6 s) rồi chúc đầu cắm vào ba lô
  var FX = 1410, FY = 545, tC = tG + 0.12, tD = tC + 0.35, tI = tD + 0.1;
  function ca(t, x, y, r, e) { api.key("#ca", "x", t, x - FX, e || "power2.inOut"); api.key("#ca", "y", t, y - FY, e || "power2.inOut"); api.key("#ca", "rotation", t, r, e || "power2.inOut"); }
  api.key("#ca", "x", 0, 0); api.key("#ca", "y", 0, 0); api.key("#ca", "rotation", 0, 0); api.key("#ca", "scale", 0, 1);
  ca(tG + 0.06, 1410, 545, 0, "none");
  ca(tC, 1400, 590, -90, "back.out(1.4)");
  M.walk(tC + 0.05, tD - 0.1, 1400, 1390, { step: 0.1, arms: false });
  ca(tD - 0.12, 1360, 594, -100);
  M.pose(tC, 0.2, { sy: 1, sx: 1 }, "power2.out");
  M.mouth(tC, "o");
  ca(tD, 1196, 610, -180, "power2.inOut");
  M.pose(tD - 0.12, 0.14, { aRu: -110, aRf: -30, aLu: 100, aLf: 40 }, "power2.inOut");
  ca(tI, 1196, 700, -180, "power2.in");
  api.key("#ca", "scale", tI - 0.06, 1, "none"); api.key("#ca", "scale", tI, 0.8, "power2.in");
  api.show("#ca", 0, 1); api.show("#ca", tI, 0);
  api.show("#bl-duoi", 0, 0); api.show("#bl-duoi", tI, 1);
  api.origin("#bl-than", "0 0"); api.origin("#balo", "0 0");
  api.key("#bl-than", "scaleX", 0, 1); api.key("#bl-than", "scaleX", tI - 0.02, 1, "none"); api.key("#bl-than", "scaleX", tI + 0.16, 1.22, "back.out(2.5)");
  api.key("#bl-than", "scaleY", 0, 1); api.key("#bl-than", "scaleY", tI - 0.02, 1, "none"); api.key("#bl-than", "scaleY", tI + 0.16, 1.12, "back.out(2.5)");
  api.sfx("pop", tI, 0.5);
  // ép nắp hai lần, nắp bật lên hai lần (đuôi cá)
  api.key("#bl-nap", "y", 0, 0); api.key("#bl-nap", "y", tI + 0.1, -22, "power2.out");
  var p1 = tI + 0.1, p2 = p1 + 0.22;
  [p1, p2].forEach(function (p, k) {
    M.pose(p, 0.08, { aLu: 96, aLf: 30, upRot: -6, sy: 0.94, lean: -8 }, "power2.in");
    api.key("#bl-nap", "rotation", p, -64, "none"); api.key("#bl-nap", "rotation", p + 0.08, 0, "power2.in");
    api.key("#bl-nap", "rotation", p + 0.17, -44 + k * 6, "back.out(3)");
    M.pose(p + 0.09, 0.1, { aLu: 120, aLf: 40, upRot: 0, sy: 1.04, eye: 1.18, lean: 0 }, "back.out(2)");
    api.sfx("boing", p + 0.09, 0.55 + 0.15 * k);
  });
  M.mouth(p1 + 0.1, "wobbly");
  // nhảy lên ngồi đè
  var tJ = p2 + 0.18, tL = tJ + 0.22;
  M.pose(tJ - 0.08, 0.08, { sy: 0.88, sx: 1.08, aRu: -18, aRf: 10, aLu: 18, aLf: -10, eye: 1 }, "power2.in");
  api.key("#M", "x", tJ, 1390, "none"); api.key("#M", "x", tL, BX - 34, "power1.inOut");
  api.key("#M", "y", tJ, SAN, "none"); api.key("#M", "y", tJ + 0.12, 700, "power2.out"); api.key("#M", "y", tL, BY + 2, "power2.in");
  M.pose(tJ, 0.12, { sy: 1.08, sx: 0.95, legL: 22, legR: -22 }, "power2.out");
  M.pose(tL, 0.07, { sy: 0.84, sx: 1.12, legL: 34, legR: -34 }, "power2.in");
  M.pose(tL + 0.07, 0.25, { sy: 1, sx: 1 }, "back.out(2)");
  api.key("#bl-than", "scaleY", tL, 1.12, "none"); api.key("#bl-than", "scaleY", tL + 0.07, 0.9, "power2.in"); api.key("#bl-than", "scaleY", tL + 0.3, 1.06, "back.out(3)");
  api.key("#bl-nap", "rotation", tL, -38, "none"); api.key("#bl-nap", "rotation", tL + 0.07, -12, "power2.in");
  api.key("#bl-nap", "y", tL, -22, "none"); api.key("#bl-nap", "y", tL + 0.07, -6, "power2.in");
  // đuôi cá vẫn thò ra mép nắp, phẩy phẩy
  api.origin("#bl-duoi", "66 -186");
  api.key("#bl-duoi", "rotation", 0, 0); api.key("#bl-duoi", "rotation", tI, 0, "none");
  [0.1, 0.2].forEach(function (d, i) { api.key("#bl-duoi", "rotation", p1 + d, i % 2 ? 0 : -14, "sine.inOut"); api.key("#bl-duoi", "rotation", p2 + d, i % 2 ? 0 : -14, "sine.inOut"); });
  [0.1, 0.18, 0.26, 0.34].forEach(function (d, i) { api.key("#bl-duoi", "rotation", tL + d, i % 2 ? -8 : 10, "sine.inOut"); });
  api.key("#bl-duoi", "rotation", tL + 0.45, 0, "sine.out");
  api.sfx("boing", tL + 0.03, 0.75);
  M.mouth(tL + 0.08, "smirk");
  M.pose(tL + 0.2, 0.2, { pupX: 0, pupY: 2, lid: 12 }, "power2.out");
  M.breathe(0, DUR, 2.4);
  M.autoBlink(tSat + 1.2, tFish - 0.2, 2901);
};
