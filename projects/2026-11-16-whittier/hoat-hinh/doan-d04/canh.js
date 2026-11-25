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
/* Đoạn d04 · cắt giấy · bãi chờ nhiều làn trước hầm, buổi sáng. Vào "giay", ra "chen" (cắt cứng).
   Chữ: 7:00, 23:00, 15 min (trên tờ lịch mở). Đèn đỏ tiền cảnh 1/3 trái; xe Wob lăn vào làn đầu; tờ lịch che kín kính. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, CH = data.chu_tren_do_vat;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var MAT = 900, X = 1000;
  var xe = WT.convertible("xe", { tuyet: 0.55 });
  var A = WT.wob(api, "A", {});
  var troi = WT.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#wtSang)"/>';
  var xa = WT.nuiXa(-900, 3400, 700, 7, "#8C9DA6", 360) + at(1500, 700, '<g transform="scale(0.32)">' + WT.tunnelPortal("hamxa", { seed: 805 }) + "</g>") +
    '<rect x="-900" y="640" width="4300" height="600" fill="#FFFFFF" opacity="0.25"/>';
  var mid = "";
  mid += D.paper(D.rough([[-900, 720], [3400, 716], [3400, 1700], [-900, 1700]], 3, 821, 30), "#E9EEF0", { shadow: false });
  // ba làn chờ: mặt đường xám, vạch kẻ
  [[740, 70], [820, 80], [905, 110]].forEach(function (l, i) {
    mid += '<rect x="-900" y="' + (l[0] - l[1] / 2) + '" width="4300" height="' + l[1] + '" fill="#6E7678" opacity="' + (0.55 + i * 0.12) + '"/>';
    mid += D.line("M -900 " + (l[0] + l[1] / 2) + " L 3400 " + (l[0] + l[1] / 2), 3, "#F6EEDC", ' stroke-dasharray="40 30" opacity="0.8"');
  });
  // hàng xe chờ ở làn sau
  var mau = ["#3F6A70", "#C89A62", "#5E7F8C", "#7A5236", "#9AA5A8", "#3F6A70", "#B98A22"];
  for (var i = 0; i < 6; i++) mid += at(1400 + i * 260 - (i % 2) * 40, 752, '<g transform="scale(0.5)">' + WT.carSmall(mau[i], 870 + i) + "</g>");
  for (var j = 0; j < 5; j++) mid += at(1250 + j * 330, 836, '<g transform="scale(0.68)">' + WT.carSmall(mau[(j + 3) % 7], 880 + j) + "</g>");
  mid += g("xeG", at(0, 924, xe.back) + A.svg + at(0, 924, xe.front));
  // tờ lịch mở (che kín kính chắn gió), hình xe/tàu và chữ trên tờ
  var tt = WT.timetableOpen("tto", 540, 340, { chu: [
    { id: "c7", x: -130, y: -40, chu: CH[0], co: 60 },
    { id: "c23", x: 130, y: -40, chu: CH[1], co: 60 },
    { id: "c15", x: 0, y: 140, chu: CH[2], co: 44 }] });
  tt += at(130, -60, g("kh", WT.khoanh("kh", 104, 46, 3)));
  tt += at(52, 68, g("icXe", WT.iconCar(WT.GACH))) + at(-118, 66, g("icTau", WT.iconTrain()));
  tt += g("but", '<g transform="rotate(30)">' + D.pencil(130) + "</g>");
  mid += at(X, 905, g("tt", tt));
  var gan = at(330, 1170, '<g transform="scale(1.3)">' + WT.signal3("den", { cao: 330 }) + "</g>") +
    D.paper(D.rough([[-500, 1090], [0, 1050], [600, 1070], [800, 1300], [-500, 1300]], 4, 829, 26), D.C.snow, { stroke: true, sw: 4 });
  api.dat(troi + api.lop("xa", xa, 0.35, { mat: 700 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1080 }));
  api.noi({ vaoDai: 0.5 });

  var r0 = T("fifteen-minute", 0, 12.31) + 0.5;
  var tRead = T("read", 0, 3.38), tWinter = T("winter", 0, 4.96), tSeven = T("seven", 0, 6.6), tEleven = T("eleven", 0, 8.8), tCars = T("cars", 0, 10.07);
  var tTurns = T("turns", 0, 11.36), t15 = T("fifteen-minute", 0, 12.31), tOne = T("one", 0, 13.84), tTime = T("time", 0, 14.75);

  api.camera([
    [0, 980, 650, 1.0], [2.6, 960, 680, 1.08, "sine.inOut"], [tRead + 0.4, 990, 760, 1.32, "power2.inOut"],
    [tWinter - 0.2, X, 880, 2.0, "power3.inOut"], [tCars, X, 885, 2.04, "sine.inOut"], [r0 + 0.4, X, 900, 1.75, "power2.inOut"], [DUR, X, 905, 1.8, "sine.inOut"]
  ]);
  // đèn đỏ: chỉ bóng đỏ trên cùng sáng
  api.show("#den-b0", 0, 1); api.show("#den-b1", 0, 0); api.show("#den-b2", 0, 0);

  // ---- xe lăn vào làn đầu ----
  api.origin("#xeG", "0 0");
  api.key("#xeG", "x", 0, -700); api.key("#xeG", "x", 0.25, -700, "none"); api.key("#xeG", "x", 2.5, X, "power2.out");
  api.key("#xeG", "rotation", 0, 0); api.key("#xeG", "rotation", 2.5, 0, "none"); api.key("#xeG", "rotation", 2.62, 1.2, "sine.out"); api.key("#xeG", "rotation", 2.85, 0, "sine.inOut");
  A.set(0, { x: 18, y: 884, size: 0.62, lashes: 1, ice: 0, aLu: 30, aLf: -50, aRu: -30, aRf: 50, pupX: -8, pupY: -4 });
  A.mouth(0, "smirk");
  A.idle(0.3, tRead - 0.2, { seed: 41, bien: 1.8 });
  A.pose(2.5, 0.12, { sy: 0.94 }, "power2.out"); A.pose(2.62, 0.25, { sy: 1 }, "back.out(2)");
  A.pose(1.2, 0.3, { pupX: -10, pupY: -8 }, "power2.out");     // nhìn đèn đỏ
  A.pose(2.9, 0.3, { pupX: 6, pupY: 4 }, "power2.out");         // nhìn xuống túi
  api.sfx("xuoc-dia", 2.45, 0.25);

  // ---- mở tờ lịch: to bằng cả kính chắn gió ----
  api.origin("#tt", "0 0");
  api.key("#tt", "scale", 0, 0.12); api.key("#tt", "scale", tRead - 0.05, 0.12, "none"); api.key("#tt", "scale", tRead + 0.4, 1, "back.out(1.7)");
  api.key("#tt", "y", 0, -140); api.key("#tt", "y", tRead - 0.05, -140, "none"); api.key("#tt", "y", tRead + 0.4, 0, "power2.out");
  api.show("#tt", 0, 0); api.show("#tt", tRead - 0.05, 1);
  api.sfx("whoosh", tRead - 0.05, 0.35);
  A.pose(tRead - 0.1, 0.3, { aLu: -150, aLf: 30, aRu: 150, aRf: -30, pupX: 0, pupY: 6 }, "power2.out");
  A.mouth(tRead + 0.3, "o");
  // chữ hiện đúng lời; bút chì khoanh 23:00 ba vòng
  ["#c7", "#c23", "#c15", "#icXe", "#icTau"].forEach(function (s) { api.origin(s, "0 0"); });
  api.key("#c7", "scale", 0, 0); api.key("#c7", "scale", tSeven - 0.05, 0, "none"); api.key("#c7", "scale", tSeven + 0.2, 1, "back.out(2.6)");
  api.key("#c23", "scale", 0, 0); api.key("#c23", "scale", tEleven - 0.05, 0, "none"); api.key("#c23", "scale", tEleven + 0.2, 1, "back.out(2.6)");
  api.sfx("ting", tSeven, 0.45); api.sfx("ting", tEleven, 0.5);
  A.pose(tSeven - 0.1, 0.2, { pupX: -10, pupY: 8 }, "power2.out"); A.pose(tEleven - 0.1, 0.2, { pupX: 10, pupY: 8 }, "power2.out");
  A.mouth(tEleven + 0.1, "flat");
  var k0 = tEleven + 0.3, k1 = tCars - 0.15;
  api.show("#but", 0, 0); api.show("#but", k0 - 0.1, 1); api.show("#but", k1 + 0.2, 0);
  api.moiKhung(function (t) {
    if (typeof document === "undefined") return;
    var p = document.getElementById("kh-p"), b = document.getElementById("but"); if (!p || !b) return;
    var L = p.getTotalLength() + 4, u = Math.max(0, Math.min(1, (t - k0) / (k1 - k0)));
    p.setAttribute("stroke-dasharray", L.toFixed(0)); p.setAttribute("stroke-dashoffset", (L * (1 - u)).toFixed(1));
    var a = -Math.PI * 0.6 + u * 3 * Math.PI * 2, kk = 1 + 0.18 * u;
    b.setAttribute("transform", "translate(" + (130 + Math.cos(a) * 104 * kk).toFixed(1) + "," + (-60 + Math.sin(a) * 46 * kk).toFixed(1) + ")");
  }, { twos: true });
  api.sfx("xuoc-dia", k0, 0.2); api.show("#kh", 0, 0); api.show("#kh", k0, 1);
  // hình xe, tàu, nhãn 15 min
  api.key("#icXe", "scale", 0, 0); api.key("#icXe", "scale", tCars, 0, "none"); api.key("#icXe", "scale", tCars + 0.22, 1, "back.out(2.6)");
  api.key("#icTau", "scale", 0, 0); api.key("#icTau", "scale", T("trains", 0, 10.56), 0, "none"); api.key("#icTau", "scale", T("trains", 0, 10.56) + 0.22, 1, "back.out(2.6)");
  api.key("#c15", "scale", 0, 0); api.key("#c15", "scale", t15 - 0.05, 0, "none"); api.key("#c15", "scale", t15 + 0.2, 1, "back.out(2.6)");
  api.sfx("pop", tCars, 0.4); api.sfx("pop", T("trains", 0, 10.56), 0.4); api.sfx("ting", t15, 0.35);
  A.pose(tCars, 0.2, { pupX: 6, pupY: 10 }, "power2.out"); A.pose(T("trains", 0, 10.56), 0.2, { pupX: -8, pupY: 10 }, "power2.out");
  A.idle(tRead + 0.5, DUR, { seed: 42, bien: 1.2 });
  // xoay tờ lịch như vô lăng; tàu húc xe; giật tay
  api.key("#tt", "rotation", 0, 0); api.key("#tt", "rotation", r0, 0, "none");
  api.key("#tt", "rotation", r0 + 0.45, -16, "sine.inOut"); api.key("#tt", "rotation", tOne - 0.05, 14, "sine.inOut");
  var tHuc = tOne + 0.15;
  api.key("#icTau", "x", 0, 0); api.key("#icTau", "x", tOne - 0.1, 0, "none"); api.key("#icTau", "x", tHuc, 62, "power2.in"); api.key("#icTau", "x", tHuc + 0.2, 40, "sine.out");
  api.key("#icXe", "x", 0, 0); api.key("#icXe", "x", tHuc, 0, "none"); api.key("#icXe", "x", tHuc + 0.12, 36, "power3.out"); api.key("#icXe", "rotation", 0, 0); api.key("#icXe", "rotation", tHuc, 0, "none"); api.key("#icXe", "rotation", tHuc + 0.12, 14, "power3.out");
  api.key("#tt", "rotation", tHuc, 14, "none"); api.key("#tt", "rotation", tHuc + 0.1, 2, "power3.out"); api.key("#tt", "rotation", tHuc + 0.35, 0, "sine.inOut");
  api.key("#tt", "y", r0, 0, "none"); api.key("#tt", "y", r0 + 0.4, 120, "power2.inOut"); api.key("#tt", "y", tHuc, 120, "none"); api.key("#tt", "y", tHuc + 0.08, 142, "power3.out"); api.key("#tt", "y", tHuc + 0.3, 134, "sine.inOut");
  api.sfx("bonk", tHuc, 0.55);
  A.pose(tHuc, 0.08, { eye: 1.25, sy: 0.92, pupX: 0, pupY: 2 }, "power3.out"); A.pose(tHuc + 0.3, 0.3, { eye: 1.08, sy: 1 }, "back.out(2)");
  A.mouth(tHuc + 0.05, "o");
  A.blinkAt(tHuc + 0.7);
};
