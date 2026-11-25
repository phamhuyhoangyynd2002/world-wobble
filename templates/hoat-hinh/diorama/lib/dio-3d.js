/* dio-3d.js: chế độ CẢNH NGOÀI TRỜI 3D của phong cách diorama (chốt 18/11/2026: T4 gộp vào diorama, không thành phong cách thứ 4).
 * Thế giới dựng bằng three.js (MIT, lib/vendor/, nạp qua dio-3d-nap.js): phố, làng, núi, cây, khói có chiều sâu thật,
 * mặt trời thấp đổ bóng, sương trùng màu chân trời, vật liệu tô 3 bậc, viền mực theo độ sâu + nếp gấp (chỉ cho thế giới),
 * mờ ống kính theo độ sâu, viền tối nhẹ. Học kỹ thuật từ mromidev/claude-animated-shorts (MIT); mã viết lại, không chép.
 *
 * Wob KHÔNG vẽ lại: con rối giấy của dio-wob.js (api.makeWob, cùng tạo hình gốc tao_wob.py) được dựng ẩn trong DOM,
 * mọi hàm của nó (walk, quay, look, lids, mouth, khauHinh, trangPhuc, armTo, holdPose, bubble…) chạy như ở bàn kỷ vật;
 * mỗi khung con rối được vẽ lại đồng bộ lên Canvas2D (Path2D, đọc transform + computed style) rồi dán lên một tấm phẳng
 * quay về camera, nhận ánh sáng, đổ bóng. Toạ độ x, z của Wob trong chế độ này là MÉT (1 đơn vị three = 1 m).
 *
 * Tất định: vẽ sau khi timeline GSAP đã dựng xong trạng thái ở t (sự kiện hf-seek + vá tl.render), không Math.random không seed,
 * không requestAnimationFrame, không Date. Mọi chuyển động lặp (khói, tuyết, hơi thở) là hàm thuần của t.
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];

  var L_THE_GIOI = 0, L_KHONG_MUC = 1, L_KHOI = 2; // lớp: thế giới có viền mực · Wob/trời/tuyết rơi · khói (chỉ viền ngoài)

  var ANH_SANG = {
    "trua-dong": { troiDinh: "#86aac8", chanTroi: "#e6dfd3", nang: { huong: [-38, 8, 14], mau: "#ffcf9e", manh: 2.6 }, troiSang: { tren: "#c4d6e8", duoi: "#f2efe8", manh: 1.25 }, cuaSo: 1.6 },
    "chieu-ta": { troiDinh: "#7f8fb8", chanTroi: "#f0c9a0", nang: { huong: [-40, 4, 6], mau: "#ff9a5c", manh: 2.4 }, troiSang: { tren: "#9fa9cc", duoi: "#f0d8c0", manh: 1.0 }, cuaSo: 2.0 },
    "dem": { troiDinh: "#16233a", chanTroi: "#3a4d6b", nang: { huong: [-20, 30, 10], mau: "#9fb6ff", manh: 0.7 }, troiSang: { tren: "#3d5580", duoi: "#2a3448", manh: 0.9 }, cuaSo: 2.6 },
    // thêm 18/11/2026 (tập 1, d21/d23/d30): sáng sớm còn tối, giờ xanh ban mai, trưa hè nắng gắt (cửa sổ tắt, kính phản trời)
    "sang-som": { troiDinh: "#22365e", chanTroi: "#6a7ba0", nang: { huong: [-26, 18, -12], mau: "#b0c2ff", manh: 1.1 }, troiSang: { tren: "#6680b4", duoi: "#38445f", manh: 1.5 }, cuaSo: 2.5 },
    "ban-mai": { troiDinh: "#3d5a8c", chanTroi: "#b9a9c0", nang: { huong: [-34, 8, -16], mau: "#ffc4a8", manh: 1.4 }, troiSang: { tren: "#8198c4", duoi: "#5c6079", manh: 1.45 }, cuaSo: 2.2 },
    "trua-he": { troiDinh: "#2f74c4", chanTroi: "#cfe4ef", nang: { huong: [-16, 38, 20], mau: "#fff0d2", manh: 2.9 }, troiSang: { tren: "#b9d6f2", duoi: "#a7b878", manh: 1.25 }, cuaSo: 0.5, kinhTat: 0.85 }
  };

  function smoother(x) { x = Math.min(1, Math.max(0, x)); return x * x * x * (x * (x * 6 - 15) + 10); }
  var EASE = {
    luot: smoother,                                                           // lướt smootherstep (đối xứng)
    lao: function (x) { x = Math.min(1, Math.max(0, x)); return 1 - Math.pow(1 - x, 3); },   // lao: nhanh nhất ở khung đầu
    vao: function (x) { x = Math.min(1, Math.max(0, x)); return x * x * x; },                // tăng tốc (lao vào trang giấy)
    em: function (x) { x = Math.min(1, Math.max(0, x)); return 0.5 - 0.5 * Math.cos(Math.PI * x); }
  };
  var frac = function (v) { return v - Math.floor(v); };
  var lerp = function (a, b, p) { return a + (b - a) * p; };

  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C;

    // ================================================================ đồ thêm cho con rối Wob (18/11/2026, tập 1 d07/d30)
    // Không đổi tạo hình gốc (tao_wob.py): chỉ khoác thêm đồ lên CÙNG con rối makeWob, chạy cả ở CSS 3D lẫn cảnh 3D.
    // api.trangPhuc(w, {aoLong, muLong, miRu, baLoPhong}, t?) mở rộng hàm gốc của dio-wob.js:
    //   aoLong: áo lông dày tới chân (mũ trùm viền lông quanh mặt, tay áo lông) · muLong: mũ lông tai bèo
    //   miRu: lông mi rủ xuống như cỏ héo (nóng) · baLoPhong: ba lô phồng căng, đuôi cá thò ra miệng ba lô
    var svgNS = "http://www.w3.org/2000/svg";
    function longVien(cx, cy, rx, ry, amp, k, yDay, vao) {   // viền lông: elip gợn bông (vao: gợn hướng vào trong), cắt đáy ở yDay
      var d = "", n = 160;
      for (var i = 0; i < n; i++) {
        var a = i / n * Math.PI * 2, b = amp * Math.abs(Math.sin(k * a / 2)) * (vao ? -1 : 1);
        var x = cx + (rx + b) * Math.cos(a), y = cy + (ry + b) * Math.sin(a);
        if (yDay != null && y > yDay) y = yDay + (vao ? 0 : amp * 0.6 * Math.abs(Math.sin(k * 1.6 * a)));
        d += (i ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1);
      }
      return d + " Z";
    }
    function dungAoLong(w) {
      if (w.aoLong) return;
      var NAU = "#9a6a42", KEM = "#efe2c4", sk = api.sk, INK = C.INK, r = api.rng(77), tua = "";
      for (var i = 0; i < 46; i++) {
        var x = 60 + r() * 280, y = 60 + r() * 300, dx = x - 200, dy = y - 186;
        if ((dx * dx) / (130 * 130) + (dy * dy) / (110 * 110) < 1) continue;   // chừa viền mặt
        tua += sk("M " + x.toFixed(0) + " " + y.toFixed(0) + " q " + (3 + r() * 3).toFixed(1) + " -7 " + (8 + r() * 4).toFixed(1) + " -3", 3, INK, ' opacity=".38"');
      }
      var ao = '<g class="aoLong" opacity="0">' +
        '<path d="' + longVien(200, 210, 162, 178, 8, 26, 372) + " " + longVien(200, 186, 126, 106, 0, 1) + '" fill="' + NAU + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round" fill-rule="evenodd"/>' +
        tua + sk("M 200 296 L 200 368", 4, INK, ' opacity=".7"') +
        [312, 336].map(function (y) { return '<rect x="188" y="' + y + '" width="24" height="9" rx="4" fill="' + KEM + '" stroke="' + INK + '" stroke-width="3"/>'; }).join("") +
        '<path d="' + longVien(200, 186, 128, 108, 7, 30) + " " + longVien(200, 188, 100, 80, 6, 26, null, true) + '" fill="' + KEM + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round" fill-rule="evenodd"/>' +
        "</g>";
      w.blanket.insertAdjacentHTML("afterend", ao);
      w.aoLong = w.svg.querySelector(".aoLong");
      var mu = '<g class="muLong" opacity="0">' +
        '<path d="' + longVien(102, 132, 26, 52, 5, 14) + '" fill="#7a5234" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="' + longVien(298, 132, 26, 52, 5, 14) + '" fill="#7a5234" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="' + longVien(200, 70, 104, 62, 7, 22, 92) + '" fill="#7a5234" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
        '<path d="' + longVien(200, 92, 112, 18, 6, 24) + '" fill="' + KEM + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        sk("M 150 40 q 6 -8 14 -4 M 236 36 q 6 -8 14 -4 M 196 24 q 6 -8 14 -4", 3, INK, ' opacity=".4"') + "</g>";
      w.aoLong.insertAdjacentHTML("afterend", mu);
      w.muLong = w.svg.querySelector(".muLong");
      w.tayAo = [];
      ["L", "R"].forEach(function (sd) {
        var arm = w["arm" + sd], d = sd === "L" ? "M 86 212 C 72 240 68 262 70 286" : "M 314 212 C 328 240 332 262 330 286";
        var g = document.createElementNS(svgNS, "g"); g.setAttribute("class", "tayAo"); g.setAttribute("opacity", "0");
        g.innerHTML = sk(d, 42, INK) + sk(d, 31, NAU) + '<ellipse cx="' + (sd === "L" ? 70 : 330) + '" cy="290" rx="24" ry="12" fill="' + KEM + '" stroke="' + INK + '" stroke-width="4"/>';
        arm.insertBefore(g, arm.children[1] || null);   // trên nét tay, dưới đồ cầm và bàn tay
        w.tayAo.push(g);
      });
    }
    function dungBaLo(w) {
      if (w.baLoPhong) return;
      var INK = C.INK;
      var s = '<g class="baLoPhong" opacity="0">' +
        '<g transform="translate(326 44) rotate(16)"><path d="M -10 6 L -18 -44 L -2 -30 L 10 -50 L 12 6 Z" fill="' + C.FISH1 + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        api.sk("M -8 -26 L -2 0 M 4 -32 L 4 0", 3, INK, ' opacity=".5"') + "</g>" +
        '<rect x="232" y="38" width="150" height="226" rx="58" fill="' + C.PACK + '" stroke="' + INK + '" stroke-width="7"/>' +
        api.sk("M 252 70 C 290 56 330 56 366 72", 4, INK, ' opacity=".45"') + api.sk("M 372 110 C 380 150 380 200 370 236", 4, INK, ' opacity=".35"') +
        '<rect x="340" y="132" width="34" height="70" rx="12" fill="' + C.PACK_DARK + '" stroke="' + INK + '" stroke-width="5"/></g>';
      w.pack.insertAdjacentHTML("afterbegin", s);
      w.baLoPhong = w.pack.querySelector(".baLoPhong");
    }
    var tpGoc = api.trangPhuc;
    api.trangPhuc = function (w, tp, t) {
      tpGoc(w, tp, t);
      var set = function (el, v) { if (!el) return; if (t == null) gsap.set(el, v); else tl.set(el, v, t); };
      if (tp.aoLong != null) { dungAoLong(w); set([w.aoLong].concat(w.tayAo), { opacity: tp.aoLong ? 1 : 0 }); }
      if (tp.muLong != null) { dungAoLong(w); set(w.muLong, { opacity: tp.muLong ? 1 : 0 }); }
      if (tp.miRu) { set([w.lashL, w.lashR], { scaleX: 1.4, scaleY: -0.65 }); set(w.lashIce, { opacity: 0 }); set(w.lashStroke, { stroke: C.INK }); }
      else if (tp.miRu === false && tp.mi == null) set([w.lashL, w.lashR], { scaleX: 1, scaleY: 1 });
      if (tp.baLoPhong != null) { dungBaLo(w); set(w.baLoPhong, { opacity: tp.baLoPhong ? 1 : 0 }); }
    };

    // Giọt mồ hôi: hiện ở (x, y) hệ 400×400 của Wob tại t, bay (vx px/s) và rơi `roi` px trong d giây rồi tan.
    // Dùng: chảy trên trán (vx 0, roi 60), văng khi gật đầu (vx ±160, roi 120).
    api.moHoi = function (w, t, o) {
      o = Object.assign({ x: 286, y: 112, vx: 0, roi: 70, d: 0.8, co: 1 }, o || {});
      w.extra.insertAdjacentHTML("beforeend", '<g transform="translate(' + o.x + " " + o.y + ') scale(' + o.co + ')"><g class="moHoi">' +
        '<path d="M 0 -15 C 6 -5 10 2 10 7 C 10 13 5 16 0 16 C -5 16 -10 13 -10 7 C -10 2 -6 -5 0 -15 Z" fill="' + C.ICE + '" stroke="' + C.INK + '" stroke-width="3.5"/>' +
        '<path d="M -4 4 C -4 8 -2 10 1 11" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/></g></g>');
      var el = w.extra.lastElementChild.firstElementChild;
      gsap.set(el, { opacity: 0, transformOrigin: "50% 50%" });
      tl.fromTo(el, { opacity: 0, scale: 0.3, x: 0, y: 0 }, { opacity: 1, scale: 1, duration: 0.1, ease: "back.out(2)", immediateRender: false }, t);
      tl.to(el, { x: o.vx * o.d, duration: o.d, ease: "power1.out" }, t + 0.1);
      tl.to(el, { y: o.roi, duration: o.d, ease: "power2.in" }, t + 0.1);
      tl.to(el, { opacity: 0, duration: 0.15, ease: "power1.in" }, t + 0.1 + o.d - 0.15);
      return el;
    };
    // Khăn bay: đuôi khăn phần phật trong gió (luồng khói, cơn gió) từ t, dài d, biên độ amp độ (dương = hất sang trái khung)
    api.khanBay = function (w, t, d, amp, buoc) {   // buoc: dãy hệ số biên độ (mặc định dao động tắt dần)
      if (!w.khanDuoi) {
        var g = document.createElementNS(svgNS, "g"), kids = Array.prototype.slice.call(w.scarf.children, 0, 3);
        w.scarf.insertBefore(g, kids[0]); kids.forEach(function (k) { g.appendChild(k); });
        w.khanDuoi = g; gsap.set(g, { smoothOrigin: false, svgOrigin: "142 276", rotation: 0 });
      }
      amp = amp == null ? 30 : amp;
      buoc = buoc || [1, -0.45, 0.8, -0.3, 0.5, -0.15, 0]; var n = buoc.length, dt = d / n;
      buoc.forEach(function (k, i) { tl.to(w.khanDuoi, { rotation: amp * k, skewX: -amp * 0.3 * k, svgOrigin: "142 276", duration: dt, ease: i ? "sine.inOut" : "power3.out" }, t + i * dt); });
    };
    // Máy ảnh nhỏ cầm tay (đặt vào w.holdR/holdL bằng api.holdPose/camDai): tâm ở (0, 0), ống kính hướng +x.
    // Lớp ".flashAnh" (ẩn) là chớp đèn: tween opacity khi bấm.
    api.mayAnhSVG = function () {
      var INK = C.INK;
      return '<g class="mayAnh"><rect x="-34" y="-22" width="68" height="44" rx="9" fill="#2f3a40" stroke="' + INK + '" stroke-width="5"/>' +
        '<rect x="-26" y="-31" width="18" height="10" rx="3" fill="#2f3a40" stroke="' + INK + '" stroke-width="4"/>' +
        '<rect x="14" y="-17" width="13" height="8" rx="2" fill="#e8f0f2" stroke="' + INK + '" stroke-width="3"/>' +
        '<circle cx="2" cy="3" r="15" fill="#6f8a96" stroke="' + INK + '" stroke-width="4"/><circle cx="2" cy="3" r="7" fill="' + INK + '"/><circle cx="5" cy="0" r="2.5" fill="#ffffff"/>' +
        '<g class="flashAnh" opacity="0"><path d="M 21 -13 L 34 -40 L 38 -18 L 62 -30 L 44 -10 L 70 -4 L 42 0 L 52 20 L 32 4 Z" fill="#fff6c8" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/></g></g>';
    };


    // Đèn pin cầm tay (thêm 21/11/2026; đặt vào w.holdL/holdR): tâm (0, 0), mặt kính hướng +x. Lớp ".denPin-sang" (ẩn) là
    // mặt kính phát sáng khi bật: tween opacity. Chùm sáng 3D: d3.chumDen.
    api.denPinSVG = function () {
      var INK = C.INK;
      return '<g class="denPin"><rect x="-40" y="-11" width="52" height="22" rx="6" fill="#3d4a52" stroke="' + INK + '" stroke-width="5"/>' +
        '<path d="M 10 -13 L 30 -20 L 30 20 L 10 13 Z" fill="#56656e" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect x="-24" y="-15" width="12" height="6" rx="2" fill="#C23B2A" stroke="' + INK + '" stroke-width="3"/>' +
        '<ellipse cx="31" cy="0" rx="5" ry="18" fill="#cfd8dc" stroke="' + INK + '" stroke-width="4"/>' +
        '<g class="denPin-sang" opacity="0"><ellipse cx="32" cy="0" rx="6" ry="17" fill="#fff6c8"/><ellipse cx="36" cy="0" rx="14" ry="26" fill="#fff2b0" opacity=".45"/></g></g>';
    };


    // ================================================================ api.ngoaiTroi
    api.ngoaiTroi = function (o) {
      var THREE = window.THREE;
      if (!THREE) { console.error("[dio-3d] chưa có window.THREE: khung thiếu <script type=\"module\" src=\"lib/dio-3d-nap.js\">"); return null; }
      if (api.d3) { console.error("[dio-3d] mỗi đoạn chỉ một cảnh ngoài trời (api.d3 đã có)"); return api.d3; }
      o = o || {};
      var preset = ANH_SANG[o.anhSang || "trua-dong"] || ANH_SANG["trua-dong"];
      var cfg = Object.assign({ suong: [14, 95], muc: 4.6, mucTan: [45, 120], fov: 34, vienToi: 0.35, nen: "tuyet", mua: "dong", seed: 7, kinhTat: 0, bong: { tam: [0, 0], rong: 35, sau: 20 } }, preset, o);
      var W = api.data.rong || 1920, H = api.data.cao || 1080, FPS = api.fps;   // hệ toạ độ thiết kế (CSS px)
      // Khung xuất (HOP-DONG mục 4b): sân khấu được phóng ×K bằng CSS transform, nên bộ đệm vẽ WebGL phải lớn ×K
      // (BW×BH = đúng cỡ MP4, ví dụ 2560×1440) để không bị kéo giãn mờ. K = 1 ở khung 1920×1080 (tập 1–3).
      var K = (api.data.xuat && +api.data.xuat.ti_le) || 1, BW = Math.round(W * K), BH = Math.round(H * K);
      var V3 = function (x, y, z) { return new THREE.Vector3(x, y, z); };
      var rngGoc = api.rng(cfg.seed);

      var d3 = (api.d3 = { THREE: THREE, cfg: cfg, wobs: [], bien: [] });
      d3.rng = function (seed) { return api.rng(seed); };

      // ---------------------------------------------------------------- renderer, sân khấu
      var stage = api.div("dio-ovl dio-3d", api.root, "z-index:1;");
      d3.stage = stage;
      var renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
      renderer.setPixelRatio(1); renderer.setSize(BW, BH, false);   // bộ đệm đúng BW×BH (không qua pixelRatio: floor(1920×4/3) có thể ra 2559)
      renderer.domElement.style.width = W + "px"; renderer.domElement.style.height = H + "px";
      renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.shadowMap.autoUpdate = false;
      renderer.toneMapping = THREE.NeutralToneMapping;
      stage.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block"; renderer.domElement.setAttribute("data-layout-allow-overflow", ""); // tranh toàn khung: có chủ ý
      d3.renderer = renderer;

      var scene = (d3.scene = new THREE.Scene());
      var HORIZON = new THREE.Color(cfg.chanTroi);
      scene.fog = new THREE.Fog(HORIZON, cfg.suong[0], cfg.suong[1]);
      var camera = (d3.camera3 = new THREE.PerspectiveCamera(cfg.fov, W / H, 0.1, 400));

      // ---------------------------------------------------------------- texture vẽ bằng Canvas2D (có seed)
      function canvasTex(w, h, draw, repeat) {
        var c = document.createElement("canvas"); c.width = w; c.height = h;
        draw(c.getContext("2d"), w, h);
        var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
        if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
        return t;
      }
      d3.canvasTex = canvasTex;
      var hex = function (c) { return "#" + c.getHexString(); };
      var logCache = {};
      function logTex(base, seed, mua) {
        var key = base + "|" + (seed % 3) + "|" + (mua || "dong");
        if (logCache[key]) return logCache[key];
        return (logCache[key] = canvasTex(512, 512, function (g, w, h) {
          var r = api.rng(seed * 31 + 7), n = 10, lh = h / n;
          for (var i = 0; i < n; i++) {
            var y = i * lh, tone = (r() - 0.5) * 18;
            var gr = g.createLinearGradient(0, y, 0, y + lh);
            gr.addColorStop(0, hex(new THREE.Color(base).offsetHSL(0, 0, tone / 255 + 0.06)));
            gr.addColorStop(1, hex(new THREE.Color(base).offsetHSL(0, 0, tone / 255 - 0.08)));
            g.fillStyle = gr; g.fillRect(0, y, w, lh);
            g.fillStyle = "rgba(25,15,8,0.55)"; g.fillRect(0, y + lh - 3, w, 3);               // khe giữa hai khúc gỗ
            for (var k = 0; k < 3; k++) {
              g.strokeStyle = "rgba(40,22,10,0.25)"; g.lineWidth = 1.5; g.beginPath();
              var yy = y + lh * (0.3 + 0.4 * r()); g.moveTo(0, yy); g.bezierCurveTo(w * 0.3, yy + 3, w * 0.6, yy - 3, w, yy + (r() - 0.5) * 4); g.stroke();
            }
            if (r() < 0.5) { g.fillStyle = "rgba(40,22,10,0.5)"; g.beginPath(); g.ellipse(r() * w, y + lh / 2, 6, 4, 0, 0, Math.PI * 2); g.fill(); }
          }
          // chân tường cũ, bẩn: vệt tối + tuyết bắn
          var gb = g.createLinearGradient(0, h * 0.78, 0, h); gb.addColorStop(0, "rgba(30,20,12,0)"); gb.addColorStop(1, "rgba(30,20,12,0.45)");
          g.fillStyle = gb; g.fillRect(0, h * 0.78, w, h * 0.22);
          if (mua === "he") {   // mùa hè: cỏ mọc sát chân tường thay cho tuyết bắn
            for (var s2 = 0; s2 < 160; s2++) { var gx = r() * w, gh = 10 + r() * 34; g.strokeStyle = "rgba(" + (70 + r() * 40 | 0) + "," + (110 + r() * 40 | 0) + ",40,0.9)"; g.lineWidth = 2 + r() * 2; g.beginPath(); g.moveTo(gx, h); g.quadraticCurveTo(gx + (r() - 0.5) * 10, h - gh * 0.6, gx + (r() - 0.5) * 16, h - gh); g.stroke(); }
          } else for (var s = 0; s < 120; s++) { g.fillStyle = "rgba(240,246,248," + (0.3 + r() * 0.5).toFixed(2) + ")"; g.beginPath(); g.ellipse(r() * w, h - r() * r() * 70, 3 + r() * 9, 2 + r() * 4, 0, 0, Math.PI * 2); g.fill(); }
        }));
      }
      var snowTex = canvasTex(1024, 1024, function (g, w, h) {
        var r = api.rng(11); g.fillStyle = "#eef2f4"; g.fillRect(0, 0, w, h);
        for (var i = 0; i < 260; i++) { g.fillStyle = "rgba(" + (170 + r() * 30 | 0) + "," + (195 + r() * 25 | 0) + "," + (215 + r() * 25 | 0) + "," + (0.06 + r() * 0.1).toFixed(3) + ")"; g.beginPath(); g.ellipse(r() * w, r() * h, 20 + r() * 90, 8 + r() * 30, r() * 3, 0, Math.PI * 2); g.fill(); }
        for (var j = 0; j < 1600; j++) { g.fillStyle = "rgba(255,255,255," + (0.3 + r() * 0.5).toFixed(2) + ")"; g.fillRect(r() * w, r() * h, 2, 2); }
      }, [40, 40]);
      var roadTex = canvasTex(1024, 256, function (g, w, h) {
        var r = api.rng(5); g.fillStyle = "#dfe4e6"; g.fillRect(0, 0, w, h);
        [0.3, 0.42, 0.6, 0.72].forEach(function (v) { g.fillStyle = "rgba(150,165,178,0.35)"; g.fillRect(0, v * h, w, 10 + r() * 6); });   // vệt bánh xe
        for (var i = 0; i < 900; i++) { g.fillStyle = "rgba(255,255,255," + (r() * 0.6).toFixed(2) + ")"; g.fillRect(r() * w, r() * h, 2, 2); }
      }, [12, 1]);
      var roofTex = canvasTex(256, 256, function (g, w, h) {
        var gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#ffffff"); gr.addColorStop(1, "#dbe6ee"); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      });
      // mùa hè (thêm 18/11/2026): cỏ xanh vàng, đường đất có vệt bánh xe, mái tôn gợn sóng (tô màu theo nhà)
      var grassTex = canvasTex(1024, 1024, function (g, w, h) {
        var r = api.rng(12); g.fillStyle = "#93ad5c"; g.fillRect(0, 0, w, h);
        for (var i = 0; i < 300; i++) { var k = r(); g.fillStyle = k < 0.5 ? "rgba(96,128,52," + (0.12 + r() * 0.16).toFixed(3) + ")" : "rgba(198,190,104," + (0.1 + r() * 0.14).toFixed(3) + ")"; g.beginPath(); g.ellipse(r() * w, r() * h, 20 + r() * 90, 8 + r() * 30, r() * 3, 0, Math.PI * 2); g.fill(); }
        for (var j = 0; j < 2600; j++) { var x = r() * w, y = r() * h; g.strokeStyle = r() < 0.5 ? "rgba(70,100,40,0.45)" : "rgba(190,205,120,0.45)"; g.lineWidth = 1.5; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 4, y - 5 - r() * 6); g.stroke(); }
      }, [40, 40]);
      var dirtTex = canvasTex(1024, 256, function (g, w, h) {
        var r = api.rng(6); g.fillStyle = "#b8a07a"; g.fillRect(0, 0, w, h);
        [0.3, 0.42, 0.6, 0.72].forEach(function (v) { g.fillStyle = "rgba(120,96,66,0.35)"; g.fillRect(0, v * h, w, 10 + r() * 6); });
        for (var i = 0; i < 1400; i++) { g.fillStyle = r() < 0.5 ? "rgba(90,74,52," + (r() * 0.5).toFixed(2) + ")" : "rgba(235,220,190," + (r() * 0.5).toFixed(2) + ")"; g.fillRect(r() * w, r() * h, 3, 3); }
        g.fillStyle = "rgba(110,150,60,0.6)"; for (var e = 0; e < w; e += 6) { g.fillRect(e, 0, 4, 6 + r() * 14); g.fillRect(e, h - 6 - r() * 14, 4, 20); }
      }, [12, 1]);
      var tonTex = canvasTex(256, 256, function (g, w, h) {
        g.fillStyle = "#e8e8e8"; g.fillRect(0, 0, w, h);
        for (var x = 0; x < w; x += 16) { var gr = g.createLinearGradient(x, 0, x + 16, 0); gr.addColorStop(0, "#ffffff"); gr.addColorStop(0.5, "#cfcfcf"); gr.addColorStop(1, "#f4f4f4"); g.fillStyle = gr; g.fillRect(x, 0, 16, h); }
      });
      var softTex = function (inner, outer) {
        return canvasTex(256, 256, function (g, w, h) {
          var gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); gr.addColorStop(0, inner); gr.addColorStop(1, outer); g.fillStyle = gr; g.fillRect(0, 0, w, h);
        });
      };
      d3.softTex = softTex;

      // ---------------------------------------------------------------- vật liệu tô 3 bậc
      var ramp = (function () { var t = new THREE.DataTexture(new Uint8Array([90, 170, 255]), 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
      var toon = (d3.vatLieu = function (opts) { if (typeof opts === "string") opts = { color: opts }; return new THREE.MeshToonMaterial(Object.assign({ gradientMap: ramp }, opts)); });
      function boc(m, nhan, doBong) { m.castShadow = doBong !== false; m.receiveShadow = nhan !== false; return m; }
      d3.them = function (obj, o2) {
        o2 = o2 || {};
        obj.traverse(function (m) { if (m.isMesh) { m.castShadow = o2.doBong !== false; m.receiveShadow = o2.nhanBong !== false; } });
        scene.add(obj); return obj;
      };

      // ---------------------------------------------------------------- mùa (thêm 18/11/2026): một thế giới, hai bộ vật liệu
      // matMua(dong, he): vật liệu tô 3 bậc đổi map/màu theo mùa · chiMua(obj, "dong"|"he"): vật chỉ có ở một mùa.
      // d3.doiMua(t, "he", {anhSang}) cắt cứng đổi mùa ở t (thẻ cat-cung-doi-mua): cùng bố cục, cùng góc máy.
      var MUA_REG = [], DOI_MUA = [], muaDaAp = "dong";
      function matMua(dong, he) { var m = toon(dong); MUA_REG.push({ m: m, dong: dong, he: he || dong }); return m; }
      function chiMua(obj, mua) { if (mua === "ca" || !mua) return obj; MUA_REG.push({ o: obj, chi: mua }); obj.visible = mua === "dong"; return obj; }
      d3.matMua = matMua; d3.chiMua = chiMua;
      function muaLuc(t) { var m = cfg.mua; DOI_MUA.forEach(function (d) { if (t >= d.t) m = d.mua; }); return m; }
      d3.muaLuc = muaLuc;
      function apMua(mua) {
        if (mua === muaDaAp) return;
        MUA_REG.forEach(function (r) {
          if (r.o) { r.o.visible = r.chi === mua; return; }
          var v = r[mua] || r.dong, coMap = !!r.m.map;
          r.m.map = v.map || null; r.m.color.set(v.color || "#ffffff");
          if (coMap !== !!r.m.map) r.m.needsUpdate = true;
        });
        muaDaAp = mua;
      }
      d3.doiMua = function (t, mua, o3) {
        DOI_MUA.push({ t: t, mua: mua }); DOI_MUA.sort(function (a, b) { return a.t - b.t; });
        if (o3 && o3.anhSang) d3.anhSang(t, t, o3.anhSang);
      };

      // ---------------------------------------------------------------- trời, ánh sáng
      var sky = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), new THREE.ShaderMaterial({
        side: THREE.BackSide, depthWrite: false, fog: false,
        uniforms: { top: { value: new THREE.Color(cfg.troiDinh) }, hor: { value: HORIZON } },
        vertexShader: "varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",
        fragmentShader: "uniform vec3 top; uniform vec3 hor; varying vec3 vP; void main(){ float h = clamp(normalize(vP).y * 2.2, 0., 1.); gl_FragColor = vec4(mix(hor, top, pow(h, .7)), 1.); }"
      }));
      sky.layers.set(L_KHONG_MUC); scene.add(sky);
      var hemi = new THREE.HemisphereLight(cfg.troiSang.tren, cfg.troiSang.duoi, cfg.troiSang.manh);
      scene.add(hemi);
      var sun = new THREE.DirectionalLight(cfg.nang.mau, cfg.nang.manh);
      var bt = cfg.bong.tam, hu = cfg.nang.huong;
      sun.position.set(bt[0] + hu[0], hu[1], bt[1] + hu[2]); sun.target.position.set(bt[0], 0, bt[1]);
      sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
      Object.assign(sun.shadow.camera, { left: -cfg.bong.rong, right: cfg.bong.rong, top: cfg.bong.sau, bottom: -cfg.bong.sau, near: 1, far: 140 });
      sun.shadow.bias = -0.0008; sun.shadow.normalBias = 0.03;
      sun.shadow.camera.layers.enableAll();                     // tấm Wob (lớp không viền) vẫn đổ bóng
      scene.add(sun, sun.target);
      d3.nang = sun;

      // Ánh sáng đổi theo nhịp (thẻ dong-ho-troi, ngữ pháp mục 6): d3.anhSang(t0, t1, ten, muc) chuyển dần (smootherstep) từ ánh
      // sáng hiện tại sang bộ `ten` (muc 0..1: đi bao xa, mặc định 1); t0 = t1: đổi ngay. Cửa sổ dùng chung một vật liệu sáng.
      var KINH = new THREE.Color("#4d6a80"), DEN_CUA = new THREE.Color(C.WIN);
      var glowMat = new THREE.MeshBasicMaterial({ color: DEN_CUA.clone().multiplyScalar(cfg.cuaSo) });
      d3.denCuaSo = glowMat;
      function chuanAS(P) {
        var col = function (v) { return new THREE.Color(v); };
        return { troiDinh: col(P.troiDinh), chanTroi: col(P.chanTroi), huong: V3(P.nang.huong[0], P.nang.huong[1], P.nang.huong[2]), nangMau: col(P.nang.mau),
          nangManh: P.nang.manh, tren: col(P.troiSang.tren), duoi: col(P.troiSang.duoi), troiManh: P.troiSang.manh, cuaSo: P.cuaSo, kinhTat: P.kinhTat || 0 };
      }
      function lerpAS(a, b, p) {
        return { troiDinh: a.troiDinh.clone().lerp(b.troiDinh, p), chanTroi: a.chanTroi.clone().lerp(b.chanTroi, p), huong: a.huong.clone().lerp(b.huong, p),
          nangMau: a.nangMau.clone().lerp(b.nangMau, p), nangManh: lerp(a.nangManh, b.nangManh, p), tren: a.tren.clone().lerp(b.tren, p), duoi: a.duoi.clone().lerp(b.duoi, p),
          troiManh: lerp(a.troiManh, b.troiManh, p), cuaSo: lerp(a.cuaSo, b.cuaSo, p), kinhTat: lerp(a.kinhTat, b.kinhTat, p) };
      }
      var AS_GOC = chuanAS(cfg), AS_KEYS = [];
      d3.anhSang = function (t0, t1, ten, muc) {
        if (!ANH_SANG[ten]) { console.error("[dio-3d] không có bộ ánh sáng: " + ten); return; }
        AS_KEYS.push({ t0: t0, t1: Math.max(t0, t1), P: chuanAS(ANH_SANG[ten]), muc: muc == null ? 1 : muc });
        AS_KEYS.sort(function (a, b) { return a.t0 - b.t0; });
      };
      function asLuc(t) {
        var cur = AS_GOC;
        AS_KEYS.forEach(function (k) {
          if (t < k.t0) return;
          var p = k.t1 > k.t0 ? smoother((t - k.t0) / (k.t1 - k.t0)) : 1;
          cur = lerpAS(cur, k.P, p * k.muc);
        });
        return cur;
      }
      function apAnhSang(P) {
        sky.material.uniforms.top.value.copy(P.troiDinh); HORIZON.copy(P.chanTroi);
        hemi.color.copy(P.tren); hemi.groundColor.copy(P.duoi); hemi.intensity = P.troiManh;
        sun.color.copy(P.nangMau); sun.intensity = P.nangManh; sun.position.set(bt[0] + P.huong.x, P.huong.y, bt[1] + P.huong.z);
        glowMat.color.copy(KINH).lerp(DEN_CUA.clone().multiplyScalar(P.cuaSo), 1 - P.kinhTat);
      }

      // ---------------------------------------------------------------- mặt đất
      var ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), cfg.nen === "tuyet" ? matMua({ map: snowTex }, { map: grassTex }) : toon({ color: cfg.nen }));
      ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

      // ================================================================ dựng cảnh từ tham số
      // Đường: tâm (x, z), dài theo trục x, rộng theo z, xoay yaw (rad)
      d3.duong = function (p) {
        p = Object.assign({ x: 0, z: 0, dai: 120, rong: 5, yaw: 0 }, p || {});
        var m = new THREE.Mesh(new THREE.PlaneGeometry(p.dai, p.rong), matMua({ map: roadTex }, { map: dirtTex }));
        m.rotation.set(-Math.PI / 2, 0, p.yaw); m.position.set(p.x, 0.01, p.z); m.receiveShadow = true; scene.add(m);
        return m;
      };

      // Cột khói liền một khối: các cục cầu chồng nhau, viền mực chung (lớp khói chỉ có viền ngoài), bốc theo t.
      // o: cao, r0, no (độ nở), troi (trôi ngang theo +x), n, per (giây một vòng), mau, seed, t0/t1 (bật/tắt, mờ trong 0,5 s)
      var KHOI_GEO = new THREE.IcosahedronGeometry(1, 2);
      var FNS = [];   // hàm chạy mỗi khung trước khi chụp (nội bộ trước, của canh.js sau)
      d3.khoi = function (x, y, z, p) {
        // thêm 18/11/2026: huong [x, z] (hướng trôi, mặc định +x), cum k (khói phụt thành k cụm mỗi vòng: ống xả),
        // mua "dong" (mặc định: mùa hè ống khói không bốc) | "he" | "ca"
        p = Object.assign({ cao: 9, r0: 0.32, no: 2.4, troi: 1.2, n: 18, per: 7, mau: "#f4f7f8", seed: 5, t0: null, t1: null, huong: [1, 0], cum: 0, mua: "dong" }, p || {});
        var hl = Math.hypot(p.huong[0], p.huong[1]) || 1, hx = p.huong[0] / hl, hz = p.huong[1] / hl;
        var r = api.rng(p.seed), mat = toon({ color: p.mau }), puffs = [];
        for (var i = 0; i < p.n; i++) {
          var m = new THREE.Mesh(KHOI_GEO, mat); m.layers.set(L_KHOI); m.castShadow = false; m.receiveShadow = false; scene.add(m);
          puffs.push({ m: m, j: 0.85 + 0.3 * r(), ph: r() });
        }
        var nCum = p.cum > 0 ? Math.max(1, Math.round(p.n / p.cum)) : 0;
        FNS.unshift(function (t) {
          var vis = 1;
          if (p.t0 != null) vis = Math.min(vis, Math.max(0, (t - p.t0) / 0.5));
          if (p.t1 != null) vis = Math.min(vis, Math.max(0, (p.t1 - t) / 0.5));
          if (p.mua !== "ca" && muaLuc(t) !== p.mua) vis = 0;
          for (var i = 0; i < puffs.length; i++) {
            var q = puffs[i], pha = nCum ? Math.floor(i / nCum) / p.cum + (i % nCum) * 0.018 : i / p.n;
            var u = frac(t / p.per + pha + q.ph * 0.02), rise = 1 - Math.pow(1 - u, 1.25);
            var s = p.r0 * q.j * (1 + p.no * u) * Math.min(1, u / 0.06) * (u > 0.7 ? (1 - u) / 0.3 : 1) * vis;
            q.m.visible = s > 0.005;
            var lac = p.r0 * 0.8 * Math.sin(2 * Math.PI * (u * 1.1 + q.ph)) * (0.3 + u), lac2 = p.r0 * 0.5 * Math.cos(2 * Math.PI * (u * 0.9 + q.ph));
            q.m.position.set(x + hx * p.troi * rise + lac, y + p.cao * rise, z + hz * p.troi * rise + lac2);
            q.m.scale.setScalar(Math.max(0.001, s));
          }
        });
        return puffs;
      };

      // Nhà gỗ khúc mái phủ tuyết. Mặt tiền (cửa sổ, cửa) quay về +z cục bộ; yaw = Math.PI cho dãy nhà bên kia đường.
      // p: w, d, h, yaw, go (màu gỗ), khung (màu khung cửa sổ), cuaSo (số cửa sổ mặt tiền), cua (true), dongTuyet (true),
      //    khoi (true | false | {tham số d3.khoi}), seed; mai (màu mái tôn mùa hè), loiCua (dời đống tuyết khỏi lối cửa)
      //    → g.userData: ongKhoi, khoi, cua (nhóm bản lề: tween rotation.y âm để mở), cuaX
      var GO = ["#8a5a34", "#7a4e2c", "#946640", "#6f4a2e"];
      d3.nha = function (x, z, p) {
        p = Object.assign({ w: 7, d: 6, h: 3.1, yaw: 0, go: null, khung: C.TEAL, cuaSo: 2, cua: true, dongTuyet: true, khoi: true, seed: 1 }, p || {});
        var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = p.yaw;
        var goMau = p.go || GO[p.seed % GO.length];
        var w = p.w, d = p.d, h = p.h, wallMat = matMua({ map: logTex(goMau, p.seed) }, { map: logTex(goMau, p.seed, "he") });
        var body = boc(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat)); body.position.y = h / 2; g.add(body);
        // mái hai mái: hai đầu hồi gỗ, hai mái tuyết
        var rh = h * 0.55, sh = new THREE.Shape([new THREE.Vector2(-w / 2 - 0.5, 0), new THREE.Vector2(w / 2 + 0.5, 0), new THREE.Vector2(0, rh)]);
        var MAI_HE = ["#5f7f74", "#8a4a3c", "#5b6f8a", "#7a7f84"];   // mái tôn sơn mùa hè (mùa đông phủ tuyết)
        var roof = boc(new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: d + 0.8, bevelEnabled: false }), [wallMat, matMua({ map: roofTex }, { map: tonTex, color: p.mai || MAI_HE[p.seed % MAI_HE.length] })]));
        roof.position.set(0, h, -d / 2 - 0.4); g.add(roof);
        var eave = boc(new THREE.Mesh(new THREE.BoxGeometry(w + 1.0, 0.1, d + 0.8), toon({ color: "#5a3a22" })), true, true);
        eave.position.set(0, h + 0.02, 0); g.add(eave);
        // cửa sổ sáng ấm, khung sơn
        var glow = glowMat, frame = toon({ color: p.khung }), sillMat = matMua({ map: roofTex }, { color: "#6b4a2e" });
        var nWin = Math.max(0, p.cuaSo | 0), cuaX = p.cua ? (nWin % 2 ? w * 0.36 : 0) : null;
        for (var i = 0; i < nWin; i++) {
          var wx = nWin === 1 ? -w * 0.22 : lerp(-w * 0.32, w * 0.32, i / (nWin - 1));
          if (cuaX !== null && Math.abs(wx - cuaX) < 1.0) wx += wx < cuaX ? -0.6 : 0.6;
          var fr = boc(new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.25, 0.14), frame)); fr.position.set(wx, h * 0.55, d / 2 + 0.03); g.add(fr);
          var gl = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.9), glow); gl.position.set(wx, h * 0.55, d / 2 + 0.11); g.add(gl);
          var bar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 0.04), frame); bar.position.set(wx, h * 0.55, d / 2 + 0.13); g.add(bar);
          var sill = boc(new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.12, 0.3), sillMat)); sill.position.set(wx, h * 0.55 - 0.68, d / 2 + 0.12); g.add(sill);
        }
        if (cuaX !== null) {
          // cửa có bản lề (g.userData.cua: nhóm quay quanh trục đứng; rotation.y âm = mở ra ngoài) + ô cửa sáng ấm phía sau
          var banLe = new THREE.Group(); banLe.position.set(cuaX - 0.5, 0, d / 2 + 0.04); g.add(banLe);
          var door = boc(new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.9, 0.12), toon({ color: "#4a3122" }))); door.position.set(0.5, 0.95, 0); banLe.add(door);
          var oCua = new THREE.Mesh(new THREE.PlaneGeometry(0.96, 1.86), new THREE.MeshBasicMaterial({ color: new THREE.Color(C.WIN).multiplyScalar(0.9) }));
          oCua.position.set(cuaX, 0.94, d / 2 + 0.005); g.add(oCua);
          g.userData.cua = banLe; g.userData.cuaX = cuaX;
        }
        var ch = boc(new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.6), toon({ color: "#7d4a26" }))); ch.position.set(w * 0.22, h + rh * 0.6, 0); g.add(ch);
        if (p.dongTuyet) {
          var r = api.rng(p.seed * 13 + 1), snowMat = toon({ map: snowTex });
          for (var k = 0; k < 3; k++) {
            var dr = boc(new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8), snowMat), true, false);
            dr.scale.set(w * (0.18 + 0.1 * r()), 0.32 + 0.2 * r(), 0.55); dr.position.set(lerp(-w * 0.4, w * 0.4, k / 2) + (r() - 0.5), 0, d / 2 + 0.15); g.add(chiMua(dr, "dong"));
            if (p.loiCua && cuaX !== null && Math.abs(dr.position.x - cuaX) < 0.9 + dr.scale.x * 0.5) dr.position.x += dr.position.x < cuaX ? -1.0 : 1.0;   // chừa lối cửa
          }
        }
        scene.add(g);
        g.updateMatrixWorld(true);
        var top = V3(w * 0.22, h + rh * 0.6 + 0.8, 0).applyMatrix4(g.matrixWorld);
        g.userData.ongKhoi = top;
        if (p.khoi) g.userData.khoi = d3.khoi(top.x, top.y, top.z, Object.assign({ seed: p.seed + 3 }, p.khoi === true ? {} : p.khoi));
        return g;
      };
      // Dãy nhà dọc trục x từ x0 tới x1 ở hàng z. p: khoang [min, max] (khe giữa hai nhà), w, h ([min, max]), d, yaw, lech (lệch z), seed, + tham số d3.nha
      d3.dayNha = function (p) {
        p = Object.assign({ x0: -30, x1: 30, z: -11, khoang: [2.5, 4.5], w: [6, 8], h: [2.8, 3.4], d: 6, yaw: 0, lech: 0.8, seed: 1 }, p || {});
        var r = api.rng(p.seed), x = p.x0, out = [], i = 0;
        while (x < p.x1) {
          var w = lerp(p.w[0], p.w[1], r()), extra = Object.assign({}, p);
          ["x0", "x1", "z", "khoang", "lech", "khoiTiLe"].forEach(function (k) { delete extra[k]; });
          extra.w = w; extra.h = lerp(p.h[0], p.h[1], r()); extra.yaw = p.yaw + (r() - 0.5) * 0.12; extra.seed = p.seed * 10 + i;
          if (p.khoiTiLe != null && r() > p.khoiTiLe) extra.khoi = false;   // chỉ một phần số nhà có khói
          out.push(d3.nha(x + w / 2, p.z + (r() - 0.5) * p.lech, extra));
          x += w + lerp(p.khoang[0], p.khoang[1], r()); i++;
        }
        return out;
      };
      // Làng nhỏ nhìn từ xa (thêm 18/11/2026): các dãy nhà trong hình elip tâm (x, z), bán trục rx (dọc x), rz (dọc z),
      // dãy cách nhau `hang` m, dãy chẵn quay mặt +z, dãy lẻ quay −z (hai bên một con phố). khoiTiLe: tỉ lệ nhà có khói.
      // Các tham số khác đi thẳng vào d3.dayNha / d3.nha. → mảng nhà
      d3.lang = function (p) {
        p = Object.assign({ x: 0, z: -90, rx: 32, rz: 22, hang: 12, seed: 31, khoiTiLe: 0.75, khoang: [3, 7], w: [5.5, 7.5], cuaSo: 2 }, p || {});
        var out = [], n = Math.floor(p.rz * 2 / p.hang);
        for (var i = 0; i <= n; i++) {
          var zi = p.z - p.rz + i * p.hang + (n ? (p.rz * 2 - n * p.hang) / 2 : p.rz), q = (zi - p.z) / p.rz, hw = p.rx * Math.sqrt(Math.max(0, 1 - q * q));
          if (hw < 5) continue;
          var o3 = Object.assign({}, p, { x0: p.x - hw, x1: p.x + hw, z: zi, yaw: i % 2 ? Math.PI : 0, seed: p.seed * 7 + i });
          ["x", "rx", "rz", "hang"].forEach(function (k) { delete o3[k]; });
          out = out.concat(d3.dayNha(o3));
        }
        return out;
      };

      // Cột điện + dây võng. xs: các x; p: z, cao, xa (true: tắt bóng để rẻ)
      d3.cotDien = function (xs, p) {
        p = Object.assign({ z: -4, cao: 8, vong: 0.9 }, p || {});
        var mat = toon({ color: "#5e3a1c" }), wire = toon({ color: "#222222" });
        xs.forEach(function (x) {
          var c = boc(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, p.cao, 8), mat)); c.position.set(x, p.cao / 2, p.z); scene.add(c);
          var b = boc(new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.14, 0.14), mat)); b.position.set(x, p.cao - 0.6, p.z); scene.add(b);
        });
        for (var i = 0; i < xs.length - 1; i++) [-0.8, 0.8].forEach(function (dx) {
          var a = V3(xs[i] + dx, p.cao - 0.5, p.z), b = V3(xs[i + 1] + dx, p.cao - 0.5, p.z), mid = a.clone().lerp(b, 0.5); mid.y -= p.vong;
          scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a, mid, b), 20, 0.025, 4), wire));
        });
      };
      // Hàng rào gỗ (tiền cảnh): n cọc từ x0 theo +x, ở z
      d3.hangRao = function (x0, z, n, p) {
        p = Object.assign({ buoc: 0.75, cao: 1.3, mau: "#8e5527", yaw: 0 }, p || {});
        var g = new THREE.Group(), mat = toon({ color: p.mau });
        for (var i = 0; i < n; i++) { var f = boc(new THREE.Mesh(new THREE.BoxGeometry(0.16, p.cao + (i % 3) * 0.08, 0.16), mat)); f.position.set(i * p.buoc, (p.cao + (i % 3) * 0.08) / 2, 0); g.add(f); }
        [0.35, 0.77].forEach(function (k) { var r = boc(new THREE.Mesh(new THREE.BoxGeometry((n - 1) * p.buoc + 0.4, 0.1, 0.1), mat)); r.position.set((n - 1) * p.buoc / 2, p.cao * k, 0.05); g.add(r); });
        g.position.set(x0, 0, z); g.rotation.y = p.yaw; scene.add(g); return g;
      };
      // Núi, đồi xa: [{x, z, r, cao, loai: "doi" | "nui", tuyet}] – xa thì sương làm nhạt
      d3.nui = function (ds) {
        ds.forEach(function (q) {
          if (q.loai === "nui") {
            var m = new THREE.Mesh(new THREE.ConeGeometry(q.r, q.cao, 7), matMua({ color: q.mau || "#a9b8c4" }, { color: q.mauHe || "#6f8a68" })); m.position.set(q.x, q.cao / 2 - 0.5, q.z); m.rotation.y = q.x * 0.37; scene.add(m);
            if (q.tuyet !== false) { var s = new THREE.Mesh(new THREE.ConeGeometry(q.r * 0.42, q.cao * 0.42, 7), toon({ color: "#f3f6f8" })); s.position.set(q.x, q.cao * 0.79 - 0.5, q.z); s.rotation.y = m.rotation.y; scene.add(q.tuyetHe ? s : chiMua(s, "dong")); }
          } else {
            var d = new THREE.Mesh(new THREE.SphereGeometry(q.r, 24, 12), matMua({ color: q.mau || "#e9eef2" }, { color: q.mauHe || "#9fb06e" })); d.scale.y = (q.cao || q.r * 0.35) / q.r; d.position.set(q.x, -3, q.z); scene.add(d);
          }
        });
      };
      // Cây: loai "thong" (tán nón, phủ tuyết) | "tran" (thông rụng lá mùa đông: thân + cành trơ). p: cao, seed
      d3.cay = function (x, z, p) {
        p = Object.assign({ cao: 6, loai: "thong", seed: 1 }, p || {});
        var g = new THREE.Group(), r = api.rng(p.seed * 7 + 3), bark = toon({ color: "#4a3426" });
        if (p.loai === "tran") {
          var than = boc(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.14, p.cao, 6), bark)); than.position.y = p.cao / 2; g.add(than);
          for (var i = 0; i < 9; i++) {
            var y = p.cao * (0.3 + 0.65 * i / 9), len = p.cao * 0.22 * (1 - i / 11), a = r() * Math.PI * 2;
            var b = boc(new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.04, len, 4), bark)); b.geometry.translate(0, len / 2, 0);
            b.position.set(0, y, 0); b.rotation.set(0, a, 1.0 + r() * 0.3); g.add(b);
          }
          // mùa hè: thông rụng lá (larch) ra lá kim xanh non, tán nón thưa
          var laHe = toon({ color: "#86a957" });
          for (var lk = 0; lk < 3; lk++) {
            var lh = p.cao * (0.42 - lk * 0.09), lr = p.cao * (0.17 - lk * 0.04), ly = p.cao * (0.3 + lk * 0.22);
            var lc = boc(new THREE.Mesh(new THREE.ConeGeometry(lr, lh, 7), laHe)); lc.position.y = ly + lh / 2; g.add(chiMua(lc, "he"));
          }
        } else {
          var goc = boc(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, p.cao * 0.3, 6), bark)); goc.position.y = p.cao * 0.15; g.add(goc);
          var leaf = toon({ color: "#3f5348" }), snow = toon({ color: "#eef3f5" });
          for (var k = 0; k < 3; k++) {
            var hh = p.cao * (0.45 - k * 0.08), rr = p.cao * (0.24 - k * 0.055), yy = p.cao * (0.22 + k * 0.24);
            var c = boc(new THREE.Mesh(new THREE.ConeGeometry(rr, hh, 8), leaf)); c.position.y = yy + hh / 2; g.add(c);
            var s = boc(new THREE.Mesh(new THREE.ConeGeometry(rr * 0.55, hh * 0.45, 8), snow)); s.position.y = yy + hh * 0.78; g.add(chiMua(s, "dong"));
          }
        }
        g.position.set(x, 0, z); g.rotation.y = r() * 6.28; scene.add(g); return g;
      };
      // Rừng: rải n cây trong hình chữ nhật [x0, x1] × [z0, z1]
      d3.rungCay = function (p) {
        p = Object.assign({ x0: -60, x1: 60, z0: -60, z1: -40, n: 40, cao: [5, 8], loai: "thong", seed: 9 }, p || {});
        var r = api.rng(p.seed), out = [];
        for (var i = 0; i < p.n; i++) out.push(d3.cay(lerp(p.x0, p.x1, r()), lerp(p.z0, p.z1, r()), { cao: lerp(p.cao[0], p.cao[1], r()), loai: p.loai, seed: p.seed * 100 + i }));
        return out;
      };
      // Đống tuyết (tiền cảnh, ven đường)
      d3.dongTuyet = function (x, z, p) {
        p = Object.assign({ r: 1.5, cao: 0.5, dai: 1.4 }, p || {});
        var m = boc(new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), toon({ map: snowTex })), true, false);
        m.scale.set(p.r * p.dai, p.cao, p.r); m.position.set(x, 0, z); scene.add(chiMua(m, "dong")); return m;
      };

      // ================================================================ đồ thêm 18/11/2026 (tập 1: d07, d21, d23, d30)
      // Kính ô tô: trong ở giữa, sương giá bám mép
      var kinhTex = canvasTex(256, 128, function (g, w, h) {
        g.fillStyle = "rgba(170,200,220,0.22)"; g.fillRect(0, 0, w, h);
        var r = api.rng(8);
        for (var i = 0; i < 260; i++) {
          var mx = r() < 0.5 ? r() * 40 : w - r() * 40, my = r() * h; if (r() < 0.5) { mx = r() * w; my = r() < 0.5 ? r() * 22 : h - r() * 22; }
          g.fillStyle = "rgba(236,246,252," + (0.25 + r() * 0.45).toFixed(2) + ")"; g.beginPath(); g.ellipse(mx, my, 4 + r() * 12, 3 + r() * 7, r() * 3, 0, Math.PI * 2); g.fill();
        }
      });
      // Xe hộp nhỏ (dạng chung, không nhãn hiệu). Mũi xe nhìn +x cục bộ; ghế lái ở bên trái xe (−z cục bộ): yaw = Math.PI thì
      // mũi xe nhìn −x, ghế lái quay về +z (phía camera mặc định). p: yaw, mau, noMay (rung + khói xả phụt từng cụm), den (đèn pha),
      // tuyet (tuyết trên nóc, chỉ mùa đông), khoi {tham số d3.khoi cho ống xả}, denTrong (đèn trần bật: ghế trống đọc rõ qua kính
      // trong cảnh tối), seed.
      // → xe {g, than, rung(t0, d, amp), diem(ten): "ongXa" | "mui" | "cuaLai" | "nap" | "ghe" → Vector3 thế giới}
      d3.xe = function (x, z, p) {
        p = Object.assign({ yaw: 0, mau: "#7c8f6a", noMay: true, den: true, tuyet: true, denTrong: false, khoi: {}, seed: 3 }, p || {});
        var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = p.yaw; scene.add(g);
        var than = new THREE.Group(); g.add(than);
        var son = toon({ color: p.mau }), toi = toon({ color: "#2a2d30" }), crom = toon({ color: "#b9bfc4" }), ghe = toon({ color: "#b0543c", emissive: p.denTrong ? "#7a3422" : "#000000" });
        var hop = function (w, h, d, mat, x0, y0, z0, cha) { var m = boc(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)); m.position.set(x0, y0, z0); (cha || than).add(m); return m; };
        hop(3.6, 0.5, 1.6, son, 0, 0.49, 0);                                   // thân dưới: nắp capo và cốp ngang bậu kính (0,74 m)
        hop(2.05, 0.08, 1.46, son, -0.1, 1.3, 0);                              // nóc
        [0.9, -0.1, -1.1].forEach(function (cx) { [-0.7, 0.7].forEach(function (cz) { hop(0.08, 0.56, 0.08, son, cx, 1.02, cz); }); });
        // kính (trong, sương bám mép)
        var kinh = new THREE.MeshLambertMaterial({ map: kinhTex, transparent: true, depthWrite: false, side: THREE.DoubleSide });
        [[0.4, 0.72], [-0.6, 0.72], [0.4, -0.72], [-0.6, -0.72]].forEach(function (q) { var m = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.5), kinh); m.position.set(q[0], 1.02, q[1]); than.add(m); });
        [0.92, -1.12].forEach(function (cx) { var m = new THREE.Mesh(new THREE.PlaneGeometry(1.36, 0.5), kinh); m.rotation.y = Math.PI / 2; m.position.set(cx, 1.02, 0); than.add(m); });
        // trong xe: hai ghế trống, vô lăng, bảng đồng hồ
        [-0.36, 0.36].forEach(function (cz) {
          hop(0.46, 0.1, 0.48, ghe, 0.28, 0.8, cz);                          // ghế giữa ô kính trước
          var lung = hop(0.1, 0.52, 0.46, ghe, 0.04, 1.05, cz); lung.rotation.z = 0.16;
          hop(0.08, 0.13, 0.28, ghe, -0.02, 1.36, cz).rotation.z = 0.16;   // gối đầu
        });
        if (p.denTrong) {
          var den = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.0), new THREE.MeshBasicMaterial({ map: softTex("rgba(255,214,150,0.55)", "rgba(255,214,150,0)"), transparent: true, depthWrite: false }));
          den.position.set(0.2, 1.1, 0); den.rotation.x = -Math.PI / 2 + 0.3; den.layers.set(L_KHONG_MUC); than.add(den);
          var bd = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.08), new THREE.MeshBasicMaterial({ color: "#ffe8b0" })); bd.position.set(0.0, 1.25, 0); than.add(bd);
        }
        var vl = boc(new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.025, 6, 18), toi)); vl.position.set(0.66, 0.98, -0.36); vl.rotation.set(0, Math.PI / 2, 0); vl.rotateX(-0.45); than.add(vl);
        hop(0.26, 0.14, 1.4, toi, 0.78, 0.84, 0);
        // mặt trước, sau
        hop(0.12, 0.14, 1.66, toi, 1.82, 0.32, 0); hop(0.12, 0.14, 1.66, toi, -1.82, 0.32, 0);
        hop(0.04, 0.2, 0.7, toi, 1.81, 0.56, 0);
        var denMat = new THREE.MeshBasicMaterial({ color: p.den ? "#ffe6a0" : "#c9c2a8" }), sauMat = new THREE.MeshBasicMaterial({ color: "#c8402e" });
        [-0.55, 0.55].forEach(function (cz) {
          var d = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 16), denMat); d.rotation.z = Math.PI / 2; d.position.set(1.81, 0.57, cz); than.add(d);
          var sau = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.16), sauMat); sau.position.set(-1.81, 0.6, cz * 1.1); than.add(sau);
        });
        // khe cửa, tay nắm (đọc được dáng xe), gương
        [-0.81, 0.81].forEach(function (cz) {
          [0.92, -0.1].forEach(function (cx) { hop(0.025, 0.46, 0.012, toi, cx, 0.5, cz); });
          hop(0.14, 0.03, 0.03, crom, 0.6, 0.66, cz * 1.005); hop(0.14, 0.03, 0.03, crom, -0.4, 0.66, cz * 1.005);
          hop(0.06, 0.1, 0.14, son, 0.95, 0.86, cz * 1.08);
        });
        var oxa = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.28, 8), toi); oxa.rotation.z = Math.PI / 2; oxa.position.set(-1.88, 0.25, 0.5); g.add(oxa);
        // bánh xe (không rung theo thân)
        var banh = toon({ color: "#1f2224" });
        [[1.15, 0.72], [1.15, -0.72], [-1.15, 0.72], [-1.15, -0.72]].forEach(function (q) {
          var b = boc(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 18), banh)); b.rotation.x = Math.PI / 2; b.position.set(q[0], 0.3, q[1]); g.add(b);
          var mam = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.24, 12), crom); mam.rotation.x = Math.PI / 2; mam.position.copy(b.position); g.add(mam);
        });
        // cửa lái có bản lề (thêm 21/11/2026, tuỳ chọn `cua: true`): tấm cửa phía −z cục bộ, bản lề ở mép trước (x = 0,92);
        // xe.moCua(t, d, goc) mở ra ngoài `goc` rad (mặc định 1,1), d = 0 là mở ngay; xe.dongCua(t, d)
        if (p.cua) {
          var canh = new THREE.Group(); canh.position.set(0.92, 0, -0.84); than.add(canh);
          var vo = boc(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 0.05), son)); vo.position.set(-0.5, 0.49, 0); canh.add(vo);
          [[-0.5, 1.29, 1.0, 0.06], [-0.02, 1.02, 0.06, 0.56], [-0.98, 1.02, 0.06, 0.56]].forEach(function (q) { var m = boc(new THREE.Mesh(new THREE.BoxGeometry(q[2], q[3], 0.05), son)); m.position.set(q[0], q[1], 0); canh.add(m); });
          var kc = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.5), kinh); kc.position.set(-0.5, 1.02, 0); canh.add(kc);
          var tn = boc(new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.03, 0.03), crom)); tn.position.set(-0.75, 0.66, -0.03); canh.add(tn);
          var lo = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.0), new THREE.MeshBasicMaterial({ color: "#2a2520", side: THREE.DoubleSide })); lo.position.set(0.42, 0.76, -0.805); than.add(lo); lo.visible = false;
          var CUA = [], gocCua = 0;
          FNS.push(function (t) {
            var a = 0;
            CUA.forEach(function (c) { if (t >= c.t) { var u = c.d > 0 ? Math.min(1, (t - c.t) / c.d) : 1; u = 1 - Math.pow(1 - u, 3); a = c.tu + (c.den - c.tu) * u; } });
            canh.rotation.y = -a; lo.visible = a > 0.05;
          });
          p._cua = function (t, d, den) { CUA.push({ t: t, d: d, tu: gocCua, den: den }); CUA.sort(function (x, y) { return x.t - y.t; }); gocCua = den; };
        }
        if (p.tuyet) { chiMua(hop(1.95, 0.09, 1.36, toon({ map: snowTex }), -0.1, 1.38, 0), "dong"); chiMua(hop(0.7, 0.05, 1.3, toon({ map: snowTex }), 1.35, 0.765, 0), "dong"); }
        if (p.den) {   // vũng sáng đèn pha trên đường
          var vung = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.0), new THREE.MeshBasicMaterial({ map: softTex("rgba(255,226,160,0.42)", "rgba(255,226,160,0)"), transparent: true, depthWrite: false }));
          vung.rotation.x = -Math.PI / 2; vung.position.set(3.4, 0.03, 0); vung.layers.set(L_KHONG_MUC); g.add(vung);
        }
        g.updateMatrixWorld(true);
        var DIEM = { ongXa: [-2.04, 0.25, 0.5], mui: [1.86, 0.56, 0], cuaLai: [0.4, 1.0, -0.82], nap: [1.35, 0.76, 0], ghe: [0.2, 1.0, -0.36] };
        var xe = { g: g, than: than, RUNG: [] };
        xe.moCua = function (t, d, goc) { if (p._cua) p._cua(t, d || 0, goc == null ? 1.1 : goc); };
        xe.dongCua = function (t, d) { if (p._cua) p._cua(t, d || 0.25, 0); };
        xe.diem = function (ten) { var q = DIEM[ten] || [0, 0, 0]; g.updateMatrixWorld(true); return V3(q[0], q[1], q[2]).applyMatrix4(g.matrixWorld); };
        xe.rung = function (t0, d, amp) { xe.RUNG.push({ t0: t0, d: d || 0.5, amp: amp || 0.03 }); };
        // nhún: thân xe (nắp capo) lún xuống `cao` m rồi bật lại trong d giây, đầu xe chúc theo (vỗ nắp, ngồi lên…)
        xe.NHUN = []; xe.nhun = function (t0, d, cao) { xe.NHUN.push({ t0: t0, d: d || 0.3, cao: cao || 0.012 }); };
        if (p.noMay) {
          var ox = xe.diem("ongXa");
          xe.khoi = d3.khoi(ox.x, ox.y, ox.z, Object.assign({ cao: 1.7, r0: 0.12, no: 4.2, troi: 2.4, n: 16, per: 2.2, cum: 4, mua: "ca", huong: [-Math.cos(p.yaw), Math.sin(p.yaw)], seed: p.seed * 5 + 1 }, p.khoi));
        }
        FNS.push(function (t) {
          var f = Math.round(t * FPS), y = 0, rz = 0;
          if (p.noMay) y = 0.004 * (f % 2 ? 1 : -1) * (0.6 + 0.4 * frac(Math.sin(f * 12.9898 + p.seed) * 43758.5));   // máy nổ: rung nhẹ mỗi khung
          xe.RUNG.forEach(function (r) {
            if (t < r.t0 || t > r.t0 + r.d) return;
            var u = (t - r.t0) / r.d, a = r.amp * (1 - u) * Math.sin(2 * Math.PI * 7 * (t - r.t0));
            y += Math.abs(a) * 0.5; rz += a;
          });
          xe.NHUN.forEach(function (n) {
            if (t < n.t0 || t > n.t0 + n.d) return;
            var u = (t - n.t0) / n.d, k = Math.sin(Math.PI * Math.min(1, u / 0.35)) * (u < 0.35 ? 1 : 0) + (u >= 0.35 ? -0.35 * Math.sin(Math.PI * (u - 0.35) / 0.65) : 0);
            y -= n.cao * k; rz -= n.cao / 1.8 * k;
          });
          than.position.y = y; than.rotation.z = rz;
        });
        return xe;
      };

      // Phụt hơi/khói một lần (gag: xe khịt mũi, ống xả phụt): các cục khói liền viền mực chung, bay theo `huong` từ `goc`
      // ([x, y, z], hàm trả Vector3, hoặc d3.theo(...)) tại t. p: huong [x, y, z], quang (m), dai (s), co (m), n, lan, mau, seed,
      // keo (s: các cục phụt nối đuôi trong khoảng này → thành luồng), sang (tự sáng 0..1: hơi trắng không xám trong cảnh tối)
      d3.phut = function (goc, t, p) {
        p = Object.assign({ huong: [-1, 0.15, 0], dai: 0.9, quang: 1.6, co: 0.26, n: 11, lan: 0.3, mau: "#f2f5f6", seed: 9, keo: 0.12, sang: 0 }, p || {});
        var r = api.rng(p.seed), mat = toon({ color: p.mau, emissive: p.mau, emissiveIntensity: p.sang }), ds = [], dir = V3(p.huong[0], p.huong[1], p.huong[2]).normalize();
        for (var i = 0; i < p.n; i++) {
          var m = new THREE.Mesh(KHOI_GEO, mat); m.layers.set(L_KHOI); m.castShadow = false; m.receiveShadow = false; m.visible = false; scene.add(m);
          ds.push({ m: m, tre: r() * p.keo, j: 0.7 + 0.6 * r(), l: V3((r() - 0.5) * 2, (r() - 0.5) * 1.2, (r() - 0.5) * 2).multiplyScalar(p.lan) });
        }
        FNS.push(function (tt) {
          var g0 = null;
          for (var i = 0; i < ds.length; i++) {
            var q = ds[i], u = (tt - t - q.tre) / p.dai;
            q.m.visible = u > 0 && u < 1;
            if (!q.m.visible) continue;
            if (!g0) g0 = giai(goc);
            var e = 1 - (1 - u) * (1 - u);
            q.m.position.copy(g0).addScaledVector(dir, p.quang * e * q.j).addScaledVector(q.l, e); q.m.position.y += 0.25 * u * u;
            q.m.scale.setScalar(Math.max(0.001, p.co * q.j * (0.35 + 1.4 * e) * (u > 0.6 ? (1 - u) / 0.4 : 1)));
          }
        });
      };

      // Đồng hồ treo (kim, KHÔNG chữ số: chỉ vạch, vạch 12-3-6-9 dày) + đèn hiên nhỏ phía trên. Mặt quay về +z cục bộ.
      // p: r (m), yaw, gio, phut, den (đèn hiên), vien (màu viền). → dh {g, dat(gio, phut), chay(t0, t1, [g0, p0], [g1, p1])}
      d3.dongHo = function (x, y, z, p) {
        p = Object.assign({ r: 0.26, yaw: 0, gio: 9, phut: 0, den: true, vien: C.TEAL }, p || {});
        var g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = p.yaw; scene.add(g);
        var mat = new THREE.MeshBasicMaterial({ map: canvasTex(512, 512, function (c, w) {
          c.translate(w / 2, w / 2); c.fillStyle = "#f4ead2"; c.beginPath(); c.arc(0, 0, w * 0.48, 0, Math.PI * 2); c.fill();
          c.strokeStyle = C.INK; c.lineCap = "round";
          for (var i = 0; i < 12; i++) { var a = i / 12 * Math.PI * 2, to = i % 3 === 0; c.lineWidth = to ? 22 : 9; c.beginPath(); c.moveTo(Math.sin(a) * w * (to ? 0.31 : 0.36), -Math.cos(a) * w * (to ? 0.31 : 0.36)); c.lineTo(Math.sin(a) * w * 0.43, -Math.cos(a) * w * 0.43); c.stroke(); }
          c.lineWidth = 14; c.beginPath(); c.arc(0, 0, w * 0.47, 0, Math.PI * 2); c.stroke();
        }), transparent: true });
        var mat0 = new THREE.Mesh(new THREE.CircleGeometry(p.r, 40), mat); mat0.position.z = 0.035; g.add(mat0);
        var vanh = boc(new THREE.Mesh(new THREE.CylinderGeometry(p.r * 1.1, p.r * 1.1, 0.06, 40), toon({ color: p.vien }))); vanh.rotation.x = Math.PI / 2; g.add(vanh);
        var kimMat = new THREE.MeshBasicMaterial({ color: C.INK });
        function kim(dai, rong) { var k = new THREE.Group(); k.position.z = 0.05; var m = new THREE.Mesh(new THREE.BoxGeometry(rong, dai, 0.012), kimMat); m.position.y = dai / 2 - rong / 2; k.add(m); g.add(k); return k; }
        var kG = kim(p.r * 0.52, p.r * 0.12), kP = kim(p.r * 0.8, p.r * 0.07);
        var tam = new THREE.Mesh(new THREE.CircleGeometry(p.r * 0.08, 16), kimMat); tam.position.z = 0.065; g.add(tam);
        if (p.den) {
          var bong = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 8), new THREE.MeshBasicMaterial({ color: "#ffe2a0" })); bong.position.set(0, p.r + 0.32, 0.12); g.add(bong);
          var choa = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), new THREE.MeshBasicMaterial({ map: softTex("rgba(255,214,140,0.45)", "rgba(255,214,140,0)"), transparent: true, depthWrite: false }));
          choa.position.set(0, p.r + 0.32, 0.14); choa.layers.set(L_KHONG_MUC); g.add(choa);
          var gia = boc(new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.04), toon({ color: "#3a2a1e" }))); gia.position.set(0, p.r + 0.18, 0.06); g.add(gia);
        }
        var CH = [];
        function datGoc(gio, phut) { kG.rotation.z = -((gio % 12) + phut / 60) / 12 * Math.PI * 2; kP.rotation.z = -(phut / 60) * Math.PI * 2; }
        datGoc(p.gio, p.phut);
        var dh = { g: g };
        dh.dat = function (gio, phut) { p.gio = gio; p.phut = phut; datGoc(gio, phut); };
        dh.chay = function (t0, t1, a, b) { CH.push({ t0: t0, t1: t1, a: a[0] * 60 + a[1], b: b[0] * 60 + b[1] }); };
        FNS.push(function (t) {
          var m = p.gio * 60 + p.phut;
          CH.forEach(function (c) { if (t >= c.t0) m = lerp(c.a, c.b, smoother((t - c.t0) / Math.max(0.001, c.t1 - c.t0))); });
          datGoc(Math.floor(m / 60), m % 60);
        });
        return dh;
      };

      // Ngựa dáng ngựa vùng lạnh (Yakut): thân tròn, chân ngắn, cổ ngắn dày, bờm và đuôi rậm, lông xù dưới bụng. Đầu nhìn +x
      // cục bộ. p: yaw, mau, bom (màu bờm, đuôi), cui (0 ngẩng .. 1 cúi gặm cỏ), s (tỉ lệ), mua ("ca" | "he" | "dong"), seed.
      d3.ngua = function (x, z, p) {
        p = Object.assign({ yaw: 0, mau: "#d9d2c3", bom: "#5a4636", cui: 0, s: 1, mua: "ca", seed: 1 }, p || {});
        var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = p.yaw; g.scale.setScalar(p.s);
        var da = toon({ color: p.mau }), bom = toon({ color: p.bom }), mong = toon({ color: "#2e2620" }), r = api.rng(p.seed * 17 + 5);
        var than = boc(new THREE.Mesh(new THREE.SphereGeometry(0.5, 20, 14), da)); than.scale.set(1.45, 0.92, 0.88); than.position.set(0, 0.86, 0); g.add(than);
        [[0.4, 0.2], [0.4, -0.2], [-0.42, 0.2], [-0.42, -0.2]].forEach(function (q) {
          var c = boc(new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.1, 0.5, 8), da)); c.position.set(q[0], 0.3, q[1]); g.add(c);
          var tum = boc(new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.16, 8), da)); tum.position.set(q[0], 0.1, q[1]); g.add(tum);   // lông xù che móng
          var mg = boc(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.06, 8), mong)); mg.position.set(q[0], 0.03, q[1]); g.add(mg);
        });
        for (var k = 0; k < 7; k++) {   // lông xù rủ dưới bụng
          var xu = boc(new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.2, 6), da)); xu.rotation.x = Math.PI; xu.position.set(-0.45 + k * 0.15, 0.46 + 0.03 * r(), (r() - 0.5) * 0.3); g.add(xu);
        }
        var co = new THREE.Group(); co.position.set(0.55, 1.0, 0); co.rotation.z = lerp(-0.75, -2.0, p.cui); g.add(co);
        var coG = new THREE.CylinderGeometry(0.17, 0.25, 0.46, 10); coG.translate(0, 0.23, 0);
        co.add(boc(new THREE.Mesh(coG, da)));
        var bomG = new THREE.BoxGeometry(0.16, 0.5, 0.16); bomG.translate(-0.16, 0.26, 0); co.add(boc(new THREE.Mesh(bomG, bom)));
        var dau = new THREE.Group(); dau.position.set(0, 0.44, 0); dau.rotation.z = lerp(-1.35, -0.55, p.cui); co.add(dau);
        var dauG = new THREE.CapsuleGeometry(0.13, 0.26, 4, 10); dauG.translate(0, 0.18, 0); dau.add(boc(new THREE.Mesh(dauG, da)));
        var mui = boc(new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), bom)); mui.position.set(0, 0.36, 0); dau.add(mui);
        var bomTruoc = boc(new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), bom)); bomTruoc.position.set(-0.08, 0.02, 0); dau.add(bomTruoc);   // bờm trước trán
        [-0.07, 0.07].forEach(function (ez) { var tai = boc(new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 6), da)); tai.position.set(-0.1, -0.02, ez); tai.rotation.z = 1.1; dau.add(tai); });
        var duoi = new THREE.Group(); duoi.position.set(-0.7, 1.02, 0); g.add(duoi);
        var duoiG = new THREE.CylinderGeometry(0.06, 0.15, 0.7, 8); duoiG.translate(0, -0.35, 0);
        var dm = boc(new THREE.Mesh(duoiG, bom)); dm.rotation.z = -0.18; duoi.add(dm);
        scene.add(chiMua(g, p.mua));
        FNS.push(function (t) { duoi.rotation.x = 0.22 * Math.sin(t * 2.1 + p.seed); });
        return g;
      };

      // Cỏ, hoa nhỏ ven đường (mùa hè): khóm cỏ + hoa trắng, vàng, hồng tím, rải có seed trong [x0, x1] × [z0, z1]. Không viền mực.
      // bo(x, z) → true: bỏ chỗ đó (ví dụ lòng đường); co: tỉ lệ cỡ khóm (1 = cỏ cao 0,26 m)
      d3.hoaCo = function (p) {
        p = Object.assign({ x0: -10, x1: 10, z0: -4, z1: 4, n: 260, tiLeHoa: 0.5, co: 1, mau: ["#f6f2e4", "#f2c94c", "#d4669c", "#b58bd8"], mua: "he", seed: 41 }, p || {});
        var r = api.rng(p.seed), g = new THREE.Group(), M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), P = new THREE.Vector3();
        var nh = Math.round(p.n * p.tiLeHoa);
        var co = new THREE.InstancedMesh(new THREE.ConeGeometry(0.07 * p.co, 0.26 * p.co, 5), toon({ color: "#5f8a3c" }), p.n);
        var hoa = new THREE.InstancedMesh(new THREE.SphereGeometry(0.045 * p.co, 7, 5), toon({ color: "#ffffff" }), Math.max(1, nh));
        var ic = 0, ih = 0;
        for (var i = 0; i < p.n; i++) {
          var x0 = lerp(p.x0, p.x1, r()), z0 = lerp(p.z0, p.z1, r()), k = 0.6 + 0.8 * r(), ax = r() - 0.5, az = r() - 0.5, ga = 0.25 * r(), sh = 0.8 + 0.5 * r(), mi = Math.floor(r() * p.mau.length);
          if (p.bo && p.bo(x0, z0)) continue;
          P.set(x0, 0.12 * p.co * k, z0); Q.setFromAxisAngle(V3(ax, 0, az).normalize(), ga); S.set(k, k, k);
          co.setMatrixAt(ic++, M.compose(P, Q, S));
          if (i < nh) { P.set(x0 + 0.02, 0.27 * p.co * k, z0); Q.identity(); S.setScalar(sh); hoa.setMatrixAt(ih, M.compose(P, Q, S)); hoa.setColorAt(ih++, new THREE.Color(p.mau[mi])); }
        }
        co.count = ic; hoa.count = Math.max(0, ih);
        [co, hoa].forEach(function (m) { m.layers.set(L_KHONG_MUC); m.receiveShadow = true; m.castShadow = false; m.frustumCulled = false; g.add(m); });
        scene.add(chiMua(g, p.mua));
        return g;
      };

      // Biển chữ trên cột: chữ CHỈ lấy từ HH_DATA.chu_tren_do_vat (api.chuHopLe), vẽ bằng Fraunces lên canvas, mặt biển
      // KHÔNG nhận sáng (nắng xiên không làm biển xám). dong: [{chu, co}] – co = cỡ chữ theo cm trên biển (0,45 m = 45).
      // p: w, h (m), cao (mép dưới biển cách đất), yaw, nen, mauChu
      d3.bienChu = function (x, z, dong, p) {
        p = Object.assign({ w: 2.4, h: 0.8, cao: 1.2, yaw: 0, nen: C.TEAL, mauChu: C.PAPER }, p || {});
        dong = dong.filter(function (l) { if (api.chuHopLe(l.chu)) return true; console.error("[dio-3d] chữ không có trong chu_tren_do_vat, bỏ: " + l.chu); return false; });
        var PX = 400; // px canvas mỗi mét
        var cw = Math.round(p.w * PX), ch = Math.round(p.h * PX), cvs = document.createElement("canvas"); cvs.width = cw; cvs.height = ch;
        var tong = dong.reduce(function (s, l) { return s + l.co; }, 0) * 1.15, y0 = (p.h * 100 - tong) / 2;
        function ve() {
          var g = cvs.getContext("2d");
          g.fillStyle = p.nen; g.fillRect(0, 0, cw, ch);
          g.strokeStyle = p.mauChu; g.lineWidth = 0.035 * PX; g.strokeRect(0.06 * PX, 0.06 * PX, cw - 0.12 * PX, ch - 0.12 * PX);
          var y = y0;
          dong.forEach(function (l) {
            y += l.co * 1.15;
            g.fillStyle = p.mauChu; g.textAlign = "center"; g.textBaseline = "alphabetic";
            g.font = "800 " + (l.co / 100 * PX).toFixed(1) + "px Fraunces, serif";
            g.fillText(l.chu, cw / 2, (y - l.co * 0.22) / 100 * PX);
          });
          tex.needsUpdate = true;
        }
        var tex = new THREE.CanvasTexture(cvs); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
        ve();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ve(); veLai(); });
        var g = new THREE.Group(), wood = toon({ color: "#5e3a1c" });
        var mats = [wood, wood, wood, wood, new THREE.MeshBasicMaterial({ map: tex }), wood];
        var board = boc(new THREE.Mesh(new THREE.BoxGeometry(p.w, p.h, 0.08), mats)); board.position.y = p.cao + p.h / 2; g.add(board);
        [-p.w * 0.38, p.w * 0.38].forEach(function (px) { var c = boc(new THREE.Mesh(new THREE.BoxGeometry(0.1, p.cao + p.h * 0.9, 0.1), wood)); c.position.set(px, (p.cao + p.h * 0.9) / 2, -0.09); g.add(c); });
        g.position.set(x, 0, z); g.rotation.y = p.yaw; scene.add(g); g.updateMatrixWorld(true);
        var y = y0;
        dong.forEach(function (l) {
          y += l.co * 1.15;
          var cy = p.cao + p.h - (y - l.co * 0.6) / 100;   // giữa thân chữ
          d3.bien.push({ chu: l.chu, cao: l.co / 100, tam: V3(0, cy, 0.05).applyMatrix4(g.matrixWorld) });
        });
        return g;
      };

      // Tuyết rơi (hạt mềm, không viền), tất định theo t. p: n, vung [x0, x1, y0, y1, z0, z1], toc (m/s), co (m), t0, t1
      d3.tuyetRoi = function (p) {
        p = Object.assign({ n: 1400, vung: [-30, 30, 0, 12, -20, 12], toc: 0.7, co: 0.06, seed: 21 }, p || {});
        var r = api.rng(p.seed), v = p.vung, base = [], pos = new Float32Array(p.n * 3);
        for (var i = 0; i < p.n; i++) base.push([lerp(v[0], v[1], r()), r(), lerp(v[4], v[5], r()), r() * 6.28, 0.6 + 0.8 * r()]);
        var geo = new THREE.BufferGeometry(); geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        var mat = new THREE.PointsMaterial({ size: p.co, map: softTex("rgba(255,255,255,1)", "rgba(255,255,255,0)"), transparent: true, depthWrite: false, color: "#ffffff" });
        var pts = new THREE.Points(geo, mat); pts.layers.set(L_KHONG_MUC); pts.frustumCulled = false; scene.add(pts);
        FNS.unshift(function (t) {
          var vis = 1;
          if (p.t0 != null) vis = Math.min(vis, Math.max(0, (t - p.t0) / 0.6));
          if (p.t1 != null) vis = Math.min(vis, Math.max(0, (p.t1 - t) / 0.6));
          if (muaLuc(t) === "he") vis = 0;
          mat.opacity = 0.9 * vis; pts.visible = vis > 0.01;
          var hh = v[3] - v[2];
          for (var i = 0; i < base.length; i++) {
            var b = base[i], u = frac(b[1] - t * p.toc * b[4] / hh);
            pos[i * 3] = b[0] + 0.35 * Math.sin(t * 0.9 + b[3]); pos[i * 3 + 1] = v[2] + u * hh; pos[i * 3 + 2] = b[2] + 0.25 * Math.cos(t * 0.7 + b[3]);
          }
          geo.attributes.position.needsUpdate = true;
        });
        return pts;
      };

      // ================================================================ Wob: con rối dio-wob vẽ lên tấm phẳng
      // Kho ẩn chứa con rối DOM (opacity 0 ở khung, không vẽ ra màn hình; computed style của từng phần vẫn đọc được)
      var kho = api.div("dio-3d-kho", api.root, "position:absolute;left:0;top:0;width:0;height:0;opacity:0;pointer-events:none;");
      kho.setAttribute("aria-hidden", "true"); kho.setAttribute("data-layout-allow-overflow", "");
      var VUNG = { x0: -300, x1: 300, y0: -560, y1: 40 };   // vùng vẽ trong hệ px của con rối (gốc = gót chân, s = 1)
      var K_TEX = 2.4 * K;                                     // độ phân giải canvas (px canvas / px con rối), ×K ở khung xuất lớn
      var p2Cache = {};
      function idUrl(v) { var m = /#([^"')\s]+)/.exec(v || ""); return m ? m[1] : null; }
      function hinh(el) {
        var n = function (a) { return parseFloat(el.getAttribute(a)) || 0; }, p, tag = el.tagName.toLowerCase();
        switch (tag) {
          case "path": var d = el.getAttribute("d") || ""; p = p2Cache[d] || (p2Cache[d] = new Path2D(d)); return p;
          case "ellipse": p = new Path2D(); p.ellipse(n("cx"), n("cy"), Math.max(0, n("rx")), Math.max(0, n("ry")), 0, 0, Math.PI * 2); return p;
          case "circle": p = new Path2D(); p.arc(n("cx"), n("cy"), Math.max(0, n("r")), 0, Math.PI * 2); return p;
          case "rect": p = new Path2D(); p.roundRect(n("x"), n("y"), n("width"), n("height"), n("rx") || n("ry") || 0); return p;
          case "line": p = new Path2D(); p.moveTo(n("x1"), n("y1")); p.lineTo(n("x2"), n("y2")); return p;
          case "polyline": case "polygon":
            var pts = (el.getAttribute("points") || "").trim().split(/[\s,]+/).map(Number); p = new Path2D();
            for (var i = 0; i + 1 < pts.length; i += 2) { if (i) p.lineTo(pts[i], pts[i + 1]); else p.moveTo(pts[i], pts[i + 1]); }
            if (tag === "polygon") p.closePath();
            return p;
        }
        return null;
      }
      function matTran(el) {
        var l = el.transform && el.transform.baseVal, M = new DOMMatrix();
        if (l) for (var i = 0; i < l.numberOfItems; i++) M.multiplySelf(l.getItem(i).matrix);
        return M;
      }
      var mauCache = {};
      function mauTo(v, g) {
        if (v.indexOf("url(") < 0) return v;
        var id = idUrl(v); if (!id) return "rgba(0,0,0,0)";
        if (mauCache[id]) return mauCache[id];
        var el = document.getElementById(id);
        if (!el) return "rgba(0,0,0,0)";
        var tag = el.tagName.toLowerCase();
        if (tag === "pattern") {
          var pw = parseFloat(el.getAttribute("width")) || 16, ph = parseFloat(el.getAttribute("height")) || 16, R = 3;
          var c = document.createElement("canvas"); c.width = Math.ceil(pw * R); c.height = Math.ceil(ph * R);
          var cg = c.getContext("2d"); cg.scale(R, R); veNhom(cg, el, 1);
          var pat = g.createPattern(c, "repeat"); pat.setTransform(new DOMMatrix().scale(1 / R, 1 / R));
          return (mauCache[id] = pat);
        }
        var stop = el.querySelector("stop");                    // gradient: lấy màu điểm dừng đầu (gần đúng)
        return (mauCache[id] = stop ? getComputedStyle(stop).stopColor : "rgba(0,0,0,0)");
      }
      function catVung(g, v) {
        var cp = document.getElementById(idUrl(v) || ""); if (!cp) return;
        var P = new Path2D();
        for (var c = cp.firstElementChild; c; c = c.nextElementSibling) { var s = hinh(c); if (s) P.addPath(s, matTran(c)); }
        g.clip(P);
      }
      function veHinh(g, el, cs, a) {
        var tag = el.tagName.toLowerCase();
        if (tag === "text") {
          var fs = parseFloat(cs.fontSize) || 16;
          g.font = cs.fontWeight + " " + fs + "px " + cs.fontFamily; g.textBaseline = "alphabetic";
          g.textAlign = cs.textAnchor === "middle" ? "center" : cs.textAnchor === "end" ? "right" : "left";
          g.globalAlpha = a * (+cs.fillOpacity); g.fillStyle = mauTo(cs.fill, g);
          g.fillText(el.textContent, parseFloat(el.getAttribute("x")) || 0, parseFloat(el.getAttribute("y")) || 0);
          return;
        }
        var p = hinh(el); if (!p) return;
        if (cs.fill && cs.fill !== "none") { g.globalAlpha = a * (+cs.fillOpacity); g.fillStyle = mauTo(cs.fill, g); g.fill(p, cs.fillRule === "evenodd" ? "evenodd" : "nonzero"); }
        var sw = parseFloat(cs.strokeWidth) || 0;
        if (cs.stroke && cs.stroke !== "none" && sw > 0) {
          g.globalAlpha = a * (+cs.strokeOpacity); g.strokeStyle = mauTo(cs.stroke, g); g.lineWidth = sw;
          g.lineCap = cs.strokeLinecap; g.lineJoin = cs.strokeLinejoin;
          g.setLineDash(cs.strokeDasharray && cs.strokeDasharray !== "none" ? cs.strokeDasharray.split(/[\s,]+/).map(parseFloat) : []);
          g.stroke(p);
        }
      }
      var BO_QUA = { defs: 1, clippath: 1, title: 1, pattern: 1, lineargradient: 1, radialgradient: 1, filter: 1, style: 1, mask: 1, desc: 1 };
      function veNhom(g, el, op) {
        for (var c = el.firstElementChild; c; c = c.nextElementSibling) {
          var tag = c.tagName.toLowerCase();
          if (BO_QUA[tag]) continue;
          var cs = getComputedStyle(c);
          if (cs.display === "none" || cs.visibility === "hidden") continue;
          var a = op * (+cs.opacity);
          if (a <= 0.003) continue;
          g.save();
          var l = c.transform && c.transform.baseVal;
          if (l) for (var i = 0; i < l.numberOfItems; i++) { var m = l.getItem(i).matrix; g.transform(m.a, m.b, m.c, m.d, m.e, m.f); }
          var cp = c.getAttribute("clip-path"); if (cp) catVung(g, cp);
          if (tag === "g" || tag === "svg" || tag === "a") veNhom(g, c, a); else veHinh(g, c, cs, a);
          g.restore();
        }
      }
      var num = function (el, k) { return +gsap.getProperty(el, k) || 0; };

      // d3.wob(o): o = {x, z (m), y (m, đứng trên vật cao), cao (m, hộp 400 px của con rối; mặc định 1,05), trangPhuc, huong, sang}
      // → w của dio-wob (dùng api.walk/quay/look/lids/mouth/khauHinh/trangPhuc/armTo…; x, z trong walk tính bằng m)
      d3.wob = function (o2) {
        o2 = o2 || {};
        var w = api.makeWob(kho, { x: o2.x || 0, y: o2.y || 0, z: o2.z || 0, s: 1, trangPhuc: o2.trangPhuc, id: o2.id });
        w.svg.style.filter = "none";
        if (o2.huong) api.quaySet(w, o2.huong);
        var M = (o2.cao || 1.05) / 400;  // mét mỗi px con rối
        w.m3 = M;
        var cw = Math.round((VUNG.x1 - VUNG.x0) * K_TEX), chh = Math.round((VUNG.y1 - VUNG.y0) * K_TEX);
        function lop() {
          var c = document.createElement("canvas"); c.width = cw; c.height = chh;
          var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
          return { c: c, g: c.getContext("2d"), t: t };
        }
        var A = lop(), B = null;
        var geo = new THREE.PlaneGeometry((VUNG.x1 - VUNG.x0) * M, (VUNG.y1 - VUNG.y0) * M);
        geo.translate((VUNG.x0 + VUNG.x1) / 2 * M, -(VUNG.y0 + VUNG.y1) / 2 * M, 0);
        var goc = new THREE.Group(); scene.add(goc);
        // sang (0..1, thêm 18/11/2026): tự sáng một phần để Wob đọc rõ trong cảnh đêm (mặc định 0 = chỉ nhận sáng của cảnh)
        var mat = new THREE.MeshLambertMaterial({ map: A.t, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide,
          emissive: o2.sang ? "#ffffff" : "#000000", emissiveMap: o2.sang ? A.t : null, emissiveIntensity: o2.sang || 0 });
        var mesh = new THREE.Mesh(geo, mat);
        mesh.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: A.t, alphaTest: 0.5, side: THREE.DoubleSide });
        mesh.castShadow = true; mesh.layers.set(L_KHONG_MUC); goc.add(mesh);
        var blob = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.35), new THREE.MeshBasicMaterial({ map: softTex("rgba(40,50,70,0.55)", "rgba(40,50,70,0)"), transparent: true, depthWrite: false }));
        blob.rotation.x = -Math.PI / 2; blob.layers.set(L_KHONG_MUC); scene.add(blob);
        w.mesh = mesh; w.goc3 = goc; w.blob = blob;
        w.viTri = function () { return V3(num(w.pos, "x"), num(w.pos, "y"), num(w.pos, "z")); };
        // điểm (px, py) trong hệ 400×400 của con rối → toạ độ thế giới (theo trạng thái hiện tại, gần đúng khi không nghiêng)
        w.diem = function (px, py) { goc.updateMatrixWorld(true); return V3((px - 200) * M, (392 - py) * M, 0.02).applyMatrix4(mesh.matrixWorld); };
        function veCanvas(L, ham) {
          var g = L.g; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, cw, chh); g.globalAlpha = 1;
          g.setTransform(K_TEX, 0, 0, K_TEX, -VUNG.x0 * K_TEX, -VUNG.y0 * K_TEX);
          ham(g); L.t.needsUpdate = true;
        }
        w.ve3 = function (cam) {
          veCanvas(A, function (g) { g.translate(-200, -392); veNhom(g, w.svg, 1); });
          // bong bóng ký hiệu (api.addBubble/api.bubble): tấm riêng, không đổ bóng
          var keys = Object.keys(w.bubbles), co = false;
          keys.forEach(function (k) { if (num(w.bubbles[k], "scaleX") > 0.01) co = true; });
          if (co && !B) {
            B = lop();
            var mb = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: B.t, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide, emissive: "#ffffff", emissiveIntensity: 0.25 }));
            mb.layers.set(L_KHONG_MUC); mb.position.z = 0.01; goc.add(mb); w.meshBong = mb;
          }
          if (B) {
            w.meshBong.visible = co;
            if (co) veCanvas(B, function (g) {
              keys.forEach(function (k) {
                var el = w.bubbles[k], sx = num(el, "scaleX"), sy = num(el, "scaleY"), r = num(el, "rotation");
                if (sx <= 0.01) return;
                var ox = 70 + 0.2 * 190, oy = -520 + 160;   // transformOrigin 20% 100% (dio-wob addBubble, s = 1)
                g.save(); g.translate(ox, oy); g.rotate(r * Math.PI / 180); g.scale(sx, sy); g.translate(-ox, -oy); g.translate(70, -520);
                veNhom(g, el, 1); g.restore();
              });
            });
          }
          var p = w.viTri(), lx = num(w.lift, "x"), ly = num(w.lift, "y");
          goc.position.set(p.x, p.y, p.z);
          goc.rotation.set(0, Math.atan2(cam.x - p.x, cam.z - p.z), 0);
          mesh.position.set(lx * M, -ly * M, 0);
          mesh.scale.set(num(w.lift, "scaleX") * num(w.svg, "scaleX"), num(w.lift, "scaleY"), 1);
          mesh.rotation.z = -num(w.lift, "rotation") * Math.PI / 180;
          if (w.meshBong) { w.meshBong.position.set(mesh.position.x, mesh.position.y, 0.01); w.meshBong.scale.copy(mesh.scale); w.meshBong.rotation.z = mesh.rotation.z; }
          blob.position.set(p.x, p.y + 0.02, p.z + 0.02); blob.scale.setScalar(Math.max(0.4, 1 + ly * M * 3));
        };
        d3.wobs.push(w);
        return w;
      };

      // Hơi thở: phụt ra từ miệng Wob tại t, dài `dai` giây, bay về phía `huong` (−1 trái, 1 phải).
      // dong: {tai, roi} – gag hơi thở đóng băng: tới `tai` hơi thành cục băng (viền mực), treo lơ lửng, tới `roi` rơi xuống đất.
      // Hơi bám theo vị trí HIỆN TẠI của Wob: cho Wob đứng yên từ t tới hết gag (hoặc truyền coDinh: [x, y, z] gốc miệng).
      var bangTex = canvasTex(256, 256, function (g, w, h) {
        g.translate(w / 2, h / 2);
        var P = new Path2D(); [[-38, 10, 44], [10, -14, 50], [44, 18, 38], [0, 30, 40]].forEach(function (c) { P.moveTo(c[0] + c[2], c[1]); P.arc(c[0], c[1], c[2], 0, Math.PI * 2); });
        g.lineJoin = "round"; g.strokeStyle = C.INK; g.lineWidth = 16; g.stroke(P);
        g.fillStyle = C.FROST; g.fill(P);
        g.fillStyle = C.ICE; g.beginPath(); g.ellipse(14, 34, 52, 22, 0, 0, Math.PI * 2); g.fill();
        g.strokeStyle = "#ffffff"; g.lineWidth = 9; g.lineCap = "round"; g.beginPath(); g.arc(4, -10, 34, 3.6, 4.6); g.stroke();
      });
      var hoiTex = softTex("rgba(255,255,255,0.92)", "rgba(255,255,255,0)");
      d3.hoi = function (w, t, p) {
        p = Object.assign({ dai: 1.1, huong: -1, co: 0.55, dong: null, coDinh: null }, p || {});
        var mh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: hoiTex, transparent: true, depthWrite: false }));
        mh.layers.set(L_KHONG_MUC); scene.add(mh);
        var mb = null;
        if (p.dong) {
          mb = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshLambertMaterial({ map: bangTex, alphaTest: 0.5, side: THREE.DoubleSide, emissive: "#ffffff", emissiveIntensity: 0.35 }));
          mb.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: bangTex, alphaTest: 0.5 });
          mb.castShadow = true; mb.layers.set(L_KHONG_MUC); scene.add(mb);
        }
        FNS.push(function (tt) {
          var g0 = p.coDinh ? V3(p.coDinh[0], p.coDinh[1], p.coDinh[2]) : null;
          if (!g0) { var vp = w.viTri(); g0 = V3(vp.x + num(w.face, "x") * w.m3 * 0.6, vp.y + (392 - 236) * w.m3, vp.z + 0.06); }
          var phai = V3(1, 0, 0).applyQuaternion(camera.quaternion); phai.y = 0; phai.normalize();   // sang phải khung, nằm ngang
          var lechX = function (q) { return p.huong * (0.12 + q * 0.75) * p.co / 0.55; };            // ra khỏi mặt Wob
          var u = (tt - t) / p.dai, dongLuc = p.dong ? p.dong.tai : Infinity;
          var uMax = p.dong ? (dongLuc - t) / p.dai : 1;
          var uu = Math.min(u, uMax);
          mh.visible = u > 0 && u < 1 && tt < dongLuc;
          if (mh.visible) {
            mh.position.copy(g0).addScaledVector(phai, lechX(uu)); mh.position.y += uu * 0.28;
            mh.scale.setScalar(0.08 + uu * p.co); mh.material.opacity = (1 - uu) * 0.95; mh.quaternion.copy(camera.quaternion);
          }
          if (mb) {
            var on = tt >= dongLuc;
            mb.visible = on;
            if (on) {
              var hp = g0.clone().addScaledVector(phai, lechX(uMax)), hy = g0.y + uMax * 0.28, sc = (0.08 + uMax * p.co) * 0.95;
              var k = Math.min(1, (tt - dongLuc) / 0.12), pop = 1 + 0.25 * Math.sin(Math.PI * k);   // đông lại: nảy nhẹ
              var y = hy, rot = 0;
              if (tt >= p.dong.roi) {
                var dt = tt - p.dong.roi, dRoi = Math.sqrt(2 * Math.max(0.01, hy - sc * 0.4) / 9.8), dat = sc * 0.4;
                if (dt < dRoi) { y = hy - 0.5 * 9.8 * dt * dt; rot = dt / dRoi * 0.5; }
                else { var b = dt - dRoi; y = dat + Math.max(0, 0.06 * Math.sin(Math.PI * Math.min(1, b / 0.18))); rot = 0.5 + 0.2 * Math.min(1, b / 0.18); }
                y = Math.max(dat, y);
              }
              mb.position.set(hp.x, y, hp.z + 0.03); mb.scale.setScalar(sc * pop);
              mb.quaternion.copy(camera.quaternion); mb.rotateZ(-rot * p.huong);
            }
          }
        });
      };

      // Chùm đèn pin (thêm 21/11/2026): nón sáng cộng màu từ `goc` tới đích + quầng sáng ở đích. goc/đích: [x,y,z],
      // d3.theo(w, lech), hàm trả Vector3. p: rGoc, rDich (m), mau, manh (0..1), sangDich (độ sáng quầng ở đích 0..1). → chum {bat(t, on), toi(t, d, dich)
      // (chùm lia sang đích mới trong d giây, smootherstep)}. Mặc định tắt.
      d3.chumDen = function (goc, dich, p) {
        p = Object.assign({ rGoc: 0.05, rDich: 0.45, mau: "#fff1b8", manh: 0.32, sangDich: 0.9 }, p || {});
        var geo = new THREE.CylinderGeometry(p.rGoc, p.rDich, 1, 28, 1, true); geo.translate(0, 0.5, 0); geo.rotateX(Math.PI / 2);
        var non = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: p.mau, transparent: true, opacity: p.manh, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
        non.layers.set(L_KHONG_MUC); non.castShadow = false; non.visible = false; scene.add(non);
        var quang = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex("rgba(255,244,200," + p.sangDich + ")", "rgba(255,244,200,0)"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
        quang.layers.set(L_KHONG_MUC); quang.visible = false; scene.add(quang);
        var BAT = [], DICH = [{ t: -1e9, d: 0, dich: dich }];
        var chum = { non: non, quang: quang };
        chum.bat = function (t, on) { BAT.push({ t: t, on: on }); BAT.sort(function (a, b) { return a.t - b.t; }); };
        chum.toi = function (t, d, dich2) { DICH.push({ t: t, d: d, dich: dich2 }); DICH.sort(function (a, b) { return a.t - b.t; }); };
        FNS.push(function (t) {
          var on = false; BAT.forEach(function (b) { if (t >= b.t) on = b.on; });
          non.visible = quang.visible = on; if (!on) return;
          var cur = giai(DICH[0].dich);
          for (var i = 1; i < DICH.length; i++) {
            var k = DICH[i]; if (t < k.t) break;
            var u = k.d > 0 ? Math.min(1, (t - k.t) / k.d) : 1; u = u * u * u * (u * (u * 6 - 15) + 10);
            cur = cur.clone().lerp(giai(k.dich), u);
          }
          var g0 = giai(goc), L = cur.clone().sub(g0).length();
          non.position.copy(g0); non.scale.set(1, 1, Math.max(0.01, L)); non.lookAt(cur);
          quang.position.copy(cur); quang.scale.setScalar(p.rDich * 3.2);
        });
        return chum;
      };

      // Nhiệt kế giấy treo trên cột gỗ (thêm 21/11/2026): ống thuỷ ngân + bầu, vạch, nhãn chữ (CHỈ chữ trong chu_tren_do_vat,
      // hiện theo t), mặt không nhận sáng. p: cao (mép dưới bảng cách đất), w, h (m), yaw, nen, muc0 (0..1 mức thuỷ ngân đầu),
      // nhan: [{chu, co (cm), x, y (0..1 trên bảng, chữ căn trái, giữa dòng), mau}]. → nk {g, muc(t, d, v) (thuỷ ngân tới mức v
      // trong d giây, ease-out), hien(i, t, on) (nhãn i hiện/ẩn), diem(u, v) (điểm trên mặt bảng → Vector3)}
      d3.nhietKe = function (x, z, p) {
        p = Object.assign({ cao: 0.55, w: 0.42, h: 0.95, yaw: 0, nen: "#efe3c8", muc0: 0.7, nhan: [] }, p || {});
        var nhan = p.nhan.filter(function (l) { if (api.chuHopLe(l.chu)) return true; console.error("[dio-3d] chữ không có trong chu_tren_do_vat, bỏ: " + l.chu); return false; });
        var PX = 600, cw = Math.round(p.w * PX), ch = Math.round(p.h * PX), cvs = document.createElement("canvas"); cvs.width = cw; cvs.height = ch;
        var tex = new THREE.CanvasTexture(cvs); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
        var ONG = { x: 0.2, y0: 0.1, y1: 0.78 };
        var trang = { muc: -1, hien: "" };
        function ve(muc, hien) {
          var g = cvs.getContext("2d");
          g.fillStyle = p.nen; g.fillRect(0, 0, cw, ch);
          g.strokeStyle = C.INK; g.lineWidth = 10; g.strokeRect(5, 5, cw - 10, ch - 10);
          var ox = ONG.x * cw, oy0 = ONG.y0 * ch, oy1 = ONG.y1 * ch, r = 0.05 * cw;
          g.fillStyle = "#ffffff"; g.strokeStyle = C.INK; g.lineWidth = 7;
          g.beginPath(); g.moveTo(ox - r, oy1); g.lineTo(ox - r, oy0); g.arc(ox, oy0, r, Math.PI, 0); g.lineTo(ox + r, oy1); g.closePath(); g.fill(); g.stroke();
          for (var k = 0; k <= 8; k++) { var yy = oy0 + (oy1 - oy0) * k / 8; g.beginPath(); g.moveTo(ox + r + 6, yy); g.lineTo(ox + r + (k % 2 ? 20 : 34), yy); g.lineWidth = 5; g.stroke(); }
          var ym = oy1 - (oy1 - oy0) * Math.max(0, Math.min(1, muc));
          g.fillStyle = "#C23B2A"; g.fillRect(ox - r * 0.5, ym, r, oy1 - ym + 4);
          g.beginPath(); g.arc(ox, oy1 + r * 1.6, r * 2, 0, Math.PI * 2); g.fill(); g.lineWidth = 7; g.strokeStyle = C.INK; g.stroke();
          nhan.forEach(function (l, i) {
            if (hien.charAt(i) !== "1") return;
            g.fillStyle = l.mau || C.INK; g.textAlign = "left"; g.textBaseline = "middle";
            g.font = "800 " + (l.co / 100 * PX).toFixed(1) + "px Fraunces, serif";
            g.fillText(l.chu, l.x * cw, l.y * ch);
          });
          tex.needsUpdate = true;
        }
        var g = new THREE.Group(), wood = toon({ color: "#5e3a1c" });
        var cot = boc(new THREE.Mesh(new THREE.BoxGeometry(0.1, p.cao + p.h + 0.25, 0.1), wood)); cot.position.set(0, (p.cao + p.h + 0.25) / 2, -0.07); g.add(cot);
        var bang = boc(new THREE.Mesh(new THREE.BoxGeometry(p.w, p.h, 0.03), [wood, wood, wood, wood, new THREE.MeshBasicMaterial({ map: tex }), wood])); bang.position.y = p.cao + p.h / 2; g.add(bang);
        g.position.set(x, 0, z); g.rotation.y = p.yaw; scene.add(g); g.updateMatrixWorld(true);
        var MUC = [{ t: -1e9, d: 0, v: p.muc0 }], HIENL = nhan.map(function () { return []; });
        var nk = { g: g };
        nk.muc = function (t, d, v) { MUC.push({ t: t, d: d, v: v }); MUC.sort(function (a, b) { return a.t - b.t; }); };
        nk.hien = function (i, t, on) { if (HIENL[i]) HIENL[i].push({ t: t, on: on !== false }); };
        nk.diem = function (u, v) { g.updateMatrixWorld(true); return V3((u - 0.5) * p.w, p.cao + p.h * (1 - v), 0.03).applyMatrix4(g.matrixWorld); };
        ve(p.muc0, "");
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { trang.muc = -1; });
        FNS.push(function (t) {
          var v = MUC[0].v;
          for (var i = 1; i < MUC.length; i++) { var k = MUC[i]; if (t < k.t) break; var u = k.d > 0 ? Math.min(1, (t - k.t) / k.d) : 1; u = 1 - Math.pow(1 - u, 3); v = v + (k.v - v) * u; }
          var h = HIENL.map(function (ds) { var on = false; ds.forEach(function (q) { if (t >= q.t) on = q.on; }); return on ? "1" : "0"; }).join("");
          if (Math.abs(v - trang.muc) > 1e-4 || h !== trang.hien) { trang.muc = v; trang.hien = h; ve(v, h); }
        });
        return nk;
      };

      d3.moiKhung = function (fn) { FNS.push(fn); };

      // ================================================================ camera theo ngữ pháp đo được
      // keys[0] = trạng thái đầu {pos, nhin, roll (độ), fov, mo (px mờ nền xa, 0 = nét toàn khung), net ("wob" | [x,y,z])}
      // keys[i] = {tu, den, kieu: "luot" | "lao" | "vao" | "em", + trường đổi}; den = tu: cắt cứng. Trường bỏ trống giữ nguyên.
      // pos/nhin: [x,y,z] | d3.theo(w, [dx,dy,dz]) (bám Wob) | hàm trả Vector3. Giữa hai lệnh, camera ĐẨY VÀO `day` mỗi khung
      // (mặc định 0,0025 = 0,25 %/khung, ngữ pháp mục 3); lệnh có `day` đổi tốc độ đẩy của khoảng giữ hình ngay sau nó.
      var CAM = null, RUNG = [], HIEN = [];
      d3.theo = function (w, lech) { return { wob: w, lech: lech || [0, 0.55, 0] }; };
      function giai(v) {
        if (v == null) return null;
        if (typeof v === "function") return v();
        if (v.isVector3) return v.clone();
        if (Array.isArray(v)) return V3(v[0], v[1], v[2]);
        if (v.wob) { var l = v.lech || [0, 0, 0]; return v.wob.viTri().add(V3(l[0], l[1], l[2])); }
        return null;
      }
      d3.cameraDuong = function (keys, o2) { CAM = { keys: keys, day: o2 && o2.day != null ? o2.day : 0.0025 }; };
      d3.rungMay = function (t, d, amp) { RUNG.push({ t: t, d: d || 7 / FPS, amp: amp || 6 }); };   // rung va chạm: đổi chiều mỗi khung
      d3.hien = function (t, on) { HIEN.push({ t: t, on: on }); HIEN.sort(function (a, b) { return a.t - b.t; }); tl.set(stage, { visibility: on ? "visible" : "hidden" }, t); };
      function day(s, frames, k) {
        if (frames > 0 && k > 0) s.pos = s.nhin.clone().add(s.pos.clone().sub(s.nhin).multiplyScalar(Math.pow(1 - k, frames)));
        return s;
      }
      function camState(t) {
        var K = CAM.keys, k0 = K[0];
        var s = { pos: giai(k0.pos), nhin: giai(k0.nhin), roll: k0.roll || 0, fov: k0.fov || cfg.fov, mo: k0.mo || 0, net: k0.net || "wob" };
        var tc = 0, k = k0.day != null ? k0.day : CAM.day;
        for (var i = 1; i < K.length; i++) {
          var m = K[i];
          s = day(s, (Math.min(t, m.tu) - tc) * FPS, k);
          if (t < m.tu) return s;
          var e = { pos: m.pos != null ? giai(m.pos) : s.pos.clone(), nhin: m.nhin != null ? giai(m.nhin) : s.nhin.clone(),
            roll: m.roll != null ? m.roll : s.roll, fov: m.fov != null ? m.fov : s.fov, mo: m.mo != null ? m.mo : s.mo, net: m.net != null ? m.net : s.net };
          var den = m.den != null ? m.den : m.tu;
          if (t < den) {
            var p = (EASE[m.kieu] || EASE.luot)((t - m.tu) / (den - m.tu));
            return { pos: s.pos.clone().lerp(e.pos, p), nhin: s.nhin.clone().lerp(e.nhin, p), roll: lerp(s.roll, e.roll, p), fov: lerp(s.fov, e.fov, p), mo: lerp(s.mo, e.mo, p), net: e.net };
          }
          s = e; tc = den; k = m.day != null ? m.day : CAM.day;
        }
        return day(s, (t - tc) * FPS, k);
      }
      d3.camLuc = function (t) { return CAM ? camState(t) : null; };

      // ================================================================ hậu kỳ: viền mực (thế giới) → mờ ống kính → tone map
      var mkRT = function (type, samples) { var rt = new THREE.WebGLRenderTarget(BW, BH, { type: type, samples: samples || 0 }); rt.depthTexture = new THREE.DepthTexture(BW, BH); return rt; };
      var rtMain = mkRT(THREE.HalfFloatType, 4), rtNorm = mkRT(THREE.UnsignedByteType, 0);
      var rtInk = new THREE.WebGLRenderTarget(BW, BH, { type: THREE.HalfFloatType });
      var normalMat = new THREE.MeshNormalMaterial();
      var khoiNormMat = new THREE.ShaderMaterial({   // khói: pháp tuyến phẳng + đánh dấu alpha 0,5 → chỉ viền ngoài của cả cột
        vertexShader: "void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",
        fragmentShader: "void main(){ gl_FragColor = vec4(.5,.5,1.,.5); }", blending: THREE.NoBlending
      });
      var quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), quadScene = new THREE.Scene();
      var quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2)); quadScene.add(quad);
      var VS = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }";
      var inkMat = new THREE.ShaderMaterial({
        uniforms: { tColor: { value: rtMain.texture }, tDM: { value: rtMain.depthTexture }, tN: { value: rtNorm.texture }, tDW: { value: rtNorm.depthTexture },
          res: { value: new THREE.Vector2(BW, BH) }, cNear: { value: 0.1 }, cFar: { value: 400 }, inkW: { value: cfg.muc },
          tan: { value: new THREE.Vector2(cfg.mucTan[0], cfg.mucTan[1]) }, ink: { value: new THREE.Color(C.INK).convertSRGBToLinear() } },
        vertexShader: VS,
        fragmentShader: [
          "#include <packing>",
          "uniform sampler2D tColor, tDM, tN, tDW; uniform vec2 res, tan; uniform float cNear, cFar, inkW; uniform vec3 ink; varying vec2 vUv;",
          "float lin(sampler2D t, vec2 uv){ return -perspectiveDepthToViewZ(texture2D(t, uv).x, cNear, cFar); }",
          "void main(){",
          "  vec3 col = texture2D(tColor, vUv).rgb;",
          "  float zw = lin(tDW, vUv), zm = lin(tDM, vUv);",
          "  vec4 na = texture2D(tN, vUv); vec3 n0 = na.xyz * 2. - 1.; bool k0 = na.a < .75;",
          "  float e = 0., s = res.y / 1080.;",
          "  for (int ri = 0; ri < 3; ri++) {",
          "    float r = (ri == 0 ? 1. : ri == 1 ? inkW * .55 : inkW) * s;",
          "    for (int k = 0; k < 8; k++) {",
          "      float a = float(k) * .785398;",
          "      vec2 uq = vUv + vec2(cos(a), sin(a)) * r / res;",
          "      vec4 nqa = texture2D(tN, uq); bool kq = nqa.a < .75;",
          "      if (k0 && kq) continue;",                                            // trong lòng cột khói: không vẽ nét
          "      float zq = lin(tDW, uq);",
          "      e = max(e, smoothstep(.015, .05, (zq - zw) / zw));",                  // mép gần của chỗ nhảy độ sâu = viền ngoài
          "      if (!k0 && !kq && abs(zq - zw) < zw * .015) e = max(e, smoothstep(.85, .6, dot(n0, nqa.xyz * 2. - 1.)) * .95);",   // nếp gấp
          "    }",
          "  }",
          "  if (zm < zw - .06) e = 0.;",                                              // Wob, hạt đứng trước: không vẽ mực đè lên
          "  e *= 1. - smoothstep(tan.x, tan.y, zw);",                                 // xa thì mực tan vào sương
          "  gl_FragColor = vec4(mix(col, ink, e), 1.);",
          "}"].join("\n")
      });
      var postMat = new THREE.ShaderMaterial({
        uniforms: { tIn: { value: rtInk.texture }, tDM: { value: rtMain.depthTexture }, res: { value: new THREE.Vector2(BW, BH) }, cNear: { value: 0.1 }, cFar: { value: 400 },
          focus: { value: 10 }, cInf: { value: 0 }, vig: { value: cfg.vienToi } },
        vertexShader: VS,
        fragmentShader: [
          "#include <packing>",
          "uniform sampler2D tIn, tDM; uniform vec2 res; uniform float cNear, cFar, focus, cInf, vig; varying vec2 vUv;",
          "float lin(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDM, uv).x, cNear, cFar); }",
          "float coc(float z, float s){ return clamp(cInf * s * abs(1. - focus / max(z, .001)), 0., 22. * s); }",
          "void main(){",
          "  float s = res.y / 1080.;",
          "  vec3 col = texture2D(tIn, vUv).rgb; float z0 = lin(vUv), r0 = coc(z0, s);",
          "  if (r0 > .6) {",
          "    vec3 acc = col; float ws = 1.;",
          "    for (int i = 0; i < 48; i++) {",
          "      float rr = sqrt((float(i) + .5) / 48.) * r0, a = float(i) * 2.39996;",
          "      vec2 uq = vUv + vec2(cos(a), sin(a)) * rr / res;",
          "      float zq = lin(uq), rq = coc(zq, s); if (zq > z0) rq = min(rq, r0);",   // nền không loang đè lên chủ thể nét
          "      float w = clamp(rq - rr + .5, 0., 1.); acc += texture2D(tIn, uq).rgb * w; ws += w;",
          "    }",
          "    col = acc / ws;",
          "  }",
          "  vec2 q = vUv - .5; col *= 1. - dot(q, q) * vig;",
          "  gl_FragColor = vec4(col, 1.);",
          "  #include <tonemapping_fragment>",
          "  #include <colorspace_fragment>",
          "}"].join("\n")
      });

      // ================================================================ vẽ một khung
      var tDaVe = null;
      function hienLuc(t) { var on = true; HIEN.forEach(function (h) { if (t >= h.t) on = h.on; }); return on; }
      function veKhung(t, epVe) {
        t = Math.max(0, Math.min(api.DUR, t));
        if (!epVe && t === tDaVe) return;
        if (!hienLuc(t)) return;
        apMua(muaLuc(t)); apAnhSang(asLuc(t));
        for (var i = 0; i < FNS.length; i++) FNS[i](t);
        var s = CAM ? camState(t) : { pos: V3(0, 1.6, 10), nhin: V3(0, 1, 0), roll: 0, fov: cfg.fov, mo: 0, net: "wob" };
        camera.quaternion.identity(); camera.position.copy(s.pos); camera.up.set(0, 1, 0); camera.updateMatrixWorld(true); camera.lookAt(s.nhin); camera.rotateZ(s.roll * Math.PI / 180);
        if (camera.fov !== s.fov) { camera.fov = s.fov; camera.updateProjectionMatrix(); }
        RUNG.forEach(function (r) {
          if (t < r.t || t > r.t + r.d) return;
          var f = Math.floor((t - r.t) * FPS + 1e-6), a = r.amp * (1 - (t - r.t) / r.d) * (f % 2 ? 1 : -1) * (s.fov / H) * Math.PI / 180;
          camera.rotateY(a); camera.rotateX(a * 0.6);
        });
        camera.updateMatrixWorld(true);
        d3.wobs.forEach(function (w) { w.ve3(camera.position); });
        var net = s.net === "wob" ? (d3.wobs[0] ? d3.wobs[0].viTri().add(V3(0, 0.6, 0)) : s.nhin) : giai(s.net) || s.nhin;
        postMat.uniforms.cInf.value = s.mo;
        postMat.uniforms.focus.value = camera.position.distanceTo(net) * 0.98;
        // lượt chính
        camera.layers.enableAll(); renderer.shadowMap.needsUpdate = true;
        renderer.setRenderTarget(rtMain); renderer.setClearColor(HORIZON, 1); renderer.render(scene, camera);
        // lượt pháp tuyến + độ sâu cho viền mực: thế giới (nếp gấp) rồi khói (chỉ viền ngoài)
        camera.layers.set(L_THE_GIOI); scene.overrideMaterial = normalMat;
        renderer.setRenderTarget(rtNorm); renderer.setClearColor(0x000000, 1); renderer.render(scene, camera);
        camera.layers.set(L_KHOI); scene.overrideMaterial = khoiNormMat; renderer.autoClear = false; renderer.render(scene, camera); renderer.autoClear = true;
        scene.overrideMaterial = null; camera.layers.enableAll();
        quad.material = inkMat; renderer.setRenderTarget(rtInk); renderer.render(quadScene, quadCam);
        quad.material = postMat; renderer.setRenderTarget(null); renderer.render(quadScene, quadCam);
        tDaVe = t;
      }
      function veLai() { veKhung(tl.time(), true); }
      d3.veLai = veLai;

      // Hai đường kích hoạt vẽ, cả hai đều chạy SAU khi GSAP đã đặt xong trạng thái con rối ở t (thứ tự con không quan trọng):
      // (1) sự kiện "hf-seek" của HyperFrames (runtime phát sau mỗi lần tua, kể cả lúc render: lúc render runtime KHÔNG gọi
      //     tl.render của instance, nên chỉ vá render là không đủ – thử 18/11/2026 ra clip đứng hình);
      // (2) vá tl.render: mọi lần tua timeline gốc ngoài runtime (kiem_doan.py --do-chu, DIO.doChu, puppeteer) vẫn vẽ.
      // Cùng một t thì chỉ vẽ một lần (tất định: cùng t → cùng hình). Không ép render lại timeline (đã thử: làm hỏng lớp nối giấy).
      var goc = tl.render;
      tl.render = function () { var r = goc.apply(this, arguments); veKhung(this.time()); return r; };
      window.addEventListener("hf-seek", function () { veKhung(tl.time()); });
      api.sauKhiDung = api.sauKhiDung || [];
      api.sauKhiDung.push(function () {
        if (!CAM) console.warn("[dio-3d] chưa gọi d3.cameraDuong(...): dùng camera mặc định");
        tl.render(0, true, true);   // dựng trạng thái khung 0 (lần tua đầu về 0 không gọi render)
        veKhung(0, true);
      });

      // Đo cỡ chữ của biển 3D (DIO.doChu → kiem_doan.py --do-chu): cỡ chữ hiển thị = chiều cao thân chữ chiếu lên khung 1080
      api.doChu3d = function (t) {
        return d3.bien.map(function (b) {
          var a = b.tam.clone().add(V3(0, b.cao / 2, 0)).project(camera), c = b.tam.clone().add(V3(0, -b.cao / 2, 0)).project(camera), m = b.tam.clone().project(camera);
          var x = (m.x + 1) / 2 * W, y = (1 - m.y) / 2 * H, px = Math.abs(a.y - c.y) / 2 * H;
          var trong = m.z < 1 && x > 0 && x < W && y > 0 && y < H && hienLuc(t);
          return { t: t, chu: b.chu, px: Math.round(px * 10) / 10, trong_khung: trong, x: Math.round(x), y: Math.round(y), w: 0, h: Math.round(px) };
        });
      };

      void rngGoc;
      return d3;
    };
  });
})();
