#!/usr/bin/env python3
"""Tạo ảnh AI hạng "phu" ngay trên máy bằng ComfyUI (không tốn API, không watermark, không giới hạn lượt).

  kiem  Kiểm cấu hình: thư mục ComfyUI, model, giấy phép model, máy chủ đang chạy chưa.
        python tao_anh_noi_bo.py kiem

  tao   Tạo vài bản (khác seed) để chọn. Tự bật ComfyUI nếu chưa chạy. Prompt mặc định lấy từ script.json → anh_ai.
        python tao_anh_noi_bo.py tao <dự án> --id ai-snow-hills [--prompt "<cảnh>"] [--so-ban 2] [--seed 11]
        → assets/ai/goc/<id>-noibo-s<seed>.png (1344×768). Mở từng bản bằng Read rồi chọn.

  chon  Nhận bản đã xem: phóng, cắt về 1920×1080 → assets/ai/<id>.png, ghi prompt và manifest.
        python tao_anh_noi_bo.py chon <dự án> --id ai-snow-hills --seed 11 --da-xem [--scenes 3,4] [--tai-hien-su-kien]

  tat   Tắt máy chủ ComfyUI do script này bật (giải phóng card đồ hoạ).
        python tao_anh_noi_bo.py tat

Cấu hình (.env ở gốc repo hoặc biến môi trường): COMFYUI_DIR (mặc định D:/ComfyUI), COMFYUI_URL (mặc định
http://127.0.0.1:8188), COMFYUI_CHECKPOINT (mặc định sd_xl_base_1.0.safetensors).

Luật: .claude/rules/chinh-xac-va-ban-quyen.md mục 3. Chỉ dùng model có trong MODELS (đã đọc giấy phép, cho thương mại).
Ảnh hạng "chinh" chỉ tạo ở đây khi nguồn ngoài hết lượt và có --ha-hang (manifest ghi ha_hang: true để báo lại).
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
sys.path.insert(0, str(HERE))
import manifest  # noqa: E402
from tao_anh_ai import BANNED, load_env  # noqa: E402

NGUON = "comfyui-noi-bo"
# Thêm model mới chỉ sau khi đọc giấy phép gốc: phải cho dùng thương mại đầu ra; không NC, không giới hạn vùng gồm Việt Nam.
MODELS = {
    "sd_xl_base_1.0.safetensors": {
        "ten": "Stable Diffusion XL base 1.0",
        "nguon_model": "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0",
        "giay_phep": "CreativeML Open RAIL++-M",
        "giay_phep_url": "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0/blob/main/LICENSE.md",
        "w": 1344, "h": 768, "steps": 25, "cfg": 6.5, "sampler": "dpmpp_2m", "scheduler": "karras",
    },
}
NEG = ("photo, photograph, photorealistic, 3d render, text, letters, words, watermark, logo, signature, map, flag, "
       "blurry, lowres, deformed, extra limbs, cluttered, moon, cactus, saguaro")
GUARD = "Clearly an illustration, not a photograph, no text, no maps, no flags, no identifiable real people."
W, H = 1920, 1080
PID = ROOT / ".cache" / "comfyui.pid"
LOG = ROOT / ".cache" / "comfyui.log"


def cfg() -> dict:
    load_env(ROOT)
    return {
        "dir": Path(os.environ.get("COMFYUI_DIR", "D:/ComfyUI")),
        "url": os.environ.get("COMFYUI_URL", "http://127.0.0.1:8188").rstrip("/"),
        "ckpt": os.environ.get("COMFYUI_CHECKPOINT", "sd_xl_base_1.0.safetensors"),
    }


def http(c: dict, path: str, data: dict | None = None, raw: bool = False, timeout: float = 30):
    req = urllib.request.Request(c["url"] + path, json.dumps(data).encode() if data is not None else None,
                                 {"Content-Type": "application/json"} if data is not None else {})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        body = r.read()
    return body if raw else json.loads(body)


def dang_chay(c: dict) -> bool:
    try:
        http(c, "/system_stats", timeout=3)
        return True
    except (urllib.error.URLError, OSError, ValueError):
        return False


def python_venv(d: Path) -> Path:
    for p in (d / ".venv" / "Scripts" / "python.exe", d / ".venv" / "bin" / "python"):
        if p.exists():
            return p
    raise SystemExit(f"LỖI: không thấy Python của ComfyUI trong {d}/.venv (cài theo docs/thu-nghiem-comfyui-2026-11-17.md)")


def bat(c: dict) -> None:
    if dang_chay(c):
        return
    port = urllib.parse.urlparse(c["url"]).port or 8188
    LOG.parent.mkdir(parents=True, exist_ok=True)
    flags = 0
    if os.name == "nt":
        flags = subprocess.CREATE_NEW_PROCESS_GROUP | subprocess.DETACHED_PROCESS
    with open(LOG, "ab") as log:
        p = subprocess.Popen([str(python_venv(c["dir"])), "main.py", "--listen", "127.0.0.1", "--port", str(port),
                              "--disable-auto-launch", "--offline"], cwd=c["dir"], stdout=log, stderr=log,
                             creationflags=flags)
    PID.write_text(str(p.pid), encoding="utf-8")
    print(f"Đang bật ComfyUI (pid {p.pid}, log {LOG})…", flush=True)
    for _ in range(240):
        if dang_chay(c):
            print("ComfyUI sẵn sàng.", flush=True)
            return
        if p.poll() is not None:
            raise SystemExit(f"LỖI: ComfyUI thoát với mã {p.returncode}; xem {LOG}")
        time.sleep(1)
    raise SystemExit(f"LỖI: ComfyUI không sẵn sàng sau 240 giây; xem {LOG}")


def model(c: dict) -> dict:
    m = MODELS.get(c["ckpt"])
    if not m:
        raise SystemExit(f"TỪ CHỐI: model '{c['ckpt']}' chưa có trong danh sách đã kiểm giấy phép (MODELS). "
                         "Đọc giấy phép gốc, xác nhận cho thương mại, rồi mới thêm vào script.")
    f = c["dir"] / "models" / "checkpoints" / c["ckpt"]
    if not f.exists():
        raise SystemExit(f"LỖI: thiếu file model {f}")
    return m


def muc_anh(project: Path, aid: str) -> dict:
    s = project / "script.json"
    if not s.exists():
        return {}
    for m in json.loads(s.read_text(encoding="utf-8")).get("anh_ai") or []:
        if m.get("id") == aid:
            return m
    return {}


def style() -> str:
    f = ROOT / "templates" / "_shared" / "phong-cach-anh.txt"
    t = f.read_text(encoding="utf-8").strip() if f.exists() else ""
    return "" if t.startswith("TODO") else t


def workflow(c: dict, m: dict, prompt: str, seed: int, prefix: str) -> dict:
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": c["ckpt"]}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"text": prompt, "clip": ["1", 1]}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"text": NEG, "clip": ["1", 1]}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": m["w"], "height": m["h"], "batch_size": 1}},
        "5": {"class_type": "KSampler", "inputs": {
            "model": ["1", 0], "positive": ["2", 0], "negative": ["3", 0], "latent_image": ["4", 0], "seed": seed,
            "steps": m["steps"], "cfg": m["cfg"], "sampler_name": m["sampler"], "scheduler": m["scheduler"],
            "denoise": 1.0}},
        "6": {"class_type": "VAEDecode", "inputs": {"samples": ["5", 0], "vae": ["1", 2]}},
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": prefix}},
    }


def cmd_kiem(_a) -> int:
    c = cfg()
    print(f"COMFYUI_DIR  {c['dir']}  {'có' if c['dir'].exists() else 'KHÔNG THẤY'}")
    print(f"Model        {c['ckpt']}")
    m = model(c)
    print(f"Giấy phép    {m['giay_phep']} ({m['giay_phep_url']})")
    print(f"Máy chủ      {c['url']}  {'đang chạy' if dang_chay(c) else 'chưa chạy (lệnh tao sẽ tự bật)'}")
    return 0


def cmd_tao(a) -> int:
    c, project = cfg(), Path(a.project)
    m = model(c)
    muc = muc_anh(project, a.id)
    canh = a.prompt or muc.get("canh")
    if not canh:
        print(f"LỖI: '{a.id}' không có trong script.json → anh_ai và không có --prompt")
        return 1
    if BANNED.search(canh):
        print(f"TỪ CHỐI: prompt có '{BANNED.search(canh).group(0)}' (ảnh chụp, phong cách có sẵn, hoặc bản đồ)")
        return 1
    if muc.get("hang") == "chinh" and not a.ha_hang:
        print(f"DỪNG: '{a.id}' là ảnh hạng chính (tạo bằng nguồn ngoài). Chỉ tạo nội bộ khi nguồn ngoài hết lượt: "
              "thêm --ha-hang, và báo lại khi giao video.")
        return 2
    if (project / "assets" / "ai" / f"{a.id}.png").exists() and not a.lam_lai:
        print(f"Đã có assets/ai/{a.id}.png, không tạo lại (thêm --lam-lai nếu thật sự cần)")
        return 0
    full = " ".join(x for x in (style(), canh.strip(), GUARD) if x)
    bat(c)
    goc = project / "assets" / "ai" / "goc"
    goc.mkdir(parents=True, exist_ok=True)
    for i in range(a.so_ban):
        seed = a.seed + i * 1009
        t0 = time.time()
        pid = http(c, "/prompt", {"prompt": workflow(c, m, full, seed, f"ww-{a.id}-s{seed}")})["prompt_id"]
        while True:
            h = http(c, f"/history/{pid}")
            if pid in h and h[pid].get("status", {}).get("completed") is not None:
                break
            time.sleep(2)
        st = h[pid]["status"]
        if st.get("status_str") != "success":
            print(f"LỖI seed {seed}: {json.dumps(st.get('messages', []))[-600:]}")
            return 1
        img = h[pid]["outputs"]["7"]["images"][0]
        q = urllib.parse.urlencode({"filename": img["filename"], "subfolder": img.get("subfolder", ""),
                                    "type": img.get("type", "output")})
        out = goc / f"{a.id}-noibo-s{seed}.png"
        out.write_bytes(http(c, f"/view?{q}", raw=True, timeout=60))
        out.with_suffix(".prompt.txt").write_text(f"{full}\nNEGATIVE: {NEG}\nSEED: {seed}\nMODEL: {c['ckpt']}\n",
                                                  encoding="utf-8")
        print(f"Bản seed {seed}: {out} ({time.time() - t0:.0f} giây)", flush=True)
    print("Mở từng bản bằng Read: đúng nội dung chính, rõ là tranh vẽ, không chữ, không lỗi hình. "
          f"Rồi: tao_anh_noi_bo.py chon {a.project} --id {a.id} --seed <seed> --da-xem")
    return 0


def cmd_chon(a) -> int:
    from PIL import Image

    c, project = cfg(), Path(a.project)
    m = model(c)
    if not a.da_xem:
        print("LỖI: phải mở xem bản đã chọn trước (--da-xem)")
        return 1
    src = project / "assets" / "ai" / "goc" / f"{a.id}-noibo-s{a.seed}.png"
    if not src.exists():
        print(f"LỖI: không thấy {src}")
        return 1
    meta = src.with_suffix(".prompt.txt").read_text(encoding="utf-8").splitlines()
    prompt = meta[0]
    im = Image.open(src).convert("RGB")
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - W) // 2, (im.height - H) // 2
    dest = project / "assets" / "ai" / f"{a.id}.png"
    im.crop((x, y, x + W, y + H)).save(dest)
    dest.with_suffix(".prompt.txt").write_text(prompt + "\n", encoding="utf-8")
    muc = muc_anh(project, a.id)
    manifest.put(project, a.id, {
        "file": dest.relative_to(project).as_posix(), "kind": "anh-ai", "basis": "ai-tao",
        "license": "Kênh tự tạo bằng AI trên máy (không có bản quyền ở Mỹ nếu chỉ từ prompt)",
        "author": "World Wobble (AI)", "source_url": None, "attribution": None,
        "prompt": prompt, "negative_prompt": NEG, "model": m["ten"], "model_file": c["ckpt"],
        "nguon_model": m["nguon_model"], "giay_phep_model": m["giay_phep"], "giay_phep_model_url": m["giay_phep_url"],
        "nguon": NGUON, "seed": a.seed, "goc": src.relative_to(project).as_posix(), "da_xem": True,
        "hang": muc.get("hang"), "ha_hang": True if muc.get("hang") == "chinh" else None,
        "scenes": manifest.parse_scenes(a.scenes) or muc.get("scenes") or [],
        "tai_hien_su_kien": True if (a.tai_hien_su_kien or muc.get("tai_hien_su_kien")) else None,
    })
    print(f"Xong: {dest} (1920×1080) · {m['ten']} · seed {a.seed}")
    return 0


def cmd_tat(_a) -> int:
    if not PID.exists():
        print("Không có ComfyUI nào do script này bật.")
        return 0
    pid = PID.read_text(encoding="utf-8").strip()
    if os.name == "nt":
        subprocess.run(["taskkill", "/PID", pid, "/T", "/F"], capture_output=True)
    else:
        subprocess.run(["kill", pid], capture_output=True)
    PID.unlink()
    print(f"Đã tắt ComfyUI (pid {pid}).")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("kiem")
    sub.add_parser("tat")
    t = sub.add_parser("tao")
    t.add_argument("project")
    t.add_argument("--id", required=True)
    t.add_argument("--prompt")
    t.add_argument("--so-ban", type=int, default=2)
    t.add_argument("--seed", type=int, default=11)
    t.add_argument("--ha-hang", action="store_true", help="ảnh hạng chính tạo nội bộ vì nguồn ngoài hết lượt")
    t.add_argument("--lam-lai", action="store_true")
    ch = sub.add_parser("chon")
    ch.add_argument("project")
    ch.add_argument("--id", required=True)
    ch.add_argument("--seed", type=int, required=True)
    ch.add_argument("--da-xem", action="store_true")
    ch.add_argument("--scenes")
    ch.add_argument("--tai-hien-su-kien", action="store_true")
    a = ap.parse_args()
    return {"kiem": cmd_kiem, "tao": cmd_tao, "chon": cmd_chon, "tat": cmd_tat}[a.cmd](a)


if __name__ == "__main__":
    sys.exit(main())
