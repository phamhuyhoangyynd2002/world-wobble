/* T2 · Cảnh 1 bản thử 60s: Wob ở bàn kỷ vật giơ con cá đông cứng, đập xuống, nhảy sang sổ, lật trang, chỉ biển, "On purpose."
 * Dựng thủ tục: mỗi khung gọi render(t). Không tween DOM trực tiếp; GSAP chỉ làm đồng hồ (HyperFrames seek(t,false) -> onUpdate).
 * Kỹ thuật thử: on twos (nhân vật 12 hình/giây, camera 30), nét sôi (feTurbulence đổi seed 12 lần/giây),
 * lấy đà / co giãn / vượt-dội / theo đà (ba lô là con lắc), tay ống cao su, vật lý Matter.js tính trước, parallax, khẩu hình.
 */
(function () {
  "use strict";
  var resolveReady;
  window.T2 = { ready: new Promise(function (r) { resolveReady = r; }) };
  function start() {
  var D = JSON.parse(document.getElementById("t2-data").textContent);
  var DUR = 12.6, VO = 0.4; // giọng cảnh 1 bắt đầu ở 0,4 s
  var NS = "http://www.w3.org/2000/svg";
  var INK = "#1f2326", SEA = "#5a9fb8", PAPER = "#EFE3C8", TERRA = "#E0703A";

  // ---------- tiện ích ----------
  function S(tag, attrs, parent, html) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (html) n.innerHTML = html;
    if (parent) parent.appendChild(n);
    return n;
  }
  function A(n, attrs) { for (var k in attrs) n.setAttribute(k, attrs[k]); }
  var E = {
    lin: function (x) { return x; },
    in2: function (x) { return x * x; },
    out2: function (x) { return 1 - (1 - x) * (1 - x); },
    io2: function (x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; },
    in3: function (x) { return x * x * x; },
    out3: function (x) { return 1 - Math.pow(1 - x, 3); },
    io3: function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; },
    back: function (x) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
    elastic: function (x) { return x <= 0 ? 0 : x >= 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * (2 * Math.PI) / 3) + 1; },
    sine: function (x) { return -(Math.cos(Math.PI * x) - 1) / 2; }
  };
  function mix(a, b, p) {
    if (Array.isArray(a)) return a.map(function (v, i) { return v + (b[i] - v) * p; });
    return a + (b - a) * p;
  }
  // keys: [[thời điểm, giá trị, easing của đoạn đi TỚI key này], ...]
  function kf(t, keys) {
    if (t <= keys[0][0]) return keys[0][1];
    for (var i = 1; i < keys.length; i++) {
      if (t <= keys[i][0]) {
        var k0 = keys[i - 1], k1 = keys[i];
        var p = (E[k1[2] || "io2"])((t - k0[0]) / Math.max(1e-6, k1[0] - k0[0]));
        return mix(k0[1], k1[1], p);
      }
    }
    return keys[keys.length - 1][1];
  }
  function hash(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function twos(t) { return Math.floor(t * 12 + 1e-6) / 12; }
  function M(m) { return "matrix(" + [m.a, m.b, m.c, m.d, m.e, m.f].map(function (v) { return v.toFixed(3); }).join(",") + ")"; }
  function P(m, x, y) { var p = m.transformPoint(new DOMPoint(x, y)); return [p.x, p.y]; }

  // ---------- khung SVG ----------
  var stage = document.getElementById("stage");
  var svg = S("svg", { width: 1920, height: 1080, viewBox: "0 0 1920 1080" }, stage);
  var defs = S("defs", {}, svg);
  defs.innerHTML =
    '<filter id="boil" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">' +
    '<feTurbulence id="boil-n" type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="1" result="n"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/></filter>' +
    '<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffb36b" stop-opacity="0.34"/>' +
    '<stop offset="0.55" stop-color="#E0703A" stop-opacity="0.10"/><stop offset="1" stop-color="#E0703A" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="vig" cx="0.5" cy="0.48" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/>' +
    '<stop offset="1" stop-color="#0b1112" stop-opacity="0.55"/></radialGradient>' +
    '<linearGradient id="spine" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="0.5" stop-color="#3b2a1a" stop-opacity="0.35"/>' +
    '<stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>' +
    '<clipPath id="eyeL"><ellipse cx="160" cy="156" rx="25" ry="31"/></clipPath>' +
    '<clipPath id="eyeR"><ellipse cx="238" cy="156" rx="25" ry="31"/></clipPath>' +
    '<clipPath id="sky"><rect x="1394" y="434" width="252" height="204" rx="6"/></clipPath>';

  var boilWrap = S("g", { filter: "url(#boil)" }, svg); // nét sôi ở không gian màn hình
  var cam = S("g", {}, boilWrap);
  var screenFx = S("g", {}, svg);

  // ---------- thế giới: tường (lớp xa, parallax) ----------
  var wall = S("g", {}, cam);
  S("rect", { x: -900, y: -400, width: 3800, height: 1220, fill: "#1E2A2B" }, wall);
  // bảng ghim + bưu thiếp trơn (không chữ, không ảnh thật)
  S("rect", { x: 150, y: 150, width: 420, height: 300, rx: 10, fill: "#7a5a3a", stroke: INK, "stroke-width": 6 }, wall);
  S("rect", { x: 172, y: 172, width: 376, height: 256, rx: 4, fill: "#a07848" }, wall);
  [[200, 200, 150, 100, -4, "#3F6A70"], [380, 190, 140, 110, 5, PAPER], [250, 310, 130, 95, 3, TERRA]].forEach(function (c) {
    var g = S("g", { transform: "rotate(" + c[4] + " " + (c[0] + c[2] / 2) + " " + (c[1] + c[3] / 2) + ")" }, wall);
    S("rect", { x: c[0], y: c[1], width: c[2], height: c[3], fill: c[5], stroke: INK, "stroke-width": 4 }, g);
    S("circle", { cx: c[0] + c[2] / 2, cy: c[1] + 10, r: 7, fill: "#d9543c", stroke: INK, "stroke-width": 3 }, g);
  });
  S("path", { d: "M 210 360 C 260 330 300 390 360 350", fill: "none", stroke: INK, "stroke-width": 3, "stroke-dasharray": "10 9", opacity: 0.7 }, wall);
  // cửa sổ đêm có tuyết rơi bên ngoài
  S("rect", { x: 760, y: 120, width: 330, height: 380, rx: 8, fill: "#16334a", stroke: INK, "stroke-width": 8 }, wall);
  var winSnow = S("g", {}, wall);
  S("path", { d: "M 925 120 L 925 500 M 760 310 L 1090 310", stroke: "#3b2a1a", "stroke-width": 12 }, wall);
  S("rect", { x: 750, y: 495, width: 350, height: 18, fill: "#7a5a3a", stroke: INK, "stroke-width": 5 }, wall);
  var winFlakes = [];
  for (var i = 0; i < 26; i++) winFlakes.push({ x: 770 + hash(i) * 310, s: 26 + hash(i + 50) * 30, o: hash(i + 90) * 380, r: 3 + hash(i + 7) * 3, n: S("circle", { r: 4, fill: "#e8f6ff" }, winSnow) });

  // ---------- bàn ----------
  var desk = S("g", {}, cam);
  S("rect", { x: -900, y: 790, width: 3800, height: 24, fill: "#c98a4e", stroke: INK, "stroke-width": 6 }, desk);
  S("rect", { x: -900, y: 814, width: 3800, height: 500, fill: "#a8683a" }, desk);
  for (i = 0; i < 9; i++) {
    var gy = 850 + i * 34 + hash(i) * 10;
    S("path", { d: "M -900 " + gy + " C 0 " + (gy - 14) + " 900 " + (gy + 16) + " 2900 " + (gy - 6), fill: "none", stroke: "#7d4a26", "stroke-width": 3, opacity: 0.55 }, desk);
  }
  S("ellipse", { cx: 1500, cy: 802, rx: 620, ry: 26, fill: "#ffcf8a", opacity: 0.25 }, desk); // vũng sáng đèn

  // ---------- đèn bàn ----------
  var lamp = S("g", {}, cam);
  S("path", { d: "M 1800 790 L 1760 520 L 1650 330", fill: "none", stroke: INK, "stroke-width": 14, "stroke-linecap": "round" }, lamp);
  S("path", { d: "M 1800 790 L 1760 520 L 1650 330", fill: "none", stroke: "#3F6A70", "stroke-width": 7, "stroke-linecap": "round" }, lamp);
  S("ellipse", { cx: 1800, cy: 786, rx: 70, ry: 14, fill: "#3F6A70", stroke: INK, "stroke-width": 6 }, lamp);
  S("path", { d: "M 1700 290 L 1560 350 L 1610 450 Z", fill: "#3F6A70", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round" }, lamp);
  S("circle", { cx: 1655, cy: 335, r: 14, fill: INK }, lamp);

  // ---------- sổ du lịch trên giá ----------
  var book = S("g", {}, cam);
  S("path", { d: "M 1200 790 L 1250 700 M 1560 790 L 1510 700", stroke: INK, "stroke-width": 10, "stroke-linecap": "round" }, book);
  S("rect", { x: 1086, y: 406, width: 588, height: 388, rx: 14, fill: "#d9543c", stroke: INK, "stroke-width": 7 }, book);
  S("rect", { x: 1100, y: 420, width: 280, height: 360, fill: PAPER, stroke: INK, "stroke-width": 4 }, book);
  // trang trái: đường nét đứt hành trình (doodle)
  S("path", { d: "M 1130 720 C 1180 640 1240 700 1280 620 S 1340 520 1350 470", fill: "none", stroke: "#3F6A70", "stroke-width": 4, "stroke-dasharray": "12 10" }, book);
  S("path", { d: "M 1340 470 l 18 -6 l -8 16 z", fill: "#3F6A70" }, book);
  // trang phải B: hình vẽ ngôi làng + biển tên (lộ ra sau khi lật)
  var pageB = S("g", {}, book);
  S("rect", { x: 1380, y: 420, width: 280, height: 360, fill: PAPER, stroke: INK, "stroke-width": 4 }, pageB);
  var sketch = S("g", { "clip-path": "url(#sky)" }, pageB);
  S("rect", { x: 1394, y: 434, width: 252, height: 204, fill: "#d3e8ee" }, sketch);
  S("path", { d: "M 1394 560 L 1440 500 L 1480 540 L 1530 480 L 1590 545 L 1646 505 L 1646 640 L 1394 640 Z", fill: "#a9c6d0", stroke: INK, "stroke-width": 2.5 }, sketch);
  S("rect", { x: 1394, y: 604, width: 252, height: 40, fill: "#f6f8f7", stroke: INK, "stroke-width": 2.5 }, sketch);
  var smokes = [];
  [[1420, 584, 46], [1490, 576, 58], [1570, 586, 50]].forEach(function (h, k) {
    S("rect", { x: h[0], y: h[1], width: h[2], height: 30, fill: "#c98a4e", stroke: INK, "stroke-width": 2.5 }, sketch);
    S("path", { d: "M " + (h[0] - 6) + " " + h[1] + " L " + (h[0] + h[2] / 2) + " " + (h[1] - 22) + " L " + (h[0] + h[2] + 6) + " " + h[1] + " Z", fill: TERRA, stroke: INK, "stroke-width": 2.5, "stroke-linejoin": "round" }, sketch);
    S("rect", { x: h[0] + h[2] - 14, y: h[1] - 22, width: 7, height: 16, fill: "#7d4a26", stroke: INK, "stroke-width": 2 }, sketch);
    S("rect", { x: h[0] + 9, y: h[1] + 10, width: 10, height: 10, fill: "#ffd27a", stroke: INK, "stroke-width": 1.5 }, sketch);
    smokes.push({ x: h[0] + h[2] - 10.5, y: h[1] - 24, ph: k * 1.7, n: S("path", { fill: "none", stroke: "#ffffff", "stroke-width": 7, "stroke-linecap": "round", opacity: 0.95 }, sketch) });
  });
  var sketchSnow = S("g", {}, sketch);
  var flakes = [];
  for (i = 0; i < 46; i++) flakes.push({ x: 1394 + hash(i + 300) * 252, s: 20 + hash(i + 400) * 26, o: hash(i + 500) * 204, n: S("circle", { r: 2.4, fill: "#ffffff", stroke: INK, "stroke-width": 0.6, opacity: 0 }, sketchSnow) });
  S("rect", { x: 1394, y: 434, width: 252, height: 204, rx: 6, fill: "none", stroke: INK, "stroke-width": 3 }, pageB);
  var sign = S("g", {}, pageB);
  S("rect", { x: 1514, y: 700, width: 12, height: 72, fill: "#7d4a26", stroke: INK, "stroke-width": 3 }, sign);
  S("rect", { x: 1390, y: 646, width: 260, height: 98, rx: 6, fill: "#e9d3a4", stroke: INK, "stroke-width": 4 }, sign);
  S("text", { x: 1520, y: 690, "text-anchor": "middle", "font-family": "Fraunces", "font-weight": 800, "font-size": 40, fill: INK, textLength: 226, lengthAdjust: "spacingAndGlyphs" }, sign).textContent = "OYMYAKON";
  S("text", { x: 1520, y: 734, "text-anchor": "middle", "font-family": "Fraunces", "font-weight": 600, "font-size": 40, fill: INK }, sign).textContent = "pop. ~500";
  // tờ đang lật (mặt trước: doodle bông tuyết; mặt sau: giấy trơn)
  var leaf = S("g", {}, book);
  var leafFront = S("g", {}, leaf), leafBack = S("g", {}, leaf);
  S("rect", { x: 1380, y: 420, width: 280, height: 360, fill: PAPER, stroke: INK, "stroke-width": 4 }, leafFront);
  S("path", { d: "M 1520 520 l 0 120 M 1468 550 l 104 60 M 1468 610 l 104 -60", stroke: "#3F6A70", "stroke-width": 6, "stroke-linecap": "round" }, leafFront);
  S("path", { d: "M 1440 700 C 1480 690 1560 715 1600 700", fill: "none", stroke: INK, "stroke-width": 3, opacity: 0.4 }, leafFront);
  S("rect", { x: 1380, y: 420, width: 280, height: 360, fill: "#e4d6b6", stroke: INK, "stroke-width": 4 }, leafBack);
  S("path", { d: "M 1410 470 L 1630 470 M 1410 510 L 1630 510 M 1410 550 L 1630 550", stroke: INK, "stroke-width": 2, opacity: 0.18 }, leafBack);
  S("rect", { x: 1370, y: 420, width: 20, height: 360, fill: "url(#spine)" }, book);

  // ---------- hộp kỷ vật ----------
  var box = S("g", {}, cam);
  S("path", { d: "M 124 692 L 356 692 L 338 598 L 108 612 Z", fill: "#8e5527", stroke: INK, "stroke-width": 6, "stroke-linejoin": "round" }, box);
  S("rect", { x: 120, y: 690, width: 240, height: 20, fill: "#5e3a1c" }, box);
  S("rect", { x: 150, y: 640, width: 70, height: 90, fill: PAPER, stroke: INK, "stroke-width": 4, transform: "rotate(-12 185 685)" }, box);
  S("rect", { x: 300, y: 650, width: 46, height: 80, fill: "#3F6A70", stroke: INK, "stroke-width": 4, transform: "rotate(10 323 690)" }, box);
  function boxFront(parent) {
    var g = S("g", {}, parent);
    S("rect", { x: 120, y: 700, width: 240, height: 100, rx: 6, fill: "#d9a86a", stroke: INK, "stroke-width": 6 }, g);
    S("rect", { x: 190, y: 728, width: 100, height: 40, rx: 4, fill: PAPER, stroke: INK, "stroke-width": 3 }, g);
    return g;
  }
  boxFront(box);

  // ---------- Wob (thân + ba lô lấy nguyên từ SVG gốc; tay, chân, mắt, mí, miệng vẽ thủ tục) ----------
  var wobRoot = S("g", {}, cam);
  var legL = S("path", { fill: "none", stroke: INK, "stroke-width": 15, "stroke-linecap": "round" }, wobRoot);
  var legR = S("path", { fill: "none", stroke: INK, "stroke-width": 15, "stroke-linecap": "round" }, wobRoot);
  var shoeL = S("ellipse", { rx: 27, ry: 12, fill: "#d9543c", stroke: INK, "stroke-width": 5 }, wobRoot);
  var shoeR = S("ellipse", { rx: 27, ry: 12, fill: "#d9543c", stroke: INK, "stroke-width": 5 }, wobRoot);
  var up = S("g", {}, wobRoot);
  var pack = S("g", {}, up, D.wob.ba_lo);
  var armsBack = S("g", {}, up);           // tay mọc ra từ sau thân (kiểu cắt giấy)
  S("g", {}, up, D.wob.than);
  S("ellipse", { cx: 124, cy: 204, rx: 16, ry: 10, fill: "#e9806e", opacity: 0.55 }, up);
  S("ellipse", { cx: 276, cy: 204, rx: 16, ry: 10, fill: "#e9806e", opacity: 0.55 }, up);
  var eyes = S("g", {}, up), eyeParts = [];
  [[160, "eyeL"], [238, "eyeR"]].forEach(function (e) {
    var g = S("g", {}, eyes);
    S("ellipse", { cx: e[0], cy: 156, rx: 25, ry: 31, fill: "#fffdf6" }, g);
    var pupil = S("circle", { r: 13, fill: INK }, g);
    var hl = S("circle", { r: 5, fill: "#fff" }, g);
    var lidG = S("g", { "clip-path": "url(#" + e[1] + ")" }, g);
    var lid = S("rect", { x: e[0] - 30, y: 120, width: 60, height: 0, fill: SEA }, lidG);
    var lidLine = S("path", { fill: "none", stroke: INK, "stroke-width": 5, "stroke-linecap": "round" }, lidG);
    S("ellipse", { cx: e[0], cy: 156, rx: 25, ry: 31, fill: "none", stroke: INK, "stroke-width": 5 }, g);
    eyeParts.push({ cx: e[0], g: g, pupil: pupil, hl: hl, lid: lid, lidLine: lidLine });
  });
  var mouth = S("path", { stroke: INK, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round" }, up);
  var tongue = S("path", { fill: "#e9806e" }, up);
  var armsFront = S("g", {}, up);          // chỉ dùng khi tay vòng trước thân (ôm người run)
  var arms = S("g", {}, armsBack);
  var armL = S("path", { fill: "none", stroke: INK, "stroke-width": 13, "stroke-linecap": "round" }, arms);
  var armR = S("path", { fill: "none", stroke: INK, "stroke-width": 13, "stroke-linecap": "round" }, arms);
  var handL = S("circle", { r: 14, fill: INK }, arms), handR = S("circle", { r: 14, fill: INK }, arms);

  // ---------- con cá đông cứng ----------
  var fish = S("g", {}, cam);
  S("path", { d: "M -112 0 L -154 -32 L -140 0 L -154 32 Z", fill: "#7d97a4", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round" }, fish);
  S("path", { d: "M -12 -31 L 18 -50 L 44 -30", fill: "#7d97a4", stroke: INK, "stroke-width": 4, "stroke-linejoin": "round" }, fish);
  S("path", { d: "M 150 0 C 120 -36 40 -36 -60 -27 C -92 -22 -110 -10 -118 0 C -110 10 -92 22 -60 28 C 40 38 120 32 150 0 Z", fill: "#8fa9b6", stroke: INK, "stroke-width": 5, "stroke-linejoin": "round" }, fish);
  S("path", { d: "M -96 10 C -40 26 60 28 132 10 C 100 30 20 34 -60 26 Z", fill: "#d6e4ea" }, fish);
  S("path", { d: "M 92 -22 Q 82 0 92 22", fill: "none", stroke: INK, "stroke-width": 3.5 }, fish);
  S("path", { d: "M 104 -9 Q 112 -2 121 -9", fill: "none", stroke: INK, "stroke-width": 4, "stroke-linecap": "round" }, fish);
  S("path", { d: "M 150 0 L 134 5", stroke: INK, "stroke-width": 3.5, "stroke-linecap": "round" }, fish);
  [[-30, -14], [20, -18], [60, 6], [-70, 4]].forEach(function (f) {
    S("path", { d: "M " + (f[0] - 6) + " " + f[1] + " l 12 0 M " + f[0] + " " + (f[1] - 6) + " l 0 12", stroke: "#ffffff", "stroke-width": 3, "stroke-linecap": "round" }, fish);
  });
  var boxTop = boxFront(cam);              // mặt hộp che cá khi cá còn nằm trong hộp
  var grip = S("g", {}, cam);              // bàn tay vẽ đè lên cá khi đang cầm
  var gripL = S("circle", { r: 14, fill: INK }, grip), gripR = S("circle", { r: 14, fill: INK }, grip);

  // ---------- tiền cảnh (parallax gần): bút chì ----------
  var fg = S("g", {}, cam);
  S("path", { d: "M 330 1010 L 820 960 L 850 975 L 820 990 L 336 1040 Z", fill: "#e8b84a", stroke: INK, "stroke-width": 7, "stroke-linejoin": "round" }, fg);
  S("path", { d: "M 820 960 L 850 975 L 820 990 Z", fill: "#f0d9b0", stroke: INK, "stroke-width": 5 }, fg);
  S("path", { d: "M 330 1010 L 336 1040 L 290 1046 L 284 1014 Z", fill: "#d9543c", stroke: INK, "stroke-width": 6 }, fg);

  var glow = S("ellipse", { cx: 1560, cy: 560, rx: 1100, ry: 760, fill: "url(#glow)", style: "mix-blend-mode:screen" }, cam);

  // ---------- lớp màn hình: viền tối + hạt giấy (tính một lần, có seed) ----------
  S("rect", { x: 0, y: 0, width: 1920, height: 1080, fill: "url(#vig)" }, screenFx);
  (function () {
    var c = document.createElement("canvas"); c.width = 960; c.height = 540;
    var x = c.getContext("2d"), img = x.createImageData(960, 540), r = rng(42);
    for (var j = 0; j < img.data.length; j += 4) { var v = 128 + (r() - 0.5) * 120; img.data[j] = img.data[j + 1] = img.data[j + 2] = v; img.data[j + 3] = 255; }
    x.putImageData(img, 0, 0);
    S("image", { href: c.toDataURL("image/png"), x: 0, y: 0, width: 1920, height: 1080, opacity: 0.09, style: "mix-blend-mode:multiply", preserveAspectRatio: "none" }, screenFx);
  })();

  // ================= DIỄN =================
  var phys = D.vat_ly.frames, REL = 1.6; // thả cá ở 1,6 s; quỹ đạo sau đó do Matter.js tính
  function fishPose(t) {
    if (t < 0.45) return [290, 640, -62];
    if (t < 0.78) { // giật lên theo cung
      var p = E.out2((t - 0.45) / 0.33), q = 1 - p;
      return [q * q * 290 + 2 * q * p * 330 + p * p * 560, q * q * 640 + 2 * q * p * 330 + p * p * 372, -62 * q * q * q + 4 * p];
    }
    if (t < 1.35) {
      var s = kf(t, [[0.78, 0], [0.98, 1, "out2"]]);
      return [560 + Math.sin(t * 6) * 3, 372 + 23 * s + Math.sin(t * 5) * 3, 4 - 4 * s + Math.sin(t * 4) * 2];
    }
    if (t < REL) return kf(t, [[1.35, [560, 395, 0]], [1.47, [588, 356, -12], "out2"], [REL, [500, 600, 10.31], "in2"]]);
    var f = Math.min(phys.length - 1, (t - REL) * 30), i0 = Math.floor(f), i1 = Math.min(phys.length - 1, i0 + 1);
    return mix(phys[i0], phys[i1], f - i0);
  }
  var MOUTH = {
    X: ["M 180 228 Q 200 238 220 228", "none"],
    A: ["M 182 231 L 218 231", "none"],
    B: ["M 184 226 Q 200 222 216 226 Q 200 238 184 226 Z", INK],
    C: ["M 182 222 Q 200 214 218 222 Q 214 246 200 246 Q 186 246 182 222 Z", INK],
    D: ["M 178 218 Q 200 208 222 218 Q 220 256 200 256 Q 180 256 178 218 Z", INK],
    E: ["M 188 220 Q 200 214 212 220 Q 214 244 200 244 Q 186 244 188 220 Z", INK],
    F: ["M 193 224 Q 200 218 207 224 Q 209 238 200 238 Q 191 238 193 224 Z", INK],
    G: ["M 183 225 Q 200 221 217 225 Q 200 236 183 225 Z", INK],
    H: ["M 183 222 Q 200 215 217 222 Q 214 243 200 243 Q 186 243 183 222 Z", INK]
  };
  var TONGUE = { C: "M 190 240 Q 200 232 210 240 Q 200 246 190 240 Z", D: "M 186 248 Q 200 236 214 248 Q 200 256 186 248 Z", H: "M 189 236 Q 200 228 211 236 Q 200 242 189 236 Z" };
  function viseme(t) {
    var a = t - VO, cues = D.khau_hinh;
    if (t > 10.8) return "A"; // tỉnh bơ sau "On purpose."
    for (var i = 0; i < cues.length; i++) if (a >= cues[i].start && a < cues[i].end) return cues[i].value;
    return "X";
  }
  function rootX(t) { return t < 2.2 ? 560 : t < 2.62 ? 560 + (1230 - 560) * ((t - 2.2) / 0.42) : 1230; }
  function rootY(t) { if (t < 2.2 || t > 2.62) return 800; var p = (t - 2.2) / 0.42; return 800 - 4 * p * (1 - p) * 150; }
  // ba lô = con lắc tắt dần bị đẩy bởi gia tốc của Wob (theo đà thật, không keyframe)
  function packAngle(t) {
    var th = 0, w = 0, dt = 1 / 240, h = 1 / 120;
    for (var s = 0; s < t; s += dt) {
      var ax = (rootX(s + h) - 2 * rootX(s) + rootX(s - h)) / (h * h);
      var ay = (rootY(s + h) - 2 * rootY(s) + rootY(s - h)) / (h * h);
      var acc = -90 * th - 7 * w - ax / 900 - ay / 2600 + (s > 1.47 && s < 1.62 ? 9 : 0);
      w += acc * dt; th += w * dt;
      th = Math.max(-0.7, Math.min(0.7, th));
    }
    return th * 57.3;
  }
  function arm(path, hand, sx, sy, hx, hy, side) {
    var dx = hx - sx, dy = hy - sy, d = Math.hypot(dx, dy) || 1, L0 = 150;
    var bend = d < L0 ? Math.sqrt(L0 * L0 - d * d) * 0.5 : 0;
    var nx = -dy / d, ny = dx / d;
    if ((nx * side) < 0) { nx = -nx; ny = -ny; }
    var cx = (sx + hx) / 2 + nx * bend, cy = (sy + hy) / 2 + ny * bend + bend * 0.25;
    A(path, { d: "M " + sx.toFixed(1) + " " + sy.toFixed(1) + " Q " + cx.toFixed(1) + " " + cy.toFixed(1) + " " + hx.toFixed(1) + " " + hy.toFixed(1) });
    A(hand, { cx: hx.toFixed(1), cy: hy.toFixed(1) });
  }
  function blink(t, at, dur) { return Math.max(0, 1 - Math.abs(t - at) / (dur / 2)); }

  function render(t) {
    var tq = twos(t); // nhân vật, đạo cụ: on twos

    // --- camera (mượt, 30 khung) ---
    var c = kf(t, [[0, [640, 640, 1.18]], [2.15, [665, 640, 1.18]], [2.75, [1180, 600, 1.08], "io3"], [9.8, [1205, 596, 1.1], "sine"],
      [11.3, [1235, 592, 1.42], "io2"], [12.45, [1520, 552, 7.4], "io3"]]);
    var shake = 0;
    if (t > 1.68 && t < 2.0) shake = 11 * Math.exp(-(t - 1.68) * 14);
    if (t > 2.62 && t < 2.9) shake = Math.max(shake, 5 * Math.exp(-(t - 2.62) * 14));
    var drift = t < 11.3 ? 1 : Math.max(0, 1 - (t - 11.3) * 2);
    var cx = c[0] + Math.sin(t * 0.6) * 6 * drift + Math.sin(tq * 61) * shake;
    var cy = c[1] + Math.cos(t * 0.45) * 4 * drift + Math.cos(tq * 47) * shake;
    A(cam, { transform: "translate(960 540) scale(" + c[2].toFixed(4) + ") translate(" + (-cx).toFixed(2) + " " + (-cy).toFixed(2) + ")" });
    A(wall, { transform: "translate(" + ((cx - 960) * 0.18).toFixed(2) + " " + ((cy - 540) * 0.12).toFixed(2) + ")" }); // xa: trôi chậm hơn
    A(fg, { transform: "translate(" + (-(cx - 960) * 0.22).toFixed(2) + " 0)" });                                       // gần: trôi nhanh hơn
    winFlakes.forEach(function (f) { var y = 120 + ((f.o + tq * f.s * 3) % 380); A(f.n, { cx: (f.x + Math.sin(tq + f.o) * 6).toFixed(1), cy: y.toFixed(1), r: f.r }); });

    // --- nét sôi: đổi seed 12 lần/giây ---
    A(document.getElementById("boil-n"), { seed: String(Math.floor(t * 12) + 1) });

    // --- con cá ---
    var fp = fishPose(tq);
    A(fish, { transform: "translate(" + fp[0].toFixed(1) + " " + fp[1].toFixed(1) + ") rotate(" + fp[2].toFixed(2) + ")" });
    boxTop.style.display = tq < 0.5 ? "" : "none";

    // --- Wob: gốc, co giãn, nghiêng ---
    var X = rootX(tq), Y = rootY(tq);
    if (tq > 4.85 && tq < 6.7) X += (hash(Math.floor(tq * 12)) - 0.5) * 7; // run cầm cập
    var sy = kf(tq, [[0, 1], [0.15, 1], [0.42, 0.9], [0.6, 1.13, "out2"], [0.8, 0.95], [0.98, 1], [1.35, 1], [1.47, 1.07, "out2"], [1.6, 0.84, "in2"],
      [1.68, 0.9], [1.78, 1.1, "out2"], [1.95, 1], [2.08, 1], [2.2, 0.8, "out2"], [2.27, 1.16, "out2"], [2.45, 1], [2.58, 1.08, "in2"], [2.64, 0.76, "in2"],
      [2.98, 1, "elastic"], [4.85, 1], [5.0, 0.96], [6.6, 0.96], [6.8, 1], [8.05, 1], [8.2, 0.95], [8.32, 1.05, "out2"], [8.5, 1], [9.75, 1], [9.86, 0.95],
      [10.0, 1.03, "out2"], [10.15, 1]]);
    sy *= 1 + Math.sin(tq * 2 * Math.PI / 2.6) * 0.012; // thở
    var sx = 1 / Math.sqrt(sy);
    var lean = kf(tq, [[0, 0], [0.15, 0], [0.42, -16], [0.62, 6, "out2"], [0.85, -2], [1.0, 0], [1.35, 0], [1.47, 9, "out2"], [1.6, -14, "in2"], [1.8, -4, "out2"],
      [2.08, 0], [2.2, -5], [2.36, 10], [2.62, 4], [2.72, 6, "out2"], [2.96, -3], [3.15, 0], [8.05, 0], [8.15, -4], [8.32, 8, "back"], [9.6, 6], [9.85, 0]]);
    var mRoot = new DOMMatrix().translate(X, Y).scale(sx, sy).translate(-200, -392);
    var mUp = new DOMMatrix().translate(0, Math.sin(tq * 2 * Math.PI / 2.6) * 2).translate(200, 300).rotate(lean).translate(-200, -300);
    A(wobRoot, { transform: M(mRoot) });
    A(up, { transform: M(mUp) });
    A(pack, { transform: "rotate(" + packAngle(tq).toFixed(2) + " 300 100)" });

    // chân
    var tuck = kf(tq, [[2.2, 0], [2.3, 1, "out2"], [2.52, 1], [2.62, 0, "in2"]]);
    var hipL = P(mUp, 172, 290), hipR = P(mUp, 228, 290);
    var fL = [146 + 18 * tuck, 378 - 30 * tuck], fR = [254 - 18 * tuck, 378 - 30 * tuck];
    A(legL, { d: "M " + hipL[0].toFixed(1) + " " + hipL[1].toFixed(1) + " Q " + ((hipL[0] + fL[0]) / 2 - 8).toFixed(1) + " " + ((hipL[1] + fL[1]) / 2).toFixed(1) + " " + fL[0].toFixed(1) + " " + (fL[1] - 6).toFixed(1) });
    A(legR, { d: "M " + hipR[0].toFixed(1) + " " + hipR[1].toFixed(1) + " Q " + ((hipR[0] + fR[0]) / 2 + 8).toFixed(1) + " " + ((hipR[1] + fR[1]) / 2).toFixed(1) + " " + fR[0].toFixed(1) + " " + (fR[1] - 6).toFixed(1) });
    A(shoeL, { cx: fL[0].toFixed(1), cy: fL[1].toFixed(1), transform: "rotate(" + (-12 * tuck) + " " + fL[0] + " " + fL[1] + ")" });
    A(shoeR, { cx: fR[0].toFixed(1), cy: fR[1].toFixed(1), transform: "rotate(" + (12 * tuck) + " " + fR[0] + " " + fR[1] + ")" });

    // tay: nghỉ / cầm cá / ôm người run / đập trang sổ / chỉ biển
    var inv = mRoot.multiply(mUp).inverse();
    var sway = Math.sin(tq * 2.4) * 4;
    var hL = [62 + sway, 270], hR = [338 - sway, 270];
    var gL = P(new DOMMatrix().translate(fp[0], fp[1]).rotate(fp[2]), -86, 30), gR = P(new DOMMatrix().translate(fp[0], fp[1]).rotate(fp[2]), 86, 30);
    var holdW = kf(tq, [[0.15, 0], [0.32, 1, "out2"], [REL, 1], [1.7, 0, "out2"]]);
    var lg = P(inv, gL[0], gL[1]), rg = P(inv, gR[0], gR[1]);
    hL = mix(hL, lg, holdW); hR = mix(hR, rg, holdW);
    var hugW = kf(tq, [[4.85, 0], [5.0, 1, "out2"], [6.65, 1], [6.85, 0]]);
    hL = mix(hL, [178, 238], hugW); hR = mix(hR, [222, 242], hugW);
    var swatW = kf(tq, [[2.66, 0], [2.74, 1, "out2"], [3.0, 1], [3.2, 0]]);
    var sw = P(inv, ...kf(tq, [[2.74, [1600, 700]], [2.98, [1440, 690], "io2"]]));
    hR = mix(hR, sw, swatW);
    var ptW = kf(tq, [[8.08, 0], [8.3, 1, "back"], [9.55, 1], [9.8, 0]]);
    hR = mix(hR, P(inv, 1418, 688), ptW);
    (hugW > 0.3 ? armsFront : armsBack).appendChild(arms);
    arm(armL, handL, hugW > 0.3 ? 96 : 84, 205, hL[0], hL[1], -1);
    arm(armR, handR, hugW > 0.3 ? 304 : 316, 205, hR[0], hR[1], 1);
    grip.style.display = holdW > 0.5 ? "" : "none";
    A(gripL, { cx: gL[0].toFixed(1), cy: gL[1].toFixed(1) }); A(gripR, { cx: gR[0].toFixed(1), cy: gR[1].toFixed(1) });

    // mắt: nhìn, mí, chớp, mở to
    var look = kf(tq, [[0, [0, 0]], [0.15, [0, 0]], [0.3, [-9, 6]], [0.75, [-9, 6]], [0.85, [0, 0]], [1.4, [0, 0]], [1.52, [-9, 8]], [2.05, [-9, 8]], [2.15, [9, -1]],
      [3.5, [9, 0]], [3.62, [0, 0]], [8.0, [0, 0]], [8.12, [9, 3]], [9.6, [9, 3]], [9.75, [0, 0]]]);
    var lid = kf(tq, [[0, 0.08], [1.66, 0.08], [1.7, -0.2], [1.95, 0.08], [4.8, 0.08], [4.95, 0.32], [6.7, 0.32], [6.9, 0.08], [9.8, 0.08], [10.05, 0.52]]);
    lid = Math.max(lid, blink(tq, 3.55, 0.17), blink(tq, 7.3, 0.17));
    if (tq > 10.7 && tq < 11.15) lid = Math.max(lid, 0.52 + 0.48 * blink(tq, 10.92, 0.42)); // chớp chậm tỉnh bơ
    var wide = lid < 0 ? 1 - lid * 0.6 : 1;
    eyeParts.forEach(function (e) {
      A(e.g, { transform: "translate(" + e.cx + " 156) scale(" + wide.toFixed(3) + ") translate(" + (-e.cx) + " -156)" });
      A(e.pupil, { cx: (e.cx + 3 + look[0]).toFixed(1), cy: (160 + look[1]).toFixed(1) });
      A(e.hl, { cx: (e.cx + 8 + look[0]).toFixed(1), cy: (154 + look[1]).toFixed(1) });
      var ly = 125 + Math.max(0, lid) * 64;
      A(e.lid, { height: Math.max(0, ly - 120).toFixed(1) });
      A(e.lidLine, { d: lid > 0.02 ? "M " + (e.cx - 28) + " " + ly.toFixed(1) + " L " + (e.cx + 28) + " " + ly.toFixed(1) : "M 0 0" });
    });
    var v = viseme(tq), mm = MOUTH[v];
    A(mouth, { d: mm[0], fill: mm[1] });
    A(tongue, { d: TONGUE[v] || "M 0 0" });

    // --- sổ: lật trang, biển nảy, hình vẽ sống dậy ---
    var s = kf(tq, [[2.8, 1], [3.2, -1, "io2"]]);
    A(leaf, { transform: "translate(1380 0) scale(" + s.toFixed(3) + " 1) translate(-1380 0)" });
    leafFront.style.display = s >= 0 ? "" : "none"; leafBack.style.display = s < 0 ? "" : "none";
    var ps = kf(tq, [[8.25, 1], [8.4, 1.1, "out2"], [8.95, 1, "elastic"]]);
    A(sign, { transform: "translate(1520 695) scale(" + ps.toFixed(3) + ") translate(-1520 -695)" });
    var alive = kf(t, [[11.3, 0], [11.9, 1, "out2"]]);
    smokes.forEach(function (m) {
      var d = "M " + m.x + " " + m.y, h = 26 + 40 * alive;
      for (var k = 1; k <= 6; k++) d += " L " + (m.x + Math.sin(k * 1.3 + m.ph + tq * 3 * alive) * (2 + 2 * alive)).toFixed(1) + " " + (m.y - (h * k) / 6).toFixed(1);
      A(m.n, { d: d });
    });
    flakes.forEach(function (f) {
      var y = 434 + ((f.o + tq * f.s) % 204);
      A(f.n, { cx: (f.x + Math.sin(tq * 1.5 + f.o) * 4).toFixed(1), cy: y.toFixed(1), opacity: alive.toFixed(2) });
    });
  }

  // ---------- đồng hồ GSAP cho HyperFrames ----------
  var clock = { v: 0 };
  // modifiers chạy trong chính bước render của tween, kể cả khi seek tắt callback (suppressEvents)
  var tl = gsap.timeline({ paused: true });
  tl.to(clock, { v: DUR, duration: DUR, ease: "none", modifiers: { v: function (v) { render(Math.max(0, Math.min(DUR, +v))); return v; } } }, 0);
  // Đăng ký ngay: gọi document.fonts.load lúc trang đang dựng có thể treo (đã gặp khi thử). Font về thì vẽ lại khung hiện tại.
  render(0);
  resolveReady({ tl: tl }); // bọc lại: timeline GSAP có .then() nên Promise sẽ chờ nó chạy hết nếu resolve trực tiếp
  document.fonts.ready.then(function () { render(tl.time()); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
