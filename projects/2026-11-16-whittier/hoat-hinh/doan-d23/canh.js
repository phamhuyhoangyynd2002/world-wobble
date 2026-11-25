/* canh.js sinh bởi ghep-canh-wh-a.sh: prelude cat-giay-wh-a.js + doan-d23/canh-rieng.js. Sửa ở hai file nguồn. */
/* ---- Bộ dựng riêng tập Whittier, nhóm cắt giấy A (d20 d22 d23 d24 d26 d27 d29). Chép giống nhau vào đầu canh.js
   các đoạn này bằng ghep-canh-wh-a.sh (tao_sfx.mjs chỉ nạp canh.js). Không sửa lib chung.
   Trang phục: áo mưa vàng #E2B33C (mũ trùm / hạ mũ / áo thứ hai), mũ lưỡi trai xanh băng, ba lô ô liu có cuộn thảm đỏ,
   giày đỏ hoặc ủng cao su (bật tắt bằng opacity). Tất định: mọi ngẫu nhiên qua DaoCu.rng(seed). ---- */
var WH = (function () {
  "use strict";
  var D = window.DaoCu, INK = D.INK;
  var RAIN = "#E2B33C", RAIN_D = "#B98A22", CAP = "#A9D8E6", CAP_D = "#6FA9BE", OLIVE = "#76803F", OLIVE_D = "#525B2B";
  var BOOT = "#4F7A5A", BOOT_D = "#365642", KEM = "#EDE3CC", KEM_D = "#CFC2A4", BETONG = "#B9B6AC";
  function f1(n) { return (Math.round(n * 10) / 10).toString(); }
  function defs() {
    return "<defs>" +
      '<linearGradient id="whBao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E9BA0"/><stop offset="0.6" stop-color="#B7C2C2"/><stop offset="1" stop-color="#D3D8D2"/></linearGradient>' +
      '<linearGradient id="whChang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4C5E6E"/><stop offset="0.6" stop-color="#7C8C96"/><stop offset="1" stop-color="#A9A9A2"/></linearGradient>' +
      '<linearGradient id="whHe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FD0E2"/><stop offset="0.7" stop-color="#D6ECEF"/><stop offset="1" stop-color="#F3EEDC"/></linearGradient>' +
      '<linearGradient id="whDem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2F4566"/><stop offset="0.55" stop-color="#5D6F93"/><stop offset="1" stop-color="#C99A86"/></linearGradient>' +
      '<linearGradient id="whNuoc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E7F86"/><stop offset="1" stop-color="#3C5A62"/></linearGradient>' +
      '<linearGradient id="whNuocTram" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55677A"/><stop offset="1" stop-color="#34424F"/></linearGradient>' +
      '<linearGradient id="whNuocHe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5FA0AE"/><stop offset="1" stop-color="#3F7A88"/></linearGradient>' +
      '<linearGradient id="whHam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E2A30"/><stop offset="1" stop-color="#2F3B40"/></linearGradient>' +
      '<radialGradient id="whSang" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE3A6" stop-opacity="0.85"/><stop offset="1" stop-color="#FFE3A6" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="whXanh" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#9BF2B0" stop-opacity="0.9"/><stop offset="1" stop-color="#9BF2B0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="whDo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FF9A84" stop-opacity="0.9"/><stop offset="1" stop-color="#FF9A84" stop-opacity="0"/></radialGradient>' +
      "</defs>";
  }

  /* ---------- trang phục Wob (toạ độ gốc 400×400) ---------- */
  var CAPE = "M 200 40 C 292 40 338 112 336 190 C 336 250 350 300 362 338 C 292 358 108 358 38 338 C 50 300 64 250 64 190 C 62 112 108 40 200 40 Z";
  var HOLE = " M 200 94 C 262 94 306 136 306 186 C 306 238 262 270 200 270 C 138 270 94 238 94 186 C 94 136 138 94 200 94 Z";
  function aoTrum() {
    var s = '<path d="' + CAPE + HOLE + '" fill="#0b1214" opacity="0.2" fill-rule="evenodd" transform="translate(5,7)"/>';
    s += '<path d="' + CAPE + HOLE + '" fill="' + RAIN + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
    s += '<path d="' + CAPE + HOLE + '" fill="url(#half)" fill-rule="evenodd" opacity="0.12"/>';
    s += D.line("M 96 196 C 92 150 124 104 176 96", 5, "#F4D777", ' opacity="0.8"');
    s += D.line("M 150 286 L 154 340 M 250 286 L 246 340", 4, RAIN_D, ' opacity="0.8"');
    s += '<circle cx="200" cy="300" r="7" fill="' + RAIN_D + '" stroke="' + INK + '" stroke-width="3"/><circle cx="200" cy="326" r="7" fill="' + RAIN_D + '" stroke="' + INK + '" stroke-width="3"/>';
    return s;
  }
  function aoHa() {
    var d = "M 64 232 C 120 266 280 266 336 232 C 342 280 352 310 362 338 C 292 358 108 358 38 338 C 48 310 58 280 64 232 Z";
    var s = D.paper(d, RAIN, { stroke: true, sw: 6, half: 0.12, sx: 5, sy: 7 });
    s += D.line("M 70 240 C 130 272 270 272 330 240", 7, RAIN_D);
    s += '<circle cx="200" cy="300" r="7" fill="' + RAIN_D + '" stroke="' + INK + '" stroke-width="3"/><circle cx="200" cy="326" r="7" fill="' + RAIN_D + '" stroke="' + INK + '" stroke-width="3"/>';
    return s;
  }
  function aoLen() {   // áo len trong (đan, màu gạch sọc kem)
    var d = "M 66 238 C 120 270 280 270 334 238 C 338 270 340 300 334 322 C 280 344 120 344 66 322 C 60 300 62 270 66 238 Z";
    var s = D.paper(d, "#B8553E", { stroke: true, sw: 5, half: 0.1, sx: 4, sy: 6 });
    s += D.line("M 70 262 C 130 292 270 292 330 262", 6, "#F2E3C4") + D.line("M 68 296 C 130 324 270 324 332 296", 6, "#F2E3C4");
    for (var x = 90; x < 320; x += 22) s += D.line("M " + x + " 312 L " + x + " 330", 3, "#8E3E2C", ' opacity="0.6"');
    return s;
  }
  function ao2() {   // áo mưa nhỏ thứ hai khoác lên vai trái, nhỏ nước
    var d = "M 70 170 C 96 136 150 132 176 160 L 190 250 C 160 262 110 262 78 252 C 66 226 62 196 70 170 Z";
    var s = D.paper(d, "#EBC24E", { stroke: true, sw: 5, half: 0.14, sx: 4, sy: 6 });
    s += D.paper("M 64 196 L 40 250 L 62 258 L 80 214 Z", "#EBC24E", { stroke: true, sw: 4, shadow: false });
    s += D.line("M 96 168 C 120 150 148 150 166 168", 4, RAIN_D);
    s += '<path d="M 100 262 C 96 272 104 280 100 290 C 96 280 92 272 100 262 Z M 160 262 C 156 274 166 282 160 292 C 154 282 152 274 160 262 Z" fill="#9FD3E3" stroke="' + INK + '" stroke-width="2"/>';
    return s;
  }
  function muLuoi() {
    var s = '<path d="M 116 92 C 116 38 156 14 200 14 C 244 14 284 38 284 92 Z" fill="#0b1214" opacity="0.18" transform="translate(5,6)"/>';
    s += '<path d="M 116 92 C 116 38 156 14 200 14 C 244 14 284 38 284 92 Z" fill="' + CAP + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
    s += D.line("M 200 16 L 200 90 M 156 26 C 146 46 142 70 142 90 M 244 26 C 254 46 258 70 258 90", 3, CAP_D, ' opacity="0.8"');
    s += '<path d="M 104 88 C 150 110 250 110 296 88 C 300 104 290 124 270 126 C 230 116 170 116 130 126 C 110 124 100 104 104 88 Z" fill="' + CAP_D + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>';
    s += '<circle cx="200" cy="16" r="9" fill="' + CAP_D + '" stroke="' + INK + '" stroke-width="4"/>';
    s += D.line("M 140 40 C 156 28 172 22 188 22", 6, "#ffffff", ' opacity="0.4"');
    return s;
  }
  function cuonTham() {   // vẽ lại cuộn thảm đỏ trên nắp ba lô (để thấy được khi khoác áo mưa)
    return '<rect x="262" y="66" width="96" height="36" rx="18" fill="#d9543c" stroke="' + INK + '" stroke-width="7"/>' +
      D.line("M 282 70 L 282 98 M 336 70 L 336 98", 4);
  }
  function bootSvg(side) {
    var m = side === "L" ? 1 : -1;
    var d = "M " + (-22 * m) + " 36 L " + (12 * m) + " 36 L " + (10 * m) + " 90 C " + (12 * m) + " 98 " + (14 * m) + " 104 " + (8 * m) + " 106 L " + (-48 * m) + " 106 C " + (-52 * m) + " 94 " + (-40 * m) + " 88 " + (-24 * m) + " 86 Z";
    return '<path d="' + d + '" fill="' + BOOT + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
      D.line("M " + (-22 * m) + " 46 L " + (12 * m) + " 46", 4, BOOT_D) + D.line("M " + (-14 * m) + " 56 L " + (-16 * m) + " 80", 4, "#7FA88A", ' opacity="0.7"');
  }
  /* o: ao ("trum" | "ha" | null), ao2 (true), mu ("luoi"), ung (true: thêm ủng, ẩn bằng opacity; o.ungHien: hiện ủng từ đầu) */
  function wob(api, id, o) {
    o = o || {};
    var pk = "";
    pk += '<g id="' + id + '-len">' + aoLen() + "</g>";
    pk += '<g id="' + id + '-aoT">' + aoTrum() + "</g>";
    pk += '<g id="' + id + '-aoH">' + aoHa() + "</g>";
    pk += '<g id="' + id + '-tham">' + cuonTham() + "</g>";
    pk += '<g id="' + id + '-ao2"><g transform="translate(6,70) scale(0.82)">' + ao2() + "</g></g>";
    pk += '<g id="' + id + '-cap">' + muLuoi() + "</g>";
    var oo = {}; Object.keys(o).forEach(function (k) { if (["ao", "ao2", "mu", "ung", "ungHien", "len"].indexOf(k) < 0) oo[k] = o[k]; });
    oo.phuKien = pk + (o.phuKien || "");
    var W = api.wob(id, oo);
    var s = W.svg.replace(/#b8743a/g, OLIVE).replace(/#8e5527/g, OLIVE_D);
    var shoeL = '<ellipse cx="-16" cy="95" rx="28" ry="12" fill="#d9543c" stroke="' + INK + '" stroke-width="5"/>';
    var shoeR = '<ellipse cx="16" cy="95" rx="28" ry="12" fill="#d9543c" stroke="' + INK + '" stroke-width="5"/>';
    s = s.replace(shoeL, '<g id="' + id + '-giayL">' + shoeL + '</g><g id="' + id + '-ungL">' + bootSvg("L") + "</g>");
    s = s.replace(shoeR, '<g id="' + id + '-giayR">' + shoeR + '</g><g id="' + id + '-ungR">' + bootSvg("R") + "</g>");
    W.svg = s;
    var ao = o.ao || null;
    api.show("#" + id + "-aoT", 0, ao === "trum" ? 1 : 0);
    api.show("#" + id + "-aoH", 0, ao === "ha" ? 1 : 0);
    api.show("#" + id + "-tham", 0, ao ? 1 : 0);
    api.show("#" + id + "-ao2", 0, o.ao2 ? 1 : 0);
    api.show("#" + id + "-len", 0, o.len ? 1 : 0);
    api.show("#" + id + "-cap", 0, o.mu === "luoi" ? 1 : 0);
    var u = o.ungHien ? 1 : 0;
    ["L", "R"].forEach(function (sd) { api.show("#" + id + "-ung" + sd, 0, u); api.show("#" + id + "-giay" + sd, 0, 1 - u); });
    /* đổi trang phục giữa đoạn */
    W.doiAo = function (t, kieu) {
      api.show("#" + id + "-aoT", t, kieu === "trum" ? 1 : 0); api.show("#" + id + "-aoH", t, kieu === "ha" ? 1 : 0);
      api.show("#" + id + "-tham", t, kieu ? 1 : 0);
    };
    W.doiUng = function (t, coUng) { ["L", "R"].forEach(function (sd) { api.show("#" + id + "-ung" + sd, t, coUng ? 1 : 0); api.show("#" + id + "-giay" + sd, t, coUng ? 0 : 1); }); };
    return W;
  }

  /* ---------- cảnh ---------- */
  /* dãy núi dốc. o: mau, tuyet (màu chóp tuyết | false), cao [min,max], rong [min,max], thac (vẽ thác trắng) */
  function nui(x0, x1, base, seed, o) {
    o = o || {};
    var r = D.rng(seed || 7), x = x0, s = "<g>", cao = o.cao || [260, 460], rong = o.rong || [320, 560];
    while (x < x1) {
      var w = rong[0] + r() * (rong[1] - rong[0]), h = cao[0] + r() * (cao[1] - cao[0]), px = x + w * (0.4 + r() * 0.2);
      var d = "M " + f1(x - 40) + " " + (base + 40) + " L " + f1(x) + " " + base + " L " + f1(px - w * 0.18) + " " + f1(base - h * 0.78) + " L " + f1(px) + " " + f1(base - h) +
        " L " + f1(px + w * 0.12) + " " + f1(base - h * 0.84) + " L " + f1(x + w) + " " + base + " L " + f1(x + w + 40) + " " + (base + 40) + " Z";
      s += D.paper(d, o.mau || "#7E9A86", { stroke: !!o.vien, sw: 3, half: 0.1, sx: 8, sy: 6, shOp: 0.15 });
      s += '<path d="M ' + f1(px) + " " + f1(base - h) + " L " + f1(px + w * 0.12) + " " + f1(base - h * 0.84) + " L " + f1(x + w) + " " + base + " L " + f1(px + w * 0.05) + " " + base + ' Z" fill="#0b1214" opacity="0.12"/>';
      if (o.tuyet !== false) {
        var sd = "M " + f1(px - w * 0.11) + " " + f1(base - h * 0.84) + " L " + f1(px) + " " + f1(base - h) + " L " + f1(px + w * 0.09) + " " + f1(base - h * 0.88) +
          " L " + f1(px + w * 0.03) + " " + f1(base - h * 0.82) + " L " + f1(px - w * 0.03) + " " + f1(base - h * 0.86) + " Z";
        s += D.paper(sd, o.tuyet || "#F7FBFC", { shadow: false });
      }
      if (o.thac && r() < 0.6) s += D.line("M " + f1(px - w * 0.05) + " " + f1(base - h * 0.6) + " C " + f1(px - w * 0.02) + " " + f1(base - h * 0.4) + " " + f1(px - w * 0.08) + " " + f1(base - h * 0.2) + " " + f1(px - w * 0.04) + " " + base, 8, "#F4FAFB", ' opacity="0.85"');
      x += w * (0.62 + r() * 0.25);
    }
    return s + "</g>";
  }
  /* mặt nước từ y xuống. id-s<i>: các con sóng (gốc ở chân sóng) */
  function nuoc(id, x0, x1, y, h, o) {
    o = o || {};
    var r = D.rng(o.seed || 9), s = '<g id="' + id + '">' + '<rect x="' + x0 + '" y="' + y + '" width="' + (x1 - x0) + '" height="' + h + '" fill="url(#' + (o.grad || "whNuoc") + ')"/>';
    s += D.line("M " + x0 + " " + y + " L " + x1 + " " + y, 4, INK, ' opacity="0.45"');
    var n = o.song || 0;
    for (var i = 0; i < n; i++) {
      var sx = x0 + (i + 0.3 + r() * 0.4) * (x1 - x0) / n, sy = y + 30 + r() * (h - 60) * 0.6, w = 70 + r() * 70;
      s += '<g transform="translate(' + f1(sx) + "," + f1(sy) + ')"><g id="' + id + "-s" + i + '">' +
        D.paper("M " + f1(-w) + " 0 C " + f1(-w * 0.4) + " -6 " + f1(-w * 0.2) + " -34 " + f1(w * 0.1) + " -38 C " + f1(w * 0.3) + " -40 " + f1(w * 0.4) + " -26 " + f1(w * 0.2) + " -20 C " + f1(w * 0.5) + " -18 " + f1(w * 0.7) + " -6 " + f1(w) + " 0 Z", o.mauSong || "#6F9097", { shadow: false, stroke: true, sw: 3 }) +
        '<path d="M ' + f1(-w * 0.1) + " -30 C " + f1(w * 0.05) + " -42 " + f1(w * 0.32) + " -36 " + f1(w * 0.22) + ' -22 C ' + f1(w * 0.1) + ' -28 ' + f1(w * 0.02) + ' -26 ' + f1(-w * 0.1) + ' -30 Z" fill="#F7FBFC"/></g></g>';
    }
    if (o.vet) for (var k = 0; k < o.vet; k++) {
      var vx = x0 + r() * (x1 - x0), vy = y + 20 + r() * (h - 30);
      s += D.line("M " + f1(vx) + " " + f1(vy) + " L " + f1(vx + 60 + r() * 80) + " " + f1(vy), 3, "#DCE6E4", ' opacity="0.45"');
    }
    return s + "</g>";
  }
  function dat(x0, x1, y, mau, seed, o) {
    o = o || {};
    return D.paper(D.rRect(x0, y, x1 - x0, o.cao || 900, 3, seed || 21), mau, { shadow: false, half: 0.1 }) +
      D.line("M " + x0 + " " + (y + 2) + " L " + x1 + " " + (y + 2), 4, INK, ' opacity="0.45"');
  }
  /* Begich Towers: một khối bê tông kem 14 tầng, ba khối nối liền, cửa sổ vuông nhỏ đều. Gốc: giữa chân. o.sc, o.den (cửa sổ sáng), id-cua (cửa chính, gốc bản lề trái) */
  function begich(id, o) {
    o = o || {};
    var tang = 14, ht = 30, s = '<g id="' + id + '"' + (o.sc ? ' transform="scale(' + o.sc + ')"' : "") + ">";
    var khoi = [[-345, 230, 0], [-115, 230, 14], [115, 230, 0]];
    khoi.forEach(function (k, ki) {
      var x = k[0], w = k[1], top = -tang * ht - 34 - k[2];
      s += D.paper(D.rRect(x, top, w, -top, 1.6, 700 + ki), ki === 1 ? KEM : "#E6DBC2", { stroke: true, sw: 5, half: 0.12, sx: 8, sy: 6 });
      s += D.paper(D.rRect(x - 6, top - 14, w + 12, 18, 1.2, 710 + ki), KEM_D, { stroke: true, sw: 4, shadow: false });
      for (var f = 0; f < tang; f++) for (var c = 0; c < 6; c++) {
        var wx = x + 18 + c * ((w - 36) / 6) + 4, wy = top + 22 + f * ht;
        var sang = o.den && ((f * 7 + c * 3 + ki * 5) % 5 < 2);
        s += '<rect x="' + f1(wx) + '" y="' + f1(wy) + '" width="20" height="18" fill="' + (sang ? "#FFD68A" : "#55666B") + '" stroke="' + INK + '" stroke-width="2"/>';
      }
      s += D.line("M " + (x + w - 4) + " " + top + " L " + (x + w - 4) + " 0", 6, "#0b1214", ' opacity="0.15"');
    });
    s += '<g transform="translate(-40,0)"><rect x="0" y="-70" width="80" height="70" fill="#2F3B40" stroke="' + INK + '" stroke-width="4"/>' +
      '<g id="' + id + '-cua"><rect x="0" y="-70" width="80" height="70" fill="#7C9AA3" stroke="' + INK + '" stroke-width="4"/>' + D.line("M 40 -70 L 40 0", 3) + "</g></g>";
    s += D.paper(D.rRect(-60, -86, 120, 18, 1, 721), KEM_D, { stroke: true, sw: 3, shadow: false });
    return s + "</g>";
  }
  /* mặt tường toà nhà cận (cửa kính hai cánh). Gốc: chân cửa giữa. id-cuaT, id-cuaP (gốc bản lề ngoài) */
  function tuongCua(id, w) {
    w = w || 1400;
    var s = '<g id="' + id + '">';
    s += D.paper(D.rRect(-w / 2, -820, w, 820, 2, 731), KEM, { stroke: true, sw: 5, half: 0.1 });
    for (var y = -760; y < -320; y += 120) for (var x = -w / 2 + 80; x < w / 2 - 80; x += 170) {
      if (Math.abs(x + 25) < 220 && y > -480) continue;
      s += '<rect x="' + x + '" y="' + y + '" width="54" height="50" fill="#55666B" stroke="' + INK + '" stroke-width="3"/>';
    }
    s += D.paper(D.rRect(-150, -380, 300, 380, 1.5, 732), "#9C9584", { stroke: true, sw: 5, shadow: false });
    s += '<rect x="-130" y="-356" width="260" height="356" fill="#26343A"/>';
    s += '<g transform="translate(-130,0)"><g id="' + id + '-cuaT"><rect x="0" y="-356" width="130" height="356" fill="#8FB0B8" stroke="' + INK + '" stroke-width="4" opacity="0.92"/>' + D.line("M 20 -330 L 60 -200", 6, "#ffffff", ' opacity="0.4"') + '<rect x="104" y="-200" width="10" height="60" rx="4" fill="#3A3A36"/></g></g>';
    s += '<g transform="translate(130,0)"><g id="' + id + '-cuaP"><rect x="-130" y="-356" width="130" height="356" fill="#8FB0B8" stroke="' + INK + '" stroke-width="4" opacity="0.92"/>' + D.line("M -100 -330 L -60 -200", 6, "#ffffff", ' opacity="0.4"') + '<rect x="-114" y="-200" width="10" height="60" rx="4" fill="#3A3A36"/></g></g>';
    s += D.paper(D.rRect(-190, -414, 380, 34, 1.2, 733), KEM_D, { stroke: true, sw: 4 });
    return s + "</g>";
  }
  /* thẻ giấy có chữ. Gốc: tâm. o: w, h, co, mau, vien */
  function the(id, chu, co, o) {
    o = o || {};
    var w = o.w || Math.max(160, chu.length * co * 0.56 + 60), h = o.h || co * 1.7;
    return '<g id="' + id + '">' + D.paper(D.rRect(-w / 2, -h / 2, w, h, 1.8, o.seed || 741), o.mau || "#F6EEDC", { stroke: true, sw: 4, half: 0.08, sx: 5, sy: 7 }) +
      D.txt(0, co * 0.36, chu, co, { w: 850, fill: o.fill }) + "</g>";
  }
  /* nhiệt kế giấy rộng có nhãn một dòng. Gốc: góc trên trái. id-merc (gốc 0 0, scaleY), id-nhan */
  function nhietKe(id, chu, co) {
    co = co || 48;
    var w = Math.max(260, chu.length * co * 0.56 + 50), cx = w / 2, s = '<g id="' + id + '">';
    s += D.paper(D.rRect(0, 0, w, 420, 2, 751), "#E9DDC2", { stroke: true, sw: 5, half: 0.15 });
    s += '<circle cx="' + cx + '" cy="18" r="6" fill="' + INK + '"/>';
    s += '<rect x="' + (cx - 17) + '" y="36" width="34" height="220" rx="17" fill="#FFFDF6" stroke="' + INK + '" stroke-width="5"/>';
    for (var y = 56; y < 246; y += 19) s += D.line("M " + (cx + 22) + " " + y + " L " + (cx + (y % 38 === 18 ? 42 : 34)) + " " + y, 3);
    s += D.line("M " + (cx - 44) + " 151 L " + (cx - 24) + " 151", 5, "#3F6A70");
    s += '<g transform="translate(' + cx + ',262)"><rect id="' + id + '-merc" x="-8" y="-214" width="16" height="214" rx="8" fill="#E85D45"/></g>';
    s += '<circle cx="' + cx + '" cy="272" r="22" fill="#E85D45" stroke="' + INK + '" stroke-width="5"/>';
    s += '<g id="' + id + '-nhan">' + D.txt(cx, 360, chu, co, { w: 900 }) + "</g>";
    return s + "</g>";
  }
  /* cột cờ: cờ id-co (path, vẽ lại mỗi khung bằng coBay). Gốc: chân cột */
  function cotCo(id, h) {
    return '<g id="' + id + '">' + D.paper(D.rRect(-7, -h, 14, h, 1, 761), "#8A8F8E", { stroke: true, sw: 4, sx: 4, sy: 5 }) +
      '<circle cx="0" cy="' + (-h - 8) + '" r="10" fill="#C9B26A" stroke="' + INK + '" stroke-width="3"/>' +
      '<path id="' + id + '-co" d="M 6 ' + (-h + 6) + ' L 6 ' + (-h + 96) + ' Z" fill="#3F6A70" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/></g>';
  }
  /* d của lá cờ theo độ căng k (0 rủ … 1 căng ngang) và pha p (gợn) */
  function coD(h, k, p) {
    var L = 60 + 160 * k, top = -h + 6, bot = -h + 96, pts = [], n = 8;
    for (var i = 0; i <= n; i++) { var u = i / n, x = 6 + L * u, sag = (1 - k) * 70 * u * u, wv = Math.sin(p + u * 5.5) * (6 + 14 * k) * u; pts.push([x, top + sag + wv]); }
    var dd = "M 6 " + top;
    pts.forEach(function (q) { dd += " L " + f1(q[0]) + " " + f1(q[1]); });
    for (var j = n; j >= 0; j--) { var u2 = j / n, x2 = 6 + L * u2 * (0.96 + 0.04 * k), sag2 = (1 - k) * 80 * u2 * u2, wv2 = Math.sin(p + 0.6 + u2 * 5.5) * (6 + 14 * k) * u2; dd += " L " + f1(x2) + " " + f1(bot - (bot - top) * 0.15 * u2 * k + sag2 + wv2); }
    return dd + " Z";
  }
  /* giá móc áo trên tường. Gốc: giữa thanh. n móc, khoảng 120 */
  function giaMoc(id, n) {
    var w = n * 120, s = '<g id="' + id + '">' + D.paper(D.rRect(-w / 2 - 20, -20, w + 40, 40, 1.5, 771), "#8A6440", { stroke: true, sw: 4 });
    for (var i = 0; i < n; i++) { var x = -w / 2 + 60 + i * 120; s += D.line("M " + x + " 0 L " + x + " 40 C " + x + " 60 " + (x + 26) + " 60 " + (x + 26) + " 40", 7, "#3A3A36"); }
    return s + "</g>";
  }
  /* áo mưa treo (đồ rời). Gốc: móc trên cổ áo. o.nho: cỡ nhỏ */
  function aoTreo(id, o) {
    o = o || {}; var k = o.k || (o.nho ? 0.72 : 1);
    var s = '<g id="' + id + '"><g transform="scale(' + k + ')">';
    s += D.paper("M -20 0 C -70 10 -96 40 -100 90 L -120 230 L -76 236 L -66 140 L -70 300 L 70 300 L 66 140 L 76 236 L 120 230 L 100 90 C 96 40 70 10 20 0 Z", o.mau || RAIN, { stroke: true, sw: 5, half: 0.14 });
    s += D.paper("M -42 6 C -40 -40 40 -40 42 6 C 20 20 -20 20 -42 6 Z", o.mau || RAIN, { stroke: true, sw: 4, shadow: false });
    s += D.line("M 0 20 L 0 296", 3, RAIN_D) + '<circle cx="12" cy="90" r="6" fill="' + RAIN_D + '"/><circle cx="12" cy="160" r="6" fill="' + RAIN_D + '"/>';
    s += '<path d="M -60 300 C -64 312 -56 320 -60 330 C -64 320 -68 312 -60 300 Z M 40 300 C 36 314 46 322 40 332 C 34 322 32 314 40 300 Z" fill="#9FD3E3" stroke="' + INK + '" stroke-width="2"/>';
    return s + "</g></g>";
  }
  function vung(id, w) {
    return '<g id="' + id + '"><path d="' + D.rEll(0, 0, w / 2, w / 9, 3, 781) + '" fill="#8FC3D3" stroke="' + INK + '" stroke-width="3" opacity="0.85"/>' +
      '<path d="' + D.rEll(-w * 0.1, -w * 0.02, w * 0.22, w * 0.035, 1, 782) + '" fill="#ffffff" opacity="0.5"/></g>';
  }
  function giot(id, r) { r = r || 12; return '<g id="' + id + '"><path d="M 0 ' + (-r * 1.8) + ' C ' + (r * 0.6) + ' ' + (-r * 0.6) + ' ' + r + ' 0 0 ' + r + ' C ' + (-r) + ' 0 ' + (-r * 0.6) + ' ' + (-r * 0.6) + ' 0 ' + (-r * 1.8) + ' Z" fill="#9FD3E3" stroke="' + INK + '" stroke-width="3"/></g>'; }
  /* sổ mở to có chữ ghi được. Gốc: giữa gáy dưới. Trả chuỗi; dòng chữ dùng viet() */
  function so(w, h, seed) { return D.notebookOpen(w, h, seed || 791); }
  /* chữ hiện dần như đang viết (che bằng clip rect co giãn). Trả svg; đặt khoá ở canh.js qua vietKey */
  function viet(id, x, y, chu, co, o) {
    o = o || {};
    var w = chu.length * co * 0.68 + 24, a = o.anchor || "start", x0 = a === "middle" ? x - w / 2 : x - 6;
    return '<clipPath id="' + id + '-cp"><rect id="' + id + '-rv" x="' + f1(x0) + '" y="' + f1(y - co * 1.1) + '" width="' + f1(w) + '" height="' + f1(co * 1.5) + '"/></clipPath>' +
      '<g id="' + id + '" clip-path="url(#' + id + '-cp)">' + D.txt(x, y, chu, co, { w: o.w || 700, anchor: a, fill: o.fill || "#2B3A44" }) + "</g>";
  }
  function vietKey(api, id, x0, t, dur) {
    api.origin("#" + id + "-rv", x0 + " 0");
    api.key("#" + id + "-rv", "scaleX", 0, 0.001, "step"); api.key("#" + id + "-rv", "scaleX", t, 0.001, "none"); api.key("#" + id + "-rv", "scaleX", t + dur, 1, "none");
  }
  /* nét gạch ngang tự vẽ: path id (stroke-dasharray đầy đủ), khoá bằng scaleX quanh đầu trái */
  function gach(id, x0, y, w) {
    return '<g id="' + id + '">' + D.line("M " + x0 + " " + y + " C " + (x0 + w * 0.3) + " " + (y - 6) + " " + (x0 + w * 0.7) + " " + (y + 6) + " " + (x0 + w) + " " + (y - 2), 7, "#C9463A") + "</g>";
  }
  /* cổng hầm bê tông một làn khoét vào vách núi. Gốc: giữa chân cổng (mặt đường). o.mua: "he" | "dem"
     id-l0..2 bóng đèn (đỏ, vàng, xanh) + id-g0..2 quầng; id-chan thanh chắn (gốc trụ, xoay); id-hoa bông hoa trên thanh chắn; id-lich chỗ dán tờ lịch */
  function congHam(id, o) {
    o = o || {};
    var dem = o.mua === "dem", s = '<g id="' + id + '">';
    var vach = dem ? "#4B5A5C" : "#7F9479", vach2 = dem ? "#3A4748" : "#677A62";
    s += D.paper("M -900 0 L -860 -520 L -620 -760 L -380 -700 L -120 -900 L 160 -820 L 420 -940 L 700 -720 L 900 -560 L 940 0 Z", vach, { half: 0.14, sx: 10, sy: 8 });
    var r = D.rng(811);
    for (var i = 0; i < 9; i++) { var x = -820 + i * 190 + r() * 60, y = -620 + r() * 300; s += D.line("M " + f1(x) + " " + f1(y) + " L " + f1(x + 40 + r() * 60) + " " + f1(y + 80 + r() * 90), 4, vach2, ' opacity="0.7"'); }
    if (!dem) { s += D.paper("M -900 -420 C -760 -480 -640 -470 -560 -520 C -520 -440 -700 -380 -900 -360 Z", "#6E9A68", { shadow: false }) + D.paper("M 520 -700 C 640 -720 760 -640 900 -600 L 900 -520 C 760 -560 640 -610 520 -640 Z", "#6E9A68", { shadow: false }); }
    s += D.paper("M -230 0 L -230 -330 L 230 -330 L 230 0 Z", dem ? "#8E8B83" : BETONG, { stroke: true, sw: 5, half: 0.12 });
    s += D.paper("M -250 -330 L 250 -330 L 250 -380 L -250 -380 Z", dem ? "#9A978E" : "#C9C6BC", { stroke: true, sw: 5, shadow: false });
    s += '<path d="M -160 0 L -160 -230 C -160 -280 -120 -300 0 -300 C 120 -300 160 -280 160 -230 L 160 0 Z" fill="url(#whHam)" stroke="' + INK + '" stroke-width="5"/>';
    s += '<path d="M -26 0 L -10 -230 M 26 0 L 10 -230" stroke="#6F7577" stroke-width="5" opacity="0.8"/>';
    s += '<g transform="translate(0,-355)"><circle r="22" fill="#F6EEDC" stroke="' + INK + '" stroke-width="4"/>' + D.line("M 0 0 L 0 -14 M 0 0 L 10 4", 3.5) + "</g>";
    s += '<g id="' + id + '-lich"></g>';
    /* đèn tín hiệu 3 bóng trên cột, bên phải cổng */
    s += '<g transform="translate(300,0)">' + D.paper(D.rRect(-8, -420, 16, 420, 1, 812), "#4A4F50", { stroke: true, sw: 3, shadow: false }) +
      D.paper(D.rRect(-40, -560, 80, 210, 2, 813), "#2B3033", { stroke: true, sw: 4 });
    ["#E85D45", "#E8C04A", "#5BC57A"].forEach(function (c, k) {
      var cy = -525 + k * 68, g = ["whDo", "whSang", "whXanh"][k];
      s += '<circle cx="0" cy="' + cy + '" r="24" fill="#3B4245" stroke="' + INK + '" stroke-width="3"/>';
      s += '<g id="' + id + '-g' + k + '"><circle cx="0" cy="' + cy + '" r="70" fill="url(#' + g + ')"/></g>';
      s += '<circle id="' + id + '-l' + k + '" cx="0" cy="' + cy + '" r="24" fill="' + c + '" stroke="' + INK + '" stroke-width="3"/>';
    });
    s += "</g>";
    /* thanh chắn: trụ bên trái, cần đỏ trắng vươn qua làn */
    s += '<g transform="translate(-300,-120)">' + D.paper(D.rRect(-26, 0, 52, 120, 1.2, 814), "#D8D4CA", { stroke: true, sw: 4 }) +
      '<g id="' + id + '-chan"><rect x="0" y="-12" width="560" height="24" rx="10" fill="#F4EFE6" stroke="' + INK + '" stroke-width="4"/>';
    for (var k2 = 0; k2 < 7; k2++) s += '<rect x="' + (14 + k2 * 80) + '" y="-12" width="40" height="24" fill="#D9543C"/>';
    s += '<rect x="0" y="-12" width="560" height="24" rx="10" fill="none" stroke="' + INK + '" stroke-width="4"/>';
    s += '<g id="' + id + '-hoa" transform="translate(300,-12)">' + D.line("M 0 0 L 0 -40", 4, "#4E8A4A") +
      [0, 72, 144, 216, 288].map(function (a) { var rad = a * Math.PI / 180; return '<circle cx="' + f1(Math.cos(rad) * 12) + '" cy="' + f1(-46 + Math.sin(rad) * 12) + '" r="9" fill="#F3B5C8" stroke="' + INK + '" stroke-width="2"/>'; }).join("") +
      '<circle cx="0" cy="-46" r="7" fill="#F2C94C" stroke="' + INK + '" stroke-width="2"/></g>';
    s += "</g>" + '<circle r="16" fill="#3A3A36"/></g>';
    return s + "</g>";
  }
  /* đường một làn có ray chìm giữa làn, phối cảnh về cổng. y0 mặt đường gần, y1 chân cổng */
  function duongRay(cx, y1, y0, wGan, wXa, mau) {
    var s = D.paper("M " + (cx - wXa / 2) + " " + y1 + " L " + (cx + wXa / 2) + " " + y1 + " L " + (cx + wGan / 2) + " " + y0 + " L " + (cx - wGan / 2) + " " + y0 + " Z", mau || "#6E7270", { shadow: false, half: 0.1 });
    s += D.line("M " + (cx - 30) + " " + y1 + " L " + (cx - wGan * 0.14) + " " + y0 + " M " + (cx + 30) + " " + y1 + " L " + (cx + wGan * 0.14) + " " + y0, 6, "#B5B9B8");
    s += D.line("M " + (cx - wXa / 2 + 10) + " " + y1 + " L " + (cx - wGan / 2 + 30) + " " + y0 + " M " + (cx + wXa / 2 - 10) + " " + y1 + " L " + (cx + wGan / 2 - 30) + " " + y0, 5, "#F2E6B8", ' stroke-dasharray="30 26"');
    return s;
  }
  /* tờ lịch (mặt trước hoặc mặt sau). Gốc: góc trên trái. o: w, h, chu [[chu, x, y, co]] */
  function toLich(id, o) {
    o = o || {}; var w = o.w || 300, h = o.h || 380, s = '<g id="' + id + '">';
    s += D.paper(D.rRect(0, 0, w, h, 2, o.seed || 821), "#FBF6E8", { stroke: true, sw: 4, half: 0.06, sx: 5, sy: 7 });
    if (o.ke !== false) for (var y = 60; y < h - 20; y += 44) s += D.line("M 24 " + y + " L " + (w - 24) + " " + y, 2, "#9DB7C2", ' opacity="0.4"');
    (o.chu || []).forEach(function (c) { s += D.txt(c[1], c[2], c[0], c[3], { w: 850, fill: c[4] || INK }); });
    return s + "</g>";
  }
  /* con dấu tay cầm. Gốc: mặt dấu (đáy). */
  function conDau(id) {
    return '<g id="' + id + '">' + D.paper(D.rRect(-70, -40, 140, 40, 1.5, 831), "#5A3A25", { stroke: true, sw: 4 }) +
      D.paper(D.rRect(-20, -120, 40, 82, 1.2, 832), "#A06D45", { stroke: true, sw: 4 }) + D.paper(D.rEll(0, -132, 40, 22, 1, 833), "#C9463A", { stroke: true, sw: 4 }) + "</g>";
  }
  /* dấu đóng: khung đỏ nghiêng + chữ. Gốc: tâm */
  function dauDo(id, chu, co) {
    if (D.verdictStamp) return D.verdictStamp(id, chu, co);   // lib chung (24/11): chữ ép gọn trong khung
    var w = chu.length * co * 0.62 + 50, h = co * 1.6;
    return '<g id="' + id + '"><g transform="rotate(-8)">' +
      '<rect x="' + f1(-w / 2) + '" y="' + f1(-h / 2) + '" width="' + f1(w) + '" height="' + f1(h) + '" rx="10" fill="none" stroke="#C9463A" stroke-width="8"/>' +
      '<rect x="' + f1(-w / 2 + 10) + '" y="' + f1(-h / 2 + 10) + '" width="' + f1(w - 20) + '" height="' + f1(h - 20) + '" rx="6" fill="none" stroke="#C9463A" stroke-width="3"/>' +
      D.txt(0, co * 0.36, chu, co, { w: 900, fill: "#C9463A" }) + "</g></g>";
  }
  function bangDinh(id, xoay) {
    return '<g id="' + id + '" transform="rotate(' + (xoay || 0) + ')"><rect x="-46" y="-14" width="92" height="28" fill="#F3E7B8" opacity="0.9" stroke="#B9A66E" stroke-width="2"/></g>';
  }
  /* đôi ủng đứng có mắt lo lắng (đồ rời). Gốc: giữa đế. id-mat */
  function ungRoi(id, sc) {
    var s = '<g id="' + id + '"><g transform="scale(' + (sc || 1) + ')">';
    [-34, 34].forEach(function (dx, i) {
      s += '<g transform="translate(' + dx + ',0)">' + D.paper("M -24 -120 L 20 -120 L 18 -20 C 34 -18 44 -8 40 0 L -26 0 Z", BOOT, { stroke: true, sw: 4, half: 0.1, sx: 3, sy: 4 }) +
        D.line("M -24 -108 L 20 -108", 4, BOOT_D) + "</g>";
    });
    s += '<g id="' + id + '-mat">';
    [-34, 34].forEach(function (dx) {
      s += '<ellipse cx="' + (dx - 7) + '" cy="-70" rx="7" ry="9" fill="#FFFDF6" stroke="' + INK + '" stroke-width="2.5"/><ellipse cx="' + (dx + 7) + '" cy="-70" rx="7" ry="9" fill="#FFFDF6" stroke="' + INK + '" stroke-width="2.5"/>' +
        '<circle cx="' + (dx - 6) + '" cy="-67" r="3" fill="' + INK + '"/><circle cx="' + (dx + 8) + '" cy="-67" r="3" fill="' + INK + '"/>' +
        D.line("M " + (dx - 14) + " -84 L " + (dx - 2) + " -80 M " + (dx + 14) + " -84 L " + (dx + 2) + " -80", 2.5) + D.line("M " + (dx - 7) + " -50 C " + (dx - 3) + " -54 " + (dx + 3) + " -46 " + (dx + 7) + " -50", 2.5);
    });
    return s + "</g></g></g>";
  }
  function depLe(id, sc) {
    var s = '<g id="' + id + '"><g transform="scale(' + (sc || 1) + ')">';
    [-30, 30].forEach(function (dx) { s += '<g transform="translate(' + dx + ',0)">' + D.paper(D.rEll(0, 0, 22, 50, 1.2, 841 + dx), "#8FB7C9", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + D.line("M -18 -20 C -8 -32 8 -32 18 -20", 9, "#E9806E") + "</g>"; });
    return s + "</g></g>";
  }
  function giayDoRoi(id) {
    return '<g id="' + id + '"><ellipse cx="-24" cy="0" rx="22" ry="10" fill="#d9543c" stroke="' + INK + '" stroke-width="4"/><ellipse cx="24" cy="0" rx="22" ry="10" fill="#d9543c" stroke="' + INK + '" stroke-width="4"/></g>';
  }
  /* người que dạng chung, không mặt (áo phông). Gốc: giữa chân. id-cL, id-cR chân (gốc hông) */
  function nguoi(id, o) {
    o = o || {}; var m = o.mau || "#D9776A", da = o.da || "#6B5446", s = '<g id="' + id + '">';
    s += '<g transform="translate(-8,-70)"><g id="' + id + '-cL">' + D.line("M 0 0 L -4 70", 10, "#3F4A52") + "</g></g>";
    s += '<g transform="translate(8,-70)"><g id="' + id + '-cR">' + D.line("M 0 0 L 4 70", 10, "#3F4A52") + "</g></g>";
    s += D.paper("M -26 -72 L -22 -140 C -16 -150 16 -150 22 -140 L 26 -72 Z", m, { stroke: true, sw: 3.5, sx: 3, sy: 4 });
    s += D.line("M -22 -136 L -36 -96 M 22 -136 L 36 -96", 9, da);
    s += '<circle cx="0" cy="-166" r="18" fill="' + da + '" stroke="' + INK + '" stroke-width="3.5"/>';
    return s + "</g>";
  }
  /* bến gỗ: sàn ván nhìn ngang. Gốc: mép trái mặt sàn */
  function ben(w, mau) {
    var s = "<g>" + D.paper(D.rRect(0, 0, w, 34, 1.5, 851), mau || "#7A6450", { stroke: true, sw: 4, half: 0.1 });
    for (var x = 30; x < w; x += 120) s += D.paper(D.rRect(x, 30, 22, 190, 1, 852 + x), "#5A4A3C", { stroke: true, sw: 3, shadow: false });
    for (var x2 = 0; x2 < w; x2 += 60) s += D.line("M " + x2 + " 4 L " + x2 + " 30", 2, INK, ' opacity="0.35"');
    return s + "</g>";
  }
  /* tàu nhỏ có cabin và đèn. Gốc: giữa đường nước. id-den quầng đèn, id-ct cửa sổ cabin */
  function tauNho(id, sc, mau) {
    var s = '<g id="' + id + '"><g transform="scale(' + (sc || 1) + ')">';
    s += D.paper("M -150 -40 L 160 -40 L 120 10 L -120 10 Z", mau || "#E6E1D6", { stroke: true, sw: 4, half: 0.1 });
    s += D.paper(D.rRect(-70, -110, 110, 72, 1.2, 861), "#CFC8B8", { stroke: true, sw: 4, shadow: false });
    s += '<rect id="' + id + '-ct" x="-56" y="-96" width="80" height="34" fill="#55666B" stroke="' + INK + '" stroke-width="3"/>';
    s += D.line("M 60 -40 L 60 -170", 5, "#5A4A3C");
    s += '<g id="' + id + '-den"><circle cx="60" cy="-176" r="70" fill="url(#whSang)"/><circle cx="-16" cy="-80" r="90" fill="url(#whSang)" opacity="0.7"/></g>';
    s += '<circle cx="60" cy="-176" r="9" fill="#FFE9B0" stroke="' + INK + '" stroke-width="3"/>';
    return s + "</g></g>";
  }
  function tangDa(w, h, seed, mau) { return D.paper("M " + (-w / 2) + " 0 C " + (-w / 2) + " " + (-h * 0.8) + " " + (-w * 0.2) + " " + (-h) + " " + (w * 0.05) + " " + (-h) + " C " + (w * 0.35) + " " + (-h) + " " + (w / 2) + " " + (-h * 0.6) + " " + (w / 2) + " 0 Z", mau || "#9AA09A", { stroke: true, sw: 4, half: 0.14 }); }
  function gay(len) { return D.line("M 0 0 L 0 " + len, 9, "#8A6440") + D.line("M 0 0 L 0 " + len, 2, INK, ' opacity="0.5"'); }
  function bongTuyet(id, r) { return '<g id="' + id + '">' + D.flake(r || 14, 871) + "</g>"; }
  /* ô vẽ nhỏ: sông băng, cá, lối mòn (cho tờ lịch d29). Gốc: tâm */
  function hinhSongBang() { return D.paper("M -50 30 L -20 -30 L 0 -10 L 20 -40 L 50 30 Z", "#DCEFF6", { stroke: true, sw: 3, shadow: false }) + D.paper("M -50 30 L 50 30 L 50 40 L -50 40 Z", "#6FA9BE", { shadow: false }); }
  function hinhCa() { return D.paper("M -44 0 C -20 -26 24 -24 34 0 C 24 24 -20 26 -44 0 Z M 34 0 L 54 -18 L 54 18 Z", "#E9906E", { stroke: true, sw: 3, shadow: false }) + '<circle cx="-24" cy="-4" r="4" fill="' + INK + '"/>'; }
  function hinhLoiMon() { return D.paper("M -50 34 L -14 -30 L 10 6 L 26 -16 L 54 34 Z", "#8DB38A", { stroke: true, sw: 3, shadow: false }) + D.line("M -40 34 C -20 20 0 24 10 6 C 18 -6 24 -10 26 -16", 4, "#C9A46A", ' stroke-dasharray="8 7"'); }

  /* ---------- hiệu ứng mỗi khung (chỉ chạm DOM khi có document) ---------- */
  function domEl(id) { return (typeof document !== "undefined") ? document.getElementById(id) : null; }
  /* mưa/tuyết ướt bay ngang: n vệt trong khung màn hình. o: toc (px/s), nghieng (độ), mau, dai, day, mat(t) → mật độ 0..1, seed */
  function gioTuyet(api, id, n, o) {
    o = o || {}; var r = D.rng(o.seed || 901), ps = [], s = '<g id="' + id + '">';
    for (var i = 0; i < n; i++) {
      var p = { x: r() * 2200, y: r() * 1080, v: 0.7 + r() * 0.6, l: (o.dai || 46) * (0.6 + r() * 0.8) };
      ps.push(p);
      s += '<g id="' + id + i + '"><path d="M 0 0 L ' + f1(p.l) + ' 0" stroke="' + (o.mau || "#F4FAFB") + '" stroke-width="' + (o.day || 5) + '" stroke-linecap="round" opacity="0.85"/></g>';
    }
    var toc = o.toc || 900, ng = o.nghieng || 12;
    api.moiKhung(function (t) {
      var k = o.mat ? o.mat(t) : 1;
      for (var i = 0; i < n; i++) {
        var e = domEl(id + i); if (!e) return;
        var p = ps[i], x = ((p.x + toc * p.v * t) % 2300) - 200, y = (p.y + toc * p.v * t * Math.tan(ng * Math.PI / 180)) % 1120 - 20;
        e.setAttribute("transform", "translate(" + f1(x) + "," + f1(y) + ") rotate(" + ng + ")");
        e.setAttribute("opacity", i / n < k ? "1" : "0");
      }
    });
    return s + "</g>";
  }
  /* nhấp nhô lặp (tất định): khoá y (và scale) quanh giá trị gốc */
  function nhapNho(api, sel, t0, t1, amp, chuKy, pha) {
    var t = t0 + (pha || 0) % chuKy, up = true;
    api.key(sel, "y", 0, 0, "step");
    while (t < t1) { api.key(sel, "y", t, up ? -amp : amp * 0.4, "sine.inOut"); up = !up; t += chuKy / 2; }
  }
  function coBay(api, id, h, kFn, toc) {
    api.moiKhung(function (t) { var e = domEl(id); if (e) e.setAttribute("d", coD(h, kFn(t), t * (toc || 9))); }, { twos: true });
  }
  return { gioTuyet: gioTuyet, nhapNho: nhapNho, coBay: coBay, domEl: domEl, D: D, INK: INK, RAIN: RAIN, CAP: CAP, KEM: KEM, OLIVE: OLIVE, f1: f1, defs: defs, wob: wob, nui: nui, nuoc: nuoc, dat: dat,
    begich: begich, tuongCua: tuongCua, the: the, nhietKe: nhietKe, cotCo: cotCo, coD: coD, giaMoc: giaMoc, aoTreo: aoTreo, vung: vung, giot: giot,
    so: so, viet: viet, vietKey: vietKey, gach: gach, congHam: congHam, duongRay: duongRay, toLich: toLich, conDau: conDau, dauDo: dauDo,
    bangDinh: bangDinh, ungRoi: ungRoi, depLe: depLe, giayDoRoi: giayDoRoi, nguoi: nguoi, ben: ben, tauNho: tauNho, tangDa: tangDa, gay: gay,
    bongTuyet: bongTuyet, hinhSongBang: hinhSongBang, hinhCa: hinhCa, hinhLoiMon: hinhLoiMon };
})();
/* Đoạn d23 · cắt giấy · ĐOẠN NGHIÊM (động đất 1964): bến cảng lúc chạng vạng, nước lặng, tông xám xanh.
   Không gag, không sfx, không rung, không vẽ sóng thần, không vẽ người, không đổ nát. Vào "giay", ra "giay".
   Trang phục: một áo mưa vàng mặc lại (lấy từ móc), mũ trùm HẠ xuống; ba lô ô liu có cuộn thảm đỏ, giày đỏ. Wob đứng xa, im lặng.
   Chữ: March 27, 1964 · 13 lives lost · ~70 trên trang sổ. Mặt Wob trầm (miệng thang/buon, mí cụp) suốt đoạn (mỗi số hiện riêng ≥ 2 s). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var C = data.chu_tren_do_vat;
  var GROUND = 830, SZ = 0.5;
  var W = WH.wob(api, "W", { ao: "ha" });

  var xa = WH.nui(-700, 3000, 640, 2301, { mau: "#5E6E7C", tuyet: "#C9D2D8", cao: [260, 420] });
  xa += WH.nui(-500, 3000, 660, 2302, { mau: "#4A5866", tuyet: false, cao: [120, 220], rong: [380, 620] });
  var mid = WH.nuoc("vinh", -900, 3000, 650, 500, { grad: "whNuocTram", seed: 2303, vet: 26 });
  // phản chiếu núi mờ trong nước lặng
  mid += '<g opacity="0.18" transform="translate(0,1300) scale(1,-1)">' + WH.nui(-700, 3000, 650, 2302, { mau: "#2E3A44", tuyet: false, cao: [120, 220], rong: [380, 620] }) + "</g>";
  mid += at(1850, 700, WH.tauNho("tau", 0.8));
  mid += at(-900, GROUND, WH.ben(2700, "#6B5E52"));
  for (var c = 0; c < 4; c++) mid += at(300 + c * 520, GROUND, D.paper(D.rRect(-14, -70, 28, 74, 1, 2304 + c), "#4E443B", { stroke: true, sw: 3 }));
  mid += W.svg;
  var gan = at(-200, 1120, D.paper(D.rRect(-40, -380, 80, 420, 1.4, 2310), "#3E3731", { stroke: true, sw: 4 })) +
    at(-200, 760, D.line("M 0 0 C 300 60 600 80 900 70", 6, "#5A5048"));

  // trang sổ (lớp phủ tĩnh, không theo camera)
  var trang = g("trang", at(150, 150, WH.toLich("tr", { w: 700, h: 760, seed: 2311 }) +
    g("c0", D.txt(350, 190, C[0], 68, { fill: "#2B3A44" })) +
    D.line("M 120 250 L 580 250", 3, "#2B3A44", ' opacity="0.35"') +
    g("c1", D.txt(350, 640, C[1], 130, { fill: "#2B3A44" })) +
    g("c2", D.txt(350, 430, C[2], 76, { fill: "#2B3A44" }))));

  api.dat('<rect width="1920" height="1080" fill="url(#whChang)"/>' + WH.defs() +
    api.lop("xa", xa, 0.35, { mat: 650 }) + api.lop("giua", mid, 1, { mat: GROUND }) + api.lop("gan", gan, 1.4, { mat: 1120 }) + trang);
  api.noi({ vaoDai: 0.6, raDai: 0.55 });

  var tMarch = T("march", 0, 1.91), tThir = T("thirteen", 0, 10.35), tSev = T("seventy", 0, 13.05), tWater = T("waterfront", 0, 14.85);
  var tToday = T("today", 0, 16.93), tPort = T("port", 0, 17.3), tStayed = T("stayed", 0, 20.95), tClever = T("clever.", 0, 23.35);

  // camera lùi rất chậm, không giật
  api.camera([[0, 1300, 600, 1.22], [tToday, 1250, 600, 1.1, "sine.inOut"], [DUR, 1200, 590, 1.0, "sine.inOut"]]);

  // trang sổ: trượt lên êm, chữ hiện nhẹ, rời đi trước "Today"
  api.key("#trang", "y", 0, 1100, "step"); api.key("#trang", "y", tMarch - 0.9, 1100, "none"); api.key("#trang", "y", tMarch - 0.1, 0, "power2.out");
  api.key("#trang", "opacity", 0, 1, "step"); api.key("#trang", "opacity", tToday - 0.8, 1, "none"); api.key("#trang", "opacity", tToday - 0.1, 0, "power1.inOut");
  api.show("#c0", 0, 0); api.fade("#c0", tMarch - 0.05, 0.4, 1);
  api.show("#c2", 0, 0); api.fade("#c2", tThir - 0.1, 0.4, 1);     // "13 lives lost"
  api.show("#c1", 0, 0); api.fade("#c1", tSev - 0.1, 0.4, 1);      // "~70"
  // đèn tàu sáng lên: cảng vẫn chạy
  api.show("#tau-den", 0, 0); api.fade("#tau-den", tPort - 0.2, 1.2, 1);
  api.key("#tau-ct", "fill", 0, "#55666B", "step"); api.key("#tau-ct", "fill", tPort - 0.2, "#55666B", "none"); api.key("#tau-ct", "fill", tPort + 0.8, "#FFD68A", "power1.inOut");
  WH.nhapNho(api, "#tau", 0, DUR, 3, 3.2, 0.4);

  // Wob nhỏ ở mép bến, nhìn ra nước, đứng yên (chỉ thở, chớp mắt chậm, liếc rất ít)
  // mặt trầm suốt đoạn: miệng thẳng, mí cụp nửa, mắt nhìn xuống (không nụ cười mặc định)
  W.set(0, { x: 1420, y: GROUND, size: SZ, lashes: 1, ice: 0, aLu: 14, aLf: -6, aRu: -14, aRf: 6, pupX: 12, pupY: 8, lean: 2, lid: 20 });
  W.mouth(0, "thang");
  W.breathe(0, DUR, 3.4);
  W.pose(tMarch + 0.6, 1.2, { pupX: -10, pupY: 6 }, "sine.inOut");      // nhìn về trang sổ
  W.pose(tThir + 1.2, 1.4, { lid: 30, pupY: 10, upY: 3 }, "sine.inOut");  // cúi mắt, thân trĩu xuống
  W.mouth(tThir + 1.2, "buon");
  W.pose(tWater, 1.4, { lid: 22, pupX: 12, pupY: 8, upY: 0 }, "sine.inOut"); // lại nhìn ra nước, vẫn trầm
  W.mouth(tWater + 0.6, "thang");
  W.pose(tPort, 1.0, { pupX: 14, pupY: 5, lid: 18 }, "sine.inOut");       // nhìn đèn tàu
  W.pose(tStayed, 1.6, { lean: 0, upY: 4, lid: 26, pupY: 9 }, "sine.inOut");
  W.pose(tClever + 0.8, 1.6, { upY: 2, lid: 22 }, "sine.inOut");
  W.blinkAt(4.5); W.blinkAt(8.6); W.blinkAt(15.6); W.blinkAt(19.2); W.blinkAt(22.4); W.blinkAt(25.3);
};
