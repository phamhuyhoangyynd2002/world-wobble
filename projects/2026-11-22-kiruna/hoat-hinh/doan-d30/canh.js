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
/* Đoạn d30 · cắt giấy · tháng 8: tới trung tâm mới.
   1 trang sổ map-kiruna-centre: Wob tí hon đeo ba lô đi theo nét đứt Old centre → New centre (approx.), thẻ "~3 km east" ở "three".
   2 phố hè cỏ xanh, đi bộ thị sai. 3 quảng trường mới, dây cờ giấy, thẻ "Sept 2022" ở "September"; gag: nhặt mẩu hoa giấy sót, ngắm, bỏ túi gi-lê.
   4 Kristallen (toà tròn kính và đá, không chữ) lấp lánh, mặt kính phản chiếu Wob tí hon, kính râm loé (ting). 5 Wob chắp tay đi một vòng quanh toà nhà.
   6 lướt sang tháp đồng hồ khung sắt (chỉ kim, vạch), Wob ngửa cổ. 7 Wob bé tí dưới chân tháp. 8 đồng hồ quả quýt chạy nhanh, Wob lặng lẽ vặn lại;
   kim phút tháp nhích một nấc đúng "minute.", giữ tới cắt. Vào "cat", ra "chen". Chữ: chỉ chu_tren_do_vat. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tThree = T("three", 0, 1.8), tGoing = T("going.", 0, 3.725), tThe = T("the", 0, 4.438), tSep = T("september", 0, 5.588), tParty = T("party.", 0, 7.713),
    tHall = T("the", 1, 8.475), tKris = T("kristallen,", 0, 10.613), tIt = T("it", 0, 12.863), tNext = T("next", 0, 15.188), tStood = T("i", 1, 19.75),
    tClock = T("the", 5, 21.087), tMin = T("minute.", 0, 23.325);
  var t1 = tGoing - 0.45, t2 = tThe - 0.04;

  // =================== quảng trường (lớp có thị sai) ===================
  var G = 900;
  var troi = '<rect x="-800" y="-800" width="3600" height="2600" fill="url(#krHe)"/>' + at(300, 120, KR.may(260, 3001)) + at(1300, 60, KR.may(220, 3002)) + at(2200, 150, KR.may(240, 3003));
  var xa = KR.nuiXa(-900, 2900, 760, 110, "#B7C9B0", 3011) + '<rect x="-900" y="756" width="3800" height="900" fill="' + M.coSang + '"/>';
  [[-300, 0], [-60, 2], [2050, 4], [2300, 1], [2560, 5]].forEach(function (n, i) { xa += at(n[0], 770, KR.nhaGo({ w: 200, h: 220, mau: M.nha[n[1]], mai: M.mai[i % 3], sd: 3020 + i * 7 }), 0.9); });
  var gi = '<rect x="-900" y="' + (G - 40) + '" width="3800" height="900" fill="#CFC6B4"/>';
  for (var px = -900; px < 2900; px += 90) gi += line("M " + px + " " + (G - 36) + " L " + (px - 60) + " " + (G + 300), 3, "#B6AC98", ' opacity="0.7"');
  for (var py = G - 10; py < G + 300; py += 46) gi += line("M -900 " + py + " L 2900 " + py, 2.5, "#B6AC98", ' opacity="0.6"');
  // Kristallen: toà tròn, dải kính xen dải đá, mái phẳng elip; KHÔNG chữ
  var KX = 900, KW = 760, KH = 360, ky = G - 40;
  var kr = '<g id="kris">';
  kr += '<ellipse cx="' + KX + '" cy="' + ky + '" rx="' + (KW / 2 + 30) + '" ry="40" fill="#000" opacity="0.12"/>';
  kr += paper("M " + (KX - KW / 2) + " " + (ky - KH) + " L " + (KX + KW / 2) + " " + (ky - KH) + " L " + (KX + KW / 2) + " " + ky + " C " + (KX + KW / 2) + " " + (ky + 40) + " " + (KX - KW / 2) + " " + (ky + 40) + " " + (KX - KW / 2) + " " + ky + " Z", "#9E9A90", { stroke: true, sw: 5, sx: 6, sy: 8 });
  for (var b = 0; b < 3; b++) {
    var by = ky - KH + 30 + b * 110;
    kr += '<path d="M ' + (KX - KW / 2 + 6) + " " + by + " L " + (KX + KW / 2 - 6) + " " + by + " L " + (KX + KW / 2 - 6) + " " + (by + 72) + " C " + (KX + KW / 4) + " " + (by + 92) + " " + (KX - KW / 4) + " " + (by + 92) + " " + (KX - KW / 2 + 6) + " " + (by + 72) + ' Z" fill="url(#krKinh)" stroke="' + INK + '" stroke-width="3.5"/>';
    for (var mx = -5; mx <= 5; mx++) kr += line("M " + (KX + mx * 64) + " " + by + " L " + (KX + mx * 64) + " " + (by + 72 + 18 * Math.cos(mx / 6)), 2.5, "#4A6474", ' opacity="0.7"');
  }
  kr += paper("M " + (KX - KW / 2 - 20) + " " + (ky - KH) + " C " + (KX - KW / 2 - 20) + " " + (ky - KH - 50) + " " + (KX + KW / 2 + 20) + " " + (ky - KH - 50) + " " + (KX + KW / 2 + 20) + " " + (ky - KH) + " C " + (KX + KW / 2 + 20) + " " + (ky - KH + 30) + " " + (KX - KW / 2 - 20) + " " + (ky - KH + 30) + " " + (KX - KW / 2 - 20) + " " + (ky - KH) + " Z", "#7E7A72", { stroke: true, sw: 5, shadow: false });
  kr += line("M " + (KX - 300) + " " + (ky - KH + 50) + " L " + (KX - 220) + " " + (ky - KH + 130) + " M " + (KX + 120) + " " + (ky - KH + 160) + " L " + (KX + 200) + " " + (ky - KH + 240), 8, "#FFFFFF", ' opacity="0.45"');
  kr += paper(rRect(KX - 60, ky - 120, 120, 120, 1.2, 3031), "url(#krKinh)", { stroke: true, sw: 4, shadow: false }) + line("M " + KX + " " + (ky - 120) + " L " + KX + " " + ky, 3);
  // phản chiếu Wob tí hon trong kính (nhóm id "phan")
  var Wr = KR.wob(api, "Wr", { mua: "he", kinh: 1 });
  kr += '<g id="phan" opacity="0.5">' + Wr.svg + "</g>";
  var lap = [];
  [[KX - 240, ky - KH + 70], [KX + 180, ky - KH + 190], [KX - 60, ky - KH + 300], [KX + 300, ky - KH + 60], [KX - 330, ky - KH + 260]].forEach(function (q, i) {
    kr += '<g id="lap' + i + '">' + at(q[0], q[1], D.sparkle(34, "#FFF8D8")) + "</g>"; lap.push("#lap" + i);
  });
  kr += "</g>";
  gi += kr;
  // tháp đồng hồ khung sắt cũ (chỉ kim, vạch; KHÔNG số)
  var TX = 1720, TOP = 90, CLY = 230, CR = 84;
  var th = "";
  th += line("M " + (TX - 90) + " " + G + " L " + (TX - 50) + " " + (TOP + 60) + " M " + (TX + 90) + " " + G + " L " + (TX + 50) + " " + (TOP + 60), 16) + line("M " + (TX - 90) + " " + G + " L " + (TX - 50) + " " + (TOP + 60) + " M " + (TX + 90) + " " + G + " L " + (TX + 50) + " " + (TOP + 60), 9, "#4A5450");
  for (var ty = G - 80; ty > CLY + 100; ty -= 110) {
    var w0 = 90 - (G - ty) * (40 / (G - TOP - 60)), w1 = 90 - (G - ty + 110) * (40 / (G - TOP - 60));
    th += line("M " + f1(TX - w0) + " " + ty + " L " + f1(TX + w1) + " " + (ty - 110) + " M " + f1(TX + w0) + " " + ty + " L " + f1(TX - w1) + " " + (ty - 110) + " M " + f1(TX - w0) + " " + ty + " L " + f1(TX + w0) + " " + ty, 6, "#4A5450");
  }
  th += paper("M " + (TX - 70) + " " + (TOP + 60) + " L " + TX + " " + TOP + " L " + (TX + 70) + " " + (TOP + 60) + " Z", "#3E4644", { stroke: true, sw: 5, shadow: false });
  th += line("M " + TX + " " + TOP + " L " + TX + " " + (TOP - 40), 6);
  th += '<circle cx="' + TX + '" cy="' + CLY + '" r="' + (CR + 14) + '" fill="#3E4644" stroke="' + INK + '" stroke-width="5"/><circle cx="' + TX + '" cy="' + CLY + '" r="' + CR + '" fill="#F4EEDC" stroke="' + INK + '" stroke-width="4"/>';
  for (var v = 0; v < 60; v++) { var aa = v * 6 * Math.PI / 180, r0 = v % 5 ? CR - 8 : CR - 18; th += line("M " + f1(TX + Math.sin(aa) * r0) + " " + f1(CLY - Math.cos(aa) * r0) + " L " + f1(TX + Math.sin(aa) * (CR - 3)) + " " + f1(CLY - Math.cos(aa) * (CR - 3)), v % 5 ? 2 : 5); }
  th += '<g id="kimGio">' + line("M " + TX + " " + CLY + " L " + TX + " " + (CLY - 44), 9) + "</g>";
  th += '<g id="kimPhut">' + line("M " + TX + " " + (CLY + 10) + " L " + TX + " " + (CLY - 70), 6) + "</g>";
  th += '<circle cx="' + TX + '" cy="' + CLY + '" r="8" fill="' + INK + '"/>';
  gi += th;
  // cột đèn mới + dây cờ giấy
  [[300, 0], [1460, 1], [2150, 2]].forEach(function (c) {
    gi += at(c[0], G, line("M 0 0 L 0 -470", 14) + line("M 0 0 L 0 -470", 8, "#5A6260") + line("M 0 -470 C 0 -500 40 -510 60 -496", 8) + '<ellipse cx="62" cy="-490" rx="22" ry="10" fill="#FFF0C0" stroke="' + INK + '" stroke-width="3"/>');
  });
  function dayCo(id, x0, x1, y0, sag, sd) {
    var s = '<g id="' + id + '">' + line("M " + x0 + " " + y0 + " Q " + ((x0 + x1) / 2) + " " + (y0 + sag * 2) + " " + x1 + " " + y0, 3, "#6A5A48"), n = Math.round((x1 - x0) / 56);
    for (var i = 1; i < n; i++) {
      var u = i / n, x = x0 + (x1 - x0) * u, y = y0 + 4 * sag * u * (1 - u);
      s += at(x, y, paper("M -18 0 L 18 0 L 0 34 Z", ["#C9463A", "#E2C46A", "#3F6E9A", "#5E8E6A", "#EFE3C8"][(i + sd) % 5], { stroke: true, sw: 2.5, shadow: false }));
    }
    return s + "</g>";
  }
  gi += dayCo("co1", 300, 1460, 440, 70, 1) + dayCo("co2", 1460, 2150, 440, 50, 3);
  // hoa giấy sót trên mặt đá; mẩu "hg" là mẩu Wob nhặt
  var HGX = 470;
  [[200, 930, "#C9463A", 20], [380, 960, "#3F6E9A", -30], [620, 940, "#E2C46A", 40], [1150, 975, "#5E8E6A", 10], [1340, 935, "#C9463A", -15], [1880, 955, "#E2C46A", 25]].forEach(function (q) {
    gi += at(q[0], q[1], paper(rRect(-10, -7, 20, 14, 1, 3040 + q[0]), q[2], { stroke: true, sw: 2, shadow: false }), 1, q[3]);
  });
  gi += '<g id="hg">' + at(HGX, 948, paper(rRect(-11, -8, 22, 16, 1, 3049), "#D97A9A", { stroke: true, sw: 2.5, shadow: false }), 1, -12) + "</g>";
  var hgTay = '<g id="hgT"><g transform="translate(0,-6) rotate(-12)">' + paper(rRect(-16, -12, 32, 24, 1, 3050), "#D97A9A", { stroke: true, sw: 3, shadow: false }) + "</g></g>";
  var dq = '<g id="dq">' + line("M 0 -30 C -14 -50 10 -60 4 -76", 3, "#C9A24A") + '<circle cx="0" cy="0" r="30" fill="#C9A24A" stroke="' + INK + '" stroke-width="4"/><circle cx="0" cy="0" r="22" fill="#FBF5E4" stroke="' + INK + '" stroke-width="2"/>' +
    '<rect x="-5" y="-40" width="10" height="10" fill="#C9A24A" stroke="' + INK + '" stroke-width="2"/>' + line("M 0 0 L 0 -16", 3) + line("M 0 0 L 10 4", 3) + "</g>";
  gi += '<g id="tSep">' + at(760, 560, KR.the("tSepi", CH[3], 52, { seed: 3045 })) + "</g>";
  var W = KR.wob(api, "W", { mua: "he", chum: "kr", holdR: hgTay + dq });
  gi += W.svg;
  var gan = at(-200, 1100, paper("M -300 0 L -260 -80 L 200 -70 L 260 0 Z", "#B6AC98", { shadow: false }));

  // =================== 1: trang sổ bản đồ ===================
  var MX = 230, MY = 120, MS = 0.75;
  var OLD = [MX + 556.8 * MS, MY + 576 * MS], NEW = [MX + 1305.6 * MS, MY + 362.4 * MS];
  var rt = api.duong([OLD, [OLD[0] + 160, OLD[1] + 40], [OLD[0] + 360, OLD[1] - 10], [NEW[0] - 160, NEW[1] + 60], NEW]);
  var s1 = '<g id="s1"><g id="s1k">';
  s1 += '<rect x="-600" y="-400" width="3200" height="2000" fill="#B9A27A"/><rect x="-600" y="-400" width="3200" height="2000" fill="url(#half)" opacity="0.07"/>';
  s1 += at(120, 70, D.journalPage(1680, 940, { seed: 3060 }));
  s1 += D.mapSticker("ban-do/map-kiruna-centre.svg", 1440, 810, { id: "map", seed: 3061 }).replace('<g id="map">', '<g id="map" transform="translate(' + MX + "," + MY + ')">');
  s1 += KR.phacMap(OLD, NEW, 3069);
  s1 += '<path d="' + rt.d + '" fill="none" stroke="#FFF8EC" stroke-width="14" stroke-linecap="round" stroke-dasharray="20 14" opacity="0.85"/>';
  s1 += '<path d="' + rt.d + '" fill="none" stroke="#A8322A" stroke-width="7" stroke-linecap="round" stroke-dasharray="20 14"/>';
  s1 += at(OLD[0], OLD[1], D.mapDot("dOld", { nhan: CH[0], ben: "trai", co: 50, mau: "#B8BDC2", seed: 3062 }));
  s1 += at(NEW[0], NEW[1], D.mapDot("dNew", { nhan: CH[1], ben: "tren", co: 50, seed: 3063 }));
  var Wm = KR.wob(api, "Wm", { mua: "he" });
  s1 += '<g id="wmG">' + Wm.svg + "</g>";
  s1 += '<g id="t3km">' + at(1180, 770, KR.the("t3kmi", CH[2], 50, { seed: 3064 })) + "</g>";
  s1 += "</g></g>";

  // =================== 2: phố hè, đi bộ thị sai ===================
  var s2 = '<g id="s2"><rect x="-600" y="-400" width="3200" height="2000" fill="url(#krHe)"/>';
  s2 += '<g id="s2xa">' + KR.nuiXa(-600, 3200, 640, 120, "#B7C9B0", 3070) + '<rect x="-600" y="636" width="3800" height="600" fill="' + M.coSang + '"/></g>';
  var nh2 = "";
  for (var n2 = 0; n2 < 12; n2++) nh2 += at(-200 + n2 * 260, 780, KR.nhaGo({ w: 210, h: 170, mau: M.nha[(n2 * 5) % 6], mai: M.mai[n2 % 3], sd: 3080 + n2 * 5 }), 0.95);
  s2 += '<g id="s2gi">' + nh2 + '<rect x="-600" y="776" width="3800" height="600" fill="' + M.co + '"/>' + paper(rRect(-600, 860, 3800, 220, 2, 3095), "#CFC8BA", { shadow: false }) + "</g>";
  var Ws = KR.wob(api, "Ws", { mua: "he", chum: "kr" });
  s2 += Ws.svg;
  var hr = "";
  for (var f = 0; f < 30; f++) hr += at(-400 + f * 130, 1080, line("M 0 0 L 0 -150", 18) + line("M 0 0 L 0 -150", 11, M.goSang) + line("M -70 -110 L 70 -110 M -70 -50 L 70 -50", 11) + line("M -70 -110 L 70 -110 M -70 -50 L 70 -50", 6, M.goSang));
  s2 += '<g id="s2gan">' + hr + "</g></g>";

  // =================== đồng hồ phóng to (bong bóng giấy) ===================
  var BX = 560, BY = 520, BR = 190;
  var bb = '<g id="bong">' + paper("M " + (BX + 120) + " " + (BY + 140) + " L " + (BX + 330) + " " + (BY + 300) + " L " + (BX + 160) + " " + (BY + 90) + " Z", "#FFF8EC", { stroke: true, sw: 4, shadow: false });
  bb += '<circle cx="' + BX + '" cy="' + BY + '" r="' + BR + '" fill="#FFF8EC" stroke="' + INK + '" stroke-width="6"/>';
  bb += '<rect x="' + (BX - 22) + '" y="' + (BY - 162) + '" width="44" height="34" rx="6" fill="#C9A24A" stroke="' + INK + '" stroke-width="4"/>';
  bb += '<circle cx="' + BX + '" cy="' + BY + '" r="132" fill="#C9A24A" stroke="' + INK + '" stroke-width="6"/><circle cx="' + BX + '" cy="' + BY + '" r="112" fill="#FBF5E4" stroke="' + INK + '" stroke-width="4"/>';
  for (var v2 = 0; v2 < 60; v2++) { var a2 = v2 * 6 * Math.PI / 180, q0 = v2 % 5 ? 100 : 88; bb += line("M " + f1(BX + Math.sin(a2) * q0) + " " + f1(BY - Math.cos(a2) * q0) + " L " + f1(BX + Math.sin(a2) * 108) + " " + f1(BY - Math.cos(a2) * 108), v2 % 5 ? 2.5 : 6); }
  bb += '<g id="dqGio">' + line("M " + BX + " " + BY + " L " + BX + " " + (BY - 58), 11) + "</g>";
  bb += '<g id="dqPhut">' + line("M " + BX + " " + (BY + 12) + " L " + BX + " " + (BY - 92), 7) + "</g>";
  bb += '<circle cx="' + BX + '" cy="' + BY + '" r="10" fill="' + INK + '"/>';
  bb += '<g id="ngonV"><circle cx="' + (BX + 34) + '" cy="' + (BY - 150) + '" r="26" fill="' + INK + '"/>' + line("M " + (BX + 34) + " " + (BY - 150) + " L " + (BX + 160) + " " + (BY - 230), 30) + line("M " + (BX + 34) + " " + (BY - 150) + " L " + (BX + 160) + " " + (BY - 230), 18, "#5a9fb8") + "</g>";
  bb += "</g>";

  api.dat(KR.defs() + troi + api.lop("xa", xa, 0.4, { mat: 760 }) + api.lop("giua", gi, 1, { mat: G }) + api.lop("gan", gan, 1.3, { mat: 1080 }) + s2 + s1 + bb);
  api.noi({});
  api.show("#hg", 0, 1);

  // =================== 1 ===================
  KR.cat(api, "#s1", 0, t1);
  KR.camNhom(api, [["#s1k", 1]], [[0, 900, 520, 1.2], [t1, 930, 500, 1.27, "sine.inOut"]]);
  var c0 = 0.35, c1 = t1 - 0.25, N = 24;
  api.origin("#wmG", "0 0");
  Wm.set(0, { x: 0, y: 0, size: 0.16, pupX: 12, pupY: -6 });
  for (var s = 0; s <= N; s++) {
    var u = s / N, tt = c0 + (c1 - c0) * u, pp = rt.at(u);
    api.key("#wmG", "x", tt, pp.x, s ? "none" : undefined); api.key("#wmG", "y", tt, pp.y + 6, s ? "none" : undefined);
  }
  Wm.walk(c0, c1, 0, 0, { step: 0.2 });
  Wm.mouth(0, "smile");
  api.pop("#t3km", tThree - 0.06, 0.24);
  api.origin("#t3km", "1180 770");

  // =================== 2 ===================
  KR.cat(api, "#s2", t1, t2);
  Ws.set(0, { x: 760, y: 985, size: 0.6, pupX: 14, pupY: -4 });
  Ws.mouth(0, "smile");
  Ws.walk(t1, t2, 760, 900, { step: 0.26 });
  [["#s2xa", -50], ["#s2gi", -220], ["#s2gan", -520]].forEach(function (q) { api.key(q[0], "x", 0, 0); api.key(q[0], "x", t1, 0, "none"); api.key(q[0], "x", t2, q[1], "none"); });

  // =================== quảng trường: camera ===================
  var tVong = tIt + 0.05, tLuot = tNext + 0.1;
  api.camera([[0, 560, 640, 1.3], [t2, 560, 640, 1.3, "none"], [tHall - 0.3, 600, 630, 1.34, "sine.inOut"], [tHall + 0.6, 900, 600, 1.18, "power2.inOut"],
    [tLuot, 920, 596, 1.2, "sine.inOut"], [tLuot + 1.3, 1640, 470, 1.0, "power2.inOut"], [tStood - 0.1, 1650, 460, 1.04, "sine.inOut"],
    [tStood + 0.5, 1560, 470, 0.8, "power2.inOut"], [tClock + 0.1, 1560, 472, 0.82, "sine.inOut"], [tClock + 0.9, 1640, 520, 1.05, "power2.inOut"], [DUR, 1644, 516, 1.08, "sine.inOut"]]);

  // =================== 3: quảng trường, hoa giấy ===================
  var WX0 = 160, WX1 = 400;
  W.set(0, { x: WX0, y: G + 40, size: 0.62, pupX: 12, pupY: -8 });
  W.mouth(0, "smile");
  api.show("#hgT", 0, 0); api.show("#dq", 0, 0);
  W.walk(t2 + 0.02, t2 + 0.9, WX0, WX1, { step: 0.28 });
  W.pose(t2 + 1.0, 0.3, { pupX: 6, pupY: -18, upRot: -3 }, "power2.out");     // nhìn dây cờ
  // dây cờ đung đưa
  ["#co1", "#co2"].forEach(function (sel, k) { api.origin(sel, (k ? 1460 : 300) + " 440"); for (var i = 0; i < 12; i++) api.key(sel, "rotation", i * 1.9 + k * 0.6, i % 2 ? 0.8 : -0.8, "sine.inOut"); });
  var tSepC = tSep - 0.06;
  // thẻ Sept 2022 treo dưới dây cờ
  // (gắn ở lớp giữa để đi theo camera)
  var tNhat = tSep + 0.75;
  W.pose(tNhat - 0.3, 0.3, { pupX: 8, pupY: 18, upRot: 4 }, "power2.out");
  W.pose(tNhat, 0.32, { sy: 0.8, sx: 1.12, lean: 10, aRu: -24, aRf: 6, legL: 14, legR: -14 }, "power2.inOut");
  api.show("#hg", tNhat + 0.32, 0); api.show("#hgT", tNhat + 0.32, 1);
  W.pose(tNhat + 0.4, 0.32, { sy: 1, sx: 1, lean: 0, legL: 0, legR: 0, aRu: 98, aRf: 52, pupX: 2, pupY: 4, upRot: 0 }, "power2.inOut");
  W.mouth(tNhat + 0.5, "o");
  api.origin("#hgT", "0 0");
  for (var q = 0; q < 4; q++) api.key("#hgT", "rotation", tNhat + 0.8 + q * 0.22, q % 2 ? -40 : 40, "sine.inOut");
  W.mouth(tNhat + 1.2, "smile");
  W.dutTui(tParty - 0.2, 0.3);
  api.show("#hgT", tParty + 0.12, 0);
  W.pose(tParty + 0.25, 0.3, { aRu: -18, aRf: 10, pupX: 12, pupY: -8 }, "power2.inOut");

  // =================== 4: Kristallen ===================
  var WX2 = 720;
  W.walk(tHall - 0.2, tHall + 0.7, WX1, WX2, { step: 0.28 });
  Wr.set(0, { x: WX2 + 300, y: ky - KH + 286, size: 0.2, pupX: -6 });
  api.show("#phan", 0, 0); api.show("#phan", tHall + 0.6, 1);
  api.key("#Wr", "x", 0, WX2 + 300); api.key("#Wr", "x", tHall + 0.6, WX2 + 300, "none");
  W.pose(tHall + 0.8, 0.4, { pupX: 10, pupY: -22, upRot: -5, lean: -3 }, "power2.out");
  Wr.pose(tHall + 0.8, 0.4, { pupX: -10, pupY: -22, upRot: 5 }, "power2.out");
  lap.forEach(function (sel, i) {
    var tl = tHall + 0.5 + i * 0.55;
    api.origin(sel, "0 0");
    api.key(sel, "scale", 0, 0); api.key(sel, "scale", tl, 0, "none"); api.key(sel, "scale", tl + 0.18, 1, "back.out(2)"); api.key(sel, "scale", tl + 0.5, 0, "power2.in");
  });
  // kính râm loé đúng "Kristallen"
  api.origin(W.kr.kinhLoe, "250 142");
  api.show(W.kr.kinhLoe, tKris - 0.02, 1); api.key(W.kr.kinhLoe, "scale", tKris - 0.02, 0.3); api.key(W.kr.kinhLoe, "scale", tKris + 0.14, 1.2, "back.out(2)");
  api.key(W.kr.kinhLoe, "scale", tKris + 0.45, 0, "power2.in"); api.show(W.kr.kinhLoe, tKris + 0.5, 0);
  api.sfx("ting", tKris, 0.5);
  W.mouth(tKris + 0.1, "grin"); W.mouth(tKris + 0.9, "smile");
  W.idle(tHall + 1.2, tVong - 0.1, { seed: 301, bien: 1.2 });

  // =================== 5: chắp tay đi một vòng quanh toà nhà ===================
  W.pose(tVong, 0.3, { aRu: 26, aRf: 34, aLu: -26, aLf: -34, upRot: 0, lean: 0, pupX: 12, pupY: -10 }, "power2.inOut");
  var tSau = tVong + 0.95;
  W.walk(tVong + 0.1, tSau, WX2, 1240, { step: 0.3, arms: false });
  W.pose(tVong + 0.1, tSau - tVong - 0.1, { y: G - 6, size: 0.55 }, "sine.in");
  api.key("#W", "opacity", 0, 1); api.key("#W", "opacity", tSau - 0.15, 1, "none"); api.key("#W", "opacity", tSau, 0, "power1.in");
  api.key("#Wr", "x", tVong + 0.1, WX2 + 300, "none"); api.key("#Wr", "x", tSau, 1200, "sine.inOut");
  api.show("#phan", tSau, 0);
  var tRa = tNext - 0.35;
  W.pose(tSau + 0.05, 0.05, { x: 560, y: G - 6 }, "none");
  api.key("#W", "opacity", tRa - 0.4, 0, "none"); api.key("#W", "opacity", tRa - 0.2, 1, "power1.out");
  W.walk(tRa - 0.4, tNext + 0.15, 560, 640, { step: 0.3, arms: false });
  W.pose(tRa - 0.4, 0.55, { y: G + 40, size: 0.62 }, "sine.out");

  // =================== 6: lướt sang tháp đồng hồ ===================
  W.pose(tNext + 0.2, 0.25, { aRu: -18, aRf: 10, aLu: 18, aLf: -10 }, "power2.inOut");
  var WX3 = 1520;
  W.walk(tNext + 0.3, tNext + 1.9, 640, WX3, { step: 0.26 });
  W.pose(tNext + 2.0, 0.45, { pupX: 8, pupY: -24, upRot: -7, lean: -5 }, "power2.out");
  W.mouth(tNext + 2.2, "o"); W.mouth(tNext + 3.2, "smile");
  W.idle(tNext + 2.5, tStood, { seed: 302, bien: 1.0 });

  // =================== 7: bé tí dưới chân tháp ===================
  W.walk(tStood, tStood + 0.6, WX3, 1610, { step: 0.3 });
  W.pose(tStood + 0.65, 0.4, { pupX: 4, pupY: -26, upRot: -8, lean: -6 }, "power2.out");
  // kim đồng hồ tháp: giờ ~ 10, phút ở vạch 30 (180°); nhích một nấc đúng "minute."
  api.origin("#kimGio", TX + " " + CLY); api.origin("#kimPhut", TX + " " + CLY);
  api.set("#kimGio", 0, { rotation: 315 });
  api.key("#kimPhut", "rotation", 0, 180); api.key("#kimPhut", "rotation", tMin - 0.01, 180, "none"); api.key("#kimPhut", "rotation", tMin + 0.1, 186, "back.out(3)");

  // =================== 8: đồng hồ quả quýt chạy nhanh, vặn lại ===================
  var tRut = tClock + 0.1;
  W.dutTui(tRut, 0.25);
  api.show("#dq", tRut + 0.28, 1);
  W.pose(tRut + 0.32, 0.35, { aRu: 56, aRf: 30, pupX: 0, pupY: 10, upRot: 0, lean: 0 }, "power2.inOut");
  KR.thong(api, W, "R", "#dq", tRut + 0.28, DUR, { goc: 0, lac: 0.4 });
  api.pop("#bong", tRut + 0.55, 0.26);
  api.origin("#bong", BX + " " + BY);
  // quả quýt: kim giờ như tháp, kim phút nhanh hơn hai nấc (192°)
  api.origin("#dqGio", BX + " " + BY); api.origin("#dqPhut", BX + " " + BY); api.origin("#ngonV", (BX + 34) + " " + (BY - 150));
  api.set("#dqGio", 0, { rotation: 315 });
  api.key("#dqPhut", "rotation", 0, 192);
  W.pose(tRut + 0.9, 0.3, { pupX: 10, pupY: -26, upRot: -5 }, "power2.out");    // nhìn tháp
  W.pose(tRut + 1.4, 0.3, { pupX: 0, pupY: 10, upRot: 0 }, "power2.out");        // lại nhìn quả quýt
  W.mouth(tRut + 1.4, "flat");
  var tVan = tRut + 1.6;
  api.show("#ngonV", 0, 0); api.show("#ngonV", tVan - 0.25, 1); api.show("#ngonV", tVan + 1.2, 0);
  api.key("#ngonV", "x", 0, 260); api.key("#ngonV", "y", 0, -120); api.key("#ngonV", "x", tVan - 0.25, 260, "none"); api.key("#ngonV", "y", tVan - 0.25, -120, "none");
  api.key("#ngonV", "x", tVan, 0, "power2.out"); api.key("#ngonV", "y", tVan, 0, "power2.out");
  for (var vv = 0; vv < 5; vv++) api.key("#ngonV", "rotation", tVan + 0.1 + vv * 0.16, vv % 2 ? 0 : -24, "sine.inOut");
  api.key("#dqPhut", "rotation", tVan + 0.05, 192, "none"); api.key("#dqPhut", "rotation", tVan + 0.85, 180, "power1.inOut");
  api.key("#ngonV", "x", tVan + 0.95, 0, "none"); api.key("#ngonV", "y", tVan + 0.95, 0, "none"); api.key("#ngonV", "x", tVan + 1.2, 260, "power2.in"); api.key("#ngonV", "y", tVan + 1.2, -120, "power2.in");
  api.key("#dqPhut", "rotation", tMin - 0.01, 180, "none"); api.key("#dqPhut", "rotation", tMin + 0.1, 186, "back.out(3)");
  W.pose(tMin - 0.1, 0.25, { pupX: 8, pupY: -24, upRot: -4 }, "power2.out");
  W.mouth(tMin + 0.15, "smile");
  W.autoBlink(t2, DUR, 3011);
  // thẻ Sept 2022: bật dưới dây cờ (lớp giữa)
  api.pop("#tSep", tSepC, 0.24, tHall - 0.45);
  api.origin("#tSep", "760 560");
};
