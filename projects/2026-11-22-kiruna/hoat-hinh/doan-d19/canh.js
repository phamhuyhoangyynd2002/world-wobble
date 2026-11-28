/* d19 – Lời giải trên trang sổ: đường ray đỏ Kiruna → Narvik qua núi; hải lưu ấm giữ cảng Narvik không băng; hòn quặng lên tàu;
   1900 / 1902; lớp tông cũ: vương miện trên chiếc kéo cắt ruy băng (1903, không người); ~12 chuyến mỗi ngày; tàu phá băng mở lối Luleå;
   về đường ngang: rào nâng, tàu vẫn chạy, Wob nhét thẻ gỗ sâu vào túi.
   Cắt giấy, nhóm A. Chữ: data.chu_tren_do_vat (≤ 4 khối cùng lúc). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, ND = window.NhietDoi, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper, CH = data.chu_tren_do_vat;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tRail = T("railway"), tNarvik = T("narvik"), tGulf = T("gulf"), tFree = T("ice-free"), tLine = T("the", 8.5), tHundred = T("hundred"), tTwo = T("two."),
    tKing = T("king"), tThree = T("three."), tToday = T("today,"), tTwelve = T("twelve"), tLulea = T("luleå"), tIce = T("icebreakers"), tWinter = T("winter."),
    tIron = T("iron", 24), tDoor = T("door"), tJan = T("january.");
  var tCut = tIron - 0.3;   // về đường ngang

  /* ================= cảnh 1: trang sổ bản đồ (cùng bố cục d17) ================= */
  var MX = 300, MY = 112, MS = 0.75;
  function P(x, y) { return [MX + x * MS, MY + y * MS]; }
  var KIR = P(987, 397), NAR = P(808, 297), LUL = P(1111, 765);
  var s = '<rect x="-400" y="-300" width="2720" height="1700" fill="#6E5A44"/><rect x="-400" y="-300" width="2720" height="1700" fill="url(#xlGo)" opacity="0.8"/>';
  s += at(80, 30, D.journalPage(1760, 1020, { seed: 17050, ke: true }));
  s += at(MX, MY, D.mapSticker("ban-do/map-kiruna-rail.svg", 1440, 810, { id: "map", seed: 17060 }));
  var ov = '<g transform="translate(' + MX + "," + MY + ") scale(" + MS + ')">';
  // đường xám Kiruna → Luleå (từ d17)
  ov += line("M 987 397 C 1000 470 1030 560 1060 640 C 1080 700 1100 740 1111 765", 9, "#1f2326") + line("M 987 397 C 1000 470 1030 560 1060 640 C 1080 700 1100 740 1111 765", 5, "#B8BDC2", ' stroke-dasharray="16 10"');
  // băng vịnh + tàu kẹt (từ d17), kênh tàu phá băng mở
  var poly = [[1094, 760], [1160, 748], [1250, 760], [1312, 775], [1322, 860], [1280, 905], [1195, 960], [1155, 1090], [960, 1090], [1018, 960], [1056, 864], [1090, 800]];
  ov += '<clipPath id="mapCl"><rect x="0" y="0" width="1920" height="1080"/></clipPath><g clip-path="url(#mapCl)"><g id="bang">' + paper(D.rough(poly, 4, 17070, 14), "#EAF5F9", { stroke: true, sw: 5, shadow: false }) + paper(D.rough(poly, 4, 17070, 14), "url(#xlBangVan)", { shadow: false }) +
    line("M 1150 800 L 1190 840 L 1176 880 M 1240 820 L 1220 870 M 1100 940 L 1130 990", 3, "#9CC6D8") + "</g>";
  ov += '<g id="kenh">' + line("M 1120 1090 C 1130 1000 1150 930 1170 880 C 1180 840 1150 800 1118 772", 34, "#1f2326") + line("M 1120 1090 C 1130 1000 1150 930 1170 880 C 1180 840 1150 800 1118 772", 26, "#3F6A70") + "</g></g>";
  ov += '<g id="tauKv"><g id="tauK" transform="translate(1215,838) scale(1.25)">' + XL.tauBien("tb", 120) + '<g id="tauKb">' + paper(D.rough([[-80, 4], [-40, -10], [40, -8], [86, 6], [60, 22], [-60, 22]], 3, 17080, 8), "#F7FBFC", { stroke: true, sw: 3.5, shadow: false }) + "</g></g></g>";
  ov += '<g id="phaBang"><g transform="translate(1125,1060) scale(0.95)">' + XL.tauPhaBang("pb") + "</g></g>";
  // dãy núi giấy giữa Kiruna và bờ biển Na Uy
  [[935, 395, 26], [905, 378, 32], [875, 362, 24]].forEach(function (m, i) {
    ov += paper("M " + (m[0] - m[2]) + " " + m[1] + " L " + m[0] + " " + (m[1] - m[2] * 1.3) + " L " + (m[0] + m[2]) + " " + m[1] + " Z", "#8A8F94", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
      paper("M " + (m[0] - m[2] * 0.36) + " " + (m[1] - m[2] * 0.82) + " L " + m[0] + " " + (m[1] - m[2] * 1.3) + " L " + (m[0] + m[2] * 0.36) + " " + (m[1] - m[2] * 0.82) + " Z", "#F7FBFC", { stroke: true, sw: 3, shadow: false });
  });
  // hải lưu ấm
  ov += '<g id="hl">' + XL.muiTenCong([[150, 1040], [230, 860], [360, 700], [470, 560], [570, 440], [650, 350]], "#F4B860", 34) + "</g>";
  // đường ray đỏ Kiruna → Narvik: từng nét đứt hiện dần
  var R = [[987, 397], [955, 383], [925, 362], [895, 347], [865, 330], [835, 312], [808, 297]];
  var dash = [], acc = [0];
  for (var i = 1; i < R.length; i++) acc.push(acc[i - 1] + Math.hypot(R[i][0] - R[i - 1][0], R[i][1] - R[i - 1][1]));
  var LEN = acc[acc.length - 1];
  function diem(d) { for (var j = 1; j < R.length; j++) if (d <= acc[j]) { var u = (d - acc[j - 1]) / (acc[j] - acc[j - 1]); return [R[j - 1][0] + (R[j][0] - R[j - 1][0]) * u, R[j - 1][1] + (R[j][1] - R[j - 1][1]) * u]; } return R[R.length - 1]; }
  ov += '<g id="ray">';
  for (var dd = 0, n = 0; dd < LEN - 4; dd += 15, n++) {
    var a = diem(dd), b = diem(Math.min(LEN, dd + 9));
    var seg = "M " + a[0].toFixed(1) + " " + a[1].toFixed(1) + " L " + b[0].toFixed(1) + " " + b[1].toFixed(1);
    ov += '<g id="r' + n + '">' + line(seg, 13) + line(seg, 7, "#E0703A") + "</g>";
    dash.push(dd);
  }
  ov += "</g>";
  // chấm tàu nhỏ chạy nối nhau (lúc "twelve")
  for (var c = 0; c < 4; c++) ov += '<g id="ct' + c + '"><rect x="-20" y="-12" width="40" height="24" rx="5" fill="#2A2622" stroke="#1f2326" stroke-width="4"/><rect x="-20" y="-3" width="40" height="7" fill="#D9A441"/><circle cx="-16" cy="0" r="5" fill="#FFF0B8" stroke="#1f2326" stroke-width="2"/></g>';
  // tàu biển ở cảng Narvik
  ov += '<g id="tauN"><g transform="translate(700,318) scale(0.85)">' + XL.tauBien("tn", 110) + "</g></g>";
  ov += "</g>";
  s += ov;
  // chấm + nhãn (hệ trang, không phóng) – vẽ SAU hòn quặng và tay (không bị đè)
  var nh = "";
  nh += at(KIR[0], KIR[1], D.mapDot("dK", { r: 14, nhan: CH[0], co: 48, ben: "phai", seed: 19001 }));
  nh += at(LUL[0], LUL[1], D.mapDot("dL", { r: 14 }));
  nh += at(LUL[0], LUL[1], '<g id="nL">' + D.mapDot("dL2", { r: 8, nhan: CH[3], co: 48, ben: "trai", seed: 19002 }) + "</g>");
  nh += at(NAR[0], NAR[1], '<g id="dN">' + D.mapDot("dN0", { r: 14 }) + "</g>");
  nh += at(NAR[0], NAR[1] - 44, '<g id="nN">' + D.mapDot("dN1", { r: 0.1, nhan: CH[1], co: 48, ben: "tren", seed: 19003 }) + "</g>");
  nh += at(NAR[0], NAR[1] - 44, '<g id="nN2">' + D.mapDot("dN2", { r: 0.1, nhan: CH[2], co: 48, ben: "tren", seed: 19004 }) + "</g>");
  nh += '<g id="y1900" transform="translate(' + (KIR[0] + 70) + "," + (KIR[1] + 100) + ') rotate(4)">' + ND.theChu("", CH[4], 46, { seed: 19010 }) + "</g>";
  nh += '<g id="y1902" transform="translate(' + (NAR[0] - 120) + "," + (NAR[1] + 40) + ') rotate(-5)">' + ND.theChu("", CH[5], 46, { seed: 19011 }) + "</g>";
  // lớp tông cũ: ruy băng, vương miện, kéo
  var RB = P(925, 362);
  var cu = '<g id="cu"><rect x="80" y="30" width="1760" height="1020" fill="url(#xlSep)" opacity="0.72"/><rect x="80" y="30" width="1760" height="1020" fill="url(#xlSepVi)"/>' +
    '<g id="rbL">' + paper("M " + (RB[0] - 190) + " " + (RB[1] - 14) + " L " + RB[0] + " " + (RB[1] - 14) + " L " + RB[0] + " " + (RB[1] + 14) + " L " + (RB[0] - 190) + " " + (RB[1] + 14) + " Z", "#C9463A", { stroke: true, sw: 4 }) + "</g>" +
    '<g id="rbR">' + paper("M " + RB[0] + " " + (RB[1] - 14) + " L " + (RB[0] + 190) + " " + (RB[1] - 14) + " L " + (RB[0] + 190) + " " + (RB[1] + 14) + " L " + RB[0] + " " + (RB[1] + 14) + " Z", "#C9463A", { stroke: true, sw: 4 }) + "</g>" +
    '<g transform="translate(' + RB[0] + "," + (RB[1] - 64) + ') rotate(90)">' + XL.keo("kk", 120) + "</g>" +
    '<g transform="translate(' + RB[0] + "," + (RB[1] - 152) + ')"><g id="vm">' + XL.vuongMien("vm0", 110) + "</g></g>" +
    '<g id="y1903"><g transform="translate(' + (RB[0] - 430) + "," + (RB[1] - 150) + ') rotate(-3)">' + ND.theChu("", CH[6], 50, { seed: 19012 }) + "</g></g></g>";
  var cuS = cu;
  var the12 = '<g id="the12" transform="translate(560,520) rotate(-3)">' + ND.theChu("", CH[7], 50, { seed: 19013 }) + "</g>";
  var hq = '<g id="hqv">' + XL.honQuang("hq", 26) + "</g>";
  var tay = '<g id="tay"><g transform="scale(0.55)">' + XL.tayWob(1500, 96) + "</g></g>";
  var V = XL.wob(api, "V", { the: 1 });
  var gio = '<g id="gio">' + line("M -10 0 C 40 -10 80 -6 120 -20 M 0 30 C 50 24 90 26 130 12 M 10 -30 C 50 -40 80 -40 110 -56", 6, "#9CC6D8") + "</g>";
  var c1 = '<g id="c1">' + api.lop("n1", s + hq + tay + nh + cuS + the12 + V.svg + at(1420, 950, gio), 1, { mat: 900 }) + "</g>";

  /* ================= cảnh 2: lại đường ngang ================= */
  var n2 = '<rect x="-400" y="-400" width="2800" height="1200" fill="url(#xlTroiNgay)"/>';
  n2 += paper(D.rough([[-400, 600], [200, 470], [800, 560], [1400, 440], [2000, 540], [2400, 520], [2400, 760], [-400, 760]], 6, 17011, 30), "#B9C9D3", { stroke: true, sw: 4, shadow: false });
  var r1 = D.rng(17020);
  for (var k = 0; k < 22; k++) { var px = -380 + k * 130 + r1() * 50, ph = 50 + r1() * 50; n2 += paper("M " + px.toFixed(0) + " 712 L " + (px + 22).toFixed(0) + " " + (712 - ph).toFixed(0) + " L " + (px + 44).toFixed(0) + " 712 Z", "#4E6B5C", { stroke: true, sw: 3, shadow: false }); }
  n2 += paper("M -400 720 L 2400 720 L 2400 1500 L -400 1500 Z", "#F2F6F7", { stroke: true, sw: 4, shadow: false }) + XL.duongRay(-400, 2400, 760);
  n2 += '<g transform="translate(0,760)"><g id="tau2"><g transform="scale(0.85)">' + XL.tauQuang(14) + "</g></g></g>";
  n2 += at(1500, 905, XL.raoChan(api, "rao2", 560));
  var W = XL.wob(api, "W", { the: 1 });
  var c2 = '<g id="c2">' + api.lop("n2", n2 + W.svg + paper(D.rough([[-400, 1000], [600, 985], [1300, 1005], [2400, 990], [2400, 1500], [-400, 1500]], 4, 17040, 30), "#F7FBFC", { stroke: true, sw: 4, shadow: false }), 1, { mat: 900 }) + "</g>";

  api.dat(XL.defs() + c1 + c2);
  api.noi({});
  api.show("#c1", 0, 1); api.show("#c2", 0, 0); api.fade("#c2", tCut - 0.1, 0.22, 1); api.show("#c1", tCut + 0.14, 0);

  /* ---------- camera trang sổ ---------- */
  api.camera([[0, 990, 430, 1.5], [tGulf - 0.5, 980, 420, 1.55, "sine.inOut"], [tGulf + 0.3, 830, 470, 1.32, "power2.inOut"], [tFree + 0.5, 860, 430, 1.42, "sine.inOut"],
    [tLine, 920, 450, 1.42, "sine.inOut"], [tKing - 0.3, 920, 450, 1.42, "sine.inOut"], [tKing + 0.3, 880, 490, 1.45, "power2.inOut"], [tToday - 0.2, 880, 490, 1.45, "sine.inOut"],
    [tToday + 0.4, 940, 430, 1.45, "power2.inOut"], [tLulea - 0.4, 960, 440, 1.42, "sine.inOut"], [tLulea + 0.4, 1090, 600, 1.42, "power2.inOut"], [tCut, 1100, 610, 1.46, "sine.inOut"]], ["n1"]);

  /* ---------- đường ray đỏ sang Narvik, ngón tay lần theo ---------- */
  var tR0 = tRail, tR1 = tNarvik - 0.05;
  dash.forEach(function (d0, i) { var t = tR0 + (tR1 - tR0) * (d0 / LEN); api.show("#r" + i, 0, 0); api.show("#r" + i, t, 1); });
  var F = function (d) { var p = diem(d); return [MX + p[0] * MS + 8, MY + p[1] * MS + 14]; };
  var f0 = F(0);
  api.key("#tay", "x", 0, f0[0] + 120); api.key("#tay", "y", 0, f0[1] + 760);
  api.key("#tay", "x", tR0 - 0.45, f0[0] + 120, "none"); api.key("#tay", "y", tR0 - 0.45, f0[1] + 760, "none");
  api.key("#tay", "x", tR0, f0[0], "power2.out"); api.key("#tay", "y", tR0, f0[1], "power2.out");
  for (var q = 1; q <= 6; q++) { var fd = F(LEN * q / 6), tq = tR0 + (tR1 - tR0) * q / 6; api.key("#tay", "x", tq, fd[0], "sine.inOut"); api.key("#tay", "y", tq, fd[1], "sine.inOut"); }
  api.key("#tay", "x", tR1 + 0.6, NAR[0] - 60, "power2.in"); api.key("#tay", "y", tR1 + 0.6, NAR[1] + 820, "power2.in");
  api.show("#dN", 0, 0); api.show("#dN", tNarvik - 0.1, 1); api.pop("#dN", tNarvik - 0.1, 0.2);
  api.show("#nN", 0, 1); api.pop("#nN", tNarvik - 0.12, 0.22); api.show("#nN", tFree - 0.06, 0);
  api.pop("#nN2", tFree - 0.06, 0.22);
  api.show("#tauN", 0, 0); api.fade("#tauN", tNarvik, 0.3, 1);

  /* ---------- hải lưu ấm, cảng không băng ---------- */
  api.show("#hl", 0, 0); api.fade("#hl", tGulf - 0.15, 0.35, 1);
  api.origin("#hl", "650 350");
  api.key("#hl", "scale", 0, 0.6); api.key("#hl", "scale", tGulf - 0.15, 0.6, "none"); api.key("#hl", "scale", tGulf + 0.4, 1, "back.out(1.4)");
  for (var p2 = 0, tp = tGulf + 0.5; tp < tLine; tp += 0.5, p2++) api.key("#hl", "scale", tp, p2 % 2 ? 1 : 1.04, "sine.inOut");
  api.fade("#hl", tLine + 0.4, 0.4, 0);
  // hòn quặng nhảy dọc đường đỏ tới Narvik, lên tàu: tàu chìm một nấc rồi nổi lại
  api.key("#hqv", "x", 0, KIR[0]); api.key("#hqv", "y", 0, KIR[1] - 4);
  api.pop("#hqv", tGulf + 0.4, 0.2);
  var hops = [0, LEN * 0.33, LEN * 0.66, LEN], tH0 = tGulf + 0.7, dH = 0.42;
  hops.forEach(function (d0, i) {
    if (!i) return;
    var pa = diem(hops[i - 1]), pb = diem(d0), A = [MX + pa[0] * MS, MY + pa[1] * MS - 4], B = [MX + pb[0] * MS, MY + pb[1] * MS - 4], t = tH0 + (i - 1) * dH;
    api.key("#hqv", "x", t, A[0], "none"); api.key("#hqv", "x", t + dH, B[0], "sine.inOut");
    api.key("#hqv", "y", t, A[1], "none"); api.key("#hqv", "y", t + dH * 0.5, Math.min(A[1], B[1]) - 46, "power2.out"); api.key("#hqv", "y", t + dH, B[1], "power2.in");
  });
  api.key("#hq-mat", "x", 0, 0); api.key("#hq-mat", "x", tH0, -7, "none");
  var TN = P(700, 318), tLen = tH0 + 3 * dH + 0.15;
  api.key("#hqv", "x", tLen, NAR[0], "none"); api.key("#hqv", "x", tLen + 0.4, TN[0] + 6, "sine.inOut");
  api.key("#hqv", "y", tLen, NAR[1] - 4, "none"); api.key("#hqv", "y", tLen + 0.2, NAR[1] - 60, "power2.out"); api.key("#hqv", "y", tLen + 0.4, TN[1] - 26, "power2.in");
  var tDip = tLen + 0.4;
  api.key("#tauN", "y", 0, 0); api.key("#tauN", "y", tDip, 0, "none"); api.key("#tauN", "y", tDip + 0.12, 12, "power2.out"); api.key("#tauN", "y", tDip + 0.6, 0, "elastic.out(1,0.5)");
  api.key("#hqv", "y", tDip + 0.12, TN[1] - 26 + 12 * 0.85, "power2.out"); api.key("#hqv", "y", tDip + 0.6, TN[1] - 26, "elastic.out(1,0.5)");
  api.sfx("song", tDip, 0.5);
  api.fade("#hqv", tLine + 0.4, 0.3, 0);
  // Wob ló đầu góc dưới phải: nín thở rồi thở ra
  V.set(0, { x: 1560, y: 1560, size: 1.0, aLu: 18, aLf: -10, aRu: 9, aRf: 3 });
  V.mouth(0, "flat"); V.autoBlink(0, DUR, 191);
  api.key("#V", "y", tLen - 0.5, 1560, "none"); api.key("#V", "y", tLen - 0.1, 1290, "back.out(1.5)");
  V.pose(tLen - 0.1, 0.2, { pupX: -14, pupY: -10 }, "power2.out");
  V.pose(tDip - 0.1, 0.12, { sx: 1.07, sy: 0.96, eye: 1.1 }, "power2.out"); V.mouth(tDip - 0.1, "X");
  V.pose(tDip + 0.7, 0.3, { sx: 0.97, sy: 1.03, eye: 1 }, "power2.out"); V.mouth(tDip + 0.7, "o");
  V.pose(tDip + 1.0, 0.3, { sx: 1, sy: 1 }, "sine.inOut"); V.mouth(tDip + 1.05, "smirk");
  api.key("#V", "y", tLine + 0.2, 1290, "none"); api.key("#V", "y", tLine + 0.6, 1560, "power2.in");
  V.set(tLine + 0.65, { x: 1560, size: 1.0, pupX: -14, pupY: -10, sx: 1, sy: 1 });

  /* ---------- 1900, 1902 ---------- */
  api.pop("#y1900", tHundred - 0.15, 0.25); api.fade("#y1900", tKing - 0.1, 0.3, 0);
  api.pop("#y1902", tTwo - 0.12, 0.25); api.fade("#y1902", tKing - 0.1, 0.3, 0);
  // Luleå lùi để không quá 4 khối chữ
  api.show("#nL", 0, 1); api.fade("#nL", tHundred - 0.5, 0.3, 0); api.fade("#nL", tLulea - 0.1, 0.3, 1);

  /* ---------- lớp tông cũ: vương miện, kéo, ruy băng (không người) ---------- */
  api.show("#cu", 0, 0); api.fade("#cu", tKing - 0.15, 0.35, 1); api.fade("#cu", tToday - 0.5, 0.35, 0);
  api.key("#vm", "y", 0, 0); for (var v = 0, tv = tKing; tv < tToday; tv += 0.5, v++) api.key("#vm", "y", tv, v % 2 ? -8 : 0, "sine.inOut");
  api.origin("#kk-a", "0 0"); api.origin("#kk-b", "0 0");
  api.key("#kk-a", "rotation", 0, -24); api.key("#kk-b", "rotation", 0, 24);
  api.key("#kk-a", "rotation", tThree - 0.12, -24, "none"); api.key("#kk-a", "rotation", tThree, 0, "power3.in");
  api.key("#kk-b", "rotation", tThree - 0.12, 24, "none"); api.key("#kk-b", "rotation", tThree, 0, "power3.in");
  api.origin("#rbL", (RB[0] - 190) + " " + RB[1]); api.origin("#rbR", (RB[0] + 190) + " " + RB[1]);
  api.key("#rbL", "rotation", 0, 0); api.key("#rbL", "rotation", tThree, 0, "none"); api.key("#rbL", "rotation", tThree + 0.5, 62, "bounce.out");
  api.key("#rbR", "rotation", 0, 0); api.key("#rbR", "rotation", tThree, 0, "none"); api.key("#rbR", "rotation", tThree + 0.5, -62, "bounce.out");
  api.sfx("pop", tThree, 0.4);
  api.show("#y1903", 0, 0); api.show("#y1903", tThree - 0.1, 1);
  api.key("#y1903", "y", 0, -260); api.key("#y1903", "y", tThree - 0.1, -260, "none"); api.key("#y1903", "y", tThree + 0.25, 0, "back.out(1.6)");
  // Wob đứng nghiêm ở mép trang
  V.set(tKing - 0.3, { x: 540, y: 1560, size: 0.8, aLu: 4, aLf: 0, aRu: -4, aRf: 0, pupX: 10, pupY: -8 });
  api.key("#V", "y", tKing - 0.3, 1560, "none"); api.key("#V", "y", tKing + 0.15, 930, "back.out(1.4)");
  V.pose(tKing + 0.3, 0.15, { sy: 1.06, sx: 0.96 }, "power2.out"); V.mouth(tKing + 0.3, "thang");
  V.pose(tThree, 0.1, { sy: 1.1, sx: 0.93, eye: 1.12 }, "power2.out"); V.pose(tThree + 0.3, 0.3, { sy: 1.03, sx: 0.98, eye: 1 }, "sine.inOut");
  api.key("#V", "y", tToday - 0.6, 930, "none"); api.key("#V", "y", tToday - 0.2, 1560, "power2.in");

  /* ---------- ~12 chuyến mỗi ngày: chấm tàu chạy nối nhau ---------- */
  api.pop("#the12", tTwelve - 0.12, 0.25); api.fade("#the12", tLulea - 0.4, 0.3, 0);
  var RP = R.slice();   // Kiruna → Narvik
  for (var c2i = 0; c2i < 4; c2i++) {
    var sel = "#ct" + c2i;
    api.show(sel, 0, 0); api.show(sel, tTwelve + c2i * 0.45, 1); api.show(sel, tLulea - 0.3, 0);
    for (var lap = 0, tl = tTwelve + c2i * 0.45; tl < tLulea; tl += 1.8, lap++) {
      RP.forEach(function (p, j) { var t = tl + 1.8 * j / (RP.length - 1); api.key(sel, "x", t, p[0], j ? "none" : "none"); api.key(sel, "y", t, p[1], "none"); });
    }
  }
  // nội suy tuyến tính giữa các đỉnh: thêm khoá mềm
  for (var c3 = 0; c3 < 4; c3++) api.key("#ct" + c3, "x", 0, R[0][0]), api.key("#ct" + c3, "y", 0, R[0][1]);

  /* ---------- Luleå: tàu phá băng, Wob thổi phù ---------- */
  api.show("#kenh", 0, 0); api.fade("#kenh", tIce - 0.1, 0.9, 1);
    api.key("#phaBang", "x", 0, 0); api.key("#phaBang", "y", 0, 0); api.show("#phaBang", 0, 0); api.show("#phaBang", tIce - 0.4, 1);
  api.key("#phaBang", "x", tIce - 0.4, 0, "none"); api.key("#phaBang", "y", tIce - 0.4, 60, "none");
  api.key("#phaBang", "x", tIce + 1.1, 50, "sine.inOut"); api.key("#phaBang", "y", tIce + 1.1, -190, "sine.inOut");
  api.key("#phaBang", "x", tWinter + 0.3, 20, "sine.inOut"); api.key("#phaBang", "y", tWinter + 0.3, -250, "sine.inOut");
  api.sfx("tach-bang", tIce - 0.05, 0.6);
  api.key("#tauKv", "x", 0, 0); api.key("#tauKv", "y", 0, 0);
  api.key("#tauKv", "x", tIce + 0.7, 0, "none"); api.key("#tauKv", "x", tCut, -60, "sine.inOut");
  api.key("#tauKv", "y", tIce + 0.7, 0, "none"); api.key("#tauKv", "y", tCut, 120, "sine.inOut");
  api.show("#tauKb", 0, 1); api.fade("#tauKb", tIce + 0.6, 0.3, 0);
  // Wob cúi xuống thổi phù lên mặt băng
  V.set(tLulea - 0.5, { x: 1580, y: 1560, size: 1.0, aLu: 18, aLf: -10, aRu: 9, aRf: 3, pupX: -14, pupY: -6, sy: 1, sx: 1, eye: 1 });
  api.key("#V", "y", tLulea - 0.5, 1560, "none"); api.key("#V", "y", tLulea + 0.2, 1110, "back.out(1.4)");
  V.mouth(tLulea, "flat");
  V.pose(tIce - 0.45, 0.25, { sx: 1.08, sy: 0.95, lean: -10 }, "power2.out"); V.mouth(tIce - 0.45, "X");
  V.pose(tIce - 0.05, 0.15, { sx: 0.95, sy: 1.03, lean: -14 }, "power2.out"); V.mouth(tIce - 0.05, "o");
  api.show("#gio", 0, 0); api.show("#gio", tIce - 0.05, 1); api.show("#gio", tIce + 0.9, 0);
  api.origin("#gio", "0 0");
  api.key("#gio", "rotation", 0, 200); api.key("#gio", "x", 0, 0); api.key("#gio", "x", tIce - 0.05, 0, "none"); api.key("#gio", "x", tIce + 0.9, -80, "sine.out");
  V.pose(tIce + 0.9, 0.3, { sx: 1, sy: 1, lean: -4 }, "sine.inOut"); V.mouth(tIce + 1.0, "smirk");

  /* ================= cảnh 2: đường ngang, rào nâng, tàu vẫn chạy ================= */
  api.camera([[tCut, 900, 700, 1.25], [DUR, 860, 730, 1.42, "sine.inOut"]], ["n2"]);
  api.key("#rao2-tay", "rotation", 0, -80);
  api.key("#tau2", "x", 0, 2200); api.key("#tau2", "x", tCut, 2200, "none"); api.key("#tau2", "x", DUR, 2200 + 330 * (DUR - tCut), "none");
  W.set(0, { x: 760, y: 935, size: 0.82, aLu: 18, aLf: -10, aRu: 9, aRf: 3, pupX: 0, pupY: -2 });
  W.idle(tCut, tDoor - 0.4, { seed: 19, bien: 2 });
  W.autoBlink(tCut, DUR, 192);
  W.mouth(0, "flat");
  W.pose(tCut + 0.4, 0.6, { pupX: -10, pupY: -4 }, "sine.inOut");
  W.pose(tCut + 1.4, 0.4, { pupX: 4, pupY: 10 }, "sine.inOut");
  // nhìn xuống thẻ gỗ, nhét sâu vào túi
  W.pose(tDoor - 0.3, 0.25, { aRu: -20, aRf: -60, pupX: 8, pupY: 14 }, "power2.out");
  W.pose(tDoor + 0.05, 0.2, { aRu: 6, aRf: -10 }, "power2.in");
  api.show(W.xl.the, tDoor + 0.2, 0);
  W.pose(tDoor + 0.3, 0.25, { aRu: 9, aRf: 3 }, "back.out(2)");
  W.pose(tDoor + 0.3, 0.12, { sy: 0.96, sx: 1.03 }, "power2.out"); W.pose(tDoor + 0.45, 0.25, { sy: 1, sx: 1 }, "back.out(2)");
  W.pose(tJan - 0.4, 0.5, { pupX: -10, pupY: -4 }, "sine.inOut");
  W.mouth(tJan, "smirk");
  W.breathe(tJan, DUR, 2.2);
};
