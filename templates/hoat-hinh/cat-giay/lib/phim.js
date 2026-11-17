/* Lõi phong cách "cắt giấy" – World Wobble (16/11/2026). Theo templates/hoat-hinh/HOP-DONG.md.
   - taoApi(data, {dom}) dựng đối tượng `api` truyền cho window.CANH(api, data) trong canh.js của đoạn.
   - khoiDong("doan") chạy trong khung index.html: gọi CANH, đặt SVG, nối vào/ra, hạt giấy, đăng ký timeline.
   Tất định: mọi chuyển động là khoá GSAP (fromTo nối tiếp) hoặc hàm render(t) gọi trong modifiers của một tween đồng hồ.
   Không Math.random, không hẹn giờ, không requestAnimationFrame, không repeat:-1.
   Chạy được cả trong Node (dom:false) để cong-cu/tao_sfx.mjs sinh sfx.json từ cùng canh.js. */
(function (G) {
  "use strict";
  var D = G.DaoCu, RIG = G.WobRig;
  var GIAY = "#EFE3C8";
  var TAU = Math.PI * 2;

  function f1(n) { return (Math.round(n * 10) / 10).toString(); }
  function g(id, inner, tr) { return "<g" + (id ? ' id="' + id + '"' : "") + (tr ? ' transform="' + tr + '"' : "") + ">" + inner + "</g>"; }
  function at(x, y, inner, extra) { return '<g transform="translate(' + x + "," + y + ")" + (extra || "") + '">' + inner + "</g>"; }

  /* đường cong khép kín mượt qua các điểm (Catmull-Rom → Bezier) */
  function smoothClosed(pts) {
    var n = pts.length, d = "M " + f1(pts[0][0]) + " " + f1(pts[0][1]) + " ";
    for (var k = 0; k < n; k++) {
      var p0 = pts[(k - 1 + n) % n], p1 = pts[k], p2 = pts[(k + 1) % n], p3 = pts[(k + 2) % n];
      d += "C " + f1(p1[0] + (p2[0] - p0[0]) / 6) + " " + f1(p1[1] + (p2[1] - p0[1]) / 6) + " " + f1(p2[0] - (p3[0] - p1[0]) / 6) + " " +
        f1(p2[1] - (p3[1] - p1[1]) / 6) + " " + f1(p2[0]) + " " + f1(p2[1]) + " ";
    }
    return d + "Z";
  }

  /* Cột khói thủ tục: dải khói uốn nhẹ, phình dần, mép có thuỳ trôi lên theo thời gian (không còn chuỗi viên tròn). */
  function smokePath(x, y, o, t) {
    var N = 13, L = [], R = [], H = o.cao, W = o.rong, ph = o.ph, sp = o.toc;
    for (var i = 0; i <= N; i++) {
      var s = i / N, yy = y - s * H;
      var cx = x + o.lech * s * s + (3 + o.uon * s) * Math.sin(TAU * (s * 1.25 - t * sp) + ph);
      var w = W * (0.42 + 1.3 * s) * (1 + 0.17 * Math.sin(TAU * (s * 4.1 - t * sp * 1.7) + ph * 1.9));
      var w2 = W * (0.42 + 1.3 * s) * (1 + 0.17 * Math.sin(TAU * (s * 3.7 - t * sp * 1.5) + ph * 0.7 + 2));
      L.push([cx - w, yy]); R.push([cx + w2, yy]);
    }
    var top = L[N], topR = R[N];
    var cap = [(top[0] + topR[0]) / 2, top[1] - W * 0.9];
    return smoothClosed(L.concat([cap]).concat(R.reverse()));
  }

  function taoApi(data, opt) {
    opt = opt || {};
    var DUR = +data.thoi_luong;
    var K = new RIG.Keys();
    var layers = [], wobs = [], frameFns = [], sfx = [], html = "", daNoi = false, canhBao = [];
    var api = {
      data: data, DUR: DUR, D: D, RIG: RIG, K: K, C: D.C, INK: D.INK, GIAY: GIAY, dom: !!opt.dom,
      g: g, at: at, f1: f1, smoothClosed: smoothClosed
    };
    function warn(m) { canhBao.push(m); if (G.console) G.console.warn("[cat-giay] " + m); }
    api.canhBao = canhBao;

    /* ---------- dựng cảnh ---------- */
    /* Một lớp parallax. p: hệ số (xa 0,35 · giữa 1 · gần 1,4). o.mat: y mặt đất của lớp (gốc bật dựng khi nối giay).
       Camera điều khiển nhóm ngoài "#L-<ten>", nối giay điều khiển nhóm trong "#L-<ten>-in": canh.js không tween hai nhóm này. */
    api.lop = function (ten, inner, p, o) {
      o = o || {};
      layers.push({ ten: ten, sel: "#L-" + ten, inSel: "#L-" + ten + "-in", p: p == null ? 1 : p, mat: o.mat == null ? 1000 : o.mat });
      return '<g id="L-' + ten + '"><g id="L-' + ten + '-in">' + inner + "</g></g>";
    };
    /* Đặt toàn bộ nội dung SVG (trời tĩnh + các lớp + lớp màn hình). Gọi đúng một lần. */
    api.dat = function (h) { html = h; };
    /* Tạo một con rối Wob: trả về bộ điều khiển (walk/pose/…) có thuộc tính .svg để chèn vào lớp. */
    api.wob = function (id, o) {
      var w = new RIG.Wob(K, id, o || {});
      w.svg = RIG.svg(id, o || {});
      wobs.push(w);
      return w;
    };

    /* ---------- khoá hình ---------- */
    api.origin = function (sel, o) { K.origin(sel, o); };
    api.set = function (sel, t, props) { K.set(sel, t, props); };
    api.to = function (sel, t, dur, props, ease) { K.to(sel, t, dur, props, ease); };
    api.key = function (sel, prop, t, v, ease) { K.add(sel, prop, t, v, ease); };
    api.show = function (sel, t, v) { K.add(sel, "opacity", t, v, "step"); };
    api.fade = function (sel, t, dur, v) { K.to(sel, t, dur, { opacity: v }, "power2.inOut"); };
    /* bật ra từ 0 (back.out), tuỳ chọn thu lại ở holdTo */
    api.pop = function (sel, t, inDur, holdTo) {
      K.origin(sel, K.origins[sel] || "0 0");
      K.add(sel, "scale", 0, 0); K.add(sel, "scale", t, 0, "none"); K.add(sel, "scale", t + (inDur || 0.22), 1, "back.out(2.6)");
      if (holdTo) { K.add(sel, "scale", holdTo, 1, "none"); K.add(sel, "scale", holdTo + 0.14, 0, "power2.in"); }
    };
    /* Đưa vào – giữ – rụt ra có lấy đà (bàn tay người bán, đồ vật chìa vào khung). sel nhận x/y.
       o: { tu: [dx, dy] vị trí ngoài khung (so với chỗ đứng), giu: giây giữ, vao: 0.5, ra: 0.45, xoay: độ lắc khi vào } */
    api.duaRut = function (sel, t, o) {
      o = o || {};
      var tu = o.tu || [440, 0], vao = o.vao || 0.5, ra = o.ra || 0.45, giu = o.giu == null ? 0.6 : o.giu;
      var ov = [-tu[0] * 0.07, -tu[1] * 0.07];
      K.origin(sel, K.origins[sel] || "0 0");
      ["x", "y"].forEach(function (p, i) {
        K.add(sel, p, 0, tu[i]); K.add(sel, p, t, tu[i], "none");
        K.add(sel, p, t + vao * 0.72, ov[i], "power2.out");
        K.add(sel, p, t + vao, 0, "sine.inOut");
        K.add(sel, p, t + vao + giu, 0, "none");
        K.add(sel, p, t + vao + giu + 0.14, ov[i] * 0.5, "power1.out");
        K.add(sel, p, t + vao + giu + 0.14 + ra, tu[i], "power2.in");
      });
      if (o.xoay) {
        K.add(sel, "rotation", 0, 0); K.add(sel, "rotation", t, o.xoay, "none");
        K.add(sel, "rotation", t + vao, 0, "back.out(2)");
      }
      return { den: t + vao, roi: t + vao + giu + 0.14 };
    };

    /* ---------- camera ----------
       keys: [[t, cx, cy, zoom, ease]] – (cx, cy) là điểm ở lớp p = 1 nằm giữa khung. Mỗi lớp đổi theo hệ số parallax.
       chi: danh sách tên lớp (mặc định mọi lớp đã tạo bằng api.lop). */
    api.camera = function (keys, chi) {
      var ls = chi ? layers.filter(function (L) { return chi.indexOf(L.ten) >= 0; }) : layers;
      keys.forEach(function (k) {
        var t = k[0], cx = k[1], cy = k[2], z = k[3], e = k[4] || "power2.inOut";
        ls.forEach(function (L) {
          K.origin(L.sel, "0 0");
          var zl = 1 + (z - 1) * L.p, clx = 960 + (cx - 960) * L.p, cly = 540 + (cy - 540) * L.p;
          K.add(L.sel, "x", t, 960 - zl * clx, e);
          K.add(L.sel, "y", t, 540 - zl * cly, e);
          K.add(L.sel, "scale", t, zl, e);
        });
      });
    };
    /* rung khung tắt dần (chỉ cho khoảnh khắc hài có chủ ý) */
    api.shake = function (t, amp, n) {
      n = n || 6;
      var r = D.rng(Math.round(t * 1000) + 7);
      K.add("#shake", "x", t, 0, "none"); K.add("#shake", "y", t, 0, "none");
      for (var i = 1; i <= n; i++) {
        var a = amp * (1 - i / (n + 1));
        K.add("#shake", "x", t + i * 0.035, (r() * 2 - 1) * a, "sine.inOut");
        K.add("#shake", "y", t + i * 0.035, (r() * 2 - 1) * a, "sine.inOut");
      }
      K.add("#shake", "x", t + (n + 1) * 0.035, 0, "sine.out"); K.add("#shake", "y", t + (n + 1) * 0.035, 0, "sine.out");
    };

    /* ---------- vẽ mỗi khung ---------- */
    /* fn(t) gọi mỗi khung khi render (t: giây từ đầu đoạn). o.twos: làm tròn t xuống 1/12 s (giữ 2 khung, cảm giác stop-motion). */
    api.moiKhung = function (fn, o) {
      var twos = o && o.twos;
      frameFns.push(twos ? function (t) { fn(Math.floor(t * 12 + 1e-6) / 12); } : fn);
    };
    function el(id) { return G.document ? G.document.getElementById(id) : null; }

    /* Cột khói ống khói (thẳng đứng như ở xứ lạnh không gió). Trả về chuỗi SVG; tự đăng ký vẽ mỗi khung (on twos).
       o: { cao: 300, rong: 22, lech: 0 (dạt ngang ở đỉnh, px), uon: 18 (biên độ uốn), toc: 0.32, seed, mo: 1 } */
    api.khoi = function (id, x, y, o) {
      o = o || {};
      var r = D.rng(o.seed || (Math.round(x * 13 + y * 7) >>> 0));
      var cfg = { cao: o.cao || 300, rong: o.rong || 22, lech: o.lech || 0, uon: o.uon == null ? 18 : o.uon, toc: o.toc || 0.32, ph: r() * TAU };
      var nodes = null;
      api.moiKhung(function (t) {
        if (!nodes) nodes = [el(id + "-b"), el(id + "-a")];
        var d = smokePath(x, y, cfg, t);
        if (nodes[0]) nodes[0].setAttribute("d", d);
        if (nodes[1]) nodes[1].setAttribute("d", d);
      }, { twos: true });
      var d0 = smokePath(x, y, cfg, 0);
      return '<g id="' + id + '" opacity="' + (o.mo == null ? 1 : o.mo) + '"><path id="' + id + '-b" d="' + d0 + '" fill="url(#khoiBongG)" transform="translate(5,6)"/>' +
        '<path id="' + id + '-a" d="' + d0 + '" fill="url(#khoiG)"/></g>';
    };

    /* Khói phụt từng cụm (ống xả xe, hơi thở). Cụm mây giấy 5 thuỳ, mọc lên – trôi – tan, lặp theo chu kỳ.
       o: { n: 4, song: 1.4 (đời một cụm), cao: 70, troi: 150 (trôi ngang, âm = sang trái), r: 18, tu: 0, den: DUR, seed } */
    api.phut = function (id, x, y, o) {
      o = o || {};
      var n = o.n || 4, life = o.song || 1.4, rise = o.cao == null ? 70 : o.cao, dx = o.troi == null ? 150 : o.troi;
      var t0 = o.tu || 0, t1 = o.den == null ? DUR : o.den, s = "";
      for (var j = 0; j < n; j++) {
        var sel = "#" + id + j;
        s += at(x, y, g(id + j, D.puff(o.r || 18, (o.seed || 5) + j)));
        K.origin(sel, "0 0");
        K.add(sel, "opacity", 0, 0, "step");
        var per = life / n;
        for (var t = t0 + j * per - life; t < t1; t += life) {
          var ts = Math.max(t0, t), p0 = (ts - t) / life;
          K.add(sel, "y", ts, -rise * p0, "none"); K.add(sel, "y", t + life, -rise, "power1.out");
          K.add(sel, "x", ts, dx * p0, "none"); K.add(sel, "x", t + life, dx, "sine.out");
          K.add(sel, "scale", ts, 0.35 + 1.45 * p0, "none"); K.add(sel, "scale", t + life, 1.8, "sine.out");
          K.add(sel, "opacity", ts, p0 > 0.15 ? 0.95 * (1 - p0) : 0, "none");
          if (t + life * 0.12 > ts) K.add(sel, "opacity", t + life * 0.12, 0.95, "sine.out");
          K.add(sel, "opacity", t + life, 0, "sine.in");
        }
      }
      return s;
    };

    /* Hơi nóng 3 sợi của D.teaMug(prefix) bay lượn trong [t0, t1]. */
    api.hoi = function (prefix, t0, t1) {
      for (var j = 0; j < 3; j++) {
        var sel = "#" + prefix + "-st" + j, up = true;
        K.origin(sel, "0 -96");
        K.add(sel, "y", t0, 0, "none"); K.add(sel, "scaleY", t0, 1, "none");
        for (var t = t0 + 0.2 * j; t < t1; t += 0.45) {
          K.add(sel, "y", t + 0.45, up ? -14 : 0, "sine.inOut");
          K.add(sel, "scaleY", t + 0.45, up ? 1.12 : 0.92, "sine.inOut");
          up = !up;
        }
      }
    };

    /* Bụi kim cương lấp lánh: n ngôi sao trong hộp [x, y, w, h], nhấp nháy theo seed trong [t0, t1]. Trả về SVG. */
    api.lapLanh = function (prefix, n, seed, box, t0, t1) {
      var r = D.rng(seed || 500), s = "";
      box = box || [80, 60, 1760, 700];
      for (var k = 0; k < n; k++) {
        var sel = "#" + prefix + k;
        s += at(Math.round(box[0] + r() * box[2]), Math.round(box[1] + r() * box[3]), g(prefix + k, D.sparkle(9 + Math.round(r() * 8))));
        K.origin(sel, "0 0"); K.add(sel, "scale", 0, 0);
        for (var tt = (t0 || 0) + r() * 2.2; tt < (t1 == null ? DUR : t1) - 0.6; tt += 2.0 + r() * 2.6) {
          K.add(sel, "scale", tt, 0, "none"); K.add(sel, "scale", tt + 0.2, 1, "back.out(2)"); K.add(sel, "scale", tt + 0.6, 0, "power2.in");
          K.add(sel, "rotation", tt, 0, "none"); K.add(sel, "rotation", tt + 0.6, 40, "power1.inOut");
        }
      }
      return s;
    };

    /* ---------- âm thanh (ghi ra sfx.json, không phát trong đoạn) ---------- */
    api.sfx = function (ten, tai, am) { sfx.push({ ten: ten, tai: +tai, am_luong: am == null ? 0.6 : am }); };
    api.dsSfx = function () {
      var all = sfx.slice();
      wobs.forEach(function (w) { (w.stepSounds || []).forEach(function (s) { all.push({ ten: s.ten, tai: s.t, am_luong: 0.42 }); }); });
      return all.filter(function (s) { return s.tai >= 0 && s.tai < DUR; })
        .map(function (s) { return { ten: s.ten, tai: Math.round(s.tai * 1000) / 1000, am_luong: s.am_luong }; })
        .sort(function (a, b) { return a.tai - b.tai; });
    };

    /* ---------- lời ---------- */
    /* Mốc bắt đầu của từ thứ k (đếm từ 0) có chứa chuỗi `tu` trong lời của đoạn (không phân biệt hoa thường). Không thấy: null. */
    api.tu = function (tu, k) {
      var hits = [];
      (data.loi || []).forEach(function (l) { (l.tu || []).forEach(function (w) { if (w.text.toLowerCase().indexOf(tu.toLowerCase()) >= 0) hits.push(w); }); });
      var w = hits[k || 0];
      return w ? w.start : null;
    };
    /* Khẩu hình theo HH_DATA.loi[].khau_hinh trong [t0, t1). Chỉ dùng khi lop = "hien-tai" (hợp đồng mục 4). */
    api.khauHinh = function (wob, t0, t1, o) {
      if (data.lop !== "hien-tai" && !(o && o.epBuoc)) { warn("khauHinh bỏ qua: đoạn " + data.id + " là '" + data.lop + "' (chỉ hien-tai mới mấp máy theo lời)"); return; }
      (data.loi || []).forEach(function (l) {
        (l.khau_hinh || []).forEach(function (c) {
          if ((t0 == null || c.start >= t0 - 1e-6) && (t1 == null || c.start < t1)) wob.mouth(Math.max(0, c.start), c.value);
        });
      });
      if (t1 != null) wob.mouth(t1, "X");
    };

    /* ---------- nối vào / ra (HOP-DONG mục 5) ----------
       giay vào: khung đầu là giấy phẳng #EFE3C8; trong ~0,5 s các lớp bật dựng (scaleY từ mép đất) hoặc trượt vào, giấy tan.
       giay ra: ~0,45 s cuối các lớp gập xuống, giấy phủ kín; khung cuối là giấy phẳng.
       cat: không làm gì. chen: thêm sfx whoosh ở 0 s. Hạt giấy / viền tối tắt ở các khung giấy phẳng.
       o: { vaoDai: 0.5, raDai: 0.45, kieu: { <tên lớp>: "dung" | "truot" | "truot-tren" | "khong" }, tre: 0.07 } */
    api.noi = function (o) {
      daNoi = true; o = o || {};
      var vao = data.vao, ra = data.ra, dIn = o.vaoDai || 0.5, dOut = o.raDai || 0.45, tre = o.tre == null ? 0.07 : o.tre;
      var kieu = o.kieu || {};
      K.add("#hh-giay", "opacity", 0, vao === "giay" ? 1 : 0, "step");
      K.add("#hh-phu", "opacity", 0, vao === "giay" ? 0 : 1, "step");
      if (vao === "giay") {
        K.add("#hh-giay", "opacity", 0.07, 1, "none"); K.add("#hh-giay", "opacity", dIn * 0.75, 0, "power2.inOut");
        K.add("#hh-phu", "opacity", dIn * 0.3, 0, "none"); K.add("#hh-phu", "opacity", dIn, 1, "power2.out");
        layers.forEach(function (L, i) {
          var k = kieu[L.ten] || "dung", t0 = 0.03 + i * tre, t1 = t0 + dIn * 0.85;
          if (k === "khong") return;
          if (k === "dung") {
            K.origin(L.inSel, "960 " + L.mat);
            K.add(L.inSel, "scaleY", 0, 0.03, "step"); K.add(L.inSel, "scaleY", t0, 0.03, "none"); K.add(L.inSel, "scaleY", t1, 1, "back.out(1.6)");
          } else {
            var dy = k === "truot-tren" ? -760 : 760;
            K.add(L.inSel, "y", 0, dy, "step"); K.add(L.inSel, "y", t0, dy, "none"); K.add(L.inSel, "y", t1, 0, "power3.out");
          }
        });
      }
      if (vao === "chen") api.sfx("whoosh", 0, 0.5);
      if (ra === "giay") {
        var tOut = DUR - dOut, tEnd = DUR - 1 / 30 - 0.02;
        K.add("#hh-giay", "opacity", tOut, 0, "none"); K.add("#hh-giay", "opacity", tEnd, 1, "power2.in");
        K.add("#hh-phu", "opacity", tOut, 1, "none"); K.add("#hh-phu", "opacity", tEnd, 0, "power1.in");
        layers.slice().reverse().forEach(function (L, i) {
          if ((kieu[L.ten] || "dung") === "khong") return;
          K.origin(L.inSel, "960 " + L.mat);
          K.add(L.inSel, "scaleY", tOut + i * 0.04, 1, "none"); K.add(L.inSel, "scaleY", tEnd, 0.2, "power2.in");
        });
      }
    };

    /* ---------- nội bộ ---------- */
    api._daNoi = function () { return daNoi; };
    api._html = function () { return html; };
    api._layers = layers;
    api._ketThuc = function (tl, gsap) {
      wobs.forEach(function (w) { w.finish(tl, gsap); });
      var n = K.emit(tl, gsap);
      if (frameFns.length) {
        var clock = { v: 0 };
        var run = function (v) { var t = Math.max(0, Math.min(DUR, +v)); for (var i = 0; i < frameFns.length; i++) frameFns[i](t); return v; };
        tl.to(clock, { v: DUR, duration: DUR, ease: "none", modifiers: { v: run } }, 0);
        run(0);
      }
      tl.set({}, {}, DUR);
      return n;
    };
    return api;
  }

  /* ---------- hạt giấy (canvas, seed cố định; dùng độ mờ thường, không mix-blend-mode) ---------- */
  function grainTexture() {
    var cv = G.document.createElement("canvas"), n = 320;
    cv.width = n; cv.height = n;
    var ctx = cv.getContext("2d"), img = ctx.createImageData(n, n), r = D.rng(9001);
    for (var i = 0; i < n * n; i++) {
      var v = r(), fiber = r() < 0.004;
      img.data[i * 4] = fiber ? 70 : 92; img.data[i * 4 + 1] = fiber ? 60 : 78; img.data[i * 4 + 2] = fiber ? 50 : 58;
      img.data[i * 4 + 3] = fiber ? 120 : Math.round(v * v * 62);
    }
    ctx.putImageData(img, 0, 0);
    return cv.toDataURL("image/png");
  }
  function blotTexture() {
    var sm = G.document.createElement("canvas"), r = D.rng(9100);
    sm.width = 48; sm.height = 27;
    var c1 = sm.getContext("2d"), im = c1.createImageData(48, 27);
    for (var i = 0; i < 48 * 27; i++) { im.data[i * 4] = 110; im.data[i * 4 + 1] = 92; im.data[i * 4 + 2] = 64; im.data[i * 4 + 3] = Math.round(r() * 30); }
    c1.putImageData(im, 0, 0);
    var big = G.document.createElement("canvas");
    big.width = 480; big.height = 270;
    var c2 = big.getContext("2d");
    c2.imageSmoothingEnabled = true; c2.imageSmoothingQuality = "high";
    c2.drawImage(sm, 0, 0, 480, 270);
    return big.toDataURL("image/png");
  }

  /* Chữ trên hình phải nằm trong HH_DATA.chu_tren_do_vat (ký hiệu như "?!", "…" thì cho qua). */
  function kiemChu(svg, data) {
    var ok = (data.chu_tren_do_vat || []).map(function (s) { return s.trim(); }), loi = [];
    Array.prototype.forEach.call(svg.querySelectorAll("text"), function (t) {
      var s = (t.textContent || "").trim();
      if (!s || !/[A-Za-z0-9]/.test(s)) return;
      var hit = ok.some(function (a) { return a === s || a.indexOf(s) >= 0; });
      if (!hit) loi.push(s);
    });
    if (loi.length && G.console) G.console.warn("[cat-giay] chữ ngoài chu_tren_do_vat: " + loi.join(" | "));
    return loi;
  }

  /* dangKy: hàm nhận timeline (khung index.html đăng ký window.__timelines["doan"]), hoặc chuỗi id composition. */
  function khoiDong(dangKy) {
    function start() {
      var data = G.HH_DATA;
      if (!data) throw new Error("cat-giay: thiếu window.HH_DATA (du-lieu.js)");
      var api = taoApi(data, { dom: true });
      if (typeof G.CANH === "function") G.CANH(api, data);
      else if (G.console) G.console.warn("[cat-giay] chưa có canh.js: chỉ dựng nền giấy");
      if (!api._daNoi()) api.noi({});
      var svg = G.document.getElementById("hh-stage");
      svg.innerHTML = D.defs() + '<g id="shake">' + api._html() + "</g>";
      G.__hhLoiChu = kiemChu(svg, data);
      var gr = G.document.getElementById("hh-grain"), bl = G.document.getElementById("hh-blot");
      if (gr) gr.style.backgroundImage = "url(" + grainTexture() + ")";
      if (bl) bl.style.backgroundImage = "url(" + blotTexture() + ")";
      // hạt giấy nhảy 8 hình/giây như phim cắt giấy quay từng khung
      var rg = D.rng(4242);
      for (var t = 0; t < api.DUR; t += 0.125) {
        api.K.add("#hh-grain", "x", t, Math.round(rg() * 300) - 150, "step");
        api.K.add("#hh-grain", "y", t, Math.round(rg() * 300) - 150, "step");
      }
      var tl = G.gsap.timeline({ paused: true });
      var n = api._ketThuc(tl, G.gsap);
      if (typeof dangKy === "function") dangKy(tl);
      else { G.__timelines = G.__timelines || {}; G.__timelines[dangKy || "doan"] = tl; }
      G.__hhSfx = api.dsSfx();
      G.__hhTween = n;
      G.__hhCanhBao = api.canhBao;
    }
    if (G.document.readyState === "loading") G.document.addEventListener("DOMContentLoaded", start); else start();
  }

  G.HHCatGiay = { taoApi: taoApi, khoiDong: khoiDong, smokePath: smokePath, kiemChu: kiemChu };
})(typeof window !== "undefined" ? window : globalThis);
