"""timeline.json đầy đủ cho video hoạt hình, theo mốc giọng thật trong hoat-hinh/phan-canh.json.

Vì sao: build_timeline.py (long-tieng) đặt giọng nối liền (audio + 0,35 s); video hoạt hình đặt giọng theo
`phan-canh.json → loi[]` (khoảng lặng 0,8–2 s cho gag). Các bước sau (kiem_ky_thuat, kiem_tra_ban_quyen,
bao_cao, phan-bien, seo) đọc `timeline.json` ở gốc dự án: mốc từ, chương, khẳng định, phụ đề, con dấu.

Cách làm: chạy build_timeline.py (--music none) để có cấu trúc chuẩn, rồi dời từng cảnh tới mốc
`loi[].bat_dau`; độ dài, sfx, nhạc lấy từ hoat-hinh/timeline.json (ghep_doan.py); mốc con dấu = sfx
`dau-wob`. Ghi đè timeline.json, out/captions.srt, out/chapters.txt.

Cách dùng (sau ghep_doan.py):
  python .claude/skills/dung-hoat-hinh/scripts/xuat_timeline.py <dự án>
"""
import json, re, subprocess, sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
BT = REPO / ".claude/skills/long-tieng/scripts/build_timeline.py"
sys.path.insert(0, str(BT.parent))
from build_timeline import mmss, srt_time  # noqa: E402


def dời(x, d):
    return round(x + d, 3)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    pj = Path(sys.argv[1]).resolve()
    pc = json.loads((pj / "hoat-hinh/phan-canh.json").read_text(encoding="utf-8"))
    hh_tl_p = pj / "hoat-hinh/timeline.json"
    if not hh_tl_p.exists():
        sys.exit("LỖI: chưa có hoat-hinh/timeline.json, chạy ghep_doan.py trước")
    hh = json.loads(hh_tl_p.read_text(encoding="utf-8"))

    r = subprocess.run([sys.executable, str(BT), str(pj), "--music", "none"], capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout[-2000:], r.stderr[-2000:])
        sys.exit("LỖI build_timeline.py")
    tl = json.loads((pj / "timeline.json").read_text(encoding="utf-8"))

    loi = {v["scene"]: float(v["bat_dau"]) for v in pc["loi"]}
    total = float(pc["thoi_luong"])
    order = sorted(tl["scenes"], key=lambda s: loi[s["id"]])
    delta = {}
    for i, sc in enumerate(order):
        voice_abs = sc["voice"]["start"]  # build_timeline ghi mốc tuyệt đối (từ đầu video)
        d = loi[sc["id"]] - voice_abs
        delta[sc["id"]] = d
        new_start = 0.0 if i == 0 else loi[sc["id"]]
        new_end = loi[order[i + 1]["id"]] if i + 1 < len(order) else total
        for w in sc.get("words") or []:
            w["start"], w["end"] = dời(w["start"], d), dời(w["end"], d)
        for key in ("wob", "que", "shots"):
            for x in sc.get(key) or []:
                for k in ("at", "start", "end"):
                    if isinstance(x.get(k), (int, float)):
                        x[k] = dời(x[k], d)
        sc["voice"]["start"] = round(loi[sc["id"]], 3)
        sc["start"], sc["end"], sc["duration"] = round(new_start, 3), round(new_end, 3), round(new_end - new_start, 3)

    dau = [f for f in hh.get("sfx", []) if Path(f["src"]).stem == "dau-wob"]
    for sc in order:
        if sc.get("verdict"):
            sc["verdict"]["at"] = dau[0]["at"] if dau else dời(sc["verdict"]["at"], delta[sc["id"]])
            sc["verdict"]["nguon"] = "sfx dau-wob trong đoạn hoạt hình" if dau else "dời theo mốc giọng"

    for c in tl.get("captions") or []:
        d = delta[c["scene"]]
        c["start"], c["end"] = dời(c["start"], d), dời(c["end"], d)
        for w in c.get("words") or []:
            w["start"], w["end"] = dời(w["start"], d), dời(w["end"], d)
    for c in tl.get("claims") or []:
        c["at"] = dời(c["at"], delta[c["scene"]])
        c["time"] = mmss(c["at"])

    # chương: mốc = đầu cảnh mở chương (cảnh đầu = 0:00)
    first = {}
    for sc in order:
        if sc.get("chapter") and sc["chapter"] not in first:
            first[sc["chapter"]] = sc["start"]
    for c in tl.get("chapters") or []:
        c["at"] = first.get(c["title"], c["at"])
    ch = sorted(tl.get("chapters") or [], key=lambda c: c["at"])
    for i, c in enumerate(ch):
        c["end"] = ch[i + 1]["at"] if i + 1 < len(ch) else total
    tl["chapters"] = ch

    # shots: KHÔNG giữ nhịp hình kiểu trình chiếu của build_timeline (ảnh Commons/AI không có trong video
    # hoạt hình, làm kiem_tra_ban_quyen liệt kê sai). Thay bằng tài nguyên manifest mà canh.js của từng
    # đoạn thật sự dùng (bản đồ map-*...), mốc = thời gian đoạn.
    man_p = pj / "assets/manifest.json"
    assets = json.loads(man_p.read_text(encoding="utf-8")).get("assets", {}) if man_p.exists() else {}
    for sc in order:
        sc["shots"] = []
    for seg in pc["doan"]:
        cj = pj / "hoat-hinh" / f"doan-{seg['id']}" / "canh.js"
        if not cj.exists():
            continue
        ids = set()
        for m in re.findall(r"\b((?:map|ai|commons)-[a-z0-9-]+)", cj.read_text(encoding="utf-8")):
            # bản cắt riêng trong đoạn (vd map-yakutia-nho) quy về tài nguyên gốc dài nhất có trong manifest
            goc = max((k for k in assets if m == k or m.startswith(k + "-")), key=len, default=None)
            if goc:
                ids.add(goc)
        sc = next((s for s in order if s["start"] <= seg["bat_dau"] < s["end"]), order[-1])
        for aid in sorted(ids):
            a = assets[aid]
            sc["shots"].append({"show": f"asset:{aid}", "at": round(seg["bat_dau"], 3), "end": round(seg["ket_thuc"], 3),
                                "src": a.get("file"), "kind": a.get("kind"), "doan": seg["id"]})
    tl["scenes"] = order
    tl["duration"] = total
    tl["format"] = "hoat-hinh"
    tl["template"] = "hoat-hinh (phan-canh.json)"
    tl["sfx"] = hh.get("sfx", [])
    if hh.get("music"):
        tl["music"] = hh["music"]
    tl["nguon_moc"] = "hoat-hinh/phan-canh.json loi[] (xuat_timeline.py)"
    (pj / "timeline.json").write_text(json.dumps(tl, ensure_ascii=False, indent=2), encoding="utf-8")

    out = pj / "out"
    out.mkdir(exist_ok=True)
    srt = []
    for i, c in enumerate(tl.get("captions") or [], 1):
        srt += [str(i), f"{srt_time(c['start'])} --> {srt_time(c['end'])}", "\n".join(c["lines"]), ""]
    (out / "captions.srt").write_text("\n".join(srt), encoding="utf-8")
    (out / "chapters.txt").write_text("\n".join(f"{mmss(c['at'])} {c['title']}" for c in ch) + "\n", encoding="utf-8")

    ngan = [c for c in ch if c["end"] - c["at"] < 10]
    print(f"timeline.json: {len(order)} cảnh, {len(ch)} chương, {len(tl.get('claims') or [])} mốc khẳng định, "
          f"{len(tl.get('captions') or [])} cụm phụ đề, {total:.2f} s; con dấu "
          f"{next((s['verdict']['at'] for s in order if s.get('verdict')), 'không có')}")
    if ngan:
        print("LỖI: chương ngắn hơn 10 s: " + ", ".join(c["title"] for c in ngan))
        sys.exit(1)


if __name__ == "__main__":
    main()
