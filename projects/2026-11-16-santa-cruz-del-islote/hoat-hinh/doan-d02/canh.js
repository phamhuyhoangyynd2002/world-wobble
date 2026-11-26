/* Đoạn d02 · cắt giấy · hồi ức: thuyền tới Santa Cruz del Islote.
   Vào "giay" (lớp bật dựng từ giấy phẳng), ra "chen" (cắt cứng sang d03 vẽ tay).
   Shot: S1 thuyền toàn (0–6,55) · S2 qua vai Wob, đẩy vào đảo (6,55–10,2) · S3 từ trên cao, hai sân bóng (10,2–13,4)
         · S4 thuyền gần đảo, ba biển "?" (13,4–19,9) · S5 lướt sang các đảo xanh rộng (19,9–23,9).
   Trang phục: mũ cói, ba lô khổng lồ trên băng ghế sau (bình xịt cắm túi hông trái), Wob ngồi mũi thuyền.
   Chữ: "~1 ha · 2 soccer fields", "?" (chu_tren_do_vat). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var cx = data.chu_tren_do_vat;
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  function cat(sel, t0, t1) { api.show(sel, 0, t0 <= 0 ? 1 : 0); if (t0 > 0) api.show(sel, t0, 1); if (t1 != null) api.show(sel, t1, 0); }

  var tS2 = 6.55, tS3 = 10.2, tS4 = 13.4, tS5 = T("Around", 0, 19.94);

  // ---------- trời tĩnh ----------
  var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#ndTroi)"/>' +
    '<circle cx="1560" cy="170" r="150" fill="#FFF4D6" opacity="0.35"/>' + D.paper(D.rEll(1560, 170, 74, 74, 1.5, 31), "#FFF0C2", { shadow: false, stroke: true, sw: 4 }) +
    at(420, 190, D.puff(60, 12, "#FFFFFF")) + at(1120, 130, D.puff(46, 15, "#FFFFFF"));

  // ---------- lớp xa: biển xa phẳng + đảo xanh xa ----------
  var xa = '<rect x="-1400" y="586" width="6000" height="900" fill="#8ED5CB"/>' +
    at(180, 600, sc(0.42, ND.daoXanh({ w: 900, seed: 873 }))) + at(1900, 598, sc(0.36, ND.daoXanh({ w: 800, seed: 874 }))) +
    at(2700, 600, sc(0.5, ND.daoXanh({ w: 1000, seed: 875 }))) + at(3500, 600, sc(0.4, ND.daoXanh({ w: 900, seed: 876 })));

  // ---------- lớp giữa: đảo (xa ở S1, gần ở S4), đảo xanh rộng (S5), biển ----------
  var giua = "";
  giua += '<g id="isF">' + at(1350, 640, '<g id="isFr">' + sc(0.56, ND.daoNhaXa({ w: 1000, seed: 851 })) + "</g>") + "</g>";
  var bh = [[1040, 566, 1.0], [1380, 556, 1.0], [1690, 570, 1.0]];
  var isN = at(1360, 668, sc(1.2, ND.daoNhaXa({ w: 1000, seed: 851 })));
  bh.forEach(function (b, i) { isN += at(b[0], b[1], '<g id="bh' + i + '">' + sc(0.92, ND.bienHoi("bhs" + i, { cao: 110, seed: 1011 + i })) + "</g>"); });
  giua += '<g id="isN">' + isN + "</g>";
  giua += at(2680, 660, sc(1.15, ND.daoXanh({ w: 1100, seed: 877 }))) + at(3700, 654, sc(1.0, ND.daoXanh({ w: 900, seed: 878 })));
  giua += ND.bien(api, "bs", { x0: -600, x1: 4300, y: 640, n: 3, day: 44 });

  // ---------- lớp gần: thuyền, ba lô, Wob ----------
  var tb = ND.thuyen("tb", {});
  var NGON = '<g id="W-ngon" opacity="0">' + D.line("M 0 6 L 0 40", 14) + D.line("M 0 6 L 0 40", 7, "#5a9fb8") + "</g>";
  var W = ND.wob(api, "W", { lung: 0, holdR: NGON });
  var gan = '<g id="tbR">' + at(440, 940, sc(0.95, tb.sau)) + at(222, 806, sc(0.62, ND.baLo("pk", {}))) + W.svg + at(440, 940, sc(0.95, tb.truoc)) + "</g>";
  gan += ND.bien(api, "bn", { x0: -700, x1: 2700, y: 884, n: 2, day: 52, mau: ["#3FA9A6", "#2B9097"], bien: 34 });

  // ---------- S2: qua vai Wob (nhóm tĩnh, tự đẩy vào) ----------
  var WB = ND.wobSau(api, "WB", {});
  var s2 = '<g id="s2"><g id="s2k">' + '<rect x="-200" y="-200" width="2400" height="1500" fill="url(#ndTroi)"/>' +
    '<rect x="-200" y="600" width="2400" height="900" fill="#8ED5CB"/>' + at(300, 612, sc(0.5, ND.daoXanh({ w: 900, seed: 873 }))) +
    at(1180, 652, ND.daoNhaXa({ w: 1000, seed: 851 })) +
    at(690, 658, '<g id="liem">' + D.paper("M -40 0 C -30 -20 -6 -30 10 -26 C 26 -22 34 -12 40 0 Z", "#4FB8B2", { stroke: true, sw: 3, shadow: false }) + D.line("M -26 -12 C -12 -24 8 -24 22 -16", 4, "#EAF7F2") + "</g>") +
    ND.bien(api, "b2", { x0: -400, x1: 2400, y: 670, n: 3, day: 50 }) + WB.svg + "</g></g>";

  // ---------- S3: từ trên cao ----------
  var r3 = D.rng(55), gon = "";
  for (var i = 0; i < 26; i++) gon += D.line("M " + D.f1(-100 + r3() * 2100) + " " + D.f1(r3() * 1080) + " c 20 -10 40 10 60 0", 4, "#EAF7F2", ' opacity="0.45"');
  var hatTop = '<circle r="40" fill="' + ND.M.coi + '" stroke="' + D.INK + '" stroke-width="4"/><circle r="40" fill="url(#ndDan)" opacity="0.7"/>' +
    '<circle r="22" fill="' + ND.M.coi + '" stroke="' + D.INK + '" stroke-width="3.5"/><circle r="22" fill="none" stroke="' + ND.M.dai + '" stroke-width="6"/>';
  var thuyenTren = '<g transform="translate(1330,790) rotate(-25)">' +
    D.paper("M 0 -120 C 40 -80 42 70 30 110 L -30 110 C -42 70 -40 -80 0 -120 Z", "#6F9AB8", { stroke: true, sw: 5, sx: 6, sy: 8 }) +
    D.paper("M 0 -104 C 30 -70 30 60 22 98 L -22 98 C -30 60 -30 -70 0 -104 Z", "#5E4632", { shadow: false }) +
    D.paper(D.rRect(-26, 30, 52, 62, 2, 61), ND.M.oliu, { stroke: true, sw: 3.5, shadow: false }) + D.paper(D.rRect(-30, 26, 60, 16, 1, 62), ND.M.tham, { stroke: true, sw: 3, shadow: false }) +
    '<rect x="-14" y="110" width="28" height="22" rx="4" fill="#4F5A60" stroke="' + D.INK + '" stroke-width="3"/>' + at(0, -50, hatTop) + "</g>";
  var s3 = '<g id="s3"><g id="s3k"><rect x="-200" y="-200" width="2400" height="1500" fill="#3FA9A6"/>' + gon +
    at(960, 470, ND.daoTuTren({ w: 720, h: 470, seed: 901 })) +
    '<g id="sb0">' + at(810, 470, '<g transform="rotate(90)">' + ND.sanBong(456, 296, 911) + "</g>") + "</g>" +
    '<g id="sb1">' + at(1110, 470, '<g transform="rotate(90)">' + ND.sanBong(456, 296, 912) + "</g>") + "</g>" +
    thuyenTren +
    '<g id="ripple" opacity="0"><ellipse id="rp0" cx="1440" cy="820" rx="30" ry="18" fill="none" stroke="#EAF7F2" stroke-width="5"/><ellipse id="rp1" cx="1440" cy="820" rx="30" ry="18" fill="none" stroke="#EAF7F2" stroke-width="4"/></g>' +
    at(0, 0, '<g id="ball">' + ND.bong(46) + "</g>") +
    at(840, 905, '<g id="tag">' + ND.theChu("", cx[0], 58, { seed: 1003 }) + "</g>") + "</g></g>";

  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 600 }) + api.lop("giua", giua, 1, { mat: 660 }) + api.lop("gan", gan, 1.4, { mat: 940 }) +
    ND.defs() + s2 + s3);
  api.noi({});
  ["#W-ngon", "#ripple"].forEach(function (s) { api.show(s, 0, 0); });   // khoá đầu tiên quyết định từ t = 0

  // ---------- cắt shot ----------
  ["#L-xa", "#L-giua", "#L-gan"].forEach(function (s) { api.show(s, 0, 1); api.show(s, tS2, 0); api.show(s, tS4, 1); });
  cat("#s2", tS2, tS3); cat("#s3", tS3, tS4);
  cat("#isF", 0, tS4); cat("#isN", tS4, null);

  // ---------- camera lớp (S1 đẩy chậm, S4 đẩy chậm, S5 lướt sang phải; thuyền ở lớp gần đứng yên khi lướt) ----------
  api.camera([[0, 960, 540, 1.0], [tS2, 1000, 540, 1.035, "sine.inOut"]]);
  api.camera([[tS4, 960, 540, 1.0, "none"], [tS5, 990, 536, 1.03, "sine.inOut"], [tS5 + 1.7, 2300, 532, 1.03, "power2.inOut"], [DUR, 2470, 530, 1.05, "sine.out"]], ["xa", "giua"]);
  api.camera([[tS4, 960, 540, 1.0, "none"], [tS5, 975, 540, 1.02, "sine.inOut"]], ["gan"]);

  // thuyền bập bềnh (lắc nhẹ quanh giữa thuyền)
  api.origin("#tbR", "440 860");
  for (var tt = 0, k2 = 0; tt < DUR + 1.6; tt += 1.5, k2++) { api.key("#tbR", "rotation", tt, k2 % 2 ? -1.4 : 1.2, "sine.inOut"); api.key("#tbR", "y", tt, k2 % 2 ? 5 : -4, "sine.inOut"); }

  // đảo xa mọc lên ở chân trời
  api.origin("#isFr", "0 0");
  api.key("#isFr", "scaleY", 0, 0.04, "step"); api.key("#isFr", "scaleY", 0.75, 0.04, "none"); api.key("#isFr", "scaleY", 1.45, 1, "back.out(1.7)");

  // ---------- Wob trên thuyền ----------
  W.set(0, { x: 753, y: 775, size: 0.66, pupX: 8, aLu: 18, aLf: -10, aRu: -18, aRf: 10, legLs: 0.6, legRs: 0.6 });
  W.idle(0.3, 1.2, { seed: 3, bien: 1.6 });
  // chỉ vào đảo đúng tên đảo
  var tTen = T("Santa Cruz del Islote", 0, 1.35);
  W.pose(tTen - 0.25, 0.22, { aRu: -108, aRf: -8, upRot: 2 }, "back.out(1.6)"); api.show("#W-ngon", tTen - 0.2, 1);
  W.pose(tTen + 1.9, 0.3, { aRu: -18, aRf: 10, upRot: 0 }, "power2.inOut"); api.show("#W-ngon", tTen + 2.0, 0);
  W.idle(tTen + 2.2, 4.4, { seed: 5, bien: 1.6 });
  // che nắng nhìn xa ở "Caribbean coast"
  var tCo = T("Caribbean", 0, 5.24);
  W.pose(tCo - 0.5, 0.3, { aLu: -150, aLf: -115, pupX: 10, pupY: -4, lean: 3 }, "back.out(1.4)");
  W.pose(tS2 - 0.3, 0.25, { aLu: 18, aLf: -10, pupY: 0, lean: 0 }, "power2.inOut");
  W.autoBlink(0, DUR, 21);

  // ---------- S2: đẩy vành mũ, đẩy máy vào đảo, sóng liếm bậc cửa ----------
  WB.set(0, { x: 430, y: 1236, size: 1.25, sx: -1 });
  WB.breathe(tS2, tS3);
  api.set("#WB-mu", 0, { rotation: 0, y: 0 });
  api.to("#WB-mu", tS2 + 0.25, 0.35, { rotation: -9, y: -16 }, "back.out(1.8)");
  api.origin("#s2k", "1180 640");
  api.key("#s2k", "scale", tS2, 1, "none"); api.key("#s2k", "scale", tS3, 1.09, "sine.inOut");
  var tLiem = T("neighbourhood", 0, 8.8);
  api.origin("#liem", "0 0");
  api.key("#liem", "y", 0, 22, "step"); api.key("#liem", "y", tLiem - 0.2, 22, "none"); api.key("#liem", "y", tLiem + 0.35, -4, "power2.out");
  api.key("#liem", "y", tLiem + 0.75, -4, "none"); api.key("#liem", "y", tLiem + 1.3, 22, "power2.in");
  api.sfx("song", tLiem - 0.15, 0.5);

  // ---------- S3: từ trên cao ----------
  api.origin("#s3k", "960 520");
  var tLand = T("much", 0, 11.13);
  api.key("#sb0", "x", 0, -1300, "step"); api.key("#sb0", "x", tS3 + 0.05, -1300, "none"); api.key("#sb0", "x", tLand, 0, "power3.out");
  api.key("#sb1", "x", 0, 1300, "step"); api.key("#sb1", "x", tS3 + 0.05, 1300, "none"); api.key("#sb1", "x", tLand, 0, "power3.out");
  var tTag = T("two", 0, 11.94);
  api.origin("#tag", "0 0");
  api.pop("#tag", tTag - 0.2, 0.25);
  api.sfx("pop", tTag - 0.12, 0.55);
  // bóng giấy lăn khỏi sân, rơi trúng vành mũ, nảy tõm xuống biển
  var bx0 = [1180, 560], hit = [1307, 722], bx2 = [1446, 822], tR = tTag + 0.12, tHit = tR + 0.5, tDrop = tHit + 0.42;
  api.origin("#ball", "0 0");
  api.key("#ball", "x", 0, bx0[0], "step"); api.key("#ball", "y", 0, bx0[1], "step"); api.key("#ball", "rotation", 0, 0, "step");
  api.show("#ball", 0, 0); api.show("#ball", tLand + 0.05, 1);
  api.key("#ball", "x", tR, bx0[0], "none"); api.key("#ball", "y", tR, bx0[1], "none");
  api.key("#ball", "x", tHit, hit[0], "power1.in"); api.key("#ball", "y", tHit, hit[1], "power1.in"); api.key("#ball", "rotation", tHit, 260, "none");
  api.key("#ball", "scale", tHit, 1, "none"); api.key("#ball", "scale", tHit + 0.2, 1.55, "power2.out"); api.key("#ball", "scale", tDrop, 0.85, "power2.in");
  api.key("#ball", "x", tDrop, bx2[0], "sine.inOut"); api.key("#ball", "y", tDrop, bx2[1], "sine.inOut"); api.key("#ball", "rotation", tDrop, 400, "none");
  api.show("#ball", tDrop + 0.03, 0);
  api.sfx("bonk", tHit - 0.02, 0.6);
  // đẩy máy vào thuyền khi bóng chạm mũ (≈ 0,8 s), giữ tới hết shot
  api.key("#s3k", "scale", 0, 1, "step"); api.key("#s3k", "x", 0, 0, "step"); api.key("#s3k", "y", 0, 0, "step");
  api.key("#s3k", "scale", tR - 0.2, 1.03, "sine.inOut"); api.key("#s3k", "x", tR - 0.2, 0, "none"); api.key("#s3k", "y", tR - 0.2, 0, "none");
  api.key("#s3k", "scale", tHit - 0.05, 1.35, "power2.inOut"); api.key("#s3k", "x", tHit - 0.05, -178, "power2.inOut"); api.key("#s3k", "y", tHit - 0.05, -133, "power2.inOut");
  api.key("#s3k", "scale", tS4, 1.4, "sine.out"); api.key("#s3k", "x", tS4, -192, "sine.out"); api.key("#s3k", "y", tS4, -142, "sine.out"); api.sfx("drop", tDrop - 0.03, 0.6);
  api.show("#ripple", tDrop, 1);
  ["#rp0", "#rp1"].forEach(function (s, j) {
    api.origin(s, "1440 820");
    api.key(s, "scale", 0, 0.3, "step"); api.key(s, "scale", tDrop + j * 0.15, 0.3, "none"); api.key(s, "scale", tDrop + 0.9 + j * 0.15, 2.6, "power2.out");
    api.key(s, "opacity", 0, 1, "step"); api.key(s, "opacity", tDrop + 0.3 + j * 0.15, 1, "none"); api.key(s, "opacity", tDrop + 0.9 + j * 0.15, 0, "power1.in");
  });

  // ---------- S4: ba biển "?" nhô lên từ ba mái nhà, Wob đếm ----------
  var tB = [T("most", 0, 15.24) + 0.1, T("islands", 0, 16.69), T("agrees", 0, 18.36)];
  bh.forEach(function (b, i) {
    var s = "#bh" + i;
    api.origin(s, "0 0");
    api.key(s, "scaleY", 0, 0, "step"); api.key(s, "scaleY", tB[i] - (i === 2 ? 0 : 0.25), 0, "none");
    api.key(s, "scaleY", tB[i] + (i === 2 ? 1.0 : 0), 1, i === 2 ? "sine.inOut" : "back.out(2.2)");
    if (i === 2) { api.key(s, "rotation", 0, 0, "step"); api.key(s, "rotation", tB[i] + 0.4, 0, "none"); api.key(s, "rotation", tB[i] + 1.25, 17, "sine.inOut"); }
    else { api.key(s, "rotation", 0, 0, "step"); api.key(s, "rotation", tB[i] + 0.2, -3, "sine.inOut"); api.key(s, "rotation", tB[i] + 0.9, 2, "sine.inOut"); api.key(s, "rotation", tB[i] + 1.6, 0, "sine.inOut"); }
    if (i < 2) api.sfx("pop", tB[i] - 0.06, 0.5);
  });
  W.pose(tS4 + 0.1, 0.4, { lean: 4, pupX: 9, pupY: -3 }, "power2.out");
  W.idle(tS4 + 0.6, tB[0] - 0.3, { seed: 9, bien: 1.5 });
  var dem = [-112, -118, -124];
  dem.forEach(function (u, i) {
    var t0 = tB[i] + (i === 2 ? 0.15 : 0.12);
    W.pose(t0, 0.2, { aRu: u, aRf: -6, pupX: 9, pupY: -6 }, "back.out(1.8)");
    if (i < 2) { W.pose(t0 + 0.32, 0.12, { aRf: -18 }, "power2.out"); W.pose(t0 + 0.46, 0.14, { aRf: -6 }, "power2.inOut"); }
  });
  api.show("#W-ngon", tB[0] + 0.1, 1);
  // ngón tay nghiêng theo tấm biển thứ ba
  W.pose(tB[2] + 0.45, 0.85, { aRf: -30, upRot: 5, lean: 7 }, "sine.inOut");
  W.mouth(tB[2] + 0.7, "flat");
  W.pose(tS5 - 0.3, 0.3, { aRu: -18, aRf: 10, upRot: 0, lean: 0 }, "power2.inOut");
  api.show("#W-ngon", tS5 - 0.1, 0);
  W.mouth(tS5 - 0.2, "X");

  // ---------- S5: lướt sang các đảo xanh rộng; Wob ngoái theo ----------
  W.pose(tS5 + 0.1, 0.35, { pupX: 11, pupY: -2, upRot: 4, lean: 5 }, "power2.out");
  var tBeach = T("beaches", 0, 21.76), tRoom = T("room", 0, 22.95);
  W.pose(tBeach - 0.1, 0.3, { aLu: -150, aLf: -115, eye: 1.1 }, "back.out(1.4)");
  W.pose(tRoom - 0.1, 0.25, { pupX: -11, upRot: -4, lean: -2 }, "power2.out");
  W.pose(tRoom + 0.7, 0.25, { pupX: 10, upRot: 3, lean: 4 }, "power2.out");
  W.mouth(tRoom + 0.75, "o");
  W.idle(tRoom + 1.0, DUR, { seed: 13, bien: 1.2 });
};
