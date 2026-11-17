/* Đoạn d06 (diorama, hiện tại, 6,6 s): cắt cứng về bàn kỷ vật trên "Anyway." – Wob quấn chăn ôm cốc nóng, nhìn thẳng
 * tỉnh bơ; camera lia sang con cá đã rã đông mềm oặt trên mép hộp, nhỏ giọt xuống vũng nước; "I took a week." quay lại
 * Wob run trong chăn, nhấp cốc; giữ hình tới khung cuối (không mờ đen).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  // anyway 0.0 · back 1.41 · thawed 2.58 · hour 3.28 · i 4.03 · week 4.31

  var ban = api.dungBan({
    hop: { x: -260, z: -380 },
    wob: { x: 170, z: 40, s: 0.9, trangPhuc: { chan: true } },
    coc: { caoHoi: 120, troiHoi: 34 },
    caMem: { dx: 70, goc: 32 },
    so: { x: 360, z: -330, w: 460, d: 580, lop: [] } // sổ đóng nằm trên bàn
  });
  var w = ban.wob, R = ban.rig, cm = ban.caMem, TY = ban.TY;

  // ---------------------------------------------------------------- khung đầu: Wob nhìn thẳng, tỉnh bơ ("Anyway.")
  api.lidsSet(w, 0.45);
  gsap.set([w.pupL, w.pupR], { x: 0, y: 3 });
  var face = api.wobTheGioi(w, 200, 190);
  api.camSet(R, null, { cx: face.x - 40, cy: face.y + 40, cz: face.z, k: 560, rx: -8, ry: -5 });
  api.camTo(R, 0, 1.15, { k: 590, ry: -3 }, "sine.inOut");

  // ---------------------------------------------------------------- 1.2–3.7 lia sang con cá mềm oặt, nhỏ giọt
  var ca = { x: cm.giotX - 40, y: TY - 120, z: ban.hop.truoc + 20 };
  api.camTo(R, 1.15, 0.9, { cx: ca.x, cy: ca.y, cz: ca.z, k: 600, rx: -10, ry: 4 }, "power2.inOut");
  api.camTo(R, 2.05, 1.7, { k: 640, ry: 6 }, "sine.inOut");
  api.quay(w, 1.2, -0.45, 0.3);
  api.look(w, 1.2, -10, 6, 0.2);
  // "thawed": đầu cá rủ thêm, nảy oặt
  tl.to(cm.dau, Object.assign(api.TF(0, 0, 72), { duration: 0.55, ease: "bounce.out" }), tu.thawed - 0.05);
  api.sfx("nuot", tu.thawed, 0.3);
  api.roiGiot(cm.giot, 1.75, cm.giotTu, cm.giotToi, 0.3);
  api.sfx("drop", 2.06, 0.35);
  tl.fromTo(cm.vung, { scale: 1 }, { scale: 1.12, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 2.06);
  api.roiGiot(cm.giot, 3.0, cm.giotTu, cm.giotToi, 0.3);
  api.sfx("drop", 3.31, 0.28);
  tl.to(cm.vung, { scale: 1.22, duration: 0.3, ease: "back.out(2)" }, 3.31);

  // ---------------------------------------------------------------- 3.7–6.6 "I took a week.": về Wob run trong chăn, nhấp cốc, giữ hình
  api.camTo(R, 3.72, 0.6, { cx: face.x - 20, cy: face.y + 40, cz: face.z, k: 560, rx: -7, ry: -2 }, "power2.inOut");
  api.camTo(R, 4.32, 2.28, { k: 610, ry: 1 }, "sine.inOut");
  api.quay(w, 3.8, 0, 0.3);
  api.look(w, 3.85, 0, 3, 0.2);
  api.shiver(w, 0, 3.95, 1.4);
  api.shiver(w, 3.98, 4.9, 3.4);
  api.sfx("brr", tu.i, 0.42);
  // nhấp cốc nóng (hơi bốc liền), hạ cốc, răng đánh lập cập
  ban.omCoc(5.05, { R: 70, x: 238, y: 292, goc: -18 }, 0.38);
  api.lids(w, 5.15, 0.8, 0.2);
  ban.omCoc(5.85, {}, 0.35);
  api.lids(w, 5.95, 0.45, 0.2);
  api.mouth(w, 6.15, "K");
  api.shiver(w, 6.1, 6.58, 2.4);
  tl.fromTo(w.m, { y: 0 }, { y: 2, duration: 0.05, yoyo: true, repeat: 7, immediateRender: false }, 6.15);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w, { bo: [[6.15, 6.6]] });
  api.gatDau(w, { amp: 0.7 });
  api.breathe(w, 0, 6.6);
  api.blink(w, 2.9);
};
