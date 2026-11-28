/* Đoạn d51 (diorama, đuôi tập, 20 s) – dữ liệu nạp vào api.duoiTap (templates/hoat-hinh/_chung/mo-ket/duoi-tap.js).
 * Bàn kỷ vật (cùng bàn d01), CAMERA KHOÁ CỨNG cả đoạn, cả cảnh dồn nửa trái (dịch tâm phối cảnh như tập 4 d33).
 * Kệ tầng trên: bình xịt còn niêm phong (SANTA CRUZ / DEL ISLOTE), tờ lịch hầm (WHITTIER), chỗ trống cho bưu thiếp MỚI
 * (TRISTAN / DA CUNHA, mặt tem quay ra). Tầng dưới: lọ gần như không có opal (COOBER PEDY, không nhịp riêng), tủ đông nhỏ (OYMYAKON).
 * Bản đồ giấy trừu tượng trên nóc kệ (không biên giới thật), ghim không nhãn, KHÔNG mặt trời.
 * 0–0,6: Wob (còn là kiện hàng dây thừng) nhún một cái, dây tuột thành cuộn dưới chân (pop), nhặt bưu thiếp đúng 0,6.
 * "shelf": đặt bưu thiếp lên kệ. "fish": nắp tủ đông hé, đôi mắt cá ló ra nhìn quanh rồi nắp khép (không vẫy đuôi).
 * "Somewhere": bản đồ mở, ghim đỏ cắm vùng biển phía nam; dãy chấm bút chạy lên ghim trống rung ở rất xa phía bắc, tuyết giấy rơi;
 * "house by house": dãy nhà tí hon nhích từng căn; "mine": tháp giếng mỏ hiện, nhà nhích xa khỏi tháp. Wob run run.
 * Hết lời: quay phải, chỉ tay sang hai khung trống (bàn tay x ≤ 1100), chớp mắt, thở tới hết. Không mờ đen.
 * End screen bật trong 0–1,2 s rồi đứng yên tuyệt đối; sau 1,2 s vùng x ≥ 1150 không chuyển động, không chữ.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // TRISTAN DA CUNHA, SANTA CRUZ DEL ISLOTE, WHITTIER, COOBER PEDY, OYMYAKON

  var ban = api.dungBan({ wob: { x: -220, z: -20, s: 0.8 }, hop: { x: -40, z: -560 }, ongBut: false });
  var w = ban.wob, R = ban.rig, TY = ban.TY, the = ban.the;
  R.stage.style.left = "-880px"; R.stage.style.right = "-80px"; R.cam.style.left = "1440px";   // tâm phối cảnh lệch trái
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";

  // tủ đông riêng: mắt cá ló ra dưới nắp (không đuôi)
  var veTuDong = function () {
    var s = fp("M 10 46 L 170 46 L 170 190 L 10 190 Z", "#e8f2f5", 6) + sk("M 22 60 L 158 60", 4, "#bcd6df") + fp("M 140 100 l 14 0 l 0 40 l -14 0 Z", "#9aa39a", 3);
    s += '<g class="mat-ca" opacity="0">' + fp("M 100 52 C 104 30 160 30 164 52 Z", C.FISH1 || "#7fb3c8", 3.5) +
      '<circle cx="120" cy="40" r="9" fill="#fff" stroke="' + C.INK + '" stroke-width="3"/><circle cx="144" cy="40" r="9" fill="#fff" stroke="' + C.INK + '" stroke-width="3"/>' +
      '<g class="con-ngu"><circle cx="120" cy="41" r="4" fill="' + C.INK + '"/><circle cx="144" cy="41" r="4" fill="' + C.INK + '"/></g></g>';
    s += '<g class="nap">' + fp("M 6 30 L 174 30 L 174 50 L 6 50 Z", "#d4e6ec", 6) + "</g>";
    return { svg: s, w: 180, h: 190 };
  };
  var veBuuThiep = function () {
    return { svg: fp("M 30 148 L 170 148 L 164 156 L 36 156 Z", "#8a5a3b", 3) + '<g transform="translate(100 82) rotate(-3)">' + api.buuThiepSVG({ w: 190, h: 128 }) + "</g>", w: 200, h: 158 };
  };

  var CO = 55;
  var dt = api.duoiTap(ban, {
    ke: { x: -700, z: -300 },
    theCo: CO, theW: 300, matTroi: false,
    kyVat: [
      { the: chu[1], dong: ["SANTA CRUZ", "DEL ISLOTE"], ve: "binhXit", tang: 0, cho: 0.25, theW: 420, theDy: 104 },
      { the: chu[2], ve: "toLich", tang: 0, cho: 1.2, theW: 390, theDy: 178 },
      { the: chu[0], dong: ["TRISTAN", "DA CUNHA"], ve: veBuuThiep, tang: 0, cho: 2.1, theW: 330, theDy: 104, moi: true },
      { the: chu[3], ve: "loOpal", tang: 0, cho: 0.001, theW: 470, co: 53 },
      { the: chu[4], ve: veTuDong, tang: 1, cho: 1.6, theW: 400 }
    ],
    banDo: { x: -720, z: -330, w: 520, h: 320 },
    ghimMoi: { u: 0.64, v: 0.9 }, ghimTrong: { u: 0.78, v: 0.16 },
    endScreen: { khung: [[1180, 160], [1180, 500]], vong: [1460, 922] }
  });
  // nóc kệ: lọ opal (trái, thẻ một dòng dưới lọ), bản đồ thu nhỏ (giữa), tủ đông (phải, thẻ trên cửa tủ)
  var BDK = 0.77;
  gsap.set(dt.banDo, { y: TY - 524, scaleY: BDK });
  gsap.set(dt.mon[3].el, { x: -975, y: TY - 524, z: -300 }); gsap.set(dt.mon[3].tag, { x: -930, y: TY - 445, z: -262 });
  gsap.set(dt.mon[4].el, { x: -420, y: TY - 524, z: -300 }); gsap.set(dt.mon[4].tag, { x: -400, y: TY - 520, z: -262 });
  var I_XIT = 0, I_LICH = 1, I_BT = 2, I_LO = 3, I_TU = 4;

  // dãy chấm, tuyết, nhà tí hon, tháp mỏ trên bản đồ (không chữ)
  var BW = 520, BH = 320, P0 = [0.64 * BW, 0.9 * BH - 34], P1 = [0.78 * BW, 0.16 * BH + 4];
  var cham = "";
  var NCH = 9;
  for (var i = 1; i <= NCH; i++) {
    var u = i / (NCH + 1), x = P0[0] + (P1[0] - P0[0]) * u + Math.sin(u * Math.PI) * -26, y = P0[1] + (P1[1] - P0[1]) * u;
    cham += '<circle class="ch ch' + i + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="5" fill="#2b3a5c" opacity="0"/>';
  }
  var tuyet = "";
  [[372, 30, 7], [452, 22, 6], [470, 64, 8], [356, 74, 6], [430, 92, 5]].forEach(function (b, k) { tuyet += '<g class="tuyet" opacity="0" transform="translate(' + b[0] + " " + b[1] + ')"><g class="tr">' + api.bongTuyetSVG(b[2]) + "</g></g>"; });
  var nha = "";
  for (var k2 = 0; k2 < 4; k2++) nha += '<g class="nha nha' + k2 + '" opacity="0"><g transform="translate(' + (416 + k2 * 20) + ' 112) scale(.2)">' + api.nhaNhoSVG(100, 100, { mau: k2 % 2 ? "#e8d9b8" : "#c99a62" }) + "</g></g>";
  var thap = '<g class="thap" opacity="0"><g transform="translate(416 116) scale(.6)">' + api.thapMoSVG() + "</g></g>";
  dt.banDo.svg.insertAdjacentHTML("beforeend", cham + tuyet + thap + nha);
  var q = function (s) { return dt.banDo.svg.querySelectorAll(s); };

  // camera khoá cứng
  api.camSet(R, null, { cx: -600, cy: -170, cz: -200, k: -150, rx: -8, ry: 3 });
  dt.endScreen(0.05);

  // ---------------------------------------------------------------- 0–0,6 thoát kiện hàng, dây tuột thành cuộn, nhặt bưu thiếp
  w.extra.insertAdjacentHTML("beforeend", '<g class="kh">' + api.kienHangWobSVG() + "</g>");
  var kh = w.extra.querySelector(".kh");
  api.armSet(w, "L", 8); api.armSet(w, "R", -8);
  api.quaySet(w, -0.2);
  gsap.set([w.pupL, w.pupR], { x: -4, y: 4 });
  tl.to(w.lift, { scaleY: 0.86, scaleX: 1.1, duration: 0.07, ease: "power2.out" }, 0.03);
  tl.to(w.lift, { y: -26, scaleY: 1.08, scaleX: 0.94, duration: 0.14, ease: "power2.out" }, 0.1);
  tl.to(w.lift, { y: 0, scaleY: 1, scaleX: 1, duration: 0.14, ease: "power2.in" }, 0.24);
  tl.to(kh, { y: 120, scaleY: 0.4, svgOrigin: "200 320", opacity: 0, duration: 0.22, ease: "power2.in" }, 0.12);
  var cuon = api.cut(the, 160, 80, api.cuonDaySVG(), { pos: { x: -175, y: TY, z: 10, scale: 0.75 }, ax: 80, ay: 76, f: api.F.AM_NHO });
  gsap.set(cuon, { opacity: 0 });
  tl.set(cuon, { opacity: 1 }, 0.3);
  tl.fromTo(cuon, { scaleY: 0.3 }, { scaleY: 1, duration: 0.18, ease: "back.out(2.5)", immediateRender: false }, 0.3);
  // pop của endScreen (0,05–0,41) phủ luôn tiếng dây tuột
  api.lids(w, 0.05, 0.4, 0.06); api.lids(w, 0.38, 0, 0.1);
  // bưu thiếp nằm trên bàn bên trái Wob, nhặt đúng 0,6
  var BTB = { x: -345, z: 40 };
  var btBan = api.cut(the, 220, 150, '<g transform="translate(110 75) rotate(5)">' + api.buuThiepSVG({ w: 190, h: 128 }) + "</g>", { pos: { x: BTB.x, y: TY - 4, z: BTB.z, rotationX: 90, scale: 0.8 }, ax: 110, ay: 75, f: api.F.AM_NHO });
  w.holdL.insertAdjacentHTML("beforeend", '<g class="btt" opacity="0"><g transform="rotate(-3) scale(.8)">' + api.buuThiepSVG({ w: 190, h: 128 }) + "</g></g>");
  var btt = w.holdL.querySelector(".btt");
  api.quay(w, 0.32, -0.5, 0.15); api.look(w, 0.34, -14, 14, 0.1);
  var AN = 30;
  api.armTo(w, "L", 0.36, 0.22, AN, "power2.out");
  var hN = api.handWorld("L", AN);
  tl.set(btBan, { opacity: 0 }, 0.6);
  tl.set(btt, api.holdPose("L", AN, hN[0] - 30, hN[1] + 10, -3), 0.6); tl.set(btt, { opacity: 1 }, 0.6);
  // ---------------------------------------------------------------- "shelf": lên kệ, mặt tem quay ra
  var A0 = 120, h0 = api.handWorld("L", A0);
  api.armTo(w, "L", 0.65, 0.4, A0, "power2.inOut");
  tl.to(btt, Object.assign(api.holdPose("L", A0, h0[0], h0[1] + 50, 0), { duration: 0.4, ease: "power2.inOut" }), 0.65);
  api.look(w, 0.7, -12, -8, 0.2);
  var tSh = tu.shelf || 1.86;
  var tay = api.wobTheGioi(w, h0[0], h0[1] + 50);
  tl.set(btt, { opacity: 0 }, tSh - 0.6);
  dt.datLen(I_BT, tSh - 0.6, { x: tay.x, y: tay.y, z: w.z });
  api.armTo(w, "L", tSh - 0.6, 0.5, 150, "power2.out");
  api.armTo(w, "L", tSh + 0.1, 0.35, 0, "power2.inOut");
  api.lids(w, (tu.stamp || 2.59), 0.3, 0.2); api.lids(w, 3.4, 0, 0.2);
  api.look(w, (tu.spray || 3.94) - 0.1, -16, -6, 0.2);
  api.look(w, (tu.tunnel || 5.5) - 0.1, -12, -8, 0.2);
  api.quay(w, 6.1, -0.3, 0.3);
  // ---------------------------------------------------------------- "fish": mắt cá ló ra canh gác
  var tFish = tu.fish || 6.88, tuSvg = dt.mon[I_TU].el.svg, nap = tuSvg.querySelector(".nap"), matCa = tuSvg.querySelector(".mat-ca"), conNgu = tuSvg.querySelector(".con-ngu");
  api.quay(w, tFish - 0.3, -0.6, 0.25); api.look(w, tFish - 0.25, -16, 12, 0.15);
  tl.to(nap, { rotation: -24, svgOrigin: "6 40", duration: 0.25, ease: "power2.out" }, tFish);
  tl.set(matCa, { opacity: 1 }, tFish + 0.08);
  tl.fromTo(matCa, { y: 14 }, { y: 0, duration: 0.2, ease: "power2.out", immediateRender: false }, tFish + 0.08);
  tl.to(conNgu, { x: -4, duration: 0.15, ease: "power2.inOut" }, tFish + 0.4);
  tl.to(conNgu, { x: 4, duration: 0.2, ease: "power2.inOut" }, tFish + 0.75);
  tl.to(conNgu, { x: 0, duration: 0.15, ease: "power2.inOut" }, tFish + 1.15);
  tl.to(matCa, { y: 14, duration: 0.18, ease: "power2.in" }, 8.25);
  tl.set(matCa, { opacity: 0 }, 8.43);
  tl.to(nap, { rotation: 0, svgOrigin: "6 40", duration: 0.2, ease: "power2.in" }, 8.3);
  api.lids(w, tFish + 0.5, 0.45, 0.2); api.lids(w, 8.3, 0, 0.15);
  // ---------------------------------------------------------------- "Somewhere much colder…": bản đồ, ghim, chấm, tuyết, nhà, tháp
  var tSome = tu.somewhere || 8.71;
  tl.set(dt.banDo, { opacity: 1 }, tSome - 0.05);
  tl.fromTo(dt.banDo, { scaleX: 0 }, { scaleX: BDK, duration: 0.45, ease: "back.out(1.4)", immediateRender: false }, tSome - 0.05);
  dt.camGhim(tSome + 0.35);
  api.sfx("drop", tSome + 0.35, 0.45);
  api.quay(w, tSome - 0.2, -0.45, 0.25); api.look(w, tSome - 0.1, -14, -12, 0.2);
  for (var j = 1; j <= NCH; j++) tl.to(q(".ch" + j), { opacity: 1, duration: 0.08 }, tSome + 0.55 + j * 0.09);
  var tCold = tu.colder || 9.38;
  dt.ghimRung(tCold + 0.15, 1.4, { matTroi: false });
  q(".tuyet").forEach(function (el, k) {
    tl.to(el, { opacity: 1, duration: 0.2 }, tCold + 0.1 + k * 0.08);
    tl.fromTo(el.querySelector(".tr"), { y: -8 }, { y: 10, duration: 4.6, ease: "sine.inOut", immediateRender: false }, tCold + 0.1 + k * 0.08);
  });
  api.shiver(w, tCold, tCold + 0.9, 2.5);
  api.sfx("brr", tCold, 0.7);
  // nhà hiện ở "town", nhích từng căn đúng "house by house", xa dần khỏi tháp ở "mine"
  var tTown = tu.town || 10.19, tHouse = tu.house || 11.44, tMine = tu.mine || 12.9;
  q(".nha").forEach(function (el, k) { tl.to(el, { opacity: 1, duration: 0.15 }, tTown + k * 0.06); });
  var daNhich = 0;
  var nhich = function (t, dx) { var x0 = daNhich, x1 = daNhich + dx; daNhich = x1; q(".nha").forEach(function (el, k) { tl.fromTo(el, { x: x0 }, { x: x1, duration: 0.14, ease: "power2.out", immediateRender: false }, t + (3 - k) * 0.12); }); };
  nhich(tHouse, 5); nhich((tu.by || 11.68) + 0.18, 5);
  tl.to(q(".thap"), { opacity: 1, duration: 0.2 }, tMine - 0.1);
  tl.fromTo(q(".thap"), { scaleY: 0.3, svgOrigin: "416 116" }, { scaleY: 1, svgOrigin: "416 116", duration: 0.25, ease: "back.out(2)", immediateRender: false }, tMine - 0.1);
  nhich(tMine + 0.3, 6); nhich((tu.feeds || 13.31) + 0.1, 6);
  api.look(w, tMine, -16, -10, 0.2);
  [tMine + 0.4, 13.5].forEach(function (t) {
    tl.to(w.talk, { y: 6, svgOrigin: "200 290", duration: 0.2, ease: "sine.inOut" }, t);
    tl.to(w.talk, { y: 0, svgOrigin: "200 290", duration: 0.25, ease: "sine.inOut" }, t + 0.22);
  });
  // ---------------------------------------------------------------- hết lời: quay phải, chỉ sang hai khung trống, thở tới hết
  var tEnd = 14.2;
  api.quay(w, tEnd - 0.1, 0.6, 0.25); api.look(w, tEnd - 0.05, 14, -4, 0.15);
  api.armTo(w, "R", tEnd, 0.3, -62, "back.out(2)");
  api.nhayCham(w, tEnd + 1.2, 0);
  api.blink(w, tEnd + 2.8, 0);
  api.blink(w, tEnd + 4.6, 0);

  var lop = data.lop; data.lop = "hien-tai"; api.khauHinh(w); data.lop = lop;
  api.gatDau(w, { bo: [[12.8, DUR]] });
  api.breathe(w, 0.4, DUR);
  var lo = dt.mon[I_LO].el;
  var amDen = api.div("", api.root, "position:absolute;left:0;top:0;width:1000px;height:1080px;pointer-events:none;" +
    "background:radial-gradient(ellipse 620px 560px at 430px 360px, rgba(255,206,130,.34), rgba(255,206,130,.12) 55%, rgba(255,206,130,0) 80%);");
  api.moiKhung(function (t) {
    gsap.set(amDen, { opacity: 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI * 0.45)) });
    var tt = Math.max(0, t - 0.6);
    gsap.set(w.pos, { y: TY - 6 * (0.5 - 0.5 * Math.cos(tt * 2 * Math.PI * 0.85)), rotationZ: 2 * Math.sin(tt * 2 * Math.PI * 0.42) });
    gsap.set(lo, { rotationZ: 1.2 * Math.sin(t * 2 * Math.PI * 0.5) });
  });
  api.blinks(w, 3.6, 6.4, [], 0);
};
