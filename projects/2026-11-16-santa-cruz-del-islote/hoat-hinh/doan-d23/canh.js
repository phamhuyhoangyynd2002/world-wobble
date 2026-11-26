/* Đoạn d23 · cắt giấy · hồi ức: bến đảo buổi chiều → hoàng hôn → đảo lên đèn.
   Vào "cat", ra "giay".
   Shot: cano trắng cập bến, khách (dạng chung, mũ rộng vành, máy ảnh) lách vòng quanh ba lô của Wob; xa xa đảo bên có mái khách sạn
         → Wob đi cuối đoàn một vòng đảo (lia nhoè về lại bến) → cận que kem vẫn nguyên → hoàng hôn: Wob ngồi mép bến, ba lô bên cạnh,
         thuyền gỗ về bến, vẽ thuyền vào sổ, mặt trời giấy lặn → CẬN trang sổ kín hình thuyền → lùi ra: toàn cảnh đảo lên đèn trên mặt nước tối.
   Trang phục: mũ cói; ôm ba lô khổng lồ trước ngực (bình xịt túi hông); sổ du lịch ở hai nhịp cuối. Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, B = window.NhietDoiB, at = api.at, DUR = api.DUR, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  var Y = 800, SW = 0.55, K = 1.6;

  // ---------- mốc lời ----------
  var tLater = T("Later,", 0, 0.15), tSpeed = T("speedboats", 0, 1.06), tHotels = T("hotels", 0, 2.69), tIslands = T("islands,", 0, 3.71), tYear = T("year.", 0, 5.86);
  var tSome = T("Some", 0, 6.56), tHotels2 = T("hotels", 1, 8.54), tJoined = T("joined", 0, 9.68), tLap = T("lap", 0, 11.09), tIsland = T("island.", 0, 11.6);
  var tFinished = T("finished", 0, 12.64), tIce = T("ice", 0, 13.75), tMelt = T("melt.", 0, 14.95), tThen = T("Then", 0, 15.61), tHome = T("home,", 0, 16.79);
  var tFolded = T("folded", 0, 18.09), tEvery = T("Every", 1, 19.86), tBoat = T("boat", 0, 20.7), tNobody = T("Nobody", 0, 21.56), tAcc = T("accident.", 0, 23.35);

  // ---------- trời (tĩnh), lớp phủ hoàng hôn ----------
  var troi = '<rect width="1920" height="1080" fill="url(#ndTroi)"/><rect id="tCam" width="1920" height="1080" fill="url(#skyCam)" opacity="0"/>';
  // ---------- lớp xa: mặt trời (lặn), đảo bên có mái khách sạn, biển xa ----------
  var ks = '<g transform="translate(1520,566)">' + sc(0.42, ND.daoXanh({ w: 1000, seed: 2301 })) +
    D.paper(D.rRect(-120, -78, 240, 66, 1.5, 2302), "#F4F1E8", { stroke: true, sw: 3, shadow: false }) +
    D.paper("M -140 -76 L 0 -112 L 140 -76 Z", "#B5523B", { stroke: true, sw: 3, shadow: false });
  for (var hw = 0; hw < 6; hw++) ks += '<rect x="' + (-100 + hw * 36) + '" y="-60" width="18" height="18" fill="#2F3B40"/>';
  ks += "</g>";
  var xa = '<g id="sun">' + '<circle r="150" fill="#FFE3A6" opacity="0.35"/>' + D.paper(D.rEll(0, 0, 70, 70, 1.5, 2303), "#FFE9B8", { shadow: false, stroke: true, sw: 3 }) + "</g>" +
    '<rect x="-1400" y="556" width="6000" height="900" fill="#8ED5CB"/>' + D.line("M -1400 556 L 4600 556", 3, INK, ' opacity="0.35"') + ks +
    at(-200, 562, sc(0.3, ND.daoXanh({ w: 800, seed: 2304 })));
  for (var m = 0; m < 5; m++) xa += at(-100 + m * 640, 170 + (m % 2) * 60, D.paper(D.rEll(0, 0, 140, 30, 3, 2310 + m), "#FFFFFF", { shadow: false, stroke: true, sw: 2.5 }));

  // ---------- lớp giữa: dãy nhà mép đảo, bến, cano, khách, thuyền về, Wob ----------
  var nha = "";
  [[-700, "#9FB6E8"], [-236, "#F2A65A"], [228, "#5FA8D3"], [692, "#F3EFE4"], [1156, "#EE9AAE"], [2548, "#5FA8D3"], [3012, "#F2A65A"], [3476, "#C77DA8"]].forEach(function (h, i) {
    nha += at(h[0], Y - 30, sc(K * 0.85, ND.nha({ w: 290, h: 230, mau: h[1], seed: 2320 + i, cua: i % 2 ? -0.4 : 0.4, cuaMo: i % 3 !== 0, so: 1, mai: i % 2 ? "doc" : "hoi" })));
  });
  var san = D.paper(D.rRect(-1400, Y - 40, 6400, 60, 2, 2340), "#DAD3C3", { shadow: false });
  var bienG = ND.bien(api, "bs", { x0: -1400, x1: 4800, y: Y + 20, n: 3, day: 46, bien: 22 });
  var ben = D.dock(-1400, 4600, Y, { day: 36, coc: 260, seed: 2350 });
  var cano = '<g id="cano">' + sc(0.62, D.speedboat("cn", { huong: 1 })) + "</g>";
  var thung = at(1060, Y + 2, sc(0.6, D.fishCrate()));
  // khách du lịch (dạng chung): mũ rộng vành, máy ảnh, kem
  var KH = [
    { id: "k0", ao: "#E9806E", mu: "#F2EAD0", cam: '<g transform="translate(-14,-8)">' + D.cameraSmall() + "</g>" },
    { id: "k1", ao: "#5FA8D3", mu: "#E9C46A" },
    { id: "k2", ao: "#F2CB57", mu: "#F2EAD0", cam: '<g transform="translate(0,-4)">' + D.iceCream() + "</g>" },
    { id: "k3", ao: "#86CFB0", mu: "#F2EAD0", cam: '<g transform="translate(-14,-8)">' + D.cameraSmall() + "</g>" }
  ];
  var khach = KH.map(function (k) { return B.nguoiDat(api, k.id, 640, Y + 4, 0.72, { ao: k.ao, quan: "#3E4A50", mu: k.mu, cam: k.cam }); }).join("");
  // thuyền gỗ về bến lúc hoàng hôn
  var TB = [["#C9463A", 0.36], ["#3F7FB8", 0.34], ["#F2CB57", 0.32]];
  var thuyen = TB.map(function (b, i) { var t = ND.thuyen("tv" + i, { mau: b[0] }); return '<g id="tv' + i + 'G">' + sc(b[1], t.sau + t.truoc) + "</g>"; }).join("");
  // Wob (ôm ba lô) + ba lô rời (đặt cạnh lúc ngồi) + sổ vẽ trên đùi
  var BUT = '<g id="W-but" opacity="0"><g transform="rotate(-30)">' + D.pencil(110, {}) + "</g></g>";
  var W = ND.wob(api, "W", { lung: 0, truoc: 1, truocTf: "translate(400,396) scale(0.9)", holdR: BUT });
  var pkBen = '<g id="pkBen" opacity="0">' + sc(0.5, ND.baLo("pkb", {})) + "</g>";
  var phai = "";
  var TH = [[34, 40], [96, 36], [150, 44], [40, 104], [104, 98], [152, 110], [30, 168], [92, 164], [150, 172], [60, 214], [128, 214]];
  TH.forEach(function (p, i) { phai += at(p[0], p[1], '<g id="ts' + i + '">' + D.sketchIcon("thuyen", 1.05, INK) + "</g>"); });
  var trai = "";
  [[40, 44], [110, 50], [30, 110], [100, 118], [60, 176], [134, 182]].forEach(function (p, i) { trai += at(p[0], p[1], D.sketchIcon("thuyen", 1.05, INK)); });
  var so = '<g id="soG" opacity="0">' + D.sketchbook("sb", 320, 240, { trai: trai, phai: phai }) + "</g>";
  var mo = '<rect id="hoangHon" x="-1400" y="-200" width="6400" height="1600" fill="#5B3F6A" opacity="0"/>';

  var giua = san + nha + mo + ben + thung + cano + khach + pkBen + W.svg + so + bienG + thuyen;
  var gan = ND.bien(api, "bg", { x0: -1400, x1: 4800, y: 1030, n: 2, day: 40, mau: ["#3FA9A6", "#2B9097"], bien: 26 });

  // ---------- toàn cảnh đêm: đảo lên đèn, thuyền neo quanh (nhóm khung màn hình) ----------
  var dem = '<g id="dem" opacity="0"><g id="demK"><rect x="-200" y="-200" width="2400" height="1500" fill="url(#ndTroiDem)"/>' + ND.sao(40, [0, 0, 1920, 480], 2360) +
    at(1540, 190, ND.trang(46)) + '<rect x="-200" y="600" width="2400" height="900" fill="url(#ndBienDem)"/>' +
    at(1650, 604, sc(0.36, ND.daoNhaXa({ w: 900, seed: 2361, dem: true }))) +
    at(940, 640, sc(1.15, ND.daoNhaXa({ w: 1000, seed: 2362, dem: true, hang: 2, thuyen: 0 })));
  for (var r = 0; r < 14; r++) dem += D.line("M " + (520 + r * 62) + " " + (668 + (r % 3) * 16) + " l " + (26 + (r % 4) * 8) + " 0", 4, "#FFD68A", ' opacity="0.55"');
  [[300, 700, "#C9463A"], [520, 740, "#3F7FB8"], [1380, 730, "#F2CB57"], [1600, 700, "#2A9D8F"], [760, 770, "#E9806E"]].forEach(function (b, i) {
    dem += at(b[0], b[1], sc(0.16, ND.thuyen("", { mau: b[2], may: false }).truoc));
  });
  dem += "</g></g>";

  api.dat(D.defsNhietDoi() + ND.defs() + troi + '<g id="nhoe">' + api.lop("xa", xa, 0.35, { mat: 560 }) + api.lop("giua", giua, 1, { mat: Y }) + api.lop("gan", gan, 1.4, { mat: 1080 }) + "</g>" +
    api.locNhoe("nhoeF", "nhoe", [[tIsland + 0.55, tIsland + 0.95, 40]]) + dem);
  api.noi({ raDai: 0.45 });

  // ---------- camera ----------
  var tWhip = tIsland + 0.75, KX = 980, tIceCam = tIce - 0.35;
  api.camera([
    [0, 860, 640, 1.22], [tHotels, 900, 640, 1.25, "sine.inOut"],
    [tIslands - 0.2, 1080, 640, 1.22, "power2.inOut"],                 // khách lách quanh ba lô
    [tHotels2, 1180, 645, 1.26, "sine.inOut"],
    [tJoined + 0.2, 1500, 640, 1.2, "power2.inOut"],
    [tWhip - 0.2, 2500, 640, 1.2, "power1.in"],                        // đi một vòng đảo
    [tWhip + 0.2, 860, 650, 1.22, "power1.out"],                       // lia nhoè về lại bến
    [tIceCam, 880, 650, 1.24, "sine.inOut"],
    [tIce + 0.05, 890, 690, 2.7, "power2.inOut"],             // que kem vẫn nguyên
    [tMelt + 0.3, 896, 690, 2.82, "sine.inOut"],
    [tThen + 0.35, 1020, 640, 1.3, "power2.inOut"],                    // hoàng hôn
    [tFolded + 0.6, 1040, 660, 1.42, "sine.inOut"],
    [tEvery - 0.05, 770, Y - 23, 5.4, "power2.inOut"],                 // CẬN trang sổ
    [tNobody, 770, Y - 23, 5.6, "sine.inOut"],
    [DUR, 770, Y - 23, 5.7, "sine.inOut"]
  ]);

  // ---------- cano cập bến ----------
  api.origin("#cano", "0 0");
  api.set("#cano", 0, { x: -500, y: Y + 30 });
  api.key("#cano", "x", tSpeed - 0.3, -500, "none"); api.key("#cano", "x", tSpeed + 1.3, 560, "power3.out");
  for (var tc = 0, c = 0; tc < DUR; tc += 1.2, c++) api.key("#cano", "rotation", tc, c % 2 ? 1 : -1, "sine.inOut");
  api.sfx("song", tSpeed + 0.9, 0.4);

  // ---------- khách bước lên, lách vòng quanh ba lô của Wob ----------
  var XW = 1150;
  KH.forEach(function (k, i) {
    var sel = "#" + k.id + "-vt", t0 = tSpeed + 1.5 + i * 0.55;
    api.set(sel, 0, { x: 600, y: Y + 30, opacity: 0 });
    api.key(sel, "opacity", t0, 1, "step");
    api.key(sel, "y", t0, Y + 30, "none"); api.key(sel, "y", t0 + 0.3, Y + 4, "back.out(2)");
    B.nguoiDi(api, k.id, t0 + 0.35, t0 + 1.6, XW - 120, { buoc: 0.32 });
    B.nguoiDi(api, k.id, t0 + 1.6, t0 + 2.6, XW + 120, { buoc: 0.32, y1: Y - 34 });      // vòng ra sau lưng ba lô
    B.nguoiDi(api, k.id, t0 + 2.6, t0 + 3.6, XW + 400 + i * 120, { buoc: 0.32, y1: Y + 4 });
    // một vòng đảo
    B.nguoiDi(api, k.id, tJoined - 0.2 + i * 0.1, tWhip, 2700 + i * 120, { buoc: 0.3 });
    api.key(sel, "x", tWhip + 0.01, -300 - (3 - i) * 130, "step");
    B.nguoiDi(api, k.id, tWhip + 0.05, tFinished + 0.9, [620, 760, KX, 1200][i], { buoc: 0.3 });
    // hoàng hôn: khách tản vào làng
    B.nguoiDi(api, k.id, tThen - 0.3 + i * 0.15, tThen + 2.2 + i * 0.15, -600 - i * 120, { buoc: 0.3 });
  });

  // ---------- Wob ----------
  W.set(0, { x: XW, y: Y + 6, size: SW, aLu: 18, aLf: -10, aRu: -50, aRf: 30, pupX: -8, op: 1 });
  W.mouth(0, "flat");
  W.idle(0.2, tJoined - 0.3, { seed: 3, bien: 1.6 });
  // mắt theo đoàn khách
  for (var tl = tSpeed + 1.6, l = 0; tl < tHotels2; tl += 0.9, l++) W.pose(tl, 0.25, { pupX: [-12, -6, 6, 12, 8][l % 5], pupY: l % 2 ? -4 : 0 }, "power2.out");
  W.pose(tSome, 0.3, { lean: 3, upRot: 3 }, "sine.inOut"); W.pose(tHotels2, 0.3, { lean: 0, upRot: 0 }, "sine.inOut");
  W.mouth(tYear, "wobbly"); W.mouth(tHotels2, "flat");
  // đi cuối đoàn một vòng đảo
  W.walk(tJoined + 0.2, tWhip, XW, 2560, { step: 0.3, arms: false });
  W.set(tWhip + 0.01, { x: -760 });
  W.walk(tWhip + 0.06, tFinished + 1.0, -760, 760, { step: 0.28, arms: false });
  W.mouth(tJoined + 0.3, "smirk");
  // nhìn que kem, nhìn đảo
  W.pose(tIce - 0.1, 0.25, { pupX: 13, pupY: -4, eye: 1.12 }, "power2.out");
  W.pose(tMelt - 0.3, 0.3, { pupX: -4, pupY: -13, eye: 1 }, "power2.inOut");
  W.mouth(tIce, "o"); W.mouth(tMelt + 0.1, "flat");
  // hoàng hôn: ngồi mép bến, ba lô bên cạnh, vẽ thuyền vào sổ
  var tNgoi = tThen + 0.05;
  W.pose(tNgoi, 0.35, { legLs: 0.5, legRs: 0.5, y: Y + 46, aLu: -34, aLf: -60, aRu: 40, aRf: 66, pupX: 8, pupY: 6 }, "power2.inOut");
  api.show("#W-blT", tNgoi + 0.15, 0);
  api.set("#pkBen", 0, { x: 900, y: Y + 4 }); api.show("#pkBen", 0, 0); api.show("#pkBen", tNgoi + 0.15, 1);
  api.origin("#soG", "0 0"); api.set("#soG", 0, { x: 770, y: Y + 20, scale: 0.36 }); api.show("#soG", 0, 0); api.show("#soG", tNgoi + 0.2, 1);
  api.show("#W-but", 0, 0); api.show("#W-but", tNgoi + 0.2, 1);
  for (var tv = tNgoi + 0.6, v = 0; tv < tEvery; tv += 0.22, v++) W.pose(tv, 0.2, { aRf: v % 2 ? 58 : 72 }, "sine.inOut");
  for (var tg = tNgoi + 1.2, g = 0; tg < tEvery - 0.6; tg += 1.4, g++) { W.pose(tg, 0.3, { pupX: 12, pupY: -2 }, "power2.out"); W.pose(tg + 0.7, 0.3, { pupX: 4, pupY: 10 }, "power2.out"); }
  W.mouth(tThen + 0.6, "smirk");
  W.autoBlink(0.5, DUR, 31);
  // hoàng hôn: trời đổi, mặt trời lặn
  api.key("#tCam", "opacity", 0, 0, "step"); api.key("#tCam", "opacity", tThen - 0.4, 0, "none"); api.key("#tCam", "opacity", tThen + 0.8, 1, "sine.inOut");
  api.key("#hoangHon", "opacity", 0, 0, "step"); api.key("#hoangHon", "opacity", tThen - 0.4, 0, "none"); api.key("#hoangHon", "opacity", tThen + 0.8, 0.22, "sine.inOut");
  api.set("#sun", 0, { x: 1300, y: 300 });
  api.key("#sun", "y", tThen - 0.4, 300, "none"); api.key("#sun", "y", tFolded + 1.0, 650, "sine.in");
  // thuyền gỗ về bến
  TB.forEach(function (b, i) {
    var sel = "#tv" + i + "G", t0 = tThen + 0.2 + i * 0.9, x1 = [1130, 1420, 1700][i];
    api.origin(sel, "0 0");
    api.set(sel, 0, { x: 3400 + i * 300, y: Y + 92 + i * 8 });
    api.key(sel, "x", t0, 3400 + i * 300, "none"); api.key(sel, "x", t0 + 2.6, x1, "power2.out");
    for (var tb = t0, q = 0; tb < DUR; tb += 1.1, q++) api.key(sel, "rotation", tb, q % 2 ? 1.2 : -1.2, "sine.inOut");
  });
  api.sfx("song", tThen + 1.6, 0.4);
  // sổ kín hình thuyền (bên phải vẽ thêm dần)
  TH.forEach(function (p, i) {
    var t0 = i < 4 ? tThen + 1.4 + i * 0.7 : tEvery + 0.1 + (i - 4) * 0.17;
    api.origin("#ts" + i, "0 0"); api.pop("#ts" + i, t0, 0.18);
  });

  // ---------- lùi ra toàn cảnh đảo lên đèn ----------
  api.key("#dem", "opacity", 0, 0, "step"); api.key("#dem", "opacity", tNobody - 0.25, 0, "none"); api.key("#dem", "opacity", tNobody + 0.05, 1, "sine.inOut");
  api.origin("#demK", "940 640");
  api.key("#demK", "scale", tNobody - 0.25, 2.2, "none"); api.key("#demK", "scale", tAcc + 0.6, 1.0, "power2.inOut"); api.key("#demK", "scale", DUR, 0.98, "sine.out");
};
