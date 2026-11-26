/* Đoạn d04 · cắt giấy · hồi ức: trên thuyền, ba lô làm thuyền nghiêng, trang sổ bản đồ hai đường thuyền.
   Vào "cat" (khung đầu đủ hình), ra "cat" (sang d05 cập bến).
   Cùng thuyền, cùng biển như d02 (sóng lớn hơn từ chương 2). Trang sổ: journalPage + mapSticker map-san-bernardo (chep_ban_do.py),
   chấm đảo vẽ bằng mapDot; nhãn chỉ hiện khi cận trang (trang ≈ 80% bề rộng khung).
   Trang phục: mũ cói; ba lô khổng lồ ở băng ghế sau, Wob ngồi lên → "I spent them" trèo xuống, kéo ba lô vắt ngang đùi
   (ba lô đè lút thân, chỉ còn mũ, đôi mắt và hai tay) → ướt sau "splashed". Bình xịt cắm túi hông trái.
   Chữ: "~2 h by boat", "45 min–1 h", "Cartagena", "Tolú", "Santa Cruz del Islote". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var cx = data.chu_tren_do_vat;
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }

  var tTo = T("I'd", 0, 2.49), tHuge = T("huge", 0, 3.06), tMis = T("mistake", 0, 5.25);
  var tBoat = T("boat", 0, 8.0), tCouple = T("couple", 0, 9.8), tSpent = T("spent", 0, 12.44), tSplash = T("splashed", 0, 16.32);
  var tShort = T("There's", 0, 17.38), tTolu = T("Tolú", 0, 18.36), tFour = T("forty-five", 0, 19.05), tDep = T("depending", 0, 22.38), tWay = T("way", 0, 24.86);
  var tIn1 = tBoat - 0.35, tOut1 = tSpent - 0.2, tIn2 = tShort - 0.15, tOut2 = tWay - 0.3;

  // ---------- trời, biển xa, đảo xanh xa (như d02) ----------
  var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#ndTroi)"/>' +
    '<circle cx="1560" cy="170" r="150" fill="#FFF4D6" opacity="0.35"/>' + D.paper(D.rEll(1560, 170, 74, 74, 1.5, 31), "#FFF0C2", { shadow: false, stroke: true, sw: 4 }) +
    at(420, 190, D.puff(60, 12, "#FFFFFF")) + at(1120, 130, D.puff(46, 15, "#FFFFFF"));
  var xa = '<rect x="-1400" y="586" width="6000" height="900" fill="#8ED5CB"/>' +
    at(180, 600, sc(0.42, ND.daoXanh({ w: 900, seed: 873 }))) + at(1900, 598, sc(0.36, ND.daoXanh({ w: 800, seed: 874 }))) +
    at(1350, 640, sc(0.4, ND.daoNhaXa({ w: 1000, seed: 851 })));
  var giua = ND.bien(api, "bs", { x0: -600, x1: 2600, y: 640, n: 3, day: 44, bien: 38, chuKy: 2.6 });

  // ---------- thuyền, ba lô, Wob ----------
  var tb = ND.thuyen("tb", {});
  var NGON = '<g id="W-ngon" opacity="0">' + D.line("M 0 6 L 0 40", 14) + D.line("M 0 6 L 0 40", 7, "#5a9fb8") + "</g>";
  // sổ nhỏ trong tay (phụ kiện trước ngực), về sau úp lên trán
  var SO = '<g id="W-so" opacity="0"><g id="W-sok">' + D.paper(D.rRect(116, 236, 84, 104, 1.5, 51), "#F6EDD6", { stroke: true, sw: 4, sx: 4, sy: 5 }) +
    D.paper(D.rRect(200, 236, 84, 104, 1.5, 52), "#F6EDD6", { stroke: true, sw: 4, sx: 4, sy: 5 }) + D.line("M 200 236 L 200 340", 4) +
    D.line("M 130 262 L 186 262 M 130 284 L 186 284 M 214 262 L 270 262", 2.5, "#9DB7C2") +
    '<g id="W-soUot" opacity="0"><path d="' + D.rEll(240, 290, 34, 26, 4, 53) + '" fill="#6E8C9C" opacity="0.45"/><path d="' + D.rEll(150, 300, 26, 22, 4, 54) + '" fill="#6E8C9C" opacity="0.4"/></g></g></g>';
  var W = ND.wob(api, "W", { lung: 0, holdR: NGON, uot: true, phuKien: SO, truocTf: "translate(394,300) rotate(-90) scale(0.9)" });
  var giot = "";
  for (var g = 0; g < 4; g++) giot += '<g id="gm' + g + '" opacity="0">' + D.tear(6) + "</g>";
  // ba lô rời (băng ghế sau) – nhóm không transform, khoá x/y/rotation/scale; tâm ba lô ở gốc
  var PK = '<g id="pkG"><g transform="scale(0.62) translate(0,215)">' + ND.baLo("pk", { uot: "pkU" }) + "</g></g>";
  var gan = '<g id="tbR">' + at(440, 940, sc(0.95, tb.sau)) + PK + W.svg + giot + at(440, 940, sc(0.95, tb.truoc)) + "</g>";
  gan += '<g id="tat">' + at(980, 930, '<g id="tatk">' + sc(1.25, ND.songTat(300, 1062)) + "</g>") + "</g>";
  gan += ND.bien(api, "bn", { x0: -700, x1: 2700, y: 880, n: 2, day: 52, mau: ["#3FA9A6", "#2B9097"], bien: 44, chuKy: 2.4 });

  // ---------- trang sổ cận cảnh (nhóm màn hình, ngoài camera) ----------
  var MW = 1120, MH = 630, mk = MW / 1920;
  var mI = [756.0 * mk, 726.7 * mk], mC = [1161.3 * mk, 72.0 * mk], mT = [1050.7 * mk, 1010.7 * mk];
  var d1 = api.duong([mC, [mC[0] - 60, mC[1] + 110], [mI[0] + 120, mI[1] - 170], [mI[0] + 26, mI[1] - 16]]);
  var d2 = api.duong([mT, [mT[0] - 70, mT[1] - 70], [mI[0] + 30, mI[1] + 14]]);
  function trang(id, uot, seed) {
    var s = '<g id="' + id + '"><g id="' + id + 'k">' + D.journalPage(1540, 960, { seed: seed });
    if (uot) { var r = D.rng(seed + 3); for (var k = 0; k < 6; k++) s += '<path d="' + D.rEll(200 + r() * 1200, 120 + r() * 760, 60 + r() * 90, 40 + r() * 70, 6, seed + 10 + k) + '" fill="#8FA9B4" opacity="0.18"/>'; }
    s += at(260, 150, D.mapSticker("ban-do/map-san-bernardo.svg", MW, MH, { id: id + "-ms", seed: seed + 1 }));
    return s;
  }
  var p1 = trang("tr1", false, 301);
  p1 += at(260, 150, '<path id="dl1" d="' + d1.den(0) + '" fill="none" stroke="#C9463A" stroke-width="8" stroke-linecap="round" stroke-dasharray="20 16"/>' +
    at(mC[0], mC[1], D.mapDot("c1", { r: 13, nhan: cx[2], co: 48, ben: "phai" })) +
    at(mI[0], mI[1], D.mapDot("i1", { r: 13, nhan: cx[4], co: 48, ben: "duoi", mau: "#F2CB57" })));
  p1 += at(1180, 840, '<g id="tag1">' + ND.theChu("", cx[0], 60, { seed: 1004 }) + "</g>") + "</g></g>";
  var p2 = trang("tr2", true, 311);
  p2 += at(260, 150, '<path d="' + d1.d + '" fill="none" stroke="#C9463A" stroke-width="8" stroke-linecap="round" stroke-dasharray="20 16" opacity="0.55"/>' +
    '<path id="dl2" d="' + d2.den(0) + '" fill="none" stroke="#2A9D8F" stroke-width="9" stroke-linecap="round" stroke-dasharray="20 16"/>' +
    at(mC[0], mC[1], D.mapDot("c2", { r: 13, nhan: cx[2], co: 48, ben: "phai" })) +
    at(mT[0], mT[1], D.mapDot("t2", { r: 13, nhan: cx[3], co: 48, ben: "phai", mau: "#2A9D8F" })) +
    at(mI[0], mI[1], D.mapDot("i2", { r: 13, nhan: cx[4], co: 48, ben: "duoi", mau: "#F2CB57" })));
  p2 += at(600, 748, '<g id="tag2">' + ND.theChu("", cx[1], 54, { seed: 1005, nen: "#E3F4F1" }) + "</g>");
  p2 += at(980, 380, '<g id="gp">' + D.tear(11) + "</g>") + "</g></g>";
  var nen = '<rect id="nenTrang" x="0" y="0" width="1920" height="1080" fill="#2B5E66" opacity="0"/>';

  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 600 }) + api.lop("giua", giua, 1, { mat: 660 }) + api.lop("gan", gan, 1.4, { mat: 940 }) +
    ND.defs() + nen + '<g id="P1">' + at(190, 60, p1) + '</g><g id="P2">' + at(190, 60, p2) + "</g>");
  api.noi({});
  ["#W-ngon", "#W-so", "#W-soUot"].forEach(function (s) { api.show(s, 0, 0); });   // khoá đầu tiên quyết định từ t = 0

  // ---------- camera: đẩy chậm suốt, lui ra trung cảnh khi ôm ba lô ----------
  api.camera([[0, 960, 560, 1.0], [tIn1, 900, 560, 1.06, "sine.inOut"], [tOut1, 760, 600, 1.12, "none"], [tSplash - 0.3, 700, 620, 1.18, "sine.inOut"],
    [tSplash, 700, 620, 1.18, "none"], [tIn2, 690, 625, 1.2, "sine.inOut"], [tOut2, 660, 560, 1.12, "none"], [DUR, 650, 560, 1.15, "sine.inOut"]]);

  // ---------- thuyền: bập bềnh mạnh hơn; nghiêng về phía ba lô ở "huge backpack" ----------
  api.origin("#tbR", "440 860");
  var tNg = tHuge - 0.05, tCan = tMis - 0.55;
  for (var tt = 0, k2 = 0; tt < DUR + 1.3; tt += 1.25, k2++) {
    if (tt > tNg - 0.9 && tt < tCan + 0.8) continue;
    api.key("#tbR", "rotation", tt, k2 % 2 ? -2.2 : 2.0, "sine.inOut"); api.key("#tbR", "y", tt, k2 % 2 ? 7 : -6, "sine.inOut");
  }
  api.key("#tbR", "rotation", tNg, 0.5, "sine.inOut"); api.key("#tbR", "rotation", tNg + 0.35, -11, "power3.in");
  api.key("#tbR", "rotation", tNg + 0.55, -9.5, "back.out(2)"); api.key("#tbR", "rotation", tCan, -10, "sine.inOut");
  api.key("#tbR", "rotation", tCan + 0.45, 1.2, "back.out(1.6)"); api.key("#tbR", "rotation", tCan + 0.8, 0, "sine.out");
  api.sfx("bonk", tNg + 0.33, 0.55);

  // ---------- ba lô rời ----------
  var PX = 222, PY = 806 - 215 * 0.62;
  api.origin("#pkG", "0 0");
  api.key("#pkG", "x", 0, PX, "step"); api.key("#pkG", "y", 0, PY, "step"); api.key("#pkG", "rotation", 0, 0, "step"); api.key("#pkG", "scale", 0, 1, "step");

  // ---------- Wob: vỗ ngực, giơ một ngón ----------
  W.set(0, { x: 753, y: 775, size: 0.66, pupX: 4, aLu: 18, aLf: -10, aRu: -18, aRf: 10, legLs: 0.6, legRs: 0.6 });
  W.pose(0.05, 0.2, { aLu: -60, aLf: -95, aRu: 60, aRf: 95, upY: -6 }, "back.out(1.6)");
  W.pose(0.3, 0.1, { aLf: -112, aRf: 112, sy: 0.96 }, "power2.in"); W.pose(0.42, 0.12, { aLf: -95, aRf: 95, sy: 1.02 }, "back.out(2)");
  W.pose(0.6, 0.1, { aLf: -112, aRf: 112, sy: 0.96 }, "power2.in"); W.pose(0.72, 0.12, { aLf: -95, aRf: 95, sy: 1 }, "back.out(2)");
  W.mouth(0.1, "grin");
  var tOne = T("one", 0, 1.6);
  W.pose(tOne - 0.3, 0.25, { aRu: -165, aRf: -6, aLu: 18, aLf: -10, upY: 0, pupX: 0, pupY: -4 }, "back.out(1.8)");
  api.show("#W-ngon", tOne - 0.25, 1);
  W.idle(0.9, tNg, { seed: 4, bien: 1.4 });
  // thuyền nghiêng: Wob khựng, nhìn về ba lô
  W.pose(tNg + 0.1, 0.3, { aRu: -18, aRf: 10, pupX: -11, eye: 1.15, lean: -6 }, "power2.out"); api.show("#W-ngon", tNg + 0.15, 0);
  W.mouth(tNg + 0.15, "flat");
  // lặng lẽ trèo sang ngồi lên ba lô
  var tC0 = tNg + 0.7, tC1 = tC0 + 0.85, tC2 = tCan - 0.05;
  W.walk(tC0, tC1, 753, 380, { step: 0.28 });
  W.pose(tC0, 0.2, { lean: -4, eye: 1 }, "power2.out");
  api.key("#W", "y", tC1, 775, "none"); api.key("#W", "y", tC1 + 0.22, 560, "power2.out"); api.key("#W", "y", tC2, 600, "power2.in");
  api.key("#W", "x", tC1 + 0.02, 380, "none"); api.key("#W", "x", tC2, 228, "sine.inOut");
  W.pose(tC2 - 0.06, 0.06, { sy: 0.88, sx: 1.08 }, "power2.in"); W.pose(tC2 + 0.02, 0.25, { sy: 1, sx: 1, lean: 0 }, "back.out(2)");
  // nhìn thẳng người xem, giữ
  W.pose(tC2 + 0.3, 0.2, { pupX: 0, pupY: 2 }, "power2.out");
  W.mouth(tC2 + 0.3, "thang");
  W.idle(tC2 + 0.4, tIn1 - 0.5, { seed: 7, bien: 1 });
  // mở sổ
  api.show("#W-so", tIn1 - 0.75, 1);
  W.pose(tIn1 - 0.8, 0.25, { aLu: -40, aLf: -60, aRu: 40, aRf: 60, pupY: 8, pupX: 0 }, "back.out(1.4)");
  W.mouth(tIn1 - 0.6, "X");
  api.sfx("lat-giay", tIn1 - 0.55, 0.55);
  W.autoBlink(0, DUR, 23);

  // ---------- cận trang 1 ----------
  function lao(sel, tIn, tOut, from) {
    api.origin(sel, from[0] + " " + from[1]);
    api.key(sel, "scale", 0, 0.12, "step"); api.key(sel, "scale", tIn, 0.12, "none"); api.key(sel, "scale", tIn + 0.35, 1, "power3.out");
    api.key(sel, "scale", tOut, 1.03, "sine.inOut"); api.key(sel, "scale", tOut + 0.3, 0.12, "power2.in");
    api.show(sel, 0, 0); api.show(sel, tIn, 1); api.show(sel, tOut + 0.3, 0);
    api.key(sel, "opacity", tOut + 0.18, 1, "none"); api.key(sel, "opacity", tOut + 0.29, 0, "power1.in");
  }
  lao("#P1", tIn1, tOut1, [330, 640]);
  api.show("#nenTrang", 0, 0); api.show("#nenTrang", tIn1 + 0.05, 0.55); api.show("#nenTrang", tOut1 + 0.2, 0);
  api.show("#nenTrang", tIn2 + 0.05, 0.55); api.show("#nenTrang", tOut2 + 0.2, 0);
  var tD1a = tCouple - 0.2, tD1b = tCouple + 0.75;
  api.moiKhung(function (t) {
    var u = Math.max(0, Math.min(1, (t - tD1a) / (tD1b - tD1a))); u = u * u * (3 - 2 * u);
    var n = api.dom && document.getElementById("dl1"); if (n) n.setAttribute("d", d1.den(u));
    var v = Math.max(0, Math.min(1, (t - (tTolu + 0.05)) / 0.75)); v = v * v * (3 - 2 * v);
    var m = api.dom && document.getElementById("dl2"); if (m) m.setAttribute("d", d2.den(v));
  });
  api.origin("#tag1", "0 0"); api.pop("#tag1", tD1b - 0.05, 0.25); api.sfx("pop", tD1b, 0.5);
  // chỉ khi thẻ đã đứng yên: sóng làm trang rung (≤ 4 px)
  var tRung = Math.max(tIn1 + 2.6, tD1b + 0.6);
  api.key("#tr1k", "y", 0, 0, "step");
  for (var q = 0, tq = tRung; tq < tOut1 - 0.1; tq += 0.16, q++) api.key("#tr1k", "y", tq, q % 2 ? -3 : 3.5, "sine.inOut");
  api.key("#tr1k", "y", tOut1, 0, "sine.out");
  api.origin("#tr1k", "770 480"); api.key("#tr1k", "rotation", 0, 0, "step");
  api.key("#tr1k", "rotation", tRung, 0, "none"); api.key("#tr1k", "rotation", tRung + 0.6, -0.6, "sine.inOut"); api.key("#tr1k", "rotation", tOut1, 0.4, "sine.inOut");
  api.key("#tr1k", "scale", 0, 1, "step"); api.key("#tr1k", "scale", tIn1 + 0.4, 1, "none"); api.key("#tr1k", "scale", tOut1, 1.035, "sine.inOut");

  // ---------- trèo xuống, kéo ba lô vắt ngang đùi ----------
  api.show("#W-so", tOut1 + 0.05, 0);
  var tX0 = tSpent + 0.15, WX = 470, WY = 790;
  W.pose(tX0 - 0.05, 0.15, { aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 8, pupY: 0 }, "power2.out");
  api.key("#W", "x", tX0, 228, "none"); api.key("#W", "y", tX0, 600, "none");
  api.key("#W", "y", tX0 + 0.18, 540, "power2.out"); api.key("#W", "y", tX0 + 0.45, WY, "power2.in"); api.key("#W", "x", tX0 + 0.45, WX, "sine.inOut");
  W.pose(tX0 + 0.42, 0.06, { sy: 0.9, sx: 1.06 }, "power2.in"); W.pose(tX0 + 0.5, 0.2, { sy: 1, sx: 1 }, "back.out(2)");
  // kéo: tay vươn sang trái tóm quai
  var tK = tX0 + 0.7, tSwap = tK + 0.75;
  W.pose(tK, 0.2, { aLu: 95, aLf: 10, lean: -8, pupX: -11 }, "power2.out");
  W.pose(tK + 0.25, 0.4, { aLu: 60, aLf: 40, lean: 4 }, "power2.inOut");
  var lap = [WX, WY - 92 * 0.66];
  api.key("#pkG", "x", tK + 0.2, PX, "none"); api.key("#pkG", "y", tK + 0.2, PY, "none"); api.key("#pkG", "rotation", tK + 0.2, 0, "none");
  api.key("#pkG", "x", tSwap, lap[0], "power2.inOut"); api.key("#pkG", "y", tSwap, lap[1], "power2.inOut"); api.key("#pkG", "rotation", tSwap, -90, "power2.inOut");
  api.key("#pkG", "scale", tK + 0.2, 1, "none"); api.key("#pkG", "scale", tSwap, 0.958, "power2.inOut");
  api.show("#pkG", 0, 1); api.show("#pkG", tSwap, 0); api.show(W.nd.truoc, tSwap, 1);
  W.pose(tSwap - 0.05, 0.12, { sy: 0.86, sx: 1.1, lean: 0 }, "power2.in"); W.pose(tSwap + 0.1, 0.3, { sy: 1, sx: 1 }, "back.out(2)");
  // vuốt nắp ba lô như vuốt đầu chó
  var tV = tSwap + 0.4;
  W.pose(tV, 0.25, { aLu: -150, aLf: 30, aRu: 150, aRf: -30, pupX: 0, pupY: 6 }, "power2.out");
  for (var v = 0, tv = tV + 0.35; tv < tSplash - 0.5; tv += 0.42, v++) {
    W.pose(tv, 0.2, { aRu: v % 2 ? 150 : 128, aRf: v % 2 ? -30 : -52 }, "sine.inOut");
  }
  W.mouth(tV + 0.2, "wobbly");
  api.origin(W.nd.truocK, "200 300");
  for (var b2 = 0, tb2 = tV + 0.2; tb2 < tSplash - 0.4; tb2 += 0.62, b2++) api.key(W.nd.truocK, "rotation", tb2, b2 % 2 ? 1.6 : -1.6, "sine.inOut");
  api.key(W.nd.truocK, "rotation", tSplash - 0.2, 0, "sine.out");

  // ---------- sóng tạt "splashed" ----------
  api.origin("#tatk", "0 0");
  api.key("#tatk", "scaleY", 0, 0, "step"); api.key("#tatk", "scaleY", tSplash - 0.55, 0, "none"); api.key("#tatk", "scaleY", tSplash - 0.05, 1, "power2.out");
  api.key("#tatk", "x", 0, 0, "step"); api.key("#tatk", "x", tSplash - 0.1, 0, "none"); api.key("#tatk", "x", tSplash + 0.25, -330, "power2.in");
  api.key("#tatk", "scaleY", tSplash + 0.1, 1, "none"); api.key("#tatk", "scaleY", tSplash + 0.5, 0, "power2.in");
  api.sfx("song", tSplash - 0.4, 0.75);
  [W.nd.uotT, "#pkU"].forEach(function (s) { api.show(s, 0, 0); api.show(s, tSplash + 0.15, 1); });
  api.show("#W-soUot", tSplash + 0.15, 1);
  W.soc(tSplash + 0.12, { mieng: "o" });
  W.shiver(tSplash + 0.3, tSplash + 0.8, 4, 16);
  // lau nước cho ba lô trước, rồi mới lau mặt mình
  var tL = tSplash + 0.85;
  for (var l = 0; l < 4; l++) W.pose(tL + l * 0.2, 0.18, { aRu: l % 2 ? 120 : 160, aRf: l % 2 ? -60 : -20 }, "sine.inOut");
  W.pose(tL, 0.2, { aLu: 18, aLf: -10 }, "power2.out");
  W.pose(tL + 0.9, 0.25, { aRu: -160, aRf: -110, pupY: -4 }, "power2.out");
  for (var l2 = 0; l2 < 3; l2++) W.pose(tL + 1.2 + l2 * 0.17, 0.15, { aRf: l2 % 2 ? -110 : -135 }, "sine.inOut");
  W.mouth(tL + 0.9, "flat");
  // nước nhỏ giọt từ ba lô và vành mũ tới hết đoạn
  for (var gi = 0; gi < 4; gi++) {
    var gx = [380, 430, 560, 600][gi], gy0 = [700, 720, 700, 640][gi], s = "#gm" + gi;
    api.origin(s, "0 0"); api.key(s, "x", 0, gx, "step");
    for (var tg = tSplash + 0.4 + gi * 0.37; tg < DUR; tg += 1.5) {
      api.key(s, "y", tg, gy0, "none"); api.key(s, "y", tg + 0.6, gy0 + 120, "power2.in");
      api.key(s, "opacity", tg, 1, "step"); api.key(s, "opacity", tg + 0.6, 0, "step");
    }
    if (tSplash + 0.4 + gi * 0.37 < DUR) api.key(s, "opacity", 0, 0, "step");
  }

  // ---------- cận trang 2 (trang ướt) ----------
  lao("#P2", tIn2, tOut2, [520, 600]);
  api.origin("#tag2", "0 0"); api.pop("#tag2", tFour - 0.2, 0.25); api.sfx("ting", tFour - 0.1, 0.55);
  // "depending on who you ask": thẻ nghiêng qua lại
  api.key("#tag2", "rotation", 0, 0, "step"); api.key("#tag2", "rotation", tDep, 0, "none");
  api.key("#tag2", "rotation", tDep + 0.3, -6, "sine.inOut"); api.key("#tag2", "rotation", tDep + 0.65, 5, "sine.inOut"); api.key("#tag2", "rotation", tDep + 1.0, 0, "sine.inOut");
  api.key("#tr2k", "scale", 0, 1, "step"); api.origin("#tr2k", "770 480");
  api.key("#tr2k", "scale", tIn2 + 0.4, 1, "none"); api.key("#tr2k", "scale", tOut2, 1.06, "sine.inOut");
  // một giọt nước chảy dọc trang
  api.origin("#gp", "0 0"); api.key("#gp", "y", 0, 0, "step"); api.key("#gp", "y", tFour + 1.4, 0, "none"); api.key("#gp", "y", tOut2, 420, "power1.in");

  // ---------- "on the way back": lui ra, Wob úp trang sổ ướt lên trán ----------
  var tU = tOut2 + 0.25;
  api.origin("#W-sok", "200 288");
  api.set("#W-sok", 0, { y: 0, rotation: 0, scale: 1 });
  api.show("#W-so", tU - 0.15, 1);
  api.key("#W-sok", "y", tU - 0.15, 60, "none"); api.key("#W-sok", "y", tU + 0.12, -170, "power3.in"); api.key("#W-sok", "rotation", tU + 0.12, -8, "power3.in");
  api.key("#W-sok", "scale", tU + 0.12, 1.15, "power3.in");
  W.pose(tU - 0.15, 0.27, { aLu: -150, aLf: -60, aRu: 150, aRf: 60 }, "power3.in");
  W.pose(tU + 0.1, 0.06, { sy: 0.9, sx: 1.05 }, "power2.in"); W.pose(tU + 0.18, 0.25, { sy: 1, sx: 1 }, "back.out(2)");
  api.sfx("bonk", tU + 0.1, 0.35);
  W.mouth(tU + 0.12, "buon");
  W.breathe(tU + 0.5, DUR);
};
