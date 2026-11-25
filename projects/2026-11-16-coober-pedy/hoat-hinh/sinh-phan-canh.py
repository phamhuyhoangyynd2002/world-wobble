import json, re, sys
P = sys.argv[1]
sub = json.load(open(P + '/audio/subtitles.json', encoding='utf8'))['scenes']
GAP = {1: 2.0, 2: 3.5, 3: 2.5, 4: 1.5, 5: 3.0, 6: 2.0, 7: 2.0, 8: 3.0, 9: 1.5, 10: 2.0,
       11: 3.0, 12: 2.0, 13: 3.5, 14: 2.0, 15: 3.5, 16: 2.0, 17: 3.0}
START = {}; t = 0.6
for s in sub:
    START[s['id']] = round(t, 3); t += s['duration'] + GAP.get(s['id'], 0)
END = round(START[18] + sub[-1]['duration'] + 1.3, 3)
norm = lambda w: re.sub(r"[^a-z0-9'-]", '', w.lower())

def T(sc, phrase, end=False):
    ws = sub[sc - 1]['words']; toks = [norm(x) for x in phrase.split()]
    for i in range(len(ws)):
        if all(i + j < len(ws) and norm(ws[i + j]['text']) == toks[j] for j in range(len(toks))):
            return round(START[sc] + (ws[i + len(toks) - 1]['end'] if end else ws[i]['start']), 3)
    raise SystemExit(f'khong thay "{phrase}" o canh {sc}')
def E(sc): return round(START[sc] + sub[sc - 1]['duration'], 3)
def G(sc, k=0.5): return round(E(sc) + GAP[sc] * k, 3)

def N(tai, loi, hd, gag='', dc=(), sfx=()):
    return {'tai': tai, 'loi': loi, 'hanh_dong': hd, 'gag': gag, 'dao_cu': list(dc), 'sfx': list(sfx)}

MUA = 'Mũ rộng vành màu giấy kraft #C9A46A (dải vải đỏ #C9463A), ba lô xanh ô liu có cuộn thảm đỏ buộc trên nắp'
MUA2 = MUA + ', cạnh đó cuộn cỏ nhân tạo xanh (từ d26)'
D = []
def seg(id, pc, a, b, lop, bc, tp, vao, ra, nhip, chu, ly):
    D.append(dict(id=id, phong_cach=pc, bat_dau=a, ket_thuc=b, lop=lop, boi_canh=bc, trang_phuc=tp,
                  vao=vao, ra=ra, nhip=nhip, chu_tren_do_vat=chu, ly_do_phong_cach=ly))

# ---------- MỞ: bàn kỷ vật ----------
b1 = T(2, 'I planned')
seg('d01', 'diorama', 0.0, b1, 'hien-tai',
    'Bàn kỷ vật dưới đèn bàn; lọ thuỷ tinh nhỏ, sổ du lịch pop-up, quả bóng golf phát sáng xanh lơ nằm mép bàn (chưa giải thích); trang sổ: bản đồ code map-coober-pedy rồi map-adelaide-route',
    'Wob không mũ (khung hiện tại); cầm lọ opal tay phải',
    'dau-video', 'giay', [
    N(0.6, 'This jar holds every opal I found in Coober Pedy.', '[day-vao-cham] Khung 0 đã có Wob giơ lọ thuỷ tinh lên soi dưới đèn, mắt hãnh diện; camera đẩy chậm 1,0→1,08', '', ['lo-opal'], []),
    N(T(1, 'Listen.') - 0.1, 'Listen. That\'s mostly the jar.', '[take-cham] Wob lắc lọ sát tai: chỉ một tiếng tách nhỏ; một hạt sạn lăn ra bàn, Wob nhìn hạt sạn, dừng 0,8 s', 'Lọ chỉ có một hạt sạn', ['lo-opal', 'hat-san'], ['tach-nho']),
    N(T(1, 'Plenty'), 'Plenty of people in that desert town live underground.', '[trang-so-ban-do] Sổ pop-up sau lưng Wob bật mở bản đồ Úc (map-coober-pedy), chấm Coober Pedy nửa phải khung; một ngôi nhà giấy nhỏ chui tụt xuống dưới mặt trang đúng chữ \'underground\'', '', ['so-popup'], ['lat-giay']),
    N(T(1, 'I went to'), 'I went to find out why.', 'Wob đặt lọ xuống cạnh quả bóng golf phát sáng, kéo sổ lại gần', '', ['lo-opal'], []),
    N(T(2, 'Coober Pedy sits'), 'Coober Pedy sits in the outback of South Australia, roughly eight hundred and forty-six kilometres north-west of Adelaide by road. That\'s about five hundred and twenty-five miles.', '[luot-smootherstep] Lật sang trang map-adelaide-route; ngón tay Wob dò theo đường nét đứt Adelaide → Coober Pedy; nhãn quãng đường hiện đúng \'eight hundred\', dòng dặm hiện đúng \'miles\'', '', ['so-popup'], ['but-ve']),
    N(T(2, 'Estimates vary'), 'Estimates vary, but around half the town lives in homes dug into the hills.', 'Wob đặt lên trang một bưu thiếp mặt cắt ngọn đồi có phòng bên trong; một nửa số hình người giấy trên bưu thiếp ở trong lòng đồi, nửa kia trên mặt (không đếm chính xác, dè dặt như lời); rồi Wob nhét một hình người giấy nhỏ hình chính mình vào nửa trong lòng đồi, vỗ nhẹ, giữ 0,8 s (Wob muốn chuyển tới đây, trước mốc 30 s)', '', ['buu-thiep-mat-cat', 'hinh-wob-giay'], []),
    N(T(2, 'At the twenty'), 'At the twenty twenty-one census, around fifteen hundred people lived in the town, depending on how you draw its edges.', 'Biển thị trấn giấy pop-up ghi số dân; Wob cầm bút chì vẽ đường ranh quanh thị trấn, vẽ hai lần hai đường khác nhau đúng \'edges\'', 'Hai vòng ranh giới chồng lên nhau, Wob nhún vai', ['but-chi'], []),
    ], ['COOBER PEDY', 'Adelaide', '846 km', '~525 mi', 'pop. ~1,500 (2021)'],
    'Khung hiện tại bàn kỷ vật (diorama); bản đồ trang sổ ở lớp hiện tại vì Wob đang kể, chưa vào chuyến đi')

b2 = T(2, 'By the end')
seg('d02', 'diorama', b1, b2, 'hien-tai',
    'Bàn kỷ vật như d01; Wob lật sổ du lịch sang một trang pop-up: phòng khách giấy trước chuyến đi, hình Wob giấy nhỏ (có tay chân giấy) đứng cạnh ba lô xanh ô liu mở toang',
    'Wob ở bàn không mũ; hình Wob giấy trong sổ chưa đội mũ, mũ rộng vành kraft giấy cầm tay rồi nhét vào ba lô giấy',
    'giay', 'giay', [
    N(b1, 'I planned to be one of them.', '[lat-trang-so] Wob lật trang sổ, trang pop-up bật dựng phòng khách giấy; hình Wob giấy trong sổ đứng thẳng, ngực ưỡn', '', ['so-popup'], ['lat-giay']),
    N(T(2, 'I packed'), 'I packed a hat, a lot of water and a lot of confidence.', '[leo-thang-ba-lan] Trong trang sổ, hình Wob giấy nhét mũ rộng vành, rồi ba chai nước, ba lô phồng to hơn cả Wob; cuối cùng nhét một lá cờ nhỏ (sự tự tin) đúng \'confidence\', nắp ba lô bật tung', 'Ba lô bật nắp vì cái tự tin', ['mu-rong-vanh', 'chai-nuoc', 'co-nho'], ['bop']),
    ], [], 'Vòng 2: chuyển từ ve-tay sang trang sổ pop-up diorama để gỡ 3 lần đổi phong cách trong 13 s (T6); gag giữ nguyên')

b3 = G(2, 0.0)
seg('d03', 'diorama', b2, round(b3 + 1.5, 3), 'hien-tai',
    'Bàn kỷ vật như d01; quả bóng golf phát sáng mép bàn', 'Wob không mũ; tay không',
    'giay', 'giay', [
    N(b2, 'By the end of the trip I understood why people here dig instead of build.', '[day-vao-cham] Wob khoanh tay kể, gật nhẹ đúng \'dig\'', '', [], []),
    N(T(2, 'It cost'), 'It cost me my dignity and a golf ball.', '[giu-tinh-bo] Wob liếc quả bóng golf phát sáng đúng \'golf\', giữ 1 s; quả bóng tự lăn đi một chút', 'Quả bóng như có lỗi, lăn né đi', ['bong-golf-sang'], []),
    N(round(b3 + 0.4, 3), '', '[lat-trang-so] Wob lật trang sổ, trang pop-up bật dựng sa mạc giấy; nối giấy phẳng #EFE3C8 vào hồi ức', '', ['so-popup'], ['lat-giay']),
    ], [], 'Cắt về khung hiện tại rồi lật sổ vào hồi ức (luật phối: diorama ra → cat-giay vào bằng giay)')

# ---------- CHƯƠNG 1 Digging for Leftovers ----------
b4 = T(3, 'I dug.')
seg('d04', 'cat-giay', D[-1]['ket_thuc'], b4, 'hoi-uc',
    'Sa mạc phẳng ai-desert-plain buổi sáng, rồi cánh đồng đống đất hình nón kem hồng ai-mullock-field tới chân trời; tời gỗ nhỏ, miệng giếng tròn tối',
    MUA + '; tay cầm cái sàng tròn và xẻng nhỏ', 'giay', 'cat', [
    N(START[3], 'My first morning, I went noodling.', '[di-bo-parallax] Wob đội mũ rộng vành bước vào khung từ trái, vác sàng và xẻng, hào hứng', '', ['sang', 'xeng-nho'], []),
    N(T(3, 'Noodling means'), 'Noodling means sifting through the piles of waste dirt that miners leave behind, hoping they missed something.', 'Wob lắc sàng trên một đống đất, bụi rơi; cái sàng treo một thẻ giấy ghi NOODLING (≥ 40 px, đọc rõ); trên đỉnh đống có một chiếc tất cũ của ai đó bị bỏ lại (thứ thợ mỏ "bỏ quên")', 'Thứ duy nhất họ "bỏ sót" là một chiếc tất', ['sang'], ['sang-cat']),
    N(T(3, 'The piles are'), 'The piles are everywhere. Thousands of pale cones of rubble, as if a giant had been sneezing sand for a century.', '[lui-ra-toan-canh] Camera lùi: một đống, mười đống, cả cánh đồng; đúng \'sneezing\' một đống xa phụt nhẹ một cụm bụi như cái hắt hơi', '', [], ['hat-hoi-nho']),
    N(T(3, 'I picked'), 'I picked a pile that looked lucky. It looked exactly like every other pile.', 'Wob đi qua ba đống giống hệt nhau, chọn đống giữa, cắm lá cờ nhỏ lên; camera lia ngang lộ ra cả trăm đống y hệt', '', ['co-nho'], []),
    ], ['NOODLING'], 'Bối cảnh đến nơi, đi bộ parallax, giải thích tập quán: cat-giay. NOODLING có trong lời, mang trên thẻ treo cái sàng')

b5 = G(3, 0.5)
seg('d05', 've-tay', b4, b5, 'hoi-uc', 'Cận Wob và đống đất, nét mực sôi, trời trắng', MUA + '; xẻng nhỏ',
    'cat', 'cat', [
    N(b4, 'I dug. I found a rock.', '[leo-thang-ba-lan] Lần 1: xẻng hất, hòn đá xám; Wob giơ lên', '', ['xeng-nho'], ['xuc-dat']),
    N(T(3, 'I dug faster.'), 'I dug faster. I found a more confident rock.', 'Lần 2: đất bay tứ tung; hòn đá xám to hơn, có đôi mắt khinh khỉnh tự mãn; Wob cau mày nhìn nó', 'Hòn đá tự mãn', [], ['xuc-dat']),
    N(T(3, 'Then I tossed'), 'Then I tossed a pebble over my shoulder, and it sparkled.', 'Wob ném một viên sỏi qua vai không nhìn; sau lưng viên sỏi lấp lánh đủ màu trên đống đất (đến 0–2 khung trước \'sparkled\')', '', [], ['lap-lanh']),
    N(T(3, 'I did not'), 'I did not turn around.', '[giu-tinh-bo] Wob vẫn cúi đào; ánh lấp lánh sau lưng tắt dần; giữ hình 1 s tới cú cắt', 'Wob bỏ lỡ viên opal duy nhất', [], []),
    ], [], 'Gag ba lần và punchline sau lưng: ve-tay')

b6 = T(4, 'Today this')
seg('d06', 'cat-giay', b5, b6, 'hoi-uc',
    'Cắt giấy tông cũ nâu sepia, hạt in đậm: sa mạc 1915, lều trại của đoàn tìm vàng, mặt trời thấp',
    'Wob không xuất hiện trong cảnh lịch sử (chỉ đứng mép khung nhỏ, đội mũ, nhìn như khách tham quan bảo tàng)',
    'cat', 'chen', [
    N(START[4], 'So why build a town around a pile of gravel?', 'Wob giơ viên sỏi xám lên trước camera, xoay xoay; nền chuyển dần sang tông sepia', '', [], []),
    N(T(4, 'It started'), 'It started with a teenager. On the first of February, nineteen fifteen, a prospecting party led by James Hutchison was out here.', '[day-vao-cham] Một tờ lịch giấy rơi xuống mặt cát mở ra ngày tháng đúng \'February\'; một nhóm người giấy đội mũ, dáng chung, nhìn từ xa, không mặt rõ, dắt ngựa đi qua; Wob nhỏ đứng mép khung trái nhìn theo', '', ['to-lich'], ['giay-roi']),
    N(T(4, 'His son'), 'His son Willie, aged fourteen or fifteen depending on the source, picked up the first piece of opal.', 'Một cậu thiếu niên dạng bóng giấy (không mặt) cúi nhặt mảnh đá lấp lánh; tia sáng opal duy nhất có màu trong cảnh sepia; Wob ở mép khung trái nhón chân nhìn', '', [], ['lap-lanh']),
    N(T(4, 'Miners followed'), 'Miners followed within about a year.', 'Bóng người giấy vác cuốc kéo đến, dựng tời gỗ trên miệng giếng; đống đất đầu tiên mọc lên; Wob ở mép khung lùi nửa bước nhường đường', '', [], ['go-go']),
    ], ['1 Feb 1915'], 'Lịch sử khởi đầu thị trấn, nhẹ nhưng có thật, người thật chỉ dạng bóng: cat-giay tông cũ, không gag')

b7 = T(4, 'And here\'s')
seg('d07', 've-tay', b6, b7, 'hoi-uc', 'Nền giấy trắng, nét mực; cái khay nhỏ chia mười ô', MUA + '; cầm lọ opal rỗng',
    'chen', 'cat', [
    N(b6, 'Today this field is credited with an estimated seventy percent of the world\'s precious opal, though some local figures run higher.', '[chen-ve-tay] Wob cầm khay mười ô; đúng \'seventy\' bảy ô sáng lên màu opal; đúng \'higher\' ô thứ tám nhấp nháy nửa sáng (dè dặt)', '', ['khay-muoi-o'], ['ting']),
    N(round(T(4, 'though') + 0.6, 3), '', 'Wob cố nhét lọ opal rỗng của mình vào ô thứ tám; lọ không vừa, Wob ấn mạnh, khay nghiêng', 'Lọ của Wob không lọt vào thống kê', ['lo-opal'], ['ket']),
    ], ['~70%'], 'Chèn gag ngắn với con số, biểu cảm to: ve-tay')

b8 = T(4, 'Picture a layer')
seg('d08', 'cat-giay', b7, b8, 'hoi-uc',
    'Mặt cắt lòng đất cắt giấy nhiều lớp: biển nội địa cổ xanh phủ lên, rút đi để lại lớp đá sét; sau đó mạch opal len vào khe',
    MUA, 'cat', 'chen', [
    N(b7, 'And here\'s the part people often get half right.', 'Wob giơ một ngón tay, nghiêng đầu', '', [], []),
    N(T(4, 'The rock the'), 'The rock the opal sits in was laid down by an ancient inland sea.', '[day-vao-cham] Lớp nước biển giấy xanh trượt vào phủ cả khung, cá giấy cổ bơi qua; Wob bám mép khung bị nước giấy cuốn nổi lên, mũ nổi bên cạnh; trầm tích rơi thành lớp', '', [], ['song-nho']),
    N(T(4, 'The opal itself'), 'The opal itself came much later. One dating study suggests roughly twelve to sixteen million years ago, long after the sea had gone.', 'Biển rút sang trái để lại lớp đá khô, Wob ngồi trên lớp đá khô ướt sũng nhìn đồng hồ cát; một đồng hồ cát giấy lật nhiều vòng; rồi mạch opal sáng len vào khe đá đúng \'twelve\'', '', ['dong-ho-cat'], ['lat-giay']),
    ], ['~12–16 million years ago'], 'Giải thích cơ chế địa chất có thật, nhiều lớp: cat-giay')

b9 = T(4, 'Whether')
seg('d09', 've-tay', b8, b9, 'hoi-uc', 'Bong bóng tưởng tượng nét mực trên đầu Wob: bánh kem nhiều lớp', MUA,
    'chen', 'cat', [
    N(b8, 'Picture a layer cake where the jam was squeezed in years after baking.', '[bong-bong-tuong-tuong] Bong bóng bật ra: bánh kem nhiều lớp, ghi chữ trên lớp bánh; một ống bơm mứt chọc vào từ bên hông đúng \'squeezed\'', '', ['banh-kem'], ['bop']),
    N(T(4, 'The sea baked'), 'The sea baked the cake. The opal is the late jam.', 'Wob với tay vào bong bóng bẻ một miếng, cắn: răng gặp đá, mặt cứng đờ; giữ 0,8 s', 'Răng gặp đá', [], ['cop']),
    ], ['sea rock'], 'So sánh tưởng tượng: ve-tay')

b10 = G(4, 0.0)
seg('d10', 've-tay', b9, round(b10 + 0.8, 3), 'hoi-uc',
    'Lối vào bãi opal vẽ nét mực: bảng thông tin có dòng tiêu đề PERMIT? to rõ (≥ 40 px, không bị che) và nhiều dòng nét kẻ không đọc được bên dưới, sa mạc nét mực phía sau', MUA,
    'cat', 'cat', [
    N(b9, 'Whether you need a permit to noodle depends on who you ask, so I checked before I dug.', '[take-cham] Bảng thông tin nét mực, tiêu đề PERMIT? ở trên; Wob đọc kỹ, ngón tay dò từng dòng, gật đầu, cất xẻng vào ba lô (không khẳng định cần hay không)', '', ['xeng-nho'], []),
    ], ['PERMIT?'], 'Vòng 2: đổi sang ve-tay để nối liền d09 và d11 (gỡ 3 lần đổi phong cách trong 12 s, T6). Chữ PERMIT có trong lời, dấu hỏi giữ dè dặt mức C (C10)')

# ---------- cảnh 5 + đầu cảnh 6 ----------
b11 = T(6, 'I wrote')
seg('d11', 've-tay', D[-1]['ket_thuc'], b11, 'hoi-uc', 'Sa mạc nét mực, mặt trời tròn trên đầu Wob', MUA,
    'cat', 'cat', [
    N(START[5], 'That\'s piece one of the why. Opal pulled people into the middle of nowhere.', '[so-do-ve-tay] Một sợi dây vẽ tay kéo các hình người que từ mép khung vào giữa trang trắng; một mảnh ghép hình số 1 rơi vào chỗ', '', ['manh-ghep'], ['whoosh']),
    N(T(5, 'It did not'), 'It did not tell them where to sleep. I found that out at lunchtime.', '[day-vao-cham] Mặt trời phình dần; đúng \'lunchtime\' chiếm nửa trời', '', [], []),
    N(round(E(5) + 0.3, 3), '', 'Khoảng nghỉ không lời: mặt trời phình to thêm, mũ Wob bốc khói nhẹ; Wob nhìn lên, nuốt khan', 'Mặt trời chiếm nửa trời', [], ['xeo-xeo']),
    N(START[6], 'By noon I was melting. The sky was white, the dirt was hot, and my hat had quietly resigned.', 'Wob chảy dần như kem, chân dính đất; đúng \'resigned\' cái mũ tự tuột khỏi đầu, bò vào bóng một đống đất nằm nghỉ', 'Cái mũ bỏ việc', ['mu-rong-vanh'], ['chay-nhao']),
    ], [], 'Gag nóng, cắt nhanh, biểu cảm to: ve-tay; nối liền cảnh 5 sang mở chương 2 vì cùng một nhịp gag')

# ---------- CHƯƠNG 2 Why Is Everyone in a Hole ----------
b12 = T(6, 'My first guess')
seg('d12', 'cat-giay', b11, b12, 'hoi-uc',
    'Cận trang sổ trên đầu gối Wob, rồi sườn đồi thấp ai-dugout-hillside: cửa gỗ, cửa sổ nhỏ khoét vào đá, ống thông gió trắng trên đỉnh đồi',
    'Wob dạng hơi nhão, không mũ (mũ nằm trong bóng đống đất); ba lô; cầm sổ', 'cat', 'chen', [
    N(b11, 'I wrote in my notebook, in wobbly letters, I am not moving here.', '[lao-vao-can-canh] Cận trang sổ: dòng chữ run rẩy I am not moving here hiện rõ, đọc được ≥ 1,5 s, rồi mới chảy xuống mép giấy như sáp nóng', '', ['so-du-lich'], ['but-ve']),
    N(T(6, 'Then I noticed'), 'Then I noticed the doors. Doors cut straight into the hillsides.', '[luot-smootherstep] Wob ngẩng lên; lướt sang sườn đồi có cửa gỗ khoét vào đá', '', [], []),
    N(T(6, 'Pipes poking'), 'Pipes poking out of the ground like snorkels.', 'Camera lia lên đỉnh đồi: hàng ống thông gió; một ống phụt nhẹ một hơi như ống thở của người lặn', 'Ống thông gió thở như ống lặn', [], ['phut-hoi']),
    ], ['I am not moving here'], 'Phát hiện cửa hầm, bối cảnh có thật: cat-giay')

b13 = T(6, 'I stood')
seg('d13', 've-tay', b12, b13, 'hoi-uc', 'Trang sổ trắng nét mực, Wob vẽ sơ đồ', MUA + ' (mũ leo lại lên đầu ở 2 s đầu đoạn)',
    'chen', 'cat', [
    N(b12, 'My first guess was that the miners were hiding their opal. Reasonable. Wrong.', '[so-do-ve-tay] Hai giây đầu: cái mũ bò vào khung, leo lại lên đầu Wob khi Wob bắt đầu vẽ; Wob vẽ hầm có hòm opal giấu bên trong; đúng \'Wrong\' gạch chéo đỏ một nét', '', ['but-chi', 'mu-rong-vanh'], ['gach-but']),
    N(T(6, 'My second'), 'My second guess was that they simply love caves. Also wrong, mostly.', '[lat-the] Wob vẽ cái hang có dơi treo, tự gạch luôn, nhưng chừa lại một góc nhỏ chưa gạch đúng \'mostly\'', 'Chừa một góc cho chữ "mostly"', ['but-chi'], ['gach-but']),
    ], [], 'Đoán sai rồi lật, sơ đồ vẽ tay: ve-tay')

seg('d14', 'cat-giay', b13, G(6, 0.5), 'hoi-uc', 'Trước sườn đồi có cửa hầm, nắng trắng gắt', MUA,
    'cat', 'chen', [
    N(b13, 'I stood there, slowly dripping, and asked myself the real question.', 'Wob đứng trước một cửa gỗ, từng giọt rơi từ cằm xuống tạo vũng nhỏ', '', [], ['giot-nuoc']),
    N(T(6, 'If it\'s'), 'If it\'s this hot up here, what is it like down there?', '[day-vao-cham] Wob nhìn xuống vũng nước dưới chân: vũng phản chiếu khung cửa hầm mát màu xanh; Wob ngẩng lên, đẩy chậm vào khe cửa hé, bên trong tối mát; một luồng hơi xanh mát thoảng ra chạm mặt Wob', '', [], ['gio-mat']),
    ], [], 'Câu hỏi mở cơ chế, bối cảnh thật: cat-giay')

b15 = T(7, 'NASA')
seg('d15', 've-tay', D[-1]['ket_thuc'], b15, 'hoi-uc', 'Mặt cắt ngọn đồi vẽ tay nét mực', MUA,
    'chen', 'cat', [
    N(START[7], 'The reason is boring and brilliant.', 'Wob vẽ một mặt cắt ngọn đồi lên không khí bằng ngón tay', '', [], []),
    N(T(7, 'A few metres'), 'A few metres of rock is slow to heat up and slow to cool down, so underground the temperature hardly moves.', '[so-do-ve-tay] Mũi tên nóng đỏ đập vào mặt trên đồi, chậm dần, nhạt dần khi xuống sâu; ở đáy chỉ còn một mũi tên bé xíu ngáp', 'Mũi tên nóng tới đáy thì mệt ngáp', [], ['vut']),
    ], [], 'Cơ chế trừu tượng: ve-tay sơ đồ')

b16 = T(7, 'It\'s the same')
seg('d16', 'cat-giay', b15, b16, 'hoi-uc',
    'Ngoài cửa hầm trong bóng râm, nhìn vào phòng khoét đá ai-underground-room có nhiệt kế dán trên vách', MUA,
    'cat', 'chen', [
    N(b15, 'NASA puts it at about twenty-three degrees Celsius, around seventy-three Fahrenheit.', '[nhiet-ke-tut] Nhiệt kế trên vách đá trong phòng: cột đỏ tụt từ đỉnh xuống dừng ở 23°C; Wob ló đầu ở khung cửa nhìn theo cột đỏ', '', ['nhiet-ke'], ['ting']),
    N(T(7, 'Residents'), 'Residents describe roughly twenty-four all year, with no air conditioning and no heater.', 'Cạnh nhiệt kế một tờ giấy nhỏ ghi số dân kể; ổ cắm điều hoà trên vách bị phủ bụi và mạng nhện; Wob ló đầu ở khung cửa, nheo nhìn nhiệt kế', '', [], []),
    N(T(7, 'I sat'), 'I sat on my bag in the shade and counted that on my fingers twice.', 'Wob ngồi trên ba lô, đếm ngón tay; Wob chỉ có bốn ngón nên đếm lần hai bằng cả ngón chân', 'Không đủ ngón để đếm', [], []),
    ], ['23°C (73°F)', '~24°C (~75°F)'], 'Sự thật có số, bối cảnh liền: cat-giay. 24°C ≈ 75°F đổi đơn vị theo luật °C/°F, dấu ~ áp cả hai')

seg('d17', 've-tay', b16, G(7, 0.6), 'hoi-uc', 'Bong bóng tưởng tượng: hầm rượu', MUA,
    'chen', 'giay', [
    N(b16, 'It\'s the same trick as a wine cellar.', '[bong-bong-tuong-tuong] Bong bóng bật: hầm rượu, chai nằm yên trên giá', '', [], ['bop']),
    N(T(7, 'The cellar'), 'The cellar doesn\'t make anything cold. It just ignores the weather.', 'Ngoài cửa hầm mặt trời và mặt trăng thay nhau gõ cửa liên hồi; trong hầm chai rượu ngủ ngáy; đúng \'ignores\' giữ hình cửa đóng 0,8 s', 'Chai rượu ngủ mặc kệ trời', [], ['go-cua', 'ngay']),
    ], [], 'So sánh đời thường tưởng tượng: ve-tay')

seg('d18', 'cat-giay', D[-1]['ket_thuc'], G(8, 0.5), 'hoi-uc',
    'Hành lang khách sạn dưới đất, rồi phòng ai-underground-room: vách đá trần, trần vòm sơn sáng, giường sát vách, đèn vàng; cuối đoạn cận sổ',
    MUA + ' (mũ chạy theo sau rồi Wob cởi mũ treo đầu giường)', 'giay', 'cat', [
    N(START[8], 'So I booked a room in an underground hotel.', 'Chìa khoá phòng treo thẻ gỗ rơi vào tay Wob', '', ['chia-khoa'], ['leng-keng']),
    N(T(8, 'I walked'), 'I walked down the corridor, out of the glare, and my shape came back.', '[di-bo-parallax] Wob nhão đi xuống hành lang; đúng \'shape\' bật lại tròn xoe kèm tiếng boing; cái mũ chạy theo vào sau', 'Wob bật lại hình tròn', ['mu-rong-vanh'], ['boing']),
    N(T(8, 'The walls'), 'The walls were bare rock, curving up into a pale ceiling.', '[lia-theo-vat] Lia theo vách đá lên trần vòm sơn sáng', '', [], []),
    N(T(8, 'No window.'), 'No window. No traffic. No sun trying to get in.', 'Ba ô cận trong 3,5 s, mỗi ô khớp đúng một chữ No, không chồng: khung cửa sổ vẽ phấn trên đá bị xoá; xe đồ chơi đỗ yên; một tia nắng ló ở khe cửa, cửa đóng sập', 'Mặt trời bị nhốt ngoài', [], ['cua-dong']),
    N(T(8, 'I slept'), 'I slept like a rock, inside a rock.', 'Wob ngủ trên giường sát vách, ngực phập phồng; một hòn đá nhỏ đầu giường cũng nhắm mắt ngủ', 'Hòn đá ngủ cùng', [], ['ngay']),
    N(T(8, 'By breakfast'), 'By breakfast I had crossed out the line in my notebook. I was moving here after all.', 'Wob gạch dòng chữ run trong sổ, viết lại nét chữ chắc', '', ['so-du-lich'], ['gach-but']),
    ], ['I am not moving here', 'I was moving here after all'], 'Một chuỗi đi vào, ở, đổi ý trong bối cảnh liền: cat-giay')

# ---------- CHƯƠNG 3 Machine ----------
b19 = T(9, 'According')
seg('d19', 've-tay', D[-1]['ket_thuc'], b19, 'hoi-uc', 'Cận Wob nằm trên giường nhìn trần đá', 'Wob không mũ (mũ treo đầu giường); cầm thìa cà phê',
    'cat', 'cat', [
    N(START[9], 'In the morning I stared at the rock above my bed and asked the obvious question. Who digs a bedroom?', '[take-cham] Wob cầm thìa cà phê cạo trần; cạo mãi mới rơi một hạt bụi', '', ['thia-ca-phe'], ['cao']),
    N(T(9, 'Someone'), 'Someone who already digs for a living.', 'Wob nhìn hạt bụi, nhìn người xem; giữ 0,7 s', 'Thìa cà phê thua đá', [], []),
    ], [], 'Gag cận, phản ứng: ve-tay')

seg('d20', 'cat-giay', b19, G(9, 0.5), 'hoi-uc',
    'Nửa đầu cắt giấy tông cũ: tời trên miệng giếng cạnh cửa hầm nhỏ có ống khói; nửa sau hiện tại: xe tải hút đất có thùng và ống lớn cắm xuống đất giữa ai-mullock-field',
    MUA + ' (đội lại mũ khi ra ngoài)', 'cat', 'chen', [
    N(b19, 'According to a state heritage report, the first miners probably started digging homes within a few years of the find.', '[day-vao-cham] Tông sepia: bóng thợ mỏ (dạng chung) vác cuốc từ giếng sang đào cửa hầm bên cạnh, cùng một cái cuốc', '', [], ['go-go']),
    N(T(9, 'The local'), 'The local council even issues a permit for a blower, a truck that vacuums dirt out of a tunnel.', 'Màu trở lại; xe tải hút đất gầm lên, ống hút cắm xuống đất; tờ giấy phép giấy kẹp trên kính xe; Wob đứng cạnh xe, nhìn ống hút', '', ['giay-phep'], ['may-hut']),
    N(T(9, 'That one'), 'That one permit covers mining and digging out a home.', 'Cận tờ giấy phép trên kính xe, chữ PERMIT ≥ 40 px; Wob đứng cạnh xe giơ tay giữ mũ nhưng ống hút hút luôn cái mũ; mũ bay vòng lên rồi rơi bịch xuống đỉnh đống đất', 'Máy hút ăn mũ', ['mu-rong-vanh'], ['hut', 'bich']),
    N(T(9, 'A mine and'), 'A mine and a bedroom, it turns out, are the same hole with different furniture.', '[lat-the] Mặt cắt hai hầm giống hệt nhau; một bên lật thẻ thêm giường, đèn bàn; giữ 0,8 s', '', [], ['lat-giay']),
    ], ['PERMIT'], 'Lịch sử ngắn + máy móc có thật: cat-giay, tông cũ ở nửa đầu không gag; gag mũ chỉ ở nửa hiện tại')

seg('d21', 've-tay', D[-1]['ket_thuc'], G(10, 0.6), 'hoi-uc', 'Hai ô vẽ tay đặt cạnh nhau', MUA + ' (mũ đã nhặt lại, phủ bụi)',
    'chen', 'cat', [
    N(START[10], 'Here\'s how I think about it.', 'Wob phủi bụi mũ, đội lại', '', ['mu-rong-vanh'], []),
    N(T(10, 'Building'), 'Building a house out here and keeping it cool is like running a fan every afternoon, every summer, forever.', '[so-do-ve-tay] Ô trái: nhà tôn trên mặt đất, cái quạt quay tít, đồng hồ điện quay nhanh, lịch xé từng tờ', '', [], ['quat-quay']),
    N(T(10, 'Digging one'), 'Digging one is like buying a really good hat. You pay once, and then the rock does the work.', 'Ô phải: ngọn đồi đội một cái mũ rộng vành khổng lồ, bình thản', '', [], []),
    N(T(10, 'I couldn\'t'), 'I couldn\'t find hard numbers on the savings, but locals say they don\'t need air conditioning down there.', 'Wob lật tờ hoá đơn trống trơn, nhún vai (không vẽ con số tiết kiệm)', '', [], []),
    N(round(E(10) + 0.2, 3), '', '[giu-tinh-bo] Cái quạt mệt lả gục xuống; ngọn đồi đội mũ vẫn bình thản, Wob đội mũ đứng cạnh, giữ 1 s', 'Quạt kiệt sức, đồi đội mũ không', [], ['xi-xi']),
    ], [], 'So sánh tưởng tượng: ve-tay')

seg('d22', 'cat-giay', D[-1]['ket_thuc'], T(11, 'The Serbian'), 'hoi-uc',
    'Cắt giấy nhiều lớp mặt cắt ngọn đồi: một phòng, rồi nhiều phòng nối nhau, rồi cả dãy đồi đầy phòng (ai-dugout-hillside làm phông xa)', MUA,
    'cat', 'cat', [
    N(START[11], 'Then I zoomed out. One room becomes a house. Houses become a hotel, shops and churches.', '[lui-ra-toan-canh] Camera lùi qua các lớp cắt giấy parallax; mỗi bước lùi Wob nhỏ đi một nấc, cuối cùng chỉ còn một chấm có cái ba lô', 'Wob thành một chấm ba lô', [], ['whoosh-nhe']),
    ], [], 'Vòng 2: đổi từ diorama sang cat-giay (lùi qua lớp parallax) để diorama về ≤ 20% (T6)')

seg('d23', 'cat-giay', D[-1]['ket_thuc'], T(11, 'The town picked'), 'hoi-uc',
    'Trong nhà thờ khoét đá ai-church-underground: trần cao, vách đá cát, đèn vàng; Wob đứng cuối phòng', MUA + '; đội mũ khi vào, cởi mũ cầm hai tay ở nhịp 2',
    'cat', 'cat', [
    N(T(11, 'The Serbian'), 'The Serbian Orthodox church of Saint Elijah was dug into the rock in nineteen ninety-three.', '[day-vao-cham] Đẩy chậm dọc lòng nhà thờ, không có người (trống, yên); một bảng nhỏ ở cửa ghi năm', '', [], []),
    N(T(11, 'I stood'), 'I stood at the back with my hat in my hands and kept very quiet.', 'Wob cởi mũ, đứng im cuối phòng', '', ['mu-rong-vanh'], []),
    N(T(11, 'Even the echo'), 'Even the echo seemed polite.', 'Wob khẽ hắng giọng; một gợn sóng âm nhỏ đi ra rồi cúi chào, tan (gag nhẹ, không đùa về tôn giáo hay giáo dân)', 'Tiếng vang cúi chào', [], ['vang-nho']),
    ], ['St Elijah · 1993'], 'Không gian thật, yên tĩnh, tôn trọng: cat-giay, gag rất nhẹ chỉ về tiếng vang')

seg('d24', 'cat-giay', D[-1]['ket_thuc'], G(11, 0.5), 'hoi-uc',
    'Cắt giấy nhiều lớp parallax mặt đất trên dãy đồi: ống thông gió nhô lên khắp nơi như hàng cây; biển thị trấn giấy pop-up', MUA + ' (đội lại mũ)',
    'cat', 'giay', [
    N(T(11, 'The town picked'), 'The town picked its name around nineteen twenty, though records differ by a year or two, and got its own council in nineteen eighty-seven.', '[lia-theo-vat] Wob đi dọc rừng ống thông gió, áp tai vào một ống nghe tiếng gió; sau lưng Wob biển thị trấn bật dựng, hai năm hiện lần lượt', '', [], ['lat-giay']),
    N(T(11, 'Everyone here'), 'Everyone here had the same idea, with the same machines.', 'Wob đứng cạnh ba chiếc xe hút đất giống hệt nhau đỗ thành hàng, nghiêng đầu so từng chiếc, giữ 0,8 s', '', [], []),
    ], ['~1920', '1987'], 'Vòng 2: đổi từ diorama sang cat-giay (parallax nhiều lớp) để diorama về ≤ 20% (T6); mạch cat-giay d22–d25 vẫn dưới 90 s')

# ---------- CHƯƠNG 4 Golf ----------
b25 = T(12, 'I carried')
seg('d25', 'cat-giay', D[-1]['ket_thuc'], b25, 'hoi-uc',
    'Trang sổ có đồng hồ vẽ tay quay tới chiều; sân golf ai-golf-course nền đá trắng, cờ lỗ cắm giữa vùng tròn màu sẫm, bóng đổ dài', MUA + '; gậy golf',
    'giay', 'chen', [
    N(START[12], 'Late afternoon, when the sun finally lowered its voice, I went to play golf.', '[dong-ho-troi] Kim đồng hồ quay tới chiều; mặt trời hạ thấp, bóng đổ dài; Wob vác gậy bước ra', '', ['gay-golf'], ['tic-tac']),
    N(T(12, 'The Opal'), 'The Opal Fields Golf Club was set up in nineteen seventy-six, and it has no grass at all.', 'Biển câu lạc bộ; Wob cúi tìm cỏ dưới đá bằng kính lúp, chỉ thấy một hạt sỏi', 'Kính lúp tìm cỏ', ['kinh-lup'], []),
    N(T(12, 'The fairways'), 'The fairways are white crushed rock. The greens, which they call scrapes, are rock dust mixed with waste oil.', '[luot-smootherstep] Lướt từ đường đá trắng tới vùng tròn sẫm có cờ lỗ', '', [], []),
    N(T(12, 'Players'), 'Players carry a small square of artificial turf to hit from.', 'Một miếng cỏ nhân tạo vuông được đặt xuống đá, quả bóng đặt lên', '', ['mieng-co'], []),
    ], ['OPAL FIELDS GOLF CLUB · 1976', 'scrapes'], 'Một ngày ở đây, bối cảnh thật: cat-giay')

seg('d26', 've-tay', b25, G(12, 0.5), 'hoi-uc', 'Cận Wob nét mực', MUA + '; miếng cỏ nhân tạo cuộn kẹp nách, thảm đỏ trên ba lô; gậy golf',
    'chen', 'cat', [
    N(b25, 'I carried mine under my arm like a tiny rolled carpet. My backpack already has a red one. Now it had a green one too.', 'Wob kẹp miếng cỏ cuộn dưới nách; camera vòng ra sau: cuộn thảm đỏ trên ba lô; đúng \'green\' cuộn xanh đặt cạnh cuộn đỏ', '', ['mieng-co', 'tham-do'], []),
    N(T(12, 'I looked'), 'I looked extremely prepared for a sport I could not play.', '[take-cham] Wob tạo dáng vung gậy oai vệ; gậy đánh hụt, xoay Wob nửa vòng; giữ 0,8 s', 'Vung hụt', ['gay-golf'], ['vut']),
    ], [], 'Gag phản ứng: ve-tay')

b27 = T(13, 'Gone.')
seg('d27', 'cat-giay', D[-1]['ket_thuc'], b27, 'hoi-uc',
    'Sân golf ai-golf-course về đêm, trời xanh thẫm có sao, đống đất ai-mullock-field ở rìa sân', MUA2 + '; gậy golf; bóng phát sáng',
    'cat', 'cat', [
    N(START[13], 'Then night. The heat finally backed off, and the course changed shape in the dark.', '[day-vao-cham] Trời chuyển đêm; đèn lỗ cờ, đường đá trắng lờ mờ', '', [], ['de-keu']),
    N(T(13, 'When the days'), 'When the days get too hot, people here play in the dark with balls that glow.', 'Xa xa vài bóng người chơi dạng chung, quả bóng xanh lơ bay thành vệt sáng', '', ['bong-golf-sang'], []),
    N(T(13, 'My ball'), 'My ball glowed beautifully, all the way into a pile of dirt.', '[lia-theo-vat] Wob vung gậy, quả bóng phát sáng bật đi; lia theo quả bóng của Wob bay vòng cung đẹp rồi rơi vào sườn một đống đất', '', ['bong-golf-sang'], ['phup']),
    ], [], 'Một ngày ở đây sang đêm: cat-giay')

seg('d28', 'cat-giay', b27, T(13, 'This club'), 'hoi-uc', 'Cận đống đất trong đêm, cắt giấy cùng bối cảnh d27', MUA2 + '; gậy golf',
    'cat', 'cat', [
    N(b27, 'Gone. And the strangest detail of all.', '[giu-tinh-bo] Ánh xanh của quả bóng mờ dần trong đống đất như ngọn nến tắt; Wob cầm gậy đứng im, giữ 0,9 s', 'Bóng tắt như nến', [], []),
    ], [], 'Vòng 2: đổi từ ve-tay sang cat-giay, nối liền như nhịp cuối d27 (gỡ 3 lần đổi phong cách trong 14 s, T6)')

b29 = T(13, 'I get it.')
seg('d29', 'cat-giay', D[-1]['ket_thuc'], b29, 'hoi-uc',
    'Hai tấm bưu thiếp cắt giấy đặt cạnh nhau trên mặt đá: một sân cỏ xanh mướt dưới mưa, một sân đá trắng dưới sao', MUA2,
    'cat', 'chen', [
    N(T(13, 'This club'), 'This club has a reciprocal arrangement with St Andrews in Scotland, often called the home of golf.', '[ky-vat-chuyen-canh] Wob đặt hai bưu thiếp xuống mặt đá, kéo căng một sợi chỉ đỏ nối hai tấm', '', ['buu-thiep'], ['giay-truot']),
    N(T(13, 'Golf Digest'), 'Golf Digest reported that nobody knew of any St Andrews member who had actually come out to play.', 'Trên bưu thiếp sân cỏ, một chiếc ô giấy (không người) đứng yên dưới mưa; trên bưu thiếp sân đá, Wob thổi bụi khỏi ghế chờ khách trống: mạng nhện bay lên rồi rơi lại đúng chỗ cũ, giữ 0,8 s', 'Ghế chờ khách phủ mạng nhện', [], []),
    ], ['ST ANDREWS'], 'Đồ vật so sánh có thật: cat-giay')

seg('d30', 've-tay', b29, G(13, 0.6), 'hoi-uc', 'Đường đá trắng trong đêm, nét mực', MUA2 + '; miếng cỏ cuộn; gậy golf',
    'chen', 'giay', [
    N(b29, 'I get it. I lost a ball and my dignity here, in that order.', 'Wob cuộn miếng cỏ lại, lê bước về, gậy kéo lê trên đá thành vệt; đúng \'dignity\' cái mũ trượt lệch che một mắt', '', ['mieng-co', 'gay-golf'], ['keo-le']),
    ], [], 'Phản ứng buồn cười, kết chương: ve-tay')

# ---------- CHƯƠNG 5 What the Desert Charges ----------
b31 = T(14, 'According')
seg('d31', 'cat-giay', D[-1]['ket_thuc'], b31, 'hoi-uc',
    'Trang sổ pop-up: bản đồ code map-adelaide-route, đường nét đứt, chiếc xe giấy nhỏ; rồi bản đồ code map-coober-pedy-water dạng mặt cắt: ống nước từ giếng sâu phía đông bắc chạy dưới sa mạc về thị trấn (vị trí giếng ghi approx.)',
    MUA2, 'giay', 'chen', [
    N(START[14], 'Back on my map page, the costs started piling up.', '[trang-so-ban-do] Trang sổ mở; đồng xu giấy rơi chồng lên góc trang', '', ['dong-xu'], ['xu-roi']),
    N(T(14, 'The drive'), 'The drive from Adelaide takes about nine hours.', '[xe-giay] Xe giấy chạy theo nét đứt; phông sau lưng lặp y hệt ba lần cùng một bụi cây; lần thứ ba Wob trong xe chỉ tay vào bụi cây', 'Bụi cây lặp lại', ['xe-giay'], ['dong-co']),
    N(T(14, 'Water'), 'Water isn\'t around the corner either. The town pumps it from an underground bore about sixty metres deep, some twenty-three to twenty-five kilometres to the north-east, depending on which council document you read.', 'Lật sang bản đồ nước: chấm giếng phía đông bắc, một mặt cắt nhỏ cho thấy ống chọc xuống sâu; đường ống nét đứt chạy về thị trấn; nhãn tách: bore ~60 m deep hiện đúng chữ sixty, 23–25 km NE (approx.) hiện đúng chữ kilometres, không hiện cùng lúc', '', [], ['lat-giay']),
    N(T(14, 'Then it filters'), 'Then it filters it by reverse osmosis, which it has done since nineteen eighty-five.', 'Một hộp máy lọc giấy ở đầu thị trấn, nước đi qua nhiều lớp màng', '', [], ['nuoc-chay']),
    ], ['Adelaide', 'Coober Pedy', '~9 hours', 'bore ~60 m deep', '23–25 km NE (approx.)', 'since 1985'], 'Hành trình và bản đồ trang sổ: cat-giay; bản đồ vẽ bằng code, vị trí giếng ghi approx.')

seg('d32', 've-tay', b31, G(14, 0.5), 'hoi-uc', 'Sơ đồ ống nước vẽ tay, rồi bồn rửa', MUA2,
    'chen', 'cat', [
    N(b31, 'According to an older report, the ageing pipes were losing somewhere between thirty and fifty percent of that water.', '[so-do-ve-tay] Ống nước vẽ tay rò rỉ nhiều lỗ, giọt nước nhảy ra; vạch đo nước tụt dần giữa hai mốc; Wob bịt một lỗ rò bằng ngón tay, lỗ khác lại phụt', '', [], ['ro-ri']),
    N(T(14, 'The council'), 'The council has also been the only council in South Australia running its own water and power.', 'Một ngôi sao giấy duy nhất trên bản đồ bang; Wob gắn hai biểu tượng giọt nước và tia điện', '', [], []),
    N(T(14, 'In twenty'), 'In twenty twenty-six, the water service was moving over to the state utility, SA Water.', 'Một chiếc chìa khoá to có nhãn được trao từ tay này sang tay kia (hai bàn tay chung, không người cụ thể); Wob đứng cạnh đỡ hộ cái chìa khoá nặng', '', [], []),
    N(T(14, 'Imagine'), 'Imagine your kitchen tap connected to a straw that long.', 'Wob ở bồn rửa hút thử một ống hút dài vắt qua cả trang sổ, má hóp lại, chờ mãi mới có một giọt; giữ 0,8 s', 'Ống hút dài cả trang', ['ong-hut'], ['hut-roc']),
    ], ['≈30–50%', 'SA Water', '2026'], 'Sơ đồ trừu tượng + gag ống hút: ve-tay')

b33 = T(15, 'and I read')
seg('d33', 'cat-giay', D[-1]['ket_thuc'], b33, 'hoi-uc',
    'Ban ngày giữa ai-mullock-field: miệng giếng tròn đen giữa các đống đất, một tấm tôn gỉ che dở, lưới thép; biển cảnh báo ở lối vào', MUA2,
    'cat', 'chen', [
    N(START[15], 'Then there are the holes.', '[lao-vao-can-canh] Vành mũ Wob làm tiền cảnh khi camera lao vào cận một miệng giếng tròn đen, tối hun hút; Wob dừng lại cách xa mép', '', [], ['gio-hu']),
    N(T(15, 'Old mine'), 'Old mine shafts sit all around town, some unmarked, some hidden under sheets of iron or mesh or a heap of dirt.', 'Lia ngang theo Wob dò từng bước giữa miệng giếng trống, tấm tôn gỉ, lưới thép, một đống đất lún nhẹ', '', [], []),
    N(T(15, 'Nobody'), 'Nobody seems to have an exact count. One local rescuer, according to the ABC, put it at around two million.', '[lui-ra-toan-canh] Lùi ra: chấm đen lấm tấm khắp mặt đất như bột tiêu tới chân trời (không đếm, không ghi số); Wob nhỏ đứng giữa cánh đồng chấm đen', '', [], []),
    N(T(15, 'Warning'), 'Warning signs stand at the entrances to the opal fields,', 'Biển cảnh báo giấy cắm ở lối vào bãi (biển không chữ đọc được, chỉ biểu tượng người rơi xuống hố); Wob đứng trước biển bắt đầu đọc, nối sang d34', '', [], []),
    ], [], 'Bối cảnh có thật, mức nguy hiểm: cat-giay')

b34 = T(15, 'In February')
b34h = T(15, 'backwards.', end=True)
seg('d34', 've-tay', b33, b34, 'hoi-uc', 'Cận Wob giữa các đống đất ở lối vào, nét mực; KHÔNG có miệng giếng trong khung', MUA2,
    'chen', 'cat', [
    N(b33, 'and I read every single one walking backwards.', '[va-cham-vat-ly] Wob đi lùi, mũi dí vào tờ biển; lưng va vào một đống đất, ngồi phịch xuống, ba lô bật nắp, giữ 0,8 s (không dính miệng giếng)', 'Đống đất ngáng lưng, ba lô bật nắp', [], ['bich', 'bop']),
    N(b34h, 'That was a mistake.', 'Khoảng lặng ≥ 1,5 s trước câu sự cố: giữ hình Wob ngồi im phủi bụi rất chậm, cắt nhạc, không sfx, không gag mới', '', [], []),
    ], [], 'Gag Wob ngắn: ve-tay; gag xa giếng, xong trước khoảng lặng ≥ 1,5 s (cắt nhạc, giữ hình) trước câu sự cố thật')

seg('d35', 'cat-giay', b34, G(15, 0.0), 'hoi-uc',
    'Cắt giấy tông trầm: đêm ai-night-plain, miệng giếng tối dưới bầu trời sao, một luồng đèn tím nhỏ xa xa; không vẽ người, không vẽ người ngã', MUA2 + ' (bụi bám sau cú ngồi phịch d34)',
    'cat', 'giay', [
    N(b34, 'In February twenty twenty-four, a man looking for opal at night with an ultraviolet torch fell about twenty-five metres down an old shaft.', '[lui-cham-im-lang] Không gag. Luồng đèn tím nhỏ phía xa giữ nguyên, không tắt; camera lùi chậm rời khỏi nó, dừng ở miệng giếng tối; không đồng bộ gì với chữ fell', '', [], []),
    N(T(15, 'After that'), 'After that fall, SafeWork SA put out an alert called Mind your step in opal fields. Searching at night raises the risk.', 'Một tờ thông báo giấy đặt xuống mép khung, chữ tiêu đề đọc được', '', [], ['giay-roi']),
    N(T(15, 'Standing'), 'Standing at the edge of one hole, for about a minute, I was ready to go home.', '[dat-ky-vat-xuong] Ban ngày trở lại; Wob đứng xa mép giếng, cầm biển mini ghi tên tờ thông báo, đặt nó xuống cạnh miệng giếng; Wob chỉnh lại ba lô, quay lưng', '', ['bien-mini'], []),
    ], ['Feb 2024', '~25 m', 'MIND YOUR STEP IN OPAL FIELDS'], 'Sự cố có thật, nghiêm: cat-giay tông trầm, không gag')

# ---------- CHƯƠNG 6 Whose Land This Is (nghiêm, không gag) ----------
seg('d36', 'cat-giay', D[-1]['ket_thuc'], G(16, 0.5), 'hoi-uc',
    'Cắt giấy tông trầm Kanku-Breakaways (ai-breakaways-dusk): dãy đồi đỉnh bằng nhiều tầng trắng, vàng, cam, đỏ nâu dưới trời chiều. CHỈ PHONG CẢNH: không người, không biểu tượng, hoa văn hay nghệ thuật thổ dân. Wob nhỏ ngồi ở xa, không chạm gì',
    'Wob KHÔNG mũ (để mũ trong xe), ba lô (cuộn thảm đỏ và cuộn cỏ xanh) đặt bên cạnh; tay đặt trên đầu gối', 'giay', 'cat', [
    N(START[16], 'On my last evening I drove north to Kanku-Breakaways, about twenty-five kilometres out of town. I left the hat in the car.', '[dat-ky-vat-xuong] Không gag. Xe giấy dừng ở mép khung; Wob đặt mũ lên ghế xe, đóng cửa nhẹ', '', ['mu-rong-vanh'], ['cua-xe']),
    N(T(16, 'Flat-topped'), 'Flat-topped hills, banded white, yellow, orange and deep red.', '[day-vao-cham] Cỡ cận: đẩy chậm vào vách đồi, các tầng màu hiện lần lượt theo từng màu được đọc', '', [], []),
    N(T(16, 'This is'), 'This is the country of the Antakirinja Matu-Yankunytjatjara people.', 'Giữ toàn cảnh tĩnh, ánh chiều đều; tên viết đúng chính tả trên một dải giấy nhỏ dưới khung (vùng an toàn, ≥ 40 px)', '', [], []),
    N(T(16, 'The whole'), 'The whole park is a registered Aboriginal heritage site, and visitors are asked not to touch or take anything.', 'Cỡ trung: Wob ngồi xa chân đồi, bàn tay vừa định chạm hòn đá thì rút về đặt lên gối (đúng ý not to touch)', '', [], []),
    N(T(16, 'It belongs'), 'It belongs to their corporation and has been jointly managed with the state since twenty thirteen.', '[lui-cham-im-lang] Lùi chậm, im lặng; ánh chiều chuyển dần sang cam', '', [], []),
    N(T(16, 'In twenty eleven'), 'In twenty eleven, the Federal Court recognised their native title over nearly seventy-nine thousand square kilometres around Coober Pedy. The court sat in Coober Pedy to do it.', 'Cỡ toàn rộng: phong cảnh rộng ra hơn nữa tới chân trời; năm và diện tích hiện lặng lẽ ở góc trái dưới', '', [], []),
    N(T(16, 'According'), 'According to the determination, some town blocks were left out.', 'Giữ hình, ánh sáng hạ thêm một nấc', '', [], []),
    ], ['Kanku-Breakaways', 'Antakirinja Matu-Yankunytjatjara', '2011', '~79,000 km²'], 'lich-su-nghiem: cat-giay tông trầm, không gag; chỉ phong cảnh')

seg('d37', 'diorama', D[-1]['ket_thuc'], G(17, 0.0), 'hoi-uc',
    'Diorama giấy 2.5D Breakaways lúc chạng vạng: các lớp đồi tách xa nhau, trời chuyển tím, sao đầu tiên; chỉ phong cảnh, không người, không biểu tượng thổ dân',
    'Wob không mũ; ba lô (cuộn thảm đỏ và cuộn cỏ xanh) bên cạnh; cầm sổ rồi gấp sổ đặt xuống', 'cat', 'cat', [
    N(START[17], 'Even the town\'s name is usually said to come from Aboriginal words, and nobody fully agrees on it. Some sources translate them as something like white man\'s hole, others as water hole. Linguists still debate where the words came from.', 'Không gag, không chữ. Camera đi rất chậm giữa các lớp đồi; Wob ngồi nhỏ ở tiền cảnh trái, nhìn xa', '', ['so-du-lich'], []),
    N(T(17, 'I put'), 'I put my notebook away and watched the hills turn purple.', '[dat-ky-vat-xuong] Wob gấp sổ, đặt xuống bên cạnh; đồi chuyển tím, sao đầu tiên hiện', '', ['so-du-lich'], []),
    N(T(17, 'The miners'), 'The miners arrived more than a century ago. This land had its people long before that.', '[lui-cham-im-lang] Lùi chậm, im lặng; giữ hình', '', [], []),
    ], [], 'Đoạn suy ngẫm nghiêm, cần chiều sâu yên: diorama (cũng để tách mạch cat-giay dài); không gag')

# ---------- KẾT: bàn kỷ vật ----------
b38 = T(18, 'Above ground')
seg('d38', 'diorama', D[-1]['ket_thuc'], b38, 'hien-tai',
    'Bàn kỷ vật dưới đèn bàn như d01; Wob xếp kỷ vật thành hàng',
    'Wob không mũ (khung hiện tại); mũ rộng vành treo trên móc sau lưng', 'cat', 'chen', [
    N(round(G(17, 0.0) + 0.3, 3), '', '[cat-cung-ve-hien-tai] Wob ngồi lại bàn, kéo đèn', '', [], ['den-bat']),
    N(START[18], 'So here\'s how the jar adds up.', '[ky-vat-chuyen-canh] Wob xếp thành hàng: lọ opal, miếng cỏ nhân tạo cuộn, quả bóng golf phát sáng, biển mini, trang ký hoạ đồi Breakaways trong sổ của Wob (không mang gì về từ đó)', '', ['lo-opal', 'mieng-co', 'bong-golf-sang', 'bien-mini', 'so-du-lich'], []),
    N(T(18, 'Opal brought'), 'Opal brought people to the desert. The heat pushed them into the rock. And the digging skills they already had made a hole cheaper than fighting the sun.', 'Wob đẩy lần lượt ba kỷ vật lên trước theo ba ý (lọ opal, bưu thiếp mặt cắt, viên sỏi)', '', [], []),
    N(T(18, 'Down there'), 'Down there, according to NASA, the rock holds around twenty-three degrees. Residents say closer to twenty-four.', 'Nhiệt kế nhỏ trên bàn chỉ 23°C, Wob búng nhẹ, cột nhích lên một chút', '', ['nhiet-ke'], []),
    N(T(18, 'Would I'), 'Would I move there?', 'Wob cầm con dấu lên, ngập ngừng', '', ['con-dau'], []),
    ], ['23°C (73°F)', '~24°C (~75°F)'], 'Khung hiện tại: diorama')

b39 = T(18, 'My verdict')
seg('d39', 've-tay', b38, b39, 'hien-tai', 'Cận tấm bưu thiếp mặt cắt ngọn đồi trong tay Wob, nét mực', 'Wob không mũ',
    'chen', 'cat', [
    N(b38, 'Above ground, no chance. Below ground, absolutely.', '[lat-the] Nửa trên bưu thiếp: Wob chảy nhão dưới mặt trời đúng \'no chance\'; lật xuống nửa dưới: Wob tròn trịa ngủ ngon đúng \'absolutely\'', '', ['buu-thiep-mat-cat'], ['lat-giay']),
    ], [], 'Chèn so sánh nhanh, biểu cảm to: ve-tay')

seg('d40', 'diorama', b39, END, 'hien-tai',
    'Bàn kỷ vật; trang sổ mở cho con dấu nằm nửa trái khung; con dấu WOULD MOVE và chữ Would Wob move here? đặt trong vùng x 96–1100, y 160–540 (ngoài góc end screen x > 1150, y > 560 và ngoài vùng logo x > 1500, y < 150) từ lúc đóng dấu tới cuối video; góc phải dưới để trống',
    'Wob không mũ; cầm con dấu, rồi khung cửa sổ giấy, miếng cỏ cuộn, lọ opal, nhiệt kế', 'cat', 'het-video', [
    N(b39, 'My verdict is WOULD MOVE, as long as the bedroom is a hole.', 'Wob đóng con dấu lên trang sổ đúng \'WOULD MOVE\' (chữ ký âm thanh dau-wob do ghép tự đặt); giữ cận con dấu sạch ≥ 2 s', '', ['con-dau', 'so-du-lich'], ['dau-wob']),
    N(T(18, 'It suits'), 'It suits people who love quiet, steady temperatures and long drives. It does not suit anyone who needs a window, or a lawn.', 'Wob đếm trên ngón tay; đúng \'window\' Wob giơ một khung cửa sổ giấy nhỏ lên nhìn qua; đúng \'lawn\' Wob trải miếng cỏ cuộn xanh ra bàn thành một bãi cỏ giấy bé tí, vỗ vỗ, lắc đầu', '', ['khung-cua-so-giay', 'mieng-co'], ['lat-giay']),
    N(T(18, 'I gave'), 'I gave the jar one last shake. Still mostly jar.', '[take-cham] Wob lắc lọ sát tai; hạt sạn rơi ra lần này lấp lánh một chút; Wob nheo mắt nhìn, giữ 0,8 s', 'Hạt sạn hoá ra có chút opal', ['lo-opal', 'hat-san'], ['tach-nho', 'lap-lanh']),
    N(T(18, 'Would you'), 'Would you give up every window you own for a room that stays in the low twenties all year?', 'Wob giơ khung cửa sổ giấy một tay, nhiệt kế nhỏ một tay, cân nhắc, rồi đặt khung cửa sổ xuống; nhìn thẳng người xem, kết đúng ở chữ cuối; đẩy rất chậm; giữ 1,3 s', '', [], []),
    ], ['Would Wob move here?', 'WOULD MOVE'], 'Đóng tập, con dấu phán quyết ở khung hiện tại: diorama')

# ----- nhạc -----
nhac = [
    {'src': 'music/wallpaper.mp3', 'bat_dau': 0.0, 'ket_thuc': D[2]['ket_thuc'], 'mood': 'to-mo'},
    {'src': 'music/investigations.mp3', 'bat_dau': D[2]['ket_thuc'], 'ket_thuc': D[5]['ket_thuc'], 'mood': 'hai'},
    {'src': 'music/inspired.mp3', 'bat_dau': D[5]['ket_thuc'], 'ket_thuc': D[9]['ket_thuc'], 'mood': 'to-mo'},
    {'src': 'music/sneaky-snitch.mp3', 'bat_dau': D[9]['ket_thuc'], 'ket_thuc': D[13]['ket_thuc'], 'mood': 'hai'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': D[13]['ket_thuc'], 'ket_thuc': D[23]['ket_thuc'], 'mood': 'to-mo'},
    {'src': 'music/investigations.mp3', 'bat_dau': D[23]['ket_thuc'], 'ket_thuc': D[29]['ket_thuc'], 'mood': 'hai'},
    {'src': 'music/inspired.mp3', 'bat_dau': D[29]['ket_thuc'], 'ket_thuc': b34h, 'mood': 'to-mo'},
    {'src': 'music/lightless-dawn.mp3', 'bat_dau': D[33]['ket_thuc'], 'ket_thuc': D[36]['ket_thuc'], 'mood': 'khac-nghiet'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': round(D[36]['ket_thuc'] + 0.3, 3), 'ket_thuc': END, 'mood': 'to-mo'},
]
out = {
    '_ghi_chu': [
        'Tập 2 Coober Pedy, phân cảnh hoạt hình phối 3 phong cách (dao-dien-hoat-hinh, 22/11/2026). Mốc tuyệt đối (giây), sinh từ audio/subtitles.json; giọng nối liền 550,9 s, thêm 43,5 s khoảng nghỉ cho gag, phản ứng, chuyển chương.',
        'Vòng 2 (23/11/2026): sửa theo duyệt cổng 5a vòng 1 và lời mới cảnh 18 (41,232 s). KHOÁ LIÊN TỤC: mũ rộng vành màu giấy kraft #C9A46A dải đỏ #C9463A ở mọi đoạn hồi ức (mất ở d11, leo lại d12, bị hút d20, nhặt lại d21, cầm tay từ nhịp 2 d23, để trong xe d36–d37); ba lô xanh ô liu có cuộn thảm đỏ, từ d26 thêm cuộn cỏ xanh; khung hiện tại Wob không mũ.',
        'Chương Whose Land This Is (d36–d37): nghiêm, không gag; Breakaways chỉ phong cảnh, không người, không biểu tượng, hoa văn thổ dân. d35 sự cố 2024: không vẽ người ngã.',
        'Bản đồ chỉ vẽ bằng code (map-coober-pedy, map-adelaide-route, map-coober-pedy-water); vị trí giếng nước ghi approx.',
        'LOGO: không đặt chữ ở vùng x > 1500, y < 150.',
        'Nhạc: sổ music/GIAY-PHEP.md có 6 bài (chọn theo tên và mô tả, chưa ai nghe); im ở chỗ cắt về hiện tại d38.',
    ],
    'fps': 30, 'rong': 1920, 'cao': 1080, 'thoi_luong': END,
    'loi': [{'scene': s['id'], 'bat_dau': START[s['id']]} for s in sub],
    'nhac': nhac, 'am_luong_nhac': 0.2,
    'doan': D,
}
json.dump(out, open(P + '/hoat-hinh/phan-canh.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
# kiểm
tot = {}
for i, d in enumerate(D):
    assert d['ket_thuc'] > d['bat_dau'], d['id']
    if i: assert d['bat_dau'] == D[i-1]['ket_thuc'], d['id']
    for n in d['nhip']: assert d['bat_dau'] - 0.11 <= n['tai'] < d['ket_thuc'], (d['id'], n['tai'])
    tot[d['phong_cach']] = tot.get(d['phong_cach'], 0) + d['ket_thuc'] - d['bat_dau']
assert D[0]['bat_dau'] == 0 and D[-1]['ket_thuc'] == END
cards = re.findall(r'^\[([a-z-]+)\]', '\n'.join(n['hanh_dong'] for d in D for n in d['nhip']), re.M)
from collections import Counter
c = Counter(cards)
print('doan', len(D), 'END', END, {k: (round(v, 1), round(100 * v / END, 1)) for k, v in tot.items()})
print('the', len(c), len(cards), c.most_common(4))
for k in tot: print(k, [d['id'] for d in D if d['phong_cach'] == k])
print('min/max', min((d['ket_thuc']-d['bat_dau'], d['id']) for d in D), max((d['ket_thuc']-d['bat_dau'], d['id']) for d in D))
