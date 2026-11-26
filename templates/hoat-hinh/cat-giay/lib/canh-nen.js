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

/* ================= Bộ đảo nhiệt đới (thêm 26/11/2026, tập 4 Santa Cruz del Islote, nhóm cat-giay A) =================
   window.NhietDoi: trang phục chuyến đi (mũ cói, ba lô khổng lồ, bình xịt muỗi), Wob đội mũ cói đeo ba lô khổng lồ,
   thuyền gỗ máy ngoài, biển giấy xanh ngọc có sóng, nhà một tầng tường màu mái tôn, đảo kín nhà nhìn từ biển / từ trên cao,
   đảo xanh có bãi, đảo đước, đảo đá trơ trụi, sân bóng, ghế nhựa, mèo, dây phơi, thánh giá, người giấy chung (không mặt chi tiết),
   đồng hồ tay không số, vợt bắt muỗi, vỏ sò, thẻ chữ, biển dấu hỏi, trăng sao, mây bão.
   Khối riêng, không đổi hàm cũ. Mỗi hàm nhận tham số, không cứng chữ của tập (chữ truyền vào). Gốc toạ độ ghi ở từng hàm.
   canh.js phải chèn NhietDoi.defs() một lần trong api.dat(...) (mẫu đan cói, trời nhiệt đới). */
(function (G) {
  "use strict";
  var D = G.DaoCu, INK = D.INK, paper = D.paper, rRect = D.rRect, rEll = D.rEll, rough = D.rough, line = D.line, f1 = D.f1, rng = D.rng;
  var M = {
    coi: "#DDBF7A", coiDan: "#B08A48", dai: "#2A9D8F",
    oliu: "#7C8646", oliuToi: "#566030", oliuSang: "#8E9852", tham: "#D9543C", thamToi: "#A8352B",
    kem: "#F3EBD8", nap: "#2A9D8F", tem: "#C9463A",
    bien: "#36A9A6", bienSau: "#24878C", bienNhat: "#74CEC4", bot: "#EAF7F2",
    mai: "#B3BCC0", maiToi: "#8A969B", nen: "#DAD3C3", cat: "#EEDDB0",
    tuong: ["#5FA8D3", "#F2CB57", "#EE9AAE", "#86CFB0", "#F3EFE4", "#F2A65A", "#9FB6E8"],
    la: "#4E8A4E", laToi: "#2F5E3A", duoc: "#2E5A3E"
  };
  function pick(arr, r) { return arr[Math.floor(r() * arr.length) % arr.length]; }

  function defs() {
    return "<defs>" +
      '<pattern id="ndDan" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M 0 6 L 12 6 M 6 0 L 6 12" stroke="#B08A48" stroke-width="2.2"/></pattern>' +
      '<linearGradient id="ndTroi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86C6DE"/><stop offset="0.55" stop-color="#C6E6EA"/><stop offset="1" stop-color="#F4F1E2"/></linearGradient>' +
      '<linearGradient id="ndTroiDem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#142339"/><stop offset="0.6" stop-color="#253D5E"/><stop offset="1" stop-color="#3E5877"/></linearGradient>' +
      '<linearGradient id="ndTroiSang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CC9E0"/><stop offset="0.6" stop-color="#F2DDC0"/><stop offset="1" stop-color="#F7E6C8"/></linearGradient>' +
      '<linearGradient id="ndTroiCu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D8D6"/><stop offset="1" stop-color="#EFE6CF"/></linearGradient>' +
      '<linearGradient id="ndBien" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FC2BB"/><stop offset="1" stop-color="#22858A"/></linearGradient>' +
      '<linearGradient id="ndBienDem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C4A5E"/><stop offset="1" stop-color="#16283A"/></linearGradient>' +
      '<radialGradient id="ndDen" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFD68A" stop-opacity="0.75"/><stop offset="1" stop-color="#FFB86A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="ndTrang" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFF6D8" stop-opacity="0.6"/><stop offset="1" stop-color="#FFF6D8" stop-opacity="0"/></radialGradient>' +
      "</defs>";
  }

  /* ---------- trang phục ---------- */
  /* Mũ cói rộng vành (dáng mũ rộng vành của prelude Coober Pedy, màu tập 4): vành rơm #DDBF7A đan chéo #B08A48, dải xanh ngọc.
     Toạ độ gốc Wob 400×400 (đội trên đỉnh, không che mắt). */
  function muCoiInner(sd) {
    sd = sd || 611;
    var vanh = rEll(200, 96, 174, 26, 1.5, sd), chop = "M 118 96 C 114 52 142 14 200 14 C 258 14 286 52 282 96 Z";
    var s = '<path d="' + vanh + '" fill="#0b1214" opacity="0.18" transform="translate(5,7)"/>';
    s += '<path d="' + vanh + '" fill="' + M.coi + '" stroke="' + INK + '" stroke-width="6"/>';
    s += '<path d="' + vanh + '" fill="url(#ndDan)" opacity="0.75"/>';
    s += line("M 40 100 C 110 116 290 116 360 100", 3, M.coiDan, ' opacity="0.8"');
    s += '<path d="' + chop + '" fill="' + M.coi + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
    s += '<path d="' + chop + '" fill="url(#ndDan)" opacity="0.7"/>';
    s += '<path d="M 119 70 C 160 60 240 60 281 70 L 283 92 C 240 82 160 82 117 92 Z" fill="' + M.dai + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    s += line("M 150 34 C 168 24 186 20 204 20", 6, "#FFFFFF", ' opacity="0.4"');
    return s;
  }
  /* mũ rời (đặt cạnh gối, rơi, cầm tay). Gốc: tâm vành. s: cỡ (theo size Wob) */
  function muCoi(id, s) {
    return '<g' + (id ? ' id="' + id + '"' : "") + '><g transform="scale(' + (s || 0.7) + ') translate(-200,-96)">' + muCoiInner(612) + "</g></g>";
  }

  /* Bình xịt muỗi: trụ trắng kem, nắp xanh ngọc, nhãn hình con muỗi gạch chéo (không chữ), tem niêm phong đỏ ngang nắp (luôn nguyên).
     Gốc: giữa đáy. Cao 124, rộng 48. */
  function binhXit(id) {
    var s = '<g' + (id ? ' id="' + id + '"' : "") + ">";
    s += '<rect x="-24" y="-92" width="48" height="92" rx="8" fill="#0b1214" opacity="0.2" transform="translate(4,5)"/>';
    s += '<rect x="-24" y="-92" width="48" height="92" rx="8" fill="' + M.kem + '" stroke="' + INK + '" stroke-width="4"/>';
    s += '<path d="M -20 -92 C -20 -104 20 -104 20 -92 Z" fill="#E2D8C0" stroke="' + INK + '" stroke-width="3.5"/>';
    s += '<path d="M -19 -100 L -17 -124 L 17 -124 L 19 -100 Z" fill="' + M.nap + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    s += '<rect x="2" y="-132" width="12" height="9" rx="2" fill="#1F6E66" stroke="' + INK + '" stroke-width="2.5"/>';
    s += '<path d="M -26 -104 L 26 -96 L 26 -86 L -26 -94 Z" fill="' + M.tem + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>';
    s += '<circle cx="0" cy="-48" r="16" fill="#FFFDF6" stroke="' + M.tem + '" stroke-width="3.5"/>';
    s += line("M -6 -48 L 7 -48", 3.5) + '<ellipse cx="-1" cy="-55" rx="6" ry="3" fill="#C9DDE4" stroke="' + INK + '" stroke-width="1.5"/>' +
      line("M -3 -46 L -8 -39 M 1 -46 L 1 -38 M 5 -46 L 10 -39 M 7 -48 L 13 -51", 1.6);
    s += line("M -11 -37 L 11 -59", 3.5, M.tem);
    s += line("M -15 -82 L -15 -10", 4, "#FFFFFF", ' opacity="0.6"');
    return s + "</g>";
  }

  /* Ba lô khổng lồ ô liu, cuộn thảm đỏ trên nắp, hai túi hông (túi trái cắm bình xịt). Gốc: giữa đáy. Cao ≈ 430 (cả thảm), rộng ≈ 300.
     o: { binh: true, uot: id nhóm vết ướt (ẩn sẵn, bật bằng opacity) | true (hiện luôn), seed, giot: id tiền tố 3 giọt nước (ẩn sẵn) } */
  function baLo(id, o) {
    o = o || {};
    var sd = o.seed || 731, s = '<g' + (id ? ' id="' + id + '"' : "") + ">";
    var than = "M -134 -16 C -150 -120 -150 -262 -120 -330 C -98 -384 98 -384 120 -330 C 150 -262 150 -120 134 -16 C 120 8 -120 8 -134 -16 Z";
    s += paper(than, M.oliu, { stroke: true, sw: 7, sx: 9, sy: 12, half: 0.1 });
    s += line("M -126 -60 C -60 -44 60 -44 126 -60", 4, M.oliuToi, ' opacity="0.7"');
    // túi hông phải
    s += paper("M 136 -176 C 178 -172 180 -48 134 -40 Z", M.oliuToi, { stroke: true, sw: 5, shadow: false });
    // bình xịt cắm túi hông trái (nắp, tem, một khúc thân thò lên trên miệng túi)
    if (o.binh !== false) s += '<g transform="translate(-156,-96) rotate(-9) scale(0.92)">' + binhXit(id ? id + "-binh" : "") + "</g>";
    s += paper("M -136 -150 C -182 -146 -184 -46 -134 -40 Z", M.oliuToi, { stroke: true, sw: 5, shadow: false });
    s += line("M -170 -148 C -160 -152 -146 -152 -136 -150", 3, "#3E4620");
    // túi trước + khoá
    s += paper(rRect(-88, -168, 176, 128, 2, sd + 1), "#6C763C", { stroke: true, sw: 5, sx: 4, sy: 5 });
    s += line("M -80 -148 L 80 -148", 3, M.oliuToi, ' stroke-dasharray="8 7"');
    // nắp
    var nap = "M -126 -300 C -112 -384 112 -384 126 -300 L 120 -220 C 80 -196 -80 -196 -120 -220 Z";
    s += paper(nap, M.oliuSang, { stroke: true, sw: 6, shadow: false });
    s += line("M -112 -228 C -70 -210 70 -210 112 -228", 3, M.oliuToi, ' stroke-dasharray="9 7" opacity="0.8"');
    s += paper(rRect(-70, -226, 22, 92, 1, sd + 2), M.oliuToi, { stroke: true, sw: 3.5, shadow: false }) + paper(rRect(48, -226, 22, 92, 1, sd + 3), M.oliuToi, { stroke: true, sw: 3.5, shadow: false });
    s += '<rect x="-74" y="-146" width="30" height="18" rx="3" fill="#C9B26A" stroke="' + INK + '" stroke-width="3"/><rect x="44" y="-146" width="30" height="18" rx="3" fill="#C9B26A" stroke="' + INK + '" stroke-width="3"/>';
    // cuộn thảm đỏ buộc ngang nắp
    s += paper(rRect(-154, -436, 308, 66, 2, sd + 4), M.tham, { stroke: true, sw: 6, sx: 6, sy: 8 });
    s += '<ellipse cx="-150" cy="-403" rx="15" ry="32" fill="' + M.thamToi + '" stroke="' + INK + '" stroke-width="4"/>' + line("M -150 -420 C -140 -410 -158 -396 -148 -388", 3, INK, ' opacity="0.6"');
    s += line("M -138 -420 L 140 -420", 3, "#F0A090", ' opacity="0.7"');
    s += paper(rRect(-94, -444, 20, 82, 1, sd + 5), "#3E4620", { stroke: true, sw: 3, shadow: false }) + paper(rRect(74, -444, 20, 82, 1, sd + 6), "#3E4620", { stroke: true, sw: 3, shadow: false });
    s += line("M -96 -330 C -90 -300 -92 -260 -100 -200", 5, "#FFFFFF", ' opacity="0.22"');
    // vết ướt (bật bằng opacity của nhóm id)
    if (o.uot) {
      var r = rng(sd + 9), w = '<g' + (typeof o.uot === "string" ? ' id="' + o.uot + '" opacity="0"' : "") + ">";
      for (var k = 0; k < 7; k++) w += '<path d="' + rEll(-100 + r() * 200, -330 + r() * 300, 26 + r() * 30, 18 + r() * 22, 4, sd + 20 + k) + '" fill="#2F3818" opacity="0.32"/>';
      w += '<path d="' + rEll(0, -404, 120, 22, 4, sd + 40) + '" fill="#6E1E16" opacity="0.35"/>';
      s += w + "</g>";
    }
    if (o.giot) for (var j = 0; j < 3; j++) s += '<g transform="translate(' + (-90 + j * 80) + ',-4)"><g id="' + o.giot + j + '" opacity="0">' + D.tear(7) + "</g></g>";
    return s + "</g>";
  }

  /* Wob của tập: mũ cói (nhóm id-mu, gốc "200 96"), ba lô khổng lồ đeo lưng (id-blL, thay ba lô nhỏ mặc định: ba lô nhỏ ẩn trong id-pkNho),
     ba lô ôm trước / vắt đùi (id-blT, trong phuKien: trên thân, dưới tay; nhóm khoá id-blTk gốc tâm ba lô).
     o: như api.wob, thêm { khongMu, lung: 1|0 (lúc đầu), truoc: 1|0, uot (vết ướt: nhóm id-blLu, id-blTu ẩn sẵn),
        truocTf: transform của ba lô trước trong toạ độ Wob (mặc định ôm ngang trước bụng lệch phải), phuKien thêm (vẽ trên mũ) } */
  function wob(api, id, o) {
    o = o || {};
    var tf = o.truocTf || "translate(300,404) rotate(-90) scale(0.62)";
    var truoc = '<g id="' + id + '-blT"><g id="' + id + '-blTk"><g transform="' + tf + '">' + baLo(id + "-bt", { uot: o.uot ? id + "-blTu" : false, giot: o.uot ? id + "-gT" : false, seed: 741 }) + "</g></g></g>";
    var pk = truoc + '<g id="' + id + '-mu">' + muCoiInner() + "</g>" + (o.phuKien || "");
    var lung = '<g id="' + id + '-blL"><g transform="translate(232,300)">' + baLo(id + "-bl", { uot: o.uot ? id + "-blLu" : false, seed: 731 }) + "</g></g>";
    var oo = {};
    Object.keys(o).forEach(function (k) { oo[k] = o[k]; });
    oo.phuKien = pk; oo.packExtra = lung; delete oo.mu;
    var W = api.wob(id, oo);
    var head = '<g id="' + id + '-pack">' + lung, i = W.svg.indexOf(head);
    if (i >= 0) {
      var a = i + head.length, b = W.svg.indexOf("</g>", a);
      W.svg = W.svg.slice(0, a) + '<g id="' + id + '-pkNho" opacity="0">' + W.svg.slice(a, b) + "</g>" + W.svg.slice(b);
    }
    W.svg = W.svg.replace(/#8e5527/g, M.oliuToi);
    api.origin("#" + id + "-mu", "200 96");
    api.origin("#" + id + "-blTk", "200 300");
    api.show("#" + id + "-mu", 0, o.khongMu ? 0 : 1);
    api.show("#" + id + "-blL", 0, o.lung === 0 ? 0 : 1);
    api.show("#" + id + "-blT", 0, o.truoc ? 1 : 0);
    W.set(0, { lashes: o.lashes == null ? 0 : o.lashes, ice: 0 });   // tạo hình gốc tao_wob.py không có lông mi; không mi đóng băng ở xứ nóng
    W.nd = { mu: "#" + id + "-mu", lung: "#" + id + "-blL", truoc: "#" + id + "-blT", truocK: "#" + id + "-blTk", uotL: "#" + id + "-blLu", uotT: "#" + id + "-blTu", giotT: "#" + id + "-gT" };
    return W;
  }

  /* ---------- thuyền, biển, đảo ---------- */
  /* Thuyền gỗ nhỏ máy ngoài nhìn ngang, mũi bên phải. Gốc: giữa đáy; mạn trên ≈ y -150..-200. Dài ≈ 920.
     Trả { sau, truoc }: vẽ sau → người/đồ → truoc. o: { mau (thân, xanh dương bạc màu), vien (viền trắng), may (máy ngoài, true), seed } */
  function thuyen(id, o) {
    o = o || {};
    var mau = o.mau || "#6F9AB8", vien = o.vien || "#F4F1E8", sd = o.seed || 801;
    var sau = '<g' + (id ? ' id="' + id + '-sau"' : "") + ">";
    sau += paper("M -446 -150 C -200 -178 200 -188 466 -204 L 452 -226 C 200 -214 -200 -200 -440 -176 Z", "#5E4632", { shadow: false, stroke: true, sw: 4 });
    sau += paper(rRect(-300, -196, 150, 18, 1, sd + 1), "#9C7A55", { stroke: true, sw: 3.5, shadow: false }) + paper(rRect(40, -206, 150, 18, 1, sd + 2), "#9C7A55", { stroke: true, sw: 3.5, shadow: false });
    if (o.may !== false) {
      sau += line("M -470 -150 L -478 -20", 10, "#5A6266") + line("M -470 -150 L -478 -20", 3, INK, ' opacity="0.5"');
      sau += paper(rRect(-520, -262, 96, 96, 3, sd + 3), "#4F5A60", { stroke: true, sw: 5, sx: 5, sy: 6 });
      sau += paper(rRect(-512, -280, 80, 26, 2, sd + 4), "#E2E0DA", { stroke: true, sw: 4, shadow: false });
      sau += '<path d="M -496 -10 L -462 -30 L -460 -6 Z" fill="#3B4246" stroke="' + INK + '" stroke-width="3"/>';
    }
    sau += "</g>";
    var hull = "M -452 -152 L -430 -44 C -300 -2 150 2 304 -20 C 384 -40 444 -112 474 -206 C 200 -184 -200 -168 -452 -152 Z";
    var truoc = '<g' + (id ? ' id="' + id + '-truoc"' : "") + ">";
    truoc += paper(hull, mau, { stroke: true, sw: 6, sx: 8, sy: 10, half: 0.1 });
    truoc += line("M -440 -118 C -200 -134 200 -148 452 -168", 3, "#4D7690", ' opacity="0.7"') + line("M -436 -84 C -200 -96 200 -104 418 -120", 3, "#4D7690", ' opacity="0.7"');
    truoc += paper("M -454 -152 C -200 -170 200 -184 476 -206 L 470 -186 C 200 -164 -200 -150 -450 -134 Z", vien, { stroke: true, sw: 4, shadow: false });
    truoc += line("M -420 -60 C -260 -30 100 -24 300 -38", 4, "#3E5E74", ' opacity="0.55"');
    truoc += paper(rEll(330, -110, 30, 22, 1.5, sd + 5), "#E9806E", { shadow: false, stroke: true, sw: 3 });
    return { sau: sau + "", truoc: truoc + "</g>" };
  }

  /* Dải biển giấy xanh ngọc nhiều lớp, mép sóng; mỗi dải trôi ngang qua lại (khoá tất định) trong [0, api.DUR].
     Gốc: toạ độ thế giới. o: { x0, x1, y (mép trên dải đầu), day (khoảng cách dải, 46), n (4), bien (biên độ trôi px, 26), chuKy (s, 3.2),
       mau: [màu dải từ xa tới gần], dem: true (bảng màu đêm), cao (bề cao toàn khối, 900), bot (vệt bọt, true) } */
  function bien(api, id, o) {
    o = o || {};
    var x0 = o.x0 == null ? -1200 : o.x0, x1 = o.x1 == null ? 3200 : o.x1, y = o.y == null ? 700 : o.y, n = o.n || 4, day = o.day || 46;
    var mau = o.mau || (o.dem ? ["#3A5C70", "#2C4A5E", "#223D50", "#1A3244"] : ["#7FD2C8", "#5BBFB8", "#3FA9A6", "#2B9097"]);
    var s = '<g id="' + id + '">', amp = o.bien == null ? 26 : o.bien, per = o.chuKy || 3.2, cao = o.cao || 900, DUR = api.DUR;
    for (var i = 0; i < n; i++) {
      var yy = y + i * day, wl = 110 + i * 26, a = 6 + i * 2, d = "M " + (x0 - 120) + " " + (yy + cao);
      for (var x = x0 - 120; x <= x1 + 120; x += wl / 4) {
        var ph = Math.round((x - x0) / (wl / 4)) % 4;
        d += " L " + f1(x) + " " + f1(yy + (ph === 0 ? 0 : ph === 2 ? a : a * 0.45));
      }
      d += " L " + (x1 + 120) + " " + (yy + cao) + " Z";
      var sel = "#" + id + "-d" + i;
      s += '<g id="' + id + "-d" + i + '">' + paper(d, mau[Math.min(i, mau.length - 1)], { shadow: i > 0, shOp: 0.16, sx: 0, sy: -5 });
      if (o.bot !== false) {
        var r = rng(900 + i * 7), b = "";
        for (var bx = x0 + r() * 200; bx < x1; bx += 180 + r() * 260) b += "M " + f1(bx) + " " + f1(yy + 14 + r() * 10) + " l " + f1(30 + r() * 50) + " 0 ";
        s += '<path d="' + b + '" stroke="' + (o.dem ? "#8FB0C4" : M.bot) + '" stroke-width="4" stroke-linecap="round" opacity="0.7" fill="none"/>';
      }
      s += "</g>";
      var sg = i % 2 ? -1 : 1, p = per * (1 + i * 0.13);
      api.key(sel, "x", 0, 0);
      for (var t = p / 2, k = 0; t < DUR + p; t += p / 2, k++) api.key(sel, "x", t, (k % 2 === 0 ? sg : -sg) * amp * (0.6 + 0.1 * i) * (k === 0 ? 0.5 : 1), "sine.inOut");
    }
    return s + "</g>";
  }

  /* Nhà một tầng: tường sơn màu, mái tôn xám bạc gợn sóng, cửa, cửa sổ chớp. Gốc: giữa chân tường. Mặc định rộng 300, cao 220.
     o: { w, h, mau, seed, cua: -1..1 (vị trí cửa theo bề ngang, null = giữa trái), cuaMo (cửa mở, trong tối), cuaMau,
          so: số cửa sổ (1), tranh: "ca" | "song" | "thuyen" | false (tranh tường giấy), mai: "doc" (mái chéo một phía) | "hoi" (mái hai dốc thấp) } */
  function nha(o) {
    o = o || {};
    var w = o.w || 300, h = o.h || 220, sd = o.seed || 821, r = rng(sd), mau = o.mau || pick(M.tuong, r), s = "<g>";
    s += paper(rRect(-w / 2, -h, w, h, 1.6, sd), mau, { stroke: true, sw: 5, sx: 7, sy: 6, half: 0.07 });
    s += line("M " + f1(-w / 2 + 4) + " -16 L " + f1(w / 2 - 4) + " -16", 10, "#0b1214", ' opacity="0.08"');
    // tranh tường giấy
    if (o.tranh === "ca") {
      var fx = o.tranhX == null ? w * 0.18 : o.tranhX, fy = -h * 0.5;
      s += '<g transform="translate(' + f1(fx) + "," + f1(fy) + ') scale(' + f1(Math.min(1, w / 320)) + ')">' +
        paper("M -50 0 C -30 -30 30 -30 50 0 C 30 30 -30 30 -50 0 Z", "#F2A65A", { stroke: true, sw: 3.5, shadow: false }) +
        paper("M 44 0 L 78 -24 L 72 0 L 78 24 Z", "#E0703A", { stroke: true, sw: 3.5, shadow: false }) +
        '<circle cx="-28" cy="-5" r="6" fill="#FFFDF6" stroke="' + INK + '" stroke-width="2.5"/><circle cx="-27" cy="-5" r="2.5" fill="' + INK + '"/>' +
        line("M -6 -16 C 0 -6 0 6 -6 16 M 10 -14 C 16 -4 16 4 10 14", 3, "#B85A2A") + "</g>";
    } else if (o.tranh === "song") {
      for (var q = 0; q < 3; q++) s += line("M " + f1(-w * 0.42) + " " + f1(-h * 0.36 + q * 18) + " c 20 -14 40 14 60 0 s 40 14 60 0 s 40 14 60 0", 5, q === 1 ? "#2A9D8F" : "#5FA8D3");
    } else if (o.tranh === "thuyen") {
      var tx = o.tranhX == null ? -w * 0.22 : o.tranhX;
      s += '<g transform="translate(' + f1(tx) + "," + f1(-h * 0.42) + ')">' + paper("M -46 0 L 46 0 L 34 18 L -34 18 Z", "#C9463A", { stroke: true, sw: 3, shadow: false }) +
        line("M 0 0 L 0 -56", 3) + paper("M 2 -54 L 38 -6 L 2 -6 Z", "#FFFDF6", { stroke: true, sw: 3, shadow: false }) + line("M -60 26 c 15 -8 30 8 45 0 s 30 8 45 0 s 30 8 45 0", 3.5, "#2A9D8F") + "</g>";
    }
    // cửa
    var cx = o.cua == null ? -w * 0.22 : o.cua * w / 2, dw = Math.min(86, w * 0.3), dh = Math.min(h * 0.78, 170);
    if (o.cua !== false) {
      if (o.cuaMo) {
        s += '<rect x="' + f1(cx - dw / 2) + '" y="' + f1(-dh) + '" width="' + f1(dw) + '" height="' + f1(dh) + '" fill="#2E2A2A" stroke="' + INK + '" stroke-width="4"/>';
        s += paper("M " + f1(cx - dw / 2) + " 0 L " + f1(cx - dw / 2) + " " + f1(-dh) + " L " + f1(cx - dw / 2 - dw * 0.38) + " " + f1(-dh + 12) + " L " + f1(cx - dw / 2 - dw * 0.38) + " 6 Z", o.cuaMau || "#3F7FB8", { stroke: true, sw: 3.5, shadow: false });
      } else {
        s += paper(rRect(cx - dw / 2, -dh, dw, dh, 1, sd + 3), o.cuaMau || pick(["#3F7FB8", "#2A9D8F", "#C9463A", "#8A6440"], r), { stroke: true, sw: 4, shadow: false });
        for (var pl = 1; pl < 3; pl++) s += line("M " + f1(cx - dw / 2 + dw * pl / 3) + " " + f1(-dh + 6) + " L " + f1(cx - dw / 2 + dw * pl / 3) + " -6", 2.5, INK, ' opacity="0.35"');
        s += '<circle cx="' + f1(cx + dw / 2 - 12) + '" cy="' + f1(-dh * 0.5) + '" r="4.5" fill="#E3C27A" stroke="' + INK + '" stroke-width="2"/>';
      }
    }
    // cửa sổ chớp
    var nso = o.so == null ? 1 : o.so;
    for (var k = 0; k < nso; k++) {
      var wx = o.soX != null ? o.soX : (cx < 0 ? w * 0.18 : -w * 0.2) + k * 90 * (cx < 0 ? 1 : -1), wy = -h * 0.66, ww = 64, wh = 70;
      s += '<rect x="' + f1(wx - ww / 2) + '" y="' + f1(wy) + '" width="' + ww + '" height="' + wh + '" fill="#2E3A44" stroke="' + INK + '" stroke-width="4"/>';
      s += paper(rRect(wx - ww / 2 - 4, wy - 2, ww / 2, wh + 4, 1, sd + 10 + k), "#F3EFE4", { stroke: true, sw: 3, shadow: false });
      for (var sl = 1; sl < 6; sl++) s += line("M " + f1(wx - ww / 2) + " " + f1(wy + sl * wh / 6) + " L " + f1(wx - 6) + " " + f1(wy + sl * wh / 6), 2, INK, ' opacity="0.4"');
      s += paper(rRect(wx - ww / 2 - 8, wy + wh, ww + 16, 10, 1, sd + 20 + k), "#E9E3D2", { stroke: true, sw: 3, shadow: false });
    }
    // mái tôn
    var ov = 22, md = o.mai || "hoi";
    var roof = md === "doc" ? "M " + f1(-w / 2 - ov) + " " + f1(-h + 8) + " L " + f1(-w / 2 - ov + 6) + " " + f1(-h - 34) + " L " + f1(w / 2 + ov) + " " + f1(-h - 14) + " L " + f1(w / 2 + ov) + " " + f1(-h + 8) + " Z"
      : "M " + f1(-w / 2 - ov) + " " + f1(-h + 8) + " L " + f1(-w * 0.12) + " " + f1(-h - 46) + " L " + f1(w * 0.12) + " " + f1(-h - 46) + " L " + f1(w / 2 + ov) + " " + f1(-h + 8) + " Z";
    s += paper(roof, o.maiMau || M.mai, { stroke: true, sw: 5, sx: 5, sy: 7 });
    for (var cxr = -w / 2 - ov + 16; cxr < w / 2 + ov - 8; cxr += 16) s += line("M " + f1(cxr) + " " + f1(-h + 4) + " L " + f1(cxr + (md === "doc" ? 4 : (cxr < 0 ? 10 : -10))) + " " + f1(-h - (md === "doc" ? 12 + (cxr + w / 2) * 0.06 : 30 - Math.abs(cxr) * 0.05)), 2, M.maiToi, ' opacity="0.8"');
    if (r() < 0.4) s += paper(rRect(-w * 0.1, -h - 30, w * 0.2, 14, 1, sd + 30), "#C98E62", { shadow: false, stroke: true, sw: 2.5 });
    return s + "</g>";
  }

  /* Đảo kín nhà nhìn từ biển (xa): dải đất mỏng sát nước, 2 hàng nhà một tầng tường màu mái tôn, vài thuyền nhỏ. Gốc: giữa mép nước.
     o: { w: 900, seed, hang: 2, thuyen: 3, dem (cửa sổ sáng) } */
  function daoNhaXa(o) {
    o = o || {};
    var w = o.w || 900, sd = o.seed || 851, r = rng(sd), s = "<g>";
    s += paper(rough([[-w / 2 - 20, 6], [-w / 2, -10], [w / 2, -12], [w / 2 + 20, 6]], 2, sd, 20), "#CFC6B0", { stroke: true, sw: 3, shadow: false });
    for (var row = 1; row >= 0; row--) {
      var x = -w / 2 + 10 + (row ? 24 : 0), sc = row ? 0.72 : 1, yb = row ? -26 : -6;
      while (x < w / 2 - 30) {
        var hw = (50 + r() * 40) * sc, hh = (40 + r() * 22) * sc, m = pick(M.tuong, r);
        s += '<g transform="translate(' + f1(x + hw / 2) + "," + f1(yb) + ')">' + paper(rRect(-hw / 2, -hh, hw, hh, 1, sd + Math.round(x)), m, { stroke: true, sw: 2.5, shadow: false });
        s += '<path d="M ' + f1(-hw / 2 - 5) + " " + f1(-hh + 2) + " L " + f1(-hw * 0.1) + " " + f1(-hh - 12 * sc) + " L " + f1(hw * 0.1) + " " + f1(-hh - 12 * sc) + " L " + f1(hw / 2 + 5) + " " + f1(-hh + 2) + ' Z" fill="' + (r() < 0.8 ? M.mai : "#C98E62") + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>';
        s += '<rect x="' + f1(-hw * 0.3) + '" y="' + f1(-hh * 0.62) + '" width="' + f1(hw * 0.18) + '" height="' + f1(hh * 0.5) + '" fill="' + (o.dem ? "#FFD68A" : "#2E3A44") + '"/>';
        if (r() < 0.6) s += '<rect x="' + f1(hw * 0.1) + '" y="' + f1(-hh * 0.7) + '" width="' + f1(hw * 0.2) + '" height="' + f1(hh * 0.28) + '" fill="' + (o.dem && r() < 0.6 ? "#FFE3A6" : "#2E3A44") + '"/>';
        s += "</g>";
        x += hw - 2 * sc;
      }
    }
    for (var b = 0; b < (o.thuyen == null ? 3 : o.thuyen); b++) {
      var bx = -w / 2 + 60 + r() * (w - 120);
      s += '<g transform="translate(' + f1(bx) + ',14) scale(0.09)">' + thuyen("", { mau: pick(["#C9463A", "#3F7FB8", "#F2CB57", "#2A9D8F"], r), may: false }).truoc + "</g>";
    }
    return s + "</g>";
  }

  /* Đảo thấp xanh có bãi cát và hàng cây (lớp xa). Gốc: giữa mép nước. o: { w: 700, seed, cay: số cây (w/60) } */
  function daoXanh(o) {
    o = o || {};
    var w = o.w || 700, sd = o.seed || 871, r = rng(sd), s = "<g>";
    var hl = [[-w / 2, 4]];
    for (var i = 1; i < 8; i++) hl.push([-w / 2 + w * i / 8, -30 - Math.sin(Math.PI * i / 8) * 50 - r() * 16]);
    hl.push([w / 2, 4]);
    s += paper(rough(hl, 3, sd, 26), o.mau || "#5E9A5A", { shadow: false, stroke: true, sw: 3 });
    var nc = o.cay == null ? Math.round(w / 60) : o.cay;
    for (var c = 0; c < nc; c++) {
      var cx = -w / 2 + 40 + (w - 80) * (c + r() * 0.5) / nc, ch = 70 + r() * 50, lean = (r() - 0.5) * 30;
      s += line("M " + f1(cx) + " -10 C " + f1(cx + lean * 0.3) + " " + f1(-ch * 0.5) + " " + f1(cx + lean) + " " + f1(-ch * 0.8) + " " + f1(cx + lean) + " " + f1(-ch), 6, "#8A6440");
      for (var f = 0; f < 5; f++) {
        var a = -Math.PI / 2 + (f - 2) * 0.62, ex = cx + lean + Math.cos(a) * 44, ey = -ch + Math.sin(a) * 26 + 16;
        s += '<path d="M ' + f1(cx + lean) + " " + f1(-ch) + " Q " + f1((cx + lean + ex) / 2) + " " + f1(-ch - 18) + " " + f1(ex) + " " + f1(ey) + ' Q ' + f1((cx + lean + ex) / 2) + " " + f1(-ch - 2) + " " + f1(cx + lean) + " " + f1(-ch) + ' Z" fill="' + (f % 2 ? M.la : "#3F7A45") + '" stroke="' + INK + '" stroke-width="2.5"/>';
      }
    }
    s += paper(rough([[-w / 2 - 30, 8], [-w / 2 + 10, -12], [w / 2 - 10, -14], [w / 2 + 30, 8]], 2, sd + 1, 22), M.cat, { stroke: true, sw: 3, shadow: false });
    return s + "</g>";
  }

  /* Đảo đước tối (đêm) / xanh sẫm: hàng tán tròn thấp sát nước, rễ chống. Gốc: giữa mép nước. o: { w, seed, mau } */
  function daoDuoc(o) {
    o = o || {};
    var w = o.w || 700, sd = o.seed || 881, r = rng(sd), s = "<g>", m = o.mau || M.duoc;
    for (var k = 0; k < Math.round(w / 50); k++) {
      var x = -w / 2 + 30 + k * 50 + r() * 20, rr = 40 + r() * 30;
      s += '<path d="' + rEll(x, -30 - rr * 0.6, rr, rr * 0.75, 4, sd + k) + '" fill="' + m + '" stroke="' + INK + '" stroke-width="3"/>';
    }
    for (var j = 0; j < Math.round(w / 40); j++) { var rx = -w / 2 + 20 + j * 40; s += line("M " + rx + " -24 C " + (rx - 8) + " -10 " + (rx - 14) + " -2 " + (rx - 18) + " 4 M " + rx + " -24 C " + (rx + 8) + " -10 " + (rx + 12) + " -2 " + (rx + 16) + " 4", 3, "#3B2E26", ' opacity="0.8"'); }
    return s + "</g>";
  }

  /* Đảo đá san hô nhỏ trơ trụi (chưa nhà, chưa cây). Gốc: giữa mép nước. o: { w: 520, seed, mau } */
  function daoTroTrui(o) {
    o = o || {};
    var w = o.w || 520, sd = o.seed || 891, r = rng(sd), pts = [[-w / 2, 6]];
    for (var i = 1; i < 9; i++) pts.push([-w / 2 + w * i / 9, -12 - Math.sin(Math.PI * i / 9) * 34 - r() * 12]);
    pts.push([w / 2, 6]);
    var s = "<g>" + paper(rough(pts, 4, sd, 16), o.mau || "#BDB4A0", { stroke: true, sw: 5, half: 0.15, sx: 6, sy: 6 });
    for (var k = 0; k < Math.round(w / 40); k++) s += '<path d="' + rEll(-w / 2 + 30 + r() * (w - 60), -6 - r() * 26, 6 + r() * 10, 4 + r() * 6, 1.5, sd + 10 + k) + '" fill="' + pick(["#E8DCC0", "#9C948C", "#E9A89A", "#D8CFB8"], r) + '" stroke="' + INK + '" stroke-width="2"/>';
    return s + "</g>";
  }

  /* Đảo nhìn từ trên cao: mặt xi măng kín mái nhà, lối hẹp, quảng trường nhỏ có chấm thánh giá, viền nước nông. Gốc: tâm đảo.
     o: { w: 820, h: 520, seed, thuyen: 6 }. Trả chuỗi SVG (vẽ trên nền biển). */
  function daoTuTren(o) {
    o = o || {};
    var w = o.w || 820, h = o.h || 520, sd = o.seed || 901, r = rng(sd), pts = [];
    for (var i = 0; i < 18; i++) { var a = 2 * Math.PI * i / 18, k = 1 + (r() - 0.5) * 0.12; pts.push([Math.cos(a) * w / 2 * k, Math.sin(a) * h / 2 * k]); }
    var vien = pts.map(function (p) { return [p[0] * 1.1, p[1] * 1.14]; });
    var s = "<g>" + '<path d="' + D.rough(vien, 3, sd + 1, 30) + '" fill="#8ADBD0" opacity="0.8"/>';
    var dd = D.rough(pts, 3, sd, 24);
    s += paper(dd, "#CFC8B8", { stroke: true, sw: 6, sx: 10, sy: 12 });
    s += '<clipPath id="ndDaoCl' + sd + '"><path d="' + dd + '"/></clipPath><g clip-path="url(#ndDaoCl' + sd + ')">';
    for (var y = -h / 2; y < h / 2; y += 58) {
      for (var x = -w / 2 + (r() * 30); x < w / 2; ) {
        var bw = 40 + r() * 50, bh = 44 + r() * 10;
        if (Math.abs(x + bw / 2) < 50 && Math.abs(y + bh / 2) < 40) { x += 100; continue; }
        var m = r() < 0.75 ? M.mai : pick(["#C98E62", "#5FA8D3", "#E9806E", "#F3EFE4"], r);
        s += '<rect x="' + f1(x) + '" y="' + f1(y) + '" width="' + f1(bw) + '" height="' + f1(bh) + '" fill="' + m + '" stroke="' + INK + '" stroke-width="2.5"/>';
        s += line("M " + f1(x) + " " + f1(y + bh / 2) + " L " + f1(x + bw) + " " + f1(y + bh / 2), 1.5, M.maiToi, ' opacity="0.7"');
        x += bw + 3 + (r() < 0.15 ? 14 : 0);
      }
    }
    s += "</g>";
    s += '<rect x="-36" y="-26" width="72" height="52" fill="#E6DFCF" stroke="' + INK + '" stroke-width="2.5"/>' + line("M 0 -14 L 0 14 M -9 -4 L 9 -4", 4, "#F7F3EA") + line("M 0 -14 L 0 14 M -9 -4 L 9 -4", 1.5);
    for (var b = 0; b < (o.thuyen == null ? 6 : o.thuyen); b++) {
      var aa = r() * 2 * Math.PI, bx = Math.cos(aa) * w * 0.58, by = Math.sin(aa) * h * 0.6;
      s += '<g transform="translate(' + f1(bx) + "," + f1(by) + ") rotate(" + f1(aa * 57.3 + 90) + ')">' + paper("M -8 -26 C 6 -18 8 14 0 26 C -8 14 -10 -18 -8 -26 Z", pick(["#C9463A", "#3F7FB8", "#F2CB57", "#F3EFE4"], r), { stroke: true, sw: 2, shadow: false }) + "</g>";
    }
    return s + "</g>";
  }

  /* Sân bóng giấy nhìn từ trên (xanh lá kẻ vạch trắng). Gốc: tâm. */
  function sanBong(w, h, seed) {
    var s = "<g>" + paper(rRect(-w / 2, -h / 2, w, h, 2, seed || 911), "#5DAA4E", { stroke: true, sw: 5, sx: 8, sy: 10 });
    for (var i = 0; i < 8; i++) if (i % 2) s += '<rect x="' + f1(-w / 2 + i * w / 8) + '" y="' + f1(-h / 2 + 4) + '" width="' + f1(w / 8) + '" height="' + f1(h - 8) + '" fill="#4F9A44" opacity="0.6"/>';
    var c = "#F7F6EE";
    s += '<rect x="' + f1(-w / 2 + 14) + '" y="' + f1(-h / 2 + 14) + '" width="' + f1(w - 28) + '" height="' + f1(h - 28) + '" fill="none" stroke="' + c + '" stroke-width="5"/>';
    s += line("M 0 " + f1(-h / 2 + 14) + " L 0 " + f1(h / 2 - 14), 5, c) + '<circle cx="0" cy="0" r="' + f1(h * 0.17) + '" fill="none" stroke="' + c + '" stroke-width="5"/>';
    s += '<rect x="' + f1(-w / 2 + 14) + '" y="' + f1(-h * 0.22) + '" width="' + f1(w * 0.14) + '" height="' + f1(h * 0.44) + '" fill="none" stroke="' + c + '" stroke-width="5"/>';
    s += '<rect x="' + f1(w / 2 - 14 - w * 0.14) + '" y="' + f1(-h * 0.22) + '" width="' + f1(w * 0.14) + '" height="' + f1(h * 0.44) + '" fill="none" stroke="' + c + '" stroke-width="5"/>';
    return s + "</g>";
  }

  /* Quả bóng giấy. Gốc: tâm. */
  function bong(r) {
    r = r || 22;
    return "<g>" + '<circle cx="0" cy="0" r="' + r + '" fill="#FFFDF6" stroke="' + INK + '" stroke-width="3.5"/>' +
      '<path d="M 0 ' + f1(-r * 0.36) + " L " + f1(r * 0.34) + " " + f1(-r * 0.1) + " L " + f1(r * 0.2) + " " + f1(r * 0.3) + " L " + f1(-r * 0.2) + " " + f1(r * 0.3) + " L " + f1(-r * 0.34) + " " + f1(-r * 0.1) + ' Z" fill="' + INK + '"/>' +
      line("M 0 " + f1(-r * 0.36) + " L 0 " + f1(-r) + " M " + f1(r * 0.34) + " " + f1(-r * 0.1) + " L " + f1(r * 0.95) + " " + f1(-r * 0.3) + " M " + f1(-r * 0.34) + " " + f1(-r * 0.1) + " L " + f1(-r * 0.95) + " " + f1(-r * 0.3), 2.5) + "</g>";
  }

  /* ---------- đồ trên đảo ---------- */
  /* Ghế nhựa đúc (cao ≈ 180 ở cỡ Wob 1). Gốc: giữa chân ghế. o: { mau } . Mặt ngồi ở y ≈ -92. */
  function ghe(o) {
    o = o || {};
    var m = o.mau || "#F4F2EC", d = o.mauToi || "#D6D2C6", s = "<g>";
    s += line("M -52 -88 L -64 0 M 52 -88 L 64 0", 11, d) + line("M -52 -88 L -64 0 M 52 -88 L 64 0", 2.5, INK, ' opacity="0.5"');
    s += paper("M -64 -184 C -60 -200 60 -200 64 -184 L 58 -96 L -58 -96 Z", m, { stroke: true, sw: 4.5, sx: 5, sy: 6 });
    for (var k = -2; k <= 2; k++) s += '<rect x="' + (k * 20 - 5) + '" y="-176" width="10" height="44" rx="5" fill="' + d + '" stroke="' + INK + '" stroke-width="2"/>';
    s += paper("M -74 -100 L 74 -100 L 66 -80 L -66 -80 Z", m, { stroke: true, sw: 4.5, shadow: false });
    s += line("M -36 -80 L -44 0 M 36 -80 L 44 0", 9, m) + line("M -36 -80 L -44 0 M 36 -80 L 44 0", 2, INK, ' opacity="0.5"');
    return s + "</g>";
  }

  /* Mèo giấy nằm (cam vằn). Gốc: giữa bụng chạm mặt đỡ. Dài ≈ 170.
     id+"-duoi": đuôi (xoay quanh gốc đuôi, origin đã ghi trong nhóm ngoài), id+"-dau": đầu (xoay nhẹ), id+"-con": hai con ngươi (dịch x).
     o: { mau, van } */
  function meo(id, o) {
    o = o || {};
    var m = o.mau || "#E39B4F", v = o.van || "#B86E2C", s = '<g id="' + id + '">';
    s += '<g transform="translate(-70,-24)"><g id="' + id + '-duoi">' + line("M 0 0 C -30 6 -46 -10 -40 -36", 16, INK) + line("M 0 0 C -30 6 -46 -10 -40 -36", 10, m) + "</g></g>";
    s += paper("M -84 0 C -92 -40 -60 -62 -10 -62 C 40 -62 66 -44 70 0 Z", m, { stroke: true, sw: 4.5, sx: 4, sy: 5 });
    for (var k = 0; k < 4; k++) s += line("M " + (-56 + k * 26) + " -58 C " + (-50 + k * 26) + " -44 " + (-50 + k * 26) + " -34 " + (-56 + k * 26) + " -24", 4, v, ' opacity="0.8"');
    s += '<g transform="translate(64,-64)"><g id="' + id + '-dau">';
    s += paper("M -40 -20 L -34 -64 L -12 -40 L 12 -40 L 34 -64 L 40 -20 C 44 14 24 30 0 30 C -24 30 -44 14 -40 -20 Z", m, { stroke: true, sw: 4.5, shadow: false });
    s += '<path d="M -30 -50 L -26 -34 L -16 -38 Z M 30 -50 L 26 -34 L 16 -38 Z" fill="#F2B8A8"/>';
    s += '<ellipse cx="-15" cy="-8" rx="10" ry="12" fill="#D7E86A" stroke="' + INK + '" stroke-width="3"/><ellipse cx="15" cy="-8" rx="10" ry="12" fill="#D7E86A" stroke="' + INK + '" stroke-width="3"/>';
    s += '<g id="' + id + '-con"><ellipse cx="-15" cy="-8" rx="3" ry="9" fill="' + INK + '"/><ellipse cx="15" cy="-8" rx="3" ry="9" fill="' + INK + '"/></g>';
    s += '<path d="M -4 8 L 4 8 L 0 13 Z" fill="#C9463A"/>' + line("M 0 13 C -2 18 -8 19 -11 16 M 0 13 C 2 18 8 19 11 16", 2.5);
    s += line("M -20 10 L -48 6 M -20 14 L -46 18 M 20 10 L 48 6 M 20 14 L 46 18", 2, INK, ' opacity="0.7"');
    s += "</g></g>";
    s += paper(rEll(40, -6, 18, 8, 1, 931), m, { stroke: true, sw: 3.5, shadow: false });
    return s + "</g>";
  }

  /* Dây phơi võng giữa (x0, y0) và (x1, y1), độ võng sag, áo quần giấy treo kẹp. Gốc: toạ độ thế giới. o: { seed, n } */
  function dayPhoi(x0, y0, x1, y1, sag, o) {
    o = o || {};
    var r = rng(o.seed || 941), s = "<g>", mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + sag;
    s += '<path d="M ' + x0 + " " + y0 + " Q " + mx + " " + f1(my + sag) + " " + x1 + " " + y1 + '" fill="none" stroke="' + INK + '" stroke-width="3"/>';
    var n = o.n || Math.round(Math.abs(x1 - x0) / 120);
    for (var k = 0; k < n; k++) {
      var u = (k + 0.5 + (r() - 0.5) * 0.3) / n, x = (1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, y = (1 - u) * (1 - u) * y0 + 2 * u * (1 - u) * (my + sag) + u * u * y1;
      var m = pick(["#C9463A", "#F2CB57", "#5FA8D3", "#F3EFE4", "#2A9D8F", "#EE9AAE"], r), kind = r();
      s += '<g transform="translate(' + f1(x) + "," + f1(y) + ") rotate(" + f1((r() - 0.5) * 8) + ')">';
      if (kind < 0.45) s += paper("M -34 0 L 34 0 L 50 22 L 36 32 L 30 22 L 30 84 L -30 84 L -30 22 L -36 32 L -50 22 Z", m, { stroke: true, sw: 3, sx: 3, sy: 4 });
      else if (kind < 0.75) s += paper(rRect(-30, 0, 60, 90, 1, 950 + k), m, { stroke: true, sw: 3, sx: 3, sy: 4 }) + line("M -30 70 L 30 70", 3, "#FFFFFF", ' opacity="0.6"');
      else s += paper("M -26 0 L 26 0 L 24 70 L 4 70 L 0 26 L -4 70 L -24 70 Z", m, { stroke: true, sw: 3, sx: 3, sy: 4 });
      s += '<rect x="-14" y="-6" width="6" height="14" fill="#C98E62" stroke="' + INK + '" stroke-width="1.5"/><rect x="8" y="-6" width="6" height="14" fill="#C98E62" stroke="' + INK + '" stroke-width="1.5"/></g>';
    }
    return s + "</g>";
  }

  /* Thánh giá cao đơn giản trên bệ hai bậc giữa quảng trường (tông kem, không chép thiết kế thật). Gốc: giữa chân bệ. h: chiều cao (700) */
  function thanhGia(h) {
    h = h || 700;
    var s = "<g>" + paper(rRect(-110, -40, 220, 40, 1.5, 961), "#D9D2C2", { stroke: true, sw: 5 }) + paper(rRect(-74, -80, 148, 42, 1.5, 962), "#E6DFCF", { stroke: true, sw: 5 });
    s += paper(rRect(-20, -h, 40, h - 78, 1.2, 963), "#F5F1E6", { stroke: true, sw: 5, sx: 8, sy: 6 });
    s += paper(rRect(-h * 0.2, -h * 0.78, h * 0.4, 38, 1.2, 964), "#F5F1E6", { stroke: true, sw: 5, sx: 8, sy: 6 });
    s += line("M -10 " + f1(-h + 10) + " L -10 -90", 4, "#FFFFFF", ' opacity="0.6"');
    return s + "</g>";
  }

  /* Người giấy chung (dạng hình nhỏ, không mặt chi tiết: chỉ hai chấm mắt, hoặc không mặt khi nhìn từ sau).
     Gốc: giữa chân. Cao ≈ 380 (người lớn) · 250 (o.nho). Nhóm con: id-chL, id-chR (chân, gốc hông), id-tayL, id-tayR (tay, gốc vai), id-dau (đầu), id-mat (hai chấm mắt, dịch x để nhìn).
     o: { nho (trẻ em), ao, quan, da, mu (mũ rộng vành), sau (nhìn từ sau: không mắt), ngoi (ngồi: chân gập ra trước) } */
  function nguoi(id, o) {
    o = o || {};
    var k = o.nho ? 0.66 : 1, ao = o.ao || "#E9806E", quan = o.quan || "#4F6A80", da = o.da || "#B98563";
    var hip = -150 * k, sh = -268 * k, s = '<g id="' + id + '">';
    function chan(side) {
      var x = side * 18 * k, d = o.ngoi ? "M 0 0 L " + (side * 10 * k) + " " + (-10 * k) + " L " + (side * 14 * k) + " " + (110 * k) : "M 0 0 L " + (side * 4 * k) + " " + (146 * k);
      return '<g transform="translate(' + f1(x) + "," + f1(hip) + ')"><g id="' + id + "-ch" + (side < 0 ? "L" : "R") + '">' + line(d, 22 * k, INK) + line(d, 15 * k, quan) +
        '<ellipse cx="' + f1(side * 10 * k) + '" cy="' + f1((o.ngoi ? 112 : 148) * k) + '" rx="' + f1(18 * k) + '" ry="' + f1(8 * k) + '" fill="#3B3430"/></g></g>';
    }
    function tay(side) {
      return '<g transform="translate(' + f1(side * 44 * k) + "," + f1(sh + 14 * k) + ')"><g id="' + id + "-tay" + (side < 0 ? "L" : "R") + '">' + line("M 0 0 L " + f1(side * 6 * k) + " " + f1(104 * k), 18 * k, INK) + line("M 0 0 L " + f1(side * 6 * k) + " " + f1(104 * k), 12 * k, ao) +
        '<circle cx="' + f1(side * 6 * k) + '" cy="' + f1(110 * k) + '" r="' + f1(10 * k) + '" fill="' + da + '" stroke="' + INK + '" stroke-width="2.5"/></g></g>';
    }
    s += chan(-1) + chan(1) + tay(-1);
    s += paper("M " + f1(-46 * k) + " " + f1(hip + 8 * k) + " L " + f1(-50 * k) + " " + f1(sh + 6 * k) + " C " + f1(-30 * k) + " " + f1(sh - 12 * k) + " " + f1(30 * k) + " " + f1(sh - 12 * k) + " " + f1(50 * k) + " " + f1(sh + 6 * k) + " L " + f1(46 * k) + " " + f1(hip + 8 * k) + " Z", ao, { stroke: true, sw: 4, sx: 4, sy: 5, half: 0.1 });
    s += tay(1);
    s += '<g transform="translate(0,' + f1(sh - 44 * k) + ')"><g id="' + id + '-dau">';
    s += '<circle cx="0" cy="0" r="' + f1(40 * k) + '" fill="' + da + '" stroke="' + INK + '" stroke-width="4"/>';
    s += '<path d="M ' + f1(-40 * k) + " " + f1(-4 * k) + " C " + f1(-40 * k) + " " + f1(-50 * k) + " " + f1(40 * k) + " " + f1(-50 * k) + " " + f1(40 * k) + " " + f1(-4 * k) + " C " + f1(20 * k) + " " + f1(-22 * k) + " " + f1(-20 * k) + " " + f1(-22 * k) + " " + f1(-40 * k) + " " + f1(-4 * k) + ' Z" fill="#2E2622"/>';
    if (o.sau) s += '<circle cx="0" cy="0" r="' + f1(38 * k) + '" fill="#2E2622"/>';
    else s += '<g id="' + id + '-mat"><circle cx="' + f1(-13 * k) + '" cy="' + f1(4 * k) + '" r="' + f1(4.2 * k) + '" fill="' + INK + '"/><circle cx="' + f1(13 * k) + '" cy="' + f1(4 * k) + '" r="' + f1(4.2 * k) + '" fill="' + INK + '"/></g>';
    if (o.mu) s += paper(rEll(0, -26 * k, 70 * k, 13 * k, 1, 971), o.mu === true ? "#D9C48E" : o.mu, { stroke: true, sw: 3.5, shadow: false }) + paper("M " + f1(-30 * k) + " " + f1(-28 * k) + " C " + f1(-30 * k) + " " + f1(-66 * k) + " " + f1(30 * k) + " " + f1(-66 * k) + " " + f1(30 * k) + " " + f1(-28 * k) + " Z", o.mu === true ? "#D9C48E" : o.mu, { stroke: true, sw: 3.5, shadow: false });
    s += "</g></g>";
    return s + "</g>";
  }

  /* Đồng hồ đeo tay cận cảnh (KHÔNG chữ, KHÔNG số: chỉ vạch và hai kim). Gốc: tâm mặt. r: bán kính mặt (150).
     id+"-kimP" kim phút, id+"-kimG" kim giờ (xoay quanh tâm, origin "0 0"). */
  function dongHo(id, r) {
    r = r || 150;
    var s = '<g id="' + id + '">';
    s += paper(rRect(-r * 0.62, -r * 2.2, r * 1.24, r * 1.4, 2, 981), "#8A5A3A", { stroke: true, sw: 6 }) + paper(rRect(-r * 0.62, r * 0.8, r * 1.24, r * 1.4, 2, 982), "#8A5A3A", { stroke: true, sw: 6 });
    for (var h = 0; h < 3; h++) s += '<circle cx="0" cy="' + f1(r * 1.25 + 30 + h * 34) + '" r="7" fill="#5E3E28" stroke="' + INK + '" stroke-width="2"/>';
    s += '<circle cx="0" cy="0" r="' + f1(r * 1.12) + '" fill="#C9CED0" stroke="' + INK + '" stroke-width="7"/>';
    s += '<circle cx="0" cy="0" r="' + r + '" fill="#FFF8EC" stroke="' + INK + '" stroke-width="5"/>';
    for (var k = 0; k < 12; k++) { var a = k * Math.PI / 6, l = k % 3 === 0 ? 30 : 16; s += line("M " + f1(Math.sin(a) * (r - 14)) + " " + f1(-Math.cos(a) * (r - 14)) + " L " + f1(Math.sin(a) * (r - 14 - l)) + " " + f1(-Math.cos(a) * (r - 14 - l)), k % 3 === 0 ? 7 : 4); }
    s += '<g id="' + id + '-kimG">' + line("M 0 12 L 0 " + f1(-r * 0.5), 12) + "</g>";
    s += '<g id="' + id + '-kimP">' + line("M 0 16 L 0 " + f1(-r * 0.78), 7) + "</g>";
    s += '<circle cx="0" cy="0" r="12" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/>';
    s += '<rect x="' + f1(r * 1.08) + '" y="-14" width="22" height="28" rx="5" fill="#B9BDBE" stroke="' + INK + '" stroke-width="4"/>';
    s += line("M " + f1(-r * 0.6) + " " + f1(-r * 0.5) + " C " + f1(-r * 0.4) + " " + f1(-r * 0.75) + " " + f1(-r * 0.1) + " " + f1(-r * 0.82) + " " + f1(r * 0.1) + " " + f1(-r * 0.82), 6, "#FFFFFF", ' opacity="0.55"');
    return s + "</g>";
  }

  /* Vợt bắt muỗi giấy (vòng lưới có túi lưới ngắn, cán gỗ). Gốc: cuối cán (chỗ cầm); vợt chĩa lên (âm y). Dài ≈ 300. */
  function vot(o) {
    o = o || {};
    var s = "<g>" + line("M 0 0 L 0 -180", 9, "#8A6440") + line("M 0 0 L 0 -180", 2.5, INK, ' opacity="0.5"');
    s += '<path d="M -58 -236 C -40 -170 40 -170 58 -236" fill="#F6F4EE" opacity="0.55" stroke="' + INK + '" stroke-width="2.5"/>';
    for (var k = -3; k <= 3; k++) s += line("M " + (k * 16) + " -270 L " + (k * 9) + " -188", 1.6, INK, ' opacity="0.5"');
    s += '<ellipse cx="0" cy="-240" rx="64" ry="58" fill="none" stroke="' + INK + '" stroke-width="10"/><ellipse cx="0" cy="-240" rx="64" ry="58" fill="none" stroke="#C9463A" stroke-width="5"/>';
    for (var j = -2; j <= 2; j++) s += line("M -56 " + (-240 + j * 20) + " L 56 " + (-240 + j * 20), 1.5, INK, ' opacity="0.45"') + line("M " + (j * 22) + " -292 L " + (j * 22) + " -188", 1.5, INK, ' opacity="0.45"');
    return s + "</g>";
  }

  /* Vỏ sò dẹt (sò quạt). Gốc: giữa đáy vỏ. Rộng ≈ 110. o: { mau } */
  function voSo(o) {
    o = o || {};
    var m = o.mau || "#F2D3C2", s = "<g>" + paper("M 0 0 L -52 -46 C -50 -92 50 -92 52 -46 Z", m, { stroke: true, sw: 4, sx: 3, sy: 4 });
    for (var k = -2; k <= 2; k++) s += line("M 0 -2 L " + (k * 22) + " -80", 2.5, "#C98E7A");
    s += paper("M -16 0 L -26 12 L 26 12 L 16 0 Z", m, { stroke: true, sw: 3.5, shadow: false });
    return s + "</g>";
  }

  /* Tảng đá / san hô / vỏ ốc nhỏ để đắp đảo. Gốc: tâm. kieu: "da" | "sanho" | "oc". */
  function manh(kieu, r, seed) {
    r = r || 30;
    if (kieu === "sanho") return "<g>" + paper(rough([[-r, 0], [-r * 0.7, -r * 0.9], [-r * 0.3, -r * 0.5], [0, -r * 1.2], [r * 0.3, -r * 0.6], [r * 0.7, -r], [r, 0]], 3, seed || 991, 10), "#E9A89A", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + "</g>";
    if (kieu === "oc") return "<g>" + paper(rEll(0, -r * 0.5, r * 0.8, r * 0.5, 1, seed || 992), "#F3E6CF", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + line("M " + f1(-r * 0.5) + " " + f1(-r * 0.5) + " C 0 " + f1(-r * 0.9) + " " + f1(r * 0.4) + " " + f1(-r * 0.6) + " 0 " + f1(-r * 0.4), 2.5, "#B89878") + "</g>";
    return "<g>" + paper(rEll(0, -r * 0.55, r, r * 0.62, 3, seed || 993), "#A8A096", { stroke: true, sw: 3.5, sx: 3, sy: 4, half: 0.15 }) + "</g>";
  }

  /* Thẻ giấy có chữ (chữ phải nằm trong chu_tren_do_vat). Gốc: tâm. co: cỡ chữ (px hệ 1920). o: { nen, mau, ghim (true: băng dính trên) , seed } */
  function theChu(id, chu, co, o) {
    o = o || {};
    var w = Math.max(co * 1.6, chu.length * co * 0.56 + co * 1.1), h = co * 1.55, s = '<g' + (id ? ' id="' + id + '"' : "") + ">";
    s += paper(rRect(-w / 2, -h / 2, w, h, 2, o.seed || 1001), o.nen || "#FFF8EC", { stroke: true, sw: 4.5, sx: 7, sy: 9 });
    if (o.ghim !== false) s += '<g transform="translate(0,' + f1(-h / 2) + ') rotate(-4)">' + paper(rRect(-44, -14, 88, 26, 1.5, (o.seed || 1001) + 1), "#E9C98B", { shadow: false }) + "</g>";
    s += D.txt(0, f1(co * 0.34), chu, co, { w: 800, fill: o.mau || INK });
    return s + "</g>";
  }

  /* Biển giấy trên que chỉ có dấu hỏi to (chữ "?" phải có trong chu_tren_do_vat). Gốc: chân que. id+"-bang": tấm biển. */
  function bienHoi(id, o) {
    o = o || {};
    var h = o.cao || 150, co = o.co || 96, s = '<g id="' + id + '">' + line("M 0 0 L 0 " + (-h), 9, "#8A6440") + line("M 0 0 L 0 " + (-h), 2.5, INK, ' opacity="0.5"');
    s += '<g id="' + id + '-bang">' + paper(rRect(-62, -h - 120, 124, 128, 2, o.seed || 1011), o.nen || "#FFF8EC", { stroke: true, sw: 5, sx: 6, sy: 8 }) + D.txt(0, -h - 22, "?", co, { w: 900, fill: o.mau || "#C9463A" }) + "</g>";
    return s + "</g>";
  }

  /* Mũi tên giấy tí hon. Gốc: đầu mũi (chỉ xuống). len: chiều dài. */
  function muiTen(len, mau) {
    len = len || 70;
    return "<g>" + paper("M 0 0 L -18 -26 L -7 -26 L -7 " + (-len) + " L 7 " + (-len) + " L 7 -26 L 18 -26 Z", mau || "#C9463A", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + "</g>";
  }

  /* Trăng giấy (có quầng). Gốc: tâm. */
  function trang(r) {
    r = r || 60;
    return "<g>" + '<circle cx="0" cy="0" r="' + (r * 2.4) + '" fill="url(#ndTrang)"/>' + paper(rEll(0, 0, r, r, 1.5, 1021), "#FFF3CF", { stroke: true, sw: 4, shadow: false }) +
      '<circle cx="' + f1(-r * 0.3) + '" cy="' + f1(-r * 0.2) + '" r="' + f1(r * 0.16) + '" fill="#EADDB0"/><circle cx="' + f1(r * 0.25) + '" cy="' + f1(r * 0.3) + '" r="' + f1(r * 0.11) + '" fill="#EADDB0"/></g>';
  }
  /* Trời sao: n ngôi sao giấy trong hộp [x, y, w, h]. Trả chuỗi SVG (tĩnh). */
  function sao(n, box, seed) {
    var r = rng(seed || 1031), s = "<g>";
    for (var k = 0; k < n; k++) {
      var x = box[0] + r() * box[2], y = box[1] + r() * box[3], q = 3 + r() * 6;
      s += '<g transform="translate(' + f1(x) + "," + f1(y) + ')">' + (r() < 0.3 ? D.sparkle(q * 1.6, "#FFF3CF") : '<circle r="' + f1(q * 0.5) + '" fill="#FFF3CF"/>') + "</g>";
    }
    return s + "</g>";
  }
  /* Mây bão giấy xám đen. Gốc: tâm. w: bề ngang. */
  function mayBao(w, seed) {
    w = w || 500;
    var r = rng(seed || 1041), s = "<g>", n = 6;
    for (var k = 0; k < n; k++) {
      var x = -w / 2 + w * (k + 0.5) / n, rr = w * (0.12 + r() * 0.07), y = -rr * 0.3 - (k % 2) * rr * 0.4;
      s += '<path d="' + rEll(x + 6, y + 8, rr, rr * 0.8, 3, (seed || 1041) + k) + '" fill="#0b1214" opacity="0.2"/>';
    }
    for (var j = 0; j < n; j++) {
      var x2 = -w / 2 + w * (j + 0.5) / n, rr2 = w * (0.12 + ((j * 37) % 7) / 100), y2 = -rr2 * 0.3 - (j % 2) * rr2 * 0.4;
      s += '<path d="' + rEll(x2, y2, rr2, rr2 * 0.8, 3, (seed || 1041) + j) + '" fill="' + (j % 2 ? "#4A5560" : "#3A444E") + '" stroke="' + INK + '" stroke-width="3"/>';
    }
    s += paper(rRect(-w / 2, -10, w, w * 0.12, 2, (seed || 1041) + 9), "#3A444E", { shadow: false });
    return s + "</g>";
  }
  /* Chiếu nằm (nhìn nghiêng thành dải). Gốc: giữa mép trên. w: dài. */
  function chieu(w) {
    w = w || 420;
    var s = "<g>" + paper(rRect(-w / 2, 0, w, 26, 1.5, 1051), "#D9C48E", { stroke: true, sw: 4, sx: 4, sy: 5 });
    for (var x = -w / 2 + 14; x < w / 2; x += 18) s += line("M " + x + " 2 L " + (x + 6) + " 24", 2, "#A8925A");
    return s + "</g>";
  }
  /* Sóng giấy tạt (bọt cuộn). Gốc: chân sóng, sóng cuộn sang phải. h: cao. */
  function songTat(h, seed) {
    h = h || 260;
    var s = "<g>" + paper("M -120 0 C -110 " + (-h * 0.6) + " -20 " + (-h) + " 70 " + (-h * 0.9) + " C 130 " + (-h * 0.84) + " 150 " + (-h * 0.6) + " 120 " + (-h * 0.52) + " C 100 " + (-h * 0.66) + " 60 " + (-h * 0.66) + " 40 " + (-h * 0.5) + " C 20 " + (-h * 0.3) + " 40 -10 60 0 Z", "#4FB8B2", { stroke: true, sw: 5, sx: 5, sy: 7 });
    s += '<path d="M -70 ' + (-h * 0.5) + " C -50 " + (-h * 0.86) + " 40 " + (-h * 0.96) + " 100 " + (-h * 0.8) + '" fill="none" stroke="#EAF7F2" stroke-width="10" stroke-linecap="round"/>';
    var r = rng(seed || 1061);
    for (var k = 0; k < 7; k++) s += '<circle cx="' + f1(60 + r() * 90) + '" cy="' + f1(-h * (0.75 + r() * 0.35)) + '" r="' + f1(6 + r() * 10) + '" fill="#EAF7F2" stroke="' + INK + '" stroke-width="2"/>';
    return s + "</g>";
  }

  /* Wob nhìn từ sau (gáy + vành mũ làm tiền cảnh): như wob() nhưng bỏ mắt, miệng, má, tay; ba lô lưng ẩn mặc định.
     Cùng thân, lục địa, nét mực (lục địa lật ngang vì nhìn từ phía sau). */
  function wobSau(api, id, o) {
    o = o || {};
    var oo = {};
    Object.keys(o).forEach(function (k) { oo[k] = o[k]; });
    if (oo.lung == null) oo.lung = 0;
    var W = wob(api, id, oo);
    W.svg = W.svg.replace(/<ellipse cx="124" cy="204"[^>]*\/><ellipse cx="276" cy="204"[^>]*\/>/, "");
    ["-eyeL", "-eyeR", "-aLu", "-aRu"].forEach(function (p) { api.show("#" + id + p, 0, 0); });
    W.RIG_MOUTHS = G.WobRig.MOUTHS;
    G.WobRig.MOUTHS.forEach(function (m) { api.show("#" + id + "-m-" + m, 0, 0); });
    api.origin("#" + id + "-br", "0 0");
    return W;
  }

  /* Phông lối đi trên đảo: dãy nhà một tầng vai chạm vai (lớp giữa), mái dãy nhà phía sau + trời (lớp xa), nền xi măng,
     dây phơi / ghế nhựa tiền cảnh (lớp gần). Hai đoạn "cùng con phố" gọi cùng cấu hình, khác vùng camera.
     o: { seed, mat: 900 (mặt đường lớp giữa), tu: -800, den: 4000,
          nha: [[x, w, h, mau, oNha]] (oNha truyền cho nha(): cua, cuaMo, so, soX, tranh, tranhX, mai…; mau: chỉ số M.tuong hoặc màu),
          sauNha: true (mái dãy nhà phía sau ở lớp xa), ghe: [[x, mau, lop "giua"|"gan", cỡ]], phoi: [[x0, y0, x1, y1, võng, lop]],
          dem: true (cửa sổ sáng, phủ xanh đêm do canh.js thêm) }
     Trả { troi, xa, giua, gan, mat }. */
  function loiDi(api, o) {
    o = o || {};
    var sd = o.seed || 1100, r = rng(sd), MAT = o.mat || 900, X0 = o.tu == null ? -800 : o.tu, X1 = o.den == null ? 4000 : o.den;
    var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#' + (o.dem ? "ndTroiDem" : "ndTroi") + ')"/>';
    var xa = "";
    if (o.sauNha !== false) {
      for (var x = X0 * 0.35 - 400; x < X1 * 0.35 + 1400; ) {
        var w = 160 + r() * 120, h = 120 + r() * 60;
        xa += '<g transform="translate(' + f1(x + w / 2) + "," + f1(MAT - 250 + r() * 20) + ') scale(0.8)">' + nha({ w: w, h: h, seed: sd + Math.round(x), cua: false, so: r() < 0.5 ? 1 : 0, maiMau: r() < 0.8 ? "#C4CCCF" : "#D9A27E" }) + "</g>";
        x += w * 0.8 - 6;
      }
      xa += '<rect x="' + (X0 * 0.35 - 600) + '" y="' + (MAT - 270) + '" width="' + ((X1 - X0) * 0.35 + 2400) + '" height="600" fill="#FFFFFF" opacity="0.12"/>';
    }
    var giua = paper(rRect(X0 - 400, MAT - 6, X1 - X0 + 800, 500, 2, sd + 1), M.nen, { shadow: false, half: 0.08 }) +
      line("M " + (X0 - 400) + " " + (MAT - 4) + " L " + (X1 + 400) + " " + (MAT - 4), 4, INK, ' opacity="0.45"');
    for (var cr = X0 - 300; cr < X1 + 300; cr += 210 + r() * 90) giua += line("M " + f1(cr) + " " + (MAT + 20) + " L " + f1(cr - 40) + " " + (MAT + 180), 2.5, "#B8B0A0", ' opacity="0.6"');
    (o.nha || []).forEach(function (n, i) {
      var oo = {}; Object.keys(n[4] || {}).forEach(function (k) { oo[k] = n[4][k]; });
      oo.w = n[1]; oo.h = n[2]; oo.seed = oo.seed || sd + 31 * i;
      oo.mau = typeof n[3] === "number" ? M.tuong[n[3] % M.tuong.length] : n[3];
      giua += '<g transform="translate(' + f1(n[0]) + "," + MAT + ')">' + nha(oo) + "</g>";
    });
    var gan = "";
    (o.ghe || []).forEach(function (c) {
      var s = '<g transform="translate(' + f1(c[0]) + "," + (c[2] === "gan" ? MAT + 150 : MAT + 4) + ") scale(" + (c[3] || 0.6) + ')">' + ghe({ mau: c[1] }) + "</g>";
      if (c[2] === "gan") gan += s; else giua += s;
    });
    (o.phoi || []).forEach(function (p) {
      var s = dayPhoi(p[0], p[1], p[2], p[3], p[4] || 30, { seed: sd + p[0] });
      if (p[5] === "giua") giua += s; else gan += s;
    });
    return { troi: troi, xa: xa, giua: giua, gan: gan, mat: MAT };
  }

  G.NhietDoi = {
    wobSau: wobSau, loiDi: loiDi,
    M: M, defs: defs, muCoiInner: muCoiInner, muCoi: muCoi, binhXit: binhXit, baLo: baLo, wob: wob,
    thuyen: thuyen, bien: bien, nha: nha, daoNhaXa: daoNhaXa, daoXanh: daoXanh, daoDuoc: daoDuoc, daoTroTrui: daoTroTrui, daoTuTren: daoTuTren,
    sanBong: sanBong, bong: bong, ghe: ghe, meo: meo, dayPhoi: dayPhoi, thanhGia: thanhGia, nguoi: nguoi, dongHo: dongHo, vot: vot, voSo: voSo,
    manh: manh, theChu: theChu, bienHoi: bienHoi, muiTen: muiTen, trang: trang, sao: sao, mayBao: mayBao, chieu: chieu, songTat: songTat
  };
})(typeof window !== "undefined" ? window : globalThis);
