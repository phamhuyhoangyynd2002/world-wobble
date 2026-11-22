/* dio-dao-cu.js: đạo cụ giấy dùng chung + hiệu ứng liên tục (khói, hơi, tuyết) chạy theo đồng hồ khung hình.
 * Mọi hiệu ứng lặp tính lại mỗi khung bằng api.moiKhung(fn(t)) (modifiers của một tween đồng hồ) → tua tới khung nào
 * ra đúng khung đó, không repeat:-1, không vị trí âm trên timeline.
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];

  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK, lumpy = api.lumpy;
    var frac = function (v) { return v - Math.floor(v); };

    // ------------------------------------------------------------ đồng hồ khung hình
    var FNS = [], clock = { v: 0 };
    api.moiKhung = function (fn) {
      if (!FNS.length) {
        tl.fromTo(clock, { v: 0 }, { v: api.DUR, duration: api.DUR, ease: "none", immediateRender: true,
          modifiers: { v: function (v) { var t = +v; for (var i = 0; i < FNS.length; i++) FNS[i](t); return v; } } }, 0);
      }
      FNS.push(fn);
      fn(0);
    };
    // độ hiện trong [t0, t1] (mờ vào/ra trong `mo` giây). t0/t1 null = luôn hiện
    function hien(t, t0, t1, mo) {
      mo = mo || 0.4;
      var a = 1;
      if (t0 != null) a = Math.min(a, Math.max(0, (t - t0) / mo));
      if (t1 != null) a = Math.min(a, Math.max(0, (t1 - t) / mo));
      return a;
    }

    // ------------------------------------------------------------ cột khói / hơi nước (liền một khối, viền mực chung)
    // o: x, y (gốc trong hệ svg chứa), cao, r0, no (độ nở), troi (trôi ngang), n, per, loai: "khoi" | "xa" | "hoi", seed
    // Trả về { svg: chuỗi để chèn vào một <svg>, chay(scope, t0, t1) }
    api.cotKhoi = function (o) {
      o = Object.assign({ x: 60, y: 600, cao: 520, r0: 16, no: 2.0, troi: 36, n: 22, per: 4.2, loai: "khoi", seed: 5 }, o || {});
      var cls = api.nid("kh"), r = api.rng(o.seed);
      var filt = o.loai === "hoi" ? "dio-hoi" : o.loai === "xa" ? "dio-khoi-xa" : "dio-khoi";
      var fill = o.loai === "xa" ? "#eef3f5" : o.loai === "hoi" ? "#ffffff" : "#f6f9fa";
      var jit = [];
      var s = '<g class="' + cls + '" filter="url(#' + filt + ')"' + (o.loai === "hoi" ? ' opacity=".9"' : "") + ">";
      for (var i = 0; i < o.n; i++) { s += '<circle cx="' + o.x + '" cy="' + o.y + '" r="0" fill="' + fill + '"/>'; jit.push([0.85 + 0.3 * r(), r()]); }
      s += "</g>";
      return {
        svg: s, cls: cls,
        chay: function (scope, t0, t1) {
          var els = scope.querySelectorAll("." + cls + " circle"), base = t0 == null ? 0 : t0;
          api.moiKhung(function (t) {
            var vis = hien(t, t0, t1, 0.5);
            for (var i = 0; i < els.length; i++) {
              var p = frac((t - base) / o.per + i / o.n), rise = 1 - Math.pow(1 - p, 1.25);
              var a = Math.min(1, p / 0.06) * (p > 0.62 ? (1 - p) / 0.38 : 1) * vis;
              var cx = o.x + o.troi * rise + o.r0 * 0.7 * Math.sin(2 * Math.PI * (p * 1.1 + jit[i][1])) * (0.3 + p);
              var el = els[i];
              el.setAttribute("cx", cx.toFixed(1));
              el.setAttribute("cy", (o.y - o.cao * rise).toFixed(1));
              el.setAttribute("r", (o.r0 * jit[i][0] * (1 + o.no * p)).toFixed(1));
              el.setAttribute("opacity", a.toFixed(3));
            }
          });
        }
      };
    };
    // Khói đứng riêng trong không gian 3D tại (x, y, z) của parent (y = miệng ống khói)
    api.khoi = function (parent, x, y, z, o) {
      o = o || {};
      var sc = o.scale || 1, W = 200, H = (o.cao || 520) + 80;
      var k = api.cotKhoi(Object.assign({}, o, { x: W / 2, y: H - 30, cao: o.cao || 520 }));
      var p = api.P(parent, { x: x, y: y, z: z });
      p.insertAdjacentHTML("beforeend", '<svg class="dio-cut" width="' + W * sc + '" height="' + H * sc + '" viewBox="0 0 ' + W + " " + H + '" style="left:' + -W / 2 * sc + "px;top:" + -(H - 30) * sc + 'px;overflow:visible"' + ">" + k.svg + "</svg>");
      k.chay(p, o.t0, o.t1);
      return p;
    };

    // ------------------------------------------------------------ tuyết
    // Tuyết rơi phủ màn hình (không gian khung hình). o: n, rmin, rmax, blur, seed, t0, t1
    api.tuyetManHinh = function (layer, o) {
      o = Object.assign({ n: 40, rmin: 2.2, rmax: 4.2, blur: 0, seed: 101 }, o || {});
      var r = api.rng(o.seed), s = "", data = [];
      for (var i = 0; i < o.n; i++) {
        var fx = r() * 1920, rad = o.rmin + r() * (o.rmax - o.rmin);
        data.push({ x: fx, r: rad, v: 70 + rad * 14 + r() * 40, ph: r(), sw: 10 + r() * 24, swp: 1.6 + r() * 1.4 });
        s += '<circle cx="' + fx.toFixed(1) + '" cy="-50" r="' + rad.toFixed(1) + '" fill="#ffffff" stroke="#b9c9d0" stroke-width="1.5"/>';
      }
      layer.insertAdjacentHTML("beforeend", '<svg width="1920" height="1080" viewBox="0 0 1920 1080" style="position:absolute;left:0;top:0;overflow:visible;' + (o.blur ? "filter:blur(" + o.blur + "px);" : "") + '">' + s + "</svg>");
      var els = layer.lastElementChild.querySelectorAll("circle");
      api.moiKhung(function (t) {
        var vis = hien(t, o.t0, o.t1, 0.3);
        for (var i = 0; i < els.length; i++) {
          var d = data[i], y = -50 + frac(d.ph + (t * d.v) / 1180) * 1180;
          els[i].setAttribute("cy", y.toFixed(1));
          els[i].setAttribute("cx", (d.x + d.sw * Math.sin((2 * Math.PI * t) / d.swp + d.ph * 6)).toFixed(1));
          els[i].setAttribute("opacity", vis.toFixed(3));
        }
      });
      return layer;
    };
    // Tuyết giấy 3D rơi trong một hộp không gian. o: vung {x0,x1,y0 (trên),y1 (đáy),z0,z1}, n, co, seed, t0, t1, toc (px/s)
    // Bông tuyết vào dần từ trên sau t0 (không xuất hiện đột ngột giữa không trung).
    api.tuyetGiay = function (parent, o) {
      o = Object.assign({ n: 26, co: 22, seed: 303, toc: 150 }, o || {});
      var v = o.vung, r = api.rng(o.seed), span = v.y1 - v.y0, flakes = [];
      var star = function (sz) {
        var c = sz / 2, R = sz / 2 - 2, d = "";
        for (var k = 0; k < 12; k++) { var a = (Math.PI * k) / 6, rr = k % 2 ? R * 0.5 : R; d += (k ? " L " : "M ") + (c + rr * Math.cos(a)).toFixed(1) + " " + (c + rr * Math.sin(a)).toFixed(1); }
        return '<path d="' + d + ' Z" fill="#ffffff" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>';
      };
      for (var i = 0; i < o.n; i++) {
        var sz = o.co * (0.6 + 0.8 * r());
        var p = api.cut(parent, sz, sz, i % 3 ? '<circle cx="' + sz / 2 + '" cy="' + sz / 2 + '" r="' + (sz / 2 - 2) + '" fill="#ffffff" stroke="' + INK + '" stroke-width="2"/>' : star(sz),
          { pos: { x: v.x0, y: v.y0, z: v.z0 }, ax: sz / 2, ay: sz / 2, f: "drop-shadow(1px 2px 0 #b9c9d0)" });
        flakes.push({ el: p, x: v.x0 + (v.x1 - v.x0) * r(), z: v.z0 + (v.z1 - v.z0) * r(), ph: r(), sp: o.toc * (0.7 + 0.6 * r()), sw: 8 + 18 * r(), swp: 1.4 + r(), rot: 120 * (r() - 0.5) });
      }
      api.moiKhung(function (t) {
        var base = o.t0 == null ? 0 : o.t0, vis1 = o.t1 == null ? 1 : Math.max(0, Math.min(1, (o.t1 - t) / 0.4));
        flakes.forEach(function (f) {
          var dist = f.sp * (t - base) - f.ph * span;
          var on = dist >= 0 && vis1 > 0;
          var y = v.y0 + (on ? dist % span : 0);
          var x = f.x + f.sw * Math.sin((2 * Math.PI * t) / f.swp + f.ph * 6);
          f.el.style.opacity = on ? vis1 : 0;
          f.el.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px," + f.z.toFixed(1) + "px) rotateZ(" + (f.rot * t).toFixed(1) + "deg)";
        });
      });
      return flakes;
    };

    // ------------------------------------------------------------ cá
    // Cá đông cứng: tâm (0,0), đầu hướng +x, dài ~260. serene: mắt lim dim
    api.fishSVG = function (cls, serene) {
      var body = "M -118 0 C -88 -34 2 -44 62 -34 C 92 -28 114 -12 118 0 C 114 12 92 28 62 32 C 2 42 -88 32 -118 0 Z";
      var s = '<g class="' + (cls || "") + '">';
      s += fp("M -112 0 L -152 -32 C -144 -10 -144 10 -152 32 Z", C.FISH1, 5);
      s += fp("M -40 -40 C -20 -64 22 -62 38 -38 Z", C.FISH1, 5);
      s += fp(body, C.FISH2, 6);
      s += '<path d="M -110 4 C -80 30 0 38 60 30 C 90 26 110 12 116 4 Z" fill="' + C.FISH3 + '"/>';
      s += '<path d="M -114 -2 C -80 -30 0 -40 60 -31 C 84 -27 104 -16 112 -6 C 90 -14 40 -18 0 -16 C -50 -14 -90 -8 -114 -2 Z" fill="' + C.FISH1 + '" opacity=".75"/>';
      s += sk("M 78 -24 C 68 -8 68 8 78 24", 4);
      for (var i = 0; i < 5; i++) s += sk("M " + (-60 + i * 26) + " -6 q 8 8 0 16", 2.5, INK, ' opacity=".35"');
      s += '<path d="M -70 -26 l 8 -6 l 10 4 l 12 -5 l 10 6 z M 10 -32 l 10 -5 l 14 5 z M -30 24 l 10 8 l 8 -6 z M 40 26 l 8 6 l 10 -5 z" fill="#fff" opacity=".85"/>';
      s += '<path d="M -60 31 l 5 14 l 5 -13 M -20 35 l 4 11 l 4 -11 M 30 32 l 5 12 l 4 -12" fill="' + C.FROST + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>';
      s += '<g class="feyeO"' + (serene ? ' opacity="0"' : "") + '><circle cx="94" cy="-8" r="8" fill="#fff" stroke="' + INK + '" stroke-width="3.5"/><circle cx="96" cy="-8" r="3.6" fill="' + INK + '"/></g>';
      s += '<g class="feyeS"' + (serene ? "" : ' opacity="0"') + ">" + sk("M 86 -9 C 90 -3 98 -3 102 -9", 4) + sk("M 104 7 C 108 10 112 9 114 6", 3) + "</g>";
      s += sk("M 108 6 C 112 6 116 4 118 2", 3);
      return s + "</g>";
    };
    // Cá đã rã đông, mềm oặt (vắt qua mép): thân nằm, nhóm .lhead (đầu rủ, xoay bằng api.TF quanh gốc cổ)
    // Khung 440×280, điểm vắt (mép) tại (250, 72)
    api.caMemSVG = function () {
      return '<g transform="translate(150 60)">' +
        fp("M -118 0 C -88 -30 0 -38 60 -30 C 80 -26 96 -16 104 -8 L 104 26 C 80 30 0 36 -118 0 Z", C.FISH2, 6) +
        fp("M -112 0 L -150 -28 C -142 -8 -142 10 -148 30 Z", C.FISH1, 5) +
        '<path d="M -110 2 C -60 20 20 30 100 24 L 100 30 C 20 36 -80 26 -110 2 Z" fill="' + C.FISH3 + '"/>' +
        '<path d="M -100 -6 C -60 -22 0 -28 50 -24" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity=".55"/></g>' +
        '<g transform="translate(250 72)"><g class="lhead">' +
        fp("M 0 -20 C 30 -18 60 -10 78 4 C 96 18 100 32 92 40 C 70 50 30 40 0 26 Z", C.FISH2, 6) + sk("M 30 -12 C 22 4 22 18 30 30", 4) +
        sk("M 58 6 C 62 12 70 12 74 6", 4) + sk("M 84 30 C 88 34 92 34 94 30", 3) +
        '<path d="M 90 42 C 94 50 96 56 92 60 C 88 56 88 50 90 42 Z" fill="' + C.ICE + '" stroke="' + INK + '" stroke-width="2.5"/></g></g>';
    };

    // ------------------------------------------------------------ nhà gỗ, biển, hàng rào, nhiệt kế
    // houseSVG(w, h, o): o.chim (x ống khói), o.door [lx, w, h], o.wins [[x,y,w,h]], o.seed, o.col
    api.houseSVG = function (w, h, o) {
      o = o || {};
      var wt = Math.round(h * 0.42), r = api.rng(o.seed || 11), s = "";
      if (o.chim != null) s += fp("M " + o.chim + " " + (wt - 30) + " L " + o.chim + " " + Math.round(h * 0.12) + " L " + (o.chim + 44) + " " + Math.round(h * 0.12) + " L " + (o.chim + 44) + " " + (wt - 30) + " Z", "#7a4a3a", 5) +
        fp("M " + (o.chim - 6) + " " + Math.round(h * 0.12) + " C " + o.chim + " " + Math.round(h * 0.12 - 18) + " " + (o.chim + 44) + " " + Math.round(h * 0.12 - 18) + " " + (o.chim + 50) + " " + Math.round(h * 0.12) + " Z", C.SNOW, 4);
      var wall = "M 24 " + wt + " L " + (w - 24) + " " + wt + " L " + (w - 24) + " " + h + " L 24 " + h + " Z";
      if (o.door) wall += " M " + o.door[0] + " " + h + " L " + o.door[0] + " " + (h - o.door[2] + 20) + " Q " + (o.door[0] + o.door[1] / 2) + " " + (h - o.door[2] - 8) + " " + (o.door[0] + o.door[1]) + " " + (h - o.door[2] + 20) + " L " + (o.door[0] + o.door[1]) + " " + h + " Z";
      s += fp(wall, o.col || C.WOOD, 6, ' fill-rule="evenodd"');
      for (var y = wt + 28; y < h - 6; y += 30) {
        if (o.door && y > h - o.door[2]) s += sk("M 30 " + y + " L " + (o.door[0] - 6) + " " + y, 3, C.WOOD2) + sk("M " + (o.door[0] + o.door[1] + 6) + " " + y + " L " + (w - 30) + " " + y, 3, C.WOOD2);
        else s += sk("M 30 " + y + " L " + (w - 30) + " " + y, 3, C.WOOD2);
      }
      s += fp("M 0 " + (wt + 16) + " L " + w / 2 + " " + Math.round(h * 0.08) + " L " + w + " " + (wt + 16) + " Z", "#4a3122", 6);
      s += fp("M -6 " + (wt + 20) + " L " + w / 2 + " " + Math.round(h * 0.06) + " L " + (w + 6) + " " + (wt + 20) + " " + lumpy(w + 6, -6, wt + 20, 22, 10, o.seed || 4).replace(/^M [\d.\-]+ [\d.\-]+/, "") + " Z", C.SNOW, 6);
      (o.wins || []).forEach(function (wi) {
        s += fp("M " + wi[0] + " " + wi[1] + " h " + wi[2] + " v " + wi[3] + " h " + -wi[2] + " Z", C.WIN, 5) + sk("M " + (wi[0] + wi[2] / 2) + " " + wi[1] + " v " + wi[3] + " M " + wi[0] + " " + (wi[1] + wi[3] / 2) + " h " + wi[2], 4) +
          '<path d="M ' + (wi[0] + 3) + " " + (wi[1] + 3) + " l " + wi[2] * 0.35 + " 0 l " + -wi[2] * 0.35 + " " + wi[3] * 0.35 + ' z" fill="#fff" opacity=".8"/>' +
          fp("M " + (wi[0] - 10) + " " + (wi[1] + wi[3]) + " h " + (wi[2] + 20) + " v 12 h " + (-wi[2] - 20) + " Z", C.PAPER, 4);
      });
      s += fp(lumpy(10, w - 10, h, -18 - 10 * r(), 8, (o.seed || 4) + 3) + " L " + (w - 10) + " " + h + " Z", C.SNOW, 5);
      return s;
    };
    // Biển gỗ phủ tuyết. dong: [{chu, co, dam, mau}] (chữ PHẢI có trong chu_tren_do_vat). o: w, h
    // Mặc định w 420 × h 400; chữ dòng 1 cỡ 66, dòng 2 cỡ 58 (đủ ≥ 40px khi camera ở tầm trung, xem README).
    api.signSVG = function (dong, o) {
      o = o || {};
      var w = o.w || 420, h = o.h || 400, bh = Math.round(h * 0.5), s = "";
      s += fp("M " + w * 0.14 + " " + h + " L " + (w * 0.15) + " " + (bh - 20) + " L " + (w * 0.2) + " " + (bh - 20) + " L " + (w * 0.19) + " " + h + " Z", C.WOOD, 5);
      s += fp("M " + w * 0.86 + " " + h + " L " + (w * 0.85) + " " + (bh - 20) + " L " + (w * 0.8) + " " + (bh - 20) + " L " + (w * 0.81) + " " + h + " Z", C.WOOD, 5);
      s += fp("M 10 28 L " + (w - 10) + " 20 L " + (w - 6) + " " + bh + " L 6 " + (bh + 4) + " Z", C.PAPER, 7);
      s += fp(lumpy(8, w - 8, 28, -16, 10, 5) + " L " + (w - 8) + " 20 C " + (w - 40) + " 4 40 6 8 28 Z", C.SNOW, 4);
      var n = dong.length, y0 = 28, y1 = bh;
      dong.forEach(function (d, i) {
        var co = d.co || (i === 0 ? 66 : 58);
        var yb = y0 + ((y1 - y0) * (i + 0.5)) / n + co * 0.34;
        s += api.txt(w / 2, yb.toFixed(0), co, d.dam || (i === 0 ? 800 : 700), d.chu, d.mau || (i === 0 ? INK : C.TEAL));
      });
      s += fp(lumpy(w * 0.08, w * 0.92, h, -24, 6, 9) + " L " + w * 0.92 + " " + h + " Z", C.SNOW, 4);
      return s;
    };
    api.fenceSVG = function (w, seed) {
      var s = "", r = api.rng(seed);
      for (var x = 30; x < w - 20; x += 120) s += fp("M " + x + " 300 L " + (x + 4) + " " + (60 + r() * 30) + " L " + (x + 34) + " " + (54 + r() * 30) + " L " + (x + 38) + " 300 Z", C.WOOD, 6) + fp("M " + (x - 4) + " " + (64 + r() * 20) + " C " + x + " 40 " + (x + 38) + " 40 " + (x + 42) + " " + (60 + r() * 20) + " Z", C.SNOW, 4);
      s += fp("M 10 130 L " + (w - 10) + " 124 L " + (w - 10) + " 146 L 10 152 Z", "#8a5a3b", 5) + fp("M 10 210 L " + (w - 10) + " 204 L " + (w - 10) + " 226 L 10 232 Z", "#8a5a3b", 5);
      s += fp(lumpy(0, w, 300, -60, 6, seed + 1) + " L " + w + " 300 Z", C.SNOW, 6);
      return s;
    };
    // Nhiệt kế treo tường 230×600: dong = [chu1, chu2] (trong chu_tren_do_vat). Cột thủy ngân class "merc" (svgOrigin "115 364")
    api.thermoSVG = function (dong) {
      var s = fp("M 20 30 C 20 12 30 8 46 8 L 184 8 C 200 8 210 12 210 30 L 210 572 C 210 588 200 592 184 592 L 46 592 C 30 592 20 588 20 572 Z", C.PAPER, 7) +
        '<circle cx="115" cy="24" r="6" fill="' + INK + '"/>' + fp("M 101 50 C 101 40 129 40 129 50 L 129 352 L 101 352 Z", "#ffffff", 5);
      for (var i = 0; i < 14; i++) s += sk("M 138 " + (70 + i * 20) + " L " + (i % 2 ? 152 : 162) + " " + (70 + i * 20), 3);
      s += '<rect class="merc" x="108" y="64" width="14" height="300" rx="5" fill="' + C.MAT + '"/>' +
        '<circle cx="115" cy="384" r="30" fill="' + C.MAT + '" stroke="' + INK + '" stroke-width="6"/>' + sk("M 104 372 Q 108 366 116 366", 4, "#fff", ' opacity=".7"');
      (dong || []).forEach(function (d, k) { s += api.txt(115, 476 + k * 70, 54, 900, d, k ? C.TEAL : INK); });
      return s;
    };
    // Bàn tay đeo găng (người dân dạng chung, không mặt), khung 420×520, cổ tay ở đáy
    api.gangTaySVG = function () {
      return fp("M 220 520 L 214 260 C 214 230 290 230 292 262 L 300 520 Z", "#2f3b3c", 6) + fp("M 206 270 C 206 240 300 240 302 270 L 304 300 C 280 312 230 312 206 300 Z", C.PAPER, 5) +
        fp("M 212 270 C 190 230 196 170 230 150 C 250 136 284 150 292 180 C 300 210 296 246 290 270 Z", C.TEAL, 6) + fp("M 216 200 C 186 196 176 170 196 160 C 210 152 226 168 228 186", C.TEAL, 5) +
        sk("M 226 236 C 246 242 270 242 288 236", 4, C.PAPER, ' opacity=".7"');
    };
    // Cốc nóng (đáy tâm 0,0 → miệng y = -60), có cột hơi nước liền. o: caoHoi, troiHoi (trôi ngang, + sang phải), seed. Trả về { svg, hoi } – gọi hoi.chay(scope, t0, t1)
    api.cocNong = function (o) {
      o = o || {};
      var hoi = api.cotKhoi({ x: 0, y: -70, cao: o.caoHoi || 150, r0: 9, no: 1.4, troi: o.troiHoi == null ? 10 : o.troiHoi, n: 16, per: 2.4, loai: "hoi", seed: o.seed || 9 });
      var s = '<g class="coc">' + hoi.svg + fp("M -40 -60 L 40 -60 L 34 20 L -34 20 Z", C.PAPER, 6) + sk("M 40 -44 C 66 -44 66 -6 36 -6", 6) + sk("M -38 -34 L 38 -34", 6, C.TERRA) +
        '<ellipse cx="0" cy="-58" rx="36" ry="6" fill="#8a4f24" stroke="' + INK + '" stroke-width="3"/></g>';
      return { svg: s, hoi: hoi };
    };
    // Vũng nước trên mặt phẳng y; trả về nút để tween scale
    api.vungNuoc = function (parent, x, y, z, w, d) {
      return api.floorPlane(parent, x, y, z, w, d, "border-radius:50%;background:radial-gradient(closest-side, rgba(170,215,235,.9), rgba(150,200,225,.8) 70%, rgba(150,200,225,0));border:4px solid rgba(31,35,38,.6);");
    };
    api.giotNuoc = function (parent, x, y, z) {
      return api.cut(parent, 30, 40, '<path d="M 15 2 C 22 16 28 24 28 30 C 28 38 2 38 2 30 C 2 24 8 16 15 2 Z" fill="' + C.ICE + '" stroke="' + INK + '" stroke-width="3"/>', { pos: { x: x, y: y, z: z }, f: api.F.AM_NHO });
    };
    // Giọt nước rơi từ yTu xuống yToi tại t (thời gian rơi d)
    api.roiGiot = function (giot, t, yTu, yToi, d) {
      d = d || 0.3;
      tl.fromTo(giot, { y: yTu, opacity: 1, scaleY: 1 }, { y: yToi, scaleY: 1.25, duration: d, ease: "power2.in", immediateRender: false }, t);
      tl.set(giot, { opacity: 0 }, t + d + 0.01);
    };
  });
})();
