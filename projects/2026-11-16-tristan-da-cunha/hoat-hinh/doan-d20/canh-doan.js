/* Đoạn d20 · cắt giấy · trang sepia trên hải đồ: bút lông ngỗng gạch một nét qua hình hòn đảo, Wob ngoài mép trang nhíu mày.
   Lật trang: lính que lên tàu, tàu nhỏ dần ra khơi, vài người que trên bờ đứng nhìn; thẻ Nov 1817. Wob vẫy theo tàu đúng "leave.",
   hạ tay ở "job.", tỉnh bơ tới "So". Khớp hình (Wob đứng yên chỗ cũ) sang làng hiện tại tông màu: Wob gãi cằm, dấu hỏi giấy to bật dựng
   trên mái nhà. Lại trang sepia: một người que áo lính cùng vợ và hai đứa trẻ que (nhìn từ sau, không mặt) trước túp lều đá nhìn tàu nhỏ dần;
   Wob đặt dấu hỏi xuống. Vào "cat", ra "cat". Chữ: Nov 1817, ?. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M, S = M.S, ND = window.NhietDoi, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tDec = T("decided", 0, 1.63), tBot = T("bother.", 0, 3.33), tSold = T("soldiers", 0, 4.31), tNov = T("november", 0, 5.45), tLeave = T("leave.", 0, 7.91),
    tJob = T("job.", 0, 9.07), tSo = T("so", 0, 9.95), tVil = T("village?", 0, 10.97), tBec = T("because", 0, 12.93), tStay = T("stay.", 0, 14.13), tChil = T("children.", 0, 18.39);
  var PX = 60, PY = 70, PW = 1400, PH = 860;
  var clip = '<clipPath id="pgClip"><rect x="' + (PX + 10) + '" y="' + (PY + 10) + '" width="' + (PW - 20) + '" height="' + (PH - 20) + '"/></clipPath>';
  function sep(s) { return s.replace(/#1f2326/g, S.muc); }
  function bienSep(id) { return sep(TD.bien(api, id, { x0: PX - 200, x1: PX + PW + 200, y: 560, n: 3, day: 46, cao: 400, bien: 10, mau: [S.bien, "#B79E70", S.bienToi], bot: false })); }

  // =========== A1: hải đồ, bút gạch hòn đảo ===========
  var a1 = '<g id="a1">';
  a1 += D.line("M 200 480 L 1320 480 M 760 140 L 760 860", 3, S.nau, ' opacity="0.45"');
  for (var k = 0; k < 16; k++) { var an = k * Math.PI / 8; a1 += D.line("M 1180 250 L " + (1180 + Math.cos(an) * (k % 2 ? 60 : 110)).toFixed(1) + " " + (250 + Math.sin(an) * (k % 2 ? 60 : 110)).toFixed(1), k % 2 ? 2 : 3.5, S.nau, ' opacity="0.6"'); }
  a1 += sep(D.paper(D.rEll(740, 520, 170, 140, 6, 2001), S.co, { stroke: true, sw: 5, sx: 6, sy: 8 }));
  a1 += sep(D.paper(D.rEll(752, 506, 70, 58, 3, 2002), S.nauNhat, { stroke: true, sw: 3.5, shadow: false })) + '<circle cx="756" cy="502" r="10" fill="' + S.muc + '"/>';
  for (var c = 0; c < 9; c++) a1 += D.line("M " + (590 + c * 34) + " " + (660 + (c % 2) * 8) + " c 10 -6 20 6 30 0", 2.5, S.nau, ' opacity="0.6"');
  a1 += '<path id="gach" d="M 540 400 L 541 401" fill="none" stroke="' + S.muc + '" stroke-width="16" stroke-linecap="round"/>';
  a1 += '<g id="but"><g transform="rotate(32)">' + sep(D.paper("M 0 0 C -20 -60 -26 -180 -10 -300 C 30 -230 40 -120 8 -10 Z", S.giaySang, { stroke: true, sw: 4, sx: 4, sy: 6 })) +
    D.line("M 0 0 L -8 -280", 3, S.nau) + D.line("M 0 0 L 6 30", 6, S.muc) + "</g></g>";
  a1 += "</g>";
  // =========== A2: lính lên tàu, tàu nhỏ dần ===========
  var a2 = '<g id="a2">' + bienSep("bA");
  a2 += sep(D.paper("M 0 940 L 0 820 C 300 800 600 830 760 818 L 780 940 Z", S.da, { stroke: true, sw: 4, shadow: false }));
  a2 += '<g id="tau"><g id="tauLac">' + TD.tauBuom("tb", { sep: true, dai: 440 }) + "</g></g>";
  a2 += sep(D.line("M 700 830 L 860 770", 8, S.nau));
  ["s1", "s2", "s3"].forEach(function (id) { a2 += '<g id="' + id + 'G"><g transform="scale(0.34)">' + TD.nguoiCu(id, { linh: true }) + "</g></g>"; });
  [[240, 0], [330, 1], [410, 0]].forEach(function (p, j) { a2 += at(p[0], 880, '<g transform="scale(' + (p[1] ? 0.26 : 0.34) + ')">' + TD.nguoiCu("dn" + j, { sau: true, nho: !!p[1] }) + "</g>"); });
  a2 += "</g>";
  // =========== C: gia đình que trước lều đá, tàu nhỏ dần ===========
  var cc = '<g id="cG">' + bienSep("bC");
  cc += '<g id="tauC">' + TD.tauBuom("tc", { sep: true, dai: 260 }) + "</g>";
  cc += sep(D.paper("M 0 940 L 0 780 C 400 760 900 790 1500 770 L 1500 940 Z", S.da, { stroke: true, sw: 4, shadow: false }));
  cc += sep(D.paper("M 0 800 C 300 784 700 800 1000 790 L 1000 830 C 700 840 300 826 0 836 Z", S.co, { shadow: false }));
  cc += at(380, 800, sep(TD.nhaDa({ w: 300, h: 150, seed: 2011, mai: S.nau, tuong: S.giayToi, cuaMau: S.nau, so: 1, khoi: false })).replace(/#3A4A52/g, S.nau));
  cc += at(700, 900, '<g transform="scale(0.4)">' + TD.nguoiCu("gd0", { sau: true, ao: "#9A5A44" }) + "</g>");
  cc += at(790, 900, '<g transform="scale(0.37)">' + TD.nguoiCu("gd1", { sau: true }) + "</g>");
  cc += at(860, 902, '<g transform="scale(0.36)">' + TD.nguoiCu("gd2", { sau: true, nho: true }) + "</g>") + at(630, 902, '<g transform="scale(0.36)">' + TD.nguoiCu("gd3", { sau: true, nho: true }) + "</g>");
  cc += "</g>";

  var pg = '<g id="pg">' + clip + at(PX, PY, TD.trangCu(PW, PH, 2003)) + '<g clip-path="url(#pgClip)">' + a1 + a2 + cc + "</g>";
  pg += '<g id="tNov">' + TD.the("tNovi", CH[0], 60, { seed: 2004, nen: S.giaySang, mau: S.muc }) + "</g></g>";
  var thuc = '<g id="thuc">' + TD.bien(api, "bT", { x0: -400, x1: 2400, y: 860, n: 3, day: 40, bien: 12 }) + "</g>";
  var bo = '<g id="bo">' + at(1380, 930, TD.baiDa(1300, { seed: 2021, cao: 220 })) + at(-300, 1000, TD.baiDa(1800, { seed: 2022, cao: 160 })) + "</g>";
  // =========== B: làng hiện tại tông màu ===========
  var b = '<g id="sB"><g id="sBk"><rect x="-400" y="-400" width="3600" height="1900" fill="url(#tdTroiXam)"/>';
  b += at(700, 640, TD.nui({ w: 2200, h: 1100, seed: 2031 }));
  b += D.paper("M -400 640 C 400 630 1400 640 3200 632 L 3200 1400 L -400 1400 Z", M.co, { stroke: true, sw: 5, shadow: false });
  [[100, 300, 140], [480, 320, 150], [860, 280, 136], [1240, 340, 160], [1640, 300, 140], [2000, 300, 140]].forEach(function (n, j) { b += at(n[0], 790, TD.nhaDa({ w: n[1], h: n[2], seed: 2040 + j })); });
  b += '<g id="hoiMai">' + ND.bienHoi("hoi", { cao: 120, co: 104 }) + "</g>";
  b += at(-300, 930, TD.baiDa(3600, { seed: 2051, cao: 260 }));
  b += D.paper("M -300 905 C 600 898 1400 908 3300 900 L 3300 950 C 1400 958 600 948 -300 955 Z", M.dat, { stroke: true, sw: 4, shadow: false });
  b += "</g></g>";

  var W = TD.wob(api, "W", { muTrum: 0, holdL: '<g id="W-hoi"><g transform="scale(0.42)">' + ND.bienHoi("hoiT", { cao: 120, co: 104 }) + "</g></g>" });
  var dat = '<g id="hoiDat"><g transform="scale(0.42)">' + ND.bienHoi("hoiD", { cao: 120, co: 104 }) + "</g></g>";

  api.dat(TD.defs() + ND.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiXam)"/>' + thuc + pg + bo + b + dat + W.svg);
  api.noi({});
  var tBk = tSo, tCk = tBec - 0.05;
  TD.cat(api, "#sB", tBk, tCk);
  TD.cat(api, "#a1", 0, tSold - 0.15); TD.cat(api, "#a2", tSold - 0.15, tCk); TD.cat(api, "#cG", tCk, null);
  TD.camNhom(api, [["#pg", 1], ["#bo", 1.05]], [[0, 960, 540, 1.0], [tSold - 0.2, 970, 548, 1.03, "sine.inOut"], [tBk, 980, 556, 1.05, "sine.inOut"], [tCk, 960, 540, 1.0, "none"], [DUR, 940, 552, 1.05, "sine.inOut"]]);
  TD.camNhom(api, [["#sBk", 1]], [[tBk, 1500, 640, 1.18], [tCk, 1440, 610, 1.08, "sine.inOut"]]);

  // ---------- A1: bút gạch ----------
  var g0 = [540, 400], g1 = [960, 650], tG0 = tDec - 0.1, tG1 = tBot - 0.2;
  api.origin("#but", "0 0");
  api.key("#but", "x", 0, 1300, "step"); api.key("#but", "y", 0, 160, "step");
  api.key("#but", "x", 0.9, g0[0], "power2.out"); api.key("#but", "y", 0.9, g0[1], "power2.out");
  api.key("#but", "x", tG0, g0[0], "none"); api.key("#but", "y", tG0, g0[1], "none");
  api.key("#but", "x", tG1, g1[0], "power2.inOut"); api.key("#but", "y", tG1, g1[1], "power2.inOut");
  api.key("#but", "x", tG1 + 0.6, 1320, "power2.in"); api.key("#but", "y", tG1 + 0.6, 180, "power2.in");
  api.moiKhung(function (t) {
    if (!api.dom) return;
    var n = document.getElementById("gach"); if (!n) return;
    var u = TD.ss((t - tG0) / (tG1 - tG0));
    n.setAttribute("d", "M " + g0[0] + " " + g0[1] + " L " + (g0[0] + (g1[0] - g0[0]) * u + 0.5).toFixed(1) + " " + (g0[1] + (g1[1] - g0[1]) * u + 0.5).toFixed(1));
  });
  api.sfx("xuoc-dia", tG0, 0.25);
  // lật trang sang A2
  api.origin("#pg", "960 540");
  api.sfx("lat-giay", tSold - 0.3, 0.5);

  // ---------- A2: lính lên tàu, tàu ra khơi ----------
  api.origin("#tau", "0 0"); api.origin("#tauLac", "0 0");
  api.key("#tau", "x", 0, 960, "step"); api.key("#tau", "y", 0, 790, "step"); api.key("#tau", "scale", 0, 1, "step");
  var tDi = tSold + 1.5;
  api.key("#tau", "x", tDi, 960, "none"); api.key("#tau", "x", tJob, 1180, "power1.inOut");
  api.key("#tau", "y", tDi, 790, "none"); api.key("#tau", "y", tJob, 600, "power1.inOut");
  api.key("#tau", "scale", tDi, 1, "none"); api.key("#tau", "scale", tJob, 0.22, "power1.inOut");
  api.key("#tauLac", "rotation", 0, 0);
  for (var tt = 0.6, q = 0; tt < DUR; tt += 1.2, q++) api.key("#tauLac", "rotation", tt, q % 2 ? 1.5 : -1.5, "sine.inOut");
  ["s1", "s2", "s3"].forEach(function (id, j) {
    var g = "#" + id + "G", t0 = tSold - 0.1 + j * 0.3, t1 = t0 + 0.9;
    api.origin(g, "0 0");
    api.key(g, "x", 0, 480 - j * 90, "step"); api.key(g, "y", 0, 860, "step");
    api.key(g, "x", t0, 480 - j * 90, "none"); api.key(g, "x", t0 + 0.5, 700, "power1.in"); api.key(g, "x", t1, 860, "none");
    api.key(g, "y", t0 + 0.5, 836, "none"); api.key(g, "y", t1, 776, "power1.out");
    api.show(g, 0, 1); api.show(g, t1 + 0.05, 0);
    api.origin("#" + id + "-chL", "0 0"); api.origin("#" + id + "-chR", "0 0");
    api.key("#" + id + "-chL", "rotation", 0, 0); api.key("#" + id + "-chR", "rotation", 0, 0);
    for (var s = 1; s <= 5; s++) { var a = s === 5 ? 0 : (s % 2 ? 18 : -18); api.key("#" + id + "-chL", "rotation", t0 + s * 0.18, a, "sine.inOut"); api.key("#" + id + "-chR", "rotation", t0 + s * 0.18, -a, "sine.inOut"); }
  });
  api.origin("#tNov", "0 0");
  api.key("#tNov", "x", 0, 360, "step"); api.key("#tNov", "y", 0, 170, "step"); api.key("#tNov", "rotation", 0, -4, "step");
  api.pop("#tNov", tNov - 0.1, 0.24, tCk - 0.15); api.sfx("pop", tNov, 0.4);
  // người trên bờ vẫy theo
  api.origin("#dn0-tayR", "0 0"); api.key("#dn0-tayR", "rotation", 0, 0);
  [0, 1, 2, 3].forEach(function (i) { api.key("#dn0-tayR", "rotation", tDi + 0.4 + i * 0.3, i === 3 ? 0 : (i % 2 ? -150 : -120), "sine.inOut"); });

  // ---------- B: dấu hỏi trên mái, bay vào tay Wob ----------
  var HX = 1240, HY = 790 - 160 - 70 + 8, tHoi = tVil - 0.35;
  api.origin("#hoiMai", "0 0");
  api.key("#hoiMai", "x", 0, HX, "step"); api.key("#hoiMai", "y", 0, HY, "step");
  api.key("#hoiMai", "scaleY", 0, 0, "step"); api.key("#hoiMai", "scaleY", tHoi, 0, "none"); api.key("#hoiMai", "scaleY", tHoi + 0.3, 1, "back.out(2.4)");
  api.sfx("pop", tHoi + 0.05, 0.55);

  // ---------- C: tàu nhỏ dần, Wob đặt dấu hỏi xuống ----------
  api.origin("#tauC", "0 0");
  api.key("#tauC", "x", 0, 1080, "step"); api.key("#tauC", "y", 0, 640, "step"); api.key("#tauC", "scale", 0, 0.9, "step");
  api.key("#tauC", "x", tCk, 1080, "none"); api.key("#tauC", "x", DUR, 1260, "power1.inOut");
  api.key("#tauC", "y", tCk, 640, "none"); api.key("#tauC", "y", DUR, 590, "power1.inOut");
  api.key("#tauC", "scale", tCk, 0.9, "none"); api.key("#tauC", "scale", DUR, 0.28, "power1.inOut");
  api.origin("#gd0-dau", "0 0"); api.key("#gd0-dau", "rotation", 0, 0);
  api.key("#gd0-dau", "rotation", tStay + 1.4, 0, "none"); api.key("#gd0-dau", "rotation", tStay + 1.8, -8, "sine.inOut");
  api.origin("#gd1-tayL", "0 0"); api.key("#gd1-tayL", "rotation", 0, 0);
  api.key("#gd1-tayL", "rotation", tStay + 2.4, 0, "none"); api.key("#gd1-tayL", "rotation", tStay + 2.8, 30, "sine.inOut");

  // ---------- Wob ----------
  var WX = 1660, WY = 1000;
  W.set(0, { x: WX, y: WY, size: 0.62, pupX: -12, pupY: 2 });
  api.show("#W-hoi", 0, 0);
  W.idle(0, tDec - 0.2, { seed: 201, bien: 0.6, liec: false });
  W.pose(tDec, 0.3, { pupX: -14, pupY: 4, lid: 0.25 }, "power2.inOut");
  W.mouth(tDec + 0.6, "buon");
  W.pose(tG1 + 0.2, 0.3, { lean: -4 }, "power2.out"); W.pose(tG1 + 0.9, 0.3, { lean: 0, lid: 0 }, "power2.inOut");
  W.mouth(tSold, "flat");
  W.pose(tSold + 0.2, 0.3, { pupX: -14, pupY: -2 }, "power2.inOut");
  W.idle(tSold + 0.6, tLeave - 0.4, { seed: 202, bien: 0.5, liec: false });
  // vẫy đúng một cái ở "leave.", hạ ở "job."
  W.pose(tLeave - 0.12, 0.14, { aLu: 150, aLf: -30 }, "power2.out");
  W.pose(tLeave + 0.06, 0.14, { aLf: 22 }, "sine.inOut"); W.pose(tLeave + 0.22, 0.14, { aLf: -26 }, "sine.inOut");
  W.pose(tJob - 0.1, 0.22, { aLu: 18, aLf: -10 }, "power2.inOut");
  W.mouth(tJob, "flat");
  W.blinkAt(tJob + 0.4);
  // B: gãi cằm nhìn mái nhà
  W.pose(tBk, 0.2, { pupX: -12, pupY: -10 }, "power2.out");
  W.pose(tBk + 0.3, 0.25, { aRu: -132, aRf: -96 }, "power2.out");
  for (var gc = 0; gc < 4; gc++) { W.pose(tBk + 0.6 + gc * 0.22, 0.1, { aRf: -84 }, "sine.inOut"); W.pose(tBk + 0.71 + gc * 0.22, 0.1, { aRf: -100 }, "sine.inOut"); }
  W.pose(tHoi + 0.3, 0.2, { eye: 1.15, pupY: -14 }, "power2.out");
  W.mouth(tHoi + 0.35, "o");
  W.pose(tVil + 0.8, 0.3, { aRu: -18, aRf: 10, eye: 1 }, "power2.inOut");
  W.mouth(tVil + 1.0, "flat");
  // dấu hỏi bay vào tay Wob trước khi cắt về trang sepia
  var tBay = tCk - 0.75;
  TD.bayCung(api, "#hoiMai", tBay, tCk - 0.15, HX, HY, WX - 70, WY - 130, 180);
  api.key("#hoiMai", "scaleY", tBay, 1, "none"); api.key("#hoiMai", "scaleY", tCk - 0.15, 0.42, "power2.in");
  api.key("#hoiMai", "scaleX", 0, 1); api.key("#hoiMai", "scaleX", tBay, 1, "none"); api.key("#hoiMai", "scaleX", tCk - 0.15, 0.42, "power2.in");
  W.pose(tBay, 0.2, { aLu: 120, aLf: 10, pupX: -10, pupY: -12 }, "power2.out");
  api.show("#hoiMai", 0, 1); api.show("#hoiMai", tCk - 0.13, 0); api.show("#W-hoi", tCk - 0.13, 1);
  W.pose(tCk - 0.1, 0.2, { aLu: 60, aLf: -40 }, "power2.out");
  api.sfx("whoosh", tBay, 0.25);
  // C: đặt dấu hỏi xuống bãi đá
  W.pose(tCk + 0.2, 0.3, { pupX: -14, pupY: 2 }, "power2.inOut");
  var tDat = tStay + 0.1;
  W.pose(tDat - 0.3, 0.3, { aLu: 30, aLf: 10, lean: -6, sy: 0.95 }, "power2.inOut");
  api.show("#W-hoi", tDat, 0);
  api.origin("#hoiDat", "0 0");
  api.key("#hoiDat", "x", 0, WX - 120, "step"); api.key("#hoiDat", "y", 0, WY + 4, "step"); api.key("#hoiDat", "rotation", 0, -80, "step");
  api.show("#hoiDat", 0, 0); api.show("#hoiDat", tDat, 1);
  api.key("#hoiDat", "rotation", tDat, -20, "none"); api.key("#hoiDat", "rotation", tDat + 0.3, -82, "power2.in"); api.key("#hoiDat", "rotation", tDat + 0.45, -76, "power2.out"); api.key("#hoiDat", "rotation", tDat + 0.6, -80, "power2.inOut");
  api.sfx("bonk", tDat + 0.3, 0.3);
  W.pose(tDat + 0.35, 0.3, { aLu: 18, aLf: -10, lean: 0, sy: 1 }, "power2.inOut");
  W.mouth(tDat + 0.5, "flat");
  W.pose(tDat + 0.9, 0.3, { pupX: -14, pupY: 0, lid: 0.2 }, "power2.inOut");
  W.breathe(tDat + 1.2, DUR, 2.4);
  W.blinkAt(tChil - 1.2);
  W.autoBlink(0, tLeave, 203);
};
