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
/* Đoạn d28 · cắt giấy · tháng 8: dự báo mới của LKAB.
   A: tờ lịch bóc trước nhà thờ đỏ đã đỗ, Wob xé đúng tám trang trống. B: hội trường, người que KHÔNG mặt quay lưng, bản đồ dự báo (lưới phố trừu tượng,
   không chữ) ghim lên bảng đúng "forecast."; tiền cảnh vai người; vùng sọc lan về phía đông, phủ ô nhà có cửa gỗ ở "homes"; Wob kiễng chân sau đám đông,
   người bên cạnh lặng lẽ dịch sang nhường chỗ. C: Wob tháo kính, thẻ "~12,000 people · ~5,400 homes" ở "twelve". D: vỉa hè nhìn ra thị trấn, hai phần ba mái nhà
   bật thùng các-tông từ "two thirds" tới "itself."; Wob tháo chùm chìa khỏi quai, cầm trước ngực, nhìn các mái có thùng, im ≥ 1,5 s; camera đẩy chậm vào
   một nhà nhỏ trong vùng sọc, Wob nghiêng đầu. Không gag (đoạn nghiêm). Vào "giay", ra "cat". Chữ: chỉ chu_tren_do_vat. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tLKAB = T("lkab", 0, 2.763), tFore = T("forecast.", 0, 3.95), tAbout = T("about", 0, 5.0), tHomes = T("homes", 0, 8.65), tAlt = T("altogether,", 0, 12.025),
    tTwelve = T("twelve", 0, 15.588), tHomes2 = T("homes", 1, 18.5), tThat = T("that's", 0, 19.312), tTwo = T("two", 1, 19.9), tTown = T("itself.", 0, 20.94),
    tI = T("i", 0, 21.312), tHeld = T("held", 0, 21.5), tSo = T("so", 0, 24.025), tHouse = T("house", 0, 24.95);
  var tA1 = tLKAB - 0.06, tD = tThat - 0.02;

  // =================== D (lớp có thị sai): vỉa hè nhìn ra thị trấn ===================
  var GD = 985;
  var troi = '<rect x="-300" y="-300" width="2520" height="1680" fill="url(#krHe)"/>' + at(420, 180, KR.may(240, 2801)) + at(1520, 140, KR.may(200, 2802));
  var xa = KR.nuiXa(-700, 2600, 770, 110, "#B7C9B0", 2811);
  xa += paper("M -380 770 L -210 560 L 160 545 L 330 770 Z", "#8E8A84", { shadow: false }) + line("M -250 610 L 180 600 M -300 670 L 240 662 M -340 728 L 290 722", 4, "#6F6B66", ' opacity="0.7"');
  xa += '<rect x="-800" y="766" width="3600" height="600" fill="' + M.coSang + '"/>';
  // thị trấn: hai hàng nhà; vùng sọc mờ trên nền dưới các nhà phía tây
  var gi = '<rect x="-800" y="780" width="3600" height="600" fill="' + M.co + '"/>';
  gi += '<path d="M 470 772 L 1560 772 L 1600 900 L 430 900 Z" fill="url(#krSoc)" opacity="0.75"/>' + line("M 470 772 L 1560 772 L 1600 900 L 430 900 Z", 4, "#A8322A", ' stroke-dasharray="16 12" opacity="0.6"');
  var nha = [], thung = [];
  function themNha(x, y, sc, w, h, mau, mai, cua, sd, coThung) {
    var id = "n" + nha.length;
    gi += '<g id="' + id + '">' + at(x, y, KR.nhaGo({ w: w, h: h, mau: mau, mai: mai, cua: cua, sd: sd }), sc) + "</g>";
    if (coThung) {
      var bx = x, by = y - (h + w * 0.42) * sc + 14 * sc, tid = "th" + thung.length;
      gi += '<g id="' + tid + '">' + at(bx, by, KR.thungGiay(76, sd + 40), sc) + "</g>";
      thung.push({ id: tid, x: bx, y: by });
    }
    nha.push(id);
  }
  var hauBox = [1, 1, 0, 1, 1, 0, 1, 1, 0], truocBox = [1, 0, 1, 1, 1, 0, 1, 1];
  for (var i = 0; i < 9; i++) themNha(560 + i * 160, 790, 0.62, 190, 150, M.nha[(i * 2 + 1) % 6], M.mai[i % 3], false, 2820 + i * 11, hauBox[i]);
  var nhaDich = null;
  for (var j = 0; j < 8; j++) {
    var laDich = j === 3;
    themNha(520 + j * 196, 880, 0.8, laDich ? 170 : 200, laDich ? 140 : 155, laDich ? M.nha[3] : M.nha[j % 6], M.mai[(j + 1) % 3], laDich, 2920 + j * 13, truocBox[j]);
    if (laDich) nhaDich = [520 + j * 196, 880];
  }
  var gan = '<rect x="-800" y="935" width="3600" height="600" fill="#CFC8BA"/>' + paper(rRect(-800, 922, 3600, 24, 2, 2861), "#B5AD9E", { shadow: false });
  for (var g2 = -6; g2 < 18; g2++) gan += line("M " + (g2 * 170) + " 950 L " + (g2 * 170 - 40) + " 1100", 3, "#A9A193", ' opacity="0.7"');
  gan += at(150, 940, line("M 0 0 L 0 -520", 14) + line("M 0 0 L 0 -520", 8, "#4A5450") + paper(rRect(-34, -560, 68, 44, 2, 2862), "#4A5450", { stroke: true, sw: 4, shadow: false }) + '<rect x="-24" y="-524" width="48" height="10" fill="#FFE6A8"/>');
  var rR = '<g id="rR">' + KR.chumChia("rRi", { kr: true }) + "</g>";
  var W = KR.wob(api, "W", { mua: "he", chum: "kr", kinh: 0, holdR: rR });
  gan += W.svg;

  // =================== A: tờ lịch bóc trước nhà thờ ===================
  var CX = 650, CY = 560;   // đỉnh bảng lịch
  var a = '<g id="sA"><g id="sAk">';
  a += '<rect x="-800" y="-600" width="3600" height="2400" fill="url(#krHe)"/>' + at(1500, 200, KR.may(220, 2871));
  a += KR.nuiXa(-700, 2600, 800, 90, "#B7C9B0", 2872) + '<rect x="-800" y="796" width="3600" height="900" fill="' + M.co + '"/>';
  a += at(1220, 905, KR.romooc("rmA", 820), 0.72) + at(1220, 905 - 64 * 0.72, KR.nhaTho("ntA"), 0.72);
  a += at(1640, 905, KR.thapChuong("thA"), 0.72);
  // giá lịch
  a += line("M " + (CX - 90) + " " + (CY + 280) + " L " + (CX - 120) + " 905 M " + (CX + 90) + " " + (CY + 280) + " L " + (CX + 120) + " 905", 12) +
    line("M " + (CX - 90) + " " + (CY + 280) + " L " + (CX - 120) + " 905 M " + (CX + 90) + " " + (CY + 280) + " L " + (CX + 120) + " 905", 6, M.goSang);
  a += paper(rRect(CX - 130, CY, 260, 300, 2, 2873), M.go, { stroke: true, sw: 5, sx: 6, sy: 8 });
  a += paper(rRect(CX - 118, CY + 22, 236, 262, 1.5, 2874), "#E8DCC4", { stroke: true, sw: 3, shadow: false });   // trang cuối (còn lại)
  a += paper(rRect(CX - 118, CY + 22, 236, 46, 1, 2875), "#C9463A", { shadow: false });
  var trang = [];
  for (var p = 0; p < 8; p++) {
    var pid = "tr" + p;
    a += '<g id="' + pid + '">' + paper(rRect(CX - 118, CY + 22, 236, 262, 1.5, 2880 + p), p % 2 ? "#FBF5E8" : "#F6EEDC", { stroke: true, sw: 3, shadow: false }) +
      paper(rRect(CX - 118, CY + 22, 236, 46, 1, 2890 + p), "#C9463A", { shadow: false }) + line("M " + (CX - 90) + " " + (CY + 120) + " L " + (CX + 90) + " " + (CY + 120), 3, "#D8CCB4") + "</g>";
    trang.push(pid);
  }
  for (var r = -1; r <= 1; r++) a += '<rect x="' + (CX + r * 70 - 6) + '" y="' + (CY + 8) + '" width="12" height="30" rx="6" fill="#B8BDC2" stroke="' + INK + '" stroke-width="3"/>';
  var Wa = KR.wob(api, "Wa", { mua: "he", chum: "kr" });
  a += Wa.svg + "</g></g>";

  // =================== B/C: hội trường ===================
  var BX = 520, BY = 120, BW = 880, BH = 580, MX = 600, MY = 170, MW = 720, MHt = 380;
  var h = '<g id="sH"><g id="sHk">';
  h += '<rect x="-800" y="-600" width="3600" height="2400" fill="#D9CDB4"/><rect x="-800" y="-600" width="3600" height="2400" fill="url(#half)" opacity="0.06"/>';
  h += '<rect x="-800" y="760" width="3600" height="900" fill="#B89A72"/>' + line("M -800 760 L 2800 760", 6, "#8E7250");
  for (var wl = -4; wl < 22; wl++) h += line("M " + (wl * 120) + " 766 L " + (wl * 120) + " 1600", 3, "#A2865E", ' opacity="0.6"');
  h += at(160, 420, '<ellipse cx="0" cy="0" rx="260" ry="200" fill="url(#krDen)"/>');
  // bảng ghim gỗ + bản đồ
  h += paper(rRect(BX, BY, BW, BH, 2, 2901), M.goToi, { stroke: true, sw: 5, sx: 6, sy: 8 }) + paper(rRect(BX + 18, BY + 18, BW - 36, BH - 36, 1.5, 2902), "#C49A68", { shadow: false });
  var mp = "";
  mp += paper(rRect(0, 0, MW, MHt, 1.5, 2903), "#F3EBDA", { stroke: true, sw: 4, shadow: false });
  mp += paper("M 14 30 L 70 14 L 104 60 L 96 360 L 14 366 Z", "#A39C90", { stroke: true, sw: 3, shadow: false }) + line("M 22 110 L 92 106 M 20 190 L 96 186 M 20 270 L 96 266", 3, "#8A8378");   // mỏ phía tây
  var cot = [];
  for (var c = 1; c < 8; c++) for (var rw = 0; rw < 4; rw++) {
    var bx0 = 22 + c * 86, by0 = 22 + rw * 88;
    mp += paper(rRect(bx0, by0, 72, 74, 1, 2910 + c * 7 + rw), ["#E2CFA8", "#D6C39C", "#E8D8B6"][(c + rw) % 3], { stroke: true, sw: 2.5, shadow: false });
  }
  // ô nhà có cửa gỗ (cột 5, hàng 2)
  var DX = 22 + 5 * 86 + 36, DY = 22 + 2 * 88 + 62;
  mp += at(DX, DY, KR.nhaGo({ w: 52, h: 40, mau: M.nha[3], mai: M.mai[0], cua: true, sd: 2940 }));
  // vùng sọc: cột 1–2 có sẵn, cột 3–5 lan dần
  for (var sc2 = 1; sc2 <= 5; sc2++) {
    var x0 = 22 + sc2 * 86 - 8;
    var z = '<rect x="' + x0 + '" y="14" width="88" height="352" fill="url(#krSoc)"/>' + line("M " + x0 + " 14 L " + x0 + " 366", 0.1, "none");
    mp += '<g id="soc' + sc2 + '">' + z + "</g>";
    cot.push("#soc" + sc2);
  }
  mp += '<path id="vienSoc" d="M 100 14 L 552 14 L 552 366 L 100 366 Z" fill="none" stroke="#A8322A" stroke-width="5" stroke-dasharray="18 12"/>';
  h += '<g id="mapB" transform="translate(' + MX + "," + MY + ')">' + mp + "</g>";
  h += '<g id="ghim">' + [[MX + 14, MY + 12], [MX + MW - 14, MY + 12], [MX + 14, MY + MHt - 12], [MX + MW - 14, MY + MHt - 12]].map(function (q, k) {
    return '<g id="gh' + k + '">' + at(q[0], q[1], '<circle r="11" fill="#C9463A" stroke="' + INK + '" stroke-width="3"/><circle cx="-3" cy="-3" r="3" fill="#FFFFFF" opacity="0.7"/>') + "</g>";
  }).join("") + "</g>";
  h += '<g id="theB">' + at(960, 652, KR.the("theBi", CH[0], 46, { seed: 2950 })) + "</g>";
  // người trình bày (bên phải bảng) + hàng người xem phía trong
  h += at(1520, 900, KR.nguoi("ptb", { ao: "#4E5A66", da: M.da2 }), 0.85);
  var hang1 = [];
  [600, 745, 890, 1035, 1180, 1330].forEach(function (x, k) {
    h += at(x, 930, KR.nguoi("h1" + k, { ao: M.ao1[(k * 3 + 1) % 8], da: [M.da1, M.da2, M.da3][k % 3], sau: true, mu: k === 2 ? "#4F7A5A" : null }), 0.8);
    hang1.push("h1" + k);
  });
  var Wh = KR.wob(api, "Wh", { mua: "he", chum: "kr" });
  h += Wh.svg;
  // hàng người xem phía ngoài; "hx" là người lặng lẽ nhường chỗ
  [[330, 0], [1010, 2], [1300, 3], [1580, 4]].forEach(function (q) { h += at(q[0], 1000, KR.nguoi("h2" + q[1], { ao: M.ao1[(q[1] * 5 + 2) % 8], da: [M.da3, M.da1, M.da2][q[1] % 3], sau: true })); });
  h += '<g id="hx" transform="translate(690,1000)">' + KR.nguoi("hxi", { ao: "#8E5A4A", da: M.da1, sau: true }) + "</g>";
  h += "</g>";
  // tiền cảnh: vai người (thị sai 1,3)
  h += '<g id="sHf">' + at(260, 1090, '<path d="M -230 40 C -220 -90 -120 -150 0 -150 C 120 -150 220 -90 230 40 Z" fill="#2E3440"/><circle cx="0" cy="-230" r="110" fill="#3A3330"/>') +
    at(1460, 1110, '<path d="M -250 40 C -240 -100 -130 -160 0 -160 C 130 -160 240 -100 250 40 Z" fill="#3B4250"/><circle cx="0" cy="-250" r="118" fill="#2E2925"/>') + "</g>";
  h += "</g>";

  api.dat(KR.defs() + troi + api.lop("xa", xa, 0.35, { mat: 770 }) + api.lop("giua", gi, 0.7, { mat: 880 }) + api.lop("gan", gan, 1, { mat: 1000 }) + h + a);
  api.noi({});
  api.show(W.kr.chumQ, 0, 1);

  // =================== A ===================
  KR.cat(api, "#sA", 0, tA1);
  KR.camNhom(api, [["#sAk", 1]], [[0, 820, 650, 1.42], [tA1, 800, 656, 1.5, "sine.inOut"]]);
  var WAX = 420;
  Wa.set(0, { x: WAX, y: 905, size: 0.55, pupX: 12, pupY: 4 });
  Wa.mouth(0, "flat");
  var t0 = 0.6, dt = 0.235;
  trang.slice().reverse().forEach(function (pid, k) {
    var tg = t0 + k * dt, sel = "#" + pid;
    Wa.pose(tg - 0.11, 0.09, { aRu: -92, aRf: 64 }, "power2.out");                 // nắm góc trang
    Wa.pose(tg, 0.1, { aRu: -80, aRf: -120, upRot: k % 2 ? 2 : -2 }, "power2.in");   // giật lên
    api.origin(sel, CX + " " + (CY + 22));
    api.key(sel, "rotation", 0, 0); api.key(sel, "rotation", tg, 0, "none"); api.key(sel, "rotation", tg + 0.45, -38 - k * 3, "power1.out");
    api.key(sel, "x", 0, 0); api.key(sel, "x", tg, 0, "none"); api.key(sel, "x", tg + 0.45, -260 - (k % 3) * 40, "power1.out");
    api.key(sel, "y", 0, 0); api.key(sel, "y", tg, 0, "none"); api.key(sel, "y", tg + 0.2, -150, "power2.out"); api.key(sel, "y", tg + 0.45, -60 + (k % 2) * 40, "power1.in");
    api.key(sel, "opacity", 0, 1); api.key(sel, "opacity", tg + 0.2, 1, "none"); api.key(sel, "opacity", tg + 0.45, 0, "power1.in");
  });
  var tHet = t0 + 7 * dt + 0.15;
  Wa.pose(tHet, 0.3, { aRu: -18, aRf: 10, upRot: 0, pupX: 14, pupY: -6 }, "power2.inOut");   // nhìn sang nhà thờ
  Wa.mouth(tHet + 0.1, "flat");
  Wa.autoBlink(0, tA1, 2811);
  api.sfx("lat-giay", t0, 0.4); api.sfx("lat-giay", t0 + 4 * dt, 0.32);

  // =================== B/C: hội trường ===================
  KR.cat(api, "#sH", tA1, tD);
  var camH = [[0, 960, 470, 1.12], [tA1, 960, 470, 1.12, "none"], [tAbout - 0.04, 960, 452, 1.2, "sine.inOut"], [tAbout - 0.02, 860, 600, 1.34, "none"],
    [tAlt + 0.6, 920, 588, 1.42, "sine.inOut"], [tAlt + 1.9, 1000, 560, 1.34, "power2.inOut"], [tD, 1002, 556, 1.39, "sine.inOut"]];
  KR.camNhom(api, [["#sHk", 1]], camH);
  KR.camNhom(api, [["#sHf", 1.3]], camH);
  KR.cat(api, "#sHf", tAbout - 0.02, null);
  // bản đồ cuộn xuống rồi ghim đúng "forecast."
  api.origin("#mapB", MX + " " + MY);
  api.key("#mapB", "scaleY", 0, 0.02); api.key("#mapB", "scaleY", tFore - 0.6, 0.02, "none"); api.key("#mapB", "scaleY", tFore - 0.05, 1, "power2.out");
  api.show("#mapB", 0, 0); api.show("#mapB", tFore - 0.6, 1);
  for (var gk = 0; gk < 4; gk++) { api.origin("#gh" + gk, "0 0"); api.pop("#gh" + gk, tFore - 0.02 + gk * 0.05, 0.16); }
  api.sfx("lat-giay", tFore - 0.05, 0.3);
  api.origin("#ptb-tayR", "22 -150"); api.key("#ptb-tayR", "rotation", 0, 0); api.key("#ptb-tayR", "rotation", tFore - 0.7, 0, "none");
  api.key("#ptb-tayR", "rotation", tFore - 0.2, 150, "power2.out"); api.key("#ptb-tayR", "rotation", tAbout + 0.6, 150, "none"); api.key("#ptb-tayR", "rotation", tAbout + 1.2, 128, "sine.inOut");
  // vùng sọc: cột 1–2 có sẵn, 3–5 lan theo lời, cột 5 phủ ô cửa gỗ đúng "homes"
  var tSoc = [0, 0, tAbout + 1.2, tAbout + 2.5, tHomes - 0.12];
  cot.forEach(function (sel, k) {
    var x0 = MX + 22 + (k + 1) * 86 - 8;
    if (k < 2) return;
    api.origin(sel, (22 + (k + 1) * 86 - 8) + " 0");
    api.key(sel, "scaleX", 0, 0); api.key(sel, "scaleX", tSoc[k], 0, "none"); api.key(sel, "scaleX", tSoc[k] + 0.3, 1, "power2.out");
  });
  api.origin("#vienSoc", "100 0");
  api.key("#vienSoc", "scaleX", 0, 194 / 452); api.key("#vienSoc", "scaleX", tSoc[2], 194 / 452, "none"); api.key("#vienSoc", "scaleX", tSoc[2] + 0.3, 280 / 452, "power2.out");
  api.key("#vienSoc", "scaleX", tSoc[3], 280 / 452, "none"); api.key("#vienSoc", "scaleX", tSoc[3] + 0.3, 366 / 452, "power2.out");
  api.key("#vienSoc", "scaleX", tSoc[4], 366 / 452, "none"); api.key("#vienSoc", "scaleX", tSoc[4] + 0.3, 1, "power2.out");
  // người xem hàng trong: thở, nghiêng đầu nhẹ (lệch pha)
  hang1.forEach(function (id, k) {
    api.origin("#" + id + "-dau", "0 -190");
    for (var b = 0; b < 6; b++) api.key("#" + id + "-dau", "rotation", tA1 + 0.4 + k * 0.37 + b * 2.6, (b + k) % 2 ? 3 : -3, "sine.inOut");
  });
  // Wob sau đám đông
  var WHX = 600, WHY = 985;
  Wh.set(0, { x: WHX, y: WHY, size: 0.5, pupX: 12, pupY: -14 });
  Wh.mouth(0, "flat");
  Wh.idle(tA1, tAbout + 0.2, { seed: 281, bien: 1.2 });
  // kiễng chân hai lần, nghiêng ngó
  [tAbout + 0.3, tAbout + 1.4].forEach(function (tk, k) {
    api.key("#Wh", "y", tk, WHY, "none"); api.key("#Wh", "y", tk + 0.25, WHY - 26, "power2.out"); api.key("#Wh", "y", tk + 0.8, WHY - 26, "none"); api.key("#Wh", "y", tk + 1.0, WHY, "power2.in");
    Wh.pose(tk, 0.25, { sy: 1.08, sx: 0.95, legL: 6, legR: -6, lean: k ? 7 : -7, pupX: 14, pupY: -18 }, "power2.out");
    Wh.pose(tk + 0.8, 0.2, { sy: 1, sx: 1, legL: 0, legR: 0, lean: 0 }, "power2.in");
  });
  // người bên cạnh liếc xuống rồi dịch sang nhường chỗ
  var tNh = tAbout + 2.45;
  api.origin("#hxi-dau", "0 -190");
  api.key("#hxi-dau", "rotation", 0, 0); api.key("#hxi-dau", "rotation", tNh - 0.4, 0, "none"); api.key("#hxi-dau", "rotation", tNh - 0.1, -12, "power2.out"); api.key("#hxi-dau", "rotation", tNh + 0.5, 0, "sine.inOut");
  api.key("#hx", "x", 0, 690); api.key("#hx", "x", tNh, 690, "none"); api.key("#hx", "x", tNh + 0.75, 840, "sine.inOut");
  for (var hb = 0; hb < 4; hb++) api.key("#hx", "y", tNh + hb * 0.19, 1000 - (hb % 2 ? 0 : 8), "sine.inOut");
  api.key("#hx", "y", tNh + 0.8, 1000, "sine.out");
  Wh.pose(tNh + 0.2, 0.3, { pupX: 10, pupY: -6 }, "power2.out");
  Wh.walk(tNh + 0.55, tNh + 1.05, WHX, WHX + 70, { step: 0.25 });
  Wh.pose(tHomes - 0.2, 0.3, { pupX: 14, pupY: -20, upRot: -3 }, "power2.out");
  Wh.mouth(tHomes + 0.2, "o"); Wh.mouth(tHomes + 1.3, "flat");
  Wh.pose(tHomes + 0.25, 0.4, { lid: 10 }, "power2.out");
  // chạm khẽ chùm chìa trên quai rồi buông
  Wh.pose(tHomes + 1.6, 0.4, { aRu: 94, aRf: 130 }, "power2.inOut");
  Wh.pose(tHomes + 2.7, 0.4, { aRu: -18, aRf: 10 }, "power2.inOut");
  Wh.idle(tHomes + 0.4, tAlt, { seed: 282, bien: 1.0 });
  // tháo kính râm, cất vào túi
  Wh.pose(tAlt + 0.1, 0.28, { aRu: 98, aRf: 52, pupX: 0, pupY: 0, upRot: 0 }, "power2.inOut");
  api.show(Wh.kr.kinh, tAlt + 0.42, 0);
  Wh.pose(tAlt + 0.5, 0.3, { aRu: 9, aRf: 3, pupX: 14, pupY: -20 }, "power2.inOut");
  Wh.pose(tAlt + 1.1, 0.3, { aRu: -18, aRf: 10 }, "power2.inOut");
  // đọc thẻ: mắt chạy theo dòng chữ
  api.pop("#theB", tTwelve - 0.08, 0.26);
  api.origin("#theB", "960 652");
  Wh.pose(tTwelve + 0.15, 0.3, { pupX: 4, pupY: -12, lid: 0 }, "power2.out");
  Wh.pose(tTwelve + 0.6, 1.5, { pupX: 16, pupY: -12 }, "sine.inOut");
  Wh.pose(tHomes2 + 0.1, 0.25, { sy: 0.96, sx: 1.03, lid: 12 }, "power2.out");
  Wh.idle(tAlt + 1.4, tD, { seed: 283, bien: 0.9 });
  Wh.autoBlink(tA1, tD, 2821);

  // =================== D ===================
  api.camera([[0, 520, 790, 1.6], [tD, 520, 790, 1.6, "none"], [tD + 1.0, 1080, 640, 1.05, "sine.inOut"], [tI - 0.05, 1060, 650, 1.08, "sine.inOut"],
    [tI + 0.7, 900, 700, 1.18, "power2.inOut"], [tSo, 880, 702, 1.24, "sine.inOut"], [DUR, 930, 722, 1.38, "power1.inOut"]]);
  W.set(0, { x: 300, y: GD + 30, size: 0.8, pupX: 14, pupY: -10 });
  W.mouth(0, "flat");
  W.walk(tD + 0.05, tD + 0.55, 330, 430, { step: 0.25 });
  // thùng các-tông bật lên trên hai phần ba mái nhà
  var tb0 = tTwo, tb1 = tTown + 0.3;
  thung.forEach(function (o, k) {
    var tt = tb0 + (tb1 - tb0) * (k / (thung.length - 1));
    api.origin("#" + o.id, f1(o.x) + " " + f1(o.y));
    api.key("#" + o.id, "scale", 0, 0); api.key("#" + o.id, "scale", tt, 0, "none"); api.key("#" + o.id, "scale", tt + 0.24, 1, "back.out(2)");
  });
  W.pose(tb0 - 0.1, 0.3, { pupX: 4, pupY: -12 }, "power2.out");
  W.pose(tb0 + 0.4, 0.5, { pupX: 16, pupY: -10 }, "sine.inOut");
  W.pose(tb1, 0.3, { pupX: 12, pupY: -12, lid: 8 }, "power2.out");
  // tháo chùm chìa khỏi quai, cầm trước ngực
  api.show("#rR", 0, 0);
  W.pose(tI + 0.02, 0.3, { aRu: 94, aRf: 130, pupX: 6, pupY: 0 }, "power2.inOut");
  api.show(W.kr.chumQ, tHeld + 0.15, 0); api.show("#rR", tHeld + 0.15, 1);
  W.pose(tHeld + 0.2, 0.4, { aRu: 36, aRf: 52, aLu: -36, aLf: -52, pupX: 12, pupY: -12 }, "power2.inOut");
  KR.thong(api, W, "R", "#rR", 0, DUR, { goc: 0, lac: 0.8 });
  W.pose(tHeld + 0.9, 0.5, { lid: 14 }, "sine.inOut");
  W.idle(tD + 0.6, tSo, { seed: 284, bien: 0.8 });
  // "So what happens to a house in the way?": nghiêng đầu nhìn ngôi nhà nhỏ trong vùng sọc
  W.pose(tSo + 0.1, 0.5, { upRot: -8, pupX: 14, pupY: -6, lid: 6 }, "power2.inOut");
  W.pose(tHouse, 0.4, { lean: 2 }, "sine.inOut");
  W.autoBlink(tD, DUR, 2831);
};
