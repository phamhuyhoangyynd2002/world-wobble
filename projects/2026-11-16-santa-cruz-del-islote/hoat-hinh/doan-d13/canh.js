/* Đoạn d13 · cắt giấy · hồi ức: tối ở mép đảo, Wob ngồi chìa một tay ra trên mặt nước như mồi câu; buộc thêm sợi chỉ có lưỡi câu giấy.
   Vào "giay" (từ giấy phẳng bật dựng), ra "chen" (sang d14 vẽ tay). Cùng nơi với d15 (MEP: cùng cấu hình phông).
   Tiền cảnh: mép mái tôn tối phía trên. Đảo đước tối ở 1/3 phải khung. Trang phục: mũ cói; ba lô khổng lồ đặt cạnh, bình xịt cắm túi hông.
   Không chữ trên hình. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }

  /* ---- phông mép đảo ban đêm (chép giống hệt ở d15) ---- */
  function MEP(dem) {
    var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#ndTroiDem)"/><g id="troiSang" opacity="0"><rect x="0" y="0" width="1920" height="1080" fill="url(#ndTroiSang)"/></g>';
    var xa = '<g id="saoDem">' + ND.sao(80, [-300, 0, 2600, 560], 1033) + at(1280, 210, ND.trang(52)) + "</g>" +
      '<rect x="-800" y="600" width="4000" height="700" fill="#24384A"/>' + at(1560, 612, sc(1.0, ND.daoDuoc({ w: 900, seed: 881, mau: "#1F3B2E" })));
    var MAT = 780, giua = "";
    giua += ND.bien(api, "bd", { x0: -600, x1: 2800, y: 640, n: 3, day: 48, dem: true, bien: 22, chuKy: 3.6 });
    var r = D.rng(91);
    for (var k = 0; k < 9; k++) giua += '<path d="' + D.rEll(1300 + r() * 700, 720 + r() * 260, 50 + r() * 60, 4 + r() * 3, 1.5, 900 + k) + '" fill="#FFD68A" opacity="' + (0.35 + r() * 0.3).toFixed(2) + '"/>';
    [[60, 380, 330, 2], [460, 400, 350, 0], [860, 380, 320, 3]].forEach(function (h, i) {
      giua += at(h[0], MAT - 70, sc(0.78, ND.nha({ w: h[1], h: h[2], mau: ["#7A5E6C", "#3F5E7A", "#4E6E64"][i % 3], seed: 1500 + i, cua: i % 2 ? 0.3 : -0.3, cuaMo: i === 1, so: 1, maiMau: "#6E777C" })));
      giua += at(h[0] + (i % 2 ? -70 : 60), MAT - 70 - h[2] * 0.78 * 0.6, '<circle r="70" fill="url(#ndDen)"/><rect x="-24" y="-26" width="48" height="52" fill="#FFD68A" opacity="0.9"/>');
    });
    giua += D.paper(D.rRect(-400, MAT - 70, 1560, 74, 2, 1510), "#8E8A80", { shadow: false, half: 0.08 });
    giua += D.paper(D.rough([[-400, MAT], [1180, MAT], [1188, MAT + 150], [-400, MAT + 156]], 2.5, 1511, 18), "#6E6A62", { stroke: true, sw: 4, shadow: false });
    giua += D.line("M -400 " + (MAT + 120) + " L 1186 " + (MAT + 118), 6, "#3E5A52", ' opacity="0.7"') + D.line("M -300 " + (MAT + 50) + " L -260 " + (MAT + 110) + " M 300 " + (MAT + 30) + " L 330 " + (MAT + 100) + " M 800 " + (MAT + 40) + " L 780 " + (MAT + 110), 2.5, "#4E4A44");
    giua += D.line("M -400 " + MAT + " L 1180 " + MAT, 4, D.INK, ' opacity="0.6"');
    var gan = '<g id="maiTien">' + D.paper("M -300 -60 L 1700 -60 L 1640 150 C 1100 170 400 200 -300 240 Z", "#2A3138", { stroke: true, sw: 5, shadow: false });
    for (var x = -280; x < 1640; x += 26) gan += D.line("M " + x + " -40 L " + (x - 8) + " " + (236 - (x + 300) * 0.045), 3, "#46505A");
    gan += "</g>";
    return { troi: troi, xa: xa, giua: giua, gan: gan, mat: MAT };
  }
  var P = MEP(true);

  var LUOI = '<g id="W-chi" opacity="0"><path id="W-chiP" d="M 0 0 L 0 0" fill="none" stroke="#F3EBD8" stroke-width="3"/><g id="W-moc">' +
    D.line("M 0 0 C 10 10 10 26 0 30 C -8 32 -12 26 -10 20", 4, "#B9BDBE") + D.paper(D.rRect(-9, -14, 18, 14, 1, 71), "#E9806E", { stroke: true, sw: 2, shadow: false }) + "</g></g>";
  var W = ND.wob(api, "W", { lung: 0, holdR: LUOI });
  var giua = P.giua + at(860, P.mat + 4, sc(0.56, ND.baLo("pk", {}))) + W.svg;

  api.dat(P.troi + api.lop("xa", P.xa, 0.35, { mat: 610 }) + api.lop("giua", giua, 1, { mat: P.mat }) + api.lop("gan", P.gan, 1.4, { mat: 0 }) + ND.defs());
  api.noi({ kieu: { gan: "truot-tren" } });
  api.show("#W-chi", 0, 0);

  api.camera([[0, 960, 560, 1.0], [DUR, 1010, 600, 1.12, "sine.inOut"]]);

  // Wob ngồi mép đảo, chân thòng xuống nước, một tay chìa ra như cần câu
  var S = 0.6, WX = 1110, WY = P.mat + 92 * S;
  W.set(0, { x: WX, y: WY, size: S, sy: 0.96, legL: -8, legR: 8, pupX: 8, pupY: 6 });
  var tArm = T("held", 0, 5.01) - 0.3, tBait = T("bait", 0, 6.97);
  W.idle(0.4, tArm, { seed: 3, bien: 1 });
  // chân đung đưa
  for (var t = 0.6, k = 0; t < DUR; t += 0.7, k++) { W.pose(t, 0.6, { legL: k % 2 ? -14 : -4, legR: k % 2 ? 4 : 14 }, "sine.inOut"); }
  W.pose(T("evening", 0, 3.1), 0.3, { pupX: 10, pupY: 2 }, "power2.out");
  W.pose(tArm, 0.35, { aRu: -96, aRf: -4, lean: 3 }, "back.out(1.4)");
  W.mouth(tArm + 0.2, "smirk");
  // tay kia buộc sợi chỉ có lưỡi câu vào ngón tay chìa ra
  var tTie = tArm + 0.5;
  W.pose(tTie, 0.3, { aLu: -120, aLf: -40, pupX: 12, pupY: 0 }, "power2.out");
  [0, 0.18, 0.36].forEach(function (d) { W.pose(tTie + 0.35 + d, 0.09, { aLf: -55 }, "sine.inOut"); W.pose(tTie + 0.44 + d, 0.09, { aLf: -35 }, "sine.inOut"); });
  W.pose(tBait - 0.3, 0.3, { aLu: 18, aLf: -10, pupX: 6, pupY: 12 }, "power2.inOut");
  api.show("#W-chi", tTie + 0.5, 1);
  // sợi chỉ thõng thẳng xuống nước (tính góc tay trong toạ độ bàn tay)
  var chi = null, moc = null;
  api.moiKhung(function (tt) {
    if (!api.dom) return;
    if (!chi) { chi = document.getElementById("W-chiP"); moc = document.getElementById("W-moc"); }
    var a = (W.val("aRu", tt) + W.val("aRf", tt) + W.val("lean", tt)) * Math.PI / 180;
    var grow = Math.max(0, Math.min(1, (tt - (tTie + 0.5)) / 0.6)), L = (40 + 240 * grow) / S, sw = Math.sin(tt * 2.4) * 0.05;
    var x = -Math.sin(-a + sw) * L, y = Math.cos(-a + sw) * L;
    // vector "xuống" của màn hình trong toạ độ bàn tay: xoay ngược góc tay
    var vx = Math.sin(a) * 1, vy = Math.cos(a) * 1;
    x = (vx * Math.cos(sw) - vy * Math.sin(sw)) * L; y = (vx * Math.sin(sw) + vy * Math.cos(sw)) * L;
    chi.setAttribute("d", "M 0 0 L " + x.toFixed(1) + " " + y.toFixed(1));
    moc.setAttribute("transform", "translate(" + x.toFixed(1) + "," + y.toFixed(1) + ") rotate(" + (-a * 180 / Math.PI).toFixed(1) + ")");
  }, { twos: true });
  api.sfx("song", 0.6, 0.45);
  W.autoBlink(0, DUR, 15);
};
