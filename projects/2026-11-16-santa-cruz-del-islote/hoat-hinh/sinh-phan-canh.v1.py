# Sinh hoat-hinh/phan-canh.json cho tập 4 Santa Cruz del Islote (dao-dien-hoat-hinh, 26/11/2026).
# Chạy: python projects/2026-11-16-santa-cruz-del-islote/hoat-hinh/sinh-phan-canh.py projects/2026-11-16-santa-cruz-del-islote
# Khung xuất 2560×1440 (xuat), toạ độ thiết kế 1920×1080. Mốc tuyệt đối tính từ audio/subtitles.json (Edge TTS, 16 cảnh).
import json, re, sys
from collections import Counter
P = sys.argv[1]
sub = json.load(open(P + '/audio/subtitles.json', encoding='utf8'))['scenes']
# khoảng nghỉ sau mỗi cảnh (giây). Trước chương: 1,5; cắt về bàn nghiêm (12→13) và sau đó (13→14): 2,0
GAP = {1: 1.0, 2: 1.5, 3: 1.2, 4: 1.5, 5: 1.0, 6: 1.2, 7: 1.5, 8: 1.0, 9: 1.5, 10: 1.0,
       11: 1.5, 12: 2.0, 13: 2.0, 14: 1.5, 15: 1.2}
START = {}; t = 0.4
for s in sub:
    START[s['id']] = round(t, 3); t += s['duration'] + GAP.get(s['id'], 0)
DUOI_A = round(START[16] - 0.6, 3)          # đoạn đuôi bắt đầu
END = round(DUOI_A + 20.0, 3)                # đuôi 20,0 s (end screen YouTube tối đa 20 s)
norm = lambda w: re.sub(r"[^a-z0-9'-]", '', w.lower())


def T(sc, phrase, end=False):
    """Mốc tuyệt đối của cụm từ (ghép token để chịu được token gộp như 'Up close', tên riêng)."""
    ws = sub[sc - 1]['words']; tgt = norm(phrase.replace(' ', ''))
    for i in range(len(ws)):
        acc = ''
        for j in range(i, len(ws)):
            acc += norm(ws[j]['text'])
            if acc == tgt:
                return round(START[sc] + (ws[j]['end'] if end else ws[i]['start']), 3)
            if not tgt.startswith(acc):
                break
    raise SystemExit(f'khong thay "{phrase}" o canh {sc}')


def E(sc): return round(START[sc] + sub[sc - 1]['duration'], 3)
def G(sc, k=0.5): return round(E(sc) + GAP[sc] * k, 3)
def B(sc, phrase): return round(T(sc, phrase) - 0.15, 3)


def N(tai, loi, hd, gag='', dc=(), sfx=()):
    return {'tai': round(tai, 3), 'loi': loi, 'hanh_dong': hd, 'gag': gag, 'dao_cu': list(dc), 'sfx': list(sfx)}


D = []
def seg(id, pc, a, b, lop, bc, tp, vao, ra, nhip, chu, ly, **kw):
    d = dict(id=id, phong_cach=pc, bat_dau=a, ket_thuc=b, lop=lop, boi_canh=bc, trang_phuc=tp,
             vao=vao, ra=ra, nhip=nhip, chu_tren_do_vat=chu, ly_do_phong_cach=ly)
    d.update(kw); D.append(d)


# ---------------- MẪU TRANG PHỤC, ĐẠO CỤ CHUNG 3 PHONG CÁCH (khoá liên tục tập 4) ----------------
MU = ('MŨ CÓI rộng vành (mẫu chung: vành giấy kraft #C9A46A, dải đỏ #C9463A quanh chóp, vài nét đan cói mảnh nếu tiện; '
      'cùng dáng ve-tay `sunhat`, diorama `api.muRongVanhSVG()`, cắt giấy theo mũ rộng vành của prelude Coober Pedy)')
BALO = ('BA LÔ KHỔNG LỒ (xanh ô liu #7C8646, viền tối #566030 = VT.PACK_MAU.oliu / api.baLoOliu; cuộn thảm đỏ buộc ngang nắp; '
        'hai túi hông; cao ≈ 1,6 thân Wob, đỉnh ba lô cao hơn đỉnh đầu Wob nửa thân, rộng ≈ 1,2 thân; diorama dùng api.baLoTo; '
        'khi đeo ba lô khổng lồ thì ẩn ba lô nhỏ mặc định của rig)')
XIT = ('BÌNH XỊT MUỖI (trụ trắng kem, nắp xanh ngọc #2A9D8F, nhãn chỉ có hình con muỗi gạch chéo, KHÔNG chữ; '
       'tem niêm phong đỏ #C9463A dán ngang nắp, LUÔN còn nguyên cả tập)')
MUOI = 'con muỗi giấy (thân nâu sẫm, chân dài mảnh, cánh trong, mắt to thân thiện)'
NHA = 'Ở NHÀ: không mũ, không đeo ba lô (rig noPack)'
DAO = ('hòn đảo kín nhà (nhà một tầng tường xanh, vàng, hồng, mái tôn xám bạc, sát mép nước, KHÔNG bãi cát, KHÔNG cây lớn, '
       'vài thuyền gỗ nhỏ quanh), nước xanh ngọc')
LOI_DI = ('lối đi hẹp giữa hai dãy nhà một tầng tường sơn xanh, vàng, hồng (tường hai bên gần chạm nhau, vẽ bằng giấy; '
          'ai-islote-lane CHỈ làm lớp xa nhất nếu thêm hai lớp tường giấy tiền cảnh thu hẹp lối: ảnh có lối rộng hơn thật), '
          'cửa mở, ghế nhựa, dây phơi; tranh tường cá, sóng, thuyền VẼ BẰNG GIẤY (ảnh không có)')
QUANG_TRUONG = ('quảng trường rất nhỏ vẽ bằng giấy: cây thánh giá cao đơn giản ĐỨNG GIỮA quảng trường, nhà một tầng tường màu quây sát quanh, '
                'ghế nhựa; KHÔNG cây to; KHÔNG dùng ai-islote-square (thánh giá đứng sau dãy nhà, có cây to)')
BAN = 'Bàn kỷ vật dưới đèn bàn ấm (cùng bàn mọi tập), sổ du lịch'

# ================= CHƯƠNG 1 · The Spray I Never Opened (cảnh 1–2) =================
b02 = G(1)
seg('d01', 'diorama', 0.0, b02, 'hien-tai',
    BAN + ' mở sau lưng Wob; trang trái dán bản đồ code map-islote (bản sao BỎ NHÃN CHỮ vì trên trang sổ chữ sẽ < 45 px; giữ bờ biển, ghim đảo ở nửa phải trang). '
    'Từ ghim bật dựng ' + DAO + ' dạng pop-up giấy.',
    NHA + '; cầm ' + XIT + '; đặt bình xịt xuống bàn ở nhịp lời chào. Ba lô khổng lồ KHÔNG có trong đoạn này',
    'dau-video', 'giay', [
    N(START[1], 'This is my mosquito spray.', '[day-vao-cham] Khung 0 đã có hình: Wob đứng cạnh bàn giơ sẵn bình xịt ngang mặt, tem niêm phong đỏ đọc rõ; sổ mở sau lưng có bản đồ bờ biển Caribe; camera đẩy chậm 1,0→1,05', '', ['binh-xit', 'so-du-lich', 'map-islote'], []),
    N(T(1, 'I took it to'), 'I took it to a tiny, warm island in the Caribbean, packed solid with houses.', 'Wob chĩa bình xịt về ghim trên trang sổ; đúng "packed" hòn đảo pop-up bật dựng khỏi ghim, nhà bật lên lần lượt từ mép này sang mép kia (đảo hiện rõ trước giây 6)', 'Hết chỗ: mái nhà cuối bị ép nảy vọt lên rồi chen xuống được', ['so-popup'], ['pop']),
    N(T(1, "The seal's") - 0.07, "The seal's still on.", '[take-cham] Wob bấm vòi xịt: vòi không nhúc nhích vì tem; Wob bấm mạnh hơn, cả người Wob nảy bật khỏi mặt bàn còn bình xịt đứng yên trong tay; đáp xuống, nhìn thẳng người xem, giữ 0,8 s', 'Người nảy, bình xịt không', ['binh-xit'], ['boing']),
    N(T(1, 'Nothing there'), 'Nothing there wanted to bite me.', 'Một ' + MUOI + ' bay vòng qua chụp đèn bàn, liếc Wob một cái, rồi bay thẳng ra khỏi khung không dừng', 'Muỗi lờ Wob', ['muoi-giay'], []),
    N(T(1, "Hi, I'm Wob"), "Hi, I'm Wob. I collect odd places, and the reasons people stay in them.", 'LỜI CHÀO NHẬN DIỆN (skill mo-ket): Wob đặt bình xịt xuống bàn (tem quay ra), vẫy tay với người xem. THẺ HỘ CHIẾU giấy lật vào góc trái trên (x 96–760, y 54–420; không che mặt Wob, không vào vùng logo x > 1500, y < 150): dòng SANTA CRUZ DEL ISLOTE, dòng COLOMBIA, dòng Would Wob move here?, một ô con dấu vuông còn TRỐNG; chữ ≥ 45 px; hiện đủ 3 s rồi lật đi trước chữ "people"', '', ['the-ho-chieu', 'binh-xit'], ['whoosh']),
    N(E(1) + 0.05, '', '[lao-vao-hinh-ve] Camera lao vào hòn đảo pop-up trên trang sổ; 0,5 s cuối phủ dần thành giấy phẳng #EFE3C8', '', ['so-popup'], []),
    ], ['SANTA CRUZ DEL ISLOTE', 'COLOMBIA', 'Would Wob move here?'],
    'Khung hiện tại ở bàn kỷ vật (luật: chỉ diorama). Đảo khuôn so với tập 3 (mở ở hiện trường): tập 4 mở ở bàn với bình xịt theo ghi_chu_khung; sổ pop-up bật hòn đảo kín nhà ở giây ~5 thay cho chèn ảnh, đỡ đổi phong cách trong 15 s đầu. Thẻ hộ chiếu theo mo-ket. Sfx thẻ: sổ sfx không có tiếng lật giấy → whoosh âm lượng nhỏ',
    the_ho_chieu={'cue': "Hi, I'm Wob", 'noi': 'Santa Cruz del Islote', 'nuoc': 'Colombia'})

b03 = B(2, 'So why squeeze')
seg('d02', 'cat-giay', b02, b03, 'hoi-uc',
    'Biển Caribe xanh ngọc lặng giữa trưa, parallax nhiều lớp: tiền cảnh thuyền gỗ nhỏ có máy ngoài (thân xanh dương bạc màu, viền trắng); xa: ' + DAO +
    ' vẽ bằng giấy cắt; lớp xa nhất: các đảo thấp xanh có bãi cát và hàng cây. ai-caribbean-islets chỉ làm lớp trời-biển xa (cắt bỏ dải bãi tiền cảnh); KHÔNG dùng ai-islote-aerial ở đây (nền cam đọc như cát, nhà mái dốc). Nhịp sân bóng: góc nhìn từ trên cao, đảo giấy phẳng',
    MU + '; ' + BALO + ' chiếm trọn băng ghế phía sau thuyền; Wob ngồi mũi thuyền',
    'giay', 'cat', [
    N(b02 + 0.05, "The island is Santa Cruz del Islote, off Colombia's Caribbean coast.", '[tien-canh-khung] Từ giấy phẳng hiện dần: mũi thuyền và vành mũ cói làm tiền cảnh 1/3 khung trái; hòn đảo kín nhà mọc lên ở đường chân trời; Wob ngồi mũi thuyền nhìn tới', '', ['thuyen-go', 'mu-coi', 'ba-lo-khong-lo'], []),
    N(T(2, 'From the boat'), 'From the boat, it looked like someone had parked a neighbourhood on the sea.', 'Camera đẩy chậm vào đảo: dãy nhà sát mép nước như nổi trên mặt biển; một con sóng nhỏ liếm vào bậc cửa nhà ngoài cùng rồi rút', '', [], []),
    N(T(2, 'It covers'), 'It covers about as much ground as two soccer fields.', 'Góc nhìn từ trên cao: hai sân bóng giấy xanh lá kẻ vạch trắng trượt vào từ hai bên, úp khít lên hòn đảo; thẻ giấy ~1 ha · 2 soccer fields bật lên ở mép dưới (x < 1500)', 'Một quả bóng giấy lăn khỏi "sân", rơi tõm xuống biển', ['san-bong-giay'], ['pop', 'drop']),
    N(T(2, 'Newspapers often'), 'Newspapers often call it one of the most densely populated islands in the world. No one agrees on the headcount, though.', 'Ba tấm biển giấy nhô lên từ ba mái nhà, mỗi tấm chỉ một dấu hỏi to (không chữ, không số); tấm thứ ba nhô chậm hơn và nghiêng', '', [], ['pop']),
    N(T(2, 'Around it'), 'Around it sit bigger islands, with beaches, trees and room to spare.', '[luot-smootherstep] Về góc nhìn từ thuyền, camera lướt sang phải: các đảo xanh rộng có bãi cát, hàng cây, trống trải; Wob ngoái theo', '', [], []),
    ], ['~1 ha · 2 soccer fields'],
    'Hành trình đến nơi trên thuyền, parallax biển–đảo: cắt giấy. C01–C03; C02 mức C nên không ghi danh hiệu lên hình, chỉ dấu hỏi')

b04 = B(2, 'I came to see')
seg('d03', 've-tay', b03, b04, 'hoi-uc',
    'Vẽ tay nét sôi: cận Wob trên thuyền, hòn đảo nhà vẽ tay phía sau bên trái, đảo có cây và đước vẽ tay bên phải',
    MU + ' (ve-tay sunhat); ba lô khổng lồ khuất dưới mép khung cận', 'chen', 'cat', [
    N(b03, 'So why squeeze onto this one?', '[chen-ve-tay] Hình to: Wob tự ép người dẹt lại như đang chen giữa hai mái nhà vẽ tay, má phồng, mắt híp', 'Wob ép dẹt như chen xe buýt', [], ['whoosh']),
    N(T(2, 'The answer turned'), 'The answer turned out to be very small, and it buzzes.', '[lia-theo-vat] Một con muỗi vẽ tay bay ba vòng quanh vành mũ cói; mắt Wob đảo theo tới lác', 'Mắt Wob lác theo muỗi', ['muoi'], []),
    N(T(2, 'As locals tell it'), "As locals tell it, the first fishermen stayed because the mosquitoes didn't.", 'Con muỗi xách một va li tí hon bay khỏi đảo nhà sang đảo có cây, không ngoái lại; giữ 0,6 s trên đảo nhà yên lặng', 'Muỗi xách va li dọn đi', ['muoi'], []),
    ], [],
    'Gag cận mặt, cường điệu (muỗi xách va li): vẽ tay chèn. Nhá lý do không muỗi trong 35 s đầu (C04 mức C, lời đã rào "As locals tell it")')

b05 = B(3, 'Up close')
seg('d04', 'cat-giay', b04, b05, 'hoi-uc',
    'Như d02: cùng thuyền gỗ giữa biển; từ đầu chương 2 sóng lớn hơn. Trang sổ của Wob: journalPage + mapSticker map-san-bernardo (Cartagena trên, Tolú dưới bờ vịnh, đảo giữa trái; Natural Earth không có đảo nhỏ nên chấm đảo vẽ bằng mapDot); đường thuyền nét đứt Cartagena → đảo thợ vẽ từ toạ độ (ghi chú manifest), đường thứ hai Tolú → đảo vẽ sau. Nếu nhãn Cartagena rơi vào x > 1500, y < 150 thì dời khung bản đồ',
    MU + '; ' + BALO + '. Tới "I spent them": ba lô trên băng ghế; từ đó Wob ôm ba lô trên đùi. Sau con sóng ("splashed") cả Wob và ba lô ướt, nhỏ nước tới hết đoạn',
    'cat', 'cat', [
    N(b04 + 0.05, 'I came to see if there was room for one more.', 'Wob trên thuyền vỗ ngực tự tin, giơ một ngón tay', '', [], []),
    N(T(2, "I'd packed"), "I'd packed a huge backpack. That was my first mistake.", '[giu-tinh-bo] Thuyền nghiêng hẳn về phía ba lô khổng lồ ở băng ghế sau, mũi thuyền chổng lên; Wob lặng lẽ trèo sang ngồi lên ba lô, thuyền cân lại; Wob nhìn thẳng người xem, giữ 0,8 s', 'Thuyền nghiêng theo ba lô', ['ba-lo-khong-lo'], ['bonk']),
    N(START[3], 'The boat from Cartagena takes a couple of hours, more if the sea is rough.', '[trang-so-ban-do] Wob mở sổ trên đùi: map-san-bernardo dán trong khung giấy xé; nét đứt Cartagena → đảo vẽ dần đúng "couple of hours", thẻ ~2 h by boat bật lên; sóng làm trang sổ rung', '', ['so-du-lich', 'map-san-bernardo'], ['pop']),
    N(T(3, 'I spent them'), 'I spent them holding the backpack on my lap like a nervous dog. We both got splashed.', 'Wob ôm ba lô trên đùi, vuốt nắp ba lô như vuốt đầu chó; đúng "splashed" một con sóng giấy tạt trúng cả hai', 'Wob lau nước cho ba lô trước rồi mới lau mặt mình', ['ba-lo-khong-lo'], ['whoosh']),
    N(T(3, "There's a shorter"), "There's a shorter ride from Tolú, forty-five minutes to an hour by small motorboat, depending on who you ask. I found that out on the way back.", 'Trang sổ ướt: nét đứt thứ hai Tolú → đảo vẽ dần, ngắn hơn hẳn; thẻ 45 min–1 h; đúng "on the way back" Wob úp trang sổ ướt lên trán', 'Wob úp sổ lên trán', ['so-du-lich'], ['ting']),
    ], ['~2 h by boat', '45 min–1 h', 'Cartagena', 'Tolú', 'Santa Cruz del Islote'],
    'Hành trình + bản đồ trang sổ có nét đứt: cắt giấy (journalPage, mapSticker, mapDot có sẵn). Nhãn ghim của bản đồ phải ≥ 45 px. C05, C06 mức C: giữ dấu ~ và khoảng 45 min–1 h')

# ================= CHƯƠNG 2 · An Island Made Mostly of Houses (cảnh 3–4) =================
b06 = B(3, 'There are no cars')
seg('d05', 'cat-giay', b05, b06, 'hoi-uc',
    'Cập bến đảo; mặt cắt giấy nhiều lớp: dải đất mỏng dưới đống nhà; rồi khung từ một ô cửa sơn xanh lùi dần: ' + LOI_DI + '; trường học (biển SCHOOL), quán ăn có ghế nhựa; ' + QUANG_TRUONG + '; cuối cùng cả đảo giữa biển',
    MU + '; ' + BALO + ' trên lưng (ướt loang)', 'cat', 'cat', [
    N(b05 + 0.05, 'Up close, the island does have land under it. Just not much.', 'Thuyền cập bến; một cây bút chì khổng lồ thò vào khung tô vội một dải đất mỏng dưới đống nhà', 'Bút chì hết mực giữa chừng, dải đất cụt lủn; đầu bút nhấc lên ngượng ngùng rồi rút đi', ['but-chi-to'], ['xuoc-dia']),
    N(T(3, 'More than a hundred'), "More than a hundred houses stand shoulder to shoulder. Colombia's twenty eighteen census counted a hundred and twenty.", '[lui-ra-toan-canh] Khung bắt đầu từ một ô cửa sơn xanh có tranh tường cá; camera lùi dần: dãy nhà vai chạm vai, mái tôn so le; đúng "a hundred and twenty" thẻ giấy 120 houses · Census 2018 dán lên một bức tường', '', [], ['ting']),
    N(T(3, "There's a school"), "There's a school, a restaurant and a little square.", 'Tiếp tục lùi: trường học có biển SCHOOL, quán ăn ghế nhựa, quảng trường nhỏ; Wob đi ngang lối, ba lô quệt mái hiên', '', [], []),
    N(T(3, 'In the square'), 'In the square stands a cross, and the cross gave the island its name.', '[wob-be-ti] Cận cây thánh giá cao đơn giản giữa quảng trường; Wob bé tí dưới chân ngước nhìn, vành mũ cói ngửa ra sau; giữ 1 s (tôn trọng, không gag ở thánh giá)', '', [], []),
    ], ['120 houses · Census 2018', 'SCHOOL'],
    'Phóng quy mô (khuôn phong-quy-mo) bằng mặt cắt nhiều lớp và lùi máy: cắt giấy; diorama để dành cho khung hiện tại để giữ tỉ lệ ≤ 20%. C07 (120 nhà, điều tra 2018)')

b07 = B(3, 'I looked for')
seg('d06', 've-tay', b06, b07, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: hòn đảo kín nhà nhìn ngang, mép đảo sát nước',
    'Wob vẽ tay nhỏ ở mép khung, mũ cói', 'chen', 'cat', [
    N(b06, 'There are no cars. A car here would run out of island long before it ran out of fuel.', '[bong-bong-tuong-tuong] Hình to: chiếc xe đồ chơi vẽ tay nổ máy trên đảo, chạy được ba căn nhà thì lao khỏi mép đảo, rơi xuống nước, chỉ còn bong bóng nổi; Wob nhỏ ở mép khung bịt mắt', 'Kim xăng trên xe vẫn đầy khi xe chìm', ['xe-do-choi'], ['whoosh', 'may-no', 'drop']),
    ], [], 'Giả định tưởng tượng: vẽ tay chèn')

b08 = B(4, 'Island rule')
seg('d07', 'cat-giay', b07, b08, 'hoi-uc',
    LOI_DI.capitalize() + '; mép đảo và biển ở cuối lối; bậu cửa sổ sơn xanh có con mèo nằm',
    MU + '; ' + BALO + ' trên lưng tới "I took it off"; từ đó Wob ôm ba lô trước ngực, đi nghiêng ngang. Đồng hồ đeo tay mặt không số (chỉ ở nhịp đi vòng đảo)',
    'cat', 'chen', [
    N(b07 + 0.05, "I looked for somewhere to put my bag down. I'm still looking.", 'Wob đứng giữa lối đi, ba lô khổng lồ trên lưng, xoay một vòng tìm chỗ trống: hướng nào cũng là tường, cửa, ghế; dừng lại, giữ 0,6 s', '', ['ba-lo-khong-lo'], []),
    N(START[4], 'So I walked around the whole island before lunch. I finished before I got hungry.', '[di-bo-parallax] Wob đi một vòng sát mép đảo (đi bộ có chu kỳ, ba lô nảy trễ), về đúng chỗ xuất phát', 'Kim đồng hồ đeo tay chưa nhích; Wob gõ gõ mặt đồng hồ', ['dong-ho-tay'], []),
    N(T(4, 'Then I tried'), 'Then I tried a shortcut between a pair of houses. My backpack tried it too. Only one of us made it through.', '[take-cham] Wob lách qua khe giữa hai bức tường sơn màu, lọt qua; ba lô kẹt cứng phía sau; Wob bước tiếp, bị giật ngược, quay nhìn ra sau, dừng, rồi mới hiểu', 'Ba lô kẹt, Wob bị giật ngược', ['ba-lo-khong-lo'], ['bonk']),
    N(T(4, 'I pulled'), "I pulled. The backpack pulled back. The houses didn't move at all.", 'Kéo co: Wob ngả người kéo quai, thân Wob giãn dài; ba lô ghì lại; hai bức tường không nhúc nhích một li', 'Kéo co với ba lô', [], ['boing']),
    N(T(4, 'A kid strolled'), 'A kid strolled past, looked at me, looked at the backpack, and kept going, with the kind of politeness that hurts.', 'Một cậu bé dạng hình nhỏ thân thiện (người giấy chung, chỉ chấm mắt, không mặt chi tiết, không trang phục cụ thể) đi ngang, quay đầu nhìn Wob, nhìn ba lô, đi tiếp đều bước; Wob đứng im, hơi cúi đầu. Không đùa về cậu bé: gag nằm ở Wob', '', [], []),
    N(T(4, 'I took it off'), 'I took it off and carried it in front of me like a sofa. Every corner I turned, the backpack turned it first and hit something.', 'Wob tháo ba lô, ôm trước ngực, đi nghiêng ngang qua lối hẹp; mỗi góc rẽ ba lô quẹo trước và đập vào tường, Wob khựng theo; lần ba đập vào khung cửa sổ có mèo', '', ['ba-lo-khong-lo'], ['bonk']),
    N(T(4, 'A cat'), 'A cat on a windowsill watched the whole thing without blinking.', 'Con mèo trên bậu cửa sổ sơn xanh, mắt dõi theo Wob và ba lô; cú đập trúng khung cửa: mèo không chớp mắt, chỉ đuôi khẽ ve vẩy một lần; giữ 0,6 s', 'Mèo không chớp, chỉ ve vẩy đuôi', ['meo'], []),
    ], [],
    'Đi bộ dọc lối hẹp, kéo co vật lý, nhiều lớp tường: cắt giấy. Cậu bé vẽ nhỏ, thân thiện; gag dồn vào Wob và ba lô')

b09 = G(4)
seg('d08', 've-tay', b08, b09, 'hoi-uc',
    'Vẽ tay: góc lối đi, tấm biển vẽ tay treo trên tường; rồi ghế nhựa dài',
    MU + '; ba lô khổng lồ đặt dưới đất, nắp mở; nhịp cuối ba lô "ngồi" một đầu ghế', 'chen', 'giay', [
    N(b08, 'Island rule: bring less. Then bring less again.', '[leo-thang-ba-lan] Hình to: Wob lôi đồ khỏi ba lô mở nắp: lần một một cái ô, lần hai một chiếc ghế xếp, lần ba một chiếc phao bơi hình vịt to hơn cả ba lô; tấm biển BRING LESS trên tường sau lưng', 'Ba lô chứa đồ to hơn chính nó', ['ba-lo-khong-lo'], ['whoosh', 'pop', 'boing']),
    N(T(4, 'By lunchtime'), "By lunchtime, the backpack and I weren't speaking.", '[giu-tinh-bo] Wob ngồi một đầu ghế nhựa, ba lô ngồi đầu kia, quay lưng vào nhau, Wob khoanh tay; giữ 1 s rồi phủ dần thành giấy', 'Wob và ba lô giận nhau', [], ['im-lang']),
    ], ['BRING LESS'],
    'Punchline mồi chú ý cuối chương, cường điệu: vẽ tay chèn')

# ================= CHƯƠNG 3 · The Mosquito Reason (cảnh 5–7) =================
b10 = B(5, 'Then I asked around')
seg('d09', 've-tay', b09, b10, 'hoi-uc',
    'Vẽ tay trên trang sổ phác thảo: sơ đồ hòn đảo, mũi tên, dấu X, rương báu; rồi nền xi măng lối đi vẽ tay',
    MU + ' (ve-tay sunhat); ba lô khổng lồ dựng dựa tường (không đeo); cầm xẻng nhựa đỏ, rồi nắp chai', 'giay', 'cat', [
    N(START[5], 'So why here, of all the islands? I had a theory. Treasure. A tiny island, a long time ago, somebody must have buried something.', '[so-do-ve-tay] Từ giấy phẳng, nét mực vẽ dần: hòn đảo, mũi tên, dấu X đỏ, rương báu; Wob nhỏ đứng cạnh sơ đồ chỉ vào X, mắt sáng rỡ', '', ['so-phac-thao'], ['ting']),
    N(T(5, 'I borrowed'), 'I borrowed a plastic spade. The ground was coral and cement. The spade folded like a napkin.', '[va-cham-vat-ly] Wob cắm xẻng nhựa đỏ xuống nền xi măng; xẻng gập đôi như khăn giấy', 'Wob gấp nốt xẻng cho vuông vức rồi giấu ra sau lưng', ['xeng-nhua'], ['bonk']),
    N(T(5, 'I dug'), 'I dug with my hands for a while. I found a bottle cap and a strong sense of shame.', 'Wob quỳ, hai tay bới khe đá; giơ lên một cái nắp chai, tia sáng lóe đúng một nhịp rồi tắt phụt', 'Wob kéo vành mũ cói sụp xuống che kín mắt, má đỏ vì xấu hổ (trọng tâm là cái mũ, tránh lặp gag nắp chai kim cương tập 3)', ['nap-chai'], ['de-kem']),
    ], [],
    'Đoán sai (khuôn doan-sai-roi-lat): sơ đồ vẽ tay + gag biểu cảm to: vẽ tay')

b11 = B(6, 'The islands next door')
seg('d10', 'cat-giay', b10, b11, 'hoi-uc',
    'Đầu đoạn: lối đi như d07, Wob ngồi ghế nhựa cạnh một người lớn tuổi dạng bóng giấy chung (nhìn từ sau, không mặt) đang kể, tay chỉ ra biển. Rồi trang lịch sử tông giấy cũ sepia: hòn đảo đá san hô nhỏ trơ trụi giữa biển, sóng vỗ, chưa nhà chưa cây (vẽ bằng giấy; ai-bare-islet chỉ làm lớp trời-biển xa nếu khớp tông, đảo trong ảnh quá xa và nhỏ); thuyền gỗ, mây bão đen ngoài khơi; cuối đoạn đêm sao trên đảo xưa',
    MU + '; ba lô khổng lồ dựa tường ở cảnh lối đi; ở trang lịch sử Wob đứng NGOÀI mép trang sổ (lớp chuyến đi), chỉ quan sát',
    'cat', 'chen', [
    N(b10 + 0.05, "Then I asked around about the island's past, and the real story beat treasure easily.", '[lat-the] Wob ngồi nghe người lớn tuổi (bóng giấy chung) kể; tờ sơ đồ kho báu trong tay Wob lật mặt: mặt sau là trang sổ tông cũ', '', ['so-phac-thao'], []),
    N(T(5, 'About a hundred and fifty'), 'About a hundred and fifty years ago, this was a bare little island with nobody living on it.', 'Trang tông cũ: hòn đảo đá trơ trụi, sóng vỗ quanh mép; thẻ giấy ~150 years ago', '', [], []),
    N(T(5, 'Fishermen working'), 'Fishermen working these waters used it to rest and to wait out storms.', 'Thuyền gỗ của ba ngư dân (người giấy chung, không mặt, tôn trọng) kéo lên đảo; mây bão đen ngoài khơi; người ngồi tựa thuyền chờ', '', [], []),
    N(T(5, 'That explains a stop'), "That explains a stop. It doesn't explain a town.", 'Wob ở mép khung chống cằm; trên đảo xưa bật dựng một dấu hỏi giấy to hơn cả hòn đảo, rung nhẹ, giữ 0,6 s', 'Dấu hỏi to hơn hòn đảo', [], ['pop']),
    N(START[6], 'The town part comes down to something very small. Night fell, the fishermen settled in, and nothing bit them.', 'Đêm trên đảo xưa: ngư dân nằm ngủ cạnh thuyền, sao đầy trời, im lặng', 'Một ' + MUOI + ' bay tới mép đảo, nhìn, quay đầu bay đi', ['muoi-giay'], []),
    ], ['~150 years ago'],
    'Chuyện định cư có thật: cắt giấy tông cũ, kể tôn trọng; gag chỉ ở Wob, dấu hỏi và con muỗi. C08, C09')

b12 = B(6, 'So the fishermen stayed')
seg('d11', 've-tay', b11, b12, 'hoi-uc',
    'Vẽ tay: đảo bên cạnh viền rừng ngập mặn (rễ đước vẽ rõ) và dải cát; rồi bong bóng tưởng tượng cửa một bữa tiệc',
    'Wob vẽ tay đội mũ cói xuất hiện trong bữa tiệc tưởng tượng (đổi sang mũ tiệc giấy chỉ trong bong bóng)', 'chen', 'cat', [
    N(b11, "The islands next door have mangroves and beaches, and that's where the biting crowd hangs out.", '[chen-ve-tay] Hình to: bầy muỗi nhảy nhót dưới quả cầu disco treo trên cành đước', 'Một con muỗi ra "quầy" gọi đồ uống; quầy là một vũng nước đọng', ['muoi'], ['whoosh']),
    N(T(6, 'Locals say'), 'Locals say this island had neither, so the mosquitoes stayed over there.', 'Lia sang hòn đảo xưa trơ trụi: không đước, không cát; một con muỗi đứng mép đảo tiệc chống nạnh nhìn sang, lắc đầu', '', ['muoi'], []),
    N(T(6, 'Picture a party'), "Picture a party where everyone's invited except the guest who bites. You'd stay at that party too.", '[bong-bong-tuong-tuong] Cửa bữa tiệc dán tấm biển hình con muỗi gạch chéo (không chữ); bên trong Wob đội mũ tiệc vẫy tay; con muỗi đội mũ tiệc gõ cửa, không ai mở', 'Muỗi chờ rồi lẳng lặng tháo mũ tiệc', ['muoi'], ['bonk']),
    ], [],
    'Cơ chế kể bằng cường điệu và so sánh tưởng tượng (bữa tiệc): vẽ tay. C10 mức C, lời đã rào "Locals say"')

b13 = G(6)
seg('d12', 'cat-giay', b12, b13, 'hoi-uc',
    'Cắt giấy: mép đảo xưa tông ấm dần; bàn tay người giấy chung đặt từng tảng san hô, đá, vỏ sò; đảo nở rộng từng nấc, nhà mọc theo; rồi về chuyến đi hiện tại: nền đất lối đi, mép đảo, biển',
    MU + '; ba lô khổng lồ đặt dưới đất cạnh tường (không đeo); hai tay nâng vỏ sò dẹt; thước dây giấy', 'cat', 'giay', [
    N(b12 + 0.05, 'So the fishermen stayed. And since the island was small, they made it bigger.', 'Ngư dân (người giấy chung) dỡ đồ khỏi thuyền, dựng mái nhà đầu tiên trên đảo', '', [], []),
    N(T(6, 'They piled'), 'They piled up coral, stone and shells, plus whatever the sea washed up, and later they poured cement.', 'Bàn tay người giấy xếp san hô, đá, vỏ sò ra mép nước; đảo nở rộng ba nấc, mỗi nấc một hàng nhà mọc theo; cuối cùng lớp xi măng xám láng lên mặt', '', [], ['pop', 'pop', 'pop']),
    N(T(6, 'Some of the ground'), "Some of the ground under me was built by somebody's great-grandparents.", 'Hiện tại chuyến đi: Wob cúi xuống gõ nhẹ hai cái lên nền đất như gõ cửa nhà ai, rồi rụt tay lại lễ phép', '', [], []),
    N(T(6, 'I tried to help'), "I tried to help. I found a nice flat shell, carried it to the edge and set it down very carefully. The island didn't get noticeably bigger. Fair enough.", 'Wob nâng một vỏ sò dẹt bằng hai tay, đi từng bước ra mép đảo, đặt xuống; thước dây giấy đo mép đảo trước và sau', 'Thước dây không nhích một vạch; Wob gật đầu chấp nhận, giữ 0,6 s, rồi phủ dần thành giấy', ['vo-so', 'thuoc-day'], ['ting']),
    ], [],
    'Người dân tự đắp đảo (sự thật quan trọng, kể tôn trọng): cắt giấy, đảo nở từng nấc nhiều lớp. C11')

b14 = B(7, 'Across the channel')
seg('d13', 'cat-giay', b13, b14, 'hoi-uc',
    'Đêm ở mép đảo: trăng trên biển, mặt nước tối có ánh đèn ấm phản chiếu; dãy nhà sau lưng; xa bên kia kênh là đảo đước tối. Nếu dùng ai-islote-night làm phông xa thì che khối đồi tối sau nhà bằng lớp trời giấy (đảo thật PHẲNG)',
    MU + '; ba lô khổng lồ đặt cạnh; ' + XIT + ' cắm túi hông ba lô', 'giay', 'chen', [
    N(START[7], "I didn't take the story on trust. That evening I sat on the edge of the island and held one arm out over the water, like bait.", 'Wob ngồi mép đảo, một tay chìa ra trên mặt nước như cần câu; nheo mắt nhìn sang đảo đước', 'Wob buộc thêm sợi chỉ có lưỡi câu giấy vào ngón tay chìa ra', [], []),
    ], [], 'Cảnh thật ngoài trời ban đêm nhiều lớp: cắt giấy')

b15 = B(7, 'At midnight')
seg('d14', 've-tay', b14, b15, 'hoi-uc',
    'Vẽ tay: bên kia kênh (đảo đước), rồi cận Wob ở mép đảo dưới trăng',
    MU + ' tới "I took my hat off"; từ đó KHÔNG mũ (mũ đặt bên cạnh) tới hết d15', 'chen', 'cat', [
    N(b14, 'Across the channel, I could practically hear the mosquitoes planning dinner.', '[chen-ve-tay] Hình to: bầy muỗi chụm đầu quanh một tờ thực đơn chỉ có hình vẽ món ăn (không chữ); một con chỉ về phía Wob', 'Cả bầy lắc đầu, lật sang trang khác', ['muoi'], ['whoosh']),
    N(T(7, 'Over here'), 'Over here, nothing. I waved the arm a little, to look tastier. Still nothing.', '[leo-thang-ba-lan] Cận Wob: vẫy tay lần một nhẹ, lần hai mạnh hơn, lần ba giơ tấm bảng vẽ hình dĩa và nĩa có mũi tên chỉ vào cánh tay mình (KHÔNG chữ: "FREE DINNER" của y_hinh bỏ vì không có trong lời); không con muỗi nào tới', 'Wob tự quảng cáo làm bữa tối', [], ['im-lang']),
    N(T(7, 'I took my hat'), "I took my hat off, in case the hat was the problem. It wasn't.", 'Wob bỏ mũ cói đặt sang bên, chìa cái đầu tròn ra mời; chờ; không có gì', '', ['mu-coi'], []),
    ], [], 'Leo thang ba lần, biểu cảm to: vẽ tay chèn giữa cảnh đêm cắt giấy')

b16 = G(7)
seg('d15', 'cat-giay', b15, b16, 'hoi-uc',
    'Đêm rồi sáng ở mép nhà gần mép đảo (cùng nơi d13); chiếu nằm, ba lô làm gối',
    'KHÔNG mũ (mũ cói đặt cạnh gối như mũ trụ); ba lô khổng lồ làm gối; ôm ' + XIT + ' dựng đứng trước ngực', 'cat', 'giay', [
    N(b15 + 0.05, 'At midnight I went to bed with the spray in my hand, unopened, like a sword I never got to swing.', 'Wob nằm ngủ, gối đầu lên ba lô khổng lồ, ôm bình xịt (tem nguyên) dựng đứng trước ngực như hiệp sĩ ôm kiếm', 'Mũ cói đặt cạnh gối như mũ trụ của hiệp sĩ', ['binh-xit'], []),
    N(T(7, 'In the morning'), 'In the morning I checked my arm. Not a bump.', '[day-vao-cham] Sáng: Wob soi cánh tay dưới kính lúp, da trơn láng, xoay qua xoay lại', '', ['kinh-lup'], []),
    N(T(7, 'I have never'), 'I have never been so offended to be ignored.', 'Wob khoanh tay, phồng má hờn dỗi nhìn sang đảo đước; giữ 0,8 s rồi phủ dần thành giấy', 'Wob hờn vì không bị đốt', [], []),
    ], [], 'Cảnh thật đêm/sáng cùng nơi với d13: cắt giấy')

# ================= CHƯƠNG 4 · Nobody Agrees on the Headcount (cảnh 8–9) =================
b17 = B(8, 'Think of a jar')
seg('d16', 'cat-giay', b16, b17, 'hoi-uc',
    QUANG_TRUONG[0].upper() + QUANG_TRUONG[1:] + ', ban ngày. Bốn tấm biển giấy bật lên từ sau mái nhà, mọi chữ đặt dưới y 150 hoặc ở x < 1500 (tránh logo)',
    MU + ' (đội lại); ba lô khổng lồ dựa chân; cầm cái bấm đếm', 'giay', 'chen', [
    N(START[8], 'Next, an easy question, I thought. How many people live here?', 'Wob đứng giữa quảng trường, giơ cái bấm đếm, tự tin bấm một cái', '', ['bam-dem'], []),
    N(T(8, "A figure you'll"), "A figure you'll see everywhere is about twelve hundred.", 'Tấm biển giấy thứ nhất bật lên: ~1,200', '', [], ['pop']),
    N(T(8, "A man who'd"), "A man who'd lived here his whole life told CNN it was closer to nine hundred.", 'Tấm thứ hai bật lên cạnh đó: ~900, đẩy tấm thứ nhất nghiêng sang', '', [], ['pop']),
    N(T(8, "Colombia's national"), "Colombia's national census in twenty eighteen counted a little over four hundred. The one before, in two thousand five, counted five hundred and eighty.", 'Tấm thứ ba: 432 · Census 2018; tấm thứ tư bật lên sau: 580 · Census 2005; bốn tấm chen nhau, lấn vai nhau, tấm nào cũng nhón lên cho cao hơn (chữ không bị che)', 'Bốn con số chen nhau như người xếp hàng', [], ['pop', 'pop']),
    N(T(8, 'Estimates vary'), 'Estimates vary, to put it gently.', '[giu-tinh-bo] Wob nhìn bốn tấm biển, nhìn cái bấm đếm, nhìn người xem; giữ 0,8 s', '', ['bam-dem'], []),
    ], ['~1,200', '~900', '432 · Census 2018', '580 · Census 2005'],
    'Con số trên đồ vật trong cảnh thật (khuôn so-sanh-doi-thuong, phần đặt vấn đề): cắt giấy. C12–C14 mức C: giữ dấu ~, ghi năm điều tra')

b18 = G(8)
seg('d17', 've-tay', b17, b18, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: hũ kẹo ở hội chợ có cầu tàu nhỏ; rồi cận Wob ở quảng trường',
    MU + ' (ve-tay sunhat); cầm cái bấm đếm', 'chen', 'cat', [
    N(b17, 'Think of a jar of jelly beans at a fair. Everyone guesses, nobody agrees, and the beans keep hopping on and off boats.', '[bong-bong-tuong-tuong] Hũ kẹo ở hội chợ, nhiều bàn tay vẽ chung giơ phiếu đoán (phiếu chỉ có dấu hỏi); hũ có cầu tàu nhỏ: kẹo đội mũ cói xếp hàng lên thuyền, kẹo khác nhảy xuống', 'Kẹo lên xuống thuyền', [], ['whoosh']),
    N(T(8, 'I bought a clicker'), 'I bought a clicker counter anyway. It overheated.', 'Cận: Wob bấm đếm liên hồi, cái bấm đếm bốc khói nghi ngút; Wob thổi phù như thổi nến', 'Khói xoắn lại thành dấu hỏi', ['bam-dem'], ['hoi-nuoc']),
    ], [], 'So sánh đời thường (hũ kẹo) + gag cận: vẽ tay')

b19 = B(9, 'In the evening')
seg('d18', 'cat-giay', b18, b19, 'hoi-uc',
    LOI_DI.capitalize() + ', ban ngày (cùng màu tường d07); người giấy nhỏ dạng chung',
    MU + '; ôm ' + BALO + ' trước ngực; cái bấm đếm đặt lên bậu cửa ở nhịp đầu', 'cat', 'cat', [
    N(b18 + 0.05, 'I gave up counting and just watched. Whatever the real number is, the island is full. Doors stand open.', 'Wob đặt cái bấm đếm còn bốc khói lên bậu cửa sổ; đứng tựa ba lô nhìn dọc lối, các cửa mở', '', ['bam-dem'], []),
    N(T(9, 'Neighbours chat'), 'Neighbours chat across the lane without raising their voices, because the lane is narrower than my backpack.', 'Hai người giấy dạng chung đứng ở hai cửa đối diện nói chuyện qua lối (bóng thoại chỉ có hình vẽ, không chữ); Wob ôm ba lô ướm vào đầu lối: ba lô rộng hơn lối, Wob lùi lại đứng chờ', 'Ba lô rộng hơn cả lối đi', [], []),
    N(T(9, 'Kids dart'), 'Kids dart between walls that almost touch.', 'Ba người giấy nhỏ (trẻ con, dạng chung) chạy qua lối từ trái sang, lách qua dưới gầm ba lô Wob đang giơ lên cao', 'Wob phải giơ ba lô lên cho trẻ con chạy qua', [], []),
    N(T(9, 'A foundation'), 'A foundation and the Colombian Navy repainted the fronts of the houses, and nine murals went up, painted with the community.', '[lia-theo-vat] Camera lia dọc tường: tranh tường cá, sóng, thuyền lần lượt hiện; một cây cọ sơn giấy lướt qua tô nốt màu cuối; Wob đứng ngắm', '', [], []),
    ], [], 'Đời sống trên lối hẹp, nhiều lớp tường: cắt giấy. Người dân dạng chung, tôn trọng; gag ở ba lô. C15')

b20 = G(9)
seg('d19', 'cat-giay', b19, b20, 'hoi-uc',
    'Cùng quảng trường d16 lúc chạng vạng (cam tím): thánh giá giữa quảng trường, dây đèn ấm giăng giữa các mái (vẽ bằng giấy), ghế nhựa; người giấy dạng chung đi dạo phía sau',
    MU + '; ba lô khổng lồ "ngồi" ghế nhựa bên cạnh; ' + XIT + ' cắm túi hông ba lô; cầm gói bánh quy khô', 'cat', 'giay', [
    N(b19 + 0.05, 'In the evening I sat in the little square, next to the cross, and the whole island seemed to stroll past at least once.', '[tien-canh-khung] Dây đèn ấm làm tiền cảnh trên; Wob ngồi ghế nhựa, ba lô ngồi ghế bên; người giấy nhỏ đi dạo qua lại', '', [], []),
    N(T(9, "Somebody's radio"), "Somebody's radio was playing. Somebody's dinner smelled better than mine. I ate my crackers very slowly, to make them last as long as the smell.", 'Từ một cửa sổ, làn khói mùi thơm hình con cá vẫy đuôi bơi tới trước mũi Wob rồi bơi đi; Wob nhìn theo, nhìn gói bánh quy, cắn một miếng rất nhỏ', 'Mùi thơm hình con cá bơi đi mất', ['banh-quy'], []),
    N(T(9, 'And my spray'), 'And my spray was still sealed.', 'Cận túi hông ba lô: bình xịt, tem niêm phong đỏ còn nguyên', '', ['binh-xit'], []),
    N(T(9, 'I changed my mind'), 'I changed my mind. Small might be fine. Small might be great.', 'Wob ngả lưng ra ghế, hai tay sau gáy, mỉm cười; ngôi sao đầu tiên hiện trên trời; phủ dần thành giấy', '', [], ['liu-lo-vui']),
    ], [], 'Cảnh ấm, Wob đổi ý lần 1 (mồi giữ chân): cắt giấy ánh chạng vạng nhiều lớp')

# ================= CHƯƠNG 5 · A Day That Runs on Boats (cảnh 10–11) =================
b21 = B(10, 'A bank even')
seg('d20', 'cat-giay', b20, b21, 'hoi-uc',
    'Cầu tàu gỗ lúc bình minh hồng, mặt nước lặng; thuyền gỗ nhỏ có máy ngoài chất lưới; rồi thuyền tiếp tế xám (không cờ, không ký hiệu) chở các BỒN NƯỚC XANH DƯƠNG vẽ bằng giấy. ai-islote-boats không có bồn nước và đảo là ghềnh tối: chỉ dùng phần trời-nước hồng làm lớp xa nếu khớp; đảo phải là đảo kín nhà như d02',
    MU + ' lệch (ngái ngủ); không mang ba lô (để ở chỗ ngủ); cầm sổ + bút chì đánh dấu thuyền; từ "I wanted a shower" khoác khăn tắm, cầm xà phòng', 'giay', 'chen', [
    N(START[10], 'The next day, I kept track of the boats. The earliest leaves before sunrise, full of nets.', '[luot-smootherstep] Bình minh hồng: thuyền gỗ chất lưới rời bến; camera lướt theo thuyền về Wob ngái ngủ trên cầu tàu, mũ lệch, gạch một vạch vào sổ', '', ['so-du-lich', 'but-chi'], []),
    N(T(10, 'Fishing and tourism'), 'Fishing and tourism keep a lot of families here going. By some accounts, the tourists are catching up with the fish.', 'Trong sổ hai cột hình vẽ (không chữ): cột con cá và cột mũ rộng vành của khách; cột mũ dài dần đuổi kịp cột cá', 'Wob nhướng mày nhìn cột mũ đuổi kịp cột cá', ['so-du-lich'], []),
    N(T(10, 'The next boat'), "The next boat was my problem. I wanted a shower, and there's no fresh water on the island. No river, no spring, just coral and salt.", '[take-cham] Wob khoác khăn tắm, cầm xà phòng, vặn một cái vòi tưởng tượng giữa không trung; không có gì chảy ra; nhìn bàn tay, nhìn quanh: chỉ san hô và biển', 'Vặn vòi tưởng tượng', ['khan-tam', 'xa-phong'], ['im-lang']),
    N(T(10, 'The Colombian Navy'), 'The Colombian Navy has brought drinking water to these islands by boat.', 'Thuyền tiếp tế xám chở các bồn nước xanh dương cập bến; dây người giấy chung chuyền can nước; Wob đứng cuối hàng chìa xà phòng ra', 'Wob chìa xà phòng xin nước', [], []),
    ], [], 'Một ngày đếm bằng thuyền (khuôn mot-ngay-o-day), cầu tàu nhiều lớp: cắt giấy. C16, C17 (C16 mức C, lời đã rào "By some accounts")')

b22 = G(10)
seg('d21', 've-tay', b21, b22, 'hoi-uc',
    'Sơ đồ vẽ tay trên trang sổ; rồi cận Wob đứng trong chậu nhựa',
    MU + ' (ve-tay sunhat), đội chồng mũ phù thuỷ giấy tưởng tượng ở nhịp đầu rồi tháo; nhịp cuối mũ cói treo trên móc cạnh chậu, khăn tắm vắt vai', 'chen', 'cat', [
    N(b21, 'A bank even donated a machine that pulls drinking water out of the humid air. It sounds like magic.', '[so-do-ve-tay] Cỗ máy hình hộp có quạt, hơi ẩm (đường lượn) đi vào, giọt nước lăn xuống bình chứa; Wob đội mũ phù thuỷ giấy vẫy đũa trước máy', 'Wob tưởng là phép thuật', [], ['ting']),
    N(T(10, "It's condensation"), "It's condensation, the same trick as a cold glass sweating on a hot day.", '[bong-bong-tuong-tuong] Cốc nước đá dưới mặt trời vẽ tay, giọt nước đọng chảy xuống; Wob tháo mũ phù thuỷ, gật gù', '', [], []),
    N(T(10, "Colombia's housing"), "Colombia's housing ministry has also looked at solar-powered machines that turn seawater into drinking water.", 'Sơ đồ: tấm pin mặt trời nối một cái hộp, mũi tên sóng biển đi vào, giọt nước ngọt đi ra; cả sơ đồ vẽ nét ĐỨT (mới đang cân nhắc, chưa xây)', '', [], []),
    N(T(10, 'For now'), 'For now, I showered with a cup.', '[giu-tinh-bo] Wob đứng trong chậu, giơ cốc nhựa nhỏ đổ lên đầu: đúng ba giọt rơi; Wob vẫn chà xà phòng rất trịnh trọng; giữ 0,8 s', 'Tắm ba giọt', ['coc-nhua'], ['drop']),
    ], [], 'Cơ chế trừu tượng (ngưng tụ, lọc nước biển) bằng sơ đồ vẽ tay + gag tắm cốc: vẽ tay. C18, C19 (nét đứt = mới cân nhắc)')

b23 = B(11, 'Later, speedboats')
seg('d22', 'cat-giay', b22, b23, 'hoi-uc',
    'Buổi chiều dọc tường nhà; mái nhà có vài tấm pin mặt trời CŨ; trạm điện nhỏ: máy phát diesel mới có ống khói nhỏ, dãy ắc quy xếp hàng như lính, một thợ (người giấy chung) lau chùi, vặn ốc; ổ cắm cuối dãy',
    MU + '; ôm ' + BALO + ' trước ngực (lấy lại sau khi tắm); cầm điện thoại hết pin, dây sạc lủng lẳng', 'cat', 'cat', [
    N(b22 + 0.05, 'In the afternoon I went looking for a socket.', '[di-bo-parallax] Wob ôm ba lô, tay kia cầm điện thoại, dây sạc lủng lẳng, đi dọc tường dò từng góc', '', ['dien-thoai'], []),
    N(T(11, 'In twenty'), "In twenty twenty-one, Colombia's energy ministry upgraded the island's solar and diesel power system, with a new diesel generator and a tune-up for its batteries.", 'Mái nhà có tấm pin mặt trời cũ (đã có từ trước); máy diesel mới có ống khói nhỏ được đặt vào, tem giấy 2021 dán trên máy; dãy ắc quy xếp hàng, thợ lau chùi, vặn ốc (bảo trì, KHÔNG lắp pin mới)', '', [], ['may-no']),
    N(T(11, 'I plugged'), 'I plugged in my phone. The batteries took it personally.', 'Wob cắm sạc vào ổ cuối dãy', 'Cả dãy ắc quy đồng loạt quay "mặt" (hai chấm mắt) sang nhìn Wob; vạch pin của chiếc cuối tụt một nấc', ['dien-thoai'], ['nuot']),
    N(T(11, 'My phone charged'), 'My phone charged a little, and I decided a little was plenty.', 'Wob rút sạc nhẹ nhàng, lùi ra từng bước, cúi chào dãy ắc quy', '', [], []),
    ], ['2021'], 'Hạ tầng điện có thật kể bằng cảnh thật: cắt giấy. C20 (bảo trì ắc quy có sẵn, không vẽ lắp pin mới)')

b24 = G(11)
seg('d23', 'cat-giay', b23, b24, 'hoi-uc',
    'Bến đảo buổi chiều: cano trắng cập bến; xa xa đảo bên có mái khách sạn; vòng quanh mép đảo; hoàng hôn thuyền gỗ về bến; cuối đoạn toàn cảnh đảo lên đèn trên mặt nước tối (cùng đảo d02)',
    MU + '; ôm ' + BALO + ' trước ngực; sổ du lịch ở nhịp cuối', 'cat', 'giay', [
    N(b23 + 0.05, 'Later, speedboats bring day visitors from hotels on nearby islands, and tourism matters more every year. Some islanders reportedly work at those hotels.', 'Cano trắng cập bến, khách (người giấy chung đội mũ rộng vành, máy ảnh đeo cổ) bước lên; xa xa đảo bên có mái khách sạn', '', [], []),
    N(T(11, 'I joined'), "I joined a group of visitors for a lap of the island. We finished before anyone's ice cream had a chance to melt.", 'Wob ôm ba lô đi cuối đoàn khách vòng quanh đảo (ba lô quệt mũ một vị khách, Wob cúi xin lỗi); về tới bến', 'Que kem trong tay một vị khách vẫn nguyên hình, chưa giọt nào chảy; Wob nhìn que kem, nhìn đảo', ['que-kem'], []),
    N(T(11, 'Then the fishing'), 'Then the fishing boats came home, and the whole day folded back into the island.', 'Hoàng hôn: thuyền gỗ về bến, thùng cá; mặt trời giấy lặn sau đường chân trời', '', [], []),
    N(T(11, 'Every hour'), 'Every hour had a boat in it. Nobody here ended up on this island by accident.', '[lui-ra-toan-canh] Trang sổ của Wob kín hình thuyền vẽ tay tới mép giấy; camera lùi ra: toàn cảnh đảo lên đèn, thuyền neo quanh; phủ dần thành giấy', '', ['so-du-lich'], []),
    ], [], 'Hành trình quanh đảo và toàn cảnh cuối ngày nhiều lớp: cắt giấy. C21 (lời đã rào "reportedly"); khách dạng chung')

# ================= CHƯƠNG 6 · The Sea Comes Indoors (cảnh 12–13) =================
b25 = B(12, 'I woke up')
seg('d24', 'cat-giay', b24, b25, 'hoi-uc',
    'Đêm ở mép đảo: hai cột gỗ sát mép nước, trăng trên biển; VÕNG vẽ bằng giấy (lưới sọc xanh ngọc–trắng) mắc giữa hai cột; ba lô khổng lồ đặt dưới đất ngay dưới võng',
    MU + '; ' + BALO + ' dưới đất dưới võng; ' + XIT + ' cắm túi hông ba lô', 'giay', 'chen', [
    N(START[12], 'On my last night I strung a hammock near the edge of the island. I wanted to fall asleep to the sound of the waves.', 'Wob buộc võng giữa hai cột gỗ, đặt ba lô dưới gầm võng; thử ngồi lên', 'Võng lật Wob một vòng rồi Wob mới nằm được', ['vong'], ['boing']),
    N(T(12, 'It worked'), 'It worked. I fell asleep to the sound of the waves.', '[day-vao-cham] Wob nằm võng ngủ, mũ cói úp lên mặt; ba bọt sóng nhỏ vỗ đều dưới trăng', '', ['vong'], []),
    ], [], 'Thiết lập thử–hỏng (khuôn thu-hong-hieu) trong cảnh thật ban đêm: cắt giấy; nước dâng chuyển vẽ tay cho biểu cảm to')

b26 = round(E(12) + 0.8, 3)
seg('d25', 've-tay', b25, b26, 'hoi-uc',
    'Vẽ tay: sáng sớm, mặt nước biển dâng ngang nền, liếm dưới võng; lối đi giữa các nhà ngập nước tới bậc cửa (tham khảo bố cục ai-islote-flood, vẽ tay toàn bộ). KHÔNG vẽ người dân trong nước: chỉ Wob và đồ của Wob',
    MU + ' úp trên mặt rồi được kéo vào lòng; ba lô dưới đất → nổi trôi đi (MẤT ba lô tới hết cảnh 12)', 'chen', 'cat', [
    N(b25, 'I woke up to the feel of them.', '[take-cham] Wob mở một mắt, nhìn xuống mặt nước ngay dưới võng, nhắm lại, rồi bật dậy ngồi thẳng', 'Take chậm', [], ['liu-lo-soc']),
    N(T(12, 'The sea had'), 'The sea had come up in the night and was standing politely under my hammock, like a guest who turned up early.', 'Mặt nước mọc đôi mắt vẽ tay, lễ phép đứng chờ, hơi cúi chào', 'Wob cúi chào lại theo phản xạ', [], []),
    N(T(12, 'I pulled my legs'), 'I pulled my legs in. I pulled my hat in. I pulled in everything I could reach.', '[va-cham-vat-ly] Wob cuộn chân, kéo mũ cói vào lòng, rồi kéo cả dép, cái cốc, cuốn sổ lên võng; võng trĩu dần sát mặt nước', 'Võng trĩu sát nước', ['vong', 'mu-coi'], []),
    N(T(12, 'My backpack'), "My backpack, on the floor, didn't have that option. It drifted off down the lane like it had somewhere better to be.", 'Ba lô khổng lồ nổi lềnh bềnh, xoay nhẹ, trôi chậm ra lối đi; Wob với tay, đúng lúc đó ba lô trôi xa thêm một gang; nắp ba lô hé như ngoái lại rồi trôi tiếp; giữ 0,8 s rồi cắt cứng (nhạc tắt cùng lúc)', 'Ba lô bỏ đi', ['ba-lo-khong-lo'], []),
    ], [], 'Gag phản ứng to (take chậm, nước có mắt): vẽ tay. Chỉ đùa về Wob, không về nhà ngập của người dân')

b28 = B(13, 'A hammock story')
seg('d26', 'diorama', b26, b28, 'hien-tai',
    BAN + ', nhưng đèn bàn thấp và lạnh hơn mọi lần (nghiêm); ba lô khổng lồ ướt đặt trên bàn, nước nhỏ xuống sổ; sổ mở các trang PHÁC HOẠ (mặt cắt đảo, sơ đồ quần đảo vẽ tay, ô cửa nhà); chấm đảo biến mất vẽ trên sơ đồ phác hoạ, KHÔNG trên bản đồ thật (vị trí đảo nhỏ không có trong Natural Earth)',
    NHA + '; ba lô khổng lồ ướt nằm trên bàn; mặt Wob trầm (miệng thẳng/buồn), KHÔNG cười suốt đoạn', 'cat', 'cat', [
    N(b26, '', '[cat-cung-ve-hien-tai] Cắt cứng sang bàn kỷ vật, im lặng ~1,2 s (nhạc đã tắt ở chỗ cắt); Wob đứng cạnh bàn', '', [], []),
    N(START[13], "Back home, I set the backpack on my desk. It's still drying.", '[dat-ky-vat-xuong] Wob đặt chiếc ba lô ướt lên bàn, nước nhỏ xuống trang sổ; Wob ngồi xuống. Không gag', '', ['ba-lo-khong-lo'], []),
    N(T(13, 'For the people'), "For the people out there, that night isn't a funny story. The Guardian reported that islanders sometimes wake up to find water in their homes.", 'Wob lật sổ sang trang vẽ một ô cửa nhà nhỏ có vạch nước sát bậc (không vẽ người); camera đứng yên', '', ['so-du-lich'], []),
    N(T(13, 'These islands sit'), "These islands sit only about two metres above the sea on average. That's roughly six and a half feet.", 'Trang mặt cắt vẽ tay: đảo như tấm ván thấp, đường mực nước sát mép; nhãn ~2 m · ~6.5 ft', '', [], []),
    N(T(13, 'A local report'), "A local report in twenty fourteen, cited by The Guardian, found erosion along about forty-five percent of the archipelago's coastline.", 'Trang sơ đồ quần đảo phác tay (không phải bản đồ thật): viền bờ các đảo, gần nửa chu vi tô đậm vệt xói; nhãn ~45% · 2014', '', [], []),
    N(T(13, 'One small island'), 'One small island nearby has disappeared completely.', 'Một chấm đảo nhỏ trên trang nhạt dần rồi chỉ còn vòng nét đứt; không nhãn tên; giữ hình lặng 1 s', '', [], []),
    N(T(13, 'Global sea levels'), "Global sea levels are expected to rise by up to thirty centimetres by twenty fifty. That's about a foot.", 'Wob dựng một thước kẻ cạnh hình mặt cắt; vạch up to ~30 cm · ~1 ft · 2050; đường mực nước vẽ tay nhích lên một nấc', '', ['thuoc-ke'], []),
    N(T(13, 'Imagine a table'), 'Imagine a table standing in a bathtub, with the tap left running.', '[lat-trang-so] Wob lật sang trang trắng, phác bằng bút chì một cái bàn đứng trong bồn tắm, vòi mở; mảng màu nước xanh trên trang dâng lên từng chút tới gần mặt bàn vẽ. Tông trầm, KHÔNG gag, Wob không cười', '', ['so-du-lich', 'but-chi'], []),
    ], ['~2 m · ~6.5 ft', '~45% · 2014', 'up to ~30 cm · ~1 ft · 2050'],
    'Cắt về hiện tại đúng một lần giữa tập (ghi_chu_khung), nghiêm, không gag, không sfx: bàn kỷ vật diorama. So sánh bồn tắm phác ngay trên trang sổ (không chèn vẽ tay: giữ tông nghiêm và tránh đổi phong cách 3 lần trong 12 s). C22–C24')

b29 = round(E(13) + 1.0, 3)
seg('d28', 'diorama', b28, b29, 'hien-tai',
    'Như d26 (đèn thấp, nghiêm)', NHA + '; ba lô ướt trên bàn; mặt trầm', 'cat', 'giay', [
    N(b28, 'A hammock story is funny once. Living with it, year after year, is something else.', 'Về bàn: Wob nhìn chiếc ba lô ướt; một giọt nước rơi xuống sổ; camera đẩy rất chậm', '', ['ba-lo-khong-lo'], []),
    N(T(13, 'I changed my mind back'), 'I changed my mind back.', '[lui-cham-im-lang] Wob gấp sổ lại, đặt tay lên ba lô ướt, nhìn xuống; giữ 1 s im lặng; rồi camera lao vào bìa sổ, phủ dần thành giấy', '', ['so-du-lich'], []),
    ], [], 'Khép nhịp nghiêm ở bàn (Wob đổi ý lần 2); khoảng lặng trước khi quay lại chuyến đi')

# ================= CHƯƠNG 7 · Why They Stay (cảnh 14) =================
b30 = B(14, 'I drew its boat')
seg('d29', 'cat-giay', b29, b30, 'hoi-uc',
    'Đuôi thuyền gỗ rời đảo buổi sáng (cùng thuyền d02); hòn đảo nhỏ dần thành một nắm mái nhà trên mặt nước (cùng đảo giấy d02)',
    MU + '; ' + BALO + ' CÒN ẨM (sẫm hơn, vệt nước) ôm trước ngực; ' + XIT + ' cắm túi hông', 'giay', 'chen', [
    N(START[14], 'So why not pack up and move somewhere drier? I wondered about that on the boat out, while the island shrank behind me into a handful of roofs on the water.', '[luot-smootherstep] Wob ngồi đuôi thuyền ngoái lại; camera lướt chậm, đảo lùi xa thành một nắm mái nhà', 'Wob giơ tay đo đảo giữa ngón cái và ngón trỏ: vừa khít', ['ba-lo-khong-lo'], []),
    ], [], 'Hành trình rời đảo: cắt giấy parallax; gag nhỏ, nhẹ trước chương lý do ở lại')

b31 = B(14, 'One more thing')
seg('d30', 've-tay', b30, b31, 'hoi-uc',
    'Vẽ tay trên trang sổ của Wob: chấm đảo ở giữa, các đường nét đứt màu khác nhau toả ra (ra ngư trường, sang đảo bên có mái khách sạn, vào đất liền). Sơ đồ không đúng tỉ lệ, không biên giới, không phải bản đồ thật',
    MU + '; ba lô ẩm ôm trước ngực (khung cận: tay Wob cầm bút chì trên sổ)', 'chen', 'cat', [
    N(b30, 'I drew its boat routes in my notebook. One line ran out to the fishing grounds, where the nets go before the sun is up.', '[so-do-ve-tay] Bút chì của Wob vẽ nét đứt đầu tiên từ chấm đảo ra ngư trường: hình con cá, tấm lưới, mặt trời còn dưới đường chân trời', '', ['so-du-lich', 'but-chi'], ['whoosh']),
    N(T(14, 'Another ran'), 'Another ran next door, to the hotels.', 'Thuyền giấy nhỏ chạy theo nét đứt thứ hai tới đảo bên có mái khách sạn', '', [], []),
    N(T(14, 'A third ran'), "A third ran toward the mainland, for school. Young people who want to keep studying past the island's school have to leave.", 'Nét đứt thứ ba chạy vào đất liền, chiếc thuyền giấy nhỏ chở cặp sách; thuyền giấy của Wob chạy lạc ra mép trang', 'Thuyền giấy rơi khỏi sổ rồi lóng ngóng leo lại vào trang', [], ['drop']),
    N(T(14, 'I tried to picture'), "I tried to picture leaving a place where everyone I love fits inside one evening walk. I couldn't make the picture work.", 'Một đường nét đứt nhỏ vòng quanh chấm đảo, kín một vòng; Wob ngừng bút, gõ bút vào má', '', ['but-chi'], []),
    N(T(14, 'The fish are close'), 'The fish are close. So are the visitors. And this is where their families have lived for generations.', 'Hình cá và hình mũ khách nhích lại gần chấm đảo; quanh chấm đảo hiện các ô cửa sổ sáng đèn, nhỏ dần như cây phả hệ', '', [], []),
    ], [], 'Trang sổ hành trình (khuôn trang-so-hanh-trinh) bằng sơ đồ vẽ tay; không phải bản đồ thật. C25, C27')

b32 = G(14)
seg('d31', 'cat-giay', b31, b32, 'hoi-uc',
    'Đuôi thuyền, biển lặng buổi sáng (như d29), tông trầm hơn; trang sổ trong tay Wob; xa xa một hòn đảo khác',
    MU + '; ba lô ẩm ôm trước ngực; sổ du lịch; bông hoa giấy nhỏ', 'cat', 'giay', [
    N(b31 + 0.05, "One more thing, said quietly. There's no room on the island for a cemetery. People are buried on another island. Even that, they've found a way to carry.", '[dat-ky-vat-xuong] Trang sổ lặng: một đường nét đứt mảnh chạy sang đảo khác; Wob đặt một bông hoa giấy nhỏ ở cuối đường; Wob nhìn ra biển; camera lùi rất chậm; KHÔNG gag, không sfx; phủ dần thành giấy', '', ['so-du-lich', 'hoa-giay'], []),
    ], [], 'Một câu nghiêm (nghĩa trang): cắt giấy tông trầm, không gag. C28')

# ================= CHƯƠNG 8 · The Backpack Decides (cảnh 15) + đuôi (cảnh 16) =================
b33 = B(15, 'Their reasons fit')
seg('d32', 'diorama', b32, b33, 'hien-tai',
    BAN + ' buổi sáng (đèn bàn + nắng sớm); ba lô khổng lồ đã khô một nửa; sổ mở trang hình hòn đảo vẽ tay; trang hộ chiếu (cùng mẫu thẻ d01) và con dấu cao su (api.conDauSVG) trên bàn',
    NHA + '; ba lô khổng lồ trên bàn; ' + XIT + ' đứng trên bàn', 'giay', 'chen', [
    N(START[15], "This morning I tried packing the backpack again, to see if it had learned anything. It hadn't. It still smelled like the sea.", 'Wob nhét đồ vào ba lô; một làn sóng giấy nhỏ (mùi biển) bốc ra từ miệng ba lô', 'Nhét xong một món, hai món khác bật ra', ['ba-lo-khong-lo'], ['boing']),
    N(T(15, 'I laid it'), 'I laid it on the drawing of the island in my notebook, and it covered every house.', 'Wob đặt ba lô lên trang sổ có hình hòn đảo vẽ tay; ba lô phủ kín đảo, chỉ còn mép nước lộ ra quanh đáy ba lô', '', ['ba-lo-khong-lo', 'so-du-lich'], []),
    N(T(15, 'NOPE') - 0.07, 'NOPE.', '[lao-vao-can-canh] Trang hộ chiếu lật trở lại GIỮA khung; Wob đóng con dấu vào ô trống: dấu đỏ khung đôi nghiêng, chữ NOPE ≥ 140 px ép đúng bề rộng trong khung (textLength như DaoCu.verdictStamp của cat-giay; dùng api.dauPhanQuyetSVG nếu đã ép bề rộng, chưa thì port cách ép), cả dấu nằm trọn trong vùng an toàn, giữ to 1,5 s rồi thu về trang hộ chiếu. Đúng một lần trong tập', '', ['the-ho-chieu', 'con-dau'], ['dau-wob']),
    N(T(15, "I'm stamping"), "I'm stamping it first, so nobody blames the island. The island's fine.", 'Wob nhấc ba lô, vỗ nhẹ lên hình hòn đảo vừa lộ ra như vỗ vai bạn', '', [], []),
    N(T(15, 'The people out there'), 'The people out there built their own ground out of coral, by hand. They keep it going with water that arrives by boat, and a sea that keeps knocking.', '[lat-trang-so] Wob lật sổ: trang pop-up bật dựng hòn đảo kín nhà, bàn tay người giấy xếp san hô ở mép; thuyền giấy chở bồn nước xanh cập vào; đúng "knocking" nét sóng giấy ở mép trang gõ gõ vào hình đảo ba lần', '', ['so-popup'], []),
    ], ['NOPE', 'SANTA CRUZ DEL ISLOTE', 'COLOMBIA', 'Would Wob move here?'],
    'Outro ở bàn (khung hiện tại, diorama): con dấu đóng TRƯỚC, bật ra từ hành động đặt ba lô (ghi_chu_khung); trang hộ chiếu của d01 quay lại đóng vòng. C29')

b34 = B(15, 'If you travel')
seg('d33', 've-tay', b33, b34, 'hien-tai',
    'Bong bóng tưởng tượng vẽ tay chia đôi khung; rồi cảnh tưởng tượng quảng trường chạng vạng vẽ tay (dây đèn, thánh giá giữa quảng trường, ghế nhựa)',
    'Nhịp 1: Wob vẽ tay không mũ (ở nhà) đu trên móc cẩu. Nhịp 2 (Wob TƯỞNG TƯỢNG quay lại): mũ cói, KHÔNG ba lô khổng lồ, xách một túi nhỏ cỡ hộp cơm trưa',
    'chen', 'cat', [
    N(b33, 'Their reasons fit in a fishing boat. Mine needed a crane.', '[chen-ve-tay] Trái: chiếc thuyền cá nhỏ chở gọn con cá, ô cửa nhà, mái nhà (lý do của người dân: gọn, bình yên, không đùa). Phải: cần cẩu giấy cố nhấc ba lô khổng lồ lên một thuyền khác, thuyền chìm nửa thân; Wob đu trên móc cẩu', 'Cần cẩu nhấc ba lô, thuyền chìm nửa thân', ['ba-lo-khong-lo'], ['whoosh', 'drop']),
    N(T(15, 'Honestly'), "Honestly, I'd go back tomorrow for one more evening in that square, carrying a bag the size of a lunchbox.", '[lay-da-nhay] Cảnh tưởng tượng: Wob nhảy chân sáo vào quảng trường chạng vạng, tay xách túi bé bằng hộp cơm trưa, ngồi phịch xuống ghế nhựa nhẹ tênh', 'Túi bé tới mức Wob tung lên bắt lại như quả bóng', ['hop-com'], ['liu-lo-vui']),
    ], [], 'So sánh cường điệu + giả định "nếu quay lại": vẽ tay chèn; gag chỉ ở phía Wob. Gộp câu hộp cơm vào đây (thay vì ở bàn) để diorama ≤ 20%')

b35 = DUOI_A
seg('d34', 'diorama', b34, b35, 'hien-tai',
    'Như d32 (bàn kỷ vật, nắng sớm); hộp cơm trưa nhỏ đặt cạnh ba lô khổng lồ trên bàn (to gấp mười lần)', NHA + '; ba lô khổng lồ trên bàn; cầm ' + XIT + ' ở nhịp lắc', 'cat', 'cat', [
    N(b34 + 0.05, "If you travel with one small bag, love the water and don't mind hearing your neighbour's radio, you'd do better than me.", 'Wob đếm trên ngón tay: một cái túi nhỏ, sóng nước (tay lượn như sóng), cái radio (nghiêng đầu nghe); rồi chỉ về phía người xem', '', [], []),
    N(T(15, 'I gave the spray'), 'I gave the spray one last shake. Still sealed. Still smug.', 'Wob lắc bình xịt; tem niêm phong vẫn nguyên; một ' + MUOI + ' trên bàn bò lại gần bình xịt, đọc nhãn (hình con muỗi gạch chéo)', 'Muỗi đọc nhãn rồi đi bộ thong thả ra khỏi khung', ['binh-xit', 'muoi-giay'], []),
    N(T(15, 'What would you'), 'What would you leave on the dock to fit on that island?', '[day-vao-cham] Wob nhìn thẳng người xem, tay đặt lên ba lô; camera đẩy chậm; nhạc hạ', '', [], []),
    ], [], 'Tiếp outro ở bàn (diorama), callback bình xịt; câu hỏi bình luận có hình')

seg('d35', 'diorama', b35, END, 'duoi',
    'ĐUÔI TẬP theo skill mo-ket mục 2, dựng bằng templates/hoat-hinh/_chung/mo-ket/duoi-tap.js. Bàn kỷ vật (cùng bàn d01), ánh đèn ấm. Bên trái (x 96–900): kệ gỗ giấy hai tầng có lọ opal (thẻ COOBER PEDY), tờ lịch hầm còn băng dính (thẻ WHITTIER), tủ đông nhỏ có cá (thẻ OYMYAKON) cạnh kệ; bình xịt là kỷ vật MỚI (thêm khoá "binhXit" vào VE của duoi-tap.js: chỉ thêm), thẻ SANTA CRUZ DEL ISLOTE (được xuống hai dòng; thẻ phải to hơn mẫu 300×60 để chữ ≥ 45 px). Bản đồ giấy trừu tượng trái dưới (x < 1100, không biên giới thật, không vùng Đông Nam Á). Bên phải: vùng end screen để TRỐNG. CAMERA KHOÁ CỨNG cả đoạn (không đẩy, không lia)',
    NHA + ' (bộ ở nhà như d32–d34); ' + XIT + ' đặt lên kệ; nhịp cuối đeo BA LÔ BÉ XÍU (cùng màu ô liu #7C8646, cuộn thảm đỏ tí hon, cao ≈ 0,35 thân Wob). Ba lô khổng lồ không xuất hiện',
    'cat', 'cuoi-video', [
    N(b35, '', 'Khung đầu (cắt từ d34) đã đủ bàn và kệ. Hai khung ảnh giấy trống 560×315 (x 1180–1740, y 130–445 và 480–795) và vòng giấy trống Ø200 tâm (1460, 905) bật lên trong 0–1,2 s đầu đoạn (dt.endScreen) rồi ĐỨNG YÊN tuyệt đối tới khung cuối (≥ 18 s ổn định; end screen YouTube cần ≥ 15 s; tập 3 chỉ có 3,3 s). Bên trong khung và vòng không vẽ gì, không chữ; sau giây 1,2 của đoạn, toàn vùng x ≥ 1150 không có vật chuyển động, không chữ', '', ['khung-anh-trong', 'vong-tron-trong'], ['pop']),
    N(START[16], 'The spray goes on the shelf, still sealed, next to the tunnel timetable and the jar of almost no opals.', 'Wob đặt bình xịt (tem nguyên) lên kệ cạnh tờ lịch hầm và lọ opal (dt.datLen); thẻ SANTA CRUZ DEL ISLOTE dưới bình xịt', 'Lọ opal kêu lách cách khi bình xịt chạm kệ', ['binh-xit', 'lo-opal', 'to-lich-gio-ham'], []),
    N(T(16, 'The fish waves'), 'The fish waves from the freezer.', 'Wob liếc sang tủ đông: nắp hé, đuôi cá vẫy một cái rồi nắp tự đóng (dt.nhuc)', 'Đuôi cá vẫy', ['tu-dong-nho', 'ca'], []),
    N(T(16, 'Next:'), 'Next: an island very far from anywhere, where everyone once had to leave, and then chose to go back.', 'Bản đồ giấy trừu tượng mở ra ở trái dưới; ghim đỏ mới cắm vào bờ biển phía bắc Nam Mỹ (nơi vừa đi; nhãn ghim nếu có chỉ SANTA CRUZ DEL ISLOTE); một ghim trống KHÔNG nhãn rung giữa vùng biển rộng phía nam, xa mọi mảng lục địa (không mặt trời nhiệt đới: tập sau không phải nơi ấm). KHÔNG tên nơi tập sau, không chữ', '', ['ban-do-giay', 'ghim'], ['drop']),
    N(T(16, "I'm taking"), "I'm taking the small backpack.", 'Wob đeo ba lô bé xíu, quay sang phải, chỉ tay về phía hai khung trống (bàn tay dừng ở x ≤ 1100), chớp mắt, đứng thở tới hết; nhạc nhỏ dần nhưng không tắt; không mờ đen', 'Ba lô bé xíu', ['ba-lo-be'], []),
    ], ['SANTA CRUZ DEL ISLOTE', 'WHITTIER', 'COOBER PEDY', 'OYMYAKON'],
    'Đuôi tập ở bàn kỷ vật = khung hiện tại, chỉ diorama (skill mo-ket). Đuôi 20,0 s: lời 15,8 s + 0,6 s trước + 3,6 s giữ sau lời; khung end screen đứng yên ≥ 18 s')

# ---------------- gộp đoạn liền cùng phong cách, đánh số lại ----------------
# d28 (khép nhịp nghiêm ở bàn) gộp vào d26: cùng bàn, cùng ánh đèn, nối cắt cứng giữa hai đoạn diorama liền nhau là thừa.
GOP = {'d26': ['d28']}
byid = {d['id']: d for d in D}; bo = set()
for a, ds in GOP.items():
    for x in ds:
        byid[a]['nhip'] += byid[x]['nhip']; byid[a]['chu_tren_do_vat'] += byid[x]['chu_tren_do_vat']
        byid[a]['ket_thuc'] = byid[x]['ket_thuc']; byid[a]['ra'] = byid[x]['ra']
        bo.add(x)
D[:] = [d for d in D if d['id'] not in bo]
MAP = {d['id']: f'd{i + 1:02d}' for i, d in enumerate(D)}
for a, ds in GOP.items():
    for x in ds: MAP[x] = MAP[a]
MAP['d27'] = MAP['d26']   # d27 (bồn tắm vẽ tay) đã bỏ, nhập vào d26
def ren(t):
    """Đổi id cũ → id mới trong MỘT lượt (tránh đổi hai lần)."""
    def f(m):
        a = MAP.get(m.group(1), m.group(1))
        if not m.group(2): return a
        b = MAP.get(m.group(2), m.group(2))
        return a if a == b else a + '–' + b
    return re.sub(r'\b(d\d\d)(?:–(d\d\d))?\b', f, t)
for d in D:
    d['id'] = MAP[d['id']]
    for k in ('boi_canh', 'trang_phuc', 'ly_do_phong_cach'): d[k] = ren(d[k])
    for n in d['nhip']: n['hanh_dong'] = ren(n['hanh_dong']); n['gag'] = ren(n['gag'])

# ---------------- nhạc (chỉ bài có trong music/GIAY-PHEP.md) ----------------
NHAC = [
    {'src': 'music/wallpaper.mp3', 'bat_dau': 0.0, 'ket_thuc': START[4], 'mood': 'to-mo'},
    {'src': 'music/investigations.mp3', 'bat_dau': START[4], 'ket_thuc': G(4), 'mood': 'hai'},
    {'src': 'music/inspired.mp3', 'bat_dau': G(4), 'ket_thuc': START[7], 'mood': 'to-mo'},
    {'src': 'music/sneaky-snitch.mp3', 'bat_dau': START[7], 'ket_thuc': G(7), 'mood': 'hai'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': G(7), 'ket_thuc': G(9), 'mood': 'to-mo'},
    {'src': 'music/inspired.mp3', 'bat_dau': G(9), 'ket_thuc': G(11), 'mood': 'to-mo'},
    {'src': 'music/investigations.mp3', 'bat_dau': G(11), 'ket_thuc': b26, 'mood': 'hai'},          # tắt đúng chỗ cắt cứng về bàn
    {'src': 'music/lightless-dawn.mp3', 'bat_dau': round(START[13] + 1.0, 3), 'ket_thuc': round(E(13) + 0.3, 3), 'mood': 'khac-nghiet'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': round(b29 + 0.3, 3), 'ket_thuc': G(14), 'mood': 'to-mo'},
    {'src': 'music/inspired.mp3', 'bat_dau': G(14), 'ket_thuc': END, 'mood': 'to-mo'},
]
for n in NHAC: n['bat_dau'] = round(n['bat_dau'], 3); n['ket_thuc'] = round(n['ket_thuc'], 3)

out = {
    '_ghi_chu': [ren(x) for x in [
        'Tập 4 Santa Cruz del Islote, phân cảnh phối 3 phong cách (dao-dien-hoat-hinh, 26/11/2026), sinh bằng hoat-hinh/sinh-phan-canh.py từ audio/subtitles.json (Edge TTS, 16 cảnh, 589,4 s lời).',
        'KHUNG XUẤT 2560×1440 (xuat); mọi toạ độ trong phân cảnh vẫn theo hệ thiết kế 1920×1080.',
        'ĐẢO KHUÔN so với tập 3 (theo ghi_chu_khung của script.json): mở ở bàn kỷ vật với bình xịt (d01) → nhảy lên thuyền → chuyến đi → cắt về bàn ĐÚNG MỘT LẦN giữa tập ở chương biển dâng (d26–d28, nghiêm, không gag, ba lô ướt trên bàn) → chuyến đi rời đảo → outro ở bàn, con dấu NOPE đóng TRƯỚC rồi mới nói lý do (d32) → đuôi ở kệ (d35).',
        'KHOÁ TRANG PHỤC (chung 3 phong cách): chuyến đi = MŨ CÓI rộng vành kraft #C9A46A dải đỏ #C9463A + BA LÔ KHỔNG LỒ ô liu #7C8646/#566030 có cuộn thảm đỏ trên nắp (cao ≈ 1,6 thân Wob). Ba lô: trên băng ghế thuyền (d02, d04) → ôm trên đùi, ướt (d04 từ "I spent them") → trên lưng (d05, d07 tới "I took it off") → ôm trước ngực (d07 cuối, d18, d22, d23, d29–d31) → để dưới đất / dựa tường / làm gối / ngồi ghế (d08–d15, d16, d19, d24) → không mang khi tắm (d20–d21) → trôi mất (d25) → ướt trên bàn (d26–d28) → còn ẩm ôm trước ngực (d29–d31) → khô một nửa trên bàn (d32–d34) → đuôi: ba lô bé xíu. Mũ: đội suốt chuyến, TRỪ d14 từ "I took my hat off" tới hết d15 (mũ đặt cạnh), d21 nhịp cuối (treo móc khi tắm), d25 (úp mặt rồi kéo vào lòng). Ở bàn (d01, d26–d28, d32–d35): không mũ, không đeo ba lô.',
        'BÌNH XỊT MUỖI: trụ trắng kem, nắp xanh ngọc #2A9D8F, nhãn hình con muỗi gạch chéo (không chữ), tem niêm phong đỏ #C9463A LUÔN nguyên. Ở bàn d01, d32–d35; trong chuyến đi cắm túi hông ba lô (d13, d19, d24, d29), ôm khi ngủ d15.',
        'MUỖI: con muỗi giấy nâu sẫm chân dài, cánh trong, mắt to thân thiện; gag muỗi ở d01, d03, d10, d11, d14, d34 (mỗi lần một kiểu: lờ Wob, xách va li, quay đầu, disco, chê thực đơn, đọc nhãn).',
        'ẢNH AI (manifest, ComfyUI): phông nền mặc định vẽ bằng code/giấy. Dùng được làm lớp xa nếu khớp: ai-caribbean-islets (d02), ai-islote-lane (d05, d07, d18, chỉ khi thu hẹp lối bằng tường giấy), ai-bare-islet (d10), ai-islote-night (d13, che đồi tối), ai-islote-boats (d20, chỉ trời-nước), ai-islote-flood (d25 tham khảo bố cục). KHÔNG dùng: ai-islote-aerial cho đảo (nền cam như cát), ai-islote-square (thánh giá sau dãy nhà, cây to). Chi tiết ảnh thiếu phải vẽ bù bằng giấy/SVG: võng (d24), tranh tường (d05, d18), bồn nước xanh (d20, d32), thánh giá giữa quảng trường (d05, d16, d19), đường thuyền nét đứt trên map-san-bernardo (d04).',
        'NGHIÊM: d26–d28 (biển dâng, nhà ngập) và d31 (nghĩa trang) không gag, không sfx, Wob mặt trầm; nhạc tắt ở cuối d25 (cắt cứng), lặng ~2,2 s trước lời cảnh 13.',
        'NGƯỜI DÂN: người giấy/que dạng chung, nhỏ, xa, không mặt chi tiết, không chế giễu; gag luôn dồn vào Wob, ba lô, muỗi.',
        'CHỮ: chỉ chữ trong chu_tren_do_vat, ≥ 45 px hệ 1920; không đặt chữ ở vùng logo x > 1500, y < 150 (không cần an_logo nếu giữ luật này). 20 s cuối (d35) không chữ ở x > 1150, y > 560.',
        'SFX chỉ chọn từ sfx/GIAY-PHEP.md (sổ không có tiếng lật giấy, tiếng muỗi, tiếng sóng: dùng whoosh nhỏ cho thẻ hộ chiếu, im lặng cho muỗi). Nhạc chọn từ music/GIAY-PHEP.md.',
    ]],
    'fps': 30, 'rong': 1920, 'cao': 1080, 'xuat': {'w': 2560, 'h': 1440}, 'thoi_luong': END,
    'loi': [{'scene': s['id'], 'bat_dau': START[s['id']]} for s in sub],
    'nhac': NHAC, 'am_luong_nhac': 0.2,
    'doan': D,
}

# ---------------- tự kiểm ----------------
assert D[0]['bat_dau'] == 0 and D[-1]['ket_thuc'] == END
for a, b in zip(D, D[1:]):
    assert a['ket_thuc'] == b['bat_dau'] and a['ket_thuc'] > a['bat_dau'], (a['id'], b['id'])
    assert (a['ra'] == 'giay') == (b['vao'] == 'giay'), ('noi giay lech', a['id'], b['id'])
for d in D:
    for n in d['nhip']:
        assert d['bat_dau'] - 0.001 <= n['tai'] < d['ket_thuc'], ('nhip ngoai doan', d['id'], n['tai'], n['loi'][:30])
json.dump(out, open(P + '/hoat-hinh/phan-canh.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
tong = {}
for d in D:
    tong.setdefault(d['phong_cach'], [0, []]); tong[d['phong_cach']][0] += d['ket_thuc'] - d['bat_dau']; tong[d['phong_cach']][1].append(d['id'])
print('so doan', len(D), 'thoi luong', END, 'loi canh 16 het o', E(16))
for k, (s, ids) in tong.items(): print(k, round(s, 1), f'{100 * s / END:.1f}%', ' '.join(ids))
for d in D: print(d['id'], d['phong_cach'], d['bat_dau'], round(d['ket_thuc'] - d['bat_dau'], 2), d['vao'], d['ra'])
the = [re.match(r'\[([a-z0-9-]+)\]', n['hanh_dong']) for d in D for n in d['nhip']]
the = [m.group(1) for m in the if m]
c = Counter(the); print('the', len(c), 'nhip co the', len(the), c.most_common(5))
# đổi phong cách quá 2 lần trong 15 s
ch = [d['bat_dau'] for a, d in zip(D, D[1:]) if a['phong_cach'] != d['phong_cach']]
for i in range(len(ch) - 2):
    if ch[i + 2] - ch[i] < 15: print('CANH BAO doi phong cach 3 lan trong 15 s quanh', ch[i])
# chuỗi cùng phong cách > 90 s
run = [D[0]]
for d in D[1:]:
    if d['phong_cach'] == run[-1]['phong_cach']: run.append(d)
    else:
        if run[-1]['ket_thuc'] - run[0]['bat_dau'] > 90: print('CANH BAO chuoi', run[0]['phong_cach'], run[0]['id'], run[-1]['id'])
        run = [d]
