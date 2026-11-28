# Sinh hoat-hinh/phan-canh.json cho tập 6 Kiruna (dao-dien-hoat-hinh).
# Vòng 1: 28/11/2026. Chép khung từ projects/2026-11-16-tristan-da-cunha/hoat-hinh/sinh-phan-canh.py (bản đã qua cổng 5a
# vòng 2, 16/16) rồi viết lại toàn bộ nội dung cho Kiruna. Giữ T()/B()/G()/E()/N()/seg() và phần tự kiểm; thêm kiểm
# "đủ lời" (nối mọi nhịp phải ra đúng lời 17 cảnh) và kiểm lộ đáp án trước cảnh 6.
# Chạy: python projects/2026-11-22-kiruna/hoat-hinh/sinh-phan-canh.py projects/2026-11-22-kiruna
# Khung xuất 2560×1440 (xuat), toạ độ thiết kế 1920×1080. Mốc tuyệt đối tính từ audio/subtitles.json (17 cảnh, Edge).
import json, os, re, sys
from collections import Counter
P = sys.argv[1]
sub = json.load(open(P + '/audio/subtitles.json', encoding='utf8'))['scenes']
script = json.load(open(P + '/script.json', encoding='utf8'))
# khoảng nghỉ sau mỗi cảnh (giây). Trước chương: 1,5; cắt về bàn chương nghiêm (13→14) và lặng trước outro (15→16): 2,0
GAP = {1: 1.0, 2: 1.5, 3: 1.0, 4: 1.5, 5: 1.2, 6: 1.0, 7: 1.5, 8: 1.0, 9: 1.5, 10: 1.0,
       11: 1.5, 12: 1.5, 13: 2.0, 14: 1.2, 15: 2.0, 16: 1.5}
START = {}; t = 0.4
for s in sub:
    START[s['id']] = round(t, 3); t += s['duration'] + GAP.get(s['id'], 0)
DUOI_A = round(START[17] - 0.6, 3)          # đoạn đuôi bắt đầu
END = round(DUOI_A + 20.0, 3)                # đuôi 20,0 s (end screen YouTube tối đa 20 s)


def norm(w):
    return re.sub(r"[^a-z0-9'-]", '', w.lower())


def T(sc, phrase, end=False):
    """Mốc tuyệt đối của cụm từ. Dấu câu cuối token trong `phrase` phải KHỚP dấu câu cuối từ.
    Token gộp của TTS (vd 'Hjalmar Lundbohm,', 'Per Geijer,') viết nối bằng '_'."""
    ws = sub[sc - 1]['words']
    toks = phrase.split()
    for i in range(len(ws)):
        ok = True
        for j, tk in enumerate(toks):
            if i + j >= len(ws): ok = False; break
            w = ws[i + j]['text']
            if norm(w) != norm(tk): ok = False; break
            p = re.sub(r"[A-Za-z0-9'\-_À-ɏ]", '', tk)
            if p and not w.endswith(p): ok = False; break
        if ok:
            j = i + len(toks) - 1
            return round(START[sc] + (ws[j]['end'] if end else ws[i]['start']), 3)
    raise SystemExit(f'khong thay "{phrase}" o canh {sc}')


def E(sc): return round(START[sc] + sub[sc - 1]['duration'], 3)
def G(sc, k=0.5): return round(E(sc) + GAP[sc] * k, 3)
def B(sc, phrase): return round(T(sc, phrase) - 0.15, 3)
def f2(x): return f'{x:.2f}'


def N(tai, loi, hd, gag='', dc=(), sfx=()):
    return {'tai': round(tai, 3), 'loi': loi, 'hanh_dong': hd, 'gag': gag, 'dao_cu': list(dc), 'sfx': list(sfx)}


D = []
def seg(id, pc, a, b, lop, bc, tp, vao, ra, nhip, chu, ly, **kw):
    nhip = sorted(nhip, key=lambda n: n['tai'])
    d = dict(id=id, phong_cach=pc, bat_dau=a, ket_thuc=b, lop=lop, boi_canh=bc, trang_phuc=tp,
             vao=vao, ra=ra, nhip=nhip, chu_tren_do_vat=chu, ly_do_phong_cach=ly)
    d.update(kw); D.append(d)


# ---------------- KHOÁ TRANG PHỤC, ĐẠO CỤ CHUNG 3 PHONG CÁCH (tập 6) ----------------
BALO = ('ba lô mặc định của rig (ô liu #7C8646, viền #566030, cuộn thảm đỏ #C9463A trên nắp), cỡ THƯỜNG như đuôi tập 4 và tập 5, '
        'KHÔNG ba lô khổng lồ (gag tập 4)')
GIAY = 'giày đỏ của tạo hình gốc'
DONG = ('MÙA ĐÔNG (tháng 2, tháng 12): ÁO KHOÁC CHẦN BÔNG (áo phao) XANH LAM #3D5A80 (đường chần ngang #2B4262, khoá kéo kem #EFE3C8), '
        'dài tới ngang hông Wob, MỘT TÚI VÁ bên PHẢI thân áo (nắp túi #2B4262: túi đựng chìa khoá); MŨ LEN XANH LÁ THÔNG #4F7A5A '
        '(vành gập #3A5C43, quả bông kem #F6EEDC); KHĂN LEN KEM #EFE3C8 sọc xanh lá thông #4F7A5A; ' + BALO + '; ' + GIAY +
        '. KHÁC mũ len đỏ #C9463A + khăn đỏ #D9543C tập 1, áo mưa vàng #E2B33C tập 3, mũ cói tập 4, áo mưa cam #E07A2E tập 5')
HE = ('MÙA HÈ (tháng 8, tháng 6): ÁO GI-LÊ VẢI MỎNG KEM #E9DDC3 (viền #B9A983), TÚI VÁ bên PHẢI (cùng chỗ túi áo khoác: túi đựng chìa khoá); '
      'KÍNH RÂM tròn gọng đen #1F2326; không mũ, không khăn; áo khoác xanh lam cuộn tròn buộc dưới cuộn thảm đỏ trên nắp ba lô; ' + BALO + '; ' + GIAY)
NHA = ('Ở NHÀ: không áo khoác, không gi-lê, không mũ, không khăn, không đeo ba lô (rig noPack); áo khoác chần bông xanh lam treo móc tường '
       'sau bàn, mũ len xanh lá thông vắt trên móc; ba lô dựa chân đèn bàn (dấu chuyến đi đã xong)')
CHUM = ('CHÙM CHÌA NHÀ: vòng kim loại bạc + ba chìa nhà (đồng vàng #C9A24A, bạc #B8BDC2, chìa đầu nhựa xanh lá thông #4F7A5A); '
        'trong chuyến đi, lúc không cầm thì MÓC ở quai TRÁI ba lô bằng móc khoá')
CHIA = ('CHÌA KHOÁ KIRUNA: chìa sắt cũ màu than #3A3F44, đầu tròn có lỗ, răng thô; THẺ GỖ nhỏ #B98A5A buộc DÂY ĐỎ #C9463A; '
        'thẻ có một vệt mực mờ (KHÔNG chữ, KHÔNG số đọc được); cầm ở bàn thì dài ≈ 1/3 thân Wob (đọc rõ ở trung cảnh); '
        'luôn KHÁC MÀU chìa nhà (than + thẻ gỗ dây đỏ) để người xem nhận ra nó trên chùm')
TRAM = 'Mặt Wob TRẦM (miệng thẳng/buồn: cat-giay `thang`/`buon`), KHÔNG cười suốt đoạn'
BAN = 'Bàn kỷ vật dưới đèn bàn ấm (cùng bàn mọi tập), sổ du lịch, cốc trà; cửa sổ ở BÊN TRÁI bàn, sát kệ kỷ vật (đinh treo chìa ở khung cửa sổ, d46)'
HC = ('THẺ HỘ CHIẾU giấy: KIRUNA cỡ ≥ 72 px hệ 1920, dòng SWEDEN và dòng Would Wob move here? ≥ 54 px, một ô con dấu vuông còn trống; '
      'thẻ ở góc trái trên x 96–900, y 54–540')
NGUOI = 'người que/giấy dạng chung, nhỏ, KHÔNG mặt chi tiết, không ai là một người cụ thể, vẽ tôn trọng'
NHA_THO = ('NHÀ THỜ KIRUNA cách điệu: nhà thờ GỖ ĐỎ #A8322A mái dốc lớn sẫm (dáng gợi lều goahti), tháp chuông gỗ đứng RIÊNG cạnh; '
           'không chữ, không chi tiết thương hiệu')
TRANG_SO = 'trang sổ du lịch nhìn từ trên, LUÔN thấy mép bàn kỷ vật và vệt đèn bàn ấm quanh trang (lớp kể ở hiện tại); Wob đứng trên mặt bàn ở mép trang'
QUANG = ('QUẢNG TRƯỜNG MỚI: toà thị chính TRÒN mặt kính và đá (Kristallen, cách điệu, không chữ) + THÁP ĐỒNG HỒ khung sắt cũ đứng cạnh '
         '(mặt đồng hồ chỉ có kim, vạch, KHÔNG số), cột đèn mới, mặt đất lát đá')
SOI = 'KHOẢNG ĐẤT TRỐNG RẢI SỎI xám giữa hai đoạn HÀNG RÀO CÔNG TRƯỜNG lưới thép, vỉa hè khô mùa hè (KHÔNG tuyết)'

# ================= MỞ · The Key to a Missing Door (cảnh 1–2, ở bàn) =================
b02 = B(1, 'I went back')
seg('d01', 'diorama', 0.0, b02, 'hien-tai',
    BAN + '. Trang sổ mở ở nửa trái mặt bàn, dán bản đồ code map-kiruna (Bắc Âu, chấm thị trấn ở nửa phải trang, vòng Bắc Cực nét đứt; '
    'bản dán trên sổ BỎ MỌI NHÃN CHỮ ở đoạn này: tên nơi chưa được nói). Wob ĐỨNG trên mặt bàn ở nửa phải khung',
    NHA + '; cầm ' + CHIA + ' (một mình, không trên chùm)', 'dau-video', 'chen', [
    N(START[1], 'This is the key to a room I rented in an Arctic town.', '[day-vao-cham] Khung 0 đã có hình: Wob giơ sẵn chìa khoá CẠNH mặt (mép trong cách mắt Wob ≥ 40 px, khung 0 thấy rõ mắt), thẻ gỗ dây đỏ đung đưa; camera đẩy chậm 1,0→1,05. Đúng "room" (≈ ' + f2(T(1, 'room')) + ' s) Wob thổi nhẹ vào răng chìa; đúng "Arctic" (≈ ' + f2(T(1, 'Arctic')) + ' s) Wob gõ đầu chìa lên chấm thị trấn trên trang sổ', 'Thổi vào chìa: một nhúm bụi SỎI XÁM bay ra (gài cho bãi sỏi ở d02, d31); Wob nhìn nhúm bụi, nhìn người xem, giữ 0,6 s tới cắt ' + f2(b02) + ' s', ['chia-khoa', 'so-du-lich', 'map-kiruna'], ['ting']),
    ], [],
    'Khung hiện tại ở bàn kỷ vật (luật: chỉ diorama). Khuôn mở khác tập 5 (tập 5: bưu thiếp + giọt nước): tập 6 mở bằng chìa khoá thổi ra bụi sỏi, rồi chèn vẽ tay cảnh về trả chìa. GHI CHO THỢ (dung-diorama): khung 0 có Wob + chìa khoá cạnh mặt, thấy rõ mắt; bụi sỏi bay ra đúng mốc trong nhịp; bản đồ trên sổ KHÔNG nhãn ở đoạn này')

b03 = B(1, 'The whole')
seg('d02', 've-tay', b02, b03, 'hoi-uc',
    'Chèn nhanh vẽ tay, nét mực sôi: ' + SOI + '; phía sau là mấy toà nhà nửa phá dỡ nét mờ; một cột biển tên phố (biển giấy trắng, KHÔNG chữ)',
    HE + ' (lần về trả chìa là tháng 8, khớp cảnh 11: không tuyết); kính râm đẩy lên trán; tay phải cầm ' + CHUM + ', giơ riêng CHÌA KHOÁ KIRUNA ra trước (chìa đang ở trên chùm, đúng dòng thời gian: đeo lại ở cảnh 9); KHÔNG khẩu hình (lop hoi-uc)',
    'chen', 'cat', [
    N(b02, 'I went back to return it.', '[chen-ve-tay] Hình to, khung đầu rõ: Wob bước dọc vỉa hè khô, giơ chìa khoá Kiruna trên chùm ra trước như cầm vé, dừng trước khoảng đất trống rải sỏi', '', ['chum-chia', 'chia-khoa'], ['whoosh']),
    N(T(1, 'The door') - 0.08, 'The door was gone.', '[take-cham] Wob đưa chìa ra, tra vào một ổ khoá TƯỞNG TƯỢNG giữa không khí, vặn một vòng đúng "gone." (≈ ' + f2(T(1, 'gone.')) + ' s)', 'Vặn chìa giữa không khí: không có gì mở ra; Wob nhìn chìa, rồi nhìn thẳng người xem, giữ 0,6 s trước "So" (' + f2(T(1, 'So was')) + ' s)', ['chia-khoa'], []),
    N(T(1, 'So was'), 'So was the street.', 'Tấm biển tên phố (trắng, không chữ) rời khỏi cột, xoay một vòng, rơi nằm trên sỏi đúng "street." (≈ ' + f2(T(1, 'street.')) + ' s); Wob cúi nhìn tấm biển; giữ tới cắt ' + f2(b03) + ' s', '', ['bien-pho-trang'], ['drop']),
    ], [],
    'Lời kể sự việc trong quá khứ, chèn 4 s bằng vẽ tay (gag vặn chìa giữa không khí). Lệch y_hinh có chủ ý: y_hinh tả "vỉa hè tuyết" nhưng lần về trả chìa là tháng 8 (cảnh 11 "tuyết đã tan, cỏ hè"), nên vẽ vỉa hè khô và đồ hè để d02 khớp d31 (cùng khung hình). GHI CHO THỢ (dung-ve-tay): thêm cho rig Wob khoá áo gi-lê kem có túi phải và chùm chìa (chỉ thêm, xem _ghi_chu KHOÁ TRANG PHỤC); kính râm có sẵn (`sunglasses`)')

b04 = B(2, 'In seventeen')
t_hc0 = T(1, 'anyone')
t_kir = T(2, 'Kiruna,')
t_hc1 = round(t_kir + 0.35, 3)
t_far = T(2, 'in the far')
seg('d03', 'diorama', b03, b04, 'hien-tai',
    'Như d01 (bàn, đèn ấm, sổ map-kiruna). Từ "in the far north" bản dán trên sổ hiện nhãn Kiruna và Arctic Circle. Từ "Under the hill" Wob lật sang TRANG POP-UP: '
    'mặt cắt giấy một quả đồi có đường hầm bên trong (không nhãn), mặt đất phía trên lõm dần, các mái nhà giấy nghiêng về phía đồi. '
    'Rồi đoàn đồ vật pop-up đi hàng một trên trang: ngôi nhà gỗ, cửa hàng, tháp đồng hồ, cuối cùng ' + NHA_THO + '. Con thiêu thân giấy nhỏ có in 1736 trên cánh',
    NHA + '; cầm chìa khoá (từ d01); từ nhịp "key ring" cầm ' + CHUM + ' đã luồn chìa Kiruna vào; cuối đoạn tay giơ chùm chìa',
    'cat', 'giay', [
    N(b03 + 0.05, 'The whole town centre had moved.', '[cat-cung-ve-hien-tai] Về bàn: trên trang sổ, cụm mái nhà giấy tí hon ở chấm thị trấn TRƯỢT sang phải khỏi chỗ cũ đúng "moved." (≈ ' + f2(T(1, 'moved.')) + ' s), để lại một VIỀN NÉT ĐỨT trống đúng hình cụm nhà', 'Wob đặt chìa khoá vào giữa viền trống: vừa khít như mảnh ghép còn thiếu; giữ 0,6 s tới "Hi," (' + f2(T(1, 'Hi,')) + ' s)', ['chia-khoa', 'so-du-lich'], ['pop']),
    N(T(1, 'Hi,'), "Hi, I'm Wob. I visit odd places and ask why", 'LỜI CHÀO NHẬN DIỆN (skill mo-ket): Wob nhặt chìa khoá lên, quay ra người xem, vẫy bằng tay cầm chìa, thẻ gỗ đung đưa', '', ['chia-khoa'], ['ting']),
    N(t_hc0 - 0.10, 'anyone stays.', HC + f': lật vào góc trái trên từ {f2(t_hc0 - 0.10)} s, PHẲNG {f2(t_hc0)}–{f2(t_hc1)} s (≈ 3,3 s: phủ đuôi lời chào "anyone stays." và chạm đúng chữ "Kiruna," {f2(t_kir)} s), lật đi xong trước {f2(t_far - 0.3)} s. Camera ĐỨNG YÊN cả lúc thẻ hiện và lật đi. Wob bước sang nửa phải khung, gật một cái; mặt Wob không bị thẻ che; không vào vùng logo x > 1500, y < 150', '', ['the-ho-chieu'], ['lat-giay']),
    N(START[2], 'The town is Kiruna,', f'Thẻ hộ chiếu còn phẳng (tới {f2(t_hc1)} s). Wob đặt chìa khoá xuống cạnh sổ, chỉ tay về thẻ đúng "Kiruna," ({f2(t_kir)} s)', '', ['the-ho-chieu', 'chia-khoa'], []),
    N(t_far, 'in the far north of Sweden, above the Arctic Circle.', f'[luot-smootherstep] CHỈ từ {f2(t_far)} s (thẻ đã đi): camera lướt xuống trang sổ: nhãn Kiruna và Arctic Circle hiện trên bản dán; Wob bước lên vòng Bắc Cực nét đứt trên trang, dang hai tay giữ thăng bằng như đi dây, dừng đúng trên chấm Kiruna ở "Circle." (≈ {f2(T(2, "Circle."))} s)', 'Wob đi dây trên vòng Bắc Cực nét đứt, chao một cái rồi đứng vững trên chấm', ['so-du-lich', 'map-kiruna'], []),
    N(T(2, 'Under the'), 'Under the hill next door is an iron mine, and it is slowly swallowing the ground the old centre stood on.', f'[lat-trang-so] Wob lật trang: mặt cắt pop-up bật dựng: đồi có đường hầm như rễ cây; đúng "swallowing" (≈ {f2(T(2, "swallowing"))} s) mặt đất trên lõm dần, mấy mái nhà nghiêng về phía đồi. Wob đặt một ngôi nhà giấy tí hon lên chỗ lõm, nó trượt về phía đồi', 'Wob chặn ngôi nhà đang trượt bằng cây bút chì; cây bút chì cũng nghiêng theo; Wob nhìn bút, giữ 0,6 s trước "So the town" (' + f2(T(2, 'So the town')) + ' s)', ['so-du-lich', 'but-chi', 'nha-giay'], []),
    N(T(2, 'So the town'), 'So the town is packing up and moving east.', 'Những thùng các-tông giấy tí hon bật lên trên từng mái nhà; Wob xé băng dính dán thùng cuối cùng, vuốt phẳng; một mũi tên giấy không chữ chỉ sang phải trang (phía đông)', '', ['thung-giay', 'bang-dinh'], ['pop']),
    N(T(2, 'Houses,'), 'Houses, shops, a clock tower, even a big red wooden church.', f'Đoàn đồ vật pop-up đi hàng một sang phải trang, mỗi món bật dựng 0–3 khung trước chữ của nó: ngôi nhà ("Houses," ≈ {f2(T(2, "Houses,"))} s), cửa hàng ("shops," ≈ {f2(T(2, "shops,"))} s), tháp đồng hồ ("clock" ≈ {f2(T(2, "clock"))} s), nhà thờ gỗ đỏ to đi chậm nhất ("church." ≈ {f2(T(2, "church."))} s). Wob đứng ở mép trang làm người dẫn đường, cầm bút chì vẫy cả đoàn đi qua', 'Nhà thờ đi sau cùng chậm rì, cả đoàn phải dừng chờ; tháp đồng hồ gõ chân sốt ruột; giữ 0,6 s', ['so-du-lich', 'but-chi'], []),
    N(T(2, 'I went there'), 'I went there to move in.', 'Wob kéo ba lô từ chân đèn lại ôm vào lòng, gật đầu quả quyết (dong-goi)', '', ['ba-lo'], []),
    N(T(2, 'I even'), 'I even put the key on my own key ring, next to my house keys.', f'[lao-vao-can-canh] MÔ-TÍP CHÌA 1 (rõ, cận ≥ 1/3 khung): Wob cầm ' + CHUM + f'; luồn chìa khoá Kiruna vào vòng đúng "ring," (≈ {f2(T(2, "ring,"))} s), chìa than + thẻ gỗ dây đỏ nằm cạnh ba chìa nhà; Wob giơ cả chùm lên tự hào đúng "keys." (≈ {f2(T(2, "keys."))} s), lắc kêu leng keng; giữ ≥ 0,6 s trước "But" ({f2(T(2, "But one"))} s)', '', ['chum-chia', 'chia-khoa'], ['ting']),
    N(T(2, 'But one'), 'But one small fact kept bugging me.', '[lao-vao-hinh-ve] Một con thiêu thân giấy nhỏ có in 1736 trên cánh (chữ ≥ 45 px khi cận) bay vòng quanh đầu Wob; Wob phẩy tay hai lần', 'Con thiêu thân giấy "bugging" Wob, rồi đậu đúng lên đầu chìa khoá Wob đang giơ; Wob lác mắt nhìn nó, giữ 0,6 s; rồi camera lao vào cánh thiêu thân, 0,4 s cuối phủ thành giấy phẳng #EFE3C8', ['chum-chia', 'thieu-than-1736'], []),
    ], ['KIRUNA', 'SWEDEN', 'Would Wob move here?', 'Kiruna', 'Arctic Circle', '1736'],
    'Lời chào + thẻ hộ chiếu + lời hứa ở bàn kỷ vật: diorama (sổ pop-up). C01–C03. Thẻ hộ chiếu đặt CÙNG lời chào (mo-ket) và chạm chữ "Kiruna," (y_hinh cảnh 2): phẳng ' + f'{f2(t_hc0)}–{f2(t_hc1)}' + ' s. Mô-típ chìa 1: luồn vào chùm (đổi ý: định chuyển tới). Đoàn nhà đi bộ ở hook (cảnh 1) đổi thành cụm mái nhà trượt để lại viền trống, để không lặp gag đoàn đồ vật đi hàng một ở nhịp "Houses, shops…". KHÔNG đường sắt, cảng, tàu ở đây (dap_an_chinh cảnh 6). GHI CHO THỢ (dung-diorama): KIRUNA ≥ 72 px, dòng khác ≥ 54 px; camera đứng yên khi thẻ hiện; nhãn trên sổ chỉ từ ' + f2(t_far) + ' s; chìa Kiruna trên chùm phải khác màu chìa nhà; 1736 trên cánh thiêu thân ≥ 45 px khi cận',
    the_ho_chieu={'cue': 'anyone stays.', 'noi': 'Kiruna', 'nuoc': 'Sweden'})

b05 = B(2, 'So what')
seg('d04', 'cat-giay', b04, b05, 'hoi-uc',
    'Trang lịch sử tông giấy cũ sepia, ' + TRANG_SO + ': đồi tuyết (không nhãn), một ' + NGUOI + ' mặc áo choàng mùa đông dày (không trang phục dân tộc chi tiết) '
    'cầm một hòn đá đen; một bàn gỗ có viên chức bóng tóc giả (không mặt); rồi THƯỚC THỜI GIAN giấy 1736 → 1900, khoảng giữa là tuyết rơi',
    NHA + '; đứng ngoài mép trang sepia (không chạm người trong lịch sử); tay không', 'giay', 'cat', [
    N(b04 + 0.05, 'In seventeen thirty-six, a Sámi man named Amund Amundson Mangi reported the iron ore here to the Swedish state.', '[tien-canh-khung] Từ giấy phẳng hiện trang sepia (mép bàn làm tiền cảnh): con thiêu thân 1736 từ d03 đậu xuống góc trang thành nhãn 1736; người mặc áo choàng chỉ tay về đồi, đi tới bàn gỗ, đặt hòn đá đen lên bàn đúng "reported" (≈ ' + f2(T(2, 'reported')) + ' s); Wob ngoài mép trang nghiêng người nhìn', '', [], ['lat-giay']),
    N(T(2, 'He got'), 'He got a reward, and no taxes for life.', 'Một túi tiền nhỏ trao qua bàn ở "reward," ; một tờ giấy thuế (dòng kẻ, không chữ) bị gạch chéo bằng nét mực ở "taxes"; Wob ngoài mép trang vỗ tay hai cái không tiếng', '', [], []),
    N(T(2, "The town didn't"), "The town didn't start until nineteen hundred.", '[lia-theo-vat] Thước thời gian giấy kéo dài từ 1736 sang 1900, camera lia theo; khoảng giữa trống chỉ có tuyết rơi, tuyết đọng thành đống', 'Wob cúi xuống khoảng giữa thước, phủi tuyết tìm xem có gì: dưới tuyết chỉ có một CÁNH CỬA giấy nhỏ đóng băng, không nhãn (MANH MỐI MƠ HỒ); Wob nhún vai, giữ 0,6 s tới cắt ' + f2(b05) + ' s', ['thuoc-thoi-gian'], []),
    ], ['1736', '1900'],
    'Lịch sử 1736 trên trang sổ tông cũ: cắt giấy (Wob kể ở bàn, đứng ngoài mép trang). C04, C05. Người thật (Mangi, viên chức) là người que không mặt, không trang phục Sámi chi tiết, không gag ở người; gag ở Wob phủi tuyết. Cánh cửa đóng băng là manh mối mơ hồ cho "a door that opens in January" (cảnh 6), không nhãn, không biển, không tàu. GHI CHO THỢ (dung-cat-giay): luôn thấy mép bàn và vệt đèn bàn quanh trang; nhãn 1736, 1900 ≥ 45 px')

b06 = G(2, 0.5)
seg('d05', 'diorama', b05, b06, 'hien-tai',
    'Như d03 (bàn, đèn ấm, sổ), cốc trà trên bàn; hai tấm thẻ vẽ nhỏ: một vệt cực quang xanh, một khối băng (không chữ)',
    NHA + '; chùm chìa (có chìa Kiruna) đặt cạnh sổ; cầm hai tấm thẻ vẽ', 'cat', 'giay', [
    N(b05 + 0.05, 'So what was everyone waiting for?', '[cat-cung-ve-hien-tai] Cắt về bàn: Wob gõ ngón tay lên thước thời gian trên sổ, nhìn người xem, nhún vai đúng "for?" (≈ ' + f2(T(2, 'for?')) + ' s)', '', ['so-du-lich'], []),
    N(T(2, 'My first'), 'My first guesses were terrible. Both of them.', 'Wob giơ hai tấm thẻ vẽ (cực quang, khối băng) lên tự hào (hao-hung); đúng "terrible." (≈ ' + f2(T(2, 'terrible.')) + ' s) Wob nhìn lại hai tấm thẻ', 'Wob úp tấm cực quang xuống dưới cốc trà làm đế lót ly, rồi úp tấm khối băng dưới góc sổ đúng "them." (≈ ' + f2(T(2, 'them.')) + ' s); giữ 0,6 s; rồi [lao-vao-hinh-ve] camera lao vào một ô cửa sổ sáng đèn vẽ trên trang sổ, 0,4 s cuối phủ giấy #EFE3C8', ['the-ve', 'coc-tra'], ['drop']),
    ], [],
    'Câu hỏi treo ở bàn: diorama. Lệch y_hinh có chủ ý: y_hinh tả hai bong bóng ý nghĩ vỡ "bụp", trùng gag tập 1 d28 và tập 4 d03 (duyệt 5a tập 5 đã chặn); thay bằng hai tấm thẻ vẽ bị úp làm đế lót ly (gọi lại ở d13: lật tấm cực quang lên lại). GHI CHO THỢ (dung-diorama): hai thẻ không chữ, cực quang và khối băng đọc được ở trung cảnh')

# ================= CHƯƠNG 1 · Woken at a Quarter Past One (cảnh 3–4, tháng 2) =================
b07 = B(3, 'The mine blasts')
seg('d06', 'cat-giay', b06, b07, 'hoi-uc',
    'Trung tâm cũ chiều tối tháng 2, parallax nhiều lớp: tuyết, cột đèn vàng, cửa sổ ấm; tiền cảnh đống tuyết và cột đèn (KHÔNG lan can, không đường ray). '
    'Rồi phòng thuê nhỏ: giường gỗ, lò sưởi gang (có đôi mắt vẽ tay ẩn sẵn), tủ đầu giường có cốc nước và đồng hồ báo thức (chỉ có kim, vạch, KHÔNG số), móc treo cạnh cửa, ghế gỗ, cửa sổ đêm tuyết',
    DONG + '. Vào phòng: treo chùm chìa lên móc cửa, áo khoác vắt lưng ghế (túi phải quay ra), mũ len, khăn đặt trên ghế; nằm trên giường đắp chăn',
    'giay', 'cat', [
    N(b06 + 0.05, 'I arrived on a February evening and rented that room in the old centre.', '[di-bo-parallax] Từ giấy phẳng hiện phố tuyết chiều tối: Wob đi dọc phố, các lớp tuyết, cột đèn trôi lệch nhau; dừng ở một cửa gỗ, MỞ KHOÁ bằng chìa Kiruna TRÊN CHÙM (rút chùm từ quai ba lô) đúng "rented" (≈ ' + f2(T(3, 'rented')) + ' s)', '', ['chum-chia', 'chia-khoa'], ['buoc-tuyet']),
    N(T(3, 'A bed,'), 'A bed, a radiator, a glass of water on the nightstand.', 'Trong phòng: giường, lò sưởi, cốc nước hiện rõ 0–3 khung trước từng chữ ("bed," ≈ ' + f2(T(3, 'bed,')) + ', "radiator," ≈ ' + f2(T(3, 'radiator,')) + ', "glass" ≈ ' + f2(T(3, 'glass')) + ' s); Wob treo chùm chìa lên móc cạnh cửa, vắt áo khoác lên lưng ghế, chui vào giường', '', ['chum-chia'], []),
    N(T(3, 'At a'), 'At a quarter past one in the morning, the glass started to hum.', '[day-vao-cham] Cận tủ đầu giường: kim đồng hồ báo thức chỉ 1 giờ 15 (không số); đúng "hum." (≈ ' + f2(T(3, 'hum.')) + ' s) mặt nước trong cốc gợn vòng tròn đồng tâm', '', ['coc-nuoc', 'dong-ho-bao-thuc'], ['rise']),
    N(T(3, 'Then it'), 'Then it shuffled a little to the left.', '[take-cham] Cốc nước tự nhích sang trái một chút đúng "shuffled" (≈ ' + f2(T(3, 'shuffled')) + ' s); đôi mắt Wob ló khỏi mép chăn, nhìn cốc, dừng', '', ['coc-nuoc'], []),
    N(T(3, 'I lay'), 'I lay very still.', 'Đúng "still." (≈ ' + f2(T(3, 'still.')) + ' s) Wob kéo chăn trùm kín đầu, chăn thành một cục tròn im phăng phắc', 'Wob trùm chăn thành cục tròn bất động', [], []),
    N(T(3, 'So did'), 'So did the radiator.', 'Lò sưởi gang mở đôi mắt vẽ tay to tròn đúng "radiator." (≈ ' + f2(T(3, 'radiator.')) + ' s), các lá tản nhiệt khép sát vào nhau như nín thở', 'Lò sưởi nín thở cùng Wob; giữ 0,6 s tới cắt ' + f2(b07) + ' s', ['lo-suoi'], []),
    ], [],
    'Tới nơi + phòng thuê nhiều lớp: cắt giấy (khuôn phong-quy-mo bắt đầu từ cốc nước). Khoá trang phục mùa đông bắt đầu từ đây. GHI CHO THỢ (dung-cat-giay): thêm áo khoác chần bông xanh lam có túi phải cho rig (chỉ thêm), mũ len `mu: "#4F7A5A", muVanh: "#3A5C43"`, khăn `khan: "#EFE3C8", khanSoc: "#4F7A5A"`; đồng hồ báo thức không số')

b08 = B(3, 'Up on')
seg('d07', 've-tay', b07, b08, 'hoi-uc',
    'Sơ đồ vẽ tay mặt cắt dọc, nét mực sôi: trên cùng là giường của Wob trong phòng thuê (nhỏ), dưới là sàn nhà, các lớp đất đá, sâu nhất là đường hầm dưới chân núi; một rào chắn nhỏ không chữ trước khu nổ; một quạt thông gió lớn',
    DONG + ' (bản vẽ tay, trong phòng: không áo khoác, không mũ); nằm trên giường ở đỉnh sơ đồ', 'cat', 'cat', [
    N(b07, 'The mine blasts every night, between one fifteen and one forty-five.', '[lui-ra-toan-canh] Camera lùi dần từ giường xuyên qua sàn, các lớp đất, tới đường hầm sâu: một chấm sáng nhỏ loé lên trong hầm đúng "blasts" (≈ ' + f2(T(3, 'blasts')) + ' s); thẻ 01:15–01:45 viết mực dần ở "one fifteen" (≈ ' + f2(T(3, 'one fifteen')) + ' s). Wob tí hon ở đỉnh sơ đồ áp tai xuống sàn, những vạch sóng mực bốc lên tới tai', '', [], ['bonk']),
    N(T(3, 'The blasting'), 'The blasting area is cleared first, and the tunnels are aired out for a few hours afterwards.', '[so-do-ve-tay] Hầm trống, không người, rào chắn không chữ đúng "cleared" (≈ ' + f2(T(3, 'cleared')) + ' s); rồi quạt thông gió lớn quay, mũi tên gió nét đứt chạy dọc hầm đúng "aired" (≈ ' + f2(T(3, 'aired')) + ' s)', 'Wob ở đỉnh sơ đồ cầm gối quạt cho mình đúng nhịp cánh quạt dưới hầm; giữ 0,6 s tới cắt ' + f2(b08) + ' s', ['quat-thong-gio', 'goi'], []),
    ], ['01:15–01:45'],
    'Cơ chế dưới đất (nổ, sơ tán, thông gió) là trừu tượng: sơ đồ vẽ tay. C06. Không người trong khu nổ. GHI CHO THỢ (dung-ve-tay): thẻ 01:15–01:45 ≥ 45 px; rào chắn không chữ')

b09 = G(3, 0.5)
seg('d08', 'cat-giay', b08, b09, 'hoi-uc',
    'Như d06: mái nhà tuyết ngoài cửa sổ, rồi phòng thuê đêm (giường, lò sưởi, cốc nước, đồng hồ báo thức không số, chùm chìa trên móc cửa)',
    DONG + ' (trong phòng: áo khoác vắt ghế, không mũ); đêm thứ ba ngồi trên giường cầm cốc trà của mình', 'cat', 'chen', [
    N(b08 + 0.05, 'Up on the surface, the ground sometimes shivers.', '[luot-smootherstep] Camera lướt từ mép mái nhà tuyết vào ô cửa sổ phòng thuê: đúng "shivers." (≈ ' + f2(T(3, 'shivers.')) + ' s) một mảng tuyết nhỏ trượt khỏi mép mái', '', [], []),
    N(T(3, 'My glass'), 'My glass shivered right on schedule.', 'Cận cốc nước rung nhẹ; kim đồng hồ báo thức lại chỉ 1 giờ 15; Wob ló khỏi chăn liếc đồng hồ rồi liếc cốc', '', ['coc-nuoc', 'dong-ho-bao-thuc'], []),
    N(T(3, 'By the'), 'By the third night, I was awake before it started, just to be polite.', '[tien-canh-khung] Đêm thứ ba (tủ đầu giường làm tiền cảnh): Wob ngồi dậy sẵn trên giường, cầm cốc trà của mình bằng hai tay, nhìn cốc nước chờ đợi; ở "polite." Wob chỉnh lại tư thế ngồi cho ngay ngắn', '', ['coc-tra', 'coc-nuoc'], []),
    N(T(3, 'The glass and'), 'The glass and I had an understanding.', '[giu-tinh-bo] Đúng 1 giờ 15 cốc nước bắt đầu rung', 'Wob chạm cốc trà của mình vào cốc nước đang rung như cụng ly đúng "understanding." (≈ ' + f2(T(3, 'understanding.')) + ' s); cốc nước ngân lại một nốt; Wob nhìn người xem; giữ 0,6 s', ['coc-tra', 'coc-nuoc'], ['ting']),
    ], [],
    'Về phòng thuê cho callback cốc nước: cắt giấy. Gag cụng ly với cốc nước (y_hinh "gật đầu chào cốc" đổi thành cụng ly để khỏi gần gag "cúi chào lại" tập 4 d25)')

b10 = B(4, 'According')
seg('d09', 've-tay', b09, b10, 'hoi-uc',
    'Chèn vẽ tay: xe buýt tham quan nhỏ chạy vào cửa hầm trong lòng núi tuyết, đèn hầm lướt qua cửa kính',
    DONG + '; đội MŨ BẢO HỘ trắng có đèn, quá to', 'chen', 'cat', [
    N(b09, 'The next day I took the mine tour, into the mountain next to town.', '[chen-ve-tay] Hình to: Wob ngồi bên cửa kính xe buýt, mũ bảo hộ trắng quá to, xe chạy vào cửa hầm; đèn hầm vụt qua thành vệt', 'Đúng "mountain" (≈ ' + f2(T(4, 'mountain')) + ' s) xe xóc một cái, mũ bảo hộ sụp xuống che kín mắt Wob; Wob KHÔNG đẩy lên, cứ ngồi im trong tối, mặt tỉnh bơ; giữ tới cắt ' + f2(b10) + ' s', ['mu-bao-ho'], ['whoosh', 'bonk']),
    ], [],
    'Chèn 4 s vẽ tay mồi chú ý trước đoạn giải thích dài. Lệch y_hinh có chủ ý: mũ trượt ba lần rút thành một lần (tập này đã có hai leo thang ba lần nằm trong lời: vượt nhà thờ d24, khăn tắm d36)')

b11 = B(4, 'Think of')
t_met = T(4, 'metres')
seg('d10', 'cat-giay', b10, b11, 'hoi-uc',
    'Mặt cắt giấy nhiều lớp của núi mỏ (không nhãn): mạng đường hầm như rễ cây; một giếng thang máy thẳng đứng có lồng thang nhỏ và các vạch tầng; ô kính quan sát ở tầng trên; các khối quặng sẫm ở tầng dưới',
    DONG + '; mũ bảo hộ trắng đã đẩy lên, đèn mũ bật', 'cat', 'chen', [
    N(b10 + 0.05, "According to LKAB, the state-owned company that runs it, this is the world's largest underground iron ore mine.", "[lui-ra-toan-canh] Camera lùi ra toàn cảnh mặt cắt núi: mạng đường hầm như rễ cây ăn sâu; Wob là một chấm nhỏ có đèn mũ ở tầng trên", '', [], []),
    N(T(4, 'Its main'), "Its main haulage level sits about one thousand three hundred and sixty-five metres down. That's nearly four and a half thousand feet.", f'[wob-be-ti] Lồng thang của Wob dừng ở tầng TRÊN (khách tham quan không xuống tầng sâu); Wob ló đầu nhìn xuống giếng; tít dưới đáy thẻ 1,365 m · ~4,480 ft hiện ở "metres" (≈ {f2(t_met)} s, chữ ≥ 45 px, camera đã lia xuống đáy giếng)', f'Wob thả một viên sỏi xuống giếng rồi ghé tai chờ… chờ…; tiếng "tõm" nhỏ chỉ vọng lên đúng "feet." (≈ {f2(T(4, "feet."))} s); Wob gật gù; giữ 0,6 s', ['vien-soi'], ['drop']),
    N(T(4, 'They take'), 'They take the ore out from below, level by level, and let the rock above cave in behind them.', 'Ở tầng dưới, từng dải quặng giấy được rút ra từ đáy, tầng này rồi tầng kia ("level by level," ≈ ' + f2(T(4, 'level by')) + ' s); đá phía trên sụp xuống từng mảng theo sau ("cave in" ≈ ' + f2(T(4, 'cave')) + ' s). Wob đứng sau ô kính quan sát, lùi nửa bước đúng lúc đá sụp', '', [], []),
    ], ['1,365 m · ~4,480 ft'],
    'Mỏ ngầm nhiều lớp, quy mô sâu: cắt giấy (khuôn phong-quy-mo). C07 (mức C, lời đã rào "According to LKAB": KHÔNG nhãn chữ "largest"), C08, C09. Lệch y_hinh: thước dây (đạo cụ gag tập 3) đổi thành giếng thang + viên sỏi; Wob chỉ ở tầng trên cho đúng thực tế tham quan')

b12 = B(4, 'And the ore')
seg('d11', 've-tay', b11, b12, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay (viền mây dreamFrame): đồng hồ cát to, đáy có một ngăn kéo nhỏ; trên lớp cát trên cùng có mấy mái nhà tí hon có ống khói',
    DONG + ' (vẽ tay, mũ bảo hộ cầm tay); đứng cạnh đồng hồ cát', 'chen', 'cat', [
    N(b11, 'Think of an hourglass.', '[bong-bong-tuong-tuong] Hình to: đồng hồ cát hiện trong viền mây; Wob đặt mũ bảo hộ xuống, đứng cạnh', '', [], ['whoosh']),
    N(T(4, 'Pull sand'), 'Pull sand from the bottom, and the top of the pile slowly sinks.', 'Wob kéo ngăn kéo nhỏ ở đáy đồng hồ cát đúng "Pull" (≈ ' + f2(T(4, 'Pull')) + ' s), cát chảy ra; mặt cát trên cùng lõm dần xuống đúng "sinks." (≈ ' + f2(T(4, 'sinks.')) + ' s)', '', ['dong-ho-cat'], []),
    N(T(4, "Kiruna's"), "Kiruna's old centre is the top of the pile.", '[day-vao-cham] Camera đẩy vào lớp cát trên cùng: mấy mái nhà tí hon đứng trên đó', 'Một mái nhà tí hon nghiêng dần theo cát lún; ống khói của nó thò hai tay tí hon ra bám chặt mép mái; giữ 0,6 s tới cắt ' + f2(b12) + ' s', ['dong-ho-cat'], []),
    ], [],
    'So sánh đời thường (đồng hồ cát) là giả định: bong bóng tưởng tượng vẽ tay. C09')

b13 = G(4, 0.5)
seg('d12', 'cat-giay', b12, b13, 'hoi-uc',
    'Mặt cắt giấy như d10, kéo rộng sang phía đông: thân quặng sẫm chạy chéo xuống nằm dưới dãy mái nhà trung tâm cũ; chân núi có một ĐỐNG QUẶNG nhỏ nằm ở chỗ cụt, phủ tuyết (MANH MỐI MƠ HỒ: không đường ray, không biển, không tàu); '
    'phòng trưng bày có máy ghi địa chấn (bút vẽ trên băng giấy); rồi phòng thuê đêm (như d06)',
    DONG + '; ở máy địa chấn đội mũ bảo hộ; về phòng: MẶC áo khoác (vừa về), không mũ; tháo chìa khỏi chùm, bỏ vào TÚI PHẢI áo khoác; chùm chìa nhà treo lại móc cửa', 'cat', 'giay', [
    N(b12 + 0.05, 'And the ore body keeps running east, under the town.', '[luot-smootherstep] Camera lướt sang phía đông theo thân quặng sẫm tới dưới dãy mái nhà trung tâm cũ; một mũi tên nét đứt không chữ chỉ hướng đông đúng "east," (≈ ' + f2(T(4, 'east,')) + ' s). Ở chân núi, đống quặng nhỏ phủ tuyết nằm im ở chỗ cụt, một hòn quặng ngoảnh nhìn về phía tây', '', [], []),
    N(T(4, 'In May'), 'In May twenty twenty, the mine set off the biggest mining-induced earthquake ever recorded in Sweden.', 'Phòng trưng bày: Wob (mũ bảo hộ) giữ băng giấy của máy ghi địa chấn cho thẳng; bút vẽ nét phẳng rồi giật một gai rất to đúng "earthquake" (≈ ' + f2(T(4, 'earthquake')) + ' s); Wob giật mình lùi lại', '', ['may-dia-chan'], []),
    N(T(4, 'Magnitude'), 'Magnitude four point one. Nobody was hurt.', 'Thẻ M 4.1 · May 2020 bật lên cạnh gai địa chấn ở "Magnitude" (≈ ' + f2(T(4, 'Magnitude')) + ' s); đúng "Nobody" (≈ ' + f2(T(4, 'Nobody')) + ' s) Wob thở ra, vuốt lại băng giấy', '', ['may-dia-chan'], []),
    N(T(4, 'That night'), 'That night I slid the key off my key ring and put it in my pocket.', '[day-vao-cham] MÔ-TÍP CHÌA 2 (cận, rõ): phòng thuê đêm; Wob lấy chùm chìa trên móc cửa, tháo chìa Kiruna (than, thẻ gỗ dây đỏ) khỏi vòng đúng "slid" (≈ ' + f2(T(4, 'slid')) + ' s), nhìn nó một nhịp, nhét vào TÚI PHẢI áo khoác đúng "pocket." (≈ ' + f2(T(4, 'pocket.')) + ' s); treo chùm chìa nhà lại móc', '', ['chum-chia', 'chia-khoa'], []),
    N(T(4, 'Pockets'), 'Pockets are for maybes.', 'Túi áo phồng lên một cục, thẻ gỗ dây đỏ thò ra mép túi', 'Wob vỗ nhẹ hai cái lên túi như vỗ một con mèo đang ngủ; giữ ≥ 0,8 s; 0,4 s cuối phủ dần thành giấy #EFE3C8', ['chia-khoa'], []),
    ], ['M 4.1 · May 2020'],
    'Thân quặng + động đất + đổi ý lần 1: cắt giấy. C10, C11. Đống quặng ở chỗ cụt là manh mối mơ hồ thứ hai (quặng nằm chờ, không có lối ra), KHÔNG đường ray, cảng, tàu. Lệch y_hinh: "cốc nước nảy lên" bỏ (Wob chưa ở Kiruna năm 2020), thay bằng Wob giữ băng giấy máy địa chấn ở phòng trưng bày. Mô-típ chìa 2: tháo bỏ túi. GHI CHO THỢ (dung-cat-giay): nhãn M 4.1 · May 2020 ≥ 45 px; túi phải áo khoác nhìn rõ (thẻ gỗ thò ra); không vẽ đường ray nào')

# ================= CHƯƠNG 2 · Why Wait Until 1900? (cảnh 5–7, tháng 2) =================
b14 = B(5, 'My second')
seg('d13', 've-tay', b13, b14, 'hoi-uc',
    'Vẽ tay, màu nước lem: tấm thẻ cực quang (cùng hình thẻ ở d05) phóng to trên trang sổ phác; rồi cánh đồng tuyết đêm, cực quang xanh uốn lượn; rồi sơ đồ hàng va li du khách và thước thời gian',
    DONG + '; cầm bình trà giữ nhiệt (bốc hơi); ở sơ đồ: Wob vẽ tay ở mép trang cầm bút', 'giay', 'cat', [
    N(START[5], 'So, back to all that waiting. My first guess was the sky.', '[so-do-ve-tay] Từ giấy phẳng nét mực vẽ dần: tấm thẻ cực quang (thẻ đã làm đế lót ly ở d05) được lật ngửa lên lại; mũi tên chỉ từ vệt cực quang xuống mái nhà thị trấn, dấu ? ; Wob ở mép trang gõ bút vào dấu ? đúng "sky." (≈ ' + f2(T(5, 'sky.')) + ' s)', '', ['the-ve'], ['lat-giay']),
    N(T(5, 'I stood'), 'I stood outside one night with a flask of tea, waiting for proof.', '[day-vao-cham] Cánh đồng tuyết đêm: Wob ngửa mặt nhìn trời, ôm bình trà bốc hơi', '', ['binh-tra'], ['hoi-nuoc']),
    N(T(5, 'The northern'), 'The northern lights came out, green and slow.', 'Cực quang xanh uốn lượn chậm từ "northern" (≈ ' + f2(T(5, 'northern')) + ' s); ánh xanh phủ lên mặt Wob; Wob há miệng nhìn', '', [], []),
    N(T(5, 'My nose'), 'My nose went numb. Lovely. And wrong.', '[take-cham] Một bông tuyết đậu đúng giữa hai mắt Wob (chỗ lẽ ra là mũi) và không tan', 'Wob lác mắt nhìn bông tuyết; đúng "Lovely." (≈ ' + f2(T(5, 'Lovely.')) + ' s) thở ra một hơi làm bông tuyết bay đi; đúng "wrong." (≈ ' + f2(T(5, 'wrong.')) + ' s) ánh xanh trên mặt Wob tắt phụt; giữ 0,6 s', [], []),
    N(T(5, 'Tourism'), 'Tourism is big here now.', '[so-do-ve-tay] Sơ đồ: hàng va li du khách lăn bánh nối đuôi nhau vào trang', '', [], []),
    N(T(5, 'In twenty'), 'In twenty twenty-four, Kiruna had a record year, with more than six hundred thousand commercial guest nights.', 'Thẻ 607,818 (record) và 2024 bật lên ở "record" (≈ ' + f2(T(5, 'record')) + ' s); hàng va li dài thêm; Wob ở mép trang giơ hai tay chặn bớt va li', '', [], ['pop']),
    N(T(5, 'But the'), 'But the town came first, and the tourists followed.', 'Thước thời gian: ngôi nhà nhỏ ở mốc 1900 đầu trái; hàng va li chỉ xuất hiện ở tận đầu phải thước', 'Wob vẽ một dấu X to lên tấm thẻ cực quang đúng "followed." (≈ ' + f2(T(5, 'followed.')) + ' s); giữ 0,6 s tới cắt ' + f2(b14) + ' s', ['the-ve'], []),
    ], ['?', '607,818 (record)', '2024', '1900'],
    'Mở chương bằng nét vẽ + đoán sai lần 1 (khuôn doan-sai-roi-lat): vẽ tay; cực quang màu nước lem hợp vẽ tay. C12. KHÔNG nhắc tàu, đường sắt, cảng. GHI CHO THỢ (dung-ve-tay): thẻ 607,818 (record), 2024, 1900 ≥ 45 px; bông tuyết đậu giữa hai mắt (Wob không có mũi riêng)')

b15 = G(5, 0.5)
seg('d14', 'cat-giay', b14, b15, 'hoi-uc',
    'Đường tuyết vào làng, cột biển gỗ chỉ đường; một toà nhà bằng khối băng (dạng chung, không biểu tượng thương hiệu). Bên trong: tường băng trong suốt, giường băng phủ tấm lông nhạt (dạng chung), một tác phẩm điêu khắc băng trừu tượng trong khung; dải thước thời gian giấy dán dọc tường băng',
    DONG + '; cầm tấm thẻ khối băng (từ d05); ngồi trên giường băng mặc nguyên áo khoác', 'cat', 'cat', [
    N(b14 + 0.05, 'My second guess was the hotel made of ice, in the village of Jukkasjärvi, about seventeen kilometres away.', '[di-bo-parallax] Wob đi trên đường tuyết, cầm tấm thẻ khối băng; cột biển gỗ ghi Jukkasjärvi (≥ 45 px) với tem ~17 km · ~11 mi lướt qua tiền cảnh ở "Jukkasjärvi," (≈ ' + f2(T(5, 'Jukkasjärvi,')) + ' s); toà nhà khối băng hiện dần cuối đường', '', ['the-ve'], ['buoc-tuyet']),
    N(T(5, "That's roughly"), "That's roughly eleven miles.", 'Wob đứng trước cửa toà nhà băng, ướm tấm thẻ khối băng lên so: giống hệt', '', ['the-ve'], []),
    N(T(5, 'I sat'), 'I sat on an ice bed in my coat to think it over.', '[tien-canh-khung] Trong phòng băng (khung cửa băng làm tiền cảnh): Wob mặc nguyên áo khoác ngồi bó gối trên giường băng, nhìn trần', '', [], ['tach-bang']),
    N(T(5, 'Icehotel'), "Icehotel began in nineteen eighty-nine as an art gallery made of ice and snow. That's eighty-nine years after the town.", 'Tác phẩm điêu khắc băng trong khung sáng lên ở "art gallery" (≈ ' + f2(T(5, 'art')) + ' s); dải thước thời gian trên tường: 1900 tận đầu trái, khối băng nhỏ 1989 tận đầu phải; Wob đưa mắt từ đầu này sang đầu kia', '', [], []),
    N(T(5, 'Wrong again.'), 'Wrong again.', 'Wob dựng tấm thẻ khối băng vào tường băng; nó trượt chầm chậm xuống, nằm úp dưới sàn', '', ['the-ve'], []),
    N(T(5, 'My bottom'), 'My bottom agreed.', '[take-cham] Wob từ từ đứng thẳng dậy', 'Trên giường băng còn in lại một vết tròn đóng sương đúng cỡ Wob; Wob xoa mông, nhìn vết in, nhìn người xem; giữ 0,6 s', [], []),
    ], ['Jukkasjärvi', '~17 km · ~11 mi', '1900', '1989'],
    'Đi tới khách sạn băng, phòng băng nhiều lớp trong suốt: cắt giấy. C13, C14. Không biểu tượng thương hiệu Icehotel')

b16 = B(6, 'First,')
seg('d15', 'cat-giay', b15, b16, 'hoi-uc',
    'Đường ngang có rào chắn sọc đỏ trắng giữa cánh đồng tuyết; đoàn tàu quặng hai đầu máy điện kéo các toa sẫm (đường ray, tàu quặng ĐƯỢC vẽ từ đây: cảnh 6 là cảnh lời giải); bảy sân bóng giấy phủ tuyết xếp song song cho cảnh lùi xa',
    DONG + '; đứng cạnh rào chắn', 'cat', 'cat', [
    N(b15 + 0.05, 'The real answer rolled past me at a level crossing on the way back.', '[tien-canh-khung] Rào chắn sọc đỏ trắng hạ xuống (tiền cảnh), Wob đứng chờ phía sau, hai tay nhét túi áo; đầu máy điện đầu tiên ló vào từ trái đúng "rolled" (≈ ' + f2(T(6, 'rolled')) + ' s)', '', [], ['may-no']),
    N(T(6, 'An ore'), 'An ore train.', 'Đầu máy và các toa quặng sẫm lướt qua từ trái sang phải; quả bông mũ len của Wob bị gió tàu thổi lật ngang', '', [], ['whoosh']),
    N(T(6, 'Up to'), 'Up to sixty-eight wagons, about seven hundred and fifty metres long.', '[lui-ra-toan-canh] Camera rút cao: đoàn tàu vắt ngang hết khung; thẻ 68 wagons · ~750 m ở "sixty-eight" (≈ ' + f2(T(6, 'sixty-eight')) + ' s)', '', [], []),
    N(T(6, 'Roughly'), 'Roughly seven football pitches of iron.', 'Bảy sân bóng giấy phủ tuyết xếp hàng song song dưới đoàn tàu, hiện đúng "seven" (≈ ' + f2(T(6, 'seven football')) + ' s), dài bằng đoàn tàu', '', [], []),
    N(T(6, 'I started'), 'I started counting wagons and lost count.', '[take-cham] Camera về cỡ trung: Wob chỉ ngón tay đếm từng toa, đầu quay theo tàu', 'Đầu Wob quay theo tàu, kéo cả quả địa cầu xoay tròn một vòng (các lục địa chạy vòng) đúng "lost count." (≈ ' + f2(T(6, 'lost')) + ' s); Wob lảo đảo', [], []),
    N(T(6, 'Twice.'), 'Twice.', 'Wob chỉ tay đếm lại từ đầu, xoay vòng thứ hai nhanh hơn, ngồi phịch xuống tuyết, mắt xoáy (dizzy); giữ 0,6 s tới cắt ' + f2(b16) + ' s', 'Lần hai Wob ngồi phịch xuống tuyết', [], ['bonk']),
    ], ['68 wagons · ~750 m'],
    'LỜI GIẢI bắt đầu (dap_an_chinh cảnh 6): cảnh đường ngang nhiều lớp, cảnh lùi xa cho quy mô: cắt giấy. C15. Gag đếm toa làm KHÁC tập 3 d05 (tập 3: đếm hết tay sang chân sang bánh xe; ở đây cả quả địa cầu xoay theo tàu). Rào chắn hạ bình thường, KHÔNG gag chạm mũi (tập 3 d01)')

b17 = B(6, 'That left')
seg('d16', 've-tay', b16, b17, 'hoi-uc',
    'Sơ đồ vẽ tay: một hòn quặng to có lốm đốm chấm (phốt-pho); lò luyện cũ bằng gạch có ống khói; một thanh sắt; lò chuyển hình quả lê kiểu mới nghiêng rót',
    DONG + ' (vẽ tay); cầm cây búa nhỏ, rồi một chiếc huy hiệu nơ', 'cat', 'cat', [
    N(b16, 'First, the ore had a flaw.', '[so-do-ve-tay] Hòn quặng to hiện ở giữa trang; Wob gõ nhẹ vào nó', '', [], []),
    N(T(6, 'It is rich'), 'It is rich in phosphorus, and in older furnaces that made the iron brittle.', 'Các chấm lốm đốm trên hòn quặng sáng lên ở "phosphorus," (≈ ' + f2(T(6, 'phosphorus,')) + ' s); lò gạch cũ nhả ra một thanh sắt', 'Wob gõ búa nhỏ vào thanh sắt đúng "brittle." (≈ ' + f2(T(6, 'brittle.')) + ' s): thanh sắt vỡ vụn thành từng mảnh, Wob chỉ còn cầm cán búa và một mẩu sắt; giữ 0,6 s', ['bua-nho'], ['bonk']),
    N(T(6, 'In the'), 'In the eighteen-seventies, a new method, the Thomas process, turned that flaw into a selling point.', 'Nhãn 1870s viết mực ở "eighteen-seventies," (≈ ' + f2(T(6, 'eighteen-seventies,')) + ' s); lò chuyển hình quả lê nghiêng rót; hòn quặng lốm đốm đi qua lò ra một thanh sắt tốt', 'Wob cài một chiếc huy hiệu nơ lên hòn quặng đúng "selling point." (≈ ' + f2(T(6, 'selling')) + ' s); hòn quặng phồng ngực tự hào; giữ 0,6 s tới cắt ' + f2(b17) + ' s', ['huy-hieu-no'], ['ting']),
    ], ['1870s'],
    'Cơ chế luyện kim trừu tượng: sơ đồ vẽ tay. C57')

b18 = B(6, 'A port')
t_lul = T(6, 'Luleå,')
seg('d17', 'cat-giay', b17, b18, 'hoi-uc',
    'Wob ngồi trên tuyết cạnh đường ngang, mở sổ trên đầu gối; cận trang sổ hành trình (journalPage) dán bản đồ code map-kiruna-rail (LẦN ĐẦU XUẤT HIỆN, cảnh 6): NHÃN Narvik VÀ đường đỏ sang Narvik CHƯA hiện ở đoạn này (che bằng mảnh giấy dán hoặc chưa vẽ); đường mảnh xám Kiruna→Luleå; vịnh Bothnia; một hòn quặng giấy nhỏ có hai chấm mắt',
    DONG + '; ngồi trên tuyết, sổ trên đầu gối; tay đẩy hòn quặng giấy', 'cat', 'chen', [
    N(b17 + 0.05, 'That left the bigger problem.', 'Wob ngồi xuống tuyết cạnh đường ngang, mở sổ; một hòn quặng giấy nhỏ nhảy ra khỏi hình núi trên trang', '', ['so-du-lich', 'hon-quang-giay'], ['lat-giay']),
    N(T(6, 'Iron is'), 'Iron is no use inside a mountain. It has to reach the sea.', f'[trang-so-ban-do] Cận trang (trang ≥ 70% khung): map-kiruna-rail hiện ra lần đầu ở "It has" (≈ {f2(T(6, "It has"))} s); hòn quặng giấy đứng ở chấm Kiruna nhảy qua nhảy lại nhìn quanh tìm biển', '', ['map-kiruna-rail', 'hon-quang-giay'], []),
    N(T(6, "Sweden's"), "Sweden's own coast is to the east, at Luleå, on the Gulf of Bothnia.", f'Wob đẩy hòn quặng đi theo đường mảnh xám về phía đông; nhãn Luleå hiện ở "Luleå," (≈ {f2(t_lul)} s), nhãn Gulf of Bothnia ở "Bothnia." (≈ {f2(T(6, "Bothnia."))} s)', '', ['map-kiruna-rail', 'hon-quang-giay'], []),
    N(T(6, 'That sea'), 'That sea freezes over every winter.', f'Vịnh Bothnia phủ hoạ tiết băng trắng dần; cảng Luleå thành một khối băng có con tàu giấy kẹt giữa; nhãn đổi thành Luleå · freezes in winter ở "freezes" (≈ {f2(T(6, "freezes"))} s)', 'Hòn quặng giấy trượt trên mặt băng mới, xoay vòng vòng, trôi qua cả cảng rồi dừng lại khi đụng con tàu kẹt băng; Wob nhăn mặt; giữ 0,6 s', ['map-kiruna-rail', 'hon-quang-giay'], ['tach-bang']),
    ], ['Kiruna', 'Luleå', 'Gulf of Bothnia', 'Luleå · freezes in winter'],
    'Bản đồ trang sổ (trang-so-ban-do): cắt giấy với mapSticker. C16. map-kiruna-rail chỉ từ cảnh 6. GHI CHO THỢ (dung-cat-giay): nhãn ≥ 45 px chỉ khi cận trang; nhãn Narvik và đường đỏ Kiruna→Narvik CHƯA hiện ở đoạn này (bản SVG có nhãn sẵn thì che lại tới d19, chữ "Narvik" đầu tiên ở ' + f2(T(6, 'Narvik')) + ' s)')

b19 = B(6, 'So they')
seg('d18', 've-tay', b18, b19, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: một cửa hàng nhỏ, cửa trước đóng băng cứng, cột băng rủ từ mái; mấy hòn quặng tí hon xách giỏ đứng xếp hàng ngoài cửa',
    DONG + ' (vẽ tay)', 'chen', 'cat', [
    N(b18, 'A port like that is a shop whose front door freezes shut every winter.', '[chen-ve-tay] Hình to: cửa hàng có cửa trước đóng băng; hàng hòn quặng tí hon xách giỏ đứng chờ ngoài cửa, tuyết đọng trên đầu chúng; Wob bước tới nắm tay nắm cửa kéo', 'Đúng "shut" (≈ ' + f2(T(6, 'shut')) + ' s) tay nắm cửa gãy rời trong tay Wob, còn dính một cột băng; cửa vẫn đóng; Wob cầm tay nắm nhìn người xem; giữ 0,6 s tới cắt ' + f2(b19) + ' s', [], ['whoosh', 'tach-bang']),
    ], [],
    'So sánh "cửa hàng đóng băng cửa" là giả định: chèn vẽ tay 4 s. Lệch y_hinh có chủ ý: y_hinh có biển OPEN đóng băng, trùng đạo cụ biển OPEN tập 5 d45; đổi thành tay nắm gãy')

b20 = G(6, 0.5)
t_nar = T(6, 'Narvik')
seg('d19', 'cat-giay', b19, b20, 'hoi-uc',
    'Cận trang sổ map-kiruna-rail như d17; dãy núi giấy giữa Kiruna và bờ biển Na Uy; cảng Narvik giấy: nước xanh #3F6A70, mũi tên ấm màu cam uốn vào vịnh (Gulf Stream), tàu biển giấy cập bến; một lớp tông cũ: dải ruy băng cắt ngang đường ray, một chiếc vương miện giấy lơ lửng trên chiếc kéo (KHÔNG người, KHÔNG mặt); tàu phá băng giấy nhỏ phía Luleå. Cuối đoạn: lại đường ngang (như d15)',
    DONG + '; cầm sổ, ngón tay lần theo đường; cuối đoạn đứng ở rào chắn đã nâng, chìa khoá thò thẻ gỗ khỏi túi phải', 'cat', 'cat', [
    N(b19 + 0.05, 'So they ran a railway the other way, over the mountains, to Narvik on the Norwegian coast.', f'[trang-so-ban-do] Đường ray nét đứt màu đất nung #E0703A vẽ dần từ Kiruna về phía TÂY từ "railway" (≈ {f2(T(6, "railway"))} s), leo qua dãy núi giấy, xuống tới bờ biển; ngón tay Wob lần theo; nhãn Narvik hiện đúng "Narvik" (≈ {f2(t_nar)} s)', '', ['map-kiruna-rail'], []),
    N(T(6, 'Warm'), "Warm water from the Gulf Stream keeps Narvik's harbour ice-free all year.", f'Cảng Narvik: mũi tên ấm màu cam uốn vào vịnh ở "Gulf Stream" (≈ {f2(T(6, "Gulf Stream"))} s), nước xanh không băng; nhãn đổi thành Narvik · ice-free ở "ice-free" (≈ {f2(T(6, "ice-free"))} s); hòn quặng giấy (từ d17) nhảy dọc đường đỏ tới Narvik, leo lên tàu biển giấy, vẫy Wob', 'Hòn quặng giấy cuối cùng cũng lên được tàu, vẫy tay', ['map-kiruna-rail', 'hon-quang-giay'], ['song']),
    N(T(6, 'The line'), 'The line reached Kiruna around nineteen hundred and was joined up to Narvik in nineteen oh two.', 'Nhãn 1900 ghim vào đầu Kiruna, nhãn 1902 ghim vào đầu Narvik đúng "two." (≈ ' + f2(T(6, 'two.')) + ' s)', '', ['map-kiruna-rail'], []),
    N(T(6, 'The king'), 'The king opened it officially in nineteen oh three.', '[lao-vao-can-canh] Lớp tông cũ trên trang: dải ruy băng ngang đường ray; vương miện giấy lơ lửng trên chiếc kéo (không người); kéo cắt ruy băng đúng "three." (≈ ' + f2(T(6, 'three.')) + ' s); nhãn 1903', '', [], []),
    N(T(6, 'Today,'), 'Today, about twelve loaded trains a day still run from Kiruna to Narvik.', 'Thẻ ~12 a day ở "twelve" (≈ ' + f2(T(6, 'twelve')) + ' s); những chấm tàu nhỏ chạy nối nhau dọc đường đỏ Kiruna → Narvik', '', ['map-kiruna-rail'], []),
    N(T(6, 'Luleå ships'), 'Luleå ships ore too, with icebreakers helping in winter.', 'Phía đông: tàu phá băng giấy nhỏ rẽ băng mở lối vào Luleå đúng "icebreakers" (≈ ' + f2(T(6, 'icebreakers')) + ' s); con tàu kẹt ở d17 được giải thoát, nhích đi', '', ['map-kiruna-rail'], ['tach-bang']),
    N(T(6, 'The iron had'), 'The iron had been waiting for a door that opens in January.', '[day-vao-cham] Về đường ngang: rào chắn đã nâng, tàu vẫn đang chạy qua phía sau; Wob đứng nhìn, thẻ gỗ dây đỏ thò khỏi túi phải áo khoác; Wob nhét nó vào sâu hơn; giữ hình tới cắt ' + f2(b20) + ' s', '', ['chia-khoa'], []),
    ], ['Kiruna', 'Narvik', 'Narvik · ice-free', 'Luleå · freezes in winter', '1900', '1902', '1903', '~12 a day'],
    'Lời giải chính trên bản đồ trang sổ + lớp tông cũ: cắt giấy. C17–C19. Vua khánh thành 1903 chỉ là vương miện giấy (không vẽ người thật). GHI CHO THỢ (dung-cat-giay): nhãn ≥ 45 px khi cận trang; Narvik chỉ hiện từ ' + f2(t_nar) + ' s')

b21 = B(7, 'At the end')
seg('d20', 'cat-giay', b20, b21, 'hoi-uc',
    'Wob ngồi ghế gấp nhỏ cạnh đường ngang đọc sổ; camera vào trang lịch sử tông giấy cũ sepia (Wob đứng NGOÀI mép trang): đồng tuyết trống, tờ quy hoạch, con dấu sáp đỏ hình vương miện; một ' + NGUOI + ' đội mũ phớt cầm búa địa chất và cuộn giấy quy hoạch (không mặt); phố uốn theo sườn đồi; nhà gỗ nhiều màu mọc lên',
    DONG + '; đứng ngoài mép trang sepia; khăn len kem sọc xanh', 'cat', 'cat', [
    N(b20 + 0.05, 'Then the town could happen.', 'Trên trang sepia: đồng tuyết trống; ngôi nhà gỗ đầu tiên bật dựng đúng "happen." (≈ ' + f2(T(7, 'happen.')) + ' s); Wob ngoài mép trang nghiêng người nhìn', '', [], ['pop']),
    N(T(7, 'Kiruna counts'), 'Kiruna counts nineteen hundred as its birth year, when the king approved its town plan.', 'Tờ quy hoạch trải trên bàn; con dấu sáp đỏ có hình vương miện đóng xuống đúng "approved" (≈ ' + f2(T(7, 'approved')) + ' s); nhãn 1900', '', [], []),
    N(T(7, 'The mining'), "The mining company's first managing director, a geologist called Hjalmar Lundbohm, wanted a model town.", 'Người que đội mũ phớt cầm búa địa chất và cuộn giấy quy hoạch hiện ở "geologist" (≈ ' + f2(T(7, 'geologist')) + ' s), mở cuộn giấy trên đồng tuyết (không mặt chân dung)', '', [], []),
    N(T(7, 'He brought'), 'He brought in a leading planner to fit the streets to the climate.', 'Các phố uốn cong theo sườn đồi; một mũi tên gió lạnh giấy lao vào phố ở "climate." (≈ ' + f2(T(7, 'climate.')) + ' s)', 'Mũi tên gió đập vào góc nhà, cong gập lại rồi lủi sang chỗ khác; ngoài mép trang, đuôi khăn của Wob đang bay phần phật bỗng rủ xuống im; Wob sờ khăn', [], ['brr']),
    N(T(7, 'By nineteen'), 'By nineteen ten, about seven thousand five hundred people lived here.', 'Dãy nhà gỗ nhiều màu mọc lên nhanh, người que đi lại; nhãn 1910', 'Wob lén đặt một ngôi nhà giấy tí hon của mình vào một khe trống trong phố: vừa khít; Wob phủi tay', ['nha-giay'], []),
    ], ['1900', '1910'],
    'Lịch sử lập thị trấn tông cũ: cắt giấy. C20–C22. Lundbohm là người que không mặt; nhà vua chỉ là con dấu vương miện. Wob đứng ngoài mép trang, gag ở mũi tên gió và ngôi nhà của Wob, không ở người')

b22 = B(7, 'I stood')
seg('d21', 've-tay', b21, b22, 'hoi-uc',
    'Sơ đồ vẽ tay: đường viền vùng kommun Kiruna (dạng giản lược) với đám chấm người; tấm hình bang New Jersey cắt giấy; rồi bản đồ châu Âu giản lược KHÔNG biên giới, nhiều mũi tên nhỏ toả ra từ Kiruna',
    DONG + ' (vẽ tay); cầm hòn quặng', 'cat', 'cat', [
    N(b21, 'At the end of twenty twenty-five, the municipality had about twenty-two thousand four hundred.', '[so-do-ve-tay] Đường viền kommun vẽ dần, đám chấm người lấp vào; thẻ ~22,400 people ở "twenty-two" (≈ ' + f2(T(7, 'twenty-two')) + ' s)', '', [], []),
    N(T(7, "They're"), "They're spread over an area about the size of New Jersey.", 'Wob đặt tấm New Jersey cắt giấy chồng lên kommun đúng "New Jersey." (≈ ' + f2(T(7, 'New')) + ' s): gần khít, mép kommun thò ra một chút', 'Wob nhét mép thò ra xuống dưới; mép bật ra lại; Wob buông tay, giữ 0,6 s', ['hinh-new-jersey'], []),
    N(T(7, 'And the'), 'And the mine still matters far beyond the town.', 'Wob nhặt một hòn quặng, nhìn về phía nam', '', ['hon-quang'], []),
    N(T(7, 'LKAB says'), 'LKAB says it produces more than eighty percent of the iron ore mined in the European Union.', '[lui-ra-toan-canh] Lùi ra bản đồ châu Âu giản lược (không biên giới); thẻ >80% ở "eighty percent" (≈ ' + f2(T(7, 'eighty')) + ' s); nhiều mũi tên nhỏ toả ra từ Kiruna', 'Wob trao từng hòn quặng cho từng mũi tên như người đưa thư, nhanh dần, mũi tên nào cũng chìa tay nhận; giữ 0,6 s tới cắt ' + f2(b22) + ' s', ['hon-quang'], ['pop']),
    ], ['~22,400 people', 'New Jersey', '>80%'],
    'Số liệu so sánh trừu tượng (diện tích, tỉ lệ EU): sơ đồ vẽ tay. C23, C24 (C24 lời đã có "LKAB says", không nhãn chữ khác). Bản đồ châu Âu không biên giới, xa vùng nhạy cảm')

b23 = G(7, 0.5)
seg('d22', 'cat-giay', b22, b23, 'hoi-uc',
    'Lại đường ngang như d15/d19: rào chắn nâng, tàu quặng vẫn đang chạy qua; ghế gấp nhỏ của Wob (từ d20)',
    DONG + '; ngồi ghế gấp, rót trà từ bình giữ nhiệt; thẻ gỗ dây đỏ thò khỏi túi phải', 'cat', 'giay', [
    N(b22 + 0.05, 'I stood by the tracks with the key in my pocket.', '[tien-canh-khung] Cột rào chắn làm tiền cảnh; Wob đã ngồi ghế gấp cạnh đường ray, thẻ gỗ dây đỏ thò khỏi túi phải; rót trà từ bình', 'Gọi lại d15: Wob đã ngồi ghế gấp rót trà, tàu vẫn chưa hết', ['ghe-gap', 'binh-tra', 'chia-khoa'], ['hoi-nuoc']),
    N(T(7, 'The train'), 'The train was still going past.', 'Wob nâng cốc trà về phía đoàn tàu như mời; tàu vẫn chạy qua; giữ ≥ 0,8 s rồi 0,4 s cuối phủ dần thành giấy #EFE3C8', '', ['binh-tra'], []),
    ], [],
    'Callback đường ngang (đóng chương lời giải): cắt giấy')

# ================= CHƯƠNG 3 · Overtaking a Church (cảnh 8–9, tháng 8) =================
b24 = B(8, 'It rode')
seg('d23', 'cat-giay', b23, b24, 'hoi-uc',
    'Mùa hè tháng 8: cỏ xanh, trời xanh nhạt. ' + NHA_THO + ' đứng trên một rơ-moóc dài rất nhiều trục bánh. Lớp tông cũ: giàn giáo gỗ quanh nhà thờ. Rồi trang sổ (journalPage + mapSticker map-kiruna-centre: ghim Old centre, New centre (approx.), mũi tên nét đứt)',
    HE + '; chùm chìa nhà móc ở quai trái ba lô; chìa Kiruna trong túi phải gi-lê (từ cảnh 4)', 'giay', 'cat', [
    N(START[8], 'I went back that August, because a church was going for a walk.', '[wob-be-ti] Từ giấy phẳng hiện nhà thờ gỗ đỏ to trên rơ-moóc dài; Wob (đồ hè, kính râm) đứng cạnh bánh xe, bé tí', 'Đúng "walk." (≈ ' + f2(T(8, 'walk.')) + ' s) Wob gõ cửa hông nhà thờ hai cái rất lịch sự như hỏi "đi được chưa", đứng chờ', ['nha-tho'], ['lat-giay']),
    N(T(8, 'Kiruna Church'), 'Kiruna Church is big, red and wooden, finished in nineteen twelve, and much loved.', '[lia-theo-vat] Camera lia ngược lên mái dốc, tháp chuông riêng; ở "nineteen twelve," (≈ ' + f2(T(8, 'nineteen twelve,')) + ' s) lớp tông cũ hiện giàn giáo gỗ quanh nhà thờ rồi gập xuống, nhãn 1912; ở "much loved." mấy người que đứng xa phía bên kia vẫy cờ giấy nhỏ', '', ['nha-tho'], []),
    N(T(8, 'The mine'), 'The mine needed its ground.', 'Mặt đất dưới chỗ cũ của nhà thờ hiện một vết nứt nét đứt chạy về phía núi mỏ; Wob nhìn xuống vết nứt dưới chân, nhích chân ra', '', [], []),
    N(T(8, 'So on'), 'So on the nineteenth and twentieth of August, twenty twenty-five, it rolled about five kilometres to the new centre, in one piece.', '[trang-so-ban-do] Cận trang sổ map-kiruna-centre: chấm nhà thờ đỏ bò dọc nét đứt từ Old centre sang New centre (approx.); thẻ 19–20 Aug 2025 · ~5 km ở "five kilometres" (≈ ' + f2(T(8, 'five kilometres')) + ' s); hai ngón tay Wob "đi bộ" cạnh chấm nhà thờ trên trang', '', ['map-kiruna-centre'], []),
    ], ['1912', 'Old centre', 'New centre (approx.)', '19–20 Aug 2025 · ~5 km'],
    'Mở chương 3 (khuôn thu-hong-hieu): cảnh đến nơi có quy mô (Wob bé tí cạnh nhà thờ) + bản đồ trang sổ: cắt giấy (giữ diorama ≤ 20%). C25, C26. Đổi mùa rõ bằng hình: cỏ xanh, đồ hè. GHI CHO THỢ (dung-cat-giay): nhà thờ cách điệu theo khoá NHA_THO, dùng lại ở d24–d27; nhãn ≥ 45 px khi cận trang')

b25 = G(8, 0.5)
t_ov1 = T(8, 'I overtook it almost')
seg('d24', 've-tay', b24, b25, 'hoi-uc',
    'Vẽ tay: gầm rơ-moóc nhiều hàng bánh nhỏ, một ' + NGUOI + ' cầm hộp điều khiển từ xa đi bên cạnh; con đường giấy và người que công nhân trải thêm dải đường; một chiếc NÓN GIAO THÔNG cam bên lề; nhà thờ gỗ đỏ trên rơ-moóc đi dọc con đường rộng, vài người que đi bộ',
    HE + ' (vẽ tay); chìa Kiruna trong túi gi-lê, chùm chìa nhà móc quai ba lô', 'cat', 'cat', [
    N(b24, 'It rode on remote-controlled trailers with more than two hundred wheels.', '[lao-vao-can-canh] Lao vào gầm rơ-moóc: hàng hàng bánh nhỏ quay rất chậm; người que cầm hộp điều khiển đi bên cạnh; Wob nằm sấp ngó vào gầm, các bánh xe lăn qua sát mặt, chậm rì', '', [], []),
    N(T(8, 'LKAB put'), 'LKAB put its weight at about six hundred and seventy tonnes.', 'Wob đứng dậy, chống hai tay vào hông nhà thờ đẩy thử; chân Wob trượt tại chỗ đúng "tonnes." (≈ ' + f2(T(8, 'tonnes.')) + ' s), nhà thờ không nhúc nhích', 'Wob đẩy nhà thờ, chân đạp trượt tại chỗ', [], []),
    N(T(8, 'To make'), 'To make room, the road was widened from nine metres to twenty-four, which took a year, according to LKAB.', 'Người que công nhân trải thêm từng dải đường giấy cạnh nhau; thẻ 9 m → 24 m ở "nine metres" (≈ ' + f2(T(8, 'nine')) + ' s); Wob vác một dải đường giấy đặt vào chỗ trống', '', ['dai-duong-giay'], []),
    N(T(8, 'A year of'), 'A year of roadworks, for a trip of two days.', 'Wob ngồi xuống cạnh chiếc nón giao thông cam bên lề', 'Bốn mùa quay vòng quanh Wob và chiếc nón trong ≈ 1,2 s: tuyết phủ cả hai, hoa mọc, lá rụng, tuyết lại; đúng "two days." (≈ ' + f2(T(8, 'two days.')) + ' s) mặt trời mọc lặn đúng hai lần thật nhanh; Wob phủi tuyết trên đầu; giữ 0,6 s', ['non-giao-thong'], []),
    N(T(8, 'My plan'), 'My plan was simple. Walk beside the church, all the way.', '[leo-thang-ba-lan] Wob đứng ngang hông nhà thờ đang lăn, chỉnh kính râm, bước đi; mấy người que cũng đi bộ dọc đường', '', [], []),
    N(t_ov1, 'I overtook it almost at once.', 'Lần 1: chỉ vài bước Wob đã vượt lên trước mũi nhà thờ đúng "overtook" (≈ ' + f2(T(8, 'overtook')) + ' s); Wob quay lại nhìn', '', [], []),
    N(T(8, 'I stopped.'), 'I stopped. I waited. I overtook it again.', 'Lần 2: Wob dừng ("stopped." ≈ ' + f2(T(8, 'stopped.')) + ' s), gõ chân chờ ("waited." ≈ ' + f2(T(8, 'waited.')) + ' s), nhà thờ nhích lên ngang; Wob đi tiếp, lại vượt ("again." ≈ ' + f2(T(8, 'again.')) + ' s)', '', [], []),
    N(T(8, 'It was'), 'It was slower than a slow walk.', 'Một hạt bồ công anh bay lơ lửng qua, cũng vượt nhà thờ; Wob nhìn theo hạt bồ công anh', 'Hạt bồ công anh vượt nhà thờ', [], []),
    N(T(8, 'I tried'), 'I tried walking backwards. Still too fast.', 'Lần 3, lệch: Wob đi LÙI mặt hướng về nhà thờ, vẫn trôi lên trước; đúng "Still too fast." (≈ ' + f2(T(8, 'Still')) + ' s) Wob đứng yên hẳn, nhìn thẳng người xem tỉnh bơ, nhà thờ nhích từng chút sau lưng; giữ tới cắt ' + f2(b25) + ' s', 'Đi lùi vẫn quá nhanh', [], []),
    ], ['9 m → 24 m'],
    'Gag nhịp nhanh (khuôn thu-hong-hieu): vẽ tay. C27 (mức C, lời đã rào "LKAB put its weight": KHÔNG nhãn số tấn), C28. Lệch y_hinh có chủ ý: "con đường kéo giãn như dây thun, ghế đá dài ngoẵng" trùng gag cây cầu kéo như kẹo cao su tập 3 d05; thay bằng Wob ngồi với nón giao thông qua bốn mùa. GHI CHO THỢ (dung-ve-tay): ba lần vượt theo đúng mốc chữ; giữ mặt tỉnh bơ ≥ 0,6 s cuối đoạn')

b26 = B(9, 'At its')
seg('d25', 'cat-giay', b25, b26, 'hoi-uc',
    'Con đường rộng hai bên là hàng người que (không mặt) ngồi ghế xếp, cầm bình giữ nhiệt, cờ giấy nhỏ; máy quay truyền hình giấy trên chân máy chĩa vào nhà thờ; trong một ô cửa sổ có chiếc TV giấy nhỏ chiếu đúng cảnh nhà thờ đang nhích; vỉa hè; một con chó lông xù',
    HE + '; cầm chiếc bánh quế cuộn to bằng nửa người', 'cat', 'cat', [
    N(b25 + 0.05, 'The people along the road had a better system.', '[luot-smootherstep] Camera lướt dọc hàng người que ngồi ghế xếp, rót trà, thong thả nhìn nhà thờ; Wob (mồ hôi vì đi tới đi lui) nhìn họ, rồi nhìn nhà thờ', '', [], []),
    N(T(9, 'Swedish'), 'Swedish television showed the whole move live, both days.', 'Máy quay giấy trên chân máy chĩa vào nhà thờ; trong ô cửa sổ, TV giấy nhỏ chiếu đúng cảnh nhà thờ nhích từng chút, và trong TV có cả Wob tí hon', 'Wob thấy mình trên TV, chỉnh lại kính râm', ['tv-giay'], []),
    N(T(9, 'Thousands'), 'Thousands of people lined the route.', '[lui-ra-toan-canh] Toàn cảnh con đường: hai hàng người que dài vẫy cờ giấy (vẫy tay theo nhịp)', '', [], []),
    N(T(9, 'The king'), 'The king came too.', 'Một chiếc vương miện giấy nhỏ nhấp nhô giữa đám đông (KHÔNG vẽ người, không mặt)', '', [], []),
    N(T(9, 'So I'), 'So I stopped racing a building and had a cinnamon bun.', 'Wob ngồi xuống vỉa hè, cầm chiếc bánh quế cuộn to bằng nửa người, cắn một miếng đúng "bun." (≈ ' + f2(T(9, 'bun.')) + ' s)', '', ['banh-que'], ['nuot']),
    N(T(9, 'A dog'), 'A dog sat down next to me and watched the church, very seriously, the whole time.', '[take-cham] Con chó lông xù ngồi xuống cạnh Wob đúng "sat" (≈ ' + f2(T(9, 'sat')) + ' s); cả hai nhìn nhà thờ', 'Ở "very seriously," con chó quay sang nhìn cái bánh; Wob nhìn con chó; dừng; Wob bẻ đôi bánh đưa nó một nửa; con chó ngậm lấy rồi lập tức quay lại nhìn nhà thờ rất nghiêm túc; giữ 0,6 s tới cắt ' + f2(b26) + ' s', ['banh-que'], []),
    ], [],
    'Đám đông dọc đường, nhiều lớp: cắt giấy. C29, C30. Nhà vua chỉ là vương miện giấy. Người dân là người que vẽ tôn trọng, gag dồn vào Wob và con chó')

b27 = B(9, 'A town that')
seg('d26', 've-tay', b26, b27, 'hoi-uc',
    'Vẽ tay nhìn từ trên: nhà thờ trên rơ-moóc ở chỗ mới, mũi tên cong; rồi cửa nhà thờ đóng, treo một tờ lịch giấy ghi 2027; bậc cửa',
    HE + ' (vẽ tay)', 'cat', 'cat', [
    N(b26, 'At its new spot, the church was turned around a hundred and eighty degrees, so it still faces the town.', '[so-do-ve-tay] Nhìn từ trên: nhà thờ trên rơ-moóc xoay nửa vòng tại chỗ, mũi tên cong; thẻ 180° ở "eighty" (≈ ' + f2(T(9, 'eighty')) + ' s). Wob đứng ở mép rơ-moóc bị xoay theo, cuối cùng quay lưng về thị trấn', 'Đúng "faces the town." (≈ ' + f2(T(9, 'faces')) + ' s) Wob tự xoay người lại cho cùng hướng nhà thờ', [], []),
    N(T(9, "It's still"), "It's still closed for now.", 'Cận cửa nhà thờ đóng; Wob gõ cửa hai cái (gọi lại cú gõ ở d23), không ai mở', '', [], []),
    N(T(9, 'The parish'), 'The parish hopes to reopen it in twenty twenty-seven.', 'Tờ lịch giấy ghi 2027 treo trên cửa hiện ở "twenty twenty-seven." (≈ ' + f2(T(9, 'twenty-seven.')) + ' s)', 'Wob đọc tờ lịch, gật đầu, ngồi xuống bậc cửa khoanh tay như định chờ luôn tới lúc đó; giữ 0,6 s tới cắt ' + f2(b27) + ' s', ['to-lich-2027'], []),
    ], ['180°', '2027'],
    'Sơ đồ xoay 180° nhìn từ trên + gag ngắn: vẽ tay. C31, C32')

b28 = G(9, 0.5)
seg('d27', 'cat-giay', b27, b28, 'hoi-uc',
    'Chiều muộn tháng 8: nhà thờ gỗ đỏ ở chỗ mới quay mặt về thị trấn mới; người que gấp ghế ra về; nắng xiên',
    HE + '; cuối đoạn cầm ' + CHUM + ' đã có chìa Kiruna trở lại', 'cat', 'giay', [
    N(b27 + 0.05, 'A town that carries its church across, instead of leaving it behind, is a town that plans to stay.', '[lui-cham-im-lang] Camera lùi chậm: nhà thờ đỏ đứng yên ở chỗ mới, quay mặt về thị trấn; người que gấp ghế ra về; Wob đứng nhìn, bóng đổ dài', '', [], []),
    N(T(9, 'I took'), 'I took the key out of my pocket and threaded it back onto my key ring.', '[day-vao-cham] MÔ-TÍP CHÌA 3 (cận, rõ): Wob lấy chìa Kiruna (than, thẻ gỗ dây đỏ) ra khỏi túi phải gi-lê đúng "key out" (≈ ' + f2(T(9, 'key out')) + ' s), tháo chùm chìa nhà khỏi quai ba lô, luồn chìa trở lại vòng đúng "threaded" (≈ ' + f2(T(9, 'threaded')) + ' s), lắc nhẹ cho kêu leng keng', 'Chùm chìa kêu leng keng; Wob mỉm cười với nó; giữ ≥ 0,6 s rồi 0,4 s cuối phủ dần thành giấy #EFE3C8', ['chum-chia', 'chia-khoa'], ['ting']),
    ], [],
    'Đóng chương 3, đổi ý lần 2 (đeo chìa lại): cắt giấy, lùi chậm')

# ================= CHƯƠNG 4 · Moving House, With the Neighbours (cảnh 10–11, tháng 8) =================
b29 = B(10, 'Picture')
seg('d28', 'cat-giay', b28, b29, 'hoi-uc',
    'Tờ lịch bóc giấy (trang trống, KHÔNG số) trước nhà thờ đỏ đã đỗ; một hội trường đơn sơ: tấm bản đồ dự báo giấy (lưới phố trừu tượng, không chữ) ghim lên bảng, vùng tô sọc; ' + NGUOI + ' đứng xem; rồi vỉa hè nhìn ra các mái nhà',
    HE + '; cầm chùm chìa (có chìa Kiruna)', 'giay', 'cat', [
    N(START[10], 'Eight days after the church parked, LKAB presented a new forecast.', 'Từ giấy phẳng: tờ lịch bóc lật nhanh đúng tám trang (trang trống) trước nhà thờ đỏ đứng yên; rồi trong hội trường, tấm bản đồ dự báo được ghim lên bảng đúng "forecast." (≈ ' + f2(T(10, 'forecast.')) + ' s)', '', [], ['lat-giay']),
    N(T(10, 'About six'), 'About six thousand more people and around two thousand seven hundred more homes would have to move, over roughly the next ten years.', '[tien-canh-khung] Vai người que làm tiền cảnh: vùng tô sọc trên bản đồ lan rộng thêm về phía đông, phủ thêm nhiều mái nhà; Wob đứng sau đám đông kiễng chân không thấy', 'Wob kéo một chiếc ghế trèo lên: giờ Wob cao hơn hẳn cả hội trường, lộ một mình giữa đám đông; Wob lặng lẽ ngồi thụp xuống ghế, nhìn qua khe vai; giữ 0,6 s', ['ghe-go'], []),
    N(T(10, 'Altogether,'), 'Altogether, according to LKAB, the move now affects about twelve thousand people and around five thousand four hundred homes.', 'Thẻ ~12,000 people · ~5,400 homes ở "twelve thousand" (≈ ' + f2(T(10, 'twelve')) + ' s)', '', [], []),
    N(T(10, "That's roughly"), "That's roughly two thirds of the town.", '[luot-smootherstep] Ngoài vỉa hè nhìn ra thị trấn: hai phần ba số mái nhà giấy lần lượt bật đèn vàng', '', [], []),
    N(T(10, 'I held'), 'I held my key ring and said nothing for a while.', 'Wob đứng trên vỉa hè, cầm chùm chìa trước ngực, nhìn các mái nhà sáng đèn; im lặng; giữ ≥ 1,5 s', '', ['chum-chia'], []),
    N(T(10, 'So what'), 'So what happens to a house in the way?', '[day-vao-cham] Camera đẩy vào một ngôi nhà nhỏ nằm trong vùng sọc; Wob nghiêng đầu nhìn nó', '', [], []),
    ], ['~12,000 people · ~5,400 homes'],
    'Mồi lại chương 4 bằng tin dự báo mới: cắt giấy. C33, C34 (mức C, lời đã rào "according to LKAB"). Không đùa về người mất nhà; gag để dành cho d29')

b30 = G(10, 0.5)
seg('d29', 've-tay', b29, b30, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay (viền mây): xe tải dọn nhà chở NGUYÊN một dãy phố (nhà, cây thông, cột đèn, hộp thư có cờ đỏ) chạy trên đường, chui qua một cây cầu; một tháp giếng mỏ giấy tí hon; rồi sơ đồ: ngã ba có hai biển hình (ngôi nhà / đồng xu), hai ngôi nhà giống hệt có dấu =, một cân đĩa với mặt cân chỉ có vạch và MỘT HÌNH TRÁI TIM nhỏ (không chữ, không số)',
    HE + ' (vẽ tay); cầm chùm chìa (có chìa Kiruna)', 'cat', 'cat', [
    N(b29, 'Picture moving house, except your whole street is moving too, and the mine is paying for the van.', '[bong-bong-tuong-tuong] Xe tải chở cả dãy phố chạy vào; Wob ngồi trên nóc xe giữ chặt chùm chìa; hộp thư trên xe vẫy cờ đỏ; ở "paying" (≈ ' + f2(T(10, 'paying')) + ' s) tháp giếng mỏ tí hon đưa một đồng xu cho bác tài', 'Xe chui qua cầu: cây thông trên xe cúi rạp đầu, Wob cũng cúi rạp theo, rồi cả hai cùng ngẩng lên', ['chum-chia'], []),
    N(T(10, 'Homeowners'), 'Homeowners get a choice.', '[so-do-ve-tay] Ngã ba đường vẽ tay với hai biển hình: ngôi nhà và đồng xu', '', [], []),
    N(T(10, 'LKAB can'), 'LKAB can build them an equivalent new home.', 'Hai ngôi nhà giống hệt đứng cạnh nhau, dấu = ở giữa', 'Wob đảo hai ngôi nhà qua lại như trò úp cốc, rồi không biết cái nào cũ cái nào mới; nhún vai', [], []),
    N(T(10, 'Or it'), 'Or it pays the market value plus twenty-five percent, set by an independent valuer.', 'Cân đĩa: một bên ngôi nhà giấy, bên kia chồng tiền giấy rồi thêm một phần tư chồng nữa ở "plus" (≈ ' + f2(T(10, 'plus')) + ' s); thẻ market value +25%', '', [], ['ka-ching']),
    N(T(10, 'I asked'), 'I asked myself what my key ring was worth.', 'Wob đặt chùm chìa của mình lên đĩa cân', '', ['chum-chia'], []),
    N(T(10, 'An independent valuer would'), 'An independent valuer would have said, sentimental.', '[day-vao-cham] Cận mặt cân', 'Kim cân nhích đúng tới vạch có hình TRÁI TIM nhỏ (không chữ, không số) ở "sentimental." (≈ ' + f2(T(10, 'sentimental.')) + ' s); Wob lấy chùm chìa lại ôm vào lòng; giữ 0,6 s tới cắt ' + f2(b30) + ' s', ['chum-chia'], []),
    ], ['=', 'market value +25%'],
    'So sánh đời thường (dọn nhà cả phố) + cơ chế đền bù: vẽ tay. C35. Lệch y_hinh có chủ ý: bỏ nhãn "paid" (chữ không có trong lời); kính lúp lắc đầu (gần gag kính lúp tập 2) đổi thành kim cân chỉ hình trái tim')

b31 = B(11, 'Then I went')
seg('d30', 'cat-giay', b30, b31, 'hoi-uc',
    'Trang sổ (journalPage + mapSticker map-kiruna-centre: Old centre, New centre (approx.), mũi tên nét đứt); rồi phố hè tháng 8 cỏ xanh; ' + QUANG + '; dây cờ giấy, một quả bóng bay xẹp một nửa buộc vào cột đèn mới',
    HE + '; chùm chìa (có chìa Kiruna) móc quai ba lô; một chiếc đồng hồ quả quýt trong túi gi-lê', 'cat', 'chen', [
    N(b30 + 0.05, 'I walked east, about three kilometres, to where everyone was going.', '[trang-so-ban-do] Cận trang sổ: chấm Wob đeo ba lô đi dọc mũi tên nét đứt từ Old centre sang New centre (approx.), thẻ ~3 km east ở "three" (≈ ' + f2(T(11, 'three')) + ' s); rồi [di-bo-parallax] Wob đi trên phố hè cỏ xanh', '', ['map-kiruna-centre'], []),
    N(T(11, 'The new centre'), 'The new centre opened in September twenty twenty-two, with a three-day party.', 'Quảng trường mới treo dây cờ giấy; thẻ Sept 2022 ở "September" (≈ ' + f2(T(11, 'September')) + ' s)', 'Một quả bóng bay xẹp một nửa còn sót từ bữa tiệc buộc trên cột đèn mới, vẫy vẫy về phía Wob; Wob vẫy lại', [], []),
    N(T(11, 'The new town'), 'The new town hall is a round building called Kristallen, the Crystal.', 'Toà thị chính tròn mặt kính và đá lấp lánh; mặt kính phản chiếu Wob tí hon; kính râm của Wob loé sáng theo', '', [], ['ting']),
    N(T(11, 'It opened'), 'It opened back in late twenty eighteen.', 'Wob đi một vòng quanh toà nhà tròn, tay chắp sau lưng như khách tham quan', '', [], []),
    N(T(11, 'Next to'), "Next to it stands the old town hall's clock tower, moved across from the old centre.", '[luot-smootherstep] Camera lướt sang tháp đồng hồ khung sắt cũ đứng cạnh toà nhà tròn (mặt đồng hồ chỉ có kim, vạch); Wob ngửa cổ nhìn', '', [], []),
    N(T(11, 'I stood'), 'I stood underneath it.', '[wob-be-ti] Wob bé tí dưới chân tháp đồng hồ', '', [], []),
    N(T(11, 'The clock'), 'The clock had moved house and not lost a minute.', 'Kim phút nhích đúng một nấc ở "minute." (≈ ' + f2(T(11, 'minute.')) + ' s); Wob rút đồng hồ quả quýt khỏi túi gi-lê so', 'Đồng hồ quả quýt của Wob chạy nhanh hơn; Wob lặng lẽ vặn chỉnh lại cho khớp tháp; giữ 0,6 s tới cắt ' + f2(b31) + ' s', ['dong-ho-qua-quyt'], []),
    ], ['Old centre', 'New centre (approx.)', '~3 km east', 'Sept 2022'],
    'Đi bộ sang trung tâm mới, nhiều lớp phố: cắt giấy. C36–C39. Mặt đồng hồ không số. GHI CHO THỢ (dung-cat-giay): quảng trường mới theo khoá QUANG, dùng lại ở d32 (diorama tháng 12), d34, d35 (diorama tháng 6) cho khớp hai mùa')

b32 = G(11, 0.5)
seg('d31', 've-tay', b31, b32, 'hoi-uc',
    'Vẽ tay, CÙNG KHUNG HÌNH d02: ' + SOI + '; tấm biển tên phố trắng (rơi ở d02) vẫn nằm trên sỏi; một con quạ đậu trên hàng rào',
    HE + ' (vẽ tay, kính râm đẩy lên trán như d02); cầm chùm chìa, giơ riêng chìa Kiruna ra trước', 'chen', 'cat', [
    N(b31, 'Then I went back to the old centre to hand in my key, finally.', '[lia-nhoe] Lia nhoè về phía tây: Wob đi nhanh dọc vỉa hè khô, giơ chìa Kiruna trên chùm ra trước như cầm vé (giống d02)', '', ['chum-chia', 'chia-khoa'], ['whoosh']),
    N(T(11, 'Where my'), 'Where my building had been, there was a gap with gravel in it, and a fence.', 'Dừng trước khoảng đất trống rải sỏi giữa hai đoạn hàng rào, đúng khung hình d02 (đóng vòng hook); tấm biển phố trắng vẫn nằm trên sỏi; Wob nhìn quanh', '', [], []),
    N(T(11, 'I kept'), 'I kept the key.', 'Một con quạ đáp xuống hàng rào; Wob chìa chìa khoá về phía con quạ (lần DUY NHẤT trong tập Wob với tay đưa rồi rút lại)', '', ['chia-khoa'], []),
    N(T(11, 'There was nobody'), 'There was nobody to give it to.', 'Con quạ nhìn chìa khoá, rồi vỗ cánh bay đi đúng "nobody" (≈ ' + f2(T(11, 'nobody')) + ' s); Wob từ từ hạ tay, giữ chùm chìa trước ngực; giữ 0,8 s tới cắt ' + f2(b32) + ' s', 'Con quạ từ chối nhận chìa khoá', ['chum-chia'], []),
    ], [],
    'Đóng vòng hook: vẽ tay cùng khung hình d02 (người xem nhận ra chỗ cũ). Lệch y_hinh: "giơ chìa về phía bãi sỏi rồi rút tay" thêm con quạ để có gag đọc được; đây là lần "với tay rồi rụt" duy nhất của tập. GHI CHO THỢ (dung-ve-tay): dựng lại đúng bố cục d02 (vỉa hè, hàng rào, biển trắng trên sỏi)')

# ================= CHƯƠNG 5 · Midnight Sun, Midday Dark (cảnh 12–13) =================
b33 = B(12, 'January averages')
seg('d32', 'diorama', b32, b33, 'hoi-uc',
    'Diorama ngoài trời (chế độ cảnh 3D của diorama): ' + QUANG + ', tháng 12, trời xanh thẫm, đèn đường vàng, tuyết dày; một băng ghế; đường chân trời giấy phía nam xa',
    DONG + '; khăn quấn HAI vòng che tới dưới mắt, mũ len kéo thấp; chùm chìa (có chìa Kiruna) móc quai ba lô; kính râm trong túi phải áo khoác', 'cat', 'cat', [
    N(START[12], 'That December, I went back for the dark.', '[cat-cung-doi-mua] Cắt cứng sang mùa đông: quảng trường mới tối xanh, đèn đường vàng; Wob khăn quấn kín bước vào khung, tuyết lạo xạo; GHI: camera đặt CÙNG góc với nhịp đầu d35 (tháng 6) để hai mùa khớp nhau', '', [], ['buoc-tuyet']),
    N(T(12, 'In Kiruna,'), 'In Kiruna, the sun stays below the horizon from about the eleventh of December to the first of January.', 'Ở đường chân trời phía nam, mặt trời giấy ló nửa mép rồi thụt xuống ở "below the horizon" (≈ ' + f2(T(12, 'below')) + ' s); thẻ ~11 Dec – 1 Jan', '', [], []),
    N(T(12, "That's about"), "That's about three weeks without a sunrise.", '[day-vao-cham] Wob ngồi xuống băng ghế dưới cột đèn, hai tay ôm người', '', [], []),
    N(T(12, 'At noon,'), 'At noon, the sky went pink at the edges, then gave up.', 'Kim tháp đồng hồ chỉ 12 giờ (không số); mép trời ửng hồng ở "pink" (≈ ' + f2(T(12, 'pink')) + ' s); Wob hí hửng rút kính râm từ túi áo khoác đeo vào', 'Đúng "gave up." (≈ ' + f2(T(12, 'gave')) + ' s) màu hồng tắt ngấm; Wob chậm rãi tháo kính râm ra, cất lại vào túi; giữ 0,6 s', ['kinh-ram'], []),
    ], ['~11 Dec – 1 Jan'],
    'Khuôn hai-mua: cắt cứng đổi mùa ở CÙNG một nơi bằng diorama ngoài trời (cặp với d35 tháng 6). C40. Lệch y_hinh: đèn pin soi trời (gần gag đèn pin tập 1) đổi thành kính râm đeo vội rồi tháo (gọi trước kính râm tháng 6). GHI CHO THỢ (dung-diorama): cảnh 3D ngoài trời, camera mở đoạn CÙNG góc với d35; thẻ ≥ 45 px; trang phục mùa đông theo khoá (áo khoác xanh lam, mũ xanh lá thông, khăn kem sọc xanh) cho con rối diorama (chỉ thêm khoá màu)')

b34 = B(12, 'Narrow')
seg('d33', 've-tay', b33, b34, 'hoi-uc',
    'Vẽ tay: nhiệt kế giấy to; một tờ nghiên cứu giấy (dòng kẻ, không chữ) có mũi tên chỉ xuống; sơ đồ mặt cắt: trung tâm mới nằm trong một chỗ trũng hình cái bát, khí lạnh xanh nhạt chảy xuống đọng đầy bát như nước',
    DONG + ' (vẽ tay, khăn quấn hai vòng)', 'cat', 'cat', [
    N(b33, "January averages about minus eleven Celsius. That's around twelve Fahrenheit.", '[nhiet-ke-tut] Nhiệt kế tụt xuống; thẻ −11°C · 12°F ở "minus eleven" (≈ ' + f2(T(12, 'minus')) + ' s)', 'Hơi thở Wob đông thành mấy cụm mây nhỏ, rơi xuống đất kêu lanh canh; Wob nhìn xuống chúng', [], ['tach-bang']),
    N(T(12, 'And the new'), 'And the new centre has a problem of its own.', 'Tờ nghiên cứu giấy trượt vào khung, mũi tên chỉ xuống; Wob nhíu mày đọc', '', [], []),
    N(T(12, 'According to'), 'According to a University of Gothenburg study, winter temperatures there can be noticeably lower than at the old site.', '[so-do-ve-tay] Mặt cắt: trung tâm cũ trên chỗ cao, trung tâm mới trong chỗ trũng; nhiệt kế nhỏ ở chỗ trũng thấp hơn một chút (không số)', '', [], []),
    N(T(12, 'Cold air'), 'Cold air pools in the dip where it was built, the way water fills a bowl.', 'Khí lạnh xanh nhạt chảy xuống, đọng đầy chỗ trũng như nước đổ vào bát', 'Wob vẽ tay ngồi giữa đáy bát; khí lạnh dâng lên tới cằm như nước tắm; Wob nín thở, phồng má; giữ 0,6 s tới cắt ' + f2(b34) + ' s', [], []),
    ], ['−11°C · 12°F'],
    'Số đo + cơ chế khí lạnh đọng (trừu tượng): vẽ tay. C41, C42 (lời đã rào "can be noticeably lower": không số độ chênh trên hình)')

b35 = G(12, 0.5)
seg('d34', 'cat-giay', b34, b35, 'hoi-uc',
    'Phố hẹp giữa hai dãy nhà cao tháng 12, vệt nắng thấp chỉ chạm tầng trên; quảng trường mới (khoá QUANG) gió nét đứt; tấm biển tên thị trấn hai thứ tiếng (Kiruna / Giron); một con gà gô núi lông trắng tròn trên tuyết; bong bóng tưởng tượng cắt giấy; rồi phòng thuê mới (tủ gỗ có ngăn kéo, cửa sổ đêm)',
    DONG + '; khăn quấn hai vòng (bị gió quấn chặt thêm); cuối đoạn trong phòng: tháo chìa khỏi chùm, cất vào ngăn kéo', 'cat', 'cat', [
    N(b34 + 0.05, 'Narrow streets and tall blocks keep the low sun off the pavement.', '[tien-canh-khung] Góc tường nhà cao làm tiền cảnh: phố hẹp, vệt nắng thấp chỉ chạm tầng trên; Wob đứng dưới bóng xanh, kiễng chân, rồi nhảy lên mấy lần cho đầu chạm được vệt nắng, không tới', '', [], []),
    N(T(12, 'On the new'), 'On the new square, the wind found me in seconds.', 'Quảng trường mới trống trải, gió nét đứt cuộn tới Wob đúng "found" (≈ ' + f2(T(12, 'found')) + ' s)', 'Gió giật tung khăn của Wob; khăn bay một vòng quanh tháp đồng hồ rồi quấn trở lại cổ Wob, chặt hơn lúc đầu (mắt Wob lồi ra); giữ 0,6 s', ['khan-len'], ['brr']),
    N(T(12, "The town's"), "The town's North Sámi name is Giron.", 'Tấm biển tên thị trấn hai thứ tiếng: Kiruna / Giron, chữ Giron sáng lên ở "Giron." (≈ ' + f2(T(12, 'Giron.')) + ' s)', '', ['bien-ten'], []),
    N(T(12, 'It comes'), 'It comes from the mountain, and giron means rock ptarmigan, a small bird that turns white in winter.', 'Một con gà gô núi lông trắng ngồi tròn trên tuyết, rất thoải mái, hiện ở "rock ptarmigan," (≈ ' + f2(T(12, 'ptarmigan,')) + ' s); Wob ngồi xổm cạnh nó, bắt chước dáng tròn', '', [], []),
    N(T(12, 'I would'), 'I would have liked to turn white and stop caring.', '[bong-bong-tuong-tuong] Bong bóng cắt giấy: Wob tưởng tượng mình trắng toàn thân (lục địa, biển đều trắng như tuyết), ngồi tròn lim dim cạnh con gà gô', 'Bong bóng vụt tắt: Wob xanh trở lại, run lập cập', [], []),
    N(T(12, 'Instead'), 'Instead I went back to my room, slid the key off my key ring again, and put it in a drawer.', '[day-vao-cham] MÔ-TÍP CHÌA 4 (cận, rõ): phòng thuê mới; Wob tháo chùm chìa khỏi quai ba lô, tháo chìa Kiruna khỏi vòng đúng "slid" (≈ ' + f2(T(12, 'slid')) + ' s), kéo ngăn kéo tủ gỗ, đặt chìa vào, đẩy ngăn kéo đóng đúng "drawer." (≈ ' + f2(T(12, 'drawer.')) + ' s); giữ ≥ 0,6 s', '', ['chum-chia', 'chia-khoa', 'ngan-keo'], []),
    ], ['Kiruna', 'Giron'],
    'Phố hẹp, gió, tên Sámi, phòng: cắt giấy nhiều lớp. C42, C43. Đổi ý lần 3 (cất chìa vào ngăn kéo). Lệch y_hinh: Wob không với tay rồi rụt ở vệt nắng (đã dùng ở d31), Wob nhảy lên. GHI CHO THỢ (dung-cat-giay): biển Kiruna / Giron ≥ 45 px, không thêm chữ khác')

b36 = B(13, 'I tried')
seg('d35', 'diorama', b35, b36, 'hoi-uc',
    'Diorama ngoài trời, CÙNG nơi và CÙNG góc camera mở đoạn như d32: ' + QUANG + ', tháng 6, cỏ xanh, nắng vàng nhạt, mặt trời giấy thấp quanh chân trời; một nhiệt kế giấy treo trên cột đèn',
    HE + '; chùm chìa (không có chìa Kiruna: chìa đang nằm trong ngăn kéo từ d34) móc quai ba lô', 'cat', 'cat', [
    N(START[13], 'I went back once more, in June, for the light.', '[cat-cung-doi-mua] Cắt cứng: cùng quảng trường, cùng góc máy như d32, giờ là hè: cỏ xanh, nắng vàng; Wob (gi-lê, kính râm) bước vào đúng chỗ Wob bước vào ở d32', '', [], []),
    N(T(13, 'From late'), "From late May to mid-July, about seven weeks, the sun doesn't set here at all.", '[luot-smootherstep] Mặt trời giấy lăn một vòng thấp quanh chân trời mà không chạm xuống; thẻ late May – mid-July ở "late May" (≈ ' + f2(T(13, 'late')) + ' s); Wob quay người theo mặt trời một vòng', '', [], []),
    N(T(13, 'July averages'), 'July averages about thirteen Celsius.', 'Nhiệt kế giấy trên cột đèn nhích lên; thẻ 13°C · 56°F ở "thirteen" (≈ ' + f2(T(13, 'thirteen')) + ' s); Wob nới cổ áo gi-lê', '', [], []),
    N(T(13, 'At midnight'), 'At midnight I went for a walk in sunglasses, which felt like cheating.', 'Kim tháp đồng hồ chỉ 12 giờ (không số), trời vẫn sáng vàng; Wob đeo kính râm đi dạo, bóng đổ dài trên mặt đá', 'Ở "cheating." (≈ ' + f2(T(13, 'cheating.')) + ' s) Wob nhón chân nhìn quanh như đang lén làm điều gì sai; cái bóng dài của Wob dừng lại, ngoái nhìn Wob; giữ 0,6 s', ['kinh-ram'], []),
    ], ['late May – mid-July', '13°C · 56°F'],
    'Hai mùa ở cùng một nơi (cặp với d32): diorama ngoài trời, cùng góc máy. C44, C45. GHI CHO THỢ (dung-diorama): dùng lại cảnh 3D của d32, chỉ đổi mùa (ánh sáng, tuyết → cỏ, mặt trời thấp); thẻ ≥ 45 px')

b37 = B(13, 'Summer here')
seg('d36', 've-tay', b36, b37, 'hoi-uc',
    'Vẽ tay: phòng thuê tháng 6, cửa sổ sáng choang lúc nửa đêm, giường, tủ quần áo, khăn tắm, cuộn băng dính',
    HE + ' (vẽ tay, kính râm đặt trên bậu cửa sổ)', 'chen', 'cat', [
    N(b36, 'I tried sleeping with a towel over the window.', '[leo-thang-ba-lan] Hình to: Wob dán một khăn tắm lên cửa sổ, nắng vẫn lọt qua', '', ['khan-tam'], ['whoosh']),
    N(T(13, 'Then more'), 'Then more towels.', 'Lần 2: Wob dán thêm ba khăn chồng nhau', '', ['khan-tam'], []),
    N(T(13, 'Then the'), 'Then the wardrobe.', 'Lần 3, lệch: Wob gồng mình đẩy cả tủ quần áo chắn kín cửa sổ đúng "wardrobe." (≈ ' + f2(T(13, 'wardrobe.')) + ' s), leo lên giường nhắm mắt', '', ['tu-quan-ao'], []),
    N(T(13, 'The sun found'), 'The sun found the gap anyway.', 'Một tia nắng mảnh lách qua khe tủ, rọi đúng vào mắt Wob đang nhắm ở "gap" (≈ ' + f2(T(13, 'gap')) + ' s)', 'Wob mở một mắt, nhìn tia nắng, không nhúc nhích; giữ 0,6 s tới cắt ' + f2(b37) + ' s', [], []),
    ], [],
    'Leo thang ba lần nằm trong lời (khăn, nhiều khăn, tủ): chèn vẽ tay')

b38 = G(13, 0.5)
seg('d37', 'cat-giay', b37, b38, 'hoi-uc',
    'Lịch giấy dài treo tường: hai đầu trắng tuyết rất dài, ở giữa một dải xanh ngắn ngủn (không ngày, không chữ); phòng thuê tháng 6, tủ gỗ có ngăn kéo (như d34), cửa sổ nắng nửa đêm',
    HE + '; lấy chìa Kiruna từ ngăn kéo; cuối đoạn tay trái cầm chùm chìa nhà, tay phải cầm chìa Kiruna (CHƯA luồn lại)', 'cat', 'cat', [
    N(b37 + 0.05, 'Summer here is short and serious.', 'Lịch giấy dài: Wob kẹp dải xanh ngắn ngủn ở giữa giữa hai ngón tay, đo: chỉ bằng một đốt ngón', '', [], []),
    N(T(13, 'I took'), 'I took the key out of the drawer and held it up to the midnight sun.', '[day-vao-cham] MÔ-TÍP CHÌA 5 (cận, rõ): Wob kéo ngăn kéo, lấy chìa Kiruna ra đúng "key out" (≈ ' + f2(T(13, 'key out')) + ' s), tới bên cửa sổ, giơ chìa lên ánh nắng nửa đêm đúng "held" (≈ ' + f2(T(13, 'held')) + ' s)', '', ['ngan-keo', 'chia-khoa'], []),
    N(T(13, 'It glinted.'), 'It glinted.', 'Một ngôi sao loé sáng trên răng chìa đúng "glinted." (≈ ' + f2(T(13, 'glinted.')) + ' s)', 'Tia loé phản vào kính râm trên bậu cửa sổ, kính râm loé theo; Wob nheo mắt', ['chia-khoa'], ['ting']),
    N(T(13, "I didn't"), "I didn't put it back on the ring. Not yet.", 'Wob tay trái cầm chùm chìa nhà, tay phải cầm chìa Kiruna, nhìn bên này rồi bên kia, không luồn vào; giữ ≥ 0,8 s tới cắt ' + f2(b38) + ' s', '', ['chum-chia', 'chia-khoa'], []),
    ], [],
    'Đóng chương hai mùa, nghiêng về SUMMER ONLY: cắt giấy. Mô-típ chìa 5 (giơ dưới nắng, chưa đeo lại)')

# ================= CHƯƠNG 6 · Who Else Pays for the Mine (cảnh 14–15, NGHIÊM, không gag) =================
b39 = B(14, 'Most of')
seg('d38', 'diorama', b38, b39, 'hien-tai',
    BAN + '; đèn bàn DỊU XUỐNG (ban.diuDen v ≈ 0,4), tông trầm; trang pop-up nhà thờ đỏ trên sổ còn dựng (từ cảnh 2); chùm chìa nhà nằm cạnh chân đèn',
    NHA + '; cầm chìa Kiruna (một mình), đặt xuống bàn; ' + TRAM, 'cat', 'giay', [
    N(START[14], 'Back at my desk, I put the key down for this part.', '[dat-ky-vat-xuong] Cắt về bàn, đèn dịu: Wob đặt chìa Kiruna xuống mặt bàn đúng "down" (≈ ' + f2(T(14, 'down')) + ' s), rời tay ra; nhạc lắng', '', ['chia-khoa'], []),
    N(T(14, 'Moving'), 'Moving a town is not only engineering.', '[day-vao-cham] Wob nhẹ tay gập trang pop-up nhà thờ nằm xuống; nhìn người xem, im; rồi camera đẩy chậm vào trang sổ, 0,4 s cuối phủ giấy #EFE3C8', '', ['so-du-lich'], []),
    ], [],
    'Chương nghiêm mở ở bàn (khung hiện tại): diorama, KHÔNG gag, KHÔNG sfx. Đèn dịu báo đổi tông')

b40 = G(14, 0.5)
seg('d39', 'cat-giay', b39, b40, 'hoi-uc',
    'Trang sổ tông trầm, ' + TRANG_SO + ': một dãy nhà gỗ cũ; một tấm biển tên phố cũ (không chữ); đường chân trời giấy có mấy khối nhà cao; một tờ kiến nghị giấy dài nhiều dòng chữ ký nét mực (KHÔNG đọc được tên) trên bàn gỗ; trang sau: núi Luossavaara thấp, một vệt đường mảnh nét đứt sau núi',
    NHA + '; đứng ở mép trang; ' + TRAM, 'giay', 'giay', [
    N(b39 + 0.05, 'Most of the old houses are not moved.', 'Từ giấy phẳng hiện dãy nhà gỗ cũ trên trang; Wob đứng ở mép trang', '', [], []),
    N(T(14, 'They are'), 'They are demolished, and for many people the streets they grew up on are simply gone.', 'Từng ngôi nhà được nhấc khỏi trang, để lại khoảng trống trắng; tấm biển tên phố cũ đứng một mình giữa khoảng trống ở "streets" (≈ ' + f2(T(14, 'streets')) + ' s); Wob đặt bàn tay phẳng xuống mép trang cạnh khoảng trống (không chạm biển), đứng yên', '', [], []),
    N(T(14, 'In October'), 'In October twenty twenty-three, the tall blocks that made the old skyline came down.', '[lui-cham-im-lang] Đường chân trời giấy với mấy khối nhà cao lần lượt hạ thấp tới khi chỉ còn đường thẳng; nhãn 2023; Wob nhìn theo', '', [], []),
    N(T(14, 'Not everyone'), 'Not everyone wants to go.', 'Ở một ngôi nhà còn lại, một ô cửa sổ vẫn sáng đèn; Wob nhìn ô cửa', '', [], []),
    N(T(14, 'In December'), 'In December twenty twenty-five, tenants in one neighbourhood started a petition against being moved.', 'Tờ kiến nghị giấy dài nhiều dòng chữ ký nét mực (không đọc được) trải trên bàn gỗ; Wob đứng cạnh, tay chắp trước', '', [], []),
    N(T(14, 'And the'), 'And the mine presses on more than houses.', 'Wob lật trang sổ sang hình núi Luossavaara và vệt đường mảnh sau núi; im lặng; rồi [lao-vao-hinh-ve] camera lặng lẽ vào trang, 0,4 s cuối phủ giấy #EFE3C8', '', ['so-du-lich'], ['lat-giay']),
    ], ['2023'],
    'Lịch sử nghiêm (khuôn lich-su-nghiem): cắt giấy tông trầm, KHÔNG gag, KHÔNG sfx (trừ lật trang). C47–C49. Người mất nhà không vẽ, chỉ nhà và biển phố; chữ ký không đọc được')

b41 = B(15, 'Now LKAB')
seg('d40', 'cat-giay', b40, b41, 'hoi-uc',
    'Cắt giấy tông trầm (trời xám nhạt, tuyết mỏng): núi Luossavaara thấp, rừng bạch dương lùn, vệt đường mảnh nét đứt chạy sau núi; đàn tuần lộc giấy; một ' + NGUOI + ' chăn tuần lộc đội mũ len (không mặt, KHÔNG trang phục chi tiết); hồ xanh giấy, dải nhà và cửa hầm chắn ngang lối cũ. Mép trang và vệt đèn bàn ở rìa khung (Wob kể ở bàn)',
    NHA + '; đứng NGOÀI mép trang, nhỏ, đứng yên; ' + TRAM, 'giay', 'cat', [
    N(START[15], 'North of town, behind the mountain Luossavaara, runs a reindeer route.', 'Từ giấy phẳng hiện núi thấp, rừng bạch dương lùn; nhãn Luossavaara; vệt đường nét đứt sau núi vẽ dần ở "reindeer route." (≈ ' + f2(T(15, 'route.')) + ' s); Wob đứng ngoài mép trang, nhỏ, yên', '', [], []),
    N(T(15, 'Gabna,'), 'Gabna, a Sámi reindeer herding community, moves its herds this way between summer and winter grazing land.', '[di-bo-parallax] Đàn tuần lộc giấy đi hàng dọc theo vệt đường, người chăn đội mũ len đi cạnh; các lớp rừng trôi chậm; đầu Wob quay theo đàn', '', [], []),
    N(T(15, 'Their old'), 'Their old route along the lake was cut off by the mine and the town.', '[luot-smootherstep] Camera lướt sang hồ: vệt đường cũ dọc hồ bị dải nhà và cửa hầm chắn ngang, nét đứt dừng lại ở "cut off" (≈ ' + f2(T(15, 'cut')) + ' s); vệt đường mới vòng ra sau núi; Wob lần ngón tay theo nét đứt cũ tới chỗ nó dừng, nhấc tay lên', '', [], []),
    ], ['Luossavaara'],
    'Đoạn nghiêm, KHÔNG gag, KHÔNG sfx: cắt giấy. C50. Tuần lộc và con đường vẽ được; người chăn là người que không mặt; Wob không bước vào cảnh. Pronunciation cảnh 15 có trong script.json')

b42 = B(15, 'According to')
seg('d41', 'cat-giay', b41, b42, 'hoi-uc',
    'Như d40 (tông trầm): một khung ô vuông nét mực (khu mỏ dự kiến) đặt chồng lên vệt đường còn lại; một tập hồ sơ giấy không chữ; một nam châm giấy và một chiếc xe điện giấy; hai tấm thẻ CÙNG CỠ đặt đối xứng: thẻ trái GABNA (hình tuần lộc đứng trước vệt đường bị chặn), thẻ phải LKAB (hình tháp giếng mỏ và cùng mảnh đất)',
    NHA + '; đứng ngoài mép trang, rồi đứng GIỮA hai tấm thẻ; ' + TRAM, 'cat', 'cat', [
    N(b41 + 0.05, 'Now LKAB plans a rare earth mine called Per Geijer, right on the route that is left.', 'Khung ô vuông nét mực đặt chồng lên đúng vệt đường còn lại ở "right on the route" (≈ ' + f2(T(15, 'right')) + ' s); nhãn Per Geijer cạnh khung; nét đứt của đàn tuần lộc chạy vào trong khung', '', [], []),
    N(T(15, 'LKAB calls'), 'LKAB calls it one of the largest rare earth deposits in Europe, and the EU lists it as a strategic project.', 'Một tập hồ sơ giấy không chữ đặt lên cạnh khung; Wob nhìn khung, rồi rút tay khỏi mép trang', '', [], []),
    N(T(15, 'The company'), 'The company argues that electric cars need the magnets these metals go into.', 'Một nam châm giấy và một chiếc xe điện giấy đặt lặng lẽ cạnh khung mỏ', '', [], []),
    N(T(15, "Gabna's"), "Gabna's chair, Lars-Marcus Kuhmunen, has said there is nowhere left for them to move.", 'Thẻ trái GABNA hiện ở "Gabna\'s" (≈ ' + f2(T(15, "Gabna's")) + ' s): hình tuần lộc đứng trước vệt đường bị chặn (KHÔNG ảnh, KHÔNG chân dung người); Wob đứng dưới thẻ, nhìn', '', [], []),
    N(T(15, "LKAB's"), "LKAB's chief executive, Jan Moström, has said the problem is that both sides need the same land.", 'Thẻ phải LKAB, CÙNG CỠ, hiện ở "LKAB\'s" (≈ ' + f2(T(15, "LKAB's")) + ' s): hình tháp giếng mỏ và cùng mảnh đất (không chân dung); Wob đứng giữa hai thẻ, nhìn thẻ này rồi thẻ kia, như nhau', '', [], []),
    ], ['Per Geijer', 'GABNA', 'LKAB'],
    'Đoạn nghiêm, hai bên ngang nhau: cắt giấy, KHÔNG gag, KHÔNG sfx. C51–C54. Lệch y_hinh có chủ ý: bỏ thẻ trích dẫn \'Nowhere left to move\' / \'Both need the same land\' (đặt trong ngoặc như nguyên văn mà không trùng lời, dễ thành trích sai); thay bằng hai thẻ tên cùng cỡ có hình. Không vẽ chân dung Kuhmunen, Moström')

b43 = B(15, "I don't")
seg('d42', 'cat-giay', b42, b43, 'hoi-uc',
    'Như d40 (tông trầm): một phong bì giấy đi qua trang tới một toà nhà giấy có hàng cột (dạng chung, KHÔNG cờ, KHÔNG chữ); bàn gỗ có tờ thoả thuận giấy; một tờ giấy trắng mới; hai chiếc ghế trống đối diện nhau',
    NHA + '; đứng ngoài mép trang; ' + TRAM, 'cat', 'cat', [
    N(b42 + 0.05, 'According to the Swedish news agency TT, Gabna has asked the European Court of Human Rights to look at the case.', 'Một phong bì giấy đi chầm chậm qua trang tới toà nhà có hàng cột (không cờ, không chữ) ở "European Court" (≈ ' + f2(T(15, 'European')) + ' s); Wob nhìn theo phong bì', '', [], []),
    N(T(15, 'In December'), 'In December twenty twenty-five, it ended its cooperation agreement with LKAB, saying consultations had changed nothing.', 'Tờ thoả thuận giấy trên bàn được gấp lại đúng "ended" (≈ ' + f2(T(15, 'ended')) + ' s), đặt sang một bên (KHÔNG xé, không kịch tính)', '', [], []),
    N(T(15, 'LKAB said'), 'LKAB said it would look for a new way to talk.', '[lui-cham-im-lang] Một tờ giấy trắng mới đặt lên bàn giữa hai chiếc ghế trống đối diện nhau; camera lùi chậm; Wob nhìn hai chiếc ghế trống', '', [], []),
    ], [],
    'Đoạn nghiêm, KHÔNG gag, KHÔNG sfx: cắt giấy. C55, C56. Kết bằng hình trung lập (ghế trống hai bên), không phân xử')

b44 = G(15, 0.5)
seg('d43', 'diorama', b43, b44, 'hien-tai',
    BAN + '; đèn bàn dịu (như d38); chìa Kiruna nằm trên mặt bàn chỗ Wob đặt ở d38',
    NHA + '; tay không; ' + TRAM, 'cat', 'cat', [
    N(b43 + 0.05, "I don't have a neat line for this part.", '[day-vao-cham] Về bàn: Wob nhìn chìa khoá trên bàn, không cầm lên; camera đẩy rất chậm; sau "part." (≈ ' + f2(T(15, 'part.')) + ' s) im lặng ≥ 1 s, chỉ có đèn bàn', '', ['chia-khoa'], []),
    ], [],
    'Kết chương nghiêm ở bàn: diorama, KHÔNG gag, có khoảng lặng trước outro')

# ================= OUTRO · Lamp On, Lamp Off (cảnh 16) =================
b45 = B(16, 'It came')
seg('d44', 'diorama', b44, b45, 'hien-tai',
    BAN + '; chìa Kiruna nằm DƯỚI đèn bàn; trang hộ chiếu Kiruna (cùng mẫu thẻ d03: ' + HC + ') mở cạnh, ô con dấu trống; trên sổ các trang pop-up nhỏ: mặt trời, nhà thờ đỏ nhỏ, bánh quế; rồi một quảng trường giấy nhỏ có vũng lạnh xanh; rồi map-kiruna-rail dán trên sổ (đường đỏ sang Narvik). Công tắc đèn bàn nhìn rõ',
    NHA + '; tay không (bật tắt đèn), cuối đoạn ôm chân đèn rồi buông', 'cat', 'chen', [
    N(START[16], 'The key lives under my desk lamp now.', '[luot-smootherstep] Đèn bàn đang tắt, bàn tối nhạt; camera lướt tới chìa khoá nằm dưới chân đèn, trang hộ chiếu Kiruna mở cạnh, ô dấu còn trống', '', ['chia-khoa', 'the-ho-chieu'], []),
    N(T(16, 'Lamp on.'), "Lamp on. That's June.", 'Wob bật công tắc đúng "on." (≈ ' + f2(T(16, 'on.')) + ' s): bàn sáng vàng ấm, bóng chìa khoá đổ ngắn', '', ['den-ban'], ['pop']),
    N(T(16, 'Sun at'), 'Sun at midnight, a church you can walk beside, a cinnamon bun at the roadside.', 'Trên trang sổ ba pop-up nhỏ bật dựng 0–3 khung trước từng chữ: mặt trời ("Sun" ≈ ' + f2(T(16, 'Sun')) + ' s), nhà thờ đỏ ("church" ≈ ' + f2(T(16, 'church')) + ' s), bánh quế ("cinnamon" ≈ ' + f2(T(16, 'cinnamon')) + ' s); Wob chỉ vào từng cái, mặt sáng lên', '', ['so-du-lich'], []),
    N(T(16, 'Lamp off.'), "Lamp off. That's December.", 'Wob tắt công tắc đúng "off." (≈ ' + f2(T(16, 'off.')) + ' s): bàn tối xanh, chỉ còn ánh trăng giấy; ba pop-up gập nằm xuống; Wob run nhẹ', '', ['den-ban'], []),
    N(T(16, 'Weeks'), 'Weeks without a sunrise, and a new square that holds the cold.', 'Trong tối, một quảng trường giấy nhỏ bật dựng, giữa có vũng lạnh xanh nhạt; Wob ôm lấy mình', '', [], ['brr']),
    N(T(16, 'Lamp on again.'), "Lamp on again. I'm not made of stone.", '[take-cham] Wob mò mẫm trong tối tìm công tắc hai nhịp', 'Đèn bật lại đúng "again." (≈ ' + f2(T(16, 'again.')) + ' s): Wob đang ôm chặt chân đèn như ôm lò sưởi; ở "stone." Wob vẫn ôm, quay ra nhìn người xem; giữ 0,6 s', ['den-ban'], ['pop']),
    N(T(16, "Kiruna didn't"), "Kiruna didn't come here for the weather.", 'Wob buông chân đèn, lật sổ tới map-kiruna-rail, gõ ngón tay lên đường đỏ sang Narvik', '', ['so-du-lich', 'map-kiruna-rail'], ['lat-giay']),
    ], ['KIRUNA', 'SWEDEN', 'Would Wob move here?', 'Narvik · ice-free'],
    'Outro ở bàn (khung hiện tại): diorama. Khuôn khác tập 5 (tập 5 đọc bưu thiếp rồi đóng dấu): bật/tắt đèn kể hai mùa. GHI CHO THỢ (dung-diorama): bật/tắt đèn bằng ban.diuDen (v 0 sáng, ≈ 0,85 tối xanh) đúng mốc chữ; ba pop-up đúng mốc')

b46 = B(16, 'I admire')
seg('d45', 've-tay', b45, b46, 'hoi-uc',
    'Chèn vẽ tay tóm lại: một hòn quặng; mặt đất dưới dãy nhà trượt đi về phía núi; cả thị trấn (nhà, tháp đồng hồ) nhấc nhà thờ gỗ đỏ lên mái như khiêng một chiếc ghế sô-pha, đi sang phải',
    'Wob vẽ tay nhỏ, đồ ở nhà (không áo khoác, không mũ); KHÔNG khẩu hình (lop hoi-uc)', 'chen', 'cat', [
    N(b45, 'It came for the iron, and when the iron started pulling the ground away, the town picked up its church and kept going.', '[chen-ve-tay] Hình to: hòn quặng ở "iron," (≈ ' + f2(T(16, 'iron,')) + ' s); mặt đất dưới dãy nhà trượt về phía núi ở "pulling" (≈ ' + f2(T(16, 'pulling')) + ' s); cả dãy nhà và tháp đồng hồ nhấc nhà thờ đỏ lên mái khiêng đi sang phải ở "picked up" (≈ ' + f2(T(16, 'picked')) + ' s)', 'Wob đi cuối đoàn, gồng mình khiêng món nhỏ nhất: chiếc chong chóng gió trên nóc tháp chuông; giữ 0,6 s tới cắt ' + f2(b46) + ' s', [], ['whoosh']),
    ], [],
    'Tóm lý do bằng hình vẽ tay chèn 6 s (giữ diorama ≤ 20%)')

t_so = T(16, 'Summer')
seg('d46', 'diorama', b46, DUOI_A, 'hien-tai',
    'Như d44 (bàn, đèn sáng); trang hộ chiếu Kiruna và con dấu cao su (api.conDauSVG) trên bàn; một pop-up nhỏ: căn nhà gỗ phủ tuyết có ' + NGUOI + ' đọc sách bên cửa sổ; CỬA SỔ ở bên TRÁI bàn sát kệ kỷ vật, khung cửa sổ có một cái ĐINH nhỏ',
    NHA + '; cầm con dấu; rồi cầm chìa Kiruna, treo lên đinh ở khung cửa sổ; cuối đoạn tay không, chỉ vào chìa', 'cat', 'cat', [
    N(b46 + 0.05, 'I admire that a lot.', 'Cắt về bàn: Wob nhìn trang sổ, đặt tay lên ngực, gật chậm', '', [], []),
    N(T(16, 'I just'), "I just can't do the dark.", 'Wob liếc công tắc đèn, rùng mình một cái', '', [], []),
    N(t_so - 0.07, 'Summer only.', f'[lao-vao-can-canh] Trang hộ chiếu lật ra GIỮA khung; Wob nhấc con dấu, hà hơi; dấu chạm giấy 0–3 khung trước "Summer" ({f2(t_so)} s): dấu khung đôi nghiêng, chữ SUMMER ONLY màu đất nung (#a8322a in trên giấy, như dấu các tập trước) ≥ 120 px, ép đúng bề rộng trong khung, cả dấu nằm trọn vùng an toàn. Dấu to giữa khung GIỮ {f2(t_so)}–{f2(t_so + 3.0)} s (≥ 3 s), rồi mới thu về trang hộ chiếu trong 0,3 s. Đúng một lần trong tập', '', ['the-ho-chieu', 'con-dau'], ['dau-wob']),
    N(T(16, "I'd come"), "I'd come every June, help carry something heavy, and leave before the sun does.", f'Dấu SUMMER ONLY VẪN to giữa khung tới {f2(t_so + 3.0)} s; Wob đứng cạnh làm động tác vác một thùng các-tông nặng ở "carry" (≈ {f2(T(16, "carry"))} s); dấu thu về trang ({f2(t_so + 3.0)}–{f2(t_so + 3.3)} s); ở "leave before the sun" Wob vẫy tay chào mặt trời pop-up trên sổ đang lặn dần', '', ['con-dau'], []),
    N(T(16, 'If you'), "If you like snow, quiet and a project measured in decades, you'd outlast me easily.", '[luot-smootherstep] Một pop-up nhỏ bật dựng: căn nhà gỗ phủ tuyết, người que đọc sách bên cửa sổ, khói bếp; Wob chỉ vào nó rồi chỉ ra người xem, nhún vai', '', [], []),
    N(T(16, 'I hung'), 'I hung the key on a nail by my window, pointing east, in case its door turns up.', f'Wob nhặt chìa Kiruna từ dưới chân đèn, bước tới khung cửa sổ bên trái, treo chìa lên đinh đúng "nail" (≈ {f2(T(16, "nail"))} s); chìa đung đưa rồi dừng, mũi chìa chỉ sang PHẢI (phía đông) đúng "east," (≈ {f2(T(16, "east,"))} s)', 'Chìa dừng hẳn, rồi tự nhích thêm một chút về phía đông như đang ngó ra đường; Wob nhìn nó, nhìn người xem; giữ 0,6 s trước "Would" (' + f2(T(16, 'Would you')) + ' s)', ['chia-khoa', 'dinh-cua-so'], []),
    N(T(16, 'Would you'), 'Would you move your whole town to keep your job?', '[day-vao-cham] Wob quay ra người xem, tay chỉ vào chìa khoá trên đinh; camera đẩy chậm; giữ hình tới hết đoạn; nhạc hạ', '', ['chia-khoa'], []),
    ], ['KIRUNA', 'SWEDEN', 'Would Wob move here?', 'SUMMER ONLY'],
    'Outro ở bàn: diorama. Đóng dấu SUMMER ONLY dưới đèn (nhãn cố định, đúng một lần), treo chìa trên đinh hướng đông (mô-típ chìa 6, gọi lại hook). GHI CHO THỢ (dung-diorama): SUMMER ONLY ≥ 120 px ép bề rộng, dấu to giữ ' + f'{f2(t_so)}–{f2(t_so + 3.0)}' + ' s rồi mới thu (0,3 s); KIRUNA ≥ 72 px, dòng khác ≥ 54 px; cửa sổ và đinh ở BÊN TRÁI, sát kệ (d47 lấy chìa từ đinh này)')

seg('d47', 'diorama', DUOI_A, END, 'duoi',
    'ĐUÔI TẬP theo skill mo-ket mục 2, dựng bằng templates/hoat-hinh/_chung/mo-ket/duoi-tap.js. Bàn kỷ vật (cùng bàn d01), đèn ấm; cửa sổ bên trái cạnh kệ (đinh ở khung cửa sổ, như d46). '
    'Bên trái (x 96–900): kệ gỗ giấy hai tầng: bưu thiếp Tristan da Cunha MẶT TEM QUAY RA (khoá VE "buuThiep" của tập 5; nếu template chưa có thì lấy từ projects/2026-11-16-tristan-da-cunha/hoat-hinh/doan-d51 rồi thêm vào VE, chỉ thêm), '
    'lọ gần như không có opal (loOpal), bình xịt còn niêm phong (binhXit), tờ lịch hầm còn băng dính (toLich), tủ đông nhỏ có cá (tuDong) cạnh kệ; CHÌA KHOÁ KIRUNA là kỷ vật MỚI: treo trên một ĐINH RIÊNG ở cột kệ cạnh bưu thiếp '
    '(thêm khoá VE "chiaKhoa": chìa than, thẻ gỗ dây đỏ, mũi chìa chỉ sang phải; chỉ thêm). Thẻ tên dưới mỗi món, chữ ≥ 45 px. '
    'Bản đồ giấy trừu tượng trái dưới (x < 1100, không biên giới thật, không vùng Đông Nam Á/Biển Đông): ghim đỏ MỚI ở vùng rất xa phía bắc (đúng chỗ ghim trống cuối tập 5, có vài bông tuyết), ghim trống KHÔNG nhãn rung ở một mảng đất xanh ấm phía đông xa, trên nó một đám mây mưa giấy xám nhỏ. '
    'TẮT "mặt trời nhô" (ghimRung matTroi: false). Một va li nhỏ mở trên bàn và một chồng tất. Bên phải: vùng end screen để TRỐNG: endScreen {khung: [[1180,160],[1180,500]], vong: [1460,922]} (khung 560×315, vòng Ø200). CAMERA KHOÁ CỨNG cả đoạn',
    NHA + ' (bộ ở nhà như d43–d46). Khung 0: chìa Kiruna còn trên đinh khung cửa sổ (liên tục từ d46); trong 0–0,6 s Wob gỡ chìa khỏi đinh cửa sổ; từ ' + f2(START[17]) + ' s treo chìa lên đinh riêng ở kệ; rồi cầm chồng tất', 'cat', 'cuoi-video', [
    N(DUOI_A, '', 'Khung 0 (cắt cứng từ d46): đủ bàn, cửa sổ, kệ, kỷ vật cũ; chìa khoá còn trên đinh khung cửa sổ; Wob gỡ chìa khỏi đinh cửa sổ trong 0–0,6 s. Hai khung và vòng giấy trống bật lên trong 0–1,2 s đầu đoạn (dt.endScreen) rồi ĐỨNG YÊN tuyệt đối tới khung cuối (≥ 18 s ổn định). Bên trong khung và vòng không vẽ gì, không chữ; MỌI chuyển động của Wob, chìa, tất, mưa ở x < 1100; sau giây 1,2 của đoạn toàn vùng x ≥ 1150 không vật chuyển động, không chữ', '', ['khung-anh-trong', 'vong-tron-trong', 'chia-khoa'], ['pop']),
    N(START[17], 'The key goes on the shelf, on a nail of its own, beside the postcard that lost the race home.', 'Wob treo chìa Kiruna lên đinh riêng ở cột kệ (dt.datLen), mũi chìa chỉ sang phải; thẻ KIRUNA dưới chìa; bưu thiếp Tristan da Cunha đứng cạnh, mặt tem quay ra, nghiêng nhẹ về phía chìa ở "postcard" (≈ ' + f2(T(17, 'postcard')) + ' s)', 'Bưu thiếp nghiêng sang tựa vào chìa khoá như hai kỷ vật làm quen', ['chia-khoa', 'buu-thiep'], []),
    N(T(17, 'Behind'), 'Behind them, the opal jar still rattles mostly air.', 'Khuỷu tay Wob chạm kệ: lọ opal phía sau rung lách cách (dt.rung) ở "rattles" (≈ ' + f2(T(17, 'rattles')) + ' s); Wob liếc nó', '', ['lo-opal'], []),
    N(T(17, 'Next,'), 'Next, I am packing every sock I own.', 'CHỈ từ chữ "Next,": bản đồ giấy trừu tượng mở ra ở trái dưới (dt.moBanDo); ghim đỏ mới cắm vào vùng rất xa phía bắc (dt.camGhim, vài bông tuyết quanh); ghim trống KHÔNG nhãn rung ở mảng đất xanh ấm phía đông xa (dt.ghimRung, matTroi: false), đám mây mưa giấy nhỏ trên ghim nhỏ giọt; Wob nhét cả chồng tất vào va li nhỏ trên bàn ở "sock" (≈ ' + f2(T(17, 'sock')) + ' s). Không tên nơi, không số, không chữ', '', ['ban-do-giay', 'ghim', 'va-li', 'tat'], ['drop']),
    N(T(17, 'I hear'), 'I hear the rain there takes its time.', 'Một giọt mưa từ đám mây trên ghim rơi rất chậm, đáp lên chiếc tất trên cùng, chiếc tất sẫm màu ẩm; vài giọt mưa giấy trượt chậm trên kính cửa sổ bên trái; Wob nhìn chiếc tất ẩm, tỉnh bơ', 'Chiếc tất ẩm trước cả chuyến đi', ['tat'], []),
    N(round(E(17) + 0.3, 3), '', 'Hết lời: Wob quay sang phải, chỉ tay về phía hai khung trống (bàn tay dừng ở x ≤ 1100), chớp mắt, đứng thở tới hết đoạn; mưa trên cửa sổ vẫn trượt chậm (x < 1100); nhạc nhỏ dần nhưng không tắt; không mờ đen', '', [], []),
    ], ['KIRUNA', 'TRISTAN DA CUNHA', 'SANTA CRUZ DEL ISLOTE', 'WHITTIER', 'COOBER PEDY', 'OYMYAKON'],
    'Đuôi tập ở bàn kỷ vật = khung hiện tại, chỉ diorama (skill mo-ket). Đuôi 20,0 s: 0,6 s trước lời (gỡ chìa khỏi đinh cửa sổ, liên tục từ d46) + lời ' + f'{sub[16]["duration"]:.2f}' + ' s (hết ở giây ' + f'{0.6 + sub[16]["duration"]:.1f}' + ' của đoạn) + ' + f'{20 - 0.6 - sub[16]["duration"]:.1f}' + ' s giữ sau lời; khung end screen đứng yên ≥ 18 s. Nhá tập 7 (ngôi làng mưa nhiều) chỉ bằng hình: ghim trống có mây mưa, tất ẩm, mưa trên cửa sổ; không tên, không số. GHI CHO THỢ (dung-diorama): truyền `endScreen: {khung: [[1180,160],[1180,500]], vong: [1460,922]}` vào api.duoiTap; thêm khoá VE "chiaKhoa" (và "buuThiep" nếu chưa có) (chỉ thêm); thẻ kệ ≥ 45 px, TRISTAN DA CUNHA và SANTA CRUZ DEL ISLOTE hai dòng; tắt mặt trời trong ghimRung; vùng x ≥ 1150 đứng yên sau 1,2 s; camera khoá')

# ---------------- nhạc (chỉ bài có file trong music/ và dòng trong music/GIAY-PHEP.md) ----------------
NHAC = [
    {'src': 'music/wallpaper.mp3', 'bat_dau': 0.0, 'ket_thuc': b06, 'mood': 'to-mo'},
    {'src': 'music/frost-waltz.mp3', 'bat_dau': b06, 'ket_thuc': b13, 'mood': 'khac-nghiet'},
    {'src': 'music/inspired.mp3', 'bat_dau': b13, 'ket_thuc': b23, 'mood': 'to-mo'},
    {'src': 'music/sneaky-snitch.mp3', 'bat_dau': b23, 'ket_thuc': b28, 'mood': 'hai'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': b28, 'ket_thuc': b32, 'mood': 'to-mo'},
    {'src': 'music/lightless-dawn.mp3', 'bat_dau': b32, 'ket_thuc': b35, 'mood': 'khac-nghiet'},
    {'src': 'music/inspired.mp3', 'bat_dau': b35, 'ket_thuc': b38, 'mood': 'to-mo'},          # ngắt đúng chỗ cắt cứng về bàn
    {'src': 'music/lightless-dawn.mp3', 'bat_dau': round(START[14] + 1.0, 3), 'ket_thuc': round(E(15) + 0.5, 3), 'mood': 'khac-nghiet'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': round(START[16] - 0.3, 3), 'ket_thuc': END, 'mood': 'to-mo'},
]
for n in NHAC: n['bat_dau'] = round(n['bat_dau'], 3); n['ket_thuc'] = round(n['ket_thuc'], 3)

out = {
    '_ghi_chu': [
        'Tập 6 Kiruna, phân cảnh phối 3 phong cách (dao-dien-hoat-hinh), sinh bằng hoat-hinh/sinh-phan-canh.py từ audio/subtitles.json (17 cảnh, giọng Edge). Vòng 1, 28/11/2026. Khung script chép từ tập 5 (đã qua 5a 16/16); áp sẵn bài học duyệt 5a tập 5: mỗi nhịp ghi đủ lời (script tự kiểm nối nhịp = lời 17 cảnh), mốc rơi đúng chữ thật, punchline giữ ≥ 0,6 s, Wob có việc ở mọi đoạn, gag không lặp tập 1–5.',
        'KHUNG XUẤT 2560×1440 (xuat); mọi toạ độ trong phân cảnh vẫn theo hệ thiết kế 1920×1080.',
        'THỨ TỰ KHUNG (ghi_chu_khung của script.json): mở ở bàn với chìa khoá phòng thuê (d01) → chèn vẽ tay về trả chìa tháng 8 (d02) → bàn: lời chào, thẻ hộ chiếu, lời hứa, mô-típ chìa 1 (d03, d05; chèn trang lịch sử 1736 ở d04) → tháng 2 (d06–d22: phòng thuê, mỏ, hai giả thuyết sai, lời giải Narvik ở đường ngang) → tháng 8 (d23–d31: nhà thờ dời, dự báo mới, trung tâm mới, bãi sỏi đóng vòng hook) → tháng 12 (d32–d34) → tháng 6 (d35–d37) → bàn, chương nghiêm (d38–d43, hồi ức lối tuần lộc d40–d42) → outro bật/tắt đèn, đóng dấu SUMMER ONLY, treo chìa (d44–d46) → đuôi ở kệ (d47).',
        'KHOÁ TRANG PHỤC (chung 3 phong cách; rig nào chưa có thì thợ THÊM khoá, không đổi tạo hình gốc): ' + DONG + '. ' + HE + '. ' + NHA + '. Dòng thời gian: ở nhà d01, d03–d05 (d04 Wob đứng mép trang) → hè d02 (lần về trả chìa tháng 8) → đông d06–d22 (trong phòng thuê: áo khoác vắt ghế, mũ, khăn trên ghế; d12 mặc áo khoác vì vừa về; d09–d12 mũ bảo hộ trắng khi ở mỏ) → hè d23–d31 → đông d32–d34 (khăn quấn hai vòng) → hè d35–d37 (d36 kính râm trên bậu cửa) → ở nhà d38–d47 (d39–d42 đứng mép trang; d45 vẽ tay đồ ở nhà).',
        'ĐẠO CỤ KHOÁ: ' + CHIA + '. ' + CHUM + '. ' + NHA_THO + '. ' + QUANG + '. ' + SOI + '.',
        'TRỤC HÌNH CHÍNH · MÔ-TÍP CHÌA (Wob đổi ý bằng đồ vật, mỗi lần CẬN, RÕ, có mốc chữ): d01 chìa một mình ở bàn (hiện tại) → d02 chìa trên chùm, vặn giữa không khí (tháng 8) → (1) d03 LUỒN vào chùm chìa nhà ("key ring," ' + f2(T(2, 'ring,')) + ' s) → d06 mở cửa phòng thuê bằng chìa trên chùm, treo chùm lên móc → (2) d12 THÁO khỏi chùm, BỎ TÚI phải áo khoác ("slid" ' + f2(T(4, 'slid')) + ' s), vỗ túi → d19, d22 thẻ gỗ thò khỏi túi → (3) d27 ĐEO LẠI ("threaded" ' + f2(T(9, 'threaded')) + ' s) → d28–d31 trên chùm (ôm khi cân, chìa ra cho con quạ) → (4) d34 CẤT NGĂN KÉO ("slid" ' + f2(T(12, 'slid')) + ' s, "drawer." ' + f2(T(12, 'drawer.')) + ' s) → d35 chùm không có chìa → (5) d37 lấy ra, GIƠ DƯỚI NẮNG nửa đêm ("held" ' + f2(T(13, 'held')) + ' s), không luồn lại → d38 đặt xuống bàn → d44 nằm dưới đèn → (6) d46 TREO ĐINH khung cửa sổ, mũi chỉ HƯỚNG ĐÔNG ("nail" ' + f2(T(16, 'nail')) + ' s) → d47 chuyển lên đinh riêng ở kệ.',
        'ĐÁP ÁN CHÍNH (dap_an_chinh = cảnh 6, Narvik / ice-free): KHÔNG đường sắt, cảng, Narvik, tàu quặng ra biển trước d15 (' + f2(b15) + ' s, cảnh 6 bắt đầu ' + f2(START[6]) + ' s). map-kiruna-rail chỉ từ d17; nhãn Narvik chỉ từ chữ "Narvik" (' + f2(t_nar) + ' s). Manh mối mơ hồ trước đó chỉ bằng hình: cánh cửa giấy đóng băng dưới tuyết trên thước thời gian (d04), hai tấm thẻ giả thuyết (d05), đống quặng nằm chờ ở chỗ cụt chân núi, một hòn ngoảnh về phía tây (d12).',
        'ĐOẠN NGHIÊM (d38–d43, cảnh 14–15: người mất nhà, Gabna, LKAB): mặt Wob TRẦM, KHÔNG gag, KHÔNG sfx hài (chỉ lật trang ở d39), Wob đứng ngoài mép trang, không bước vào cảnh; người vẽ dạng que không mặt; KHÔNG chân dung Kuhmunen, Moström, nhà vua; tuần lộc và con đường vẽ được; hai bên (GABNA / LKAB) hai thẻ cùng cỡ; nhạc lightless-dawn lắng, lặng ~2 s trước outro.',
        'NHÀ THỜ (d03 pop-up, d23–d27, d44–d45): nhà thờ gỗ đỏ cách điệu theo khoá; đám đông que không mặt; nhà vua chỉ là vương miện giấy (d19, d20, d25), không vẽ người.',
        'NGƯỜI DÂN: ' + NGUOI + '; gag luôn dồn vào Wob, đồ vật, con vật (chó, quạ, gà gô, hòn quặng giấy). Trong mọi trang lịch sử (d04, d20, d39–d42) Wob đứng NGOÀI mép trang. Không vẽ chân dung Mangi, Lundbohm, nhà vua, Kuhmunen, Moström.',
        'GAG ĐÃ SOÁT với tập 1–5 và trong tập (lệch y_hinh có chủ ý ghi ở ly_do từng đoạn): bong bóng ý nghĩ vỡ (tập 1, 4) → thẻ làm đế lót ly (d05); biển OPEN (tập 5) → tay nắm gãy (d18); đường kéo giãn (tập 3 cầu kẹo cao su) → nón giao thông bốn mùa (d24); đèn pin (tập 1) → kính râm (d32); thước dây (tập 3) → giếng + viên sỏi (d10); đếm toa (tập 3) làm khác: cả quả địa cầu xoay (d15); rào chắn chạm mũi (tập 3) không dùng; chùm chìa nặng kéo ngồi (tập 5 d40) không dùng. "Đồ vật tự thi hành luật chặn Wob": 0 lần. "Với tay rồi rụt": 1 lần (d31, chìa đưa con quạ). Leo thang ba lần: 2 lần, đều nằm trong lời (d24 vượt nhà thờ, d36 khăn tắm).',
        'BẢN ĐỒ: chỉ 3 bản đồ code trong assets/ (map-kiruna d01/d03, map-kiruna-rail d17/d19/d44, map-kiruna-centre d23/d30), dán lên trang sổ; nhãn do thợ đặt theo chu_tren_do_vat. Không ảnh AI (anh_ai rỗng): mọi phông vẽ bằng code. Bản đồ châu Âu ở d21 là giản lược không biên giới. Bản đồ đuôi tập là giấy trừu tượng, không biên giới.',
        'LUẬT CHUNG · Đồ có mặt số (đồng hồ báo thức, tháp đồng hồ, đồng hồ quả quýt, mặt cân) chỉ có kim, vạch, biểu tượng: KHÔNG chữ, KHÔNG số. Tờ lịch bóc ở d28 trang trống. Chữ ký trên kiến nghị không đọc được.',
        'CHỮ: chỉ chữ trong chu_tren_do_vat, ≥ 45 px hệ 1920 ở cỡ cảnh lúc chữ hiện (nhãn trên sổ chỉ hiện khi cận trang), trong vùng an toàn (lề 96/54); không đặt chữ ở vùng logo x > 1500, y < 150. 20 s cuối (d47) không chữ ở x > 1150, y > 560.',
        'SFX chỉ chọn từ sfx/GIAY-PHEP.md (script tự kiểm). Leng keng chìa khoá dùng `ting`. dau-wob chỉ ở dấu SUMMER ONLY (d46). Nhạc chọn từ music/GIAY-PHEP.md (bài có file thật; calm-curiosity.mp3 có trong sổ nhưng chưa có file nên không dùng).',
    ],
    'fps': 30, 'rong': 1920, 'cao': 1080, 'xuat': {'w': 2560, 'h': 1440}, 'thoi_luong': END,
    'loi': [{'scene': s['id'], 'bat_dau': START[s['id']]} for s in sub],
    'nhac': NHAC, 'am_luong_nhac': 0.2,
    'doan': D,
}

# bên ra trước một đoạn chèn ghi 'chen' cho đồng bộ (cắt cứng; whoosh ở đầu đoạn chèn)
for a, b in zip(D, D[1:]):
    if b['vao'] == 'chen': a['ra'] = 'chen'

# ---------------- tự kiểm ----------------
assert D[0]['bat_dau'] == 0 and D[-1]['ket_thuc'] == END
assert [d['id'] for d in D] == [f'd{i + 1:02d}' for i in range(len(D))], 'id khong lien'
for a, b in zip(D, D[1:]):
    assert a['ket_thuc'] == b['bat_dau'] and a['ket_thuc'] > a['bat_dau'], (a['id'], b['id'])
    assert (a['ra'] == 'giay') == (b['vao'] == 'giay'), ('noi giay lech', a['id'], b['id'])
    assert (a['ra'] == 'chen') == (b['vao'] == 'chen'), ('noi chen lech', a['id'], b['id'])
_ngoai = []
for d in D:
    assert d['ket_thuc'] - d['bat_dau'] >= 2.0, ('doan qua ngan', d['id'], d['bat_dau'], d['ket_thuc'])
    for n in d['nhip']:
        if not (d['bat_dau'] - 0.001 <= n['tai'] < d['ket_thuc']): _ngoai.append((d['id'], d['bat_dau'], d['ket_thuc'], n['tai'], n['loi'][:40]))
for x in _ngoai: print('NHIP NGOAI DOAN', x)
assert not _ngoai
for d in D:
    if d['vao'] == 'chen':
        assert 'whoosh' in d['nhip'][0]['sfx'], ('chen thieu whoosh', d['id'])
    if d['lop'] in ('hien-tai', 'duoi') and d['phong_cach'] != 'diorama':
        raise AssertionError(('khung hien tai khong phai diorama', d['id']))
sfx_so = set(re.findall(r'^\| ([a-z0-9-]+)\.wav', open('sfx/GIAY-PHEP.md', encoding='utf8').read(), re.M))
for d in D:
    for n in d['nhip']:
        for x in n['sfx']: assert x in sfx_so, ('sfx ngoai so', d['id'], x)
for n in NHAC: assert os.path.exists(n['src']), ('thieu file nhac', n['src'])
# dấu SUMMER ONLY đúng một lần, ở outro
assert sum(1 for d in D for n in d['nhip'] if 'dau-wob' in n['sfx']) == 1
assert [d['id'] for d in D if 'SUMMER ONLY' in d['chu_tren_do_vat']] == ['d46']
# thẻ hộ chiếu trước giây 40, xong trước khi camera xuống sổ
assert t_hc1 < 40 and t_hc1 < t_far - 0.3
# lời cảnh 17 hết trước giây 14,5 của đuôi
assert E(17) - DUOI_A < 14.5
# không lộ đáp án trước cảnh 6: chữ, đạo cụ
CAM = ('Narvik', 'Luleå', 'ice-free', 'Bothnia', 'map-kiruna-rail')
for d in D:
    if d['bat_dau'] < START[6]:
        for c in d['chu_tren_do_vat']: assert not any(k in c for k in CAM), ('lo dap an (chu)', d['id'], c)
        for n in d['nhip']:
            for x in n['dao_cu']: assert not any(k in x for k in CAM), ('lo dap an (dao cu)', d['id'], x)
# đoạn nghiêm: không gag, không sfx ngoài lật trang
for d in D:
    if d['id'] in ('d38', 'd39', 'd40', 'd41', 'd42', 'd43'):
        for n in d['nhip']:
            assert not n['gag'], ('gag trong doan nghiem', d['id'])
            assert set(n['sfx']) <= {'lat-giay'}, ('sfx trong doan nghiem', d['id'], n['sfx'])
# đủ lời: nối loi của mọi nhịp theo thứ tự = lời 17 cảnh
def toks(s): return [norm(w) for w in re.sub(r'_', ' ', s).split() if norm(w)]
loi_nhip = toks(' '.join(n['loi'] for d in D for n in d['nhip'] if n['loi']))
loi_that = toks(' '.join(sc['narration'] for sc in script['scenes']))
if loi_nhip != loi_that:
    i = next((k for k in range(min(len(loi_nhip), len(loi_that))) if loi_nhip[k] != loi_that[k]), min(len(loi_nhip), len(loi_that)))
    raise SystemExit(f'LOI NHIP LECH tai tu {i}: nhip={loi_nhip[max(0, i - 6):i + 6]} that={loi_that[max(0, i - 6):i + 6]}')
# mỗi nhịp có lời phải bắt đầu đúng chữ đầu của lời (±0,15 s, hoặc sớm hơn ≤ 0,2 s khi là mốc phản ứng)
for d in D:
    for n in d['nhip']:
        if not n['loi']: continue
        w0 = n['loi'].split()[0]
        sc = max(s for s in START if START[s] <= n['tai'] + 0.25)
        try:
            tt = T(sc, w0)
        except SystemExit:
            continue
        # tìm lần xuất hiện của chữ đầu gần mốc nhất
        cands = [START[k] + w['start'] for k in (sc, sc + 1) if k in START for w in sub[k - 1]['words'] if norm(w['text']) == norm(w0)]
        best = min(cands, key=lambda x: abs(x - n['tai']))
        if 0.25 < best - n['tai'] <= 1.0 and best < d['ket_thuc']:
            n['tai'] = round(best - 0.03, 3)   # nhịp mở đoạn nằm trong khoảng nghỉ: dời tới đúng chữ đầu của lời
            continue
        if not (-0.2 <= best - n['tai'] <= 0.25):
            print('CANH BAO moc nhip lech chu:', d['id'], n['tai'], repr(n['loi'][:40]), 'chu that', round(best, 2))

json.dump(out, open(P + '/hoat-hinh/phan-canh.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
tong = {}
for d in D:
    tong.setdefault(d['phong_cach'], [0, []]); tong[d['phong_cach']][0] += d['ket_thuc'] - d['bat_dau']; tong[d['phong_cach']][1].append(d['id'])
print('so doan', len(D), 'thoi luong', END, 'loi canh 17 het o', E(17), 'the ho chieu', t_hc0, t_hc1, 'SUMMER ONLY', t_so, 'canh 6', START[6])
for k, (s, ids) in tong.items(): print(k, round(s, 1), f'{100 * s / END:.1f}%', ' '.join(ids))
for d in D: print(d['id'], d['phong_cach'], d['bat_dau'], round(d['ket_thuc'] - d['bat_dau'], 2), d['vao'], d['ra'], len(d['nhip']))
the = [re.match(r'\[([a-z0-9-]+)\]', n['hanh_dong']) for d in D for n in d['nhip']]
the = [m.group(1) for m in the if m]
c = Counter(the); print('the', len(c), 'nhip co the', len(the), c.most_common(8))
ch = [d['bat_dau'] for a, d in zip(D, D[1:]) if a['phong_cach'] != d['phong_cach']]
for i in range(len(ch) - 2):
    if ch[i + 2] - ch[i] < 15: print('CANH BAO doi phong cach 3 lan trong 15 s quanh', ch[i])
run = [D[0]]
for d in D[1:] + [None]:
    if d is not None and d['phong_cach'] == run[-1]['phong_cach']: run.append(d)
    else:
        if run[-1]['ket_thuc'] - run[0]['bat_dau'] > 90: print('CANH BAO chuoi', run[0]['phong_cach'], run[0]['id'], run[-1]['id'])
        if d is not None: run = [d]
for d in D:
    if d['lop'] == 'hoi-uc' and d['id'] not in ('d38', 'd39', 'd40', 'd41', 'd42', 'd43') and not any(n['gag'] for n in d['nhip']):
        print('CANH BAO doan hoi uc khong gag', d['id'])
tai = sorted([n['tai'] for d in D for n in d['nhip']] + [d['bat_dau'] for d in D])
gaps = sorted(((b - a, a) for a, b in zip(tai, tai[1:])), reverse=True)[:8]
print('khoang nhip dai nhat', [(round(g, 1), round(a, 1)) for g, a in gaps])
