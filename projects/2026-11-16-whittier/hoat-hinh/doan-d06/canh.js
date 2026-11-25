/* Đoạn d06 (diorama, hồi ức, 34,47 s): qua đường hầm một làn rồi ra vịnh.
 * Sân khấu A (hầm 3D giấy): đèn chuyển xanh, camera sau xe lao vào miệng hầm; hạ thấp sát mặt đường thấy hai thanh ray
 * chìm trong bê tông, đèn hầm trôi qua đều; biển bê tông "2000" trên vách lướt qua; hầm dài vô tận.
 * Sân khấu C (cận ngang qua kính): Wob hai tay bám vô lăng, má phồng dần vì nín thở; "Rails under my tyres" camera hạ xuống bánh xe.
 * Quay lại A, camera nhìn ngược ra sau: lòng can đảm (quả bóng mặt cười) bị bỏ lại trên đường ray, ngồi phịch xuống.
 * Sân khấu B (vịnh): ra khỏi hầm ánh xám, Wob thở ra mờ kính, camera lùi ra toàn cảnh; cụm mây đậu lên nóc xe ngay trên
 * đầu Wob thành cái mũ, Wob không biết; camera lướt ba lớp giấy: nước xám, thác, vách núi dựng đứng. Ra `chen` (cắt cứng).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; }); // 0.1, 2.113, 8.751, 15.888, 19.6, 26.206, 30.294
  var DUR = api.DUR;
  var TP = { mu: true, khan: true, muMau: "#F6EEDC", muVanh: "#e6dcc2", muBong: "#C9463A", muSoc: "#cbbf9f", khanMau: "#F6EEDC" };
  var ss = function (x) { x = Math.max(0, Math.min(1, x)); return x * x * x * (x * (x * 6 - 15) + 10); };
  var T_C = N[3] - 0.03, T_BACK = (tu.somewhere || 22.55) - 0.12, T_B = N[5] - 0.02;

  // ================================================================ SÂN KHẤU A: đường hầm (camera điều khiển theo khung)
  var A = api.sanKhau(), tA = A.the, RA = A.rig, FY = 300, HW = 450, CY = -380;
  // ngoài miệng hầm: trời, tuyết, vách núi có miệng vòm
  api.plane(tA, { x: 0, y: -2100, z: -330 }, 9000, 2200, "background:linear-gradient(#8fa6b2, #c9d6dc 90%);");
  api.floorPlane(tA, 0, FY, 1400, 6000, 3400, "background:" + C.SNOW2 + ";");
  var vom = "M 0 0 L 3200 0 L 3200 1500 L 0 1500 Z M " + (1600 - HW) + " 1500 L " + (1600 - HW) + " " + (1500 - (FY - CY) + 160) + " Q " + (1600 - HW) + " " + (1500 - (FY - CY) - 20) + " 1600 " + (1500 - (FY - CY) - 40) +
    " Q " + (1600 + HW) + " " + (1500 - (FY - CY) - 20) + " " + (1600 + HW) + " " + (1500 - (FY - CY) + 160) + " L " + (1600 + HW) + " 1500 Z";
  api.cut(tA, 3200, 1500, '<path d="' + vom + '" fill="#6f7a7c" fill-rule="evenodd" stroke="' + INK + '" stroke-width="8"/>' +
    fp(api.lumpy(0, 3200, 90, 60, 16, 7) + " L 3200 0 L 0 0 Z", C.SNOW, 6) + sk("M 400 300 L 700 900 M 2600 260 L 2400 1000 M 1000 200 L 1100 500", 5, INK, ' opacity=".3"') +
    '<rect x="' + (1600 - HW - 30) + '" y="' + (1500 - (FY - CY) - 80) + '" width="' + (2 * HW + 60) + '" height="40" fill="#9aa39a" stroke="' + INK + '" stroke-width="6"/>',
    { pos: { x: 0, y: FY, z: -300 }, f: api.F.LANH });
  var den = api.cut(tA, 90, 230, api.denTinHieuSVG(), { pos: { x: -620, y: FY, z: -200 }, f: api.F.LANH_NHO });
  // lòng hầm: 7 đoạn sàn, vách, trần, dải đèn
  var SAN = "background:" +
    "linear-gradient(90deg, rgba(0,0,0,0) 0 34.6%, #2b2f31 34.6% 35.2%, #b9c0c2 35.2% 35.8%, #2b2f31 35.8% 36.6%, rgba(0,0,0,0) 36.6% 63.4%, #2b2f31 63.4% 64.2%, #b9c0c2 64.2% 64.8%, #2b2f31 64.8% 65.4%, rgba(0,0,0,0) 65.4%)," +
    "repeating-linear-gradient(0deg, rgba(20,20,20,.28) 0 6px, rgba(0,0,0,0) 6px 260px)," +
    "linear-gradient(90deg, #4f5456, #7b8183 12%, #868c8e 50%, #7b8183 88%, #4f5456);";
  var VACH = "background:repeating-linear-gradient(90deg, rgba(10,10,10,.35) 0 14px, rgba(0,0,0,0) 14px 250px)," +
    "radial-gradient(ellipse 300px 200px at 30% 40%, rgba(255,255,255,.07), rgba(0,0,0,0)), radial-gradient(ellipse 260px 180px at 75% 70%, rgba(0,0,0,.18), rgba(0,0,0,0))," +
    "linear-gradient(#4c4a47, #6d6862 40%, #5b5753);background-size:100% 100%, 600px 700px, 700px 700px, 100% 100%;border-top:6px solid " + INK + ";";
  var DEN = "background:repeating-linear-gradient(90deg, #fff0bf 0 70px, rgba(255,240,191,.25) 70px 90px, rgba(0,0,0,0) 90px 500px);";
  for (var i = 0; i < 7; i++) {
    var zc = -1300 - i * 2000;
    api.floorPlane(tA, 0, FY, zc, 2 * HW, 2000, SAN);
    api.plane(tA, { x: -HW, y: (FY + CY) / 2, z: zc, rotationY: 90 }, 2000, FY - CY, VACH);
    api.plane(tA, { x: HW, y: (FY + CY) / 2, z: zc, rotationY: -90 }, 2000, FY - CY, VACH);
    api.floorPlane(tA, 0, CY, zc, 2 * HW, 2000, "background:#2d2c2a;");
    api.plane(tA, { x: -HW + 2, y: CY + 40, z: zc, rotationY: 90 }, 2000, 24, DEN);
    api.plane(tA, { x: HW - 2, y: CY + 40, z: zc, rotationY: -90 }, 2000, 24, DEN);
  }
  api.plane(tA, { x: 0, y: (FY + CY) / 2, z: -14300 }, 2 * HW, FY - CY, "background:radial-gradient(circle at 50% 60%, #6d6862, #2a2826);");
  // xe nhìn từ sau (mui đã đóng; qua kính sau thấy mũ len kem quả bông đỏ)
  var xeSau = fp("M 30 120 C 34 60 60 40 100 38 L 220 38 C 260 40 286 60 290 120 Z", "#3a3230", 6) +
    fp("M 62 112 C 66 74 84 60 106 58 L 214 58 C 236 60 254 74 258 112 Z", "#2a3436", 5) +
    fp("M 122 112 C 124 84 196 84 198 112 Z", "#F6EEDC", 4) + '<circle cx="160" cy="82" r="11" fill="#C9463A" stroke="' + INK + '" stroke-width="4"/>' +
    fp("M 16 120 L 304 120 L 310 196 C 310 206 302 210 292 210 L 28 210 C 18 210 10 206 10 196 Z", api.XE_DO, 6) +
    fp("M 24 138 l 44 0 l 0 24 l -44 0 Z M 252 138 l 44 0 l 0 24 l -44 0 Z", "#ff6a4a", 4) + fp("M 120 168 l 80 0 l 0 22 l -80 0 Z", C.PAPER, 3) +
    fp("M 30 206 l 50 0 l 0 34 l -50 0 Z M 240 206 l 50 0 l 0 34 l -50 0 Z", "#2f3b3c", 5);
  var xeA = api.cut(tA, 320, 240, xeSau, { pos: { x: 0, y: FY, z: 250 }, f: api.F.LANH });
  // biển bê tông 2000 trên vách phải, quay về camera
  var zXe = function (t) {
    if (t < 0.5) return 250;
    if (t < 2.1) return 250 - 400 * Math.pow((t - 0.5) / 1.6, 2);
    return -150 - 533 * (t - 2.1);
  };
  var tBien = 12.4, zBien = zXe(tBien) - 300;
  var bien2000 = api.cut(tA, 300, 190, fp("M 6 6 L 294 6 L 294 150 L 6 150 Z", "#a7aca9", 7) + sk("M 70 150 L 70 186 M 230 150 L 230 186", 9) + api.txt(150, 112, 96, 900, data.chu_tren_do_vat[0], INK),
    { pos: { x: HW - 260, y: CY + 470, z: zBien, scale: 1.5 }, f: api.F.LANH_NHO });
  tl.to(bien2000, { opacity: 0, duration: 0.25 }, 13.2);
  // lòng can đảm trên đường ray phía sau
  var zCan = zXe(T_BACK) + 1150;
  var canDam = api.cut(tA, 160, 180, '<g class="cd"><g transform="translate(80 112) scale(2.2)">' + api.bongCanDamSVG() + "</g></g>", { pos: { x: -40, y: FY, z: zCan, rotationY: 180, scale: 2.6 }, f: api.F.LANH_NHO });
  var cdG = canDam.svg.querySelector(".cd");
  gsap.set(canDam, { opacity: 0 });
  tl.set(canDam, { opacity: 1 }, T_BACK);
  var tCour = tu.courage || 23.83;
  tl.to(cdG, { y: 22, scaleY: 0.78, scaleX: 1.15, transformOrigin: "50% 100%", duration: 0.14, ease: "power3.in" }, tCour - 0.14);
  tl.to(cdG, { scaleY: 0.92, scaleX: 1.04, duration: 0.3, ease: "back.out(3)" }, tCour);
  api.sfx("drop", tCour, 0.35);

  // camera A: khoá theo xe, khung chính (t, cy, dz, k, rx, ry, cx)
  var KA = [
    [0.0, 110, -250, 0, -3, 0, 0], [0.5, 110, -250, 20, -3, 0, 0], [1.6, 120, -280, 40, -3, 0, 0],
    [2.4, 120, -280, 50, -3, 0, 0], [3.4, 236, -330, 60, -2, 0, 0], [8.4, 236, -330, 110, -2, 0, 0],
    [9.4, 20, -520, 0, -1, -3, 30], [13.2, 10, -560, 40, -1, -3, 30], [15.8, 30, -600, 80, -1, 0, 0],
    [T_BACK, 230, 1250, 380, -3, 180, -40], [26.2, 230, 1250, 400, -3, 180, -40]];
  var camA = function (t) {
    var j = 0; while (j < KA.length - 2 && t >= KA[j + 1][0]) j++;
    var a = KA[j], b = KA[j + 1], u = (t >= T_BACK && a[0] < T_BACK) ? 1 : ss((t - a[0]) / Math.max(0.001, b[0] - a[0]));
    if (t >= T_BACK && j < KA.length - 2) u = 1;
    var L = function (k) { return a[k] + (b[k] - a[k]) * u; };
    var day = 1 + 0.0025 * ((t * 30) % 90) / 30; // không có khung đứng yên (đẩy chậm trong khung giữ)
    gsap.set(RA.cam, { z: L(3) + day * 6, rotationX: L(4) });
    gsap.set(RA.camY, { rotationY: L(5) });
    gsap.set(RA.camT, { x: -L(6), y: -L(1), z: -(zXe(t) + L(2)) });
    gsap.set(xeA, { z: zXe(t) });
  };
  api.moiKhung(camA);
  // đèn chuyển xanh, xe lao vào miệng hầm
  var dDo = den.svg.querySelector(".den-do"), dXanh = den.svg.querySelector(".den-xanh");
  var tGreen = tu.green || 1.35;
  tl.set(dDo, { opacity: 0.15 }, tGreen - 0.05); tl.set(dXanh, { opacity: 1 }, tGreen - 0.05);
  api.sfx("may-no", tGreen + 0.1, 0.55);
  api.sfx("whoosh", 2.0, 0.3);

  // ================================================================ SÂN KHẤU C: cận ngang qua kính trong hầm
  var Cs = api.sanKhau(), tC = Cs.the, RC = Cs.rig;
  var vachC = api.plane(tC, { x: 0, y: -100, z: -260 }, 5000, 1400, VACH.replace("background-size:100% 100%, 600px 700px, 700px 700px, 100% 100%;", "background-size:250px 100%, 600px 700px, 700px 700px, 100% 100%;"));
  var denC = api.plane(tC, { x: 0, y: -560, z: -250 }, 5000, 30, DEN);
  api.floorPlane(tC, 0, 300, 900, 5000, 2600, "background:linear-gradient(#4f5456, #7b8183 8%, #2b2f31 8% 8.3%, #b9c0c2 8.3% 8.6%, #2b2f31 8.6% 8.9%, #868c8e 8.9%);");
  var XE = api.xeHopSVG({ mui: "vai", mau: api.XE_DO });
  var xeG = api.P(tC, { x: 0, y: 300, z: 0, scale: 1.5 });
  api.cut(xeG, 520, 250, XE.sau, { pos: { z: -3 } });
  var wC = api.makeWob(xeG, { x: 62, y: -36, z: -1.5, s: 0.36, f: api.F.WOB_LANH, trangPhuc: TP });
  var xeTruoc = api.cut(xeG, 520, 250, XE.truoc, { pos: { z: 0 }, f: api.F.LANH });
  gsap.set(wC.beanie, { rotation: -9, svgOrigin: "200 90" });
  gsap.set([wC.legL, wC.legR, wC.pack, wC.strap], { opacity: 0 }); api.baLoOliu(wC); // ba lô để ghế sau khi lái
  var banhC = [xeTruoc.svg.querySelector(".banh-1"), xeTruoc.svg.querySelector(".banh-2")];
  api.moiKhung(function (t) {
    gsap.set(vachC.face, { backgroundPosition: (-t * 700).toFixed(1) + "px 0, 0 0, 0 0, 0 0" });
    gsap.set(denC.face, { backgroundPosition: (-t * 700).toFixed(1) + "px 0" });
    banhC.forEach(function (b) { gsap.set(b, { rotation: t * 720, transformOrigin: "50% 50%" }); });
    gsap.set(xeG, { y: 300 + Math.sin(t * 23) * 1.2 });
  });
  // hai tay bám vô lăng (phía trước), má phồng dần
  api.armSet(wC, "R", -62); api.armSet(wC, "L", -20);
  api.quaySet(wC, 0.55);
  api.lidsSet(wC, 0);
  gsap.set([wC.pupL, wC.pupR], { x: 10, y: -2, scale: 1.1 });
  var tBr = tu.breathe || 18.03;
  api.mouth(wC, T_C, "N");
  tl.fromTo(wC.cheeks, { scale: 1 }, { scale: 2.0, transformOrigin: "50% 60%", duration: tBr - T_C + 0.6, ease: "power1.in", immediateRender: false }, T_C + 0.2);
  tl.to(wC.cheeks, { opacity: 1, duration: 0.01 }, T_C);
  tl.fromTo(wC.talk, { scaleX: 1 }, { scaleX: 1.05, svgOrigin: "200 290", duration: tBr - T_C + 0.6, ease: "power1.in", immediateRender: false }, T_C + 0.2);
  api.mouth(wC, tBr - 0.05, "K");
  api.shiver(wC, tBr, tBr + 0.5, 1.6);
  api.look(wC, 19.5, 12, -2, 0.12, 1.2);
  api.look(wC, 20.1, -4, -2, 0.12, 1.2); // liếc hai vách đá
  api.look(wC, 20.6, 12, -2, 0.12, 1.2);
  api.look(wC, (tu.rails || 21.05) - 0.05, 6, 12, 0.15, 1.2);
  var mC = api.wobTheGioi({ x: 62 * 1.5, y: 300 - 36 * 1.5, z: 0, s: 0.36 * 1.5 }, 200, 150);
  api.camSet(RC, null, { cx: mC.x - 20, cy: mC.y + 40, cz: 0, k: 720, rx: -2, ry: 0 });
  api.camTo(RC, T_C, 3.6, { k: 770 }, "sine.inOut");
  api.camTo(RC, 19.55, 1.3, { cx: 60, cy: 120, k: 420, rx: -4 }, "power2.inOut");                    // đá hai bên
  api.camTo(RC, 20.85, 0.7, { cx: -260 + 118 * 1.5 - 260 * 0.5 + 60, cy: 300 - 40, k: 620, rx: -8 }, "power2.inOut"); // bánh xe trên ray
  api.camTo(RC, 21.55, 0.9, { k: 650 }, "sine.inOut");

  // ================================================================ SÂN KHẤU B: vịnh xám sau hầm
  var B = api.sanKhau(), tB = B.the, RB = B.rig;
  api.plane(tB, { x: 0, y: -1600, z: -4200 }, 16000, 4600, "background:linear-gradient(#9aa8ae, #c4cdd0 60%, #d8dee0);");
  [[-2600, 2600, 1300, "#8c9da3", 31], [-200, 3000, 1500, "#7f939a", 32], [2600, 2600, 1250, "#93a3a8", 33]].forEach(function (n) {
    api.cut(tB, n[1] * 1.4, n[2] * 1.4, api.nuiGiaySVG(n[1] * 1.4, n[2] * 1.4, { mau: n[3], seed: n[4] }), { pos: { x: n[0] * 1.4, y: 300, z: -3800 }, f: api.F.XA });
  });
  api.floorPlane(tB, 0, 300, -1900, 16000, 4400, "background:repeating-linear-gradient(0deg, rgba(255,255,255,.10) 0 6px, rgba(0,0,0,0) 6px 90px), linear-gradient(#8e9ea3, #6f8288);");
  // vách núi dựng đứng có thác (lớp giữa)
  var vachSVG = function (w, h, seed, mau, thac) {
    var P = [[0, 0.25], [0.12, 0.05], [0.25, 0.3], [0.36, 0.12], [0.5, 0.42], [0.62, 0.02], [0.78, 0.28], [0.9, 0.08], [1, 0.2]];
    var d = "M 0 " + h; P.forEach(function (q) { d += " L " + (q[0] * w).toFixed(0) + " " + (q[1] * h).toFixed(0); }); d += " L " + w + " " + h + " Z";
    var s = fp(d, mau || "#5f6f6c", 6);
    P.forEach(function (q, k) { if (k % 2 && k < P.length - 1) s += sk("M " + (q[0] * w).toFixed(0) + " " + (q[1] * h).toFixed(0) + " L " + ((q[0] + 0.03) * w).toFixed(0) + " " + h, 4, INK, ' opacity=".28"'); });
    s += '<g class="thac">';
    (thac || []).forEach(function (q, k) {
      var u = q[0], y0 = q[1] * h + 10;
      s += fp("M " + (w * u - 24) + " " + y0 + " C " + (w * u - 40) + " " + h * 0.6 + " " + (w * u - 60) + " " + h * 0.85 + " " + (w * u - 100) + " " + h + " L " + (w * u + 100) + " " + h + " C " + (w * u + 60) + " " + h * 0.85 + " " + (w * u + 40) + " " + h * 0.6 + " " + (w * u + 24) + " " + y0 + " Z", "#e9f3f6", 5);
      for (var j = 0; j < 5; j++) s += '<path class="vet-' + k + '" d="M ' + (w * u - 16 + j * 8) + " " + (y0 + 10) + " L " + (w * u - 60 + j * 30) + " " + h * 0.98 + '" stroke="#9cc5d4" stroke-width="5" stroke-dasharray="26 34" fill="none"/>';
    });
    return s + "</g>";
  };
  api.cut(tB, 2600, 1700, vachSVG(2600, 1700, 7, "#6d7d78", []), { pos: { x: -2300, y: 320, z: -1300 }, f: api.F.LANH });
  var vachB = api.cut(tB, 4000, 2000, vachSVG(4000, 2000, 4, "#5a6a66", [[0.36, 0.12], [0.62, 0.02]]), { pos: { x: 600, y: 320, z: -2000 }, f: api.F.LANH });
  var vetThac = vachB.svg.querySelectorAll(".thac path[class]");
  // mây thấp lơ lửng
  var may = function (w, seed) {
    var r = api.rng(seed), n = 5, st = w / n, d = "M 4 110";
    for (var k = 0; k < n; k++) { var rr = st * (0.55 + r() * 0.25); d += " A " + rr.toFixed(0) + " " + (rr * 0.8).toFixed(0) + " 0 0 1 " + (st * (k + 1)).toFixed(0) + " " + (k === n - 1 ? 110 : 90 + r() * 16).toFixed(0); }
    d += " C " + (w * 0.7) + " 136 " + (w * 0.3) + " 136 4 110 Z";
    return fp(d, "#eef2f3", 4);
  };
  [[-1600, -900, -1800, 1400, 3], [900, -1100, -1750, 1800, 6], [2700, -800, -1850, 1300, 9]].forEach(function (m) { api.cut(tB, m[3], 140, may(m[3], m[4]), { pos: { x: m[0], y: m[1], z: m[2] }, f: api.F.XA }); });
  // bờ + đường ven vịnh
  api.floorPlane(tB, 0, 300, 260, 12000, 360, "background:linear-gradient(#5d5f5c, #6f716d 50%, #c4c7c2 50% 52%, #6f716d 52%);border-top:6px solid " + INK + ";");
  var xeGB = api.P(tB, { x: -300, y: 300, z: 260, scale: 1.0 });
  api.cut(xeGB, 520, 250, XE.sau, { pos: { z: -3 } });
  var wB = api.makeWob(xeGB, { x: 62, y: -36, z: -1.5, s: 0.36, f: api.F.WOB_LANH, trangPhuc: TP });
  var xeTB = api.cut(xeGB, 520, 250, XE.truoc, { pos: { z: 0 }, f: api.F.LANH });
  gsap.set(wB.beanie, { rotation: -9, svgOrigin: "200 90" });
  gsap.set([wB.legL, wB.legR, wB.pack, wB.strap], { opacity: 0 }); api.baLoOliu(wB);
  api.armSet(wB, "R", -62); api.armSet(wB, "L", -20);
  api.quaySet(wB, 0.55);
  var kinhMo = xeTB.svg.querySelector(".kinh-mo");
  var banhB = [xeTB.svg.querySelector(".banh-1"), xeTB.svg.querySelector(".banh-2")];
  // xe chạy chậm ven vịnh
  api.moiKhung(function (t) {
    var u = Math.max(0, t - T_B);
    gsap.set(xeGB, { x: -300 + u * 90 });
    banhB.forEach(function (b) { gsap.set(b, { rotation: u * 140, transformOrigin: "50% 50%" }); });
    vetThac.forEach(function (p, k) { p.setAttribute("stroke-dashoffset", (-t * 160 - k * 9).toFixed(1)); });
  });
  // thở ra mờ kính
  var tFar = tu.far || 26.54;
  api.mouth(wB, tFar - 0.1, "O");
  api.mouth(wB, tFar + 0.5, "X");
  tl.fromTo(kinhMo, { opacity: 0 }, { opacity: 0.6, duration: 0.35, ease: "power2.out", immediateRender: false }, tFar);
  tl.to(kinhMo, { opacity: 0.25, duration: 1.4, ease: "sine.inOut" }, tFar + 0.9);
  api.sfx("hoi-nuoc", tFar, 0.45);
  api.lids(wB, tFar + 0.7, 0.5, 0.2);
  // mây đậu xuống nóc xe ngay trên đầu Wob (mũ), Wob không biết
  var tWorn = tu.worn || 29.38;
  var mu = api.cut(xeGB, 200, 140, may(200, 21).replace(/#eef2f3/, "#f4f6f7"), { pos: { x: 40, y: -176, z: 1 }, f: api.F.LANH_NHO });
  tl.fromTo(mu, { y: -900, opacity: 1 }, { y: -176, duration: 1.1, ease: "power2.out", immediateRender: false }, tWorn - 1.15);
  gsap.set(mu, { opacity: 0 });
  tl.set(mu, { opacity: 1 }, tWorn - 1.15);
  tl.to(mu, { scaleY: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, tWorn - 0.05);
  api.look(wB, tWorn - 0.4, 12, 0, 0.2);
  api.blink(wB, tWorn + 0.4, 0.5);
  // camera B
  var xB = function (t) { return -300 + Math.max(0, t - T_B) * 90; };
  var mB = function (t) { return { x: xB(t) + 62, y: 300 - 36 - 236 * 0.36 }; };
  var m0 = mB(T_B + 0.4);
  api.camSet(RB, null, { cx: m0.x + 20, cy: m0.y, cz: 260, k: 760, rx: -2, ry: 0 });
  api.camTo(RB, T_B, 0.8, { k: 790 }, "sine.inOut");
  api.camTo(RB, 27.2, 1.4, { cx: xB(28.6) + 300, cy: -130, cz: -700, k: -1100, rx: -5, ry: 0 }, "power2.inOut"); // lùi ra toàn cảnh
  var m2 = mB(29.4);
  api.camTo(RB, 28.6, 0.6, { cx: m2.x + 30, cy: m2.y - 70, cz: 260, k: 470, rx: -3 }, "power2.inOut");    // mây làm mũ
  api.camTo(RB, 29.2, 1.0, { k: 500 }, "sine.inOut");
  api.camTo(RB, 30.2, 1.0, { cx: 200, cy: 200, cz: -1500, k: -300, rx: -6, ry: 8 }, "power2.inOut");       // nước xám
  api.camTo(RB, 31.2, 1.0, { cx: 600, cy: -300, cz: -2000, k: -1500, rx: -2, ry: 2 }, "power2.inOut");        // thác
  api.camTo(RB, 32.2, 1.1, { cx: 1400, cy: -500, cz: -2000, k: -700, rx: 9, ry: -5 }, "power2.inOut");       // vách đứng
  api.camTo(RB, 33.3, DUR - 33.3, { cy: -560, k: -620 }, "sine.inOut");

  // ================================================================ bật/tắt sân khấu, ánh xám ra hầm
  gsap.set([Cs.stage, B.stage], { visibility: "hidden" });
  api.hien(A.stage, T_C, false); api.hien(Cs.stage, T_C, true);
  api.hien(Cs.stage, T_BACK, false); api.hien(A.stage, T_BACK, true);
  api.hien(A.stage, T_B, false); api.hien(B.stage, T_B, true);
  var sang = api.div("dio-ovl", api.root, "z-index:40;background:#e9eef0;");
  gsap.set(sang, { opacity: 0 });
  tl.fromTo(sang, { opacity: 0.9 }, { opacity: 0, duration: 0.45, ease: "power2.out", immediateRender: false }, T_B);
  api.vignette(A.stage, "lanh"); api.vignette(B.stage, "lanh");
  api.blinks(wC, T_C + 0.5, 19.4); api.blinks(wB, T_B + 1.2, DUR - 0.3);
};
