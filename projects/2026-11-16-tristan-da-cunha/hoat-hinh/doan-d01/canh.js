/* Đoạn d01 (diorama, hiện tại, 5,56 s) – mở video tập 5 Tristan da Cunha. Vào dau-video (khung 0 đã có hình), ra chen (cắt cứng).
 * Khung 0: Wob đứng trên mặt bàn kỷ vật (nửa phải khung), giơ BƯU THIẾP cạnh mặt (mép trong cách mắt ≥ 40 px, thấy rõ mắt Wob),
 * mặt viết quay ra người xem, tem đen trắng (núi lửa + thuyền dài) góc phải trên. Camera đẩy chậm 1,0 → 1,05.
 * "arrived" (1,31): Wob lắc bưu thiếp, vài hạt muối biển và một giọt nước rơi xuống mặt bàn; Wob nhìn giọt nước rồi nhìn thẳng
 * người xem (giữ tới ~2,45). "I posted it…": Wob chỉ bưu thiếp xuống trang sổ, chấm Tristan sáng lên một lần; dãy chấm bút chạy
 * từ trang sổ qua mép, bò ngang mặt bàn (trồng mốc gọi lại, không ai nhắc).
 * BỐ CỤC BÀN TẬP 5 (chung d01 d03 d05 d37 d39 d41 d43 d48 d50): sổ gáy x −120 z −240, trang 480×600 (bản đồ map-tristan dán trang
 * phải), hộp kỷ vật (−900, −640), áo mưa cam treo móc tường (x 300), ba lô nhỏ dựa chân đèn bàn (x −760), Wob (640, −110) s 0,9.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });

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
  var WX = 640, WZ = -110;
  var ban = api.dungBan({ hop: { x: -900, z: -640 }, wob: { x: WX, z: WZ, s: 0.9 }, so: { x: SO.x, z: SO.z, w: SO.w, d: SO.d, lop: [], biaTrong: biaTrong } });
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

  var trang = so.veTrang(trangMap({ them: chamBan(0, 0, CHAM_TRANG, 6) +
    '<g class="tri-sang" opacity="0"><circle cx="' + TRI[0] + '" cy="' + TRI[1] + '" r="22" fill="none" stroke="#fff3a8" stroke-width="7"/><circle cx="' + TRI[0] + '" cy="' + TRI[1] + '" r="12" fill="#fff3a8" opacity=".6"/></g>' }));
  var triSang = trang.svg.querySelector(".tri-sang");

  // bưu thiếp trong tay trái (cạnh mặt, mặt viết ra ngoài)
  var BT = { w: 220, h: 146 };
  w.holdL.insertAdjacentHTML("beforeend", '<g class="bt">' + api.buuThiepSVG({ w: BT.w, h: BT.h }) + "</g>");
  var bt = w.holdL.querySelector(".bt");
  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  // thẻ cầm ở mép phải giữa: tâm thẻ = tay + (−BT.w/2 + 14) theo hướng góc thẻ
  var btPose = function (arm, ang) {
    var h = api.handWorld("L", arm), a = ang * Math.PI / 180, dx = -(BT.w / 2 - 16);
    return api.holdPose("L", arm, h[0] + dx * Math.cos(a), h[1] + dx * Math.sin(a), ang);
  };
  var A0 = goc("L", 20, 160);
  api.armSet(w, "L", A0);
  gsap.set(bt, btPose(A0, -4));
  api.quaySet(w, 0.08);
  api.look(w, 0, -3, 0, 0.01);

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 480, cy: 20, cz: -150, k: 470, rx: -9, ry: 5 });
  api.camTo(R, 0, 2.5, { k: 520 }, "sine.inOut");                                        // đẩy chậm 1,0 → 1,05
  var tPost = tu.posted || 2.77;
  api.camTo(R, 2.5, 0.9, { cx: 250, cy: 50, cz: -190, k: 330, rx: -20, ry: 4 }, "power2.inOut");   // lướt sang thấy trang sổ
  api.camTo(R, 3.4, DUR - 3.4, { k: 360 }, "sine.inOut");

  // ---------------------------------------------------------------- 0.5 "This postcard" – khẽ đưa ra
  var tPc = tu.postcard || 0.75;
  tl.to(bt, Object.assign(btPose(A0, -9), { duration: 0.18, ease: "power2.out" }), tPc - 0.1);
  tl.to(bt, Object.assign(btPose(A0, -4), { duration: 0.25, ease: "sine.inOut" }), tPc + 0.1);
  // ---------------------------------------------------------------- 1.31 "arrived": lắc, muối + giọt nước rơi
  var tArr = tu.arrived || 1.31;
  [0, 1, 2].forEach(function (i) {
    tl.to(bt, Object.assign(btPose(A0 + (i % 2 ? 4 : -4), i % 2 ? 6 : -12), { duration: 0.07, ease: "power1.inOut" }), tArr - 0.12 + i * 0.08);
  });
  tl.to(bt, Object.assign(btPose(A0, -4), { duration: 0.12, ease: "power2.out" }), tArr + 0.12);
  var day = api.wobTheGioi(w, -60, 250);           // đáy bưu thiếp (gần đúng, hệ Wob → thế giới)
  var giot = api.giotNuoc(the, day.x, day.y, w.z + 30);
  gsap.set(giot, { opacity: 0 });
  api.roiGiot(giot, tArr - 0.02, day.y, TY - 34, 0.32);
  var vung = api.vungNuoc(the, day.x + 4, TY - 3, w.z + 40, 46, 22);
  gsap.set(vung, { opacity: 0, scale: 0.2 });
  tl.to(vung, { opacity: 1, scale: 1, duration: 0.18, ease: "power2.out" }, tArr + 0.31);
  var muoi = "";
  [[-30, 0], [-12, 10], [8, -4], [24, 8], [-20, -6], [14, 14]].forEach(function (m) { muoi += '<rect x="' + (40 + m[0]) + '" y="' + (20 + m[1]) + '" width="7" height="7" fill="#fbfbf6" stroke="#1f2326" stroke-width="1.6" transform="rotate(' + (m[0] * 3) + " " + (43 + m[0]) + " " + (23 + m[1]) + ')"/>'; });
  var hat = api.cut(the, 80, 40, muoi, { pos: { x: day.x - 20, y: day.y, z: w.z + 34 }, ax: 40, ay: 20, f: api.F.AM_NHO });
  gsap.set(hat, { opacity: 0 });
  tl.set(hat, { opacity: 1 }, tArr - 0.05);
  tl.fromTo(hat, { y: day.y }, { y: TY - 12, duration: 0.36, ease: "power2.in", immediateRender: false }, tArr - 0.05);
  tl.to(hat, { scaleY: 0.5, duration: 0.08 }, tArr + 0.31);
  api.sfx("drop", tArr + 0.3, 0.45);
  // Wob nhìn giọt nước, rồi nhìn thẳng người xem, giữ
  api.look(w, tArr + 0.28, -10, 16, 0.15);
  api.nghieng(w, tArr + 0.28, -4, 0.25);
  api.look(w, 2.0, 0, 2, 0.12);
  api.nghieng(w, 2.0, 0, 0.2);
  api.lids(w, 2.02, 0.45, 0.12);                  // tỉnh bơ, giữ tới ~2,45
  // ---------------------------------------------------------------- 2.6 "I posted it from an island…": chỉ bưu thiếp xuống trang sổ
  var AP = goc("L", -10, 300);
  api.lids(w, tPost - 0.15, 0.1, 0.15);
  api.quay(w, tPost - 0.15, -0.55, 0.3);
  api.look(w, tPost - 0.1, -16, 10, 0.2);
  api.armTo(w, "L", tPost - 0.15, 0.4, AP, "back.out(1.3)");
  tl.to(bt, Object.assign(btPose(AP, 28), { duration: 0.4, ease: "back.out(1.3)" }), tPost - 0.15);
  var tIsl = tu.island || 3.56;
  tl.fromTo(triSang, { opacity: 0, scale: 0.4, svgOrigin: TRI[0] + " " + TRI[1] }, { opacity: 1, scale: 1.25, duration: 0.25, ease: "power2.out", immediateRender: false }, tIsl - 0.08);
  tl.to(triSang, { opacity: 0, scale: 1.6, svgOrigin: TRI[0] + " " + TRI[1], duration: 0.45, ease: "power1.in" }, tIsl + 0.2);
  tl.to(bt, Object.assign(btPose(AP, 22), { duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut" }), tIsl - 0.1);  // gõ nhẹ về phía chấm
  // "everyone once had to leave." – mắt dõi dãy chấm trên bàn rồi về người xem
  var tLeave = tu.leave || 4.94;
  api.look(w, (tu.everyone || 4.09), -6, 18, 0.25);
  api.quay(w, tLeave - 0.2, -0.1, 0.3);
  api.look(w, tLeave - 0.1, -2, 2, 0.2);
  api.armTo(w, "L", tLeave - 0.1, 0.35, A0 + 10, "power2.inOut");
  tl.to(bt, Object.assign(btPose(A0 + 10, 4), { duration: 0.35, ease: "power2.inOut" }), tLeave - 0.1);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[1.5, 2.5]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 3.0, 0.1);
};
