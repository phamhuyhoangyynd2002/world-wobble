/* Đoạn d09 · cắt giấy · hồi ức: buổi sáng giữa biển xám, một đám mây đứng yên trên chân trời khi mọi đám mây khác trôi;
   sương tan, dưới mây là hình nón núi lửa (mũ trùm Wob bay ngược ra sau); tàu cá neo ngoài khơi, Wob ở mạn tàu nhìn xuống xuồng
   nhấp nhô; cần cẩu thả thùng hàng xuống xuồng, hai người giấy chung đỡ thùng; Wob bước xuống thang dây đúng lúc xuồng nảy lên;
   "met halfway": nhìn từ trên, Wob bẹp dán đáy xuồng như con tem, ba lô nhỏ rơi đè lên. Áo mưa ướt bóng từ cú va.
   Vào "cat" (từ d08 vẽ tay), ra "cat" (sang d10 vẽ tay: Wob ngồi xuồng, mũ trùm lên, áo ướt). Không chữ trên hình. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, DUR = api.DUR, at = TD.at, M = TD.M;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tA2 = T("There", 0, 4.61), tB = T("Then", 1, 7.2), tBig = T("Big", 0, 10.74), tStep = T("stepped", 0, 17.08), tHalf = T("halfway.", 0, 20.04);

  // =================== A: mũi tàu, chân trời ===================
  var xa = "";
  xa += at(1300, 704, '<g id="nuiA" opacity="0">' + TD.nui({ w: 900, h: 380, seed: 9101, mau: "#7C8A6A", mau2: "#6E7C5C", mauDinh: "#8A7464" }) + "</g>");
  var suong = [[880, 724, 520, 9171], [1300, 732, 640, 9172], [1720, 726, 560, 9173], [1080, 560, 480, 9174], [1520, 570, 520, 9175], [1300, 450, 360, 9176]];
  suong.forEach(function (m, j) { xa += '<g id="sg' + j + '">' + at(m[0], m[1], TD.may(m[2], { seed: m[3], mau: "#D3D7D1", cao: m[2] * 0.42 })) + "</g>"; });
  var mayDi = [[300, 210, 360, 9111], [820, 150, 300, 9112], [1820, 190, 420, 9113], [2300, 260, 320, 9114], [-200, 300, 280, 9115]];
  mayDi.forEach(function (m, j) { xa += '<g id="mD' + j + '">' + at(m[0], m[1], TD.may(m[2], { seed: m[3], mau: "#E4E7E2" })) + "</g>"; });
  xa += '<g id="mayDung">' + at(1306, 352, TD.may(400, { seed: 9120, mau: "#EEF0EB", cao: 120 })) + "</g>";
  var giua = TD.bien(api, "bA", { x0: -1000, x1: 3000, y: 704, n: 4, day: 44 });
  var gan = "";
  gan += D.paper("M -400 1200 L -400 868 L 600 864 C 760 860 880 846 980 812 C 940 900 880 1000 800 1200 Z", "#2F4150", { stroke: true, sw: 6, sx: 8, sy: 10, half: 0.08 });
  gan += D.line("M -400 900 L 600 896 C 760 892 870 878 960 846", 8, "#EDEBE4");
  var WA = TD.wob(api, "WA", { muTrum: 1 });
  var deckA = WA.svg;
  for (var px = -380; px < 900; px += 120) deckA += D.line("M " + px + " " + (px < 600 ? 866 : 866 - (px - 600) * 0.18) + " L " + px + " " + (px < 600 ? 790 : 790 - (px - 600) * 0.18), 6, "#9AA4A6");
  deckA += D.line("M -400 790 L 600 788 C 760 784 870 770 970 738", 7, "#B9BDBE");
  gan = deckA + gan;

  // =================== B: tàu neo, xuồng, thang dây ===================
  var b = '<g id="sB"><rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiSang)"/>';
  b += '<g id="sBx">' + at(320, 780, TD.nui({ w: 560, h: 240, seed: 9101, mau: "#8C987C", mau2: "#7E8A6E", mauDinh: "#968070" })) + at(330, 560, TD.may(240, { seed: 9120, mau: "#EEF0EB", cao: 90 })) +
    at(1300, 300, TD.may(500, { seed: 9131, mau: "#E4E7E2" })) + "</g>";
  b += '<g id="sBg">';
  b += TD.bien(api, "bB", { x0: -800, x1: 2800, y: 780, n: 4, day: 40 });
  b += '<g id="tauG">' + at(1300, 806, TD.tauCa("tau", { day: -520 })) + "</g>";
  b += '<path id="dayCau" d="M 830 286 L 830 400" stroke="' + D.INK + '" stroke-width="4" fill="none"/>';
  b += '<g id="thungG">' + TD.thung(84, 9141) + "</g>";
  b += at(905, 640, TD.thangDay(190));
  var WB = TD.wob(api, "WB", { muTrum: 1 });
  var xu = ND.thuyen("xu", { mau: "#5E7F8C", vien: "#E9E3D2" });
  var nA = ND.nguoi("nA", { ao: "#D9A43A", quan: "#3B4A52", da: "#B98563" }), nB = ND.nguoi("nB", { ao: "#3F6E9A", quan: "#3B4A52", da: "#8E6A4E" });
  b += '<g id="xuG"><g transform="translate(860,846) scale(0.42)">' + xu.sau + at(-170, -150, '<g transform="scale(0.78)">' + nA + "</g>") + at(220, -160, '<g transform="scale(0.78)">' + nB + "</g>") + "</g>";
  b += '<g id="thungTrong" opacity="0">' + at(890, 790, TD.thung(84, 9142)) + "</g>";
  b += "</g>";
  b += WB.svg;
  b += '<g id="xuF"><g transform="translate(860,846) scale(0.42)">' + xu.truoc + "</g></g>";
  b += "</g>";
  b += '<g id="sBn">' + D.line("M -100 1060 C 300 1040 700 1070 2100 1050", 30, "#5D7074", ' opacity="0.6"') + "</g>";
  b += "</g>";

  // =================== C: nhìn từ trên: Wob dán đáy xuồng như con tem ===================
  var c = '<g id="sC"><g id="sCk"><rect x="-200" y="-200" width="2400" height="1500" fill="#7A8B8F"/>';
  var rr = D.rng(9151);
  for (var w = 0; w < 26; w++) c += D.line("M " + D.f1(-100 + rr() * 2100) + " " + D.f1(rr() * 1100) + " c 24 -10 48 10 72 0", 5, "#B9C4C4", ' opacity="0.55"');
  c += D.paper(D.rEll(960, 540, 640, 330, 3, 9152), "#5E7F8C", { stroke: true, sw: 8, sx: 14, sy: 18 });
  c += D.paper(D.rEll(960, 540, 580, 280, 3, 9153), "#8A6440", { stroke: true, sw: 6, shadow: false });
  for (var pl = 400; pl < 1540; pl += 70) c += D.line("M " + pl + " 290 L " + pl + " 790", 3, "#5E4228", ' opacity="0.55"');
  c += D.paper(D.rRect(440, 470, 60, 140, 1.5, 9154), "#6E5236", { stroke: true, sw: 4, shadow: false }) + D.paper(D.rRect(1420, 470, 60, 140, 1.5, 9155), "#6E5236", { stroke: true, sw: 4, shadow: false });
  c += at(560, 440, TD.thung(90, 9156)) + at(1370, 690, TD.thung(80, 9157));
  var tem = "", nT = 0;
  for (var tx = -190; tx <= 190; tx += 24) { tem += '<circle cx="' + tx + '" cy="-230" r="9" fill="#8A6440"/><circle cx="' + tx + '" cy="230" r="9" fill="#8A6440"/>'; nT++; }
  for (var ty = -206; ty <= 206; ty += 24) tem += '<circle cx="-200" cy="' + ty + '" r="9" fill="#8A6440"/><circle cx="200" cy="' + ty + '" r="9" fill="#8A6440"/>';
  c += '<g id="temG">' + D.paper("M -200 -230 L 200 -230 L 200 230 L -200 230 Z", "#FBF5E6", { stroke: false, sx: 8, sy: 10 }) + tem + D.line("M -170 -200 L 170 -200 L 170 200 L -170 200 Z", 3, "#C9463A", ' opacity="0.6"') + "</g>";
  var WT = TD.wob(api, "WT", { muTrum: 1, uot: true });
  c += WT.svg;
  c += '<g id="blRoi">' + TD.baLoNho("blr") + "</g>";
  c += '<g id="vang">' + [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1.3]].map(function (v, j) { return at(960 + v[0] * 240, 560 + v[1] * 170, '<g id="vg' + j + '"><path d="M 0 0 C -8 12 -9 22 0 26 C 9 22 8 12 0 0 Z" fill="#CFE6EE" stroke="' + D.INK + '" stroke-width="3"/></g>'); }).join("") + "</g>";
  c += "</g></g>";

  api.dat(TD.defs() + ND.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiSang)"/>' +
    api.lop("xa", xa, 0.3, { mat: 704 }) + api.lop("giua", giua, 1, { mat: 704 }) + api.lop("gan", gan, 1.35, { mat: 1000 }) + b + c);
  api.noi({});
  var tC = tHalf + 0.06;
  TD.cat(api, "#sB", tB, tC); TD.cat(api, "#sC", tC, null);

  // ---------- A ----------
  api.camera([[0, 980, 520, 1.0], [tA2 - 0.1, 1060, 500, 1.07, "sine.inOut"], [tA2 + 0.7, 1120, 560, 1.12, "power2.inOut"], [tB, 1150, 570, 1.16, "sine.inOut"]]);
  mayDi.forEach(function (m, j) { api.key("#mD" + j, "x", 0, 0); api.key("#mD" + j, "x", tB, -170 - j * 25, "none"); });
  api.origin("#mayDung", "1306 352");
  api.key("#mayDung", "scale", 0, 1); api.key("#mayDung", "scale", 3, 1.03, "sine.inOut"); api.key("#mayDung", "scale", tB, 1.0, "sine.inOut");
  var tMt = T("mountain", 0, 5.04);
  api.key("#nuiA", "opacity", 0, 0, "step"); api.key("#nuiA", "opacity", tA2 - 0.2, 0, "none"); api.key("#nuiA", "opacity", tMt, 1, "power2.inOut");
  suong.forEach(function (m, j) {
    var dx = (m[0] - 1300) * 0.9 + (j % 2 ? 260 : -260);
    api.key("#sg" + j, "x", 0, 0); api.key("#sg" + j, "x", tA2 - 0.3, j % 2 ? 14 : -14, "sine.inOut"); api.key("#sg" + j, "x", tMt + 0.5, dx, "power2.inOut");
    api.key("#sg" + j, "opacity", 0, 1, "step"); api.key("#sg" + j, "opacity", tA2 - 0.1, 1, "none"); api.key("#sg" + j, "opacity", tMt + 0.5, 0, "power2.in");
  });
  WA.set(0, { x: 560, y: 868, size: 0.42, pupX: 11, pupY: -4 });
  WA.idle(0, tMt - 0.2, { seed: 91, bien: 1.6 });
  var tCl = T("cloud", 0, 1.71), tRef = T("refused", 0, 3.36);
  WA.nhonChan(tCl - 0.1, 1.2, { lean: 5, nhin: [12, -8] });
  WA.pose(tRef, 0.3, { upRot: -6, pupX: 12, pupY: -10 }, "power2.inOut");
  WA.mouth(tRef + 0.1, "flat");
  WA.pose(tRef + 1.0, 0.3, { upRot: 0, pupY: -6 }, "power2.inOut");
  WA.soc(tMt - 0.05, { giuMat: true });
  WA.set(tMt + 0.4, {});
  api.show(WA.td.hUf, tMt + 0.02, 0); api.show(WA.td.hUb, tMt + 0.02, 0); api.show(WA.td.hD, tMt + 0.02, 1);
  api.sfx("whoosh", tMt, 0.35);
  WA.pose(tMt + 0.02, 0.1, { lean: -7, upRot: 4 }, "power3.out"); WA.pose(tMt + 0.5, 0.4, { lean: 0, upRot: 0 }, "power2.out");
  WA.mouth(tMt + 0.6, "o");
  WA.muTrum(tB - 0.65, 1);
  WA.mouth(tB - 0.4, "flat");
  WA.autoBlink(0, tB, 92);

  // ---------- B ----------
  TD.camNhom(api, [["#sBx", 0.3], ["#sBg", 1], ["#sBn", 1.3]], [[tB, 940, 680, 1.65], [tBig - 0.05, 930, 700, 1.75, "sine.inOut"], [tBig + 0.8, 1010, 560, 1.12, "power2.inOut"],
    [tStep - 0.25, 960, 620, 1.28, "sine.inOut"], [tStep + 0.6, 905, 700, 1.85, "power2.inOut"], [tHalf - 0.3, 900, 735, 2.0, "sine.inOut"], [tC, 900, 745, 2.05, "sine.inOut"]]);
  api.sfx("song", tB + 0.1, 0.4);
  // xuồng nhấp nhô, nảy lên đúng "rose"
  var tRose = T("rose", 0, 18.34);
  var XU = function (p, t, v, e) { api.key("#xuG", p, t, v, e); api.key("#xuF", p, t, v, e); };
  XU("y", 0, 0);
  for (var tb = tB, kk = 0; tb < tRose - 0.2; tb += 0.8, kk++) XU("y", tb + 0.8, kk % 2 ? 10 : -12, "sine.inOut");
  XU("y", tRose - 0.1, 14, "sine.inOut"); XU("y", tHalf - 0.04, -52, "power2.in");
  api.origin("#xuG", "860 846"); api.origin("#xuF", "860 846");
  XU("rotation", 0, 0);
  for (var tr2 = tB, k2 = 0; tr2 < tHalf; tr2 += 1.1, k2++) XU("rotation", tr2 + 1.1, k2 % 2 ? 2 : -2, "sine.inOut");
  // tàu lắc nhẹ
  api.origin("#tauG", "1300 806");
  api.key("#tauG", "rotation", 0, 0);
  for (var tt = tB, k3 = 0; tt < tC; tt += 1.6, k3++) api.key("#tauG", "rotation", tt + 1.6, k3 % 2 ? 0.6 : -0.6, "sine.inOut");
  // cần cẩu thả thùng hàng
  var tCargo = T("cargo", 0, 14.88);
  api.origin("#thungG", "0 0");
  api.key("#thungG", "x", 0, 830, "step"); api.key("#thungG", "y", 0, 470, "step");
  api.key("#thungG", "y", tBig + 0.4, 470, "none"); api.key("#thungG", "y", tCargo - 0.2, 776, "sine.inOut");
  api.key("#thungG", "rotation", 0, 0);
  for (var ts = tBig + 0.4, k4 = 0; ts < tCargo; ts += 0.7, k4++) api.key("#thungG", "rotation", ts + 0.7, k4 % 2 ? 4 : -4, "sine.inOut");
  api.key("#thungG", "rotation", tCargo, 0, "power2.out");
  api.show("#thungG", 0, 1); api.show("#thungG", tCargo + 0.35, 0); api.show("#thungTrong", 0, 0); api.show("#thungTrong", tCargo + 0.35, 1);
  api.moiKhung(function (t) {
    if (!api.dom) return;
    var n = document.getElementById("dayCau"); if (!n) return;
    var u = 0;
    if (t > tBig + 0.4) u = TD.ss(Math.min(1, (t - tBig - 0.4) / (tCargo - 0.2 - tBig - 0.4)));
    var yy = t > tCargo + 0.35 ? 400 : 470 + 306 * u;
    n.setAttribute("d", "M 830 286 L 830 " + (yy - 66).toFixed(1));
  });
  // hai người giấy đỡ thùng (gốc vai)
  ["nA", "nB"].forEach(function (n, j) {
    api.origin("#" + n + "-tayL", "0 0"); api.origin("#" + n + "-tayR", "0 0");
    api.key("#" + n + "-tayL", "rotation", 0, 0); api.key("#" + n + "-tayR", "rotation", 0, 0);
    api.key("#" + n + "-tayL", "rotation", tCargo - 0.9 + j * 0.1, 0, "none"); api.key("#" + n + "-tayL", "rotation", tCargo - 0.5 + j * 0.1, j ? 150 : 160, "power2.out");
    api.key("#" + n + "-tayR", "rotation", tCargo - 0.9 + j * 0.1, 0, "none"); api.key("#" + n + "-tayR", "rotation", tCargo - 0.5 + j * 0.1, j ? -160 : -150, "power2.out");
    api.key("#" + n + "-tayL", "rotation", tCargo + 0.4, j ? 150 : 160, "none"); api.key("#" + n + "-tayL", "rotation", tCargo + 0.8, 10, "power2.inOut");
    api.key("#" + n + "-tayR", "rotation", tCargo + 0.4, j ? -160 : -150, "none"); api.key("#" + n + "-tayR", "rotation", tCargo + 0.8, -10, "power2.inOut");
    api.origin("#" + n + "-mat", "0 0");
    api.key("#" + n + "-mat", "y", 0, 0); api.key("#" + n + "-mat", "y", tCargo - 1.2, 0, "none"); api.key("#" + n + "-mat", "y", tCargo - 0.9, -5, "power2.out");
  });
  api.sfx("bonk", tCargo + 0.3, 0.35);
  // Wob ở mép mạn tàu
  WB.set(0, { x: 880, y: 652, size: 0.42, pupX: -6, pupY: 12 });
  WB.nhonChan(tB + 0.4, 1.6, { lean: -6, nhin: [-8, 14] });
  var tGet = T("Getting", 0, 9.72);
  WB.mouth(tGet, "wobbly"); WB.shiver(tGet + 0.05, tGet + 0.9, 1.5, 16);
  WB.pose(tGet - 0.1, 0.2, { eye: 1.1 }, "power2.out"); WB.pose(tGet + 1.0, 0.3, { eye: 1 }, "power2.out");
  WB.idle(tBig, tStep - 0.3, { seed: 93, bien: 1.4, liec: false });
  WB.pose(tBig + 0.5, 0.3, { pupX: -10, pupY: -12 }, "power2.inOut");
  WB.pose(tCargo - 0.4, 0.4, { pupX: -10, pupY: 12 }, "power2.inOut");
  WB.mouth(tCargo, "flat");
  // xuống thang dây
  WB.pose(tStep - 0.2, 0.25, { aLu: 150, aLf: 10, aRu: -150, aRf: -10, pupY: 14, pupX: 0 }, "power2.out");
  api.key("#WB", "x", tStep, 880, "none"); api.key("#WB", "x", tStep + 0.35, 905, "power2.out");
  var yS = [652, 682, 712, 742, 770];
  for (var s = 0; s < 4; s++) {
    var t0 = tStep + 0.35 + s * 0.48;
    api.key("#WB", "y", t0, yS[s], "none"); api.key("#WB", "y", t0 + 0.3, yS[s + 1], "power2.inOut");
    WB.pose(t0, 0.15, s % 2 ? { legL: -24, legR: 6 } : { legL: 6, legR: 24 }, "power2.out"); WB.pose(t0 + 0.2, 0.15, { legL: 0, legR: 0 }, "power2.in");
    WB.pose(t0 + 0.05, 0.2, s % 2 ? { aLu: 160, aRu: -140 } : { aLu: 140, aRu: -160 }, "sine.inOut");
  }
  WB.mouth(tRose, "o"); WB.pose(tRose + 0.1, 0.2, { eye: 1.2, pupY: 16 }, "power2.out");
  // va: xuồng nảy lên chạm Wob
  var tHit = tHalf - 0.04;
  api.key("#WB", "y", tHit - 0.25, 770, "none"); api.key("#WB", "y", tHit, 752, "power2.in");
  WB.pose(tHit, 0.06, { sy: 0.4, sx: 1.6, eye: 1, aLu: 90, aRu: -90 }, "power4.out");
  api.show(WB.td.uot, tHit, 1);
  api.sfx("bonk", tHit, 0.8);
  api.shake(tHit, 10, 6);
  WB.autoBlink(tB, tStep, 94);

  // ---------- C: con tem ----------
  TD.camNhom(api, [["#sCk", 1]], [[tC, 960, 545, 1.18], [DUR, 960, 552, 1.26, "sine.inOut"]]);
  WT.set(0, { x: 960, y: 690, size: 0.62, sx: 1.22, sy: 0.82, lean: -4, aLu: 70, aLf: 10, aRu: -70, aRf: -10, legL: 20, legR: -20, pupX: 0, pupY: 0, eye: 1.08 });
  WT.mouth(tC, "flat");
  api.origin("#temG", "0 0");
  api.key("#temG", "x", 0, 960, "step"); api.key("#temG", "y", 0, 572, "step"); api.key("#temG", "rotation", 0, -4, "step");
  api.pop("#temG", tC + 0.12, 0.2);
  api.origin("#blRoi", "0 0");
  var tBl = tC + 0.55;
  api.key("#blRoi", "x", 0, 1000, "step"); api.key("#blRoi", "y", 0, 600, "step"); api.key("#blRoi", "rotation", 0, 25, "step");
  api.key("#blRoi", "scale", 0, 3.2, "step"); api.show("#blRoi", 0, 0); api.show("#blRoi", tBl, 1);
  api.key("#blRoi", "scale", tBl, 3.2, "none"); api.key("#blRoi", "scale", tBl + 0.28, 0.62, "power2.in"); api.key("#blRoi", "scale", tBl + 0.36, 0.7, "power2.out"); api.key("#blRoi", "scale", tBl + 0.5, 0.64, "back.out(2)");
  api.key("#blRoi", "rotation", tBl, 25, "none"); api.key("#blRoi", "rotation", tBl + 0.28, -18, "power2.in");
  api.sfx("bonk", tBl + 0.28, 0.6);
  WT.pose(tBl + 0.28, 0.06, { sy: 0.74, sx: 1.3 }, "power3.out"); WT.pose(tBl + 0.34, 0.25, { sy: 0.82, sx: 1.22 }, "back.out(2)");
  WT.mouth(tBl + 0.3, "wobbly");
  WT.blinkAt(tC + 0.4); WT.blinkAt(tBl + 0.75); WT.blinkAt(tBl + 1.25);
  WT.pose(tBl + 0.9, 0.3, { pupX: -6, pupY: -8 }, "power2.inOut");
  for (var j = 0; j < 5; j++) {
    var sel = "#vg" + j;
    api.origin(sel, "0 0");
    api.key(sel, "scale", 0, 0, "step"); api.key(sel, "scale", tC, 0.2, "none"); api.key(sel, "scale", tC + 0.2, 1.2, "power2.out"); api.key(sel, "scale", tC + 0.7, 0, "power2.in");
    api.key(sel, "y", 0, 0, "step"); api.key(sel, "y", tC, 0, "none"); api.key(sel, "y", tC + 0.7, -50, "power2.out");
  }
};
