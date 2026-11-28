/* Đoạn d47 · cắt giấy · chớp hồi ức: chiều hôm trước ngày tàu đi, Wob viết bưu thiếp ngay ở quầy bưu điện (cùng bộ quầy d31), xoay viết dọc lề, nhắm mắt thả vào túi thư. Vào "giay", ra "cat". */
/* ---- Bộ dựng riêng tập 5 Tristan da Cunha · cắt giấy nhóm B (d28 d30 d31 d32 d35 d36 d38 d42 d44 d46 d47).
   Chép nguyên vào đầu canh.js của các đoạn này (không sửa lib chung vì nhóm A chạy song song).
   Khoá trang phục: áo mưa vải dầu cam #E07A2E (viền mũ trùm #B85A1E, hai cúc gỗ #8A5A33, dài tới gối), mũ trùm lên/hạ,
   ba lô nhỏ ô liu #7C8646 viền #566030 cuộn thảm đỏ #C9463A, giày đỏ của tạo hình gốc. Ở nhà (o.nha): không áo, không ba lô.
   Bộ quầy bưu điện (buuDien, buuThiep, temMuc, tuiThu) dùng chung d31 và d47; mô tả ở doan-d31/bo-quay.md.
   Tất định: mọi ngẫu nhiên qua DaoCu.rng(seed). Không chạm document ngoài api.moiKhung. Người dân: dạng giấy chung, KHÔNG mặt. ---- */
var TB = (function () {
  "use strict";
  var D = window.DaoCu, INK = D.INK, paper = D.paper, rough = D.rough, line = D.line, rRect = D.rRect, rEll = D.rEll, f1 = D.f1, rng = D.rng;
  var CAM = "#E07A2E", CAM_D = "#B85A1E", CUC = "#8A5A33", OLIU = "#7C8646", OLIU_D = "#566030", THAM = "#C9463A";
  var KEM = "#F3E6C8", MUC = "#26344F", GO = "#8A5A3A", GO_D = "#5E3B24", GO_L = "#A87A50";
  function at(x, y, s) { return '<g transform="translate(' + f1(x) + "," + f1(y) + ')">' + s + "</g>"; }
  function g(id, s, tr) { return "<g" + (id ? ' id="' + id + '"' : "") + (tr ? ' transform="' + tr + '"' : "") + ">" + s + "</g>"; }
  function sc(k, s) { return '<g transform="scale(' + k + ')">' + s + "</g>"; }

  /* tay áo: nét tay đen thành viền đen + lõi màu (như bộ Whittier) */
  function sleeves(svg, mau) {
    return svg.replace(/<path d="M 0 0 L 0 (48|46)"([^>]*?)stroke="#1f2326"([^>]*?)stroke-width="13"([^>]*?)\/>/g, function (m, n, a, b, c) {
      return '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="#1f2326"' + b + 'stroke-width="24"' + c + '/>' +
        '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="' + mau + '"' + b + 'stroke-width="14"' + c + '/>';
    });
  }

  /* Wob tập 5. o.mu: "len" | "ha" (mũ trùm lúc đầu), o.nha: true (ở nhà: không áo mưa, không ba lô). Các tuỳ chọn khác như api.wob.
     Trả bộ điều khiển W có thêm W.mu(t, len) bật/tắt mũ trùm. Lông mi tắt từ t = 0 (tạo hình gốc không lông mi). */
  function wob(api, id, o) {
    o = o || {};
    var oo = {};
    Object.keys(o).forEach(function (k) { if (k !== "mu" && k !== "nha") oo[k] = o[k]; });
    var clip = 'clip-path="url(#' + id + '-clip)"', pk = "", extra = "";
    if (!o.nha) {
      // mũ trùm khi lên: vòm sau thân (trong nhóm ba lô, vẽ trước) + vành mũ trên trán
      extra += '<g id="' + id + '-muL"><path d="M 56 214 C 42 72 118 22 200 22 C 282 22 358 72 344 214 Z" fill="' + CAM + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
        line("M 82 120 C 100 60 160 36 200 36", 4, CAM_D, ' opacity="0.7"') + "</g>";
      // vạt áo dài tới gối (che đùi), phần áo trên thân cắt theo thân
      pk += '<path d="M 114 262 C 94 298 76 326 64 350 C 140 364 260 364 336 350 C 324 326 306 298 286 262 Z" fill="' + CAM + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
      pk += '<g ' + clip + '><path d="M 40 248 C 130 274 270 274 360 248 L 400 420 L 0 420 Z" fill="' + CAM + '"/>' +
        '<path d="M 40 248 C 130 274 270 274 360 248 L 400 420 L 0 420 Z" fill="url(#half)" opacity="0.08"/>' +
        line("M 40 248 C 130 274 270 274 360 248", 5, INK) + "</g>";
      pk += line("M 200 268 L 200 356", 3, CAM_D) + line("M 72 340 C 150 352 250 352 328 340", 3, CAM_D, ' stroke-dasharray="8 7"');
      pk += '<circle cx="214" cy="290" r="8" fill="' + CUC + '" stroke="' + INK + '" stroke-width="3"/><circle cx="214" cy="326" r="8" fill="' + CUC + '" stroke="' + INK + '" stroke-width="3"/>';
      pk += line("M 120 272 C 112 300 100 326 90 344", 2.5, "#F2A86A", ' opacity="0.8"');
      pk += '<g id="' + id + '-muH"><path d="M 98 250 C 150 274 250 274 302 250 C 310 260 310 272 302 280 C 250 302 150 302 98 280 C 90 272 90 260 98 250 Z" fill="' + CAM_D + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
        line("M 110 266 C 160 284 240 284 290 266", 2.5, "#F2A86A", ' opacity="0.6"') + "</g>";
      pk += '<g id="' + id + '-muT"><path d="M 72 122 C 96 46 304 46 328 122 C 300 76 100 76 72 122 Z" fill="' + CAM_D + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/></g>';
    }
    if (o.phuKien) pk += o.phuKien;
    if (pk) oo.phuKien = pk;
    if (extra) oo.packExtra = extra + (o.packExtra || "");
    var W = api.wob(id, oo);
    var s = W.svg;
    if (o.nha) {
      s = s.replace(new RegExp('<g id="' + id + '-pack">[\\s\\S]*?</g>'), "");
      s = s.replace(/<path d="M 300 96 C 286 130 284 168 300 206"[^>]*\/>/g, "");
    } else {
      s = s.replace(/#b8743a/g, OLIU).replace(/#8e5527/g, OLIU_D).replace('<rect x="262" y="66" width="96" height="36" rx="18" fill="#d9543c"', '<rect x="262" y="66" width="96" height="36" rx="18" fill="' + THAM + '"');
      s = sleeves(s, CAM);
    }
    W.svg = s;
    W.set(0, { lashes: 0, ice: 0 });
    W.mu = function (t, len) {
      if (o.nha) return W;
      api.show("#" + id + "-muL", t, len ? 1 : 0); api.show("#" + id + "-muT", t, len ? 1 : 0); api.show("#" + id + "-muH", t, len ? 0 : 1);
      return W;
    };
    W.mu(0, o.mu === "len");
    return W;
  }

  /* nét chữ tay nguệch ngoạc (không đọc được) từ x0 tới x1 ở dòng y. Trả chuỗi d. */
  function scrib(x0, x1, y, seed, cao) {
    var r = rng(seed || 3), h = cao || 6, x = x0, d = "";
    while (x < x1 - 8) {
      var wl = 18 + r() * 34, xe = Math.min(x1, x + wl);
      d += "M " + f1(x) + " " + f1(y);
      var up = true;
      while (x < xe - 3) {
        var st = 4 + r() * 3.5, hh = h * (0.5 + r() * 0.9) * (r() < 0.12 ? 1.9 : 1);
        d += " Q " + f1(x + st / 2) + " " + f1(y + (up ? -hh : hh * 0.45)) + " " + f1(x + st) + " " + f1(y);
        x += st; up = !up;
      }
      x += 6 + r() * 6;
    }
    return d;
  }

  /* răng cưa tem: hình chữ nhật mép khía. Gốc: tâm. */
  function perfo(w, h, buoc) {
    var b = buoc || Math.max(5, Math.min(w, h) / 12), pts = [];
    function canh(x0, y0, x1, y1) {
      var L = Math.hypot(x1 - x0, y1 - y0), n = Math.max(2, Math.round(L / b)), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
      for (var i = 0; i < n; i++) {
        var t = i / n, t2 = (i + 0.5) / n, k = b * 0.32;
        pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
        pts.push([x0 + (x1 - x0) * t2 - nx * k, y0 + (y1 - y0) * t2 - ny * k]);
      }
    }
    canh(-w / 2, -h / 2, w / 2, -h / 2); canh(w / 2, -h / 2, w / 2, h / 2); canh(w / 2, h / 2, -w / 2, h / 2); canh(-w / 2, h / 2, -w / 2, -h / 2);
    return "M " + pts.map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join(" L ") + " Z";
  }

  /* Con tem nét mực ĐEN TRẮNG kiểu vẽ tay 1946: núi lửa hình nón + thuyền dài có mái chèo. KHÔNG mệnh giá, KHÔNG chim cánh cụt.
     Gốc: tâm. w × h. o.chu: dòng chữ trên đỉnh tem (chỉ khi tem đủ to để chữ ≥ 45 px); không có thì vạch mực. o.hinh: "nui" (mặc định) | "nha" | "thuyen" */
  function temMuc(id, w, h, o) {
    o = o || {};
    var k = w / 100, s = '<g id="' + id + '">';
    s += '<path d="' + perfo(w, h) + '" fill="#0b1214" opacity="0.2" transform="translate(' + f1(3 * k) + "," + f1(4 * k) + ')"/>';
    s += '<path d="' + perfo(w, h) + '" fill="#FBF8EE" stroke="' + INK + '" stroke-width="' + f1(Math.max(1, 1.2 * k)) + '"/>';
    var ix = -w / 2 + 9 * k, iy = -h / 2 + 9 * k, iw = w - 18 * k, ih = h - 18 * k, lw = Math.max(1.2, 2.4 * k);
    s += '<rect x="' + f1(ix) + '" y="' + f1(iy) + '" width="' + f1(iw) + '" height="' + f1(ih) + '" fill="none" stroke="' + INK + '" stroke-width="' + f1(lw) + '"/>';
    var top = iy + ih * 0.2;
    if (o.chu) s += D.txt(0, f1(iy + ih * 0.15), o.chu, f1(ih * 0.115), { w: 800, extra: ' textLength="' + f1(iw * 0.9) + '" lengthAdjust="spacingAndGlyphs"' });
    else s += '<rect x="' + f1(ix + iw * 0.1) + '" y="' + f1(iy + ih * 0.06) + '" width="' + f1(iw * 0.8) + '" height="' + f1(ih * 0.07) + '" fill="' + INK + '" opacity="0.85"/>';
    s += line("M " + f1(ix) + " " + f1(top) + " L " + f1(ix + iw) + " " + f1(top), lw * 0.7, INK);
    var hinh = o.hinh || "nui", cy = top + (iy + ih - top) * 0.5, ww = iw;
    if (hinh === "nui" || hinh === "thuyen") {
      // núi lửa hình nón + mây đội đỉnh + gạch bóng
      var nx0 = -ww * 0.42, nx1 = ww * 0.42, ny = iy + ih * 0.72, nt = iy + ih * 0.34;
      s += '<path d="M ' + f1(nx0) + " " + f1(ny) + " L " + f1(-ww * 0.08) + " " + f1(nt) + " L " + f1(ww * 0.08) + " " + f1(nt) + " L " + f1(nx1) + " " + f1(ny) + ' Z" fill="#FBF8EE" stroke="' + INK + '" stroke-width="' + f1(lw) + '" stroke-linejoin="round"/>';
      for (var i = 0; i < 6; i++) {
        var u0 = 0.12 + i * 0.13, u1 = u0 + 0.22;
        s += line("M " + f1((0.08 + 0.34 * u0) * ww - ww * 0.05) + " " + f1(nt + (ny - nt) * u0) + " L " + f1((0.08 + 0.34 * Math.min(1, u1)) * ww - ww * 0.07) + " " + f1(nt + (ny - nt) * Math.min(1, u1)), lw * 0.45, INK);
      }
      s += '<path d="M ' + f1(-ww * 0.2) + " " + f1(nt + 2 * k) + " C " + f1(-ww * 0.22) + " " + f1(nt - 9 * k) + " " + f1(-ww * 0.04) + " " + f1(nt - 12 * k) + " " + f1(0) + " " + f1(nt - 6 * k) +
        " C " + f1(ww * 0.06) + " " + f1(nt - 14 * k) + " " + f1(ww * 0.24) + " " + f1(nt - 9 * k) + " " + f1(ww * 0.2) + " " + f1(nt + 2 * k) + ' Z" fill="#FBF8EE" stroke="' + INK + '" stroke-width="' + f1(lw * 0.8) + '"/>';
      // biển: ba vạch sóng
      for (var j = 0; j < 3; j++) s += line("M " + f1(-ww * 0.46) + " " + f1(ny + (3 + j * 5) * k) + " q " + f1(ww * 0.06) + " " + f1(-3 * k) + " " + f1(ww * 0.12) + " 0 t " + f1(ww * 0.12) + " 0 t " + f1(ww * 0.12) + " 0 t " + f1(ww * 0.12) + " 0 t " + f1(ww * 0.12) + " 0 t " + f1(ww * 0.12) + " 0 t " + f1(ww * 0.12) + " 0", lw * 0.5, INK);
      // thuyền dài có mái chèo
      var by = ny + 6 * k;
      s += '<path d="M ' + f1(-ww * 0.3) + " " + f1(by - 5 * k) + " L " + f1(ww * 0.3) + " " + f1(by - 5 * k) + " C " + f1(ww * 0.22) + " " + f1(by + 3 * k) + " " + f1(-ww * 0.22) + " " + f1(by + 3 * k) + " " + f1(-ww * 0.3) + " " + f1(by - 5 * k) + ' Z" fill="' + INK + '"/>';
      for (var m = 0; m < 5; m++) { var mx = -ww * 0.2 + m * ww * 0.1; s += line("M " + f1(mx) + " " + f1(by - 4 * k) + " L " + f1(mx - 5 * k) + " " + f1(by + 9 * k), lw * 0.5, INK); }
    } else if (hinh === "nha") {
      var hy = iy + ih * 0.75;
      for (var q = 0; q < 3; q++) {
        var hx = -ww * 0.36 + q * ww * 0.26;
        s += '<path d="M ' + f1(hx) + " " + f1(hy) + " L " + f1(hx) + " " + f1(hy - 12 * k) + " L " + f1(hx + ww * 0.11) + " " + f1(hy - 22 * k) + " L " + f1(hx + ww * 0.22) + " " + f1(hy - 12 * k) + " L " + f1(hx + ww * 0.22) + " " + f1(hy) + ' Z" fill="#FBF8EE" stroke="' + INK + '" stroke-width="' + f1(lw * 0.8) + '"/>';
      }
      s += line("M " + f1(-ww * 0.46) + " " + f1(hy) + " L " + f1(ww * 0.46) + " " + f1(hy), lw * 0.8, INK);
    }
    return s + "</g>";
  }

  /* Bưu thiếp: giấy kem mép quăn, một góc sờn. Gốc: tâm. o: { w 280, h 186, mat: "viet" | "tranh", chuTem, dau (dấu bưu điện), seed,
     vietId: true thì mỗi dòng chữ có id (id-v0..v7) và hai dòng dọc lề (id-l0, id-l1) để hiện dần } */
  function buuThiep(id, o) {
    o = o || {};
    var w = o.w || 280, h = o.h || 186, sd = o.seed || 4701, s = '<g id="' + id + '">';
    s += paper(rRect(-w / 2, -h / 2, w, h, 1.3, sd), KEM, { stroke: true, sw: 4, sx: 5, sy: 6 });
    s += '<path d="M ' + f1(-w / 2 + 2) + " " + f1(h / 2 - 26) + " L " + f1(-w / 2 + 26) + " " + f1(h / 2 - 2) + " L " + f1(-w / 2 + 2) + " " + f1(h / 2 - 2) + ' Z" fill="#DCCB9F" opacity="0.9"/>';
    s += line("M " + f1(w / 2 - 30) + " " + f1(-h / 2 + 2) + " C " + f1(w / 2 - 14) + " " + f1(-h / 2 + 6) + " " + f1(w / 2 - 4) + " " + f1(-h / 2 + 14) + " " + f1(w / 2 - 2) + " " + f1(-h / 2 + 30), 2, "#B9A47A");
    if (o.mat === "tranh") {
      s += '<rect x="' + f1(-w / 2 + 10) + '" y="' + f1(-h / 2 + 10) + '" width="' + f1(w - 20) + '" height="' + f1(h - 20) + '" fill="#C9D3D2"/>';
      s += '<path d="M ' + f1(-w / 2 + 10) + " " + f1(h * 0.18) + " L " + f1(w / 2 - 10) + " " + f1(h * 0.18) + " L " + f1(w / 2 - 10) + " " + f1(h / 2 - 10) + " L " + f1(-w / 2 + 10) + " " + f1(h / 2 - 10) + ' Z" fill="#7D8F94"/>';
      s += '<path d="M ' + f1(-w * 0.34) + " " + f1(h * 0.2) + " L " + f1(-w * 0.05) + " " + f1(-h * 0.2) + " L " + f1(w * 0.05) + " " + f1(-h * 0.2) + " L " + f1(w * 0.34) + " " + f1(h * 0.2) + ' Z" fill="#5E6A5A" stroke="' + INK + '" stroke-width="3"/>';
      s += paper(rEll(0, -h * 0.22, w * 0.16, h * 0.08, 2, sd + 1), "#F4F4EE", { shadow: false, stroke: true, sw: 2.5 });
    } else {
      var n = 8, top = -h / 2 + 30, gap = (h - 44) / n;
      for (var i = 0; i < n; i++) {
        var y = top + i * gap, x1 = i < 3 ? w / 2 - 76 : w / 2 - 14;
        s += '<path' + (o.vietId ? ' id="' + id + "-v" + i + '"' : "") + ' d="' + scrib(-w / 2 + 34, x1, y, sd + 10 + i, 5.5) + '" fill="none" stroke="' + MUC + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
      }
      // hai dòng chữ dọc lề trái (viết khi xoay bưu thiếp)
      for (var l = 0; l < 2; l++) {
        var lx = -w / 2 + 12 + l * 11;
        s += '<g' + (o.vietId ? ' id="' + id + "-l" + l + '"' : "") + ' transform="translate(' + f1(lx) + ",0) rotate(-90)\"><path d=\"" + scrib(-h / 2 + 16, h / 2 - 16, 0, sd + 40 + l, 4) + '" fill="none" stroke="' + MUC + '" stroke-width="2" stroke-linecap="round"/></g>';
      }
      if (o.dau) {
        [[w / 2 - 92, -h / 2 + 46], [w / 2 - 70, -h / 2 + 64]].forEach(function (p, j) {
          s += '<g opacity="0.55"><circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="22" fill="none" stroke="#3A3F52" stroke-width="2.5"/>' +
            line("M " + f1(p[0] + 26) + " " + f1(p[1] - 8) + " q 10 -6 20 0 t 20 0 t 20 0 M " + f1(p[0] + 26) + " " + f1(p[1] + 2) + " q 10 -6 20 0 t 20 0 t 20 0", 2.2, "#3A3F52") + "</g>";
        });
      }
      s += at(w / 2 - 40, -h / 2 + 44, temMuc(id + "-tem", 50, 62, { chu: o.chuTem }));
    }
    return s + "</g>";
  }

  /* Túi thư vải bố treo móc. Gốc: móc treo (đầu dây). Thân ~170 × 210, miệng mở elip tối. id-mieng: miệng túi. */
  function tuiThu(id, o) {
    o = o || {};
    var s = '<g id="' + id + '">';
    s += line("M 0 0 L 0 34", 6, "#2B2F33") + '<path d="M -10 -6 C -10 -18 10 -18 10 -6" fill="none" stroke="#2B2F33" stroke-width="5"/>';
    s += line("M 0 34 L -58 58 M 0 34 L 58 58", 4, "#8A6440");
    s += paper("M -70 60 C -96 120 -104 200 -84 236 C -50 262 50 262 84 236 C 104 200 96 120 70 60 Z", "#CDB88E", { stroke: true, sw: 5, half: 0.1 });
    s += paper(rRect(-34, 128, 68, 52, 1.5, 4801), "#B39A6C", { shadow: false, stroke: true, sw: 3 });
    s += line("M -30 136 L 30 136 M -30 172 L 30 172", 2, "#8E7A52", ' stroke-dasharray="5 4"');
    s += line("M -60 120 C -66 170 -62 210 -50 238 M 56 116 C 64 170 60 210 50 238", 2.5, "#A8946A", ' opacity="0.8"');
    s += '<g id="' + id + '-mieng"><ellipse cx="0" cy="62" rx="72" ry="16" fill="#4A3B2A" stroke="' + INK + '" stroke-width="5"/></g>';
    s += line("M -72 66 C -36 80 36 80 72 66", 6, "#8A6440") + '<circle cx="74" cy="66" r="7" fill="#8A6440" stroke="' + INK + '" stroke-width="3"/>';
    return s + "</g>";
  }

  /* Quầy bưu điện (bộ dùng chung d31, d47). Toạ độ khung 1920×1080 ở camera (960, 540, 1).
     Trả { tuong (tường sau, cửa sổ ra biển + núi lửa có mây, cửa sổ bán tem có song, biển POST OFFICE), quay (thân quầy + mặt nghiêng viết),
     ngan (ngăn kéo tem: nhóm id "ngan" kéo ra theo x), gan (tiền cảnh: chồng bưu kiện buộc dây + con dấu cao su), tui (túi thư treo cạnh quầy, id "tui"),
     vt: { mat: y mặt quầy, san: y sàn, the: [x, y] chỗ đặt bưu thiếp, tui: [x, y] miệng túi } }. o: { chu: "POST OFFICE" }. */
  function buuDien(o) {
    o = o || {};
    var MQ = 790, SAN = 1010, s = "";
    // tường ván sơn kem + chân tường gỗ
    s += '<rect x="-400" y="-200" width="2700" height="1400" fill="#E6D9BC"/>';
    for (var x = -400; x < 2300; x += 64) s += line("M " + x + " -200 L " + x + " 760", 2, "#CDBF9F", ' opacity="0.8"');
    s += paper(rRect(-400, 640, 2700, 400, 2, 4901), "#B98C62", { shadow: false, stroke: true, sw: 4 });
    for (var x2 = -380; x2 < 2300; x2 += 110) s += line("M " + x2 + " 650 L " + x2 + " 1030", 3, "#8E6440", ' opacity="0.6"');
    s += '<rect x="-400" y="' + SAN + '" width="2700" height="200" fill="#6E4E36"/>' + line("M -400 " + SAN + " L 2300 " + SAN, 5, INK);
    // cửa sổ ra biển: trời xám, biển, núi lửa đội mây
    var wx = 180, wy = 250, ww = 400, wh = 330;
    s += paper(rRect(wx - 22, wy - 22, ww + 44, wh + 44, 1.5, 4902), GO, { stroke: true, sw: 5 });
    s += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" fill="#C8D3D6"/>';
    s += '<path d="M ' + wx + " " + (wy + 230) + " L " + (wx + ww) + " " + (wy + 230) + " L " + (wx + ww) + " " + (wy + wh) + " L " + wx + " " + (wy + wh) + ' Z" fill="#7D9097"/>';
    s += line("M " + (wx + 20) + " " + (wy + 260) + " q 20 -8 40 0 t 40 0 M " + (wx + 200) + " " + (wy + 290) + " q 20 -8 40 0 t 40 0", 3, "#E8EEF0", ' opacity="0.8"');
    s += '<path d="M ' + (wx + 40) + " " + (wy + 232) + " L " + (wx + 170) + " " + (wy + 92) + " L " + (wx + 230) + " " + (wy + 92) + " L " + (wx + 370) + " " + (wy + 232) + ' Z" fill="#5C6B58" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    s += '<g id="bdMay">' + paper(rough([[wx + 110, wy + 104], [wx + 140, wy + 70], [wx + 200, wy + 60], [wx + 262, wy + 72], [wx + 290, wy + 104], [wx + 200, wy + 116]], 3, 4903, 14), "#F6F4EE", { shadow: false, stroke: true, sw: 3 }) + "</g>";
    s += line("M " + (wx + ww / 2) + " " + wy + " L " + (wx + ww / 2) + " " + (wy + wh) + " M " + wx + " " + (wy + wh / 2) + " L " + (wx + ww) + " " + (wy + wh / 2), 12, GO) +
      line("M " + (wx + ww / 2) + " " + wy + " L " + (wx + ww / 2) + " " + (wy + wh) + " M " + wx + " " + (wy + wh / 2) + " L " + (wx + ww) + " " + (wy + wh / 2), 3, INK, ' opacity="0.5"');
    s += paper(rRect(wx - 34, wy + wh + 18, ww + 68, 24, 1.5, 4904), GO_L, { stroke: true, sw: 4 });
    // vách gỗ quầy bán tem + cửa sổ bán tem có song
    s += paper(rRect(800, 300, 620, 470, 1.8, 4905), "#9B6B45", { stroke: true, sw: 5, half: 0.1 });
    s += paper("M 930 640 L 930 470 C 930 400 1290 400 1290 470 L 1290 640 Z", "#3E2E22", { shadow: false, stroke: true, sw: 5 });
    s += '<path d="M 950 640 L 950 474 C 950 420 1270 420 1270 474 L 1270 640 Z" fill="#5A4430"/>';
    for (var b = 0; b < 9; b++) s += line("M " + (975 + b * 34) + " 440 L " + (975 + b * 34) + " 640", 5, "#C9A55A") + line("M " + (975 + b * 34) + " 440 L " + (975 + b * 34) + " 640", 1.6, INK, ' opacity="0.6"');
    s += paper("M 1030 640 L 1030 590 C 1030 560 1190 560 1190 590 L 1190 640 Z", "#2A1E16", { shadow: false, stroke: true, sw: 4 });
    s += paper(rRect(900, 630, 420, 26, 1.4, 4906), GO_L, { stroke: true, sw: 4 });
    // kệ tem nhỏ sau song (hình chữ nhật, không chữ)
    for (var q = 0; q < 4; q++) s += '<rect x="' + (985 + q * 62) + '" y="478" width="40" height="50" fill="' + (q % 2 ? "#E9DEC4" : "#D8C9A6") + '" stroke="' + INK + '" stroke-width="2.5"/>';
    // biển POST OFFICE
    s += '<g id="bdBien">' + line("M 900 250 L 930 190 M 1320 250 L 1290 190", 4, "#3A3F44") +
      paper(rRect(820, 192, 580, 112, 1.6, 4907), "#2F4A3A", { stroke: true, sw: 6, sx: 7, sy: 9 }) +
      '<rect x="836" y="206" width="548" height="84" fill="none" stroke="#E9D9A6" stroke-width="3" rx="4"/>' +
      D.txt(1110, 274, o.chu || "", 64, { w: 800, fill: "#F3E6C2" }) + "</g>";
    // đèn treo
    s += line("M 640 -200 L 640 150", 3, "#2B2F33") + paper("M 600 150 L 680 150 L 700 190 L 580 190 Z", "#3F5A4A", { stroke: true, sw: 4 }) + '<ellipse cx="640" cy="192" rx="60" ry="10" fill="#FFE6A8" stroke="' + INK + '" stroke-width="3"/>';
    s += '<ellipse cx="640" cy="330" rx="220" ry="170" fill="url(#lampG)"/>';

    // thân quầy: mặt quầy + mặt nghiêng viết + ván đứng + ngăn kéo
    var q0 = 560, q1 = 1700, quay = "";
    quay += paper(rRect(q0, MQ + 26, q1 - q0, SAN - MQ - 26, 2, 4910), GO, { stroke: true, sw: 6, half: 0.12, sx: 8, sy: 6 });
    for (var v = q0 + 70; v < q1; v += 90) quay += line("M " + v + " " + (MQ + 40) + " L " + v + " " + (SAN - 6), 3, GO_D, ' opacity="0.55"');
    quay += paper(rRect(q0 - 30, MQ, q1 - q0 + 60, 30, 1.6, 4911), GO_L, { stroke: true, sw: 5, sx: 6, sy: 6 });
    quay += paper("M 760 " + MQ + " L 780 " + (MQ - 22) + " L 1180 " + (MQ - 22) + " L 1200 " + MQ + " Z", "#B88A5C", { stroke: true, sw: 4, shadow: false });   // mặt nghiêng viết
    var ngan = '<g id="ngan"><g id="nganLong" opacity="0">' + paper("M 1232 884 L 1250 846 L 1460 846 L 1478 884 Z", "#3A2A1E", { shadow: false, stroke: true, sw: 4 }) +
      paper("M 1250 880 L 1262 856 L 1448 856 L 1460 880 Z", "#6E4E36", { shadow: false }) + "</g>" + paper(rRect(1240, 880, 230, 70, 1.4, 4912), "#9E6E46", { stroke: true, sw: 5, sx: 4, sy: 5 }) +
      '<rect x="1250" y="884" width="210" height="10" fill="#6E4A2E"/>' +
      '<circle cx="1355" cy="918" r="10" fill="#C9A55A" stroke="' + INK + '" stroke-width="3"/></g>';
    var nganLong = paper(rRect(1236, 876, 238, 78, 1, 4913), "#2A1E16", { shadow: false });
    // tiền cảnh: chồng bưu kiện buộc dây + con dấu cao su (lớp gần)
    var gan = at(-40, 1080, paper(rRect(0, -230, 280, 120, 2, 4920), "#C89A62", { stroke: true, sw: 5, half: 0.1 }) +
      paper(rRect(30, -330, 220, 104, 2, 4921), "#B88A54", { stroke: true, sw: 5 }) +
      line("M 140 -330 L 140 -110 M 0 -170 L 280 -170 M 30 -278 L 250 -278", 5, "#E9DDC2") +
      paper(rRect(-60, -110, 420, 140, 2, 4922), "#6E4E36", { stroke: true, sw: 5 }) +
      paper(rRect(200, -392, 70, 50, 2, 4923), "#3E4A44", { stroke: true, sw: 4 }) + paper(rEll(235, -400, 22, 16, 1.5, 4924), "#8A5A33", { stroke: true, sw: 4 }));
    var TX = o.tuiX || 760;
    var tui = at(TX, 744, tuiThu("tui"));
    return { tuong: s, quay: nganLong + quay, ngan: ngan, gan: gan, tui: tui, vt: { mat: MQ, san: SAN, the: [1000, MQ - 40], tui: [TX, 806] } };
  }

  /* Con bò giấy nhìn ngang, đầu bên phải (o.lat = -1 thì quay trái). Gốc: giữa hai chân sau trên mặt đất... chính xác: điểm giữa đáy thân chiếu xuống đất.
     id-dau (đầu, gốc cổ), id-duoi (đuôi), id-c0..3 (chân, gốc hông). Dài ~360, cao ~250. o: { mau: nâu | "den", seed } */
  function bo(id, o) {
    o = o || {};
    var sd = o.seed || 5101, nau = o.mau || "#8C5A3C", dom = "#F2EADA", lat = o.lat === -1 ? -1 : 1;
    var s = '<g id="' + id + '"><g transform="scale(' + lat + ',1)">';
    s += '<ellipse cx="0" cy="4" rx="170" ry="14" fill="#0b1214" opacity="0.22"/>';
    var chan = [[-120, -96], [-90, -96], [86, -100], [116, -100]];
    chan.forEach(function (c, i) {
      var cc = (i === 1 || i === 2) ? "#6E4630" : nau;
      s += '<g transform="translate(' + c[0] + "," + c[1] + ')"><g id="' + id + "-c" + i + '">' + paper(rRect(-13, 0, 26, 92, 1.4, sd + i), i % 2 ? cc : nau, { stroke: true, sw: 4, sx: 3, sy: 3 }) +
        '<rect x="-14" y="80" width="28" height="16" fill="#3A2A20" stroke="' + INK + '" stroke-width="3"/></g></g>';
    });
    s += '<g transform="translate(-160,-200)"><g id="' + id + '-duoi">' + line("M 0 0 C -18 30 -20 80 -12 120", 6, INK) + paper(rEll(-12, 128, 9, 16, 1, sd + 9), "#3A2A20", { shadow: false }) + "</g></g>";
    s += paper(rough([[-170, -200], [-120, -236], [60, -240], [150, -214], [176, -150], [150, -96], [-150, -92], [-178, -140]], 3, sd + 5, 20), nau, { stroke: true, sw: 5, half: 0.12 });
    s += paper(rough([[-60, -232], [10, -236], [40, -190], [-10, -140], [-70, -170]], 3, sd + 6, 16), dom, { shadow: false });
    s += paper(rough([[80, -200], [130, -196], [140, -150], [100, -120], [70, -150]], 3, sd + 7, 14), dom, { shadow: false });
    s += paper(rEll(40, -98, 30, 14, 1.4, sd + 8), "#E9A3A0", { shadow: false, stroke: true, sw: 3 });
    // đầu
    s += '<g transform="translate(150,-200)"><g id="' + id + '-dau">' +
      paper(rough([[-10, -10], [40, -40], [86, -30], [110, 20], [100, 56], [60, 66], [20, 40]], 2.5, sd + 10, 12), nau, { stroke: true, sw: 5 }) +
      paper(rEll(92, 44, 26, 20, 1.5, sd + 11), "#E7B9A8", { shadow: false, stroke: true, sw: 4 }) +
      '<circle cx="86" cy="42" r="3.5" fill="' + INK + '"/><circle cx="100" cy="46" r="3.5" fill="' + INK + '"/>' +
      '<circle cx="62" cy="-4" r="7" fill="#FFFDF6" stroke="' + INK + '" stroke-width="3"/><circle cx="64" cy="-3" r="3.5" fill="' + INK + '"/>' +
      paper("M 30 -30 C 18 -44 4 -50 -8 -48 C 6 -40 14 -32 24 -22 Z", "#6E4630", { shadow: false, stroke: true, sw: 3 }) +
      paper("M 50 -38 C 54 -56 62 -64 74 -66 C 70 -54 64 -44 60 -34 Z", "#EFE6D2", { shadow: false, stroke: true, sw: 3 }) +
      "</g></g>";
    return s + "</g></g>";
  }

  /* Tường đá khô thấp (ranh ô ruộng). Gốc: mép trái chân tường. Dài w, cao h. Trả SVG. */
  function tuongDa(w, h, seed, mau) {
    var r = rng(seed || 5201), s = "", hh = h || 70, x = 0;
    s += paper(rRect(0, -hh, w, hh, 2, seed || 5201), "#5E5A55", { stroke: true, sw: 4, sx: 4, sy: 5 });
    for (var row = 0; row < 3; row++) {
      x = row % 2 ? -20 : 0;
      while (x < w) {
        var bw = 38 + r() * 30, y0 = -hh + row * hh / 3;
        if (x + bw > 0) s += paper(rEll(Math.max(0, x) + bw / 2 - (x < 0 ? -x / 2 : 0), y0 + hh / 6, bw / 2 - 2, hh / 6 - 1, 2, (seed || 5201) + row * 50 + Math.round(x)), mau || (r() < 0.5 ? "#8A847A" : "#77716A"), { shadow: false, stroke: true, sw: 2 });
        x += bw;
      }
    }
    return s;
  }

  /* Nhà mái thấp kiểu Tristan (tường đá xám, mái lợp xanh/đỏ, cửa, ô cửa sổ). Gốc: giữa chân tường. o: { w, h, mai, seed, toi, den (cửa sổ sáng) } */
  function nhaThap(o) {
    o = o || {};
    var w = o.w || 260, h = o.h || 110, sd = o.seed || 5301, s = "<g>";
    var tuong = o.toi ? "#6E6A66" : "#B9B1A2", mai = o.mai || "#4F7A5A";
    s += paper(rRect(-w / 2, -h, w, h, 2, sd), tuong, { stroke: true, sw: 4, half: 0.1 });
    s += paper("M " + f1(-w / 2 - 16) + " " + f1(-h + 4) + " L " + f1(-w / 2 + 30) + " " + f1(-h - 58) + " L " + f1(w / 2 - 30) + " " + f1(-h - 58) + " L " + f1(w / 2 + 16) + " " + f1(-h + 4) + " Z", mai, { stroke: true, sw: 4 });
    for (var i = 1; i < 6; i++) s += line("M " + f1(-w / 2 + i * w / 6) + " " + f1(-h - 52) + " L " + f1(-w / 2 + i * w / 6 - 8) + " " + f1(-h), 2, INK, ' opacity="0.25"');
    s += paper(rRect(-w * 0.1, -h * 0.72, w * 0.16, h * 0.72, 1, sd + 1), o.toi ? "#3E3430" : "#6E4A2E", { shadow: false, stroke: true, sw: 3 });
    [-0.32, 0.26].forEach(function (k, j) {
      s += '<rect x="' + f1(w * k - 18) + '" y="' + f1(-h * 0.7) + '" width="36" height="30" fill="' + (o.den ? "#FFD68A" : (o.toi ? "#2E3236" : "#A9BEC6")) + '" stroke="' + INK + '" stroke-width="3"/>';
    });
    s += paper(rRect(w * 0.3, -h - 82, 26, 40, 1, sd + 2), tuong, { stroke: true, sw: 3, shadow: false });
    return s + "</g>";
  }

  /* Núi lửa hình nón đội mây (lớp xa). Gốc: giữa chân. o: { w 1300, h 620, mau, may (true), hong (hoàng hôn), seed } */
  function nuiLua(o) {
    o = o || {};
    var w = o.w || 1300, h = o.h || 620, sd = o.seed || 5401, s = "<g>";
    var mau = o.mau || (o.hong ? "#9C6E78" : "#6F7A6A");
    s += paper(rough([[-w / 2, 0], [-w * 0.32, -h * 0.4], [-w * 0.1, -h * 0.92], [w * 0.08, -h * 0.95], [w * 0.3, -h * 0.45], [w / 2, 0]], 5, sd, 34), mau, { stroke: true, sw: 4, half: 0.1, shadow: false });
    s += paper(rough([[-w * 0.1, -h * 0.92], [w * 0.08, -h * 0.95], [w * 0.16, -h * 0.72], [0, -h * 0.66], [-w * 0.18, -h * 0.74]], 3, sd + 1, 20), o.hong ? "#B78890" : "#87907C", { shadow: false });
    for (var i = 0; i < 6; i++) s += line("M " + f1(-w * 0.08 + i * w * 0.03) + " " + f1(-h * 0.88) + " L " + f1(-w * 0.3 + i * w * 0.12) + " " + f1(-h * 0.1), 2.5, INK, ' opacity="0.18"');
    if (o.may !== false) s += '<g id="' + (o.id || "nlMay") + '">' + paper(rough([[-w * 0.26, -h * 0.9], [-w * 0.18, -h * 1.02], [0, -h * 1.08], [w * 0.2, -h * 1.03], [w * 0.28, -h * 0.9], [w * 0.1, -h * 0.84], [-w * 0.12, -h * 0.84]], 5, sd + 2, 24), o.hong ? "#F2C9C0" : "#F4F3EC", { shadow: false, stroke: true, sw: 3 }) + "</g>";
    return s + "</g>";
  }

  /* Biển sóng xám nhiều dải, sóng lượn mỗi khung (on twos). Trả SVG; tự đăng ký vẽ. o: { y (mặt nước), x0, x1, n dải, mau: [màu xa..gần], bien (biên độ), toc, seed } */
  function bienSong(api, id, o) {
    o = o || {};
    var y0 = o.y || 700, x0 = o.x0 == null ? -400 : o.x0, x1 = o.x1 == null ? 2400 : o.x1, n = o.n || 4, bien = o.bien || 14, toc = o.toc || 0.5;
    var mau = o.mau || ["#8FA0A6", "#7A8E95", "#647A82", "#51666E"], s = '<g id="' + id + '">', nodes = null;
    function d(i, t) {
      var yy = y0 + i * (o.cach || 60), a = bien * (0.6 + i * 0.25), pts = "M " + x0 + " " + (yy + 900);
      for (var x = x0; x <= x1; x += 60) pts += " L " + x + " " + f1(yy + a * Math.sin(x / (140 + i * 30) + t * toc * (i % 2 ? -1 : 1) * 2.2 + i * 1.7));
      return pts + " L " + x1 + " " + (yy + 900) + " Z";
    }
    for (var i = 0; i < n; i++) s += '<path id="' + id + "-" + i + '" d="' + d(i, 0) + '" fill="' + mau[Math.min(i, mau.length - 1)] + '" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
    api.moiKhung(function (t) {
      if (!nodes) { nodes = []; for (var k = 0; k < n; k++) nodes.push(window.document.getElementById(id + "-" + k)); }
      for (var j = 0; j < n; j++) if (nodes[j]) nodes[j].setAttribute("d", d(j, t));
    }, { twos: true });
    return s + "</g>";
  }

  /* Người giấy chung, KHÔNG mặt (đầu tròn trơn), nhìn nghiêng hoặc từ sau. Gốc: giữa hai chân. Cao ~170 khi s = 1.
     id-tayP (tay phải, gốc vai), id-tayT (tay trái), id-cP, id-cT (chân). o: { ao, quan, mu (màu mũ len), s } */
  function nguoi(id, o) {
    o = o || {};
    var ao = o.ao || "#6F7E8A", quan = o.quan || "#3E4448", da = o.da || "#D9B48E", s = '<g id="' + id + '"><g transform="scale(' + (o.s || 1) + ')">';
    s += '<ellipse cx="0" cy="2" rx="34" ry="6" fill="#0b1214" opacity="0.22"/>';
    s += '<g transform="translate(-8,-70)"><g id="' + id + '-cT">' + line("M 0 0 L 0 68", 13, INK) + line("M 0 0 L 0 68", 7, quan) + "</g></g>";
    s += '<g transform="translate(8,-70)"><g id="' + id + '-cP">' + line("M 0 0 L 0 68", 13, INK) + line("M 0 0 L 0 68", 7, quan) + "</g></g>";
    s += '<g transform="translate(-12,-140)"><g id="' + id + '-tayT">' + line("M 0 0 L -4 56", 12, INK) + line("M 0 0 L -4 56", 6, ao) + "</g></g>";
    s += paper(rough([[-24, -150], [24, -150], [28, -64], [-28, -64]], 1.5, 5501, 12), ao, { stroke: true, sw: 4, sx: 3, sy: 4 });
    s += '<g transform="translate(12,-140)"><g id="' + id + '-tayP">' + line("M 0 0 L 4 56", 12, INK) + line("M 0 0 L 4 56", 6, ao) + "</g></g>";
    s += '<circle cx="0" cy="-172" r="21" fill="' + da + '" stroke="' + INK + '" stroke-width="4"/>';
    if (o.mu) s += '<path d="M -22 -176 C -22 -200 22 -200 22 -176 Z" fill="' + o.mu + '" stroke="' + INK + '" stroke-width="3.5"/>';
    return s + "</g></g>";
  }

  /* Trang lịch sử: tờ giấy lớn mép xé, nền màu trầm, có khung trong để chứa hình (clip). Gốc: góc trên trái. Trả { s, clip (id clipPath) }.
     o: { w, h, mau, seed, id } */
  function trangLS(o) {
    o = o || {};
    var w = o.w || 1300, h = o.h || 760, id = o.id || "tls", sd = o.seed || 5601;
    var vien = rough([[0, 0], [w, 0], [w, h], [0, h]], 5, sd, 22);
    var s = paper(vien, o.mau || "#E3DCCB", { stroke: true, sw: 5, sx: 10, sy: 12, shOp: 0.3 });
    s += '<clipPath id="' + id + '-clip"><path d="' + rough([[24, 24], [w - 24, 24], [w - 24, h - 24], [24, h - 24]], 2.5, sd + 1, 22) + '"/></clipPath>';
    return { s: s, clip: id + "-clip", w: w, h: h };
  }

  /* Bàn kỷ vật nhìn từ trên (d38, d42): mặt gỗ ấm, vệt đèn bàn, đế đèn ở góc, sổ du lịch mở hai trang ở giữa.
     Trả { nen (mặt bàn + vệt đèn + sổ hai trang), den (đế đèn + chao đèn, lớp gần), vt: { trai: [x, y, w, h], phai: [x, y, w, h], gay: x } } */
  function banSo(o) {
    o = o || {};
    var sd = o.seed || 5701, s = "";
    s += '<rect x="-600" y="-400" width="3200" height="1900" fill="#7A5236"/>';
    var r = rng(sd);
    for (var i = 0; i < 26; i++) { var yy = -380 + i * 72 + r() * 20; s += line("M -600 " + f1(yy) + " C 300 " + f1(yy + 30 * (r() - 0.5)) + " 1300 " + f1(yy + 30 * (r() - 0.5)) + " 2600 " + f1(yy + 20 * (r() - 0.5)), 2 + r() * 3, "#5E3B24", ' opacity="' + f1(0.25 + r() * 0.3) + '"'); }
    s += '<ellipse cx="1560" cy="250" rx="1100" ry="760" fill="url(#lampG)"/><ellipse cx="1500" cy="300" rx="700" ry="500" fill="url(#lampG)"/>';
    // sổ mở: hai trang (trái x 300..950, phải 970..1620), y 150..930
    var bx = 290, by = 150, pw = 660, ph = 780;
    s += paper(rRect(bx - 18, by - 10, pw * 2 + 56, ph + 34, 1.5, sd + 1), "#5B4A3A", { stroke: true, sw: 5, sx: 12, sy: 14, shOp: 0.35 });
    s += paper(rRect(bx, by, pw, ph, 1.5, sd + 2), "#EFE6D2", { stroke: true, sw: 4, shadow: false });
    s += paper(rRect(bx + pw + 20, by, pw, ph, 1.5, sd + 3), "#F2EAD8", { stroke: true, sw: 4, shadow: false });
    s += '<rect x="' + (bx + pw - 20) + '" y="' + by + '" width="60" height="' + ph + '" fill="url(#gayG)"/>';
    var den = at(1830, -40, '<g transform="rotate(160) scale(1.25)">' + D.deskLamp() + "</g>");
    return { nen: s, den: den, vt: { trai: [bx, by, pw, ph], phai: [bx + pw + 20, by, pw, ph], gay: bx + pw + 10 } };
  }

  /* Tàu nhỏ nhìn ngang (tàu cá / tàu khách). Gốc: giữa, mặt nước. Mũi bên phải. o: { dai, kieu: "ca" | "khach" | "xuong", mau, nguoi (số người que nhỏ) } */
  function tau(id, o) {
    o = o || {};
    var L = o.dai || 360, k = o.kieu || "ca", s = '<g id="' + id + '">', mau = o.mau || (k === "khach" ? "#E9E4D8" : "#6F7F86");
    var hh = k === "khach" ? L * 0.13 : L * 0.16;
    s += paper("M " + f1(-L / 2) + " " + f1(-hh) + " L " + f1(L / 2 + L * 0.06) + " " + f1(-hh - L * 0.02) + " C " + f1(L / 2) + " " + f1(-hh * 0.2) + " " + f1(L * 0.38) + " 6 " + f1(L * 0.3) + " 8 L " + f1(-L * 0.42) + " 8 C " + f1(-L * 0.48) + " 0 " + f1(-L / 2) + " " + f1(-hh * 0.5) + " " + f1(-L / 2) + " " + f1(-hh) + " Z",
      k === "khach" ? "#2F3A40" : mau, { stroke: true, sw: 4 });
    if (k === "khach") {
      s += paper(rRect(-L * 0.38, -hh - L * 0.08, L * 0.7, L * 0.08, 1.2, 5801), "#E9E4D8", { stroke: true, sw: 3.5 });
      s += paper(rRect(-L * 0.22, -hh - L * 0.15, L * 0.4, L * 0.07, 1.2, 5802), "#E9E4D8", { stroke: true, sw: 3.5 });
      s += paper(rRect(-L * 0.02, -hh - L * 0.24, L * 0.08, L * 0.1, 1, 5803), "#B5523B", { stroke: true, sw: 3.5 });
      for (var w = 0; w < 10; w++) s += '<circle cx="' + f1(-L * 0.34 + w * L * 0.064) + '" cy="' + f1(-hh - L * 0.04) + '" r="' + f1(L * 0.011) + '" fill="#4A5A66"/>';
    } else if (k === "ca") {
      s += paper(rRect(-L * 0.1, -hh - L * 0.14, L * 0.22, L * 0.14, 1.2, 5804), "#E6E0D0", { stroke: true, sw: 3.5 });
      s += line("M " + f1(-L * 0.3) + " " + f1(-hh) + " L " + f1(-L * 0.3) + " " + f1(-hh - L * 0.3), 4, INK);
    } else {
      s += line("M " + f1(-L * 0.45) + " " + f1(-hh * 0.6) + " L " + f1(L * 0.45) + " " + f1(-hh * 0.6), 2, INK, ' opacity="0.4"');
    }
    var n = o.nguoi || 0;
    for (var p = 0; p < n; p++) {
      var px = (k === "khach" ? -L * 0.3 : -L * 0.4) + p * (L * (k === "khach" ? 0.6 : 0.8) / Math.max(1, n)), py = -hh - (k === "khach" ? L * 0.08 : 0);
      s += '<circle cx="' + f1(px) + '" cy="' + f1(py - 22) + '" r="7" fill="#D9C4A8" stroke="' + INK + '" stroke-width="2"/>' + line("M " + f1(px) + " " + f1(py - 15) + " L " + f1(px) + " " + f1(py), 8, ["#5A6E7A", "#8A5A3A", "#6E7A4A", "#7A5A6E"][p % 4]);
    }
    return s + "</g>";
  }


  /* Bảng kẹp danh sách việc (không chữ): ba ô có hình củ khoai, tôm hùm, con bò; hai ô đầu đã tích, ô bò trống.
     Gốc: tâm. 150 × 200. id-x: dấu X vào ô bò (ẩn sẵn, bật bằng opacity hoặc scale), id-tich: hai dấu tích. Ô bò ở (−22, 58). */
  function bangKep(id) {
    var s = '<g id="' + id + '">';
    s += paper(rRect(-75, -100, 150, 200, 1.6, 5901), "#9C6E46", { stroke: true, sw: 4, sx: 4, sy: 5 });
    s += paper(rRect(-62, -82, 124, 172, 1.2, 5902), "#FBF6EA", { stroke: true, sw: 3, shadow: false });
    s += paper(rRect(-30, -110, 60, 26, 1, 5903), "#B9BEC2", { stroke: true, sw: 3.5, shadow: false });
    var rows = [-42, 8, 58];
    rows.forEach(function (y, i) {
      s += '<rect x="-44" y="' + (y - 14) + '" width="28" height="28" fill="none" stroke="' + INK + '" stroke-width="3"/>';
      if (i === 0) s += paper(rEll(24, y, 22, 14, 1.5, 5904), "#B98A55", { shadow: false, stroke: true, sw: 2.5 }) + '<circle cx="18" cy="' + (y - 3) + '" r="2" fill="' + INK + '"/>';
      if (i === 1) s += '<path d="M 4 ' + y + ' C 14 ' + (y - 12) + " 36 " + (y - 12) + " 44 " + y + " C 36 " + (y + 10) + " 14 " + (y + 10) + " 4 " + y + ' Z" fill="#C9463A" stroke="' + INK + '" stroke-width="2.5"/>' + line("M 44 " + y + " L 54 " + (y - 8) + " M 44 " + y + " L 54 " + (y + 8) + " M 6 " + (y - 4) + " L -4 " + (y - 14) + " M 6 " + (y + 4) + " L -4 " + (y + 14), 2.5, INK);
      if (i === 2) s += paper(rEll(22, y + 2, 22, 13, 1.2, 5905), "#8C5A3C", { shadow: false, stroke: true, sw: 2.5 }) + paper(rEll(44, y - 6, 10, 9, 1, 5906), "#8C5A3C", { shadow: false, stroke: true, sw: 2.5 }) + line("M 10 " + (y + 12) + " L 10 " + (y + 20) + " M 32 " + (y + 12) + " L 32 " + (y + 20), 3, INK);
    });
    s += '<g id="' + id + '-tich">' + line("M -40 -42 L -31 -32 L -14 -58 M -40 8 L -31 18 L -14 -8", 5, "#2F6A4A") + "</g>";
    s += '<g id="' + id + '-x">' + line("M -46 42 L -12 74 M -12 42 L -46 74", 6, "#C23B2A") + "</g>";
    return s + "</g>";
  }
  /* Bẫy tôm hùm: lồng nan gỗ vòm có dây. Gốc: giữa đáy. ~110 × 70. */
  function bayTom(id) {
    var s = '<g id="' + id + '">';
    s += paper("M -56 0 L -56 -36 C -50 -76 50 -76 56 -36 L 56 0 Z", "#8A6A48", { stroke: true, sw: 4, sx: 4, sy: 5 });
    for (var i = -40; i <= 40; i += 16) s += line("M " + i + " 0 L " + i + " " + f1(-46 - 16 * (1 - Math.abs(i) / 56)), 3, "#5E4630");
    s += line("M -56 -24 L 56 -24", 3, "#5E4630") + '<rect x="-60" y="-6" width="120" height="10" fill="#5E4630" stroke="' + INK + '" stroke-width="3"/>';
    s += line("M 0 -66 L 0 -96", 3, "#B89A5E");
    return s + "</g>";
  }
  /* Tời quay tay: trống cuốn dây trên giá, tay quay xoay (id-tay, gốc trục). Gốc: chân giá. */
  function toi(id) {
    var s = '<g id="' + id + '">';
    s += paper("M -50 0 L -30 -90 L 30 -90 L 50 0 Z", "#5E6A6E", { stroke: true, sw: 4 });
    s += paper(rEll(0, -96, 40, 40, 1.5, 5911), "#7A8A8E", { stroke: true, sw: 4 });
    s += '<circle cx="0" cy="-96" r="26" fill="#B89A5E" stroke="' + INK + '" stroke-width="3"/>' + line("M -24 -104 C -10 -98 10 -98 24 -104 M -24 -90 C -10 -84 10 -84 24 -90", 2, "#8A6A3A");
    s += '<g transform="translate(0,-96)"><g id="' + id + '-tay">' + line("M 0 0 L 0 -60", 8, INK) + line("M 0 -60 L 22 -60", 10, "#8A5A33") + '<circle cx="0" cy="0" r="8" fill="' + INK + '"/></g></g>';
    return s + "</g>";
  }
  /* Cuộn dây thừng sợi gai vàng nâu #B89A5E. Gốc: tâm. r ~ 50. */
  function cuonDay(id, r) {
    r = r || 50;
    var s = '<g id="' + id + '">';
    s += paper(rEll(0, 0, r, r * 0.72, 1.5, 5921), "#B89A5E", { stroke: true, sw: 4, sx: 3, sy: 4 });
    for (var i = 1; i < 4; i++) s += '<ellipse cx="0" cy="' + f1(-i * 2) + '" rx="' + f1(r * (1 - i * 0.2)) + '" ry="' + f1(r * 0.72 * (1 - i * 0.2)) + '" fill="none" stroke="#8A6A3A" stroke-width="3"/>';
    s += '<ellipse cx="0" cy="-6" rx="' + f1(r * 0.24) + '" ry="' + f1(r * 0.16) + '" fill="#6E5430"/>';
    s += line("M " + f1(r * 0.8) + " " + f1(r * 0.3) + " C " + f1(r * 1.2) + " " + f1(r * 0.6) + " " + f1(r * 1.1) + " " + f1(r * 1.0) + " " + f1(r * 0.9) + " " + f1(r * 1.2), 6, "#B89A5E") + line("M " + f1(r * 0.8) + " " + f1(r * 0.3) + " C " + f1(r * 1.2) + " " + f1(r * 0.6) + " " + f1(r * 1.1) + " " + f1(r * 1.0) + " " + f1(r * 0.9) + " " + f1(r * 1.2), 1.5, INK, ' opacity="0.6"');
    return s + "</g>";
  }

  /* hiện nhóm sel trong [t0, t1) (cắt cứng) */
  function hien(api, sel, t0, t1) {
    api.key(sel, "opacity", 0, t0 <= 0 ? 1 : 0, "step");
    if (t0 > 0) api.key(sel, "opacity", t0, 1, "step");
    if (t1 != null && t1 < api.DUR) api.key(sel, "opacity", t1, 0, "step");
  }
  return { hien: hien, bangKep: bangKep, bayTom: bayTom, toi: toi, cuonDay: cuonDay, CAM: CAM, CAM_D: CAM_D, OLIU: OLIU, THAM: THAM, KEM: KEM, MUC: MUC, GO: GO, GO_D: GO_D, GO_L: GO_L,
    at: at, g: g, sc: sc, wob: wob, scrib: scrib, perfo: perfo, temMuc: temMuc, buuThiep: buuThiep, tuiThu: tuiThu, buuDien: buuDien,
    bo: bo, tuongDa: tuongDa, nhaThap: nhaThap, nuiLua: nuiLua, bienSong: bienSong, nguoi: nguoi, trangLS: trangLS, banSo: banSo, tau: tau };
})();
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, DUR = api.DUR, INK = D.INK;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0, 0); return v == null || v > DUR ? du : v; };
  var cx = data.chu_tren_do_vat;      // ["POST OFFICE", "TRISTAN DA CUNHA"]
  var tSo = T("So,", 0, 0.85), tCard = T("postcard.", 0, 1.4), tWrote = T("wrote", 0, 2.55), tPost = T("post", 0, 3.06), tCounter = T("counter,", 0, 3.77);
  var tDay = T("day", 0, 4.59), tLeft = T("left,", 0, 5.51), tAnd = T("and", 5.8, 6.16), tRead = T("read", 0, 6.59), tSince = T("since.", 0, 6.81);
  var tXoay0 = 639.0 - data.bat_dau_tuyet_doi, tXoay1 = 639.924 - data.bat_dau_tuyet_doi;   // khoảnh riêng xoay bưu thiếp viết dọc lề

  var BD = TB.buuDien({ chu: cx[0] });
  var MQ = BD.vt.mat, SAN = BD.vt.san;
  var XW = 1110, YW = SAN, SW = 0.7;
  function BUT(id, goc) { return '<g id="' + id + '" transform="rotate(' + goc + ')">' + D.line("M 0 0 L 0 62", 9, INK) + D.line("M 0 4 L 0 56", 5, "#2F4A6B") + D.line("M 0 62 L 0 70", 3, INK) + "</g>"; }
  var W = TB.wob(api, "W", { mu: "ha", holdR: BUT("butR", 200),
    holdL: BUT("butL", -12) + '<g id="thTay" transform="translate(4,-14) rotate(-10)">' + TB.buuThiep("thC", { mat: "viet", w: 150, h: 100, seed: 4790 }) + "</g>" });
  // tư thế viết: tay phải giơ lên trái, bút chạm bưu thiếp (đặt khoá trước để đo vị trí bàn tay, rồi đặt bưu thiếp đúng chỗ bút)
  var VIET = { aLu: 140, aLf: 20 };
  var tV0 = tWrote - 0.15, tV1 = tXoay0 - 0.1;
  W.set(0, { x: XW, y: YW, size: SW, op: 1, aRu: -30, aRf: 20, aLu: 40, aLf: 60 });
  W.pose(tV0 - 0.25, 0.25, { aLu: VIET.aLu, aLf: VIET.aLf, sy: 1.06, upY: -4, pupX: -10, pupY: -12 }, "power2.out");
  var H = W.hand("L", tV0 + 0.01);
  var TX = Math.round(H.x - 70), TY = Math.round(Math.min(H.y - 30, MQ - 30));
  // bưu thiếp trên mặt nghiêng: mặt viết ngửa, chữ hiện dần (id thV-v0..v7, thV-l0..l1)
  var the = '<g id="thQ" transform="translate(' + TX + "," + TY + ')"><g id="thQr"><g id="thQs" transform="scale(1,0.62)">' + TB.buuThiep("thV", { mat: "viet", w: 200, h: 134, seed: 4710, vietId: true }) + "</g></g></g>";
  var tuiS = BD.tui.replace('<g id="tui">', '<g id="tui"><g id="tuiS">').replace(/<\/g>$/, "</g></g>");
  // bưu thiếp thả vào túi: bản sao nhỏ bay tới miệng túi (vẽ trước túi để chui vào trong)
  var bay = '<g id="thBay">' + TB.buuThiep("thD", { mat: "viet", w: 150, h: 100, seed: 4790 }) + "</g>";
  var gBD = '<g id="sBD">' + BD.tuong + BD.quay + BD.ngan + the + bay + tuiS + W.svg + "</g>";

  api.dat(D.defsNhietDoi() + api.lop("giua", gBD, 1, { mat: SAN }) + api.lop("gan", BD.gan, 1.4, { mat: 1080 }));
  api.noi({ vaoDai: 0.5 });

  // ---------- camera: đẩy chậm vào bưu thiếp, lùi nhẹ khi thả túi ----------
  api.camera([
    [0, 980, 604, 1.22], [tCard, 990, 606, 1.24, "sine.inOut"], [tWrote - 0.1, 1000, 700, 1.42, "power2.inOut"],
    [tXoay0, TX, TY + 40, 2.05, "sine.inOut"], [tXoay1, TX - 10, TY + 44, 2.2, "sine.inOut"],
    [tXoay1 + 0.5, TX - 120, TY + 90, 1.75, "power2.inOut"], [DUR, TX - 130, TY + 92, 1.8, "sine.inOut"]
  ]);

  // ---------- đặt bưu thiếp (mặt viết còn trắng) bằng tay trái, rồi chuyển bút sang tay trái ----------
  var tDat = tSo + 0.25;
  W.mouth(0, "X");
  api.show("#butL", 0, 0); api.show("#butR", 0, 1);
  W.nhonChan(0.25, tDat + 0.3 - 0.25, { lean: -4, nhin: [-10, -12] });
  W.pose(0.3, 0.3, { aLu: 150, aLf: 10 }, "back.out(1.4)");
  api.show("#thTay", 0, 1); api.show("#thTay", tDat, 0);
  api.key("#thQ", "opacity", 0, 0, "step"); api.key("#thQ", "opacity", tDat, 1, "step");
  api.sfx("lat-giay", tDat + 0.15, 0.5);
  var tDoi = tCard + 0.1;
  W.pose(tDat + 0.2, 0.3, { aLu: -30, aLf: -60, pupX: -4, pupY: 6 }, "power2.inOut");
  W.pose(tDoi - 0.25, 0.25, { aRu: 30, aRf: 60 }, "power2.out");
  api.show("#butR", tDoi, 0); api.show("#butL", tDoi, 1);
  W.pose(tDoi + 0.1, 0.25, { aRu: -18, aRf: 10 }, "power2.out");
  W.mouth(tDoi, "smirk");
  W.pose(tDoi + 0.3, 0.3, { pupX: -10, pupY: -12 }, "power2.out");

  // ---------- viết kín mặt bưu thiếp ----------
  for (var tw = tV0, k = 0; tw < tV1; tw += 0.16, k++) W.pose(tw, 0.16, { aLf: VIET.aLf + (k % 2 ? 10 : -6), aLu: VIET.aLu + (k % 4 < 2 ? -2 : 3) }, "sine.inOut");
  W.mouth(tV0, "thang");
  // ngước nhìn qua ô cửa sổ ra núi lửa, rồi cắm cúi viết tiếp
  W.pose(tCounter - 0.1, 0.2, { pupX: -14, pupY: -16, upRot: -4 }, "power2.out");
  W.pose(tCounter + 0.5, 0.2, { pupX: -10, pupY: -12, upRot: 0 }, "power2.out");
  W.mouth(tCounter, "X"); W.mouth(tCounter + 0.5, "thang");
  W.blinkAt(tPost + 0.2);
  // chữ hiện dần theo từng dòng (vẽ bằng nét, không chữ đọc được)
  var NL = 8, per = (tV1 - tV0) / NL;
  function hienNet(sel, t0, t1) {
    var el = null, L = 0;
    api.moiKhung(function (t) {
      if (!el) { el = window.document.querySelector(sel); if (el) { L = el.getTotalLength() + 2; el.setAttribute("stroke-dasharray", L.toFixed(1)); } }
      if (!el) return;
      var u = Math.max(0, Math.min(1, (t - t0) / (t1 - t0)));
      el.setAttribute("stroke-dashoffset", (L * (1 - u)).toFixed(1));
    });
  }
  for (var i = 0; i < NL; i++) hienNet("#thV-v" + i, tV0 + i * per, tV0 + (i + 0.92) * per);
  // xoay bưu thiếp 90 độ, viết tiếp dọc lề (639,00–639,92 s)
  api.origin("#thQr", "0 0");
  api.key("#thQr", "rotation", 0, 0, "step"); api.key("#thQr", "rotation", tXoay0, 0, "none"); api.key("#thQr", "rotation", tXoay0 + 0.22, 90, "power2.inOut");
  W.pose(tXoay0, 0.2, { aLf: 40, pupX: -6, pupY: -10 }, "power2.out");
  hienNet("#thV-l0 path", tXoay0 + 0.25, tXoay0 + 0.58);
  hienNet("#thV-l1 path", tXoay0 + 0.58, tXoay1 - 0.04);
  for (var tm = tXoay0 + 0.25; tm < tXoay1 - 0.05; tm += 0.12) W.pose(tm, 0.12, { aLf: (Math.round((tm - tXoay0) / 0.12) % 2) ? 48 : 34 }, "sine.inOut");

  // ---------- nhắm mắt, thả vào túi thư không đọc lại, vỗ túi ----------
  var TUI = BD.vt.tui;
  var tNham = tXoay1 + 0.02, tCam = tNham + 0.12, tTha = tSince - 0.02;
  W.pose(tNham, 0.18, { lid: 62 }, "power2.inOut");
  W.mouth(tNham, "thang");
  api.show("#thQ", tCam, 0);
  W.pose(tCam - 0.05, 0.15, { aLu: 60, aLf: 40, sy: 1, upY: 0 }, "power2.out");
  api.show("#butL", tCam, 0);
  W.walk(tCam, tCam + 0.36, XW, TUI[0] + 150, { step: 0.18, arms: false });
  W.pose(tCam + 0.3, 0.2, { aLu: 128, aLf: 20 }, "power2.out");
  var HL = W.hand("L", tTha);
  api.key("#thBay", "opacity", 0, 0, "step"); api.key("#thBay", "opacity", tCam, 1, "step");
  api.origin("#thBay", "0 0");
  api.key("#thBay", "x", 0, TX, "step"); api.key("#thBay", "y", 0, TY, "step"); api.key("#thBay", "scale", 0, 0.9, "step");
  api.key("#thBay", "rotation", 0, 90, "step");
  api.key("#thBay", "x", tTha - 0.2, HL.x, "power2.inOut"); api.key("#thBay", "y", tTha - 0.2, Math.min(HL.y, TUI[1] - 60), "power2.inOut");
  api.key("#thBay", "rotation", tTha - 0.2, 4, "power2.inOut"); api.key("#thBay", "scale", tTha - 0.2, 0.62, "power2.inOut");
  api.key("#thBay", "x", tTha, TUI[0], "power2.inOut"); api.key("#thBay", "y", tTha, TUI[1] - 50, "power2.inOut");
  api.key("#thBay", "y", tTha + 0.16, TUI[1] + 70, "power2.in");
  api.show("#thBay", tTha + 0.18, 0);
  api.sfx("drop", tTha + 0.12, 0.6);
  // túi đung đưa khi nhận thư, Wob vỗ nhẹ
  api.origin("#tuiS", "0 0");
  var tVo = tTha + 0.35;
  W.pose(tTha + 0.1, 0.2, { aLu: 100, aLf: 40 }, "power2.out");
  W.pose(tVo - 0.1, 0.1, { aLu: 80, aLf: 20 }, "power2.in"); W.pose(tVo, 0.12, { aLu: 96, aLf: 40 }, "power2.out");
  api.key("#tuiS", "rotation", 0, 0, "step");
  api.key("#tuiS", "rotation", tTha + 0.14, 0, "none"); api.key("#tuiS", "rotation", tTha + 0.3, -4, "sine.out");
  api.key("#tuiS", "rotation", tVo + 0.05, 3, "sine.inOut"); api.key("#tuiS", "rotation", tVo + 0.35, -1.5, "sine.inOut"); api.key("#tuiS", "rotation", tVo + 0.65, 0, "sine.inOut");
  W.pose(tVo + 0.15, 0.3, { lid: 18 }, "sine.inOut");
  W.mouth(tVo + 0.2, "X");
  W.breathe(tVo, DUR);
};
