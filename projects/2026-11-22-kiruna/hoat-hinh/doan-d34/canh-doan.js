/* Đoạn d34 · cắt giấy · tháng 12, đồ mùa đông.
   A phố hẹp giữa hai dãy nhà cao, vệt nắng thấp chỉ chạm tầng trên; góc tường làm tiền cảnh; Wob kiễng rồi nhảy ba lần, đầu không chạm được nắng.
   B quảng trường mới trống trải: gió nét đứt cuộn tới đúng "found", giật khăn bay một vòng quanh tháp đồng hồ rồi quấn lại cổ chặt hơn (mắt lồi), brr.
   C biển tên hai thứ tiếng Kiruna / Giron, chữ Giron sáng lên ở "Giron.". D núi xa ở "mountain"; gà gô núi trắng tròn hiện ở "rock ptarmigan", Wob ngồi xổm bắt chước.
   E bong bóng giấy: Wob trắng toàn thân lim dim cạnh gà gô; bong bóng vụt tắt, Wob xanh lại, run. F phòng thuê: tháo chùm chìa khỏi quai, rút chìa Kiruna đúng "slid",
   kéo ngăn kéo, đặt chìa vào, đẩy đóng đúng "drawer.", giữ. Vào "cat", ra "cat". Chữ: chỉ "Kiruna", "Giron". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tLow = T("low", 0, 2.063), tOn = T("on", 0, 3.613), tFound = T("found", 0, 5.051), tTown = T("the", 4, 6.488), tGiron = T("giron", 0, 8.088),
    tIt = T("it", 0, 9.25), tMount = T("mountain,", 0, 9.938), tRock = T("rock", 0, 11.775), tWhite = T("white", 0, 14.113), tI = T("i", 0, 15.201),
    tFeath = T("feathers", 0, 16.16), tSnow = T("snowbank.", 0, 17.19), tInstead = T("instead", 0, 17.625), tSlid = T("slid", 0, 19.451), tPut = T("put", 0, 21.525), tDrawer = T("drawer.", 0, 21.963);
  var tB = tOn - 0.05, tC = tTown - 0.05, tF = tInstead - 0.04;

  // =================== B: quảng trường mới (lớp có thị sai) ===================
  var G = 900;
  var troi = '<rect x="-800" y="-800" width="3600" height="2600" fill="url(#krDongToi)"/>';
  var xa = KR.nuiXa(-900, 2900, 760, 90, "#8FA0B4", 3411) + '<rect x="-900" y="756" width="3800" height="900" fill="#DCE6EA"/>';
  xa += at(200, 790, '<path d="M -380 0 L -380 -260 C -380 -320 380 -320 380 -260 L 380 0 Z" fill="#7F8FA0" stroke="' + INK + '" stroke-width="4"/>' +
    [0, 1].map(function (k) { return '<rect x="-370" y="' + (-240 + k * 100) + '" width="740" height="56" fill="#FFD68A" opacity="0.75"/>'; }).join(""), 0.8);
  var gi = '<rect x="-900" y="' + (G - 40) + '" width="3800" height="900" fill="' + M.tuyet + '"/>' + paper(rRect(-900, G - 52, 3800, 26, 3, 3421), M.tuyetBong, { shadow: false });
  var TX = 1250, TOP = 120, CLY = 250, CR = 80;
  function thap() {
    var th = "";
    th += line("M " + (TX - 90) + " " + G + " L " + (TX - 50) + " " + (TOP + 60) + " M " + (TX + 90) + " " + G + " L " + (TX + 50) + " " + (TOP + 60), 16) + line("M " + (TX - 90) + " " + G + " L " + (TX - 50) + " " + (TOP + 60) + " M " + (TX + 90) + " " + G + " L " + (TX + 50) + " " + (TOP + 60), 9, "#4A5450");
    for (var ty = G - 80; ty > CLY + 100; ty -= 110) {
      var w0 = 90 - (G - ty) * (40 / (G - TOP - 60)), w1 = 90 - (G - ty + 110) * (40 / (G - TOP - 60));
      th += line("M " + f1(TX - w0) + " " + ty + " L " + f1(TX + w1) + " " + (ty - 110) + " M " + f1(TX + w0) + " " + ty + " L " + f1(TX - w1) + " " + (ty - 110) + " M " + f1(TX - w0) + " " + ty + " L " + f1(TX + w0) + " " + ty, 6, "#4A5450");
    }
    th += paper("M " + (TX - 70) + " " + (TOP + 60) + " L " + TX + " " + TOP + " L " + (TX + 70) + " " + (TOP + 60) + " Z", "#3E4644", { stroke: true, sw: 5, shadow: false });
    th += '<path d="M ' + (TX - 66) + " " + (TOP + 58) + " L " + TX + " " + (TOP + 4) + " L " + (TX + 66) + " " + (TOP + 58) + '" fill="none" stroke="' + M.tuyet + '" stroke-width="8"/>';
    th += '<circle cx="' + TX + '" cy="' + CLY + '" r="' + (CR + 14) + '" fill="#3E4644" stroke="' + INK + '" stroke-width="5"/><circle cx="' + TX + '" cy="' + CLY + '" r="' + CR + '" fill="#FFF0C8" stroke="' + INK + '" stroke-width="4"/>';
    for (var v = 0; v < 12; v++) { var aa = v * 30 * Math.PI / 180; th += line("M " + f1(TX + Math.sin(aa) * (CR - 16)) + " " + f1(CLY - Math.cos(aa) * (CR - 16)) + " L " + f1(TX + Math.sin(aa) * (CR - 3)) + " " + f1(CLY - Math.cos(aa) * (CR - 3)), 5); }
    th += line("M " + TX + " " + CLY + " L " + (TX + 30) + " " + (CLY + 26), 9) + line("M " + TX + " " + CLY + " L " + (TX - 8) + " " + (CLY - 66), 6);
    return th;
  }
  gi += thap();
  var gio = "";
  for (var gw = 0; gw < 6; gw++) gio += '<g id="gio' + gw + '">' + line("M 0 0 C 80 -30 160 30 240 0 C 280 -16 300 -40 280 -60", 9, "#FFFFFF", ' stroke-dasharray="22 14"') + "</g>";
  gi += gio;
  // khăn bay (dải kem sọc xanh lá thông, gốc ở giữa)
  var khanBay = '<g id="khanBay">' + paper("M -120 -22 C -60 -40 60 -4 120 -24 L 124 20 C 60 2 -60 38 -124 18 Z", M.kem, { stroke: true, sw: 4.5, shadow: false }) +
    line("M -118 -8 C -60 -26 60 10 120 -10", 7, M.mu) + line("M -120 6 C -60 -12 60 24 122 4", 7, M.mu) + line("M 124 -2 L 146 -6 M 124 10 L 146 12", 4) + "</g>";
  var W = KR.wob(api, "W", { mua: "dong", chum: "kr" });
  gi += W.svg + khanBay;

  // =================== A: phố hẹp ===================
  var a = '<g id="sA"><g id="sAk">';
  a += '<rect x="-800" y="-600" width="3600" height="2400" fill="url(#krDongToi)"/>';
  function khoiNha(x0, x1, mau, sd) {
    var s = paper(rRect(x0, -40, x1 - x0, 1000, 1.5, sd), mau, { stroke: true, sw: 5, sx: 6, sy: 8 });
    for (var r = 0; r < 7; r++) for (var c = x0 + 40; c < x1 - 60; c += 120) {
      var lit = (r * 7 + c / 10 + sd) % 5 < 1.4;
      s += paper(rRect(c, 20 + r * 120, 64, 78, 1, sd + r * 13 + c), lit ? "#FFD68A" : "#5C6E86", { stroke: true, sw: 3, shadow: false });
    }
    return s;
  }
  a += khoiNha(-400, 760, "#8E6A5A", 3431) + khoiNha(1160, 2300, "#6A7F96", 3432);
  a += '<rect x="760" y="-40" width="400" height="1000" fill="#3B4D66"/>';
  a += paper(rRect(-800, 900, 3600, 400, 2, 3433), M.tuyetBong, { shadow: false }) + '<rect x="-800" y="900" width="3600" height="400" fill="#3F5878" opacity="0.35"/>';
  // vệt nắng thấp: chỉ tầng trên
  a += '<path d="M -400 -40 L 760 -40 L 760 150 L -400 230 Z" fill="#F6B46A" opacity="0.55"/><path d="M 1160 -40 L 2300 -40 L 2300 120 L 1160 190 Z" fill="#F6B46A" opacity="0.45"/>';
  a += '<rect x="-800" y="260" width="3600" height="1100" fill="#26405E" opacity="0.28"/>';
  var Wa = KR.wob(api, "Wa", { mua: "dong", chum: "kr" });
  a += Wa.svg + "</g>";
  // góc tường tiền cảnh (thị sai 1,3)
  a += '<g id="sAf">' + paper(rRect(-420, -300, 560, 1700, 1.5, 3434), "#5E4A40", { stroke: true, sw: 6, shadow: false }) + '<rect x="40" y="-300" width="100" height="1700" fill="#3E302A" opacity="0.6"/>' +
    [0, 1, 2, 3].map(function (k) { return line("M -420 " + (60 + k * 260) + " L 140 " + (60 + k * 260), 5, "#4A3A32"); }).join("") + "</g>";
  a += "</g>";

  // =================== C+D+E: biển tên, núi, gà gô, bong bóng ===================
  var c = '<g id="sC"><g id="sCk">';
  c += '<rect x="-800" y="-600" width="3600" height="2400" fill="url(#krDongToi)"/>';
  c += '<g transform="translate(1500,760)">' + paper("M -520 0 L -300 -330 L 300 -340 L 520 0 Z", "#8E8A94", { stroke: true, sw: 4, shadow: false }) +
    '<path d="M -300 -330 L 300 -340 L 330 -300 L -330 -290 Z" fill="' + M.tuyet + '"/>' + line("M -360 -240 L 370 -248 M -420 -150 L 430 -158 M -470 -70 L 480 -76", 4, "#77737E") + "</g>";
  c += KR.nuiXa(-800, 2800, 800, 70, "#A9B6C6", 3441) + paper(rRect(-800, 790, 3600, 600, 2, 3442), M.tuyet, { shadow: false });
  for (var dr = 0; dr < 7; dr++) c += at(-200 + dr * 420, 830 + (dr % 2) * 40, paper(D.rough([[-160, 0], [-80, -50], [60, -60], [170, 0]], 5, 3443 + dr, 20), M.tuyetBong, { shadow: false }));
  // biển tên hai thứ tiếng
  var SX = 520, SY = 470;
  c += line("M " + (SX - 200) + " 960 L " + (SX - 200) + " " + SY + " M " + (SX + 200) + " 960 L " + (SX + 200) + " " + SY, 22) + line("M " + (SX - 200) + " 960 L " + (SX - 200) + " " + SY + " M " + (SX + 200) + " 960 L " + (SX + 200) + " " + SY, 12, "#8E9497");
  c += paper(rRect(SX - 270, SY - 170, 540, 300, 2, 3444), "#2F5A3E", { stroke: true, sw: 6, sx: 6, sy: 8 });
  c += '<rect x="' + (SX - 250) + '" y="' + (SY - 150) + '" width="500" height="260" rx="10" fill="none" stroke="#F4F1E8" stroke-width="5"/>';
  c += D.txt(SX, SY - 52, CH[0], 84, { w: 800, fill: "#F4F1E8" });
  c += line("M " + (SX - 200) + " " + (SY - 22) + " L " + (SX + 200) + " " + (SY - 22), 4, "#F4F1E8", ' opacity="0.7"');
  c += '<g id="gironSang" opacity="0"><ellipse cx="' + SX + '" cy="' + (SY + 46) + '" rx="230" ry="80" fill="url(#krNang)"/></g>';
  c += D.txt(SX, SY + 76, CH[1], 84, { w: 800, fill: "#F4F1E8" }).replace("<text", '<text data-layout-allow-overlap="true"');
  c += '<g id="gironVang" opacity="0" data-layout-allow-overlap="true">' + D.txt(SX, SY + 76, CH[1], 84, { w: 800, fill: "#FFD45A" }).replace("<text", '<text data-layout-allow-overlap="true"') + "</g>";
  c += '<path d="M ' + (SX - 270) + " " + (SY - 172) + " L " + (SX + 270) + " " + (SY - 172) + '" stroke="' + M.tuyet + '" stroke-width="12" stroke-linecap="round"/>';
  // gà gô núi lông trắng (KHÔNG chữ)
  var BX = 1400, BY = 945;
  var ga = '<g id="ga"><g id="gaT">' + '<ellipse cx="0" cy="6" rx="90" ry="16" fill="#9FB4C4" opacity="0.4"/>' +
    paper("M -86 0 C -96 -70 -40 -110 10 -110 C 70 -110 96 -64 86 -10 C 80 6 -80 8 -86 0 Z", "#F7F9F9", { stroke: true, sw: 4.5, sx: 3, sy: 4 }) +
    paper("M -86 -24 L -122 -40 L -116 -10 Z", "#2A2A2E", { stroke: true, sw: 3, shadow: false }) +
    paper("M 30 -100 C 30 -150 100 -150 104 -104 C 106 -84 40 -80 30 -100 Z", "#F7F9F9", { stroke: true, sw: 4, shadow: false }) +
    '<path d="M 102 -112 L 124 -106 L 102 -98 Z" fill="#2A2A2E"/>' + line("M 64 -118 L 104 -112", 6, "#2A2A2E") + '<path d="M 62 -132 C 70 -142 84 -142 90 -132" fill="#C9463A" stroke="' + INK + '" stroke-width="2"/>' +
    '<g id="gaMat"><circle cx="76" cy="-117" r="6" fill="#111"/></g>' + line("M -30 -50 C -10 -40 20 -40 40 -54", 3, "#D6E0E4") + "</g></g>";
  c += at(BX, BY, ga);
  var Wc = KR.wob(api, "Wc", { mua: "dong", chum: "kr" });
  c += Wc.svg;
  // bong bóng tưởng tượng: Wob trắng toàn thân lim dim cạnh gà gô
  var PX = 1120, PY = 470;
  var Wt = KR.wob(api, "Wt", { mua: "dong" });
  // lông vũ giấy (không chữ), mọc quanh thân Wob trong bong bóng
  function longVu(i) { var mau = ["#F7F4EC", "#EDE6D6", "#FBFAF6"][i % 3];
    return paper("M 0 -24 C 12 -12 11 12 0 24 C -11 12 -12 -12 0 -24 Z", mau, { stroke: true, sw: 3, shadow: false }) + line("M 0 -20 L 0 26", 2.5, "#B9AE98"); }
  var WTX = PX - 70, WTY = PY + 120 - 0.56 * 200, long = '<g id="long">';
  for (var lv = 0; lv < 16; lv++) { var ang = -170 + lv * (340 / 15), rad = ang * Math.PI / 180, rr0 = lv % 2 ? 78 : 92;
    long += '<g id="lv' + lv + '" transform="translate(' + f1(WTX + Math.sin(rad) * rr0) + "," + f1(WTY - Math.cos(rad) * rr0) + ") rotate(" + f1(ang) + ')"><g id="lvS' + lv + '">' + longVu(lv) + "</g></g>"; }
  long += "</g>";
  c += '<g id="bong"><circle cx="' + (PX + 20) + '" cy="' + (PY + 250) + '" r="18" fill="#FFF8EC" stroke="' + INK + '" stroke-width="4"/><circle cx="' + (PX + 40) + '" cy="' + (PY + 200) + '" r="26" fill="#FFF8EC" stroke="' + INK + '" stroke-width="4"/>' +
    paper(D.rough([[PX - 250, PY], [PX - 200, PY - 130], [PX - 40, PY - 180], [PX + 140, PY - 160], [PX + 260, PY - 50], [PX + 230, PY + 110], [PX + 60, PY + 160], [PX - 140, PY + 150], [PX - 240, PY + 90]], 8, 3450, 30), "#FFF8EC", { stroke: true, sw: 5, sx: 6, sy: 8 }) +
    Wt.svg + long + '<g id="uTuyet">' + paper("M " + (PX - 190) + " " + (PY + 128) + " C " + (PX - 170) + " " + (PY + 70) + " " + (PX + 30) + " " + (PY + 70) + " " + (PX + 50) + " " + (PY + 128) + " Z", "#F4F6F6", { stroke: true, sw: 4, sx: 3, sy: 4 }) + "</g>" +
    at(PX + 140, PY + 110, ga.replace(/id="ga(T|Mat)?"/g, ""), 0.55) + "</g>";
  // lông vũ rụng xuống tuyết khi bong bóng tắt (toạ độ cảnh)
  var LR = [[1000, 470], [1060, 420], [1110, 500], [960, 540], [1150, 450], [1030, 560], [1090, 590]];
  LR.forEach(function (q, i) { c += '<g id="lr' + i + '" opacity="0"><g id="lrT' + i + '"><g transform="scale(1.5)">' + longVu(i) + "</g></g></g>"; });
  c += "</g></g>";

  // =================== F: phòng thuê ===================
  var FG = 960, CX0 = 540, CX1 = 860, CT = 690;
  var f = '<g id="sF"><g id="sFk">';
  f += '<rect x="-800" y="-600" width="3600" height="2400" fill="#C9B08A"/><rect x="-800" y="-600" width="3600" height="2400" fill="url(#half)" opacity="0.06"/>';
  f += paper(rRect(1180, 200, 420, 420, 2, 3461), "#6E5236", { stroke: true, sw: 6, shadow: false }) + '<rect x="1205" y="225" width="370" height="370" fill="url(#krDem)"/>';
  [[1260, 290], [1400, 260], [1520, 340], [1330, 420], [1480, 470]].forEach(function (q) { f += at(q[0], q[1], D.sparkle(14, "#FFF6C8")); });
  f += line("M 1390 225 L 1390 595 M 1205 410 L 1575 410", 8, "#6E5236");
  f += '<rect x="-800" y="' + FG + '" width="3600" height="600" fill="#8A6440"/>' + line("M -800 " + FG + " L 2800 " + FG, 6, "#5E4228");
  f += at(300, 560, '<ellipse cx="0" cy="0" rx="420" ry="340" fill="url(#krDen)"/>');
  // tủ gỗ, ngăn kéo trên (nhóm "nk": mặt ngăn + lòng ngăn)
  f += paper(rRect(CX0, CT, CX1 - CX0, FG - CT, 1.5, 3462), M.go, { stroke: true, sw: 5, sx: 5, sy: 6 });
  f += paper(rRect(CX0 - 14, CT - 18, CX1 - CX0 + 28, 24, 1, 3463), M.goSang, { stroke: true, sw: 4, shadow: false });
  f += paper(rRect(CX0 + 20, CT + 120, CX1 - CX0 - 40, 110, 1, 3464), M.goToi, { stroke: true, sw: 4, shadow: false }) + '<circle cx="' + ((CX0 + CX1) / 2) + '" cy="' + (CT + 175) + '" r="9" fill="#C9A24A" stroke="' + INK + '" stroke-width="3"/>';
  f += '<g id="nkLong" opacity="0">' + paper(rRect(CX0 + 14, CT + 6, CX1 - CX0 - 28, 34, 1, 3465), "#3E2A1C", { stroke: true, sw: 3.5, shadow: false }) +
    '<g id="chiaNam" opacity="0" transform="translate(' + (CX0 + 150) + "," + (CT + 22) + ') rotate(-80) scale(0.55)">' + KR.chiaKiruna("", 1) + "</g></g>";
  f += '<g id="nk">' + paper(rRect(CX0 + 20, CT + 20, CX1 - CX0 - 40, 86, 1, 3466), "#7A5634", { stroke: true, sw: 4.5, shadow: false }) +
    '<circle cx="' + (CX0 + 70) + '" cy="' + (CT + 63) + '" r="11" fill="#C9A24A" stroke="' + INK + '" stroke-width="3"/><circle cx="' + (CX1 - 70) + '" cy="' + (CT + 63) + '" r="11" fill="#C9A24A" stroke="' + INK + '" stroke-width="3"/></g>';
  f += at(CX0 + 220, CT - 6, '<rect x="-26" y="-60" width="52" height="60" rx="8" fill="#B8BDC2" stroke="' + INK + '" stroke-width="4"/><path d="M -26 -40 L -46 -40" stroke="' + INK + '" stroke-width="4"/>');
  var rR = '<g id="rR">' + KR.chumChia("rRi", { kr: true }) + "</g>", kL = '<g id="kL">' + KR.chiaKiruna("kLi", 1.0) + "</g>";
  var Wf = KR.wob(api, "Wf", { mua: "dong", chum: "kr", holdR: rR, holdL: kL });
  f += Wf.svg + "</g></g>";

  api.dat(KR.defs() + '' +
    troi + api.lop("xa", xa, 0.4, { mat: 760 }) + api.lop("giua", gi, 1, { mat: G }) + c + f + a);
  api.noi({});
  api.show(W.xl.khan, 0, 1); api.show(Wf.xl.chum, 0, 1); api.show("#rRi-kr", 0, 1); api.show("#nkLong", 0, 0); api.show("#chiaNam", 0, 0);

  // =================== A ===================
  KR.cat(api, "#sA", 0, tB);
  var camA = [[0, 960, 640, 1.5], [tLow - 0.2, 960, 600, 1.42, "sine.inOut"], [tLow + 0.5, 960, 470, 1.18, "power2.inOut"], [tB, 960, 480, 1.22, "sine.inOut"]];
  KR.camNhom(api, [["#sAk", 1]], camA); KR.camNhom(api, [["#sAf", 1.3]], camA);
  var AY = 975;
  Wa.set(0, { x: 960, y: AY, size: 0.7, pupX: 2, pupY: -24, upRot: -4 });
  Wa.mouth(0, "flat");
  Wa.pose(0.3, 0.3, { sy: 1.06, sx: 0.96, legL: 6, legR: -6, aRu: -150, aRf: -10 }, "power2.out");    // kiễng, với tay
  api.key("#Wa", "y", 0.3, AY, "none"); api.key("#Wa", "y", 0.55, AY - 20, "power2.out"); api.key("#Wa", "y", 1.1, AY - 20, "none"); api.key("#Wa", "y", 1.3, AY, "power2.in");
  Wa.pose(1.2, 0.2, { sy: 1, sx: 1, legL: 0, legR: 0 }, "power2.in");
  [1.45, 2.05, 2.65].forEach(function (tj, k) {
    Wa.pose(tj, 0.1, { sy: 0.86, sx: 1.08 }, "power2.in");
    api.key("#Wa", "y", tj + 0.1, AY, "none"); api.key("#Wa", "y", tj + 0.3, AY - 120 - k * 20, "power2.out"); api.key("#Wa", "y", tj + 0.5, AY, "power2.in");
    Wa.pose(tj + 0.1, 0.18, { sy: 1.1, sx: 0.94, aRu: -165, aRf: -5, aLu: 150, aLf: 10 }, "power2.out");
    Wa.pose(tj + 0.48, 0.1, { sy: 0.9, sx: 1.06 }, "power2.in");
  });
  Wa.pose(3.2, 0.25, { sy: 1, sx: 1, aRu: -18, aRf: 10, aLu: 18, aLf: -10, pupY: -10 }, "power2.out");
  Wa.mouth(3.2, "flat");
  Wa.autoBlink(0, tB, 3401);

  // =================== B: gió giật khăn ===================
  api.camera([[0, 900, 560, 1.12], [tB, 900, 560, 1.12, "none"], [tFound + 0.3, 1000, 520, 1.0, "power2.inOut"], [tC, 980, 560, 1.12, "sine.inOut"], [DUR, 980, 560, 1.12]]);
  var WX = 640;
  W.set(0, { x: 360, y: G + 30, size: 0.66, pupX: 12, pupY: -6 });
  W.mouth(0, "smile");
  W.walk(tB + 0.05, tB + 1.0, 360, WX, { step: 0.28 });
  // gió nét đứt cuộn tới
  for (var k = 0; k < 6; k++) {
    var gsel = "#gio" + k, tg = tFound - 0.6 + k * 0.1, yy = 380 + k * 52;
    api.key(gsel, "x", 0, 1700); api.key(gsel, "y", 0, yy); api.key(gsel, "x", tg, 1700, "none"); api.key(gsel, "x", tg + 0.8, 200, "power1.in");
    api.key(gsel, "opacity", 0, 0); api.key(gsel, "opacity", tg, 0, "none"); api.key(gsel, "opacity", tg + 0.15, 1, "none"); api.key(gsel, "opacity", tg + 0.8, 0, "power1.in");
  }
  W.pose(tFound - 0.1, 0.12, { lean: 8, pupX: 16, pupY: 0, sx: 0.96 }, "power2.out");
  W.mouth(tFound, "o");
  // khăn bay vòng quanh tháp rồi về cổ
  var co = [WX - 30, G + 30 - 300 * 0.66 + 40];
  var rt = api.duong([co, [WX + 260, 560], [TX - 160, 380], [TX + 40, 300], [TX + 170, 360], [TX + 60, 470], [TX - 150, 520], [WX + 200, 700], [co[0] + 10, co[1]]]);
  var k0 = tFound + 0.05, k1 = tFound + 1.05, NK = 22;
  api.show(W.xl.khan, k0, 0); api.show("#khanBay", 0, 0); api.show("#khanBay", k0, 1); api.show("#khanBay", k1, 0); api.show(W.xl.khan, k1, 1);
  api.origin("#khanBay", "0 0");
  for (var s = 0; s <= NK; s++) {
    var u = s / NK, tt = k0 + (k1 - k0) * u, pp = rt.at(u);
    api.key("#khanBay", "x", tt, pp.x, "none"); api.key("#khanBay", "y", tt, pp.y, "none"); api.key("#khanBay", "rotation", tt, pp.a + (s % 2 ? 8 : -8), "none");
    api.key("#khanBay", "scaleX", tt, u > 0.3 && u < 0.6 ? 0.7 : 1, "none");
  }
  api.sfx("brr", tFound + 0.02, 0.5);
  W.pose(tFound + 0.25, 0.4, { lean: 2, pupX: 14, pupY: -18, upRot: -4 }, "power2.out");   // nhìn khăn bay
  // quấn lại chặt hơn: mắt lồi, giữ 0,6 s
  api.origin(W.xl.khan, "200 290");
  api.key(W.xl.khan, "scaleY", 0, 1); api.key(W.xl.khan, "scaleY", k1, 0.72, "none"); api.key(W.xl.khan, "scaleX", 0, 1); api.key(W.xl.khan, "scaleX", k1, 0.9, "none");
  W.pose(k1 - 0.02, 0.1, { eye: 1.3, sx: 0.9, sy: 1.06, upRot: 0, pupX: 0, pupY: 0 }, "power2.out");
  W.mouth(k1, "o");
  W.pose(k1 + 0.7, 0.25, { eye: 1, sx: 1, sy: 1, lean: 0 }, "power2.inOut");
  W.mouth(k1 + 0.8, "flat");

  // =================== C+D+E ===================
  KR.cat(api, "#sC", tC, tF);
  var tPan = tMount - 0.5, tGa = tRock;
  KR.camNhom(api, [["#sCk", 1]], [[0, 640, 610, 1.3], [tC, 640, 610, 1.3, "none"], [tGiron + 0.6, 660, 606, 1.34, "sine.inOut"], [tPan + 1.0, 1130, 560, 1.0, "power2.inOut"],
    [tGa - 0.7, 1100, 570, 1.04, "sine.inOut"], [tGa + 0.3, 886, 645, 1.36, "power2.inOut"], [tI + 0.1, 888, 640, 1.34, "sine.inOut"], [tF, 886, 642, 1.36, "sine.inOut"]]);
  var CY = 975, CXw = 820;
  Wc.set(0, { x: CXw, y: CY, size: 0.66, pupX: -14, pupY: -18, upRot: 3 });
  Wc.mouth(0, "smile");
  Wc.idle(tC, tGiron - 0.4, { seed: 341, bien: 1.2 });
  api.key("#gironSang", "opacity", tGiron - 0.05, 0); api.key("#gironSang", "opacity", tGiron + 0.25, 1, "power2.out");
  api.key("#gironVang", "opacity", 0, 0); api.key("#gironVang", "opacity", tGiron - 0.05, 0, "none"); api.key("#gironVang", "opacity", tGiron + 0.2, 1, "power2.out");
  Wc.pose(tGiron - 0.1, 0.25, { pupX: -16, pupY: -10, upRot: 4, lean: -3 }, "power2.out");
  Wc.mouth(tGiron + 0.1, "o"); Wc.mouth(tGiron + 0.8, "smile");
  // nhìn núi rồi đi tới đống tuyết
  Wc.pose(tPan, 0.4, { pupX: 16, pupY: -16, upRot: -3, lean: 0 }, "power2.inOut");
  var CX2 = 1170;
  Wc.walk(tPan + 0.6, tGa - 0.2, CXw, CX2, { step: 0.28 });
  // gà gô hiện đúng "rock ptarmigan"
  api.origin("#ga", "0 0"); api.origin("#gaT", "0 0");
  api.key("#ga", "scale", 0, 0); api.key("#ga", "scale", tGa - 0.05, 0, "none"); api.key("#ga", "scale", tGa + 0.22, 1, "back.out(2.2)");
  for (var b = 0; b < 8; b++) api.key("#gaT", "rotation", tGa + 0.5 + b * 0.9, b % 2 ? 3 : -2, "sine.inOut");
  api.origin("#gaMat", "76 -117");
  [tGa + 1.6, tWhite + 0.3, tI + 1.2].forEach(function (tb) { api.key("#gaMat", "scaleY", tb, 1, "none"); api.key("#gaMat", "scaleY", tb + 0.06, 0.1, "none"); api.key("#gaMat", "scaleY", tb + 0.14, 1, "none"); });
  Wc.pose(tGa + 0.1, 0.25, { pupX: 16, pupY: 6, upRot: 0 }, "power2.out");
  Wc.mouth(tGa + 0.3, "o");
  // ngồi xổm, tròn như gà gô
  var tXom = tGa + 1.1;
  Wc.pose(tXom, 0.45, { sy: 0.8, sx: 1.14, legL: 26, legR: -26, legLs: 0.6, legRs: 0.6, aLu: -10, aLf: 40, aRu: 10, aRf: -40, pupX: 14, pupY: 8 }, "power2.inOut");
  api.key("#Wc", "y", tXom, CY, "none"); api.key("#Wc", "y", tXom + 0.45, CY + 14, "power2.inOut");
  Wc.mouth(tXom + 0.4, "smile");
  Wc.pose(tWhite, 0.4, { lid: 26, pupX: 8, pupY: 4 }, "sine.inOut");
  Wc.idle(tXom + 0.5, tI, { seed: 342, bien: 1.0 });
  // bong bóng: Wob trắng lim dim
  Wt.set(0, { x: PX - 70, y: PY + 120, size: 0.56, pupX: 10, pupY: -8 });
  Wt.mouth(0, "smile");
  Wt.idle(tI + 0.3, tSnow, { seed: 343, bien: 1.2 });
  // lông mọc lần lượt ở "feathers"
  for (var lv2 = 0; lv2 < 16; lv2++) { var tl = tFeath - 0.05 + lv2 * 0.035; api.origin("#lvS" + lv2, "0 24");
    api.key("#lvS" + lv2, "scale", 0, 0); api.key("#lvS" + lv2, "scale", tl, 0, "none"); api.key("#lvS" + lv2, "scale", tl + 0.18, 1, "back.out(2)"); }
  Wt.mouth(tFeath + 0.3, "grin");
  // ngồi tròn lim dim trong ụ tuyết ở "snowbank."
  api.origin("#uTuyet", (PX - 70) + " " + (PY + 128));
  api.key("#uTuyet", "scaleY", 0, 0); api.key("#uTuyet", "scaleY", tSnow - 0.1, 0, "none"); api.key("#uTuyet", "scaleY", tSnow + 0.15, 1, "back.out(1.6)");
  Wt.pose(tSnow - 0.1, 0.25, { sy: 0.84, sx: 1.12, legL: 26, legR: -26, legLs: 0.6, legRs: 0.6, aLu: -10, aLf: 40, aRu: 10, aRf: -40, lid: 34, pupY: 4 }, "power2.out");
  api.key("#long", "y", 0, 0); api.key("#long", "y", tSnow - 0.1, 0, "none"); api.key("#long", "y", tSnow + 0.15, 16, "power2.out");
  Wt.mouth(tSnow + 0.1, "smile");
  var tTat = tSnow + 0.3;
  api.origin("#bong", (PX + 20) + " " + (PY + 250));
  api.pop("#bong", tI + 0.15, 0.3);
  api.key("#bong", "scale", tTat, 1, "none"); api.key("#bong", "scale", tTat + 0.07, 1.1, "power2.out"); api.key("#bong", "scale", tTat + 0.15, 0, "power2.in");
  // lông rụng từng chiếc xuống tuyết cạnh Wob
  LR.forEach(function (q, i) { var t0 = tTat + 0.05 + i * 0.07, sel = "#lr" + i, xe = 880 + i * 32, ye = 1000 - (i % 3) * 8;
    api.origin(sel, "0 0"); api.origin("#lrT" + i, "0 0");
    api.show(sel, 0, 0); api.show(sel, t0, 1);
    api.key(sel, "x", 0, q[0]); api.key(sel, "y", 0, q[1]); api.key(sel, "x", t0, q[0], "none"); api.key(sel, "y", t0, q[1], "none");
    api.key(sel, "x", t0 + 0.25, (q[0] + xe) / 2 + (i % 2 ? 40 : -40), "sine.inOut"); api.key(sel, "x", t0 + 0.55, xe, "sine.inOut");
    api.key(sel, "y", t0 + 0.55, ye, "power1.in");
    api.key("#lrT" + i, "rotation", 0, i * 20); api.key("#lrT" + i, "rotation", t0, i * 20, "none"); api.key("#lrT" + i, "rotation", t0 + 0.55, 80 + (i % 2) * 20, "sine.inOut"); });
  Wc.pose(tI + 0.2, 0.3, { pupX: -4, pupY: -20, upRot: 0, lid: 0 }, "power2.out");
  Wc.mouth(tI + 0.4, "grin");
  // vụt tắt: run lập cập
  var tRun = tTat + 0.1;
  Wc.mouth(tRun, "o");
  Wc.pose(tRun, 0.12, { eye: 1.15, pupX: 0, pupY: 0, sy: 0.84 }, "power2.out");
  for (var r = 0; r < 12; r++) api.key("#Wc", "x", tRun + r * 0.05, CX2 + (r % 2 ? 6 : -6), "none");
  api.key("#Wc", "x", tRun + 0.62, CX2, "none");
  W.autoBlink(tB, tC, 3403); Wc.autoBlink(tC, tF, 3404);

  // =================== F: phòng thuê, ngăn kéo ===================
  KR.cat(api, "#sF", tF, null);
  KR.camNhom(api, [["#sFk", 1]], [[0, 860, 700, 1.5], [tF, 860, 700, 1.5, "none"], [tSlid - 0.3, 850, 708, 1.56, "sine.inOut"], [tPut, 800, 720, 1.66, "sine.inOut"], [DUR, 794, 724, 1.72, "sine.inOut"]]);
  var FX = 960;
  Wf.set(0, { x: FX, y: FG, size: 0.72, pupX: -6, pupY: 4 });
  Wf.mouth(0, "flat");
  api.show("#rR", 0, 0); api.show("#kL", 0, 0);
  Wf.pose(tF + 0.15, 0.3, { aRu: 94, aRf: 130, pupX: 8, pupY: -4 }, "power2.inOut");   // tay phải lên quai
  var tThao = tF + 0.55;
  api.show(Wf.xl.chum, tThao, 0); api.show("#rR", tThao, 1);
  Wf.pose(tThao + 0.02, 0.35, { aRu: 36, aRf: 52, pupX: -4, pupY: 10 }, "power2.inOut");
  // tay trái rút chìa Kiruna khỏi vòng đúng "slid"
  Wf.pose(tSlid - 0.35, 0.3, { aLu: -32, aLf: -26 }, "power2.inOut");
  api.show("#rRi-kr", tSlid, 0); api.show("#kL", tSlid, 1);
  Wf.pose(tSlid + 0.02, 0.35, { aLu: 72, aLf: -102, pupX: -12, pupY: 8 }, "power2.out");
  Wf.pose(tSlid + 0.6, 0.35, { aRu: -18, aRf: 10 }, "power2.inOut");    // chùm chìa thõng bên phải
  // kéo ngăn kéo
  var tKeo = tSlid + 1.15;
  Wf.pose(tKeo - 0.3, 0.3, { aLu: 160, aLf: -60, pupX: -16, pupY: 4 }, "power2.inOut");
  api.origin("#nk", ((CX0 + CX1) / 2) + " " + (CT + 63));
  api.key("#nk", "y", 0, 0); api.key("#nk", "scale", 0, 1); api.key("#nk", "y", tKeo, 0, "none"); api.key("#nk", "scale", tKeo, 1, "none");
  api.key("#nk", "y", tKeo + 0.35, 24, "power2.out"); api.key("#nk", "scale", tKeo + 0.35, 1.06, "power2.out");
  api.show("#nkLong", tKeo + 0.05, 1);
  Wf.pose(tKeo, 0.35, { aLu: 66, aLf: 96 }, "power2.out");
  // đặt chìa vào lòng ngăn
  Wf.pose(tPut - 0.25, 0.3, { aLu: 160, aLf: -28, pupX: -16, pupY: 12 }, "power2.inOut");
  api.show("#kL", tPut + 0.12, 0); api.show("#chiaNam", tPut + 0.12, 1);
  Wf.pose(tPut + 0.15, 0.2, { aLu: 160, aLf: -60 }, "power2.out");
  // đẩy đóng đúng "drawer."
  api.key("#nk", "y", tDrawer - 0.2, 24, "none"); api.key("#nk", "scale", tDrawer - 0.2, 1.06, "none");
  api.key("#nk", "y", tDrawer + 0.02, 0, "power2.in"); api.key("#nk", "scale", tDrawer + 0.02, 1, "power2.in");
  api.show("#nkLong", tDrawer + 0.02, 0);
  Wf.pose(tDrawer - 0.2, 0.22, { aLu: 150, aLf: -70, lean: -3 }, "power2.in");
  Wf.pose(tDrawer + 0.1, 0.12, { sy: 0.96, sx: 1.03 }, "power2.out");
  Wf.pose(tDrawer + 0.3, 0.25, { sy: 1, sx: 1, lean: 0 }, "power2.out");
  Wf.pose(tDrawer + 0.7, 0.5, { aLu: 18, aLf: -10, pupX: -12, pupY: 10, lid: 14 }, "sine.inOut");
  Wf.mouth(tDrawer + 0.5, "flat");
  Wf.autoBlink(tF, DUR, 3405);
  KR.thong(api, Wf, "R", "#rR", 0, DUR, { goc: 0, lac: 1.0 });
  KR.thong(api, Wf, "L", "#kL", 0, DUR, { goc: 0, lac: 0.5 });
};
