#!/bin/sh
# Ghép prelude cat-giay-wh-a.js + canh-rieng.js thành canh.js cho các đoạn nhóm A, rồi sinh sfx.json
cd "$(dirname "$0")"
REPO=../../..
for d in "$@"; do
  { echo "/* canh.js sinh bởi ghep-canh-wh-a.sh: prelude cat-giay-wh-a.js + doan-$d/canh-rieng.js. Sửa ở hai file nguồn. */"; cat cat-giay-wh-a.js; [ -f doan-$d/.dung-wt ] && cat cat-giay-wt-prelude.js; cat doan-$d/canh-rieng.js; } > doan-$d/canh.js
  node $REPO/templates/hoat-hinh/cat-giay/cong-cu/tao_sfx.mjs doan-$d || echo "LOI sfx $d"
done
