/* Đoạn d18 · cắt giấy · trang lịch sử sepia (cao, cuộn được), Wob đứng NGOÀI mép trang trên bãi đá thật.
   Thuyền con cập bãi đá đen, ba lính que đội mũ cao (dạng chung, không mặt chi tiết) bước lên, cắm lá cờ nhỏ trơn; thẻ 14 Aug 1816;
   Wob đứng nghiêm. Trang cuộn lên mỏm đá: lính gác chĩa ống nhòm ra biển trống, ống nhòm xoay trọn một vòng, chỉ có một con chim biển bay qua;
   lính và Wob cùng nghiêm chào con chim, chim không chào lại, bay mất; giữ. Vào "cat" (từ d17 vẽ tay), ra "chen" (d19 chèn vào). Chữ: 14 Aug 1816. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M, S = M.S, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var t14 = T("fourteenth", 0, 0.57), tTroop = T("troops", 0, 3.51), tClaim = T("claimed", 0, 4.55), tGar = T("garrison", 0, 6.05), tEmp = T("emperor", 0, 7.23),
    tThere = T("there", 0, 8.03), tNob = T("nobody", 0, 9.61), tReach = T("reach", 0, 10.37);

  var PX = 60, PY = -900, PW = 1400, PH = 1830;
  var tr = '<clipPath id="pgClip"><rect x="' + (PX + 10) + '" y="' + (PY + 10) + '" width="' + (PW - 20) + '" height="' + (PH - 20) + '"/></clipPath>';
  tr += at(PX, PY, TD.trangCu(PW, PH, 1801));
  tr += '<g clip-path="url(#pgClip)">';
  // phần trên: mỏm đá nhìn ra biển trống
  tr += TD.bien(api, "bU", { x0: PX - 200, x1: PX + PW + 200, y: -300, n: 3, day: 40, cao: 1300, bien: 8, mau: [S.bien, "#B79E70", S.bienToi], bot: false }).replace(/#1f2326/g, S.muc);
  tr += at(380, -620, TD.may(280, { seed: 1802, mau: S.giaySang }));
  tr += D.paper("M 520 -60 L 560 -330 C 600 -400 680 -420 760 -424 L 1180 -424 C 1250 -420 1300 -380 1330 -320 L 1400 -60 Z", S.da, { stroke: true, sw: 5, sx: 8, sy: 10 }).replace(/#1f2326/g, S.muc);
  tr += D.line("M 600 -300 L 640 -120 M 900 -400 L 880 -200 M 1200 -380 L 1260 -160", 3, S.muc, ' opacity="0.5"');
  tr += '<g id="gac"><g id="gacSq">' + '<g transform="scale(0.5)">' + TD.nguoiCu("ngG", { linh: true }) + "</g>" +
    '<g id="ong" transform="translate(16,-170)"><g id="ongIn">' + D.paper(D.rRect(0, -11, 92, 22, 1, 1803), "#4E3E30", { stroke: true, sw: 3, shadow: false }).replace(/#1f2326/g, S.muc) +
    D.paper(D.rRect(86, -15, 18, 30, 1, 1804), "#6E5A40", { stroke: true, sw: 3, shadow: false }).replace(/#1f2326/g, S.muc) + "</g></g></g></g>";
  tr += '<g id="chimG">' + '<g transform="scale(0.8)">' + TD.chim("ch", { mau: S.giaySang, ink: S.muc }) + "</g></g>";
  // phần dưới: biển, bãi đá đen, thuyền con, lính, cờ
  tr += TD.bien(api, "bS", { x0: PX - 200, x1: PX + PW + 200, y: 520, n: 2, day: 120, cao: 400, bien: 10, mau: ["#B79E70", S.bienToi], bot: false }).replace(/#1f2326/g, S.muc);
  tr += D.paper("M 0 940 L 0 820 C 300 800 700 830 1000 812 C 1200 800 1400 806 1500 812 L 1500 940 Z", S.da, { stroke: true, sw: 4, shadow: false }).replace(/#1f2326/g, S.muc);
  for (var r = 0; r < 14; r++) tr += '<path d="' + D.rEll(120 + r * 95, 860 + (r % 3) * 18, 26 + (r % 4) * 6, 12, 1.5, 1810 + r) + '" fill="#8E7658" stroke="' + S.muc + '" stroke-width="2.5"/>';
  tr += '<g id="thc">' + TD.thuyenCon("tc", { sep: true, dai: 260 }) + "</g>";
  tr += '<g id="co"><g transform="translate(0,0)">' + D.line("M 0 0 L 0 -150", 6, S.muc) + D.paper("M 3 -150 L 80 -128 L 3 -104 Z", "#9A5A44", { stroke: true, sw: 3, shadow: false }).replace(/#1f2326/g, S.muc) + "</g></g>";
  var LINH = ["s1", "s2", "s3"];
  LINH.forEach(function (id, j) { tr += '<g id="' + id + 'G"><g transform="scale(0.36)">' + TD.nguoiCu(id, { linh: true }) + "</g></g>"; });
  tr += "</g>";
  tr += '<g id="tNg">' + TD.the("tNgi", CH[0], 60, { seed: 1820, nen: S.giaySang, mau: S.muc }) + "</g>";

  var bo = at(1380, 930, TD.baiDa(1300, { seed: 1831, cao: 220 })) + at(-300, 1000, TD.baiDa(1800, { seed: 1832, cao: 160 }));
  var W = TD.wob(api, "W", { muTrum: 0 });
  bo += W.svg;

  api.dat(TD.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiXam)"/>' +
    TD.bien(api, "bT", { x0: -400, x1: 2400, y: 860, n: 3, day: 40, bien: 12 }) +
    api.lop("trang", tr, 1, { mat: 930 }) + api.lop("bo", bo, 1, { mat: 1000 }));
  api.noi({});
  var tUp0 = tGar - 0.15, tUp1 = tUp0 + 1.2;
  api.camera([[0, 960, 540, 1.0], [tUp0, 960, 548, 1.02, "sine.inOut"], [tUp1, 960, -330, 1.0, "power2.inOut"], [DUR, 960, -342, 1.02, "sine.inOut"]], ["trang"]);

  // ---------- thẻ ngày ----------
  api.origin("#tNg", "0 0");
  api.key("#tNg", "x", 0, 360, "step"); api.key("#tNg", "y", 0, 170, "step"); api.key("#tNg", "rotation", 0, -4, "step");
  api.pop("#tNg", t14 - 0.1, 0.24); api.sfx("pop", t14, 0.4);
  api.show("#tNg", 0, 1); api.show("#tNg", tUp0 + 0.5, 0);

  // ---------- thuyền con cập bờ, lính bước lên ----------
  api.origin("#thc", "0 0");
  api.key("#thc", "x", 0, 120, "step"); api.key("#thc", "y", 0, 800, "step");
  api.key("#thc", "x", 1.3, 430, "power2.out");
  api.key("#thc", "rotation", 0, 0); api.key("#thc", "rotation", 1.3, 0, "none"); api.key("#thc", "rotation", 1.4, -4, "power2.out"); api.key("#thc", "rotation", 1.7, 0, "back.out(2)");
  api.sfx("bonk", 1.3, 0.3);
  function diBo(id, t0, t1, x0, x1, y0, y1) {
    var g = "#" + id + "G";
    api.key(g, "x", t0, x0, "none"); api.key(g, "x", t1, x1, "power1.inOut");
    if (y0 != null) { api.key(g, "y", t0, y0, "none"); api.key(g, "y", t1, y1, "power1.inOut"); }
    var n = Math.max(2, Math.round((t1 - t0) / 0.22));
    ["chL", "chR"].forEach(function (c, s) { api.origin("#" + id + "-" + c, "0 0"); api.key("#" + id + "-" + c, "rotation", t0, 0, "none"); });
    for (var i = 1; i <= n; i++) {
      var tt = t0 + (t1 - t0) * i / n, a = i === n ? 0 : (i % 2 ? 18 : -18);
      api.key("#" + id + "-chL", "rotation", tt, a, "sine.inOut"); api.key("#" + id + "-chR", "rotation", tt, -a, "sine.inOut");
    }
  }
  LINH.forEach(function (id, j) {
    var g = "#" + id + "G";
    api.origin(g, "0 0");
    api.key(g, "x", 0, 380 + j * 60, "step"); api.key(g, "y", 0, 780, "step");
    api.show(g, 0, 0); api.show(g, 1.35 + j * 0.25, 1);
    api.key(g, "y", 1.35 + j * 0.25, 780, "none"); api.key(g, "y", 1.6 + j * 0.25, 850, "power2.in");
    diBo(id, 1.75 + j * 0.25, tTroop + 0.3 + j * 0.2, 380 + j * 60 + 40, 780 + j * 120);
    api.key(g, "y", tTroop + 0.3 + j * 0.2, 850, "none");
  });
  // lính đầu cắm cờ
  api.origin("#s3-tayR", "0 0");
  api.key("#s3-tayR", "rotation", 0, 0); api.key("#s3-tayR", "rotation", tClaim - 0.4, 0, "none"); api.key("#s3-tayR", "rotation", tClaim - 0.1, -150, "power2.out");
  api.key("#s3-tayR", "rotation", tClaim + 0.15, -30, "power3.in"); api.key("#s3-tayR", "rotation", tClaim + 0.6, 0, "power2.inOut");
  api.origin("#co", "0 0");
  api.key("#co", "x", 0, 1080, "step"); api.key("#co", "y", 0, 700, "step");
  api.show("#co", 0, 0); api.show("#co", tClaim - 0.1, 1);
  api.key("#co", "y", tClaim - 0.1, 760, "none"); api.key("#co", "y", tClaim + 0.15, 862, "power3.in");
  api.sfx("bonk", tClaim + 0.15, 0.45);
  api.key("#co", "rotation", 0, 0); [4, -3, 1, 0].forEach(function (v, i) { api.key("#co", "rotation", tClaim + 0.3 + i * 0.2, v, "sine.inOut"); });

  // ---------- lính gác, ống nhòm xoay 360, chim ----------
  api.origin("#gac", "0 0"); api.key("#gac", "x", 0, 900, "step"); api.key("#gac", "y", 0, -424, "step");
  api.origin("#ongIn", "0 0");
  var tO0 = tUp1 - 0.1, tO1 = tO0 + 1.3;
  api.key("#ongIn", "rotation", 0, 0); api.key("#ongIn", "rotation", tO0, 0, "none"); api.key("#ongIn", "rotation", tO1, -360, "power1.inOut");
  api.origin("#gacSq", "0 0");
  api.key("#gacSq", "scaleX", 0, 1); api.key("#gacSq", "scaleX", tO0 + 0.5, 1, "none"); api.key("#gacSq", "scaleX", tO0 + 0.65, -1, "power2.inOut"); api.key("#gacSq", "scaleX", tO1 - 0.15, -1, "none"); api.key("#gacSq", "scaleX", tO1, 1, "power2.inOut");
  api.sfx("whoosh", tO0 + 0.2, 0.2);
  var tB0 = tO1 - 0.3, tChao = tThere + 0.35;
  api.origin("#chimG", "0 0");
  api.key("#chimG", "x", 0, 1600, "step"); api.key("#chimG", "y", 0, -620, "step");
  api.key("#chimG", "x", tB0, 1600, "none"); api.key("#chimG", "x", tChao + 0.2, 1080, "sine.out"); api.key("#chimG", "x", tChao + 0.9, 980, "sine.inOut"); api.key("#chimG", "x", tChao + 2.0, -200, "power2.in");
  api.key("#chimG", "y", tB0, -620, "none"); api.key("#chimG", "y", tChao + 0.2, -560, "sine.inOut"); api.key("#chimG", "y", tChao + 0.9, -575, "sine.inOut"); api.key("#chimG", "y", tChao + 2.0, -700, "sine.in");
  api.key("#chimG", "scaleX", 0, -1, "step");
  ["#ch-cL", "#ch-cR"].forEach(function (c, s) {
    api.origin(c, "0 0"); api.key(c, "rotation", 0, 0);
    for (var t = tB0, q = 0; t < DUR; t += 0.16, q++) api.key(c, "rotation", t, (q % 2 ? 22 : -18) * (s ? -1 : 1), "sine.inOut");
  });
  // chào
  api.origin("#ngG-tayR", "0 0");
  api.key("#ngG-tayR", "rotation", 0, 0); api.key("#ngG-tayR", "rotation", tChao - 0.2, 0, "none"); api.key("#ngG-tayR", "rotation", tChao, -150, "back.out(2)");

  // ---------- Wob ngoài trang ----------
  W.set(0, { x: 1660, y: 1000, size: 0.62, pupX: -12, pupY: 2 });
  W.idle(0, t14, { seed: 181, bien: 0.6, liec: false });
  W.pose(1.1, 0.3, { pupX: -14, pupY: 6 }, "power2.inOut");
  // đứng nghiêm khi lính lên bờ
  W.pose(tTroop - 0.2, 0.2, { aLu: 2, aLf: 0, aRu: -2, aRf: 0, sy: 1.05, sx: 0.97, upY: -4 }, "back.out(2)");
  W.mouth(tTroop, "flat");
  W.pose(tClaim + 0.2, 0.25, { pupX: -10, pupY: 6, eye: 1.08 }, "power2.out");
  W.blinkAt(tClaim + 0.8);
  W.pose(tUp0 + 0.2, 0.5, { pupX: -10, pupY: -14, sy: 1, sx: 1, upY: 0, upRot: -4 }, "power2.inOut");
  W.mouth(tUp0 + 0.4, "o");
  W.pose(tO0 + 0.1, 0.25, { pupX: -15, pupY: -12 }, "sine.inOut"); W.pose(tO0 + 0.6, 0.25, { pupX: -4, pupY: -15 }, "sine.inOut"); W.pose(tO0 + 1.1, 0.25, { pupX: -13, pupY: -13 }, "sine.inOut");
  // chào chim
  W.pose(tChao - 0.15, 0.22, { aRu: -165, aRf: -100, sy: 1.05, upRot: 0, pupX: -14, pupY: -14 }, "back.out(2)");
  W.mouth(tChao, "flat");
  W.pose(tChao + 1.0, 0.4, { pupX: -15, pupY: -10 }, "sine.inOut");
  W.blinkAt(tNob + 0.1);
  W.mouth(tReach + 0.1, "wobbly");
  W.autoBlink(0, tTroop, 182);
  void tEmp;
};
