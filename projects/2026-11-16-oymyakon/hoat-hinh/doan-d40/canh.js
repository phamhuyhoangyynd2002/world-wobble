/* Đoạn d40 (diorama, hiện tại, 19,05 s) – kết video, lời cảnh 19 viết lại (19/11/2026).
 * Trung cảnh trọn người: Wob đứng bên trái trang sổ giơ con dấu; "NOPE." đóng mạnh MỘT lần (dau-wob đúng lúc dấu chạm giấy),
 * bàn rung, đồ nảy; Wob nhấc dấu thẳng lên, lùi hai bước; camera đẩy vào cận trang: GIỮ CẬN chữ NOPE sạch ≥ 2 s (không tay,
 * không Wob), dấu ở nửa trái – giữa trên khung; lùi về trung cảnh, Wob đặt dấu xuống bàn; nhắm mắt cười (mí khép có nét,
 * api.nhamMat – không phải mắt rỗng), mở mắt đúng "earned", gật đầu; gập sổ, vuốt bìa; đeo găng, cầm cá, tới tủ đông, cửa mở hơi
 * lạnh phả ra, đặt cá: cá nằm thư thái tựa khay đá, mắt lim dim; đóng cửa tủ; tháo găng, giơ nhiệt kế vẽ tay như cái cân:
 * "January" thuỷ ngân tụt, bầu xanh, phủ sương; "July" vọt kịch nóc, đỏ, sương bay; "Would you take that trade?" nhìn thẳng
 * người xem, giữ hình tới hết (không mờ đen). Cả đoạn trong 20 s cuối: không chữ ở x > 1150, y > 560 và x > 1500, y < 150.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // ["Would Wob move here?", "NOPE"]

  // ---------------------------------------------------------------- bố cục bàn kỷ vật chung của tập (giống d38)
  var BO_CUC = {
    hop: { x: -200, z: -400, w: 300, d: 220, h: 150, do: ["anh"] },
    so: { x: 480, z: -330, w: 460, d: 580 },
    baLo: { x: -660, z: -250, s: 0.85 },
    ongBut: { x: -760, z: 430 },
    ongButNho: { x: 430, z: 140, s: 0.75 },
    tuDong: { x: -560, z: -40 },
    HANG: { nhiet: { x: -170, z: 215 }, toRoi: { x: -75, z: 210 }, chai: { x: 40, z: 205 }, ca: { x: 190, z: 225 } },
    GANG2: { x: -80, z: 120 }, MUC: { x: 360, z: 45 },
    MU: { x: 1000, y: -262, z: -1270 }
  };
  var L = api.lopPopup, s = 0.9, H = BO_CUC.HANG;
  var VT = { x: 0, z: -30 };            // Wob đứng trước mép trái trang sổ để đóng dấu
  var LUI = { x: -150, z: -30 };        // lùi hai bước sang trái
  var TU_VT = { x: -300, z: 60 };       // bên phải tủ đông
  var DAU = { cx: 144, cy: 453 };       // tâm dấu trên trang trái (hệ svg 460×580)
  var trangTrai = api.sk("M 360 140 l 0 -60 M 330 110 l 60 0 M 339 89 l 42 42 M 381 89 l -42 42", 5, C.ICE2) +
    api.txt(230, 318, 38, 700, chu[0], C.INK) + api.sk("M 40 346 L 420 346", 3, C.INK, ' opacity=".5"') +
    '<rect x="26" y="378" width="236" height="150" rx="10" fill="none" stroke="' + C.INK + '" stroke-width="3" stroke-dasharray="8 8" opacity=".45"/>' +
    api.dauPhanQuyetSVG(chu[1], DAU.cx, DAU.cy, 64, -6, "dau-nope");
  var hoiSuoi = [api.cotKhoi({ x: 120, y: 176, cao: 80, r0: 8, no: 1.3, troi: 10, n: 10, per: 2.4, loai: "hoi", seed: 31 }),
    api.cotKhoi({ x: 260, y: 180, cao: 70, r0: 7, no: 1.3, troi: -8, n: 10, per: 2.1, loai: "hoi", seed: 32 })];
  var langSuoi = api.fp("M 0 200 L 0 168 Q 210 140 420 168 L 420 200 Z", C.SNOW, 4) +
    api.fp("M 30 192 C 110 170 180 196 250 180 S 360 170 410 188 L 410 196 L 30 198 Z", C.SEA, 3) + hoiSuoi[0].svg + hoiSuoi[1].svg +
    '<g transform="translate(20 70) scale(.9)">' + api.nhaNhoSVG(110, 110) + "</g>" +
    '<g transform="translate(160 40) scale(1)">' + api.nhaNhoSVG(110, 110, { mau: "#8a5a3b" }) + "</g>" +
    '<g transform="translate(305 76) scale(.85)">' + api.nhaNhoSVG(110, 110) + "</g>";
  var ban = api.dungBan({
    hop: BO_CUC.hop, baLo: BO_CUC.baLo, ongBut: BO_CUC.ongBut, ongButNho: BO_CUC.ongButNho, tuDong: BO_CUC.tuDong,
    wob: { x: VT.x, z: VT.z, s: s },
    so: { x: BO_CUC.so.x, z: BO_CUC.so.z, w: BO_CUC.so.w, d: BO_CUC.so.d, biaTrong: trangTrai, moSan: true, lop: [L.tuy(langSuoi, 420, 200, { x: 230, banLe: -60, khoi: hoiSuoi })] }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the, tu0 = ban.tuDong;
  api.matKhongRong(w); // mắt không bao giờ lộ hai vòng rỗng khi nháy, nhắm (dio-dao-cu.js)
  api.cut(ban.trongHop, 170, 120, api.toRoiSVG(), { pos: { x: 70, y: -8, z: -30, rotationZ: 8, scale: 0.75 }, f: api.F.AM_NHO });
  api.cut(the, 220, 190, api.muLongSVG(), { pos: { x: BO_CUC.MU.x, y: BO_CUC.MU.y, z: BO_CUC.MU.z, scale: 1.5 }, ax: 110, ay: 8, f: api.F.AM });
  // đồ trên bàn (như cuối d38)
  var caBan = api.cut(the, 320, 124, api.caNamSVG(-1), { pos: { x: H.ca.x, y: TY, z: H.ca.z, scale: s }, f: api.F.AM });
  var chaiBan = api.cut(the, 90, 170, api.chaiNuocSVG(true), { pos: { x: H.chai.x, y: TY, z: H.chai.z, scale: s }, f: api.F.AM_NHO });
  var nhietBan = api.cut(the, 69, 180, '<g transform="scale(.3)">' + api.thermoSVG([]) + "</g>", { pos: { x: H.nhiet.x, y: TY, z: H.nhiet.z }, f: api.F.AM_NHO });
  var toRoiBan = api.cut(the, 170, 120, api.toRoiSVG(), { pos: { x: H.toRoi.x, y: TY, z: H.toRoi.z, scale: 0.7 }, f: api.F.AM_NHO });
  var gangBan = api.cut(the, 120, 90, '<g transform="translate(60 46) rotate(-78)">' + api.gangLoSVG() + "</g>", { pos: { x: BO_CUC.GANG2.x, y: TY, z: BO_CUC.GANG2.z, scale: s }, f: api.F.AM_NHO });
  var muc = api.cut(the, 170, 60, api.hopMucSVG(), { pos: { x: BO_CUC.MUC.x, y: TY, z: BO_CUC.MUC.z, scale: 0.6 }, f: api.F.AM_NHO });
  var dauBan = api.cut(the, 110, 96, '<g transform="translate(55 22) scale(.75)">' + api.conDauSVG() + "</g>", { pos: { x: -150, y: TY, z: 60 }, f: api.F.AM_NHO });
  gsap.set(dauBan, { opacity: 0 });
  // tủ đông: khay đá + cá nằm nghỉ (ẩn tới lúc đặt vào)
  api.cut(tu0.ke, 130, 46, api.fp("M 4 10 L 126 10 L 120 42 L 10 42 Z", "#dfe9ee", 4) +
    [16, 44, 72, 100].map(function (x) { return api.fp("M " + x + " 2 h 20 v 20 h -20 Z", "#ffffff", 3); }).join(""), { pos: { x: 58, y: 0, z: -40 }, f: api.F.LANH_NHO });
  var caNghi = api.cut(tu0.ke, 320, 124, api.caNamSVG(-1, true), { pos: { x: -18, y: -2, z: -10, rotationZ: 16, scale: 0.78 }, f: api.F.LANH_NHO });
  gsap.set(caNghi, { opacity: 0 });
  var nope = so.coverIn.querySelector(".dau-nope");
  gsap.set(nope, { opacity: 0 });
  // đồ trong tay
  var SUONG = '<g class="nk-suong" opacity="0">' + [[96, 40], [134, 60], [92, 150], [140, 230], [94, 300], [138, 330], [80, 384], [150, 384], [115, 420]].map(function (p, i) {
    return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (14 + (i % 3) * 5) + '" fill="#ffffff" stroke="' + C.ICE2 + '" stroke-width="4"/>';
  }).join("") + api.sk("M 40 120 l 20 12 M 190 200 l -20 12 M 40 280 l 20 -10 M 190 420 l -22 -8", 6, C.ICE2) + "</g>";
  w.holdR.insertAdjacentHTML("beforeend", '<g class="dau-cam"><g transform="scale(.75)">' + api.conDauSVG() + "</g></g>" +
    '<g class="nk-cam"><g transform="translate(-63 -275) scale(.55)">' + api.thermoSVG([]) + SUONG + "</g></g>");
  var dauCam = w.holdR.querySelector(".dau-cam"), nkCam = w.holdR.querySelector(".nk-cam");
  var merc = nkCam.querySelector(".merc"), bau = nkCam.querySelector('circle[cy="384"]'), suong = nkCam.querySelector(".nk-suong");
  gsap.set(nkCam, { opacity: 0 });
  gsap.set(merc, { scaleY: 0.55, svgOrigin: "115 364" });
  w.holdL.insertAdjacentHTML("afterbegin", '<g class="ca-cam">' + api.fishSVG("") + "</g>");
  var caCam = w.holdL.querySelector(".ca-cam");
  gsap.set(caCam, { opacity: 0 });
  var dau = function (arm) { var h = api.handWorld("R", arm); return api.holdPose("R", arm, h[0], h[1], 0); };
  var theGioi = function (x, z, side, arm) { var h = api.handWorld(side, arm); return { x: x + (h[0] - 200) * s, y: TY + (h[1] - 392) * s, z: z }; };

  // ---------------------------------------------------------------- khung đầu: trung cảnh, Wob trọn người bên trái trang, giơ cao con dấu
  api.armSet(w, "R", -150);
  gsap.set(dauCam, dau(-150));
  api.quaySet(w, 0.45);
  gsap.set([w.pupL, w.pupR], { x: 8, y: 10 });

  // ---------------------------------------------------------------- camera
  var NOPE_TAI = tu.nope - 2 / api.fps;
  var o = so.diemTrang(-460 + DAU.cx, DAU.cy - 290); // tâm dấu trên trang trái (u âm)
  api.camSet(R, null, { cx: 330, cy: 110, cz: -120, k: 230, rx: -22, ry: -2 });
  api.camTo(R, 0, 1.0, { k: 250 }, "sine.inOut");
  api.camTo(R, 1.0, 0.5, { cx: o.x + 200, cy: o.y, cz: o.z + 120, k: 650, rx: -60, ry: 0 }, "power2.inOut");
  api.camTo(R, 1.5, 2.5, { k: 690 }, "sine.inOut");
  api.camTo(R, 4.0, 1.05, { cx: 320, cy: 110, cz: -110, k: 260, rx: -20, ry: 0 }, "power2.inOut");
  api.camTo(R, 5.05, 4.25, { cx: 310, k: 300 }, "sine.inOut");
  api.camTo(R, 9.3, 0.6, { cx: 360, k: 270 }, "sine.inOut");
  api.camTo(R, 9.9, 1.1, { cx: -150, cy: 110, cz: 40, k: 270, rx: -12, ry: 4 }, "power2.inOut");
  var trong = { x: tu0.x - 10, y: tu0.keY - 40, z: tu0.z };
  api.camTo(R, 11.4, 0.6, { cx: trong.x, cy: trong.y, cz: trong.z, k: 720, rx: -10, ry: 6 }, "power2.inOut");
  api.camTo(R, 12.0, 1.1, { k: 760 }, "sine.inOut");
  api.camTo(R, 13.1, 0.7, { cx: -230, cy: 30, cz: 60, k: 460, rx: -8, ry: 4 }, "power2.inOut");
  api.camTo(R, 13.8, 2.4, { cx: -220, k: 530 }, "sine.inOut");
  api.camTo(R, 16.2, 0.5, { cx: -270, cy: 90, k: 470, ry: 3 }, "power2.inOut");
  api.camTo(R, 16.7, 2.35, { k: 520, ry: 2 }, "sine.inOut");

  // ---------------------------------------------------------------- 0–1.0: đóng dấu NOPE một lần
  api.armTo(w, "R", 0.25, 0.2, -165, "power2.out");
  tl.to(dauCam, Object.assign(dau(-165), { duration: 0.2, ease: "power2.out" }), 0.25);
  api.armTo(w, "R", NOPE_TAI - 0.14, 0.14, -40, "power3.in");
  tl.to(dauCam, Object.assign(dau(-40), { duration: 0.14, ease: "power3.in" }), NOPE_TAI - 0.14);
  api.sfx("dau-wob", NOPE_TAI, 0.9);
  tl.set(nope, { opacity: 1 }, NOPE_TAI);
  tl.fromTo(w.lift, { scaleY: 1 }, { scaleY: 0.92, duration: 0.06, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, NOPE_TAI);
  for (var rk = 0; rk < 7; rk++) tl.set(R.stage, { x: (rk % 2 ? -1 : 1) * 6 * (1 - rk / 7), y: (rk % 2 ? 1 : -1) * 2 * (1 - rk / 7) }, NOPE_TAI + rk / 30);
  tl.set(R.stage, { x: 0, y: 0 }, NOPE_TAI + 7 / 30);
  [caBan, chaiBan, nhietBan, toRoiBan, gangBan, muc].forEach(function (el, i) {
    tl.fromTo(el, { y: TY }, { y: TY - 12 - (i % 2) * 6, duration: 0.09, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, NOPE_TAI + 0.02 + i * 0.015);
  });
  api.lids(w, NOPE_TAI, 0.35, 0.08);
  // nhấc dấu thẳng lên, lùi hai bước sang trái (không che chữ)
  api.armTo(w, "R", 0.95, 0.2, -150, "power2.out");
  tl.to(dauCam, Object.assign(dau(-150), { duration: 0.2, ease: "power2.out" }), 0.95);
  api.lids(w, 1.0, 0, 0.12);
  api.walk(w, 1.05, 1.5, LUI.x, LUI.z, { face: -0.3, endFace: 0.3, keepR: true, step: 0.22 });

  // ---------------------------------------------------------------- 1.5–4.0: GIỮ CẬN chữ NOPE sạch (Wob ngoài khung)

  // ---------------------------------------------------------------- 4.0–5.6: về trung cảnh; đặt con dấu xuống bàn
  api.quay(w, 4.0, -0.3, 0.2);
  api.armTo(w, "R", 4.2, 0.3, 20, "power2.inOut");
  tl.to(dauCam, Object.assign(dau(20), { duration: 0.3, ease: "power2.inOut" }), 4.2);
  var dTay = theGioi(LUI.x, LUI.z, "R", 20);
  tl.set(dauCam, { opacity: 0 }, 4.55); tl.set(dauBan, { opacity: 1 }, 4.55);
  tl.fromTo(dauBan, { x: dTay.x, y: dTay.y + 60, z: LUI.z + 5 }, { x: LUI.x + 120, y: TY, z: 60, duration: 0.25, ease: "power2.in", immediateRender: false }, 4.55);
  api.armTo(w, "R", 4.7, 0.3, 0, "power2.inOut");
  api.quay(w, 4.9, 0, 0.25);
  api.look(w, 4.95, 0, 2, 0.2);

  // ---------------------------------------------------------------- 5.9–9.3: nhắm mắt cười (mí khép có nét); mở mắt đúng "earned", gật đầu
  api.nhamMat(w, 5.9, 0.4);
  api.nghieng(w, 6.3, -3, 1.2, "sine.inOut");
  api.nghieng(w, 7.5, 3, 1.2, "sine.inOut");
  api.nghieng(w, 8.7, 0, 0.3, "sine.inOut");
  api.moMat(w, tu.earned - 0.05, 0.25, 0);
  tl.to(w.talk, { rotation: 5, y: 8, svgOrigin: "200 290", duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut" }, tu.earned + 0.15);

  // ---------------------------------------------------------------- 9.3–10.0: gập sổ nhẹ nhàng, vuốt bìa
  api.quay(w, 9.25, 0.5, 0.2);
  api.look(w, 9.25, 12, 8, 0.15);
  so.gapLop(0, 9.3, 0.3);
  api.armTo(w, "R", 9.3, 0.25, -140, "power2.out");
  so.dongBia(9.4, 0.6, "power2.inOut");
  api.sfx("whoosh", 9.45, 0.3);
  api.armTo(w, "R", 9.75, 0.25, -60, "power2.in");
  api.armTo(w, "R", 10.0, 0.12, -70, "sine.inOut");
  api.armTo(w, "R", 10.12, 0.12, -60, "sine.inOut");

  // ---------------------------------------------------------------- 10.0–11.4: đeo găng, cầm cá, tới tủ đông; cửa mở hơi lạnh phả ra; đặt cá
  api.armTo(w, "R", 10.24, 0.2, 0, "power2.inOut");
  api.walk(w, 10.2, 10.55, 40, 70, { face: 0.5, endFace: 0.3, step: 0.18 });
  tl.set(gangBan, { opacity: 0 }, 10.3);
  api.deoGang(w, "L", true, 10.3);
  api.armTo(w, "L", 10.55, 0.15, 10, "power2.inOut");
  var hL0 = api.handWorld("L", 10);
  gsap.set(caCam, api.holdPose("L", 10, hL0[0] - 70, hL0[1] + 20, 0, -1));
  tl.set(caBan, { opacity: 0 }, 10.68); tl.set(caCam, { opacity: 1 }, 10.68);
  api.armTo(w, "L", 10.7, 0.2, 80, "power2.inOut");
  var h80 = api.handWorld("L", 80);
  tl.to(caCam, Object.assign(api.holdPose("L", 80, h80[0] - 90, h80[1], 0, -1), { duration: 0.2, ease: "power2.inOut" }), 10.7);
  w.x = 40; w.z = 70;
  api.walk(w, 10.75, 11.25, TU_VT.x, TU_VT.z, { face: -0.6, endFace: -0.5, keepL: true, step: 0.17 });
  tu0.mo(11.05, 0.45);
  tu0.suong(11.05, 11.75);
  api.sfx("hoi-nuoc", 11.05, 0.45);
  api.look(w, 11.25, -14, 4, 0.15);
  api.armTo(w, "L", 11.3, 0.2, 92, "power2.inOut");
  var h92 = api.handWorld("L", 92);
  tl.to(caCam, Object.assign(api.holdPose("L", 92, h92[0] - 110, h92[1] + 6, 0, -1), { duration: 0.2, ease: "power2.inOut" }), 11.3);
  tl.set(caCam, { opacity: 0 }, 11.5); tl.set(caNghi, { opacity: 1 }, 11.5);
  tl.fromTo(caNghi, { rotationZ: 0, y: -24 }, { rotationZ: 16, y: -2, duration: 0.45, ease: "back.out(2)", immediateRender: false }, 11.5);
  api.armTo(w, "L", 11.6, 0.3, 10, "power2.inOut");
  tl.fromTo(caNghi, { scaleY: 0.78 }, { scaleY: 0.74, duration: 0.6, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 12.1);

  // ---------------------------------------------------------------- 13.0–13.5: đóng cửa tủ
  api.armTo(w, "L", 12.95, 0.2, 70, "power2.out");
  tu0.dong(13.1, 0.3);
  api.armTo(w, "L", 13.4, 0.25, 0, "power2.inOut");

  // ---------------------------------------------------------------- 13.5–16.2: tháo găng, giơ nhiệt kế như cái cân: January tụt, xanh, sương; July vọt, đỏ
  api.deoGang(w, "L", false, 13.5);
  tl.set(gangBan, { opacity: 1 }, 13.5);
  var gT = theGioi(TU_VT.x, TU_VT.z, "L", 0);
  tl.fromTo(gangBan, { x: gT.x, y: gT.y + 40, z: TU_VT.z }, { x: TU_VT.x - 70, y: TY, z: TU_VT.z + 80, duration: 0.25, ease: "power2.in", immediateRender: false }, 13.5);
  api.quay(w, 13.5, 0.4, 0.2);
  api.look(w, 13.5, 10, 12, 0.15);
  api.armTo(w, "R", 13.55, 0.2, 25, "power2.out");
  var h25 = api.handWorld("R", 25);
  gsap.set(nkCam, api.holdPose("R", 25, h25[0], h25[1] + 10, 0));
  tl.set(nhietBan, { opacity: 0 }, 13.78); tl.set(nkCam, { opacity: 1 }, 13.78);
  api.armTo(w, "R", 13.8, 0.3, -100, "back.out(1.4)");
  var h100 = api.handWorld("R", -100);
  tl.to(nkCam, Object.assign(api.holdPose("R", -100, h100[0], h100[1] + 6, 0), { duration: 0.3, ease: "back.out(1.4)" }), 13.8);
  api.quay(w, 13.85, 0.3, 0.2);
  api.look(w, 13.9, 12, -8, 0.15);
  // January: thuỷ ngân tụt sát đáy, bầu xanh, phủ sương
  var JAN = tu.january;
  tl.to(merc, { scaleY: 0.05, svgOrigin: "115 364", duration: 0.25, ease: "power3.in" }, JAN - 0.05);
  tl.to(bau, { attr: { fill: C.ICE2 }, duration: 0.2 }, JAN);
  tl.to(suong, { opacity: 1, duration: 0.2, ease: "power2.out" }, JAN + 0.05);
  api.sfx("drop", JAN + 0.18, 0.45);
  api.nghieng(w, JAN, -6, 0.3, "power2.out");
  api.shiver(w, JAN + 0.2, JAN + 0.7, 2.2);
  // July: vọt kịch nóc, bầu đỏ, sương bay hơi
  var JUL = tu.july;
  api.sfx("rise", JUL - 0.35, 0.4);
  tl.to(merc, { scaleY: 1, svgOrigin: "115 364", duration: 0.3, ease: "back.out(1.6)" }, JUL - 0.05);
  tl.to(bau, { attr: { fill: C.MAT }, duration: 0.15 }, JUL);
  tl.to(suong, { opacity: 0, duration: 0.35, ease: "power2.in" }, JUL + 0.05);
  api.nghieng(w, JUL, 6, 0.3, "power2.out");
  api.look(w, JUL, 12, -12, 0.12);
  api.nghieng(w, 15.95, 0, 0.3, "sine.inOut");

  // ---------------------------------------------------------------- 16.2–19.05: đặt nhiệt kế xuống, nhìn thẳng người xem, giữ hình tới hết
  api.armTo(w, "R", 16.15, 0.3, 25, "power2.inOut");
  tl.to(nkCam, Object.assign(api.holdPose("R", 25, h25[0], h25[1] + 10, 0), { duration: 0.3, ease: "power2.inOut" }), 16.15);
  var nT = theGioi(TU_VT.x, TU_VT.z, "R", 25);
  tl.set(nkCam, { opacity: 0 }, 16.45); tl.set(nhietBan, { opacity: 1 }, 16.45);
  tl.fromTo(nhietBan, { x: nT.x, y: nT.y + 120, z: TU_VT.z + 5 }, { x: TU_VT.x + 150, y: TY, z: TU_VT.z + 70, duration: 0.25, ease: "power2.in", immediateRender: false }, 16.45);
  api.armTo(w, "R", 16.6, 0.25, 0, "power2.inOut");
  api.quay(w, 16.2, 0, 0.25);
  api.look(w, 16.25, 0, 2, 0.15);
  api.lids(w, 17.6, 0.3, 0.2);
  api.blink(w, 18.2, 0.3);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[0, 1.6], [5.8, 9.2], [10.2, 11.3]], amp: 0.8 });
  api.breathe(w, 0, 19.0);
  api.blink(w, 2.2, 0); api.blink(w, 12.4, 0);
};
