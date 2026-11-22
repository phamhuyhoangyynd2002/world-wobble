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

/* ---- Đạo cụ bàn kỷ vật bổ sung (18/11/2026, tập 1 Oymyakon bản hoạt hình trọn tập) ----
 * Chỉ THÊM hàm, không đổi hàm cũ. Mọi đồ vật không có chữ, trừ dấu phán quyết (chữ qua api.txt, đã kiểm chu_tren_do_vat).
 * gangLoSVG/deoGang (găng lò nướng trên tay Wob), caNamSVG (cá nằm trên bàn), chaiNuocSVG (đông/tan), toRoiSVG,
 * butChiSVG, ongButNhoSVG, conDauSVG, hopMucSVG, dauPhanQuyetSVG, banChaiSVG, khanDoSVG, banDoGiaySVG (bản đồ đồ chơi,
 * KHÔNG phải bản đồ thật), baLoTo (ba lô to quá cỡ 2 lớp), tuDong (tủ đông nhỏ 3D có cửa), nhaNhoSVG, truongHocSVG,
 * tramKhiTuongSVG, khachSVG (khách dạng chung, không mặt).
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];

  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;

    // ------------------------------------------------------------ găng lò nướng (tâm = bàn tay, ngón hướng +y)
    api.gangLoSVG = function () {
      return '<g class="gang-lo">' +
        fp("M -27 -30 L 27 -30 L 25 -4 L -25 -4 Z", C.PAPER, 4) + sk("M -24 -18 L 24 -18", 3, C.MAT, ' opacity=".8"') +
        fp("M -25 -6 C -32 22 -26 56 0 60 C 26 56 32 22 25 -6 Z", C.MAT, 5) +
        fp("M 23 6 C 42 2 48 24 33 32 C 27 34 23 30 22 24 Z", C.MAT, 4) +
        sk("M -16 6 L 10 32 M -20 26 L 2 48 M 0 -2 L 18 16 M -16 44 L -6 54 M 10 4 L -12 26 M 16 22 L -8 46", 2.5, INK, ' opacity=".4"') + "</g>";
    };
    // Đeo / tháo găng: chèn găng vào nhóm đồ cầm (vẽ đè lên đồ đang cầm), ẩn chấm bàn tay. t null = đặt ngay
    api.deoGang = function (w, side, on, t) {
      side = side || "L";
      var key = "gang" + side;
      if (!w[key]) {
        w["hold" + side].insertAdjacentHTML("beforeend", api.gangLoSVG());
        w[key] = w["hold" + side].lastElementChild;
        w["handEl" + side] = w.svg.querySelector(".hand" + side);
        gsap.set(w[key], { opacity: 0 });
      }
      var set = function (el, v) { if (t == null) gsap.set(el, v); else tl.set(el, v, t); };
      set(w[key], { opacity: on ? 1 : 0 });
      set(w["handEl" + side], { opacity: on ? 0 : 1 });
      return w[key];
    };

    // ------------------------------------------------------------ cá nằm trên bàn (khung 320×124, neo giữa đáy). huong −1: đầu sang trái
    api.caNamSVG = function (huong, serene) {
      return '<g transform="translate(160 70) scale(' + (huong < 0 ? -1 : 1) + ' 1)">' + api.fishSVG("ca-nam", serene) + "</g>";
    };

    // ------------------------------------------------------------ chai nước nhỏ (khung 90×170, đáy y = 168). tan: đã tan (nước trong, óc ách)
    // .chai-loe: quầng sáng (opacity 0); .chai-nuoc: mặt nước (tan) để lắc
    api.chaiNuocSVG = function (tan) {
      var s = '<circle class="chai-loe" cx="45" cy="96" r="86" fill="url(#dio-glowW)" opacity="0"/>';
      var than = "M 34 26 L 56 26 L 56 40 C 74 50 80 62 80 80 L 80 154 C 80 164 74 168 64 168 L 26 168 C 16 168 10 164 10 154 L 10 80 C 10 62 16 50 34 40 Z";
      if (tan) {
        s += fp(than, "#eef7fa", 5);
        s += '<g class="chai-nuoc"><path d="M 13 98 C 30 90 60 104 77 94 L 77 154 C 77 162 72 165 64 165 L 26 165 C 18 165 13 162 13 154 Z" fill="' + C.SEA + '" opacity=".72"/>' +
          sk("M 14 98 C 30 90 60 104 76 94", 3, INK, ' opacity=".55"') + "</g>";
        s += '<circle cx="34" cy="130" r="5" fill="#fff" opacity=".85"/><circle cx="54" cy="144" r="3.5" fill="#fff" opacity=".85"/><circle cx="46" cy="114" r="3" fill="#fff" opacity=".75"/>';
      } else {
        s += fp(than, C.ICE, 5);
        s += '<path d="M 14 78 C 30 68 60 86 76 74 L 76 154 C 76 162 72 164 64 164 L 26 164 C 18 164 14 162 14 154 Z" fill="#ffffff" opacity=".55"/>';
        s += sk("M 26 100 l 12 14 l -6 12 M 56 90 l -8 16 l 10 10 M 40 140 l 14 -8", 2.5, C.ICE2);
      }
      s += fp("M 32 6 L 58 6 L 58 26 L 32 26 Z", C.TEAL, 4);
      if (!tan) s += fp("M 28 10 C 34 0 56 0 62 10 L 60 14 L 30 14 Z", C.FROST, 3);
      s += sk("M 22 66 C 20 90 20 120 22 150", 5, "#ffffff", ' opacity=".7"');
      return s;
    };

    // ------------------------------------------------------------ tờ rơi gấp ba (khung 170×120), hình mặt trời, sóng nước, dây cờ; không chữ
    api.toRoiSVG = function () {
      return fp("M 6 22 L 60 10 L 112 22 L 164 10 L 164 112 L 112 118 L 60 108 L 6 118 Z", C.PAPER, 5) +
        sk("M 60 10 L 60 108 M 112 22 L 112 118", 3, INK, ' opacity=".5"') +
        '<circle cx="34" cy="54" r="14" fill="#e7b34b" stroke="' + INK + '" stroke-width="3"/>' + sk("M 34 30 l 0 -8 M 52 40 l 6 -6 M 16 40 l -6 -6", 3) +
        sk("M 70 64 q 8 -8 16 0 t 16 0 M 70 80 q 8 -8 16 0 t 16 0", 3.5, C.SEA) +
        sk("M 120 40 L 158 34", 2.5) + fp("M 124 40 l 6 14 l 6 -15 Z", C.TERRA, 2) + fp("M 138 38 l 6 14 l 6 -15 Z", C.TEAL, 2) + fp("M 152 35 l 5 13 l 5 -14 Z", "#e7b34b", 2) +
        fp("M 122 92 L 140 66 L 158 92 Z", C.SNOW, 3);
    };

    // ------------------------------------------------------------ bút chì (tâm 0,0; nằm dọc +x, dài 165), ống bút nhỏ (khung 120×170)
    api.butChiSVG = function () {
      return fp("M -75 -8 L 50 -8 L 50 8 L -75 8 Z", "#e7b34b", 4) + fp("M 50 -8 L 75 0 L 50 8 Z", "#e9c79a", 4) + fp("M 68 -2.5 L 75 0 L 68 2.5 Z", INK, 1) +
        fp("M -90 -8 L -75 -8 L -75 8 L -90 8 Z", C.CHEEK, 4) + sk("M -75 -8 L -75 8", 4, "#9aa39a");
    };
    api.ongButNhoSVG = function () {
      return fp("M 34 80 L 26 6 L 40 6 L 46 80 Z", C.TERRA, 4) + fp("M 70 80 L 80 18 L 94 22 L 82 80 Z", C.SEA, 4) +
        fp("M 14 168 L 10 72 L 110 72 L 106 168 Z", C.TEAL, 6) + sk("M 14 100 L 106 100", 4, C.PAPER);
    };

    // ------------------------------------------------------------ con dấu cao su (gốc = tay cầm, thân hướng +y; đáy cao su y = 96), hộp mực (khung 170×60)
    api.conDauSVG = function () {
      return fp("M -11 6 L 11 6 L 14 50 L -14 50 Z", "#8a5a3b", 4) + '<circle cx="0" cy="0" r="20" fill="#9c5b3b" stroke="' + INK + '" stroke-width="5"/>' +
        sk("M -8 -8 Q -2 -12 4 -10", 3, "#fff", ' opacity=".55"') +
        fp("M -46 50 L 46 50 L 46 84 L -46 84 Z", "#6b4a33", 5) + sk("M -40 62 L 40 62", 3, INK, ' opacity=".35"') +
        fp("M -48 84 L 48 84 L 46 96 L -46 96 Z", C.MAT, 4);
    };
    api.hopMucSVG = function () {
      return fp("M 8 30 L 162 30 L 158 58 L 12 58 Z", "#3c4b4e", 5) + fp("M 20 22 L 150 22 L 156 32 L 14 32 Z", C.MAT, 4) + sk("M 30 27 L 140 27", 2.5, "#fff", ' opacity=".35"');
    };
    // Dấu phán quyết đỏ in trên trang (chuỗi svg, tâm cx, cy). chu PHẢI có trong chu_tren_do_vat. cls để bật/tắt
    api.dauPhanQuyetSVG = function (chu, cx, cy, co, goc, cls) {
      co = co || 80; var w = co * 3.5, h = co * 1.5, r = api.rng(77), MUC = "#a8322a"; // mực đỏ sẫm: tương phản ≥ 3:1 trên giấy dưới đèn
      var s = '<g class="' + (cls || "dau-an") + '" transform="translate(' + cx + " " + cy + ") rotate(" + (goc == null ? -7 : goc) + ')">';
      s += '<rect x="' + -w / 2 + '" y="' + -h / 2 + '" width="' + w + '" height="' + h + '" rx="12" fill="none" stroke="' + MUC + '" stroke-width="9"/>';
      s += '<rect x="' + (-w / 2 + 14) + '" y="' + (-h / 2 + 14) + '" width="' + (w - 28) + '" height="' + (h - 28) + '" rx="6" fill="none" stroke="' + MUC + '" stroke-width="3.5"/>';
      s += api.txt(0, (co * 0.35).toFixed(0), co, 900, chu, MUC, ' letter-spacing="' + (co * 0.05).toFixed(1) + '"');
      for (var i = 0; i < 30; i++) s += '<circle cx="' + ((r() - 0.5) * w).toFixed(1) + '" cy="' + ((r() - 0.5) * h).toFixed(1) + '" r="' + (1.2 + r() * 3).toFixed(1) + '" fill="' + C.PAPER + '" opacity=".8"/>';
      return s + "</g>";
    };

    // ------------------------------------------------------------ đồ xếp ba lô: bàn chải (tâm 0,0, dài 150), khăn đỏ (khung 160×130), bản đồ giấy đồ chơi
    api.banChaiSVG = function () {
      return fp("M -75 -7 C -75 -12 30 -10 40 -6 L 40 6 C 30 10 -75 12 -75 7 Z", C.TEAL, 4) +
        fp("M 34 -10 L 74 -10 L 74 -2 L 34 -2 Z", "#ffffff", 3) + sk("M 40 -10 l 0 -14 M 48 -10 l 0 -16 M 56 -10 l 0 -16 M 64 -10 l 0 -16 M 72 -10 l 0 -14", 4, C.SEA);
    };
    api.khanDoSVG = function () {
      return fp("M 10 40 C 50 20 110 20 150 40 L 146 72 C 108 56 52 56 14 72 Z", C.TERRA, 5) + fp("M 104 60 L 96 116 L 126 118 L 130 62 Z", C.TERRA, 5) +
        sk("M 30 50 C 60 40 100 40 130 50", 4, C.PAPER, ' opacity=".9"') + sk("M 100 104 L 126 106", 4, C.PAPER) + sk("M 98 116 l -1 8 M 108 117 l 0 8 M 118 118 l 1 8", 3);
    };
    // Bản đồ đồ chơi 180×130 tâm (0,0): mặt trước chỉ có hình kí hiệu (núi, cây, nhà, đường chấm, dấu X, mặt trời) – không địa lý thật,
    // không chữ; mặt sau trống. Nhóm .bd-truoc / .bd-sau (canh.js lật bằng scaleX quanh 0 và đổi opacity hai mặt).
    api.banDoGiaySVG = function () {
      var fr = fp("M -90 -65 L 90 -65 L 90 65 L -90 65 Z", "#f4ead2", 5) + sk("M -30 -65 L -30 65 M 30 -65 L 30 65 M -90 0 L 90 0", 2, INK, ' opacity=".25"');
      var tr = '<g class="bd-truoc">' + fr +
        fp("M -78 30 L -58 -6 L -38 30 Z", "#9aa39a", 3) + fp("M -64 4 L -58 -6 L -52 4 Z", C.SNOW, 2) + fp("M -48 30 L -32 2 L -16 30 Z", "#9aa39a", 3) +
        fp("M 50 -30 L 58 -48 L 66 -30 Z", "#5E9E6A", 3) + fp("M 64 -24 L 72 -42 L 80 -24 Z", "#5E9E6A", 3) +
        fp("M 44 34 L 44 20 L 56 12 L 68 20 L 68 34 Z", C.WOOD, 3) +
        '<circle cx="-62" cy="-40" r="12" fill="#e7b34b" stroke="' + INK + '" stroke-width="3"/>' +
        sk("M -20 40 C 0 20 10 -10 30 -20 C 44 -26 56 -8 70 -4", 3.5, C.MAT, ' stroke-dasharray="2 9"') + sk("M 64 -10 l 12 12 M 76 -10 l -12 12", 4, C.MAT) + "</g>";
      return tr + '<g class="bd-sau" opacity="0">' + fp("M -90 -65 L 90 -65 L 90 65 L -90 65 Z", "#efe6cf", 5) + "</g>";
    };

    // ------------------------------------------------------------ ba lô to quá cỡ (2 lớp: sau + trước; đồ rơi vào giữa hai lớp thì khuất)
    // Trả về { truoc, sau, mieng: {x, y, z} (giữa miệng ba lô, toạ độ thế giới) }
    api.baLoTo = function (parent, x, y, z, o) {
      o = o || {}; var s = o.s || 1, W = 340, H = 440;
      var sau = api.cut(parent, W, H,
        fp("M 44 150 C 44 92 296 92 296 150 L 296 420 L 44 420 Z", C.PACK_DARK, 6) +
        '<ellipse cx="170" cy="128" rx="120" ry="28" fill="#3a2414" stroke="' + INK + '" stroke-width="5"/>' +
        fp("M 56 116 C 70 26 270 26 284 116 C 240 96 100 96 56 116 Z", C.PACK, 6) + sk("M 120 70 L 120 104 M 220 70 L 220 104", 4, INK, ' opacity=".5"'),
        { pos: { x: x, y: y, z: z - 44, scale: s }, f: api.F.AM });
      var truoc = api.cut(parent, W, H,
        fp("M 30 146 C 30 128 50 124 70 126 L 270 126 C 290 124 310 128 310 146 L 314 400 C 314 424 300 436 276 436 L 64 436 C 40 436 26 424 26 400 Z", C.PACK, 7) +
        fp("M 82 250 L 258 250 L 254 370 C 254 386 244 394 228 394 L 112 394 C 96 394 86 386 86 370 Z", C.PACK_DARK, 6) +
        sk("M 92 280 L 248 280", 4, INK, ' opacity=".5"') + fp("M 152 262 L 188 262 L 188 294 L 152 294 Z", C.PAPER2, 4) +
        sk("M 112 128 L 104 250 M 228 128 L 236 250", 10, C.PACK_DARK) + sk("M 112 128 L 104 250 M 228 128 L 236 250", 3, INK, ' opacity=".6"') +
        fp("M 16 404 C 16 388 34 380 60 380 L 280 380 C 306 380 324 388 324 404 C 324 422 306 436 280 436 L 60 436 C 34 436 16 422 16 404 Z", C.MAT, 6) +
        sk("M 120 382 L 120 434 M 220 382 L 220 434", 4, INK, ' opacity=".5"') + sk("M 60 160 C 50 200 48 230 52 260", 6, "#ffffff", ' opacity=".35"'),
        { pos: { x: x, y: y, z: z, scale: s }, f: api.F.AM });
      return { truoc: truoc, sau: sau, mieng: { x: x, y: y - (H - 132) * s, z: z - 22 } };
    };

    // ------------------------------------------------------------ tủ đông nhỏ (hộp 3D, cửa bản lề trái mở về phía người xem)
    // o: w, h, d. Trả về { goc, cua, ke (P trên kệ giữa, toạ độ trong tủ), keY, mo(t, d), dong(t, d), suong(t0, t1) }
    api.tuDong = function (parent, x, y, z, o) {
      o = o || {};
      var W = o.w || 280, H = o.h || 320, D = o.d || 210, yc = y - H / 2;
      var ngoai = "background:linear-gradient(90deg,#e9eff1,#cbd9df);border:6px solid " + INK + ";border-radius:12px;";
      var trong = "background:linear-gradient(#b7dcea,#e6f4fa);border:4px solid #6fa9c2;";
      var g = api.P(parent, { x: x, y: 0, z: z });
      api.plane(g, { x: 0, y: yc, z: -D / 2 }, W, H, trong);
      api.plane(g, { x: -W / 2, y: yc, z: 0, rotationY: 90 }, D, H, ngoai);
      api.plane(g, { x: W / 2, y: yc, z: 0, rotationY: 90 }, D, H, ngoai);
      api.plane(g, { x: -W / 2 + 9, y: yc, z: 0, rotationY: 90 }, D - 10, H - 16, trong);
      api.plane(g, { x: W / 2 - 9, y: yc, z: 0, rotationY: 90 }, D - 10, H - 16, trong);
      api.floorPlane(g, 0, y - H, 0, W, D, ngoai);
      api.floorPlane(g, 0, y - H + 9, 0, W - 16, D - 10, trong);
      api.floorPlane(g, 0, y - 10, 0, W - 16, D - 10, trong);
      var keY = y - H * 0.42;
      api.floorPlane(g, 0, keY, 0, W - 18, D - 12, "background:rgba(255,255,255,.55);border:4px solid #6fa9c2;");
      [-W / 2 + 26, W / 2 - 26].forEach(function (fx) { api.plane(g, { x: fx, y: y - 4, z: D / 2 - 14 }, 30, 8, "background:" + INK + ";border-radius:3px;"); });
      // cửa: bản lề cạnh trái mặt trước
      var cua = api.P(g, { x: -W / 2, y: yc, z: D / 2 + 2, rotationY: 0 });
      api.plane(cua, { x: W / 2, y: 0, z: 0 }, W - 4, H - 4, "background:linear-gradient(#dfe9ee,#c9d9e0);border:6px solid " + INK + ";border-radius:12px;box-shadow: inset 0 0 0 16px rgba(111,169,194,.35);");
      api.plane(cua, { x: W / 2, y: 0, z: 3 }, W, H, ngoai);
      api.cut(cua, W, H,
        sk("M " + (W - 42) + " " + (H * 0.22) + " L " + (W - 42) + " " + (H * 0.62), 14, C.TEAL) + sk("M " + (W - 42) + " " + (H * 0.22) + " L " + (W - 42) + " " + (H * 0.62), 4, INK, ' opacity=".5"') +
        sk("M 30 " + (H - 46) + " L " + (W - 30) + " " + (H - 46), 4, INK, ' opacity=".3"') +
        sk("M " + W * 0.38 + " " + (H * 0.3) + " l 0 56 M " + (W * 0.38 - 24) + " " + (H * 0.3 + 28) + " l 48 0 M " + (W * 0.38 - 17) + " " + (H * 0.3 + 11) + " l 34 34 M " + (W * 0.38 + 17) + " " + (H * 0.3 + 11) + " l -34 34", 5, C.ICE2),
        { pos: { x: 0, y: H / 2, z: 4 }, ax: 0, ay: H });
      var ke = api.P(g, { x: 0, y: keY, z: 0 });
      var tu = { goc: g, cua: cua, ke: ke, keY: keY, W: W, H: H, D: D, x: x, y: y, z: z };
      tu.mo = function (t, d) { tl.fromTo(cua, { rotationY: 0 }, { rotationY: -105, duration: d || 0.5, ease: "back.out(1.4)", immediateRender: false }, t); };
      tu.dong = function (t, d) { tl.fromTo(cua, { rotationY: -105 }, { rotationY: 0, duration: d || 0.35, ease: "power2.in", immediateRender: false }, t); };
      tu.suong = function (t0, t1) {
        return api.khoi(g, -W * 0.1, keY + 40, D / 2 + 20, { cao: 150, r0: 15, no: 1.6, troi: -50, n: 14, per: 1.7, loai: "hoi", t0: t0, t1: t1, seed: 61 });
      };
      return tu;
    };

    // ------------------------------------------------------------ lớp pop-up nhỏ: nhà, trường, trạm khí tượng, khách (dạng chung, không mặt)
    api.nhaNhoSVG = function (w, h, o) {
      o = o || {}; w = w || 110; h = h || 110;
      return fp("M 10 " + h + " L 10 " + h * 0.45 + " L " + (w - 10) + " " + h * 0.45 + " L " + (w - 10) + " " + h + " Z", o.mau || C.WOOD, 4) +
        fp("M 0 " + (h * 0.5) + " L " + w / 2 + " " + h * 0.1 + " L " + w + " " + (h * 0.5) + " Z", C.SNOW, 4) +
        fp("M " + w * 0.36 + " " + h * 0.6 + " h " + w * 0.26 + " v " + w * 0.22 + " h " + -w * 0.26 + " Z", C.WIN, 3);
    };
    api.truongHocSVG = function () {
      var s = fp("M 10 150 L 10 64 L 190 64 L 190 150 Z", "#9c5b3b", 5) + fp("M 0 68 L 100 28 L 200 68 Z", C.SNOW, 5) +
        fp("M 86 150 L 86 108 L 114 108 L 114 150 Z", C.WOOD2, 4);
      [24, 56, 128, 160].forEach(function (x) { s += fp("M " + x + " 80 h 22 v 20 h -22 Z", C.WIN, 3); });
      s += sk("M 100 28 L 100 0", 4) + fp("M 100 2 L 128 8 L 100 16 Z", C.TEAL, 3);
      return s;
    };
    api.tramKhiTuongSVG = function () {
      return fp("M 30 150 L 34 70 L 40 70 L 38 150 Z M 82 150 L 84 70 L 90 70 L 94 150 Z", "#ffffff", 3) +
        fp("M 20 30 L 104 30 L 104 76 L 20 76 Z", "#ffffff", 5) + fp("M 14 30 L 62 12 L 110 30 Z", "#ffffff", 4) +
        sk("M 28 42 L 96 42 M 28 52 L 96 52 M 28 62 L 96 62", 3, INK, ' opacity=".5"') +
        sk("M 140 150 L 140 6", 5) + sk("M 122 8 L 158 8 M 140 8 L 140 -4", 3) +
        '<circle cx="122" cy="12" r="7" fill="' + C.TERRA + '" stroke="' + INK + '" stroke-width="3"/><circle cx="158" cy="12" r="7" fill="' + C.TERRA + '" stroke="' + INK + '" stroke-width="3"/>';
    };
    // Khách tham quan dạng chung (thân tròn, mũ len, khăn; không mặt), khung 200×150
    api.khachSVG = function () {
      var s = "", cols = [[C.TERRA, C.TEAL], [C.SEA, C.TERRA], [C.TEAL, "#e7b34b"]];
      [[40, 0], [100, 8], [160, -4]].forEach(function (p, i) {
        var x = p[0], dy = p[1];
        s += fp("M " + (x - 26) + " 150 C " + (x - 30) + " " + (90 + dy) + " " + (x + 30) + " " + (90 + dy) + " " + (x + 26) + " 150 Z", cols[i][0], 4);
        s += '<circle cx="' + x + '" cy="' + (78 + dy) + '" r="20" fill="#f1d9b8" stroke="' + INK + '" stroke-width="4"/>';
        s += fp("M " + (x - 21) + " " + (76 + dy) + " C " + (x - 20) + " " + (50 + dy) + " " + (x + 20) + " " + (50 + dy) + " " + (x + 21) + " " + (76 + dy) + " Z", cols[i][1], 4);
        s += sk("M " + (x - 20) + " " + (100 + dy) + " L " + (x + 20) + " " + (100 + dy), 7, cols[i][1]);
      });
      return s;
    };
  });
})();

/* ---- Mắt nhắm có nét mí, không bao giờ "mắt rỗng" (19/11/2026, phản biện tập 1 vòng 1 + 2) ----
 * Nguyên nhân: mí của rig (dio-wob.js) là mảng màu thân phủ dần từ trên xuống; khi mí ≥ ~0,85 lòng trắng biến mất mà viền mắt
 * vẫn còn, không có nét mí → hai vòng rỗng. Nháy nhanh cũng lướt qua trạng thái này 2–4 khung.
 * Sửa (bật riêng cho từng Wob bằng api.matKhongRong(w), Wob khác giữ nguyên hành vi cũ): mí không bao giờ khép quá NGUONG (0,8:
 * còn một dải lòng trắng + mép mí); đúng khung mí chạm NGUONG thì ẩn hẳn nhóm mắt, hiện nét mí (đổi bằng tl.set, không mờ dần);
 * mở mắt thì bỏ nét mí ngay khung đầu rồi mí đi từ NGUONG lên. api.lids, api.lidsSet, api.blink được bọc: Wob chưa bật thì gọi
 * hàm gốc. api.nhamMat / api.moMat / api.nhayCham tự bật.
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];
  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C, NGUONG = 0.8;
    var goc = { lids: api.lids, lidsSet: api.lidsSet, blink: api.blink };
    function nep(w) {
      if (!w.matNham) {
        var s = function (d) { return api.sk(d, 6, C.INK); };
        w.face.insertAdjacentHTML("beforeend", '<g class="mat-nham" opacity="0"><g class="mn-cuoi" opacity="0">' +
          s("M 137 156 Q 160 174 183 156") + s("M 215 156 Q 238 174 261 156") + '</g><g class="mn-thang">' +
          s("M 138 162 Q 160 166 182 162") + s("M 216 162 Q 238 166 260 162") + "</g></g>");
        w.matNham = w.face.querySelector(".mat-nham");
        w.matNhamCuoi = w.matNham.querySelector(".mn-cuoi");
        w.matNhamThang = w.matNham.querySelector(".mn-thang");
        w.matGroups = [w.svg.querySelector(".eyeL"), w.svg.querySelector(".eyeR")];
        w.lidThat = w.lid || 0;
      }
    }
    // đổi sang nét mí (on) / về mắt thường tại t (t null = đặt ngay); kieu "cuoi" | "thang"
    function doi(w, t, on, kieu) {
      var a = [[w.matGroups, { opacity: on ? 0 : 1 }], [w.matNham, { opacity: on ? 1 : 0 }]];
      if (on) { var cuoi = kieu === "cuoi"; a.push([w.matNhamCuoi, { opacity: cuoi ? 1 : 0 }], [w.matNhamThang, { opacity: cuoi ? 0 : 1 }]); }
      a.forEach(function (x) { if (t == null) gsap.set(x[0], x[1]); else tl.set(x[0], x[1], t); });
    }
    api.matKhongRong = function (w) { nep(w); w.khongRong = true; w.lidThat = w.lid || 0; };
    api.lidsSet = function (w, v, t) {
      if (!w.khongRong) return goc.lidsSet(w, v, t);
      goc.lidsSet(w, Math.min(v, NGUONG), t); doi(w, t, v > NGUONG, w.kieuMi);
      w.lidThat = v; w.lid = v;
    };
    api.lids = function (w, t, v, d) {
      if (!w.khongRong) return goc.lids(w, t, v, d);
      d = d || 0.15;
      var dong = w.lidThat > NGUONG;
      if (dong) doi(w, t, false); // đang nhắm → bỏ nét mí ngay, mí đi từ NGUONG
      tl.to([w.lidL, w.lidR], { scaleY: Math.min(v, NGUONG), duration: d, ease: "power2.inOut" }, t);
      if (v > NGUONG) doi(w, t + d, true, w.kieuMi);
      w.lidThat = v; w.lid = v;
    };
    // Nháy: khép tới NGUONG, hiện nét mí ≥ 1 khung (chậm: 0,12 s), bỏ nét mí, mở về nền
    api.blink = function (w, t, base, cham) {
      if (!w.khongRong) return goc.blink(w, t, base, cham);
      var b = base == null ? w.lidThat : base, k = cham ? 3 : 1, giu = cham ? 0.12 : 1.5 / api.fps;
      if (b > NGUONG) return;
      tl.fromTo([w.lidL, w.lidR], { scaleY: b }, { scaleY: NGUONG, duration: 0.06 * k, ease: "power1.in", immediateRender: false }, t);
      doi(w, t + 0.06 * k, true, "thang");
      doi(w, t + 0.06 * k + giu, false);
      tl.fromTo([w.lidL, w.lidR], { scaleY: NGUONG }, { scaleY: b, duration: 0.09 * k, ease: "power1.out", immediateRender: false }, t + 0.06 * k + giu);
    };
    // Nhắm mắt trong d giây từ t. o.kieu: "cuoi" (mặc định, mí cong mỉm cười) | "thang" (nghiêm)
    api.nhamMat = function (w, t, d, o) {
      o = o || {}; api.matKhongRong(w);
      w.kieuMi = o.kieu === "thang" ? "thang" : "cuoi";
      api.lids(w, t, 1, d || 0.3);
    };
    // Mở mắt về mí `nen` (0 mở hẳn, 0.5 tỉnh bơ)
    api.moMat = function (w, t, d, nen) { api.matKhongRong(w); api.lids(w, t, nen || 0, d || 0.3); w.kieuMi = null; };
    // Nháy mắt chậm (thay api.blink(w, t, nen, true))
    api.nhayCham = function (w, t, nen) { api.matKhongRong(w); api.blink(w, t, nen, true); };
  });
})();

/* ---- Mũ hè trùm lông (19/11/2026): mũ trùm lông nâu đậm viền kem, khung 220×190, quai treo ở đỉnh (110, 8) ---- */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];
  DIO.mo.push(function (api) {
    var C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;
    api.muLongSVG = function () {
      var s = sk("M 110 8 L 110 30", 3) + '<circle cx="110" cy="8" r="6" fill="none" stroke="' + INK + '" stroke-width="3"/>';
      s += fp("M 40 120 C 34 60 70 30 110 30 C 150 30 186 60 180 120 Z", "#4a2e1f", 6);
      s += fp("M 44 112 L 30 176 C 46 184 62 180 70 170 L 74 116 Z", "#4a2e1f", 5) + fp("M 176 112 L 190 176 C 174 184 158 180 150 170 L 146 116 Z", "#4a2e1f", 5);
      s += sk("M 70 60 l 6 10 M 96 46 l 4 12 M 126 46 l -2 12 M 150 60 l -6 10 M 84 84 l 4 10 M 136 84 l -4 10", 3, "#7a5238");
      s += fp(api.lumpy(30, 190, 118, -14, 9, 21) + " L 190 134 " + api.lumpy(190, 30, 134, 12, 9, 22).replace(/^M [\d.\-]+ [\d.\-]+/, "") + " Z", "#efe3c8", 4);
      s += fp(api.lumpy(28, 72, 172, 10, 3, 23) + " L 72 186 L 28 186 Z", "#efe3c8", 3) + fp(api.lumpy(148, 192, 172, 10, 3, 24) + " L 192 186 L 148 186 Z", "#efe3c8", 3);
      return s;
    };
  });
})();
