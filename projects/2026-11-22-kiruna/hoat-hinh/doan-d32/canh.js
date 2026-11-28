/* Đoạn d32 (diorama, cảnh ngoài trời 3D, hồi ức, 15,16 s) – "That December, I went back for the dark."
 * Vào cat, ra cat. [cat-cung-doi-mua] Quảng trường mới Kiruna tháng 12: tối xanh, đèn đường vàng, tuyết dày; góc máy mở đoạn
 * GIỐNG HỆT d35 (tháng 6). Wob (áo phao xanh lam, mũ len xanh lá thông, khăn kem sọc hai vòng) bước vào từ trái, tuyết lạo xạo.
 * "below the horizon": mặt trời giấy ló nửa mép ở chân trời phía nam rồi thụt xuống; thẻ ~11 Dec – 1 Jan.
 * [day-vao-cham] Wob ngồi băng ghế dưới cột đèn, ôm người, run. "noon": kim tháp đồng hồ về 12 giờ (không số).
 * "pink": mép trời ửng hồng; Wob kéo khoá áo xuống một nấc, dang tay ngửa mặt như tắm nắng (KHÔNG kính râm).
 * "gave up": hồng tắt, Wob kéo khoá lên tận dưới mắt, ôm người lại, tỉnh bơ.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, DUR = api.DUR;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && w.start < DUR && tu[k] == null) tu[k] = w.start; }); });
  var chu = data.chu_tren_do_vat; // ["~11 Dec – 1 Jan"]
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
  var Q = quangTruong6(api, data, { mua: "dong", gio: 11, phut: 55 });
  var d3 = Q.d3, goc = Q.goc, BG = Q.BG;
  d3.tuyetRoi({ n: 1100, toc: 0.5, co: 0.045 });

  var w = d3.wob({ x: -7.8, z: 1.0, sang: 0.45, trangPhuc: { mu: true, khan: true, muMau: "#4F7A5A", muVanh: "#3A5C43", muBong: "#F6EEDC" } });
  api.doKiruna(w, { aoPhao: true, khanSoc: true, khan2: true });
  api.lidsSet(w, 0.3);

  // ---------------------------------------------------------------- bước vào (cùng chỗ, cùng góc với d35)
  api.walk(w, 0.15, 2.9, -1.6, 1.0, { face: 0.7, endFace: 0.2, step: 0.3, sfx: "buoc-tuyet", vol: 0.3 });
  api.blinks(w, 0.3, 4.2);
  // "below the horizon": mặt trời giấy ló nửa mép rồi thụt xuống
  var tBelow = tu.below || 4.90;
  var MT = Q.matTroi, Y0 = -9, Y1 = 0.3;
  MT.scale.setScalar(1.4);
  d3.moiKhung(function (t) {
    var y = Y0;
    if (t > tBelow - 0.35 && t < tBelow + 1.6) {
      var u = (t - (tBelow - 0.35)) / 0.6, v = (t - (tBelow + 0.55)) / 0.9;
      var e = function (x) { x = Math.max(0, Math.min(1, x)); return x * x * x * (x * (x * 6 - 15) + 10); };
      y = Y0 + (Y1 - Y0) * (e(u) - e(v));
    }
    MT.position.y = y;
  });
  api.look(w, tBelow - 0.3, 12, -8, 0.25); api.lids(w, tBelow - 0.3, 0, 0.15);
  api.look(w, tBelow + 0.9, 8, 6, 0.3); api.lids(w, tBelow + 0.9, 0.4, 0.2);   // thụt xuống: mí sụp
  var the = theGiay6(api, chu[0], 520, 210, 62, -2);
  the.vao(tu.eleventh ? tu.eleventh - 0.1 : 6.3); the.ra(9.05);

  // ---------------------------------------------------------------- [day-vao-cham] ngồi băng ghế dưới cột đèn, ôm người, run
  var tNgoi = 9.55;
  api.walk(w, 8.45, tNgoi - 0.05, BG.x - 0.1, BG.z + 0.34, { face: 0.5, endFace: 0, step: 0.27, sfx: "buoc-tuyet", vol: 0.25 });
  tl.to(w.pos, { y: 0.24, duration: 0.18, ease: "power2.out" }, tNgoi);
  tl.to(w.pos, { y: 0.2, duration: 0.12, ease: "power1.in" }, tNgoi + 0.18);
  api.armTo(w, "L", tNgoi + 0.25, 0.25, goc("L", 262, 300), "power2.out");
  api.armTo(w, "R", tNgoi + 0.25, 0.25, goc("R", 138, 300), "power2.out");
  api.shiver(w, tNgoi + 0.5, 11.6, 2.2);
  api.sfx("brr", tNgoi + 0.5, 0.3);
  api.look(w, tNgoi + 0.3, 0, 4, 0.2);

  // "noon": kim tháp đồng hồ về 12 giờ; Wob ngẩng nhìn
  var tNoon = tu.noon || 12.0;
  Q.dh.chay(tNoon - 0.25, tNoon + 0.15, [11, 55], [12, 0]);
  api.look(w, tNoon - 0.3, 10, -14, 0.25);
  api.blink(w, tNoon + 0.5, 0.2);

  // "pink": mép trời ửng hồng, kéo khoá xuống một nấc, dang tay ngửa mặt như tắm nắng
  var tPink = tu.pink || 13.11;
  d3.anhSang(tPink - 0.2, tPink + 0.45, "dem-hong", 1);
  w.keoKhoa(tPink - 0.05, 0.25, -1);
  api.armTo(w, "L", tPink - 0.05, 0.3, goc("L", 6, 150), "power2.out");
  api.armTo(w, "R", tPink - 0.05, 0.3, goc("R", 394, 150), "power2.out");
  api.nghieng(w, tPink, -5, 0.3);
  api.look(w, tPink, 6, -16, 0.25);
  api.lids(w, tPink + 0.05, 0.62, 0.3);                                  // mắt lim dim như phơi nắng
  // "gave up": hồng tắt, kéo khoá lên tận dưới mắt, ôm người lại
  var tGave = tu.gave || 14.49;
  d3.anhSang(tGave - 0.15, tGave + 0.4, "dem", 1);
  api.lids(w, tGave - 0.1, 0, 0.1);
  w.keoKhoa(tGave + 0.05, 0.3, 1);
  api.nghieng(w, tGave + 0.05, 0, 0.2);
  api.armTo(w, "L", tGave + 0.05, 0.25, goc("L", 262, 300), "power2.inOut");
  api.armTo(w, "R", tGave + 0.05, 0.25, goc("R", 138, 300), "power2.inOut");
  api.look(w, tGave + 0.1, 0, 2, 0.15);
  api.lids(w, tGave + 0.4, 0.45, 0.15);                                  // tỉnh bơ

  // ---------------------------------------------------------------- camera
  d3.cameraDuong([
    { pos: [-6.2, 1.8, 8.6], nhin: [0.6, 1.9, -6] },
    { tu: 0.4, den: 3.0, kieu: "luot", pos: [-5.0, 1.7, 8.0], nhin: [0.0, 1.7, -4], day: 0.0007 },
    { tu: 8.9, den: 10.2, kieu: "luot", pos: [-1.3, 1.3, 3.9], nhin: [1.0, 1.25, -1.5], day: 0.0012 },
    { tu: tPink - 0.1, den: tPink + 0.5, kieu: "em", pos: [-1.1, 1.25, 3.6], nhin: [1.0, 1.4, -1.5] }
  ], { day: 0.0007 });
  api.breathe(w, 0, DUR);
};
