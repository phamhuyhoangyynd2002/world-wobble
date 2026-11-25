/* Đoạn d20 · cắt giấy · hồi ức: trước Begich Towers, gió thổi tuyết ướt ngang, sóng bạc đầu trên vịnh. Vào "cat", ra "chen" (cắt cứng).
   Trang phục: áo mưa vàng trùm mũ, ba lô ô liu có cuộn thảm đỏ, giày đỏ; găng đỏ tay trái, tháo ra ở nhịp nhiệt kế.
   Chữ: 10–15 mph, 40–60 mph (thẻ trên cột cờ), ≈0°C · ≈32°F (nhiệt kế trên tường). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var C = data.chu_tren_do_vat;
  var GROUND = 900, SZ = 0.62, YC = -214 * SZ;

  var gang = '<g id="W-gang"><circle cx="0" cy="0" r="21" fill="#C9463A" stroke="' + D.INK + '" stroke-width="4"/><rect x="-16" y="-30" width="32" height="14" rx="5" fill="#F6EEDC" stroke="' + D.INK + '" stroke-width="3"/></g>';
  var W = WH.wob(api, "W", { ao: "trum", holdL: gang });

  // ---- lớp xa: núi tuyết dưới trời bão ----
  var xa = WH.nui(-900, 3200, 760, 2001, { mau: "#8FA39B", tuyet: "#F4F8F8", cao: [300, 480] });
  // ---- lớp giữa: vịnh, bờ, cột cờ, toà nhà ----
  var mid = WH.nuoc("bay", -1200, 1080, 760, 160, { song: 7, seed: 2011, vet: 10 });
  mid += WH.dat(-1200, 3200, GROUND - 120, "#8E9690", 2012, { cao: 1100 });
  mid += D.paper("M -1200 " + (GROUND - 120) + " L 1080 " + (GROUND - 120) + " L 1080 " + (GROUND - 104) + " L -1200 " + (GROUND - 104) + " Z", "#F2F5F2", { shadow: false });
  mid += at(1520, GROUND, WH.tuongCua("toa", 1100));
  mid += at(1730, 300, WH.nhietKe("nk", C[2], 46));
  mid += at(620, GROUND - 40, WH.cotCo("cot", 560));
  mid += at(620, GROUND - 440, g("tag1", D.line("M 0 -40 L 0 0", 3) + WH.the("tag1c", C[0], 52, { seed: 2013 }).replace('<g id="tag1c">', '<g id="tag1c" transform="translate(0,46)">')));
  mid += at(620, GROUND - 440, g("tag2", D.line("M 0 -40 L 0 0", 3) + WH.the("tag2c", C[1], 52, { seed: 2014, mau: "#F3D9C8" }).replace('<g id="tag2c">', '<g id="tag2c" transform="translate(0,46)">')));
  mid += at(1520, GROUND + 6, g("vungc", WH.vung("vg", 300)));
  mid += '<g id="WRp"><g id="WRr">' + W.svg + "</g></g>";
  // ---- lớp gần: cột lan can, mảng tuyết ướt ----
  var gan = at(-140, 1080, D.paper(D.rRect(-30, -260, 60, 300, 1.4, 2015), "#6F7672", { stroke: true, sw: 4 })) +
    at(2300, 1080, D.paper(D.rRect(-30, -240, 60, 300, 1.4, 2016), "#6F7672", { stroke: true, sw: 4 })) +
    at(900, 1110, D.snowPile(520, 70, 2017));
  var fx = WH.gioTuyet(api, "sn", 46, { seed: 2018, toc: 1100, nghieng: 14, mat: function (t) { return t < 6.2 ? 0.55 : 1; } });

  api.dat('<rect width="1920" height="1080" fill="url(#whBao)"/>' + WH.defs() +
    api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", mid, 1, { mat: GROUND }) + api.lop("gan", gan, 1.4, { mat: 1080 }) + g("fx", fx));
  api.noi({});

  // ---- mốc lời ----
  var tWind = T("wind", 0, 0.24), tTen = T("ten", 0, 1.94), tBut = T("but", 3, 4.01), tBlows = T("blows", 0, 6.39), tForty = T("forty", 0, 6.76);
  var tWaves = T("waves", 0, 8.32), tRolled = T("rolled", 0, 11.16), tDoor = T("door,", 0, 12.34), tGently = T("gently,", 0, 13.01), tBouncer = T("bouncer.", 0, 13.97);
  var tHere = T("here's", 0, 14.94), tCold = T("cold.", 0, 16.73), tRec = T("records,", 0, 18.42), tJan = T("january", 0, 19.12), tFreez = T("freezing.", 0, 20.96);
  var tFirst = T("first", 0, 21.94), tLot = T("lot.", 0, 23.56);

  // ---- camera ----
  api.camera([
    [0, 860, 560, 0.92], [tTen - 0.6, 760, 560, 0.98, "sine.inOut"],
    [tTen - 0.05, 660, 600, 1.22, "power3.inOut"], [tBut, 650, 600, 1.26, "sine.inOut"],
    [tBlows - 0.2, 470, 640, 1.08, "power2.inOut"], [tWaves + 1.4, 430, 650, 1.12, "sine.inOut"],
    [tRolled - 0.1, 560, 640, 1.1, "sine.inOut"], [tDoor - 0.1, 1320, 650, 1.04, "power2.inOut"],
    [tBouncer + 0.6, 1400, 650, 1.08, "sine.inOut"],
    [tHere + 0.5, 1760, 600, 1.12, "power3.inOut"], [tFreez + 0.5, 1790, 590, 1.2, "sine.inOut"],
    [DUR, 1700, 610, 1.16, "sine.inOut"]
  ]);

  // ---- vịnh: sóng nhấp nhô, dâng cao khi gió mạnh ----
  for (var i = 0; i < 7; i++) {
    var ss = "#bay-s" + i;
    api.origin(ss, "0 0");
    WH.nhapNho(api, ss, 0, DUR, 8 + i % 3 * 3, 1.1 + i * 0.07, i * 0.23);
    api.key(ss, "scale", 0, 0.75, "step"); api.key(ss, "scale", tBlows, 0.75, "none"); api.key(ss, "scale", tWaves + 0.1, 1.55, "back.out(1.6)");
  }
  // ---- cờ: căng dần ----
  WH.coBay(api, "cot-co", 560, function (t) { return t < tBlows - 0.3 ? 0.55 : Math.min(1, 0.55 + (t - tBlows + 0.3) * 1.2); }, 9);
  // ---- thẻ tốc độ gió ----
  api.origin("#tag1", "0 -40"); api.origin("#tag2", "0 -40");
  api.show("#tag1", 0, 1); api.set("#tag1", 0, { scale: 0 });
  api.pop("#tag1", tTen - 0.12, 0.3);
  api.key("#tag1", "rotation", 0, 0, "step"); api.key("#tag1", "rotation", tTen + 0.4, -10, "sine.inOut"); api.key("#tag1", "rotation", tTen + 1.2, -4, "sine.inOut"); api.key("#tag1", "rotation", tBlows - 0.3, -8, "sine.inOut");
  api.key("#tag1", "rotation", tForty - 0.15, -70, "power2.in");
  api.key("#tag1", "x", 0, 0, "step"); api.key("#tag1", "x", tForty - 0.15, 0, "none"); api.key("#tag1", "x", tForty + 0.5, 900, "power2.in");
  api.show("#tag1", tForty + 0.5, 0);
  api.set("#tag2", 0, { scale: 0 }); api.pop("#tag2", tForty - 0.12, 0.3);
  api.key("#tag2", "rotation", 0, 0, "step"); api.key("#tag2", "rotation", tForty + 0.2, -8, "power2.out");
  for (var q = 0; q < 8; q++) api.key("#tag2", "rotation", tForty + 0.5 + q * 0.33, q % 2 ? -10 : -4, "sine.inOut");
  api.key("#tag2", "rotation", tRolled + 1.5, -6, "sine.inOut");

  // ---- Wob ôm cột cờ trong gió ----
  api.origin("#WRr", "0 " + YC);
  api.key("#WRp", "x", 0, 540, "step"); api.key("#WRp", "y", 0, GROUND - 40, "step");
  W.set(0, { x: 0, y: 0, size: SZ, lean: -6, aRu: -120, aRf: 20, aLu: 18, aLf: -10, pupX: 8, lashes: 1, ice: 0 });
  W.mouth(0, "flat");
  W.idle(0.2, tTen - 0.2, { seed: 201, bien: 1.6 });
  W.pose(tTen - 0.1, 0.25, { pupX: 10, pupY: -12 }, "power2.out");                 // ngước nhìn thẻ
  W.pose(tTen + 1.2, 0.3, { pupX: -10, pupY: 0, lean: -9 }, "power2.inOut");         // quay nhìn vịnh
  W.shiver(tBut, tBlows - 0.3, 1.2, 10);
  // gió mạnh: thân bị kéo ngang, chân rời đất, bám cột bằng tay phải
  W.pose(tBlows - 0.25, 0.3, { lean: 24, sx: 1.12, sy: 0.9, legL: -50, legR: -64, aLu: 70, aLf: 30, eye: 1.2 }, "back.out(1.6)");
  W.mouth(tBlows - 0.2, "o");
  W.shiver(tBlows + 0.1, tRolled - 0.15, 2.6, 15);
  W.pose(tWaves, 0.25, { pupX: -12, pupY: 6 }, "power2.out");
  W.mouth(tWaves + 0.6, "wobbly");
  // buông tay → cuộn tròn lăn về cửa
  var t0 = tRolled - 0.15, tTrong = tDoor + 0.05, tRa = tGently + 0.35, tDung = tBouncer - 0.2;
  W.pose(t0, 0.18, { lean: 0, sx: 1, sy: 1, legL: 30, legR: -30, aRu: -20, aRf: 60, aLu: 20, aLf: -60, eye: 1, lid: 20 }, "power2.out");
  W.mouth(t0, "o");
  api.key("#WRp", "x", t0, 540, "none"); api.key("#WRp", "x", tTrong, 1520, "power1.in");
  api.key("#WRr", "rotation", 0, 0, "step"); api.key("#WRr", "rotation", t0, 0, "none"); api.key("#WRr", "rotation", tTrong, 720, "power1.in");
  api.key("#WRp", "y", t0, GROUND - 40, "none"); api.key("#WRp", "y", t0 + 0.5, GROUND - 4, "power2.in"); api.key("#WRp", "y", tTrong, GROUND - 20, "none");
  // cửa mở: Wob lăn vào trong (nhỏ dần), cửa bật lại, Wob lăn ra
  api.origin("#toa-cuaT", "0 0"); api.origin("#toa-cuaP", "0 0");
  api.key("#toa-cuaT", "scaleX", 0, 1, "step"); api.key("#toa-cuaT", "scaleX", tTrong - 0.15, 1, "none"); api.key("#toa-cuaT", "scaleX", tTrong + 0.05, 0.12, "power3.out");
  api.key("#toa-cuaP", "scaleX", 0, 1, "step"); api.key("#toa-cuaP", "scaleX", tTrong - 0.15, 1, "none"); api.key("#toa-cuaP", "scaleX", tTrong + 0.05, 0.12, "power3.out");
  api.key("#toa-cuaT", "scaleX", tRa - 0.2, 0.12, "none"); api.key("#toa-cuaT", "scaleX", tRa + 0.2, 1, "back.out(2)");
  api.key("#toa-cuaP", "scaleX", tRa - 0.2, 0.12, "none"); api.key("#toa-cuaP", "scaleX", tRa + 0.2, 1, "back.out(2)");
  api.key("#WRp", "y", tTrong + 0.3, GROUND - 60, "power2.out");
  api.key("#WRp", "scale", 0, 1, "step"); api.key("#WRp", "scale", tTrong, 1, "none"); api.key("#WRp", "scale", tTrong + 0.3, 0.8, "power2.out");
  api.key("#WRr", "rotation", tTrong + 0.3, 800, "power2.out");
  api.key("#WRp", "x", tTrong + 0.3, 1540, "power2.out");
  // gió đẩy ra lại
  api.key("#WRp", "x", tRa - 0.25, 1540, "none"); api.key("#WRp", "x", tDung, 1300, "power2.out");
  api.key("#WRp", "y", tRa - 0.25, GROUND - 60, "none"); api.key("#WRp", "y", tDung, GROUND - 10, "power2.out");
  api.key("#WRp", "scale", tRa - 0.25, 0.8, "none"); api.key("#WRp", "scale", tRa + 0.2, 1, "power2.out");
  api.key("#WRr", "rotation", tRa - 0.25, 800, "none"); api.key("#WRr", "rotation", tDung, 720, "power2.out");
  api.sfx("bonk", tTrong + 0.02, 0.7); api.sfx("bonk", tRa - 0.2, 0.55);
  // đứng dậy, phủi áo, nhìn cửa như nhìn người gác
  W.pose(tDung, 0.3, { legL: 0, legR: 0, aRu: -18, aRf: 10, aLu: 18, aLf: -10, lid: 0, sy: 0.9 }, "power2.out");
  W.pose(tDung + 0.3, 0.25, { sy: 1 }, "back.out(2)");
  W.mouth(tDung + 0.1, "flat");
  W.pose(tBouncer + 0.1, 0.3, { pupX: 12, pupY: -4, lean: -4 }, "power2.inOut");
  W.idle(tDung + 0.6, tHere, { seed: 202, bien: 1.4 });
  // ---- nhiệt kế: thuỷ ngân lên quanh vạch đóng băng; Wob đi tới, ngạc nhiên, tháo găng ----
  api.origin("#nk-merc", "0 0");
  api.set("#nk-merc", 0, { scaleY: 0.12 });
  api.key("#nk-merc", "scaleY", tHere - 0.1, 0.12, "none"); api.key("#nk-merc", "scaleY", tCold - 0.2, 0.52, "back.out(1.4)");
  api.origin("#nk-nhan", "180 340");
  api.set("#nk-nhan", 0, { scale: 0 }); api.pop("#nk-nhan", tJan - 0.2, 0.3);
  api.sfx("ting", tJan - 0.15, 0.45);
  var xW = 1300, xNk = 1590;
  api.key("#WRp", "x", tHere, xW, "none"); api.key("#WRp", "x", tHere + 0.9, xNk, "sine.inOut");
  W.walk(tHere, tHere + 0.9, 0, 0, { step: 0.3, tieng: "buoc-tuyet" });
  W.pose(tHere + 0.95, 0.25, { pupX: 10, pupY: -14 }, "power2.out");
  W.soc(tCold - 0.05, { mieng: "o", giuMat: true });
  W.pose(tCold + 0.5, 0.3, { aLu: 120, aLf: 40, aRu: -110, aRf: -40 }, "power2.inOut");          // hai tay gặp nhau: kéo găng
  api.origin("#W-gang", "0 0");
  api.key("#W-gang", "x", 0, 0, "step"); api.key("#W-gang", "x", tCold + 0.9, 0, "none"); api.key("#W-gang", "x", tCold + 1.2, 46, "power2.out");
  api.show("#W-gang", 0, 1); api.show("#W-gang", tCold + 1.25, 0);
  W.pose(tCold + 1.3, 0.3, { aLu: 40, aLf: -70, aRu: -18, aRf: 10, pupX: -6, pupY: 4 }, "power2.out");   // soi bàn tay trần
  W.mouth(tCold + 1.4, "smirk");
  W.idle(tCold + 1.7, tFirst - 0.2, { seed: 203, bien: 1.6 });
  W.pose(tRec, 0.3, { pupX: 10, pupY: -14 }, "power2.out");
  W.pose(tFreez + 0.1, 0.25, { pupX: 0, pupY: 0 }, "power2.out");
  W.nhunVai(tFirst - 0.1, 0.8);
  W.mouth(tFirst, "grin");
  W.pose(tLot - 0.4, 0.3, { lean: 4, aLu: 140, aLf: 10 }, "back.out(1.6)");
  W.vay(tLot - 0.3, 3, "L");
  W.autoBlink(0.5, DUR, 2019);
};
