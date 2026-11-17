// Sinh sfx.json của một đoạn cắt giấy từ chính canh.js (một nguồn thời gian duy nhất cho hình và tiếng).
// Chạy:  node templates/hoat-hinh/cat-giay/cong-cu/tao_sfx.mjs <thư mục doan-xx> [--in]
// - Nạp lib/*.js (bản đã chép trong đoạn), du-lieu.js, canh.js trong Node (không DOM), gọi window.CANH(api, data).
// - Gom api.sfx(...) + tiếng bước do Wob.walk(..., { tieng }) sinh + whoosh của kiểu nối "chen".
// - Kiểm mỗi tên có file sfx/<ten>.wav và có dòng trong sfx/GIAY-PHEP.md với cột Thương mại = "có"; thiếu thì báo LỖI (mã 1).
// - Ghi <đoạn>/sfx.json theo HOP-DONG.md mục 6: [{ "ten", "tai", "am_luong" }]. --in: chỉ in, không ghi.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(here, "..", "..", "..", "..");
const dir = path.resolve(process.argv[2] || ".");
const dryRun = process.argv.includes("--in");

const ctx = { console, Math, JSON };
ctx.window = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
for (const f of ["lib/dao-cu.js", "lib/wob-rig.js", "lib/canh-nen.js", "lib/phim.js", "du-lieu.js", "canh.js"]) {
  if (!fs.existsSync(path.join(dir, f))) { console.error(`LỖI: thiếu ${path.join(dir, f)}`); process.exit(1); }
  load(f);
}
const data = ctx.HH_DATA;
const api = ctx.HHCatGiay.taoApi(data, { dom: false });
if (typeof ctx.CANH !== "function") { console.error("LỖI: canh.js không khai báo window.CANH"); process.exit(1); }
ctx.CANH(api, data);
if (!api._daNoi()) api.noi({});
const list = api.dsSfx();

// sổ giấy phép
const so = fs.readFileSync(path.join(REPO, "sfx", "GIAY-PHEP.md"), "utf8");
const ok = new Set();
for (const line of so.split(/\r?\n/)) {
  const m = line.match(/^\|\s*([\w.-]+)\.wav\s*\|(.*)$/);
  if (!m) continue;
  const cols = m[2].split("|").map((c) => c.trim());
  if (cols[2] === "có") ok.add(m[1]);
}
let bad = 0;
for (const s of list) {
  if (!fs.existsSync(path.join(REPO, "sfx", `${s.ten}.wav`))) { console.error(`LỖI: không có sfx/${s.ten}.wav (tai ${s.tai})`); bad++; }
  else if (!ok.has(s.ten)) { console.error(`LỖI: ${s.ten}.wav không có trong sfx/GIAY-PHEP.md với Thương mại = có`); bad++; }
}
const out = JSON.stringify(list, null, 1);
if (dryRun) console.log(out);
else fs.writeFileSync(path.join(dir, "sfx.json"), out + "\n");
const counts = {};
list.forEach((s) => { counts[s.ten] = (counts[s.ten] || 0) + 1; });
console.log(`${dryRun ? "(in)" : "sfx.json"}: ${list.length} sfx trong ${data.thoi_luong}s – ` + Object.entries(counts).map(([k, v]) => `${k}×${v}`).join(", "));
if (api.canhBao.length) api.canhBao.forEach((m) => console.log("CẢNH BÁO:", m));
process.exit(bad ? 1 : 0);
