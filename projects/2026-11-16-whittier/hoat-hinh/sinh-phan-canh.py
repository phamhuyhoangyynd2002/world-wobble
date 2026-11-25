# Sinh hoat-hinh/phan-canh.json cho tập 3 Whittier (dao-dien-hoat-hinh, 23/11/2026).
# Chạy: python sinh-phan-canh.py projects/2026-11-16-whittier
import json, re, sys
P = sys.argv[1]
sub = json.load(open(P + '/audio/subtitles.json', encoding='utf8'))['scenes']
GAP = {1: 1.2, 2: 1.5, 3: 1.2, 4: 1.5, 5: 1.5, 6: 2.0, 7: 1.2, 8: 1.5, 9: 1.5, 10: 1.2,
       11: 3.0, 12: 3.0, 13: 1.2, 14: 1.5}
START = {}; t = 0.4
for s in sub:
    START[s['id']] = round(t, 3); t += s['duration'] + GAP.get(s['id'], 0)
END = round(START[15] + sub[-1]['duration'] + 1.3, 3)
norm = lambda w: re.sub(r"[^a-z0-9'-]", '', w.lower())

def T(sc, phrase, end=False):
    ws = sub[sc - 1]['words']; toks = [norm(x) for x in phrase.split()]
    for i in range(len(ws)):
        if all(i + j < len(ws) and norm(ws[i + j]['text']) == toks[j] for j in range(len(toks))):
            return round(START[sc] + (ws[i + len(toks) - 1]['end'] if end else ws[i]['start']), 3)
    raise SystemExit(f'khong thay "{phrase}" o canh {sc}')
def E(sc): return round(START[sc] + sub[sc - 1]['duration'], 3)
def G(sc, k=0.5): return round(E(sc) + GAP[sc] * k, 3)
def B(sc, phrase): return round(T(sc, phrase) - 0.15, 3)   # biên đoạn: ngay trước từ

def N(tai, loi, hd, gag='', dc=(), sfx=()):
    return {'tai': tai, 'loi': loi, 'hanh_dong': hd, 'gag': gag, 'dao_cu': list(dc), 'sfx': list(sfx)}

BALO = 'ba lô xanh ô liu có cuộn thảm đỏ buộc trên nắp'
DONG = 'Mũ len màu kem có quả bông đỏ #C9463A, khăn quàng kem, giày đỏ, ' + BALO   # chuyến mùa đông
MUA_MUA = 'Áo mưa vàng #E2B33C có mũ trùm, ' + BALO                         # từ cảnh 10
HE = 'Mũ lưỡi trai xanh băng, không áo mưa, ' + BALO                         # chuyến tháng 7
VE_LIB = ('VẼ BẰNG THƯ VIỆN, KHÔNG dùng ảnh {id}: ảnh AI hiện có sai chi tiết ({sai}). ')
D = []
def seg(id, pc, a, b, lop, bc, tp, vao, ra, nhip, chu, ly):
    D.append(dict(id=id, phong_cach=pc, bat_dau=a, ket_thuc=b, lop=lop, boi_canh=bc, trang_phuc=tp,
                  vao=vao, ra=ra, nhip=nhip, chu_tren_do_vat=chu, ly_do_phong_cach=ly))

CONG = VE_LIB.format(id='ai-tunnel-portal', sai='phải là cổng bê tông MỘT làn, ray chìm giữa mặt đường, thanh chắn, đèn tín hiệu') + \
       'Cổng hầm bê tông khoét vào vách núi đá dốc, một làn, đường ray chìm giữa làn, đèn tín hiệu 3 bóng, thanh chắn sọc đỏ trắng'
THAP = VE_LIB.format(id='ai-begich-towers', sai='phải là MỘT khối 14 tầng màu kem, ba khối nối liền, cửa sổ vuông nhỏ đều') + \
       'Begich Towers: một khối bê tông kem nhạt 14 tầng, ba khối nối liền, hàng cửa sổ vuông nhỏ, dưới chân núi dốc có thác'
BUCK = VE_LIB.format(id='ai-buckner-ruin', sai='phải là toà bê tông SÁU tầng dài, cửa sổ mất kính, có hàng rào') + \
       'Buckner Building: toà bê tông dài 6 tầng, ô cửa sổ trống không kính, vệt nước, hàng rào lưới phía trước'
SONG = VE_LIB.format(id='ai-summer-sound', sai='phải là sông băng xanh trắng đổ ra biển ở xa, vịnh hẹp núi xanh') + \
       'Vịnh hẹp mùa hè, núi xanh dựng đứng, sông băng trắng xanh đổ ra biển ở xa'

# ================= MỞ: cổng hầm ban đêm (vào thẳng hiện trường, không mở ở bàn) =================
b1 = B(2, 'On the other side')
seg('d01', 'cat-giay', 0.0, b1, 'hoi-uc',
    'Đêm tuyết rơi. ' + CONG + '; bên cạnh là xe mui trần thuê màu đỏ gạch, mui đang mở',
    DONG + '; tay cầm tờ lịch giờ hầm gấp tư (kỷ vật của tập, theo suốt video). Chưa có áo mưa',
    'dau-video', 'giay', [
    N(START[1], 'I reached the only road into town one minute after it closed.', '[day-vao-cham] Khung 0 đã có Wob đứng trước cổng hầm, giơ tờ lịch gấp tư (bìa in hình nhỏ một toà nhà, không chữ), cạnh xe mui trần mở mui; tuyết rơi lớp tiền cảnh', '', ['to-lich-gio-ham', 'xe-mui-tran'], []),
    N(T(1, 'The road was'), 'The road was a tunnel. The tunnel had gone to bed.', 'Cận cổng hầm: ba bóng đèn tín hiệu tắt lần lượt như tắt đèn ngủ; đúng "bed" thanh chắn hạ hẳn xuống ngay trước mũi Wob', 'Thanh chắn hạ sát mũi Wob, Wob chớp mắt', ['thanh-chan'], ['bonk']),
    N(T(1, 'I was holding'), 'I was holding the timetable. I had not read it.', '[giu-tinh-bo] Wob mở tờ lịch, chữ 23:00 khoanh đỏ to; Wob nhìn thẳng người xem, giữ 1 s; tuyết đọng thành chóp nhọn trên mũ len trong lúc giữ', 'Chóp tuyết mọc trên đầu', ['to-lich-gio-ham'], ['im-lang']),
    N(START[2], 'So I slept in the car, with the roof down, because I had not figured out the roof yet.', 'Wob ngủ ngồi trong xe mở mui, đắp tờ lịch như chăn; tuyết chất dần trên ghế phụ thành một ụ có dáng người ngồi cạnh Wob như hành khách', 'Ụ tuyết thành "hành khách"', ['to-lich-gio-ham', 'xe-mui-tran'], ['brr']),
    ], ['23:00'], 'Mở thẳng ở hiện trường (đảo khuôn so với tập 1–2 mở ở bàn); cắt giấy hợp đêm tuyết nhiều lớp parallax. 23:00 theo C06')

b2 = B(2, 'Most of the people')
b3 = B(2, 'I came here')
seg('d02', 'diorama', b1, b3, 'hoi-uc',
    'Sổ du lịch pop-up mở trên nắp capo phủ tuyết: trang bản đồ code map-whittier (Alaska, ghim Whittier nửa trái khung, vịnh hẹp dài xám); núi giấy bật dựng',
    DONG + '; hình Wob giấy nhỏ trên trang chỉ tay vào ghim',
    'giay', 'cat', [
    N(b1 + 0.1, 'On the other side of that mountain is Whittier, Alaska, a small port on a long grey inlet.', '[trang-so-ban-do] Trang sổ bật mở, núi giấy dựng lên che giữa xe và thị trấn; camera bay qua đỉnh núi giấy, ghim Whittier bật ra đúng "Whittier"; vịnh dài kéo ra đúng "inlet"', 'Đỉnh núi giấy có một nắp chụp tuyết rơi xuống ngay GIỮA khung, úp lên đầu hình Wob giấy; giữ 0,6 s', ['so-popup'], ['pop']),
    N(T(2, 'Most of the people'), 'Most of the people who live there share one front door.', 'Cạnh ghim, một toà pop-up kem 14 tầng (ba khối nối liền, cửa sổ vuông nhỏ) bật dựng khỏi trang; chân toà có cửa xoay quay đều, người que nhỏ (dạng chung) đi vào bình thường', '', ['so-popup'], ['pop']),
    N(T(2, 'One building,'), 'One building, fourteen floors.', 'Hình Wob giấy ngửa cổ đếm tầng bằng ngón tay; đếm tới 14 thì cổ Wob giấy dài ra theo toà, giữ 0,8 s', 'Cổ Wob dài theo 14 tầng', [], ['boing']),
    ], ['WHITTIER', 'ALASKA', '14'], 'Sổ pop-up mở bản đồ rồi bật toà 14 tầng: việc của diorama. Vòng 2: gộp đoạn vẽ tay d03 cũ vào đây để bớt đổi phong cách (T6); gag cửa xoay chuyển sang Wob, không đùa về cư dân. Bản đồ vẽ bằng code, không AI')

b4 = B(3, 'In the morning')
seg('d04', 'cat-giay', b3, b4, 'hoi-uc',
    'Như d01: trong xe mở mui trước cổng hầm, rạng sáng xanh, tuyết ngừng',
    DONG + '; cầm vali nhỏ rồi đặt lên ghế phụ; tờ lịch nhét túi áo',
    'cat', 'giay', [
    N(b3 + 0.1, 'I came here to move in.', 'Wob trong xe giơ vali nhỏ lên cao, mặt hào hứng (đặt Wob vào thế muốn chuyển tới, trước 30 s)', '', ['vali-nho'], ['boing']),
    N(T(2, 'By morning'), 'By morning I had questions. Why build a town behind a mountain that closes at night? And why would almost everyone end up in the same building?', '[lay-da-nhay] Hai dấu hỏi giấy cắt mọc lên trên đầu Wob lần lượt đúng "Why build" và "And why"; dấu thứ hai to hơn đè dấu thứ nhất', 'Dấu hỏi thứ hai đè bẹp dấu thứ nhất', [], ['pop']),
    N(T(2, 'Before this trip'), 'Before this trip was over, I had both answers, and I changed my mind about living here more than once.', 'Wob gật đầu tự tin; đúng "more than once" một mảng tuyết từ vách núi trượt xuống đúng đầu Wob; Wob vẫn gật, không phủi, giữ 0,8 s', 'Tuyết rơi trúng đầu, Wob vẫn gật', [], ['drop']),
    ], [], 'Quay lại xe ở cắt giấy để đóng lời hứa 30 s; kết bằng giấy sang chương 1')

# ================= CHƯƠNG 1: A Road That Takes Turns =================
b5 = B(3, 'Picture a')
seg('d05', 'cat-giay', b4, b5, 'hoi-uc',
    'Bãi chờ nhiều làn trước cổng hầm buổi sáng (có thể dùng ảnh ai-bear-valley-queue làm phông xa nếu khớp, không thì vẽ), hàng xe giấy; đèn tín hiệu đỏ',
    DONG + '; xe đã có tuyết dọn dở; tờ lịch mở to bằng vô lăng',
    'giay', 'chen', [
    N(START[3], 'In the morning I joined the queue at the staging area and finally read the timetable.', '[di-bo-parallax] Đèn tín hiệu đỏ làm tiền cảnh 1/3 khung trái; xe Wob lăn vào làn đầu; Wob mở tờ lịch, tờ lịch mở ra to bằng cả vô lăng che kín kính chắn gió', 'Tờ lịch che kín tầm nhìn', ['to-lich-gio-ham'], []),
    N(T(3, 'In winter,'), 'In winter, the tunnel opens at seven in the morning, and the gate locks at eleven at night.', 'Cận tờ lịch: 7:00 sáng lên đúng "seven", 23:00 đúng "eleven"; Wob khoanh 23:00, khoanh thêm hai vòng nữa', '', ['to-lich-gio-ham', 'but-chi'], ['ting']),
    N(T(3, 'Cars and trains'), 'Cars and trains take turns, in fifteen-minute windows, one direction at a time.', 'Trên tờ lịch hiện hình chiếc xe và đoàn tàu nhỏ, nhãn 15 min; Wob xoay tờ lịch như xoay vô lăng, xe và tàu trên lịch xoay theo, tàu húc nhẹ xe, Wob giật tay lại; giữ 0,6 s', 'Tờ lịch thành vô lăng, tàu húc xe', ['to-lich-gio-ham'], []),
    ], ['7:00', '23:00', '15 min'], 'Giải thích quy tắc qua kỷ vật tờ lịch trong cảnh thật (cắt giấy); chữ số theo C06, C07')

b6 = B(3, 'A train borrowed')
seg('d06', 've-tay', b5, b6, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: cây cầu một làn có đèn đổi chiều, xe hai đầu chờ nhau',
    'Wob (mũ len) vẽ tay nhỏ ở đầu cầu, ngồi trong xe vẽ tay',
    'chen', 'cat', [
    N(b5, 'Picture a one-lane bridge with a traffic light.', '[bong-bong-tuong-tuong] Hình to: cầu một làn, đèn đổi chiều, hai hàng xe chờ', '', [], ['whoosh']),
    N(T(3, 'Now make'), 'Now make the bridge about two and a half miles long, roughly four kilometres, and let a train borrow it.', '[so-sanh-doi-thuong] Hai bàn tay vẽ tay kéo cây cầu dài ra như kẹo cao su, cầu chạy tuột vào trong núi; nhãn ~2.5 mi rồi ~4 km; đúng "train" một đoàn tàu vẽ tay chui vào cầu', 'Cây cầu bị kéo như kẹo cao su', [], ['rise']),
    ], ['~2.5 mi', '~4 km'], 'So sánh đời thường bằng bong bóng tưởng tượng: việc của vẽ tay. C08 mức dè dặt: giữ dấu ~')

b7 = B(4, 'My rental')
seg('d07', 'cat-giay', b6, b7, 'hoi-uc',
    'Như d05 bãi chờ; đoàn tàu hàng giấy chạy ngang ngay trước mũi xe Wob; làn ngược chiều có hàng xe giấy',
    DONG + '; tờ lịch trên vô lăng', 'cat', 'chen', [
    N(b6 + 0.1, 'A train borrowed it. My window slid past while I counted carriages.', '[leo-thang-ba-lan] Tàu chạy ngang; Wob đếm toa bằng ngón tay, hết ngón tay chuyển sang ngón chân (giày đỏ giơ lên), rồi chỉ vào bánh xe', 'Đếm toa hết tay sang chân sang bánh xe', ['to-lich-gio-ham'], []),
    N(T(3, 'Then the next'), 'Then the next window opened, for traffic coming the other way. I waved at them. They did not wave back. They were busy reading their timetables.', 'Hàng xe ngược chiều chạy qua; Wob vẫy tay nhiệt tình; mọi tài xế giấy (dạng chung, không mặt) đều đang giơ tờ lịch che mặt đọc', 'Ai cũng đọc tờ lịch, chỉ Wob thì không', [], []),
    N(T(3, 'The timetable says'), 'The timetable says unscheduled trains can hold things up by fifteen to thirty minutes.', 'Wob lật tờ lịch, ngón tay dò dòng chữ nhỏ; nhãn 15–30 min', '', ['to-lich-gio-ham'], []),
    N(T(3, 'It also had'), 'It also had a note about cars like mine.', '[giu-tinh-bo] Wob chậm rãi nhìn lên cái mui xe đang mở của mình; giữ 0,8 s', '', [], ['im-lang']),
    ], ['15–30 min'], 'Quay về hiện trường cắt giấy; gag đếm toa và tài xế đọc lịch. C09')

b8 = B(4, 'Finally the light')
seg('d08', 've-tay', b7, b8, 'hoi-uc',
    'Vẽ tay nét sôi: xe mui trần cận, rồi cổng hầm vẽ tay có nhiệt kế giấy và đồng hồ',
    DONG + '; sau gag mui xe, mũ len lệch sang một bên đến hết chuyến đông',
    'chen', 'giay', [
    N(b7, 'My rental was a convertible. Convertibles have to close their roofs before going in, so I wrestled mine up while the whole queue watched.', '[va-cham-vat-ly] Wob đứng trên ghế kéo mui vải; mui bật ngược trùm kín Wob, chỉ còn đôi giày đỏ thò ra đạp đạp; người que ở xe sau vỗ tay chậm', 'Mui xe nuốt Wob', ['xe-mui-tran'], ['whoosh', 'bonk']),
    N(T(4, 'Then there is'), 'Then there is the cold rule. When it is thirty-two Fahrenheit or below, that\'s zero Celsius, traffic only goes in during the last five minutes of each window.', '[nhiet-ke-tut] Nhiệt kế giấy trên cổng tụt về 32°F · 0°C; đồng hồ trên cổng quay nhanh, cổng chỉ hé ở 5 phút cuối; Wob chưa kịp nổ máy thì cổng khép bớt, rồi hé lại', 'Cổng hé, khép, hé', [], ['may-no', 'brr']),
    ], ['32°F · 0°C', '5 min'], 'Hai gag vật lý nhanh, biểu cảm to: vẽ tay. C10, C11')

b9 = B(5, 'So why put')
seg('d09', 'diorama', b8, b9, 'hoi-uc',
    'Trong hầm: diorama camera đi thật dọc đường hầm một làn, đường ray chìm giữa mặt đường, đèn hầm lướt qua theo nhịp (có thể tham khảo ai-tunnel-inside, nhưng dựng bằng tấm giấy 3D); ra khỏi hầm: vịnh hẹp xám, mây thấp, thác trên vách, núi dựng đứng từ biển (tấm giấy nhiều lớp sâu)',
    DONG + ', mũ len lệch; mui xe đã đóng', 'giay', 'chen', [
    N(b8 + 0.1, 'Finally the light turned green.', 'Đèn tín hiệu chuyển xanh, camera đặt sau xe Wob lao vào miệng hầm', '', [], ['may-no']),
    N(T(4, 'Inside, the road'), 'Inside, the road and the railway share the same strip of concrete, with the rails sunk right into the lane.', '[lia-theo-vat] Camera hạ thấp sát mặt đường: hai thanh ray chìm trong bê tông chạy dưới bánh xe; đèn hầm trôi qua đều', '', [], []),
    N(T(4, 'It is the longest'), 'It is the longest combined rail and highway tunnel in North America, and cars have only been allowed through since two thousand.', 'Một biển bê tông nhỏ gắn vách hầm lướt qua ghi 2000; đường hầm dài vô tận phía trước', '', [], []),
    N(T(4, 'I kept both'), 'I kept both hands on the wheel and did not breathe until daylight.', 'Cận Wob qua kính: hai tay bám vô lăng, má phồng to dần vì nín thở', '', [], []),
    N(T(4, 'Rock on both'), 'Rock on both sides. Rails under my tyres. Somewhere behind me, my courage.', 'Camera quay ngược ra sau xe: trên đường ray xa xa, một quả bóng nhỏ hình mặt cười (lòng can đảm) bị bỏ lại, ngồi phịch xuống', 'Lòng can đảm bị bỏ lại trong hầm', [], []),
    N(START[5], 'Out the far side, the clouds sat so low I could have worn one.', '[lui-ra-toan-canh] Ra khỏi hầm ánh sáng xám; Wob thở ra một hơi làm mờ cả kính chắn gió; camera lùi ra toàn cảnh vịnh; một cụm mây đậu xuống đầu Wob thành cái mũ, Wob không biết', 'Mây làm mũ', [], ['hoi-nuoc']),
    N(T(5, 'Grey water.'), 'Grey water. Waterfalls. Mountains going straight up out of the sea.', 'Camera lướt ba lớp giấy: mặt nước xám, thác, vách núi đứng', '', [], []),
    ], ['2000'], 'Camera đi thật trong không gian (đường hầm, toàn cảnh đến nơi): việc riêng của diorama. C12–C14')

b10 = B(5, 'For thousands')
seg('d10', 've-tay', b9, b10, 'hoi-uc', 'Vẽ tay: vũng nước bên đường, Wob ngồi xổm với chảo đãi',
    DONG + ', cụm mây vẫn trên đầu; cầm chảo đãi vàng', 'chen', 'giay', [
    N(b9, 'So why put a town here? My guess was gold.', '[doan-sai-roi-lat] Wob đãi vàng hăng say trong vũng nước bên đường; chảo đãi lên một cái nắp chai, Wob giơ lên soi như kim cương, mắt lấp lánh', 'Nắp chai thành "kim cương"', ['chao-dai'], ['ka-ching']),
    N(T(5, 'I was not'), 'I was not completely wrong about people passing through.', 'Wob nhún vai, nhét nắp chai vào túi', '', ['chao-dai'], []),
    ], [], 'Đoán sai bằng gag vẽ tay nhanh trước khi vào lịch sử')

b11 = B(6, 'Turns out')
seg('d11', 'cat-giay', b10, b11, 'hoi-uc',
    'Trang sổ cắt giấy tông ấm: đường đèo Portage Pass nét đứt giữa hai sườn núi (có thể dùng ai-portage-pass làm phông xa nếu khớp); những người que kéo hàng nhìn từ xa, không vẽ mặt, không trang phục, hoa văn cụ thể; rồi người que kéo xe trượt',
    DONG + ', cụm mây trên đầu; Wob đứng NGOÀI trang sổ, chỉ quan sát', 'giay', 'giay', [
    N(b10 + 0.1, "For thousands of years the Chugach, an Alutiiq people, crossed Portage Pass behind this inlet to trade with Dena'ina people on Cook Inlet.", '[trang-so-hanh-trinh] Nét đứt vẽ dần qua đèo; những người que nhỏ ở xa đi theo nét đứt hai chiều, tôn trọng, không gag; Wob đứng ngoài mép trang, tay sau lưng', '', ['so-popup'], []),
    N(T(5, 'In the late'), 'In the late eighteen hundreds, gold seekers hauled sleds over the same pass.', 'Trên cùng nét đứt, người que kéo xe trượt chất đồ', '', [], []),
    N(T(5, 'But hauling'), 'But hauling sleds is not the same as building a tower.', 'Wob lấy ngón tay dựng một toà tháp giấy nhỏ ở cuối nét đứt; nó đổ nghiêng', 'Tháp giấy của Wob đổ', [], ['drop']),
    N(T(5, 'Gold did not'), 'Gold did not build this town. Weather did.', '[giu-tinh-bo] Wob nhìn lên cụm mây vẫn đậu trên đầu mình; cụm mây nháy mắt; giữ 1 s', 'Cụm mây là thủ phạm', [], ['im-lang']),
    ], ['Portage Pass', 'Cook Inlet'], 'Lịch sử con người (bản địa, đào vàng): cắt giấy tông ấm, tôn trọng; gag chỉ ở Wob và cụm mây, không đùa về người. C15, C16')

# ================= CHƯƠNG 2: Why Build Behind a Mountain? =================
b12 = B(6, 'To connect')
seg('d12', 've-tay', b11, b12, 'hoi-uc',
    'Sơ đồ vẽ tay trên trang sổ: vịnh, đường biển tới Seward và Whittier; rồi tấm chăn mây kéo phủ bến cảng',
    'Wob (mũ len lệch) đeo kính râm, cầm tấm bìa hình mặt trời; cụm mây trên đầu đã bay lên làm "chăn"', 'giay', 'chen', [
    N(b11 + 0.1, 'Turns out the fog was a selling point.', 'Wob đeo kính râm, giơ tấm bìa mặt trời chờ nắng; một đám mây vẽ tay thò tay giật tấm bìa đi', 'Mây giật mặt trời', ['kinh-ram', 'bia-mat-troi'], ['whoosh']),
    N(T(6, 'During the Second'), 'During the Second World War, the US Army wanted a supply port in Alaska, and this inlet had a lot going for it.', '[so-do-ve-tay] Nét mực vẽ vịnh và một cái neo nhỏ ở Whittier', '', [], []),
    N(T(6, 'The water is'), 'The water is deep and does not freeze, so ships could come in all year.', 'Hai mũi tên vẽ tay hiện lần lượt: deep, no ice; tàu vẽ tay vào vịnh, ra, vào; Wob nhỏ vẫy tàu từ bờ', '', [], ['pop']),
    N(T(6, 'According to the'), "According to the state's tunnel history, going on to Seward added about fifty-two miles of sailing.", 'Hai đường biển tới Seward và Whittier; Wob nhỏ ngồi trên mũi một con tàu vẽ tay, kéo thước dây đo đoạn chênh, thước bật cuộn lại kẹp mũi Wob; nhãn ~52 mi', 'Thước dây kẹp mũi', ['thuoc-day'], ['ting']),
    N(T(6, 'And the low'), 'And the low cloud and fog helped hide the port from Japanese planes. From the air, the fog was a blanket pulled over the harbour.', 'Tấm chăn mây kéo phủ bến cảng; một máy bay giấy vẽ đơn giản (không cờ, không ký hiệu) lượn vòng, ngập ngừng, rồi quay đi', 'Máy bay lượn, không thấy gì, quay đi', [], []),
    ], ['deep', 'no ice', '~52 mi', 'Seward', 'Whittier'], 'Sơ đồ giải thích nhanh nhiều lý do: vẽ tay. Bản đồ chỉ sơ đồ vẽ tay không đúng tỉ lệ, không biên giới. C17–C20. Không đùa về quân đội hay chiến tranh')

b13 = B(7, 'Back home')
seg('d13', 'cat-giay', b12, b13, 'hoi-uc',
    'Cắt giấy: mặt cắt hai ngọn núi, đường hầm đường sắt đang đào; người que đội mũ thợ (nhân vật chung, không vẽ mặt người thật); rồi bến cảng đông người que nhỏ thập niên 40',
    DONG + ', mũ len lệch; đeo kính râm đến nhịp cuối thì cất vào ba lô', 'chen', 'giay', [
    N(b12, 'To connect the port to the rest of Alaska, the Army built a railway through two mountains, finished on April the twenty-third, nineteen forty-three.', '[lia-theo-vat] Camera lia theo đường ray xuyên hai núi giấy; Wob cầm xẻng giúp đào nhưng đào ngược hướng, chui ra đúng chỗ vừa vào; biển gỗ ghi April 23, 1943', 'Wob đào vòng về chỗ cũ', ['xeng-nho', 'kinh-ram'], []),
    N(T(6, 'The longer tunnel'), 'The longer tunnel is named after Anton Anderson, the Army engineer in charge.', 'Biển tên trên cổng hầm lớn hơn: ANTON ANDERSON (chữ trên biển, không vẽ chân dung)', '', [], []),
    N(T(6, 'By the mid'), 'By the mid nineteen forties, more than a thousand soldiers and civilians lived here.', 'Bến cảng đầy dần người que nhỏ, nhãn 1,000+', '', [], []),
    N(T(6, 'I put my'), 'I put my sunglasses away. I also forgave the tunnel. It was never built for my car.', 'Wob gấp kính râm cất vào ba lô; vỗ nhẹ vách hầm như vỗ vai bạn; vách hầm rơi một hạt đá nhỏ', '', [], []),
    ], ['April 23, 1943', 'ANTON ANDERSON', '1,000+'], 'Lịch sử xây dựng: cắt giấy. C21–C23')

# ================= HIỆN TẠI giữa tập: bàn kỷ vật =================
b14 = B(8, 'So I spent')
seg('d14', 'diorama', b13, b14, 'hien-tai',
    'Bàn kỷ vật dưới đèn bàn (ở nhà, sau chuyến đi): tờ lịch giờ hầm nhàu trải ra, lật mặt sau; bút chì; một phong bì',
    'Wob không mũ, không khăn (khung hiện tại); tay cầm tờ lịch rồi phong bì rồi bút chì', 'giay', 'giay', [
    N(START[7], 'Back home, I unfold the timetable on my desk, because this is the point where my trip went indoors.', '[dat-ky-vat-xuong] Wob trải tờ lịch nhàu lên bàn, vuốt phẳng, lật mặt sau trắng; camera đẩy chậm 1,0→1,08 (lần đầu thấy bàn kỷ vật ở phút thứ 4)', '', ['to-lich-gio-ham'], []),
    N(T(7, 'After the war,'), 'After the war, the Army put up two huge buildings in Whittier. One of them is why my mail had a floor number.', 'Wob giơ phong bì; phong bì dài ra như cuộn giấy, dải địa chỉ chảy xuống mép bàn (không ghi số cụ thể ngoài 14)', 'Phong bì dài như cuộn giấy', ['phong-bi'], ['boing']),
    N(T(7, 'The Hodge Building,'), 'The Hodge Building, now called Begich Towers, is fourteen floors of pale concrete, finished in nineteen fifty-seven after going up in three sections.', 'Wob vẽ bằng bút chì lên mặt sau tờ lịch: một khối 14 tầng ba phần nối liền, ghi 1957 ở chân; nét bút hiện dần, tầng 14 vẽ cuối', '', ['but-chi', 'to-lich-gio-ham'], []),
    N(T(7, 'According to local'), 'According to local news, nearly everyone in town lives inside it.', 'Wob vẽ người que nhỏ vào từng ô cửa sổ, vẽ mãi; bút chì ngắn dần còn bằng đầu ngón tay', 'Bút chì mòn còn mẩu', ['but-chi'], []),
    N(T(7, 'The twenty twenty'), 'The twenty twenty census counted about two hundred and seventy people, and estimates vary a little since then.', 'Wob tẩy bớt vài người que, ngập ngừng, ghi ~270 (2020)', '', ['but-chi'], []),
    N(round(E(7) + 0.3, 3), '', '[lat-trang-so] Wob đẩy tờ lịch, camera lao vào hình toà nhà bút chì trên giấy; nối giấy phẳng #EFE3C8', '', [], []),
    ], ['BEGICH TOWERS', 'HODGE', '14', '1957', '~270 (2020)'], 'Khung hiện tại (luật: chỉ diorama), đặt GIỮA tập theo bài học tập 2 (đảo khuôn). C24–C27; C27 dè dặt giữ ~')

# ================= CHƯƠNG 3: The Building Is the Town =================
b15 = B(8, 'There is a church')
seg('d15', 'diorama', b14, b15, 'hoi-uc',
    'Bên trong Begich Towers: diorama hành lang tường gạch block sơn nhạt, bảng tin, cửa bưu điện, cửa đồn cảnh sát, phòng khám, cửa hàng tiện lợi, phòng giặt, thang máy (có thể tham khảo ai-begich-hallway, dựng bằng tấm giấy); camera đi dọc hành lang như một ngày',
    'Wob đồ ngủ kẻ sọc, dép lê, KHÔNG mũ, vẫn đeo ' + BALO + '; ôm ly; từ nhịp giặt đồ: giỏ đồ giặt', 'giay', 'chen', [
    N(START[8], 'So I spent one winter day without going outside. Morning: I went down for my mail in my slippers.', '[dong-ho-troi] Đồng hồ treo tường hành lang quay; Wob đi dép lê lẹp xẹp, một chiếc tuột lại sau, quay lại xỏ, chiếc kia tuột', 'Dép lê tuột luân phiên', ['ly', 'dep-le'], []),
    N(T(8, 'The post office'), 'The post office is inside the building, close to the entrance. So is the police station.', 'Camera đi qua cửa POST OFFICE cạnh lối vào, rồi cửa POLICE; Wob rón rén nép tường vì đang mặc đồ ngủ', '', [], []),
    N(T(8, 'Late morning:'), 'Late morning: the clinic, then the convenience store for snacks.', 'Wob đi ngang cửa CLINIC, ra khỏi STORE ôm túi bánh', '', ['tui-banh'], []),
    N(T(8, 'Afternoon:'), 'Afternoon: laundry, still indoors, with my basket riding the elevator.', 'Thang máy mở: giỏ đồ giặt đứng một mình bên trong, Wob ở ngoài; cửa đóng, giỏ đi lên một mình; Wob chạy cầu thang đuổi theo', 'Giỏ đồ đi thang máy một mình', ['gio-do-giat'], ['ting']),
    ], ['POST OFFICE', 'POLICE', 'CLINIC', 'STORE'], 'Camera đi bộ qua không gian trong nhà như một ngày (mot-ngay-o-day): diorama. C28–C30')

b16 = B(8, 'And the school')
seg('d16', 've-tay', b15, b16, 'hoi-uc', 'Vẽ tay: mặt cắt sảnh chung cư nhồi đủ thứ chồng lên nhau',
    'Wob đồ ngủ, dép lê, ba lô, ôm giỏ đồ giặt', 'chen', 'cat', [
    N(b15, 'There is a church in here too, plus city offices and a playground.', '[chen-ve-tay] Hình to vẽ tay: cửa nhà thờ, cửa văn phòng thành phố, cầu trượt sân chơi bật ra lần lượt trong cùng một hành lang; Wob ôm giỏ đồ đi ngang', '', ['gio-do-giat'], ['whoosh']),
    N(T(8, 'Think of an'), 'Think of an apartment block where the whole town has moved into the lobby.', 'Sảnh chung cư vẽ tay: bưu điện, cửa hàng, chuông nhà thờ, cầu trượt chồng lên nhau tới trần; Wob chen vào giữa, giỏ đồ bị kẹt', 'Cả thị trấn nhét trong sảnh', ['gio-do-giat'], ['whoosh']),
    ], ['CHURCH', 'CITY OFFICES'], 'So sánh đời thường: chèn vẽ tay ngắn; vòng 2 kéo sớm từ nhịp nhà thờ để diorama ≤ 20%')

b17 = B(9, 'From the lobby')
seg('d17', 'cat-giay', b16, b17, 'hoi-uc',
    'Mặt cắt giấy: toà nhà bên trái, trường học bên kia đường, đường hầm ngầm sáng đèn nối hai bên; rồi tủ để đồ có đôi ủng cao su',
    'Wob đồ ngủ, dép lê, ba lô; đặt giỏ đồ xuống', 'cat', 'giay', [
    N(b16 + 0.1, 'And the school? It sits across the road, and children get there through a tunnel underneath.', '[lui-ra-toan-canh] Camera lùi thấy mặt cắt: trên mặt đất tuyết bay ngang, bên dưới đường hầm sáng ấm có những người que học sinh đeo cặp đi qua (dạng chung, không mặt); Wob nhìn từ đầu hầm, vẫy', '', [], []),
    N(T(8, 'My boots'), 'My boots never left the closet. They seemed relieved.', '[giu-tinh-bo] Cửa tủ hé: đôi ủng cao su ngả lưng vào nhau, thở phào (mắt nhắm, miệng thở ra); giữ 0,8 s', 'Ủng nhẹ nhõm', ['ung-cao-su'], []),
    ], ['SCHOOL'], 'Mặt cắt nhiều lớp: cắt giấy. C31')

b18 = B(9, 'Inside were')
seg('d18', 'cat-giay', b17, b18, 'hoi-uc',
    'Sảnh tầng trệt, cửa kính; ngoài kính là ' + BUCK,
    'Wob đồ ngủ, dép lê, ba lô (vẫn trong nhà)', 'giay', 'chen', [
    N(START[9], 'From the lobby window I could see the other building. Nobody lives in it.', '[tien-canh-khung] Khung cửa kính làm tiền cảnh; Wob tựa trán vào kính, hơi thở làm mờ một vòng tròn; ngoài kia toà bê tông 6 tầng cửa sổ trống', '', [], []),
    N(T(9, 'The Buckner Building'), 'The Buckner Building was finished in the early nineteen fifties, according to old Army records, with six floors for about a thousand soldiers.', 'Wob lấy ngón tay vẽ lên vòng mờ trên kính: số 6 rồi ~1,000; vòng mờ tan trước khi Wob viết xong, Wob hà hơi thêm một vòng rồi viết tiếp, giữ 0,6 s; camera đẩy chậm vào toà Buckner', 'Vòng mờ tan giữa chừng', [], []),
    ], ['BUCKNER', '6', '~1,000'], 'Cảnh thật qua cửa kính, nhiều lớp: cắt giấy. C32. Toà Buckner vẽ bằng thư viện')

b19 = B(9, 'The Army began')
seg('d19', 've-tay', b18, b19, 'hoi-uc',
    'Bong bóng hồi tưởng vẽ tay tông sepia: rạp chiếu phim, sân bowling, phòng khám nhỏ thập niên 1950 sáng đèn',
    'Wob không xuất hiện trong bong bóng; viền bong bóng mọc ra từ đầu Wob ở mép trái', 'chen', 'cat', [
    N(b18, 'Inside were a movie theatre, a bowling alley and a small clinic.', '[bong-bong-tuong-tuong] Ba ô sepia bật lần lượt đúng "movie", "bowling", "clinic": màn chiếu, hàng ki bowling, chữ thập nhỏ', '', [], ['pop']),
    N(T(9, 'Before my tower,'), 'Before my tower, this was the town under one roof, and it did not stay full for long.', 'Cả ba ô gộp thành một mái nhà; đèn trong mái tắt dần từng ô', 'Ki bowling cuối cùng tự đổ khi đèn tắt', [], ['de-kem']),
    ], [], 'Hồi tưởng trong hồi tưởng: vẽ tay sepia tách lớp rõ. C32')

b20 = B(10, 'Then I made')
seg('d20', 'cat-giay', b19, b20, 'hoi-uc',
    'Ngoài trời: ' + BUCK + '; tuyết trên đất; bong bóng tưởng tượng giấy cắt cuối đoạn',
    'Wob ĐÃ THAY đồ: áo khoác dày màu kem, mũ len kem quả bông đỏ, ' + BALO + ', giày đỏ (không còn dép lê)', 'cat', 'giay', [
    N(b19 + 0.1, 'The Army began pulling out around nineteen sixty, and records differ on when the last soldiers left.', 'Hàng xe tải giấy rời đi xa dần; một tờ lịch sử giấy có hai ngày ghi chồng ~1960 và dấu ?', '', [], []),
    N(T(9, 'Today Buckner'), 'Today Buckner is a ruin. The windows are gone, there is asbestos inside, and the city fenced it off.', 'Camera lùi: ô cửa trống, biển trên hàng rào ghi ASBESTOS', '', [], []),
    N(T(9, 'So I looked'), 'So I looked at it from outside the fence, which is the only sensible way to see it.', 'Wob đứng ngoài rào, hai tay sau lưng; nhón chân nhìn qua, ba lô nặng kéo Wob ngả ngửa về sau, lảo đảo đứng lại; không bước qua rào', 'Ba lô kéo Wob ngả ngửa', [], ['bonk']),
    N(T(9, 'I imagined'), 'I imagined the bowling alley anyway.', 'Bong bóng giấy trên đầu: Wob ném bóng bowling; quả bóng lăn mãi, lăn khỏi bong bóng, rơi xuống tuyết, dừng cạnh chân Wob ngoài rào; Wob nhìn nó, giữ 0,8 s; rồi Wob nhặt bóng, quay lưng đi về phía Begich Towers (vào trong thay áo mưa)', 'Quả bóng lăn ra khỏi tưởng tượng', [], ['drop']),
    ], ['~1960 ?', 'ASBESTOS'], 'Ngoài hàng rào, cảnh thật: cắt giấy. C34 mức C giữ dấu ?; C35. Không khuyến khích vào khu cấm: Wob không bước qua rào')

# ================= CHƯƠNG 4: Twenty Feet of Weather =================
b21 = B(10, 'By March,')
seg('d21', 've-tay', b20, b21, 'hoi-uc', 'Vẽ tay: cận mặt Wob trước cửa toà nhà, rồi trời trút tuyết',
    MUA_MUA + ' (áo mưa mới mua, nhãn giá treo ở tay áo tới khi bị giật ở nhịp đầu; áo khoác kem đã thay trong nhà), mũ trùm đội lên; giày đỏ', 'giay', 'cat', [
    N(START[10], 'Then I made the mistake of stepping outside.', 'Wob bước ra bậc cửa toà nhà trong áo mưa vàng mới, ưỡn ngực; nhãn giá đung đưa ở tay áo vướng vào mũi, Wob giật phăng nhãn giá', 'Nhãn giá vướng mũi', [], []),
    N(T(10, 'One snowflake'), 'One snowflake landed on my nose.', '[take-cham] Cận: một bông tuyết đậu lên mũi Wob; Wob lác mắt nhìn nó', '', [], []),
    N(T(10, 'Then its family'), 'Then its family arrived. Then the neighbours.', '[leo-thang-ba-lan] Năm bông nữa, rồi cả trời trút xuống; camera lùi Wob → bậc cửa → cả mặt tiền ngập tuyết', 'Bông tuyết kéo cả họ hàng', [], ['whoosh']),
    ], [], 'Take chậm và leo thang ba lần: vẽ tay biểu cảm to')

b22 = B(10, 'Count the rain')
seg('d22', 'cat-giay', b21, b22, 'hoi-uc',
    'Cắt giấy: trước toà nhà ngập tuyết, cột đo tuyết sơn vạch; hai tờ bảng số giấy lơ lửng',
    MUA_MUA + ', mũ trùm', 'cat', 'chen', [
    N(b21 + 0.1, 'By March, the snow on the ground here averages about forty-seven inches, roughly one point two metres. I am shorter than that.', '[phong-quy-mo] Wob đứng cạnh cột đo, vạch 47 in · 1.2 m cao hơn đầu Wob; tuyết dâng lên; chỉ còn cuộn thảm đỏ trên ba lô nhô khỏi tuyết, lắc lư', 'Chỉ còn cuộn thảm đỏ lắc lư', [], ['rise']),
    N(T(10, 'Over a whole'), "Over a whole year, Whittier gets somewhere around twenty feet of snow, about six metres, and the official tables don't quite agree on the exact figure.", 'Wob chui lên khỏi tuyết; hai tờ bảng số lơ lửng ghi 241 in và 257 in, Wob nhìn qua lại; nhãn ~20 ft · ~6 m', '', [], ['pop']),
    ], ['47 in · 1.2 m', '~20 ft · ~6 m', '241 in', '257 in'], 'So quy mô với Wob trong cảnh thật: cắt giấy. C36, C37 (mức C, giữ ~ và hai con số)')

b23 = B(11, 'The wind joined')
seg('d23', 've-tay', b22, b23, 'hoi-uc', 'Vẽ tay: cột nước 5 m cạnh căn nhà hai tầng',
    'Wob trong áo mưa vàng, đeo thêm phao bơi tròn', 'chen', 'cat', [
    N(b22, 'Count the rain as well and you get roughly five metres of water a year, about sixteen feet. If none of it drained away, it would stand about as tall as a two-storey house.', '[so-sanh-doi-thuong] Cột nước vẽ tay dâng lên cạnh căn nhà hai tầng tới ngang nóc, nhãn ~5 m · ~16 ft; Wob đeo phao bơi vẫy tay từ đỉnh cột', 'Wob bơi trên nóc cột nước', ['phao-boi'], ['whoosh']),
    ], ['~5 m · ~16 ft'], 'So sánh đời thường bằng hình to: vẽ tay. C38, C39')

b24 = B(11, 'The problem is')
seg('d24', 'cat-giay', b23, b24, 'hoi-uc',
    'Cắt giấy: trước toà nhà, gió thổi tuyết ướt ngang, sóng bạc đầu trên vịnh; cửa toà nhà; nhiệt kế giấy trên tường',
    MUA_MUA + ', mũ trùm (phao bơi đã biến mất: chỉ là tưởng tượng ở d23); đầu đoạn tháo một chiếc găng', 'cat', 'chen', [
    N(b23 + 0.1, "The wind joined in. It averages ten to fifteen miles an hour. But the state's tunnel weather page says it often blows forty to sixty, with waves of four to six feet out in the inlet.", 'Ngọn cờ giấy trên cột căng thẳng ra; ngoài vịnh sóng giấy dâng; nhãn 10–15 mph rồi 40–60 mph', '', [], []),
    N(T(11, 'It rolled me'), 'It rolled me back to the front door, gently, like a bouncer.', '[va-cham-vat-ly] Gió đẩy Wob lăn tròn như quả bóng về cửa toà nhà; cửa mở, Wob lăn vào rồi lăn ra lại, đứng dậy', 'Gió như người gác cửa', [], ['bonk']),
    N(T(11, "Here's what"), "Here's what surprised me. It isn't that cold. According to the weather records, January highs hover right around freezing. My first trip was colder than this by a lot.", '[nhiet-ke-tut] Nhiệt kế giấy trên tường chỉ quanh ≈0°C · ≈32°F; Wob ngạc nhiên, tháo một chiếc găng', '', ['gang-tay'], []),
    ], ['10–15 mph', '40–60 mph', '≈0°C · ≈32°F'], 'Cảnh thật ngoài trời nhiều lớp gió: cắt giấy. C40, C41')

b25 = B(11, 'Back inside,')
seg('d25', 've-tay', b24, b25, 'hoi-uc', 'Vẽ tay: cận Wob ướt sũng',
    MUA_MUA + '; khoác thêm một áo mưa vàng nhỏ hơn lên vai', 'chen', 'cat', [
    N(b24, 'The problem is that everything is wet, all the time. My raincoat needed a raincoat.', '[chen-ve-tay] Mưa ngang; Wob khoác thêm một áo mưa nhỏ lên vai áo mưa của mình; áo thứ hai cũng ướt sũng, nhỏ nước tong tỏng; giữ 0,8 s', 'Áo mưa cho áo mưa', ['ao-mua-nho'], ['whoosh']),
    ], [], 'Punchline ngắn chèn vẽ tay')

b26 = B(12, 'I want to tell')
seg('d26', 'cat-giay', b25, b26, 'hoi-uc',
    'Hành lang Begich Towers (cắt giấy), cạnh cửa có móc treo áo; sổ du lịch mở',
    'Đầu đoạn: hai áo mưa ướt, mũ trùm; nhịp cuối Wob treo CẢ HAI áo mưa lên móc, còn áo len trong + ba lô', 'cat', 'giay', [
    N(b25 + 0.1, 'Back inside, dripping on the hallway floor, I changed my plan.', 'Wob đứng thành vũng nước giữa hành lang, mở sổ', '', ['so-du-lich'], []),
    N(T(11, 'I had come'), 'I had come to move here and take long walks. New plan: move here and never go outside.', 'Trong sổ: Wob gạch dòng long walks, viết never go outside', '', ['so-du-lich', 'but-chi'], []),
    N(T(11, 'Suddenly, a town'), 'Suddenly, a town in one building did not look odd. It looked like the sensible answer.', '[giu-tinh-bo] Wob treo hai áo mưa lên móc, gật gù; giữ 1 s', '', [], []),
    N(round(E(11) + 1.0, 3), '', '[lui-cham-im-lang] Nhạc tắt; im 1,5 s; nối giấy sang đoạn nghiêm', '', [], []),
    ], ['long walks', 'never go outside'], 'Wob đổi ý lần 1 (mồi giữ chân); cắt giấy nối tiếp không gian thật. Khoảng lặng trước chương nghiêm')

# ================= CHƯƠNG 5: March 27, 1964 (NGHIÊM, KHÔNG GAG) =================
b27 = B(13, 'I went back')
seg('d27', 'cat-giay', b26, b27, 'hoi-uc',
    'Cắt giấy tông trầm xám xanh: bến cảng lúc chạng vạng, nước lặng, ánh sáng thấp (có thể dùng ai-harbor-dusk làm phông nếu không có toà nhà sai chi tiết, không thì vẽ). Không tái hiện cảnh sóng, không vẽ người, không đổ nát chi tiết',
    'Wob mặc lại một áo mưa vàng (lấy từ móc), mũ trùm HẠ xuống, đứng xa, im lặng', 'giay', 'giay', [
    N(START[12], 'I want to tell this part plainly.', '[lui-cham-im-lang] Wob đứng nhỏ ở mép bến, quay lưng nửa phía người xem; camera lùi rất chậm; không gag', '', [], []),
    N(T(12, 'On March'), 'On March the twenty-seventh, nineteen sixty-four, a great earthquake struck southern Alaska.', 'Khung tĩnh: trang sổ giấy ghi March 27, 1964; chỉ chữ, không hình động đất', '', ['so-du-lich'], []),
    N(T(12, 'In Whittier,'), 'In Whittier, the quake and the waves that followed killed thirteen people. At the time, only about seventy people lived here.', 'Trang sổ ghi thêm 13; rồi ~70; camera giữ yên, không hiệu ứng', '', [], []),
    N(T(12, 'The waterfront'), 'The waterfront was badly damaged. Today the port still works, and the town still stands where it stood.', 'Về bến cảng hiện tại: đèn của một con tàu nhỏ sáng lên; Wob vẫn đứng yên', '', [], []),
    N(T(12, 'I stayed'), 'I stayed at the water for a while and did not try to be clever.', 'Giữ hình bến cảng và Wob nhỏ 2 s sau chữ cuối; im lặng không nhạc', '', [], []),
    ], ['March 27, 1964', '13', '~70'], 'Lịch sử nặng (lich-su-nghiem): cắt giấy, KHÔNG gag, không sfx, khoảng lặng 1,5 s trước và 1,5 s sau. C42–C45. Không vẽ toà đổ nát (ảnh ai-buckner-ruin không dùng)')

# ================= CHƯƠNG 6: Back in July =================
b28 = B(13, 'On the far side')
seg('d28', 'cat-giay', b27, b28, 'hoi-uc',
    'CÙNG GÓC MÁY với d01 nhưng mùa hè: ' + CONG + ', núi xanh, trời còn sáng; đồng hồ trên cổng (không hiện giờ cụ thể ngoài chữ có trong chu_tren_do_vat)',
    HE + ', giày đỏ; xe mui trần MỞ mui; dép lê và ủng trong ba lô (chưa lấy ra)', 'giay', 'giay', [
    N(START[13], 'I went back in July. Same tunnel. Different personality.', '[cat-cung-doi-mua] Cắt từ giấy vào thẳng cổng hầm cùng bố cục d01, giờ xanh mướt; bông hoa nhỏ mọc trên thanh chắn', '', ['xe-mui-tran'], ['liu-lo-vui']),
    N(T(13, 'In summer it'), 'In summer it opens at five thirty in the morning and stays open until eleven fifteen at night.', 'Tờ lịch mùa hè dán trên cổng: 5:30 và 23:15', '', [], ['ting']),
    N(T(13, 'I arrived'), 'I arrived one minute before closing, on purpose, and drove straight through.', 'Wob lái qua cổng, nháy mắt với người xem; thanh chắn hạ ngay sau đuôi xe, sượt nhẹ cuộn thảm đỏ trên ba lô', 'Thanh chắn sượt cuộn thảm', [], ['whoosh']),
    ], ['5:30', '23:15'], 'Nhảy mùa bằng cắt cứng cùng góc máy (callback mở đầu): cắt giấy. C46')

b29 = B(13, 'or paddle')
b30 = B(13, 'The quiet')
seg('d29', 'diorama', b28, b30, 'hoi-uc',
    'Diorama toàn cảnh vịnh mùa hè đến nơi: ' + SONG + '; bến cảng có tàu du lịch lớn bằng giấy, thuyền nhỏ, cần câu; camera bay qua các lớp',
    HE + '; xe mui trần mở mui đỗ ở bến; nhịp cuối mặc áo phao nhỏ trên kayak (cởi trước đoạn sau)', 'giay', 'cat', [
    N(b28 + 0.1, 'On the far side, the snow was gone and the mountains had turned green.', '[lui-ra-toan-canh] Camera ra khỏi hầm, lùi ra toàn cảnh: các lớp núi xanh, thác lớn', '', [], []),
    N(T(13, 'Cruise ships'), 'Cruise ships tie up here now. Boats head out into Prince William Sound to see glaciers.', '[luot-smootherstep] Camera lướt từ tàu du lịch giấy ở bến ra một chiếc thuyền nhỏ đi về phía sông băng ở xa', '', [], []),
    N(T(13, 'People go'), 'People go fishing for halibut and salmon,', 'Nền: người que (dạng chung) giơ cần câu, cá bơn giấy dẹt và cá hồi đung đưa. Tiền cảnh: Wob trên bến giật cần, câu lên cái nắp chai kim cương (callback đoạn đãi vàng), giơ lên soi, giữ 0,8 s', 'Wob câu được nắp chai kim cương', ['can-cau', 'nap-chai'], ['ka-ching']),
    N(T(13, 'or paddle'), 'or paddle kayaks along the shore.', 'Con rối Wob (áo phao nhỏ) trên kayak giấy chèo mải miết, thuyền xoay một vòng tại chỗ; một con hải âu giấy đậu mũi thuyền nhìn Wob, giữ 0,6 s', 'Kayak xoay tròn, hải âu nhìn', ['kayak'], []),
    ], ['Prince William Sound'], 'Toàn cảnh đến nơi có chiều sâu: diorama. Vòng 2: gộp đoạn kayak vẽ tay vào đây (T6, D6). Sông băng vẽ bằng thư viện. C47, C48')

b31 = B(14, 'On my last')
seg('d31', 'cat-giay', b30, b31, 'hoi-uc',
    'Cắt giấy: trước ' + THAP + ' mùa hè, cỏ xanh, người que mặc áo phông đi lại',
    HE + '; nhịp cuối: cất dép lê vào ba lô, xỏ ủng cao su (từ đây tới hết video Wob đi ủng, không giày đỏ)', 'cat', 'giay', [
    N(b30 + 0.1, 'The quiet winter town had turned into a front door for the whole sound.', 'Cửa toà nhà mở ra phía vịnh; camera đi ra theo cửa', '', [], []),
    N(T(13, 'The building'), 'The building was still there, of course, at the foot of the mountain. But now people were actually outside it, on purpose, in T-shirts.', '[tien-canh-khung] Toà 14 tầng dưới chân núi; tiền cảnh người que áo phông (dạng chung, tôn trọng) đi dạo', '', [], []),
    N(T(13, 'I put my'), 'I put my slippers away and found my boots. They looked nervous.', '[giu-tinh-bo] Wob nhét dép lê vào ba lô, lôi đôi ủng cao su ra; đôi ủng run nhẹ, mặt lo lắng (callback d17); Wob xỏ vào; giữ 0,8 s', 'Ủng lo lắng', ['dep-le', 'ung-cao-su'], []),
    ], [], 'Cảnh thật mùa hè: cắt giấy. Toà nhà vẽ bằng thư viện')

b32 = B(15, 'So here is')
seg('d32', 'cat-giay', b31, b32, 'hoi-uc',
    'Cắt giấy: lối mòn đá giữa núi xanh, sông băng phía xa (vẽ bằng thư viện, có thể dùng ai-portage-pass làm phông xa nếu khớp); rồi bến cảng có bảng gỗ; rồi tảng đá phơi nắng',
    HE + ', ủng cao su; mặc lại áo mưa vàng, cầm gậy; nhịp cuối gỡ áo mưa', 'giay', 'giay', [
    N(START[14], 'On my last day I hiked the Portage Pass trail, about two miles out toward Portage Lake, along the old route over the mountains.', '[di-bo-parallax] Wob leo lối mòn, gậy chống, các lớp núi trôi; biển gỗ ~2 mi', '', ['gay'], []),
    N(T(14, 'I wore my'), 'I wore my raincoat, just in case. It did not rain. I felt cheated.', '[take-cham] Trời xanh không gợn mây, Wob trong áo mưa đổ mồ hôi; giơ tay hứng mưa, một giọt duy nhất rơi trúng lòng bàn tay, rồi thôi', 'Một giọt mưa duy nhất', [], ['drop']),
    N(T(14, 'Back in town,'), 'Back in town, I learned about a new title. In October twenty twenty-six, the National Park Service named Whittier an American World War Two Heritage City. Only one city per state gets it. The town is proud of the port that made it.', 'Bến cảng: bảng gỗ ghi 2026 · WWII Heritage City; Wob đọc, gật gù; nhãn nhỏ 1 per state', '', [], ['pop']),
    N(T(14, 'And standing'), 'And standing in the sun, I changed my mind again. Not forever. Just for the summer.', 'Wob gỡ áo mưa, ngồi phơi nắng trên tảng đá; mở sổ, gạch dòng never go outside, viết summer', '', ['so-du-lich'], []),
    ], ['~2 mi', '2026 · WWII Heritage City', '1 per state', 'never go outside', 'summer'], 'Hành trình đi bộ và Wob đổi ý lần 2: cắt giấy. C49, C50')

# ================= KẾT: phán quyết ở bãi chờ =================
b33 = B(15, 'Would I move')
seg('d33', 've-tay', b32, b33, 'hoi-uc',
    'Vẽ tay trên mặt sau tờ lịch: chuỗi hình nối bằng mũi tên cảng → sương → hầm → toà nhà → thời tiết',
    'Wob ngồi trong xe mui trần ở bãi chờ đêm mùa hè: ' + HE + ', ủng cao su; áo mưa gấp trong ba lô; tờ lịch trên vô lăng, bút chì', 'giay', 'cat', [
    N(b32 + 0.1, 'So here is how it fits, written on the back of a timetable.', '[so-do-ve-tay] Tay Wob cầm bút chì trên mặt sau tờ lịch đặt trên vô lăng', '', ['to-lich-gio-ham', 'but-chi'], []),
    N(T(15, 'A war needed'), 'A war needed a port that ships could reach all year and planes could not see.', 'Hình neo cảng; máy bay giấy bịt mắt, giữ 0,6 s', 'Máy bay bịt mắt', [], []),
    N(T(15, 'The fog hid'), 'The fog hid it. A tunnel reached it.', 'Mũi tên → đám mây; mũi tên → cổng hầm', '', [], ['pop']),
    N(T(15, 'The Army left,'), 'The Army left, and its building became the town.', 'Cắt sang cận mặt Wob trên vô lăng gật theo mũi tên; rồi về tờ lịch: mũi tên → toà 14 tầng', '', [], []),
    N(T(15, 'And the weather'), 'And the weather makes living under one roof sensible instead of strange.', 'Mũi tên → đám mây mưa phủ toà nhà; Wob đội mái nhà vẽ tay lên đầu', '', [], []),
    ], [], 'Tóm lập luận bằng sơ đồ vẽ tay trên kỷ vật')

seg('d34', 'cat-giay', b33, END, 'hoi-uc',
    'Cắt giấy: bãi chờ đêm mùa hè, ' + CONG + ', đèn tín hiệu; xe Wob ở làn đầu. 20 giây cuối: không chữ ở vùng x > 1150, y > 560 (end screen); con dấu, tờ lịch và mọi chữ (SUMMER ONLY, May–Sept, 23:00) đặt trong vùng x < 1100; góc x > 1150, y > 560 để trống',
    'Như d33: ' + HE + ', ủng cao su; tờ lịch, con dấu, cuộn băng dính', 'cat', 'cuoi-video', [
    N(b33 + 0.1, 'Would I move here? Summer only.', '[giu-tinh-bo] Wob đóng con dấu SUMMER ONLY lên mặt sau tờ lịch (đúng một lần trong tập); đúng lúc dấu đóng đèn hầm chuyển xanh như đồng ý', 'Đèn xanh như gật đầu', ['to-lich-gio-ham', 'con-dau'], ['dau-wob']),
    N(T(15, 'From May'), 'From May to September, Whittier is a doorway to glaciers, fish and trails, and the tunnel stays open late.', 'Ba hình nhỏ trên tờ lịch sáng lên: sông băng, cá, lối mòn; dòng May–Sept', '', [], []),
    N(T(15, 'In winter it'), 'In winter it means roughly twenty feet of snow, wind that rolls me into doors, and a road with a bedtime.', 'Đèn cổng hầm phía sau tắt từng bóng; một bông tuyết giấy bay ngang (gợi nhắc mùa đông)', '', [], []),
    N(T(15, 'It suits'), 'It suits anyone who likes a small community and does not mind a schedule. It does not suit anyone who runs late.', 'Wob liếc đồng hồ trên táp-lô, giật mình', '', [], []),
    N(T(15, 'I taped'), 'I taped the timetable to my dashboard. This time I read it.', 'Wob dán tờ lịch lên táp-lô, tờ lịch bong một góc, Wob dán thêm ba miếng băng dính; gõ tay vào chữ 23:00; nhìn thẳng người xem, giữ', 'Ba miếng băng dính', ['bang-dinh'], []),
    N(T(15, 'Could you'), 'Could you spend a whole winter without stepping out of your building?', 'Wob nghiêng đầu chờ câu trả lời; giữ hình tới hết (không mờ đen)', '', [], []),
    ], ['SUMMER ONLY', 'May–Sept', '23:00'], 'Kết ở bãi chờ cổng hầm (đóng vòng với mở đầu: lần này Wob đã đọc lịch); cắt giấy. C52')

# ---------------- gộp đoạn để đạt tỉ lệ (vòng 1: cat-giay 59,5% > 55%) ----------------
# d07 (đếm toa) và d17 (hầm trường + ủng) chuyển sang ve-tay, gộp vào đoạn ve-tay liền trước.
GOP = {'d06': ['d07', 'd08'], 'd16': ['d17']}
byid = {d['id']: d for d in D}; bo = set()
for a, ds in GOP.items():
    for x in ds:
        byid[a]['nhip'] += byid[x]['nhip']; byid[a]['chu_tren_do_vat'] += byid[x]['chu_tren_do_vat']
        byid[a]['ket_thuc'] = byid[x]['ket_thuc']; byid[a]['ra'] = byid[x]['ra']
        byid[a]['boi_canh'] += ' | rồi: ' + byid[x]['boi_canh']; byid[a]['trang_phuc'] += ' | rồi: ' + byid[x]['trang_phuc']
        byid[a]['ly_do_phong_cach'] += ' | gộp: ' + byid[x]['ly_do_phong_cach'] + ' (chuyển sang vẽ tay để tỉ lệ cat-giay ≤ 55%)'
        bo.add(x)
D[:] = [d for d in D if d['id'] not in bo]
MAP = {}
for i, d in enumerate(D): MAP[d['id']] = f'd{i + 1:02d}'
for a, ds in GOP.items():
    for x in ds: MAP[x] = MAP[a]
ren = lambda t: re.sub(r'\bd(\d\d)\b', lambda m: MAP.get(m.group(0), m.group(0)), t)
for d in D:
    d['id'] = MAP[d['id']]
    for k in ('boi_canh', 'trang_phuc', 'ly_do_phong_cach'): d[k] = ren(d[k])
    for n in d['nhip']: n['hanh_dong'] = ren(n['hanh_dong'])

# ---------------- nhạc ----------------
NHAC = [
    {'src': 'music/frost-waltz.mp3', 'bat_dau': 0.0, 'ket_thuc': b4, 'mood': 'khac-nghiet'},
    {'src': 'music/investigations.mp3', 'bat_dau': b4, 'ket_thuc': b10, 'mood': 'hai'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': b10, 'ket_thuc': b13, 'mood': 'to-mo'},
    {'src': 'music/inspired.mp3', 'bat_dau': b13 + 1.0, 'ket_thuc': b20, 'mood': 'to-mo'},
    {'src': 'music/sneaky-snitch.mp3', 'bat_dau': b20, 'ket_thuc': round(E(11) + 0.3, 3), 'mood': 'hai'},
    {'src': 'music/lightless-dawn.mp3', 'bat_dau': round(START[12] + 1.5, 3), 'ket_thuc': round(E(12) - 0.5, 3), 'mood': 'khac-nghiet'},
    {'src': 'music/calm-curiosity.mp3', 'bat_dau': START[13], 'ket_thuc': END, 'mood': 'to-mo'},
]
for n in NHAC: n['bat_dau'] = round(n['bat_dau'], 3); n['ket_thuc'] = round(n['ket_thuc'], 3)

out = {
    '_ghi_chu': [ren(x) for x in [
        'Tập 3 Whittier, phân cảnh phối 3 phong cách (dao-dien-hoat-hinh, 23/11/2026), sinh bằng hoat-hinh/sinh-phan-canh.py từ audio/subtitles.json (Edge TTS, 15 cảnh).',
        'ĐẢO KHUÔN so với tập 1–2: mở thẳng ở cổng hầm ban đêm; bàn kỷ vật (khung hiện tại, CHỈ diorama) chỉ xuất hiện giữa tập (d14, cảnh 7 "Back home"); kết ở bãi chờ cổng hầm, không về bàn.',
        'KỶ VẬT: tờ lịch giờ hầm (mở d01, vẽ toà nhà d14, sơ đồ d33, dán táp-lô d34). Đồng hồ cổng KHÔNG ghi 23:14 (không có trong lời/claims).',
        'KHOÁ TRANG PHỤC: chuyến đông d01–d13 mũ len kem quả bông đỏ #C9463A + khăn kem (mũ lệch từ d08); d14 bàn: không mũ; d15–d19 đồ ngủ + dép lê (không mũ); d20 áo khoác kem + mũ len; d21–d26 áo mưa vàng #E2B33C mũ trùm (d25 thêm áo mưa nhỏ, d26 treo cả hai); d27 một áo mưa, mũ trùm hạ; d28–d31 mũ lưỡi trai xanh băng, giày đỏ, đổi sang ủng cao su cuối d31; d32 thêm áo mưa rồi gỡ; d33–d34 mũ lưỡi trai + ủng. Ba lô xanh ô liu có cuộn thảm đỏ ở mọi đoạn hồi ức.',
        'ẢNH: 4 ảnh chính ai-tunnel-portal, ai-begich-towers, ai-buckner-ruin, ai-summer-sound SAI CHI TIẾT -> KHÔNG dùng, thợ dựng vẽ bằng thư viện (mô tả đúng ghi trong boi_canh). Ảnh phụ khác (ai-bear-valley-queue, ai-tunnel-inside, ai-begich-hallway, ai-portage-pass, ai-harbor-dusk) chỉ làm phông xa nếu khớp, xem kỹ trước khi dùng.',
        'NGHIÊM: d27 (cảnh 12, động đất 1964, 13 người chết) không gag, không sfx, không tái hiện sóng hay người; lặng 1,5 s trước và sau, nhạc tắt ở cuối d26.',
        'SFX chỉ chọn từ sfx/GIAY-PHEP.md. Nhạc chọn từ music/GIAY-PHEP.md (theo tên, chưa ai nghe).',
        'LOGO: không đặt chữ ở vùng x > 1500, y < 150. 20 s cuối không chữ ở x > 1150, y > 560.',
    ]],
    'fps': 30, 'rong': 1920, 'cao': 1080, 'thoi_luong': END,
    'loi': [{'scene': s['id'], 'bat_dau': START[s['id']]} for s in sub],
    'nhac': NHAC, 'am_luong_nhac': 0.2,
    'doan': D,
}
json.dump(out, open(P + '/hoat-hinh/phan-canh.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
# tự kiểm
assert D[0]['bat_dau'] == 0 and D[-1]['ket_thuc'] == END
for a, b in zip(D, D[1:]):
    assert a['ket_thuc'] == b['bat_dau'] and a['ket_thuc'] > a['bat_dau'], (a['id'], b['id'])
    assert (a['ra'] == 'giay') == (b['vao'] == 'giay'), ('noi giay lech', a['id'], b['id'])
tong = {}
for d in D:
    tong.setdefault(d['phong_cach'], [0, []]); tong[d['phong_cach']][0] += d['ket_thuc'] - d['bat_dau']; tong[d['phong_cach']][1].append(d['id'])
print('so doan', len(D), 'thoi luong', END)
for k, (s, ids) in tong.items(): print(k, round(s, 1), f'{100 * s / END:.1f}%', ' '.join(ids))
for d in D: print(d['id'], d['phong_cach'], round(d['ket_thuc'] - d['bat_dau'], 1))
the = [re.match(r'\[([a-z0-9-]+)\]', n['hanh_dong']) for d in D for n in d['nhip']]
the = [m.group(1) for m in the if m]
from collections import Counter
c = Counter(the); print('the', len(c), 'nhip co the', len(the), c.most_common(3))
