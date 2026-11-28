/* Đoạn d25 · cắt giấy · hồi ức tháng 8: con đường rộng, hai hàng người que (không mặt) ngồi ghế xếp, bình giữ nhiệt, cờ giấy TRƠN;
   máy quay truyền hình giấy trên chân máy; TV giấy nhỏ trong ô cửa sổ chiếu nhà thờ đang nhích và cả Wob tí hon; vương miện giấy nhấp nhô
   (KHÔNG người); Wob ngồi vỉa hè với bánh quế cuộn to, con chó lông xù ngồi cạnh, Wob bẻ đôi bánh chia cho nó.
   Vào "cat", ra "cat". Không chữ (chu_tren_do_vat rỗng). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, K = api.K, at = KR.at, M = KR.M, INK = D.INK, paper = D.paper, rRect = D.rRect, rEll = D.rEll, line = D.line;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tSwe = T("swedish", 0, 3.14), tLive = T("live,", 0, 5.21), tThou = T("thousands", 0, 6.94), tKing = T("king", 0, 9.24),
    tSo = T("so", 0, 10.4), tBun = T("bun.", 0, 12.76), tDog = T("dog", 0, 13.57), tSat = T("sat", 0, 13.81), tVery = T("very", 0, 16.05), tSer = T("seriously,", 0, 16.31), tTime = T("time.", 0, 17.55);

  // ---------- đồ riêng ----------
  function banhQue(id, can) {   // bánh quế cuộn Thụy Điển, gốc tâm, r ≈ 70; can: vết cắn
    var s = '<g id="' + id + '">';
    var d = can ? "M -70 0 C -70 -40 -40 -70 0 -70 C 22 -70 40 -60 52 -46 C 40 -40 36 -24 46 -14 C 56 -6 66 -10 70 -4 C 70 40 40 70 0 70 C -40 70 -70 40 -70 0 Z" : rEll(0, 0, 70, 68, 3, 9901);
    s += paper(d, "#C98A4A", { stroke: true, sw: 4.5, sx: 4, sy: 5 });
    s += line("M 0 0 C 14 -2 18 18 0 22 C -26 26 -30 -10 -8 -26 C 22 -44 50 -10 40 22 C 30 50 -20 58 -42 30", 5, "#8A5226");
    [[-30, -40], [10, -50], [-48, 6], [22, 34], [-14, 44], [44, -4], [-2, 8]].forEach(function (p, i) { if (!(can && p[0] > 20 && p[1] < 0)) s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="#FFFDF6" stroke="' + INK + '" stroke-width="1.5"/>'; });
    return s + "</g>";
  }
  function nuaBanh(id, ben) {   // nửa bánh (ben −1 trái, 1 phải), gốc tâm bánh
    var d = ben < 0 ? "M 4 -70 C -40 -70 -70 -40 -70 0 C -70 40 -40 70 4 70 L -6 40 L 8 14 L -4 -14 L 10 -40 Z" : "M 4 -70 C 40 -70 70 -40 70 0 C 70 40 40 70 4 70 L -6 40 L 8 14 L -4 -14 L 10 -40 Z";
    return '<g id="' + id + '">' + paper(d, "#C98A4A", { stroke: true, sw: 4.5, sx: 3, sy: 4 }) + line(ben < 0 ? "M -10 0 C -30 -10 -40 20 -20 34" : "M 20 -20 C 44 -6 40 26 20 34", 5, "#8A5226") +
      '<circle cx="' + (ben * 36) + '" cy="-30" r="5" fill="#FFFDF6" stroke="' + INK + '" stroke-width="1.5"/><circle cx="' + (ben * 30) + '" cy="30" r="5" fill="#FFFDF6" stroke="' + INK + '" stroke-width="1.5"/></g>';
  }
  function cho(id) {   // chó lông xù ngồi, nhìn sang phải; gốc giữa chân; id-dau quay (origin "40 -150"), id-duoi, id-nua (nửa bánh trong miệng, ẩn)
    var m = "#D8C3A0", dk = "#A88A62", s = '<g id="' + id + '">';
    s += '<g id="' + id + '-duoi">' + paper("M -60 -30 C -100 -40 -110 -90 -86 -110 C -84 -80 -70 -60 -50 -50 Z", m, { stroke: true, sw: 4, shadow: false }) + "</g>";
    s += paper(D.rough([[-70, 0], [-80, -60], [-50, -120], [10, -140], [50, -110], [56, -40], [40, 0]], 9, 9911, 14), m, { stroke: true, sw: 4.5, sx: 5, sy: 6, half: 0.12 });
    s += paper(rEll(30, -6, 26, 12, 2, 9912), dk, { stroke: true, sw: 3.5, shadow: false }) + paper(rEll(-30, -6, 26, 12, 2, 9913), dk, { stroke: true, sw: 3.5, shadow: false });
    s += '<g id="' + id + '-dau"><g transform="translate(40,-150)">';
    s += paper(D.rough([[-44, 10], [-50, -34], [-20, -60], [26, -58], [52, -30], [80, -24], [84, 2], [50, 16], [6, 30]], 7, 9914, 12), m, { stroke: true, sw: 4.5, sx: 4, sy: 5 });
    s += paper("M -30 -50 C -54 -46 -60 -10 -46 10 C -36 -6 -30 -24 -22 -40 Z", dk, { stroke: true, sw: 4, shadow: false });
    s += '<ellipse cx="82" cy="-14" rx="10" ry="8" fill="' + INK + '"/><circle cx="34" cy="-28" r="6" fill="' + INK + '"/><circle cx="36" cy="-30" r="2" fill="#FFFFFF"/>';
    s += line("M 60 6 C 66 10 74 10 80 4", 3);
    s += '<g id="' + id + '-nua" opacity="0"><g transform="translate(74,16) scale(0.5)">' + nuaBanh(id + "-nb", 1) + "</g></g>";
    s += "</g></g>";
    return s + "</g>";
  }
  function mayQuay(id) {   // máy quay truyền hình trên chân máy, ống kính chĩa sang phải; gốc giữa chân
    var s = '<g id="' + id + '">';
    s += line("M 0 -150 L -50 0 M 0 -150 L 50 0 M 0 -150 L 4 0", 7, "#3A3F44");
    s += paper(rRect(-70, -230, 130, 80, 2, 9921), "#4E555A", { stroke: true, sw: 4.5, sx: 4, sy: 5 });
    s += paper(rRect(60, -214, 52, 48, 2, 9922), "#2B2F33", { stroke: true, sw: 4, shadow: false }) + '<ellipse cx="114" cy="-190" rx="10" ry="24" fill="#5E8597" stroke="' + INK + '" stroke-width="3"/>';
    s += paper(rRect(-60, -258, 70, 26, 2, 9923), "#6F7578", { stroke: true, sw: 3.5, shadow: false }) + '<circle cx="-50" cy="-196" r="7" fill="#C9463A" stroke="' + INK + '" stroke-width="2"/>';
    return s + "</g>";
  }
  function vuongMien(id) {
    return '<g id="' + id + '">' + paper("M -40 0 L -46 -46 L -24 -22 L 0 -56 L 24 -22 L 46 -46 L 40 0 Z", "#E2B33C", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
      '<circle cx="0" cy="-58" r="6" fill="#C9463A" stroke="' + INK + '" stroke-width="2"/><circle cx="-46" cy="-48" r="5" fill="#3F6E9A" stroke="' + INK + '" stroke-width="2"/><circle cx="46" cy="-48" r="5" fill="#3F6E9A" stroke="' + INK + '" stroke-width="2"/></g>';
  }

  // ---------- cảnh ----------
  var G = 960;   // vỉa hè gần (lớp giữa)
  var troi = '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#krHe)"/>' + at(520, 150, KR.may(240, 9931)) + at(1460, 110, KR.may(190, 9932));
  // phố: dãy nhà gỗ nhiều màu, hàng người xa vẫy cờ, vương miện
  var pho = KR.nuiXa(-800, 3200, 640, 110, "#B7C9B0", 9933);
  pho += '<rect x="-900" y="636" width="4200" height="200" fill="' + M.coSang + '"/>';
  var NH = [[-300, 0], [-60, 1], [190, 2], [440, 3], [690, 4], [960, 1], [1230, 5], [1500, 0], [1770, 2], [2040, 3], [2310, 4], [2580, 1]];
  NH.forEach(function (n, i) { if (i !== 6) pho += at(n[0], 700, KR.nhaGo({ w: 210, h: 150, mau: M.nha[n[1]], mai: M.mai[i % 3], sd: 9940 + i * 7 })); });
  // nhà có TV trong cửa sổ (i = 6)
  var tvMan = '<g id="tvMan"><rect x="-50" y="-34" width="100" height="62" fill="#9EC3D4"/>' + '<rect x="-50" y="10" width="100" height="18" fill="#9DBA6E"/>' +
    at(10, 12, '<g transform="scale(0.075)">' + KR.romooc(null, 820).replace('<g id="null">', "<g>") + at(0, -64, KR.nhaTho("ntTv")) + "</g>") + '<g id="tvWob"></g></g>';
  var tvSet = paper(rRect(-62, -44, 124, 84, 3, 9951), "#5E4A3A", { stroke: true, sw: 4, sx: 3, sy: 4 }) + '<clipPath id="tvCl"><rect x="-50" y="-34" width="100" height="62" rx="6"/></clipPath><g clip-path="url(#tvCl)">' + tvMan + "</g>" +
    '<rect x="-50" y="-34" width="100" height="62" rx="6" fill="none" stroke="' + INK + '" stroke-width="3"/>' + line("M -20 -44 L -34 -66 M 20 -44 L 34 -66", 3);
  var nhaTv = '<g transform="translate(1230,700)">' + paper(rRect(-125, -190, 250, 190, 1.5, 9952), M.nha[5], { stroke: true, sw: 4.5, sx: 6, sy: 8 }) +
    paper("M -141 -186 L 0 -290 L 141 -186 Z", M.mai[0], { stroke: true, sw: 4.5, shadow: false }) +
    paper(rRect(-90, -160, 180, 120, 1.2, 9953), "#F3E6C8", { stroke: true, sw: 4, shadow: false }) + at(0, -98, tvSet, 0.95) + line("M -90 -40 L 90 -40", 6, "#7A5236") + "</g>";
  pho += nhaTv;
  var xaNg = [];
  for (var i = 0; i < 22; i++) {
    var id = "pa" + i;
    pho += at(-200 + i * 128 + (i % 2) * 18, 812, KR.nguoi(id, { ao: M.ao1[(i * 3) % 8], mu: i % 4 === 1 ? "#4F7A5A" : (i % 4 === 3 ? "#C9463A" : null), da: [M.da1, M.da2, M.da3][i % 3], co: i % 2 === 0, coMau: ["#F3E6C8", "#E9C98B", "#D9E6EA"][i % 3], ngoi: i % 2 === 1, binh: i % 2 === 1, ghe: ["#3F6E9A", "#4F7A5A", "#B04A3A"][i % 3] }), 0.5);
    xaNg.push(id);
  }
  pho += '<g id="vm">' + vuongMien("vmi") + "</g>";
  // đường: mặt đường, nhà thờ trên rơ-moóc nhích sang phải
  var duong = '<rect x="-900" y="818" width="4400" height="140" fill="#9A9890"/>' + line("M -900 888 L 3500 888", 6, "#F3E6C8", ' stroke-dasharray="60 50" opacity="0.8"');
  duong += '<g id="ntDi"><g transform="scale(0.55)">' + KR.romooc("rm", 820) + at(0, -64, KR.nhaTho("nt")) + "</g></g>";
  // vỉa hè gần: hàng người ngồi ghế xếp, rót trà; máy quay; Wob; con chó
  var gi = '<rect x="-900" y="' + (G - 14) + '" width="4400" height="400" fill="#C9C3B5"/>' + paper(rRect(-900, G - 20, 4400, 22, 2, 9960), "#B0A99A", { shadow: false });
  var gNg = [];
  for (var j = 0; j < 9; j++) {
    var idg = "pg" + j;
    gi += at(-120 + j * 150, G + 30, KR.nguoi(idg, { ao: M.ao1[(j * 5 + 2) % 8], mu: j % 3 === 0 ? "#3F6E9A" : null, da: [M.da2, M.da1, M.da3][j % 3], ngoi: true, binh: j % 3 !== 2 ? true : "#4F7A5A", co: j % 3 === 2, ghe: ["#B04A3A", "#3F6E9A", "#4F7A5A"][j % 3] }), 0.78);
    gNg.push(idg);
  }
  gi += at(1640, G + 20, mayQuay("mq"), 0.95);
  var W = KR.wob(api, "W", { mua: "he", chum: "kr" });
  var Wt = KR.wob(api, "Wt", { mua: "he" });
  gi += W.svg;
  gi += '<g id="banh">' + banhQue("bq0", false) + "</g>" + '<g id="banhC">' + banhQue("bq1", true) + "</g>" +
    '<g id="nuaL">' + nuaBanh("nl", -1) + "</g>" + '<g id="nuaR">' + nuaBanh("nr", 1) + "</g>";
  gi += '<g id="choG">' + cho("ch") + "</g>";
  var gan = "";
  gan += '<rect x="-900" y="1060" width="4400" height="300" fill="#B0A99A"/>';

  var html = KR.defs() + troi + api.lop("pho", pho, 0.6, { mat: 820 }) + api.lop("duong", duong, 0.85, { mat: 900 }) + api.lop("giua", gi, 1, { mat: G }) + api.lop("gan", gan, 1.4, { mat: 1080 });
  html = html.replace('<g id="tvWob"></g>', '<g id="tvWob">' + Wt.svg + "</g>");
  api.dat(html);
  api.noi({});

  // ---------- camera ----------
  var tC = tThou - 0.05, tD = tSo + 0.1;
  api.camera([[0, 380, 790, 1.3], [0.25, 380, 790, 1.3, "none"], [2.7, 1180, 780, 1.3, "sine.inOut"], [tSwe - 0.15, 1200, 776, 1.32, "sine.inOut"],
    [tSwe + 0.65, 1410, 650, 2.1, "power2.inOut"], [tC - 0.05, 1420, 646, 2.16, "sine.inOut"], [tC + 0.9, 1280, 640, 0.86, "power2.inOut"], [tD - 0.1, 1300, 650, 0.88, "sine.inOut"],
    [tD + 1.0, 1210, 820, 1.62, "power2.inOut"], [tSat + 0.3, 1290, 820, 1.66, "sine.inOut"], [DUR, 1310, 816, 1.74, "sine.inOut"]]);

  // ---------- nhà thờ nhích sang phải suốt đoạn ----------
  api.key("#ntDi", "x", 0, 2040, "none"); api.key("#ntDi", "x", DUR, 2140, "none"); api.set("#ntDi", 0, { y: 888 });
  api.set("#tvMan", 0, {});
  api.key("#vm", "x", 0, 1500); api.key("#vm", "y", 0, 736, "step");
  api.show("#vm", 0, 0); api.show("#vm", tKing - 0.2, 1);
  for (var v = 0; v < 8; v++) { var tv = tKing - 0.2 + v * 0.28; api.key("#vm", "x", tv, 1500 + v * 22, "sine.inOut"); api.key("#vm", "y", tv, v % 2 ? 740 : 724, "sine.inOut"); }

  // ---------- người que: rót trà, vẫy cờ ----------
  gNg.forEach(function (id, j) {
    api.origin("#" + id + "-tayL", "-22 -150"); api.origin("#" + id + "-tayR", "22 -150");
    var ph = (j % 3) * 0.3;
    for (var q = 0; q < 4; q++) api.key("#" + id + "-tayL", "rotation", 0.2 + ph + q * 0.9, q % 2 ? -50 : -20, "sine.inOut");
    if (j % 3 === 2) for (var w = 0; w < 12; w++) api.key("#" + id + "-tayR", "rotation", tC + w * 0.25 + j * 0.03, w % 2 ? -128 : -104, "sine.inOut");
  });
  xaNg.forEach(function (id, i) {
    api.origin("#" + id + "-tayR", "22 -150");
    if (i % 2 === 0) { api.key("#" + id + "-tayR", "rotation", 0, -20); for (var w = 0; w < 14; w++) api.key("#" + id + "-tayR", "rotation", tC - 0.2 + w * 0.24 + (i % 5) * 0.05, w % 2 ? -130 : -100, "sine.inOut"); }
  });

  // ---------- Wob ----------
  var SZ = 0.6;
  W.set(0, { x: 1330, y: G + 26, size: SZ, pupX: -10, pupY: 2 });
  W.mouth(0, "wobbly");
  api.show(W.kr.mohoi, 0, 1); api.show(W.kr.mohoi, tSwe + 1.2, 0);
  W.pose(0.1, 0.3, { sy: 0.96, sx: 1.03 }, "sine.inOut");
  for (var b = 0; b < 4; b++) { W.pose(0.3 + b * 0.5, 0.25, { sy: 1.02, sx: 0.98 }, "sine.inOut"); W.pose(0.55 + b * 0.5, 0.25, { sy: 0.97, sx: 1.02 }, "sine.inOut"); }
  W.pose(1.6, 0.25, { pupX: -12, pupY: 4, upRot: -3 }, "power2.out");   // nhìn hàng người
  W.pose(2.45, 0.25, { pupX: 12, pupY: -2, upRot: 3 }, "power2.out");   // nhìn nhà thờ
  W.mouth(2.45, "flat");
  // đi tới gần nhà có TV, ngó lên
  W.walk(tSwe - 0.2, tSwe + 0.8, 1330, 1470, { step: 0.28 });
  W.pose(tSwe + 0.9, 0.25, { pupX: -8, pupY: -14, upRot: -3 }, "power2.out");
  // thấy mình trên TV: chỉnh kính râm
  var tK = tLive + 0.2;
  W.soc(tLive - 0.25);
  W.pose(tK, 0.25, { aRu: -130, aRf: -120 }, "power2.out"); W.pose(tK + 0.35, 0.12, { aRf: -110 }, "sine.inOut"); W.pose(tK + 0.5, 0.12, { aRf: -124 }, "sine.inOut");
  W.pose(tK + 0.75, 0.25, { aRu: -18, aRf: 10 }, "power2.inOut"); W.mouth(tK + 0.6, "smirk");
  // Wob tí hon trên TV làm theo
  Wt.set(0, { x: -14, y: 27, size: 0.1 });
  Wt.pose(tK, 0.25, { aRu: -130, aRf: -120 }, "power2.out"); Wt.pose(tK + 0.75, 0.25, { aRu: -18, aRf: 10 }, "power2.inOut");
  Wt.walk(tSwe - 0.2, tSwe + 0.8, -30, -14, { step: 0.28 });
  // toàn cảnh: Wob vẫy cùng mọi người một nhịp
  W.pose(tC + 0.4, 0.2, { pupX: 0, pupY: -4, upRot: 0 }, "power2.out");
  W.vay(tC + 1.2, 4, "R");
  W.pose(tKing - 0.1, 0.25, { pupX: 10, pupY: -10, eye: 1.1 }, "power2.out"); W.mouth(tKing, "o"); W.pose(tKing + 0.8, 0.2, { eye: 1 }, "power2.out");
  // ngồi xuống vỉa hè với bánh quế
  var SX = 1180;
  W.walk(tSo - 0.1, tSo + 0.75, 1470, SX, { step: 0.28 });
  W.pose(tSo + 0.85, 0.25, { sy: 0.9, sx: 1.06, legL: 34, legR: -34, legLs: 0.6, legRs: 0.6 }, "power2.inOut");
  api.key("#W", "y", tSo + 0.85, G + 26, "none"); api.key("#W", "y", tSo + 1.1, G + 4, "power2.out");
  W.pose(tSo + 1.15, 0.2, { sy: 1, sx: 1 }, "back.out(2)");
  W.pose(tSo + 1.1, 0.3, { aLu: -14, aLf: 52, aRu: 14, aRf: -48, pupX: -10, pupY: 8 }, "power2.inOut");
  W.mouth(tSo + 1.1, "grin");
  var BX = SX - 96, BY = G - 52;
  ["#banh", "#banhC", "#nuaL", "#nuaR"].forEach(function (s0) { api.origin(s0, "0 0"); api.set(s0, 0, { x: BX, y: BY }); });
  api.key("#nuaL", "scale", 0, 0.78, "step"); api.key("#nuaR", "scale", 0, 0.78, "step"); api.key("#banhC", "scale", 0, 0.78, "step");
  api.show("#banh", 0, 0); api.show("#banh", tSo + 1.15, 1); api.show("#banh", tBun + 0.05, 0);
  api.show("#banhC", 0, 0); api.show("#banhC", tBun + 0.05, 1);
  api.key("#banh", "scale", 0, 0, "step"); api.key("#banh", "scale", tSo + 1.15, 0.2, "none"); api.key("#banh", "scale", tSo + 1.45, 0.78, "back.out(2)");
  // cắn
  W.pose(tBun - 0.3, 0.25, { upY: 14, upRot: -9, lean: -4, pupX: -14 }, "power2.in"); W.mouth(tBun - 0.25, "o");
  W.pose(tBun + 0.05, 0.12, { upY: 0, upRot: 0, lean: 0 }, "back.out(2)"); W.mouth(tBun + 0.05, "B");
  api.sfx("nuot", tBun + 0.1, 0.55);
  for (var c = 0; c < 4; c++) W.mouth(tBun + 0.25 + c * 0.16, c % 2 ? "B" : "A");
  W.mouth(tBun + 0.9, "smirk");
  // con chó đi tới, ngồi cạnh
  var CX = SX + 200;
  api.origin("#choG", "0 0"); api.set("#choG", 0, { x: 2400, y: G + 18, scale: 0.6 });
  api.key("#choG", "x", tDog - 0.3, 2400, "none"); api.key("#choG", "x", tSat, CX, "power2.out");
  for (var h = 0; h < 6; h++) api.key("#choG", "y", tDog - 0.3 + h * 0.18, h % 2 ? G + 10 : G + 18, "sine.inOut");
  api.key("#choG", "y", tSat, G + 18, "power2.out");
  api.key("#choG", "scaleY", tSat - 0.05, 1, "none"); api.key("#choG", "scaleY", tSat + 0.08, 0.92, "power2.in"); api.key("#choG", "scaleY", tSat + 0.24, 1, "back.out(2)");
  api.origin("#ch-duoi", "-56 -46");
  for (var dd = 0; dd < 10; dd++) api.key("#ch-duoi", "rotation", tSat + 0.3 + dd * 0.2, dd % 2 ? 12 : -8, "sine.inOut");
  W.pose(tSat + 0.1, 0.25, { pupX: 12, pupY: 2 }, "power2.out");   // Wob liếc con chó
  W.pose(tSat + 0.7, 0.3, { pupX: 10, pupY: -6 }, "power2.out");   // cả hai nhìn nhà thờ
  // "very seriously": chó quay sang nhìn cái bánh; Wob nhìn chó; dừng; bẻ đôi; chó ngậm rồi quay lại nhìn nhà thờ
  api.origin("#ch-dau", "40 -150");
  api.key("#ch-dau", "scaleX", 0, 1); api.key("#ch-dau", "scaleX", tSer - 0.05, 1, "none"); api.key("#ch-dau", "scaleX", tSer + 0.12, -1, "power2.inOut");
  api.key("#ch-dau", "rotation", 0, 0); api.key("#ch-dau", "rotation", tSer + 0.12, 10, "power2.out");
  W.pose(tSer + 0.15, 0.18, { pupX: 14, pupY: 6, upRot: 3 }, "power2.out"); W.mouth(tSer + 0.35, "flat");
  var tBr = tSer + 0.5;
  W.pose(tBr - 0.15, 0.15, { aLu: -10, aLf: 40 }, "power2.in");
  W.pose(tBr, 0.18, { aLu: -18, aLf: 58, aRu: -40, aRf: -30 }, "back.out(1.8)");
  api.show("#banhC", tBr, 0); api.show("#nuaL", 0, 0); api.show("#nuaR", 0, 0); api.show("#nuaL", tBr, 1); api.show("#nuaR", tBr, 1);
  api.key("#nuaL", "x", tBr, BX - 4, "none"); api.key("#nuaL", "x", tBr + 0.2, BX - 8, "power2.out"); api.key("#nuaL", "rotation", tBr + 0.2, -6, "power2.out");
  api.key("#nuaR", "x", tBr, BX + 4, "none"); api.key("#nuaR", "x", tBr + 0.2, BX + 60, "power2.out");
  var tGive = tBr + 0.22, tTake = tGive + 0.26;
  W.pose(tTake + 0.1, 0.25, { aRu: 14, aRf: -48 }, "power2.inOut");
  api.key("#nuaR", "x", tGive, BX + 60, "none"); api.key("#nuaR", "x", tTake, CX + 52, "power2.inOut");
  api.key("#nuaR", "y", tGive, BY, "none"); api.key("#nuaR", "y", tTake, G - 70, "power2.inOut");
  api.key("#nuaR", "scale", tGive, 0.78, "none"); api.key("#nuaR", "scale", tTake, 0.3, "power2.inOut");
  api.show("#nuaR", tTake, 0); api.show("#ch-nua", 0, 0); api.show("#ch-nua", tTake, 1);
  api.key("#ch-dau", "scaleX", tTake + 0.02, -1, "none"); api.key("#ch-dau", "scaleX", tTake + 0.14, 1, "power2.inOut");
  api.key("#ch-dau", "rotation", tTake + 0.02, 10, "none"); api.key("#ch-dau", "rotation", tTake + 0.14, -4, "power2.out");
  W.pose(tTake + 0.3, 0.25, { pupX: 10, pupY: -6, upRot: 0 }, "power2.out"); W.mouth(tTake + 0.3, "smirk");
  W.idle(tSo + 1.3, DUR, { seed: 25, bien: 1.2 });
  W.autoBlink(0, DUR, 2501);
};
