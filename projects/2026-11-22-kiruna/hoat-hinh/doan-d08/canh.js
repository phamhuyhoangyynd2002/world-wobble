/* d08 – Mái nhà tuyết đêm → cửa sổ phòng thuê; cốc nước rung đúng giờ; đêm thứ ba Wob ngồi chờ sẵn với cốc trà, cụng ly với cốc nước.
   Cắt giấy, nhóm A. Cùng phòng thuê với d06 (XL.phongThue). Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tShiv = T("shivers."), tMy = T("my"), tSched = T("schedule."), tBy = T("by"), tPolite = T("polite."), tThe = T("the", 9), tUnd = T("understanding.");
  var tIn = 2.75;   // vào phòng (hoà tan)
  var tNight3 = tBy - 0.12;

  /* ---------- cảnh 1: mái nhà tuyết, cửa sổ sáng ---------- */
  var r = D.rng(8101), ext = '<rect x="-200" y="-400" width="2400" height="1900" fill="url(#xlTroiDem)"/>';
  for (var k = 0; k < 40; k++) ext += '<circle cx="' + (r() * 2200 - 100).toFixed(0) + '" cy="' + (r() * 700 - 380).toFixed(0) + '" r="' + (1.5 + r() * 2.5).toFixed(1) + '" fill="#FFFFFF" opacity="0.8"/>';
  for (var q = 0; q < 6; q++) ext += at(-200 + q * 420, 560, '<g transform="scale(0.6)">' + XL.nhaGo({ w: 320, h: 240, mau: "#3E4A66", seed: 8120 + q }) + "</g>");
  ext += paper(D.rRect(300, 470, 1320, 1100, 2, 8130), "#C98E36", { stroke: true, sw: 6, sx: 8, sy: 10, half: 0.06 });
  for (var bx = 330; bx < 1600; bx += 34) ext += line("M " + bx + " 490 L " + bx + " 1560", 2.5, "#1f2326", ' opacity="0.16"');
  ext += paper("M 160 250 L 1760 250 L 1760 470 L 1740 520 L 180 520 L 160 470 Z", "#4A3A36", { stroke: true, sw: 6, sx: 8, sy: 12 });
  for (var rx = 190; rx < 1760; rx += 60) ext += line("M " + rx + " 260 L " + (rx + 8) + " 512", 3, "#2E2422", ' opacity="0.5"');
  ext += paper(D.rough([[150, 250], [1770, 250], [1770, 440], [1500, 452], [1100, 436], [700, 450], [300, 438], [150, 450]], 4, 8131, 24), "#F7FBFC", { stroke: true, sw: 4, shadow: false });
  // cửa sổ phòng thuê sáng ấm (ô to giữa tường)
  ext += paper(D.rRect(780, 640, 360, 330, 1.5, 8140), "#B08A5E", { stroke: true, sw: 6, sx: 8, sy: 10 }) + '<rect x="800" y="660" width="320" height="290" fill="#FFD68A"/>' +
    '<rect x="800" y="660" width="320" height="290" fill="#8E5A6A" opacity="0.25"/>' + line("M 960 660 L 960 950 M 800 805 L 1120 805", 10, "#B08A5E") + line("M 790 958 L 1130 958", 10, "#F7FBFC");
  ext += '<g opacity="0.55">' + paper("M 860 950 L 860 880 C 870 840 930 840 940 880 L 940 950 Z", "#5E86A0", { shadow: false }) + "</g>";
  // mép mái tuyết + mảng tuyết trượt
  var tuyet = '<g id="tuyet">' + paper(D.rough([[640, 440], [1000, 436], [1010, 500], [960, 540], [880, 552], [760, 536], [650, 510]], 4, 8150, 18), "#F7FBFC", { stroke: true, sw: 4, sy: 6 }) + "</g>";
  ext += tuyet;
  var c1 = '<g id="c1">' + api.lop("ext", ext, 1, { mat: 1000 }) + "</g>";

  /* ---------- cảnh 2: phòng thuê ---------- */
  var R = XL.phongThue(api, "pt", {});
  var mug = '<g id="B-mug"><g transform="translate(-14,40) scale(1.05)">' + D.teaMug("mg") + "</g></g>";
  var B = XL.wob(api, "B", { ao: null, noPack: true, holdR: mug });
  var c2 = '<g id="c2">' + api.lop("g2", R.tuong + R.sau + B.svg + R.chan + R.truoc, 1, { mat: 860 }) + "</g>";
  api.dat(XL.defs() + c1 + c2);
  api.noi({});
  api.show("#c1", 0, 1); api.show("#c2", 0, 0); api.fade("#c2", tIn - 0.12, 0.24, 1); api.show("#c1", tIn + 0.14, 0);

  /* camera ngoài: lướt smootherstep từ mép mái xuống ô cửa sổ */
  api.camera([[0, 820, 450, 1.55], [0.35, 820, 452, 1.56, "sine.inOut"], [1.95, 930, 640, 1.6, "power3.inOut"], [tIn, 960, 805, 2.6, "power2.in"]], ["ext"]);
  // mảng tuyết trượt khỏi mép mái đúng "shivers."
  api.origin("#tuyet", "820 490");
  api.key("#tuyet", "x", 0, 0); api.key("#tuyet", "x", tShiv - 0.12, 0, "none"); api.key("#tuyet", "x", tShiv + 0.12, 40, "power2.in");
  api.key("#tuyet", "y", 0, 0); api.key("#tuyet", "y", tShiv + 0.08, 0, "none"); api.key("#tuyet", "y", tShiv + 0.6, 520, "power2.in");
  api.key("#tuyet", "rotation", 0, 0); api.key("#tuyet", "rotation", tShiv + 0.08, 0, "none"); api.key("#tuyet", "rotation", tShiv + 0.6, 14, "power1.in");
  for (var s2 = 0, ts = tShiv - 0.3; ts < tShiv + 0.1; ts += 0.04, s2++) api.key("#tuyet", "y", ts, s2 % 2 ? -2 : 0, "none");
  api.key("#tuyet", "y", tShiv + 0.1, 0, "none");
  api.sfx("whoosh", tShiv + 0.1, 0.18);

  /* ---------- trong phòng: cốc rung đúng lịch ---------- */
  api.origin("#pt-dh-kimG", "0 0"); api.origin("#pt-dh-kimP", "0 0");
  api.set("#pt-dh-kimG", 0, { rotation: 37.5 }); api.set("#pt-dh-kimP", 0, { rotation: 90 });
  api.show("#B-mug", 0, 0); api.key("#pt-coc", "x", 0, 0);
  B.set(0, { op: 1 }); B.set(0, { x: 905, y: 846, size: 0.56, aLu: 18, aLf: -10, aRu: -18, aRf: 10 });
  B.autoBlink(tIn, DUR, 31);
  api.show("#B-legL", 0, 0); api.show("#B-legR", 0, 0);   // nằm/ngồi trong chăn: không lộ chân dưới gầm giường
  api.camera([[tIn, 1080, 640, 2.2], [tIn + 0.5, 1050, 648, 1.9, "power2.out"], [tNight3 - 0.02, 1040, 652, 1.95, "sine.inOut"]], ["g2"]);
  function rung(t0, t1, b) { for (var j = 0, t = t0; t < t1; t += 0.05, j++) api.key("#pt-coc", "x", t, (j % 2 ? 1 : -1) * b, "none"); api.key("#pt-coc", "x", t1, 0, "none"); }
  api.show("#pt-coc-gon", tMy - 0.05, 1);
  for (var g = tMy - 0.05; g < tNight3; g += 0.42) { api.key("#pt-coc-gon", "scale", g, 0.5, "none"); api.key("#pt-coc-gon", "scale", g + 0.4, 1.1, "sine.out"); }
  api.show("#pt-coc-gon", tNight3, 0);
  rung(tMy - 0.05, tNight3, 1.6);
  // Wob ló khỏi chăn, liếc đồng hồ rồi liếc cốc
  api.key("#B", "y", tMy + 0.1, 846, "none"); api.key("#B", "y", tMy + 0.45, 814, "power2.out");
  B.pose(tMy + 0.3, 0.2, { pupX: 14, pupY: -6 }, "power2.out");
  B.pose(tSched - 0.1, 0.2, { pupX: 12, pupY: 8 }, "power2.inOut");
  B.blinkAt(tSched + 0.5);

  /* ---------- đêm thứ ba: ngồi dậy sẵn với cốc trà ---------- */
  api.camera([[tNight3, 1040, 652, 1.95, "none"], [tNight3 + 0.03, 1080, 640, 1.62, "none"], [tUnd - 0.3, 1060, 640, 1.7, "sine.inOut"], [DUR, 1062, 640, 1.76, "sine.inOut"]], ["g2"]);
  B.set(tNight3 + 0.03, { x: 960, y: 772, pupX: 12, pupY: 6, aLu: -52, aLf: -58, aRu: 46, aRf: 62 });
  api.show("#B-mug", tNight3 + 0.03, 1);
  api.hoi("mg", tNight3, DUR);
  B.mouth(tNight3, "X");
  B.breathe(tNight3, tPolite - 0.3, 2.2);
  B.pose(tNight3 + 1.2, 0.4, { pupX: 10, pupY: 10 }, "sine.inOut");
  B.pose(tNight3 + 2.4, 0.4, { pupX: 13, pupY: 5 }, "sine.inOut");
  // "polite.": chỉnh tư thế ngồi ngay ngắn
  B.pose(tPolite - 0.2, 0.14, { sy: 0.94, sx: 1.04, lean: -3 }, "power2.out");
  B.pose(tPolite - 0.06, 0.24, { sy: 1.05, sx: 0.97, lean: 0, upY: -6 }, "back.out(2)");
  B.pose(tPolite + 0.18, 0.3, { sy: 1, sx: 1, upY: -2 }, "power2.out");
  B.mouth(tPolite, "flat");
  // 1 giờ 15: cốc bắt đầu rung
  api.show("#pt-coc-gon", tThe - 0.05, 1);
  for (var g2 = tThe - 0.05; g2 < DUR; g2 += 0.42) { api.key("#pt-coc-gon", "scale", g2, 0.5, "none"); api.key("#pt-coc-gon", "scale", g2 + 0.4, 1.1, "sine.out"); }
  rung(tThe - 0.05, tUnd - 0.1, 1.6);
  B.pose(tThe, 0.25, { pupX: 14, pupY: 8, eye: 1.08 }, "power2.out");
  // cụng ly đúng "understanding."
  var tC = tUnd - 0.06;
  B.pose(tC - 0.5, 0.32, { aLu: 18, aLf: -10, aRu: -78, aRf: -8, lean: -5 }, "power2.inOut");
  api.key("#B", "x", tC - 0.5, 960, "none"); api.key("#B", "x", tC - 0.12, 978, "power2.inOut");
  B.pose(tC - 0.06, 0.06, { aRu: -84 }, "power2.out"); B.pose(tC, 0.16, { aRu: -76 }, "back.out(2)");
  api.key("#pt-coc", "x", tC, 3, "none"); api.key("#pt-coc", "x", tC + 0.08, 0, "power2.out");
  api.sfx("ting", tC, 0.6);
  // cốc ngân một nốt: vòng gợn to ra một lần, rồi lặng
  api.key("#pt-coc-gon", "scale", tC, 0.4, "none"); api.key("#pt-coc-gon", "scale", tC + 0.6, 1.5, "sine.out");
  api.show("#pt-coc-gon", tC + 0.62, 0);
  // Wob nhìn người xem, giữ hình
  B.pose(tC + 0.35, 0.3, { pupX: 0, pupY: 2, eye: 1, lean: 0 }, "power2.inOut");
  B.mouth(tC + 0.4, "smirk");
  B.pose(tC + 0.45, 0.4, { aRu: 40, aRf: 60, aLu: -52, aLf: -58 }, "power2.inOut");
  api.key("#B", "x", tC + 0.45, 978, "none"); api.key("#B", "x", tC + 0.85, 962, "power2.inOut");
};
