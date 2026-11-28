/* Đoạn d23 · cắt giấy · "thử vai" làm dân đảo: từ giấy phẳng dựng lên, Wob trước cửa nhà trọ giơ bảng kẹp ba ô, chỉ vào ô củ khoai, mặt quyết tâm.
   Đi bộ trên con đường đất ra khỏi làng (đồi, tường đá trôi lệch), tới các ô ruộng quây tường đá, vài người giấy chung cúi làm ở xa.
   Nhìn từ trên: các ô ruộng khác màu khít nhau như chăn chắp mảnh, Wob bé tí trên một đường tường. Cắt vào trung cảnh bên tường đá:
   Wob dang tay ướm một ô ruộng, đúng "outsider" rụt tay như chạm bếp nóng, giấu tay sau lưng, giữ tới hết. Vào "giay", ra "chen". Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M, ND = window.NhietDoi;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tAud = T("auditioned", 0, 1.93), tFirst = T("first", 0, 3.59), tPot = T("potato", 0, 4.7), tThey = T("they're", 0, 6.13), tFam = T("family", 0, 9.47),
    tAll = T("all", 0, 12.15), tCom = T("common.", 0, 13.8), tNo = T("no", 0, 14.55), tOut = T("outsider", 0, 14.88);
  var tC = tAll - 0.05, tD = 14.2;

  // ---------- XA (p 0.3) ----------
  var xa = at(700, 640, TD.nui({ w: 2600, h: 1200, seed: 2301 }));
  xa += at(300, 60, TD.may(420, { seed: 2302, mau: "#E4E7E2" })) + at(1500, 120, TD.may(500, { seed: 2303, mau: "#E4E7E2" })) + at(2400, 40, TD.may(380, { seed: 2304, mau: "#E4E7E2" }));
  // ---------- GIỮA (p 0.6): đồi thấp, ô ruộng xa, người cúi làm ----------
  var gi = D.paper("M -800 760 C -200 700 500 740 1100 700 C 1700 660 2300 720 2900 690 C 3300 670 3700 700 4200 690 L 4200 1500 L -800 1500 Z", M.co, { stroke: true, sw: 5, sx: 0, sy: -6, half: 0.06 });
  var oMau = ["#8FA866", "#A9B271", "#7E9455", "#B39A6A", "#9AAE6B", "#C2A878"];
  for (var o = 0; o < 10; o++) {
    var ox = 1500 + o * 230, oy = 730 + (o % 2) * 30;
    gi += D.paper(D.rRect(ox, oy, 210, 90, 2, 2310 + o), oMau[o % oMau.length], { stroke: false, shadow: false });
    gi += '<path d="' + D.rRect(ox, oy, 210, 90, 2, 2310 + o) + '" fill="none" stroke="#A8A096" stroke-width="9"/>';
  }
  [[1700, 0], [2150, 1], [2620, 0], [3050, 1]].forEach(function (p, j) { gi += at(p[0], 790 + (j % 2) * 30, '<g transform="scale(0.22)"><g transform="rotate(' + (j % 2 ? 24 : 20) + ')">' + ND.nguoi("ng" + j, { ao: ["#D9A43A", "#3F6E9A", "#9A5A44", "#5E7F4A"][j], sau: true }) + "</g></g>"); });
  // ---------- GẦN (p 1): nhà trọ, đường đất, tường đá ----------
  var gan = D.paper("M -800 880 C 400 870 1600 890 4400 876 L 4400 1500 L -800 1500 Z", M.co, { stroke: true, sw: 4, shadow: false });
  gan += D.paper("M -800 910 C 600 900 1800 918 4400 906 L 4400 966 C 1800 978 600 960 -800 970 Z", M.dat, { stroke: true, sw: 4, shadow: false });
  gan += at(560, 900, TD.nhaDa({ w: 440, h: 220, seed: 2320, cuaX: 130, so: 2, mai: "#3F6E9A" }));
  gan += at(1250, 900, TD.tuongDa(500, 70, 2321)) + at(1950, 900, TD.tuongDa(700, 70, 2322)) + at(2900, 900, TD.tuongDa(900, 70, 2323));
  var W = TD.wob(api, "W", { muTrum: 0, holdL: '<g id="W-bk"><g transform="scale(0.44)">' + TD.bangKep("bk") + "</g></g>" });
  gan += W.svg;
  var truoc = at(-200, 1100, TD.tuongDa(700, 90, 2331)) + at(1700, 1110, TD.tuongDa(600, 90, 2332)) + at(3300, 1100, TD.tuongDa(800, 90, 2333));

  // ---------- C: nhìn từ trên, chăn chắp mảnh ----------
  var c = '<g id="sC"><g id="sCk"><rect x="-300" y="-300" width="2520" height="1680" fill="#7E9455"/>';
  var r = D.rng(2341), xs = [-300, 160, 520, 900, 1250, 1640, 2220], ys = [-300, 180, 470, 760, 1380];
  for (var i = 0; i < xs.length - 1; i++) for (var j = 0; j < ys.length - 1; j++) {
    var x0 = xs[i] + (r() - 0.5) * 30, x1 = xs[i + 1] + (r() - 0.5) * 30, y0 = ys[j] + (r() - 0.5) * 30, y1 = ys[j + 1] + (r() - 0.5) * 30;
    var mau = oMau[Math.floor(r() * oMau.length)];
    c += D.paper("M " + x0.toFixed(0) + " " + y0.toFixed(0) + " L " + x1.toFixed(0) + " " + (y0 + 12).toFixed(0) + " L " + (x1 - 8).toFixed(0) + " " + y1.toFixed(0) + " L " + (x0 + 6).toFixed(0) + " " + (y1 - 10).toFixed(0) + " Z", mau, { stroke: false, shadow: false });
    if (r() < 0.5) for (var l = 0; l < 4; l++) c += D.line("M " + (x0 + 20).toFixed(0) + " " + (y0 + 40 + l * (y1 - y0 - 60) / 4).toFixed(0) + " L " + (x1 - 20).toFixed(0) + " " + (y0 + 50 + l * (y1 - y0 - 60) / 4).toFixed(0), 4, "#5F6F45", ' opacity="0.35"');
  }
  xs.forEach(function (x) { c += D.line("M " + x + " -300 L " + (x + 10) + " 1400", 22, "#A8A096") + D.line("M " + x + " -300 L " + (x + 10) + " 1400", 4, "#7E776E", ' stroke-dasharray="18 14"'); });
  ys.forEach(function (y) { c += D.line("M -300 " + y + " L 2300 " + (y + 12), 22, "#A8A096") + D.line("M -300 " + y + " L 2300 " + (y + 12), 4, "#7E776E", ' stroke-dasharray="18 14"'); });
  var WC = TD.wob(api, "WC", { muTrum: 0, holdL: '<g transform="scale(0.44)">' + TD.bangKep("bk2") + "</g>" });
  c += WC.svg + "</g></g>";
  // ---------- D: trung cảnh bên tường đá ----------
  var d = '<g id="sD"><g id="sDk"><rect x="-300" y="-300" width="2520" height="1680" fill="url(#tdTroiSang)"/>';
  d += at(1300, 700, TD.nui({ w: 1800, h: 700, seed: 2351 }));
  d += D.paper("M -300 700 C 400 690 1400 704 2300 690 L 2300 1400 L -300 1400 Z", M.co, { stroke: true, sw: 4, shadow: false });
  d += D.paper("M -300 900 C 500 890 1300 904 2300 892 L 2300 1400 L -300 1400 Z", "#7A5E44", { stroke: true, sw: 4, shadow: false });
  for (var rr = 0; rr < 5; rr++) d += D.line("M -300 " + (950 + rr * 34) + " C 600 " + (940 + rr * 34) + " 1400 " + (960 + rr * 34) + " 2300 " + (946 + rr * 34), 5, "#5E4632", ' opacity="0.5"');
  d += at(-100, 900, TD.tuongDa(2300, 150, 2352));
  d += '<g id="bkTuong">' + at(1420, 752, '<g transform="rotate(-8) scale(0.9)">' + TD.bangKep("bk3") + "</g>") + "</g>";
  var WD = TD.wob(api, "WD", { muTrum: 0 });
  d += WD.svg;
  d += '<g id="nong">' + [[-1, 0], [1, 0]].map(function (s, j) { return '<g id="ng' + j + '">' + D.line("M 0 0 C 6 -14 -6 -24 0 -38 M 16 4 C 22 -10 10 -20 16 -34", 5, "#C9463A") + "</g>"; }).join("") + "</g>";
  d += "</g></g>";

  api.dat(TD.defs() + ND.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiSang)"/>' +
    api.lop("xa", xa, 0.3, { mat: 640 }) + api.lop("giua", gi, 0.6, { mat: 760 }) + api.lop("gan", gan, 1, { mat: 920 }) + api.lop("truoc", truoc, 1.35, { mat: 1080 }) + c + d);
  api.noi({});
  TD.cat(api, "#sC", tC, tD); TD.cat(api, "#sD", tD, null);

  // ---------- A/B: cửa nhà trọ rồi đi ra đồng ----------
  var tW0 = tThey - 0.1, tW1 = tC - 0.4, X0 = 760, X1 = 2950;
  api.camera([[0, 700, 700, 1.45], [tW0, 720, 690, 1.48, "sine.inOut"], [tW0 + 1.2, 1150, 660, 1.2, "power2.inOut"], [tW1, 2900, 650, 1.15, "power1.inOut"], [tC, 2950, 650, 1.15, "sine.out"]]);
  W.set(0, { x: X0, y: 936, size: 0.56, pupX: 2, pupY: 0, aLu: 30, aLf: 10 });
  api.sfx("lat-giay", 0.1, 0.5);
  W.pose(0.75, 0.25, { aLu: 140, aLf: 30, sy: 1.06, upY: -6, eye: 1.08 }, "back.out(2)");
  W.mouth(0.8, "grin");
  W.pose(1.1, 0.25, { sy: 1, upY: 0 }, "power2.inOut");
  W.pose(tAud - 0.1, 0.2, { lean: -4, sy: 1.05 }, "power2.out"); W.pose(tAud + 0.4, 0.3, { lean: 0, sy: 1 }, "power2.inOut");
  W.pose(tFirst, 0.2, { aRu: -128, aRf: -40, pupX: -10, pupY: -12 }, "power2.out");
  for (var tp = 0; tp < 3; tp++) { W.pose(tPot - 0.15 + tp * 0.2, 0.08, { aRf: -60 }, "power2.in"); W.pose(tPot - 0.07 + tp * 0.2, 0.1, { aRf: -40 }, "power2.out"); }
  api.show("#bk-v0", 0, 0); api.show("#bk-v0", tPot + 0.1, 1);
  api.sfx("pop", tPot + 0.1, 0.35);
  W.mouth(tPot + 0.2, "thang");
  W.nhonChan(tPot + 0.6, 0.6, { lean: 0, nhin: [6, -6] });
  W.pose(tW0 - 0.3, 0.3, { aRu: -18, aRf: 10, aLu: 30, aLf: 10, pupX: 12, pupY: 0 }, "power2.inOut");
  W.walk(tW0, tW1, X0, X1, { step: 0.3, arms: "R" });
  W.mouth(tW0 + 0.4, "smirk");
  W.pose(tFam, 0.3, { pupX: 12, pupY: -8 }, "power2.inOut");
  W.autoBlink(0, tC, 231);

  // ---------- C ----------
  TD.camNhom(api, [["#sCk", 1]], [[tC, 960, 540, 1.0], [tD, 1000, 520, 1.12, "sine.inOut"]]);
  WC.set(0, { x: 1258, y: 476, size: 0.17, pupX: 0, pupY: 6, aLu: 30 });
  WC.walk(tC + 0.2, tCom - 0.1, 1258, 1330, { step: 0.3, arms: "R" });
  WC.pose(tCom, 0.3, { pupX: -8, pupY: -8 }, "power2.inOut");

  // ---------- D: ướm ô ruộng, rụt tay ----------
  TD.camNhom(api, [["#sDk", 1]], [[tD, 960, 600, 1.0], [DUR, 940, 610, 1.06, "sine.inOut"]]);
  WD.set(0, { x: 900, y: 1010, size: 0.95, pupX: -6, pupY: 8, aLu: 104, aLf: 0, aRu: -104, aRf: 0 });
  WD.mouth(tD, "thang");
  WD.pose(tD + 0.1, 0.25, { aLu: 96, aRu: -96, lean: -3 }, "sine.inOut");
  WD.pose(tD + 0.38, 0.2, { aLu: 106, aRu: -106, lean: 2 }, "sine.inOut");
  WD.pose(tOut - 0.15, 0.12, { aLu: 100, aRu: -100, pupX: 0, pupY: 6 }, "sine.inOut");
  // rụt tay như chạm bếp nóng
  WD.pose(tOut, 0.08, { aLu: 150, aLf: 60, aRu: -150, aRf: -60, sy: 1.1, sx: 0.94, upY: -14, eye: 1.25 }, "power4.out");
  WD.mouth(tOut, "o");
  WD.pose(tOut + 0.18, 0.12, { aLu: 0, aLf: 0, aRu: 0, aRf: 0, sy: 1, sx: 1, upY: 0 }, "power3.in");
  api.show("#WD-aLu", 0, 1); api.show("#WD-aRu", 0, 1); api.show("#WD-aLu", tOut + 0.3, 0); api.show("#WD-aRu", tOut + 0.3, 0);
  WD.pose(tOut + 0.32, 0.12, { sx: 0.96, lean: 0 }, "power2.out");
  WD.mouth(tOut + 0.4, "flat");
  WD.pose(tOut + 0.5, 0.3, { pupX: 10, pupY: -2, eye: 1.05 }, "power2.inOut"); WD.pose(tOut + 1.0, 0.3, { pupX: -10 }, "power2.inOut");
  api.sfx("bonk", tOut + 0.02, 0.35);
  ["#ng0", "#ng1"].forEach(function (s, j) {
    var hx = 900 + (j ? 1 : -1) * 150, hy = 820;
    api.origin(s, "0 0");
    api.key(s, "x", 0, hx, "step"); api.key(s, "y", 0, hy, "step");
    api.show(s, 0, 0); api.show(s, tOut + 0.05, 1); api.show(s, tOut + 0.75, 0);
    api.key(s, "y", tOut + 0.05, hy, "none"); api.key(s, "y", tOut + 0.75, hy - 60, "power2.out");
  });
  WD.blinkAt(tOut + 0.9);
  WD.breathe(tOut + 0.6, DUR, 2.2);
  void tNo;
};
