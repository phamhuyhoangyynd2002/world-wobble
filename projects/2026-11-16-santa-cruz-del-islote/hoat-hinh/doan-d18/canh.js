/* Đoạn d18 · cắt giấy · hồi ức: lối hẹp giữa hai dãy nhà một tầng (ban ngày, cùng màu tường d07).
   Vào "cat" (khung đầu đủ cảnh), ra "cat".
   Shot: Wob đặt cái bấm đếm còn bốc khói lên bậu cửa sổ → nhìn dọc lối, cửa mở → hai người hàng xóm nói chuyện qua khe lối
         (dây phơi tiền cảnh), đẩy chậm vào khe: ba lô rộng hơn lối → trẻ con chạy qua dưới ba lô Wob giơ cao
         → lia dọc tường: ba tranh tường (cá, sóng, thuyền) lần lượt hiện, cọ sơn tô nốt màu cuối.
   Trang phục: mũ cói; ôm ba lô khổng lồ trước ngực (bình xịt túi hông); cái bấm đếm đặt lên bậu ở nhịp đầu. Không chữ, không logo. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, B = window.NhietDoiB, at = api.at, DUR = api.DUR, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  var G = 900, K = 1.6;   // mặt lối; nhà NhietDoi.nha phóng ×1,6 (cửa cao ≈ 272 > Wob)

  // ---------- dãy nhà (cửa: vị trí -1..1 theo nửa bề ngang nhà) ----------
  var NHA = [
    { x: -322, mau: "#9FB6E8", cua: 0.4, mo: 0 },
    { x: 142, mau: "#F2A65A", cua: -0.5, mo: 1, so: 0 },
    { x: 606, mau: "#5FA8D3", cua: 0.62, mo: 1, so: 1 },     // nhà A (trái khe), cửa sổ có bậu
    { x: 1192, mau: "#F2CB57", cua: -0.62, mo: 1, so: 0 },   // nhà B (phải khe)
    { x: 1656, mau: "#EE9AAE", cua: -0.55, mo: 0, so: 0 },
    { x: 2120, mau: "#86CFB0", cua: 0.55, mo: 1, so: 0 },
    { x: 2584, mau: "#F3EFE4", cua: -0.55, mo: 1, so: 0 },
    { x: 3048, mau: "#F2A65A", cua: 0.45, mo: 1, so: 1 }
  ];
  function cuaX(h) { return h.x + h.cua * 145 * K; }
  var nha = "";
  NHA.forEach(function (h, i) {
    nha += at(h.x, G, sc(K, ND.nha({ w: 290, h: 230, mau: h.mau, seed: 1800 + i, cua: h.cua, cuaMo: !!h.mo, so: h.so == null ? 1 : h.so, mai: i % 3 === 1 ? "doc" : "hoi" })));
  });
  // cửa đóng phủ lên hai nhà, mở ra ở "Doors stand open" (gốc bản lề trái)
  var cuaDong = "";
  [1, 4].forEach(function (i, k) {
    var h = NHA[i], dw = 86 * K, dh = 170 * K, x = cuaX(h) - dw / 2;
    cuaDong += at(x, G, '<g id="cd' + k + '">' + D.paper(D.rRect(0, -dh, dw, dh, 1, 1850 + k), k ? "#2A9D8F" : "#C9463A", { stroke: true, sw: 5, shadow: false }) +
      D.line("M " + (dw / 3) + " " + (-dh + 10) + " L " + (dw / 3) + " -10 M " + (dw * 2 / 3) + " " + (-dh + 10) + " L " + (dw * 2 / 3) + " -10", 3, INK, ' opacity="0.35"') +
      '<circle cx="' + (dw - 18) + '" cy="' + (-dh * 0.5) + '" r="7" fill="#E3C27A" stroke="' + INK + '" stroke-width="2.5"/></g>');
    api.origin("#cd" + k, "0 0");
  });

  // ---------- khe lối giữa nhà A và nhà B (x 838–960): tường hai bên gần chạm nhau, cuối lối là biển ----------
  var L0 = 838, L1 = 960, VX = 899, top = G - 368;
  var khe = '<rect x="' + L0 + '" y="' + top + '" width="' + (L1 - L0) + '" height="' + (G - top) + '" fill="#3E5A5E"/>' +
    '<rect x="' + (VX - 16) + '" y="' + (G - 250) + '" width="32" height="196" fill="#BFE3E6"/><rect x="' + (VX - 16) + '" y="' + (G - 92) + '" width="32" height="38" fill="#36A9A6"/>' +
    '<path d="M ' + L0 + " " + top + " L " + (VX - 16) + " " + (G - 250) + " L " + (VX - 16) + " " + (G - 54) + " L " + L0 + " " + G + ' Z" fill="#79A6C9" stroke="' + INK + '" stroke-width="3"/>' +
    '<path d="M ' + L1 + " " + top + " L " + (VX + 16) + " " + (G - 250) + " L " + (VX + 16) + " " + (G - 54) + " L " + L1 + " " + G + ' Z" fill="#C9A94A" stroke="' + INK + '" stroke-width="3"/>' +
    '<path d="M ' + L0 + " " + G + " L " + (VX - 16) + " " + (G - 54) + " L " + (VX + 16) + " " + (G - 54) + " L " + L1 + " " + G + ' Z" fill="#CFC3A8" stroke="' + INK + '" stroke-width="3"/>';
  for (var c = 0; c < 4; c++) khe += D.line("M " + (L0 + 6 + c * 12) + " " + (top + 40 + c * 50) + " L " + (L1 - 6 - c * 12) + " " + (top + 46 + c * 50), 2, "#2E2622", ' opacity="0.7"');

  // ---------- tranh tường (hiện dần) trên nhà 4, 5, 6 ----------
  var TRANH = [[NHA[4].x - 6, "ca", "#9ED3D0"], [NHA[5].x - 230, "song", "#F6E7C8"], [NHA[6].x + 8, "thuyen", "#BFE0EE"]];
  var tranh = "";
  TRANH.forEach(function (q, i) {
    tranh += at(q[0], G - 330, '<g id="tr' + i + '">' + D.muralPiece(q[1], 220, 150, { nen: q[2] }) + "</g>");
    api.origin("#tr" + i, "0 0");
  });
  var co = '<g id="co">' + D.paintBrush("cs", { mau: "#2F72B5" }) + "</g>";

  // ---------- bậu cửa sổ nhà A: cái bấm đếm còn bốc khói ----------
  var SX = NHA[2].x - 58 * K, SY = G - 152 * K + 70 * K;
  var clkBau = at(SX + 10, SY - 18, '<g id="clkB">' + D.clicker("clkb", { r: 22 }) + "</g>");
  var khoi = api.phut("kh", SX + 10, SY - 50, { n: 4, song: 1.5, cao: 110, troi: 26, r: 13, tu: 1.3, den: 12.5, seed: 18 });

  // ---------- người: hai hàng xóm ở hai cửa đối diện qua khe; người ngồi cửa; trẻ con ----------
  var nguoi = B.nguoiDat(api, "n1", cuaX(NHA[2]) + 6, G - 4, 0.7, { ao: "#E9806E", quan: "#4F6A80" }) +
    B.nguoiDat(api, "n2", cuaX(NHA[3]) - 6, G - 4, 0.7, { ao: "#2A9D8F", quan: "#3E4A50", da: "#8A5E46" }) +
    B.nguoiDat(api, "n3", cuaX(NHA[7]) + 90, G + 6, 0.68, { ao: "#F2CB57", quan: "#4F6A80", ngoi: true });
  var ghe3 = at(cuaX(NHA[7]) + 90, G + 8, sc(0.62, ND.ghe({ mau: "#5FA8D3" })));
  var tre = "";
  for (var k2 = 0; k2 < 3; k2++) tre += B.nguoiDat(api, "k" + k2, -420 - k2 * 150, G + 14, 0.86, { nho: true, ao: ["#F2CB57", "#EE9AAE", "#86CFB0"][k2], quan: "#4F6A80" });
  // bóng thoại chỉ có hình
  function bong(id, x, y, icon, phai) {
    var tail = phai ? "M 20 40 L 46 74 L 46 36 Z" : "M -20 40 L -46 74 L -46 36 Z";
    return at(x, y, '<g id="' + id + '">' + D.paper(D.rEll(0, 0, 74, 52, 2, 1870), "#FFFDF6", { stroke: true, sw: 4, sx: 4, sy: 5 }) +
      '<path d="' + tail + '" fill="#FFFDF6" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' + D.paper(D.rEll(0, 0, 70, 48, 1.5, 1871), "#FFFDF6", { shadow: false }) + icon + "</g>");
  }
  var matTroi = '<circle r="16" fill="#F2CB57" stroke="' + INK + '" stroke-width="3"/>' + D.line("M -26 0 L -20 0 M 20 0 L 26 0 M 0 -26 L 0 -20 M 0 20 L 0 26 M -18 -18 L -14 -14 M 14 14 L 18 18 M 18 -18 L 14 -14 M -14 14 L -18 18", 3);
  var BT = [
    bong("bt0", cuaX(NHA[2]) + 70, G - 330, D.sketchIcon("ca", 1.5, "#2F72B5"), false),
    bong("bt1", cuaX(NHA[3]) - 70, G - 350, matTroi, true),
    bong("bt2", cuaX(NHA[2]) + 70, G - 330, D.sketchIcon("thuyen", 1.4, "#C9463A"), false),
    bong("bt3", cuaX(NHA[3]) - 70, G - 350, D.sketchIcon("ca", 1.5, "#E07A5F") + '<g transform="translate(22,-16)">' + D.sketchIcon("ca", 0.8, "#E07A5F") + "</g>", true)
  ].join("");

  // ---------- Wob ôm ba lô (ba lô dựng bên phải trước ngực); ba lô giơ cao (rời) ----------
  var XW = 560, SW = 0.55;
  var CLK = '<g id="clkH"><g transform="translate(0,-22)">' + D.clicker("clkh", { r: 30 }) + "</g></g>";
  var W = ND.wob(api, "W", { lung: 0, truoc: 1, truocTf: "translate(400,396) scale(0.9)", holdL: CLK });
  var pkUp = '<g id="pkUp">' + sc(0.9 * SW, '<g transform="translate(0,218)">' + ND.baLo("pku", {}) + "</g>") + "</g>";

  // ---------- tiền cảnh: dây phơi trên, chậu cây dưới ----------
  var gan = '<g id="dp">' + ND.dayPhoi(-500, 40, 2900, 70, 70, { seed: 1881, n: 18 }) + "</g>" +
    at(-120, 1110, D.paper(D.rRect(-80, -120, 160, 120, 2, 1882), "#B5523B", { stroke: true, sw: 4 }) + D.paper(D.rEll(0, -160, 120, 74, 4, 1883), "#5E8F4A", { stroke: true, sw: 4, half: 0.15 })) +
    at(3400, 1110, D.paper(D.rRect(-80, -120, 160, 120, 2, 1884), "#B5523B", { stroke: true, sw: 4 }) + D.paper(D.rEll(0, -160, 120, 74, 4, 1885), "#5E8F4A", { stroke: true, sw: 4, half: 0.15 }));
  api.origin("#dp", "1200 60");

  var troi = '<rect width="1920" height="1080" fill="url(#ndTroi)"/>';
  var xa = "";
  for (var m = 0; m < 6; m++) xa += at(-200 + m * 560, 150 + (m % 3) * 40, D.paper(D.rEll(0, 0, 130, 34, 3, 1890 + m), "#FFFFFF", { shadow: false, stroke: true, sw: 2.5 }));
  xa += '<rect x="-1400" y="560" width="6000" height="600" fill="#E6D8BC"/>';
  var nen = D.paper(D.rRect(-1400, G - 12, 6400, 400, 2, 1895), "#DAD3C3", { shadow: false, half: 0.06 }) + D.line("M -1400 " + (G + 60) + " L 5000 " + (G + 60), 2, "#9C9284", ' opacity="0.5"');
  var giua = nen + khe + nha + cuaDong + tranh + clkBau + khoi + ghe3 + nguoi + tre + W.svg + pkUp + co + BT;
  api.dat(ND.defs() + troi + api.lop("xa", xa, 0.35, { mat: 560 }) + api.lop("giua", giua, 1, { mat: G }) + api.lop("gan", gan, 1.4, { mat: 1110 }));
  api.noi({});

  // ---------- mốc lời ----------
  var tGave = T("gave", 0, 0.79), tWatched = T("watched.", 0, 2.1), tFull = T("full.", 0, 4.9), tDoors = T("Doors", 0, 5.65), tOpen = T("open.", 0, 6.31);
  var tNeigh = T("Neighbours", 0, 6.97), tVoices = T("voices,", 0, 9.35), tNarrow = T("narrower", 0, 10.81), tBack = T("backpack.", 0, 11.54);
  var tKids = T("Kids", 0, 12.49), tTouch = T("touch.", 0, 14.32), tFound = T("foundation", 0, 15.25), tNavy = T("Navy", 0, 16.88);
  var tHouses = T("houses,", 0, 18.44), tNine = T("nine", 0, 19.36), tMurals = T("murals", 0, 19.61), tPainted = T("painted", 0, 20.7);

  // ---------- camera ----------
  api.camera([
    [0, 570, 710, 1.72], [tWatched - 0.5, 590, 700, 1.76, "sine.inOut"],
    [tWatched + 0.4, 770, 670, 1.46, "power2.inOut"],                // nhìn dọc lối
    [tFull - 0.6, 900, 610, 1.12, "power2.inOut"],                    // đảo kín người, cửa mở
    [tNeigh - 0.2, 880, 650, 1.3, "sine.inOut"],
    [tNarrow - 0.6, 890, 670, 1.38, "sine.inOut"],
    [tBack + 0.2, 900, 730, 1.9, "power2.inOut"],                     // đẩy chậm vào khe
    [tKids - 0.4, 870, 690, 1.42, "power2.inOut"],                    // trẻ con chạy qua
    [tFound - 0.1, 890, 690, 1.44, "sine.inOut"],
    [tNavy + 0.4, 1760, 660, 1.34, "power2.inOut"],                   // lia dọc tường: tranh cá
    [tHouses + 0.3, 2140, 660, 1.34, "sine.inOut"],                   // tranh sóng
    [tMurals + 0.4, 2560, 680, 1.4, "power2.inOut"],                  // tranh thuyền + cọ
    [DUR, 2600, 682, 1.45, "sine.inOut"]
  ]);

  // dây phơi đung đưa nhẹ
  for (var td = 0, s0 = 0; td < DUR + 1.8; td += 1.8, s0++) api.key("#dp", "rotation", td, s0 % 2 ? 0.6 : -0.6, "sine.inOut");

  // ---------- nhịp 1: đặt cái bấm đếm lên bậu ----------
  W.set(0, { x: XW, y: G + 6, size: SW, aLu: 60, aLf: 20, aRu: -50, aRf: 30, pupX: -8, pupY: -6, op: 1 });
  api.show("#clkB", 0, 0); api.show("#clkH", 0, 1);
  W.pose(tGave - 0.3, 0.45, { aLu: 152, aLf: 30, lean: -4, sy: 1.06 }, "power2.inOut");
  api.show("#clkH", tGave + 0.4, 0); api.show("#clkB", tGave + 0.4, 1);
  api.sfx("bonk", tGave + 0.4, 0.3);
  W.pose(tGave + 0.55, 0.4, { aLu: 22, aLf: -10, lean: 0, sy: 1 }, "power2.inOut");
  W.pose(tGave + 0.7, 0.3, { pupX: 8, pupY: 0 }, "power2.out");
  W.mouth(tGave + 0.8, "flat");
  // đi vài bước, tựa ba lô nhìn dọc lối
  W.walk(tWatched - 0.15, tWatched + 0.75, XW, 660, { step: 0.3, arms: false });
  W.pose(tWatched + 0.9, 0.3, { pupX: 11, pupY: -2, lean: 3 }, "power2.out");
  W.idle(tWatched + 1.1, tDoors - 0.3, { seed: 4, bien: 1.4 });
  W.nhinQuanh(tFull - 0.3, { nhip: 0.4 });
  // cửa mở
  [0, 1].forEach(function (k) { api.key("#cd" + k, "scaleX", 0, 1, "step"); api.key("#cd" + k, "scaleX", tDoors - 0.1 + k * 0.3, 1, "none"); api.key("#cd" + k, "scaleX", tDoors + 0.35 + k * 0.3, 0.12, "back.out(1.6)"); });
  W.pose(tDoors, 0.2, { pupX: -10, eye: 1.08 }, "power2.out"); W.pose(tOpen, 0.2, { pupX: 10, eye: 1 }, "power2.out");

  // ---------- nhịp 2: hàng xóm nói chuyện qua khe ----------
  api.set("#n1-mat", 0, { x: 7 }); api.set("#n2-mat", 0, { x: -7 });
  var tb = [tNeigh + 0.1, tNeigh + 1.0, tNeigh + 1.9, tVoices + 0.2];
  ["bt0", "bt1", "bt2", "bt3"].forEach(function (id, i) {
    api.origin("#" + id, "0 60");
    api.pop("#" + id, tb[i], 0.24, tb[i] + 0.8);
    var who = i % 2 ? "#n2-tayL" : "#n1-tayR";
    api.key(who, "rotation", tb[i] - 0.05, 0, "none"); api.key(who, "rotation", tb[i] + 0.2, i % 2 ? 40 : -40, "back.out(2)"); api.key(who, "rotation", tb[i] + 0.8, 0, "power2.inOut");
    api.key(i % 2 ? "#n2-dau" : "#n1-dau", "rotation", tb[i], 0, "none"); api.key(i % 2 ? "#n2-dau" : "#n1-dau", "rotation", tb[i] + 0.2, i % 2 ? -6 : 6, "sine.out"); api.key(i % 2 ? "#n2-dau" : "#n1-dau", "rotation", tb[i] + 0.8, 0, "sine.inOut");
  });
  W.idle(tDoors + 0.3, tNarrow - 0.6, { seed: 6, bien: 1.6, liec: true });
  // ướm ba lô vào khe: rộng hơn lối, va, lùi lại đứng chờ
  W.walk(tNarrow - 0.55, tNarrow + 0.15, 660, VX - 112, { step: 0.26, arms: false });
  W.pose(tNarrow + 0.25, 0.2, { lean: 5, sx: 1.03 }, "power2.in");
  W.pose(tNarrow + 0.45, 0.12, { sx: 0.92, sy: 1.08, lean: -3 }, "power3.out");
  W.soc(tNarrow + 0.5, { mieng: "o" });
  api.shake(tNarrow + 0.45, 6, 6); api.sfx("bonk", tNarrow + 0.45, 0.5);
  W.pose(tNarrow + 0.95, 0.25, { sx: 1, sy: 1, lean: 0 }, "power2.out");
  W.walk(tBack + 0.05, tBack + 0.6, VX - 112, VX - 170, { step: 0.28, arms: false });
  W.mouth(tBack + 0.4, "flat");
  W.pose(tBack + 0.7, 0.25, { pupX: -6, pupY: 4, lid: 14 }, "power2.out");

  // ---------- nhịp 3: trẻ con chạy qua dưới ba lô giơ cao ----------
  var tUp = tKids - 0.35, tDown = tTouch + 0.55, xw3 = VX - 170;
  W.pose(tUp - 0.05, 0.3, { aLu: 166, aLf: 8, aRu: -166, aRf: -8, lid: 0, pupX: 0, pupY: -10, sy: 1.04 }, "back.out(1.5)");
  api.show("#W-blT", tUp + 0.05, 0);
  api.set("#pkUp", 0, { x: xw3, y: G - 300, opacity: 0 });
  api.key("#pkUp", "opacity", tUp + 0.05, 1, "step");
  api.key("#pkUp", "y", tUp + 0.05, G - 250, "none"); api.key("#pkUp", "y", tUp + 0.35, G - 330, "back.out(1.6)");
  for (var tw = tUp + 0.6, s1 = 0; tw < tDown - 0.3; tw += 0.32, s1++) { api.key("#pkUp", "rotation", tw, s1 % 2 ? 3 : -3, "sine.inOut"); W.pose(tw, 0.3, { lean: s1 % 2 ? 2 : -2 }, "sine.inOut"); }
  api.key("#pkUp", "y", tDown - 0.1, G - 330, "none"); api.key("#pkUp", "y", tDown + 0.25, G - 250, "power2.in"); api.key("#pkUp", "rotation", tDown + 0.25, 0, "power2.out");
  api.key("#pkUp", "opacity", tDown + 0.3, 0, "step"); api.show("#W-blT", tDown + 0.3, 1);
  W.pose(tDown, 0.3, { aLu: 22, aLf: -10, aRu: -50, aRf: 30, pupY: 0, sy: 1, lean: 0 }, "power2.inOut");
  W.mouth(tUp, "o"); W.mouth(tKids + 0.9, "wobbly");
  for (var k3 = 0; k3 < 3; k3++) B.nguoiDi(api, "k" + k3, tKids - 0.2 + k3 * 0.32, tTouch + 2.6 + k3 * 0.3, 4300, { buoc: 0.2 });
  W.pose(tKids + 0.2, 0.2, { pupX: -12, pupY: 6 }, "power2.out"); W.pose(tKids + 1.0, 0.3, { pupX: 12, pupY: 6 }, "sine.inOut");

  // ---------- nhịp 4: lia dọc tường, tranh tường lần lượt hiện ----------
  W.walk(tFound + 0.2, tHouses + 1.0, xw3, 2330, { step: 0.3, arms: false });
  W.pose(tHouses + 1.1, 0.3, { pupX: 10, pupY: -10, lean: 2 }, "power2.out");
  W.idle(tHouses + 1.5, DUR, { seed: 9, bien: 1.4 });
  W.mouth(tFound + 0.4, "smirk");
  var tHien = [tNavy + 0.3, tHouses + 0.2, tMurals];
  [0, 1].forEach(function (i) { api.key("#tr" + i, "scaleX", 0, 0, "step"); api.key("#tr" + i, "scaleX", tHien[i], 0, "none"); api.key("#tr" + i, "scaleX", tHien[i] + 0.5, 1, "power2.out"); });
  // tranh cuối: cọ sơn lướt qua tô dần
  var tq = TRANH[2][0], tc0 = tHien[2], tc1 = tPainted + 0.5;
  api.key("#tr2", "scaleX", 0, 0, "step"); api.key("#tr2", "scaleX", tc0, 0.02, "none"); api.key("#tr2", "scaleX", tc1, 1, "sine.inOut");
  api.set("#co", 0, { x: tq - 20, y: G - 320, opacity: 0 });
  api.key("#co", "opacity", tc0 - 0.3, 1, "step");
  api.key("#co", "x", tc0 - 0.3, tq - 20, "none"); api.key("#co", "x", tc1, tq + 226, "sine.inOut");
  for (var tz = tc0 - 0.3, z = 0; tz < tc1; tz += 0.18, z++) api.key("#co", "y", tz, G - 320 + (z % 2 ? 120 : 10), "sine.inOut");
  api.key("#co", "y", tc1 + 0.3, G - 420, "power2.in"); api.key("#co", "opacity", tc1 + 0.3, 0, "step");
  W.pose(tc0, 0.3, { pupX: 12, pupY: -12, eye: 1.1 }, "power2.out");
  W.mouth(tc1 - 0.2, "grin");
  W.autoBlink(0.5, DUR, 81);
};
