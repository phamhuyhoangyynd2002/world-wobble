/* d20 – Wob ngồi ghế gấp cạnh đường ngang đọc sổ; camera chui vào trang sepia (Wob đứng ngoài mép trang):
   đồng tuyết trống, nhà gỗ đầu tiên bật dựng; tờ quy hoạch + dấu sáp vương miện, nhãn 1900; người que đội mũ phớt cầm búa và cuộn giấy (không mặt);
   phố uốn theo sườn đồi; mũi tên gió đập góc nhà, gập lại, lủi đi; khăn Wob đang bay rủ xuống; nhà mọc kín, nhãn 1910;
   Wob đặt ngôi nhà giấy tí hon của mình vào khe trống, phủi tay.
   Cắt giấy, nhóm A. Chữ: 1900, 1910. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, ND = window.NhietDoi, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper, CH = data.chu_tren_do_vat;
  var S = XL.M.S || {};
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tHap = T("happen."), tKir = T("kiruna"), tNin = T("nineteen"), tAppr = T("approved"), tThe = T("the", 6.5), tGeo = T("geologist"), tWant = T("wanted"), tModel = T("model"),
    tHe = T("he", 13), tStreets = T("streets"), tClim = T("climate."), tBy = T("by", 16), tTen = T("ten", 17), tSeven = T("seven", 18), tLived = T("lived", 19);
  var tC = 0.9;   // chui vào trang

  /* ================= cảnh 1: ghế gấp cạnh đường ngang ================= */
  var n1 = '<rect x="-400" y="-400" width="2800" height="1200" fill="url(#xlTroiNgay)"/>';
  n1 += paper(D.rough([[-400, 600], [200, 470], [800, 560], [1400, 440], [2000, 540], [2400, 520], [2400, 760], [-400, 760]], 6, 17011, 30), "#B9C9D3", { stroke: true, sw: 4, shadow: false });
  var r1 = D.rng(17020);   // cùng nền với cuối d19 (nối liền)
  for (var k = 0; k < 22; k++) { var px = -380 + k * 130 + r1() * 50, ph = 50 + r1() * 50; n1 += paper("M " + px.toFixed(0) + " 712 L " + (px + 22).toFixed(0) + " " + (712 - ph).toFixed(0) + " L " + (px + 44).toFixed(0) + " 712 Z", "#4E6B5C", { stroke: true, sw: 3, shadow: false }); }
  n1 += paper("M -400 720 L 2400 720 L 2400 1500 L -400 1500 Z", "#F2F6F7", { stroke: true, sw: 4, shadow: false }) + XL.duongRay(-400, 2400, 760);
  n1 += '<g transform="translate(0,760)"><g id="tau1"><g transform="scale(0.85)">' + XL.tauQuang(14) + "</g></g></g>";   // đoàn tàu từ cuối d19 chạy tiếp
  n1 += paper(D.rough([[-400, 1000], [600, 985], [1300, 1005], [2400, 990], [2400, 1500], [-400, 1500]], 4, 17040, 30), "#F7FBFC", { stroke: true, sw: 4, shadow: false });
  n1 += at(1500, 905, XL.raoChan(api, "rao", 560));
  n1 += at(900, 1000, XL.gheGap(130, 170, "#C9463A"));
  var W = XL.wob(api, "W", { the: 1 });
  var so = at(900, 940, '<g transform="scale(0.55)">' + D.notebookOpen(360, 240, 20030) + "</g>");
  n1 += W.svg + so;
  var c1 = '<g id="c1">' + api.lop("n1", n1, 1, { mat: 900 }) + "</g>";

  /* ================= cảnh 2: trang sepia trên mặt gỗ ================= */
  var PX = 120, PY = 50, PW = 1440, PH = 940;
  function yS(kk, x) { var u = Math.max(0, Math.min(1, (x - 140) / 1400)); return 900 - kk * 110 - 240 * Math.pow(1 - u, 1.5); }
  var nen = '<rect x="-300" y="-300" width="2520" height="1680" fill="#6E5A44"/><rect x="-300" y="-300" width="2520" height="1680" fill="url(#xlGo)" opacity="0.8"/>';
  nen += at(PX, PY, XL.trangCu(PW, PH, { seed: 20040 }));
  // đồi tuyết dốc về phải (tông cũ)
  var doiPts = [], x;
  for (x = 150; x <= 1550; x += 50) doiPts.push([x, yS(2, x) - 80]);
  doiPts.push([1550, 975], [150, 975]);
  nen += paper(D.rough(doiPts, 3, 20041, 30), "#E9D9B4", { stroke: true, sw: 4, shadow: false });
  [[300, 0.9], [560, 0.75], [1250, 0.8]].forEach(function (p, i) { var yy = yS(2, p[0]) - 150; nen += paper("M " + (p[0] - 50) + " " + (yy + 60) + " L " + p[0] + " " + (yy - 30 * p[1]) + " L " + (p[0] + 50) + " " + (yy + 60) + " Z", "#F7F0DE", { stroke: true, sw: 3, shadow: false }); });
  // phố uốn theo sườn đồi: 3 dải, mỗi dải 10 khúc hiện dần
  var pho = "";
  for (var kk = 2; kk >= 0; kk--) for (var j = 0; j < 10; j++) {
    var xa = 150 + j * 140, xb = xa + 140, dd = "M " + xa + " " + yS(kk, xa).toFixed(1);
    for (x = xa + 20; x <= xb; x += 20) dd += " L " + x + " " + yS(kk, x).toFixed(1);
    pho += '<g id="p' + kk + "_" + j + '">' + line(dd, 30) + line(dd, 22, "#F7F0DE") + line(dd, 3, S.nauNhat || "#B89A70", ' stroke-dasharray="10 12"') + "</g>";
  }
  // nhà gỗ nhiều màu (tông cũ): hàng sau trước, hàng trước sau
  var MAU = ["#B5523F", "#C9A24A", "#6E8A6A", "#5E7A9A", "#A8674A", "#8A6E9A", "#C98A4A"];
  var nha = [], nhaSvg = "";
  var hang = [[2, [250, 430, 610, 790, 970, 1150, 1330]], [1, [330, 510, 690, 870, 1050, 1230, 1430]], [0, [520, 700, 880, 1060, 1240]]];
  var n = 0;
  hang.forEach(function (h) {
    h[1].forEach(function (hx) {
      var id = "h" + n, yy = yS(h[0], hx) - 4;
      nhaSvg += '<g transform="translate(' + hx + "," + yy.toFixed(1) + ')"><g id="' + id + '"><g transform="scale(0.42)">' + XL.nhaGo({ w: 260, h: 210, mau: MAU[(n * 3) % MAU.length], seed: 20100 + n, sep: true, cua: n % 2 ? 50 : -50 }) + "</g></g></g>";
      nha.push({ id: id, k: h[0], x: hx }); n++;
    });
  });
  var GAP = [1420, yS(0, 1420) - 4];
  var nhaWob = '<g transform="translate(' + GAP[0] + "," + GAP[1].toFixed(1) + ')"><g id="nhaWob"><g transform="scale(0.42)">' + XL.nhaGo({ w: 260, h: 210, mau: "#4F7A5A", seed: 20190, sep: true, cua: 0 }) + "</g></g></g>";
  // tờ quy hoạch (góc trên phải) + dấu sáp
  var plan = '<g id="planV"><g id="plan">' + paper(D.rRect(980, 110, 460, 270, 1.4, 20050), "#F3E6C4", { stroke: true, sw: 4.5, sx: 5, sy: 7 });
  plan += line("M 1010 330 C 1120 300 1240 250 1410 170", 10, "#A8865C") + line("M 1010 270 C 1110 240 1220 200 1330 140", 10, "#A8865C") + line("M 1060 370 C 1180 340 1300 290 1420 240", 10, "#A8865C");
  [[1060, 300], [1150, 262], [1240, 222], [1120, 340], [1220, 300], [1320, 250], [1190, 190]].forEach(function (b, i) { plan += '<rect x="' + b[0] + '" y="' + (b[1] - 14) + '" width="34" height="24" fill="none" stroke="#8E6E4A" stroke-width="3"/>'; });
  plan += "</g></g>";
  var seal = '<g transform="translate(1380,330)"><g id="seal">' + paper(D.rEll(0, 0, 46, 42, 4, 20060), "#B0322A", { stroke: true, sw: 4, shadow: false }) + '<circle cx="0" cy="0" r="30" fill="#C9463A" stroke="#8E2420" stroke-width="3"/>' +
    '<g transform="translate(0,14)">' + XL.vuongMien("vm", 40) + "</g></g></g>";
  var the00 = '<g transform="translate(1040,300) rotate(-4)"><g id="the00">' + ND.theChu("", CH[0], 60, { seed: 20070, nen: "#F3E6C4" }) + "</g></g>";
  var the10 = '<g transform="translate(1150,470) rotate(3)"><g id="the10">' + ND.theChu("", CH[1], 60, { seed: 20071, nen: "#F3E6C4" }) + "</g></g>";
  // người que đội mũ phớt, búa địa chất (tay phải), cuộn giấy (tay trái) – không mặt
  var bua = '<g transform="rotate(-20)">' + line("M 0 6 L 0 -46", 8, "#7A5A3A") + paper(D.rRect(-16, -58, 32, 12, 1, 20080), "#6A6E72", { stroke: true, sw: 3, shadow: false }) + "</g>";
  var cuonTay = '<g id="cuonTay">' + paper(D.rRect(-8, -30, 16, 60, 1, 20081), "#F3E6C4", { stroke: true, sw: 3, shadow: false }) + "</g>";
  var gl = XL.nguoiQue(api, "gl", { s: 0.72, sep: true, mu: "phot", ao: "#6A5440", cam: bua, camL: cuonTay });
  var cuon = '<g transform="translate(840,872)"><g id="cuon">' + paper(D.rRect(-300, -24, 300, 48, 1.2, 20082), "#F3E6C4", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
    line("M -284 4 C -210 -8 -130 -10 -16 -16 M -284 16 C -210 6 -130 2 -16 -4", 4, "#A8865C") + "</g></g>";
  // mũi tên gió lạnh
  var gio = '<g id="gioV"><g id="gio"><g transform="scale(-1,1)">' + XL.muiTenCong([[-330, 14], [-230, -22], [-120, 8], [0, -8]], "#5E9CC0", 30) + "</g></g></g>";   // gió từ phải sang
  // người que nhỏ đi lại (1910)
  var q1 = XL.nguoiQue(api, "q1", { s: 0.34, sep: true, ao: "#7A5E46" }), q2 = XL.nguoiQue(api, "q2", { s: 0.34, sep: true, ao: "#5E6A7A", lat: -1 });
  var B = XL.wob(api, "B", { the: 1, holdL: '<g id="B-nha"><g transform="translate(0,26) scale(0.42)">' + XL.nhaGo({ w: 260, h: 210, mau: "#4F7A5A", seed: 20190, sep: true, cua: 0 }) + "</g></g>" });
  var trangG = nen + pho + nhaSvg + nhaWob + cuon + gl + q1 + q2 + plan + seal + the00 + the10 + gio;
  var BS = 0.8, SX = 260, SY = 865, ST = 960;   // Wob ngồi ghế gấp ở góc trái dưới trang (chân ghế y 960); đứng: chân y ST
  var ghe2 = at(SX, ST, XL.gheGap(130, 170, "#C9463A"));
  var c2 = '<g id="c2">' + api.lop("n2", trangG + ghe2 + B.svg, 1, { mat: 900 }) + "</g>";

  api.dat(XL.defs() + c1 + c2);
  api.noi({});
  api.show("#c1", 0, 1); api.show("#c2", 0, 0); api.fade("#c2", tC, 0.2, 1); api.show("#c1", tC + 0.22, 0);

  /* ---------- cảnh 1: ngồi đọc, camera chui vào sổ ---------- */
  api.camera([[0, 900, 745, 1.46], [0.25, 905, 790, 1.55, "sine.in"], [tC + 0.2, 900, 860, 3.4, "power2.in"]], ["n1"]);
  api.key("#rao-tay", "rotation", 0, -80);
  var TX0 = 2200 + 330 * (30.026 - 25.2);   // vị trí tàu ở khung cuối d19 (tau2: 2200 + 330·(DUR19 − tCut19))
  api.key("#tau1", "x", 0, TX0); api.key("#tau1", "x", DUR, TX0 + 330 * DUR, "none");
  W.set(0, { x: 900, y: 905, size: 0.8, upY: 40, legL: 70, legR: -70, aLu: -20, aLf: 60, aRu: 20, aRf: -60, pupX: 0, pupY: 14 });
  W.mouth(0, "flat"); W.autoBlink(0.3, tC + 0.3, 201);
  W.pose(0.2, 0.4, { pupY: 18, lean: -4 }, "sine.inOut");

  /* ---------- cảnh 2 ---------- */
  api.camera([[tC, 700, 700, 1.25], [tC + 0.4, 760, 560, 1.0, "power2.out"], [tHap - 0.1, 760, 560, 1.0, "sine.inOut"], [tHap + 0.5, 560, 680, 1.35, "power2.inOut"],
    [tKir - 0.1, 560, 680, 1.35, "sine.inOut"], [tKir + 0.6, 812, 560, 1.08, "power2.inOut"], [tAppr + 0.7, 812, 560, 1.1, "sine.inOut"], [tThe + 0.5, 760, 580, 1.0, "power2.inOut"],
    [tGeo - 0.3, 760, 590, 1.02, "sine.inOut"], [tGeo + 0.4, 640, 760, 1.4, "power2.inOut"], [tHe - 0.3, 650, 760, 1.4, "sine.inOut"], [tHe + 0.4, 760, 580, 1.0, "power2.inOut"],
    [tBy, 760, 580, 1.0, "sine.inOut"], [tSeven + 0.5, 1260, 620, 1.12, "sine.inOut"], [DUR, 1270, 620, 1.14, "sine.inOut"]], ["n2"]);
  // Wob ngồi ghế gấp ngay cạnh chỗ ngôi nhà đầu tiên sẽ bật dựng, đủ người trong khung từ khung đầu cảnh
  B.set(0, { x: SX, y: SY, size: BS, upY: 40, legL: 70, legR: -70, aLu: 10, aLf: -20, aRu: -10, aRf: 20, pupX: 12, pupY: -4 });
  api.show("#B-nha", 0, 0);
  B.mouth(0, "flat"); B.autoBlink(tC + 0.3, DUR, 202);
  // nhà đầu tiên bật dựng đúng "happen."
  var h0 = nha.filter(function (h) { return h.k === 0 && h.x === 520; })[0];
  nha.forEach(function (h) { api.show("#" + h.id, 0, 0); });
  api.show("#" + h0.id, tHap - 0.1, 1); api.origin("#" + h0.id, "0 0"); api.pop("#" + h0.id, tHap - 0.1, 0.25);
  api.sfx("pop", tHap - 0.06, 0.5);
  B.pose(tC + 0.3, 0.4, { lean: 4, pupX: 14, pupY: -2 }, "sine.inOut");
  B.pose(tHap, 0.25, { lean: 14, eye: 1.1, pupX: 16, pupY: 2 }, "power2.out"); B.mouth(tHap + 0.1, "smirk");
  B.pose(tHap + 0.7, 0.4, { lean: 6, eye: 1 }, "sine.inOut");
  // tờ quy hoạch trượt vào, nhãn 1900, dấu sáp đúng "approved"
  api.key("#plan", "y", 0, -460); api.key("#plan", "y", tKir - 0.1, -460, "none"); api.key("#plan", "y", tKir + 0.45, 0, "power3.out");
  api.key("#plan", "rotation", 0, -6); api.key("#plan", "rotation", tKir + 0.45, 0, "back.out(2)"); api.origin("#plan", "1210 245");
  api.sfx("lat-giay", tKir, 0.5);
  api.pop("#the00", tNin - 0.1, 0.25);
  api.origin("#seal", "0 0");
  api.show("#seal", 0, 0); api.show("#seal", tAppr - 0.25, 1);
  api.key("#seal", "y", 0, -260); api.key("#seal", "y", tAppr - 0.25, -260, "none"); api.key("#seal", "y", tAppr, 0, "power3.in");
  api.key("#seal", "scaleY", 0, 1); api.key("#seal", "scaleY", tAppr, 1, "none"); api.key("#seal", "scaleY", tAppr + 0.07, 0.8, "power2.out"); api.key("#seal", "scaleY", tAppr + 0.3, 1, "back.out(3)");
  api.key("#seal", "scaleX", 0, 1); api.key("#seal", "scaleX", tAppr, 1, "none"); api.key("#seal", "scaleX", tAppr + 0.07, 1.18, "power2.out"); api.key("#seal", "scaleX", tAppr + 0.3, 1, "back.out(3)");
  api.sfx("drop", tAppr - 0.02, 0.4);
  B.pose(tKir + 0.3, 0.4, { lean: 2, pupX: 14, pupY: -16 }, "sine.inOut");
  B.pose(tAppr, 0.1, { sy: 0.94, sx: 1.05, eye: 1.15 }, "power2.out"); B.pose(tAppr + 0.15, 0.25, { sy: 1, sx: 1, eye: 1 }, "back.out(2)");
  B.pose(tAppr + 0.6, 0.4, { lean: 4, pupX: 12, pupY: -10 }, "sine.inOut"); B.mouth(tAppr + 0.4, "grin"); B.mouth(tThe, "flat");
  // chờ: ngồi đung đưa chân, nghiêng người nhìn quanh trang (không đứng im)
  for (var sw = 0, ts = tThe + 0.2; ts < tGeo - 0.4; ts += 0.34, sw++) B.pose(ts, 0.3, { legL: sw % 2 ? 56 : 84, legR: sw % 2 ? -84 : -56 }, "sine.inOut");
  B.pose(tThe + 0.6, 0.5, { lean: -6, pupX: -8, pupY: -8 }, "sine.inOut"); B.pose(tThe + 1.7, 0.5, { lean: 8, pupX: 12, pupY: 4 }, "sine.inOut");
  // người que hiện đúng "geologist", đi vài bước, mở cuộn giấy trên đồng tuyết
  var GX0 = 640, GX1 = 840;
  api.key("#gl-vt", "x", 0, GX0); api.key("#gl-vt", "y", 0, yS(0, GX0) + 14);
  api.show("#gl-vt", 0, 0); api.show("#gl-vt", tGeo - 0.15, 1);
  api.origin("#gl-vt", "0 0");
  api.key("#gl-vt", "scaleY", 0, 0.05); api.key("#gl-vt", "scaleY", tGeo - 0.15, 0.05, "none"); api.key("#gl-vt", "scaleY", tGeo + 0.15, 1, "back.out(2)");
  XL.queDi(api, "gl", tGeo + 0.5, tWant - 0.2, GX1, { buoc: 0.3 });
  api.key("#gl-vt", "y", tGeo + 0.5, yS(0, GX0) + 14, "none"); api.key("#gl-vt", "y", tWant - 0.2, yS(0, GX1) + 14, "sine.inOut");
  api.key("#gl-tR", "rotation", tWant, 0, "none"); api.key("#gl-tR", "rotation", tWant + 0.3, -50, "power2.out"); api.key("#gl-tR", "rotation", tWant + 0.7, -20, "sine.inOut");
  api.key("#gl-tL", "rotation", tModel - 0.2, 0, "none"); api.key("#gl-tL", "rotation", tModel + 0.1, 40, "power2.out");
  api.show("#cuonTay", 0, 1); api.show("#cuonTay", tModel + 0.1, 0);
  api.origin("#cuon", "0 0");
  api.key("#cuon", "scaleX", 0, 0); api.key("#cuon", "scaleX", tModel + 0.1, 0.05, "none"); api.key("#cuon", "scaleX", tModel + 0.6, 1, "power2.out");
  api.show("#cuon", 0, 0); api.show("#cuon", tModel + 0.1, 1); api.fade("#cuon", tStreets, 0.4, 0);
  api.sfx("lat-giay", tModel + 0.1, 0.4);
  B.pose(tGeo - 0.4, 0.3, { legL: 70, legR: -70 }, "sine.inOut");
  B.pose(tGeo, 0.4, { lean: 8, pupX: 16, pupY: 4, eye: 1.06 }, "sine.inOut");
  // đứng dậy khỏi ghế, bước tới giữ mép trái cuộn quy hoạch (tay phải dang ngang) cho người que trải ra
  var WX2 = 540 - 210 * BS, WY2 = 872 + 165 * BS, tUp = tGeo + 0.6;
  B.pose(tUp, 0.3, { upY: 0, legL: 0, legR: 0, lean: 0, eye: 1 }, "back.out(1.6)");
  api.key("#B", "y", tUp, SY, "none"); api.key("#B", "y", tUp + 0.3, ST, "power2.out");
  B.walk(tUp + 0.45, tUp + 1.25, SX, WX2, { step: 0.22 });
  api.key("#B", "y", tUp + 0.45, ST, "none"); api.key("#B", "y", tUp + 1.25, WY2, "sine.inOut");
  B.pose(tWant - 0.1, 0.3, { lean: -4, aRu: -80, aRf: 0, pupX: 16, pupY: 6 }, "power2.out"); B.mouth(tWant, "smirk");
  B.pose(tModel + 0.6, 0.12, { sx: 1.04, sy: 0.97 }, "power2.out"); B.pose(tModel + 0.75, 0.2, { sx: 1, sy: 1 }, "back.out(2)");
  B.mouth(tModel + 0.6, "grin");
  // thả mép cuộn
  B.pose(tHe + 0.2, 0.2, { aRu: -18, aRf: 10, lean: 0 }, "power2.inOut");
  // phố uốn theo sườn đồi: khúc phố hiện dần từ trái sang
  for (kk = 0; kk < 3; kk++) for (j = 0; j < 10; j++) { var sel = "#p" + kk + "_" + j; api.show(sel, 0, 0); api.fade(sel, tHe + 0.4 + j * 0.15 + kk * 0.3, 0.15, 1); }
  // gió: khăn Wob bay phần phật, mũi tên lao vào góc nhà đúng "climate.", gập lại, lủi đi; khăn rủ xuống
  api.origin(W.xl.khanDuoi, "0 0"); api.origin(B.xl.khanDuoi, "0 0");
  api.key(B.xl.khanDuoi, "rotation", 0, 0); api.key(B.xl.khanDuoi, "rotation", tHe, 0, "none");
  for (var f = 0, tf = tHe + 0.12; tf < tClim + 0.05; tf += 0.13, f++) api.key(B.xl.khanDuoi, "rotation", tf, f % 2 ? 62 : 82, "sine.inOut");
  api.key(B.xl.khanDuoi, "rotation", tClim + 0.35, 0, "power2.in");
  api.key("#B-pom", "x", 0, 0); api.key("#B-pom", "x", tHe, 0, "none");
  for (f = 0, tf = tHe + 0.12; tf < tClim + 0.05; tf += 0.13, f++) api.key("#B-pom", "x", tf, f % 2 ? 14 : 22, "sine.inOut");
  api.key("#B-pom", "x", tClim + 0.35, 0, "power2.in");
  B.pose(tHe + 1.35, 0.3, { lean: 6, eye: 0.85, pupX: -12, pupY: 0 }, "power2.out"); B.mouth(tHe + 1.4, "thang");
  var hA = [h0.x + 58, yS(0, h0.x) - 70];
  api.key("#gioV", "x", 0, 1000); api.key("#gioV", "y", 0, hA[1]);
  api.show("#gioV", 0, 0); api.show("#gioV", tClim - 0.6, 1);
  api.key("#gioV", "x", tClim - 0.6, 1000, "none"); api.key("#gioV", "x", tClim, hA[0], "power2.in");
  api.origin("#gio", "0 0");
  api.key("#gio", "scaleX", 0, 1); api.key("#gio", "scaleX", tClim, 1, "none"); api.key("#gio", "scaleX", tClim + 0.12, 0.45, "power2.out");
  api.key("#gio", "rotation", 0, 0); api.key("#gio", "rotation", tClim + 0.12, 0, "none"); api.key("#gio", "rotation", tClim + 0.35, -38, "power2.out");
  api.key("#gioV", "x", tClim + 0.35, hA[0], "none"); api.key("#gioV", "x", tClim + 0.95, hA[0] + 160, "power2.in");
  api.key("#gioV", "y", tClim + 0.35, hA[1], "none"); api.key("#gioV", "y", tClim + 0.95, hA[1] + 170, "power2.in");
  api.fade("#gioV", tClim + 0.7, 0.25, 0);
  api.sfx("brr", tClim - 0.05, 0.6);
  // Wob sờ khăn
  B.pose(tClim + 0.35, 0.3, { lean: 0, eye: 1, aRu: -120, aRf: -110, pupX: 6, pupY: 16 }, "power2.inOut"); B.mouth(tClim + 0.4, "smirk");
  B.pose(tClim + 0.85, 0.12, { aRf: -90 }, "sine.inOut"); B.pose(tClim + 0.97, 0.12, { aRf: -110 }, "sine.inOut");
  B.pose(tBy - 0.05, 0.3, { aRu: -18, aRf: 10, pupX: -14, pupY: -4 }, "power2.inOut");
  // 1910: nhà mọc kín phố (chừa khe ở hàng trước, sát mép phải)
  var con = nha.filter(function (h) { return h !== h0; });
  con.forEach(function (h, i) { var t0 = tBy + 0.05 + i * 0.09; api.show("#" + h.id, t0, 1); api.origin("#" + h.id, "0 0"); api.pop("#" + h.id, t0, 0.2); });
  api.pop("#the10", tTen - 0.1, 0.25);
  // người que đi lại
  api.key("#q1-vt", "x", 0, 300); api.key("#q1-vt", "y", 0, yS(1, 300) + 8);
  api.key("#q2-vt", "x", 0, 1180); api.key("#q2-vt", "y", 0, yS(0, 1180) + 8);
  api.show("#q1-vt", 0, 0); api.show("#q2-vt", 0, 0); api.fade("#q1-vt", tTen, 0.2, 1); api.fade("#q2-vt", tTen + 0.2, 0.2, 1);
  XL.queDi(api, "q1", tTen + 0.2, DUR, 760, { buoc: 0.28 }); api.key("#q1-vt", "y", tTen + 0.2, yS(1, 300) + 8, "none"); api.key("#q1-vt", "y", DUR, yS(1, 760) + 8, "sine.inOut");
  XL.queDi(api, "q2", tTen + 0.4, DUR, 820, { buoc: 0.28 }); api.key("#q2-vt", "y", tTen + 0.4, yS(0, 1180) + 8, "none"); api.key("#q2-vt", "y", DUR, yS(0, 820) + 8, "sine.inOut");
  // gag: Wob lén đặt ngôi nhà giấy tí hon của mình vào khe trống
  // rút ngôi nhà tí hon, rảo bước dọc mép dưới trang (camera đi theo) tới khe trống, đặt vào đúng "lived"
  var tLay = tBy + 0.05, tDat = tLived - 0.25, GX = 1630;
  B.pose(tLay, 0.3, { aLu: 40, aLf: 40, pupX: 14, pupY: 6 }, "power2.out"); B.mouth(tLay, "smirk");
  api.show("#B-nha", tLay + 0.2, 1);
  B.walk(tLay + 0.3, tSeven + 0.5, WX2, GX, { step: 0.2, arms: "R" });
  B.pose(tSeven + 0.6, 0.35, { lean: -14, aLu: 100, aLf: 6, pupX: -16, pupY: -2 }, "power2.inOut");
  api.show("#B-nha", tDat, 0);
  api.show("#nhaWob", 0, 0); api.show("#nhaWob", tDat, 1);
  api.origin("#nhaWob", "0 0");
  api.key("#nhaWob", "y", 0, -26); api.key("#nhaWob", "y", tDat, -26, "none"); api.key("#nhaWob", "y", tDat + 0.14, 0, "power2.in");
  api.key("#nhaWob", "scaleY", 0, 1); api.key("#nhaWob", "scaleY", tDat + 0.14, 1, "none"); api.key("#nhaWob", "scaleY", tDat + 0.2, 0.9, "power2.out"); api.key("#nhaWob", "scaleY", tDat + 0.36, 1, "back.out(3)");
  api.sfx("pop", tDat + 0.12, 0.45);
  // vừa khít: đứng thẳng, phủi tay hai lần, nhìn người xem
  var tP = tDat + 0.35;
  B.pose(tP, 0.3, { lean: 0, aLu: -6, aLf: -70, aRu: 6, aRf: 70, pupX: 0, pupY: 4 }, "power2.out");
  B.pose(tP + 0.3, 0.1, { aLu: 0, aLf: -88, aRu: 0, aRf: 88 }, "sine.inOut"); B.pose(tP + 0.42, 0.1, { aLu: -10, aLf: -60, aRu: 10, aRf: 60 }, "sine.inOut");
  B.pose(tP + 0.54, 0.1, { aLu: 0, aLf: -88, aRu: 0, aRf: 88 }, "sine.inOut"); B.pose(tP + 0.66, 0.1, { aLu: -10, aLf: -60, aRu: 10, aRf: 60 }, "sine.inOut");
  B.mouth(tP + 0.3, "grin"); B.pose(tP + 0.9, 0.3, { aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 0, pupY: 2 }, "power2.inOut");
};
