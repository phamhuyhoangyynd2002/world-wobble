/* Đoạn d27 · cắt giấy · hồi ức: rời đảo buổi sáng (cùng thuyền, cùng đảo giấy d02).
   Vào "giay", ra "chen" (cắt cứng sang d28 vẽ tay).
   Shot: Wob ngồi đuôi thuyền, ôm ba lô còn ẩm (giọt nước), ngoái lại; camera lướt chậm, đảo lùi xa thành một nắm mái nhà
         → Wob giơ tay đo đảo giữa ngón cái và ngón trỏ: vừa khít (giữ ≈ 1 s tới hết đoạn).
   Trang phục: mũ cói; ba lô khổng lồ CÒN ẨM (sẫm, vệt nước) ôm trước ngực, bình xịt cắm túi hông. Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, at = api.at, DUR = api.DUR, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  var SW = 0.55, BX = 1240, BY = 965, XW = 1020, YW = 852;

  // ---------- mốc lời ----------
  var tPack = T("pack", 0, 1.74), tDrier = T("drier?", 0, 2.86), tWond = T("wondered", 0, 3.79), tOut = T("out,", 0, 4.99);
  var tShrank = T("shrank", 0, 6.08), tHandful = T("handful", 0, 7.28), tRoofs = T("roofs", 0, 7.99), tWater = T("water.", 0, 8.51);

  // ---------- Wob ngồi đuôi thuyền ----------
  var tDo = tHandful - 0.45;
  var PINCH = '<g id="W-ngon" opacity="0"><g transform="rotate(-170)">' + D.pinchHand(220) + "</g></g>";
  var W = ND.wob(api, "W", { lung: 0, truoc: 1, truocTf: "translate(400,396) scale(0.9)", uot: true, holdL: PINCH });
  W.set(0, { x: XW, y: YW, size: SW, legLs: 0.55, legRs: 0.55, aLu: 18, aLf: -10, aRu: -50, aRf: 30, pupX: -8, op: 1 });
  W.pose(tDo, 0.35, { aLu: 162, aLf: 8, lean: -3, pupX: -10, pupY: -12 }, "back.out(1.4)");
  var hp = W.hand("L", tDo + 0.8);
  var H = Math.round(hp.y - 10);           // đường chân trời ngang khe hai ngón

  // ---------- trời, mây, biển xa ----------
  var troi = '<rect width="1920" height="1080" fill="url(#ndTroiSang)"/>';
  var xa = "";
  for (var m = 0; m < 5; m++) xa += at(-300 + m * 600, 170 + (m % 2) * 60, D.paper(D.rEll(0, 0, 150, 30, 3, 2710 + m), "#FFFFFF", { shadow: false, stroke: true, sw: 2.5 }));
  var bienXa = '<rect x="-1400" y="' + H + '" width="6000" height="900" fill="#8ED5CB"/>' + D.line("M -1400 " + H + " L 4600 " + H, 3, INK, ' opacity="0.35"');
  var daoXa = at(1760, H + 2, sc(0.2, ND.daoXanh({ w: 900, seed: 2711 })));
  var dao = '<g id="dao">' + ND.daoNhaXa({ w: 1000, seed: 851 }) + "</g>";
  var bien = ND.bien(api, "bs", { x0: -1400, x1: 4200, y: H + 70, n: 3, day: 54, bien: 22 });
  // vệt sóng đuôi thuyền trôi về phía đảo
  var vet = "";
  for (var v = 0; v < 6; v++) vet += '<g id="vt' + v + '">' + D.line("M 0 0 l 90 0", 6, "#EAF7F2", ' opacity="0.85"') + "</g>";
  // thuyền (cùng thuyền d02)
  var tb = ND.thuyen("tb", {});
  var khoi = api.phut("km", BX - 0.95 * 470, BY - 0.95 * 280, { n: 3, song: 1.2, cao: 60, troi: -80, r: 12, seed: 27 });
  var thuyen = '<g id="tbR">' + at(BX, BY, sc(0.95, tb.sau)) + W.svg + at(BX, BY, sc(0.95, tb.truoc)) + "</g>";
  var giua = bienXa + daoXa + dao + bien + vet + khoi + thuyen;
  var gan = ND.bien(api, "bg", { x0: -1400, x1: 3800, y: 1010, n: 2, day: 44, mau: ["#3FA9A6", "#2B9097"], bien: 30 });
  api.dat(D.defsNhietDoi() + ND.defs() + troi + api.lop("xa", xa, 0.35, { mat: H }) + api.lop("giua", giua, 1, { mat: 1000 }) + api.lop("gan", gan, 1.4, { mat: 1080 }));
  api.noi({ vaoDai: 0.55 });
  api.show(W.nd.uotT, 0, 1);

  // ---------- camera: lướt chậm, rồi đẩy vào bàn tay đo đảo ----------
  api.camera([
    [0, 1000, 640, 1.16], [tWond, 940, 630, 1.2, "sine.inOut"],
    [tDo - 0.2, 860, 620, 1.26, "sine.inOut"],
    [tRoofs - 0.1, hp.x + 70, hp.y + 10, 2.6, "power2.inOut"],
    [DUR, hp.x + 70, hp.y + 8, 2.72, "sine.inOut"]
  ]);

  // thuyền bập bềnh
  api.origin("#tbR", BX + " " + (BY - 60));
  for (var tt = 0, k = 0; tt < DUR + 1.5; tt += 1.4, k++) { api.key("#tbR", "rotation", tt, k % 2 ? -1.1 : 1.0, "sine.inOut"); api.key("#tbR", "y", tt, k % 2 ? 5 : -3, "sine.inOut"); }
  // vệt sóng
  for (var q = 0; q < 6; q++) {
    var sel = "#vt" + q, x0 = BX - 520, y0 = BY - 70 + (q % 3) * 22;
    api.set(sel, 0, { x: x0, y: y0, opacity: 0 });
    for (var tq = q * 0.33 - 2; tq < DUR; tq += 2) {
      var ts = Math.max(0, tq), u = (ts - tq) / 2;
      api.key(sel, "x", ts, x0 - 700 * u, "none"); api.key(sel, "x", tq + 2, x0 - 700, "none");
      api.key(sel, "opacity", ts, u < 0.1 ? 0 : 0.9 * (1 - u), "none"); api.key(sel, "opacity", tq + 0.2, 0.9, "sine.out"); api.key(sel, "opacity", tq + 2, 0, "sine.in");
    }
  }
  api.sfx("song", 0.4, 0.45);

  // ---------- đảo lùi xa thành một nắm mái nhà, khít giữa hai ngón tay ----------
  api.origin("#dao", "0 0");
  api.set("#dao", 0, { x: 420, y: H + 4, scale: 0.62 });
  api.key("#dao", "x", tWond - 0.5, 420, "none"); api.key("#dao", "x", tRoofs - 0.05, hp.x, "sine.inOut");
  api.key("#dao", "y", tWond - 0.5, H + 4, "none"); api.key("#dao", "y", tRoofs - 0.05, H + 2, "sine.inOut");
  api.key("#dao", "scale", tWond - 0.5, 0.62, "none"); api.key("#dao", "scale", tRoofs - 0.05, 0.112, "power2.inOut");

  // ---------- Wob ----------
  W.mouth(0, "flat");
  W.idle(0.3, tPack - 0.3, { seed: 3, bien: 1.2 });
  // nhìn ba lô còn ẩm, một giọt nước rơi
  W.pose(tPack - 0.3, 0.3, { pupX: 8, pupY: 12, upRot: 3 }, "power2.out");
  W.pose(tPack + 0.2, 0.2, { aRf: 50 }, "power2.in"); W.pose(tPack + 0.45, 0.3, { aRf: 30 }, "power2.out");
  api.key(W.nd.giotT + "1", "opacity", 0, 0, "step"); api.key(W.nd.giotT + "1", "opacity", tPack + 0.4, 1, "step");
  api.origin(W.nd.giotT + "1", "0 0");
  api.key(W.nd.giotT + "1", "y", tPack + 0.4, 0, "none"); api.key(W.nd.giotT + "1", "y", tPack + 1.1, 90, "power2.in"); api.key(W.nd.giotT + "1", "opacity", tPack + 1.1, 0, "step");
  W.mouth(tDrier, "wobbly");
  // ngoái lại nhìn đảo
  W.pose(tWond - 0.2, 0.3, { pupX: -13, pupY: -4, upRot: -4, lean: -2 }, "power2.inOut");
  W.mouth(tWond, "flat");
  W.idle(tWond + 0.4, tDo - 0.1, { seed: 6, bien: 1.2 });
  // giơ tay đo đảo: vừa khít
  api.show("#W-ngon", tDo + 0.05, 1);
  W.lid(tDo + 0.3, 0.2, 26);
  W.pose(tRoofs - 0.05, 0.2, { lid: 30, eyeL: 0.9, eyeR: 1.08 }, "power2.out");
  W.mouth(tRoofs, "smirk");
  W.autoBlink(0.6, tDo, 27);
};
