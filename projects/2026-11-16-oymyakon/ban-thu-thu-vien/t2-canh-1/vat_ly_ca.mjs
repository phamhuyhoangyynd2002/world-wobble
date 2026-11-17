// Mô phỏng con cá đông cứng (khối cứng 300x64) bị Wob đập xuống bàn. Chạy 1 lần, ghi vat-ly-ca.json.
// Matter.js (MIT) chạy cố định 60 bước/giây, không ngẫu nhiên -> ra y hệt mỗi lần.
import Matter from 'matter-js';
import fs from 'node:fs';
const { Engine, Bodies, Body, Composite, Events } = Matter;
const engine = Engine.create({ gravity: { x: 0, y: 1, scale: 0.0026 } });
const desk = Bodies.rectangle(960, 800 + 50, 4000, 100, { isStatic: true, friction: 0.7, restitution: 0.25 });
const box = Bodies.rectangle(240, 690 + 55, 240, 110, { isStatic: true, friction: 0.5, restitution: 0.2 });
const fish = Bodies.rectangle(500, 600, 300, 64, { friction: 0.55, frictionAir: 0.004, restitution: 0.22, density: 0.004, chamfer: { radius: 24 } });
Body.setAngle(fish, 0.18);
Body.setVelocity(fish, { x: -2.5, y: 16 });
Body.setAngularVelocity(fish, 0.02);
Composite.add(engine.world, [desk, box, fish]);
const hits = [];
Events.on(engine, 'collisionStart', e => { for (const p of e.pairs) if (p.bodyA === fish || p.bodyB === fish) hits.push({ step, speed: +fish.speed.toFixed(2) }); });
let step = 0; const frames = [];
const STEPS = 60 * 1.6;
for (step = 0; step <= STEPS; step++) {
  if (step % 2 === 0) frames.push([+fish.position.x.toFixed(2), +fish.position.y.toFixed(2), +(fish.angle * 180 / Math.PI).toFixed(2)]);
  Engine.update(engine, 1000 / 60);
}
const impacts = hits.filter(h => h.speed > 3).map(h => ({ t: +(h.step / 60).toFixed(3), speed: h.speed }));
fs.writeFileSync('vat-ly-ca.json', JSON.stringify({ fps: 30, frames, impacts }));
console.log('frames', frames.length, 'impacts', JSON.stringify(impacts), 'last', frames.at(-1));
