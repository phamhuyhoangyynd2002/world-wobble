#!/bin/sh
# Trích khung từ out/doan.mp4 vào out/frames/ (1280 rộng) + tờ ghép 3 cột ở out/frames/to.jpg.  Dùng: sh doan-d22/khung.sh <id> t1 t2 ...
id=$1; shift; d="doan-$id/out/frames"; mkdir -p "$d"; rm -f "$d"/*.png "$d"/to.jpg
ins=""; n=0
for t in "$@"; do f="$d/khung-$(printf '%05.2f' $t)s.png"; ffmpeg -v error -ss "$t" -i "doan-$id/out/doan.mp4" -frames:v 1 -vf scale=1280:-1 -y "$f"; ins="$ins -i $f"; n=$((n+1)); done
cols=3; [ $n -lt 3 ] && cols=$n; rows=$(( (n + cols - 1) / cols ))
lay=""; i=0; while [ $i -lt $n ]; do x=$(( (i % cols) * 1280 )); y=$(( (i / cols) * 720 )); lay="$lay${lay:+|}${x}_${y}"; i=$((i+1)); done
ffmpeg -v error $ins -filter_complex "xstack=inputs=$n:layout=$lay:fill=black,scale=1800:-1" -frames:v 1 -y "$d/to.jpg"
echo "$d/to.jpg"
