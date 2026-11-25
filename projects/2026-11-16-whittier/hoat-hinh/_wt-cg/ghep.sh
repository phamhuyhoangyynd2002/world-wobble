#!/bin/sh
# Ghép prelude tập Whittier + phần riêng của đoạn thành canh.js. Dùng: ghep.sh d01 [d03 ...]
H="c:/Users/phamh/OneDrive/Documents/GitHub/world-wobble/projects/2026-11-16-whittier/hoat-hinh"
for d in "$@"; do cat "$H/cat-giay-wt-prelude.js" "$H/doan-$d/canh-rieng.js" > "$H/doan-$d/canh.js"; done
