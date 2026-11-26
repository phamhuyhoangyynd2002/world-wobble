/* Đoạn d07 · cắt giấy · hồi ức: tìm chỗ đặt ba lô; đi vòng đảo trước bữa trưa; lối tắt giữa hai nhà, ba lô kẹt; kéo co;
   cậu bé đi ngang; ôm ba lô như cái sofa, góc nào cũng đập; con mèo trên bậu cửa sổ không chớp mắt.
   Vào "cat", ra "chen" (sang d08 vẽ tay). Phông: NhietDoi.loiDi (seed 1100, cùng phố với d05, d10), đoạn phố khác.
   Shot: A lối đi (0–4,65) · B từ trên cao (4,65–7,35) · C cận đồng hồ tay (7,35–9,4) · D khe nhà, cận mặt (9,4–15,6) ·
         E kéo co (15,6–20,1) · F cậu bé đi ngang, dây phơi tiền cảnh (20,1–26,6) · G ôm ba lô đi nghiêng (26,6–33,9) · H cận con mèo (33,9–hết).
   Trang phục: mũ cói; ba lô khổng lồ trên lưng tới "I took it off", từ đó ôm trước người. Đồng hồ tay không chữ, không số.
   Người dân: một cậu bé dạng người giấy chung, chỉ chấm mắt; gag nằm ở Wob. Không chữ trên hình. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, NB = window.NhietDoiB, at = api.at, DUR = api.DUR, K = api.K;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  function ss(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }

  var tB = 4.65, tC = 7.35, tD = T("Then", 0, 9.4), tD2 = 14.6, tE = T("pulled", 0, 15.79) - 0.2, tF = T("kid", 0, 20.3) - 0.2, tG = T("took", 0, 26.76) - 0.2, tH = T("cat", 0, 34.11) - 0.2;

  // =================== lối đi (lớp parallax) ===================
  var nhaDs = [
    [100, 380, 370, 2, { cua: 0.25, so: 1, tranh: "thuyen", tranhX: -90 }], [520, 400, 380, 3, { cua: -0.3, cuaMo: true, so: 0 }],
    [960, 440, 370, 0, { cua: 0.45, so: 1, soX: -70 }], [1400, 400, 360, 4, { cua: -0.2, so: 1, mai: "doc", tranh: "ca", tranhX: 90 }],
    // khe tắt giữa hai nhà ở x = 2600
    [2380, 420, 380, 1, { cua: -0.4, so: 1, soX: 60 }], [2850, 420, 370, 5, { cua: 0.4, so: 1, soX: -70, so: 1, soX: -70 }],
    [3300, 420, 360, 3, { cua: -0.3, cuaMo: true, so: 1 }], [3760, 440, 380, 6, { cua: 0.3, so: 0, tranh: "song" }],
    [4240, 460, 370, 0, { cua: -0.35, so: 0 }], [4700, 420, 360, 2, { cua: 0.3, so: 1 }]
  ];
  var L = ND.loiDi(api, { seed: 1100, mat: 900, tu: -400, den: 5200, nha: nhaDs,
    ghe: [[1760, "#F4F2EC", "giua", 0.55], [3060, "#5FA8D3", "giua", 0.55]],
    phoi: [[1700, 380, 3500, 360, 34, "gan"]] });
  var giua = L.giua;
  // khe tối giữa hai nhà (lối nhỏ chạy vào sâu) – vẽ lên trên nền nhà, rồi hai mép tường đè lên
  var KX = 2600, KW = 100;
  var khe = '<rect x="' + (KX - KW / 2) + '" y="560" width="' + KW + '" height="342" fill="#2E3540"/>' +
    '<path d="M ' + (KX - KW / 2) + ' 560 L ' + (KX - 14) + ' 640 L ' + (KX - 14) + ' 860 L ' + (KX - KW / 2) + ' 902 Z" fill="#46505C"/>' +
    '<path d="M ' + (KX + KW / 2) + ' 560 L ' + (KX + 14) + ' 640 L ' + (KX + 14) + ' 860 L ' + (KX + KW / 2) + ' 902 Z" fill="#3A434E"/>' +
    '<rect x="' + (KX - 14) + '" y="640" width="28" height="220" fill="#F2E6C8" opacity="0.5"/>';
  giua += khe;
  // ba lô rời (kẹt trong khe) – nhóm khoá x/y/rotation/scale, tâm ba lô ở gốc
  giua += '<g id="pkG"><g transform="scale(0.55) translate(0,215)">' + ND.baLo("pk", { uot: "pkU" }) + "</g></g>";
  // hai mép tường của khe (đè lên ba lô kẹt)
  giua += D.paper(D.rRect(KX - KW / 2 - 40, 560, 40, 342, 1.2, 1301), ND.M.tuong[1], { stroke: true, sw: 5, shadow: false }) +
    D.paper(D.rRect(KX + KW / 2, 562, 40, 340, 1.2, 1302), ND.M.tuong[5], { stroke: true, sw: 5, shadow: false });
  // dây quai: từ ba lô kẹt tới vai Wob (vẽ mỗi khung)
  giua += '<path id="quai0" d="M 0 0" fill="none" stroke="#566030" stroke-width="9" stroke-linecap="round" opacity="0"/><path id="quai1" d="M 0 0" fill="none" stroke="#566030" stroke-width="9" stroke-linecap="round" opacity="0"/>';
  // ghế có mèo nằm (shot A), bậu cửa sổ hẹp
  giua += at(560, 904, sc(0.55, ND.ghe({ mau: "#F4F2EC" }))) + at(566, 854, '<g id="meoG">' + sc(0.42, ND.meo("meoA", {})) + "</g>");
  // các góc tường nhô ra lối (shot G) và nhà có cửa sổ xanh có mèo ở cuối
  [[3540, 1], [3990, 2]].forEach(function (g, i) {
    giua += D.paper(D.rRect(g[0] - 30, 600, 60, 302, 1.2, 1310 + i), ND.M.tuong[(g[1] + 3) % 7], { stroke: true, sw: 5, sx: 7, sy: 6 }) +
      D.line("M " + (g[0] - 22) + " 600 L " + (g[0] - 22) + " 902", 4, "#0b1214", ' opacity="0.15"');
  });
  giua += D.paper(D.rRect(4330, 640, 120, 110, 1.5, 1340), "#2F6F9E", { stroke: true, sw: 5 }) + '<rect x="4344" y="654" width="92" height="82" fill="#2E3A44"/>' +
    D.paper(D.rRect(4316, 748, 148, 16, 1, 1341), "#E9E3D2", { stroke: true, sw: 4, shadow: false }) + at(4392, 750, sc(0.36, ND.meo("meoG", {})));
  var W = ND.wob(api, "W", { lung: 1, truocTf: "translate(440,282) rotate(-90) scale(0.62)" });
  giua += W.svg;
  // cậu bé (người giấy chung, chỉ chấm mắt)
  var KID = NB.nguoiDat(api, "kid", 2100, 944, 0.78, { nho: true, ao: "#F2CB57", quan: "#3F7FB8", da: "#B98563" });
  giua += KID;
  // bụi nhỏ ở chân tường khi kéo co
  giua += '<g id="bui">' + api.phut("bp", KX + 70, 890, { n: 3, song: 0.8, cao: 40, troi: 60, r: 14, tu: T("pulled", 1, 17.21), den: T("pulled", 1, 17.21) + 1.0, seed: 41 }) + "</g>";

  // =================== B: từ trên cao cả đảo ===================
  var hatTop = '<circle r="20" fill="' + ND.M.coi + '" stroke="' + D.INK + '" stroke-width="3"/><circle r="20" fill="url(#ndDan)" opacity="0.7"/>' +
    '<circle r="11" fill="' + ND.M.coi + '" stroke="' + D.INK + '" stroke-width="2.5"/><circle r="11" fill="none" stroke="' + ND.M.dai + '" stroke-width="4"/>' +
    '<rect x="8" y="-10" width="18" height="24" rx="4" fill="' + ND.M.oliu + '" stroke="' + D.INK + '" stroke-width="2"/>';
  var r3 = D.rng(56), gon = "";
  for (var i = 0; i < 24; i++) gon += D.line("M " + D.f1(-100 + r3() * 2100) + " " + D.f1(r3() * 1080) + " c 20 -10 40 10 60 0", 4, "#EAF7F2", ' opacity="0.45"');
  var sB = '<g id="sB"><g id="sBk"><rect x="-200" y="-200" width="2400" height="1500" fill="#3FA9A6"/>' + gon +
    at(960, 540, sc(1.25, ND.daoTuTren({ w: 720, h: 470, seed: 901 }))) + '<g id="wobDot">' + hatTop + "</g></g></g>";

  // =================== C: cận đồng hồ tay ===================
  var sC = '<g id="sC"><rect x="0" y="0" width="1920" height="1080" fill="#E9DCC0"/>' +
    '<rect x="0" y="0" width="1920" height="1080" fill="url(#half)" opacity="0.05"/>' +
    D.paper(D.rRect(-40, 620, 680, 300, 3, 1320), ND.M.tuong[0], { shadow: false }) + D.paper(D.rRect(1380, 560, 620, 360, 3, 1321), ND.M.tuong[2], { shadow: false }) +
    D.line("M -100 560 C 600 520 1300 520 2100 560", 120, D.INK) + D.line("M -100 560 C 600 520 1300 520 2100 560", 96, "#2B3035") +
    at(960, 545, sc(1.05, ND.dongHo("dh", 230))) +
    '<g id="tayGo"><g transform="translate(1290,250) rotate(-35)">' + '<circle r="44" fill="' + D.INK + '"/>' + D.line("M 0 0 L 0 -150", 50, D.INK) + D.line("M -8 -40 L -40 -96", 26, D.INK) + "</g></g></g>";

  // =================== H: cận con mèo trên bậu cửa sổ ===================
  var sH = '<g id="sH"><g id="sHk"><rect x="-200" y="-200" width="2400" height="1500" fill="' + ND.M.tuong[0] + '"/>' +
    '<rect x="-200" y="-200" width="2400" height="1500" fill="url(#half)" opacity="0.06"/>' +
    '<g id="khung">' + D.paper(D.rRect(560, 120, 820, 640, 2, 1330), "#2F6F9E", { stroke: true, sw: 8, sx: 10, sy: 12 }) +
    '<rect x="610" y="170" width="720" height="560" fill="#2E3A44" stroke="' + D.INK + '" stroke-width="6"/>' +
    D.paper(D.rRect(500, 730, 940, 60, 2, 1331), "#E9E3D2", { stroke: true, sw: 6, sx: 8, sy: 10 }) + "</g>" +
    at(980, 732, '<g id="meoH">' + sc(1.9, ND.meo("meoB", {})) + "</g>") +
    '<g id="pkH"><g transform="translate(-40,520) rotate(-90) scale(0.9)">' + ND.baLo("pkh", {}) + "</g></g></g></g>";

  api.dat(L.troi + api.lop("xa", L.xa, 0.35, { mat: 650 }) + api.lop("giua", giua, 1, { mat: 900 }) + api.lop("gan", L.gan, 1.4, { mat: 1050 }) +
    ND.defs() + sB + sC + sH);
  api.noi({});
  function cat(sel, t0, t1) { api.show(sel, 0, 0); api.show(sel, t0, 1); if (t1 != null) api.show(sel, t1, 0); }
  cat("#sB", tB, tC); cat("#sC", tC, tD); cat("#sH", tH, null);

  // =================== camera lớp ===================
  var FX = 2930;   // Wob đứng trước khe sau khi chui ra
  api.camera([[0, 760, 640, 1.18], [tB, 780, 640, 1.24, "sine.inOut"],
    [tD, 2620, 650, 1.3, "step"], [tD2 - 0.1, 2700, 660, 1.36, "sine.inOut"],
    [tD2, FX - 8, 795, 3.1, "power3.out"], [tE - 0.05, FX - 8, 790, 3.2, "sine.inOut"],
    [tE, 2760, 650, 1.32, "step"], [tF - 0.05, 2780, 650, 1.4, "sine.inOut"],
    [tF, 2700, 560, 1.0, "step"], [tG + 0.5, 2740, 560, 1.06, "sine.inOut"],
    [tG + 1.2, 2950, 600, 1.12, "power2.inOut"], [tH - 0.05, 3950, 600, 1.12, "sine.inOut"]]);

  // =================== A: tìm chỗ đặt ba lô ===================
  W.set(0, { x: 820, y: 902, size: 0.55 });
  W.pose(0.2, 0.25, { pupX: -10, upRot: -3 }, "power2.out");
  // xoay một vòng tại chỗ (lật thân như con rối giấy), nhìn tứ phía
  [[0.6, -1], [1.15, 1], [1.7, -1], [2.2, 1]].forEach(function (k, j) {
    W.pose(k[0], 0.18, { sx: k[1] * 0.15 }, "power2.in"); W.pose(k[0] + 0.18, 0.16, { sx: k[1] }, "power2.out");
    W.pose(k[0] + 0.1, 0.2, { pupX: (j % 2 ? 10 : -10), pupY: j === 2 ? -8 : 0 }, "power2.out");
  });
  W.pose(2.45, 0.25, { pupX: 0, pupY: 2, upRot: 0 }, "power2.inOut");
  W.mouth(2.4, "thang");
  W.breathe(2.4, 3.05);
  // thử ghế: mèo đã nằm, nhìn Wob
  W.walk(3.0, 3.35, 820, 690, { step: 0.17 });
  W.pose(3.38, 0.22, { lean: -9, sy: 0.92, upY: 6, pupX: -12, pupY: 8 }, "power2.out");
  api.origin("#meoA-dau", "0 0"); api.origin("#meoA-con", "0 0");
  api.key("#meoA-dau", "rotation", 0, 0, "step"); api.key("#meoA-dau", "rotation", 3.4, 0, "none"); api.key("#meoA-dau", "rotation", 3.55, 12, "power2.out");
  api.key("#meoA-con", "x", 0, 0, "step"); api.key("#meoA-con", "x", 3.45, 0, "none"); api.key("#meoA-con", "x", 3.6, 6, "power2.out");
  W.pose(3.62, 0.12, { eye: 1.15, sy: 1, lean: 0, upY: 0 }, "back.out(2)"); W.mouth(3.62, "flat");
  // thử bậu cửa sổ: chỉ rộng bằng bàn tay
  W.walk(3.85, 4.2, 690, 905, { step: 0.17 });
  W.pose(4.22, 0.2, { aRu: -168, aRf: -20, pupX: 6, pupY: -12, eye: 1 }, "back.out(1.6)");

  // =================== B: đi vòng đảo (từ trên cao) ===================
  api.origin("#sBk", "960 540");
  api.key("#sBk", "scale", tB, 1, "none"); api.key("#sBk", "scale", tC, 1.05, "sine.inOut");
  var wA = T("walked", 0, 5.11) - 0.05, wB = wA + 2.0, a0 = 1.25;
  api.moiKhung(function (t) {
    if (!api.dom) return;
    var n = document.getElementById("wobDot"); if (!n) return;
    var u = ss((t - wA) / (wB - wA)), a = a0 + u * 2 * Math.PI;
    var x = 960 + Math.cos(a) * 720 * 1.25 * 0.55, y = 540 + Math.sin(a) * 470 * 1.25 * 0.57, bob = (t > wA && t < wB) ? Math.abs(Math.sin(t * 18)) * 4 : 0;
    n.setAttribute("transform", "translate(" + x.toFixed(1) + "," + (y - bob).toFixed(1) + ")");
  });

  // =================== C: đồng hồ chưa nhích, Wob gõ gõ ===================
  api.set("#dh-kimP", 0, { rotation: 62 }); api.set("#dh-kimG", 0, { rotation: 335 });
  api.origin("#dh-kimP", "0 0"); api.origin("#dh-kimG", "0 0");
  api.key("#tayGo", "x", 0, 400, "step"); api.key("#tayGo", "y", 0, -300, "step");
  var tGo = T("before", 1, 8.0);
  api.key("#tayGo", "x", tGo - 0.35, 400, "none"); api.key("#tayGo", "y", tGo - 0.35, -300, "none");
  api.key("#tayGo", "x", tGo - 0.05, 0, "power2.out"); api.key("#tayGo", "y", tGo - 0.05, 0, "power2.out");
  [0, 0.24, 0.48].forEach(function (d, j) {
    api.key("#tayGo", "y", tGo + d, 0, "none"); api.key("#tayGo", "y", tGo + d + 0.08, 46, "power3.in"); api.key("#tayGo", "y", tGo + d + 0.18, 0, "power2.out");
    api.key("#dh-kimP", "rotation", tGo + d + 0.08, 62, "none"); api.key("#dh-kimP", "rotation", tGo + d + 0.11, 64, "power1.out"); api.key("#dh-kimP", "rotation", tGo + d + 0.2, 62, "power1.inOut");
  });
  api.key("#tayGo", "x", tGo + 0.9, 0, "none"); api.key("#tayGo", "x", tD - 0.1, 60, "sine.inOut");

  // =================== D: lối tắt, ba lô kẹt ===================
  // trước khi Wob chui: ba lô ẩn, Wob không đeo (để ba lô rời đi sau lưng trong khe)
  api.show(W.nd.lung, tD, 0);
  W.set(tD, { x: KX, y: 820, size: 0.3, sx: 0.8, pupX: 0, pupY: 0, aRu: -18, aRf: 10, lean: 0, eye: 1 });
  W.mouth(tD, "X");
  // chui ra từ khe về phía máy: to dần, đi xuống
  var tO0 = T("shortcut", 0, 10.01), tO1 = T("houses", 0, 11.28) + 0.3;
  api.key("#W", "y", tO0, 820, "none"); api.key("#W", "y", tO1, 924, "sine.inOut");
  api.key("#W-sz", "scale", tO0, 0.3, "none"); api.key("#W-sz", "scale", tO1, 0.55, "sine.inOut");
  for (var b = 0, tb2 = tO0; tb2 < tO1; tb2 += 0.27, b++) { W.pose(tb2, 0.13, { upY: -8, lean: b % 2 ? 4 : -4 }, "sine.out"); W.pose(tb2 + 0.13, 0.13, { upY: 0 }, "sine.in"); }
  W.pose(tO1 - 0.2, 0.25, { sx: 1, lean: 0 }, "back.out(2)");
  // ba lô rời theo sau trong khe, rồi kẹt ở miệng khe
  var pk0 = [KX, 740], pkStuck = [KX, 790];
  api.origin("#pkG", "0 0");
  api.key("#pkG", "x", 0, -900, "step"); api.key("#pkG", "y", 0, 790, "step"); api.key("#pkG", "scale", 0, 0.55, "step"); api.key("#pkG", "rotation", 0, 0, "step");
  api.key("#pkG", "x", tD, pk0[0], "step"); api.key("#pkG", "y", tD, pk0[1], "step");
  var tKet = T("tried", 1, 12.85) - 0.1;
  api.key("#pkG", "y", tO1, pkStuck[1] - 20, "sine.inOut"); api.key("#pkG", "scale", tO1, 0.85, "sine.inOut");
  api.key("#pkG", "y", tKet, pkStuck[1], "power3.in"); api.key("#pkG", "scale", tKet, 1, "power3.in");
  api.key("#pkG", "rotation", tKet, 0, "none"); api.key("#pkG", "rotation", tKet + 0.12, -4, "power2.out"); api.key("#pkG", "rotation", tKet + 0.4, 0, "back.out(2)");
  api.sfx("bonk", tKet, 0.6);
  // Wob bước sang phải dọc lối; dây quai căng
  W.walk(tO1 + 0.25, tO1 + 0.75, KX, 2760, { step: 0.25 });
  W.pose(tKet, 0.1, { sy: 0.94 }, "power2.in"); W.pose(tKet + 0.1, 0.2, { sy: 1 }, "back.out(2)");
  var tBuoc = T("Only", 0, 13.86), tGiat = tBuoc + 0.55;
  W.walk(tBuoc, tGiat, 2760, FX, { step: 0.27 });
  // bị giật ngược
  api.key("#W", "x", tGiat + 0.02, FX, "none"); api.key("#W", "x", tGiat + 0.14, FX - 30, "power3.out"); api.key("#W", "x", tGiat + 0.4, FX - 12, "sine.out");
  W.pose(tGiat, 0.1, { lean: -12, sx: 0.9, sy: 1.08 }, "power3.out"); W.pose(tGiat + 0.15, 0.3, { lean: -3, sx: 1, sy: 1 }, "back.out(2)");
  W.mouth(tGiat, "o"); W.pose(tGiat, 0.08, { eye: 1.2 }, "power2.out"); W.pose(tGiat + 0.4, 0.2, { eye: 1 }, "power2.out");
  api.sfx("boing", tGiat + 0.02, 0.45);
  // cận mặt: quay nhìn ra sau, dừng, rồi mới hiểu
  W.pose(tD2 + 0.1, 0.25, { pupX: -12, pupY: -6, upRot: -5 }, "power2.out");
  W.mouth(tD2 + 0.1, "thang");
  W.pose(tD2 + 0.45, 0.06, { lid: 20 }, "none");
  W.pose(tD2 + 0.8, 0.2, { pupX: 0, pupY: 3, upRot: 0, lid: 0 }, "power2.inOut");
  W.mouth(tE - 0.35, "flat"); W.pose(tE - 0.35, 0.15, { eye: 0.92 }, "power2.out");
  W.set(tE, { eye: 1 });
  // dây quai: từ ba lô kẹt tới vai Wob
  var quai = [null, null];
  api.moiKhung(function (t) {
    if (!api.dom) return;
    if (!quai[0]) { quai[0] = document.getElementById("quai0"); quai[1] = document.getElementById("quai1"); }
    var on = t >= tO1 - 0.2 && t < T("took", 0, 26.76) + 0.5;
    var px = K.at("#pkG", "x", t), py = K.at("#pkG", "y", t), wx = K.at("#W", "x", t), wy = K.at("#W", "y", t), ws = K.at("#W-sz", "scale", t);
    var lean = K.at("#W-sq", "rotation", t) * Math.PI / 180;
    for (var q = 0; q < 2; q++) {
      var sx = wx + (q ? 40 : -40) * ws + Math.sin(lean) * 180 * ws, sy = wy - 190 * ws - (1 - Math.cos(lean)) * 100 * ws;
      var ax = px + (q ? 26 : -26), ay = py - 40;
      var sag = Math.max(0, 40 - Math.abs(sx - ax) * 0.12);
      quai[q].setAttribute("d", "M " + ax.toFixed(1) + " " + ay.toFixed(1) + " Q " + ((ax + sx) / 2).toFixed(1) + " " + ((ay + sy) / 2 + sag).toFixed(1) + " " + sx.toFixed(1) + " " + sy.toFixed(1));
      quai[q].setAttribute("opacity", on ? "1" : "0");
    }
  });

  // =================== E: kéo co ===================
  W.set(tE, { x: FX - 12, pupX: 0, pupY: 0, upRot: 0 });
  var tKeo = T("pulled", 0, 15.79), tKeoLai = T("pulled", 1, 17.21), tNha = T("houses", 1, 18.38);
  W.pose(tKeo - 0.15, 0.3, { lean: 16, sx: 1.14, sy: 0.92, aLu: 120, aLf: 20, aRu: 60, aRf: -20, upY: 4 }, "power2.out");
  W.mouth(tKeo - 0.1, "chatter");
  W.shiver(tKeo + 0.2, tKeoLai - 0.1, 3, 18);
  api.key("#W", "x", tKeo + 0.1, FX - 12, "none"); api.key("#W", "x", tKeoLai - 0.15, FX + 16, "sine.inOut");
  // ba lô ghì lại: Wob trượt ngược, thân giãn rồi bật
  api.key("#W", "x", tKeoLai, FX + 16, "none"); api.key("#W", "x", tKeoLai + 0.18, FX - 40, "power3.out"); api.key("#W", "x", tKeoLai + 0.6, FX - 30, "sine.out");
  W.pose(tKeoLai, 0.12, { sx: 1.25, sy: 0.84, lean: 22 }, "power3.out"); W.pose(tKeoLai + 0.15, 0.35, { sx: 1.08, sy: 0.96, lean: 12 }, "elastic.out(1,0.5)");
  api.sfx("boing", tKeoLai, 0.55);
  api.key("#pkG", "rotation", tKeoLai - 0.05, 0, "none"); api.key("#pkG", "rotation", tKeoLai + 0.1, 3, "power2.out"); api.key("#pkG", "rotation", tKeoLai + 0.4, 0, "back.out(2)");
  // nhà không nhúc nhích: Wob buông, nhìn hai bức tường
  W.pose(tNha, 0.35, { lean: 0, sx: 1, sy: 1, aLu: 18, aLf: -10, aRu: -18, aRf: 10, upY: 0, pupX: -11, pupY: -4 }, "power2.inOut");
  W.mouth(tNha, "flat");
  W.idle(tNha + 0.5, tF, { seed: 9, bien: 1 });

  // =================== F: cậu bé đi ngang ===================
  var tLook1 = T("looked", 1, 21.63), tLook2 = T("looked", 2, 22.3), tKept = T("kept", 0, 23.61);
  api.show("#kid-vt", 0, 0); api.show("#kid-vt", tF, 1);
  api.origin("#kid-dau", "0 0"); api.origin("#kid-mat", "0 0");
  NB.nguoiDi(api, "kid", tF, tLook1 + 0.3, FX - 260, { buoc: 0.36 });
  NB.nguoiDi(api, "kid", tLook1 + 0.3, tKept - 0.1, FX + 40, { buoc: 0.42 });
  NB.nguoiDi(api, "kid", tKept - 0.1, tG + 1.6, 4400, { buoc: 0.36 });
  api.show("#kid-vt", tG + 1.6, 0);
  api.key("#kid-mat", "x", 0, 4, "step");
  api.key("#kid-mat", "x", tLook1 - 0.05, 4, "none"); api.key("#kid-mat", "x", tLook1 + 0.12, 9, "power2.out");
  api.key("#kid-dau", "rotation", 0, 0, "step"); api.key("#kid-dau", "rotation", tLook1 - 0.05, 0, "none"); api.key("#kid-dau", "rotation", tLook1 + 0.15, 8, "power2.out");
  api.key("#kid-mat", "x", tLook2 - 0.05, 9, "none"); api.key("#kid-mat", "x", tLook2 + 0.12, -9, "power2.out");
  api.key("#kid-dau", "rotation", tLook2 - 0.05, 8, "none"); api.key("#kid-dau", "rotation", tLook2 + 0.15, -10, "power2.out");
  api.key("#kid-mat", "x", tKept - 0.1, -9, "none"); api.key("#kid-mat", "x", tKept + 0.1, 4, "power2.out");
  api.key("#kid-dau", "rotation", tKept - 0.1, -10, "none"); api.key("#kid-dau", "rotation", tKept + 0.15, 0, "power2.out");
  // Wob đứng im, hơi cúi đầu
  W.pose(tLook1, 0.2, { pupX: -8, pupY: 4 }, "power2.out");
  W.pose(tLook2 + 0.2, 0.3, { pupX: 0, pupY: 10, upRot: -2, upY: 6 }, "power2.inOut");
  var tHurt = T("politeness", 0, 25.09);
  W.pose(tHurt, 0.5, { sy: 0.95, sx: 1.03, lid: 22 }, "sine.inOut"); W.mouth(tHurt, "buon");

  // =================== G: tháo ba lô, ôm trước người như sofa ===================
  W.pose(tG + 0.05, 0.3, { sy: 1, sx: 1, lid: 0, upRot: 0, upY: 0, pupX: -10, pupY: 0 }, "power2.out");
  W.mouth(tG + 0.1, "thang");
  W.walk(tG + 0.15, tG + 0.6, FX - 30, KX + 130, { step: 0.22 });
  var tLay = tG + 0.75, tOm = tLay + 0.45;
  W.pose(tLay - 0.05, 0.2, { aLu: 120, aLf: 10, lean: -8 }, "power2.out");
  // ba lô rời ra khỏi khe, xoay ngang, về trước người Wob
  var omX = KX + 130 + (440 - 215 * 0.62 - 200) * 0.55, omY = 924 - (392 - 282) * 0.55;
  api.key("#pkG", "x", tLay, KX, "none"); api.key("#pkG", "y", tLay, pkStuck[1], "none"); api.key("#pkG", "scale", tLay, 1, "none"); api.key("#pkG", "rotation", tLay, 0, "none");
  api.key("#pkG", "x", tOm, omX, "power2.inOut"); api.key("#pkG", "y", tOm, omY, "power2.inOut"); api.key("#pkG", "rotation", tOm, -90, "power2.inOut");
  api.key("#pkG", "scale", tOm, 0.62 * 0.55 / 0.55 * (0.55 / 0.55), "power2.inOut");
  api.show("#pkG", 0, 1); api.show("#pkG", tOm, 0); api.show(W.nd.truoc, tOm, 1);
  W.pose(tOm - 0.1, 0.25, { aLu: -60, aLf: -80, aRu: 70, aRf: 60, lean: 0, pupX: 6 }, "power2.out");
  W.pose(tOm, 0.1, { sy: 0.9 }, "power2.in"); W.pose(tOm + 0.1, 0.25, { sy: 1 }, "back.out(2)");
  // đi nghiêng ngang; mỗi góc ba lô đập trước
  var g1 = 3540 - 30, g2 = 3990 - 30, reach = (440 - 200) * 0.55;
  var tHit1 = T("turned", 0, 30.6), tHit2 = T("hit", 0, 33.01);
  var xS = KX + 130;
  W.walk(tOm + 0.35, tHit1, xS, g1 - reach, { step: 0.26, arms: false });
  W.pose(tHit1, 0.08, { sx: 0.86, sy: 1.06, lean: -8 }, "power3.out"); W.pose(tHit1 + 0.1, 0.3, { sx: 1, sy: 1, lean: 0 }, "back.out(2)");
  api.key("#W", "x", tHit1 + 0.02, g1 - reach, "none"); api.key("#W", "x", tHit1 + 0.15, g1 - reach - 26, "power3.out");
  api.key(W.nd.truocK, "rotation", 0, 0, "step"); api.key(W.nd.truocK, "rotation", tHit1, 0, "none"); api.key(W.nd.truocK, "rotation", tHit1 + 0.1, -7, "power3.out"); api.key(W.nd.truocK, "rotation", tHit1 + 0.4, 0, "back.out(2)");
  api.sfx("bonk", tHit1, 0.6);
  W.mouth(tHit1, "flat");
  // lách qua: bước ra phía máy (xuống) rồi đi tiếp
  var tL1 = tHit1 + 0.55;
  api.key("#W", "y", tL1, 924, "none"); api.key("#W", "y", tL1 + 0.35, 960, "sine.inOut");
  api.key("#W-sz", "scale", tL1, 0.55, "none"); api.key("#W-sz", "scale", tL1 + 0.35, 0.6, "sine.inOut");
  W.walk(tL1 + 0.35, tHit2, g1 - reach - 26, g2 - reach * 1.09, { step: 0.26, arms: false });
  api.key("#W", "y", tL1 + 0.9, 960, "none"); api.key("#W", "y", tL1 + 1.3, 924, "sine.inOut");
  api.key("#W-sz", "scale", tL1 + 0.9, 0.6, "none"); api.key("#W-sz", "scale", tL1 + 1.3, 0.55, "sine.inOut");
  W.pose(tHit2, 0.08, { sx: 0.86, sy: 1.06, lean: -8 }, "power3.out"); W.pose(tHit2 + 0.1, 0.3, { sx: 1, sy: 1, lean: 0 }, "back.out(2)");
  api.key("#W", "x", tHit2 + 0.02, g2 - reach * 1.09, "none"); api.key("#W", "x", tHit2 + 0.15, g2 - reach * 1.09 - 26, "power3.out");
  api.key(W.nd.truocK, "rotation", tHit2, 0, "none"); api.key(W.nd.truocK, "rotation", tHit2 + 0.1, -7, "power3.out"); api.key(W.nd.truocK, "rotation", tHit2 + 0.4, 0, "back.out(2)");
  api.sfx("bonk", tHit2, 0.6);
  W.mouth(tHit2 + 0.05, "wobbly");
  W.autoBlink(0, DUR, 41);

  // =================== H: cận con mèo ===================
  api.origin("#sHk", "980 600");
  api.key("#sHk", "scale", tH, 1, "none"); api.key("#sHk", "scale", DUR, 1.06, "sine.inOut");
  var tDap = T("whole", 1, 35.49) - 0.1, tChop = T("blinking", 0, 36.51);
  // ba lô lướt ngang qua phía trước khung (mắt mèo dõi theo), đập trúng khung cửa
  api.key("#pkH", "x", 0, -700, "step"); api.key("#pkH", "x", tH + 0.4, -700, "none"); api.key("#pkH", "x", tDap, 600, "power1.in");
  api.key("#pkH", "x", tDap + 0.15, 520, "power2.out"); api.key("#pkH", "x", tDap + 0.9, 545, "sine.inOut"); api.key("#pkH", "x", DUR, -900, "power2.in");
  api.sfx("bonk", tDap, 0.7);
  api.origin("#khung", "970 440");
  api.key("#khung", "rotation", tDap, 0, "none"); api.key("#khung", "rotation", tDap + 0.05, 1.2, "power2.out"); api.key("#khung", "rotation", tDap + 0.12, -0.8, "sine.inOut"); api.key("#khung", "rotation", tDap + 0.2, 0.4, "sine.inOut"); api.key("#khung", "rotation", tDap + 0.3, 0, "sine.out");
  api.key("#khung", "x", tDap, 0, "none"); api.key("#khung", "x", tDap + 0.05, 10, "power2.out"); api.key("#khung", "x", tDap + 0.3, 0, "sine.out");
  api.origin("#meoB-con", "0 0"); api.origin("#meoB-duoi", "0 0"); api.origin("#meoB-dau", "0 0");
  api.key("#meoB-con", "x", 0, -8, "step"); api.key("#meoB-con", "x", tH + 0.5, -8, "none"); api.key("#meoB-con", "x", tDap - 0.1, 2, "sine.inOut"); api.key("#meoB-con", "x", tDap + 0.2, -6, "power2.out");
  api.key("#meoB-dau", "rotation", 0, -6, "step"); api.key("#meoB-dau", "rotation", tH + 0.5, -6, "none"); api.key("#meoB-dau", "rotation", tDap, 4, "sine.inOut");
  api.key("#meoB-dau", "rotation", tDap + 0.6, -2, "sine.inOut");
  // không chớp mắt; chỉ đuôi khẽ ve vẩy một lần
  api.key("#meoB-duoi", "rotation", 0, 0, "step"); api.key("#meoB-duoi", "rotation", tChop - 0.1, 0, "none");
  api.key("#meoB-duoi", "rotation", tChop + 0.15, -22, "sine.inOut"); api.key("#meoB-duoi", "rotation", tChop + 0.45, 0, "sine.inOut");
};
