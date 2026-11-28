#!/usr/bin/env node
/* Vẽ bản đồ SVG 1920×1080 bằng D3 + Natural Earth (public domain), ghi vào assets/ban-do/ và assets/manifest.json.
 *
 * Cách dùng (chạy ở gốc repo, cần `npm install` một lần để có d3-geo):
 *   node .claude/skills/lay-tai-nguyen/scripts/ve_ban_do.mjs <thư mục dự án> --id map-yakutia \
 *     --center 142.79,63.46 --zoom 6 [--projection orthographic|mercator|naturalEarth] \
 *     [--highlight RUS] [--mark "142.79,63.46,Oymyakon"] [--mark "129.73,62.03,Yakutsk"] [--scenes 1,2] \
 *     [--anchor 1320,560] [--fill "BGD,MMR=#f7f0e1"] [--fill "*=#f7f0e1"]
 *
 * - --fill MÃ,MÃ=#hex (lặp được, "*" = mọi nước còn lại): tô láng giềng giấy nhạt hơn, trung tính (thêm 29/11/2026).
 * - Mũi tên, nét đứt, vùng gạch: chạy tiếp lop_phu_ban_do.mjs với file mô tả lớp phủ (cùng phép chiếu, đọc từ manifest).
 * - Dữ liệu: ne_10m_admin_0_countries_vnm (Natural Earth, bản theo QUAN ĐIỂM VIỆT NAM), tải một lần vào .cache/.
 *   Không đổi sang bản mặc định khi bản đồ có vùng Biển Đông (.claude/rules/chinh-xac-va-ban-quyen.md, mục 6).
 * - --zoom 1 là cả quả địa cầu (orthographic) hoặc cả thế giới; số lớn hơn là gần hơn.
 * - --anchor x,y: điểm --center nằm ở pixel này (mặc định giữa khung 960,540). Bản đồ của cảnh hook đặt nơi đó sang
 *   nửa phải (ví dụ 1320,560) vì câu hỏi mở đầu chiếm nửa trái khung.
 * - Nhãn KHÔNG vẽ trong SVG: script ghi toạ độ pixel của từng điểm (marks) vào manifest để template dựng nhãn bằng
 *   HTML với font của kênh (SVG nạp qua <img> không dùng được font cục bộ).
 * - Khung nhìn chạm vùng Biển Đông (99–125°E, 0–26°N) thì manifest ghi vung_bien_dong: true; phải mở ảnh xem từng
 *   nét rồi đặt chu_quyen_da_kiem: true, nếu không kiem_tra_ban_quyen.py sẽ CHẶN.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { geoOrthographic, geoMercator, geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";

const NE_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_vnm.geojson";
const W = 1920, H = 1080;
const EAST_SEA = { lon: [99, 125], lat: [0, 26] };
const C = { ocean: "#3f6a70", land: "#efe3c8", border: "#8a7a5c", highlight: "#e0703a", graticule: "#ffffff22", mark: "#e85d45" }; // theo templates/_shared/frame.md (chốt 15/11/2026)

function args(argv) {
  const out = { mark: [], fill: [], projection: "orthographic", zoom: 1 };
  out.project = argv[0];
  for (let i = 1; i < argv.length; i++) {
    const k = argv[i].replace(/^--/, "");
    const v = argv[i + 1];
    if (k === "mark") out.mark.push(v);
    else if (k === "fill") out.fill.push(v);
    else out[k] = v;
    i++;
  }
  return out;
}

async function loadCountries(root) {
  const cache = path.join(root, ".cache", "ne_10m_admin_0_countries_vnm.geojson");
  if (!fs.existsSync(cache)) {
    fs.mkdirSync(path.dirname(cache), { recursive: true });
    process.stdout.write("Tải Natural Earth (bản quan điểm Việt Nam, ~13 MB)… ");
    const res = await fetch(NE_URL);
    if (!res.ok) throw new Error(`Không tải được Natural Earth: HTTP ${res.status}`);
    fs.writeFileSync(cache, Buffer.from(await res.arrayBuffer()));
    console.log("xong");
  }
  return JSON.parse(fs.readFileSync(cache, "utf8"));
}

function intersectsEastSea(projection) {
  // lấy mẫu lưới điểm trong khung hình, đổi ngược ra kinh vĩ độ
  for (let x = 0; x <= W; x += W / 24) {
    for (let y = 0; y <= H; y += H / 14) {
      const ll = projection.invert([x, y]);
      if (!ll || !isFinite(ll[0])) continue;
      const [lon, lat] = ll;
      if (lon >= EAST_SEA.lon[0] && lon <= EAST_SEA.lon[1] && lat >= EAST_SEA.lat[0] && lat <= EAST_SEA.lat[1]) {
        if (projection.clipAngle && projection.clipAngle()) {
          // orthographic: chỉ tính điểm ở mặt trước quả cầu
          const back = projection([lon, lat]);
          if (!back) continue;
        }
        return true;
      }
    }
  }
  return false;
}

async function main() {
  const a = args(process.argv.slice(2));
  if (!a.project || !a.id || !a.center) {
    console.error("Cần: <thư mục dự án> --id <id> --center lon,lat [--zoom n] [--highlight ADM0_A3] [--mark lon,lat,Nhãn]");
    process.exit(2);
  }
  if (!/^[a-z0-9][a-z0-9.-]*$/.test(a.id)) throw new Error("id chỉ được chữ thường, số, dấu chấm, gạch nối");
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../.."); // fileURLToPath: chạy được cả Windows (16/11/2026)
  const project = path.resolve(a.project);
  const [clon, clat] = a.center.split(",").map(Number);
  const zoom = Number(a.zoom) || 1;
  const [ax, ay] = (a.anchor || `${W / 2},${H / 2}`).split(",").map(Number);
  const world = await loadCountries(root);

  let projection;
  if (a.projection === "mercator") {
    projection = geoMercator().center([clon, clat]).scale((W / (2 * Math.PI)) * zoom).translate([ax, ay]);
  } else if (a.projection === "naturalEarth") {
    projection = geoNaturalEarth1().center([clon, clat]).scale((W / 6.2) * zoom).translate([ax, ay]);
  } else {
    projection = geoOrthographic().rotate([-clon, -clat]).scale((H / 2.15) * zoom).translate([ax, ay]).clipAngle(90);
  }
  // bỏ phần ngoài khung (cắt sát mép, chừa 40px cho chuyển động zoom/lia của template)
  if (!projection.clipAngle || !projection.clipAngle()) projection.clipExtent([[-40, -40], [W + 40, H + 40]]);
  // bỏ điểm cách điểm trước dưới 0,8px sau khi chiếu (dữ liệu 10m quá chi tiết cho khung 1920px); vòng còn < 3 điểm thì bỏ
  const thin = (out) => {
    let buf = null;
    return {
      point(x, y) {
        if (!buf) return out.point(x, y);
        const last = buf[buf.length - 1];
        if (!last || Math.hypot(x - last[0], y - last[1]) >= 0.8) buf.push([x, y]);
      },
      lineStart() { buf = []; },
      lineEnd() {
        if (buf.length >= 3) { out.lineStart(); for (const [x, y] of buf) out.point(x, y); out.lineEnd(); }
        buf = null;
      },
      polygonStart() { out.polygonStart(); },
      polygonEnd() { out.polygonEnd(); },
      sphere() { out.sphere && out.sphere(); },
    };
  };
  const p = geoPath({ stream: (out) => projection.stream(thin(out)) }).digits(1);
  const pRaw = geoPath(projection).digits(1); // cho đường kinh vĩ tuyến (đường hở, không lọc)
  const hl = (a.highlight || "").split(",").filter(Boolean);
  // --fill "BGD,MMR=#f7f0e1" (lặp được; mã "*" = mọi nước còn lại): tô nước láng giềng nhạt hơn mà không làm nổi nước nào
  const fills = {};
  for (const f of a.fill) {
    const [codes, color] = f.split("=");
    if (!/^#[0-9a-fA-F]{3,8}$/.test(color || "")) throw new Error(`--fill sai dạng: ${f} (cần MÃ,MÃ=#hex)`);
    for (const c of codes.split(",").filter(Boolean)) fills[c] = color;
  }
  const parts = [];
  parts.push(`<rect width="${W}" height="${H}" fill="${C.ocean}"/>`);
  if (a.projection === "orthographic" || !a.projection) {
    parts.push(`<path d="${pRaw({ type: "Sphere" })}" fill="${C.ocean}" stroke="#ffffff33" stroke-width="2"/>`);
  }
  parts.push(`<path d="${pRaw(geoGraticule10())}" fill="none" stroke="${C.graticule}" stroke-width="1"/>`);
  for (const f of world.features) {
    const d = p(f);
    if (!d) continue;
    const code = f.properties.ADM0_A3 || f.properties.ISO_A3;
    const fill = hl.includes(code) ? C.highlight : fills[code] || fills["*"] || C.land;
    parts.push(`<path d="${d}" fill="${fill}" stroke="${C.border}" stroke-width="1.2" stroke-linejoin="round"/>`);
  }
  const marks = [];
  for (const m of a.mark) {
    const [lon, lat, ...label] = m.split(",");
    const xy = projection([Number(lon), Number(lat)]);
    if (!xy || xy[0] < 0 || xy[0] > W || xy[1] < 0 || xy[1] > H) {
      console.warn(`CẢNH BÁO: điểm '${label.join(",")}' nằm ngoài khung, bỏ qua`);
      continue;
    }
    parts.push(`<circle cx="${xy[0].toFixed(1)}" cy="${xy[1].toFixed(1)}" r="12" fill="${C.mark}" stroke="#1f2326" stroke-width="5"/>`);
    marks.push({ x: Math.round(xy[0]), y: Math.round(xy[1]), label: label.join(",").trim(), lon: Number(lon), lat: Number(lat) });
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n${parts.join("\n")}\n</svg>\n`;
  const dest = path.join(project, "assets", "ban-do", `${a.id}.svg`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, svg);

  const eastSea = intersectsEastSea(projection);
  const mpath = path.join(project, "assets", "manifest.json");
  const data = fs.existsSync(mpath) ? JSON.parse(fs.readFileSync(mpath, "utf8")) : { assets: {} };
  const old = data.assets[a.id] || {};
  data.assets[a.id] = {
    ...old,
    file: path.relative(project, dest).split(path.sep).join("/"),
    kind: "ban-do",
    basis: "public-domain",
    license: "Natural Earth (public domain), bản theo quan điểm Việt Nam; vẽ bằng D3",
    author: "World Wobble (vẽ bằng code)",
    source_url: "https://www.naturalearthdata.com/",
    attribution: null,
    projection: a.projection || "orthographic",
    center: [clon, clat],
    zoom,
    anchor: [ax, ay],
    highlight: hl,
    ...(Object.keys(fills).length ? { fill: fills } : {}),
    marks,
    vung_bien_dong: eastSea,
    // vẽ lại là phải xem lại: không giữ dấu đã kiểm của bản cũ
    chu_quyen_da_kiem: eastSea ? false : null,
    scenes: a.scenes ? a.scenes.split(",").map(Number) : old.scenes || [],
    created: new Date().toISOString().slice(0, 10),
  };
  fs.mkdirSync(path.dirname(mpath), { recursive: true });
  fs.writeFileSync(mpath, JSON.stringify(data, null, 2));
  console.log(`Xong: ${dest} · ${world.features.length} quốc gia · ${marks.length} điểm`);
  if (eastSea) {
    console.log("CẢNH BÁO: khung nhìn chạm vùng Biển Đông. Mở ảnh xem từng nét (Hoàng Sa, Trường Sa, không 'đường lưỡi bò'),");
    console.log(`rồi đặt "chu_quyen_da_kiem": true cho '${a.id}' trong manifest. Chưa đặt thì kiem_tra_ban_quyen.py CHẶN.`);
  }
}

main().catch((e) => {
  console.error("LỖI:", e.message);
  process.exit(1);
});
