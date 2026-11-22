/* Đoạn d11 · cắt giấy · hồi ức · vì sao có làng: suối ấm. Vào "cat", ra "cat". Làm lại phần 1 theo duyệt hình vòng 1 (19/11/2026).
   Phần 1 (0–17,9 s, tông sepia = hình dung quá khứ): Wob HIỆN TẠI màu đầy đủ đứng ở tiền cảnh góc trái dưới (lớp gắn khung,
   không lọc sepia) rọi đèn pin vào thung lũng như máy chiếu phim: ngoài chùm tối đi ~30%. Trong chùm: đàn tuần lộc + người chăn
   dạng bóng giấy chung (không mặt, không trang phục dân tộc cụ thể) tới suối; camera lia theo đàn qua vùng băng, chùm đèn dừng ở
   chấm nước bốc hơi duy nhất, đẩy vào trung cảnh; lều bật dựng to sát camera chắn vòng đèn (gag: Wob rướn người rọi vòng qua),
   lều thành nhà gỗ, camera lùi về toàn cảnh. 'So': Wob tắt đèn, sepia rút đi từ trái sang phải, cùng thung lũng màu thật.
   Wob cất đèn, rút chai nước đông cứng, bước xuống bờ suối (đổi từ lớp khung sang lớp thế giới đúng khung trùng toạ độ), ngồi xổm.
   Phần 2 giữ như bản trước: nhúng chai, chai óc ách, ôm chai như thú cưng. Không chữ trên hình.
   Thung lũng dùng CHUNG cấu hình với doan-d09 (THUNG, NHA_LANG, XSP). Trang phục: mũ len đỏ #C9463A, khăn đỏ #D9543C, ba lô,
   lông mi đóng băng; đèn pin (như d06) rồi chai nước. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var T = function (w, du, k) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function cl(x) { return Math.max(0, Math.min(1, x)); }
  function sm(x) { x = cl(x); return x * x * x * (x * (x * 6 - 15) + 10); }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function sio(u) { u = cl(u); return -(Math.cos(Math.PI * u) - 1) / 2; }

  // ---- mốc lời ----
  var tSpr = T("springs", 1.46), tWat = T("water", 2.12), tRest = T("rest", 3.6), tIf = T("If", 5.55), tFrozen = T("frozen", 6.93),
    tOpen = T("open", 8.35), tCur = T("curiosity.", 9.58), tWhole = T("It's", 10.77), tPoint = T("point.", 11.16),
    tStop = T("stopping", 12.0), tCamp = T("camp.", 13.57), tOver = T("Over", 14.36), tGrew = T("grew", 15.71), tPerm = T("permanent", 16.48),
    tVill = T("village.", 16.97), tSo = T("So", 17.91), tDesp = T("despite", 19.11), tApp = T("appeared", 20.52), tMid = T("middle", 21.85),
    tFreeze = T("freeze.", 24.73), tDip = T("dipped", 25.78), tSlosh = T("sloshed.", 28.53);

  // ---- thung lũng (CHUNG với d09) ----
  var MAT = 872, XSP = 1300;
  var THUNG = {
    ten: "thung", seed: 900, tu: -900, den: 4200, mat: MAT, matTroi: [1320, 300],
    nhaXa: [[-200, 772], [2600, 768]], thong: [[-120, 800, 300], [240, 810, 260], [2350, 806, 300], [2700, 796, 340], [3000, 812, 280]],
    suong: 4
  };
  var NHA_LANG = [[XSP - 560, MAT - 74, 0.5, 0], [XSP - 300, MAT - 100, 0.4, 1], [XSP + 330, MAT - 92, 0.44, 2], [XSP + 600, MAT - 70, 0.52, 3]];
  var nen = CN.langTuyet(api, THUNG);
  var mid = nen.giua;
  NHA_LANG.forEach(function (h) {
    var spec = { w: 300, h: 180, seed: 910 + h[3] };
    mid += at(h[0], h[1], '<g id="nha' + h[3] + '"><g transform="scale(' + h[2] + ')">' + D.logHouse(spec) + "</g></g>");
    var c = D.chimneyOf(spec);
    mid += api.khoi("kl" + h[3], h[0] + c[0] * h[2], h[1] + c[1] * h[2] - 2, { cao: 260, rong: 9, uon: 8, toc: 0.25, mo: 0.85 });
    if (h[3] === 1 || h[3] === 2) mid += at(h[0], h[1], '<g id="leu' + h[3] + '"><g transform="scale(' + (h[2] * 1.15) + ')">' + D.tentCone(230, 210, 450 + h[3]) + "</g></g>");
  });
  mid += api.khoi("hs0", XSP - 90, MAT - 14, { cao: 330, rong: 26, uon: 22, toc: 0.36, lech: -30, seed: 931 });
  mid += api.khoi("hs1", XSP + 30, MAT - 18, { cao: 420, rong: 30, uon: 26, toc: 0.3, lech: 20, seed: 932 });
  mid += api.khoi("hs2", XSP + 120, MAT - 12, { cao: 300, rong: 22, uon: 18, toc: 0.4, lech: 40, seed: 933 });
  mid += at(XSP, MAT - 4, D.warmSpring("su", 300, 941));

  // ---- đàn tuần lộc + người chăn (bóng giấy chung). r0, r2 ở lại uống; còn lại đi tiếp qua vùng băng ----
  var nguoi = "", nguoiGan = "";
  var DAN = [
    { id: "r0", x: 1170, y: MAT + 26, s: 0.72, k: "r", tre: 0.0, o: true },
    { id: "h0", x: 790, y: MAT + 40, s: 0.78, k: "h", tre: 0.5 },
    { id: "r1", x: 880, y: MAT + 18, s: 0.66, k: "r", tre: 0.4 },
    { id: "r2", x: 1420, y: MAT + 46, s: 0.78, k: "r", tre: 0.15, o: true },
    { id: "r3", x: 640, y: MAT + 30, s: 0.7, k: "r", tre: 0.6 },
    { id: "h1", x: 420, y: MAT + 44, s: 0.8, k: "h", tre: 0.75 }
  ];
  DAN.forEach(function (a, i) {
    // người chăn: dạng chung có mặt, đang làm việc (h0 dắt tuần lộc r3 bằng dây, h1 kéo xe trượt chở hàng)
    var body = a.k === "r" ? D.reindeer(a.id, { seed: 431 + i * 7, mau: i % 2 ? "#7E6048" : "#8A6A4E" }) :
      (a.id === "h1" ? '<g transform="translate(-70,0)">' + D.sled("xt1") + "</g>" + D.line("M -40 -56 C -44 -40 -48 -30 -50 -22", 4, "#5C4433") : "") + D.herderMat(a.id, { mau: i === 1 ? "#6B5444" : "#5E6A5A" });
    var grp = '<g id="' + a.id + '-o"><g transform="scale(' + a.s + ')">' + body + "</g></g>";
    if (a.k === "h") nguoi += grp; else mid += grp;   // người chăn ở lớp trên vòng đèn: chùm đèn không bao giờ rọi lên người
  });
  mid += '<path id="day0" d="M 0 0" fill="none" stroke="#5C4433" stroke-width="3.5"/>';

  // ---- Wob phần 2 (lớp thế giới) ----
  var XW = 1150, FY = MAT + 40, FYs = FY + 40;
  var tears = '<g id="nuocMat"><g transform="translate(150,190)">' + D.tear(9) + '</g><g transform="translate(250,190)">' + D.tear(9) + "</g></g>";
  var chai = '<g id="chaiXoay"><g transform="translate(0,64) scale(0.62)">' + D.waterBottle("chai") + "</g></g>";
  var M = api.wob("M", { scarf: true, khan: "#D9543C", mu: "#C9463A", phuKien: tears, holdR: chai });
  mid += M.svg;
  mid += api.phut("te", XSP - 50, MAT + 6, { n: 4, song: 0.8, cao: 50, troi: 30, r: 16, tu: tDip + 0.3, den: tDip + 1.7, seed: 981 });

  // ---- lớp gần (parallax 1,2): lều to sát camera → nhà gỗ lớn; một cây thông lướt qua khi lia ----
  var LX = 1484, LY = 1094;
  // hai người chăn dựng lều to (tua nhanh): cọc chụm lại, bạt quấn quanh, rồi bước khuất sau lều
  // hai người dựng lều (lớp trên vòng đèn, cắt ở mép lều để bước khuất sau lều): một người đóng cọc, một người buộc dây xe trượt
  nguoiGan += '<clipPath id="sauLeu"><rect x="' + (LX + 100) + '" y="-2000" width="4000" height="5000"/></clipPath><g clip-path="url(#sauLeu)">' +
    at(LX + 130, LY, '<g id="hd1"><g transform="scale(0.85)">' + D.herderMat("hd1m", { mau: "#6B5444" }) + "</g></g>") +
    at(LX + 300, LY, '<g id="xt2g"><g transform="scale(0.55)">' + D.sled("xt2") + "</g></g>") +
    at(LX + 225, LY, '<g id="hd2"><g transform="scale(0.85)"><g id="hd2c">' + D.herderMat("hd2m", { mau: "#5E6A5A" }) + "</g></g></g>") + "</g>";
  var gan = "";
  gan += at(LX, LY, '<g id="cocTo">' + D.line("M -100 0 L 14 -214 M 100 0 L -14 -214 M -20 0 L 6 -222", 7, "#553521") + "</g>");
  gan += at(LX, LY, '<g id="leuTo"><g transform="scale(0.95)">' + D.tentCone(230, 210, 455) + "</g></g>");
  gan += at(LX + 40, LY, '<g id="nhaTo"><g transform="scale(0.62)">' + D.logHouse({ w: 300, h: 180, seed: 915 }) + "</g></g>");
  gan += at(2300, 1300, '<g transform="scale(1.6)">' + D.larch(420, 977) + "</g>");

  // ---- Wob hiện tại ở tiền cảnh (lớp gắn khung, không lọc sepia) ----
  var PX = 300, PY = 1062, PS = 1.05;
  var holdP = '<g id="P-fl"><g transform="rotate(90) scale(0.8)">' + D.flashlight("flP") + "</g></g>" +
    '<g id="P-chai"><g transform="translate(0,64) scale(0.62)">' + D.waterBottle("chaiP") + "</g></g>";
  var P = api.wob("P", { scarf: true, khan: "#D9543C", mu: "#C9463A", holdR: holdP });

  // ---- lọc sepia + lớp chiếu ----
  var tOff = tSo - 0.05, tMau1 = tOff + 1.0;
  var sep = api.locSepia("sep", [[0, 1], [tOff, 1], [tMau1, 0]]);
  var scene = nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.2, { mat: 1100 });
  var chieu = '<mask id="mChieu" maskUnits="userSpaceOnUse" x="-100" y="-100" width="2120" height="1280"><rect x="-100" y="-100" width="2120" height="1280" fill="#fff"/>' +
    '<path id="mNon" d="M 0 0" fill="#000" opacity="0.8"/><ellipse id="mVong" cx="0" cy="0" rx="1" ry="1" fill="#000"/></mask>' +
    '<rect id="toi" x="-100" y="-100" width="2120" height="1280" fill="#1E1408" mask="url(#mChieu)" opacity="0"/>' +
    '<g id="chum" opacity="0"><path id="chumNon" d="M 0 0" fill="#FFE9A0" opacity="0.22"/><ellipse id="chumVong" cx="0" cy="0" rx="1" ry="1" fill="#FFF3C4" opacity="0.18"/></g>';
  var giayCu = '<g id="giayCu" opacity="0"><path d="M 0 -50 L 26 120 L 4 260 L 30 420 L 2 600 L 24 780 L 6 960 L 28 1130 L 2400 1130 L 2400 -50 Z" fill="#C9A86A" opacity="0.4"/>' +
    D.line("M 0 -50 L 26 120 L 4 260 L 30 420 L 2 600 L 24 780 L 6 960 L 28 1130", 6, "#8E7650", ' opacity="0.7"') + "</g>";
  // lọc riêng cho người: sepia + tối 28% như vùng ngoài vòng đèn (người không bao giờ sáng lên trong chùm)
  var SPN = [0.36, 0.62, 0.15, 0, 0.06, 0.31, 0.56, 0.13, 0, 0.04, 0.24, 0.43, 0.10, 0, 0.02, 0, 0, 0, 1, 0].map(function (v, i) { return i >= 15 || i % 5 === 4 ? v : Math.round(v * 0.72 * 1000) / 1000; }).join(" ");
  var lopNguoi = '<filter id="sepNguoi" filterUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="' + SPN + '"/></filter>' +
    '<g filter="url(#sepNguoi)">' + api.lop("nguoiG", nguoi, 1, { mat: MAT }) + api.lop("nguoiN", nguoiGan, 1.2, { mat: 1100 }) + "</g>";
  api.dat("<defs>" + sep + '</defs><g id="canhSep" filter="url(#sep)">' + scene + "</g>" + chieu + lopNguoi + giayCu + P.svg);
  api.noi({});
  var gs = null;
  api.moiKhung(function (t) {
    if (!gs) gs = document.getElementById("canhSep");
    if (gs) { if (t > tMau1 + 0.05) gs.removeAttribute("filter"); else gs.setAttribute("filter", "url(#sep)"); }
  });

  // ---- suối chảy ----
  for (var k = 0; k < 3; k++) { api.key("#su-song" + k, "x", 0, 0); api.key("#su-song" + k, "x", DUR, -(150 + k * 40) * DUR / 6, "none"); }

  // ---- đàn: tới suối, uống, nghỉ; phần lớn đi tiếp sang phải ----
  var tArrive = tSpr + 0.1, tLeave = tIf + 0.1, tGoneL = tLeave + 3.6;
  function xDan(a, t) {
    var ta = tArrive - 0.5 + a.tre * 0.6;
    if (t < ta) return lerp(a.x - 1150, a.x, 1 - Math.pow(1 - cl(t / ta), 2));
    if (a.o) return a.x;
    var tl = tLeave + a.tre * 0.5;
    return a.x + 2100 * sio((t - tl) / (tGoneL + a.tre * 0.5 - tl));
  }
  var h0 = DAN[1], r3 = DAN[4], dayN = null;
  api.moiKhung(function (t) {
    if (!dayN) dayN = document.getElementById("day0");
    if (!dayN) return;
    var hx = xDan(h0, t) - 30 * h0.s, hy = h0.y - 62 * h0.s, rx = xDan(r3, t) + 115 * r3.s, ry = r3.y - 205 * r3.s;
    dayN.setAttribute("d", "M " + hx.toFixed(1) + " " + hy.toFixed(1) + " Q " + ((hx + rx) / 2).toFixed(1) + " " + (Math.max(hy, ry) + 22).toFixed(1) + " " + rx.toFixed(1) + " " + ry.toFixed(1));
  }, { twos: true });
  DAN.forEach(function (a, i) {
    var sel = "#" + a.id + "-o", ta = tArrive - 0.5 + a.tre * 0.6, tl = tLeave + a.tre * 0.5, tg = tGoneL + a.tre * 0.5;
    api.origin(sel, "0 0");
    for (var ts = 0; ts <= DUR - 9 + 1e-6; ts += 0.1) api.key(sel, "x", ts, xDan(a, ts), "none");
    api.key(sel, "y", 0, a.y);
    var walking = a.o ? [[0, ta]] : [[0, ta], [tl, tg]];
    walking.forEach(function (w) {
      for (var tw = w[0], up = (i % 2 === 0); tw < w[1]; tw += 0.22, up = !up) {
        api.key(sel, "y", tw, a.y + (up ? -5 : 0), "sine.inOut");
        if (a.k === "r") for (var c = 0; c < 4; c++) { api.origin("#" + a.id + "-cc" + c, "0 0"); api.key("#" + a.id + "-cc" + c, "rotation", tw, ((c % 2) ^ up ? 16 : -16), "sine.inOut"); }
        else { api.origin("#" + a.id + "-tay", "22 -150"); api.key("#" + a.id + "-tay", "rotation", tw, up ? -14 : 10, "sine.inOut"); }
      }
      api.key(sel, "y", w[1], a.y, "sine.out");
      if (a.k === "r") for (var c2 = 0; c2 < 4; c2++) api.key("#" + a.id + "-cc" + c2, "rotation", w[1], 0, "sine.out");
    });
    if (a.k === "r") {
      api.origin("#" + a.id + "-dau", "70 -160");
      var tu0 = Math.max(ta + 0.2, tWat - 0.2), tu1 = a.o ? DUR - 9 : tl - 0.1;
      api.key("#" + a.id + "-dau", "rotation", 0, 0); api.key("#" + a.id + "-dau", "rotation", tu0, 0, "none");
      api.key("#" + a.id + "-dau", "rotation", tu0 + 0.5, 52, "power2.inOut");
      for (var td = tu0 + 0.8, dn = true; td < tu1 - 0.4; td += 0.5, dn = !dn) api.key("#" + a.id + "-dau", "rotation", td, dn ? 46 : 54, "sine.inOut");
      api.key("#" + a.id + "-dau", "rotation", tu1, a.o ? 50 : 0, "power2.inOut");
    } else {   // tay trái cầm dây/càng xe; đầu quay nhìn đàn; nghỉ ở 'rest': phủi tuyết khỏi vai
      api.origin("#" + a.id + "-tayT", "-22 -150"); api.origin("#" + a.id + "-dau", "0 -170");
      api.key("#" + a.id + "-tayT", "rotation", 0, a.id === "h1" ? 40 : 30);
      api.key("#" + a.id + "-dau", "rotation", 0, 0);
      if (a.id === "h0") {
        api.key("#h0-dau", "rotation", tRest - 0.2, 0, "none"); api.key("#h0-dau", "rotation", tRest + 0.1, -10, "sine.out"); api.key("#h0-dau", "rotation", tl - 0.2, -10, "none"); api.key("#h0-dau", "rotation", tl, 0, "sine.inOut");
        for (var pb = 0; pb < 3; pb++) { api.key("#h0-tay", "rotation", tRest + 0.2 + pb * 0.3, -150, "sine.inOut"); api.key("#h0-tay", "rotation", tRest + 0.35 + pb * 0.3, -120, "sine.inOut"); }
        api.key("#h0-tay", "rotation", tRest + 1.3, 0, "sine.inOut");
      }
    }
  });

  // ---- lều bật dựng (lều to ở lớp gần, chắn vòng đèn), rồi thành nhà gỗ ----
  var tLeuTo = tStop - 0.3, tLeu1 = tCamp - 0.72, tLeu2 = tCamp - 0.31;
  api.origin("#leuTo", "0 0"); api.origin("#nhaTo", "0 0");
  // người chăn xuất hiện, dựng cọc, quấn bạt (0,6 s), bước khuất sau lều
  var tB0 = tLeuTo - 0.9;
  api.show("#xt2g", 0, 0); api.show("#xt2g", tB0 - 0.35, 1); api.show("#xt2g", tOver, 0);
  [["#hd1", 260, -120, "hd1m"], ["#hd2", 320, -200, "hd2m"]].forEach(function (h, j) {   // tới từ phải (ngoài vòng đèn), dựng xong bước khuất sau lều
    api.origin(h[0], "0 0");
    api.key(h[0], "x", 0, h[1]); api.key(h[0], "x", tB0 - 0.35, h[1], "none"); api.key(h[0], "x", tB0, 0, "power2.out");
    api.key(h[0], "x", tLeuTo + 0.1, 0, "none"); api.key(h[0], "x", tLeuTo + 0.5, h[2], "power1.inOut");
    api.show(h[0], 0, 0); api.show(h[0], tB0 - 0.35, 1); api.show(h[0], tOver, 0);
    api.origin("#" + h[3] + "-tay", "22 -150"); api.origin("#" + h[3] + "-tayT", "-22 -150");
    api.key("#" + h[3] + "-tay", "rotation", 0, 0); api.key("#" + h[3] + "-tayT", "rotation", 0, 0);
    var A = "#" + h[3] + "-tay", B = "#" + h[3] + "-tayT", t1 = tLeuTo + 0.1;
    if (!j) {   // đóng cọc: tay trái giữ cọc, tay phải nện búa gỗ
      api.key(B, "rotation", tB0, 0, "none"); api.key(B, "rotation", tB0 + 0.15, 140, "power2.out"); api.key(B, "rotation", t1, 140, "none"); api.key(B, "rotation", t1 + 0.2, 0, "power2.inOut");
      api.key(A, "rotation", tB0, 0, "none");
      for (var hb = tB0 + 0.15, up = true; hb < t1; hb += 0.14, up = !up) api.key(A, "rotation", hb, up ? -150 : -95, up ? "power2.out" : "power3.in");
      api.key(A, "rotation", t1 + 0.2, 0, "power2.inOut");
    } else {    // cúi buộc dây xe trượt
      api.origin("#hd2c", "0 0");
      api.key("#hd2c", "rotation", 0, 0); api.key("#hd2c", "rotation", tB0, 0, "none"); api.key("#hd2c", "rotation", tB0 + 0.2, 16, "power2.out");
      api.key("#hd2c", "rotation", t1, 16, "none"); api.key("#hd2c", "rotation", t1 + 0.2, 0, "power2.inOut");
      api.key(A, "rotation", tB0, 0, "none"); api.key(B, "rotation", tB0, 0, "none");
      for (var tb2 = tB0 + 0.2, k2 = 0; tb2 < t1; tb2 += 0.16, k2++) { api.key(A, "rotation", tb2, k2 % 2 ? -40 : -12, "sine.inOut"); api.key(B, "rotation", tb2, k2 % 2 ? -50 : -24, "sine.inOut"); }
      api.key(A, "rotation", t1 + 0.2, 0, "power2.inOut"); api.key(B, "rotation", t1 + 0.2, 0, "power2.inOut");
    }
  });
  api.origin("#cocTo", "0 0"); api.pop("#cocTo", tB0 + 0.1, 0.25, tOver - 0.1);
  api.key("#leuTo", "scaleX", 0, 0); api.key("#leuTo", "scaleX", tLeuTo - 0.25, 0, "none"); api.key("#leuTo", "scaleX", tLeuTo + 0.1, 1, "back.out(1.6)");
  api.key("#leuTo", "scaleX", tOver - 0.1, 1, "none"); api.key("#leuTo", "scaleX", tOver + 0.05, 0, "power2.in");
  api.pop("#nhaTo", tOver, 0.32);
  api.sfx("pop", tLeuTo, 0.55);
  var tNha = [tPerm + 0.05, tGrew - 0.05, tGrew + 0.35, tVill + 0.05];
  [1, 2].forEach(function (i, j) { api.origin("#leu" + i, "0 0"); api.pop("#leu" + i, j ? tLeu2 : tLeu1, 0.25, tNha[i] - 0.1); });
  api.sfx("pop", tLeu1, 0.35); api.sfx("pop", tLeu2, 0.35);
  NHA_LANG.forEach(function (h, i) {
    api.origin("#nha" + i, "0 0"); api.pop("#nha" + i, tNha[i], 0.3);
    api.key("#kl" + i, "opacity", 0, 0); api.key("#kl" + i, "opacity", tNha[i] + 0.2, 0, "none"); api.key("#kl" + i, "opacity", tNha[i] + 0.9, 0.85, "power1.out");
  });
  api.sfx("pop", tGrew - 0.05, 0.45); api.sfx("pop", tVill + 0.05, 0.45);
  // đàn quá khứ tan cùng sepia (hiện tại không có đàn ở suối)
  ["#r0-o", "#r2-o"].forEach(function (s) { api.key(s, "opacity", 0, 1); api.key(s, "opacity", tSo, 1, "none"); api.key(s, "opacity", tSo + 0.7, 0, "power1.in"); });

  // ---- camera (lấy mẫu 0,1 s tới lúc đổi sang phần 2, để biết toạ độ màn hình của chùm đèn) ----
  var CX2 = 1240, CY2 = 800, Z2 = 1.7, tSwap = tMid - 0.05;
  var WP = [
    [0, 1120, 700, 1.05], [tIf, 1160, 700, 1.2], [tOpen - 0.1, 1900, 650, 0.66], [tOpen + 0.05, 1890, 650, 0.66],
    [tPoint + 0.3, XSP, 800, 1.75], [tOver, XSP + 10, 800, 1.8], [tVill - 0.3, 1250, 700, 1.0], [tApp - 0.1, 1240, 700, 1.05],
    [tSwap - 0.15, CX2, CY2, Z2], [tSwap + 0.2, CX2, CY2, Z2]
  ];
  function camAt(t) {
    for (var i = 1; i < WP.length; i++) if (t <= WP[i][0]) {
      var a = WP[i - 1], b = WP[i], u = sm((t - a[0]) / (b[0] - a[0]));
      return [lerp(a[1], b[1], u), lerp(a[2], b[2], u), lerp(a[3], b[3], u)];
    }
    var l = WP[WP.length - 1]; return [l[1], l[2], l[3]];
  }
  function man(x, y, t) { var c = camAt(t); return [960 + (x - c[0]) * c[2], 540 + (y - c[1]) * c[2], c[2]]; }
  var keys = [];
  for (var tk = 0; tk <= tSwap + 0.2 + 1e-6; tk += 0.1) { var cc = camAt(tk); keys.push([tk, cc[0], cc[1], cc[2], "none"]); }
  keys.push([tFreeze - 0.6, XSP - 20, 830, 1.7, "power2.inOut"]);           // cận suối vẫn chảy, bốc hơi
  keys.push([tDip - 0.2, XSP - 40, 830, 1.78, "sine.inOut"]);
  keys.push([tDip + 0.6, XW + 70, 800, 1.95, "power2.inOut"]);
  keys.push([tSlosh, XW + 40, 790, 2.1, "sine.inOut"]);
  keys.push([tSlosh + 0.6, XW + 10, 760, 2.45, "power2.out"]);
  keys.push([DUR, XW + 8, 756, 2.6, "sine.inOut"]);
  api.camera(keys);

  // ---- chùm đèn: tâm vòng sáng (toạ độ thế giới) và bán kính (px màn hình) theo thời gian ----
  var r1 = DAN[2];
  function vongAt(t) {
    var spr = [XSP, MAT - 10], wx, wy, R;
    if (t < tSpr) { var hx = xDan(DAN[0], t) + 80; wx = lerp(hx, spr[0], sm((t - (tSpr - 0.8)) / 0.8)); wy = MAT - 40; R = lerp(170, 230, sm((t - (tSpr - 0.8)) / 0.8)); }
    else if (t < tIf + 0.3) { wx = spr[0] - 60; wy = spr[1] - 10; R = 260; }
    else if (t < tOpen - 0.1) { var u = sm((t - (tIf + 0.3)) / 0.6); wx = lerp(spr[0] - 60, xDan(r1, t) + 120, u); wy = lerp(spr[1] - 10, MAT - 60, u); R = lerp(260, 120, u); }   // chùm theo đàn, người chăn ở ngoài mép chùm
    else if (t < tPoint + 0.3) { var v = sm((t - (tOpen - 0.1)) / 0.45); wx = lerp(xDan(r1, t) + 120, spr[0], v); wy = lerp(MAT - 60, spr[1], v); R = lerp(120, 210, v); var w2 = sm((t - (tWhole - 0.4)) / 0.7); R = lerp(R, 460, w2); }
    else if (t < tLeuTo + 0.5) { wx = spr[0]; wy = spr[1]; R = lerp(460, 300, sm((t - (tB0 - 0.6)) / 0.5)); }   // thu vòng đèn quanh suối, người chăn ngoài vòng
    else if (t < tCamp + 0.7) { var q = sm((t - (tLeuTo + 0.5)) / 0.35) * (1 - sm((t - (tCamp + 0.1)) / 0.5)); wx = lerp(spr[0], spr[0] + 330, q); wy = lerp(spr[1], spr[1] - 40, q); R = lerp(300, 300, q); }
    else if (t < tOver) { wx = spr[0]; wy = spr[1]; R = lerp(300, 460, sm((t - (tCamp + 0.7)) / 0.5)); }
    else { var f = sm((t - tOver) / 1.6); wx = lerp(spr[0], spr[0] - 40, f); wy = lerp(spr[1], MAT - 80, f); R = lerp(460, 1100, f); }
    var s = man(wx, wy, t);
    return [s[0], s[1], R * (t < tOver ? 1 : 1)];
  }
  // tư thế người chiếu: rướn người khi lều chắn, nghiêng đầu ở 'curiosity'
  function leanAt(t) { return 8 * sm((t - (tLeuTo + 0.47)) / 0.25) * (1 - sm((t - (tCamp + 0.1)) / 0.4)); }
  function upRotAt(t) { return 7 * sm((t - (tCur - 0.1)) / 0.25) * (1 - sm((t - (tCur + 0.8)) / 0.3)); }
  function local2man(px, py, t) {     // điểm toạ độ gốc 400×400 của P → màn hình (bỏ qua thở)
    var ur = upRotAt(t) * Math.PI / 180, dx = px - 200, dy = py - 290;
    var x1 = 200 + dx * Math.cos(ur) - dy * Math.sin(ur), y1 = 290 + dx * Math.sin(ur) + dy * Math.cos(ur);
    var x2 = (x1 - 200) * PS, y2 = (y1 - 392) * PS, lr = leanAt(t) * Math.PI / 180;
    return [PX + x2 * Math.cos(lr) - y2 * Math.sin(lr), PY + x2 * Math.sin(lr) + y2 * Math.cos(lr)];
  }
  function aimAt(t) {   // góc tay phải (aRu, aRf = 0) cho đèn chĩa vào vòng sáng; trả [u, ống kính màn hình]
    var S = vongAt(t), u = -125, L;
    for (var it = 0; it < 3; it++) {
      var ar = u * Math.PI / 180, d = [-Math.sin(ar), Math.cos(ar)];
      L = local2man(312 + d[0] * 162, 210 + d[1] * 162, t);
      var th = Math.atan2(S[1] - L[1], S[0] - L[0]) * 180 / Math.PI - leanAt(t) - upRotAt(t);
      u = Math.max(-150, Math.min(-60, th - 90));
    }
    return [u, L, S];
  }
  var tOn = 0.06;
  P.set(0, { x: PX, y: PY, size: PS, lashes: 1, ice: 1, aLu: 18, aLf: -10, aRf: 0, pupX: 10, pupY: -2 });
  for (var ta = 0; ta <= tOff + 1e-6; ta += 0.1) {
    var A = aimAt(ta);
    api.key("#P-aRu", "rotation", ta, A[0], "none");
    api.key("#P-sq", "rotation", ta, leanAt(ta), "none");
    api.key("#P-up", "rotation", ta, upRotAt(ta), "none");
  }
  api.set("#P-chai", 0, { opacity: 0 });
  var nodes = null;
  api.moiKhung(function (t) {
    if (!nodes) nodes = ["mNon", "mVong", "chumNon", "chumVong"].map(function (i) { return document.getElementById(i); });
    if (t > tOff + 0.1 || t < tOn - 0.02) return;
    var A = aimAt(t), L = A[1], S = A[2], R = S[2], dx = S[0] - L[0], dy = S[1] - L[1], n = Math.hypot(dx, dy) || 1, px = -dy / n * R, py = dx / n * R * 0.6;
    var d = "M " + (L[0] - py * 0.04).toFixed(1) + " " + (L[1] + px * 0.04).toFixed(1) + " L " + (S[0] + px).toFixed(1) + " " + (S[1] + py).toFixed(1) +
      " L " + (S[0] - px).toFixed(1) + " " + (S[1] - py).toFixed(1) + " Z";
    for (var i = 0; i < 4; i += 2) if (nodes[i]) nodes[i].setAttribute("d", d);
    for (var j = 1; j < 4; j += 2) if (nodes[j]) { nodes[j].setAttribute("cx", S[0].toFixed(1)); nodes[j].setAttribute("cy", S[1].toFixed(1)); nodes[j].setAttribute("rx", R.toFixed(1)); nodes[j].setAttribute("ry", (R * 0.62).toFixed(1)); }
  }, { twos: true });
  // bật / tắt đèn
  api.show("#flP-den", 0, 0); api.show("#flP-den", tOn, 1); api.show("#flP-den", tOff, 0);
  api.key("#chum", "opacity", 0, 0); api.key("#chum", "opacity", tOn, 0, "none"); api.key("#chum", "opacity", tOn + 0.05, 1, "power2.out");
  api.key("#chum", "opacity", tOff, 1, "none"); api.key("#chum", "opacity", tOff + 0.05, 0, "power2.in");
  api.key("#toi", "opacity", 0, 0); api.key("#toi", "opacity", tOn, 0, "none"); api.key("#toi", "opacity", tOn + 0.08, 0.32, "power2.out");
  api.key("#toi", "opacity", tOver + 0.3, 0.32, "none"); api.key("#toi", "opacity", tOver + 1.8, 0.14, "sine.inOut");
  api.key("#toi", "opacity", tOff, 0.14, "none"); api.key("#toi", "opacity", tOff + 0.1, 0, "power2.in");
  api.sfx("pop", tOn, 0.5); api.sfx("pop", tOff, 0.45);
  // sepia rút đi từ trái sang phải như tờ giấy cũ bị kéo đi
  api.key("#giayCu", "opacity", 0, 0); api.key("#giayCu", "opacity", tOff, 0, "none"); api.key("#giayCu", "opacity", tOff + 0.05, 1, "none");
  api.key("#giayCu", "x", 0, -40); api.key("#giayCu", "x", tOff, -40, "none"); api.key("#giayCu", "x", tMau1, 1980, "power1.inOut");
  api.sfx("whoosh", tOff + 0.1, 0.3);

  // ---- diễn của người chiếu ----
  P.mouth(0, "X");
  P.breathe(0, tApp, 2.5);
  P.blinkAt(tRest + 0.2); P.blinkAt(tFrozen + 0.5); P.blinkAt(tGrew + 0.6);
  P.pose(tIf + 0.4, 0.4, { pupX: 13, pupY: -4 }, "power2.inOut");
  P.pose(tOpen, 0.25, { pupX: 8, pupY: 0 }, "power2.out");
  P.mouth(tCur, "smirk"); P.mouth(tCur + 0.9, "X");
  P.pose(tPoint - 0.08, 0.1, { upY: 12 }, "power2.in"); P.pose(tPoint + 0.04, 0.2, { upY: 0 }, "back.out(2)");   // gật đầu ở 'point'
  P.pose(tLeuTo + 0.02, 0.06, { eye: 1.15 }, "power2.out");                  // khựng 4 khung khi lều bật dựng chắn đèn
  P.mouth(tLeuTo + 0.05, "o");
  P.pose(tCamp + 0.4, 0.25, { eye: 1 }, "power2.out"); P.mouth(tCamp + 0.4, "X");
  P.pose(tOver + 0.1, 0.3, { eye: 1.18, pupY: -6 }, "back.out(2)"); P.mouth(tOver + 0.15, "o");
  P.pose(tVill + 0.4, 0.3, { eye: 1.05 }, "power2.out"); P.mouth(tVill + 0.4, "grin");
  // tắt đèn, cất đèn vào ba lô, rút chai nước, lắc thử: cứng đơ
  P.pose(tOff + 0.15, 0.35, { aRu: -18, aRf: 10, pupX: 4, pupY: 0 }, "power2.inOut");
  P.mouth(tOff + 0.2, "X");
  P.pose(tDesp - 0.35, 0.3, { aRu: 40, aRf: -140, pupX: 14 }, "power2.inOut");   // với ra sau ba lô
  api.key("#P-fl", "opacity", 0, 1); api.key("#P-fl", "opacity", tDesp - 0.02, 1, "none"); api.key("#P-fl", "opacity", tDesp, 0, "none");
  api.key("#P-chai", "opacity", tDesp + 0.1, 0, "none"); api.key("#P-chai", "opacity", tDesp + 0.12, 1, "none");
  api.sfx("pop", tDesp + 0.1, 0.3);
  P.pose(tDesp + 0.15, 0.3, { aRu: -40, aRf: -40, pupX: 12, pupY: 6 }, "back.out(1.6)");
  for (var sk = 0; sk < 4; sk++) P.pose(tDesp + 0.5 + sk * 0.12, 0.1, { aRf: sk % 2 ? -20 : -60 }, "sine.inOut");
  P.pose(tDesp + 1.0, 0.2, { lid: 22 }, "power2.out"); P.mouth(tDesp + 1.0, "flat");
  // bước 3 bước xuống bờ suối: từ lớp khung sang đúng toạ độ màn hình của Wob ở lớp thế giới, rồi đổi sang M
  var tgX = 960 + (XW - CX2) * Z2, tgY = 540 + (FYs - CY2) * Z2, tW0 = tApp - 0.05, tW1 = tSwap - 0.35;
  P.pose(tW0 - 0.1, 0.2, { aRu: -28, aRf: 6, lid: 0, pupX: 10, pupY: 10 }, "power2.out");
  P.walk(tW0, tW1, PX, tgX, { step: (tW1 - tW0) / 3, arms: false, tieng: true });
  api.key("#P", "y", tW0, PY, "none"); api.key("#P", "y", tW1, tgY, "sine.inOut");
  P.pose(tW0, tW1 - tW0, { size: 0.7 * Z2 }, "sine.inOut");
  P.pose(tW1 + 0.02, 0.22, { legLs: 0.5, legRs: 0.5, legL: 18, legR: -18, sy: 0.94 }, "power2.out");
  P.set(0, { op: 1 }); P.set(tSwap, { op: 0 });
  // ---- Wob phần 2 (lớp thế giới) ----
  M.set(0, { x: XW, y: FYs, size: 0.0001, op: 1, lashes: 1, ice: 1, legLs: 0.5, legRs: 0.5, legL: 18, legR: -18, sy: 0.94,
    aLu: 18, aLf: -10, aRu: -28, aRf: 6, pupX: 10, pupY: 10 });
  M.set(tSwap, { size: 0.7 });
  api.set("#nuocMat", 0, { opacity: 0 });
  api.origin("#chaiXoay", "0 0");
  M.mouth(0, "X");
  M.idle(tSwap + 0.1, tDip - 0.4, { seed: 111, bien: 1.6 });
  M.pose(tSwap + 0.3, 0.4, { pupX: 12, pupY: 14, lean: 4 }, "power2.inOut");   // nhìn xuống suối bốc hơi
  M.mouth(tFreeze - 0.3, "smirk");
  // nhúng chai, lắc lắc
  M.pose(tDip - 0.2, 0.35, { aRu: -8, aRf: -6, lean: 10, upY: 8 }, "power2.inOut");
  api.sfx("hoi-nuoc", tDip + 0.2, 0.35);
  M.pose(tDip + 0.9, 0.25, { aRu: -40, aRf: -30, lean: 2, upY: 0 }, "back.out(1.6)");
  for (var sh = 0; sh < 6; sh++) M.pose(tDip + 1.2 + sh * 0.13, 0.12, { aRf: sh % 2 ? -10 : -50 }, "sine.inOut");
  M.pose(tDip + 1.2, 0.25, { pupX: 14, pupY: 0 }, "power2.out");
  // óc ách! lõi đá tan, mặt nước sóng sánh
  api.origin("#chai-bang", "0 4");
  api.key("#chai-bang", "scaleY", 0, 1); api.key("#chai-bang", "scaleY", tSlosh - 0.2, 1, "none"); api.key("#chai-bang", "scaleY", tSlosh + 0.1, 0.22, "power2.out");
  api.origin("#chai-mat", "0 0");
  api.key("#chai-mat", "rotation", 0, 0);
  for (var sl = 0, sg = 1; sl < 14; sl++, sg = -sg) api.key("#chai-mat", "rotation", tSlosh - 0.15 + sl * 0.14, sg * 22 * Math.exp(-sl * 0.12), "sine.inOut");
  api.sfx("bonk", tSlosh - 0.12, 0.2);
  M.soc(tSlosh, { giuMat: true, mieng: "o" });
  // ôm chai vào lòng như ôm thú cưng, mắt rưng rưng
  var tHug = tSlosh + 0.55;
  M.pose(tHug, 0.35, { aRu: 40, aRf: 76, aLu: -40, aLf: -76, lean: -3, upRot: -4, pupX: 0, pupY: 6, eye: 1.08 }, "back.out(1.4)");
  api.key("#chaiXoay", "rotation", 0, 0); api.key("#chaiXoay", "rotation", tHug, 0, "none"); api.key("#chaiXoay", "rotation", tHug + 0.35, -112, "power2.inOut");
  M.mouth(tHug + 0.1, "grin");
  api.sfx("liu-lo-vui", tHug + 0.05, 0.55);
  api.key("#nuocMat", "opacity", tHug + 0.3, 0, "none"); api.key("#nuocMat", "opacity", tHug + 0.6, 1, "power1.out");
  api.key("#nuocMat", "y", 0, 0); api.key("#nuocMat", "y", tHug + 0.6, 0, "none"); api.key("#nuocMat", "y", DUR, 16, "sine.in");
  M.lid(tHug + 0.2, 0.3, 30);
  for (var sw = tHug + 0.5, s2 = 1; sw < DUR - 0.2; sw += 0.6, s2 = -s2) M.pose(sw, 0.55, { upRot: s2 * 5 - 1 }, "sine.inOut");   // đung đưa ru chai
  M.breathe(0, DUR, 2.3);
  M.autoBlink(tSwap + 0.5, tDip - 0.5, 112);
};
