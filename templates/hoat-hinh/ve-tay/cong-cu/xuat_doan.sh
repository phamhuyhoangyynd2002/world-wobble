#!/usr/bin/env bash
# Kiểm, chụp thử hoặc render một đoạn ve-tay, rồi trích khung kiểm tra.
#
#   bash templates/hoat-hinh/ve-tay/cong-cu/xuat_doan.sh <thư mục doan-xx> check
#   bash .../xuat_doan.sh <doan> snapshot "0,1.5,4.2"            # → <doan>/snapshots/
#   bash .../xuat_doan.sh <doan> render [draft|standard|high] "0.2,3,7.5,12"   # → out/doan.mp4 + out/frames/*.png
#
# Cần Node 22+ trên PATH (máy này: export PATH=$HOME/.nvm/versions/node/v22.23.3/bin:$PATH nếu node mặc định cũ hơn), ffmpeg, ffprobe.
set -euo pipefail
DOAN="$(cd "$1" && pwd)"; CMD="${2:-check}"
HERE="$(cd "$(dirname "$0")" && pwd)"
HF="npx --yes hyperframes@0.8.85"
cd "$DOAN"
case "$CMD" in
  check)
    node "$HERE/kiem_doan.mjs" "$DOAN"
    $HF check
    ;;
  snapshot)
    $HF snapshot --at "${3:-0}"
    ;;
  render)
    Q="${3:-draft}"; AT="${4:-}"
    mkdir -p out/frames
    node "$HERE/kiem_doan.mjs" "$DOAN"
    START=$(date +%s)
    $HF render --quality "$Q" --workers "${WORKERS:-auto}" --output out/doan.mp4
    echo "render: $(( $(date +%s) - START )) s"
    ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames:format=duration -of default=nw=1 out/doan.mp4
    if [ -z "$AT" ]; then
      DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/doan.mp4)
      AT=$(python -c "d=$DUR; print(','.join('%.2f'%(d*k/5+0.05) for k in range(5)))")
    fi
    rm -f out/frames/*.png
    IFS=',' read -ra TS <<< "$AT"
    for t in "${TS[@]}"; do
      ffmpeg -y -loglevel error -ss "$t" -i out/doan.mp4 -frames:v 1 "out/frames/t$(printf '%05.2f' "$t").png"
    done
    ls out/frames
    ;;
  *) echo "lệnh: check | snapshot | render"; exit 2 ;;
esac
