/* Đoạn d15 · cắt giấy · Wob đi dọc bờ đá đen cầm gậy chọc khe đá, lật rong tìm xác tàu "đã khởi đầu mọi chuyện"; bới ra một củ khoai,
   giơ ngang mắt nhìn rất lâu rồi áp vào tai như nghe biển trong vỏ ốc. Xa ngoài khơi một mảnh ván trôi ngang; Wob cất củ khoai vào túi
   hông ba lô, vỗ nhẹ. "The real beginning came from much further north": Wob quay nhìn lên phía bắc, camera lướt theo ánh nhìn tới
   đường chân trời trống, giữ. Vào "cat" (từ d14 vẽ tay), ra "cat" (sang d16 cắt giấy trang nhật ký). Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tFound = T("found", 0, 4.11), tPot = T("potato.", 0, 4.46), tShip = T("shipwrecks", 0, 5.36), tLater = T("later.", 0, 7.34), tDid = T("didn't", 0, 8.2),
    tReal = T("real", 0, 9.46), tNorth = T("north.", 0, 11.18), tWreck = T("wreck", 0, 2.42);

  // ---------- XA (p 0.3): biển xám tới chân trời, núi lửa bên trái, ván trôi ----------
  var xa = TD.bien(api, "bX", { x0: -1400, x1: 4200, y: 560, n: 4, day: 50, cao: 1400, bien: 16 });
  xa += at(-120, 600, TD.nui({ w: 1700, h: 900, seed: 1501 }));
  xa += at(400, -280, TD.may(460, { seed: 1502, mau: "#E4E7E2" })) + at(1300, 160, TD.may(380, { seed: 1503, mau: "#E4E7E2" })) + at(2300, 120, TD.may(520, { seed: 1504, mau: "#E4E7E2" }));
  xa += '<g id="van"><g id="vanIn">' + D.paper(D.rRect(-70, -12, 140, 22, 1.5, 1505), "#8A6A48", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + D.line("M -60 0 L 60 -2", 2, M.goToi, ' opacity="0.6"') + "</g></g>";

  // ---------- GIỮA (p 0.65): dải đá ven bờ xa ----------
  var gi = at(-1200, 790, TD.baiDa(5200, { seed: 1511, cao: 120 }));
  gi += D.line("M -1200 786 C -400 774 600 794 1600 780 C 2600 768 3400 790 4200 778", 6, "#E6EBE8", ' opacity="0.8"');

  // ---------- GẦN (p 1): lối đá Wob đi, khe đá, rong ----------
  var gan = at(-800, 900, TD.baiDa(4600, { seed: 1521, cao: 300 }));
  [[780, 972], [1120, 978], [1290, 968]].forEach(function (p, j) { gan += '<path d="' + D.rEll(p[0], p[1], 46, 14, 1.5, 1530 + j) + '" fill="#141618" stroke="' + D.INK + '" stroke-width="3"/>'; });
  gan += '<g id="rg">' + at(940, 985, TD.rong(1541)) + "</g>";
  [[420, 990], [1500, 992], [2100, 996], [2700, 990]].forEach(function (p, j) { gan += at(p[0], p[1], TD.rong(1550 + j)); });
  gan += '<g id="hoKh"><path d="' + D.rEll(1290, 968, 46, 14, 1.5, 1532) + '" fill="#141618"/></g>';
  // củ khoai to, nâu sẫm, viền mực, chấm mắt khoai (đọc được ở trung cảnh)
  function khoaiTo(r) {
    var s = "<g>" + D.paper(D.rEll(0, 0, r, r * 0.76, 2.5, 1561), "#7A5232", { stroke: true, sw: Math.max(3, r * 0.11), sx: 3, sy: 4 });
    [[-0.38, -0.2, 0.1], [0.34, 0.16, 0.09], [0.02, 0.36, 0.08], [0.46, -0.28, 0.07], [-0.2, 0.3, 0.07]].forEach(function (e) { s += '<circle cx="' + (e[0] * r).toFixed(1) + '" cy="' + (e[1] * r).toFixed(1) + '" r="' + (e[2] * r).toFixed(1) + '" fill="#3A2614"/>'; });
    s += D.line("M " + (-r * 0.55).toFixed(1) + " " + (-r * 0.38).toFixed(1) + " C " + (-r * 0.3).toFixed(1) + " " + (-r * 0.62).toFixed(1) + " " + (r * 0.1).toFixed(1) + " " + (-r * 0.66).toFixed(1) + " " + (r * 0.32).toFixed(1) + " " + (-r * 0.56).toFixed(1), Math.max(2, r * 0.07), "#B08458", ' opacity="0.8"');
    return s + "</g>";
  }
  gan += '<g id="khDat">' + at(1290, 950, khoaiTo(36)) + "</g>";
  var W = TD.wob(api, "W", {
    muTrum: 0,
    holdL: '<g id="W-gay">' + TD.gay(250) + "</g>",
    holdR: '<g id="W-kh">' + at(0, -8, khoaiTo(78)) + "</g>",
    packExtra: '<g id="W-tui">' + at(398, 192, '<g transform="rotate(-12)">' + khoaiTo(44) + "</g>") + "</g>" +
      D.paper("M 346 212 L 444 206 L 446 278 C 430 300 364 302 348 280 Z", M.oliuToi, { stroke: true, sw: 5, sx: 3, sy: 4 }) + D.line("M 352 236 L 440 230", 3, M.oliu, ' stroke-dasharray="7 6"')
  });
  gan += W.svg;
  var truoc = TD.bien(api, "bT", { x0: -1400, x1: 4400, y: 1070, n: 2, day: 34, bien: 30, chuKy: 2.6, mau: ["#7A8B8F", "#63757A"] });

  api.dat(TD.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiXam)"/>' +
    api.lop("xa", xa, 0.3, { mat: 600 }) + api.lop("giua", gi, 0.65, { mat: 790 }) + api.lop("gan", gan, 1, { mat: 960 }) + api.lop("truoc", truoc, 1.4, { mat: 1080 }));
  api.noi({});

  api.camera([[0, 600, 650, 1.32], [3.7, 1060, 650, 1.32, "sine.inOut"], [tFound + 0.15, 1220, 790, 1.85, "power2.inOut"], [6.0, 1226, 786, 1.88, "sine.inOut"],
    [6.6, 1250, 650, 1.32, "power2.inOut"], [tReal - 0.1, 1220, 610, 1.34, "sine.inOut"], [tNorth - 0.1, 2550, 520, 1.06, "power2.inOut"], [DUR, 2580, 516, 1.08, "sine.inOut"]]);

  // ---------- Wob ----------
  W.set(0, { x: 520, y: 962, size: 0.52, pupX: 4, pupY: 10, aLu: 34, aLf: 10 });
  api.show("#W-kh", 0, 0); api.show("#W-tui", 0, 0);
  api.origin("#W-gay", "0 0");
  W.walk(0.05, 0.85, 520, 700, { step: 0.28, arms: "R" });
  function choc(t, n) {
    W.pose(t, 0.15, { aLu: 40, aLf: 30, lean: 6, pupX: -4, pupY: 14 }, "power2.out");
    for (var i = 0; i < n; i++) { W.pose(t + 0.16 + i * 0.14, 0.07, { aLu: 46 }, "power2.in"); W.pose(t + 0.23 + i * 0.14, 0.07, { aLu: 38 }, "power2.out"); }
    W.pose(t + 0.2 + n * 0.14, 0.15, { aLu: 34, aLf: 10, lean: 0 }, "power2.inOut");
  }
  choc(0.9, 3);
  W.walk(1.45, 1.95, 700, 860, { step: 0.28, arms: "R" });
  // lật rong
  W.pose(2.0, 0.18, { aLu: 64, aLf: 40, lean: 8, pupX: 6, pupY: 14 }, "power2.out");
  W.pose(2.25, 0.2, { aLu: 20, aLf: 70 }, "power2.out");
  W.pose(2.55, 0.2, { aLu: 34, aLf: 10, lean: 0 }, "power2.inOut");
  api.origin("#rg", "940 985");
  api.key("#rg", "scaleY", 0, 1); api.key("#rg", "scaleY", 2.18, 1, "none"); api.key("#rg", "scaleY", 2.36, -0.7, "power2.out"); api.key("#rg", "scaleY", 2.62, 1, "back.out(2)");
  W.mouth(2.4, "flat");
  W.walk(2.65, 3.45, 860, 1180, { step: 0.28, arms: "R" });
  choc(3.5, 2);
  // bới ra củ khoai (tay phải), giơ ngang mắt
  api.origin("#khDat", "1290 950");
  api.key("#khDat", "y", 0, 26, "step"); api.key("#khDat", "y", 3.85, 26, "none"); api.key("#khDat", "y", 4.0, -24, "back.out(2)");
  api.show("#khDat", 0, 0); api.show("#khDat", 3.85, 1); api.show("#khDat", tFound + 0.05, 0); api.show("#W-kh", tFound + 0.05, 1);
  api.sfx("pop", 3.95, 0.5);
  W.soc(3.98, { mieng: "o" });
  W.pose(tFound - 0.12, 0.15, { aRu: -40, aRf: -30 }, "power2.out");
  W.pose(tFound + 0.1, 0.25, { aRu: -90, aRf: 0, pupX: 15, pupY: -2, eye: 1.1 }, "power2.out");
  W.mouth(tPot, "flat");
  W.blinkAt(tPot + 0.25);
  // ghé tai nghe như vỏ ốc, giữ 0,8 s
  var tTai = 4.9;
  W.pose(tTai, 0.3, { aRu: -128, aRf: -20, upRot: 10, pupX: 12, pupY: -4, eye: 1 }, "power2.inOut");
  W.lid(tTai + 0.25, 0.15, 0.85);
  W.mouth(tTai + 0.3, "smirk");
  W.lid(tTai + 1.05, 0.15, 0);
  // ván trôi, cất củ khoai vào túi hông, vỗ túi
  W.pose(6.0, 0.3, { upRot: 0, pupX: 14, pupY: -8 }, "power2.inOut");
  W.mouth(6.05, "o");
  var tCat = 6.95;
  W.pose(tCat - 0.35, 0.3, { aRu: -40, aRf: -20, pupX: 14, pupY: 10 }, "power2.inOut");
  api.show("#W-kh", tCat, 0); api.show("#W-tui", tCat, 1);
  api.origin("#W-tui", "398 192"); api.key("#W-tui", "y", 0, 0); api.key("#W-tui", "y", tCat, -30, "none"); api.key("#W-tui", "y", tCat + 0.2, 0, "power2.in");
  api.sfx("pop", tCat + 0.2, 0.3);
  for (var p = 0; p < 2; p++) { W.pose(tCat + 0.3 + p * 0.3, 0.12, { aRf: -6 }, "power2.in"); W.pose(tCat + 0.42 + p * 0.3, 0.12, { aRf: -22 }, "power2.out"); }
  W.mouth(tCat + 0.4, "grin");
  W.pose(tCat + 1.05, 0.3, { aRu: -18, aRf: 10, pupX: 8, pupY: -4 }, "power2.inOut");
  W.mouth(tDid, "flat");
  W.pose(tDid + 0.1, 0.2, { upRot: -4 }, "sine.inOut"); W.pose(tDid + 0.4, 0.2, { upRot: 4 }, "sine.inOut"); W.pose(tDid + 0.7, 0.2, { upRot: 0 }, "sine.inOut");
  // quay nhìn phía bắc
  W.pose(tReal - 0.2, 0.4, { pupX: 15, pupY: -12, lean: 6, upRot: -5 }, "power2.inOut");
  W.nhonChan(tReal + 0.3, DUR - tReal - 0.6, { lean: 7, nhin: [15, -12] });
  W.idle(tCat + 1.4, tDid, { seed: 151, bien: 0.6, liec: false });
  W.autoBlink(0, tTai, 152); W.autoBlink(tShip + 0.6, DUR, 153);

  // ván trôi xa
  api.origin("#van", "0 0"); api.origin("#vanIn", "0 0");
  api.key("#van", "x", 0, 1700, "step"); api.key("#van", "y", 0, 640, "step");
  api.key("#van", "x", tShip - 0.3, 1700, "none"); api.key("#van", "x", tReal, 1150, "sine.inOut");
  api.show("#van", 0, 0); api.show("#van", tShip - 0.3, 1); api.show("#van", tReal + 1.0, 0);
  api.key("#vanIn", "rotation", 0, 0);
  for (var tv = tShip, q = 0; tv < tReal + 1; tv += 0.7, q++) api.key("#vanIn", "rotation", tv, q % 2 ? 6 : -6, "sine.inOut");
  void tWreck;
};
