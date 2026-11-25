/* Đoạn d03 (diorama, hiện tại, 8,16 s): về bàn kỷ vật; Wob khoanh tay kể, gật đúng "dig". "golf": liếc quả bóng golf phát sáng,
 * giữ 1 s; quả bóng tự lăn né đi một chút. Cuối: lật trang sổ, sa mạc giấy bật dựng, camera lao vào trang → giấy phẳng.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var BO = { hop: { x: -600, z: -440, w: 300, d: 220, h: 150, do: ["anh"] }, so: { x: 40, z: -300, w: 520, d: 600 }, golf: { x: 30, z: 210 }, lo: { x: -90, z: 190 }, wob: { x: -250, z: 40 } };
  var L = api.lopPopup, s = 0.9;
  var ban = api.dungBan({
    hop: BO.hop, wob: { x: BO.wob.x, z: BO.wob.z, s: s },
    so: { x: BO.so.x, z: BO.so.z, w: BO.so.w, d: BO.so.d, lop: [L.tuy(api.saMacSVG(480, 300), 480, 300, { x: 260, banLe: 120 })] }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  var golf = api.cut(the, 160, 160, '<g transform="translate(80 80)"><g class="bong">' + api.bongGolfSVG() + "</g></g>", { pos: { x: BO.golf.x, y: TY, z: BO.golf.z }, ay: 104, f: api.F.AM_NHO });
  var sang = golf.svg.querySelector(".golf-sang");
  api.moiKhung(function (t) { gsap.set(sang, { opacity: 0.75 + 0.25 * Math.sin(t * 2.4) }); });
  api.cut(the, 130, 170, '<g transform="translate(65 90)">' + api.loOpalSVG() + "</g>", { pos: { x: BO.lo.x, y: TY, z: BO.lo.z, scale: s }, ay: 170, f: api.F.AM_NHO });

  // khung đầu (sau nối giấy): khoanh tay, nhìn thẳng
  api.armSet(w, "L", -62); api.armSet(w, "R", 62);
  api.quaySet(w, 0.1);
  var mat = api.wobTheGioi(w, 200, 200);
  api.camSet(R, null, { cx: mat.x + 120, cy: mat.y + 30, cz: w.z - 30, k: 360, rx: -12, ry: 4 });
  api.camTo(R, 0, 3.9, { k: 420, ry: 2 }, "sine.inOut");
  api.camTo(R, 3.9, 0.8, { cx: mat.x + 180, cy: mat.y + 70, k: 380, rx: -16 }, "power2.inOut");   // thấy cả Wob và bóng golf
  api.camTo(R, 4.7, 2.3, { k: 405 }, "sine.inOut");
  var c = so.diemLop(0, 240, 170);
  api.camTo(R, 7.0, 0.5, { cx: c.x, cy: c.y, cz: c.z, k: 420, rx: -10, ry: 0 }, "power2.inOut");
  api.laoVao(R, 7.5, 0.6, c, 1100, "power3.in");
  api.raGiay(null, 0.45);

  // "dig": gật đầu
  var DIG = tu.dig;
  tl.to(w.talk, { rotation: 6, y: 10, svgOrigin: "200 290", duration: 0.14, yoyo: true, repeat: 1, ease: "sine.inOut" }, DIG - 0.05);
  api.lids(w, 1.6, 0.3, 0.2);
  api.lids(w, 3.3, 0.5, 0.2);   // tỉnh bơ ở "dignity"
  // "golf": liếc bóng golf, giữ 1 s; bóng lăn né đi
  var GOLF = tu.golf;
  api.look(w, GOLF - 0.08, 14, 14, 0.12);
  api.quay(w, GOLF - 0.08, 0.3, 0.2);
  tl.to(golf, { x: BO.golf.x + 70, z: BO.golf.z + 20, duration: 0.7, ease: "power2.out" }, GOLF + 0.35);
  tl.to(golf.svg.querySelector(".bong"), { rotation: 160, transformOrigin: "50% 50%", duration: 0.7, ease: "power2.out" }, GOLF + 0.35);
  api.sfx("drop", GOLF + 0.4, 0.15);
  api.look(w, GOLF + 0.5, 18, 14, 0.4);
  // lật trang sổ: sa mạc bật dựng
  api.quay(w, 6.8, 0.6, 0.2);
  api.look(w, 6.8, 14, -4, 0.15);
  api.armTo(w, "R", 6.8, 0.3, -110, "power2.out");
  so.moBia(6.95, 0.5);
  api.sfx("whoosh", 7.0, 0.35);
  so.batLop(0, 7.25, 0.4);
  api.sfx("pop", 7.4, 0.35);

  api.khauHinh(w);
  api.gatDau(w, { amp: 0.6, bo: [[GOLF - 0.1, GOLF + 1.0]] });
  api.breathe(w, 0, 8.1);
  api.blink(w, 1.0, 0); api.blink(w, 4.0, 0.5);
};
