/* Đoạn d16 · cắt giấy · cận trang sổ du lịch với nhãn bản đồ map-napoleon (St Helena phía bắc, Tristan phía nam).
   Cắt cứng vào trang: chiếc mũ hai sừng phác (KHÔNG mặt, không người) rơi bộp xuống chấm đảo phía bắc đúng trước "Napoleon.".
   Nhãn St Helena, Tristan hiện; đúng "lonely" chiếc mũ khẽ xoay vành ngó xuống chấm Tristan, Wob (con rối giấy nhỏ đứng cạnh chấm Tristan)
   ngượng ngùng vẫy lại. "more than two thousand kilometres": Wob kéo căng sợi chỉ xanh từ chấm St Helena về tay mình, thẻ > 2,000 km bật giữa sợi chỉ.
   Vào "cat" (từ d15), ra "cat" (sang d17 vẽ tay). Chữ: St Helena, Tristan, > 2,000 km. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tNap = T("napoleon.", 0, 0.15), tAfter = T("after", 0, 1.29), tExil = T("exiled", 0, 3.11), tLon = T("lonely", 0, 5.61), tMore = T("more", 0, 6.75), tTwo = T("two", 0, 7.09), tTri = T("tristan.", 0, 8.81);

  var MX = 200, MY = 104, MW = 1520, MH = 855, k = MW / 1920;
  var SH = [MX + 1064.5 * k, MY + 137.6 * k], TR = [MX + 852 * k, MY + 913 * k];
  var s = at(40, 28, D.journalPage(1840, 1024, { seed: 1601 }));
  s += at(MX, MY, D.mapSticker("ban-do/map-napoleon.svg", MW, MH, { id: "map", seed: 1602 }));
  s += '<path d="M ' + SH[0].toFixed(1) + " " + SH[1].toFixed(1) + " C " + (SH[0] - 40).toFixed(1) + " " + (SH[1] + 220).toFixed(1) + " " + (TR[0] + 60).toFixed(1) + " " + (TR[1] - 260).toFixed(1) + " " + TR[0].toFixed(1) + " " + TR[1].toFixed(1) +
    '" fill="none" stroke="#FBF5E6" stroke-width="5" stroke-dasharray="16 14" opacity="0.75"/>';
  [SH, TR].forEach(function (P) { s += '<circle cx="' + (P[0] + 3).toFixed(1) + '" cy="' + (P[1] + 4).toFixed(1) + '" r="14" fill="#0b1214" opacity="0.25"/><circle cx="' + P[0].toFixed(1) + '" cy="' + P[1].toFixed(1) + '" r="14" fill="#E85D45" stroke="' + D.INK + '" stroke-width="5"/>'; });
  s += at(SH[0], SH[1], D.mapDot("dSH", { nhan: CH[0], ben: "phai", co: 50 }));
  s += at(TR[0], TR[1], D.mapDot("dTR", { nhan: CH[1], ben: "trai", co: 50 }));
  s += '<path id="chi" d="M 0 0" fill="none" stroke="#2F4A6B" stroke-width="6" stroke-linecap="round"/>';
  s += '<g id="mu"><g id="muIn">' + TD.muHaiSung(170) + "</g></g>";
  var W = TD.wob(api, "W", { muTrum: 0, holdL: '<g id="W-chi">' + TD.cuonChi(24) + "</g>" });
  s += W.svg;
  s += '<g id="tKm">' + TD.the("tKmi", CH[2], 56, { seed: 1603 }) + "</g>";

  api.dat(TD.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="#C9B48E"/>' + api.lop("trang", s, 1, { mat: 1000 }));
  api.noi({});
  api.camera([[0, 960, 540, 1.0], [tMore - 0.2, 960, 548, 1.03, "sine.inOut"], [DUR, 950, 560, 1.07, "sine.inOut"]]);

  // ---------- mũ rơi ----------
  var tCham = tNap - 0.05;
  api.origin("#mu", "0 0"); api.origin("#muIn", "0 0");
  api.key("#mu", "x", 0, SH[0], "step"); api.key("#mu", "y", 0, SH[1] - 210, "step");
  api.key("#mu", "y", tCham, SH[1] - 6, "power2.in");
  api.key("#muIn", "scaleY", 0, 1.1); api.key("#muIn", "scaleY", tCham, 1.1, "none"); api.key("#muIn", "scaleY", tCham + 0.06, 0.78, "power3.out"); api.key("#muIn", "scaleY", tCham + 0.3, 1, "back.out(3)");
  api.key("#muIn", "scaleX", 0, 0.92); api.key("#muIn", "scaleX", tCham, 0.92, "none"); api.key("#muIn", "scaleX", tCham + 0.06, 1.18, "power3.out"); api.key("#muIn", "scaleX", tCham + 0.3, 1, "back.out(3)");
  api.key("#muIn", "rotation", 0, -12); api.key("#muIn", "rotation", tCham, -2, "power2.in"); api.key("#muIn", "rotation", tCham + 0.3, 0, "back.out(2)");
  api.sfx("drop", tCham, 0.7);
  // xoay vành ngó xuống Tristan
  api.key("#muIn", "rotation", tLon - 0.2, 0, "none"); api.key("#muIn", "rotation", tLon + 0.25, -16, "power2.inOut");
  api.key("#muIn", "scaleX", tLon - 0.2, 1, "none"); api.key("#muIn", "scaleX", tLon + 0.25, 0.86, "power2.inOut");
  api.key("#mu", "x", tLon - 0.2, SH[0], "none"); api.key("#mu", "x", tLon + 0.25, SH[0] - 8, "power2.inOut");

  // ---------- nhãn ----------
  api.origin("#dSH", "0 0"); api.origin("#dTR", "0 0");
  api.pop("#dSH", tAfter + 0.05, 0.24); api.pop("#dTR", tAfter + 0.45, 0.24);
  api.sfx("pop", tAfter + 0.05, 0.4); api.sfx("pop", tAfter + 0.45, 0.35);

  // ---------- Wob cạnh chấm Tristan ----------
  var WX = TR[0] + 150, WY = TR[1] + 92, SZ = 0.42;
  W.set(0, { x: WX, y: WY, size: SZ, pupX: -6, pupY: -14 });
  W.soc(tNap + 0.08, { mieng: "o" });
  W.pose(tNap + 0.5, 0.3, { pupX: -2, pupY: -15 }, "power2.inOut");
  W.mouth(tAfter, "flat");
  W.idle(tAfter + 0.4, tLon - 0.3, { seed: 161, bien: 0.7, liec: false });
  W.pose(tExil, 0.3, { lean: -3, eye: 1.08 }, "power2.inOut"); W.pose(tExil + 1.2, 0.3, { lean: 0, eye: 1 }, "power2.inOut");
  // mũ ngó xuống -> Wob vẫy ngượng
  W.pose(tLon + 0.2, 0.25, { pupX: -2, pupY: -15, upRot: -5 }, "power2.out");
  W.vay(tLon + 0.35, 2, "R");
  W.mouth(tLon + 0.4, "wobbly");
  // kéo căng sợi chỉ: tay trái giơ về phía St Helena
  var tK = tMore + 0.05, tCang = tTwo + 0.35;
  W.pose(tK - 0.15, 0.25, { aLu: 152, aLf: -6, lean: 4, pupX: -6, pupY: -14 }, "power2.out");
  W.mouth(tK, "flat");
  W.pose(tCang - 0.1, 0.2, { lean: 10, sy: 0.96 }, "power2.out");
  W.pose(tCang + 0.15, 0.25, { lean: 8, sy: 1 }, "back.out(2)");
  W.mouth(tCang + 0.3, "smirk");
  W.blinkAt(tTri + 0.2);
  W.autoBlink(tAfter, tMore, 162);
  // đầu chỉ ở tay trái: vai (88,210), tay giơ 152° -> bàn tay ≈ (88 - 47, 210 - 88) trong khung rig 400×400 gốc chân (200, 392)
  var hx = function (t) { var l = api.K.at("#W", "x", t); return (l == null ? WX : l) + (88 - 0.47 * 100 - 200) * SZ; };
  var hy = WY + (210 - 0.88 * 100 - 392) * SZ;
  api.show("#chi", 0, 0); api.show("#chi", tK + 0.1, 1);
  api.moiKhung(function (t) {
    if (!api.dom) return;
    var n = document.getElementById("chi"); if (!n || t < tK + 0.1) return;
    var u = TD.ss((t - tK - 0.1) / (tCang - tK - 0.1)), x1 = hx(t), y1 = hy, sag = 220 * (1 - u);
    var mx = (SH[0] + x1) / 2 + sag * 0.4, my = (SH[1] + y1) / 2 + sag;
    n.setAttribute("d", "M " + SH[0].toFixed(1) + " " + SH[1].toFixed(1) + " Q " + mx.toFixed(1) + " " + my.toFixed(1) + " " + x1.toFixed(1) + " " + y1.toFixed(1));
  });
  // thẻ > 2,000 km giữa sợi chỉ
  api.origin("#tKm", "0 0");
  api.key("#tKm", "x", 0, (SH[0] + hx(0)) / 2 + 210, "step"); api.key("#tKm", "y", 0, (SH[1] + hy) / 2, "step"); api.key("#tKm", "rotation", 0, -4, "step");
  api.pop("#tKm", tCang, 0.26);
  api.sfx("ting", tCang, 0.55);
};
