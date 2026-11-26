/* Đoạn d20 · cắt giấy · hồi ức: một ngày đếm bằng thuyền, cầu tàu gỗ lúc bình minh hồng.
   Vào "giay" (lớp bật dựng), ra "cat" (sang d21 vẽ tay).
   Shot: thuyền gỗ chất lưới rời bến, camera lướt theo về Wob ngái ngủ (mũ lệch) gạch một vạch vào sổ → CẬN sổ: cột cá, cột mũ khách
         đuổi kịp → Wob nhướng mắt → khoác khăn tắm, cầm xà phòng, vặn vòi tưởng tượng: không gì chảy → nhìn quanh: chỉ san hô, biển
         → TOÀN CẢNH thuyền tiếp tế xám chở bồn nước xanh cập bến, người dân chuyền can → TRUNG CẢNH Wob đứng cuối hàng chìa xà phòng.
   Trang phục: mũ cói lệch; không mang ba lô (để ở chỗ ngủ); sổ + bút chì; từ "I wanted a shower" khăn tắm vắt vai, xà phòng. Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, B = window.NhietDoiB, at = api.at, DUR = api.DUR, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  var Y = 800, SW = 0.55;

  // ---------- trời bình minh hồng (tĩnh) ----------
  var troi = '<rect width="1920" height="1080" fill="url(#skyHong)"/>';
  // ---------- lớp xa: mặt trời sắp mọc, đảo xanh xa, biển xa ----------
  var xa = '<circle cx="420" cy="560" r="170" fill="#FBD3B0" opacity="0.45"/>' + D.paper("M 330 560 C 330 490 510 490 510 560 Z", "#FBE2B8", { shadow: false, stroke: true, sw: 3 }) +
    '<rect x="-1400" y="556" width="6000" height="900" fill="#B9C9D6"/>' + D.line("M -1400 556 L 4600 556", 3, INK, ' opacity="0.35"') +
    at(1350, 562, sc(0.34, ND.daoXanh({ w: 900, seed: 2001 }))) + at(2500, 560, sc(0.28, ND.daoXanh({ w: 800, seed: 2002 })));
  for (var m = 0; m < 5; m++) xa += at(-100 + m * 640, 200 + (m % 2) * 70, D.paper(D.rEll(0, 0, 150, 26, 3, 2010 + m), "#F7D7D4", { shadow: false, stroke: true, sw: 2 }));

  // ---------- lớp giữa: biển, thuyền chất lưới, thuyền tiếp tế, cầu tàu, san hô, người, Wob ----------
  var bien = ND.bien(api, "bs", { x0: -1400, x1: 4200, y: 600, n: 3, day: 52, mau: ["#A7C6CF", "#86B2BE", "#679DAD"], bien: 18 });
  // thuyền gỗ + đống lưới + phao
  var tb = ND.thuyen("tb", { mau: "#C9463A" });
  var luoi = "M -300 -190 C -260 -290 -120 -320 -20 -300 C 80 -320 220 -300 280 -200 Z";
  var luoiSvg = D.paper(luoi, "#6E8F7A", { stroke: true, sw: 5, sx: 5, sy: 6 }) + '<path d="' + luoi + '" fill="url(#luoiP)" opacity="0.7"/>';
  for (var f = 0; f < 6; f++) luoiSvg += '<circle cx="' + (-230 + f * 90) + '" cy="' + (-232 - (f % 2) * 30) + '" r="16" fill="#F2A65A" stroke="' + INK + '" stroke-width="3"/>';
  var thuyen = '<g id="tbG">' + sc(0.52, tb.sau + luoiSvg + tb.truoc) + "</g>";
  var tiepTe = '<g id="ttG">' + sc(0.62, D.supplyBoat("tt", { dai: 760, bon: 4 })) + "</g>";
  var cau = D.dock(-600, 3000, Y, { day: 36, coc: 240, seed: 2020 });
  var sanHo = at(2620, Y + 40, D.coralRock(300, 70, 2031)) + at(2900, Y + 50, D.coralRock(240, 54, 2032)) + at(3150, Y + 44, D.coralRock(320, 76, 2033));
  // người dân chuyền can nước (dạng chung)
  var NG = [2060, 2190, 2320];
  var nguoi = NG.map(function (x, i) { return B.nguoiDat(api, "p" + i, 3700 + i * 160, Y + 2, 0.72, { ao: ["#5FA8D3", "#E9806E", "#86CFB0"][i], quan: "#3E4A50", lat: -1 }); }).join("");
  var cans = "";
  for (var c = 0; c < 3; c++) cans += '<g id="can' + c + '" opacity="0">' + sc(1.1, D.waterCan(c === 1 ? "#E8E4D6" : null)) + "</g>";
  // sổ + bút chì (sổ là đồ rời trước ngực Wob; bút trong tay phải)
  var FISH = "", HATS = "", TALLY = "";
  for (var i = 0; i < 5; i++) {
    FISH += at(48, 198 - i * 38, D.sketchIcon("ca", 1.3, "#2F72B5"));
    HATS += at(118, 198 - i * 38, '<g id="mu' + i + '">' + D.sketchIcon("mu", 1.3, INK) + "</g>");
  }
  for (var tl = 0; tl < 4; tl++) TALLY += D.line("M " + (30 + tl * 16) + " 30 L " + (32 + tl * 16) + " 74", 3.5, INK);
  TALLY += '<g id="vach">' + D.line("M 94 30 L 96 74", 3.5, INK) + "</g>";
  var trai = TALLY + at(80, 140, D.sketchIcon("thuyen", 1.8, INK)) + D.line("M 20 194 C 60 186 100 200 140 192", 2.5, "#2F72B5");
  var so = '<g id="soG">' + D.sketchbook("sb", 320, 230, { trai: trai, phai: FISH + HATS + D.line("M 20 216 L 150 216", 2.5, INK) }) + "</g>";
  var BUT = '<g id="W-but"><g transform="rotate(-30)">' + D.pencil(120, {}) + "</g></g>", XP = '<g id="W-xp" opacity="0">' + D.soapBar() + "</g>";
  var W = ND.wob(api, "W", { lung: 0, truoc: 0, holdR: BUT + XP, phuKien: '<g id="W-khan" opacity="0">' + D.towelDrape("#2A9D8F") + "</g>" });

  var XW = 1480;
  var giua = bien + thuyen + tiepTe + cau + sanHo + nguoi + cans + W.svg + at(XW + 4, Y - 6, sc(0.45, so));
  var gan = ND.bien(api, "bg", { x0: -1400, x1: 4600, y: 1010, n: 2, day: 40, mau: ["#7FAEBB", "#5E97A8"], bien: 26 }) +
    at(-60, 1080, '<g>' + D.woodPost(300, 2041) + "</g>");
  api.dat(D.defsNhietDoi() + ND.defs() + troi + api.lop("xa", xa, 0.35, { mat: 560 }) + api.lop("giua", giua, 1, { mat: Y }) + api.lop("gan", gan, 1.4, { mat: 1080 }));
  api.noi({ vaoDai: 0.55 });

  // ---------- mốc lời ----------
  var tBoats = T("boats.", 0, 2.58), tEarliest = T("earliest", 0, 3.59), tLeaves = T("leaves", 0, 4.06), tNets = T("nets.", 0, 5.85);
  var tFishing = T("Fishing", 0, 6.61), tTourism = T("tourism", 0, 7.17), tAccounts = T("accounts,", 0, 10.0), tCatching = T("catching", 0, 11.3), tFish = T("fish.", 0, 12.07);
  var tProblem = T("problem.", 0, 13.81), tShower = T("shower,", 0, 15.05), tWanted = T("wanted", 0, 14.78), tNo = T("no", 0, 16.02), tIsland = T("island.", 0, 17.15);
  var tRiver = T("river,", 0, 18.23), tSpring = T("spring,", 0, 18.98), tCoral = T("coral", 0, 19.96), tSalt = T("salt.", 0, 20.44);
  var tNavy = T("Navy", 0, 21.94), tColom = T("Colombian", 0, 21.41), tDrinking = T("drinking", 0, 22.77), tIslands = T("islands", 0, 23.85);

  // ---------- camera ----------
  var SBX = XW + 4, SBY = Y - 6 - 0.45 * 118;   // tâm sổ
  api.camera([
    [0, 760, 640, 1.28], [tEarliest - 0.3, 800, 640, 1.3, "sine.inOut"],
    [tNets - 0.35, XW - 20, 640, 1.42, "power2.inOut"],                 // lướt theo thuyền về Wob
    [tFishing - 0.3, XW - 10, 650, 1.46, "sine.inOut"],
    [tFishing + 0.35, SBX, SBY, 4.6, "power3.out"],                     // CẬN sổ: hai cột hình
    [tFish + 0.1, SBX, SBY + 2, 4.8, "sine.inOut"],
    [tFish + 0.45, XW, 660, 2.0, "power2.inOut"],                        // Wob nhướng mắt
    [tProblem + 0.3, XW, 650, 1.6, "sine.inOut"],
    [tShower - 0.2, XW + 10, 660, 1.7, "sine.inOut"],
    [tIsland + 0.2, XW + 10, 662, 1.75, "sine.inOut"],
    [tRiver + 0.6, 2040, 690, 1.18, "power2.inOut"],                     // chỉ san hô và biển
    [tSalt + 0.2, 2090, 690, 1.2, "sine.inOut"],
    [tColom - 0.1, 2150, 560, 0.86, "power2.inOut"],                    // TOÀN CẢNH thuyền tiếp tế
    [tDrinking + 0.3, 2160, 570, 0.9, "sine.inOut"],
    [tIslands - 0.5, 1990, 690, 1.5, "power2.inOut"],                   // TRUNG CẢNH Wob cuối hàng
    [DUR, 1985, 692, 1.56, "sine.inOut"]
  ]);

  // ---------- thuyền chất lưới rời bến (lướt sang phải, ra xa) ----------
  api.set("#tbG", 0, { x: 760, y: Y - 22 });
  api.origin("#tbG", "0 0");
  for (var tt = 0, k = 0; tt < DUR; tt += 1.3, k++) api.key("#tbG", "rotation", tt, k % 2 ? 1.2 : -1.2, "sine.inOut");
  api.key("#tbG", "x", tEarliest - 0.2, 760, "none"); api.key("#tbG", "x", tNets - 0.2, 1700, "sine.inOut"); api.key("#tbG", "x", tNets + 3.4, 3400, "power1.in");
  api.key("#tbG", "y", tNets - 0.2, Y - 22, "none"); api.key("#tbG", "y", tNets + 3.4, Y - 70, "sine.in");
  api.key("#tbG", "scale", tNets - 0.2, 1, "none"); api.key("#tbG", "scale", tNets + 3.4, 0.6, "sine.in");
  api.sfx("song", 0.3, 0.45); api.sfx("song", tLeaves, 0.4);

  // ---------- người dân đi ra cầu tàu đón thuyền ----------
  NG.forEach(function (x, i) { B.nguoiDi(api, "p" + i, tColom - 0.9 + i * 0.12, tNavy + 0.4 + i * 0.12, x, { buoc: 0.3 }); });
  // ---------- thuyền tiếp tế cập bến ----------
  api.set("#ttG", 0, { x: 3900, y: Y - 18 });
  api.key("#ttG", "x", tColom - 0.6, 3900, "none"); api.key("#ttG", "x", tNavy + 0.5, 2620, "power3.out");
  api.origin("#ttG", "0 0");
  for (var t2 = tNavy + 0.5, k2 = 0; t2 < DUR; t2 += 1.1, k2++) api.key("#ttG", "rotation", t2, k2 % 2 ? 0.8 : -0.8, "sine.inOut");
  api.sfx("song", tNavy, 0.45);
  // chuyền can: thuyền → p2 → p1 → p0 → đặt xuống cạnh Wob
  var HAND = [2620, 2320, 2190, 2060, 1990], HY = Y - 150;
  for (var c2 = 0; c2 < 3; c2++) {
    var sel = "#can" + c2, t0 = tDrinking - 0.2 + c2 * 0.42;
    api.set(sel, 0, { x: HAND[0], y: Y - 160, opacity: 0 });
    api.key(sel, "opacity", t0, 1, "step");
    for (var h = 1; h < HAND.length; h++) {
      var ta = t0 + (h - 1) * 0.34, tb2 = ta + 0.3;
      api.key(sel, "x", ta, HAND[h - 1], "none"); api.key(sel, "x", tb2, HAND[h], "sine.inOut");
      api.key(sel, "y", ta, HY, "none"); api.key(sel, "y", ta + 0.15, HY - 40, "sine.out"); api.key(sel, "y", tb2, h === HAND.length - 1 ? Y - 50 : HY, "sine.in");
      if (h < 4) { var who = "#p" + (3 - h) + "-tayR"; api.key(who, "rotation", ta, 0, "none"); api.key(who, "rotation", ta + 0.15, -60, "sine.out"); api.key(who, "rotation", tb2 + 0.1, 0, "sine.in"); }
    }
    api.key(sel, "opacity", t0 + 4 * 0.34 + 0.6, 1, "none"); api.key(sel, "opacity", t0 + 4 * 0.34 + 0.65, 0, "step");
  }

  // ---------- Wob ngái ngủ trên cầu tàu ----------
  W.set(0, { x: XW, y: Y + 4, size: SW, aLu: -32, aLf: -62, aRu: 34, aRf: 58, pupY: 4, op: 1 });
  api.set("#W-mu", 0, { rotation: -14, y: 10 });
  W.lid(0, 0.01, 32);
  W.mouth(0, "flat");
  W.idle(0.3, tNets - 0.6, { seed: 3, bien: 1.4 });
  W.pose(1.4, 0.4, { upRot: -6, lean: -3 }, "sine.inOut"); W.pose(2.3, 0.5, { upRot: 0, lean: 0 }, "sine.inOut");   // gà gật
  W.pose(tLeaves - 0.2, 0.3, { pupX: -12, pupY: 0 }, "power2.out");
  // gạch một vạch
  api.origin("#vach", "94 30");
  api.key("#vach", "scaleY", 0, 0, "step"); api.key("#vach", "scaleY", tNets - 0.1, 0, "none"); api.key("#vach", "scaleY", tNets + 0.25, 1, "power2.out");
  W.pose(tNets - 0.3, 0.2, { aRu: 50, aRf: 70, pupX: 2, pupY: 12 }, "power2.out");
  W.pose(tNets - 0.1, 0.35, { aRu: 40, aRf: 62 }, "power2.inOut");
  W.pose(tNets + 0.4, 0.25, { aRu: 34, aRf: 58 }, "power2.out");
  // cột mũ đuổi kịp cột cá
  var tMu = [tFishing + 0.7, tTourism + 0.9, tAccounts, tAccounts + 0.9, tCatching + 0.45];
  for (var q = 0; q < 5; q++) { api.origin("#mu" + q, "0 0"); api.pop("#mu" + q, tMu[q], 0.22); }
  api.sfx("pop", tMu[4], 0.4);
  // nhướng mắt
  var tBrow = tFish + 0.45;
  W.pose(tBrow, 0.22, { eyeL: 1.18, eyeR: 0.9, upRot: 5, pupX: 8, pupY: 6, lid: 6 }, "back.out(2)");
  W.mouth(tBrow, "smirk");
  W.pose(tProblem + 0.1, 0.3, { eyeL: 1, eyeR: 1, upRot: 0, pupX: 0, pupY: 0 }, "power2.inOut");
  W.mouth(tProblem, "flat");
  W.idle(tBrow + 0.6, tWanted - 0.4, { seed: 5, bien: 1.6 });
  // khăn tắm, xà phòng; cất sổ
  api.origin("#soG", "160 230");
  api.key("#soG", "scale", tWanted - 0.45, 1, "none"); api.key("#soG", "scale", tWanted - 0.2, 0, "power2.in");
  api.show("#W-khan", 0, 0); api.show("#W-but", 0, 1); api.show("#W-xp", 0, 0);
  api.show("#W-khan", tWanted - 0.1, 1); api.show("#W-but", tWanted - 0.1, 0); api.show("#W-xp", tWanted - 0.1, 1);
  W.pose(tWanted - 0.45, 0.3, { aLu: 18, aLf: -10, aRu: -30, aRf: 20, sy: 1.05 }, "power2.inOut");
  W.lid(tWanted - 0.2, 0.2, 0);
  W.mouth(tWanted, "grin");
  // vặn vòi tưởng tượng giữa không trung: không gì chảy ra
  W.pose(tShower + 0.1, 0.3, { aLu: 86, aLf: 40, pupX: -8, pupY: -8 }, "back.out(1.4)");
  for (var tv = tShower + 0.45, v = 0; tv < tNo + 0.6; tv += 0.26, v++) api.key("#W-hL", "rotation", tv, v % 2 ? 0 : -70, "sine.inOut");
  api.key("#W-hL", "rotation", tNo + 0.9, 0, "power2.out");
  api.sfx("im-lang", tNo, 0.6);
  W.mouth(tNo, "o");
  W.pose(tNo + 0.6, 0.3, { pupX: -10, pupY: -12, eye: 1.1 }, "power2.out");      // nhìn bàn tay
  W.mouth(tIsland, "flat");
  W.pose(tIsland + 0.2, 0.35, { aLu: 18, aLf: -10, eye: 1 }, "power2.inOut");
  W.nhinQuanh(tRiver - 0.2, { nhip: 0.5 });
  W.pose(tCoral, 0.3, { pupX: 12, pupY: 4 }, "power2.out");
  W.idle(tRiver + 1.2, tNavy, { seed: 6, bien: 1.8 });
  // đứng cuối hàng chìa xà phòng xin nước
  W.walk(tDrinking - 0.4, tDrinking + 0.5, XW, 1880, { step: 0.28, arms: false });
  W.pose(tIslands - 0.4, 0.3, { aRu: -84, aRf: -6, pupX: 10, pupY: -6, lean: 4 }, "back.out(1.6)");
  W.mouth(tIslands - 0.3, "smirk");
  W.pose(tIslands + 0.6, 0.25, { pupX: 0, pupY: 0 }, "power2.out");
  W.autoBlink(tWanted, DUR, 91);
};
