/* dio-so.js: sổ du lịch pop-up (chữ ký hình của kênh: cửa vào hồi ức).
 * api.soPopup(parent, o) dựng sổ nằm trên mặt phẳng y; bìa hai mặt xoay quanh gáy (cạnh trái); các lớp giấy nằm phẳng
 * dưới bìa rồi bật dựng (rotationX 0 → −90). Nội dung trang nhận qua tham số o.lop (dựng bằng api.lopPopup.*).
 *
 * Hệ toạ độ trang: u ∈ [0, w] từ gáy sang phải; v ∈ [−d/2, d/2] từ mép xa (−) tới mép gần người xem (+).
 * Lớp: { svg, w, h, x (tâm theo u), banLe (v của bản lề), tre (giây trễ khi bat), khoi: [cotKhoi...] }
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];

  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;

    var keDong = function (w, d) {
      var s = "";
      for (var y = 60; y < d - 20; y += 34) s += sk("M 24 " + y + " L " + (w - 24) + " " + y, 2, "#9fb7c4", ' opacity=".5"');
      return s;
    };

    // o: x (gáy), y (mặt bàn), z (tâm sổ), w, d, lop [], biaTrong (svg mặt trong bìa, mặc định ký hoạ không chữ), mauBia
    api.soPopup = function (parent, o) {
      var w = o.w || 460, d = o.d || 580, bx = o.x, by = o.y, bz = o.z;
      var so = { w: w, d: d, x: bx, y: by, z: bz, lop: [] };
      var book = (so.book = api.P(parent, { x: bx, y: by - 3, z: bz, rotationX: 90 }));
      api.div("dio-face", book, "left:-12px;top:" + (-d / 2 - 12) + "px;width:" + (w + 24) + "px;height:" + (d + 24) + "px;background:#a9522f;border:6px solid " + INK + ";border-radius:10px;");
      var pg = api.P(book, { z: 1 });
      pg.insertAdjacentHTML("beforeend", '<svg class="dio-cut" width="' + w + '" height="' + d + '" viewBox="0 0 ' + w + " " + d + '" style="left:0;top:' + -d / 2 + 'px">' +
        '<rect x="0" y="0" width="' + w + '" height="' + d + '" fill="' + C.PAPER + '" stroke="' + INK + '" stroke-width="5"/>' + keDong(w, d) +
        sk("M 30 " + (d - 30) + " C 90 " + (d - 60) + " 120 " + (d - 30) + " 180 " + (d - 50) + " C 240 " + (d - 70) + " 300 " + (d - 40) + " " + (w - 30) + " " + (d - 60), 3, INK, ' stroke-dasharray="2 10"') + "</svg>");
      (o.lop || []).forEach(function (L, i) {
        var p = api.P(book, { x: L.x, y: L.banLe, z: 2 + i, rotationX: 0 });
        p.insertAdjacentHTML("beforeend", '<svg class="dio-cut" data-layout-allow-occlusion data-layout-allow-overlap width="' + L.w + '" height="' + L.h + '" viewBox="0 0 ' + L.w + " " + L.h +
          '" style="left:' + -L.w / 2 + "px;top:" + -L.h + 'px;overflow:visible;filter:' + (L.f || api.F.AM_NHO) + '">' + L.svg + "</svg>");
        p.svg = p.lastElementChild; p.def = L;
        so.lop.push(p);
      });
      var zc = 4 + so.lop.length;
      var cover = (so.cover = api.P(book, { z: zc, rotationY: 0 }));
      api.div("dio-face dio-bfh", cover, "left:0;top:" + -d / 2 + "px;width:" + w + "px;height:" + d + "px;background:" + (o.mauBia || "#b85c35") + ";border:6px solid " + INK +
        ";border-radius:4px 10px 10px 4px;box-shadow: inset 0 0 0 14px " + (o.mauBia || "#b85c35") + ", inset 0 0 0 17px rgba(255,236,200,.6);");
      var coverIn = (so.coverIn = api.P(cover, { x: w / 2, rotationY: 180 }));
      var biaTrongND = (so.biaTrongND = o.biaTrong != null ? o.biaTrong :
          sk("M 120 140 l 0 -60 M 90 110 l 60 0 M 99 89 l 42 42 M 141 89 l -42 42", 5, C.ICE2) +
          fp("M " + (w - 150) + " 300 l 70 0 l -6 70 l -58 0 Z", C.PAPER, 4) + sk("M " + (w - 80) + " 316 c 24 0 24 30 -4 30", 4) +
          fp("M 60 " + (d - 170) + " C 70 " + (d - 200) + " 150 " + (d - 200) + " 160 " + (d - 170) + " L 160 " + (d - 100) + " L 60 " + (d - 100) + " Z", "#cfe3ec", 3));
      coverIn.insertAdjacentHTML("beforeend", '<svg class="dio-cut dio-bfh" data-layout-allow-occlusion data-layout-allow-overlap width="' + w + '" height="' + d + '" viewBox="0 0 ' + w + " " + d + '" style="left:' + -w / 2 + "px;top:" + -d / 2 + 'px;backface-visibility:hidden">' +
        '<rect x="0" y="0" width="' + w + '" height="' + d + '" fill="' + C.PAPER + '" stroke="' + INK + '" stroke-width="5"/>' + keDong(w, d) +
        biaTrongND + "</svg>");
      api.plane(cover, { x: w - 50, y: 0, z: 1 }, 18, d, "background:#2f3b3c;");

      // --- thao tác
      so.moBia = function (t, dur) { tl.fromTo(cover, { rotationY: 0 }, { rotationY: -180, duration: dur || 0.7, ease: "power2.inOut", immediateRender: false }, t); };
      so.batLop = function (i, t, dur) {
        var p = so.lop[i];
        tl.fromTo(p, { rotationX: 0 }, { rotationX: -90, duration: dur || 0.5, ease: "back.out(1.7)", immediateRender: false }, t);
        (p.def.khoi || []).forEach(function (k) { k.chay(p, t + 0.35, null); });
      };
      // Bật các lớp (trừ những lớp trong `bo`) theo thứ tự, mỗi lớp trễ def.tre (mặc định i × buoc)
      so.bat = function (t, buoc, bo) {
        so.lop.forEach(function (p, i) {
          if ((bo || []).indexOf(i) >= 0) return;
          so.batLop(i, t + (p.def.tre != null ? p.def.tre : i * (buoc == null ? 0.15 : buoc)));
        });
      };
      // Đặt ngay trạng thái mở sẵn (bìa lật, các lớp dựng)
      so.moSan = function () {
        gsap.set(cover, { rotationY: -180 });
        so.lop.forEach(function (p) { gsap.set(p, { rotationX: -90 }); (p.def.khoi || []).forEach(function (k) { k.chay(p, null, null); }); });
      };
      so.dong = function (t) { tl.set(cover, { rotationY: 0 }, t); tl.set(so.lop, { rotationX: 0 }, t); };

      // --- thêm 18/11/2026 (chỉ thêm): gấp bìa có hoạt hình, gập lớp, vẽ phẳng lên trang, tờ lật được
      so.dongBia = function (t, dur, ease) { tl.fromTo(cover, { rotationY: -180 }, { rotationY: 0, duration: dur || 0.9, ease: ease || "power2.inOut", immediateRender: false }, t); };
      so.gapLop = function (i, t, dur) { tl.fromTo(so.lop[i], { rotationX: -90 }, { rotationX: 0, duration: dur || 0.35, ease: "power2.in", immediateRender: false }, t); };
      // Vẽ phẳng lên trang phải (dưới các lớp pop-up). svg theo hệ trang w×d (y = 0 ở mép xa, y = d ở mép gần người xem)
      so.veTrang = function (svg) {
        var p = api.P(book, { z: 1.5 });
        p.insertAdjacentHTML("beforeend", '<svg class="dio-cut" data-layout-allow-occlusion data-layout-allow-overlap width="' + w + '" height="' + d + '" viewBox="0 0 ' + w + " " + d + '" style="left:0;top:' + -d / 2 + 'px;overflow:visible">' + svg + "</svg>");
        p.svg = p.lastElementChild;
        return p;
      };
      // Tờ giấy lật quanh gáy. Mặt trước (nằm bên phải) = giấy kẻ + svgTruoc; mặt sau (nằm bên trái) = giấy kẻ + o.sau
      // (mặc định giống mặt trong bìa, nên tờ nằm bên trái trông như bìa). o.ben: "phai" (mặc định) | "trai".
      // Bên phải: nằm dưới bìa đóng, trên các lớp pop-up đã gập. Bên trái: nằm trên mặt trong bìa.
      // to.lat(t, dur, "trai" | "phai"), to.hien(t, on), to.truoc / to.sau (svg hai mặt)
      so.themTo = function (svgTruoc, o2) {
        o2 = o2 || {};
        var giay = '<rect x="0" y="0" width="' + w + '" height="' + d + '" fill="' + C.PAPER + '" stroke="' + INK + '" stroke-width="5"/>' + keDong(w, d);
        var leaf = api.P(book, { z: zc, rotationY: o2.ben === "trai" ? -180 : 0 });
        var f = api.P(leaf, { z: -1 });
        f.insertAdjacentHTML("beforeend", '<svg class="dio-cut dio-bfh" data-layout-allow-occlusion data-layout-allow-overlap width="' + w + '" height="' + d + '" viewBox="0 0 ' + w + " " + d + '" style="left:0;top:' + -d / 2 + 'px;backface-visibility:hidden;overflow:visible">' + giay + (svgTruoc || "") + "</svg>");
        var b = api.P(leaf, { x: w / 2, z: -1, rotationY: 180 });
        b.insertAdjacentHTML("beforeend", '<svg class="dio-cut dio-bfh" data-layout-allow-occlusion data-layout-allow-overlap width="' + w + '" height="' + d + '" viewBox="0 0 ' + w + " " + d + '" style="left:' + -w / 2 + "px;top:" + -d / 2 + 'px;backface-visibility:hidden;overflow:visible">' + giay + (o2.sau != null ? o2.sau : biaTrongND) + "</svg>");
        var to = { el: leaf, truoc: f.lastElementChild, sau: b.lastElementChild, ben: o2.ben || "phai" };
        to.lat = function (t, dur, sang, ease) {
          var a = sang === "phai" ? -180 : 0, bb = sang === "phai" ? 0 : -180;
          tl.fromTo(leaf, { rotationY: a }, { rotationY: bb, duration: dur || 0.7, ease: ease || "power2.inOut", immediateRender: false }, t);
        };
        to.hien = function (t, on) { if (t == null) gsap.set(leaf, { visibility: on ? "visible" : "hidden" }); else tl.set(leaf, { visibility: on ? "visible" : "hidden" }, t); };
        return to;
      };

      // --- toạ độ thế giới (trong parent)
      so.diemTrang = function (u, v) { return { x: bx + u, y: by - 3, z: bz + v }; };
      // điểm (px, py) trong svg của lớp i khi lớp đã dựng đứng
      so.diemLop = function (i, px, py) {
        var L = so.lop[i].def;
        return { x: bx + L.x - L.w / 2 + px, y: by - 3 - (2 + i) - (L.h - py), z: bz + L.banLe };
      };
      so.tamLop = function (i) { var L = so.lop[i].def; return so.diemLop(i, L.w / 2, L.h / 2); };
      so.vung = function (cao) { return { x0: bx + 20, x1: bx + w - 20, y0: by - (cao || 620), y1: by - 12, z0: bz - d / 2 + 30, z1: bz + d / 2 - 30 }; };
      return so;
    };

    // ------------------------------------------------------------ lớp pop-up dựng sẵn (nội dung qua tham số)
    api.lopPopup = {
      // Đồi tuyết phía sau
      doi: function (w, h, o) {
        o = o || {}; w = w || 420; h = h || 170;
        var s = fp("M 4 " + h + " L 4 " + h * 0.62 + " Q " + w * 0.11 + " " + h * 0.25 + " " + w * 0.22 + " " + h * 0.45 + " Q " + w * 0.33 + " " + h * 0.06 + " " + w * 0.47 + " " + h * 0.38 +
          " Q " + w * 0.6 + " 0 " + w * 0.75 + " " + h * 0.36 + " Q " + w * 0.87 + " " + h * 0.2 + " " + (w - 4) + " " + h * 0.52 + " L " + (w - 4) + " " + h + " Z", C.SNOW, 5) +
          sk("M " + w * 0.33 + " " + h * 0.2 + " Q " + w * 0.37 + " " + h * 0.4 + " " + w * 0.32 + " " + h * 0.56 + " M " + w * 0.6 + " " + h * 0.1 + " Q " + w * 0.65 + " " + h * 0.32 + " " + w * 0.61 + " " + h * 0.52, 3, C.ICE2, ' opacity=".7"') +
          sk("M 30 " + h * 0.72 + " Q " + w * 0.33 + " " + h * 0.64 + " " + w * 0.55 + " " + h * 0.74 + " Q " + w * 0.77 + " " + h * 0.84 + " " + (w - 20) + " " + h * 0.7, 3, C.ICE2, ' opacity=".6"');
        return { svg: s, w: w, h: h, x: o.x, banLe: o.banLe, tre: o.tre };
      },
      // Dãy nhà gỗ có cột khói liền (khói chạy sau khi lớp bật). o.nha: [[x, rộng, cao]], o.khoiCao
      nha: function (w, h, o) {
        o = o || {}; w = w || 400; h = h || 150;
        var top = o.khoiCao == null ? 220 : o.khoiCao, H = h + top, s = "", khoi = [];
        s += fp("M 0 " + H + " L 0 " + (H - 20) + " Q " + w / 2 + " " + (H - 40) + " " + w + " " + (H - 20) + " L " + w + " " + H + " Z", C.SNOW, 4);
        var nhaList = o.nha || [[30, 84, 100], [170, 74, 88], [290, 88, 80]];
        nhaList.forEach(function (n, k) {
          var x = n[0], hw = n[1], hy = H - n[2];
          s += fp("M " + (x + hw - 20) + " " + (hy + 4) + " v -26 h 14 v 30 Z", "#7a4a3a", 3);
          var kk = api.cotKhoi({ x: x + hw - 13, y: hy - 24, cao: top - 10, r0: 7, no: 1.7, troi: 14, n: 18, per: 3.4, seed: 40 + k });
          khoi.push(kk); s += kk.svg;
          s += fp("M " + x + " " + (H - 10) + " L " + x + " " + (hy + 24) + " L " + (x + hw) + " " + (hy + 24) + " L " + (x + hw) + " " + (H - 10) + " Z", C.WOOD, 4);
          s += fp("M " + (x - 9) + " " + (hy + 28) + " L " + (x + hw / 2) + " " + hy + " L " + (x + hw + 9) + " " + (hy + 28) + " Z", C.SNOW, 4);
          s += fp("M " + (x + hw * 0.3) + " " + (hy + 52) + " h 20 v 20 h -20 Z", C.WIN, 3);
        });
        return { svg: s, w: w, h: H, x: o.x, banLe: o.banLe, tre: o.tre, khoi: khoi };
      },
      // Biển tên: dong = [{chu, co}] (chữ trong chu_tren_do_vat). o.w, o.h
      bien: function (dong, o) {
        o = o || {}; var w = o.w || 420, h = o.h || 400;
        return { svg: api.signSVG(dong, { w: w, h: h }), w: w, h: h, x: o.x, banLe: o.banLe, tre: o.tre };
      },
      // Hàng nhà tí hon phía trước (gợi "ít người")
      langNho: function (w, h, o) {
        o = o || {}; w = w || 380; h = h || 80; var n = o.n || 6, st = (w - 20) / n, s = "";
        for (var i = 0; i < n; i++) {
          var x = 12 + i * st, bw = st * 0.66;
          s += fp("M " + x + " " + h + " L " + x + " " + h * 0.48 + " L " + (x + bw) + " " + h * 0.48 + " L " + (x + bw) + " " + h + " Z", C.WOOD, 3) +
            fp("M " + (x - 5) + " " + h * 0.52 + " L " + (x + bw / 2) + " " + h * 0.18 + " L " + (x + bw + 5) + " " + h * 0.52 + " Z", C.SNOW, 3) +
            '<rect x="' + (x + bw * 0.34) + '" y="' + h * 0.64 + '" width="' + bw * 0.3 + '" height="' + bw * 0.3 + '" fill="' + C.WIN + '" stroke="' + INK + '" stroke-width="2"/>';
        }
        return { svg: s, w: w, h: h, x: o.x, banLe: o.banLe, tre: o.tre };
      },
      // Lớp tuỳ ý
      tuy: function (svg, w, h, o) { o = o || {}; return { svg: svg, w: w, h: h, x: o.x, banLe: o.banLe, tre: o.tre, khoi: o.khoi }; }
    };
  });
})();
