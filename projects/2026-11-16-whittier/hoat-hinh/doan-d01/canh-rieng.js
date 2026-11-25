/* Đoạn d01 · cắt giấy · hồi ức đêm tuyết trước cổng hầm. Vào "dau-video" (khung 0 đủ cảnh), ra "giay".
   Chữ duy nhất: 23:00 (trên tờ lịch mở). Cấu hình CỔNG (PH) dùng chung với d03. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, -99, k); return v == null ? du : v; };
  var MAT = 900;
  // ---- phông: vách núi + cổng hầm (x 1000), đèn (600), thanh chắn (trục 760), xe (1650) ----
  var portal = WT.tunnelPortal("ham", { seed: 801 });
  var xe = WT.convertible("xe", { tuyet: 0.9 });
  var W = WT.wob(api, "W", { tuyetDau: true, holdR: g("W-fold", '<g transform="translate(0,-58) rotate(-8)">' + WT.timetableFold() + "</g>") });
  var S = WT.wob(api, "S", { tuyetDau: true });

  var troi = WT.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#skyNight)"/>';
  var xa = WT.nuiXa(-900, 3400, 760, 3, "#3E5068", 420) + '<rect x="-900" y="700" width="4300" height="600" fill="#2B3E5C" opacity="0.35"/>';
  var mid = "";
  mid += at(1000, MAT, portal);
  mid += D.paper(D.rough([[-800, MAT - 4], [3400, MAT - 6], [3400, 1700], [-800, 1700]], 3, 811, 30), "#E6EEF2", { shadow: false });
  mid += '<path d="M 770 ' + MAT + ' L 1230 ' + MAT + ' L 1500 1300 L 500 1300 Z" fill="#5E6668" opacity="0.9"/>';
  mid += D.line("M 940 " + MAT + " L 860 1300 M 1060 " + MAT + " L 1140 1300", 7, "#C9CCC8");
  mid += D.paper(D.rough([[480, 1300], [700, 960], [770, MAT], [520, 920], [200, 1000]], 3, 812, 24), "#F2F6F7", { shadow: false });
  mid += at(600, MAT + 4, WT.signal3("den"));
  // xe (sau) + Wob ngủ + chăn lịch + hành khách tuyết + xe (trước)
  mid += at(1650, 924, xe.back);
  mid += S.svg;
  mid += at(1668, 858, g("chan", '<g transform="rotate(-6)">' + WT.timetableOpen("ttb", 210, 120) + "</g>"));
  mid += at(1800, 790, WT.snowPassenger("hk"));
  mid += at(1650, 924, xe.front);
  // Wob đứng + tờ lịch mở + thanh chắn (trước mặt Wob)
  mid += W.svg;
  mid += at(1318, 800, g("tt", WT.timetableOpen("tto", 270, 190, { chu: [{ id: "tt-c", x: 0, y: 30, chu: data.chu_tren_do_vat[0], co: 62 }] }) +
    at(0, 8, g("kh", WT.khoanh("kh", 96, 50, 1.2)))));
  mid += at(760, 818, WT.barrier("chan2", 395));
  var gan = D.paper(D.rough([[-400, 1080], [-200, 1010], [200, 990], [520, 1030], [700, 1090], [700, 1300], [-400, 1300]], 4, 813, 26), C_SNOW(), { stroke: true, sw: 4 }) +
    D.paper(D.rough([[1700, 1100], [1900, 1000], [2300, 980], [2600, 1040], [2700, 1300], [1700, 1300]], 4, 814, 26), C_SNOW(), { stroke: true, sw: 4 });
  function C_SNOW() { return D.C.snow; }
  var roi = WT.tuyetRoi(api, "snowfx", { n: 60, toc: 70, seed: 991, r: 5 });
  var roiGan = WT.tuyetRoi(api, "snowfx2", { n: 14, toc: 160, seed: 992, r: 11 });
  var CH = data.chu_tren_do_vat, hc = "";
  hc += D.paper(D.rRect(96, 54, 600, 290, 2, 1091), "#3F6A70", { stroke: true, sw: 5, sx: 8, sy: 10 });
  hc += D.paper(D.rRect(112, 70, 568, 258, 1.5, 1092), "#F4ECD8", { stroke: true, sw: 3, shadow: false });
  hc += D.txt(132, 128, CH[1], 56, { anchor: "start", w: 900 });
  hc += '<circle cx="146" cy="168" r="7" fill="' + D.INK + '"/>' + D.txt(166, 186, CH[2], 48, { anchor: "start", w: 900 });
  hc += D.txt(132, 262, CH[3], 42, { anchor: "start", w: 700, fill: "#3F6A70" });
  hc += '<rect x="500" y="100" width="150" height="110" rx="8" fill="none" stroke="#C9463A" stroke-width="5" stroke-dasharray="14 9"/>';
  hc += D.line("M 132 300 L 640 300", 3, "#9DB0B8");
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1060 }) + roi + roiGan + g("hc", hc));
  api.noi({});

  // ---- mốc lời ----
  var tClosed = T("closed", 0, 3.24), tRoad2 = T("road", 1, 4.2), tTun1 = T("tunnel", 0, 4.72), tTun2 = T("tunnel", 1, 5.54), tGone = T("gone", 0, 5.94), tBed = T("bed", 0, 6.24);
  var tHold = T("holding", 0, 7.16), tNot = T("not", 0, 8.76), tSo = T("so", 0, 14.728), tHi = T("hi", 0, 9.72), tWob = T("wob", 0, 10.1), tStays = T("stays", 0, 12.56), tCar = T("car", 0, 11.74), tRoof = T("roof", 0, 12.68), tFig = T("figured", 0, 14.28), tYet = T("yet", 0, 15.18);
  var tCut = tSo - 0.06;

  // ---- camera ----
  api.camera([
    [0, 1180, 640, 1.0], [3.7, 1120, 650, 1.06, "sine.inOut"],
    [tRoad2 - 0.1, 880, 620, 1.42, "power3.inOut"], [tBed + 0.2, 900, 630, 1.48, "sine.inOut"],
    [tHold - 0.1, 1170, 735, 1.72, "power3.inOut"], [tHi - 0.3, 1170, 735, 1.74, "sine.inOut"], [tHi + 0.6, 1180, 720, 1.5, "power2.inOut"], [tCut - 0.04, 1190, 715, 1.56, "sine.inOut"],
    [tCut, 1720, 735, 1.5, "none"], [DUR, 1715, 730, 1.6, "sine.inOut"]
  ]);

  // ---- tuyết rơi: lớp xa tối dần, bông tuyết lớn mờ hơn ----
  api.set("#snowfx2", 0, { opacity: 0.75 });

  // ---- đèn tín hiệu: sáng sẵn, tắt lần lượt ----
  ["#den-b0", "#den-b1", "#den-b2"].forEach(function (s) { api.show(s, 0, 1); });
  api.key("#den-b0", "opacity", tTun1, 1, "none"); api.key("#den-b0", "opacity", tTun1 + 0.12, 0, "power2.in");
  api.key("#den-b1", "opacity", tTun2, 1, "none"); api.key("#den-b1", "opacity", tTun2 + 0.12, 0, "power2.in");
  api.key("#den-b2", "opacity", tGone + 0.1, 1, "none"); api.key("#den-b2", "opacity", tGone + 0.22, 0, "power2.in");

  // ---- thanh chắn: dựng đứng → hạ đúng "bed", nảy ----
  api.origin("#chan2-arm", "0 0");
  api.key("#chan2-arm", "rotation", 0, -86); api.key("#chan2-arm", "rotation", tGone - 0.05, -86, "none");
  api.key("#chan2-arm", "rotation", tBed, 2, "power3.in"); api.key("#chan2-arm", "rotation", tBed + 0.12, -4, "sine.out"); api.key("#chan2-arm", "rotation", tBed + 0.3, 0, "sine.inOut");
  api.sfx("bonk", tBed, 0.7);
  api.shake(tBed, 6, 5);

  // ---- Wob đứng trước cổng ----
  W.set(0, { x: 1060, y: 922, size: 0.7, aLu: 18, aLf: -10, aRu: -150, aRf: 20, lashes: 1, ice: 0, pupX: 0, pupY: 2, op: 1 });
  W.mouth(0, "grin");
  api.origin("#W-fold", "0 0");
  // giơ tờ lịch, lắc khoe, liếc về cổng hầm
  W.pose(0.5, 0.25, { aRu: -160, aRf: 30 }, "sine.inOut"); W.pose(0.75, 0.25, { aRu: -145, aRf: 10 }, "sine.inOut");
  W.pose(1.0, 0.25, { aRu: -160, aRf: 30 }, "sine.inOut"); W.pose(1.25, 0.3, { aRu: -150, aRf: 20 }, "sine.inOut");
  W.pose(1.7, 0.3, { pupX: -9, pupY: 0 }, "power2.out");
  W.mouth(1.9, "smirk");
  W.idle(0.3, tClosed, { seed: 11, bien: 2.2 });
  W.soc(tClosed + 0.05, { mieng: "o" });
  W.pose(tClosed + 0.4, 0.3, { pupX: 0, pupY: 3, aRu: -60, aRf: -20 }, "power2.inOut");
  W.mouth(tClosed + 0.5, "flat");
  // nhìn đèn tắt
  W.pose(tTun1 - 0.2, 0.25, { pupX: -10, pupY: -8 }, "power2.out");
  W.pose(tTun2 - 0.1, 0.2, { pupX: -8, pupY: -6 }, "power2.out");
  W.idle(tClosed + 0.8, tBed - 0.1, { seed: 12, bien: 1.6 });
  // thanh chắn sát mũi: chớp mắt, giật lùi nhẹ
  W.pose(tBed - 0.04, 0.08, { lean: -3, pupX: -2, pupY: 6 }, "power2.out");
  W.blinkAt(tBed + 0.12); W.blinkAt(tBed + 0.5);
  W.mouth(tBed + 0.05, "o"); W.mouth(tBed + 0.5, "flat");
  W.pose(tBed + 0.3, 0.3, { lean: 0 }, "sine.inOut");
  // mở tờ lịch, nhìn thẳng người xem, giữ; chóp tuyết mọc
  api.show("#W-fold", 0, 1); api.show("#W-fold", tHold - 0.05, 0);
  W.pose(tHold - 0.25, 0.3, { aRu: -70, aRf: -40, aLu: -10, aLf: -20 }, "power2.out");
  api.origin("#tt", "-120 0");
  api.key("#tt", "scaleX", 0, 0.05); api.key("#tt", "scaleX", tHold - 0.1, 0.05, "none"); api.key("#tt", "scaleX", tHold + 0.25, 1, "back.out(1.8)");
  api.show("#tt", 0, 0); api.show("#tt", tHold - 0.1, 1);
  api.sfx("whoosh", tHold - 0.1, 0.3);
  // khoanh đỏ 23:00 tự vẽ
  api.moiKhung(function (t) {
    if (typeof document === "undefined") return;
    var p = document.getElementById("kh-p"); if (!p) return;
    var L = 1200, u = Math.max(0, Math.min(1, (t - (tHold + 0.4)) / 0.6));
    p.setAttribute("stroke-dasharray", L); p.setAttribute("stroke-dashoffset", String(L * (1 - u)));
  });
  W.pose(tHold + 0.5, 0.25, { pupX: 10, pupY: 4 }, "power2.out");
  W.pose(T("timetable", 0, 7.54) + 0.4, 0.25, { pupX: 0, pupY: 2 }, "power2.out");    // nhìn người xem
  W.mouth(tNot - 0.2, "flat");
  W.set(0, { snow: 0 });
  api.origin("#W-snow", "200 60");
  W.pose(T("timetable", 0, 7.54) + 0.2, 0.3, { snow: 1 }, "power2.out");
  api.key("#W-snow", "scaleY", 0, 0.3); api.key("#W-snow", "scaleX", 0, 0.6);
  api.key("#W-snow", "scaleY", T("timetable", 0, 7.54) + 0.2, 0.3, "none"); api.key("#W-snow", "scaleX", T("timetable", 0, 7.54) + 0.2, 0.6, "none");
  api.key("#W-snow", "scaleY", tSo - 0.4, 2.0, "power1.in"); api.key("#W-snow", "scaleX", tSo - 0.4, 0.95, "power1.in");
  W.idle(tHold + 0.3, tCut, { seed: 13, bien: 1.2 });
  // ---- lời chào nhận diện: gấp tờ lịch, vẫy tay với người xem; thẻ hộ chiếu lật vào góc trái trên ----
  api.key("#tt", "scaleX", tHi - 0.35, 1, "none"); api.key("#tt", "scaleX", tHi - 0.05, 0.05, "power2.in");
  api.show("#tt", tHi - 0.05, 0);
  W.pose(tHi - 0.3, 0.3, { aRu: -18, aRf: 10, aLu: 18, aLf: -10, pupX: 0, pupY: 3 }, "power2.inOut");
  W.mouth(tHi, "grin");
  W.walk(tHi - 0.05, tHi + 0.75, 1060, 1265, { step: 0.26, tieng: true });
  W.vay(tHi + 0.8, 6, "R");
  W.pose(tWob + 0.1, 0.12, { sy: 1.05 }, "power2.out"); W.pose(tWob + 0.25, 0.25, { sy: 1 }, "back.out(2)");
  W.blinkAt(11.4);
  W.pose(T("why", 0, 12.16), 0.25, { pupX: 8, pupY: -6 }, "power2.out");
  W.nhunVai(tStays + 0.1, 0.4);
  W.pose(tStays + 0.9, 0.25, { pupX: 0, pupY: 3 }, "power2.out");
  W.mouth(13.4, "wobbly");
  W.shiver(13.4, 14.1, 1.6, 14);
  api.origin("#hc", "96 54");
  api.key("#hc", "scaleY", 0, 0); api.key("#hc", "scaleY", tHi - 0.05, 0, "none"); api.key("#hc", "scaleY", tHi + 0.3, 1, "back.out(1.6)");
  api.key("#hc", "scaleY", tSo - 0.32, 1, "none"); api.key("#hc", "scaleY", tSo - 0.02, 0, "power2.in");
  api.sfx("whoosh", tHi - 0.05, 0.35); api.sfx("whoosh", tSo - 0.32, 0.3);
  api.show("#W", 0, 1); api.show("#W", tCut, 0);
  api.show("#tt", tCut, 0);

  // ---- ngủ trong xe mở mui ----
  api.show("#S", 0, 0); api.show("#S", tCut, 1);
  api.show("#chan", 0, 0); api.show("#chan", tCut, 1);
  S.set(0, { x: 1668, y: 884, size: 0.62, lid: 62, lashes: 1, ice: 0, aLu: 30, aLf: -60, aRu: -30, aRf: 60, snow: 1, lean: -6 });
  S.mouth(0, "flat");
  S.breathe(tCut, DUR, 2.2);
  S.idle(tCut, DUR, { seed: 21, bien: 1.2 });
  S.shiver(tCut + 1.2, tCut + 1.9, 2.2, 16);
  api.sfx("brr", tCut + 1.2, 0.55);
  S.mouth(tCut + 1.2, "chatter"); S.mouth(tCut + 2.0, "flat");
  // mí hé ra nhìn hành khách tuyết rồi nhắm lại
  S.pose(tFig, 0.2, { lid: 24, pupX: 12 }, "power2.out");
  S.pose(tYet + 0.1, 0.25, { lid: 62 }, "power2.in");
  api.origin("#hk-than", "0 0"); api.origin("#hk-dau", "0 -160");
  api.key("#hk-than", "scaleY", 0, 0.12); api.key("#hk-than", "scaleY", tCut + 0.3, 0.12, "none"); api.key("#hk-than", "scaleY", tFig - 0.3, 1, "power1.inOut");
  api.key("#hk-than", "scaleX", 0, 1);
  api.pop("#hk-dau", tFig - 0.25, 0.3);
  api.sfx("pop", tFig - 0.2, 0.35);
  api.origin("#hk", "0 0");
  api.key("#hk", "rotation", 0, 0); api.key("#hk", "rotation", tYet - 0.1, 0, "none"); api.key("#hk", "rotation", tYet + 0.2, -9, "sine.inOut");   // "hành khách" nghiêng tựa vai Wob
};
