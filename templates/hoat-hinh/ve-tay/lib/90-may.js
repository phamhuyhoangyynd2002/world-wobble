/* ve-tay · bộ máy chạy một đoạn (composition "doan").
 * canh.js khai: window.CANH = function (VT, D) { return [ {a, b, ve: function (t, lt, T) { return {...}; }}, ... ]; }
 *  - a, b: giây từ đầu đoạn, shot phủ [a, b). Các shot nối liền phủ hết [0, D.thoi_luong].
 *  - ve(t, lt, T): t = thời gian đã nắn về bậc 12 hình/giây (dùng cho MỌI thứ trong world/over), lt = t - a,
 *    T = thời gian liên tục của khung (chỉ dùng cho camera nếu muốn camera mượt 30 khung).
 *  - trả về { cam: [cx, cy, zoom], shake: [dx, dy], world: SVG theo camera, over: SVG theo khung (vẫn qua nét sôi),
 *             tint: "warm" | "cold" | null, bg: màu nền thay giấy (tuỳ chọn) }.
 * Bộ máy: dựng SVG (giấy nền, filter nét sôi, camera, hạt giấy, lớp nối), đồng hồ GSAP (modifiers, chạy cả khi seek),
 * đăng ký window.__timelines["doan"]. world chỉ dựng lại khi bậc 12 hình/giây đổi; camera cập nhật mỗi khung.
 */
(function () {
  var VT = window.VT;

  /** Dựng danh sách shot từ canh.js + sfx tự động của kiểu nối (dùng chung cho trình duyệt và cong-cu/kiem_doan.mjs). */
  VT.dungShots = function (D) {
    VT._sfx = [];
    VT._chuSai = [];
    if (D.vao === "chen") VT.sfx("whoosh", 0, 0.45);
    if (typeof window.CANH !== "function") throw new Error("[ve-tay] canh.js chưa khai window.CANH");
    var shots = window.CANH(VT, D) || [];
    shots.sort(function (p, q) { return p.a - q.a; });
    VT.SHOTS = shots;
    return shots;
  };
  VT.timShot = function (T) {
    var s = VT.SHOTS;
    for (var i = 0; i < s.length; i++) if (T >= s[i].a && T < s[i].b) return i;
    return T < (s[0] ? s[0].a : 0) ? 0 : s.length - 1;
  };
  /** Gọi shot ở thời điểm T (liên tục). Trả {i, step, r}. */
  VT.veKhung = function (T) {
    var i = VT.timShot(T), sh = VT.SHOTS[i];
    var step = Math.floor(T * VT.DRAW_FPS + 1e-6), t = Math.max(sh.a, step / VT.DRAW_FPS);
    VT.resetUid();
    var r = sh.ve(t, t - sh.a, T) || {};
    return { i: i, step: step, r: r };
  };

  VT.chay = function () {
    var D = VT.data(), DUR = D.thoi_luong, NS = "http://www.w3.org/2000/svg";
    var root = document.getElementById("stage-wrap");
    var html =
      '<svg id="stage" xmlns="' + NS + '" viewBox="0 0 1920 1080" width="1920" height="1080">' +
      "<defs>" +
      '<filter id="boil" filterUnits="userSpaceOnUse" x="-20" y="-20" width="1960" height="1120" color-interpolation-filters="sRGB">' +
      '<feTurbulence id="boil-noise" type="fractalNoise" baseFrequency="0.024" numOctaves="2" seed="1" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G"/></filter>' +
      "</defs>" +
      '<image id="giay" x="0" y="0" width="1920" height="1080" preserveAspectRatio="none"/>' +
      '<rect id="bg" x="0" y="0" width="1920" height="1080" fill="none"/>' +
      '<g filter="url(#boil)" data-layout-allow-overflow="true"><g id="cam" data-layout-allow-overflow="true"></g><g id="over"></g></g>' +
      '<rect id="tint" x="0" y="0" width="1920" height="1080" fill="#F3D49B" opacity="0"/>' +
      '<image id="hat" x="0" y="0" width="1920" height="1080" preserveAspectRatio="none" opacity="0.55"/>' +
      '<g id="noi"></g>' +
      "</svg>";
    root.innerHTML = html;
    var camEl = document.getElementById("cam"), overEl = document.getElementById("over"), noiEl = document.getElementById("noi");
    var noise = document.getElementById("boil-noise"), tint = document.getElementById("tint"), bg = document.getElementById("bg");
    try {
      document.getElementById("giay").setAttribute("href", VT.giayNen(D.seed_giay || 1607));
      document.getElementById("hat").setAttribute("href", VT.giayHat(D.seed_giay || 1607));
    } catch (e) { console.error("[ve-tay] nền giấy:", e); }

    var ok = true;
    try { VT.dungShots(D); } catch (e) { ok = false; console.error(e); }
    var last = { i: -1, step: -1 }, lastOver = null, lastNoi = null;
    function draw(Tin, force) {
      var T = Math.max(0, Math.min(DUR - 1e-4, Tin));
      noiEl.innerHTML = VT.noiLop(T, D);
      if (!ok || !VT.SHOTS.length) return;
      var k;
      try { k = VT.veKhung(T); } catch (e) { console.error("[ve-tay] lỗi vẽ ở " + T.toFixed(3) + " s:", e); return; }
      var r = k.r, cam = r.cam || [960, 540, 1], sh = r.shake || [0, 0], z = cam[2] * VT.noiZoom(T, D);
      camEl.setAttribute("transform", "translate(" + VT.f(960 + sh[0]) + " " + VT.f(540 + sh[1]) + ") scale(" + Math.round(z * 10000) / 10000 + ") translate(" + VT.f(-cam[0]) + " " + VT.f(-cam[1]) + ")");
      if (force || k.i !== last.i || k.step !== last.step) {
        camEl.innerHTML = r.world || "";
        var ov = r.over || "";
        if (ov !== lastOver) { overEl.innerHTML = ov; lastOver = ov; }
        noise.setAttribute("seed", String(1 + (k.step % 6) * 17));
        tint.setAttribute("fill", r.tint === "cold" ? "#CFE3EE" : "#F3D49B");
        tint.setAttribute("opacity", r.tint === "warm" ? "0.12" : r.tint === "cold" ? "0.10" : "0");
        bg.setAttribute("fill", r.bg || "none");
        last = { i: k.i, step: k.step };
      }
    }
    draw(0, true);
    var clock = { v: 0 };
    var tl = gsap.timeline({ paused: true });
    // modifiers chạy trong chính bước render của tween, kể cả khi HyperFrames seek với suppressEvents.
    tl.to(clock, { v: DUR, duration: DUR, ease: "none", modifiers: { v: function (v) { draw(+v); return v; } } }, 0);
    window.__timelines = window.__timelines || {};
    window.__timelines["doan"] = tl;
    // Đăng ký ngay; font về thì vẽ lại khung hiện tại (document.fonts.load lúc dựng trang có thể treo).
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(tl.time(), true); });
    return tl;
  };
})();
