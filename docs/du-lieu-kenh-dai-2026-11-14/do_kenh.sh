#!/bin/bash
# usage: do_kenh.sh <python> <yt-dlp> <thi_truong> <danh-sach.tsv> > ket-qua.tsv  (cột 1 = mảng, cột 2 = handle/url)
P="$1"; Y="$2"; MK="$3"; F="$4"; H=$(dirname "$0")
tail -n +2 "$F" | awk -F"\t" 'NF>=2{print $1; print $2}' | tr "\n" "\0" | xargs -0 -n2 -P6 "$P" "$H/yt_kenh.py" "$Y" "$MK"
