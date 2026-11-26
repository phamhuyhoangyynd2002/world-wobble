/* Đoạn d10 · cắt giấy · hồi ức: hỏi chuyện quá khứ của đảo; trang sổ tông giấy cũ: đảo đá trơ trụi ~150 năm trước,
   ngư dân ghé nghỉ tránh bão, dấu hỏi to hơn hòn đảo, đêm không con muỗi nào; Wob gác muỗi bằng vợt rồi ngủ gật.
   Vào "cat" (khung đầu đủ hình), ra "chen" (sang d11 vẽ tay).
   Shot: lối đi, Wob cất cúc áo vào túi ba lô, ngồi ghế nghe 3 người giấy (nhìn từ sau) kể (0–4,4) → tờ sơ đồ lật mặt, lao vào trang sổ cũ (4,4–hết).
   Trên trang cũ (lọc sepia, tôn trọng): đảo đá, sóng; thuyền gỗ 3 ngư dân (người giấy chung, không mặt); mây bão; đêm sao.
   Wob ở NGOÀI mép trang (màu thật, lớp chuyến đi). Trang phục: mũ cói; ba lô khổng lồ dựa tường; cầm cúc → cất vào túi; nhịp cuối cầm vợt.
   Chữ: "~150 years ago", "?". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, NB = window.NhietDoiB, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var cx = data.chu_tren_do_vat;
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }

  var tAbout = T("About", 1, 4.85), tYears = T("years", 0, 6.0), tFish = T("Fishermen", 0, 9.7), tStorm = T("storms", 0, 12.71), tThat = T("That", 0, 13.61);
  var tTown = T("town", 0, 15.94), tPart = T("town", 1, 18.0), tNight = T("Night", 0, 20.52), tSettle = T("settled", 0, 21.93), tNothing = T("nothing", 0, 22.9);
  var tLat = tAbout - 0.6, tLao = tAbout - 0.42;

  // =================== lối đi ===================
  var nhaDs = [[300, 420, 380, 3, { cua: 0.3, so: 1, tranh: "song" }], [740, 420, 370, 1, { cua: -0.3, cuaMo: true, so: 1, soX: 80 }],
    [1180, 440, 390, 0, { cua: 0.35, so: 1, soX: -90 }], [1630, 420, 360, 6, { cua: -0.25, so: 0, tranh: "thuyen", tranhX: 60 }], [2060, 420, 370, 2, { cua: 0.2, so: 1 }]];
  var L = ND.loiDi(api, { seed: 1100, mat: 900, tu: -400, den: 2600, nha: nhaDs, ghe: [[1640, "#5FA8D3", "giua", 0.55]], phoi: [[-200, 400, 1900, 430, 34, "gan"]] });
  var giua = L.giua;
  giua += at(700, 906, '<g transform="rotate(-5)">' + sc(0.5, ND.baLo("pk", { uot: "pkU" })) + "</g>");
  giua += at(1060, 904, sc(0.55, ND.ghe({ mau: "#F4F2EC" })));
  var CUC = '<g id="W-cuc"><circle cx="0" cy="18" r="13" fill="#E9D7AE" stroke="' + D.INK + '" stroke-width="3.5"/><circle cx="-4" cy="14" r="2.2" fill="' + D.INK + '"/><circle cx="4" cy="14" r="2.2" fill="' + D.INK + '"/><circle cx="-4" cy="22" r="2.2" fill="' + D.INK + '"/><circle cx="4" cy="22" r="2.2" fill="' + D.INK + '"/></g>';
  var SODO = '<g id="W-sodo"><g transform="translate(0,40)"><g id="W-sodoL">' +
    '<g id="W-sodoA">' + D.paper(D.rRect(-48, -38, 96, 76, 1.5, 61), "#F3E6C4", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) +
    D.line("M -30 20 C -18 -4 4 18 16 -10", 3, "#C9463A", ' stroke-dasharray="6 5"') + D.line("M 18 -20 L 32 -6 M 32 -20 L 18 -6", 4, "#C9463A") + "</g>" +
    '<g id="W-sodoB" opacity="0">' + D.paper(D.rRect(-48, -38, 96, 76, 1.5, 62), "#D9C49A", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) +
    D.line("M -36 -20 L 36 -20 M -36 -4 L 36 -4 M -36 12 L 20 12", 2.5, "#9C8460") + "</g></g></g></g>";
  var W = ND.wob(api, "W", { lung: 0, holdL: CUC, holdR: SODO });
  giua += W.svg;
  var nguoi = "";
  [[1290, "#E9806E", "#4F6A80"], [1410, "#2A9D8F", "#3B3430"], [1530, "#F2CB57", "#5E6A70"]].forEach(function (p, i) {
    nguoi += NB.nguoiDat(api, "ng" + i, p[0], 906, 0.66, { sau: true, ao: p[1], quan: p[2], da: "#A87756", mu: i === 1 });
  });
  giua += nguoi;

  // =================== trang sổ cũ (nhóm màn hình) ===================
  var PX = 150, PY = 40, PW = 1460, PH = 860;
  var sep = api.locSepia("sep", [[0, 0.82]]);
  var r = D.rng(71);
  var noi = '<rect x="' + PX + '" y="' + PY + '" width="' + PW + '" height="' + PH + '" fill="url(#ndTroiCu)"/>' +
    at(PX + PW - 230, PY + 150, '<g id="matTroi">' + D.paper(D.rEll(0, 0, 56, 56, 1.5, 33), "#FBEFC7", { shadow: false, stroke: true, sw: 3 }) + "</g>") +
    '<rect x="' + PX + '" y="' + (PY + 470) + '" width="' + PW + '" height="' + (PH - 470) + '" fill="#8ED5CB"/>';
  noi += ND.bien(api, "bc", { x0: PX - 200, x1: PX + PW + 200, y: PY + 520, n: 3, day: 52, bien: 30 });
  noi += at(PX + PW / 2 + 40, PY + 640, '<g id="daoCu">' + sc(1.25, ND.daoTroTrui({ w: 620, seed: 891 })) + "</g>");
  // thuyền ngư dân (gỗ) + 3 người giấy chung
  var tg = ND.thuyen("tg", { mau: "#9C7A55", vien: "#C9A46A", may: false });
  var thuyenG = '<g id="tgG">' + sc(0.42, tg.sau) +
    NB.nguoiDat(api, "nd0", -40, -60, 0.4, { ngoi: true, ao: "#B0714A", quan: "#5E4A3A", da: "#A87756", sau: true, mu: true }) +
    NB.nguoiDat(api, "nd1", 70, -66, 0.4, { ngoi: true, ao: "#5F7C8A", quan: "#3B3430", da: "#A87756", sau: true }) + sc(0.42, tg.truoc) + "</g>";
  noi += at(0, 0, thuyenG);
  noi += NB.nguoiDat(api, "nd2", PX + 600, PY + 640, 0.42, { ao: "#7A8C5A", quan: "#4A3F36", da: "#A87756", sau: true, mu: "#C9B07A" });
  // ngư dân nằm ngủ (đêm)
  var ngu = "";
  [[PX + 640, 0], [PX + 760, 1], [PX + 1000, 2]].forEach(function (p, i) {
    ngu += at(p[0], PY + 604, D.paper(D.rEll(0, -14, 52, 18, 2.5, 1420 + i), ["#B0714A", "#5F7C8A", "#7A8C5A"][i], { stroke: true, sw: 3, sx: 3, sy: 4 }) +
      '<circle cx="-56" cy="-16" r="14" fill="#2E2622" stroke="' + D.INK + '" stroke-width="2.5"/>');
  });
  noi += '<g id="nguG" opacity="0">' + ngu + "</g>";
  // mây bão
  noi += '<g id="may">' + at(0, PY + 230, sc(1.7, ND.mayBao(560, 1041))) + at(-420, PY + 150, sc(1.1, ND.mayBao(460, 1043))) + "</g>";
  // đêm: phủ tối + sao + trăng
  var dem = '<g id="dem" opacity="0"><rect x="' + PX + '" y="' + PY + '" width="' + PW + '" height="' + PH + '" fill="#16233A" opacity="0.62"/>' +
    '<clipPath id="troiCl"><rect x="' + PX + '" y="' + PY + '" width="' + PW + '" height="455"/></clipPath><g clip-path="url(#troiCl)"><g id="saoG">' + ND.sao(90, [-600, -500, 2400, 1500], 1031) + "</g></g>" + at(PX + 1000, PY + 130, ND.trang(44)) + "</g>";
  var trang = '<g id="trangSu"><rect id="mo" x="-100" y="-100" width="2200" height="1300" fill="#2B2420" opacity="0.6"/>' +
    D.paper(D.rRect(PX - 18, PY - 18, PW + 36, PH + 36, 3, 401), "#D9C49A", { stroke: true, sw: 6, sx: 12, sy: 16 }) +
    '<clipPath id="trangCl"><rect x="' + PX + '" y="' + PY + '" width="' + PW + '" height="' + PH + '"/></clipPath>' +
    '<g clip-path="url(#trangCl)"><g filter="url(#sep)">' + noi + "</g>" + dem + "</g>" +
    '<rect x="' + PX + '" y="' + PY + '" width="' + PW + '" height="' + PH + '" fill="url(#half)" opacity="0.07"/>' +
    at(PX + 300, PY + 110, '<g id="the150">' + ND.theChu("", cx[0], 60, { seed: 1404, nen: "#F3E6C4" }) + "</g>") +
    at(PX + PW / 2 + 40, PY + 600, '<g id="hoi"><g transform="translate(0,-40)">' + D.paper(D.rRect(-170, -330, 340, 380, 3, 1410), "#F6EDD6", { stroke: true, sw: 6, sx: 10, sy: 12 }) +
      D.txt(0, -20, cx[1], 380, { w: 900, fill: "#C9463A" }) + "</g></g>") + "</g>";
  // Wob ngoài mép trang (màu thật)
  var VOT = '<g id="Wh-vot"><g transform="rotate(180)">' + ND.vot() + "</g></g>";
  var Wh = ND.wob(api, "Wh", { lung: 0, holdR: VOT });
  var bong = '<ellipse id="bongMay" cx="0" cy="0" rx="420" ry="260" fill="#0b1214" opacity="0"/>';
  var sTrang = '<g id="sTr"><g id="sTrk">' + trang + Wh.svg + "</g>" + at(1660, 900, bong) + "</g>";

  api.dat(L.troi + api.lop("xa", L.xa, 0.35, { mat: 650 }) + api.lop("giua", giua, 1, { mat: 900 }) + api.lop("gan", L.gan, 1.4, { mat: 1050 }) +
    ND.defs() + "<defs>" + sep + "</defs>" + sTrang);
  api.noi({});
  ["#W-sodo", "#hoi", "#Wh-vot", "#dem", "#nguG"].forEach(function (s) { api.show(s, 0, 0); });
  api.show("#mo", 0, 0.6);   // khoá đầu tiên quyết định từ t = 0

  // =================== lối đi: cất cúc, ngồi nghe ===================
  api.camera([[0, 1040, 690, 1.3], [tLao, 1080, 700, 1.4, "sine.inOut"]]);
  W.set(0, { x: 1000, y: 902, size: 0.55, pupX: 0, pupY: 4, aLu: 18, aLf: -10 });
  api.set(W.nd.mu, 0, { y: 14, rotation: 0 });
  api.to(W.nd.mu, 0.1, 0.3, { y: -6, rotation: -6 }, "back.out(2)");
  W.pose(0.1, 0.3, { pupY: -4, pupX: -6 }, "power2.out");
  W.walk(0.45, 1.0, 1000, 830, { step: 0.27, arms: "R" });
  // cất cúc trịnh trọng vào túi hông ba lô, vỗ nhẹ
  W.pose(0.45, 0.25, { aLu: -150, aLf: 10, pupX: -4, pupY: -10 }, "power2.out");
  W.mouth(0.5, "thang");
  W.pose(1.05, 0.3, { aLu: 72, aLf: 24, lean: -6, pupX: -10, pupY: 6 }, "power2.inOut");
  api.show("#W-cuc", 0, 1); api.show("#W-cuc", 1.4, 0);
  [1.5, 1.68].forEach(function (t) { W.pose(t, 0.08, { aLf: 40 }, "power2.in"); W.pose(t + 0.08, 0.08, { aLf: 22 }, "power2.out"); });
  W.pose(1.85, 0.25, { aLu: 18, aLf: -10, lean: 0, pupX: 6, pupY: 0 }, "power2.inOut");
  W.mouth(1.9, "X");
  // ngồi xuống ghế nghe kể
  W.walk(1.95, 2.45, 830, 1060, { step: 0.25, arms: "R" });
  api.key("#W", "y", 2.5, 902, "none"); api.key("#W", "y", 2.75, 902 - 51 + 4, "back.out(1.6)");
  W.pose(2.5, 0.25, { legLs: 0.55, legRs: 0.55, sy: 0.95 }, "power2.out"); W.pose(2.75, 0.2, { sy: 1 }, "back.out(2)");
  W.pose(2.8, 0.3, { pupX: 10, pupY: -4 }, "power2.out");
  // người kể: gật đầu, một người chỉ ra biển
  ["ng0", "ng1", "ng2"].forEach(function (id, i) {
    for (var t = 0.3 + i * 0.4; t < tLat; t += 0.9) { api.key("#" + id + "-dau", "y", t, 0, "sine.inOut"); api.key("#" + id + "-dau", "y", t + 0.3, -5, "sine.inOut"); api.key("#" + id + "-dau", "y", t + 0.6, 0, "sine.inOut"); }
  });
  api.key("#ng2-tayR", "rotation", 0, 0, "step"); api.key("#ng2-tayR", "rotation", 1.2, 0, "none"); api.key("#ng2-tayR", "rotation", 1.6, -112, "back.out(1.6)");
  api.key("#ng0-tayL", "rotation", 0, 0, "step"); api.key("#ng0-tayL", "rotation", 2.6, 0, "none"); api.key("#ng0-tayL", "rotation", 2.9, 40, "power2.out"); api.key("#ng0-tayL", "rotation", 3.5, 10, "power2.inOut");
  // tờ sơ đồ kho báu: giơ lên xem, lật mặt
  api.show("#W-sodo", 3.0, 1);
  W.pose(3.0, 0.3, { aRu: -150, aRf: -40, pupX: 6, pupY: -10 }, "back.out(1.4)");
  api.origin("#W-sodoL", "0 0");
  api.key("#W-sodoL", "scaleX", 0, 1, "step"); api.key("#W-sodoL", "scaleX", tLat, 1, "none"); api.key("#W-sodoL", "scaleX", tLat + 0.09, 0.05, "power2.in"); api.key("#W-sodoL", "scaleX", tLat + 0.18, -1, "power2.out");
  api.show("#W-sodoA", tLat + 0.09, 0); api.show("#W-sodoB", 0, 0); api.show("#W-sodoB", tLat + 0.09, 1);
  api.sfx("lat-giay", tLat, 0.6);
  W.mouth(tLat + 0.1, "o");

  // =================== trang sổ cũ ===================
  api.show("#sTr", 0, 0); api.show("#sTr", tLao, 1);
  api.origin("#sTrk", "1030 560");
  api.key("#sTrk", "scale", 0, 0.06, "step"); api.key("#sTrk", "scale", tLao, 0.06, "none"); api.key("#sTrk", "scale", tAbout + 0.05, 1, "power3.out");
  api.key("#sTrk", "scale", DUR, 1.05, "sine.inOut");
  // thẻ ~150 years ago
  api.origin("#the150", "0 0"); api.pop("#the150", tYears - 0.3, 0.25); api.sfx("pop", tYears - 0.22, 0.45);
  // Wob ngoài mép trang, nhón chân ngó vào
  Wh.set(0, { x: 1490, y: 1090, size: 0.78, pupX: -10, pupY: -8, upRot: -3 });
  Wh.nhonChan(tAbout + 0.4, 3.2, { lean: -5, nhin: [-11, -10] });
  Wh.idle(tAbout + 0.2, tFish, { seed: 5, bien: 1 });
  // thuyền ngư dân ghé vào đảo
  var bx0 = PX - 300, bx1 = PX + 480, by = PY + 640;
  api.key("#tgG", "x", 0, bx0, "step"); api.key("#tgG", "y", 0, by, "step");
  api.key("#tgG", "x", tFish - 0.3, bx0, "none"); api.key("#tgG", "x", tFish + 1.3, bx1, "power2.out");
  api.origin("#tgG", "0 -40");
  for (var tt = 0, k = 0; tt < DUR; tt += 1.3, k++) api.key("#tgG", "rotation", tt, k % 2 ? -1.5 : 1.5, "sine.inOut");
  api.set("#nd2-vt", 0, { x: PX - 380 });
  NB.nguoiDi(api, "nd2", tFish - 0.2, tFish + 1.4, PX + 600, { buoc: 0.3 });
  api.key("#nd2-tayR", "rotation", tFish - 0.2, -60, "power2.out");
  api.key("#nd2-tayR", "rotation", tFish + 1.5, -10, "power2.inOut");
  // mây bão trôi ngang trang, bóng mây phủ cả Wob
  var tM0 = tFish + 0.1, tM1 = tThat + 0.6;
  api.key("#may", "x", 0, PX - 700, "step"); api.key("#may", "x", tM0, PX - 700, "none"); api.key("#may", "x", tM1, PX + PW + 520, "sine.inOut");
  api.key("#bongMay", "x", 0, -1300, "step"); api.key("#bongMay", "x", tM0 + 0.6, -1300, "none"); api.key("#bongMay", "x", tM1 + 0.3, 600, "sine.inOut");
  api.key("#bongMay", "opacity", 0, 0, "step"); api.key("#bongMay", "opacity", tM0 + 0.6, 0, "none"); api.key("#bongMay", "opacity", tM0 + 1.0, 0.28, "power1.out");
  api.key("#bongMay", "opacity", tM1 - 0.2, 0.28, "none"); api.key("#bongMay", "opacity", tM1 + 0.3, 0, "power1.in");
  Wh.pose(tStorm - 1.3, 0.3, { aLu: -160, aLf: -60, aRu: 160, aRf: 60, pupY: 6 }, "power2.out");
  api.to(Wh.nd.mu, tStorm - 1.2, 0.3, { y: 40, rotation: 0 }, "power2.out");
  Wh.pose(tStorm - 0.9, 0.2, { lid: 30 }, "power2.out");
  Wh.mouth(tStorm - 0.4, "flat");
  Wh.pose(tThat - 0.1, 0.3, { aLu: 18, aLf: -10, aRu: -18, aRf: 10, lid: 0 }, "power2.inOut"); api.to(Wh.nd.mu, tThat, 0.3, { y: 0, rotation: 0 }, "power2.inOut");
  // ngư dân ngồi tựa thuyền chờ (người thứ ba ngồi xuống)
  api.key("#nd2-chL", "rotation", tStorm, 0, "none"); api.key("#nd2-chL", "rotation", tStorm + 0.4, -70, "power2.out");
  api.key("#nd2-chR", "rotation", tStorm, 0, "none"); api.key("#nd2-chR", "rotation", tStorm + 0.4, -70, "power2.out");
  api.key("#nd2-vt", "y", tStorm, PY + 640, "none"); api.key("#nd2-vt", "y", tStorm + 0.4, PY + 680, "power2.out");
  // "It doesn't explain a town": chống cằm, dấu hỏi to hơn hòn đảo
  Wh.pose(tThat + 0.3, 0.35, { aRu: 120, aRf: -150, lean: 3, upRot: 3, pupX: -8, pupY: -6 }, "power2.inOut");
  Wh.mouth(tThat + 0.4, "thang");
  api.show("#hoi", tTown - 0.3, 1);
  api.origin("#hoi", "0 0");
  api.key("#hoi", "scaleY", 0, 0, "step"); api.key("#hoi", "scaleY", tTown - 0.3, 0, "none"); api.key("#hoi", "scaleY", tTown, 1, "back.out(2.4)");
  for (var q = 0, tq = tTown + 0.1; tq < tPart - 0.3; tq += 0.2, q++) api.key("#hoi", "rotation", tq, q % 2 ? -2.5 : 2.5, "sine.inOut");
  api.key("#hoi", "rotation", tPart - 0.25, 0, "sine.out");
  api.key("#hoi", "scaleY", tPart - 0.25, 1, "none"); api.key("#hoi", "scaleY", tPart + 0.05, 0, "power2.in");
  api.sfx("pop", tTown - 0.1, 0.55);
  Wh.pose(tTown + 0.05, 0.12, { eye: 1.12 }, "power2.out"); Wh.pose(tTown + 0.6, 0.2, { eye: 1 }, "power2.inOut");

  // =================== đêm: không con muỗi nào; Wob gác bằng vợt, ngủ gật ===================
  api.fade("#dem", tNight - 0.5, 0.8, 1);
  api.fade("#mo", tNight - 0.5, 0.8, 0.82);
  api.origin("#saoG", (PX + 1000) + " " + (PY + 130));
  api.fade("#matTroi", tNight - 0.5, 0.6, 0);
  api.key("#saoG", "rotation", tNight, 0, "none"); api.key("#saoG", "rotation", DUR, 38, "sine.inOut");
  api.show("#nguG", tSettle - 0.1, 1);
  ["#nd0-vt", "#nd1-vt", "#nd2-vt"].forEach(function (s) { api.show(s, 0, 1); api.show(s, tSettle - 0.1, 0); });
  api.show("#Wh-vot", tPart - 0.1, 1);
  Wh.pose(tPart - 0.15, 0.3, { aRu: -40, aRf: -120, aLu: 18, aLf: -10, lean: 0, upRot: 0, pupX: -6, pupY: -6 }, "back.out(1.5)");
  Wh.mouth(tPart, "smirk");
  Wh.nhinQuanh(tNight + 0.3, { nhip: 0.6 });
  Wh.idle(tPart + 0.4, tNothing, { seed: 11, bien: 1.2, liec: true });
  // vợt vẫn trống; Wob ngủ gật tựa cán vợt
  Wh.pose(tNothing + 0.1, 0.9, { lid: 52, lean: 7, upRot: 6, upY: 6, sy: 0.96 }, "sine.inOut");
  Wh.mouth(tNothing + 0.3, "wobbly");
  Wh.pose(tNothing + 1.4, 0.4, { lid: 30, upRot: 1, upY: 0 }, "power2.out"); Wh.pose(tNothing + 1.9, 0.6, { lid: 58, upRot: 7, upY: 7 }, "sine.inOut");
  Wh.autoBlink(tAbout, tNothing, 17);
  W.autoBlink(0, tLat, 19);
};
