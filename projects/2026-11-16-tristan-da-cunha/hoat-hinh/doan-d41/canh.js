/* Đoạn d41 (diorama, hiện tại, 7,69 s) – gag tay biểu quyết. Vào cat, ra cat.
 * Như d39: bàn, đèn thường, hộp phiếu trên trang sổ. Wob đứng trên bàn cạnh sổ, nhắm mắt ngẫm, tay phải đặt lên ngực.
 * "raised" (4,58): giơ tay phải thẳng lên, mở mắt, mặt nghiêm trang tự hào.
 * [leo-thang-ba-lan] Tay trái thò lên nửa chừng rồi rụt về: 5,90 / 6,40 / 6,85 (lần ba không kịp rụt);
 * "pocket." (7,03): tay phải (dài ra kiểu cao su) quật xuống ấn tay trái, tay trái giấu ra sau lưng; boing. Giữ 0,66 s tới cắt.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var WX = 470, WZ = -70, ONG_BUT;
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

  var diem = function (u, v) { return { x: SO.x + u, y: TY - 3, z: SO.z - SO.d / 2 + v }; };
  var HP = diem(240, 250);
  api.cut(the, 160, 130, '<g transform="translate(80 126)">' + api.hopPhieuSVG() + "</g>", { pos: { x: HP.x, y: HP.y, z: HP.z, scale: 0.9 }, ax: 80, ay: 126, f: api.F.AM_NHO });
  // bưu thiếp dựng nghiêng trên bàn, mặt tranh ra (khớp cuối d39: x 650, z 60)
  api.cut(the, 240, 170, '<g transform="translate(120 85) rotate(-2)">' + api.buuThiepSVG({ w: 220, h: 146, mat: "tranh" }) + "</g>", { pos: { x: 650, y: TY, z: 60, rotationX: 8, scale: 0.9 }, ax: 120, ay: 160, f: api.F.AM_NHO });

  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] }, DAI = Math.hypot(14, 96);
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  var NGUC = goc("R", 246, 268), GIO = goc("R", 368, 80), GIO_K = 1.5, THO = goc("L", 34, 168);
  api.armSet(w, "R", NGUC); api.armSet(w, "L", 0);
  api.quaySet(w, 0);
  api.lidsSet(w, 1);                                         // nhắm mắt ngẫm
  gsap.set([w.pupL, w.pupR], { x: 0, y: 2 });

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 430, cy: 70, cz: -60, k: 470, rx: -12, ry: 4 });
  api.camTo(R, 0, 4.5, { k: 520, cy: 60 }, "sine.inOut");
  var tRaised = tu.raised || 4.58;
  api.camTo(R, tRaised - 0.1, 0.4, { k: 560, cy: 40 }, "power2.out");
  api.camTo(R, tRaised + 0.3, DUR - tRaised - 0.3, { k: 590 }, "sine.inOut");

  // ---------------------------------------------------------------- ngẫm (0–4,4)
  api.nghieng(w, 1.0, 3, 0.8, "sine.inOut");
  api.nghieng(w, 2.6, -2, 0.9, "sine.inOut");               // "I like my street." – lắc nhẹ, vẫn nhắm
  api.nghieng(w, 3.8, 0, 0.4);
  // "raised": giơ tay phải, mở mắt, nghiêm trang
  tl.to(w.armR, { rotation: GIO, scaleY: GIO_K, svgOrigin: PIV.R.join(" "), duration: 0.22, ease: "back.out(1.6)" }, tRaised - 0.08);
  api.moMat(w, tRaised - 0.05, 0.18, 0.15);
  tl.to(w.lift, { y: -6, duration: 0.2, ease: "power2.out" }, tRaised);
  tl.to(w.lift, { y: 0, duration: 0.3, ease: "sine.inOut" }, tRaised + 0.25);
  api.look(w, tRaised, 0, -6, 0.2);
  // ---------------------------------------------------------------- tay trái thò lên 3 lần
  var THO_T = [5.90, 6.40, 6.85];
  THO_T.forEach(function (t, i) {
    api.armTo(w, "L", t, 0.1, THO + i * 6, "power2.out");
    if (i < 2) {
      api.look(w, t + 0.06, -12, -2, 0.08);                  // liếc sang tay trái
      api.armTo(w, "L", t + 0.2, 0.13, 0, "power2.in");     // tự rụt về
      api.look(w, t + 0.26, 0, -6, 0.1);
    }
  });
  api.look(w, 6.9, -12, 0, 0.08);
  api.lids(w, 6.9, 0.3, 0.08);
  // "pocket.": tay phải dài ra quật xuống ấn tay trái
  var tPocket = tu.pocket || 7.03;
  var hL = api.handWorld("L", THO + 12);
  var GAN = goc("R", hL[0], hL[1]), keo = Math.hypot(hL[0] - PIV.R[0], hL[1] - PIV.R[1]) / DAI;
  tl.to(w.armR, { rotation: GAN, scaleY: keo, svgOrigin: PIV.R.join(" "), duration: 0.1, ease: "power3.in" }, tPocket - 0.1);
  tl.to(w.armL, { rotation: -26, scaleY: 0.35, svgOrigin: PIV.L.join(" "), duration: 0.1, ease: "power2.in" }, tPocket);   // giấu ra sau lưng
  tl.set(w.armL, { opacity: 0 }, tPocket + 0.1);
  tl.to(w.armR, { rotation: GIO, scaleY: GIO_K, svgOrigin: PIV.R.join(" "), duration: 0.24, ease: "back.out(1.8)" }, tPocket + 0.1);
  api.sfx("boing", tPocket, 0.5);
  tl.to(w.lift, { scaleY: 0.92, scaleX: 1.06, duration: 0.06, ease: "power2.out" }, tPocket);
  tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.3, ease: "elastic.out(1, 0.4)" }, tPocket + 0.06);
  api.look(w, tPocket + 0.12, 0, -4, 0.12);                  // nhìn thẳng, như chưa có gì
  api.lids(w, tPocket + 0.12, 0.15, 0.1);
  api.nghieng(w, tPocket + 0.15, -3, 0.2);

  api.khauHinh(w);
  api.gatDau(w, { bo: [[4.4, DUR]] });
  api.breathe(w, 0, DUR);
};
