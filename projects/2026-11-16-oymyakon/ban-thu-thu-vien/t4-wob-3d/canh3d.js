// T4 · Wob (SVG gốc, vẽ lại bằng Canvas2D + Path2D) là tấm phẳng có ánh sáng trong phố Oymyakon 3D (three.js).
// Học từ mromidev/claude-animated-shorts (MIT, © 2026 Mr omi): nhân vật 2D dạng billboard nhận ánh sáng cảnh + bóng tiếp đất,
// lượt viền mực theo độ sâu/pháp tuyến chỉ cho thế giới (nhân vật không bị viền hộp), mờ ống kính theo độ sâu,
// ngữ pháp camera đo từ clip mẫu (lướt smootherstep, giữ hình vẫn đẩy vào, lao ease-out). Mã ở đây viết lại gọn, không chép.
// Dựng thủ tục: mỗi khung render(t) vẽ lại toàn bộ; GSAP chỉ làm đồng hồ (modifiers chạy cả khi seek tắt callback).
import * as THREE from "./vendor/three.module.min.js";
import WOB_SVG from "./wob-svg.js";

const W = 1920, H = 1080, DUR = 8, NOINK = 1;
const rng = (seed) => { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); };
const smoother = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * x * (x * (x * 6 - 15) + 10); };
const easeOut3 = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const twos = (t) => Math.floor(t * 12 + 1e-6) / 12;
const lerp = (a, b, p) => a + (b - a) * p;
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- renderer ----------
const host = document.getElementById("stage");
const renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true });
renderer.setPixelRatio(1); renderer.setSize(W, H);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping;
host.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const HORIZON = new THREE.Color("#e6dfd3");
scene.fog = new THREE.Fog(HORIZON, 14, 95);                // sương băng: xa thì nhạt về màu chân trời
const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 400);

// ---------- texture vẽ bằng Canvas2D (có seed) ----------
function canvasTex(w, h, draw, repeat) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}
const logTex = (seed, base) => canvasTex(512, 512, (g, w, h) => {
  const r = rng(seed), n = 10, lh = h / n;
  for (let i = 0; i < n; i++) {
    const y = i * lh, tone = (r() - 0.5) * 18;
    const gr = g.createLinearGradient(0, y, 0, y + lh);
    const c0 = new THREE.Color(base).offsetHSL(0, 0, tone / 255 + 0.06), c1 = new THREE.Color(base).offsetHSL(0, 0, tone / 255 - 0.08);
    gr.addColorStop(0, "#" + c0.getHexString()); gr.addColorStop(1, "#" + c1.getHexString());
    g.fillStyle = gr; g.fillRect(0, y, w, lh);
    g.fillStyle = "rgba(25,15,8,0.55)"; g.fillRect(0, y + lh - 3, w, 3);              // khe giữa hai khúc gỗ
    for (let k = 0; k < 3; k++) { g.strokeStyle = "rgba(40,22,10,0.25)"; g.lineWidth = 1.5; g.beginPath(); const yy = y + lh * (0.3 + 0.4 * r()); g.moveTo(0, yy); g.bezierCurveTo(w * 0.3, yy + 3, w * 0.6, yy - 3, w, yy + (r() - 0.5) * 4); g.stroke(); }
    if (r() < 0.5) { g.fillStyle = "rgba(40,22,10,0.5)"; g.beginPath(); g.ellipse(r() * w, y + lh / 2, 6, 4, 0, 0, Math.PI * 2); g.fill(); }
  }
});
const snowTex = canvasTex(1024, 1024, (g, w, h) => {
  const r = rng(11); g.fillStyle = "#eef2f4"; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 260; i++) { g.fillStyle = `rgba(${170 + r() * 30},${195 + r() * 25},${215 + r() * 25},${0.06 + r() * 0.1})`; g.beginPath(); g.ellipse(r() * w, r() * h, 20 + r() * 90, 8 + r() * 30, r() * 3, 0, Math.PI * 2); g.fill(); }
  for (let i = 0; i < 1600; i++) { g.fillStyle = `rgba(255,255,255,${0.3 + r() * 0.5})`; g.fillRect(r() * w, r() * h, 2, 2); }
}, [40, 40]);
const roadTex = canvasTex(1024, 256, (g, w, h) => {
  const r = rng(5); g.fillStyle = "#dfe4e6"; g.fillRect(0, 0, w, h);
  [0.3, 0.42, 0.6, 0.72].forEach((v) => { g.fillStyle = "rgba(150,165,178,0.35)"; g.fillRect(0, v * h, w, 10 + r() * 6); });   // vệt bánh xe
  for (let i = 0; i < 900; i++) { g.fillStyle = `rgba(255,255,255,${r() * 0.6})`; g.fillRect(r() * w, r() * h, 2, 2); }
}, [12, 1]);
const roofTex = canvasTex(256, 256, (g, w, h) => {
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#ffffff"); gr.addColorStop(1, "#dbe6ee");
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
});
const softTex = (inner, outer) => canvasTex(256, 256, (g, w, h) => {
  const gr = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); gr.addColorStop(0, inner); gr.addColorStop(1, outer);
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
});
const smokeTex = canvasTex(128, 1024, (g, w, h) => {
  const r = rng(3);
  for (let i = 0; i < 70; i++) {
    const y = h - (i / 70) * h, rad = 26 + (i / 70) * 30 + r() * 10, a = 0.85 * (1 - i / 85);
    const gr = g.createRadialGradient(w / 2 + (r() - 0.5) * 10, y, 0, w / 2, y, rad);
    gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, y - rad, w, rad * 2);
  }
});

// ---------- vật liệu cel (3 bậc sáng) ----------
const ramp = (() => { const d = new Uint8Array([90, 170, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const toon = (opts) => new THREE.MeshToonMaterial({ gradientMap: ramp, ...opts });

// ---------- trời ----------
const sky = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: { top: { value: new THREE.Color("#86aac8") }, hor: { value: HORIZON } },
  vertexShader: "varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",
  fragmentShader: "uniform vec3 top; uniform vec3 hor; varying vec3 vP; void main(){ float h = clamp(normalize(vP).y * 2.2, 0., 1.); gl_FragColor = vec4(mix(hor, top, pow(h, .7)), 1.); }",
}));
sky.layers.set(NOINK); scene.add(sky);

// ---------- ánh sáng: mặt trời mùa đông rất thấp, ấm; trời lạnh ----------
scene.add(new THREE.HemisphereLight("#c4d6e8", "#f2efe8", 1.25));
const sun = new THREE.DirectionalLight("#ffcf9e", 2.6);
sun.position.set(-38, 8, 14); sun.target.position.set(0, 0, 0);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -35, right: 35, top: 20, bottom: -20, near: 1, far: 120 });
sun.shadow.bias = -0.0008; sun.shadow.normalBias = 0.03;
sun.shadow.camera.layers.enableAll();                       // tấm Wob (lớp NOINK) vẫn đổ bóng
scene.add(sun, sun.target);

// ---------- mặt đất, đường ----------
const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), toon({ map: snowTex }));
ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
const road = new THREE.Mesh(new THREE.PlaneGeometry(120, 5), toon({ map: roadTex }));
road.rotation.x = -Math.PI / 2; road.position.set(0, 0.01, 0); road.receiveShadow = true; scene.add(road);

// ---------- nhà gỗ ----------
const smokes = [];
function house(x, z, w, d, h, yaw, seed) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = yaw;
  const wall = toon({ map: logTex(seed, ["#8a5a34", "#7a4e2c", "#946640"][seed % 3]) });
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wall); body.position.y = h / 2; body.castShadow = body.receiveShadow = true; g.add(body);
  // mái hai mái phủ tuyết (lăng trụ)
  const rh = h * 0.55, shape = new THREE.Shape([new THREE.Vector2(-w / 2 - 0.5, 0), new THREE.Vector2(w / 2 + 0.5, 0), new THREE.Vector2(0, rh)]);
  const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: d + 0.8, bevelEnabled: false }), toon({ map: roofTex }));
  roof.position.set(0, h, -d / 2 - 0.4); roof.castShadow = roof.receiveShadow = true; g.add(roof);
  // cửa sổ sáng ấm, khung gỗ sơn
  [-w * 0.25, w * 0.25].forEach((wx) => {
    const fr = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.12), toon({ color: "#3F6A70" })); fr.position.set(wx, h * 0.55, d / 2 + 0.03); g.add(fr);
    const gl = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.9), new THREE.MeshBasicMaterial({ color: new THREE.Color("#ffc46b").multiplyScalar(1.6) })); gl.position.set(wx, h * 0.55, d / 2 + 0.1); g.add(gl);
  });
  const ch = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.6, 0.6), toon({ color: "#7d4a26" })); ch.position.set(w * 0.22, h + rh * 0.6, 0); ch.castShadow = true; g.add(ch);
  scene.add(g);
  const top = new THREE.Vector3(w * 0.22, h + rh * 0.6 + 0.8, 0).applyMatrix4(g.matrixWorld.compose(g.position, g.quaternion, g.scale));
  const sm = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 11), new THREE.MeshBasicMaterial({ map: smokeTex, transparent: true, depthWrite: false, fog: true }));
  sm.geometry.translate(0, 5.5, 0); sm.position.copy(top); sm.layers.set(NOINK); scene.add(sm); smokes.push({ m: sm, ph: seed });
}
[[-26, -11, 7, 6, 3.2, 0.05], [-16, -10.5, 6, 6, 2.8, -0.04], [-6.5, -11, 8, 6, 3.4, 0.02], [3.5, -10.5, 6.5, 6, 3, -0.06], [13, -11, 7, 6, 3.2, 0.03], [23, -10, 6, 6, 2.9, 0],
 [-20, -24, 7, 6, 3, 0.1], [-2, -25, 8, 6, 3.3, -0.05], [16, -24, 7, 6, 3, 0.06], [30, -22, 6, 6, 3, 0]].forEach((p, i) => house(p[0], p[1], p[2], p[3], p[4], p[5], i + 1));

// đồi xa
[[-60, -90, 40], [10, -110, 55], [70, -95, 45]].forEach((p) => { const m = new THREE.Mesh(new THREE.SphereGeometry(p[2], 24, 12), toon({ color: "#e9eef2" })); m.scale.y = 0.35; m.position.set(p[0], -3, p[1]); scene.add(m); });

// cột điện + dây võng
const poleMat = toon({ color: "#5e3a1c" });
const poles = [-28, -14, 0, 14, 28];
poles.forEach((x) => {
  const p = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 8, 8), poleMat); p.position.set(x, 4, -4); p.castShadow = true; scene.add(p);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.14, 0.14), poleMat); bar.position.set(x, 7.4, -4); scene.add(bar);
});
for (let i = 0; i < poles.length - 1; i++) [-0.8, 0.8].forEach((dx) => {
  const a = V(poles[i] + dx, 7.5, -4), b = V(poles[i + 1] + dx, 7.5, -4), mid = a.clone().lerp(b, 0.5); mid.y -= 0.9;
  const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a, mid, b), 20, 0.025, 4), toon({ color: "#222" })); scene.add(tube);
});

// hàng rào gỗ tiền cảnh
const fenceMat = toon({ color: "#8e5527" });
for (let i = 0; i < 12; i++) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.3 + (i % 3) * 0.08, 0.16), fenceMat); f.position.set(-17 + i * 0.75, 0.65, 4.2); f.castShadow = true; scene.add(f); }
[0.45, 1.0].forEach((y) => { const r = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.1, 0.1), fenceMat); r.position.set(-12.9, y, 4.25); scene.add(r); });
const bank = new THREE.Mesh(new THREE.SphereGeometry(3, 20, 10), toon({ map: snowTex })); bank.scale.set(1.3, 0.22, 0.45); bank.position.set(-14.5, 0, 5.4); bank.receiveShadow = true; // bỏ: bờ tuyết bị cắt ở mép khung trông như cục trắng

// ---------- Wob: SVG gốc vẽ bằng Canvas2D (Path2D), dán lên tấm phẳng nhận ánh sáng ----------
function drawSvg(g, svgText, k) {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const transform = (el) => {
    const tr = el.getAttribute("transform"); if (!tr) return;
    for (const m of tr.matchAll(/(rotate|translate|scale)\(([^)]*)\)/g)) {
      const a = m[2].split(/[\s,]+/).map(Number);
      if (m[1] === "translate") g.translate(a[0], a[1] || 0);
      else if (m[1] === "scale") g.scale(a[0], a.length > 1 ? a[1] : a[0]);
      else { g.translate(a[1] || 0, a[2] || 0); g.rotate((a[0] * Math.PI) / 180); g.translate(-(a[1] || 0), -(a[2] || 0)); }
    }
  };
  const shape = (el) => {
    const p = new Path2D(), n = (a) => +el.getAttribute(a);
    switch (el.tagName) {
      case "path": p.addPath(new Path2D(el.getAttribute("d"))); break;
      case "ellipse": p.ellipse(n("cx"), n("cy"), n("rx"), n("ry"), 0, 0, Math.PI * 2); break;
      case "circle": p.arc(n("cx"), n("cy"), n("r"), 0, Math.PI * 2); break;
      case "rect": p.roundRect(n("x"), n("y"), n("width"), n("height"), n("rx") || 0); break;
      default: return null;
    }
    return p;
  };
  const walk = (el) => {
    for (const c of el.children) {
      if (c.tagName === "clipPath" || c.tagName === "title" || c.tagName === "defs") continue;
      g.save(); transform(c);
      const op = c.getAttribute("opacity"); if (op) g.globalAlpha *= +op;
      if (c.tagName === "g") {
        const cp = c.getAttribute("clip-path");
        if (cp) { const clip = doc.getElementById(cp.slice(5, -1)); const cs = clip && shape(clip.firstElementChild); if (cs) g.clip(cs); }
        walk(c);
      } else {
        const p = shape(c);
        if (p) {
          const fill = c.getAttribute("fill"), stroke = c.getAttribute("stroke");
          if (fill !== "none") { g.fillStyle = fill || "#000"; g.fill(p); }
          if (stroke && stroke !== "none") { g.strokeStyle = stroke; g.lineWidth = +(c.getAttribute("stroke-width") || 1); g.lineCap = c.getAttribute("stroke-linecap") || "butt"; g.lineJoin = c.getAttribute("stroke-linejoin") || "miter"; g.stroke(p); }
        }
      }
      g.restore();
    }
  };
  g.save(); g.scale(k, k); walk(doc.documentElement); g.restore();
}
const wobCanvas = document.createElement("canvas"); wobCanvas.width = wobCanvas.height = 2048;
drawSvg(wobCanvas.getContext("2d"), WOB_SVG, 2048 / 400);
const wobTex = new THREE.CanvasTexture(wobCanvas); wobTex.colorSpace = THREE.SRGBColorSpace; wobTex.anisotropy = 8;
const WOB_H = 1.05;                                          // Wob cao ~1 m: bé hơn cửa sổ, cho thấy nơi này to thế nào
const wobGeo = new THREE.PlaneGeometry(WOB_H, WOB_H); wobGeo.translate(0, WOB_H * (0.5 - 8 / 400), 0);   // gót giày (y=392/400) chạm đất
const wob = new THREE.Mesh(wobGeo, new THREE.MeshLambertMaterial({ map: wobTex, alphaTest: 0.5, side: THREE.DoubleSide }));
wob.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: wobTex, alphaTest: 0.5, side: THREE.DoubleSide });
wob.castShadow = true; wob.layers.set(NOINK); scene.add(wob);
const blob = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.35), new THREE.MeshBasicMaterial({ map: softTex("rgba(40,50,70,0.55)", "rgba(40,50,70,0)"), transparent: true, depthWrite: false }));
blob.rotation.x = -Math.PI / 2; blob.layers.set(NOINK); scene.add(blob);
const puffs = [5.9, 7.0].map(() => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: softTex("rgba(255,255,255,0.9)", "rgba(255,255,255,0)"), transparent: true, depthWrite: false })); m.layers.set(NOINK); scene.add(m); return m; });

// ---------- hậu kỳ: viền mực (chỉ thế giới) → mờ ống kính → tone map ----------
const mkRT = (type, samples) => { const rt = new THREE.WebGLRenderTarget(W, H, { type, samples: samples || 0 }); rt.depthTexture = new THREE.DepthTexture(W, H); return rt; };
const rtMain = mkRT(THREE.HalfFloatType, 4), rtNorm = mkRT(THREE.UnsignedByteType, 0);
const rtInk = new THREE.WebGLRenderTarget(W, H, { type: THREE.HalfFloatType });
const normalMat = new THREE.MeshNormalMaterial();
const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), quadScene = new THREE.Scene();
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2)); quadScene.add(quad);
const VS = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }";
const inkMat = new THREE.ShaderMaterial({
  uniforms: { tColor: { value: rtMain.texture }, tDM: { value: rtMain.depthTexture }, tN: { value: rtNorm.texture }, tDW: { value: rtNorm.depthTexture },
    res: { value: new THREE.Vector2(W, H) }, cNear: { value: 0.1 }, cFar: { value: 400 }, inkW: { value: 4.6 }, ink: { value: new THREE.Color("#0b0a0c").convertSRGBToLinear() } },
  vertexShader: VS,
  fragmentShader: `#include <packing>
  uniform sampler2D tColor, tDM, tN, tDW; uniform vec2 res; uniform float cNear, cFar, inkW; uniform vec3 ink; varying vec2 vUv;
  float lin(sampler2D t, vec2 uv){ return -perspectiveDepthToViewZ(texture2D(t, uv).x, cNear, cFar); }
  void main(){
    vec3 col = texture2D(tColor, vUv).rgb;
    float zw = lin(tDW, vUv), zm = lin(tDM, vUv);
    vec3 n0 = texture2D(tN, vUv).xyz * 2. - 1.;
    float e = 0., s = res.y / 1080.;
    for (int ri = 0; ri < 3; ri++) {
      float r = (ri == 0 ? 1. : ri == 1 ? inkW * .55 : inkW) * s;
      for (int k = 0; k < 8; k++) {
        float a = float(k) * .785398;
        vec2 uq = vUv + vec2(cos(a), sin(a)) * r / res;
        float zq = lin(tDW, uq);
        e = max(e, smoothstep(.015, .05, (zq - zw) / zw));                 // mép gần của chỗ nhảy độ sâu = viền ngoài
        vec3 nq = texture2D(tN, uq).xyz * 2. - 1.;
        if (abs(zq - zw) < zw * .015) e = max(e, smoothstep(.85, .6, dot(n0, nq)) * .95);   // nếp gấp
      }
    }
    if (zm < zw - .06) e = 0.;                                              // nhân vật đứng trước: không vẽ mực đè lên
    e *= 1. - smoothstep(45., 120., zw);                                    // xa thì mực tan vào sương
    gl_FragColor = vec4(mix(col, ink, e), 1.);
  }`,
});
const postMat = new THREE.ShaderMaterial({
  uniforms: { tIn: { value: rtInk.texture }, tDM: { value: rtMain.depthTexture }, res: { value: new THREE.Vector2(W, H) }, cNear: { value: 0.1 }, cFar: { value: 400 }, focus: { value: 10 }, cInf: { value: 0 } },
  vertexShader: VS,
  fragmentShader: `#include <packing>
  uniform sampler2D tIn, tDM; uniform vec2 res; uniform float cNear, cFar, focus, cInf; varying vec2 vUv;
  float lin(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDM, uv).x, cNear, cFar); }
  float coc(float z, float s){ return clamp(cInf * s * abs(1. - focus / max(z, .001)), 0., 22. * s); }
  void main(){
    float s = res.y / 1080.;
    vec3 col = texture2D(tIn, vUv).rgb; float z0 = lin(vUv), r0 = coc(z0, s);
    if (r0 > .6) {
      vec3 acc = col; float ws = 1.;
      for (int i = 0; i < 48; i++) {
        float rr = sqrt((float(i) + .5) / 48.) * r0, a = float(i) * 2.39996;
        vec2 uq = vUv + vec2(cos(a), sin(a)) * rr / res;
        float zq = lin(uq), rq = coc(zq, s); if (zq > z0) rq = min(rq, r0);   // nền không loang đè lên chủ thể nét
        float w = clamp(rq - rr + .5, 0., 1.); acc += texture2D(tIn, uq).rgb * w; ws += w;
      }
      col = acc / ws;
    }
    vec2 q = vUv - .5; col *= 1. - dot(q, q) * .35;                         // viền tối nhẹ
    gl_FragColor = vec4(col, 1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`,
});

// ---------- diễn ----------
// camera: glide smootherstep, giữ hình vẫn đẩy vào 0,25 %/khung, lao ease-out vào cận cảnh (ngữ pháp đo từ clip mẫu)
const P0 = { pos: V(-13.5, 1.6, 9.5), look: V(-6.0, 1.0, -1) };
const P1 = { pos: V(-3.2, 1.05, 6.6), look: V(-0.6, 0.85, 0) };
const P2 = { pos: V(0.55, 0.78, 2.35), look: V(-0.2, 0.62, 0) };
function camAt(t) {
  const creep = (P, look, frames, k) => look.clone().add(P.clone().sub(look).multiplyScalar(Math.pow(1 - k, frames)));
  let pos, look, roll = 0;
  if (t < 0.3) { look = P0.look; pos = creep(P0.pos, P0.look, t * 30, 0.0015); }
  else if (t < 3.3) { const p = smoother((t - 0.3) / 3); look = P0.look.clone().lerp(P1.look, p); pos = creep(P0.pos, P0.look, 9, 0.0015).lerp(P1.pos, p); }
  else if (t < 5.4) { look = P1.look; pos = creep(P1.pos, P1.look, (t - 3.3) * 30, 0.0025); }
  else if (t < 5.75) { const a = creep(P1.pos, P1.look, 63, 0.0025), p = easeOut3((t - 5.4) / 0.35); look = P1.look.clone().lerp(P2.look, p); pos = a.lerp(P2.pos, p); roll = 3.5 * p; }
  else { look = P2.look; pos = creep(P2.pos, P2.look, (t - 5.75) * 30, 0.002); roll = 3.5; }
  return { pos, look, roll };
}
function wobAt(tq) {
  const walk = smoother((tq - 0.4) / 4.0);
  let x = lerp(-7.5, -0.2, walk), y = 0, sy = 1, roll = 0;
  if (tq > 0.4 && tq < 4.4) { const ph = (tq - 0.4) / 0.25; y = 0.05 * Math.abs(Math.sin(Math.PI * ph)) * Math.min(1, walk * 8, (1 - walk) * 8); sy = 1 - 0.045 * Math.cos(2 * Math.PI * ph); roll = 5 * Math.sin(Math.PI * ph); }
  if (tq >= 4.4 && tq < 4.85) { const p = (tq - 4.4) / 0.45; sy = 1 - 0.12 * Math.exp(-p * 5) * Math.cos(p * 14); }
  if (tq >= 4.85) { const n = Math.floor(tq * 12); x += (Math.sin(n * 91.7) * 0.5) * 0.024; sy = 0.97; }   // run cầm cập
  return { x, y, sy, roll };
}

function render(t) {
  const tq = twos(t);
  // nhân vật on twos, camera mượt
  const c = camAt(t);
  camera.position.copy(c.pos); camera.up.set(0, 1, 0); camera.lookAt(c.look); camera.rotateZ((c.roll * Math.PI) / 180);
  const w = wobAt(tq);
  wob.position.set(w.x, w.y, 0); wob.scale.set(1 / Math.sqrt(w.sy), w.sy, 1);
  wob.rotation.set(0, Math.atan2(camera.position.x - w.x, camera.position.z), (w.roll * Math.PI) / 180);
  blob.position.set(w.x, 0.02, 0.02); blob.scale.setScalar(1 - w.y * 3);
  smokes.forEach((s) => { s.m.rotation.y = Math.atan2(camera.position.x - s.m.position.x, camera.position.z - s.m.position.z); s.m.scale.set(1 + 0.06 * Math.sin(tq * 1.3 + s.ph), 1 + 0.03 * Math.sin(tq * 0.9 + s.ph), 1); });
  [5.9, 7.0].forEach((t0, i) => {                           // hơi thở đông thành mây trắng
    const p = (tq - t0) / 1.1, m = puffs[i];
    m.visible = p > 0 && p < 1;
    if (m.visible) { m.position.set(w.x - 0.12 - p * 0.35, 0.62 + p * 0.3, 0.05); m.scale.setScalar(0.08 + p * 0.5); m.material.opacity = (1 - p) * 0.9; m.lookAt(camera.position); }
  });
  // DOF bật khi lao vào cận cảnh, nét ở Wob
  postMat.uniforms.cInf.value = 12 * smoother((t - 5.45) / 0.3);
  postMat.uniforms.focus.value = camera.position.distanceTo(wob.position) * 0.98;

  scene.background = null;
  camera.layers.enableAll(); renderer.setRenderTarget(rtMain); renderer.render(scene, camera);
  camera.layers.set(0); scene.overrideMaterial = normalMat; renderer.setRenderTarget(rtNorm); renderer.setClearColor(0x000000, 1); renderer.render(scene, camera);
  scene.overrideMaterial = null; camera.layers.enableAll();
  quad.material = inkMat; renderer.setRenderTarget(rtInk); renderer.render(quadScene, quadCam);
  quad.material = postMat; renderer.setRenderTarget(null); renderer.render(quadScene, quadCam);
}

const clock = { v: 0 };
const tl = window.gsap.timeline({ paused: true });
tl.to(clock, { v: DUR, duration: DUR, ease: "none", modifiers: { v: (v) => { render(Math.max(0, Math.min(DUR, +v))); return v; } } }, 0);
render(0);
window.__t4Resolve({ tl });
