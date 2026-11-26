/* Đoạn d24 · cắt giấy · hồi ức: đêm cuối ở mép đảo, mắc võng.
   Vào "giay", ra "cat" (sang d25 vẽ tay; không whoosh lúc đang ngủ).
   Shot: hai cột gỗ sát mép nước làm khung tiền cảnh khi mở; Wob buộc võng giữa hai cột, đặt ba lô dưới gầm võng, thử ngồi
         → võng lật Wob một vòng rồi Wob mới nằm được → đẩy chậm vào: Wob ngủ, mũ cói úp lên mặt, ba bọt sóng nhỏ vỗ đều dưới trăng.
   Trang phục: mũ cói (cuối đoạn úp lên mặt); ba lô khổng lồ dưới đất dưới võng (bình xịt cắm túi hông). Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, at = api.at, DUR = api.DUR, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  var G = 860, SW = 0.45, PL = 620, PR = 1300, AY = 520, HW = PR - PL;

  // ---------- trời đêm, trăng, biển đêm ----------
  var troi = '<rect width="1920" height="1080" fill="url(#ndTroiDem)"/>';
  var xa = ND.sao(46, [-600, 20, 3100, 480], 2401) + at(1250, 330, ND.trang(56)) +
    '<rect x="-1400" y="590" width="6000" height="900" fill="#2C4A5E"/>' + D.line("M -1400 590 L 4600 590", 3, "#8FB0C4", ' opacity="0.5"') +
    at(260, 596, sc(0.3, ND.daoNhaXa({ w: 900, seed: 2402, dem: true })));
  for (var r = 0; r < 9; r++) xa += D.line("M " + (1180 + (r % 3) * 30 - r * 4) + " " + (612 + r * 14) + " l " + (60 - r * 4) + " 0", 4, "#F6E7B8", ' opacity="0.5"');

  // ---------- lớp giữa: biển gần, mép đảo, hai cột, võng, ba lô, Wob ----------
  var bien = ND.bien(api, "bs", { x0: -1400, x1: 4400, y: 640, n: 3, day: 60, dem: true, bien: 14 });
  var foam = "";
  [[700, 748], [1250, 760], [1470, 742]].forEach(function (p, i) { foam += at(p[0], p[1], '<g id="fo' + i + '">' + D.foam(70 + i * 10, 2410 + i) + "</g>"); });
  var dat = D.paper(D.rRect(-1400, G - 10, 6400, 400, 2, 2420), "#5E6270", { shadow: false, half: 0.1 }) + D.line("M -1400 " + (G - 8) + " L 5000 " + (G - 8), 4, INK, ' opacity="0.6"') +
    at(260, G + 4, D.coralRock(260, 50, 2421)) + at(1700, G + 4, D.coralRock(300, 56, 2422));
  var cot = at(PL, G, D.woodPost(G - AY + 60, 2431)) + at(PR, G, D.woodPost(G - AY + 60, 2432));
  var vong = at(PL, AY, '<g id="vmG">' + D.hammock("vm", HW, { vong: 170 }) + "</g>");
  var pk = '<g id="pkG" opacity="0">' + sc(0.42, ND.baLo("pkb", {})) + "</g>";
  var W = ND.wob(api, "W", { lung: 0, truoc: 1, truocTf: "translate(400,396) scale(0.9)" });
  var giua = bien + foam + dat + cot + pk + '<g id="lat">' + W.svg + "</g>" + vong;
  // tiền cảnh: mép đá và bóng cột (khung)
  var gan = at(-120, 1090, D.coralRock(420, 120, 2440)) + at(2040, 1090, D.coralRock(420, 110, 2441));
  api.dat(D.defsNhietDoi() + ND.defs() + troi + api.lop("xa", xa, 0.35, { mat: 590 }) + api.lop("giua", giua, 1, { mat: G }) + api.lop("gan", gan, 1.4, { mat: 1090 }));
  api.noi({ vaoDai: 0.55 });

  // ---------- mốc lời ----------
  var tStrung = T("strung", 0, 1.89), tHammock = T("hammock", 0, 2.23), tEdge = T("edge", 0, 2.9), tWanted = T("wanted", 0, 4.26), tAsleep = T("asleep", 0, 4.85);
  var tWaves = T("waves.", 0, 5.9), tWorked = T("worked.", 0, 6.95), tFell = T("fell", 0, 7.83), tWaves2 = T("waves", 1, 9.09);

  // ---------- camera ----------
  var FX = 1000, FY = 616;   // mặt Wob khi nằm
  api.camera([
    [0, 960, 650, 2.0], [tStrung - 0.3, 940, 650, 2.06, "sine.inOut"],      // hai cột làm khung
    [tHammock + 0.1, 950, 640, 1.5, "power2.inOut"],                         // võng bung, đặt ba lô
    [tWanted, 960, 630, 1.52, "sine.inOut"],
    [tWaves + 0.6, 970, 625, 1.56, "sine.inOut"],
    [tWorked + 0.05, FX - 10, FY + 10, 2.35, "power2.inOut"],                // đẩy chậm vào: Wob ngủ
    [DUR, FX - 14, FY + 12, 2.6, "sine.inOut"]
  ]);

  // ---------- buộc võng ----------
  var W0 = PL + 70;
  W.set(0, { x: W0, y: G + 4, size: SW, aLu: 18, aLf: -10, aRu: -50, aRf: 30, pupX: -10, pupY: -8, op: 1 });
  W.mouth(0, "flat");
  W.pose(0.5, 0.3, { aLu: 150, aLf: 30, lean: -4 }, "power2.out");
  for (var tk = 0.85, k = 0; tk < tHammock - 0.1; tk += 0.22, k++) W.pose(tk, 0.2, { aLf: k % 2 ? 0 : 50 }, "sine.inOut");
  W.pose(tHammock - 0.1, 0.25, { aLu: 18, aLf: -10, lean: 0 }, "power2.out");
  api.origin("#vm-vai", (HW / 2) + " " + (170 * 0.35));
  api.key("#vmG", "opacity", 0, 0, "step"); api.key("#vmG", "opacity", tStrung, 1, "step");
  api.origin("#vmG", "0 0");
  api.key("#vmG", "scaleX", 0, 0.02, "step"); api.key("#vmG", "scaleX", tStrung, 0.02, "none"); api.key("#vmG", "scaleX", tHammock + 0.15, 1, "power2.out");
  api.key("#vm-vai", "scaleY", 0, 1, "step"); api.key("#vm-vai", "scaleY", tHammock + 0.1, 0.2, "none"); api.key("#vm-vai", "scaleY", tHammock + 0.5, 1, "back.out(2)");
  // đặt ba lô dưới gầm võng
  W.walk(tHammock + 0.15, tEdge + 0.1, W0, 820, { step: 0.28, arms: false });
  W.pose(tEdge + 0.15, 0.25, { sy: 0.88, upY: 10, lean: 6 }, "power2.inOut");
  api.show("#W-blT", tEdge + 0.35, 0);
  api.set("#pkG", 0, { x: 930, y: G - 30, opacity: 0 }); api.key("#pkG", "opacity", tEdge + 0.35, 1, "step");
  api.key("#pkG", "y", tEdge + 0.35, G - 30, "none"); api.key("#pkG", "y", tEdge + 0.6, G + 2, "power2.in"); api.key("#pkG", "y", tEdge + 0.8, G, "back.out(2)");
  api.sfx("bonk", tEdge + 0.58, 0.3);
  W.pose(tEdge + 0.6, 0.3, { sy: 1, upY: 0, lean: 0, aRu: -18, aRf: 10 }, "power2.out");
  W.mouth(tEdge + 0.8, "smirk");
  // thử ngồi lên võng
  var tNgoi = tWanted - 0.05, SX = 960, SY = 690;
  W.walk(tEdge + 1.0, tNgoi - 0.15, 820, SX - 30, { step: 0.28, arms: false });
  W.pose(tNgoi - 0.15, 0.12, { sy: 0.86 }, "power2.in");
  W.pose(tNgoi, 0.28, { x: SX, y: SY, sy: 1, legLs: 0.55, legRs: 0.55, aLu: 60, aLf: 20, aRu: -60, aRf: -20 }, "power2.out");
  W.mouth(tNgoi + 0.2, "grin");
  // võng lật Wob một vòng (cả võng và Wob quay quanh dây võng)
  var tLat = tNgoi + 0.4, tLat1 = tLat + 0.85, PX = PL + HW / 2, PY = AY + 170 * 0.35;
  api.origin("#lat", PX + " " + PY);
  api.key("#lat", "rotation", 0, 0, "step"); api.key("#lat", "rotation", tLat, 0, "none"); api.key("#lat", "rotation", tLat1, 360, "power2.inOut");
  api.key("#vm-vai", "rotation", 0, 0, "step"); api.key("#vm-vai", "rotation", tLat, 0, "none"); api.key("#vm-vai", "rotation", tLat1, 360, "power2.inOut");
  api.sfx("boing", tLat + 0.05, 0.55);
  W.soc(tLat + 0.1, { mieng: "o" });
  W.pose(tLat + 0.2, 0.3, { aLu: 160, aLf: 10, aRu: -160, aRf: -10, eye: 1.2 }, "power2.out");
  // nằm được
  var tNam = tLat1 + 0.1;
  W.pose(tNam, 0.45, { x: FX + 92, y: FY + 30, lean: -90, legLs: 1, legRs: 1, aLu: -30, aLf: -80, aRu: 30, aRf: 80, eye: 1 }, "power2.inOut");
  W.mouth(tNam + 0.2, "smirk");
  
  // võng đung đưa nhẹ, Wob thở
  api.origin("#vmG", "0 0");
  for (var ts = tNam + 0.4, s = 0; ts < DUR; ts += 1.3, s++) { api.key("#vm-vai", "rotation", ts, 360 + (s % 2 ? 2.5 : -2.5), "sine.inOut"); api.key("#lat", "rotation", ts, 360 + (s % 2 ? 2.5 : -2.5), "sine.inOut"); }
  W.breathe(tNam, DUR, 2.4);
  // ngủ: mũ cói úp lên mặt
  W.lid(Math.min(tNam + 0.55, 5.6), 0.35, 62);   // nhắm mắt từ lúc nằm xuống (≤ 6 s) tới hết đoạn
  W.mouth(tWorked, "X");
  api.key("#W-mu", "y", 0, 0, "step"); api.key("#W-mu", "rotation", 0, 0, "step");
  api.key("#W-mu", "y", tFell - 0.3, 0, "none"); api.key("#W-mu", "y", tFell + 0.4, 112, "power2.inOut");
  api.key("#W-mu", "rotation", tFell - 0.3, 0, "none"); api.key("#W-mu", "rotation", tFell + 0.4, -8, "power2.inOut");
  // ba bọt sóng vỗ đều dưới trăng
  for (var i = 0; i < 3; i++) {
    var sel = "#fo" + i;
    api.origin(sel, "0 0");
    api.key(sel, "scale", 0, 0.6, "step");
    for (var tf = 0.4 + i * 0.6, f = 0; tf < DUR; tf += 1.8, f++) { api.key(sel, "scale", tf, 0.6, "none"); api.key(sel, "scale", tf + 0.4, 1.1, "sine.out"); api.key(sel, "scale", tf + 1.4, 0.6, "sine.in"); }
  }
  api.sfx("song", tWorked + 0.2, 0.45); api.sfx("song", tFell + 0.6, 0.35);
  W.autoBlink(0.5, tNgoi - 0.3, 41);
};
