/* Đoạn d27 · cắt giấy · hồi ức ngày cuối mùa hè: lối mòn Portage Pass giữa núi xanh, sông băng xa → bến cảng có bảng gỗ → tảng đá phơi nắng.
   Một thế giới dài, camera lướt giữa ba vùng. Vào "giay", ra "giay".
   Trang phục: mũ lưỡi trai xanh băng, ba lô ô liu có cuộn thảm đỏ, ủng cao su; mặc lại áo mưa vàng (hạ mũ trùm), cầm gậy; nhịp cuối gỡ áo mưa.
   Chữ: ~2 mi (biển gỗ), 2026 · WWII Heritage City + 1 per state (bảng bến cảng), never go outside (gạch) + summer (sổ). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, INK = D.INK;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var C = data.chu_tren_do_vat;
  var GROUND = 860, SZ = 0.5;
  var gayR = '<g id="W-gay" transform="rotate(-8)">' + WH.gay(-150) + WH.gay(60) + "</g>";
  var W = WH.wob(api, "W", { ao: "ha", mu: "luoi", ungHien: true, holdR: gayR });

  function bang(id, w, h, cao, inner) {
    return '<g id="' + id + '">' + D.paper(D.rRect(-w / 2 + 30, -cao, 16, cao, 1.2, 2701), "#6B4E33", { stroke: true, sw: 4 }) + D.paper(D.rRect(w / 2 - 46, -cao, 16, cao, 1.2, 2702), "#6B4E33", { stroke: true, sw: 4 }) +
      D.paper(D.rRect(-w / 2, -cao - h, w, h, 1.8, 2703), "#A77B4E", { stroke: true, sw: 5, half: 0.1 }) + inner + "</g>";
  }
  // ---- lớp xa: núi xanh, sông băng giữa hai núi ----
  var xa = D.paper("M 300 560 L 520 330 L 640 300 L 760 340 L 980 560 Z", "#E3F1F6", { stroke: true, sw: 3, half: 0.08 }) + D.line("M 560 360 L 600 520 M 680 330 L 700 520", 4, "#A9D3E2");
  xa += WH.nui(-900, 5200, 580, 2704, { mau: "#6E9E6A", tuyet: "#F4F8F8", cao: [300, 520], thac: true });
  // ---- lớp giữa ----
  var mid = WH.dat(-900, 2500, GROUND - 30, "#8DBB7C", 2705, { cao: 900 });
  mid += D.paper("M -900 " + (GROUND - 10) + " C 0 " + (GROUND - 30) + " 1200 " + (GROUND - 10) + " 2500 " + (GROUND - 20) + " L 2500 " + (GROUND + 40) + " L -900 " + (GROUND + 40) + " Z", "#C9A97A", { shadow: false });
  for (var r = 0; r < 7; r++) mid += at(-600 + r * 420, GROUND - 26, WH.tangDa(90 + (r % 3) * 30, 50 + (r % 2) * 20, 2706 + r, "#8F978F"));
  mid += at(1060, GROUND - 20, bang("bien", 260, 120, 230, D.txt(0, -230 - 38, C[0], 64, { fill: "#FBF1DC" })));
  // vùng cảng
  mid += WH.nuoc("cang", 2500, 5000, GROUND - 120, 700, { grad: "whNuocHe", seed: 2707, vet: 14 });
  mid += at(2500, GROUND - 30, WH.ben(2500, "#7A6450"));
  mid += at(4700, GROUND - 120, WH.tauNho("tauc", 1.2, "#F2EEE4"));
  mid += at(4060, GROUND - 30, bang("bc", 700, 150, 340,
    g("bc1", D.txt(0, -340 - 58, C[1], 46, { fill: "#FBF1DC" }))));
  mid += at(4060, GROUND - 30 - 340 + 20, g("tag", D.line("M 0 0 L 0 40", 3) + WH.the("tagc", C[2], 48, { seed: 2708 }).replace('<g id="tagc">', '<g id="tagc" transform="translate(0,82)">')));
  // vùng tảng đá phơi nắng
  mid += WH.dat(5000, 7400, GROUND - 30, "#9CC48A", 2709, { cao: 900 });
  mid += at(5880, GROUND - 26, WH.tangDa(420, 190, 2710, "#A2A69C"));
  mid += at(6040, GROUND - 200, g("AOR", '<g transform="rotate(-70)">' + WH.aoTreo("aor", { k: 0.42 }) + "</g>"));
  mid += at(5540, GROUND - 26, g("so", '<g transform="rotate(-4)">' + WH.so(560, 270, 2711) +
    WH.viet("s1", -265, -190, "never go", 46, { anchor: "start" }).replace(/clip-path="url\(#s1-cp\)"/, "") +
    WH.viet("s2", -265, -128, "outside", 46, { anchor: "start" }).replace(/clip-path="url\(#s2-cp\)"/, "") +
    WH.gach("gs1", -270, -204, 220) + WH.gach("gs2", -270, -142, 190) +
    WH.viet("s3", 22, -150, C[4], 60, { anchor: "start", fill: "#C9463A" }) + "</g>"));
  mid += g("GIOT", WH.giot("gt", 26));
  for (var m = 0; m < 3; m++) mid += g("mh" + m, WH.giot("mhc" + m, 8));
  mid += W.svg;
  var gan = at(-400, 1130, D.paper(D.rEll(0, -40, 300, 120, 3, 2712), "#5E8E5A", { stroke: true, sw: 4 })) +
    at(2300, 1130, D.paper(D.rEll(0, -30, 260, 110, 3, 2713), "#5E8E5A", { stroke: true, sw: 4 })) +
    at(3500, 1140, D.paper(D.rRect(-40, -320, 80, 360, 1.4, 2714), "#5A4A3C", { stroke: true, sw: 4 })) +
    at(6900, 1130, D.paper(D.rEll(0, -40, 300, 130, 3, 2715), "#5E8E5A", { stroke: true, sw: 4 }));
  var mat = '<circle cx="1640" cy="150" r="150" fill="#FFF4D6" opacity="0.5"/>' + D.paper(D.rEll(1640, 150, 80, 80, 1.5, 2716), "#FBEFC7", { stroke: true, sw: 4, shadow: false });

  api.dat('<rect width="1920" height="1080" fill="url(#whHe)"/>' + WH.defs() + mat +
    api.lop("xa", xa, 0.3, { mat: 580 }) + api.lop("giua", mid, 1, { mat: GROUND }) + api.lop("gan", gan, 1.4, { mat: 1130 }));
  api.noi({});

  var tHiked = T("hiked", 0, 1.39), tTwo = T("two", 0, 3.41), tMount = T("mountains.", 0, 7.01), tWore = T("wore", 0, 8.07), tCase = T("case.", 0, 9.41);
  var tRain = T("rain.", 0, 10.69), tCheat = T("cheated.", 0, 11.75), tBack = T("back", 0, 12.59), tTitle = T("title.", 0, 14.43), tSix = T("twenty-six,", 0, 16.44);
  var tNps = T("national", 0, 17.23), tHer = T("heritage", 0, 20.79), tOnly = T("only", 0, 21.99), tProud = T("proud", 0, 24.51), tSun = T("sun,", 0, 27.19), tStand = T("standing", 0, 26.55);
  var tChanged = T("changed", 0, 27.99), tNot = T("not", 25, 28.99), tForever = T("forever.", 0, 29.61), tSummer = T("summer.", 0, 30.95);

  // ---- camera ----
  var tP1 = tBack - 0.25, tP2 = tStand - 0.45;
  api.camera([
    [0, 700, 600, 1.0], [7.6, 1500, 600, 1.0, "sine.inOut"],
    [tWore + 0.1, 1560, 640, 1.3, "power2.inOut"], [tRain - 0.3, 1500, 640, 1.9, "power2.inOut"], [tCheat + 0.3, 1520, 650, 1.6, "sine.inOut"], [tP1, 1560, 640, 1.4, "sine.inOut"],
    [tP1 + 0.7, 3820, 560, 1.0, "power3.inOut"], [tNps - 0.3, 3900, 540, 1.02, "sine.inOut"],
    [tNps + 0.1, 4040, 470, 1.24, "power2.inOut"], [tProud - 0.3, 4000, 500, 1.2, "sine.inOut"],
    [tProud + 0.4, 3900, 560, 1.08, "power2.inOut"], [tP2, 3880, 560, 1.1, "sine.inOut"],
    [tP2 + 0.7, 5700, 620, 1.12, "power3.inOut"], [tChanged, 5690, 640, 1.2, "sine.inOut"],
    [tNot, 5640, 640, 1.3, "power2.inOut"], [DUR, 5660, 640, 1.36, "sine.inOut"]
  ]);

  // ---- A: leo lối mòn ----
  W.set(0, { x: 250, y: GROUND - 18, size: SZ, lashes: 0, ice: 0, aRu: -40, aRf: -10, aLu: 18, aLf: -10 });
  W.mouth(0, "grin");
  W.walk(0.3, 7.6, 250, 1500, { step: 0.36, arms: false, tieng: "buoc-tuyet" });
  for (var k = 0; k < 10; k++) W.pose(0.3 + k * 0.72, 0.36, { aRu: k % 2 ? -40 : -58, aRf: k % 2 ? -10 : 6 }, "sine.inOut");
  W.pose(tTwo - 0.1, 0.3, { pupX: -10, pupY: -8 }, "power2.out");    // liếc biển gỗ
  W.pose(tTwo + 0.9, 0.3, { pupX: 0, pupY: 0 }, "power2.out");
  // nóng: mồ hôi, áo mưa thừa
  W.pose(7.65, 0.3, { sy: 0.95, sx: 1.04, lid: 20 }, "power2.out");
  W.mouth(tWore, "wobbly");
  W.shiver(tCase - 0.3, tCase + 0.2, 1.0, 10);
  for (var mh = 0; mh < 3; mh++) {
    var sm = "#mh" + mh;
    api.show(sm, 0, 0);
    for (var rep = 0; rep < 3; rep++) {
      var t0 = tWore - 0.2 + mh * 0.35 + rep * 1.0, xx = 1500 + (mh - 1) * 48;
      if (t0 > tRain) break;
      api.key(sm, "x", t0, xx, "step"); api.key(sm, "y", t0, GROUND - 200, "step"); api.key(sm, "opacity", t0, 1, "step");
      api.key(sm, "y", t0 + 0.5, GROUND - 120, "power2.in"); api.key(sm, "opacity", t0 + 0.5, 0, "step");
    }
  }
  // giơ tay hứng mưa: một giọt duy nhất
  W.pose(tRain - 0.5, 0.35, { aLu: 120, aLf: 50, pupX: -6, pupY: -16, lid: 0, sy: 1, sx: 1 }, "power2.out");
  W.mouth(tRain - 0.4, "o");
  api.show("#GIOT", 0, 0); api.show("#GIOT", tRain - 0.2, 1);
  var HP = W.hand("L", tRain + 0.4);
  api.key("#GIOT", "x", 0, HP.x, "step"); api.key("#GIOT", "y", 0, 200, "step");
  api.key("#GIOT", "y", tRain - 0.2, 200, "none"); api.key("#GIOT", "y", tRain + 0.35, HP.y - 14, "power2.in");
  api.key("#GIOT", "scaleY", 0, 1, "step"); api.key("#GIOT", "scaleY", tRain + 0.35, 1, "none"); api.key("#GIOT", "scaleY", tRain + 0.45, 0.6, "power2.out"); api.key("#GIOT", "scaleY", tRain + 0.6, 0.8, "back.out(2)");
  api.key("#GIOT", "opacity", tRain + 1.2, 1, "none"); api.key("#GIOT", "opacity", tRain + 1.4, 0, "power1.in");
  api.sfx("drop", tRain + 0.33, 0.6);
  W.pose(tRain + 0.4, 0.15, { aLu: 112, aLf: 44, eye: 1.15 }, "power2.out");
  W.pose(tRain + 0.9, 0.3, { pupX: 0, pupY: 0, eye: 1 }, "power2.out");
  W.mouth(tCheat - 0.1, "flat");
  W.pose(tCheat, 0.3, { aLu: 18, aLf: -10, lid: 26 }, "power2.inOut");
  // ---- B: về thị trấn (đổi vị trí khi camera đang lướt) ----
  var tJ1 = tP1 + 0.35;
  W.set(tJ1, { x: 3560, lid: 0 });
  W.walk(tJ1 + 0.05, tJ1 + 1.3, 3560, 3760, { step: 0.34, arms: false, tieng: "buoc-tuyet" });
  W.mouth(tJ1, "smirk");
  W.idle(tJ1 + 1.4, tP2 - 0.5, { seed: 271, bien: 1.2, tho: true });
  api.origin("#bc1", "0 -400"); api.set("#bc1", 0, { scale: 0 }); api.pop("#bc1", tNps - 0.1, 0.3); api.sfx("pop", tNps - 0.08, 0.6);
  api.origin("#tag", "0 0"); api.set("#tag", 0, { scale: 0 }); api.pop("#tag", tOnly - 0.1, 0.28);
  api.key("#tag", "rotation", tOnly + 0.3, 6, "sine.inOut"); api.key("#tag", "rotation", tOnly + 1.0, -4, "sine.inOut"); api.key("#tag", "rotation", tOnly + 1.7, 0, "sine.inOut");
  W.pose(tTitle - 0.2, 0.3, { pupX: 12, pupY: -14, lean: -3 }, "power2.out");
  W.pose(tHer, 0.25, { eye: 1.12 }, "back.out(2)");
  W.pose(tOnly + 0.2, 0.25, { pupY: -6, eye: 1 }, "power2.out");
  [0, 0.45, 0.9].forEach(function (d) { W.pose(tProud + d, 0.2, { upY: 10, upRot: 3 }, "sine.inOut"); W.pose(tProud + d + 0.22, 0.2, { upY: 0, upRot: 0 }, "sine.inOut"); });
  W.mouth(tProud, "grin");
  // ---- C: tảng đá phơi nắng: gỡ áo mưa, ngồi, sửa sổ ----
  var tJ2 = tP2 + 0.35, xDa = 5860, yDa = GROUND - 196;
  W.set(tJ2, { x: 5640 });
  W.walk(tJ2 + 0.05, tJ2 + 0.8, 5640, xDa - 60, { step: 0.3, arms: false });
  api.show("#AOR", 0, 0);
  var tCoi = tJ2 + 0.9;
  W.pose(tCoi - 0.25, 0.25, { aLu: 150, aLf: 20, aRu: -150, aRf: -20 }, "power2.out");
  W.doiAo(tCoi, null); api.show("#AOR", tCoi, 1);
  api.origin("#AOR", "0 0"); api.key("#AOR", "y", 0, 0, "step"); api.key("#AOR", "y", tCoi, -80, "none"); api.key("#AOR", "y", tCoi + 0.35, 0, "bounce.out");
  api.show("#W-gay", tCoi, 0);
  W.pose(tCoi + 0.1, 0.3, { aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "power2.inOut");
  W.mouth(tCoi + 0.1, "grin");
  // trèo lên đá ngồi
  W.pose(tChanged - 0.35, 0.35, { x: xDa, y: yDa, sy: 0.92, legL: -24, legR: 24 }, "back.out(1.4)");
  W.pose(tChanged + 0.2, 0.3, { pupX: -12, pupY: 8, aLu: 100, aLf: 30 }, "power2.out");
  // gạch never go outside, viết summer
  api.origin("#gs1", "-270 -204"); api.origin("#gs2", "-270 -142");
  api.key("#gs1", "scaleX", 0, 0.001, "step"); api.key("#gs1", "scaleX", tNot - 0.1, 0.001, "none"); api.key("#gs1", "scaleX", tNot + 0.3, 1, "power1.inOut");
  api.key("#gs2", "scaleX", 0, 0.001, "step"); api.key("#gs2", "scaleX", tNot + 0.3, 0.001, "none"); api.key("#gs2", "scaleX", tForever + 0.2, 1, "power1.inOut");
  WH.vietKey(api, "s3", 16, tSummer - 0.5, 0.7);
  for (var w2 = 0; w2 < 10; w2++) W.pose(tNot - 0.1 + w2 * 0.15, 0.15, { aLu: w2 % 2 ? 96 : 110, aLf: w2 % 2 ? 22 : 38 }, "sine.inOut");
  for (var w3 = 0; w3 < 5; w3++) W.pose(tSummer - 0.5 + w3 * 0.15, 0.15, { aLu: w3 % 2 ? 92 : 106, aLf: w3 % 2 ? 22 : 36 }, "sine.inOut");
  W.mouth(tNot, "smirk");
  W.pose(tSummer + 0.4, 0.4, { aLu: 30, aLf: -20, pupX: 4, pupY: -4, lean: -4, lid: 18 }, "power2.inOut");   // ngả ra phơi nắng
  W.mouth(tSummer + 0.4, "grin");
  W.breathe(tSummer + 0.5, DUR, 1.8);
  W.autoBlink(0.6, tSummer, 2717);
};
