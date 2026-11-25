/* duoi-tap.js – ĐUÔI TẬP dùng lại mọi tập (skill mo-ket mục 2), phong cách diorama.
 * Nạp SAU lib/dio-*.js, TRƯỚC du-lieu.js/canh.js:  <script src="_chung/mo-ket/duoi-tap.js"></ script> (bỏ dấu cách).
 * Dựng trên bàn kỷ vật của api.dungBan: kệ gỗ giấy 2 tầng bên trái, kỷ vật các tập có thẻ tên nơi, bản đồ giấy gợi ý
 * (không biên giới thật, không vùng Đông Nam Á / Biển Đông) có ghim mới + ghim trống ở vùng biển ấm (KHÔNG nhãn),
 * và lớp end screen phẳng theo khung (hai khung ảnh giấy trống 560×315 + vòng tròn trống Ø200, x 1180–1740): bên trong
 * KHÔNG vẽ gì, không chữ (YouTube phủ ô video, nút đăng ký lên đúng chỗ).
 *
 *   var dt = api.duoiTap(ban, {
 *     kyVat: [ {the: "OYMYAKON", ve: "tuDong", tang: 1, cho: 0}, {the: "COOBER PEDY", ve: "loOpal", tang: 1, cho: 1},
 *              {the: "WHITTIER", ve: "toLich", tang: 0, cho: 1, moi: true} ],   // moi: món của tập này, Wob đặt lên kệ
 *     ke: {x: -620, z: -300}, banDo: {x: -330, z: 170},
 *     ghimMoi: {u: .22, v: .3, the: "WHITTIER"}, ghimTrong: {u: .72, v: .7}   // u, v ∈ 0..1 trên tờ bản đồ
 *   });
 *   dt.datLen(i, t, tu)   món i bay từ điểm thế giới `tu` {x,y,z} lên chỗ của nó (0,6 s), chạm kệ thì các món khác rung
 *   dt.rung(i, t, d)      món i rung lách cách;  dt.nhuc(i, t) gag riêng của món (tủ đông: nắp hé, đuôi cá vẫy)
 *   dt.moBanDo(t)         bản đồ mở ra (scaleX);  dt.camGhim(t) ghim mới cắm;  dt.ghimRung(t, d) ghim trống rung + mặt trời nhô
 *   dt.endScreen(t)       hai khung + vòng bật lên (lớp phẳng z 30, trên sân khấu, dưới hạt giấy)
 *   dt.diem(i)            điểm thế giới của món i (ngắm camera)
 * Hàm vẽ kỷ vật (ve): "tuDong" (tủ đông nhỏ, cá trong), "loOpal", "toLich" (tờ lịch gấp còn băng dính), "ca" hoặc function(api) → {svg, w, h}.
 * Thêm kỷ vật tập mới: thêm một khoá vào VE dưới đây (chỉ thêm).
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];
  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;

    var VE = {
      tuDong: function () {
        var s = '<g class="duoi-ca" opacity="0"><g transform="translate(150 40) rotate(-30)">' + fp("M 0 0 L 40 -22 L 34 0 L 40 22 Z", C.FISH2, 4) + sk("M 6 -6 L 30 -14 M 6 6 L 30 14", 2.5, C.FISH1) + "</g></g>";
        s += fp("M 10 46 L 170 46 L 170 190 L 10 190 Z", "#e8f2f5", 6) + sk("M 22 60 L 158 60", 4, "#bcd6df") + fp("M 140 100 l 14 0 l 0 40 l -14 0 Z", "#9aa39a", 3);
        s += '<g class="nap">' + fp("M 6 30 L 174 30 L 174 50 L 6 50 Z", "#d4e6ec", 6) + "</g>";
        return { svg: s, w: 180, h: 190 };
      },
      loOpal: function () { return { svg: '<g transform="translate(60 80)">' + api.loOpalSVG() + "</g>", w: 120, h: 160 }; },
      toLich: function () {
        var s = '<g transform="translate(6 20) rotate(-4)">' + api.toLichSVG(170, 130) + "</g>";
        [[20, 26, -20], [150, 30, 25], [80, 140, 8]].forEach(function (b) { s += '<rect x="' + (b[0] - 16) + '" y="' + (b[1] - 7) + '" width="32" height="14" fill="#f3e2b0" opacity=".85" stroke="' + INK + '" stroke-width="2" transform="rotate(' + b[2] + " " + b[0] + " " + b[1] + ')"/>'; });
        return { svg: s, w: 190, h: 160 };
      },
      ca: function () { return { svg: '<g transform="translate(110 50)">' + api.fishSVG("") + "</g>", w: 220, h: 100 }; }
    };

    api.duoiTap = function (ban, o) {
      o = o || {};
      var the = ban.the, TY = ban.TY, dt = { mon: [] };
      var K = Object.assign({ x: -620, z: -300 }, o.ke || {}), KW = 700, KH = 520, tangY = [KH - 250, KH - 10]; // tầng 0 trên, 1 dưới (y trong svg kệ)
      // kệ: lưng + hai tầng + hai vách
      var ke = fp("M 20 0 L " + (KW - 20) + " 0 L " + (KW - 20) + " " + KH + " L 20 " + KH + " Z", "#5c3d28", 6) +
        fp("M 0 " + (tangY[0] - 4) + " L " + KW + " " + (tangY[0] - 4) + " L " + KW + " " + (tangY[0] + 18) + " L 0 " + (tangY[0] + 18) + " Z", C.WOOD, 5) +
        fp("M 0 " + (tangY[1] - 14) + " L " + KW + " " + (tangY[1] - 14) + " L " + KW + " " + KH + " L 0 " + KH + " Z", C.WOOD, 5) +
        fp("M 0 0 L 26 0 L 26 " + KH + " L 0 " + KH + " Z M " + (KW - 26) + " 0 L " + KW + " 0 L " + KW + " " + KH + " L " + (KW - 26) + " " + KH + " Z", C.WOOD2, 5);
      api.cut(the, KW, KH, ke, { pos: { x: K.x, y: TY, z: K.z }, f: api.F.AM });
      var cho = function (tang, c) { return { x: K.x - KW / 2 + 130 + c * 220, y: TY - (KH - tangY[tang]) - (tang ? 14 : 4), z: K.z + 30 }; };
      (o.kyVat || []).forEach(function (m, i) {
        var v = typeof m.ve === "function" ? m.ve(api) : VE[m.ve](), p = cho(m.tang || 0, m.cho || i);
        var el = api.cut(the, v.w, v.h, '<g class="rung">' + v.svg + "</g>", { pos: { x: p.x, y: p.y, z: p.z }, f: api.F.AM_NHO });
        var tag = api.cut(the, 300, 60, fp("M 6 6 L 294 6 L 294 54 L 6 54 Z", C.PAPER, 4) + '<circle cx="20" cy="30" r="5" fill="' + INK + '"/>' + api.txt(156, 44, 32, 800, m.the, INK),
          { pos: { x: p.x, y: p.y + 8, z: p.z + 40 }, f: api.F.AM_NHO });
        var mo = { el: el, tag: tag, cho: p, def: m, rung: el.svg.querySelector(".rung") };
        if (m.moi) { gsap.set([el, tag], { opacity: 0 }); }
        dt.mon.push(mo);
      });
      dt.diem = function (i) { return dt.mon[i].cho; };
      dt.rung = function (i, t, d) {
        var r = dt.mon[i].rung, n = Math.max(2, Math.round((d || 0.4) / 0.06));
        tl.fromTo(r, { rotation: -3 }, { rotation: 3, transformOrigin: "50% 100%", duration: (d || 0.4) / n, yoyo: true, repeat: n - 1, ease: "sine.inOut", immediateRender: false }, t);
        tl.to(r, { rotation: 0, duration: 0.08 }, t + (d || 0.4));
      };
      dt.datLen = function (i, t, tu) {
        var m = dt.mon[i], p = m.cho;
        tl.set(m.el, { opacity: 1 }, t);
        tl.fromTo(m.el, { x: tu.x, y: tu.y, z: tu.z }, { x: p.x, z: p.z, duration: 0.6, ease: "power2.inOut", immediateRender: false }, t);
        tl.fromTo(m.el, { y: tu.y }, { y: p.y, duration: 0.6, ease: "back.out(1.2)", immediateRender: false }, t);
        tl.to(m.tag, { opacity: 1, duration: 0.25 }, t + 0.55);
        dt.mon.forEach(function (n, k) { if (k !== i && n.def.tang === m.def.tang) dt.rung(k, t + 0.6, 0.45); });
      };
      dt.nhuc = function (i, t) {
        var s = dt.mon[i].el.svg, nap = s.querySelector(".nap"), ca = s.querySelector(".duoi-ca");
        if (nap) {
          tl.to(nap, { rotation: -28, svgOrigin: "6 40", duration: 0.25, ease: "power2.out" }, t);
          tl.set(ca, { opacity: 1 }, t + 0.1);
          tl.fromTo(ca, { rotation: -10 }, { rotation: 18, svgOrigin: "150 46", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, t + 0.25);
          tl.set(ca, { opacity: 0 }, t + 1.05);
          tl.to(nap, { rotation: 0, svgOrigin: "6 40", duration: 0.2, ease: "power2.in" }, t + 1.0);
        } else dt.rung(i, t, 0.5);
      };
      // bản đồ giấy gợi ý (lục địa là mảng tròn trừu tượng, không biên giới) đứng trên bàn
      var B = Object.assign({ x: -330, z: 170, w: 520, h: 320 }, o.banDo || {}), bw = B.w, bh = B.h;
      var bd = fp("M 6 6 L " + (bw - 6) + " 6 L " + (bw - 6) + " " + (bh - 6) + " L 6 " + (bh - 6) + " Z", "#a9cfdc", 7) +
        sk("M " + bw / 3 + " 8 L " + bw / 3 + " " + (bh - 8) + " M " + (2 * bw / 3) + " 8 L " + (2 * bw / 3) + " " + (bh - 8), 2.5, INK, ' opacity=".25"') +
        fp("M 40 60 C 80 30 170 36 200 70 C 220 100 180 140 140 150 C 100 160 50 130 40 60 Z", C.LAND, 4) +
        fp("M 270 50 C 330 30 430 44 450 90 C 470 140 400 150 360 140 C 310 130 250 100 270 50 Z", C.LAND, 4) +
        fp("M 120 200 C 160 180 220 200 210 250 C 200 290 150 292 128 268 C 110 248 100 214 120 200 Z", C.LAND, 4);
      var pin = function (cls, mau) { return '<g class="' + cls + '">' + fp("M 0 0 C -10 -16 -16 -24 -16 -32 C -16 -42 -8 -48 0 -48 C 8 -48 16 -42 16 -32 C 16 -24 10 -16 0 0 Z", mau, 4) + '<circle cx="0" cy="-32" r="6" fill="' + C.PAPER + '" stroke="' + INK + '" stroke-width="2"/></g>'; };
      var gm = o.ghimMoi || { u: 0.22, v: 0.3 }, gt = o.ghimTrong || { u: 0.72, v: 0.72 };
      bd += '<g class="mat-troi" opacity="0"><g transform="translate(' + (gt.u * bw + 46) + " " + (gt.v * bh - 10) + ')"><circle r="20" fill="#f3c46a" stroke="' + INK + '" stroke-width="4"/>' +
        sk("M 0 -30 L 0 -38 M 0 30 L 0 38 M -30 0 L -38 0 M 30 0 L 38 0 M 21 21 L 27 27 M -21 -21 L -27 -27 M 21 -21 L 27 -27 M -21 21 L -27 27", 4, "#e09a2a") + "</g></g>";
      bd += '<g transform="translate(' + gm.u * bw + " " + gm.v * bh + ')">' + pin("ghim-moi", C.MAT) + "</g>";
      if (gm.the) bd += '<g class="ghim-the" opacity="0">' + api.txt(gm.u * bw + 6, gm.v * bh + 44, 34, 800, gm.the, INK, ' paint-order="stroke" stroke="' + C.PAPER + '" stroke-width="8"') + "</g>";
      bd += '<g transform="translate(' + gt.u * bw + " " + gt.v * bh + ')">' + pin("ghim-trong", "#f7f2e4") + "</g>";
      var bdEl = api.cut(the, bw, bh, bd, { pos: { x: B.x, y: TY, z: B.z }, f: api.F.AM_NHO });
      var q = function (c) { return bdEl.svg.querySelector("." + c); };
      gsap.set(bdEl, { scaleX: 0, opacity: 0 });
      gsap.set(q("ghim-moi"), { y: -80, opacity: 0 }); gsap.set(q("ghim-trong"), { opacity: 0 });
      dt.banDo = bdEl;
      dt.moBanDo = function (t) { tl.set(bdEl, { opacity: 1 }, t); tl.to(bdEl, { scaleX: 1, duration: 0.45, ease: "back.out(1.4)" }, t); };
      dt.camGhim = function (t) {
        tl.to(q("ghim-moi"), { y: 0, opacity: 1, duration: 0.25, ease: "power3.in" }, t - 0.25);
        if (gm.the) tl.to(q("ghim-the"), { opacity: 1, duration: 0.2 }, t);
      };
      dt.ghimRung = function (t, d) {
        var g = q("ghim-trong");
        tl.set(g, { opacity: 1 }, t);
        var n = Math.max(2, Math.round((d || 1.2) / 0.08));
        tl.fromTo(g, { rotation: -8 }, { rotation: 8, svgOrigin: "0 0", duration: (d || 1.2) / n, yoyo: true, repeat: n - 1, ease: "sine.inOut", immediateRender: false }, t);
        tl.to(g, { rotation: 0, svgOrigin: "0 0", duration: 0.1 }, t + (d || 1.2));
        tl.fromTo(q("mat-troi"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(2)", immediateRender: false }, t + 0.3);
      };
      // end screen: lớp phẳng theo khung (vị trí chính xác bất kể camera)
      var ES = o.endScreen || { khung: [[1180, 130], [1180, 480]], w: 560, h: 315, vong: [1460, 905], r: 100 };
      var es = '<svg class="dio-ovl" width="1920" height="1080" style="z-index:30" data-layout-allow-overflow>';
      ES.khung.forEach(function (k, i) {
        es += '<g class="es es-' + i + '" style="filter:drop-shadow(2px 3px 0 #a8946c) drop-shadow(12px 10px 8px rgba(25,12,0,.45))">' +
          '<rect x="' + k[0] + '" y="' + k[1] + '" width="' + ES.w + '" height="' + ES.h + '" rx="6" fill="#e9dcc0" stroke="' + INK + '" stroke-width="7"/></g>';
      });
      es += '<g class="es es-v" style="filter:drop-shadow(2px 3px 0 #a8946c) drop-shadow(12px 10px 8px rgba(25,12,0,.45))"><circle cx="' + ES.vong[0] + '" cy="' + ES.vong[1] + '" r="' + ES.r + '" fill="#e9dcc0" stroke="' + INK + '" stroke-width="7"/></g></svg>';
      api.root.insertAdjacentHTML("beforeend", es);
      var esEls = api.root.querySelectorAll(".es");
      gsap.set(esEls, { scale: 0, opacity: 0, transformOrigin: "50% 50%" });
      dt.endScreen = function (t) {
        esEls.forEach(function (el, i) {
          tl.set(el, { opacity: 1 }, t + i * 0.18);
          tl.fromTo(el, { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(1.8)", immediateRender: false }, t + i * 0.18);
          api.sfx("pop", t + i * 0.18, 0.35);
        });
      };
      dt.ES = ES;
      return dt;
    };
  });
})();
