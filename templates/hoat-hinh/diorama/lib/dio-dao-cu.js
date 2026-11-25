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
      co = co || 80; var w = Math.max(co * 3.5, co * 0.72 * String(chu).length + co * 0.9), h = co * 1.5, r = api.rng(77), MUC = "#a8322a"; // mực đỏ sẫm: tương phản ≥ 3:1 trên giấy dưới đèn
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

/* ---- Đạo cụ sa mạc / Coober Pedy (23/11/2026, tập 2; chỉ thêm). Mọi hàm trả chuỗi svg, tham số qua o; chữ chỉ qua api.txt ----
 * loOpalSVG({san})            lọ thuỷ tinh nắp bần, tâm (0,0), khung ~110×150; .lo-san = hạt sạn trong đáy lọ
 * hatSanSVG(loe)              hạt sạn tâm (0,0) r≈10; loe = vài vệt opal + .san-loe (ngôi sao lấp lánh, mặc định ẩn)
 * bongGolfSVG()               bóng golf tâm (0,0) r 24, .golf-sang = quầng xanh lơ
 * nguoiGiaySVG(x, y, s, mau)  người giấy dạng chung (đầu tròn KHÔNG mặt), chân tại (x, y), cao ≈ 46·s
 * buuThiepMatCatSVG(o)        bưu thiếp mặt cắt ngọn đồi 380×260 (gốc trên trái): phòng đào trong đồi có đèn ấm,
 *                             người giấy o.trong [[x,y]] trong phòng, o.tren [[x,y]] trên mặt đồi; .bt-cho = ô trống để nhét hình
 * khungCuaSoSVG()             khung cửa sổ giấy cầm tay, tâm (0,0), 150×130, ô kính trong suốt (nhìn xuyên qua)
 * cuonCoSVG()                 cuộn cỏ nhân tạo tâm (0,0) ~130×50;  baiCoSVG(w) bãi cỏ giấy bé w×46 (gốc trên trái, đáy y 46)
 * muRongVanhSVG()             mũ rộng vành giấy kraft tâm (0,0) ~210×90
 * coNhoSVG()                  cờ nhỏ không chữ, gốc cán tại (0,0), cán hướng −y dài 90
 * baLoMoSVG()                 ba lô xanh ô liu mở toang 240×280 (gốc trên trái, đáy y 280): .bl-than (phồng: scale quanh đáy),
 *                             .bl-nap (nắp, xoay quanh (120, 92)), miệng ở y ≈ 100
 * bienGoSVG(dong, o)          biển gỗ sa mạc không tuyết, w×h (mặc định 420×380), dong [{chu, co, dam, mau}]
 * doiMesaSVG(w, h, o)         đồi đỉnh bằng kiểu Breakaways, dải đá trắng/vàng đất/đỏ; o.seed, o.mau [đỉnh, giữa, chân], o.dinh (tỉ lệ đỉnh bằng), o.net
 * saMacSVG(w, h)              lớp đồi cát + mặt trời thấp (pop-up sa mạc), gốc trên trái
 * nhietKeBanSVG(dong)         nhiệt kế nhỏ để bàn 150×300 (gốc trên trái, đáy y 300), .merc (svgOrigin "75 236"), dong = [chu] dưới chân
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];
  DIO.mo.push(function (api) {
    var C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;
    var OPAL = ["#7fd6e0", "#b58ce0", "#8fe3a8", "#f2a6c9", "#ffe28a"];
    api.loOpalSVG = function (o) {
      o = o || {};
      var s = fp("M -46 -50 C -50 -38 -52 -30 -52 -20 L -52 60 C -52 74 -40 78 -28 78 L 28 78 C 40 78 52 74 52 60 L 52 -20 C 52 -30 50 -38 46 -50 Z", "rgba(214,236,240,.55)", 6);
      s += '<g class="lo-san"' + (o.san === false ? ' opacity="0"' : "") + ">" + fp("M 4 74 C 2 64 12 60 18 64 C 24 66 24 74 20 76 Z", "#9a8a78", 3) + "</g>";
      s += sk("M -36 -24 C -40 4 -40 34 -36 60", 6, "#ffffff", ' opacity=".7"') + sk("M 38 -10 L 38 20", 4, "#ffffff", ' opacity=".45"');
      s += fp("M -40 -74 L 40 -74 L 44 -50 L -44 -50 Z", "#c99a62", 5) + sk("M -30 -66 l 8 0 M 4 -62 l 10 0 M -10 -58 l 6 0", 3, "#8a5a3b");
      return s;
    };
    api.hatSanSVG = function (loe) {
      var s = fp("M -10 4 C -12 -6 -2 -11 6 -8 C 13 -5 12 6 6 9 C 0 12 -9 10 -10 4 Z", "#9a8a78", 3);
      if (loe) {
        s += '<path d="M -4 -3 l 5 -2 l 2 4 z" fill="' + OPAL[0] + '"/><path d="M 2 3 l 5 0 l -2 4 z" fill="' + OPAL[1] + '"/><path d="M -6 3 l 3 1 l -2 3 z" fill="' + OPAL[2] + '"/>';
        s += '<g class="san-loe" opacity="0">' + fp("M 14 -26 L 17 -16 L 27 -13 L 17 -10 L 14 0 L 11 -10 L 1 -13 L 11 -16 Z", "#fff6c8", 3) + "</g>";
      }
      return s;
    };
    api.bongGolfSVG = function () {
      var id = api.nid("golf");
      var s = '<defs><radialGradient id="' + id + '"><stop offset="0" stop-color="#bff6ff" stop-opacity=".95"/><stop offset=".45" stop-color="#6fe3f5" stop-opacity=".5"/><stop offset="1" stop-color="#6fe3f5" stop-opacity="0"/></radialGradient></defs>';
      s += '<circle class="golf-sang" cx="0" cy="0" r="70" fill="url(#' + id + ')"/>';
      s += '<circle cx="0" cy="0" r="24" fill="#eafcff" stroke="' + INK + '" stroke-width="5"/>';
      [[-9, -8], [3, -11], [11, -2], [-12, 4], [0, 1], [8, 9], [-4, 12], [-1, -4]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="#9fd9e3"/>'; });
      return s + sk("M -14 -12 Q -8 -18 0 -18", 3, "#fff", ' opacity=".9"');
    };
    api.nguoiGiaySVG = function (x, y, s, mau) {
      s = s || 1; mau = mau || C.TERRA;
      var f = function (v) { return (v * s).toFixed(1); };
      return '<g transform="translate(' + x + " " + y + ')">' + fp("M " + f(-9) + " 0 L " + f(-7) + " " + f(-26) + " L " + f(7) + " " + f(-26) + " L " + f(9) + " 0 Z", mau, 3) +
        '<circle cx="0" cy="' + f(-34) + '" r="' + f(8) + '" fill="#e9c79a" stroke="' + INK + '" stroke-width="3"/></g>';
    };
    api.buuThiepMatCatSVG = function (o) {
      o = o || {};
      var W = 380, H = 260, s = fp("M 4 4 L " + (W - 4) + " 4 L " + (W - 4) + " " + (H - 4) + " L 4 " + (H - 4) + " Z", C.PAPER, 6);
      s += '<rect x="18" y="18" width="' + (W - 36) + '" height="90" fill="#cfe7ef"/>';
      s += '<circle cx="320" cy="44" r="16" fill="#ffd36a" stroke="' + INK + '" stroke-width="3"/>';
      s += fp("M 18 " + (H - 18) + " L 18 120 C 70 80 120 66 190 64 C 260 66 310 84 " + (W - 18) + " 118 L " + (W - 18) + " " + (H - 18) + " Z", "#d98f4e", 5);
      s += sk("M 18 160 C 120 150 260 156 " + (W - 18) + " 166", 3, "#b5652e", ' opacity=".6"');
      [[60, 150, 90, 66], [170, 172, 110, 64], [290, 146, 66, 60]].forEach(function (r) {
        s += fp("M " + r[0] + " " + (r[1] + r[3]) + " L " + r[0] + " " + (r[1] + 14) + " C " + r[0] + " " + r[1] + " " + (r[0] + r[2]) + " " + r[1] + " " + (r[0] + r[2]) + " " + (r[1] + 14) + " L " + (r[0] + r[2]) + " " + (r[1] + r[3]) + " Z", "#ffe0a3", 4);
      });
      s += sk("M 310 120 l 0 -26 l 14 0 l 0 24", 4); // ống thông gió nhô khỏi đồi
      (o.trong || [[85, 214], [122, 214], [196, 234], [312, 204]]).forEach(function (p, i) { s += api.nguoiGiaySVG(p[0], p[1], 1, [C.TEAL, C.TERRA, "#7d6a4b", C.SEA][i % 4]); });
      (o.tren || [[64, 104], [150, 74], [246, 72], [336, 116]]).forEach(function (p, i) { s += api.nguoiGiaySVG(p[0], p[1], 1, [C.SEA, "#7d6a4b", C.TEAL, C.TERRA][i % 4]); });
      s += '<rect class="bt-cho" x="236" y="190" width="34" height="44" rx="4" fill="none" stroke="' + INK + '" stroke-width="2.5" stroke-dasharray="5 5" opacity=".6"/>';
      return s;
    };
    api.khungCuaSoSVG = function () {
      return '<path d="M -75 -65 L 75 -65 L 75 65 L -75 65 Z M -62 -52 L -62 52 L 62 52 L 62 -52 Z" fill="#f2efe6" fill-rule="evenodd" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
        fp("M -4 -52 L 4 -52 L 4 52 L -4 52 Z M -62 -4 L 62 -4 L 62 4 L -62 4 Z", "#f2efe6", 3) +
        sk("M -50 -40 L -30 -20 M -44 -46 L -36 -38", 4, "#9fd0e0", ' opacity=".8"') + fp("M -82 65 L 82 65 L 78 76 L -78 76 Z", "#c99a62", 4);
    };
    api.cuonCoSVG = function () {
      var s = fp("M -50 -24 L 46 -24 L 46 24 L -50 24 Z", "#5ea34f", 5);
      s += '<ellipse cx="46" cy="0" rx="14" ry="24" fill="#4a8a3e" stroke="' + INK + '" stroke-width="5"/>' + sk("M 46 -14 C 54 -10 54 8 46 12 C 40 8 42 -6 48 -6", 3, "#2f5e27");
      for (var x = -44; x < 40; x += 9) s += sk("M " + x + " -24 l 3 -8", 3, "#2f5e27");
      return s;
    };
    api.baiCoSVG = function (w) {
      w = w || 220;
      var s = fp("M 4 46 L 4 30 L " + (w - 4) + " 30 L " + (w - 4) + " 46 Z", "#5ea34f", 4), r = api.rng(41);
      for (var x = 10; x < w - 8; x += 7) { var hh = 8 + r() * 14; s += sk("M " + x + " 32 l " + (r() * 6 - 3).toFixed(1) + " " + (-hh).toFixed(1), 3, x % 3 ? "#3d7a33" : "#79c062"); }
      return s;
    };
    api.muRongVanhSVG = function () {
      return fp("M -105 18 C -100 2 -60 -4 0 -4 C 60 -4 100 2 105 18 C 90 32 -90 32 -105 18 Z", "#c99a62", 5) +
        fp("M -48 6 C -50 -40 -30 -54 0 -54 C 30 -54 50 -40 48 6 C 30 12 -30 12 -48 6 Z", "#d7ab72", 5) +
        fp("M -48 -6 C -30 0 30 0 48 -6 L 48 6 C 30 12 -30 12 -48 6 Z", "#6b4a33", 4) + sk("M -70 16 C -40 22 40 22 70 16", 3, "#8a5a3b", ' opacity=".6"');
    };
    api.coNhoSVG = function () {
      return sk("M 0 0 L 0 -90", 5, "#8a5a3b") + fp("M 2 -88 L 56 -74 L 2 -58 Z", C.TERRA, 4) + '<circle cx="0" cy="-92" r="5" fill="#e7b34b" stroke="' + INK + '" stroke-width="3"/>';
    };
    api.baLoMoSVG = function () {
      var OL = "#6f7a3c", OL2 = "#535c2b";
      var s = '<g class="bl-than">' + fp("M 30 120 C 26 100 40 92 60 92 L 180 92 C 200 92 214 100 210 120 L 220 254 C 222 270 210 280 194 280 L 46 280 C 30 280 18 270 20 254 Z", OL, 6) +
        '<ellipse cx="120" cy="100" rx="88" ry="18" fill="#2c2f18" stroke="' + INK + '" stroke-width="5"/>' +
        fp("M 70 180 L 170 180 L 166 250 L 74 250 Z", OL2, 5) + sk("M 80 200 L 160 200", 3, INK, ' opacity=".5"') + "</g>";
      s += '<g class="bl-nap">' + fp("M 36 96 C 40 40 200 40 204 96 C 160 84 80 84 36 96 Z", OL2, 6) + fp("M 108 60 L 132 60 L 132 80 L 108 80 Z", "#c99a62", 3) + "</g>";
      return s;
    };
    api.bienGoSVG = function (dong, o) {
      o = o || {};
      var w = o.w || 420, h = o.h || 380, bh = Math.round(h * 0.56), s = "";
      s += fp("M " + w * 0.16 + " " + h + " L " + w * 0.17 + " " + (bh - 10) + " L " + w * 0.22 + " " + (bh - 10) + " L " + w * 0.21 + " " + h + " Z", "#8a5a3b", 5);
      s += fp("M " + w * 0.84 + " " + h + " L " + w * 0.83 + " " + (bh - 10) + " L " + w * 0.78 + " " + (bh - 10) + " L " + w * 0.79 + " " + h + " Z", "#8a5a3b", 5);
      s += fp("M 10 14 L " + (w - 10) + " 8 L " + (w - 6) + " " + bh + " L 6 " + (bh + 4) + " Z", C.PAPER, 7);
      var n = dong.length;
      dong.forEach(function (d, i) {
        var co = d.co || (i === 0 ? 62 : 50);
        var yb = 14 + ((bh - 14) * (i + 0.5)) / n + co * 0.34;
        s += api.txt(w / 2, yb.toFixed(0), co, d.dam || (i === 0 ? 800 : 700), d.chu, d.mau || (i === 0 ? INK : C.TEAL));
      });
      s += fp("M 0 " + h + " C " + w * 0.2 + " " + (h - 26) + " " + w * 0.8 + " " + (h - 26) + " " + w + " " + h + " Z", "#e0a060", 4);
      return s;
    };
    api.doiMesaSVG = function (w, h, o) {
      o = o || {}; var r = api.rng(o.seed || 5), m = o.mau || ["#f3ead8", "#e3b36a", "#c4643a"], dinh = o.dinh == null ? 0.4 : o.dinh;
      var x1 = w * (0.5 - dinh / 2 - 0.04 * r()), x2 = w * (0.5 + dinh / 2 + 0.04 * r()), top = h * (0.08 + 0.08 * r());
      var f = function (v) { return v.toFixed(1); };
      var out = "M 0 " + h + " L 0 " + f(h * 0.86) + " C " + f(w * 0.1) + " " + f(h * 0.8) + " " + f(x1 - w * 0.12) + " " + f(h * 0.5) + " " + f(x1 - w * 0.05) + " " + f(top + h * 0.12) +
        " L " + f(x1) + " " + f(top) + " L " + f(x2) + " " + f(top + 3) + " L " + f(x2 + w * 0.04) + " " + f(top + h * 0.14) +
        " C " + f(x2 + w * 0.12) + " " + f(h * 0.5) + " " + f(w * 0.9) + " " + f(h * 0.8) + " " + w + " " + f(h * 0.84) + " L " + w + " " + h + " Z";
      var id = api.nid("mesa");
      var s = '<defs><clipPath id="' + id + '"><path d="' + out + '"/></clipPath></defs>';
      s += '<g clip-path="url(#' + id + ')"><rect x="0" y="0" width="' + w + '" height="' + h + '" fill="' + m[2] + '"/>';
      s += '<rect x="0" y="0" width="' + w + '" height="' + f(top + h * 0.22) + '" fill="' + m[0] + '"/>';
      s += '<path d="M 0 ' + f(top + h * 0.22) + " C " + f(w * 0.3) + " " + f(top + h * 0.26) + " " + f(w * 0.6) + " " + f(top + h * 0.2) + " " + w + " " + f(top + h * 0.24) + " L " + w + " " + f(top + h * 0.48) + " C " + f(w * 0.6) + " " + f(top + h * 0.44) + " " + f(w * 0.3) + " " + f(top + h * 0.5) + " 0 " + f(top + h * 0.46) + ' Z" fill="' + m[1] + '"/>';
      for (var i = 0; i < 6; i++) { var gx = w * (0.15 + 0.7 * r()); s += sk("M " + f(gx) + " " + f(top + h * 0.1) + " l " + f(r() * 10 - 5) + " " + f(h * (0.3 + 0.4 * r())), 2.5, INK, ' opacity=".18"'); }
      s += "</g>" + '<path d="' + out + '" fill="none" stroke="' + INK + '" stroke-width="' + (o.net || 5) + '" stroke-linejoin="round"/>';
      return s;
    };
    api.saMacSVG = function (w, h) {
      var s = '<circle cx="' + w * 0.72 + '" cy="' + h * 0.3 + '" r="' + h * 0.14 + '" fill="#ffd36a" stroke="' + INK + '" stroke-width="5"/>';
      s += fp("M 0 " + h + " L 0 " + h * 0.55 + " C " + w * 0.2 + " " + h * 0.4 + " " + w * 0.35 + " " + h * 0.62 + " " + w * 0.55 + " " + h * 0.5 + " C " + w * 0.7 + " " + h * 0.42 + " " + w * 0.85 + " " + h * 0.56 + " " + w + " " + h * 0.5 + " L " + w + " " + h + " Z", "#e3a35a", 5);
      s += fp("M 0 " + h + " L 0 " + h * 0.78 + " C " + w * 0.3 + " " + h * 0.68 + " " + w * 0.6 + " " + h * 0.84 + " " + w + " " + h * 0.74 + " L " + w + " " + h + " Z", "#d07a3e", 5);
      return s;
    };
    api.nhietKeBanSVG = function (dong) {
      var s = fp("M 30 300 L 36 262 L 114 262 L 120 300 Z", "#8a5a3b", 5) + fp("M 40 30 C 40 10 110 10 110 30 L 110 262 L 40 262 Z", C.PAPER, 6) +
        fp("M 66 40 C 66 30 84 30 84 40 L 84 222 L 66 222 Z", "#ffffff", 4);
      for (var i = 0; i < 9; i++) s += sk("M 90 " + (54 + i * 18) + " L " + (i % 2 ? 98 : 104) + " " + (54 + i * 18), 3);
      s += '<rect class="merc" x="70" y="48" width="10" height="188" rx="4" fill="' + C.MAT + '"/><circle cx="75" cy="236" r="18" fill="' + C.MAT + '" stroke="' + INK + '" stroke-width="5"/>';
      (dong || []).forEach(function (d) { s += api.txt(75, 330, 40, 800, d, INK); });
      return s;
    };
  });
})();

/* ---- Đạo cụ Whittier (24/11/2026, tập 3; chỉ thêm). Chuỗi svg, tham số qua o; chữ chỉ qua api.txt ----
 * doThem(w, {doNgu, depLe, muLuoi, aoPhao}, t?)  đồ mặc thêm cho con rối (không đổi tạo hình gốc): đồ ngủ kẻ sọc (áo + quần),
 *                             dép lê thay giày đỏ (w.depL/w.depR trong nhóm chân; w.giayL/R là giày gốc), mũ lưỡi trai xanh băng,
 *                             áo phao cam. Lần gọi đầu dựng sẵn (ẩn) rồi bật/tắt bằng opacity; t = null đặt ngay
 * depLeSVG(mau)               một chiếc dép lê tâm đế (0,0), ~64×24 (dép tuột nằm lại trên sàn)
 * toaNha14SVG(w, h, o)        toà kem 14 tầng ba khối nối liền (gốc trên trái, đáy y h); .tang-<i> hàng cửa sổ tầng i (1 = dưới);
 *                             cửa xoay ở chân (.cua-xoay-0/1, scaleX theo t), o.cua false = không cửa, o.sang tỉ lệ cửa sổ sáng
 * nuiGiaySVG(w, h, o)         núi giấy (gốc trên trái), o.mau, o.tuyet (chóp tuyết), o.dinh (x đỉnh), o.seed; .nap-tuyet = nắp tuyết rời ở đỉnh
 * baLoOliu(w)                ba lô con rối thành xanh ô liu; XE_DO màu xe mui trần đỏ gạch chung của tập 3
 * xeHopSVG(o)                 (o.mui "vai" = mui vải sẫm đã dựng) xe hộp nhỏ nhìn ngang, mũi sang phải, 520×250 (bánh chạm y 250). Trả {sau, truoc}: lòng xe và thân + khung kính
 *                             rỗng để kẹp con rối Wob ở giữa; o.mui "dong"|"mo", o.mau; .banh-1/.banh-2, .kinh-mo (hơi mờ kính, ẩn)
 * denTinHieuSVG()             đèn tín hiệu 90×230, .den-do / .den-xanh (opacity)
 * bongCanDamSVG()             quả bóng nhỏ mặt cười (lòng can đảm), tâm (0,0) r 30, không chữ
 * phongBiSVG(o)               phong bì 220×140, o.dong [{chu, co}] (chữ trong chu_tren_do_vat)
 * cuonGiaySVG(w, h)           dải giấy dài (cuộn ở đáy) cho gag phong bì dài
 * toLichSVG(w, h, o)          tờ lịch giờ hầm nhàu (mặt trước: lưới ô giờ, không chữ), o.matSau = mặt sau trắng nhàu
 * gioDoSVG()                  giỏ đồ giặt 160×130 (đáy y 130); tuiBanhSVG() túi bánh 90×110; lyDoNguSVG() ly tâm (0,0)
 * dongHoTuongSVG(r)           đồng hồ treo tường không chữ số, tâm (0,0); .kim-gio / .kim-phut
 * tauDuLichSVG(w, h)          tàu du lịch giấy nhìn ngang, không chữ, không cờ; thuyenNhoSVG(w, h) thuyền nhỏ có cabin
 * kayakSVG(w, mau)            kayak nhìn ngang (tâm (0,0) ở mớn nước); maiCheoSVG(dai) mái chèo tâm (0,0)
 * haiAuSVG(s)                 hải âu giấy đậu, chân tại (0,0)
 * napChaiSVG(o)               nắp chai răng cưa tâm (0,0) r≈22; o.kimCuong: viên đá gắn giữa + .nap-loe ngôi sao (ẩn)
 * canCauSVG(dai)              cần câu, tay cầm tại (0,0), ngọn tại (dai*0.5, -dai*0.86); .day-cau dây thả từ ngọn
 * caBonSVG(s), caHoiSVG(s)    cá bơn dẹt / cá hồi giấy, tâm (0,0)
 * songBangSVG(w, h)           sông băng trắng xanh giữa hai sườn núi xanh, đổ xuống mép dưới (gốc trên trái)
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];
  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;
    var PJ = "#dce9f5", PJ2 = "#3f6f9f", VEST = "#E0703A";

    api.depLeSVG = function (mau) {
      return '<ellipse cx="0" cy="0" rx="32" ry="9" fill="' + (mau || C.TEAL) + '" stroke="' + INK + '" stroke-width="5"/>' +
        fp("M -18 -2 C -14 -20 12 -20 16 -2 Z", "#e9e4d8", 4);
    };

    api.doThem = function (w, o, t) {
      if (!w.doThemDung) {
        w.doThemDung = true;
        var id = w.id;
        var pat = '<pattern id="pj' + id + '" width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="' + PJ + '"/><rect x="0" y="0" width="8" height="26" fill="' + PJ2 + '" opacity=".75"/></pattern>';
        w.svg.querySelector("defs").insertAdjacentHTML("beforeend", pat);
        w.body.insertAdjacentHTML("afterend",
          '<g class="doNgu" opacity="0"><g clip-path="url(#wc' + id + ')"><path d="M 40 252 C 120 282 280 282 360 252 L 360 340 L 40 340 Z" fill="url(#pj' + id + ')"/></g>' +
          sk("M 62 256 C 130 284 270 284 338 256", 6) + sk("M 176 270 L 200 300 L 224 270", 5) +
          '<circle cx="200" cy="314" r="5" fill="#fff" stroke="' + INK + '" stroke-width="3"/></g>' +
          '<g class="aoPhao" opacity="0">' +
          fp("M 74 168 C 58 220 64 282 104 318 L 150 312 L 142 196 C 124 172 96 162 74 168 Z", VEST, 6) +
          fp("M 326 168 C 342 220 336 282 296 318 L 250 312 L 258 196 C 276 172 304 162 326 168 Z", VEST, 6) +
          sk("M 96 200 C 100 240 104 270 118 300 M 304 200 C 300 240 296 270 282 300", 4, "#fff", ' opacity=".7"') +
          sk("M 104 292 L 296 292", 9, INK) + '<rect x="186" y="282" width="28" height="20" rx="4" fill="#e7b34b" stroke="' + INK + '" stroke-width="4"/></g>');
        w.doNgu = w.svg.querySelector(".doNgu"); w.aoPhao = w.svg.querySelector(".aoPhao");
        [["legL", "M 174 290 C 172 320 170 344 169 362", 158, "L"], ["legR", "M 226 290 C 228 320 230 344 231 362", 242, "R"]].forEach(function (a) {
          var leg = w[a[0]], giay = leg.querySelector("ellipse");
          w["giay" + a[3]] = giay;
          leg.firstElementChild.insertAdjacentHTML("afterend", '<g class="quanNgu" opacity="0">' + sk(a[1], 40) + sk(a[1], 30, "url(#pj" + id + ")") + "</g>");
          leg.insertAdjacentHTML("beforeend", '<g class="dep' + a[3] + '" opacity="0"><g transform="translate(' + a[2] + ' 388)">' + api.depLeSVG() + "</g></g>");
          w["dep" + a[3]] = leg.querySelector(".dep" + a[3]);
        });
        w.quanNgu = w.svg.querySelectorAll(".quanNgu");
        w.beanie.insertAdjacentHTML("afterend", '<g class="muLuoi" opacity="0">' + fp("M 118 104 C 120 36 280 36 282 104 Z", C.ICE, 6) +
          sk("M 200 42 L 200 100 M 156 52 L 166 100 M 244 52 L 234 100", 3, C.ICE2) + '<circle cx="200" cy="40" r="9" fill="' + C.ICE2 + '" stroke="' + INK + '" stroke-width="4"/>' +
          fp("M 104 100 C 150 88 250 88 296 100 C 306 116 266 128 200 128 C 134 128 94 116 104 100 Z", C.ICE2, 6) + "</g>");
        w.muLuoi = w.svg.querySelector(".muLuoi");
      }
      var set = function (el, v) { if (!el) return; if (t == null) gsap.set(el, v); else tl.set(el, v, t); };
      if (o.doNgu != null) { set(w.doNgu, { opacity: o.doNgu ? 1 : 0 }); set(w.quanNgu, { opacity: o.doNgu ? 1 : 0 }); }
      if (o.depLe != null) { set([w.depL, w.depR], { opacity: o.depLe ? 1 : 0 }); set([w.giayL, w.giayR], { opacity: o.depLe ? 0 : 1 }); }
      if (o.muLuoi != null) set(w.muLuoi, { opacity: o.muLuoi ? 1 : 0 });
      if (o.aoPhao != null) set(w.aoPhao, { opacity: o.aoPhao ? 1 : 0 });
    };

    api.toaNha14SVG = function (w, h, o) {
      o = o || {};
      var s = "", bw = w / 3, top = h * 0.06, fh = (h - top - h * 0.1) / 14, r = api.rng(o.seed || 14), sang = o.sang == null ? 0.35 : o.sang;
      for (var k = 0; k < 3; k++) {
        var x0 = k * bw + (k === 1 ? 0 : 4), x1 = x0 + bw - (k === 1 ? 0 : 8), yt = top + (k === 1 ? 0 : fh * 0.3);
        s += fp("M " + x0 + " " + h + " L " + x0 + " " + yt + " L " + x1 + " " + yt + " L " + x1 + " " + h + " Z", k === 1 ? "#efe6cf" : "#e6dcc2", 5);
        s += sk("M " + (x0 + 4) + " " + (yt + 6) + " L " + (x1 - 4) + " " + (yt + 6), 4, "#b9ac8c");
      }
      s += sk("M " + bw + " " + (top + fh * 0.3) + " L " + bw + " " + h + " M " + 2 * bw + " " + (top + fh * 0.3) + " L " + 2 * bw + " " + h, 3, INK, ' opacity=".5"');
      var nWin = 5, ww = bw / (nWin * 1.7);
      for (var i = 1; i <= 14; i++) {
        var y = h - h * 0.1 - i * fh + fh * 0.22, row = '<g class="tang-' + i + '">';
        for (var b = 0; b < 3; b++) for (var j = 0; j < nWin; j++) {
          var x = b * bw + bw * 0.12 + j * (bw * 0.76 / (nWin - 1)) - ww / 2;
          row += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + ww.toFixed(1) + '" height="' + (fh * 0.56).toFixed(1) + '" fill="' + (r() < sang ? C.WIN : "#6f8f99") + '" stroke="' + INK + '" stroke-width="2"/>';
        }
        s += row + "</g>";
      }
      var cy = h - h * 0.1, cx = w / 2;
      s += fp("M " + (cx - bw * 0.45) + " " + h + " L " + (cx - bw * 0.45) + " " + (cy + 2) + " L " + (cx + bw * 0.45) + " " + (cy + 2) + " L " + (cx + bw * 0.45) + " " + h + " Z", "#d8ccae", 4);
      if (o.cua !== false) {
        var dw = bw * 0.36, dh = h * 0.085;
        s += fp("M " + (cx - dw / 2) + " " + h + " L " + (cx - dw / 2) + " " + (h - dh) + " L " + (cx + dw / 2) + " " + (h - dh) + " L " + (cx + dw / 2) + " " + h + " Z", "#3d5358", 3);
        for (var q = 0; q < 2; q++) s += '<rect class="cua-xoay-' + q + '" x="' + (cx - dw / 2 + 2 + q * dw / 2) + '" y="' + (h - dh + 2) + '" width="' + (dw / 2 - 2) + '" height="' + (dh - 3) + '" fill="#bfe3f0" stroke="' + INK + '" stroke-width="2" opacity=".9"/>';
        s += sk("M " + cx + " " + (h - dh) + " L " + cx + " " + h, 3);
      }
      return s;
    };

    api.nuiGiaySVG = function (w, h, o) {
      o = o || {};
      var r = api.rng(o.seed || 5), dx = o.dinh || w * 0.5, mau = o.mau || "#7f9ba3", d = "M 0 " + h + " L " + (w * 0.12) + " " + (h * 0.55 + r() * 20);
      d += " L " + (dx - w * 0.18) + " " + (h * 0.3) + " L " + dx + " 8 L " + (dx + w * 0.2) + " " + (h * 0.34) + " L " + (w * 0.88) + " " + (h * 0.5 + r() * 20) + " L " + w + " " + h + " Z";
      var s = fp(d, mau, 5);
      s += sk("M " + (dx - 4) + " 30 L " + (dx - w * 0.08) + " " + h * 0.6 + " M " + (dx + 10) + " 40 L " + (dx + w * 0.1) + " " + h * 0.7, 3, INK, ' opacity=".35"');
      if (o.tuyet !== false) {
        s += fp("M " + (dx - w * 0.13) + " " + (h * 0.24) + " L " + (dx - w * 0.05) + " " + (h * 0.3) + " L " + (dx + 2) + " " + (h * 0.22) + " L " + (dx + w * 0.08) + " " + (h * 0.3) + " L " + (dx + w * 0.15) + " " + (h * 0.26) + " L " + (dx + w * 0.07) + " " + (h * 0.12) + " L " + dx + " 30 Z", C.SNOW, 4);
        s += '<g class="nap-tuyet">' + fp("M " + (dx - 26) + " 34 C " + (dx - 20) + " 0 " + (dx + 20) + " 0 " + (dx + 26) + " 34 C " + (dx + 10) + " 28 " + (dx - 10) + " 28 " + (dx - 26) + " 34 Z", C.SNOW, 4) + "</g>";
      }
      return s;
    };

    api.xeHopSVG = function (o) {
      o = o || {};
      var mau = o.mau || C.TERRA, mo = o.mui === "mo";
      var sau = fp("M 150 150 L 170 70 L 330 70 L 380 150 Z", "#3a3230", 0) + fp("M 190 160 L 196 96 L 236 96 L 240 160 Z", "#6b4a33", 4) + sk("M 360 120 C 344 112 336 126 346 138", 7, "#2f3b3c");
      var tr = "";
      if (o.mui === "vai") tr += fp("M 140 150 C 150 100 170 62 200 60 L 320 60 C 350 62 380 110 392 150 L 362 150 L 322 82 L 266 82 L 266 150 L 254 150 L 254 82 L 180 82 L 160 150 Z", "#3a3230", 5) + sk("M 214 64 L 210 82 M 300 62 L 304 82", 3, "#5a504c");
      else if (!mo) tr += fp("M 140 150 L 166 66 L 336 66 L 392 150 L 362 150 L 322 82 L 266 82 L 266 150 L 254 150 L 254 82 L 180 82 L 160 150 Z", mau, 5);
      else tr += sk("M 330 150 L 352 100", 7, INK) + fp("M 92 150 C 96 128 126 122 150 126 L 158 150 Z", "#2f3b3c", 4);
      tr += '<g class="kinh-mo" opacity="0">' + fp("M 166 148 L 182 86 L 252 86 L 252 148 Z M 268 148 L 268 86 L 320 86 L 356 148 Z", "rgba(235,242,245,.85)", 3) + "</g>";
      tr += fp("M 30 160 C 30 140 60 140 120 140 L 410 140 C 470 140 500 156 504 186 L 506 216 C 506 228 498 232 486 232 L 40 232 C 28 232 22 226 22 214 Z", mau, 6);
      tr += sk("M 40 186 L 490 186", 4, INK, ' opacity=".35"') + fp("M 470 160 l 30 6 l 0 16 l -30 -2 Z", "#ffe6a3", 3) + fp("M 26 170 l 14 0 l 0 18 l -14 0 Z", C.MAT, 3);
      [[118, "banh-1"], [404, "banh-2"]].forEach(function (b) {
        tr += '<g class="' + b[1] + '"><circle cx="' + b[0] + '" cy="216" r="34" fill="#2f3b3c" stroke="' + INK + '" stroke-width="6"/><circle cx="' + b[0] + '" cy="216" r="13" fill="#9aa39a" stroke="' + INK + '" stroke-width="4"/>' +
          sk("M " + (b[0] - 24) + " 216 L " + (b[0] + 24) + " 216", 3, "#9aa39a") + "</g>";
      });
      return { sau: sau, truoc: tr, w: 520, h: 250 };
    };

    // Ba lô xanh ô liu (màu chung các phong cách từ tập 2–3, khớp ve-tay VT.PACK_MAU.oliu)
    api.XE_DO = "#b5432f";
    api.baLoOliu = function (w) {
      var r = w.pack.querySelectorAll("rect");
      if (r[0]) r[0].setAttribute("fill", "#7C8646"); if (r[1]) r[1].setAttribute("fill", "#566030");
      var st = w.strap.querySelector("path"); if (st) st.setAttribute("stroke", "#566030");
    };
    api.denTinHieuSVG = function () {
      return sk("M 45 230 L 45 150", 12) + fp("M 10 8 L 80 8 L 80 150 L 10 150 Z", "#2f3b3c", 6) +
        '<circle cx="45" cy="48" r="24" fill="#5a2a26" stroke="' + INK + '" stroke-width="4"/><circle class="den-do" cx="45" cy="48" r="22" fill="#ff5a3c"/>' +
        '<circle cx="45" cy="110" r="24" fill="#1f3a2c" stroke="' + INK + '" stroke-width="4"/><circle class="den-xanh" cx="45" cy="110" r="22" fill="#5ef08a" opacity="0"/>';
    };

    api.bongCanDamSVG = function () {
      return sk("M -8 26 L -10 44 M 8 26 L 10 44", 6) + '<circle cx="0" cy="0" r="30" fill="#ffd45a" stroke="' + INK + '" stroke-width="5"/><circle cx="-10" cy="-7" r="4.5" fill="' + INK + '"/><circle cx="10" cy="-7" r="4.5" fill="' + INK + '"/>' +
        sk("M -13 8 C -6 16 6 16 13 8", 4);
    };

    api.phongBiSVG = function (o) {
      o = o || {};
      var s = fp("M 4 4 L 216 4 L 216 136 L 4 136 Z", "#f4ecd8", 6) + sk("M 4 4 L 110 70 L 216 4", 4, INK, ' opacity=".45"') +
        fp("M 170 14 l 34 0 l 0 40 l -34 0 Z", C.TERRA, 3) + sk("M 176 24 l 22 0 M 176 34 l 22 0", 2.5, C.PAPER);
      (o.dong || []).forEach(function (d, i) { s += api.txt(d.x || 100, d.y || 96 + i * (d.co + 6), d.co, 800, d.chu, d.mau || INK); });
      return s;
    };
    api.cuonGiaySVG = function (w, h) {
      var s = fp("M 6 0 L " + (w - 6) + " 0 L " + (w - 6) + " " + (h - 20) + " L 6 " + (h - 20) + " Z", "#f4ecd8", 5);
      for (var y = 40; y < h - 50; y += 46) s += sk("M 24 " + y + " L " + (w - 30 - (y * 7) % 40) + " " + y, 5, "#8a8f8c", ' opacity=".6"');
      s += '<ellipse cx="' + w / 2 + '" cy="' + (h - 16) + '" rx="' + (w / 2) + '" ry="18" fill="#e6dcc2" stroke="' + INK + '" stroke-width="5"/>';
      return s;
    };
    api.toLichSVG = function (w, h, o) {
      o = o || {};
      var nhau = "M 6 10 L " + (w * 0.3) + " 4 L " + (w * 0.62) + " 12 L " + (w - 6) + " 6 L " + (w - 10) + " " + (h * 0.5) + " L " + (w - 4) + " " + (h - 8) + " L " + (w * 0.5) + " " + (h - 4) + " L 8 " + (h - 10) + " L 12 " + (h * 0.48) + " Z";
      var s = fp(nhau, o.matSau ? "#f7f2e4" : "#f1e6c8", 6);
      if (!o.matSau) {
        for (var i = 1; i < 6; i++) s += sk("M 20 " + (h * i / 6) + " L " + (w - 20) + " " + (h * i / 6), 3, "#8a8f8c", ' opacity=".7"');
        for (var j = 1; j < 4; j++) s += sk("M " + (w * j / 4) + " 20 L " + (w * j / 4) + " " + (h - 20), 3, "#8a8f8c", ' opacity=".7"');
        s += fp("M 20 16 L " + (w - 20) + " 16 L " + (w - 20) + " " + (h / 6 - 6) + " L 20 " + (h / 6 - 6) + " Z", C.TEAL, 3);
      }
      s += sk("M " + (w * 0.3) + " 6 L " + (w * 0.36) + " " + (h - 6) + " M 10 " + (h * 0.48) + " L " + (w - 8) + " " + (h * 0.52), 2.5, INK, ' opacity=".25"');
      return s;
    };
    api.gioDoSVG = function () {
      return fp("M 30 40 C 50 10 80 30 92 16 C 104 34 130 14 140 40 Z", "#f0b6a8", 4) + fp("M 70 40 C 74 18 96 12 110 36 Z", C.SEA, 4) +
        fp("M 8 40 L 152 40 L 140 128 L 20 128 Z", "#d9c49a", 6) + sk("M 16 70 L 146 70 M 18 100 L 142 100", 4, "#a8946c") +
        sk("M 50 42 L 46 126 M 80 42 L 80 126 M 110 42 L 114 126", 4, "#a8946c");
    };
    api.tuiBanhSVG = function () {
      return fp("M 10 20 L 80 20 L 86 108 L 4 108 Z", "#c9a46a", 5) + fp("M 10 20 L 18 4 L 72 4 L 80 20 Z", "#b88d52", 4) +
        '<circle cx="45" cy="64" r="16" fill="#e7b34b" stroke="' + INK + '" stroke-width="3"/><circle cx="40" cy="60" r="2.5" fill="#6b4a33"/><circle cx="50" cy="68" r="2.5" fill="#6b4a33"/>';
    };
    api.lyDoNguSVG = function () {
      return fp("M -30 -36 L 30 -36 L 26 38 L -26 38 Z", C.TEAL, 5) + sk("M 30 -20 C 52 -20 52 14 28 14", 6) + '<ellipse cx="0" cy="-34" rx="27" ry="5" fill="#8a4f24" stroke="' + INK + '" stroke-width="3"/>' +
        sk("M -26 0 L 26 0", 5, C.PAPER);
    };
    api.dongHoTuongSVG = function (r) {
      r = r || 60;
      var s = '<circle cx="0" cy="0" r="' + r + '" fill="#f7f2e4" stroke="' + INK + '" stroke-width="7"/>';
      for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6, l = i % 3 ? 0.12 : 0.22; s += sk("M " + (Math.sin(a) * r * 0.82).toFixed(1) + " " + (-Math.cos(a) * r * 0.82).toFixed(1) + " L " + (Math.sin(a) * r * (0.82 - l)).toFixed(1) + " " + (-Math.cos(a) * r * (0.82 - l)).toFixed(1), i % 3 ? 3 : 6); }
      s += '<g class="kim-gio">' + sk("M 0 4 L 0 " + (-r * 0.45), 8) + '</g><g class="kim-phut">' + sk("M 0 6 L 0 " + (-r * 0.7), 5, C.TERRA) + "</g>" + '<circle cx="0" cy="0" r="6" fill="' + INK + '"/>';
      return s;
    };
    api.tauDuLichSVG = function (w, h) {
      var s = "";
      s += fp("M 0 " + (h * 0.5) + " L " + w + " " + (h * 0.5) + " L " + (w * 0.92) + " " + h + " L " + (w * 0.05) + " " + h + " Z", "#f7f2e4", 6);
      s += fp("M " + (w * 0.016) + " " + (h * 0.78) + " L " + w * 0.96 + " " + (h * 0.78) + " L " + (w * 0.92) + " " + h + " L " + (w * 0.05) + " " + h + " Z", "#2f4f6b", 5);
      s += fp("M " + w * 0.12 + " " + h * 0.5 + " L " + w * 0.14 + " " + h * 0.3 + " L " + w * 0.82 + " " + h * 0.3 + " L " + w * 0.86 + " " + h * 0.5 + " Z", "#f7f2e4", 5);
      s += fp("M " + w * 0.22 + " " + h * 0.3 + " L " + w * 0.24 + " " + h * 0.14 + " L " + w * 0.66 + " " + h * 0.14 + " L " + w * 0.7 + " " + h * 0.3 + " Z", "#f7f2e4", 5);
      s += fp("M " + w * 0.5 + " " + h * 0.14 + " L " + w * 0.51 + " 2 L " + w * 0.6 + " 2 L " + w * 0.6 + " " + h * 0.14 + " Z", C.MAT, 4);
      for (var row = 0; row < 3; row++) {
        var y = [h * 0.6, h * 0.37, h * 0.2][row], x0 = [0.08, 0.17, 0.27][row], x1 = [0.88, 0.8, 0.66][row];
        for (var x = x0; x < x1; x += 0.035) s += '<rect x="' + (w * x).toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + (w * 0.018).toFixed(1) + '" height="' + (h * 0.06).toFixed(1) + '" fill="#5a9fb8" stroke="' + INK + '" stroke-width="1.5"/>';
      }
      return s;
    };
    api.thuyenNhoSVG = function (w, h) {
      return fp("M 0 " + h * 0.5 + " L " + w + " " + h * 0.5 + " L " + w * 0.85 + " " + h + " L " + w * 0.1 + " " + h + " Z", "#f7f2e4", 5) +
        sk("M 4 " + h * 0.7 + " L " + w * 0.94 + " " + h * 0.7, 6, C.MAT) +
        fp("M " + w * 0.2 + " " + h * 0.5 + " L " + w * 0.24 + " " + h * 0.12 + " L " + w * 0.56 + " " + h * 0.12 + " L " + w * 0.6 + " " + h * 0.5 + " Z", "#e6dcc2", 4) +
        fp("M " + w * 0.28 + " " + h * 0.2 + " l " + w * 0.1 + " 0 l 0 " + h * 0.16 + " l " + -w * 0.1 + " 0 Z M " + w * 0.42 + " " + h * 0.2 + " l " + w * 0.1 + " 0 l 0 " + h * 0.16 + " l " + -w * 0.1 + " 0 Z", "#5a9fb8", 3);
    };
    api.kayakSVG = function (w, mau) {
      var h2 = w / 2;
      return fp("M " + -h2 + " -8 C " + (-h2 * 0.6) + " -22 " + (h2 * 0.6) + " -22 " + h2 + " -8 C " + (h2 * 0.6) + " 12 " + (-h2 * 0.6) + " 12 " + -h2 + " -8 Z", mau || "#e7b34b", 5) +
        sk("M " + (-h2 * 0.8) + " -10 C " + (-h2 * 0.3) + " -16 " + (h2 * 0.3) + " -16 " + (h2 * 0.8) + " -10", 3, INK, ' opacity=".5"') +
        '<ellipse cx="0" cy="-16" rx="' + (w * 0.13) + '" ry="7" fill="#2f3b3c" stroke="' + INK + '" stroke-width="4"/>';
    };
    api.maiCheoSVG = function (dai) {
      dai = dai || 300; var h = dai / 2;
      return sk("M " + -h + " 0 L " + h + " 0", 7) + fp("M " + (-h - 22) + " -12 C " + (-h - 4) + " -18 " + (-h + 16) + " -8 " + (-h + 12) + " 0 C " + (-h - 4) + " 8 " + (-h - 24) + " 2 " + (-h - 22) + " -12 Z", C.MAT, 3) +
        fp("M " + (h + 22) + " 12 C " + (h + 4) + " 18 " + (h - 16) + " 8 " + (h - 12) + " 0 C " + (h + 4) + " -8 " + (h + 24) + " -2 " + (h + 22) + " 12 Z", C.MAT, 3);
    };
    api.haiAuSVG = function (s) {
      s = s || 1;
      return '<g transform="scale(' + s + ')">' + sk("M -6 0 L -6 -14 M 6 0 L 6 -14", 4, "#e7b34b") + fp("M -30 -30 C -30 -54 20 -58 30 -36 C 34 -26 24 -14 0 -14 C -20 -14 -30 -20 -30 -30 Z", "#ffffff", 5) +
        fp("M -26 -36 C -6 -44 18 -42 26 -32 C 10 -30 -10 -28 -26 -36 Z", "#b9c9d0", 3) + fp("M 14 -52 C 14 -66 34 -66 36 -54 C 36 -46 24 -44 16 -46 Z", "#ffffff", 4) +
        fp("M 34 -56 L 48 -52 L 34 -50 Z", "#e7b34b", 3) + '<circle cx="28" cy="-56" r="3" fill="' + INK + '"/></g>';
    };
    api.napChaiSVG = function (o) {
      o = o || {};
      var d = "M 23 0";
      for (var i = 1; i < 22; i++) { var a = i * Math.PI * 2 / 22, rr = i % 2 ? 19 : 23; d += " L " + (Math.cos(a) * rr).toFixed(1) + " " + (Math.sin(a) * rr).toFixed(1); }
      var s = fp(d + " Z", "#c9ced1", 4) + '<circle cx="0" cy="0" r="13" fill="#dfe4e6" stroke="' + INK + '" stroke-width="2"/>';
      if (o.kimCuong) s += fp("M -8 -2 L -4 -9 L 4 -9 L 8 -2 L 0 9 Z", "#bfefff", 3) + sk("M -8 -2 L 8 -2 M -4 -9 L 0 -2 L 4 -9", 2) +
        '<g class="nap-loe" opacity="0">' + fp("M 0 -44 L 6 -26 L 24 -22 L 6 -16 L 0 2 L -6 -16 L -24 -22 L -6 -26 Z", "#fff6c4", 3) + "</g>";
      return s;
    };
    api.canCauSVG = function (dai) {
      dai = dai || 260;
      var tx = dai * 0.5, ty = -dai * 0.86;
      return sk("M 0 0 L " + tx + " " + ty, 7, "#6b4a33") + '<circle cx="' + (tx * 0.12) + '" cy="' + (ty * 0.12) + '" r="10" fill="#2f3b3c" stroke="' + INK + '" stroke-width="3"/>' +
        '<path class="day-cau" d="M ' + tx + " " + ty + " L " + tx + " " + (ty + dai * 0.6) + '" fill="none" stroke="' + INK + '" stroke-width="2.5"/>';
    };
    api.caBonSVG = function (s) {
      s = s || 1;
      return '<g transform="scale(' + s + ')">' + fp("M -40 0 C -30 -26 24 -28 36 0 C 24 28 -30 26 -40 0 Z", "#a89a7a", 5) + fp("M 34 0 L 54 -16 L 54 16 Z", "#a89a7a", 4) +
        '<circle cx="-22" cy="-8" r="4" fill="' + INK + '"/><circle cx="-14" cy="-12" r="4" fill="' + INK + '"/>' + sk("M -20 12 C 0 16 20 12 30 4", 3, INK, ' opacity=".4"') + "</g>";
    };
    api.caHoiSVG = function (s) {
      s = s || 1;
      return '<g transform="scale(' + s + ')">' + fp("M -44 0 C -30 -18 24 -18 34 0 C 24 16 -30 18 -44 0 Z", "#e69a84", 5) + fp("M 32 0 L 52 -14 L 48 0 L 52 14 Z", "#e69a84", 4) +
        sk("M -30 4 C -10 10 14 8 28 2", 4, "#c9665a") + '<circle cx="-32" cy="-4" r="3.5" fill="' + INK + '"/></g>';
    };
    api.songBangSVG = function (w, h) {
      var s = fp("M 0 " + h + " L 0 " + h * 0.35 + " L " + w * 0.2 + " " + h * 0.05 + " L " + w * 0.4 + " " + h * 0.4 + " L " + w * 0.4 + " " + h + " Z", "#4f7f66", 5);
      s += fp("M " + w + " " + h + " L " + w + " " + h * 0.3 + " L " + w * 0.8 + " 0 L " + w * 0.6 + " " + h * 0.4 + " L " + w * 0.6 + " " + h + " Z", "#4f7f66", 5);
      s += fp("M " + w * 0.36 + " " + h + " L " + w * 0.42 + " " + h * 0.2 + " L " + w * 0.58 + " " + h * 0.18 + " L " + w * 0.64 + " " + h + " Z", "#f2fbff", 5);
      s += sk("M " + w * 0.45 + " " + h * 0.3 + " L " + w * 0.42 + " " + h * 0.9 + " M " + w * 0.52 + " " + h * 0.25 + " L " + w * 0.52 + " " + h * 0.95 + " M " + w * 0.56 + " " + h * 0.3 + " L " + w * 0.6 + " " + h * 0.9, 4, "#8fcbe0");
      s += fp("M " + w * 0.36 + " " + h + " L " + w * 0.36 + " " + h * 0.82 + " L " + w * 0.44 + " " + h * 0.86 + " L " + w * 0.5 + " " + h * 0.8 + " L " + w * 0.57 + " " + h * 0.86 + " L " + w * 0.64 + " " + h * 0.82 + " L " + w * 0.64 + " " + h + " Z", "#bfe3f0", 4);
      return s;
    };
  });
})();
