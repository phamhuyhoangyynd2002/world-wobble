/* dio-wob.js: con rối giấy Wob. Toạ độ từ templates/_shared/wob/nguon/tao_wob.py (thân méo, 4 lục địa, ba lô,
 * giày đỏ, nét mực 7) – KHÔNG đổi tạo hình. Thêm khớp tay/chân, mí mắt, con ngươi, lông mi, bộ miệng A–H/X
 * (+ O, S, N, K biểu cảm), mũ len, khăn, chăn (trang phục).
 * Xoay người KHÔNG dùng rotationY (lộ tấm mỏng): dùng quay(w, t, h) – mặt, lục địa trượt trên quả địa cầu,
 * ba lô trượt ngược, thân hẹp lại một chút (như quả cầu xoay).
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];

  function wobbly(cx, cy, r, n, phase) {
    n = n || 48; phase = phase || 0; var pts = [];
    for (var i = 0; i < n; i++) {
      var t = (2 * Math.PI * i) / n, q = r + 5.5 * Math.sin(3 * t + phase) + 3.5 * Math.sin(5 * t + 1.3 + phase) + 2 * Math.sin(2 * t + 0.4);
      pts.push([cx + q * Math.cos(t), cy + q * Math.sin(t) * 0.96]);
    }
    var f = function (v) { return v.toFixed(1); }, d = "M " + f(pts[0][0]) + " " + f(pts[0][1]) + " ";
    for (var j = 0; j < n; j++) {
      var p0 = pts[(j - 1 + n) % n], p1 = pts[j], p2 = pts[(j + 1) % n], p3 = pts[(j + 2) % n];
      d += "C " + f(p1[0] + (p2[0] - p0[0]) / 6) + " " + f(p1[1] + (p2[1] - p0[1]) / 6) + " " + f(p2[0] - (p3[0] - p1[0]) / 6) + " " + f(p2[1] - (p3[1] - p1[1]) / 6) + " " + f(p2[0]) + " " + f(p2[1]) + " ";
    }
    return d + "Z";
  }
  var BODY = wobbly(200, 178, 122);
  var LANDS = [
    "M 92 120 C 110 92 150 88 168 104 C 182 118 170 140 186 152 C 198 162 190 186 168 188 C 146 190 140 172 122 176 C 100 180 84 160 88 142 Z",
    "M 236 196 C 252 182 284 186 300 204 C 316 222 312 252 292 266 C 276 278 258 268 252 252 C 246 236 226 228 228 212 Z",
    "M 232 82 C 246 74 268 78 272 92 C 276 104 262 112 250 110 C 238 108 226 94 232 82 Z",
    "M 150 262 C 162 254 182 258 186 270 C 190 282 176 292 162 290 C 148 288 140 272 150 262 Z"];
  var ARM_PIV = { L: [86, 212], R: [314, 212] }, ARM_HAND = { L: [72, 308], R: [328, 308] };
  DIO.WOB = { BODY: BODY, LANDS: LANDS, ARM_PIV: ARM_PIV, ARM_HAND: ARM_HAND };

  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;

    var MOUTHS = {
      X: sk("M 180 226 C 192 236 210 236 222 224", 6),
      A: sk("M 178 230 C 192 233 210 233 224 229", 8),
      B: '<rect x="179" y="221" width="44" height="17" rx="8" fill="' + INK + '"/><rect x="184" y="223" width="34" height="6" rx="2" fill="' + C.EYE + '"/>',
      C: '<ellipse cx="201" cy="230" rx="19" ry="13" fill="' + INK + '"/><ellipse cx="201" cy="237" rx="10" ry="5" fill="' + C.CHEEK + '"/>',
      D: fp("M 174 220 C 178 260 224 260 228 220 Z", INK, 4) + '<path d="M 186 244 C 194 254 210 254 216 244 C 208 238 194 238 186 244 Z" fill="' + C.CHEEK + '"/>',
      E: '<ellipse cx="201" cy="230" rx="14" ry="12" fill="' + INK + '"/><ellipse cx="201" cy="236" rx="7" ry="4" fill="' + C.CHEEK + '"/>',
      F: '<ellipse cx="201" cy="230" rx="9" ry="10" fill="' + INK + '"/>',
      G: '<rect x="183" y="222" width="36" height="16" rx="7" fill="' + INK + '"/><rect x="186" y="221" width="30" height="8" rx="2" fill="' + C.EYE + '"/>',
      H: '<ellipse cx="201" cy="230" rx="17" ry="12" fill="' + INK + '"/><ellipse cx="201" cy="225" rx="8" ry="5" fill="' + C.CHEEK + '"/>',
      O: '<ellipse cx="200" cy="234" rx="15" ry="21" fill="' + INK + '"/>',
      S: fp("M 160 214 C 172 258 228 258 240 214 Z", INK, 6) + '<path d="M 176 236 C 190 252 212 252 226 236 C 214 228 188 228 176 236 Z" fill="' + C.CHEEK + '"/>',
      N: sk("M 176 230 C 192 228 210 232 226 228", 6),
      K: '<rect x="166" y="214" width="70" height="28" rx="10" fill="' + C.EYE + '" stroke="' + INK + '" stroke-width="6"/>' + sk("M 168 228 L 177 220 L 186 236 L 195 220 L 204 236 L 213 220 L 222 236 L 230 222 L 234 228", 4)
    };

    function wobSVG(id, size) {
      var s = [];
      s.push('<svg class="dio-cut wobsvg" width="' + size + '" height="' + size + '" viewBox="0 0 400 400" style="overflow:visible">');
      s.push('<defs><clipPath id="wc' + id + '"><path d="' + BODY + '"/></clipPath>' +
        '<clipPath id="el' + id + '"><ellipse cx="160" cy="156" rx="25" ry="31"/></clipPath><clipPath id="er' + id + '"><ellipse cx="238" cy="156" rx="25" ry="31"/></clipPath></defs>');
      s.push('<g class="legL">' + sk("M 174 290 C 172 324 170 350 168 380", 15) + '<ellipse cx="158" cy="385" rx="28" ry="12" fill="' + C.SHOE + '" stroke="' + INK + '" stroke-width="5"/></g>');
      s.push('<g class="legR">' + sk("M 226 290 C 228 324 230 350 232 380", 15) + '<ellipse cx="242" cy="385" rx="28" ry="12" fill="' + C.SHOE + '" stroke="' + INK + '" stroke-width="5"/></g>');
      s.push('<g class="upper"><g class="talk">');
      s.push('<g class="pack"><rect x="250" y="96" width="98" height="160" rx="30" fill="' + C.PACK + '" stroke="' + INK + '" stroke-width="7"/>' +
        '<rect x="300" y="150" width="44" height="58" rx="12" fill="' + C.PACK_DARK + '" stroke="' + INK + '" stroke-width="5"/>' +
        '<rect x="262" y="66" width="96" height="36" rx="18" fill="' + C.MAT + '" stroke="' + INK + '" stroke-width="7"/>' + sk("M 282 70 L 282 98", 4) + sk("M 336 70 L 336 98", 4) + "</g>");
      // thân: biển + lục địa (nhóm lands trượt khi quay, có bản sao hai bên để không hở)
      var lands = "";
      [-250, 0, 250].forEach(function (dx) {
        lands += '<g transform="translate(' + dx + ' 0)">';
        LANDS.forEach(function (d) { lands += '<path d="' + d + '" fill="' + C.LAND + '" stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round"/>'; });
        lands += sk("M 200 46 C 130 138 130 218 200 310", 2.5, INK, ' opacity="0.28"') + sk("M 200 46 C 270 138 270 218 200 310", 2.5, INK, ' opacity="0.28"') + "</g>";
      });
      var b = '<g class="body"><path d="' + BODY + '" fill="' + C.SEA + '"/><g clip-path="url(#wc' + id + ')"><g class="lands">' + lands + "</g>";
      b += sk("M 68 188 C 160 218 240 218 332 188", 2.5, INK, ' opacity="0.28"');
      b += '<path class="frostcap" opacity="0" d="M 60 96 C 120 46 280 46 340 96 L 340 50 L 60 50 Z" fill="' + C.FROST + '"/>';
      b += '<path class="shadeR" opacity="0" d="M 262 50 C 318 110 318 246 262 306 L 340 306 L 340 50 Z" fill="#1f3c4a"/>';
      b += '<path class="shadeL" opacity="0" d="M 138 50 C 82 110 82 246 138 306 L 60 306 L 60 50 Z" fill="#1f3c4a"/>';
      b += sk("M 112 112 C 122 96 136 86 152 80", 9, "#ffffff", ' opacity="0.55"') + "</g>";
      b += '<path d="' + BODY + '" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linejoin="round"/>';
      b += '<g class="strap">' + sk("M 300 96 C 286 130 284 168 300 206", 10, C.PACK_DARK) + sk("M 300 96 C 286 130 284 168 300 206", 3, INK, ' opacity="0.6"') + "</g></g>";
      s.push(b);
      s.push('<g class="scarf" opacity="0">' + fp("M 132 270 L 118 340 L 150 344 L 158 278 Z", C.TERRA, 5) + sk("M 122 322 L 148 326", 4, C.PAPER) +
        sk("M 120 342 l -2 10 M 130 343 l -1 10 M 140 344 l 0 10", 3) +
        fp("M 96 244 C 150 280 250 280 304 244 L 300 272 C 248 306 152 306 100 272 Z", C.TERRA, 6) +
        sk("M 130 266 C 140 274 150 278 160 280", 5, C.PAPER, ' opacity=".9"') + sk("M 220 282 C 240 280 256 276 270 268", 5, C.PAPER, ' opacity=".9"') + "</g>");
      var eye = function (cx, side) {
        return '<g class="eye' + side + '"><ellipse cx="' + cx + '" cy="156" rx="25" ry="31" fill="' + C.EYE + '"/>' +
          '<g class="pup' + side + '"><circle cx="' + (cx + 3) + '" cy="160" r="13" fill="' + INK + '"/><circle cx="' + (cx + 8) + '" cy="154" r="5" fill="#fff"/></g>' +
          '<g clip-path="url(#e' + side.toLowerCase() + id + ')"><ellipse class="lid' + side + '" cx="' + cx + '" cy="156" rx="26" ry="32" fill="' + C.SEA + '" stroke="' + INK + '" stroke-width="5"/></g>' +
          '<ellipse cx="' + cx + '" cy="156" rx="25" ry="31" fill="none" stroke="' + INK + '" stroke-width="5"/></g>';
      };
      var lash = function (cx, side) {
        return '<g class="lash' + side + '"><g class="lashS">' + sk("M " + (cx - 15) + " 131 L " + (cx - 24) + " 114", 4.5) + sk("M " + cx + " 125 L " + cx + " 106", 4.5) + sk("M " + (cx + 15) + " 131 L " + (cx + 24) + " 114", 4.5) + "</g>" +
          '<g class="lashI" opacity="0">' + ["M " + (cx - 27) + " 112 l 6 0 l -3 9 z", "M " + (cx - 3) + " 104 l 6 0 l -3 9 z", "M " + (cx + 21) + " 112 l 6 0 l -3 9 z"].map(function (d) { return '<path d="' + d + '" fill="' + C.FROST + '" stroke="' + INK + '" stroke-width="2"/>'; }).join("") + "</g></g>";
      };
      var m = '<g class="dio-m" data-m="X">';
      Object.keys(MOUTHS).forEach(function (k) { m += '<g class="m' + k + '">' + MOUTHS[k] + "</g>"; });
      m += "</g>";
      // mặt: má + mắt + lông mi + miệng (trượt khi quay)
      s.push('<g class="face"><g class="cheeks"><ellipse cx="124" cy="204" rx="16" ry="10" fill="' + C.CHEEK + '" opacity="0.55"/><ellipse cx="276" cy="204" rx="16" ry="10" fill="' + C.CHEEK + '" opacity="0.55"/></g>' +
        '<g class="eyes">' + eye(160, "L") + eye(238, "R") + lash(160, "L") + lash(238, "R") + "</g>" + m + "</g>");
      s.push('<g class="beanie" opacity="0">' + fp("M 116 96 C 120 34 280 34 284 96 Z", C.TEAL, 6) + sk("M 150 50 L 156 92 M 200 40 L 200 92 M 250 50 L 244 92", 3, C.PAPER, ' opacity=".5"') +
        fp("M 108 92 C 150 80 250 80 292 92 L 290 112 C 250 100 150 100 110 112 Z", C.PAPER, 5) + '<circle cx="200" cy="30" r="17" fill="' + C.TERRA + '" stroke="' + INK + '" stroke-width="5"/></g>');
      s.push('<g class="blanket" opacity="0">' +
        fp("M 200 24 C 302 24 354 98 358 190 C 362 270 352 330 334 374 L 66 374 C 48 330 38 270 42 190 C 46 98 98 24 200 24 Z M 200 102 C 270 102 302 150 298 196 C 294 250 252 270 200 270 C 148 270 106 250 102 196 C 98 150 130 102 200 102 Z", "url(#dio-plaid)", 6, ' fill-rule="evenodd"') +
        sk("M 90 300 C 120 320 150 330 180 334", 4, INK, ' opacity=".5"') + sk("M 310 300 C 290 318 260 330 230 334", 4, INK, ' opacity=".5"') +
        sk("M 120 70 C 104 110 96 150 98 196", 4, INK, ' opacity=".35"') + sk("M 280 70 C 296 110 304 150 302 196", 4, INK, ' opacity=".35"') + "</g>");
      ["L", "R"].forEach(function (sd) {
        var d = sd === "L" ? "M 86 212 C 70 246 66 276 72 304" : "M 314 212 C 330 246 334 276 328 304";
        var h = ARM_HAND[sd];
        s.push('<g class="arm' + sd + '">' + sk(d, 13) + '<g transform="translate(' + h[0] + " " + h[1] + ')"><g class="hold' + sd + '"></g></g>' +
          '<circle class="hand' + sd + '" cx="' + h[0] + '" cy="' + h[1] + '" r="14" fill="' + INK + '"/></g>');
      });
      s.push('<g class="extra"></g>');
      s.push("</g></g></svg>");
      return s.join("");
    }

    // ------------------------------------------------------------ tạo Wob
    // o: x, y (mặt sàn), z, s (tỉ lệ; 1 = cao ~390px), f (filter), shadow (màu bóng), id
    api.makeWob = function (parent, o) {
      var id = o.id || api.nid("w");
      var w = { id: id, s: o.s || 1, x: o.x || 0, y: o.y || 0, z: o.z || 0, huong: 0 };
      w.pos = api.P(parent, { x: w.x, y: w.y, z: w.z });
      var sh = api.P(w.pos, { rotationX: 90 });
      api.div("dio-face", sh, "left:" + -150 * w.s + "px;top:" + -50 * w.s + "px;width:" + 300 * w.s + "px;height:" + 100 * w.s + "px;border-radius:50%;background:radial-gradient(closest-side," + (o.shadow || "rgba(20,12,4,.55)") + ",rgba(0,0,0,0))");
      w.shadow = sh;
      w.lift = api.P(w.pos, {});
      var size = 400 * w.s;
      w.lift.insertAdjacentHTML("beforeend", wobSVG(id, size));
      w.svg = w.lift.lastElementChild;
      w.svg.style.left = -200 * w.s + "px"; w.svg.style.top = -392 * w.s + "px"; w.svg.style.filter = o.f || api.F.WOB_AM;
      var q = function (c) { return w.svg.querySelector("." + c); };
      ["legL", "legR", "upper", "talk", "pack", "armL", "armR", "holdL", "holdR", "pupL", "pupR", "lidL", "lidR", "lashL", "lashR", "dio-m", "scarf", "beanie", "blanket",
        "frostcap", "extra", "cheeks", "body", "face", "lands", "strap", "shadeL", "shadeR"].forEach(function (c) { w[c === "dio-m" ? "m" : c] = q(c); });
      w.lashIce = w.svg.querySelectorAll(".lashI"); w.lashStroke = w.svg.querySelectorAll(".lashS path");
      gsap.set(w.legL, { smoothOrigin: false, svgOrigin: "174 290" }); gsap.set(w.legR, { smoothOrigin: false, svgOrigin: "226 290" });
      gsap.set(w.upper, { smoothOrigin: false, svgOrigin: "200 300" }); gsap.set(w.talk, { smoothOrigin: false, svgOrigin: "200 290" });
      gsap.set(w.armL, { smoothOrigin: false, svgOrigin: "86 212", rotation: 0 }); gsap.set(w.armR, { smoothOrigin: false, svgOrigin: "314 212", rotation: 0 });
      gsap.set(w.lidL, { smoothOrigin: false, svgOrigin: "160 124", scaleY: 0 }); gsap.set(w.lidR, { smoothOrigin: false, svgOrigin: "238 124", scaleY: 0 });
      gsap.set(w.lashL, { smoothOrigin: false, svgOrigin: "160 126", scale: 0 }); gsap.set(w.lashR, { smoothOrigin: false, svgOrigin: "238 126", scale: 0 });
      gsap.set(w.pack, { smoothOrigin: false, svgOrigin: "300 250" });
      gsap.set(w.svg, { transformOrigin: "50% 98%" });
      w.arm = { L: 0, R: 0 }; w.lid = 0; w.bubbles = {};
      if (o.trangPhuc) api.trangPhuc(w, o.trangPhuc);
      return w;
    };
    // Trang phục (đặt ngay, hoặc tại t nếu có): { mu, khan, chan, mi (lông mi đóng băng), muMau, muVanh, muBong, muSoc, khanMau }
    api.trangPhuc = function (w, tp, t) {
      var set = function (el, v) { if (t == null) gsap.set(el, v); else tl.set(el, v, t); };
      if (tp.mu != null) set(w.beanie, { opacity: tp.mu ? 1 : 0 });
      // Màu mũ len (19/11/2026, khớp cat-giay: muMau "#C9463A", muVanh "#A8352B", muBong "#F6EEDC"). Không truyền: giữ mũ TEAL cũ.
      if (tp.muMau || tp.muVanh || tp.muBong) {
        var bk = w.beanie.children;   // [0] chỏm, [1] sọc len, [2] vành, [3] quả bông
        if (tp.muMau) { set(bk[0], { attr: { fill: tp.muMau } }); set(bk[1], { attr: { stroke: tp.muSoc || "#8E2C24" } }); }
        if (tp.muVanh) set(bk[2], { attr: { fill: tp.muVanh } });
        if (tp.muBong) set(bk[3], { attr: { fill: tp.muBong } });
      }
      // Màu khăn (19/11/2026): khanMau, ví dụ "#D9543C" (màu khăn chuẩn tập 1). Không truyền: giữ khăn TERRA cũ.
      if (tp.khanMau) {
        if (!w.khanTo) w.khanTo = Array.prototype.filter.call(w.scarf.querySelectorAll("path"), function (el) { return el.getAttribute("fill") === C.TERRA; });
        set(w.khanTo, { attr: { fill: tp.khanMau } });
      }
      if (tp.khan != null) set(w.scarf, { opacity: tp.khan ? 1 : 0 });
      if (tp.chan != null) { set(w.blanket, { opacity: tp.chan ? 1 : 0 }); set(w.cheeks, { opacity: tp.chan ? 0 : 1 }); }
      if (tp.mi != null) { set([w.lashL, w.lashR], { scale: tp.mi ? 1 : 0 }); set(w.lashIce, { opacity: tp.mi ? 1 : 0 }); set(w.lashStroke, { stroke: tp.mi ? C.ICE2 : INK }); }
    };

    // Toạ độ thế giới của một điểm (px, py) trong hệ 400×400 của Wob (khi Wob đứng yên, không nhún)
    api.wobTheGioi = function (w, px, py) { return { x: w.x + (px - 200) * w.s, y: w.y + (py - 392) * w.s, z: w.z }; };

    // ------------------------------------------------------------ bong bóng (ký hiệu, KHÔNG chữ)
    api.addBubble = function (w, key, inner) {
      var s = w.s, bw = 190, bh = 160;
      w.lift.insertAdjacentHTML("beforeend", '<svg class="dio-cut bub" width="' + bw * s + '" height="' + bh * s + '" viewBox="0 0 ' + bw + " " + bh + '" style="left:' + 70 * s + "px;top:" + -520 * s + 'px;overflow:visible">' +
        fp("M 20 20 C 20 6 30 4 44 4 L 156 4 C 172 4 182 10 182 26 L 182 100 C 182 116 172 122 156 122 L 70 122 L 26 156 L 46 122 L 40 122 C 26 122 20 114 20 100 Z", C.PAPER, 6) + inner + "</svg>");
      var el = w.lift.lastElementChild;
      gsap.set(el, { scale: 0, transformOrigin: "20% 100%", filter: "drop-shadow(2px 3px 0 #b9c9d0) drop-shadow(10px 8px 6px rgba(40,72,92,.3))" });
      w.bubbles[key] = el; return el;
    };
    api.BUB = {
      soc: fp("M 92 26 L 110 26 L 106 76 L 96 76 Z", C.TERRA, 4) + '<circle cx="101" cy="94" r="9" fill="' + C.TERRA + '" stroke="' + INK + '" stroke-width="4"/>',
      cham: '<circle cx="66" cy="64" r="11" fill="' + INK + '"/><circle cx="101" cy="64" r="11" fill="' + INK + '"/><circle cx="136" cy="64" r="11" fill="' + INK + '"/>',
      tim: sk("M 70 64 C 70 40 100 40 100 62 C 100 40 130 40 130 64 C 130 84 100 98 100 104 C 100 98 70 84 70 64 Z", 5, C.TERRA),
      tui: fp("M 72 44 L 130 44 L 136 108 L 66 108 Z", "#c9a46a", 5) + sk("M 86 44 C 86 22 116 22 116 44", 5)
    };
    api.bubble = function (w, key, t, dur) {
      var el = w.bubbles[key];
      tl.fromTo(el, { scale: 0, rotation: -12 }, { scale: 1, rotation: 0, duration: 0.28, ease: "back.out(2.6)", immediateRender: false }, t);
      tl.to(el, { scale: 0, duration: 0.18, ease: "power2.in" }, t + dur);
    };

    // ------------------------------------------------------------ tay, đồ cầm
    api.armTo = function (w, side, t, d, rot, ease) {
      tl.to(w["arm" + side], { rotation: rot, svgOrigin: ARM_PIV[side].join(" "), duration: d, ease: ease || "power2.inOut" }, t); w.arm[side] = rot;
    };
    api.armSet = function (w, side, rot, t) {
      var v = { rotation: rot, svgOrigin: ARM_PIV[side].join(" ") };
      if (t == null) gsap.set(w["arm" + side], v); else tl.set(w["arm" + side], v, t);
      w.arm[side] = rot;
    };
    // Biến đổi cục bộ bằng thuộc tính transform (GSAP nội suy số trong chuỗi).
    // svgOrigin của GSAP tính theo toạ độ gốc svg nên KHÔNG dùng được cho đồ nằm trong cánh tay đang quay.
    var f2 = api.f2;
    api.TF = function (x, y, r, sx) { return { attr: { transform: "translate(" + f2(x) + " " + f2(y) + ") rotate(" + f2(r) + ") scale(" + f2(sx == null ? 1 : sx) + " 1)" } }; };
    // Đặt đồ trong tay sao cho trong hệ Wob: tâm (wx, wy), góc wa (độ), khi cánh tay quay armDeg
    api.holdPose = function (side, armDeg, wx, wy, wa, sx) {
      var pv = ARM_PIV[side], h = ARM_HAND[side], a = (armDeg * Math.PI) / 180;
      var rx = h[0] - pv[0], ry = h[1] - pv[1];
      var hx = pv[0] + rx * Math.cos(a) - ry * Math.sin(a), hy = pv[1] + rx * Math.sin(a) + ry * Math.cos(a);
      var dx = wx - hx, dy = wy - hy;
      return api.TF(dx * Math.cos(-a) - dy * Math.sin(-a), dx * Math.sin(-a) + dy * Math.cos(-a), wa - armDeg, sx);
    };
    api.handWorld = function (side, armDeg) {
      var pv = ARM_PIV[side], h = ARM_HAND[side], a = (armDeg * Math.PI) / 180, rx = h[0] - pv[0], ry = h[1] - pv[1];
      return [pv[0] + rx * Math.cos(a) - ry * Math.sin(a), pv[1] + rx * Math.sin(a) + ry * Math.cos(a)];
    };
    // Đồ dài cầm một đầu: tâm đồ cách bàn tay `dist` theo hướng `ang` (độ, trong hệ Wob)
    api.camDai = function (side, armDeg, ang, dist, sx) {
      var h = api.handWorld(side, armDeg), a = (ang * Math.PI) / 180;
      return api.holdPose(side, armDeg, h[0] + dist * Math.cos(a), h[1] + dist * Math.sin(a), ang, sx);
    };

    // ------------------------------------------------------------ mắt, miệng
    api.look = function (w, t, dx, dy, d, pupScale) {
      tl.to([w.pupL, w.pupR], { x: dx, y: dy, scale: pupScale || 1, transformOrigin: "50% 50%", duration: d || 0.18, ease: "power2.out" }, t);
    };
    api.crossEyes = function (w, t, d) {
      tl.to(w.pupL, { x: 10, y: -13, duration: d, ease: "power2.inOut" }, t);
      tl.to(w.pupR, { x: -12, y: -13, duration: d, ease: "power2.inOut" }, t);
    };
    // Mí mắt: 0 mở, 0.5 tỉnh bơ, 1 nhắm
    api.lids = function (w, t, v, d) { tl.to([w.lidL, w.lidR], { scaleY: v, duration: d || 0.15, ease: "power2.inOut" }, t); w.lid = v; };
    api.lidsSet = function (w, v, t) { if (t == null) gsap.set([w.lidL, w.lidR], { scaleY: v }); else tl.set([w.lidL, w.lidR], { scaleY: v }, t); w.lid = v; };
    api.blink = function (w, t, base, cham) {
      var b = base == null ? w.lid : base, k = cham ? 3 : 1;
      tl.fromTo([w.lidL, w.lidR], { scaleY: b }, { scaleY: 1, duration: 0.06 * k, ease: "power1.in", immediateRender: false }, t);
      tl.fromTo([w.lidL, w.lidR], { scaleY: 1 }, { scaleY: b, duration: 0.09 * k, ease: "power1.out", immediateRender: false }, t + 0.06 * k + (cham ? 0.12 : 0));
    };
    // Chớp mắt tự nhiên trong [t0, t1], tránh các khoảng skip [[a, b]]
    api.blinks = function (w, t0, t1, skip, base) {
      var t = t0 + api.rr(0.6, 1.6);
      while (t < t1 - 0.3) {
        var bad = (skip || []).some(function (r) { return t > r[0] - 0.25 && t < r[1] + 0.1; });
        if (!bad) api.blink(w, t, base);
        t += api.rr(2.4, 4.2);
      }
    };
    api.mouth = function (w, t, v) { tl.set(w.m, { attr: { "data-m": v } }, t); };
    api.mouthSet = function (w, v) { gsap.set(w.m, { attr: { "data-m": v } }); };
    // Khẩu hình theo HH_DATA.loi[].khau_hinh (mốc từ đầu đoạn, có thể âm). Chỉ khi lop = "hien-tai".
    // o.bo: [[a, b]] khoảng không mấp máy (miệng do canh.js tự đặt); o.sau: miệng sau khi hết lời (mặc định "X")
    api.khauHinh = function (w, o) {
      o = o || {};
      var data = api.data;
      if (data.lop !== "hien-tai") { console.warn("[dio] khauHinh bỏ qua: lop = " + data.lop + " (chỉ hien-tai mấp máy theo lời)"); return; }
      var dau = "X", cuoi = 0;
      (data.loi || []).forEach(function (L) {
        (L.khau_hinh || []).forEach(function (c) {
          if (c.end <= 0 || c.start >= api.DUR) return;
          var t = Math.max(0, c.start);
          if ((o.bo || []).some(function (r) { return t >= r[0] && t < r[1]; })) return;
          if (c.start <= 0) dau = c.value; else api.mouth(w, t, c.value);
          cuoi = Math.max(cuoi, c.end);
        });
      });
      api.mouthSet(w, dau);
      if (cuoi > 0 && cuoi < api.DUR && o.sau !== false) api.mouth(w, cuoi, o.sau || "X");
      return cuoi;
    };
    // Gật đầu, nghiêng thân theo từ nhấn (từ dài, từ có dấu câu), cách nhau ≥ 0.35 s
    api.gatDau = function (w, o) {
      o = o || {}; var last = -9, i = 0, amp = o.amp == null ? 1 : o.amp;
      (api.data.loi || []).forEach(function (L) {
        (L.tu || []).forEach(function (wd) {
          var t = wd.start;
          if (t < 0 || t > api.DUR - 0.3 || t - last < 0.35) return;
          if ((o.bo || []).some(function (r) { return t >= r[0] && t < r[1]; })) return;
          var len = wd.text.replace(/[^A-Za-z]/g, "").length, nhan = /[.,!?]$/.test(wd.text) ? 0.6 : 0;
          if (len < 4 && !nhan) return;
          var a = (i++ % 2 ? 1 : -1) * (1.5 + nhan + (len > 7 ? 0.5 : 0)) * amp;
          tl.to(w.talk, { rotation: a, y: -3 - nhan * 3, svgOrigin: "200 290", duration: 0.12, ease: "power2.out" }, t);
          tl.to(w.talk, { rotation: 0, y: 0, svgOrigin: "200 290", duration: 0.3, ease: "sine.inOut" }, t + 0.14);
          last = t;
        });
      });
    };

    // ------------------------------------------------------------ thân
    api.breathe = function (w, t0, t1) {
      var per = 1.6, n = Math.max(1, Math.floor((t1 - t0) / per));
      tl.fromTo(w.upper, { scaleY: 1, scaleX: 1 }, { scaleY: 1.025, scaleX: 0.99, svgOrigin: "200 300", duration: per / 2, ease: "sine.inOut", yoyo: true, repeat: n * 2 - 1, immediateRender: false }, t0);
    };
    api.shiver = function (w, t0, t1, amp) {
      var per = 0.05, n = Math.max(2, Math.round((t1 - t0) / per));
      tl.fromTo(w.lift, { x: -amp }, { x: amp, duration: per, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
      tl.to(w.lift, { x: 0, duration: 0.08, ease: "power1.out" }, t0 + n * per);
    };
    api.hop = function (w, t, h, d) {
      tl.to(w.lift, { scaleY: 0.9, scaleX: 1.08, duration: 0.08, ease: "power2.out" }, t);
      tl.to(w.lift, { y: -h, scaleY: 1.06, scaleX: 0.96, duration: d * 0.45, ease: "power2.out" }, t + 0.08);
      tl.to(w.lift, { y: 0, scaleY: 1, scaleX: 1, duration: d * 0.4, ease: "power2.in" }, t + 0.08 + d * 0.45);
      tl.to(w.lift, { scaleY: 0.92, scaleX: 1.06, duration: 0.06, ease: "power2.out" }, t + 0.08 + d * 0.85);
      tl.to(w.lift, { scaleY: 1, scaleX: 1, duration: 0.25, ease: "back.out(3)" }, t + 0.14 + d * 0.85);
    };
    // Nghiêng thân trên (độ), ví dụ nhón nhìn, cúi
    api.nghieng = function (w, t, deg, d, ease) { tl.to(w.upper, { rotation: deg, svgOrigin: "200 300", duration: d || 0.3, ease: ease || "power2.out" }, t); };
    // Quay mặt: h ∈ [-1, 1] (âm = sang trái khung, dương = sang phải). Không lộ tấm mỏng.
    api.quay = function (w, t, h, d, ease) {
      d = d || 0.25; ease = ease || "power2.inOut";
      tl.to(w.face, { x: 34 * h, y: 2 * Math.abs(h), duration: d, ease: ease }, t);
      tl.to(w.lands, { x: 52 * h, duration: d, ease: ease }, t);
      tl.to(w.pack, { x: -30 * h, duration: d, ease: ease }, t);
      tl.to(w.strap, { x: -14 * h, opacity: h > 0.5 ? 0.4 : 1, duration: d, ease: ease }, t);
      tl.to(w.shadeR, { opacity: h < 0 ? -h * 0.2 : 0, duration: d, ease: ease }, t);
      tl.to(w.shadeL, { opacity: h > 0 ? h * 0.2 : 0, duration: d, ease: ease }, t);
      tl.to(w.svg, { scaleX: 1 - 0.05 * Math.abs(h), duration: d, ease: ease }, t);
      tl.to([w.legL, w.legR], { x: 8 * h, duration: d, ease: ease }, t);
      w.huong = h;
    };
    api.quaySet = function (w, h) {
      gsap.set(w.face, { x: 34 * h, y: 2 * Math.abs(h) }); gsap.set(w.lands, { x: 52 * h }); gsap.set(w.pack, { x: -30 * h });
      gsap.set(w.strap, { x: -14 * h }); gsap.set(w.shadeR, { opacity: h < 0 ? -h * 0.2 : 0 }); gsap.set(w.shadeL, { opacity: h > 0 ? h * 0.2 : 0 }); gsap.set(w.svg, { scaleX: 1 - 0.05 * Math.abs(h) }); gsap.set([w.legL, w.legR], { x: 8 * h });
      w.huong = h;
    };
    // Đi lắc lư tới (x1, z1). o: step, swing, ease, noArms, keepR, keepL, face (h khi đi), endFace, sfx, vol
    api.walk = function (w, t0, t1, x1, z1, o) {
      o = o || {};
      var dur = t1 - t0, n = Math.max(2, Math.round(dur / (o.step || 0.3))), st = dur / n;
      tl.fromTo(w.pos, { x: w.x, z: w.z }, { x: x1, z: z1, duration: dur, ease: o.ease || "power1.inOut", immediateRender: false }, t0);
      var sw = o.swing || 20;
      tl.fromTo(w.legL, { rotation: -sw }, { rotation: sw, svgOrigin: "174 290", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
      tl.fromTo(w.legR, { rotation: sw }, { rotation: -sw, svgOrigin: "226 290", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
      tl.to([w.legL, w.legR], { rotation: 0, duration: 0.14, ease: "power2.out" }, t1);
      tl.fromTo(w.lift, { y: 0, scaleY: 0.95, scaleX: 1.04 }, { y: -15 * w.s, scaleY: 1.03, scaleX: 0.98, duration: st / 2, ease: "sine.out", yoyo: true, repeat: 2 * n - 1, immediateRender: false }, t0);
      tl.to(w.lift, { y: 0, scaleY: 1, scaleX: 1, duration: 0.2, ease: "back.out(2)" }, t1);
      tl.fromTo(w.talk, { rotation: -5 }, { rotation: 5, svgOrigin: "200 290", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
      tl.to(w.talk, { rotation: 0, svgOrigin: "200 290", duration: 0.2, ease: "power2.out" }, t1);
      tl.fromTo(w.pack, { y: 0, rotation: 0 }, { y: -12, rotation: -4, svgOrigin: "300 250", duration: st / 2, ease: "sine.inOut", yoyo: true, repeat: 2 * n - 1, immediateRender: false }, t0 + 0.07);
      tl.to(w.pack, { y: 0, rotation: 0, svgOrigin: "300 250", duration: 0.35, ease: "back.out(4)" }, t1 + 0.07);
      if (!o.noArms) {
        var aL = w.arm.L, aR = w.arm.R;
        if (!o.keepL) {
          tl.fromTo(w.armL, { rotation: aL + 14 }, { rotation: aL - 14, svgOrigin: "86 212", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
          tl.to(w.armL, { rotation: aL, svgOrigin: "86 212", duration: 0.2 }, t1);
        }
        if (!o.keepR) {
          tl.fromTo(w.armR, { rotation: aR + 14 }, { rotation: aR - 14, svgOrigin: "314 212", duration: st, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
          tl.to(w.armR, { rotation: aR, svgOrigin: "314 212", duration: 0.2 }, t1);
        }
      }
      if (o.face != null) { api.quay(w, t0, o.face, 0.25); api.quay(w, t1 - 0.1, o.endFace || 0, 0.3); }
      if (o.sfx) for (var k = 0; k < n; k++) api.sfx(o.sfx, t0 + st * k + st * 0.45, o.vol || 0.32);
      w.x = x1; w.z = z1;
    };
  });
})();
