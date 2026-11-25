"""Đo phản ứng của người xem với giọng đọc: lấy toàn bộ danh sách video của kênh (tiêu đề, lượt xem),
chọn N video trải đều từ cũ tới mới, mỗi video lấy 80 bình luận hàng đầu, đếm và trích bình luận nhắc tới giọng/AI.
usage: python do_giong.py <channel_id> <N>  -> giong-doc/<ten>.json"""
import sys,json,subprocess,re
cid,N=sys.argv[1],int(sys.argv[2])
def run(a,t=600):
    return subprocess.run([sys.executable,'-m','yt_dlp',*a],capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=t).stdout
info=json.loads(run(['--flat-playlist','-J',f'https://www.youtube.com/channel/{cid}/videos']))
ten=info.get('channel') or cid; slug=re.sub(r'[^A-Za-z0-9]+','-',ten).strip('-') or cid
E=[e for e in info.get('entries') or [] if e and e.get('view_count') is not None]  # mới -> cũ
idx=sorted({round(i*(len(E)-1)/max(N-1,1)) for i in range(N)})
kw=re.compile(r"\b(ai|a\.i\.?|voice|voiceover|narrat\w*|tts|robot\w*|text to speech|accent|slop|human)\b",re.I)
out={'kenh':ten,'tong_video':len(E),'tat_ca':[{'thu_tu_tu_moi':i,'id':e['id'],'tieu_de':e['title'],'luot_xem':e['view_count'],'phut':round((e.get('duration') or 0)/60,1)} for i,e in enumerate(E)],'mau':[]}
for i in idx:
    e=E[i]
    try: v=json.loads(run(['--skip-download','--write-comments','--extractor-args','youtube:max_comments=80,80,0,0;comment_sort=top','-J','https://www.youtube.com/watch?v='+e['id']]))
    except Exception as ex: out['mau'].append({'thu_tu_tu_moi':i,'id':e['id'],'loi':str(ex)[:100]}); continue
    C=v.get('comments') or []; hit=[c for c in C if kw.search(c.get('text') or '')]
    out['mau'].append({'thu_tu_tu_moi':i,'id':e['id'],'tieu_de':v.get('title'),'ngay':v.get('upload_date'),'luot_xem':v.get('view_count'),'so_bl_lay':len(C),
        'nhac_giong_ai':[{'thich':c.get('like_count'),'loi':(c.get('text') or '')[:350]} for c in sorted(hit,key=lambda c:-(c.get('like_count') or 0))]})
json.dump(out,open(f'giong-doc/{slug}.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(ten,len(E),len(out['mau']),flush=True)
