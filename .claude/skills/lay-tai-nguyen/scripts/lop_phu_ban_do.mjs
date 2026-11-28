#!/usr/bin/env node
/* Thêm lớp phủ (mũi tên, nét đứt, vạch, vùng gạch/sóng nước) lên một bản đồ đã vẽ bằng ve_ban_do.mjs, và ghi nhãn
 * không ghim vào marks của manifest. Viết 29/11/2026 cho tập Mawsynram, Matmata.
 *
 * Cách dùng (ở gốc repo, sau ve_ban_do.mjs cho cùng id):
 *   node .claude/skills/lay-tai-nguyen/scripts/lop_phu_ban_do.mjs <thư mục dự án> <file mô tả lớp phủ .json>
 *
 * File mô tả (toạ độ kinh/vĩ độ, lon trước):
 *   { "id": "map-monsoon",
 *     "lop": [
 *       { "loai": "mui-ten", "diem": [[lon,lat],...], "mau": "#e0703a", "day": 7, "net_dut": [22,14], "ghi_chu": "…" },
 *       { "loai": "duong",   "diem": [[lon,lat],...], "mau": "#8a5a3a", "day": 5, "net_dut": null, "cong": true },
 *       { "loai": "vung",    "vong": [[lon,lat],...], "hoa_tiet": "gach-cheo" | "song-nuoc", "mau": "#8a5a3a" } ],
 *     "nhan": [ { "lon": 89.0, "lat": 21.3, "label": "Bay of Bengal", "nhan_huong": "duoi" } ],
 *     "huong_nhan": { "Mawsynram": "trai" },   // gợi ý phía đặt nhãn cho ghim (trai|phai|tren|duoi), tránh nhãn chồng
 *     "ghim_nho": ["Cherrapunji"] }             // ghim phụ, thợ dựng vẽ nhỏ hơn
 * - "vung" có thể thêm "cat_theo_nuoc": "BGD" (ADM0_A3): cắt hoạ tiết theo đường biên nước đó (clipPath, cùng dữ liệu
 *   Natural Earth bản quan điểm Việt Nam), để vùng không tràn qua biên giới.
 *
 * - Phép chiếu dựng lại từ manifest (projection, center, zoom, anchor) giống hệt ve_ban_do.mjs, nên nét khớp nền.
 * - Lớp phủ nằm trong <g id="lop-phu">; chạy lại thì thay nhóm cũ. Không dùng <circle>/<text> (chep_ban_do.py bỏ hai
 *   loại này để canh.js tự đặt chấm, nhãn); nhãn ghi vào marks với "ghim": false để thợ dựng vẽ bằng font kênh.
 * - Vẽ lại nền bằng ve_ban_do.mjs thì lớp phủ mất: chạy lại script này.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { geoOrthographic, geoMercator, geoNaturalEarth1, geoPath } from "d3-geo";

const W = 1920, H = 1080;

function projectionFrom(m) {
  const [clon, clat] = m.center;
  const [ax, ay] = m.anchor;
  const zoom = m.zoom;
  if (m.projection === "mercator") return geoMercator().center([clon, clat]).scale((W / (2 * Math.PI)) * zoom).translate([ax, ay]);
  if (m.projection === "naturalEarth") return geoNaturalEarth1().center([clon, clat]).scale((W / 6.2) * zoom).translate([ax, ay]);
  return geoOrthographic().rotate([-clon, -clat]).scale((H / 2.15) * zoom).translate([ax, ay]).clipAngle(90);
}

const f1 = (v) => Math.round(v * 10) / 10;

// đường cong Catmull-Rom qua các điểm → cubic Bézier; trả về [d, hướng cuối (vector)]
function curve(pts, smooth) {
  if (!smooth || pts.length < 3) {
    const d = "M" + pts.map((p) => `${f1(p[0])},${f1(p[1])}`).join("L");
    const a = pts[pts.length - 2], b = pts[pts.length - 1];
    return [d, [b[0] - a[0], b[1] - a[1]]];
  }
  let d = `M${f1(pts[0][0])},${f1(pts[0][1])}`;
  let dir = [0, 0];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f1(c1[0])},${f1(c1[1])} ${f1(c2[0])},${f1(c2[1])} ${f1(p2[0])},${f1(p2[1])}`;
    dir = [p2[0] - c2[0], p2[1] - c2[1]];
  }
  return [d, dir];
}

function main() {
  const [project, specPath] = process.argv.slice(2);
  if (!project || !specPath) {
    console.error("Cần: <thư mục dự án> <file mô tả lớp phủ .json>");
    process.exit(2);
  }
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
  const mpath = path.join(project, "assets", "manifest.json");
  const data = JSON.parse(fs.readFileSync(mpath, "utf8"));
  const m = data.assets[spec.id];
  if (!m || m.kind !== "ban-do") throw new Error(`${spec.id} chưa có trong manifest (chạy ve_ban_do.mjs trước)`);
  const proj = projectionFrom(m);
  const P = (ll) => {
    const xy = proj(ll);
    if (!xy) throw new Error(`điểm ${ll} không chiếu được`);
    return xy;
  };

  const defs = [];
  const body = [];
  const notes = [];
  let world = null;
  const clipFor = (code) => {
    if (!world) {
      const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
      world = JSON.parse(fs.readFileSync(path.join(root, ".cache", "ne_10m_admin_0_countries_vnm.geojson"), "utf8"));
    }
    const f = world.features.find((x) => (x.properties.ADM0_A3 || x.properties.ISO_A3) === code);
    if (!f) throw new Error(`không thấy nước ${code} trong Natural Earth`);
    const cid = `cp-${spec.id}-${code}`;
    if (!defs.some((d) => d.includes(`id="${cid}"`))) defs.push(`<clipPath id="${cid}"><path d="${geoPath(proj).digits(1)(f)}"/></clipPath>`);
    return cid;
  };
  spec.lop.forEach((l, i) => {
    const mau = l.mau || "#e0703a";
    if (l.loai === "vung") {
      const pts = l.vong.map(P);
      const pid = `lp-${spec.id}-${i}`;
      if (l.hoa_tiet === "song-nuoc") {
        defs.push(`<pattern id="${pid}" width="56" height="28" patternUnits="userSpaceOnUse"><path d="M0,14 Q14,4 28,14 T56,14" fill="none" stroke="${mau}" stroke-width="3" stroke-linecap="round" opacity="0.75"/></pattern>`);
      } else {
        defs.push(`<pattern id="${pid}" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="22" stroke="${mau}" stroke-width="4" opacity="0.6"/></pattern>`);
      }
      const d = "M" + pts.map((p) => `${f1(p[0])},${f1(p[1])}`).join("L") + "Z";
      const cp = l.cat_theo_nuoc ? ` clip-path="url(#${clipFor(l.cat_theo_nuoc)})"` : "";
      body.push(`<g${cp}><path d="${d}" fill="${mau}" fill-opacity="0.12" stroke="none"/>` +
        `<path d="${d}" fill="url(#${pid})" stroke="${mau}" stroke-width="2.5" stroke-dasharray="10 8" stroke-opacity="0.8" stroke-linejoin="round"/></g>`);
    } else {
      const pts = l.diem.map(P);
      const day = l.day || 6;
      const smooth = l.cong !== false;
      const isArrow = l.loai === "mui-ten";
      const head = isArrow ? day * 4.2 : 0;
      // rút ngắn đoạn cuối bằng chiều dài đầu mũi tên để nét không lòi qua mũi
      const linePts = pts.map((p) => p.slice());
      let [, dir0] = curve(pts, smooth);
      const len0 = Math.hypot(dir0[0], dir0[1]) || 1;
      const ux = dir0[0] / len0, uy = dir0[1] / len0;
      const tip = pts[pts.length - 1];
      if (isArrow) linePts[linePts.length - 1] = [tip[0] - ux * head * 0.8, tip[1] - uy * head * 0.8];
      const [d] = curve(linePts, smooth);
      const dash = l.net_dut ? ` stroke-dasharray="${l.net_dut.join(" ")}"` : "";
      body.push(`<path d="${d}" fill="none" stroke="#fbf6ea" stroke-width="${day + 6}" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"${dash}/>`);
      body.push(`<path d="${d}" fill="none" stroke="${mau}" stroke-width="${day}" stroke-linecap="round" stroke-linejoin="round"${dash}/>`);
      if (isArrow) {
        const bx = tip[0] - ux * head, by = tip[1] - uy * head;
        const nx = -uy * head * 0.55, ny = ux * head * 0.55;
        const hd = `M${f1(tip[0])},${f1(tip[1])}L${f1(bx + nx)},${f1(by + ny)}L${f1(bx - nx)},${f1(by - ny)}Z`;
        body.push(`<path d="${hd}" fill="${mau}" stroke="#fbf6ea" stroke-width="3" stroke-linejoin="round"/>`);
      }
    }
    notes.push({ loai: l.loai, ...(l.hoa_tiet ? { hoa_tiet: l.hoa_tiet } : {}), ...(l.cat_theo_nuoc ? { cat_theo_nuoc: l.cat_theo_nuoc } : {}), ghi_chu: l.ghi_chu || "" });
  });

  const group = `<!--lop-phu--><g id="lop-phu">${defs.length ? `<defs>${defs.join("")}</defs>` : ""}\n${body.join("\n")}\n</g><!--/lop-phu-->`;
  const file = path.join(project, m.file);
  let svg = fs.readFileSync(file, "utf8");
  svg = svg.replace(/<!--lop-phu-->[\s\S]*?<!--\/lop-phu-->\n?/, "");
  // chèn lớp phủ dưới các chấm ghim (circle) để ghim vẫn nằm trên cùng
  const firstCircle = svg.indexOf("<circle");
  svg = firstCircle >= 0 ? svg.slice(0, firstCircle) + group + "\n" + svg.slice(firstCircle) : svg.replace("</svg>", group + "\n</svg>");
  fs.writeFileSync(file, svg);

  const marks = (m.marks || []).filter((k) => k.ghim !== false);
  for (const k of marks) {
    delete k.nhan_huong; delete k.co;
    if (spec.huong_nhan && spec.huong_nhan[k.label]) k.nhan_huong = spec.huong_nhan[k.label];
    if ((spec.ghim_nho || []).includes(k.label)) k.co = "nho";
  }
  for (const n of spec.nhan || []) {
    const [x, y] = P([n.lon, n.lat]);
    if (x < 96 || x > W - 96 || y < 54 || y > H - 54) console.warn(`CẢNH BÁO: nhãn '${n.label}' ngoài vùng an toàn chữ (${Math.round(x)},${Math.round(y)})`);
    marks.push({ x: Math.round(x), y: Math.round(y), label: n.label, lon: n.lon, lat: n.lat, ghim: false, ...(n.nhan_huong ? { nhan_huong: n.nhan_huong } : {}), ...(n.ghi_chu ? { ghi_chu: n.ghi_chu } : {}) });
  }
  m.marks = marks;
  m.lop_phu = notes;
  m.lop_phu_spec = path.relative(project, path.resolve(specPath)).split(path.sep).join("/");
  fs.writeFileSync(mpath, JSON.stringify(data, null, 2));
  console.log(`Lớp phủ: ${file} · ${spec.lop.length} lớp · ${(spec.nhan || []).length} nhãn không ghim`);
}

try { main(); } catch (e) { console.error("LỖI:", e.message); process.exit(1); }
