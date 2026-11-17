// Sinh timeline.json (sfx + nhạc + mốc cảnh) cho mix_audio.py từ js/canh.js – một nguồn thời gian duy nhất.
// Chạy: node tao_timeline.mjs   (trong thư mục a-cat-giay)
import fs from "node:fs";
import vm from "node:vm";

const ctx = { globalThis: {} };
ctx.window = ctx.globalThis;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync("js/canh.js", "utf8"), ctx);
const CANH = ctx.globalThis.CANH;

const sfx = CANH.sfx.map((s) => ({ src: `sfx/${s.src}.wav`, at: s.at, volume: s.volume }));
// tiếng bước tuyết: cùng công thức chia bước với Wob.walk() trong js/wob-rig.js
for (const w of CANH.walks) {
  if (!w.steps) continue;
  const n = Math.max(2, Math.round((w.t1 - w.t0) / (w.step || 0.3)));
  const dt = (w.t1 - w.t0) / n;
  for (let k = 1; k <= n; k++) sfx.push({ src: "sfx/buoc-tuyet.wav", at: +(w.t0 + k * dt).toFixed(3), volume: 0.42 });
}
sfx.sort((a, b) => a.at - b.at);
const m = CANH.music;
const timeline = {
  duration: CANH.duration,
  scenes: CANH.scenes.map((s) => ({ id: s.id, start: s.start, duration: s.dur })),
  sfx,
  music: { src: m.src, volume: m.volume, crossfade: 0.5, segments: [{ src: m.src, mood: "khac-nghiet", start: m.start, end: m.end }] },
};
fs.writeFileSync("timeline.json", JSON.stringify(timeline, null, 2));
console.log(`timeline.json: ${sfx.length} sfx, nhạc ${m.start}–${m.end}s, dài ${CANH.duration}s`);
