/* Đoạn d26 (diorama, hiện tại, 3,07 s): cắt cứng về bàn. Wob đã chĩa bút chì vào con cá nằm trên bàn, nhìn thẳng người xem,
 * "Yes." – "This fish." gõ bút lên con cá: cộc, cá vẫn cứng; giữ 0,6 s. Ra: cắt cứng. Không chữ trên đồ vật.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });

  // ---------------------------------------------------------------- bố cục bàn kỷ vật chung của tập (giống d01, d18)
  var BO_CUC = {
    hop: { x: -200, z: -400, w: 300, d: 220, h: 150, do: ["anh"] },
    so: { x: 480, z: -330, w: 460, d: 580 },
    baLo: { x: -660, z: -250, s: 0.85 },
    ongBut: { x: -760, z: 430 },
    ongButNho: { x: 430, z: 140, s: 0.75 },
    HOME: { x: 150, z: 0 },
    CA_BAN: { x: -20, z: 10 }, GANG_BAN: { x: -235, z: 40 }
  };
  var ban = api.dungBan({
    hop: BO_CUC.hop, baLo: BO_CUC.baLo, ongBut: BO_CUC.ongBut, ongButNho: BO_CUC.ongButNho,
    wob: { x: BO_CUC.HOME.x, z: BO_CUC.HOME.z, s: 0.9 },
    so: { x: BO_CUC.so.x, z: BO_CUC.so.z, w: BO_CUC.so.w, d: BO_CUC.so.d, lop: [], moSan: true }
  });
  var w = ban.wob, R = ban.rig, TY = ban.TY, the = ban.the, s = 0.9;
  api.cut(ban.trongHop, 170, 120, api.toRoiSVG(), { pos: { x: 70, y: -8, z: -30, rotationZ: 8, scale: 0.75 }, f: api.F.AM_NHO });
  api.cut(ban.trongHop, 90, 170, api.chaiNuocSVG(false), { pos: { x: -95, y: -12, z: 20 }, f: api.F.AM_NHO });
  var ca = api.cut(the, 320, 124, api.caNamSVG(-1), { pos: { x: BO_CUC.CA_BAN.x, y: TY, z: BO_CUC.CA_BAN.z, scale: s }, f: api.F.AM });
  api.cut(the, 120, 90, '<g transform="translate(60 46) rotate(-78)">' + api.gangLoSVG() + "</g>", { pos: { x: BO_CUC.GANG_BAN.x, y: TY, z: BO_CUC.GANG_BAN.z, scale: s }, f: api.F.AM_NHO });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="but-cam">' + api.butChiSVG() + "</g>");
  var but = w.holdR.querySelector(".but-cam");

  // ---------------------------------------------------------------- khung đầu: bút đã chĩa vào cá, mắt nhìn thẳng người xem
  var A = 52;
  api.armSet(w, "R", A);
  gsap.set(but, api.camDai("R", A, 162, 66));
  api.quaySet(w, -0.15);
  gsap.set([w.pupL, w.pupR], { x: 0, y: 2 });
  api.lidsSet(w, 0.3);

  // ---------------------------------------------------------------- camera: trung cảnh Wob + cá, đẩy chậm; nhấn ở "fish"
  api.camSet(R, null, { cx: 90, cy: 150, cz: 0, k: 640, rx: -12, ry: 4 });
  api.camTo(R, 0, 0.95, { k: 660, ry: 3 }, "sine.inOut");
  api.camTo(R, 0.95, 0.25, { cx: 60, cy: 165, k: 710, ry: 1 }, "power3.out");
  api.camTo(R, 1.2, 1.87, { k: 740, ry: 0 }, "sine.inOut");

  // ---------------------------------------------------------------- "This fish." gõ bút lên cá: cộc, cá không nhúc nhích
  var T = tu.fish;
  api.look(w, 0.8, -10, 10, 0.12);
  api.quay(w, 0.8, -0.35, 0.2);
  api.armTo(w, "R", T - 0.1, 0.1, A - 10, "power2.out");
  api.armTo(w, "R", T, 0.06, A + 6, "power3.in");
  tl.to(but, Object.assign(api.camDai("R", A + 6, 166, 66), { duration: 0.06, ease: "power3.in" }), T);
  api.sfx("bonk", T + 0.06, 0.8);
  tl.fromTo(ca, { rotationZ: 0 }, { rotationZ: -1.5, duration: 0.04, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, T + 0.06);
  api.armTo(w, "R", T + 0.1, 0.18, A, "power2.out");
  tl.to(but, Object.assign(api.camDai("R", A, 162, 66), { duration: 0.18, ease: "power2.out" }), T + 0.1);
  // giữ 0,6 s: nhìn lại người xem, tỉnh bơ
  api.quay(w, 1.7, 0, 0.25);
  api.look(w, 1.72, 0, 2, 0.15);
  api.lids(w, 1.75, 0.5, 0.15);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { amp: 0.8 });
  api.breathe(w, 0, 3.0);
};
