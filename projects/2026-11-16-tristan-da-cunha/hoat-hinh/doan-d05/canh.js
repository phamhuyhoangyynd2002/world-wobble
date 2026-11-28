/* Đoạn d05 (diorama, hiện tại, 14,91 s) – hết lời hứa ở bàn. Vào cat, ra giay (camera lao vào trang sổ, 0,5 s cuối giấy phẳng).
 * Bố cục bàn chung tập 5 (xem d01). Wob đứng sát mép phải trang bản đồ (390, −150), dây giày đã xỏ lại (d04).
 * 0–3,4 "Nearly all of them still voted for the island with the volcano.": Wob ngẩng lên, giơ bưu thiếp mặt tranh cạnh mặt, mắt
 * mở to; tay kia thả một lá phiếu giấy nhỏ đáp lên hình núi lửa đúng "volcano." (2,46).
 * "I wanted to know why.": bút chì viết tay lên lề dưới trang sổ WHY GO BACK? (chữ trong lời, ≥ 45 px), gạch chân hai lần (ting).
 * "But first, an older question…": gõ đầu bút chì lên chấm Tristan ba cái, nhíu mắt; camera đẩy chậm vào trang.
 * Từ "all?" (8,2) Wob cầm sẵn tàu buồm giấy (tay trái) + mảnh ván giấy (tay phải). Thả tàu 8,68 → nổi 0,6 s → chìm đúng "wrong."
 * (9,34, drop); thả ván 9,68 → nổi → chìm đúng "Twice." (10,05, pop); vòng sóng giấy lan; Wob nhìn chỗ chìm, giữ tới "The answer".
 * "different island": chấm đảo nhỏ phía bắc (St Helena tính bằng cùng phép chiếu, KHÔNG nhãn) nháy sáng MỘT lần (ting), Wob liếc theo;
 * rồi camera lao vào trang sổ. KHÔNG chữ, hình Napoleon trước d16.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // WHY GO BACK?
  var WX = 390, WZ = -150, ONG_BUT;
    // ---------------------------------------------------------------- BÀN TẬP 5 (khối chung)
  var SO = { x: -120, z: -240, w: 480, d: 600 };
  var MAP = { x0: 990, y0: -40, k: 1.65 };               // cắt map-tristan (1920×1080) dán lên trang phải 480×600
  var trangMap = function (o) {
    o = o || {};
    var vw = SO.w * MAP.k, vh = SO.d * MAP.k;
    var s = '<rect x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" fill="#3f6a70"/>' +
      '<svg x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" viewBox="' + (MAP.x0 + 14 * MAP.k) + " " + (MAP.y0 + 14 * MAP.k) + " " + (vw - 28 * MAP.k) + " " + (vh - 28 * MAP.k) +
      '" preserveAspectRatio="none"><image href="ban-do/map-tristan.svg" x="0" y="0" width="1920" height="1080"/></svg>' +
      '<rect x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" fill="none" stroke="' + C.INK + '" stroke-width="5"/>' +
      fp("M 0 30 L 46 0 L 70 22 L 24 54 Z", "#e9dcb4", 2, ' opacity=".85"') + fp("M " + (SO.w - 70) + " 22 L " + (SO.w - 46) + " 0 L " + SO.w + " 30 L " + (SO.w - 24) + " 54 Z", "#e9dcb4", 2, ' opacity=".85"');
    return s + (o.them || "");
  };
  var mapUV = function (px, py) { return [(px - MAP.x0) / MAP.k, (py - MAP.y0) / MAP.k]; };   // điểm bản đồ → toạ độ trang
  var TRI = mapUV(1320, 560);                                                                   // chấm Tristan trên trang
  var biaTrong = sk("M 70 120 q 30 -16 60 0 t 60 0 t 60 0 M 100 180 q 30 -16 60 0 t 60 0", 4, "#4f8fa8") +
    fp("M 150 330 L 250 250 L 350 330 Z", "#a08a66", 4) + fp("M 205 286 C 205 262 240 256 250 270 C 262 252 296 262 290 286 Z", "#fbfbf6", 3) +
    sk("M 80 470 C 160 440 260 500 380 460", 3, C.INK, ' stroke-dasharray="2 10"');
  var ban = api.dungBan({ hop: { x: -900, z: -640 }, wob: { x: WX, z: WZ, s: 0.9 }, ongBut: ONG_BUT, so: { x: SO.x, z: SO.z, w: SO.w, d: SO.d, lop: [], biaTrong: biaTrong } });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  gsap.set(so.cover, { rotationY: -180 });
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";                  // ở nhà: không đeo ba lô
  api.cut(the, 200, 340, api.aoMuaTreoSVG(), { pos: { x: 300, y: -420, z: -1270, scale: 1.5 }, ay: 12, f: api.F.AM });          // áo mưa cam trên móc tường
  api.cut(the, 130, 160, api.baLoNhoSVG(), { pos: { x: -740, y: TY, z: -560, rotationZ: -7 }, f: api.F.AM_NHO });               // ba lô nhỏ dựa chân đèn
  var veTau = api.cut(the, 150, 70, '<g transform="rotate(-14 75 35)">' + api.veTauSVG() + "</g>", { pos: { x: 470, y: TY - 4, z: 40, rotationX: 90 }, ax: 75, ay: 35, f: api.F.AM_NHO });
  // dãy chấm bút: trên trang (trong trangMap) + trên mặt bàn
  var chamBan = function (x0, z0, pts, r) {
    var s = "", n = 0;
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (var d = 0; d < L; d += 26) { var u = d / L; s += '<circle cx="' + (a[0] + (b[0] - a[0]) * u).toFixed(1) + '" cy="' + (a[1] + (b[1] - a[1]) * u).toFixed(1) + '" r="' + (r || 6) + '" fill="#2b3a5c"/>'; n++; }
    }
    return s;
  };
  var CHAM_TRANG = [[TRI[0] + 30, TRI[1] + 60], [TRI[0] + 120, TRI[1] + 110], [SO.w - 10, SO.d - 70]];
  api.cut(the, 1200, 420, chamBan(0, 0, [[0, 0], [260, 70], [560, 150], [900, 230], [1180, 300]]), { pos: { x: SO.x + SO.w + 6, y: TY - 4, z: SO.z - SO.d / 2 + SO.d - 70, rotationX: 90 }, ax: 0, ay: 0 });
  // ---------------------------------------------------------------- hết khối chung

  // ---------------------------------------------------------------- dựng riêng
  var SH = mapUV(1408.4, 273.1);                   // St Helena (không nhãn) trên trang
  var LE = { y: SO.d - 128, h: 114 };               // lề dưới trang (dải giấy phủ đáy bản đồ)
  var ke = "";
  for (var yk = LE.y + 30; yk < LE.y + LE.h; yk += 34) ke += sk("M 24 " + yk + " L " + (SO.w - 24) + " " + yk, 2, "#9fb7c4", ' opacity=".5"');
  var CW = { x: 226, y: LE.y + 74, co: 50 };
  var viet = '<defs><clipPath id="d05-viet"><rect class="viet-clip" x="16" y="' + LE.y + '" width="0" height="' + LE.h + '"/></clipPath></defs>' +
    '<g clip-path="url(#d05-viet)">' + api.txt(CW.x, CW.y, CW.co, 700, chu[0], "#2a3550", ' font-style="italic"') + "</g>" +
    '<path class="gach-1" d="M 66 ' + (CW.y + 12) + ' C 160 ' + (CW.y + 8) + " 260 " + (CW.y + 16) + " 356 " + (CW.y + 10) + '" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" fill="none" stroke="#2a3550" stroke-width="4" stroke-linecap="round"/>' +
    '<path class="gach-2" d="M 72 ' + (CW.y + 24) + ' C 170 ' + (CW.y + 20) + " 262 " + (CW.y + 28) + " 350 " + (CW.y + 22) + '" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" fill="none" stroke="#2a3550" stroke-width="4" stroke-linecap="round"/>';
  var them = chamBan(0, 0, [[TRI[0] + 30, TRI[1] + 60], [TRI[0] + 120, TRI[1] + 100]], 6) +
    '<rect x="6" y="' + LE.y + '" width="' + (SO.w - 12) + '" height="' + LE.h + '" fill="' + C.PAPER + '"/>' + ke + sk("M 14 " + LE.y + " L " + (SO.w - 14) + " " + LE.y, 5) + viet +
    '<circle cx="' + SH[0].toFixed(1) + '" cy="' + SH[1].toFixed(1) + '" r="5" fill="#efd9a2" stroke="' + C.INK + '" stroke-width="2"/>' +
    '<g class="sh-sang" opacity="0"><circle cx="' + SH[0].toFixed(1) + '" cy="' + SH[1].toFixed(1) + '" r="18" fill="none" stroke="#fff3a8" stroke-width="6"/><circle cx="' + SH[0].toFixed(1) + '" cy="' + SH[1].toFixed(1) + '" r="9" fill="#fff3a8"/></g>' +
    '<g class="tri-go" opacity="0"><circle cx="' + TRI[0] + '" cy="' + TRI[1] + '" r="16" fill="none" stroke="#fff3a8" stroke-width="4"/></g>';
  // vòng sóng giấy chỗ chìm
  var TAU = [150, 250], VAN = [270, 225];
  [TAU, VAN].forEach(function (p, i) {
    them += '<g class="song-' + i + '" opacity="0"><ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="26" ry="18" fill="none" stroke="#e8f2f5" stroke-width="4"/><ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="44" ry="30" fill="none" stroke="#e8f2f5" stroke-width="3"/></g>';
  });
  var trang = so.veTrang(trangMap({ them: them }));
  var q = function (c) { return trang.svg.querySelector("." + c); };
  var shSang = q("sh-sang"), triGo = q("tri-go"), vietClip = q("viet-clip"), gach1 = q("gach-1"), gach2 = q("gach-2");
  var diem = function (u, v, cao) { return { x: SO.x + u, y: TY - 3 - (cao || 0), z: SO.z - SO.d / 2 + v }; };

  // bưu thiếp mặt tranh trong tay trái; lá phiếu trên hình núi lửa (ẩn sẵn)
  var BT = { w: 220, h: 146 };
  w.holdL.insertAdjacentHTML("beforeend", '<g class="bt">' + api.buuThiepSVG({ w: BT.w, h: BT.h, mat: "tranh" }) +
    '<g class="phieu-tren" opacity="0"><g transform="translate(-6 -6) rotate(-12) scale(.8)">' + api.laPhieuSVG() + "</g></g></g>");
  var bt = w.holdL.querySelector(".bt"), phieuTren = bt.querySelector(".phieu-tren");
  w.holdR.insertAdjacentHTML("beforeend", '<g class="phieu-tay"><g transform="scale(.9)">' + api.laPhieuSVG() + "</g></g>");
  var phieuTay = w.holdR.querySelector(".phieu-tay");
  gsap.set(phieuTay, api.holdPose("R", 0, 330, 300, 0));
  var btNam = api.cut(the, 240, 170, '<g transform="translate(120 85) rotate(-10)">' + api.buuThiepSVG({ w: BT.w, h: BT.h, mat: "tranh" }) + "</g>", { pos: { x: 560, y: TY - 4, z: 40, rotationX: 90, scale: 0.9 }, ax: 120, ay: 85, f: api.F.AM_NHO });
  gsap.set(btNam, { opacity: 0 });
  // bút chì (tay trái), tàu buồm (tay trái), ván (tay phải)
  w.holdL.insertAdjacentHTML("beforeend", '<g class="but" opacity="0"><g transform="scale(1.15)">' + api.butChiSVG() + '</g></g><g class="tau-tay" opacity="0"><g transform="scale(.8)">' + api.tauBuomSVG() + "</g></g>");
  var but = w.holdL.querySelector(".but"), tauTay = w.holdL.querySelector(".tau-tay");
  w.holdR.insertAdjacentHTML("beforeend", '<g class="van-tay" opacity="0"><g transform="scale(.85)">' + api.vanGiaySVG() + "</g></g>");
  var vanTay = w.holdR.querySelector(".van-tay");
  var tau = api.cut(the, 140, 130, '<g transform="translate(70 124) scale(.8)">' + api.tauBuomSVG() + "</g>", { pos: { x: 0, y: 0, z: 0 }, ax: 70, ay: 124, f: api.F.AM_NHO });
  var van = api.cut(the, 120, 40, '<g transform="translate(60 20) scale(.85)">' + api.vanGiaySVG() + "</g>", { pos: { x: 0, y: 0, z: 0 }, ax: 60, ay: 30, f: api.F.AM_NHO });
  gsap.set([tau, van], { opacity: 0 });

  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  var btPose = function (arm, ang) {
    var h = api.handWorld("L", arm), a = ang * Math.PI / 180, dx = -(BT.w / 2 - 16);
    return api.holdPose("L", arm, h[0] + dx * Math.cos(a), h[1] + dx * Math.sin(a), ang);
  };
  // bút: cầm ở 1/3 thân, ngòi chĩa theo ang
  var butPose = function (arm, ang) {
    var h = api.handWorld("L", arm), a = ang * Math.PI / 180, dx = 40;
    return api.holdPose("L", arm, h[0] + dx * Math.cos(a), h[1] + dx * Math.sin(a), ang);
  };
  var A0 = goc("L", 20, 160);
  api.armSet(w, "L", A0);
  gsap.set(bt, btPose(A0, -4));
  api.quaySet(w, 0);
  api.look(w, 0, 0, -6, 0.01);
  api.lids(w, 0.02, 0, 0.01);

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 290, cy: 10, cz: -150, k: 470, rx: -10, ry: 4 });
  api.camTo(R, 0, 3.3, { k: 510 }, "sine.inOut");
  var tWhy = tu.why || 4.1, tWant = tu.wanted || 3.6;
  api.camTo(R, 3.3, 0.8, { cx: 220, cy: 150, cz: -90, k: 460, rx: -50, ry: 2 }, "power2.inOut");   // lề dưới trang + Wob
  api.camTo(R, 4.1, 0.7, { k: 480 }, "sine.inOut");
  api.camTo(R, 4.8, 0.9, { cx: 170, cy: 150, cz: -230, k: 440, rx: -50, ry: 2 }, "power2.inOut");   // chấm Tristan
  api.camTo(R, 5.7, 2.5, { k: 500 }, "sine.inOut");                                                 // đẩy chậm vào trang
  api.camTo(R, 8.2, 0.6, { cx: 190, cy: 140, cz: -270, k: 470, rx: -46, ry: 2 }, "power2.inOut");
  api.camTo(R, 8.8, 4.7, { k: 520 }, "sine.inOut");
  var shW = diem(SH[0], SH[1]);
  api.camTo(R, 13.62, 0.78, { cx: shW.x, cy: shW.y - 4, cz: shW.z, k: 1060, rx: -80, ry: 0 }, "power3.in");   // [lao-vao-hinh-ve]

  // ---------------------------------------------------------------- 0–3,4 lá phiếu đáp lên hình núi lửa
  api.look(w, 0.15, -6, -10, 0.2, 1.15);                 // mắt mở to (soc)
  var tVol = tu.volcano || 2.46;
  api.armTo(w, "R", tVol - 0.6, 0.3, -120, "power2.out");
  api.armTo(w, "R", tVol - 0.3, 0.15, -175, "power2.in");  // hất lá phiếu qua đầu sang hình
  tl.set(phieuTay, { opacity: 0 }, tVol - 0.2);
  var hR = api.wobTheGioi(w, 300, 60), hT = api.wobTheGioi(w, -40, 150);
  var phieuBay = api.cut(the, 50, 36, '<g transform="translate(25 18)">' + api.laPhieuSVG() + "</g>", { pos: { x: hR.x, y: hR.y, z: w.z + 20 }, ax: 25, ay: 18, f: api.F.AM_NHO });
  gsap.set(phieuBay, { opacity: 0 });
  tl.set(phieuBay, { opacity: 1 }, tVol - 0.2);
  tl.fromTo(phieuBay, { x: hR.x, z: w.z + 20, rotationZ: 0 }, { x: hT.x, z: w.z + 30, rotationZ: -372, duration: 0.24, ease: "power1.inOut", immediateRender: false }, tVol - 0.2);
  tl.fromTo(phieuBay, { y: hR.y }, { y: hT.y - 70, duration: 0.12, ease: "power2.out", immediateRender: false }, tVol - 0.2);
  tl.to(phieuBay, { y: hT.y, duration: 0.12, ease: "power2.in" }, tVol - 0.08);
  tl.set(phieuBay, { opacity: 0 }, tVol + 0.04); tl.set(phieuTren, { opacity: 1 }, tVol + 0.04);
  tl.fromTo(phieuTren, { scale: 1.3, svgOrigin: "-6 -6" }, { scale: 1, svgOrigin: "-6 -6", duration: 0.12, ease: "power2.out", immediateRender: false }, tVol + 0.04);
  api.armTo(w, "R", tVol + 0.05, 0.3, -10, "power2.inOut");
  api.look(w, tVol - 0.1, -14, -6, 0.12, 1.15);
  api.look(w, tVol + 0.35, 0, 0, 0.15, 1.15);
  // đặt bưu thiếp xuống (nằm cạnh, mặt tranh lên), cầm bút
  var AH = goc("L", 60, 310);
  api.quay(w, 3.0, 0.4, 0.25);
  api.armTo(w, "L", 3.0, 0.3, AH, "power2.inOut");
  tl.to(bt, Object.assign(btPose(AH, 20), { duration: 0.3, ease: "power2.inOut" }), 3.0);
  tl.set(bt, { opacity: 0 }, 3.3); tl.set(btNam, { opacity: 1 }, 3.3);
  // ---------------------------------------------------------------- "I wanted to know why.": viết WHY GO BACK? lên lề dưới, gạch chân hai lần
  var AV = goc("L", 20, 320);
  tl.set(but, { opacity: 1 }, 3.35); tl.set(but, butPose(AV, 150), 3.35);
  api.quay(w, 3.35, -0.55, 0.25);
  api.armSet(w, "L", AV, 3.35);
  api.look(w, 3.4, -16, 14, 0.2);
  api.nghieng(w, 3.4, -8, 0.3);
  var tV0 = tWant - 0.05, tV1 = tWhy + 0.35;
  tl.fromTo(vietClip, { attr: { width: 0 } }, { attr: { width: 430 }, duration: tV1 - tV0, ease: "none", immediateRender: false }, tV0);
  for (var i = 0; i < 8; i++) {
    var t = tV0 + i * (tV1 - tV0) / 8;
    api.armTo(w, "L", t, (tV1 - tV0) / 16, AV + (i % 2 ? 6 : -4), "sine.inOut");
  }
  tl.to(gach1, { attr: { "stroke-dashoffset": 0 }, duration: 0.2, ease: "power1.inOut" }, tV1 + 0.02);
  tl.to(gach2, { attr: { "stroke-dashoffset": 0 }, duration: 0.2, ease: "power1.inOut" }, tV1 + 0.26);
  api.armTo(w, "L", tV1 + 0.02, 0.2, AV - 12, "sine.inOut"); api.armTo(w, "L", tV1 + 0.26, 0.2, AV - 6, "sine.inOut");
  api.sfx("ting", tV1 + 0.45, 0.4);
  // ---------------------------------------------------------------- "But first…": gõ bút lên chấm Tristan ba cái, nhíu mắt
  var triW = diem(TRI[0], TRI[1]);
  api.walk(w, 4.85, 5.35, 385, -190, { face: -0.55, endFace: -0.6, step: 0.25, keepL: true });
  var AG = goc("L", 10, 250);
  api.armTo(w, "L", 5.0, 0.35, AG, "power2.inOut");
  tl.to(but, Object.assign(butPose(AG, 172), { duration: 0.35, ease: "power2.inOut" }), 5.0);
  api.nghieng(w, 5.0, -12, 0.3);
  var tWho = tu.who || 6.88;
  [tWho - 0.7, tWho - 0.35, tWho].forEach(function (t) {
    tl.to(but, Object.assign(butPose(AG + 6, 182), { duration: 0.08, ease: "power2.in" }), t - 0.08);
    tl.to(but, Object.assign(butPose(AG, 172), { duration: 0.14, ease: "power2.out" }), t);
    tl.fromTo(triGo, { opacity: 0.9, scale: 0.6, svgOrigin: TRI[0] + " " + TRI[1] }, { opacity: 0, scale: 1.4, svgOrigin: TRI[0] + " " + TRI[1], duration: 0.3, immediateRender: false }, t);
    api.sfx("bonk", t, 0.12);
  });
  api.look(w, 5.2, -16, 16, 0.2);
  api.lids(w, tWho - 0.6, 0.55, 0.2);                    // nhíu mắt (ngam-nghi)
  api.lids(w, 8.0, 0.1, 0.15);
  // ---------------------------------------------------------------- từ "all?" cầm sẵn tàu (trái) + ván (phải)
  var tAll = (function () { var r = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (/^all\?/i.test(x.text) && x.start > 7 && r === null) r = x.start; }); }); return r === null ? 8.2 : r; })();
  api.nghieng(w, tAll - 0.25, 0, 0.25);
  tl.set(but, { opacity: 0 }, tAll - 0.2);
  var AB = goc("L", 30, 250), ABR = goc("R", 360, 250);
  api.armTo(w, "L", tAll - 0.2, 0.25, AB, "back.out(1.6)");
  api.armTo(w, "R", tAll - 0.2, 0.25, ABR, "back.out(1.6)");
  tl.set(tauTay, { opacity: 1 }, tAll - 0.2); tl.set(tauTay, api.holdPose("L", AB, api.handWorld("L", AB)[0], api.handWorld("L", AB)[1] + 20, 0), tAll - 0.2);
  tl.set(vanTay, { opacity: 1 }, tAll - 0.2); tl.set(vanTay, api.holdPose("R", ABR, api.handWorld("R", ABR)[0] + 30, api.handWorld("R", ABR)[1], 10), tAll - 0.2);
  api.look(w, tAll, -14, 10, 0.15);
  // tàu: thả 8,68, nổi bập bềnh, chìm đúng "wrong."
  var tWrong = tu.wrong || 9.34, tTw = tu.twice || 10.05;
  var tauW = diem(TAU[0], TAU[1]), vanW = diem(VAN[0], VAN[1]);
  var tayL = api.wobTheGioi({ x: 385, y: TY, z: -190, s: 0.9 }, api.handWorld("L", AB)[0], api.handWorld("L", AB)[1]);
  var tTha = 8.68;
  api.armTo(w, "L", tTha - 0.2, 0.2, AB - 25, "power2.in");
  tl.set(tauTay, { opacity: 0 }, tTha - 0.18); tl.set(tau, { opacity: 1 }, tTha - 0.18);
  tl.fromTo(tau, { x: tayL.x, y: tayL.y + 30, z: -175, rotationZ: 0 }, { x: tauW.x, z: tauW.z, rotationZ: 0, duration: 0.18, ease: "power1.out", immediateRender: false }, tTha - 0.18);
  tl.to(tau, { y: tauW.y, duration: 0.18, ease: "power2.in" }, tTha - 0.18);
  tl.fromTo(tau, { rotationZ: -6 }, { rotationZ: 6, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, tTha);
  tl.to(tau, { y: tauW.y + 150, rotationZ: 18, duration: 0.24, ease: "power2.in" }, tWrong - 0.2);
  tl.set(tau, { opacity: 0 }, tWrong + 0.05);
  tl.fromTo(q("song-0"), { opacity: 1, scale: 0.4, svgOrigin: TAU.join(" ") }, { opacity: 0, scale: 1.6, svgOrigin: TAU.join(" "), duration: 0.7, ease: "power1.out", immediateRender: false }, tWrong - 0.02);
  api.sfx("drop", tWrong - 0.03, 0.5);
  api.armTo(w, "L", tTha + 0.1, 0.3, 0, "power2.inOut");
  // ván: thả 9,68, nổi một chút, chìm đúng "Twice."
  var tTha2 = 9.68;
  var tayR = api.wobTheGioi({ x: 385, y: TY, z: -190, s: 0.9 }, api.handWorld("R", ABR)[0], api.handWorld("R", ABR)[1]);
  api.armTo(w, "R", tTha2 - 0.25, 0.22, -150, "power2.in");
  tl.set(vanTay, { opacity: 0 }, tTha2 - 0.2); tl.set(van, { opacity: 1 }, tTha2 - 0.2);
  tl.fromTo(van, { x: tayR.x, y: tayR.y - 60, z: -175, rotationZ: 30 }, { x: vanW.x, z: vanW.z, rotationZ: 0, duration: 0.2, ease: "power1.out", immediateRender: false }, tTha2 - 0.2);
  tl.to(van, { y: vanW.y, duration: 0.2, ease: "power2.in" }, tTha2 - 0.2);
  tl.fromTo(van, { rotationZ: -4 }, { rotationZ: 4, duration: 0.1, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, tTha2);
  tl.to(van, { y: vanW.y + 80, duration: 0.16, ease: "power2.in" }, tTw - 0.12);
  tl.set(van, { opacity: 0 }, tTw + 0.05);
  tl.fromTo(q("song-1"), { opacity: 1, scale: 0.4, svgOrigin: VAN.join(" ") }, { opacity: 0, scale: 1.6, svgOrigin: VAN.join(" "), duration: 0.7, ease: "power1.out", immediateRender: false }, tTw - 0.02);
  api.sfx("pop", tTw - 0.03, 0.45);
  api.armTo(w, "R", tTha2 + 0.1, 0.3, 0, "power2.inOut");
  api.look(w, tTha - 0.1, -16, 16, 0.15);
  api.look(w, tTha2 - 0.1, -10, 18, 0.15);
  api.lids(w, tTw + 0.1, 0.5, 0.15);                     // nhìn chỗ chìm, giữ tới "The answer"
  // ---------------------------------------------------------------- "different island": chấm phía bắc nháy MỘT lần, Wob liếc theo
  var tDiff = tu.different || 13.14;
  api.lids(w, (tu.answer || 11.22) - 0.1, 0.15, 0.15);
  api.quay(w, 11.6, -0.2, 0.3); api.look(w, 11.65, -4, 2, 0.2);
  tl.fromTo(shSang, { opacity: 0, scale: 0.4, svgOrigin: SH[0] + " " + SH[1] }, { opacity: 1, scale: 1.2, svgOrigin: SH[0] + " " + SH[1], duration: 0.18, ease: "power2.out", immediateRender: false }, tDiff - 0.06);
  tl.to(shSang, { opacity: 0, scale: 1.6, svgOrigin: SH[0] + " " + SH[1], duration: 0.4, ease: "power1.in" }, tDiff + 0.2);
  api.sfx("ting", tDiff - 0.05, 0.4);
  api.quay(w, tDiff, -0.6, 0.2); api.look(w, tDiff + 0.05, -16, 6, 0.12);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[3.3, 5.0], [8.4, 10.5]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 1.4, 0); api.blink(w, 12.2, 0.15);
};
