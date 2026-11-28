#!/bin/sh
# Ghép bộ dựng riêng nhóm B (doan-d22/canh-rieng.js) + canh-doan.js của từng đoạn thành canh.js (tao_sfx.mjs chỉ nạp canh.js).
# Chạy: sh doan-d22/ghep.sh [d22 d23 ...]   (từ thư mục hoat-hinh; không tham số = mọi đoạn nhóm B có canh-doan.js)
cd "$(dirname "$0")/.." || exit 1
DS="$*"; [ -z "$DS" ] && DS="d22 d23 d25 d27 d28 d30 d34 d37 d39 d40 d41 d42"
for d in $DS; do
  f="doan-$d/canh-doan.js"; [ -f "$f" ] || continue
  cat doan-d22/canh-rieng.js "$f" > "doan-$d/canh.js" && echo "ghep: doan-$d/canh.js"
done
