/* Đoạn d02 (diorama, hồi ức, 11,16 s): sổ du lịch pop-up mở trên nắp capo phủ tuyết.
 * Bìa lật, núi giấy bật dựng che phía trước; camera bay qua đỉnh núi thấy thẻ bản đồ (map-whittier, vẽ bằng code),
 * ghim Whittier nảy đúng "Whittier", nhãn ALASKA đúng "Alaska". Gag: nắp tuyết trên đỉnh núi rơi xuống giữa khung,
 * úp lên đầu hình Wob giấy nhỏ, giữ 0,6 s. Vịnh xám dài kéo ra trên trang đúng "inlet". "Most of the people…":
 * toà kem 14 tầng bật dựng, cửa xoay quay đều, người que dạng chung đi vào bình thường. "One building, fourteen floors":
 * Sửa sau kiểm định (24/11): SVG bản đồ bản không chấm marks (ghim động thay), nhãn WHITTIER dời trái, toà dời phải,
 * camera cảnh vịnh dời phải để núi không che ALASKA.
 * Wob giấy ngửa cổ đếm tầng (cửa sổ sáng dần từng tầng), đếm tới 14 thì thân dài ra theo toà, giữ 0,8 s. Ra `cat`.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // WHITTIER, ALASKA, 14
  var vien = ' paint-order="stroke" stroke="' + C.PAPER + '" stroke-width="10"';

  // ---------------------------------------------------------------- sân khấu: nắp capo phủ tuyết, trời chiều đông
  var S = api.sanKhau(), the = S.the, R = S.rig, TY = 260;
  api.plane(the, { x: 0, y: -700, z: -1900 }, 7000, 2600, "background:linear-gradient(#7d97a6 0%, #b9cbd3 55%, #dfe7ea 100%);");
  // núi xa (ngoài sổ) mờ sương
  [[-1500, -2.4, 1500, 700, "#9fb3bc", 3], [-200, -2.0, 1700, 820, "#8ea6b0", 8], [1300, -2.2, 1500, 640, "#a8bbc3", 11]].forEach(function (n) {
    api.cut(the, n[2], n[3], api.nuiGiaySVG(n[2], n[3], { mau: n[4], seed: n[5], tuyet: true }), { pos: { x: n[0], y: TY + 120, z: -1700 }, f: api.F.XA });
  });
  api.floorPlane(the, 0, TY + 4, -900, 6000, 2400, "background:" + C.SNOW2 + ";");
  // nắp capo: mảng sơn đất nung có tuyết bám mép
  api.floorPlane(the, 0, TY, -250, 1500, 1000, "border-radius:120px 120px 0 0;background:radial-gradient(ellipse 60% 50% at 50% 55%, #e0703a, #b8562b);border:8px solid " + C.INK + ";");
  api.cut(the, 1500, 120, api.fp(api.lumpy(0, 1500, 120, -60, 14, 4) + " L 1500 120 Z", C.SNOW, 6), { pos: { x: 0, y: TY + 2, z: -740 }, f: api.F.LANH });

  // ---------------------------------------------------------------- sổ: thẻ bản đồ (sau), toà 14 tầng (giữa), núi giấy (trước)
  var CW = 520, CH = 400, VB = [1060, 250, 640, 479], kk = (CW - 44) / VB[2];
  var pin = { x: 22 + (1320 - VB[0]) * kk, y: 22 + (560 - VB[1]) * kk };
  var theBD = fp("M 6 6 L " + (CW - 6) + " 6 L " + (CW - 6) + " " + (CH - 6) + " L 6 " + (CH - 6) + " Z", C.PAPER, 7) +
    '<svg x="22" y="22" width="' + (CW - 44) + '" height="' + (CH - 44) + '" viewBox="' + VB.join(" ") + '" preserveAspectRatio="xMidYMid slice"><image href="ban-do/map-whittier-khong-dau.svg" x="0" y="0" width="1920" height="1080"/></svg>' +
    '<rect x="22" y="22" width="' + (CW - 44) + '" height="' + (CH - 44) + '" fill="none" stroke="' + C.INK + '" stroke-width="4"/>' +
    '<g class="nhan-ak">' + api.txt(112, 170, 44, 800, chu[1], C.INK, vien) + "</g>" +
    '<g class="ghim"><g transform="translate(' + pin.x.toFixed(1) + " " + pin.y.toFixed(1) + ')">' + fp("M 0 0 C -14 -22 -22 -34 -22 -46 C -22 -60 -12 -70 0 -70 C 12 -70 22 -60 22 -46 C 22 -34 14 -22 0 0 Z", C.MAT, 5) +
    '<circle cx="0" cy="-46" r="8" fill="' + C.PAPER + '" stroke="' + C.INK + '" stroke-width="3"/></g></g>' +
    '<g class="nhan-wh">' + sk("M " + (pin.x + 6) + " " + (pin.y - 74) + " L " + (pin.x + 60) + " 112", 4) + api.txt(195, 100, 50, 900, chu[0], C.INK, vien) + "</g>";
  var TW = 210, TH = 330;
  var toa = api.toaNha14SVG(TW, TH, { sang: 0.0, seed: 3 });
  var nguoi = "";
  [[-60, C.TEAL], [-120, C.TERRA], [-180, "#7d6a4b"]].forEach(function (p, i) { nguoi += '<g class="ng ng-' + i + '">' + api.nguoiGiaySVG(TW / 2 + p[0], TH - 1, 0.9, p[1]) + "</g>"; });
  var lopToa = api.lopPopup.tuy(toa + nguoi + '<g class="nhan-14">' + fp("M " + (TW + 6) + " 14 L " + (TW + 84) + " 14 L " + (TW + 84) + " 70 L " + (TW + 6) + " 70 Z", C.PAPER, 4) + api.txt(TW + 45, 60, 46, 900, chu[2], C.TERRA) + "</g>",
    TW + 90, TH, { x: 600, banLe: -80 }); // dời phải: không che nhãn WHITTIER
  var NW = 240, NH = 240;
  var lopNui = api.lopPopup.tuy(api.nuiGiaySVG(NW, NH, { mau: "#8aa3ad", seed: 21, dinh: 120 }), NW, NH, { x: 120, banLe: 170 });
  var book = api.soPopup(the, { x: -260, y: TY, z: -300, w: 520, d: 600, lop: [api.lopPopup.tuy(theBD, CW, CH, { x: 260, banLe: -220 }), lopToa, lopNui] });
  var I_BD = 0, I_TOA = 1, I_NUI = 2;
  var q = function (i, c) { return book.lop[i].svg.querySelector(c); };
  gsap.set(q(I_NUI, ".nap-tuyet"), { opacity: 0 }); // nắp tuyết thật là tấm rời bên dưới
  // vịnh xám dài vẽ phẳng trên trang (kéo ra đúng "inlet")
  var vinh = book.veTrang('<g class="vinh">' + fp("M 200 420 C 260 396 330 410 380 392 C 430 376 470 392 500 384 L 502 404 C 470 414 430 400 382 414 C 332 430 262 418 202 440 Z", "#7f939a", 4) +
    sk("M 220 424 C 280 406 340 414 390 400", 3, "#c9d6dc", ' opacity=".8"') + "</g>");
  var vinhG = vinh.svg.querySelector(".vinh");
  gsap.set(vinhG, { scaleX: 0, transformOrigin: "0% 50%" });

  // Wob giấy nhỏ đứng trên trang (đúng tạo hình Wob, tỉ lệ nhỏ), giữa núi và toà
  var mini = api.makeWob(the, { x: 40, y: TY - 3, z: -250, s: 0.32, f: api.F.WOB_LANH, trangPhuc: { mu: true, khan: true, muMau: "#F6EEDC", muVanh: "#e6dcc2", muBong: "#C9463A", muSoc: "#cbbf9f", khanMau: "#F6EEDC" } });
  gsap.set(mini.lift, { scaleY: 0, transformOrigin: "50% 100%" });
  gsap.set(mini.shadow, { opacity: 0 }); api.baLoOliu(mini);
  // nắp tuyết rời (tấm cắt trong thế giới), ẩn tới khi núi đứng
  var dinhNui = book.diemLop(I_NUI, 120, 20);
  var nap = api.cut(the, 80, 50, fp("M 6 44 C 12 6 68 6 74 44 C 54 36 26 36 6 44 Z", C.SNOW, 4), { pos: { x: dinhNui.x, y: dinhNui.y + 22, z: dinhNui.z }, ay: 44, f: api.F.LANH_NHO });
  gsap.set(nap, { opacity: 0 });

  // ---------------------------------------------------------------- mở sổ, núi bật dựng
  book.moBia(0.1, 0.6);
  api.sfx("whoosh", 0.12, 0.35);
  book.batLop(I_BD, 0.55, 0.45);
  book.batLop(I_NUI, 0.62, 0.5);
  api.sfx("pop", 0.72, 0.55);
  tl.set(nap, { opacity: 1 }, 1.0);
  tl.to(mini.lift, { scaleY: 1, duration: 0.35, ease: "back.out(2)" }, 1.05);
  tl.set(mini.shadow, { opacity: 1 }, 1.1);

  // ghim Whittier nảy, nhãn hiện
  var ghim = q(I_BD, ".ghim"), nhanWh = q(I_BD, ".nhan-wh"), nhanAk = q(I_BD, ".nhan-ak");
  gsap.set([nhanWh, nhanAk], { opacity: 0 });
  gsap.set(ghim, { opacity: 0 });
  var tWh = tu.whittier || 1.83, tAk = tu.alaska || 2.69;
  tl.fromTo(ghim, { opacity: 1, y: -60 }, { y: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, tWh - 0.3);
  tl.set(nhanWh, { opacity: 1 }, tWh - 0.02);
  tl.fromTo(nhanAk, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, tAk - 0.1);
  api.sfx("pop", tWh - 0.02, 0.4);

  // gag: nắp tuyết rơi úp đầu Wob giấy (giữa khung), giữ 0,6 s
  var dau = api.wobTheGioi(mini, 200, 58);
  var tRoi = 3.05, tCham = 3.5;
  tl.to(nap, { x: dau.x, z: dau.z + 4, duration: tCham - tRoi, ease: "power1.inOut" }, tRoi);
  tl.to(nap, { y: dau.y + 10, duration: tCham - tRoi, ease: "power2.in" }, tRoi);
  tl.to(nap, { scale: 1.25, duration: tCham - tRoi }, tRoi);
  api.look(mini, tRoi, 0, -12, 0.15, 1.15);
  tl.to(mini.lift, { scaleY: 0.86, scaleX: 1.1, duration: 0.07, ease: "power2.out" }, tCham);
  tl.to(mini.lift, { scaleY: 1, scaleX: 1, duration: 0.3, ease: "back.out(3)" }, tCham + 0.07);
  tl.to(nap, { y: dau.y + 18, duration: 0.07, ease: "power2.out" }, tCham);
  tl.to(nap, { y: dau.y + 10, duration: 0.3, ease: "back.out(3)" }, tCham + 0.07);
  api.sfx("drop", tCham, 0.55);
  api.lids(mini, tCham + 0.12, 0.5, 0.15);
  api.look(mini, tCham + 0.2, 0, 4, 0.2);

  // vịnh dài kéo ra đúng "inlet"
  var tIn = tu.inlet || 5.33;
  tl.to(vinhG, { scaleX: 1, duration: 0.85, ease: "power2.out" }, tIn - 0.8);
  api.sfx("whoosh", tIn - 0.75, 0.25);
  api.quay(mini, tIn - 0.8, 0.6, 0.3);
  api.look(mini, tIn - 0.7, 10, 6, 0.2);

  // toà 14 tầng bật dựng, cửa xoay, người que đi vào
  var tMost = tu.most || 6.29;
  book.batLop(I_TOA, tMost - 0.35, 0.5);
  api.sfx("pop", tMost - 0.2, 0.55);
  var cua0 = q(I_TOA, ".cua-xoay-0"), cua1 = q(I_TOA, ".cua-xoay-1");
  api.moiKhung(function (t) {
    var a = Math.cos(t * 3.2);
    gsap.set(cua0, { scaleX: Math.abs(a), transformOrigin: "100% 50%" });
    gsap.set(cua1, { scaleX: Math.abs(Math.sin(t * 3.2)), transformOrigin: "0% 50%" });
  });
  for (var i = 0; i < 3; i++) {
    var ng = q(I_TOA, ".ng-" + i), t0 = tMost + 0.3 + i * 0.9;
    gsap.set(ng, { opacity: 0 });
    tl.set(ng, { opacity: 1 }, t0);
    tl.to(ng, { x: [60, 120, 180][i], duration: 1.4 + i * 0.3, ease: "none" }, t0);
    tl.to(ng, { y: -2, duration: 0.12, yoyo: true, repeat: 2 * Math.round((1.4 + i * 0.3) / 0.24) - 1, ease: "sine.inOut" }, t0);
    tl.to(ng, { opacity: 0, duration: 0.2 }, t0 + 1.25 + i * 0.3);
  }
  api.quay(mini, tMost, 0.7, 0.3);
  api.look(mini, tMost + 0.1, 12, 2, 0.2);

  // "One building, fourteen floors": đếm tầng, thân dài ra theo toà, giữ 0,8 s
  var tOne = tu.one || 9.07, tFl = tu.floors || 10.29;
  api.look(mini, tOne - 0.15, 10, -14, 0.2);
  api.armTo(mini, "R", tOne - 0.1, 0.25, -130, "power2.out");
  for (var f = 1; f <= 14; f++) {
    var tf = tOne + (tFl - tOne - 0.05) * (f - 1) / 13;
    tl.set(q(I_TOA, ".tang-" + f).querySelectorAll("rect"), { attr: { fill: C.WIN } }, tf);
    tl.to(mini.armR, { rotation: -150 + (f % 2) * 12, svgOrigin: "314 212", duration: 0.07 }, tf);
  }
  var nhan14 = q(I_TOA, ".nhan-14");
  gsap.set(nhan14, { opacity: 0 });
  tl.fromTo(nhan14, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.22, ease: "back.out(2.5)", immediateRender: false }, tFl - 0.08);
  tl.to(mini.lift, { scaleY: 2.0, scaleX: 0.88, duration: 0.55, ease: "back.out(1.4)" }, tFl - 0.15);
  api.sfx("boing", tFl - 0.12, 0.55);
  api.lids(mini, tFl + 0.4, 0.45, 0.15);

  // ---------------------------------------------------------------- camera
  var cNui = book.diemLop(I_NUI, 120, 130), cBD = book.tamLop(I_BD), cToa = book.diemLop(I_TOA, 60, 170);
  api.camSet(R, null, { cx: cNui.x + 20, cy: cNui.y + 30, cz: cNui.z, k: 640, rx: -4, ry: 0 });
  api.camTo(R, 0, 0.9, { k: 680 }, "sine.inOut");
  api.camTo(R, 0.9, 1.0, { cx: cBD.x - 10, cy: cBD.y + 30, cz: cBD.z + 130, k: 300, rx: -26, ry: 4 }, "power2.inOut"); // bay qua đỉnh núi
  api.camTo(R, 1.9, 1.05, { k: 330 }, "sine.inOut");
  api.camTo(R, 2.95, 0.55, { cx: (dau.x + dinhNui.x) / 2 + 30, cy: dau.y + 10, cz: dau.z + 40, k: 520, rx: -22, ry: 0 }, "power2.inOut"); // nắp tuyết giữa khung
  api.camTo(R, 3.5, 0.9, { k: 590 }, "sine.inOut");
  api.camTo(R, 4.4, 0.9, { cx: 150, cy: 170, cz: -260, k: 320, rx: -32, ry: -4 }, "power2.inOut"); // thấy vịnh
  api.camTo(R, 5.3, 0.65, { k: 350 }, "sine.inOut");
  api.camTo(R, 5.95, 0.85, { cx: cToa.x - 70, cy: cToa.y + 40, cz: cToa.z + 60, k: 430, rx: -14, ry: -4 }, "power2.inOut");
  api.camTo(R, 6.8, 2.2, { k: 470 }, "sine.inOut");
  api.camTo(R, 9.0, 1.1, { cx: cToa.x - 120, cy: cToa.y - 10, k: 480, rx: -10 }, "power2.inOut");
  api.camTo(R, 10.1, 1.06, { k: 510 }, "sine.inOut");

  api.breathe(mini, 1.5, 9.0);
  api.blinks(mini, 4.3, 8.8);
};
