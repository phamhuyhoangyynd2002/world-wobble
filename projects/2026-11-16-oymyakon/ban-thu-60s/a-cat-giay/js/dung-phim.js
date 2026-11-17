/* Dựng cảnh + biên đạo bản thử A "cắt giấy có khớp" – World Wobble (16/11/2026).
   Một SVG 1920×1080: hiện tại (bàn kỷ vật) · hồi ức (làng tuyết, 3 lớp parallax) · cận cảnh cá.
   Toàn bộ chuyển động là khoá GSAP tất định (fromTo nối tiếp), không onUpdate, không Math.random, không hẹn giờ. */
(function () {
  "use strict";
  var D = window.DaoCu, RIG = window.WobRig, CANH = window.CANH, KH = window.KHAU_HINH, C = D.C, INK = D.INK;
  var paper = D.paper, line = D.line, rRect = D.rRect, rEll = D.rEll, rough = D.rough;
  var K = new RIG.Keys();
  var T = CANH.cut, SC = {};
  CANH.scenes.forEach(function (s) { SC[s.id] = s; });

  function g(id, inner, tr) { return "<g" + (id ? ' id="' + id + '"' : "") + (tr ? ' transform="' + tr + '"' : "") + ">" + inner + "</g>"; }
  function at(x, y, inner, extra) { return '<g transform="translate(' + x + "," + y + ")" + (extra || "") + '">' + inner + "</g>"; }
  function rotv(x, y, deg) { var a = deg * Math.PI / 180; return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]; }

  /* ================= HIỆN TẠI: bàn kỷ vật ================= */
  function buildPresent() {
    var wall = "";
    wall += '<rect x="-500" y="-400" width="2920" height="1700" fill="' + C.ground + '"/>';
    for (var i = 0; i < 16; i++) wall += paper(rRect(-480 + i * 190, -380, 96, 1600, 2.5, 300 + i), "#223234", { shadow: false });
    wall += '<rect x="-500" y="-400" width="2920" height="1700" fill="url(#half)" opacity="0.06"/>';
    // bảng ghim + mẩu giấy trắng (không chữ)
    wall += paper(rRect(620, 90, 420, 300, 2.5, 320), "#9C7A52", { stroke: true, sw: 5, half: 0.2 });
    wall += paper(rRect(650, 120, 140, 110, 2, 321), "#EFE3C8", { stroke: true, sw: 3, sx: 3, sy: 4 }) + '<circle cx="720" cy="128" r="7" fill="' + C.accent2 + '" stroke="' + INK + '" stroke-width="2"/>';
    wall += paper(rough([[820, 150], [990, 135], [1000, 260], [830, 272]], 2, 322), "#DCEBF0", { stroke: true, sw: 3, sx: 3, sy: 4 }) + '<circle cx="910" cy="146" r="7" fill="' + C.accent + '" stroke="' + INK + '" stroke-width="2"/>';
    wall += line("M 840 200 L 980 190 M 845 230 L 950 222", 3, INK, ' opacity="0.3"');
    wall += '<g transform="translate(905,215) scale(0.3)">' + D.sparkle(40, "#ffffff") + "</g>";
    wall += paper(rRect(680, 260, 120, 100, 2, 323), "#F3C27A", { stroke: true, sw: 3, sx: 3, sy: 4 });

    var cam = "";
    // ánh đèn ấm hắt lên tường (trong lớp cam để đi cùng đèn)
    cam += '<ellipse cx="720" cy="560" rx="900" ry="520" fill="url(#lampG)"/>';
    // mặt bàn gỗ
    cam += paper(rough([[-500, 770], [2420, 750], [2420, 1500], [-500, 1500]], 3, 330, 26), "#8E5B33", { sy: -6, shOp: 0.3 });
    for (var p = 0; p < 7; p++) cam += line("M -500 " + (800 + p * 46) + " C 400 " + (796 + p * 46) + " 1300 " + (808 + p * 46) + " 2420 " + (798 + p * 46), 3, "#5E3A20", ' opacity="0.45"');
    cam += line("M -500 772 L 2420 752", 6, "#B47A48", ' opacity="0.8"');
    cam += '<path d="M -500 760 L 2420 740 L 2420 1500 L -500 1500 Z" fill="url(#half)" opacity="0.07"/>';
    cam += '<ellipse cx="900" cy="900" rx="760" ry="200" fill="url(#lampG)" opacity="0.9"/>';
    // đèn bàn
    cam += at(210, 845, D.deskLamp());
    // sổ du lịch dựng trên giá
    var nb = "";
    nb += paper(rRect(1180, 700, 26, 110, 1.5, 340), C.woodDark, { stroke: true, sw: 4 }) + paper(rRect(1600, 700, 26, 110, 1.5, 341), C.woodDark, { stroke: true, sw: 4 });
    nb += paper(rRect(1084, 330, 632, 452, 2, 342), "#3F6A70", { stroke: true, sw: 6, sy: 10 });
    nb += paper(rRect(1100, 345, 300, 420, 1.5, 343), "#F6EEDC", { shadow: false, stroke: true, sw: 3 });
    nb += paper(rRect(1400, 345, 300, 420, 1.5, 344), "#F2E8D2", { shadow: false, stroke: true, sw: 3 });
    nb += at(1100, 345, D.villageSketch("p-sk"));
    nb += at(1400, 345, D.notesPage(62));
    nb += '<path d="M 1400 340 L 1400 772" stroke="' + INK + '" stroke-width="5"/>';
    nb += '<path d="M 1380 345 L 1400 345 L 1400 765 L 1380 765 Z" fill="#000" opacity="0.08"/>';
    // trang lật: mặt trước (bên trái) rồi mặt sau (bên phải)
    nb += g("p-flipA", paper(rRect(1100, 345, 300, 420, 1.5, 345), "#F4ECD8", { stroke: true, sw: 3, sx: 4, sy: 4 }) + at(1100, 345, D.notesPage(63)));
    nb += g("p-flipB", paper(rRect(1400, 345, 300, 420, 1.5, 346), "#EFE4CC", { stroke: true, sw: 3, sx: 4, sy: 4 }) + at(1400, 345, D.notesPage(64)));
    cam += nb;
    // hộp kỷ vật (mép phải)
    cam += at(1800, 1012, D.memoryBox());
    // chồng sách + cá mềm oặt + vũng nước (chỉ cảnh 5)
    cam += g("p-books", at(740, 880, D.bookStack()) + at(770, 1046, g("p-puddle", '<ellipse cx="0" cy="0" rx="70" ry="14" fill="#9FD3EA" stroke="' + INK + '" stroke-width="3" opacity="0.9"/>')) + at(740, 878, '<g transform="scale(0.85)">' + D.fishFloppy("p-flop") + "</g>"));
    // cá đông cứng nằm trên bàn (sau khi Wob buông tay)
    cam += g("p-fish", '<g transform="scale(1.15) translate(118,0)">' + D.fish({ seed: 3 }) + "</g>");
    // Wob hiện tại (cảnh 1) và Wob quấn chăn (cảnh 5)
    cam += RIG.svg("P", { holdL: g("P-fishL", '<g transform="translate(-100,0)">' + D.fish({ seed: 3 }) + "</g>") });
    cam += RIG.svg("Q", { blanket: true, holdR: g("Q-mugR", '<g transform="translate(0,40) scale(0.62)">' + D.teaMug("qmug") + "</g>") });
    return g("present", g("p-wall", wall) + g("p-cam", cam));
  }

  /* ================= HỒI ỨC: làng tuyết ================= */
  var SMOKE = [], PUFFS = [];
  function smokeEls(prefix, x, y, n, r, fill) {
    var s = "";
    for (var j = 0; j < n; j++) s += at(x, y, g(prefix + j, '<circle cx="0" cy="0" r="' + r + '" fill="' + (fill || "#F4F7F7") + '" stroke="' + INK + '" stroke-width="2" stroke-opacity="0.22"/>'));
    return s;
  }
  function buildMemory() {
    var far = "", mid = "", near = "";
    // ---- lớp xa (p = 0,35) ----
    far += '<circle cx="1300" cy="250" r="74" fill="#FFF4D6" stroke="' + INK + '" stroke-width="3" stroke-opacity="0.35"/>';
    far += '<circle cx="1300" cy="250" r="120" fill="#FFF4D6" opacity="0.25"/>';
    var hill1 = [[-900, 1500], [-900, 600]], hill2 = [[-900, 1500], [-900, 690]];
    for (var x = -900; x <= 3800; x += 160) { hill1.push([x, 560 + 46 * Math.sin(x / 410) + 20 * Math.sin(x / 130)]); hill2.push([x, 670 + 30 * Math.sin(x / 300 + 1) + 12 * Math.sin(x / 90)]); }
    hill1.push([3800, 1500]); hill2.push([3800, 1500]);
    far += paper(rough(hill1, 3, 401, 30), "#C9DCE5", { shadow: false, stroke: true, sw: 3 });
    for (var t = 0; t < 26; t++) far += at(-700 + t * 170 + (t % 3) * 40, 600 + (t % 4) * 22, '<g transform="scale(' + (0.5 + (t % 3) * 0.12) + ')">' + D.larch(150 + (t % 5) * 20, 410 + t) + "</g>");
    far += paper(rough(hill2, 3, 402, 30), "#E8F0F2", { shadow: false, stroke: true, sw: 3 });
    [[-300, 760], [420, 772], [980, 754], [1700, 768], [2350, 760], [2900, 774]].forEach(function (h, i) {
      far += at(h[0], h[1], '<g transform="scale(0.36)">' + D.logHouse({ w: 300, h: 170, seed: 420 + i }) + "</g>");
      var cx0 = h[0] + 28, y0 = h[1] - 94;
      far += '<path d="M ' + (cx0 - 7) + " " + y0 + " C " + (cx0 - 12) + " " + (y0 - 110) + " " + (cx0 - 4) + " " + (y0 - 220) + " " + (cx0 - 22) + " " + (y0 - 340) +
        " C " + (cx0 - 10) + " " + (y0 - 352) + " " + (cx0 + 10) + " " + (y0 - 352) + " " + (cx0 + 22) + " " + (y0 - 340) +
        " C " + (cx0 + 6) + " " + (y0 - 220) + " " + (cx0 + 13) + " " + (y0 - 110) + " " + (cx0 + 7) + " " + y0 + ' Z" fill="#FFFFFF" opacity="0.6"/>';
    });
    far += '<rect x="-900" y="700" width="4700" height="800" fill="#ffffff" opacity="0.28"/>';

    // ---- lớp giữa (p = 1): phố, nhà, quầy chợ, xe ----
    mid += paper(rough([[-1400, 872], [6600, 868], [6600, 2600], [-1400, 2600]], 3, 430, 30), C.snow, { shadow: false });
    mid += '<path d="M -1400 905 L 6600 900 L 6600 1000 L -1400 1004 Z" fill="#E1ECF1"/>';
    mid += line("M -1400 930 L 6600 926 M -1400 972 L 6600 968", 4, "#C3D6DF");
    mid += '<rect x="-1400" y="1004" width="8000" height="1600" fill="url(#halfW)" opacity="0.35"/>';
    // nhà nền (mờ sương)
    [[-260, 380, 230], [1480, 330, 200], [2640, 300, 190], [3620, 360, 220], [4560, 340, 210]].forEach(function (h, i) {
      mid += at(h[0], 872, D.logHouse({ w: h[1], h: h[2], seed: 440 + i, tone: "#8B6446" }));
    });
    SMOKE.push(["smkB", 8, 7]);
    mid += smokeEls("smkB", -260 + 380 * 0.235, 872 - 230 - 380 * 0.32 * 0.9, 7, 24);
    mid += smokeEls("smkC", 1480 + 330 * 0.235, 872 - 200 - 330 * 0.32 * 0.9, 7, 22); SMOKE.push(["smkC", 9, 7]);
    mid += smokeEls("smkD", 3620 + 360 * 0.235, 872 - 220 - 360 * 0.32 * 0.9, 7, 24); SMOKE.push(["smkD", 10, 7]);
    mid += '<rect x="-1400" y="200" width="8000" height="690" fill="#ffffff" opacity="0.32"/>';
    for (var w = 0; w < 6; w++) mid += at(-200 + w * 900, 760 + (w % 2) * 50, g("fog" + w, '<ellipse cx="0" cy="0" rx="420" ry="60" fill="url(#fogG)"/>'));
    // rào + thông
    mid += at(1180, 690, D.larch(300, 450)) + at(1760, 650, D.larch(360, 451)) + at(2700, 640, D.larch(340, 452));
    mid += at(1100, 874, D.fence(780, 460));
    // ---- nhà chính: nội thất · Wob trong nhà · mặt tiền khoét cửa sổ, cửa ra vào ----
    mid += '<rect x="300" y="480" width="720" height="400" fill="#3B2A1F"/>';
    mid += '<ellipse cx="420" cy="660" rx="120" ry="90" fill="#FFB86A" opacity="0.35"/>';
    mid += '<clipPath id="interiorClip"><rect x="300" y="480" width="720" height="400"/></clipPath>';
    mid += '<g clip-path="url(#interiorClip)">' + RIG.svg("N", { scarf: true }) + "</g>";
    var facade = "M 280 480 L 1040 480 L 1040 880 L 280 880 Z M 330 560 L 330 720 L 510 720 L 510 560 Z M 560 600 L 560 880 L 760 880 L 760 600 Z";
    mid += '<clipPath id="facadeClip"><path d="' + facade + '" clip-rule="evenodd"/></clipPath>';
    mid += '<path d="' + facade + '" fill="#0b1214" opacity="0.22" fill-rule="evenodd" transform="translate(7,9)"/>';
    mid += '<path d="' + facade + '" fill="' + C.wood + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    var logs = "";
    for (var ly = 504; ly < 880; ly += 26) logs += line("M 286 " + ly + " C 500 " + (ly + 3) + " 800 " + (ly - 2) + " 1034 " + (ly + 1), 3.5, "#3A2618", ' opacity="0.55"');
    logs += '<path d="M 280 480 L 1040 480 L 1040 880 L 280 880 Z" fill="url(#half)" opacity="0.15"/>';
    mid += '<g clip-path="url(#facadeClip)">' + logs + "</g>";
    mid += '<rect x="330" y="560" width="180" height="160" fill="#ffffff" opacity="0.16"/>';
    mid += line("M 350 700 L 410 580 M 380 712 L 440 592", 5, "#ffffff", ' opacity="0.45"');
    mid += '<rect x="330" y="560" width="180" height="160" fill="none" stroke="' + INK + '" stroke-width="10"/>' + line("M 420 560 L 420 720 M 330 640 L 510 640", 7);
    mid += paper(rRect(318, 718, 204, 18, 1.5, 470), C.snow, { stroke: true, sw: 4, sx: 3, sy: 4 });
    mid += g("m-door", paper(rRect(560, 600, 200, 280, 1.5, 471), "#5E3D27", { stroke: true, sw: 5, sx: 4, sy: 4 }) +
      line("M 610 612 L 610 870 M 660 612 L 660 870 M 710 612 L 710 870", 3, "#2E1D12", ' opacity="0.6"') + '<circle cx="738" cy="750" r="9" fill="#E8C66A" stroke="' + INK + '" stroke-width="3"/>');
    mid += '<rect x="556" y="596" width="208" height="288" fill="none" stroke="' + INK + '" stroke-width="7"/>';
    mid += paper(rough([[240, 478], [660, 272], [1080, 478], [1080, 497], [240, 497]], 3, 472, 22), C.snow, { stroke: true, sw: 5, fringe: C.ice, sy: 10 });
    mid += paper(rRect(860, 300, 54, 120, 1.5, 473), "#5A4636", { stroke: true, sw: 4 }) + paper(rEll(887, 300, 34, 12, 1.5, 474), C.snow, { stroke: true, sw: 3, shadow: false });
    mid += smokeEls("smkA", 887, 268, 7, 28); SMOKE.push(["smkA", 8.3, 7]);
    mid += at(852, 490, D.thermometer("m-th"));
    mid += paper(rough([[230, 884], [300, 846], [560, 862], [560, 884]], 3, 475, 18), C.snow, { stroke: true, sw: 4, shadow: false });
    mid += paper(rough([[760, 886], [800, 876], [1040, 874], [1110, 886]], 3, 476, 18), C.snow, { stroke: true, sw: 4, shadow: false });
    // ---- quầy chợ ----
    var stall = D.marketStall();
    mid += at(2250, 880, stall.back);
    mid += '<clipPath id="stallClip"><rect x="1780" y="380" width="756" height="420"/></clipPath>';
    mid += '<g clip-path="url(#stallClip)">' + at(2120, 640, g("m-glove", g("m-gfish", '<g transform="translate(-100,-6) scale(0.7)">' + D.fish({ seed: 172 }) + "</g>") + D.gloveHand())) + "</g>";
    mid += paper(rough([[2440, 470], [2536, 470], [2536, 700], [2470, 700], [2450, 600]], 2, 480, 16), "#2F4C4A", { stroke: true, sw: 4 });
    mid += at(2250, 880, stall.front);
    mid += at(2030, 890, D.fishBarrel("m-barrel"));
    // ---- xe nổ máy + xe bị tuyết vùi ----
    mid += at(3100, 885, D.car("m-car"));
    mid += smokeEls("exh", 3434, 838, 4, 16, "#E6ECEE"); PUFFS.push("exh");
    mid += at(3950, 885, D.snowCar("m-scar"));
    // ---- Wob ngoài trời ----
    mid += RIG.svg("M", {
      scarf: true,
      holdL: g("M-fishL", '<g transform="translate(-20,0)">' + D.fish({ seed: 173 }) + "</g>"),
      holdR: g("M-bagR", g("M-bag", D.paperBag(false)) + g("M-tbag", D.paperBag(true))) + g("M-cupR", '<g transform="translate(0,40) scale(0.62)">' + D.teaMug("mcup") + "</g>")
    });
    mid += g("m-bagfall", '<g transform="scale(0.7)">' + D.paperBag(false) + "</g>");
    // bong bóng ký hiệu
    mid += at(1168, 650, g("m-bub1", '<g transform="scale(0.62)">' + D.bubble("?!") + "</g>"));
    mid += at(1905, 650, g("m-bub2", '<g transform="scale(0.85)">' + D.bubble("bag") + "</g>"));
    mid += at(3540, 640, g("m-bub3", '<g transform="scale(0.85)">' + D.bubble("...") + "</g>"));
    // cửa tủ đông khổng lồ (gag)
    mid += g("m-freezer", D.freezerFrame(520, -330, 3780, 1450, 170));

    // ---- lớp gần (p = 1,4): ụ tuyết trôi nhanh ----
    for (var b = 0; b < 9; b++) {
      var bx = -400 + b * 760;
      near += paper(rough([[bx, 1300], [bx + 30, 1060], [bx + 160, 1010], [bx + 330, 1030], [bx + 460, 1080], [bx + 500, 1300]], 4, 490 + b, 22), C.snow, { stroke: true, sw: 5, fringe: C.ice, sy: -8 });
      near += line("M " + (bx + 120) + " 1050 C " + (bx + 200) + " 1040 " + (bx + 280) + " 1046 " + (bx + 360) + " 1060", 3, C.iceDeep, ' opacity="0.6"');
    }

    // ---- hiệu ứng màn hình: bụi kim cương lấp lánh ----
    var fx = "", r = D.rng(500);
    for (var s = 0; s < 16; s++) fx += at(Math.round(80 + r() * 1760), Math.round(60 + r() * 700), g("spk" + s, D.sparkle(9 + Math.round(r() * 8))));

    var sky = '<rect x="0" y="0" width="1920" height="1080" fill="url(#skyG)"/>';
    var tint = '<rect id="mem-tint" x="0" y="0" width="1920" height="1080" fill="#F6EEDC"/>';
    return g("mem", sky + g("m-far", far) + g("m-mid", mid) + g("m-near", near) + g("m-fx", fx) + tint);
  }

  /* ================= CẬN CẢNH: con cá đã chấp nhận tất cả ================= */
  function buildClose() {
    var s = '<rect x="0" y="0" width="1920" height="1080" fill="url(#cuG)"/>';
    var rays = "";
    for (var i = 0; i < 14; i++) {
      var a0 = i * 360 / 14, p1 = rotv(1400, -60, a0), p2 = rotv(1400, 60, a0);
      rays += '<path d="M 0 0 L ' + p1[0].toFixed(0) + " " + p1[1].toFixed(0) + " L " + p2[0].toFixed(0) + " " + p2[1].toFixed(0) + ' Z" fill="#ffffff" opacity="' + (i % 2 ? 0.18 : 0.3) + '"/>';
    }
    s += at(760, 560, g("cu-rays", rays));
    var fishBig = '<g transform="scale(5.2)">' + D.fish({ eye: "calm", seed: 9 }) + "</g>";
    s += g("cu-in", at(1250, 600, g("cu-fish", fishBig)));
    var r = D.rng(610);
    for (var k = 0; k < 7; k++) s += at(Math.round(300 + r() * 900), Math.round(180 + r() * 720), g("cuspk" + k, D.sparkle(18 + Math.round(r() * 14))));
    return g("cu", s);
  }

  /* ================= CAMERA ================= */
  function camera(layers, keys) {
    keys.forEach(function (k) {
      var t = k[0], cx = k[1], cy = k[2], z = k[3], e = k[4] || "power2.inOut";
      layers.forEach(function (L) {
        var zl = 1 + (z - 1) * L.p, clx = 960 + (cx - 960) * L.p, cly = 540 + (cy - 540) * L.p;
        K.add(L.sel, "x", t, 960 - zl * clx, e);
        K.add(L.sel, "y", t, 540 - zl * cly, e);
        K.add(L.sel, "scale", t, zl, e);
      });
    });
  }
  function shake(t, amp, n) {
    var r = D.rng(Math.round(t * 1000));
    K.add("#shake", "x", t, 0, "none"); K.add("#shake", "y", t, 0, "none");
    for (var i = 1; i <= (n || 6); i++) {
      var a = amp * (1 - i / ((n || 6) + 1));
      K.add("#shake", "x", t + i * 0.035, (r() * 2 - 1) * a, "sine.inOut");
      K.add("#shake", "y", t + i * 0.035, (r() * 2 - 1) * a, "sine.inOut");
    }
    K.add("#shake", "x", t + ((n || 6) + 1) * 0.035, 0, "sine.out"); K.add("#shake", "y", t + ((n || 6) + 1) * 0.035, 0, "sine.out");
  }
  function show(sel, t, v) { K.add(sel, "opacity", t, v, "step"); }
  function fade(sel, t, dur, v) { K.to(sel, t, dur, { opacity: v }, "power2.inOut"); }
  function pop(sel, t, inDur, holdTo) {
    K.add(sel, "scale", 0, 0); K.add(sel, "scale", t, 0, "none"); K.add(sel, "scale", t + inDur, 1, "back.out(2.6)");
    if (holdTo) { K.add(sel, "scale", holdTo, 1, "none"); K.add(sel, "scale", holdTo + 0.14, 0, "power2.in"); }
  }

  /* khói bốc thẳng đứng: từng cụm khói lặp chu kỳ */
  function smokeAnim(prefix, t0, t1, n, life, rise, dx) {
    var per = life / n;
    for (var j = 0; j < n; j++) {
      var sel = "#" + prefix + j;
      K.origin(sel, "0 0");
      for (var t = t0 + j * per; t < t1; t += life) {
        K.add(sel, "y", t, 0, "none"); K.add(sel, "y", t + life, -rise, "power1.out");
        K.add(sel, "x", t, 0, "none"); K.add(sel, "x", t + life, dx || 0, "sine.inOut");
        K.add(sel, "scale", t, 0.45, "none"); K.add(sel, "scale", t + life, 1.7, "sine.out");
        K.add(sel, "opacity", t, 0, "none"); K.add(sel, "opacity", t + life * 0.15, 0.95, "sine.out"); K.add(sel, "opacity", t + life, 0, "sine.in");
      }
    }
  }
  function steamAnim(prefix, t0, t1) {
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
  }

  /* ================= BIÊN ĐẠO ================= */
  function choreograph() {
    var P = new RIG.Wob(K, "P", {}), Q = new RIG.Wob(K, "Q", {}), N = new RIG.Wob(K, "N", { scarf: true }), M = new RIG.Wob(K, "M", { scarf: true });
    ["#P-fishL", "#M-fishL", "#M-bagR", "#M-cupR", "#Q-mugR", "#m-glove", "#m-gfish", "#p-fish", "#m-bagfall", "#m-bub1", "#m-bub2", "#m-bub3", "#m-th-merc", "#cu-rays", "#cu-in", "#m-scar-lump"].forEach(function (s) { K.origin(s, "0 0"); });
    K.origin("#p-flipA", "1400 555"); K.origin("#p-flipB", "1400 555"); K.origin("#m-door", "560 740");
    K.origin("#m-th-c", "85 300"); K.origin("#m-th-f", "85 350"); K.origin("#p-puddle", "0 0"); K.origin("#p-flop-tail", "0 0");
    K.origin("#m-barrel-tap", "-16 -60"); K.origin("#cu-fish", "-500 0"); K.origin("#p-cam", "0 0"); K.origin("#p-wall", "0 0");
    ["#m-far", "#m-mid", "#m-near"].forEach(function (s) { K.origin(s, "0 0"); });

    // ---------- lớp hiển thị ----------
    show("#present", 0, 1); show("#present", T.presentOut, 0); show("#present", T.home, 1);
    show("#mem", 0, 0); show("#mem", T.memIn, 1); show("#mem", T.closeIn, 0); show("#mem", T.closeOut, 1); show("#mem", T.home, 0);
    show("#cu", 0, 0); show("#cu", T.closeIn, 1); show("#cu", T.closeOut, 0);
    show("#mem-tint", 0, 1); K.add("#mem-tint", "opacity", 11.95, 1, "none"); K.add("#mem-tint", "opacity", 12.65, 0, "power2.out");
    show("#P", 0, 1); show("#P", T.home, 0);
    show("#Q", 0, 0); show("#Q", T.home, 1);
    show("#p-books", 0, 0); show("#p-books", T.home, 1);
    show("#p-fish", 0, 0); show("#p-fish", T.home, 0);

    // ---------- camera hiện tại ----------
    var PL = [{ sel: "#p-cam", p: 1 }, { sel: "#p-wall", p: 0.6 }];
    camera(PL, [
      [0, 960, 540, 1.0], [0.4, 960, 540, 1.0], [3.6, 980, 560, 1.06, "sine.inOut"], [7.5, 1060, 570, 1.16, "sine.inOut"],
      [8.1, 1080, 610, 1.33, "power3.inOut"], [9.7, 1090, 615, 1.36, "sine.inOut"], [10.25, 905, 650, 1.62, "power3.out"],
      [11.0, 905, 650, 1.64, "sine.inOut"], [11.95, 1250, 545, 7.2, "power3.in"],
      [T.home, 960, 600, 1.12, "step"], [CANH.duration, 985, 615, 1.2, "sine.inOut"]
    ]);
    // ---------- camera hồi ức (3 lớp lệch nhau) ----------
    var ML = [{ sel: "#m-far", p: 0.35 }, { sel: "#m-mid", p: 1 }, { sel: "#m-near", p: 1.4 }];
    camera(ML, [
      [0, 900, 560, 1.25], [11.9, 900, 560, 1.25], [13.4, 900, 545, 1.0, "power2.out"], [15.2, 830, 560, 1.07, "sine.inOut"],
      [15.85, 680, 650, 1.45, "power3.inOut"], [19.3, 700, 650, 1.5, "sine.inOut"], [20.0, 860, 600, 1.12, "power2.inOut"],
      [21.6, 1000, 610, 1.15, "sine.inOut"], [22.25, 1100, 722, 2.4, "power3.inOut"], [25.1, 1110, 726, 2.5, "sine.inOut"],
      [25.7, 1300, 600, 1.15, "power2.inOut"], [27.45, 2050, 600, 1.12, "sine.inOut"], [29.2, 2080, 600, 1.15, "sine.inOut"],
      [29.8, 2000, 700, 1.7, "power3.inOut"], [31.3, 2010, 700, 1.74, "sine.inOut"], [32.1, 2150, 560, 0.55, "power2.inOut"],
      [33.45, 2150, 560, 0.56, "sine.inOut"], [34.0, 2120, 640, 1.3, "power3.inOut"], [37.75, 2140, 640, 1.36, "sine.inOut"],
      [38.15, 1880, 640, 1.75, "power2.in"],
      [T.closeOut, 2050, 600, 1.12, "step"], [43.0, 2900, 600, 1.12, "sine.inOut"], [43.6, 3010, 650, 1.5, "power3.inOut"],
      [45.3, 3030, 650, 1.52, "sine.inOut"], [46.2, 3080, 600, 1.12, "power2.inOut"], [47.6, 3100, 600, 1.12, "sine.inOut"],
      [49.4, 3720, 620, 1.2, "sine.inOut"], [50.4, 3700, 620, 1.22, "sine.inOut"], [51.0, 3530, 700, 1.9, "power3.inOut"],
      [T.home, 3530, 690, 2.0, "sine.inOut"]
    ]);
    // lớp gần tắt khi lùi xa (gag tủ đông)
    show("#m-near", 0, 1); fade("#m-near", 31.3, 0.3, 0); fade("#m-near", 33.8, 0.3, 1);

    // ================= CẢNH 1 · bàn kỷ vật =================
    var s1 = SC[1].start;
    P.set(0, { x: 780, y: 930, size: 1.15, aLu: 40, aLf: -50, aRu: -18, aRf: 10, lashes: 0, ice: 0 });
    K.set("#P-fishL", 0, { rotation: 10, opacity: 1 });
    P.breathe(0, 11.2);
    // lấy đà – giơ cá lên như tấm ván
    P.pose(0.3, 0.2, { sy: 0.93, sx: 1.05, aLu: 28 }, "power2.out"); K.to("#P-fishL", 0.3, 0.2, { rotation: 22 }, "power2.out");
    P.pose(0.5, 0.25, { sy: 1.06, sx: 0.96, aLu: 160, aLf: 10, upY: -8 }, "back.out(1.6)"); K.to("#P-fishL", 0.5, 0.25, { rotation: -80 }, "back.out(1.6)");
    P.pose(0.75, 0.2, { sy: 1, sx: 1, upY: 0 }, "power2.out");
    P.pose(0.95, 0.1, { aLu: 166 }, "power2.out");
    // cộp!
    P.pose(1.05, 0.2, { aLu: 40, aLf: -30 }, "power3.in"); K.to("#P-fishL", 1.05, 0.2, { rotation: -30 }, "power3.in");
    P.pose(1.15, 0.1, { sy: 0.93, sx: 1.05 }, "power2.in");
    P.pose(1.25, 0.2, { aLu: 46, sy: 1, sx: 1 }, "power2.out"); K.to("#P-fishL", 1.25, 0.2, { rotation: -26 }, "power2.out");
    P.pose(1.45, 0.15, { aLu: 40 }, "power2.inOut"); K.to("#P-fishL", 1.45, 0.15, { rotation: -30 }, "power2.inOut");
    shake(1.25, 9, 6);
    // buông tay: cá nằm lại trên bàn, đổ phẳng (vẫn cứng đơ)
    var tr = 1.7, hP = P.hand("L", tr), fr = K.at("#P-fishL", "rotation", tr), ang = hP.angle + fr;
    var tip = rotv(-218 * hP.scale, 0, ang);
    show("#P-fishL", tr, 0);
    K.set("#p-fish", 0, { x: hP.x + tip[0], y: hP.y + tip[1], rotation: ang });
    show("#p-fish", tr, 1);
    K.add("#p-fish", "rotation", tr, ang, "none"); K.add("#p-fish", "rotation", 1.92, 0, "power2.in"); K.add("#p-fish", "rotation", 2.0, -2.5, "power2.out"); K.add("#p-fish", "rotation", 2.08, 0, "power2.in");
    P.pose(1.72, 0.25, { aLu: 18, aLf: -10 }, "power2.out");
    // quay sang sổ, đi tới, lật trang
    P.pose(1.85, 0.15, { pupX: 9, pupY: -2 }, "power2.out");
    P.walk(2.0, 2.42, 780, 1000, { step: 0.21 });
    P.pose(2.42, 0.13, { aRu: 170, aRf: 20 }, "power2.out");
    P.pose(2.5, 0.38, { aRu: 225, aRf: 0 }, "power2.inOut");
    K.add("#p-flipA", "scaleX", 2.5, 1, "none"); K.add("#p-flipA", "scaleX", 2.7, 0, "power2.in");
    K.add("#p-flipB", "scaleX", 0, 0); K.add("#p-flipB", "scaleX", 2.7, 0, "none"); K.add("#p-flipB", "scaleX", 2.92, 1, "power2.out");
    show("#p-flipA", 0, 1); show("#p-flipA", 2.7, 0);
    P.pose(2.95, 0.3, { aRu: 342, aRf: 10 }, "power2.inOut");
    P.walk(3.3, 3.72, 1000, 900, { step: 0.21 });
    // giới thiệu trang sổ
    P.pose(3.75, 0.3, { aRu: 248, aRf: -18, aLu: 40, aLf: 70, pupX: 8, pupY: -4 }, "back.out(1.4)");
    P.pose(4.88, 0.12, { lid: 24 }, "power2.out"); P.shiver(4.88, 5.6, 3, 16); P.pose(5.6, 0.2, { lid: 0 }, "power2.out");
    P.pose(6.05, 0.25, { pupX: 0, pupY: 0 }, "power2.out");
    P.pose(6.9, 0.25, { pupX: 8, pupY: -3 }, "power2.out");
    // chỉ biển "pop. ~500": hai cái gõ theo "five" "hundred"
    P.pose(7.65, 0.25, { aRu: 263, aRf: -4 }, "power2.out");
    [8.3, 8.64].forEach(function (tt) { P.pose(tt - 0.08, 0.08, { aRf: 12, upRot: 2 }, "power2.in"); P.pose(tt, 0.14, { aRf: -4, upRot: 0 }, "power2.out"); });
    [0, 1, 2].forEach(function (i) { var tt = 8.9 + i * 0.16; K.set("#p-sk-win" + i, 0, { fill: "#F6EEDC" }); K.add("#p-sk-win" + i, "fill", tt, "#F6EEDC", "none"); K.add("#p-sk-win" + i, "fill", tt + 0.12, "#FFC24D", "power2.out"); });
    // "On purpose." quay ra nhìn thẳng, tỉnh bơ, giữ hình
    P.pose(9.6, 0.3, { aRu: 342, aRf: 10, aLu: 18, aLf: -10, pupX: 0, pupY: 0 }, "power2.inOut");
    P.pose(10.12, 0.16, { lid: 30 }, "power2.out");
    P.lipsync(KH[1], s1, 0, 11.1);
    P.mouth(10.75, "flat");
    P.autoBlink(0, 9.9, 101);

    // ================= CHUYỂN: lao vào trang sổ =================
    // (camera hiện tại ở trên: tới 11,95 phóng ×7,2 vào trang)

    // ================= CẢNH 2 · bước ra ngoài =================
    // Wob trong nhà nhìn qua cửa sổ
    N.set(0, { x: 420, y: 990, size: 0.7, aLu: 30, aLf: -40, aRu: -30, aRf: 40, lashes: 0, ice: 0 });
    N.mouth(0, "X");
    N.pose(12.9, 0.4, { y: 822 }, "back.out(1.7)");
    N.pose(13.5, 0.3, { pupX: 10, pupY: -2 }, "power2.out");
    N.pose(14.7, 0.2, { pupX: 10, pupY: 4 }, "power2.out");
    N.pose(15.92, 0.14, { eye: 1.32, upY: -10, lid: 0 }, "back.out(3)"); N.mouth(15.95, "o");
    N.pose(16.4, 0.3, { eye: 1.12, upY: 0 }, "power2.out"); N.mouth(16.9, "wobbly");
    N.pose(17.55, 0.3, { y: 990 }, "power2.in");
    N.breathe(12, 18); N.autoBlink(12, 15.6, 201);
    show("#N", 0, 1); show("#N", 18.0, 0);
    // nhiệt kế tụt, nhãn nhún
    K.set("#m-th-merc", 0, { scaleY: 0.72 });
    K.add("#m-th-merc", "scaleY", 15.55, 0.72, "none"); K.add("#m-th-merc", "scaleY", 16.15, 0.1, "bounce.out");
    K.to("#m-th-c", 16.0, 0.12, { scale: 1.16 }, "power2.out"); K.to("#m-th-c", 16.12, 0.3, { scale: 1 }, "back.out(2)");
    K.to("#m-th-f", 18.45, 0.12, { scale: 1.16 }, "power2.out"); K.to("#m-th-f", 18.57, 0.3, { scale: 1 }, "back.out(2)");
    // cửa mở, Wob quấn khăn bước ra
    K.add("#m-door", "scaleX", 0, 1); K.add("#m-door", "scaleX", 19.9, 1, "none"); K.add("#m-door", "scaleX", 20.12, 0.14, "power3.out");
    M.set(0, { x: 660, y: 900, size: 0.7, aLu: 18, aLf: -10, aRu: -18, aRf: 10, lashes: 0, ice: 0, op: 0 });
    show("#M-fishL", 0, 0); show("#M-bag", 0, 0); show("#M-tbag", 0, 0); show("#M-cupR", 0, 0);
    M.set(20.05, { op: 1 });
    M.mouth(0, "X"); M.mouth(20.1, "smirk");
    M.walk(20.1, 21.1, 660, 1100, { step: 0.25 });
    M.pose(21.2, 0.15, { pupX: -10 }, "power2.out"); M.pose(21.55, 0.18, { pupX: 10 }, "power2.out"); M.pose(21.9, 0.15, { pupX: 0, pupY: -3 }, "power2.out");
    // lông mi bật ra – đóng băng – lác mắt nhìn lên
    M.pose(22.12, 0.1, { lashes: 1.2 }, "back.out(3)"); M.pose(22.22, 0.12, { lashes: 1 }, "power2.out");
    M.mouth(22.12, "o");
    M.pose(22.6, 0.08, { ice: 1 }, "power2.out");
    M.pose(22.6, 0.12, { eye: 1.18 }, "back.out(3)"); M.shiver(22.6, 22.9, 2.5, 18);
    M.mouth(22.75, "wobbly");
    pop("#m-bub1", 22.9, 0.22, 24.0);
    M.pose(23.55, 0.25, { pLx: 9, pRx: -9, pupY: -14, eye: 1.06 }, "power2.inOut"); M.mouth(23.6, "flat");
    M.pose(25.15, 0.2, { pLx: 0, pRx: 0, pupY: 0, eye: 1 }, "power2.out");
    // đi tới chợ
    M.walk(25.4, 27.45, 1100, 1850, { step: 0.29 });
    M.pose(25.3, 0.1, { pupX: 8 }, "power2.out");

    // ================= CẢNH 3 · chợ =================
    M.pose(27.5, 0.12, { upY: -14 }, "power2.out"); M.pose(27.62, 0.3, { upY: 0 }, "bounce.out"); M.mouth(27.5, "grin");
    M.pose(28.5, 0.25, { pupX: 8, pupY: 6 }, "power2.out"); M.mouth(28.7, "X");
    // gõ thử con cá: cứng như gỗ
    M.pose(30.2, 0.3, { aRu: -100, aRf: -40, lean: 4 }, "power2.inOut");
    M.pose(30.7, 0.12, { aRf: 6 }, "power3.in");
    M.pose(30.82, 0.08, { aRf: -14 }, "power2.out");
    [30.95, 31.07, 31.19].forEach(function (tt, i) { M.pose(tt, 0.12, { aRf: i % 2 ? -10 : 14 }, "sine.inOut"); });
    M.mouth(30.85, "chatter"); M.pose(31.32, 0.3, { aRu: -18, aRf: 10, lean: 0, pupX: 0, pupY: 0 }, "power2.inOut"); M.mouth(31.6, "X");
    // làng = tủ đông: cánh tủ khổng lồ rơi xuống bao cả làng
    K.add("#m-freezer", "y", 0, -2600); K.add("#m-freezer", "y", 31.95, -2600, "none"); K.add("#m-freezer", "y", 32.35, 0, "power3.in");
    K.add("#m-freezer", "y", 33.45, 0, "none"); K.add("#m-freezer", "y", 33.85, -2600, "power2.in");
    shake(32.35, 16, 8);
    M.shiver(32.4, 33.3, 2.5, 16); M.mouth(32.4, "chatter"); M.mouth(33.4, "X");
    // xin cái túi
    M.pose(33.55, 0.25, { aRu: -150, aRf: -20 }, "power2.inOut");
    K.set("#M-bagR", 0, { rotation: 170 });
    show("#M-bag", 33.85, 1);
    M.pose(33.85, 0.25, { aRu: -70, aRf: -30 }, "back.out(1.5)"); K.add("#M-bagR", "rotation", 33.85, 170, "none"); K.add("#M-bagR", "rotation", 34.1, 100, "back.out(1.5)");
    M.mouth(34.0, "smirk");
    pop("#m-bub2", 34.15, 0.22, 35.05);
    // bàn tay đeo găng đưa ra con cá cứng đờ
    K.set("#m-glove", 0, { x: 440 });
    K.add("#m-glove", "x", 34.45, 440, "none"); K.add("#m-glove", "x", 34.95, 0, "power2.out");
    K.add("#m-glove", "y", 0, 0); K.add("#m-glove", "y", 35.05, 0, "none"); K.add("#m-glove", "y", 35.25, -70, "power2.out");
    K.add("#m-gfish", "rotation", 0, 0); K.add("#m-gfish", "rotation", 35.05, 0, "none"); K.add("#m-gfish", "rotation", 35.25, -90, "power2.out");
    K.add("#m-glove", "x", 35.25, 0, "none"); K.add("#m-glove", "x", 35.5, -60, "power2.in");
    K.add("#m-glove", "y", 35.25, -70, "none"); K.add("#m-glove", "y", 35.5, -40, "power2.in");
    show("#m-gfish", 0, 1); show("#m-gfish", 35.6, 0);
    show("#M-bag", 35.6, 0); show("#M-tbag", 35.6, 1);
    shake(35.62, 5, 4); M.pose(35.6, 0.1, { eye: 1.2 }, "back.out(3)"); M.mouth(35.62, "o");
    K.add("#m-glove", "x", 35.7, -60, "none"); K.add("#m-glove", "x", 36.25, 440, "power2.in");
    K.add("#m-glove", "y", 35.7, -40, "none"); K.add("#m-glove", "y", 36.25, 0, "power2.inOut");
    M.pose(35.95, 0.2, { pupX: 4, pupY: 10, eye: 1 }, "power2.out");
    // vứt túi rách, vác cá lên vai như cây ván
    var tb = 36.25;
    M.pose(36.05, 0.2, { aLu: 172, aLf: 28 }, "back.out(1.6)");
    show("#M-fishL", 36.12, 1); K.set("#M-fishL", 0, { rotation: -150 });
    var hM = M.hand("R", tb), bagAng = hM.angle + K.at("#M-bagR", "rotation", tb);
    show("#M-tbag", tb, 0);
    K.origin("#m-bagfall", "0 0");
    show("#m-bagfall", 0, 0); show("#m-bagfall", tb, 1); show("#m-bagfall", 36.8, 0);
    K.add("#m-bagfall", "x", 0, hM.x); K.add("#m-bagfall", "x", tb, hM.x, "step"); K.add("#m-bagfall", "x", 36.62, hM.x + 40, "power1.out");
    K.add("#m-bagfall", "y", 0, hM.y); K.add("#m-bagfall", "y", tb, hM.y, "none"); K.add("#m-bagfall", "y", 36.62, 890 - 91, "power2.in");
    K.add("#m-bagfall", "rotation", 0, bagAng); K.add("#m-bagfall", "rotation", tb, bagAng, "none"); K.add("#m-bagfall", "rotation", 36.62, bagAng + 70, "power1.in");
    M.pose(tb, 0.25, { aRu: -18, aRf: 10 }, "power2.out");
    M.mouth(36.3, "X");
    // nhìn con cá, tỉnh bơ
    M.pose(36.8, 0.25, { pupX: -9, pupY: -10 }, "power2.inOut");
    M.pose(37.2, 0.2, { lid: 26 }, "power2.out"); M.mouth(37.25, "flat");
    // cận cảnh (38,15 – 40,5): cá thanh thản
    K.add("#cu-in", "scale", 0, 1); K.add("#cu-in", "scale", T.closeIn, 1, "none"); K.add("#cu-in", "scale", T.closeOut, 1.07, "sine.inOut");
    K.add("#cu-rays", "rotation", 0, 0); K.add("#cu-rays", "rotation", T.closeIn, 0, "none"); K.add("#cu-rays", "rotation", T.closeOut, 14, "sine.inOut");
    K.add("#cu-fish", "rotation", 0, 0); K.add("#cu-fish", "rotation", T.closeIn, 0, "none"); K.add("#cu-fish", "rotation", 39.3, -1.2, "sine.inOut"); K.add("#cu-fish", "rotation", T.closeOut, 0, "sine.inOut");
    [38.5, 38.7, 39.0, 39.3, 39.55, 39.8, 40.1].forEach(function (tt, k) {
      var sel = "#cuspk" + k; K.origin(sel, "0 0");
      K.add(sel, "scale", 0, 0); K.add(sel, "scale", tt, 0, "none"); K.add(sel, "scale", tt + 0.18, 1.2, "back.out(3)"); K.add(sel, "scale", tt + 0.55, 0, "power2.in");
      K.add(sel, "rotation", tt, 0, "none"); K.add(sel, "rotation", tt + 0.55, 45, "power1.inOut");
    });
    M.pose(T.closeOut - 0.05, 0.05, { lid: 0, pupX: 8, pupY: 0 });
    M.mouth(T.closeOut, "smirk");

    // ================= CẢNH 4 · xe nổ máy, cốc trà =================
    M.walk(40.55, 43.0, 1850, 2960, { step: 0.3, arms: "R" });
    // nhón chân nhìn qua cửa kính: ghế lái trống
    M.pose(43.25, 0.25, { sy: 1.1, sx: 0.95, lean: 7, upY: -6, pRx: 10, pLx: 10, pupY: -9 }, "back.out(1.5)");
    M.pose(44.0, 0.2, { sy: 1, sx: 1, lean: 0, upY: 0, pupY: 0 }, "power2.inOut");
    // vẫy tay chào cái ghế trống
    M.pose(44.2, 0.15, { aRu: -150, aRf: -30 }, "power2.out"); M.mouth(44.25, "grin");
    [44.4, 44.58, 44.76, 44.94, 45.12].forEach(function (tt, i) { M.pose(tt, 0.16, { aRf: i % 2 ? -32 : 22 }, "sine.inOut"); });
    M.pose(45.3, 0.25, { aRu: -18, aRf: 10, pLx: 0, pRx: 0 }, "power2.inOut"); M.mouth(45.4, "X");
    // nhìn người xem, nhún vai
    M.pose(45.6, 0.25, { aRu: -62, aRf: -70 }, "back.out(1.6)"); M.pose(45.6, 0.25, { upRot: -3 }, "power2.out");
    M.pose(46.7, 0.3, { aRu: -18, aRf: 10, upRot: 0, pupX: 8 }, "power2.inOut");
    M.walk(47.6, 49.3, 2960, 3500, { step: 0.3, arms: "R" });
    // chọc xe bị tuyết vùi: cục tuyết rơi
    M.pose(49.35, 0.15, { aRu: -96, aRf: -40 }, "power2.out"); M.pose(49.5, 0.08, { aRf: 4 }, "power3.in"); M.pose(49.62, 0.2, { aRu: -18, aRf: 10 }, "power2.out");
    K.add("#m-scar-lump", "y", 0, 0); K.add("#m-scar-lump", "y", 49.6, 0, "none"); K.add("#m-scar-lump", "y", 49.95, 300, "power2.in");
    K.add("#m-scar-lump", "x", 0, 0); K.add("#m-scar-lump", "x", 49.6, 0, "none"); K.add("#m-scar-lump", "x", 49.95, -150, "power1.out");
    K.add("#m-scar-lump", "rotation", 0, 0); K.add("#m-scar-lump", "rotation", 49.6, 0, "none"); K.add("#m-scar-lump", "rotation", 49.95, -30, "power1.in");
    shake(49.95, 4, 4);
    pop("#m-bub3", 50.0, 0.2, 50.7); M.pose(50.0, 0.25, { upY: 6, lid: 22 }, "power2.out"); M.mouth(50.0, "wobbly");
    // pha trà
    M.pose(50.3, 0.25, { aRu: -150, aRf: -20, upY: 0, lid: 0 }, "power2.inOut");
    K.set("#M-cupR", 0, { rotation: 90 }); show("#M-cupR", 50.56, 1);
    M.pose(50.6, 0.28, { aRu: -130, aRf: 40, pupX: 10, pupY: -6 }, "back.out(1.4)");
    show("#mcup-ice", 0, 0); show("#mcup-frost", 0, 0); show("#mcup-steam", 0, 1);
    steamAnim("mcup", 50.6, 52.45);
    M.mouth(50.9, "grin"); M.pose(51.0, 0.25, { lid: 30 }, "power2.out");
    // trà không ấm lên: hơi đông cứng giữa không trung
    show("#mcup-steam", 52.5, 0); show("#mcup-ice", 52.5, 1); fade("#mcup-frost", 52.5, 0.25, 1);
    M.pose(52.5, 0.12, { lid: 0, eye: 1.22 }, "back.out(3)"); M.mouth(52.52, "o");
    M.pose(52.9, 0.25, { aRu: -140, eye: 1 }, "power2.inOut");
    K.add("#M-cupR", "rotation", 52.9, 90, "none"); K.add("#M-cupR", "rotation", 53.15, 270, "power2.inOut");
    [53.22, 53.32, 53.42].forEach(function (tt, i) { K.add("#M-cupR", "rotation", tt, i % 2 ? 258 : 282, "sine.inOut"); });
    K.add("#M-cupR", "rotation", 53.52, 270, "sine.out");
    M.mouth(53.3, "flat");
    M.breathe(20, 53.6, 2.4);
    M.autoBlink(20, 53.6, 301);
    // xe rung, ống xả phụt khói đều
    K.add("#m-car", "y", 0, 0);
    for (var ct = 24, up = true; ct < T.home; ct += 1 / 12, up = !up) K.add("#m-car", "y", ct, up ? -2.4 : 0, "sine.inOut");

    // ================= CẢNH 5 · về nhà =================
    var s5 = SC[5].start, s4 = SC[4].start;
    Q.set(0, { x: 1000, y: 930, size: 1.15, aRu: 10, aRf: -22, aLu: 0, aLf: -50, lashes: 1, ice: 0 });
    K.set("#Q-mugR", 0, { rotation: 12 });
    show("#qmug-ice", 0, 0); show("#qmug-frost", 0, 0);
    steamAnim("qmug", T.home, CANH.duration);
    Q.shiver(T.home, 58.1, 2.2, 14); Q.shiver(58.15, 59.1, 4.5, 16); Q.shiver(59.15, CANH.duration, 2, 14);
    Q.lipsync(KH[4], s4, T.home, 55.3);
    Q.lipsync(KH[5], s5);
    Q.pose(56.2, 0.2, { pupX: -10, pupY: 6 }, "power2.out");
    Q.pose(57.45, 0.25, { pupX: 0, pupY: 0 }, "power2.out");
    Q.pose(58.1, 0.2, { lid: 26 }, "power2.out");
    Q.autoBlink(T.home, 60.3, 401); Q.blinkAt(59.7);
    // cá rũ thêm, nhỏ giọt
    K.add("#p-flop-tail", "rotation", 0, 0); K.add("#p-flop-tail", "rotation", 56.35, 0, "none"); K.add("#p-flop-tail", "rotation", 56.9, 9, "elastic.out(1,0.5)");
    [[56.55, 56.85], [57.35, 57.65]].forEach(function (d) {
      K.add("#p-flop-drip", "y", 0, 0); K.add("#p-flop-drip", "y", d[0], 0, "none"); K.add("#p-flop-drip", "y", d[1], 34, "power2.in"); K.add("#p-flop-drip", "y", d[1] + 0.001, 0, "none");
      K.add("#p-flop-drip", "opacity", 0, 1); K.add("#p-flop-drip", "opacity", d[1], 1, "none"); K.add("#p-flop-drip", "opacity", d[1] + 0.001, 0, "none"); K.add("#p-flop-drip", "opacity", d[1] + 0.25, 1, "power1.in");
    });
    K.add("#p-puddle", "scaleX", 0, 0.75); K.add("#p-puddle", "scaleX", 56.85, 0.75, "none"); K.add("#p-puddle", "scaleX", 57.0, 0.95, "back.out(2)");
    K.add("#p-puddle", "scaleX", 57.65, 0.95, "none"); K.add("#p-puddle", "scaleX", 57.8, 1.12, "back.out(2)");

    // ================= nền chung =================
    SMOKE.forEach(function (s) { smokeAnim(s[0], s[1], T.home, s[2], 3.6, 300, 0); });
    PUFFS.forEach(function (p) { smokeAnim(p, 24, T.home, 4, 1.4, 70, 150); });
    for (var f = 0; f < 6; f++) { K.origin("#fog" + f, "0 0"); K.add("#fog" + f, "x", 11.5, 0, "none"); K.add("#fog" + f, "x", T.home, (f % 2 ? -1 : 1) * 260, "sine.inOut"); }
    var rs = D.rng(777);
    for (var k = 0; k < 16; k++) {
      var sel = "#spk" + k;
      K.origin(sel, "0 0"); K.add(sel, "scale", 0, 0);
      for (var tt = 12 + rs() * 2.5; tt < T.home - 0.6; tt += 2.2 + rs() * 2.6) {
        if (tt > T.closeIn - 0.6 && tt < T.closeOut) continue;
        K.add(sel, "scale", tt, 0, "none"); K.add(sel, "scale", tt + 0.2, 1, "back.out(2)"); K.add(sel, "scale", tt + 0.6, 0, "power2.in");
      }
    }
    return { P: P, Q: Q, N: N, M: M };
  }

  /* ================= hạt giấy risograph (canvas, seed cố định) ================= */
  function grainTexture() {
    var cv = document.createElement("canvas"), n = 320;
    cv.width = n; cv.height = n;
    var ctx = cv.getContext("2d"), img = ctx.createImageData(n, n), r = D.rng(9001);
    for (var i = 0; i < n * n; i++) {
      var v = r(), fiber = r() < 0.004 ? 70 : 0;
      var c = 255 - Math.round(v * v * 66) - fiber;
      img.data[i * 4] = c; img.data[i * 4 + 1] = c - 4; img.data[i * 4 + 2] = c - 12; img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return cv.toDataURL("image/png");
  }

  function blotTexture() {
    var sm = document.createElement("canvas"), r = D.rng(9100);
    sm.width = 48; sm.height = 27;
    var c1 = sm.getContext("2d"), im = c1.createImageData(48, 27);
    for (var i = 0; i < 48 * 27; i++) { var v = 255 - Math.round(r() * 34); im.data[i * 4] = v; im.data[i * 4 + 1] = v - 3; im.data[i * 4 + 2] = v - 10; im.data[i * 4 + 3] = 255; }
    c1.putImageData(im, 0, 0);
    var big = document.createElement("canvas");
    big.width = 480; big.height = 270;
    var c2 = big.getContext("2d");
    c2.imageSmoothingEnabled = true; c2.imageSmoothingQuality = "high";
    c2.drawImage(sm, 0, 0, 480, 270);
    return big.toDataURL("image/png");
  }

  function build() {
    var svg = document.getElementById("stage");
    svg.innerHTML = D.defs() + '<g id="shake">' + buildPresent() + buildMemory() + buildClose() + "</g>";
    document.getElementById("grain").style.backgroundImage = "url(" + grainTexture() + ")";
    document.getElementById("blot").style.backgroundImage = "url(" + blotTexture() + ")";
    var who = choreograph();
    // hạt giấy nhảy theo nhịp 8 hình/giây như phim cắt giấy quay từng khung
    var rg = D.rng(4242);
    for (var t = 0, i = 0; t < CANH.duration; t += 0.125, i++) {
      K.add("#grain", "x", t, Math.round(rg() * 300) - 150, "step");
      K.add("#grain", "y", t, Math.round(rg() * 300) - 150, "step");
    }
    var tl = gsap.timeline({ paused: true });
    ["P", "Q", "N", "M"].forEach(function (k) { who[k].finish(tl, gsap); });
    var n = K.emit(tl, gsap);
    tl.set({}, {}, CANH.duration);
    window.__wwSteps = { M: who.M.steps };
    window.__wwTweenCount = n;
    return tl;
  }

  window.DungPhim = { build: build };
})();
