/* Đoạn d38 (diorama, hiện tại, 20,75 s): cắt cứng về bàn. Wob về bàn, kéo đèn sáng lên. "So here's how the jar adds up":
 * kỷ vật xếp thành hàng (lọ opal, bưu thiếp mặt cắt, bóng golf, hạt sạn, cuộn cỏ, biển mini, trang ký hoạ đồi trong sổ).
 * Ba ý: đẩy lọ opal ("Opal"), bưu thiếp mặt cắt ("heat"), hạt sạn ("digging") lên trước. Nhiệt kế nhỏ: "23°C (73°F)";
 * "twenty-four": Wob búng, cột nhích lên, nhãn thành "~24°C (~75°F)". "Would I move there?": cầm con dấu, ngập ngừng. Ra cắt cứng.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // "23°C (73°F)", "~24°C (~75°F)"
  var BO = { hop: { x: -600, z: -440, w: 300, d: 220, h: 150, do: ["anh"] }, so: { x: 40, z: -300, w: 520, d: 600 }, wob: { x: -250, z: 40 } };
  var s = 0.9;
  var ban = api.dungBan({ hop: BO.hop, wob: { x: -560, z: 40, s: s }, so: { x: BO.so.x, z: BO.so.z, w: BO.so.w, d: BO.so.d, lop: [] } });
  var w = ban.wob, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  // mũ rộng vành treo trên móc tường sau lưng
  api.cut(the, 240, 140, api.sk("M 120 6 L 120 30", 5) + '<g transform="translate(120 84)">' + api.muRongVanhSVG() + "</g>", { pos: { x: -700, y: -380, z: -1270, scale: 1.6 }, f: api.F.AM });
  ban.diuDen(null, 0, 0.6);
  // hàng kỷ vật (z 200)
  var Z = 210;
  var hang = {
    lo: api.cut(the, 130, 170, '<g transform="translate(65 90)">' + api.loOpalSVG() + "</g>", { pos: { x: -150, y: TY, z: Z, scale: s }, ay: 170, f: api.F.AM_NHO }),
    bt: api.cut(the, 380, 260, api.buuThiepMatCatSVG(), { pos: { x: -10, y: TY, z: Z - 20, scale: 0.42, rotationX: -8 }, f: api.F.AM_NHO }),
    golf: api.cut(the, 160, 160, '<g transform="translate(80 80)">' + api.bongGolfSVG() + "</g>", { pos: { x: 120, y: TY, z: Z }, ay: 104, f: api.F.AM_NHO }),
    san: api.cut(the, 40, 40, '<g transform="translate(20 22)">' + api.hatSanSVG(false) + "</g>", { pos: { x: 210, y: TY, z: Z, scale: 1.6 }, ay: 34, f: api.F.AM_NHO }),
    co: api.cut(the, 150, 70, '<g transform="translate(70 40)">' + api.cuonCoSVG() + "</g>", { pos: { x: 300, y: TY, z: Z }, ay: 66, f: api.F.AM_NHO }),
    bien: api.cut(the, 120, 120, api.bienGoSVG([], { w: 120, h: 120 }), { pos: { x: 410, y: TY, z: Z - 10, scale: 0.9 }, f: api.F.AM_NHO }),
    ky: api.cut(the, 200, 150, api.fp("M 4 146 L 4 4 L 196 4 L 196 146 Z", C.PAPER, 5) + '<g transform="translate(14 40)">' + api.doiMesaSVG(172, 90, { seed: 7, net: 3 }) + "</g>", { pos: { x: 530, y: TY, z: Z - 30, scale: 0.75, rotationX: -10 }, f: api.F.AM_NHO })
  };
  var golfSang = hang.golf.svg.querySelector(".golf-sang");
  api.moiKhung(function (t) { gsap.set(golfSang, { opacity: 0.75 + 0.25 * Math.sin(t * 2.4) }); });
  var thuTu = ["lo", "bt", "golf", "san", "co", "bien", "ky"];
  thuTu.forEach(function (k) { gsap.set(hang[k], { opacity: 0 }); });
  // nhiệt kế để bàn + nhãn trên thẻ giấy (chữ chỉ từ chu_tren_do_vat)
  var nk = api.cut(the, 340, 420, '<g transform="translate(95 0)">' + api.nhietKeBanSVG([]) + "</g>" +
    api.fp("M 10 316 L 330 316 L 330 412 L 10 412 Z", C.PAPER, 5) +
    '<g class="nhan23">' + api.txt(170, 380, 48, 800, chu[0], C.INK) + "</g>" +
    '<g class="nhan24" opacity="0">' + api.txt(170, 380, 46, 800, chu[1], "#a8322a") + "</g>",
    { pos: { x: 230, y: TY, z: 40, scale: 0.75 }, f: api.F.AM_NHO });
  var merc = nk.svg.querySelector(".merc"), n23 = nk.svg.querySelector(".nhan23"), n24 = nk.svg.querySelector(".nhan24");
  gsap.set(merc, { svgOrigin: "75 236", scaleY: 0.55 });
  gsap.set(nk, { opacity: 0 });
  // con dấu trên bàn, con dấu trong tay
  var dauBan = api.cut(the, 110, 110, '<g transform="translate(55 12) scale(.8)">' + api.conDauSVG() + "</g>", { pos: { x: -330, y: TY, z: 150 }, f: api.F.AM_NHO });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="dau-cam" opacity="0"><g transform="scale(.75)">' + api.conDauSVG() + "</g></g>");
  var dauCam = w.holdR.querySelector(".dau-cam");
  var dau = function (arm) { var h = api.handWorld("R", arm); return api.holdPose("R", arm, h[0], h[1], 180); };

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: -150, cy: 80, cz: -40, k: 200, rx: -14, ry: 4 });
  api.camTo(R, 0, 2.8, { cx: -80, k: 240 }, "sine.inOut");
  api.camTo(R, 2.8, 0.9, { cx: 150, cy: 150, cz: 60, k: 260, rx: -20, ry: 0 }, "power2.inOut"); // hàng kỷ vật
  api.camTo(R, 3.7, 8.5, { k: 300 }, "sine.inOut");
  var cn = { x: 230, y: TY - 150, z: 40 };
  api.camTo(R, 12.3, 0.9, { cx: cn.x - 130, cy: cn.y, cz: cn.z, k: 400, rx: -8, ry: 0 }, "power2.inOut"); // cận nhiệt kế
  api.camTo(R, 13.2, 5.7, { k: 440 }, "sine.inOut");
  api.camTo(R, 19.1, 0.6, { cx: -150, cy: 60, cz: 20, k: 380, rx: -10, ry: 2 }, "power2.inOut");
  api.camTo(R, 19.7, 1.05, { k: 420 }, "sine.inOut");

  // ---------------------------------------------------------------- 0–2.8 về bàn, kéo đèn
  api.walk(w, 0.0, 1.2, BO.wob.x, BO.wob.z, { face: 0.4, endFace: -0.3, step: 0.22 });
  api.armTo(w, "L", 1.35, 0.3, 140, "power2.out");
  api.look(w, 1.35, -14, -12, 0.15);
  api.armTo(w, "L", 1.75, 0.18, 110, "power3.in");
  ban.diuDen(1.85, 0.25, 0);
  api.sfx("bonk", 1.85, 0.2);
  api.armTo(w, "L", 2.1, 0.3, 0, "power2.inOut");
  api.quay(w, 2.2, 0.5, 0.25);
  // ---------------------------------------------------------------- 2.9–4.5 kỷ vật xếp hàng
  thuTu.forEach(function (k, i) {
    var t = 2.95 + i * 0.18;
    tl.set(hang[k], { opacity: 1 }, t);
    tl.fromTo(hang[k], { y: TY - 50 }, { y: TY, duration: 0.2, ease: "bounce.out", immediateRender: false }, t);
    api.sfx(i % 2 ? "drop" : "pop", t + 0.1, 0.22);
  });
  tl.set(nk, { opacity: 1 }, 4.3);
  tl.fromTo(nk, { y: TY - 50 }, { y: TY, duration: 0.2, ease: "bounce.out", immediateRender: false }, 4.3);
  api.look(w, 3.0, 14, 8, 0.15);
  api.armTo(w, "R", 3.0, 0.3, -70, "power2.out");
  // ---------------------------------------------------------------- ba ý: đẩy lọ, bưu thiếp, hạt sạn lên trước
  [["lo", tu.opal], ["bt", tu.heat], ["san", tu.digging]].forEach(function (p) {
    var el = hang[p[0]], z0 = gsap.getProperty(el, "z");
    tl.to(el, { z: z0 + 70, duration: 0.25, ease: "back.out(2)" }, p[1] - 0.2);
    api.armTo(w, "R", p[1] - 0.25, 0.15, -95, "power2.out");
    api.armTo(w, "R", p[1] - 0.05, 0.25, -70, "power2.inOut");
    api.sfx("bonk", p[1] - 0.05, 0.18);
  });
  api.armTo(w, "R", 11.6, 0.3, 0, "power2.inOut");
  // ---------------------------------------------------------------- nhiệt kế: 23 → búng → ~24
  var T24 = tu.twentyfour;
  tl.to(merc, { scaleY: 0.62, duration: 0.5, ease: "power2.out" }, 15.4);
  api.sfx("ting", tu.twentythree, 0.3);
  tl.to(nk, { rotationZ: -4, duration: 0.06, yoyo: true, repeat: 3, ease: "sine.inOut" }, T24 - 0.25);
  api.sfx("bonk", T24 - 0.25, 0.25);
  tl.to(merc, { scaleY: 0.66, duration: 0.25, ease: "back.out(2)" }, T24 - 0.15);
  tl.to(n23, { opacity: 0, duration: 0.1 }, T24 - 0.05);
  tl.to(n24, { opacity: 1, duration: 0.12 }, T24 - 0.05);
  // ---------------------------------------------------------------- "Would I move there?": cầm con dấu, ngập ngừng
  api.quay(w, 19.15, -0.3, 0.2);
  api.armTo(w, "R", 19.3, 0.25, 30, "power2.out");
  tl.set(dauBan, { opacity: 0 }, 19.55); tl.set(dauCam, { opacity: 1 }, 19.55);
  gsap.set(dauCam, dau(30));
  api.armTo(w, "R", 19.6, 0.35, -120, "power2.out");
  tl.to(dauCam, Object.assign(dau(-120), { duration: 0.35, ease: "power2.out" }), 19.6);
  api.quay(w, 19.8, 0, 0.2);
  api.look(w, 19.85, 4, -10, 0.15);
  api.lids(w, 20.0, 0.4, 0.15);
  tl.to(dauCam, Object.assign(dau(-110), { duration: 0.18, yoyo: true, repeat: 1, ease: "sine.inOut" }), 20.2);

  api.khauHinh(w);
  api.gatDau(w, { amp: 0.7, bo: [[0, 2.4]] });
  api.breathe(w, 0, 20.7);
  api.blink(w, 6.0, 0); api.blink(w, 11.8, 0); api.blink(w, 17.5, 0);
};
