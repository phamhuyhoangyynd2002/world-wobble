/* Đoạn d24 · cắt giấy · hồi ức: chợ ngoài trời giữa trưa mùa đông. Vào "cat", ra "cat".
   Lời: "Midday, I went to the market. Food here comes mostly from animals and the river: meat, and fish that in winter
   is sold frozen solid and stacked like firewood. Farming in frozen ground is close to impossible."
   Trang phục: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng. Người bán chỉ thấy bàn tay đeo găng. Không chữ trên hình.
   Gag: chồng cá xếp như củi (bàn tay người bán đặt thêm một "khúc"); xẻng cắm xuống đất băng bật ngược, rung bần bật. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var T = function (w, k, du) { var v = api.tu(w, k); return v == null ? du : v; };
  var MAT = 872;

  // ---- phông: phố chợ giữa trưa, mặt trời thấp; sông băng ở lớp xa ----
  var nen = CN.langTuyet(api, {
    ten: "cho", seed: 2400, tu: -1200, den: 4200, mat: MAT, matTroi: [1180, 330],
    nha: [[-420, 360, 210], [3300, 380, 220], [3900, 330, 200]],
    nhaXa: [[-200, 772], [520, 766], [1500, 776], [2250, 768]],
    thong: [[-60, 700, 320], [3020, 680, 340]], cot: [80, 3150], suong: 4
  });
  // sông băng phẳng ở lớp xa (dải băng xanh nhạt có vết nứt, vài lỗ câu)
  var song = D.paper(D.rough([[-900, 702], [2400, 696], [2400, 744], [-900, 752]], 2, 2411, 30), C.ice, { shadow: false, stroke: true, sw: 3 });
  song += D.line("M -600 722 L -380 716 L -300 730 M 300 718 L 520 724 M 1100 712 L 1260 726 L 1400 716 M 1900 720 L 2100 714", 2.5, "#7FA9BC", ' opacity="0.8"');
  [[-120, 724], [700, 720], [1640, 726]].forEach(function (p) { song += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="14" ry="5" fill="#3F6A70" stroke="' + INK + '" stroke-width="2"/>'; });
  var xa = nen.xa + song;

  // ---- đạo cụ riêng của đoạn ----
  /* thịt treo dạng chung: khúc thịt bọc mỡ trên móc. Gốc: móc. */
  function thit(seed, w, h) {
    var s = D.line("M 0 0 L 0 18", 4) + D.line("M -6 18 C -6 30 6 30 6 18", 3);
    s += D.paper(D.rough(D.ptsEllipse(0, 28 + h / 2, w / 2, h / 2, 22), 2, seed, 12), "#9A4A38", { stroke: true, sw: 4, sx: 4, sy: 5 });
    s += D.paper(D.rough(D.ptsEllipse(-w * 0.12, 28 + h * 0.38, w * 0.2, h * 0.22, 14), 1.5, seed + 1, 10), "#F1E3CF", { shadow: false });
    s += '<path d="M ' + D.f1(-w * 0.32) + " " + D.f1(28 + h * 0.7) + " C 0 " + D.f1(28 + h * 0.85) + " " + D.f1(w * 0.2) + " " + D.f1(28 + h * 0.7) + " " + D.f1(w * 0.34) + " " + D.f1(28 + h * 0.5) + '" fill="none" stroke="#F7F3EA" stroke-width="5" opacity="0.7"/>';
    return s;
  }
  /* chồng cá xếp như củi: các hàng cá nằm ngang đổi chiều xen kẽ. Gốc: giữa chân chồng. Trả { svg, dinh: [x,y] } */
  function chongCa(seed) {
    var r = D.rng(seed), s = "", rows = [3, 3, 2, 2, 1], y = -24;
    s += D.paper(D.rRect(-205, -14, 410, 18, 1.5, seed + 9), C.woodDark, { stroke: true, sw: 4 });
    rows.forEach(function (n, k) {
      for (var i = 0; i < n; i++) {
        var x = (i - (n - 1) / 2) * 128 + (k % 2 ? 22 : -10), flip = (i + k) % 2 ? -1 : 1, rot = (r() * 2 - 1) * 3;
        var one = '<g transform="translate(' + D.f1(x) + "," + D.f1(y) + ") rotate(" + D.f1(rot) + ") scale(" + (0.5 * flip) + ',0.5)">' + D.fish({ seed: seed + k * 7 + i }) + "</g>";
        s += (k === 1 && i === 1) ? g("cc-tap", one) : one;
      }
      y -= 38;
    });
    s += D.paper(D.rough([[-80, y + 26], [-20, y + 12], [40, y + 14], [90, y + 28]], 2, seed + 11, 14), C.snow, { shadow: false, stroke: true, sw: 3 });
    return { svg: s, dinh: [22, y + 6] };
  }
  /* xẻng nhỏ cầm tay. Gốc: chỗ nắm (bàn tay). Lưỡi xẻng ở dưới. */
  function xeng() {
    var s = D.line("M 0 -100 L 0 42", 12, INK) + D.line("M 0 -100 L 0 42", 6, C.woodLight);
    s += D.line("M -16 -104 L 16 -104", 10, INK) + D.line("M -16 -104 L 16 -104", 4, C.woodLight);
    s += D.paper("M -24 40 L 24 40 L 26 82 C 18 100 6 108 0 112 C -6 108 -18 100 -26 82 Z", "#8C979A", { stroke: true, sw: 5, sx: 3, sy: 4 });
    s += D.line("M -12 52 L -12 86", 3, "#ffffff", ' opacity="0.6"');
    return s;
  }

  // ---- Wob ----
  var DO = "#C9463A", KHAN = "#D9543C";
  var M = api.wob("M", { scarf: true, khan: KHAN, mu: DO, holdR: g("M-sv", xeng()) });

  // ---- lớp giữa: hai quầy, chồng cá, thùng cá, bàn tay người bán ----
  var mid = nen.giua;
  var st1 = D.marketStall(), st2 = D.marketStall();
  mid += at(1300, MAT + 10, st1.back);
  [-200, -110, -20, 70, 160].forEach(function (x, i) { mid += at(1300 + x, MAT + 10 - 455, g("thit" + i, thit(2420 + i * 3, 64 + (i % 2) * 14, 92 + (i % 3) * 16))); });
  mid += at(1300, MAT + 10, st1.front);
  mid += at(2470, MAT + 10, st2.back) + at(2470, MAT + 10, st2.front);
  mid += at(2800, MAT + 14, D.fishBarrel("tb"));
  var cc = chongCa(2440);
  mid += at(2120, MAT + 14, cc.svg);
  var DX = 2120 + cc.dinh[0] + 40, DY = MAT + 14 + cc.dinh[1] - 6;
  mid += at(DX, DY, g("caMoi", '<g transform="scale(-0.5,0.5) rotate(4)">' + D.fish({ seed: 2499 }) + "</g>"));
  mid += M.svg;
  // bàn tay người bán (không mặt) chìa từ bên phải vào, cầm thêm một "khúc" cá
  mid += at(DX + 70, DY, g("tay", g("tayCa", '<g transform="translate(-70,0) scale(-0.5,0.5) rotate(4)">' + D.fish({ seed: 2499 }) + "</g>") +
    '<g transform="translate(0,-6)">' + D.gloveHand() + "</g>"));
  var fx = api.lapLanh("spk", 6, 2450, [1700, 600, 520, 200], 5.9, 8.2);
  api.dat(nen.troi + api.lop("xa", xa, 0.35, { mat: 780 }) + api.lop("giua", mid + fx, 1, { mat: MAT }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }));
  api.noi({});

  // ---- mốc lời ----
  var tFood = T("Food", 0, 2.10), tRiver = T("river", 0, 4.55), tMeat = T("meat", 0, 5.33), tFish = T("fish", 0, 5.98);
  var tFrozen = T("frozen", 0, 7.58), tStack = T("stacked", 0, 8.72), tFire = T("firewood", 0, 9.30);
  var tFarm = T("Farming", 0, 10.34), tGround = T("ground", 0, 11.14), tImp = T("impossible", 0, 12.28);

  // ---- camera ----
  api.camera([
    [0, 560, 640, 1.25], [1.9, 690, 645, 1.3, "sine.inOut"],
    [tFood + 0.2, 760, 630, 1.28, "sine.inOut"],
    [tRiver - 0.3, 1230, 600, 1.12, "sine.inOut"],                 // lướt theo Wob qua quầy thịt treo
    [tMeat + 0.3, 1250, 470, 0.9, "power2.inOut"],                  // ngước lên: sông băng xa
    [tFish - 0.15, 1260, 468, 0.92, "sine.inOut"],
    [tFish + 0.45, 2128, 772, 3.0, "power3.inOut"],                // lao vào một con cá đông cứng
    [tFrozen + 0.3, 2132, 770, 3.15, "sine.inOut"],
    [tStack + 0.05, 2150, 700, 1.7, "power2.inOut"],               // lùi: chồng cá xếp như củi
    [tFire + 0.6, 2240, 620, 1.04, "power2.inOut"],                 // cả quầy
    [tFarm - 0.05, 2230, 625, 1.06, "sine.inOut"],
    [tFarm + 0.55, 1930, 712, 1.6, "power2.inOut"],                 // trung cảnh Wob + xẻng
    [DUR, 1935, 716, 1.7, "sine.inOut"]
  ]);

  // ---- Wob đi vào chợ, qua quầy thịt ----
  var REST = { aLu: 18, aLf: -10, aRu: -18, aRf: 10 };
  M.set(0, Object.assign({ x: 150, y: 900, size: 0.7, lashes: 1, ice: 1, pupX: 6 }, REST));
  M.mouth(0, "smirk");
  api.origin("#M-sv", "0 0"); api.set("#M-sv", 0, { opacity: 0 });
  M.walk(0.0, 1.85, 150, 650, { step: 0.3, tieng: true });
  M.idle(1.85, tFood + 0.15, { seed: 241, bien: 1.6 });
  M.pose(1.9, 0.2, { pupX: 9, pupY: -4 }, "power2.out");
  M.walk(tFood + 0.15, tRiver - 0.35, 650, 1150, { step: 0.3, tieng: true });
  M.pose(tFood + 0.6, 0.25, { pupX: 4, pupY: -10 }, "power2.out");          // nhìn thịt treo trên đầu
  M.mouth(tFood + 0.8, "o");
  // dừng, ngước nhìn ra sông xa
  M.pose(tRiver - 0.3, 0.3, { upRot: 3, pupX: 10, pupY: -12 }, "power2.out");
  M.mouth(tRiver, "X");
  M.idle(tRiver - 0.3, tFish, { seed: 242, bien: 1.4 });
  // (ngoài khung) đi tiếp sang chồng cá
  M.pose(tFish - 0.1, 0.15, { upRot: 0, pupX: 6, pupY: 0 }, "power2.out");
  M.walk(tFish, tFish + 1.3, 1150, 1760, { step: 0.28 });
  // trước chồng cá: há hốc, nhìn lên đỉnh chồng
  M.pose(tStack - 0.25, 0.2, { pupX: 10, pupY: -8, eye: 1.15 }, "back.out(2)");
  M.mouth(tStack - 0.2, "o");
  M.pose(tFire - 0.05, 0.18, { upRot: 6 }, "power2.out");                    // nghiêng đầu: "như củi"
  M.pose(tFire + 0.5, 0.25, { upRot: 0, eye: 1 }, "power2.out");
  M.mouth(tFire + 0.4, "flat");
  M.idle(tStack - 0.3, tFarm, { seed: 243, bien: 1.2, tho: false });

  // ---- cá lấp lánh băng (cận), bàn tay người bán đặt thêm một khúc cá lên đỉnh chồng ----
  api.origin("#tay", "0 0");
  var dr = api.duaRut("#tay", tStack - 0.35, { tu: [560, -30], giu: 0.25, vao: 0.45, ra: 0.42, xoay: -6 });
  api.show("#tayCa", 0, 1); api.show("#tayCa", dr.den + 0.02, 0);
  api.show("#caMoi", 0, 0); api.show("#caMoi", dr.den + 0.02, 1);
  api.origin("#caMoi", "0 0");
  api.key("#caMoi", "y", 0, 0); api.key("#caMoi", "y", dr.den + 0.02, -6, "step"); api.key("#caMoi", "y", dr.den + 0.14, 0, "bounce.out");
  api.sfx("bonk", dr.den + 0.04, 0.35);

  // ---- xẻng (sửa vòng 1): rút từ ba lô, giơ lên, lấy đà 0,15 s, đập xuống đất "keng", nảy ngược 40 px, rung 7 khung, giữ 0,6 s ----
  var tR = tFarm + 0.02, tUp = tR + 0.3, tI = tGround - 0.03, tW = tI - 0.27, tB = tI + 0.1, tV = tB + 0.08, tH = tV + 7 / 30;
  M.pose(tR, 0.22, { aRu: -168, aRf: -30, upRot: -4 }, "power2.out");        // với ra sau ba lô
  api.set("#M-sv", tR + 0.2, { opacity: 1 });
  api.key("#M-sv", "rotation", 0, 0); api.key("#M-sv", "rotation", tR + 0.2, 18, "step");
  api.key("#M-sv", "y", 0, 0);
  M.pose(tUp, 0.25, { aRu: -130, aRf: -40, upRot: 0, pupX: 10, pupY: 6 }, "power2.inOut");   // giơ xẻng lên
  api.key("#M-sv", "rotation", tUp, 18, "none"); api.key("#M-sv", "rotation", tUp + 0.25, -10, "power2.inOut");
  M.mouth(tUp, "smirk");
  // lấy đà
  M.pose(tW, 0.15, { aRu: -166, aRf: -46, lean: -6, sy: 1.05, sx: 0.97 }, "power2.out");
  api.key("#M-sv", "rotation", tW, -10, "none"); api.key("#M-sv", "rotation", tW + 0.15, -16, "power2.out");
  // đập xuống
  M.pose(tW + 0.15, 0.12, { aRu: -34, aRf: -10, sy: 0.94, sx: 1.04, lean: 5 }, "power3.in");
  api.key("#M-sv", "rotation", tW + 0.15, -16, "none"); api.key("#M-sv", "rotation", tI, 40, "power2.out");
  api.key("#M-sv", "rotation", tB, 40, "none");
  api.shake(tI, 6, 4);
  api.sfx("bonk", tI, 0.6);
  // nảy ngược 40 px (xẻng trong tay, toạ độ tay = 0,7 lần)
  api.key("#M-sv", "y", tB, 0, "none"); api.key("#M-sv", "y", tV, -57, "power3.out");
  M.pose(tB, 0.08, { aRu: -44, aRf: -14, sy: 1.08, sx: 0.95, upY: -12, eye: 1.28, lean: 0 }, "power3.out");
  api.sfx("boing", tB, 0.8);
  // rung 7 khung, Wob rung theo
  for (var k = 1; k <= 7; k++) api.key("#M-sv", "rotation", tV + k / 30, 40 + (k % 2 ? 13 : -13) * (1 - k / 9), "none");
  M.shiver(tV, tH, 5, 30);
  M.mouth(tB, "chatter");
  // giữ 0,6 s: xẻng lơ lửng, Wob trố mắt, còn run nhẹ
  api.key("#M-sv", "rotation", tH + 0.03, 40, "sine.out");
  for (var k3 = 0, t3 = tH + 0.1; t3 < tH + 0.6; k3++, t3 += 0.1) api.key("#M-sv", "rotation", t3, 40 + (k3 % 2 ? 2 : -2), "sine.inOut");
  M.shiver(tH, tH + 0.6, 1.2, 12);
  // thả lỏng: xẻng chống xuống đất, tỉnh bơ nhìn người xem
  var tX = tH + 0.6;
  api.key("#M-sv", "y", tX, -57, "none"); api.key("#M-sv", "y", tX + 0.3, 0, "power2.out");
  api.key("#M-sv", "rotation", tX, 40, "none"); api.key("#M-sv", "rotation", tX + 0.3, 100, "power2.out");
  for (var k2 = 0, s2 = 1, t2 = tX + 0.3; t2 < DUR - 0.1; k2++, t2 += 0.07, s2 = -s2) api.key("#M-sv", "rotation", t2 + 0.07, 100 + s2 * 3 * Math.max(0.2, 1 - k2 / 14), "sine.inOut");
  M.pose(tX, 0.3, { sy: 1, sx: 1, upY: 0, eye: 1, aRu: -70, aRf: -40 }, "power2.out");
  M.mouth(tX, "flat");
  M.pose(Math.max(tImp - 0.1, tX + 0.35), 0.25, { pupX: -2, pupY: 2, lid: 22 }, "power2.out");
  M.idle(tX + 0.05, DUR, { seed: 244, bien: 1.2, tho: false });
  M.breathe(0, DUR, 2.4);
  M.autoBlink(0.3, tFarm - 0.3, 2401);
};
