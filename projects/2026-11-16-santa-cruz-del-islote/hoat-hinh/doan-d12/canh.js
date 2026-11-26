/* Đoạn d12 · cắt giấy · hồi ức (kể tôn trọng): ngư dân ở lại, tự đắp đảo bằng san hô, đá, vỏ sò, đồ biển dạt vào, rồi láng xi măng;
   nền xi măng láng tới dưới chân Wob, tông giấy cũ ấm dần thành ban ngày (không cắt cứng); Wob đặt góp một vỏ sò; từ trên cao: đảo y nguyên.
   Vào "cat", ra "giay" (sang d13). Sepia: api.locSepia trên cảnh đảo; Wob và nền dưới chân luôn màu thật (lớp chuyến đi).
   Trang phục: mũ cói; ba lô khổng lồ đặt dưới đất cạnh tường (không đeo); hai tay nâng vỏ sò dẹt. Không chữ trên hình. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, NB = window.NhietDoiB, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }

  var tBig = T("bigger", 0, 3.8), tCoral = T("coral", 0, 5.26), tStone = T("stone", 0, 6.01), tShell = T("shells", 0, 6.47), tWash = T("washed", 0, 8.05);
  var tCement = T("cement", 0, 9.8), tSome = T("Some", 0, 10.54), tUnder = T("under", 0, 11.32), tGreat = T("great-grandparents", 0, 12.84);
  var tHelp = T("help", 0, 14.82), tFound = T("found", 0, 15.7), tCarr = T("carried", 0, 17.19), tDown = T("down", 0, 18.72), tIsl = T("island", 1, 20.4), tFair = T("Fair", 0, 22.5);
  var tTop = tIsl - 0.25;
  var WL = 700;   // mép nước của đảo (cảnh nhìn ngang)

  // =================== cảnh nhìn ngang (lọc sepia → màu thật) ===================
  var sep = api.locSepia("sep2", [[0, 0.85], [tSome - 0.2, 0.85], [tUnder + 0.6, 0]]);
  var c = '<rect x="-200" y="-200" width="2400" height="' + (WL + 220) + '" fill="url(#ndTroi)"/>' + D.paper(D.rEll(1560, 170, 66, 66, 1.5, 31), "#FFF0C2", { shadow: false, stroke: true, sw: 4 }) +
    at(400, 180, D.puff(56, 12, "#FFFFFF")) + '<rect x="-200" y="' + (WL - 30) + '" width="2400" height="700" fill="#8ED5CB"/>' +
    at(200, WL - 26, sc(0.4, ND.daoXanh({ w: 900, seed: 873 })));
  c += ND.bien(api, "bx", { x0: -400, x1: 2400, y: WL - 20, n: 2, day: 40, bien: 24 });
  // các nấc đảo: nền cũ + 3 nấc nở ra hai bên, mỗi nấc một hàng nhà mọc theo
  var nac = [[860, 1060], [740, 1180], [620, 1300], [500, 1420]];
  var mau = ["#E8A89A", "#A8A096", "#F2D3C2"];
  c += at(960, WL, sc(0.62, ND.daoTroTrui({ w: 340, seed: 891 })));
  for (var n = 1; n < 4; n++) {
    var a = nac[n], b = nac[n - 1], r = D.rng(500 + n), g = "";
    [[a[0], b[0]], [b[1], a[1]]].forEach(function (seg, j) {
      g += D.paper(D.rough([[seg[0], WL + 4], [seg[0] + 8, WL - 16], [seg[1] - 8, WL - 18], [seg[1], WL + 4]], 2.5, 600 + n * 3 + j, 12), mau[n - 1], { stroke: true, sw: 4, sx: 4, sy: 5 });
      for (var k = 0; k < 5; k++) g += at(seg[0] + 14 + r() * (seg[1] - seg[0] - 28), WL - 12, sc(0.5, ND.manh(["sanho", "da", "oc"][n - 1], 26, 700 + n * 10 + k + j * 5)));
    });
    c += '<g id="nac' + n + '">' + g + "</g>";
  }
  // nhà mọc theo từng nấc (mặt cắt nhiều lớp: hàng sau nhỏ hơn)
  var hang = [[[900, 72], [990, 80]], [[770, 70], [1100, 76], [850, 64]], [[650, 74], [1220, 70], [1150, 66], [700, 60]], [[530, 70], [1340, 74], [600, 64], [1280, 62]]];
  hang.forEach(function (hs, n) {
    var g = "";
    hs.forEach(function (h, k) {
      g += at(h[0] + 36, WL - 16 - (k > 1 ? 18 : 0), '<g transform="scale(' + (k > 1 ? 0.2 : 0.24) + ')">' + ND.nha({ w: 300, h: 230, seed: 800 + n * 10 + k, mau: ND.M.tuong[(n * 3 + k) % 7], cua: k % 2 ? 0.2 : -0.2, so: 1 }) + "</g>");
    });
    c += '<g id="hn' + n + '">' + g + "</g>";
  });
  // đồ biển dạt vào (tấm ván, thùng gỗ, phao)
  c += '<g id="dat0">' + D.paper(D.rRect(-40, -8, 80, 16, 1.5, 811), "#9C7A55", { stroke: true, sw: 3 }) + "</g>" +
    '<g id="dat1">' + D.paper(D.rRect(-18, -30, 36, 30, 1.5, 812), "#B08A5A", { stroke: true, sw: 3 }) + "</g>" +
    '<g id="dat2"><circle r="12" fill="#E9806E" stroke="' + D.INK + '" stroke-width="3"/></g>';
  // xi măng láng dần trên mặt đảo
  c += '<clipPath id="xmCl"><rect id="xmR" x="480" y="' + (WL - 30) + '" width="0" height="40"/></clipPath>' +
    '<g clip-path="url(#xmCl)">' + D.paper(D.rRect(490, WL - 22, 940, 14, 1.5, 821), "#CFC8B8", { stroke: true, sw: 3, shadow: false }) + "</g>";
  // thuyền và ngư dân (người giấy chung, không mặt)
  var tg = ND.thuyen("tg", { mau: "#9C7A55", vien: "#C9A46A", may: false });
  c += at(700, WL + 6, sc(0.3, tg.sau + tg.truoc));
  c += NB.nguoiDat(api, "nd0", 830, WL - 10, 0.3, { sau: true, ao: "#B0714A", quan: "#5E4A3A", da: "#A87756", mu: true });
  c += NB.nguoiDat(api, "nd1", 1090, WL - 12, 0.3, { sau: true, ao: "#5F7C8A", quan: "#3B3430", da: "#A87756" });
  c += NB.nguoiDat(api, "nd2", 960, WL - 14, 0.28, { sau: true, ao: "#7A8C5A", quan: "#4A3F36", da: "#A87756", mu: "#C9B07A" });
  var canh = '<g filter="url(#sep2)">' + c + "</g>";

  // nền dưới chân Wob (lớp chuyến đi): giấy trơn → xi măng láng tới
  var nen = '<rect x="-200" y="' + (WL + 210) + '" width="2400" height="400" fill="#E3D6B8"/>' + D.line("M -200 " + (WL + 212) + " L 2200 " + (WL + 212), 4, D.INK, ' opacity="0.4"') +
    '<clipPath id="nenCl"><rect id="nenR" x="2000" y="' + (WL + 200) + '" width="0" height="400"/></clipPath>' +
    '<g clip-path="url(#nenCl)"><rect x="-200" y="' + (WL + 206) + '" width="1880" height="400" fill="#DAD3C3"/>' + D.line("M -200 " + (WL + 208) + " L 1680 " + (WL + 208), 4, D.INK, ' opacity="0.45"') +
    D.line("M 300 " + (WL + 240) + " L 260 " + (WL + 380) + " M 900 " + (WL + 236) + " L 870 " + (WL + 380) + " M 1400 " + (WL + 240) + " L 1380 " + (WL + 380), 2.5, "#B8B0A0") + "</g>" +
    '<rect x="1680" y="' + (WL + 210) + '" width="600" height="400" fill="#3FA9A6"/>' + D.line("M 1680 " + (WL + 210) + " L 1680 1200", 4, D.INK, ' opacity="0.4"');
  var tuong = at(120, WL + 214, D.paper(D.rRect(-300, -420, 380, 420, 1.6, 831), ND.M.tuong[2], { stroke: true, sw: 5 })) +
    at(130, WL + 214, sc(0.55, ND.baLo("pk", {})));
  var VO = '<g id="voTay" opacity="0"><g transform="translate(200,262) scale(1.1)">' + ND.voSo({}) + "</g></g>";
  var NG = '<g id="W-n1" opacity="0">' + D.line("M 0 6 L 0 40", 13) + "</g>" + '<g id="W-n2" opacity="0">' + D.line("M -6 6 L -14 38", 13) + "</g>" + '<g id="W-n3" opacity="0">' + D.line("M 6 6 L 14 38", 13) + "</g>";
  var W = ND.wob(api, "W", { lung: 0, holdR: NG, phuKien: VO });
  var voDat = '<g id="voDat">' + sc(0.62, ND.voSo({})) + "</g>";
  var sS = '<g id="sS"><g id="sSk">' + canh + nen + tuong + voDat + W.svg + "</g></g>";

  // =================== từ trên cao cả đảo ===================
  var r3 = D.rng(58), gon = "";
  for (var i = 0; i < 24; i++) gon += D.line("M " + D.f1(-100 + r3() * 2100) + " " + D.f1(r3() * 1080) + " c 20 -10 40 10 60 0", 4, "#EAF7F2", ' opacity="0.45"');
  var hatTop = '<g id="nonWob"><circle r="16" fill="' + ND.M.coi + '" stroke="' + D.INK + '" stroke-width="3"/><circle r="16" fill="url(#ndDan)" opacity="0.7"/>' +
    '<circle r="9" fill="' + ND.M.coi + '" stroke="' + D.INK + '" stroke-width="2.5"/><circle r="9" fill="none" stroke="' + ND.M.dai + '" stroke-width="3.5"/></g>';
  var sT = '<g id="sT"><g id="sTk"><rect x="-200" y="-200" width="2400" height="1500" fill="#3FA9A6"/>' + gon +
    at(960, 540, sc(1.25, ND.daoTuTren({ w: 720, h: 470, seed: 901 }))) +
    at(1390, 712, '<g transform="rotate(-30)">' + sc(0.2, ND.voSo({})) + "</g>") + at(1362, 676, hatTop) +
    at(1400, 690, '<g id="muiTen">' + ND.muiTen(46) + "</g>") + "</g></g>";

  api.dat(ND.defs() + "<defs>" + sep + "</defs>" + sS + sT);
  api.noi({});
  ["#voTay", "#W-n1", "#W-n2", "#W-n3", "#sT"].forEach(function (s) { api.show(s, 0, 0); });
  var tGat = tFair - 0.3;
  api.show("#sS", 0, 1); api.show("#sS", tTop, 0); api.show("#sT", tTop, 1); api.show("#sS", tGat, 1); api.show("#sT", tGat, 0);
  api.origin("#sSk", "960 640");
  api.key("#sSk", "scale", 0, 1.08, "none"); api.key("#sSk", "scale", tSome, 1.0, "sine.inOut"); api.key("#sSk", "scale", tTop, 1.04, "sine.inOut");
  api.key("#sSk", "x", 0, 0, "step"); api.key("#sSk", "y", 0, 0, "step");
  api.key("#sSk", "scale", tGat, 1.7, "step"); api.key("#sSk", "x", tGat, -672, "step"); api.key("#sSk", "y", tGat, -347, "step");
  api.key("#sSk", "scale", DUR, 1.8, "sine.inOut"); api.key("#sSk", "x", DUR, -768, "sine.inOut"); api.key("#sSk", "y", DUR, -372, "sine.inOut");

  // ---------- ngư dân ở lại: dỡ đồ, dựng mái đầu tiên ----------
  api.origin("#hn0", "960 " + WL); api.key("#hn0", "scaleY", 0, 0, "step"); api.key("#hn0", "scaleY", tBig - 0.5, 0, "none"); api.key("#hn0", "scaleY", tBig, 1, "back.out(1.8)");
  NB.nguoiDi(api, "nd0", 0.3, 1.8, 900, { buoc: 0.4 });
  NB.nguoiDi(api, "nd2", 0.6, 2.2, 1000, { buoc: 0.42 });
  ["nd0", "nd2"].forEach(function (id, j) { api.key("#" + id + "-tayR", "rotation", 0, -140, "step"); api.key("#" + id + "-tayL", "rotation", 0, 140, "step"); api.key("#" + id + "-tayR", "rotation", 2.4 + j * 0.2, -20, "power2.inOut"); api.key("#" + id + "-tayL", "rotation", 2.4 + j * 0.2, 20, "power2.inOut"); });
  // ---------- đắp đảo ba nấc ----------
  var tN = [tCoral, tStone, tShell];
  tN.forEach(function (t, j) {
    var n = j + 1;
    api.origin("#nac" + n, "960 " + WL); api.key("#nac" + n, "scaleY", 0, 0, "step"); api.key("#nac" + n, "scaleY", t - 0.25, 0, "none"); api.key("#nac" + n, "scaleY", t, 1, "back.out(2.2)");
    api.origin("#hn" + n, "960 " + WL); api.key("#hn" + n, "scaleY", 0, 0, "step"); api.key("#hn" + n, "scaleY", t + 0.05, 0, "none"); api.key("#hn" + n, "scaleY", t + 0.4, 1, "back.out(1.8)");
    api.sfx("pop", t - 0.08, 0.45);
    // ngư dân hai mép cúi xếp
    ["nd0", "nd1"].forEach(function (id) { api.key("#" + id + "-tayR", "rotation", t - 0.3, -20, "none"); api.key("#" + id + "-tayR", "rotation", t - 0.05, -70, "power2.out"); api.key("#" + id + "-tayR", "rotation", t + 0.3, -20, "power2.inOut"); });
  });
  api.key("#nd0-vt", "x", tCoral - 0.6, 900, "none"); api.key("#nd0-vt", "x", tShell + 0.6, 640, "sine.inOut");
  api.key("#nd1-vt", "x", tCoral - 0.6, 1090, "none"); api.key("#nd1-vt", "x", tShell + 0.6, 1290, "sine.inOut");
  // đồ biển dạt vào, dính vào mép
  [["#dat0", 1700, 1440, 0], ["#dat1", 1800, 1460, 0.25], ["#dat2", 300, 480, 0.45]].forEach(function (d) {
    api.key(d[0], "x", 0, d[1], "step"); api.key(d[0], "y", 0, WL - 4, "step");
    api.key(d[0], "x", tWash - 1.0 + d[3], d[1], "none"); api.key(d[0], "x", tWash + 0.2 + d[3], d[2], "sine.out");
    api.key(d[0], "rotation", 0, 0, "step"); api.key(d[0], "rotation", tWash - 1.0 + d[3], 10, "none"); api.key(d[0], "rotation", tWash + 0.2 + d[3], 0, "sine.out");
  });
  // xi măng láng
  function ss(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
  var xm = null, nr = null;
  api.moiKhung(function (t) {
    if (!api.dom) return;
    if (!xm) { xm = document.getElementById("xmR"); nr = document.getElementById("nenR"); }
    xm.setAttribute("width", (960 * ss((t - (tCement - 0.6)) / 0.9)).toFixed(1));
    var u = ss((t - (tSome - 0.1)) / 1.1), x = 2000 - 2200 * u;
    nr.setAttribute("x", x.toFixed(1)); nr.setAttribute("width", (2000 - x).toFixed(1));
  });

  // ---------- Wob ở mép cảnh: nhìn, đếm nấc ----------
  W.set(0, { x: 560, y: WL + 230, size: 0.62, pupX: 9, pupY: -6 });
  W.idle(0.2, tCoral - 0.3, { seed: 4, bien: 1.3, liec: false });
  W.pose(tBig - 0.3, 0.2, { eye: 1.1 }, "power2.out"); W.pose(tBig + 0.4, 0.2, { eye: 1 }, "power2.out");
  W.pose(tCoral - 0.2, 0.2, { aRu: -150, aRf: -10 }, "back.out(1.6)");
  api.show("#W-n1", tCoral - 0.15, 1); api.show("#W-n2", tStone - 0.05, 1); api.show("#W-n3", tShell - 0.05, 1);
  [tCoral, tStone, tShell].forEach(function (t) { W.pose(t - 0.05, 0.1, { aRf: -24 }, "power2.out"); W.pose(t + 0.1, 0.15, { aRf: -10 }, "power2.inOut"); });
  W.pose(tShell + 1.0, 0.3, { aRu: -18, aRf: 10 }, "power2.inOut");
  ["#W-n1", "#W-n2", "#W-n3"].forEach(function (s) { api.show(s, tShell + 1.1, 0); });
  W.mouth(tShell + 0.2, "o"); W.mouth(tShell + 1.1, "X");
  W.idle(tShell + 1.3, tSome, { seed: 6, bien: 1.2, liec: true });
  // nền láng tới chân: cúi gõ nhẹ hai cái như gõ cửa, rụt tay lễ phép
  var tGo = tGreat - 0.6;
  W.pose(tUnder, 0.3, { pupX: 0, pupY: 12 }, "power2.out");
  W.pose(tGo, 0.3, { sy: 0.86, upY: 22, lean: 4, aRu: -40, aRf: -30 }, "power2.out");
  [tGo + 0.35, tGo + 0.6].forEach(function (t) { W.pose(t, 0.08, { aRf: 10 }, "power3.in"); W.pose(t + 0.08, 0.12, { aRf: -30 }, "power2.out"); });
  W.pose(tGo + 0.95, 0.3, { sy: 1, upY: 0, lean: 0, aRu: 40, aRf: 100, pupY: 0 }, "power2.inOut");
  W.mouth(tGo + 1.0, "thang");
  W.pose(tHelp - 0.3, 0.3, { aRu: -18, aRf: 10 }, "power2.inOut");
  // nâng vỏ sò dẹt bằng hai tay, đi từng bước ra mép đảo, đặt xuống
  api.key("#voDat", "x", 0, 700, "step"); api.key("#voDat", "y", 0, WL + 226, "step");
  W.walk(tHelp, tFound + 0.2, 560, 690, { step: 0.3 });
  W.pose(tFound + 0.3, 0.3, { sy: 0.88, upY: 18, aLu: -30, aLf: -20, aRu: 30, aRf: 20, pupY: 10 }, "power2.out");
  api.show("#voDat", tFound + 0.65, 0); api.show("#voTay", tFound + 0.65, 1);
  W.pose(tFound + 0.7, 0.35, { sy: 1, upY: 0, aLu: -40, aLf: -70, aRu: 40, aRf: 70, pupY: 4 }, "power2.out");
  W.mouth(tFound + 0.7, "smirk");
  W.walk(tCarr - 0.1, tDown - 0.1, 690, 1560, { step: 0.42, arms: false });
  W.pose(tDown - 0.05, 0.4, { sy: 0.86, upY: 22, lean: 4, aLu: -20, aLf: -30, aRu: 20, aRf: 30 }, "sine.inOut");
  api.show("#voTay", tDown + 0.35, 0);
  api.key("#voDat", "x", tDown + 0.35, 1640, "step"); api.key("#voDat", "y", tDown + 0.35, WL + 228, "step"); api.show("#voDat", tDown + 0.35, 1);
  W.pose(tDown + 0.6, 0.4, { sy: 1, upY: 0, lean: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupY: 8 }, "power2.inOut");
  W.idle(tDown + 1.0, tTop, { seed: 8, bien: 1 });

  // ---------- từ trên cao: đảo y nguyên, mũi tên tí hon chỉ vào vỏ sò ----------
  api.origin("#sTk", "1380 700");
  api.key("#sTk", "scale", tTop, 2.4, "none"); api.key("#sTk", "scale", tIsl + 1.0, 1.0, "power2.inOut"); api.key("#sTk", "scale", DUR, 1.18, "sine.inOut");
  api.origin("#muiTen", "0 0"); api.pop("#muiTen", tIsl + 1.1, 0.25); api.sfx("ting", tIsl + 1.15, 0.5);
  api.key("#muiTen", "y", tIsl + 0.9, 0, "none");
  for (var q = 0; q < 4; q++) { api.key("#muiTen", "y", tIsl + 1.1 + q * 0.5, -6, "sine.inOut"); api.key("#muiTen", "y", tIsl + 1.35 + q * 0.5, 0, "sine.inOut"); }
  // gật đầu chấp nhận (mũ nhún), giữ
  api.origin("#nonWob", "0 0");
  [tFair, tFair + 0.35].forEach(function (t) { api.key("#nonWob", "scaleY", t, 1, "none"); api.key("#nonWob", "scaleY", t + 0.12, 0.78, "power2.out"); api.key("#nonWob", "scaleY", t + 0.28, 1, "power2.inOut"); });
  W.autoBlink(0, tTop, 25);
  // trung cảnh: Wob nhìn vỏ sò của mình, gật đầu chấp nhận
  W.set(tGat, { pupX: 8, pupY: 10, upY: 0, upRot: 0 });
  [tGat + 0.15, tGat + 0.5].forEach(function (t) { W.pose(t, 0.14, { upY: 12, upRot: 3, pupY: 14 }, "power2.out"); W.pose(t + 0.16, 0.16, { upY: 0, upRot: 0, pupY: 8 }, "power2.inOut"); });
  W.mouth(tGat, "thang"); W.mouth(tGat + 0.5, "smirk");
};
