/* Phông nền dựng sẵn cho phong cách cắt giấy – World Wobble (16/11/2026).
   Mỗi hàm nhận `api` (để đăng ký khói, sương trôi) và tham số; trả về chuỗi SVG theo lớp để canh.js ghép bằng api.lop().
   Cùng tham số (seed, vị trí) thì ra cùng phông: hai đoạn "cùng con phố" chỉ cần gọi cùng cấu hình, khác vùng camera. */
(function (G) {
  "use strict";
  var D = G.DaoCu;

  /* Phố làng tuyết mùa đông (nhà gỗ thấp, khói thẳng đứng, sương băng). Toạ độ lớp giữa: mặt đường y = o.mat (872).
     o: {
       seed: 400, tu: -1400, den: 6600 (bề ngang thế giới, px ở lớp giữa),
       nha: [[x, rộng, cao, màu?]]           nhà nền lớp giữa (mỗi nhà một cột khói),
       nhaXa: [[x, y]]                       nhà nhỏ ở lớp xa (mỗi nhà một cột khói),
       thong: [[x, y, cao]], rao: [[x, rộng]], cot: [x…] (cột điện, dây nối cột kế), cui: [[x, rộng]] (đống củi),
       suong: số dải sương trôi (6), khoi: { cao, toc } cho cột khói lớp giữa
     }
     Trả { troi, xa, giua, gan }: troi đặt tĩnh (ngoài camera); xa, giua, gan bọc bằng api.lop(…, 0.35 / 1 / 1.4). */
  function langTuyet(api, o) {
    o = o || {};
    var C = D.C, INK = D.INK, paper = D.paper, rough = D.rough, line = D.line, at = api.at, g = api.g;
    var seed = o.seed || 400, X0 = o.tu == null ? -1400 : o.tu, X1 = o.den == null ? 6600 : o.den, MAT = o.mat || 872, DUR = api.DUR;
    var pre = o.ten || "lt";
    var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#skyCold)"/>';

    // ---- lớp xa ----
    var far = "";
    var fx0 = X0 * 0.35 - 900, fx1 = X1 * 0.35 + 1500;
    far += '<circle cx="' + (o.matTroi ? o.matTroi[0] : 1300) + '" cy="' + (o.matTroi ? o.matTroi[1] : 250) + '" r="74" fill="#FFF4D6" stroke="' + INK + '" stroke-width="3" stroke-opacity="0.35"/>';
    far += '<circle cx="' + (o.matTroi ? o.matTroi[0] : 1300) + '" cy="' + (o.matTroi ? o.matTroi[1] : 250) + '" r="122" fill="#FFF4D6" opacity="0.25"/>';
    var h1 = [[fx0, 1500], [fx0, 600]], h2 = [[fx0, 1500], [fx0, 690]];
    for (var x = fx0; x <= fx1; x += 160) { h1.push([x, 560 + 46 * Math.sin(x / 410) + 20 * Math.sin(x / 130)]); h2.push([x, 670 + 30 * Math.sin(x / 300 + 1) + 12 * Math.sin(x / 90)]); }
    h1.push([fx1, 1500]); h2.push([fx1, 1500]);
    far += paper(rough(h1, 3, seed + 1, 30), "#C9DCE5", { shadow: false, stroke: true, sw: 3 });
    for (var t = 0, tx = fx0 + 200; tx < fx1; t++, tx += 170 + (t % 3) * 40) far += at(tx, 600 + (t % 4) * 22, '<g transform="scale(' + (0.5 + (t % 3) * 0.12) + ')">' + D.larch(150 + (t % 5) * 20, seed + 10 + t) + "</g>");
    far += paper(rough(h2, 3, seed + 2, 30), "#E8F0F2", { shadow: false, stroke: true, sw: 3 });
    (o.nhaXa || [[-300, 760], [420, 772], [980, 754], [1700, 768], [2350, 760], [2900, 774]]).forEach(function (h, i) {
      far += at(h[0], h[1], '<g transform="scale(0.36)">' + D.logHouse({ w: 300, h: 170, seed: seed + 20 + i }) + "</g>");
      var c = D.chimneyOf({ w: 300, h: 170 });
      far += api.khoi(pre + "-kx" + i, h[0] + c[0] * 0.36, h[1] + c[1] * 0.36 - 2, { cao: 300, rong: 6, uon: 6, toc: 0.22, mo: 0.75 });
    });
    far += '<rect x="' + fx0 + '" y="700" width="' + (fx1 - fx0) + '" height="800" fill="#ffffff" opacity="0.28"/>';

    // ---- lớp giữa (nền): đất tuyết, vệt bánh xe, nhà nền + khói, thông, rào, cột điện ----
    var mid = "";
    mid += paper(rough([[X0, MAT], [X1, MAT - 4], [X1, MAT + 1700], [X0, MAT + 1700]], 3, seed + 30, 30), C.snow, { shadow: false });
    mid += '<path d="M ' + X0 + " " + (MAT + 33) + " L " + X1 + " " + (MAT + 28) + " L " + X1 + " " + (MAT + 128) + " L " + X0 + " " + (MAT + 132) + ' Z" fill="#E1ECF1"/>';
    mid += line("M " + X0 + " " + (MAT + 58) + " L " + X1 + " " + (MAT + 54) + " M " + X0 + " " + (MAT + 100) + " L " + X1 + " " + (MAT + 96), 4, "#C3D6DF");
    mid += '<rect x="' + X0 + '" y="' + (MAT + 132) + '" width="' + (X1 - X0) + '" height="1600" fill="url(#halfW)" opacity="0.35"/>';
    var kc = o.khoi || {};
    (o.nha || []).forEach(function (h, i) {
      var spec = { w: h[1], h: h[2], seed: seed + 40 + i, tone: h[3] || "#8B6446" };
      mid += at(h[0], MAT, D.logHouse(spec));
      var c = D.chimneyOf(spec);
      mid += api.khoi(pre + "-km" + i, h[0] + c[0], MAT + c[1] - 4, { cao: kc.cao || 340, rong: Math.max(15, h[1] * 0.05), uon: 16, toc: kc.toc || 0.3 });
    });
    mid += '<rect x="' + X0 + '" y="200" width="' + (X1 - X0) + '" height="' + (MAT - 182) + '" fill="#ffffff" opacity="0.30"/>';
    var nf = o.suong == null ? 6 : o.suong;
    for (var w = 0; w < nf; w++) {
      var fxw = X0 + 1200 + w * ((X1 - X0 - 1600) / Math.max(1, nf - 1)), id = pre + "-fog" + w;
      mid += at(Math.round(fxw), MAT - 112 + (w % 2) * 50, g(id, '<ellipse cx="0" cy="0" rx="420" ry="60" fill="url(#fogG)"/>'));
      api.origin("#" + id, "0 0");
      api.key("#" + id, "x", 0, 0, "none"); api.key("#" + id, "x", DUR, (w % 2 ? -1 : 1) * 160 * DUR / 40, "sine.inOut");
    }
    (o.thong || []).forEach(function (th, i) { mid += at(th[0], th[1], D.larch(th[2], seed + 50 + i)); });
    (o.cot || []).forEach(function (cx, i, arr) { mid += at(cx, MAT + 6, D.pole(420, arr[i + 1] != null ? arr[i + 1] - cx : 0, seed + 60 + i)); });
    (o.rao || []).forEach(function (r, i) { mid += at(r[0], MAT + 2, D.fence(r[1], seed + 70 + i * 3)); });
    (o.cui || []).forEach(function (c, i) { mid += at(c[0], MAT + 8, D.woodpile(c[1], seed + 80 + i)); });

    // ---- lớp gần: ụ tuyết trôi nhanh ----
    var near = "";
    var nx0 = X0 * 1.4 - 600, nx1 = X1 * 1.4 + 600;
    for (var b = 0, bx = nx0; bx < nx1; b++, bx += 760) {
      near += paper(rough([[bx, 1300], [bx + 30, 1060], [bx + 160, 1010], [bx + 330, 1030], [bx + 460, 1080], [bx + 500, 1300]], 4, seed + 90 + b, 22), C.snow, { stroke: true, sw: 5, fringe: C.ice, sy: -8 });
      near += line("M " + (bx + 120) + " 1050 C " + (bx + 200) + " 1040 " + (bx + 280) + " 1046 " + (bx + 360) + " 1060", 3, C.iceDeep, ' opacity="0.6"');
    }
    return { troi: troi, xa: far, giua: mid, gan: near };
  }

  /* Nhà gỗ chính có cửa sổ khoét (thấy được nhân vật bên trong) và cửa ra vào mở được.
     o: { id: "nc", x, y (góc trên trái mặt tiền), w: 760, h: 400, cuaSo: [dx, dy, w, h], cua: [dx, dy, w, h],
          trong: SVG đặt trong nhà (vd Wob, toạ độ lớp), khoi: { cao, toc } | false }
     Nhóm "#<id>-door" là cánh cửa: mở bằng api.key(sel, "scaleX", t, 0.14) (bản lề trái, origin đặt sẵn).
     Trả về chuỗi SVG; ống khói tự có cột khói thủ tục. */
  function nhaCua(api, o) {
    o = o || {};
    var C = D.C, INK = D.INK, paper = D.paper, rough = D.rough, line = D.line, rRect = D.rRect, rEll = D.rEll;
    var id = o.id || "nc", x0 = o.x, y0 = o.y, w = o.w || 760, h = o.h || 400, ys = y0 + h, sd = o.seed || 470;
    var cs = o.cuaSo || [50, 80, 180, 160], cu = o.cua || [280, 120, 200, h - 120];
    var wx = x0 + cs[0], wy = y0 + cs[1], ww = cs[2], wh = cs[3], dx = x0 + cu[0], dy = y0 + cu[1], dw = cu[2], dh = cu[3];
    var s = "";
    s += '<rect x="' + (x0 + 20) + '" y="' + y0 + '" width="' + (w - 40) + '" height="' + h + '" fill="#3B2A1F"/>';
    s += '<ellipse cx="' + (wx + ww * 0.5) + '" cy="' + (wy + wh * 0.6) + '" rx="' + (ww * 0.7) + '" ry="' + (wh * 0.6) + '" fill="#FFB86A" opacity="0.35"/>';
    s += '<clipPath id="' + id + '-in"><rect x="' + (x0 + 20) + '" y="' + y0 + '" width="' + (w - 40) + '" height="' + h + '"/></clipPath>';
    s += '<g clip-path="url(#' + id + '-in)">' + (o.trong || "") + "</g>";
    var facade = "M " + x0 + " " + y0 + " L " + (x0 + w) + " " + y0 + " L " + (x0 + w) + " " + ys + " L " + x0 + " " + ys + " Z " +
      "M " + wx + " " + wy + " L " + wx + " " + (wy + wh) + " L " + (wx + ww) + " " + (wy + wh) + " L " + (wx + ww) + " " + wy + " Z " +
      "M " + dx + " " + dy + " L " + dx + " " + (dy + dh) + " L " + (dx + dw) + " " + (dy + dh) + " L " + (dx + dw) + " " + dy + " Z";
    s += '<clipPath id="' + id + '-fc"><path d="' + facade + '" clip-rule="evenodd"/></clipPath>';
    s += '<path d="' + facade + '" fill="#0b1214" opacity="0.22" fill-rule="evenodd" transform="translate(7,9)"/>';
    s += '<path d="' + facade + '" fill="' + (o.mau || C.wood) + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>';
    var logs = "";
    for (var ly = y0 + 24; ly < ys; ly += 26) logs += line("M " + (x0 + 6) + " " + ly + " C " + (x0 + w * 0.3) + " " + (ly + 3) + " " + (x0 + w * 0.7) + " " + (ly - 2) + " " + (x0 + w - 6) + " " + (ly + 1), 3.5, "#3A2618", ' opacity="0.55"');
    logs += '<rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + h + '" fill="url(#half)" opacity="0.15"/>';
    s += '<g clip-path="url(#' + id + '-fc)">' + logs + "</g>";
    s += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" fill="#ffffff" opacity="0.14"/>';
    s += line("M " + (wx + 20) + " " + (wy + wh - 20) + " L " + (wx + 80) + " " + (wy + 20) + " M " + (wx + 50) + " " + (wy + wh - 8) + " L " + (wx + 110) + " " + (wy + 32), 5, "#ffffff", ' opacity="0.42"');
    s += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" fill="none" stroke="' + INK + '" stroke-width="10"/>' +
      line("M " + (wx + ww / 2) + " " + wy + " L " + (wx + ww / 2) + " " + (wy + wh) + " M " + wx + " " + (wy + wh / 2) + " L " + (wx + ww) + " " + (wy + wh / 2), 7);
    s += paper(rRect(wx - 12, wy + wh - 2, ww + 24, 18, 1.5, sd), C.snow, { stroke: true, sw: 4, sx: 3, sy: 4 });
    s += '<g id="' + id + '-door">' + paper(rRect(dx, dy, dw, dh, 1.5, sd + 1), "#5E3D27", { stroke: true, sw: 5, sx: 4, sy: 4 }) +
      line("M " + (dx + dw * 0.25) + " " + (dy + 12) + " L " + (dx + dw * 0.25) + " " + (dy + dh - 10) + " M " + (dx + dw * 0.5) + " " + (dy + 12) + " L " + (dx + dw * 0.5) + " " + (dy + dh - 10) + " M " + (dx + dw * 0.75) + " " + (dy + 12) + " L " + (dx + dw * 0.75) + " " + (dy + dh - 10), 3, "#2E1D12", ' opacity="0.6"') +
      '<circle cx="' + (dx + dw - 22) + '" cy="' + (dy + dh * 0.54) + '" r="9" fill="#E8C66A" stroke="' + INK + '" stroke-width="3"/></g>';
    api.origin("#" + id + "-door", dx + " " + (dy + dh / 2));
    s += '<rect x="' + (dx - 4) + '" y="' + (dy - 4) + '" width="' + (dw + 8) + '" height="' + (dh + 8) + '" fill="none" stroke="' + INK + '" stroke-width="7"/>';
    s += paper(rough([[x0 - 40, y0 - 2], [x0 + w / 2, y0 - 208], [x0 + w + 40, y0 - 2], [x0 + w + 40, y0 + 17], [x0 - 40, y0 + 17]], 3, sd + 2, 22), C.snow, { stroke: true, sw: 5, fringe: C.ice, sy: 10 });
    var chx = x0 + w * 0.763, chy = y0 - 180;
    s += paper(rRect(chx, chy, 54, 120, 1.5, sd + 3), "#5A4636", { stroke: true, sw: 4 }) + paper(rEll(chx + 27, chy, 34, 12, 1.5, sd + 4), C.snow, { stroke: true, sw: 3, shadow: false });
    if (o.khoi !== false) s += api.khoi(id + "-khoi", chx + 27, chy - 6, { cao: (o.khoi && o.khoi.cao) || 420, rong: 26, uon: 20, toc: (o.khoi && o.khoi.toc) || 0.3 });
    s += paper(rough([[x0 - 50, ys + 4], [x0 + 20, ys - 34], [dx, ys - 18], [dx, ys + 4]], 3, sd + 5, 18), C.snow, { stroke: true, sw: 4, shadow: false });
    s += paper(rough([[dx + dw, ys + 6], [dx + dw + 40, ys - 4], [x0 + w, ys - 6], [x0 + w + 70, ys + 6]], 3, sd + 6, 18), C.snow, { stroke: true, sw: 4, shadow: false });
    return s;
  }

  G.CanhNen = { langTuyet: langTuyet, nhaCua: nhaCua };
})(typeof window !== "undefined" ? window : globalThis);
