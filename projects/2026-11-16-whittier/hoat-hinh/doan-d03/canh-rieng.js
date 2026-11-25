/* Đoạn d03 · cắt giấy · hồi ức rạng sáng, vẫn trong xe mở mui trước cổng hầm (cùng cấu hình cổng với d01). Vào "cat", ra "giay".
   Không chữ. Trang phục như d01; tờ lịch đã nhét túi (không hiện); vali nhỏ đặt lên ghế phụ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var MAT = 900;
  var portal = WT.tunnelPortal("ham", { seed: 801 });
  var xe = WT.convertible("xe", { tuyet: 1 });
  var A = WT.wob(api, "A", { tuyetDau: true, holdR: g("A-vali", '<g transform="translate(0,26) rotate(180) scale(0.9)">' + WT.suitcase() + "</g>") });

  var troi = WT.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#wtRang)"/>';
  var xa = WT.nuiXa(-900, 3400, 760, 3, "#7C93AE", 420) + '<rect x="-900" y="700" width="4300" height="600" fill="#C9D6E2" opacity="0.3"/>';
  var mid = "";
  mid += at(1000, MAT, portal);
  mid += D.paper(D.rough([[-800, MAT - 4], [3400, MAT - 6], [3400, 1700], [-800, 1700]], 3, 811, 30), "#EEF3F5", { shadow: false });
  mid += '<path d="M 770 ' + MAT + ' L 1230 ' + MAT + ' L 1500 1300 L 500 1300 Z" fill="#6E7678" opacity="0.9"/>';
  mid += D.line("M 940 " + MAT + " L 860 1300 M 1060 " + MAT + " L 1140 1300", 7, "#C9CCC8");
  mid += at(600, MAT + 4, WT.signal3("den"));
  mid += at(760, 818, WT.barrier("chan2", 395));
  mid += at(1650, 924, xe.back);
  mid += A.svg;
  mid += at(1800, 790, WT.snowPassenger("hk"));
  mid += at(1792, 772, g("vali2", WT.suitcase()));
  mid += at(1650, 924, xe.front);
  // dấu hỏi giấy
  mid += at(1610, 600, g("q1", WT.qmark(46)));
  mid += at(1700, 560, g("q2", WT.qmark(80, "#F3D9A0")));
  // mảng tuyết trên vách (trượt xuống)
  mid += g("tm", at(1660, 640, D.paper(D.rough([[-70, 0], [-50, -40], [0, -54], [56, -36], [72, 0]], 3, 831, 12), D.C.snow, { stroke: true, sw: 4, fringe: D.C.ice })));
  var gan = D.paper(D.rough([[1700, 1100], [1900, 1000], [2300, 980], [2600, 1040], [2700, 1300], [1700, 1300]], 4, 814, 26), D.C.snow, { stroke: true, sw: 4 });
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1060 }));
  api.noi({});

  var tMove = T("move", 0, 0.71), tBy = T("by", 0, 1.55), tWhy1 = T("why", 0, 3.11), tWhy2 = T("why", 1, 6.39), tSame = T("same", 0, 8.17);
  var tBefore = T("before", 0, 8.69), tBoth = T("both", 0, 11.11), tMore = T("more", 0, 14.03), tOnce = T("once", 0, 14.43);

  api.camera([
    [0, 1700, 720, 1.5], [tBy, 1700, 720, 1.5, "sine.inOut"],
    [tWhy1 - 0.3, 1690, 640, 1.42, "power2.inOut"], [tBefore, 1695, 650, 1.46, "sine.inOut"],
    [tMore - 1.2, 1700, 600, 1.4, "sine.inOut"], [DUR, 1700, 640, 1.52, "sine.inOut"]
  ]);
  ["#den-b0", "#den-b1", "#den-b2"].forEach(function (s) { api.show(s, 0, 0); });
  api.origin("#chan2-arm", "0 0"); api.set("#chan2-arm", 0, { rotation: 0 });

  // ---- Wob tỉnh dậy, giơ vali ----
  A.set(0, { x: 1668, y: 884, size: 0.62, lashes: 1, ice: 0, snow: 1, aLu: 30, aLf: -50, aRu: -170, aRf: 0, pupX: 0, pupY: 2 });
  api.origin("#A-snow", "200 60"); api.set("#A-snow", 0, { scaleY: 1.6, scaleX: 0.95 });
  A.mouth(0, "grin");
  A.pose(0.1, 0.18, { y: 864, sy: 1.06 }, "back.out(2)");
  A.pose(0.35, 0.25, { y: 884, sy: 1 }, "sine.inOut");
  A.pose(0.12, 0.2, { aLu: 170, aLf: 10 }, "back.out(2)");
  api.sfx("boing", 0.12, 0.6);
  // lắc vali hào hứng
  A.pose(0.55, 0.18, { aRu: -158, aLu: 158 }, "sine.inOut"); A.pose(0.75, 0.18, { aRu: -172, aLu: 172 }, "sine.inOut");
  A.pose(0.95, 0.18, { aRu: -158, aLu: 158 }, "sine.inOut"); A.pose(1.15, 0.2, { aRu: -170, aLu: 170 }, "sine.inOut");
  // đặt vali lên đùi "hành khách" tuyết
  A.pose(1.45, 0.35, { aRu: -110, aRf: -40, aLu: 40, aLf: -40, pupX: 10 }, "power2.inOut");
  api.show("#A-vali", 0, 1); api.show("#A-vali", 1.8, 0);
  api.show("#vali2", 0, 0); api.show("#vali2", 1.8, 1);
  api.origin("#vali2", "0 0");
  api.key("#vali2", "y", 0, -30); api.key("#vali2", "y", 1.8, -30, "none"); api.key("#vali2", "y", 1.98, 0, "bounce.out");
  api.sfx("bonk", 1.95, 0.35);
  A.pose(1.95, 0.3, { aRu: -18, aRf: 10, aLu: 18, aLf: -10, pupX: 0, pupY: 3 }, "power2.out");
  A.mouth(2.0, "smirk");
  A.idle(2.0, tWhy1, { seed: 31, bien: 1.6 });
  // dấu hỏi 1, dấu hỏi 2 đè bẹp dấu 1
  api.origin("#q1", "0 0"); api.origin("#q2", "0 0");
  api.key("#q1", "scaleX", tWhy1, 0, "none"); api.key("#q1", "scaleY", tWhy1, 0, "none"); api.key("#q1", "scaleX", tWhy1 + 0.28, 1, "back.out(2.6)"); api.key("#q1", "scaleY", tWhy1 + 0.28, 1, "back.out(2.6)");
  api.sfx("pop", tWhy1, 0.5);
  A.pose(tWhy1 - 0.1, 0.25, { pupY: -8, pupX: -4 }, "power2.out");
  A.mouth(tWhy1, "o"); A.mouth(tWhy1 + 0.6, "flat");
  api.key("#q1", "rotation", 0, 0); api.key("#q1", "rotation", tWhy1 + 0.3, -6, "sine.inOut"); api.key("#q1", "rotation", tWhy1 + 1.2, 6, "sine.inOut"); api.key("#q1", "rotation", tWhy2, 0, "sine.inOut");
  api.key("#q2", "scale", 0, 0); api.key("#q2", "scale", tWhy2 - 0.05, 0, "none"); api.key("#q2", "scale", tWhy2 + 0.2, 1, "back.out(2)");
  api.key("#q2", "y", 0, -260); api.key("#q2", "y", tWhy2 + 0.1, -260, "none"); api.key("#q2", "y", tWhy2 + 0.4, 0, "power3.in"); api.key("#q2", "y", tWhy2 + 0.55, -12, "sine.out"); api.key("#q2", "y", tWhy2 + 0.7, 0, "sine.in");
  api.key("#q2", "x", 0, 0); api.key("#q2", "x", tWhy2 + 0.1, 0, "none"); api.key("#q2", "x", tWhy2 + 0.4, -60, "power2.in");
  api.key("#q1", "scaleY", 0, 0); api.key("#q1", "scaleY", tWhy2 + 0.38, 1, "none"); api.key("#q1", "scaleY", tWhy2 + 0.46, 0.25, "power3.out");
  api.key("#q1", "scaleX", 0, 0); api.key("#q1", "scaleX", tWhy2 + 0.38, 1, "none"); api.key("#q1", "scaleX", tWhy2 + 0.46, 1.35, "power3.out");
  api.sfx("pop", tWhy2 + 0.05, 0.6);
  api.sfx("bonk", tWhy2 + 0.4, 0.45);
  A.pose(tWhy2 + 0.38, 0.12, { sy: 0.92, eye: 1.2 }, "power2.out"); A.pose(tWhy2 + 0.6, 0.3, { sy: 1, eye: 1 }, "back.out(2)");
  A.pose(tWhy2 + 0.4, 0.2, { pupY: -10, pupX: 0 }, "power2.out");
  A.mouth(tWhy2 + 0.4, "wobbly");
  A.idle(tWhy2 + 0.6, tBefore, { seed: 32, bien: 1.4 });
  // dấu hỏi tan khi Wob tự tin
  api.key("#q1", "opacity", 0, 1); api.key("#q1", "opacity", tBefore + 0.3, 1, "none"); api.key("#q1", "opacity", tBefore + 0.7, 0, "power2.in");
  api.key("#q2", "opacity", 0, 1); api.key("#q2", "opacity", tBefore + 0.3, 1, "none"); api.key("#q2", "opacity", tBefore + 0.7, 0, "power2.in");
  // gật đầu tự tin (nhún thân trên)
  A.mouth(tBefore, "grin");
  A.pose(tBefore, 0.25, { pupX: 0, pupY: 3, lid: 18, aRu: -100, aRf: -70 }, "power2.out");   // tay phải gõ ngực
  A.pose(tBoth, 0.25, { aRu: -18, aRf: 10 }, "power2.inOut");
  var nod = function (t0, t1) { for (var t = t0, k = 0; t < t1; t += 0.32, k++) A.pose(t, 0.16, { upY: k % 2 ? 0 : 10, upRot: k % 2 ? 0 : 3 }, "sine.inOut"); A.pose(t1, 0.2, { upY: 0, upRot: 0 }, "sine.out"); };
  nod(tBefore + 0.2, tBoth);
  nod(tBoth + 1.2, DUR - 0.5);
  A.idle(tBoth, DUR, { seed: 33, bien: 1.2 });
  // mảng tuyết trượt từ vách xuống đúng đầu Wob ở "more"
  api.origin("#tm", "0 0");
  api.key("#tm", "x", 0, 260); api.key("#tm", "y", 0, -420);
  api.key("#tm", "x", tMore - 1.4, 260, "none"); api.key("#tm", "y", tMore - 1.4, -420, "none");
  api.key("#tm", "x", tMore - 0.5, 90, "power1.in"); api.key("#tm", "y", tMore - 0.5, -300, "power1.in");
  api.key("#tm", "x", tMore, 0, "none"); api.key("#tm", "y", tMore, 0, "power2.in");
  api.key("#tm", "rotation", 0, -20); api.key("#tm", "rotation", tMore - 0.5, -20, "none"); api.key("#tm", "rotation", tMore, 0, "power2.in");
  api.show("#tm", 0, 1); api.show("#tm", tMore + 0.02, 0);
  api.key("#A-snow", "scaleY", tMore, 1.6, "none"); api.key("#A-snow", "scaleY", tMore + 0.06, 2.6, "power3.out");
  api.key("#A-snow", "scaleX", tMore, 0.95, "none"); api.key("#A-snow", "scaleX", tMore + 0.06, 1.35, "power3.out");
  api.sfx("drop", tMore, 0.65);
  A.pose(tMore, 0.06, { sy: 0.88 }, "power3.out"); A.pose(tMore + 0.1, 0.3, { sy: 1 }, "back.out(2)");
  A.mouth(tMore + 0.08, "smirk");
  A.pose(tMore + 0.1, 0.1, { lid: 30 }, "power2.out");
};
