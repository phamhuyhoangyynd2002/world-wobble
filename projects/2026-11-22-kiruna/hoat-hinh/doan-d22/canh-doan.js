/* Đoạn d22 · cắt giấy · hồi ức tháng 2: lại đường ngang (như d15/d19), rào chắn đã nâng, tàu quặng vẫn chạy qua.
   Wob (đồ đông) đã ngồi ghế gấp, rót trà từ bình giữ nhiệt; thẻ gỗ dây đỏ thò khỏi túi phải; nâng cốc mời đoàn tàu.
   Vào "cat", ra "giay" (sang d23 tháng 8). Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, K = api.K, at = KR.at, M = KR.M;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tPocket = T("pocket.", 0, 1.8), tTrain = T("train", 0, 2.8), tPast = T("past.", 0, 3.8);

  // ---------- nền ----------
  var troi = '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#krDong)"/>';
  troi += at(1500, 190, '<circle r="60" fill="#FBEAC4" opacity="0.8"/>');
  var xa = KR.nuiXa(-500, 900, 640, 230, "#C9D5DC", 9701) + KR.nuiXa(500, 2500, 640, 300, "#B9C7CF", 9702);
  xa += line(-500, 2500, 640) + '<rect x="-600" y="636" width="3200" height="700" fill="#EAF1F3"/>';
  function line(x0, x1, y) { return D.line("M " + x0 + " " + y + " L " + x1 + " " + y, 3, "#9FB4BF", ' opacity="0.6"'); }
  for (var i = 0; i < 9; i++) xa += at(-300 + i * 330, 650, KR.cayBachDuong(70 + (i % 3) * 18, 9710 + i), 0.8);

  // giữa: đường ray + đoàn tàu + rào chắn đã nâng phía xa
  var gi = '<rect x="-600" y="700" width="3200" height="600" fill="#F4F8F9"/>';
  gi += D.paper(D.rRect(-600, 742, 3200, 46, 2, 9720), "#D7E3E8", { shadow: false });
  gi += KR.duongRay(-600, 2600, 770);
  gi += '<g transform="translate(0,766)"><g id="tau">' + KR.doanToa("toa", 18, 9730) + "</g></g>";
  gi += at(1380, 724, '<g id="raoXa">' + KR.raoChan("rx", 380) + "</g>", 0.7);
  gi += D.paper(D.rRect(-600, 800, 3200, 30, 3, 9740), "#E3ECEF", { shadow: false });

  // Wob ngồi ghế gấp, cầm bình (tay trái) và cốc (tay phải); bình, cốc giữ hướng thật nhờ KR.thong
  var binh = '<g id="binhG"><g transform="rotate(180)">' + KR.binhGiuNhiet() + "</g></g>";
  var cocS = '<g id="cocG"><g transform="rotate(180)">' + KR.coc() +
    '<g id="hoiC">' + D.line("M -6 -44 C -12 -58 0 -66 -6 -82 M 6 -46 C 0 -60 12 -70 6 -86", 4, "#FFFFFF", ' opacity="0.85"') + "</g></g></g>";
  var W = KR.wob(api, "W", { mua: "dong", tuiThe: 1, holdL: binh, holdR: cocS });
  var WX = 820, WG = 990, SZ = 0.62;
  var wobS = at(WX, WG, KR.gheGap("#3F6E9A"), 1.35) + '<g id="binhDat">' + at(WX - 120, WG + 6, KR.binhGiuNhiet(), 0.62) + "</g>" + W.svg;
  var gan = at(330, 1190, '<g id="raoGan">' + KR.raoChan("rg", 900) + "</g>", 1.6);

  api.dat(KR.defs() + troi + api.lop("xa", xa, 0.35, { mat: 640 }) + api.lop("giua", gi, 0.8, { mat: 790 }) +
    api.lop("wob", wobS + '<g id="tra"></g>', 1, { mat: WG }) + api.lop("gan", gan, 1.4, { mat: 1080 }));
  api.noi({});

  // ---------- camera: đẩy chậm vào Wob, đoàn tàu chạy sau lưng ----------
  api.camera([[0, 830, 836, 1.98], [tTrain, 836, 830, 2.04, "sine.inOut"], [DUR, 840, 824, 2.1, "sine.inOut"]]);

  // ---------- đoàn tàu chạy trái → phải suốt đoạn ----------
  api.key("#tau", "x", 0, -2700, "none"); api.key("#tau", "x", DUR, -2700 + 320 * DUR, "none");
  api.origin("#rx-tay", "0 -150"); api.set("#rx-tay", 0, { rotation: -82 });
  api.origin("#rg-tay", "0 -150"); api.set("#rg-tay", 0, { rotation: -76 });

  // ---------- Wob ----------
  W.set(0, { x: WX, y: WG - 56, size: SZ, legL: 30, legR: -30, legLs: 0.7, legRs: 0.7,
    aLu: -40, aLf: -88, aRu: 74, aRf: -54, pupX: 3, pupY: 10 });
  W.mouth(0, "smirk");
  // rót: bình dựng (nắp lên) rồi nghiêng chúc sang phải, rồi dựng lại; cốc luôn đứng
  var tRot0 = 0.3, tRot1 = 0.62, tRot2 = 1.5, tRot3 = 1.8;
  KR.thong(api, W, "L", "#binhG", 0, 2.3, { lac: 0.3, goc: function (t) {
    var up = 180, pour = -73;
    if (t < tRot0) return up; if (t < tRot1) return up + (pour - up) * KR.ss((t - tRot0) / (tRot1 - tRot0));
    if (t < tRot2) return pour; if (t < tRot3) return pour + (up - pour) * KR.ss((t - tRot2) / (tRot3 - tRot2)); return up; } });
  KR.thong(api, W, "R", "#cocG", 0, DUR, { goc: 180, lac: 0.4 });
  // dòng trà: miệng bình → miệng cốc (tư thế đứng yên trong lúc rót)
  var hL = W.hand("L", 0.9), hR = W.hand("R", 0.9), th = -73 * Math.PI / 180;
  var mx = hL.x + (-Math.sin(th)) * 92 * SZ, my = hL.y + Math.cos(th) * 92 * SZ, cx = hR.x, cy = hR.y - 30 * SZ;
  var tra = D.line("M " + mx.toFixed(1) + " " + my.toFixed(1) + " C " + (mx + 14).toFixed(1) + " " + (my + 4).toFixed(1) + " " + (cx + 4).toFixed(1) + " " + (cy - 24).toFixed(1) + " " + cx.toFixed(1) + " " + cy.toFixed(1), 5, "#8A4B22");
  api.dat(api._html().replace('<g id="tra"></g>', '<g id="tra">' + tra + "</g>"));
  api.show("#tra", 0, 0); api.show("#tra", tRot1 - 0.04, 1); api.show("#tra", tRot2, 0);
  api.sfx("hoi-nuoc", tRot1, 0.5);
  W.pose(0.1, 0.3, { upRot: -3 }, "power2.out");
  // hơi trà
  api.show("#hoiC", 0, 0); api.show("#hoiC", tRot2, 1);
  for (var h = tRot2; h < DUR; h += 0.45) api.key("#hoiC", "x", h, (Math.round(h * 2.2) % 2) ? 3 : -3, "sine.inOut");
  // liếc xuống túi đúng "pocket." (thẻ gỗ thò ra)
  W.pose(tPocket - 0.12, 0.2, { pupX: 8, pupY: 14, upRot: 3 }, "power2.out");
  // đặt bình xuống đất cạnh ghế
  W.pose(1.9, 0.3, { aLu: 14, aLf: -8, upRot: 0, pupX: -4, pupY: 2 }, "power2.inOut");
  api.show("#binhG", 0, 1); api.show("#binhG", 2.2, 0); api.show("#binhDat", 0, 0); api.show("#binhDat", 2.2, 1);
  // nâng cốc mời đoàn tàu (ngoái nhìn tàu sau lưng)
  W.pose(tTrain - 0.3, 0.38, { aRu: -118, aRf: -30, upRot: -7, lean: -3, pupX: -10, pupY: -12 }, "back.out(1.6)");
  W.mouth(tTrain, "grin");
  W.pose(tTrain + 0.55, 0.22, { aRf: -46 }, "sine.inOut"); W.pose(tTrain + 0.77, 0.22, { aRf: -28 }, "sine.inOut");
  W.mouth(tPast + 0.25, "smirk");
  W.idle(0, DUR, { seed: 22, bien: 1.2 });
  W.autoBlink(0, DUR, 2201);
};
