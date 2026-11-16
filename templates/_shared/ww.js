/* World Wobble – runtime dùng chung cho template HyperFrames khung ngang.
 *
 * Viết theo cách của gamereel.js (GameReel), gọn lại cho video dài; bản 2 (16/11/2026) làm kỹ chuyển động:
 * - prepare_render.py điền <script id="ww-data" type="application/json"> bằng { script, timeline, wob_files, wob_svgs }.
 * - Mọi mốc thời gian lấy từ timeline: scenes[].start/duration, scenes[].shots[].at/end, scenes[].wob[], scenes[].que[],
 *   scenes[].verdict, chapters[], captions[]. Không tự tính lại thời gian từ chữ.
 * - Một timeline GSAP (paused) đăng ký sau khi font và ảnh tải xong. Không Math.random (dùng rng có seed), Date.now,
 *   gọi mạng, repeat: -1.
 *
 * Chuyển động (frame.md, mục motion):
 * - Chuyển nhịp trong cảnh: hoà tan + đẩy nhẹ (ảnh) hoặc zoom lùi (bản đồ sang bản đồ), 0,7 giây.
 * - Sang cảnh cùng chương: hoà tan chéo giữa hai cảnh (cảnh trước kéo dài thêm FADE).
 * - Sang chương mới: tấm giấy viền mực lướt qua, mang số và tên chương.
 * - Chữ to, tiêu đề: hiện từng từ. Ghim bản đồ: rơi, nảy, vòng sóng. Thẻ số liệu: bật ra. Con dấu: đóng + vòng mực.
 * - Wob: SVG nhúng thẳng (từng bộ phận cử động): thở, chớp mắt, lắc thân quanh bàn chân, cử động riêng theo biểu cảm;
 *   đổi biểu cảm bằng cú nhún co giãn + hoà chéo; lần đầu đi lạch bạch vào khung.
 * - Người que (scenes[].que[]): nét mực có viền giấy, khớp xoay quanh khớp; đi bộ, chạy, run, vẫy tay, nhảy, chỉ tay.
 */
(function () {
  "use strict";

  var FONT = "Fraunces";
  var FADE = 0.7; // hoà tan giữa hai nhịp hình / hai cảnh
  var WIPE_IN = 0.55, WIPE_HOLD = 0.85, WIPE_OUT = 0.55; // tấm giấy chuyển chương
  var INK = "#1f2326", PAPER = "#efe3c8";
  var STAMP_COLORS = { "WOULD MOVE": "var(--move)", "SUMMER ONLY": "var(--accent)", NOPE: "var(--accent-2)" };
  var SVGNS = "http://www.w3.org/2000/svg";

  // ---------- tiện ích ----------
  function readData() {
    var tag = document.getElementById("ww-data");
    var raw = tag ? tag.textContent.trim() : "";
    if (!raw) throw new Error("WW: thẻ ww-data trống – chạy prepare_render.py trước khi xem/render");
    var data = JSON.parse(raw);
    if (!data.timeline || !data.script) throw new Error("WW: dữ liệu thiếu timeline hoặc script");
    return data;
  }

  function el(tag, cls, text, parent) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    if (parent) parent.appendChild(n);
    return n;
  }

  function svgEl(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, String(attrs[k])); });
    if (parent) parent.appendChild(n);
    return n;
  }

  function round(x) { return Math.round(x * 1000) / 1000; }

  function timed(node, start, duration, track) {
    node.setAttribute("data-start", String(round(start)));
    node.setAttribute("data-duration", String(round(Math.max(0.04, duration))));
    if (track !== undefined) node.setAttribute("data-track-index", String(track));
    return node;
  }

  /* số ngẫu nhiên có seed (mulberry32 + băm FNV): chạy lại ra đúng y hệt, không dùng Math.random */
  function rng(seed) {
    var h = 2166136261;
    var s = String(seed);
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () {
      h = (h + 0x6d2b79f5) | 0;
      var t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* lặp một chuyển động qua lại trong [start, end): số lần lặp hữu hạn (không repeat: -1) */
  function oscillate(tl, target, from, to, period, start, end, ease) {
    var half = period / 2;
    var n = Math.floor((end - start) / half);
    if (n < 1) return;
    tl.fromTo(target, from, Object.assign({ duration: half, ease: ease || "sine.inOut", yoyo: true, repeat: n - 1 }, to), start);
  }

  function splitWords(node, text) {
    node.textContent = "";
    var words = String(text || "").split(/\s+/).filter(Boolean);
    return words.map(function (w, i) {
      var s = el("span", "ww-word", w, node);
      if (i < words.length - 1) node.appendChild(document.createTextNode(" "));
      return s;
    });
  }

  function ensureFonts() {
    return Promise.all(
      ["600", "800", "900"].map(function (w) {
        return document.fonts.load(w + ' 96px "' + FONT + '"', "Why Wob 0123");
      })
    ).then(function () {
      if (!document.fonts.check('900 96px "' + FONT + '"')) throw new Error('WW: font "' + FONT + '" chưa tải được');
    });
  }

  function waitImages(root) {
    var imgs = Array.prototype.slice.call(root.querySelectorAll("img"));
    return Promise.all(
      imgs.map(function (img) {
        if (img.complete && img.naturalWidth) return null;
        return new Promise(function (res, rej) {
          img.addEventListener("load", res, { once: true });
          img.addEventListener("error", function () {
            rej(new Error("WW: không tải được ảnh " + img.getAttribute("src")));
          }, { once: true });
        });
      })
    );
  }

  // ---------- nhịp hình ----------
  /* chuyển động trong nhịp: zoom-in (mặc định), zoom-out, pan-left, pan-right, still */
  function drift(tl, media, shot, start, end) {
    var move = shot.move || "zoom-in";
    var z = shot.zoom || (shot.kind === "ban-do" ? 1.12 : 1.06);
    var f = shot.focus || [0.5, 0.5];
    media.style.transformOrigin = f[0] * 100 + "% " + f[1] * 100 + "%";
    var from = { scale: 1, x: 0 }, to = { scale: z, x: 0 };
    if (move === "zoom-out") { from = { scale: z, x: 0 }; to = { scale: 1, x: 0 }; }
    if (move === "pan-left") { from = { scale: 1.08, x: 40 }; to = { scale: 1.08, x: -40 }; }
    if (move === "pan-right") { from = { scale: 1.08, x: -40 }; to = { scale: 1.08, x: 40 }; }
    if (move === "still") { from = { scale: 1.01, x: 0 }; to = { scale: 1.03, x: 0 }; }
    tl.fromTo(media, from, Object.assign({ duration: Math.max(0.1, end - start), ease: "sine.inOut" }, to), start);
  }

  function isMap(shot) { return shot && (shot.kind === "ban-do" || /\/ban-do\//.test(shot.src || "")); }

  /* ghim bản đồ: chấm rơi xuống + nảy, vòng sóng lan ra, nhãn trượt vào; lần lượt từng ghim */
  function buildMarks(media, shot, inAt, endAt, parts) {
    var marks = shot.marks || [];
    marks.forEach(function (m, k) {
      // hai ghim gần nhau: nhãn của ghim bên trái đặt sang trái để hai nhãn không đè nhau
      var leftSide = marks.some(function (o, j) {
        return j !== k && Math.abs(o.y - m.y) < 90 && Math.abs(o.x - m.x) < 420 && o.x > m.x;
      });
      var mk = el("div", "ww-mark" + (leftSide ? " ww-mark-left" : ""), null, media);
      mk.style.left = m.x + "px";
      mk.style.top = m.y + "px";
      var pin = el("div", "ww-pin", null, mk);
      var ring = el("div", "ww-pin-ring", null, mk);
      var label = el("div", "ww-mark-label", m.label, mk);
      // nhãn bản đồ có thể bị câu hỏi mở đầu hay thẻ đè lên trong chốc lát: có chủ ý
      label.setAttribute("data-layout-allow-occlusion", "");
      var t0 = inAt + 0.35 + k * 0.22;
      parts.push({ animate: function (tl) {
        tl.fromTo(pin, { y: -60, scale: 0.4, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "bounce.out" }, t0);
        tl.fromTo(label, { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, t0 + 0.25);
        var rings = Math.max(1, Math.min(4, Math.floor((endAt - t0) / 2.2)));
        for (var r = 0; r < rings; r++) {
          tl.fromTo(ring, { scale: 0.4, opacity: 0.85 }, { scale: 2.6, opacity: 0, duration: 1.4, ease: "power2.out" }, t0 + 0.3 + r * 2.2);
        }
      } });
    });
  }

  function buildScene(root, scene, sc, index, prev, nextStartsChapter) {
    var node = el("div", "clip ww-scene", null, root);
    node.id = "sc-" + scene.id;
    // cảnh kéo dài thêm FADE để cảnh sau hoà chéo lên trên (trừ khi sau đó là chương mới: tấm giấy che chỗ nối)
    var tail = nextStartsChapter ? 0.2 : FADE;
    timed(node, scene.start, scene.duration + tail, 1 + (index % 2));
    var parts = [];
    var facts = {};
    (sc.facts || []).forEach(function (f) { facts[f.label] = f; });
    var lastSrc = prev.src;
    var lastShot = prev.shot;
    var prevLayer = null;
    var sceneEnd = scene.end + tail;

    (scene.shots || []).forEach(function (shot, i) {
      var show = String(shot.show || "");
      if (show.indexOf("fact:") === 0) {
        var f = facts[show.slice(5)];
        if (!f) return;
        var card = el("div", "ww-fact", null, node);
        el("div", "ww-fact-label", f.label, card);
        var val = el("div", "ww-fact-value", f.value, card);
        var nextFact = (scene.shots || []).slice(i + 1).filter(function (s2) { return String(s2.show).indexOf("fact:") === 0; })[0];
        var endF = Math.min(scene.end, shot.end + 0.5, nextFact ? nextFact.at - 0.5 : Infinity);
        var tIn = Math.max(scene.start, shot.at - 0.5);
        parts.push({ animate: function (tl) {
          tl.fromTo(card, { opacity: 0, y: 40, rotation: -3, scale: 0.9 }, { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 0.55, ease: "back.out(1.8)" }, tIn);
          tl.fromTo(val, { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.2)" }, tIn + 0.18);
          tl.to(card, { opacity: 0, y: 20, duration: 0.4, ease: "power2.in" }, nextFact ? Math.max(tIn + 0.6, endF - 0.4) : Math.max(shot.at + 2.5, endF - 0.4));
        } });
        return;
      }
      var layer = el("div", "ww-shot" + (show === "text" ? " ww-shot-text" : ""), null, node);
      var media = el("div", "ww-media", null, layer);
      media.setAttribute("data-layout-allow-overflow", ""); // ảnh tự zoom, lia: tràn khung có chủ ý
      var src = shot.src || (show === "text" ? lastSrc : null);
      if (src) {
        var img = el("img", null, null, media);
        img.src = src;
        img.alt = "";
      }
      if (shot.nhan) { // nhãn nguồn hình, ví dụ ảnh chụp ở nơi khác trong vùng ("Elsewhere in Yakutia")
        var tag = el("div", "ww-shot-tag", shot.nhan, layer);
        tag.setAttribute("data-layout-allow-overlap", "");
      }
      var first = i === 0;
      var inAt = first ? scene.start : Math.max(scene.start, shot.at - FADE);
      var outAt = Math.min(sceneEnd, shot.end + FADE);
      buildMarks(media, shot, inAt, outAt, parts);

      if (show === "text") {
        var big = el("div", "ww-big-text", null, layer);
        var words = splitWords(big, sc.on_screen_text || "");
        parts.push({ animate: function (tl) {
          tl.fromTo(words, { opacity: 0, y: 46, rotation: function (k) { return k % 2 ? 3 : -3; } },
            { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: "back.out(1.6)", stagger: 0.07 }, inAt + 0.15);
        } });
        // cảnh kết: chữ to nhường chỗ cho con dấu phán quyết (con dấu hiện từ verdict.at - 0.8)
        if (scene.verdict && scene.verdict.at) {
          var vOut = Math.max(scene.start + 0.5, scene.verdict.at - 1.2);
          parts.push({ animate: function (tl) {
            tl.to(big, { opacity: 0, duration: 0.4, ease: "sine.inOut" }, vOut);
          } });
        }
      }
      if (shot.src) lastSrc = shot.src;

      // kiểu chuyển: cảnh đầu video hiện ngay; đầu chương mới nằm dưới tấm giấy; còn lại hoà tan có đẩy / zoom lùi
      var underWipe = first && scene.chapterStart && index > 0;
      var mapToMap = isMap(shot) && isMap(lastShot);
      var below = prevLayer; // nhịp ngay dưới: ẩn hẳn khi nhịp này đã hiện xong (không để nhãn, chữ cũ nằm chồng bên dưới)
      prevLayer = layer;
      parts.push({ animate: function (tl) {
        if (below) tl.set(below, { opacity: 0 }, inAt + FADE + 0.25);
        if ((first && index === 0) || underWipe) {
          tl.set(layer, { opacity: 1 }, inAt);
        } else if (mapToMap) {
          tl.fromTo(layer, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: FADE + 0.2, ease: "power2.inOut" }, inAt);
        } else if (show === "text") {
          tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: FADE, ease: "sine.inOut" }, inAt);
        } else {
          tl.fromTo(layer, { opacity: 0, scale: 1.035 }, { opacity: 1, scale: 1, duration: FADE, ease: "power2.inOut" }, inAt);
        }
        drift(tl, media, shot, inAt, outAt);
      } });
      lastShot = shot;
    });

    // câu hỏi mở đầu (cảnh hook) hoặc tiêu đề cảnh
    if (sc.on_screen_text && scene.type === "hook") {
      var wrap = el("div", "ww-question-wrap", null, node);
      var q = el("div", "ww-question", null, wrap);
      var qw = splitWords(q, sc.on_screen_text);
      parts.push({ animate: function (tl) {
        // khung 0 phải có đủ câu hỏi (ảnh xem trước): không hiện dần, chỉ nhích rất nhẹ cho có sức sống
        tl.set(wrap, { opacity: 1 }, scene.start);
        tl.fromTo(qw, { y: 0 }, { y: function (k) { return k % 2 ? -4 : 4; }, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, scene.start + 0.4);
        tl.to(qw, { opacity: 0, y: -20, duration: 0.45, ease: "power2.in", stagger: 0.05 }, Math.min(scene.end - 0.7, scene.start + 6.8));
        tl.to(wrap, { opacity: 0, duration: 0.6, ease: "sine.inOut" }, Math.min(scene.end - 0.6, scene.start + 7));
      } });
    } else if (sc.on_screen_text && !(scene.shots || []).some(function (s) { return s.show === "text"; })) {
      var t = el("div", "ww-title", null, node);
      var tw = splitWords(t, sc.on_screen_text);
      var tStart = scene.start + (scene.chapterStart && index > 0 ? WIPE_HOLD + WIPE_OUT : 0.2);
      parts.push({ animate: function (tl) {
        tl.fromTo(tw, { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", stagger: 0.06 }, tStart);
        tl.to(t, { opacity: 0, duration: 0.5, ease: "sine.inOut" }, Math.min(scene.end - 0.5, tStart + 4.3));
      } });
    }
    return { parts: parts, lastSrc: lastSrc, lastShot: lastShot };
  }

  // ---------- chuyển chương: tấm giấy viền mực ----------
  function buildChapterWipes(root, chapters, total) {
    var parts = [];
    (chapters || []).forEach(function (c, i) {
      if (i === 0) return; // chương đầu là cảnh hook, khung 0 phải có hình + câu hỏi
      var start = Math.max(0, c.at - WIPE_IN);
      var dur = WIPE_IN + WIPE_HOLD + WIPE_OUT;
      var layer = el("div", "clip ww-wipe-layer", null, root);
      timed(layer, start, Math.min(dur + 0.05, total - start), 13);
      var panel = el("div", "ww-wipe", null, layer);
      el("div", "ww-wipe-edge", null, panel);
      var inner = el("div", "ww-wipe-inner", null, panel);
      panel.setAttribute("data-layout-allow-overlap", ""); // tấm giấy che lên chữ của cảnh bên dưới: có chủ ý
      var num = el("div", "ww-wipe-num", "Chapter " + (i + 1), inner);
      var title = el("div", "ww-wipe-title", null, inner);
      var words = splitWords(title, c.title);
      var line = el("div", "ww-wipe-line", null, inner);
      parts.push({ animate: function (tl) {
        tl.fromTo(panel, { x: -2200 }, { x: 0, duration: WIPE_IN, ease: "power3.inOut" }, start);
        tl.fromTo(num, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" }, c.at - 0.15);
        tl.fromTo(words, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)", stagger: 0.06 }, c.at - 0.1);
        tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "expo.out" }, c.at + 0.05);
        tl.to(panel, { x: 2200, duration: WIPE_OUT, ease: "power3.inOut" }, c.at + WIPE_HOLD);
      } });
    });
    return parts;
  }

  // ---------- Wob ----------
  var WOB_STYLE = {
    "hao-hung": { sway: 5, period: 0.9, hop: 12 },
    "lanh-run": { sway: 1.5, period: 1.6, shiver: 2.6 },
    "nong-chay": { sway: 2, period: 2.2, droop: 0.965 },
    "soc": { sway: 1, period: 1.8, shock: true },
    "ngam-nghi": { sway: 3.5, period: 2.6 },
    "dong-goi": { sway: 3, period: 1.1 }
  };

  function prepWobSvg(holder, svgText, name) {
    holder.innerHTML = svgText; // SVG viết tay của kênh (tao_wob.py), id đã gắn tiền tố "<bieu_cam>-" ở prepare_render.py
    var svg = holder.querySelector("svg");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("class", "ww-wob-svg");
    var q = function (id) { return svg.querySelector("#" + name + "-" + id); };
    var tren = q("wob-tren");
    var rig = null;
    if (tren) { // bọc wob-tren (đã có transform tĩnh) trong một nhóm mới để xoay mà không mất tư thế gốc
      rig = svgEl("g", { "class": "wob-rig" });
      tren.parentNode.insertBefore(rig, tren);
      rig.appendChild(tren);
    }
    return { svg: svg, rig: rig, mat: q("mat"), tay: q("tay"), chan: q("chan"), phu: q("phu") };
  }

  function centerOf(node) {
    try { var b = node.getBBox(); return (b.x + b.width / 2) + " " + (b.y + b.height / 2); } catch (e) { return "200 200"; }
  }

  function wobIdle(tl, part, name, at, end, seed) {
    var st = WOB_STYLE[name] || { sway: 3, period: 1.4 };
    var d = end - at;
    if (d < 0.6) return;
    var r = rng(seed);
    // thở: cả thân co giãn rất nhẹ theo chiều dọc, gốc ở chân
    oscillate(tl, part.svg, { scaleY: 1 }, { scaleY: 1.025 }, 1.9, at + 0.4, end);
    // lắc thân quanh bàn chân
    if (part.rig) oscillate(tl, part.rig, { rotation: -st.sway, svgOrigin: "200 290" }, { rotation: st.sway, svgOrigin: "200 290" }, st.period, at + 0.3, end);
    // chớp mắt: 3,1–4,8 giây một lần
    if (part.mat) {
      var o = centerOf(part.mat);
      for (var t = at + 0.8 + r() * 1.2; t < end - 0.3; t += 3.1 + r() * 1.7) {
        tl.fromTo(part.mat, { scaleY: 1, svgOrigin: o }, { scaleY: 0.1, svgOrigin: o, duration: 0.07, ease: "power1.in", yoyo: true, repeat: 1 }, t);
      }
    }
    // tay đung đưa
    if (part.tay) {
      var to = centerOf(part.tay);
      oscillate(tl, part.tay, { rotation: -4, svgOrigin: to }, { rotation: 4, svgOrigin: to }, st.period * 1.3, at + 0.5, end);
    }
    if (st.hop && part.rig) { // hào hứng: nhún nhảy từng đợt
      for (var h = at + 0.9; h < end - 0.6; h += 1.6 + r() * 0.8) {
        tl.fromTo(part.svg, { y: 0 }, { y: -st.hop, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }, h);
      }
    }
    if (st.shiver && part.svg) { // lạnh run: từng đợt run cầm cập 0,8 giây
      for (var s = at + 0.3; s < end - 0.9; s += 2.4 + r() * 1.2) {
        tl.fromTo(part.svg, { x: -st.shiver }, { x: st.shiver, duration: 0.045, ease: "none", yoyo: true, repeat: 17 }, s);
        tl.set(part.svg, { x: 0 }, s + 0.83);
      }
      if (part.phu) oscillate(tl, part.phu, { opacity: 0.35 }, { opacity: 1 }, 0.5, at, end);
    }
    if (st.droop) { // nóng chảy: xệ xuống, mồ hôi nhỏ giọt
      oscillate(tl, part.svg, { scaleX: 1 }, { scaleX: 1.03 }, 2.4, at + 0.4, end);
      if (part.phu) oscillate(tl, part.phu, { y: -6 }, { y: 10 }, 1.2, at, end, "power1.in");
    }
    if (st.shock && part.phu) oscillate(tl, part.phu, { scale: 0.92, svgOrigin: "200 120" }, { scale: 1.08, svgOrigin: "200 120" }, 0.6, at, end);
  }

  function buildWob(root, scenes, data, total) {
    var svgs = data.wob_svgs || {};
    var events = [];
    scenes.forEach(function (s) { (s.wob || []).forEach(function (w) { events.push(w); }); });
    events = events.filter(function (w) { return svgs[w.bieu_cam] || w.bieu_cam === "an"; });
    if (!events.length) return [];
    var missing = [];
    scenes.forEach(function (s) { (s.wob || []).forEach(function (w) { if (!svgs[w.bieu_cam] && w.bieu_cam !== "an") missing.push(w.bieu_cam); }); });
    if (missing.length) console.warn("WW: chưa có SVG Wob cho " + missing.join(", ") + " (templates/_shared/wob/), bỏ qua");
    events.sort(function (a, b) { return a.at - b.at; });

    var walkIn = 1.5;
    var start = Math.max(0, events[0].at - walkIn);
    var layer = el("div", "clip ww-wob-layer", null, root);
    timed(layer, start, total - start, 14);
    var box = el("div", "ww-wob", null, layer);
    var parts = {};
    var order = [];
    events.forEach(function (w) {
      if (parts[w.bieu_cam] || w.bieu_cam === "an") return;
      var holder = el("div", "ww-wob-face", null, box);
      parts[w.bieu_cam] = prepWobSvg(holder, svgs[w.bieu_cam], w.bieu_cam);
      parts[w.bieu_cam].holder = holder;
      order.push(w.bieu_cam);
    });

    return [{ animate: function (tl) {
      order.forEach(function (n) { tl.set(parts[n].holder, { opacity: n === events[0].bieu_cam ? 1 : 0 }, start); });
      // đi lạch bạch vào khung từ mép trái
      var first = parts[events[0].bieu_cam];
      tl.fromTo(box, { x: -420 }, { x: 0, duration: walkIn, ease: "power1.inOut" }, start);
      oscillate(tl, box, { rotation: -7 }, { rotation: 7 }, 0.36, start, start + walkIn);
      tl.set(box, { rotation: 0 }, start + walkIn);
      if (first.chan) oscillate(tl, first.chan, { rotation: -6, svgOrigin: "200 300" }, { rotation: 6, svgOrigin: "200 300" }, 0.36, start, start + walkIn);
      if (first.chan) tl.set(first.chan, { rotation: 0, svgOrigin: "200 300" }, start + walkIn);

      var lastFace = parts[events[0].bieu_cam];
      var hidden = false;
      events.forEach(function (w, i) {
        var end = Math.min(w.end, total);
        if (w.bieu_cam === "an") { // rời khung: đi lạch bạch ra mép trái rồi biến mất (đoạn nghiêm túc, không có Wob)
          tl.to(box, { x: -420, duration: 1.1, ease: "power1.in" }, w.at);
          oscillate(tl, box, { rotation: -7 }, { rotation: 7 }, 0.36, w.at, w.at + 1.1);
          tl.set(box, { opacity: 0, rotation: 0 }, w.at + 1.1);
          hidden = true;
          return;
        }
        var p = parts[w.bieu_cam];
        var prev = lastFace;
        lastFace = p;
        if (hidden) { // quay lại sau khi rời khung: đi vào từ mép trái
          if (prev !== p) { tl.set(prev.holder, { opacity: 0 }, w.at - 0.05); tl.set(p.holder, { opacity: 1 }, w.at - 0.05); }
          tl.set(box, { opacity: 1 }, w.at);
          tl.fromTo(box, { x: -420 }, { x: 0, duration: 1.2, ease: "power1.out" }, w.at);
          oscillate(tl, box, { rotation: -7 }, { rotation: 7 }, 0.36, w.at, w.at + 1.2);
          tl.set(box, { rotation: 0 }, w.at + 1.2);
          hidden = false;
          wobIdle(tl, p, w.bieu_cam, w.at + 1.3, end, "wob-" + i + "-" + w.at);
          return;
        }
        if (w.hanh_dong === "di-ra") { // đi ra khỏi khung về bên phải rồi quay lại (vd. "Wob steps outside")
          if (prev !== p) { tl.to(prev.holder, { opacity: 0, duration: 0.12 }, w.at); tl.to(p.holder, { opacity: 1, duration: 0.12 }, w.at); }
          tl.to(box, { x: 1500, duration: 1.6, ease: "power1.in" }, w.at);
          oscillate(tl, box, { rotation: -7 }, { rotation: 7 }, 0.36, w.at, w.at + 1.6);
          tl.set(box, { x: -420, rotation: 0 }, w.at + 1.6);
          tl.to(box, { x: 0, duration: 1.1, ease: "power1.out" }, Math.max(w.at + 1.7, end - 1.2));
          return;
        }
        if (i > 0) {
          // đổi biểu cảm: nhún xuống – bật lên – rơi về, hoà chéo đúng lúc nhún sâu nhất
          tl.to(box, { scaleX: 1.12, scaleY: 0.86, duration: 0.09, ease: "power2.in" }, w.at - 0.09);
          if (prev !== p) {
            tl.to(prev.holder, { opacity: 0, duration: 0.12, ease: "none" }, w.at - 0.02);
            tl.to(p.holder, { opacity: 1, duration: 0.12, ease: "none" }, w.at - 0.02);
          }
          tl.to(box, { scaleX: 0.94, scaleY: 1.09, y: w.bieu_cam === "soc" ? -46 : -22, duration: 0.17, ease: "power2.out" }, w.at);
          tl.to(box, { scaleX: 1, scaleY: 1, y: 0, duration: 0.42, ease: "bounce.out" }, w.at + 0.17);
        }
        if (w.hanh_dong === "nhay") { // nhảy cẫng: bật cao, xoay một vòng, đáp nảy
          tl.to(box, { y: -150, rotation: 360, duration: 0.45, ease: "power2.out" }, w.at + 0.6);
          tl.to(box, { y: 0, duration: 0.5, ease: "bounce.out" }, w.at + 1.05);
          tl.set(box, { rotation: 0 }, w.at + 1.56);
        }
        wobIdle(tl, p, w.bieu_cam, w.at + (i > 0 ? 0.6 : 0), end, "wob-" + i + "-" + w.at);
      });
    } }];
  }

  // ---------- người que ----------
  /* Người que nét mực, viền giấy để nổi trên cả ảnh tối lẫn nền sáng. Khung 200×260, gốc toạ độ ở bàn chân. */
  function makeStick(parent, flip) {
    var svg = svgEl("svg", { viewBox: "0 0 200 260", "class": "ww-que-svg" }, parent);
    var root = svgEl("g", { transform: flip ? "translate(200 0) scale(-1 1)" : "" }, svg);
    var body = svgEl("g", { "class": "que-body" }, root);
    function stroke(g, d, w) {
      svgEl("path", { d: d, fill: "none", stroke: PAPER, "stroke-width": w + 9, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
      svgEl("path", { d: d, fill: "none", stroke: INK, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    }
    // dáng gốc: tay xoè chéo xuống, chân dạng chữ A (tay buông thẳng sẽ trùng lên thân và biến mất)
    function limb(x, y, dx, dy, name) {
      var g = svgEl("g", { "class": name }, body);
      stroke(g, "M " + x + " " + y + " L " + (x + dx) + " " + (y + dy), 9);
      return g;
    }
    var legB = limb(100, 150, -16, 90, "que-leg-b");
    var armB = limb(100, 90, -30, 50, "que-arm-b");
    stroke(body, "M 100 84 L 100 152", 10); // thân
    var legF = limb(100, 150, 16, 90, "que-leg-f");
    var armF = limb(100, 90, 30, 50, "que-arm-f");
    var head = svgEl("g", { "class": "que-head" }, body);
    svgEl("circle", { cx: 100, cy: 56, r: 26, fill: PAPER, stroke: PAPER, "stroke-width": 9 }, head);
    svgEl("circle", { cx: 100, cy: 56, r: 22, fill: PAPER, stroke: INK, "stroke-width": 8 }, head);
    svgEl("circle", { cx: 108, cy: 52, r: 3.2, fill: INK }, head); // mắt nhìn về hướng đi
    return { svg: svg, body: body, legF: legF, legB: legB, armF: armF, armB: armB, head: head };
  }

  var QUE_LIMB = { shoulder: "100 90", hip: "100 150" };

  function stickWalk(tl, f, at, end, period, legA, armA, lean) {
    oscillate(tl, f.legF, { rotation: -legA, svgOrigin: QUE_LIMB.hip }, { rotation: legA, svgOrigin: QUE_LIMB.hip }, period, at, end);
    oscillate(tl, f.legB, { rotation: legA, svgOrigin: QUE_LIMB.hip }, { rotation: -legA, svgOrigin: QUE_LIMB.hip }, period, at, end);
    oscillate(tl, f.armF, { rotation: armA, svgOrigin: QUE_LIMB.shoulder }, { rotation: -armA, svgOrigin: QUE_LIMB.shoulder }, period, at, end);
    oscillate(tl, f.armB, { rotation: -armA, svgOrigin: QUE_LIMB.shoulder }, { rotation: armA, svgOrigin: QUE_LIMB.shoulder }, period, at, end);
    oscillate(tl, f.body, { y: 0, rotation: lean, svgOrigin: "100 240" }, { y: -7, rotation: lean, svgOrigin: "100 240" }, period / 2, at, end);
  }

  function buildQue(root, scenes, total) {
    var parts = [];
    var n = 0;
    scenes.forEach(function (s) {
      (s.que || []).forEach(function (q) {
        var count = Math.max(1, Math.min(4, q.so_luong || 1));
        var fromRight = q.tu === "phai";
        var act = q.hanh_dong || "di-bo";
        var at = q.at, end = Math.min(q.end, total);
        var d = end - at;
        if (d < 0.6) return;
        var layer = el("div", "clip ww-que-layer", null, root);
        timed(layer, at, d, 15);
        for (var k = 0; k < count; k++) {
          (function (k) {
            var r = rng("que-" + n + "-" + k);
            var holder = el("div", "ww-que", null, layer);
            var moving = act === "di-bo" || act === "chay";
            var speed = act === "chay" ? 380 : 150;
            var x0, x1;
            if (moving) {
              x0 = fromRight ? 1520 + k * 150 : 380 - k * 150;
              x1 = fromRight ? x0 - speed * d : x0 + speed * d;
            } else {
              x0 = x1 = 640 + k * 190;
            }
            holder.style.left = "0px";
            var f = makeStick(holder, fromRight);
            var delay = k * (moving ? 0.12 : 0.18);
            parts.push({ animate: function (tl) {
              tl.fromTo(holder, { opacity: 0, x: x0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, at + delay);
              if (moving) tl.fromTo(holder, { x: x0 }, { x: x1, duration: d - delay, ease: "none" }, at + delay);
              var a0 = at + delay;
              if (act === "di-bo") stickWalk(tl, f, a0, end, 0.62 + r() * 0.08, 24, 20, 0);
              else if (act === "chay") stickWalk(tl, f, a0, end, 0.34 + r() * 0.04, 40, 38, fromRight ? -10 : 10);
              else if (act === "run") {
                // co ro: hai tay khép sát người, đầu rụt xuống, run từng đợt
                tl.set(f.armF, { rotation: 22, svgOrigin: QUE_LIMB.shoulder }, a0);
                tl.set(f.armB, { rotation: -22, svgOrigin: QUE_LIMB.shoulder }, a0);
                tl.set(f.head, { y: 6 }, a0);
                for (var s = a0 + 0.2; s < end - 0.6; s += 1.4 + r() * 0.6) {
                  tl.fromTo(f.body, { x: -3 }, { x: 3, duration: 0.05, ease: "none", yoyo: true, repeat: 13 }, s);
                }
              } else if (act === "vay-tay") {
                oscillate(tl, f.armF, { rotation: -135, svgOrigin: QUE_LIMB.shoulder }, { rotation: -95, svgOrigin: QUE_LIMB.shoulder }, 0.5, a0, end);
                oscillate(tl, f.body, { rotation: -2, svgOrigin: "100 240" }, { rotation: 2, svgOrigin: "100 240" }, 1.0, a0, end);
              } else if (act === "nhay") {
                tl.set(f.armF, { rotation: -120, svgOrigin: QUE_LIMB.shoulder }, a0); // tay giơ chữ V, không trùng đầu
                tl.set(f.armB, { rotation: 120, svgOrigin: QUE_LIMB.shoulder }, a0);
                for (var j = a0 + 0.15 + r() * 0.2; j < end - 0.7; j += 0.9) {
                  tl.fromTo(f.body, { y: 0 }, { y: -70, duration: 0.28, ease: "power2.out", yoyo: true, repeat: 1 }, j);
                }
              } else if (act === "chi-tay") {
                tl.fromTo(f.armF, { rotation: 0, svgOrigin: QUE_LIMB.shoulder }, { rotation: -90, svgOrigin: QUE_LIMB.shoulder, duration: 0.4, ease: "back.out(2)" }, a0 + 0.2);
                oscillate(tl, f.body, { rotation: -1.5, svgOrigin: "100 240" }, { rotation: 1.5, svgOrigin: "100 240" }, 1.6, a0 + 0.6, end);
              }
              tl.to(holder, { opacity: 0, duration: 0.3, ease: "power2.in" }, end - 0.3);
            } });
          })(k);
        }
        n++;
      });
    });
    return parts;
  }

  // ---------- con dấu phán quyết ----------
  function buildStamp(root, scene, total) {
    var v = scene.verdict;
    if (!v || !v.label) return null;
    var dur = 0.2;
    var start = Math.max(scene.start, v.at - 0.8);
    var layer = el("div", "clip ww-stamp-layer", null, root);
    timed(layer, start, total - start, 16);
    var wrap = el("div", "ww-stamp-wrap", null, layer);
    var q = el("div", "ww-stamp-q", "Would Wob move here?", wrap);
    var holder = el("div", "ww-stamp-holder", null, wrap);
    var ring = el("div", "ww-stamp-ring", null, holder);
    var stamp = el("div", "ww-stamp", v.label, holder);
    var color = STAMP_COLORS[v.label] || "var(--accent)";
    stamp.style.color = color;
    ring.style.borderColor = color;
    return { animate: function (tl) {
      tl.fromTo(q, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, start);
      tl.fromTo(stamp, { scale: 1.8, rotation: -14, opacity: 0 }, { scale: 1, rotation: -6, opacity: 1, duration: dur, ease: "power4.in" }, v.at - dur);
      tl.fromTo(ring, { scale: 0.9, opacity: 0.9 }, { scale: 1.45, opacity: 0, duration: 0.6, ease: "power2.out" }, v.at);
      [8, -6, 4, 0].forEach(function (x, i) {
        tl.to(stamp, { x: x, duration: 0.035, ease: "power2.inOut" }, v.at + i * 0.035);
      });
      tl.fromTo(stamp, { scale: 1 }, { scale: 1.03, duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 1 }, v.at + 0.4);
    } };
  }

  function buildCaptions(root, captions, total) {
    var layer = el("div", "clip ww-caption-layer", null, root);
    timed(layer, 0, total, 18);
    var parts = [];
    (captions || []).forEach(function (c) {
      var g = el("div", "ww-caption", null, layer);
      (c.lines || [c.text]).forEach(function (line) { el("div", "ww-caption-line", line, g); });
      parts.push({ animate: function (tl) {
        tl.fromTo(g, { opacity: 0 }, { opacity: 1, duration: 0.08, ease: "power2.out" }, c.start);
        tl.to(g, { opacity: 0, duration: 0.06, ease: "power2.in" }, Math.max(c.start + 0.1, c.end - 0.06));
      } });
    });
    return parts;
  }

  function run(opts) {
    var data = readData();
    var tlData = data.timeline;
    var root = document.querySelector('[data-composition-id="' + opts.compositionId + '"]');
    if (!root) throw new Error("WW: không thấy root " + opts.compositionId);
    var total = tlData.duration;
    root.setAttribute("data-duration", String(total));
    var bg = el("div", "clip ww-root-bg", null, root);
    timed(bg, 0, total, 0);

    var byId = {};
    (data.script.scenes || []).forEach(function (s) { byId[s.id] = s; });
    var chapterAt = {};
    (tlData.chapters || []).forEach(function (c, i) { if (i > 0) chapterAt[round(c.at)] = true; });
    var scenes = tlData.scenes || [];
    scenes.forEach(function (s) { s.chapterStart = !!chapterAt[round(s.start)]; });

    var parts = [];
    var prev = { src: null, shot: null };
    scenes.forEach(function (scene, i) {
      var next = scenes[i + 1];
      var r = buildScene(root, scene, byId[scene.id] || {}, i, prev, !!(next && next.chapterStart));
      prev = { src: r.lastSrc, shot: r.lastShot };
      parts = parts.concat(r.parts);
      var st = buildStamp(root, scene, total);
      if (st) parts.push(st);
    });
    parts = parts.concat(buildChapterWipes(root, tlData.chapters, total));
    parts = parts.concat(buildQue(root, scenes, total));
    parts = parts.concat(buildWob(root, scenes, data, total));
    if (tlData.burn_captions) parts = parts.concat(buildCaptions(root, tlData.captions, total));
    var bugLayer = el("div", "clip", null, root);
    timed(bugLayer, 0, total, 20);
    var bug = el("div", "ww-bug", null, bugLayer);
    var bugIcon = el("img", null, null, bug);
    bugIcon.src = "_shared/logo-icon.svg";
    bugIcon.alt = "";
    el("span", null, "World Wobble", bug);

    return ensureFonts()
      .then(function () { return waitImages(root); })
      .then(function () {
        var tl = gsap.timeline({ paused: true });
        parts.forEach(function (p) { if (p && p.animate) p.animate(tl); });
        tl.set({}, {}, total); // độ dài timeline GSAP khớp timeline.duration
        return { timeline: tl };
      })
      .catch(function (err) {
        console.error(err && err.message ? err.message : err);
        throw err;
      });
  }

  window.WW = { run: run };
})();
