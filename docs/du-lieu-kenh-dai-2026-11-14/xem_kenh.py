import csv,sys
D,ds,kq=sys.argv[1:4]
L={r[1]:r for r in csv.reader(open(f'{D}/{ds}',encoding='utf-8'),delimiter='\t')}
R=list(csv.DictReader(open(f'{D}/{kq}',encoding='utf-8'),delimiter='\t'))
R.sort(key=lambda r:(r['mang'],-int(r['trung_vi_xem_30_video_dai'] or 0)))
for r in R:
    l=L.get(r['handle'],['']*6)
    print(r['mang'][:10].ljust(10),r['ten'][:30].ljust(30),l[3][:10].ljust(10),l[4][:8].ljust(8),str(r['dang_ky']).rjust(9),str(r['trung_vi_xem_30_video_dai']).rjust(9),str(r['so_>=100k']).rjust(3),r['do_dai_trung_vi_phut'].rjust(6),r['khoang_ngay_mau'])
