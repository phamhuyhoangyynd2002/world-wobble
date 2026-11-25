"""Đặt video và file lớn của một tập vào kho ổ D theo quy ước (chốt 24/11/2026).

Kho: D:/YouTube/world-wobble/  (video/, du-an/, tmp/, README.md)

  python luu_o_d.py <dự án> --tap 03 --nhap "mo-ket"
      chép <dự án>/hoat-hinh/out/video.mp4 (hoặc out/video.mp4) thành
      video/tap-03-<slug>/ban-nhap-<YYYY-MM-DD>-mo-ket.mp4 để người làm kênh xem.

  python luu_o_d.py <dự án> --tap 03 --giao
      khi tập đã giao: chuyển out/video.mp4, out/video-no-music.mp4 sang video/tap-03-<slug>/,
      chép captions.srt, chapters.txt, seo.md kèm; chuyển mọi *.mp4 > 50 MB còn trong dự án
      sang du-an/<thư mục tập>/ (giữ đường dẫn tương đối); xoá bản nháp cũ; ghi out/VIDEO-O-DIA-D.md.

Không xoá thư mục nào; chỉ chuyển, chép file.
"""
import argparse
import datetime as dt
import re
import shutil
import sys
from pathlib import Path

KHO = Path("D:/YouTube/world-wobble")
NGUONG = 50 * 2**20


def slug_ngan(proj: Path) -> str:
    return re.sub(r"^\d{4}-\d{2}-\d{2}-", "", proj.name)


def chuyen(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(src), str(dst))
    print(f"chuyển {src} -> {dst}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--tap", required=True, help="số tập, 2 chữ số (01, 02...)")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--nhap", metavar="GHI_CHU", help="chép bản nháp để xem")
    g.add_argument("--giao", action="store_true", help="tập đã giao: dọn file lớn sang D")
    a = ap.parse_args()

    proj = Path(a.project)
    if not KHO.exists():
        print(f"LỖI: không thấy kho {KHO}")
        return 1
    thu_muc = KHO / "video" / f"tap-{int(a.tap):02d}-{slug_ngan(proj)}"
    thu_muc.mkdir(parents=True, exist_ok=True)

    if a.nhap:
        src = next((p for p in (proj / "hoat-hinh/out/video.mp4", proj / "out/video.mp4") if p.exists()), None)
        if not src:
            print("LỖI: chưa có video.mp4")
            return 1
        ghi = re.sub(r"[^a-z0-9-]+", "-", a.nhap.lower()).strip("-")
        dst = thu_muc / f"ban-nhap-{dt.date.today():%Y-%m-%d}-{ghi}.mp4"
        shutil.copy2(src, dst)
        print(f"Bản nháp: {dst}")
        return 0

    # --giao
    out = proj / "out"
    for f in ("video.mp4", "video-no-music.mp4"):
        if (out / f).exists():
            chuyen(out / f, thu_muc / f)
    for f in ("captions.srt", "chapters.txt", "seo.md"):
        if (out / f).exists():
            shutil.copy2(out / f, thu_muc / f)
    for p in sorted(proj.rglob("*.mp4")):
        if p.stat().st_size > NGUONG:
            chuyen(p, KHO / "du-an" / proj.name / p.relative_to(proj))
    for p in thu_muc.glob("ban-nhap-*.mp4"):
        p.unlink()
        print(f"xoá bản nháp cũ {p}")
    (out / "VIDEO-O-DIA-D.md").write_text(
        "# Video đã chuyển sang ổ D\n\n"
        f"- Video cuối (video.mp4, video-no-music.mp4, captions.srt, chapters.txt): `{thu_muc.as_posix()}/`\n"
        f"- File trung gian lớn: `{(KHO / 'du-an' / proj.name).as_posix()}/` (giữ đường dẫn tương đối như trong repo)\n"
        f"- Quy ước: `{(KHO / 'README.md').as_posix()}`\n", encoding="utf-8")
    print(f"Xong: {thu_muc}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
