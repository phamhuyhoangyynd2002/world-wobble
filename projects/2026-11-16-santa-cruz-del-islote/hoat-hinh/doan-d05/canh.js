/* Đoạn d05 · cắt giấy · hồi ức: cập bến, bút chì tô dải đất cụt lủn; lùi máy từ ô cửa xanh ra dãy nhà vai chạm vai;
   lia theo Wob qua trường, quán, quảng trường; cận thánh giá, Wob bé tí ngước nhìn.
   Vào "cat" (khung đầu đủ hình), ra "chen" (sang d06 vẽ tay).
   Trang phục: mũ cói; ba lô khổng lồ trên lưng (ướt loang, bình xịt cắm túi hông trái).
   Phông lối đi: NhietDoi.loiDi (seed 1100, cùng cấu hình với d07, d10). Thánh giá: NhietDoi.thanhGia(680) như quảng trường của d16, d19.
   Chữ: "120 houses · Census 2018", "SCHOOL". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var cx = data.chu_tren_do_vat;
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }

  var tLand = T("land", 0, 1.79), tNot = T("not", 0, 3.05), tMore = T("More", 0, 4.11), t120 = T("hundred", 1, 9.45), tTw = T("twenty", 1, 10.07);
  var tSchool = T("school", 0, 10.87), tRest = T("restaurant", 0, 11.71), tSq = T("square", 0, 12.75), tIn = T("In", 0, 13.67), tCross = T("cross", 0, 14.61);
  var tS2 = tMore - 0.02;
  var NGON = '<g id="W1-ngon">' + D.line("M 0 6 L 0 40", 14) + D.line("M 0 6 L 0 40", 7, "#5a9fb8") + "</g>";

  // =================== S1: cập bến, bút chì tô dải đất ===================
  var tb = ND.thuyen("tb", {});
  var W1 = ND.wob(api, "W1", { lung: 1, uot: true, holdR: NGON });
  var IX = 1250, IY = 712, IS = 1.5;
  var s1 = '<g id="s1"><g id="s1k"><rect x="-300" y="-300" width="2600" height="1700" fill="url(#ndTroi)"/>' +
    D.paper(D.rEll(1620, 150, 64, 64, 1.5, 31), "#FFF0C2", { shadow: false, stroke: true, sw: 4 }) + at(380, 170, D.puff(56, 12, "#FFFFFF")) +
    '<rect x="-300" y="600" width="2600" height="900" fill="#8ED5CB"/>' + at(120, 612, sc(0.45, ND.daoXanh({ w: 900, seed: 873 }))) +
    ND.bien(api, "b1a", { x0: -400, x1: 2400, y: 640, n: 1, day: 40 });
  // dải đất bút chì (lộ dần bằng khung cắt), rồi đảo
  var hatch = "";
  for (var hx = 470; hx < 2030; hx += 14) hatch += "M " + hx + " " + (IY - 4) + " L " + (hx - 18) + " " + (IY + 34) + " ";
  s1 += '<clipPath id="datCl"><rect id="datR" x="460" y="' + (IY - 20) + '" width="0" height="80"/></clipPath>' +
    '<g clip-path="url(#datCl)">' + D.paper(D.rough([[470, IY - 6], [2030, IY - 6], [2020, IY + 30], [480, IY + 34]], 3, 77, 22), "#C9A46A", { shadow: false }) +
    '<path d="' + hatch + '" stroke="#8A6440" stroke-width="3" opacity="0.8" fill="none"/>' + D.line("M 470 " + (IY + 32) + " L 2030 " + (IY + 30), 4, "#6B4E33") + "</g>";
  s1 += at(IX, IY, sc(IS, ND.daoNhaXa({ w: 1000, seed: 851 })));
  s1 += ND.bien(api, "b1b", { x0: -400, x1: 2400, y: 760, n: 2, day: 50 });
  s1 += '<g id="tb1">' + at(460, 960, sc(0.95, tb.sau)) + W1.svg + at(460, 960, sc(0.95, tb.truoc)) + "</g>";
  s1 += ND.bien(api, "b1c", { x0: -400, x1: 2400, y: 900, n: 1, day: 50, mau: ["#2B9097"] });
  s1 += '<g id="but"><g id="butk">' + D.pencil(560, { goc: -52 }) + "</g></g>";
  s1 += "</g></g>";

  // =================== S2: lối đi (lớp parallax) ===================
  var nhaDs = [
    [-560, 360, 360, 3, { cua: 0.2, so: 1 }],
    [-190, 380, 380, 1, { cua: -0.3, cuaMo: true, mai: "doc" }],
    [330, 660, 370, 4, { cua: -0.82, so: 0, tranh: "ca", tranhX: 250 }],
    [880, 420, 390, 0, { cua: -0.3, cuaMo: true, cuaMau: "#2F6F9E", so: 1, soX: 120 }],
    [1300, 380, 360, 2, { cua: 0.3, so: 1, tranh: "song" }],
    [1730, 500, 400, 5, { cua: 0, so: 2, soX: -150 }],
    [2190, 400, 370, 6, { cua: -0.25, cuaMo: true, cuaMau: "#C9463A", so: 1, mai: "doc" }],
    [3500, 420, 380, 1, { cua: 0.2, so: 1 }], [3920, 400, 360, 3, { cua: -0.3, so: 1 }]
  ];
  var L = ND.loiDi(api, { seed: 1100, mat: 900, tu: -900, den: 4300, nha: nhaDs,
    ghe: [[1110, "#F4F2EC", "giua", 0.55], [2060, "#5FA8D3", "giua", 0.55], [2330, "#F4F2EC", "giua", 0.55], [2420, "#C9463A", "giua", 0.55], [1240, "#C9463A", "gan", 0.9]],
    phoi: [[-300, 430, 1500, 400, 40, "gan"], [2000, 380, 3000, 420, 30, "gan"]] });
  var giua = L.giua;
  // biển SCHOOL trên mặt tiền trường
  giua += at(1730, 578, D.paper(D.rRect(-170, -48, 340, 96, 2, 1201), "#FFF8EC", { stroke: true, sw: 5, sx: 6, sy: 8 }) + D.txt(0, 19, cx[1], 56, { w: 900, fill: "#2F6F9E" }));
  // quán ăn: bàn nhựa tròn trước cửa
  [[2200, "#F4F2EC"], [2380, "#5FA8D3"]].forEach(function (b, i) {
    giua += at(b[0] + (i ? 0 : -40), 906, D.line("M 0 0 L 0 -62", 8, "#D6D2C6") + D.paper(D.rEll(0, -66, 52, 12, 1, 1210 + i), b[1], { stroke: true, sw: 3.5, sx: 3, sy: 4 }));
  });
  // quảng trường: nền sáng, nhà quây sau, thánh giá giữa
  var QX = 2950;
  var qt = "";
  [[2560, 300, 290, 3], [2860, 320, 300, 1], [3160, 300, 280, 0]].forEach(function (h, i) {
    qt += at(h[0], 842, sc(0.82, ND.nha({ w: h[1], h: h[2], mau: ND.M.tuong[h[3]], seed: 1230 + i, cua: i % 2 ? -0.3 : 0.3, cuaMo: i === 1, so: 1 })));
  });
  qt += at(QX, 930, sc(0.9, ND.thanhGia(680)));
  qt += at(2620, 936, sc(0.55, ND.ghe({ mau: "#F4F2EC" }))) + at(3300, 936, sc(0.55, ND.ghe({ mau: "#5FA8D3" })));
  giua += qt;
  var W2 = ND.wob(api, "W2", { lung: 1, uot: true });
  // thẻ 120 houses dán lên bức tường dài
  giua += at(300, 712, '<g id="the120">' + ND.theChu("", cx[0], 46, { seed: 1240 }) + "</g>");
  giua += W2.svg;

  api.dat(L.troi + api.lop("xa", L.xa, 0.35, { mat: 650 }) + api.lop("giua", giua, 1, { mat: 900 }) + api.lop("gan", L.gan, 1.4, { mat: 1050 }) +
    ND.defs() + s1);
  api.noi({});
  ["#W1-ngon"].forEach(function (s) { api.show(s, 0, 0); });   // khoá đầu tiên quyết định từ t = 0
  [W1.nd.uotL, W2.nd.uotL].forEach(function (s) { api.show(s, 0, 1); });
  api.show("#s1", 0, 1); api.show("#s1", tS2, 0);

  // ---------- S1 ----------
  api.origin("#s1k", "1250 700");
  api.key("#s1k", "scale", 0, 1, "none"); api.key("#s1k", "scale", tS2, 1.06, "sine.inOut");
  // thuyền trôi vào, khựng nhẹ khi cập
  api.key("#tb1", "x", 0, -260, "step"); api.key("#tb1", "x", 1.1, 0, "power2.out"); api.key("#tb1", "x", 1.35, 8, "sine.out"); api.key("#tb1", "x", 1.7, 0, "sine.inOut");
  api.origin("#tb1", "460 880");
  for (var tt = 1.7, k2 = 0; tt < tS2 + 1; tt += 1.4, k2++) api.key("#tb1", "rotation", tt, k2 % 2 ? -0.9 : 0.8, "sine.inOut");
  W1.set(0, { x: 773, y: 800, size: 0.62, pupX: 8, pupY: -2, legLs: 0.6, legRs: 0.6 });
  W1.idle(0.2, 1.5, { seed: 3, bien: 1.2 });
  // bút chì: vào – tô – hết mực – ngượng ngùng – rút
  var tB0 = tLand - 1.05, tB1 = tLand - 0.75, tH = tLand + 0.65, tHet = tH + 0.55, tNhac = tNot + 0.35, tRut = tNhac + 0.35, tRut1 = tRut + 0.55;
  var xA = 470, xH = 1360;
  function ss(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
  function revealX(t) { return xA + (xH - xA) * ss((t - tB1) / (tH - tB1)); }
  var butNode = null, datNode = null;
  api.moiKhung(function (t) {
    if (!api.dom) return;
    if (!butNode) { butNode = document.getElementById("butk"); datNode = document.getElementById("datR"); }
    var x = revealX(t), y = IY + 20, lift = 0, rot = 0, ox = 0;
    datNode.setAttribute("width", Math.max(0, x - 460).toFixed(1));
    if (t < tB1) { var u = ss((t - tB0) / (tB1 - tB0)); ox = (1 - u) * 520; lift = -(1 - u) * 520; }
    else if (t < tH) { lift = -4 * Math.abs(Math.sin((t - tB1) * 22)); }
    else if (t < tHet) { x = xH + 30 * Math.sin((t - tH) * 26); lift = -3 * Math.abs(Math.sin((t - tH) * 31)); }
    else if (t < tNhac) { x = xH; }
    else if (t < tRut) { var u2 = ss((t - tNhac) / (tRut - tNhac)); x = xH; lift = -50 * u2; rot = -10 * u2; }
    else { var u3 = ss((t - tRut) / (tRut1 - tRut)); x = xH + 600 * u3; lift = -50 - 640 * u3; rot = -10; }
    butNode.setAttribute("transform", "translate(" + (x + ox).toFixed(1) + "," + (y + lift).toFixed(1) + ") rotate(" + rot.toFixed(1) + ")");
  }, { twos: true });
  api.sfx("xuoc-dia", tH + 0.02, 0.5);
  // Wob nhìn bút, giơ một ngón "thêm chút nữa"
  W1.pose(tB1, 0.3, { pupX: 10, pupY: 6, lean: 3 }, "power2.out");
  W1.pose(tH + 0.1, 0.2, { eye: 1.12, pupX: 12, pupY: 8 }, "power2.out");
  W1.pose(tNot - 0.25, 0.22, { aRu: -150, aRf: -8, eye: 1 }, "back.out(1.8)"); api.show("#W1-ngon", tNot - 0.22, 1);
  W1.mouth(tNot - 0.2, "smirk");
  W1.pose(tRut + 0.2, 0.3, { aRu: -18, aRf: 10, pupX: 12, pupY: -10 }, "power2.inOut"); api.show("#W1-ngon", tRut + 0.3, 0);
  W1.mouth(tRut + 0.3, "flat");
  W1.autoBlink(0, tS2, 31);

  // ---------- S2: camera lùi từ ô cửa, dừng ở thẻ, rồi lia theo Wob ----------
  var tSt = t120 - 0.12, tTag = tSt + 0.35;
  api.camera([[0, 840, 790, 2.6, "none"], [tS2, 840, 790, 2.6, "none"], [tSt - 0.25, 530, 712, 1.56, "power2.inOut"], [tTw + 0.2, 540, 706, 1.5, "sine.inOut"],
    [tSchool + 0.15, 1460, 600, 1.0, "power2.inOut"], [tRest + 0.25, 2010, 600, 1.0, "sine.inOut"], [tSq + 0.25, 2620, 588, 1.0, "sine.inOut"],
    [tIn + 0.2, 2860, 590, 1.05, "power2.inOut"], [tCross + 0.2, 2815, 640, 1.42, "power2.inOut"], [DUR, 2810, 650, 1.52, "sine.inOut"]]);
  api.origin("#the120", "0 0");
  api.key("#the120", "scale", 0, 0, "step"); api.key("#the120", "scale", tSt, 1.5, "step"); api.key("#the120", "scale", tTag, 1, "power3.in");
  api.key("#the120", "rotation", 0, -12, "step"); api.key("#the120", "rotation", tTag, -2, "power3.in");
  api.key("#the120", "opacity", 0, 0, "step"); api.key("#the120", "opacity", tSt, 1, "step");
  api.sfx("ting", tTag - 0.04, 0.55);

  // Wob ló mặt vào khung cửa, rồi rút ra, đi dọc lối
  W2.set(0, { x: 890, y: 900, size: 0.52, lean: -14, upRot: -6, pupX: -12, pupY: 2 });
  W2.idle(tS2, tSt - 1.2, { seed: 5, bien: 0.8, tho: true });
  W2.pose(tS2 + 1.2, 0.3, { pupX: -6, pupY: -6 }, "power2.inOut"); W2.pose(tS2 + 2.6, 0.3, { pupX: -12, pupY: 3 }, "power2.inOut");
  W2.pose(tSt - 1.0, 0.35, { lean: 0, upRot: 0, pupX: -10, pupY: -2 }, "back.out(1.5)");
  W2.pose(tTag, 0.12, { eye: 1.15 }, "power2.out"); W2.pose(tTag + 0.4, 0.25, { eye: 1 }, "power2.inOut");
  W2.mouth(tTag, "o"); W2.mouth(tTag + 0.6, "X");
  var tW0 = tTw - 0.05, tW1 = tCross - 0.25;
  W2.walk(tW0, tW1, 890, 2690, { step: 0.29 });
  W2.pose(tW0 + 0.2, 0.3, { pupX: 8, pupY: 0 }, "power2.out");
  W2.pose(tSchool + 0.05, 0.2, { pupY: -8 }, "power2.out"); W2.pose(tRest, 0.2, { pupY: 0 }, "power2.out");
  // dưới chân thánh giá: ngước nhìn, vành mũ ngửa ra sau, giữ
  W2.pose(tW1 + 0.2, 0.45, { pupX: 4, pupY: -15, lean: -5, upRot: -4 }, "power2.out");
  api.to(W2.nd.mu, tW1 + 0.25, 0.45, { rotation: -8, y: -30 }, "power2.out");
  W2.mouth(tW1 + 0.3, "o"); W2.mouth(tW1 + 1.4, "thang");
  W2.breathe(tW1 + 0.6, DUR);
  W2.autoBlink(tS2, DUR, 33);
};
