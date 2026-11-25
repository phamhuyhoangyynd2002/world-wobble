/* Đoạn d30 (diorama, đuôi tập, 18 s): bàn kỷ vật như d11. Dữ liệu nạp vào api.duoiTap (templates/hoat-hinh/_chung/mo-ket/duoi-tap.js).
 * Nhịp 1: Wob đặt tờ lịch hầm (còn băng dính) lên kệ cạnh lọ opal, lọ rung lách cách. Nhịp 2: liếc tủ đông, nắp hé, đuôi cá vẫy.
 * Nhịp 3: bản đồ giấy gợi ý mở ra, ghim đỏ WHITTIER cắm; ghim trống không nhãn rung ở vùng biển ấm, mặt trời giấy nhô.
 * End screen (hai khung giấy trống + vòng) bật lên từ 1,2 s, đứng yên tới hết. Nhịp 4: Wob cầm ba lô ô liu xẹp; Wob chỉ sang, chớp mắt, thở tới hết. Không mờ đen.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, fp = api.fp, sk = api.sk, DUR = api.DUR;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });

  var ban = api.dungBan({ wob: { x: -320, z: -100, s: 0.9 }, hop: { x: -60, z: -520 }, ongBut: false });
  // Sửa sau kiểm định (24/11): cả cảnh dồn vào nửa trái (x < 1150) bằng dịch tâm phối cảnh (lens shift): tâm camera
  // nằm ở x 560 trên khung thay vì 960. Wob đứng trước mép phải kệ; vùng end screen bên phải trống suốt đoạn.
  var w = ban.wob, R = ban.rig, TY = ban.TY;
  R.stage.style.left = "-880px"; R.stage.style.right = "-80px"; R.cam.style.left = "1440px"; // tâm sân khấu rộng 2880 = x 560 khung
  api.matKhongRong(w); api.baLoOliu(w);
  var dt = api.duoiTap(ban, {
    ke: { x: -620, z: -300 },
    kyVat: [{ the: "OYMYAKON", ve: "tuDong", tang: 1, cho: 0.7 }, { the: "COOBER PEDY", ve: "loOpal", tang: 0, cho: -0.15 }, { the: "WHITTIER", ve: "toLich", tang: 0, cho: 1.4, moi: true }],
    banDo: { x: -700, z: 60, w: 520, h: 320 },
    ghimMoi: { u: 0.24, v: 0.32, the: "WHITTIER" }, ghimTrong: { u: 0.7, v: 0.74 }
  });
  var I_TU = 0, I_LO = 1, I_LICH = 2;

  // nhịp 1: tờ lịch trong tay → lên kệ
  var tSh = tu.shelf || 1.71;
  api.quaySet(w, -0.5);
  api.armSet(w, "L", 120);
  var tay = api.wobTheGioi(w, 20, 120);
  dt.datLen(I_LICH, tSh - 0.6, { x: tay.x, y: tay.y, z: w.z });
  api.armTo(w, "L", tSh - 0.6, 0.5, 150, "power2.out");
  api.armTo(w, "L", tSh + 0.1, 0.35, 0, "power2.inOut");
  api.look(w, 0.1, -14, -8, 0.2);
  api.sfx("drop", tSh, 0.35);
  var tJar = tu.jar || 3.19;
  dt.rung(I_LO, tJar - 0.1, 0.6);
  api.sfx("bonk", tJar - 0.05, 0.15);
  api.look(w, tJar - 0.2, -14, 6, 0.2);
  api.quay(w, 4.3, 0, 0.3); api.look(w, 4.4, 0, 0, 0.2);
  // nhịp 2: tủ đông, đuôi cá vẫy
  var tFish = tu.fish || 5.41;
  api.quay(w, tFish - 0.3, -0.6, 0.25); api.look(w, tFish - 0.25, -14, 10, 0.15);
  dt.nhuc(I_TU, tFish + 0.1);
  api.lids(w, tFish + 1.2, 0.45, 0.2); api.lids(w, 7.2, 0, 0.15);
  // nhịp 3: bản đồ, ghim
  var tMap = tu.map || 7.5, tPins = tu.pins || 8.18;
  dt.moBanDo(tMap - 0.4);
  api.sfx("whoosh", tMap - 0.4, 0.3);
  dt.camGhim(tPins);
  api.sfx("pop", tPins, 0.5);
  api.quay(w, tMap - 0.3, -0.4, 0.25); api.look(w, tMap - 0.2, -12, 14, 0.2);
  var tWarm = tu.warm || 9.96;
  dt.ghimRung(tWarm - 0.5, 1.6);
  api.look(w, tWarm, -6, 14, 0.15, 1.1);
  // nhịp 4: ba lô xẹp, end screen, chỉ tay sang phải, thở tới hết
  var tPack = tu.packing || 13.26;
  gsap.set(w.pack, {}); tl.set([w.pack, w.strap], { opacity: 0 }, tPack - 0.5);
  w.holdL.insertAdjacentHTML("beforeend", '<g class="balo-xep" opacity="0"><g transform="translate(-60 -30)">' +
    fp("M 10 20 C 10 6 110 6 110 20 L 116 96 C 116 108 4 108 4 96 Z", "#7C8646", 5) + fp("M 30 50 L 90 50 L 88 84 L 32 84 Z", "#566030", 4) + sk("M 20 40 C 50 52 80 34 104 44", 3, "#3e4622") + "</g></g>");
  var balo = w.holdL.querySelector(".balo-xep");
  tl.set(balo, Object.assign({ opacity: 1 }, api.holdPose("L", 40, 40, 300, 0)), tPack - 0.5);
  api.armSet(w, "L", 40, tPack - 0.5);
  api.armTo(w, "L", tPack - 0.5, 0.3, 70, "back.out(2)");
  api.quay(w, tPack - 0.5, 0, 0.25); api.look(w, tPack - 0.4, 0, 0, 0.15);
  tl.to(balo, { attr: { transform: api.holdPose("L", 70, 20, 250, -10).attr.transform }, duration: 0.3 }, tPack - 0.5);
  var tES = (tu.light || 13.66) + 0.35;
  dt.endScreen(1.2); // hai khung + vòng đứng yên đủ từ 1,96 s tới hết (≥ 16 s cho end screen)
  api.quay(w, tES - 0.2, 0.6, 0.25); api.look(w, tES - 0.15, 14, -4, 0.15);
  api.armTo(w, "R", tES, 0.3, -100, "back.out(2)");
  api.nhayCham(w, tES + 1.2, 0);
  api.blink(w, tES + 2.6, 0);

  // camera: đẩy chậm vào kệ → bản đồ → lùi ra, Wob giữa trái, nửa phải chừa trống
  // (tâm khung ở x 560 do lens shift ở trên)
  api.camSet(R, null, { cx: -570, cy: 40, cz: -140, k: 260, rx: -12, ry: 5 });
  api.camTo(R, 0, 4.6, { cx: -590, k: 330 }, "sine.inOut");
  api.camTo(R, 4.6, 0.8, { cx: -600, cy: 60, k: 345, ry: 3 }, "power2.inOut");
  api.camTo(R, 5.4, 1.8, { k: 355 }, "sine.inOut");
  api.camTo(R, 7.2, 0.8, { cx: -610, cy: 140, cz: 60, k: 370, rx: -20, ry: 0 }, "power2.inOut");
  api.camTo(R, 8.0, 4.6, { k: 395 }, "sine.inOut");
  api.camTo(R, 12.6, 1.0, { cx: -520, cy: 80, cz: -60, k: 60, rx: -24, ry: 2 }, "power2.inOut");
  api.camTo(R, 13.6, DUR - 13.6, { k: 100 }, "sine.inOut");

  // khẩu hình: đuôi tập Wob vẫn đang kể (mo-ket); khauHinh chỉ chạy với hien-tai
  var lop = data.lop; data.lop = "hien-tai"; api.khauHinh(w); data.lop = lop;
  api.gatDau(w, { bo: [[13.0, DUR]] });
  api.breathe(w, 0.3, DUR);
  api.blinks(w, 0.8, 13.0, [[5.0, 7.3]], 0);
};
