/* ---- Bộ dựng riêng tập 6 Kiruna, cắt giấy nhóm B (d22 d23 d25 d27 d28 d30 d34 d37 d39 d40 d41 d42).
   Nguồn chính: doan-d22/canh-rieng.js. ghep.sh chép nguyên vào đầu canh.js của từng đoạn (tao_sfx.mjs chỉ nạp canh.js).
   Không sửa lib chung (thợ nhóm A là người duy nhất sửa lib). Tất định: mọi nhiễu qua DaoCu.rng(seed). Không chạm document ngoài api.moiKhung.
   Khoá trang phục (phan-canh.json): MÙA ĐÔNG áo phao xanh lam #3D5A80 (chần #2B4262, khoá kéo kem #EFE3C8) dài tới hông, MỘT túi vá bên phải
   (nắp #2B4262); mũ len xanh lá thông #4F7A5A (vành #3A5C43, bông kem #F6EEDC); khăn kem #EFE3C8 sọc #4F7A5A; ba lô ô liu #7C8646 / #566030,
   cuộn thảm đỏ #C9463A. MÙA HÈ gi-lê kem #E9DDC3 (viền #B9A983) túi phải; kính râm tròn gọng đen; áo khoác xanh cuộn dưới cuộn thảm.
   Ở NHÀ không áo, không ba lô. Chìa Kiruna: sắt than #3A3F44, đầu tròn có lỗ, răng thô, thẻ gỗ #B98A5A dây đỏ #C9463A, vệt mực không chữ.
   Chùm chìa nhà: vòng bạc + chìa đồng #C9A24A, bạc #B8BDC2, đầu nhựa xanh #4F7A5A. Wob dựng từ WobRig (toạ độ gốc tao_wob.py), không lông mi. ---- */
var KR = (function () {
  "use strict";
  var D = window.DaoCu, ND = window.NhietDoi, INK = D.INK, paper = D.paper, rough = D.rough, rRect = D.rRect, rEll = D.rEll, line = D.line, f1 = D.f1, rng = D.rng;
  var M = {
    ao: "#3D5A80", aoToi: "#2B4262", aoSang: "#5E7BA0", kem: "#EFE3C8", mu: "#4F7A5A", muVanh: "#3A5C43", bong: "#F6EEDC",
    oliu: "#7C8646", oliuToi: "#566030", tham: "#C9463A",
    gile: "#E9DDC3", gileVien: "#B9A983", kinh: "#1F2326",
    chia: "#3A3F44", chiaSang: "#6C737A", theGo: "#B98A5A", theGoToi: "#8A6440", day: "#C9463A",
    dong: "#C9A24A", bac: "#B8BDC2", nhua: "#4F7A5A",
    nhaTho: "#A8322A", nhaThoToi: "#7E2620", maiTho: "#4A2B27", maiThoSang: "#62403A",
    co: "#86A95C", coToi: "#6A8B47", coSang: "#A6C47A", da: "#8E9497", daToi: "#6F7578", daSang: "#B4B8B6",
    tuyet: "#F4F8F9", tuyetBong: "#D2E1E8", go: "#8A6440", goToi: "#5E4228", goSang: "#B08A5E",
    nha: ["#B4443A", "#C98A3A", "#3F6E9A", "#E1CFA3", "#5E8E8A", "#9C5A3C"], mai: ["#3B3735", "#5A4636", "#2F4A6B"],
    da1: "#DDBB94", da2: "#B98563", da3: "#8E5E42",
    ao1: ["#5C6F8A", "#8E5A4A", "#6A7F5A", "#B07A3A", "#4E5A66", "#9A6A7A", "#C2A27A", "#556B6E"],
    T: { trang: "#E4DACA", trangToi: "#CFC3AE", muc: "#4A4036", nau: "#7A6A58", ban: "#5E4330", banToi: "#46301F", banSang: "#7A583D", xam: "#A39C90", xanh: "#7E9AA0", co: "#8E9A78" }
  };
  function at(x, y, s, sc, rot) {
    return '<g transform="translate(' + f1(x) + "," + f1(y) + ")" + (rot ? " rotate(" + f1(rot) + ")" : "") + (sc != null && sc !== 1 ? " scale(" + sc + ")" : "") + '">' + s + "</g>";
  }
  function g(id, s, tr) { return "<g" + (id ? ' id="' + id + '"' : "") + (tr ? ' transform="' + tr + '"' : "") + ">" + s + "</g>"; }
  function ss(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
  function ss5(u) { u = Math.max(0, Math.min(1, u)); return u * u * u * (u * (6 * u - 15) + 10); }

  function defs() {
    return "<defs>" +
      '<linearGradient id="krHe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8DB8D2"/><stop offset="0.6" stop-color="#C9E0E6"/><stop offset="1" stop-color="#F1EBD4"/></linearGradient>' +
      '<linearGradient id="krChieu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FB6C8"/><stop offset="0.55" stop-color="#E8D2AE"/><stop offset="1" stop-color="#F2C98E"/></linearGradient>' +
      '<linearGradient id="krDong" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9DB3C4"/><stop offset="0.6" stop-color="#D3DEE3"/><stop offset="1" stop-color="#EEE9DC"/></linearGradient>' +
      '<linearGradient id="krDongToi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E7590"/><stop offset="0.55" stop-color="#9FB0C2"/><stop offset="1" stop-color="#E7C6A0"/></linearGradient>' +
      '<linearGradient id="krTram" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B7BCBA"/><stop offset="1" stop-color="#DCD8CC"/></linearGradient>' +
      '<linearGradient id="krDem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F2E48"/><stop offset="1" stop-color="#40567A"/></linearGradient>' +
      '<linearGradient id="krNuaDem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9B97A"/><stop offset="0.6" stop-color="#F6D9A0"/><stop offset="1" stop-color="#FBEAC4"/></linearGradient>' +
      '<linearGradient id="krKinh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#CFE3EA"/><stop offset="0.5" stop-color="#8FB4C4"/><stop offset="1" stop-color="#5E8597"/></linearGradient>' +
      '<radialGradient id="krDen" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFD68A" stop-opacity="0.5"/><stop offset="0.6" stop-color="#FFB86A" stop-opacity="0.14"/><stop offset="1" stop-color="#FFB86A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="krToi" cx="0.5" cy="0.45" r="0.7"><stop offset="0.55" stop-color="#140E08" stop-opacity="0"/><stop offset="1" stop-color="#140E08" stop-opacity="0.55"/></radialGradient>' +
      '<radialGradient id="krNang" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFF4C8" stop-opacity="0.9"/><stop offset="1" stop-color="#FFE6A0" stop-opacity="0"/></radialGradient>' +
      '<pattern id="krSoc" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width="26" height="26" fill="#C9463A" opacity="0"/><rect x="0" y="0" width="11" height="26" fill="#C9463A" opacity="0.55"/></pattern>' +
      '<pattern id="krGo" width="140" height="40" patternUnits="userSpaceOnUse"><rect width="140" height="40" fill="#5E4330"/><path d="M 0 14 C 40 8 80 20 140 12 M 0 32 C 50 26 90 38 140 30" fill="none" stroke="#46301F" stroke-width="3" opacity="0.6"/></pattern>' +
      "</defs>";
  }

  /* ---------- nội suy khoá (để đồ treo tay luôn thõng xuống) ---------- */
  function giaTri(K, sel, prop, t) {
    var tr = K.m[sel + "|" + prop];
    if (!tr) return prop === "scale" || prop === "scaleX" || prop === "scaleY" || prop === "opacity" ? 1 : 0;
    var ks = tr.k.slice().sort(function (a, b) { return a.t - b.t || a.i - b.i; }), a = ks[0];
    if (t <= a.t) return a.v;
    for (var i = 1; i < ks.length; i++) {
      var b = ks[i];
      if (t < b.t) {
        if (b.e === "step") return a.v;
        var u = (t - a.t) / Math.max(1e-6, b.t - a.t);
        return a.v + (b.v - a.v) * ss(u);
      }
      a = b;
    }
    return a.v;
  }
  /* sel: nhóm đồ cầm trong bàn tay side; xoay ngược để đồ luôn thẳng đứng (thõng) trong [t0, t1], bước 1/15 s, lắc nhẹ theo đà */
  function thong(api, W, side, sel, t0, t1, o) {
    o = o || {};
    var K = api.K, id = "#" + W.id, dt = 1 / 15, prev = null, sw = 0, v = 0;
    api.origin(sel, "0 0");
    var gocF = typeof o.goc === "function" ? o.goc : function () { return o.goc || 0; };
    for (var t = t0; t <= t1 + 1e-6; t += dt) {
      var ang = giaTri(K, id + "-a" + side + "u", "rotation", t) + giaTri(K, id + "-a" + side + "f", "rotation", t) +
        giaTri(K, id + "-up", "rotation", t) + giaTri(K, id + "-sq", "rotation", t);
      if (prev != null) { var acc = ang - prev; v += -acc * 0.35 - sw * 0.25; v *= 0.8; sw += v; }
      prev = ang;
      api.key(sel, "rotation", t, -ang + gocF(t) + sw * (o.lac == null ? 1 : o.lac), "none");
    }
  }

  /* ---------- chìa khoá ---------- */
  /* Chìa Kiruna: gốc ở tâm lỗ đầu chìa, thân thõng xuống (+y). Dài ≈ 120 ở s = 1. o.the (true): thẻ gỗ dây đỏ. id+"-loe": ngôi sao loé (ẩn). */
  /* Chìa Kiruna: uỷ cho XuLanh.chiaKhoa (bộ chung nhóm A) để khớp hình giữa các đoạn; giữ nhóm id-loe (lấp lánh). */
  function chiaKiruna(id, s, o) {
    o = o || {};
    var str = '<g' + (id ? ' id="' + id + '"' : "") + (s && s !== 1 ? ' transform="scale(' + s + ')"' : "") + ">";
    str += window.XuLanh.chiaKhoa("", { the: o.the !== false });
    str += '<g id="' + (id || "k") + '-loe" opacity="0"><g transform="translate(20,100)">' + D.sparkle(26, "#FFF6C8") + "</g></g>";
    return str + "</g>";
  }
  function chiaNho(mau, kieu) {
    var s = "";
    if (kieu === "nhua") s += paper(rRect(-16, -2, 32, 30, 3, 8811), mau, { stroke: true, sw: 3.5, shadow: false });
    else s += '<path d="M -15 10 A 15 15 0 1 0 15 10 A 15 15 0 1 0 -15 10 Z M -5 6 A 5 5 0 1 1 5 6 A 5 5 0 1 1 -5 6 Z" fill="' + mau + '" fill-rule="evenodd" stroke="' + INK + '" stroke-width="3.5"/>';
    s += paper("M -5 26 L 5 26 L 5 84 L -5 84 Z", kieu === "nhua" ? M.bac : mau, { stroke: true, sw: 3, shadow: false });
    s += paper("M 5 62 L 15 62 L 15 70 L 10 70 L 10 76 L 15 76 L 15 84 L 5 84 Z", kieu === "nhua" ? M.bac : mau, { stroke: true, sw: 2.5, shadow: false });
    return s;
  }
  /* Chùm chìa nhà: gốc ở đỉnh vòng (chỗ móc/cầm). Vòng bạc r 24 + ba chìa (đồng, bạc, đầu nhựa xanh). o.kr: thêm chìa Kiruna (nhóm id-kr, bật/tắt). */
  /* Chùm chìa nhà: uỷ cho XuLanh.chumChia; nhóm chìa Kiruna đổi tên thành id-kr. */
  function chumChia(id, o) {
    o = o || {};
    return '<g id="' + id + '">' + window.XuLanh.chumChia(id + "-x", { kiruna: !!o.kr }).replace('id="' + id + '-x-kir"', 'id="' + id + '-kr"') + "</g>";
  }
  /* ---------- Wob ---------- */
  function sleeves(svg, mau) {
    return svg.replace(/<path d="M 0 0 L 0 (48|46)"([^>]*?)stroke="#1f2326"([^>]*?)stroke-width="13"([^>]*?)\/>/g, function (m, n, a, b, c) {
      return '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="#1f2326"' + b + 'stroke-width="25"' + c + "/>" +
        '<path d="M 0 0 L 0 ' + n + '"' + a + 'stroke="' + mau + '"' + b + 'stroke-width="15"' + c + "/>";
    });
  }
  /* o: như api.wob (holdL, holdR, phuKien…), thêm
     { mua: "dong" | "he" | "nha", khongMu (đông, bỏ mũ), tuiThe (đông/hè: thẻ gỗ thò khỏi túi, 1/0 lúc đầu), kinh (hè: đeo kính râm, mặc định 1),
       chum (chùm chìa móc quai ba lô: 0 không, 1 có, "kr" có cả chìa Kiruna) }
     Nhóm: id-tui (túi), id-tuiThe (thẻ gỗ thò ra), id-kinh (kính râm), id-kinhLoe (loé trên kính), id-chumQ (chùm chìa trên quai), id-chumQ-kr,
     id-pack / id-quai (ba lô, quai), id-mohoi (giọt mồ hôi). */
  /* Wob của tập: uỷ cho XuLanh.wob (trang phục chung hai nhóm thợ). mua: "dong" áo phao | "he" gi-lê + kính + áo cuộn | "nha" không đồ, không ba lô.
     tuiThe: thẻ gỗ thò túi; kinh: 0 tắt kính (mùa hè); chum: 1 chùm chìa nhà ở quai | "kr" có cả chìa Kiruna. Thêm id-mohoi, id-kinhLoe. */
  function wob(api, id, o) {
    o = o || {};
    var XL = window.XuLanh, mua = o.mua || "dong", oo = {};
    Object.keys(o).forEach(function (k) { if (["mua", "tuiThe", "kinh", "chum", "phuKien"].indexOf(k) < 0) oo[k] = o[k]; });
    if (mua === "he") { oo.ao = "gile"; oo.kinh = o.kinh === 0 ? 0 : 1; oo.aoCuon = 1; }
    else if (mua === "nha") { oo.ao = null; oo.noPack = true; }
    if (o.tuiThe) oo.the = 1;
    if (o.chum) oo.chum = o.chum === "kr" ? true : "nha";
    var them = '<g id="' + id + '-mohoi" opacity="0">' + [[96, 92], [312, 104], [90, 128]].map(function (p) { return at(p[0], p[1], '<path d="M 0 0 C -6 9 -7 16 0 19 C 7 16 6 9 0 0 Z" fill="#CFE6EE" stroke="' + INK + '" stroke-width="2.5"/>'); }).join("") + "</g>";
    them += '<g id="' + id + '-kinhLoe" opacity="0"><g transform="translate(250,142)">' + D.sparkle(30, "#FFF6C8") + "</g></g>";
    oo.phuKien = (o.phuKien || "") + them;
    var W = XL.wob(api, id, oo);
    api.show("#" + id + "-mohoi", 0, 0); api.show("#" + id + "-kinhLoe", 0, 0);
    W.kr = { tui: W.xl.tui, tuiThe: W.xl.the, kinh: W.xl.kinh, kinhLoe: "#" + id + "-kinhLoe", chumQ: W.xl.chum, chumKr: "#" + id + "-cc-kir", pack: W.xl.pack, quai: W.xl.quai, mohoi: "#" + id + "-mohoi" };
    return W;
  }
  /* ---------- người que giấy (dạng chung, KHÔNG mặt) ----------
     Gốc: giữa chân. o: { ao, mu (màu | false), da, ngoi (ngồi ghế gấp), co (cờ giấy trơn), coMau, binh (bình giữ nhiệt tay trái), nho, sau, s (cỡ) }
     Nhóm: id-tayR (gốc vai "22 -150" trong toạ độ người), id-tayL ("-22 -150"), id-dau ("0 -190"), id-co (cờ, trong tay phải). */
  function nguoi(id, o) {
    o = o || {};
    var k = o.nho ? 0.72 : 1, ao = o.ao || "#5C6F8A", da = o.da || M.da1, mu = o.mu, s = '<g id="' + id + '"' + (o.s && o.s !== 1 ? ' transform="scale(' + o.s + ')"' : "") + ">";
    var hip = (o.ngoi ? -96 : -70) * k, sh = -150 * k, hy = -196 * k;
    if (o.ngoi) {
      s += line("M -40 -80 L -52 0 M 34 -80 L 46 0 M -44 -86 L 40 -86", 7, "#6F7578") + line("M -40 -80 L -52 0 M 34 -80 L 46 0", 2, INK, ' opacity="0.5"');
      s += paper(rRect(-44, -96, 84, 14, 1, 8901), o.ghe || "#3F6E9A", { stroke: true, sw: 3, shadow: false });
      s += paper(rRect(-48, -190, 12, 96, 1, 8902), o.ghe || "#3F6E9A", { stroke: true, sw: 3, shadow: false });
      s += line("M -16 " + f1(hip) + " L 26 " + f1(hip) + " L 30 -4 M -2 " + f1(hip) + " L 42 " + f1(hip + 6) + " L 50 -4", 16 * k, INK) +
        line("M -16 " + f1(hip) + " L 26 " + f1(hip) + " L 30 -4 M -2 " + f1(hip) + " L 42 " + f1(hip + 6) + " L 50 -4", 10 * k, "#3E4650");
    } else {
      s += line("M -12 " + f1(hip) + " L -16 -4 M 12 " + f1(hip) + " L 16 -4", 16 * k, INK) + line("M -12 " + f1(hip) + " L -16 -4 M 12 " + f1(hip) + " L 16 -4", 10 * k, "#3E4650");
    }
    s += '<ellipse cx="-18" cy="-2" rx="14" ry="6" fill="#2E2A28"/><ellipse cx="' + (o.ngoi ? 34 : 18) + '" cy="-2" rx="14" ry="6" fill="#2E2A28"/>';
    var tay = function (side) {
      var hold = "";
      if (side > 0 && o.co) hold = '<g id="' + id + '-co">' + line("M 0 6 L 0 -96", 4, "#7A5236") + paper("M 0 -96 L 58 -84 L 0 -64 Z", o.coMau || "#F3E6C8", { stroke: true, sw: 3, shadow: false }) + "</g>";
      if (side < 0 && o.binh) hold = paper(rRect(-9, -8, 18, 44, 2, 8905), o.binh === true ? "#B8BDC2" : o.binh, { stroke: true, sw: 3, shadow: false });
      return '<g transform="translate(' + f1(side * 22 * k) + "," + f1(sh) + ')"><g id="' + id + "-tay" + (side < 0 ? "L" : "R") + '">' +
        line("M 0 0 L " + f1(side * 10 * k) + " " + f1(70 * k), 14 * k, INK) + line("M 0 0 L " + f1(side * 10 * k) + " " + f1(70 * k), 8 * k, ao) +
        '<g transform="translate(' + f1(side * 10 * k) + "," + f1(76 * k) + ')">' + hold + '<circle cx="0" cy="0" r="' + f1(8 * k) + '" fill="' + da + '" stroke="' + INK + '" stroke-width="2.5"/></g></g></g>';
    };
    s += tay(-1);
    s += paper("M " + f1(-30 * k) + " " + f1(hip + 4) + " C " + f1(-36 * k) + " " + f1(sh + 40 * k) + " " + f1(-30 * k) + " " + f1(sh) + " 0 " + f1(sh - 8 * k) + " C " + f1(30 * k) + " " + f1(sh) + " " + f1(36 * k) + " " + f1(sh + 40 * k) + " " + f1(30 * k) + " " + f1(hip + 4) + " Z", ao, { stroke: true, sw: 3.5, sx: 3, sy: 4, half: 0.1 });
    s += tay(1);
    s += '<g id="' + id + '-dau"><circle cx="0" cy="' + f1(hy) + '" r="' + f1(27 * k) + '" fill="' + (o.sau ? "#4A3A30" : da) + '" stroke="' + INK + '" stroke-width="3.5"/>';
    if (mu) s += paper("M " + f1(-28 * k) + " " + f1(hy - 4 * k) + " C " + f1(-28 * k) + " " + f1(hy - 40 * k) + " " + f1(28 * k) + " " + f1(hy - 40 * k) + " " + f1(28 * k) + " " + f1(hy - 4 * k) + " Z", mu, { stroke: true, sw: 3, shadow: false }) +
      paper(rRect(-30 * k, hy - 10 * k, 60 * k, 10 * k, 1, 8906), mu, { stroke: true, sw: 3, shadow: false });
    s += "</g>";
    return s + "</g>";
  }

  /* ---------- nhà thờ, tháp chuông, rơ-moóc ---------- */
  /* Nhà thờ gỗ đỏ cách điệu (mái dốc lớn sẫm gợi lều goahti), KHÔNG chữ. Gốc: giữa đáy. Rộng ≈ 640, cao ≈ 560. id+"-cua": cửa hông (gốc mép trái cửa). */
  function nhaTho(id, o) {
    o = o || {};
    var s = '<g id="' + id + '">', r = rng(9301);
    s += paper(rRect(-300, -120, 600, 120, 1.5, 9302), M.nhaTho, { stroke: true, sw: 6, sx: 10, sy: 12 });
    for (var x = -284; x < 300; x += 22) s += line("M " + x + " -116 L " + x + " -4", 2.5, M.nhaThoToi, ' opacity="0.7"');
    s += paper("M -340 -112 L -60 -500 L 60 -500 L 340 -112 Z", M.maiTho, { stroke: true, sw: 6, sx: 10, sy: 12 });
    for (var k = 0; k < 7; k++) { var yy = -150 - k * 50, w = 300 - k * 38; s += line("M " + f1(-w) + " " + yy + " L " + f1(w) + " " + yy, 3, M.maiThoSang, ' opacity="0.8"'); }
    s += paper("M -60 -500 L 0 -580 L 60 -500 Z", M.nhaTho, { stroke: true, sw: 5, shadow: false });
    s += paper(rRect(-14, -640, 28, 70, 1, 9303), M.nhaTho, { stroke: true, sw: 4, shadow: false }) + paper("M -22 -636 L 0 -690 L 22 -636 Z", M.maiTho, { stroke: true, sw: 4, shadow: false });
    s += paper("M -130 -112 L -40 -300 L 40 -300 L 130 -112 Z", M.nhaTho, { stroke: true, sw: 5, shadow: false });
    for (var x2 = -116; x2 < 130; x2 += 18) s += line("M " + x2 + " " + f1(-120 - Math.max(0, 70 - Math.abs(x2)) * 1.2) + " L " + x2 + " -116", 2, M.nhaThoToi, ' opacity="0.6"');
    s += paper("M -40 -300 L 0 -360 L 40 -300 Z", M.maiTho, { stroke: true, sw: 4, shadow: false });
    s += paper(rRect(-34, -100, 68, 100, 1, 9304), "#5E2A22", { stroke: true, sw: 4, shadow: false }) + paper("M -34 -100 C -34 -136 34 -136 34 -100 Z", "#5E2A22", { stroke: true, sw: 4, shadow: false });
    s += '<circle cx="0" cy="-200" r="24" fill="#E8D7A8" stroke="' + INK + '" stroke-width="4"/>' + line("M -24 -200 L 24 -200 M 0 -224 L 0 -176", 3, INK, ' opacity="0.6"');
    [-230, -170, 170, 230].forEach(function (wx) { s += paper(rRect(wx - 16, -96, 32, 50, 1, 9310 + wx), "#E8D7A8", { stroke: true, sw: 3.5, shadow: false }) + line("M " + wx + " -96 L " + wx + " -46", 2.5); });
    s += '<g id="' + id + '-cua">' + paper(rRect(-292, -96, 40, 96, 1, 9320), "#6E2A22", { stroke: true, sw: 4, shadow: false }) + '<circle cx="-260" cy="-48" r="4" fill="#C9A24A" stroke="' + INK + '" stroke-width="2"/></g>';
    s += line("M -300 -2 L 300 -2", 5, INK, ' opacity="0.4"');
    return s + "</g>";
  }
  /* Tháp chuông gỗ đứng riêng. Gốc: giữa đáy. Cao ≈ 460. */
  function thapChuong(id) {
    var s = '<g' + (id ? ' id="' + id + '"' : "") + ">";
    s += paper("M -46 0 L -36 -300 L 36 -300 L 46 0 Z", M.nhaTho, { stroke: true, sw: 5, sx: 8, sy: 10 });
    for (var x = -36; x <= 36; x += 14) s += line("M " + x + " -296 L " + f1(x * 1.2) + " -4", 2, M.nhaThoToi, ' opacity="0.6"');
    s += paper(rRect(-42, -380, 84, 82, 1, 9331), M.nhaTho, { stroke: true, sw: 5, shadow: false });
    s += paper(rRect(-28, -370, 56, 58, 1, 9332), "#3A2420", { shadow: false }) + paper("M -12 -350 C -12 -366 12 -366 12 -350 L 14 -328 L -14 -328 Z", "#C9A24A", { stroke: true, sw: 3, shadow: false });
    s += paper("M -56 -378 L 0 -470 L 56 -378 Z", M.maiTho, { stroke: true, sw: 5, shadow: false });
    s += line("M 0 -470 L 0 -500", 4);
    return s + "</g>";
  }
  /* Rơ-moóc dài nhiều trục bánh. Gốc: giữa mặt đất. w rộng. Sàn ở y −64..−40 (đặt nhà thờ ở y −64). id+"-b": nhóm bánh. */
  function romooc(id, w) {
    w = w || 760;
    var s = '<g id="' + id + '">';
    s += paper(rRect(-w / 2, -66, w, 26, 1.2, 9341), "#4E555A", { stroke: true, sw: 4, sx: 5, sy: 6 });
    s += paper(rRect(-w / 2 + 10, -42, w - 20, 12, 1, 9342), "#6F7578", { stroke: true, sw: 3, shadow: false });
    s += '<g id="' + id + '-b">';
    for (var x = -w / 2 + 26; x < w / 2 - 10; x += 34) s += '<circle cx="' + f1(x) + '" cy="-15" r="14" fill="#2B2F33" stroke="' + INK + '" stroke-width="3"/><circle cx="' + f1(x) + '" cy="-15" r="5" fill="#8E9497"/>';
    s += "</g>";
    return s + "</g>";
  }

  /* ---------- đường ngang, tàu quặng ---------- */
  function toaQuang(sd) {
    var r = rng(sd || 9401), s = "<g>";
    s += paper("M -104 -96 L 104 -96 L 94 -22 L -94 -22 Z", "#4A3E38", { stroke: true, sw: 4, sx: 4, sy: 5 });
    s += line("M -96 -72 L 96 -72 M -94 -48 L 94 -48", 2.5, "#2E2622", ' opacity="0.7"');
    var d = "M -100 -96";
    for (var i = 0; i <= 8; i++) d += " L " + f1(-100 + i * 25) + " " + f1(-106 - r() * 22);
    s += paper(d + " L 100 -96 Z", "#2E2A2C", { shadow: false });
    s += paper(d.replace("M -100 -96", "M -100 -98") + " L 100 -98 Z", "#F4F8F9", { shadow: false, shOp: 0 }).replace('fill="#F4F8F9"', 'fill="#F4F8F9" opacity="0.55"');
    s += '<circle cx="-62" cy="-14" r="14" fill="#2B2F33" stroke="' + INK + '" stroke-width="3"/><circle cx="62" cy="-14" r="14" fill="#2B2F33" stroke="' + INK + '" stroke-width="3"/>';
    s += line("M -108 -30 L -124 -30 M 108 -30 L 124 -30", 5, "#2B2F33");
    return s + "</g>";
  }
  /* Đoàn toa quặng n toa nối nhau, gốc đáy toa đầu (bên trái). Bước 252. */
  function doanToa(id, n, sd) {
    var s = '<g id="' + id + '">';
    for (var i = 0; i < n; i++) s += at(i * 252, 0, toaQuang((sd || 9410) + i));
    return s + "</g>";
  }
  function duongRay(x0, x1, y) {
    var s = "<g>";
    for (var x = x0; x < x1; x += 44) s += paper(rRect(x, y - 8, 30, 16, 1, 9420 + Math.round(x)), "#5E4A3A", { shadow: false });
    s += line("M " + x0 + " " + (y - 10) + " L " + x1 + " " + (y - 10), 6, "#4E555A") + line("M " + x0 + " " + (y + 6) + " L " + x1 + " " + (y + 6), 6, "#4E555A");
    return s + "</g>";
  }
  /* Cột rào chắn sọc đỏ trắng. Gốc: chân cột. id+"-tay": cánh rào (xoay quanh "0 -150"; 0 = hạ ngang sang phải, −80 = nâng). */
  function raoChan(id, len) {
    len = len || 520;
    var s = '<g id="' + id + '">';
    s += paper(rRect(-14, -170, 28, 170, 1, 9431), "#E9E4DA", { stroke: true, sw: 4, sx: 5, sy: 6 });
    for (var y = -160; y < 0; y += 40) s += '<rect x="-12" y="' + y + '" width="24" height="20" fill="#C9463A"/>';
    s += paper(rRect(-30, -10, 60, 14, 1, 9432), "#6F7578", { stroke: true, sw: 3, shadow: false });
    s += '<g id="' + id + '-tay"><g transform="translate(0,-150)">' + paper(rRect(-10, -9, len, 18, 1, 9433), "#F4F1EA", { stroke: true, sw: 4, sx: 4, sy: 6 });
    for (var x = 30; x < len - 20; x += 70) s += '<rect x="' + x + '" y="-7" width="34" height="14" fill="#C9463A"/>';
    s += '<circle cx="0" cy="0" r="16" fill="#6F7578" stroke="' + INK + '" stroke-width="4"/></g></g>';
    s += '<circle cx="0" cy="-184" r="12" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/>';
    return s + "</g>";
  }
  /* Ghế gấp nhỏ (gốc giữa chân), bình giữ nhiệt (gốc đáy), cốc (gốc đáy) */
  function gheGap(mau) {
    mau = mau || "#3F6E9A";
    return "<g>" + line("M -46 -70 L -54 0 M 46 -70 L 54 0 M -44 -74 L 48 -4 M 44 -74 L -48 -4", 6, "#6F7578") +
      paper(rRect(-50, -82, 100, 16, 1, 9441), mau, { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + "</g>";
  }
  function binhGiuNhiet(id) {
    return '<g' + (id ? ' id="' + id + '"' : "") + ">" + paper(rRect(-14, -78, 28, 78, 3, 9451), "#B04A3A", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
      paper(rRect(-12, -96, 24, 20, 2, 9452), "#B8BDC2", { stroke: true, sw: 3.5, shadow: false }) + line("M -6 -66 L -6 -14", 3, "#FFFFFF", ' opacity="0.4"') + "</g>";
  }
  function coc(id) {
    return '<g' + (id ? ' id="' + id + '"' : "") + ">" + paper("M -16 -34 L 16 -34 L 12 0 L -12 0 Z", "#F4F1E8", { stroke: true, sw: 3.5, sx: 2, sy: 3 }) +
      line("M 16 -26 C 26 -26 26 -10 14 -10", 4) + '<ellipse cx="0" cy="-32" rx="13" ry="3.5" fill="#8A4B22"/>' + "</g>";
  }

  /* ---------- phố, nhà, núi ---------- */
  /* Nhà gỗ Kiruna nhiều màu. Gốc: giữa đáy. o: { w, h, mau, mai, cua (cửa gỗ to giống cửa phòng thuê), den (cửa sổ sáng), sd } */
  function nhaGo(o) {
    o = o || {};
    var w = o.w || 200, h = o.h || 150, sd = o.sd || 9501, mau = o.mau || M.nha[0], mai = o.mai || M.mai[0], s = "<g>";
    s += paper(rRect(-w / 2, -h, w, h, 1.5, sd), mau, { stroke: true, sw: 4.5, sx: 6, sy: 8 });
    for (var x = -w / 2 + 14; x < w / 2; x += 18) s += line("M " + f1(x) + " " + f1(-h + 4) + " L " + f1(x) + " -4", 2, "#000000", ' opacity="0.12"');
    s += paper("M " + f1(-w / 2 - 16) + " " + f1(-h + 4) + " L 0 " + f1(-h - w * 0.42) + " L " + f1(w / 2 + 16) + " " + f1(-h + 4) + " Z", mai, { stroke: true, sw: 4.5, shadow: false });
    var cw = w * 0.2, wy = -h * 0.72;
    [-w * 0.27, w * 0.27].forEach(function (wx, i) {
      s += paper(rRect(wx - cw / 2, wy, cw, h * 0.3, 1, sd + 3 + i), o.den ? "#FFD68A" : "#E8EEF0", { stroke: true, sw: 3.5, shadow: false }) + line("M " + f1(wx) + " " + f1(wy) + " L " + f1(wx) + " " + f1(wy + h * 0.3), 2.5);
    });
    if (o.cua) s += paper(rRect(-w * 0.1, -h * 0.5, w * 0.2, h * 0.5, 1, sd + 7), M.go, { stroke: true, sw: 3.5, shadow: false }) + '<circle cx="' + f1(w * 0.05) + '" cy="' + f1(-h * 0.25) + '" r="4" fill="#C9A24A" stroke="' + INK + '" stroke-width="2"/>';
    return s + "</g>";
  }
  /* Thùng các-tông giấy (gốc giữa đáy) */
  function thungGiay(w, sd) {
    w = w || 80;
    var h = w * 0.72;
    return "<g>" + paper(rRect(-w / 2, -h, w, h, 1.2, sd || 9521), "#C89A62", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) +
      paper("M " + f1(-w / 2) + " " + f1(-h) + " L " + f1(-w / 2 - w * 0.22) + " " + f1(-h - w * 0.2) + " L " + f1(-w * 0.1) + " " + f1(-h - w * 0.22) + " L 0 " + f1(-h) + " Z", "#D9AE76", { stroke: true, sw: 3, shadow: false }) +
      paper("M " + f1(w / 2) + " " + f1(-h) + " L " + f1(w / 2 + w * 0.22) + " " + f1(-h - w * 0.2) + " L " + f1(w * 0.1) + " " + f1(-h - w * 0.22) + " L 0 " + f1(-h) + " Z", "#D9AE76", { stroke: true, sw: 3, shadow: false }) +
      line("M " + f1(-w * 0.1) + " " + f1(-h * 0.55) + " L " + f1(w * 0.1) + " " + f1(-h * 0.55), 6, "#9C7240", ' opacity="0.8"') + "</g>";
  }
  function nuiXa(x0, x1, y, h, mau, sd) {
    var r = rng(sd || 9531), pts = [[x0, y]], n = 9;
    for (var i = 0; i <= n; i++) { var u = i / n; pts.push([x0 + (x1 - x0) * u, y - h * (0.35 + 0.65 * Math.sin(Math.PI * u)) * (0.75 + r() * 0.3)]); }
    pts.push([x1, y]);
    return paper(D.smoothClosed ? D.smoothClosed(pts) : rough(pts, 3, sd, 30), mau, { shadow: false });
  }
  function cayBachDuong(h, sd) {
    var r = rng(sd || 9541), s = "<g>";
    s += line("M 0 0 L 0 " + f1(-h), 10, INK) + line("M 0 0 L 0 " + f1(-h), 6, "#EDEAE2");
    for (var k = 0; k < 4; k++) s += line("M -3 " + f1(-h * (0.2 + k * 0.18)) + " L 3 " + f1(-h * (0.2 + k * 0.18) - 2), 3, "#3A3530");
    s += paper(rEll(0, -h * 0.85, h * 0.28, h * 0.32, 4, sd + 1), r() < 0.5 ? "#7E8C62" : "#8E9A6C", { stroke: true, sw: 3, sx: 3, sy: 4 });
    return s + "</g>";
  }
  /* Thẻ chữ (chữ phải nằm trong chu_tren_do_vat). Bọc NhietDoi.theChu. */
  function the(id, chu, co, o) { return ND.theChu(id, chu, co, o); }
  /* Mây giấy */
  function may(w, sd) {
    var r = rng(sd || 9551), s = "<g>";
    for (var i = 0; i < 4; i++) s += paper(rEll(-w * 0.35 + i * w * 0.23, -r() * w * 0.08, w * (0.18 + r() * 0.08), w * (0.12 + r() * 0.05), 3, sd + i), "#FBF7EE", { shadow: false });
    return s + "</g>";
  }

  /* ---------- bàn kỷ vật + trang sổ (đoạn nghiêm d39–d42) ----------
     Khung 1920×1080: mặt bàn gỗ quanh, vệt đèn bàn ấm góc trên trái; trang sổ tông trầm (x 300..1800, y 60..880).
     Wob đứng trên mặt bàn trước mép trang (chân ở y ≈ 1010). Trả { nen (bàn), trang (giấy trang), den (vệt đèn trên cùng) }. */
  var TRANG = { x: 300, y: 64, w: 1500, h: 820 };
  function banTrang(o) {
    o = o || {};
    var T = M.T, P = TRANG, nen = "", trang = "";
    nen += '<rect x="-400" y="-300" width="2720" height="1680" fill="url(#krGo)"/>';
    nen += '<rect x="-400" y="-300" width="2720" height="1680" fill="url(#half)" opacity="0.06"/>';
    nen += paper(rRect(P.x - 46, P.y - 30, P.w + 92, P.h + 70, 2, 9601), "#3E2A1C", { shadow: false });
    nen += paper(rRect(P.x - 26, P.y - 14, P.w + 60, P.h + 36, 2, 9602), "#D8CCB4", { stroke: true, sw: 4, sx: 10, sy: 14, shOp: 0.3 });
    trang += paper(rRect(P.x, P.y, P.w, P.h, 2.5, o.sd || 9603), T.trang, { stroke: true, sw: 5, shadow: false });
    trang += '<rect x="' + P.x + '" y="' + P.y + '" width="' + P.w + '" height="' + P.h + '" fill="url(#half)" opacity="0.05"/>';
    trang += line("M " + (P.x + 60) + " " + (P.y + 20) + " L " + (P.x + 60) + " " + (P.y + P.h - 20), 2.5, "#B07A6A", ' opacity="0.3"');
    var den = '<ellipse cx="160" cy="80" rx="980" ry="760" fill="url(#krDen)"/>' + '<rect x="-400" y="-300" width="2720" height="1680" fill="url(#krToi)"/>';
    return { nen: nen, trang: trang, den: den, P: P };
  }

  /* Móc áo góc trên trái (đoạn ở nhà d39–d42): áo phao xanh lam treo móc, mũ len xanh lá thông vắt trên móc. */
  function mocAo() {
    var s = '<g transform="translate(150,40)">' + line("M -60 -10 L 60 -10", 12, "#3E2A1C") + '<circle cx="0" cy="0" r="9" fill="#B8BDC2" stroke="' + INK + '" stroke-width="3"/>';
    s += paper("M -10 6 C -60 20 -86 60 -90 140 L -84 250 C -40 262 40 262 84 250 L 90 140 C 86 60 60 20 10 6 Z", M.ao, { stroke: true, sw: 5, shadow: false });
    s += line("M -88 170 C -40 182 40 182 88 170 M -86 214 C -40 226 40 226 86 214", 4, M.aoToi) + line("M 0 20 L 0 250", 6, M.kem);
    s += paper("M -40 -2 C -40 -50 40 -50 40 -2 Z", M.mu, { stroke: true, sw: 4, shadow: false }) + paper(rRect(-44, -10, 88, 18, 1, 9711), M.muVanh, { stroke: true, sw: 3.5, shadow: false });
    s += '<circle cx="0" cy="-52" r="12" fill="' + M.bong + '" stroke="' + INK + '" stroke-width="3"/>';
    return s + "</g>";
  }
  /* Nét phác tay trên bản đồ trung tâm (map-kiruna-centre chỉ có nền đất): núi mỏ phía tây chấm Old, hồ phía bắc, cụm khối nhà nhỏ quanh hai chấm. KHÔNG chữ. */
  function phacMap(OLD, NEW, sd) {
    var r = rng(sd || 9701), s = '<g opacity="0.85">';
    s += at(OLD[0] - 250, OLD[1] + 30, paper("M -120 40 L -70 -70 L 60 -78 L 120 40 Z", "#A39C90", { stroke: true, sw: 3.5, shadow: false }) + line("M -86 -30 L 84 -36 M -102 6 L 100 2", 3, "#857E72"));
    s += at(OLD[0] + 30, OLD[1] - 160, paper(D.rough([[-150, 0], [-100, -50], [20, -60], [140, -30], [160, 20], [60, 50], [-90, 40]], 6, sd + 1, 24), "#9CC3D0", { stroke: true, sw: 3, shadow: false }));
    [[OLD, 9], [NEW, 9]].forEach(function (q, k) {
      for (var i = 0; i < q[1]; i++) {
        var a = r() * Math.PI * 2, d = 60 + r() * 90, x = q[0][0] + Math.cos(a) * d * 1.4, y = q[0][1] + Math.sin(a) * d * 0.8;
        s += paper(rRect(x - 14, y - 11, 28, 22, 1, sd + 10 + k * 20 + i), k ? "#D9C29A" : "#CFC6B4", { stroke: true, sw: 2, shadow: false });
      }
    });
    return s + "</g>";
  }
  /* Camera cho nhóm tuỳ ý: nhom [[sel, p]], keys [[t, cx, cy, zoom, ease]]. */
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
  /* Vật bay theo cung */
  function bayCung(api, sel, t0, t1, x0, y0, x1, y1, h, o) {
    o = o || {};
    var n = 8;
    api.key(sel, "x", 0, x0, "step"); api.key(sel, "y", 0, y0, "step");
    api.key(sel, "x", t0, x0, "none"); api.key(sel, "y", t0, y0, "none");
    for (var i = 1; i <= n; i++) {
      var u = i / n, x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u - 4 * h * u * (1 - u);
      api.key(sel, "x", t0 + (t1 - t0) * u, x, "none"); api.key(sel, "y", t0 + (t1 - t0) * u, y, "none");
    }
    if (o.xoay) { api.key(sel, "rotation", t0, 0, "none"); api.key(sel, "rotation", t1, o.xoay, "none"); }
  }
  /* Bật dựng từ mép dưới (thẻ pop-up, nhà): nhóm sel có gốc ở đáy; scaleY 0 → 1 */
  function batDung(api, sel, t, dur, ox, oy) {
    api.origin(sel, (ox || 0) + " " + (oy || 0));
    api.key(sel, "scaleY", 0, 0, "step"); api.key(sel, "scaleY", t, 0, "none"); api.key(sel, "scaleY", t + (dur || 0.4), 1, "back.out(1.7)");
  }

  return { M: M, at: at, g: g, ss: ss, ss5: ss5, defs: defs, giaTri: giaTri, thong: thong, chiaKiruna: chiaKiruna, chumChia: chumChia, wob: wob, nguoi: nguoi,
    nhaTho: nhaTho, thapChuong: thapChuong, romooc: romooc, toaQuang: toaQuang, doanToa: doanToa, duongRay: duongRay, raoChan: raoChan, gheGap: gheGap,
    binhGiuNhiet: binhGiuNhiet, coc: coc, nhaGo: nhaGo, thungGiay: thungGiay, nuiXa: nuiXa, cayBachDuong: cayBachDuong, the: the, may: may,
    TRANG: TRANG, banTrang: banTrang, mocAo: mocAo, phacMap: phacMap, camNhom: camNhom, cat: cat, bayCung: bayCung, batDung: batDung };
})();
/* Đoạn d25 · cắt giấy · hồi ức tháng 8: con đường rộng, hai hàng người que (không mặt) ngồi ghế xếp, bình giữ nhiệt, cờ giấy TRƠN;
   máy quay truyền hình giấy trên chân máy; TV giấy nhỏ trong ô cửa sổ chiếu nhà thờ đang nhích và cả Wob tí hon; vương miện giấy nhấp nhô
   (KHÔNG người); Wob ngồi vỉa hè với bánh quế cuộn to, con chó lông xù ngồi cạnh, Wob bẻ đôi bánh chia cho nó.
   Vào "cat", ra "cat". Không chữ (chu_tren_do_vat rỗng). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, K = api.K, at = KR.at, M = KR.M, INK = D.INK, paper = D.paper, rRect = D.rRect, rEll = D.rEll, line = D.line;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tSwe = T("swedish", 0, 3.14), tLive = T("live,", 0, 5.21), tThou = T("thousands", 0, 6.94), tKing = T("king", 0, 9.24),
    tSo = T("so", 0, 10.4), tBun = T("bun.", 0, 12.76), tDog = T("dog", 0, 13.57), tSat = T("sat", 0, 13.81), tVery = T("very", 0, 16.05), tSer = T("seriously,", 0, 16.31), tTime = T("time.", 0, 17.55);

  // ---------- đồ riêng ----------
  function banhQue(id, can) {   // bánh quế cuộn Thụy Điển, gốc tâm, r ≈ 70; can: vết cắn
    var s = '<g id="' + id + '">';
    var d = can ? "M -70 0 C -70 -40 -40 -70 0 -70 C 22 -70 40 -60 52 -46 C 40 -40 36 -24 46 -14 C 56 -6 66 -10 70 -4 C 70 40 40 70 0 70 C -40 70 -70 40 -70 0 Z" : rEll(0, 0, 70, 68, 3, 9901);
    s += paper(d, "#C98A4A", { stroke: true, sw: 4.5, sx: 4, sy: 5 });
    s += line("M 0 0 C 14 -2 18 18 0 22 C -26 26 -30 -10 -8 -26 C 22 -44 50 -10 40 22 C 30 50 -20 58 -42 30", 5, "#8A5226");
    [[-30, -40], [10, -50], [-48, 6], [22, 34], [-14, 44], [44, -4], [-2, 8]].forEach(function (p, i) { if (!(can && p[0] > 20 && p[1] < 0)) s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="#FFFDF6" stroke="' + INK + '" stroke-width="1.5"/>'; });
    return s + "</g>";
  }
  function nuaBanh(id, ben) {   // nửa bánh (ben −1 trái, 1 phải), gốc tâm bánh
    var d = ben < 0 ? "M 4 -70 C -40 -70 -70 -40 -70 0 C -70 40 -40 70 4 70 L -6 40 L 8 14 L -4 -14 L 10 -40 Z" : "M 4 -70 C 40 -70 70 -40 70 0 C 70 40 40 70 4 70 L -6 40 L 8 14 L -4 -14 L 10 -40 Z";
    return '<g id="' + id + '">' + paper(d, "#C98A4A", { stroke: true, sw: 4.5, sx: 3, sy: 4 }) + line(ben < 0 ? "M -10 0 C -30 -10 -40 20 -20 34" : "M 20 -20 C 44 -6 40 26 20 34", 5, "#8A5226") +
      '<circle cx="' + (ben * 36) + '" cy="-30" r="5" fill="#FFFDF6" stroke="' + INK + '" stroke-width="1.5"/><circle cx="' + (ben * 30) + '" cy="30" r="5" fill="#FFFDF6" stroke="' + INK + '" stroke-width="1.5"/></g>';
  }
  function cho(id) {   // chó lông xù ngồi, nhìn sang phải; gốc giữa chân; id-dau quay (origin "40 -150"), id-duoi, id-nua (nửa bánh trong miệng, ẩn)
    var m = "#D8C3A0", dk = "#A88A62", s = '<g id="' + id + '">';
    s += '<g id="' + id + '-duoi">' + paper("M -60 -30 C -100 -40 -110 -90 -86 -110 C -84 -80 -70 -60 -50 -50 Z", m, { stroke: true, sw: 4, shadow: false }) + "</g>";
    s += paper(D.rough([[-70, 0], [-80, -60], [-50, -120], [10, -140], [50, -110], [56, -40], [40, 0]], 9, 9911, 14), m, { stroke: true, sw: 4.5, sx: 5, sy: 6, half: 0.12 });
    s += paper(rEll(30, -6, 26, 12, 2, 9912), dk, { stroke: true, sw: 3.5, shadow: false }) + paper(rEll(-30, -6, 26, 12, 2, 9913), dk, { stroke: true, sw: 3.5, shadow: false });
    s += '<g id="' + id + '-dau"><g transform="translate(40,-150)">';
    s += paper(D.rough([[-44, 10], [-50, -34], [-20, -60], [26, -58], [52, -30], [80, -24], [84, 2], [50, 16], [6, 30]], 7, 9914, 12), m, { stroke: true, sw: 4.5, sx: 4, sy: 5 });
    s += paper("M -30 -50 C -54 -46 -60 -10 -46 10 C -36 -6 -30 -24 -22 -40 Z", dk, { stroke: true, sw: 4, shadow: false });
    s += '<ellipse cx="82" cy="-14" rx="10" ry="8" fill="' + INK + '"/><circle cx="34" cy="-28" r="6" fill="' + INK + '"/><circle cx="36" cy="-30" r="2" fill="#FFFFFF"/>';
    s += line("M 60 6 C 66 10 74 10 80 4", 3);
    s += '<g id="' + id + '-nua" opacity="0"><g transform="translate(74,16) scale(0.5)">' + nuaBanh(id + "-nb", 1) + "</g></g>";
    s += "</g></g>";
    return s + "</g>";
  }
  function mayQuay(id) {   // máy quay truyền hình trên chân máy, ống kính chĩa sang phải; gốc giữa chân
    var s = '<g id="' + id + '">';
    s += line("M 0 -150 L -50 0 M 0 -150 L 50 0 M 0 -150 L 4 0", 7, "#3A3F44");
    s += paper(rRect(-70, -230, 130, 80, 2, 9921), "#4E555A", { stroke: true, sw: 4.5, sx: 4, sy: 5 });
    s += paper(rRect(60, -214, 52, 48, 2, 9922), "#2B2F33", { stroke: true, sw: 4, shadow: false }) + '<ellipse cx="114" cy="-190" rx="10" ry="24" fill="#5E8597" stroke="' + INK + '" stroke-width="3"/>';
    s += paper(rRect(-60, -258, 70, 26, 2, 9923), "#6F7578", { stroke: true, sw: 3.5, shadow: false }) + '<circle cx="-50" cy="-196" r="7" fill="#C9463A" stroke="' + INK + '" stroke-width="2"/>';
    return s + "</g>";
  }
  function vuongMien(id) {
    return '<g id="' + id + '">' + paper("M -40 0 L -46 -46 L -24 -22 L 0 -56 L 24 -22 L 46 -46 L 40 0 Z", "#E2B33C", { stroke: true, sw: 4, sx: 3, sy: 4 }) +
      '<circle cx="0" cy="-58" r="6" fill="#C9463A" stroke="' + INK + '" stroke-width="2"/><circle cx="-46" cy="-48" r="5" fill="#3F6E9A" stroke="' + INK + '" stroke-width="2"/><circle cx="46" cy="-48" r="5" fill="#3F6E9A" stroke="' + INK + '" stroke-width="2"/></g>';
  }

  // ---------- cảnh ----------
  var G = 960;   // vỉa hè gần (lớp giữa)
  var troi = '<rect x="-200" y="-200" width="2320" height="1480" fill="url(#krHe)"/>' + at(520, 150, KR.may(240, 9931)) + at(1460, 110, KR.may(190, 9932));
  // phố: dãy nhà gỗ nhiều màu, hàng người xa vẫy cờ, vương miện
  var pho = KR.nuiXa(-800, 3200, 640, 110, "#B7C9B0", 9933);
  pho += '<rect x="-900" y="636" width="4200" height="200" fill="' + M.coSang + '"/>';
  var NH = [[-300, 0], [-60, 1], [190, 2], [440, 3], [690, 4], [960, 1], [1230, 5], [1500, 0], [1770, 2], [2040, 3], [2310, 4], [2580, 1]];
  NH.forEach(function (n, i) { if (i !== 6) pho += at(n[0], 700, KR.nhaGo({ w: 210, h: 150, mau: M.nha[n[1]], mai: M.mai[i % 3], sd: 9940 + i * 7 })); });
  // nhà có TV trong cửa sổ (i = 6)
  var tvMan = '<g id="tvMan"><rect x="-50" y="-34" width="100" height="62" fill="#9EC3D4"/>' + '<rect x="-50" y="10" width="100" height="18" fill="#9DBA6E"/>' +
    at(10, 12, '<g transform="scale(0.075)">' + KR.romooc(null, 820).replace('<g id="null">', "<g>") + at(0, -64, KR.nhaTho("ntTv")) + "</g>") + '<g id="tvWob"></g></g>';
  var tvSet = paper(rRect(-62, -44, 124, 84, 3, 9951), "#5E4A3A", { stroke: true, sw: 4, sx: 3, sy: 4 }) + '<clipPath id="tvCl"><rect x="-50" y="-34" width="100" height="62" rx="6"/></clipPath><g clip-path="url(#tvCl)">' + tvMan + "</g>" +
    '<rect x="-50" y="-34" width="100" height="62" rx="6" fill="none" stroke="' + INK + '" stroke-width="3"/>' + line("M -20 -44 L -34 -66 M 20 -44 L 34 -66", 3);
  var nhaTv = '<g transform="translate(1230,700)">' + paper(rRect(-125, -190, 250, 190, 1.5, 9952), M.nha[5], { stroke: true, sw: 4.5, sx: 6, sy: 8 }) +
    paper("M -141 -186 L 0 -290 L 141 -186 Z", M.mai[0], { stroke: true, sw: 4.5, shadow: false }) +
    paper(rRect(-90, -160, 180, 120, 1.2, 9953), "#F3E6C8", { stroke: true, sw: 4, shadow: false }) + at(0, -98, tvSet, 0.95) + line("M -90 -40 L 90 -40", 6, "#7A5236") + "</g>";
  pho += nhaTv;
  var xaNg = [];
  for (var i = 0; i < 22; i++) {
    var id = "pa" + i;
    pho += at(-200 + i * 128 + (i % 2) * 18, 812, KR.nguoi(id, { ao: M.ao1[(i * 3) % 8], mu: i % 4 === 1 ? "#4F7A5A" : (i % 4 === 3 ? "#C9463A" : null), da: [M.da1, M.da2, M.da3][i % 3], co: i % 2 === 0, coMau: ["#F3E6C8", "#E9C98B", "#D9E6EA"][i % 3], ngoi: i % 2 === 1, binh: i % 2 === 1, ghe: ["#3F6E9A", "#4F7A5A", "#B04A3A"][i % 3] }), 0.5);
    xaNg.push(id);
  }
  pho += '<g id="vm">' + vuongMien("vmi") + "</g>";
  // đường: mặt đường, nhà thờ trên rơ-moóc nhích sang phải
  var duong = '<rect x="-900" y="818" width="4400" height="140" fill="#9A9890"/>' + line("M -900 888 L 3500 888", 6, "#F3E6C8", ' stroke-dasharray="60 50" opacity="0.8"');
  duong += '<g id="ntDi"><g transform="scale(0.55)">' + KR.romooc("rm", 820) + at(0, -64, KR.nhaTho("nt")) + "</g></g>";
  // vỉa hè gần: hàng người ngồi ghế xếp, rót trà; máy quay; Wob; con chó
  var gi = '<rect x="-900" y="' + (G - 14) + '" width="4400" height="400" fill="#C9C3B5"/>' + paper(rRect(-900, G - 20, 4400, 22, 2, 9960), "#B0A99A", { shadow: false });
  var gNg = [];
  for (var j = 0; j < 9; j++) {
    var idg = "pg" + j;
    gi += at(-120 + j * 150, G + 30, KR.nguoi(idg, { ao: M.ao1[(j * 5 + 2) % 8], mu: j % 3 === 0 ? "#3F6E9A" : null, da: [M.da2, M.da1, M.da3][j % 3], ngoi: true, binh: j % 3 !== 2 ? true : "#4F7A5A", co: j % 3 === 2, ghe: ["#B04A3A", "#3F6E9A", "#4F7A5A"][j % 3] }), 0.78);
    gNg.push(idg);
  }
  gi += at(1640, G + 20, mayQuay("mq"), 0.95);
  var W = KR.wob(api, "W", { mua: "he", chum: "kr" });
  var Wt = KR.wob(api, "Wt", { mua: "he" });
  gi += W.svg;
  gi += '<g id="banh">' + banhQue("bq0", false) + "</g>" + '<g id="banhC">' + banhQue("bq1", true) + "</g>" +
    '<g id="nuaL">' + nuaBanh("nl", -1) + "</g>" + '<g id="nuaR">' + nuaBanh("nr", 1) + "</g>";
  gi += '<g id="choG">' + cho("ch") + "</g>";
  var gan = "";
  gan += '<rect x="-900" y="1060" width="4400" height="300" fill="#B0A99A"/>';

  var html = KR.defs() + troi + api.lop("pho", pho, 0.6, { mat: 820 }) + api.lop("duong", duong, 0.85, { mat: 900 }) + api.lop("giua", gi, 1, { mat: G }) + api.lop("gan", gan, 1.4, { mat: 1080 });
  html = html.replace('<g id="tvWob"></g>', '<g id="tvWob">' + Wt.svg + "</g>");
  api.dat(html);
  api.noi({});

  // ---------- camera ----------
  var tC = tThou - 0.05, tD = tSo + 0.1;
  api.camera([[0, 380, 790, 1.3], [0.25, 380, 790, 1.3, "none"], [2.7, 1180, 780, 1.3, "sine.inOut"], [tSwe - 0.15, 1200, 776, 1.32, "sine.inOut"],
    [tSwe + 0.65, 1410, 650, 2.1, "power2.inOut"], [tC - 0.05, 1420, 646, 2.16, "sine.inOut"], [tC + 0.9, 1280, 640, 0.86, "power2.inOut"], [tD - 0.1, 1300, 650, 0.88, "sine.inOut"],
    [tD + 1.0, 1210, 820, 1.62, "power2.inOut"], [tSat + 0.3, 1290, 820, 1.66, "sine.inOut"], [DUR, 1310, 816, 1.74, "sine.inOut"]]);

  // ---------- nhà thờ nhích sang phải suốt đoạn ----------
  api.key("#ntDi", "x", 0, 2040, "none"); api.key("#ntDi", "x", DUR, 2140, "none"); api.set("#ntDi", 0, { y: 888 });
  api.set("#tvMan", 0, {});
  api.key("#vm", "x", 0, 1500); api.key("#vm", "y", 0, 736, "step");
  api.show("#vm", 0, 0); api.show("#vm", tKing - 0.2, 1);
  for (var v = 0; v < 8; v++) { var tv = tKing - 0.2 + v * 0.28; api.key("#vm", "x", tv, 1500 + v * 22, "sine.inOut"); api.key("#vm", "y", tv, v % 2 ? 740 : 724, "sine.inOut"); }

  // ---------- người que: rót trà, vẫy cờ ----------
  gNg.forEach(function (id, j) {
    api.origin("#" + id + "-tayL", "-22 -150"); api.origin("#" + id + "-tayR", "22 -150");
    var ph = (j % 3) * 0.3;
    for (var q = 0; q < 4; q++) api.key("#" + id + "-tayL", "rotation", 0.2 + ph + q * 0.9, q % 2 ? -50 : -20, "sine.inOut");
    if (j % 3 === 2) for (var w = 0; w < 12; w++) api.key("#" + id + "-tayR", "rotation", tC + w * 0.25 + j * 0.03, w % 2 ? -128 : -104, "sine.inOut");
  });
  xaNg.forEach(function (id, i) {
    api.origin("#" + id + "-tayR", "22 -150");
    if (i % 2 === 0) { api.key("#" + id + "-tayR", "rotation", 0, -20); for (var w = 0; w < 14; w++) api.key("#" + id + "-tayR", "rotation", tC - 0.2 + w * 0.24 + (i % 5) * 0.05, w % 2 ? -130 : -100, "sine.inOut"); }
  });

  // ---------- Wob ----------
  var SZ = 0.6;
  W.set(0, { x: 1330, y: G + 26, size: SZ, pupX: -10, pupY: 2 });
  W.mouth(0, "wobbly");
  api.show(W.kr.mohoi, 0, 1); api.show(W.kr.mohoi, tSwe + 1.2, 0);
  W.pose(0.1, 0.3, { sy: 0.96, sx: 1.03 }, "sine.inOut");
  for (var b = 0; b < 4; b++) { W.pose(0.3 + b * 0.5, 0.25, { sy: 1.02, sx: 0.98 }, "sine.inOut"); W.pose(0.55 + b * 0.5, 0.25, { sy: 0.97, sx: 1.02 }, "sine.inOut"); }
  W.pose(1.6, 0.25, { pupX: -12, pupY: 4, upRot: -3 }, "power2.out");   // nhìn hàng người
  W.pose(2.45, 0.25, { pupX: 12, pupY: -2, upRot: 3 }, "power2.out");   // nhìn nhà thờ
  W.mouth(2.45, "flat");
  // đi tới gần nhà có TV, ngó lên
  W.walk(tSwe - 0.2, tSwe + 0.8, 1330, 1470, { step: 0.28 });
  W.pose(tSwe + 0.9, 0.25, { pupX: -8, pupY: -14, upRot: -3 }, "power2.out");
  // thấy mình trên TV: chỉnh kính râm
  var tK = tLive + 0.2;
  W.soc(tLive - 0.25);
  W.pose(tK, 0.25, { aRu: -130, aRf: -120 }, "power2.out"); W.pose(tK + 0.35, 0.12, { aRf: -110 }, "sine.inOut"); W.pose(tK + 0.5, 0.12, { aRf: -124 }, "sine.inOut");
  W.pose(tK + 0.75, 0.25, { aRu: -18, aRf: 10 }, "power2.inOut"); W.mouth(tK + 0.6, "smirk");
  // Wob tí hon trên TV làm theo
  Wt.set(0, { x: -14, y: 27, size: 0.1 });
  Wt.pose(tK, 0.25, { aRu: -130, aRf: -120 }, "power2.out"); Wt.pose(tK + 0.75, 0.25, { aRu: -18, aRf: 10 }, "power2.inOut");
  Wt.walk(tSwe - 0.2, tSwe + 0.8, -30, -14, { step: 0.28 });
  // toàn cảnh: Wob vẫy cùng mọi người một nhịp
  W.pose(tC + 0.4, 0.2, { pupX: 0, pupY: -4, upRot: 0 }, "power2.out");
  W.vay(tC + 1.2, 4, "R");
  W.pose(tKing - 0.1, 0.25, { pupX: 10, pupY: -10, eye: 1.1 }, "power2.out"); W.mouth(tKing, "o"); W.pose(tKing + 0.8, 0.2, { eye: 1 }, "power2.out");
  // ngồi xuống vỉa hè với bánh quế
  var SX = 1180;
  W.walk(tSo - 0.1, tSo + 0.75, 1470, SX, { step: 0.28 });
  W.pose(tSo + 0.85, 0.25, { sy: 0.9, sx: 1.06, legL: 34, legR: -34, legLs: 0.6, legRs: 0.6 }, "power2.inOut");
  api.key("#W", "y", tSo + 0.85, G + 26, "none"); api.key("#W", "y", tSo + 1.1, G + 4, "power2.out");
  W.pose(tSo + 1.15, 0.2, { sy: 1, sx: 1 }, "back.out(2)");
  W.pose(tSo + 1.1, 0.3, { aLu: -14, aLf: 52, aRu: 14, aRf: -48, pupX: -10, pupY: 8 }, "power2.inOut");
  W.mouth(tSo + 1.1, "grin");
  var BX = SX - 96, BY = G - 52;
  ["#banh", "#banhC", "#nuaL", "#nuaR"].forEach(function (s0) { api.origin(s0, "0 0"); api.set(s0, 0, { x: BX, y: BY }); });
  api.key("#nuaL", "scale", 0, 0.78, "step"); api.key("#nuaR", "scale", 0, 0.78, "step"); api.key("#banhC", "scale", 0, 0.78, "step");
  api.show("#banh", 0, 0); api.show("#banh", tSo + 1.15, 1); api.show("#banh", tBun + 0.05, 0);
  api.show("#banhC", 0, 0); api.show("#banhC", tBun + 0.05, 1);
  api.key("#banh", "scale", 0, 0, "step"); api.key("#banh", "scale", tSo + 1.15, 0.2, "none"); api.key("#banh", "scale", tSo + 1.45, 0.78, "back.out(2)");
  // cắn
  W.pose(tBun - 0.3, 0.25, { upY: 14, upRot: -9, lean: -4, pupX: -14 }, "power2.in"); W.mouth(tBun - 0.25, "o");
  W.pose(tBun + 0.05, 0.12, { upY: 0, upRot: 0, lean: 0 }, "back.out(2)"); W.mouth(tBun + 0.05, "B");
  api.sfx("nuot", tBun + 0.1, 0.55);
  for (var c = 0; c < 4; c++) W.mouth(tBun + 0.25 + c * 0.16, c % 2 ? "B" : "A");
  W.mouth(tBun + 0.9, "smirk");
  // con chó đi tới, ngồi cạnh
  var CX = SX + 200;
  api.origin("#choG", "0 0"); api.set("#choG", 0, { x: 2400, y: G + 18, scale: 0.6 });
  api.key("#choG", "x", tDog - 0.3, 2400, "none"); api.key("#choG", "x", tSat, CX, "power2.out");
  for (var h = 0; h < 6; h++) api.key("#choG", "y", tDog - 0.3 + h * 0.18, h % 2 ? G + 10 : G + 18, "sine.inOut");
  api.key("#choG", "y", tSat, G + 18, "power2.out");
  api.key("#choG", "scaleY", tSat - 0.05, 1, "none"); api.key("#choG", "scaleY", tSat + 0.08, 0.92, "power2.in"); api.key("#choG", "scaleY", tSat + 0.24, 1, "back.out(2)");
  api.origin("#ch-duoi", "-56 -46");
  for (var dd = 0; dd < 10; dd++) api.key("#ch-duoi", "rotation", tSat + 0.3 + dd * 0.2, dd % 2 ? 12 : -8, "sine.inOut");
  W.pose(tSat + 0.1, 0.25, { pupX: 12, pupY: 2 }, "power2.out");   // Wob liếc con chó
  W.pose(tSat + 0.7, 0.3, { pupX: 10, pupY: -6 }, "power2.out");   // cả hai nhìn nhà thờ
  // "very seriously": chó quay sang nhìn cái bánh; Wob nhìn chó; dừng; bẻ đôi; chó ngậm rồi quay lại nhìn nhà thờ
  api.origin("#ch-dau", "40 -150");
  api.key("#ch-dau", "scaleX", 0, 1); api.key("#ch-dau", "scaleX", tSer - 0.05, 1, "none"); api.key("#ch-dau", "scaleX", tSer + 0.12, -1, "power2.inOut");
  api.key("#ch-dau", "rotation", 0, 0); api.key("#ch-dau", "rotation", tSer + 0.12, 10, "power2.out");
  W.pose(tSer + 0.15, 0.18, { pupX: 14, pupY: 6, upRot: 3 }, "power2.out"); W.mouth(tSer + 0.35, "flat");
  var tBr = tSer + 0.5;
  W.pose(tBr - 0.15, 0.15, { aLu: -10, aLf: 40 }, "power2.in");
  W.pose(tBr, 0.18, { aLu: -18, aLf: 58, aRu: -40, aRf: -30 }, "back.out(1.8)");
  api.show("#banhC", tBr, 0); api.show("#nuaL", 0, 0); api.show("#nuaR", 0, 0); api.show("#nuaL", tBr, 1); api.show("#nuaR", tBr, 1);
  api.key("#nuaL", "x", tBr, BX - 4, "none"); api.key("#nuaL", "x", tBr + 0.2, BX - 8, "power2.out"); api.key("#nuaL", "rotation", tBr + 0.2, -6, "power2.out");
  api.key("#nuaR", "x", tBr, BX + 4, "none"); api.key("#nuaR", "x", tBr + 0.2, BX + 60, "power2.out");
  var tGive = tBr + 0.22, tTake = tGive + 0.26;
  W.pose(tTake + 0.1, 0.25, { aRu: 14, aRf: -48 }, "power2.inOut");
  api.key("#nuaR", "x", tGive, BX + 60, "none"); api.key("#nuaR", "x", tTake, CX + 52, "power2.inOut");
  api.key("#nuaR", "y", tGive, BY, "none"); api.key("#nuaR", "y", tTake, G - 70, "power2.inOut");
  api.key("#nuaR", "scale", tGive, 0.78, "none"); api.key("#nuaR", "scale", tTake, 0.3, "power2.inOut");
  api.show("#nuaR", tTake, 0); api.show("#ch-nua", 0, 0); api.show("#ch-nua", tTake, 1);
  api.key("#ch-dau", "scaleX", tTake + 0.02, -1, "none"); api.key("#ch-dau", "scaleX", tTake + 0.14, 1, "power2.inOut");
  api.key("#ch-dau", "rotation", tTake + 0.02, 10, "none"); api.key("#ch-dau", "rotation", tTake + 0.14, -4, "power2.out");
  W.pose(tTake + 0.3, 0.25, { pupX: 10, pupY: -6, upRot: 0 }, "power2.out"); W.mouth(tTake + 0.3, "smirk");
  W.idle(tSo + 1.3, DUR, { seed: 25, bien: 1.2 });
  W.autoBlink(0, DUR, 2501);
};
