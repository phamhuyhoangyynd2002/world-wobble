/* Đoạn d01 (diorama, hiện tại, 35,14 s): mở video Coober Pedy.
 * Khung 0: Wob giơ lọ thuỷ tinh soi dưới đèn, hãnh diện. "Listen." lắc lọ sát tai: một tiếng tách, một hạt sạn lăn ra bàn,
 * Wob nhìn hạt sạn (giữ 0,8 s). "underground": sổ pop-up sau lưng bật thẻ bản đồ Úc (map-coober-pedy, vẽ bằng code),
 * nhà giấy nhỏ tụt xuống dưới mặt trang. "find out why": đặt lọ cạnh bóng golf phát sáng, tới bên sổ.
 * Thẻ đường đi (map-adelaide-route): đường nét đứt vẽ dần Adelaide → Coober Pedy theo tay Wob; "846 km" hiện đúng "eight",
 * "~525 mi" đúng "miles". "Estimates vary": bưu thiếp mặt cắt ngọn đồi bật dựng; Wob nhét hình Wob giấy bé vào nửa trong
 * lòng đồi, vỗ nhẹ, giữ 0,8 s. Biển thị trấn "pop. ~1,500 (2021)"; Wob vẽ hai vòng ranh khác nhau đúng "edges", nhún vai.
 * Ra `giay`: camera lao vào biển, phủ giấy phẳng.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {}, ds = [];
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); ds.push([k, w.start]); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var tuSau = function (k, t0) { for (var i = 0; i < ds.length; i++) if (ds[i][0] === k && ds[i][1] >= t0) return ds[i][1]; return null; };
  var chu = data.chu_tren_do_vat; // COOBER PEDY, Adelaide, 846 km, ~525 mi, pop. ~1,500 (2021)
  var N = data.nhip.map(function (n) { return n.tai; });

  // ---------------------------------------------------------------- bố cục bàn kỷ vật chung của tập 2 (d01, d02, d03, d38, d40)
  var BO = { hop: { x: -600, z: -440, w: 300, d: 220, h: 150, do: ["anh"] }, so: { x: 40, z: -300, w: 520, d: 600 },
    golf: { x: 30, z: 210 }, lo: { x: -90, z: 190 }, wob: { x: -250, z: 40 } };
  var L = api.lopPopup, s = 0.9;
  // thẻ bản đồ đứng (bản đồ SVG vẽ bằng code ve_ban_do.mjs, cắt khung bằng viewBox)
  var CW = 500, CH = 400;
  var the1 = function (href, vb, them) {
    return api.fp("M 6 6 L " + (CW - 6) + " 6 L " + (CW - 6) + " " + (CH - 6) + " L 6 " + (CH - 6) + " Z", C.PAPER, 7) +
      '<svg x="22" y="22" width="' + (CW - 44) + '" height="' + (CH - 44) + '" viewBox="' + vb + '" preserveAspectRatio="xMidYMid slice"><image href="' + href + '" x="0" y="0" width="1920" height="1080"/></svg>' +
      '<rect x="22" y="22" width="' + (CW - 44) + '" height="' + (CH - 44) + '" fill="none" stroke="' + C.INK + '" stroke-width="4"/>' + (them || "");
  };
  // thẻ A: Úc, chấm Coober Pedy (1124, 633) trong vb "700 160 800 692" → thẻ: x = 22 + (1124-700)*456/800, y = 22 + (633-160)*386/692
  var VA = [700, 160, 800, 692], kA = (CW - 44) / VA[2];
  var pA = { x: 22 + (1124 - VA[0]) * kA, y: 22 + (633 - VA[1]) * kA };
  var nhaChim = '<defs><clipPath id="d01clip"><rect x="0" y="0" width="120" height="110"/></clipPath></defs><g clip-path="url(#d01clip)"><g class="nha-chim">' +
    '<g transform="translate(10 10) scale(.9)">' + api.nhaNhoSVG(110, 110, { mau: "#c4643a" }) + "</g></g></g>" + api.sk("M 0 110 L 120 110", 4);
  var theA = the1("ban-do/map-coober-pedy.svg", VA.join(" "),
    api.txt(pA.x, pA.y - 30, 40, 800, chu[0], C.INK, ' paint-order="stroke" stroke="' + C.PAPER + '" stroke-width="10"'));
  // thẻ B: đường Adelaide (1122, 840) → Coober Pedy (794, 244), vb "520 150 840 711"
  var VB = [520, 150, 840, 711], kB = (CW - 44) / VB[2];
  var cp = { x: 22 + (794 - VB[0]) * kB, y: 22 + (244 - VB[1]) * kB }, ad = { x: 22 + (1122 - VB[0]) * kB, y: 22 + (840 - VB[1]) * kB };
  var duong = "M " + ad.x.toFixed(1) + " " + ad.y.toFixed(1) + " C " + (ad.x - 40).toFixed(1) + " " + (ad.y - 90).toFixed(1) + " " + (cp.x + 70).toFixed(1) + " " + (cp.y + 140).toFixed(1) + " " + cp.x.toFixed(1) + " " + cp.y.toFixed(1);
  var vien = ' paint-order="stroke" stroke="' + C.PAPER + '" stroke-width="10"';
  var theB = the1("ban-do/map-adelaide-route.svg", VB.join(" "),
    '<path class="duong" d="' + duong + '" fill="none" stroke="' + C.INK + '" stroke-width="7" stroke-linecap="round"/>' +
    '<path class="duong-dut" d="' + duong + '" fill="none" stroke="' + C.PAPER + '" stroke-width="4" stroke-dasharray="10 12"/>' +
    api.txt(cp.x + 40, cp.y - 22, 40, 800, chu[0], C.INK, vien) + api.txt(ad.x - 100, ad.y - 20, 40, 700, chu[1], C.INK, vien) +
    '<g class="nhan-km">' + api.txt(cp.x + 110, (cp.y + ad.y) / 2 - 10, 54, 900, chu[2], C.TEAL, vien) + "</g>" +
    '<g class="nhan-mi">' + api.txt(cp.x + 110, (cp.y + ad.y) / 2 + 52, 44, 700, chu[3], C.TERRA, vien) + "</g>");
  // biển thị trấn + làng nhỏ để vẽ vòng ranh
  var BW = 460, BH = 420;
  var bien = api.bienGoSVG([{ chu: chu[0], co: 56 }, { chu: chu[4], co: 46 }], { w: BW, h: BH }) +
    '<path class="ranh1" d="M 130 360 C 120 300 340 296 336 352 C 334 392 140 400 130 360 Z" fill="none" stroke="' + C.MAT + '" stroke-width="6" stroke-dasharray="14 9"/>' +
    '<path class="ranh2" d="M 96 372 C 70 290 400 280 380 360 C 372 404 110 420 96 372 Z" fill="none" stroke="' + C.TEAL + '" stroke-width="6" stroke-dasharray="14 9"/>';
  var nhaTi = "";
  [[150, 330], [200, 320], [260, 334], [300, 326]].forEach(function (p) { nhaTi += '<g transform="translate(' + p[0] + " " + (p[1] - 30) + ') scale(.32)">' + api.nhaNhoSVG(110, 110, { mau: "#c4643a" }) + "</g>"; });
  bien = bien.replace('<path class="ranh1"', nhaTi + '<path class="ranh1"');
  var buuThiep = api.buuThiepMatCatSVG();
  var ban = api.dungBan({
    hop: BO.hop, wob: { x: BO.wob.x, z: BO.wob.z, s: s },
    so: { x: BO.so.x, z: BO.so.z, w: BO.so.w, d: BO.so.d, lop: [
      L.tuy(theA, CW, CH, { x: 260, banLe: 90 }),
      L.tuy(nhaChim, 120, 110, { x: 400, banLe: 160 }),
      L.tuy(theB, CW, CH, { x: 260, banLe: 90 }),
      L.tuy(bien, BW, BH, { x: 260, banLe: 120 }),
      L.tuy(buuThiep, 380, 260, { x: 280, banLe: 250 })
    ] }
  });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  var IA = 0, INHA = 1, IB = 2, IBIEN = 3, IBT = 4;
  gsap.set([so.lop[IBT], so.lop[IBIEN], so.lop[IB]], { visibility: "hidden" });
  tl.set(so.lop[IB], { visibility: "visible" }, 13.1); tl.set(so.lop[IA], { visibility: "hidden" }, 13.12);
  tl.set(so.lop[IBT], { visibility: "visible" }, 23.8); tl.set(so.lop[IB], { visibility: "hidden" }, 23.92);
  tl.set(so.lop[IBIEN], { visibility: "visible" }, 28.5); tl.set(so.lop[IBT], { visibility: "hidden" }, 28.66);
  api.matKhongRong(w);
  // bóng golf phát sáng ở mép bàn (chưa giải thích)
  var golf = api.cut(the, 160, 160, '<g transform="translate(80 80)">' + api.bongGolfSVG() + "</g>", { pos: { x: BO.golf.x, y: TY, z: BO.golf.z }, ay: 104, f: api.F.AM_NHO });
  var sang = golf.svg.querySelector(".golf-sang");
  api.moiKhung(function (t) { gsap.set(sang, { opacity: 0.75 + 0.25 * Math.sin(t * 2.4), scale: 0.95 + 0.05 * Math.sin(t * 2.4), transformOrigin: "50% 50%" }); });
  // lọ trong tay phải, lọ đặt trên bàn (ẩn), hạt sạn
  w.holdR.insertAdjacentHTML("beforeend", '<g class="lo-cam">' + api.loOpalSVG() + "</g>");
  var loCam = w.holdR.querySelector(".lo-cam");
  var loBan = api.cut(the, 130, 170, '<g transform="translate(65 90)">' + api.loOpalSVG() + "</g>", { pos: { x: BO.lo.x, y: TY, z: BO.lo.z, scale: s }, ay: 170, f: api.F.AM_NHO });
  gsap.set(loBan, { opacity: 0 });
  var san = api.cut(the, 30, 30, '<g transform="translate(15 15)">' + api.hatSanSVG(false) + "</g>", { pos: { x: 0, y: TY, z: 0, scale: 1.4 }, ay: 26, f: api.F.AM_NHO });
  gsap.set(san, { opacity: 0 });
  // bút chì trong tay phải (ẩn)
  w.holdR.insertAdjacentHTML("beforeend", '<g class="but-cam"><g transform="rotate(-60) scale(.9)">' + api.butChiSVG() + "</g></g>");
  var butCam = w.holdR.querySelector(".but-cam");
  gsap.set(butCam, { opacity: 0 });
  // hình Wob giấy bé (đúng tạo hình Wob, tỉ lệ nhỏ) nằm trong lớp bưu thiếp
  var lopBT = so.lop[IBT], oBT = so.diemLop(IBT, 190, 260); // gốc lớp (giữa bản lề) trong thế giới
  var mini = api.makeWob(lopBT, { x: 0, y: 0, z: 6, s: 0.11, f: api.F.AM_NHO });
  gsap.set(mini.pos, { opacity: 0 });
  gsap.set(mini.shadow, { opacity: 0 });

  // ---------------------------------------------------------------- toạ độ tay
  var loPose = function (arm, x, y, g) { var h = api.handWorld("R", arm); return api.holdPose("R", arm, x == null ? h[0] : x, y == null ? h[1] - 40 : y, g || 0); };

  // ---------------------------------------------------------------- khung 0: giơ lọ soi dưới đèn, hãnh diện
  api.armSet(w, "R", -150);
  gsap.set(loCam, loPose(-150));
  api.quaySet(w, 0.25);
  gsap.set([w.pupL, w.pupR], { x: 8, y: -12 });
  api.lidsSet(w, 0.2);
  var mat = api.wobTheGioi(w, 230, 150);

  // ---------------------------------------------------------------- camera
  api.camSet(R, null, { cx: mat.x + 40, cy: mat.y - 10, cz: w.z, k: 420, rx: -10, ry: 6 });
  api.camTo(R, 0, 4.3, { k: 470, ry: 4 }, "sine.inOut");                                     // đẩy chậm (≈1,0 → 1,08)
  api.camTo(R, 4.3, 0.7, { cx: mat.x + 10, cy: mat.y + 70, k: 430, rx: -18, ry: 2 }, "power2.inOut"); // xuống thấy hạt sạn trên bàn
  api.camTo(R, 5.0, 1.75, { k: 455 }, "sine.inOut");
  api.camTo(R, 6.75, 1.0, { cx: 120, cy: 40, cz: -200, k: 170, rx: -14, ry: -4 }, "power2.inOut"); // lùi: Wob + sổ sau lưng
  api.camTo(R, 7.75, 2.2, { k: 205 }, "sine.inOut");
  var cB = so.tamLop(IB);
  api.camTo(R, 9.95, 1.0, { cx: 60, cy: 40, cz: -170, k: 200, rx: -14, ry: -2 }, "power2.inOut");
  api.camTo(R, 10.95, 2.3, { k: 225 }, "sine.inOut");
  api.camTo(R, 13.25, 0.9, { cx: cB.x - 10, cy: cB.y + 20, cz: cB.z, k: 560, rx: -6, ry: 0 }, "power2.inOut"); // vào thẻ đường đi
  api.camTo(R, 14.15, 9.6, { k: 620, ry: 1 }, "sine.inOut");
  var cT = so.tamLop(IBT);
  api.camTo(R, 23.75, 0.9, { cx: cT.x - 90, cy: cT.y - 20, cz: cT.z, k: 470, rx: -8, ry: 0 }, "power2.inOut"); // bưu thiếp
  api.camTo(R, 24.65, 3.8, { k: 520 }, "sine.inOut");
  var cS = so.diemLop(IBIEN, 230, 200);
  api.camTo(R, 28.45, 0.9, { cx: cS.x - 110, cy: cS.y + 20, cz: cS.z, k: 400, rx: -8, ry: 0 }, "power2.inOut");  // biển + vòng ranh
  api.camTo(R, 29.35, 5.0, { k: 450 }, "sine.inOut");
  api.laoVao(R, 34.4, 0.72, so.diemLop(IBIEN, 230, 120), 1100, "power3.in");
  api.raGiay(null, 0.5);
  api.sfx("whoosh", 34.45, 0.35);

  // ---------------------------------------------------------------- 0–4.3 "This jar holds every opal…": soi lọ, nghiêng ngắm
  tl.to(loCam, Object.assign(loPose(-158, null, null, -8), { duration: 1.2, ease: "sine.inOut" }), 0.4);
  tl.to(loCam, Object.assign(loPose(-146, null, null, 6), { duration: 1.3, ease: "sine.inOut" }), 1.6);
  api.armTo(w, "R", 0.4, 1.2, -158, "sine.inOut");
  api.armTo(w, "R", 1.6, 1.3, -146, "sine.inOut");
  api.look(w, 2.0, 4, -10, 0.2);
  api.nghieng(w, 2.6, -3, 0.6, "sine.inOut");
  api.quay(w, 3.0, 0, 0.3);
  api.look(w, 3.1, 0, 0, 0.2);
  api.lids(w, 3.1, 0, 0.15);
  api.nghieng(w, 3.3, 0, 0.4, "sine.inOut");

  // ---------------------------------------------------------------- 4.6–6.9 "Listen." lắc lọ sát tai; "That's mostly the jar." hạt sạn lăn ra
  var TAI = [-108, 296, 92]; // tay phải gập, lọ cạnh đầu bên phải
  api.armTo(w, "R", 4.35, 0.35, TAI[0], "power2.inOut");
  tl.to(loCam, Object.assign(loPose(TAI[0], TAI[1] + 30, TAI[2], 0), { duration: 0.35, ease: "power2.inOut" }), 4.35);
  api.nghieng(w, 4.6, 6, 0.25);
  api.look(w, 4.6, 12, -2, 0.15);
  api.lids(w, 4.75, 0.55, 0.15);
  [4.95, 5.12, 5.29].forEach(function (t, i) { tl.to(loCam, Object.assign(loPose(TAI[0], TAI[1] + 30 + (i % 2 ? -8 : 8), TAI[2] - 10, i % 2 ? -10 : 10), { duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" }), t); });
  api.sfx("drop", 5.2, 0.22); // một tiếng tách nhỏ
  api.lids(w, 5.5, 0.25, 0.12);
  // lọ nghiêng xuống, hạt sạn rơi ra lăn trên bàn
  api.armTo(w, "R", 5.5, 0.25, -40, "power2.inOut");
  tl.to(loCam, Object.assign(loPose(-40, null, null, 70), { duration: 0.25, ease: "power2.inOut" }), 5.5);
  api.nghieng(w, 5.5, 0, 0.25);
  var hR = api.handWorld("R", -40), pS = api.wobTheGioi(w, hR[0] + 10, hR[1] - 30);
  tl.set(san, { opacity: 1 }, 5.72);
  tl.fromTo(san, { x: pS.x, y: pS.y, z: w.z + 10 }, { x: pS.x + 40, y: TY, z: w.z + 70, duration: 0.3, ease: "power2.in", immediateRender: false }, 5.72);
  tl.to(san, { x: pS.x + 120, z: w.z + 110, rotationZ: 300, duration: 0.6, ease: "power2.out" }, 6.02);
  api.sfx("drop", 6.02, 0.28);
  api.look(w, 5.85, 10, 14, 0.15);
  api.quay(w, 5.9, 0.35, 0.25);
  // giữ 0,8 s nhìn hạt sạn (6.1–6.9), mí tỉnh bơ
  api.lids(w, 6.2, 0.5, 0.2);

  // ---------------------------------------------------------------- 6.7–9.9 "Plenty of people… live underground.": sổ sau lưng bật thẻ bản đồ
  api.quay(w, 6.85, 0.6, 0.25);
  api.look(w, 6.9, 14, -6, 0.15);
  api.lids(w, 6.9, 0, 0.12);
  so.moBia(6.75, 0.6);
  api.sfx("whoosh", 6.8, 0.3);
  so.batLop(IA, 7.15, 0.5);
  so.batLop(INHA, 7.35, 0.45);
  api.sfx("pop", 7.35, 0.45);
  api.armTo(w, "R", 7.0, 0.3, -20, "power2.inOut");
  tl.to(loCam, Object.assign(loPose(-20, null, null, 0), { duration: 0.3, ease: "power2.inOut" }), 7.0);
  // nhà giấy tụt xuống dưới mặt trang đúng "underground"
  var UG = tu.underground;
  tl.to(so.lop[INHA].svg.querySelector(".nha-chim"), { y: 112, duration: 0.45, ease: "back.in(1.6)" }, UG - 0.4);
  api.sfx("nuot", UG, 0.3);
  api.look(w, UG - 0.1, 16, 6, 0.12);

  // ---------------------------------------------------------------- 9.9–13.3 "I went to find out why.": đặt lọ cạnh bóng golf, tới bên sổ
  api.quay(w, 9.95, -0.2, 0.2);
  api.walk(w, 10.0, 10.6, -150, 150, { face: 0.4, endFace: 0.2, keepR: true, step: 0.2 });
  api.armTo(w, "R", 10.5, 0.3, 10, "power2.inOut");
  tl.to(loCam, Object.assign(loPose(10, null, null, 0), { duration: 0.3, ease: "power2.inOut" }), 10.5);
  tl.set(loCam, { opacity: 0 }, 10.82); tl.set(loBan, { opacity: 1 }, 10.82);
  api.sfx("bonk", 10.85, 0.25);
  api.look(w, 10.9, 14, 10, 0.15);   // liếc quả bóng golf
  api.armTo(w, "R", 11.0, 0.25, 0, "power2.out");
  api.walk(w, 11.4, 12.6, -130, -40, { face: 0.5, endFace: 0.4, step: 0.22 });
  so.gapLop(INHA, 12.7, 0.3);
  so.gapLop(IA, 12.75, 0.35);
  api.sfx("whoosh", 12.8, 0.3);
  so.batLop(IB, 13.15, 0.5);
  api.sfx("pop", 13.3, 0.45);

  // ---------------------------------------------------------------- 13.4–23.7 thẻ đường đi: tay dò theo nét đứt, nhãn km, mi
  var duongEl = so.lop[IB].svg.querySelectorAll(".duong, .duong-dut"), dai = 700;
  gsap.set(duongEl[0], { attr: { "stroke-dasharray": dai + " " + dai, "stroke-dashoffset": dai } });
  gsap.set(duongEl[1], { opacity: 0 });
  var km = so.lop[IB].svg.querySelector(".nhan-km"), mi = so.lop[IB].svg.querySelector(".nhan-mi");
  gsap.set([km, mi], { opacity: 0 });
  api.quay(w, 13.4, 0.55, 0.25);
  api.look(w, 13.45, 14, -14, 0.15);
  api.armTo(w, "R", 14.4, 0.35, -125, "back.out(1.5)"); // chỉ lên thẻ
  tl.to(duongEl[0], { attr: { "stroke-dashoffset": 0 }, duration: 3.0, ease: "sine.inOut" }, 14.6);
  tl.to(duongEl[1], { opacity: 1, duration: 0.3 }, 17.4);
  [[14.6, -118], [15.6, -132], [16.6, -142], [17.6, -150]].forEach(function (k) { api.armTo(w, "R", k[0], 1.0, k[1], "sine.inOut"); });
  api.sfx("whoosh", 14.7, 0.2);
  var EIGHT = tu.eight;
  tl.fromTo(km, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, EIGHT - 0.25);
  api.sfx("ting", EIGHT, 0.4);
  api.hop(w, EIGHT + 0.05, 10, 0.3);
  api.armTo(w, "R", 18.7, 0.35, -40, "power2.inOut");
  api.quay(w, 18.9, 0.1, 0.3);
  api.look(w, 19.0, 0, 2, 0.15);
  var MILES = tu.miles;
  tl.fromTo(mi, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, MILES - 0.25);
  api.sfx("pop", MILES, 0.35);
  api.armTo(w, "R", 22.3, 0.3, -110, "back.out(1.5)");
  api.quay(w, 22.3, 0.5, 0.25);
  api.look(w, 22.35, 14, -12, 0.15);
  api.armTo(w, "R", 23.3, 0.3, 0, "power2.inOut");

  // ---------------------------------------------------------------- 23.6–28.4 bưu thiếp mặt cắt; nhét hình Wob giấy vào nửa trong lòng đồi
  so.gapLop(IB, 23.55, 0.35);
  so.batLop(IBT, 23.85, 0.5);
  api.sfx("pop", 24.0, 0.45);
  api.walk(w, 23.7, 24.6, 120, 130, { face: 0.5, endFace: 0.45, step: 0.22 });
  api.look(w, 24.7, 14, -8, 0.15);
  // hình Wob giấy hiện trong tay phải, bay vào ô trống trong lòng đồi
  var cho = { x: 253, y: 234 }; // đáy ô .bt-cho (hệ bưu thiếp 380×260)
  var oLop = so.diemLop(IBT, 190, 260); // giữa bản lề
  var choLop = { x: cho.x - 190, y: cho.y - 260 };
  var w2 = { x: 120, z: 130 };
  var tayW = function (arm) { var h = api.handWorld("R", arm); return { x: w2.x + (h[0] - 200) * s - oLop.x, y: TY + (h[1] - 392) * s - oLop.y, z: w2.z - oLop.z }; };
  api.armTo(w, "R", 25.6, 0.3, -60, "power2.out");
  var t60 = tayW(-60);
  tl.set(mini.pos, { opacity: 1, x: t60.x, y: t60.y + 18, z: t60.z }, 25.9);
  api.look(w, 25.9, 6, 8, 0.15);
  api.armTo(w, "R", 26.4, 0.5, -95, "power2.inOut");
  tl.to(mini.pos, { x: choLop.x, y: choLop.y, z: 8, duration: 0.5, ease: "power2.inOut" }, 26.4);
  tl.fromTo(mini.lift, { y: 0 }, { y: -10, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.out", immediateRender: false }, 26.4);
  api.sfx("pop", 26.92, 0.3);
  // vỗ nhẹ hai lần, giữ 0,8 s
  api.armTo(w, "R", 27.0, 0.1, -100, "power1.inOut");
  api.armTo(w, "R", 27.1, 0.1, -95, "power1.inOut");
  api.armTo(w, "R", 27.2, 0.1, -100, "power1.inOut");
  api.armTo(w, "R", 27.3, 0.1, -95, "power1.inOut");
  api.lids(w, 27.4, 0.3, 0.15);
  api.armTo(w, "R", 28.2, 0.3, 0, "power2.inOut");
  api.lids(w, 28.2, 0, 0.12);

  // ---------------------------------------------------------------- 28.4–34.6 biển số dân; hai vòng ranh khác nhau; nhún vai
  so.gapLop(IBT, 28.3, 0.35);
  so.batLop(IBIEN, 28.55, 0.5);
  api.sfx("pop", 28.7, 0.45);
  var r1 = so.lop[IBIEN].svg.querySelector(".ranh1"), r2 = so.lop[IBIEN].svg.querySelector(".ranh2");
  [r1, r2].forEach(function (r) { gsap.set(r, { attr: { "stroke-dasharray": "900 900", "stroke-dashoffset": 900 } }); });
  api.walk(w, 28.5, 29.3, -140, 120, { face: 0.5, endFace: 0.45, step: 0.22 });
  api.look(w, 29.4, 14, -10, 0.15);
  tl.set(butCam, { opacity: 1 }, 32.2);
  api.armTo(w, "R", 32.2, 0.3, -100, "power2.out");
  // vòng 1 (đỏ) ở "draw", vòng 2 (xanh, khác hẳn) đúng "edges"
  var DRAW = tu.draw, EDGES = tu.edges;
  tl.to(r1, { attr: { "stroke-dashoffset": 0 }, duration: 0.65, ease: "sine.inOut" }, DRAW - 0.35);
  tl.to(r2, { attr: { "stroke-dashoffset": 0 }, duration: 0.55, ease: "sine.inOut" }, EDGES - 0.4);
  for (var k = 0; k < 6; k++) api.armTo(w, "R", DRAW - 0.35 + k * 0.11, 0.11, k % 2 ? -96 : -106, "sine.inOut");
  for (var k2 = 0; k2 < 5; k2++) api.armTo(w, "R", EDGES - 0.4 + k2 * 0.11, 0.11, k2 % 2 ? -92 : -110, "sine.inOut");
  // nhún vai
  var NV = EDGES + 0.25;
  api.armTo(w, "R", NV, 0.2, -60, "power2.out");
  api.armTo(w, "L", NV, 0.2, 60, "power2.out");
  api.quay(w, NV, 0.1, 0.2);
  api.look(w, NV, 0, -4, 0.12);
  tl.fromTo(w.upper, { y: 0 }, { y: -10, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, NV);

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[4.5, 6.9], [26.3, 28.2]], amp: 0.8 });
  api.breathe(w, 0, 35.1);
  api.blink(w, 2.4, 0.2); api.blink(w, 12.2, 0); api.blink(w, 19.8, 0); api.blink(w, 30.6, 0);
};
