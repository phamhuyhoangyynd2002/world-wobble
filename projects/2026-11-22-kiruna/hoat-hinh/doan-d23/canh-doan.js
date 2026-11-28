/* Đoạn d23 · cắt giấy · hồi ức tháng 8: nhà thờ gỗ đỏ trên rơ-moóc dài nhiều trục bánh, Wob (đồ hè, kính râm) bé tí cạnh bánh xe,
   gõ cửa hông hai cái ở "walk."; camera lia lên mái và tháp chuông riêng; "nineteen twelve": lớp tông cũ giàn giáo bật lên rồi gập, thẻ 1912;
   "much loved": người que xa vẫy cờ giấy TRƠN; "ground": vết nứt nét đứt chạy về núi mỏ, Wob nhích chân;
   rồi trang sổ map-kiruna-centre: chấm nhà thờ bò theo nét đứt từ Old centre sang New centre (approx.), hai ngón tay Wob "đi bộ" cạnh.
   Vào "giay", ra "cat". Chữ: chỉ chu_tren_do_vat (1912, Old centre, New centre (approx.), 19–20 Aug 2025 · ~5 km). Hai ghim núi bị cắt khỏi khung bản đồ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, K = api.K, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tWalk = T("walk.", 0, 3.56), tKir = T("kiruna", 0, 4.34), t1912 = T("nineteen", 0, 7.41), tLoved = T("much", 0, 8.75),
    tMine = T("mine", 0, 9.9), tGround = T("ground.", 0, 10.6), tB = T("so", 0, 11.4) - 0.04, tFive = T("five", 0, 15.55), tPiece = T("piece.", 0, 17.95);

  // =================== A: nhà thờ trên rơ-moóc ===================
  var G = 900;   // mặt đất lớp giữa
  var troi = '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#krHe)"/>' + at(380, 170, KR.may(260, 9801)) + at(1500, 120, KR.may(200, 9802));
  // xa: núi mỏ (đỉnh bằng, bậc thang) bên trái, đồi thấp
  var xa = KR.nuiXa(-700, 2600, 780, 120, "#B7C9B0", 9811);
  xa += '<g id="nuiMo">' + D.paper("M -620 780 L -420 520 L -120 500 L 120 780 Z", "#8E8A84", { shadow: false }) +
    D.line("M -470 585 L -150 570 M -520 650 L -80 640 M -570 715 L 10 710", 4, "#6F6B66", ' opacity="0.7"') + "</g>";
  xa += '<rect x="-800" y="776" width="3600" height="600" fill="' + M.coSang + '"/>';
  // xa2: người que xa vẫy cờ trơn
  var xa2 = "", nguoiXa = [];
  for (var i = 0; i < 6; i++) {
    var px = 1660 + i * 68, id = "nx" + i;
    xa2 += at(px, 860, KR.nguoi(id, { ao: M.ao1[i % 8], mu: i % 3 === 0 ? "#C9463A" : null, da: [M.da1, M.da2, M.da3][i % 3], co: true, coMau: ["#F3E6C8", "#E9C98B", "#D9E6EA"][i % 3] }), 0.6);
    nguoiXa.push(id);
  }
  // giữa: cỏ, rơ-moóc, nhà thờ, tháp chuông, vết nứt, giàn giáo
  var gi = '<rect x="-800" y="' + (G - 6) + '" width="3600" height="600" fill="' + M.co + '"/>' + D.paper(D.rRect(-800, G - 14, 3600, 26, 3, 9820), M.coToi, { shadow: false });
  gi += at(1560, G, KR.thapChuong("thap"), 1.05);
  gi += at(900, G, KR.romooc("rm", 820));
  gi += at(900, G - 64, KR.nhaTho("nt"));
  // giàn giáo tông cũ
  var gg = "";
  for (var gx = -380; gx <= 380; gx += 76) { var top = -150 - Math.max(0, 300 - Math.abs(gx)) * 1.25; gg += D.line("M " + gx + " -60 L " + gx + " " + f1(top - 40), 7, "#9C7A4E"); }
  for (var gy = -140; gy > -560; gy -= 90) { var hw = Math.min(400, 420 - (Math.abs(gy) - 140) * 0.75); gg += D.line("M " + f1(-hw) + " " + gy + " L " + f1(hw) + " " + gy, 9, "#B08A5E"); }
  gi += at(900, G, '<g id="gian">' + gg + "</g>");
  // vết nứt nét đứt về phía núi mỏ (8 đoạn hiện dần)
  var crackPts = [[1020, G + 40], [880, G + 50], [740, G + 34], [600, G + 46], [460, G + 30], [320, G + 40], [180, G + 26], [40, G + 34], [-100, G + 22]];
  var cr = "";
  for (var c = 0; c < crackPts.length - 1; c++) cr += '<g id="cr' + c + '">' + D.line("M " + crackPts[c][0] + " " + crackPts[c][1] + " L " + crackPts[c + 1][0] + " " + crackPts[c + 1][1], 7, "#3A3530", ' stroke-dasharray="22 14"') + "</g>";
  gi += cr;
  function f1(n) { return D.f1(n); }

  var W = KR.wob(api, "W", { mua: "he", tuiThe: 1, chum: 1 });
  var WX0 = 260, WX = 532, SZ = 0.42;
  var gan = D.paper(D.rough([[-400, 1100], [-300, 1010], [-80, 1000], [180, 1040], [300, 1100]], 6, 9830, 30), M.coToi, { shadow: false });
  for (var tf = 0; tf < 9; tf++) gan += at(-260 + tf * 34, 1012 + (tf % 3) * 6, D.line("M 0 0 C -4 -26 4 -50 -2 -70", 6, M.co));
  gan += at(1980, 1110, D.paper(D.rough([[-260, 0], [-160, -90], [60, -100], [240, -40], [300, 0]], 6, 9831, 30), M.coToi, { shadow: false }));

  var sepia = '<rect id="sepia" x="-100" y="-100" width="2120" height="1280" fill="#B8925A" opacity="0"/>';
  var the1912 = '<g id="t1912">' + at(1270, 330, KR.the("t1912i", CH[0], 66, { seed: 9840 })) + "</g>";

  // =================== B: trang sổ bản đồ ===================
  var MX = 230, MY = 120, MS = 0.75;
  var OLD = [MX + 556.8 * MS, MY + 576 * MS], NEW = [MX + 1305.6 * MS, MY + 362.4 * MS];
  var rt = api.duong([OLD, [OLD[0] + 160, OLD[1] + 40], [OLD[0] + 360, OLD[1] - 10], [NEW[0] - 160, NEW[1] + 60], NEW]);
  var b = '<g id="sB"><g id="sBk">';
  b += '<rect x="-600" y="-400" width="3200" height="2000" fill="#B9A27A"/><rect x="-600" y="-400" width="3200" height="2000" fill="url(#half)" opacity="0.07"/>';
  b += at(120, 70, D.journalPage(1680, 940, { seed: 9850 }));
  b += D.mapSticker("ban-do/map-kiruna-centre.svg", 1440, 810, { id: "map", seed: 9851 }).replace('<g id="map">', '<g id="map" transform="translate(' + MX + "," + MY + ')">');
  b += KR.phacMap(OLD, NEW, 9860);
  b += '<path d="' + rt.d + '" fill="none" stroke="#FFF8EC" stroke-width="14" stroke-linecap="round" stroke-dasharray="20 14" opacity="0.85"/>';
  b += '<path d="' + rt.d + '" fill="none" stroke="#A8322A" stroke-width="7" stroke-linecap="round" stroke-dasharray="20 14"/>';
  b += at(OLD[0], OLD[1], D.mapDot("dOld", { nhan: CH[1], ben: "trai", co: 50, mau: "#B8BDC2", seed: 9852 }));
  b += at(NEW[0], NEW[1], D.mapDot("dNew", { nhan: CH[2], ben: "tren", co: 50, seed: 9853 }));
  // nhà thờ tí hon bò theo nét đứt
  var ntNho = '<g transform="scale(0.14)">' + KR.romooc(null, 820).replace('<g id="null">', "<g>") + at(0, -64, KR.nhaTho("ntn")) + "</g>";
  b += '<g id="ntDot">' + ntNho + "</g>";
  // hai ngón tay Wob đi bộ (tay vươn từ dưới khung lên)
  var ngon = '<g id="tayB"><g id="tayBr">' + D.line("M 0 0 L 0 900", 44, INK) + D.line("M 0 0 L 0 900", 30, M.gile) + "</g>" +
    '<g id="ngonL">' + D.line("M -10 -14 L -18 -76", 16, INK) + D.line("M -10 -14 L -18 -76", 8, "#5a9fb8") + "</g>" +
    '<g id="ngonR">' + D.line("M 10 -14 L 18 -76", 16, INK) + D.line("M 10 -14 L 18 -76", 8, "#5a9fb8") + "</g>" +
    '<circle cx="0" cy="0" r="30" fill="' + INK + '"/></g>';
  b += ngon;
  b += '<g id="tAug">' + at(1200, 770, KR.the("tAugi", CH[3], 46, { seed: 9854 })) + "</g>";
  b += "</g></g>";

  api.dat(KR.defs() + troi + api.lop("xa", xa, 0.35, { mat: 780 }) + api.lop("xa2", xa2, 0.7, { mat: 860 }) +
    api.lop("giua", gi + W.svg + the1912, 1, { mat: G }) + api.lop("gan", gan, 1.4, { mat: 1080 }) + sepia + b);
  api.noi({});

  // ---------- camera A ----------
  api.camera([[0, 640, 720, 1.32], [tKir - 0.1, 660, 712, 1.36, "sine.inOut"], [tKir + 1.25, 1040, 470, 0.92, "power2.inOut"],
    [t1912 - 0.2, 1060, 480, 0.94, "sine.inOut"], [tMine - 0.15, 1080, 470, 0.96, "sine.inOut"], [tMine + 0.9, 520, 760, 1.38, "power2.inOut"], [tB, 500, 770, 1.44, "sine.inOut"]]);

  // ---------- Wob ----------
  W.set(0, { x: WX0, y: G + 6, size: SZ, pupY: -8 });
  W.mouth(0, "smirk");
  W.walk(0.35, 2.15, WX0, WX, { step: 0.3 });
  W.pose(2.3, 0.3, { pupX: 4, pupY: -14, upRot: -4 }, "power2.out");
  var hits = W.go(tWalk - 0.3, 2, "R", { goc: -92 });
  hits.forEach(function (h) { api.sfx("bonk", h, 0.32); });
  W.pose(tWalk + 0.35, 0.25, { pupX: 10, pupY: -6, upRot: 0 }, "power2.out");
  // đứng chờ: gõ chân, nhìn lên theo camera
  W.pose(tWalk + 0.8, 0.12, { legR: -12 }, "power2.out"); W.pose(tWalk + 0.95, 0.12, { legR: 0 }, "power2.in");
  W.pose(tWalk + 1.2, 0.12, { legR: -12 }, "power2.out"); W.pose(tWalk + 1.35, 0.12, { legR: 0 }, "power2.in");
  W.pose(tKir + 0.2, 0.4, { pupX: 8, pupY: -16, lean: -4 }, "power2.inOut");
  W.mouth(t1912 + 0.2, "o"); W.mouth(t1912 + 1.0, "smirk");
  // "ground": nhìn xuống vết nứt dưới chân, nhảy sang bên
  W.pose(tMine + 0.4, 0.3, { pupX: -4, pupY: 16, lean: 3 }, "power2.out");
  W.mouth(tGround, "o");
  W.pose(tGround + 0.1, 0.12, { sy: 0.9, sx: 1.06 }, "power2.in");
  api.key("#W", "y", tGround + 0.22, G + 6, "none"); api.key("#W", "y", tGround + 0.4, G - 34, "power2.out"); api.key("#W", "y", tGround + 0.58, G + 26, "power2.in");
  W.pose(tGround + 0.22, 0.2, { sy: 1.06, sx: 0.96, legL: 14, legR: -14 }, "power2.out");
  W.pose(tGround + 0.58, 0.14, { sy: 0.92, sx: 1.06, legL: 0, legR: 0 }, "power2.in"); W.pose(tGround + 0.72, 0.18, { sy: 1, sx: 1 }, "back.out(2)");
  api.key("#W", "x", tGround + 0.22, WX, "none"); api.key("#W", "x", tGround + 0.58, WX - 60, "power2.inOut");
  W.mouth(tGround + 0.75, "flat");
  W.idle(2.2, tWalk - 0.3, { seed: 23, bien: 1.5 }); W.idle(tWalk + 1.5, tMine + 0.3, { seed: 24, bien: 1.8 });
  W.autoBlink(0, tB, 2301);

  // ---------- giàn giáo + tông cũ + thẻ 1912 ----------
  api.origin("#gian", "0 " + (G - 60));
  api.key("#gian", "scaleY", 0, 0, "step"); api.show("#gian", 0, 0); api.show("#gian", t1912 - 0.25, 1);
  api.key("#gian", "scaleY", t1912 - 0.25, 0, "none"); api.key("#gian", "scaleY", t1912 + 0.15, 1, "back.out(1.6)");
  api.key("#gian", "scaleY", t1912 + 1.05, 1, "none"); api.key("#gian", "scaleY", t1912 + 1.4, 0.02, "power2.in"); api.show("#gian", t1912 + 1.42, 0);
  api.key("#sepia", "opacity", 0, 0, "step"); api.key("#sepia", "opacity", t1912 - 0.25, 0, "none"); api.key("#sepia", "opacity", t1912 + 0.05, 0.3, "power2.out");
  api.key("#sepia", "opacity", t1912 + 1.1, 0.3, "none"); api.key("#sepia", "opacity", t1912 + 1.45, 0, "power2.inOut");
  api.pop("#t1912", t1912 - 0.18, 0.24, tMine - 0.2);
  api.origin("#t1912", "1270 330");
  // vết nứt hiện dần đoạn một
  for (var k = 0; k < crackPts.length - 1; k++) { api.show("#cr" + k, 0, 0); api.show("#cr" + k, tMine + 0.15 + k * 0.08, 1); }
  // người que xa vẫy cờ trơn
  nguoiXa.forEach(function (id, j) {
    api.origin("#" + id + "-tayR", (22) + " " + (-150));
    var t0 = tLoved - 0.1 + j * 0.06;
    api.key("#" + id + "-tayR", "rotation", 0, 0); api.key("#" + id + "-tayR", "rotation", t0, 0, "none"); api.key("#" + id + "-tayR", "rotation", t0 + 0.2, -128, "power2.out");
    for (var w = 0; w < 6; w++) api.key("#" + id + "-tayR", "rotation", t0 + 0.4 + w * 0.22, w % 2 ? -128 : -104, "sine.inOut");
    api.key("#" + id + "-tayR", "rotation", t0 + 1.8, -118, "sine.inOut");
  });

  // =================== B ===================
  KR.cat(api, "#sB", tB, null);
  api.sfx("lat-giay", 0.05, 0.5);
  api.sfx("lat-giay", tB, 0.45);
  KR.camNhom(api, [["#sBk", 1]], [[tB, 930, 520, 1.22], [tB + 2.0, 900, 500, 1.28, "sine.inOut"], [DUR, 920, 486, 1.3, "sine.inOut"]]);
  var c0 = tB + 0.55, c1 = tPiece - 0.25, N = 30;
  api.origin("#ntDot", "0 0"); api.origin("#tayB", "0 0"); api.origin("#tayBr", "0 0");
  api.origin("#ngonL", "0 0"); api.origin("#ngonR", "0 0");
  for (var s = 0; s <= N; s++) {
    var u = s / N, tt = c0 + (c1 - c0) * u, p = rt.at(KR.ss(u));
    api.key("#ntDot", "x", tt, p.x, "none"); api.key("#ntDot", "y", tt, p.y - 4, "none");
    api.key("#ntDot", "rotation", tt, Math.sin(u * 40) * 3, "none");
    var hx = p.x - 6, hy = p.y + 96;
    api.key("#tayB", "x", tt, hx, "none"); api.key("#tayB", "y", tt, hy, "none");
    var ang = Math.atan2(1450 - hy, 260 - hx) * 180 / Math.PI - 90;
    api.key("#tayBr", "rotation", tt, ang, "none");
    api.key("#ngonL", "rotation", tt, s % 2 ? 18 : -10, "sine.inOut"); api.key("#ngonR", "rotation", tt, s % 2 ? 10 : -18, "sine.inOut");
  }
  var p0 = rt.at(0);
  api.key("#ntDot", "x", 0, p0.x, "step"); api.key("#ntDot", "y", 0, p0.y - 4, "step");
  api.key("#tayB", "x", 0, p0.x - 10, "step"); api.key("#tayB", "y", 0, 1500, "step");
  api.key("#tayB", "y", tB + 0.1, 1500, "none"); api.key("#tayB", "y", c0, p0.y + 96, "power2.out");
  api.pop("#tAug", tFive - 0.3, 0.26);
  api.origin("#tAug", "1200 770");
  api.show("#dOld-nhan", 0, 1); api.show("#dNew-nhan", 0, 1); api.set("#dNew-nhan", 0, { y: -64 });
};
