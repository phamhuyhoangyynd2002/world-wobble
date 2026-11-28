/* d12 – Mặt cắt mỏ kéo sang đông (thân quặng dưới phố cũ, đống quặng ở chỗ cụt có một hòn ngoảnh về tây, mũi tên đông);
   phòng trưng bày: Wob (mũ bảo hộ) giữ băng giấy máy địa chấn, gai lớn đúng "earthquake", thẻ M 4.1 · May 2020, thở ra;
   phòng thuê đêm: tháo chìa Kiruna khỏi chùm, nhét túi phải, vỗ túi hai cái; ra giấy phẳng.
   Cắt giấy, nhóm A. Chữ: data.chu_tren_do_vat[0]. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, ND = window.NhietDoi, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper, CH = data.chu_tren_do_vat;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tEast = T("east,"), tIn = T("in", 3), tEq = T("earthquake"), tMag = T("magnitude"), tNob = T("nobody"), tThat = T("that", 11), tSlid = T("slid"), tKey = T("key"), tPocket = T("pocket."), tPockets = T("pockets"), tMaybe = T("maybes.");
  var tB = tIn - 0.15, tC = tThat - 0.15;

  /* ================= cảnh 1: mặt cắt mỏ, lướt sang đông ================= */
  var MC = XL.matCatMo(api, "mc", {});
  var c1 = '<g id="c1">' + api.lop("mo", MC.troi + MC.dat + MC.giua, 1, { mat: 900 }) + "</g>";

  /* ================= cảnh 2: phòng trưng bày, máy địa chấn ================= */
  var MX = 820, MY = 800;
  var p2 = '<rect x="-300" y="-300" width="2520" height="1300" fill="url(#xlTuong)"/><rect x="-300" y="-300" width="2520" height="1300" fill="#5E6B70" opacity="0.18"/>';
  p2 += '<rect x="-300" y="1000" width="2520" height="400" fill="url(#xlGo)"/>' + paper(D.rRect(-300, 980, 2520, 30, 1, 1201), "#6E5A44", { stroke: true, sw: 4, shadow: false });
  p2 += paper(D.rRect(1500, 230, 300, 220, 1.5, 1202), "#8A6440", { stroke: true, sw: 5 }) + paper(D.rRect(1520, 250, 260, 180, 1.2, 1203), "#3E4A58", { stroke: true, sw: 3, shadow: false }) +
    line("M 1530 400 L 1600 330 L 1650 370 L 1720 290 L 1770 340", 5, "#C8B48A");
  p2 += at(MX, MY, XL.mayDiaChan("sd"));
  var M = XL.wob(api, "M", { muBaoHo: true });
  p2 += M.svg;
  p2 += '<g id="the41v" transform="translate(' + (MX - 40) + "," + (MY - 330) + ')"><g id="the41" transform="rotate(-3)">' + ND.theChu("", CH[0], 56, { seed: 1210 }) + "</g></g>";
  var c2 = '<g id="c2">' + api.lop("pb", p2, 1, { mat: 900 }) + "</g>";

  /* ================= cảnh 3: phòng thuê đêm ================= */
  var R = XL.phongThue(api, "pt", {});
  var camR = '<g id="W-cam"><g transform="translate(4,6) scale(0.55)">' + XL.chumChia("W-cc", { kiruna: true }) + "</g></g>" +
    '<g id="W-key"><g transform="translate(0,4) scale(0.62)">' + XL.chiaKhoa("W-k", { the: true }) + "</g></g>";
  var camL = '<g id="W-camL"><g transform="translate(-4,6) scale(0.55)">' + XL.chumChia("W-ccL", { kiruna: true }) + "</g></g>";
  var W = XL.wob(api, "W", { khongMu: true, noPack: true, holdR: camR, holdL: camL });
  var c3 = '<g id="c3">' + api.lop("g3", R.tuong + R.sau + W.svg + R.truoc, 1, { mat: 860 }) + "</g>";

  api.dat(XL.defs() + c1 + c2 + c3);
  api.noi({});
  api.show("#c1", 0, 1); api.show("#c2", 0, 0); api.show("#c3", 0, 0);
  api.fade("#c2", tB - 0.1, 0.22, 1); api.show("#c1", tB + 0.14, 0);
  api.fade("#c3", tC - 0.1, 0.22, 1); api.show("#c2", tC + 0.14, 0);

  /* ---------- cảnh 1 ---------- */
  api.camera([[0, -160, 250, 1.7], [0.7, -120, 260, 1.62, "sine.inOut"], [2.6, 2150, 760, 0.82, "power3.inOut"], [tB + 0.2, 2200, 780, 0.84, "sine.out"]], ["mo"]);
  api.origin("#mc-honMat", "0 0");
  api.key("#mc-honMat", "scaleX", 0, 1); api.key("#mc-honMat", "scaleX", 0.35, 1, "none"); api.key("#mc-honMat", "scaleX", 0.5, -1, "power2.out");
  api.key("#mc-honMat", "y", 0, -20); api.key("#mc-honMat", "y", 0.35, -20, "none"); api.key("#mc-honMat", "y", 0.45, -30, "power2.out"); api.key("#mc-honMat", "y", 0.6, -20, "power2.in");
  api.fade("#mc-muiDong", tEast - 0.3, 0.3, 1);
  api.origin("#mc-muiDong", "1300 940");
  api.key("#mc-muiDong", "scale", 0, 0.6); api.key("#mc-muiDong", "scale", tEast - 0.3, 0.6, "none"); api.key("#mc-muiDong", "scale", tEast + 0.1, 1, "back.out(1.6)");

  /* ---------- cảnh 2: băng địa chấn ---------- */
  api.camera([[tB, 1000, 640, 1.04], [tEq - 0.1, 1010, 650, 1.1, "sine.inOut"], [tEq + 0.02, 1022, 642, 1.1, "none"], [tEq + 0.08, 998, 658, 1.1, "none"], [tEq + 0.14, 1016, 646, 1.1, "none"], [tEq + 0.22, 1010, 650, 1.1, "none"],
    [tC, 1010, 640, 1.14, "sine.inOut"]], ["pb"]);
  var tE = tEq - 0.02;
  function bien(tau) {
    var a = 2.4 * Math.sin(tau * 23) + 1.6 * Math.sin(tau * 37 + 1.3);
    if (tau > tE) { var u = tau - tE; a += 62 * Math.sin(u * 38) * Math.exp(-u * 3.2); }
    return Math.max(-52, Math.min(52, a));
  }
  var net = null, but = null, V = 130;
  api.moiKhung(function (t) {
    var doc = window.document; if (!doc) return;
    net = net || doc.getElementById("sd-net"); but = but || doc.getElementById("sd-but");
    if (!net) return;
    var d = "";
    for (var x = -290; x <= 0; x += 4) { var tau = t + x / V, y = tau < tB ? 0 : bien(tau); d += (d ? " L " : "M ") + x + " " + (-130 + y).toFixed(1); }
    net.setAttribute("d", d);
    if (but) but.setAttribute("transform", "translate(0," + (t < tB ? 0 : bien(t)).toFixed(1) + ")");
  });
  // Wob giữ đầu băng giấy cho thẳng
  var WX = MX + 545, WY = 1000;
  M.set(0, { x: WX, y: WY, size: 1.15, aLu: 166, aLf: 8, aRu: -18, aRf: 10, pupX: -14, pupY: 4 });
  api.show(M.xl.mbhDen, 0, 1);
  M.mouth(0, "flat"); M.autoBlink(tB, tC, 121);
  M.idle(tB, tEq - 0.3, { seed: 12, bien: 1.5 });
  M.pose(tB + 1.2, 0.5, { pupX: -10, pupY: 10 }, "sine.inOut");
  // giật mình lùi lại
  M.pose(tEq - 0.02, 0.1, { eye: 1.22, sy: 1.08, sx: 0.94, aLu: 120, aLf: -30, aRu: -60, aRf: -40, lean: 8 }, "power2.out"); M.mouth(tEq, "o");
  api.key("#M", "x", tEq - 0.02, WX, "none"); api.key("#M", "x", tEq + 0.2, WX + 70, "power2.out");
  M.pose(tEq + 0.35, 0.3, { sy: 1, sx: 1, eye: 1.1, lean: 4 }, "sine.inOut");
  M.pose(tMag - 0.2, 0.3, { pupX: -14, pupY: -12 }, "sine.inOut");
  api.pop("#the41", tMag - 0.1, 0.25);
  // "Nobody": thở ra, quay lại vuốt băng giấy
  M.pose(tNob - 0.1, 0.15, { sy: 0.93, sx: 1.06, eye: 1, lean: 0 }, "power2.out"); M.mouth(tNob - 0.1, "o");
  M.pose(tNob + 0.15, 0.3, { sy: 1, sx: 1 }, "back.out(2)"); M.mouth(tNob + 0.3, "smirk");
  api.key("#M", "x", tNob + 0.2, WX + 70, "none"); api.key("#M", "x", tNob + 0.55, WX, "power2.inOut");
  M.pose(tNob + 0.55, 0.25, { aLu: 166, aLf: 8, aRu: -18, aRf: 10, pupX: -14, pupY: 6 }, "power2.out");
  M.pose(tNob + 0.85, 0.2, { aLf: 30 }, "sine.inOut"); M.pose(tNob + 1.05, 0.2, { aLf: 8 }, "sine.inOut");

  /* ---------- cảnh 3: phòng thuê đêm, chìa vào túi ---------- */
  var HX = R.vt.moc[0], HY = R.vt.moc[1];
  api.camera([[tC, 1480, 640, 1.55], [tSlid, 1490, 660, 1.75, "sine.inOut"], [tPocket, 1500, 690, 1.9, "sine.inOut"], [DUR, 1505, 700, 2.0, "sine.inOut"]], ["g3"]);
  var BX = 1500, BY = 862;
  W.set(0, { x: BX, y: BY, size: 1.0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 12, pupY: -14 });
  W.mouth(0, "flat"); W.autoBlink(tC + 0.3, DUR, 122);
  api.show("#W-cam", 0, 0); api.show("#W-camL", 0, 0); api.show("#W-key", 0, 0);
  // nhảy lên lấy chùm chìa trên móc
  var tJ = tC + 0.1;
  W.pose(tJ, 0.12, { sy: 0.9, sx: 1.08 }, "power2.in");
  W.pose(tJ + 0.12, 0.15, { sy: 1.06, sx: 0.95, aRu: -158, aRf: -4 }, "power2.out");
  api.key("#W", "y", tJ + 0.12, BY, "none"); api.key("#W", "y", tJ + 0.3, BY - 70, "power2.out"); api.key("#W", "y", tJ + 0.5, BY, "power2.in");
  api.show("#pt-chum", 0, 1); api.show("#pt-chum", tJ + 0.3, 0); api.show("#W-cam", tJ + 0.3, 1);
  W.pose(tJ + 0.5, 0.1, { sy: 0.92, sx: 1.06 }, "power2.out"); W.pose(tJ + 0.6, 0.2, { sy: 1, sx: 1, aRu: -60, aRf: -60, aLu: 40, aLf: 70, pupX: 0, pupY: 10 }, "back.out(1.6)");
  // chuyền chùm sang tay trái
  var tChuyen = tSlid - 0.14;
  api.show("#W-cam", tChuyen, 0); api.show("#W-camL", tChuyen, 1);
  // tay phải tuốt chìa Kiruna khỏi vòng đúng "slid"
  W.pose(tSlid - 0.15, 0.15, { aRu: -40, aRf: -80 }, "power2.out");
  api.show("#W-ccL-kir", 0, 1); api.show("#W-ccL-kir", tSlid, 0); api.show("#W-key", tSlid, 1);
  W.pose(tSlid + 0.02, 0.25, { aRu: -70, aRf: -100 }, "power2.out");
  api.sfx("ting", tSlid, 0.35);
  // nhìn nó một nhịp
  W.pose(tSlid + 0.3, 0.3, { pupX: 8, pupY: -6, eye: 1.08, lean: 4 }, "sine.inOut");
  W.pose(tKey + 0.6, 0.4, { pupX: 10, pupY: -4, lean: 6 }, "sine.inOut");
  // nhét vào túi phải đúng "pocket."
  W.pose(tPocket - 0.35, 0.3, { aRu: 9, aRf: 3, pupX: 6, pupY: 16, lean: 0, eye: 1 }, "power2.inOut");
  api.show("#W-key", tPocket - 0.02, 0); W.theTui(tPocket - 0.02, 1);
  api.sfx("pop", tPocket - 0.02, 0.25);
  // treo chùm chìa nhà lại móc (tay trái đưa chùm sang tay phải, tay phải treo)
  var tTreo = tPocket + 0.25;
  W.pose(tTreo, 0.2, { aLu: 30, aLf: 80, aRu: -40, aRf: -70 }, "power2.out");
  api.show("#W-camL", tTreo + 0.2, 0); api.show("#W-cam", tTreo + 0.2, 1); api.show("#W-cc-kir", 0, 1); api.show("#W-cc-kir", tTreo + 0.2, 0);
  W.pose(tTreo + 0.2, 0.12, { sy: 0.92, sx: 1.06, aLu: 18, aLf: -10 }, "power2.in");
  W.pose(tTreo + 0.32, 0.15, { sy: 1.06, sx: 0.95, aRu: -158, aRf: -4, pupX: 12, pupY: -14 }, "power2.out");
  api.key("#W", "y", tTreo + 0.32, BY, "none"); api.key("#W", "y", tTreo + 0.5, BY - 70, "power2.out"); api.key("#W", "y", tTreo + 0.7, BY, "power2.in");
  api.show("#W-cam", tTreo + 0.5, 0); api.show("#pt-chum", tTreo + 0.5, 1); api.show("#pt-cc-kir", 0, 1); api.show("#pt-cc-kir", tTreo + 0.5, 0);
  W.pose(tTreo + 0.7, 0.1, { sy: 0.93, sx: 1.05 }, "power2.out"); W.pose(tTreo + 0.8, 0.2, { sy: 1, sx: 1, aRu: 9, aRf: 3, pupX: 4, pupY: 16 }, "back.out(1.6)");
  // "Pockets are for maybes.": vỗ nhẹ hai cái lên túi như vỗ mèo ngủ, giữ hình
  var tV = Math.max(tPockets, tTreo + 1.05);
  [0, 0.42].forEach(function (d) { W.pose(tV + d, 0.15, { aRf: 34, aRu: 2 }, "sine.out"); W.pose(tV + d + 0.17, 0.18, { aRf: 3, aRu: 9 }, "sine.in"); });
  api.origin("#W-tuiCuc", "287 355");
  W.mouth(tV + 0.2, "smirk");
  W.pose(tV + 0.65, 0.3, { aRu: -22, aRf: 14 }, "sine.inOut");   // tay rời túi: thẻ gỗ thò ra nhìn rõ khi giữ hình
  W.pose(tV + 0.9, 0.5, { pupX: 0, pupY: 2 }, "sine.inOut");
  W.breathe(tV + 0.9, DUR, 2.2);
};
