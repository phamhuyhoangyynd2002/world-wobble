/* Đoạn d30 (diorama, hiện tại, 25,3 s) – outro ở bàn kỷ vật, buổi sáng (đèn bàn + nắng sớm). Vào từ giấy, ra cắt cứng (chen).
 * Ba lô khổng lồ khô một nửa trên bàn; Wob nhét bàn chải vào → khăn và dép bật ra (boing); "smelled like the sea": sóng giấy nhỏ
 * và vệt mùi bốc ra từ miệng ba lô. "I laid it on the drawing…": ba lô ngả nằm lên trang sổ, phủ kín hình hòn đảo vẽ tay, chỉ còn
 * mép nước lộ ra quanh đáy. "NOPE.": trang hộ chiếu (cùng mẫu thẻ d01) lật vào GIỮA khung, con dấu cao su đập xuống, dấu NOPE
 * chữ 150 px ép bề rộng giữa khung, giữ to 1,45 s, thu về ô dấu, thẻ lật đi (xong 14,25) → rồi Wob mới nhấc ba lô, vỗ nhẹ hình đảo.
 * Lật sổ: hòn đảo kín nhà pop-up bật dựng, bàn tay người giấy xếp san hô ở mép, thuyền giấy chở bồn nước xanh cập vào,
 * đúng "knocking" sóng giấy gõ vào đảo ba lần.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // NOPE, SANTA CRUZ DEL ISLOTE, COLOMBIA, Would Wob move here?

  // ---------------------------------------------------------------- dựng
  var SO = { x: -60, z: -240, w: 500, d: 600 }, PW = SO.w, PD = SO.d;
  var biaTrong = sk("M 60 140 q 30 -16 60 0 t 60 0 t 60 0 M 90 200 q 30 -16 60 0 t 60 0", 4, "#4f8fa8") + fp("M 120 330 L 260 330 L 240 360 L 140 360 Z", "#c99a62", 4) +
    sk("M 190 330 L 190 260 M 190 266 L 236 316 L 190 316", 3) + sk("M 80 470 C 160 440 260 500 380 460", 3, C.INK, ' stroke-dasharray="2 10"');
  var daoVe = api.trangDaoVeSVG(PW, PD, { cx: 250, cy: 300, seed: 7 });
  var popDao = api.lopPopup.tuy(api.daoKinNhaSVG(470, 250, { seed: 404 }), 470, 250, { x: 250, banLe: 10 });
  var ban = api.dungBan({ hop: { x: -620, z: -480 }, wob: { x: 600, z: -280, s: 0.9 }, so: { x: SO.x, z: SO.z, w: PW, d: PD, lop: [popDao], biaTrong: biaTrong } });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";
  gsap.set(so.cover, { rotationY: -180 });
  var lop = so.lop[0];
  gsap.set(lop, { rotationX: 0, visibility: "hidden" });
  var trang = so.veTrang('<g class="p-dao">' + daoVe + '</g><g class="p-bien" opacity="0">' + sk("M 40 520 q 30 -14 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0", 4, "#4f8fa8", ' opacity=".6"') + "</g>");
  var pDao = trang.svg.querySelector(".p-dao"), pBien = trang.svg.querySelector(".p-bien");
  var toLat = so.themTo(daoVe, { ben: "phai" }); toLat.hien(null, false);
  // nắng sớm qua cửa sổ (phải) + đèn bàn
  api.div("dio-ovl", ban.stage, "background:linear-gradient(105deg, rgba(0,0,0,0) 45%, rgba(255,226,160,.16) 70%, rgba(255,236,190,.26) 100%);");

  // ba lô khô một nửa
  var BL = { x: 830, z: -380, s: 0.86 };
  var balo = api.cut(the, 300, 470, api.baLoKhongLoSVG({ uot: 0.45 }), { pos: { x: BL.x, y: TY, z: BL.z, scale: BL.s }, ay: 440, f: api.F.AM });
  var nap = balo.svg.querySelector(".blk-nap"), mieng = balo.svg.querySelector(".blk-mieng");
  var miengW = { x: BL.x, y: TY - (440 - 80) * BL.s, z: BL.z + 10 };
  // bình xịt (tem nguyên) + con dấu trên bàn
  var xit = api.cut(the, 90, 205, '<g transform="translate(45 200)">' + api.binhXitSVG() + "</g>", { pos: { x: 520, y: TY, z: 40, scale: 0.86 }, f: api.F.AM_NHO });
  var dauBan = api.cut(the, 120, 130, '<g transform="translate(60 22)">' + api.conDauSVG() + "</g>", { pos: { x: 690, y: TY, z: 40, scale: 0.9 }, f: api.F.AM_NHO });

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 380, cy: 30, cz: -260, k: 200, rx: -16, ry: -4 });
  api.camTo(R, 0, 7.6, { k: 260, cx: 420 }, "sine.inOut");
  api.camTo(R, 7.6, 0.9, { cx: 260, cy: 120, cz: -250, k: 360, rx: -34, ry: -2 }, "power2.inOut");
  api.camTo(R, 8.5, 5.6, { k: 395 }, "sine.inOut");
  api.camTo(R, 14.1, 1.6, { k: 410 }, "sine.inOut");
  api.camTo(R, 15.7, 0.8, { cx: 320, cy: 110, cz: -250, k: 380, rx: -30, ry: -3 }, "power2.inOut");
  api.camTo(R, 16.5, 0.8, { cx: 200, cy: 120, cz: -200, k: 520, rx: -16, ry: 0 }, "power2.inOut");
  api.camTo(R, 17.3, DUR - 17.3, { k: 590, cx: 210 }, "sine.inOut");

  // ---------------------------------------------------------------- 0.85–7.6 nhét đồ: một món vào, hai món bật ra; mùi biển
  api.quaySet(w, 0.5);
  gsap.set([w.pupL, w.pupR], { x: 12, y: 4 });
  gsap.set(nap, { rotation: -38, svgOrigin: "60 64" }); gsap.set(mieng, { opacity: 1 });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="bc">' + api.banChaiSVG() + "</g>");
  var bc = w.holdR.querySelector(".bc");
  gsap.set(bc, api.holdPose("R", 0, 330, 300, -80));
  var tPack = tu.packing || 1.89;
  api.armTo(w, "R", tPack - 0.4, 0.4, -130, "power2.out");
  tl.to(bc, Object.assign(api.camDai("R", -130, -90, 40), { duration: 0.4, ease: "power2.out" }), tPack - 0.4);
  var bay = api.cut(the, 170, 40, '<g transform="translate(85 20)">' + api.banChaiSVG() + "</g>", { pos: { x: 0, y: 0, z: 0 }, ax: 85, ay: 20, f: api.F.AM_NHO });
  gsap.set(bay, { opacity: 0 });
  var tNem = tPack + 0.15, tay = api.wobTheGioi(w, 360, 120);
  tl.set(bc, { opacity: 0 }, tNem); tl.set(bay, { opacity: 1 }, tNem);
  tl.fromTo(bay, { x: tay.x, y: tay.y, z: w.z }, { x: miengW.x, z: miengW.z, duration: 0.45, ease: "power1.inOut", immediateRender: false }, tNem);
  tl.fromTo(bay, { y: tay.y }, { y: miengW.y - 120, duration: 0.22, ease: "power2.out", immediateRender: false }, tNem);
  tl.to(bay, { y: miengW.y + 40, rotationZ: 80, duration: 0.23, ease: "power2.in" }, tNem + 0.22);
  tl.set(bay, { opacity: 0 }, tNem + 0.45);
  api.armTo(w, "R", tNem + 0.1, 0.3, -40, "power2.inOut");
  // hai món bật ra
  var tBat = tNem + 0.62;
  var khan = api.cut(the, 160, 130, api.khanDoSVG(), { pos: { x: 0, y: 0, z: 0 }, ax: 80, ay: 120, f: api.F.AM_NHO });
  var dep = api.cut(the, 90, 40, '<g transform="translate(45 26)">' + api.depLeSVG("#e7b34b") + "</g>", { pos: { x: 0, y: 0, z: 0 }, ax: 45, ay: 34, f: api.F.AM_NHO });
  gsap.set([khan, dep], { opacity: 0 });
  [[khan, 690, -220, -14], [dep, 980, -150, 24]].forEach(function (m, i) {
    var t0 = tBat + i * 0.12;
    tl.set(m[0], { opacity: 1 }, t0);
    tl.fromTo(m[0], { x: miengW.x, z: miengW.z, rotationZ: 0 }, { x: m[1], z: m[2], rotationZ: m[3] * 3, duration: 0.6, ease: "power1.out", immediateRender: false }, t0);
    tl.fromTo(m[0], { y: miengW.y }, { y: miengW.y - 160, duration: 0.28, ease: "power2.out", immediateRender: false }, t0);
    tl.to(m[0], { y: TY, duration: 0.32, ease: "bounce.out" }, t0 + 0.28);
    tl.to(m[0], { rotationZ: m[3], duration: 0.2 }, t0 + 0.6);
  });
  api.sfx("boing", tBat, 0.5);
  tl.fromTo(balo, { scaleY: BL.s }, { scaleY: BL.s * 1.05, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, tBat - 0.05);
  api.look(w, tBat + 0.1, 6, -12, 0.12, 1.1);
  api.look(w, tBat + 0.5, -10, 10, 0.2);
  var tLearn = tu.learned || 4.13, tHadnt = tu.hadnt || 5.49;
  api.quay(w, tLearn, 0.55, 0.25); api.look(w, tLearn, 14, 2, 0.2);
  api.quay(w, tHadnt - 0.2, 0, 0.25); api.look(w, tHadnt - 0.15, 0, 3, 0.15); api.lids(w, tHadnt - 0.1, 0.5, 0.15);
  // mùi biển: sóng giấy + vệt mùi bốc lên
  var tSmell = tu.smelled || 6.69;
  var song = api.cut(the, 220, 200, fp("M 20 190 C 20 120 70 70 130 60 C 180 52 210 80 196 110 C 184 132 150 120 156 100 C 120 104 96 140 100 190 Z", "#5aa9c9", 5) +
    sk("M 60 160 C 70 120 100 96 130 88", 4, "#bfe6f2") + sk("M 40 50 C 30 30 50 20 40 0 M 100 40 C 90 20 110 10 100 -10 M 160 40 C 150 20 170 10 160 -10", 4, "#7bb0a0", ' opacity=".9"'),
    { pos: { x: miengW.x, y: miengW.y + 10, z: miengW.z + 6, scale: 0.9 }, ay: 190, f: api.F.AM_NHO });
  gsap.set(song, { opacity: 0, scaleY: 0.2 });
  tl.to(song, { opacity: 1, scaleY: 0.9, duration: 0.45, ease: "back.out(2)" }, tSmell - 0.3);
  tl.to(song, { y: miengW.y - 30, duration: 1.0, ease: "sine.inOut" }, tSmell - 0.3);
  tl.to(song, { opacity: 0, scaleY: 0.3, duration: 0.3, ease: "power2.in" }, tSmell + 0.9);
  api.sfx("song", tSmell - 0.3, 0.45);
  api.nghieng(w, tSmell - 0.1, -6, 0.25); api.nghieng(w, tSmell + 0.8, 0, 0.3);
  api.lids(w, tSmell, 0.65, 0.2); api.lids(w, tSmell + 0.9, 0.2, 0.2);
  tl.to(nap, { rotation: 0, svgOrigin: "60 64", duration: 0.25 }, 7.5); tl.set(mieng, { opacity: 0 }, 7.6);

  // ---------------------------------------------------------------- 8.0–11.4 ba lô ngả nằm lên hình đảo, phủ kín
  var tLaid = tu.laid || 8.15, tCov = tu.covered || 10.75;
  var nam = so.diemTrang(250, PD / 2 - 90);
  api.walk(w, 7.6, 8.3, 620, -200, { face: -0.4, endFace: -0.5, step: 0.25 });
  api.armTo(w, "L", 8.0, 0.3, 140, "power2.out"); api.armTo(w, "R", 8.0, 0.3, -150, "power2.out");
  tl.to(balo, { x: nam.x, z: nam.z, duration: 1.0, ease: "power2.inOut" }, tLaid);
  tl.to(balo, { y: TY - 70, duration: 0.5, ease: "power2.out" }, tLaid);
  tl.to(balo, { y: TY, duration: 0.5, ease: "power2.in" }, tLaid + 0.5);
  tl.to(balo, { rotationX: 84, y: TY - 14, duration: 0.7, ease: "power2.in" }, tCov - 0.9);
  tl.to(balo, { rotationX: 90, duration: 0.2, ease: "bounce.out" }, tCov - 0.2);
  api.armTo(w, "L", tLaid + 1.0, 0.4, 20, "power2.inOut"); api.armTo(w, "R", tLaid + 1.0, 0.4, -20, "power2.inOut");
  api.look(w, tCov - 0.4, -14, 12, 0.2);

  // ---------------------------------------------------------------- 11.4–14.25 NOPE: hộ chiếu giữa khung, đóng dấu, giữ to, thu về ô
  var tNope = tu.nope || 12.25, tDap = tNope - 0.07;
  var hc = api.theHoChieu({ noi: chu[1], noiDong: ["SANTA CRUZ", "DEL ISLOTE"], nuoc: chu[2], hoi: chu[3], x: 558, y: 200, bo: api.HC_LON }); // cùng cỡ chữ thẻ d01
  hc.vao(tDap - 0.8, 0.42);
  api.sfx("lat-giay", tDap - 0.8, 0.6);
  var ov = api.div("dio-ovl", api.root, "z-index:42;");
  ov.innerHTML = '<svg width="1920" height="1080" viewBox="0 0 1920 1080" style="position:absolute;left:0;top:0;overflow:visible" data-layout-allow-overflow>' +
    '<g class="dau-to">' + api.dauEpSVG(chu[0], 0, 0, 150, -8, "dau-nope") + "</g>" +
    '<g class="dau-cs"><g transform="scale(2.6)">' + api.conDauSVG() + "</g></g></svg>";
  var dauTo = ov.querySelector(".dau-to"), dauCs = ov.querySelector(".dau-cs");
  var TAM = [960, 470], O = hc.o();
  gsap.set(dauTo, { x: TAM[0], y: TAM[1], opacity: 0, scale: 1 });
  gsap.set(dauCs, { x: 1500, y: 1300, rotation: 25, opacity: 0 });
  tl.set(dauCs, { opacity: 1 }, tDap - 0.42);
  tl.to(dauCs, { x: TAM[0], y: TAM[1] - 96 * 2.6, rotation: 0, duration: 0.3, ease: "power2.out" }, tDap - 0.42);
  tl.to(dauCs, { y: TAM[1] - 96 * 2.6 - 40, duration: 0.08, ease: "power1.out" }, tDap - 0.12);
  tl.to(dauCs, { y: TAM[1] - 96 * 2.6 + 6, duration: 0.05, ease: "power3.in" }, tDap - 0.05);
  tl.set(dauTo, { opacity: 1 }, tDap);
  tl.to(dauCs, { x: 1560, y: 1250, rotation: 30, duration: 0.32, ease: "power2.in" }, tDap + 0.1);
  tl.set(dauCs, { opacity: 0 }, tDap + 0.44);
  tl.fromTo(dauTo, { scale: 1.08 }, { scale: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, tDap);
  api.sfx("dau-wob", tDap, 0.9);
  // giữ dấu to ≥ 3 s, chồng qua "That stamp is about me, not the island", thu về sau chữ "island"
  var tIsland = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (/^island/i.test(x.text) && x.start > 13 && tIsland === null) tIsland = x.start; }); }); if (tIsland === null) tIsland = 14.85;
  var tThu = Math.max(tDap + 3.02, tIsland + 0.3);
  tl.to(dauTo, { x: O[0], y: O[1], scale: 0.27, duration: 0.3, ease: "power2.inOut" }, tThu);
  // dấu nhỏ nằm lại trong ô dấu của thẻ (lật đi cùng thẻ)
  hc.svg.insertAdjacentHTML("beforeend", '<g class="dau-o" opacity="0"><g transform="translate(' + hc.bo.o[0] + " " + hc.bo.o[1] + ') scale(.27)">' + api.dauEpSVG(chu[0], 0, 0, 150, -8, "dau-nho") + "</g></g>");
  tl.set(hc.svg.querySelector(".dau-o"), { opacity: 1 }, tThu + 0.3); tl.set(dauTo, { opacity: 0 }, tThu + 0.3);
  hc.ra(tThu + 0.34, 0.3);
  api.sfx("lat-giay", tThu + 0.34, 0.4);
  // Wob cầm con dấu trên bàn trong lúc đó (bị thẻ che), đặt lại sau
  tl.set(dauBan, { opacity: 0 }, tDap - 0.5); tl.set(dauBan, { opacity: 1 }, tThu + 0.5);

  // ---------------------------------------------------------------- 13.06–15.5 "That stamp is about me, not the island": Wob ló bên cạnh dấu, chỉ vào mình
  var tMe = null, tNot = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (/^me/i.test(x.text) && x.start > 12 && tMe === null) tMe = x.start; if (/^not$/i.test(x.text) && x.start > 12 && tNot === null) tNot = x.start; }); }); tMe = tMe || 13.99; tNot = tNot || 14.6;
  api.quay(w, 12.9, -0.2, 0.25); api.look(w, 12.95, -14, -6, 0.2);
  api.armTo(w, "R", tMe - 0.3, 0.3, 72, "back.out(1.6)");                    // ngón tay chỉ vào chính mình
  api.lids(w, tMe - 0.2, 0.3, 0.2); api.look(w, tMe - 0.2, -4, -14, 0.2);    // mặt ngẫm nghĩ
  api.nghieng(w, tMe, 5, 0.3);
  api.armTo(w, "R", tNot - 0.1, 0.3, 0, "power2.inOut");
  api.armTo(w, "L", tNot - 0.1, 0.3, 75, "power2.out");                      // chỉ sang hình hòn đảo (dưới ba lô)
  api.look(w, tNot, -16, 14, 0.2); api.nghieng(w, tNot, 0, 0.3);
  [0, 1, 2, 3].forEach(function (i) { api.quay(w, tIsland + 0.05 + i * 0.12, i % 2 ? -0.1 : -0.5, 0.12); });   // lắc đầu
  api.lids(w, tIsland + 0.5, 0, 0.2);

  // ---------------------------------------------------------------- 15.6– nhấc ba lô khỏi trang, lật sổ
  var tLift = tThu + 0.4;
  api.armTo(w, "L", tLift, 0.25, 130, "power2.out"); api.armTo(w, "R", tLift, 0.25, -150, "power2.out");
  tl.to(balo, { rotationX: 0, y: TY, duration: 0.4, ease: "power2.out" }, tLift + 0.05);
  tl.to(balo, { x: BL.x, z: BL.z, duration: 0.6, ease: "power2.inOut" }, tLift + 0.3);
  api.armTo(w, "R", tLift + 0.7, 0.3, 0, "power2.inOut");
  var tL = tLift + 0.6;
  toLat.hien(tL, true); toLat.lat(tL, 0.55, "trai"); toLat.hien(tL + 0.55, false);
  tl.set(pDao, { opacity: 0 }, tL); tl.set(pBien, { opacity: 1 }, tL);
  tl.set(lop, { visibility: "visible" }, tL);
  api.sfx("lat-giay", tL, 0.55);
  api.armTo(w, "L", tL - 0.1, 0.2, 60, "power2.out"); api.armTo(w, "L", tL + 0.1, 0.4, 150, "sine.inOut"); api.armTo(w, "L", tL + 0.55, 0.3, 20, "power2.inOut");
  so.batLop(0, tL + 0.45, 0.45);
  api.sfx("pop", tL + 0.6, 0.4);
  api.look(w, tL + 0.6, -16, 6, 0.2);
  // bàn tay người giấy xếp san hô ở mép đảo (dạng chung, không mặt)
  var tayGiay = function (o) {
    return fp("M -22 0 C -24 -26 -12 -40 0 -40 C 12 -40 24 -26 22 0 Z", "#e9c79a", 3.5) + sk("M -10 -40 L -12 -54 M -2 -40 L -2 -58 M 8 -40 L 10 -54", 6, "#e9c79a") + sk("M -10 -40 L -12 -54 M -2 -40 L -2 -58 M 8 -40 L 10 -54", 1.6, C.INK, ' opacity=".6"') +
      fp("M -26 4 L 26 4 L 22 22 L -22 22 Z", "#e8a0a0", 3.5) + '<circle cx="-10" cy="12" r="2.5" fill="#b86b6b"/><circle cx="6" cy="14" r="2.5" fill="#b86b6b"/><circle cx="14" cy="9" r="2" fill="#b86b6b"/>';
  };
  var dTay = so.diemLop(0, 70, 196);
  var sanHo = api.cut(the, 80, 100, '<g transform="translate(40 70)">' + tayGiay() + "</g>", { pos: { x: dTay.x, y: dTay.y, z: dTay.z + 14, scale: 0.8 }, ay: 92, f: api.F.AM_NHO });
  gsap.set(sanHo, { opacity: 0 });
  var tCoral = tu.coral || 19.52, tHand = tu.hand || 20.27;
  [[tCoral - 0.5, 0], [tHand - 0.4, 40]].forEach(function (k, i) {
    tl.set(sanHo, { opacity: 1 }, k[0]);
    tl.fromTo(sanHo, { y: dTay.y - 90, x: dTay.x + k[1] }, { y: dTay.y, x: dTay.x + k[1], duration: 0.35, ease: "power2.inOut", immediateRender: false }, k[0]);
    tl.to(sanHo, { y: dTay.y - 4, duration: 0.08, yoyo: true, repeat: 1 }, k[0] + 0.35);
  });
  tl.to(sanHo, { y: dTay.y - 120, opacity: 0, duration: 0.3, ease: "power2.in" }, tHand + 0.4);
  // khối san hô nằm lại ở mép
  var khoi = api.cut(the, 120, 30, fp("M 6 28 L 6 8 L 54 8 L 54 28 Z M 60 28 L 60 10 L 108 10 L 108 28 Z", "#e8a0a0", 3.5), { pos: { x: dTay.x + 30, y: dTay.y + 8, z: dTay.z + 10, scale: 0.7 }, f: api.F.AM_NHO });
  gsap.set(khoi, { opacity: 0 }); tl.set(khoi, { opacity: 1 }, tHand + 0.05);
  // thuyền giấy chở bồn nước xanh cập vào
  var tWater = tu.water || 22.02, tBoat = tu.boat || 23.15;
  var thuyen = api.cut(the, 170, 120, fp("M 8 80 L 162 80 L 146 112 L 22 112 Z", "#9c6b42", 5) + sk("M 16 92 L 154 92", 3, "#e9c79a") +
    fp("M 50 80 L 50 30 C 50 18 120 18 120 30 L 120 80 Z", "#3f7fd0", 5) + '<ellipse cx="85" cy="28" rx="35" ry="9" fill="#6fa6e6" stroke="' + C.INK + '" stroke-width="4"/>' + sk("M 56 46 L 114 46 M 56 62 L 114 62", 3, "#2f5f9f"),
    { pos: { x: 0, y: 0, z: 0, scale: 0.75 }, ay: 104, f: api.F.AM_NHO });
  var bo = so.diemLop(0, 430, 222);
  gsap.set(thuyen, { x: bo.x + 360, y: bo.y, z: bo.z + 40, opacity: 0 });
  tl.set(thuyen, { opacity: 1 }, tWater - 0.4);
  tl.fromTo(thuyen, { x: bo.x + 360, y: bo.y, z: bo.z + 40 }, { x: bo.x + 40, duration: 1.4, ease: "power2.out", immediateRender: false }, tWater - 0.4);
  tl.fromTo(thuyen, { rotationZ: -3 }, { rotationZ: 3, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, tWater - 0.4);
  api.sfx("song", tBoat - 0.2, 0.3);
  api.look(w, tWater - 0.3, -10, 8, 0.25);
  // sóng giấy gõ vào đảo ba lần đúng "knocking"
  // ba tiếng gõ bắt đầu từ chữ "sea" (lần đọc thứ hai, ≈ 23,99 s) để tiếng thứ ba không sát chỗ cắt
  var tSea = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (/^sea/i.test(x.text) && x.start > 20 && tSea === null) tSea = x.start; }); }); if (tSea === null) tSea = 22.01;
  var sg = lop.svg.querySelector(".dao-song");
  [0, 0.28, 0.56].forEach(function (d) {
    tl.fromTo(sg, { x: 0 }, { x: 10, duration: 0.09, ease: "power2.in", yoyo: true, repeat: 1, immediateRender: false }, tSea + d);
    tl.fromTo(lop, { x: 250 }, { x: 247, duration: 0.05, yoyo: true, repeat: 1, immediateRender: false }, tSea + d + 0.08);
  });
  api.sfx("song", tSea, 0.35);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[tDap - 0.2, tDap + 0.5]] });
  api.breathe(w, 0, DUR);
  api.blink(w, 3.6, 0); api.blink(w, 9.4, 0); api.blink(w, 19.0, 0.3); api.blink(w, 22.8, 0.3);
};
