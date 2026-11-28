/* Đoạn d25 · cắt giấy · cùng một ô ruộng quây tường đá: ba mùa khoai mọc rồi thu nối nhau (cây non → cây xanh → luống trơ), Wob đứng góc ô nhìn.
   Một bàn tay giấy chung đưa cái chĩa cao gấp đôi Wob, Wob lảo đảo theo cán. Xới rất nhẹ, răng chĩa run run. Giơ một củ khoai bé xíu như cúp,
   lấp lánh. Con bò ló đầu qua tường, nhìn củ khoai, nhìn Wob, nhai một cái, cúi ăn cỏ tiếp: lấp lánh tắt phụt. Lùi ra: sau lưng bò là máng đầy
   khoai to hơn; Wob hạ cúp chậm, giữ. Vào "cat" (từ d24 vẽ tay), ra "cat" (sang d26). Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tHand = T("handed", 0, 3.91), tDug = T("dug", 0, 5.19), tLift = T("lifted", 0, 6.86), tTro = T("trophy.", 0, 8.85), tCow = T("cow", 0, 9.91),
    tLook = T("looked", 0, 11.3), tEat = T("eating.", 0, 12.89), tSpare = T("spare", 0, 13.56), tFeed = T("feed.", 0, 15.19), tTros = T("trophies.", 0, 17.1);

  // ---------- XA (p 0.3) ----------
  var xa = at(1300, 640, TD.nui({ w: 2400, h: 1000, seed: 2501 })) + at(300, 80, TD.may(420, { seed: 2502, mau: "#E4E7E2" })) + at(2100, 140, TD.may(460, { seed: 2503, mau: "#E4E7E2" }));
  // ---------- GIỮA (p 0.75): bãi cỏ bên kia tường, bò, máng khoai ----------
  var gi = D.paper("M -600 690 C 200 676 1200 694 2200 680 C 2800 672 3200 684 3600 680 L 3600 1400 L -600 1400 Z", M.co, { stroke: true, sw: 5, shadow: false });
  gi += '<g id="mangG">' + at(2080, 760, TD.mang(440, 2510)) + "</g>";
  gi += '<g transform="translate(1440,772) scale(1.15)">' + TD.bo("bo", { mau: "#8A5A3A", lat: -1, seed: 2511 }) + "</g>";
  // ---------- GẦN (p 1): ô ruộng, tường đá, Wob ----------
  var gan = D.paper("M -600 780 C 400 772 1400 786 3200 776 L 3200 1500 L -600 1500 Z", "#6B5038", { stroke: true, sw: 4, shadow: false });
  gan += at(-400, 800, TD.tuongDa(3400, 92, 2520));
  var hang = [880, 950, 1020, 1090];
  hang.forEach(function (y, i) { gan += D.paper("M -100 " + (y + 10) + " C 300 " + (y - 22) + " 900 " + (y - 22) + " 1300 " + (y + 10) + " Z", "#5A4230", { stroke: true, sw: 3, shadow: false }); });
  function mua(id, kieu) {
    var s = '<g id="' + id + '">';
    hang.forEach(function (y, i) {
      for (var x = -40 + (i % 2) * 60; x < 1260; x += 120) {
        if (kieu === 0) s += at(x, y - 6, '<g class="m0">' + D.line("M 0 0 C -4 -14 -10 -20 -16 -24 M 0 0 C 4 -14 10 -20 16 -26", 6, "#8FB35A") + "</g>");
        else if (kieu === 1) s += at(x, y - 4, D.paper(D.rEll(0, -26, 44, 30, 3, 2530 + x + i), "#5F8A3E", { stroke: true, sw: 3, shadow: false }) + D.paper(D.rEll(-16, -40, 22, 16, 2, 2600 + x + i), "#7AA650", { shadow: false }));
        else s += at(x, y - 2, D.line("M -20 0 L 20 0", 4, "#8E7A5C", ' opacity="0.7"'));
      }
    });
    return s + "</g>";
  }
  gan += mua("ms0", 0) + mua("ms1", 1) + mua("ms2", 2);
  gan += '<g id="hoDao"><path d="' + D.rEll(1290, 1040, 70, 18, 2, 2540) + '" fill="#3E2C1E" stroke="' + D.INK + '" stroke-width="3"/></g>';
  // bảng kẹp ba hàng như d23 (khoai/tôm/bò), dựng nghiêng nhẹ trên đất; dấu X đỏ ô khoai hiện ~17,5 s (khớp đầu d26)
  gan += '<g id="bkDat">' + at(1318, 936, '<g transform="rotate(-6) scale(0.8)">' + TD.bangKep("bk2") +
    '<g id="bkX">' + D.line("M -56 -94 L -20 -58 M -20 -94 L -56 -58", 9, "#C9463A") + "</g></g>") + "</g>";
  gan += '<g id="chiaDat">' + at(1360, 1060, '<g transform="rotate(-84)">' + TD.chia(420) + "</g>") + "</g>";
  var W = TD.wob(api, "W", {
    muTrum: 0,
    holdL: '<g id="W-bk"><g transform="rotate(-60) scale(0.55)">' + TD.bangKep("bk") + "</g></g>",
    holdR: '<g id="W-chia">' + TD.chia(760) + '</g><g id="W-kh">' + at(0, -14, TD.khoai(15, 2550)) + "</g>"
  });
  gan += W.svg;
  gan += '<g id="sang">' + [[-46, -40], [44, -36], [-30, 34], [40, 30], [0, -64]].map(function (p, j) {
    return '<g id="sg' + j + '" transform="translate(' + p[0] + "," + p[1] + ')"><g id="sgi' + j + '"><path d="M 0 -16 L 4 -4 L 16 0 L 4 4 L 0 16 L -4 4 L -16 0 L -4 -4 Z" fill="#FFE07A" stroke="' + D.INK + '" stroke-width="2.5"/></g></g>';
  }).join("") + "</g>";
  gan += '<g id="tay"><g id="tayIn">' + D.line("M 0 0 L 900 -30", 34, D.INK) + D.line("M 0 0 L 900 -30", 24, "#6F8FA8") + '<circle cx="0" cy="0" r="20" fill="#C99A72" stroke="' + D.INK + '" stroke-width="4"/>' +
    '<g id="tayChia">' + TD.chia(420) + "</g></g></g>";

  api.dat(TD.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiSang)"/>' +
    api.lop("xa", xa, 0.3, { mat: 640 }) + api.lop("giua", gi, 0.75, { mat: 780 }) + api.lop("gan", gan, 1, { mat: 1000 }));
  api.noi({});

  var WX = 1150, WY = 1000, SZ = 0.55;
  var tPull = tSpare - 0.05;
  api.camera([[0, 820, 760, 1.25], [3.4, 880, 760, 1.28, "sine.inOut"], [tHand - 0.1, 1080, 760, 1.32, "power2.inOut"], [tLift - 0.1, 1120, 780, 1.5, "power2.inOut"],
    [tCow - 0.3, 1150, 760, 1.5, "sine.inOut"], [tCow + 0.4, 1200, 720, 1.35, "power2.inOut"], [tPull, 1210, 720, 1.37, "sine.inOut"], [tPull + 1.2, 1500, 660, 0.98, "power2.inOut"], [DUR, 1510, 664, 1.0, "sine.inOut"]]);

  // ---------- ba mùa nối nhau ----------
  var chuKy = [[0, 2], [0.6, 0], [1.2, 1], [1.8, 2], [2.4, 0], [3.0, 1]];
  ["#ms0", "#ms1", "#ms2"].forEach(function (s, k) {
    api.origin(s, "600 1000");
    api.key(s, "scaleY", 0, k === 2 ? 1 : 0, "step");
    chuKy.forEach(function (c, i) {
      if (i === 0) return;
      if (c[1] === k) { api.key(s, "scaleY", c[0], 0, "none"); api.key(s, "scaleY", c[0] + 0.25, 1, "back.out(2)"); }
      else if (chuKy[i - 1][1] === k) { api.key(s, "scaleY", c[0], 1, "none"); api.key(s, "scaleY", c[0] + 0.2, 0, "power2.in"); }
    });
  });
  [0.6, 1.2, 1.8, 2.4, 3.0].forEach(function (t, i) { api.sfx("pop", t + 0.05, 0.18); });

  // ---------- Wob ----------
  W.set(0, { x: WX, y: WY, size: SZ, pupX: -12, pupY: 6, aLu: 60, aLf: -30 });
  api.show("#W-chia", 0, 0); api.show("#W-kh", 0, 0);
  for (var i = 0; i < 5; i++) W.pose(0.65 + i * 0.6, 0.2, { pupX: i % 2 ? -8 : -14, pupY: i % 2 ? 2 : 8, upRot: i % 2 ? -3 : 2 }, "sine.inOut");
  W.mouth(1.3, "o"); W.mouth(2.6, "flat");
  // tay đưa chĩa
  api.origin("#tay", "0 0");
  var HX = WX + 66, HY = WY - 44;
  api.key("#tay", "x", 0, HX + 900, "step"); api.key("#tay", "y", 0, HY, "step");
  api.key("#tay", "x", tHand - 0.4, HX + 900, "none"); api.key("#tay", "x", tHand + 0.05, HX + 30, "power2.out");
  api.key("#tay", "x", tHand + 0.5, HX + 30, "none"); api.key("#tay", "x", tHand + 1.0, HX + 1000, "power2.in");
  api.show("#tay", 0, 1); api.show("#tay", tHand + 1.05, 0);
  api.show("#tayChia", 0, 1); api.show("#tayChia", tHand + 0.2, 0); api.show("#W-chia", tHand + 0.2, 1);
  W.pose(tHand - 0.1, 0.2, { aRu: -30, aRf: 10, pupX: 14, pupY: -6 }, "power2.out");
  W.soc(tHand + 0.1, { mieng: "o" });
  // bảng kẹp rơi xuống đất khi nhận chĩa
  api.show("#W-bk", 0, 1); api.show("#W-bk", tHand + 0.25, 0); api.show("#bkDat", 0, 0); api.show("#bkDat", tHand + 0.25, 1);
  api.sfx("drop", tHand + 0.3, 0.3);
  // lảo đảo theo cán
  [10, -8, 12, -6, 4, 0].forEach(function (v, j) { W.pose(tHand + 0.3 + j * 0.16, 0.15, { lean: v, aLu: 40 + v * 2, pupX: v, pupY: -10 }, "sine.inOut"); });
  W.walk(tHand + 0.4, tHand + 0.85, WX, WX + 30, { step: 0.15, arms: false });
  W.walk(tHand + 0.85, tDug - 0.2, WX + 30, WX - 10, { step: 0.15, arms: false });
  W.mouth(tHand + 0.9, "wobbly");
  // xới rất nhẹ, răng chĩa run
  for (var dgi = 0; dgi < 3; dgi++) {
    var td = tDug - 0.1 + dgi * 0.5;
    W.pose(td, 0.18, { lean: 6, aRu: -22, aRf: 4, pupX: 6, pupY: 14, sy: 0.96 }, "power2.out");
    W.pose(td + 0.24, 0.2, { lean: 0, aRu: -30, aRf: 10, sy: 1 }, "power2.inOut");
  }
  api.origin("#W-hR", "0 0");
  api.key("#W-hR", "rotation", 0, 0); api.key("#W-hR", "rotation", tDug - 0.1, 0, "none");
  for (var q = 0; q < 16; q++) api.key("#W-hR", "rotation", tDug + q * 0.09, q % 2 ? 3 : -3, "sine.inOut");
  api.key("#W-hR", "rotation", tLift - 0.3, 0, "power2.out");
  W.mouth(tDug, "thang");
  // giơ cúp
  api.show("#W-chia", tLift - 0.15, 0); api.show("#chiaDat", 0, 0); api.show("#chiaDat", tLift - 0.15, 1);
  api.show("#W-kh", tLift - 0.1, 1);
  W.pose(tLift - 0.15, 0.3, { aRu: -160, aRf: -30, aLu: 160, aLf: 30, sy: 1.06, upY: -8, pupX: 6, pupY: -15, lean: 0 }, "back.out(1.8)");
  W.mouth(tLift + 0.1, "grin");
  for (var b = 0; b < 4; b++) { W.pose(tLift + 0.45 + b * 0.4, 0.2, { upY: -14 }, "sine.inOut"); W.pose(tLift + 0.65 + b * 0.4, 0.2, { upY: -6 }, "sine.inOut"); }
  api.sfx("ting", tLift + 0.15, 0.55);
  // lấp lánh quanh củ khoai (tay phải giơ cao: bàn tay ≈ (346, 116) trong khung rig gốc chân (200, 392))
  var KX = WX + (346 - 200) * SZ, KY = WY + (116 - 392) * SZ - 24;
  api.origin("#sang", "0 0"); api.key("#sang", "x", 0, KX, "step"); api.key("#sang", "y", 0, KY, "step");
  api.show("#sang", 0, 0); api.show("#sang", tLift + 0.15, 1);
  var tTat = tEat - 0.2;
  api.show("#sang", tTat, 0);
  for (var j = 0; j < 5; j++) {
    var s = "#sgi" + j; api.origin(s, "0 0");
    api.key(s, "scale", 0, 0, "step");
    for (var tt = tLift + 0.15 + j * 0.11, z = 0; tt < tTat; tt += 0.42, z++) api.key(s, "scale", tt, z % 2 ? 0.5 : 1.25, "sine.inOut");
    api.key(s, "rotation", 0, 0); api.key(s, "rotation", tTat, 180, "sine.inOut");
  }
  api.sfx("de-kem", tPull + 1.2, 0.45);

  // ---------- bò ló đầu ----------
  api.origin("#bo-dau", "0 0");
  api.key("#bo-dau", "rotation", 0, 62);
  api.key("#bo-dau", "rotation", tCow - 0.2, 62, "none"); api.key("#bo-dau", "rotation", tCow + 0.3, 0, "power2.out");
  api.key("#bo-dau", "rotation", tLook - 0.2, 0, "none"); api.key("#bo-dau", "rotation", tLook + 0.1, -10, "sine.inOut"); api.key("#bo-dau", "rotation", tLook + 0.5, 6, "sine.inOut");
  api.key("#bo-dau", "rotation", tEat - 0.4, 6, "none"); api.key("#bo-dau", "rotation", tEat + 0.1, 62, "power2.inOut");
  api.origin("#bo-mat", "0 0");
  api.key("#bo-mat", "x", 0, 0); api.key("#bo-mat", "x", tLook - 0.1, 0, "none"); api.key("#bo-mat", "x", tLook + 0.1, 4, "power2.out"); api.key("#bo-mat", "x", tLook + 0.6, -3, "power2.inOut");
  api.origin("#bo-ham", "74 60");
  api.key("#bo-ham", "y", 0, 0);
  [[tEat - 1.1, 7], [tEat - 0.85, 0], [tEat - 0.6, 7], [tEat - 0.35, 0]].forEach(function (k) { api.key("#bo-ham", "y", k[0], k[1], "sine.inOut"); });
  for (var tc = tEat + 0.3, cq = 0; tc < DUR; tc += 0.3, cq++) api.key("#bo-ham", "y", tc, cq % 2 ? 0 : 6, "sine.inOut");
  api.origin("#bo-duoi", "-128 -150"); api.key("#bo-duoi", "rotation", 0, 0);
  for (var tdq = 0.5, dq = 0; tdq < DUR; tdq += 0.8, dq++) api.key("#bo-duoi", "rotation", tdq, dq % 2 ? 12 : -10, "sine.inOut");
  W.pose(tCow + 0.2, 0.25, { pupX: 14, pupY: -6 }, "power2.out");
  W.mouth(tCow + 0.3, "smirk");
  W.pose(tLook + 0.3, 0.2, { eye: 1.1 }, "power2.out");
  W.mouth(tEat + 0.1, "flat");
  W.pose(tEat + 0.2, 0.25, { upY: 0, sy: 1, eye: 1 }, "power2.inOut");
  // hạ cúp chậm
  W.pose(tPull + 1.0, 1.4, { aRu: -60, aRf: -10, aLu: 60, aLf: 10, pupX: 14, pupY: -2, lean: 2 }, "sine.inOut");
  W.mouth(tPull + 1.6, "buon");
  W.lid(tFeed, 0.4, 0.35);
  // gạch X ô khoai: cúi về bảng kẹp, dập củ khoai xuống như con dấu
  api.show("#bkX", 0, 0); api.show("#bkX", tTros + 0.35, 1);
  W.pose(tTros - 0.15, 0.3, { lean: 16, aRu: -12, aRf: 6, pupX: 14, pupY: 16, sy: 0.94 }, "power2.out");
  W.pose(tTros + 0.3, 0.08, { sy: 0.88 }, "power2.in");
  W.pose(tTros + 0.42, 0.25, { sy: 0.97 }, "power2.out");
  W.pose(tTros + 0.9, 0.35, { lean: 4, aRu: -50, aRf: -10, pupX: 10, pupY: 10, sy: 1 }, "sine.inOut");
  W.mouth(tTros + 0.4, "smirk");
  api.sfx("pop", tTros + 0.35, 0.3);
  W.blinkAt(tTros + 0.4);
  W.autoBlink(0, tLift, 251);
  void tTro;
};
