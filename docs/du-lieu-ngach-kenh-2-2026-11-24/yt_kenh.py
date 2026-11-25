"""Đo một kênh YouTube: người đăng ký, lượt xem 30 video dài mới nhất (tab /videos),
khoảng ngày đăng của mẫu, độ dài trung vị. usage: python yt_kenh.py <thi_truong> <mang> <@handle|channel_id|url>"""
import sys,json,statistics,subprocess
mk,seg,ch=sys.argv[1:4]
if ch.startswith('http'): base=ch.rstrip('/').removesuffix('/videos')
elif ch.startswith('UC') and len(ch)==24: base='https://www.youtube.com/channel/'+ch
else: base='https://www.youtube.com/'+(ch if ch.startswith('@') else '@'+ch)
def run(a,t=300):
    return subprocess.run([sys.executable,"-m","yt_dlp",*a],capture_output=True,text=True,timeout=t).stdout
info={}
for _ in range(2):
    try: info=json.loads(run(['--flat-playlist','--playlist-end','30','-J',base+'/videos'])); break
    except Exception: pass
E=[e for e in (info.get('entries') or []) if e]
vs=[e['view_count'] for e in E if e.get('view_count') is not None]
du=[e['duration'] for e in E if e.get('duration')]
def date(v): return run(['--skip-download','--print','%(upload_date)s','https://www.youtube.com/watch?v='+v],120).strip()
rng=f"{date(E[-1]['id'])}->{date(E[0]['id'])}" if E else ''
row=[mk,seg,ch,info.get('channel') or info.get('title') or '',info.get('channel_id') or '',info.get('channel_follower_count') or '',
     len(vs),int(statistics.median(vs)) if vs else '',max(vs) if vs else '',sum(v>=1e5 for v in vs),
     round(statistics.median(du)/60,1) if du else '',rng]
print('\t'.join(map(str,row)),flush=True)
