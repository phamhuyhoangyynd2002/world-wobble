/* Đoạn d02 (diorama, hiện tại, 4,99 s): Wob lật trang sổ, trang pop-up phòng khách giấy bật dựng: hình Wob giấy (đúng tạo hình
 * Wob, tỉ lệ nhỏ) ưỡn ngực cạnh ba lô xanh ô liu mở toang. Nhét mũ rộng vành ("hat"), ba chai nước ("water", ba lô phồng to hơn
 * cả Wob), rồi một lá cờ nhỏ ("confidence"): nắp ba lô bật tung. Vào/ra `giay`.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var BO = { hop: { x: -600, z: -440, w: 300, d: 220, h: 150, do: ["anh"] }, so: { x: 40, z: -300, w: 520, d: 600 }, golf: { x: 30, z: 210 }, wob: { x: -250, z: 40 } };
  var L = api.lopPopup, s = 0.9;
  // phòng khách giấy (tường + cửa sổ + thảm)
  var phong = api.fp("M 6 6 L 474 6 L 474 300 L 6 300 Z", "#e9d3a8", 6) + api.sk("M 6 230 L 474 230", 4, C.INK, ' opacity=".5"') +
    api.fp("M 300 40 L 420 40 L 420 140 L 300 140 Z", "#cfe7ef", 5) + api.sk("M 360 40 L 360 140 M 300 90 L 420 90", 4) +
    api.fp("M 40 120 L 120 120 L 120 230 L 40 230 Z", "#9c5b3b", 5) + api.fp("M 50 60 L 110 60 L 110 112 L 50 112 Z", C.PAPER, 4);
  var lopBL = '<g class="balo" transform="translate(250 110)">' + api.baLoMoSVG() + "</g>" +
    '<g class="mu"><g transform="scale(.55)">' + api.muRongVanhSVG() + "</g></g>" +
    [0, 1, 2].map(function (i) { return '<g class="chai chai' + i + '"><g transform="translate(-22 -42) scale(.5)">' + api.chaiNuocSVG(true) + "</g></g>"; }).join("") +
    '<g class="co"><g transform="scale(.6)">' + api.coNhoSVG() + "</g></g>";
  var ban = api.dungBan({
    hop: BO.hop, wob: { x: BO.wob.x, z: BO.wob.z, s: s },
    so: { x: BO.so.x, z: BO.so.z, w: BO.so.w, d: BO.so.d, lop: [L.tuy(phong, 480, 300, { x: 260, banLe: 40 }), L.tuy(lopBL, 520, 400, { x: 260, banLe: 200 })] }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  var golf = api.cut(the, 160, 160, '<g transform="translate(80 80)">' + api.bongGolfSVG() + "</g>", { pos: { x: BO.golf.x, y: TY, z: BO.golf.z }, ay: 104, f: api.F.AM_NHO });
  var sv = so.lop[1].svg, q = function (c) { return sv.querySelector(c); };
  var mini = api.makeWob(so.lop[1], { x: -140, y: 0, z: 8, s: 0.3, f: api.F.AM_NHO });
  gsap.set(mini.shadow, { opacity: 0 });
  var than = q(".bl-than"), nap = q(".bl-nap");
  gsap.set(than, { svgOrigin: "120 280" });
  gsap.set(nap, { svgOrigin: "120 92" });
  var TAY = [178, 330], MIENG = [370, 215];
  var vat = [q(".mu"), q(".chai0"), q(".chai1"), q(".chai2"), q(".co")];
  vat.forEach(function (v) { gsap.set(v, { attr: { transform: "translate(" + TAY[0] + " " + TAY[1] + ")" }, opacity: 0 }); });
  // nhét một vật: hiện ở tay hình Wob, bay vào miệng ba lô, thu nhỏ; ba lô phồng
  var nhet = function (v, t, phong) {
    tl.set(v, { opacity: 1 }, t - 0.3);
    api.armTo(mini, "R", t - 0.3, 0.12, -120, "power2.out");
    tl.to(v, { attr: { transform: "translate(" + MIENG[0] + " " + (MIENG[1] - 40) + ")" }, duration: 0.16, ease: "power2.out" }, t - 0.18);
    tl.to(v, { attr: { transform: "translate(" + MIENG[0] + " " + MIENG[1] + ") scale(.2)" }, duration: 0.1, ease: "power2.in" }, t - 0.02);
    tl.set(v, { opacity: 0 }, t + 0.08);
    tl.to(than, { scale: phong, duration: 0.18, ease: "back.out(3)" }, t + 0.06);
    api.armTo(mini, "R", t + 0.05, 0.15, 0, "power2.inOut");
    api.sfx("pop", t + 0.06, 0.3);
  };

  // ---------------------------------------------------------------- camera: cận trang sổ, phòng khách đọc rõ
  var c = so.diemLop(1, 260, 230);
  api.camSet(R, null, { cx: c.x - 20, cy: c.y - 20, cz: c.z - 60, k: 470, rx: -14, ry: 0 });
  api.camTo(R, 0, 1.4, { k: 540, rx: -10 }, "power2.out");
  api.camTo(R, 1.4, 2.3, { k: 600, cx: c.x + 10 }, "sine.inOut");
  api.camTo(R, 3.7, 0.4, { k: 650, cy: c.y - 40 }, "power2.out");
  api.camRung(R, 3.95, 0.2, 3);
  api.laoVao(R, 4.42, 0.55, so.diemLop(1, 380, 200), 1100, "power3.in");
  api.raGiay(null, 0.45);

  // ---------------------------------------------------------------- 0–0.9 lật trang: bìa mở, phòng + ba lô bật dựng; hình Wob ưỡn ngực
  so.moBia(0.0, 0.45);
  api.sfx("whoosh", 0.05, 0.3);
  so.batLop(0, 0.3, 0.45);
  so.batLop(1, 0.42, 0.45);
  api.sfx("pop", 0.6, 0.4);
  api.quaySet(mini, 0.3);
  tl.fromTo(mini.upper, { y: 0, scaleY: 1 }, { y: -8, scaleY: 1.05, duration: 0.25, ease: "back.out(2)", immediateRender: false }, 0.85);
  api.lids(mini, 0.9, 0.3, 0.1);
  api.look(mini, 0.9, 6, -6, 0.12);
  // ---------------------------------------------------------------- 1.4–3.9 mũ, ba chai nước (ba lô phồng hơn cả Wob), cờ nhỏ
  nhet(vat[0], tu.hat, 1.1);
  nhet(vat[1], tu.water - 0.25, 1.25);
  nhet(vat[2], tu.water + 0.1, 1.4);
  nhet(vat[3], tu.water + 0.45, 1.55);
  api.look(mini, 2.2, 12, -10, 0.12);
  nhet(vat[4], tu.confidence - 0.05, 1.62);
  // nắp ba lô bật tung
  var BT = tu.confidence + 0.05;
  tl.to(nap, { rotation: -70, y: -120, x: 60, duration: 0.3, ease: "power2.out" }, BT);
  tl.to(nap, { rotation: -200, y: -300, x: 260, duration: 0.4, ease: "power1.out" }, BT + 0.3);
  api.sfx("boing", BT, 0.45);
  tl.fromTo(than, { scaleX: 1.62 }, { scaleX: 1.72, duration: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, BT);
  tl.fromTo(mini.lift, { y: 0 }, { y: -16, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, BT);
  api.look(mini, BT, 14, -14, 0.1, 1.2);
  api.lids(mini, BT, 0, 0.08);

  // ---------------------------------------------------------------- Wob ở bàn (ngoài khung phần lớn): kể, khẩu hình
  api.quaySet(w, 0.5);
  api.khauHinh(w);
  api.breathe(w, 0, 4.99);
  api.breathe(mini, 0, 4.99);
};
