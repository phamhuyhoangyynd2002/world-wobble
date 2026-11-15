#!/bin/bash
# Ngày đăng video dài đầu tiên và tổng số video dài của kênh. usage: tuoi_kenh.sh <yt-dlp> <@handle>
Y="$1"; h="$2"
ids=$("$Y" --flat-playlist --print id "https://www.youtube.com/$h/videos" 2>/dev/null)
n=$(echo "$ids" | grep -c .); last=$(echo "$ids" | tail -1)
d=$("$Y" --skip-download --print upload_date "https://www.youtube.com/watch?v=$last" 2>/dev/null)
printf "%s\t%s\n" "$h" "$n"  # ngày video đầu: YouTube chặn bot khi tra nhiều, xem kenh-moi-va-ai.tsv
