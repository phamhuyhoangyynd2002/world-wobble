#!/bin/sh
# render.sh d01 [draft|delivery]: ghép canh.js, sfx.json, render, bỏ tiếng, trích khung
H="c:/Users/phamh/OneDrive/Documents/GitHub/world-wobble/projects/2026-11-16-whittier/hoat-hinh"
R="c:/Users/phamh/OneDrive/Documents/GitHub/world-wobble"
export TMP='D:\YouTube\world-wobble\tmp' TEMP='D:\YouTube\world-wobble\tmp'
d=$1; q=${2:-delivery}
sh "$H/_wt-cg/ghep.sh" $d
cd "$R" && node templates/hoat-hinh/cat-giay/cong-cu/tao_sfx.mjs "$H/doan-$d" || exit 1
cd "$H/doan-$d" && mkdir -p out/frames
s=$(date +%s)
npx --yes hyperframes@0.8.85 render -o out/render.mp4 -q $q -w 2 > out/render.log 2>&1 || { tail -20 out/render.log; exit 1; }
e=$(date +%s)
ffmpeg -y -loglevel error -i out/render.mp4 -map 0:v -c copy out/doan.mp4 && rm -f out/render.mp4
dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 out/doan.mp4)
echo "$d render $((e-s))s dur=$dur"
