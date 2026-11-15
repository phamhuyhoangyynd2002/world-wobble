import csv,statistics,sys,collections
R=list(csv.DictReader(open(sys.argv[1],encoding='utf-8'),delimiter='\t'))
g=collections.defaultdict(list)
for r in R:g[(r['thi_truong'],r['mang'],r['tu_khoa'])].append(r)
print('thi_truong\tmang\ttu_khoa\tso_video\ttrung_vi_xem\tso_>=1tr\tso_dai>=8ph\ttrung_vi_xem_dai\tso_kenh\tkenh_nhieu_nhat')
for k,v in g.items():
    vs=[int(r['luot_xem']) for r in v if r['luot_xem'] not in('NA','')]
    lg=[r for r in v if r['giay'] not in('NA','') and float(r['giay'])>=480]
    lv=[int(r['luot_xem']) for r in lg if r['luot_xem'] not in('NA','')]
    ch=collections.Counter(r['kenh'] for r in v)
    top=', '.join(f'{c}({n})' for c,n in ch.most_common(3))
    print('\t'.join(map(str,[*k,len(v),int(statistics.median(vs)) if vs else '',sum(x>=1e6 for x in vs),len(lg),int(statistics.median(lv)) if lv else '',len(ch),top])))
