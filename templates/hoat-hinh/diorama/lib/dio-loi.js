/* World Wobble – thư viện phong cách "diorama giấy 2.5D / sách pop-up".
 * dio-loi.js: lõi. Màu, PRNG có seed, dựng tấm giấy trong không gian CSS 3D, bộ lọc giấy, camera 3 lớp,
 * sfx, kiểm chữ trên đồ vật, hạt giấy. Tách từ bản thử projects/2026-11-16-oymyakon/ban-thu-60s/c-diorama/dio.js.
 *
 * Cách nạp (khung/index.html): dio-loi.js → dio-wob.js → dio-dao-cu.js → dio-ban.js → dio-so.js → dio-noi.js
 * → dio-3d.js → du-lieu.js → canh.js → khối inline gọi DIO.chay(dangKy); module dio-3d-nap.js nạp three.js (chỉ cảnh ngoài trời 3D dùng). Các module đăng ký vào DIO.mo, DIO.taoApi gọi lần lượt.
 * Tất định: không Math.random, không Date, không requestAnimationFrame, không repeat:-1.
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];

  // Bảng màu "Mực & giấy" (templates/_shared/frame.md) + màu Wob (tao_wob.py) + tuyết, băng
  DIO.C = {
    INK: "#1f2326", SEA: "#5a9fb8", LAND: "#efd9a2", EYE: "#fffdf6", CHEEK: "#e9806e",
    PACK: "#b8743a", PACK_DARK: "#8e5527", MAT: "#d9543c", SHOE: "#d9543c", FROST: "#e8f6ff",
    PAPER: "#EFE3C8", PAPER2: "#e2d2ae", TERRA: "#E0703A", TEAL: "#3F6A70", NIGHT: "#1E2A2B",
    SNOW: "#f7fafb", SNOW2: "#dfe9ee", ICE: "#bfe3f0", ICE2: "#6fa9c2",
    WOOD: "#6b4a33", WOOD2: "#4a3122", WIN: "#f3c46a", FISH1: "#4f7486", FISH2: "#8fb0bf", FISH3: "#d6e3e8",
    GIAY_NOI: "#EFE3C8" // màu khung nối kiểu `giay` (HOP-DONG mục 5), phải phẳng đúng màu này
  };

  DIO.mulberry32 = function (a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  var CSS =
    ".dio-stage{position:absolute;inset:0;overflow:hidden;perspective:1200px;perspective-origin:50% 50%;}" +
    ".dio-cam{position:absolute;left:960px;top:540px;width:0;height:0;transform-style:preserve-3d;}" +
    ".dio-p{position:absolute;left:0;top:0;width:0;height:0;transform-style:preserve-3d;}" +
    ".dio-cut{position:absolute;overflow:visible;}" +
    ".dio-face{position:absolute;box-sizing:border-box;}" +
    ".dio-bfh{backface-visibility:hidden;}" +
    ".dio-ovl{position:absolute;inset:0;pointer-events:none;}" +
    ".dio-m > g{display:none;}" +
    ["X", "A", "B", "C", "D", "E", "F", "G", "H", "O", "S", "N", "K"].map(function (k) {
      return '.dio-m[data-m="' + k + '"] > .m' + k;
    }).join(",") + "{display:inline;}";

  DIO.taoApi = function (root, data) {
    var C = DIO.C;
    var api = { root: root, data: data, C: C, SFX: [], DUR: +data.thoi_luong, fps: data.fps || 30 };
    var tl = (api.tl = gsap.timeline({ paused: true }));
    api.noiTuDong = { vao: true, ra: true }; // canh.js đặt false nếu tự làm nối
    api.sauKhiDung = []; // hàm chạy sau khi canh.js + nối dựng xong, trước khi đăng ký timeline (dio-3d dùng để dựng khung 0)

    if (!document.getElementById("dio-css")) {
      var st = document.createElement("style"); st.id = "dio-css"; st.textContent = CSS; document.head.appendChild(st);
    }

    // ---------------------------------------------------------------- tiện ích
    var rnd = DIO.mulberry32(data.seed || 20261116);
    api.rng = function (seed) { return DIO.mulberry32(seed); };
    api.rr = function (a, b) { return a + (b - a) * rnd(); };
    var uid = 0;
    api.nid = function (p) { return (p || "i") + ++uid; };
    api.f2 = function (v) { return (Math.round(v * 100) / 100).toFixed(2); };

    api.div = function (cls, parent, css) {
      var d = document.createElement("div"); d.className = cls; if (css) d.style.cssText = css; parent.appendChild(d); return d;
    };
    // Nút 3D rỗng (preserve-3d)
    api.P = function (parent, v) { var d = api.div("dio-p", parent); gsap.set(d, Object.assign({ x: 0, y: 0, z: 0 }, v || {})); return d; };
    // Tấm giấy cắt đứng: svg w×h, điểm neo (ax, ay) đặt tại gốc nút (mặc định giữa đáy). o: pos, ax, ay, f (filter), cls
    api.cut = function (parent, w, h, inner, o) {
      o = o || {};
      var p = api.P(parent, o.pos);
      var ax = o.ax != null ? o.ax : w / 2, ay = o.ay != null ? o.ay : h;
      p.insertAdjacentHTML("beforeend", '<svg class="dio-cut ' + (o.cls || "") + '" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + " " + h +
        '" style="left:' + -ax + "px;top:" + -ay + "px;" + (o.f ? "filter:" + o.f + ";" : "") + '">' + inner + "</svg>");
      p.svg = p.lastElementChild;
      return p;
    };
    // Tấm phẳng HTML (nền CSS) tâm tại v
    api.plane = function (parent, v, w, h, css, cls) {
      var p = api.P(parent, v);
      api.div("dio-face " + (cls || ""), p, "left:" + -w / 2 + "px;top:" + -h / 2 + "px;width:" + w + "px;height:" + h + "px;" + css);
      p.face = p.lastElementChild;
      p.face.setAttribute("data-layout-allow-overflow", ""); // tấm 3D lớn (tường, bàn) luôn tràn khung: có chủ ý
      return p;
    };
    // Tấm nằm (sàn, mặt bàn): tâm (x, y, z), rộng w theo x, sâu d theo z
    api.floorPlane = function (parent, x, y, z, w, d, css) { return api.plane(parent, { x: x, y: y, z: z, rotationX: 90 }, w, d, css); };

    // Bộ lọc giấy: lớp 1 = độ dày giấy (viền lệch 2–3px, không mờ), lớp 2 = bóng đổ lên lớp sau
    api.F = {
      AM: "drop-shadow(2px 3px 0 #a8946c) drop-shadow(16px 12px 9px rgba(25,12,0,.45))",
      AM_NHO: "drop-shadow(2px 3px 0 #a8946c) drop-shadow(8px 10px 6px rgba(25,12,0,.35))",
      AM_GAN: "drop-shadow(2px 3px 0 #a8946c) blur(5px)",
      LANH: "drop-shadow(2px 3px 0 #b9c9d0) drop-shadow(14px 10px 9px rgba(40,72,92,.38))",
      LANH_NHO: "drop-shadow(1px 2px 0 #b9c9d0) drop-shadow(7px 5px 5px rgba(40,72,92,.3))",
      XA: "drop-shadow(1px 2px 0 #c9d6dc) drop-shadow(6px 5px 5px rgba(40,72,92,.22)) blur(1.4px)",
      XA_MO: "blur(2.4px)",
      GAN: "drop-shadow(2px 3px 0 #b9c9d0) blur(3px)",
      WOB_AM: "drop-shadow(2px 3px 0 #a8946c) drop-shadow(18px 10px 8px rgba(25,12,0,.45))",
      WOB_LANH: "drop-shadow(2px 3px 0 #b9c9d0) drop-shadow(14px 9px 8px rgba(40,72,92,.38))"
    };

    // ---------------------------------------------------------------- vẽ chung (chuỗi SVG)
    api.sk = function (d, w, c, extra) {
      return '<path d="' + d + '" fill="none" stroke="' + (c || C.INK) + '" stroke-width="' + (w || 5) + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || "") + "/>";
    };
    api.fp = function (d, fill, w, extra) {
      return '<path d="' + d + '" fill="' + fill + '" stroke="' + C.INK + '" stroke-width="' + (w == null ? 5 : w) + '" stroke-linejoin="round"' + (extra || "") + "/>";
    };
    // Chữ trên đồ vật: CHỈ chữ có trong HH_DATA.chu_tren_do_vat (HOP-DONG mục 2). Chữ lạ → bỏ, báo lỗi console.
    api.chuHopLe = function (s) { return (data.chu_tren_do_vat || []).indexOf(s) >= 0; };
    api.txt = function (x, y, size, wgt, str, fill, extra) {
      if (!api.chuHopLe(str)) { console.error("[dio] chữ không có trong chu_tren_do_vat, bỏ: " + str); return ""; }
      return '<text x="' + x + '" y="' + y + '" font-family="Fraunces" font-size="' + size + '" font-weight="' + wgt +
        '" text-anchor="middle" class="dio-chu" data-layout-allow-overlap data-layout-allow-occlusion data-layout-allow-overflow fill="' + (fill || C.INK) + '"' + (extra || "") + ">" + str + "</text>";
    };
    // Mép tuyết gợn sóng
    api.lumpy = function (x0, x1, y, amp, n, seed) {
      var r = DIO.mulberry32(seed || 3), d = "M " + x0 + " " + y, st = (x1 - x0) / n;
      for (var i = 0; i < n; i++) { var xa = x0 + st * i, xb = xa + st; d += " Q " + (xa + st / 2).toFixed(1) + " " + (y + amp * (0.6 + 0.8 * r())).toFixed(1) + " " + xb.toFixed(1) + " " + y; }
      return d;
    };

    // ---------------------------------------------------------------- sfx (mốc tính từ đầu đoạn)
    api.sfx = function (ten, tai, amLuong) {
      if (tai < 0 || tai > api.DUR) return;
      api.SFX.push({ ten: ten, tai: Math.round(tai * 1000) / 1000, am_luong: amLuong == null ? 0.5 : amLuong });
    };

    // ---------------------------------------------------------------- defs dùng chung
    root.insertAdjacentHTML("beforeend",
      '<svg width="0" height="0" style="position:absolute"><defs>' +
      '<pattern id="dio-plaid" width="56" height="56" patternUnits="userSpaceOnUse"><rect width="56" height="56" fill="' + C.TERRA + '"/>' +
      '<rect x="0" y="20" width="56" height="16" fill="' + C.PAPER + '" opacity=".8"/><rect x="20" y="0" width="16" height="56" fill="' + C.PAPER + '" opacity=".55"/>' +
      '<rect x="0" y="26" width="56" height="4" fill="' + C.TEAL + '"/><rect x="26" y="0" width="4" height="56" fill="' + C.TEAL + '"/></pattern>' +
      '<radialGradient id="dio-glowW"><stop offset="0" stop-color="#fff2c4" stop-opacity=".9"/><stop offset=".45" stop-color="#ffd27a" stop-opacity=".35"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="dio-coneW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6a6" stop-opacity=".55"/><stop offset="1" stop-color="#ffe6a6" stop-opacity="0"/></linearGradient>' +
      '<filter id="dio-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" stitchTiles="stitch"/>' +
      '<feColorMatrix type="matrix" values="0 0 0 0 .12  0 0 0 0 .1  0 0 0 0 .08  0 0 0 1.4 -.55"/></filter>' +
      // Khói/hơi: các cục tròn chồng nhau được viền mực CHUNG (dilate alpha) + bóng lưỡi liềm → một cột khói liền
      '<filter id="dio-khoi" x="-40%" y="-10%" width="180%" height="120%">' +
      '<feMorphology in="SourceAlpha" operator="dilate" radius="3.2" result="d"/><feFlood flood-color="' + C.INK + '"/><feComposite in2="d" operator="in" result="vien"/>' +
      '<feOffset in="SourceAlpha" dx="-7" dy="-6" result="o"/><feComposite in="SourceAlpha" in2="o" operator="out" result="liem"/>' +
      '<feFlood flood-color="#bccdd5"/><feComposite in2="liem" operator="in" result="bong"/>' +
      '<feMerge><feMergeNode in="vien"/><feMergeNode in="SourceGraphic"/><feMergeNode in="bong"/></feMerge></filter>' +
      '<filter id="dio-khoi-xa" x="-40%" y="-10%" width="180%" height="120%">' +
      '<feMorphology in="SourceAlpha" operator="dilate" radius="2" result="d"/><feFlood flood-color="#9fb4bf"/><feComposite in2="d" operator="in" result="vien"/>' +
      '<feMerge><feMergeNode in="vien"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="dio-hoi" x="-40%" y="-10%" width="180%" height="120%">' +
      '<feMorphology in="SourceAlpha" operator="dilate" radius="2.4" result="d"/><feFlood flood-color="' + C.INK + '" flood-opacity=".75"/><feComposite in2="d" operator="in" result="vien"/>' +
      '<feMerge><feMergeNode in="vien"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      "</defs></svg>");

    // ---------------------------------------------------------------- sân khấu + camera
    // Camera 3 lớp lồng nhau: cam (dolly k, ngẩng rx) → camY (lượn ry) → camT (tâm ngắm cx, cy, cz).
    // Điểm (cx, cy, cz) của thế giới nằm giữa khung; k > 0 là tiến lại gần (tỉ lệ ≈ 1200 / (1200 − k)).
    api.makeRig = function (stage) {
      var cam = api.div("dio-cam", stage), cy = api.P(cam, {}), ct = api.P(cy, {});
      return { stage: stage, cam: cam, camY: cy, camT: ct, st: null };
    };
    api.sanKhau = function (o) {
      o = o || {};
      var stage = api.div("dio-stage", o.cha || root, o.perspective ? "perspective:" + o.perspective + "px;" : "");
      var rig = api.makeRig(stage);
      return { stage: stage, rig: rig, the: rig.camT };
    };
    var CAM0 = { cx: 0, cy: 0, cz: 0, k: 0, rx: 0, ry: 0 };
    // t == null: đặt ngay (trạng thái đầu); t số: tl.set tại t (cắt cảnh)
    api.camSet = function (r, t, s) {
      var a = Object.assign({}, CAM0, r.st || {}, s);
      if (t == null) {
        gsap.set(r.cam, { z: a.k, rotationX: a.rx }); gsap.set(r.camY, { rotationY: a.ry }); gsap.set(r.camT, { x: -a.cx, y: -a.cy, z: -a.cz });
      } else {
        tl.set(r.cam, { z: a.k, rotationX: a.rx }, t); tl.set(r.camY, { rotationY: a.ry }, t); tl.set(r.camT, { x: -a.cx, y: -a.cy, z: -a.cz }, t);
      }
      r.st = a;
    };
    // Gọi theo thứ tự thời gian (mỗi camTo bắt đầu từ trạng thái cuối của lệnh trước)
    api.camTo = function (r, t, d, s, ease) {
      var a = r.st, b = Object.assign({}, a, s); ease = ease || "power2.inOut";
      tl.fromTo(r.cam, { z: a.k, rotationX: a.rx }, { z: b.k, rotationX: b.rx, duration: d, ease: ease, immediateRender: false }, t);
      tl.fromTo(r.camY, { rotationY: a.ry }, { rotationY: b.ry, duration: d, ease: ease, immediateRender: false }, t);
      tl.fromTo(r.camT, { x: -a.cx, y: -a.cy, z: -a.cz }, { x: -b.cx, y: -b.cy, z: -b.cz, duration: d, ease: ease, immediateRender: false }, t);
      r.st = b;
    };
    // Rung máy nhẹ (khoảnh khắc hài có chủ ý): biên độ px, trong [t, t+d]
    api.camRung = function (r, t, d, amp) {
      var n = Math.max(2, Math.round(d / 0.05));
      tl.fromTo(r.stage, { x: -amp }, { x: amp, duration: d / n, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t);
      tl.to(r.stage, { x: 0, duration: 0.06 }, t + d);
    };
    // Bật/tắt cả sân khấu (cắt cảnh giữa hai sân khấu trong cùng đoạn)
    api.hien = function (el, t, on) { tl.set(el, { visibility: on ? "visible" : "hidden" }, t); };

    // Viền tối ấm / lạnh phủ lên một sân khấu
    api.vignette = function (stage, kieu) {
      return api.div("dio-ovl", stage, kieu === "lanh"
        ? "background:linear-gradient(rgba(170,210,230,.12), rgba(0,0,0,0) 40%), radial-gradient(ellipse 78% 72% at 50% 46%, rgba(0,0,0,0) 58%, rgba(20,40,55,.42) 100%);"
        : "background:radial-gradient(ellipse 75% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(12,6,2,.55) 100%);");
    };
    // Hạt giấy toàn khung (độ mờ thường, KHÔNG mix-blend-mode: blend làm tắt chụp nhanh). z-index 50, dưới lớp nối giấy.
    api.hatGiay = function (op) {
      root.insertAdjacentHTML("beforeend", '<svg class="dio-ovl dio-hat" width="1920" height="1080" style="z-index:50;opacity:' + (op == null ? 0.32 : op) + '"><rect width="1920" height="1080" filter="url(#dio-grain)"/></svg>');
    };

    DIO.mo.forEach(function (m) { m(api); });
    return api;
  };

  // Đo cỡ chữ hiển thị (px trên khung 1920×1080) của mọi <text class="dio-chu"> tại các mốc. Dùng bởi cong-cu/kiem_doan.py
  // Khung xuất lớn (2560×1440): root bị phóng ×K bằng CSS transform, nên số đo getBoundingClientRect chia K để vẫn là px thiết kế.
  DIO.doChu = function (api, mocs) {
    var out = [], rootEl = api.root, K = rootEl && rootEl.offsetWidth ? rootEl.getBoundingClientRect().width / rootEl.offsetWidth : 1;
    mocs.forEach(function (t) {
      api.tl.seek(t, true);
      document.querySelectorAll("text.dio-chu").forEach(function (el) {
        var r0 = el.getBoundingClientRect(), bb = el.getBBox();
        var r = { left: r0.left / K, top: r0.top / K, right: r0.right / K, bottom: r0.bottom / K, width: r0.width / K, height: r0.height / K };
        var fs = parseFloat(el.getAttribute("font-size")) || 0;
        var vis = r.right > 0 && r.left < 1920 && r.bottom > 0 && r.top < 1080 && r.width > 0;
        var hidden = false, n = el;
        while (n && n.nodeType === 1) {
          var cs = getComputedStyle(n);
          if (cs.visibility === "hidden" || cs.display === "none" || parseFloat(cs.opacity) < 0.05) { hidden = true; break; }
          n = n.parentNode;
        }
        out.push({ t: t, chu: el.textContent, px: bb.height ? Math.round(fs * r.height / bb.height * 10) / 10 : 0, trong_khung: vis && !hidden,
          x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) });
      });
      if (api.doChu3d) out = out.concat(api.doChu3d(t)); // chữ trên biển của cảnh ngoài trời 3D (dio-3d.js)
    });
    api.tl.seek(0, true);
    var pre = document.getElementById("do-chu-out");
    if (pre) pre.textContent = JSON.stringify(out);
    return out;
  };

  // Chạy đoạn: dựng api, gọi window.CANH(api, data), nối tự động, hạt giấy, đệm timeline đúng độ dài, đăng ký.
  // dangKy(tl): hàm đăng ký timeline do index.html truyền vào (lint tĩnh của HyperFrames cần thấy window.__timelines trong HTML)
  DIO.chay = function (dangKy) {
    function go() {
      var root = document.getElementById("root"), data = window.HH_DATA;
      if (!data) { console.error("[dio] thiếu window.HH_DATA (du-lieu.js)"); return; }
      var api = DIO.taoApi(root, data);
      if (typeof window.CANH === "function") window.CANH(api, data);
      else console.error("[dio] canh.js chưa định nghĩa window.CANH = function (api, data) {…}");
      if (DIO.hoanTat) DIO.hoanTat(api);
      api.tl.set({}, {}, api.DUR); // timeline dài đúng bằng đoạn
      api.sauKhiDung.forEach(function (f) { f(); });
      if (typeof dangKy === "function") dangKy(api.tl);
      else { window.__timelines = window.__timelines || {}; window.__timelines["doan"] = api.tl; }
      window.__dio = api;
      var out = document.getElementById("sfx-out");
      if (out) out.textContent = JSON.stringify(api.SFX);
      var m = /[?&]do-chu=([^&]+)/.exec(location.search);
      if (m) DIO.doChu(api, decodeURIComponent(m[1]).split(",").map(Number));
    }
    // Cảnh ngoài trời 3D (dio-3d.js) cần three.js: module lib/dio-3d-nap.js chạy trễ, gắn window.THREE rồi phát "dio-three".
    // Bật khi canh.js đặt window.CANH_3D = true hoặc gọi api.ngoaiTroi(...). Đoạn CSS 3D không chờ gì.
    var da = false;
    function moi() {
      if (da) return;
      var can3d = window.CANH_3D || (typeof window.CANH === "function" && /\.ngoaiTroi\s*\(/.test(String(window.CANH)));
      if (can3d && !window.THREE) return; // chờ "dio-three" hoặc "load"
      da = true; go();
    }
    window.addEventListener("dio-three", moi);
    window.addEventListener("load", function () {
      if (!da && !window.THREE) console.error("[dio] canh dùng cảnh 3D nhưng three.js không nạp được (lib/dio-3d-nap.js, lib/vendor/)");
      moi();
    });
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", moi); else moi();
  };
})();
