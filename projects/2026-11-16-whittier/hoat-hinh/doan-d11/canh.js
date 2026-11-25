/* Đoạn d11 (diorama, hiện tại, 34,15 s): về nhà, bàn kỷ vật dưới đèn. Wob trải tờ lịch giờ hầm nhàu ra bàn, vuốt phẳng,
 * lật mặt sau trắng (camera đẩy chậm). "After the war…": Wob giơ phong bì (BEGICH TOWERS, tầng 14); đúng "floor number"
 * dải địa chỉ dài ra như cuộn giấy chảy xuống mép bàn. "The Hodge Building…": camera cẩu nhìn xuống tờ lịch, bút chì vẽ
 * khối 14 tầng ba phần nối liền, ghi HODGE rồi gạch, ghi BEGICH TOWERS, 1957 ở chân, tầng 14 vẽ cuối; "three sections" tô
 * từng khối. "nearly everyone…": vẽ người que vào từng ô, bút chì ngắn dần còn mẩu. Tẩy bớt vài người, ngập ngừng, ghi
 * ~270 (2020); về Wob nhún vai "estimates vary". Cuối: Wob đẩy tờ lịch, camera lao vào hình toà nhà → giấy phẳng.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK, DUR = api.DUR;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // BEGICH TOWERS, HODGE, 14, 1957, ~270 (2020)
  var BUT = "#5a5f63";

  // ---------------------------------------------------------------- bàn kỷ vật (bố cục mặc định của thư viện)
  var ban = api.dungBan({ wob: { x: 330, z: -90, s: 0.9 }, ongButNho: { x: 520, z: -260, s: 0.8 } });
  var w = ban.wob, R = ban.rig, TY = ban.TY, the = ban.the;
  api.matKhongRong(w); api.baLoOliu(w);

  // ---------------------------------------------------------------- tờ lịch nằm trên bàn (hai mặt, lật quanh mép trái)
  var PW = 600, PH = 440, PX = -120, PZ = 190;
  var giay = api.P(the, { x: PX, y: TY - 2, z: PZ, rotationX: 90 });
  var la = api.P(giay, { rotationY: 0 });
  la.insertAdjacentHTML("beforeend", '<svg class="dio-cut dio-bfh" data-layout-allow-overlap data-layout-allow-occlusion width="' + PW + '" height="' + PH + '" viewBox="0 0 ' + PW + " " + PH + '" style="left:' + -PW / 2 + 'px;top:' + -PH / 2 + 'px;backface-visibility:hidden;filter:' + api.F.AM_NHO + '">' + api.toLichSVG(PW, PH) + "</svg>");
  var matSau = api.P(la, { x: 0, rotationY: 180 });
  // mặt sau: tờ trắng nhàu + hình vẽ bút chì
  var ve = "", i, k;
  var tx0 = 40, bw = 80, tyTop = 84, tyDay = 380, fh = (tyDay - tyTop) / 14;
  var pl = function (d, cls, wd) { return '<path class="' + cls + '" d="' + d + '" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" fill="none" stroke="' + BUT + '" stroke-width="' + (wd || 4) + '" stroke-linecap="round"/>'; };
  for (k = 0; k < 3; k++) {
    var x0 = tx0 + k * bw, yt = tyTop + (k === 1 ? 0 : fh * 0.4);
    ve += '<path class="to-' + k + '" d="M ' + (x0 + 4) + " " + (yt + 4) + " L " + (x0 + bw - 4) + " " + (yt + 4) + " L " + (x0 + bw - 4) + " " + tyDay + " L " + (x0 + 4) + " " + tyDay + ' Z" fill="' + BUT + '" opacity="0"/>';
    ve += pl("M " + x0 + " " + tyDay + " L " + x0 + " " + yt + " L " + (x0 + bw) + " " + yt + " L " + (x0 + bw) + " " + tyDay, "khung-" + k, 5);
  }
  ve += pl("M " + (tx0 - 14) + " " + tyDay + " L " + (tx0 + 3 * bw + 14) + " " + tyDay, "nen", 5);
  for (i = 1; i <= 14; i++) {
    var yy = tyDay - i * fh;
    ve += pl("M " + tx0 + " " + yy.toFixed(1) + " L " + (tx0 + 3 * bw) + " " + yy.toFixed(1), "tang-" + i, 3);
  }
  // ô cửa sổ + người que (6 ô mỗi tầng)
  var oCua = [];
  for (i = 0; i < 14; i++) for (k = 0; k < 6; k++) oCua.push([tx0 + 14 + k * 38 + (k > 1 ? 4 : 0) + (k > 3 ? 4 : 0), tyDay - (i + 1) * fh + 3]);
  var nguoi = "", chon = [], rr = api.rng(57);
  oCua.forEach(function (o, j) { if (rr() < 0.42) chon.push(j); });
  chon.forEach(function (j, n) {
    var o = oCua[j], cx = o[0] + 6, cy = o[1];
    nguoi += '<g class="ng ng-' + n + '"><circle cx="' + cx + '" cy="' + (cy + 3.2) + '" r="2.6" fill="none" stroke="' + BUT + '" stroke-width="1.8"/>' +
      sk("M " + cx + " " + (cy + 6) + " L " + cx + " " + (cy + 11) + " M " + (cx - 3) + " " + (cy + 8) + " L " + (cx + 3) + " " + (cy + 8) + " M " + cx + " " + (cy + 11) + " L " + (cx - 3) + " " + (cy + 15) + " M " + cx + " " + (cy + 11) + " L " + (cx + 3) + " " + (cy + 15), 1.8, BUT) + "</g>";
  });
  ve += nguoi;
  // chữ: hiện dần bằng clip (như đang viết)
  var chuViet = function (id, x, y, co, s, mau, extra) {
    var wd = s.length * co * 0.9;
    return '<clipPath id="cv-' + id + '"><rect class="cvr-' + id + '" data-w="' + wd + '" x="' + (x - wd / 2) + '" y="' + (y - co) + '" width="0" height="' + (co * 1.4) + '"/></clipPath>' +
      '<g clip-path="url(#cv-' + id + ')">' + api.txt(x, y, co, 700, s, mau || BUT, extra) + "</g>";
  };
  // cỡ chữ ≥ 48 (sau kiểm định 24/11: 34–38 chỉ hiện ~30 px trên khung)
  ve += chuViet("hodge", 440, 158, 50, chu[1]) + pl("M 350 142 L 532 136", "gach", 6);
  ve += chuViet("begich", 296, 70, 50, chu[0]);
  ve += chuViet("nam", 160, 428, 48, chu[3]);
  ve += chuViet("ds", 440, 304, 48, chu[4], "#2f3b3c");
  // vết tẩy (ẩn) + bút chì nằm trên giấy (đầu chì tại (0,0), thân nằm về +x +y)
  ve += '<g class="tay-vet" opacity="0">' + sk("M 160 170 C 200 160 220 190 260 176 M 150 200 C 190 190 230 214 270 200", 9, "#f7f2e4") + "</g>";
  // bút chì trong bàn tay ngắn của Wob (4 độ dài: mòn dần), đầu chì tại (0,0)
  var butLen = function (len, k) {
    var g = '<g class="bl bl-' + k + '"' + (k ? ' visibility="hidden"' : "") + '>';
    g += '<g transform="translate(12 12)" opacity=".22">' + fp("M " + (-len - 14) + " -8 L 0 0 L " + (-len - 14) + " 8 Z", "#000", 0) + "</g>";
    g += fp("M " + -len + " -8 L -22 -8 L -22 8 L " + -len + " 8 Z", "#e7b34b", 4) + fp("M -22 -8 L 0 0 L -22 8 Z", "#e9c79a", 4) + fp("M -7 -2.5 L 0 0 L -7 2.5 Z", INK, 1);
    g += fp("M " + (-len - 15) + " -8 L " + -len + " -8 L " + -len + " 8 L " + (-len - 15) + " 8 Z", C.CHEEK, 4);
    var hx = -Math.max(30, len * 0.55);
    g += sk("M " + hx + " 0 L " + (hx - 90) + " -22", 12) + '<circle cx="' + hx + '" cy="0" r="14" fill="' + INK + '"/>';
    return g + "</g>";
  };
  ve += '<g class="but"><g transform="rotate(-140)">' + butLen(150, 0) + butLen(110, 1) + butLen(72, 2) + butLen(40, 3) + "</g></g>";
  matSau.insertAdjacentHTML("beforeend", '<svg class="dio-cut dio-bfh" data-layout-allow-overlap data-layout-allow-occlusion width="' + PW + '" height="' + PH + '" viewBox="0 0 ' + PW + " " + PH + '" style="left:' + -PW / 2 + "px;top:" + -PH / 2 + 'px;backface-visibility:hidden;overflow:visible;filter:' + api.F.AM_NHO + '">' + api.toLichSVG(PW, PH, { matSau: true }) + ve + "</svg>");
  var sv = matSau.lastElementChild, $ = function (c) { return sv.querySelector(c); }, $$ = function (c) { return sv.querySelectorAll(c); };
  var but = $(".but"), butThan = null, BL = [0, 1, 2, 3].map(function (k) { return $(".bl-" + k); });
  gsap.set(but, { opacity: 0, x: 400, y: 330 });
  // tờ lịch lúc đầu: vo tròn (ẩn tờ phẳng, quả giấy trong tay phải)
  gsap.set(giay, { scale: 0.25, rotationZ: 30, opacity: 0 });
  w.holdR.insertAdjacentHTML("beforeend", '<g class="vo">' + fp("M -40 -10 L -26 -36 L 0 -42 L 30 -30 L 42 -4 L 34 26 L 8 40 L -24 34 L -42 14 Z", "#f1e6c8", 5) +
    sk("M -26 -20 L 4 -8 L 24 -24 M -10 10 L 10 2 L 26 16 M -30 6 L -12 -4", 3, INK, ' opacity=".5"') + "</g>");
  var vo = w.holdR.querySelector(".vo");
  api.armSet(w, "R", -100);
  gsap.set(vo, api.holdPose("R", -100, 300, 170, 0));
  api.quaySet(w, -0.35);

  // ---------------------------------------------------------------- 0–6 trải tờ lịch, vuốt, lật mặt sau
  var tUn = tu.unfold || 1.14;
  api.look(w, 0.2, -10, 10, 0.2);
  api.armTo(w, "R", tUn - 0.35, 0.3, -40, "power2.in");
  tl.to(vo, Object.assign(api.holdPose("R", -40, 200, 330, 40), { duration: 0.3, ease: "power2.in" }), tUn - 0.35);
  tl.set(vo, { opacity: 0 }, tUn - 0.04);
  tl.set(giay, { opacity: 1 }, tUn - 0.04);
  tl.to(giay, { scale: 1, rotationZ: 0, duration: 0.55, ease: "back.out(1.4)" }, tUn - 0.04);
  api.sfx("whoosh", tUn, 0.3);
  // vuốt phẳng (hai lần), tay quét
  api.nghieng(w, 1.8, -10, 0.25);
  [2.0, 2.55].forEach(function (t) {
    api.armTo(w, "L", t, 0.22, -35, "power2.inOut"); api.armTo(w, "L", t + 0.24, 0.22, 10, "power2.inOut");
    tl.to(giay, { scaleY: 1.03, duration: 0.12, yoyo: true, repeat: 1 }, t + 0.1);
  });
  api.nghieng(w, 3.1, 0, 0.3);
  // lật mặt sau
  tl.fromTo(la, { rotationY: 0 }, { rotationY: -180, duration: 0.6, ease: "power2.inOut", immediateRender: false }, 3.5);
  tl.to(la, { z: 70, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.out" }, 3.5);
  api.armTo(w, "L", 3.4, 0.3, -70, "power2.out"); api.armTo(w, "L", 3.9, 0.3, 0, "power2.inOut");
  api.armTo(w, "R", 3.9, 0.3, 0, "power2.inOut");
  api.sfx("whoosh", 3.55, 0.25);
  api.look(w, 4.2, -6, 8, 0.2);
  api.quay(w, 4.6, 0, 0.3);
  api.look(w, 5.0, 0, 0, 0.2);

  // ---------------------------------------------------------------- 6–13 phong bì → cuộn giấy chảy xuống mép bàn
  var tAfter = tu.after || 6.27, tFloor = tu.floor || 12.09, tNum = tu.number || 12.32;
  w.holdL.insertAdjacentHTML("beforeend", '<g class="pb">' +
    '<g transform="translate(-165 -105) scale(1.5)">' + api.phongBiSVG({ dong: [{ chu: chu[0], co: 20, x: 108, y: 96 }, { chu: chu[2], co: 30, x: 188, y: 120, mau: C.TERRA }] }) + "</g></g>");
  var pb = w.holdL.querySelector(".pb");
  gsap.set(pb, { opacity: 0 });
  // dải địa chỉ: phần rủ từ đáy phong bì xuống bàn + phần chảy dọc mặt bàn về phía camera (tấm trong thế giới)
  var dayPB = api.wobTheGioi(w, -90, 312);
  var cuonS = api.cut(the, 150, 90, fp("M 4 0 L 146 0 L 146 90 L 4 90 Z", "#f4ecd8", 5) + sk("M 24 30 L 120 30 M 24 60 L 104 60", 5, "#8a8f8c", ' opacity=".6"'),
    { pos: { x: dayPB.x, y: TY, z: w.z + 30 }, f: api.F.AM_NHO });
  var cuonSan = api.floorPlane(the, dayPB.x, TY - 1, w.z + 30 + 260, 150, 520,
    "background:repeating-linear-gradient(0deg, rgba(0,0,0,0) 0 26px, rgba(138,143,140,.55) 26px 31px, rgba(0,0,0,0) 31px 46px), #f4ecd8;border:5px solid " + INK + ";border-top:none;");
  gsap.set(cuonS, { scaleY: 0, transformOrigin: "50% 0%" });
  gsap.set(cuonSan, { scaleY: 0, transformOrigin: "50% 0%" });
  gsap.set(cuonSan.face, { transformOrigin: "50% 0%" });
  var tPb = 6.7;
  api.armTo(w, "L", tPb - 0.3, 0.35, 120, "back.out(1.5)");
  tl.set(pb, { opacity: 1 }, tPb - 0.3);
  gsap.set(pb, api.holdPose("L", 0, 60, 300, 0));
  tl.to(pb, Object.assign(api.holdPose("L", 120, -90, 205, 0), { duration: 0.35, ease: "back.out(1.5)" }), tPb - 0.3);
  api.quay(w, tPb - 0.2, -0.4, 0.25);
  api.look(w, tPb, -12, 4, 0.2);
  api.look(w, (tu.mail || 11.6) - 0.1, 0, 2, 0.2);
  var tGag = 7.7;
  tl.to(cuonS, { scaleY: 1, duration: 0.18, ease: "power2.in" }, tGag - 0.42);
  tl.fromTo(cuonSan.face, { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: "power2.out", immediateRender: false }, tGag - 0.26);
  tl.set(cuonSan, { scaleY: 1 }, tGag - 0.26);
  api.sfx("boing", tGag - 0.05, 0.5);
  api.look(w, tGag, -6, 14, 0.15, 1.15);
  api.lids(w, tGag + 0.6, 0.45, 0.2);
  api.lids(w, 9.0, 0, 0.15);
  api.look(w, tNum - 0.1, -12, 2, 0.15);
  // cất phong bì, cầm bút chì
  api.armTo(w, "L", 12.7, 0.25, 0, "power2.inOut");
  tl.set(pb, { opacity: 0 }, 12.95);
  var WX = PX - PW / 2 + 190, WZ2 = PZ - PH / 2 - 40;
  api.walk(w, 12.75, 13.45, WX, WZ2, { face: -0.6, endFace: 0, step: 0.18 });
  api.armTo(w, "R", 13.5, 0.2, 25, "power2.out");
  api.nghieng(w, 13.5, 8, 0.3);
  api.look(w, 13.6, -4, 14, 0.2);


  // ---------------------------------------------------------------- 13–22 vẽ toà nhà bằng bút chì
  var D = function (c, t, d) { $$(c).forEach(function (el) { tl.to(el, { attr: { "stroke-dashoffset": 0 }, duration: d, ease: "none" }, t); }); };
  var viet = function (id, t, d) { var r = $(".cvr-" + id); tl.to(r, { attr: { width: +r.getAttribute("data-w") }, duration: d, ease: "none" }, t); };
  var butToi = function (t, d, x, y) { tl.to(but, { x: x, y: y, duration: d, ease: "power1.inOut" }, t); };
  var nguc = function (t0, t1) { // bút chì lắc đều khi vẽ
    var n = Math.max(2, Math.round((t1 - t0) / 0.12));
    tl.fromTo(but, { rotation: -3 }, { rotation: 3, svgOrigin: "0 0", duration: (t1 - t0) / n, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
  };
  tl.set(but, { opacity: 1 }, 13.1); tl.set(but, { opacity: 0 }, 30.2);
  var tHo = tu.hodge || 13.22, tNow = tu.now || 14.2, tBeg = tu.begich || 14.88, tFour = tu.fourteen || 16.34, tFl = tu.floors || 16.84;
  butToi(13.1, 0.2, 345, 158);
  viet("hodge", tHo, 0.55); butToi(tHo, 0.55, 530, 158); nguc(tHo, tHo + 0.55);
  D(".gach", tNow + 0.05, 0.3); butToi(tNow, 0.35, 535, 136);
  viet("begich", tBeg - 0.05, 0.75); butToi(tBeg - 0.15, 0.1, 100, 66); butToi(tBeg - 0.05, 0.75, 490, 66); nguc(tBeg - 0.05, tBeg + 0.7);
  // khung ba khối + tầng (tầng 14 vẽ cuối, đúng "floors")
  D(".khung-0", 15.75, 0.3); D(".khung-1", 16.0, 0.3); D(".khung-2", 16.25, 0.3); D(".nen", 15.75, 0.25);
  butToi(15.7, 0.85, 300, 100); nguc(15.7, 16.6);
  for (i = 1; i <= 14; i++) {
    var ti = tFour - 0.05 + (tFl - 0.12 - tFour) * (i - 1) / 13;
    D(".tang-" + i, ti, i === 14 ? 0.22 : 0.06);
  }
  butToi(16.55, 0.4, 300, tyDay - 14 * fh); nguc(16.55, 17.1);
  api.sfx("pop", tFl, 0.3);
  // 1957 ở chân
  var tNin = tu.nineteen || 19.14;
  butToi(tNin - 0.3, 0.3, 100, 428);
  viet("nam", tNin - 0.02, 0.7); butToi(tNin, 0.7, 225, 428); nguc(tNin, tNin + 0.7);
  // ba khối: tô từng khối
  var tThree = tu.three || 21.41;
  [0, 1, 2].forEach(function (s, j) {
    var el = $(".to-" + s), t = tThree + j * 0.2;
    tl.to(el, { opacity: 0.22, duration: 0.12 }, t);
    tl.to(el, { opacity: 0.08, duration: 0.4 }, t + 0.5);
    butToi(t, 0.18, tx0 + s * bw + 50, 240);
  });

  // ---------------------------------------------------------------- 22.8–26.9 người que vào từng ô, bút chì mòn dần
  var tAcc = (tu.according || 22.77) - 0.1, tIt = (tu.it || 26.36) + 0.2, nNg = chon.length;
  chon.forEach(function (j, n) {
    var t = tAcc + (tIt - tAcc) * n / nNg, o = oCua[j], g = $(".ng-" + n);
    gsap.set(g, { opacity: 0 });
    tl.set(g, { opacity: 1 }, t);
    tl.to(but, { x: o[0] + 6, y: o[1] + 10, duration: (tIt - tAcc) / nNg * 0.8, ease: "power1.inOut" }, t - (tIt - tAcc) / nNg * 0.8);
  });
  [1, 2, 3].forEach(function (k) { var t = tAcc + (tIt - tAcc) * k / 3.2; tl.set(BL[k - 1], { visibility: "hidden" }, t); tl.set(BL[k], { visibility: "visible" }, t); });
  nguc(tAcc, tIt);

  // ---------------------------------------------------------------- 27–30.5 tẩy vài người, ngập ngừng, ghi ~270 (2020)
  var tTw = tu.twenty || 27.04, tSev = tu.seventy || 29.49;
  var xoa = [3, 7, 12, 18, 24].filter(function (n) { return n < nNg; });
  xoa.forEach(function (n, j) {
    var o = oCua[chon[n]], t = tTw + j * 0.28;
    tl.to(but, { x: o[0] + 6, y: o[1] + 8, duration: 0.14, ease: "power1.inOut" }, t);
    tl.to(but, { x: o[0] + 12, duration: 0.05, yoyo: true, repeat: 1 }, t + 0.14);
    tl.to($(".ng-" + n), { opacity: 0, duration: 0.12 }, t + 0.16);
  });
  api.sfx("xuoc-dia", tTw + 0.1, 0.2);
  // ngập ngừng: bút lơ lửng chấm chấm
  butToi(28.6, 0.3, 300, 304);
  tl.to(but, { y: 294, duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, 28.9);
  viet("ds", tSev - 0.25, 0.9); butToi(tSev - 0.25, 0.9, 585, 304); nguc(tSev - 0.25, tSev + 0.65);

  // ---------------------------------------------------------------- Wob trong các cảnh rộng: cầm mẩu bút chì, nhún vai
  w.holdR.insertAdjacentHTML("beforeend", '<g class="but-tay"><g transform="rotate(-70) scale(.42 .9)">' + api.butChiSVG() + "</g></g>");
  var butTay = w.holdR.querySelector(".but-tay");
  gsap.set(butTay, { opacity: 0 });
  // (mẩu bút chì cất đi: Wob nhún vai tay không)
  api.armSet(w, "R", 0, 30.3);
  tl.set(butTay, api.holdPose("R", 0, 330, 300, -70), 30.3);
  var tEst = tu.estimates || 30.77, tVary = tu.vary || 31.35;
  api.armTo(w, "L", tEst - 0.1, 0.25, 70, "power2.out"); api.armTo(w, "R", tEst - 0.1, 0.25, -70, "power2.out");
  tl.to(butTay, Object.assign(api.holdPose("R", -70, 400, 200, -40), { duration: 0.25, ease: "power2.out" }), tEst - 0.1);
  tl.to(w.lift, { y: -14, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }, tVary - 0.1);
  api.lids(w, tVary, 0.5, 0.2);
  api.armTo(w, "L", 32.4, 0.3, 0, "power2.inOut"); api.armTo(w, "R", 32.4, 0.3, 0, "power2.inOut");
  tl.to(butTay, Object.assign(api.holdPose("R", 0, 330, 300, -70), { duration: 0.3 }), 32.4);
  // đẩy tờ lịch về phía camera
  api.nghieng(w, 32.9, -12, 0.2);
  api.armTo(w, "L", 32.9, 0.25, -60, "power2.out");
  tl.to(giay, { z: PZ + 40, duration: 0.35, ease: "power2.out" }, 33.1);
  api.sfx("whoosh", 33.35, 0.35);

  // ---------------------------------------------------------------- camera
  var mat = api.wobTheGioi(w, 200, 170);
  var giua = { x: PX, y: TY, z: PZ };
  var veTam = { x: PX - PW / 2 + 180, y: TY, z: PZ }; // tâm hình toà nhà
  api.camSet(R, null, { cx: 60, cy: 90, cz: 0, k: 140, rx: -22, ry: 6 });
  api.camTo(R, 0, 5.9, { k: 230, ry: 3 }, "sine.inOut");                                                // đẩy chậm ≈ 1,0 → 1,08
  var pbW = api.wobTheGioi({ x: 330, y: TY, z: -90, s: 0.9 }, 40, 190);
  api.camTo(R, 5.9, 0.8, { cx: pbW.x - 20, cy: pbW.y + 140, cz: w.z + 120, k: 330, rx: -14, ry: 0 }, "power2.inOut"); // phong bì + cuộn giấy trên bàn
  api.camTo(R, 6.7, 2.4, { k: 360 }, "sine.inOut");
  api.camTo(R, 9.1, 0.7, { cx: pbW.x + 10, cy: pbW.y + 40, cz: w.z, k: 640, rx: -6 }, "power2.inOut");   // phong bì (chữ đọc được)
  api.camTo(R, 9.8, 2.0, { k: 680 }, "sine.inOut");
  api.camTo(R, 11.8, 0.8, { k: 700 }, "sine.inOut");
  api.camTo(R, 12.6, 0.9, { cx: veTam.x + 110, cy: TY - 112, cz: PZ - 15, k: 405, rx: -50, ry: 0 }, "power2.inOut"); // tờ lịch + Wob sau mép giấy
  api.camTo(R, 13.5, 9.1, { k: 445 }, "sine.inOut");
  api.camTo(R, 22.6, 0.6, { k: 465 }, "power2.inOut");
  api.camTo(R, 23.2, 7.0, { k: 485 }, "sine.inOut");
  api.camTo(R, 30.25, 0.75, { cx: mat.x - 140, cy: mat.y + 40, cz: w.z + 60, k: 300, rx: -14, ry: 2 }, "power2.inOut");
  api.camTo(R, 31.0, 1.85, { k: 340 }, "sine.inOut");
  api.camTo(R, 32.85, 0.5, { cx: veTam.x - 40, cy: TY, cz: PZ + 40, k: 520, rx: -70, ry: 0 }, "power2.inOut");
  api.camTo(R, 33.35, 0.75, { k: 1110, rx: -80 }, "power3.in");                                            // lao vào hình toà nhà

  // ---------------------------------------------------------------- liên tục
  api.khauHinh(w);
  api.gatDau(w, { bo: [[13.0, 30.2]] });
  api.breathe(w, 0.5, 33.0);
  api.blinks(w, 0.8, 32.8, [[12.1, 13.0]], 0);
};
