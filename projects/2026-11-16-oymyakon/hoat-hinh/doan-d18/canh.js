/* Đoạn d18 (diorama, hiện tại, 5,4 s) – mở chương Gulag, NGHIÊM TÚC, không gag, không sfx.
 * Cắt cứng về bàn: Wob cầm cá trong găng; "I'm going to put the fish down for this part." đặt cá xuống bàn chậm,
 * tháo găng đặt cạnh cá; mí 0,3, không cười. Đèn bàn dịu dần, camera đẩy rất chậm; Wob lật sổ sang trang ký hoạ con đường
 * (không chữ, không phải bản đồ thật); camera hạ chậm xuống trang; 0,6 s cuối phủ giấy phẳng (chậm, không whoosh).
 * Từ đây cá và găng nằm trên bàn ở CA_BAN, GANG_BAN (tới d40).
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
    HOME: { x: 150, z: 0 },
    CA_BAN: { x: -20, z: 10 }, GANG_BAN: { x: -235, z: 40 }
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
  api.cut(ban.trongHop, 90, 170, api.chaiNuocSVG(false), { pos: { x: -95, y: -12, z: 20 }, f: api.F.AM_NHO });
  api.deoGang(w, "L", true);
  // trang ký hoạ con đường qua núi (không chữ, không địa lý thật) dưới tờ trang trắng
  so.veTrang(
    api.sk("M 30 250 L 90 160 L 140 230 L 200 120 L 270 220 L 330 150 L 430 250", 4, "#5b6468", ' opacity=".75"') +
    api.sk("M 150 170 l 14 18 M 200 120 l 0 0 M 316 168 l 14 16", 3, "#5b6468", ' opacity=".5"') +
    api.sk("M 40 540 C 120 470 90 400 180 370 S 330 330 300 280 S 380 240 420 230", 9, "#5b6468", ' opacity=".55"') +
    api.sk("M 40 540 C 120 470 90 400 180 370 S 330 330 300 280 S 380 240 420 230", 3, C.PAPER, ' stroke-dasharray="10 12"') +
    api.sk("M 70 360 l 0 -40 M 70 340 l -12 -10 M 70 346 l 12 -12 M 380 380 l 0 -36 M 380 356 l -10 -10 M 380 362 l 10 -10", 3, "#5b6468", ' opacity=".7"'));
  var to = so.themTo(api.sk("M 60 470 C 120 420 200 450 260 400 S 360 330 400 300", 3, C.INK, ' stroke-dasharray="2 10"'), { ben: "phai", sau: "" });

  // ---------------------------------------------------------------- tư thế đầu: cá đứng trong găng, mặt nghiêm
  api.armSet(w, "L", 150);
  gsap.set(ban.ca, api.camDai("L", 150, -90, 96));
  api.lidsSet(w, 0.3);
  gsap.set([w.pupL, w.pupR], { x: 0, y: 3 });

  // ---------------------------------------------------------------- camera: trung cảnh, đẩy rất chậm; lia sang sổ; hạ xuống trang
  api.camSet(R, null, { cx: 90, cy: 120, cz: 0, k: 360, rx: -10, ry: 5 });
  api.camTo(R, 0, 2.3, { cx: 110, k: 400, ry: 4 }, "sine.inOut");
  api.camTo(R, 2.3, 1.6, { cx: 330, cy: 90, cz: -120, k: 330, rx: -20, ry: -1 }, "sine.inOut");
  var trang = so.diemTrang(230, 30);
  api.camTo(R, 3.9, 1.5, { cx: trang.x, cy: trang.y, cz: trang.z, k: 760, rx: -72, ry: 0 }, "sine.inOut");
  api.raGiay(api.DUR - 0.6 - 2 / api.fps, 0.6);
  ban.diuDen(2.2, 2.6, 0.72);

  // ---------------------------------------------------------------- 0.25–1.0: đặt cá xuống bàn chậm 0,6 s
  var CA = BO_CUC.CA_BAN, GA = BO_CUC.GANG_BAN, s = 0.9;
  var caX = (CA.x - BO_CUC.HOME.x) / s + 200, caY = 392 - 49 / s;
  api.armTo(w, "L", 0.3, 0.65, 12, "sine.inOut");
  tl.to(ban.ca, Object.assign(api.holdPose("L", 12, caX, caY, 0, -1), { duration: 0.65, ease: "sine.inOut" }), 0.3);
  api.look(w, 0.3, -10, 10, 0.3);
  var caBan = api.cut(the, 320, 124, api.caNamSVG(-1), { pos: { x: CA.x, y: TY, z: CA.z, scale: s }, f: api.F.AM });
  gsap.set(caBan, { opacity: 0 });
  tl.set(caBan, { opacity: 1 }, 0.96); tl.set(ban.ca, { opacity: 0 }, 0.96);

  // ---------------------------------------------------------------- 1.0–1.7: tháo găng, đặt cạnh cá
  api.armTo(w, "L", 1.0, 0.3, -25, "power2.inOut");
  api.armTo(w, "R", 1.0, 0.3, 55, "power2.inOut");
  var gangBan = api.cut(the, 120, 90, '<g transform="translate(60 46) rotate(-78)">' + api.gangLoSVG() + "</g>", { pos: { x: GA.x, y: TY, z: GA.z, scale: s }, f: api.F.AM_NHO });
  var tayL = api.wobTheGioi({ x: BO_CUC.HOME.x, y: TY, z: BO_CUC.HOME.z, s: s }, 122, 300);
  gsap.set(gangBan, { opacity: 0 });
  api.deoGang(w, "L", false, 1.32);
  tl.set(gangBan, { opacity: 1 }, 1.32);
  tl.fromTo(gangBan, { x: tayL.x, y: tayL.y + 30, z: 0, rotationZ: 30 }, { x: GA.x, z: GA.z, rotationZ: 0, duration: 0.45, ease: "sine.inOut", immediateRender: false }, 1.32);
  tl.fromTo(gangBan, { y: tayL.y + 30 }, { y: TY, duration: 0.45, ease: "power2.in", immediateRender: false }, 1.32);
  api.armTo(w, "L", 1.45, 0.4, 8, "sine.inOut");
  api.armTo(w, "R", 1.45, 0.4, 0, "sine.inOut");
  api.look(w, 1.4, -14, 8, 0.3);
  api.look(w, 2.2, 0, 3, 0.3);

  // ---------------------------------------------------------------- 2.4–3.7: lật sổ sang trang ký hoạ con đường
  api.quay(w, 2.6, 0.5, 0.4, "sine.inOut");
  api.look(w, 2.6, 12, 6, 0.3);
  api.armTo(w, "R", 2.75, 0.35, -125, "sine.inOut");
  to.lat(2.95, 0.8, "trai", "sine.inOut");
  api.armTo(w, "R", 3.45, 0.45, -20, "sine.inOut");
  api.lids(w, 3.0, 0.4, 0.3);

  // ---------------------------------------------------------------- liên tục (mấp máy theo lời, không gật đầu mạnh)
  // đoạn nghiêm: miệng nghỉ là nét thẳng N (không phải nét cười X)
  data.loi.forEach(function (L) { (L.khau_hinh || []).forEach(function (c) { if (c.value === "X") c.value = "N"; }); });
  api.khauHinh(w, { sau: "N" });
  api.gatDau(w, { amp: 0.4 });
  api.breathe(w, 0, 5.4);
  api.nhayCham(w, 2.3, 0.3);
};
