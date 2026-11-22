/* Đoạn d01 (diorama, hiện tại, 22,23 s): mở video. Wob (găng lò nướng tay trái) rút con cá đông cứng khỏi hộp kỷ vật,
 * nhảy ra giữa bàn, giơ cá như tấm ván, gõ bàn "cộc"; lật bìa sổ: làng tuyết + biển OYMYAKON ~500 bật dựng, tuyết giấy rơi,
 * Wob run; chỉ cá vào biển (camera đẩy vào biển); nhìn thẳng tỉnh bơ; tựa cá lên vai, gập pop-up, lật trang: "PLAN: MOVE IN"
 * viết tay + gạch chân hai lần; bàn chải, khăn đỏ, bản đồ bay từ hộp vào ba lô to quá cỡ; bản đồ ngược (xoay vẫn ngược,
 * lật ra mặt sau trống); "My plan was simple." nhún nảy vì hào hứng. Ra: cắt cứng.
 * Bố cục bàn dùng chung mọi đoạn hiện tại của tập (BO_CUC bên dưới, giống hệt d03, d18, d20, d26, d38, d40).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // ["OYMYAKON", "~500", "PLAN: MOVE IN"]

  // ---------------------------------------------------------------- bố cục bàn kỷ vật chung của tập
  var BO_CUC = {
    hop: { x: -200, z: -400, w: 300, d: 220, h: 150, do: ["anh"] },
    so: { x: 480, z: -330, w: 460, d: 580 },
    baLo: { x: -660, z: -250, s: 0.85 },
    ongBut: { x: -760, z: 430 },
    ongButNho: { x: 430, z: 140, s: 0.75 },
    HOME: { x: 150, z: 0 }
  };
  var L = api.lopPopup;
  var ban = api.dungBan({
    hop: BO_CUC.hop, baLo: BO_CUC.baLo, ongBut: BO_CUC.ongBut, ongButNho: BO_CUC.ongButNho,
    wob: { x: 60, z: -400, s: 0.9 },
    caCung: true,
    so: {
      x: BO_CUC.so.x, z: BO_CUC.so.z, w: BO_CUC.so.w, d: BO_CUC.so.d,
      lop: [
        L.doi(430, 170, { x: 230, banLe: -150 }),
        L.nha(400, 150, { x: 225, banLe: -30 }),
        L.bien([{ chu: chu[0], co: 62 }, { chu: chu[1], co: 54 }], { x: 238, banLe: 150, w: 440, h: 400 }),
        L.langNho(390, 80, { x: 230, banLe: 262, n: 6 })
      ]
    }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the, HOP = ban.hop;
  api.matKhongRong(w); // mắt không bao giờ lộ hai vòng rỗng khi nháy, nhắm (dio-dao-cu.js)
  // đồ trong hộp: chai nước nhỏ đông cứng (nhô khỏi miệng hộp), tờ rơi gấp
  api.cut(ban.trongHop, 170, 120, api.toRoiSVG(), { pos: { x: 70, y: -8, z: -30, rotationZ: 8, scale: 0.75 }, f: api.F.AM_NHO });
  api.cut(ban.trongHop, 90, 170, api.chaiNuocSVG(false), { pos: { x: -95, y: -12, z: 20 }, f: api.F.AM_NHO });
  api.deoGang(w, "L", true);
  var fishAt = function (arm, ang, dist) { return api.camDai("L", arm, ang, dist == null ? 96 : dist); };

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: -60, cy: 40, cz: -300, k: 120, rx: -14, ry: 10 });
  api.camTo(R, 0, 0.95, { cx: 120, cy: 20, cz: -120, k: 200, ry: 7 }, "sine.inOut");
  api.camTo(R, 0.95, 0.9, { cx: 150, cy: 20, cz: 0, k: 330, ry: 5, rx: -12 }, "power2.inOut");
  api.camTo(R, 1.85, 0.9, { cx: 420, cy: 20, cz: -170, k: 170, ry: -4, rx: -13 }, "power2.inOut");
  api.camTo(R, 2.75, 4.9, { cx: 460, cy: 0, cz: -170, k: 270, ry: -8, rx: -12 }, "sine.inOut");
  var sTop = so.diemLop(2, 220, 120);
  api.camTo(R, 7.65, 0.6, { cx: sTop.x, cy: sTop.y, cz: sTop.z, k: 520, rx: -3, ry: -2 }, "power3.out");
  api.camTo(R, 8.25, 1.25, { k: 560, ry: 1 }, "sine.inOut");
  var mat = { x: 150, y: TY - 200 * 0.9, z: 0 };
  api.camTo(R, 9.5, 0.4, { cx: 330, cy: 40, cz: -60, k: 400, rx: -7, ry: 0 }, "power3.inOut");
  api.camTo(R, 9.9, 2.3, { k: 440 }, "sine.inOut");
  // lật trang: cẩu máy lên nhìn xuống trang sổ để đọc chữ viết tay
  var trang = so.diemTrang(230, 40);
  api.camTo(R, 12.2, 0.6, { cx: 400, cy: 60, cz: -170, k: 280, rx: -30, ry: -2 }, "power2.inOut");
  api.camTo(R, 12.8, 0.8, { cx: trang.x, cy: trang.y, cz: trang.z, k: 620, rx: -60, ry: 0 }, "power2.inOut");
  api.camTo(R, 13.6, 1.6, { k: 680 }, "sine.inOut");
  // ba món bay vào ba lô: cảnh rộng hộp + ba lô + Wob
  api.camTo(R, 15.2, 0.6, { cx: -260, cy: 0, cz: -240, k: 60, rx: -13, ry: 9 }, "power2.inOut");
  api.camTo(R, 15.8, 2.3, { cx: -200, k: 110, ry: 7 }, "sine.inOut");
  // bản đồ ngược: về Wob
  api.camTo(R, 18.1, 0.6, { cx: 230, cy: 40, cz: 0, k: 470, rx: -8, ry: -2 }, "power2.inOut");
  api.camTo(R, 18.7, 1.4, { k: 520 }, "sine.inOut");
  api.camTo(R, 20.1, 0.2, { k: 560, ry: 0 }, "power3.out");
  api.camTo(R, 20.3, 0.7, { k: 580 }, "sine.inOut");
  api.camTo(R, 21.0, 1.23, { cx: 170, cy: 0, k: 470, rx: -9 }, "sine.inOut");

  // ---------------------------------------------------------------- 0.0–0.95: rút cá khỏi hộp bằng găng, nhảy ra giữa bàn
  var A0 = 70;
  api.armSet(w, "L", A0);
  var h0 = api.handWorld("L", A0);
  gsap.set(ban.ca, api.holdPose("L", A0, h0[0], h0[1] + 40, -90));
  api.quaySet(w, -0.5);
  gsap.set([w.pupL, w.pupR], { x: -10, y: 6 });
  api.armTo(w, "L", 0.02, 0.38, 160, "power2.inOut");
  var h1 = api.handWorld("L", 160);
  tl.to(ban.ca, Object.assign(api.holdPose("L", 160, h1[0], h1[1] - 20, -90), { duration: 0.38, ease: "power2.inOut" }), 0.02);
  tl.to(w.lift, { y: -50, scaleY: 1.06, scaleX: 0.96, duration: 0.36, ease: "power2.out" }, 0.04);
  tl.fromTo(w.pos, { x: 60, z: -400 }, { x: BO_CUC.HOME.x, z: BO_CUC.HOME.z, duration: 0.48, ease: "power1.inOut", immediateRender: false }, 0.38);
  tl.to(w.lift, { y: -120, duration: 0.2, ease: "power1.out" }, 0.4);
  tl.to(w.lift, { y: 0, scaleY: 1, scaleX: 1, duration: 0.26, ease: "power2.in" }, 0.6);
  tl.to(w.lift, { scaleY: 0.9, scaleX: 1.08, duration: 0.07, ease: "power2.out" }, 0.86);
  tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.28, ease: "back.out(3)" }, 0.93);
  w.x = BO_CUC.HOME.x; w.z = BO_CUC.HOME.z;
  // "This is a fish." giơ cá thẳng đơ như tấm ván
  api.quay(w, 0.45, 0, 0.3);
  // cầm cá ở đầu, thân thẳng đơ chúc đuôi xuống như tấm ván (để gõ đuôi xuống bàn)
  var caA = function (arm, cy) { return api.holdPose("L", arm, 30, cy, -90); };
  api.armTo(w, "L", 0.45, 0.35, 170, "back.out(1.6)");
  tl.to(ban.ca, Object.assign(caA(170, 196), { duration: 0.35, ease: "back.out(1.6)" }), 0.45);
  api.look(w, 0.5, 0, 2, 0.15);

  // ---------------------------------------------------------------- 1.3–1.9: gõ đầu cá vào mép bàn "cộc", cá không cong
  var BONK = data.nhip[2].tai;
  // nhấc lên lấy đà, gõ đuôi cá xuống mặt bàn: cộc, cá thẳng đơ; rung va chạm 7 khung đổi chiều mỗi khung; giữ 0,6 s
  api.look(w, BONK - 0.3, -12, 12, 0.12);
  api.armTo(w, "L", BONK - 0.3, 0.14, 178, "power2.out");
  tl.to(ban.ca, Object.assign(caA(178, 168), { duration: 0.14, ease: "power2.out" }), BONK - 0.3);
  api.armTo(w, "L", BONK - 0.1, 0.1, 150, "power3.in");
  tl.to(ban.ca, Object.assign(caA(150, 240), { duration: 0.1, ease: "power3.in" }), BONK - 0.1);
  api.sfx("bonk", BONK, 0.85);
  tl.fromTo(w.lift, { y: 0 }, { y: 4, duration: 0.05, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, BONK);
  for (var rk = 0; rk < 7; rk++) tl.set(R.stage, { x: (rk % 2 ? -1 : 1) * 5 * (1 - rk / 7), y: (rk % 2 ? 1 : -1) * 2 * (1 - rk / 7) }, BONK + rk / 30);
  tl.set(R.stage, { x: 0, y: 0 }, BONK + 7 / 30);
  api.lids(w, BONK + 0.12, 0.5, 0.15);
  api.look(w, BONK + 0.12, -10, 14, 0.15);
  api.armTo(w, "L", 2.0, 0.3, 170, "power2.out");
  tl.to(ban.ca, Object.assign(caA(170, 196), { duration: 0.3, ease: "power2.out" }), 2.0);

  // ---------------------------------------------------------------- 1.9–3.6: "Oymyakon": lật bìa sổ, pop-up bật dựng
  api.lids(w, 2.0, 0, 0.12);
  api.quay(w, 1.9, 0.65, 0.3);
  api.look(w, 1.9, 10, 4, 0.15);
  api.armTo(w, "R", 1.95, 0.26, -125, "power2.out");
  api.armTo(w, "R", 2.25, 0.35, -60, "power2.inOut");
  so.moBia(2.05, 0.6);
  api.sfx("whoosh", 2.1, 0.45);
  so.batLop(0, 2.45); so.batLop(1, 2.58); so.batLop(2, 2.72);
  api.sfx("pop", 2.66, 0.45); api.sfx("pop", 2.86, 0.55);
  api.hop(w, 3.05, 12, 0.3);
  api.armTo(w, "R", 3.4, 0.4, -20, "power2.inOut");

  // ---------------------------------------------------------------- 4.2–7.4: tuyết giấy rơi trong trang, Wob run một cái
  api.tuyetGiay(the, { vung: so.vung(430), n: 26, co: 22, t0: 4.15, t1: 12.3, toc: 150, seed: 77 });
  api.look(w, 4.3, 8, -10, 0.25);
  api.shiver(w, tu.coldest, tu.coldest + 0.75, 3.2);
  api.sfx("brr", tu.coldest, 0.4);
  api.armTo(w, "R", tu.coldest, 0.2, 30, "power2.inOut");
  api.armTo(w, "R", 6.2, 0.35, -15, "power2.inOut");
  api.look(w, 6.0, 12, -4, 0.25);

  // ---------------------------------------------------------------- 7.4–9.4: "five hundred people": chỉ cá vào biển, làng tí hon bật
  api.armTo(w, "L", 7.4, 0.3, -55, "back.out(1.4)");
  tl.to(ban.ca, Object.assign(fishAt(-55, -25), { duration: 0.3, ease: "back.out(1.4)" }), 7.4);
  api.quay(w, 7.4, 0.6, 0.25);
  so.batLop(3, 7.75, 0.45);
  api.sfx("pop", 7.9, 0.4);
  [tu.five, tu.hundred, tu.people].forEach(function (t) {
    tl.to(w.armL, { rotation: -62, svgOrigin: "86 212", duration: 0.09, yoyo: true, repeat: 1, ease: "power1.inOut" }, t);
  });

  // ---------------------------------------------------------------- 9.4–12.2: "Why would anyone choose that?" nhìn thẳng, tỉnh bơ, giữ hình
  api.armTo(w, "L", 9.35, 0.3, 150, "power2.inOut");
  tl.to(ban.ca, Object.assign(fishAt(150, -90), { duration: 0.3, ease: "power2.inOut" }), 9.35);
  api.quay(w, 9.45, 0, 0.3);
  api.look(w, 9.5, 0, 2, 0.2);
  api.lids(w, 9.75, 0.5, 0.2);
  api.nhayCham(w, 11.2, 0.5);

  // ---------------------------------------------------------------- 12.2–15.0: tựa cá lên vai, gập pop-up, lật trang: "PLAN: MOVE IN"
  api.lids(w, 12.2, 0, 0.15);
  api.armTo(w, "L", 12.2, 0.4, 168, "power2.inOut");
  tl.to(ban.ca, Object.assign(api.holdPose("L", 168, 76, 20, -100), { duration: 0.4, ease: "power2.inOut" }), 12.2);
  api.quay(w, 12.3, 0.55, 0.3);
  api.look(w, 12.3, 10, 6, 0.2);
  // tắt khói các ống khói trên trang pop-up trước khi gập (khói không che biển OYMYAKON)
  (so.lop[1].def.khoi || []).forEach(function (k) { k.chay(so.lop[1], 2.58 + 0.35, 12.15); });
  [3, 2, 1, 0].forEach(function (i, k) { so.gapLop(i, 12.4 + k * 0.07, 0.3); });
  tl.set(so.lop.map(function (p) { return p; }), { visibility: "hidden" }, 13.5);
  var KW = 460, KD = 580;
  var trangPlan = '<defs><clipPath id="plan-viet"><rect class="plan-mo" x="0" y="0" width="0" height="' + KD + '"/></clipPath></defs>' +
    '<g transform="rotate(-4 230 290)"><g clip-path="url(#plan-viet)">' + api.txt(232, 300, 50, 700, chu[2], C.INK, ' font-style="italic"') + "</g>" +
    api.sk("M 40 322 C 140 314 300 318 420 312", 6, C.MAT, ' class="gach1" stroke-dasharray="400" stroke-dashoffset="400"') +
    api.sk("M 52 340 C 160 332 290 338 410 330", 5, C.MAT, ' class="gach2" stroke-dasharray="380" stroke-dashoffset="380"') + "</g>" +
    api.sk("M 70 150 C 120 120 170 170 220 140 S 330 120 380 150", 3, C.ICE2, ' opacity=".7"') +
    api.fp("M 360 430 l 40 -60 l 40 60 Z", C.SNOW, 3) + api.sk("M 80 470 l 40 0 M 100 450 l 0 40", 4, C.ICE2);
  var to = so.themTo(trangPlan, { ben: "trai" });
  to.hien(null, false);
  to.hien(12.8, true);
  api.armTo(w, "R", 12.75, 0.25, -120, "power2.out");
  to.lat(12.85, 0.6, "phai");
  api.armTo(w, "R", 13.05, 0.4, -40, "power2.inOut");
  api.sfx("whoosh", 12.9, 0.35);
  var mo = to.truoc.querySelector(".plan-mo");
  tl.fromTo(mo, { attr: { width: 0 } }, { attr: { width: KW }, duration: 0.42, ease: "power1.inOut", immediateRender: false }, tu.move - 0.22);
  api.sfx("pop", tu.move, 0.5);
  tl.to(to.truoc.querySelector(".gach1"), { attr: { "stroke-dashoffset": 0 }, duration: 0.2, ease: "power2.out" }, tu.move + 0.3);
  tl.to(to.truoc.querySelector(".gach2"), { attr: { "stroke-dashoffset": 0 }, duration: 0.2, ease: "power2.out" }, tu.move + 0.52);
  api.nghieng(w, 13.6, -4, 0.3);
  api.nghieng(w, 14.9, 0, 0.3);

  // ---------------------------------------------------------------- 15.0–18.1: bàn chải, khăn đỏ, bản đồ bay từ hộp vào ba lô
  var BL = ban.baLo.mieng;
  var tuHop = { x: HOP.x + 60, y: HOP.mieng - 10, z: HOP.x ? HOP.z : HOP.z };
  tuHop.z = HOP.z;
  function bay(el, t, d, a, b, cao, quay) {
    gsap.set(el, { opacity: 0, x: a.x, y: a.y, z: a.z, scale: 1.35 });
    tl.set(el, { opacity: 1 }, t);
    tl.fromTo(el, { x: a.x, z: a.z, rotationZ: 0 }, { x: b.x, z: b.z, rotationZ: quay || 0, duration: d, ease: "power1.inOut", immediateRender: false }, t);
    tl.fromTo(el, { y: a.y }, { y: Math.min(a.y, b.y) - cao, duration: d * 0.5, ease: "power2.out", immediateRender: false }, t);
    tl.to(el, { y: b.y, duration: d * 0.5, ease: "power2.in" }, t + d * 0.5);
  }
  function vaoBaLo(el, t, d, quay) {
    bay(el, t, d, tuHop, { x: BL.x, y: BL.y, z: BL.z }, 260, quay);
    tl.to(el, { y: BL.y + 170, duration: 0.25, ease: "power2.in" }, t + d);
    tl.set(el, { opacity: 0 }, t + d + 0.26);
    tl.fromTo(ban.baLo.truoc, { scaleY: 0.85 }, { scaleY: 0.8, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, t + d + 0.05);
    api.sfx("drop", t + d + 0.05, 0.5);
  }
  var banChai = api.cut(the, 180, 60, '<g transform="translate(95 34)">' + api.banChaiSVG() + "</g>", { ay: 30, f: api.F.AM_NHO });
  var khan = api.cut(the, 160, 130, api.khanDoSVG(), { ay: 65, f: api.F.AM_NHO });
  var bdBay = api.cut(the, 190, 140, '<g transform="translate(95 70) scale(.8)">' + api.banDoGiaySVG() + "</g>", { ay: 70, f: api.F.AM_NHO });
  api.quay(w, 15.1, -0.6, 0.3);
  api.look(w, 15.1, -12, -4, 0.2);
  [[banChai, tu.toothbrush, 380], [khan, tu.scarf, -260], [bdBay, tu.paper, 300]].forEach(function (m, k) {
    var t = m[1] - 0.3;
    api.armTo(w, "R", t - 0.05, 0.15, -150, "power2.out");
    api.armTo(w, "R", t + 0.15, 0.25, -20, "power2.inOut");
    vaoBaLo(m[0], t, 0.7, m[2]);
    api.look(w, t + 0.35, -14, 4, 0.2);
  });

  // ---------------------------------------------------------------- 18.1–20.9: bản đồ bật ra khỏi ba lô về tay phải; ngược, xoay vẫn ngược, lật ra mặt sau trống
  var AR = -40;
  w.holdR.insertAdjacentHTML("beforeend", '<g class="bd-cam"><g class="bd-xoay" transform="rotate(180) scale(1 1)">' + api.banDoGiaySVG() + "</g></g>");
  var bdCam = w.holdR.querySelector(".bd-cam"), bdXoay = w.holdR.querySelector(".bd-xoay");
  gsap.set(bdCam, Object.assign(api.holdPose("R", AR, 372, 196, 0, 0.82), { opacity: 0 }));
  api.armTo(w, "R", 18.05, 0.3, AR, "power2.out");
  var tayR = api.wobTheGioi({ x: BO_CUC.HOME.x, y: TY, z: BO_CUC.HOME.z, s: 0.9 }, 372, 196);
  var bdRa = api.cut(the, 190, 140, '<g transform="translate(95 70) scale(.8)">' + api.banDoGiaySVG() + "</g>", { ay: 70, f: api.F.AM_NHO });
  bay(bdRa, 18.0, 0.5, { x: BL.x, y: BL.y + 40, z: BL.z }, tayR, 200, 360);
  tl.set(bdRa, { opacity: 0 }, 18.5);
  tl.set(bdCam, { opacity: 1 }, 18.5);
  api.sfx("whoosh", 18.02, 0.3);
  api.quay(w, 18.1, 0.35, 0.3);
  api.look(w, 18.55, 10, -6, 0.15);
  // lần 1: mở ra – ngược (núi chúc xuống, mặt trời ở dưới)
  tl.fromTo(bdCam, { scale: 0.6 }, { scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, 18.5);
  // lần 2: xoay một vòng – vẫn ngược
  tl.to(bdXoay, { attr: { transform: "rotate(540) scale(1 1)" }, duration: 0.5, ease: "power2.inOut" }, 19.3);
  api.sfx("boing", 19.55, 0.4);
  api.look(w, 19.85, 10, -6, 0.1);
  api.lids(w, 19.9, 0.45, 0.15);
  // lần 3: lật hẳn ra mặt sau – trống trơn; Wob nhìn người xem
  tl.to(bdXoay, { attr: { transform: "rotate(540) scale(0.02 1)" }, duration: 0.13, ease: "power2.in" }, 20.05);
  tl.set(bdXoay.querySelector(".bd-truoc"), { opacity: 0 }, 20.18); tl.set(bdXoay.querySelector(".bd-sau"), { opacity: 1 }, 20.18);
  tl.to(bdXoay, { attr: { transform: "rotate(540) scale(-1 1)" }, duration: 0.13, ease: "power2.out" }, 20.18);
  api.quay(w, 20.35, 0, 0.25);
  api.look(w, 20.4, 0, 2, 0.15);

  // ---------------------------------------------------------------- 20.75–22.23: nhét bản đồ lại, nhún lấy đà, nảy vì hào hứng
  var bdVe = api.cut(the, 190, 140, '<g transform="translate(95 70) scale(.8)">' + api.banDoGiaySVG() + "</g>", { ay: 70, f: api.F.AM_NHO });
  tl.set(bdCam, { opacity: 0 }, 20.78);
  bay(bdVe, 20.78, 0.45, tayR, { x: BL.x, y: BL.y, z: BL.z }, 160, -300);
  tl.to(bdVe, { y: BL.y + 170, duration: 0.2, ease: "power2.in" }, 21.23);
  tl.set(bdVe, { opacity: 0 }, 21.44);
  api.armTo(w, "R", 20.8, 0.3, 10, "power2.inOut");
  api.lids(w, 20.9, 0, 0.12);
  api.mouth(w, 21.95, "S");
  tl.to(w.lift, { scaleY: 0.86, scaleX: 1.1, duration: 0.18, ease: "power2.out" }, 21.12);
  api.hop(w, 21.32, 70, 0.5);
  api.armTo(w, "R", 21.35, 0.2, -130, "power2.out");
  api.sfx("liu-lo-vui", 21.4, 0.4);
  api.look(w, 21.4, 0, -6, 0.15);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w, { bo: [[21.95, 22.3]] });
  api.gatDau(w, { bo: [[0, 1.0], [9.5, 12.2], [21.0, 22.3]] });
  api.breathe(w, 1.0, 22.0);
  api.blinks(w, 1.0, 9.4, [[1.2, 2.1], [4.4, 5.6]], 0);
  api.blinks(w, 14.8, 18.3, [], 0);
};
