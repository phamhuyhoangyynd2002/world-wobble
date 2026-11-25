/* canh.js sinh bởi ghep-canh-wh-a.sh: prelude cat-giay-wh-a.js + doan-d24/canh-rieng.js. Sửa ở hai file nguồn. */
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
    pk += '<g id="' + id + '-aoT">' + aoTrum() + "</g>";
    pk += '<g id="' + id + '-aoH">' + aoHa() + "</g>";
    pk += '<g id="' + id + '-tham">' + cuonTham() + "</g>";
    pk += '<g id="' + id + '-ao2"><g transform="translate(6,70) scale(0.82)">' + ao2() + "</g></g>";
    pk += '<g id="' + id + '-cap">' + muLuoi() + "</g>";
    var oo = {}; Object.keys(o).forEach(function (k) { if (["ao", "ao2", "mu", "ung", "ungHien"].indexOf(k) < 0) oo[k] = o[k]; });
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
/* Đoạn d24 · cắt giấy · hồi ức tháng Bảy: CÙNG CỔNG HẦM, CÙNG BỐ CỤC với d01 (vòm trong vách đá xám, đèn tín hiệu bên trái x 600,
   thanh chắn trục 760, cổng x 1000; dùng WT.tunnelPortal/signal3/barrier/convertible của cat-giay-wt-prelude.js), chỉ đổi mùa:
   tuyết thành cỏ xanh, trời xanh, bông hoa trên thanh chắn. Xe thuê mui trần đỏ gạch như d01–d04, mở mui.
   Vào "giay", ra "giay". Trang phục: mũ lưỡi trai xanh băng, không áo mưa, ba lô ô liu có cuộn thảm đỏ, giày đỏ.
   Chữ: 5:30, 23:15 trên tờ lịch mùa hè dán bảng cạnh cổng, hiện đúng "five thirty" / "eleven fifteen". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var C = data.chu_tren_do_vat;
  var MAT = 900, CO = "#7FAE6E";
  function heHoa(svg) { return svg.split(D.C.snow).join(CO); }      // tuyết trên vách/cổng → mảng cỏ mùa hè
  var W = WH.wob(api, "W", { mu: "luoi" });
  var xe = WT.convertible("xe", { tuyet: 0 });

  var xa = heHoa(WT.nuiXa(-900, 3400, 760, 3, "#6E9A70", 420));
  var mid = "";
  mid += at(1000, MAT, heHoa(WT.tunnelPortal("ham", { seed: 801 })));
  mid += D.paper(D.rough([[-800, MAT - 4], [3400, MAT - 6], [3400, 1700], [-800, 1700]], 3, 811, 30), "#8DBB7C", { shadow: false });
  mid += '<path d="M 770 ' + MAT + ' L 1230 ' + MAT + ' L 1500 1300 L 500 1300 Z" fill="#5E6668" opacity="0.9"/>';
  mid += D.line("M 940 " + MAT + " L 860 1300 M 1060 " + MAT + " L 1140 1300", 7, "#C9CCC8");
  mid += at(600, MAT + 4, WT.signal3("den", { mau: "#5BC57A" }));
  // bảng dán tờ lịch mùa hè, bên phải cổng
  mid += at(1420, MAT, D.paper(D.rRect(-10, -470, 20, 470, 1.2, 2403), "#6B4E33", { stroke: true, sw: 4 }) +
    at(-150, -480, D.paper(D.rRect(0, 0, 300, 290, 1.6, 2404), "#8A6440", { stroke: true, sw: 4 }) +
      at(20, 18, WH.toLich("lich", { w: 260, h: 254, seed: 2405 }) +
        g("c0", D.txt(130, 108, C[0], 72, { fill: "#2B3A44" })) + g("c1", D.txt(130, 210, C[1], 72, { fill: "#2B3A44" })))));
  // xe đỏ (đầu bên trái) + Wob ghế lái
  mid += '<g id="XE">' + at(0, 924, xe.back) + W.svg + at(0, 924, xe.front) + "</g>";
  var vun = "";
  for (var v = 0; v < 6; v++) vun += '<rect id="vu' + v + '" x="-6" y="-4" width="14" height="8" rx="2" fill="#d9543c" stroke="' + D.INK + '" stroke-width="1.5"/>';
  mid += g("VUN", vun);
  // thanh chắn (trước cổng) + bông hoa
  mid += at(760, 818, WT.barrier("chan", 395));
  mid += g("HOA", at(0, 0, D.line("M 0 0 L 0 -40", 4, "#4E8A4A") +
    [0, 72, 144, 216, 288].map(function (a) { var r = a * Math.PI / 180; return '<circle cx="' + (Math.cos(r) * 12).toFixed(1) + '" cy="' + (-46 + Math.sin(r) * 12).toFixed(1) + '" r="9" fill="#F3B5C8" stroke="' + D.INK + '" stroke-width="2"/>'; }).join("") +
    '<circle cx="0" cy="-46" r="7" fill="#F2C94C" stroke="' + D.INK + '" stroke-width="2"/>'));
  var gan = D.paper(D.rough([[-400, 1080], [-200, 1010], [200, 990], [520, 1030], [700, 1090], [700, 1300], [-400, 1300]], 4, 813, 26), "#6E9E62", { stroke: true, sw: 4 }) +
    D.paper(D.rough([[1900, 1100], [2100, 1000], [2400, 980], [2700, 1040], [2800, 1300], [1900, 1300]], 4, 814, 26), "#6E9E62", { stroke: true, sw: 4 });

  api.dat(WT.defs() + WH.defs() + '<rect width="1920" height="1080" fill="url(#whHe)"/>' +
    api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1060 }));
  api.noi({});

  var tJuly = T("july.", 0, 0.72), tSame = T("same", 0, 1.55), tDiff = T("different", 0, 2.55), tSummer = T("summer", 0, 4.03), tFive = T("five", 0, 5.11);
  var tEleven = T("eleven", 0, 7.94), tArr = T("arrived", 0, 9.79), tClos = T("closing,", 0, 10.97), tPurp = T("purpose,", 0, 11.85), tDrove = T("drove", 0, 12.75);
  var tGo = tPurp - 0.1, tIn = tGo + 1.0;

  api.camera([
    [0, 1100, 560, 0.9], [tSame + 0.6, 1150, 580, 0.94, "sine.inOut"],
    [tFive - 0.6, 1420, 520, 1.28, "power3.inOut"], [tEleven + 1.0, 1420, 520, 1.32, "sine.inOut"],
    [tArr - 0.1, 1350, 620, 1.0, "power2.inOut"], [tGo, 1300, 640, 1.04, "sine.inOut"],
    [tIn - 0.2, 1000, 760, 1.6, "power2.inOut"], [DUR, 990, 765, 1.68, "sine.inOut"]
  ]);

  // đèn xanh (hầm mở): chỉ bóng dưới sáng
  api.show("#den-b0", 0, 0); api.show("#den-b1", 0, 0); api.show("#den-b2", 0, 1);
  // thanh chắn dựng đứng, hoa mọc trên trụ
  api.origin("#chan-arm", "0 0"); api.key("#chan-arm", "rotation", 0, -86, "step");
  api.key("#HOA", "x", 0, 760, "step"); api.key("#HOA", "y", 0, 808, "step");
  api.origin("#HOA", "0 0"); api.set("#HOA", 0, { scale: 0 }); api.pop("#HOA", tJuly + 0.1, 0.45);
  api.key("#HOA", "rotation", tJuly + 0.7, 8, "sine.inOut"); api.key("#HOA", "rotation", tJuly + 1.5, -6, "sine.inOut"); api.key("#HOA", "rotation", tJuly + 2.3, 0, "sine.inOut");
  api.sfx("liu-lo-vui", tJuly + 0.1, 0.5);
  // giờ trên tờ lịch: đúng lời
  api.show("#c0", 0, 0); api.show("#c0", tFive - 0.08, 1);
  api.origin("#c0", "130 90"); api.key("#c0", "scale", 0, 1, "step"); api.key("#c0", "scale", tFive - 0.08, 1.3, "step"); api.key("#c0", "scale", tFive + 0.2, 1, "back.out(2)");
  api.show("#c1", 0, 0); api.show("#c1", tEleven - 0.08, 1);
  api.origin("#c1", "130 190"); api.key("#c1", "scale", 0, 1, "step"); api.key("#c1", "scale", tEleven - 0.08, 1.3, "step"); api.key("#c1", "scale", tEleven + 0.2, 1, "back.out(2)");
  api.sfx("ting", tFive - 0.06, 0.45); api.sfx("ting", tEleven - 0.06, 0.4);

  // xe chạy vào từ phải, dừng cạnh bảng
  var x0 = 2500, xStop = 1700;
  api.key("#XE", "x", 0, x0, "step"); api.key("#XE", "x", 0.3, x0, "none"); api.key("#XE", "x", tSame + 0.3, xStop, "power2.out");
  W.set(0, { x: 18, y: 884, size: 0.62, lashes: 0, ice: 0, aRu: -40, aRf: 20, aLu: 40, aLf: -20, pupX: -6 });
  W.mouth(0, "grin");
  W.idle(0.3, tDiff, { seed: 241, bien: 1.2 });
  W.pose(tSame + 0.3, 0.3, { pupX: -12, pupY: -6 }, "power2.out");
  W.pose(tDiff, 0.3, { aRu: -150, aRf: -30, pupX: 0, pupY: 0 }, "back.out(1.6)");
  api.origin("#W-cap", "200 100");
  api.key("#W-cap", "rotation", tDiff + 0.1, -10, "power2.out"); api.key("#W-cap", "rotation", tDiff + 0.6, 0, "back.out(2)");
  W.pose(tDiff + 0.8, 0.3, { aRu: -40, aRf: 20 }, "power2.inOut");
  W.pose(tSummer - 0.2, 0.3, { pupX: -14, pupY: -16, lean: -4 }, "power2.out");
  W.mouth(tFive, "o");
  W.nhonChan(tFive + 0.3, 0.4, {});
  W.mouth(tEleven + 0.2, "smirk");
  W.idle(tSummer + 0.5, tArr, { seed: 242, bien: 1.0, tho: false });
  W.pose(tArr, 0.3, { pupX: 0, pupY: 0, lean: 0 }, "power2.out");
  W.mouth(tClos, "smirk");
  api.key("#W-eyeR", "scaleY", 0, 1, "step"); api.key("#W-eyeR", "scaleY", tClos + 0.2, 1, "none"); api.key("#W-eyeR", "scaleY", tClos + 0.3, 0.08, "power2.out");
  api.key("#W-eyeR", "scaleY", tClos + 0.8, 0.08, "none"); api.key("#W-eyeR", "scaleY", tClos + 0.92, 1, "power2.in");
  // lao thẳng vào hầm; thanh chắn hạ ngay sau, sượt cuộn thảm (cận đuôi xe, giữ)
  W.pose(tGo - 0.1, 0.2, { aRu: -60, aRf: 50, aLu: 60, aLf: -50, lean: -6 }, "power2.out");
  api.key("#XE", "x", tGo, xStop, "none"); api.key("#XE", "x", tIn, 1010, "power2.in");
  api.origin("#XE", "0 924");
  api.key("#XE", "y", 0, 0, "step"); api.key("#XE", "y", tGo, 0, "none"); api.key("#XE", "y", tIn, -30, "power2.in");
  api.key("#XE", "scale", 0, 1, "step"); api.key("#XE", "scale", tGo + 0.4, 1, "none"); api.key("#XE", "scale", tIn, 0.56, "power2.in"); api.key("#XE", "scale", tIn + 0.35, 0.42, "none");
  api.key("#XE", "opacity", 0, 1, "step"); api.key("#XE", "opacity", tIn + 0.3, 1, "none"); api.key("#XE", "opacity", tIn + 0.4, 0, "none");
  api.sfx("whoosh", tGo, 0.55);
  api.key("#chan-arm", "rotation", tIn - 0.3, -86, "none"); api.key("#chan-arm", "rotation", tIn - 0.06, -40, "power2.in");
  api.key("#chan-arm", "rotation", tIn + 0.35, -34, "sine.inOut"); api.key("#chan-arm", "rotation", tIn + 0.6, 0, "bounce.out");
  api.sfx("bonk", tIn - 0.02, 0.4);
  W.pose(tIn - 0.05, 0.12, { upY: 14, eye: 1.25 }, "power2.out"); W.mouth(tIn - 0.05, "o");
  for (var k = 0; k < 6; k++) {
    var s = "#vu" + k, ang = -160 + k * 28, px = 1040, py = 790;
    api.show(s, 0, 0); api.show(s, tIn - 0.02, 1);
    api.key(s, "x", 0, px, "step"); api.key(s, "y", 0, py, "step");
    api.key(s, "x", tIn - 0.02, px, "none"); api.key(s, "x", tIn + 0.6, px + Math.cos(ang * Math.PI / 180) * 110, "power2.out");
    api.key(s, "y", tIn - 0.02, py, "none"); api.key(s, "y", tIn + 0.6, py + Math.sin(ang * Math.PI / 180) * 60 + 70, "power2.in");
    api.key(s, "rotation", tIn - 0.02, 0, "none"); api.key(s, "rotation", tIn + 0.6, 220 + k * 40, "none");
  }
  W.autoBlink(0.6, tClos, 2408);
};
