/* Đoạn d50 (diorama, hiện tại, 27,78 s) – đọc hết lá thư, đồng ý, RỒI đóng dấu WOULD MOVE. Vào cat, ra cat.
 * Như d48: Wob đứng trên trang sổ (cây phả hệ), cầm bưu thiếp mặt viết; hộp phiếu cạnh sổ; ngăn kéo nhỏ có cuộn dây thừng.
 * 0–3: cận bưu thiếp, dòng sáng lên. "neither, yet": hạ bưu thiếp nửa chừng, nhìn người xem, nhún vai.
 * "gong.": bình ôxy vẽ ở lề rung, sóng âm mực; Wob nhăn mặt; sfx cong (một lần). "Twice.": xoay bưu thiếp 90° đọc chữ dọc lề, giơ hai ngón.
 * "Love, me": cận dòng cuối (≥ 45 px), Wob mỉm cười. "Reading it…": đặt bưu thiếp xuống (mặt tem lên), gật chậm theo chữ.
 * "It's their island…": đặt chiếc lá tròn cạnh hộp phiếu, đứng nghiêm. "I'm stamping…": hộ chiếu lật vào GIỮA khung (lat-giay),
 * nhấc con dấu, hà hơi. Dấu chạm 21,19 (trước "WOULD" 21,26): WOULD MOVE ép bề rộng co 130, to giữa khung tới 24,26, thu 0,3 s
 * vào ô dấu. "not" tay đã ở ngăn kéo, "cargo," dây lên vai, "packed." dây quấn thành kiện hàng (boing); "What…" nghiêng nhìn
 * người xem, camera đẩy chậm.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var sau = function (re, t0, mac) { var r = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (re.test(x.text) && x.start > t0 && r === null) r = x.start; }); }); return r === null ? mac : r; };
  var chu = data.chu_tren_do_vat; // Love, me | TRISTAN DA CUNHA | SOUTH ATLANTIC | Would Wob move here? | WOULD MOVE
  var WX = 300, WZ = -150, ONG_BUT;
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
  var PH = { u: 20, v: 110, w: 280, d: 320 };
  so.themTo('<g transform="translate(' + PH.u + " " + PH.v + ')">' + api.trangPhaHeSVG(PH.w, PH.d) + "</g>", { ben: "phai" });
  var HOP = { x: 630, z: -300 };
  api.cut(the, 160, 130, '<g transform="translate(80 126)">' + api.hopPhieuSVG() + "</g>", { pos: { x: HOP.x, y: TY, z: HOP.z, scale: 0.9 }, ax: 80, ay: 126, f: api.F.AM_NHO });
  // ngăn kéo nhỏ (mở) có cuộn dây thừng, phía trước bên phải
  var NK = { x: 640, z: 20 };
  var nganKeo = fp("M 10 40 L 190 40 L 190 120 L 10 120 Z", "#8a5a3b", 5) + fp("M 22 46 L 178 46 L 178 70 L 22 70 Z", "#4a3426", 3) +
    fp("M 4 70 L 196 70 L 196 128 L 4 128 Z", "#a8754f", 5) + '<circle cx="100" cy="99" r="9" fill="#d9c49a" stroke="' + C.INK + '" stroke-width="3"/>';
  api.cut(the, 200, 130, nganKeo, { pos: { x: NK.x, y: TY, z: NK.z }, ax: 100, ay: 128, f: api.F.AM_NHO });
  var cuon = api.cut(the, 160, 80, api.cuonDaySVG(), { pos: { x: NK.x, y: TY - 52, z: NK.z - 4, scale: 0.8 }, ax: 80, ay: 76, f: api.F.AM_NHO });
  // con dấu cao su trên bàn
  var DB = { x: 560, z: -40 };
  var dauBan = api.cut(the, 120, 130, '<g transform="translate(60 22)">' + api.conDauSVG() + "</g>", { pos: { x: DB.x, y: TY, z: DB.z, scale: 0.8 }, f: api.F.AM_NHO });
  // lá tròn nằm cạnh chỗ bưu thiếp (từ d48)
  var LA0 = diem(230, 530);
  var laNam = api.cut(the, 90, 110, '<g transform="translate(45 45) scale(1.3)">' + api.laTronSVG() + "</g>", { pos: { x: LA0.x, y: LA0.y, z: LA0.z, rotationX: 90 }, ax: 45, ay: 45, f: api.F.AM_NHO });

  // ---------------------------------------------------------------- tay, bưu thiếp
  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  var BT = { w: 300, h: 200 };
  w.holdL.insertAdjacentHTML("beforeend", '<g class="bt">' + api.buuThiepSVG({ w: BT.w, h: BT.h, love: chu[0], coChu: 34, binh: true, le: true }) + "</g>");
  var bt = w.holdL.querySelector(".bt"), dong = [].slice.call(bt.querySelectorAll(".bt-sang"));
  var binh = bt.querySelector(".bt-binh"), song = bt.querySelector(".bt-song"), le = bt.querySelector(".bt-le");
  // lời mới 29/11: hai hình nguệch ngoạc bên lề (góc trên trái): ruộng khoai rào chung, tôm hùm nhỏ
  var MX = "#2f4f8a";
  var veRuong = '<rect class="ng-sang" x="40" y="-2" width="50" height="58" rx="6" fill="#fff3a8" opacity="0"/><g class="ng-hinh">' +
    sk("M 46 10 L 86 6 L 88 50 L 44 52 Z", 1.8, MX) +
    sk("M 46 10 l 0 -7 M 56 9 l 0 -7 M 66 8 l 0 -7 M 76 7 l 0 -7 M 86 6 l 0 -7 M 44 52 l 0 -6", 1.6, MX) +
    [18, 30, 42].map(function (y) { return sk("M 52 " + y + " q 4 -6 8 0 q 4 -6 8 0 q 4 -6 8 0 q 4 -6 8 0", 1.5, "#6b4a33"); }).join("") + "</g>";
  var veTom = '<rect class="ng-sang" x="92" y="-2" width="44" height="58" rx="6" fill="#fff3a8" opacity="0"/><g class="ng-hinh">' +
    fp("M 114 16 C 124 18 124 34 114 38 C 104 34 104 18 114 16 Z", "#e2896a", 1.6) +
    fp("M 110 38 L 118 38 L 116 46 L 112 46 Z M 108 46 L 120 46 L 114 52 Z", "#e2896a", 1.4) +
    sk("M 108 20 C 100 14 98 8 100 2 M 120 20 C 128 14 130 8 128 2", 1.6, MX) +
    fp("M 96 4 C 92 -2 100 -6 104 0 C 102 2 100 2 98 6 Z M 132 4 C 136 -2 128 -6 124 0 C 126 2 128 2 130 6 Z", "#e2896a", 1.4) +
    sk("M 108 26 l -8 4 M 108 32 l -8 4 M 120 26 l 8 4 M 120 32 l 8 4", 1.3, MX) + "</g>";
  bt.insertAdjacentHTML("beforeend", '<g transform="translate(-188 -90) scale(1.35)"><rect x="38" y="-6" width="100" height="66" rx="6" fill="#f6eedb"/>' +
    '<g class="ng ng-ruong">' + veRuong + '</g><g class="ng ng-tom">' + veTom + "</g></g>");   // góc trên trái, xa bàn tay cầm
  var ngRuong = bt.querySelector(".ng-ruong"), ngTom = bt.querySelector(".ng-tom");
  var btPose = function (arm, ang, sx) {
    var h = api.handWorld("L", arm), a = ang * Math.PI / 180, dx = -(BT.w / 2 - 18);
    return api.holdPose("L", arm, h[0] + dx * Math.cos(a), h[1] + dx * Math.sin(a), ang, sx);
  };
  var A0 = goc("L", 20, 150), AH = goc("L", 30, 240);
  api.armSet(w, "L", A0);
  gsap.set(bt, btPose(A0, -3));
  api.quaySet(w, -0.3);
  gsap.set([w.pupL, w.pupR], { x: -12, y: 0 });
  dong.forEach(function (d, i) { gsap.set(d, { opacity: i < 3 ? 0.3 : 0 }); });
  // bưu thiếp nằm (mặt tem lên) sau khi đặt xuống
  var BTN = diem(360, 510);
  var btNam = api.cut(the, 240, 170, '<g transform="translate(120 85) rotate(-4)">' + api.buuThiepSVG({ w: 220, h: 146, love: chu[0], binh: true, le: true }) + "</g>", { pos: { x: BTN.x, y: BTN.y, z: BTN.z, rotationX: 90, scale: 0.85 }, ax: 120, ay: 85, f: api.F.AM_NHO });
  gsap.set(btNam, { opacity: 0 });
  // đồ trong tay phải: hai ngón, lá, con dấu
  w.holdR.insertAdjacentHTML("beforeend",
    '<g class="hai-ngon" opacity="0">' + sk("M -4 -6 L -12 -34 M 4 -6 L 10 -34", 7) + "</g>" +
    '<g class="la-tay" opacity="0"><g transform="scale(1.4)">' + api.laTronSVG() + "</g></g>" +
    '<g class="dau-tay" opacity="0"><g transform="scale(.75)">' + api.conDauSVG() + "</g></g>");
  var haiNgon = w.holdR.querySelector(".hai-ngon"), laTay = w.holdR.querySelector(".la-tay"), dauTay = w.holdR.querySelector(".dau-tay");
  // dây thừng trên vai, kiện hàng
  w.extra.insertAdjacentHTML("beforeend", '<g class="dv" opacity="0">' + api.dayVaiWobSVG() + '</g><g class="kh" opacity="0">' + api.kienHangWobSVG() + "</g>");
  var dayVai = w.extra.querySelector(".dv"), kienHang = w.extra.querySelector(".kh");

  // ---------------------------------------------------------------- mốc
  var tShared = tu.shared || 0.82, tLob = tu.lobster || 1.75, tBills = tu.bills || 2.64, tGong = tu.gong || 4.17, tTwice = tu.twice || 4.91, tStill = tu.still || 6.08;
  var tLove = tu.love || 7.47, tRead = tu.reading || 8.81, tIts = tu.its || 14.11, tStamp = tu.stamping || 17.32;
  var tWould = sau(/^WOULD$/, 20, 21.26), tDap = 686.585 - 665.393;   // phan-canh: chạm 2 khung trước "WOULD"
  var tNot = sau(/^not$/i, 22, 24.18), tCargo = tu.cargo || 24.7, tPacked = tu.packed || 25.75, tWhat = sau(/^What$/, 26, 26.51);
  var tThu = 689.65 - 665.393;   // giữ dấu to 3 s rồi mới thu

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 40, cy: 40, cz: -150, k: 660, rx: -5, ry: 0 });
  api.camTo(R, 0, 2.3, { k: 690 }, "sine.inOut");
  api.camTo(R, 2.4, 0.45, { cx: 200, cy: 60, cz: -150, k: 500, rx: -10 }, "power2.inOut");
  api.camTo(R, 3.3, 0.4, { cx: 40, cy: 40, cz: -150, k: 620, rx: -5 }, "power2.inOut");
  api.camTo(R, 6.45, 0.6, { cx: 80, cy: 70, k: 720 }, "power2.inOut");                    // cận "Love, me"
  api.camTo(R, tRead - 0.2, 0.8, { cx: 380, cy: 70, cz: -170, k: 450, rx: -24, ry: 0 }, "power2.inOut");
  api.camTo(R, tRead + 0.6, 16.6 - tRead - 0.6, { k: 480, cx: 400 }, "sine.inOut");
  api.camTo(R, 16.7, 0.6, { cx: 80, cy: 60, cz: -120, k: 470, rx: -12, ry: 0 }, "power2.inOut");   // khung cho hộ chiếu giữa + Wob bên phải
  api.camTo(R, 17.3, tThu + 0.3 - 17.3, { k: 482 }, "sine.inOut");                     // đẩy máy rất chậm lúc dấu to
  api.camTo(R, tThu + 0.3, 0.6, { cx: 450, cy: 60, cz: -120, k: 560, rx: -10 }, "power2.inOut");
  api.camTo(R, tThu + 0.9, tWhat - tThu - 0.9, { k: 575 }, "sine.inOut");
  api.camTo(R, tWhat, DUR - tWhat, { k: 640, cy: 50 }, "sine.inOut");                     // [day-vao-cham]

  // ---------------------------------------------------------------- 0–4,5 đọc, "neither, yet"
  var sang = [0.15, 1.2, 2.2, 3.41, 4.17];
  sang.forEach(function (t, i) { var d = dong[Math.min(i + 1, dong.length - 1)]; tl.to(d, { opacity: 0.85, duration: 0.15 }, t); tl.to(d, { opacity: 0.35, duration: 0.4 }, t + 0.7); });
  api.look(w, 0.1, -14, 2, 0.15);
  // hình bên lề sáng lên đúng chữ
  [[ngRuong, tShared, "66 28"], [ngTom, tLob, "114 26"]].forEach(function (g) {
    var n = g[0], t = g[1];
    tl.to(n.querySelector(".ng-sang"), { opacity: 0.9, duration: 0.15 }, t - 0.05);
    tl.to(n.querySelector(".ng-sang"), { opacity: 0.45, duration: 0.5 }, t + 0.8);
    tl.fromTo(n.querySelector(".ng-hinh"), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.18, transformOrigin: "50% 50%", duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, t - 0.05);
    api.look(w, t - 0.1, n === ngRuong ? -8 : -4, 4, 0.12);
  });
  tl.to(bt.querySelectorAll(".ng-sang"), { opacity: 0, duration: 0.4 }, 3.3);
  // "bills": hạ bưu thiếp nửa chừng, mắt sáng, gật
  api.armTo(w, "L", tBills - 0.25, 0.3, AH, "power2.inOut");
  tl.to(bt, Object.assign(btPose(AH, 4), { duration: 0.3, ease: "power2.inOut" }), tBills - 0.25);
  api.quay(w, tBills - 0.2, 0, 0.25); api.look(w, tBills - 0.1, 0, -2, 0.15, 1.15); api.lids(w, tBills - 0.1, 0, 0.12);
  tl.to(w.talk, { y: 9, rotation: 0, svgOrigin: "200 290", duration: 0.18, ease: "power2.out" }, tBills + 0.2);
  tl.to(w.talk, { y: 0, svgOrigin: "200 290", duration: 0.28, ease: "sine.inOut" }, tBills + 0.4);
  tl.to(w.lift, { y: -6, duration: 0.15, ease: "power2.out" }, tBills + 0.15);
  tl.to(w.lift, { y: 0, duration: 0.25, ease: "power2.in" }, tBills + 0.45);
  // ---------------------------------------------------------------- "gong." / "Twice."
  api.armTo(w, "L", 3.3, 0.35, A0, "power2.inOut");
  tl.to(bt, Object.assign(btPose(A0, -3), { duration: 0.35, ease: "power2.inOut" }), 3.3);
  api.quay(w, 3.3, -0.3, 0.25); api.look(w, 3.35, -14, 6, 0.15, 1); api.lids(w, 3.35, 0.15, 0.15);
  tl.fromTo(binh, { x: -1.5 }, { x: 1.5, duration: 0.05, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, tGong - 0.05);
  tl.to(binh, { x: 0, duration: 0.05 }, tGong + 0.46);
  tl.fromTo(song, { opacity: 0 }, { opacity: 1, duration: 0.08, immediateRender: false }, tGong - 0.05);
  tl.to(song, { opacity: 0, duration: 0.3 }, tGong + 0.5);
  api.sfx("cong", tGong - 0.03, 0.55);
  api.lids(w, tGong, 0.6, 0.1); api.nghieng(w, tGong, 5, 0.12);                            // nhăn mặt
  api.lids(w, tGong + 0.45, 0.15, 0.15); api.nghieng(w, tGong + 0.45, 0, 0.2);
  // xoay bưu thiếp 90° đọc chữ dọc lề + giơ hai ngón
  var AQ = goc("L", 30, 170);
  api.armTo(w, "L", tTwice - 0.1, 0.3, AQ, "power2.inOut");
  tl.to(bt, Object.assign(btPose(AQ, -90), { duration: 0.3, ease: "power2.inOut" }), tTwice - 0.1);
  tl.to(le.querySelectorAll("path"), { attr: { "stroke-width": 2.6 }, duration: 0.15 }, tTwice);
  api.nghieng(w, tTwice, -10, 0.3);
  var A2 = goc("R", 350, 140);
  api.armTo(w, "R", tTwice + 0.1, 0.22, A2, "back.out(1.8)");
  tl.set(haiNgon, api.holdPose("R", A2, api.handWorld("R", A2)[0], api.handWorld("R", A2)[1], 0), tTwice + 0.1);
  tl.set(haiNgon, { opacity: 1 }, tTwice + 0.1);
  api.lids(w, tTwice + 0.15, 0.35, 0.15); api.look(w, tTwice + 0.2, 4, 2, 0.15);
  tl.set(haiNgon, { opacity: 0 }, tStill - 0.05);
  api.armTo(w, "R", tStill - 0.1, 0.3, 0, "power2.inOut");
  api.armTo(w, "L", tStill - 0.1, 0.35, A0, "power2.inOut");
  tl.to(bt, Object.assign(btPose(A0, -3), { duration: 0.35, ease: "power2.inOut" }), tStill - 0.1);
  api.nghieng(w, tStill - 0.1, 0, 0.3);
  api.look(w, tStill + 0.2, -14, 6, 0.15); api.lids(w, tStill, 0.15, 0.15);
  // "Love, me"
  tl.to(dong[6], { opacity: 0.85, duration: 0.15 }, tLove - 0.05);
  api.lids(w, tLove, 0.3, 0.2);
  // ---------------------------------------------------------------- đặt bưu thiếp xuống, gật chậm
  var AX = goc("L", 6, 300);
  api.armTo(w, "L", tRead - 0.3, 0.35, AX, "power2.inOut");
  tl.to(bt, Object.assign(btPose(AX, 10), { duration: 0.35, ease: "power2.inOut" }), tRead - 0.3);
  tl.set(bt, { opacity: 0 }, tRead + 0.06); tl.set(btNam, { opacity: 1 }, tRead + 0.06);
  tl.fromTo(btNam, { y: BTN.y - 30 }, { y: BTN.y, duration: 0.18, ease: "power2.in", immediateRender: false }, tRead + 0.06);
  api.armTo(w, "L", tRead + 0.3, 0.3, 0, "power2.inOut");
  api.quay(w, tRead + 0.4, 0, 0.3); api.look(w, tRead + 0.5, -4, 10, 0.2); api.lids(w, tRead + 0.5, 0.4, 0.3);
  [tu.agree || 10.46, tu.every || 10.96, sau(/^including/, 11, 11.89)].forEach(function (t) {
    tl.to(w.talk, { y: 8, rotation: 0, svgOrigin: "200 290", duration: 0.25, ease: "sine.inOut" }, t);
    tl.to(w.talk, { y: 0, svgOrigin: "200 290", duration: 0.3, ease: "sine.inOut" }, t + 0.27);
  });
  // ---------------------------------------------------------------- lá tròn cạnh hộp phiếu, đứng nghiêm
  var tLa = 13.0, AL = goc("L", 20, 320);
  api.quay(w, tLa - 0.2, -0.3, 0.2); api.look(w, tLa - 0.2, -12, 16, 0.15);
  api.armTo(w, "L", tLa - 0.15, 0.25, AL, "power2.out");
  tl.set(laNam, { opacity: 0 }, tLa + 0.1);
  w.holdL.insertAdjacentHTML("beforeend", '<g class="la-trai" opacity="0"><g transform="scale(1.4)">' + api.laTronSVG() + "</g></g>");
  var laTrai = w.holdL.querySelector(".la-trai");
  tl.set(laTrai, api.holdPose("L", AL, api.handWorld("L", AL)[0], api.handWorld("L", AL)[1] - 8, 0), tLa + 0.1);
  tl.set(laTrai, { opacity: 1 }, tLa + 0.1);
  api.armTo(w, "L", tLa + 0.12, 0.25, 0, "power2.inOut");
  tl.to(laTrai, Object.assign(api.holdPose("L", 0, api.handWorld("L", 0)[0], api.handWorld("L", 0)[1] - 8, 0), { duration: 0.25 }), tLa + 0.12);
  api.walk(w, tLa + 0.35, tIts - 0.2, 410, -180, { step: 0.22 });
  api.quay(w, tLa + 0.35, 0.4, 0.25); api.look(w, tLa + 0.4, 12, 10, 0.15);
  var LA1 = { x: 545, y: TY - 4, z: -215 };
  var laHop = api.cut(the, 90, 110, '<g transform="translate(45 45) scale(1.3)">' + api.laTronSVG() + "</g>", { pos: { x: LA1.x, y: LA1.y, z: LA1.z, rotationX: 90 }, ax: 45, ay: 45, f: api.F.AM_NHO });
  gsap.set(laHop, { opacity: 0 });
  // đổi lá sang tay phải lúc đi (sau lưng thân), đặt xuống đúng "It's"
  tl.set(laTrai, { opacity: 0 }, tIts - 0.45);
  var AR = goc("R", 380, 300);
  api.armTo(w, "R", tIts - 0.45, 0.3, AR, "power2.out");
  tl.set(laTay, api.holdPose("R", AR, api.handWorld("R", AR)[0], api.handWorld("R", AR)[1] - 8, 0), tIts - 0.45);
  tl.set(laTay, { opacity: 1 }, tIts - 0.45); tl.set(laTay, { opacity: 0 }, tIts); tl.set(laHop, { opacity: 1 }, tIts);
  tl.fromTo(laHop, { y: LA1.y - 30 }, { y: LA1.y, duration: 0.15, ease: "power2.in", immediateRender: false }, tIts);
  api.armTo(w, "R", tIts + 0.2, 0.3, 0, "power2.inOut");
  // đứng nghiêm
  api.quay(w, tIts + 0.4, 0, 0.25); api.look(w, tIts + 0.45, 0, 2, 0.2); api.lids(w, tIts + 0.45, 0.1, 0.2);
  tl.to(w.lift, { y: -5, scaleY: 1.03, duration: 0.2, ease: "power2.out" }, tIts + 0.5);
  tl.to(w.lift, { y: 0, scaleY: 1, duration: 0.3, ease: "sine.inOut" }, 16.6);
  // ---------------------------------------------------------------- hộ chiếu giữa khung, nhấc dấu, hà hơi
  // vòng sửa 29/11: bố cục riêng có khoảng trống cho dấu giữa tên nơi và dòng hỏi; SOUTH ATLANTIC lên đầu thẻ (không còn chữ dưới dấu)
  var BO = { W: 820, H: 610, nuoc: [330, 76, 44], ten: [330, 164, 74, 82], ke: 482, hoi: [410, 556, 56], o: [702, 150], oW: 170 };
  var hc = api.theHoChieu({ noi: chu[1], noiDong: ["TRISTAN", "DA CUNHA"], nuoc: chu[2], hoi: chu[3], x: 350, y: 170, bo: BO });   // duyệt 6a: dời trái 200 px cho mặt Wob trống
  var tVao = (tu.im || 18.25) - 0.05;
  hc.vao(tVao, 0.42);
  api.sfx("lat-giay", tVao, 0.6);
  var AD0 = goc("R", 360, 320), AD1 = goc("R", 362, 150);
  api.quay(w, 17.15, 0.3, 0.25); api.look(w, 17.2, 12, 12, 0.15);
  api.armTo(w, "R", 17.2, 0.25, AD0, "power2.out");
  tl.set(dauBan, { opacity: 0 }, 17.47);
  tl.set(dauTay, api.holdPose("R", AD0, api.handWorld("R", AD0)[0], api.handWorld("R", AD0)[1] - 30, 0), 17.47);
  tl.set(dauTay, { opacity: 1 }, 17.47);
  api.armTo(w, "R", 17.5, 0.3, AD1, "power2.inOut");
  tl.to(dauTay, Object.assign(api.holdPose("R", AD1, api.handWorld("R", AD1)[0], api.handWorld("R", AD1)[1] + 10, 180), { duration: 0.3, ease: "power2.inOut" }), 17.5);
  // hà hơi: miệng O + mấy vòng hơi
  w.upper.insertAdjacentHTML("beforeend", '<g class="ha-hoi" opacity="0">' + sk("M 268 236 q 10 -6 18 2 q 8 -8 16 2", 3.5, "#9fb6c4") + sk("M 276 216 q 10 -6 18 2", 3, "#9fb6c4") + "</g>");
  var haHoi = w.upper.querySelector(".ha-hoi");
  var tHa = 18.45;
  tl.fromTo(haHoi, { opacity: 0, y: 0 }, { opacity: 0.9, y: -12, duration: 0.25, immediateRender: false }, tHa - 0.2);
  tl.to(haHoi, { opacity: 0, y: -24, duration: 0.25 }, tHa + 0.1);
  api.look(w, 18.85, 6, -2, 0.15);
  // "not for my chances": liếc chiếc lá tròn cạnh hộp phiếu, nhún vai nhỏ
  var tKhong = sau(/^not$/i, 19, 19.85);
  api.look(w, tKhong - 0.1, 16, 16, 0.15); api.lids(w, tKhong - 0.05, 0.35, 0.15);
  tl.to(w.lift, { y: -7, duration: 0.15, ease: "power2.out" }, tKhong + 0.25);
  tl.to(w.lift, { y: 0, duration: 0.25, ease: "power2.in" }, tKhong + 0.55);
  api.armTo(w, "L", tKhong + 0.25, 0.15, 40, "back.out(2)");
  api.armTo(w, "L", tKhong + 0.55, 0.25, 0, "power2.inOut");
  api.nghieng(w, tKhong + 0.25, -3, 0.15); api.nghieng(w, tKhong + 0.6, 0, 0.2);
  api.look(w, tKhong + 0.7, 6, -2, 0.15); api.lids(w, tKhong + 0.7, 0.1, 0.15);
  // ---------------------------------------------------------------- dấu WOULD MOVE
  var ov = api.div("dio-ovl", api.root, "z-index:42;");
  ov.innerHTML = '<svg width="1920" height="1080" viewBox="0 0 1920 1080" style="position:absolute;left:0;top:0;overflow:visible" data-layout-allow-overflow>' +
    '<g class="dau-to">' + api.dauEpSVG(chu[4], 0, 0, 92, -3, "dau-wm") + "</g>" +
    '<g class="dau-cs"><g transform="scale(2.6)">' + api.conDauSVG() + "</g></g></svg>";
  var dauTo = ov.querySelector(".dau-to"), dauCs = ov.querySelector(".dau-cs");
  var TAM = [350 + 410, 170 + 368], O = hc.o();   // tâm khoảng trống (y 268–468 của thẻ)   // tâm trang hộ chiếu: dấu nằm trọn trong trang
  gsap.set(dauTo, { x: TAM[0], y: TAM[1], opacity: 0, scale: 1 });
  gsap.set(dauCs, { x: 1100, y: 1300, rotation: 25, opacity: 0 });
  tl.set(dauTay, { opacity: 0 }, tDap - 0.42);
  api.armTo(w, "R", tDap - 0.42, 0.3, goc("R", 372, 120), "power2.out");
  tl.set(dauCs, { opacity: 1 }, tDap - 0.42);
  tl.to(dauCs, { x: TAM[0], y: TAM[1] - 96 * 2.6, rotation: 0, duration: 0.3, ease: "power2.out" }, tDap - 0.42);
  tl.to(dauCs, { y: TAM[1] - 96 * 2.6 - 40, duration: 0.08, ease: "power1.out" }, tDap - 0.12);
  tl.to(dauCs, { y: TAM[1] - 96 * 2.6 + 6, duration: 0.04, ease: "power3.in" }, tDap - 0.04);
  tl.set(dauTo, { opacity: 1 }, tDap);
  tl.fromTo(dauTo, { scale: 1.08 }, { scale: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, tDap);
  tl.to(dauCs, { x: 1150, y: 1260, rotation: 30, duration: 0.32, ease: "power2.in" }, tDap + 0.1);
  tl.set(dauCs, { opacity: 0 }, tDap + 0.44);
  api.sfx("dau-wob", tDap, 0.9);
  api.armTo(w, "R", tDap + 0.1, 0.3, 0, "power2.inOut");
  tl.set(dauBan, { opacity: 1 }, tDap + 0.4);
  api.hop(w, tDap + 0.05, 10, 0.3);
  api.look(w, tDap + 0.1, -14, -4, 0.15); api.lids(w, tDap + 0.1, 0, 0.1);
  var tMove = sau(/^MOVE/, 21, 21.49);                                                    // gật một cái ở "MOVE"
  tl.to(w.talk, { y: 9, rotation: 0, svgOrigin: "200 290", duration: 0.16, ease: "power2.out" }, tMove);
  tl.to(w.talk, { y: 0, svgOrigin: "200 290", duration: 0.3, ease: "sine.inOut" }, tMove + 0.18);
  api.nghieng(w, 21.9, -4, 0.5, "sine.inOut"); api.nghieng(w, 22.9, 0, 0.6, "sine.inOut");
  // nhịp thở trong kiện hàng trước "What"
  tl.to(w.lift, { scaleY: 1.03, duration: 0.2, ease: "sine.inOut", yoyo: true, repeat: 1 }, tPacked + 0.4);
  // Wob đứng cạnh, liếc xuống ngăn kéo ("rope")
  api.look(w, (tu.rope || 23.59) - 0.6, 10, 16, 0.2);
  // thu dấu về ô (0,3 s), hộ chiếu lật đi
  var SC = 0.22;
  tl.to(dauTo, { x: O[0], y: O[1], scale: SC, duration: 0.3, ease: "power2.inOut" }, tThu);
  hc.svg.insertAdjacentHTML("beforeend", '<g class="dau-o" opacity="0"><g transform="translate(' + hc.bo.o[0] + " " + hc.bo.o[1] + ") scale(" + SC + ')">' + api.dauEpSVG(chu[4], 0, 0, 92, -3, "dau-nho") + "</g></g>");
  tl.set(hc.svg.querySelector(".dau-o"), { opacity: 1 }, tThu + 0.3); tl.set(dauTo, { opacity: 0 }, tThu + 0.3);
  hc.ra(tThu + 0.36, 0.3);
  api.sfx("lat-giay", tThu + 0.36, 0.4);
  // ---------------------------------------------------------------- dây thừng
  var AK = goc("R", 390, 350);
  api.quay(w, tNot - 0.35, 0.35, 0.2);
  api.armTo(w, "R", tNot - 0.3, 0.3, AK, "power2.out");                                     // tay ĐÃ ở ngăn kéo đúng "not"
  tl.to(cuon, { y: TY - 120, duration: 0.3, ease: "power2.out" }, tCargo - 0.4);
  tl.set(cuon, { opacity: 0 }, tCargo - 0.08);
  api.armTo(w, "R", tCargo - 0.4, 0.32, goc("R", 362, 112), "power2.inOut");
  tl.set(dayVai, { opacity: 1 }, tCargo - 0.08);
  tl.fromTo(dayVai, { y: -14 }, { y: 0, duration: 0.15, ease: "power2.in", immediateRender: false }, tCargo - 0.08);
  api.armTo(w, "R", tCargo + 0.1, 0.3, 0, "power2.inOut");
  api.quay(w, tCargo + 0.1, 0, 0.25); api.look(w, tCargo + 0.15, 0, -2, 0.15);
  tl.to(w.lift, { y: -5, duration: 0.2, ease: "power2.out" }, tCargo + 0.2);
  tl.to(w.lift, { y: 0, duration: 0.2, ease: "power2.in" }, tPacked - 0.25);
  // "packed.": dây tuột ra quấn Wob thành kiện hàng
  tl.set(dayVai, { opacity: 0 }, tPacked);
  tl.set(kienHang, { opacity: 1 }, tPacked);
  tl.fromTo(kienHang, { scale: 1.25, svgOrigin: "200 200" }, { scale: 1, svgOrigin: "200 200", duration: 0.22, ease: "back.out(2.2)", immediateRender: false }, tPacked);
  api.armTo(w, "L", tPacked, 0.12, 8, "power2.out"); api.armTo(w, "R", tPacked, 0.12, -8, "power2.out");
  api.sfx("boing", tPacked, 0.5);
  tl.to(w.lift, { scaleY: 0.92, scaleX: 1.06, duration: 0.06 }, tPacked + 0.02);
  tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.35, ease: "elastic.out(1, 0.4)" }, tPacked + 0.08);
  api.lids(w, tPacked + 0.1, 0.45, 0.12); api.look(w, tPacked + 0.12, -6, 6, 0.12);
  // "What would you…": nghiêng người nhìn thẳng người xem, nhướng mày (mắt mở to)
  api.nghieng(w, tWhat, 7, 0.4, "sine.inOut");
  api.look(w, tWhat + 0.05, 0, -2, 0.2, 1.1); api.lids(w, tWhat + 0.05, 0, 0.2);
  tl.to(w.lift, { y: -4, duration: 0.3, ease: "power2.out" }, (tu.back ? sau(/^back$/, 27, 27.62) : 27.62));
  tl.to(w.lift, { y: 0, duration: 0.4, ease: "sine.inOut" }, 28.1);

  api.khauHinh(w);
  api.gatDau(w, { bo: [[2.6, 3.0], [8.8, 13.9], [21.2, 21.8], [tPacked - 0.1, tPacked + 0.6]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 1.3, 0.15); api.blink(w, 9.9, 0.4); api.blink(w, 15.4, 0.1); api.blink(w, 22.5, 0); api.blink(w, 27.2, 0);
};
