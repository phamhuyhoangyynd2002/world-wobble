/* Đoạn d20 (diorama, hiện tại, 8,98 s) – đóng chương Gulag, NGHIÊM TÚC, không gag, không sfx hài.
 * Từ giấy phẳng hiện về bàn (đèn dịu như cuối d18; cá, găng nằm trên bàn). Wob đứng giữa hộp kỷ vật và sổ, tay phải đặt
 * trên mép trang sổ; "The village's story begins with the springs." tay trái chạm nhẹ chai nước nhỏ trong hộp;
 * "But the highway… no choice." gấp sổ lại thật chậm, đặt tay lên bìa, camera lùi rất chậm; ~1 s lặng: nhắm mắt chậm rồi mở,
 * đèn sáng lại; mở sổ, lật sang hình vẽ phố làng buổi sáng (không chữ), camera lao vào hình vẽ → giấy phẳng.
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
  var VT = { x: -110, z: -240 }; // giữa hộp và sổ: tay trái với tới chai, tay phải tới mép bìa
  var ban = api.dungBan({
    hop: BO_CUC.hop, baLo: BO_CUC.baLo, ongBut: BO_CUC.ongBut, ongButNho: BO_CUC.ongButNho,
    wob: { x: VT.x, z: VT.z, s: 0.9 },
    so: { x: BO_CUC.so.x, z: BO_CUC.so.z, w: BO_CUC.so.w, d: BO_CUC.so.d, lop: [], moSan: true }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the, s = 0.9;
  api.matKhongRong(w); // mắt không bao giờ lộ hai vòng rỗng khi nháy, nhắm (dio-dao-cu.js)
  api.cut(ban.trongHop, 170, 120, api.toRoiSVG(), { pos: { x: 70, y: -8, z: -30, rotationZ: 8, scale: 0.75 }, f: api.F.AM_NHO });
  api.cut(ban.trongHop, 90, 170, api.chaiNuocSVG(false), { pos: { x: -95, y: -12, z: 20 }, f: api.F.AM_NHO });
  api.cut(the, 320, 124, api.caNamSVG(-1), { pos: { x: BO_CUC.CA_BAN.x, y: TY, z: BO_CUC.CA_BAN.z, scale: s }, f: api.F.AM });
  api.cut(the, 120, 90, '<g transform="translate(60 46) rotate(-78)">' + api.gangLoSVG() + "</g>", { pos: { x: BO_CUC.GANG_BAN.x, y: TY, z: BO_CUC.GANG_BAN.z, scale: s }, f: api.F.AM_NHO });
  // trang phải: hình vẽ phố làng buổi sáng (dưới tờ trang trắng)
  so.veTrang(
    '<rect x="16" y="16" width="428" height="548" fill="#f6e7c4" opacity=".7"/>' +
    '<circle cx="330" cy="150" r="46" fill="#f3c46a" stroke="' + C.INK + '" stroke-width="4"/>' + api.sk("M 330 84 l 0 -24 M 380 104 l 18 -16 M 280 104 l -18 -16 M 400 150 l 24 0 M 260 150 l -24 0", 4, "#e0a84a") +
    api.fp("M 16 260 Q 120 200 220 240 T 444 230 L 444 300 L 16 300 Z", "#dfe9ee", 3) +
    api.fp("M 40 420 L 40 330 L 100 290 L 160 330 L 160 420 Z", C.WOOD, 4) + api.fp("M 30 334 L 100 284 L 170 334 Z", C.SNOW, 4) + api.fp("M 82 360 h 36 v 30 h -36 Z", C.WIN, 3) +
    api.fp("M 290 420 L 290 340 L 350 300 L 410 340 L 410 420 Z", "#8a5a3b", 4) + api.fp("M 280 344 L 350 294 L 420 344 Z", C.SNOW, 4) + api.fp("M 332 368 h 36 v 30 h -36 Z", C.WIN, 3) +
    api.sk("M 140 300 c -10 -20 10 -30 0 -50 c -10 -20 10 -30 0 -50", 7, "#b9c9d0") + api.sk("M 392 312 c -10 -20 10 -30 0 -50", 7, "#b9c9d0") +
    api.fp("M 16 564 L 190 420 L 270 420 L 444 564 Z", "#eef3f5", 3) + api.sk("M 230 430 L 230 560", 3, "#b9c9d0", ' stroke-dasharray="14 12"'));
  var to = so.themTo("", { ben: "phai", sau: "" });

  // ---------------------------------------------------------------- tư thế đầu: đứng thẳng, tay phải đặt lên mép trang, mặt nghiêm
  api.armSet(w, "R", -42);
  api.armSet(w, "L", 6);
  api.lidsSet(w, 0.3);
  gsap.set([w.pupL, w.pupR], { x: 0, y: 3 });
  ban.diuDen(null, 0, 0.72);

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: -60, cy: 110, cz: -270, k: 380, rx: -12, ry: 5 });
  api.camTo(R, 0, 2.8, { cx: -90, k: 420, ry: 6 }, "sine.inOut");
  api.camTo(R, 2.8, 4.9, { cx: 40, cy: 90, cz: -260, k: 300, rx: -14, ry: 2 }, "sine.inOut");
  var dich = so.diemTrang(230, 40);
  api.camTo(R, 7.9, 1.05, { cx: dich.x, cy: dich.y, cz: dich.z, k: 1110, rx: -80, ry: 0 }, "power3.in");
  api.sfx("whoosh", 8.25, 0.35);

  // ---------------------------------------------------------------- 0.3–2.8: "begins with the springs": tay trái chạm nhẹ chai nước
  api.look(w, 0.4, -12, -6, 0.3);
  api.quay(w, 0.45, -0.35, 0.4, "sine.inOut");
  api.armTo(w, "L", 0.5, 0.65, 118, "sine.inOut");
  tl.fromTo(w.lift, { y: 0 }, { y: -3, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 1.15);
  api.armTo(w, "L", 2.3, 0.6, 6, "sine.inOut");
  api.quay(w, 2.4, 0.3, 0.4, "sine.inOut");
  api.look(w, 2.4, 10, 6, 0.3);

  // ---------------------------------------------------------------- 2.9–4.8: "But the highway…": gấp sổ thật chậm, đặt tay lên bìa
  api.armTo(w, "R", 2.95, 0.6, -150, "sine.inOut");
  so.dongBia(3.05, 1.7, "sine.inOut");
  api.armTo(w, "R", 4.1, 0.75, -60, "sine.inOut");
  api.look(w, 4.6, 0, 3, 0.4);
  api.quay(w, 4.6, 0, 0.5, "sine.inOut");
  api.lids(w, 5.0, 0.35, 0.3);

  // ---------------------------------------------------------------- 7.28–8.2: khoảng lặng: nhắm mắt chậm rồi mở; đèn sáng lại
  api.nhamMat(w, 6.95, 0.45, { kieu: "thang" }); // mí khép có nét, không phải mắt rỗng
  api.moMat(w, 7.6, 0.35, 0.2);
  ban.diuDen(6.9, 1.1, 0);

  // ---------------------------------------------------------------- 7.8–8.98: mở sổ, lật sang hình vẽ phố làng buổi sáng, lao vào
  api.armTo(w, "R", 7.75, 0.3, -150, "power2.out");
  so.moBia(7.8, 0.42);
  to.lat(8.05, 0.38, "trai");
  api.quay(w, 7.8, 0.5, 0.3);
  api.look(w, 7.8, 12, 8, 0.2);

  // ---------------------------------------------------------------- liên tục (miệng nghỉ nét thẳng)
  data.loi.forEach(function (L) { (L.khau_hinh || []).forEach(function (c) { if (c.value === "X") c.value = "N"; }); });
  api.khauHinh(w, { sau: "N" });
  api.gatDau(w, { amp: 0.4 });
  api.breathe(w, 0, 8.9);
  api.nhayCham(w, 2.0, 0.3);
  api.nhayCham(w, 5.9, 0.35);
};
