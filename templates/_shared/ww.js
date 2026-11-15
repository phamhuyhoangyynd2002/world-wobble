/* World Wobble – runtime dùng chung cho template HyperFrames khung ngang.
 *
 * Viết theo cách của gamereel.js (GameReel), gọn lại cho video dài:
 * - prepare_render.py điền <script id="ww-data" type="application/json"> bằng { script, timeline, wob_files }.
 * - Mọi mốc thời gian lấy từ timeline: scenes[].start/duration, scenes[].shots[].at/end, scenes[].wob[], scenes[].verdict,
 *   chapters[], captions[]. Không tự tính lại thời gian từ chữ.
 * - Một timeline GSAP (paused) đăng ký sau khi font và ảnh tải xong. Không Math.random, Date.now, gọi mạng.
 */
(function () {
  "use strict";

  var FONT = "Be Vietnam Pro";
  var FADE = 0.6; // hoà tan giữa hai nhịp hình
  var STAMP_COLORS = { "WOULD MOVE": "var(--move)", "SUMMER ONLY": "var(--accent)", NOPE: "var(--accent-2)" };

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

  function round(x) {
    return Math.round(x * 1000) / 1000;
  }

  function timed(node, start, duration, track) {
    node.setAttribute("data-start", String(round(start)));
    node.setAttribute("data-duration", String(round(Math.max(0.04, duration))));
    if (track !== undefined) node.setAttribute("data-track-index", String(track));
    return node;
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
    if (move === "still") { from = { scale: 1, x: 0 }; to = { scale: 1, x: 0 }; }
    tl.fromTo(media, from, Object.assign({ duration: Math.max(0.1, end - start), ease: "sine.inOut" }, to), start);
  }

  function buildScene(root, scene, sc, index, prevSrc) {
    var node = el("div", "clip ww-scene", null, root);
    node.id = "sc-" + scene.id;
    timed(node, scene.start, scene.duration, 1 + (index % 2));
    var parts = [];
    var facts = {};
    (sc.facts || []).forEach(function (f) { facts[f.label] = f; });
    var lastSrc = prevSrc;

    (scene.shots || []).forEach(function (shot, i) {
      var show = String(shot.show || "");
      if (show.indexOf("fact:") === 0) {
        var f = facts[show.slice(5)];
        if (!f) return;
        var card = el("div", "ww-fact", null, node);
        el("div", "ww-fact-label", f.label, card);
        el("div", "ww-fact-value", f.value, card);
        var endF = Math.min(scene.end, shot.end + 0.5);
        parts.push({ animate: function (tl) {
          tl.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, Math.max(scene.start, shot.at - 0.5));
          tl.to(card, { opacity: 0, duration: 0.4, ease: "sine.inOut" }, Math.max(shot.at + 2.5, endF - 0.4));
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
      (shot.marks || []).forEach(function (m) {
        var mk = el("div", "ww-mark", null, media);
        mk.style.left = m.x + "px";
        mk.style.top = m.y + "px";
        // nhãn bản đồ có thể bị câu hỏi mở đầu hay thẻ đè lên trong chốc lát: có chủ ý
        el("div", "ww-mark-label", m.label, mk).setAttribute("data-layout-allow-occlusion", "");
      });
      if (show === "text") el("div", "ww-big-text", sc.on_screen_text || "", layer);
      if (shot.src) lastSrc = shot.src;
      var first = i === 0;
      var inAt = first ? scene.start : Math.max(scene.start, shot.at - FADE);
      parts.push({ animate: function (tl) {
        if (first && index === 0) tl.set(layer, { opacity: 1 }, 0);
        else tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: first ? 0.01 : FADE, ease: "sine.inOut" }, inAt);
        drift(tl, media, shot, inAt, Math.min(scene.end, shot.end + FADE));
      } });
    });

    // câu hỏi mở đầu (cảnh hook) hoặc tiêu đề cảnh
    if (sc.on_screen_text && scene.type === "hook") {
      var wrap = el("div", "ww-question-wrap", null, node);
      el("div", "ww-question", sc.on_screen_text, wrap);
      parts.push({ animate: function (tl) {
        tl.set(wrap, { opacity: 1 }, scene.start);
        tl.to(wrap, { opacity: 0, duration: 0.6, ease: "sine.inOut" }, Math.min(scene.end - 0.6, scene.start + 7));
      } });
    } else if (sc.on_screen_text && !(scene.shots || []).some(function (s) { return s.show === "text"; })) {
      var t = el("div", "ww-title", sc.on_screen_text, node);
      parts.push({ animate: function (tl) {
        tl.fromTo(t, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, scene.start + 0.2);
        tl.to(t, { opacity: 0, duration: 0.5, ease: "sine.inOut" }, Math.min(scene.end - 0.5, scene.start + 4.5));
      } });
    }
    return { parts: parts, lastSrc: lastSrc };
  }

  function buildChapters(root, chapters, total) {
    var parts = [];
    (chapters || []).forEach(function (c, i) {
      if (i === 0) return; // chương đầu là cảnh hook, không phủ thẻ lên câu hỏi
      var layer = el("div", "clip", null, root);
      timed(layer, c.at, Math.min(3.4, total - c.at), 12);
      var card = el("div", "ww-chapter", null, layer);
      el("div", "ww-chapter-dot", null, card);
      el("div", null, c.title, card);
      parts.push({ animate: function (tl) {
        tl.fromTo(card, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" }, c.at + 0.1);
        tl.to(card, { opacity: 0, duration: 0.4, ease: "sine.inOut" }, c.at + 2.9);
      } });
    });
    return parts;
  }

  function buildWob(root, scenes, available, total) {
    var have = {};
    (available || []).forEach(function (n) { have[n] = true; });
    var events = [];
    scenes.forEach(function (s) { (s.wob || []).forEach(function (w) { events.push(w); }); });
    if (!events.length) return [];
    var missing = events.filter(function (w) { return !have[w.bieu_cam]; });
    if (missing.length) console.warn("WW: chưa có SVG Wob cho " + missing.map(function (w) { return w.bieu_cam; }).join(", ") + " (templates/_shared/wob/), bỏ qua");
    var parts = [];
    events.filter(function (w) { return have[w.bieu_cam]; }).forEach(function (w) {
      var layer = el("div", "clip ww-wob-layer", null, root);
      timed(layer, w.at, Math.min(w.end, total) - w.at, 14);
      var img = el("img", "ww-wob", null, layer);
      img.src = "_shared/wob/" + w.bieu_cam + ".svg";
      img.alt = "";
      parts.push({ animate: function (tl) {
        tl.fromTo(img, { y: 30, rotation: -4 }, { y: 0, rotation: 0, duration: 0.45, ease: "back.out(2)" }, w.at);
        tl.to(img, { rotation: 3, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: Math.max(0, Math.floor((w.end - w.at - 0.5) / 0.6) - 1) }, w.at + 0.45);
      } });
    });
    return parts;
  }

  function buildStamp(root, scene, total) {
    var v = scene.verdict;
    if (!v || !v.label) return null;
    var dur = 0.2;
    var start = Math.max(scene.start, v.at - 0.8);
    var layer = el("div", "clip ww-stamp-layer", null, root);
    timed(layer, start, total - start, 16);
    var wrap = el("div", "ww-stamp-wrap", null, layer);
    var q = el("div", "ww-stamp-q", "Would Wob move here?", wrap);
    var stamp = el("div", "ww-stamp", v.label, wrap);
    stamp.style.color = STAMP_COLORS[v.label] || "var(--accent)";
    return { animate: function (tl) {
      tl.fromTo(q, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, start);
      tl.fromTo(stamp, { scale: 1.7, rotation: -6, opacity: 0 }, { scale: 1, rotation: -6, opacity: 1, duration: dur, ease: "power4.in" }, v.at - dur);
      [8, -6, 4, 0].forEach(function (x, i) {
        tl.to(stamp, { x: x, duration: 0.035, ease: "power2.inOut" }, v.at + i * 0.035);
      });
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
    var parts = [];
    var lastSrc = null;
    (tlData.scenes || []).forEach(function (scene, i) {
      var r = buildScene(root, scene, byId[scene.id] || {}, i, lastSrc);
      lastSrc = r.lastSrc;
      parts = parts.concat(r.parts);
      var st = buildStamp(root, scene, total);
      if (st) parts.push(st);
    });
    parts = parts.concat(buildChapters(root, tlData.chapters, total));
    parts = parts.concat(buildWob(root, tlData.scenes || [], data.wob_files, total));
    if (tlData.burn_captions) parts = parts.concat(buildCaptions(root, tlData.captions, total));
    var bugLayer = el("div", "clip", null, root);
    timed(bugLayer, 0, total, 20);
    el("div", "ww-bug", "World Wobble", bugLayer);

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
