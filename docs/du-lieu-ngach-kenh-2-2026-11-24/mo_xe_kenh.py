"""Mổ xẻ một kênh: 30 video gần nhất (tiêu đề, lượt xem, độ dài), rồi với video nhiều lượt xem nhất và video ở giữa:
mô tả, ngày đăng, lượt thích, 30 bình luận hàng đầu, 2 ảnh storyboard (khung hình thu nhỏ).
usage: python mo_xe_kenh.py <nhom: len|thap> <channel_id>  -> ghi mo-xe-kenh/<ten>.json + ảnh"""
import sys,json,subprocess,re,urllib.request,os,statistics
nhom,cid=sys.argv[1:3]
def run(a,t=400):
    return subprocess.run([sys.executable,'-m','yt_dlp',*a],capture_output=True,text=True,encoding='utf-8',errors='replace',timeout=t).stdout
info=json.loads(run(['--flat-playlist','--playlist-end','30','-J',f'https://www.youtube.com/channel/{cid}/videos']))
ten=info.get('channel') or cid; slug=re.sub(r'[^A-Za-z0-9]+','-',ten).strip('-') or cid
E=[e for e in info.get('entries') or [] if e and e.get('view_count') is not None]
out={'nhom':nhom,'kenh':ten,'channel_id':cid,'dang_ky':info.get('channel_follower_count'),'mo_ta_kenh':info.get('description'),
     'video':[{'id':e['id'],'tieu_de':e['title'],'luot_xem':e['view_count'],'phut':round((e.get('duration') or 0)/60,1)} for e in E],'chi_tiet':[]}
if E:
    S=sorted(E,key=lambda e:-e['view_count']); chon=[('top',S[0]),('giua',S[len(S)//2])]
    for nhan,e in chon:
        try:
            v=json.loads(run(['--skip-download','--write-comments','--extractor-args','youtube:max_comments=30,30,0,0;comment_sort=top','-J','https://www.youtube.com/watch?v='+e['id']]))
        except Exception as ex:
            out['chi_tiet'].append({'nhan':nhan,'id':e['id'],'loi':str(ex)[:200]}); continue
        cm=sorted(v.get('comments') or [],key=lambda c:-(c.get('like_count') or 0))[:30]
        anh=[]
        sb=[f for f in v.get('formats') or [] if f.get('format_id')=='sb0']
        if sb and sb[0].get('fragments'):
            fr=sb[0]['fragments']
            for j,i in enumerate(sorted({len(fr)//4,len(fr)//2})):
                p=f'mo-xe-kenh/{slug}-{nhan}-{j}.jpg'
                try: urllib.request.urlretrieve(fr[i]['url'],p); anh.append(p)
                except Exception: pass
        out['chi_tiet'].append({'nhan':nhan,'id':e['id'],'tieu_de':v.get('title'),'ngay':v.get('upload_date'),'luot_xem':v.get('view_count'),'thich':v.get('like_count'),
            'so_binh_luan':v.get('comment_count'),'phut':round((v.get('duration') or 0)/60,1),'mo_ta':(v.get('description') or '')[:2500],'tags':(v.get('tags') or [])[:15],
            'binh_luan':[{'thich':c.get('like_count'),'loi':(c.get('text') or '')[:400]} for c in cm],'anh':anh})
json.dump(out,open(f'mo-xe-kenh/{slug}.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(nhom,ten,len(E),[d.get('loi','ok') for d in out['chi_tiet']],flush=True)
