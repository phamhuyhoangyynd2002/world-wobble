/* Đoạn d04 · cắt giấy · bãi chờ nhiều làn trước hầm, buổi sáng. Vào "giay", ra "chen" (cắt cứng).
   Chữ: 7:00, 23:00, 15 min (trên tờ lịch mở). Đèn đỏ tiền cảnh 1/3 trái; xe Wob lăn vào làn đầu; tờ lịch che kín kính. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var MAT = 900, X = 1000;
  var xe = WT.convertible("xe", { tuyet: 0.55 });
  var A = WT.wob(api, "A", {});
  var troi = WT.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#wtSang)"/>';
  var xa = WT.nuiXa(-900, 3400, 700, 7, "#8C9DA6", 360) + at(1500, 700, '<g transform="scale(0.32)">' + WT.tunnelPortal("hamxa", { seed: 805 }) + "</g>") +
    '<rect x="-900" y="640" width="4300" height="600" fill="#FFFFFF" opacity="0.25"/>';
  var mid = "";
  mid += D.paper(D.rough([[-900, 720], [3400, 716], [3400, 1700], [-900, 1700]], 3, 821, 30), "#E9EEF0", { shadow: false });
  // ba làn chờ: mặt đường xám, vạch kẻ
  [[740, 70], [820, 80], [905, 110]].forEach(function (l, i) {
    mid += '<rect x="-900" y="' + (l[0] - l[1] / 2) + '" width="4300" height="' + l[1] + '" fill="#6E7678" opacity="' + (0.55 + i * 0.12) + '"/>';
    mid += D.line("M -900 " + (l[0] + l[1] / 2) + " L 3400 " + (l[0] + l[1] / 2), 3, "#F6EEDC", ' stroke-dasharray="40 30" opacity="0.8"');
  });
  // hàng xe chờ ở làn sau
  var mau = ["#3F6A70", "#C89A62", "#5E7F8C", "#7A5236", "#9AA5A8", "#3F6A70", "#B98A22"];
  for (var i = 0; i < 6; i++) mid += at(1400 + i * 260 - (i % 2) * 40, 752, '<g transform="scale(0.5)">' + WT.carSmall(mau[i], 870 + i) + "</g>");
  for (var j = 0; j < 5; j++) mid += at(1250 + j * 330, 836, '<g transform="scale(0.68)">' + WT.carSmall(mau[(j + 3) % 7], 880 + j) + "</g>");
  mid += g("xeG", at(0, 924, xe.back) + A.svg + at(0, 924, xe.front));
  // tờ lịch mở (che kín kính chắn gió), hình xe/tàu và chữ trên tờ
  var tt = WT.timetableOpen("tto", 540, 340, { chu: [
    { id: "c7", x: -130, y: -40, chu: CH[0], co: 60 },
    { id: "c23", x: 130, y: -40, chu: CH[1], co: 60 },
    { id: "c15", x: 0, y: 140, chu: CH[2], co: 44 }] });
  tt += at(130, -60, g("kh", WT.khoanh("kh", 104, 46, 3)));
  tt += at(52, 68, g("icXe", WT.iconCar(WT.GACH))) + at(-118, 66, g("icTau", WT.iconTrain()));
  tt += g("but", '<g transform="rotate(30)">' + D.pencil(130) + "</g>");
  mid += at(X, 905, g("tt", tt));
  var gan = at(330, 1170, '<g transform="scale(1.3)">' + WT.signal3("den", { cao: 330 }) + "</g>") +
    D.paper(D.rough([[-500, 1090], [0, 1050], [600, 1070], [800, 1300], [-500, 1300]], 4, 829, 26), D.C.snow, { stroke: true, sw: 4 });
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 700 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1080 }));
  api.noi({ vaoDai: 0.5 });

  var r0 = T("fifteen-minute", 0, 12.31) + 0.5;
  var tRead = T("read", 0, 3.38), tWinter = T("winter", 0, 4.96), tSeven = T("seven", 0, 6.6), tEleven = T("eleven", 0, 8.8), tCars = T("cars", 0, 10.07);
  var tTurns = T("turns", 0, 11.36), t15 = T("fifteen-minute", 0, 12.31), tOne = T("one", 0, 13.84), tTime = T("time", 0, 14.75);

  api.camera([
    [0, 980, 650, 1.0], [2.6, 960, 680, 1.08, "sine.inOut"], [tRead + 0.4, 990, 760, 1.32, "power2.inOut"],
    [tWinter - 0.2, X, 880, 2.0, "power3.inOut"], [tCars, X, 885, 2.04, "sine.inOut"], [r0 + 0.4, X, 900, 1.75, "power2.inOut"], [DUR, X, 905, 1.8, "sine.inOut"]
  ]);
  // đèn đỏ: chỉ bóng đỏ trên cùng sáng
  api.show("#den-b0", 0, 1); api.show("#den-b1", 0, 0); api.show("#den-b2", 0, 0);

  // ---- xe lăn vào làn đầu ----
  api.origin("#xeG", "0 0");
  api.key("#xeG", "x", 0, -700); api.key("#xeG", "x", 0.25, -700, "none"); api.key("#xeG", "x", 2.5, X, "power2.out");
  api.key("#xeG", "rotation", 0, 0); api.key("#xeG", "rotation", 2.5, 0, "none"); api.key("#xeG", "rotation", 2.62, 1.2, "sine.out"); api.key("#xeG", "rotation", 2.85, 0, "sine.inOut");
  A.set(0, { x: 18, y: 884, size: 0.62, lashes: 1, ice: 0, aLu: 30, aLf: -50, aRu: -30, aRf: 50, pupX: -8, pupY: -4 });
  A.mouth(0, "smirk");
  A.idle(0.3, tRead - 0.2, { seed: 41, bien: 1.8 });
  A.pose(2.5, 0.12, { sy: 0.94 }, "power2.out"); A.pose(2.62, 0.25, { sy: 1 }, "back.out(2)");
  A.pose(1.2, 0.3, { pupX: -10, pupY: -8 }, "power2.out");     // nhìn đèn đỏ
  A.pose(2.9, 0.3, { pupX: 6, pupY: 4 }, "power2.out");         // nhìn xuống túi
  api.sfx("xuoc-dia", 2.45, 0.25);

  // ---- mở tờ lịch: to bằng cả kính chắn gió ----
  api.origin("#tt", "0 0");
  api.key("#tt", "scale", 0, 0.12); api.key("#tt", "scale", tRead - 0.05, 0.12, "none"); api.key("#tt", "scale", tRead + 0.4, 1, "back.out(1.7)");
  api.key("#tt", "y", 0, -140); api.key("#tt", "y", tRead - 0.05, -140, "none"); api.key("#tt", "y", tRead + 0.4, 0, "power2.out");
  api.show("#tt", 0, 0); api.show("#tt", tRead - 0.05, 1);
  api.sfx("whoosh", tRead - 0.05, 0.35);
  A.pose(tRead - 0.1, 0.3, { aLu: -150, aLf: 30, aRu: 150, aRf: -30, pupX: 0, pupY: 6 }, "power2.out");
  A.mouth(tRead + 0.3, "o");
  // chữ hiện đúng lời; bút chì khoanh 23:00 ba vòng
  ["#c7", "#c23", "#c15", "#icXe", "#icTau"].forEach(function (s) { api.origin(s, "0 0"); });
  api.key("#c7", "scale", 0, 0); api.key("#c7", "scale", tSeven - 0.05, 0, "none"); api.key("#c7", "scale", tSeven + 0.2, 1, "back.out(2.6)");
  api.key("#c23", "scale", 0, 0); api.key("#c23", "scale", tEleven - 0.05, 0, "none"); api.key("#c23", "scale", tEleven + 0.2, 1, "back.out(2.6)");
  api.sfx("ting", tSeven, 0.45); api.sfx("ting", tEleven, 0.5);
  A.pose(tSeven - 0.1, 0.2, { pupX: -10, pupY: 8 }, "power2.out"); A.pose(tEleven - 0.1, 0.2, { pupX: 10, pupY: 8 }, "power2.out");
  A.mouth(tEleven + 0.1, "flat");
  var k0 = tEleven + 0.3, k1 = tCars - 0.15;
  api.show("#but", 0, 0); api.show("#but", k0 - 0.1, 1); api.show("#but", k1 + 0.2, 0);
  api.moiKhung(function (t) {
    if (typeof document === "undefined") return;
    var p = document.getElementById("kh-p"), b = document.getElementById("but"); if (!p || !b) return;
    var L = p.getTotalLength() + 4, u = Math.max(0, Math.min(1, (t - k0) / (k1 - k0)));
    p.setAttribute("stroke-dasharray", L.toFixed(0)); p.setAttribute("stroke-dashoffset", (L * (1 - u)).toFixed(1));
    var a = -Math.PI * 0.6 + u * 3 * Math.PI * 2, kk = 1 + 0.18 * u;
    b.setAttribute("transform", "translate(" + (130 + Math.cos(a) * 104 * kk).toFixed(1) + "," + (-60 + Math.sin(a) * 46 * kk).toFixed(1) + ")");
  }, { twos: true });
  api.sfx("xuoc-dia", k0, 0.2); api.show("#kh", 0, 0); api.show("#kh", k0, 1);
  // hình xe, tàu, nhãn 15 min
  api.key("#icXe", "scale", 0, 0); api.key("#icXe", "scale", tCars, 0, "none"); api.key("#icXe", "scale", tCars + 0.22, 1, "back.out(2.6)");
  api.key("#icTau", "scale", 0, 0); api.key("#icTau", "scale", T("trains", 0, 10.56), 0, "none"); api.key("#icTau", "scale", T("trains", 0, 10.56) + 0.22, 1, "back.out(2.6)");
  api.key("#c15", "scale", 0, 0); api.key("#c15", "scale", t15 - 0.05, 0, "none"); api.key("#c15", "scale", t15 + 0.2, 1, "back.out(2.6)");
  api.sfx("pop", tCars, 0.4); api.sfx("pop", T("trains", 0, 10.56), 0.4); api.sfx("ting", t15, 0.35);
  A.pose(tCars, 0.2, { pupX: 6, pupY: 10 }, "power2.out"); A.pose(T("trains", 0, 10.56), 0.2, { pupX: -8, pupY: 10 }, "power2.out");
  A.idle(tRead + 0.5, DUR, { seed: 42, bien: 1.2 });
  // xoay tờ lịch như vô lăng; tàu húc xe; giật tay
  api.key("#tt", "rotation", 0, 0); api.key("#tt", "rotation", r0, 0, "none");
  api.key("#tt", "rotation", r0 + 0.45, -16, "sine.inOut"); api.key("#tt", "rotation", tOne - 0.05, 14, "sine.inOut");
  var tHuc = tOne + 0.15;
  api.key("#icTau", "x", 0, 0); api.key("#icTau", "x", tOne - 0.1, 0, "none"); api.key("#icTau", "x", tHuc, 62, "power2.in"); api.key("#icTau", "x", tHuc + 0.2, 40, "sine.out");
  api.key("#icXe", "x", 0, 0); api.key("#icXe", "x", tHuc, 0, "none"); api.key("#icXe", "x", tHuc + 0.12, 36, "power3.out"); api.key("#icXe", "rotation", 0, 0); api.key("#icXe", "rotation", tHuc, 0, "none"); api.key("#icXe", "rotation", tHuc + 0.12, 14, "power3.out");
  api.key("#tt", "rotation", tHuc, 14, "none"); api.key("#tt", "rotation", tHuc + 0.1, 2, "power3.out"); api.key("#tt", "rotation", tHuc + 0.35, 0, "sine.inOut");
  api.key("#tt", "y", r0, 0, "none"); api.key("#tt", "y", r0 + 0.4, 120, "power2.inOut"); api.key("#tt", "y", tHuc, 120, "none"); api.key("#tt", "y", tHuc + 0.08, 142, "power3.out"); api.key("#tt", "y", tHuc + 0.3, 134, "sine.inOut");
  api.sfx("bonk", tHuc, 0.55);
  A.pose(tHuc, 0.08, { eye: 1.25, sy: 0.92, pupX: 0, pupY: 2 }, "power3.out"); A.pose(tHuc + 0.3, 0.3, { eye: 1.08, sy: 1 }, "back.out(2)");
  A.mouth(tHuc + 0.05, "o");
  A.blinkAt(tHuc + 0.7);
};
