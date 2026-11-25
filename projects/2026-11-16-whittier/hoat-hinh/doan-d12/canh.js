/* Đoạn d12 (diorama, hồi ức, 20,02 s): một ngày mùa đông không ra ngoài, trong hành lang Begich Towers (tấm giấy 3D).
 * Camera đi dọc hành lang (vách gạch block sơn nhạt, cột tiền cảnh mờ). Đồng hồ treo tường quay. Wob đồ ngủ kẻ sọc, dép lê,
 * ôm ly: dép trái tuột lại, quay lại xỏ, dép phải tuột (gag luân phiên). "post office… police": camera qua cửa POST OFFICE
 * cạnh lối vào rồi cửa POLICE, mỗi biển trong khung > 1 s, chữ ≥ 40 px; Wob rón rén nép tường. "the clinic… store": qua
 * cửa CLINIC, Wob vào STORE rồi ra ôm túi bánh. "Afternoon": cắt sang thang máy (đồng hồ quay nhanh): cửa mở "ting",
 * giỏ đồ giặt đứng một mình bên trong, Wob ở ngoài; cửa đóng, đèn tầng sáng dần lên, giỏ đi một mình; Wob chạy cầu thang
 * đuổi theo. Ra `chen` (cắt cứng ở khung cuối).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK, DUR = api.DUR;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; }); // 0.037, 5.949, 11.162, 15.087
  var chu = data.chu_tren_do_vat; // POST OFFICE, POLICE, CLINIC, STORE

  // ---------------------------------------------------------------- hành lang (x dọc hành lang, vách sau z = −300, sàn y = 300)
  var S = api.sanKhau(), the = S.the, R = S.rig, FY = 300, WZ = -300;
  api.plane(the, { x: 1800, y: -360, z: WZ - 2 }, 9000, 1400,
    "background:repeating-linear-gradient(0deg, rgba(120,110,90,.22) 0 3px, rgba(0,0,0,0) 3px 48px), repeating-linear-gradient(90deg, rgba(120,110,90,.16) 0 3px, rgba(0,0,0,0) 3px 96px), linear-gradient(#e8e0cc, #ddd3bb);");
  api.plane(the, { x: 1800, y: FY - 18, z: WZ - 1 }, 9000, 36, "background:#8a7b62;border-top:4px solid " + INK + ";");
  api.floorPlane(the, 1800, FY, 0, 9000, 700, "background:repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 3px, rgba(0,0,0,0) 3px 120px), repeating-linear-gradient(0deg, rgba(0,0,0,.08) 0 3px, rgba(0,0,0,0) 3px 120px), linear-gradient(#b9b29e, #cfc8b3);");
  // đèn trần dọc hành lang
  for (var xd = -900; xd < 5000; xd += 520) api.cut(the, 220, 40, fp("M 4 4 L 216 4 L 216 30 L 4 30 Z", "#fff6d8", 4), { pos: { x: xd, y: -300, z: WZ + 40 }, f: "drop-shadow(0 0 14px rgba(255,236,170,.8))" });
  // cửa + biển
  var cuaSVG = function (w, h, mau, kinh) {
    var s = fp("M 4 " + h + " L 4 4 L " + (w - 4) + " 4 L " + (w - 4) + " " + h + " Z", "#9a8a6a", 6) + fp("M 18 " + h + " L 18 18 L " + (w - 18) + " 18 L " + (w - 18) + " " + h + " Z", mau, 5);
    if (kinh) s += fp("M " + w * 0.28 + " 50 L " + w * 0.72 + " 50 L " + w * 0.72 + " " + h * 0.42 + " L " + w * 0.28 + " " + h * 0.42 + " Z", "#bfe3f0", 4);
    return s + '<circle cx="' + (w - 40) + '" cy="' + h * 0.56 + '" r="8" fill="#e7b34b" stroke="' + INK + '" stroke-width="3"/>';
  };
  var bienSVG = function (s, w, mau) { return fp("M 4 4 L " + (w - 4) + " 4 L " + (w - 4) + " 82 L 4 82 Z", mau || "#2f4f6b", 6) + api.txt(w / 2, 62, 54, 800, s, "#f7f2e4"); };
  var CUA_H = 330, CUA_W = 190;
  var cua = function (x, s, mau, bw) {
    api.cut(the, CUA_W, CUA_H, cuaSVG(CUA_W, CUA_H, mau, true), { pos: { x: x, y: FY, z: WZ + 2 }, f: api.F.AM_NHO });
    if (s) api.cut(the, bw, 86, bienSVG(s, bw), { pos: { x: x, y: FY - CUA_H - 20, z: WZ + 4 }, f: api.F.AM_NHO });
  };
  // lối vào (cửa kính đôi, tuyết ngoài kính), bảng tin không chữ, đồng hồ
  api.cut(the, 300, 360, fp("M 4 360 L 4 4 L 296 4 L 296 360 Z", "#7d8f94", 6) + fp("M 20 360 L 20 20 L 146 20 L 146 360 Z M 154 360 L 154 20 L 280 20 L 280 360 Z", "#cfe6ef", 4) +
    fp(api.lumpy(20, 280, 300, -20, 6, 3) + " L 280 340 L 20 340 Z", "#f7fafb", 3), { pos: { x: -620, y: FY, z: WZ + 2 }, f: api.F.AM_NHO });
  api.cut(the, 230, 160, fp("M 4 4 L 226 4 L 226 156 L 4 156 Z", "#b88d52", 6) + fp("M 24 24 l 60 0 l 0 70 l -60 0 Z", "#f7f2e4", 3) + fp("M 100 30 l 50 0 l 0 50 l -50 0 Z", "#f0b6a8", 3) + fp("M 160 50 l 46 0 l 0 80 l -46 0 Z", "#cfe3ec", 3) + fp("M 40 104 l 70 0 l 0 36 l -70 0 Z", "#e7d48a", 3),
    { pos: { x: -150, y: FY - 140, z: WZ + 2 }, f: api.F.AM_NHO });
  var dh1 = api.cut(the, 140, 140, '<g transform="translate(70 70)">' + api.dongHoTuongSVG(60) + "</g>", { pos: { x: -340, y: FY - 300, z: WZ + 3 }, f: api.F.AM_NHO });
  cua(250, chu[0], "#6f8f99", 380);
  cua(1050, chu[1], "#4f6f86", 260);
  cua(1850, chu[2], "#8fb0a0", 260);
  cua(2650, chu[3], "#c98a5a", 250);
  // thang máy + đèn tầng + cầu thang
  var TX = 3450, TW = 220, TH = 320;
  api.cut(the, TW + 60, TH + 30, fp("M 4 " + (TH + 30) + " L 4 4 L " + (TW + 56) + " 4 L " + (TW + 56) + " " + (TH + 30) + " Z", "#a7aca9", 6) +
    fp("M 30 " + (TH + 30) + " L 30 30 L " + (TW + 30) + " 30 L " + (TW + 30) + " " + (TH + 30) + " Z", "#f3e2b0", 4), { pos: { x: TX, y: FY, z: WZ + 1 }, f: api.F.AM_NHO });
  var gio = api.cut(the, 160, 130, api.gioDoSVG(), { pos: { x: TX, y: FY, z: WZ + 3, scale: 0.85 }, f: api.F.AM_NHO });
  var canhL = api.cut(the, TW / 2, TH, fp("M 2 " + TH + " L 2 2 L " + (TW / 2 - 2) + " 2 L " + (TW / 2 - 2) + " " + TH + " Z", "#bcc3c5", 5) + sk("M " + (TW / 2 - 14) + " 40 L " + (TW / 2 - 14) + " " + (TH - 40), 3, INK, ' opacity=".4"'), { pos: { x: TX - TW / 4, y: FY, z: WZ + 6 }, f: api.F.AM_NHO });
  var canhR = api.cut(the, TW / 2, TH, fp("M 2 " + TH + " L 2 2 L " + (TW / 2 - 2) + " 2 L " + (TW / 2 - 2) + " " + TH + " Z", "#bcc3c5", 5) + sk("M 14 40 L 14 " + (TH - 40), 3, INK, ' opacity=".4"'), { pos: { x: TX + TW / 4, y: FY, z: WZ + 6 }, f: api.F.AM_NHO });
  var dTang = "";
  for (var k = 0; k < 6; k++) dTang += '<circle class="dt-' + k + '" cx="' + (22 + k * 34) + '" cy="22" r="11" fill="#6b6f6c" stroke="' + INK + '" stroke-width="3"/>';
  var denTang = api.cut(the, 210, 44, fp("M 2 2 L 208 2 L 208 42 L 2 42 Z", "#2f3b3c", 4) + dTang, { pos: { x: TX, y: FY - TH - 50, z: WZ + 4 }, f: api.F.AM_NHO });
  var dh2 = api.cut(the, 120, 120, '<g transform="translate(60 60)">' + api.dongHoTuongSVG(52) + "</g>", { pos: { x: TX - 260, y: FY - 300, z: WZ + 3 }, f: api.F.AM_NHO });
  var bac = "", nb = 9;
  for (k = 0; k < nb; k++) bac += fp("M " + (k * 46) + " " + (420 - k * 40) + " L " + (k * 46 + 46) + " " + (420 - k * 40) + " L " + (k * 46 + 46) + " 420 L " + (k * 46) + " 420 Z", "#c9bfa6", 4);
  api.cut(the, 430, 420, bac + sk("M 0 360 L 414 0", 6, "#6b4a33"), { pos: { x: TX + 480, y: FY, z: WZ + 60 }, ax: 0, f: api.F.AM_NHO });
  // cột tiền cảnh (mờ) tạo thị sai
  [].forEach(function (x) {
    api.cut(the, 120, 900, fp("M 6 900 L 6 0 L 114 0 L 114 900 Z", "#cfc6ae", 6) + sk("M 30 0 L 30 900", 6, "#fff", ' opacity=".4"'), { pos: { x: x, y: FY + 60, z: 380 }, f: api.F.AM_GAN });
  });

  // ---------------------------------------------------------------- Wob (đồ ngủ, dép lê, không mũ, ba lô, ôm ly)
  var w = api.makeWob(the, { x: -560, y: FY, z: -170, s: 0.46, f: api.F.WOB_AM });
  api.doThem(w, { doNgu: true, depLe: true }); api.baLoOliu(w);
  w.holdR.insertAdjacentHTML("beforeend", '<g class="ly">' + api.lyDoNguSVG() + "</g>");
  var ly = w.holdR.querySelector(".ly");
  api.armSet(w, "R", 28);
  gsap.set(ly, api.holdPose("R", 28, 310, 290, 0));
  api.blinks(w, 0.6, DUR - 0.5);
  // dép tuột nằm lại trên sàn
  var depSan = function () { var d = api.cut(the, 80, 30, '<g transform="translate(40 18)">' + api.depLeSVG() + "</g>", { pos: { x: 0, y: FY, z: -160, scale: 0.46 }, ay: 24, f: api.F.AM_NHO }); gsap.set(d, { opacity: 0 }); return d; };
  var depL = depSan(), depR = depSan();
  var chan = function (side) { return api.wobTheGioi(w, side === "L" ? 158 : 242, 392); };

  // 0–5.9: đi lẹp xẹp, dép trái tuột, quay lại xỏ, dép phải tuột
  api.walk(w, 0.25, 1.55, -380, -170, { face: 0.6, endFace: 0.6, step: 0.32, keepR: true });
  var pL = chan("L"); gsap.set(depL, { x: pL.x, z: -168 });
  tl.set(depL, { x: -430, opacity: 1 }, 1.25); tl.set(w.depL, { opacity: 0 }, 1.25);
  api.sfx("drop", 1.25, 0.2);
  api.quay(w, 1.7, -0.6, 0.25); api.look(w, 1.75, -12, 8, 0.15);
  api.walk(w, 2.0, 2.45, -440, -170, { face: -0.6, endFace: -0.6, step: 0.22, keepR: true });
  tl.set(depL, { opacity: 0 }, 2.5); tl.set(w.depL, { opacity: 1 }, 2.5);
  api.hop(w, 2.5, 6, 0.2);
  api.quay(w, 2.75, 0.6, 0.25);
  api.walk(w, 2.9, 3.85, -250, -170, { face: 0.6, endFace: 0.6, step: 0.32, keepR: true });
  tl.set(depR, { x: -300, opacity: 1 }, 3.6); tl.set(w.depR, { opacity: 0 }, 3.6);
  api.sfx("drop", 3.6, 0.2);
  api.quay(w, 4.0, -0.4, 0.3); api.look(w, 4.05, -12, 10, 0.15);
  api.lids(w, 4.35, 0.5, 0.2);
  api.quay(w, 4.7, 0.2, 0.25); api.look(w, 4.75, 0, 0, 0.15); // nhìn ống kính, tỉnh bơ
  api.walk(w, 5.0, 5.35, -300, -170, { face: -0.5, endFace: -0.5, step: 0.2, keepR: true });
  tl.set(depR, { opacity: 0 }, 5.4); tl.set(w.depR, { opacity: 1 }, 5.4);
  api.lids(w, 5.45, 0, 0.15);

  // 5.95–11.1: rón rén nép tường, qua POST OFFICE rồi POLICE
  var tPost = tu.post || 6.02, tPol = tu.police || 10.01;
  api.walk(w, 5.6, 11.0, 1180, -230, { face: 0.5, endFace: 0.4, step: 0.26, swing: 10, keepR: true });
  api.nghieng(w, 5.7, 6, 0.3);
  api.look(w, 6.4, -12, 0, 0.2); api.look(w, 7.6, 12, 0, 0.2); api.look(w, 8.8, -12, 0, 0.2); api.look(w, 10.0, 12, -4, 0.2);
  api.nghieng(w, 10.9, 0, 0.3);

  // 11.16–15: qua CLINIC, vào STORE, ra ôm túi bánh
  var tSto = tu.store || 13.66;
  api.walk(w, 11.15, 12.55, 2650, -260, { face: 0.6, endFace: 0, step: 0.3, keepR: true });
  tl.to(w.pos, { opacity: 0, duration: 0.15 }, 12.6);
  w.holdL.insertAdjacentHTML("beforeend", '<g class="banh"><g transform="translate(-45 -60)">' + api.tuiBanhSVG() + "</g></g>");
  var banh = w.holdL.querySelector(".banh");
  gsap.set(banh, { opacity: 0 });
  api.armSet(w, "L", -40, tSto - 0.3);
  tl.set(banh, Object.assign({ opacity: 1 }, api.holdPose("L", -40, 70, 270, 0)), tSto - 0.3);
  tl.to(w.pos, { opacity: 1, duration: 0.15 }, tSto - 0.3);
  api.hop(w, tSto - 0.15, 10, 0.3);
  api.look(w, tSto, 0, -2, 0.15);
  api.walk(w, tSto + 0.35, 14.95, 3200, -220, { face: 0.6, endFace: 0.6, step: 0.3, keepR: true, keepL: true });

  // 15.05: "Afternoon" – cắt sang thang máy (đồng hồ quay nhanh). Wob cạnh thang máy, giỏ đồ đứng một mình bên trong
  var T2 = N[3] - 0.04;
  tl.set(banh, { opacity: 0 }, T2);
  tl.set(w.pos, { x: TX - 230, z: -200 }, T2); w.x = TX - 230; w.z = -200;
  api.quay(w, T2, 0.5, 0.01);
  var mo = 15.55, dong = 16.9;
  tl.fromTo(canhL, { x: TX - TW / 4 }, { x: TX - TW * 0.72, duration: 0.45, ease: "power2.out", immediateRender: false }, mo);
  tl.fromTo(canhR, { x: TX + TW / 4 }, { x: TX + TW * 0.72, duration: 0.45, ease: "power2.out", immediateRender: false }, mo);
  api.sfx("ting", mo - 0.05, 0.5);
  api.look(w, mo + 0.1, 12, 2, 0.15, 1.1);
  api.walk(w, 16.2, 16.85, TX - 150, -200, { face: 0.6, endFace: 0.6, step: 0.2, keepR: true });
  tl.to(canhL, { x: TX - TW / 4, duration: 0.35, ease: "power2.in" }, dong);
  tl.to(canhR, { x: TX + TW / 4, duration: 0.35, ease: "power2.in" }, dong);
  api.sfx("bonk", dong + 0.35, 0.25);
  api.look(w, dong + 0.3, 6, -12, 0.15, 1.15);
  api.lids(w, dong + 0.6, 0.45, 0.2);
  // giỏ đi lên một mình: đèn tầng sáng dần
  var tRid = tu.riding || 18.76;
  for (k = 0; k < 6; k++) {
    var tk = dong + 0.5 + k * ((DUR - 0.4) - (dong + 0.5)) / 6;
    tl.set(denTang.svg.querySelector(".dt-" + k), { attr: { fill: "#ffd45a" } }, tk);
    if (k) tl.set(denTang.svg.querySelector(".dt-" + (k - 1)), { attr: { fill: "#6b6f6c" } }, tk);
  }
  api.look(w, 17.8, 4, -14, 0.2);
  // chạy cầu thang đuổi theo
  api.quay(w, 18.0, 0.7, 0.2);
  api.walk(w, 18.1, 18.55, TX + 470, -200, { face: 0.7, endFace: 0.7, step: 0.14, swing: 30, keepR: true });
  api.walk(w, 18.55, DUR, TX + 470 + 330, -200, { face: 0.7, endFace: 0.7, step: 0.14, swing: 30, keepR: true });
  tl.fromTo(w.pos, { y: FY }, { y: FY - 300, duration: DUR - 18.55, ease: "none", immediateRender: false }, 18.55);
  api.nghieng(w, 18.1, 12, 0.2);
  for (var t = 18.2; t < DUR - 0.2; t += 0.28) api.sfx("buoc-tuyet", t, 0.12);

  // đồng hồ quay (đồng hồ hành lang; giờ chiều quay nhanh)
  var kim = function (el, t0, t1, vong) {
    var g = el.svg.querySelector(".kim-gio"), p = el.svg.querySelector(".kim-phut");
    tl.fromTo(p, { rotation: 0 }, { rotation: 360 * vong, svgOrigin: "0 0", duration: t1 - t0, ease: "none", immediateRender: false }, t0);
    tl.fromTo(g, { rotation: 240 }, { rotation: 240 + 30 * vong, svgOrigin: "0 0", duration: t1 - t0, ease: "none", immediateRender: false }, t0);
  };
  kim(dh1, 0, 5.9, 2.5);
  kim(dh2, T2, T2 + 0.9, 3);

  // ---------------------------------------------------------------- camera (theo Wob dọc hành lang)
  api.camSet(R, null, { cx: -440, cy: 150, cz: -150, k: 560, rx: -4, ry: 4 });
  api.camTo(R, 0, 1.6, { cx: -400, k: 580 }, "sine.inOut");
  api.camTo(R, 1.6, 0.6, { cx: -420, cy: 190, k: 620, ry: 2 }, "power2.inOut");     // nhìn dép tuột
  api.camTo(R, 2.2, 1.6, { cx: -320, k: 630 }, "sine.inOut");
  api.camTo(R, 3.8, 0.5, { cx: -300, cy: 180, k: 660 }, "power2.inOut");
  api.camTo(R, 4.3, 1.4, { k: 690 }, "sine.inOut");
  api.camTo(R, 5.5, 0.6, { cx: 250, cy: 40, cz: -200, k: 530, rx: -2, ry: 0 }, "power2.inOut"); // POST OFFICE trọn khung
  api.camTo(R, 6.1, 2.2, { cx: 300, k: 550 }, "sine.inOut");
  api.camTo(R, 8.3, 1.4, { cx: 1050, k: 530 }, "power2.inOut");                      // POLICE
  api.camTo(R, 9.7, 1.3, { cx: 1100, k: 550 }, "sine.inOut");
  api.camTo(R, 11.0, 0.9, { cx: 1850, k: 530 }, "power2.inOut");                     // CLINIC
  api.camTo(R, 11.9, 0.7, { cx: 1880, k: 550 }, "sine.inOut");
  api.camTo(R, 12.6, 0.7, { cx: 2650, k: 530 }, "power2.inOut");                     // STORE
  api.camTo(R, 13.3, 1.0, { cx: 2680, k: 550 }, "sine.inOut");
  api.camTo(R, 14.3, 0.7, { cx: 3050, k: 280 }, "power2.inOut");
  api.camSet(R, T2, { cx: TX - 90, cy: 60, cz: -200, k: 330, rx: -3, ry: -2 });         // cắt sang thang máy
  api.camTo(R, T2, 1.6, { k: 360 }, "sine.inOut");
  api.camTo(R, 16.65, 0.6, { cx: TX - 60, cy: 40, k: 420 }, "power2.inOut");
  api.camTo(R, 17.25, 0.85, { k: 440 }, "sine.inOut");
  api.camTo(R, 18.1, 0.8, { cx: TX + 420, cy: -20, k: 300, ry: -3 }, "power2.inOut");
  api.camTo(R, 18.9, DUR - 18.9, { cx: TX + 700, cy: -70, k: 340 }, "sine.inOut");
  api.vignette(S.stage, "am");
};
