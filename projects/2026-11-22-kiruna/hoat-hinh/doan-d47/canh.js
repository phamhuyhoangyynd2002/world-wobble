/* Đoạn d47 (diorama, đuôi tập, 20 s) – dữ liệu nạp vào api.duoiTap (templates/hoat-hinh/_chung/mo-ket/duoi-tap.js).
 * Bàn kỷ vật, CAMERA KHOÁ CỨNG cả đoạn, cả cảnh dồn nửa trái (như tập 5 d51). Cửa sổ mưa bên trái kệ, đinh khung cửa sổ TRỐNG.
 * Kệ tầng trên: bình xịt (SANTA CRUZ / DEL ISLOTE), tờ lịch hầm (WHITTIER), bưu thiếp TRISTAN DA CUNHA mặt tem quay ra,
 * chìa KIRUNA (mới) treo trên đinh riêng ở cột kệ cạnh bưu thiếp, mũi chỉ sang phải (api.duoiVE.chiaKhoa). Nóc kệ: lọ opal
 * (COOBER PEDY), bản đồ giấy trừu tượng (không biên giới thật), tủ đông (OYMYAKON).
 * Khung 0: Wob đã cầm chìa. 0,6 treo chìa lên đinh (dt.datLen). "postcard" 3,88 bưu thiếp nghiêng tựa vào chìa.
 * "rattles" 7,60 khuỷu tay chạm kệ, lọ opal rung lách cách, Wob liếc. "Next," 9,06 bản đồ mở: ghim đỏ mới ở rất xa phía bắc
 * có tuyết; ghim trống không nhãn rung trên mảng đất xanh ấm phía đông xa, mây mưa nhỏ trên nó (matTroi: false).
 * "sock" 10,57 nhét chồng tất vào va li (drop). 11,57 một giọt mưa từ mây rơi rất chậm xuống chiếc tất trên cùng: tất ẩm.
 * 13,88 hết lời: quay phải, chỉ sang hai khung trống (bàn tay x ≤ 1100), chớp mắt, thở. Mưa trượt chậm trên kính.
 * End screen bật trong 0–1,2 s rồi đứng yên tuyệt đối; sau 1,2 s vùng x ≥ 1150 không chuyển động, không chữ. Không mờ đen.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // KIRUNA, TRISTAN DA CUNHA, SANTA CRUZ DEL ISLOTE, WHITTIER, COOBER PEDY, OYMYAKON

  var ban = api.dungBan({ wob: { x: -220, z: -20, s: 0.8 }, hop: { x: -40, z: -560 }, ongBut: false });
  var w = ban.wob, R = ban.rig, TY = ban.TY, the = ban.the;
  R.stage.style.left = "-880px"; R.stage.style.right = "-80px"; R.cam.style.left = "1440px";   // tâm phối cảnh lệch trái (như tập 5 d51)
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";

  // cửa sổ mưa bên trái kệ, đinh trống
  var CSW = 300, CSH = 420, NG = 5;
  var cuaSo = api.cut(the, CSW + 30, CSH, '<g transform="translate(15 0)">' + api.cuaSoSVG(CSW, CSH, { troi: "mua", giot: NG, seed: 47 }) + "</g>", { pos: { x: -1300, y: TY - 120, z: -520 }, f: api.F.AM });
  var giot = []; for (var g = 0; g < NG; g++) { var el = cuaSo.svg.querySelector(".cs-giot-" + g + " .cs-g"); if (el) giot.push(el); }

  // tủ đông (mắt cá, như tập 5)
  var veTuDong = function () {
    var s = fp("M 10 46 L 170 46 L 170 190 L 10 190 Z", "#e8f2f5", 6) + sk("M 22 60 L 158 60", 4, "#bcd6df") + fp("M 140 100 l 14 0 l 0 40 l -14 0 Z", "#9aa39a", 3);
    s += '<g class="nap">' + fp("M 6 30 L 174 30 L 174 50 L 6 50 Z", "#d4e6ec", 6) + "</g>";
    return { svg: s, w: 180, h: 190 };
  };
  var CO = 55;
  var dt = api.duoiTap(ban, {
    ke: { x: -700, z: -300 },
    theCo: CO, theW: 300, matTroi: false,
    kyVat: [
      { the: chu[2], dong: ["SANTA CRUZ", "DEL ISLOTE"], ve: "binhXit", tang: 0, cho: 0.2, theW: 420, theDy: 104 },
      { the: chu[3], ve: "toLich", tang: 0, cho: 1.05, theW: 390, theDy: 178 },
      { the: chu[1], dong: ["TRISTAN", "DA CUNHA"], ve: api.duoiVE.buuThiep, tang: 0, cho: 1.85, theW: 360, theDx: 30, theDy: 104 },
      { the: chu[4], ve: "loOpal", tang: 0, cho: 0.001, theW: 470, co: 53 },
      { the: chu[5], ve: veTuDong, tang: 1, cho: 1.6, theW: 400 },
      { the: chu[0], ve: api.duoiVE.chiaKhoa, tang: 0, cho: 2.75, theW: 260, theDx: 30, theDy: -150, moi: true }
    ],
    banDo: { x: -720, z: -330, w: 520, h: 320 },
    ghimMoi: { u: 0.78, v: 0.16 }, ghimTrong: { u: 0.86, v: 0.76 },
    endScreen: { khung: [[1180, 160], [1180, 500]], vong: [1460, 922] }
  });
  var I_XIT = 0, I_LICH = 1, I_BT = 2, I_LO = 3, I_TU = 4, I_CK = 5;
  var BDK = 0.77;
  gsap.set(dt.banDo, { y: TY - 524, scaleY: BDK });
  gsap.set(dt.mon[I_LO].el, { x: -975, y: TY - 524, z: -300 }); gsap.set(dt.mon[I_LO].tag, { x: -892, y: TY - 445, z: -262 });
  gsap.set(dt.mon[I_TU].el, { x: -420, y: TY - 524, z: -300 }); gsap.set(dt.mon[I_TU].tag, { x: -400, y: TY - 520, z: -262 });
  // bản đồ: mảng đất xanh ấm phía đông xa, mây mưa trên ghim trống, vài bông tuyết quanh ghim mới (không chữ)
  var BW = 520, BH = 320;
  var datXanh = fp("M 392 196 C 430 176 492 186 500 226 C 508 268 470 296 430 290 C 396 284 372 250 376 222 C 378 208 384 200 392 196 Z", "#7FB069", 4);
  var may = '<g class="may" opacity="0"><g transform="translate(' + (0.86 * BW) + " " + (0.76 * BH - 96) + ') scale(.62)">' + api.mayMuaSVG() + "</g></g>";
  var tuyet = "";
  [[372, 26, 7], [452, 18, 6], [470, 70, 7], [384, 76, 5]].forEach(function (b) { tuyet += '<g class="tuyet" opacity="0" transform="translate(' + b[0] + " " + b[1] + ')"><g class="tr">' + api.bongTuyetSVG(b[2]) + "</g></g>"; });
  var bdSvg = dt.banDo.svg;
  var land = bdSvg.querySelectorAll("path");
  bdSvg.insertAdjacentHTML("beforeend", "");
  if (land.length > 3) land[3].insertAdjacentHTML("afterend", datXanh); else bdSvg.insertAdjacentHTML("afterbegin", datXanh);
  bdSvg.insertAdjacentHTML("beforeend", tuyet + may);
  var q = function (s) { return bdSvg.querySelectorAll(s); };
  var mayEl = bdSvg.querySelector(".may");

  // va li mở + chồng tất trên bàn
  var VL = { x: -760, z: 70 };   // va li trước chân kệ, bên trái Wob: mọi chuyển động sau 1,2 s nằm ở x < 1100
  var vaLi = api.cut(the, 200, 150, api.vaLiSVG(), { pos: { x: VL.x, y: TY, z: VL.z }, f: api.F.AM_NHO });
  var tat = api.cut(the, 130, 100, api.chongTatSVG(), { pos: { x: -470, y: TY, z: 60 }, f: api.F.AM_NHO });
  var tatAm = tat.svg.querySelector(".tat-am");
  gsap.set(tatAm, { opacity: 0 });

  // camera khoá cứng
  api.camSet(R, null, { cx: -600, cy: -170, cz: -200, k: -150, rx: -8, ry: 3 });
  dt.endScreen(0.05);

  // ---------------------------------------------------------------- khung 0: chìa trong tay; 0,6 treo lên đinh riêng
  w.holdL.insertAdjacentHTML("beforeend", '<g class="ck">' + api.chiaKirunaSVG({ dai: 130 }) + "</g>");
  var ck = w.holdL.querySelector(".ck");
  var A0 = 40, h0 = api.handWorld("L", A0);
  api.armSet(w, "L", A0); api.armSet(w, "R", -8);
  gsap.set(ck, api.holdPose("L", A0, h0[0], h0[1], -90, 1.1));
  api.quaySet(w, -0.4);
  api.look(w, 0, -12, -6, 0.01);
  var A1 = 140, h1 = api.handWorld("L", A1);
  api.armTo(w, "L", 0.25, 0.35, A1, "power2.out");
  tl.to(ck, Object.assign(api.holdPose("L", A1, h1[0], h1[1], 0, 1.1), { duration: 0.35, ease: "power2.out" }), 0.25);
  var tay = api.wobTheGioi(w, h1[0], h1[1]);
  tl.set(ck, { opacity: 0 }, 0.6);
  dt.datLen(I_CK, 0.6, { x: tay.x, y: tay.y, z: w.z });
  api.sfx("ting", 1.2, 0.25);
  api.armTo(w, "L", 1.3, 0.35, 0, "power2.inOut");
  api.look(w, 0.7, -14, -10, 0.2);
  // "postcard": bưu thiếp nghiêng tựa vào chìa
  var tPost = tu.postcard || 3.88;
  tl.to(dt.mon[I_BT].rung, { rotation: 7, transformOrigin: "50% 100%", duration: 0.5, ease: "back.out(2)" }, tPost);
  api.look(w, tPost - 0.1, -16, -10, 0.2);
  api.lids(w, tPost + 0.3, 0.35, 0.2); api.lids(w, 5.3, 0, 0.15);
  // "rattles": khuỷu tay chạm kệ, lọ opal rung, Wob liếc
  var tRat = tu.rattles || 7.60;
  api.armTo(w, "L", tRat - 0.25, 0.15, 70, "power2.out");
  api.armTo(w, "L", tRat - 0.1, 0.2, 20, "power2.inOut");
  dt.rung(I_LO, tRat, 0.7);
  api.sfx("bonk", tRat - 0.1, 0.2);
  api.look(w, tRat + 0.05, -16, -16, 0.15);
  api.look(w, tRat + 0.9, 0, 2, 0.2);
  // "Next,": bản đồ mở, ghim mới phía bắc (tuyết), ghim trống rung ở đất xanh ấm phía đông, mây mưa
  var tNext = tu.next || 9.06;
  tl.set(dt.banDo, { opacity: 1 }, tNext - 0.05);
  tl.fromTo(dt.banDo, { scaleX: 0 }, { scaleX: BDK, duration: 0.45, ease: "back.out(1.4)", immediateRender: false }, tNext - 0.05);
  dt.camGhim(tNext + 0.4);
  api.sfx("drop", tNext + 0.4, 0.4);
  q(".tuyet").forEach(function (el, k) {
    tl.to(el, { opacity: 1, duration: 0.2 }, tNext + 0.45 + k * 0.08);
    tl.fromTo(el.querySelector(".tr"), { y: -6 }, { y: 8, duration: 4.5, ease: "sine.inOut", immediateRender: false }, tNext + 0.45 + k * 0.08);
  });
  dt.ghimRung(tNext + 0.7, 1.2, { matTroi: false });
  tl.to(mayEl, { opacity: 1, duration: 0.3 }, tNext + 0.8);
  api.quay(w, tNext - 0.2, -0.45, 0.25); api.look(w, tNext - 0.1, -14, -12, 0.2);
  // nhặt chồng tất, nhét vào va li đúng "sock"
  var tSock = tu.sock || 10.57;
  // bước sang trái tới chồng tất (sau khi bản đồ mở), nhặt, thả cả chồng vào va li đúng "sock"
  api.walk(w, 9.5, 9.85, -300, -10, { face: -0.5, endFace: -0.35, step: 0.17 });
  api.look(w, 9.86, -10, 16, 0.12);
  api.armTo(w, "L", 9.88, 0.16, 30, "power2.out");
  var hT = api.handWorld("L", 30), tayT = api.wobTheGioi(w, hT[0], hT[1]);
  tl.to(tat, { x: tayT.x - 40, y: tayT.y + 40, z: w.z + 20, duration: 0.22, ease: "power2.out" }, 10.02);
  api.armTo(w, "L", 10.2, 0.25, 75, "power2.inOut");
  api.look(w, 10.2, -16, 14, 0.15);
  tl.to(tat, { x: VL.x + 40, z: VL.z + 4, duration: 0.3, ease: "power2.inOut" }, 10.24);
  tl.to(tat, { y: TY - 80, duration: 0.33, ease: "power2.in" }, 10.24);   // đáy chồng tất ngồi trên mép lót va li, trước nắp
  api.sfx("drop", tSock, 0.45);
  tl.fromTo(vaLi, { scaleY: 1 }, { scaleY: 0.94, duration: 0.06, yoyo: true, repeat: 1, immediateRender: false }, tSock);
  api.armTo(w, "L", tSock + 0.1, 0.3, 4, "power2.inOut");
  // 11,57 một giọt mưa từ mây rơi rất chậm xuống chiếc tất trên cùng
  var tI = tu.hear ? tu.hear - 0.19 : 11.57;
  var giotRoi = api.cut(the, 40, 50, '<path d="M 20 4 C 28 18 34 28 34 36 C 34 46 6 46 6 36 C 6 28 12 18 20 4 Z" fill="#9fd0e6" stroke="' + C.INK + '" stroke-width="3"/>', { pos: { x: -560, y: TY - 600, z: -260 }, ax: 20, ay: 46, f: api.F.AM_NHO });
  gsap.set(giotRoi, { opacity: 0 });
  var DR0 = { x: -720 + (0.86 - 0.5) * BW, y: TY - 524 - (BH - 0.76 * BH + 70) * BDK, z: -300 }, DR1 = { x: VL.x + 45, y: TY - 150, z: VL.z + 6 };
  var tRoi = tI, tCham = 12.95;
  api.moiKhung(function (t) {
    if (t < tRoi || t > tCham + 0.15) { gsap.set(giotRoi, { opacity: 0 }); return; }
    var u = Math.min(1, (t - tRoi) / (tCham - tRoi)), e = u * u * (3 - 2 * u);
    gsap.set(giotRoi, { opacity: t > tCham ? 1 - (t - tCham) / 0.15 : 1, x: DR0.x + (DR1.x - DR0.x) * e + 18 * Math.sin(u * Math.PI * 2), y: DR0.y + (DR1.y - DR0.y) * u, z: DR0.z + (DR1.z - DR0.z) * e });
  });
  tl.to(tatAm, { opacity: 1, duration: 0.3 }, tCham);
  api.look(w, tRoi + 0.2, -12, -14, 0.3);
  api.look(w, 12.4, 6, 16, 0.4);
  api.lids(w, tCham + 0.1, 0.45, 0.2);                             // tỉnh bơ
  // mưa trượt chậm trên kính (x < 1100)
  api.moiKhung(function (t) { giot.forEach(function (el, k) { var p = ((t * (0.07 + 0.02 * k) + k * 0.23) % 1); el.setAttribute("transform", "translate(0 " + (p * 120).toFixed(1) + ")"); }); });
  // ---------------------------------------------------------------- hết lời: quay phải, chỉ sang hai khung trống, thở
  api.walk(w, 13.25, 13.75, -220, -20, { face: 0.4, endFace: 0.5, step: 0.17 });   // về chỗ cũ, trả lại thẻ TRISTAN DA CUNHA
  var tEnd = 13.95;
  api.quay(w, tEnd - 0.1, 0.6, 0.25); api.look(w, tEnd - 0.05, 14, -4, 0.15);
  api.lids(w, tEnd, 0, 0.12);
  api.armTo(w, "R", tEnd, 0.3, -62, "back.out(2)");
  api.nhayCham(w, tEnd + 1.2, 0);
  api.blink(w, tEnd + 2.8, 0);
  api.blink(w, tEnd + 4.6, 0);

  var lop = data.lop; data.lop = "hien-tai"; api.khauHinh(w); data.lop = lop;
  api.gatDau(w, { bo: [[13.0, DUR]] });
  api.breathe(w, 0.4, DUR);
  // chuyển động nhỏ liên tục ở nửa trái (x < 1100) tới khung cuối (như tập 5 d51): quầng đèn ấm thở, Wob nhún và lắc nhẹ,
  // chìa KIRUNA đung đưa trên đinh. Camera và vùng end screen (x ≥ 1150) vẫn đứng yên.
  var amDen = api.div("", api.root, "position:absolute;left:0;top:0;width:1000px;height:1080px;pointer-events:none;" +
    "background:radial-gradient(ellipse 620px 560px at 430px 360px, rgba(255,206,130,.34), rgba(255,206,130,.12) 55%, rgba(255,206,130,0) 80%);");
  amDen.setAttribute("data-layout-allow-occlusion", "");
  var ckRung = dt.mon[I_CK].rung, Y_W = gsap.getProperty(w.pos, "y");
  api.moiKhung(function (t) {
    gsap.set(amDen, { opacity: 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI * 0.45)) });
    var tt = Math.max(0, t - 0.6);
    gsap.set(w.pos, { y: Y_W - 10 * (0.5 - 0.5 * Math.cos(tt * 2 * Math.PI * 0.85)), rotationZ: 3 * Math.sin(tt * 2 * Math.PI * 0.42) });
    if (t > 1.6) gsap.set(ckRung, { rotation: 3 * Math.sin((t - 1.6) * 2 * Math.PI * 0.55), svgOrigin: "46 46" });
  });
};
