/* Đoạn d14 · cắt giấy · sảnh tầng trệt, cửa kính; ngoài kính là toà Buckner (bê tông SÁU tầng dài, ô cửa trống, hàng rào lưới).
   Vào "giay", ra "chen". Wob đồ ngủ, dép lê, ba lô. Chữ: BUCKNER (biển trên toà), 6 và ~1,000 (ngón tay viết trên vòng hơi mờ). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, CH = data.chu_tren_do_vat, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var W = WT.wob(api, "W", { do: "ngu" });
  // ---- ngoài kính (lớp xa) ----
  var xa = '<rect x="-600" y="-300" width="3200" height="1500" fill="url(#wtSang)"/>' + WT.nuiXa(-600, 2600, 560, 13, "#9DAAB0", 300);
  xa += D.paper(D.rough([[-600, 700], [2600, 696], [2600, 1400], [-600, 1400]], 3, 1401, 30), D.C.snow, { shadow: false });
  xa += at(900, 700, '<g transform="scale(0.78)">' + WT.buckner("bk", { w: 1300 }) + "</g>");
  xa += at(900, 700 - 0.78 * 450 - 30, WT.tag("bkTen", CH[0], 300, 72, 52, { seed: 1402, ghim: false, mau: "#D9D2C2" }));
  xa += at(380, 760, WT.fenceChain(1050, 110, 1403));
  // ---- sảnh (lớp giữa): tường có ô cửa kính, kính, vòng hơi mờ ----
  var mid = "";
  var win = "M 200 140 L 1310 140 L 1310 880 L 200 880 Z";
  mid += '<path d="M -400 -300 L 2400 -300 L 2400 1500 L -400 1500 Z ' + win + '" fill="#D8CDB6" fill-rule="evenodd"/>';
  mid += '<path d="M -400 -300 L 2400 -300 L 2400 1500 L -400 1500 Z ' + win + '" fill="url(#half)" opacity="0.06" fill-rule="evenodd"/>';
  mid += '<path d="' + win + '" fill="#DCEBF0" opacity="0.16"/>';
  mid += D.line("M 290 220 L 420 160 M 300 300 L 520 190 M 1120 820 L 1260 740", 10, "#FFFFFF", ' opacity="0.35"');
  mid += '<path d="' + D.rRect(180, 120, 1150, 780, 1.5, 1404) + ' M 200 140 L 200 880 L 1310 880 L 1310 140 Z" fill="#7A6A58" stroke="' + INK + '" stroke-width="5" fill-rule="evenodd"/>';
  mid += D.line("M 755 140 L 755 880", 16, "#7A6A58") + D.line("M 755 140 L 755 880", 3, INK, ' opacity="0.6"');
  mid += D.paper(D.rRect(-400, 1000, 2800, 500, 1, 1405), "#B8A88C", { shadow: false }) + D.line("M -400 1000 L 2400 1000", 5, "#8E7E66");
  for (var x = -400; x < 2400; x += 160) mid += D.line("M " + x + " 1000 L " + (x - 80) + " 1500", 2, "#8E7E66", ' opacity="0.5"');
  // vòng hơi mờ + chữ ngón tay (lộ dần bằng clip)
  var FX = 1150, FY = 640;
  mid += '<clipPath id="cl6"><rect id="cl6r" x="' + (FX - 78) + '" y="' + (FY - 120) + '" width="0" height="130"/></clipPath>';
  mid += '<clipPath id="cl1k"><rect id="cl1kr" x="' + (FX - 125) + '" y="' + (FY + 20) + '" width="0" height="80"/></clipPath>';
  mid += '<clipPath id="clWin"><path d="' + win + '"/></clipPath>';
  mid += '<g clip-path="url(#clWin)">' + g("mo", '<circle cx="' + FX + '" cy="' + FY + '" r="165" fill="url(#wtMo)"/><circle cx="' + FX + '" cy="' + FY + '" r="150" fill="#EEF4F6" opacity="0.35"/>' +
    '<g clip-path="url(#cl6)">' + g("ch6", D.txt(FX - 40, FY - 6, CH[1], 96, { w: 700, fill: "#6E8794" })) + "</g>" +
    '<g clip-path="url(#cl1k)">' + g("ch1k", D.txt(FX, FY + 82, CH[2], 64, { w: 700, fill: "#6E8794" })) + "</g>") + "</g>";
  mid += W.svg;
  mid += at(1215, 700, g("tho", D.puff(40, 1406, "#FFFFFF")));
  api.dat(WT.defs() + api.lop("xa", xa, 0.35, { mat: 700 }) + api.lop("giua", mid, 1, { mat: 1000 }));
  api.noi({});

  var tLobby = T("lobby", 0, 0.37), tNobody = T("nobody", 0, 3.01), tBuck = T("buckner", 0, 4.45), tFin = T("finished", 0, 5.31), tAcc = T("according", 0, 7.56);
  var tSix = T("six", 0, 9.72), tThousand = T("thousand", 0, 10.81), tSold = T("soldiers", 0, 11.29);

  api.camera([[0, 960, 540, 1.0], [0.6, 960, 540, 1.0, "none"], [DUR, 880, 545, 1.14, "sine.inOut"]]);

  // ---- Wob tựa trán vào kính ----
  W.set(0, { x: 1400, y: 985, size: 1.0, lashes: 0, ice: 0, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: -10, pupY: 0 });
  W.mouth(0, "flat");
  W.pose(0.4, 0.5, { lean: -9, x: 1385 }, "power2.inOut");
  W.pose(0.9, 0.2, { pupX: -14, pupY: -2 }, "power2.out");
  W.idle(1.0, DUR, { seed: 141, bien: 1.0 });
  W.breathe(1.0, DUR, 2.4);
  W.mouth(tNobody, "wobbly"); W.mouth(tNobody + 1.0, "flat");
  W.blinkAt(2.4); W.blinkAt(tNobody + 0.8);
  // hơi thở: vòng mờ hiện
  api.origin("#mo", FX + " " + FY);
  api.origin("#tho", "0 0");
  var tho = function (t) {
    api.key("#tho", "opacity", t, 0, "none"); api.key("#tho", "opacity", t + 0.12, 0.8, "power2.out"); api.key("#tho", "opacity", t + 0.6, 0, "power2.in");
    api.key("#tho", "x", t, 0, "none"); api.key("#tho", "x", t + 0.6, -90, "power2.out");
    api.key("#tho", "scale", t, 0.4, "none"); api.key("#tho", "scale", t + 0.6, 1.3, "power2.out");
    W.mouth(t, "o"); W.mouth(t + 0.55, "flat");
    W.pose(t - 0.15, 0.15, { sy: 1.04 }, "power2.out"); W.pose(t, 0.2, { sy: 0.97 }, "power2.in"); W.pose(t + 0.25, 0.25, { sy: 1 }, "sine.out");
    api.sfx("hoi-nuoc", t, 0.35);
  };
  api.key("#tho", "opacity", 0, 0); api.key("#tho", "x", 0, 0); api.key("#tho", "scale", 0, 0.4);
  var h1 = 1.3, h2 = 7.0;
  tho(h1); tho(h2);
  api.key("#mo", "opacity", 0, 0); api.key("#mo", "opacity", h1 + 0.1, 0, "none"); api.key("#mo", "opacity", h1 + 0.6, 1, "power2.out");
  api.key("#mo", "scale", 0, 0.5); api.key("#mo", "scale", h1 + 0.1, 0.5, "none"); api.key("#mo", "scale", h1 + 0.6, 1, "power2.out");
  // viết "6" lần đầu → vòng mờ tan giữa chừng
  var w0 = 4.5, w1 = 5.6;
  api.key("#mo", "opacity", 5.3, 1, "none"); api.key("#mo", "opacity", 6.5, 0.06, "power1.in");
  api.key("#mo", "opacity", h2 + 0.1, 0.06, "none"); api.key("#mo", "opacity", h2 + 0.6, 1, "power2.out");
  // lần hai: "6" xong đúng "six", "~1,000" xong đúng "thousand"
  var a0 = 8.5, a1 = tSix + 0.15, b0 = tSix + 0.35, b1 = tThousand + 0.35;
  api.moiKhung(function (t) {
    if (typeof document === "undefined") return;
    var r6 = document.getElementById("cl6r"), rk = document.getElementById("cl1kr"); if (!r6 || !rk) return;
    var u6 = t < w0 ? 0 : t < h2 ? Math.min(0.6, (t - w0) / (w1 - w0) * 0.6) : t < a0 ? 0 : Math.min(1, (t - a0) / (a1 - a0));
    var uk = t < b0 ? 0 : Math.min(1, (t - b0) / (b1 - b0));
    r6.setAttribute("width", (u6 * 115).toFixed(1)); rk.setAttribute("width", (uk * 260).toFixed(1));
  }, { twos: true });
  // tay viết (ngón tay trên kính)
  var viet = function (t0, t1) {
    W.pose(t0 - 0.3, 0.3, { aLu: 122, aLf: 30 }, "power2.out");
    for (var t = t0, k = 0; t < t1; t += 0.2, k++) W.pose(t, 0.2, { aLu: 118 + (k % 2 ? 8 : -2), aLf: 26 + (k % 3) * 6 }, "sine.inOut");
  };
  viet(w0, w1);
  W.pose(6.4, 0.3, { aLu: 18, aLf: -10 }, "power2.inOut");
  W.mouth(6.3, "o"); W.blinkAt(6.6); W.mouth(6.8, "flat");
  W.pose(6.3, 0.2, { pupX: -8, pupY: 6 }, "power2.out");
  viet(a0, a1); viet(b0, b1);
  W.pose(b1 + 0.1, 0.3, { aLu: 30, aLf: -20, pupX: -12, pupY: 0 }, "power2.inOut");
  W.mouth(b1 + 0.1, "smirk");
  api.sfx("xuoc-dia", a0, 0.15); api.sfx("xuoc-dia", b0, 0.15);
};
