/* Đoạn d03 (diorama, hiện tại, 10,8 s; biên đạo lại 21/11/2026, nền từ _cu-21-11/d01): cắt cứng về bàn ấm.
 * Trung cận: Wob (găng lò nướng tay trái) giơ con cá đông cứng như tấm ván ("This is a fish.") → gõ đuôi cá vào bàn "cộc"
 * → lùi trung cảnh: dựng cá đứng một mình trên bàn, buông tay đúng "own", Wob lùi một bước nhìn nó, giữ 0,6 s
 * → cầm lại cá, tay phải mở bìa sổ: trang pop-up quả địa cầu (map-globe, vẽ bằng code) bật dựng, chấm "Oymyakon" sáng đúng
 * "Oymyakon"; camera đẩy chậm vào trang → tuyết giấy rơi quanh chấm, Wob run một cái. Ra: chen (giữ hình tới hết).
 * Bố cục bàn dùng chung mọi đoạn hiện tại của tập (BO_CUC, giống d05, d18, d20, d26, d38, d40).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; });   // 0, 1.82, 3.3, 4.84, 7.16
  var chu = data.chu_tren_do_vat; // ["Oymyakon"]
  var T = function (k, d) { return tu[k] != null ? tu[k] : d; };
  var tOwn = T("own", 4.14), tOym = T("oymyakon", 5.85), tCold = T("coldest", 7.88);

  // ---------------------------------------------------------------- bố cục bàn kỷ vật chung của tập
  var BO_CUC = {
    hop: { x: -200, z: -400, w: 300, d: 220, h: 150, do: ["anh"] },
    so: { x: 480, z: -330, w: 460, d: 580 },
    baLo: { x: -660, z: -250, s: 0.85 },
    ongBut: { x: -760, z: 430 },
    ongButNho: { x: 430, z: 140, s: 0.75 },
    HOME: { x: 150, z: 0 }
  };
  // pop-up quả địa cầu: map-globe (assets/ban-do, D3 + Natural Earth bản quan điểm Việt Nam), cắt tròn quanh chấm Oymyakon
  var GW = 380, GH = 430, GR = 160, GCX = GW / 2, GCY = GH - GR - 6;
  var DOT = { x: 1344, y: 434 }, VB = 520;   // khung nhìn 520×520 đơn vị bản đồ quanh chấm
  var globe = '<defs><clipPath id="d03-cau"><circle cx="' + GCX + '" cy="' + GCY + '" r="' + GR + '"/></clipPath></defs>' +
    '<circle cx="' + GCX + '" cy="' + (GCY + 8) + '" r="' + (GR + 6) + '" fill="#c9b48e"/>' +
    '<g clip-path="url(#d03-cau)"><svg x="' + (GCX - GR) + '" y="' + (GCY - GR) + '" width="' + 2 * GR + '" height="' + 2 * GR + '" viewBox="' +
    (DOT.x - VB / 2) + " " + (DOT.y - VB / 2 - 20) + " " + VB + " " + VB + '" preserveAspectRatio="xMidYMid slice">' +
    '<image href="ban-do/map-globe.svg" x="0" y="0" width="1920" height="1080"/></svg>' +
    '<path d="M ' + (GCX - GR) + " " + GCY + " Q " + GCX + " " + (GCY + 60) + " " + (GCX + GR) + " " + GCY + '" fill="none" stroke="#ffffff" stroke-width="3" opacity=".35"/></g>' +
    '<circle cx="' + GCX + '" cy="' + GCY + '" r="' + GR + '" fill="none" stroke="' + C.INK + '" stroke-width="6"/>' +
    // chấm Oymyakon (tâm khung nhìn lệch 20 đơn vị: chấm ở trên tâm) + quầng sáng
    '<g class="d03-cham"><circle class="d03-quang" cx="' + GCX + '" cy="' + (GCY + 20 * 2 * GR / VB) + '" r="34" fill="#ffd36a" opacity="0"/>' +
    '<circle cx="' + GCX + '" cy="' + (GCY + 20 * 2 * GR / VB) + '" r="12" fill="#C23B2A" stroke="' + C.INK + '" stroke-width="4"/></g>' +
    // nhãn trên thẻ giấy
    '<g class="d03-nhan" opacity="0"><rect x="' + (GCX - 150) + '" y="6" width="300" height="78" rx="10" fill="' + C.PAPER + '" stroke="' + C.INK + '" stroke-width="5"/>' +
    api.txt(GCX, 62, 54, 800, chu[0], C.INK) +
    '<path d="M ' + GCX + " 84 L " + GCX + " " + (GCY + 20 * 2 * GR / VB - 14) + '" stroke="' + C.INK + '" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round"/></g>';
  var L = api.lopPopup;
  var ban = api.dungBan({
    hop: BO_CUC.hop, baLo: BO_CUC.baLo, ongBut: BO_CUC.ongBut, ongButNho: BO_CUC.ongButNho,
    wob: { x: BO_CUC.HOME.x, z: BO_CUC.HOME.z, s: 0.9 },
    caCung: true,
    so: {
      x: BO_CUC.so.x, z: BO_CUC.so.z, w: BO_CUC.so.w, d: BO_CUC.so.d,
      lop: [
        L.doi(430, 150, { x: 230, banLe: -170 }),
        L.tuy(globe, GW, GH, { x: 230, banLe: 40 })
      ]
    }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  api.cut(ban.trongHop, 170, 120, api.toRoiSVG(), { pos: { x: 70, y: -8, z: -30, rotationZ: 8, scale: 0.75 }, f: api.F.AM_NHO });
  api.cut(ban.trongHop, 90, 170, api.chaiNuocSVG(false), { pos: { x: -95, y: -12, z: 20 }, f: api.F.AM_NHO });
  api.deoGang(w, "L", true);
  var caA = function (arm, cy) { return api.holdPose("L", arm, 30, cy, -90); };   // cầm đầu cá, thân thẳng đơ chúc đuôi xuống

  // cá đứng một mình trên bàn (tấm riêng; tay cầm cá ẩn khi cá đứng)
  var CA_DUNG = { x: -70, z: 30 };
  var caDung = api.cut(the, 120, 320, '<g transform="translate(60 162) rotate(-90)">' + api.fishSVG("") + "</g>", { pos: { x: CA_DUNG.x, y: TY, z: CA_DUNG.z, scale: 0.9 }, ay: 316, f: api.F.AM });
  gsap.set(caDung, { opacity: 0 });

  // ---------------------------------------------------------------- tư thế đầu: giơ cá như tấm ván (khung 0 đã có hình)
  api.armSet(w, "L", 170);
  gsap.set(ban.ca, caA(170, 196));
  api.quaySet(w, 0.1);
  gsap.set([w.pupL, w.pupR], { x: 0, y: 2 });

  // ---------------------------------------------------------------- camera
  var mat = { x: BO_CUC.HOME.x, y: TY - 200 * 0.9, z: 0 };
  // trung cận: cá + găng ~1/3 khung, đèn ấm
  api.camSet(R, null, { cx: mat.x - 70, cy: mat.y + 20, cz: 0, k: 560, rx: -8, ry: 6 });
  api.camTo(R, 0, 1.8, { cx: mat.x - 60, k: 600, ry: 5 }, "sine.inOut");
  api.camTo(R, 1.8, 1.5, { k: 625, ry: 4 }, "sine.inOut");
  // lùi về trung cảnh: thấy cá đứng một mình cạnh Wob
  api.camTo(R, 3.3, 0.8, { cx: 40, cy: mat.y + 70, cz: 0, k: 400, rx: -11, ry: 5 }, "power2.inOut");
  api.camTo(R, 4.1, 0.75, { k: 420 }, "sine.inOut");
  // sang sổ: trung cảnh sổ + Wob, rồi đẩy chậm vào trang pop-up
  var cau = so.diemLop(1, GCX, GCY - 40);
  api.camTo(R, 4.85, 0.85, { cx: 360, cy: cau.y + 40, cz: -150, k: 300, rx: -9, ry: -3 }, "power2.inOut");
  api.camTo(R, 5.7, 1.4, { cx: cau.x - 20, cy: cau.y, cz: cau.z, k: 560, rx: -5, ry: -2 }, "sine.inOut");
  api.camTo(R, 7.1, 3.7, { k: 640, ry: 0 }, "sine.inOut");

  // ---------------------------------------------------------------- 0–1.8: "This is a fish." giơ cá thẳng đơ
  api.look(w, 0.3, 0, 2, 0.15);
  tl.fromTo(ban.ca, { attr: caA(170, 196).attr }, { attr: caA(172, 190).attr, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 0.6);
  api.lids(w, 1.0, 0.35, 0.15);

  // ---------------------------------------------------------------- 1.82–3.3: gõ đuôi cá vào mép bàn "cộc", cá không cong
  var BONK = 2.25;
  api.lids(w, 1.85, 0, 0.1);
  api.look(w, BONK - 0.3, -12, 12, 0.12);
  api.armTo(w, "L", BONK - 0.3, 0.14, 178, "power2.out");
  tl.to(ban.ca, Object.assign(caA(178, 168), { duration: 0.14, ease: "power2.out" }), BONK - 0.3);
  api.armTo(w, "L", BONK - 0.1, 0.1, 150, "power3.in");
  tl.to(ban.ca, Object.assign(caA(150, 240), { duration: 0.1, ease: "power3.in" }), BONK - 0.1);
  api.sfx("bonk", BONK, 0.85);
  tl.fromTo(w.lift, { y: 0 }, { y: 4, duration: 0.05, yoyo: true, repeat: 1, ease: "power1.out", immediateRender: false }, BONK);
  for (var rk = 0; rk < 7; rk++) tl.set(R.stage, { x: (rk % 2 ? -1 : 1) * 5 * (1 - rk / 7), y: (rk % 2 ? 1 : -1) * 2 * (1 - rk / 7) }, BONK + rk / 30);
  tl.set(R.stage, { x: 0, y: 0 }, BONK + 7 / 30);
  api.lids(w, BONK + 0.12, 0.5, 0.15);
  api.look(w, BONK + 0.12, -10, 14, 0.15);
  api.armTo(w, "L", 2.75, 0.3, 170, "power2.out");
  tl.to(ban.ca, Object.assign(caA(170, 196), { duration: 0.3, ease: "power2.out" }), 2.75);

  // ---------------------------------------------------------------- 3.3–4.84: dựng cá đứng một mình, buông đúng "own", lùi một bước nhìn
  api.lids(w, 3.2, 0, 0.12);
  api.quay(w, 3.3, -0.55, 0.3);
  api.look(w, 3.35, -12, 10, 0.2);
  // hạ cá xuống mặt bàn: tâm cá ở CA_DUNG (trong hệ Wob)
  var s = 0.9, cx = (CA_DUNG.x - BO_CUC.HOME.x) / s + 200, cyDung = 392 - 162 / s * 0.9 - 4;
  api.armTo(w, "L", 3.4, 0.55, 40, "sine.inOut");
  tl.to(ban.ca, Object.assign(api.holdPose("L", 40, cx, cyDung, -90), { duration: 0.55, ease: "sine.inOut" }), 3.4);
  tl.set(caDung, { opacity: 1 }, tOwn - 0.02); tl.set(ban.ca, { opacity: 0 }, tOwn - 0.02);
  api.armTo(w, "L", tOwn, 0.3, 10, "power2.out");                       // buông tay
  tl.fromTo(caDung, { rotationZ: 0 }, { rotationZ: 1.5, duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, tOwn + 0.02);
  api.walk(w, tOwn + 0.12, tOwn + 0.5, BO_CUC.HOME.x + 70, BO_CUC.HOME.z, { face: 0.2, endFace: -0.45, keepL: true, step: 0.19 });
  api.look(w, tOwn + 0.4, -14, 8, 0.2);
  api.lids(w, tOwn + 0.55, 0.3, 0.15);
  // giữ 0,6 s (cá đứng im, Wob đứng im nhìn nó)

  // ---------------------------------------------------------------- 4.84–7.16: cầm lại cá, tay phải mở bìa sổ, pop-up địa cầu bật
  var X2 = BO_CUC.HOME.x + 70, cx2 = (CA_DUNG.x - X2) / s + 200;
  api.lids(w, N[3], 0, 0.1);
  api.armTo(w, "L", N[3], 0.25, 40, "power2.out");
  tl.set(ban.ca, Object.assign({ opacity: 1 }, api.holdPose("L", 40, cx2, cyDung, -90)), N[3] + 0.25);
  tl.set(caDung, { opacity: 0 }, N[3] + 0.25);
  api.armTo(w, "L", N[3] + 0.3, 0.35, 168, "power2.inOut");
  tl.to(ban.ca, Object.assign(api.holdPose("L", 168, 76, 20, -100), { duration: 0.35, ease: "power2.inOut" }), N[3] + 0.3);   // cá tựa vai
  api.quay(w, N[3] + 0.35, 0.6, 0.3);
  api.look(w, N[3] + 0.4, 12, 4, 0.15);
  api.armTo(w, "R", N[3] + 0.45, 0.26, -125, "power2.out");
  so.moBia(N[3] + 0.55, 0.6);
  api.sfx("whoosh", N[3] + 0.6, 0.45);
  api.armTo(w, "R", N[3] + 0.8, 0.35, -40, "power2.inOut");
  so.batLop(0, tOym - 0.45);
  so.batLop(1, tOym - 0.28);
  api.sfx("pop", tOym - 0.2, 0.5);
  var lop1 = so.lop[1];
  var quang = lop1.querySelector(".d03-quang"), nhan = lop1.querySelector(".d03-nhan");
  tl.fromTo(quang, { opacity: 0, scale: 0.4 }, { opacity: 0.85, scale: 1.25, transformOrigin: "50% 50%", duration: 0.25, ease: "power2.out", immediateRender: false }, tOym);
  tl.to(quang, { opacity: 0.45, scale: 1, duration: 0.6, ease: "sine.inOut" }, tOym + 0.25);
  api.sfx("ting", tOym, 0.4);
  tl.fromTo(nhan, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: "power1.out", immediateRender: false }, tOym);
  api.look(w, tOym, 14, -6, 0.15);
  api.hop(w, tOym + 0.1, 10, 0.25);

  // ---------------------------------------------------------------- 7.16–10.8: tuyết giấy rơi trong trang quanh chấm, Wob run một cái
  api.tuyetGiay(the, { vung: so.vung(520), n: 22, co: 20, t0: 7.1, t1: 10.8, toc: 140, seed: 303 });
  api.shiver(w, tCold, tCold + 0.75, 3.2);
  api.sfx("brr", tCold, 0.4);
  api.look(w, tCold + 0.9, 0, 2, 0.2);

  // ---------------------------------------------------------------- liên tục: khẩu hình theo lời, gật đầu nhẹ, thở, chớp
  api.khauHinh(w);
  api.gatDau(w, { bo: [[1.8, 2.8], [3.3, 5.0]], amp: 0.8 });
  api.breathe(w, 0, 10.8);
  api.blinks(w, 0.2, 10.6, [[1.8, 2.8], [4.0, 5.2], [7.8, 8.7]], 0);
};
