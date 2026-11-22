/* Đoạn d38 (diorama, hiện tại, 9,37 s) – outro phần 1, lời cảnh 19 viết lại (19/11/2026).
 * Từ giấy phẳng camera lùi từ trang sổ ra toàn bàn; Wob nhìn người xem, rồi xếp nhanh nhiệt kế vẽ tay và tờ rơi lễ hội thành
 * hàng (pop pop). "The cold was never the reason to come." rút chai nước đã tan từ ba lô, lắc cạnh tai: óc ách, hài lòng, đặt
 * vào giữa hàng; pop-up nhà gỗ quanh suối bốc hơi bật trên sổ. "It was the price of staying." đeo găng, đặt con cá cạnh chai:
 * cộc; camera đẩy chậm vào cặp cá – chai. "Would I move there?" tháo găng, rút con dấu, dòng "Would Wob move here?" rõ trên
 * trang, hà hơi vào mặt dấu. "The springs are lovely." gật đầu nhìn chai nước. "The summer surprised me." liếc mũ hè trùm lông
 * treo ở góc kệ, nhướng mắt, cười; con dấu vẫn trong tay phải (nối d40). Mắt luôn đủ lòng trắng (không khép mí lâu).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // ["Would Wob move here?"]

  // ---------------------------------------------------------------- bố cục bàn kỷ vật chung của tập (giống d01, d18) + đồ outro
  var BO_CUC = {
    hop: { x: -200, z: -400, w: 300, d: 220, h: 150, do: ["anh"] },
    so: { x: 480, z: -330, w: 460, d: 580 },
    baLo: { x: -660, z: -250, s: 0.85 },
    ongBut: { x: -760, z: 430 },
    ongButNho: { x: 430, z: 140, s: 0.75 },
    HOME: { x: 150, z: 0 },
    CA_BAN: { x: -20, z: 10 }, GANG_BAN: { x: -235, z: 40 },
    tuDong: { x: -560, z: -40 },
    // hàng kỷ vật (trái → phải): nhiệt kế, tờ rơi, chai nước, cá (giống d40)
    HANG: { nhiet: { x: -170, z: 215 }, toRoi: { x: -75, z: 210 }, chai: { x: 40, z: 205 }, ca: { x: 190, z: 225 } },
    GANG2: { x: -80, z: 120 }, MUC: { x: 360, z: 45 },
    MU: { x: 1000, y: -262, z: -1270 }
  };
  var L = api.lopPopup, s = 0.9, H = BO_CUC.HANG;
  // trang trái (mặt trong bìa): dòng in sẵn + ô chờ con dấu ở nửa trái (Wob với tới từ phía trái; giống d40)
  var trangTrai = api.sk("M 360 140 l 0 -60 M 330 110 l 60 0 M 339 89 l 42 42 M 381 89 l -42 42", 5, C.ICE2) +
    api.txt(230, 318, 38, 700, chu[0], C.INK) + api.sk("M 40 346 L 420 346", 3, C.INK, ' opacity=".5"') +
    '<rect x="26" y="378" width="236" height="150" rx="10" fill="none" stroke="' + C.INK + '" stroke-width="3" stroke-dasharray="8 8" opacity=".45"/>';
  var hoiSuoi = [api.cotKhoi({ x: 120, y: 176, cao: 80, r0: 8, no: 1.3, troi: 10, n: 10, per: 2.4, loai: "hoi", seed: 31 }),
    api.cotKhoi({ x: 260, y: 180, cao: 70, r0: 7, no: 1.3, troi: -8, n: 10, per: 2.1, loai: "hoi", seed: 32 })];
  var langSuoi = api.fp("M 0 200 L 0 168 Q 210 140 420 168 L 420 200 Z", C.SNOW, 4) +
    api.fp("M 30 192 C 110 170 180 196 250 180 S 360 170 410 188 L 410 196 L 30 198 Z", C.SEA, 3) + hoiSuoi[0].svg + hoiSuoi[1].svg +
    '<g transform="translate(20 70) scale(.9)">' + api.nhaNhoSVG(110, 110) + "</g>" +
    '<g transform="translate(160 40) scale(1)">' + api.nhaNhoSVG(110, 110, { mau: "#8a5a3b" }) + "</g>" +
    '<g transform="translate(305 76) scale(.85)">' + api.nhaNhoSVG(110, 110) + "</g>";
  var ban = api.dungBan({
    hop: BO_CUC.hop, baLo: BO_CUC.baLo, ongBut: BO_CUC.ongBut, ongButNho: BO_CUC.ongButNho, tuDong: BO_CUC.tuDong,
    wob: { x: BO_CUC.HOME.x, z: BO_CUC.HOME.z, s: s },
    so: { x: BO_CUC.so.x, z: BO_CUC.so.z, w: BO_CUC.so.w, d: BO_CUC.so.d, biaTrong: trangTrai, lop: [L.tuy(langSuoi, 420, 200, { x: 230, banLe: -60, khoi: hoiSuoi })] }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w); // mắt không bao giờ lộ hai vòng rỗng khi nháy, nhắm (dio-dao-cu.js)
  gsap.set(so.cover, { rotationY: -180 }); // sổ mở sẵn; lớp pop-up nằm phẳng, bật theo lời
  api.cut(ban.trongHop, 170, 120, api.toRoiSVG(), { pos: { x: 70, y: -8, z: -30, rotationZ: 8, scale: 0.75 }, f: api.F.AM_NHO });
  // mũ hè trùm lông treo ở góc kệ sách
  var mu = api.cut(the, 220, 190, api.muLongSVG(), { pos: { x: BO_CUC.MU.x, y: BO_CUC.MU.y, z: BO_CUC.MU.z, scale: 1.5 }, ax: 110, ay: 8, f: api.F.AM });
  // đồ trên bàn
  var caBan = api.cut(the, 320, 124, api.caNamSVG(-1), { pos: { x: BO_CUC.CA_BAN.x, y: TY, z: BO_CUC.CA_BAN.z, scale: s }, f: api.F.AM });
  var gangBan = api.cut(the, 120, 90, '<g transform="translate(60 46) rotate(-78)">' + api.gangLoSVG() + "</g>", { pos: { x: BO_CUC.GANG_BAN.x, y: TY, z: BO_CUC.GANG_BAN.z, scale: s }, f: api.F.AM_NHO });
  var chaiBan = api.cut(the, 90, 170, api.chaiNuocSVG(true), { pos: { x: H.chai.x, y: TY, z: H.chai.z, scale: s }, f: api.F.AM_NHO });
  var nhietBan = api.cut(the, 69, 180, '<g transform="scale(.3)">' + api.thermoSVG([]) + "</g>", { pos: { x: 120, y: TY, z: 120, rotationZ: 70 }, f: api.F.AM_NHO });
  var toRoiBan = api.cut(the, 170, 120, api.toRoiSVG(), { pos: { x: 290, y: TY, z: 150, rotationZ: -14, scale: 0.7 }, f: api.F.AM_NHO });
  api.cut(the, 170, 60, api.hopMucSVG(), { pos: { x: BO_CUC.MUC.x, y: TY, z: BO_CUC.MUC.z, scale: 0.6 }, f: api.F.AM_NHO });
  gsap.set(chaiBan, { opacity: 0 });
  // đồ trong tay (ẩn sẵn)
  w.holdR.insertAdjacentHTML("beforeend", '<g class="chai-cam"><g transform="translate(-45 -100)">' + api.chaiNuocSVG(true) + "</g></g>" +
    '<g class="dau-cam"><g transform="scale(.75)">' + api.conDauSVG() + "</g></g>");
  var chaiCam = w.holdR.querySelector(".chai-cam"), dauCam = w.holdR.querySelector(".dau-cam");
  w.holdL.insertAdjacentHTML("afterbegin", '<g class="ca-cam">' + api.fishSVG("") + "</g>");
  var caCam = w.holdL.querySelector(".ca-cam");
  gsap.set([chaiCam, dauCam, caCam], { opacity: 0 });
  var tayR = function (arm) { var h = api.handWorld("R", arm); return api.wobTheGioi(w, h[0], h[1]); };
  var tayL = function (arm) { var h = api.handWorld("L", arm); return api.wobTheGioi(w, h[0], h[1]); };
  function datXuong(elTay, elBan, t, tu0, den, d, giuXoay) {
    d = d || 0.35;
    if (elTay) tl.set(elTay, { opacity: 0 }, t);
    tl.set(elBan, { opacity: 1 }, t);
    tl.fromTo(elBan, { x: tu0.x, z: tu0.z }, Object.assign({ x: den.x, z: den.z, duration: d, ease: "power1.inOut", immediateRender: false }, giuXoay ? {} : { rotationZ: 0 }), t);
    tl.fromTo(elBan, { y: tu0.y }, { y: Math.min(tu0.y, TY) - 40, duration: d * 0.45, ease: "power2.out", immediateRender: false }, t);
    tl.to(elBan, { y: TY, duration: d * 0.55, ease: "power2.in" }, t + d * 0.45);
  }
  function rutBaLo(el, t) {
    api.armTo(w, "R", t, 0.2, -150, "power2.out");
    var hb = api.handWorld("R", -150);
    gsap.set(el, api.holdPose("R", -150, hb[0], hb[1], 0));
    tl.set(el, { opacity: 1 }, t + 0.2);
    tl.fromTo(el.firstChild, { scale: 0.4 }, { scale: 1, duration: 0.15, ease: "back.out(2.5)", immediateRender: false }, t + 0.2);
  }

  // ---------------------------------------------------------------- camera
  var trangL = so.diemTrang(-230, 0);
  api.camSet(R, null, { cx: trangL.x, cy: trangL.y, cz: trangL.z, k: 1040, rx: -80, ry: 0 });
  api.camTo(R, 0, 1.3, { cx: 60, cy: 90, cz: 0, k: 200, rx: -14, ry: 3 }, "power3.out");
  api.camTo(R, 1.3, 2.7, { cx: 90, cy: 110, cz: 80, k: 290, ry: 2 }, "sine.inOut");
  var cap = { x: 115, y: TY - 70, z: 215 };
  api.camTo(R, 4.0, 0.5, { cx: cap.x, cy: cap.y, cz: cap.z, k: 470, rx: -12, ry: 1 }, "power2.inOut");
  api.camTo(R, 4.5, 1.0, { k: 540 }, "sine.inOut");
  var dong = so.diemTrang(-230, -30);
  api.camTo(R, 5.55, 0.5, { cx: dong.x, cy: dong.y, cz: dong.z, k: 640, rx: -62, ry: 0 }, "power2.inOut");
  api.camTo(R, 6.05, 0.3, { k: 660 }, "sine.inOut");
  api.camTo(R, 6.35, 0.45, { cx: 140, cy: 60, cz: 40, k: 380, rx: -10, ry: -3 }, "power2.inOut");
  api.camTo(R, 6.8, 1.2, { k: 420 }, "sine.inOut");
  // "The summer surprised me.": lượn lên cho thấy mũ hè trên kệ cùng khung với Wob
  api.camTo(R, 8.0, 0.5, { cx: 190, cy: -50, cz: -300, k: 340, rx: 2, ry: -3 }, "power2.inOut");
  api.camTo(R, 8.5, 0.87, { k: 370 }, "sine.inOut");

  // ---------------------------------------------------------------- 0–2.0: kể; xếp nhanh nhiệt kế và tờ rơi thành hàng (pop pop)
  gsap.set([w.pupL, w.pupR], { x: 0, y: 2 });
  api.quay(w, 1.15, 0.3, 0.2);
  api.look(w, 1.15, 6, 12, 0.15);
  api.armTo(w, "R", 1.2, 0.15, 30, "power2.out");
  api.armTo(w, "R", 1.5, 0.15, 10, "power2.out");
  datXuong(null, nhietBan, 1.25, { x: 120, y: TY, z: 120 }, H.nhiet, 0.3);
  datXuong(null, toRoiBan, 1.55, { x: 290, y: TY, z: 150 }, H.toRoi, 0.3);
  api.sfx("pop", 1.55, 0.4); api.sfx("pop", 1.85, 0.4);
  api.look(w, 1.75, -10, 12, 0.15);

  // ---------------------------------------------------------------- 2.0–3.7: chai nước đã tan từ ba lô, lắc cạnh tai: óc ách; đặt giữa hàng; pop-up suối
  api.quay(w, 1.95, 0.4, 0.2);
  rutBaLo(chaiCam, 1.95);
  var hTai = api.handWorld("R", -165);
  api.armTo(w, "R", 2.3, 0.2, -165, "power2.inOut");
  tl.to(chaiCam, Object.assign(api.holdPose("R", -165, hTai[0] - 10, hTai[1] + 30, 0), { duration: 0.2, ease: "power2.inOut" }), 2.3);
  var nuocCam = chaiCam.querySelector(".chai-nuoc");
  tl.fromTo(chaiCam.firstChild, { rotation: 0 }, { rotation: 12, svgOrigin: "45 100", duration: 0.11, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 2.5);
  tl.fromTo(nuocCam, { rotation: 0 }, { rotation: -10, svgOrigin: "45 120", duration: 0.11, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 2.53);
  api.look(w, 2.5, 12, -6, 0.15);
  api.lids(w, 2.6, 0.35, 0.15);
  api.lids(w, 3.2, 0, 0.12);
  api.armTo(w, "R", 3.2, 0.2, 20, "power2.inOut");
  var h20 = api.handWorld("R", 20);
  tl.to(chaiCam, Object.assign(api.holdPose("R", 20, h20[0], h20[1], 0), { duration: 0.2, ease: "power2.inOut" }), 3.2);
  datXuong(chaiCam, chaiBan, 3.38, { x: tayR(20).x, y: tayR(20).y + 110, z: 0 }, H.chai, 0.28);
  api.look(w, 3.3, -4, 12, 0.15);
  so.batLop(0, 3.4, 0.5);
  api.sfx("pop", 3.55, 0.45);
  api.armTo(w, "R", 3.7, 0.25, 0, "power2.inOut");

  // ---------------------------------------------------------------- 3.9–5.0: đeo găng, đặt con cá cạnh chai nước: cộc
  api.quay(w, 3.85, -0.45, 0.2);
  api.look(w, 3.85, -12, 10, 0.15);
  api.armTo(w, "L", 3.85, 0.2, 45, "power2.out");
  tl.set(gangBan, { opacity: 0 }, 4.05);
  api.deoGang(w, "L", true, 4.05);
  api.armTo(w, "L", 4.1, 0.15, 18, "power2.inOut");
  var caX = (BO_CUC.CA_BAN.x - BO_CUC.HOME.x) / s + 200, caY = 392 - 49 / s;
  gsap.set(caCam, api.holdPose("L", 18, caX, caY, 0, -1));
  tl.set(caBan, { opacity: 0 }, 4.25); tl.set(caCam, { opacity: 1 }, 4.25);
  api.armTo(w, "L", 4.27, 0.2, 110, "power2.out");
  var hL = api.handWorld("L", 110);
  tl.to(caCam, Object.assign(api.holdPose("L", 110, hL[0] + 20, hL[1] - 40, 0, -1), { duration: 0.2, ease: "power2.out" }), 4.27);
  api.quay(w, 4.45, 0.3, 0.2);
  datXuong(caCam, caBan, 4.5, { x: tayL(110).x + 40, y: tayL(110).y + 60, z: 0 }, H.ca, 0.28);
  api.sfx("bonk", 4.78, 0.7);
  tl.fromTo(caBan, { rotationZ: 0 }, { rotationZ: -1.5, duration: 0.04, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, 4.78);
  api.armTo(w, "L", 4.55, 0.25, 20, "power2.inOut");
  api.look(w, 4.6, 4, 14, 0.2);

  // ---------------------------------------------------------------- 5.2–6.9: tháo găng, rút con dấu; dòng chữ trên trang rõ; hà hơi vào mặt dấu
  api.deoGang(w, "L", false, 5.2);
  var gTay = tayL(20);
  tl.set(gangBan, { opacity: 1 }, 5.2);
  tl.fromTo(gangBan, { x: gTay.x, y: gTay.y + 40, z: 0 }, { x: BO_CUC.GANG2.x, y: TY, z: BO_CUC.GANG2.z, duration: 0.25, ease: "power2.in", immediateRender: false }, 5.2);
  api.armTo(w, "L", 5.25, 0.25, 0, "power2.inOut");
  rutBaLo(dauCam, 5.3);
  var h150 = api.handWorld("R", 150);
  api.armTo(w, "R", 5.75, 0.35, 150, "power2.inOut");
  tl.to(dauCam, Object.assign(api.holdPose("R", 150, h150[0], h150[1], 180), { duration: 0.35, ease: "power2.inOut" }), 5.75);
  api.quay(w, 6.1, 0, 0.2);
  api.look(w, 6.4, -6, -6, 0.15);
  api.mouth(w, 6.48, "O");
  api.mouth(w, 6.72, "X");
  api.khoi(the, BO_CUC.HOME.x - 10, TY - 150, 8, { scale: 0.32, cao: 140, r0: 14, no: 1.4, troi: 50, n: 10, per: 0.9, loai: "hoi", t0: 6.48, t1: 6.9, seed: 12 });

  // ---------------------------------------------------------------- 6.75–8.0: "The springs are lovely." gật đầu nhìn chai nước, cười nhẹ
  var hd = api.handWorld("R", 25);
  api.armTo(w, "R", 6.75, 0.3, 25, "power2.inOut");
  tl.to(dauCam, Object.assign(api.holdPose("R", 25, hd[0], hd[1], 0), { duration: 0.3, ease: "power2.inOut" }), 6.75);
  api.quay(w, 6.8, -0.2, 0.2);
  api.look(w, 6.8, -6, 12, 0.2);
  tl.to(w.talk, { rotation: 4, y: 6, svgOrigin: "200 290", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, 6.95);
  api.lids(w, 7.3, 0.3, 0.2);

  // ---------------------------------------------------------------- 8.0–9.37: "The summer surprised me." liếc mũ hè trên kệ, nhướng mắt, cười
  api.lids(w, 8.05, 0, 0.12);
  api.quay(w, 8.05, 0.35, 0.2);
  api.look(w, 8.1, 10, -14, 0.15, 1.1);
  tl.fromTo(w.lift, { y: 0 }, { y: -10, duration: 0.15, ease: "power2.out", immediateRender: false }, tu.summer);
  tl.to(w.lift, { y: 0, duration: 0.3, ease: "power2.inOut" }, tu.summer + 0.5);
  tl.fromTo(mu, { rotationZ: 0 }, { rotationZ: 6, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 8.3);
  api.mouth(w, 9.05, "S");

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w, { bo: [[6.48, 6.72], [9.05, 9.4]] });
  api.gatDau(w, { bo: [[6.9, 7.8]], amp: 0.8 });
  api.breathe(w, 0, 9.3);
  api.blink(w, 0.9);
  api.blink(w, 7.8, 0.3);
};
