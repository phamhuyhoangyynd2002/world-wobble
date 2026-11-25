/* Đoạn d22 · cắt giấy · hồi ức: hành lang Begich Towers, móc treo áo cạnh cửa, sổ du lịch mở trên bàn hành lang.
   Vào "cat" (khung đầu đã đủ cảnh), ra "giay". Trang phục: hai áo mưa ướt (áo chính trùm mũ + áo nhỏ trên vai), ba lô ô liu, giày đỏ;
   nhịp cuối treo cả hai áo lên móc. Chữ: long walks (đã có trong sổ, bị gạch), never go outside (viết mới). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var C = data.chu_tren_do_vat;
  var GROUND = 920, SZ = 0.9;
  var but = '<g id="W-but" transform="rotate(200)">' + D.pencil(120, {}) + "</g>";
  var W = WH.wob(api, "W", { ao: "trum", ao2: true, len: true, holdL: but });

  // ---- tường hành lang (lớp xa ít trôi) ----
  var xa = '<rect x="-600" y="-200" width="3400" height="1400" fill="#DCD5BF"/>';
  xa += '<rect x="-600" y="600" width="3400" height="400" fill="#A9B9AC"/>' + D.line("M -600 600 L 2800 600", 6, "#7E8F84");
  for (var k = 0; k < 6; k++) xa += at(-300 + k * 620, 40, '<rect x="-80" y="0" width="160" height="22" rx="8" fill="#F7EBC8" stroke="' + D.INK + '" stroke-width="3"/><ellipse cx="0" cy="60" rx="160" ry="60" fill="#FFF4D6" opacity="0.35"/>');
  [[-200, 0], [2300, 0]].forEach(function (dv, i) { xa += at(dv[0], GROUND, D.paper(D.rRect(-90, -400, 180, 400, 1.5, 2201 + i), "#8A9A92", { stroke: true, sw: 4 }) + '<circle cx="60" cy="-200" r="8" fill="#C9B26A" stroke="' + D.INK + '" stroke-width="2"/>'); });
  // ---- lớp giữa: sàn, cửa ra ngoài, giá móc, bàn + sổ, vũng nước, Wob ----
  var mid = WH.dat(-800, 3000, GROUND - 40, "#8C7F6E", 2203, { cao: 900 });
  mid += at(1900, GROUND - 40, D.paper(D.rRect(-130, -460, 260, 460, 1.5, 2204), "#6E8C94", { stroke: true, sw: 5 }) + '<rect x="-100" y="-430" width="200" height="200" fill="#9DB5BC" stroke="' + D.INK + '" stroke-width="3"/>' +
    D.line("M -90 -420 L -40 -260", 5, "#ffffff", ' opacity="0.4"'));
  mid += at(1530, 560, WH.giaMoc("moc", 3));
  mid += at(1504, 610, WH.aoTreo("treo2", { k: 0.55, mau: "#EBC24E" }));
  mid += at(1624, 610, WH.aoTreo("treo1", { k: 0.7 }));
  // bàn hành lang + sổ dựng
  mid += at(760, GROUND - 40, D.paper(D.rRect(-380, -230, 760, 30, 1.5, 2205), "#8A6440", { stroke: true, sw: 4 }) + D.line("M -330 -200 L -330 0 M 330 -200 L 330 0", 14, "#6B4E33"));
  mid += at(760, GROUND - 270, g("so", '<g transform="rotate(-2)">' + WH.so(640, 300, 2206) +
    D.txt(-300, -205, C[0], 50, { anchor: "start", fill: "#2B3A44", w: 700 }) +
    WH.gach("g1", -306, -222, 278) +
    WH.viet("v1", 30, -205, "never go", 50, { anchor: "start" }) + WH.viet("v2", 30, -140, "outside", 50, { anchor: "start" }) + "</g>"));
  mid += at(1300, GROUND - 34, g("vungc", WH.vung("vg", 360)));
  for (var i = 0; i < 6; i++) mid += at(0, 0, WH.giot("gt" + i, 9));
  mid += W.svg;
  var gan = at(-60, 1100, D.paper(D.rRect(-60, -420, 120, 460, 1.4, 2207), "#8A9A92", { stroke: true, sw: 4 }));

  api.dat('<rect width="1920" height="1080" fill="#DCD5BF"/>' + WH.defs() +
    api.lop("xa", xa, 0.6, { mat: GROUND }) + api.lop("giua", mid, 1, { mat: GROUND }) + api.lop("gan", gan, 1.4, { mat: 1100 }));
  api.noi({});

  // ---- mốc ----
  var tDrip = T("dripping", 0, 1.26), tChanged = T("changed", 0, 2.86), tHad = T("had", 0, 4.25), tLong = T("long", 0, 5.67), tNew = T("new", 0, 6.85);
  var tNever = T("never", 0, 8.58), tOut = T("outside.", 0, 8.96), tSud = T("suddenly,", 0, 9.93), tBuild = T("building", 0, 11.53), tOdd = T("odd.", 0, 12.53);
  var tSens = T("sensible", 0, 13.8), tAns = T("answer.", 0, 14.3);

  api.camera([
    [0, 1350, 560, 0.98], [tChanged - 0.2, 1250, 560, 1.0, "sine.inOut"],
    [tHad - 0.1, 930, 640, 1.24, "power3.inOut"], [tNew, 910, 640, 1.28, "sine.inOut"], [tOut + 0.6, 920, 640, 1.32, "sine.inOut"],
    [tSud + 0.3, 1200, 570, 1.02, "power2.inOut"], [tOdd + 0.2, 1400, 650, 1.08, "power2.inOut"],
    [DUR, 1290, 660, 1.1, "sine.inOut"]
  ]);

  // ---- Wob vào từ cửa, nhỏ nước ----
  W.set(0, { x: 1820, y: GROUND, size: SZ, lashes: 0, ice: 0, aRu: -18, aRf: 10, aLu: 18, aLf: -10 });
  W.mouth(0, "flat");
  W.walk(0.05, 1.2, 1820, 1300, { step: 0.32, tieng: "drop" });
  W.pose(1.25, 0.3, { sy: 0.94, sx: 1.04, lid: 24 }, "power2.out");              // xệ xuống vì nặng nước
  W.shiver(tDrip, tDrip + 0.5, 1.6, 12);
  W.idle(1.6, tChanged, { seed: 221, bien: 1.2 });
  // vũng nước lớn dần dưới chân
  api.origin("#vungc", "0 0");
  api.key("#vungc", "scale", 0, 0.2, "step"); api.key("#vungc", "scale", 1.2, 0.3, "none"); api.key("#vungc", "scale", 9, 1.0, "sine.out"); api.key("#vungc", "scale", 15, 1.25, "sine.out");
  api.key("#vungc", "x", 0, 0, "step"); api.key("#vungc", "x", 1.2, 0, "none"); api.key("#vungc", "x", 2.4, -110, "sine.inOut");
  // giọt nước rơi đều từ vạt áo (theo Wob)
  function xWob(t) { return t < 1.2 ? 1820 - (t - 0.05) / 1.15 * 520 : (t < tChanged + 0.2 ? 1300 : (t < tSud + 1.4 ? 1150 : 1560)); }
  for (var j = 0; j < 6; j++) {
    var sel = "#gt" + j, t = 0.3 + j * 0.37;
    api.show(sel, 0, 0);
    while (t < DUR - 0.5) {
      var x = xWob(t) + (j % 3 - 1) * 60;
      api.key(sel, "x", t, x, "step"); api.key(sel, "y", t, GROUND - 200, "step"); api.key(sel, "opacity", t, 1, "step");
      api.key(sel, "y", t + 0.42, GROUND - 40, "power2.in"); api.key(sel, "opacity", t + 0.45, 0, "step");
      t += 1.15 + (j % 2) * 0.3;
    }
  }
  // ---- mở sổ: tới bàn, cầm bút ----
  W.walk(tChanged, tChanged + 0.9, 1300, 1150, { step: 0.3 });
  W.pose(tChanged + 0.95, 0.3, { pupX: -12, pupY: 6, lean: -5 }, "power2.out");
  W.pose(tHad, 0.35, { aLu: 110, aLf: 30 }, "power2.inOut");
  W.mouth(tHad, "smirk");
  W.pose(tLong - 0.1, 0.2, { pupX: -14, pupY: 2 }, "power2.out");
  // gạch long walks
  api.origin("#g1", "-306 -222");
  api.key("#g1", "scaleX", 0, 0.001, "step"); api.key("#g1", "scaleX", tNew - 0.05, 0.001, "none"); api.key("#g1", "scaleX", tNew + 0.55, 1, "power1.inOut");
  for (var s = 0; s < 4; s++) W.pose(tNew + s * 0.14, 0.14, { aLu: s % 2 ? 104 : 118, aLf: s % 2 ? 26 : 36 }, "sine.inOut");
  W.mouth(tNew, "flat");
  // viết never go outside
  WH.vietKey(api, "v1", 24, tNever - 0.55, 0.6); WH.vietKey(api, "v2", 24, tOut - 0.15, 0.55);
  for (var s2 = 0; s2 < 8; s2++) W.pose(tNever - 0.55 + s2 * 0.15, 0.15, { aLu: s2 % 2 ? 100 : 114, aLf: s2 % 2 ? 22 : 40, upRot: s2 % 2 ? -2 : 2 }, "sine.inOut");
  W.pose(tOut + 0.5, 0.3, { aLu: 30, aLf: -20, upRot: 0, lean: 0 }, "power2.out");
  W.mouth(tOut + 0.4, "grin");
  W.nhonChan(tOut + 0.55, 0.5, {});
  // ---- ý nghĩ: toà nhà một mái là câu trả lời; treo hai áo ----
  W.pose(tSud, 0.25, { pupX: 4, pupY: -14, eye: 1.15 }, "back.out(2)");
  W.mouth(tSud + 0.1, "o");
  W.walk(tSud + 0.5, tSud + 1.4, 1150, 1560, { step: 0.3, tieng: "drop" });
  var tTreo2 = tBuild + 0.1, tTreo1 = tOdd + 0.25;
  api.show("#treo2", 0, 0); api.show("#treo1", 0, 0);
  W.pose(tTreo2 - 0.3, 0.3, { aLu: 160, aLf: 10, pupY: -12, pupX: -6 }, "power2.out");
  W.doiAo(tTreo1, null);
  api.show("#W-ao2", tTreo2, 0); api.show("#treo2", tTreo2, 1);
  api.origin("#treo2", "0 0"); api.origin("#treo1", "0 0");
  api.key("#treo2", "rotation", 0, 0, "step"); api.key("#treo2", "rotation", tTreo2, 12, "none"); api.key("#treo2", "rotation", tTreo2 + 0.5, -6, "sine.inOut"); api.key("#treo2", "rotation", tTreo2 + 1, 2, "sine.inOut"); api.key("#treo2", "rotation", tTreo2 + 1.5, 0, "sine.inOut");
  W.pose(tTreo2 + 0.35, 0.25, { aLu: 18, aLf: -10 }, "power2.inOut");
  W.pose(tTreo1 - 0.35, 0.3, { aLu: 165, aLf: 10, aRu: -165, aRf: -10, sy: 1.06 }, "power2.out");
  api.show("#treo1", tTreo1, 1);
  api.key("#treo1", "rotation", 0, 0, "step"); api.key("#treo1", "rotation", tTreo1, -12, "none"); api.key("#treo1", "rotation", tTreo1 + 0.5, 6, "sine.inOut"); api.key("#treo1", "rotation", tTreo1 + 1, -2, "sine.inOut"); api.key("#treo1", "rotation", tTreo1 + 1.5, 0, "sine.inOut");
  W.pose(tTreo1 + 0.1, 0.35, { aLu: 18, aLf: -10, aRu: -18, aRf: 10, sy: 1, sx: 1, lid: 0 }, "back.out(1.6)");
  api.show("#W-but", tTreo2, 0);
  // gật gù, giữ; lùi lại ngắm hai áo nhỏ nước trong im lặng
  W.pose(tSens, 0.25, { pupX: 0, pupY: 0 }, "power2.out");
  W.mouth(tSens, "smirk");
  [0, 0.4, 0.8].forEach(function (d) { W.pose(tAns - 0.1 + d, 0.2, { upY: 10, upRot: 3 }, "sine.inOut"); W.pose(tAns + 0.1 + d, 0.2, { upY: 0, upRot: 0 }, "sine.inOut"); });
  W.walk(tAns + 1.2, tAns + 2.3, 1560, 1300, { step: 0.36 });
  W.pose(tAns + 2.35, 0.4, { pupX: 12, pupY: -8, lean: -3 }, "sine.inOut");
  W.idle(tAns + 2.4, DUR, { seed: 222, bien: 1.0 });
  W.autoBlink(0.6, DUR, 2208);
};
