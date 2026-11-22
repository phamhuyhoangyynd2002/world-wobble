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
    "dem": { troiDinh: "#16233a", chanTroi: "#3a4d6b", nang: { huong: [-20, 30, 10], mau: "#9fb6ff", manh: 0.7 }, troiSang: { tren: "#3d5580", duoi: "#2a3448", manh: 0.9 }, cuaSo: 2.6 }
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

    // ================================================================ api.ngoaiTroi
    api.ngoaiTroi = function (o) {
      var THREE = window.THREE;
      if (!THREE) { console.error("[dio-3d] chưa có window.THREE: khung thiếu <script type=\"module\" src=\"lib/dio-3d-nap.js\">"); return null; }
      if (api.d3) { console.error("[dio-3d] mỗi đoạn chỉ một cảnh ngoài trời (api.d3 đã có)"); return api.d3; }
      o = o || {};
      var preset = ANH_SANG[o.anhSang || "trua-dong"] || ANH_SANG["trua-dong"];
      var cfg = Object.assign({ suong: [14, 95], muc: 4.6, mucTan: [45, 120], fov: 34, vienToi: 0.35, nen: "tuyet", seed: 7, bong: { tam: [0, 0], rong: 35, sau: 20 } }, preset, o);
      var W = api.data.rong || 1920, H = api.data.cao || 1080, FPS = api.fps;
      var V3 = function (x, y, z) { return new THREE.Vector3(x, y, z); };
      var rngGoc = api.rng(cfg.seed);

      var d3 = (api.d3 = { THREE: THREE, cfg: cfg, wobs: [], bien: [] });
      d3.rng = function (seed) { return api.rng(seed); };

      // ---------------------------------------------------------------- renderer, sân khấu
      var stage = api.div("dio-ovl dio-3d", api.root, "z-index:1;");
      d3.stage = stage;
      var renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
      renderer.setPixelRatio(1); renderer.setSize(W, H);
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
      function logTex(base, seed) {
        var key = base + "|" + (seed % 3);
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
          for (var s = 0; s < 120; s++) { g.fillStyle = "rgba(240,246,248," + (0.3 + r() * 0.5).toFixed(2) + ")"; g.beginPath(); g.ellipse(r() * w, h - r() * r() * 70, 3 + r() * 9, 2 + r() * 4, 0, 0, Math.PI * 2); g.fill(); }
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

      // ---------------------------------------------------------------- trời, ánh sáng
      var sky = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), new THREE.ShaderMaterial({
        side: THREE.BackSide, depthWrite: false, fog: false,
        uniforms: { top: { value: new THREE.Color(cfg.troiDinh) }, hor: { value: HORIZON } },
        vertexShader: "varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",
        fragmentShader: "uniform vec3 top; uniform vec3 hor; varying vec3 vP; void main(){ float h = clamp(normalize(vP).y * 2.2, 0., 1.); gl_FragColor = vec4(mix(hor, top, pow(h, .7)), 1.); }"
      }));
      sky.layers.set(L_KHONG_MUC); scene.add(sky);
      scene.add(new THREE.HemisphereLight(cfg.troiSang.tren, cfg.troiSang.duoi, cfg.troiSang.manh));
      var sun = new THREE.DirectionalLight(cfg.nang.mau, cfg.nang.manh);
      var bt = cfg.bong.tam, hu = cfg.nang.huong;
      sun.position.set(bt[0] + hu[0], hu[1], bt[1] + hu[2]); sun.target.position.set(bt[0], 0, bt[1]);
      sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
      Object.assign(sun.shadow.camera, { left: -cfg.bong.rong, right: cfg.bong.rong, top: cfg.bong.sau, bottom: -cfg.bong.sau, near: 1, far: 140 });
      sun.shadow.bias = -0.0008; sun.shadow.normalBias = 0.03;
      sun.shadow.camera.layers.enableAll();                     // tấm Wob (lớp không viền) vẫn đổ bóng
      scene.add(sun, sun.target);
      d3.nang = sun;

      // ---------------------------------------------------------------- mặt đất
      var ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), cfg.nen === "tuyet" ? toon({ map: snowTex }) : toon({ color: cfg.nen }));
      ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

      // ================================================================ dựng cảnh từ tham số
      // Đường: tâm (x, z), dài theo trục x, rộng theo z, xoay yaw (rad)
      d3.duong = function (p) {
        p = Object.assign({ x: 0, z: 0, dai: 120, rong: 5, yaw: 0 }, p || {});
        var m = new THREE.Mesh(new THREE.PlaneGeometry(p.dai, p.rong), toon({ map: roadTex }));
        m.rotation.set(-Math.PI / 2, 0, p.yaw); m.position.set(p.x, 0.01, p.z); m.receiveShadow = true; scene.add(m);
        return m;
      };

      // Cột khói liền một khối: các cục cầu chồng nhau, viền mực chung (lớp khói chỉ có viền ngoài), bốc theo t.
      // o: cao, r0, no (độ nở), troi (trôi ngang theo +x), n, per (giây một vòng), mau, seed, t0/t1 (bật/tắt, mờ trong 0,5 s)
      var KHOI_GEO = new THREE.IcosahedronGeometry(1, 2);
      var FNS = [];   // hàm chạy mỗi khung trước khi chụp (nội bộ trước, của canh.js sau)
      d3.khoi = function (x, y, z, p) {
        p = Object.assign({ cao: 9, r0: 0.32, no: 2.4, troi: 1.2, n: 18, per: 7, mau: "#f4f7f8", seed: 5, t0: null, t1: null }, p || {});
        var r = api.rng(p.seed), mat = toon({ color: p.mau }), puffs = [];
        for (var i = 0; i < p.n; i++) {
          var m = new THREE.Mesh(KHOI_GEO, mat); m.layers.set(L_KHOI); m.castShadow = false; m.receiveShadow = false; scene.add(m);
          puffs.push({ m: m, j: 0.85 + 0.3 * r(), ph: r() });
        }
        FNS.unshift(function (t) {
          var vis = 1;
          if (p.t0 != null) vis = Math.min(vis, Math.max(0, (t - p.t0) / 0.5));
          if (p.t1 != null) vis = Math.min(vis, Math.max(0, (p.t1 - t) / 0.5));
          for (var i = 0; i < puffs.length; i++) {
            var q = puffs[i], u = frac(t / p.per + i / p.n + q.ph * 0.02), rise = 1 - Math.pow(1 - u, 1.25);
            var s = p.r0 * q.j * (1 + p.no * u) * Math.min(1, u / 0.06) * (u > 0.7 ? (1 - u) / 0.3 : 1) * vis;
            q.m.visible = s > 0.005;
            q.m.position.set(x + p.troi * rise + p.r0 * 0.8 * Math.sin(2 * Math.PI * (u * 1.1 + q.ph)) * (0.3 + u), y + p.cao * rise, z + p.r0 * 0.5 * Math.cos(2 * Math.PI * (u * 0.9 + q.ph)));
            q.m.scale.setScalar(Math.max(0.001, s));
          }
        });
        return puffs;
      };

      // Nhà gỗ khúc mái phủ tuyết. Mặt tiền (cửa sổ, cửa) quay về +z cục bộ; yaw = Math.PI cho dãy nhà bên kia đường.
      // p: w, d, h, yaw, go (màu gỗ), khung (màu khung cửa sổ), cuaSo (số cửa sổ mặt tiền), cua (true), dongTuyet (true),
      //    khoi (true | false | {tham số d3.khoi}), seed
      var GO = ["#8a5a34", "#7a4e2c", "#946640", "#6f4a2e"];
      d3.nha = function (x, z, p) {
        p = Object.assign({ w: 7, d: 6, h: 3.1, yaw: 0, go: null, khung: C.TEAL, cuaSo: 2, cua: true, dongTuyet: true, khoi: true, seed: 1 }, p || {});
        var g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = p.yaw;
        var w = p.w, d = p.d, h = p.h, wallMat = toon({ map: logTex(p.go || GO[p.seed % GO.length], p.seed) });
        var body = boc(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat)); body.position.y = h / 2; g.add(body);
        // mái hai mái: hai đầu hồi gỗ, hai mái tuyết
        var rh = h * 0.55, sh = new THREE.Shape([new THREE.Vector2(-w / 2 - 0.5, 0), new THREE.Vector2(w / 2 + 0.5, 0), new THREE.Vector2(0, rh)]);
        var roof = boc(new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: d + 0.8, bevelEnabled: false }), [wallMat, toon({ map: roofTex })]));
        roof.position.set(0, h, -d / 2 - 0.4); g.add(roof);
        var eave = boc(new THREE.Mesh(new THREE.BoxGeometry(w + 1.0, 0.1, d + 0.8), toon({ color: "#5a3a22" })), true, true);
        eave.position.set(0, h + 0.02, 0); g.add(eave);
        // cửa sổ sáng ấm, khung sơn
        var glow = new THREE.MeshBasicMaterial({ color: new THREE.Color(C.WIN).multiplyScalar(cfg.cuaSo) }), frame = toon({ color: p.khung });
        var nWin = Math.max(0, p.cuaSo | 0), cuaX = p.cua ? (nWin % 2 ? w * 0.36 : 0) : null;
        for (var i = 0; i < nWin; i++) {
          var wx = nWin === 1 ? -w * 0.22 : lerp(-w * 0.32, w * 0.32, i / (nWin - 1));
          if (cuaX !== null && Math.abs(wx - cuaX) < 1.0) wx += wx < cuaX ? -0.6 : 0.6;
          var fr = boc(new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.25, 0.14), frame)); fr.position.set(wx, h * 0.55, d / 2 + 0.03); g.add(fr);
          var gl = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.9), glow); gl.position.set(wx, h * 0.55, d / 2 + 0.11); g.add(gl);
          var bar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.9, 0.04), frame); bar.position.set(wx, h * 0.55, d / 2 + 0.13); g.add(bar);
          var sill = boc(new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.12, 0.3), toon({ map: roofTex }))); sill.position.set(wx, h * 0.55 - 0.68, d / 2 + 0.12); g.add(sill);
        }
        if (cuaX !== null) {
          var door = boc(new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.9, 0.12), toon({ color: "#4a3122" }))); door.position.set(cuaX, 0.95, d / 2 + 0.04); g.add(door);
        }
        var ch = boc(new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.6), toon({ color: "#7d4a26" }))); ch.position.set(w * 0.22, h + rh * 0.6, 0); g.add(ch);
        if (p.dongTuyet) {
          var r = api.rng(p.seed * 13 + 1), snowMat = toon({ map: snowTex });
          for (var k = 0; k < 3; k++) {
            var dr = boc(new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8), snowMat), true, false);
            dr.scale.set(w * (0.18 + 0.1 * r()), 0.32 + 0.2 * r(), 0.55); dr.position.set(lerp(-w * 0.4, w * 0.4, k / 2) + (r() - 0.5), 0, d / 2 + 0.15); g.add(dr);
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
          ["x0", "x1", "z", "khoang", "lech"].forEach(function (k) { delete extra[k]; });
          extra.w = w; extra.h = lerp(p.h[0], p.h[1], r()); extra.yaw = p.yaw + (r() - 0.5) * 0.12; extra.seed = p.seed * 10 + i;
          out.push(d3.nha(x + w / 2, p.z + (r() - 0.5) * p.lech, extra));
          x += w + lerp(p.khoang[0], p.khoang[1], r()); i++;
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
            var m = new THREE.Mesh(new THREE.ConeGeometry(q.r, q.cao, 7), toon({ color: q.mau || "#a9b8c4" })); m.position.set(q.x, q.cao / 2 - 0.5, q.z); m.rotation.y = q.x * 0.37; scene.add(m);
            if (q.tuyet !== false) { var s = new THREE.Mesh(new THREE.ConeGeometry(q.r * 0.42, q.cao * 0.42, 7), toon({ color: "#f3f6f8" })); s.position.set(q.x, q.cao * 0.79 - 0.5, q.z); s.rotation.y = m.rotation.y; scene.add(s); }
          } else {
            var d = new THREE.Mesh(new THREE.SphereGeometry(q.r, 24, 12), toon({ color: q.mau || "#e9eef2" })); d.scale.y = (q.cao || q.r * 0.35) / q.r; d.position.set(q.x, -3, q.z); scene.add(d);
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
        } else {
          var goc = boc(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, p.cao * 0.3, 6), bark)); goc.position.y = p.cao * 0.15; g.add(goc);
          var leaf = toon({ color: "#3f5348" }), snow = toon({ color: "#eef3f5" });
          for (var k = 0; k < 3; k++) {
            var hh = p.cao * (0.45 - k * 0.08), rr = p.cao * (0.24 - k * 0.055), yy = p.cao * (0.22 + k * 0.24);
            var c = boc(new THREE.Mesh(new THREE.ConeGeometry(rr, hh, 8), leaf)); c.position.y = yy + hh / 2; g.add(c);
            var s = boc(new THREE.Mesh(new THREE.ConeGeometry(rr * 0.55, hh * 0.45, 8), snow)); s.position.y = yy + hh * 0.78; g.add(s);
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
        m.scale.set(p.r * p.dai, p.cao, p.r); m.position.set(x, 0, z); scene.add(m); return m;
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
      var K_TEX = 2.4;                                         // độ phân giải canvas (px canvas / px con rối)
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

      // d3.wob(o): o = {x, z (m), y (m, đứng trên vật cao), cao (m, hộp 400 px của con rối; mặc định 1,05), trangPhuc, huong}
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
        var mat = new THREE.MeshLambertMaterial({ map: A.t, alphaTest: 0.5, alphaToCoverage: true, side: THREE.DoubleSide });
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
      var mkRT = function (type, samples) { var rt = new THREE.WebGLRenderTarget(W, H, { type: type, samples: samples || 0 }); rt.depthTexture = new THREE.DepthTexture(W, H); return rt; };
      var rtMain = mkRT(THREE.HalfFloatType, 4), rtNorm = mkRT(THREE.UnsignedByteType, 0);
      var rtInk = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType });
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
          res: { value: new THREE.Vector2(W, H) }, cNear: { value: 0.1 }, cFar: { value: 400 }, inkW: { value: cfg.muc },
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
        uniforms: { tIn: { value: rtInk.texture }, tDM: { value: rtMain.depthTexture }, res: { value: new THREE.Vector2(W, H) }, cNear: { value: 0.1 }, cFar: { value: 400 },
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
