#!/usr/bin/env bash
# Ghép chung-b.js (doan-d24) + canh-doan.js của từng đoạn nhóm B thành canh.js.
HERE="$(cd "$(dirname "$0")" && pwd)"; HH="$(dirname "$HERE")"
for d in d24 d26 d29 d33 d36 d45; do
  [ -f "$HH/doan-$d/canh-doan.js" ] || continue
  { cat "$HERE/chung-b.js"; echo; cat "$HH/doan-$d/canh-doan.js"; } > "$HH/doan-$d/canh.js"
  echo "ghép doan-$d/canh.js"
done
