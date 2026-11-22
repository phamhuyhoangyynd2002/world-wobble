/* Đoạn d14 · cắt giấy · hồi ức · trang sổ bản đồ (thẻ trang-so-ban-do). Vào "cat", ra "cat".
   Lời: "Far to the northwest, the town of Verkhoyansk has its own reading from eighteen ninety-two, of about the same number.
   Some sources say the two towns share the record. Others treat the Verkhoyansk reading as disputed. I measured the distance
   on my map with my fingers. I decided Verkhoyansk could keep its half. Then it got complicated. The weather station behind
   that famous number isn't in Oymyakon itself. It sits in a valley between Oymyakon and a neighbouring village called Tomtor,
   near Tomtor's airfield. The station and the airfield both date from the Soviet era."
   Bản đồ: map-yakutia, map-tomtor (assets/manifest.json, vẽ bằng code; chép + cắt khung bằng cong-cu/chep_ban_do.py, đã bỏ
   mọi chấm vẽ sẵn). Chỉ đặt chấm Oymyakon, Verkhoyansk, Tomtor: ẨN Yakutsk (và mọi mốc khác không có trong lời).
   Chữ: "Oymyakon", "Verkhoyansk", "1892", "Tomtor" (+ dấu "?"). Trang phục: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var CH = data.chu_tren_do_vat;   // Oymyakon, Verkhoyansk, 1892, Tomtor
  var T = function (w, du, k) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };

  var tFar = T("Far", 0.15), tVer = T("Verkhoyansk", 2.02, 0), t1892 = T("eighteen", 4.7), tSome = T("Some", 7.7), tShare = T("share", 9.31),
    tOthers = T("Others", 10.41), tDisp = T("disputed.", 13.22), tMeas = T("measured", 14.25), tFing = T("fingers.", 15.92),
    tDec = T("decided", 17.03), tHalf = T("half.", 19.32), tThen = T("Then", 21.41), tCompl = T("complicated.", 21.76),
    tStat = T("station", 23.23, 0), tIsnt = T("isn't", 25.06), tSits = T("sits", 27.5), tBetw = T("between", 28.29),
    tTom = T("Tomtor,", 31.15), tAir = T("airfield.", 32.93), tStat2 = T("station", 33.96, 1), tSov = T("Soviet", 36.3);

  // ---- trang sổ + bản đồ (toạ độ lớp "trang") ----
  var PW = 2340, PH = 1000, SX = 210, SY = 50, SW = 1920, SH = 800, FLOOR = 962;
  var oA = [SX + 1042, SY + 461], vA = [SX + 881, SY + 292];          // map-yakutia (khung 0 100 1920 800)
  var BX = 900, BY = 250, BW = 1200, BH = 500, BK = BW / 1920;   // map-tomtor phóng to, dán cạnh ô nhỏ map-yakutia
  var oB = [BX + 896 * BK, BY + 400 * BK], tB = [BX + 1024 * BK, BY + 560 * BK];
  var IX = 220, IY = 70, IK = 0.3, oI = [IX + 1042 * IK, IY + 461 * IK];
  var desk = '<rect x="-3000" y="-2000" width="9000" height="6000" fill="#8E6544"/>';
  for (var k = 0; k < 30; k++) desk += D.line("M -3000 " + (-1900 + k * 160) + " C 0 " + (-1880 + k * 160) + " 3000 " + (-1930 + k * 160) + " 6000 " + (-1900 + k * 160), 4, "#6E4A30", ' opacity="0.45"');

  var pageB = D.journalPage(PW, PH, { seed: 309 }) + at(IX, IY, D.mapSticker("ban-do/map-yakutia-nho.svg", 1920 * IK, 800 * IK, { id: "stI", seed: 321, bang: false }));
  pageB += at(oI[0], oI[1], D.mapDot("dOI", { r: 7 }));
  pageB += '<rect x="' + (oI[0] - 26) + '" y="' + (oI[1] - 18) + '" width="52" height="36" fill="none" stroke="' + C.accent2 + '" stroke-width="5"/>';
  pageB += D.line("M " + (oI[0] + 26) + " " + (oI[1] - 18) + " L " + BX + " " + BY + " M " + (oI[0] + 26) + " " + (oI[1] + 18) + " L " + BX + " " + (BY + BH), 3, C.accent2, ' stroke-dasharray="10 10" opacity="0.8"');
  pageB += at(BX, BY, D.mapSticker("ban-do/map-tomtor.svg", BW, BH, { id: "stB", seed: 319 }));
  pageB += at(oB[0], oB[1], D.mapDot("dOB", { r: 15, nhan: CH[0], co: 48, ben: "trai" }));
  pageB += at(tB[0], tB[1], '<g id="nhanT">' + D.mapDot("dTB2", { r: 15, nhan: CH[3], co: 48, ben: "phai", mau: C.accent2 }) + "</g>");
  pageB += at(tB[0] + 20, tB[1] + 118, '<g id="dbay"><g transform="rotate(-10)">' + D.airstrip(280, 52, { cu: true }) + "</g></g>");
  pageB += at(BX + 150, BY + BH + 150, '<g id="tram"><g transform="rotate(-5) scale(0.7)">' + D.paper(D.rRect(-120, -330, 240, 350, 2, 991), "#EFE2C2", { stroke: true, sw: 4 }) +
    '<g transform="translate(-20,0) scale(0.85)">' + D.weatherStation({ cu: true }) + "</g></g></g>");
  pageB += at(oB[0], oB[1], '<g id="nkN"><g transform="scale(0.3) translate(-85,-300)">' + D.thermometer("nk") + "</g></g>");

  var pageA = D.journalPage(PW, PH, { seed: 307 }) + at(SX, SY, D.mapSticker("ban-do/map-yakutia.svg", SW, SH, { id: "stA", seed: 317 }));
  pageA += at(oA[0], oA[1], D.mapDot("dOA", { r: 15, nhan: CH[0], co: 48, ben: "phai" }));
  pageA += at(vA[0], vA[1], D.mapDot("dVA", { r: 15 }));
  pageA += at(vA[0], vA[1], '<g id="nhanV">' + D.mapDot("dVA2", { r: 15, nhan: CH[1], co: 48, ben: "trai" }) + "</g>");
  pageA += at(vA[0] - 190, vA[1] + 62, '<g id="n1892">' + D.paper(D.rRect(-74, -34, 148, 64, 1.5, 993), "#FFF8EC", { stroke: true, sw: 3.5 }) + D.txt(0, 16, CH[2], 44, { w: 900, fill: C.accent2 }) + "</g>");
  // vương miện băng chia đôi
  var mid = [(oA[0] + vA[0]) / 2, (oA[1] + vA[1]) / 2];
  pageA += '<g id="vmT">' + D.iceCrown({ nua: "trai" }) + "</g>" + '<g id="vmP">' + D.iceCrown({ nua: "phai" }) + "</g>";
  pageA += at(vA[0] + 58, vA[1] - 70, '<g id="hoi">' + D.txt(0, 0, "?", 64, { w: 900, fill: C.accent2 }) + "</g>");

  var W = api.wob("W", { scarf: true, khan: "#D9543C", mu: "#C9463A" });
  var trang = g("trangB", pageB) + g("trangA", pageA) + W.svg;
  api.dat(api.lop("ban", desk, 0.8, { mat: 1100 }) + api.lop("trang", trang, 1, { mat: 1100 }));
  api.noi({});

  // ---- camera ----
  api.camera([
    [0, oA[0] - 60, 640, 1.4], [tFar + 0.2, oA[0] - 66, 642, 1.42, "sine.inOut"],          // Wob đã ở mép trang từ khung đầu
    [tVer - 0.1, 1130, 640, 1.18, "power2.inOut"],                       // lùi: thấy chấm Verkhoyansk ở tây bắc
    [tSome - 0.2, 1110, 630, 1.24, "sine.inOut"],
    [tShare, mid[0], 590, 1.4, "power2.inOut"], [tOthers + 0.6, mid[0] - 30, 600, 1.42, "sine.inOut"],
    [tMeas + 0.6, mid[0], mid[1] + 40, 1.9, "power2.inOut"],             // cận Wob nằm dang tay
    [tFing + 0.6, mid[0], mid[1] + 30, 2.05, "sine.inOut"],
    [tDec + 0.6, 1160, 660, 1.3, "power2.inOut"],
    [tThen - 0.1, 1170, 640, 1.34, "sine.inOut"],
    [tCompl + 0.2, 1100, 560, 0.98, "power2.out"],                         // lật trang: ô nhỏ map-yakutia → phóng to map-tomtor
    [tStat - 0.2, 1120, 560, 1.0, "sine.inOut"],
    [tStat + 1.0, 1440, 600, 1.4, "power2.inOut"],
    [tSits, 1450, 610, 1.46, "sine.inOut"],
    [tAir, 1500, 640, 1.42, "sine.inOut"],
    [tStat2 + 0.5, 1380, 680, 1.3, "power2.inOut"],
    [DUR, 1370, 680, 1.36, "sine.inOut"]
  ]);

  // ---- nhãn, 1892, vương miện chia đôi ----
  api.origin("#nhanV", "0 0"); api.pop("#nhanV", tVer - 0.1, 0.28); api.sfx("pop", tVer - 0.1, 0.45);
  api.origin("#n1892", "0 0"); api.pop("#n1892", t1892 - 0.08, 0.28); api.sfx("ting", t1892 - 0.06, 0.4);
  api.origin("#vmT", "0 0"); api.origin("#vmP", "0 0");
  var top = [mid[0], mid[1] - 70];   // hạ vương miện 80 px khỏi mép trên (duyệt hình v1)
  [["#vmT", vA, -1], ["#vmP", oA, 1]].forEach(function (q) {
    var sel = q[0], dst = q[1];
    api.set(sel, 0, { x: top[0], y: top[1], scale: 0 });
    api.key(sel, "scale", tSome + 0.1, 0, "none"); api.key(sel, "scale", tSome + 0.4, 1.3, "back.out(2.2)");
    api.key(sel, "x", tShare - 0.05, top[0], "none"); api.key(sel, "x", tShare + 0.1, top[0] + q[2] * 22, "power2.out");
    api.key(sel, "x", tShare + 0.75, dst[0], "power2.inOut"); api.key(sel, "y", tShare + 0.1, top[1] - 10, "power2.out");
    api.key(sel, "y", tShare + 0.75, dst[1] - 18, "power2.in"); api.key(sel, "scale", tShare + 0.75, 0.75, "power2.inOut");
  });
  api.sfx("tach-bang", tShare - 0.02, 0.45); api.sfx("pop", tShare + 0.75, 0.3);
  // nửa ở Verkhoyansk nghiêng lệch + dấu hỏi
  api.key("#vmT", "rotation", 0, 0); api.key("#vmT", "rotation", tOthers + 0.2, 0, "none"); api.key("#vmT", "rotation", tOthers + 0.6, -26, "back.out(2)");
  api.key("#vmT", "y", tOthers + 0.2, vA[1] - 18, "none"); api.key("#vmT", "y", tOthers + 0.6, vA[1] - 8, "power2.out");
  api.origin("#hoi", "0 -20"); api.pop("#hoi", tOthers + 0.55, 0.25);
  for (var hq = tOthers + 1.0, s = 1; hq < tThen; hq += 0.45, s = -s) api.key("#hoi", "rotation", hq, s * 10, "sine.inOut");

  // ---- Wob: đứng ở mép trang như trên sân khấu ----
  var S = 0.42, XS0 = 1330;
  W.set(0, { x: XS0, y: FLOOR, size: S, lashes: 1, ice: 1, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: -10, pupY: -12 });
  W.mouth(0, "X");
  W.idle(0, tVer - 0.2, { seed: 141, bien: 2 });
  W.pose(tVer - 0.1, 0.3, { pupX: -12, pupY: -14, aLu: 140, aLf: 10 }, "back.out(1.6)");   // chỉ lên Verkhoyansk
  W.pose(t1892 + 0.6, 0.3, { aLu: 18, aLf: -10 }, "power2.inOut");
  W.mouth(t1892, "o"); W.mouth(t1892 + 0.6, "X");
  W.idle(t1892 + 0.9, tSome, { seed: 142, bien: 2, liec: true });
  W.pose(tSome + 0.3, 0.3, { pupX: -4, pupY: -16 }, "power2.out");
  W.soc(tShare + 0.05, { mieng: "o" });
  W.pose(tOthers + 0.6, 0.3, { pupX: -12, pupY: -16, lid: 20, upRot: -4 }, "power2.out");
  W.mouth(tOthers + 0.7, "flat");
  W.idle(tOthers + 0.9, tMeas - 0.4, { seed: 143, bien: 1.6 });
  // trèo lên trang, nằm sấp, dang hai tay từ chấm này tới chấm kia: không với tới
  var ang = Math.atan2(oA[1] - vA[1], oA[0] - vA[0]) * 180 / Math.PI;            // ≈ 46°
  var a = ang * Math.PI / 180, bodyV = [214 * S * Math.sin(a), -214 * S * Math.cos(a)];
  var feet = [mid[0] - bodyV[0], mid[1] - bodyV[1]];
  var tJ0 = tMeas - 0.3, tJ1 = tJ0 + 0.55;
  W.pose(tJ0 - 0.12, 0.12, { sy: 0.84, sx: 1.08 }, "power2.in");
  api.key("#W", "x", tJ0, XS0, "none"); api.key("#W", "x", tJ1, feet[0], "power1.inOut");
  api.key("#W", "y", tJ0, FLOOR, "none"); api.key("#W", "y", tJ0 + 0.3, feet[1] - 140, "power2.out"); api.key("#W", "y", tJ1, feet[1], "power2.in");
  W.pose(tJ0, 0.2, { sy: 1.1, sx: 0.95 }, "power2.out");
  W.pose(tJ0 + 0.15, 0.4, { lean: ang, aLu: 92, aLf: 0, aRu: -92, aRf: 0, sy: 1.05, sx: 0.84, pupX: 0, pupY: 0 }, "power2.inOut");
  api.sfx("boing", tJ0, 0.4); api.sfx("drop", tJ1, 0.35);
  W.pose(tJ1 + 0.3, 0.3, { lid: 40, eye: 1 }, "power2.out");
  W.mouth(tJ1 + 0.2, "wobbly");
  W.shiver(tJ1 + 0.4, tDec - 0.2, 2.4, 16);
  W.pose(tFing - 0.3, 0.4, { sx: 1.0, sy: 0.96, aLu: 96, aRu: -96, lid: 52 }, "power2.inOut");   // cố thêm (vẫn hụt)
  W.mouth(tFing - 0.2, "chatter");
  // đứng dậy, nhảy về sân khấu, phủi tay, quay mặt khỏi Verkhoyansk
  var tB0 = tDec - 0.15, tB1 = tB0 + 0.5, XS1 = 1420;
  W.pose(tB0, 0.25, { lean: 0, sx: 1, sy: 1, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lid: 0 }, "power2.out");
  api.key("#W", "x", tB0, feet[0], "none"); api.key("#W", "x", tB1, XS1, "power1.inOut");
  api.key("#W", "y", tB0, feet[1], "none"); api.key("#W", "y", tB0 + 0.22, feet[1] - 80, "power2.out"); api.key("#W", "y", tB1, FLOOR, "power2.in");
  W.pose(tB1 - 0.02, 0.08, { sy: 0.84, sx: 1.1 }, "power2.in"); W.pose(tB1 + 0.08, 0.3, { sy: 1, sx: 1 }, "back.out(3)");
  api.sfx("buoc-tuyet", tB1, 0.4);
  for (var p = 0; p < 4; p++) W.pose(tB1 + 0.25 + p * 0.14, 0.12, p % 2 ? { aLu: -20, aLf: -40, aRu: 20, aRf: 60 } : { aLu: -10, aLf: -70, aRu: 10, aRf: 40 }, "sine.inOut");
  W.pose(tB1 + 0.85, 0.25, { aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "power2.inOut");
  api.sfx("pop", T("Verkhoyansk", 17.51, 2), 0.4);
  W.pose(tHalf - 0.6, 0.3, { pupX: 14, pupY: -2, lid: 44, upRot: 7 }, "power2.out");   // hếch mặt sang phía khác
  W.mouth(tHalf - 0.5, "smirk");
  W.idle(tHalf, tThen - 0.1, { seed: 144, bien: 1.4 });
  // lật trang sang map-tomtor
  api.origin("#trangA", "0 " + PH / 2);
  api.key("#trangA", "scaleX", 0, 1); api.key("#trangA", "scaleX", tThen - 0.05, 1, "none"); api.key("#trangA", "scaleX", tThen + 0.4, 0.001, "power2.in");
  api.show("#trangA", 0, 1); api.show("#trangA", tThen + 0.42, 0);
  api.show("#trangB", 0, 0); api.show("#trangB", tThen - 0.05, 1);   // trang dưới chỉ hiện khi bắt đầu lật (tránh hai nhãn chồng nhau)
  api.sfx("whoosh", tThen - 0.05, 0.5);
  W.pose(tThen + 0.1, 0.12, { lid: 0, upRot: 0 }, "power2.out");
  W.soc(tCompl, { giuMat: true });
  api.sfx("liu-lo-soc", tCompl + 0.02, 0.5);
  W.pose(tCompl + 0.5, 0.3, { pupX: -8, pupY: -14 }, "power2.out");
  // nhiệt kế nhỏ trượt khỏi chấm Oymyakon, dừng giữa hai chấm (gần Tomtor)
  api.origin("#nkN", "0 0");
  var stop = [tB[0] + 40, tB[1] - 68];   // phía trên đường nối, lệch hẳn về Tomtor, cách chấm Oymyakon ≥ 60 px
  api.set("#nkN", 0, { scale: 0, x: 0, y: 0 });
  api.key("#nkN", "scale", tStat - 0.2, 0, "none"); api.key("#nkN", "scale", tStat + 0.1, 1, "back.out(2)");
  api.key("#nkN", "x", tIsnt - 0.2, 0, "none"); api.key("#nkN", "y", tIsnt - 0.2, 0, "none");
  api.key("#nkN", "x", tIsnt + 0.6, (stop[0] - oB[0]) * 0.45, "power2.inOut"); api.key("#nkN", "y", tIsnt + 0.6, (stop[1] - oB[1]) * 0.45, "power2.inOut");
  api.key("#nkN", "x", tBetw + 0.4, stop[0] - oB[0], "power2.inOut"); api.key("#nkN", "y", tBetw + 0.4, stop[1] - oB[1], "power2.inOut");
  api.key("#nkN", "rotation", 0, 0); api.key("#nkN", "rotation", tIsnt - 0.2, 0, "none"); api.key("#nkN", "rotation", tIsnt + 0.1, -10, "sine.out");
  api.key("#nkN", "rotation", tIsnt + 0.6, 0, "sine.inOut"); api.key("#nkN", "rotation", tBetw, -10, "sine.inOut"); api.key("#nkN", "rotation", tBetw + 0.5, 0, "back.out(2)");
  api.sfx("whoosh", tIsnt - 0.15, 0.25);
  // Wob lạch bạch theo nhiệt kế đang trượt (duyệt hình v1)
  W.pose(tStat + 0.1, 0.25, { pupX: 2, pupY: -16 }, "power2.out");
  W.walk(tIsnt - 0.1, tIsnt + 0.75, XS1, 1530, { step: 0.28, tieng: true });
  W.pose(tIsnt + 0.8, 0.25, { pupX: -2, pupY: -16 }, "power2.out");
  W.idle(tIsnt + 0.9, tBetw - 0.1, { seed: 145, bien: 1.6 });
  W.walk(tBetw - 0.1, tBetw + 0.55, 1530, 1600, { step: 0.28, tieng: true });
  W.pose(tBetw + 0.6, 0.25, { pupX: -6, pupY: -16 }, "power2.out");
  W.idle(tBetw + 0.8, tTom - 0.3, { seed: 148, bien: 1.4 });
  // nhãn Tomtor, đường băng, trạm khí tượng (tông giấy cũ, trượt vào như tờ dán)
  api.origin("#nhanT", "0 0"); api.pop("#nhanT", tTom - 0.24, 0.24); api.sfx("pop", tTom - 0.24, 0.45);   // chấm + nhãn Tomtor hiện trọn đúng chữ "Tomtor"
  W.pose(tTom - 0.15, 0.25, { pupX: -6, pupY: -16, eye: 1.08, aLu: 150, aLf: 14 }, "back.out(1.6)");   // chỉ tay vào Tomtor
  W.mouth(tTom - 0.05, "o");
  W.pose(tAir - 0.5, 0.25, { aLu: 18, aLf: -10, eye: 1 }, "power2.inOut");
  W.walk(tAir - 0.2, tAir + 0.6, 1600, 1760, { step: 0.28, tieng: true });     // sang nhìn đường băng
  function trotVao(sel, t, tu, xoay) {   // trượt vào như tờ dán: vượt nhẹ rồi lắng
    api.origin(sel, "0 0");
    ["x", "y"].forEach(function (pp, i) { api.key(sel, pp, 0, tu[i]); api.key(sel, pp, t, tu[i], "none"); api.key(sel, pp, t + 0.36, -tu[i] * 0.05, "power2.out"); api.key(sel, pp, t + 0.55, 0, "sine.inOut"); });
    api.show(sel, 0, 0); api.show(sel, t, 1);
    if (xoay) { api.key(sel, "rotation", 0, xoay); api.key(sel, "rotation", t, xoay, "none"); api.key(sel, "rotation", t + 0.55, 0, "back.out(2)"); }
  }
  trotVao("#dbay", tAir - 0.45, [700, 120], 0);
  api.sfx("whoosh", tAir - 0.4, 0.3);
  trotVao("#tram", tStat2 - 0.4, [-900, 160], 8);
  api.sfx("whoosh", tStat2 - 0.35, 0.3); api.sfx("pop", tStat2 + 0.12, 0.3);
  W.pose(tAir + 0.65, 0.3, { pupX: -4, pupY: -16 }, "power2.out"); W.mouth(tAir + 0.7, "smirk");
  W.pose(tStat2 + 0.2, 0.3, { pupX: -14, pupY: -8 }, "power2.out");
  W.pose(tSov - 0.1, 0.3, { lid: 18, upRot: -3 }, "power2.out");
  W.nhunVai(tSov + 0.1, 0.6);
  W.mouth(tSov, "flat");
  W.breathe(0, DUR, 2.4);
  W.autoBlink(0.3, tMeas - 0.5, 146); W.autoBlink(tIsnt, DUR - 0.3, 147);
};
