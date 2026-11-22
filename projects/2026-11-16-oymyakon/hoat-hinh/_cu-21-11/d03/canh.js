/* Đoạn d03 (diorama, hiện tại, 14,41 s): cắt về bàn. Wob (cá tựa vai, găng lò nướng) kể "By the end of the trip…",
 * liếc ba lô; lắc đầu chậm "It isn't the cold", gõ nhẹ con cá; lạch bạch tới hộp kỷ vật chạm chai nước nhỏ đông cứng:
 * chai lóe sáng (không giải thích); liếc ba lô, nhìn người xem nhướng mắt; về cạnh sổ, lật trang sang trang trắng, rút bút chì
 * từ ống bút; đầu bút chạm trang, camera lao xuống trang trắng → giấy phẳng (nối giay). Không chữ trên đồ vật.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });

  // ---------------------------------------------------------------- bố cục bàn kỷ vật chung của tập (giống d01)
  var BO_CUC = {
    hop: { x: -200, z: -400, w: 300, d: 220, h: 150, do: ["anh"] },
    so: { x: 480, z: -330, w: 460, d: 580 },
    baLo: { x: -660, z: -250, s: 0.85 },
    ongBut: { x: -760, z: 430 },
    ongButNho: { x: 430, z: 140, s: 0.75 },
    HOME: { x: 150, z: 0 }
  };
  var ban = api.dungBan({
    hop: BO_CUC.hop, baLo: BO_CUC.baLo, ongBut: BO_CUC.ongBut, ongButNho: BO_CUC.ongButNho,
    wob: { x: BO_CUC.HOME.x, z: BO_CUC.HOME.z, s: 0.9 },
    caCung: true,
    so: { x: BO_CUC.so.x, z: BO_CUC.so.z, w: BO_CUC.so.w, d: BO_CUC.so.d, lop: [], moSan: true }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w); // mắt không bao giờ lộ hai vòng rỗng khi nháy, nhắm (dio-dao-cu.js)
  api.cut(ban.trongHop, 170, 120, api.toRoiSVG(), { pos: { x: 70, y: -8, z: -30, rotationZ: 8, scale: 0.75 }, f: api.F.AM_NHO });
  var chai = api.cut(ban.trongHop, 90, 170, api.chaiNuocSVG(false), { pos: { x: -95, y: -12, z: 20 }, f: api.F.AM_NHO });
  // quầng sáng của chai đặt trước vách hộp (chai nằm trong hộp, vách che mất quầng gốc)
  var loe = api.cut(the, 260, 260, '<circle cx="130" cy="130" r="128" fill="url(#dio-glowW)"/>', { pos: { x: BO_CUC.hop.x - 95, y: 90, z: BO_CUC.hop.z + BO_CUC.hop.d / 2 + 6 }, ay: 130 });
  gsap.set(loe, { opacity: 0 });
  api.deoGang(w, "L", true);
  // trang "kế hoạch" của d01 (chữ viết nguệch ngoạc không đọc được + gạch chân hai lần); lật đi thì lộ trang trắng
  var to = so.themTo(
    api.sk("M 60 300 c 14 -22 22 18 36 0 s 22 -20 34 2 s 20 -14 32 -2 m 16 0 c 12 -20 22 14 34 -2 s 22 -18 36 0 s 20 -12 30 0 s 18 -16 28 -2", 5, C.INK, ' transform="rotate(-4 230 290)"') +
    api.sk("M 40 322 C 140 314 300 318 420 312 M 52 340 C 160 332 290 338 410 330", 5, C.MAT, ' transform="rotate(-4 230 290)"') +
    api.sk("M 70 150 C 120 120 170 170 220 140 S 330 120 380 150", 3, C.ICE2, ' opacity=".7"') +
    api.fp("M 360 430 l 40 -60 l 40 60 Z", C.SNOW, 3) + api.sk("M 80 470 l 40 0 M 100 450 l 0 40", 4, C.ICE2),
    { ben: "phai", sau: "" });
  // bút chì trong ống bút nhỏ (rút ra ở 11.4)
  var OB = BO_CUC.ongButNho;
  var butOng = api.cut(the, 40, 170, '<g transform="translate(20 80) rotate(-90)">' + api.butChiSVG() + "</g>", { pos: { x: OB.x + 6, y: TY - 70, z: OB.z - 4, rotationZ: 6, scale: 0.75 }, f: api.F.AM_NHO });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="but-cam">' + api.butChiSVG() + "</g>");
  var butCam = w.holdR.querySelector(".but-cam");
  gsap.set(butCam, { opacity: 0 });

  // ---------------------------------------------------------------- tư thế đầu (như cuối d01: cá tựa vai)
  api.armSet(w, "L", 168);
  gsap.set(ban.ca, api.holdPose("L", 168, 76, 20, -100));

  // ---------------------------------------------------------------- camera
  var mat = { x: BO_CUC.HOME.x, y: TY - 200 * 0.9, z: 0 };
  api.camSet(R, null, { cx: mat.x - 60, cy: mat.y + 40, cz: -40, k: 380, rx: -9, ry: 6 });
  api.camTo(R, 0, 3.0, { cx: mat.x - 20, k: 450, ry: 4 }, "sine.inOut");
  api.camTo(R, 3.0, 1.2, { k: 480, ry: 2 }, "sine.inOut");
  api.camTo(R, 4.2, 0.95, { cx: -330, cy: 50, cz: -280, k: 330, rx: -12, ry: 6 }, "power2.inOut");
  api.camTo(R, 5.15, 0.25, { cx: -310, k: 410, ry: 4 }, "sine.inOut");
  // nhấc chai lên: camera đẩy ~0,6 %/khung vào chai đang sáng
  api.camTo(R, 5.4, 1.0, { cx: -315, cy: 40, cz: -220, k: 570, ry: 3 }, "sine.inOut");
  api.camTo(R, 6.4, 0.3, { k: 585 }, "sine.inOut");
  api.camTo(R, 6.7, 0.6, { cx: -500, cy: 30, cz: -240, k: 300, ry: 8 }, "power2.inOut");
  api.camTo(R, 7.3, 1.4, { k: 350 }, "sine.inOut");
  api.camTo(R, 8.7, 1.0, { cx: 330, cy: 40, cz: -60, k: 300, rx: -14, ry: -2 }, "power2.inOut");
  api.camTo(R, 9.7, 2.6, { cx: 360, k: 360, rx: -22 }, "sine.inOut");
  var dich = so.diemTrang(-140, 30);
  api.camTo(R, 12.6, 1.75, { cx: dich.x, cy: dich.y, cz: dich.z, k: 1110, rx: -80, ry: 0 }, "power3.in");
  api.sfx("whoosh", 12.75, 0.45);

  // ---------------------------------------------------------------- 0–3.3: kể, liếc ba lô rồi nhìn người xem
  api.quay(w, 0.5, -0.5, 0.3);
  api.look(w, 0.5, -12, 2, 0.2);
  api.quay(w, 1.5, 0, 0.3);
  api.look(w, 1.55, 0, 2, 0.2);

  // ---------------------------------------------------------------- 3.3–4.2: "It isn't the cold." lắc đầu chậm, gõ nhẹ con cá
  api.quay(w, tu.isnt - 0.05, -0.25, 0.22, "sine.inOut");
  api.quay(w, tu.isnt + 0.2, 0.25, 0.25, "sine.inOut");
  api.quay(w, tu.isnt + 0.48, 0, 0.22, "sine.inOut");
  api.armTo(w, "R", 3.75, 0.2, 140, "power2.out");
  api.armTo(w, "R", 3.98, 0.08, 132, "power1.inOut");
  api.armTo(w, "R", 4.06, 0.1, 140, "power1.inOut");
  api.armTo(w, "R", 4.18, 0.2, 0, "power2.inOut");
  api.look(w, 3.75, -8, -10, 0.15);

  // ---------------------------------------------------------------- 4.25–6.7: lạch bạch tới hộp, chạm chai nước đông cứng: chai lóe sáng
  api.walk(w, 4.2, 5.15, -470, -200, { face: -0.5, endFace: 0.45, keepL: true, step: 0.19 });
  api.look(w, 5.1, 10, -10, 0.2);
  api.armTo(w, "R", 5.15, 0.25, -115, "power2.out");
  // nhấc chai nước đông cứng lên khỏi hộp 0,8 s, chai sáng nhẹ (bloom), rồi đặt lại
  w.holdR.insertAdjacentHTML("afterbegin", '<g class="chai-cam"><circle class="loe2" cx="0" cy="-10" r="150" fill="url(#dio-glowW)" opacity="0"/><g transform="translate(-45 -85)">' + api.chaiNuocSVG(false) + "</g></g>");
  var chaiCam = w.holdR.querySelector(".chai-cam"), loeCam = chaiCam.querySelectorAll(".chai-loe, .loe2");
  var h115 = api.handWorld("R", -115), h135 = api.handWorld("R", -135);
  gsap.set(chaiCam, Object.assign(api.holdPose("R", -115, h115[0], h115[1] + 120, 0), { opacity: 0 }));
  tl.set(chai, { opacity: 0 }, 5.4); tl.set(chaiCam, { opacity: 1 }, 5.4);
  api.armTo(w, "R", 5.4, 0.22, -135, "power2.out");
  tl.to(chaiCam, Object.assign(api.holdPose("R", -135, h135[0], h135[1] + 6, 0), { duration: 0.22, ease: "power2.out" }), 5.4);
  api.sfx("ting", 5.6, 0.45);
  tl.fromTo(loeCam, { opacity: 0 }, { opacity: 0.9, duration: 0.25, ease: "power2.out", immediateRender: false }, 5.5);
  tl.to(loeCam, { opacity: 0.55, duration: 0.45, ease: "sine.inOut" }, 5.75);
  tl.to(loeCam, { opacity: 0, duration: 0.3, ease: "sine.inOut" }, 6.2);
  tl.fromTo(chaiCam.lastChild, { rotation: 0 }, { rotation: 4, svgOrigin: "45 168", duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 5.75);
  api.armTo(w, "R", 6.2, 0.25, -115, "power2.inOut");
  tl.to(chaiCam, Object.assign(api.holdPose("R", -115, h115[0], h115[1] + 120, 0), { duration: 0.25, ease: "power2.inOut" }), 6.2);
  tl.set(chaiCam, { opacity: 0 }, 6.45); tl.set(chai, { opacity: 1 }, 6.45);
  api.lids(w, 5.55, 0, 0.1);
  tl.fromTo([w.pupL, w.pupR], { scale: 1 }, { scale: 1.25, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", immediateRender: false }, 5.55);
  api.armTo(w, "R", 6.47, 0.25, -10, "power2.inOut");

  // ---------------------------------------------------------------- 6.7–8.6: liếc ba lô, nhìn người xem, nhướng mắt (không lộ đáp án)
  api.quay(w, 6.75, -0.6, 0.3);
  api.look(w, 6.75, -14, 0, 0.2, 1);
  api.quay(w, 7.45, 0, 0.3);
  api.look(w, 7.5, 0, 2, 0.2);
  api.lids(w, 7.5, 0.35, 0.15);
  api.lids(w, tu.unpacking, 0, 0.1);
  api.look(w, tu.unpacking, 0, -7, 0.12);
  tl.fromTo(w.lift, { y: 0 }, { y: -10, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, tu.unpacking);
  api.look(w, 8.55, 0, 2, 0.2);

  // ---------------------------------------------------------------- 8.7–9.7: về cạnh sổ
  api.walk(w, 8.55, 9.75, 300, 0, { face: 0.5, endFace: 0.4, keepL: true, step: 0.25 });

  // ---------------------------------------------------------------- 10.5–11.3: "Getting there took a while." lật trang sang trang trắng
  api.look(w, 10.0, 12, 6, 0.2);
  api.armTo(w, "R", 10.45, 0.25, -125, "power2.out");
  to.lat(10.6, 0.6, "trai");
  api.sfx("whoosh", 10.65, 0.4);
  api.armTo(w, "R", 10.75, 0.35, -40, "power2.inOut");

  // ---------------------------------------------------------------- 11.3–12.1: rút bút chì từ ống bút
  api.quay(w, 11.2, 0.6, 0.25);
  api.armTo(w, "R", 11.25, 0.25, -62, "power2.out");
  tl.set(butOng, { opacity: 0 }, 11.5);
  gsap.set(butCam, api.camDai("R", -62, -100, 40));
  tl.set(butCam, { opacity: 1 }, 11.5);
  api.armTo(w, "R", 11.55, 0.3, -150, "back.out(1.6)");
  tl.to(butCam, Object.assign(api.camDai("R", -150, -60, 40), { duration: 0.3, ease: "back.out(1.6)" }), 11.55);
  api.look(w, 11.6, 10, -10, 0.15);
  // 12.1–12.7: đầu bút chạm trang
  api.armTo(w, "R", 12.2, 0.35, -40, "power2.inOut");
  tl.to(butCam, Object.assign(api.camDai("R", -40, 115, 40), { duration: 0.35, ease: "power2.inOut" }), 12.2);
  api.look(w, 12.2, 8, 10, 0.2);
  tl.fromTo(w.lift, { y: 0 }, { y: 5, duration: 0.06, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, 12.55);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[3.3, 4.3], [4.25, 5.2], [8.7, 9.7]], amp: 0.8 });
  api.breathe(w, 0, 14.2);
  api.blinks(w, 0.2, 4.2, [[3.3, 4.2]], 0);
  api.blink(w, 9.9);
};
