#!/bin/sh
# Render một đoạn nhóm B: sh doan-d22/render.sh d22 [draft|delivery]
cd "$(dirname "$0")/../doan-$1" || exit 1
export TMP='D:/YouTube/world-wobble/tmp' TEMP='D:/YouTube/world-wobble/tmp'
mkdir -p out
TAM="D:/YouTube/world-wobble/tmp/kiruna-$1-render.mp4"
npx --yes hyperframes@0.8.85 render -o "$TAM" -q ${2:-delivery} -w 2 > out/render.log 2>&1 || { echo "RENDER LOI $1"; tail -20 out/render.log; exit 1; }
ffmpeg -y -loglevel error -i "$TAM" -map 0:v -c copy out/doan.mp4 && rm -f "$TAM"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames,r_frame_rate -show_entries format=duration -of csv=p=0 out/doan.mp4
echo "XONG $1"
