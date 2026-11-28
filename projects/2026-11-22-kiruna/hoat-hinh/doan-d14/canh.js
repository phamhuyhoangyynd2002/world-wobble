/* d14 – Đường tuyết vào làng (parallax), cột biển Jukkasjärvi + tem ~17 km · ~11 mi lướt qua tiền cảnh, toà nhà khối băng cuối đường,
   Wob ướm tấm thẻ khối băng: giống hệt; phòng băng: ngồi bó gối trên giường băng (áo khoác), điêu khắc sáng lên, thước 1900 → 1989;
   dựng thẻ vào tường, thẻ trượt úp xuống sàn; đứng dậy: vết tròn đóng sương in trên giường, xoa mông, nhìn người xem.
   Cắt giấy, nhóm A. Chữ: data.chu_tren_do_vat. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, ND = window.NhietDoi, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper, CH = data.chu_tren_do_vat;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tJuk = T("jukkasjärvi,"), tThats = T("that's"), tSat = T("sat"), tIce = T("icehotel"), t89 = T("eighty-nine"), tArt = T("art"), tThats2 = T("that's", 15), tTown = T("town.", 17),
    tWrong = T("wrong"), tBottom = T("bottom");
  var tB = T("i", 8) - 0.15;

  /* ---------- thẻ khối băng (hình, không chữ) ---------- */
  function theBang(id) {
    return '<g id="' + id + '">' + paper(D.rRect(-46, -62, 92, 70, 1.2, 1401), "#FFF8EC", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
      paper("M -32 -6 L -32 -36 C -32 -50 32 -50 32 -36 L 32 -6 Z", "#CFE6F0", { stroke: true, sw: 3, shadow: false }) + paper("M -8 -6 L -8 -24 C -8 -32 8 -32 8 -24 L 8 -6 Z", "#3E6A86", { shadow: false }) + "</g>";
  }

  /* ================= cảnh 1: đường tuyết vào làng ================= */
  var GY = 860;
  var xa = '<rect x="-1000" y="-600" width="6000" height="1600" fill="url(#xlTroiNgay)"/>' +
    paper(D.rough([[-1000, 640], [-200, 470], [600, 560], [1400, 430], [2200, 540], [3000, 450], [3800, 560], [4600, 470], [5000, 600], [5000, 900], [-1000, 900]], 6, 1410, 40), "#B9C9D3", { stroke: true, sw: 4, shadow: false });
  var giua = paper("M -1000 760 L 5000 760 L 5000 1600 L -1000 1600 Z", "#F2F6F7", { stroke: true, sw: 4, shadow: false });
  var rr = D.rng(1420);
  for (var k = 0; k < 34; k++) { var px = -900 + k * 170 + rr() * 60, ph = 90 + rr() * 80; giua += paper("M " + px.toFixed(0) + " 772 L " + (px + 36).toFixed(0) + " " + (772 - ph).toFixed(0) + " L " + (px + 72).toFixed(0) + " 772 Z", "#4E6B5C", { stroke: true, sw: 3.5, shadow: false }); }
  giua += paper("M -1000 840 C 400 828 1800 850 5000 836 L 5000 900 C 1800 912 400 896 -1000 904 Z", "#E3ECEF", { stroke: true, sw: 3, shadow: false });
  giua += at(3000, GY - 20, '<g id="nhaB">' + XL.nhaBang(760, 340, { seed: 1430 }) + "</g>");
  var W = XL.wob(api, "W", { the: 1, holdR: theBang("W-tb") });
  giua += W.svg;
  var gan = at(1990, 990, '<g transform="scale(1.15)">' + D.signBoard("sb", { w: 430, h: 110, cao: 300, chu: CH[0], co: 58 }) + '<g transform="translate(0,-190) rotate(-3)">' + ND.theChu("", CH[1], 46, { seed: 1440 }) + "</g></g>") +
    paper(D.rough([[-1000, 1010], [800, 990], [2400, 1012], [5000, 995], [5000, 1600], [-1000, 1600]], 4, 1441, 30), "#F7FBFC", { stroke: true, sw: 4, shadow: false });
  var c1 = '<g id="c1">' + api.lop("xa", xa, 1, { mat: 900 }) + api.lop("giua", giua, 1, { mat: 900 }) + api.lop("gan", gan, 1, { mat: 900 }) + "</g>";

  /* ================= cảnh 2: phòng băng ================= */
  var phong = at(-300, -300, XL.tuongBang(2520, 1160, {})) + '<rect x="-300" y="860" width="2520" height="400" fill="#EAF5F9"/>' + paper(D.rRect(-300, 850, 2520, 24, 1, 1450), "#BFE0EE", { stroke: true, sw: 4, shadow: false });
  phong += at(1480, 860, XL.dieuKhacBang("dk"));
  // thước thời gian giấy dán dọc tường băng
  phong += '<g id="thuoc">' + paper(D.rRect(260, 336, 900, 40, 1.2, 1451), "#F3E6C4", { stroke: true, sw: 4, sx: 4, sy: 6 });
  for (var x = 280; x < 1150; x += 40) phong += line("M " + x + " 338 L " + x + " " + ((x - 280) % 200 ? 352 : 362), 3, "#8E6E4A");
  phong += "</g>";
  phong += '<g id="y1900" transform="translate(300,270) rotate(-3)">' + ND.theChu("", CH[2], 52, { seed: 1452 }) + "</g>";
  phong += '<g id="y1989"><g transform="translate(1120,330)">' + paper(D.rRect(-34, -50, 68, 50, 1.2, 1453), "url(#xlBangG)", { stroke: true, sw: 4 }) + '</g><g transform="translate(1120,430) rotate(3)">' + ND.theChu("", CH[3], 52, { seed: 1454 }) + "</g></g>";
  var GB = [760, 720];
  phong += at(GB[0], GB[1], XL.giuongBang(api, "gb", 560));
  var tTuong = '<g id="theTV"><g id="theT">' + theBang("tt") + '<g id="ttLung">' + paper(D.rRect(-46, -62, 92, 70, 1.2, 1402), "#E8DCC0", { stroke: true, sw: 4, sx: 3, sy: 4 }) + "</g></g></g>";
  var B = XL.wob(api, "B", { the: 1, holdR: theBang("B-tb") });
  var khung = paper("M -300 -300 L 120 -300 L 120 1300 L -300 1300 Z", "url(#xlBangG)", { stroke: true, sw: 6, sx: 10, sy: 12 }) + paper("M 1800 -300 L 2220 -300 L 2220 1300 L 1800 1300 Z", "url(#xlBangG)", { stroke: true, sw: 6, sx: -10, sy: 12 }) +
    paper("M -300 -300 L 2220 -300 L 2220 40 C 1500 -10 400 -10 -300 40 Z", "url(#xlBangG)", { stroke: true, sw: 6, sy: 12 });
  for (var yk = -200; yk < 1300; yk += 160) khung += line("M -300 " + yk + " L 120 " + (yk + 6) + " M 1800 " + (yk + 4) + " L 2220 " + yk, 3, "#9CC6D8");
  var c2 = '<g id="c2">' + api.lop("g2", phong + tTuong + B.svg, 1, { mat: 900 }) + api.lop("khung", khung, 1, { mat: 900 }) + "</g>";

  api.dat(XL.defs() + c1 + c2);
  api.noi({});
  api.show("#c1", 0, 1); api.show("#c2", 0, 0); api.fade("#c2", tB - 0.1, 0.22, 1); api.show("#c1", tB + 0.14, 0);

  /* ---------- cảnh 1: đi bộ, parallax ---------- */
  var X0 = 300, X1 = 2560, tW0 = 0.15, tW1 = tThats - 0.5;
  W.set(0, { x: X0, y: GY, size: 0.78, aLu: 18, aLf: -10, aRu: -70, aRf: -40, pupX: 10, pupY: -2 });
  W.walk(tW0, tW1, X0, X1, { step: 0.32, tieng: true, arms: false });
  W.autoBlink(0.3, tB, 141); W.mouth(0, "flat");
  function cx(t) { var u = Math.max(0, Math.min(1, (t - tW0) / (tW1 - tW0))); u = 0.5 - 0.5 * Math.cos(Math.PI * u); return X0 + (X1 - X0) * u + 180; }
  var camG = [], camX = [], camN = [];
  for (var t = 0; t <= tW1 + 0.001; t += 0.25) { var c = cx(t); camG.push([t, c, 640, 1.22, "none"]); camX.push([t, 960 + (c - 960) * 0.35, 640, 1.22, "none"]); camN.push([t, 960 + (c - 960) * 1.3, 640, 1.22, "none"]); }
  var cEnd = cx(tW1);
  camG.push([tThats + 0.3, 2780, 620, 1.3, "power2.inOut"], [tB, 2790, 620, 1.32, "sine.inOut"]);
  camX.push([tThats + 0.3, 960 + (2780 - 960) * 0.35, 620, 1.3, "power2.inOut"], [tB, 960 + (2790 - 960) * 0.35, 620, 1.32, "sine.inOut"]);
  camN.push([tThats + 0.3, 960 + (2780 - 960) * 1.3, 620, 1.3, "power2.inOut"], [tB, 960 + (2790 - 960) * 1.3, 620, 1.32, "sine.inOut"]);
  api.camera(camG, ["giua"]); api.camera(camX, ["xa"]); api.camera(camN, ["gan"]);
  // biển lắc nhẹ khi lướt qua đúng "Jukkasjärvi,"
  api.origin("#sb-bang", "0 -300");
  api.key("#sb-bang", "rotation", 0, 0); api.key("#sb-bang", "rotation", tJuk - 0.1, 0, "none"); api.key("#sb-bang", "rotation", tJuk + 0.1, -4, "power2.out"); api.key("#sb-bang", "rotation", tJuk + 0.6, 0, "elastic.out(1,0.4)");
  W.pose(tJuk - 0.2, 0.3, { pupX: 4, pupY: -14 }, "power2.out"); W.pose(tJuk + 0.8, 0.4, { pupX: 12, pupY: -2 }, "sine.inOut");
  // tới cửa toà nhà băng: ướm thẻ so — giống hệt
  W.pose(tW1 + 0.05, 0.3, { aRu: -150, aRf: -10, pupX: 14, pupY: -8 }, "power2.out");
  W.pose(tThats + 0.4, 0.3, { pupX: 6, pupY: -12, eye: 1.08 }, "sine.inOut");
  api.key("#W-up", "rotation", 0, 0);
  [0.9, 1.1, 1.3, 1.5].forEach(function (d, i) { api.key("#W-up", "rotation", tThats + d, i % 2 ? 0 : 6, "sine.inOut"); });
  W.mouth(tThats + 0.9, "smirk");

  /* ---------- cảnh 2: phòng băng ---------- */
  api.camera([[tB, 900, 560, 1.12], [tSat + 0.5, 880, 560, 1.16, "sine.inOut"], [tIce, 860, 520, 1.12, "sine.inOut"], [tArt - 0.3, 900, 520, 1.08, "sine.inOut"], [tWrong - 0.3, 920, 560, 1.12, "sine.inOut"],
    [tBottom - 0.2, 860, 600, 1.2, "sine.inOut"], [DUR, 820, 600, 1.26, "sine.inOut"]], ["g2"]);
  var BX0 = 380, BY0 = 870;
  B.set(0, { x: BX0, y: BY0, size: 0.82, aLu: 18, aLf: -10, aRu: -60, aRf: -30, pupX: 12, pupY: -4 });
  B.autoBlink(tB + 0.3, DUR, 142); B.mouth(0, "flat");
  // nhảy lên giường, ngồi bó gối (vẫn mặc áo khoác)
  var tN = tSat - 0.05, SY = GB[1] - 22;
  B.pose(tN - 0.15, 0.12, { sy: 0.9, sx: 1.08 }, "power2.in");
  api.key("#B", "x", tN, BX0, "none"); api.key("#B", "x", tN + 0.4, GB[0] - 60, "sine.inOut");
  api.key("#B", "y", tN, BY0, "none"); api.key("#B", "y", tN + 0.2, SY - 120, "power2.out"); api.key("#B", "y", tN + 0.4, SY, "power2.in");
  B.pose(tN + 0.38, 0.12, { upY: 70, legL: 70, legR: -70, sy: 0.92, sx: 1.06, aLu: -40, aLf: -84, aRu: 40, aRf: 84 }, "power2.out");
  B.pose(tN + 0.5, 0.25, { sy: 1, sx: 1, pupX: 0, pupY: -14 }, "back.out(2)");
  api.sfx("tach-bang", tN + 0.4, 0.5);
  B.shiver(tN + 0.6, tN + 1.4, 1.2, 14);
  B.breathe(tN + 1.5, tWrong - 0.4, 2.4);
  // thước: 1989 ở đầu phải, điêu khắc sáng lên, 1900 ở đầu trái, mắt đưa từ đầu này sang đầu kia
  api.origin("#thuoc", "260 356");
  api.key("#thuoc", "scaleX", 0, 0); api.key("#thuoc", "scaleX", tIce, 0, "none"); api.key("#thuoc", "scaleX", tIce + 0.5, 1, "power2.out");
  api.pop("#y1989", t89 - 0.1, 0.25);
  B.pose(t89 - 0.1, 0.3, { pupX: 12, pupY: -14 }, "power2.inOut");
  api.show("#dk-sang", 0, 0); api.fade("#dk-sang", tArt - 0.1, 0.4, 1);
  for (var g = 0, tg = tArt + 0.4; tg < DUR; tg += 0.6, g++) api.key("#dk-sang", "opacity", tg, g % 2 ? 1 : 0.75, "sine.inOut");
  B.pose(tArt - 0.1, 0.3, { pupX: 16, pupY: 0 }, "power2.inOut");
  api.pop("#y1900", tThats2 - 0.1, 0.25);
  B.pose(tThats2 + 0.2, 0.5, { pupX: -14, pupY: -14 }, "sine.inOut"); B.pose(tThats2 + 0.9, 0.5, { pupX: 12, pupY: -14 }, "sine.inOut"); B.pose(tTown, 0.4, { pupX: -10, pupY: -12 }, "sine.inOut");
  // "Wrong again.": dựng thẻ vào tường, thẻ trượt úp xuống sàn
  var TX = GB[0] + 150, TY = GB[1] - 8;
  B.pose(tWrong - 0.3, 0.25, { aRu: -60, aRf: -10, pupX: 14, pupY: 0 }, "power2.out");
  api.show("#B-tb", 0, 1); api.show("#B-tb", tWrong, 0);
  api.key("#theTV", "x", 0, TX); api.key("#theTV", "y", 0, TY);
  api.show("#theT", 0, 0); api.show("#theT", tWrong, 1); api.show("#ttLung", 0, 0);
  api.origin("#theT", "0 8");
  api.key("#theT", "rotation", 0, 10); api.key("#theT", "x", 0, 0); api.key("#theT", "scaleY", 0, 1);
  api.key("#theT", "rotation", tWrong + 0.45, 10, "none"); api.key("#theT", "rotation", tWrong + 0.95, 26, "power1.in");
  api.key("#theT", "x", tWrong + 0.45, 0, "none"); api.key("#theT", "x", tWrong + 0.95, 18, "power1.in");
  api.key("#theT", "scaleY", tWrong + 0.95, 1, "none"); api.key("#theT", "scaleY", tWrong + 1.2, 0.3, "power2.in");
  api.key("#theT", "rotation", tWrong + 1.2, 0, "power2.in");
  api.show("#ttLung", tWrong + 1.08, 1);
  api.sfx("lat-giay", tWrong + 1.15, 0.4);
  B.pose(tWrong + 0.1, 0.3, { aRu: 40, aRf: 84, pupX: 14, pupY: 10 }, "power2.inOut"); B.mouth(tWrong + 0.4, "thang");
  // "My bottom agreed.": từ từ đứng thẳng dậy, vết tròn đóng sương in trên giường, xoa mông, nhìn người xem
  var tD = tBottom - 0.2;
  B.pose(tD, 0.6, { upY: 0, legL: 0, legR: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "sine.inOut");
  api.key("#B", "x", tD, GB[0] - 60, "none"); api.key("#B", "x", tD + 0.6, GB[0] - 360, "sine.inOut");
  api.key("#B", "y", tD, SY, "none"); api.key("#B", "y", tD + 0.3, SY - 60, "power2.out"); api.key("#B", "y", tD + 0.6, BY0, "power2.in");
  api.show("#gb-vet", tD + 0.3, 1);
  B.pose(tD + 0.75, 0.2, { pupX: 16, pupY: 10, eye: 1.1 }, "power2.out"); B.mouth(tD + 0.75, "o");
  for (var x2 = 0; x2 < 3; x2++) { B.pose(tD + 0.9 + x2 * 0.22, 0.11, { aRu: -150, aRf: -60 }, "sine.inOut"); B.pose(tD + 1.01 + x2 * 0.22, 0.11, { aRu: -130, aRf: -80 }, "sine.inOut"); }
  B.pose(tD + 1.6, 0.3, { aRu: -18, aRf: 10, pupX: 0, pupY: 2, eye: 1 }, "power2.inOut"); B.mouth(tD + 1.6, "flat");
};
