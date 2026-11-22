"""Tờ khung hình cho từng đoạn hoạt hình: một khung tại mỗi nhịp trong phan-canh.json, có chú thích.

Dùng ở bước duyệt hình (sau khi dựng, trước khi ghép bản cuối): người duyệt đặt tờ khung cạnh ý định
trong bảng phân cảnh để chấm từng đoạn. Cũng sinh tờ tổng thể (khung giữa mỗi đoạn) để nhìn cả tập.

Cách dùng:
  python .claude/skills/dung-hoat-hinh/scripts/to_khung.py <dự án> [--doan d03,d07] [--lech 0.35]
Ghi:
  <dự án>/hoat-hinh/duyet/to-khung/<id>.jpg   một tờ cho mỗi đoạn đã có out/doan.mp4
  <dự án>/hoat-hinh/duyet/to-khung/_tong-the.jpg
  <dự án>/hoat-hinh/duyet/to-khung/_muc-luc.json   (mốc, lời, thẻ của từng ô, để người duyệt tra)
Cần: ffmpeg, Pillow.
"""
import argparse, json, re, subprocess, sys, tempfile
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Thiếu Pillow: pip install pillow")

O_W, O_H = 480, 270          # cỡ một ô
COT = 4                      # số cột
CHU_H = 64                   # dải chú thích dưới mỗi ô
NEN, MUC, MO = (239, 227, 200), (30, 36, 48), (95, 104, 120)


def font(sz):
    for f in ("arial.ttf", "DejaVuSans.ttf", "segoeui.ttf"):
        try:
            return ImageFont.truetype(f, sz)
        except OSError:
            pass
    return ImageFont.load_default()


F1, F2, FH = font(15), font(13), font(22)


def cat_khung(mp4, t, dest):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{max(t, 0):.3f}", "-i", str(mp4),
                    "-frames:v", "1", "-vf", f"scale={O_W}:{O_H}", str(dest)], check=True)


def ngan(s, n):
    s = (s or "").strip()
    return s if len(s) <= n else s[: n - 1] + "…"


def gach_dong(draw, text, xy, f, fill, w):
    """Viết tối đa 2 dòng trong bề rộng w."""
    words, lines, cur = text.split(), [], ""
    for wd in words:
        nxt = (cur + " " + wd).strip()
        if draw.textlength(nxt, font=f) <= w:
            cur = nxt
        else:
            lines.append(cur)
            cur = wd
            if len(lines) == 2:
                break
    if cur and len(lines) < 2:
        lines.append(cur)
    x, y = xy
    for ln in lines[:2]:
        draw.text((x, y), ln, font=f, fill=fill)
        y += f.size + 3


def to_doan(d, mp4, out, lech, tmp):
    nhip = d.get("nhip") or []
    dur = d["ket_thuc"] - d["bat_dau"]
    moc = [min(max(n["tai"] - d["bat_dau"] + lech, 0.05), dur - 0.05) for n in nhip] or [dur / 2]
    moc.append(dur - 0.05)  # khung cuối (để soi nối ra)
    n = len(moc)
    hang = (n + COT - 1) // COT
    W, H = COT * O_W + (COT + 1) * 8, 70 + hang * (O_H + CHU_H + 8) + 8
    tro = Image.new("RGB", (W, H), NEN)
    dr = ImageDraw.Draw(tro)
    dr.text((10, 10), f"{d['id']} · {d['phong_cach']} · {d.get('lop', '')} · {d['bat_dau']:.2f}–{d['ket_thuc']:.2f} s "
                      f"({dur:.1f} s) · vào {d.get('vao')} / ra {d.get('ra')}", font=FH, fill=MUC)
    dr.text((10, 40), ngan("Trang phục: " + (d.get("trang_phuc") or ""), 230), font=F2, fill=MO)
    muc = []
    for i, t in enumerate(moc):
        p = tmp / f"{d['id']}-{i}.png"
        try:
            cat_khung(mp4, t, p)
            o = Image.open(p)
        except Exception:
            o = Image.new("RGB", (O_W, O_H), (200, 60, 60))
        x = 8 + (i % COT) * (O_W + 8)
        y = 70 + (i // COT) * (O_H + CHU_H + 8)
        tro.paste(o, (x, y))
        if i < len(nhip):
            nh = nhip[i]
            tag = re.match(r"^\[([a-z0-9-]+)\]", nh.get("hanh_dong") or "")
            dau = f"{t:.2f}s" + (f" [{tag.group(1)}]" if tag else "") + (" · GAG" if nh.get("gag") else "")
            loi = nh.get("loi") or "(không lời)"
            muc.append({"o": i + 1, "t_doan": round(t, 2), "t_video": round(d["bat_dau"] + t, 2), "loi": nh.get("loi"),
                        "hanh_dong": nh.get("hanh_dong"), "gag": nh.get("gag"), "sfx": nh.get("sfx")})
        else:
            dau, loi = f"{t:.2f}s · khung cuối", f"ra: {d.get('ra')}"
            muc.append({"o": i + 1, "t_doan": round(t, 2), "t_video": round(d["bat_dau"] + t, 2), "khung_cuoi": True})
        dr.text((x + 2, y + O_H + 4), f"{i + 1}. {dau}", font=F1, fill=MUC)
        gach_dong(dr, ngan(loi, 140), (x + 2, y + O_H + 24), F2, MO, O_W - 4)
    tro.save(out, quality=86)
    return muc


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--doan", nargs="+", help="id đoạn, cách nhau bằng dấu phẩy hoặc dấu cách")
    ap.add_argument("--lech", type=float, default=0.35, help="giây sau mốc nhịp (để thấy phản ứng đã xảy ra)")
    a = ap.parse_args()
    pj = Path(a.project)
    pc = json.loads((pj / "hoat-hinh/phan-canh.json").read_text(encoding="utf-8"))
    chon = {x for d in a.doan for x in d.split(",") if x} if a.doan else None
    out_dir = pj / "hoat-hinh/duyet/to-khung"
    out_dir.mkdir(parents=True, exist_ok=True)
    muc_luc, tong, thieu = {}, [], []
    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        for d in pc["doan"]:
            if chon and d["id"] not in chon:
                continue
            mp4 = pj / "hoat-hinh" / f"doan-{d['id']}" / "out/doan.mp4"
            if not mp4.exists():
                thieu.append(d["id"])
                continue
            muc_luc[d["id"]] = to_doan(d, mp4, out_dir / f"{d['id']}.jpg", a.lech, tmp)
            p = tmp / f"tong-{d['id']}.png"
            cat_khung(mp4, (d["ket_thuc"] - d["bat_dau"]) / 2, p)
            tong.append((d, p))
        if tong and not chon:
            cot = 8
            w, h = 240, 135
            hang = (len(tong) + cot - 1) // cot
            img = Image.new("RGB", (cot * (w + 6) + 6, hang * (h + 26) + 6), NEN)
            dr = ImageDraw.Draw(img)
            mau = {"cat-giay": (217, 72, 43), "ve-tay": (47, 95, 179), "diorama": (31, 138, 112)}
            for i, (d, p) in enumerate(tong):
                x, y = 6 + (i % cot) * (w + 6), 6 + (i // cot) * (h + 26)
                img.paste(Image.open(p).resize((w, h)), (x, y))
                dr.rectangle([x, y + h, x + w, y + h + 20], fill=mau.get(d["phong_cach"], MO))
                dr.text((x + 4, y + h + 2), f"{d['id']} {d['bat_dau']:.0f}s", font=F2, fill=(255, 255, 255))
            img.save(out_dir / "_tong-the.jpg", quality=86)
    so_lam = len(muc_luc)
    ml_p = out_dir / "_muc-luc.json"
    if chon and ml_p.exists():  # chạy riêng vài đoạn: giữ mục lục các đoạn khác
        cu = json.loads(ml_p.read_text(encoding="utf-8"))
        cu.update(muc_luc)
        muc_luc = cu
    ml_p.write_text(json.dumps(muc_luc, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Tờ khung: đã làm {so_lam} đoạn → {out_dir}")
    if thieu:
        print("Chưa có doan.mp4: " + ", ".join(thieu))


if __name__ == "__main__":
    main()
