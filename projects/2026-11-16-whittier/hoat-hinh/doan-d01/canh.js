/* ---- Bộ dựng riêng tập Whittier (cắt giấy, nhóm d01 d03 d04 d08 d10 d14 d16 d18).
   Chép nguyên vào đầu canh.js của các đoạn này (bằng ghep-canh.sh). Không sửa lib chung.
   Trang phục: mũ len kem quả bông đỏ, khăn kem, ba lô ô liu có cuộn thảm đỏ; đồ ngủ; áo khoác kem; áo mưa vàng.
   Tất định: mọi ngẫu nhiên qua DaoCu.rng(seed). Không chạm document (trừ trong api.moiKhung). ---- */
var WT = (function () {
  "use strict";
  var D = window.DaoCu, INK = D.INK, C = D.C, paper = D.paper, rough = D.rough, line = D.line;
  var KEM = "#F2E8D2", KEM_D = "#E2D3B2", DO = "#C9463A", OLIU = "#76803F", OLIU_D = "#525B2B", VANG = "#E2B33C", VANG_D = "#B98A22";
  var BETONG = "#B9B4A6", BETONG_D = "#8E897C", DA = "#6F6A66", DA_D = "#4E4A47", GACH = "#A8483A";
  function f1(n) { return (Math.round(n * 10) / 10).toString(); }
  function at(x, y, s) { return '<g transform="translate(' + f1(x) + "," + f1(y) + ')">' + s + "</g>"; }
  function g(id, s, tr) { return '<g id="' + id + '"' + (tr ? ' transform="' + tr + '"' : "") + ">" + s + "</g>"; }

  /* tay áo: thay nét tay đen bằng viền đen + lõi màu */
  function sleeves(svg, mau) {
    return svg.replace(/<path d="M 0 0 L 0 (48|46)"([^>]*?)stroke="#1f2326"([^>]*?)stroke-width="13"([^>]*?)\/>/g, function (m, n, a, b, c) {
      return '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="#1f2326"' + b + 'stroke-width="24"' + c + '/>' +
        '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="' + mau + '"' + b + 'stroke-width="14"' + c + '/>';
    });
  }
  /* Wob tập Whittier. o.do: "mua-dong" (mặc định) | "ngu" | "ao-khoac" | "ao-mua". Các tuỳ chọn khác như api.wob (holdL, holdR, tuyetDau, phuKien…) */
  function wob(api, id, o) {
    o = o || {};
    var doo = o.do || "mua-dong", oo = {};
    Object.keys(o).forEach(function (k) { if (k !== "do") oo[k] = o[k]; });
    var clip = 'clip-path="url(#' + id + '-clip)"';
    var pk = "", extra = "";
    if (doo === "mua-dong" || doo === "ao-khoac") { oo.mu = KEM; oo.muVanh = KEM_D; oo.scarf = true; oo.khan = KEM; oo.khanSoc = DO; }
    if (doo === "ao-khoac") {
      pk += '<ellipse cx="88" cy="214" rx="30" ry="26" fill="#E9DDC2" stroke="' + INK + '" stroke-width="5"/><ellipse cx="312" cy="214" rx="30" ry="26" fill="#E9DDC2" stroke="' + INK + '" stroke-width="5"/>';
      pk += '<g ' + clip + '><path d="M 30 262 C 120 284 280 284 370 262 L 370 420 L 30 420 Z" fill="#E9DDC2" stroke="' + INK + '" stroke-width="5"/>' + line("M 200 280 L 200 330", 4, INK) + '<circle cx="186" cy="292" r="6" fill="#8E7A62"/><circle cx="186" cy="314" r="6" fill="#8E7A62"/></g>';
    }
    if (doo === "ao-mua") {
      extra += '<path d="M 54 196 C 50 70 120 20 200 20 C 280 20 350 70 346 196 C 330 120 280 74 200 74 C 120 74 70 120 54 196 Z" fill="' + VANG + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
      extra += '<path d="M 70 300 C 30 250 40 120 90 70 C 140 30 260 30 310 70 C 360 120 370 250 330 300 Z" fill="' + VANG + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
      pk += '<path d="M 82 92 C 120 50 280 50 318 92" fill="none" stroke="' + VANG_D + '" stroke-width="12" stroke-linecap="round"/><path d="M 82 92 C 120 50 280 50 318 92" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round" opacity="0.6"/>';
      pk += '<g ' + clip + '><path d="M 30 262 C 120 284 280 284 370 262 L 370 420 L 30 420 Z" fill="' + VANG + '" stroke="' + INK + '" stroke-width="5"/>' +
        '<circle cx="200" cy="290" r="6" fill="' + VANG_D + '" stroke="' + INK + '" stroke-width="3"/></g>';
    }
    if (doo === "ngu") {
      pk += '<g ' + clip + '><path d="M 30 262 C 120 284 280 284 370 262 L 370 420 L 30 420 Z" fill="#A9C6E4" stroke="' + INK + '" stroke-width="5"/>';
      for (var x = 50; x < 360; x += 30) pk += line("M " + x + " 266 L " + x + " 330", 9, "#3F6A9A");
      pk += '<circle cx="200" cy="292" r="5" fill="#F6EEDC" stroke="' + INK + '" stroke-width="2.5"/></g>';
    }
    if (o.phuKien) pk += o.phuKien;
    if (pk) oo.phuKien = pk;
    if (extra) oo.packExtra = extra + (o.packExtra || "");
    var W = api.wob(id, oo);
    var s = W.svg.replace(/#b8743a/g, OLIU).replace(/#8e5527/g, OLIU_D);
    if (oo.mu) s = s.replace(new RegExp('(id="' + id + '-pom">[\\s\\S]*?<path d="M 200 -22[^"]*" fill=")#F6EEDC'), "$1" + DO);
    if (doo === "ao-khoac") s = sleeves(s, "#E9DDC2");
    if (doo === "ao-mua") s = sleeves(s, VANG);
    if (doo === "ngu") { s = sleeves(s, "#A9C6E4"); s = s.replace(/<ellipse cx="(-?16)" cy="95" rx="28" ry="12" fill="#d9543c"([^>]*)\/>/g, '<ellipse cx="$1" cy="93" rx="40" ry="17" fill="#F2E8D2"$2/><ellipse cx="$1" cy="84" rx="24" ry="9" fill="#E9806E" stroke="#1f2326" stroke-width="3"/>'); }
    W.svg = s;
    return W;
  }

  /* trời + núi xa (đêm / rạng sáng / sáng mây). kieu: "dem" | "rang" | "sang" */
  function defs() {
    return "<defs>" +
      '<linearGradient id="wtRang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5F7FA0"/><stop offset="0.6" stop-color="#A9BED2"/><stop offset="1" stop-color="#E8D9C4"/></linearGradient>' +
      '<linearGradient id="wtSang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#AEBCC4"/><stop offset="0.6" stop-color="#CDD7DB"/><stop offset="1" stop-color="#E9ECE6"/></linearGradient>' +
      '<linearGradient id="wtHam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1418"/><stop offset="1" stop-color="#2A3236"/></linearGradient>' +
      '<radialGradient id="wtDen" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FF6B4A" stop-opacity="0.75"/><stop offset="1" stop-color="#FF6B4A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="wtDenV" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE7A0" stop-opacity="0.7"/><stop offset="1" stop-color="#FFE7A0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="wtMo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.85"/><stop offset="0.7" stop-color="#FFFFFF" stop-opacity="0.6"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>' +
      "</defs>";
  }
  function nuiXa(x0, x1, y, seed, mau, cao) {
    var r = D.rng(seed), pts = [[x0, y + 900], [x0, y]];
    for (var x = x0; x <= x1; x += 120) pts.push([x, y - (cao || 380) * (0.45 + 0.55 * Math.abs(Math.sin(x / 520 + seed))) - r() * 40]);
    pts.push([x1, y + 900]);
    var s = paper(rough(pts, 4, seed, 26), mau || "#8FA3B0", { shadow: false, stroke: true, sw: 3 });
    // tuyết đỉnh
    for (var i = 2; i < pts.length - 1; i += 2) { var p = pts[i]; if (p[1] < y - 200) s += paper(rough([[p[0] - 46, p[1] + 60], [p[0], p[1]], [p[0] + 46, p[1] + 60], [p[0], p[1] + 44]], 3, seed + i, 12), C.snow, { shadow: false }); }
    return s;
  }

  /* Vách đá có cổng hầm bê tông MỘT làn. Gốc: giữa đáy cửa hầm (mặt đường). Cửa rộng 380, cao 360.
     Ray chìm giữa làn đi vào hầm. o: { seed, sign: SVG biển trên cổng (gốc giữa mép trên cổng) } */
  function tunnelPortal(id, o) {
    o = o || {};
    var sd = o.seed || 801, s = '<g id="' + id + '">';
    s += paper(rough([[-1100, 40], [-1000, -420], [-820, -640], [-560, -760], [-260, -820], [80, -880], [380, -800], [640, -700], [900, -560], [1100, -380], [1180, 40]], 6, sd, 30), DA, { stroke: true, sw: 5, half: 0.14 });
    s += paper(rough([[-700, -560], [-420, -700], [-120, -760], [200, -800], [420, -720], [180, -700], [-160, -660], [-460, -560]], 4, sd + 1, 22), DA_D, { shadow: false });
    s += paper(rough([[-1000, -420], [-860, -560], [-700, -620], [-760, -540], [-900, -460]], 3, sd + 2, 18), C.snow, { shadow: false });
    s += paper(rough([[200, -840], [420, -790], [640, -700], [560, -690], [380, -740]], 3, sd + 3, 18), C.snow, { shadow: false });
    // khối bê tông cổng
    s += paper(D.rRect(-290, -450, 580, 450, 1.6, sd + 4), BETONG, { stroke: true, sw: 6, half: 0.12 });
    s += paper(D.rRect(-310, -480, 620, 46, 1.6, sd + 5), BETONG_D, { stroke: true, sw: 5 });
    s += paper(rough([[-312, -480], [-150, -500], [0, -496], [150, -502], [312, -480], [312, -470], [-312, -470]], 2, sd + 6, 14), C.snow, { shadow: false });
    // lòng hầm
    s += '<path d="M -190 0 L -190 -250 C -190 -330 -120 -370 0 -370 C 120 -370 190 -330 190 -250 L 190 0 Z" fill="url(#wtHam)" stroke="' + INK + '" stroke-width="6"/>';
    s += line("M -150 -40 C -60 -90 60 -90 150 -40", 3, "#3A4448", ' opacity="0.7"') + line("M -120 -150 C -40 -190 40 -190 120 -150", 3, "#3A4448", ' opacity="0.5"');
    // mặt đường + ray chìm
    s += '<path d="M -230 0 L -150 -40 L 150 -40 L 230 0 Z" fill="#59605F" stroke="' + INK + '" stroke-width="4"/>';
    s += line("M -60 0 L -28 -40 M 60 0 L 28 -40", 6, "#C9CCC8") + line("M -60 0 L -28 -40 M 60 0 L 28 -40", 2, INK, ' opacity="0.6"');
    if (o.sign) s += at(0, -480, o.sign);
    return s + "</g>";
  }
  /* Đèn tín hiệu 3 bóng trên cột. Gốc: chân cột. id-b0..2 vầng sáng (bật/tắt bằng opacity), id-l0..2 mặt bóng sáng */
  function signal3(id, o) {
    o = o || {};
    var cao = o.cao || 420, mau = o.mau || "#FF6B4A", s = '<g id="' + id + '">';
    s += paper(D.rRect(-10, -cao, 20, cao, 1, 811), "#3A4043", { stroke: true, sw: 4, sx: 4, sy: 5 });
    s += paper(D.rRect(-48, -cao - 230, 96, 236, 2, 812), "#2B3033", { stroke: true, sw: 5 });
    for (var i = 0; i < 3; i++) {
      var y = -cao - 190 + i * 74;
      s += '<circle cx="0" cy="' + y + '" r="28" fill="#4A2A26" stroke="' + INK + '" stroke-width="4"/>';
      s += '<g id="' + id + "-b" + i + '"><circle cx="0" cy="' + y + '" r="80" fill="url(#wtDen)"/><circle cx="0" cy="' + y + '" r="26" fill="' + mau + '"/><circle cx="-8" cy="' + (y - 8) + '" r="7" fill="#FFE2D6" opacity="0.8"/></g>';
      s += line("M -34 " + (y - 30) + " C -10 " + (y - 44) + " 10 " + (y - 44) + " 34 " + (y - 30), 6, "#2B3033");
    }
    return s + "</g>";
  }
  /* Thanh chắn sọc đỏ trắng. Gốc: trục quay (trên trụ). id-arm xoay (0 = nằm ngang, -88 = dựng đứng); cần chiều dài len về bên phải */
  function barrier(id, len) {
    len = len || 420;
    var s = '<g id="' + id + '">';
    s += paper(D.rRect(-26, -10, 52, 150, 1.5, 821), "#3A4043", { stroke: true, sw: 4 });
    s += '<g id="' + id + '-arm">';
    s += paper(D.rRect(0, -14, len, 28, 1.2, 822), "#F6EEDC", { stroke: true, sw: 4, sy: 6 });
    for (var x = 30; x < len - 20; x += 70) s += '<path d="M ' + x + ' -12 L ' + (x + 34) + ' -12 L ' + (x + 20) + ' 12 L ' + (x - 14) + ' 12 Z" fill="' + DO + '"/>';
    s += '<circle cx="' + (len - 12) + '" cy="0" r="9" fill="#FF6B4A" stroke="' + INK + '" stroke-width="3"/>';
    s += "</g>";
    s += '<circle cx="0" cy="0" r="18" fill="#2B3033" stroke="' + INK + '" stroke-width="4"/>';
    return s + "</g>";
  }
  /* Xe mui trần thuê màu đỏ gạch, nhìn ngang, đầu xe bên trái. Gốc: giữa mặt đất. Trả { back, front }: Wob ngồi giữa (ghế lái x≈-40),
     ghế phụ x≈+110. id-mui: mui gấp sau ghế. o.tuyet: 0..1 tuyết trên nắp */
  function convertible(id, o) {
    o = o || {};
    var m = o.mau || GACH, back = '<g id="' + id + '-sau">', front = '<g id="' + id + '-truoc">';
    back += paper(D.rRect(-70, -250, 14, 110, 1, 831), "#3A4043", { shadow: false });
    back += paper(D.rRect(70, -236, 70, 96, 3, 832), "#5C3A30", { stroke: true, sw: 4 });
    back += paper(D.rRect(-90, -236, 70, 96, 3, 833), "#5C3A30", { stroke: true, sw: 4 });
    back += '<g id="' + id + '-mui">' + paper(rough([[190, -150], [200, -196], [260, -206], [300, -170], [300, -150]], 3, 834, 14), "#2E2A28", { stroke: true, sw: 4 }) + "</g>";
    front += paper("M -320 -60 C -320 -110 -296 -140 -230 -148 L -120 -152 L -96 -196 L -84 -196 L -70 -150 L 300 -150 C 330 -146 340 -110 338 -60 L 334 -34 L -316 -34 Z", m, { stroke: true, sw: 6, half: 0.16, fringe: "#D9786A" });
    front += '<path d="M -120 -152 L -96 -238 L -82 -238 L -70 -150 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="4" opacity="0.85"/>';
    front += line("M -40 -120 L 40 -120", 5) + line("M -60 -146 L -60 -40 M 150 -146 L 150 -40", 3, INK, ' opacity="0.55"');
    front += '<rect x="-326" y="-110" width="30" height="20" rx="4" fill="#FFF3C4" stroke="' + INK + '" stroke-width="4"/>';
    front += '<rect x="316" y="-112" width="22" height="20" rx="4" fill="' + DO + '" stroke="' + INK + '" stroke-width="4"/>';
    [-200, 200].forEach(function (x) {
      front += '<circle cx="' + x + '" cy="-34" r="48" fill="#2a2f31" stroke="' + INK + '" stroke-width="5"/><circle cx="' + x + '" cy="-34" r="19" fill="#9aa5a8" stroke="' + INK + '" stroke-width="4"/>';
    });
    front += '<g id="' + id + '-tuyet" opacity="' + (o.tuyet == null ? 0 : o.tuyet) + '">' + paper(rough([[-318, -112], [-300, -150], [-230, -160], [-130, -160], [-120, -150], [-140, -140], [-316, -130]], 3, 835, 14), C.snow, { shadow: false }) +
      paper(rough([[190, -150], [250, -164], [334, -150], [336, -136], [190, -140]], 3, 836, 14), C.snow, { shadow: false }) + "</g>";
    return { back: back + "</g>", front: front + "</g>" };
  }
  /* ụ tuyết "hành khách" ngồi ghế phụ. Gốc: đáy (mặt ghế). id-than (scaleY mọc lên, origin "0 0"), id-dau */
  function snowPassenger(id) {
    var s = '<g id="' + id + '"><g id="' + id + '-than">' + paper(rough([[-56, 0], [-60, -60], [-40, -110], [0, -124], [40, -110], [60, -60], [56, 0]], 3, 841, 14), C.snow, { stroke: true, sw: 4, fringe: C.ice }) + "</g>";
    s += '<g id="' + id + '-dau">' + paper(D.rEll(0, -160, 38, 36, 2, 842), C.snow, { stroke: true, sw: 4, fringe: C.ice }) + "</g>";
    return s + "</g>";
  }
  /* Tờ lịch giờ hầm gấp tư (bìa có hình toà nhà nhỏ, không chữ). Gốc: tâm. 90×120 */
  function timetableFold() {
    var s = paper(D.rRect(-45, -60, 90, 120, 1.5, 851), "#F4ECD8", { stroke: true, sw: 4, sx: 4, sy: 5 });
    s += paper(D.rRect(-16, -38, 32, 62, 1, 852), "#C9C2B0", { stroke: true, sw: 2.5, shadow: false });
    for (var y = -32; y < 20; y += 10) s += line("M -11 " + y + " L -3 " + y + " M 3 " + y + " L 11 " + y, 2.5, "#5E6A70");
    s += line("M -45 0 L 45 0", 2, INK, ' opacity="0.35"') + line("M -30 40 L 30 40", 3, DO, ' opacity="0.7"');
    return s;
  }
  /* Tờ lịch mở. Gốc: tâm. w×h; dòng kẻ ô như bảng giờ (không chữ). o.chu: [{x, y, chu, co, id}] chữ (chỉ từ chu_tren_do_vat) */
  function timetableOpen(id, w, h, o) {
    o = o || {};
    var s = '<g id="' + id + '">' + paper(D.rRect(-w / 2, -h / 2, w, h, 2, 853), "#F6EFDD", { stroke: true, sw: 5, sx: 6, sy: 8, half: 0.06 });
    s += line("M 0 " + (-h / 2) + " L 0 " + (h / 2) + " M " + (-w / 2) + " 0 L " + (w / 2) + " 0", 2, INK, ' opacity="0.25"');
    s += paper(D.rRect(-w / 2 + 20, -h / 2 + 18, w - 40, h * 0.12, 1, 854), "#5E7F8C", { shadow: false });
    for (var y = -h / 2 + h * 0.2; y < h / 2 - 20; y += h * 0.09) s += line("M " + (-w / 2 + 24) + " " + f1(y) + " L " + (w / 2 - 24) + " " + f1(y), 2, "#9DB0B8", ' opacity="0.6"');
    for (var x = -w / 2 + w * 0.34; x < w / 2 - 20; x += w * 0.33) s += line("M " + f1(x) + " " + f1(-h / 2 + h * 0.2) + " L " + f1(x) + " " + (h / 2 - 22), 2, "#9DB0B8", ' opacity="0.6"');
    (o.chu || []).forEach(function (c) { s += g(c.id || id + "-c", D.txt(c.x, c.y, c.chu, c.co || 48, { w: 900 })); });
    return s + "</g>";
  }
  /* vòng khoanh đỏ tự vẽ (dùng stroke-dasharray). Gốc: tâm. id-p là path */
  function khoanh(id, rx, ry, vong) {
    var d = "", n = (vong || 1) * 36;
    for (var i = 0; i <= n; i++) { var a = -Math.PI * 0.6 + i / 36 * Math.PI * 2, k = 1 + 0.06 * (i / 36); d += (i ? " L " : "M ") + f1(Math.cos(a) * rx * k) + " " + f1(Math.sin(a) * ry * k); }
    return '<path id="' + id + '-p" d="' + d + '" fill="none" stroke="' + DO + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  /* Vali nhỏ. Gốc: đáy giữa. 120×90 */
  function suitcase() {
    var s = paper(D.rRect(-60, -90, 120, 90, 2, 861), "#3F6A70", { stroke: true, sw: 5 });
    s += '<path d="M -22 -90 L -22 -108 L 22 -108 L 22 -90" fill="none" stroke="' + INK + '" stroke-width="7"/>';
    s += line("M -60 -60 L 60 -60", 4, "#2C4C50") + paper(D.rEll(-30, -36, 12, 10, 1, 862), DO, { shadow: false }) + paper(D.rRect(14, -40, 30, 18, 1, 863), "#F4ECD8", { shadow: false });
    return s;
  }
  /* Dấu hỏi giấy cắt (hình, không phải chữ). Gốc: đáy chấm. cao ~ 2.2×r */
  function qmark(r, mau) {
    var d = "M " + f1(-r * 0.8) + " " + f1(-r * 1.6) + " C " + f1(-r * 0.8) + " " + f1(-r * 2.5) + " " + f1(r * 0.9) + " " + f1(-r * 2.6) + " " + f1(r * 0.9) + " " + f1(-r * 1.7) +
      " C " + f1(r * 0.9) + " " + f1(-r * 1.15) + " " + f1(r * 0.15) + " " + f1(-r * 1.1) + " " + f1(r * 0.15) + " " + f1(-r * 0.55);
    var s = line(d, r * 0.55, INK) + line(d, r * 0.36, mau || "#F6EEDC");
    s += '<circle cx="' + f1(r * 0.15) + '" cy="' + f1(-r * 0.12) + '" r="' + f1(r * 0.24) + '" fill="' + (mau || "#F6EEDC") + '" stroke="' + INK + '" stroke-width="' + f1(r * 0.09) + '"/>';
    return '<g filter="url(#pshadow)">' + s + "</g>";
  }
  /* xe con nhỏ nhìn ngang (hàng chờ). Gốc: giữa mặt đất; dài ~300 */
  function carSmall(mau, seed) {
    var s = paper("M -150 -30 C -150 -60 -130 -70 -100 -74 L -70 -118 C -60 -130 50 -130 66 -118 L 100 -74 C 136 -70 152 -58 152 -30 L 150 -16 L -148 -16 Z", mau, { stroke: true, sw: 5, half: 0.14 });
    s += '<path d="M -60 -112 L 0 -112 L 0 -78 L -84 -78 Z M 12 -112 L 60 -112 L 86 -78 L 12 -78 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="3.5"/>';
    [-90, 90].forEach(function (x) { s += '<circle cx="' + x + '" cy="-16" r="26" fill="#2a2f31" stroke="' + INK + '" stroke-width="4"/><circle cx="' + x + '" cy="-16" r="9" fill="#9aa5a8"/>'; });
    s += paper(rough([[-70, -118], [0, -136], [66, -118], [40, -114], [-50, -114]], 2, seed || 871, 12), C.snow, { shadow: false });
    return s;
  }
  /* hình nhỏ xe / tàu vẽ trên tờ lịch (icon). Gốc: tâm */
  function iconCar(mau) {
    return paper("M -40 4 L -40 -8 L -26 -10 L -16 -24 L 18 -24 L 28 -10 L 40 -8 L 40 4 Z", mau || DO, { stroke: true, sw: 3.5, sx: 3, sy: 3 }) +
      '<circle cx="-22" cy="6" r="8" fill="' + INK + '"/><circle cx="22" cy="6" r="8" fill="' + INK + '"/>';
  }
  function iconTrain() {
    var s = "";
    for (var i = 0; i < 3; i++) s += paper(D.rRect(-90 + i * 60, -26, 54, 30, 1, 880 + i), i === 0 ? "#3F6A70" : "#5E7F8C", { stroke: true, sw: 3.5, sx: 3, sy: 3 }) + '<circle cx="' + (-76 + i * 60) + '" cy="6" r="6" fill="' + INK + '"/><circle cx="' + (-50 + i * 60) + '" cy="6" r="6" fill="' + INK + '"/>';
    return s;
  }
  /* bút chì nhỏ: dùng DaoCu.pencil */

  /* Người que giấy (nhân vật chung, không mặt, không trang phục cụ thể). Gốc: giữa chân. h ~ 110.
     id-c0, id-c1 hai chân (xoay quanh hông, origin "0 -48"); o: { mau, mu ("tho" mũ thợ), goi (bọc hàng trên lưng), huong (1 phải, -1 trái) } */
  function nguoiQue(id, o) {
    o = o || {};
    var m = o.mau || "#5C4A3E", h = o.huong || 1, s = '<g id="' + id + '"><g transform="scale(' + h + ',1)">';
    s += '<g id="' + id + '-c0">' + line("M 0 -48 L -10 0", 9, INK) + "</g>";
    s += '<g id="' + id + '-c1">' + line("M 0 -48 L 10 0", 9, INK) + "</g>";
    if (o.goi) s += paper(D.rEll(-22, -78, 20, 24, 1.5, 891), o.goi === true ? "#9C8462" : o.goi, { stroke: true, sw: 3, sx: 3, sy: 3 });
    s += paper("M -14 -46 C -16 -70 -12 -92 0 -98 C 12 -92 16 -70 14 -46 Z", m, { stroke: true, sw: 3.5, sx: 3, sy: 3 });
    s += line("M 6 -86 L 22 -62", 7, INK);
    s += paper(D.rEll(0, -112, 13, 14, 1, 892), m, { stroke: true, sw: 3.5, shadow: false });
    if (o.mu === "tho") s += paper("M -16 -116 C -14 -134 14 -134 16 -116 L 22 -114 L -22 -114 Z", "#E2B33C", { stroke: true, sw: 3, shadow: false });
    return s + "</g></g>";
  }
  /* bước chân cho người que: mốc t0..t1 */
  function buocQue(api, id, t0, t1, chuKy) {
    var c = chuKy || 0.36, k = 0;
    api.origin("#" + id + "-c0", "0 -48"); api.origin("#" + id + "-c1", "0 -48");
    api.key("#" + id + "-c0", "rotation", 0, 0); api.key("#" + id + "-c1", "rotation", 0, 0);
    for (var t = t0; t < t1; t += c / 2, k++) {
      api.key("#" + id + "-c0", "rotation", t, k % 2 ? 16 : -16, "sine.inOut");
      api.key("#" + id + "-c1", "rotation", t, k % 2 ? -16 : 16, "sine.inOut");
    }
    api.key("#" + id + "-c0", "rotation", t1 + 0.1, 0, "sine.out"); api.key("#" + id + "-c1", "rotation", t1 + 0.1, 0, "sine.out");
  }
  /* Cụm mây có một con mắt (nháy được). Gốc: tâm. id-mi mí (scaleY 0 mở → 1 nhắm, origin "0 -10") */
  function cloudFace(id, r) {
    r = r || 1;
    var s = '<g id="' + id + '"><g transform="scale(' + r + ')">';
    s += paper("M -110 20 C -140 20 -144 -20 -112 -26 C -116 -64 -60 -76 -40 -48 C -30 -90 40 -92 52 -50 C 80 -72 128 -50 112 -14 C 142 -8 136 24 108 24 Z", "#C9D3D8", { stroke: true, sw: 5, half: 0.15 });
    s += '<ellipse cx="10" cy="-12" rx="16" ry="18" fill="#FFFDF6" stroke="' + INK + '" stroke-width="4"/><circle cx="12" cy="-10" r="8" fill="' + INK + '"/>';
    s += '<g id="' + id + '-mi"><path d="M -8 -30 L 28 -30 L 28 6 L -8 6 Z" fill="#9EAAB0" stroke="' + INK + '" stroke-width="3"/></g>';
    s += line("M -6 -36 C 4 -42 18 -42 28 -36", 4);
    return s + "</g></g>";
  }
  /* xẻng nhỏ (cầm tay). Gốc: chỗ nắm */
  function shovel() {
    return line("M 0 -40 L 0 110", 9, INK) + line("M 0 -40 L 0 110", 4, C.woodLight) +
      paper("M -26 106 L 26 106 L 22 150 C 10 166 -10 166 -22 150 Z", "#9AA5A8", { stroke: true, sw: 4, sx: 3, sy: 4 }) + line("M -14 -44 L 14 -44", 8, INK);
  }
  /* kính râm đeo trên mặt Wob (toạ độ gốc Wob 400×400). Gốc riêng khi gấp: dùng sunglassesFold */
  function sunglassesFace() {
    return '<g><path d="M 120 140 L 280 140" stroke="' + INK + '" stroke-width="7"/>' +
      '<path d="M 128 136 L 192 136 L 188 168 C 184 182 136 182 132 168 Z" fill="#22292C" stroke="' + INK + '" stroke-width="5"/>' +
      '<path d="M 208 136 L 272 136 L 268 168 C 264 182 216 182 212 168 Z" fill="#22292C" stroke="' + INK + '" stroke-width="5"/>' +
      line("M 142 146 L 160 146 M 222 146 L 240 146", 4, "#8FB8CA") + "</g>";
  }
  function sunglassesFold() {
    return '<path d="M -28 -10 L 28 -10 L 24 12 C 20 20 -20 20 -24 12 Z" fill="#22292C" stroke="' + INK + '" stroke-width="4"/>' + line("M -28 -10 L 28 -10", 4);
  }
  /* Toà Buckner: bê tông dài SÁU tầng, ô cửa trống không kính, vệt nước. Gốc: giữa chân. w rộng (mặc định 1300), tầng cao 70 */
  function buckner(id, o) {
    o = o || {};
    var w = o.w || 1300, ft = o.tang || 70, h = ft * 6 + 30, s = '<g id="' + id + '">', r = D.rng(o.seed || 901);
    s += paper(D.rRect(-w / 2, -h, w, h, 2, 902), "#A9A397", { stroke: true, sw: 6, half: 0.12 });
    s += paper(D.rRect(-w / 2 - 14, -h - 18, w + 28, 22, 1.5, 903), "#8E897C", { stroke: true, sw: 4 });
    s += paper(rough([[-w / 2 - 14, -h - 18], [w / 2 + 14, -h - 20], [w / 2 + 14, -h - 8], [-w / 2 - 14, -h - 8]], 2, 904, 20), C.snow, { shadow: false });
    var nc = Math.floor((w - 60) / 58);
    for (var f = 0; f < 6; f++) {
      var y = -h + 24 + f * ft;
      s += line("M " + (-w / 2) + " " + (y + ft - 6) + " L " + (w / 2) + " " + (y + ft - 6), 3, "#7E796E", ' opacity="0.6"');
      for (var c = 0; c < nc; c++) {
        var x = -w / 2 + 34 + c * 58;
        s += '<path d="' + D.rRect(x, y + 8, 34, ft - 26, 1.2, 910 + f * 40 + c) + '" fill="#2A2F31" stroke="' + INK + '" stroke-width="2.5"/>';
        if (r() < 0.18) s += '<path d="M ' + (x + 6) + " " + (y + ft - 18) + " L " + (x + 12) + " " + (y + ft - 4 + r() * 40) + " L " + (x + 20) + " " + (y + ft - 18) + ' Z" fill="#6E685D" opacity="0.55"/>';
      }
    }
    for (var k = 0; k < 9; k++) { var vx = -w / 2 + 60 + r() * (w - 120); s += '<path d="M ' + f1(vx) + " " + (-h + 6) + " C " + f1(vx + 6) + " " + f1(-h * 0.6) + " " + f1(vx - 4) + " " + f1(-h * 0.4) + " " + f1(vx + 3) + " " + f1(-h * (0.1 + r() * 0.3)) + '" fill="none" stroke="#6E685D" stroke-width="' + f1(6 + r() * 8) + '" opacity="0.35" stroke-linecap="round"/>'; }
    return s + "</g>";
  }
  /* Hàng rào lưới thép có cột. Gốc: mép trái chân rào. w rộng, cao h */
  function fenceChain(w, h, seed) {
    h = h || 170;
    var s = "<g>", r = D.rng(seed || 921);
    var dm = "";
    for (var x = -h; x < w; x += 22) { dm += "M " + f1(Math.max(0, x)) + " " + f1(x < 0 ? -h - x : -h) + " L " + f1(Math.min(w, x + h)) + " " + f1(x + h > w ? -(x + h - w) : 0) + " "; dm += "M " + f1(Math.max(0, x)) + " " + f1(x < 0 ? x + h - h : 0) + " "; }
    var d1 = "", d2 = "";
    for (var a = -h; a < w; a += 22) { d1 += "M " + f1(a) + " 0 L " + f1(a + h) + " " + (-h) + " "; d2 += "M " + f1(a) + " " + (-h) + " L " + f1(a + h) + " 0 "; }
    s += '<clipPath id="fc' + (seed || 921) + '"><rect x="0" y="' + (-h) + '" width="' + w + '" height="' + h + '"/></clipPath>';
    s += '<g clip-path="url(#fc' + (seed || 921) + ')">' + line(d1, 2, "#59605F", ' opacity="0.7"') + line(d2, 2, "#59605F", ' opacity="0.7"') + "</g>";
    s += line("M 0 " + (-h) + " L " + w + " " + (-h), 6, "#4E5455");
    for (var p = 0; p <= w; p += 200) s += paper(D.rRect(p - 7, -h - 10, 14, h + 14, 1, 930 + p), "#4E5455", { stroke: true, sw: 3, sx: 3, sy: 4 });
    s += paper(rough([[0, 4], [w * 0.3, -18 - r() * 10], [w * 0.7, -14], [w, 4]], 3, 939, 30), C.snow, { shadow: false });
    return s + "</g>";
  }
  /* Xe tải quân đội giấy (nhìn ngang, đầu bên trái). Gốc: giữa mặt đất */
  function truck(id) {
    var s = '<g id="' + id + '">';
    s += paper(D.rRect(-40, -170, 240, 140, 3, 941), "#6B7350", { stroke: true, sw: 5, half: 0.15 });
    s += paper("M -160 -30 L -160 -110 L -120 -140 L -50 -140 L -50 -30 Z", "#59613F", { stroke: true, sw: 5 });
    s += '<path d="M -130 -120 L -66 -120 L -66 -86 L -150 -86 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="3.5"/>';
    [-110, 40, 150].forEach(function (x) { s += '<circle cx="' + x + '" cy="-24" r="30" fill="#2a2f31" stroke="' + INK + '" stroke-width="4"/><circle cx="' + x + '" cy="-24" r="10" fill="#9aa5a8"/>'; });
    return s + "</g>";
  }
  /* bóng bowling. Gốc: tâm */
  function bowlingBall(r) {
    r = r || 30;
    return '<circle cx="0" cy="0" r="' + r + '" fill="#2E3E66" stroke="' + INK + '" stroke-width="4"/>' +
      '<circle cx="' + f1(-r * 0.3) + '" cy="' + f1(-r * 0.3) + '" r="' + f1(r * 0.12) + '" fill="' + INK + '"/><circle cx="' + f1(r * 0.05) + '" cy="' + f1(-r * 0.45) + '" r="' + f1(r * 0.12) + '" fill="' + INK + '"/><circle cx="' + f1(-r * 0.1) + '" cy="' + f1(-r * 0.05) + '" r="' + f1(r * 0.12) + '" fill="' + INK + '"/>' +
      line("M " + f1(r * 0.3) + " " + f1(-r * 0.6) + " C " + f1(r * 0.6) + " " + f1(-r * 0.4) + " " + f1(r * 0.66) + " " + f1(-r * 0.1) + " " + f1(r * 0.6) + " " + f1(r * 0.1), 4, "#FFFFFF", ' opacity="0.45"');
  }
  /* toà tháp 14 tầng ở xa (Begich Towers dạng chung). Gốc: giữa chân. w, tầng cao ft */
  function towerBlock(w, ft) {
    w = w || 200; ft = ft || 26;
    var h = ft * 14 + 20, s = paper(D.rRect(-w / 2, -h, w, h, 1.5, 951), "#E4DCCB", { stroke: true, sw: 4, half: 0.08 });
    for (var f = 0; f < 14; f++) for (var c = 0; c < 5; c++) s += '<rect x="' + f1(-w / 2 + 14 + c * (w - 28) / 5) + '" y="' + f1(-h + 14 + f * ft) + '" width="' + f1((w - 28) / 5 - 10) + '" height="' + f1(ft - 12) + '" fill="#6E8C9C" opacity="0.8"/>';
    return s;
  }
  /* cột đo tuyết sơn vạch. Gốc: chân cột. cao h; vạch đỏ trắng mỗi 60 */
  function snowGauge(h) {
    var s = paper(D.rRect(-14, -h, 28, h, 1, 961), "#F6EEDC", { stroke: true, sw: 4 });
    for (var y = -60; y > -h; y -= 120) s += '<rect x="-14" y="' + (y - 60) + '" width="28" height="60" fill="' + DO + '"/>';
    for (var y2 = 0; y2 > -h; y2 -= 30) s += line("M -14 " + y2 + " L " + (y2 % 60 === 0 ? 10 : 0) + " " + y2, 3, INK);
    s += '<path d="' + D.rRect(-14, -h, 28, h, 1, 961) + '" fill="none" stroke="' + INK + '" stroke-width="4"/>';
    return s;
  }
  /* bảng số giấy (tờ lơ lửng). Gốc: tâm. chu bắt buộc lấy từ chu_tren_do_vat */
  function tag(id, chu, w, h, co, o) {
    o = o || {};
    return '<g id="' + id + '">' + paper(D.rRect(-w / 2, -h / 2, w, h, 2, o.seed || 971), o.mau || "#F6EFDD", { stroke: true, sw: 5, half: 0.06 }) +
      (o.ghim !== false ? '<circle cx="0" cy="' + (-h / 2 + 14) + '" r="7" fill="' + DO + '" stroke="' + INK + '" stroke-width="3"/>' : "") +
      D.txt(0, co * 0.36 + (o.dy || 0), chu, co, { w: 900, fill: o.fill }) + "</g>";
  }
  /* tuyết rơi màn hình: dải bông tuyết cao, trôi xuống tuyến tính cả đoạn. Trả SVG; tự đặt khoá. o: { n, toc (px/s), t0, t1, seed, r } */
  function tuyetRoi(api, id, o) {
    o = o || {};
    var DUR = api.DUR, toc = o.toc || 90, L = toc * DUR, n = o.n || 70, r = D.rng(o.seed || 991), s = "";
    var cnt = Math.round(n * (1080 + L) / 1080);
    for (var i = 0; i < cnt; i++) {
      var x = r() * 1980 - 30, y = 1080 - r() * (1080 + L) - 20, rr = (o.r || 6) * (0.5 + r());
      s += '<circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="' + f1(rr) + '" fill="#FFFFFF" opacity="' + f1(0.55 + r() * 0.4) + '"/>';
    }
    api.key("#" + id, "y", 0, 0); api.key("#" + id, "y", DUR, L, "none");
    return '<g id="' + id + '">' + s + "</g>";
  }
  return {
    KEM: KEM, DO: DO, OLIU: OLIU, VANG: VANG, BETONG: BETONG, DA: DA, DA_D: DA_D, GACH: GACH,
    wob: wob, defs: defs, nuiXa: nuiXa, tunnelPortal: tunnelPortal, signal3: signal3, barrier: barrier, convertible: convertible,
    snowPassenger: snowPassenger, timetableFold: timetableFold, timetableOpen: timetableOpen, khoanh: khoanh, suitcase: suitcase,
    qmark: qmark, carSmall: carSmall, iconCar: iconCar, iconTrain: iconTrain, nguoiQue: nguoiQue, buocQue: buocQue, cloudFace: cloudFace,
    shovel: shovel, sunglassesFace: sunglassesFace, sunglassesFold: sunglassesFold, buckner: buckner, fenceChain: fenceChain, truck: truck,
    bowlingBall: bowlingBall, towerBlock: towerBlock, snowGauge: snowGauge, tag: tag, tuyetRoi: tuyetRoi, at: at, g: g, f1: f1
  };
})();
/* Đoạn d01 · cắt giấy · hồi ức đêm tuyết trước cổng hầm. Vào "dau-video" (khung 0 đủ cảnh), ra "giay".
   Chữ duy nhất: 23:00 (trên tờ lịch mở). Cấu hình CỔNG (PH) dùng chung với d03. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, -99, k); return v == null ? du : v; };
  var MAT = 900;
  // ---- phông: vách núi + cổng hầm (x 1000), đèn (600), thanh chắn (trục 760), xe (1650) ----
  var portal = WT.tunnelPortal("ham", { seed: 801 });
  var xe = WT.convertible("xe", { tuyet: 0.9 });
  var W = WT.wob(api, "W", { tuyetDau: true, holdR: g("W-fold", '<g transform="translate(0,-58) rotate(-8)">' + WT.timetableFold() + "</g>") });
  var S = WT.wob(api, "S", { tuyetDau: true });

  var troi = WT.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#skyNight)"/>';
  var xa = WT.nuiXa(-900, 3400, 760, 3, "#3E5068", 420) + '<rect x="-900" y="700" width="4300" height="600" fill="#2B3E5C" opacity="0.35"/>';
  var mid = "";
  mid += at(1000, MAT, portal);
  mid += D.paper(D.rough([[-800, MAT - 4], [3400, MAT - 6], [3400, 1700], [-800, 1700]], 3, 811, 30), "#E6EEF2", { shadow: false });
  mid += '<path d="M 770 ' + MAT + ' L 1230 ' + MAT + ' L 1500 1300 L 500 1300 Z" fill="#5E6668" opacity="0.9"/>';
  mid += D.line("M 940 " + MAT + " L 860 1300 M 1060 " + MAT + " L 1140 1300", 7, "#C9CCC8");
  mid += D.paper(D.rough([[480, 1300], [700, 960], [770, MAT], [520, 920], [200, 1000]], 3, 812, 24), "#F2F6F7", { shadow: false });
  mid += at(600, MAT + 4, WT.signal3("den"));
  // xe (sau) + Wob ngủ + chăn lịch + hành khách tuyết + xe (trước)
  mid += at(1650, 924, xe.back);
  mid += S.svg;
  mid += at(1668, 858, g("chan", '<g transform="rotate(-6)">' + WT.timetableOpen("ttb", 210, 120) + "</g>"));
  mid += at(1800, 790, WT.snowPassenger("hk"));
  mid += at(1650, 924, xe.front);
  // Wob đứng + tờ lịch mở + thanh chắn (trước mặt Wob)
  mid += W.svg;
  mid += at(1318, 800, g("tt", WT.timetableOpen("tto", 270, 190, { chu: [{ id: "tt-c", x: 0, y: 30, chu: data.chu_tren_do_vat[0], co: 62 }] }) +
    at(0, 8, g("kh", WT.khoanh("kh", 96, 50, 1.2)))));
  mid += at(760, 818, WT.barrier("chan2", 395));
  var gan = D.paper(D.rough([[-400, 1080], [-200, 1010], [200, 990], [520, 1030], [700, 1090], [700, 1300], [-400, 1300]], 4, 813, 26), C_SNOW(), { stroke: true, sw: 4 }) +
    D.paper(D.rough([[1700, 1100], [1900, 1000], [2300, 980], [2600, 1040], [2700, 1300], [1700, 1300]], 4, 814, 26), C_SNOW(), { stroke: true, sw: 4 });
  function C_SNOW() { return D.C.snow; }
  var roi = WT.tuyetRoi(api, "snowfx", { n: 60, toc: 70, seed: 991, r: 5 });
  var roiGan = WT.tuyetRoi(api, "snowfx2", { n: 14, toc: 160, seed: 992, r: 11 });
  var CH = data.chu_tren_do_vat, hc = "";
  hc += D.paper(D.rRect(96, 54, 600, 290, 2, 1091), "#3F6A70", { stroke: true, sw: 5, sx: 8, sy: 10 });
  hc += D.paper(D.rRect(112, 70, 568, 258, 1.5, 1092), "#F4ECD8", { stroke: true, sw: 3, shadow: false });
  hc += D.txt(132, 128, CH[1], 56, { anchor: "start", w: 900 });
  hc += '<circle cx="146" cy="168" r="7" fill="' + D.INK + '"/>' + D.txt(166, 186, CH[2], 48, { anchor: "start", w: 900 });
  hc += D.txt(132, 262, CH[3], 42, { anchor: "start", w: 700, fill: "#3F6A70" });
  hc += '<rect x="500" y="100" width="150" height="110" rx="8" fill="none" stroke="#C9463A" stroke-width="5" stroke-dasharray="14 9"/>';
  hc += D.line("M 132 300 L 640 300", 3, "#9DB0B8");
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1060 }) + roi + roiGan + g("hc", hc));
  api.noi({});

  // ---- mốc lời ----
  var tClosed = T("closed", 0, 3.24), tRoad2 = T("road", 1, 4.2), tTun1 = T("tunnel", 0, 4.72), tTun2 = T("tunnel", 1, 5.54), tGone = T("gone", 0, 5.94), tBed = T("bed", 0, 6.24);
  var tHold = T("holding", 0, 7.16), tNot = T("not", 0, 8.76), tSo = T("so", 0, 14.728), tHi = T("hi", 0, 9.72), tWob = T("wob", 0, 10.1), tStays = T("stays", 0, 12.56), tCar = T("car", 0, 11.74), tRoof = T("roof", 0, 12.68), tFig = T("figured", 0, 14.28), tYet = T("yet", 0, 15.18);
  var tCut = tSo - 0.06;

  // ---- camera ----
  api.camera([
    [0, 1180, 640, 1.0], [3.7, 1120, 650, 1.06, "sine.inOut"],
    [tRoad2 - 0.1, 880, 620, 1.42, "power3.inOut"], [tBed + 0.2, 900, 630, 1.48, "sine.inOut"],
    [tHold - 0.1, 1170, 735, 1.72, "power3.inOut"], [tHi - 0.3, 1170, 735, 1.74, "sine.inOut"], [tHi + 0.6, 1180, 720, 1.5, "power2.inOut"], [tCut - 0.04, 1190, 715, 1.56, "sine.inOut"],
    [tCut, 1720, 735, 1.5, "none"], [DUR, 1715, 730, 1.6, "sine.inOut"]
  ]);

  // ---- tuyết rơi: lớp xa tối dần, bông tuyết lớn mờ hơn ----
  api.set("#snowfx2", 0, { opacity: 0.75 });

  // ---- đèn tín hiệu: sáng sẵn, tắt lần lượt ----
  ["#den-b0", "#den-b1", "#den-b2"].forEach(function (s) { api.show(s, 0, 1); });
  api.key("#den-b0", "opacity", tTun1, 1, "none"); api.key("#den-b0", "opacity", tTun1 + 0.12, 0, "power2.in");
  api.key("#den-b1", "opacity", tTun2, 1, "none"); api.key("#den-b1", "opacity", tTun2 + 0.12, 0, "power2.in");
  api.key("#den-b2", "opacity", tGone + 0.1, 1, "none"); api.key("#den-b2", "opacity", tGone + 0.22, 0, "power2.in");

  // ---- thanh chắn: dựng đứng → hạ đúng "bed", nảy ----
  api.origin("#chan2-arm", "0 0");
  api.key("#chan2-arm", "rotation", 0, -86); api.key("#chan2-arm", "rotation", tGone - 0.05, -86, "none");
  api.key("#chan2-arm", "rotation", tBed, 2, "power3.in"); api.key("#chan2-arm", "rotation", tBed + 0.12, -4, "sine.out"); api.key("#chan2-arm", "rotation", tBed + 0.3, 0, "sine.inOut");
  api.sfx("bonk", tBed, 0.7);
  api.shake(tBed, 6, 5);

  // ---- Wob đứng trước cổng ----
  W.set(0, { x: 1060, y: 922, size: 0.7, aLu: 18, aLf: -10, aRu: -150, aRf: 20, lashes: 1, ice: 0, pupX: 0, pupY: 2, op: 1 });
  W.mouth(0, "grin");
  api.origin("#W-fold", "0 0");
  // giơ tờ lịch, lắc khoe, liếc về cổng hầm
  W.pose(0.5, 0.25, { aRu: -160, aRf: 30 }, "sine.inOut"); W.pose(0.75, 0.25, { aRu: -145, aRf: 10 }, "sine.inOut");
  W.pose(1.0, 0.25, { aRu: -160, aRf: 30 }, "sine.inOut"); W.pose(1.25, 0.3, { aRu: -150, aRf: 20 }, "sine.inOut");
  W.pose(1.7, 0.3, { pupX: -9, pupY: 0 }, "power2.out");
  W.mouth(1.9, "smirk");
  W.idle(0.3, tClosed, { seed: 11, bien: 2.2 });
  W.soc(tClosed + 0.05, { mieng: "o" });
  W.pose(tClosed + 0.4, 0.3, { pupX: 0, pupY: 3, aRu: -60, aRf: -20 }, "power2.inOut");
  W.mouth(tClosed + 0.5, "flat");
  // nhìn đèn tắt
  W.pose(tTun1 - 0.2, 0.25, { pupX: -10, pupY: -8 }, "power2.out");
  W.pose(tTun2 - 0.1, 0.2, { pupX: -8, pupY: -6 }, "power2.out");
  W.idle(tClosed + 0.8, tBed - 0.1, { seed: 12, bien: 1.6 });
  // thanh chắn sát mũi: chớp mắt, giật lùi nhẹ
  W.pose(tBed - 0.04, 0.08, { lean: -3, pupX: -2, pupY: 6 }, "power2.out");
  W.blinkAt(tBed + 0.12); W.blinkAt(tBed + 0.5);
  W.mouth(tBed + 0.05, "o"); W.mouth(tBed + 0.5, "flat");
  W.pose(tBed + 0.3, 0.3, { lean: 0 }, "sine.inOut");
  // mở tờ lịch, nhìn thẳng người xem, giữ; chóp tuyết mọc
  api.show("#W-fold", 0, 1); api.show("#W-fold", tHold - 0.05, 0);
  W.pose(tHold - 0.25, 0.3, { aRu: -70, aRf: -40, aLu: -10, aLf: -20 }, "power2.out");
  api.origin("#tt", "-120 0");
  api.key("#tt", "scaleX", 0, 0.05); api.key("#tt", "scaleX", tHold - 0.1, 0.05, "none"); api.key("#tt", "scaleX", tHold + 0.25, 1, "back.out(1.8)");
  api.show("#tt", 0, 0); api.show("#tt", tHold - 0.1, 1);
  api.sfx("whoosh", tHold - 0.1, 0.3);
  // khoanh đỏ 23:00 tự vẽ
  api.moiKhung(function (t) {
    if (typeof document === "undefined") return;
    var p = document.getElementById("kh-p"); if (!p) return;
    var L = 1200, u = Math.max(0, Math.min(1, (t - (tHold + 0.4)) / 0.6));
    p.setAttribute("stroke-dasharray", L); p.setAttribute("stroke-dashoffset", String(L * (1 - u)));
  });
  W.pose(tHold + 0.5, 0.25, { pupX: 10, pupY: 4 }, "power2.out");
  W.pose(T("timetable", 0, 7.54) + 0.4, 0.25, { pupX: 0, pupY: 2 }, "power2.out");    // nhìn người xem
  W.mouth(tNot - 0.2, "flat");
  W.set(0, { snow: 0 });
  api.origin("#W-snow", "200 60");
  W.pose(T("timetable", 0, 7.54) + 0.2, 0.3, { snow: 1 }, "power2.out");
  api.key("#W-snow", "scaleY", 0, 0.3); api.key("#W-snow", "scaleX", 0, 0.6);
  api.key("#W-snow", "scaleY", T("timetable", 0, 7.54) + 0.2, 0.3, "none"); api.key("#W-snow", "scaleX", T("timetable", 0, 7.54) + 0.2, 0.6, "none");
  api.key("#W-snow", "scaleY", tSo - 0.4, 2.0, "power1.in"); api.key("#W-snow", "scaleX", tSo - 0.4, 0.95, "power1.in");
  W.idle(tHold + 0.3, tCut, { seed: 13, bien: 1.2 });
  // ---- lời chào nhận diện: gấp tờ lịch, vẫy tay với người xem; thẻ hộ chiếu lật vào góc trái trên ----
  api.key("#tt", "scaleX", tHi - 0.35, 1, "none"); api.key("#tt", "scaleX", tHi - 0.05, 0.05, "power2.in");
  api.show("#tt", tHi - 0.05, 0);
  W.pose(tHi - 0.3, 0.3, { aRu: -18, aRf: 10, aLu: 18, aLf: -10, pupX: 0, pupY: 3 }, "power2.inOut");
  W.mouth(tHi, "grin");
  W.walk(tHi - 0.05, tHi + 0.75, 1060, 1265, { step: 0.26, tieng: true });
  W.vay(tHi + 0.8, 6, "R");
  W.pose(tWob + 0.1, 0.12, { sy: 1.05 }, "power2.out"); W.pose(tWob + 0.25, 0.25, { sy: 1 }, "back.out(2)");
  W.blinkAt(11.4);
  W.pose(T("why", 0, 12.16), 0.25, { pupX: 8, pupY: -6 }, "power2.out");
  W.nhunVai(tStays + 0.1, 0.4);
  W.pose(tStays + 0.9, 0.25, { pupX: 0, pupY: 3 }, "power2.out");
  W.mouth(13.4, "wobbly");
  W.shiver(13.4, 14.1, 1.6, 14);
  api.origin("#hc", "96 54");
  api.key("#hc", "scaleY", 0, 0); api.key("#hc", "scaleY", tHi - 0.05, 0, "none"); api.key("#hc", "scaleY", tHi + 0.3, 1, "back.out(1.6)");
  api.key("#hc", "scaleY", tSo - 0.32, 1, "none"); api.key("#hc", "scaleY", tSo - 0.02, 0, "power2.in");
  api.sfx("whoosh", tHi - 0.05, 0.35); api.sfx("whoosh", tSo - 0.32, 0.3);
  api.show("#W", 0, 1); api.show("#W", tCut, 0);
  api.show("#tt", tCut, 0);

  // ---- ngủ trong xe mở mui ----
  api.show("#S", 0, 0); api.show("#S", tCut, 1);
  api.show("#chan", 0, 0); api.show("#chan", tCut, 1);
  S.set(0, { x: 1668, y: 884, size: 0.62, lid: 62, lashes: 1, ice: 0, aLu: 30, aLf: -60, aRu: -30, aRf: 60, snow: 1, lean: -6 });
  S.mouth(0, "flat");
  S.breathe(tCut, DUR, 2.2);
  S.idle(tCut, DUR, { seed: 21, bien: 1.2 });
  S.shiver(tCut + 1.2, tCut + 1.9, 2.2, 16);
  api.sfx("brr", tCut + 1.2, 0.55);
  S.mouth(tCut + 1.2, "chatter"); S.mouth(tCut + 2.0, "flat");
  // mí hé ra nhìn hành khách tuyết rồi nhắm lại
  S.pose(tFig, 0.2, { lid: 24, pupX: 12 }, "power2.out");
  S.pose(tYet + 0.1, 0.25, { lid: 62 }, "power2.in");
  api.origin("#hk-than", "0 0"); api.origin("#hk-dau", "0 -160");
  api.key("#hk-than", "scaleY", 0, 0.12); api.key("#hk-than", "scaleY", tCut + 0.3, 0.12, "none"); api.key("#hk-than", "scaleY", tFig - 0.3, 1, "power1.inOut");
  api.key("#hk-than", "scaleX", 0, 1);
  api.pop("#hk-dau", tFig - 0.25, 0.3);
  api.sfx("pop", tFig - 0.2, 0.35);
  api.origin("#hk", "0 0");
  api.key("#hk", "rotation", 0, 0); api.key("#hk", "rotation", tYet - 0.1, 0, "none"); api.key("#hk", "rotation", tYet + 0.2, -9, "sine.inOut");   // "hành khách" nghiêng tựa vai Wob
};
