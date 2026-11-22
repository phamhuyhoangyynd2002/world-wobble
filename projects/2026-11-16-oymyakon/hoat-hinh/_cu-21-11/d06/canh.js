/* Đoạn d06 · cắt giấy · hồi ức · đường tuyết rồi mép làng lúc tối (thẻ tien-canh-khung, lia-theo-vat, dong-ho-troi, nhiet-ke-tut).
   Vào "cat", ra "cat". Lời: "Outside the window, snow went by. Then more snow. Then a very small sign. I arrived in late
   December. Around then, the sun is up for only about four and a half hours a day. I arrived during one of the hours it
   wasn't. January, which I stayed for, averages around minus forty-six Celsius. That's about minus fifty-one Fahrenheit."
   Chữ: "~4.5 h" (đồng hồ), "JAN avg", "−46°C", "−51°F" (nhiệt kế). Trang phục: mũ len đỏ, khăn đỏ, ba lô; đèn pin tay phải,
   máy ảnh đeo cổ; chưa có lông mi đóng băng. Gag: đèn pin rọi đúng vào mặt mình. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var CH = data.chu_tren_do_vat;
  var T = function (w, du, k) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * x * (x * (x * 6 - 15) + 10); }
  function lerp(a, b, u) { return a + (b - a) * u; }

  // ---- mốc lời ----
  var tMore = T("more", 2.51), tSmall = T("small", 3.95), tArr = T("arrived", 6.37, 0), tAround = T("Around", 7.99),
    tFour = T("four", 10.31), tDay = T("day", 11.42), tArr2 = T("arrived", 12.24, 1), tWasnt = T("wasn't", 13.69),
    tJan = T("January", 14.49), tF46 = T("forty-six", 17.74), tF51 = T("fifty-one", 20.19);

  // ---- thế giới ----
  var MAT = 872, CS = 1.2, CARY = MAT + 40 - 172 * CS;
  var XSTOP = 5084, XM = 5560, XP = 5730, XS = 3573;
  function xCar(t) {
    if (t <= 5.2) return 600 + 760 * t;
    var d = Math.min(1.4, t - 5.2);
    return 600 + 760 * 5.2 + 760 * (d - d * d / 2.8);
  }
  var thong = [];
  for (var i = 0, x = -300; x < 5300; i++, x += 300 + (i % 3) * 70) thong.push([x, MAT - 52 + (i % 3) * 16, 300 + (i % 4) * 30]);
  var nen = CN.langTuyet(api, {
    ten: "duong", seed: 600, tu: -900, den: 7800, mat: MAT, matTroi: [1250, 600],
    nha: [[6250, 300, 190], [6820, 340, 210]], nhaXa: [[2300, 760], [2520, 772], [2790, 766]],
    thong: thong, cot: [300, 1700, 3100, 4500], rao: [[5900, 250]], suong: 6
  });

  // cọc tuyết sọc ở lớp gần (tiền cảnh trôi nhanh)
  var near = nen.gan;
  for (var s = 0, nx = -600; nx < 9600; s++, nx += 560 + (s % 3) * 90) {
    near += at(nx, 1040, D.paper(D.rRect(-10, -300, 20, 300, 1, 610 + s), "#F4F1E8", { stroke: true, sw: 4, sx: 5, sy: 6 }) +
      '<rect x="-9" y="-300" width="18" height="40" fill="' + C.accent2 + '"/><rect x="-9" y="-220" width="18" height="40" fill="' + C.accent2 + '"/>');
  }

  // ---- xe hộp có kính, Wob ngồi trong ----
  var cam = '<g transform="translate(262,300) scale(0.62)">' + D.cameraSmall({ day: 120 }) + "</g>";
  var holdFl = '<g transform="rotate(90) scale(0.8)">' + D.flashlight("fl") + "</g>";
  var W = api.wob("W", { scarf: true, khan: "#D9543C", mu: "#C9463A", phuKien: cam });
  var car = D.boxCarKinh("car");
  var carSvg = '<g id="xe" transform="translate(' + xCar(0) + "," + CARY + ") scale(" + CS + ')">' + car.back + W.svg + car.kinh + car.front + "</g>";

  // ---- mép làng: biển bé tí, cột có đồng hồ + nhiệt kế ----
  var M = api.wob("M", { scarf: true, khan: "#D9543C", mu: "#C9463A", phuKien: cam, holdR: holdFl });
  var mid = nen.giua;
  mid += at(XS, MAT + 14, D.signBoard("sgA", { w: 84, h: 50, cao: 64 }));
  mid += at(XP, MAT + 6, D.pole(720, 0, 640));
  mid += D.line("M " + XP + " 196 L " + (XP - 200) + " 196", 10, INK) + D.line("M " + XP + " 196 L " + (XP - 200) + " 196", 5, C.woodDark);
  mid += D.line("M " + (XP - 170) + " 196 L " + (XP - 170) + " 236", 4);
  mid += '<g id="ckG">' + D.line("M " + (XP - 170) + " 196 L " + (XP - 170) + " 236", 4) + at(XP - 170, 330, D.clockSun("ck", { r: 92, nhan: CH[0], co: 50 })) + "</g>";
  mid += '<g id="thG">' + D.line("M " + (XP + 92) + " 258 L " + (XP + 60) + " 204 M " + (XP + 92) + " 258 L " + (XP + 124) + " 204", 3);
  mid += at(XP + 92, 296, '<g id="tag">' + D.paper(D.rRect(-96, -40, 192, 76, 1.5, 645), "#FFF8EC", { stroke: true, sw: 4 }) + D.txt(0, 14, CH[1], 44, { w: 900 }) + "</g>");
  mid += at(XP + 12, 352, '<g transform="scale(0.95)">' + D.thermometer("th", { c: CH[2], f: CH[3] }) + "</g>") + "</g>";
  mid += carSvg + M.svg;
  // bóng tối: phủ cả thế giới, khoét lỗ mềm ở mắt Wob, mặt (đèn rọi), nhiệt kế
  var eyeY = MAT + 28 - (392 - 156) * 0.7;
  mid += '<radialGradient id="lo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#000"/><stop offset="0.55" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>';
  mid += '<mask id="mToi" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="14000" height="6000"><rect x="-2000" y="-2000" width="14000" height="6000" fill="#fff"/>' +
    '<g id="loMat"><circle cx="' + (XM - 28) + '" cy="' + eyeY + '" r="34" fill="url(#lo)"/><circle cx="' + (XM + 27) + '" cy="' + eyeY + '" r="34" fill="url(#lo)"/></g>' +
    '<g id="loMat2"><ellipse cx="' + (XM + 10) + '" cy="' + (MAT - 130) + '" rx="150" ry="140" fill="url(#lo)"/></g>' +
    '<g id="loNk"><ellipse cx="' + (XP + 92) + '" cy="480" rx="190" ry="300" fill="url(#lo)"/></g>' +
    '<g id="loTuyet"><ellipse cx="0" cy="0" rx="130" ry="52" fill="url(#lo)"/></g></mask>';
  mid += '<rect id="toi" x="-2000" y="-2000" width="14000" height="6000" fill="#0B1424" mask="url(#mToi)"/>';
  mid += '<g id="chum1"><g transform="rotate(90)"><g transform="translate(62,0)">' + D.beam(70, 46) + "</g></g></g>";
  mid += '<g id="chum3"><g transform="rotate(90)"><g transform="translate(62,0)">' + D.beam(300, 70) + "</g></g></g>";
  mid += '<g id="chum2"><g transform="rotate(90)"><g transform="translate(62,0)">' + D.beam(300, 80) + "</g></g></g>";
  mid += '<circle id="sangMat" cx="' + (XM + 6) + '" cy="' + (MAT - 140) + '" r="120" fill="url(#lampG)"/>';

  // tuyết bay ngang khi xe chạy (lớp màn hình)
  var fx = "", r = D.rng(606);
  for (var f = 0; f < 26; f++) fx += at(0, Math.round(40 + r() * 1000), g("sn" + f, D.flake(5 + Math.round(r() * 9), 620 + f)));

  api.dat(nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", near, 1.4, { mat: 1060 }) + g("fx", fx));
  api.noi({});

  // ---- tuyết bay ----
  var r2 = D.rng(607);
  for (var j = 0; j < 26; j++) {
    var sel = "#sn" + j, per = 0.55 + r2() * 0.5, ph = r2() * per;
    api.key(sel, "x", 0, 2000); api.key(sel, "opacity", 0, 1);
    for (var tc = -ph; tc < 6.4; tc += per) { api.key(sel, "x", Math.max(0, tc), tc < 0 ? 2000 - 2200 * (-tc / per) : 2000, "none"); api.key(sel, "x", tc + per, -200, "none"); }
    api.key(sel, "opacity", 6.2, 1, "none"); api.key(sel, "opacity", 6.6, 0, "power1.out");
  }

  // ---- camera: cảnh A lấy mẫu mỗi 0,1 s (theo xe), cảnh B khoá thường ----
  function camA(t) {
    var cx = xCar(t) - 6, cy = 556, z = 2.6;
    var pb = sm((t - (tMore - 0.15)) / 0.9);                       // lùi ra sau câu "Then more snow"
    cx += 150 * pb; cy = lerp(556, 600, pb); z = lerp(2.6, 1.0, pb);
    if (t > 3.3) {
      var c0 = xCar(3.3) + 150, lag = c0 + 250 * (t - 3.3);       // lia chậm theo biển bé tí
      var w1 = sm((t - 3.3) / 0.3), w2 = sm((t - 4.55) / 0.7);
      var follow = xCar(t) + lerp(150, 120, sm((t - 5.2) / 1.6));
      cx = lerp(lerp(xCar(t) + 150, lag, w1), follow, w2);
      z = lerp(1.0, 1.32, sm((t - 3.3) / 0.4)) ; z = lerp(z, 1.08, sm((t - 4.55) / 0.7));
    }
    return [cx, cy, z];
  }
  var keys = [];
  for (var tk = 0; tk <= 6.9 + 1e-6; tk += 0.1) { var c = camA(tk); keys.push([tk, c[0], c[1], c[2], "none"]); }
  keys.push([7.6, XSTOP + 300, 600, 1.12, "sine.inOut"]);
  keys.push([tAround - 0.05, XM + 80, 560, 1.18, "sine.inOut"]);
  keys.push([tAround + 0.75, XM + 30, 525, 1.5, "power2.inOut"]);          // ngước lên đồng hồ (giữ cả Wob trong khung)
  keys.push([tDay + 0.3, XM + 34, 530, 1.56, "sine.inOut"]);
  keys.push([tArr2 + 0.7, XM + 60, 640, 1.5, "power2.inOut"]);             // hạ về Wob
  keys.push([tWasnt - 0.05, XM + 50, 660, 1.56, "sine.inOut"]);
  keys.push([tWasnt + 0.6, XM + 30, 700, 2.1, "power2.out"]);              // đèn rọi mặt: đẩy vào
  keys.push([tJan + 0.3, XM + 30, 704, 2.15, "sine.inOut"]);
  keys.push([tJan + 1.2, XP + 30, 530, 1.55, "power2.inOut"]);             // theo chùm đèn lên nhiệt kế ('JAN avg' trọn trong khung)
  keys.push([tF46 - 0.1, XP + 40, 528, 1.62, "sine.inOut"]);
  keys.push([tF46 + 0.25, XP + 50, 526, 1.7, "power2.out"]);
  var tSw = T("sign", 20.35, 1) - 0.15;   // 'The sign at the edge…': đèn pin dò tìm biển trên tuyết
  keys.push([tSw, XP + 56, 526, 1.74, "sine.inOut"]);
  keys.push([tSw + 0.6, XM + 160, 700, 1.4, "power2.inOut"]);
  keys.push([DUR, XM + 170, 704, 1.44, "sine.inOut"]);
  api.camera(keys);

  // ---- đồng hồ trượt xuống ở 8,0 s; nhiệt kế + 'JAN avg' trượt vào ở 14,6 s (duyệt hình v1) ----
  var tCk = 8.0, tNk = tJan;   // 'JAN avg' hiện đúng 'January'
  api.origin("#ckG", (XP - 170) + " 196");
  api.key("#ckG", "y", 0, -620); api.key("#ckG", "y", tCk - 0.4, -620, "none"); api.key("#ckG", "y", tCk, 0, "back.out(1.4)");
  api.key("#ckG", "rotation", 0, 0); api.key("#ckG", "rotation", tCk, 7, "none"); api.key("#ckG", "rotation", tCk + 0.35, -4, "sine.inOut"); api.key("#ckG", "rotation", tCk + 0.7, 0, "sine.inOut");
  api.sfx("whoosh", tCk - 0.35, 0.3); api.sfx("bonk", tCk, 0.3);
  api.key("#thG", "x", 0, 420); api.key("#thG", "x", tNk - 0.35, 420, "none"); api.key("#thG", "x", tNk, 0, "back.out(1.5)");
  api.show("#thG", 0, 0); api.show("#thG", tNk - 0.35, 1);
  api.sfx("whoosh", tNk - 0.3, 0.3);
  // ---- xe chạy (vẽ mỗi khung), bánh quay, kính phản chiếu trượt ----
  var nodes = {};
  api.moiKhung(function (t) {
    var el = function (id) { return nodes[id] || (nodes[id] = document.getElementById(id)); };
    var x = xCar(t), bob = t < 6.6 ? Math.sin(t * 23) * 2.2 : 0;
    if (el("xe")) el("xe").setAttribute("transform", "translate(" + x.toFixed(1) + "," + (CARY + bob).toFixed(1) + ") scale(" + CS + ")");
    var turn = (x - 600) / 46 / CS * 57.3;
    if (el("car-b0")) el("car-b0").setAttribute("transform", "rotate(" + turn.toFixed(1) + " -170 126)");
    if (el("car-b1")) el("car-b1").setAttribute("transform", "rotate(" + turn.toFixed(1) + " 170 126)");
    if (el("car-phan")) el("car-phan").setAttribute("transform", "translate(" + (-((x * 0.55) % 260)).toFixed(1) + ",0)");
  });
  [0, 2.6, 5.0].forEach(function (t, i) { api.sfx("may-no", t, [0.22, 0.2, 0.16][i]); });

  // ---- Wob trong xe: tựa trán vào kính, thở dài mờ kính, dí mặt nhìn biển ----
  W.set(0, { x: -5, y: 55, size: 0.62, aLu: 18, aLf: -10, aRu: -18, aRf: 10, upRot: 7, pupX: -7, pupY: 3, lid: 26, lashes: 0, ice: 0 });
  W.mouth(0, "flat");
  W.idle(0, tMore - 0.2, { seed: 61, bien: 1.6 });
  api.origin("#car-mo", "0 0");
  api.set("#car-mo", 0, { x: -2, y: -48, scale: 0.2, opacity: 0 });
  W.pose(tMore - 0.15, 0.3, { upY: -8, sy: 1.05 }, "power2.out");            // hít vào
  W.pose(tMore + 0.2, 0.5, { upY: 4, sy: 0.96, lid: 34 }, "power2.inOut");    // thở dài
  W.mouth(tMore + 0.2, "o"); W.mouth(tMore + 0.8, "flat");
  api.to("#car-mo", tMore + 0.2, 0.5, { scale: 1, opacity: 0.85 }, "power2.out");
  api.to("#car-mo", tMore + 1.6, 1.6, { opacity: 0 }, "power1.inOut");
  W.pose(tMore + 1.0, 0.3, { upY: 0, sy: 1, upRot: 0, lid: 10, pupX: 4 }, "power2.out");
  W.pose(tSmall - 0.5, 0.2, { pupX: 10, pupY: -2, lid: 0 }, "power2.out");    // thấy cái gì đó
  W.pose(tSmall - 0.2, 0.18, { sx: 1.14, sy: 0.9, upY: -6, eye: 1.15, pupX: -12, pupY: 2 }, "back.out(2)");  // dí mặt vào kính
  W.mouth(tSmall - 0.15, "o");
  api.sfx("whoosh", tSmall - 0.3, 0.4);
  W.pose(tSmall + 0.9, 0.3, { pupX: -14 }, "power2.out");
  W.pose(tSmall + 1.4, 0.3, { sx: 1, sy: 1, upY: 0, eye: 1, pupX: 6, pupY: 0 }, "power2.inOut");
  W.mouth(tSmall + 1.4, "X");
  W.pose(5.3, 0.25, { lean: 7 }, "power2.out"); W.pose(6.55, 0.3, { lean: -4 }, "power2.out"); W.pose(6.85, 0.2, { lean: 0 }, "back.out(2)");
  W.autoBlink(0.2, tMore - 0.2, 66);
  W.breathe(0, 7, 2.4);

  // ---- xuống xe: cửa mở, Wob nhảy xuống tuyết, đi tới cột ----
  var tDoor = tArr + 0.35, tOut = tDoor + 0.22, tLandM = tOut + 0.3;
  api.origin("#car-cua", "166 -130");
  api.key("#car-cua", "scaleX", 0, 1); api.key("#car-cua", "scaleX", tDoor, 1, "none"); api.key("#car-cua", "scaleX", tDoor + 0.25, 0.12, "power2.out");
  api.sfx("bonk", tDoor + 0.05, 0.3);
  W.set(0, { op: 1 }); W.set(tOut, { op: 0 });
  M.set(0, { x: XSTOP + 60, y: MAT + 28 - 70, size: 0.7, op: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 6, lashes: 0, ice: 0 });
  M.set(tOut, { op: 1, sy: 1.12, sx: 0.94 });
  api.key("#M", "y", tOut, MAT + 28 - 70, "none"); api.key("#M", "y", tOut + 0.12, MAT + 28 - 98, "power2.out"); api.key("#M", "y", tLandM, MAT + 28, "power2.in");
  api.key("#M", "x", tOut, XSTOP + 60, "none"); api.key("#M", "x", tLandM, XSTOP + 140, "power1.out");
  M.pose(tLandM - 0.02, 0.07, { sy: 0.78, sx: 1.18 }, "power2.in");
  M.pose(tLandM + 0.06, 0.3, { sy: 1, sx: 1 }, "elastic.out(1,0.5)");
  api.sfx("buoc-tuyet", tLandM, 0.5);
  M.mouth(tOut, "o"); M.mouth(tLandM + 0.1, "X");
  var tW0 = tLandM + 0.35, tW1 = tAround + 0.2;
  M.walk(tW0, tW1, XSTOP + 140, XM, { step: 0.29, arms: "R", tieng: true });
  // đồng hồ: ngước nhìn, chỉ lát nắng, lát nắng trượt mất
  M.pose(tW1 + 0.2, 0.3, { pupY: -14, pupX: -4, upRot: -3 }, "power2.out");
  M.idle(tW1 + 0.4, tFour - 0.2, { seed: 63, bien: 2 });
  M.pose(tFour - 0.2, 0.3, { aLu: 150, aLf: 12 }, "back.out(1.6)");           // chỉ lên lát vàng
  M.pose(tDay - 0.3, 0.3, { aLu: 18, aLf: -10 }, "power2.inOut");
  api.origin("#ck-lat", "0 0");
  api.key("#ck-lat", "rotation", 0, -6); api.key("#ck-lat", "rotation", tAround, -6, "none"); api.key("#ck-lat", "rotation", tFour, 8, "sine.inOut");
  api.key("#ck-lat", "rotation", tDay - 0.1, 8, "none"); api.key("#ck-lat", "rotation", tDay + 0.6, 70, "power2.in");
  api.key("#ck-lat", "y", 0, 0); api.key("#ck-lat", "y", tDay - 0.1, 0, "none"); api.key("#ck-lat", "y", tDay + 0.9, 380, "power2.in");
  api.key("#ck-lat", "x", 0, 0); api.key("#ck-lat", "x", tDay - 0.1, 0, "none"); api.key("#ck-lat", "x", tDay + 0.9, 60, "power1.in");
  api.show("#ck-lat", 0, 1); api.fade("#ck-lat", tDay + 0.6, 0.3, 0);
  M.pose(tDay + 0.1, 0.5, { pupY: 12, pupX: 2, upRot: 2 }, "power2.in");      // mắt theo lát nắng rơi
  M.mouth(tDay + 0.2, "o");
  api.sfx("drop", tDay + 0.85, 0.35);
  M.pose(tArr2 + 0.2, 0.3, { pupY: 0, pupX: 0, upRot: 0, lid: 22 }, "power2.out");   // nhìn người xem, tỉnh bơ
  M.mouth(tArr2 + 0.2, "flat");
  M.idle(tArr2 + 0.5, tWasnt - 0.1, { seed: 64, bien: 1.8 });

  // ---- tắt phụt: chỉ còn đôi mắt ----
  api.key("#toi", "opacity", 0, 0); api.key("#toi", "opacity", 4.8, 0, "none"); api.key("#toi", "opacity", 7.8, 0.36, "sine.inOut");
  api.key("#toi", "opacity", tWasnt - 0.02, 0.36, "none"); api.key("#toi", "opacity", tWasnt + 0.06, 0.95, "power2.out");
  api.key("#L-gan-in", "opacity", 0, 1); api.key("#L-gan-in", "opacity", 4.8, 1, "none"); api.key("#L-gan-in", "opacity", 7.8, 0.75, "sine.inOut");
  api.key("#L-gan-in", "opacity", tWasnt - 0.02, 0.75, "none"); api.key("#L-gan-in", "opacity", tWasnt + 0.06, 0.05, "power2.out");
  api.show("#loMat", 0, 0); api.show("#loMat", tWasnt + 0.04, 1);
  api.show("#loMat2", 0, 0); api.show("#loNk", 0, 0);
  M.blinkAt(tWasnt + 0.35);
  // đèn pin bật: rọi đúng vào mặt mình (tay gập, thân đèn chĩa vào mặt)
  var tOn = tWasnt + 0.5;
  M.pose(tWasnt + 0.1, 0.2, { aRu: -60, aRf: 176 }, "power2.inOut");
  api.show("#fl-den", 0, 0); api.show("#fl-den", tOn, 1);
  api.sfx("pop", tOn, 0.6);
  api.fade("#loMat2", tOn, 0.06, 1);
  M.pose(tOn + 0.03, 0.12, { lid: 46, upRot: -6, lean: -4 }, "back.out(2)");
  M.mouth(tOn + 0.03, "wobbly");
  api.sfx("liu-lo-soc", tOn + 0.08, 0.55);
  // quay đèn lên nhiệt kế
  var tTurn = tJan - 0.2, tTh = tTurn + 0.35;   // đèn tới nhiệt kế đúng "January"
  M.pose(tTurn, 0.4, { aRu: -141, aRf: 0, upRot: 0, lean: 0, lid: 6 }, "power2.inOut");
  api.fade("#loMat2", tTurn + 0.1, 0.25, 0);
  api.fade("#loNk", tTurn + 0.2, 0.3, 1);
  M.pose(tTh, 0.3, { pupY: -12, pupX: 10, eye: 1.05 }, "power2.out");
  M.mouth(tTh, "X");
  M.idle(tTh + 0.3, tSw, { seed: 65, bien: 1, tho: false });
  // chùm sáng (vẽ trên lớp tối): đặt theo bàn tay ở từng tư thế
  var h1 = M.hand("R", tOn + 0.3), h2 = M.hand("R", tTh + 0.1);
  api.origin("#chum1", "0 0"); api.origin("#chum2", "0 0");
  api.set("#chum1", 0, { x: h1.x, y: h1.y, rotation: h1.angle, scale: 0.7, opacity: 0 });
  api.show("#chum1", tOn, 1); api.fade("#chum1", tTurn, 0.12, 0);
  api.set("#chum2", 0, { x: h2.x, y: h2.y, rotation: h2.angle, scale: 0.7, opacity: 0 });
  api.fade("#chum2", tTh - 0.05, 0.15, 1);
  api.key("#sangMat", "opacity", 0, 0); api.key("#sangMat", "opacity", tOn, 0, "none"); api.key("#sangMat", "opacity", tOn + 0.06, 0.8, "power2.out");
  api.key("#sangMat", "opacity", tTurn, 0.8, "none"); api.key("#sangMat", "opacity", tTurn + 0.2, 0, "power2.in");
  // nhiệt kế tụt, hiện số
  api.origin("#th-merc", "0 0");
  api.key("#th-merc", "scaleY", 0, 0.62); api.key("#th-merc", "scaleY", tF46 - 0.45, 0.62, "none"); api.key("#th-merc", "scaleY", tF46 - 0.05, 0.1, "power3.in");
  api.key("#th-merc", "scaleY", tF46 + 0.15, 0.16, "power2.out"); api.key("#th-merc", "scaleY", tF46 + 0.35, 0.12, "sine.inOut");
  api.sfx("drop", tF46 - 0.08, 0.6);
  api.origin("#th-c", "85 300"); api.origin("#th-f", "85 352");
  api.pop("#th-c", tF46 - 0.05, 0.25);
  api.pop("#th-f", tF51 - 0.05, 0.25);
  api.sfx("ting", tF51 - 0.04, 0.55);
  M.soc(tF46 + 0.05, { giuMat: true, mieng: "o" });
  M.shiver(tF46 + 0.4, tSw, 1.8, 14);
  // hạ đèn xuống tuyết, dò tìm tấm biển quanh chân cột: lướt qua một lần không thấy, quay lại
  M.pose(tSw, 0.35, { aRu: -48, aRf: 0, pupX: 10, pupY: 12, lid: 0 }, "power2.inOut");
  M.mouth(tSw + 0.1, "flat");
  api.fade("#chum2", tSw, 0.15, 0); api.fade("#loNk", tSw + 0.05, 0.3, 0.25);
  var h3 = M.hand("R", tSw + 0.4), L3 = 0.7 * 362;
  function cuoi(r) { var a = (r + 90) * Math.PI / 180; return [h3.x + L3 * Math.cos(a), h3.y + L3 * Math.sin(a)]; }
  var rs = [[tSw + 0.35, h3.angle], [tSw + 0.85, h3.angle - 22], [tSw + 1.15, h3.angle - 22], [DUR - 0.05, h3.angle + 4]];
  api.origin("#chum3", "0 0");
  api.set("#chum3", 0, { x: h3.x, y: h3.y, rotation: h3.angle, scale: 0.7, opacity: 0 });
  api.fade("#chum3", tSw + 0.3, 0.15, 1);
  api.key("#loTuyet", "opacity", 0, 0); api.key("#loTuyet", "opacity", tSw + 0.3, 0, "none"); api.key("#loTuyet", "opacity", tSw + 0.45, 1, "power2.out");
  rs.forEach(function (r, i) {
    var e = cuoi(r[1]);
    api.key("#chum3", "rotation", r[0], r[1], i ? "sine.inOut" : "none");
    api.key("#loTuyet", "x", r[0], e[0], i ? "sine.inOut" : "none"); api.key("#loTuyet", "y", r[0], e[1], i ? "sine.inOut" : "none");
    M.pose(r[0], 0.3, { pupX: i === 1 || i === 2 ? 14 : 6, pupY: 12 }, "sine.inOut");
  });
  M.idle(tSw + 0.4, DUR, { seed: 66, bien: 1, tho: false });
  M.mouth(tF51 + 0.1, "chatter");
  M.pose(tF51 + 0.1, 0.25, { pupX: 0, pupY: 0, lid: 16 }, "power2.out");
  M.autoBlink(tW1, tWasnt - 0.3, 67);
};
