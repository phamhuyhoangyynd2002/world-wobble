/* Đoạn d26 (diorama, hiện tại, 47,5 s) – cắt cứng về bàn kỷ vật giữa tập, NGHIÊM: không gag, không sfx, Wob mặt trầm
 * (miệng không bao giờ cong cười: khẩu hình X đổi thành N), đèn bàn dịu và lạnh hơn. Không có khung đứng yên: camera luôn đẩy
 * rất chậm (≈ 0,15 %/khung) giữa các cú lướt.
 * Ba lô khổng lồ ướt đặt sau mép xa của sổ, nghiêng về phía trang; giọt nước nhỏ xuống. Sổ lật lần lượt các trang phác hoạ (toàn bộ
 * đặt ở trang PHẢI để tay Wob, ngồi trên chồng sách cạnh mép phải sổ, luôn trong khung khi cận trang):
 *   hòn đảo (đầu đoạn) → ô cửa có vạch nước → mặt cắt "~2 m · ~6.5 ft" → sơ đồ quần đảo phác tay "~45% · 2014" (vệt xói tô dần,
 *   chấm đảo nhỏ còn vòng nét đứt) → mặt cắt 2050 có thước dựng, nhãn hai dòng "up to ~30 cm · ~1 ft" / "2050" → bồn tắm có cái bàn
 *   (vẽ dần, nước dâng) → lật lại hòn đảo: giọt nước từ ba lô rơi đúng lên hình đảo, mực loang → gấp sổ, tay đặt lên ba lô, lặng →
 *   camera lao vào bìa sổ, phủ giấy #EFE3C8.
 * Nhãn chỉ hiện khi camera cận trang (trang ≥ 60 % bề rộng khung).
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {}, ds = [];
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); ds.push([k, w.start]); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var tuSau = function (k, t0, mac) { for (var i = 0; i < ds.length; i++) if (ds[i][0] === k && ds[i][1] >= t0) return ds[i][1]; return mac; };
  var chu = data.chu_tren_do_vat; // "~2 m · ~6.5 ft", "~45% · 2014", "up to ~30 cm · ~1 ft · 2050"

  // ---------------------------------------------------------------- trang phác hoạ (hệ trang 500×600, y 0 = mép xa)
  var SO = { x: -60, z: -240, w: 500, d: 600 }, PW = SO.w, PD = SO.d;
  var P = {
    dao: api.trangDaoVeSVG(PW, PD, { cx: 300, cy: 104, loang: [405, 96], seed: 7 }),
    cua: api.trangCuaNhaSVG(PW, PD),
    mc: api.trangMatCatSVG(PW, PD, { mucNuoc: 400 }),
    qd: api.trangQuanDaoSVG(PW, PD, { daoNho: [262, 262],
      dao: [[150, 230, 68, 42, 3], [320, 200, 58, 34, 5], [390, 320, 50, 32, 8], [190, 360, 62, 38, 11], [110, 450, 46, 30, 13], [330, 450, 60, 34, 17]] }),
    mc2: api.trangMatCatSVG(PW, PD, { mucNuoc: 420 }),
    bon: api.trangBonTamSVG(PW, PD)
  };
  var ten = ["dao", "cua", "mc", "qd", "mc2", "bon"];
  var biaTrong = sk("M 60 140 q 30 -16 60 0 t 60 0 t 60 0 M 90 200 q 30 -16 60 0 t 60 0", 4, "#4f8fa8") + fp("M 120 330 L 260 330 L 240 360 L 140 360 Z", "#c99a62", 4) + sk("M 190 330 L 190 260 M 190 266 L 236 316 L 190 316", 3) + sk("M 80 470 C 160 440 260 500 380 460", 3, C.INK, ' stroke-dasharray="2 10"');
  var ban = api.dungBan({ hop: { x: -620, z: -480 }, wob: { x: 700, z: -430, s: 0.9 }, so: { x: SO.x, z: SO.z, w: PW, d: PD, moSan: true, biaTrong: biaTrong } });
  var w = ban.wob, so = ban.so, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w);
  w.pack.style.display = "none"; w.strap.style.display = "none";
  var trang = so.veTrang(ten.map(function (k) { return '<g class="p-' + k + '"' + (k === "dao" ? "" : ' opacity="0"') + ">" + P[k] + "</g>"; }).join(""));
  var pg = {}; ten.forEach(function (k) { pg[k] = trang.svg.querySelector(".p-" + k); });
  var hienTrang = function (k, t) { ten.forEach(function (n) { tl.set(pg[n], { opacity: n === k ? 1 : 0 }, t); }); };
  // tờ lật: mặt trước = trang cũ (trạng thái cuối), mặt sau = mặt trong bìa (phác không chữ)
  var la = function (k, ben) { var to = so.themTo(P[k], { ben: ben || "phai" }); to.hien(null, false); return to; };
  var lat = function (to, t, sang, trangMoi, d) {
    d = d || 0.6;
    to.hien(t, true);
    if (sang === "trai") { hienTrang(trangMoi, t); to.lat(t, d, "trai"); to.hien(t + d, false); }
    else { to.lat(t, d, "phai"); hienTrang(trangMoi, t + d); to.hien(t + d, false); }
  };
  // chồng sách Wob ngồi + dịu đèn, ánh lạnh
  // cục tẩy thấp Wob ngồi (mặt Wob thấp, không lọt vùng logo góc phải trên, không cắt đầu khi cận trang)
  var sach = api.cut(the, 150, 40, fp("M 8 8 L 142 6 L 144 36 L 6 38 Z", "#e9a3a0", 5) + fp("M 92 7 L 142 6 L 144 36 L 94 37 Z", "#5a9fb8", 5), { pos: { x: 530, y: TY, z: -330 }, f: api.F.AM_NHO });
  ban.diuDen(null, 0, 0.3);
  api.div("dio-ovl", ban.stage, "background:linear-gradient(rgba(70,100,140,.12), rgba(40,60,90,.16));");

  // ba lô khổng lồ ướt sau mép xa của sổ, nghiêng về phía trang
  var BL = { x: 470, z: -585, s: 0.86 };
  var balo = api.cut(the, 300, 470, '<g>' + api.baLoKhongLoSVG({ uot: 1 }) + "</g>", { pos: { x: BL.x, y: TY, z: BL.z, scale: BL.s }, ay: 440, f: api.F.AM });
  gsap.set(balo, { rotationX: 0, transformOrigin: "50% 100%" });
  var giot = api.giotNuoc(the, BL.x - 60, TY - 300, -470);
  gsap.set(giot, { opacity: 0 });
  var giot2 = api.giotNuoc(the, BL.x + 30, TY - 200, -500);
  gsap.set(giot2, { opacity: 0 });

  // ---------------------------------------------------------------- mặt trầm: khẩu hình không có miệng cười
  (function () {
    var dau = "N";
    data.loi.forEach(function (L) {
      (L.khau_hinh || []).forEach(function (c) {
        if (c.end <= 0 || c.start >= DUR) return;
        var v = c.value === "X" ? "N" : c.value === "D" ? "C" : c.value;
        if (c.start <= 0) dau = v; else api.mouth(w, c.start, v);
      });
    });
    api.mouthSet(w, dau);
    api.mouth(w, 46.0, "N");
  })();
  api.lidsSet(w, 0.38);
  api.quaySet(w, -0.35);
  gsap.set([w.pupL, w.pupR], { x: -8, y: 8 });

  // ---------------------------------------------------------------- camera (chỉ lướt + đẩy rất chậm, không khung đứng yên)
  var day = function (t0, t1, dk) { api.camTo(R, t0, t1 - t0, { k: R.st.k + dk }, "sine.inOut"); };
  var CAN = { cx: 330, cy: 130, cz: -270, k: 600, rx: -52, ry: 0 };       // cận trang phải (trang ≈ 0,62–0,66 bề rộng khung)
  var VUA = { cx: 300, cy: 150, cz: -280, k: 520, rx: -36, ry: 0 };
  api.camSet(R, null, { cx: 230, cy: 40, cz: -320, k: 150, rx: -16, ry: 6 });
  day(0, 5.0, 75);
  api.camTo(R, 5.0, 0.8, { cx: 300, cy: 120, cz: -300, k: 380, rx: -30, ry: 2 }, "power2.inOut");
  day(5.8, 12.2, 95);
  api.camTo(R, 12.2, 0.8, CAN, "power2.inOut");
  day(13.0, 18.2, 55);
  api.camTo(R, 18.2, 0.5, VUA, "power2.inOut");
  api.camTo(R, 18.9, 0.6, CAN, "power2.inOut");
  day(19.5, 29.1, 85);
  api.camTo(R, 29.1, 0.5, VUA, "power2.inOut");
  api.camTo(R, 30.2, 0.6, CAN, "power2.inOut");
  day(30.8, 35.4, 45);
  api.camTo(R, 35.4, 0.6, { cx: 330, cy: 200, cz: -260, k: 600, rx: -40, ry: 0 }, "power2.inOut");
  day(36.0, 39.2, 40);
  api.camTo(R, 39.2, 0.8, { cx: 330, cy: 120, cz: -420, k: 560, rx: -34, ry: 0 }, "power2.inOut");
  day(40.0, 44.6, 60);
  api.camTo(R, 44.6, 0.9, { cx: 260, cy: 110, cz: -320, k: 330, rx: -26, ry: 3 }, "power2.inOut");
  day(45.5, 46.95, 22);
  api.laoVao(R, 46.95, 0.5, so.diemTrang(PW / 2, 0), 1110, "power3.in");
  api.raGiay(null, 0.45);

  // ---------------------------------------------------------------- 0–5.4 đặt ba lô ướt xuống, ngồi xuống
  var tSet = tu.set || 2.31;
  gsap.set(balo, { y: TY - 150, x: BL.x + 90, z: BL.z + 60 });
  api.armSet(w, "L", 150); api.armSet(w, "R", -120);
  tl.to(balo, { y: TY, x: BL.x, z: BL.z, duration: 0.9, ease: "power2.inOut" }, tSet - 0.5);
  tl.to(balo, { rotationX: -16, duration: 0.6, ease: "power2.out" }, tSet + 0.4);
  api.armTo(w, "L", tSet - 0.5, 0.9, 110, "power2.inOut");
  api.armTo(w, "R", tSet - 0.5, 0.9, -40, "power2.inOut");
  api.armTo(w, "L", tSet + 0.6, 0.4, 0, "power2.inOut");
  api.armTo(w, "R", tSet + 0.6, 0.4, 0, "power2.inOut");
  api.look(w, tSet - 0.4, -12, -10, 0.3);
  // giọt nước đầu tiên ("still drying") rơi xuống mép xa trang
  var tDry = tu.drying || 4.64;
  api.roiGiot(giot2, tDry - 0.3, TY - 200, TY - 8, 0.36);
  api.look(w, tDry - 0.25, -10, 4, 0.3);
  // tới chồng sách rồi ngồi
  api.walk(w, 3.0, 4.3, 530, -320, { face: -0.4, endFace: -0.35, step: 0.32 });
  tl.to(w.pos, { y: TY - 32, duration: 0.3, ease: "power2.out" }, 4.45);
  tl.to(w.lift, { scaleY: 0.92, scaleX: 1.05, duration: 0.12, ease: "power2.out" }, 4.75);
  tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.3, ease: "sine.out" }, 4.87);
  tl.to([w.legL, w.legR], { y: -10, duration: 0.3 }, 4.5);

  // ---------------------------------------------------------------- lật trang: tay trái quét qua trang
  var quet = function (t, d, nguoc) {
    api.armTo(w, "L", t - 0.15, 0.2, nguoc ? 140 : 60, "power2.out");
    api.armTo(w, "L", t + 0.05, d * 0.7, nguoc ? 60 : 140, "sine.inOut");
    api.armTo(w, "L", t + d * 0.75, 0.35, 30, "power2.inOut");
    api.look(w, t - 0.1, -14, 6, 0.2);
  };
  var L1 = la("dao"), L2 = la("cua"), L3 = la("mc"), L4 = la("qd"), L5 = la("mc2"), L6 = la("dao", "trai");
  // trạng thái cuối trên mặt trước tờ lật
  (function () {
    var q = function (to, c) { return to.truoc.querySelectorAll(c); };
    gsap.set(q(L4, ".xoi"), { attr: { "stroke-dashoffset": 0 } }); gsap.set(q(L4, ".dao-nho"), { opacity: 0 }); gsap.set(q(L4, ".dao-vong"), { opacity: 1 });
    gsap.set(q(L5, ".muc-moi"), { opacity: 1 }); gsap.set(q(L5, ".nuoc-mc"), { y: -16 });
  })();
  var tFor = tu["for"] || 5.39;
  lat(L1, tFor - 0.1, "trai", "cua"); quet(tFor - 0.1, 0.6);
  var tThese = tu.these || 12.85;
  lat(L2, tThese - 0.55, "trai", "mc"); quet(tThese - 0.55, 0.6);
  var tLocal = tu.local || 18.98;
  lat(L3, tLocal - 0.6, "trai", "qd"); quet(tLocal - 0.6, 0.6);
  var tGlobal = tu.global || 29.71;
  lat(L4, tGlobal - 0.4, "trai", "mc2"); quet(tGlobal - 0.4, 0.6);
  var tImg = tu.imagine || 35.96;
  lat(L5, tImg - 0.5, "trai", "bon"); quet(tImg - 0.5, 0.6);
  var tHam = tu.hammock || 39.88;
  gsap.set(L6.el, { rotationY: -180 });
  lat(L6, tHam - 0.5, "phai", "dao"); quet(tHam - 0.5, 0.6, true);

  // ---------------------------------------------------------------- 5.4–12.6 ô cửa có vạch nước (không người)
  api.look(w, 7.0, -16, 10, 0.4);
  api.lids(w, 8.4, 0.45, 0.4);
  tl.fromTo(pg.cua.querySelector(".muc-cua"), { y: 0 }, { y: -6, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 3, immediateRender: false }, 6.4);

  // ---------------------------------------------------------------- 12.85–18.6 mặt cắt: ngón tay dò đường mực nước; nhãn khi cận
  // nhãn số: thẻ giấy ĐỨNG THẲNG trên trang (không nghiêng theo phối cảnh trang), chữ đậm; chỉ bật lên khi camera cận trang
  var theNhan = function (chuDu, dong, co, rong) {
    var n = dong ? dong.length : 1, cao = Math.round(co * 1.2 * n + co * 0.55);
    var inner = fp("M 4 4 L " + (rong - 4) + " 4 L " + (rong - 4) + " " + (cao - 4) + " L 4 " + (cao - 4) + " Z", "#f4ead2", 4) +
      (dong ? api.txtDong(rong / 2, Math.round(co * 1.02), co, 900, chuDu, dong, C.INK, "", co * 1.18) : api.txt(rong / 2, Math.round(co * 1.02), co, 900, chuDu, C.INK));
    var p = so.diemTrang(250, -PD / 2 + 150);
    var el = api.cut(the, rong, cao, inner, { pos: { x: p.x, y: p.y, z: p.z }, f: api.F.AM_NHO });
    gsap.set(el, { scaleY: 0, opacity: 0, rotationX: 50 }); // ngả ra sau cho mặt thẻ nhìn thẳng vào camera cận (rx −52)
    return el;
  };
  var bat = function (el, t0, t1) {
    tl.set(el, { opacity: 1 }, t0);
    tl.fromTo(el, { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, t0);
    tl.to(el, { scaleY: 0, duration: 0.18, ease: "power2.in" }, t1 - 0.18);
    tl.set(el, { opacity: 0 }, t1);
  };
  var nhanMC = theNhan(chu[0], null, 33, 340), nhanQD = theNhan(chu[1], null, 33, 310), nhan2 = theNhan(chu[2], ["up to ~30 cm · ~1 ft", "2050"], 33, 440);
  var tTwo = tu.two || 14.29;
  bat(nhanMC, tTwo - 0.3, 18.15);
  api.armTo(w, "L", 13.6, 0.4, 72, "power2.inOut");
  tl.fromTo(w.armL, { rotation: 72 }, { rotation: 92, svgOrigin: "86 212", duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: 2, immediateRender: false }, 14.0);
  api.armTo(w, "L", 18.0, 0.3, 30, "power2.inOut");
  api.look(w, 13.4, -18, 12, 0.3);
  api.lids(w, 15.8, 0.38, 0.3);

  // ---------------------------------------------------------------- 18.98–29.6 quần đảo: bút chì tô vệt xói; chấm đảo nhỏ biến mất
  var tTw = tu.twenty || 19.81;
  bat(nhanQD, tTw - 0.3, 29.05);
  w.holdL.insertAdjacentHTML("beforeend", '<g class="but" opacity="0"><g transform="scale(.8)">' + api.butChiSVG() + "</g></g>");
  var but = w.holdL.querySelector(".but");
  var butPose = function (arm) { return api.camDai("L", arm, 200, 30); };
  tl.set(but, Object.assign({ opacity: 1 }, butPose(30)), 21.0);
  api.armTo(w, "L", 21.4, 0.4, 70, "power2.inOut");
  tl.to(but, Object.assign(butPose(70), { duration: 0.4, ease: "power2.inOut" }), 21.4);
  var tEro = tu.erosion || 22.69;
  var xoi = pg.qd.querySelectorAll(".xoi");
  Array.prototype.forEach.call(xoi, function (x, i) { tl.to(x, { attr: { "stroke-dashoffset": 0 }, duration: 0.6, ease: "power1.inOut" }, tEro - 0.2 + i * 0.5); });
  for (var i = 0; i < 6; i++) {
    var a = 70 + (i % 2 ? 16 : 0);
    api.armTo(w, "L", tEro - 0.2 + i * 0.5, 0.5, 86 - (i % 2 ? 16 : 0), "sine.inOut");
    tl.to(but, Object.assign(butPose(86 - (i % 2 ? 16 : 0)), { duration: 0.5, ease: "sine.inOut" }), tEro - 0.2 + i * 0.5);
  }
  var tOne = tu.one || 26.74, tDis = tu.disappeared || 28.23;
  api.look(w, tOne, -10, 14, 0.3);
  tl.to(pg.qd.querySelector(".dao-nho"), { opacity: 0, duration: 1.2, ease: "sine.inOut" }, tDis - 0.6);
  tl.to(pg.qd.querySelector(".dao-vong"), { opacity: 1, duration: 0.5, ease: "sine.inOut" }, tDis + 0.2);
  // đặt bút chì xuống, lặng ~1 s
  var butBan = api.cut(the, 180, 30, '<g transform="translate(90 15) rotate(8)">' + api.butChiSVG() + "</g>", { pos: { x: 470, y: TY, z: -250 }, ay: 26, f: api.F.AM_NHO });
  gsap.set(butBan, { opacity: 0 });
  api.armTo(w, "L", 28.7, 0.35, 20, "power2.inOut");
  tl.to(but, Object.assign(butPose(20), { duration: 0.35, ease: "power2.inOut" }), 28.7);
  tl.set(but, { opacity: 0 }, 29.05); tl.set(butBan, { opacity: 1 }, 29.05);
  api.lids(w, 28.9, 0.5, 0.4);

  // ---------------------------------------------------------------- 29.7–35.4 mặt cắt 2050: dựng thước, mực nước nhích lên một nấc
  var thuoc = api.cut(the, 46, 300, api.thuocKeSVG(300), { pos: { x: 412, y: TY, z: -230, scale: 0.9 }, f: api.F.AM_NHO });
  gsap.set(thuoc, { opacity: 0 });
  var tRise = tu.rise || 31.5, tThirty = tu.thirty || 32.33;
  tl.set(thuoc, { opacity: 1 }, 30.6);
  tl.fromTo(thuoc, { y: TY - 120, rotationZ: -12 }, { y: TY, rotationZ: 0, duration: 0.45, ease: "power2.out", immediateRender: false }, 30.6);
  api.armTo(w, "L", 30.35, 0.3, 75, "power2.out");
  api.armTo(w, "L", 31.1, 0.35, 30, "power2.inOut");
  var mm = pg.mc2.querySelector(".muc-moi"), nuoc2 = pg.mc2.querySelector(".nuoc-mc");
  tl.to(mm, { opacity: 1, duration: 0.3 }, tRise - 0.1);
  tl.to(nuoc2, { y: -16, duration: 0.8, ease: "power2.inOut" }, tThirty - 0.2);
  bat(nhan2, tThirty - 0.3, 35.35);
  api.look(w, 31.3, -18, 10, 0.3);
  tl.set(thuoc, { opacity: 0 }, tImg - 0.5);

  // ---------------------------------------------------------------- 35.96–39.4 bồn tắm: vẽ dần bằng bút chì, nước dâng (tông trầm)
  tl.set(but, Object.assign({ opacity: 1 }, butPose(30)), tImg + 0.1); tl.set(butBan, { opacity: 0 }, tImg + 0.1);
  api.veDan(pg.bon, tImg + 0.2, 1.9);
  for (var j = 0; j < 5; j++) {
    api.armTo(w, "L", tImg + 0.2 + j * 0.4, 0.4, j % 2 ? 66 : 84, "sine.inOut");
    tl.to(but, Object.assign(butPose(j % 2 ? 66 : 84), { duration: 0.4, ease: "sine.inOut" }), tImg + 0.2 + j * 0.4);
  }
  var tTap = tu.tap || 38.44;
  tl.to(pg.bon.querySelector(".tia-voi"), { opacity: 1, duration: 0.2 }, tTap - 0.1);
  var nb = pg.bon.querySelector(".nuoc-bon");
  gsap.set(nb, { scaleY: 0.12, transformOrigin: "50% 100%" });
  tl.to(nb, { scaleY: 0.78, duration: 1.4, ease: "sine.inOut" }, tTap);
  api.armTo(w, "L", 38.3, 0.35, 30, "power2.inOut");
  tl.to(but, Object.assign(butPose(30), { duration: 0.35 }), 38.3);
  tl.set(but, { opacity: 0 }, 38.68); tl.set(butBan, { opacity: 1 }, 38.68);

  // ---------------------------------------------------------------- 39.4–44.8 lại hòn đảo: giọt nước rơi đúng lên hình đảo, mực loang
  var tOnce = tuSau("once", 40.5, 41.0);
  var dich = so.diemTrang(405, -PD / 2 + 96);
  gsap.set(giot, { x: dich.x - 15, z: dich.z });
  api.roiGiot(giot, tOnce - 0.45, TY - 300, dich.y - 26, 0.42);
  var loang = pg.dao.querySelector(".loang");
  gsap.set(loang, { scale: 0.4, transformOrigin: "50% 50%" });
  tl.to(loang, { opacity: 1, scale: 1.7, duration: 1.1, ease: "power2.out" }, tOnce - 0.02);
  api.look(w, tOnce - 0.5, -16, -6, 0.3);
  api.look(w, tOnce, -14, 6, 0.4);
  api.lids(w, tOnce + 0.6, 0.55, 0.5);
  api.lids(w, 43.6, 0.4, 0.4);

  // ---------------------------------------------------------------- 44.86–47.5 gấp sổ, tay đặt lên ba lô ướt, nhìn xuống, lặng
  var tCh = tu.changed || 45.04;
  so.dongBia(tCh - 0.15, 0.9);
  api.armTo(w, "L", tCh - 0.3, 0.3, 140, "power2.out");
  api.armTo(w, "L", tCh + 0.2, 0.6, 50, "sine.inOut");
  tl.to(w.pos, { y: TY, duration: 0.2, ease: "power2.in" }, 45.75);
  tl.to([w.legL, w.legR], { y: 0, duration: 0.2 }, 45.75);
  api.walk(w, 45.95, 46.55, 610, -470, { face: -0.6, endFace: -0.6, step: 0.2, keepL: true });
  api.armTo(w, "L", 46.3, 0.35, 150, "power2.inOut");   // tay đặt lên ba lô ướt
  api.look(w, 46.0, -10, 16, 0.4);
  api.lids(w, 46.1, 0.55, 0.4);

  // ---------------------------------------------------------------- liên tục
  api.breathe(w, 0, DUR - 0.2);
  api.blinks(w, 2.0, 44.5, [[13.4, 18.2], [22.5, 26.0], [40.5, 42.2]], null);
};
