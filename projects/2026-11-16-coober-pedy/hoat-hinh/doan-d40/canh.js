/* Đoạn d40 (diorama, hiện tại, 20,95 s) – kết video. Trang sổ pop-up dựng đứng ở nửa trái trên khung, ghi "Would Wob move here?".
 * "WOULD MOVE": Wob đóng con dấu lên trang (dau-wob đúng lúc dấu chạm); giữ dấu sạch ≥ 2 s. Đếm ngón tay; "window": giơ khung cửa
 * sổ giấy nhìn qua; "lawn": trải cuộn cỏ thành bãi cỏ bé tí, vỗ vỗ, lắc đầu. Lắc lọ sát tai, hạt sạn rơi ra lấp lánh, nheo mắt
 * giữ 0,8 s. Câu hỏi cuối: khung cửa sổ một tay, nhiệt kế một tay, cân nhắc, đặt cửa sổ xuống, nhìn thẳng, giữ hình tới hết.
 * Từ lúc đóng dấu: dấu + câu hỏi luôn trong x 96–1100, y 160–540; góc end screen (x > 1150, y > 560) không có chữ.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {}, ds = [];
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); ds.push([k, w.start]); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var tuSau = function (k, t0) { for (var i = 0; i < ds.length; i++) if (ds[i][0] === k && ds[i][1] >= t0) return ds[i][1]; return null; };
  var chu = data.chu_tren_do_vat; // "Would Wob move here?", "WOULD MOVE"
  var BO = { hop: { x: -600, z: -440, w: 300, d: 220, h: 150, do: ["anh"] }, so: { x: 40, z: -300, w: 520, d: 600 } };
  var s = 0.9, L = api.lopPopup;
  var TW = 460, TH = 330;
  var trang = api.fp("M 6 6 L " + (TW - 6) + " 6 L " + (TW - 6) + " " + (TH - 6) + " L 6 " + (TH - 6) + " Z", C.PAPER, 6) +
    api.txt(TW / 2, 70, 36, 800, chu[0], C.INK) + api.sk("M 40 96 L " + (TW - 40) + " 96", 3, C.INK, ' opacity=".5"') +
    '<rect x="70" y="130" width="320" height="160" rx="10" fill="none" stroke="' + C.INK + '" stroke-width="3" stroke-dasharray="8 8" opacity=".4"/>' +
    api.dauPhanQuyetSVG(chu[1], TW / 2, 205, 46, -5, "dau-wm");
  var ban = api.dungBan({ hop: BO.hop, wob: { x: 800, z: -120, s: s },
    so: { x: BO.so.x, z: BO.so.z, w: BO.so.w, d: BO.so.d, moSan: true, lop: [L.tuy(trang, TW, TH, { x: 250, banLe: 110 })] } });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  var dauIn = so.lop[0].svg.querySelector(".dau-wm");
  gsap.set(dauIn, { opacity: 0 });
  // đồ trên bàn
  var X0 = 800, Z0 = -120;
  var loBan = api.cut(the, 130, 170, '<g transform="translate(65 90)">' + api.loOpalSVG() + "</g>", { pos: { x: X0 + 190, y: TY, z: Z0 + 120, scale: s }, ay: 170, f: api.F.AM_NHO });
  var coBan = api.cut(the, 150, 70, '<g transform="translate(70 40)">' + api.cuonCoSVG() + "</g>", { pos: { x: X0 - 150, y: TY, z: Z0 + 160 }, ay: 66, f: api.F.AM_NHO });
  var baiCo = api.cut(the, 240, 50, api.baiCoSVG(240), { pos: { x: X0 - 160, y: TY, z: Z0 + 160 }, ax: 0, ay: 48, f: api.F.AM_NHO });
  gsap.set(baiCo, { scaleX: 0.02, opacity: 0 });
  var cuaBan = api.cut(the, 180, 160, '<g transform="translate(90 80)">' + api.khungCuaSoSVG() + "</g>", { pos: { x: X0 - 120, y: TY, z: Z0 + 30, scale: 1.3 }, ay: 156, f: api.F.AM_NHO });
  var nkBan = api.cut(the, 150, 300, api.nhietKeBanSVG([]), { pos: { x: X0 + 300, y: TY, z: Z0 + 40, scale: 0.55 }, f: api.F.AM_NHO });
  var san = api.cut(the, 60, 60, '<g transform="translate(30 36)">' + api.hatSanSVG(true) + "</g>", { pos: { x: 0, y: TY, z: 0, scale: 1.6 }, ay: 46, f: api.F.AM_NHO });
  gsap.set(san, { opacity: 0 });
  var loe = san.svg.querySelector(".san-loe");
  // đồ trong tay
  w.holdR.insertAdjacentHTML("beforeend", '<g class="dau-cam"><g transform="scale(.75)">' + api.conDauSVG() + "</g></g>" +
    '<g class="lo-cam" opacity="0">' + api.loOpalSVG() + "</g>" + '<g class="nk-cam" opacity="0"><g transform="translate(-75 -260) scale(.8)">' + api.nhietKeBanSVG([]) + "</g></g>");
  w.holdL.insertAdjacentHTML("beforeend", '<g class="cua-cam" opacity="0"><g transform="scale(.8)">' + api.khungCuaSoSVG() + "</g></g>");
  var q = function (c) { return w.svg.querySelector(c); };
  var dauCam = q(".dau-cam"), loCam = q(".lo-cam"), nkCam = q(".nk-cam"), cuaCam = q(".cua-cam");
  var P = function (side, arm, dx, dy, g) { var h = api.handWorld(side, arm); return api.holdPose(side, arm, h[0] + (dx || 0), h[1] + (dy || 0), g || 0); };

  // ---------------------------------------------------------------- camera: trang ở nửa trái trên, Wob bên phải; đẩy rất chậm
  var c0 = so.tamLop(0);
  api.camSet(R, null, { cx: c0.x + 330, cy: c0.y + 90, cz: c0.z + 40, k: 330, rx: -8, ry: 0 });
  api.camTo(R, 0, 9.0, { k: 345 }, "sine.inOut");
  api.camTo(R, 9.0, 11.945, { k: 362, cx: c0.x + 338 }, "sine.inOut");

  // ---------------------------------------------------------------- 0–1.2 đóng dấu WOULD MOVE
  api.armSet(w, "R", -150);
  gsap.set(dauCam, P("R", -150, 0, 0, 180));
  api.quaySet(w, -0.5);
  gsap.set([w.pupL, w.pupR], { x: -12, y: -4 });
  api.walk(w, 0.05, 0.5, 640, -110, { face: -0.5, endFace: -0.5, keepR: true, step: 0.22 });
  var WM = tu.would - 2 / 30;
  api.armTo(w, "R", WM - 0.16, 0.16, -100, "power3.in");
  tl.to(dauCam, Object.assign(P("R", -100, -40, 0, 90), { duration: 0.16, ease: "power3.in" }), WM - 0.16);
  tl.set(dauIn, { opacity: 1 }, WM);
  api.sfx("dau-wob", WM, 0.9);
  tl.fromTo(so.lop[0], { x: 250 }, { x: 246, duration: 0.05, yoyo: true, repeat: 3, immediateRender: false }, WM);
  api.lids(w, WM, 0.35, 0.08);
  // nhấc dấu, lùi sang phải (dấu sạch, không che)
  api.armTo(w, "R", WM + 0.25, 0.25, -40, "power2.out");
  tl.to(dauCam, Object.assign(P("R", -40, 0, 0, 180), { duration: 0.25, ease: "power2.out" }), WM + 0.25);
  api.walk(w, WM + 0.4, WM + 1.0, 800, -100, { face: 0.3, endFace: 0, keepR: true, step: 0.2 });
  api.lids(w, WM + 0.6, 0, 0.12);
  api.armTo(w, "R", 2.6, 0.3, 15, "power2.inOut");
  tl.to(dauCam, Object.assign(P("R", 15, 0, 0, 180), { duration: 0.3, ease: "power2.inOut" }), 2.6);
  tl.set(dauCam, { opacity: 0 }, 2.92);
  api.armTo(w, "R", 3.0, 0.25, 0, "power2.inOut");
  w.x = 800; w.z = -100;

  // ---------------------------------------------------------------- 3.7–8.3 đếm trên ngón tay (quiet, steady temperatures, long drives)
  [tu.quiet, tu.steady, tu.long].forEach(function (t, i) {
    api.armTo(w, "L", t - 0.15, 0.15, 120 + i * 8, "back.out(2)");
    api.armTo(w, "L", t + 0.25, 0.2, 100, "power2.inOut");
  });
  api.armTo(w, "L", 8.0, 0.3, 0, "power2.inOut");
  // ---------------------------------------------------------------- "window": giơ khung cửa sổ nhìn qua
  var WIN = tu.window;
  tl.set(cuaBan, { opacity: 0 }, WIN - 0.5); tl.set(cuaCam, { opacity: 1 }, WIN - 0.5);
  gsap.set(cuaCam, P("L", 20, 0, -40));
  api.armTo(w, "L", WIN - 0.5, 0.4, 150, "power2.out");
  tl.to(cuaCam, Object.assign(P("L", 150, 60, 30), { duration: 0.4, ease: "power2.out" }), WIN - 0.5);
  api.quay(w, WIN - 0.3, -0.2, 0.2);
  api.look(w, WIN - 0.1, -6, -4, 0.15);
  api.armTo(w, "L", 10.35, 0.3, 30, "power2.inOut");
  tl.to(cuaCam, Object.assign(P("L", 30, 0, -40), { duration: 0.3, ease: "power2.inOut" }), 10.35);
  tl.set(cuaCam, { opacity: 0 }, 10.65); tl.set(cuaBan, { opacity: 1 }, 10.65);
  tl.fromTo(cuaBan, { y: TY - 40 }, { y: TY, duration: 0.2, ease: "bounce.out", immediateRender: false }, 10.65);
  // ---------------------------------------------------------------- "lawn": trải cuộn cỏ thành bãi cỏ bé tí, vỗ vỗ, lắc đầu
  var LAWN = tu.lawn;
  api.quay(w, LAWN - 0.5, -0.5, 0.2);
  api.look(w, LAWN - 0.5, -14, 12, 0.15);
  api.armTo(w, "R", LAWN - 0.45, 0.25, 40, "power2.out");
  tl.set(baiCo, { opacity: 1 }, LAWN - 0.3);
  tl.to(baiCo, { scaleX: 1, duration: 0.35, ease: "power2.out" }, LAWN - 0.3);
  tl.to(coBan, { x: X0 + 90, rotationZ: 360, scale: 0.4, duration: 0.35, ease: "power2.out" }, LAWN - 0.3);
  tl.set(coBan, { opacity: 0 }, LAWN + 0.05);
  api.sfx("whoosh", LAWN - 0.3, 0.25);
  api.armTo(w, "R", LAWN + 0.1, 0.1, 55, "power1.inOut"); api.armTo(w, "R", LAWN + 0.2, 0.1, 40, "power1.inOut");
  api.armTo(w, "R", LAWN + 0.3, 0.1, 55, "power1.inOut"); api.armTo(w, "R", LAWN + 0.4, 0.1, 40, "power1.inOut");
  [0, 1, 2, 3].forEach(function (i) { api.quay(w, LAWN + 0.55 + i * 0.13, i % 2 ? -0.45 : -0.15, 0.12); });
  api.lids(w, LAWN + 0.55, 0.45, 0.12);
  // ---------------------------------------------------------------- 11.6–15 lắc lọ sát tai; hạt sạn rơi ra lấp lánh; nheo mắt
  api.quay(w, 11.65, 0.4, 0.2);
  api.armTo(w, "R", 11.7, 0.3, 30, "power2.inOut");
  tl.set(loBan, { opacity: 0 }, 11.95); tl.set(loCam, { opacity: 1 }, 11.95);
  gsap.set(loCam, P("R", 30, 0, -40));
  api.armTo(w, "R", 12.0, 0.35, -108, "power2.inOut");
  tl.to(loCam, Object.assign(P("R", -108, -10, -60), { duration: 0.35, ease: "power2.inOut" }), 12.0);
  api.nghieng(w, 12.3, 6, 0.2);
  api.lids(w, 12.3, 0.55, 0.12);
  [12.75, 12.92, 13.09].forEach(function (t, i) { tl.to(loCam, Object.assign(P("R", -108, -10 + (i % 2 ? -8 : 8), -70, i % 2 ? -10 : 10), { duration: 0.08, yoyo: true, repeat: 1 }), t); });
  api.sfx("drop", 13.0, 0.22);
  api.nghieng(w, 13.35, 0, 0.2);
  api.armTo(w, "R", 13.35, 0.25, -40, "power2.inOut");
  tl.to(loCam, Object.assign(P("R", -40, 0, -30, 70), { duration: 0.25, ease: "power2.inOut" }), 13.35);
  var hR = api.handWorld("R", -40), pS = api.wobTheGioi(w, hR[0] + 10, hR[1] - 20);
  tl.set(san, { opacity: 1 }, 13.6);
  tl.fromTo(san, { x: pS.x, y: pS.y, z: w.z + 20 }, { x: pS.x + 30, y: TY, z: w.z + 90, duration: 0.28, ease: "power2.in", immediateRender: false }, 13.6);
  tl.to(san, { x: pS.x + 80, z: w.z + 120, rotationZ: 200, duration: 0.4, ease: "power2.out" }, 13.88);
  api.sfx("drop", 13.88, 0.25);
  tl.to(loe, { opacity: 1, duration: 0.12 }, tu.mostly);
  tl.fromTo(loe, { scale: 0.4, transformOrigin: "50% 50%" }, { scale: 1.3, duration: 0.3, ease: "back.out(3)", immediateRender: false }, tu.mostly);
  api.sfx("ting", tu.mostly, 0.4);
  api.look(w, 13.95, 12, 14, 0.15);
  api.lids(w, tu.mostly + 0.05, 0.6, 0.15);   // nheo mắt, giữ 0,8 s
  tl.to(loe, { opacity: 0.6, duration: 0.4 }, 15.0);
  // ---------------------------------------------------------------- 15.1–20.95 cửa sổ một tay, nhiệt kế một tay, cân nhắc; đặt cửa sổ xuống; nhìn thẳng
  tl.to(loCam, Object.assign(P("R", 10, 0, -40), { duration: 0.3 }), 15.0);
  api.armTo(w, "R", 15.0, 0.3, 10, "power2.inOut");
  tl.set(loCam, { opacity: 0 }, 15.3); tl.set(nkBan, { opacity: 0 }, 15.3); tl.set(nkCam, { opacity: 1 }, 15.3);
  gsap.set(nkCam, P("R", 10, 0, 0));
  api.lids(w, 15.2, 0, 0.12);
  api.quay(w, 15.3, 0, 0.2);
  api.armTo(w, "R", 15.4, 0.35, -110, "back.out(1.4)");
  tl.to(nkCam, Object.assign(P("R", -110, 10, 10), { duration: 0.35, ease: "back.out(1.4)" }), 15.4);
  // "every window you own": quay sang khung cửa sổ đứng, gõ gõ vào nó
  var EV = tu.every;
  api.quay(w, EV - 0.3, -0.6, 0.2);
  api.look(w, EV - 0.3, -14, 0, 0.15);
  api.armTo(w, "L", EV - 0.25, 0.25, 80, "power2.out");
  [0, 1, 2].forEach(function (i) { api.armTo(w, "L", EV + i * 0.16, 0.08, 92, "power1.in"); api.armTo(w, "L", EV + 0.08 + i * 0.16, 0.08, 80, "power1.out"); });
  [0, 1, 2].forEach(function (i) { tl.fromTo(cuaBan, { rotationZ: 0 }, { rotationZ: -3, duration: 0.05, yoyo: true, repeat: 1, immediateRender: false }, EV + 0.08 + i * 0.16); });
  api.sfx("bonk", EV + 0.08, 0.2);
  api.armTo(w, "L", 17.0, 0.3, 0, "power2.inOut");
  // cân nhắc nhiệt kế
  [[17.1, 1], [17.6, -1]].forEach(function (k) {
    api.armTo(w, "R", k[0], 0.45, -110 + 12 * k[1], "sine.inOut");
    tl.to(nkCam, Object.assign(P("R", -110 + 12 * k[1], 10, 10), { duration: 0.45, ease: "sine.inOut" }), k[0]);
  });
  api.quay(w, 18.2, 0, 0.25);
  api.armTo(w, "R", 18.4, 0.4, -60, "power2.inOut");
  tl.to(nkCam, Object.assign(P("R", -60, 10, 10), { duration: 0.4, ease: "power2.inOut" }), 18.4);
  api.look(w, 18.5, 0, 2, 0.2);
  api.lids(w, 19.6, 0.3, 0.2);

  api.khauHinh(w);
  api.gatDau(w, { amp: 0.7, bo: [[0, 1.6], [12.2, 15.0]] });
  api.breathe(w, 0, 20.9);
  api.blink(w, 4.5, 0); api.blink(w, 20.2, 0.3);
};
