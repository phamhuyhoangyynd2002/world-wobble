/* Đoạn d25 (diorama, hồi ức, 13,6 s): vịnh mùa hè "đến nơi", vẽ bằng thư viện (không dùng ảnh AI).
 * Camera ra khỏi miệng hầm, lùi ra toàn cảnh: các lớp núi xanh, thác lớn, sông băng trắng xanh ở xa. "Cruise ships…":
 * camera lướt từ tàu du lịch giấy ở bến ra chiếc thuyền nhỏ đi về phía sông băng; biển gỗ chỉ đường Prince William Sound.
 * "People go fishing…": nền: người que (dạng chung) giơ cần, cá bơn dẹt và cá hồi đung đưa; tiền cảnh: Wob (mũ lưỡi trai
 * xanh băng, ba lô) giật cần, câu lên nắp chai kim cương, giơ soi, giữ 0,8 s ("ka-ching"); xe mui trần mở mui đỗ ở bến.
 * "or paddle kayaks…": camera lướt sang con rối Wob (áo phao nhỏ) trên kayak chèo mải miết, thuyền xoay một vòng tại chỗ;
 * hải âu giấy đậu mũi thuyền nhìn Wob, giữ 0,6 s. Ra `cat` (giữ hình tới khung cuối).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK, DUR = api.DUR;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // Prince William Sound
  var XANH = ["#4f8a5e", "#5f9a6a", "#73a874", "#3f7552"];

  // ---------------------------------------------------------------- thế giới: vịnh hẹp mùa hè (nước y = 300)
  var S = api.sanKhau(), the = S.the, R = S.rig, WY = 300;
  api.plane(the, { x: 0, y: -1700, z: -4200 }, 16000, 4600, "background:linear-gradient(#6fb3d9, #a9d6ea 55%, #dceff5);");
  api.cut(the, 1800, 900, api.songBangSVG(1800, 900), { pos: { x: 500, y: WY, z: -3600 }, f: api.F.XA });
  var nuiXanh = function (w, h, mau, seed) {
    var s = api.nuiGiaySVG(w, h, { mau: mau, seed: seed, tuyet: false });
    return s + sk("M " + w * 0.2 + " " + h * 0.6 + " q 30 -20 60 0 M " + w * 0.6 + " " + h * 0.5 + " q 30 -20 60 0", 4, "#2f5f42", ' opacity=".5"');
  };
  [[-2600, -3200, 2600, 1500, XANH[1], 41], [2900, -3200, 2600, 1600, XANH[1], 42], [-1900, -2300, 2200, 1350, XANH[0], 43], [2300, -2400, 2200, 1300, XANH[2], 44]].forEach(function (n) {
    api.cut(the, n[2], n[3], nuiXanh(n[2], n[3], n[4], n[5]), { pos: { x: n[0], y: WY, z: n[1] }, f: api.F.XA });
  });
  // vách xanh có thác lớn (lớp giữa, bên trái)
  var vachThac = function (w, h) {
    var s = fp("M 0 " + h + " L 0 " + h * 0.2 + " L " + w * 0.25 + " " + h * 0.04 + " L " + w * 0.5 + " " + h * 0.18 + " L " + w * 0.78 + " 0 L " + w + " " + h * 0.22 + " L " + w + " " + h + " Z", XANH[3], 6);
    s += fp("M " + (w * 0.5 - 40) + " " + h * 0.18 + " C " + (w * 0.5 - 60) + " " + h * 0.6 + " " + (w * 0.5 - 90) + " " + h * 0.85 + " " + (w * 0.5 - 140) + " " + h + " L " + (w * 0.5 + 140) + " " + h + " C " + (w * 0.5 + 90) + " " + h * 0.85 + " " + (w * 0.5 + 60) + " " + h * 0.6 + " " + (w * 0.5 + 40) + " " + h * 0.18 + " Z", "#eef7fa", 5);
    for (var j = 0; j < 6; j++) s += '<path class="vt" d="M ' + (w * 0.5 - 30 + j * 12) + " " + (h * 0.2) + " L " + (w * 0.5 - 90 + j * 36) + " " + (h * 0.98) + '" stroke="#9cc5d4" stroke-width="6" stroke-dasharray="30 36" fill="none"/>';
    return s;
  };
  var thac = api.cut(the, 2200, 1700, vachThac(2200, 1700), { pos: { x: -2100, y: WY + 10, z: -1700 }, f: api.F.LANH });
  var vt = thac.svg.querySelectorAll(".vt");
  api.floorPlane(the, 0, WY, -1900, 16000, 4400, "background:repeating-linear-gradient(0deg, rgba(255,255,255,.16) 0 5px, rgba(0,0,0,0) 5px 80px), linear-gradient(#4f8fa0, #5fa3b2);");
  // tàu du lịch ở bến, thuyền nhỏ ra sông băng
  api.cut(the, 1000, 460, api.tauDuLichSVG(1000, 460), { pos: { x: -500, y: WY + 40, z: -950 }, f: api.F.LANH });
  var thuyen = api.cut(the, 220, 120, api.thuyenNhoSVG(220, 120), { pos: { x: 300, y: WY + 16, z: -900 }, f: api.F.LANH_NHO });
  // bến gỗ phía trước
  api.floorPlane(the, 0, WY - 30, 260, 5200, 420, "background:repeating-linear-gradient(90deg, rgba(0,0,0,.25) 0 4px, rgba(0,0,0,0) 4px 70px), linear-gradient(#a8784e, #8f6440);");
  api.plane(the, { x: 0, y: WY - 6, z: 470 }, 5200, 48, "background:#6b4a33;border-top:5px solid " + INK + ";");
  for (var xc = -2400; xc <= 2400; xc += 400) api.cut(the, 40, 80, fp("M 4 0 L 36 0 L 36 80 L 4 80 Z", "#5a3c28", 4), { pos: { x: xc, y: WY + 50, z: 470 }, f: api.F.AM_NHO });
  // biển gỗ chỉ đường ra vịnh (chữ duy nhất của đoạn)
  var BW = 600, BH = 300;
  api.cut(the, BW, BH, sk("M " + BW / 2 + " " + BH + " L " + BW / 2 + " 110", 16, "#6b4a33") +
    fp("M 10 20 L " + (BW - 70) + " 20 L " + (BW - 10) + " 66 L " + (BW - 70) + " 112 L 10 112 Z", "#e8d3a6", 7) + api.txt((BW - 60) / 2 + 6, 84, 50, 800, chu[0], INK),
    { pos: { x: 1150, y: WY - 30, z: 160 }, f: api.F.AM_NHO });
  // xe mui trần mở mui đỗ ở bến
  var XE = api.xeHopSVG({ mui: "mo", mau: api.XE_DO });
  api.cut(the, 520, 250, XE.sau + XE.truoc, { pos: { x: -760, y: WY - 30, z: 200, scale: 0.8 }, f: api.F.AM_NHO });
  // người que câu cá trên bến xa (nền), cá bơn + cá hồi đung đưa
  var ngNen = "";
  [[60, C.TERRA], [250, C.TEAL], [430, "#7d6a4b"]].forEach(function (p, i) {
    ngNen += api.nguoiGiaySVG(p[0], 240, 2.2, p[1]) + '<g class="can-' + i + '"><g transform="translate(' + (p[0] + 14) + ' 190)">' + sk("M 0 0 L 90 -120", 6, "#6b4a33") + sk("M 90 -120 L 90 -20", 2.5) +
      '<g class="ca-' + i + '"><g transform="translate(90 6) rotate(90)">' + (i === 1 ? api.caBonSVG(0.7) : api.caHoiSVG(0.7)) + "</g></g></g></g>";
  });
  var benXa = api.cut(the, 600, 260, fp("M 0 240 L 600 240 L 600 260 L 0 260 Z", "#8f6440", 4) + ngNen, { pos: { x: 1250, y: WY - 10, z: -380 }, f: api.F.AM_NHO });
  var caNen = [0, 1, 2].map(function (i) { return benXa.svg.querySelector(".ca-" + i); });

  // ---------------------------------------------------------------- Wob trên bến: mũ lưỡi trai xanh băng, ba lô, cần câu
  var w = api.makeWob(the, { x: 300, y: WY - 30, z: 230, s: 0.62, f: api.F.WOB_AM });
  api.doThem(w, { muLuoi: true }); api.baLoOliu(w);
  api.matKhongRong(w);
  w.holdR.insertAdjacentHTML("beforeend", '<g class="can"><g transform="rotate(-20)">' + api.canCauSVG(300) + "</g></g>");
  var can = w.holdR.querySelector(".can"), day = can.querySelector(".day-cau");
  w.holdL.insertAdjacentHTML("beforeend", '<g class="nap"><g transform="scale(1.6)">' + api.napChaiSVG({ kimCuong: true }) + "</g></g>");
  var nap = w.holdL.querySelector(".nap"), napLoe = nap.querySelector(".nap-loe");
  gsap.set(nap, { opacity: 0 });
  api.armSet(w, "R", -20);
  gsap.set(can, api.holdPose("R", -20, 320, 300, 0));
  api.quaySet(w, 0.4);
  // dây câu thả xuống nước (dài), giật lên
  var tFish = tu.fishing || 9.65, tHal = tu.halibut || 10.25;
  gsap.set(day, { attr: { d: "M 150 -258 L 150 120" } });
  api.look(w, 9.0, 10, 10, 0.2);
  api.armTo(w, "R", tFish - 0.1, 0.18, -70, "back.out(2)");
  tl.to(can, Object.assign(api.holdPose("R", -70, 300, 260, -20), { duration: 0.18, ease: "back.out(2)" }), tFish - 0.1);
  tl.to(day, { attr: { d: "M 150 -258 L 150 -150" }, duration: 0.25, ease: "power2.out" }, tFish - 0.05);
  api.hop(w, tFish - 0.05, 10, 0.3);
  // nắp chai kim cương lên tay trái, giơ soi, giữ 0,8 s
  var tNap = tFish + 0.35;
  api.armTo(w, "L", tNap - 0.15, 0.3, 140, "back.out(1.6)");
  var hN = api.handWorld("L", 140);
  tl.set(nap, Object.assign({ opacity: 1 }, api.holdPose("L", 140, hN[0] + 4, hN[1] - 30, 0)), tNap);
  tl.fromTo(napLoe, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1.2, duration: 0.2, ease: "back.out(3)", immediateRender: false }, tNap + 0.1);
  tl.to(napLoe, { opacity: 0, scale: 0.6, duration: 0.25 }, tNap + 0.9);
  api.sfx("ka-ching", tNap + 0.08, 0.6);
  api.quay(w, tNap - 0.1, -0.3, 0.2);
  api.look(w, tNap + 0.05, -10, -12, 0.15, 1.2);
  api.lids(w, tNap + 0.5, 0.35, 0.2);
  api.nghieng(w, tNap + 0.2, -6, 0.3);

  // ---------------------------------------------------------------- kayak (con rối Wob thứ hai: áo phao, mũ lưỡi trai)
  var KX = -1300, KZ = -120;
  var kay = api.P(the, { x: KX, y: WY + 6, z: KZ });
  var lat = api.P(kay, {});
  var w2 = api.makeWob(lat, { x: 0, y: 34, z: -1, s: 0.5, f: api.F.WOB_LANH });
  api.doThem(w2, { muLuoi: true, aoPhao: true }); api.baLoOliu(w2);
  gsap.set([w2.legL, w2.legR], { opacity: 0 });
  api.cut(lat, 360, 60, '<g transform="translate(180 30)">' + api.kayakSVG(340) + "</g>", { pos: { z: 0 }, ay: 30, f: api.F.LANH_NHO });
  w2.holdR.insertAdjacentHTML("beforeend", '<g class="cheo"><g transform="scale(.9)">' + api.maiCheoSVG(320) + "</g></g>");
  var cheo = w2.holdR.querySelector(".cheo");
  api.armSet(w2, "R", -30); api.armSet(w2, "L", 30);
  // chèo mải miết: tay + mái chèo lắc qua lại theo khung
  var tPad = tu.paddle || 11.79;
  api.moiKhung(function (t) {
    var a = Math.sin(t * 9), b = Math.cos(t * 9);
    gsap.set(w2.armR, { rotation: -40 + 25 * a, svgOrigin: "314 212" });
    gsap.set(w2.armL, { rotation: 40 + 25 * a, svgOrigin: "86 212" });
    var hR = api.handWorld("R", -40 + 25 * a);
    gsap.set(cheo, api.holdPose("R", -40 + 25 * a, 200, hR[1] + 10, 28 * a));
    gsap.set(kay, { y: WY + 6 + 3 * b });
  });
  // thuyền xoay một vòng tại chỗ (lật hướng bằng scaleX, Wob quay mặt theo)
  var tXoay = tPad + 0.25;
  tl.to(lat, { rotationZ: 6, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, tXoay);
  tl.set(lat, { scaleX: -1 }, tXoay + 0.18); tl.set(lat, { scaleX: 1 }, tXoay + 0.58); // quay đầu tức thì (không lộ tấm mỏng)
  api.quay(w2, tXoay, -0.5, 0.35); api.quay(w2, tXoay + 0.4, 0.5, 0.35);
  api.look(w2, tXoay + 0.8, 8, 0, 0.15);
  // hải âu đậu mũi thuyền, nhìn Wob, giữ 0,6 s
  var tAu = (tu.kayaks || 12.16) + 0.45;
  var au = api.cut(kay, 120, 90, '<g transform="translate(60 86) scale(-1 1)">' + api.haiAuSVG(1) + "</g>", { pos: { x: 150, y: -14, z: 2 }, ay: 86, f: api.F.LANH_NHO });
  tl.fromTo(au, { x: 520, y: -460, opacity: 1 }, { x: 150, y: -14, duration: 0.45, ease: "power2.out", immediateRender: false }, tAu - 0.45);
  gsap.set(au, { opacity: 0 }); tl.set(au, { opacity: 1 }, tAu - 0.45);
  tl.to(au, { scaleY: 0.85, duration: 0.07, yoyo: true, repeat: 1 }, tAu);
  api.look(w2, tAu + 0.05, 12, -4, 0.15, 1.15);
  api.lids(w2, tAu + 0.35, 0.45, 0.15);
  api.sfx("pop", tAu, 0.2);

  // ---------------------------------------------------------------- chuyển động liền: thác, cá đung đưa, thuyền nhỏ
  api.moiKhung(function (t) {
    vt.forEach(function (p, k) { p.setAttribute("stroke-dashoffset", (-t * 200 - k * 11).toFixed(1)); });
    caNen.forEach(function (c, i) { gsap.set(c, { rotation: 12 * Math.sin(t * 2.4 + i), svgOrigin: "90 0" }); });
    var u = Math.max(0, Math.min(1, (t - 5.0) / 6));
    gsap.set(thuyen, { x: 300 + 500 * u, z: -900 - 1700 * u });
  });
  // miệng hầm phía trước camera lúc đầu (đi ra khỏi hầm)
  var HO = "M 0 0 L 4000 0 L 4000 2400 L 0 2400 Z M 1640 2400 L 1640 1500 Q 1640 1300 2000 1290 Q 2360 1300 2360 1500 L 2360 2400 Z";
  var hamMieng = api.cut(the, 4000, 2400, '<path d="' + HO + '" fill="#3d4a42" fill-rule="evenodd" stroke="' + INK + '" stroke-width="10"/>', { pos: { x: 0, y: WY + 400, z: 900 }, f: api.F.LANH });

  tl.set(hamMieng, { visibility: "hidden" }, 1.45);

  // ---------------------------------------------------------------- camera
  var matW = api.wobTheGioi(w, 200, 200);
  api.camSet(R, null, { cx: 0, cy: 60, cz: 700, k: 280, rx: -2, ry: 0 });               // trong hầm nhìn ra
  api.camTo(R, 0.1, 2.6, { cx: -300, cy: -260, cz: -900, k: -500, rx: -6, ry: 0 }, "power2.inOut"); // ra khỏi hầm, lùi ra toàn cảnh
  api.camTo(R, 2.7, 1.5, { k: -440 }, "sine.inOut");
  api.camTo(R, 4.2, 1.2, { cx: -500, cy: 0, cz: -950, k: 0, rx: -3, ry: 3 }, "power2.inOut");   // tàu du lịch
  api.camTo(R, 5.4, 1.2, { cx: 500, cy: 40, cz: -400, k: -80, rx: -4, ry: -2 }, "power2.inOut"); // thuyền nhỏ → biển chỉ đường
  api.camTo(R, 6.6, 0.8, { cx: 1120, cy: 120, cz: 160, k: 380, rx: -2, ry: 0 }, "power2.inOut");  // Prince William Sound
  api.camTo(R, 7.4, 1.0, { k: 400 }, "sine.inOut");
  api.camTo(R, 8.4, 0.8, { cx: 900, cy: -40, cz: -900, k: -300, rx: -4 }, "power2.inOut");       // thuyền về phía sông băng
  api.camTo(R, 9.2, 0.45, { cx: matW.x - 20, cy: matW.y - 30, cz: w.z, k: 640, rx: -3, ry: 0 }, "power2.inOut"); // Wob câu
  api.camTo(R, 9.65, 1.6, { k: 620 }, "sine.inOut");
  var kayW = { x: KX + 20, y: WY - 90, z: KZ };
  api.camTo(R, 11.3, 0.45, { cx: kayW.x, cy: kayW.y + 20, cz: kayW.z, k: 800, rx: -1, ry: 0 }, "power3.inOut"); // lia sang kayak (ngang mặt nước)
  api.camTo(R, 11.75, DUR - 11.75, { k: 840 }, "sine.inOut");
  api.blinks(w, 0.5, 9.4); api.blinks(w2, 11.8, 12.5);
  api.vignette(S.stage, "am");
};
