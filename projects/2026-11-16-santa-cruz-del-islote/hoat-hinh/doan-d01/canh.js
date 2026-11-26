/* Đoạn d01 (diorama, hiện tại, 15,3 s) – mở video tập 4 Santa Cruz del Islote.
 * Khung 0: Wob đứng trên mặt bàn kỷ vật giơ bình xịt muỗi (tem niêm phong đỏ) ngang mặt; sổ du lịch mở, trang trái dán bản đồ
 * map-islote (vẽ bằng ve_ban_do.mjs, không nhãn chữ). "I took it to…": Wob chĩa bình xịt vào ghim; "packed": hòn đảo kín nhà bật dựng,
 * nhà bật lần lượt trái → phải, mái cuối bị ép nảy vọt rồi chen xuống. "seal's": cắt cận bình xịt, ngón tay bấm vòi không nhúc nhích;
 * lui ra, bấm mạnh: Wob nảy bật khỏi mặt bàn. 8,4 s: muỗi giấy bay vòng chụp đèn, liếc Wob, bay thẳng ra khỏi khung.
 * "Hi, I'm Wob": đặt bình xịt xuống (tem quay ra), vẫy tay; thẻ hộ chiếu lật vào góc trái trên (x 96–860, y 54–440) 10,05 → lật đi
 * xong 13,35. Cuối: camera lao vào hòn đảo pop-up, 0,5 s cuối phủ giấy #EFE3C8.
 * Bố cục bàn kỷ vật chung các đoạn hiện tại của tập (d01, d26, d30, d32): hộp (−620, −480), sổ gáy x −60 z −240 500×600.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // SANTA CRUZ DEL ISLOTE, COLOMBIA, Would Wob move here?

  // ---------------------------------------------------------------- dựng
  var SO = { x: -60, z: -240, w: 500, d: 600 };
  var mapTrang = '<svg x="0" y="0" width="' + SO.w + '" height="' + SO.d + '" viewBox="1010 250 ' + SO.w + " " + SO.d + '" preserveAspectRatio="xMidYMid slice"><image href="ban-do/map-islote.svg" x="0" y="0" width="1920" height="1080"/></svg>' +
    '<rect x="0" y="0" width="' + SO.w + '" height="' + SO.d + '" fill="none" stroke="' + C.INK + '" stroke-width="6"/>' +
    '<g class="ghim-so"><circle cx="310" cy="310" r="26" fill="none" stroke="#fff6c8" stroke-width="5" opacity=".9"/></g>';
  var dao = api.lopPopup.tuy(api.daoKinNhaSVG(470, 250, { seed: 404 }), 470, 250, { x: 250, banLe: -20 });
  var ban = api.dungBan({ hop: { x: -620, z: -480 }, wob: { x: 640, z: -110, s: 0.9 }, so: { x: SO.x, z: SO.z, w: SO.w, d: SO.d, lop: [dao], biaTrong: mapTrang, moSan: true } });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";   // ở nhà: không đeo ba lô
  var lop = so.lop[0];
  gsap.set(lop, { rotationX: 0 }); // lớp đảo nằm phẳng tới "packed"
  var nha = Array.prototype.slice.call(lop.svg.querySelectorAll(".nha")).sort(function (a, b) {
    return (+a.getAttribute("class").match(/nha-(\d+)/)[1]) - (+b.getAttribute("class").match(/nha-(\d+)/)[1]);
  });
  gsap.set(nha, { scaleY: 0, transformOrigin: "50% 100%" });
  var nhaCuoi = lop.svg.querySelector(".nha-cuoi"), maiCuoi = lop.svg.querySelector(".nha-mai");
  var thuyen = lop.svg.querySelectorAll(".dao-thuyen");

  // bình xịt: trong tay trái (nhóm đồ cầm) + một bình đứng trên bàn (ẩn, hiện khi đặt xuống)
  var KX = 0.95; // tỉ lệ bình trong hệ 400 của Wob
  w.holdL.insertAdjacentHTML("beforeend", '<g class="xit-cam"><g transform="scale(' + KX + ')">' + api.binhXitSVG() +
    '<g class="ngon" opacity="0"><ellipse cx="0" cy="-196" rx="15" ry="13" fill="' + C.INK + '"/></g></g></g>');
  var xit = w.holdL.querySelector(".xit-cam"), ngon = xit.querySelector(".ngon"), voi = xit.querySelector(".bx-voi");
  var xitBan = api.cut(the, 90, 205, '<g transform="translate(45 200)">' + api.binhXitSVG() + "</g>", { pos: { x: 470, y: TY, z: -60, scale: 0.9 * KX }, f: api.F.AM_NHO });
  gsap.set(xitBan, { opacity: 0 });

  // tay: góc quay để bàn tay tới điểm (x, y) của hệ 400×400 (gần đúng theo hướng)
  var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
  var goc = function (side, x, y) {
    var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
    var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
  };
  // tư thế bình: cầm ở chiều cao g (đơn vị bình) tính từ đáy, nghiêng ang
  var xitPose = function (arm, g, ang) {
    var h = api.handWorld("L", arm), a = ang * Math.PI / 180, gk = g * KX;
    return api.holdPose("L", arm, h[0] - gk * Math.sin(a), h[1] + gk * Math.cos(a), ang);
  };
  var A0 = goc("L", 26, 140);  // bình giơ ngang mặt, bên trái mặt
  api.armSet(w, "L", A0);
  gsap.set(xit, xitPose(A0, 26, 6));
  api.quaySet(w, -0.12);

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: 250, cy: 40, cz: -170, k: 170, rx: -14, ry: 7 });
  api.camTo(R, 0, 2.2, { k: 220 }, "sine.inOut");                                       // đẩy chậm 1,0 → 1,05
  api.camTo(R, 2.2, 1.0, { cx: 160, cy: 40, cz: -220, k: 240, ry: 5 }, "power2.inOut");   // lướt về phía ghim
  api.camTo(R, 3.2, 1.6, { k: 265 }, "sine.inOut");
  api.camTo(R, 4.8, 0.8, { cx: 240, cy: -10, cz: -220, k: 290, rx: -10, ry: 3 }, "power2.inOut"); // đảo bật dựng
  api.camTo(R, 5.6, 1.4, { k: 315 }, "sine.inOut");
  // cắt cận bình xịt đúng "seal's"
  var tSeal = (tu.seals || 7.05) - 0.04;
  var tem = api.wobTheGioi(w, 26, 140 + 26 * KX - 150 * KX);
  api.camSet(R, tSeal, { cx: tem.x + 4, cy: tem.y - 4, cz: w.z, k: 930, rx: -3, ry: 0 });
  api.camTo(R, tSeal, 0.32, { k: 950 }, "sine.inOut");
  var mat = api.wobTheGioi(w, 160, 190);
  api.camTo(R, tSeal + 0.36, 0.34, { cx: mat.x - 60, cy: mat.y - 10, cz: w.z, k: 520, rx: -6, ry: 2 }, "power3.out");
  api.camTo(R, tSeal + 0.7, 0.62, { k: 545 }, "sine.inOut");
  // muỗi: lùi rộng ra cho thấy chụp đèn
  api.camTo(R, 8.2, 0.75, { cx: 20, cy: -60, cz: -260, k: 110, rx: -11, ry: 6 }, "power2.inOut");
  api.camTo(R, 8.95, 1.0, { k: 125 }, "sine.inOut");
  // lời chào: Wob bên phải, thẻ hộ chiếu góc trái trên
  api.camTo(R, 9.95, 0.7, { cx: 140, cy: 10, cz: -200, k: 170, rx: -12, ry: 4 }, "power2.inOut");
  api.camTo(R, 10.65, 3.35, { k: 205 }, "sine.inOut");
  var diemDao = so.diemLop(0, 250, 150);
  api.camTo(R, 14.0, 0.55, { cx: 220, cy: -20, cz: -220, k: 250, rx: -9, ry: 2 }, "power2.inOut");
  api.laoVao(R, 14.586, 0.68, diemDao, 1110, "power3.in");
  api.sfx("whoosh", 14.6, 0.4);
  api.raGiay(null, 0.5);

  // ---------------------------------------------------------------- 0–2.2 giơ bình xịt
  api.look(w, 0, -4, -2, 0.01);
  var tSpray = tu.spray || 1.52;
  tl.to(xit, Object.assign(xitPose(A0, 26, -6), { duration: 0.1, ease: "power1.inOut", yoyo: true, repeat: 3 }), tSpray - 0.05);
  // 2.3–4.6 chĩa bình xịt về ghim
  var tTook = tu.took || 2.46;
  var AP = 78;
  api.quay(w, tTook - 0.25, -0.65, 0.3);
  api.look(w, tTook - 0.2, -14, 8, 0.2);
  api.armTo(w, "L", tTook - 0.2, 0.4, AP, "back.out(1.4)");
  tl.to(xit, Object.assign(xitPose(AP, 96, -90), { duration: 0.4, ease: "back.out(1.4)" }), tTook - 0.2);
  [tu.tiny || 2.95, tu.warm || 3.61, tu.island || 3.88].forEach(function (t) {
    tl.to(xit, Object.assign(xitPose(AP - 5, 96, -94), { duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" }), t);
  });
  // 4.9–6.4 "packed": đảo bật dựng, nhà lần lượt, mái cuối bị ép
  var tPacked = tu.packed || 5.21;
  so.batLop(0, tPacked - 0.4, 0.45);
  api.sfx("pop", tPacked - 0.2, 0.5);
  var nNha = nha.length, buoc = 0.62 / nNha;
  nha.forEach(function (n, i) {
    if (n === nhaCuoi) return;
    tl.fromTo(n, { scaleY: 0 }, { scaleY: 1, duration: 0.22, ease: "back.out(2.4)", immediateRender: false }, tPacked - 0.05 + i * buoc);
  });
  [0, 3, 6, 9].forEach(function (k) { api.sfx("pop", tPacked + k * buoc, 0.22); });
  var tCuoi = tPacked + 0.7;
  tl.fromTo(nhaCuoi, { scaleY: 0, scaleX: 1 }, { scaleY: 1.45, scaleX: 0.72, duration: 0.18, ease: "power2.out", immediateRender: false }, tCuoi);
  tl.to(nhaCuoi, { y: -34, duration: 0.14, ease: "power2.out" }, tCuoi + 0.12);
  tl.to(nhaCuoi, { y: 0, scaleY: 1, scaleX: 1, duration: 0.3, ease: "bounce.out" }, tCuoi + 0.28);
  api.sfx("boing", tCuoi + 0.1, 0.35);
  tl.fromTo(thuyen, { y: 0 }, { y: -3, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 7, immediateRender: false }, tPacked + 0.4);
  api.look(w, tPacked - 0.3, -16, 2, 0.15, 1.1);
  api.hop(w, tCuoi + 0.25, 10, 0.25);
  // về tư thế giơ bình trước "seal's"
  api.armTo(w, "L", 6.45, 0.4, A0, "power2.inOut");
  tl.to(xit, Object.assign(xitPose(A0, 26, 0), { duration: 0.4, ease: "power2.inOut" }), 6.45);
  api.quay(w, 6.5, -0.1, 0.3);
  api.look(w, 6.6, -6, -4, 0.2);

  // ---------------------------------------------------------------- 7.0–8.4 tem: ngón bấm vòi không nhúc nhích; bấm mạnh, Wob nảy
  tl.set(ngon, { opacity: 1 }, tSeal);
  tl.fromTo(ngon, { y: -14 }, { y: 6, duration: 0.12, ease: "power2.in", immediateRender: false }, tSeal + 0.02);
  tl.to(ngon, { scaleY: 0.8, transformOrigin: "50% 100%", duration: 0.06, yoyo: true, repeat: 1 }, tSeal + 0.14);
  tl.to(ngon, { y: -26, duration: 0.1, ease: "power2.out" }, tSeal + 0.27);
  tl.set(ngon, { opacity: 0 }, tSeal + 0.38);
  api.sfx("bonk", tSeal + 0.14, 0.25);
  var tNay = tSeal + 0.44;
  api.armTo(w, "L", tNay - 0.08, 0.08, A0 - 8, "power2.in");
  api.lids(w, tNay - 0.08, 0.35, 0.08);
  api.hop(w, tNay, 95, 0.5);
  api.sfx("boing", tNay + 0.05, 0.55);
  api.armTo(w, "L", tNay + 0.3, 0.2, A0, "power2.out");
  api.quay(w, tNay + 0.55, 0, 0.2);
  api.look(w, tNay + 0.6, 0, 3, 0.15);
  api.lids(w, tNay + 0.62, 0.5, 0.15);    // nhìn thẳng người xem, tỉnh bơ, giữ ≥ 0,8 s

  // ---------------------------------------------------------------- 8.4–10.0 muỗi giấy: vòng qua chụp đèn, liếc Wob, bay thẳng ra
  var mu = api.cut(the, 160, 120, '<g transform="translate(80 60)">' + api.muoiGiaySVG() + "</g>", { pos: { x: -1300, y: -500, z: -500, scale: 1.3 }, ax: 80, ay: 60, f: api.F.AM_NHO });
  var muCanh = mu.svg.querySelector(".mu-canh"), muCon = mu.svg.querySelector(".mu-con");
  gsap.set(muCanh, { transformOrigin: "50% 100%" });
  var DEN = [-860, -230, -560];
  var K = [ // [t, x, y, z]
    [8.35, -1350, -470, -520], [8.65, -1050, -360, -470], [8.9, -820, -330, -500], [9.1, -720, -230, -600], [9.28, -880, -140, -640],
    [9.45, -1000, -250, -560], [9.62, -560, -280, -380], [9.8, 180, -260, -200], [10.0, 530, -210, -110], [10.2, 560, -205, -100], [10.36, 900, -330, 0], [10.62, 1900, -520, 120]];
  var cr = function (p0, p1, p2, p3, u) { var u2 = u * u, u3 = u2 * u; return 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3); };
  var muLuc = function (t) {
    if (t <= K[0][0]) return K[0].slice(1);
    for (var i = 0; i < K.length - 1; i++) if (t <= K[i + 1][0]) {
      var u = (t - K[i][0]) / (K[i + 1][0] - K[i][0]), a = K[Math.max(0, i - 1)], b = K[i], c = K[i + 1], d = K[Math.min(K.length - 1, i + 2)];
      return [1, 2, 3].map(function (j) { return cr(a[j], b[j], c[j], d[j], u); });
    }
    return K[K.length - 1].slice(1);
  };
  api.moiKhung(function (t) {
    var on = t > 8.3 && t < 10.7;
    var p = muLuc(t), q = muLuc(t + 0.04), sx = q[0] < p[0] - 0.5 ? -1 : 1;
    gsap.set(mu, { x: p[0], y: p[1], z: p[2], scaleX: 1.3 * sx, scaleY: 1.3, opacity: on ? 1 : 0 });
    gsap.set(muCanh, { scaleY: 0.35 + 0.65 * Math.abs(Math.sin(t * 52)) });
  });
  tl.to(muCon, { x: -3, y: 3, duration: 0.1 }, 10.0);   // liếc Wob
  tl.to(muCon, { x: 0, y: 0, duration: 0.1 }, 10.25);
  api.sfx("muoi", 8.4, 0.5);
  api.look(w, 9.55, -14, -12, 0.2);
  api.look(w, 9.95, -2, -16, 0.12, 1.15);   // Wob nhìn muỗi ngang qua đầu
  api.look(w, 10.35, 14, -14, 0.15);
  api.lids(w, 9.5, 0.2, 0.2);

  // ---------------------------------------------------------------- 10.0–13.4 lời chào: đặt bình xịt (tem quay ra), vẫy tay; thẻ hộ chiếu
  var tHi = tu.hi || 10.03;
  var ADat = goc("L", 60, 300);
  api.armTo(w, "L", tHi - 0.6, 0.35, ADat, "power2.inOut");
  tl.to(xit, Object.assign(xitPose(ADat, 40, 0), { duration: 0.35, ease: "power2.inOut" }), tHi - 0.6);
  (function () {
    var h = api.handWorld("L", ADat), p = api.wobTheGioi(w, h[0], h[1] + 40 * KX);
    gsap.set(xitBan, { x: p.x, z: w.z + 30 });
  })();
  tl.set(xitBan, { opacity: 1 }, tHi - 0.24); tl.set(xit, { opacity: 0 }, tHi - 0.24);
  api.sfx("drop", tHi - 0.22, 0.3);
  api.armTo(w, "L", tHi - 0.18, 0.3, 0, "power2.inOut");
  api.quay(w, tHi - 0.15, 0.15, 0.25);
  api.look(w, tHi + 0.1, 0, 2, 0.15);
  api.lids(w, tHi, 0, 0.15);
  api.armTo(w, "R", tHi + 0.05, 0.3, -150, "back.out(1.8)");
  [0, 1, 2, 3].forEach(function (i) { api.armTo(w, "R", tHi + 0.4 + i * 0.2, 0.2, i % 2 ? -150 : -128, "sine.inOut"); });
  api.armTo(w, "R", tHi + 1.25, 0.35, -10, "power2.inOut");
  var tWob = tu.wob || 10.9;
  api.hop(w, tWob - 0.05, 8, 0.22);
  var hc = api.theHoChieu({ noi: chu[0], noiDong: ["SANTA CRUZ", "DEL ISLOTE"], nuoc: chu[1], hoi: chu[2], x: 96, y: 54, bo: api.HC_LON }); // x 96–900, y 54–540
  hc.vao(tHi - 0.05, 0.45);
  api.sfx("lat-giay", tHi - 0.05, 0.6);
  hc.ra(12.95, 0.3);
  api.sfx("lat-giay", 12.95, 0.45);
  // "I visit odd places and ask why anyone stays."
  var tCol = tu.visit || 11.76, tOdd = tu.odd || 12.05, tReas = tu.ask || 12.84;
  api.armTo(w, "R", tCol - 0.15, 0.25, -70, "power2.out");
  api.armTo(w, "L", tCol - 0.15, 0.25, 60, "power2.out");
  api.look(w, tOdd, 6, -4, 0.15);
  api.armTo(w, "R", tReas - 0.1, 0.3, -40, "power2.inOut");
  api.armTo(w, "L", tReas - 0.1, 0.3, 40, "power2.inOut");
  api.quay(w, 13.75, -0.55, 0.3);
  api.look(w, 13.8, -14, 6, 0.2);
  api.armTo(w, "L", 13.85, 0.3, 70, "back.out(1.6)");
  api.armTo(w, "R", 13.85, 0.3, 0, "power2.inOut");

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[tNay - 0.1, tNay + 0.7]] });
  api.breathe(w, 0, DUR - 0.2);
  api.blink(w, 4.3, 0); api.blink(w, 12.6, 0);
};
