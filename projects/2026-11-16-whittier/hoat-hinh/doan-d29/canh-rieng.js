/* Đoạn d29 · cắt giấy · kết: bãi chờ đêm mùa hè trước cổng hầm bê tông một làn (vẽ bằng thư viện), xe hộp kraft của Wob ở làn đầu.
   Vào "cat", ra "cuoi-video" (giữ hình tới khung cuối, không mờ đen). Con dấu SUMMER ONLY đóng đúng một lần (sfx dau-wob): dấu to đóng giữa khung (chữ 126px), giữ ~1,3 s rồi thu về tờ lịch.
   Mọi chữ (SUMMER ONLY, May–Sept, 23:15) nằm trên tờ lịch ở vùng x < 1100; góc x > 1150, y > 560 không có chữ.
   Trang phục: mũ lưỡi trai xanh băng, không áo mưa, ba lô ô liu có cuộn thảm đỏ, ủng cao su; tờ lịch, con dấu, băng dính. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = D.INK;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var C = data.chu_tren_do_vat;
  var GROUND = 900, PX = 1450, PS = 0.62, XC = 800;
  // hai ngón tay đếm ("calendar", "patience"): vẽ trong nhóm bàn tay trái nên đi theo cánh tay
  var NGON = '<g id="W-ng1">' + D.line("M -7 6 L -12 46", 12) + '</g><g id="W-ng2">' + D.line("M 7 6 L 12 46", 12) + "</g>";
  var W = WH.wob(api, "W", { mu: "luoi", ungHien: true, holdL: NGON });
  var xe = WT.convertible("xe", { tuyet: 0 });

  var xa = WH.nui(-800, 3000, 600, 2901, { mau: "#3F5560", tuyet: "#B8C6D2", cao: [280, 460] });
  var mid = WH.dat(-800, 3000, GROUND - 120, "#4E6650", 2902, { cao: 900 });
  // CÙNG CỔNG d01 (WT.tunnelPortal), đèn tín hiệu bên TRÁI cổng, thanh chắn trước cổng; đêm hè: tuyết → cỏ sẫm
  function denBa() {
    var r = '<g>' + D.paper(D.rRect(-10, -420, 20, 420, 1, 811), "#3A4043", { stroke: true, sw: 4 }) + D.paper(D.rRect(-48, -650, 96, 236, 2, 812), "#2B3033", { stroke: true, sw: 5 });
    ["#FF6B4A", "#E8C04A", "#5BC57A"].forEach(function (c, k) { var y = -610 + k * 74, gg = ["whDo", "whSang", "whXanh"][k];
      r += '<circle cx="0" cy="' + y + '" r="28" fill="#3B3230" stroke="' + INK + '" stroke-width="4"/><g id="ham-g' + k + '"><circle cx="0" cy="' + y + '" r="84" fill="url(#' + gg + ')"/></g><circle id="ham-l' + k + '" cx="0" cy="' + y + '" r="26" fill="' + c + '"/>'; });
    return r + "</g>";
  }
  var cong = WT.tunnelPortal("ham", { seed: 801 }).split(D.C.snow).join("#3F5A44");
  mid += at(PX, GROUND - 120, '<g transform="scale(' + PS + ')">' + cong + at(-400, 4, denBa()) + at(-240, -82, WT.barrier("hb", 395)) + "</g>");
  // dãy đèn trên đầu cổng (tắt từng bóng)
  for (var l = 0; l < 3; l++) mid += at(PX - 120 + l * 120, GROUND - 120 - 480 * PS - 14, g("dc" + l, '<circle r="46" fill="url(#whSang)"/><circle r="11" fill="#FFE9B0" stroke="' + INK + '" stroke-width="3"/>'));
  mid += WH.duongRay(PX, GROUND - 120, 1200, 1100, 280, "#545A58");
  // tờ lịch dán trên bảng kraft (mặt sau tờ lịch giờ hầm)
  var lich = WH.toLich("lich", { w: 470, h: 560, seed: 2903, ke: false });
  lich += g("dau", at(235, 120, WH.dauDo("dauc", C[0], 42)));
  lich += g("may", D.txt(235, 260, C[1], 64, { fill: "#2B3A44" }));
  lich += at(95, 360, g("h0", WH.hinhSongBang())) + at(235, 360, g("h1", WH.hinhCa())) + at(375, 360, g("h2", WH.hinhLoiMon()));
  lich += g("gio", D.txt(330, 500, C[2], 64, { fill: "#2B3A44" }));
  lich += '<g transform="translate(470,0)"><g id="goc">' + D.paper("M 0 0 L -70 0 L 0 70 Z", "#EDE5CF", { stroke: true, sw: 3, shadow: false }) + "</g></g>";
  lich += at(30, 20, WH.bangDinh("bd0", -20)) + at(440, 20, WH.bangDinh("bd1", 25)) + at(235, 548, WH.bangDinh("bd2", -6));
  mid += at(120, 180, g("BANG", D.paper(D.rRect(-20, -20, 510, 600, 2, 2904), "#B8915E", { stroke: true, sw: 5, half: 0.12 }) + lich));
  // xe + Wob; đồng hồ nhỏ trên táp-lô (không số)
  mid += at(XC, GROUND - 132, '<g transform="translate(0,156) scale(-1,1)">' + xe.back + "</g>" + W.svg + '<g transform="translate(0,156) scale(-1,1)">' + xe.front + "</g>" +
    at(170, -4, D.paper(D.rEll(0, 0, 30, 30, 1, 2905), "#F6EEDC", { stroke: true, sw: 4 }) + '<g id="kim">' + D.line("M 0 0 L 0 -20", 4) + "</g>" + D.line("M 0 0 L 13 6", 4)));
  mid += g("DAU", '<g transform="scale(0.8)">' + WH.conDau("cd") + "</g>");
  mid += g("BT", WH.bongTuyet("btc", 18));
  var gan = at(1750, 1130, D.paper(D.rEll(0, -30, 260, 110, 3, 2906), "#30443A", { stroke: true, sw: 4 }));
  var sao = "";
  for (var s = 0; s < 14; s++) sao += '<circle cx="' + (80 + (s * 337) % 1800) + '" cy="' + (40 + (s * 151) % 220) + '" r="' + (2 + s % 3) + '" fill="#F4F0DC" opacity="0.7"/>';

  // dấu to đóng giữa khung (lớp màn hình, không theo camera): thẻ giấy kem + dấu đỏ; rồi thu về đúng chỗ dấu trên tờ lịch
  var DLON = '<g id="DLON"><g id="DLON-the" transform="rotate(-8)">' + D.paper(D.rRect(-232, -50, 464, 100, 1.5, 2908), "#FBF6E8", { stroke: true, sw: 3, sx: 5, sy: 7 }) + "</g>" +
    WH.dauDo("dlc", C[0], 42) + "</g>";
  api.dat(WT.defs() + '<rect width="1920" height="1080" fill="url(#whDem)"/>' + WH.defs() + sao +
    api.lop("xa", xa, 0.35, { mat: 600 }) + api.lop("giua", mid, 1, { mat: GROUND }) + api.lop("gan", gan, 1.4, { mat: 1130 }) + DLON);
  api.noi({});

  // mốc lời (lời cảnh 15 lồng lại 24/11): tuDung khớp nguyên từ, mặc định = mốc đã đo
  var tWould = T("so", 0, 0.10), tSum = T("summer", 0, 0.96), tMay = T("may", 0, 2.58), tQuarter = T("quarter", 0, 5.12);
  var tGlac = T("glaciers", 0, 8.10), tFish = T("fish", 0, 9.04), tTrails = T("trails", 0, 9.76);
  var tWinter = T("winter", 0, 10.86), tSnow = T("snow", 0, 12.98), tRolls = T("rolls", 0, 14.12), tBed = T("bedtime", 0, 16.38);
  var tBring = T("bring", 0, 17.32), tCal = T("calendar", 0, 17.56), tPat = T("patience", 0, 18.58), tLeave = T("leave", 0, 19.60), tLate = T("late", 0, 20.54), tElse = T("else", 0, 21.08);
  var tTaped = T("taped", 0, 22.12), tRead = T("read", 0, 24.70), tCould = T("could", 0, 25.48), tBuilding = T("building", 0, 27.88);

  var tDong = tSum - 0.03, tThu = tDong + 1.32, tDat = tDong + 1.82;   // đóng · bắt đầu thu · đáp xuống tờ lịch
  var CAM_DAT = [800, 520, 1.08];
  api.camera([
    [0, 820, 520, 1.06], [tDat, CAM_DAT[0], CAM_DAT[1], CAM_DAT[2], "sine.inOut"],
    [tMay + 1.0, 600, 500, 1.18, "power2.inOut"], [tTrails + 0.8, 610, 500, 1.22, "sine.inOut"],
    [tWinter - 0.2, 900, 520, 1.0, "power2.inOut"], [tBed + 0.6, 920, 520, 1.03, "sine.inOut"],
    [tBring + 0.3, 800, 540, 1.08, "power2.inOut"], [tTaped - 0.2, 760, 540, 1.12, "sine.inOut"],
    [tRead + 0.4, 700, 540, 1.18, "power2.inOut"], [DUR, 690, 545, 1.22, "sine.inOut"]
  ]);

  // ---- đèn tín hiệu: đỏ (đang chờ) → xanh đúng lúc đóng dấu, nháy "gật đầu"; tới "bedtime" về đỏ ----
  api.key("#ham-l0", "opacity", 0, 1, "step"); api.key("#ham-g0", "opacity", 0, 1, "step");
  api.key("#ham-l1", "opacity", 0, 0.25, "step"); api.key("#ham-g1", "opacity", 0, 0, "step");
  api.key("#ham-l2", "opacity", 0, 0.25, "step"); api.key("#ham-g2", "opacity", 0, 0, "step");
  api.key("#ham-l0", "opacity", tDong, 0.25, "step"); api.key("#ham-g0", "opacity", tDong, 0, "step");
  api.key("#ham-l2", "opacity", tDong, 1, "step"); api.key("#ham-g2", "opacity", tDong, 1, "step");
  api.key("#ham-g2", "opacity", tDong + 0.25, 0.3, "sine.inOut"); api.key("#ham-g2", "opacity", tDong + 0.5, 1, "sine.inOut");
  api.key("#ham-g2", "opacity", tDong + 0.75, 0.3, "sine.inOut"); api.key("#ham-g2", "opacity", tDong + 1.0, 1, "sine.inOut");
  api.key("#ham-l2", "opacity", tBed - 0.1, 0.25, "step"); api.key("#ham-g2", "opacity", tBed - 0.1, 0, "step");
  api.key("#ham-l0", "opacity", tBed - 0.1, 1, "step"); api.key("#ham-g0", "opacity", tBed - 0.1, 1, "step");
  // thanh chắn gật hai cái theo đèn xanh
  api.origin("#hb-arm", "0 0"); api.key("#hb-arm", "rotation", 0, 0, "step"); api.key("#hb-arm", "rotation", tDong, 0, "none");
  [0.1, 0.55].forEach(function (d) { api.key("#hb-arm", "rotation", tDong + d, -14, "power2.out"); api.key("#hb-arm", "rotation", tDong + d + 0.25, 0, "bounce.out"); });
  // dãy đèn cổng tắt từng bóng
  [tWinter + 0.6, tSnow - 0.3, tRolls + 0.3].forEach(function (tt, i) { api.key("#dc" + i, "opacity", 0, 1, "step"); api.key("#dc" + i, "opacity", tt, 1, "none"); api.key("#dc" + i, "opacity", tt + 0.15, 0.08, "power2.out"); });
  // bông tuyết giấy bay ngang
  api.show("#BT", 0, 0); api.show("#BT", tSnow - 0.6, 1);
  api.key("#BT", "x", 0, 1500, "step"); api.key("#BT", "y", 0, 300, "step");
  api.key("#BT", "x", tSnow - 0.6, 1500, "none"); api.key("#BT", "x", tSnow + 2.4, 200, "sine.inOut");
  api.key("#BT", "y", tSnow - 0.6, 300, "none"); api.key("#BT", "y", tSnow + 0.9, 380, "sine.inOut"); api.key("#BT", "y", tSnow + 2.4, 330, "sine.inOut");
  api.key("#BT", "rotation", tSnow - 0.6, 0, "none"); api.key("#BT", "rotation", tSnow + 2.4, 300, "none");
  api.show("#BT", tSnow + 2.4, 0);

  // ---- Wob đóng dấu ----
  W.set(0, { x: -18, y: 116, size: 0.62, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -30, aRf: 20, pupX: -10, pupY: 4 });
  W.mouth(0, "smirk");
  api.show("#W-ng1", 0, 0); api.show("#W-ng2", 0, 0);
  var DX = XC - 60, DY = GROUND - 165, SX = 120 + 235, SY = 180 + 160;    // con dấu: ở tay Wob → mặt tờ lịch
  api.origin("#DAU", "0 0");
  api.key("#DAU", "x", 0, DX, "step"); api.key("#DAU", "y", 0, DY, "step");
  W.pose(tWould, 0.3, { aLu: 120, aLf: 30, upRot: -4 }, "power2.out");
  api.key("#DAU", "x", tWould + 0.3, DX, "none"); api.key("#DAU", "x", tDong - 0.12, SX, "power2.in");
  api.key("#DAU", "y", tWould + 0.3, DY, "none"); api.key("#DAU", "y", tDong - 0.3, SY - 70, "power2.out"); api.key("#DAU", "y", tDong, SY, "power3.in");
  api.key("#DAU", "scaleY", 0, 1, "step"); api.key("#DAU", "scaleY", tDong, 1, "none"); api.key("#DAU", "scaleY", tDong + 0.06, 0.8, "power2.out"); api.key("#DAU", "scaleY", tDong + 0.18, 1, "back.out(2)");
  api.key("#DAU", "y", tDong + 0.2, SY, "none"); api.key("#DAU", "y", tDong + 0.7, DY, "power2.inOut");
  api.key("#DAU", "x", tDong + 0.2, SX, "none"); api.key("#DAU", "x", tDong + 0.7, DX, "power2.inOut");
  api.show("#DAU", 0, 1); api.show("#DAU", tDong + 0.75, 0);
  W.pose(tDong - 0.15, 0.12, { aLu: 100, aLf: 10, lean: -6 }, "power2.in");
  W.pose(tDong + 0.2, 0.4, { aLu: 18, aLf: -10, lean: 0, upRot: 0 }, "power2.inOut");
  // dấu to: đập xuống giữa khung (4,4× → 3×, nảy), giữ ~1,3 s, rồi thu về đúng chỗ dấu trên tờ lịch theo camera lúc đáp
  var BX = 900, BY = 470, BS = 3.0;
  var LX = 960 + CAM_DAT[2] * (SX - CAM_DAT[0]), LY = 540 + CAM_DAT[2] * (180 + 120 - CAM_DAT[1]), LS = CAM_DAT[2];
  api.origin("#DLON", "0 0");
  api.key("#DLON", "x", 0, BX, "step"); api.key("#DLON", "y", 0, BY, "step"); api.key("#DLON", "scale", 0, 4.4, "step");
  api.key("#DLON", "opacity", 0, 0, "step"); api.key("#DLON", "opacity", tDong - 0.1, 0, "none"); api.key("#DLON", "opacity", tDong - 0.04, 1, "power1.out");
  api.key("#DLON", "scale", tDong - 0.1, 4.4, "none"); api.key("#DLON", "scale", tDong, BS, "power3.in");
  api.key("#DLON", "scale", tDong + 0.07, BS * 0.95, "power2.out"); api.key("#DLON", "scale", tDong + 0.22, BS, "back.out(2)");
  api.key("#DLON", "scale", tThu, BS, "none"); api.key("#DLON", "scale", tDat, LS, "power2.inOut");
  api.key("#DLON", "x", tThu, BX, "none"); api.key("#DLON", "x", tDat, LX, "power2.inOut");
  api.key("#DLON", "y", tThu, BY, "none"); api.key("#DLON", "y", tDat, LY, "power2.inOut");
  api.key("#DLON-the", "opacity", 0, 1, "step"); api.key("#DLON-the", "opacity", tThu + 0.1, 1, "none"); api.key("#DLON-the", "opacity", tDat - 0.1, 0, "power1.in");
  api.key("#DLON", "opacity", tDat, 0, "step");
  api.shake(tDong, 7, 6);
  api.show("#dau", 0, 0); api.show("#dau", tDat, 1);
  api.origin("#dau", "235 120"); api.key("#dau", "scale", tDat, 1.1, "step"); api.key("#dau", "scale", tDat + 0.2, 1, "power2.out");
  api.sfx("dau-wob", tDong, 0.9);
  W.pose(tDong + 0.3, 0.3, { pupX: 14, pupY: -10 }, "power2.out");                  // liếc đèn xanh
  W.mouth(tDong + 0.4, "grin");
  W.pose(tThu, 0.3, { pupX: -10, pupY: -4 }, "power2.out");                        // dõi dấu bay về tờ lịch
  W.pose(tDat, 0.3, { pupX: -8, pupY: 2 }, "power2.out");
  // ---- May–Sept · 23:15 + ba hình nhỏ sáng lên ----
  api.show("#may", 0, 0); api.fade("#may", tMay - 0.15, 0.3, 1);
  api.show("#gio", 0, 0); api.origin("#gio", "330 480"); api.set("#gio", 0, { scale: 0 });
  api.show("#gio", tQuarter - 0.1, 1); api.pop("#gio", tQuarter - 0.1, 0.3);
  [["#h0", tGlac], ["#h1", tFish], ["#h2", tTrails]].forEach(function (h, i) {
    api.key(h[0], "opacity", 0, 0.25, "step"); api.key(h[0], "opacity", h[1] - 0.1, 0.25, "none"); api.key(h[0], "opacity", h[1] + 0.1, 1, "power2.out");
    api.origin(h[0], "0 0"); api.key(h[0], "scale", 0, 1, "step"); api.key(h[0], "scale", h[1] - 0.1, 1, "none"); api.key(h[0], "scale", h[1] + 0.1, 1.2, "power2.out"); api.key(h[0], "scale", h[1] + 0.4, 1, "power2.inOut");
  });
  api.sfx("pop", tGlac - 0.08, 0.35); api.sfx("pop", tFish - 0.08, 0.35); api.sfx("pop", tTrails - 0.08, 0.35);
  W.pose(tMay, 0.3, { pupX: -14, pupY: -2 }, "power2.out");
  W.idle(tMay + 0.4, tQuarter - 0.2, { seed: 291, bien: 1.1 });
  W.pose(tQuarter - 0.1, 0.3, { pupX: -14, pupY: 4 }, "power2.out");
  W.idle(tQuarter + 0.6, tWinter, { seed: 293, bien: 1.1 });
  // ---- mùa đông: tắt đèn, tuyết, giờ đi ngủ ----
  W.pose(tWinter, 0.3, { pupX: 14, pupY: -12 }, "power2.out");
  W.mouth(tWinter, "flat");
  W.pose(tSnow - 0.2, 0.3, { pupX: -4, pupY: -14 }, "power2.inOut");
  W.shiver(tSnow, tSnow + 0.6, 1.4, 14);
  W.pose(tRolls, 0.25, { lean: 8 }, "back.out(2)"); W.pose(tRolls + 0.5, 0.3, { lean: 0 }, "power2.out");
  api.key("#gio", "scale", tBed - 0.15, 1, "none"); api.key("#gio", "scale", tBed + 0.1, 1.25, "power2.out"); api.key("#gio", "scale", tBed + 0.45, 1, "power2.inOut");
  W.pose(tBed - 0.1, 0.3, { pupX: -14, pupY: 6 }, "power2.out");
  W.mouth(tBed + 0.2, "wobbly");
  // ---- "Bring a calendar. Bring patience.": giơ tay đếm hai ngón; "running late": liếc đồng hồ táp-lô, giật mình ----
  W.pose(tBring - 0.3, 0.3, { y: 64, aLu: 172, aLf: 4, upRot: -4, pupX: -6, pupY: -10 }, "back.out(1.5)");
  W.mouth(tBring, "smirk");
  api.show("#W-ng1", tCal - 0.05, 1); W.pose(tCal - 0.05, 0.1, { aLu: 180 }, "power2.out"); W.pose(tCal + 0.1, 0.2, { aLu: 172 }, "power2.inOut");
  api.show("#W-ng2", tPat - 0.05, 1); W.pose(tPat - 0.05, 0.1, { aLu: 180 }, "power2.out"); W.pose(tPat + 0.1, 0.2, { aLu: 172 }, "power2.inOut");
  W.pose(tPat + 0.5, 0.3, { pupX: 4, pupY: -2 }, "power2.out");
  api.show("#W-ng1", tLeave + 0.05, 0); api.show("#W-ng2", tLeave + 0.05, 0);
  W.pose(tLeave, 0.35, { y: 116, aLu: 18, aLf: -10, upRot: 0 }, "power2.inOut");
  W.idle(tLeave + 0.4, tLate - 0.4, { seed: 292, bien: 1.0 });
  api.origin("#kim", "0 0");
  api.key("#kim", "rotation", 0, 300, "step"); api.key("#kim", "rotation", tLate - 0.2, 300, "none"); api.key("#kim", "rotation", tLate + 0.5, 352, "power2.inOut");
  W.pose(tLate - 0.3, 0.25, { pupX: 14, pupY: 12 }, "power2.out");
  W.soc(tElse + 0.05, { mieng: "o", giuMat: true });
  W.mouth(tElse + 0.6, "flat");
  // ---- dán tờ lịch: góc bong, ba miếng băng dính, gõ vào 23:15 ----
  api.origin("#goc", "0 0");
  api.key("#goc", "scale", 0, 0.01, "step"); api.key("#goc", "scale", tTaped - 0.1, 0.01, "none"); api.key("#goc", "scale", tTaped + 0.2, 1, "back.out(2)");
  api.key("#goc", "scale", tTaped + 1.25, 1, "none"); api.key("#goc", "scale", tTaped + 1.4, 0.01, "power2.in");
  W.pose(tTaped - 0.1, 0.3, { aLu: 110, aLf: 20, pupX: -14, pupY: -6 }, "power2.out");
  ["#bd0", "#bd1", "#bd2"].forEach(function (b, i) {
    var tt = tTaped + 0.4 + i * 0.4;
    api.origin(b, "0 0"); api.set(b, 0, { scale: 0 }); api.pop(b, tt, 0.22);
    W.pose(tt - 0.15, 0.15, { aLu: i === 2 ? 90 : 128, aLf: 12 }, "power2.out");
    api.sfx("pop", tt, 0.3);
  });
  W.pose(tRead - 0.4, 0.25, { aLu: 96, aLf: 6 }, "power2.out");
  [0, 0.28].forEach(function (d) { W.pose(tRead - 0.1 + d, 0.1, { aLu: 90, aLf: 0 }, "power2.in"); W.pose(tRead + d, 0.14, { aLu: 98, aLf: 8 }, "power2.out"); });
  W.mouth(tRead, "smirk");
  // ---- câu hỏi cuối: nhìn thẳng, nghiêng đầu chờ, giữ tới hết ----
  W.pose(tCould - 0.2, 0.35, { aLu: 18, aLf: -10, pupX: 0, pupY: 0 }, "power2.inOut");
  W.pose(tCould + 0.3, 0.5, { upRot: 10, lean: 3 }, "back.out(1.4)");
  W.mouth(tCould + 0.3, "X");
  W.pose(tBuilding + 0.3, 0.3, { eye: 1.08 }, "power2.out");
  W.breathe(tCould + 0.8, DUR, 2.4);
  W.autoBlink(0.6, DUR - 0.5, 2907);
};
