/* Đoạn d03 (diorama, hiện tại, 21,56 s) – lời "I got home first", lời chào, thẻ hộ chiếu, Guinness + sợi chỉ, ~220 islanders.
 * Vào cat, ra chen. Bố cục bàn chung tập 5 (xem d01).
 * 0–1,6: Wob đặt bưu thiếp xuống cạnh vé tàu đã xé, gõ vé hai cái (bonk), mặt tự mãn, giữ 0,6 s.
 * 1,6–5,3 lời chào: quay ra người xem, vẫy tay; camera đẩy chậm. ~6,2 nhặt bưu thiếp; "The island is" lật sang MẶT TRANH (lat-giay).
 * Thẻ hộ chiếu HC_LON góc trái trên x 96–900, y 54–540: lật vào 7,825 (17,40 s), phẳng 7,925–10,925, lật đi xong 11,145 (< "Guinness"
 * 11,185). Camera ĐỨNG YÊN 7,7–11,22. Wob ở nửa phải, mặt và bưu thiếp không bị thẻ che.
 * 11,225 (20,80 s) camera hạ xuống sổ: Wob đã đi ra mép bắc trang, cuộn chỉ buộc sẵn vào chấm Tristan, kéo lùi về phía bắc; chỉ hết
 * (14,3) → tháo dây giày đỏ nối vào, nhảy lò cò lùi tiếp (boing), đứng một chân (giữ ≥ 0,6 s trước "As of" 17,06) tới hết đoạn.
 * "As of" [lao-vao-can-canh]: Wob cắm tấm biển tăm vào chân núi trên mặt tranh bưu thiếp dựng cạnh mép sổ (pop); camera lao cận,
 * thẻ "~220 islanders" / "Nov 2026" ≥ 45 px. KHÔNG chữ, hình Napoleon / St Helena.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // TRISTAN DA CUNHA, SOUTH ATLANTIC, Would Wob move here?, ~220 islanders · Nov 2026
  var WX = 640, WZ = -110, ONG_BUT;
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
  var DI = { x: -5, z: -600 };                    // chỗ Wob đứng kéo chỉ (sau mép bắc trang)
  var HAND_DX = (328 - 200) * 0.9, HAND_H = (392 - 308) * 0.9; // tay phải buông: lệch x, cao trên mặt bàn
  var TX = DI.x + HAND_DX;                         // sợi chỉ chạy dọc x này trên bàn
  var uChi = TX - SO.x;                            // … tức u trên trang
  var chiTrang = '<g class="chi-trang" opacity="0">' + sk("M " + TRI[0].toFixed(1) + " " + TRI[1].toFixed(1) + " C " + (TRI[0] + 10) + " " + (TRI[1] - 120) + " " + (uChi - 14) + " 150 " + uChi + " 0", 4, "#2F4A6B") +
    '<circle cx="' + TRI[0] + '" cy="' + TRI[1] + '" r="9" fill="none" stroke="#2F4A6B" stroke-width="4"/></g>';
  var trang = so.veTrang(trangMap({ them: chamBan(0, 0, CHAM_TRANG, 6) + chiTrang }));
  var chiTr = trang.svg.querySelector(".chi-trang");
  // sợi chỉ trên bàn (từ mép bắc trang lùi về −z) + đoạn dây giày đỏ nối tiếp; dài ra bằng scaleY quanh mép gần
  var MEP = SO.z - SO.d / 2;                       // z mép bắc trang
  var chiBan = api.cut(the, 10, 400, sk("M 5 0 L 5 400", 4, "#2F4A6B"), { pos: { x: TX, y: TY - 3, z: MEP, rotationX: 90 }, ax: 5, ay: 400 });
  gsap.set(chiBan, { scaleY: 0.001, opacity: 0 });
  var Z1 = -700, Z2 = -800;                       // Wob lùi tới Z1 (hết chỉ), lò cò tới Z2
  var dayDo = api.cut(the, 10, 400, sk("M 5 0 L 5 400", 4, "#d9543c"), { pos: { x: TX, y: TY - 3, z: Z1 + 2, rotationX: 90 }, ax: 5, ay: 400 });
  gsap.set(dayDo, { scaleY: 0.001, opacity: 0 });
  // đoạn chỉ đứng từ mặt bàn lên tay (đi theo Wob)
  var chiDung = api.cut(w.pos, 8, 90, sk("M 4 90 L 4 4", 3.5, "#2F4A6B"), { pos: { x: HAND_DX, y: 0, z: 3 }, ax: 4, ay: 90 });
  var dayDung = api.cut(w.pos, 8, 90, sk("M 4 90 L 4 4", 3.5, "#d9543c"), { pos: { x: HAND_DX, y: 0, z: 3 }, ax: 4, ay: 90 });
  gsap.set([chiDung, dayDung], { opacity: 0, scaleY: HAND_H / 86 });
  // cuộn chỉ trong tay phải
  w.holdR.insertAdjacentHTML("beforeend", '<g class="cc" opacity="0"><g class="cc-day">' + api.cuonChiSVG() + '</g><g class="cc-het" opacity="0">' + api.cuonChiSVG({ het: true }) + "</g></g>");
  var cc = w.holdR.querySelector(".cc"), ccDay = cc.querySelector(".cc-day"), ccHet = cc.querySelector(".cc-het");
  gsap.set(cc, api.holdPose("R", 0, 330, 300, 0));
  // bưu thiếp: trong tay (hai mặt), nằm trên bàn (mặt viết), dựng cạnh mép sổ (mặt tranh)
  var BT = { w: 220, h: 146 };
  w.holdL.insertAdjacentHTML("beforeend", '<g class="bt">' + api.buuThiepSVG({ w: BT.w, h: BT.h, mat: "ca" }) + "</g>");
  var bt = w.holdL.querySelector(".bt"), btViet = bt.querySelector(".bt-viet"), btTranh = bt.querySelector(".bt-tranh");
  var btNam = api.cut(the, 240, 170, '<g transform="translate(120 85) rotate(8)">' + api.buuThiepSVG({ w: BT.w, h: BT.h }) + "</g>", { pos: { x: 575, y: TY - 4, z: 70, rotationX: 90, scale: 0.9 }, ax: 120, ay: 85, f: api.F.AM_NHO });
  gsap.set(btNam, { opacity: 0 });
  var BD = { x: 230, z: -700 };                    // bưu thiếp dựng mặt tranh, Wob cắm biển vào chân núi
  var btDung = api.cut(the, 240, 170, '<g transform="translate(120 85)">' + api.buuThiepSVG({ w: BT.w, h: BT.h, mat: "tranh" }) + "</g>", { pos: { x: BD.x, y: TY, z: BD.z, rotationX: 8, scale: 0.9 }, ax: 120, ay: 162, f: api.F.AM_NHO });
  gsap.set(btDung, { opacity: 0 });
  // biển tăm
  var bien = api.cut(the, 220, 250, '<g transform="translate(14 246)">' + api.bienTamSVG({ w: 196, h: 70, chu: chu[3], dong: ["~220 islanders", "Nov 2026"], co: 24 }) + "</g>", { pos: { x: 0, y: 0, z: 0, scale: 1 }, ax: 14, ay: 246, f: api.F.AM_NHO });
  gsap.set(bien, { opacity: 0 });

  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  var btPose = function (arm, ang, sx) {
    var h = api.handWorld("L", arm), a = ang * Math.PI / 180, dx = -(BT.w / 2 - 16);
    return api.holdPose("L", arm, h[0] + dx * Math.cos(a), h[1] + dx * Math.sin(a), ang, sx);
  };
  var A0 = goc("L", 20, 160), AH = goc("L", 30, 300);
  api.armSet(w, "L", A0);
  gsap.set(bt, btPose(A0, -4));
  api.quaySet(w, -0.3);
  api.look(w, 0, -10, 10, 0.01);

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 470, cy: 30, cz: -120, k: 440, rx: -12, ry: 4 });
  api.camTo(R, 0, 1.6, { k: 470 }, "sine.inOut");
  api.camTo(R, 1.6, 4.0, { cx: 440, cy: 10, k: 540 }, "sine.inOut");        // [day-vao-cham] lời chào
  api.camTo(R, 5.6, 1.0, { cx: 345, cy: 0, cz: -130, k: 500, rx: -9, ry: 4 }, "power2.inOut");   // Wob nửa phải cho thẻ hộ chiếu
  api.camTo(R, 6.6, 1.1, { k: 512 }, "sine.inOut");
  // 7,7–11,22: camera đứng yên (thẻ hộ chiếu)
  var tG = 11.225;
  api.camTo(R, tG, 1.1, { cx: 90, cy: 130, cz: -440, k: 390, rx: -46, ry: 0 }, "power2.inOut");   // [trang-so-ban-do]
  api.camTo(R, tG + 1.1, 4.6, { cx: 75, cz: -490, k: 430 }, "sine.inOut");
  // "As of": lao cận bưu thiếp + biển
  var tAs = (function () { var r = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (/^as$/i.test(x.text) && x.start > 16 && r === null) r = x.start; }); }); return r === null ? 17.06 : r; })();
  api.camTo(R, tAs - 0.1, 0.55, { cx: BD.x + 20, cy: TY - 130, cz: BD.z + 10, k: 720, rx: -12, ry: -4 }, "power3.out");
  api.camTo(R, tAs + 0.45, DUR - tAs - 0.45, { k: 770 }, "sine.inOut");

  // ---------------------------------------------------------------- 0–1,6 "I got home first.": đặt bưu thiếp, gõ vé, tự mãn
  api.armTo(w, "L", 0.1, 0.35, AH, "power2.inOut");
  tl.to(bt, Object.assign(btPose(AH, 6), { duration: 0.35, ease: "power2.inOut" }), 0.1);
  tl.set(bt, { opacity: 0 }, 0.45); tl.set(btNam, { opacity: 1 }, 0.45);
  api.sfx("lat-giay", 0.45, 0.25);
  var tHome = tu.home || 0.5, tFirst = tu.first || 0.76;
  var AT = goc("L", 20, 330);
  [tHome, tFirst + 0.12].forEach(function (t) {
    api.armTo(w, "L", t - 0.1, 0.1, AT, "power2.in");
    api.armTo(w, "L", t, 0.12, AT - 18, "power2.out");
    tl.fromTo(veTau, { y: TY - 4 }, { y: TY - 9, duration: 0.06, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, t);
    api.sfx("bonk", t, 0.28);
  });
  api.armTo(w, "L", tFirst + 0.35, 0.3, 30, "power2.inOut");
  api.quay(w, tFirst + 0.1, 0.05, 0.25);
  api.look(w, tFirst + 0.15, 0, 0, 0.15);
  api.lids(w, tFirst + 0.15, 0.42, 0.15);                         // tự mãn, giữ 0,6 s
  api.nghieng(w, tFirst + 0.15, 4, 0.25); api.nghieng(w, 1.45, 0, 0.25);
  // ---------------------------------------------------------------- 1,6–5,3 "Hi, I'm Wob…": vẫy tay
  var tHi = tu.hi || 1.61;
  api.lids(w, tHi - 0.1, 0, 0.12);
  api.armTo(w, "R", tHi - 0.05, 0.3, -150, "back.out(1.8)");
  [0, 1, 2, 3].forEach(function (i) { api.armTo(w, "R", tHi + 0.3 + i * 0.2, 0.2, i % 2 ? -150 : -126, "sine.inOut"); });
  api.armTo(w, "R", tHi + 1.15, 0.35, -8, "power2.inOut");
  api.hop(w, (tu.wob || 2.49) - 0.05, 8, 0.22);
  var tVis = tu.visit || 3.35, tAsk = tu.ask || 4.42;
  api.armTo(w, "R", tVis - 0.1, 0.25, -64, "power2.out"); api.armTo(w, "L", tVis - 0.1, 0.25, 58, "power2.out");
  api.look(w, (tu.odd || 3.64), 6, -4, 0.15);
  api.armTo(w, "R", tAsk - 0.1, 0.3, -36, "power2.inOut"); api.armTo(w, "L", tAsk - 0.1, 0.3, 36, "power2.inOut");
  api.look(w, tAsk + 0.3, 0, 2, 0.15);
  api.armTo(w, "R", 5.5, 0.3, 0, "power2.inOut");
  // ~6,0 nhặt bưu thiếp lại
  api.quay(w, 5.75, -0.3, 0.25); api.look(w, 5.8, -10, 12, 0.15);
  api.armTo(w, "L", 5.85, 0.3, AH, "power2.inOut");
  tl.set(btNam, { opacity: 0 }, 6.15); tl.set(bt, { opacity: 1 }, 6.15);
  tl.set(bt, btPose(AH, 6), 6.15);
  api.armTo(w, "L", 6.2, 0.4, A0, "power2.inOut");
  tl.to(bt, Object.assign(btPose(A0, -4), { duration: 0.4, ease: "power2.inOut" }), 6.2);
  api.quay(w, 6.5, 0.05, 0.25); api.look(w, 6.55, 0, 2, 0.15);
  // "The island is Tristan da Cunha,": lật sang mặt tranh
  var tFlip = (tu.the || 7.24);
  tl.to(bt, Object.assign(btPose(A0, -4, 0.02), { duration: 0.14, ease: "power2.in" }), tFlip);
  tl.set(btViet, { opacity: 0 }, tFlip + 0.14); tl.set(btTranh, { opacity: 1 }, tFlip + 0.14);
  tl.to(bt, Object.assign(btPose(A0, -4, 1), { duration: 0.16, ease: "power2.out" }), tFlip + 0.14);
  api.sfx("lat-giay", tFlip, 0.45);
  api.look(w, tFlip + 0.3, -8, -2, 0.15);
  // ---------------------------------------------------------------- thẻ hộ chiếu
  var hc = api.theHoChieu({ noi: chu[0], noiDong: ["TRISTAN", "DA CUNHA"], nuoc: chu[1], hoi: chu[2], x: 96, y: 54, bo: api.HC_LON });
  hc.vao(7.825, 0.1);
  api.sfx("lat-giay", 7.8, 0.6);
  hc.ra(10.925, 0.22);
  api.sfx("lat-giay", 10.925, 0.45);
  api.look(w, 8.4, 0, 2, 0.15);
  api.look(w, (tu.south || 9.99) - 0.1, -10, -6, 0.2);           // liếc về phía thẻ
  api.look(w, 10.6, 0, 2, 0.2);
  // hạ bưu thiếp, rời đi (bưu thiếp được dựng sẵn cạnh mép sổ khi camera tới)
  api.armTo(w, "L", 10.95, 0.25, 10, "power2.inOut");
  tl.to(bt, Object.assign(btPose(10, 80), { duration: 0.25, ease: "power2.inOut" }), 10.95);
  tl.set(bt, { opacity: 0 }, 11.4); tl.set(btDung, { opacity: 1 }, 11.4);
  api.walk(w, 11.25, 12.3, DI.x, DI.z, { face: -0.5, endFace: 0.1, step: 0.24 });
  // ---------------------------------------------------------------- 12,3– sợi chỉ buộc sẵn, Wob kéo lùi về bắc
  var tTo = 12.3;
  tl.set([chiTr, cc, chiDung, chiBan], { opacity: 1 }, tTo);
  tl.set(chiBan, { scaleY: (MEP - DI.z) / 400 }, tTo);
  api.armSet(w, "R", 0, tTo);
  var tLui = 12.55, tHet = 14.25;
  api.walk(w, tLui, tHet, DI.x, Z1, { step: 0.36, swing: 12, noArms: true, ease: "sine.inOut" });
  tl.fromTo(chiBan, { scaleY: (MEP - DI.z) / 400 }, { scaleY: (MEP - Z1) / 400, duration: tHet - tLui, ease: "sine.inOut", immediateRender: false }, tLui);
  api.nghieng(w, tLui, 6, 0.3);                                   // ngả người kéo
  api.look(w, tLui, -2, 14, 0.2);
  [12.9, 13.6].forEach(function (t) { api.armTo(w, "R", t, 0.18, 12, "power2.out"); api.armTo(w, "R", t + 0.2, 0.25, 0, "sine.inOut"); });
  // hết chỉ
  tl.set(ccDay, { opacity: 0 }, tHet); tl.set(ccHet, { opacity: 1 }, tHet);
  api.armTo(w, "R", tHet, 0.25, -40, "power2.out");
  tl.to(cc, Object.assign(api.holdPose("R", -40, 300, 250, 20), { duration: 0.25 }), tHet);
  api.nghieng(w, tHet, 0, 0.2);
  api.look(w, tHet + 0.05, 10, 4, 0.12, 1.15);
  api.lids(w, tHet + 0.3, 0.5, 0.15);
  // tháo dây giày đỏ (chân phải co lên), nối vào
  var tGiay = 14.85;
  api.nghieng(w, tGiay, 14, 0.25);
  api.look(w, tGiay, 6, 16, 0.15);
  api.lids(w, tGiay, 0.1, 0.12);
  tl.to(w.legR, { rotation: -38, svgOrigin: "226 290", duration: 0.2, ease: "power2.out" }, tGiay + 0.1);
  api.armTo(w, "R", tGiay + 0.1, 0.25, 16, "power2.inOut");
  tl.to(cc, Object.assign(api.holdPose("R", 16, 316, 312, 0), { duration: 0.25 }), tGiay + 0.1);
  tl.set(cc, { opacity: 0 }, tGiay + 0.55);
  tl.set(chiDung, { opacity: 0 }, tGiay + 0.55); tl.set(dayDung, { opacity: 1 }, tGiay + 0.55);
  tl.set(dayDo, { opacity: 1, scaleY: 0.01 }, tGiay + 0.55);
  api.nghieng(w, tGiay + 0.6, 0, 0.2);
  api.armTo(w, "R", tGiay + 0.6, 0.2, 0, "power2.out");
  // lò cò lùi tiếp (một chân)
  var tLo = 15.65, tLo2 = 16.35;
  tl.fromTo(w.pos, { z: Z1 }, { z: Z2, duration: tLo2 - tLo, ease: "power1.inOut", immediateRender: false }, tLo);
  [0, 1, 2].forEach(function (i) { api.hop(w, tLo + i * 0.23, 16, 0.18); });
  tl.fromTo(dayDo, { scaleY: 0.01 }, { scaleY: (Z1 - Z2) / 400, duration: tLo2 - tLo, ease: "power1.inOut", immediateRender: false }, tLo);
  api.sfx("boing", tLo, 0.45);
  api.look(w, tLo2, -4, 12, 0.2);                                 // đầu dây vẫn chưa chạm chấm nào
  api.lids(w, tLo2 + 0.15, 0.45, 0.2);
  tl.fromTo(w.upper, { rotation: -3 }, { rotation: 3, svgOrigin: "200 300", duration: 0.35, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, tLo2 + 0.1);   // giữ thăng bằng
  // ---------------------------------------------------------------- "As of…": cắm biển tăm vào chân núi trên mặt tranh
  var dB = { x: BD.x - 34, y: TY - 46, z: BD.z + 16 };
  api.quay(w, tAs - 0.3, 0.6, 0.25);
  api.armTo(w, "L", tAs - 0.3, 0.25, -60, "power2.out");
  var tayL = api.wobTheGioi({ x: DI.x, y: TY, z: Z2, s: 0.9 }, 330, 170);
  tl.set(bien, { opacity: 1 }, tAs - 0.15);
  tl.fromTo(bien, { x: tayL.x + 40, y: dB.y - 70, z: Z2 + 30, rotationZ: -20 }, { x: dB.x, z: dB.z, rotationZ: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, tAs - 0.15);
  tl.fromTo(bien, { y: dB.y - 70 }, { y: dB.y, duration: 0.3, ease: "power3.in", immediateRender: false }, tAs - 0.15);
  tl.to(bien, { scaleY: 0.74, duration: 0.05, yoyo: true, repeat: 1 }, tAs + 0.15);
  api.sfx("pop", tAs + 0.15, 0.5);
  api.look(w, tAs, 16, 6, 0.15);
  api.armTo(w, "L", tAs + 0.4, 0.3, -20, "power2.inOut");
  api.look(w, (tu.islanders || 20.74) - 0.4, 4, 0, 0.2);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[12.2, 17.3]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 3.0, 0); api.blink(w, 9.2, 0); api.blink(w, 19.5, 0.45);
};
