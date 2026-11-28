/* d15 – Đường ngang: tàu quặng chạy qua (lời giải bắt đầu). Rào chắn hạ, Wob tay phải đút túi (thẻ gỗ thò ra);
   camera rút cao thấy đoàn tàu vắt ngang khung + thẻ "up to 68 wagons · ~750 m"; bảy sân bóng phủ tuyết dài bằng đoàn tàu;
   Wob đếm toa, cả quả địa cầu xoay theo tàu, lần hai ngồi phịch xuống tuyết, mắt xoáy.
   Cắt giấy, nhóm A. Chữ duy nhất: data.chu_tren_do_vat[0]. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, ND = window.NhietDoi, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var tRolled = T("rolled"), tTrain = T("train."), tUp = T("up", 4), t68 = T("sixty-eight"), tSeven = T("seven", 9), tCounting = T("counting"),
    tLost = T("lost"), tTwice = T("twice.");

  var RAY = 760, TS = 0.85, NTOA = 26, LTAU = (760 + NTOA * 248);
  /* ---------- nền: trời ngày, đồi xa, rừng thưa, đồng tuyết ---------- */
  var nen = '<rect x="-3000" y="-1200" width="11000" height="2000" fill="url(#xlTroiNgay)"/>';
  nen += paper(D.rough([[-3000, 640], [-2200, 470], [-1500, 560], [-700, 430], [100, 540], [800, 450], [1500, 560], [2300, 420], [3100, 540], [4000, 460], [5000, 580], [5000, 760], [-3000, 760]], 6, 15011, 40), "#B9C9D3", { stroke: true, sw: 4, shadow: false });
  nen += paper(D.rough([[-3000, 700], [-1800, 650], [-600, 690], [600, 640], [1800, 690], [3000, 645], [5000, 690], [5000, 780], [-3000, 780]], 5, 15012, 40), "#8FA6AE", { stroke: true, sw: 3.5, shadow: false });
  var rr = D.rng(15020);
  for (var k = 0; k < 60; k++) {
    var px = -2900 + k * 130 + rr() * 60, ph = 50 + rr() * 50;
    nen += paper("M " + px.toFixed(0) + " 712 L " + (px + 22).toFixed(0) + " " + (712 - ph).toFixed(0) + " L " + (px + 44).toFixed(0) + " 712 Z", "#4E6B5C", { stroke: true, sw: 3, shadow: false });
  }
  nen += paper("M -3000 720 L 9000 720 L 9000 2200 L -3000 2200 Z", "#F2F6F7", { stroke: true, sw: 4, shadow: false });
  nen += XL.duongRay(-3000, 9000, RAY);
  for (var q = 0; q < 14; q++) nen += line("M " + (-2800 + q * 560) + " " + (1180 + (q % 3) * 120) + " c 120 -18 240 -18 360 0", 4, "#C9D8DF");
  var cNen = api.lop("nen", nen, 1, { mat: 900 });

  /* ---------- đoàn tàu + bảy sân bóng (đi cùng tàu) ---------- */
  var san = '<g id="san">';
  var wSan = LTAU / 7;
  for (var i = 0; i < 7; i++) san += '<g id="san' + i + '" transform="translate(' + (-wSan * (i + 0.5)).toFixed(0) + ',0) scale(1,0.55)">' + XL.sanBongTuyet(wSan - 30, 380, 15100 + i) + "</g>";
  san += "</g>";
  var tau = '<g id="tauDi"><g transform="scale(' + TS + ')">' + XL.tauQuang(NTOA) + "</g></g>";
  var cSan = api.lop("san", '<g transform="translate(0,1170)"><g id="sanDi"><g transform="scale(' + TS + ')">' + san + "</g></g></g>", 1, { mat: 900 });
  var cTau = api.lop("tau", '<g transform="translate(0,' + RAY + ')">' + tau + "</g>", 1, { mat: 900 });

  /* ---------- rào chắn (tiền cảnh so với tàu) ---------- */
  var RX = 800, RY = 905;
  var rao = at(RX, RY, XL.raoChan(api, "rao", 660) + '<circle id="den0" cx="-14" cy="-210" r="12" fill="#FF8A6A" opacity="0"/><circle id="den1" cx="14" cy="-210" r="12" fill="#FF8A6A" opacity="0"/>');
  var cRao = api.lop("rao", paper(D.rEll(RX, RY + 4, 90, 16, 2, 15030), "#DCE6EA", { shadow: false }) + rao, 1, { mat: 900 });

  /* ---------- Wob ---------- */
  var W = XL.wob(api, "W", { the: 1 });
  var WX = 560, WY = 935;
  var gan = paper(D.rough([[-3000, 1010], [200, 990], [900, 1020], [1700, 995], [4000, 1015], [4000, 2200], [-3000, 2200]], 5, 15040, 30), "#F7FBFC", { stroke: true, sw: 4, shadow: false }) +
    paper(D.rEll(1500, 1030, 260, 60, 3, 15041), "#FFFFFF", { stroke: true, sw: 4 });
  var cWob = api.lop("wob", W.svg + gan, 1, { mat: 900 });

  /* ---------- thẻ chữ (không theo camera) ---------- */
  var the = '<g id="the68" transform="translate(960,190)">' + ND.theChu("", data.chu_tren_do_vat[0], 60, { seed: 15050 }) + "</g>";
  var cThe = api.lop("the", the, 1, {});

  api.dat(XL.defs() + cNen + cTau + cRao + cWob + cSan + cThe);
  api.noi({});

  /* camera: cỡ trung → rút cao toàn cảnh → về cỡ trung (take chậm) */
  var LOPS = ["nen", "tau", "rao", "wob", "san"];
  api.camera([[0, 900, 700, 1.32], [3.7, 860, 700, 1.38, "sine.inOut"], [tUp - 0.15, 860, 700, 1.38, "none"], [t68 + 0.75, 1000, 720, 0.47, "power2.inOut"],
    [tSeven - 0.2, 1000, 760, 0.46, "sine.inOut"], [tSeven + 0.9, 1000, 770, 0.45, "sine.inOut"], [tCounting - 0.55, 1000, 770, 0.45, "none"], [tCounting + 0.15, 700, 760, 1.5, "power3.inOut"],
    [tTwice, 690, 770, 1.55, "sine.inOut"], [DUR, 680, 790, 1.62, "sine.out"]], LOPS);

  /* rào chắn hạ xuống, đèn nháy luân phiên */
  api.key("#rao-tay", "rotation", 0, -80); api.key("#rao-tay", "rotation", 0.05, -80, "none"); api.key("#rao-tay", "rotation", 0.75, 0, "bounce.out");
  for (var b = 0, tb = 0.1; tb < DUR; tb += 0.42, b++) { api.show("#den0", tb, b % 2 ? 0 : 1); api.show("#den1", tb, b % 2 ? 1 : 0); }
  api.show("#den0", 0, 0); api.show("#den1", 0, 0);

  /* tàu: mũi ló từ trái đúng "rolled", chạy đều sang phải */
  var V = 380, X0 = 150;
  api.key("#tauDi", "x", 0, X0 - 260); api.key("#tauDi", "x", tRolled - 0.2, X0 - 260, "none"); api.key("#tauDi", "x", tRolled, X0, "power1.in");
  api.key("#tauDi", "x", DUR, X0 + V * (DUR - tRolled), "none");
  api.key("#sanDi", "x", 0, X0 + V * (tSeven - tRolled)); api.key("#sanDi", "x", tSeven, X0 + V * (tSeven - tRolled), "none"); api.key("#sanDi", "x", DUR, X0 + V * (DUR - tRolled), "none");
  api.sfx("may-no", tRolled - 0.1, 0.5);
  // toa rung nhẹ trên ray
  for (var r2 = 0, tr = tRolled; tr < DUR; tr += 0.12, r2++) api.key("#tauDi", "y", tr, r2 % 2 ? -2 : 0, "none");

  /* bảy sân bóng phủ tuyết dưới đoàn tàu, đúng "seven" */
  for (var s = 0; s < 7; s++) { api.pop("#san" + s, tSeven - 0.08 + s * 0.07, 0.3); }
  api.show("#san", 0, 1); api.fade("#san", tCounting - 0.6, 0.3, 0);

  /* thẻ 68 toa đúng "sixty-eight" */
  api.pop("#the68", t68 - 0.12, 0.3); api.fade("#the68", tCounting - 0.6, 0.3, 0);

  /* ---------- Wob ---------- */
  W.set(0, { x: WX, y: WY, size: 0.8, aLu: -6, aLf: -128, aRu: 9, aRf: 3 });
  W.idle(0, tTrain - 0.2, { seed: 15, bien: 2 });
  W.autoBlink(0, tLost - 0.2, 151);
  W.mouth(0, "flat");
  W.pose(0.4, 0.4, { pupX: -12, pupY: 2 }, "sine.inOut");
  W.pose(tRolled - 0.05, 0.25, { pupX: -16, pupY: 0, eye: 1.08 }, "power2.out");
  // đầu máy qua mặt: mắt dõi theo, gió tàu
  W.pose(2.4, 0.6, { pupX: 0, pupY: 2, eye: 1 }, "sine.inOut");
  W.pose(3.2, 0.5, { pupX: 14, pupY: 0 }, "sine.inOut");
  var tGio = tTrain - 0.05;
  W.pose(tGio - 0.1, 0.2, { lean: 6, sx: 0.97, sy: 1.02 }, "power2.out");
  W.mouth(tGio, "o");
  api.sfx("whoosh", tGio - 0.05, 0.5);
  for (var g = 0, tg = tGio; tg < tLost - 0.1; tg += 0.16, g++) {
    W.pose(tg, 0.16, { pom: g % 2 ? 62 : 80, hat: g % 2 ? 3 : 5 }, "sine.inOut");
    api.key("#W-pom", "x", tg + 0.16, g % 2 ? 34 : 42, "sine.inOut"); api.key("#W-pom", "y", tg + 0.16, g % 2 ? 22 : 26, "sine.inOut");
    api.key(W.xl.khanDuoi, "rotation", tg, g % 2 ? -58 : -72, "sine.inOut");
  }
  api.key("#W-pom", "x", 0, 0); api.key("#W-pom", "x", tGio, 0, "none"); api.key("#W-pom", "y", 0, 0); api.key("#W-pom", "y", tGio, 0, "none");
  api.key("#W-pom", "x", tLost - 0.1, 0, "power2.out"); api.key("#W-pom", "y", tLost - 0.1, 0, "power2.out");
  W.pose(tLost - 0.25, 0.15, { pom: 0, hat: 0 }, "power2.out"); api.key(W.xl.khanDuoi, "rotation", tLost - 0.1, 0, "back.out(2)");
  W.pose(tGio + 0.5, 0.4, { lean: 3, sx: 1, sy: 1 }, "sine.inOut");
  W.mouth(tGio + 0.6, "flat");
  W.breathe(tGio + 0.6, tCounting - 0.3, 2.4);
  W.pose(t68, 0.5, { pupX: 4, pupY: -10 }, "sine.inOut");
  W.pose(tSeven, 0.4, { pupX: 10, pupY: 8 }, "sine.inOut");

  /* đếm toa: rút tay khỏi túi, chỉ từng toa, mắt quay theo tàu */
  var tD = tCounting - 0.2, CHU = 248 * TS / V;   // một toa qua ≈ 0,55 s
  W.pose(tD, 0.25, { aRu: -62, aRf: -18, aLu: 18, aLf: -10, lean: 0 }, "power2.out");
  W.mouth(tD, "flat");
  for (var c = 0, tc = tD + 0.25; tc < tLost - 0.15; tc += CHU / 1.6, c++) {
    W.pose(tc, 0.08, { aRu: -70, pupX: -6 }, "power2.out");
    W.pose(tc + 0.08, CHU / 1.6 - 0.1, { aRu: -48, pupX: 14 }, "sine.in");
  }
  // "lost count.": cả quả địa cầu xoay theo tàu một vòng
  api.origin("#W-up", "200 195");
  api.key("#W-up", "rotation", 0, 0); api.key("#W-up", "rotation", tLost - 0.12, 0, "none"); api.key("#W-up", "rotation", tLost + 0.5, 360, "power2.inOut");
  W.pose(tLost - 0.12, 0.2, { aRu: -18, aRf: 10, pupX: 0, pupY: 0 }, "power2.out");
  W.pose(tLost + 0.5, 0.15, { lean: -8 }, "power2.out"); W.pose(tLost + 0.65, 0.2, { lean: 7 }, "sine.inOut"); W.pose(tLost + 0.85, 0.2, { lean: -3 }, "sine.inOut");
  W.mouth(tLost + 0.5, "wobbly");
  // "Twice.": chỉ lại, xoay hai vòng nhanh hơn, ngồi phịch xuống tuyết
  W.pose(tTwice - 0.3, 0.15, { aRu: -66, aRf: -16, lean: 0, pupX: 10 }, "power2.out");
  api.key("#W-up", "rotation", tTwice - 0.02, 360, "none"); api.key("#W-up", "rotation", tTwice + 0.42, 1080, "power1.in");
  var tNgoi = tTwice + 0.46;
  W.pose(tTwice + 0.1, 0.2, { aRu: -110, aLu: 110, aRf: 0, aLf: 0 }, "power2.out");
  W.pose(tNgoi - 0.04, 0.1, { upY: 70, legL: 78, legR: -78, sy: 0.9, sx: 1.08, aRu: -60, aLu: 60 }, "power2.in");
  W.pose(tNgoi + 0.06, 0.25, { sy: 1, sx: 1, aRu: -30, aLu: 30, aRf: 20, aLf: -20 }, "back.out(2)");
  W.choang(tNgoi, 1);
  W.mouth(tNgoi, "wobbly");
  W.blinkAt(DUR + 1);
  api.sfx("bonk", tNgoi, 0.6);
  // mắt xoáy lắc lư nhẹ khi giữ hình
  for (var w2 = 0, tw = tNgoi + 0.3; tw < DUR; tw += 0.3, w2++) W.pose(tw, 0.3, { lean: w2 % 2 ? 4 : -4 }, "sine.inOut");
};
