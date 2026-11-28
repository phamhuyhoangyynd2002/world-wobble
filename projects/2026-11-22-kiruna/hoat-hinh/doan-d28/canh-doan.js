/* Đoạn d28 · cắt giấy · tháng 8: dự báo mới của LKAB.
   A: tờ lịch bóc trước nhà thờ đỏ đã đỗ, Wob xé đúng tám trang trống. B: hội trường, người que KHÔNG mặt quay lưng, bản đồ dự báo (lưới phố trừu tượng,
   không chữ) ghim lên bảng đúng "forecast."; tiền cảnh vai người; vùng sọc lan về phía đông, phủ ô nhà có cửa gỗ ở "homes"; Wob kiễng chân sau đám đông,
   người bên cạnh lặng lẽ dịch sang nhường chỗ. C: Wob tháo kính, thẻ "~12,000 people · ~5,400 homes" ở "twelve". D: vỉa hè nhìn ra thị trấn, hai phần ba mái nhà
   bật thùng các-tông từ "two thirds" tới "itself."; Wob tháo chùm chìa khỏi quai, cầm trước ngực, nhìn các mái có thùng, im ≥ 1,5 s; camera đẩy chậm vào
   một nhà nhỏ trong vùng sọc, Wob nghiêng đầu. Không gag (đoạn nghiêm). Vào "giay", ra "cat". Chữ: chỉ chu_tren_do_vat. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tLKAB = T("lkab", 0, 2.763), tFore = T("forecast.", 0, 3.95), tAbout = T("about", 0, 5.0), tHomes = T("homes", 0, 8.65), tAlt = T("altogether,", 0, 12.025),
    tTwelve = T("twelve", 0, 15.588), tHomes2 = T("homes", 1, 18.5), tThat = T("that's", 0, 19.312), tTwo = T("two", 1, 19.9), tTown = T("itself.", 0, 20.94),
    tI = T("i", 0, 21.312), tHeld = T("held", 0, 21.5), tSo = T("so", 0, 24.025), tHouse = T("house", 0, 24.95);
  var tA1 = tLKAB - 0.06, tD = tThat - 0.02;

  // =================== D (lớp có thị sai): vỉa hè nhìn ra thị trấn ===================
  var GD = 985;
  var troi = '<rect x="-300" y="-300" width="2520" height="1680" fill="url(#krHe)"/>' + at(420, 180, KR.may(240, 2801)) + at(1520, 140, KR.may(200, 2802));
  var xa = KR.nuiXa(-700, 2600, 770, 110, "#B7C9B0", 2811);
  xa += paper("M -380 770 L -210 560 L 160 545 L 330 770 Z", "#8E8A84", { shadow: false }) + line("M -250 610 L 180 600 M -300 670 L 240 662 M -340 728 L 290 722", 4, "#6F6B66", ' opacity="0.7"');
  xa += '<rect x="-800" y="766" width="3600" height="600" fill="' + M.coSang + '"/>';
  // thị trấn: hai hàng nhà; vùng sọc mờ trên nền dưới các nhà phía tây
  var gi = '<rect x="-800" y="780" width="3600" height="600" fill="' + M.co + '"/>';
  gi += '<path d="M 470 772 L 1560 772 L 1600 900 L 430 900 Z" fill="url(#krSoc)" opacity="0.75"/>' + line("M 470 772 L 1560 772 L 1600 900 L 430 900 Z", 4, "#A8322A", ' stroke-dasharray="16 12" opacity="0.6"');
  var nha = [], thung = [];
  function themNha(x, y, sc, w, h, mau, mai, cua, sd, coThung) {
    var id = "n" + nha.length;
    gi += '<g id="' + id + '">' + at(x, y, KR.nhaGo({ w: w, h: h, mau: mau, mai: mai, cua: cua, sd: sd }), sc) + "</g>";
    if (coThung) {
      var bx = x, by = y - (h + w * 0.42) * sc + 14 * sc, tid = "th" + thung.length;
      gi += '<g id="' + tid + '">' + at(bx, by, KR.thungGiay(76, sd + 40), sc) + "</g>";
      thung.push({ id: tid, x: bx, y: by });
    }
    nha.push(id);
  }
  var hauBox = [1, 1, 0, 1, 1, 0, 1, 1, 0], truocBox = [1, 0, 1, 1, 1, 0, 1, 1];
  for (var i = 0; i < 9; i++) themNha(560 + i * 160, 790, 0.62, 190, 150, M.nha[(i * 2 + 1) % 6], M.mai[i % 3], false, 2820 + i * 11, hauBox[i]);
  var nhaDich = null;
  for (var j = 0; j < 8; j++) {
    var laDich = j === 3;
    themNha(520 + j * 196, 880, 0.8, laDich ? 170 : 200, laDich ? 140 : 155, laDich ? M.nha[3] : M.nha[j % 6], M.mai[(j + 1) % 3], laDich, 2920 + j * 13, truocBox[j]);
    if (laDich) nhaDich = [520 + j * 196, 880];
  }
  var gan = '<rect x="-800" y="935" width="3600" height="600" fill="#CFC8BA"/>' + paper(rRect(-800, 922, 3600, 24, 2, 2861), "#B5AD9E", { shadow: false });
  for (var g2 = -6; g2 < 18; g2++) gan += line("M " + (g2 * 170) + " 950 L " + (g2 * 170 - 40) + " 1100", 3, "#A9A193", ' opacity="0.7"');
  gan += at(150, 940, line("M 0 0 L 0 -520", 14) + line("M 0 0 L 0 -520", 8, "#4A5450") + paper(rRect(-34, -560, 68, 44, 2, 2862), "#4A5450", { stroke: true, sw: 4, shadow: false }) + '<rect x="-24" y="-524" width="48" height="10" fill="#FFE6A8"/>');
  var rR = '<g id="rR">' + KR.chumChia("rRi", { kr: true }) + "</g>";
  var W = KR.wob(api, "W", { mua: "he", chum: "kr", kinh: 0, holdR: rR });
  gan += W.svg;

  // =================== A: tờ lịch bóc trước nhà thờ ===================
  var CX = 650, CY = 560;   // đỉnh bảng lịch
  var a = '<g id="sA"><g id="sAk">';
  a += '<rect x="-800" y="-600" width="3600" height="2400" fill="url(#krHe)"/>' + at(1500, 200, KR.may(220, 2871));
  a += KR.nuiXa(-700, 2600, 800, 90, "#B7C9B0", 2872) + '<rect x="-800" y="796" width="3600" height="900" fill="' + M.co + '"/>';
  a += at(1220, 905, KR.romooc("rmA", 820), 0.72) + at(1220, 905 - 64 * 0.72, KR.nhaTho("ntA"), 0.72);
  a += at(1640, 905, KR.thapChuong("thA"), 0.72);
  // giá lịch
  a += line("M " + (CX - 90) + " " + (CY + 280) + " L " + (CX - 120) + " 905 M " + (CX + 90) + " " + (CY + 280) + " L " + (CX + 120) + " 905", 12) +
    line("M " + (CX - 90) + " " + (CY + 280) + " L " + (CX - 120) + " 905 M " + (CX + 90) + " " + (CY + 280) + " L " + (CX + 120) + " 905", 6, M.goSang);
  a += paper(rRect(CX - 130, CY, 260, 300, 2, 2873), M.go, { stroke: true, sw: 5, sx: 6, sy: 8 });
  a += paper(rRect(CX - 118, CY + 22, 236, 262, 1.5, 2874), "#E8DCC4", { stroke: true, sw: 3, shadow: false });   // trang cuối (còn lại)
  a += paper(rRect(CX - 118, CY + 22, 236, 46, 1, 2875), "#C9463A", { shadow: false });
  var trang = [];
  for (var p = 0; p < 8; p++) {
    var pid = "tr" + p;
    a += '<g id="' + pid + '">' + paper(rRect(CX - 118, CY + 22, 236, 262, 1.5, 2880 + p), p % 2 ? "#FBF5E8" : "#F6EEDC", { stroke: true, sw: 3, shadow: false }) +
      paper(rRect(CX - 118, CY + 22, 236, 46, 1, 2890 + p), "#C9463A", { shadow: false }) + line("M " + (CX - 90) + " " + (CY + 120) + " L " + (CX + 90) + " " + (CY + 120), 3, "#D8CCB4") + "</g>";
    trang.push(pid);
  }
  for (var r = -1; r <= 1; r++) a += '<rect x="' + (CX + r * 70 - 6) + '" y="' + (CY + 8) + '" width="12" height="30" rx="6" fill="#B8BDC2" stroke="' + INK + '" stroke-width="3"/>';
  var Wa = KR.wob(api, "Wa", { mua: "he", chum: "kr" });
  a += Wa.svg + "</g></g>";

  // =================== B/C: hội trường ===================
  var BX = 520, BY = 120, BW = 880, BH = 580, MX = 600, MY = 170, MW = 720, MHt = 380;
  var h = '<g id="sH"><g id="sHk">';
  h += '<rect x="-800" y="-600" width="3600" height="2400" fill="#D9CDB4"/><rect x="-800" y="-600" width="3600" height="2400" fill="url(#half)" opacity="0.06"/>';
  h += '<rect x="-800" y="760" width="3600" height="900" fill="#B89A72"/>' + line("M -800 760 L 2800 760", 6, "#8E7250");
  for (var wl = -4; wl < 22; wl++) h += line("M " + (wl * 120) + " 766 L " + (wl * 120) + " 1600", 3, "#A2865E", ' opacity="0.6"');
  h += at(160, 420, '<ellipse cx="0" cy="0" rx="260" ry="200" fill="url(#krDen)"/>');
  // bảng ghim gỗ + bản đồ
  h += paper(rRect(BX, BY, BW, BH, 2, 2901), M.goToi, { stroke: true, sw: 5, sx: 6, sy: 8 }) + paper(rRect(BX + 18, BY + 18, BW - 36, BH - 36, 1.5, 2902), "#C49A68", { shadow: false });
  var mp = "";
  mp += paper(rRect(0, 0, MW, MHt, 1.5, 2903), "#F3EBDA", { stroke: true, sw: 4, shadow: false });
  mp += paper("M 14 30 L 70 14 L 104 60 L 96 360 L 14 366 Z", "#A39C90", { stroke: true, sw: 3, shadow: false }) + line("M 22 110 L 92 106 M 20 190 L 96 186 M 20 270 L 96 266", 3, "#8A8378");   // mỏ phía tây
  var cot = [];
  for (var c = 1; c < 8; c++) for (var rw = 0; rw < 4; rw++) {
    var bx0 = 22 + c * 86, by0 = 22 + rw * 88;
    mp += paper(rRect(bx0, by0, 72, 74, 1, 2910 + c * 7 + rw), ["#E2CFA8", "#D6C39C", "#E8D8B6"][(c + rw) % 3], { stroke: true, sw: 2.5, shadow: false });
  }
  // ô nhà có cửa gỗ (cột 5, hàng 2)
  var DX = 22 + 5 * 86 + 36, DY = 22 + 2 * 88 + 62;
  mp += at(DX, DY, KR.nhaGo({ w: 52, h: 40, mau: M.nha[3], mai: M.mai[0], cua: true, sd: 2940 }));
  // vùng sọc: cột 1–2 có sẵn, cột 3–5 lan dần
  for (var sc2 = 1; sc2 <= 5; sc2++) {
    var x0 = 22 + sc2 * 86 - 8;
    var z = '<rect x="' + x0 + '" y="14" width="88" height="352" fill="url(#krSoc)"/>' + line("M " + x0 + " 14 L " + x0 + " 366", 0.1, "none");
    mp += '<g id="soc' + sc2 + '">' + z + "</g>";
    cot.push("#soc" + sc2);
  }
  mp += '<path id="vienSoc" d="M 100 14 L 552 14 L 552 366 L 100 366 Z" fill="none" stroke="#A8322A" stroke-width="5" stroke-dasharray="18 12"/>';
  h += '<g id="mapB" transform="translate(' + MX + "," + MY + ')">' + mp + "</g>";
  h += '<g id="ghim">' + [[MX + 14, MY + 12], [MX + MW - 14, MY + 12], [MX + 14, MY + MHt - 12], [MX + MW - 14, MY + MHt - 12]].map(function (q, k) {
    return '<g id="gh' + k + '">' + at(q[0], q[1], '<circle r="11" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/><circle cx="-3" cy="-3" r="3" fill="#FFFFFF" opacity="0.7"/>') + "</g>";
  }).join("") + "</g>";
  h += '<g id="theB">' + at(960, 652, KR.the("theBi", CH[0], 46, { seed: 2950 })) + "</g>";
  // người trình bày (bên phải bảng) + hàng người xem phía trong
  h += at(1520, 900, KR.nguoi("ptb", { ao: "#4E5A66", da: M.da2 }), 0.85);
  var hang1 = [];
  [600, 745, 890, 1035, 1180, 1330].forEach(function (x, k) {
    h += at(x, 930, KR.nguoi("h1" + k, { ao: M.ao1[(k * 3 + 1) % 8], da: [M.da1, M.da2, M.da3][k % 3], sau: true, mu: k === 2 ? "#4F7A5A" : null }), 0.8);
    hang1.push("h1" + k);
  });
  var Wh = KR.wob(api, "Wh", { mua: "he", chum: "kr" });
  h += Wh.svg;
  // hàng người xem phía ngoài; "hx" là người lặng lẽ nhường chỗ
  [[330, 0], [1010, 2], [1300, 3], [1580, 4]].forEach(function (q) { h += at(q[0], 1000, KR.nguoi("h2" + q[1], { ao: M.ao1[(q[1] * 5 + 2) % 8], da: [M.da3, M.da1, M.da2][q[1] % 3], sau: true })); });
  h += '<g id="hx" transform="translate(690,1000)">' + KR.nguoi("hxi", { ao: "#8E5A4A", da: M.da1, sau: true }) + "</g>";
  h += "</g>";
  // tiền cảnh: vai người (thị sai 1,3)
  h += '<g id="sHf">' + at(260, 1090, '<path d="M -230 40 C -220 -90 -120 -150 0 -150 C 120 -150 220 -90 230 40 Z" fill="#2E3440"/><circle cx="0" cy="-230" r="110" fill="#3A3330"/>') +
    at(1460, 1110, '<path d="M -250 40 C -240 -100 -130 -160 0 -160 C 130 -160 240 -100 250 40 Z" fill="#3B4250"/><circle cx="0" cy="-250" r="118" fill="#2E2925"/>') + "</g>";
  h += "</g>";

  api.dat(KR.defs() + troi + api.lop("xa", xa, 0.35, { mat: 770 }) + api.lop("giua", gi, 0.7, { mat: 880 }) + api.lop("gan", gan, 1, { mat: 1000 }) + h + a);
  api.noi({});
  api.show(W.kr.chumQ, 0, 1);

  // =================== A ===================
  KR.cat(api, "#sA", 0, tA1);
  KR.camNhom(api, [["#sAk", 1]], [[0, 820, 650, 1.42], [tA1, 800, 656, 1.5, "sine.inOut"]]);
  var WAX = 420;
  Wa.set(0, { x: WAX, y: 905, size: 0.55, pupX: 12, pupY: 4 });
  Wa.mouth(0, "flat");
  var t0 = 0.6, dt = 0.235;
  trang.slice().reverse().forEach(function (pid, k) {
    var tg = t0 + k * dt, sel = "#" + pid;
    Wa.pose(tg - 0.11, 0.09, { aRu: -92, aRf: 64 }, "power2.out");                 // nắm góc trang
    Wa.pose(tg, 0.1, { aRu: -80, aRf: -120, upRot: k % 2 ? 2 : -2 }, "power2.in");   // giật lên
    api.origin(sel, CX + " " + (CY + 22));
    api.key(sel, "rotation", 0, 0); api.key(sel, "rotation", tg, 0, "none"); api.key(sel, "rotation", tg + 0.45, -38 - k * 3, "power1.out");
    api.key(sel, "x", 0, 0); api.key(sel, "x", tg, 0, "none"); api.key(sel, "x", tg + 0.45, -260 - (k % 3) * 40, "power1.out");
    api.key(sel, "y", 0, 0); api.key(sel, "y", tg, 0, "none"); api.key(sel, "y", tg + 0.2, -150, "power2.out"); api.key(sel, "y", tg + 0.45, -60 + (k % 2) * 40, "power1.in");
    api.key(sel, "opacity", 0, 1); api.key(sel, "opacity", tg + 0.2, 1, "none"); api.key(sel, "opacity", tg + 0.45, 0, "power1.in");
  });
  var tHet = t0 + 7 * dt + 0.15;
  Wa.pose(tHet, 0.3, { aRu: -18, aRf: 10, upRot: 0, pupX: 14, pupY: -6 }, "power2.inOut");   // nhìn sang nhà thờ
  Wa.mouth(tHet + 0.1, "flat");
  Wa.autoBlink(0, tA1, 2811);
  api.sfx("lat-giay", t0, 0.4); api.sfx("lat-giay", t0 + 4 * dt, 0.32);

  // =================== B/C: hội trường ===================
  KR.cat(api, "#sH", tA1, tD);
  var camH = [[0, 960, 470, 1.12], [tA1, 960, 470, 1.12, "none"], [tAbout - 0.04, 960, 452, 1.2, "sine.inOut"], [tAbout - 0.02, 860, 600, 1.34, "none"],
    [tAlt + 0.6, 920, 588, 1.42, "sine.inOut"], [tAlt + 1.9, 1000, 560, 1.34, "power2.inOut"], [tD, 1002, 556, 1.39, "sine.inOut"]];
  KR.camNhom(api, [["#sHk", 1]], camH);
  KR.camNhom(api, [["#sHf", 1.3]], camH);
  KR.cat(api, "#sHf", tAbout - 0.02, null);
  // bản đồ cuộn xuống rồi ghim đúng "forecast."
  api.origin("#mapB", MX + " " + MY);
  api.key("#mapB", "scaleY", 0, 0.02); api.key("#mapB", "scaleY", tFore - 0.6, 0.02, "none"); api.key("#mapB", "scaleY", tFore - 0.05, 1, "power2.out");
  api.show("#mapB", 0, 0); api.show("#mapB", tFore - 0.6, 1);
  for (var gk = 0; gk < 4; gk++) { api.origin("#gh" + gk, "0 0"); api.pop("#gh" + gk, tFore - 0.02 + gk * 0.05, 0.16); }
  api.sfx("lat-giay", tFore - 0.05, 0.3);
  api.origin("#ptb-tayR", "22 -150"); api.key("#ptb-tayR", "rotation", 0, 0); api.key("#ptb-tayR", "rotation", tFore - 0.7, 0, "none");
  api.key("#ptb-tayR", "rotation", tFore - 0.2, 150, "power2.out"); api.key("#ptb-tayR", "rotation", tAbout + 0.6, 150, "none"); api.key("#ptb-tayR", "rotation", tAbout + 1.2, 128, "sine.inOut");
  // vùng sọc: cột 1–2 có sẵn, 3–5 lan theo lời, cột 5 phủ ô cửa gỗ đúng "homes"
  var tSoc = [0, 0, tAbout + 1.2, tAbout + 2.5, tHomes - 0.12];
  cot.forEach(function (sel, k) {
    var x0 = MX + 22 + (k + 1) * 86 - 8;
    if (k < 2) return;
    api.origin(sel, (22 + (k + 1) * 86 - 8) + " 0");
    api.key(sel, "scaleX", 0, 0); api.key(sel, "scaleX", tSoc[k], 0, "none"); api.key(sel, "scaleX", tSoc[k] + 0.3, 1, "power2.out");
  });
  api.origin("#vienSoc", "100 0");
  api.key("#vienSoc", "scaleX", 0, 194 / 452); api.key("#vienSoc", "scaleX", tSoc[2], 194 / 452, "none"); api.key("#vienSoc", "scaleX", tSoc[2] + 0.3, 280 / 452, "power2.out");
  api.key("#vienSoc", "scaleX", tSoc[3], 280 / 452, "none"); api.key("#vienSoc", "scaleX", tSoc[3] + 0.3, 366 / 452, "power2.out");
  api.key("#vienSoc", "scaleX", tSoc[4], 366 / 452, "none"); api.key("#vienSoc", "scaleX", tSoc[4] + 0.3, 1, "power2.out");
  // người xem hàng trong: thở, nghiêng đầu nhẹ (lệch pha)
  hang1.forEach(function (id, k) {
    api.origin("#" + id + "-dau", "0 -190");
    for (var b = 0; b < 6; b++) api.key("#" + id + "-dau", "rotation", tA1 + 0.4 + k * 0.37 + b * 2.6, (b + k) % 2 ? 3 : -3, "sine.inOut");
  });
  // Wob sau đám đông
  var WHX = 600, WHY = 985;
  Wh.set(0, { x: WHX, y: WHY, size: 0.5, pupX: 12, pupY: -14 });
  Wh.mouth(0, "flat");
  Wh.idle(tA1, tAbout + 0.2, { seed: 281, bien: 1.2 });
  // kiễng chân hai lần, nghiêng ngó
  [tAbout + 0.3, tAbout + 1.4].forEach(function (tk, k) {
    api.key("#Wh", "y", tk, WHY, "none"); api.key("#Wh", "y", tk + 0.25, WHY - 26, "power2.out"); api.key("#Wh", "y", tk + 0.8, WHY - 26, "none"); api.key("#Wh", "y", tk + 1.0, WHY, "power2.in");
    Wh.pose(tk, 0.25, { sy: 1.08, sx: 0.95, legL: 6, legR: -6, lean: k ? 7 : -7, pupX: 14, pupY: -18 }, "power2.out");
    Wh.pose(tk + 0.8, 0.2, { sy: 1, sx: 1, legL: 0, legR: 0, lean: 0 }, "power2.in");
  });
  // người bên cạnh liếc xuống rồi dịch sang nhường chỗ
  var tNh = tAbout + 2.45;
  api.origin("#hxi-dau", "0 -190");
  api.key("#hxi-dau", "rotation", 0, 0); api.key("#hxi-dau", "rotation", tNh - 0.4, 0, "none"); api.key("#hxi-dau", "rotation", tNh - 0.1, -12, "power2.out"); api.key("#hxi-dau", "rotation", tNh + 0.5, 0, "sine.inOut");
  api.key("#hx", "x", 0, 690); api.key("#hx", "x", tNh, 690, "none"); api.key("#hx", "x", tNh + 0.75, 840, "sine.inOut");
  for (var hb = 0; hb < 4; hb++) api.key("#hx", "y", tNh + hb * 0.19, 1000 - (hb % 2 ? 0 : 8), "sine.inOut");
  api.key("#hx", "y", tNh + 0.8, 1000, "sine.out");
  Wh.pose(tNh + 0.2, 0.3, { pupX: 10, pupY: -6 }, "power2.out");
  Wh.walk(tNh + 0.55, tNh + 1.05, WHX, WHX + 70, { step: 0.25 });
  Wh.pose(tHomes - 0.2, 0.3, { pupX: 14, pupY: -20, upRot: -3 }, "power2.out");
  Wh.mouth(tHomes + 0.2, "o"); Wh.mouth(tHomes + 1.3, "flat");
  Wh.pose(tHomes + 0.25, 0.4, { lid: 10 }, "power2.out");
  // chạm khẽ chùm chìa trên quai rồi buông
  Wh.pose(tHomes + 1.6, 0.4, { aRu: 94, aRf: 130 }, "power2.inOut");
  Wh.pose(tHomes + 2.7, 0.4, { aRu: -18, aRf: 10 }, "power2.inOut");
  Wh.idle(tHomes + 0.4, tAlt, { seed: 282, bien: 1.0 });
  // tháo kính râm, cất vào túi
  Wh.pose(tAlt + 0.1, 0.28, { aRu: 98, aRf: 52, pupX: 0, pupY: 0, upRot: 0 }, "power2.inOut");
  api.show(Wh.kr.kinh, tAlt + 0.42, 0);
  Wh.pose(tAlt + 0.5, 0.3, { aRu: 9, aRf: 3, pupX: 14, pupY: -20 }, "power2.inOut");
  Wh.pose(tAlt + 1.1, 0.3, { aRu: -18, aRf: 10 }, "power2.inOut");
  // đọc thẻ: mắt chạy theo dòng chữ
  api.pop("#theB", tTwelve - 0.08, 0.26);
  api.origin("#theB", "960 652");
  Wh.pose(tTwelve + 0.15, 0.3, { pupX: 4, pupY: -12, lid: 0 }, "power2.out");
  Wh.pose(tTwelve + 0.6, 1.5, { pupX: 16, pupY: -12 }, "sine.inOut");
  Wh.pose(tHomes2 + 0.1, 0.25, { sy: 0.96, sx: 1.03, lid: 12 }, "power2.out");
  Wh.idle(tAlt + 1.4, tD, { seed: 283, bien: 0.9 });
  Wh.autoBlink(tA1, tD, 2821);

  // =================== D ===================
  api.camera([[0, 520, 790, 1.6], [tD, 520, 790, 1.6, "none"], [tD + 1.0, 1080, 640, 1.05, "sine.inOut"], [tI - 0.05, 1060, 650, 1.08, "sine.inOut"],
    [tI + 0.7, 900, 700, 1.18, "power2.inOut"], [tSo, 880, 702, 1.24, "sine.inOut"], [DUR, 930, 722, 1.38, "power1.inOut"]]);
  W.set(0, { x: 300, y: GD + 30, size: 0.8, pupX: 14, pupY: -10 });
  W.mouth(0, "flat");
  W.walk(tD + 0.05, tD + 0.55, 330, 430, { step: 0.25 });
  // thùng các-tông bật lên trên hai phần ba mái nhà
  var tb0 = tTwo, tb1 = tTown + 0.3;
  thung.forEach(function (o, k) {
    var tt = tb0 + (tb1 - tb0) * (k / (thung.length - 1));
    api.origin("#" + o.id, f1(o.x) + " " + f1(o.y));
    api.key("#" + o.id, "scale", 0, 0); api.key("#" + o.id, "scale", tt, 0, "none"); api.key("#" + o.id, "scale", tt + 0.24, 1, "back.out(2)");
  });
  W.pose(tb0 - 0.1, 0.3, { pupX: 4, pupY: -12 }, "power2.out");
  W.pose(tb0 + 0.4, 0.5, { pupX: 16, pupY: -10 }, "sine.inOut");
  W.pose(tb1, 0.3, { pupX: 12, pupY: -12, lid: 8 }, "power2.out");
  // tháo chùm chìa khỏi quai, cầm trước ngực
  api.show("#rR", 0, 0);
  W.pose(tI + 0.02, 0.3, { aRu: 94, aRf: 130, pupX: 6, pupY: 0 }, "power2.inOut");
  api.show(W.kr.chumQ, tHeld + 0.15, 0); api.show("#rR", tHeld + 0.15, 1);
  W.pose(tHeld + 0.2, 0.4, { aRu: 36, aRf: 52, aLu: -36, aLf: -52, pupX: 12, pupY: -12 }, "power2.inOut");
  KR.thong(api, W, "R", "#rR", 0, DUR, { goc: 0, lac: 0.8 });
  W.pose(tHeld + 0.9, 0.5, { lid: 14 }, "sine.inOut");
  W.idle(tD + 0.6, tSo, { seed: 284, bien: 0.8 });
  // "So what happens to a house in the way?": nghiêng đầu nhìn ngôi nhà nhỏ trong vùng sọc
  W.pose(tSo + 0.1, 0.5, { upRot: -8, pupX: 14, pupY: -6, lid: 6 }, "power2.inOut");
  W.pose(tHouse, 0.4, { lean: 2 }, "sine.inOut");
  W.autoBlink(tD, DUR, 2831);
};
