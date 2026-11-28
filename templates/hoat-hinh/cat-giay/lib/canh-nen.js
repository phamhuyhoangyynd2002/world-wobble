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

/* ===== Bộ xứ lạnh window.XuLanh (thêm 28/11/2026, tập 6 Kiruna, nhóm A cắt giấy) =====
   Khối riêng nối cuối canh-nen.js (không đổi hàm cũ). canh.js chèn XuLanh.defs() một lần trong api.dat(...).
   Trang phục chung cho cả hai nhóm thợ: áo phao xanh lam MỘT túi vá bên phải (phía tay "R" của rig), khăn kem sọc xanh lá thông
   (sọc dày, đọc rõ ở trung cảnh), mũ len xanh lá thông, ba lô ô liu cỡ thường; gi-lê kem mùa hè + kính râm; ở nhà không đồ.
   Chìa khoá: chìa sắt than đầu tròn có lỗ, thẻ gỗ dây đỏ (vệt mực, KHÔNG chữ); chùm chìa nhà ba chìa (đồng, bạc, đầu nhựa xanh).
   Không chữ cứng trong hàm; tất định (mọi nhiễu qua DaoCu.rng). */
(function (G) {
  "use strict";
  var D = G.DaoCu, INK = D.INK, paper = D.paper, rRect = D.rRect, rEll = D.rEll, rough = D.rough, line = D.line, f1 = D.f1, rng = D.rng;
  var M = {
    ao: "#3D5A80", aoToi: "#2B4262", aoSang: "#5A7BA6", khoa: "#EFE3C8",
    mu: "#4F7A5A", muVanh: "#3A5C43", bong: "#F6EEDC", khan: "#EFE3C8", khanSoc: "#4F7A5A",
    gile: "#E9DDC3", gileVien: "#B9A983", kinh: "#1F2326",
    oliu: "#7C8646", oliuToi: "#566030", tham: "#C9463A",
    chia: "#3A3F44", chiaSang: "#6A727A", theGo: "#B98A5A", theGoToi: "#8E6538", day: "#C9463A",
    dong: "#C9A24A", bac: "#B8BDC2", nhuaXanh: "#4F7A5A",
    nhaTho: "#A8322A", nhaThoToi: "#6E1F1A",
    go: "#8A6440", goToi: "#5E4228", goSang: "#B08A5E",
    gang: "#4A5450", gangToi: "#343C39", gangSang: "#66716C",
    da: ["#7A6E62", "#6A5F55", "#5A5049", "#4C443E"], quang: "#2A2A30", quangSang: "#4A4A55",
    nha: ["#B4443A", "#D49A3A", "#3F6E9A", "#5E8E6A", "#C9B48A", "#8E4A3A", "#E2C46A"],
    S: { giay: "#E8D4A8", giayToi: "#D2B985", giaySang: "#F1E2BE", muc: "#5A4430", nau: "#8E6E4A", nauNhat: "#B89A70" }
  };
  function at(x, y, s, sc) { return '<g transform="translate(' + f1(x) + "," + f1(y) + ")" + (sc != null && sc !== 1 ? " scale(" + sc + ")" : "") + '">' + s + "</g>"; }
  function g(id, s, tr) { return "<g" + (id ? ' id="' + id + '"' : "") + (tr ? ' transform="' + tr + '"' : "") + ">" + s + "</g>"; }
  function rr(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    return "M " + f1(x + r) + " " + f1(y) + " L " + f1(x + w - r) + " " + f1(y) + " Q " + f1(x + w) + " " + f1(y) + " " + f1(x + w) + " " + f1(y + r) +
      " L " + f1(x + w) + " " + f1(y + h - r) + " Q " + f1(x + w) + " " + f1(y + h) + " " + f1(x + w - r) + " " + f1(y + h) + " L " + f1(x + r) + " " + f1(y + h) +
      " Q " + f1(x) + " " + f1(y + h) + " " + f1(x) + " " + f1(y + h - r) + " L " + f1(x) + " " + f1(y + r) + " Q " + f1(x) + " " + f1(y) + " " + f1(x + r) + " " + f1(y) + " Z";
  }
  function vong(cx, cy, R, r) {   // vành khuyên (lỗ trong suốt, fill-rule evenodd)
    return "M " + f1(cx - R) + " " + f1(cy) + " a " + R + " " + R + " 0 1 0 " + (2 * R) + " 0 a " + R + " " + R + " 0 1 0 " + (-2 * R) + " 0 Z M " +
      f1(cx - r) + " " + f1(cy) + " a " + r + " " + r + " 0 1 1 " + (2 * r) + " 0 a " + r + " " + r + " 0 1 1 " + (-2 * r) + " 0 Z";
  }

  function defs() {
    return "<defs>" +
      '<linearGradient id="xlTroiChieu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26355A"/><stop offset="0.5" stop-color="#5A6A93"/><stop offset="0.82" stop-color="#B7A2A6"/><stop offset="1" stop-color="#E8BE92"/></linearGradient>' +
      '<linearGradient id="xlTroiDem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#132036"/><stop offset="0.6" stop-color="#253A5A"/><stop offset="1" stop-color="#3D5677"/></linearGradient>' +
      '<linearGradient id="xlTroiNgay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FB4CC"/><stop offset="0.6" stop-color="#C9DCE4"/><stop offset="1" stop-color="#EEEBE0"/></linearGradient>' +
      '<linearGradient id="xlTroiHong" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6F86AE"/><stop offset="0.55" stop-color="#C6B3C2"/><stop offset="1" stop-color="#F0CFAE"/></linearGradient>' +
      '<radialGradient id="xlDen" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE0A0" stop-opacity="0.75"/><stop offset="0.5" stop-color="#FFC878" stop-opacity="0.25"/><stop offset="1" stop-color="#FFB86A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="xlDenBan" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE6A8" stop-opacity="0.6"/><stop offset="0.55" stop-color="#FFC27A" stop-opacity="0.22"/><stop offset="1" stop-color="#FFB86A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="xlDenMo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFF4C8" stop-opacity="0.9"/><stop offset="1" stop-color="#FFF4C8" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="xlSep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EEDDB6"/><stop offset="1" stop-color="#DCC292"/></linearGradient>' +
      '<radialGradient id="xlSepVi" cx="0.5" cy="0.5" r="0.7"><stop offset="0.55" stop-color="#8E6E4A" stop-opacity="0"/><stop offset="1" stop-color="#8E6E4A" stop-opacity="0.4"/></radialGradient>' +
      '<linearGradient id="xlBangG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4FBFD"/><stop offset="0.5" stop-color="#D3EAF2"/><stop offset="1" stop-color="#A9CFE0"/></linearGradient>' +
      '<radialGradient id="xlBangSang" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#C8F0FF" stop-opacity="0.85"/><stop offset="1" stop-color="#7FC4E8" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="xlNuocCoc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFE0EE" stop-opacity="0.75"/><stop offset="1" stop-color="#86B9CF" stop-opacity="0.85"/></linearGradient>' +
      '<pattern id="xlGo" width="160" height="40" patternUnits="userSpaceOnUse"><rect width="160" height="40" fill="#9A6E44"/><path d="M 0 12 C 40 6 80 18 160 10 M 0 30 C 50 26 110 36 160 28" stroke="#7A5434" stroke-width="2.5" fill="none" opacity="0.6"/><path d="M 0 39 L 160 39" stroke="#5E4228" stroke-width="2"/></pattern>' +
      '<pattern id="xlTuong" width="48" height="48" patternUnits="userSpaceOnUse"><rect width="48" height="48" fill="#D9C4A0"/><rect x="0" width="16" height="48" fill="#CDB68E" opacity="0.7"/><circle cx="32" cy="12" r="2.4" fill="#B79E74" opacity="0.6"/><circle cx="32" cy="36" r="2.4" fill="#B79E74" opacity="0.6"/></pattern>' +
      '<pattern id="xlBangVan" width="90" height="90" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)"><rect width="90" height="90" fill="#E6F4F8"/><path d="M 0 30 L 90 22 M 10 70 L 80 60 M 40 0 L 30 90" stroke="#B9DCEA" stroke-width="2.5" fill="none"/><path d="M 60 10 L 70 30 L 52 40" stroke="#FFFFFF" stroke-width="3" fill="none" opacity="0.8"/></pattern>' +
      "</defs>";
  }

  /* ---------- trang phục Wob ---------- */
  function sleeves(svg, mau) {
    return svg.replace(/<path d="M 0 0 L 0 (48|46)"([^>]*?)stroke="#1f2326"([^>]*?)stroke-width="13"([^>]*?)\/>/g, function (m, n, a, b, c) {
      return '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="#1f2326"' + b + 'stroke-width="26"' + c + "/>" +
        '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="' + mau + '"' + b + 'stroke-width="16"' + c + "/>" +
        '<path d="M -6 ' + (+n - 8) + ' L 6 ' + (+n - 8) + '" stroke="' + M.aoToi + '" stroke-width="3" fill="none"/>';
    });
  }
  /* Thẻ gỗ dây đỏ thò khỏi miệng túi (toạ độ Wob 400×400): dây vắt qua nắp túi phải, thẻ treo ở mép phải túi (đổi 28/11: bản cũ chĩa lên bị khăn che). */
  function theThoTui() {
    // dây đỏ vắt qua nắp túi, thẻ gỗ treo lủng lẳng bên mép phải túi (không bị khăn che)
    return line("M 292 338 C 296 322 322 320 332 334", 4, M.day) +
      '<g transform="translate(333,334) rotate(-8)">' + paper(rr(-12, 0, 24, 36, 4), M.theGo, { stroke: true, sw: 3, sx: 2, sy: 3 }) +
      '<circle cx="0" cy="7" r="3" fill="#5A3E22"/>' + line("M -6 20 C -2 17 2 23 6 20", 2.5, "#5A3E22", ' opacity="0.45"') + "</g>";
  }
  /* Wob của tập (áo phao / gi-lê / ở nhà). Trả bộ điều khiển của api.wob + W.xl (selector) + W.theTui(t, 0|1), W.dutTui(t), W.choang(t, 0|1), W.baLo(t, 0|1).
     o: như api.wob, thêm:
       ao: "phao" (mặc định) | "gile" | null (ở nhà: không áo, không mũ, không khăn trừ khi truyền),
       kinh: 1|0 kính râm tròn (nhóm id-kinh), noPack: không đeo ba lô, aoCuon: áo phao cuộn trên nắp ba lô (mùa hè),
       muBaoHo: true | "to" mũ bảo hộ trắng có đèn (nhóm id-mbh, đèn id-mbhDen; thay mũ len), the: 1 thẻ gỗ thò khỏi túi lúc đầu,
       cuc: 1 túi phồng (chìa trong túi), chum: true | "nha" chùm chìa móc ở quai ba lô (nhóm id-chum; "nha" = không có chìa Kiruna), khongMu, khongKhan.
     Mặc định mùa đông: mũ len #4F7A5A vành #3A5C43, khăn #EFE3C8 sọc #4F7A5A (sọc dày 10). Không lông mi (tạo hình gốc). */
  function wob(api, id, o) {
    o = o || {};
    var ao = o.ao === undefined ? "phao" : o.ao, rieng = ["ao", "kinh", "noPack", "aoCuon", "muBaoHo", "the", "cuc", "chum", "khongMu", "khongKhan"];
    var oo = {};
    Object.keys(o).forEach(function (k) { if (rieng.indexOf(k) < 0) oo[k] = o[k]; });
    if (ao === "phao") {
      if (oo.scarf === undefined && !o.khongKhan) oo.scarf = true;
      if (oo.mu === undefined && !o.khongMu && !o.muBaoHo) oo.mu = M.mu;
    }
    var khan = null;   // khăn vẽ riêng đè lên cổ áo (sọc dày đọc rõ), thay khăn mảnh của rig
    if (oo.scarf) { khan = { c: oo.khan || M.khan, soc: oo.khanSoc || M.khanSoc }; delete oo.scarf; delete oo.khan; delete oo.khanSoc; }
    if (oo.mu) { if (oo.mu === true) oo.mu = M.mu; oo.muVanh = oo.muVanh || M.muVanh; }
    var pk = "", sau = "";
    var C = ao === "gile" ? M.gile : M.ao, CT = ao === "gile" ? M.gileVien : M.aoToi;
    if (ao) {
      sau += '<g id="' + id + '-aoSau">' + paper("M 64 318 C 30 270 36 200 74 156 L 326 156 C 364 200 370 270 336 318 Z", C, { stroke: true, sw: 6, shadow: false });
      if (ao === "phao") sau += line("M 48 212 L 70 214 M 40 256 L 64 258 M 330 214 L 352 212 M 336 258 L 360 256", 4, CT);
      sau += "</g>";
      var vat = ao === "gile" ? "M 70 298 C 120 322 280 322 330 298 L 336 346 C 270 364 130 364 64 346 Z" : "M 66 290 C 120 316 280 316 334 290 L 348 372 C 270 396 130 396 52 372 Z";
      pk += '<g id="' + id + '-aoTruoc">' + paper(vat, C, { stroke: true, sw: 5, sx: 4, sy: 6 });
      if (ao === "phao") {
        pk += line("M 58 340 C 130 362 270 362 342 340", 4, CT) + line("M 55 358 C 130 380 270 380 345 358", 3.5, CT, ' opacity="0.8"');
        pk += line("M 200 318 L 200 388", 9) + line("M 200 318 L 200 388", 5, M.khoa) + '<rect x="194" y="326" width="12" height="16" rx="3" fill="' + M.khoa + '" stroke="' + INK + '" stroke-width="2.5"/>';
      } else {
        pk += line("M 196 318 L 190 362 M 204 318 L 210 362", 4) + line("M 76 304 C 130 326 186 326 194 322 M 324 304 C 270 326 214 326 206 322", 3, CT, ' stroke-dasharray="6 5"');
      }
      pk += '<g id="' + id + '-tui">';
      pk += '<g id="' + id + '-tuiCuc">' + paper("M 258 344 C 256 322 316 320 316 344 Z", C, { stroke: true, sw: 3.5, shadow: false }) + "</g>";
      pk += paper(rRect(258, 334, 58, 42, 1.2, 4401), C, { stroke: true, sw: 4, shadow: false });
      pk += line("M 264 370 L 310 370", 2.5, CT, ' stroke-dasharray="5 4"');
      pk += '<g id="' + id + '-the">' + theThoTui() + "</g>";
      pk += paper("M 255 330 L 319 330 L 317 346 L 257 346 Z", CT, { stroke: true, sw: 3.5, shadow: false });
      pk += '<circle cx="287" cy="339" r="3.5" fill="' + M.khoa + '" stroke="' + INK + '" stroke-width="1.5"/></g>';
      pk += "</g>";
    }
    if (khan) {
      var band = "M 58 266 C 120 296 280 296 342 266 L 346 300 C 280 330 120 330 54 300 Z";
      pk += '<g id="' + id + '-khan">' + paper(band, khan.c, { stroke: true, sw: 5, sx: 3, sy: 5 }) +
        line("M 57 277 C 120 307 280 307 343 277", 8, khan.soc) + line("M 55 290 C 120 320 280 320 345 290", 8, khan.soc) +
        '<g transform="translate(128,302)"><g id="' + id + '-khanDuoi">' + paper("M -18 -6 C -26 24 -30 54 -24 86 L 12 88 C 10 58 14 28 20 -4 Z", khan.c, { stroke: true, sw: 4.5, shadow: false }) +
        line("M -22 26 C -10 29 4 29 16 25 M -25 44 C -12 47 2 47 14 44", 7, khan.soc) + line("M -22 86 L -24 100 M -10 87 L -11 101 M 2 88 L 2 102", 4) + "</g></g></g>";
    }
    if (o.muBaoHo) {
      var k = o.muBaoHo === "to" ? 1.22 : 1;
      pk += '<g id="' + id + '-mbh"><g transform="translate(200,98) scale(' + k + ') translate(-200,-98)">';
      pk += '<path d="M 96 98 C 98 30 150 4 200 4 C 250 4 302 30 304 98 Z" fill="#0b1214" opacity="0.18" transform="translate(5,6)"/>';
      pk += paper("M 96 98 C 98 30 150 4 200 4 C 250 4 302 30 304 98 Z", "#F4F2EA", { stroke: true, sw: 6, shadow: false });
      pk += line("M 200 6 L 200 96", 5, "#D8D4C6") + line("M 150 18 C 140 40 136 70 138 96 M 250 18 C 260 40 264 70 262 96", 3, "#D8D4C6");
      pk += paper(rRect(76, 90, 248, 20, 1, 4411), "#E6E2D4", { stroke: true, sw: 5, shadow: false });
      pk += '<g id="' + id + '-mbhDen"><circle cx="200" cy="54" r="70" fill="url(#xlDenMo)" opacity="0.8"/></g>';
      pk += '<rect x="182" y="40" width="36" height="28" rx="6" fill="#4A5450" stroke="' + INK + '" stroke-width="4"/><circle cx="200" cy="54" r="10" fill="#FFF4C8" stroke="' + INK + '" stroke-width="3"/>';
      pk += line("M 120 36 C 140 22 166 14 188 14", 6, "#FFFFFF", ' opacity="0.6"');
      pk += "</g></g>";
    }
    pk += '<g id="' + id + '-kinh">' + '<circle cx="160" cy="158" r="36" fill="' + M.kinh + '" opacity="0.78"/><circle cx="238" cy="158" r="36" fill="' + M.kinh + '" opacity="0.78"/>' +
      '<circle cx="160" cy="158" r="36" fill="none" stroke="' + INK + '" stroke-width="7"/><circle cx="238" cy="158" r="36" fill="none" stroke="' + INK + '" stroke-width="7"/>' +
      line("M 196 150 C 200 142 198 142 202 150", 6) + line("M 124 152 L 84 140 M 274 152 L 316 140", 6) +
      line("M 142 140 C 150 132 160 130 168 132 M 220 140 C 228 132 238 130 246 132", 5, "#FFFFFF", ' opacity="0.55"') + "</g>";
    pk += '<g id="' + id + '-xoay">' + [160, 238].map(function (x) {
      return '<ellipse cx="' + x + '" cy="156" rx="25" ry="31" fill="#fffdf6" stroke="' + INK + '" stroke-width="5"/>' +
        line("M " + x + " 156 C " + (x + 8) + " 150 " + (x + 12) + " 162 " + (x + 2) + " 166 C " + (x - 12) + " 170 " + (x - 16) + " 150 " + (x - 4) + " 142 C " + (x + 12) + " 134 " + (x + 22) + " 156 " + (x + 16) + " 170", 4.5);
    }).join("") + "</g>";
    if (o.phuKien) pk += o.phuKien;
    if (o.chum) pk += '<g id="' + id + '-chum"><g transform="translate(300,150) scale(0.42)">' + chumChia(id + "-cc", { kiruna: o.chum !== "nha" }) + "</g></g>";
    oo.phuKien = pk;
    var W = api.wob(id, oo), s = W.svg;
    if (sau) s = s.replace('<g id="' + id + '-up">', '<g id="' + id + '-up">' + sau);
    var a = s.indexOf('<g id="' + id + '-pack">'), b = s.indexOf('<clipPath id="' + id + '-clip">');
    if (a >= 0 && b > a) {
      var seg = s.slice(a, b).replace(/#b8743a/g, M.oliu).replace(/#8e5527/g, M.oliuToi).replace(/#d9543c/g, M.tham);
      if (o.aoCuon) { var e = seg.lastIndexOf("</g>"); seg = seg.slice(0, e) + paper(rr(256, 98, 106, 26, 12), M.ao, { stroke: true, sw: 5, shadow: false }) + line("M 276 102 L 276 120 M 340 102 L 340 120", 3, M.aoToi) + seg.slice(e); }
      s = s.slice(0, a) + seg + s.slice(b);
    }
    s = s.replace(/#8e5527/g, M.oliuToi);
    s = s.replace(/((?:<path d="M 300 96 C 286 130 284 168 300 206"[^>]*\/>)+)/, '<g id="' + id + '-quai">$1</g>');
    if (oo.mu) s = s.replace(/#8E2C24/g, "#2C4A34").replace(/#6E2019/g, "#28402E");
    if (ao === "phao") s = sleeves(s, M.ao);
    W.svg = s;
    W.set(0, { lashes: 0, ice: 0 });
    W.xl = { tui: "#" + id + "-tui", the: "#" + id + "-the", cuc: "#" + id + "-tuiCuc", kinh: "#" + id + "-kinh", xoay: "#" + id + "-xoay", mbh: "#" + id + "-mbh", mbhDen: "#" + id + "-mbhDen",
      khan: "#" + id + "-khan", khanDuoi: "#" + id + "-khanDuoi", chum: "#" + id + "-chum", pack: "#" + id + "-pack", quai: "#" + id + "-quai", aoSau: "#" + id + "-aoSau", aoTruoc: "#" + id + "-aoTruoc" };
    if (ao) { api.show(W.xl.the, 0, o.the ? 1 : 0); api.show(W.xl.cuc, 0, o.cuc || o.the ? 1 : 0); }
    api.show(W.xl.kinh, 0, o.kinh ? 1 : 0); api.show(W.xl.xoay, 0, 0);
    if (o.noPack) { api.show(W.xl.pack, 0, 0); api.show(W.xl.quai, 0, 0); }
    if (khan) {   // đuôi khăn đung đưa theo bước đi (thay khớp scarf của rig)
      api.origin(W.xl.khanDuoi, "0 0");
      var walk0 = W.walk;
      W.walk = function (t0, t1, x0, x1, wo) {
        var r0 = walk0.call(W, t0, t1, x0, x1, wo), n = Math.max(2, Math.round((t1 - t0) / ((wo && wo.step) || 0.3))), dt = (t1 - t0) / n;
        for (var i = 0; i <= n; i++) api.key(W.xl.khanDuoi, "rotation", t0 + i * dt, i === n ? 0 : (i % 2 ? 9 : -6) * (x1 >= x0 ? 1 : -1), "sine.inOut");
        return r0;
      };
    }
    W.theTui = function (t, v) { api.show(W.xl.the, t, v); api.show(W.xl.cuc, t, v); };
    W.dutTui = function (t, dur) { W.pose(t, dur || 0.3, { aRu: 9, aRf: 3 }, "power2.inOut"); };
    W.choang = function (t, v) { api.show(W.xl.xoay, t, v); };
    W.baLo = function (t, v) { api.show(W.xl.pack, t, v); api.show(W.xl.quai, t, v); };
    return W;
  }

  /* ---------- chìa khoá ---------- */
  function keyShape(mau, o) {   // một chìa trơn, gốc tâm lỗ đầu, thân xuống (+y), dài ≈ 110
    o = o || {};
    var s = "";
    if (o.dauNhua) s += paper(rr(-20, -20, 40, 40, 12), o.dauNhua, { stroke: true, sw: 3.5, sx: 2, sy: 3 }) + '<circle cx="0" cy="-6" r="6" fill="#EFE3C8" stroke="' + INK + '" stroke-width="2.5"/>';
    else s += '<path d="' + vong(0, 0, o.R || 20, 7) + '" fill="' + mau + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="3.5"/>';
    s += '<path d="M -6 18 L 6 18 L 6 70 L 18 70 L 18 78 L 10 78 L 10 84 L 18 84 L 18 94 L 6 94 L 6 100 L -6 100 Z" fill="' + (o.than || mau) + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>';
    s += line("M -2 24 L -2 90", 2.5, "#FFFFFF", ' opacity="0.4"');
    return s;
  }
  /* Chìa khoá Kiruna: sắt than #3A3F44, đầu tròn có lỗ, răng thô; thẻ gỗ #B98A5A buộc dây đỏ, một vệt mực mờ (KHÔNG chữ).
     Gốc: tâm lỗ đầu chìa; thân hướng xuống, thẻ treo lệch trái. Dài ≈ 120 ở s = 1 (cầm ở bàn cho dài ≈ 1/3 thân Wob: s ≈ 1,1 với Wob size 1).
     o: { the (true), goc (độ xoay cả chìa), s } . Nhóm con id+"-the" (thẻ, xoay quanh lỗ: origin "0 0"). */
  function chiaKhoa(id, o) {
    o = o || {};
    var s = "<g" + (id ? ' id="' + id + '"' : "") + (o.goc || o.s ? ' transform="rotate(' + (o.goc || 0) + ") scale(" + (o.s || 1) + ')"' : "") + ">";
    if (o.the !== false) {
      s += "<g" + (id ? ' id="' + id + '-the"' : "") + ">" + line("M -2 -2 C -16 4 -28 18 -32 38", 4, M.day);
      s += '<g transform="translate(-32,38) rotate(14)">' + paper(rr(-18, 0, 36, 52, 7), M.theGo, { stroke: true, sw: 3.5, sx: 3, sy: 4 }) +
        '<circle cx="0" cy="9" r="4.5" fill="#5A3E22"/>' + line("M -10 26 C -4 21 4 33 11 27 M -8 38 C -2 35 2 41 8 38", 3, "#5A3E22", ' opacity="0.35"') +
        line("M -12 4 L -12 46", 2, "#D9B282", ' opacity="0.7"') + "</g></g>";
    }
    s += '<path d="' + vong(0, 0, 22, 8) + '" fill="' + M.chia + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="4"/>';
    s += '<path d="M -7 20 L 7 20 L 7 76 L 24 76 L 24 86 L 14 86 L 14 92 L 26 92 L 26 104 L 15 104 L 15 110 L 7 110 L 7 116 L -7 116 Z" fill="' + M.chia + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    s += line("M -2 26 L -2 108", 3, M.chiaSang, ' opacity="0.8"') + line("M -14 -10 C -8 -16 0 -18 8 -16", 3, M.chiaSang);
    return s + "</g>";
  }
  /* Chùm chìa nhà: vòng bạc + chìa đồng vàng, chìa bạc, chìa đầu nhựa xanh lá thông; o.kiruna: có chìa Kiruna (nhóm id+"-kir").
     Gốc: điểm treo đỉnh vòng (móc). Cao ≈ 170. */
  function chumChia(id, o) {
    o = o || {};
    var s = "<g" + (id ? ' id="' + id + '"' : "") + ">";
    s += '<circle cx="0" cy="30" r="28" fill="none" stroke="' + INK + '" stroke-width="10"/><circle cx="0" cy="30" r="28" fill="none" stroke="' + M.bac + '" stroke-width="5"/>';
    s += line("M -8 6 C -4 0 4 0 8 6", 3, "#FFFFFF", ' opacity="0.7"');
    s += '<g transform="translate(-20,52) rotate(28) scale(0.72)">' + keyShape(M.dong) + "</g>";
    s += '<g transform="translate(-4,58) rotate(8) scale(0.72)">' + keyShape(M.bac, { R: 17 }) + "</g>";
    s += '<g transform="translate(14,54) rotate(-16) scale(0.72)">' + keyShape(M.bac, { dauNhua: M.nhuaXanh, than: "#C9CDD2" }) + "</g>";
    if (o.kiruna) s += '<g' + (id ? ' id="' + id + '-kir"' : "") + ' transform="translate(26,46) rotate(-38) scale(0.66)">' + chiaKhoa("", { the: true }) + "</g>";
    return s + "</g>";
  }

  /* ---------- người que / người giấy chung (KHÔNG mặt) ----------
     Gốc: giữa chân. Cao ≈ 230 ở s = 1. Nhóm: id-vt (x, y: canh.js đặt), id-dau, id-tL / id-tR (tay, gốc vai), id-cL / id-cR (chân, gốc hông).
     o: { s, ao, quan, da, mu: "phot" | "toc" | "trum" | null, dai (áo choàng dài chạm đất), cam: SVG cầm tay phải (gốc bàn tay), camL, lat (-1 quay trái), sep (tông giấy cũ) } */
  function nguoiQue(api, id, o) {
    o = o || {};
    var sep = !!o.sep, ao = o.ao || (sep ? "#8E6E4A" : "#6A7FA0"), quan = o.quan || (sep ? "#5A4430" : "#3E4A58"), da = o.da || (sep ? "#E3CC9C" : "#E6CFA8");
    var s = "";
    function chan(side) {
      return '<g transform="translate(' + (side * 14) + ',-74)"><g id="' + id + "-c" + (side < 0 ? "L" : "R") + '">' + line("M 0 0 L " + (side * 3) + " 72", 16) + line("M 0 0 L " + (side * 3) + " 72", 9, quan) +
        '<ellipse cx="' + (side * 8) + '" cy="74" rx="15" ry="7" fill="' + INK + '"/></g></g>';
    }
    function tay(side, cam) {
      return '<g transform="translate(' + (side * 34) + ',-150)"><g id="' + id + "-t" + (side < 0 ? "L" : "R") + '">' + line("M 0 0 L " + (side * 4) + " 76", 15) + line("M 0 0 L " + (side * 4) + " 76", 9, ao) +
        '<g transform="translate(' + (side * 4) + ',80)">' + (cam || "") + '<circle cx="0" cy="0" r="9" fill="' + da + '" stroke="' + INK + '" stroke-width="3"/></g></g></g>';
    }
    if (!o.dai) s += chan(-1) + chan(1);
    s += tay(-1, o.camL);
    var than = o.dai ? "M -40 -4 L -34 -150 C -22 -170 22 -170 34 -150 L 40 -4 C 20 4 -20 4 -40 -4 Z" : "M -34 -66 L -32 -150 C -20 -168 20 -168 32 -150 L 34 -66 C 18 -58 -18 -58 -34 -66 Z";
    s += paper(than, ao, { stroke: true, sw: 4, sx: 4, sy: 5, half: 0.08 });
    if (o.dai) s += line("M 0 -150 L 0 -8", 3, INK, ' opacity="0.35"') + line("M -38 -40 C -10 -32 10 -32 38 -40", 3, INK, ' opacity="0.3"');
    s += tay(1, o.cam);
    s += '<g transform="translate(0,-190)"><g id="' + id + '-dau">';
    if (o.mu === "trum") s += paper("M -34 14 C -40 -30 -24 -46 0 -46 C 24 -46 40 -30 34 14 Z", ao, { stroke: true, sw: 4, shadow: false });
    if (o.mu === "toc") s += paper("M -36 18 C -48 0 -44 -30 -24 -40 C -10 -50 10 -50 24 -40 C 44 -30 48 0 36 18 C 30 30 -30 30 -36 18 Z", sep ? "#F1E2BE" : "#EFEDE6", { stroke: true, sw: 3.5, shadow: false });
    s += '<circle cx="0" cy="0" r="26" fill="' + da + '" stroke="' + INK + '" stroke-width="4"/>';
    if (o.mu === "toc") s += '<path d="M -26 -6 C -26 -30 26 -30 26 -6 C 14 -16 -14 -16 -26 -6 Z" fill="' + (sep ? "#F1E2BE" : "#EFEDE6") + '" stroke="' + INK + '" stroke-width="3"/>';
    if (o.mu === "phot") s += paper(rEll(0, -16, 46, 9, 1, 4501), sep ? "#5A4430" : "#3E3A36", { stroke: true, sw: 3, shadow: false }) + paper("M -22 -18 C -22 -50 22 -50 22 -18 Z", sep ? "#6A5038" : "#4A4540", { stroke: true, sw: 3, shadow: false });
    if (o.mu === "trum") s += '<path d="M -30 10 C -32 -22 -18 -38 0 -38 C 18 -38 32 -22 30 10" fill="none" stroke="' + INK + '" stroke-width="3" opacity="0.5"/>';
    s += "</g></g>";
    var sc = o.s || 1;
    ["dau", "tL", "tR", "cL", "cR"].forEach(function (q) { api.origin("#" + id + "-" + q, "0 0"); });
    return '<g id="' + id + '-vt"><g transform="scale(' + f1((o.lat || 1) * sc * 100) / 100 + "," + sc + ')">' + s + "</g></g>";
  }
  /* đi trong [t0, t1] tới x1 (nhóm id-vt); chân đá, đầu nhún. */
  function queDi(api, id, t0, t1, x1, o) {
    o = o || {};
    var K = api.K, vt = "#" + id + "-vt", st = o.buoc || 0.32, n = Math.max(2, Math.round((t1 - t0) / st)), dt = (t1 - t0) / n;
    K.add(vt, "x", t0, K.at(vt, "x", t0), "none"); K.add(vt, "x", t1, x1, "sine.inOut");
    for (var k = 0; k <= n; k++) {
      var t = t0 + k * dt, a = k === n ? 0 : (k % 2 ? 18 : -18);
      K.add("#" + id + "-cL", "rotation", t, a, "sine.inOut"); K.add("#" + id + "-cR", "rotation", t, -a, "sine.inOut");
      if (o.tay !== false) { K.add("#" + id + "-tL", "rotation", t, -a * 0.7, "sine.inOut"); K.add("#" + id + "-tR", "rotation", t, a * 0.7, "sine.inOut"); }
      K.add("#" + id + "-dau", "y", t, 0, "sine.in"); if (k < n) K.add("#" + id + "-dau", "y", t + dt / 2, -5, "sine.out");
    }
  }

  /* ---------- trang giấy cũ, bàn kỷ vật ---------- */
  /* Trang lịch sử tông giấy cũ (sepia), mép xé, viền tối, vết ố. Gốc: góc trên trái. o: { seed, ke } */
  function trangCu(w, h, o) {
    o = o || {};
    var sd = o.seed || 4601, r = rng(sd), s = "<g>";
    var d = rough([[0, 0], [w, 0], [w, h], [0, h]], 5, sd, 22);
    s += '<path d="' + d + '" fill="#0b1214" opacity="0.28" transform="translate(12,16)"/>';
    s += '<path d="' + d + '" fill="url(#xlSep)" stroke="' + M.S.nau + '" stroke-width="4"/>';
    for (var k = 0; k < 5; k++) s += '<path d="' + rEll(r() * w, r() * h, 40 + r() * 90, 30 + r() * 60, 6, sd + 10 + k) + '" fill="' + M.S.nauNhat + '" opacity="0.13"/>';
    if (o.ke) for (var y = 80; y < h - 40; y += 70) s += line("M 40 " + y + " L " + (w - 40) + " " + y, 2, M.S.nauNhat, ' opacity="0.35"');
    s += '<path d="' + d + '" fill="url(#xlSepVi)"/>';
    s += '<path d="' + d + '" fill="url(#half)" opacity="0.05"/>';
    return s + "</g>";
  }
  /* Mặt bàn kỷ vật nhìn từ trên (khung quanh trang sổ): gỗ ấm, vệt đèn bàn, chao đèn cam (cùng màu DaoCu.deskLamp) ở góc, mép bàn tối.
     Trả { nen (gỗ + vệt đèn + cốc trà, dưới trang), den (chao đèn, vẽ trên cùng) }. o: { den: [x, y] (mặc định [1700, 120]), coc: [x, y] | null } */
  function banTuTren(o) {
    o = o || {};
    var dx = (o.den || [1700, 120])[0], dy = (o.den || [1700, 120])[1], nen = "<g>";
    nen += '<rect x="-400" y="-300" width="2720" height="1680" fill="url(#xlGo)"/>';
    nen += '<rect x="-400" y="-300" width="2720" height="1680" fill="#3A2416" opacity="0.18"/>';
    nen += '<ellipse cx="' + (dx - 520) + '" cy="' + (dy + 380) + '" rx="1350" ry="900" fill="url(#xlDenBan)"/>';
    nen += '<rect x="-400" y="1180" width="2720" height="200" fill="#3A2416" opacity="0.55"/>' + line("M -400 1180 L 2320 1180", 6, "#2A1A10");
    if (o.coc !== null) {
      var c = o.coc || [150, 920];
      nen += at(c[0], c[1], '<circle cx="8" cy="10" r="62" fill="#0b1214" opacity="0.25"/><circle cx="0" cy="0" r="62" fill="' + D.C.mug + '" stroke="' + INK + '" stroke-width="5"/><circle cx="0" cy="0" r="48" fill="' + D.C.tea + '" stroke="' + INK + '" stroke-width="3"/>' +
        '<ellipse cx="-14" cy="-14" rx="16" ry="9" fill="#B9773E" opacity="0.6"/>' + '<path d="M 58 -18 C 92 -22 92 22 58 18" fill="none" stroke="' + INK + '" stroke-width="14"/><path d="M 58 -18 C 92 -22 92 22 58 18" fill="none" stroke="' + D.C.mug + '" stroke-width="7"/>');
    }
    nen += "</g>";
    var den = at(dx, dy, '<ellipse cx="14" cy="18" rx="150" ry="150" fill="#0b1214" opacity="0.25"/>' + paper(rEll(0, 0, 150, 150, 3, 4611), D.C.accent, { stroke: true, sw: 7, fringe: "#F3C27A" }) +
      '<circle cx="0" cy="0" r="100" fill="#FFE6A8" stroke="' + INK + '" stroke-width="5"/><circle cx="0" cy="0" r="46" fill="#FFF6D8"/>' + line("M -100 -60 C -70 -100 -20 -118 30 -112", 8, "#FFFFFF", ' opacity="0.35"'));
    return { nen: nen, den: den };
  }

  /* ---------- phòng thuê ---------- */
  /* Đồng hồ báo thức (mặt chỉ có vạch, KHÔNG số). Gốc: giữa đáy. r: bán kính mặt. id-kimG (giờ), id-kimP (phút) xoay quanh tâm mặt (origin "0 0"). */
  function dongHoBao(id, r) {
    r = r || 40;
    var cy = -r - 14, s = '<g id="' + id + '">';
    s += line("M " + f1(-r * 0.6) + " " + f1(cy + r * 0.8) + " L " + f1(-r * 0.8) + " 0 M " + f1(r * 0.6) + " " + f1(cy + r * 0.8) + " L " + f1(r * 0.8) + " 0", 6);
    s += '<g id="' + id + '-chuong">' + paper(rEll(-r * 0.62, cy - r * 0.86, r * 0.42, r * 0.3, 1, 4701), "#C9A24A", { stroke: true, sw: 3.5, shadow: false }) + paper(rEll(r * 0.62, cy - r * 0.86, r * 0.42, r * 0.3, 1, 4702), "#C9A24A", { stroke: true, sw: 3.5, shadow: false }) + "</g>";
    s += '<circle cx="3" cy="' + f1(cy + 4) + '" r="' + (r + 8) + '" fill="#0b1214" opacity="0.22"/><circle cx="0" cy="' + f1(cy) + '" r="' + (r + 8) + '" fill="#3F6A70" stroke="' + INK + '" stroke-width="4.5"/>';
    s += '<circle cx="0" cy="' + f1(cy) + '" r="' + r + '" fill="#FFF8EC" stroke="' + INK + '" stroke-width="3"/>';
    for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6, l = i % 3 ? 0.12 : 0.22; s += line("M " + f1(Math.sin(a) * r * 0.9) + " " + f1(cy - Math.cos(a) * r * 0.9) + " L " + f1(Math.sin(a) * r * (0.9 - l)) + " " + f1(cy - Math.cos(a) * r * (0.9 - l)), i % 3 ? 2.5 : 4); }
    s += '<g transform="translate(0,' + f1(cy) + ')"><g id="' + id + '-kimG">' + line("M 0 4 L 0 " + f1(-r * 0.5), 6) + '</g><g id="' + id + '-kimP">' + line("M 0 6 L 0 " + f1(-r * 0.78), 4) + '</g><circle cx="0" cy="0" r="5" fill="' + INK + '"/></g>';
    return s + "</g>";
  }
  /* Cốc nước thuỷ tinh. Gốc: giữa đáy. Cao 92. id-mat: mặt nước, id-gon: 3 vòng gợn đồng tâm (ẩn; scale quanh tâm mặt nước, origin "0 -60"). */
  function cocNuoc(id) {
    var s = '<g id="' + id + '">';
    s += '<ellipse cx="4" cy="2" rx="38" ry="8" fill="#0b1214" opacity="0.2"/>';
    s += '<path d="M -34 -92 L 34 -92 L 28 0 L -28 0 Z" fill="#E8F4F8" opacity="0.45"/>';
    s += '<path d="M -32 -60 L 32 -60 L 28 0 L -28 0 Z" fill="url(#xlNuocCoc)"/>';
    s += '<g id="' + id + '-mat"><ellipse cx="0" cy="-60" rx="32" ry="7" fill="#D6EEF6" stroke="#5E8FA3" stroke-width="2.5"/></g>';
    s += '<g id="' + id + '-gon">' + [0.35, 0.65, 0.95].map(function (k) { return '<ellipse cx="0" cy="-60" rx="' + f1(30 * k) + '" ry="' + f1(6.5 * k) + '" fill="none" stroke="#3F7A92" stroke-width="2.2"/>'; }).join("") + "</g>";
    s += '<path d="M -34 -92 L 34 -92 L 28 0 L -28 0 Z" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
    s += '<ellipse cx="0" cy="-92" rx="34" ry="7" fill="none" stroke="' + INK + '" stroke-width="3"/>';
    s += line("M -22 -82 L -18 -10", 5, "#FFFFFF", ' opacity="0.7"');
    return s + "</g>";
  }
  /* Lò sưởi gang nhiều lá. Gốc: giữa đáy. n lá, cao h. id-l<i>: từng lá (khép bằng x), id-mat: đôi mắt vẽ tay (gốc tâm hai mắt, ở y = -h*0.62). */
  function loSuoi(id, n, h) {
    n = n || 9; h = h || 200;
    var w = n * 30, s = '<g id="' + id + '">';
    s += '<rect x="' + (-w / 2 + 8) + '" y="' + (-h + 10) + '" width="' + w + '" height="' + (h - 10) + '" fill="#0b1214" opacity="0.2"/>';
    s += line("M " + (-w / 2 - 16) + " " + (-h + 26) + " L " + (w / 2 + 16) + " " + (-h + 26) + " M " + (-w / 2 - 16) + " -26 L " + (w / 2 + 16) + " -26", 16, M.gangToi);
    for (var i = 0; i < n; i++) {
      var x = -w / 2 + i * 30 + 15;
      s += '<g id="' + id + '-l' + i + '">' + paper(rr(x - 13, -h, 26, h - 6, 12), i % 2 ? M.gang : M.gangSang, { stroke: true, sw: 3.5, shadow: false }) + line("M " + (x - 4) + " " + (-h + 18) + " L " + (x - 4) + " -24", 3, "#FFFFFF", ' opacity="0.18"') + "</g>";
    }
    s += line("M " + (-w / 2 - 8) + " -4 L " + (-w / 2 - 8) + " 0 M " + (w / 2 + 8) + " -4 L " + (w / 2 + 8) + " 0", 10, M.gangToi);
    s += '<g transform="translate(0,' + f1(-h * 0.62) + ')"><g id="' + id + '-mat">' +
      [-1, 1].map(function (k) { return '<ellipse cx="' + (k * 40) + '" cy="0" rx="32" ry="40" fill="#FFFDF6" stroke="' + INK + '" stroke-width="5"/><circle cx="' + (k * 40 + 4) + '" cy="6" r="15" fill="' + INK + '"/><circle cx="' + (k * 40 + 9) + '" cy="0" r="5" fill="#fff"/>'; }).join("") + "</g></g>";
    return s + "</g>";
  }
  /* Phòng thuê nhỏ (nhìn thẳng), toạ độ thế giới cố định dùng chung các đoạn: tường x -300..2220, sàn từ y 860.
     Trả { tuong (tường, cửa sổ đêm, cửa ra vào, móc + chùm chìa), sau (lò sưởi, ghế + áo, giường), chan (chăn, vẽ TRÊN Wob), truoc (tủ đầu giường + cốc + đồng hồ),
           vt: { giuong: [x0, x1, mặt nệm], coc, dh, moc, ghe, so: [x, y, w, h], ls, wobNam } }.
     Nhóm (tiền tố id): -coc (-coc-mat, -coc-gon), -dh (-dh-kimG, -dh-kimP), -ls (-ls-l0.., -ls-mat ẩn sẵn), -chum (chùm chìa trên móc, gốc móc; -cc-kir chìa Kiruna),
     -chanP (chăn phẳng), -chanC (chăn cục tròn: ẩn), -gheAo, -gheMu, -gheKhan. o: { chum (true), kiruna (true), aoGhe (true), muGhe (true), dem (true) } */
  function phongThue(api, id, o) {
    o = o || {};
    var r = rng(4801), T = "", S = "", C = "", F = "";
    T += '<rect x="-300" y="-200" width="2520" height="1080" fill="url(#xlTuong)"/>';
    T += '<rect x="-300" y="-200" width="2520" height="1080" fill="#2A2F45" opacity="' + (o.dem === false ? 0 : 0.28) + '"/>';
    T += '<rect x="-300" y="860" width="2520" height="400" fill="url(#xlGo)"/>' + '<rect x="-300" y="860" width="2520" height="400" fill="#1E1A28" opacity="0.25"/>';
    T += paper(rRect(-300, 830, 2520, 34, 1, 4811), "#7A5236", { stroke: true, sw: 4, shadow: false });
    var SO = [1240, 230, 340, 330];
    T += paper(rRect(SO[0] - 22, SO[1] - 22, SO[2] + 44, SO[3] + 44, 1.5, 4812), M.goSang, { stroke: true, sw: 5, sx: 6, sy: 8 });
    T += '<rect x="' + SO[0] + '" y="' + SO[1] + '" width="' + SO[2] + '" height="' + SO[3] + '" fill="url(#xlTroiDem)"/>';
    var maiD = "M " + SO[0] + " " + (SO[1] + 250) + " L " + (SO[0] + 60) + " " + (SO[1] + 190) + " L " + (SO[0] + 130) + " " + (SO[1] + 250) + " L " + (SO[0] + 170) + " " + (SO[1] + 210) + " L " + (SO[0] + 250) + " " + (SO[1] + 160) + " L " + (SO[0] + 340) + " " + (SO[1] + 230);
    T += '<path d="' + maiD + " L " + (SO[0] + 340) + " " + (SO[1] + 330) + " L " + SO[0] + " " + (SO[1] + 330) + ' Z" fill="#1E2C44"/>' + '<path d="' + maiD + '" fill="none" stroke="#F7FBFC" stroke-width="9"/>';
    T += '<rect x="' + (SO[0] + 200) + '" y="' + (SO[1] + 250) + '" width="26" height="30" fill="#FFD68A"/><rect x="' + (SO[0] + 60) + '" y="' + (SO[1] + 270) + '" width="22" height="26" fill="#FFD68A" opacity="0.8"/>';
    for (var k = 0; k < 14; k++) T += '<circle cx="' + f1(SO[0] + 14 + r() * (SO[2] - 28)) + '" cy="' + f1(SO[1] + 10 + r() * 200) + '" r="' + f1(2 + r() * 3) + '" fill="#FFFFFF" opacity="0.85"/>';
    var khung = "M " + (SO[0] + SO[2] / 2) + " " + SO[1] + " L " + (SO[0] + SO[2] / 2) + " " + (SO[1] + SO[3]) + " M " + SO[0] + " " + (SO[1] + SO[3] / 2) + " L " + (SO[0] + SO[2]) + " " + (SO[1] + SO[3] / 2);
    T += line(khung, 10, M.goSang) + line(khung, 3, INK, ' opacity="0.5"');
    T += paper(rRect(SO[0] - 40, SO[1] + SO[3] + 18, SO[2] + 80, 22, 1, 4813), M.goSang, { stroke: true, sw: 4 });
    T += paper("M " + (SO[0] - 70) + " " + (SO[1] - 40) + " L " + (SO[0] + 10) + " " + (SO[1] - 40) + " C " + (SO[0] - 10) + " " + (SO[1] + 120) + " " + (SO[0] + 20) + " " + (SO[1] + 260) + " " + (SO[0] - 30) + " " + (SO[1] + 380) + " L " + (SO[0] - 80) + " " + (SO[1] + 380) + " Z", "#8E5A6A", { stroke: true, sw: 4, half: 0.12 });
    T += paper("M " + (SO[0] + SO[2] + 70) + " " + (SO[1] - 40) + " L " + (SO[0] + SO[2] - 10) + " " + (SO[1] - 40) + " C " + (SO[0] + SO[2] + 10) + " " + (SO[1] + 120) + " " + (SO[0] + SO[2] - 20) + " " + (SO[1] + 260) + " " + (SO[0] + SO[2] + 30) + " " + (SO[1] + 380) + " L " + (SO[0] + SO[2] + 80) + " " + (SO[1] + 380) + " Z", "#8E5A6A", { stroke: true, sw: 4, half: 0.12 });
    T += paper(rRect(1690, 330, 230, 530, 1.5, 4814), "#8A6440", { stroke: true, sw: 5, sx: 6, sy: 8 }) + paper(rRect(1712, 352, 186, 230, 1.2, 4815), "#7A5434", { stroke: true, sw: 3.5, shadow: false }) +
      paper(rRect(1712, 606, 186, 230, 1.2, 4816), "#7A5434", { stroke: true, sw: 3.5, shadow: false }) + '<circle cx="1724" cy="600" r="11" fill="#C9A24A" stroke="' + INK + '" stroke-width="3"/>';
    T += paper(rRect(1590, 512, 70, 20, 1, 4817), M.goToi, { stroke: true, sw: 3.5 }) + line("M 1625 530 C 1625 552 1645 552 1645 540", 5, "#8A8F94");
    if (o.chum !== false) T += '<g transform="translate(1640,544)"><g id="' + id + '-chum"><g transform="scale(0.62)">' + chumChia(id + "-cc", { kiruna: o.kiruna !== false }) + "</g></g></g>";
    S += at(1410, 842, loSuoi(id + "-ls", 9, 190));
    var gx = 190;
    S += at(gx, 860, '<g id="' + id + '-ghe">' + line("M -90 0 L -86 -200 M 90 0 L 86 -200", 16) + line("M -90 0 L -86 -200 M 90 0 L 86 -200", 9, M.go) +
      paper(rRect(-110, -230, 220, 34, 1.5, 4818), M.goSang, { stroke: true, sw: 4 }) + line("M -96 -230 L -100 -470 M 96 -230 L 100 -470", 18) + line("M -96 -230 L -100 -470 M 96 -230 L 100 -470", 10, M.go) +
      paper(rRect(-112, -480, 224, 40, 1.5, 4819), M.goSang, { stroke: true, sw: 4 }) + paper(rRect(-104, -400, 208, 26, 1.5, 4820), M.go, { stroke: true, sw: 3.5 }) + "</g>");
    if (o.aoGhe !== false) S += at(gx, 860, '<g id="' + id + '-gheAo">' + paper("M -128 -486 C -60 -506 60 -506 128 -486 L 140 -300 C 70 -284 -70 -284 -140 -300 Z", M.ao, { stroke: true, sw: 5, sx: 6, sy: 8 }) +
      line("M -134 -440 C -60 -456 60 -456 134 -440 M -136 -390 C -60 -404 60 -404 136 -390 M -138 -340 C -60 -352 60 -352 138 -340", 4, M.aoToi) +
      line("M 0 -500 L 0 -292", 8) + line("M 0 -500 L 0 -292", 4, M.khoa) +
      paper(rRect(30, -380, 70, 52, 1.2, 4821), M.ao, { stroke: true, sw: 4, shadow: false }) + paper("M 27 -386 L 103 -386 L 101 -366 L 29 -366 Z", M.aoToi, { stroke: true, sw: 3.5, shadow: false }) +
      line("M -130 -480 C -150 -420 -156 -360 -148 -300", 22) + line("M -130 -480 C -150 -420 -156 -360 -148 -300", 14, M.ao) + "</g>");
    if (o.muGhe !== false) S += at(gx - 40, 630, '<g id="' + id + '-gheMu">' + paper("M -56 0 C -54 -50 -26 -70 0 -70 C 26 -70 54 -50 56 0 Z", M.mu, { stroke: true, sw: 4, shadow: false }) + paper(rRect(-60, -12, 120, 20, 1, 4822), M.muVanh, { stroke: true, sw: 4, shadow: false }) +
      paper(rEll(0, -76, 16, 14, 2, 4823), M.bong, { stroke: true, sw: 3.5, shadow: false }) + "</g>" +
      '<g id="' + id + '-gheKhan">' + paper("M 40 -6 C 70 -20 120 -18 140 -2 L 140 10 C 110 0 70 0 40 12 Z", M.khan, { stroke: true, sw: 4, shadow: false }) + line("M 60 -8 L 64 6 M 90 -12 L 92 4 M 120 -12 L 120 4", 6, M.khanSoc) + "</g>");
    var G0 = 420, G1 = 1060, NEM = 712;
    S += paper(rRect(G1 - 50, 470, 60, 390, 1.5, 4824), M.goToi, { stroke: true, sw: 5 }) + paper("M " + (G1 - 50) + " 470 C " + (G1 - 40) + " 440 " + G1 + " 440 " + (G1 + 10) + " 470 Z", M.go, { stroke: true, sw: 4 });
    S += paper(rRect(G0 - 30, 640, 40, 220, 1.5, 4830), M.goToi, { stroke: true, sw: 5 });
    S += paper(rRect(G0, NEM, G1 - G0 - 50, 60, 1.5, 4825), "#EDE6D6", { stroke: true, sw: 4.5 }) + paper(rRect(G0 + 10, NEM + 60, G1 - G0 - 70, 70, 1.5, 4826), M.go, { stroke: true, sw: 4.5, shadow: false });
    S += line("M " + (G0 + 20) + " " + (NEM + 130) + " L " + (G0 + 20) + " 860 M " + (G1 - 70) + " " + (NEM + 130) + " L " + (G1 - 70) + " 860", 14, M.goToi);
    S += paper(rEll(G1 - 150, NEM - 18, 90, 34, 3, 4827), "#F6F1E6", { stroke: true, sw: 4.5 });
    C += '<g id="' + id + '-chanP">' + paper("M " + (G0 - 8) + " " + (NEM - 8) + " C " + (G0 + 200) + " " + (NEM - 26) + " " + (G1 - 300) + " " + (NEM - 30) + " " + (G1 - 70) + " " + (NEM - 4) + " L " + (G1 - 60) + " " + (NEM + 110) + " L " + (G0 - 14) + " " + (NEM + 110) + " Z", "#5E86A0", { stroke: true, sw: 5, sx: 6, sy: 8, half: 0.12 }) +
      paper("M " + (G0 + 330) + " " + (NEM - 22) + " C " + (G0 + 420) + " " + (NEM - 30) + " " + (G1 - 160) + " " + (NEM - 34) + " " + (G1 - 70) + " " + (NEM - 6) + " L " + (G1 - 72) + " " + (NEM + 22) + " C " + (G1 - 200) + " " + (NEM + 4) + " " + (G0 + 400) + " " + (NEM + 6) + " " + (G0 + 330) + " " + (NEM + 14) + " Z", "#EDE6D6", { stroke: true, sw: 4, shadow: false }) +
      line("M " + (G0 + 40) + " " + (NEM + 40) + " L " + (G1 - 120) + " " + (NEM + 36), 3, "#3F6A80", ' stroke-dasharray="10 8"') + "</g>";
    C += '<g id="' + id + '-chanC">' + paper("M " + (G0 - 8) + " " + (NEM - 8) + " C " + (G0 + 160) + " " + (NEM - 24) + " " + (G0 + 300) + " " + (NEM - 26) + " " + (G0 + 350) + " " + (NEM - 24) +
      " C " + (G0 + 350) + " " + (NEM - 170) + " " + (G1 - 70) + " " + (NEM - 180) + " " + (G1 - 70) + " " + (NEM - 10) + " L " + (G1 - 60) + " " + (NEM + 110) + " L " + (G0 - 14) + " " + (NEM + 110) + " Z", "#5E86A0", { stroke: true, sw: 5, sx: 6, sy: 8, half: 0.12 }) +
      line("M " + (G0 + 400) + " " + (NEM - 90) + " C " + (G0 + 430) + " " + (NEM - 130) + " " + (G1 - 160) + " " + (NEM - 140) + " " + (G1 - 120) + " " + (NEM - 100), 4, "#3F6A80", ' opacity="0.6"') +
      line("M " + (G0 + 40) + " " + (NEM + 40) + " L " + (G1 - 120) + " " + (NEM + 36), 3, "#3F6A80", ' stroke-dasharray="10 8"') + "</g>";
    F += paper(rRect(1080, 700, 170, 160, 1.5, 4828), M.goSang, { stroke: true, sw: 5 }) + paper(rRect(1072, 690, 186, 22, 1, 4829), M.go, { stroke: true, sw: 4 }) +
      line("M 1094 776 L 1236 776", 3, INK, ' opacity="0.5"') + '<circle cx="1165" cy="740" r="7" fill="#C9A24A" stroke="' + INK + '" stroke-width="2.5"/>';
    F += at(1124, 692, cocNuoc(id + "-coc")) + at(1212, 692, dongHoBao(id + "-dh", 30));
    api.origin("#" + id + "-coc-mat", "0 -60"); api.origin("#" + id + "-coc-gon", "0 -60");
    api.origin("#" + id + "-dh-kimG", "0 0"); api.origin("#" + id + "-dh-kimP", "0 0");
    api.origin("#" + id + "-ls-mat", "0 0"); api.origin("#" + id + "-chum", "0 0");
    api.show("#" + id + "-ls-mat", 0, 0); api.show("#" + id + "-chanC", 0, 0); api.show("#" + id + "-coc-gon", 0, 0);
    return { tuong: T, sau: S, chan: C, truoc: F,
      vt: { giuong: [G0, G1, NEM], coc: [1124, 692], dh: [1212, 692], moc: [1640, 544], ghe: [gx, 860], so: SO, ls: [1410, 842], wobNam: [930, 800] } };
  }

  /* ---------- phố cũ chiều tối mùa đông ---------- */
  /* Nhà gỗ nhiều màu hai tầng (mái dốc, tuyết trên mái, cửa sổ sáng ấm). Gốc: giữa chân tường. o: { w, h, mau, seed, cua: x tương đối (null: không cửa), sang (true), sep (tông giấy cũ: mái nâu, không tuyết) } */
  function nhaGo(o) {
    o = o || {};
    var w = o.w || 300, h = o.h || 260, sd = o.seed || 4901, r = rng(sd), mau = o.mau || M.nha[sd % M.nha.length], s = "<g>";
    var sang = o.sang === false ? (o.sep ? "#C9B48A" : "#3E4A60") : (o.sep ? "#F1E2BE" : "#FFD68A");
    s += paper(rRect(-w / 2, -h, w, h, 2, sd), mau, { stroke: true, sw: 5, sx: 6, sy: 8, half: 0.06 });
    for (var x = -w / 2 + 18; x < w / 2 - 6; x += 22) s += line("M " + f1(x) + " " + f1(-h + 6) + " L " + f1(x) + " -4", 2, INK, ' opacity="0.16"');
    var mai = "M " + f1(-w / 2 - 22) + " " + f1(-h + 4) + " L 0 " + f1(-h - w * 0.42) + " L " + f1(w / 2 + 22) + " " + f1(-h + 4) + " Z";
    s += paper(mai, o.sep ? M.S.nau : "#4A3A36", { stroke: true, sw: 5, sx: 6, sy: 8 });
    if (!o.sep) s += paper("M " + f1(-w / 2 - 22) + " " + f1(-h + 4) + " L 0 " + f1(-h - w * 0.42) + " L " + f1(w / 2 + 22) + " " + f1(-h + 4) + " L " + f1(w / 2 + 8) + " " + f1(-h + 14) + " L 0 " + f1(-h - w * 0.42 + 26) + " L " + f1(-w / 2 - 8) + " " + f1(-h + 14) + " Z", "#F7FBFC", { stroke: true, sw: 3.5, shadow: false });
    var cols = Math.max(2, Math.round(w / 110)), cw = w / cols;
    for (var row = 0; row < 2; row++) for (var c = 0; c < cols; c++) {
      var wx = -w / 2 + cw * (c + 0.5), wy = -h + 40 + row * (h * 0.46);
      if (o.cua != null && row === 1 && Math.abs(wx - o.cua) < cw * 0.6) continue;
      var lit = r() < 0.75;
      s += paper(rRect(wx - 26, wy, 52, 64, 1, sd + 10 + row * 9 + c), lit ? sang : (o.sep ? "#B89A70" : "#3E4A60"), { stroke: true, sw: 3.5, shadow: false }) + line("M " + f1(wx) + " " + f1(wy) + " L " + f1(wx) + " " + f1(wy + 64) + " M " + f1(wx - 26) + " " + f1(wy + 30) + " L " + f1(wx + 26) + " " + f1(wy + 30), 3, "#FFFFFF", ' opacity="0.8"');
      if (!o.sep) s += line("M " + f1(wx - 30) + " " + f1(wy + 64) + " L " + f1(wx + 30) + " " + f1(wy + 64), 6, "#F7FBFC");
    }
    if (o.cua != null) s += paper(rRect(o.cua - 36, -128, 72, 128, 1.2, sd + 40), o.sep ? M.S.nau : "#5E4228", { stroke: true, sw: 4, shadow: false }) + '<circle cx="' + f1(o.cua + 22) + '" cy="-62" r="5" fill="#C9A24A"/>';
    return s + "</g>";
  }
  /* Cột đèn đường có quầng sáng vàng. Gốc: chân. h: cao. o: { quang (true), r (150) } */
  function cotDen(h, o) {
    h = h || 360; o = o || {};
    var s = "<g>";
    if (o.quang !== false) s += '<circle cx="34" cy="' + f1(-h + 14) + '" r="' + (o.r || 150) + '" fill="url(#xlDen)"/>';
    s += line("M 0 0 L 0 " + (-h) + " C 0 " + (-h - 30) + " 30 " + (-h - 30) + " 34 " + (-h - 6), 12) + line("M 0 0 L 0 " + (-h) + " C 0 " + (-h - 30) + " 30 " + (-h - 30) + " 34 " + (-h - 6), 6, "#3E4A4A");
    s += paper("M 18 " + (-h - 4) + " L 50 " + (-h - 4) + " L 44 " + (-h + 22) + " L 24 " + (-h + 22) + " Z", "#2C3A3B", { stroke: true, sw: 3.5, shadow: false }) + '<ellipse cx="34" cy="' + (-h + 22) + '" rx="12" ry="5" fill="#FFF0B8"/>';
    s += paper(rEll(0, -2, 26, 8, 1, 4951), "#F7FBFC", { stroke: true, sw: 3, shadow: false });
    return s + "</g>";
  }
  /* Phố trung tâm cũ chiều tối tháng 2 (tuyết, đèn vàng, cửa sổ ấm, núi mỏ xa). Thế giới -600..3600, mặt đất y 820.
     Trả { troi, xa, giua, gan, mat, cua: x cửa phòng thuê }. Nhóm id-cuaLa: cánh cửa (scaleX quanh bản lề trái, origin "0 0"), id-cuaSang (ô sáng sau cửa). o: { seed, cua (2050) } */
  function phoCu(api, id, o) {
    o = o || {};
    var sd = o.seed || 5001, r = rng(sd), MAT = 820, cua = o.cua || 2050;
    var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#xlTroiChieu)"/>';
    for (var k = 0; k < 18; k++) troi += '<circle cx="' + f1(r() * 1920) + '" cy="' + f1(r() * 300) + '" r="' + f1(1.5 + r() * 2) + '" fill="#FFFFFF" opacity="0.6"/>';
    var xa = paper("M -600 760 L -100 520 C 0 470 120 450 260 470 L 700 420 C 820 410 900 470 1100 560 L 1700 700 L 2400 640 L 3400 720 L 3400 900 L -600 900 Z", "#3A4766", { shadow: false, stroke: true, sw: 3 });
    xa += line("M 260 470 L 700 420", 6, "#F7FBFC", ' opacity="0.7"');
    for (var j = 0; j < 9; j++) xa += '<rect x="' + f1(80 + j * 90 + r() * 30) + '" y="' + f1(520 + r() * 60) + '" width="8" height="8" fill="#FFD68A" opacity="0.8"/>';
    for (var q = 0; q < 14; q++) { var hx = -500 + q * 280 + r() * 60; xa += at(hx, 790, '<g transform="scale(0.55)">' + nhaGo({ w: 260 + r() * 80, h: 200 + r() * 60, mau: "#5A6480", seed: sd + 20 + q }) + "</g>"); }
    xa += '<rect x="-600" y="780" width="4200" height="140" fill="#C9D3DE"/>';
    var giua = paper(rRect(-600, MAT - 6, 4200, 400, 2, sd + 1), "#EEF3F6", { stroke: true, sw: 4, shadow: false });
    giua += line("M -600 " + (MAT + 60) + " C 400 " + (MAT + 50) + " 1600 " + (MAT + 70) + " 3600 " + (MAT + 58), 4, "#B9CBD6", ' opacity="0.8"');
    var NHA = [[-260, 330, 270, 0], [120, 300, 300, 1], [470, 320, 260, 2], [840, 300, 290, 3], [1210, 330, 270, 4], [1590, 310, 300, 5], [cua, 340, 290, 6, 0], [2420, 320, 270, 0], [2790, 300, 300, 2], [3160, 330, 280, 3]];
    NHA.forEach(function (n, i) { giua += at(n[0], MAT, nhaGo({ w: n[1], h: n[2], mau: M.nha[n[3]], seed: sd + 40 + i, cua: n[4] == null ? (i % 2 ? -n[1] * 0.25 : null) : n[4] })); });
    giua += at(cua, MAT, '<rect x="-36" y="-128" width="72" height="128" fill="#FFD68A" id="' + id + '-cuaSang"/><g transform="translate(-36,0)"><g id="' + id + '-cuaLa">' + paper(rRect(0, -128, 72, 128, 1.2, sd + 99), "#5E4228", { stroke: true, sw: 4, shadow: false }) + '<circle cx="58" cy="-62" r="6" fill="#C9A24A" stroke="' + INK + '" stroke-width="2"/></g></g>');
    api.origin("#" + id + "-cuaLa", "0 0");
    [-80, 660, 1400, 2280, 3000].forEach(function (x) { giua += at(x, MAT + 4, cotDen(380)); });
    var gan = "";
    [[-200, 1070, 520, 150], [900, 1090, 600, 120], [2000, 1080, 560, 140], [3100, 1080, 600, 150]].forEach(function (p, i) { gan += at(p[0], p[1], D.snowPile(p[2], p[3], sd + 70 + i)); });
    gan += at(1500, 1090, cotDen(620, { r: 200 }));
    return { troi: troi, xa: xa, giua: giua, gan: gan, mat: MAT, cua: cua };
  }

  /* ---------- mặt cắt mỏ ---------- */
  /* Mặt cắt núi mỏ (không nhãn): núi bên trái, thị trấn phía đông, đá nhiều lớp, thân quặng sẫm chạy chéo xuống dưới phố,
     đường hầm như rễ cây, giếng thang có vạch tầng + lồng thang, ô kính quan sát ở tầng trên, đống quặng ở chỗ cụt chân núi (một hòn có mắt).
     Thế giới: x -600..3600, mặt đất y 300, tầng khách y 540, tầng vận chuyển (đáy giếng) y 1500.
     Trả { troi, dat (đá, quặng, hầm, giếng), giua (núi, phố, ô kính, lồng, đống quặng, mũi tên đông), vt: { gieng, tren, day, mat, kinh: [x0, x1, y], dong: [x, y], pho: [x0, x1] } }.
     Nhóm: id-long (lồng thang: đặt y = tầng), id-qd<i> (dải quặng rút ra, 0..3), id-sup<i> (mảng đá sụp, 0..3), id-dong, id-honMat, id-muiDong (ẩn). */
  function matCatMo(api, id, o) {
    o = o || {};
    var sd = o.seed || 5101, r = rng(sd), MAT = 300, GX = 1000, TREN = 540, DAY = 1500;
    var troi = '<rect x="-2000" y="-1400" width="7000" height="1720" fill="url(#xlTroiNgay)"/>';
    var dat = "";
    for (var b = 0; b < 4; b++) dat += '<path d="M -1200 ' + (MAT + b * 380) + " C 0 " + (MAT + b * 380 + 40) + " 1600 " + (MAT + b * 380 - 30) + " 4800 " + (MAT + b * 380 + 20) + ' L 4800 2800 L -1200 2800 Z" fill="' + M.da[b] + '"/>';
    for (var k = 0; k < 60; k++) dat += '<path d="' + rEll(-800 + r() * 5200, MAT + 80 + r() * 1900, 10 + r() * 24, 6 + r() * 12, 2, sd + 10 + k) + '" fill="#000" opacity="0.1"/>';
    dat += paper("M 380 " + (MAT + 20) + " L 900 " + (MAT + 20) + " C 1300 700 1900 1100 2700 1640 L 2100 1700 C 1500 1260 900 860 380 " + (MAT + 20) + " Z", M.quang, { stroke: true, sw: 5, shadow: false });
    for (var q = 0; q < 26; q++) { var u = r(); dat += '<path d="' + rEll(520 + u * 1900 + r() * 200, MAT + 80 + u * 1250 + r() * 120, 14 + r() * 18, 6 + r() * 8, 1.5, sd + 80 + q) + '" fill="' + M.quangSang + '" opacity="0.7"/>'; }
    [TREN, 800, 1100, DAY].forEach(function (y, i) {
      var x0 = 300 + i * 60, x1 = 1900 + i * 220, d = "M " + x0 + " " + y + " C " + (x0 + 300) + " " + (y - 14) + " " + (x1 - 400) + " " + (y + 18) + " " + x1 + " " + (y + 6);
      dat += line(d, i === 3 ? 26 : 16, "#2A221E") + line(d, i === 3 ? 16 : 9, "#C8B48A");
      for (var c = 0; c < 4; c++) {
        var bx = x0 + 200 + c * (x1 - x0 - 300) / 4 + r() * 60, by = y + 6, ex = bx + (r() < 0.5 ? -1 : 1) * (80 + r() * 140), ey = by + 120 + r() * 140;
        var dd = "M " + f1(bx) + " " + f1(by) + " Q " + f1((bx + ex) / 2 + 30) + " " + f1((by + ey) / 2) + " " + f1(ex) + " " + f1(ey);
        dat += line(dd, 8, "#2A221E") + line(dd, 4, "#B8A27A");
      }
    });
    dat += '<rect x="' + (GX - 34) + '" y="' + MAT + '" width="68" height="' + (DAY - MAT + 20) + '" fill="#1E1916" stroke="' + INK + '" stroke-width="5"/>';
    dat += line("M " + (GX - 18) + " " + MAT + " L " + (GX - 18) + " " + DAY + " M " + (GX + 18) + " " + MAT + " L " + (GX + 18) + " " + DAY, 3, "#8A7A5C");
    for (var y = MAT + 100; y < DAY; y += 100) dat += line("M " + (GX - 56) + " " + y + " L " + (GX - 34) + " " + y, 6, "#E8D4A8");
    dat += paper(rRect(GX - 40, DAY - 10, 420, 60, 1.5, sd + 3), "#C8B48A", { stroke: true, sw: 4, shadow: false });
    var qd = "", sup = "";
    for (var i = 0; i < 4; i++) {
      var yy = 1380 - i * 90, xx = 1560 + i * 40;
      sup += '<g id="' + id + '-sup' + i + '">' + paper(rough([[xx + 20, yy - 90], [xx + 140, yy - 110], [xx + 280, yy - 86], [xx + 270, yy - 20], [xx + 30, yy - 24]], 6, sd + 140 + i, 20), M.da[2], { stroke: true, sw: 4, shadow: false }) + "</g>";
      qd += '<g id="' + id + '-qd' + i + '">' + paper(rRect(xx, yy, 300, 60, 2, sd + 120 + i), M.quang, { stroke: true, sw: 4, shadow: false }) + '<path d="' + rEll(xx + 80, yy + 26, 30, 12, 2, sd + 130 + i) + '" fill="' + M.quangSang + '"/></g>';
    }
    dat += qd + sup;
    var giua = paper("M -600 " + MAT + " L -100 " + (MAT - 60) + " L 300 " + (MAT - 180) + " L 600 " + (MAT - 300) + " L 760 " + (MAT - 310) + " L 1000 " + (MAT - 200) + " L 1400 " + (MAT - 30) + " L 1600 " + MAT + " Z", "#6A6E7A", { stroke: true, sw: 5, shadow: false }) +
      paper("M 500 " + (MAT - 260) + " L 600 " + (MAT - 300) + " L 760 " + (MAT - 310) + " L 880 " + (MAT - 260) + " L 800 " + (MAT - 240) + " L 700 " + (MAT - 268) + " L 600 " + (MAT - 244) + " Z", "#F7FBFC", { stroke: true, sw: 3.5, shadow: false });
    giua += '<rect x="-2000" y="' + (MAT - 6) + '" width="7000" height="14" fill="#F7FBFC"/>';
    for (var h = 0; h < 12; h++) giua += at(1640 + h * 118, MAT, '<g transform="scale(0.34)">' + nhaGo({ w: 300, h: 240 + (h % 3) * 30, mau: M.nha[h % 7], seed: sd + 200 + h }) + "</g>");
    giua += paper(rRect(GX + 40, TREN - 80, 240, 90, 1.5, sd + 4), "#3A3430", { stroke: true, sw: 4, shadow: false }) + '<rect x="' + (GX + 54) + '" y="' + (TREN - 72) + '" width="90" height="64" fill="#BFE0EE" opacity="0.55" stroke="' + INK + '" stroke-width="3"/>';
    giua += '<g id="' + id + '-long">' + paper(rRect(GX - 28, -70, 56, 70, 1, sd + 5), "#C9B48A", { stroke: true, sw: 3.5, shadow: false }) + line("M " + (GX - 14) + " -66 L " + (GX - 14) + " -4 M " + GX + " -66 L " + GX + " -4 M " + (GX + 14) + " -66 L " + (GX + 14) + " -4", 2, INK, ' opacity="0.5"') + line("M " + GX + " -70 L " + GX + " -1400", 2.5, "#8A8F94") + "</g>";
    var dong = '<g id="' + id + '-dong">' + paper(rough([[-110, 0], [-70, -60], [-10, -90], [50, -70], [110, 0]], 4, sd + 6, 16), M.quang, { stroke: true, sw: 4 }) +
      paper(rough([[-90, -46], [-40, -82], [20, -92], [70, -60], [40, -50], [-30, -62]], 4, sd + 7, 14), "#F7FBFC", { stroke: true, sw: 3, shadow: false }) +
      '<g id="' + id + '-honMat" transform="translate(-60,-20)">' + paper(rEll(0, 0, 24, 18, 2, sd + 8), M.quangSang, { stroke: true, sw: 3.5, shadow: false }) + '<circle cx="-9" cy="-3" r="3.6" fill="#FFFDF6"/><circle cx="3" cy="-3" r="3.6" fill="#FFFDF6"/><circle cx="-10" cy="-3" r="1.8" fill="' + INK + '"/><circle cx="2" cy="-3" r="1.8" fill="' + INK + '"/></g></g>';
    giua += at(-260, MAT, dong);
    giua += '<g id="' + id + '-muiDong">' + line("M 1300 940 C 1700 1000 2100 1120 2500 1260", 9, "#F7FBFC", ' stroke-dasharray="26 18"') + '<path d="M 2470 1210 L 2560 1290 L 2450 1300 Z" fill="#F7FBFC" stroke="' + INK + '" stroke-width="4"/></g>';
    for (var i2 = 0; i2 < 4; i2++) { api.origin("#" + id + "-qd" + i2, "0 0"); api.origin("#" + id + "-sup" + i2, "0 0"); }
    api.show("#" + id + "-muiDong", 0, 0);
    return { troi: troi, dat: dat, giua: giua, vt: { gieng: GX, tren: TREN, day: DAY, mat: MAT, kinh: [GX + 54, GX + 144, TREN - 10], dong: [-260, MAT], pho: [1640, 2940] } };
  }

  /* Máy ghi địa chấn trên bàn (trống, băng giấy, cần bút). Gốc: giữa mặt bàn. Đầu bút ở (0, -131).
     id-net: nét bút (canh.js đặt d mỗi khung), id-but: cần bút, id-bang: băng giấy. */
  function mayDiaChan(id) {
    var s = '<g id="' + id + '">';
    s += paper(rRect(-420, 0, 840, 40, 1.5, 5201), M.goSang, { stroke: true, sw: 5 }) + line("M -380 40 L -380 260 M 380 40 L 380 260", 18, M.goToi);
    s += paper(rRect(-360, -230, 120, 230, 2, 5202), "#4A5450", { stroke: true, sw: 4.5 });
    s += '<ellipse cx="-300" cy="-130" rx="60" ry="80" fill="#E8DFC8" stroke="' + INK + '" stroke-width="4"/>';
    s += '<g id="' + id + '-bang">' + paper("M -300 -190 L 420 -190 C 440 -160 440 -100 420 -70 L -300 -70 Z", "#F8F2E2", { stroke: true, sw: 4, shadow: false });
    for (var x = -280; x < 420; x += 40) s += line("M " + x + " -186 L " + x + " -74", 1.5, "#D9776A", ' opacity="0.35"');
    s += line("M -300 -130 L 420 -130", 1.5, "#D9776A", ' opacity="0.5"');
    s += '<path id="' + id + '-net" d="M -290 -130 L 0 -130" fill="none" stroke="#1F3A6B" stroke-width="4" stroke-linejoin="round"/></g>';
    s += paper(rRect(-40, -330, 120, 90, 1.5, 5203), "#4A5450", { stroke: true, sw: 4.5 });
    s += '<g id="' + id + '-but">' + line("M 20 -240 L 0 -136", 8) + line("M 20 -240 L 0 -136", 4, "#B8BDC2") + '<circle cx="0" cy="-131" r="6" fill="#1F3A6B" stroke="' + INK + '" stroke-width="2"/></g>';
    return s + "</g>";
  }

  /* ---------- băng, khách sạn băng (dạng chung, không biểu tượng thương hiệu) ---------- */
  /* Toà nhà khối băng. Gốc: giữa chân. w, h. */
  function nhaBang(w, h, o) {
    w = w || 700; h = h || 300; o = o || {};
    var s = "<g>", sd = o.seed || 5301;
    s += paper("M " + (-w / 2) + " 0 L " + (-w / 2) + " " + (-h * 0.8) + " C " + (-w / 2) + " " + (-h) + " " + (w / 2) + " " + (-h) + " " + (w / 2) + " " + (-h * 0.8) + " L " + (w / 2) + " 0 Z", "url(#xlBangG)", { stroke: true, sw: 5, sx: 8, sy: 10 });
    for (var row = 1; row < 5; row++) { var y = -row * h * 0.17; s += line("M " + (-w / 2 + 6) + " " + f1(y) + " L " + (w / 2 - 6) + " " + f1(y), 2.5, "#9CC6D8"); for (var x = -w / 2 + (row % 2 ? 40 : 90); x < w / 2; x += 100) s += line("M " + x + " " + f1(y) + " L " + x + " " + f1(y + h * 0.17), 2.5, "#9CC6D8"); }
    s += paper("M -70 0 L -70 -130 C -70 -200 70 -200 70 -130 L 70 0 Z", "#3E6A86", { stroke: true, sw: 5, shadow: false }) + '<path d="M -50 0 L -50 -126 C -50 -176 50 -176 50 -126 L 50 0 Z" fill="url(#xlBangSang)"/>';
    s += paper(rough([[-w / 2 - 20, -h * 0.8], [0, -h * 1.02], [w / 2 + 20, -h * 0.8], [w / 2, -h * 0.74], [-w / 2, -h * 0.74]], 3, sd, 22), "#F7FBFC", { stroke: true, sw: 3.5, shadow: false });
    s += line("M " + (-w / 2 + 30) + " " + f1(-h * 0.6) + " L " + (-w / 2 + 60) + " -40", 8, "#FFFFFF", ' opacity="0.6"');
    return s + "</g>";
  }
  /* Tường khối băng trong suốt có vân. Gốc: góc trên trái. o: { bw, bh } */
  function tuongBang(w, h, o) {
    o = o || {};
    var s = '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="url(#xlBangVan)"/>', bw = o.bw || 180, bh = o.bh || 110;
    for (var y = 0, row = 0; y < h; y += bh, row++) for (var x = (row % 2 ? -bw / 2 : 0); x < w; x += bw) s += '<rect x="' + x + '" y="' + y + '" width="' + bw + '" height="' + bh + '" fill="none" stroke="#A9CFE0" stroke-width="3"/>';
    s += '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="#7FB5CF" opacity="0.18"/>';
    return s;
  }
  /* Giường băng phủ tấm lông nhạt dạng chung. Gốc: giữa mặt trên khối. w. id-vet: vết tròn đóng sương (ẩn). */
  function giuongBang(api, id, w) {
    w = w || 520;
    var s = '<g id="' + id + '">' + paper(rRect(-w / 2, 0, w, 150, 2, 5401), "url(#xlBangG)", { stroke: true, sw: 5, sx: 8, sy: 10 }) + line("M " + (-w / 2 + 20) + " 70 L " + (w / 2 - 20) + " 74", 2.5, "#9CC6D8");
    s += paper("M " + (-w / 2 + 14) + " 6 C " + (-w / 4) + " -26 " + (w / 4) + " -26 " + (w / 2 - 14) + " 6 L " + (w / 2 - 24) + " 40 C " + (w / 4) + " 30 " + (-w / 4) + " 30 " + (-w / 2 + 24) + " 40 Z", "#EDE6D8", { stroke: true, sw: 4.5, shadow: false });
    for (var i = 0; i < 9; i++) s += line("M " + f1(-w / 2 + 40 + i * (w - 80) / 8) + " -6 l -6 24", 3, "#C9BFA8");
    s += '<g id="' + id + '-vet">' + '<ellipse cx="0" cy="2" rx="78" ry="22" fill="#E4F4FA" stroke="#9CC6D8" stroke-width="4"/>' + '<ellipse cx="0" cy="2" rx="78" ry="22" fill="url(#halfW)" opacity="0.6"/>' +
      [-50, -18, 22, 52].map(function (x, j) { return '<g transform="translate(' + x + ',' + (j % 2 ? -4 : 6) + ')">' + D.sparkle(7, "#FFFFFF") + "</g>"; }).join("") + "</g>";
    api.show("#" + id + "-vet", 0, 0);
    return s + "</g>";
  }
  /* Tác phẩm điêu khắc băng trừu tượng trong khung hốc tường. Gốc: giữa đáy. id-sang: quầng sáng (opacity). */
  function dieuKhacBang(id) {
    var s = '<g id="' + id + '">' + paper(rRect(-150, -380, 300, 380, 2, 5501), "#2E5670", { stroke: true, sw: 6 });
    s += '<g id="' + id + '-sang"><ellipse cx="0" cy="-190" rx="160" ry="190" fill="url(#xlBangSang)"/></g>';
    s += paper("M -40 -40 C -90 -120 -20 -170 10 -220 C 40 -270 -10 -320 30 -350 C 80 -300 90 -230 40 -180 C 10 -140 70 -90 40 -40 Z", "url(#xlBangG)", { stroke: true, sw: 4.5, shadow: false });
    s += paper("M -60 0 L 60 0 L 50 -40 L -50 -40 Z", "#BFE0EE", { stroke: true, sw: 4, shadow: false });
    return s + "</g>";
  }

  /* ---------- đường sắt, tàu quặng ---------- */
  /* Đường ray nhìn ngang từ x0 tới x1, mặt ray y. */
  function duongRay(x0, x1, y) {
    var s = '<rect x="' + x0 + '" y="' + (y + 6) + '" width="' + (x1 - x0) + '" height="26" fill="#8C8478"/>';
    for (var x = x0; x < x1; x += 44) s += '<rect x="' + x + '" y="' + (y + 4) + '" width="26" height="14" fill="#5E4228" stroke="' + INK + '" stroke-width="2"/>';
    s += line("M " + x0 + " " + y + " L " + x1 + " " + y, 10) + line("M " + x0 + " " + y + " L " + x1 + " " + y, 5, "#B8BDC2");
    return s;
  }
  /* Toa quặng sẫm. Gốc: trái, mặt ray. dài 240. */
  function toaQuang(dai, seed) {
    dai = dai || 240;
    var s = "<g>" + paper(rough([[6, -150], [dai - 6, -150], [dai - 18, -40], [18, -40]], 2, seed || 5601, 20), "#3A3530", { stroke: true, sw: 4.5, sx: 4, sy: 6 });
    s += paper(rough([[14, -150], [dai * 0.3, -186], [dai * 0.6, -178], [dai - 14, -150]], 4, (seed || 5601) + 1, 16), M.quang, { stroke: true, sw: 3.5, shadow: false });
    s += line("M 20 -120 L " + (dai - 20) + " -120", 3, "#5A524A") + line("M " + (dai / 2) + " -150 L " + (dai / 2) + " -44", 3, "#5A524A");
    s += line("M 0 -40 L " + dai + " -40", 8, "#2A2622");
    [dai * 0.18, dai * 0.36, dai * 0.64, dai * 0.82].forEach(function (x) { s += '<circle cx="' + f1(x) + '" cy="-18" r="18" fill="#2A2622" stroke="' + INK + '" stroke-width="3"/><circle cx="' + f1(x) + '" cy="-18" r="6" fill="#8A8F94"/>'; });
    return s + "</g>";
  }
  /* Đầu máy điện dạng chung (không logo, không chữ). Gốc: trái, mặt ray. dài 380, mũi bên phải. o: { mau, soc } */
  function dauMay(dai, o) {
    dai = dai || 380; o = o || {};
    var s = "<g>";
    s += line("M " + (dai * 0.3) + " -230 L " + (dai * 0.45) + " -290 L " + (dai * 0.6) + " -230 M " + (dai * 0.36) + " -290 L " + (dai * 0.56) + " -290", 4);
    s += paper("M 6 -40 L 6 -230 L " + (dai - 60) + " -230 C " + (dai - 20) + " -228 " + (dai - 4) + " -200 " + (dai - 4) + " -150 L " + (dai - 4) + " -40 Z", o.mau || "#4E5E58", { stroke: true, sw: 5, sx: 5, sy: 7, half: 0.06 });
    s += '<rect x="6" y="-110" width="' + (dai - 10) + '" height="18" fill="' + (o.soc || "#D9A441") + '" stroke="' + INK + '" stroke-width="2.5"/>';
    s += paper("M " + (dai - 92) + " -216 L " + (dai - 58) + " -216 C " + (dai - 30) + " -214 " + (dai - 18) + " -196 " + (dai - 16) + " -170 L " + (dai - 92) + " -170 Z", "#BFE0EE", { stroke: true, sw: 3.5, shadow: false });
    for (var i = 0; i < 3; i++) s += paper(rRect(40 + i * 70, -200, 44, 40, 1, 5701 + i), "#2F3A38", { stroke: true, sw: 3, shadow: false });
    s += '<circle cx="' + (dai - 14) + '" cy="-70" r="8" fill="#FFF0B8" stroke="' + INK + '" stroke-width="2.5"/>';
    [dai * 0.14, dai * 0.3, dai * 0.7, dai * 0.86].forEach(function (x) { s += '<circle cx="' + f1(x) + '" cy="-18" r="20" fill="#2A2622" stroke="' + INK + '" stroke-width="3"/><circle cx="' + f1(x) + '" cy="-18" r="7" fill="#8A8F94"/>'; });
    return s + "</g>";
  }
  /* Đoàn tàu quặng: hai đầu máy (đầu đoàn bên phải) + n toa nối sang trái. Gốc: mép phải đầu máy, mặt ray. Dài = 760 + n·248. */
  function tauQuang(n, o) {
    o = o || {};
    var s = "<g>";
    s += at(-380, 0, dauMay(380, o)) + at(-760, 0, dauMay(380, o));
    for (var i = 0; i < n; i++) s += at(-760 - (i + 1) * 248, 0, toaQuang(240, 5601 + (i % 7) * 3));
    return s + "</g>";
  }
  /* Rào chắn đường ngang sọc đỏ trắng (biển chéo không chữ). Gốc: chân trụ. id-tay: cần (gốc trục; 0 = hạ ngang sang phải, -80 = nâng; origin đã đặt). dai: dài cần. */
  function raoChan(api, id, dai) {
    dai = dai || 620;
    var s = '<g id="' + id + '">' + paper(rRect(-22, -170, 44, 170, 1.5, 5801), "#E9E4D8", { stroke: true, sw: 4.5 }) + paper(rRect(-40, -190, 80, 40, 1.5, 5802), "#4A5450", { stroke: true, sw: 4 });
    s += '<circle cx="-14" cy="-210" r="12" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/><circle cx="14" cy="-210" r="12" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/>';
    var x = "M -60 -290 L 60 -230 M 60 -290 L -60 -230";
    s += line(x, 18) + line(x, 10, "#F4F1E8") + line(x, 3, "#C9463A", ' stroke-dasharray="14 14"') + line("M 0 -260 L 0 -190", 8);
    s += '<g transform="translate(0,-150)"><g id="' + id + '-tay">' + paper(rr(-10, -14, dai, 28, 12), "#F4F1E8", { stroke: true, sw: 4, sx: 4, sy: 6 });
    for (var xx = 40; xx < dai - 20; xx += 80) s += '<rect x="' + xx + '" y="-12" width="40" height="24" fill="#C9463A"/>';
    s += '<path d="' + rr(-10, -14, dai, 28, 12) + '" fill="none" stroke="' + INK + '" stroke-width="4"/></g></g>';
    api.origin("#" + id + "-tay", "0 0");
    return s + "</g>";
  }
  /* Sân bóng phủ tuyết (nhìn từ trên). Gốc: tâm. */
  function sanBongTuyet(w, h, seed) {
    var c = "#C3D3DB", s = "<g>" + paper(rRect(-w / 2, -h / 2, w, h, 2, seed || 911), "#F2F7F9", { stroke: true, sw: 5, sx: 8, sy: 10 });
    s += '<path d="' + rEll(-w * 0.2, h * 0.1, w * 0.12, h * 0.16, 4, (seed || 911) + 3) + '" fill="#7FB070" opacity="0.35"/>';
    s += '<rect x="' + f1(-w / 2 + 14) + '" y="' + f1(-h / 2 + 14) + '" width="' + f1(w - 28) + '" height="' + f1(h - 28) + '" fill="none" stroke="' + c + '" stroke-width="5"/>';
    s += line("M 0 " + f1(-h / 2 + 14) + " L 0 " + f1(h / 2 - 14), 5, c) + '<circle cx="0" cy="0" r="' + f1(h * 0.17) + '" fill="none" stroke="' + c + '" stroke-width="5"/>';
    s += '<rect x="' + f1(-w / 2 + 14) + '" y="' + f1(-h * 0.22) + '" width="' + f1(w * 0.14) + '" height="' + f1(h * 0.44) + '" fill="none" stroke="' + c + '" stroke-width="5"/>';
    s += '<rect x="' + f1(w / 2 - 14 - w * 0.14) + '" y="' + f1(-h * 0.22) + '" width="' + f1(w * 0.14) + '" height="' + f1(h * 0.44) + '" fill="none" stroke="' + c + '" stroke-width="5"/>';
    return s + "</g>";
  }

  /* ---------- trang sổ bản đồ ---------- */
  /* Hòn quặng giấy nhỏ có hai chấm mắt. Gốc: giữa đáy. id-mat: nhóm mắt (x đổi hướng nhìn). r: bán kính. */
  function honQuang(id, r) {
    r = r || 26;
    return '<g id="' + id + '">' + '<ellipse cx="3" cy="-2" rx="' + f1(r * 1.1) + '" ry="5" fill="#0b1214" opacity="0.25"/>' + paper(rough([[-r, 0], [-r * 1.05, -r * 0.8], [-r * 0.3, -r * 1.5], [r * 0.6, -r * 1.35], [r * 1.05, -r * 0.6], [r * 0.9, 0]], 2.5, 5901, 10), M.quangSang, { stroke: true, sw: 4, shadow: false }) +
      '<g id="' + id + '-mat"><circle cx="' + f1(-r * 0.32) + '" cy="' + f1(-r * 0.78) + '" r="' + f1(r * 0.2) + '" fill="#FFFDF6"/><circle cx="' + f1(r * 0.24) + '" cy="' + f1(-r * 0.78) + '" r="' + f1(r * 0.2) + '" fill="#FFFDF6"/>' +
      '<circle cx="' + f1(-r * 0.28) + '" cy="' + f1(-r * 0.76) + '" r="' + f1(r * 0.1) + '" fill="' + INK + '"/><circle cx="' + f1(r * 0.28) + '" cy="' + f1(-r * 0.76) + '" r="' + f1(r * 0.1) + '" fill="' + INK + '"/></g></g>';
  }
  /* Tàu biển giấy nhỏ nhìn ngang (thân đỏ sẫm, cabin trắng). Gốc: giữa, mặt nước. */
  function tauBien(id, dai) {
    dai = dai || 160;
    return '<g id="' + id + '">' + paper("M " + f1(-dai / 2) + " -30 L " + f1(dai / 2 + 10) + " -30 L " + f1(dai / 2 - 14) + " 6 L " + f1(-dai / 2 + 10) + " 6 Z", "#8E3A2E", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) +
      paper(rRect(-dai * 0.1, -64, dai * 0.36, 34, 1, 5911), "#F4F1E8", { stroke: true, sw: 3, shadow: false }) + line("M " + f1(-dai * 0.36) + " -30 L " + f1(-dai * 0.36) + " -70", 4) + "</g>";
  }
  /* Tàu phá băng giấy nhỏ (thân đỏ, cabin cao). Gốc: giữa, mặt nước. Mũi bên trái. */
  function tauPhaBang(id) {
    return '<g id="' + id + '">' + paper("M -90 -20 L 70 -34 L 80 6 L -60 6 Z", "#C9463A", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + paper(rRect(-10, -76, 56, 44, 1, 5921), "#F4F1E8", { stroke: true, sw: 3, shadow: false }) +
      '<rect x="0" y="-66" width="36" height="10" fill="#3F6A70"/>' + line("M 30 -76 L 30 -96", 4) + "</g>";
  }
  /* Vương miện giấy (không người). Gốc: giữa vành dưới. */
  function vuongMien(id, w) {
    w = w || 90;
    return '<g id="' + id + '">' + paper("M " + f1(-w / 2) + " 0 L " + f1(-w / 2) + " " + f1(-w * 0.5) + " L " + f1(-w / 4) + " " + f1(-w * 0.26) + " L 0 " + f1(-w * 0.62) + " L " + f1(w / 4) + " " + f1(-w * 0.26) + " L " + f1(w / 2) + " " + f1(-w * 0.5) + " L " + f1(w / 2) + " 0 Z", "#D9A441", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
      '<circle cx="0" cy="' + f1(-w * 0.2) + '" r="' + f1(w * 0.07) + '" fill="#C9463A" stroke="' + INK + '" stroke-width="2"/>' + line("M " + f1(-w / 2) + " " + f1(-w * 0.1) + " L " + f1(w / 2) + " " + f1(-w * 0.1), 3, "#A87A20") + "</g>";
  }
  /* Kéo (hai lưỡi xoay quanh chốt). Gốc: chốt. id-a, id-b: hai lưỡi (rotation mở/khép; origin "0 0" do canh.js đặt). Lưỡi hướng sang phải. */
  function keo(id, l) {
    l = l || 110;
    function luoi(sid, k) { return '<g id="' + sid + '">' + paper("M 0 " + (-6 * k) + " L " + l + " " + (-2 * k) + " L 0 " + (8 * k) + " Z", "#B8BDC2", { stroke: true, sw: 3.5, shadow: false }) + line("M 0 0 L " + f1(-l * 0.38) + " " + (12 * k), 10, "#C9463A") + '<g transform="translate(' + f1(-l * 0.5) + "," + (16 * k) + ')"><path d="' + vong(0, 0, 20, 11) + '" fill="#C9463A" fill-rule="evenodd" stroke="' + INK + '" stroke-width="3.5"/></g>' + "</g>"; }
    return '<g id="' + id + '">' + luoi(id + "-a", 1) + luoi(id + "-b", -1) + '<circle cx="0" cy="0" r="6" fill="#8A8F94" stroke="' + INK + '" stroke-width="2.5"/></g>';
  }
  /* Tay Wob (ống tay áo phao + nắm tay mực) thò vào khung. Gốc: nắm tay; ống tay kéo về hướng goc (độ, 90 = xuống). */
  function tayWob(len, goc, mau) {
    var a = (goc == null ? 90 : goc) * Math.PI / 180, ex = f1(Math.cos(a) * len), ey = f1(Math.sin(a) * len);
    return "<g>" + line("M 0 0 L " + ex + " " + ey, 44) + line("M 0 0 L " + ex + " " + ey, 28, mau || M.ao) + '<circle cx="0" cy="0" r="26" fill="' + INK + '"/></g>';
  }
  /* Mũi tên cong dày (hải lưu, gió). pts: [[x, y]…]; mau; w: bề dày. */
  function muiTenCong(pts, mau, w) {
    w = w || 22;
    var d = "M " + pts.map(function (p) { return f1(p[0]) + " " + f1(p[1]); }).join(" L ");
    var a = pts[pts.length - 2], b = pts[pts.length - 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    var hx = b[0] + Math.cos(ang) * w * 1.3, hy = b[1] + Math.sin(ang) * w * 1.3, px = -Math.sin(ang) * w * 1.1, py = Math.cos(ang) * w * 1.1;
    return line(d, w + 8) + line(d, w, mau || "#E0703A") + '<path d="M ' + f1(b[0] + px) + " " + f1(b[1] + py) + " L " + f1(hx) + " " + f1(hy) + " L " + f1(b[0] - px) + " " + f1(b[1] - py) + ' Z" fill="' + (mau || "#E0703A") + '" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>';
  }

  /* Ghế gấp nhỏ (khung nhôm chéo chữ X, mặt vải). Gốc: giữa chân trên mặt đất. cao: chiều cao mặt ghế (mặc định 120), rong: bề ngang (150), mau: màu vải. */
  function gheGap(cao, rong, mau) {
    cao = cao || 120; rong = rong || 150;
    var w = rong / 2, s = "<g>";
    s += '<ellipse cx="0" cy="4" rx="' + f1(w + 16) + '" ry="10" fill="#0b1214" opacity="0.18"/>';
    s += line("M " + f1(-w) + " 0 L " + f1(w * 0.9) + " " + f1(-cao), 14) + line("M " + f1(-w) + " 0 L " + f1(w * 0.9) + " " + f1(-cao), 7, "#B8BDC2");
    s += line("M " + f1(w) + " 0 L " + f1(-w * 0.9) + " " + f1(-cao), 14) + line("M " + f1(w) + " 0 L " + f1(-w * 0.9) + " " + f1(-cao), 7, "#C9CED2");
    s += '<circle cx="0" cy="' + f1(-cao / 2) + '" r="6" fill="#8A8F94" stroke="' + INK + '" stroke-width="3"/>';
    s += paper("M " + f1(-w - 8) + " " + f1(-cao - 8) + " C " + f1(-w / 2) + " " + f1(-cao + 10) + " " + f1(w / 2) + " " + f1(-cao + 10) + " " + f1(w + 8) + " " + f1(-cao - 8) + " L " + f1(w + 4) + " " + f1(-cao + 6) + " C " + f1(w / 2) + " " + f1(-cao + 24) + " " + f1(-w / 2) + " " + f1(-cao + 24) + " " + f1(-w - 4) + " " + f1(-cao + 6) + " Z", mau || "#C9463A", { stroke: true, sw: 4.5, shadow: false });
    return s + "</g>";
  }

  G.XuLanh = {
    M: M, defs: defs, wob: wob, chiaKhoa: chiaKhoa, chumChia: chumChia, keyShape: keyShape, theThoTui: theThoTui,
    nguoiQue: nguoiQue, queDi: queDi, trangCu: trangCu, banTuTren: banTuTren,
    dongHoBao: dongHoBao, cocNuoc: cocNuoc, loSuoi: loSuoi, phongThue: phongThue,
    nhaGo: nhaGo, cotDen: cotDen, phoCu: phoCu, matCatMo: matCatMo, mayDiaChan: mayDiaChan,
    nhaBang: nhaBang, tuongBang: tuongBang, giuongBang: giuongBang, dieuKhacBang: dieuKhacBang,
    duongRay: duongRay, toaQuang: toaQuang, dauMay: dauMay, tauQuang: tauQuang, raoChan: raoChan, sanBongTuyet: sanBongTuyet,
    honQuang: honQuang, tauBien: tauBien, tauPhaBang: tauPhaBang, vuongMien: vuongMien, keo: keo, tayWob: tayWob, muiTenCong: muiTenCong, gheGap: gheGap,
    rr: rr, vong: vong, at: at, g: g
  };
})(typeof window !== "undefined" ? window : globalThis);
