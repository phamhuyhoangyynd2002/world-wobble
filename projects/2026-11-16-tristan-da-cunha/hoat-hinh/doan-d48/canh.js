/* Đoạn d48 (diorama, hiện tại, 8,76 s) – Wob đọc lá thư gửi chính mình. Vào cat, ra chen.
 * [lao-vao-can-canh] "It says:" Wob lật bưu thiếp sang mặt viết (lat-giay); camera cận: "Dear me," đọc được (≥ 45 px),
 * các dòng nguệch ngoạc sáng lên khi Wob đọc tới.
 * "Outsiders…": Wob đặt bưu thiếp xuống trang sổ, cây phả hệ nhỏ trên trang, hộp phiếu gỗ đứng cạnh sổ. Wob nhặt chiếc lá TRÒN
 * mang mặt mình, ướm vào hai chỗ trên cây (lá nhọn kín cành), nhìn lá mình rồi nhìn lá nhọn, tự đặt lá nằm cạnh bưu thiếp, vuốt
 * phẳng; giữ 0,6 s.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // Dear me, | TRISTAN DA CUNHA
  var WX = 430, WZ = -70, ONG_BUT;
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

  var diem = function (u, v) { return { x: SO.x + u, y: TY - 10, z: SO.z - SO.d / 2 + v }; };
  // cây phả hệ trong vùng trang u 20–300, v 110–430
  var PH = { u: 20, v: 110, w: 280, d: 320 };
  so.themTo('<g transform="translate(' + PH.u + " " + PH.v + ')">' + api.trangPhaHeSVG(PH.w, PH.d) + "</g>", { ben: "phai" });
  var CHO = api.PHA_HE_CHO.map(function (c) { return diem(PH.u + c[0] * PH.w, PH.v + c[1] * PH.d); });
  // hộp phiếu gỗ đứng cạnh sổ (bàn, sau lưng bên phải Wob)
  api.cut(the, 160, 130, '<g transform="translate(80 126)">' + api.hopPhieuSVG() + "</g>", { pos: { x: 640, y: TY, z: -330, scale: 0.9 }, ax: 80, ay: 126, f: api.F.AM_NHO });

  // bưu thiếp to trong tay trái (mặt tranh hướng ra), lật sang mặt viết ở "says:"
  var BT = { w: 300, h: 200 };
  w.holdL.insertAdjacentHTML("beforeend", '<g class="bt">' + api.buuThiepSVG({ w: BT.w, h: BT.h, mat: "ca", dear: chu[0], coChu: 34, binh: true, le: true }) + "</g>");
  var bt = w.holdL.querySelector(".bt"), btViet = bt.querySelector(".bt-viet"), btTranh = bt.querySelector(".bt-tranh");
  gsap.set(btViet, { opacity: 0 }); gsap.set(btTranh, { opacity: 1 });
  var dong = [].slice.call(bt.querySelectorAll(".bt-sang"));
  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  var btPose = function (arm, ang, sx) {
    var h = api.handWorld("L", arm), a = ang * Math.PI / 180, dx = -(BT.w / 2 - 18);
    return api.holdPose("L", arm, h[0] + dx * Math.cos(a), h[1] + dx * Math.sin(a), ang, sx);
  };
  var A0 = goc("L", 20, 150);
  api.armSet(w, "L", A0);
  gsap.set(bt, btPose(A0, -3));
  api.quaySet(w, -0.3);
  gsap.set([w.pupL, w.pupR], { x: -12, y: 0 });
  // bưu thiếp nằm trên trang (mặt viết lên) sau khi đặt xuống
  var BTN = diem(360, 510);
  var btNam = api.cut(the, 240, 170, '<g transform="translate(120 85) rotate(-4)">' + api.buuThiepSVG({ w: 220, h: 146, dear: chu[0], binh: true, le: true }) + "</g>", { pos: { x: BTN.x, y: BTN.y, z: BTN.z, rotationX: 90, scale: 0.85 }, ax: 120, ay: 85, f: api.F.AM_NHO });
  gsap.set(btNam, { opacity: 0 });
  // lá tròn: nằm trên bàn cạnh chân Wob → cầm tay trái → nằm trên cây (2 chỗ) → nằm cạnh bưu thiếp
  var LA0 = { x: 560, y: TY - 4, z: 30 };
  var laNam = api.cut(the, 90, 110, '<g transform="translate(45 45) scale(1.3)">' + api.laTronSVG() + "</g>", { pos: { x: LA0.x, y: LA0.y, z: LA0.z, rotationX: 90 }, ax: 45, ay: 45, f: api.F.AM_NHO });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="la-tay" opacity="0"><g transform="scale(1.4)">' + api.laTronSVG() + "</g></g>");
  var laTay = w.holdR.querySelector(".la-tay");

  // ---------------------------------------------------------------- camera
  var tSays = tu.says || 0.34, tDear = tu.dear || 1.05, tOut = tu.outsiders || 3.12;
  api.camSet(R, null, { cx: 230, cy: 60, cz: -90, k: 480, rx: -10, ry: 2 });
  api.camTo(R, tSays + 0.15, 0.5, { cx: 160, cy: 40, cz: -70, k: 680, rx: -5, ry: 0 }, "power3.out");   // [lao-vao-can-canh]
  api.camTo(R, tSays + 0.65, 1.9, { k: 700 }, "sine.inOut");
  api.camTo(R, 2.75, 0.75, { cx: 230, cy: 100, cz: -170, k: 440, rx: -40, ry: 0 }, "power2.inOut");    // ra toàn trang sổ
  api.camTo(R, 3.5, DUR - 3.5, { k: 500, cx: 210 }, "sine.inOut");

  // ---------------------------------------------------------------- lật bưu thiếp, đọc
  api.armTo(w, "L", tSays - 0.1, 0.2, A0 - 6, "power2.out");
  tl.to(bt, Object.assign(btPose(A0 - 6, -3, 0.02), { duration: 0.15, ease: "power2.in" }), tSays - 0.05);
  tl.set(btTranh, { opacity: 0 }, tSays + 0.1); tl.set(btViet, { opacity: 1 }, tSays + 0.1);
  tl.to(bt, Object.assign(btPose(A0, -3, 1), { duration: 0.2, ease: "back.out(1.6)" }), tSays + 0.1);
  api.armTo(w, "L", tSays + 0.1, 0.2, A0, "power2.out");
  api.sfx("lat-giay", tSays - 0.05, 0.45);
  api.look(w, tSays + 0.2, -14, 2, 0.15);
  var sang = [tDear, tu.you || 1.8, tu.move || 2.24, tOut, (tu.land || 4.24) + 0.4, tu.family || 6.11];
  sang.forEach(function (t, i) { if (dong[i]) { tl.to(dong[i], { opacity: 0.85, duration: 0.15, ease: "power1.out" }, t - 0.05); tl.to(dong[i], { opacity: 0.35, duration: 0.4 }, t + 0.7); } });
  api.nghieng(w, tu.here || 2.48, -3, 0.3);
  // đặt bưu thiếp xuống trang
  var AX = goc("L", 6, 300);
  api.armTo(w, "L", 2.75, 0.35, AX, "power2.inOut");
  tl.to(bt, Object.assign(btPose(AX, 10, 1), { duration: 0.35, ease: "power2.inOut" }), 2.75);
  tl.set(bt, { opacity: 0 }, 3.12); tl.set(btNam, { opacity: 1 }, 3.12);
  tl.fromTo(btNam, { y: BTN.y - 30 }, { y: BTN.y, duration: 0.18, ease: "power2.in", immediateRender: false }, 3.12);
  api.armTo(w, "L", 3.3, 0.3, 0, "power2.inOut");
  api.quay(w, 2.9, -0.4, 0.3);
  api.look(w, 3.0, -12, 14, 0.2);
  // ---------------------------------------------------------------- lá tròn
  var tBuy = tu.buy || 4.1;
  api.quay(w, 3.35, 0.3, 0.25); api.look(w, 3.4, 12, 14, 0.15);
  var AR0 = goc("R", 360, 330);
  api.armTo(w, "R", 3.45, 0.25, AR0, "power2.out");
  tl.set(laNam, { opacity: 0 }, 3.7); tl.set(laTay, { opacity: 1 }, 3.7);
  var AR1 = goc("R", 300, 150);
  api.armTo(w, "R", 3.7, 0.3, AR1, "power2.inOut");                          // nâng lên ngang mặt, nhìn lá mình
  tl.set(laTay, api.holdPose("R", AR0, api.handWorld("R", AR0)[0], api.handWorld("R", AR0)[1] - 10, 0), 3.69);
  tl.to(laTay, Object.assign(api.holdPose("R", AR1, api.handWorld("R", AR1)[0], api.handWorld("R", AR1)[1] - 10, 0), { duration: 0.3 }), 3.7);
  api.quay(w, 3.75, 0.05, 0.2); api.look(w, 3.8, 10, -4, 0.15);
  // ướm chỗ 1 ("land,") rồi chỗ 2 ("settle")
  var laCay = api.cut(the, 90, 110, '<g transform="translate(45 45) scale(1.3)">' + api.laTronSVG() + "</g>", { pos: { x: CHO[0].x, y: TY - 11, z: CHO[0].z, rotationX: 90 }, ax: 45, ay: 45, f: api.F.AM_NHO });
  gsap.set(laCay, { opacity: 0 });
  var tWalk = tBuy - 0.1;
  api.walk(w, tWalk, tWalk + 0.5, 300, -150, { step: 0.25 });
  api.quay(w, tWalk, -0.45, 0.25);
  var duoi = function (p) { var dx = (p.x - 300) / 0.9, dz = (p.z + 150) / 0.9; return [200 + dx, 400 + dz * 0.55 - 30]; };   // điểm trang → hệ Wob (gần đúng theo góc máy)
  var cham = function (p, t, d) {
    var q = duoi(p), a = goc("L", q[0], q[1]), keo = Math.hypot(q[0] - PIV.L[0], q[1] - PIV.L[1]) / 97;
    tl.to(w.armL, { rotation: a, scaleY: Math.max(1, keo), svgOrigin: PIV.L.join(" "), duration: d, ease: "power2.inOut" }, t);
  };
  tl.set(laTay, { opacity: 0 }, tWalk + 0.5);
  api.armTo(w, "R", tWalk + 0.5, 0.3, 0, "power2.inOut");
  var tLand = (tu.land || 4.24) + 0.45;
  tl.set(laCay, { opacity: 1 }, tLand - 0.2);
  tl.fromTo(laCay, { y: TY - 45 }, { y: TY - 11, duration: 0.2, ease: "power2.in", immediateRender: false }, tLand - 0.2);
  cham(CHO[0], tLand - 0.3, 0.3);
  api.look(w, tLand, -14, 14, 0.15);
  var tSet = tu.settle || 5.41;
  tl.to(laCay, { x: CHO[1].x, z: CHO[1].z, duration: 0.35, ease: "power2.inOut" }, tSet - 0.2);
  cham(CHO[1], tSet - 0.2, 0.35);
  // nhìn lá mình rồi nhìn hàng lá nhọn
  api.look(w, (tu.family || 6.11) - 0.1, -6, 16, 0.15);
  api.look(w, (tu.family || 6.11) + 0.35, -16, 6, 0.15);
  api.lids(w, 6.2, 0.4, 0.3);
  // tự đặt lá cạnh bưu thiếp, vuốt phẳng
  var tIs = tu.island || 6.76;
  var LA1 = diem(230, 530);
  tl.to(laCay, { x: LA1.x, z: LA1.z, duration: 0.45, ease: "power2.inOut" }, tIs - 0.1);
  cham(LA1, tIs - 0.1, 0.45);
  api.look(w, tIs, -10, 16, 0.2);
  [0, 1].forEach(function (i) {
    var t = tIs + 0.5 + i * 0.32, q = duoi(LA1);
    tl.to(w.armL, { rotation: goc("L", q[0] + 10, q[1]), duration: 0.15, ease: "sine.inOut", svgOrigin: PIV.L.join(" ") }, t);
    tl.to(w.armL, { rotation: goc("L", q[0] - 10, q[1]), duration: 0.15, ease: "sine.inOut", svgOrigin: PIV.L.join(" ") }, t + 0.16);
  });
  tl.to(w.armL, { rotation: 0, scaleY: 1, svgOrigin: PIV.L.join(" "), duration: 0.35, ease: "power2.inOut" }, tIs + 1.2);
  api.lids(w, tIs + 1.2, 0.3, 0.2);
  api.look(w, tIs + 1.3, -2, 6, 0.3);

  api.khauHinh(w);
  api.gatDau(w, { bo: [[3.6, DUR]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 2.6, 0.1);
};
