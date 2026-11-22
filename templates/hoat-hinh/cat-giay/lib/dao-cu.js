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
      /* thêm 18/11/2026: chùm đèn pin, bóng gáy sổ, trời đêm xanh đen */
      '<linearGradient id="beamG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF6C8" stop-opacity="0.85"/><stop offset="1" stop-color="#FFE9A0" stop-opacity="0.18"/></linearGradient>' +
      '<linearGradient id="gayG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8A7A5C" stop-opacity="0"/><stop offset="0.5" stop-color="#8A7A5C" stop-opacity="0.6"/><stop offset="1" stop-color="#8A7A5C" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16233A"/><stop offset="0.6" stop-color="#2B3E5C"/><stop offset="1" stop-color="#4A5F7E"/></linearGradient>' +
      '<linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4E6A8E"/><stop offset="0.55" stop-color="#9AA9C2"/><stop offset="1" stop-color="#E9C9A8"/></linearGradient>' +
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

  /* ================= Đạo cụ thêm 18/11/2026 (tập 1 bản hoạt hình trọn tập, nhóm cat-giay A) ================= */

  /* Trang sổ du lịch: giấy kem, dòng kẻ mờ, lỗ gáy lò xo bên trái. Gốc: góc trên trái. o: { seed, ke (true), gay (true), mau } */
  function journalPage(w, h, o) {
    o = o || {};
    var sd = o.seed || 301, s = "<g>";
    s += paper(rRect(0, 0, w, h, 2.5, sd), o.mau || "#F6EDD6", { stroke: true, sw: 5, sx: 12, sy: 16, shOp: 0.25 });
    if (o.ke !== false) for (var y = 90; y < h - 40; y += 64) s += line("M 70 " + y + " L " + (w - 40) + " " + y, 2.5, "#9DB7C2", ' opacity="0.45"');
    if (o.ke !== false) s += line("M 120 20 L 120 " + (h - 20), 2.5, "#D9776A", ' opacity="0.4"');
    if (o.gay !== false) for (var gy = 60; gy < h - 30; gy += 90) {
      s += '<circle cx="34" cy="' + gy + '" r="13" fill="#C9B994" stroke="' + INK + '" stroke-width="3"/>';
      s += line("M 6 " + (gy - 8) + " C -14 " + (gy - 4) + " -14 " + (gy + 12) + " 28 " + (gy + 4), 6, "#6E7A7E");
    }
    s += '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="url(#half)" opacity="0.06"/>';
    return s + "</g>";
  }

  /* Tấm bản đồ dán trên trang sổ: ảnh bản đồ vẽ bằng code (href tới file .svg đã chép vào đoạn) trong khung giấy xé,
     hai mẩu băng dính giấy ở góc. Gốc: góc trên trái. o: { id, seed, bang (true), vien: màu viền } */
  function mapSticker(href, w, h, o) {
    o = o || {};
    var sd = o.seed || 311, id = o.id || ("ms" + sd), d = rRect(0, 0, w, h, 3, sd);
    var s = '<g' + (o.id ? ' id="' + o.id + '"' : "") + ">";
    s += '<path d="' + d + '" fill="#0b1214" opacity="0.24" transform="translate(9,12)"/>';
    s += '<clipPath id="' + id + '-cl"><path d="' + d + '"/></clipPath>';
    s += '<g clip-path="url(#' + id + '-cl)"><rect x="0" y="0" width="' + w + '" height="' + h + '" fill="#EFE3C8"/>' +
      '<image href="' + href + '" x="0" y="0" width="' + w + '" height="' + h + '" preserveAspectRatio="xMidYMid slice"/></g>';
    s += '<path d="' + d + '" fill="none" stroke="' + (o.vien || INK) + '" stroke-width="5" stroke-linejoin="round"/>';
    if (o.bang !== false) {
      s += '<g transform="translate(-10,-6) rotate(-32)">' + paper(rRect(-50, -16, 100, 32, 1.5, sd + 1), "#E9C98B", { shadow: false }) + "</g>";
      s += '<g transform="translate(' + (w + 8) + "," + (h + 4) + ') rotate(-30)">' + paper(rRect(-50, -16, 100, 32, 1.5, sd + 2), "#E9C98B", { shadow: false }) + "</g>";
    }
    return s + "</g>";
  }

  /* Chấm địa danh trên bản đồ + nhãn (chữ phải nằm trong chu_tren_do_vat). Gốc: tâm chấm.
     o: { r: 14, nhan, co: 44, ben: "phai" | "trai" | "tren" | "duoi", nen: true (nền giấy sau chữ), mau } . id+"-nhan" là nhóm nhãn. */
  function mapDot(id, o) {
    o = o || {};
    var r = o.r || 14, co = o.co || 44, s = '<g id="' + id + '">';
    s += '<circle cx="3" cy="4" r="' + r + '" fill="#0b1214" opacity="0.25"/><circle cx="0" cy="0" r="' + r + '" fill="' + (o.mau || C.accent2) + '" stroke="' + INK + '" stroke-width="5"/>';
    if (o.nhan) {
      var ben = o.ben || "phai", wTxt = o.nhan.length * co * 0.56 + 28;
      var tx = ben === "phai" ? r + 18 + wTxt / 2 : ben === "trai" ? -r - 18 - wTxt / 2 : 0;
      var ty = ben === "tren" ? -r - 22 - co * 0.5 : ben === "duoi" ? r + 26 + co * 0.5 : 0;
      s += '<g id="' + id + '-nhan">';
      if (o.nen !== false) s += paper(rRect(tx - wTxt / 2, ty - co * 0.72, wTxt, co * 1.3, 1.5, (o.seed || 321)), "#FFF8EC", { stroke: true, sw: 3.5, sx: 4, sy: 5 });
      s += txt(tx, ty + co * 0.34, o.nhan, co, { w: 800 });
      s += "</g>";
    }
    return s + "</g>";
  }

  /* Máy bay giấy gấp nhìn ngang, mũi sang phải, có chỗ ngồi để Wob ló đầu. Gốc: chỗ ngồi (đặt chân Wob ở đây).
     Trả { back, front }: vẽ back, rồi Wob, rồi front (front che nửa dưới Wob). Dài ~420. */
  function paperPlane() {
    var back = "<g>" + paper("M -230 -40 L 190 10 L -150 -150 Z", "#E8EEF0", { stroke: true, sw: 5, sx: 6, sy: 9 }) +
      line("M -150 -150 L 190 10", 3, INK, ' opacity="0.35"') + "</g>";
    var front = "<g>" + paper("M -240 -50 L 200 8 L -170 60 Z", "#FFFFFF", { stroke: true, sw: 5, sx: 6, sy: 9, half: 0.08 }) +
      paper("M -170 60 L 200 8 L -120 110 Z", "#D5E2E7", { stroke: true, sw: 5, shadow: false }) +
      line("M -240 -50 L 200 8", 3, INK, ' opacity="0.5"') + line("M -200 -20 L -60 -2", 3, C.accent2, ' opacity="0.7"') + "</g>";
    return { back: back, front: front };
  }

  /* Xe hộp các-tông nhỏ nhìn ngang, mũi sang phải, mui trần để Wob ló đầu. Gốc: chỗ ngồi.
     id+"-b0", id+"-b1": hai bánh (xoay quanh tâm bánh, origin đặt sẵn bằng api.origin của canh.js: "-120 92", "120 92"). Rộng ~380. */
  function boxCar(id) {
    var back = "<g>" + paper(rRect(-170, -60, 340, 40, 1.5, 331), C.kraftDark, { stroke: true, sw: 4, shadow: false }) + "</g>";
    var front = '<g id="' + id + '-than">';
    front += paper(rRect(-190, -40, 380, 130, 2, 332), C.kraft, { stroke: true, sw: 5, half: 0.15, fringe: "#E8C48E" });
    front += line("M -190 -8 L 190 -8", 3, C.kraftDark);
    front += line("M -60 -40 L -40 -8 M 60 -40 L 40 -8", 3, C.kraftDark, ' opacity="0.8"');
    front += '<rect x="168" y="10" width="26" height="22" rx="4" fill="#FFF3C4" stroke="' + INK + '" stroke-width="4"/>';
    front += '<rect x="-196" y="12" width="18" height="20" rx="4" fill="' + C.accent2 + '" stroke="' + INK + '" stroke-width="4"/>';
    [-120, 120].forEach(function (x, i) {
      front += '<g id="' + id + "-b" + i + '"><circle cx="' + x + '" cy="92" r="40" fill="#2a2f31" stroke="' + INK + '" stroke-width="5"/>' +
        '<circle cx="' + x + '" cy="92" r="15" fill="#9aa5a8" stroke="' + INK + '" stroke-width="4"/>' + line("M " + x + " 58 L " + x + " 74", 5, "#9aa5a8") + "</g>";
    });
    front += "</g>";
    return { back: back, front: front };
  }

  /* Xe hộp có cabin và cửa kính (nhìn ngang, mũi sang phải): thấy Wob qua kính. Gốc: chỗ ngồi; mặt đất ở y = 172.
     Trả { back, kinh, front }: vẽ back, rồi Wob (chân ở gốc, size ~0,62, y ~55), rồi kinh, rồi front.
     id+"-kinh": tấm kính (id+"-phan": vệt phản chiếu, trượt x để giả cảnh trôi; id+"-mo": hơi thở mờ kính, origin đặt sẵn ở canh.js),
     id+"-cua": cánh cửa có khung kính (mở: scaleX quanh bản lề "160 -130"), id+"-b0", id+"-b1": bánh (tâm (-170,126), (170,126)). */
  function boxCarKinh(id) {
    var back = "<g>" + paper(rRect(-176, -246, 330, 240, 1.5, 335), "#3A2E28", { shadow: false }) + "</g>";
    var kinh = '<g id="' + id + '-kinh"><clipPath id="' + id + '-kc"><rect x="-150" y="-222" width="290" height="192" rx="18"/></clipPath>' +
      '<rect x="-150" y="-222" width="290" height="192" rx="18" fill="#CFE6EE" opacity="0.26"/>' +
      '<g clip-path="url(#' + id + '-kc)"><g id="' + id + '-phan">' +
      line("M -60 -240 L -150 -10 M -20 -240 L -110 -10 M 200 -240 L 110 -10 M 400 -240 L 310 -10", 14, "#ffffff", ' opacity="0.35"') + "</g>" +
      '<g id="' + id + '-mo"><ellipse cx="0" cy="0" rx="70" ry="48" fill="#F4F8F9" opacity="0.8"/><ellipse cx="0" cy="0" rx="46" ry="30" fill="#ffffff" opacity="0.6"/></g></g></g>';
    var hole = "M -150 -204 Q -150 -222 -132 -222 L 122 -222 Q 140 -222 140 -204 L 140 -48 Q 140 -30 122 -30 L -132 -30 Q -150 -30 -150 -48 Z";
    var cab = "M -186 -10 L -186 -230 Q -186 -262 -150 -262 L 120 -262 Q 166 -262 166 -220 L 166 -10 Z " + hole;
    var front = "<g>";
    front += '<g id="' + id + '-cua"><path d="' + cab + '" fill="#0b1214" opacity="0.22" fill-rule="evenodd" transform="translate(6,8)"/>' +
      '<path d="' + cab + '" fill="' + C.kraft + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
      line("M -140 -246 L 110 -246", 3, C.kraftDark, ' opacity="0.8"') + '<rect x="96" y="-24" width="40" height="10" rx="4" fill="' + C.kraftDark + '" stroke="' + INK + '" stroke-width="3"/>' + "</g>";
    front += paper(rough([[-196, -268], [-20, -282], [176, -266], [168, -252], [-186, -254]], 2, 336, 16), C.snow, { stroke: true, sw: 3.5, shadow: false });
    front += paper(rRect(-290, -14, 580, 140, 2, 337), C.kraft, { stroke: true, sw: 5, half: 0.15, fringe: "#E8C48E" });
    front += line("M -290 30 L 290 30", 3, C.kraftDark);
    front += '<rect x="270" y="20" width="26" height="24" rx="4" fill="#FFF3C4" stroke="' + INK + '" stroke-width="4"/>';
    front += '<rect x="-298" y="22" width="18" height="22" rx="4" fill="' + C.accent2 + '" stroke="' + INK + '" stroke-width="4"/>';
    [-170, 170].forEach(function (x, i) {
      front += '<g id="' + id + "-b" + i + '"><circle cx="' + x + '" cy="126" r="46" fill="#2a2f31" stroke="' + INK + '" stroke-width="5"/>' +
        '<circle cx="' + x + '" cy="126" r="17" fill="#9aa5a8" stroke="' + INK + '" stroke-width="4"/>' + line("M " + x + " 86 L " + x + " 104", 5, "#9aa5a8") + "</g>";
    });
    front += paper(rough([[-300, -16], [-100, -30], [120, -26], [300, -16], [292, -6], [-292, -6]], 2, 338, 18), C.snow, { shadow: false });
    front += "</g>";
    return { back: back, kinh: kinh, front: front };
  }

  /* Bút chì dài. Gốc: đầu ngòi; thân kéo về hướng (dx, dy) chuẩn hoá theo len (mặc định lên phải). */
  function pencil(len, o) {
    o = o || {};
    var L = len || 420, s = '<g transform="rotate(' + (o.goc == null ? -50 : o.goc) + ')">';
    s += '<path d="M 0 0 L 46 -14 L 46 14 Z" fill="#F0D2A8" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    s += '<path d="M 0 0 L 14 -4.5 L 14 4.5 Z" fill="' + INK + '"/>';
    s += paper(rRect(46, -16, L - 90, 32, 1, 341), "#E8B04A", { stroke: true, sw: 4, sx: 4, sy: 6 });
    s += line("M 50 -5 L " + (L - 48) + " -5", 3, "#C98A2A");
    s += paper(rRect(L - 46, -17, 18, 34, 1, 342), "#B9BDBE", { stroke: true, sw: 4, shadow: false });
    s += paper(rRect(L - 30, -16, 30, 32, 1, 343), "#E58C8C", { stroke: true, sw: 4, shadow: false });
    return s + "</g>";
  }

  /* Đồng hồ giấy cắt treo cột: mặt xanh đêm, lát nắng vàng mỏng (id+"-lat", xoay/trượt quanh tâm), nhãn o.nhan dưới mặt.
     Gốc: tâm mặt. r mặc định 120. */
  function clockSun(id, o) {
    o = o || {};
    var r = o.r || 120, s = '<g id="' + id + '">';
    s += paper(rEll(0, 0, r + 16, r + 16, 2, 351), "#E9DDC2", { stroke: true, sw: 6 });
    s += '<circle cx="0" cy="0" r="' + r + '" fill="#1D2B44" stroke="' + INK + '" stroke-width="5"/>';
    var a = (o.goc || 34) * Math.PI / 180;   // lát ~ 4,5/24 vòng ≈ 68°
    var x1 = r * Math.sin(-a), y1 = -r * Math.cos(-a), x2 = r * Math.sin(a), y2 = -r * Math.cos(a);
    s += '<g id="' + id + '-lat"><path d="M 0 0 L ' + f1(x1) + " " + f1(y1) + " A " + r + " " + r + " 0 0 1 " + f1(x2) + " " + f1(y2) + ' Z" fill="#FFD25E" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<circle cx="0" cy="' + f1(-r * 0.62) + '" r="' + f1(r * 0.12) + '" fill="#FFF4D6" stroke="' + INK + '" stroke-width="3"/></g>';
    for (var k = 0; k < 12; k++) { var t = k * Math.PI / 6; s += line("M " + f1(Math.sin(t) * r * 0.86) + " " + f1(-Math.cos(t) * r * 0.86) + " L " + f1(Math.sin(t) * r * 0.97) + " " + f1(-Math.cos(t) * r * 0.97), 4, "#F6EEDC", ' opacity="0.8"'); }
    s += '<circle cx="0" cy="0" r="10" fill="#F6EEDC" stroke="' + INK + '" stroke-width="3"/>';
    if (o.nhan) {
      var w = o.nhan.length * (o.co || 48) * 0.55 + 40;
      s += '<g id="' + id + '-nhan">' + paper(rRect(-w / 2, r + 26, w, (o.co || 48) * 1.35, 1.5, 352), "#FFF8EC", { stroke: true, sw: 4 }) + txt(0, r + 26 + (o.co || 48) * 1.0, o.nhan, o.co || 48, { w: 900 }) + "</g>";
    }
    return s + "</g>";
  }

  /* Đèn pin. Gốc: chỗ nắm (đặt trong bàn tay Wob), đầu đèn hướng +x. id+"-den" mặt kính (bật sáng bằng opacity). */
  function flashlight(id) {
    var s = '<g id="' + id + '">';
    s += paper(rRect(-26, -13, 74, 26, 1, 361), "#3E4A4C", { stroke: true, sw: 4, sx: 3, sy: 4 });
    s += paper("M 46 -15 L 78 -24 L 78 24 L 46 15 Z", "#5E6E70", { stroke: true, sw: 4, shadow: false });
    s += '<ellipse cx="78" cy="0" rx="7" ry="24" fill="#CFE6EE" stroke="' + INK + '" stroke-width="4"/>';
    s += '<ellipse id="' + id + '-den" cx="78" cy="0" rx="6" ry="21" fill="#FFF6C8"/>';
    return s + "</g>";
  }
  /* Chùm sáng đèn pin hình nón từ gốc theo +x. len: chiều dài, rong: nửa bề rộng đầu xa. */
  function beam(len, rong) {
    return '<path d="M 0 -14 L ' + len + " " + (-rong) + " C " + (len + rong * 0.45) + " " + (-rong * 0.5) + " " + (len + rong * 0.45) + " " + (rong * 0.5) + " " + len + " " + rong + ' L 0 14 Z" fill="url(#beamG)"/>';
  }

  /* Máy ảnh nhỏ (không chữ). Gốc: tâm. o.day: vẽ dây đeo cổ đi lên hai bên (độ dài). */
  function cameraSmall(o) {
    o = o || {};
    var s = "<g>";
    if (o.day) s += line("M -40 -20 C -60 " + (-o.day * 0.6) + " -30 " + (-o.day) + " 0 " + (-o.day) + " M 40 -20 C 60 " + (-o.day * 0.6) + " 30 " + (-o.day) + " 0 " + (-o.day), 5, "#2E3A3C");
    s += paper(rRect(-54, -32, 108, 66, 1.5, 371), "#3E4A4C", { stroke: true, sw: 4, sx: 3, sy: 4 });
    s += paper(rRect(-40, -44, 30, 14, 1, 372), "#3E4A4C", { stroke: true, sw: 3, shadow: false });
    s += '<circle cx="6" cy="2" r="22" fill="#9AB3BC" stroke="' + INK + '" stroke-width="5"/><circle cx="6" cy="2" r="10" fill="#2a2f31"/><circle cx="12" cy="-4" r="4" fill="#fff"/>';
    s += '<rect x="30" y="-26" width="16" height="10" rx="2" fill="#FFF3C4" stroke="' + INK + '" stroke-width="2.5"/>';
    return s + "</g>";
  }

  /* Đống tuyết (che chân khi Wob ngồi, ngồi xổm). Gốc: giữa chân đống. */
  function snowPile(w, h, seed) {
    var sd = seed || 381;
    return "<g>" + paper(rough([[-w / 2, 0], [-w * 0.42, -h * 0.6], [-w * 0.2, -h * 0.95], [w * 0.1, -h], [w * 0.36, -h * 0.75], [w / 2, 0]], 3, sd, 18), C.snow, { stroke: true, sw: 5, fringe: C.ice, sy: 6 }) +
      line("M " + f1(-w * 0.25) + " " + f1(-h * 0.6) + " C " + f1(-w * 0.1) + " " + f1(-h * 0.75) + " " + f1(w * 0.1) + " " + f1(-h * 0.76) + " " + f1(w * 0.25) + " " + f1(-h * 0.6), 3, C.iceDeep, ' opacity="0.6"') + "</g>";
  }

  /* Biển nhỏ trên cột (biển tên làng, biển chỉ đường). Gốc: chân cột. o: { w: 220, h: 110, cao: 160 (cột), chu, co, hinh (SVG icon, gốc tâm, vẽ trái chữ), mau } */
  function signBoard(id, o) {
    o = o || {};
    var w = o.w || 220, h = o.h || 110, cao = o.cao == null ? 160 : o.cao, s = '<g id="' + id + '">';
    s += paper(rRect(-9, -cao - 6, 18, cao + 6, 1.2, 391), C.woodDark, { stroke: true, sw: 4, sx: 4, sy: 5 });
    s += '<g id="' + id + '-bang">';
    s += paper(rRect(-w / 2, -cao - h, w, h, 1.8, 392), o.mau || "#F6EEDC", { stroke: true, sw: 5, half: 0.1 });
    var tx = 0;
    if (o.hinh) { s += '<g transform="translate(' + (-w / 2 + h * 0.5) + "," + (-cao - h / 2) + ')">' + o.hinh + "</g>"; tx = h * 0.45; }
    if (o.chu) s += txt(tx, -cao - h / 2 + (o.co || 44) * 0.35, o.chu, o.co || 44, { w: 900 });
    s += paper(rough([[-w / 2 - 6, -cao - h + 2], [0, -cao - h - 14], [w / 2 + 6, -cao - h + 2], [w / 2, -cao - h + 10], [-w / 2, -cao - h + 10]], 2, 393, 16), C.snow, { shadow: false });
    s += "</g>";
    return s + "</g>";
  }

  /* Sổ phác thảo mở hai trang (Wob cầm trước ngực). Gốc: giữa gáy, mép dưới. w: tổng rộng, h: cao. */
  function notebookOpen(w, h, seed) {
    var sd = seed || 401, s = "<g>";
    s += paper(rRect(-w / 2 - 14, -h - 10, w + 28, h + 20, 1.5, sd), "#3F6A70", { stroke: true, sw: 5, sx: 8, sy: 10 });
    s += paper(rRect(-w / 2, -h, w / 2, h, 1.5, sd + 1), "#F8F0DC", { stroke: true, sw: 4, shadow: false });
    s += paper(rRect(0, -h, w / 2, h, 1.5, sd + 2), "#F8F0DC", { stroke: true, sw: 4, shadow: false });
    for (var y = -h + 70; y < -20; y += 56) s += line("M " + (-w / 2 + 24) + " " + y + " L -24 " + y + " M 24 " + y + " L " + (w / 2 - 24) + " " + y, 2, "#9DB7C2", ' opacity="0.4"');
    s += '<path d="M -26 ' + (-h) + ' L 26 ' + (-h) + ' L 26 0 L -26 0 Z" fill="url(#gayG)" opacity="0.5"/>';
    s += line("M 0 " + (-h) + " L 0 0", 4);
    return s + "</g>";
  }

  /* Bản đồ giấy gấp (không chữ): đường đi, sông, cây, mặt trời, mũi tên hướng. o.nguoc: vẽ lộn ngược (cây chúc ngọn xuống).
     Gốc: tâm. w, h. */
  function paperMap(w, h, o) {
    o = o || {};
    var s = '<g' + (o.nguoc ? ' transform="rotate(180)"' : "") + ">";
    s += paper(rRect(-w / 2, -h / 2, w, h, 1.8, 411), "#F4EBD2", { stroke: true, sw: 4, sx: 5, sy: 6 });
    s += line("M " + (-w / 6) + " " + (-h / 2) + " L " + (-w / 6) + " " + (h / 2) + " M " + (w / 6) + " " + (-h / 2) + " L " + (w / 6) + " " + (h / 2), 2.5, "#B9A67E");
    s += line("M " + (-w / 2 + 10) + " " + (h * 0.2) + " C " + (-w * 0.2) + " " + (h * 0.05) + " " + (w * 0.1) + " " + (h * 0.32) + " " + (w / 2 - 10) + " " + (h * 0.12), 7, "#6FA8C0");
    s += line("M " + (-w / 2 + 14) + " " + (-h * 0.25) + " C " + (-w * 0.1) + " " + (-h * 0.1) + " " + (w * 0.05) + " " + (-h * 0.3) + " " + (w * 0.3) + " " + (-h * 0.05), 4, C.accent2, ' stroke-dasharray="10 9"');
    [[-w * 0.32, h * 0.0], [-w * 0.24, -h * 0.02], [w * 0.28, h * 0.36]].forEach(function (p) {
      s += '<path d="M ' + f1(p[0]) + " " + f1(p[1] - 26) + " L " + f1(p[0] + 13) + " " + f1(p[1]) + " L " + f1(p[0] - 13) + " " + f1(p[1]) + ' Z" fill="#5C8C5A" stroke="' + INK + '" stroke-width="3"/>' + line("M " + f1(p[0]) + " " + f1(p[1]) + " L " + f1(p[0]) + " " + f1(p[1] + 9), 3);
    });
    s += '<circle cx="' + f1(w * 0.3) + '" cy="' + f1(-h * 0.28) + '" r="14" fill="#FFD25E" stroke="' + INK + '" stroke-width="3"/>';
    s += '<path d="M ' + f1(w * 0.36) + " " + f1(h * 0.0) + " l 0 -34 l -10 12 m 10 -12 l 10 12" + '" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>';
    return s + "</g>";
  }

  /* Dòng suối nhỏ không đóng băng giữa hai bờ băng (nhìn ngang hơi chếch). Gốc: giữa mặt nước. w: dài.
     id+"-song0..2": gợn sóng (trượt x để nước chảy). */
  function warmSpring(id, w, seed) {
    var sd = seed || 421, s = '<g id="' + id + '">';
    s += paper(rough([[-w / 2 - 60, 10], [-w / 2, -18], [w / 2, -22], [w / 2 + 60, 8], [w / 2 + 40, 40], [-w / 2 - 40, 44]], 2.5, sd, 22), "#5E9DB5", { stroke: true, sw: 4, shadow: false });
    s += '<clipPath id="' + id + '-cl"><path d="' + rough([[-w / 2 - 60, 10], [-w / 2, -18], [w / 2, -22], [w / 2 + 60, 8], [w / 2 + 40, 40], [-w / 2 - 40, 44]], 2.5, sd, 22) + '"/></clipPath>';
    s += '<g clip-path="url(#' + id + '-cl)">';
    for (var k = 0; k < 3; k++) {
      var y = -6 + k * 14, g = "";
      for (var x = -w / 2 - 300; x < w / 2 + 300; x += 90) g += line("M " + x + " " + y + " C " + (x + 20) + " " + (y - 6) + " " + (x + 40) + " " + (y - 6) + " " + (x + 60) + " " + y, 3.5, "#CFEAF4", ' opacity="0.85"');
      s += '<g id="' + id + "-song" + k + '">' + g + "</g>";
    }
    s += "</g>";
    s += paper(rough([[-w / 2 - 120, -14], [-w / 2 - 20, -40], [w / 2 + 10, -44], [w / 2 + 130, -18], [w / 2 + 40, -16], [-w / 2 + 10, -12]], 3, sd + 1, 18), C.ice, { stroke: true, sw: 4, fringe: "#ffffff", sy: 4 });
    s += paper(rough([[-w / 2 - 140, 38], [-w / 2 - 20, 30], [w / 2 + 20, 34], [w / 2 + 150, 42], [w / 2 + 120, 74], [-w / 2 - 110, 76]], 3, sd + 2, 18), C.snow, { stroke: true, sw: 4, fringe: C.ice, sy: 5 });
    return s + "</g>";
  }

  /* Tuần lộc giấy cắt nhìn ngang, mặt sang phải. Gốc: giữa chân. id+"-dau": cổ + đầu (xoay quanh vai, origin "60 -150");
     id+"-c0..3": bốn chân (xoay quanh hông). o: { mau, sung: true, seed } */
  function reindeer(id, o) {
    o = o || {};
    var m = o.mau || "#8A6A4E", dk = "#5C4433", s = '<g id="' + id + '">';
    [[-70, -118], [-46, -118], [52, -118], [76, -118]].forEach(function (p, i) {
      s += '<g id="' + id + "-c" + i + '" transform="translate(' + p[0] + "," + p[1] + ')"><g id="' + id + "-cc" + i + '">' + line("M 0 0 L " + (i % 2 ? 4 : -4) + " 116", 12, INK) + line("M 0 0 L " + (i % 2 ? 4 : -4) + " 116", 6, i < 2 ? dk : m) + "</g></g>";
    });
    s += paper(rEll(0, -150, 110, 48, 2, (o.seed || 431)), m, { stroke: true, sw: 5, half: 0.15 });
    s += paper(rEll(-6, -128, 80, 18, 1.5, (o.seed || 431) + 1), "#E8DCC6", { shadow: false });
    s += paper("M -108 -168 L -128 -186 L -112 -150 Z", m, { stroke: true, sw: 4, shadow: false });
    s += '<g id="' + id + '-dau">';
    s += paper("M 70 -180 C 90 -220 110 -246 128 -250 L 150 -236 C 136 -220 118 -190 108 -150 Z", m, { stroke: true, sw: 5, shadow: false });
    s += paper(rEll(146, -246, 36, 20, 1.5, (o.seed || 431) + 2), m, { stroke: true, sw: 5, shadow: false });
    s += '<circle cx="178" cy="-242" r="7" fill="' + INK + '"/><circle cx="148" cy="-252" r="5" fill="' + INK + '"/>';
    s += paper("M 122 -262 L 108 -280 L 132 -266 Z", m, { stroke: true, sw: 3.5, shadow: false });
    if (o.sung !== false) s += line("M 136 -262 C 120 -300 136 -330 112 -350 M 128 -296 L 104 -306 M 132 -318 L 150 -336 M 150 -262 C 166 -296 186 -310 178 -338 M 170 -300 L 194 -306", 6, "#D9C6A2") +
      line("M 136 -262 C 120 -300 136 -330 112 -350 M 128 -296 L 104 -306 M 132 -318 L 150 -336 M 150 -262 C 166 -296 186 -310 178 -338 M 170 -300 L 194 -306", 2.5, INK, ' opacity="0.6"');
    s += "</g>";
    return s + "</g>";
  }

  /* Người chăn tuần lộc dạng bóng giấy chung: áo choàng dài có mũ trùm, gậy; KHÔNG mặt, không trang phục dân tộc cụ thể.
     Gốc: chân. id+"-gay": gậy (xoay quanh tay). o.mau */
  function herder(id, o) {
    o = o || {};
    var m = o.mau || "#4E4038", s = '<g id="' + id + '">';
    s += '<g id="' + id + '-gay">' + line("M 46 -150 L 74 6", 7, INK) + line("M 46 -150 L 74 6", 3, "#9C7A55") + "</g>";
    s += paper("M -44 0 C -48 -60 -42 -130 -30 -170 C -20 -200 20 -200 30 -170 C 42 -130 50 -60 46 0 Z", m, { stroke: true, sw: 5, half: 0.18 });
    s += paper(rEll(0, -206, 34, 38, 1.5, 441), m, { stroke: true, sw: 5, shadow: false });
    s += paper(rEll(2, -202, 20, 24, 1.5, 442), "#2E2622", { shadow: false });
    s += line("M 28 -150 C 40 -146 46 -146 48 -150", 12, m) + line("M 28 -150 C 40 -146 46 -146 48 -150", 2, INK, ' opacity="0.5"');
    return s + "</g>";
  }

  /* Người chăn tuần lộc có mặt, dạng chung và tôn trọng (thêm 19/11/2026): áo khoác mùa đông có mũ trùm viền lông, găng,
     ủng; mặt tròn đơn giản (hai chấm mắt, miệng cười nhẹ), không vẽ trang phục dân tộc cụ thể. Gốc: giữa chân.
     id+"-tay": tay phải (xoay quanh vai, origin "22 -150"), id+"-tayT": tay trái (origin "-22 -150"), id+"-dau": đầu (gật).
     o: { mau (áo), da (màu da), vien (viền lông) } */
  function herderMat(id, o) {
    o = o || {};
    var m = o.mau || "#6B5444", da = o.da || "#D8A47A", vien = o.vien || "#E9DCC4", s = '<g id="' + id + '">';
    s += paper(rRect(-26, -40, 20, 40, 1, 701), "#3E3028", { stroke: true, sw: 3.5, shadow: false }) + paper(rRect(6, -40, 20, 40, 1, 702), "#3E3028", { stroke: true, sw: 3.5, shadow: false });
    s += '<g id="' + id + '-tayT"><g transform="translate(-22,-150)">' + line("M 0 0 C -18 30 -22 60 -16 86", 16, INK) + line("M 0 0 C -18 30 -22 60 -16 86", 10, m) + '<circle cx="-16" cy="90" r="10" fill="#3E3028" stroke="' + INK + '" stroke-width="3"/></g></g>';
    s += paper("M -40 -36 C -44 -90 -40 -140 -26 -166 L 26 -166 C 40 -140 44 -90 40 -36 Z", m, { stroke: true, sw: 5, half: 0.15 });
    s += line("M 0 -160 L 0 -40", 3, "#3E3028", ' opacity="0.6"') + paper(rRect(-40, -78, 80, 10, 1, 703), "#8E2C24", { shadow: false });
    s += paper("M -42 -38 C -20 -30 20 -30 42 -38 L 40 -30 C 20 -22 -20 -22 -40 -30 Z", vien, { shadow: false });
    s += '<g id="' + id + '-dau"><g transform="translate(0,-196)">';
    s += paper(rEll(0, 0, 40, 42, 1.5, 704), m, { stroke: true, sw: 5, shadow: false });
    s += paper(rEll(0, 4, 31, 32, 2.5, 705), vien, { shadow: false });
    s += '<ellipse cx="0" cy="6" rx="22" ry="24" fill="' + da + '" stroke="' + INK + '" stroke-width="3.5"/>';
    s += '<circle cx="-8" cy="2" r="3.2" fill="' + INK + '"/><circle cx="8" cy="2" r="3.2" fill="' + INK + '"/>' + line("M -7 16 C -3 20 3 20 7 16", 3) +
      '<ellipse cx="-13" cy="12" rx="4" ry="2.5" fill="#E9806E" opacity="0.5"/><ellipse cx="13" cy="12" rx="4" ry="2.5" fill="#E9806E" opacity="0.5"/>';
    s += "</g></g>";
    s += '<g id="' + id + '-tay"><g transform="translate(22,-150)">' + line("M 0 0 C 18 30 22 60 16 86", 16, INK) + line("M 0 0 C 18 30 22 60 16 86", 10, m) + '<circle cx="16" cy="90" r="10" fill="#3E3028" stroke="' + INK + '" stroke-width="3"/></g></g>';
    return s + "</g>";
  }

  /* Xe trượt gỗ chở hàng (kéo bằng dây). Gốc: giữa đáy càng trước; thân kéo về phía trái (âm x). Dài ~220. */
  function sled(id) {
    var s = '<g id="' + id + '">';
    s += line("M -230 0 L -10 0 C 10 0 18 -8 20 -22", 7, INK) + line("M -230 0 L -10 0 C 10 0 18 -8 20 -22", 3, C.woodLight);
    for (var x = -210; x <= -40; x += 56) s += line("M " + x + " 0 L " + x + " -26", 6, C.woodDark);
    s += paper(rRect(-226, -34, 210, 10, 1, 721), C.woodLight, { stroke: true, sw: 3.5, shadow: false });
    s += paper(rEll(-160, -60, 48, 28, 2, 722), "#B8A07E", { stroke: true, sw: 4 }) + paper(rEll(-90, -58, 40, 24, 2, 723), "#9C8462", { stroke: true, sw: 4 });
    s += line("M -150 -86 L -150 -34 M -96 -80 L -96 -34", 3, "#5C4433");
    return s + "</g>";
  }

  /* Lều hình nón (bạt, cọc chéo ló đỉnh). Gốc: giữa chân. w, h. */
  function tentCone(w, h, seed) {
    var sd = seed || 451, s = "<g>";
    s += line("M " + f1(-w * 0.08) + " " + f1(-h * 1.12) + " L " + f1(w * 0.06) + " " + f1(-h * 0.9) + " M " + f1(w * 0.08) + " " + f1(-h * 1.12) + " L " + f1(-w * 0.06) + " " + f1(-h * 0.9), 6, C.woodDark);
    s += paper(rough([[-w / 2, 0], [0, -h], [w / 2, 0]], 2.5, sd, 18), "#CDB892", { stroke: true, sw: 5, half: 0.18 });
    s += paper("M -" + f1(w * 0.12) + " 0 L 0 " + f1(-h * 0.42) + " L " + f1(w * 0.12) + " 0 Z", "#3A2E26", { shadow: false });
    s += line("M " + f1(-w * 0.3) + " " + f1(-h * 0.38) + " L " + f1(w * 0.3) + " " + f1(-h * 0.38), 3, "#8E7650", ' opacity="0.7"');
    return s + "</g>";
  }

  /* Chai nước nhỏ (nắp đỏ). Gốc: đáy giữa. id+"-bang": lõi đá trắng đục; id+"-nuoc": nước trong có mặt sóng (id+"-mat" xoay để óc ách). */
  function waterBottle(id) {
    var s = '<g id="' + id + '">';
    var body = "M -26 0 L -26 -86 C -26 -100 -14 -108 -10 -116 L -10 -128 L 10 -128 L 10 -116 C 14 -108 26 -100 26 -86 L 26 0 Z";
    s += '<clipPath id="' + id + '-cl"><path d="' + body + '"/></clipPath>';
    s += '<path d="' + body + '" fill="#E4F2F7" stroke="none"/>';
    s += '<g clip-path="url(#' + id + '-cl)"><g id="' + id + '-nuoc"><g transform="translate(0,-62)"><g id="' + id + '-mat"><path d="M -60 0 C -40 -8 -20 8 0 0 C 20 -8 40 8 60 0 L 60 90 L -60 90 Z" fill="#5EA7C8" opacity="0.85"/></g></g></g>' +
      '<g id="' + id + '-bang"><path d="M -30 -100 L 30 -100 L 30 4 L -30 4 Z" fill="#F4FAFC"/>' + line("M -14 -80 L -2 -60 L -12 -40 M 10 -90 L 4 -70", 3, C.iceDeep) + "</g></g>";
    s += '<path d="' + body + '" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    s += line("M -16 -90 L -16 -14", 5, "#ffffff", ' opacity="0.7"');
    s += paper(rRect(-13, -146, 26, 20, 1, 461), C.accent2, { stroke: true, sw: 4, shadow: false });
    return s + "</g>";
  }

  /* Vương miện băng nhỏ (5 mũi tinh thể). Gốc: giữa vành dưới. o.nua: "trai" | "phai" chỉ vẽ một nửa (mép cắt răng cưa). */
  function iceCrown(o) {
    o = o || {};
    var pts = [[-60, 0], [-60, -24], [-48, -62], [-34, -22], [-14, -84], [0, -26], [14, -84], [34, -22], [48, -62], [60, -24], [60, 0]];
    if (o.nua === "trai") pts = [[-60, 0], [-60, -24], [-48, -62], [-34, -22], [-14, -84], [-4, -40], [4, -26], [-6, -12], [2, 0]];
    if (o.nua === "phai") pts = [[2, 0], [-6, -12], [4, -26], [-4, -40], [14, -84], [34, -22], [48, -62], [60, -24], [60, 0]];
    var d = "M " + pts.map(function (p) { return p[0] + " " + p[1]; }).join(" L ") + " Z";
    return "<g>" + paper(d, "#DFF3FF", { stroke: true, sw: 4.5, sx: 4, sy: 5, fringe: "#ffffff" }) +
      line("M -44 -14 L -26 -14 M 24 -14 L 44 -14", 3, C.iceDeep, ' opacity="0.8"') + '<circle cx="' + (o.nua === "phai" ? 30 : -30) + '" cy="-8" r="5" fill="#86B9CF"/></g>';
  }

  /* Đài tưởng niệm tối giản (khối giấy cắt + nhiệt kế cách điệu; không chép thiết kế thật). Gốc: chân giữa.
     o.chu: chữ trên bệ (chữ trong chu_tren_do_vat), o.co. id+"-nk": cột thuỷ ngân. */
  function monumentCold(id, o) {
    o = o || {};
    var s = '<g id="' + id + '">';
    s += paper(rRect(-260, -110, 520, 110, 2, 471), "#C9D3D6", { stroke: true, sw: 6, half: 0.15 });
    s += paper(rRect(-210, -150, 420, 46, 2, 472), "#DDE4E6", { stroke: true, sw: 5 });
    s += paper("M -90 -150 L -70 -560 L 70 -560 L 90 -150 Z", "#E9EEF0", { stroke: true, sw: 6, half: 0.12, fringe: "#ffffff" });
    s += '<rect x="-22" y="-520" width="44" height="300" rx="22" fill="#FFFDF6" stroke="' + INK + '" stroke-width="6"/>';
    s += '<g transform="translate(0,-236)"><rect id="' + id + '-nk" x="-11" y="-210" width="22" height="210" rx="11" fill="#5E9DB5"/></g>';
    s += '<circle cx="0" cy="-214" r="32" fill="#5E9DB5" stroke="' + INK + '" stroke-width="6"/>';
    for (var y = -500; y < -250; y += 32) s += line("M 30 " + y + " L 48 " + y, 4);
    s += paper(rough([[-80, -560], [0, -588], [80, -560], [74, -548], [-74, -548]], 2, 473, 14), C.snow, { shadow: false });
    s += paper(rough([[-270, -110], [-120, -124], [120, -120], [270, -110], [262, -100], [-262, -100]], 2, 474, 18), C.snow, { shadow: false });
    if (o.chu) s += txt(0, -42, o.chu, o.co || 56, { w: 900 });
    return s + "</g>";
  }

  /* Trạm khí tượng nhỏ (lều chớp trắng trên chân + cột đo gió), tông giấy cũ khi o.cu. Gốc: chân giữa. */
  function weatherStation(o) {
    o = o || {};
    var wood = o.cu ? "#E2D3B0" : "#F4F1E8", ink2 = o.cu ? "#7A6A50" : INK, s = "<g>";
    s += line("M -40 0 L -36 -120 M 40 0 L 36 -120", 8, ink2);
    s += paper(rRect(-64, -230, 128, 112, 1.5, 481), wood, { stroke: true, sw: 5 });
    for (var y = -214; y < -126; y += 16) s += line("M -54 " + y + " L 54 " + (y + 6), 3, ink2, ' opacity="0.7"');
    s += paper("M -76 -230 L 0 -270 L 76 -230 Z", wood, { stroke: true, sw: 5, shadow: false });
    s += line("M 120 0 L 120 -330", 6, ink2);
    s += line("M 90 -330 L 150 -330", 4, ink2);
    [90, 150].forEach(function (x) { s += '<path d="M ' + x + ' -330 a 12 12 0 0 1 0 24" fill="none" stroke="' + ink2 + '" stroke-width="4"/>'; });
    return s + "</g>";
  }

  /* Đường băng sân bay nhỏ nhìn từ trên (vạch giữa nét đứt). Gốc: đầu trái, giữa. len, rong. o.cu: tông giấy cũ. */
  function airstrip(len, rong, o) {
    o = o || {};
    var s = "<g>" + paper(rRect(0, -rong / 2, len, rong, 1.5, 491), o.cu ? "#B8AC94" : "#8E9496", { stroke: true, sw: 4 });
    s += line("M 20 0 L " + (len - 20) + " 0", 4, o.cu ? "#F4EBD2" : "#FFFFFF", ' stroke-dasharray="22 16"');
    for (var k = 0; k < 4; k++) s += line("M 10 " + (-rong / 2 + 6 + k * (rong - 12) / 3) + " L 26 " + (-rong / 2 + 6 + k * (rong - 12) / 3), 3, o.cu ? "#F4EBD2" : "#FFFFFF");
    return s + "</g>";
  }

  /* Giọt nước mắt (rưng rưng). Gốc: đỉnh giọt. */
  function tear(r) {
    r = r || 9;
    return '<path d="M 0 0 C ' + r * 0.4 + " " + r * 0.9 + " " + r + " " + r * 1.4 + " " + r + " " + r * 1.9 + " C " + r + " " + r * 2.6 + " " + -r + " " + r * 2.6 + " " + -r + " " + r * 1.9 + " C " + -r + " " + r * 1.4 + " " + -r * 0.4 + " " + r * 0.9 + ' 0 0 Z" fill="#9FD3EA" stroke="' + INK + '" stroke-width="2.5"/>';
  }

  /* Bông tuyết rơi (mảnh giấy tròn nhỏ). Gốc: tâm. */
  function flake(r, seed) { return '<path d="' + rEll(0, 0, r, r * 0.9, 1, seed || 501) + '" fill="#FFFFFF" stroke="#9FBFCC" stroke-width="1.5"/>'; }

  G.DaoCu = {
    journalPage: journalPage, mapSticker: mapSticker, mapDot: mapDot, paperPlane: paperPlane, boxCar: boxCar, boxCarKinh: boxCarKinh, pencil: pencil,
    clockSun: clockSun, flashlight: flashlight, beam: beam, cameraSmall: cameraSmall, snowPile: snowPile, signBoard: signBoard,
    notebookOpen: notebookOpen, paperMap: paperMap, warmSpring: warmSpring, reindeer: reindeer, herder: herder, tentCone: tentCone,
    waterBottle: waterBottle, iceCrown: iceCrown, monumentCold: monumentCold, weatherStation: weatherStation, airstrip: airstrip,
    tear: tear, flake: flake, herderMat: herderMat, sled: sled,
    C: C, INK: INK, rng: rng, rough: rough, rRect: rRect, rEll: rEll, ptsRect: ptsRect, ptsEllipse: ptsEllipse,
    paper: paper, line: line, txt: txt, defs: defs,
    fish: fish, fishFloppy: fishFloppy, deskLamp: deskLamp, memoryBox: memoryBox, bookStack: bookStack,
    villageSketch: villageSketch, notesPage: notesPage, bubble: bubble, thermometer: thermometer, logHouse: logHouse,
    larch: larch, marketStall: marketStall, fishBarrel: fishBarrel, gloveHand: gloveHand, paperBag: paperBag,
    car: car, snowCar: snowCar, teaMug: teaMug, freezerFrame: freezerFrame, fence: fence, sparkle: sparkle,
    puff: puff, chimneyOf: chimneyOf, pole: pole, woodpile: woodpile, f1: f1
  };
})(typeof window !== "undefined" ? window : globalThis);
