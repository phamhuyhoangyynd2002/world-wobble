/* Đoạn d33 (diorama, đuôi tập, 20 s) – dữ liệu nạp vào api.duoiTap (templates/hoat-hinh/_chung/mo-ket/duoi-tap.js).
 * Bàn kỷ vật (cùng bàn d01), CAMERA KHOÁ CỨNG cả đoạn, cả cảnh dồn vào nửa trái (dịch tâm phối cảnh như Whittier d30).
 * Kệ: lọ opal (COOBER PEDY), tờ lịch hầm (WHITTIER), bình xịt MỚI (SANTA CRUZ / DEL ISLOTE, tem nguyên) tầng trên; tủ đông có cá
 * (OYMYAKON) tầng dưới. Thẻ kệ to, chữ ≥ 45 px. Ba lô khổng lồ nằm dưới, bên trái, khuất nửa sau tấm bản đồ.
 * 0–1,2 s: hai khung + vòng end screen bật lên (khung y 160–475, 500–815; vòng tâm (1460, 922)) rồi đứng yên tuyệt đối tới hết;
 * sau 1,2 s vùng x ≥ 1150 không có gì chuyển động, không chữ.
 * Nhịp: đặt bình xịt lên kệ (lọ opal kêu lách cách) → liếc tủ đông, đuôi cá vẫy → "Next:" bản đồ giấy mở, ghim đỏ (không nhãn) cắm
 * ở bờ bắc mảng lục địa dưới, ghim trống không nhãn rung giữa vùng biển phía nam (KHÔNG mặt trời) → đeo ba lô bé xíu, chỉ tay sang
 * hai khung trống (bàn tay x ≤ 1100), chớp mắt, thở tới hết. Không mờ đen.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // SANTA CRUZ DEL ISLOTE, WHITTIER, COOBER PEDY, OYMYAKON

  var ban = api.dungBan({ wob: { x: -220, z: -20, s: 0.8 }, hop: { x: -40, z: -560 }, ongBut: false });
  var w = ban.wob, R = ban.rig, TY = ban.TY, the = ban.the;
  // lens shift: tâm phối cảnh ở x 560 trên khung, nửa phải để trống cho end screen
  R.stage.style.left = "-880px"; R.stage.style.right = "-80px"; R.cam.style.left = "1440px";
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";
  // ba lô khổng lồ dưới bên trái, khuất nửa sau bản đồ
  api.cut(the, 300, 470, api.baLoKhongLoSVG({ uot: 0.3 }), { pos: { x: -1170, y: TY, z: -230, scale: 0.95, rotationZ: -6 }, ay: 440, f: api.F.AM });

  var CO = 55;
  var dt = api.duoiTap(ban, {
    ke: { x: -700, z: -300 },
    theCo: CO, theW: 300, matTroi: false,
    kyVat: [
      { the: chu[2], dong: ["COOBER", "PEDY"], ve: "loOpal", tang: 0, cho: 0, theDy: 104 },
      { the: chu[1], ve: "toLich", tang: 0, cho: 1, theW: 390, theDy: 178 },
      { the: chu[0], dong: ["SANTA CRUZ", "DEL ISLOTE"], ve: "binhXit", tang: 0, cho: 2, theW: 420, theDy: 104, moi: true },
      { the: chu[3], ve: "tuDong", tang: 1, cho: 0.001, theW: 400, theDy: 40 }
    ],
    banDo: { x: -790, z: -330, w: 520, h: 320 },
    ghimMoi: { u: 0.32, v: 0.6 }, ghimTrong: { u: 0.78, v: 0.86 },
    endScreen: { khung: [[1180, 160], [1180, 500]], vong: [1460, 922] }
  });
  gsap.set(dt.banDo, { y: TY - 524 }); // bản đồ dựng trên nóc kệ (nửa trái)
  // tủ đông nhỏ đứng trên nóc kệ cạnh bản đồ (khỏi bị thẻ tầng trên che), thẻ OYMYAKON dán trên cửa tủ
  gsap.set(dt.mon[3].el, { x: -420, y: TY - 524, z: -300 }); gsap.set(dt.mon[3].tag, { x: -400, y: TY - 520, z: -262 });
  var I_LO = 0, I_LICH = 1, I_XIT = 2, I_TU = 3;

  // camera khoá cứng
  api.camSet(R, null, { cx: -600, cy: -170, cz: -200, k: -150, rx: -8, ry: 3 });

  // end screen: bật lên trong 0–1,2 s rồi đứng yên
  dt.endScreen(0.05);

  // ---------------------------------------------------------------- 0.7–5.9 bình xịt lên kệ, lọ opal lách cách
  api.quaySet(w, -0.5);
  w.holdL.insertAdjacentHTML("beforeend", '<g class="xc"><g transform="scale(.85)">' + api.binhXitSVG() + "</g></g>");
  var xc = w.holdL.querySelector(".xc");
  var A0 = 120, h0 = api.handWorld("L", A0);
  api.armSet(w, "L", A0);
  gsap.set(xc, api.holdPose("L", A0, h0[0], h0[1] + 60, 0));
  gsap.set([w.pupL, w.pupR], { x: -12, y: -8 });
  var tSh = tu.shelf || 1.63;
  var tay = api.wobTheGioi(w, h0[0], h0[1] + 60);
  tl.set(xc, { opacity: 0 }, tSh - 0.6);
  dt.datLen(I_XIT, tSh - 0.6, { x: tay.x, y: tay.y, z: w.z });
  api.armTo(w, "L", tSh - 0.6, 0.5, 150, "power2.out");
  api.armTo(w, "L", tSh + 0.1, 0.35, 0, "power2.inOut");
  var tJar = tu.jar || 4.76;
  dt.rung(I_LO, tJar - 0.1, 0.6);
  api.sfx("bonk", tJar - 0.05, 0.15);
  api.look(w, tJar - 0.25, -16, -10, 0.2);
  api.quay(w, 5.9, 0, 0.3); api.look(w, 6.0, 0, 2, 0.2);
  // ---------------------------------------------------------------- 6.6–8.4 tủ đông: nắp hé, đuôi cá vẫy
  var tFish = tu.fish || 6.79;
  api.quay(w, tFish - 0.3, -0.6, 0.25); api.look(w, tFish - 0.25, -16, 6, 0.15);
  dt.nhuc(I_TU, tFish + 0.15);
  api.lids(w, tFish + 1.2, 0.45, 0.2); api.lids(w, 8.3, 0, 0.15);
  // ---------------------------------------------------------------- 8.47– "Next:" bản đồ, ghim mới, ghim trống rung (không mặt trời)
  // "next" đọc hai lần ("next to the tunnel…" 3,26 s và "Next:" 8,47 s): lấy lần sau mốc nhịp
  var tNext = (function () { var r = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (/^next/i.test(x.text) && x.start > 6 && r === null) r = x.start; }); }); return r === null ? 8.47 : r; })();
  dt.moBanDo(tNext - 0.05);
  api.sfx("whoosh", tNext - 0.05, 0.3);
  dt.camGhim(tNext + 0.5);
  api.sfx("drop", tNext + 0.5, 0.45);
  api.quay(w, tNext - 0.2, -0.45, 0.25); api.look(w, tNext - 0.1, -14, 14, 0.2);
  var tFar = tu.far || 10.01;
  dt.ghimRung(tFar - 0.2, 1.8, { matTroi: false });
  api.look(w, tFar, -8, 16, 0.2, 1.1);
  api.lids(w, 12.3, 0.3, 0.2); api.lids(w, 13.8, 0, 0.2);

  // ---------------------------------------------------------------- 14.57– ba lô bé xíu, chỉ sang hai khung trống, thở tới hết
  var tTak = tu.taking || 14.78;
  var pack = w.pack, strap = w.strap;
  api.baLoOliu(w);
  gsap.set(pack, { scale: 0.6, svgOrigin: "360 180" });
  tl.set([pack, strap], { display: "inline" }, tTak - 0.35);
  tl.fromTo(pack, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, tTak - 0.35);
  tl.fromTo(strap, { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, tTak - 0.3);
  api.hop(w, tTak - 0.05, 10, 0.25);
  var tBp = tu.backpack || 15.47;
  api.quay(w, tBp - 0.1, 0.6, 0.25); api.look(w, tBp - 0.05, 14, -4, 0.15);
  api.armTo(w, "R", tBp, 0.3, -62, "back.out(2)");
  tl.to(pack, { x: 26, duration: 0.2, ease: "power2.out" }, tBp + 0.3); // ba lô bé ló ra sau vai phải (quay đẩy nó khuất sau thân)
  api.nhayCham(w, tBp + 1.2, 0);
  api.blink(w, tBp + 2.8, 0);

  // khẩu hình: đuôi tập Wob vẫn đang kể; khauHinh chỉ chạy với hien-tai
  var lop = data.lop; data.lop = "hien-tai"; api.khauHinh(w); data.lop = lop;
  api.gatDau(w, { bo: [[15.6, DUR]] });
  api.breathe(w, 0.3, DUR);
  // chuyển động nhỏ liên tục ở nửa trái (kiem_dong_hinh: không đứng hình toàn khung), vùng end screen không đụng tới:
  // Wob nhún nhẹ, lắc lư; lọ opal nghiêng qua lại rất nhẹ
  var lo = dt.mon[I_LO].el;
  // ánh đèn bàn ấm "thở" chậm, chỉ phủ nửa trái (tắt hẳn trước x 1000; vùng end screen không đổi một điểm ảnh)
  var amDen = api.div("", api.root, "position:absolute;left:0;top:0;width:1000px;height:1080px;pointer-events:none;" +
    "background:radial-gradient(ellipse 620px 560px at 430px 360px, rgba(255,206,130,.34), rgba(255,206,130,.12) 55%, rgba(255,206,130,0) 80%);");
  api.moiKhung(function (t) {
    gsap.set(amDen, { opacity: 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI * 0.45)) });
    gsap.set(w.pos, { y: TY - 7 * (0.5 + 0.5 * Math.sin(t * 2 * Math.PI * 0.85)), rotationZ: 2 * Math.sin(t * 2 * Math.PI * 0.42) });
    gsap.set(lo, { rotationZ: 1.5 * Math.sin(t * 2 * Math.PI * 0.5) });
  });
  api.blinks(w, 0.8, 14.5, [[6.5, 8.5]], 0);
};
