/* Đoạn d32 (diorama, hiện tại, 13,8 s) – tiếp outro ở bàn kỷ vật, nắng sớm. Cắt vào, cắt ra.
 * "one small bag": Wob giơ hộp cơm nhỏ một tay, tay kia khẽ đẩy ba lô khổng lồ trượt khỏi mép bàn bên trái (rơi ra khỏi khung, tiếng
 * bonk; d33 nó nằm dưới chân bàn bên trái). "love the water": tay lượn như sóng; "radio": nghiêng đầu nghe; "you'd do better": chỉ
 * về người xem. "one last shake": lắc bình xịt, tem nguyên; muỗi giấy bò lại đọc nhãn; "Still smug": muỗi ngồi phịch lên nắp, ngay
 * trên tem, vắt chân tự mãn. Câu hỏi cuối: Wob kéo mẩu cầu tàu giấy ra mép bàn, đặt phao vịt lên, đẩy về phía người xem, nhướng một
 * bên mắt; giữ hình tới hết (≈ 1,3 s sau chữ cuối), camera đẩy chậm.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {}, ds = [];
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); ds.push([k, w.start]); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var tuSau = function (k, t0, mac) { for (var i = 0; i < ds.length; i++) if (ds[i][0] === k && ds[i][1] >= t0) return ds[i][1]; return mac; };

  // ---------------------------------------------------------------- dựng (cùng bàn, sổ đã gấp)
  var ban = api.dungBan({ hop: { x: -620, z: -480 }, wob: { x: 600, z: -200, s: 0.9 }, so: { x: -60, z: -240, w: 500, d: 600 } });
  var w = ban.wob, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";
  api.div("dio-ovl", ban.stage, "background:linear-gradient(105deg, rgba(0,0,0,0) 45%, rgba(255,226,160,.16) 70%, rgba(255,236,190,.26) 100%);");
  var BL = { x: 330, z: -330, s: 0.86 };
  var balo = api.cut(the, 300, 470, api.baLoKhongLoSVG({ uot: 0.45 }), { pos: { x: BL.x, y: TY, z: BL.z, scale: BL.s }, ay: 440, f: api.F.AM });
  var hop = api.cut(the, 110, 90, '<g transform="translate(55 84)">' + api.hopComSVG() + "</g>", { pos: { x: 800, y: TY, z: -230, scale: 0.9 }, f: api.F.AM_NHO });
  var XIT = { x: 820, z: 10 };
  var xit = api.cut(the, 90, 205, '<g transform="translate(45 200)">' + api.binhXitSVG() + "</g>", { pos: { x: XIT.x, y: TY, z: XIT.z, scale: 0.86 }, f: api.F.AM_NHO });
  var phao = api.cut(the, 190, 120, '<g transform="translate(90 70)">' + api.phaoVitSVG() + "</g>", { pos: { x: 930, y: TY, z: -250, scale: 0.8 }, f: api.F.AM_NHO });
  var cau = api.cut(the, 300, 84, api.cauTauGiaySVG(300), { pos: { x: 440, y: TY, z: -60, scale: 0.9 }, f: api.F.AM_NHO });

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 560, cy: 60, cz: -150, k: 290, rx: -15, ry: -3 });
  api.camTo(R, 0, 0.8, { k: 300 }, "sine.inOut");
  api.camTo(R, 0.8, 0.9, { cx: 500, k: 290 }, "power2.inOut");
  api.camTo(R, 1.7, 4.2, { cx: 560, k: 330 }, "sine.inOut");
  api.camTo(R, 5.9, 0.7, { cx: 700, cy: 80, cz: -90, k: 390, rx: -16, ry: -4 }, "power2.inOut");
  api.camTo(R, 6.6, 1.5, { k: 410 }, "sine.inOut");
  api.camTo(R, 8.1, 0.7, { cx: 790, cy: 120, cz: -10, k: 560, rx: -14, ry: -2 }, "power2.inOut");
  api.camTo(R, 8.8, 1.5, { k: 590 }, "sine.inOut");
  api.camTo(R, 10.3, 0.8, { cx: 600, cy: 90, cz: -40, k: 380, rx: -15, ry: 0 }, "power2.inOut");
  api.camTo(R, 11.1, DUR - 11.1, { k: 440, cz: 0 }, "sine.inOut");

  // ---------------------------------------------------------------- 0.15–1.9 "one small bag": giơ hộp cơm, đẩy ba lô khỏi mép bàn
  api.quaySet(w, 0);
  var tOne = tu.one || 0.91, tSmall = tu.small || 1.11;
  w.holdR.insertAdjacentHTML("beforeend", '<g class="hc" opacity="0"><g transform="scale(.9)">' + api.hopComSVG() + "</g></g>");
  var hcCam = w.holdR.querySelector(".hc");
  api.armTo(w, "R", tOne - 0.45, 0.25, -30, "power2.out");
  tl.set(hop, { opacity: 0 }, tOne - 0.2); tl.set(hcCam, { opacity: 1 }, tOne - 0.2);
  tl.fromTo(hcCam, api.holdPose("R", -30, 390, 300, 0), Object.assign(api.holdPose("R", -130, 380, 130, 0), { duration: 0.3, ease: "back.out(1.6)", immediateRender: false }), tOne - 0.2);
  api.armTo(w, "R", tOne - 0.2, 0.3, -130, "back.out(1.6)");
  api.quay(w, tOne - 0.1, -0.5, 0.2); api.look(w, tOne - 0.05, -16, 4, 0.15);
  api.armTo(w, "L", tSmall - 0.1, 0.12, 60, "power2.out");
  api.armTo(w, "L", tSmall + 0.02, 0.12, 100, "power3.in");
  tl.to(balo, { x: BL.x - 330, rotationZ: -18, duration: 0.55, ease: "power2.in" }, tSmall + 0.1);
  tl.to(balo, { x: BL.x - 760, y: TY + 260, rotationZ: -80, duration: 0.4, ease: "power2.in" }, tSmall + 0.65);
  tl.set(balo, { opacity: 0 }, tSmall + 1.1);
  api.sfx("bonk", tSmall + 1.0, 0.7);
  api.armTo(w, "L", tSmall + 0.5, 0.3, 0, "power2.inOut");
  api.quay(w, tSmall + 0.6, 0, 0.2); api.look(w, tSmall + 0.65, 0, 3, 0.15); api.lids(w, tSmall + 0.7, 0.45, 0.15);
  api.armTo(w, "R", 1.95, 0.3, -30, "power2.inOut");
  tl.to(hcCam, Object.assign(api.holdPose("R", -30, 390, 300, 0), { duration: 0.3 }), 1.95);
  tl.set(hcCam, { opacity: 0 }, 2.26); tl.set(hop, { opacity: 1 }, 2.26);
  api.lids(w, 2.0, 0, 0.15);
  // "love the water": tay lượn sóng
  var tLove = tu.love || 2.06;
  [0, 1, 2, 3].forEach(function (i) {
    api.armTo(w, "L", tLove + 0.1 + i * 0.18, 0.18, i % 2 ? 70 : 100, "sine.inOut");
    api.armTo(w, "R", tLove + 0.1 + i * 0.18, 0.18, i % 2 ? -100 : -70, "sine.inOut");
  });
  api.armTo(w, "L", tLove + 0.85, 0.25, 0, "power2.inOut"); api.armTo(w, "R", tLove + 0.85, 0.25, 0, "power2.inOut");
  // "radio": nghiêng đầu nghe
  var tRad = tu.radio || 4.3;
  api.nghieng(w, (tu.hearing || 3.47) - 0.2, 9, 0.3); api.look(w, (tu.hearing || 3.47) - 0.1, 14, -6, 0.2); api.lids(w, tRad - 0.3, 0.35, 0.2);
  api.armTo(w, "R", (tu.hearing || 3.47), 0.3, -150, "power2.out");
  api.nghieng(w, tRad + 0.5, 0, 0.3); api.lids(w, tRad + 0.5, 0, 0.15);
  api.armTo(w, "R", tRad + 0.5, 0.3, 0, "power2.inOut");
  // "you'd do better than me": chỉ về người xem
  var tYoud = tu.youd || 5.19;
  api.look(w, tYoud - 0.2, 0, 4, 0.15);
  api.armTo(w, "R", tYoud - 0.1, 0.25, -62, "back.out(2)");
  api.hop(w, tYoud + 0.4, 8, 0.2);
  api.armTo(w, "R", 6.15, 0.3, 0, "power2.inOut");

  // ---------------------------------------------------------------- 6.5–8.7 lắc bình xịt (tem nguyên), đặt lại
  var tGave = (tu.somewhere || 6.51) - 0.25, tShake = (tu.there || 7.15) + 0.2;   // "Somewhere out there": cầm, lắc bình xịt
  w.holdR.insertAdjacentHTML("beforeend", '<g class="xc" opacity="0"><g transform="scale(.95)">' + api.binhXitSVG() + "</g></g>");
  var xc = w.holdR.querySelector(".xc");
  var xp = function (arm, dx, dy, g) { var h = api.handWorld("R", arm); return api.holdPose("R", arm, h[0] + (dx || 0), h[1] + 80 + (dy || 0), g || 0); };
  api.quay(w, tGave - 0.5, 0.5, 0.25); api.look(w, tGave - 0.45, 14, 10, 0.15);
  api.walk(w, tGave - 0.45, tGave + 0.05, 680, -120, { face: 0.5, endFace: 0.3, step: 0.25, keepR: true });
  api.armTo(w, "R", tGave + 0.05, 0.2, -30, "power2.out");
  tl.set(xit, { opacity: 0 }, tGave + 0.25); tl.set(xc, Object.assign({ opacity: 1 }, xp(-30)), tGave + 0.25);
  api.armTo(w, "R", tGave + 0.3, 0.3, -130, "back.out(1.5)");
  tl.to(xc, Object.assign(xp(-130), { duration: 0.3, ease: "back.out(1.5)" }), tGave + 0.3);
  for (var i = 0; i < 6; i++) {
    var a = -130 + (i % 2 ? -12 : 12);
    api.armTo(w, "R", tShake - 0.6 + i * 0.09, 0.09, a, "sine.inOut");
    tl.to(xc, Object.assign(xp(a, 0, 0, i % 2 ? -14 : 14), { duration: 0.09, ease: "sine.inOut" }), tShake - 0.6 + i * 0.09);
  }
  api.armTo(w, "R", tShake, 0.15, -130, "power2.out");
  tl.to(xc, Object.assign(xp(-130), { duration: 0.15 }), tShake);
  api.look(w, tShake - 0.5, 14, -10, 0.15);
  var tSealed = tShake + 0.3;
  api.lids(w, tShake - 0.1, 0.4, 0.15);
  // đặt lại xuống bàn (tem quay ra)
  api.armTo(w, "R", tSealed + 0.05, 0.3, -30, "power2.inOut");
  tl.to(xc, Object.assign(xp(-30), { duration: 0.3, ease: "power2.inOut" }), tSealed + 0.05);
  (function () { var h = api.handWorld("R", -30), p = api.wobTheGioi({ x: 680, y: TY, z: -120, s: 0.9 }, h[0], h[1] + 80); XIT.x = p.x; XIT.z = -80; })();
  tl.set(xit, { x: XIT.x, z: XIT.z, opacity: 1 }, tSealed + 0.36); tl.set(xc, { opacity: 0 }, tSealed + 0.36);
  api.armTo(w, "R", tSealed + 0.4, 0.25, 0, "power2.inOut");

  // ---------------------------------------------------------------- 8.0–10.8 muỗi bò lại đọc nhãn, rồi ngồi vắt chân trên tem
  var muBo = api.cut(the, 140, 110, '<g transform="translate(70 56)">' + api.muoiGiaySVG() + "</g>", { pos: { x: 1250, y: TY, z: XIT.z + 30, scale: 0.95 }, ax: 70, ay: 104, f: api.F.AM_NHO });
  var muNgoi = api.cut(the, 140, 110, '<g transform="translate(70 56)">' + api.muoiGiaySVG({ ngoi: true }) + "</g>", { pos: { x: 0, y: 0, z: 0, scale: 0.95 }, ax: 56, ay: 78, f: api.F.AM_NHO });
  gsap.set(muNgoi, { opacity: 0 });
  var canhBo = muBo.svg.querySelector(".mu-canh"), chanBo = muBo.svg.querySelector(".mu-chan"), conBo = muBo.svg.querySelector(".mu-con");
  var miNgoi = muNgoi.svg.querySelector(".mu-mi"), canhNgoi = muNgoi.svg.querySelector(".mu-canh");
  gsap.set(muBo, { scaleX: -0.95 }); // quay trái
  // muỗi bay vào từ trên bên phải, đậu xuống bàn ("a mosquito"), rồi bò lại bình xịt
  var tMu = tu.mosquito || 7.9, tBay = tMu - 0.85, dau = { x: XIT.x + 230, z: XIT.z + 30 };
  tl.fromTo(muBo, { x: dau.x + 520, y: TY - 420 }, { x: dau.x, duration: 0.8, ease: "power2.out", immediateRender: false }, tBay);
  tl.fromTo(muBo, { y: TY - 420 }, { y: TY, duration: 0.8, ease: "sine.inOut", immediateRender: false }, tBay);
  tl.fromTo(muBo.svg.querySelector(".mu-canh"), { scaleY: 1 }, { scaleY: 0.3, duration: 0.03, yoyo: true, repeat: 25, transformOrigin: "50% 100%", immediateRender: false }, tBay);
  gsap.set(muBo, { opacity: 0 }); tl.set(muBo, { opacity: 1 }, tBay);
  api.sfx("muoi", tBay, 0.45);
  var tBo = tMu, tToi = tMu + 0.5, viTriDoc = XIT.x + 80;
  tl.fromTo(muBo, { x: dau.x }, { x: viTriDoc, duration: tToi - tBo, ease: "power1.inOut", immediateRender: false }, tBo);
  var nb = Math.round((tToi - tBo) / 0.12);
  tl.fromTo(chanBo, { skewX: -8 }, { skewX: 8, duration: 0.12, yoyo: true, repeat: nb - 1, ease: "sine.inOut", immediateRender: false }, tBo);
  tl.fromTo(muBo, { y: TY }, { y: TY - 4, duration: 0.12, yoyo: true, repeat: nb - 1, ease: "sine.inOut", immediateRender: false }, tBo);
  tl.to(conBo, { x: -2, y: -3, duration: 0.15 }, tToi + 0.05);          // đọc nhãn (ngước nhìn hình con muỗi gạch chéo)
  tl.to(muBo, { rotationZ: -8, duration: 0.25, yoyo: true, repeat: 1 }, tToi + 0.2);
  // "Still smug": ngồi phịch lên nắp, trên tem
  var tSmug = tu.pleased || 9.24, napY = TY - 192 * 0.86;   // "very pleased"
  var tNhay = tSmug - 0.35;
  tl.set(muBo, { opacity: 0 }, tNhay + 0.16);
  tl.set(muNgoi, { opacity: 1, x: viTriDoc, y: TY - 10, z: XIT.z + 30 }, tNhay + 0.16);
  tl.to(muNgoi, { x: XIT.x + 6, z: XIT.z + 4, duration: 0.34, ease: "power1.inOut" }, tNhay + 0.16);
  tl.to(muNgoi, { y: napY - 70, duration: 0.18, ease: "power2.out" }, tNhay + 0.16);
  tl.to(muNgoi, { y: napY + 2, duration: 0.16, ease: "power2.in" }, tNhay + 0.34);
  tl.to(muNgoi, { scaleY: 0.82, scaleX: 1.05, duration: 0.06, yoyo: true, repeat: 1 }, tNhay + 0.5);
  tl.fromTo(canhBo, { scaleY: 1 }, { scaleY: 0.4, duration: 0.03, yoyo: true, repeat: 5, transformOrigin: "50% 100%", immediateRender: false }, tNhay);
  tl.to(miNgoi, { opacity: 1, duration: 0.1 }, tSmug + 0.3);
  api.look(w, tNhay + 0.2, 14, 10, 0.15, 1.15);
  api.lids(w, tNhay, 0, 0.15);                                   // mặt hào hứng nhìn muỗi
  // nhún vai
  api.armTo(w, "L", tSmug + 0.3, 0.2, 55, "back.out(2)"); api.armTo(w, "R", tSmug + 0.3, 0.2, -55, "back.out(2)");
  tl.to(w.upper, { y: -10, svgOrigin: "200 300", duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }, tSmug + 0.32);
  api.armTo(w, "L", tSmug + 0.8, 0.25, 0, "power2.inOut"); api.armTo(w, "R", tSmug + 0.8, 0.25, 0, "power2.inOut");

  // ---------------------------------------------------------------- 10.85–13.8 cầu tàu giấy + phao vịt, đẩy về người xem, nhướng mày
  var tWhat = tu.what || 10.85, tDock = tu.dock || 11.66, tIsl = tuSau("island", 12, 12.47);
  api.lids(w, tWhat - 0.3, 0, 0.15);
  api.quay(w, tWhat - 0.3, -0.4, 0.25); api.look(w, tWhat - 0.25, -14, 10, 0.15);
  api.armTo(w, "L", tWhat - 0.2, 0.25, 70, "power2.out");
  tl.to(cau, { z: 120, x: 470, duration: 0.6, ease: "power2.inOut" }, tWhat);
  api.armTo(w, "L", tWhat + 0.25, 0.35, 30, "power2.inOut");
  // phao vịt lên cầu tàu
  tl.to(phao, { x: 480, z: 128, duration: 0.5, ease: "power2.inOut" }, tDock - 0.45);
  tl.to(phao, { y: TY - 120, duration: 0.25, ease: "power2.out" }, tDock - 0.45);
  tl.to(phao, { y: TY - 62, duration: 0.25, ease: "bounce.out" }, tDock - 0.2);
  api.armTo(w, "R", tDock - 0.5, 0.3, -60, "power2.out"); api.armTo(w, "R", tDock + 0.1, 0.3, 0, "power2.inOut");
  api.sfx("pop", tDock + 0.02, 0.3);
  // đẩy cầu tàu về phía người xem
  tl.to([cau], { z: 230, duration: 0.45, ease: "power2.out" }, tIsl - 0.5);
  tl.to(phao, { z: 238, duration: 0.45, ease: "power2.out" }, tIsl - 0.5);
  api.armTo(w, "L", tIsl - 0.55, 0.3, 80, "power2.out");
  api.armTo(w, "L", tIsl + 0.1, 0.35, 20, "power2.inOut");
  api.quay(w, tIsl, 0, 0.2); api.look(w, tIsl + 0.05, 0, 2, 0.15);
  tl.to(w.lidL, { scaleY: 0.45, svgOrigin: "160 124", duration: 0.15 }, tIsl + 0.2);   // nhướng một bên (mắt kia mở to)
  tl.to(w.pupR, { scale: 1.12, transformOrigin: "50% 50%", duration: 0.15 }, tIsl + 0.2);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { amp: 0.8 });
  api.breathe(w, 0, DUR);
  api.blink(w, 3.0, 0); api.blink(w, 6.2, 0);
};
