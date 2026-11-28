/* ---- Bộ dựng riêng tập 5 Tristan da Cunha, cắt giấy nhóm A (d07 d09 d11 d13 d15 d16 d18 d20 d23 d25).
   Nguồn chính: doan-d07/canh-rieng.js. ghep.sh chép nguyên vào đầu canh.js của từng đoạn (tao_sfx.mjs chỉ nạp canh.js).
   Không sửa lib chung (thợ nhóm B chạy song song). Tất định: mọi nhiễu qua DaoCu.rng(seed). Không chạm document ngoài api.moiKhung.
   Khoá trang phục: áo mưa vải dầu cam #E07A2E có mũ trùm (viền #B85A1E, hai cúc gỗ #8A5A33, dài tới gối), ba lô nhỏ ô liu
   #7C8646 / #566030 có cuộn thảm đỏ #C9463A, giày đỏ của tạo hình gốc. Wob dựng từ WobRig (toạ độ gốc tao_wob.py), không lông mi. ---- */
var TD = (function () {
  "use strict";
  var D = window.DaoCu, ND = window.NhietDoi, INK = D.INK, paper = D.paper, rough = D.rough, rRect = D.rRect, rEll = D.rEll, line = D.line, f1 = D.f1, rng = D.rng;
  var M = {
    cam: "#E07A2E", camToi: "#B85A1E", camSang: "#F4A262", cuc: "#8A5A33",
    oliu: "#7C8646", oliuToi: "#566030", tham: "#C9463A",
    bienXam: ["#AEB9BA", "#93A2A5", "#7A8B8F", "#63757A"], bienDem: ["#8C9AA0", "#73848B", "#5E7078", "#4C5E66"],
    da: "#3B3735", daToi: "#2A2725", daSang: "#59534E", co: "#7E9E57", coToi: "#5D7D43", coSang: "#9DBA6E",
    dat: "#5A4636", datToi: "#3F3026", datSang: "#7A604A", tuongDa: "#9C958A", tuongDaToi: "#77706A",
    mai: ["#3F7A5A", "#B4443A", "#3F6E9A", "#C98A3A", "#5E8E8A"],
    go: "#8A6440", goToi: "#5E4228", goSang: "#B08A5E", kem: "#F3E6C8", chi: "#2F4A6B",
    S: { giay: "#E8D4A8", giayToi: "#D2B985", giaySang: "#F1E2BE", muc: "#5A4430", nau: "#8E6E4A", nauNhat: "#B89A70", bien: "#C2A97C", bienToi: "#A88E62", troi: "#EADBB8", da: "#7A6448", co: "#A89A68" }
  };
  function at(x, y, s, sc) { return '<g transform="translate(' + f1(x) + "," + f1(y) + ")" + (sc != null && sc !== 1 ? " scale(" + sc + ")" : "") + '">' + s + "</g>"; }
  function g(id, s, tr) { return "<g" + (id ? ' id="' + id + '"' : "") + (tr ? ' transform="' + tr + '"' : "") + ">" + s + "</g>"; }
  function ss(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
  function ss5(u) { u = Math.max(0, Math.min(1, u)); return u * u * u * (u * (6 * u - 15) + 10); }

  function defs() {
    return "<defs>" +
      '<linearGradient id="tdTroiXam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8D9AA1"/><stop offset="0.55" stop-color="#C3CAC9"/><stop offset="1" stop-color="#E1DED2"/></linearGradient>' +
      '<linearGradient id="tdTroiSang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9DB0BA"/><stop offset="0.6" stop-color="#D6D8CF"/><stop offset="1" stop-color="#EEE5CF"/></linearGradient>' +
      '<linearGradient id="tdTroiNang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FB3C8"/><stop offset="0.6" stop-color="#CFDCDC"/><stop offset="1" stop-color="#EFE8D2"/></linearGradient>' +
      '<linearGradient id="tdSep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EEDDB6"/><stop offset="1" stop-color="#DCC292"/></linearGradient>' +
      '<radialGradient id="tdSepVi" cx="0.5" cy="0.5" r="0.7"><stop offset="0.6" stop-color="#8E6E4A" stop-opacity="0"/><stop offset="1" stop-color="#8E6E4A" stop-opacity="0.35"/></radialGradient>' +
      '<linearGradient id="tdCabin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9B48E"/><stop offset="1" stop-color="#B59D74"/></linearGradient>' +
      '<radialGradient id="tdDen" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE2A0" stop-opacity="0.55"/><stop offset="1" stop-color="#FFE2A0" stop-opacity="0"/></radialGradient>' +
      "</defs>";
  }

  /* ---------- Wob áo mưa cam ---------- */
  function sleeves(svg, mau) {
    return svg.replace(/<path d="M 0 0 L 0 (48|46)"([^>]*?)stroke="#1f2326"([^>]*?)stroke-width="13"([^>]*?)\/>/g, function (m, n, a, b, c) {
      return '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="#1f2326"' + b + 'stroke-width="24"' + c + "/>" +
        '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="' + mau + '"' + b + 'stroke-width="14"' + c + "/>";
    });
  }
  /* o: như api.wob (holdL, holdR, phuKien…), thêm { muTrum: 1 lên | 0 hạ, uot (áo ướt bóng lúc đầu), khongBaLo, xam (lớp xám mặt, ẩn) }
     Nhóm: id-hUf / id-hUb mũ trùm lên (trước mặt / sau đầu), id-hD mũ trùm hạ (cổ áo cuộn), id-uot vệt ướt, id-pack ba lô, id-quai quai,
     id-xam lớp xám trên quả cầu (dưới mắt). W.muTrum(t, 1|0): tay đưa lên kéo mũ. */
  function wob(api, id, o) {
    o = o || {};
    var oo = {};
    Object.keys(o).forEach(function (k) { if (["muTrum", "uot", "khongBaLo", "xam"].indexOf(k) < 0) oo[k] = o[k]; });
    var C = M.cam, CT = M.camToi, clip = 'clip-path="url(#' + id + '-clip)"';
    var pk = "";
    pk += "<g " + clip + '><path d="M 30 258 C 120 284 280 284 370 258 L 370 420 L 30 420 Z" fill="' + C + '"/>' + line("M 30 258 C 120 284 280 284 370 258", 5) + "</g>";
    pk += '<g id="' + id + '-hD"><path d="M 64 244 C 130 276 270 276 336 244 L 340 266 C 270 298 130 298 60 266 Z" fill="' + CT + '" stroke="' + INK + '" stroke-width="5" stroke-linejoin="round"/>' +
      line("M 88 262 C 150 284 250 284 312 262", 3, "#8E4416", ' opacity="0.6"') + "</g>";
    var sk = "M 88 282 C 150 298 250 298 312 282 L 332 350 C 262 368 138 368 68 350 Z";
    pk += paper(sk, C, { stroke: true, sw: 5, sx: 4, sy: 6 });
    pk += line("M 74 338 C 140 354 260 354 326 338", 2.5, CT, ' stroke-dasharray="7 6"') + line("M 200 288 L 200 360", 4, INK, ' opacity="0.7"');
    pk += '<circle cx="186" cy="304" r="7.5" fill="' + M.cuc + '" stroke="' + INK + '" stroke-width="3"/><circle cx="186" cy="334" r="7.5" fill="' + M.cuc + '" stroke="' + INK + '" stroke-width="3"/>';
    pk += '<g id="' + id + '-hUf"><g ' + clip + '><path d="M 40 130 C 100 62 300 62 360 130 L 360 -10 L 40 -10 Z" fill="' + C + '"/>' + line("M 118 62 C 146 48 176 42 206 42", 7, M.camSang, ' opacity="0.75"') + "</g>" +
      line("M 60 134 C 110 70 290 70 340 134", 15, CT) + line("M 60 134 C 110 70 290 70 340 134", 4, INK, ' opacity="0.8"') + "</g>";
    var u = '<g id="' + id + '-uot">';
    u += line("M 108 300 L 116 344 M 252 298 L 246 340 M 300 294 L 310 330", 5, "#FFFFFF", ' opacity="0.55"');
    u += line("M 72 232 C 66 260 70 284 80 300 M 330 230 C 336 258 332 282 322 300", 5, "#FFFFFF", ' opacity="0.45"');
    [[120, 360], [210, 366], [290, 358]].forEach(function (p) { u += at(p[0], p[1], '<path d="M 0 0 C -5 8 -6 14 0 17 C 6 14 5 8 0 0 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="2"/>'); });
    pk += u + "</g>";
    if (o.phuKien) pk += o.phuKien;
    oo.phuKien = pk;
    var W = api.wob(id, oo), s = W.svg;
    var behind = '<g id="' + id + '-ao">' + paper("M 62 310 C 32 272 42 212 80 168 L 320 168 C 358 212 368 272 338 310 Z", C, { stroke: true, sw: 6, shadow: false }) + "</g>" +
      '<g id="' + id + '-hUb"><path d="M 48 208 C 38 70 116 12 200 12 C 284 12 362 70 352 208 C 336 126 282 74 200 74 C 118 74 64 126 48 208 Z" fill="' + C + '" stroke="' + INK + '" stroke-width="6" stroke-linejoin="round"/>' +
      line("M 70 160 C 78 90 130 40 200 34", 4, CT, ' opacity="0.6"') + "</g>";
    s = s.replace('<g id="' + id + '-up">', '<g id="' + id + '-up">' + behind);
    var a = s.indexOf('<g id="' + id + '-pack">'), b = s.indexOf('<clipPath id="' + id + '-clip">');
    if (a >= 0 && b > a) s = s.slice(0, a) + s.slice(a, b).replace(/#b8743a/g, M.oliu).replace(/#8e5527/g, M.oliuToi).replace(/#d9543c/g, M.tham) + s.slice(b);
    s = s.replace(/#8e5527/g, M.oliuToi);
    s = s.replace(/((?:<path d="M 300 96 C 286 130 284 168 300 206"[^>]*\/>)+)/, '<g id="' + id + '-quai">$1</g>');
    var xam = '<g id="' + id + '-xam" ' + clip + '><rect x="0" y="0" width="400" height="400" fill="#8E979A"/></g>';
    s = s.replace('<ellipse cx="124" cy="204"', xam + '<ellipse cx="124" cy="204"');
    s = sleeves(s, C);
    W.svg = s;
    W.set(0, { lashes: 0, ice: 0 });
    var up = o.muTrum ? 1 : 0;
    api.show("#" + id + "-hUf", 0, up); api.show("#" + id + "-hUb", 0, up); api.show("#" + id + "-hD", 0, 1 - up);
    api.show("#" + id + "-uot", 0, o.uot ? 1 : 0);
    api.show("#" + id + "-xam", 0, 0);
    if (o.khongBaLo) { api.show("#" + id + "-pack", 0, 0); api.show("#" + id + "-quai", 0, 0); }
    W.td = { hUf: "#" + id + "-hUf", hUb: "#" + id + "-hUb", hD: "#" + id + "-hD", uot: "#" + id + "-uot", pack: "#" + id + "-pack", quai: "#" + id + "-quai", xam: "#" + id + "-xam" };
    W.muTrum = function (t, len, giu) {
      W.pose(t - 0.24, 0.2, { aLu: 160, aLf: 60, aRu: -160, aRf: -60 }, "power2.out");
      api.show(W.td.hUf, t, len); api.show(W.td.hUb, t, len); api.show(W.td.hD, t, len ? 0 : 1);
      W.pose(t, 0.07, { sy: len ? 0.94 : 1.05 }, "power2.out"); W.pose(t + 0.07, 0.22, { sy: 1 }, "back.out(2)");
      if (giu !== false) W.pose(t + 0.14, 0.26, { aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "power2.inOut");
    };
    W.baLo = function (t, v) { api.show(W.td.pack, t, v); api.show(W.td.quai, t, v); };
    return W;
  }

  /* Wob nhìn từ sau (quay lưng khoe ba lô): mặt sau quả cầu, mũ trùm lên phủ đỉnh, áo mưa, ba lô nhỏ giữa lưng, chân giày đỏ.
     Gốc: giữa chân. Nhóm: id (x, y), id-sz (scale), id-sq (scaleX lật), id-bl (ba lô, xoay quanh quai "200 110"), id-aL / id-aR tay (gốc vai). */
  function wobLung(id, o) {
    o = o || {};
    var C = M.cam, CT = M.camToi, s = '<g id="' + id + '"><g id="' + id + '-sz"><g id="' + id + '-sq"><g transform="translate(-200,-392)">';
    s += '<ellipse cx="200" cy="394" rx="118" ry="15" fill="#0b1214" opacity="0.28"/>';
    s += line("M 174 290 C 172 324 170 350 168 380", 15) + line("M 226 290 C 228 324 230 350 232 380", 15);
    s += '<ellipse cx="160" cy="386" rx="28" ry="12" fill="#d9543c" stroke="' + INK + '" stroke-width="5"/><ellipse cx="240" cy="386" rx="28" ry="12" fill="#d9543c" stroke="' + INK + '" stroke-width="5"/>';
    s += paper("M 62 310 C 32 272 42 212 80 168 L 320 168 C 358 212 368 272 338 310 Z", C, { stroke: true, sw: 6, shadow: false });
    s += '<clipPath id="' + id + '-cl"><path d="' + rEll(200, 178, 122, 118, 1.5, 5201) + '"/></clipPath>';
    s += '<path d="' + rEll(200, 178, 122, 118, 1.5, 5201) + '" fill="#5a9fb8"/>';
    s += '<g clip-path="url(#' + id + '-cl)">' + '<path d="M 110 150 C 130 120 170 126 176 150 C 182 176 150 196 126 188 C 104 180 96 164 110 150 Z" fill="#efd9a2" stroke="' + INK + '" stroke-width="3.5"/>' +
      '<path d="M 240 230 C 262 214 296 226 296 250 C 296 270 268 280 250 268 C 234 258 226 240 240 230 Z" fill="#efd9a2" stroke="' + INK + '" stroke-width="3.5"/>' +
      '<path d="M 30 130 C 100 50 300 50 370 130 L 370 -10 L 30 -10 Z" fill="' + C + '"/>' + line("M 40 130 C 100 60 300 60 360 130", 4, CT) +
      '<path d="M 30 258 C 120 284 280 284 370 258 L 370 420 L 30 420 Z" fill="' + C + '"/>' + "</g>";
    s += '<path d="' + rEll(200, 178, 122, 118, 1.5, 5201) + '" fill="none" stroke="' + INK + '" stroke-width="7"/>';
    s += paper("M 88 282 C 150 298 250 298 312 282 L 332 350 C 262 368 138 368 68 350 Z", C, { stroke: true, sw: 5, sx: 4, sy: 6 });
    s += line("M 200 140 L 200 360", 3, CT, ' stroke-dasharray="8 7"');
    s += '<g transform="translate(88,210)"><g id="' + id + '-aL">' + line("M 0 0 L -8 90", 24) + line("M 0 0 L -8 90", 14, C) + '<circle cx="-8" cy="96" r="14" fill="' + INK + '"/></g></g>';
    s += '<g transform="translate(312,210)"><g id="' + id + '-aR">' + line("M 0 0 L 8 90", 24) + line("M 0 0 L 8 90", 14, C) + '<circle cx="8" cy="96" r="14" fill="' + INK + '"/></g></g>';
    s += '<g id="' + id + '-bl">' + line("M 150 110 C 140 160 140 200 150 240 M 250 110 C 260 160 260 200 250 240", 9, M.oliuToi) +
      '<rect x="146" y="118" width="108" height="150" rx="30" fill="' + M.oliu + '" stroke="' + INK + '" stroke-width="7"/>' +
      '<rect x="170" y="190" width="60" height="56" rx="12" fill="' + M.oliuToi + '" stroke="' + INK + '" stroke-width="5"/>' +
      '<rect x="150" y="88" width="100" height="36" rx="18" fill="' + M.tham + '" stroke="' + INK + '" stroke-width="7"/>' + line("M 172 92 L 172 120 M 228 92 L 228 120", 4) + "</g>";
    return s + "</g></g></g></g>";
  }

  /* Ba lô nhỏ rời (cùng hình ba lô của rig, đã đổi màu ô liu). Gốc: giữa đáy. Cao ≈ 190 ở cỡ 1. */
  function baLoNho(id) {
    var s = '<g' + (id ? ' id="' + id + '"' : "") + '><g transform="translate(-299,-256)">';
    s += '<rect x="250" y="96" width="98" height="160" rx="30" fill="#0b1214" opacity="0.2" transform="translate(5,7)"/>';
    s += '<rect x="250" y="96" width="98" height="160" rx="30" fill="' + M.oliu + '" stroke="' + INK + '" stroke-width="7"/>';
    s += '<rect x="262" y="150" width="44" height="58" rx="12" fill="' + M.oliuToi + '" stroke="' + INK + '" stroke-width="5"/>';
    s += '<rect x="250" y="66" width="98" height="36" rx="18" fill="' + M.tham + '" stroke="' + INK + '" stroke-width="7"/>' + line("M 270 70 L 270 98 M 328 70 L 328 98", 4);
    s += line("M 268 120 C 276 104 300 100 320 108", 4, "#FFFFFF", ' opacity="0.25"');
    return s + "</g></g>";
  }

  /* ---------- biển, trời, núi ---------- */
  function bien(api, id, o) {
    o = o || {};
    var oo = { mau: o.dem ? M.bienDem : M.bienXam, bien: 22, chuKy: 3.6 };
    Object.keys(o).forEach(function (k) { oo[k] = o[k]; });
    var s = ND.bien(api, id, oo);
    return s.replace(/stroke="#EAF7F2"/g, 'stroke="#E6EBE8"');
  }
  /* Mây giấy xám trắng. Gốc: tâm đáy. w: rộng. o: { mau, seed, cao } */
  function may(w, o) {
    o = o || {};
    var r = rng(o.seed || 5301), mau = o.mau || "#E7EAE6", h = o.cao || w * 0.32, s = "<g>", n = Math.max(3, Math.round(w / 110));
    var pts = [];
    for (var i = 0; i < n; i++) {
      var u = i / (n - 1), x = -w / 2 + u * w, rr = (0.45 + 0.55 * Math.sin(Math.PI * u)) * h * (0.7 + r() * 0.35);
      pts.push([x, rr]);
    }
    pts.forEach(function (p, i) { s += paper(rEll(p[0], -p[1] * 0.75, Math.max(40, p[1] * 0.85), p[1] * 0.72, 2, (o.seed || 5301) + i), mau, { shadow: i === 0, shOp: 0.12, sx: 6, sy: 10 }); });
    s += paper(rRect(-w / 2 - 20, -h * 0.22, w + 40, h * 0.24, 2, (o.seed || 5301) + 40), mau, { shadow: false });
    s += line("M " + f1(-w * 0.42) + " " + f1(-h * 0.06) + " L " + f1(w * 0.42) + " " + f1(-h * 0.06), 3, "#B9C2C2", ' opacity="0.7"');
    return s + "</g>";
  }
  /* Núi lửa hình nón (Tristan): vách đá đen dựng ở chân, sườn cỏ, chóp nâu. Gốc: giữa chân ở mép nước. o: { w: 1800, h: 900, seed, mau, phang: bề rộng dải đất bằng phía trái (0) } */
  function nui(o) {
    o = o || {};
    var W = o.w || 1800, H = o.h || 900, sd = o.seed || 5101, r = rng(sd), s = "<g>";
    var sil = [[-W / 2, 12], [-W * 0.49, -H * 0.17], [-W * 0.43, -H * 0.23], [-W * 0.32, -H * 0.31], [-W * 0.22, -H * 0.43], [-W * 0.13, -H * 0.6], [-W * 0.07, -H * 0.81], [-W * 0.03, -H * 0.96], [W * 0.015, -H], [W * 0.055, -H * 0.955], [W * 0.1, -H * 0.8], [W * 0.165, -H * 0.6], [W * 0.25, -H * 0.43], [W * 0.36, -H * 0.31], [W * 0.45, -H * 0.23], [W * 0.49, -H * 0.17], [W / 2, 12]];
    s += paper(rough(sil, 5, sd, 30), o.mau || "#6E7C50", { stroke: true, sw: 5, sx: 10, sy: 12, half: 0.1 });
    s += paper(rough([[-W * 0.36, -H * 0.3], [-W * 0.2, -H * 0.4], [-W * 0.08, -H * 0.36], [W * 0.05, -H * 0.4], [W * 0.22, -H * 0.38], [W * 0.38, -H * 0.3], [W * 0.2, -H * 0.27], [0, -H * 0.3], [-W * 0.2, -H * 0.27]], 4, sd + 5, 26), o.mau2 || "#5F6F45", { shadow: false });
    var top = [[-W * 0.16, -H * 0.57], [-W * 0.07, -H * 0.81], [-W * 0.03, -H * 0.96], [W * 0.015, -H], [W * 0.055, -H * 0.955], [W * 0.1, -H * 0.8], [W * 0.175, -H * 0.57], [W * 0.06, -H * 0.62], [-W * 0.05, -H * 0.6]];
    s += paper(rough(top, 4, sd + 1, 22), o.mauDinh || "#7B5E4A", { shadow: false, half: 0.12 });
    for (var k = 0; k < 11; k++) {
      var u = (k - 5) / 5, x0 = u * W * 0.03, y0 = -H * (0.93 - Math.abs(u) * 0.06), x1 = u * W * 0.2 + (r() - 0.5) * 40, y1 = -H * (0.5 + r() * 0.08);
      s += line("M " + f1(x0) + " " + f1(y0) + " C " + f1((x0 + x1) / 2 + (r() - 0.5) * 30) + " " + f1((y0 + y1) / 2) + " " + f1(x1) + " " + f1(y1 + 20) + " " + f1(x1 * 1.15) + " " + f1(y1 + 90), 3, "#4F3E31", ' opacity="0.55"');
    }
    var cl = [[-W / 2, 12], [-W * 0.49, -H * 0.17], [-W * 0.43, -H * 0.22], [-W * 0.3, -H * 0.175], [-W * 0.12, -H * 0.16], [W * 0.1, -H * 0.165], [W * 0.3, -H * 0.18], [W * 0.43, -H * 0.22], [W * 0.49, -H * 0.17], [W / 2, 12]];
    if (o.phang) cl = [[-W / 2, 12], [-W / 2 + 6, -H * 0.05], [-W / 2 + o.phang, -H * 0.055], [-W / 2 + o.phang + 30, -H * 0.17], [-W * 0.3, -H * 0.175], [-W * 0.12, -H * 0.16], [W * 0.1, -H * 0.165], [W * 0.3, -H * 0.18], [W * 0.43, -H * 0.22], [W * 0.49, -H * 0.17], [W / 2, 12]];
    s += paper(rough(cl, 4, sd + 2, 20), M.da, { shadow: false, stroke: true, sw: 4 });
    for (var j = 0; j < 26; j++) { var xx = -W * 0.47 + j * W * 0.037 + (r() - 0.5) * 20; if (o.phang && xx < -W / 2 + o.phang + 20) continue; s += line("M " + f1(xx) + " " + f1(-H * 0.15 + r() * 14) + " L " + f1(xx + (r() - 0.5) * 16) + " 4", 3, M.daSang, ' opacity="0.6"'); }
    s += line("M " + f1(-W * 0.43) + " " + f1(-H * 0.215) + " C " + f1(-W * 0.2) + " " + f1(-H * 0.19) + " " + f1(W * 0.2) + " " + f1(-H * 0.19) + " " + f1(W * 0.43) + " " + f1(-H * 0.215), 5, M.coSang, ' opacity="0.7"');
    return s + "</g>";
  }

  /* ---------- tàu, thuyền ---------- */
  /* Tàu cá nhỏ nhìn ngang, mũi bên phải. Gốc: giữa mép nước. Dài ≈ 1000. id-cau: cần cẩu (xoay quanh chân cột "-210 -330"). */
  function tauCa(id, o) {
    o = o || {};
    var sd = o.seed || 5401, s = '<g id="' + id + '">';
    s += line("M -210 -150 L -210 -620", 14, "#3B4448") + line("M -210 -560 L -120 -560", 8, "#3B4448");
    s += '<g id="' + id + '-cau">' + line("M -210 -330 L -470 -520", 10, "#C98A3A") + line("M -210 -330 L -470 -520", 3, INK, ' opacity="0.5"') + line("M -470 -520 L -470 " + f1(o.day || -300), 3, INK) + "</g>";
    s += paper(rRect(40, -380, 260, 240, 2, sd), "#EDEBE4", { stroke: true, sw: 5, half: 0.06 });
    s += paper(rRect(20, -404, 300, 34, 1.5, sd + 1), "#3B4448", { stroke: true, sw: 4, shadow: false });
    [[70, -340], [150, -340], [230, -340]].forEach(function (p) { s += '<rect x="' + p[0] + '" y="' + p[1] + '" width="56" height="50" rx="6" fill="#4E6670" stroke="' + INK + '" stroke-width="4"/>' + line("M " + (p[0] + 8) + " " + (p[1] + 40) + " L " + (p[0] + 30) + " " + (p[1] + 8), 4, "#FFFFFF", ' opacity="0.4"'); });
    s += paper(rRect(190, -470, 22, 70, 1, sd + 2), "#B4443A", { stroke: true, sw: 3.5, shadow: false });
    var hull = "M -500 -150 L 500 -170 C 540 -168 536 -120 500 -70 C 466 -20 410 0 300 0 L -440 0 C -470 -40 -492 -90 -500 -150 Z";
    s += paper(hull, "#2F4150", { stroke: true, sw: 6, sx: 10, sy: 12, half: 0.08 });
    s += paper("M -446 -10 L 300 -10 C 380 -12 430 -30 460 -52 L 452 -30 C 420 -12 370 0 300 0 L -440 0 Z", "#9E3B2E", { shadow: false });
    s += line("M -496 -128 L 512 -148", 6, "#EDEBE4");
    for (var x = -470; x <= 470; x += 60) s += line("M " + x + " " + f1(-152 - (x + 500) * 0.02) + " L " + x + " " + f1(-206 - (x + 500) * 0.02), 4, "#9AA4A6");
    s += line("M -480 -206 L 480 -226", 5, "#9AA4A6");
    s += '<circle cx="380" cy="-112" r="16" fill="#E7E3D6" stroke="' + INK + '" stroke-width="4"/>';
    return s + "</g>";
  }
  /* Thùng hàng gỗ. Gốc: giữa đáy. w. */
  function thung(w, sd) {
    w = w || 120;
    var s = "<g>" + paper(rRect(-w / 2, -w * 0.8, w, w * 0.8, 1.5, sd || 5501), "#B08A5E", { stroke: true, sw: 4.5, sx: 5, sy: 6 });
    s += line("M " + f1(-w / 2 + 6) + " " + f1(-w * 0.4) + " L " + f1(w / 2 - 6) + " " + f1(-w * 0.4), 3, M.goToi) + line("M " + f1(-w / 2 + 8) + " -6 L " + f1(w / 2 - 8) + " " + f1(-w * 0.8 + 6), 4, M.goToi);
    return s + "</g>";
  }
  /* Thang dây treo mạn tàu. Gốc: móc trên. h: dài. */
  function thangDay(h, o) {
    o = o || {};
    var s = "<g>" + line("M -34 0 L -30 " + h + " M 34 0 L 30 " + h, 5, "#B89A5E") + line("M -34 0 L -30 " + h + " M 34 0 L 30 " + h, 1.5, INK, ' opacity="0.6"');
    for (var y = 40; y < h; y += 52) s += paper(rRect(-38, y - 6, 76, 12, 1, 5600 + y), M.go, { stroke: true, sw: 2.5, shadow: false });
    return s + "</g>";
  }
  /* Tàu buồm ba cột (lịch sử). Mũi bên phải. Gốc: giữa mép nước. o: { sep (bảng màu giấy cũ), dai: 640 }.
     id-buom: các buồm (vẫy: scaleX quanh cột giữa "0 -260"), id-neo: dây + mỏ neo (y kéo lên), id-buomV: cánh buồm mũi để vẫy. */
  function tauBuom(id, o) {
    o = o || {};
    var L = o.dai || 640, sep = o.sep !== false, S = M.S, hullC = sep ? S.nau : "#7A5236", sailC = sep ? S.giaySang : "#F2EBD8", inkC = sep ? S.muc : INK;
    var s = '<g id="' + id + '">', k = L / 640;
    function sc(v) { return f1(v * k); }
    [-170, 0, 160].forEach(function (x, i) {
      var hh = i === 1 ? 470 : 400;
      s += line("M " + sc(x) + " -90 L " + sc(x) + " " + sc(-hh), 9 * k, inkC);
    });
    var buom = '<g id="' + id + '-buom">';
    [-170, 0, 160].forEach(function (x, i) {
      var top = i === 1 ? 440 : 370;
      for (var j = 0; j < 2; j++) {
        var y0 = -top + j * 130, w = (i === 1 ? 120 : 100) - j * 4;
        buom += paper("M " + sc(x - w) + " " + sc(y0) + " L " + sc(x + w) + " " + sc(y0) + " C " + sc(x + w + 14) + " " + sc(y0 + 56) + " " + sc(x + w + 14) + " " + sc(y0 + 80) + " " + sc(x + w - 6) + " " + sc(y0 + 112) + " L " + sc(x - w + 6) + " " + sc(y0 + 112) + " C " + sc(x - w + 12) + " " + sc(y0 + 80) + " " + sc(x - w + 12) + " " + sc(y0 + 56) + " " + sc(x - w) + " " + sc(y0) + " Z", sailC, { stroke: true, sw: 4 * k, sx: 4, sy: 5 }).replace(/#1f2326/g, inkC);
      }
    });
    buom += "</g>";
    s += buom;
    s += '<g id="' + id + '-buomV">' + paper("M " + sc(200) + " " + sc(-380) + " L " + sc(330) + " " + sc(-120) + " L " + sc(190) + " " + sc(-120) + " Z", sailC, { stroke: true, sw: 4 * k, sx: 4, sy: 5 }).replace(/#1f2326/g, inkC) + "</g>";
    s += line("M " + sc(-170) + " " + sc(-400) + " L " + sc(330) + " " + sc(-110) + " M " + sc(160) + " " + sc(-400) + " L " + sc(330) + " " + sc(-110), 2.5 * k, inkC, ' opacity="0.7"');
    var hull = "M " + sc(-330) + " " + sc(-120) + " L " + sc(340) + " " + sc(-110) + " C " + sc(320) + " " + sc(-50) + " " + sc(270) + " 0 " + sc(180) + " 0 L " + sc(-250) + " 0 C " + sc(-300) + " " + sc(-30) + " " + sc(-326) + " " + sc(-70) + " " + sc(-330) + " " + sc(-120) + " Z";
    s += paper(hull, hullC, { stroke: true, sw: 5 * k, sx: 6, sy: 8, half: 0.1 }).replace(/#1f2326/g, inkC);
    s += paper("M " + sc(-340) + " " + sc(-150) + " L " + sc(-250) + " " + sc(-150) + " L " + sc(-250) + " " + sc(-118) + " L " + sc(-334) + " " + sc(-120) + " Z", hullC, { stroke: true, sw: 4 * k, shadow: false }).replace(/#1f2326/g, inkC);
    s += line("M " + sc(-320) + " " + sc(-84) + " L " + sc(310) + " " + sc(-76), 3 * k, sep ? S.giayToi : "#C9A86E");
    for (var p = -240; p < 260; p += 70) s += '<circle cx="' + sc(p) + '" cy="' + sc(-60) + '" r="' + sc(9) + '" fill="' + inkC + '" opacity="0.7"/>';
    s += '<g id="' + id + '-neo">' + line("M " + sc(300) + " " + sc(-90) + " L " + sc(300) + " " + sc(120), 3 * k, inkC) +
      '<g transform="translate(' + sc(300) + "," + sc(130) + ') scale(' + f1(k) + ')">' + line("M 0 -10 L 0 40 M -26 26 C -20 46 20 46 26 26 M -12 0 L 12 0", 6, inkC) + "</g></g>";
    return s + "</g>";
  }
  /* Thuyền con chèo (lịch sử). Gốc: giữa mép nước. Mũi bên phải. o: { sep, dai: 220 } */
  function thuyenCon(id, o) {
    o = o || {};
    var L = o.dai || 220, sep = o.sep !== false, c = sep ? M.S.nau : "#7A5236", ink = sep ? M.S.muc : INK;
    var s = '<g id="' + id + '">' + paper("M " + f1(-L / 2) + " -40 L " + f1(L / 2 + 10) + " -46 C " + f1(L / 2) + " -14 " + f1(L * 0.38) + " 0 " + f1(L * 0.3) + " 0 L " + f1(-L * 0.36) + " 0 C " + f1(-L * 0.44) + " -10 " + f1(-L / 2) + " -24 " + f1(-L / 2) + " -40 Z", c, { stroke: true, sw: 4, sx: 4, sy: 5 }).replace(/#1f2326/g, ink);
    s += line("M " + f1(-L * 0.2) + " -40 L " + f1(-L * 0.42) + " 30 M " + f1(L * 0.18) + " -42 L " + f1(L * 0.36) + " 30", 4, ink);
    return s + "</g>";
  }

  /* ---------- làng, đất ---------- */
  /* Nhà đá mái tôn thấp (kiểu nhà đảo: tường đá, mái tôn màu, ống khói). Gốc: giữa chân tường. o: { w: 300, h: 150, mai, seed, cua (true), so (2), khoi (ống khói) } */
  function nhaDa(o) {
    o = o || {};
    var w = o.w || 300, h = o.h || 150, sd = o.seed || 5701, r = rng(sd), mai = o.mai || M.mai[Math.floor(r() * M.mai.length)], s = "<g>";
    s += paper(rRect(-w / 2, -h, w, h, 1.6, sd), o.tuong || "#D9D2C2", { stroke: true, sw: 5, sx: 7, sy: 6 });
    for (var k = 0; k < Math.round(w * h / 1300); k++) s += '<path d="' + rEll(-w / 2 + 12 + r() * (w - 24), -h + 12 + r() * (h - 24), 10 + r() * 8, 6 + r() * 4, 1.5, sd + 10 + k) + '" fill="none" stroke="' + M.tuongDaToi + '" stroke-width="2" opacity="0.55"/>';
    if (o.cua !== false) { var cx = o.cuaX == null ? -w * 0.18 : o.cuaX; s += paper(rRect(cx - 28, -h * 0.78, 56, h * 0.78, 1, sd + 2), o.cuaMau || "#3F6E9A", { stroke: true, sw: 4, shadow: false }) + '<circle cx="' + f1(cx + 16) + '" cy="' + f1(-h * 0.4) + '" r="4" fill="#E3C27A"/>'; }
    var nso = o.so == null ? 2 : o.so;
    for (var j = 0; j < nso; j++) { var wx = w * 0.12 + j * w * 0.22 - (nso > 1 ? 0 : 0); if (wx > w / 2 - 40) break; s += '<rect x="' + f1(wx - 26) + '" y="' + f1(-h * 0.72) + '" width="52" height="46" fill="' + (o.dem ? "#FFD68A" : "#3A4A52") + '" stroke="' + INK + '" stroke-width="4"/>' + line("M " + f1(wx) + " " + f1(-h * 0.72) + " L " + f1(wx) + " " + f1(-h * 0.72 + 46), 3, "#F3EFE4"); }
    var ov = 18, roof = "M " + f1(-w / 2 - ov) + " " + f1(-h + 6) + " L " + f1(-w * 0.3) + " " + f1(-h - 70) + " L " + f1(w * 0.3) + " " + f1(-h - 70) + " L " + f1(w / 2 + ov) + " " + f1(-h + 6) + " Z";
    if (o.khoi !== false) s += paper(rRect(w * 0.22, -h - 104, 34, 60, 1, sd + 4), "#8C857A", { stroke: true, sw: 4, sx: 4, sy: 5 });
    s += paper(roof, mai, { stroke: true, sw: 5, sx: 5, sy: 7 });
    for (var x = -w / 2 - ov + 14; x < w / 2 + ov - 6; x += 15) s += line("M " + f1(x) + " " + f1(-h + 2) + " L " + f1(x * 0.62) + " " + f1(-h - 66), 2, "#0b1214", ' opacity="0.22"');
    return s + "</g>";
  }
  /* Bò giấy nhìn ngang, đầu bên phải. Gốc: giữa chân. Dài ≈ 300 ở cỡ 1. id-dau: cổ + đầu (xoay quanh vai "92 -150"), id-ham hàm nhai, id-duoi đuôi.
     o: { mau ("#3B3532" đen | "#8A5A3A" nâu), lang (đốm trắng), lat (-1 quay trái), seed } */
  function bo(id, o) {
    o = o || {};
    var mau = o.mau || "#3B3532", sd = o.seed || 5801, s = '<g id="' + id + '"' + (o.lat === -1 ? ' transform="scale(-1,1)"' : "") + ">";
    s += '<ellipse cx="0" cy="2" rx="150" ry="13" fill="#0b1214" opacity="0.22"/>';
    [[-96, 0], [-66, 6], [70, 0], [100, 6]].forEach(function (p, i) { s += line("M " + p[0] + " -90 L " + (p[0] + p[1]) + " -6", 20, INK) + line("M " + p[0] + " -90 L " + (p[0] + p[1]) + " -6", 13, i % 2 ? "#2E2A28" : mau) + '<rect x="' + (p[0] + p[1] - 11) + '" y="-10" width="22" height="12" rx="3" fill="#2A2523"/>'; });
    s += '<g id="' + id + '-duoi">' + line("M -128 -150 C -150 -120 -150 -80 -146 -58", 6) + paper(rEll(-146, -50, 9, 14, 1, sd), INK, { shadow: false }) + "</g>";
    s += paper(rough([[-134, -166], [-60, -180], [40, -176], [112, -160], [126, -110], [100, -76], [-110, -76], [-140, -110]], 3, sd + 1, 22), mau, { stroke: true, sw: 5, sx: 5, sy: 7, half: 0.08 });
    if (o.lang !== false) { s += paper(rEll(-50, -130, 40, 28, 2.5, sd + 2), "#F2EDE2", { shadow: false }) + paper(rEll(46, -150, 28, 18, 2.5, sd + 3), "#F2EDE2", { shadow: false }); }
    s += paper(rEll(-20, -78, 26, 12, 1.5, sd + 4), "#E9A6A0", { shadow: false, stroke: true, sw: 3 });
    s += '<g transform="translate(92,-150)"><g id="' + id + '-dau">';
    s += paper("M -10 -14 C 20 -30 50 -26 66 -8 L 92 40 C 96 62 82 76 62 74 C 44 72 34 60 30 46 L 0 22 Z", mau, { stroke: true, sw: 5, sx: 4, sy: 5 });
    s += paper("M 38 -14 L 30 -40 L 48 -20 Z M 64 -10 L 82 -34 L 76 -6 Z", "#E9DFC8", { stroke: true, sw: 3, shadow: false });
    s += paper(rEll(26, -10, 18, 9, 1, sd + 5), mau, { stroke: true, sw: 3.5, shadow: false });
    s += '<g id="' + id + '-ham">' + paper(rEll(74, 60, 26, 18, 1.5, sd + 6), "#E9B7AE", { stroke: true, sw: 4, shadow: false }) + '<circle cx="70" cy="58" r="3.5" fill="' + INK + '"/><circle cx="84" cy="58" r="3.5" fill="' + INK + '"/></g>';
    s += '<g id="' + id + '-mat"><circle cx="58" cy="12" r="9" fill="#FFFDF6" stroke="' + INK + '" stroke-width="3"/><circle cx="60" cy="13" r="4.5" fill="' + INK + '"/></g>';
    s += "</g></g>";
    return s + "</g>";
  }
  /* Tường đá thấp xếp khan. Gốc: trái chân tường. w, h. */
  function tuongDa(w, h, sd) {
    h = h || 60; sd = sd || 5901;
    var r = rng(sd), s = "<g>" + paper(rough([[0, 0], [0, -h * 0.85], [w * 0.3, -h], [w * 0.7, -h * 0.94], [w, -h * 0.88], [w, 0]], 3, sd, 22), M.tuongDa, { stroke: true, sw: 4, sx: 4, sy: 6 });
    for (var x = 8; x < w - 20; x += 26 + r() * 16) for (var y = -h + 10; y < -6; y += 18) s += '<path d="' + rEll(x + (y % 2 ? 10 : 0), y + 6, 13, 7, 1.2, sd + Math.round(x * 3 + y)) + '" fill="none" stroke="' + M.tuongDaToi + '" stroke-width="2.2" opacity="0.7"/>';
    return s + "</g>";
  }
  /* Bãi đá đen ven biển. Gốc: trái, mép trên. w. o: { seed, cao (dày dải đá 220) } */
  function baiDa(w, o) {
    o = o || {};
    var sd = o.seed || 6001, r = rng(sd), cao = o.cao || 220, s = "<g>";
    s += paper(rough([[0, 10], [w * 0.25, -6], [w * 0.5, 6], [w * 0.75, -4], [w, 8], [w, cao + 400], [0, cao + 400]], 4, sd, 30), M.da, { shadow: false, half: 0.12 });
    for (var k = 0; k < Math.round(w / 34); k++) {
      var x = r() * w, y = 10 + r() * cao, rx = 24 + r() * 44;
      s += paper(rEll(x, y, rx, rx * (0.45 + r() * 0.2), 3, sd + 10 + k), r() < 0.5 ? M.daSang : "#4A4542", { stroke: true, sw: 3, sx: 3, sy: 5 });
    }
    return s + "</g>";
  }
  /* Rong biển (dải nâu ô liu). Gốc: chân. */
  function rong(sd) {
    var r = rng(sd || 6101), s = "<g>";
    for (var k = 0; k < 4; k++) { var a = (k - 1.5) * 18 + (r() - 0.5) * 10, L = 50 + r() * 40; s += line("M 0 0 C " + f1(a * 0.5) + " " + f1(-L * 0.4) + " " + f1(a * 1.4) + " " + f1(-L * 0.6) + " " + f1(a) + " " + f1(-L), 8, "#5F5A2A") + line("M 0 0 C " + f1(a * 0.5) + " " + f1(-L * 0.4) + " " + f1(a * 1.4) + " " + f1(-L * 0.6) + " " + f1(a) + " " + f1(-L), 3, "#87803E"); }
    return s + "</g>";
  }

  /* ---------- đồ vật ---------- */
  /* Củ khoai tây. Gốc: tâm. r. */
  function khoai(r, sd) {
    r = r || 22;
    var s = "<g>" + paper(rEll(0, 0, r, r * 0.74, 2, sd || 6201), "#C9A267", { stroke: true, sw: Math.max(2.5, r * 0.16), sx: 2, sy: 3 });
    s += '<circle cx="' + f1(-r * 0.3) + '" cy="' + f1(-r * 0.15) + '" r="' + f1(r * 0.09) + '" fill="#8C6A3E"/><circle cx="' + f1(r * 0.35) + '" cy="' + f1(r * 0.2) + '" r="' + f1(r * 0.08) + '" fill="#8C6A3E"/><circle cx="' + f1(r * 0.05) + '" cy="' + f1(r * 0.3) + '" r="' + f1(r * 0.07) + '" fill="#8C6A3E"/>';
    return s + "</g>";
  }
  /* Gậy gỗ (cầm tay). Gốc: chỗ cầm; gậy chĩa xuống (+y) dài len, ngọn trên ngắn. */
  function gay(len) { len = len || 260; return "<g>" + line("M 0 -40 L 4 " + len, 12, INK) + line("M 0 -40 L 4 " + len, 7, "#9C7A4E") + "</g>"; }
  /* Chĩa xới đất (cao gấp đôi Wob). Gốc: chỗ cầm; cán chĩa lên (-y) tới -cao*0.3 và xuống tới răng chĩa ở +cao*0.7. */
  function chia(cao) {
    cao = cao || 600;
    var y1 = cao * 0.7, s = "<g>" + line("M 0 " + f1(-cao * 0.3) + " L 0 " + f1(y1 - 60), 16, INK) + line("M 0 " + f1(-cao * 0.3) + " L 0 " + f1(y1 - 60), 10, "#B08A5E");
    s += line("M -22 " + f1(-cao * 0.3) + " L 22 " + f1(-cao * 0.3), 12, INK) + line("M -22 " + f1(-cao * 0.3) + " L 22 " + f1(-cao * 0.3), 6, "#8A6440");
    s += line("M -34 " + f1(y1 - 60) + " L 34 " + f1(y1 - 60), 9, "#7E878A") + line("M -30 " + f1(y1 - 60) + " L -32 " + f1(y1) + " M -10 " + f1(y1 - 60) + " L -11 " + f1(y1 + 4) + " M 10 " + f1(y1 - 60) + " L 11 " + f1(y1 + 4) + " M 30 " + f1(y1 - 60) + " L 32 " + f1(y1), 7, "#7E878A");
    return s + "</g>";
  }
  /* Máng gỗ đầy khoai to. Gốc: giữa chân. w. */
  function mang(w, sd) {
    w = w || 360; sd = sd || 6301;
    var r = rng(sd), s = "<g>", n = Math.round(w / 44);
    for (var k = 0; k < n * 2; k++) s += at(-w / 2 + 30 + r() * (w - 60), -96 - r() * 40, khoai(26 + r() * 10, sd + k));
    s += paper("M " + f1(-w / 2) + " -100 L " + f1(w / 2) + " -100 L " + f1(w / 2 - 20) + " -20 L " + f1(-w / 2 + 20) + " -20 Z", M.go, { stroke: true, sw: 5, sx: 5, sy: 6 });
    s += line("M " + f1(-w / 2 + 10) + " -60 L " + f1(w / 2 - 10) + " -60", 3, M.goToi) + line("M " + f1(-w / 2 + 30) + " -20 L " + f1(-w / 2 + 24) + " 0 M " + f1(w / 2 - 30) + " -20 L " + f1(w / 2 - 24) + " 0", 10, M.goToi);
    return s + "</g>";
  }
  /* Bảng kẹp giấy có ba ô hình (khoai, tôm hùm, bò; không chữ). Gốc: tâm. id-v0..2: dấu gạch/đánh dấu từng ô (ẩn sẵn). */
  function bangKep(id, o) {
    o = o || {};
    var s = '<g id="' + id + '">' + paper(rRect(-90, -120, 180, 240, 2, 6401), "#A8794C", { stroke: true, sw: 5, sx: 5, sy: 7 });
    s += paper(rRect(-74, -100, 148, 206, 1.5, 6402), "#FBF5E6", { stroke: true, sw: 3.5, shadow: false });
    s += paper(rRect(-40, -134, 80, 32, 1.5, 6403), "#9AA4A6", { stroke: true, sw: 4, shadow: false });
    for (var i = 0; i < 3; i++) {
      var y = -76 + i * 62;
      s += '<rect x="-58" y="' + (y - 20) + '" width="40" height="40" fill="none" stroke="' + INK + '" stroke-width="4"/>';
      var ic = i === 0 ? khoai(16, 6410) : i === 1 ? tomHum(0.32) : boNho(0.3);
      s += at(24, y, ic);
      s += '<g id="' + id + "-v" + i + '" opacity="0">' + line("M -54 " + (y - 2) + " L -40 " + (y + 14) + " L -12 " + (y - 26), 7, "#C9463A") + "</g>";
    }
    return s + "</g>";
  }
  /* Tôm hùm nhỏ vẽ phác (biểu tượng). Gốc: tâm. s: cỡ. */
  function tomHum(s) {
    s = s || 1;
    var t = '<g transform="scale(' + s + ')">' + paper("M -70 0 C -50 -26 40 -26 70 0 C 40 26 -50 26 -70 0 Z", "#C2563A", { stroke: true, sw: 6, shadow: false });
    t += line("M 60 -6 C 100 -40 130 -40 150 -70 M 60 6 C 100 40 130 40 150 70", 6, "#C2563A") + line("M -70 0 L -110 -20 L -110 20 Z", 6, "#C2563A");
    t += line("M -30 -18 L -30 18 M 0 -20 L 0 20 M 30 -18 L 30 18", 4, "#7E2E1E");
    return t + "</g>";
  }
  function boNho(s) {
    s = s || 1;
    return '<g transform="scale(' + s + ')">' + paper(rRect(-70, -40, 140, 70, 4, 6420), "#3B3532", { stroke: true, sw: 6, shadow: false }) + paper(rEll(-20, -10, 24, 16, 2, 6421), "#F2EDE2", { shadow: false }) +
      paper(rEll(84, -40, 28, 22, 2, 6422), "#3B3532", { stroke: true, sw: 6, shadow: false }) + line("M -50 30 L -50 70 M 50 30 L 50 70", 10) + "</g>";
  }
  /* Đồng hồ treo vách (KHÔNG chữ, KHÔNG số). Gốc: tâm. id-kimP, id-kimG xoay quanh tâm. */
  function dongHoTreo(id, r) {
    r = r || 90;
    var s = '<g id="' + id + '">' + paper(rEll(0, 0, r + 14, r + 14, 1.5, 6501), "#6E5A44", { stroke: true, sw: 5 }) + '<circle cx="0" cy="0" r="' + r + '" fill="#FBF5E6" stroke="' + INK + '" stroke-width="4"/>';
    for (var k = 0; k < 12; k++) { var a = k * Math.PI / 6, L = k % 3 === 0 ? 18 : 9; s += line("M " + f1(Math.sin(a) * (r - 8)) + " " + f1(-Math.cos(a) * (r - 8)) + " L " + f1(Math.sin(a) * (r - 8 - L)) + " " + f1(-Math.cos(a) * (r - 8 - L)), k % 3 === 0 ? 6 : 3.5); }
    s += '<g id="' + id + '-kimG">' + line("M 0 8 L 0 " + f1(-r * 0.5), 9) + "</g>" + '<g id="' + id + '-kimP">' + line("M 0 10 L 0 " + f1(-r * 0.8), 5) + "</g>";
    return s + '<circle cx="0" cy="0" r="8" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/></g>';
  }
  /* Mặt trời giấy nhỏ (nhãn dán). Gốc: tâm. */
  function matTroi(r) {
    r = r || 22;
    var s = "<g>";
    for (var k = 0; k < 8; k++) { var a = k * Math.PI / 4; s += line("M " + f1(Math.cos(a) * r * 1.15) + " " + f1(Math.sin(a) * r * 1.15) + " L " + f1(Math.cos(a) * r * 1.6) + " " + f1(Math.sin(a) * r * 1.6), r * 0.22, "#E0A030"); }
    return s + paper(rEll(0, 0, r, r, 1, 6601), "#F2C14E", { stroke: true, sw: 3.5, sx: 2, sy: 3 }) + "</g>";
  }
  /* Chim biển giấy (hải âu). Gốc: tâm thân. id-cL / id-cR cánh (xoay quanh vai). */
  function chim(id, o) {
    o = o || {};
    var c = o.mau || "#F4F2EC", ink = o.ink || INK, s = '<g id="' + id + '">';
    s += '<g id="' + id + '-cL">' + paper("M 0 0 C -30 -40 -70 -50 -110 -30 C -70 -26 -40 -10 0 6 Z", c, { stroke: true, sw: 4, shadow: false }).replace(/#1f2326/g, ink) + "</g>";
    s += paper(rEll(0, 4, 40, 14, 1, 6701), c, { stroke: true, sw: 4, shadow: false }).replace(/#1f2326/g, ink) + '<path d="M 38 0 L 58 6 L 38 10 Z" fill="#E0A030" stroke="' + ink + '" stroke-width="2.5"/><circle cx="26" cy="0" r="3" fill="' + ink + '"/>';
    s += '<g id="' + id + '-cR">' + paper("M 0 0 C 20 -44 60 -58 100 -44 C 64 -34 36 -16 6 6 Z", c, { stroke: true, sw: 4, shadow: false }).replace(/#1f2326/g, ink) + "</g>";
    return s + "</g>";
  }
  /* Trang giấy cũ (sepia) có mép xé, viền nâu, vết ố. Gốc: góc trên trái. w, h. */
  function trangCu(w, h, sd) {
    sd = sd || 6801;
    var r = rng(sd), s = "<g>" + paper(rRect(0, 0, w, h, 5, sd), "url(#tdSep)", { stroke: false, sx: 12, sy: 16, shOp: 0.3 });
    s += '<path d="' + rRect(0, 0, w, h, 5, sd) + '" fill="url(#tdSepVi)"/>';
    for (var k = 0; k < 5; k++) s += '<path d="' + rEll(r() * w, r() * h, 40 + r() * 70, 30 + r() * 50, 6, sd + 10 + k) + '" fill="#B08A5A" opacity="' + f1(0.06 + r() * 0.06) + '"/>';
    s += '<path d="' + rRect(18, 18, w - 36, h - 36, 2, sd + 30) + '" fill="none" stroke="' + M.S.nau + '" stroke-width="4" opacity="0.6"/>';
    s += '<path d="' + rRect(0, 0, w, h, 5, sd) + '" fill="none" stroke="' + M.S.muc + '" stroke-width="5"/>';
    return s + "</g>";
  }
  /* Người que giấy (dạng chung, nhỏ, không mặt chi tiết) theo bảng màu giấy cũ. o: như NhietDoi.nguoi, thêm { sep (true), linh (mũ cao lính), lat } */
  function nguoiCu(id, o) {
    o = o || {};
    var S = M.S, oo = { ao: o.ao || (o.linh ? "#9A5A44" : S.nauNhat), quan: o.quan || (o.linh ? "#6E6656" : S.nau), da: o.da || "#D7B88A", nho: o.nho, sau: o.sau, ngoi: o.ngoi };
    var s = ND.nguoi(id, oo).replace(/#1f2326/g, S.muc).replace(/#2E2622/g, "#6E5236");
    if (o.linh) {
      var k = o.nho ? 0.66 : 1, top = -268 * k - 44 * k - 40 * k;
      s = s.replace(/<\/g><\/g><\/g>$/, paper("M " + f1(-30 * k) + " " + f1(-24 * k) + " L " + f1(-26 * k) + " " + f1(-92 * k) + " L " + f1(28 * k) + " " + f1(-92 * k) + " L " + f1(30 * k) + " " + f1(-24 * k) + " Z", "#4E3E30", { stroke: true, sw: 3, shadow: false }).replace(/#1f2326/g, S.muc) + "</g></g></g>");
    }
    return o.lat === -1 ? '<g transform="scale(-1,1)">' + s + "</g>" : s;
  }
  /* Thẻ chữ (chữ phải nằm trong chu_tren_do_vat). Bọc NhietDoi.theChu. */
  function the(id, chu, co, o) { return ND.theChu(id, chu, co, o); }
  /* Mũ hai sừng đen phác (KHÔNG mặt, không người). Gốc: giữa vành dưới. w. */
  function muHaiSung(w) {
    w = w || 200;
    var k = w / 200;
    return '<g transform="scale(' + f1(k) + ')">' + paper("M -100 0 C -80 -30 -50 -78 0 -84 C 50 -78 80 -30 100 0 C 60 -14 -60 -14 -100 0 Z", "#23272A", { stroke: true, sw: 5, sx: 5, sy: 7 }) +
      line("M -84 -10 C -40 -26 40 -26 84 -10", 3, "#5E676B", ' opacity="0.7"') + '<circle cx="0" cy="-52" r="12" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/><circle cx="0" cy="-52" r="5" fill="#2F4A6B"/></g>';
  }
  /* Cuộn chỉ xanh đậm. Gốc: tâm. */
  function cuonChi(r) {
    r = r || 26;
    return "<g>" + paper(rRect(-r, -r * 1.2, r * 2, r * 2.4, 1, 6901), "#C9A87A", { stroke: true, sw: 3.5, sx: 2, sy: 3 }) + paper(rRect(-r * 0.8, -r * 0.95, r * 1.6, r * 1.9, 1, 6902), M.chi, { stroke: true, sw: 3, shadow: false }) +
      line("M " + f1(-r * 0.7) + " " + f1(-r * 0.6) + " L " + f1(r * 0.7) + " " + f1(-r * 0.4) + " M " + f1(-r * 0.7) + " 0 L " + f1(r * 0.7) + " " + f1(r * 0.2) + " M " + f1(-r * 0.7) + " " + f1(r * 0.6) + " L " + f1(r * 0.7) + " " + f1(r * 0.8), 2, "#4F6E92") + "</g>";
  }

  /* Camera cho nhóm tuỳ ý (như api.camera nhưng chọn selector): nhom [[sel, p]], keys [[t, cx, cy, zoom, ease]]. */
  function camNhom(api, nhom, keys) {
    nhom.forEach(function (n) { api.origin(n[0], "0 0"); });
    keys.forEach(function (k) {
      var t = k[0], cx = k[1], cy = k[2], z = k[3], e = k[4] || "power2.inOut";
      nhom.forEach(function (n) {
        var p = n[1], zl = 1 + (z - 1) * p, clx = 960 + (cx - 960) * p, cly = 540 + (cy - 540) * p;
        api.key(n[0], "x", t, 960 - zl * clx, e); api.key(n[0], "y", t, 540 - zl * cly, e); api.key(n[0], "scale", t, zl, e);
      });
    });
  }
  /* Hiện nhóm trong [t0, t1) (cắt cứng). */
  function cat(api, sel, t0, t1) { api.show(sel, 0, t0 <= 0 ? 1 : 0); if (t0 > 0) api.show(sel, t0, 1); if (t1 != null) api.show(sel, t1, 0); }
  /* Vật bay theo cung từ (x0,y0) tới (x1,y1) trong [t0,t1], cao h; nhóm sel đặt sẵn origin "0 0". */
  function bayCung(api, sel, t0, t1, x0, y0, x1, y1, h, o) {
    o = o || {};
    var n = 6;
    api.key(sel, "x", 0, x0, "step"); api.key(sel, "y", 0, y0, "step");
    api.key(sel, "x", t0, x0, "none"); api.key(sel, "y", t0, y0, "none");
    for (var i = 1; i <= n; i++) {
      var u = i / n, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u - 4 * h * u * (1 - u);
      api.key(sel, "x", t0 + (t1 - t0) * u, x, "none"); api.key(sel, "y", t0 + (t1 - t0) * u, y, "none");
    }
    if (o.xoay) { api.key(sel, "rotation", t0, 0, "none"); api.key(sel, "rotation", t1, o.xoay, "none"); }
  }

  return { M: M, at: at, g: g, ss: ss, ss5: ss5, defs: defs, wob: wob, wobLung: wobLung, baLoNho: baLoNho, bien: bien, may: may, nui: nui, tauCa: tauCa, thung: thung, thangDay: thangDay,
    tauBuom: tauBuom, thuyenCon: thuyenCon, nhaDa: nhaDa, bo: bo, tuongDa: tuongDa, baiDa: baiDa, rong: rong, khoai: khoai, gay: gay, chia: chia, mang: mang, bangKep: bangKep,
    tomHum: tomHum, boNho: boNho, dongHoTreo: dongHoTreo, matTroi: matTroi, chim: chim, trangCu: trangCu, nguoiCu: nguoiCu, the: the, muHaiSung: muHaiSung, cuonChi: cuonChi,
    camNhom: camNhom, cat: cat, bayCung: bayCung };
})();

/* Đoạn d15 · cắt giấy · Wob đi dọc bờ đá đen cầm gậy chọc khe đá, lật rong tìm xác tàu "đã khởi đầu mọi chuyện"; bới ra một củ khoai,
   giơ ngang mắt nhìn rất lâu rồi áp vào tai như nghe biển trong vỏ ốc. Xa ngoài khơi một mảnh ván trôi ngang; Wob cất củ khoai vào túi
   hông ba lô, vỗ nhẹ. "The real beginning came from much further north": Wob quay nhìn lên phía bắc, camera lướt theo ánh nhìn tới
   đường chân trời trống, giữ. Vào "cat" (từ d14 vẽ tay), ra "cat" (sang d16 cắt giấy trang nhật ký). Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = TD.at, M = TD.M;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tFound = T("found", 0, 4.11), tPot = T("potato.", 0, 4.46), tShip = T("shipwrecks", 0, 5.36), tLater = T("later.", 0, 7.34), tDid = T("didn't", 0, 8.2),
    tReal = T("real", 0, 9.46), tNorth = T("north.", 0, 11.18), tWreck = T("wreck", 0, 2.42);

  // ---------- XA (p 0.3): biển xám tới chân trời, núi lửa bên trái, ván trôi ----------
  var xa = TD.bien(api, "bX", { x0: -1400, x1: 4200, y: 560, n: 4, day: 50, cao: 1400, bien: 16 });
  xa += at(-120, 600, TD.nui({ w: 1700, h: 900, seed: 1501 }));
  xa += at(400, -280, TD.may(460, { seed: 1502, mau: "#E4E7E2" })) + at(1300, 160, TD.may(380, { seed: 1503, mau: "#E4E7E2" })) + at(2300, 120, TD.may(520, { seed: 1504, mau: "#E4E7E2" }));
  xa += '<g id="van"><g id="vanIn">' + D.paper(D.rRect(-70, -12, 140, 22, 1.5, 1505), "#8A6A48", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + D.line("M -60 0 L 60 -2", 2, M.goToi, ' opacity="0.6"') + "</g></g>";

  // ---------- GIỮA (p 0.65): dải đá ven bờ xa ----------
  var gi = at(-1200, 790, TD.baiDa(5200, { seed: 1511, cao: 120 }));
  gi += D.line("M -1200 786 C -400 774 600 794 1600 780 C 2600 768 3400 790 4200 778", 6, "#E6EBE8", ' opacity="0.8"');

  // ---------- GẦN (p 1): lối đá Wob đi, khe đá, rong ----------
  var gan = at(-800, 900, TD.baiDa(4600, { seed: 1521, cao: 300 }));
  [[780, 972], [1120, 978], [1290, 968]].forEach(function (p, j) { gan += '<path d="' + D.rEll(p[0], p[1], 46, 14, 1.5, 1530 + j) + '" fill="#141618" stroke="' + D.INK + '" stroke-width="3"/>'; });
  gan += '<g id="rg">' + at(940, 985, TD.rong(1541)) + "</g>";
  [[420, 990], [1500, 992], [2100, 996], [2700, 990]].forEach(function (p, j) { gan += at(p[0], p[1], TD.rong(1550 + j)); });
  gan += '<g id="hoKh"><path d="' + D.rEll(1290, 968, 46, 14, 1.5, 1532) + '" fill="#141618"/></g>';
  // củ khoai to, nâu sẫm, viền mực, chấm mắt khoai (đọc được ở trung cảnh)
  function khoaiTo(r) {
    var s = "<g>" + D.paper(D.rEll(0, 0, r, r * 0.76, 2.5, 1561), "#7A5232", { stroke: true, sw: Math.max(3, r * 0.11), sx: 3, sy: 4 });
    [[-0.38, -0.2, 0.1], [0.34, 0.16, 0.09], [0.02, 0.36, 0.08], [0.46, -0.28, 0.07], [-0.2, 0.3, 0.07]].forEach(function (e) { s += '<circle cx="' + (e[0] * r).toFixed(1) + '" cy="' + (e[1] * r).toFixed(1) + '" r="' + (e[2] * r).toFixed(1) + '" fill="#3A2614"/>'; });
    s += D.line("M " + (-r * 0.55).toFixed(1) + " " + (-r * 0.38).toFixed(1) + " C " + (-r * 0.3).toFixed(1) + " " + (-r * 0.62).toFixed(1) + " " + (r * 0.1).toFixed(1) + " " + (-r * 0.66).toFixed(1) + " " + (r * 0.32).toFixed(1) + " " + (-r * 0.56).toFixed(1), Math.max(2, r * 0.07), "#B08458", ' opacity="0.8"');
    return s + "</g>";
  }
  gan += '<g id="khDat">' + at(1290, 950, khoaiTo(36)) + "</g>";
  var W = TD.wob(api, "W", {
    muTrum: 0,
    holdL: '<g id="W-gay">' + TD.gay(250) + "</g>",
    holdR: '<g id="W-kh">' + at(0, -8, khoaiTo(78)) + "</g>",
    packExtra: '<g id="W-tui">' + at(398, 192, '<g transform="rotate(-12)">' + khoaiTo(44) + "</g>") + "</g>" +
      D.paper("M 346 212 L 444 206 L 446 278 C 430 300 364 302 348 280 Z", M.oliuToi, { stroke: true, sw: 5, sx: 3, sy: 4 }) + D.line("M 352 236 L 440 230", 3, M.oliu, ' stroke-dasharray="7 6"')
  });
  gan += W.svg;
  var truoc = TD.bien(api, "bT", { x0: -1400, x1: 4400, y: 1070, n: 2, day: 34, bien: 30, chuKy: 2.6, mau: ["#7A8B8F", "#63757A"] });

  api.dat(TD.defs() + '<rect x="0" y="0" width="1920" height="1080" fill="url(#tdTroiXam)"/>' +
    api.lop("xa", xa, 0.3, { mat: 600 }) + api.lop("giua", gi, 0.65, { mat: 790 }) + api.lop("gan", gan, 1, { mat: 960 }) + api.lop("truoc", truoc, 1.4, { mat: 1080 }));
  api.noi({});

  api.camera([[0, 600, 650, 1.32], [3.7, 1060, 650, 1.32, "sine.inOut"], [tFound + 0.15, 1220, 790, 1.85, "power2.inOut"], [6.0, 1226, 786, 1.88, "sine.inOut"],
    [6.6, 1250, 650, 1.32, "power2.inOut"], [tReal - 0.1, 1220, 610, 1.34, "sine.inOut"], [tNorth - 0.1, 2550, 520, 1.06, "power2.inOut"], [DUR, 2580, 516, 1.08, "sine.inOut"]]);

  // ---------- Wob ----------
  W.set(0, { x: 520, y: 962, size: 0.52, pupX: 4, pupY: 10, aLu: 34, aLf: 10 });
  api.show("#W-kh", 0, 0); api.show("#W-tui", 0, 0);
  api.origin("#W-gay", "0 0");
  W.walk(0.05, 0.85, 520, 700, { step: 0.28, arms: "R" });
  function choc(t, n) {
    W.pose(t, 0.15, { aLu: 40, aLf: 30, lean: 6, pupX: -4, pupY: 14 }, "power2.out");
    for (var i = 0; i < n; i++) { W.pose(t + 0.16 + i * 0.14, 0.07, { aLu: 46 }, "power2.in"); W.pose(t + 0.23 + i * 0.14, 0.07, { aLu: 38 }, "power2.out"); }
    W.pose(t + 0.2 + n * 0.14, 0.15, { aLu: 34, aLf: 10, lean: 0 }, "power2.inOut");
  }
  choc(0.9, 3);
  W.walk(1.45, 1.95, 700, 860, { step: 0.28, arms: "R" });
  // lật rong
  W.pose(2.0, 0.18, { aLu: 64, aLf: 40, lean: 8, pupX: 6, pupY: 14 }, "power2.out");
  W.pose(2.25, 0.2, { aLu: 20, aLf: 70 }, "power2.out");
  W.pose(2.55, 0.2, { aLu: 34, aLf: 10, lean: 0 }, "power2.inOut");
  api.origin("#rg", "940 985");
  api.key("#rg", "scaleY", 0, 1); api.key("#rg", "scaleY", 2.18, 1, "none"); api.key("#rg", "scaleY", 2.36, -0.7, "power2.out"); api.key("#rg", "scaleY", 2.62, 1, "back.out(2)");
  W.mouth(2.4, "flat");
  W.walk(2.65, 3.45, 860, 1180, { step: 0.28, arms: "R" });
  choc(3.5, 2);
  // bới ra củ khoai (tay phải), giơ ngang mắt
  api.origin("#khDat", "1290 950");
  api.key("#khDat", "y", 0, 26, "step"); api.key("#khDat", "y", 3.85, 26, "none"); api.key("#khDat", "y", 4.0, -24, "back.out(2)");
  api.show("#khDat", 0, 0); api.show("#khDat", 3.85, 1); api.show("#khDat", tFound + 0.05, 0); api.show("#W-kh", tFound + 0.05, 1);
  api.sfx("pop", 3.95, 0.5);
  W.soc(3.98, { mieng: "o" });
  W.pose(tFound - 0.12, 0.15, { aRu: -40, aRf: -30 }, "power2.out");
  W.pose(tFound + 0.1, 0.25, { aRu: -90, aRf: 0, pupX: 15, pupY: -2, eye: 1.1 }, "power2.out");
  W.mouth(tPot, "flat");
  W.blinkAt(tPot + 0.25);
  // ghé tai nghe như vỏ ốc, giữ 0,8 s
  var tTai = 4.9;
  W.pose(tTai, 0.3, { aRu: -128, aRf: -20, upRot: 10, pupX: 12, pupY: -4, eye: 1 }, "power2.inOut");
  W.lid(tTai + 0.25, 0.15, 0.85);
  W.mouth(tTai + 0.3, "smirk");
  W.lid(tTai + 1.05, 0.15, 0);
  // ván trôi, cất củ khoai vào túi hông, vỗ túi
  W.pose(6.0, 0.3, { upRot: 0, pupX: 14, pupY: -8 }, "power2.inOut");
  W.mouth(6.05, "o");
  var tCat = 6.95;
  W.pose(tCat - 0.35, 0.3, { aRu: -40, aRf: -20, pupX: 14, pupY: 10 }, "power2.inOut");
  api.show("#W-kh", tCat, 0); api.show("#W-tui", tCat, 1);
  api.origin("#W-tui", "398 192"); api.key("#W-tui", "y", 0, 0); api.key("#W-tui", "y", tCat, -30, "none"); api.key("#W-tui", "y", tCat + 0.2, 0, "power2.in");
  api.sfx("pop", tCat + 0.2, 0.3);
  for (var p = 0; p < 2; p++) { W.pose(tCat + 0.3 + p * 0.3, 0.12, { aRf: -6 }, "power2.in"); W.pose(tCat + 0.42 + p * 0.3, 0.12, { aRf: -22 }, "power2.out"); }
  W.mouth(tCat + 0.4, "grin");
  W.pose(tCat + 1.05, 0.3, { aRu: -18, aRf: 10, pupX: 8, pupY: -4 }, "power2.inOut");
  W.mouth(tDid, "flat");
  W.pose(tDid + 0.1, 0.2, { upRot: -4 }, "sine.inOut"); W.pose(tDid + 0.4, 0.2, { upRot: 4 }, "sine.inOut"); W.pose(tDid + 0.7, 0.2, { upRot: 0 }, "sine.inOut");
  // quay nhìn phía bắc
  W.pose(tReal - 0.2, 0.4, { pupX: 15, pupY: -12, lean: 6, upRot: -5 }, "power2.inOut");
  W.nhonChan(tReal + 0.3, DUR - tReal - 0.6, { lean: 7, nhin: [15, -12] });
  W.idle(tCat + 1.4, tDid, { seed: 151, bien: 0.6, liec: false });
  W.autoBlink(0, tTai, 152); W.autoBlink(tShip + 0.6, DUR, 153);

  // ván trôi xa
  api.origin("#van", "0 0"); api.origin("#vanIn", "0 0");
  api.key("#van", "x", 0, 1700, "step"); api.key("#van", "y", 0, 640, "step");
  api.key("#van", "x", tShip - 0.3, 1700, "none"); api.key("#van", "x", tReal, 1150, "sine.inOut");
  api.show("#van", 0, 0); api.show("#van", tShip - 0.3, 1); api.show("#van", tReal + 1.0, 0);
  api.key("#vanIn", "rotation", 0, 0);
  for (var tv = tShip, q = 0; tv < tReal + 1; tv += 0.7, q++) api.key("#vanIn", "rotation", tv, q % 2 ? 6 : -6, "sine.inOut");
  void tWreck;
};
