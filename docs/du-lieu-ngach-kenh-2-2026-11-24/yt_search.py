"""Đo 40 video đầu kết quả tìm kiếm YouTube (chỉ video, gl=US, hl=en) cho từng từ khoá.
usage: python yt_search.py tu-khoa.tsv [nam-nay] > ket-qua.tsv  (nam-nay: chỉ video đăng trong năm nay)"""
import csv,sys,subprocess,urllib.parse
print('mang\ttu_khoa\tluot_xem\tgiay\tkenh\tchannel_id\tvideo_id\ttieu_de',flush=True)
SP="EgQIBRAB" if len(sys.argv)>2 and sys.argv[2]=="nam-nay" else "EgIQAQ%253D%253D"
for r in csv.DictReader(open(sys.argv[1],encoding='utf-8'),delimiter='\t'):
    q=urllib.parse.quote(r['tu_khoa'])
    url=f"https://www.youtube.com/results?search_query={q}&sp={SP}&hl=en&gl=US"
    out=subprocess.run([sys.executable,'-m','yt_dlp','--flat-playlist','--playlist-end','40','--extractor-args','youtube:lang=en',
        '--print',f"{r['mang']}\t{r['tu_khoa']}\t%(view_count)s\t%(duration)s\t%(channel)s\t%(channel_id)s\t%(id)s\t%(title)s",url],
        capture_output=True,text=True,encoding='utf-8',timeout=300).stdout
    sys.stdout.write(out); sys.stdout.flush()
