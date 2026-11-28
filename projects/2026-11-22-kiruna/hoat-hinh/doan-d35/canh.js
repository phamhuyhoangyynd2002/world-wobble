/* Đoạn d35 (diorama, cảnh ngoài trời 3D, hồi ức, 14,6 s) – "I went back once more, in June, for the light."
 * [cat-cung-doi-mua] CÙNG quảng trường, CÙNG góc máy mở đoạn như d32, giờ là hè: cỏ xanh, đá lát, nắng vàng thấp (mặt trời nửa đêm).
 * Wob (gi-lê vải mỏng kem, kính râm đẩy trên trán, áo khoác xanh cuộn dưới cuộn thảm trên nắp ba lô) bước vào đúng chỗ d32.
 * [luot-smootherstep] Mặt trời giấy lăn thấp dọc chân trời, không chạm xuống; thẻ late May – mid-July ở "late"; Wob quay người theo,
 * "at all." xoay một vòng chóng mặt. Nhiệt kế giấy trên cột đèn nhích lên; thẻ 13°C · 56°F ở "thirteen"; Wob nới cổ gi-lê.
 * "midnight": kim tháp đồng hồ về 12 giờ (không số), trời vẫn sáng vàng. "sunglasses": kéo kính xuống, đi dạo, bóng đổ dài trên đá.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, DUR = api.DUR;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && w.start < DUR && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // ["late May – mid-July", "13°C · 56°F"]
  // ---------------------------------------------------------------- khối chung d32/d35 (tập 6): QUẢNG TRƯỜNG MỚI KIRUNA, cảnh 3D
  // Cùng bố cục, cùng góc máy mở đoạn ở hai mùa (thẻ cat-cung-doi-mua): toà thị chính tròn mặt kính và đá (cách điệu, không chữ),
  // tháp đồng hồ khung sắt (mặt không số), cột đèn, băng ghế, đồi thấp phía nam. Mét; camera nhìn về −z (phía nam).
  function quangTruong6(api, data, o) {
    var he = o.mua === "he", THREE = window.THREE, C = api.C;
    var d3 = api.ngoaiTroi(he
      ? { anhSang: "dem-trang", mua: "he", suong: [30, 170], seed: 61, bong: { tam: [0, -6], rong: 30, sau: 24 } }
      : { anhSang: "dem", mua: "dong", suong: [26, 160], seed: 61, troiSang: { tren: "#3d5580", duoi: "#2a3448", manh: 1.45 }, bong: { tam: [0, -6], rong: 30, sau: 24 } });
    var toon = d3.vatLieu, R = api.rng(606);
    function hop(w, h, d, mat, x, y, z) { var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); return m; }

    // mặt quảng trường lát đá (hè) / tuyết phủ (đông: mặt đất tuyết mặc định, thêm vệt đá lộ quanh băng ghế)
    var daTex = d3.canvasTex(1024, 1024, function (g, W, H) {
      var r = api.rng(77); g.fillStyle = "#8d8a84"; g.fillRect(0, 0, W, H);
      for (var j = 0; j < 16; j++) for (var i = 0; i < 16; i++) {
        var l = 150 + r() * 40 | 0; g.fillStyle = "rgb(" + l + "," + (l - 4) + "," + (l - 10) + ")";
        g.fillRect(i * 64 + 3 + (j % 2) * 32, j * 64 + 3, 58, 58);
      }
      if (!he) { for (var s = 0; s < 260; s++) { g.fillStyle = "rgba(240,246,250," + (0.5 + r() * 0.4).toFixed(2) + ")"; g.beginPath(); g.ellipse(r() * W, r() * H, 20 + r() * 70, 10 + r() * 30, r() * 3, 0, Math.PI * 2); g.fill(); } }
    }, [7, 7]);
    var nenDa = new THREE.Mesh(new THREE.CircleGeometry(he ? 15 : 4.5, 64), toon({ map: daTex }));
    nenDa.rotation.x = -Math.PI / 2; nenDa.position.set(he ? 0 : 1.2, 0.02, he ? -7 : -1.4); d3.them(nenDa, { doBong: false });

    // toà thị chính tròn (cách điệu): trụ kính + đá, cửa sổ sáng ấm mùa đông, kính phản trời mùa hè
    var TH = { x: -10, z: -25, r: 8, h: 6.6 };
    function veMat(g, W, H, phat) {
      var r = api.rng(91);
      g.fillStyle = phat ? "#000000" : "#b3ab9c"; g.fillRect(0, 0, W, H);
      for (var i = 0; i < 48; i++) {
        var x = i * (W / 48) + 5, w = W / 48 - 10;
        for (var k = 0; k < 2; k++) {
          var y0 = 70 + k * 190, hh = 170, sang = r() < 0.62;
          if (phat) { g.fillStyle = !he && sang ? "#ffd27a" : "#000000"; g.fillRect(x, y0, w, hh); continue; }
          if (he) { var gr = g.createLinearGradient(0, y0, 0, y0 + hh); gr.addColorStop(0, "#cfe1ef"); gr.addColorStop(1, "#86a9c4"); g.fillStyle = gr; }
          else g.fillStyle = sang ? "#f6cf7c" : "#2c3d5a";
          g.fillRect(x, y0, w, hh);
          g.fillStyle = "rgba(255,255,255,0.25)"; g.fillRect(x + 4, y0 + 6, 5, hh - 12);
        }
      }
      if (!phat) { g.fillStyle = "#8c8476"; g.fillRect(0, 0, W, 50); g.fillRect(0, 446, W, 66); g.fillStyle = "#2b2622"; g.fillRect(0, 248, W, 12); }
    }
    var matTH = toon({ map: d3.canvasTex(2048, 512, function (g, W, H) { veMat(g, W, H, false); }) });
    matTH.emissive = new THREE.Color("#ffffff"); matTH.emissiveMap = d3.canvasTex(2048, 512, function (g, W, H) { veMat(g, W, H, true); }); matTH.emissiveIntensity = he ? 0 : 0.85;
    var th = new THREE.Mesh(new THREE.CylinderGeometry(TH.r, TH.r, TH.h, 64, 1, true), matTH); th.position.set(TH.x, TH.h / 2, TH.z); d3.them(th);
    var nap = new THREE.Mesh(new THREE.CylinderGeometry(TH.r + 0.35, TH.r + 0.35, 0.5, 64), toon({ color: he ? "#7d766b" : "#f1f4f6" })); nap.position.set(TH.x, TH.h + 0.25, TH.z); d3.them(nap);
    var nap2 = new THREE.Mesh(new THREE.CylinderGeometry(TH.r * 0.55, TH.r * 0.7, 1.1, 48), toon({ color: he ? "#b3ab9c" : "#e9eef2" })); nap2.position.set(TH.x, TH.h + 1.0, TH.z); d3.them(nap2);

    // tháp đồng hồ khung sắt cũ (đứng cạnh), mặt đồng hồ chỉ kim + vạch
    var TD = { x: 5.6, z: -15, h: 6.2 }, sat = toon({ color: "#3d4248" }), sat2 = toon({ color: "#55504a" });
    var thap = new THREE.Group(); thap.position.set(TD.x, 0, TD.z);
    [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]].forEach(function (q) { var c = hop(0.16, TD.h, 0.16, sat, q[0] * 0.85, TD.h / 2, q[1] * 0.85); c.rotation.z = -q[0] * 0.025; c.rotation.x = q[1] * 0.025; thap.add(c); });
    for (var k = 0; k < 4; k++) {
      var y = 0.9 + k * 1.35;
      thap.add(hop(1.6, 0.09, 0.09, sat, 0, y, 0.7)); thap.add(hop(1.6, 0.09, 0.09, sat, 0, y, -0.7));
      thap.add(hop(0.09, 0.09, 1.6, sat, 0.7, y, 0)); thap.add(hop(0.09, 0.09, 1.6, sat, -0.7, y, 0));
      var ch = hop(0.07, 1.9, 0.07, sat, 0, y + 0.67, 0.7); ch.rotation.z = (k % 2 ? 1 : -1) * 0.72; thap.add(ch);
    }
    thap.add(hop(2.1, 1.9, 2.1, sat2, 0, TD.h + 0.95, 0));
    var mai = new THREE.Mesh(new THREE.ConeGeometry(1.75, 1.5, 4), toon({ color: he ? "#3f5a4a" : "#eef2f5" })); mai.rotation.y = Math.PI / 4; mai.position.set(0, TD.h + 2.65, 0); thap.add(mai);
    d3.them(thap);
    var dh = d3.dongHo(TD.x, TD.h + 0.95, TD.z + 1.06, { r: 0.78, den: false, vien: "#2b3036", gio: o.gio || 11, phut: o.phut || 50 });

    // băng ghế + cột đèn mới (đèn vàng mùa đông, tắt mùa hè), vài cột đèn xa
    var BG = { x: 0.9, z: -1.6 }, go = toon({ color: "#8a5a3b" }), chan = toon({ color: "#2f3337" });
    var ghe = new THREE.Group(); ghe.position.set(BG.x, 0, BG.z);
    ghe.add(hop(1.9, 0.08, 0.5, go, 0, 0.46, 0)); ghe.add(hop(1.9, 0.38, 0.06, go, 0, 0.8, -0.24));
    [-0.82, 0.82].forEach(function (x) { ghe.add(hop(0.07, 0.46, 0.46, chan, x, 0.23, 0)); ghe.add(hop(0.07, 0.62, 0.07, chan, x, 0.72, -0.24)); });
    if (!he) ghe.add(hop(0.5, 0.06, 0.46, toon({ color: "#f3f6f8" }), 0.62, 0.52, 0));
    d3.them(ghe);
    var bongDen = [];
    function cotDen(x, z, s) {
      var g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(s || 1);
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 4.2, 10), chan)); g.children[0].position.y = 2.1;
      var tay = hop(0.7, 0.06, 0.06, chan, -0.32, 4.15, 0); g.add(tay);
      var chao = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.26, 14), chan); chao.position.set(-0.62, 4.06, 0); g.add(chao);
      var bong = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 8), new THREE.MeshBasicMaterial({ color: he ? "#d9d3c4" : "#ffe2a0" })); bong.position.set(-0.62, 3.9, 0); g.add(bong);
      d3.them(g);
      if (!he) {
        var choa = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.9), new THREE.MeshBasicMaterial({ map: d3.softTex("rgba(255,214,140,0.55)", "rgba(255,214,140,0)"), transparent: true, depthWrite: false }));
        choa.position.set(x - 0.62 * (s || 1), 3.9 * (s || 1), z + 0.12); choa.layers.set(1); d3.scene.add(choa);
        var vung = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), new THREE.MeshBasicMaterial({ map: d3.softTex("rgba(255,200,120,0.42)", "rgba(255,200,120,0)"), transparent: true, depthWrite: false }));
        vung.rotation.x = -Math.PI / 2; vung.position.set(x - 0.62 * (s || 1), 0.04, z); vung.layers.set(1); d3.scene.add(vung);
      }
      bongDen.push(g); return g;
    }
    var DEN = { x: 2.55, z: -1.75 };
    cotDen(DEN.x, DEN.z); cotDen(-7.5, -9); cotDen(10, -7); cotDen(-1.5, -14);

    // xa: cây lá kim, đồi thấp phía nam, đống tuyết (đông)
    [[-17, -15], [-19, -9], [15, -19], [18, -12], [22, -24], [-24, -30]].forEach(function (p, i) { d3.cay(p[0], p[1], { cao: 5 + (i % 3), loai: "thong", seed: i + 3 }); });
    d3.nui([{ x: -75, z: -165, r: 55, cao: 14, loai: "doi" }, { x: 5, z: -185, r: 70, cao: 12, loai: "doi" }, { x: 85, z: -170, r: 55, cao: 17, loai: "doi" }]);
    if (!he) { d3.dongTuyet(-5.5, -4.5, { r: 1.2, cao: 0.45 }); d3.dongTuyet(7.5, -3.5, { r: 1.5, cao: 0.5 }); d3.dongTuyet(-12, -11, { r: 1.8, cao: 0.6 }); }

    // mặt trời giấy (không mặt): tấm tròn có tia, không sương, đặt rất xa ở phía nam
    var mtTex = d3.canvasTex(512, 512, function (g, W) {
      g.translate(W / 2, W / 2); g.lineJoin = "round";
      g.fillStyle = "#f2b33d"; g.strokeStyle = C.INK; g.lineWidth = 12;
      g.beginPath(); for (var i = 0; i < 24; i++) { var a = i / 24 * Math.PI * 2, rr = i % 2 ? W * 0.33 : W * 0.46; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } g.closePath(); g.fill(); g.stroke();
      g.fillStyle = "#f7c95a"; g.beginPath(); g.arc(0, 0, W * 0.29, 0, Math.PI * 2); g.fill(); g.stroke();
    });
    var matTroi = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial({ map: mtTex, transparent: true, fog: false }));
    matTroi.position.set(20, -9, -100); d3.scene.add(matTroi);   // trước các đồi (đồi tròn r 55–70 lấn tới z ≈ −110)

    var goc = function (side, x, y) {
      var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
      var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
      var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
    };
    return { d3: d3, dh: dh, matTroi: matTroi, BG: BG, DEN: DEN, TD: TD, TH: TH, goc: goc, THREE: THREE };
  }
  // thẻ giấy phẳng theo khung (chữ chỉ từ chu_tren_do_vat), bật lên bằng scale quanh tâm
  function theGiay6(api, chu, cx, cy, co, goc) {
    var w = Math.round(chu.length * co * 0.6 + 80), h = Math.round(co * 1.75), C = api.C;
    var ov = api.div("dio-ovl", api.root, "z-index:41;");
    ov.setAttribute("data-layout-allow-occlusion", "");
    ov.innerHTML = '<svg width="1920" height="1080" viewBox="0 0 1920 1080" style="position:absolute;left:0;top:0;overflow:visible" data-layout-allow-overflow>' +
      '<g transform="translate(' + cx + " " + cy + ") rotate(" + (goc || 0) + ')"><g class="the6">' +
      '<rect x="' + (-w / 2 + 8) + '" y="' + (-h / 2 + 10) + '" width="' + w + '" height="' + h + '" rx="10" fill="rgba(20,14,8,.35)"/>' +
      '<rect x="' + (-w / 2) + '" y="' + (-h / 2) + '" width="' + w + '" height="' + h + '" rx="10" fill="#EFE3C8" stroke="' + C.INK + '" stroke-width="6"/>' +
      '<rect x="-46" y="' + (-h / 2 - 16) + '" width="92" height="30" fill="rgba(230,214,170,.85)" stroke="rgba(120,100,70,.5)" stroke-width="2" transform="rotate(-4)"/>' +
      api.txt(0, Math.round(co * 0.36), co, 800, chu, C.INK) + "</g></g></svg>";
    var el = ov.querySelector(".the6");
    gsap.set(el, { opacity: 0, scale: 0.6, svgOrigin: "0 0" });
    return {
      vao: function (t) { api.tl.set(el, { opacity: 1 }, t); api.tl.to(el, { scale: 1, svgOrigin: "0 0", duration: 0.32, ease: "back.out(2.2)" }, t); },
      ra: function (t) { api.tl.to(el, { opacity: 0, scale: 0.85, svgOrigin: "0 0", duration: 0.25, ease: "power2.in" }, t); }
    };
  }
  // ---------------------------------------------------------------- hết khối chung ngoài trời
  var Q = quangTruong6(api, data, { mua: "he", gio: 11, phut: 55 });
  var d3 = Q.d3, goc = Q.goc, DEN = Q.DEN;
  d3.hoaCo({ x0: -22, x1: 22, z0: -30, z1: 8, n: 260, seed: 35, bo: function (x, z) { return Math.hypot(x, z + 7) < 15.5; } });

  var w = d3.wob({ x: -7.8, z: 1.0, sang: 0.08 });
  api.doKiruna(w, { giLe: true, kinhRam: "tran" });
  w.pack.children[0].insertAdjacentHTML("afterend", '<rect x="266" y="94" width="88" height="28" rx="14" fill="#3D5A80" stroke="' + api.C.INK + '" stroke-width="6"/>');   // áo khoác cuộn dưới cuộn thảm

  // ---------------------------------------------------------------- bước vào (cùng chỗ, cùng góc với d32)
  api.walk(w, 0.15, 2.9, -1.6, 1.0, { face: 0.7, endFace: 0.2, step: 0.3 });
  api.blinks(w, 0.3, 3.4);
  api.look(w, 3.0, -8, -6, 0.25);

  // [luot-smootherstep] mặt trời giấy lăn thấp dọc chân trời (không chạm xuống); Wob quay theo
  var tLate = tu.late || 3.83, tAll = tu.all || 7.41;
  var MT = Q.matTroi, S0 = tLate - 0.4, S1 = tAll + 0.3;
  MT.scale.setScalar(1.6);
  var sm = function (x) { x = Math.max(0, Math.min(1, x)); return x * x * x * (x * (x * 6 - 15) + 10); };
  d3.moiKhung(function (t) {
    var u = sm((t - S0) / (S1 - S0));
    MT.position.set(-36 + 80 * u, 7.5 + 1.9 * Math.sin(u * Math.PI * 3), -100);
    MT.rotation.z = -u * Math.PI * 2;                                         // lăn
  });
  var the1 = theGiay6(api, chu[0], 560, 200, 58, -2);
  the1.vao(tLate); the1.ra(tAll + 0.45);
  [[S0 + 0.2, -0.6, -12], [S0 + 1.3, -0.25, -6], [S0 + 2.4, 0.2, 4], [S0 + 3.3, 0.6, 12]].forEach(function (k) { api.quay(w, k[0], k[1], 0.5); api.look(w, k[0], k[2], -10, 0.4); });
  api.quay(w, tAll + 0.05, -1, 0.12); api.quay(w, tAll + 0.17, 1, 0.12); api.quay(w, tAll + 0.29, 0, 0.16);   // xoay một vòng
  api.hop(w, tAll + 0.05, 14, 0.32);
  api.look(w, tAll + 0.45, 0, 0, 0.1); api.lids(w, tAll + 0.45, 0.35, 0.1); api.blink(w, tAll + 0.75, 0.35);
  api.nghieng(w, tAll + 0.45, 5, 0.15); api.nghieng(w, tAll + 0.75, -4, 0.15); api.nghieng(w, tAll + 1.0, 0, 0.2);

  // nhiệt kế trên cột đèn nhích lên; thẻ 13°C · 56°F ở "thirteen"; nới cổ gi-lê
  var nk = d3.nhietKe(DEN.x + 0.02, DEN.z + 0.14, { cao: 1.05, w: 0.42, h: 0.95, muc0: 0.3 });
  var tThir = tu.thirteen || 9.15;
  api.walk(w, 7.95, 8.75, DEN.x - 1.0, DEN.z + 0.75, { face: 0.6, endFace: 0.3, step: 0.27 });
  nk.muc(tThir - 0.55, 0.6, 0.64);
  api.look(w, tThir - 0.5, 12, -10, 0.2);
  var the2 = theGiay6(api, chu[1], 560, 200, 66, -2);
  the2.vao(tThir); the2.ra(10.65);
  var tNoi = tThir + 0.45;
  api.armTo(w, "R", tNoi, 0.2, goc("R", 232, 262), "power2.out");
  [0, 1, 2].forEach(function (i) { api.armTo(w, "R", tNoi + 0.2 + i * 0.16, 0.16, goc("R", i % 2 ? 236 : 222, i % 2 ? 252 : 270), "sine.inOut"); });
  api.armTo(w, "R", tNoi + 0.75, 0.25, -6, "power2.inOut");
  api.look(w, tNoi, 0, 2, 0.15); api.lids(w, tNoi + 0.1, 0.5, 0.2); api.lids(w, tNoi + 0.9, 0.15, 0.2);

  // "midnight": kim tháp đồng hồ về 12 giờ, trời vẫn sáng vàng
  var tMid = tu.midnight || 11.03;
  Q.dh.chay(tMid - 0.1, tMid + 0.35, [11, 55], [12, 0]);
  api.look(w, tMid - 0.2, 12, -16, 0.25);
  // "sunglasses": kéo kính xuống, đi dạo, bóng đổ dài
  var tSun = tu.sunglasses || 12.50;
  api.armTo(w, "L", tSun - 0.25, 0.15, goc("L", 150, 120), "power2.out");
  w.deoKinh(tSun - 0.12, 0.18, false);
  api.armTo(w, "L", tSun + 0.1, 0.2, 6, "power2.inOut");
  api.walk(w, 11.75, DUR - 0.1, 4.2, 0.6, { face: 0.6, endFace: 0.5, step: 0.33 });
  api.look(w, 11.8, 8, 0, 0.2);
  api.look(w, tu.like ? tu.like - 0.1 : 13.74, -4, 2, 0.2);                 // "felt like cheating": liếc ống kính
  api.lids(w, tu.like ? tu.like - 0.1 : 13.74, 0.3, 0.15);

  // ---------------------------------------------------------------- camera (khung mở giống d32)
  d3.cameraDuong([
    { pos: [-6.2, 1.8, 8.6], nhin: [0.6, 1.9, -6] },
    { tu: 0.4, den: 3.0, kieu: "luot", pos: [-5.0, 1.7, 8.0], nhin: [0.0, 1.7, -4], day: 0.0007 },
    { tu: 7.9, den: 9.0, kieu: "luot", pos: [-0.4, 1.25, 4.0], nhin: [2.0, 1.15, -1.6], day: 0.0012 },
    { tu: 10.6, den: 11.3, kieu: "luot", pos: [-0.4, 1.6, 4.6], nhin: [3.6, 3.6, -8] },
    { tu: 11.7, den: 12.9, kieu: "luot", pos: d3.theo(w, [-2.4, 0.75, 4.4]), nhin: d3.theo(w, [0.5, 0.55, -1.0]), day: 0.001 }
  ], { day: 0.0007 });
  api.breathe(w, 0, DUR);
};
