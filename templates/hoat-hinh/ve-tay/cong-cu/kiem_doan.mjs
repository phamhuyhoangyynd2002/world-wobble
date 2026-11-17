#!/usr/bin/env node
/* Kiểm một đoạn ve-tay KHÔNG cần trình duyệt, rồi sinh sfx.json từ các VT.sfx(...) khai trong canh.js.
 *
 * Cách dùng (từ gốc repo hoặc bất kỳ đâu):
 *   node templates/hoat-hinh/ve-tay/cong-cu/kiem_doan.mjs <thư mục doan-xx> [--khong-ghi]
 *
 * Làm gì:
 *  1. Nạp lib/*.js, du-lieu.js, canh.js của đoạn trong một "window" giả (không DOM).
 *  2. Kiểm shot: phủ liền [0, thoi_luong], không hở, không chồng, mỗi shot ≥ 2 khung.
 *  3. Vẽ thử MỌI khung 30 fps: bắt lỗi JS, chuỗi "NaN"/"undefined" trong SVG, chữ không có trong chu_tren_do_vat.
 *  4. Gom VT.sfx(...) (kể cả whoosh tự thêm cho vao = "chen"), kiểm tên có trong sfx/ và sfx/GIAY-PHEP.md (Thương mại = có),
 *     mốc trong [0, thoi_luong) → ghi <đoạn>/sfx.json (trừ khi --khong-ghi).
 * Mã thoát 0 khi không có LỖI.
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const args = process.argv.slice(2);
const dir = path.resolve(args.find((a) => !a.startsWith("--")) || ".");
const noWrite = args.includes("--khong-ghi");
let repo = dir;
while (!fs.existsSync(path.join(repo, "sfx", "GIAY-PHEP.md"))) {
  const up = path.dirname(repo);
  if (up === repo) { console.error("LỖI: không tìm thấy gốc repo (sfx/GIAY-PHEP.md)"); process.exit(2); }
  repo = up;
}

const errs = [], warns = [];
const ctx = { console: { log() {}, warn: (m) => warns.push(String(m)), error: (...m) => errs.push(m.join(" ")) }, Math, JSON, Error };
ctx.window = ctx;
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(f, "utf8"), ctx, { filename: f });
const libDir = path.join(dir, "lib");
fs.readdirSync(libDir).filter((f) => f.endsWith(".js")).sort().forEach((f) => load(path.join(libDir, f)));
load(path.join(dir, "du-lieu.js"));
if (!fs.existsSync(path.join(dir, "canh.js"))) { console.error("LỖI: chưa có canh.js"); process.exit(1); }
load(path.join(dir, "canh.js"));

const VT = ctx.VT, D = ctx.HH_DATA, DUR = D.thoi_luong, FPS = D.fps || 30;
let shots;
try { shots = VT.dungShots(D); } catch (e) { console.error("LỖI dựng shot:", e.message); process.exit(1); }

// 2. shot
if (!shots.length) errs.push("không có shot nào");
else {
  if (Math.abs(shots[0].a) > 1e-6) errs.push(`shot đầu bắt đầu ở ${shots[0].a}, phải là 0`);
  if (shots[shots.length - 1].b < DUR - 1e-6) errs.push(`shot cuối kết thúc ở ${shots[shots.length - 1].b} < ${DUR}`);
  for (let i = 1; i < shots.length; i++) {
    const gap = shots[i].a - shots[i - 1].b;
    if (gap > 1e-6) errs.push(`hở giữa shot ${i - 1} và ${i}: ${shots[i - 1].b} → ${shots[i].a}`);
    if (gap < -1e-6) errs.push(`chồng giữa shot ${i - 1} và ${i}: ${shots[i - 1].b} > ${shots[i].a}`);
  }
  shots.forEach((s, i) => { if (s.b - s.a < 2 / FPS) warns.push(`shot ${i} ngắn hơn 2 khung (${(s.b - s.a).toFixed(3)} s)`); });
}

// 3. vẽ mọi khung
const nFrames = Math.round(DUR * FPS);
let bad = 0;
for (let n = 0; n < nFrames; n++) {
  const T = n / FPS;
  try {
    const k = VT.veKhung(T), r = k.r;
    const s = (r.world || "") + (r.over || "") + VT.noiLop(T, D);
    if (/NaN|undefined/.test(s) || (r.cam || []).concat(r.shake || []).some((v) => !isFinite(v))) { if (bad++ < 5) errs.push(`khung ${n} (${T.toFixed(3)} s, shot ${k.i}): SVG/camera có NaN hoặc undefined`); }
  } catch (e) { if (bad++ < 5) errs.push(`khung ${n} (${T.toFixed(3)} s): ${e.message}`); }
}
if (bad > 5) errs.push(`... tổng ${bad} khung lỗi`);
(VT._chuSai || []).forEach((c) => errs.push(`chữ không có trong chu_tren_do_vat: "${c}"`));

// 4. sfx
const lic = fs.readFileSync(path.join(repo, "sfx", "GIAY-PHEP.md"), "utf8");
const okLic = new Set();
lic.split(/\r?\n/).forEach((l) => { const m = l.match(/^\|\s*([^|]+?)\.wav\s*\|.*\|\s*có\s*\|/); if (m) okLic.add(m[1]); });
const seen = new Set();
const sfx = (VT._sfx || []).filter((x) => {
  const key = x.ten + "@" + x.tai;
  if (seen.has(key)) { warns.push(`sfx trùng: ${key}`); return false; }
  seen.add(key);
  if (!fs.existsSync(path.join(repo, "sfx", x.ten + ".wav"))) { errs.push(`sfx '${x.ten}' không có file sfx/${x.ten}.wav`); return false; }
  if (!okLic.has(x.ten)) { errs.push(`sfx '${x.ten}' không có dòng Thương mại = có trong sfx/GIAY-PHEP.md`); return false; }
  if (x.tai < 0 || x.tai >= DUR) { errs.push(`sfx '${x.ten}' ở ${x.tai} s nằm ngoài đoạn [0, ${DUR})`); return false; }
  return true;
}).sort((a, b) => a.tai - b.tai);

console.log(`doan-${D.id} [${D.phong_cach}] ${DUR} s, ${nFrames} khung, ${shots.length} shot (TB ${(DUR / Math.max(1, shots.length)).toFixed(2)} s), ${sfx.length} sfx`);
shots.forEach((s, i) => console.log(`  shot ${i}: ${s.a.toFixed(2)}–${s.b.toFixed(2)}${s.ten ? "  " + s.ten : ""}`));
if (!noWrite && !errs.length) { fs.writeFileSync(path.join(dir, "sfx.json"), JSON.stringify(sfx, null, 1) + "\n", "utf8"); console.log(`→ ghi ${path.join(dir, "sfx.json")}`); }
warns.forEach((w) => console.log("CẢNH BÁO: " + w));
errs.forEach((e) => console.log("LỖI: " + e));
process.exit(errs.length ? 1 : 0);
