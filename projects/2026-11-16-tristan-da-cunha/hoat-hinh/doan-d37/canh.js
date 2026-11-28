/* Đoạn d37 (diorama, hiện tại, 4,39 s) – cắt cứng về bàn giữa chương 1961. Vào cat, ra cat. TÔNG TRẦM: đèn bàn thấp hơn mọi lần,
 * KHÔNG gag, KHÔNG sfx. Sổ đóng. Wob mặc đồ ở nhà, mặt trầm (miệng thẳng: khẩu hình đổi X→N, D→C), không cười.
 * Wob ngồi ở mép sổ, cầm bưu thiếp mặt tranh trong lòng; "face down" úp bưu thiếp xuống bàn (mặt viết lên), hai tay đặt lên lưng
 * bưu thiếp. Camera đẩy rất chậm.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var WX = 250, WZ = 80, ONG_BUT;
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

  gsap.set(so.cover, { rotationY: 0 });                      // sổ đóng
  ban.diuDen(null, 0, 0.55);                                 // đèn thấp hơn mọi lần
  // ngồi ở mép sổ: chân co (scaleY quanh hông), thân hạ xuống
  var NGOI = (380 - 290) * 0.5 * 0.9;
  gsap.set([w.legL, w.legR], { scaleY: 0.5 });
  gsap.set(w.legL, { svgOrigin: "174 290", scaleY: 0.5 }); gsap.set(w.legR, { svgOrigin: "226 290", scaleY: 0.5 });
  gsap.set(w.lift, { y: NGOI });
  // bưu thiếp trong lòng (mặt tranh), rồi nằm úp trên bàn (mặt viết lên)
  var BT = { w: 220, h: 146 };
  w.holdL.insertAdjacentHTML("beforeend", '<g class="bt">' + api.buuThiepSVG({ w: BT.w, h: BT.h, mat: "tranh" }) + "</g>");
  var bt = w.holdL.querySelector(".bt");
  var A0 = -38;
  api.armSet(w, "L", A0); api.armSet(w, "R", 38);
  var hL = api.handWorld("L", A0);
  gsap.set(bt, api.holdPose("L", A0, hL[0] + 70, hL[1] - 10, -4));
  var btNam = api.cut(the, 240, 170, '<g transform="translate(120 85) rotate(3)">' + api.buuThiepSVG({ w: BT.w, h: BT.h }) + "</g>", { pos: { x: WX, y: TY - 4, z: WZ + 70, rotationX: 90, scale: 0.9 }, ax: 120, ay: 85, f: api.F.AM_NHO });
  gsap.set(btNam, { opacity: 0 });
  api.quaySet(w, 0);
  api.lidsSet(w, 0.4);
  gsap.set([w.pupL, w.pupR], { x: 0, y: 12 });

  // camera: đẩy rất chậm
  api.camSet(R, null, { cx: 240, cy: 90, cz: 60, k: 430, rx: -18, ry: 3 });
  api.camTo(R, 0, DUR, { k: 470, cy: 96 }, "sine.inOut");

  // "Back home," – ngẩng lên một chút; "face down" – lật úp xuống bàn; hai tay đặt lên lưng
  var tBack = tu.back || 1.1, tFace = tu.face || 2.94, tDown = tu.down || 3.3;
  api.look(w, tBack, 0, 4, 0.3);
  api.lids(w, tBack, 0.3, 0.3);
  tl.to(bt, Object.assign(api.holdPose("L", A0, hL[0] + 70, hL[1] - 10, -4, 0.02), { duration: 0.22, ease: "power2.in" }), tFace - 0.1);
  tl.set(bt, { opacity: 0 }, tFace + 0.12);
  tl.set(btNam, { opacity: 1 }, tFace + 0.12);
  tl.fromTo(btNam, { y: TY - 40, rotationX: 70 }, { y: TY - 4, rotationX: 90, duration: 0.25, ease: "power2.in", immediateRender: false }, tFace + 0.12);
  api.armTo(w, "L", tFace + 0.1, 0.35, -18, "sine.inOut");
  api.armTo(w, "R", tFace + 0.1, 0.35, 18, "sine.inOut");
  api.look(w, tFace + 0.1, 0, 16, 0.35);
  api.lids(w, tDown, 0.45, 0.3);
  api.nghieng(w, tDown, 2, 0.6, "sine.inOut");

  // khẩu hình nghiêm: X → N, D → C (X và D trông như cười)
  var DOI = { X: "N", D: "C" }, cuoi = 0;
  api.mouthSet(w, "N");
  data.loi.forEach(function (L) {
    (L.khau_hinh || []).forEach(function (c) {
      if (c.end <= 0 || c.start >= DUR) return;
      var v = DOI[c.value] || c.value;
      if (c.start <= 0) api.mouthSet(w, v); else api.mouth(w, c.start, v);
      cuoi = Math.max(cuoi, c.end);
    });
  });
  if (cuoi < DUR) api.mouth(w, cuoi, "N");
  api.breathe(w, 0, DUR);
  api.blink(w, 1.8, 0.3, true);
};
