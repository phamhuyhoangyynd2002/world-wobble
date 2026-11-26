/* Đoạn d22 · cắt giấy · hồi ức: buổi chiều đi tìm ổ cắm; trạm điện nhỏ của đảo.
   Vào "cat", ra "cat".
   Shot: Wob ôm ba lô, cầm điện thoại dây sạc lủng lẳng, đi dọc tường dò từng góc → máy diesel mới được đặt vào, CẬN tem 2021
         → toàn cảnh: mái nhà có tấm pin mặt trời cũ, máy phát, dãy ắc quy như lính, thợ lau chùi vặn ốc; Wob nhón chân sau lưng thợ,
         giơ điện thoại xin xếp hàng → Wob cắm sạc ở ổ cuối dãy → cả dãy ắc quy quay "mặt" nhìn Wob, vạch pin chiếc cuối tụt một nấc
         → Wob rút sạc nhẹ nhàng, lùi ra, cúi chào.
   Trang phục: mũ cói; ôm ba lô khổng lồ trước ngực (bình xịt túi hông); điện thoại hết pin (chỉ biểu tượng pin) + dây sạc.
   Chữ: chỉ "2021" trên tem máy (chu_tren_do_vat), ≥ 45 px ở cận. Đồng hồ máy, ắc quy, điện thoại: chỉ kim/vạch/biểu tượng. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, B = window.NhietDoiB, at = api.at, DUR = api.DUR, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  var G = 900, K = 1.6, SW = 0.55;

  // ---------- nền: trời chiều, nhà dọc tường (mái có tấm pin cũ), sân trạm điện ----------
  var troi = '<rect width="1920" height="1080" fill="url(#ndTroiSang)"/>';
  var xa = "";
  for (var m = 0; m < 5; m++) xa += at(-200 + m * 640, 160 + (m % 2) * 60, D.paper(D.rEll(0, 0, 140, 30, 3, 2210 + m), "#FFFFFF", { shadow: false, stroke: true, sw: 2.5 }));
  xa += '<rect x="-1400" y="600" width="6000" height="600" fill="#E6D8BC"/>';
  var NHA = [{ x: -260, mau: "#86CFB0", cua: 0.3 }, { x: 204, mau: "#F2CB57", cua: -0.4 }, { x: 668, mau: "#EE9AAE", cua: 0.45 }];
  var nha = "";
  NHA.forEach(function (h, i) { nha += at(h.x, G, sc(K, ND.nha({ w: 290, h: 230, mau: h.mau, seed: 2200 + i, cua: h.cua, cuaMo: i === 1, so: 1, mai: "doc" }))); });
  // hai tấm pin mặt trời cũ trên mái nhà giữa
  var pin = at(140, G - 368 - 18, '<g transform="rotate(-4)">' + D.solarPanel(150, 60, { seed: 2231 }) + "</g>") + at(300, G - 368 - 24, '<g transform="rotate(-4)">' + D.solarPanel(150, 60, { seed: 2232 }) + "</g>");
  var san = D.paper(D.rRect(-1400, G - 12, 6400, 400, 2, 2240), "#DAD3C3", { shadow: false, half: 0.06 }) +
    D.paper(D.rRect(900, G - 8, 1100, 30, 1.5, 2241), "#BDB5A4", { stroke: true, sw: 3, shadow: false });
  // hàng rào lưới thấp quanh trạm
  var rao = "";
  for (var rx = 920; rx <= 1980; rx += 120) rao += D.line("M " + rx + " " + (G - 4) + " L " + rx + " " + (G - 250), 6, "#7D8689");
  rao += D.line("M 920 " + (G - 248) + " L 1980 " + (G - 248), 5, "#7D8689") + '<rect x="920" y="' + (G - 248) + '" width="1060" height="244" fill="url(#luoiP)" opacity="0.25"/>';

  // ---------- trạm điện: máy phát mới (tem 2021), dãy ắc quy, ổ cắm ----------
  var GX = 1010;
  var may = '<g id="mayG">' + D.generatorBox("mp", { w: 300, h: 180, chu: data.chu_tren_do_vat[0], co: 58 }) + "</g>";
  var BX = [1250, 1360, 1470, 1580, 1690];
  var acQuy = D.paper(D.rRect(1180, G - 20, 580, 20, 1, 2250), "#8A6440", { stroke: true, sw: 3.5 });
  BX.forEach(function (x, i) { acQuy += at(x, G - 18, '<g id="aq' + i + '">' + sc(0.9, D.batteryUnit("b" + i, { seed: i })) + "</g>"); api.origin("#aq" + i, "0 0"); });
  var OX = 1790, OY = G - 150;
  var oCam = D.line("M " + OX + " " + G + " L " + OX + " " + (OY - 40), 12, "#7A5236") + at(OX, OY, D.outlet());
  var khoi = api.phut("kmp", GX + 96, G - 270, { n: 4, song: 1.3, cao: 90, troi: 40, r: 14, tu: 9.4, den: DUR, seed: 22 });

  // ---------- người thợ (dạng chung) lau chùi, vặn ốc ----------
  var CLE = '<g transform="rotate(30)">' + D.line("M 0 0 L 0 46", 9, "#8C9599") + '<path d="M -12 44 L 12 44 L 8 60 L -8 60 Z" fill="#8C9599" stroke="' + INK + '" stroke-width="2.5"/></g>';
  var GIE = D.paper(D.rEll(0, 6, 16, 11, 2, 2260), "#E07A5F", { stroke: true, sw: 2.5, shadow: false });
  var tho = B.nguoiDat(api, "th", 1405, G + 4, 0.74, { ao: "#3F7FB8", quan: "#3E4A50", cam: CLE, camL: GIE, lat: -1, mu: "#E9C46A" });

  // ---------- Wob: ôm ba lô, điện thoại + dây sạc lủng lẳng ở tay trái ----------
  var DAY = '<g id="W-day">' + D.line("M 0 34 C 8 70 -14 96 4 128", 4, "#2A2522") + '<rect x="-4" y="126" width="10" height="16" rx="2" fill="#E9E4D6" stroke="' + INK + '" stroke-width="2"/></g>';
  var PH = '<g transform="translate(0,-26) scale(0.95)">' + D.phoneDead("ph") + "</g>";
  var W = ND.wob(api, "W", { lung: 0, truoc: 1, truocTf: "translate(400,396) scale(0.9)", holdL: DAY + PH });
  // dây cắm vào ổ (vẽ mỗi khung từ tay trái tới ổ)
  var dayCam = '<g id="dcG" opacity="0"><path id="dcP" d="M 0 0" fill="none" stroke="#2A2522" stroke-width="4" stroke-linecap="round"/></g>';

  var giua = san + nha + pin + rao + may + acQuy + oCam + khoi + W.svg + tho + dayCam;
  var gan = at(-140, 1110, D.paper(D.rRect(-80, -120, 160, 120, 2, 2270), "#B5523B", { stroke: true, sw: 4 }) + D.paper(D.rEll(0, -160, 120, 74, 4, 2271), "#5E8F4A", { stroke: true, sw: 4, half: 0.15 }));
  api.dat(D.defsNhietDoi() + ND.defs() + troi + api.lop("xa", xa, 0.35, { mat: 600 }) + api.lop("giua", giua, 1, { mat: G }) + api.lop("gan", gan, 1.4, { mat: 1110 }));
  api.noi({});

  // ---------- mốc lời ----------
  var tSocket = T("socket.", 0, 2.14), tIn = T("twenty", 0, 3.16), tMin = T("ministry", 0, 5.08), tSolar = T("solar", 0, 6.69), tSystem = T("system,", 0, 8.13);
  var tGen = T("generator", 0, 9.63), tTune = T("tune-up", 0, 10.54), tBatt = T("batteries.", 0, 11.26), tPlug = T("plugged", 0, 12.39), tPhone = T("phone.", 0, 12.95);
  var tBatt2 = T("batteries", 1, 13.91), tPers = T("personally.", 0, 14.65), tCharged = T("charged", 0, 16.18), tDecided = T("decided", 0, 17.29), tPlenty = T("plenty.", 0, 18.32);

  // ---------- camera ----------
  var TEMX = GX - 6, TEMY = G - 16 - 40;
  api.camera([
    [0, 360, 700, 1.5], [tSocket, 600, 700, 1.5, "sine.inOut"],
    [tIn - 0.35, TEMX, TEMY, 2.4, "power2.inOut"],                    // CẬN tem 2021
    [tMin + 0.2, TEMX + 4, TEMY, 2.55, "sine.inOut"],
    [tMin + 0.9, 1080, 620, 0.98, "power2.inOut"],                   // toàn: mái pin cũ, máy, dãy ắc quy
    [tSystem, 1100, 625, 1.02, "sine.inOut"],
    [tSystem + 0.6, 1480, 730, 1.55, "power2.inOut"],                 // thợ + Wob sau lưng
    [tBatt + 0.1, 1500, 735, 1.58, "sine.inOut"],
    [tPlug - 0.3, 1700, 740, 1.6, "power2.inOut"],                    // cắm sạc
    [tBatt2 - 0.2, 1600, 735, 1.48, "power2.inOut"],                  // cả dãy quay mặt
    [tPers + 0.6, 1610, 735, 1.52, "sine.inOut"],
    [tCharged - 0.3, 1820, 780, 2.0, "power2.inOut"],                 // điện thoại sạc chút ít
    [tDecided + 0.2, 1830, 760, 1.7, "power2.inOut"],
    [DUR, 1850, 750, 1.62, "sine.inOut"]
  ]);

  // ---------- máy phát được đặt vào (rơi xuống, nảy) ----------
  api.origin("#mayG", "0 0");
  api.set("#mayG", 0, { x: GX, y: G - 600 });
  api.key("#mayG", "y", tIn - 0.5, G - 600, "none"); api.key("#mayG", "y", tIn - 0.05, G - 6, "power3.in"); api.key("#mayG", "y", tIn + 0.25, G, "back.out(3)");
  api.key("#mayG", "scaleY", tIn - 0.05, 1, "none"); api.key("#mayG", "scaleY", tIn + 0.05, 0.92, "power2.out"); api.key("#mayG", "scaleY", tIn + 0.35, 1, "elastic.out(1,0.4)");
  api.sfx("bonk", tIn - 0.05, 0.45);
  api.origin("#mp-kim", "0 0");
  api.key("#mp-kim", "rotation", 0, 0, "step"); api.key("#mp-kim", "rotation", tGen - 0.1, 0, "none"); api.key("#mp-kim", "rotation", tGen + 0.4, 80, "back.out(2)");
  api.sfx("may-no", tGen - 0.15, 0.45);
  api.origin("#mayG", "0 0");
  for (var tv = tGen, v = 0; tv < DUR; tv += 0.09, v++) api.key("#mayG", "x", tv, GX + (v % 2 ? 1.5 : -1.5), "none");

  // ---------- thợ: lau ắc quy, vặn ốc ----------
  for (var tw = 0.3, w = 0; tw < tTune - 0.2; tw += 0.32, w++) api.key("#th-tayL", "rotation", tw, w % 2 ? 30 : -10, "sine.inOut");
  for (var tr = tTune - 0.2, r = 0; tr < tPlug; tr += 0.28, r++) api.key("#th-tayR", "rotation", tr, r % 2 ? -60 : -20, "sine.inOut");
  api.key("#th-tayR", "rotation", tPlug + 0.3, 0, "power2.out");
  for (var ta = tPlug + 0.5, a = 0; ta < DUR; ta += 0.36, a++) api.key("#th-tayL", "rotation", ta, a % 2 ? 30 : -10, "sine.inOut");
  api.set("#th-mat", 0, { x: -6 });

  // ---------- Wob ----------
  W.set(0, { x: 60, y: G + 6, size: SW, aLu: 34, aLf: 20, aRu: -50, aRf: 30, op: 1 });
  W.mouth(0, "flat");
  W.walk(0.15, tSocket - 0.2, 60, 470, { step: 0.3, arms: false });
  W.nhonChan(tSocket - 0.1, 0.7, { lean: 5, nhin: [12, -4] });
  W.pose(tSocket, 0.25, { aLu: 70, aLf: 30 }, "power2.out");
  W.idle(tSocket + 0.8, tSolar, { seed: 3, bien: 1.6, liec: true });
  W.walk(tSolar - 0.3, tSystem + 0.3, 470, 1530, { step: 0.3, arms: false });
  // nhón chân nhìn qua vai thợ, giơ điện thoại xin xếp hàng
  W.nhonChan(tSystem + 0.5, tGen + 0.4 - tSystem, { lean: -4, nhin: [-12, 4] });
  W.pose(tGen - 0.2, 0.35, { aLu: 150, aLf: 20, sy: 1.12, upY: -10 }, "back.out(1.6)");
  W.mouth(tGen, "smirk");
  for (var tp = tGen + 0.4, p = 0; tp < tBatt; tp += 0.3, p++) W.pose(tp, 0.28, { aLf: p % 2 ? 6 : 34 }, "sine.inOut");
  W.pose(tBatt, 0.3, { aLu: 34, aLf: 20, sy: 1, upY: 0, lean: 0 }, "power2.inOut");
  // tới ổ cắm cuối dãy, cắm sạc
  var XP = 1905;
  W.walk(tBatt + 0.15, tPlug - 0.05, 1530, XP, { step: 0.28, arms: false });
  W.pose(tPlug + 0.05, 0.3, { aLu: 92, aLf: 6, pupX: -12, pupY: 0 }, "power2.out");
  api.show("#W-day", 0, 1); api.show("#W-day", tPlug + 0.35, 0);
  api.show("#dcG", 0, 0); api.show("#dcG", tPlug + 0.35, 1);
  var tRut = tDecided - 0.15;
  api.show("#dcG", tRut, 0); api.show("#W-day", tRut, 1);
  var dcp = null;
  api.moiKhung(function (t) {
    if (!api.dom) return;
    if (!dcp) dcp = document.getElementById("dcP");
    if (!dcp || t < tPlug + 0.3 || t > tRut) return;
    var h = W.hand("L", t), x0 = h.x, y0 = h.y + 14, x1 = OX + 6, y1 = OY + 6;
    dcp.setAttribute("d", "M " + x0.toFixed(1) + " " + y0.toFixed(1) + " C " + (x0 - 10).toFixed(1) + " " + (y0 + 60).toFixed(1) + " " + (x1 + 30).toFixed(1) + " " + (y1 + 70).toFixed(1) + " " + x1 + " " + y1);
  });
  api.sfx("bonk", tPlug + 0.35, 0.3);
  W.pose(tPhone, 0.35, { aLu: 54, aLf: 40 }, "power2.inOut");
  W.mouth(tPhone, "grin");
  // cả dãy ắc quy quay "mặt" nhìn Wob; vạch pin chiếc cuối tụt một nấc
  BX.forEach(function (x, i) {
    var t0 = tBatt2 + i * 0.07;
    api.key("#b" + i + "-mat", "opacity", 0, 0, "step"); api.key("#b" + i + "-mat", "opacity", t0, 1, "step");
    api.key("#b" + i + "-con", "x", 0, -6, "step"); api.key("#b" + i + "-con", "x", t0 + 0.25, 6, "power2.out");
    api.key("#aq" + i, "scaleY", t0, 1, "none"); api.key("#aq" + i, "scaleY", t0 + 0.1, 1.08, "power2.out"); api.key("#aq" + i, "scaleY", t0 + 0.35, 1, "back.out(2)");
  });
  api.key("#b4-v3", "opacity", 0, 1, "step"); api.key("#b4-v3", "opacity", tPers - 0.05, 0, "step");
  api.sfx("nuot", tPers - 0.08, 0.6);
  W.soc(tBatt2 + 0.35, { mieng: "o" });
  W.pose(tBatt2 + 0.4, 0.2, { pupX: -13, pupY: 2 }, "power2.out");
  W.mouth(tPers + 0.2, "wobbly");
  // điện thoại sạc chút ít
  api.show("#ph-sac", 0, 0); api.show("#ph-sac", tCharged, 1);
  W.pose(tCharged - 0.4, 0.3, { aLu: 40, aLf: 96, pupX: 8, pupY: 10 }, "power2.inOut");
  W.mouth(tCharged + 0.2, "smirk");
  // rút sạc nhẹ nhàng, lùi ra, cúi chào dãy ắc quy
  W.pose(tRut - 0.3, 0.3, { aLu: 92, aLf: 6, pupX: -12, pupY: 0 }, "power2.inOut");
  W.pose(tRut + 0.1, 0.3, { aLu: 34, aLf: 20 }, "power2.inOut");
  W.walk(tRut + 0.3, tPlenty - 0.15, XP, XP + 110, { step: 0.3, arms: false });
  W.pose(tPlenty - 0.05, 0.3, { upY: 16, sy: 0.9, lid: 34, pupY: 10, pupX: -6 }, "power2.inOut");
  W.mouth(tPlenty, "flat");
  W.autoBlink(0.6, tBatt2, 22);
};
