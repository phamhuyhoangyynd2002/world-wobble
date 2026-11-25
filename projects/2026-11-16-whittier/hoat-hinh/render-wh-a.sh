#!/bin/sh
# render một đoạn nhóm A: render-wh-a.sh <id> [draft|delivery]
cd "$(dirname "$0")/doan-$1" || exit 1
export TMP='D:\YouTube\world-wobble\tmp' TEMP='D:\YouTube\world-wobble\tmp'
mkdir -p out
S=$(date +%s)
npx --yes hyperframes@0.8.85 render -o out/render.mp4 -q ${2:-delivery} -w 2 > out/render.log 2>&1 || { tail -30 out/render.log; exit 1; }
ffmpeg -y -loglevel error -i out/render.mp4 -map 0:v -c copy out/doan.mp4 && rm -f out/render.mp4
echo "$1 render $(( $(date +%s)-S ))s dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/doan.mp4)"
