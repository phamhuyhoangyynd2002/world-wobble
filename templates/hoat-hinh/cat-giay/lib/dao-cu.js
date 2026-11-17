/* Thư viện đạo cụ phong cách "cắt giấy" – World Wobble (tách từ bản thử A ngày 16/11/2026).
   Mỗi hàm trả về chuỗi SVG. Toạ độ quanh gốc (0,0) của đạo cụ, ghi rõ gốc ở từng hàm.
   Tất định: mọi nhiễu (mép răng cưa, đốm băng) dùng RNG có seed, chạy lại ra y hệt.
   Không ảnh chụp, không ảnh AI: mọi nét là toạ độ viết tay.
   KHÔNG chứa chữ của tập: chữ nào hiện trên đồ vật thì truyền vào qua tham số (chỉ chữ trong HH_DATA.chu_tren_do_vat). */
(function (G) {
  "use strict";
  var INK = "#1f2326";
  var C = {
    ink: INK, ground: "#1E2A2B", sea: "#3F6A70", paper: "#EFE3C8", paperDark: "#D9C9A6",
    accent: "#E0703A", accent2: "#E85D45", snow: "#F7FBFC", snowShade: "#D3E4EC",
    ice: "#BFE0EE", iceDeep: "#86B9CF", sky: "#DCEBF0", wood: "#7A5236", woodDark: "#553521",
    woodLight: "#A06D45", glow: "#FFD68A", fishBody: "#A9C1CC", fishDark: "#6E8C9C", fishBelly: "#E3ECEE",
    mitten: "#C9463A", sleeve: "#3E5A4A", kraft: "#C89A62", kraftDark: "#9C7240", car: "#D4A24C", carDark: "#A97C2E",
    tea: "#8A4B22", mug: "#F4F1E8", mugRim: "#3F6A70", text: "#FFF8EC"
  };

  function rng(seed) {
    var a = (seed >>> 0) || 1;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function f1(n) { return (Math.round(n * 10) / 10).toString(); }

  /* ---------- hình học giấy cắt ---------- */
  function ptsRect(x, y, w, h) { return [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; }
  function ptsEllipse(cx, cy, rx, ry, n) {
    var p = []; n = n || 28;
    for (var i = 0; i < n; i++) { var t = 2 * Math.PI * i / n; p.push([cx + rx * Math.cos(t), cy + ry * Math.sin(t)]); }
    return p;
  }
  /* mép răng cưa: chia cạnh thành đoạn ~step px, lệch vuông góc ±j */
  function rough(pts, j, seed, step) {
    var r = rng(seed || 7), s = step || 16, out = [];
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i], b = pts[(i + 1) % pts.length];
      var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, n = Math.max(1, Math.round(L / s));
      var nx = -dy / L, ny = dx / L;
      for (var k = 0; k < n; k++) {
        var t = k / n, o = (k === 0 ? 0.3 : 1) * (r() * 2 - 1) * j;
        out.push([a[0] + dx * t + nx * o, a[1] + dy * t + ny * o]);
      }
    }
    return "M" + out.map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join(" L") + " Z";
  }
  function rRect(x, y, w, h, j, seed) { return rough(ptsRect(x, y, w, h), j == null ? 2.2 : j, seed); }
  function rEll(cx, cy, rx, ry, j, seed) { return rough(ptsEllipse(cx, cy, rx, ry, Math.max(18, Math.round((rx + ry) / 6))), j == null ? 2 : j, seed, 12); }

  /* một mảnh giấy: bóng đổ lệch (lớp giấy dưới) + viền lệch màu kiểu in lụa + mảnh chính (+ lưới chấm risograph) */
  function paper(d, fill, o) {
    o = o || {};
    var s = "";
    if (o.shadow !== false) s += '<path d="' + d + '" fill="#0b1214" opacity="' + (o.shOp || 0.22) + '" transform="translate(' + (o.sx == null ? 6 : o.sx) + ',' + (o.sy == null ? 8 : o.sy) + ')"/>';
    if (o.fringe) s += '<path d="' + d + '" fill="' + o.fringe + '" opacity="0.5" transform="translate(-3,-2)"/>';
    s += '<path d="' + d + '" fill="' + fill + '"' + (o.stroke ? ' stroke="' + INK + '" stroke-width="' + (o.sw || 4) + '" stroke-linejoin="round"' : "") + (o.id ? ' id="' + o.id + '"' : "") + "/>";
    if (o.half) s += '<path d="' + d + '" fill="url(#half)" opacity="' + (o.half === true ? 0.3 : o.half) + '"/>';
    return s;
  }
  function line(d, w, c, extra) {
    return '<path d="' + d + '" fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w || 4) + '" stroke-linecap="round" stroke-linejoin="round"' + (extra || "") + "/>";
  }
  function txt(x, y, s, size, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" font-family="Fraunces" font-size="' + size + '" font-weight="' + (o.w || 800) +
      '" fill="' + (o.fill || INK) + '" text-anchor="' + (o.anchor || "middle") + '"' +
      ' data-layout-allow-occlusion data-layout-allow-overflow style="font-variation-settings:\'SOFT\' 100, \'WONK\' 1"' + (o.extra || "") + ">" + s + "</text>";
  }

  /* defs dùng chung: lưới chấm risograph, kẻ ca-rô chăn, bóng đổ con rối, gradient trời/ánh đèn/sương */
  function defs() {
    return "<defs>" +
      '<pattern id="half" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(22)"><circle cx="4.5" cy="4.5" r="1.9" fill="' + INK + '"/></pattern>' +
      '<pattern id="halfW" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)"><circle cx="5" cy="5" r="2" fill="#ffffff"/></pattern>' +
      '<pattern id="plaid" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">' +
      '<rect width="56" height="56" fill="#E9D7AE"/><rect x="0" y="18" width="56" height="12" fill="#E0703A" opacity="0.85"/>' +
      '<rect x="20" y="0" width="12" height="56" fill="#E0703A" opacity="0.6"/><rect x="0" y="44" width="56" height="4" fill="#3F6A70" opacity="0.7"/>' +
      '<rect x="44" y="0" width="4" height="56" fill="#3F6A70" opacity="0.7"/></pattern>' +
      '<filter id="pshadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="6" dy="8" stdDeviation="2.5" flood-color="#0b1214" flood-opacity="0.32"/></filter>' +
      '<linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9D5E0"/><stop offset="0.55" stop-color="#DCEBF0"/><stop offset="1" stop-color="#F1F0E6"/></linearGradient>' +
      '<radialGradient id="lampG" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFD68A" stop-opacity="0.55"/><stop offset="0.6" stop-color="#FFB86A" stop-opacity="0.16"/><stop offset="1" stop-color="#FFB86A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="fogG" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0.75"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="cuG" cx="0.62" cy="0.45" r="0.75"><stop offset="0" stop-color="#F4FAFC"/><stop offset="0.6" stop-color="#CFE5EE"/><stop offset="1" stop-color="#8FB8CA"/></radialGradient>' +
      /* khói: đặc ở chân, tan dần lên đỉnh (objectBoundingBox nên theo được path đổi hình mỗi khung) */
      '<linearGradient id="khoiG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.96"/><stop offset="0.55" stop-color="#F4F8F9" stop-opacity="0.82"/><stop offset="1" stop-color="#EEF4F6" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="khoiBongG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#5E7F8C" stop-opacity="0.32"/><stop offset="0.6" stop-color="#5E7F8C" stop-opacity="0.16"/><stop offset="1" stop-color="#5E7F8C" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="skyCold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A9CADA"/><stop offset="0.5" stop-color="#D3E6EE"/><stop offset="1" stop-color="#F3F1E6"/></linearGradient>' +
      "</defs>";
  }

  /* ---------- đạo cụ ---------- */

  /* Cá đông cứng. Gốc: giữa thân; đầu bên trái (x≈-118), đuôi bên phải (x≈134).
     o.eye: "stare" (mắt trố, mặc định) | "calm" (lim dim) | "sad". o.frost: mức băng 0..1 */
  function fish(o) {
    o = o || {};
    var r = rng(o.seed || 11);
    var body = "M -118 0 C -110 -30 -60 -40 -10 -38 C 40 -36 80 -22 96 -6 L 96 6 C 80 22 40 36 -10 36 C -60 38 -110 30 -118 0 Z";
    var tail = "M 90 -5 L 134 -38 C 126 -14 126 14 134 38 L 90 5 Z";
    var s = "<g>";
    s += '<path d="' + tail + '" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += '<path d="M -24 -36 C -10 -60 24 -60 42 -31 Z" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="4.5" stroke-linejoin="round"/>';
    s += '<path d="M -10 34 C 0 52 20 52 30 31 Z" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    s += '<path d="' + body + '" fill="' + C.fishBody + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += '<path d="M -104 12 C -60 32 20 32 84 9 C 40 24 -40 26 -104 12 Z" fill="' + C.fishBelly + '"/>';
    s += '<path d="M -104 12 C -60 32 20 32 84 9" fill="none" stroke="' + INK + '" stroke-width="2.5" opacity="0.45"/>';
    for (var i = 0; i < 4; i++) s += line("M " + (-30 + i * 26) + " -24 C " + (-24 + i * 26) + " -14 " + (-24 + i * 26) + " -2 " + (-30 + i * 26) + " 6", 3, C.fishDark, ' opacity="0.8"');
    s += line("M -76 -24 C -64 -8 -64 10 -76 24", 4);
    s += line("M -118 2 L -104 4", 3.5);
    if (o.eye === "calm") {
      s += '<circle cx="-94" cy="-8" r="11" fill="#fffdf6" stroke="' + INK + '" stroke-width="3.5"/>';
      s += '<path d="M -105 -9 C -100 -1 -88 -1 -83 -9 L -83 -19 L -105 -19 Z" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="3"/>';
      s += line("M -104 -8 C -98 -2 -90 -2 -84 -8", 3.5);
    } else {
      s += '<circle cx="-94" cy="-8" r="11" fill="#fffdf6" stroke="' + INK + '" stroke-width="3.5"/>';
      s += '<circle cx="-95" cy="-8" r="4" fill="' + INK + '"/>';
    }
    var fr = o.frost == null ? 1 : o.frost;
    if (fr > 0) {
      for (var k = 0; k < 9; k++) {
        var fx = -100 + r() * 190, fy = -26 + r() * 46;
        s += '<path d="M ' + f1(fx) + " " + f1(fy - 6) + " L " + f1(fx + 3) + " " + f1(fy) + " L " + f1(fx) + " " + f1(fy + 6) + " L " + f1(fx - 3) + " " + f1(fy) + ' Z" fill="#ffffff" opacity="' + (0.55 * fr) + '"/>';
      }
      s += '<path d="M -60 -36 C -30 -42 10 -42 40 -34 C 20 -30 -20 -30 -60 -36 Z" fill="#ffffff" opacity="' + (0.7 * fr) + '"/>';
    }
    return s + "</g>";
  }

  /* Cá đã rã đông, vắt qua mép sách. Gốc: chỗ gập (mép sách). Phần đầu nằm trên sách (về bên trái),
     phần đuôi treo trong nhóm id+"-tail" (xoay quanh gốc) để còn rũ thêm. */
  function fishFloppy(id) {
    var s = '<g id="' + id + '">';
    s += '<path d="M -230 2 C -222 -26 -176 -34 -130 -32 C -80 -30 -30 -24 0 -16 L 4 14 C -40 22 -100 30 -150 30 C -196 30 -224 22 -230 2 Z" fill="' + C.fishBody + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += '<path d="M -214 12 C -170 26 -90 24 -10 12" fill="none" stroke="#ffffff" stroke-width="7" opacity="0.6"/>';
    s += line("M -188 -22 C -176 -8 -176 10 -188 22", 4);
    s += '<circle cx="-206" cy="-6" r="11" fill="#fffdf6" stroke="' + INK + '" stroke-width="3.5"/>';
    s += '<path d="M -217 -7 C -212 2 -200 2 -195 -7 L -195 -18 L -217 -18 Z" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="3"/>';
    s += line("M -216 -6 C -210 2 -202 2 -196 -6", 3.5);
    s += line("M -230 4 C -224 8 -218 8 -214 6", 3.5);
    s += line("M -120 -30 C -110 -10 -112 6 -122 24", 3, C.fishDark, ' opacity="0.7"');
    s += '<g id="' + id + '-tail">';
    s += '<path d="M -2 -16 C 22 -10 34 10 34 40 C 34 80 28 110 26 130 L 2 130 C 0 108 -4 74 -6 44 C -8 30 -10 22 -14 14 Z" fill="' + C.fishBody + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += '<path d="M 4 126 C -20 150 -26 166 -22 182 C -2 170 22 168 40 178 C 44 160 40 142 30 126 Z" fill="' + C.fishDark + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += '<path d="M 24 20 C 30 50 28 90 22 120" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.55"/>';
    s += '<g id="' + id + '-drip"><path d="M 14 186 C 8 196 8 204 14 206 C 20 204 20 196 14 186 Z" fill="#9fd3ea" stroke="' + INK + '" stroke-width="2.5"/></g>';
    s += "</g></g>";
    return s;
  }

  /* Đèn bàn. Gốc: tâm đế trên mặt bàn. Chao đèn hướng xuống phải. */
  function deskLamp() {
    var s = "<g>";
    s += paper(rEll(0, 0, 92, 22, 2, 31), "#2C3A3B", { stroke: true, sw: 5 });
    s += line("M 0 -6 L 40 -300", 20, INK) + line("M 0 -6 L 40 -300", 12, "#3F6A70");
    s += '<circle cx="40" cy="-300" r="16" fill="#3F6A70" stroke="' + INK + '" stroke-width="5"/>';
    s += line("M 40 -300 L 210 -380", 20, INK) + line("M 40 -300 L 210 -380", 12, "#3F6A70");
    s += '<g transform="translate(210,-380) rotate(-28)">';
    s += paper("M -70 0 L 70 0 L 120 150 L -120 150 Z", C.accent, { stroke: true, sw: 6, half: 0.18, fringe: "#F3C27A" });
    s += '<ellipse cx="0" cy="150" rx="120" ry="22" fill="#FFE6A8" stroke="' + INK + '" stroke-width="5"/>';
    s += '<ellipse cx="0" cy="146" rx="46" ry="14" fill="#FFF6D8"/>';
    s += "</g></g>";
    return s;
  }

  /* Hộp kỷ vật mở nắp. Gốc: giữa đáy trước. Rộng ~300. */
  function memoryBox() {
    var s = "<g>";
    s += paper("M -150 -190 L -40 -250 L 30 -190 Z", "#B48B57", { stroke: true, sw: 5, sy: 4 });
    s += paper("M 150 -190 L 220 -260 L 260 -186 Z", "#B48B57", { stroke: true, sw: 5, sy: 4 });
    s += paper(rRect(-150, -190, 300, 190, 2, 41), "#C8A06A", { stroke: true, sw: 5, half: 0.2 });
    // đồ ló ra: găng len, bưu thiếp trắng, quả thông
    s += paper("M -110 -190 C -120 -240 -96 -270 -70 -262 C -60 -290 -30 -286 -30 -258 L -24 -190 Z", C.mitten, { stroke: true, sw: 4, shadow: false });
    s += line("M -104 -206 L -28 -206", 8, "#F3E6CC");
    s += paper("M 0 -190 L 18 -282 L 120 -268 L 100 -190 Z", "#F6F0E2", { stroke: true, sw: 4, shadow: false });
    s += '<rect x="78" y="-262" width="26" height="30" fill="none" stroke="' + C.accent + '" stroke-width="3" transform="rotate(8 90 -246)"/>';
    s += line("M 30 -250 L 70 -246 M 28 -236 L 66 -232", 3, INK, ' opacity="0.4"');
    s += line("M -150 -150 L 150 -150", 3, INK, ' opacity="0.35"');
    s += "</g>";
    return s;
  }

  /* Chồng sách nằm. Gốc: mép trên bên phải của cuốn trên cùng (chỗ cá vắt qua). */
  function bookStack() {
    var s = "<g>";
    s += paper(rRect(-300, 30, 320, 46, 1.5, 51), "#3F6A70", { stroke: true, sw: 5 });
    s += line("M -290 52 L 10 52", 3, "#EFE3C8", ' opacity="0.7"');
    s += paper(rRect(-280, 0, 290, 34, 1.5, 52), C.accent, { stroke: true, sw: 5 });
    s += paper(rRect(-286, -2, 286, 8, 1, 53), "#F3E6CC", { shadow: false });
    return s + "</g>";
  }

  /* Bản vẽ tay ngôi làng tuyết trên trang sổ (nét mực trên giấy). Gốc: góc trên trái trang 300×420.
     o.dong1, o.dong2: hai dòng chữ trên biển (chữ ≥ 40px; bỏ trống thì biển trơn). Cửa sổ đánh id để sáng đèn. */
  function villageSketch(id, o) {
    o = o || {};
    var s = '<g id="' + id + '">';
    s += line("M 14 170 C 60 140 110 150 150 132 C 190 116 240 130 288 118", 3.5, INK, ' opacity="0.8"');
    var houses = [[56, 196, 70], [150, 206, 84], [238, 192, 62]];
    houses.forEach(function (h, i) {
      var x = h[0], y = h[1], w = h[2];
      s += '<path d="M ' + (x - w / 2) + " " + y + " L " + (x - w / 2) + " " + (y - w * 0.55) + " L " + x + " " + (y - w * 0.95) + " L " + (x + w / 2) + " " + (y - w * 0.55) + " L " + (x + w / 2) + " " + y + ' Z" fill="#F6EEDC" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>';
      s += line("M " + (x - w / 2 - 6) + " " + (y - w * 0.52) + " L " + x + " " + (y - w * 1.0) + " L " + (x + w / 2 + 6) + " " + (y - w * 0.52), 6, INK);
      s += '<rect id="' + id + "-win" + i + '" x="' + (x - 10) + '" y="' + (y - w * 0.4) + '" width="20" height="18" fill="#F6EEDC" stroke="' + INK + '" stroke-width="3"/>';
      s += line("M " + (x + w * 0.22) + " " + (y - w * 0.8) + " L " + (x + w * 0.22) + " " + (y - w * 0.8 - 70), 3, INK, ' opacity="0.6" stroke-dasharray="2 7"');
    });
    s += line("M 20 236 L 290 236", 3, INK, ' opacity="0.5"');
    // biển tên làng trên cột
    s += line("M 150 402 L 150 360", 6);
    s += '<path d="M 18 244 L 282 240 L 284 362 L 16 366 Z" fill="#F6EEDC" stroke="' + INK + '" stroke-width="4.5" stroke-linejoin="round"/>';
    if (o.dong1) s += txt(150, 290, o.dong1, 44, { w: 900 });
    if (o.dong2) s += txt(150, 348, o.dong2, 40, { w: 700 });
    s += line("M 30 404 C 80 398 120 408 170 402 C 210 396 250 406 280 400", 3, INK, ' opacity="0.6"');
    return s + "</g>";
  }

  /* Trang ghi chép cũ (nét mực mờ, không chữ). Gốc: góc trên trái trang 300×420. */
  function notesPage(seed) {
    var r = rng(seed || 61), s = "<g>";
    for (var y = 70; y < 380; y += 34) s += line("M 30 " + y + " L " + f1(150 + r() * 120) + " " + y, 3, INK, ' opacity="0.28"');
    s += '<g transform="translate(200,120) scale(0.35)">' + fish({ frost: 0 }) + "</g>";
    return s + "</g>";
  }

  /* Bong bóng ký hiệu. Gốc: mũi đuôi (chỉ xuống trái, về phía đầu Wob). kind: "?!" | "..." | "bag" | "?" */
  function bubble(kind) {
    var s = "<g>";
    s += paper("M 0 0 L 34 -60 C -10 -80 -6 -170 80 -176 C 170 -182 196 -96 150 -66 C 120 -46 80 -50 56 -56 Z", "#FFFDF6", { stroke: true, sw: 6, sx: 5, sy: 6 });
    if (kind === "bag") {
      s += '<path d="M 66 -150 L 124 -150 L 132 -80 L 58 -80 Z" fill="' + C.kraft + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
      s += line("M 78 -150 C 78 -172 112 -172 112 -150", 5);
      s += txt(150, -132, "?", 56, { w: 900, fill: C.accent });
    } else if (kind === "...") {
      s += '<circle cx="64" cy="-112" r="10" fill="' + INK + '"/><circle cx="96" cy="-112" r="10" fill="' + INK + '"/><circle cx="128" cy="-112" r="10" fill="' + INK + '"/>';
    } else {
      s += txt(96, -90, kind, 84, { w: 900, fill: kind === "?!" ? "#C23B2A" : INK });
    }
    return s + "</g>";
  }

  /* Nhiệt kế treo tường. Gốc: góc trên trái tấm gỗ 170×378. id+"-merc" là cột thuỷ ngân (scaleY quanh đáy, origin "0 0").
     o.c, o.f: hai dòng chữ (vd "−46°C", "−51°F"), nằm trong nhóm id+"-c", id+"-f" để bật riêng. Bỏ trống thì không có chữ. */
  function thermometer(id, o) {
    o = o || {};
    var s = '<g id="' + id + '">';
    s += paper(rRect(0, 0, 170, 378, 2, 71), "#E9DDC2", { stroke: true, sw: 5, half: 0.15 });
    s += '<circle cx="85" cy="18" r="6" fill="' + INK + '"/>';
    s += '<rect x="68" y="34" width="34" height="196" rx="17" fill="#FFFDF6" stroke="' + INK + '" stroke-width="5"/>';
    for (var y = 52; y < 222; y += 18) s += line("M 108 " + y + " L " + (y % 36 === 16 ? 126 : 118) + " " + y, 3);
    s += '<g transform="translate(85,236)"><rect id="' + id + '-merc" x="-8" y="-190" width="16" height="190" rx="8" fill="' + C.accent2 + '"/></g>';
    s += '<circle cx="85" cy="246" r="22" fill="' + C.accent2 + '" stroke="' + INK + '" stroke-width="5"/>';
    s += line("M 18 274 L 152 274", 3, INK, ' opacity="0.4"');
    s += '<g id="' + id + '-c">' + (o.c ? txt(85, 312, o.c, 46, { w: 900 }) : "") + "</g>";
    s += '<g id="' + id + '-f">' + (o.f ? txt(85, 364, o.f, 42, { w: 800, fill: "#5A3A25" }) : "") + "</g>";
    return s + "</g>";
  }

  /* Nhà gỗ nền (một khối). Gốc: giữa chân tường. o: w, h, roof, seed, tone */
  function logHouse(o) {
    var w = o.w, h = o.h, rf = o.roof || w * 0.32, sd = o.seed || 81, tone = o.tone || C.wood;
    var s = "<g>";
    s += paper(rRect(w * 0.18, -h - rf * 0.9, w * 0.11, rf * 0.8, 1.5, sd + 1), "#5A4636", { stroke: true, sw: 4 });
    s += paper(rRect(-w / 2, -h, w, h, 2, sd), tone, { stroke: true, sw: 5, half: 0.18 });
    for (var y = -h + 22; y < -6; y += 24) s += line("M " + (-w / 2 + 6) + " " + y + " L " + (w / 2 - 6) + " " + (y + 1), 3, "#3A2618", ' opacity="0.55"');
    s += paper(rough([[-w / 2 - 26, -h + 6], [0, -h - rf], [w / 2 + 26, -h + 6]], 2.5, sd + 2, 18), C.snow, { stroke: true, sw: 5, fringe: C.ice });
    s += paper(rRect(-w * 0.14, -h * 0.66, w * 0.28, h * 0.34, 1.5, sd + 3), "#FFD68A", { stroke: true, sw: 4, shadow: false });
    s += line("M 0 " + f1(-h * 0.66) + " L 0 " + f1(-h * 0.32), 3);
    s += paper(rough([[-w / 2 - 30, 0], [-w / 2 - 10, -26], [w / 2 + 12, -20], [w / 2 + 34, 0]], 3, sd + 4, 20), C.snow, { stroke: true, sw: 4, shadow: false });
    return s + "</g>";
  }

  /* Cây thông rụng lá (larch) mảnh, nét mực. Gốc: gốc cây. */
  function larch(hh, seed) {
    var r = rng(seed), s = "<g>" + line("M 0 0 L 0 " + (-hh), 5);
    for (var y = -hh * 0.2; y > -hh; y -= 14) {
      var L = (hh + y) * 0.22 + r() * 6;
      s += line("M 0 " + f1(y) + " L " + f1(-L) + " " + f1(y + 8) + " M 0 " + f1(y - 6) + " L " + f1(L) + " " + f1(y + 2), 3, INK, ' opacity="0.85"');
    }
    return s + "</g>";
  }

  /* Quầy chợ ngoài trời. Gốc: giữa chân quầy trước. Rộng 600. Trả {back, front}: back vẽ trước bàn tay, front vẽ sau. */
  function marketStall() {
    var back = "<g>";
    back += paper(rRect(-286, -470, 22, 470, 1.5, 91), C.woodDark, { stroke: true, sw: 4 });
    back += paper(rRect(264, -470, 22, 470, 1.5, 92), C.woodDark, { stroke: true, sw: 4 });
    back += paper(rRect(-264, -400, 528, 220, 2, 93), "#2F4C4A", { stroke: true, sw: 4, half: 0.25 });
    for (var i = 0; i < 6; i++) back += line("M " + (-240 + i * 90) + " -398 C " + (-250 + i * 90) + " -320 " + (-230 + i * 90) + " -260 " + (-240 + i * 90) + " -182", 3, "#1c2f2e", ' opacity="0.6"');
    // mái bạt sọc + diềm lượn sóng phủ tuyết
    var canopy = "M -320 -470 L 320 -470 L 300 -540 L -300 -540 Z";
    back += paper(canopy, C.paper, { stroke: true, sw: 5 });
    for (var k = 0; k < 6; k++) back += '<path d="M ' + (-300 + k * 100) + " -540 L " + (-250 + k * 100) + " -540 L " + (-266 + k * 106.7 + 53) + " -470 L " + (-320 + k * 106.7) + ' -470 Z" fill="' + C.accent + '"/>';
    var sc = "M -320 -470";
    for (var m = 0; m < 8; m++) sc += " C " + (-320 + m * 80 + 10) + " -432 " + (-320 + m * 80 + 70) + " -432 " + (-320 + (m + 1) * 80) + " -470";
    back += paper(sc + " Z", C.accent, { stroke: true, sw: 5, shadow: false });
    back += paper(rough([[-310, -540], [-200, -566], [0, -572], [210, -564], [312, -540]], 3, 94, 22), C.snow, { stroke: true, sw: 4, shadow: false });
    back += "</g>";
    var front = "<g>";
    front += paper(rRect(-300, -190, 600, 22, 1.5, 95), C.woodLight, { stroke: true, sw: 5 });
    front += paper(rRect(-286, -168, 572, 168, 2, 96), C.wood, { stroke: true, sw: 5, half: 0.2 });
    for (var p = 0; p < 5; p++) front += line("M " + (-230 + p * 115) + " -160 L " + (-232 + p * 115) + " -8", 3, "#3A2618", ' opacity="0.5"');
    // vài con cá nằm xếp trên quầy
    for (var q = 0; q < 3; q++) front += '<g transform="translate(' + (60 + q * 70) + ',' + (-206 - q * 4) + ') rotate(' + (-8 + q * 7) + ') scale(0.5)">' + fish({ seed: 120 + q }) + "</g>";
    front += paper(rough([[-300, -190], [-150, -204], [80, -200], [300, -192], [300, -184], [-300, -184]], 2, 97, 22), C.snow, { shadow: false });
    front += "</g>";
    return { back: back, front: front };
  }

  /* Thùng cá dựng đứng như bó củi. Gốc: giữa đáy thùng. id+"-tap" là con cá Wob gõ. */
  function fishBarrel(id) {
    var s = '<g id="' + id + '">';
    var xs = [-48, -16, 16, 48, -32, 32];
    xs.forEach(function (x, i) {
      var g = '<g transform="translate(' + x + ',' + (-150 - (i % 2) * 14 - (i > 3 ? 16 : 0)) + ') rotate(' + (-90 + (i - 2.5) * 3) + ') scale(0.62)">' + fish({ seed: 140 + i }) + "</g>";
      s += i === 1 ? '<g id="' + id + '-tap">' + g + "</g>" : g;
    });
    s += paper("M -76 -124 L 76 -124 L 66 0 L -66 0 Z", C.woodLight, { stroke: true, sw: 5, half: 0.2 });
    s += line("M -72 -84 L 72 -84 M -69 -40 L 69 -40", 6, "#4B4B4B");
    s += paper(rough([[-80, -124], [0, -136], [80, -124], [76, -116], [-76, -116]], 2, 141, 16), C.snow, { shadow: false });
    return s + "</g>";
  }

  /* Bàn tay đeo găng + ống tay áo (không mặt người). Gốc: lòng bàn tay. Ống tay kéo dài sang phải. */
  function gloveHand() {
    var s = "<g>";
    s += paper(rRect(30, -38, 420, 76, 2, 151), C.sleeve, { stroke: true, sw: 5 });
    s += line("M 120 -36 C 116 -10 116 14 120 38", 3, "#22332a", ' opacity="0.6"');
    s += paper(rRect(10, -44, 36, 88, 1.5, 152), "#F3E6CC", { stroke: true, sw: 4 });
    s += paper("M 14 -34 C -30 -40 -54 -20 -50 6 C -48 30 -20 40 14 34 Z", C.mitten, { stroke: true, sw: 5, half: 0.15 });
    s += paper("M -18 -34 C -36 -58 -56 -50 -50 -30 C -46 -20 -34 -18 -24 -22 Z", C.mitten, { stroke: true, sw: 4, shadow: false });
    return s + "</g>";
  }

  /* Túi giấy kraft. Gốc: chỗ tay cầm (giữa miệng túi). torn=true: túi thủng, cá xuyên dọc qua. */
  function paperBag(torn) {
    var s = "<g>";
    if (torn) {
      s += '<g transform="translate(0,40) rotate(-90) scale(0.7)">' + fish({ seed: 171 }) + "</g>";
      s += paper("M -46 0 L 46 0 L 54 120 L 30 112 L 18 128 L 4 114 L -10 130 L -24 112 L -54 120 Z", C.kraft, { stroke: true, sw: 5, half: 0.15 });
      s += '<path d="M -30 -30 C -10 -40 12 -40 30 -30 L 30 4 L -30 4 Z" fill="' + C.fishBody + '"/>';
      s += line("M -30 4 L 30 4", 3, INK, ' opacity="0.4"');
    } else {
      s += paper("M -46 0 L 46 0 L 54 130 L -54 130 Z", C.kraft, { stroke: true, sw: 5, half: 0.15 });
      s += line("M -30 0 L -26 16 L 26 16 L 30 0", 3, C.kraftDark);
    }
    s += line("M -20 2 C -20 -30 20 -30 20 2", 5);
    return s + "</g>";
  }

  /* Xe hơi cũ, ghế lái trống. Hướng sang trái (đèn pha bên trái, ống xả bên phải ở (310,-43)). Gốc: giữa mặt đất dưới xe. Rộng ~600.
     o.mau: màu thân (mặc định vàng đất), o.vien: viền lệch màu. id+"-than" là nhóm thân xe (rung khi nổ máy). */
  function car(id, o) {
    o = o || {};
    var s = '<g id="' + id + '">';
    s += paper("M -300 -60 C -300 -120 -270 -150 -210 -156 L -150 -158 C -120 -240 -60 -272 40 -272 C 140 -272 190 -240 220 -160 L 270 -150 C 300 -140 306 -110 304 -60 L 300 -36 L -296 -36 Z", o.mau || C.car, { stroke: true, sw: 6, half: 0.18, fringe: o.vien || "#F3C27A" });
    // kính: thấy ghế lái trống + vô lăng
    s += '<path d="M -126 -164 C -100 -230 -50 -252 30 -252 L 30 -164 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += '<path d="M 46 -164 L 46 -252 C 120 -252 160 -230 190 -164 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += '<path d="M -20 -166 C -26 -200 -18 -226 0 -232 C 14 -234 20 -220 18 -190 L 22 -166 Z" fill="#6B4A32" stroke="' + INK + '" stroke-width="4"/>';
    s += '<ellipse cx="-74" cy="-184" rx="8" ry="22" fill="none" stroke="' + INK + '" stroke-width="5" transform="rotate(-20 -74 -184)"/>';
    s += line("M -100 -238 L -70 -200 M 70 -240 L 110 -196", 4, "#ffffff", ' opacity="0.8"');
    s += line("M 38 -160 L 38 -48", 4);
    s += line("M -20 -130 L 10 -130", 6);
    s += '<rect x="-306" y="-104" width="30" height="20" rx="4" fill="#FFF3C4" stroke="' + INK + '" stroke-width="4"/>';
    s += '<rect x="282" y="-104" width="22" height="20" rx="4" fill="' + C.accent2 + '" stroke="' + INK + '" stroke-width="4"/>';
    s += '<rect x="290" y="-50" width="40" height="14" rx="5" fill="#555" stroke="' + INK + '" stroke-width="4"/>';
    [-180, 180].forEach(function (x) {
      s += '<circle cx="' + x + '" cy="-36" r="46" fill="#2a2f31" stroke="' + INK + '" stroke-width="5"/><circle cx="' + x + '" cy="-36" r="18" fill="#9aa5a8" stroke="' + INK + '" stroke-width="4"/>';
    });
    s += paper(rough([[-150, -158], [-60, -280], [40, -286], [150, -276], [222, -164]], 3, 181, 18).replace(" Z", "") + " L 180 -262 L 40 -270 L -60 -264 Z", C.snow, { shadow: false });
    return s + "</g>";
  }

  /* Xe tắt máy bị tuyết vùi. Gốc: giữa mặt đất. id+"-lump" là cục tuyết trên nóc (tâm ở (-60,-300)) để rơi xuống. */
  function snowCar(id) {
    var s = '<g id="' + id + '">';
    s += paper(rough([[-300, 0], [-306, -90], [-250, -150], [-150, -170], [-110, -250], [20, -290], [150, -268], [220, -170], [300, -140], [312, -60], [306, 0]], 4, 191, 20), C.snow, { stroke: true, sw: 6, fringe: C.ice, half: 0.12 });
    s += '<path d="M -90 -180 C -70 -220 -30 -238 20 -240 L 20 -186 Z" fill="#9FBFCC" stroke="' + INK + '" stroke-width="4" opacity="0.8"/>';
    [-180, 180].forEach(function (x) { s += '<path d="M ' + (x - 50) + ' 0 C ' + (x - 46) + ' -50 ' + (x + 46) + ' -50 ' + (x + 50) + ' 0 Z" fill="#2a2f31" stroke="' + INK + '" stroke-width="5"/>'; });
    for (var i = 0; i < 7; i++) { var x = -230 + i * 70; s += '<path d="M ' + x + " -40 L " + (x + 8) + " " + (-8 - (i % 3) * 6) + " L " + (x + 16) + ' -40 Z" fill="' + C.ice + '" stroke="' + INK + '" stroke-width="2.5"/>'; }
    s += '<g id="' + id + '-lump">' + paper(rEll(-60, -300, 46, 22, 3, 192), C.snow, { stroke: true, sw: 4, sy: 5 }) + "</g>";
    return s + "</g>";
  }

  /* Cốc men có trà. Gốc: đáy cốc. id+"-steam" hơi nóng (3 sợi), id+"-ice" hơi đông cứng, id+"-frost" lớp băng phủ cốc. */
  function teaMug(id) {
    var s = '<g id="' + id + '">';
    var steam = "";
    [-22, 0, 22].forEach(function (x, i) {
      steam += '<g id="' + id + "-st" + i + '">' + line("M " + x + " -96 C " + (x - 16) + " -122 " + (x + 16) + " -140 " + x + " -166 C " + (x - 14) + " -186 " + (x + 10) + " -200 " + x + " -214", 8, "#ffffff", ' opacity="0.85"') + "</g>";
    });
    s += '<g id="' + id + '-steam">' + steam + "</g>";
    var ice = "";
    [-22, 0, 22].forEach(function (x) {
      var d = "M " + x + " -96 C " + (x - 16) + " -122 " + (x + 16) + " -140 " + x + " -166 C " + (x - 14) + " -186 " + (x + 10) + " -200 " + x + " -214";
      ice += line(d, 13, INK) + line(d, 7, C.ice);
    });
    s += '<g id="' + id + '-ice">' + ice + "</g>";
    s += '<path d="M 44 -76 C 80 -76 80 -26 44 -26" fill="none" stroke="' + INK + '" stroke-width="16"/><path d="M 44 -76 C 80 -76 80 -26 44 -26" fill="none" stroke="' + C.mug + '" stroke-width="8"/>';
    s += '<path d="M -48 -96 L 48 -96 L 42 -6 C 42 2 -42 2 -42 -6 Z" fill="' + C.mug + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += '<ellipse cx="0" cy="-96" rx="48" ry="12" fill="' + C.tea + '" stroke="' + C.mugRim + '" stroke-width="6"/>';
    s += '<path d="M -42 -46 L 44 -46" stroke="' + C.mugRim + '" stroke-width="6"/>';
    s += '<g id="' + id + '-frost"><path d="M -46 -92 L 46 -92 L 44 -60 C 20 -50 0 -66 -20 -54 C -32 -48 -40 -56 -45 -60 Z" fill="#ffffff" opacity="0.85"/>' +
      '<ellipse cx="0" cy="-96" rx="44" ry="9" fill="' + C.ice + '" opacity="0.9"/>' +
      line("M -30 -96 L -14 -90 L 4 -98 L 20 -92", 2.5, "#ffffff") + "</g>";
    return s + "</g>";
  }

  /* Cửa tủ đông khổng lồ (khung men trắng) bao quanh vùng x0..x1, y0..y1. */
  function freezerFrame(x0, y0, x1, y1, th) {
    var o = "M " + (x0 + 90) + " " + y0 + " L " + (x1 - 90) + " " + y0 + " Q " + x1 + " " + y0 + " " + x1 + " " + (y0 + 90) + " L " + x1 + " " + (y1 - 90) + " Q " + x1 + " " + y1 + " " + (x1 - 90) + " " + y1 +
      " L " + (x0 + 90) + " " + y1 + " Q " + x0 + " " + y1 + " " + x0 + " " + (y1 - 90) + " L " + x0 + " " + (y0 + 90) + " Q " + x0 + " " + y0 + " " + (x0 + 90) + " " + y0 + " Z";
    var a = x0 + th, b = y0 + th, c = x1 - th, d = y1 - th;
    var inner = " M " + a + " " + b + " L " + a + " " + d + " L " + c + " " + d + " L " + c + " " + b + " Z";
    var s = "<g>";
    s += '<path d="' + o + inner + '" fill="#0b1214" opacity="0.25" fill-rule="evenodd" transform="translate(16,22)"/>';
    s += '<path d="' + o + inner + '" fill="#F2F6F5" stroke="' + INK + '" stroke-width="12" fill-rule="evenodd" stroke-linejoin="round"/>';
    s += '<path d="M ' + (a - 24) + " " + (b - 24) + " L " + (c + 24) + " " + (b - 24) + " L " + (c + 24) + " " + (d + 24) + " L " + (a - 24) + " " + (d + 24) + ' Z" fill="none" stroke="#9AA7AB" stroke-width="22"/>';
    s += '<rect x="' + (x1 - 26) + '" y="' + ((y0 + y1) / 2 - 260) + '" width="70" height="520" rx="30" fill="#C9D3D6" stroke="' + INK + '" stroke-width="12"/>';
    s += '<g transform="translate(' + ((x0 + x1) / 2) + "," + (b + 40) + ')"><path d="M -60 -40 L 60 -40 L 40 0 L -40 0 Z" fill="#C9D3D6" stroke="' + INK + '" stroke-width="10"/><circle cx="0" cy="30" r="34" fill="#FFF3C4" stroke="' + INK + '" stroke-width="10"/></g>';
    var r = rng(201);
    for (var i = 0; i < 22; i++) {
      var t = i / 22, x = a + (c - a) * t;
      s += '<path d="M ' + f1(x - 30) + " " + b + " L " + f1(x) + " " + f1(b + 40 + r() * 70) + " L " + f1(x + 30) + " " + b + ' Z" fill="' + C.ice + '" stroke="' + INK + '" stroke-width="5"/>';
    }
    return s + "</g>";
  }

  /* Hàng rào gỗ thấp phủ tuyết. Gốc: trái chân rào. */
  function fence(w, seed) {
    var r = rng(seed), s = "<g>";
    s += line("M 0 -70 L " + w + " -66", 10, INK) + line("M 0 -70 L " + w + " -66", 5, C.woodLight);
    for (var x = 10; x < w; x += 58) {
      var hh = 100 + r() * 24;
      s += paper(rRect(x, -hh, 22, hh, 1.5, seed + x), C.woodDark, { stroke: true, sw: 4, sx: 4, sy: 5 });
      s += paper(rEll(x + 11, -hh, 16, 9, 1.5, seed + x + 1), C.snow, { shadow: false, stroke: true, sw: 3 });
    }
    return s + "</g>";
  }

  /* Ngôi sao băng lấp lánh (bụi kim cương). Gốc: tâm. */
  function sparkle(r0, color) {
    var r = r0 || 14;
    return '<path d="M 0 ' + (-r) + " L " + r * 0.22 + " " + (-r * 0.22) + " L " + r + " 0 L " + r * 0.22 + " " + r * 0.22 + " L 0 " + r + " L " + (-r * 0.22) + " " + r * 0.22 + " L " + (-r) + " 0 L " + (-r * 0.22) + " " + (-r * 0.22) + ' Z" fill="' + (color || "#ffffff") + '" stroke="' + INK + '" stroke-width="2"/>';
  }


  /* Cụm khói / hơi phụt dạng mảnh giấy xé: một đám mây 5 thuỳ. Gốc: tâm. r: bán kính, seed: hình thuỳ. */
  function puff(r, seed, fill) {
    var q = rng(seed || 3), lobes = [[0, 0, 1]], s = "";
    for (var i = 0; i < 4; i++) { var a = i * Math.PI / 2 + q() * 0.8; lobes.push([Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.42, 0.62 + q() * 0.25]); }
    lobes.forEach(function (L, k) { s += '<path d="' + rEll(L[0] + 3, L[1] + 4, r * L[2], r * L[2] * 0.86, 1.6, (seed || 3) * 7 + k) + '" fill="#5E7F8C" opacity="0.16"/>'; });
    lobes.forEach(function (L, k) { s += '<path d="' + rEll(L[0], L[1], r * L[2], r * L[2] * 0.86, 1.6, (seed || 3) * 7 + k) + '" fill="' + (fill || "#F6F9FA") + '"/>'; });
    s += line("M " + f1(-r * 0.5) + " " + f1(-r * 0.25) + " C " + f1(-r * 0.3) + " " + f1(-r * 0.6) + " " + f1(r * 0.2) + " " + f1(-r * 0.65) + " " + f1(r * 0.42) + " " + f1(-r * 0.4), 2.5, "#ffffff", ' opacity="0.9"');
    return "<g>" + s + "</g>";
  }

  /* Vị trí miệng ống khói của logHouse (cùng tham số o) so với gốc nhà – để đặt khói. Trả [dx, dy]. */
  function chimneyOf(o) {
    var w = o.w, h = o.h, rf = o.roof || w * 0.32;
    return [w * 0.18 + w * 0.055, -h - rf * 0.9];
  }

  /* Cột điện gỗ có xà ngang + dây võng sang cột kế (dx). Gốc: chân cột. */
  function pole(h, dx, seed) {
    var s = "<g>";
    s += paper(rRect(-9, -h, 18, h, 1.2, seed || 701), C.woodDark, { stroke: true, sw: 4, sx: 4, sy: 5 });
    s += paper(rRect(-52, -h + 26, 104, 12, 1.2, (seed || 701) + 1), C.woodDark, { stroke: true, sw: 4, sx: 3, sy: 4 });
    s += paper(rEll(0, -h, 13, 7, 1.2, (seed || 701) + 2), C.snow, { stroke: true, sw: 3, shadow: false });
    if (dx) [-44, 44].forEach(function (o) { s += line("M " + o + " " + (-h + 30) + " Q " + (dx / 2 + o) + " " + (-h + 80) + " " + (dx + o) + " " + (-h + 30), 2.5, INK, ' opacity="0.7"'); });
    return s + "</g>";
  }

  /* Đống củi phủ tuyết cạnh nhà. Gốc: giữa chân đống. */
  function woodpile(w, seed) {
    var r = rng(seed || 711), s = "<g>";
    for (var row = 0; row < 3; row++) for (var k = 0; k < Math.round(w / 34) - row; k++) {
      var x = -w / 2 + 17 + row * 17 + k * 34, y = -17 - row * 30;
      s += paper(rEll(x, y, 16, 15, 1.2, (seed || 711) + row * 20 + k), C.woodLight, { stroke: true, sw: 3.5, sx: 2, sy: 3 });
      s += '<circle cx="' + f1(x + r() * 3 - 1.5) + '" cy="' + f1(y + r() * 3 - 1.5) + '" r="6" fill="none" stroke="' + C.woodDark + '" stroke-width="2.5"/>';
    }
    s += paper(rough([[-w / 2 + 10, -92], [-w / 4, -112], [w / 4, -104], [w / 2 - 8, -88], [w / 2 - 20, -80], [-w / 2 + 20, -82]], 2.5, (seed || 711) + 99, 16), C.snow, { stroke: true, sw: 3.5, shadow: false });
    return s + "</g>";
  }

  G.DaoCu = {
    C: C, INK: INK, rng: rng, rough: rough, rRect: rRect, rEll: rEll, ptsRect: ptsRect, ptsEllipse: ptsEllipse,
    paper: paper, line: line, txt: txt, defs: defs,
    fish: fish, fishFloppy: fishFloppy, deskLamp: deskLamp, memoryBox: memoryBox, bookStack: bookStack,
    villageSketch: villageSketch, notesPage: notesPage, bubble: bubble, thermometer: thermometer, logHouse: logHouse,
    larch: larch, marketStall: marketStall, fishBarrel: fishBarrel, gloveHand: gloveHand, paperBag: paperBag,
    car: car, snowCar: snowCar, teaMug: teaMug, freezerFrame: freezerFrame, fence: fence, sparkle: sparkle,
    puff: puff, chimneyOf: chimneyOf, pole: pole, woodpile: woodpile, f1: f1
  };
})(typeof window !== "undefined" ? window : globalThis);
