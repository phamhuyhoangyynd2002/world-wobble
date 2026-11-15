#!/bin/bash
# Đo kết quả tìm kiếm YouTube (40 video đầu, chỉ video) cho một từ khoá.
# usage: yt_search.sh <yt-dlp> <thi_truong> <mang> <tu_khoa>  -> in TSV ra stdout
Y="$1"; mk="$2"; seg="$3"; q="$4"
enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$q")
hl=en; gl=US; [ "$mk" = ja ] && { hl=ja; gl=JP; }
"$Y" --flat-playlist --playlist-end 40 --extractor-args "youtube:lang=$hl" \
  --print "${mk}	${seg}	${q}	%(view_count)s	%(duration)s	%(channel)s	%(channel_id)s	%(id)s	%(title)s" \
  "https://www.youtube.com/results?search_query=${enc}&sp=EgIQAQ%253D%253D&hl=${hl}&gl=${gl}" 2>/dev/null
