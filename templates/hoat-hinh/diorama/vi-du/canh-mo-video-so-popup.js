/* Đoạn d01 (diorama, hiện tại, 12,6 s): mở video. Wob rút con cá cứng khỏi hộp kỷ vật, giơ lên, gõ bàn "cộp",
 * cá tự đứng; lật sổ du lịch, trang pop-up bật dựng (làng tuyết + biển tên); tuyết giấy rơi, Wob run;
 * camera đẩy vào biển (chữ ≥ 40px); "On purpose." Wob nhìn thẳng tỉnh bơ, giữ hình; camera lao vào làng → giấy phẳng.
 * Mốc lấy từ HH_DATA (nhịp + từ). Chỉ viết biên đạo; mọi hàm dựng ở lib/ (templates/hoat-hinh/diorama/lib).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  // mốc từ lời (giây từ đầu đoạn)
  var tu = {};
  data.loi[0].tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (tu[k] == null) tu[k] = w.start; });
  var nh = data.nhip.map(function (n) { return n.tai; }); // 0, .5, 1.3, 2.45, 4.9, 8.0, 10.1, 11.4
  var chu = data.chu_tren_do_vat; // ["OYMYAKON", "pop. ~500"]

  // ---------------------------------------------------------------- dựng
  var L = api.lopPopup;
  var ban = api.dungBan({
    hop: { x: -150, z: -380 },
    wob: { x: 150, z: -330, s: 0.9 },
    caCung: true, caDung: true,
    so: {
      x: 360, z: -330, w: 460, d: 580,
      lop: [
        L.doi(430, 170, { x: 230, banLe: -150 }),
        L.nha(400, 150, { x: 225, banLe: -30 }),
        L.bien([{ chu: chu[0], co: 56 }, { chu: chu[1], co: 52 }], { x: 238, banLe: 150, w: 440, h: 400 }),
        L.langNho(390, 80, { x: 230, banLe: 262, n: 6 })
      ]
    }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY;
  var IHILL = 0, IHOUSE = 1, ISIGN = 2, ITINY = 3;
  var fishAt = function (arm, ang, dist) { return api.camDai("L", arm, ang, dist == null ? 96 : dist); };

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 20, cy: 30, cz: -280, k: 40, rx: -15, ry: 12 });
  api.camTo(R, 0, 1.0, { cx: 80, cy: 20, cz: -180, k: 120, ry: 9 }, "sine.inOut");
  api.camTo(R, 1.0, 1.0, { cx: 110, cy: 30, cz: -60, k: 200, ry: 6, rx: -13 }, "power2.inOut");
  api.camTo(R, 2.15, 1.1, { cx: 400, cy: 30, cz: -170, k: 160, ry: -3, rx: -14 }, "power2.inOut");
  api.camTo(R, 3.25, 4.5, { cx: 430, cy: 10, cz: -170, k: 250, ry: -8, rx: -12 }, "sine.inOut");
  var sTop = so.diemLop(ISIGN, 220, 112);
  api.camTo(R, 7.85, 0.6, { cx: sTop.x, cy: sTop.y, cz: sTop.z, k: 470, rx: -3, ry: -2 }, "power3.out");
  api.camTo(R, 8.45, 1.15, { k: 510, ry: 1 }, "sine.inOut");
  var face = api.wobTheGioi({ x: 200, y: TY, z: 40, s: 0.9 }, 200, 175);
  api.camTo(R, 9.6, 0.36, { cx: face.x + 10, cy: face.y, cz: face.z, k: 620, rx: -4, ry: 0 }, "power3.inOut");
  api.camTo(R, 9.96, 1.44, { k: 650 }, "sine.inOut");
  var lang = so.diemLop(IHOUSE, 225, 300);
  api.laoVao(R, 11.4, 1.16, lang, 1110, "power3.in");
  api.sfx("whoosh", 11.45, 0.45);
  api.raGiay(null, 0.5); // 0,5 s cuối → toàn khung #EFE3C8

  // ---------------------------------------------------------------- 0.0–0.9 rút cá khỏi hộp, nhảy ra trước
  var A0 = 70;
  api.armSet(w, "L", A0);
  var h0 = api.handWorld("L", A0);
  gsap.set(ban.ca, api.holdPose("L", A0, h0[0], h0[1] + 30, -90));
  api.quaySet(w, -0.5);
  gsap.set([w.pupL, w.pupR], { x: -10, y: 6 });
  api.armTo(w, "L", 0.02, 0.38, 165, "power2.inOut");
  var h1 = api.handWorld("L", 165);
  tl.to(ban.ca, Object.assign(api.holdPose("L", 165, h1[0], h1[1] - 10, -90), { duration: 0.38, ease: "power2.inOut" }), 0.02);
  tl.to(w.lift, { y: -60, scaleY: 1.06, scaleX: 0.96, duration: 0.38, ease: "power2.out" }, 0.02);
  // nhảy ra trước bàn (z −330 → 40)
  tl.fromTo(w.pos, { x: 150, z: -330 }, { x: 200, z: 40, duration: 0.46, ease: "power1.inOut", immediateRender: false }, 0.4);
  tl.to(w.lift, { y: -120, duration: 0.2, ease: "power1.out" }, 0.4);
  tl.to(w.lift, { y: 0, scaleY: 1, scaleX: 1, duration: 0.26, ease: "power2.in" }, 0.6);
  tl.to(w.lift, { scaleY: 0.9, scaleX: 1.08, duration: 0.07, ease: "power2.out" }, 0.86);
  tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.28, ease: "back.out(3)" }, 0.93);
  w.x = 200; w.z = 40;
  api.sfx("boing", 0.86, 0.3);
  // "This is a fish." giơ cá trước mặt người xem
  api.quay(w, 0.45, 0, 0.3);
  api.armTo(w, "L", 0.45, 0.35, 150, "back.out(1.6)");
  tl.to(ban.ca, Object.assign(fishAt(150, -90), { duration: 0.35, ease: "back.out(1.6)" }), 0.45);
  api.look(w, 0.5, -6, -8, 0.15);
  api.look(w, 0.95, 0, 2, 0.15);

  // ---------------------------------------------------------------- 1.2–2.3 gõ bàn "cộp", cá tự đứng
  [[nh[2], 1.0], [nh[2] + 0.32, 0.85]].forEach(function (k) {
    var t = k[0] - 0.12;
    api.armTo(w, "L", t, 0.12, 40, "power3.in");
    tl.to(ban.ca, Object.assign(fishAt(40, 146), { duration: 0.12, ease: "power3.in" }), t);
    api.sfx("bonk", k[0], 0.8 * k[1]);
    tl.fromTo(w.lift, { y: 0 }, { y: 4, duration: 0.05, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, k[0]);
    api.camRung(R, k[0], 0.1, 2.5);
    api.armTo(w, "L", k[0] + 0.02, 0.16, 92, "power2.out");
    tl.to(ban.ca, Object.assign(fishAt(92, 160), { duration: 0.16, ease: "power2.out" }), k[0] + 0.02);
  });
  api.look(w, nh[2] - 0.15, -12, 8, 0.12);
  var PLACE = 2.08, LP = 8;
  api.armTo(w, "L", 1.78, 0.3, LP, "power2.inOut");
  tl.to(ban.ca, Object.assign(fishAt(LP, -90), { duration: 0.3, ease: "power2.inOut" }), 1.78);
  (function () {
    var hd = api.handWorld("L", LP);
    var p = api.wobTheGioi(w, hd[0], hd[1] - 96);
    var bottom = p.y + 152 * w.s;
    gsap.set(ban.caDung, { x: p.x, y: bottom, z: w.z + 6, scale: w.s });
    tl.set(ban.caDung, { opacity: 1 }, PLACE); tl.set(ban.ca, { opacity: 0 }, PLACE);
    tl.to(ban.caDung, { y: TY, duration: 0.16, ease: "power2.in" }, PLACE + 0.02);
    tl.to(ban.caDung, { rotationZ: -4, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.out" }, PLACE + 0.18);
    api.sfx("drop", PLACE + 0.18, 0.5);
  })();
  api.armTo(w, "L", PLACE + 0.08, 0.3, 0, "power2.out");

  // ---------------------------------------------------------------- 2.2–3.6 "Oymyakon": lật bìa sổ, pop-up bật dựng
  api.quay(w, 2.12, 0.65, 0.3);
  api.look(w, 2.12, 10, 4, 0.15);
  api.armTo(w, "R", 2.18, 0.26, -125, "power2.out");
  api.armTo(w, "R", 2.45, 0.35, -60, "power2.inOut");
  so.moBia(2.3, 0.7);
  api.sfx("whoosh", 2.35, 0.45);
  so.batLop(IHILL, 2.78);
  so.batLop(IHOUSE, 2.92);
  so.batLop(ISIGN, 3.08);
  api.sfx("pop", 2.98, 0.5); api.sfx("pop", 3.22, 0.6);
  api.hop(w, 3.25, 12, 0.3);
  api.armTo(w, "R", 3.6, 0.4, -95, "back.out(1.5)");

  // ---------------------------------------------------------------- 4.6–7.6 "coldest…": tuyết giấy rơi trong trang, Wob run
  api.tuyetGiay(ban.the, { vung: so.vung(430), n: 26, co: 22, t0: 4.45, toc: 150, seed: 77 });
  api.armTo(w, "R", 4.75, 0.25, 48, "power2.inOut");
  api.armTo(w, "L", 4.75, 0.25, -48, "power2.inOut");
  api.shiver(w, nh[4], nh[4] + 0.8, 3.2);
  api.sfx("brr", nh[4], 0.4);
  api.look(w, nh[4], 0, -2, 0.1, 0.8);
  api.look(w, 5.9, 8, -8, 0.25);
  api.quay(w, 5.9, 0.4, 0.4);
  api.shiver(w, 6.5, 7.0, 1.5);
  api.armTo(w, "L", 7.0, 0.35, 0, "power2.inOut");
  api.armTo(w, "R", 7.0, 0.35, -40, "power2.inOut");

  // ---------------------------------------------------------------- 7.7–9.6 "Roughly five hundred people": làng tí hon bật, Wob chỉ biển
  so.batLop(ITINY, 7.72, 0.45);
  api.sfx("pop", 7.86, 0.45);
  api.quay(w, 7.7, 0.6, 0.25);
  api.armTo(w, "R", 7.75, 0.3, -112, "back.out(1.6)");
  api.look(w, 7.8, 12, -6, 0.15);
  [tu.five, tu.hundred, tu.people].forEach(function (t) {
    tl.to(w.armR, { rotation: -100, svgOrigin: "314 212", duration: 0.09, yoyo: true, repeat: 1, ease: "power1.inOut" }, t);
  });

  // ---------------------------------------------------------------- 9.4–11.4 "On purpose.": nhìn thẳng, tỉnh bơ, giữ hình
  api.armTo(w, "R", 9.35, 0.3, 0, "power2.inOut");
  api.quay(w, 9.45, 0, 0.3);
  api.look(w, 9.5, 0, 2, 0.2);
  api.lids(w, 9.8, 0.5, 0.2);
  api.blink(w, 10.95, 0.5, true);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[0, 1.0], [9.6, 12.6]] });
  api.breathe(w, 1.0, 12.4);
  api.blinks(w, 1.0, 9.6, [[4.8, 5.8]], 0);
};
