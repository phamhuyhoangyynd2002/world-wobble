/* Đoạn d05 (diorama, hiện tại, 17,6 s; biên đạo lại 21/11/2026, nền từ _cu-21-11/d03 + biển, PLAN của _cu-21-11/d01).
 * Toàn bàn: cây bút (văng ra từ d04) rơi lăn trên bàn; trang sổ bật dựng biển làng pop-up 'OYMYAKON' / '~500 (2010)' đúng "five"
 * → cận Wob, cá ở tiền cảnh: nhìn thẳng người xem, mí 0,5, giữ hết "Why?" + 0,8 s → cận trang trái: chữ viết tay
 * 'PLAN: MOVE IN' hiện đúng "move", gạch chân hai lần, Wob nảy → đẩy chậm vào Wob, gật nhẹ → Wob nhặt bút, chỉ vào chữ
 * 'OYMYAKON' đúng "name" → lạch bạch tới hộp kỷ vật, đầu bút chạm chai nước nhỏ: chai loé sáng (cận chai) → lắc đầu chậm, gõ nhẹ
 * con cá → liếc ba lô: khoá kéo tự bung một chút đúng "unpacking", Wob không nhìn, lấy bút đè lại, giữ 0,6 s → trang sổ tự lật
 * sang trang trắng, camera lao vào trang, 0,5 s cuối phủ giấy phẳng (nối giay).
 * Bố cục bàn dùng chung mọi đoạn hiện tại của tập (BO_CUC, giống d03, d18, d20, d26, d38, d40).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; });   // 0, 2.41, 5.3, 8.06, 11.31, 13.64, 14.97, 16.9
  var T = function (k, d) { return tu[k] != null ? tu[k] : d; };
  var tFive = T("five", 0.6), tWhy = T("why", 3.35), tMove = T("move", 7.17), tName = T("name", 12.9), tIsnt = T("isnt", 13.81), tUnp = T("unpacking", 16.19);
  var chu = data.chu_tren_do_vat; // ["OYMYAKON", "~500 (2010)", "PLAN: MOVE IN"]

  // ---------------------------------------------------------------- bố cục bàn kỷ vật chung của tập
  var BO_CUC = {
    hop: { x: -200, z: -400, w: 300, d: 220, h: 150, do: ["anh"] },
    so: { x: 480, z: -330, w: 460, d: 580 },
    baLo: { x: -660, z: -250, s: 0.85 },
    ongBut: { x: -760, z: 430 },
    ongButNho: { x: 430, z: 140, s: 0.75 },
    HOME: { x: 150, z: 0 }
  };
  var KW = 460, KD = 580;
  // trang trái (mặt trong bìa): "PLAN: MOVE IN" viết tay + gạch chân hai lần; dong = true: có mặt nạ để viết dần
  function planSVG(dong) {
    var id = dong ? "plan-viet" : "plan-xong";
    return '<defs><clipPath id="' + id + '"><rect class="' + (dong ? "plan-mo" : "") + '" x="0" y="0" width="' + (dong ? 0 : KW) + '" height="' + KD + '"/></clipPath></defs>' +
      '<g transform="rotate(-4 230 290)"><g clip-path="url(#' + id + ')">' + api.txt(232, 300, 52, 700, chu[2], C.INK, ' font-style="italic"') + "</g>" +
      api.sk("M 40 322 C 140 314 300 318 420 312", 6, C.MAT, dong ? ' class="gach1" stroke-dasharray="400" stroke-dashoffset="400"' : "") +
      api.sk("M 52 340 C 160 332 290 338 410 330", 5, C.MAT, dong ? ' class="gach2" stroke-dasharray="380" stroke-dashoffset="380"' : "") + "</g>" +
      api.sk("M 70 150 C 120 120 170 170 220 140 S 330 120 380 150", 3, C.ICE2, ' opacity=".7"') +
      api.fp("M 360 430 l 40 -60 l 40 60 Z", C.SNOW, 3) + api.sk("M 80 470 l 40 0 M 100 450 l 0 40", 4, C.ICE2);
  }
  var L = api.lopPopup;
  var ban = api.dungBan({
    hop: BO_CUC.hop, baLo: BO_CUC.baLo, ongBut: BO_CUC.ongBut, ongButNho: BO_CUC.ongButNho,
    wob: { x: BO_CUC.HOME.x, z: BO_CUC.HOME.z, s: 0.9 },
    caCung: true,
    so: {
      x: BO_CUC.so.x, z: BO_CUC.so.z, w: BO_CUC.so.w, d: BO_CUC.so.d, moSan: true, biaTrong: planSVG(true),
      lop: [
        L.doi(430, 150, { x: 230, banLe: -170 }),
        L.bien([{ chu: chu[0], co: 64 }, { chu: chu[1], co: 54 }], { x: 236, banLe: 60, w: 440, h: 380 })
      ]
    }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the, HOP = ban.hop;
  api.matKhongRong(w);
  api.cut(ban.trongHop, 170, 120, api.toRoiSVG(), { pos: { x: 70, y: -8, z: -30, rotationZ: 8, scale: 0.75 }, f: api.F.AM_NHO });
  var chai = api.cut(ban.trongHop, 90, 170, api.chaiNuocSVG(false), { pos: { x: -95, y: -12, z: 20 }, f: api.F.AM_NHO });
  api.deoGang(w, "L", true);
  // lớp pop-up đồi dựng sẵn (đã mở ở d03), biển bật ở "five"
  gsap.set(so.lop[1], { rotationX: 0 });

  // ---------------------------------------------------------------- bút: rơi lăn trên bàn → Wob nhặt
  var BUT = { x: 300, z: 90 };
  var butBan = api.cut(the, 200, 40, '<g transform="translate(100 20)">' + api.butChiSVG() + "</g>", { pos: { x: BUT.x, y: TY, z: BUT.z, scale: 0.8 }, ay: 30, f: api.F.AM_NHO });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="but-cam">' + api.butChiSVG() + "</g>");
  var butCam = w.holdR.querySelector(".but-cam");
  gsap.set(butCam, { opacity: 0 });

  // ---------------------------------------------------------------- khoá kéo ba lô (khe tối + núm kéo) đặt trước lớp trước ba lô
  var BL = BO_CUC.baLo, khe = api.cut(the, 200, 60,
    '<g class="khe-mo" transform="translate(100 30) scale(0.05 1)"><path d="M -80 0 C -40 -16 40 -16 80 0 C 40 16 -40 16 -80 0 Z" fill="#1e140c" stroke="' + C.INK + '" stroke-width="4"/>' +
    '<path d="M -60 -2 l 6 -6 M -40 -6 l 6 -6 M -20 -8 l 6 -6 M 0 -8 l 6 -6 M 20 -8 l 6 -6 M 40 -6 l 6 -6" stroke="#c9b48e" stroke-width="3"/></g>' +
    '<g class="num-keo" transform="translate(100 30)"><rect x="-8" y="-6" width="16" height="30" rx="5" fill="#C23B2A" stroke="' + C.INK + '" stroke-width="4"/></g>',
    { pos: { x: BL.x + 70, y: TY - 300 * BL.s, z: BL.z + 8, scale: BL.s * 3 }, ay: 30 });
  var kheMo = khe.querySelector(".khe-mo"), numKeo = khe.querySelector(".num-keo");

  // ---------------------------------------------------------------- tư thế đầu: cá đứng trong găng (như cuối d03)
  api.armSet(w, "L", 168);
  gsap.set(ban.ca, api.holdPose("L", 168, 76, 20, -100));
  api.quaySet(w, 0.2);

  // ---------------------------------------------------------------- camera
  var mat = { x: BO_CUC.HOME.x, y: TY - 200 * 0.9, z: 0 };
  var bien = so.diemLop(1, 220, 150);
  var trai = so.diemTrang(-230, 0);
  // toàn bàn → đẩy vào biển (chữ đọc trọn)
  api.camSet(R, null, { cx: 40, cy: 30, cz: -170, k: 70, rx: -13, ry: 7 });
  api.camTo(R, 0, 0.55, { cx: 80, k: 100, ry: 6 }, "sine.inOut");
  api.camTo(R, 0.55, 0.75, { cx: bien.x - 30, cy: bien.y, cz: bien.z, k: 430, rx: -6, ry: 0 }, "power2.inOut");
  api.camTo(R, 1.3, 1.1, { k: 470 }, "sine.inOut");
  // cận Wob, cá ở tiền cảnh
  api.camTo(R, N[1], 0, { cx: mat.x - 40, cy: mat.y + 10, cz: 0, k: 600, rx: -6, ry: 12 }, "none");
  api.camTo(R, N[1], 2.9, { k: 640, ry: 11 }, "sine.inOut");
  // cận trang trái: cẩu máy nhìn xuống để đọc chữ viết tay
  api.camTo(R, N[2], 0.6, { cx: 330, cy: 60, cz: -200, k: 260, rx: -32, ry: -2 }, "power2.inOut");
  api.camTo(R, N[2] + 0.6, 0.8, { cx: trai.x, cy: trai.y, cz: trai.z, k: 640, rx: -58, ry: 0 }, "power2.inOut");
  api.camTo(R, N[2] + 1.4, 1.3, { k: 690 }, "sine.inOut");
  // đẩy chậm vào Wob
  api.camTo(R, N[3] - 0.1, 0.6, { cx: mat.x - 20, cy: mat.y + 20, cz: 0, k: 420, rx: -8, ry: 4 }, "power2.inOut");
  api.camTo(R, N[3] + 0.5, 2.7, { k: 560, ry: 2 }, "sine.inOut");
  // trung cảnh Wob + biển: chỉ bút
  api.camTo(R, N[4] - 0.05, 0.6, { cx: 330, cy: bien.y + 40, cz: -120, k: 250, rx: -9, ry: -2 }, "power2.inOut");
  api.camTo(R, N[4] + 0.55, 1.1, { k: 280 }, "sine.inOut");
  // sang hộp: cận chai nước
  api.camTo(R, tName + 0.15, 0.75, { cx: -330, cy: 50, cz: -280, k: 360, rx: -12, ry: 6 }, "power2.inOut");
  api.camTo(R, tName + 0.9, 0.7, { cx: -300, cy: 30, cz: -240, k: 580, ry: 3 }, "sine.inOut");
  // lùi thấy ba lô + Wob
  api.camTo(R, N[6] - 0.25, 0.6, { cx: -480, cy: 30, cz: -220, k: 300, rx: -11, ry: 8 }, "power2.inOut");
  api.camTo(R, N[6] + 0.35, tUnp - 0.35 - N[6] - 0.35, { k: 350 }, "sine.inOut");
  api.camTo(R, tUnp - 0.35, 0.4, { cx: BL.x + 120, cy: TY - 260, cz: BL.z, k: 560, rx: -10, ry: 6 }, "power2.inOut");   // cận khoá ba lô + Wob
  api.camTo(R, tUnp + 0.05, N[7] - 0.13 - tUnp - 0.05, { k: 590 }, "sine.inOut");
  // lao vào trang phải (trang trắng)
  var phai = so.diemTrang(230, 30);
  api.camTo(R, N[7] - 0.08, 0, { cx: 420, cy: 40, cz: -260, k: 330, rx: -30, ry: -2 }, "none");      // cắt cứng về sổ: thấy trang lật
  api.camTo(R, N[7] - 0.08, 0.3, { k: 380 }, "sine.out");
  api.camTo(R, N[7] + 0.22, 0.48, { cx: phai.x, cy: phai.y, cz: phai.z, k: 1110, rx: -80, ry: 0 }, "power2.in");
  api.raGiay(api.DUR - 0.5 - 2 / api.fps, 0.5);

  // ---------------------------------------------------------------- 0–2.41: bút rơi lăn; biển bật đúng "five"
  tl.fromTo(butBan, { y: TY - 260, x: BUT.x + 120, rotationZ: -40 }, { y: TY, x: BUT.x + 40, rotationZ: 0, duration: 0.32, ease: "power2.in", immediateRender: false }, 0);
  api.sfx("drop", 0.32, 0.55);
  tl.to(butBan, { x: BUT.x, rotationZ: -14, duration: 0.45, ease: "power2.out" }, 0.32);
  tl.to(butBan, { y: TY - 18, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.out" }, 0.32);
  api.look(w, 0.15, 12, 12, 0.15);
  so.batLop(1, tFive - 0.18, 0.4);
  api.sfx("pop", tFive, 0.55);
  api.quay(w, tFive - 0.1, 0.55, 0.25);
  api.look(w, tFive, 12, -4, 0.15);

  // ---------------------------------------------------------------- 2.41–5.3: nhìn thẳng người xem, mí 0,5, giữ hết "Why?" + 0,8 s
  api.quay(w, N[1], 0, 0); api.look(w, N[1], 0, 2, 0.01);
  api.armSet(w, "L", 150, N[1]);
  tl.set(ban.ca, api.camDai("L", 150, -90, 96), N[1]);             // cá dựng đứng cạnh, sát ống kính
  api.lids(w, N[1] + 0.25, 0.5, 0.2);
  api.lids(w, tWhy + 1.1, 0, 0.12);

  // ---------------------------------------------------------------- 5.3–8.06: "PLAN: MOVE IN" viết tay đúng "move", gạch hai lần, nảy
  api.quay(w, N[2], 0.6, 0.3);
  api.look(w, N[2], 12, 8, 0.2);
  var mo = so.coverIn.querySelector(".plan-mo");
  tl.fromTo(mo, { attr: { width: 0 } }, { attr: { width: KW }, duration: 0.42, ease: "power1.inOut", immediateRender: false }, tMove - 0.22);
  api.sfx("pop", tMove, 0.5);
  tl.to(so.coverIn.querySelector(".gach1"), { attr: { "stroke-dashoffset": 0 }, duration: 0.2, ease: "power2.out" }, tMove + 0.3);
  tl.to(so.coverIn.querySelector(".gach2"), { attr: { "stroke-dashoffset": 0 }, duration: 0.2, ease: "power2.out" }, tMove + 0.52);
  tl.to(w.lift, { scaleY: 0.86, scaleX: 1.1, duration: 0.15, ease: "power2.out" }, tMove + 0.45);
  api.hop(w, tMove + 0.6, 60, 0.45);
  api.sfx("liu-lo-vui", tMove + 0.62, 0.4);

  // ---------------------------------------------------------------- 8.06–11.31: đẩy chậm vào Wob, gật nhẹ, nhìn người xem
  api.armSet(w, "L", 168, N[3] - 0.1);
  tl.set(ban.ca, api.holdPose("L", 168, 76, 20, -100), N[3] - 0.1);
  api.quay(w, N[3], 0, 0.3);
  api.look(w, N[3] + 0.1, 0, 2, 0.2);
  tl.to(w.lift, { y: 6, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" }, T("knew", 9.28));

  // ---------------------------------------------------------------- 11.31–13.64: nhặt bút, chỉ vào 'OYMYAKON' đúng "name"
  var s = 0.9;
  api.quay(w, N[4] - 0.05, 0.5, 0.25);
  api.look(w, N[4], 10, 12, 0.15);
  api.armTo(w, "R", N[4], 0.25, 40, "power2.out");
  tl.set(butBan, { opacity: 0 }, N[4] + 0.25);
  tl.set(butCam, Object.assign({ opacity: 1 }, api.camDai("R", 40, 40, 40)), N[4] + 0.25);
  api.armTo(w, "R", N[4] + 0.3, 0.3, -95, "power2.inOut");
  tl.to(butCam, Object.assign(api.camDai("R", -95, -10, 40), { duration: 0.3, ease: "power2.inOut" }), N[4] + 0.3);
  api.look(w, N[4] + 0.4, 14, -6, 0.15);
  api.armTo(w, "R", tName - 0.12, 0.1, -108, "power2.out");        // chọc chỉ đúng "name"
  api.armTo(w, "R", tName, 0.12, -95, "power2.in");

  // ---------------------------------------------------------------- tới hộp: đầu bút chạm chai nước, chai loé sáng
  api.walk(w, tName + 0.12, tName + 0.85, -470, -200, { face: -0.5, endFace: 0.45, keepL: true, step: 0.18 });
  api.armTo(w, "R", tName + 0.85, 0.22, -125, "power2.out");
  tl.to(butCam, Object.assign(api.camDai("R", -125, -20, 40), { duration: 0.22, ease: "power2.out" }), tName + 0.85);
  // quầng sáng của chai đặt trước vách hộp
  var loe = api.cut(the, 260, 260, '<circle cx="130" cy="130" r="128" fill="url(#dio-glowW)"/>', { pos: { x: BO_CUC.hop.x - 95, y: 90, z: BO_CUC.hop.z + BO_CUC.hop.d / 2 + 6 }, ay: 130 });
  gsap.set(loe, { opacity: 0 });
  var tCham = tName + 1.08;
  api.sfx("ting", tCham, 0.45);
  tl.fromTo(loe, { opacity: 0 }, { opacity: 0.95, duration: 0.2, ease: "power2.out", immediateRender: false }, tCham);
  tl.to(loe, { opacity: 0.5, duration: 0.5, ease: "sine.inOut" }, tCham + 0.2);
  tl.to(loe, { opacity: 0, duration: 0.4, ease: "sine.inOut" }, tCham + 0.9);
  tl.fromTo(chai, { rotationZ: 0 }, { rotationZ: 3, duration: 0.1, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, tCham);
  api.lids(w, tCham, 0, 0.1);
  tl.fromTo([w.pupL, w.pupR], { scale: 1 }, { scale: 1.25, transformOrigin: "50% 50%", duration: 0.15, ease: "power2.out", immediateRender: false }, tCham);
  tl.to([w.pupL, w.pupR], { scale: 1, duration: 0.2 }, tCham + 0.5);

  // ---------------------------------------------------------------- 13.64–14.97: lắc đầu chậm, gõ nhẹ con cá bằng bút
  api.armTo(w, "R", N[5], 0.25, -20, "power2.inOut");
  tl.to(butCam, Object.assign(api.camDai("R", -20, 60, 40), { duration: 0.25, ease: "power2.inOut" }), N[5]);
  api.quay(w, tIsnt + 0.05, -0.2, 0.25, "sine.inOut");
  api.quay(w, tIsnt + 0.32, 0.3, 0.28, "sine.inOut");
  api.quay(w, tIsnt + 0.62, 0.05, 0.25, "sine.inOut");
  api.look(w, tIsnt, 0, 2, 0.15);
  api.armTo(w, "R", 14.45, 0.1, 150, "power2.out");                // gõ nhẹ vào con cá trên vai
  tl.to(butCam, Object.assign(api.camDai("R", 150, -150, 40), { duration: 0.1, ease: "power2.out" }), 14.45);
  api.sfx("bonk", 14.56, 0.3);
  api.armTo(w, "R", 14.6, 0.2, 60, "power2.inOut");
  tl.to(butCam, Object.assign(api.camDai("R", 60, 80, 40), { duration: 0.2, ease: "power2.inOut" }), 14.6);

  // ---------------------------------------------------------------- 14.97–16.9: liếc ba lô; khoá tự bung đúng "unpacking"; đè lại không nhìn
  api.quay(w, N[6], -0.6, 0.3);
  api.look(w, N[6], -14, 0, 0.2);
  api.quay(w, N[6] + 0.7, 0, 0.3);
  api.look(w, N[6] + 0.75, 0, 2, 0.2);
  api.lids(w, N[6] + 0.8, 0.35, 0.15);
  tl.to(kheMo, { attr: { transform: "translate(100 30) scale(0.55 1)" }, duration: 0.12, ease: "back.out(3)" }, tUnp);
  tl.to(numKeo, { attr: { transform: "translate(130 30) rotate(-30)" }, duration: 0.12, ease: "back.out(3)" }, tUnp);
  api.sfx("pop", tUnp, 0.45);
  api.armTo(w, "R", tUnp + 0.1, 0.22, 100, "power2.out");             // với bút vắt qua người sang ba lô, mắt vẫn nhìn người xem
  tl.to(butCam, Object.assign(api.camDai("R", 100, 175, 40), { duration: 0.22, ease: "power2.out" }), tUnp + 0.1);
  tl.to(kheMo, { attr: { transform: "translate(100 30) scale(0.05 1)" }, duration: 0.1, ease: "power2.in" }, tUnp + 0.3);
  tl.to(numKeo, { attr: { transform: "translate(100 30) rotate(0)" }, duration: 0.1, ease: "power2.in" }, tUnp + 0.3);
  tl.fromTo(ban.baLo.truoc, { scaleY: 0.85 }, { scaleY: 0.82, duration: 0.06, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, tUnp + 0.38);
  // giữ 0,6 s (tay vẫn đè)

  // ---------------------------------------------------------------- 16.9–17.6: sổ lật sang trang trắng, lao vào trang, phủ giấy
  so.gapLop(1, N[7] - 0.35, 0.22); so.gapLop(0, N[7] - 0.28, 0.22);
  var to = so.themTo(api.sk("M 60 470 C 120 430 200 470 260 440", 3, C.ICE2, ' opacity=".5"'), { ben: "trai", sau: planSVG(false) });
  to.hien(null, false);
  to.hien(N[7] - 0.1, true);
  to.lat(N[7], 0.4, "phai");
  api.sfx("whoosh", N[7], 0.45);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[2.3, 4.7], [tName + 0.1, tName + 0.9], [13.6, 14.6]], amp: 0.8 });
  api.breathe(w, 0, 17.6);
  api.blinks(w, 0.4, 16.6, [[2.3, 4.7], [7.0, 8.0], [tCham - 0.2, tCham + 0.6]], 0);
};
