# Sinh hoat-hinh/phan-canh.json cho tập 5 Tristan da Cunha (dao-dien-hoat-hinh).
# Vòng 1: 28/11/2026. Chép khung từ projects/2026-11-16-santa-cruz-del-islote/hoat-hinh/sinh-phan-canh.py (bản cuối,
# hàm T() khớp cả dấu câu) rồi viết lại nội dung. T() thêm: token gộp viết bằng gạch dưới ('Tristan_da_Cunha,').
# Chạy: python projects/2026-11-16-tristan-da-cunha/hoat-hinh/sinh-phan-canh.py projects/2026-11-16-tristan-da-cunha
# Khung xuất 2560×1440 (xuat), toạ độ thiết kế 1920×1080. Mốc tuyệt đối tính từ audio/subtitles.json (17 cảnh).
import json, re, sys
from collections import Counter
P = sys.argv[1]
sub = json.load(open(P + '/audio/subtitles.json', encoding='utf8'))['scenes']
# khoảng nghỉ sau mỗi cảnh (giây). Trước chương: 1,5; vào chương 1961 (11→12) và cắt về bàn (12→13): 2,0
GAP = {1: 1.0, 2: 1.5, 3: 1.0, 4: 1.5, 5: 1.2, 6: 1.2, 7: 1.5, 8: 1.0, 9: 1.0, 10: 1.5,
       11: 2.0, 12: 2.0, 13: 1.5, 14: 1.2, 15: 1.5, 16: 1.5}
START = {}; t = 0.4
for s in sub:
    START[s['id']] = round(t, 3); t += s['duration'] + GAP.get(s['id'], 0)
DUOI_A = round(START[17] - 0.6, 3)          # đoạn đuôi bắt đầu
END = round(DUOI_A + 20.0, 3)                # đuôi 20,0 s (end screen YouTube tối đa 20 s)


def norm(w):
    return re.sub(r"[^a-z0-9'-]", '', w.lower())


def T(sc, phrase, end=False):
    """Mốc tuyệt đối của cụm từ. Dấu câu cuối token trong `phrase` phải KHỚP dấu câu cuối từ
    (vd 'Next: an' khác 'next to'). Token gộp của TTS (vd 'Tristan da Cunha,') viết nối bằng '_'."""
    ws = sub[sc - 1]['words']
    toks = phrase.split()
    for i in range(len(ws)):
        ok = True
        for j, tk in enumerate(toks):
            if i + j >= len(ws): ok = False; break
            w = ws[i + j]['text']
            if norm(w) != norm(tk): ok = False; break
            p = re.sub(r"[A-Za-z0-9'\-_]", '', tk)
            if p and not w.endswith(p): ok = False; break
        if ok:
            j = i + len(toks) - 1
            return round(START[sc] + (ws[j]['end'] if end else ws[i]['start']), 3)
    raise SystemExit(f'khong thay "{phrase}" o canh {sc}')


def E(sc): return round(START[sc] + sub[sc - 1]['duration'], 3)
def G(sc, k=0.5): return round(E(sc) + GAP[sc] * k, 3)
def B(sc, phrase): return round(T(sc, phrase) - 0.15, 3)


def N(tai, loi, hd, gag='', dc=(), sfx=()):
    return {'tai': round(tai, 3), 'loi': loi, 'hanh_dong': hd, 'gag': gag, 'dao_cu': list(dc), 'sfx': list(sfx)}


D = []
def seg(id, pc, a, b, lop, bc, tp, vao, ra, nhip, chu, ly, **kw):
    nhip = sorted(nhip, key=lambda n: n['tai'])
    d = dict(id=id, phong_cach=pc, bat_dau=a, ket_thuc=b, lop=lop, boi_canh=bc, trang_phuc=tp,
             vao=vao, ra=ra, nhip=nhip, chu_tren_do_vat=chu, ly_do_phong_cach=ly)
    d.update(kw); D.append(d)


# ---------------- KHOÁ TRANG PHỤC, ĐẠO CỤ CHUNG 3 PHONG CÁCH (tập 5) ----------------
AO = ('ÁO MƯA VẢI DẦU CAM #E07A2E (đường may, viền mũ trùm #B85A1E, hai cúc gỗ #8A5A33; dài tới gối Wob; '
      'giữ DÁNG áo mưa có mũ trùm đã có từ tập 3: ve-tay rig `raincoat` thêm khoá màu cam (chỉ thêm, vd `raincoat: {mau: "cam", hood}`), '
      'cắt giấy/diorama vẽ cùng dáng đổi màu. KHÁC áo mưa vàng #E2B33C tập 3 và mũ cói tập 4; không đội mũ nào khác)')
BALO = ('BA LÔ NHỎ: ba lô mặc định của rig (xanh ô liu #7C8646, viền #566030, cuộn thảm đỏ #C9463A buộc trên nắp), cao ≈ 0,4 thân Wob, '
        'ĐÚNG ba lô bé Wob đeo ở cuối đuôi tập 4; quai vắt ngoài áo mưa. KHÔNG ba lô khổng lồ')
GIAY = 'giày đỏ của tạo hình gốc (lời gọi là "boots")'
TRIP = AO + '; ' + BALO + '; ' + GIAY
LEN = 'mũ trùm LÊN (gió biển)'
HA = 'mũ trùm HẠ (trên đảo)'
NHA = ('Ở NHÀ: không áo mưa, không mũ, không đeo ba lô (rig noPack); áo mưa cam treo trên móc tường sau bàn, '
       'ba lô nhỏ dựa chân đèn bàn (dấu chuyến đi đã xong)')
TRAM = 'Mặt Wob TRẦM (miệng thẳng/buồn: cat-giay `thang`/`buon`), KHÔNG cười suốt đoạn'
BUU = ('BƯU THIẾP: giấy kem #F3E6C8 mép quăn, một góc sờn. MẶT TRANH: núi lửa hình nón đội mây trên biển xám. MẶT VIẾT: nét chữ tay mực '
       'xanh đen chi chít kín tới mép (vẽ là nét nguệch ngoạc, KHÔNG chữ đọc được trừ khi đoạn ghi rõ), 2–3 dấu bưu điện tròn chồng chéo '
       '(vòng + vạch sóng, KHÔNG chữ, KHÔNG số); góc phải trên dán CON TEM nét mực ĐEN TRẮNG kiểu vẽ tay 1946 có răng cưa: núi lửa hình nón '
       '+ thuyền dài có mái chèo, dòng TRISTAN DA CUNHA trên đỉnh tem (chỉ vẽ chữ khi cận ≥ 45 px, cỡ xa thay bằng vạch mực); '
       'KHÔNG mệnh giá, KHÔNG chim cánh cụt')
CHI = 'cuộn chỉ xanh đậm #2F4A6B (thay thước dây: thước dây là đạo cụ gag tập 3)'
BINH = 'bình ôxy cũ xám bạc sờn, vạch sơn xanh lá bong tróc, treo bằng xích trên giá gỗ ở bến'
DAY = 'cuộn dây thừng sợi gai vàng nâu #B89A5E'
BAN = 'Bàn kỷ vật dưới đèn bàn ấm (cùng bàn mọi tập), sổ du lịch'
HC = ('THẺ HỘ CHIẾU giấy: tên nơi XUỐNG HAI DÒNG "TRISTAN" / "DA CUNHA" cỡ ≥ 72 px hệ 1920, dòng SOUTH ATLANTIC và dòng Would Wob move here? '
      '≥ 54 px, một ô con dấu vuông còn trống; thẻ ở góc trái trên x 96–900, y 54–540')
NGUOI = 'người que/giấy dạng chung, nhỏ, KHÔNG mặt chi tiết, không ai là một người cụ thể, vẽ tôn trọng'

# ================= CHƯƠNG 1 · The Postcard That Lost the Race (cảnh 1–2, ở bàn) =================
b02 = B(1, 'A volcano.')
seg('d01', 'diorama', 0.0, b02, 'hien-tai',
    BAN + ' mở ở nửa trái mặt bàn; trang sổ dán bản đồ code map-tristan (Nam Đại Tây Dương, chấm Tristan ở nửa phải trang; bản dán trên sổ BỎ NHÃN CHỮ). '
    'TRỒNG MỐC GỌI LẠI: một dãy chấm bút bi đều nhau chạy từ trang sổ tràn qua mép, bò ngang mặt bàn tới mép bàn (chưa giải thích; d07 mới lộ). '
    'Vé tàu giấy đã xé một nửa (không chữ) nằm cạnh sổ. Wob ĐỨNG trên mặt bàn ở nửa phải khung.',
    NHA + '; cầm ' + BUU + ', mặt viết quay ra người xem (tem đọc được hình núi lửa + thuyền khi cận)',
    'dau-video', 'chen', [
    N(START[1], 'This postcard arrived this morning.', '[day-vao-cham] Khung 0 đã có hình: Wob giơ sẵn tấm bưu thiếp ngang mặt, tem góc phải trên rõ nét; camera đẩy chậm 1,0→1,05. Đúng "arrived" Wob lắc bưu thiếp: vài hạt muối biển trắng và một giọt nước rơi xuống mặt bàn', 'Wob nhìn giọt nước trên bàn, rồi nhìn thẳng người xem, giữ 0,6 s', ['buu-thiep'], ['drop']),
    N(T(1, 'I posted'), 'I posted it from an island that everyone once had to leave.', 'Wob chỉ bưu thiếp xuống trang sổ: chấm Tristan trên bản đồ sáng nhẹ một lần; dãy chấm bút chạy từ trang sổ qua mặt bàn hiện rõ trong khung (không ai nhắc tới)', '', ['buu-thiep', 'so-du-lich', 'map-tristan'], []),
    ], ['TRISTAN DA CUNHA'],
    'Khung hiện tại ở bàn kỷ vật (luật: chỉ diorama). Khuôn mở khác tập 4 (tập 4 mở ở bàn rồi nhảy lên thuyền ngay): tập 5 ở bàn trọn lời mở + lời hứa, chèn vẽ tay nhanh hai hình kết cục (núi lửa, lá phiếu). GHI CHO THỢ (dung-diorama): khung 0 phải có Wob + bưu thiếp; tem chỉ vẽ chữ khi cận')

b03 = B(1, 'I got home')
seg('d02', 've-tay', b02, b03, 'hoi-uc',
    'Chèn nhanh vẽ tay, nét mực sôi trên nền giấy: (1) hình nón núi lửa đội mây giữa biển, dãy mái nhà nhỏ ở chân núi, một làn khói mảnh bốc lên cạnh mái nhà; (2) một con tàu nhỏ rời đảo trên biển xám; (3) một hộp phiếu gỗ',
    'Wob vẽ tay nhỏ ở mép khung, đồ ở nhà (không áo mưa, không ba lô); KHÔNG khẩu hình (lop hoi-uc)', 'chen', 'cat', [
    N(b02, 'A volcano.', '[chen-ve-tay] Hình to: núi lửa hình nón đội mây, làn khói mảnh bốc lên ở chân núi cạnh dãy mái nhà nhỏ; Wob nhỏ ở mép khung mắt tròn xoe (soc)', '', [], ['whoosh']),
    N(T(1, 'They were taken'), 'They were taken to England,', 'Lia nhoè sang: một con tàu nhỏ chở những chấm người (không mặt) rời đảo, đảo lùi về sau', '', [], []),
    N(T(1, 'voted to go'), 'then voted to go back.', 'Cận: một lá phiếu giấy gấp đôi (không chữ, không số) rơi vào khe hộp gỗ; giữ 0,5 s', '', ['la-phieu'], ['drop']),
    ], [],
    'Kết cục kể trước bằng hai hình chèn vẽ tay 4 s (ý hình của biên kịch). Lop hoi-uc để không bật khẩu hình')

b04 = B(2, 'In England')
t_tdc = T(2, 'Tristan_da_Cunha,')
seg('d03', 'diorama', b03, b04, 'hien-tai',
    'Như d01 (bàn, đèn ấm, sổ map-tristan, dãy chấm bút trên bàn, vé tàu đã xé). Sau "Tristan da Cunha" camera hạ xuống trang sổ cho nhịp sợi chỉ (trang ≥ 60% khung); rồi cận mặt tranh bưu thiếp cho thẻ ~220',
    NHA + '; cầm bưu thiếp (như d01); từ nhịp sợi chỉ cầm ' + CHI + '; tới "the nearest other people" Wob đã tháo dây giày đỏ một chiếc giày (đứng một chân tới hết đoạn, rồi xỏ lại dây trong khoảng lặng đầu d05)',
    'cat', 'chen', [
    N(b03 + 0.05, 'I got home first.', 'Wob đặt bưu thiếp xuống cạnh vé tàu đã xé của mình, gõ ngón tay lên vé hai cái, mặt tự mãn (hao-hung); giữ 0,6 s', 'Wob về trước bưu thiếp của chính mình, tự hào như thắng cuộc đua', ['buu-thiep', 've-tau'], ['bonk']),
    N(T(1, "Hi, I'm Wob."), "Hi, I'm Wob. I visit odd places and ask why anyone stays.", '[giu-tinh-bo] LỜI CHÀO NHẬN DIỆN (skill mo-ket): Wob quay ra người xem, vẫy tay; không thẻ hộ chiếu ở đây (thẻ vào ở chữ Tristan da Cunha)', '', [], []),
    N(START[2], 'The island is Tristan da Cunha,', 'Wob lật bưu thiếp sang MẶT TRANH: núi lửa hình nón đội mây giữa biển xám, giơ lên cạnh mặt', '', ['buu-thiep'], ['lat-giay']),
    N(t_tdc - 0.05, 'Tristan da Cunha, in the middle of the South Atlantic.', HC + ' lật vào góc trái trên đúng chữ "Tristan" (≈ ' + f'{t_tdc:.1f}' + ' s), hiện ĐỦ 3 s rồi lật đi, xong trước chữ "Guinness". Wob đứng nửa phải khung, mặt Wob không bị thẻ che; không vào vùng logo x > 1500, y < 150', '', ['the-ho-chieu'], ['lat-giay']),
    N(T(2, 'Guinness'), 'Guinness lists it as the most remote inhabited island, measured by the distance to the nearest other people.', '[trang-so-ban-do] Camera hạ xuống trang sổ: Wob buộc đầu ' + CHI + ' vào chấm Tristan rồi kéo sợi chỉ đi về PHÍA BẮC tìm chấm có người gần nhất; kéo mãi chưa tới chấm nào thì cuộn chỉ hết', 'Cuộn chỉ hết giữa chừng: Wob tháo dây giày đỏ của mình nối vào, kéo tiếp, đứng một chân; đầu dây vẫn chưa chạm chấm nào, giữ 0,6 s', ['cuon-chi', 'day-giay', 'so-du-lich'], ['boing']),
    N(T(2, 'As of'), 'As of November twenty twenty-six, it counted about two hundred and twenty islanders.', '[lao-vao-can-canh] Wob cắm một tấm biển gỗ tí hon (tăm + mẩu giấy) vào chân núi trên mặt tranh bưu thiếp; camera lao cận để thẻ ~220 islanders · Nov 2026 ≥ 45 px', '', ['buu-thiep', 'bien-tam'], ['pop']),
    ], ['TRISTAN DA CUNHA', 'SOUTH ATLANTIC', 'Would Wob move here?', '~220 islanders · Nov 2026'],
    'Lời chào + thẻ hộ chiếu + lời hứa ở bàn kỷ vật: diorama. C02, C03. Sợi chỉ đi về phía bắc là manh mối hình thứ nhất (không nhãn, không tới đích). GHI CHO THỢ (dung-diorama): tên nơi trên thẻ hộ chiếu hai dòng ≥ 72 px, dòng khác ≥ 54 px; thẻ hiện đủ 3 s trước giây 40; KHÔNG chữ, hình Napoleon/St Helena',
    the_ho_chieu={'cue': 'Tristan da Cunha', 'noi': 'Tristan da Cunha', 'nuoc': 'South Atlantic'})

b05 = B(2, 'Nearly all')
seg('d04', 've-tay', b04, b05, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: một con phố Anh có xe buýt hai tầng, cửa hàng có mái hiên, dây phơi tất khô',
    'Wob vẽ tay nhỏ ở mép bong bóng, đồ ở nhà; KHÔNG khẩu hình', 'chen', 'cat', [
    N(b04, "In England they'd had buses, shops and dry socks.", '[bong-bong-tuong-tuong] Hình to: xe buýt hai tầng chạy qua đúng "buses", cửa hàng bật đèn đúng "shops", dây phơi tất khô cong đúng "socks"', 'Một chiếc tất khô tới mức cứng đơ, đứng thẳng được trên dây phơi; Wob gõ nó kêu cộc cộc', ['tat-kho'], ['whoosh', 'bonk']),
    ], [], 'So sánh tưởng tượng 3 s: vẽ tay chèn')

b06 = G(2)
seg('d05', 'diorama', b05, b06, 'hien-tai',
    'Như d03 (bàn, sổ map-tristan). BẢN ĐỒ TRÊN SỔ có thêm một chấm đảo nhỏ ở PHÍA BẮC Tristan (vị trí St Helena −15.96, −5.71 tính bằng cùng phép chiếu orthographic của map-tristan trong manifest: center [−12.28, −37.11], zoom 1.6, anchor 1320,560), KHÔNG nhãn, không tên, không mũ, không lính; chấm chỉ sáng ở nhịp cuối',
    NHA + '; dây giày đã xỏ lại (đầu đoạn); cầm bút chì; cuối đoạn tay không',
    'cat', 'giay', [
    N(b05 + 0.05, 'Nearly all of them still voted for the island with the volcano.', 'Wob xỏ lại dây giày, ngẩng lên, giơ bưu thiếp mặt tranh núi lửa cạnh mặt, mắt mở to (soc); tay kia giơ một lá phiếu giấy nhỏ, đặt lá phiếu lên hình núi lửa', '', ['buu-thiep', 'la-phieu'], []),
    N(T(2, 'I wanted'), 'I wanted to know why.', 'Wob viết tay lên lề trang sổ: WHY GO BACK? (chữ viết tay ≥ 45 px), gạch chân hai lần', '', ['but-chi', 'so-du-lich'], ['ting']),
    N(T(2, 'But first,'), 'But first, an older question. Who would start a village out there at all?', 'Wob gõ đầu bút chì lên chấm Tristan ba cái, nhíu mắt (ngam-nghi); camera đẩy chậm vào trang sổ', '', ['but-chi'], []),
    N(T(2, 'I guessed'), 'I guessed wrong. Twice.', 'Hai bong bóng ý nghĩ bật lên trên đầu Wob: một con tàu buồm giấy, một mảnh ván trôi; đúng "Twice." lần lượt vỡ "bụp"', 'Bong bóng thứ hai vỡ bắn mảnh giấy vụn lên mặt Wob', [], ['pop', 'pop']),
    N(T(2, 'The answer,'), 'The answer, it turned out, lived on a different island.', 'MANH MỐI CHỈ BẰNG HÌNH: trên bản đồ trong sổ, chấm đảo nhỏ phía bắc (không nhãn) nháy sáng MỘT lần đúng "different island"; Wob liếc theo. Rồi [lao-vao-hinh-ve] camera lao vào trang sổ, 0,5 s cuối phủ thành giấy phẳng #EFE3C8', '', ['so-du-lich', 'map-tristan'], ['ting']),
    ], ['WHY GO BACK?'],
    'Hết lời hứa ở bàn: diorama. Treo câu hỏi cũ hơn + manh mối hình (chấm phía bắc nháy, không nhãn); KHÔNG chữ, hình Napoleon trước d16 (dap_an_chinh cảnh 6). WHY GO BACK? là on_screen_text của cảnh 1 (chữ trong lời)')

# ================= CHƯƠNG 2 · Six Days of Grey (cảnh 3–4) =================
b07 = B(3, 'about two')
seg('d06', 've-tay', b06, b07, 'hoi-uc',
    'Vẽ tay nét sôi trên trang sổ phác: chấm đảo là hình nón núi lửa bé giữa biển kẻ sóng; một chiếc máy bay giấy',
    'Wob vẽ tay nhỏ ở mép trang (' + AO + ', ' + HA + ', ba lô nhỏ, giày đỏ)', 'giay', 'cat', [
    N(START[3], 'There is no airstrip on Tristan.', '[so-do-ve-tay] Từ giấy phẳng nét mực vẽ dần: núi lửa giữa biển; máy bay giấy lượn tới tìm chỗ đáp, lượn một vòng quanh đỉnh', 'Máy bay giấy thử đáp lên sườn núi, trượt xuống như cầu trượt, lủi thủi bay ra khỏi trang; Wob ở mép trang che mắt', ['may-bay-giay'], ['whoosh', 'boing']),
    N(T(3, 'You go'), 'You go by sea, from Cape Town in South Africa,', 'Máy bay giấy bay trở lại, tự gấp lại thành một chiếc thuyền giấy và đáp xuống nước, nổi bập bềnh; Wob giơ ngón cái', 'Máy bay tự gấp thành thuyền', ['thuyen-giay'], ['lat-giay']),
    ], [], 'Gag mở chương bằng nét vẽ: vẽ tay. Lệch y_hinh: thêm máy bay giấy tự gấp thành thuyền ở "You go by sea" để câu này có hình riêng')

b08 = B(3, 'I packed and')
seg('d07', 'cat-giay', b07, b08, 'hoi-uc',
    'Trang sổ hành trình (journalPage + mapSticker map-tristan-route: Cape Town bên phải, Tristan bên trái, đường nét đứt cong). Rồi boong tàu cá nhỏ giữa biển xám (parallax: lan can tiền cảnh, sóng xám, trời xám). Rồi cabin hẹp: giường tầng, bàn gấp nhỏ, đồng hồ treo vách (không chữ, không số), ô cửa sổ tròn',
    TRIP + '. Boong: ' + LEN + '; cabin: ' + HA + ', ba lô nhỏ trên giường tầng', 'cat', 'chen', [
    N(b07 + 0.05, 'about two thousand eight hundred kilometres away.', '[trang-so-ban-do] CẬN trang sổ (trang ≥ 70% khung): map-tristan-route; nét đứt Cape Town → Tristan vẽ dần đúng "two thousand eight hundred", thẻ ~2,810 km · ~1,750 mi bật lên ở "miles"', '', ['so-du-lich', 'map-tristan-route'], ['pop']),
    N(T(3, 'The crossing'), 'The crossing usually takes around six days.', 'Một con tàu giấy tí hon bò theo nét đứt, thẻ ~6 days dán cạnh; Wob ở mép trang đếm sáu ngón tay (giơ đủ 6 bằng hai tay)', '', [], []),
    N(T(3, 'Only nine'), 'Only nine sailings from Cape Town were on the twenty twenty-six schedule.', 'Lịch treo tường giấy 2026: chỉ 9 ô có hình con tàu nhỏ, còn lại trống trơn; Wob dò ngón tay qua các ô trống', '', ['lich-treo'], []),
    N(T(3, 'I took'), 'I took the small backpack this time.', '[tien-canh-khung] Boong tàu cá, lan can làm tiền cảnh: Wob (áo mưa cam, mũ trùm lên) quay lưng khoe BA LÔ NHỎ đúng "small backpack", ưỡn ngực tự hào (gọi lại đuôi tập 4)', 'Gió biển giật nhẹ, ba lô nhỏ nhẹ tới mức đung đưa ngang như lá cờ; Wob ghì quai', ['ba-lo-nho'], []),
    N(T(3, 'I got a bunk'), 'I got a bunk on a fishing ship and drew our route in my notebook, one dot for every hour.', 'Cabin: Wob ngồi bàn gấp, mũ trùm hạ, chấm từng chấm bút lên trang sổ theo nhịp kim đồng hồ treo vách (kim nhích → một chấm)', '', ['so-du-lich', 'but-bi'], []),
    N(T(3, 'By the third'), 'By the third day, the dots had gone off the edge of the page and across the table.', '[take-cham] Dãy chấm bò khỏi mép sổ, chạy qua mặt bàn, leo xuống chân bàn; Wob nhìn theo dãy chấm xuống sàn, dừng, rồi lặng lẽ kéo thêm một tờ giấy lót dưới cho chấm đi tiếp (GIẢI MỐC dãy chấm trên bàn ở d01)', 'Wob lót giấy cho chấm đi tiếp', ['so-du-lich', 'but-bi'], []),
    N(T(3, 'The sea stayed'), 'The sea stayed grey. On Monday it was grey. By Thursday it was grey with real commitment.', 'Ô cửa sổ tròn: biển xám; tờ lịch nhỏ cạnh cửa sổ lật từ MONDAY sang THURSDAY, biển vẫn xám, sóng dâng cao hơn, mây sà thấp hơn; Wob tì cằm lên bậu cửa sổ, mặt xám theo (ngam-nghi)', 'Mặt Wob bạc màu dần theo biển', ['lich-nho'], ['song']),
    ], ['~2,810 km · ~1,750 mi', '~6 days', '2026', 'Cape Town', 'Tristan da Cunha', 'MONDAY', 'THURSDAY'],
    'Hành trình trang sổ + boong tàu + cabin nhiều lớp: cắt giấy (journalPage, mapSticker). C05–C08. GHI CHO THỢ (dung-cat-giay): nhãn bản đồ ≥ 45 px chỉ khi cận trang; đồng hồ cabin không chữ, không số; khoá áo mưa cam + ba lô nhỏ bắt đầu từ đây')

b09 = B(3, 'Then, one')
seg('d08', 've-tay', b08, b09, 'hoi-uc',
    'Vẽ tay: giường tầng trong cabin, ba lô nhỏ mở nắp, đồ đạc nhỏ bày quanh',
    TRIP + ', ' + HA + '; ba lô nhỏ TÁCH khỏi lưng (rig noPack, vẽ riêng VT.backpack)', 'chen', 'cat', [
    N(b08, 'I packed and unpacked the small backpack until it filed a complaint.', '[leo-thang-ba-lan] Hình to: Wob nhét đồ vào ba lô nhỏ rồi lôi ra, ba lần, mỗi lần nhanh hơn; lần ba ba lô giơ lên một tờ giấy bé có hình mặt cau có (không chữ)', 'Ba lô quay lưng lại với Wob, khoá kéo mím chặt', ['ba-lo-nho'], ['whoosh', 'pop']),
    ], [], 'Gag cường điệu đồ vật có cảm xúc: vẽ tay chèn')

b10 = B(4, 'Up close,')
seg('d09', 'cat-giay', b09, b10, 'hoi-uc',
    'Biển xám buổi sáng, parallax nhiều lớp: chân trời có một đám mây đứng yên; dưới mây hiện dần hình nón núi lửa khổng lồ. Rồi tàu cá neo ngoài khơi giữa sóng xám, một xuồng nhỏ nhấp nhô cạnh mạn tàu, thùng hàng thả xuống bằng dây; thang dây ở mạn tàu',
    TRIP + ', ' + LEN + '; ba lô nhỏ trên lưng; sau cú "met halfway" áo mưa ướt bóng (vệt nước) tới hết d10', 'cat', 'cat', [
    N(b09 + 0.05, 'Then, one morning, a cloud sat on the horizon and refused to move.', '[day-vao-cham] Wob bé tí ở mũi tàu nhìn ra chân trời xám; một đám mây đứng yên trong khi mọi đám mây khác trôi qua', '', [], []),
    N(T(3, 'There was'), 'There was a mountain under it.', '[wob-be-ti] Camera hạ xuống: dưới đám mây là cả hình nón núi lửa khổng lồ; Wob bé tí ở mũi tàu, mũ trùm bay ngược ra sau; giữ 0,8 s', '', [], []),
    N(START[4], "Then came the part the ticket doesn't cover. Getting off.", 'Tàu cá neo ngoài khơi; Wob đứng mép mạn tàu nhìn xuống xuồng nhỏ nhấp nhô dưới thấp', '', [], ['song']),
    N(T(4, 'Big ships'), "Big ships can't tie up at Tristan, so ours anchored offshore, and people and cargo went in by small boat.", 'Thùng hàng được thả xuống xuồng bằng dây; hai ' + NGUOI + ' trên xuồng đỡ thùng; xuồng nhấp nhô theo sóng', '', ['thung-hang'], []),
    N(T(4, 'I stepped'), 'I stepped down into it just as it rose up to meet me.', 'Wob bước xuống thang dây đúng lúc xuồng nảy lên', '', [], []),
    N(T(4, 'We met'), 'We met halfway. Not gracefully.', '[take-cham] Xuồng và Wob gặp nhau giữa chừng "bộp": Wob dính bẹp lên đáy xuồng như con tem, ba lô nhỏ rơi đè lên trên; Wob nằm im, chớp mắt; giữ 0,8 s', 'Wob bẹp như con tem dán đáy xuồng', ['ba-lo-nho'], ['bonk']),
    ], [], 'Tới nơi bằng tàu + lên bờ bằng xuồng, nhiều lớp sóng: cắt giấy. C09')

b11 = B(4, 'The only')
seg('d10', 've-tay', b10, b11, 'hoi-uc',
    'Vẽ tay: toàn cảnh núi lửa hình nón từ xuồng, mây quấn đỉnh như cái mũ, vách đá dựng',
    TRIP + ', ' + LEN + ', áo mưa còn ướt; ngồi trong xuồng', 'cat', 'cat', [
    N(b10, 'Up close, the island is basically one volcano, just over two thousand metres tall, about sixty-seven hundred feet,', '[wob-be-ti] Wob ngồi xuồng nhỏ xíu ở đáy khung, ngửa cổ nhìn ngọn núi lửa chiếm cả khung; thẻ ~2,060 m · ~6,760 ft cài ở sườn núi', '', [], []),
    N(T(4, 'wearing'), 'wearing a cloud like a hat.', 'Cận đỉnh núi: đám mây quấn đỉnh', 'Đám mây trên đỉnh nhấc lên chào như cái mũ rồi đội lại; Wob trong xuồng kéo mũ trùm lên chào lại', [], ['boing']),
    ], ['~2,060 m · ~6,760 ft'], 'Quy mô núi + gag mây đội như mũ: vẽ tay. C10')

b12 = G(4)
seg('d11', 'cat-giay', b11, b12, 'hoi-uc',
    'Dải đất bằng xanh dưới vách đá dựng, dãy nhà mái thấp tường đá (mái tôn màu), vài con bò; biển xám phía trước, bãi đá đen. Tấm biển tên làng dài quá khổ ở đầu làng. Mây quấn đỉnh núi phía sau',
    TRIP + ', ' + HA + ' (kéo xuống khi đặt chân lên bờ), áo khô dần; ba lô nhỏ trên lưng', 'cat', 'giay', [
    N(b11 + 0.05, 'The only village sits on a strip of flat green land at its foot.', '[luot-smootherstep] Camera lướt từ chân núi xuống dải đất xanh: dãy nhà mái thấp, bò gặm cỏ; Wob bước lên bãi đá đen, kéo mũ trùm xuống', '', [], []),
    N(T(4, 'Officially,'), "Officially, it's Edinburgh of the Seven Seas,", '[lia-theo-vat] Tấm biển tên làng dài tới mức camera phải lia theo chữ EDINBURGH OF THE SEVEN SEAS; Wob đi bộ dọc tấm biển đọc, đi mãi chưa hết', 'Wob đi dọc tấm biển dài hơn cả dãy nhà', ['bien-ten-lang'], []),
    N(T(4, 'named after'), "named after a visit from Queen Victoria's son Alfred, the Duke of Edinburgh, in eighteen sixty-seven.", 'Wob tới cuối tấm biển, thở ra; ngoài khơi xa một con tàu buồm giấy nhỏ (không cờ, không người cụ thể) neo ghé rồi đi; thẻ 1867 dán ở cuối biển', '', [], []),
    N(T(4, 'The islanders'), "The islanders don't call it that. It's the Settlement.", 'Cuối tấm biển dài treo một tấm biển gỗ nhỏ viết tay "the Settlement"; Wob gật gù, chỉ vào tấm nhỏ', '', ['bien-ten-lang'], []),
    N(T(4, 'I stood'), 'I stood on the shore with my small backpack and thought, nobody picks this on purpose.', 'Wob đứng trên bãi đá, ba lô nhỏ trên lưng, khoanh tay nhìn núi (ngam-nghi); gió thổi một chiếc lá bay qua mặt; giữ 0,6 s rồi phủ dần thành giấy', '', [], []),
    ], ['EDINBURGH OF THE SEVEN SEAS', 'the Settlement', '1867'],
    'Đến làng, đi dọc biển tên: cắt giấy parallax. C11–C13. Wob nghĩ "không ai chọn nơi này" (mốc đổi ý ở d30)')

# ================= CHƯƠNG 3 · Who Starts a Village Here? (cảnh 5–7) =================
b13 = B(5, 'A Portuguese')
seg('d12', 've-tay', b12, b13, 'hoi-uc',
    'Vẽ tay trên trang sổ phác: hình con tàu buồm, mũi tên chỉ vào đảo, dấu "?"',
    'Wob vẽ tay ở mép trang, ' + AO + ', ' + HA + ', ba lô nhỏ', 'giay', 'cat', [
    N(START[5], 'So who started all this? I had a theory ready. The explorer.', '[so-do-ve-tay] Từ giấy phẳng nét mực vẽ dần: con tàu buồm, mũi tên chỉ vào đảo, dấu ?; đúng "The explorer." Wob vẽ thêm một lá cờ trơn (không biểu tượng) lên cột buồm, mắt sáng rỡ (hao-hung)', '', ['so-phac-thao'], ['ting']),
    ], ['?'], 'Đoán sai lần 1 (khuôn doan-sai-roi-lat): sơ đồ vẽ tay')

b14 = B(5, 'Second theory.')
seg('d13', 'cat-giay', b13, b14, 'hoi-uc',
    'Trang lịch sử tông giấy cũ sepia: biển rộng, hình núi lửa ở xa; một con tàu buồm ba cột đi ngang (không cờ chi tiết); rồi thuyền con giấy cập bãi cát đen. Wob đứng NGOÀI mép trang sepia (lớp chuyến đi), trên bãi đá thật',
    TRIP + ', ' + HA, 'cat', 'cat', [
    N(b13 + 0.05, 'A Portuguese commander sighted the island in fifteen oh six, and it still carries his name.', 'Tàu buồm ba cột đi ngang xa xa; người trên tàu (' + NGUOI + ') chỉ tay về hình núi; thẻ 1506 dán góc trang; Wob nhón chân nhìn qua mép trang', '', [], []),
    N(T(5, 'Surely'), 'Surely he moved in.', 'Wob trên bờ vẫy tay mời, chỉ vào bãi đất', '', [], []),
    N(T(5, 'He sailed'), 'He sailed on.', '[take-cham] Tàu buồm giấy không dừng, lướt ra khỏi khung', 'Tàu giấy vẫy lại Wob một cái rất lịch sự bằng cánh buồm rồi đi tiếp không ngoái lại; tay Wob khựng giữa không trung, giữ 0,6 s', ['tau-buom'], []),
    N(T(5, 'The first'), 'The first landing anyone recorded came in sixteen forty-three, by a Dutch ship.', 'Một thuyền con giấy cập bãi cát đen, dấu chân đầu tiên in trên cát; thẻ 1643; Wob ướm chân mình cạnh dấu chân', '', [], []),
    ], ['1506', '1643'], 'Lịch sử khám phá tông cũ: cắt giấy. C14, C15. Gag ở tàu và Wob, không ở người')

b15 = B(5, 'I walked')
seg('d14', 've-tay', b14, b15, 'hoi-uc',
    'Vẽ tay trên trang sổ phác thứ hai: bè gỗ, bãi biển, túp lều',
    'Wob vẽ tay ở mép trang, áo mưa cam mũ trùm hạ, ba lô nhỏ', 'cat', 'cat', [
    N(b14, 'Second theory. A shipwreck.', '[so-do-ve-tay] Trang lật: nét mực vẽ con tàu nghiêng gãy cột; Wob giơ hai ngón tay "lần hai"', '', ['so-phac-thao'], ['lat-giay']),
    N(T(5, "Somebody's"), "Somebody's terrible day at sea, a raft, a beach, a brave new life.", 'Ba hình hiện đúng ba chữ: bè gỗ ("raft"), bãi biển ("beach"), túp lều có khói bếp ("life"); Wob gật gù tự tin, khoanh tay', 'Wob vẽ thêm cho túp lều một hàng rào trắng và hộp thư', [], ['pop']),
    ], [], 'Đoán sai lần 2: sơ đồ vẽ tay')

b16 = B(6, 'Napoleon.')
seg('d15', 'cat-giay', b15, b16, 'hoi-uc',
    'Bãi đá đen dọc bờ, sóng xám liếm vào, rong biển; núi lửa phía sau; cuối đoạn đường chân trời biển mở về phía bắc',
    TRIP + ', ' + HA + '; cầm gậy gỗ, rồi củ khoai tây; cuối đoạn cất củ khoai vào túi hông ba lô nhỏ, tay không', 'cat', 'cat', [
    N(b15 + 0.05, 'I walked the shore with a stick, looking for the wreck that started it all.', '[di-bo-parallax] Wob đi dọc bờ đá, chọc gậy vào từng khe đá, lật rong biển; các lớp đá, sóng trôi lệch nhau', '', ['gay-go'], []),
    N(T(5, 'I found'), 'I found a potato.', '[take-cham] Wob bới lên một củ khoai tây, giơ ngang mắt, nhìn rất lâu', 'Wob ghé tai vào củ khoai như nghe tiếng biển trong vỏ ốc; giữ 0,8 s', ['khoai-tay'], ['pop']),
    N(T(5, 'Shipwrecks'), "Shipwrecks do turn up in this story, later. They didn't start it.", 'Xa ngoài khơi một mảnh ván trôi ngang; Wob cất củ khoai vào túi hông ba lô nhỏ, vỗ nhẹ túi', '', ['khoai-tay', 'ba-lo-nho'], []),
    N(T(5, 'The real'), 'The real beginning came from much further north.', 'Wob quay đầu nhìn lên phía bắc ra biển mở; camera lướt theo ánh nhìn tới đường chân trời trống (không vẽ gì khác); giữ 0,6 s', '', [], []),
    ], [], 'Đi dọc bờ có gậy, gag khoai: cắt giấy. Củ khoai cất vào ba lô để gọi lại ở bưu điện (d34)')

b17 = B(6, 'Britain worried')
seg('d16', 'cat-giay', b16, b17, 'hoi-uc',
    'Wob ngồi trên tảng đá bên bờ, sổ du lịch mở trên đùi; CẬN trang sổ (≥ 70% khung): journalPage + mapSticker map-napoleon (St Helena trên, Tristan dưới, đường nét đứt nối hai đảo)',
    TRIP + ', ' + HA + '; sổ trên đùi; cầm ' + CHI, 'cat', 'cat', [
    N(START[6], 'Napoleon.', '[lat-the] CẮT CỨNG vào trang sổ: chỉ một chiếc mũ hai sừng màu đen (phác, KHÔNG mặt, không người) rơi xuống đậu trên chấm đảo phía bắc; giữ 0,8 s', '', ['mu-hai-sung', 'so-du-lich'], ['drop']),
    N(T(6, 'After'), 'After his final defeat, Britain exiled Napoleon to St Helena, another lonely island,', 'Nhãn St Helena hiện cạnh chấm có mũ, nhãn Tristan cạnh chấm dưới; chiếc mũ hai sừng khẽ nghiêng như ngồi chờ', '', ['map-napoleon', 'mu-hai-sung'], ['pop']),
    N(T(6, 'more than'), 'more than two thousand kilometres north of Tristan.', 'Wob kéo căng sợi chỉ xanh giữa hai chấm; thẻ > 2,000 km bật lên giữa sợi chỉ', '', ['cuon-chi'], ['ting']),
    ], ['St Helena', 'Tristan', '> 2,000 km'],
    'LỜI GIẢI CHÍNH (dap_an_chinh cảnh 6) mở bằng bản đồ trang sổ: cắt giấy. C17. map-napoleon chỉ dùng từ đây. GHI CHO THỢ (dung-cat-giay): Napoleon CHỈ là chiếc mũ hai sừng phác, không mặt; nhãn khoảng cách ghi "> 2,000 km" (KHÔNG ghi ~2,437 km: không có trong lời)')

b18 = B(6, 'So on the')
seg('d17', 've-tay', b17, b18, 'hoi-uc',
    'Vẽ tay sơ đồ: hai hình đảo (đảo có chiếc mũ hai sừng phía trên, Tristan phía dưới), mũi tên, thuyền nhỏ; rồi một con tàu buồm khác (không cờ) ghé Tristan',
    'Wob vẽ tay ở mép sơ đồ, áo mưa cam mũ trùm hạ, ba lô nhỏ', 'cat', 'cat', [
    N(b17, 'Britain worried the French could use Tristan as a base for a rescue.', '[so-do-ve-tay] Mũi tên bắn từ Tristan lên đảo có mũ; một chiếc thuyền nhỏ chèo theo mũi tên tới chiếc mũ', 'Chiếc mũ hai sừng hé vành lên ngóng chiếc thuyền', ['mu-hai-sung'], ['whoosh']),
    N(T(6, 'It also'), 'It also wanted to stop American ships using it as a base, as they had in the War of eighteen twelve.', 'Một con tàu buồm thứ hai (không cờ, không biểu tượng) ghé Tristan; một thanh chắn giấy hạ xuống trước mũi tàu; thẻ 1812; Wob ở mép sơ đồ giơ tay làm động tác "dừng"', '', [], []),
    ], ['1812'], 'Cơ chế chiến lược trừu tượng: sơ đồ vẽ tay. C18')

b19 = B(6, 'I pictured')
seg('d18', 'cat-giay', b18, b19, 'hoi-uc',
    'Trang lịch sử tông sepia: bãi đá đen, hàng lính que đội mũ cao bước lên bờ từ thuyền con, cắm lá cờ nhỏ không chi tiết; rồi mỏm đá cao nhìn ra biển trống, một con chim biển. Wob đứng ngoài mép trang',
    TRIP + ', ' + HA, 'cat', 'chen', [
    N(b18 + 0.05, 'So on the fourteenth of August, eighteen sixteen, British troops landed and claimed the island.', 'Hàng lính que (' + NGUOI + ') bước lên bãi đá đen, cắm lá cờ nhỏ không chi tiết; thẻ 14 Aug 1816; Wob ngoài mép trang đứng nghiêm nhìn', '', [], []),
    N(T(6, 'A garrison,'), "A garrison, guarding an emperor who wasn't there, on an island almost nobody could reach.", '[luot-smootherstep] Lướt lên mỏm đá: một người lính que đứng gác, ống nhòm chĩa ra biển trống', 'Ống nhòm xoay một vòng 360 độ, chỉ thấy một con chim biển bay qua; Wob ngoài mép trang cùng lính nghiêm chào con chim, con chim không chào lại; giữ 0,6 s', ['ong-nhom'], []),
    ], ['14 Aug 1816'], 'Đồn lính 1816 tông cũ: cắt giấy. C19. Gag ở con chim và Wob')

b20 = B(6, 'About a year')
seg('d19', 've-tay', b19, b20, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: một thành phố nhỏ, ngôi nhà ở tận bên kia thành phố có cửa sau',
    'Wob vẽ tay trong bong bóng, áo mưa cam mũ trùm hạ, ba lô nhỏ, cầm chùm chìa khoá to', 'chen', 'cat', [
    N(b19, 'I pictured it as locking the back door of a house across town,', '[bong-bong-tuong-tuong] Wob đạp xe qua nửa thành phố tới khoá cửa sau một ngôi nhà, cầm chùm chìa khoá to, khoá ba ổ', '', ['chia-khoa'], ['whoosh']),
    N(T(6, 'just in'), 'just in case a burglar uses it as a shortcut.', 'Tên trộm giấy đeo mặt nạ đi ngang, nhìn cánh cửa khoá', 'Tên trộm nhún vai, đi cửa trước; Wob đứng ở cửa sau ôm chùm chìa khoá', [], ['bonk']),
    ], [], 'So sánh đời thường dạng giả định: vẽ tay chèn')

b21 = B(7, 'Then he and')
seg('d20', 'cat-giay', b20, b21, 'hoi-uc',
    'Trang tông sepia: tàu lính nhỏ dần ngoài khơi; trên bờ vài người que đứng nhìn theo; rồi làng hiện tại (tông màu thường) dãy mái nhà có một dấu hỏi giấy to; rồi lại trang sepia: túp lều đá, một gia đình que',
    TRIP + ', ' + HA, 'cat', 'cat', [
    N(b20 + 0.05, "About a year later, the navy decided the island wasn't worth the bother.", 'Một cây bút lông ngỗng giấy gạch một nét lên hình hòn đảo trên tấm hải đồ sepia; Wob ngoài mép trang nhíu mày', '', [], []),
    N(T(6, 'The soldiers'), 'The soldiers sailed away in November eighteen seventeen.', 'Lính que xếp hàng lên tàu, tàu nhỏ dần; trên bờ còn vài người que đứng nhìn theo; thẻ Nov 1817', '', [], []),
    N(T(6, 'Soldiers'), "Soldiers leave. That's their job.", 'Wob vẫy theo con tàu một cái, hạ tay', '', [], []),
    N(T(6, 'So why'), 'So why is there still a village?', '[lui-ra-toan-canh] Khớp hình sang làng hiện tại: Wob đứng nhìn dãy mái nhà, gãi cằm (ngam-nghi); một dấu hỏi giấy lớn bật dựng trên mái nhà; giữ 0,6 s (VÒNG TÒ MÒ MỚI ngay sau lời giải)', '', [], ['pop']),
    N(START[7], 'Because one of them asked to stay. Corporal William Glass, a Scotsman, stayed on with his wife and children.', 'Lại trang sepia: một người que mặc áo lính đứng cạnh vợ và mấy đứa trẻ que trước túp lều đá, tàu lính nhỏ dần phía sau (KHÔNG vẽ chân dung, không mặt); Wob ngoài mép trang bỏ dấu hỏi xuống', '', [], []),
    ], ['Nov 1817', '?'], 'Đồn rút, người ở lại: cắt giấy tông cũ, kể tôn trọng (không gag ở gia đình Glass). C20, C21')

b22 = B(7, 'Today,')
seg('d21', 've-tay', b21, b22, 'hoi-uc',
    'Vẽ tay trang sổ: bàn gỗ, đàn bò, bao hàng, đồng xu chia ba đống; rồi trang sổ có hình hòn đảo, từng con tàu giấy nhỏ ghé đảo; tàu bốc khói mắc cạn',
    'Wob vẽ tay ở mép trang, áo mưa cam mũ trùm hạ, ba lô nhỏ', 'cat', 'cat', [
    N(b21, 'Then he and two stonemasons signed an agreement to share everything equally, the animals, the stores and the profits.', '[so-do-ve-tay] Trên bàn gỗ vẽ tay: đàn bò, bao hàng, đồng xu tự chia thành ba đống bằng nhau đúng "animals", "stores", "profits"; ba bàn tay que cùng ký một tờ giấy (không chữ)', '', [], ['pop']),
    N(T(7, 'Nobody'), 'Nobody in the group would stand above the others.', 'Ba người que đứng ngang hàng; Wob ở mép trang lén đứng lên một hòn đá cho cao hơn', 'Wob nhìn ba người que ngang hàng, lặng lẽ bước xuống khỏi hòn đá cho bằng nhau', [], []),
    N(T(7, 'Others kept'), 'Others kept arriving. A sailor from Hastings.', '[lia-theo-vat] Trang sổ hình hòn đảo: con tàu giấy nhỏ thứ nhất ghé, thả xuống một người que xách túi đi vào làng (' + NGUOI + '); Wob ở bến vẫy chào', '', [], []),
    N(T(7, 'A Dutchman'), 'A Dutchman whose ship was wrecked.', 'Một mảnh ván trôi dạt vào bờ, người que thứ hai trèo lên bến; Wob đưa tay kéo lên', '', [], []),
    N(T(7, 'An American'), 'An American whaler, and later an American whaling captain.', 'Tàu giấy thứ ba rồi thứ tư (mỗi tàu một hình cá voi nhỏ trên buồm, không cờ) thả thêm hai người que; Wob vẫy chào, đếm đủ bốn ngón tay', '', [], []),
    N(T(7, 'In eighteen twenty-seven,'), "In eighteen twenty-seven, a ship's captain brought five women over from St Helena.", 'Một con tàu giấy từ phía bắc tới, năm người que bước xuống bến; vẽ trang trọng, KHÔNG gag; thẻ 1827', '', [], []),
    N(T(7, 'In eighteen ninety-two,'), 'In eighteen ninety-two, two Italian sailors came ashore from a wrecked ship, the Italia, and stayed.', 'Xa xa một con tàu giấy bốc khói mắc cạn (tên ITALIA trên mạn khi cận); hai người que lội lên bờ, người que trên bờ ra đón; thẻ 1892', '', [], []),
    ], ['1827', '1892', 'ITALIA'], 'Thoả ước + người tới lập làng, kể bằng trang sổ vẽ tay hiện từng nét (đổi từ cắt giấy để tỉ lệ vẽ tay ~25%). C22–C25. Lệch y_hinh: gag "người lỡ đứng lên hòn đá" chuyển sang Wob (không đùa người thật lịch sử). Không câu nào ám chỉ hôn nhân')

b23 = G(7)
seg('d22', 've-tay', b22, b23, 'hoi-uc',
    'Vẽ tay: cửa một nhà chung có bảy tấm thẻ gỗ nhỏ (chỉ hình thẻ, không chữ); rồi cuốn sổ khách khổng lồ mở trên bàn',
    'Wob vẽ tay to, áo mưa cam mũ trùm hạ, ba lô nhỏ; cầm bút chì ngắn, rồi thêm cục tẩy ở tay kia (cuối đoạn vẫn cầm cả hai)', 'cat', 'giay', [
    N(b22 + 0.05, 'Today, nearly every islander carries one of seven family names.', 'Bảy tấm thẻ gỗ nhỏ (không chữ) lần lượt treo lên thành một hàng trên cửa nhà chung; Wob đếm đủ bảy bằng ngón tay', '', [], ['pop']),
    N(T(7, 'It works'), 'It works a bit like a guestbook where every signature turned into a family.', 'Cuốn sổ khách khổng lồ mở trên bàn, mỗi chữ ký (nét nguệch ngoạc) nảy lên thành một ngôi nhà mái thấp nhỏ xíu có ống khói', '', ['so-khach'], []),
    N(T(7, 'I signed'), 'I signed it too. In pencil. Just in case.', '[giu-tinh-bo] Wob ký vào góc trang bằng bút chì ngắn; chữ ký nảy lên thành một túp lều tí hon xiêu vẹo', 'Ký xong Wob rút ngay cục tẩy ra cầm sẵn tay kia, nhìn thẳng người xem, giữ 0,8 s; rồi phủ dần thành giấy', ['but-chi', 'cuc-tay'], ['boing']),
    ], [], 'So sánh sổ khách + gag Wob ký bút chì: vẽ tay. C26. Gag ở Wob, không ở người dân')

# ================= CHƯƠNG 4 · Auditioning for the Island (cảnh 8–10) =================
b24 = B(8, 'Picture a garden')
seg('d23', 'cat-giay', b23, b24, 'hoi-uc',
    'Sáng sớm ở làng; con đường đất ra khỏi làng; đồi thấp với những ô ruộng nhỏ quây tường đá thấp (Potato Patches), chòi gỗ nhỏ, núi lửa phía sau; góc nhìn từ trên các ô ruộng khác màu khít nhau như tấm chăn chắp mảnh',
    TRIP + ', ' + HA + '; cầm tấm bảng kẹp giấy có ba ô vuông trống (ô 1 hình củ khoai, ô 2 hình tôm hùm, ô 3 hình con bò, không chữ)', 'giay', 'cat', [
    N(START[8], 'Next morning, I auditioned for island life. First job, the Potato Patches.', 'Từ giấy phẳng hiện dần: Wob đứng trước cửa nhà trọ giơ tấm bảng kẹp giấy ba ô, chỉ vào ô củ khoai, mặt quyết tâm (hao-hung)', '', ['bang-kep'], ['lat-giay']),
    N(T(8, "They're"), "They're walled fields a few kilometres outside the village, and every family farms there, at least part time.", '[di-bo-parallax] Wob đi bộ trên con đường đất ra khỏi làng (không chỉ hướng), các lớp đồi, tường đá trôi lệch; tới các ô ruộng quây tường đá thấp, vài ' + NGUOI + ' cúi làm ở xa', '', [], []),
    N(T(8, 'All the'), 'All the land on Tristan is owned in common. No outsider can buy a piece of it.', 'Góc nhìn từ trên: các ô ruộng khác màu khít nhau như tấm chăn chắp mảnh; Wob bé tí đứng giữa một đường tường, dang tay ướm thử một ô rồi rụt tay về ngay ở "No outsider"', '', [], []),
    ], [], 'Đi bộ ra ruộng, nhiều lớp đồi: cắt giấy. C27, C28. Chương "thử, hỏng, hiểu" (khác "một ngày ở đây": không đồng hồ, không mốc giờ)')

b25 = B(8, 'The potatoes go')
seg('d24', 've-tay', b24, b25, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: một dãy phố, mỗi nhà chăm một luống trong cùng một khu vườn chung',
    'Wob vẽ tay trong bong bóng, áo mưa cam mũ trùm hạ, ba lô nhỏ', 'chen', 'cat', [
    N(b24, 'Picture a garden the whole street plants together, where you look after your own rows', '[bong-bong-tuong-tuong] Hình to: dãy phố vẽ tay, mỗi nhà một luống trong khu vườn chung, mọi người que tưới luống của mình', '', [], ['whoosh']),
    N(T(8, 'but can'), 'but can never put them up for sale.', 'Wob cắm tấm biển FOR SALE vào luống của mình', 'Tấm biển tự rút lên khỏi đất, bay vèo ra khỏi khung; Wob nhìn theo cái lỗ trên luống', ['bien-ban'], ['boing']),
    ], ['FOR SALE'], 'So sánh đời thường dạng giả định: vẽ tay chèn. Lệch y_hinh: người cắm biển là Wob (không phải người que)')

b26 = B(9, 'Second job,')
seg('d25', 'cat-giay', b25, b26, 'hoi-uc',
    'Ô ruộng quây tường đá, đất tối, luống khoai; bên kia tường đá là bãi cỏ có bò; sau lưng con bò một máng gỗ đầy khoai to',
    TRIP + ', ' + HA + '; bảng kẹp kẹp dưới nách, rồi cầm chĩa xới đất cao gấp đôi Wob; cuối đoạn giơ củ khoai bé', 'cat', 'cat', [
    N(b25 + 0.05, 'The potatoes go into the same walled plots, year after year.', 'Cùng một ô ruộng quây tường đá: ba lớp mùa khoai mọc rồi thu hiện chồng lên nhau ở cùng chỗ (cây non → cây xanh → luống trơ, lặp lại); Wob đứng ở góc ô nhìn', '', [], []),
    N(T(8, 'I was'), 'I was handed a fork.', 'Một bàn tay que chung (không người cụ thể) đưa cho Wob cái chĩa xới đất cao gấp đôi Wob; Wob lảo đảo theo cán chĩa', '', ['chia-xoi'], []),
    N(T(8, 'I dug'), 'I dug very carefully.', 'Wob xới từng nhát rất nhẹ, lưỡi chĩa run run', '', [], []),
    N(T(8, 'I lifted'), 'I lifted out one potato and held it up like a trophy.', 'Wob giơ một củ khoai bé xíu lên cao bằng hai tay như cúp vô địch; vệt sáng lấp lánh quanh củ khoai', '', ['khoai-tay'], ['ting']),
    N(T(8, 'A cow'), 'A cow on the other side of the wall looked at it. Then it went back to eating.', '[take-cham] Con bò ló đầu qua tường đá, nhìn củ khoai, nhìn Wob, nhai một cái, rồi cúi xuống ăn cỏ tiếp', 'Vệt sáng quanh củ khoai tắt phụt', ['bo'], []),
    N(T(8, 'Spare'), 'Spare potatoes end up as cattle feed. The cow had seen better trophies.', 'Lùi ra: sau lưng con bò là một máng đầy những củ khoai to hơn củ của Wob; Wob hạ cúp xuống chậm; giữ 0,8 s', 'Máng khoai to của bò', [], ['de-kem']),
    ], [], 'Việc 1 thử-hỏng: cắt giấy (bò, tường đá, máng). C29, C30')

b27 = B(9, 'But the boats')
seg('d26', 've-tay', b26, b27, 'hoi-uc',
    'Vẽ tay: huy hiệu khiên xanh trắng, hai con tôm hùm gai đứng hai bên (vẽ phác, không khẩu hiệu, không chữ); rồi một chiếc bánh chia năm phần',
    'Wob vẽ tay ở mép khung, áo mưa cam mũ trùm hạ, ba lô nhỏ, bảng kẹp (đánh dấu ô 2 ở đầu đoạn)', 'cat', 'cat', [
    N(b26, 'Second job, lobster. Tristan rock lobster is what the island lives on.', 'Wob chỉ vào ô tôm hùm trên bảng kẹp; một con tôm hùm gai vẽ tay bò ngang khung', '', ['bang-kep'], []),
    N(T(9, 'There are'), 'There are even two lobsters on the coat of arms.', 'Huy hiệu vẽ tay: hai con tôm hùm đứng hai bên khiên như lính gác', 'Một con tôm hùm khẽ đổi chân, đứng nghiêm lại khi thấy Wob nhìn', [], []),
    N(T(9, 'The fishery'), "The fishery brings in roughly four-fifths of the territory's revenue, according to the Marine Stewardship Council.", 'Chiếc bánh vẽ tay chia năm phần, bốn phần lần lượt hiện hình tôm hùm, một phần trống (KHÔNG chữ, không số: mức C, lời đã rào); Wob đưa tay định lấy miếng trống, rụt lại', '', [], ['pop']),
    ], [], 'Thông tin kinh tế bằng hình vẽ tay + gag nhỏ: vẽ tay. C31, C32 (mức C: không ghi số trên hình)')

b28 = B(9, 'Each little')
seg('d27', 've-tay', b27, b28, 'hoi-uc',
    'Vẽ tay: bến nhỏ có thuyền máy kéo lên dốc, sóng to; phòng ngủ nhỏ có đồng hồ báo thức giấy; tờ mờ sáng, ' + BINH + '; vòng sóng âm vẽ tay lan khắp làng',
    'Nhịp sóng/đồng hồ: Wob áo mưa cam. Nhịp ngủ: Wob trong chăn, áo mưa treo móc, ba lô nhỏ dưới giường. Nhịp "sitting up in my boots": Wob MẶC áo mưa, mũ trùm LÊN, giày đỏ, ôm ba lô nhỏ trước ngực', 'cat', 'cat', [
    N(b27, 'But the boats only go out when the sea allows, and estimates of how many days that adds up to vary a lot.', 'Thuyền máy nằm trên dốc bến, sóng to đập vào; Wob đẩy thử thuyền, sóng hất ngược; một tờ lịch giấy có nhiều ô dấu ? (không số)', '', [], ['song']),
    N(T(9, 'So the'), "So the alarm clock here isn't a clock.", 'Đồng hồ báo thức giấy trên đầu giường Wob, kim đứng yên, có mạng nhện nhỏ (không chữ, không số)', '', ['dong-ho-bao-thuc'], []),
    N(T(9, 'Early'), 'Early in the morning, if the sky looks right, someone takes a hammer to an old oxygen bottle.', 'Tờ mờ sáng ở bến: một ' + NGUOI + ' ngước nhìn trời rồi cầm búa gõ vào bình ôxy treo trên giá gỗ; vòng sóng âm vẽ tay lan ra khắp mái nhà', '', ['binh-oxy'], ['ting']),
    N(T(9, "That's the"), "That's the fishing gong.", 'Cận bình ôxy còn rung; vòng sóng âm thứ hai', '', ['binh-oxy'], []),
    N(T(9, 'I slept'), 'I slept through it. I slept through it again.', 'Wob ngủ ngáy trong chăn, bong bóng z bay ra; sóng âm lướt qua đầu không chạm, hai lần (lần hai sóng âm vòng né qua đầu Wob)', '', [], ['ting']),
    N(T(9, 'On the next'), 'On the next calm morning, I slept sitting up in my boots, right next to the bottle.', 'Wob ngồi ngủ dựa vào giá treo bình ôxy, áo mưa, mũ trùm lên, giày đỏ, ba lô nhỏ ôm trước ngực', 'Búa gõ "boong": cả người Wob rung bần bật như chuông, mắt mở trừng, còn rung thêm hai giây sau khi tiếng đã tắt', ['binh-oxy', 'ba-lo-nho'], ['ting', 'boing']),
    ], ['?'], 'Gag ngủ quên tiếng cồng, biểu cảm to: vẽ tay. C33 (lời đã rào, hình chỉ dấu ?), C34. Mô-típ CỒNG được gọi lại ở outro "slept through the gong" (d50). GHI CHO THỢ: sổ sfx chưa có tiếng cồng, tạm dùng ting')

b29 = B(10, 'Think of a')
seg('d28', 'cat-giay', b28, b29, 'hoi-uc',
    'Thuyền máy nhỏ trên sóng xám, tời quay kéo bẫy tôm lên, thùng hàng ở đuôi thuyền; rồi lên bờ: dãy nhà mái thấp, trước mỗi cửa hai con bò, bãi cỏ trước nhà',
    'Trên thuyền: ' + TRIP + ', ' + LEN + ', ba lô nhỏ trên lưng, ôm ' + DAY + '. Lên bờ: ' + HA + ', bảng kẹp', 'cat', 'chen', [
    N(b28 + 0.05, 'Each little boat carries two fishermen, who haul up their traps with a winch.', '[tien-canh-khung] Mạn thuyền làm tiền cảnh: hai ngư dân (' + NGUOI + ') quay tời kéo bẫy tôm lên; Wob ở đuôi thuyền', '', ['toi', 'bay-tom'], ['song']),
    N(T(9, 'I mostly'), 'I mostly held a rope and tried not to become cargo.', 'Wob ôm cuộn dây thừng ở đuôi thuyền', 'Một bàn tay que nhấc nhầm Wob bỏ vào thùng hàng cùng bẫy tôm; Wob lặng lẽ trèo ra, phủi người, cầm lại cuộn dây (mô-típ "hold a rope and not become cargo", gọi lại ở d50)', ['day-thung', 'thung-hang'], ['bonk']),
    N(START[10], 'Third job. I asked for a cow.', 'Lên bờ: Wob giơ bảng kẹp, chỉ vào ô con bò, mặt hi vọng (hao-hung)', '', ['bang-kep'], []),
    N(T(10, 'The island'), "The island keeps it to one breeding cow per household, so the grass doesn't get eaten bare.", 'Dãy nhà mái thấp, trước mỗi cửa có hai con bò; đúng "one" ở mỗi cửa một con lặng lẽ bước ra khỏi khung, còn đúng một con; bãi cỏ trước nhà đang trụi dần xanh lại', '', ['bo'], []),
    ], [], 'Việc 2 trên thuyền + việc 3 hỏi bò: cắt giấy. C35, C36')

b30 = B(10, "I don't have")
seg('d29', 've-tay', b29, b30, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: nồi súp lớn giữa bàn dài, mỗi người que cầm một cái muôi y hệt nhau',
    'Wob vẽ tay trong bong bóng, áo mưa cam mũ trùm hạ', 'chen', 'cat', [
    N(b29, 'Think of a shared kitchen where everyone gets the same ladle, so nobody empties the pot.', '[bong-bong-tuong-tuong] Người que múc súp lần lượt bằng những cái muôi y hệt nhau', 'Wob lén cầm cái muôi to gấp đôi; cái muôi tự co lại bằng cỡ của mọi người', ['muoi-mui'], ['whoosh', 'pop']),
    ], [], 'So sánh đời thường dạng giả định: vẽ tay chèn')

b31 = G(10)
seg('d30', 'cat-giay', b30, b31, 'hoi-uc',
    'Bãi cỏ trước nhà, con bò; con đường dọc các bức tường đá về làng; trang sổ của Wob (DaoCu.sketchbook + sketchIcon); hoàng hôn hồng trên các ô ruộng, núi lửa hồng',
    TRIP + ', ' + HA + '; bảng kẹp, rồi sổ du lịch; cuối đoạn ngồi trên tường đá', 'cat', 'giay', [
    N(b30 + 0.05, "I don't have a household on Tristan. So, no cow.", 'Wob đánh dấu X vào ô con bò trên bảng kẹp; giữ 0,6 s', '', ['bang-kep'], []),
    N(T(10, 'I patted'), "I patted somebody else's cow instead. It allowed this, briefly.", '[take-cham] Wob vỗ nhẹ lên lưng một con bò', 'Con bò đứng yên chịu đúng ba cái vỗ, rồi bước sang ngang một bước; tay Wob vỗ vào không khí', ['bo'], []),
    N(T(10, 'Walking'), "Walking back along the walls, I noticed that every rule I'd bumped into had the same shape.", '[di-bo-parallax] Wob đi về dọc các bức tường đá, mở sổ vừa đi vừa viết', '', ['so-du-lich'], []),
    N(T(10, 'The shared'), 'The shared land. The gong. The one cow.', 'Cận trang sổ: ba hình nhỏ hiện đúng ba chữ (ô ruộng tường đá, bình ôxy, một con bò), rồi một vòng tròn nét bút bao quanh hình hòn đảo nối ba hình', '', ['so-du-lich'], ['pop', 'pop', 'pop']),
    N(T(10, 'Each one,'), 'Each one, as far as I could tell, keeps the island from being used up.', 'Wob gõ đầu bút lên vòng tròn, gật chậm', '', [], []),
    N(T(10, 'On the'), "On the beach, I'd decided nobody picks this on purpose. Next to that cow, I wanted to pick it myself.", '[lui-ra-toan-canh] Hoàng hôn trên các ô ruộng: Wob ngồi trên bức tường đá cạnh con bò, nhìn núi lửa hồng, mỉm cười (WOB ĐỔI Ý lần 1); camera lùi chậm; phủ dần thành giấy', '', [], []),
    ], [], 'Hiểu ra quy luật chung + đổi ý: cắt giấy, hoàng hôn. C36 gọi lại')

# ================= CHƯƠNG 5 · A Penny, or Four Potatoes (cảnh 11) =================
b32 = B(11, 'In nineteen forty-six,')
seg('d31', 'cat-giay', b31, b32, 'hoi-uc',
    'Quầy bưu điện gỗ nhỏ (biển POST OFFICE trên cửa), cửa sổ bán tem; rồi CẬN CỰC GẦN con tem trên bưu thiếp; rồi một chồng thư buộc dây nằm trên mỏm đá, bóng một cánh buồm lướt qua chân trời',
    TRIP + ', ' + HA + '; cầm ' + BUU, 'giay', 'cat', [
    N(START[11], 'The day before my ship left, I went to the post office to send this postcard.', '[tien-canh-khung] Từ giấy phẳng: quầy bưu điện gỗ làm tiền cảnh; Wob kiễng chân đặt bưu thiếp lên quầy', '', ['buu-thiep'], ['lat-giay']),
    N(T(11, 'Start with'), 'Start with the stamp.', '[lao-vao-can-canh] Lao vào cận con tem trên bưu thiếp (tem ≥ 1/2 khung): tem nét mực đen trắng núi lửa + thuyền dài, dòng TRISTAN DA CUNHA đọc được ≥ 45 px; KHÔNG chim cánh cụt, KHÔNG mệnh giá', '', ['buu-thiep'], []),
    N(T(11, 'Tristan had'), 'Tristan had no stamps of its own until nineteen fifty-two.', 'Lui ra: Wob lật ngăn kéo tem trống trơn của quầy (vẽ kiểu cũ); thẻ 1952', '', [], []),
    N(T(11, 'Before that,'), 'Before that, letters waited for a passing ship.', 'Một chồng thư buộc dây nằm trên mỏm đá; bóng một cánh buồm lướt qua chân trời; Wob ngồi cạnh chồng thư chống cằm chờ cùng', '', ['chong-thu'], []),
    ], ['POST OFFICE', 'TRISTAN DA CUNHA', '1952'],
    'Mở chương phóng quy mô bằng con tem: cắt giấy (lao vào cận tem, rồi lùi dần ở d34). C37. Lệch y_hinh: cận tem làm bằng cắt giấy (y_hinh gợi diorama) vì đây là hồi ức và diorama giữ ≤ 20%')

b33 = B(11, 'In twenty fifteen,')
seg('d32', 'cat-giay', b32, b33, 'hoi-uc',
    'Trang lịch sử tông giấy cũ 1946: bàn gỗ, bút, lọ mực, đèn dầu, một người que ngồi viết (KHÔNG chân dung, không mặt); tờ tem nhỏ in ĐỎ; cân đĩa; chín mẫu tem vẽ tay đen trắng xếp ô 3×3; phong bì, lá đơn. Wob đứng ngoài mép trang',
    TRIP + ', ' + HA + '; cầm bưu thiếp', 'cat', 'cat', [
    N(b32 + 0.05, 'In nineteen forty-six, a man named Allan Crawford got to work on that.', 'Trang tông cũ: người que ngồi bên bàn gỗ với bút, lọ mực, đèn dầu (không vẽ chân dung); thẻ 1946; Wob ngoài mép trang nhón chân nhìn', '', [], []),
    N(T(11, 'First he'), 'First he had little local penny stamps printed, each with a penguin on it.', 'Một tờ tem nhỏ in màu ĐỎ trượt ra: mỗi ô một con chim cánh cụt (ĐÂY LÀ CHỖ DUY NHẤT CẢ TẬP có chim cánh cụt)', '', ['to-tem-do'], ['pop']),
    N(T(11, 'The value'), 'The value was four potatoes.', 'Cân đĩa: một con tem đỏ bên này, bốn củ khoai bên kia, cân thăng bằng; thẻ 1 penny = 4 potatoes', 'Bốn củ khoai đứng nghiêm thành hàng; một củ lăn lệch làm cân chao, củ đó lật đật bò về chỗ', ['can-dia', 'khoai-tay'], ['ting']),
    N(T(11, 'Then he'), 'Then he helped draw up a set of designs, priced in pence and potatoes, and sent them off with a petition for real postage stamps.', 'Chín mẫu tem vẽ tay ĐEN TRẮNG xếp ô 3×3 trên bàn (núi lửa, thuyền dài, nhà mái thấp…; KHÔNG chim cánh cụt, không mệnh giá đọc được), kẹp cùng một lá đơn rồi bỏ vào phong bì', '', ['chin-mau-tem', 'phong-bi'], []),
    N(T(11, 'The petition'), 'The petition was refused.', 'Phong bì quay về; một con dấu đỏ REFUSED giáng xuống lá đơn; chín mẫu tem nằm im; Wob ngoài mép trang cúi đầu (soc). Không gag', '', ['phong-bi'], ['bonk']),
    ], ['1946', '1 penny = 4 potatoes', 'REFUSED'],
    'Lịch sử con tem tông cũ: cắt giấy. C38, C39. GHI CHO THỢ (dung-cat-giay): tờ tem đỏ có chim cánh cụt là chỗ DUY NHẤT có chim cánh cụt; chín mẫu đen trắng không chim cánh cụt; không vẽ mặt Allan Crawford')

b34 = B(11, 'Now zoom')
seg('d33', 've-tay', b33, b34, 'hoi-uc',
    'Vẽ tay: chín mẫu tem trên giấy hoá thành chín con tem thật có răng cưa (vẫn nét mực đen trắng); bưu thiếp của Wob',
    'Wob vẽ tay to, áo mưa cam mũ trùm hạ, cầm bưu thiếp', 'cat', 'cat', [
    N(b33, 'In twenty fifteen, the island finally printed those designs as real stamps.', 'Nét mực sôi: chín mẫu vẽ tay lần lượt mọc răng cưa, thành chín con tem thật; thẻ 2015', '', ['chin-mau-tem'], ['pop']),
    N(T(11, 'The stamp on'), 'The stamp on my postcard comes from that set.', 'Wob giơ bưu thiếp: con tem trên đó khớp đúng một ô trong bộ chín, lắp vào như mảnh ghép "tách"; Wob ôm bưu thiếp vào ngực (hao-hung)', 'Tem khớp như mảnh ghép', ['buu-thiep'], ['ting']),
    ], ['2015', 'TRISTAN DA CUNHA'], 'Biến hình nét vẽ (mẫu → tem thật): vẽ tay. C40')

b35 = G(11)
seg('d34', 've-tay', b34, b35, 'hoi-uc',
    'Vẽ tay lùi dần (phong-quy-mo): con tem → quầy bưu điện → cả hòn đảo có thùng tôm hùm, xấp tem, tiền xu như hàng gửi đi → quả địa cầu giấy; rồi lại quầy; rồi boong tàu có túi thư',
    'Wob vẽ tay, áo mưa cam mũ trùm hạ, ba lô nhỏ; lấy bốn củ khoai từ túi hông ba lô (củ nhặt ở d15 là một trong bốn)', 'cat', 'giay', [
    N(b34, 'Now zoom out, from the stamp to the whole economy.', '[lui-ra-toan-canh] Từ con tem lùi ra quầy, ra bưu điện, ra cả hòn đảo; quanh đảo hiện thùng tôm hùm, xấp tem và tiền xu xếp như hàng gửi đi; Wob bé tí trên quầy', '', [], ['whoosh']),
    N(T(11, 'Stamps and'), 'Stamps and coins sold to collectors still bring foreign money in today.', 'Lùi tiếp: quả địa cầu giấy; từ nhiều nơi những bàn tay que chung cầm NHÍP GẮP TEM vươn về một chấm nhỏ giữa Nam Đại Tây Dương (không bản đồ chi tiết, không biên giới)', '', [], []),
    N(T(11, 'I paid'), 'I paid in coins. I did ask about potatoes.', 'Về quầy: Wob trả xu, rồi lôi bốn củ khoai từ túi hông ba lô đặt lên quầy, đẩy về phía cửa sổ bán tem', 'Bàn tay que sau quầy đẩy bốn củ khoai trả lại, từng củ một; củ cuối lăn xuống, Wob bắt kịp bằng miệng ba lô nhỏ', ['khoai-tay', 'tien-xu'], ['bonk']),
    N(T(11, 'One last'), 'One last zoom. My postcard left in a mail bag, on a ship,', 'Wob thả bưu thiếp vào túi thư vải, vẫy chào túi thư; túi thư được buộc lại, đặt lên boong tàu', '', ['tui-thu', 'buu-thiep'], []),
    N(T(11, 'via'), 'via Cape Town, taking the long way home.', 'Lùi lần cuối: túi thư vải (nhãn CAPE TOWN lóe lên) trên boong tàu, tàu nhỏ dần trên biển xám; phủ dần thành giấy', '', ['tui-thu'], []),
    ], ['CAPE TOWN'], 'Phóng quy mô tiếp bằng nét vẽ lùi dần: vẽ tay (đổi từ cắt giấy cho tỉ lệ ~25%). C42, C43. Lệch y_hinh: người sưu tầm cầm nhíp gắp tem thay kính lúp (kính lúp là đạo cụ gag tập 2)')

# ================= CHƯƠNG 6 · October 1961 (cảnh 12–13) · LỊCH SỬ NGHIÊM, KHÔNG GAG =================
b36 = B(12, 'By the tenth,')
seg('d35', 'cat-giay', b35, b36, 'hoi-uc',
    'Tông giấy TRẦM (xám xanh, nâu đất): rìa đông làng nơi cỏ xanh dừng và bãi đá dung nham đen sần sùi bắt đầu, nhà mái thấp ngay sau lưng; rồi trang lịch sử 1961: bậu cửa sổ có cốc nước, tấm lịch tháng Tám; vết nứt giữa dãy mái nhà và nhà máy đồ hộp; đêm: chòi nhỏ giữa các ô ruộng tường đá, ánh đèn dầu',
    TRIP + ', ' + HA + '. ' + TRAM, 'giay', 'cat', [
    N(START[12], 'That afternoon, I walked to the eastern edge of the village, where the ground suddenly turns dark and rough.', '[dat-ky-vat-xuong] Từ giấy phẳng: Wob đứng lặng ở nơi cỏ xanh dừng lại và bãi đá dung nham đen bắt đầu; camera đẩy rất chậm; im lặng', '', [], []),
    N(T(12, 'From August'), 'From August nineteen sixty-one, the island kept shaking.', 'Trang 1961: cốc nước trên bậu cửa sổ gợn từng vòng; tấm lịch AUGUST 1961 treo lệch dần; Wob đứng ngoài mép trang', '', [], []),
    N(T(12, 'On the eighth'), 'On the eighth of October, a big tremor brought rock down east of the village.', 'Vài tảng đá giấy lăn xuống sườn phía đông làng, bụi bốc nhẹ; thẻ 8 Oct 1961', '', [], []),
    N(T(12, 'The next morning,'), 'The next morning, a crack opened between the houses and the fish cannery, and the ground swelled.', 'Sáng: một vết nứt chạy giữa dãy mái nhà và toà nhà máy đồ hộp; mặt đất phồng lên chậm', '', [], []),
    N(T(12, 'That night,'), 'That night, everyone was sent out to the huts at the Potato Patches.', 'Đêm: những chòi nhỏ giữa các ô ruộng tường đá, ánh đèn dầu le lói qua khe cửa; làng tối om phía xa', '', [], []),
    ], ['AUGUST 1961', '8 Oct 1961'],
    'Lịch sử nặng: cắt giấy tông trầm, KHÔNG gag, KHÔNG sfx, Wob mặt trầm (luật). C44–C47')

b37 = G(12)
seg('d36', 'cat-giay', b36, b37, 'hoi-uc',
    'Tông trầm: hình nón nhỏ mới mọc sát rìa làng, khói xám; hai tàu cá nhỏ rời bến trong ánh chiều, đảo Nightingale nhô lên phía xa; tàu khách lớn dừng ngoài khơi, xuồng chở người; boong tàu có chiếc va li nhỏ và bọc vải; làng vắng, nhà máy đổ nát dưới dòng dung nham đen phía đông',
    'Wob ngoài mép trang, ' + TRIP + ', ' + HA + '. ' + TRAM, 'cat', 'cat', [
    N(b36 + 0.05, 'By the tenth, it was a new volcano.', 'Hình nón nhỏ mới mọc sát rìa làng, khói xám bốc lên; im lặng, giữ hình', '', [], []),
    N(T(12, 'Two fishing'), 'Two fishing ships, the Tristania and the Frances Repetto, carried everyone to Nightingale Island for the night.', 'Hai tàu cá nhỏ chở đầy người que (không mặt) rời bến trong ánh chiều; một hòn đảo nhỏ khác nhô lên phía xa', '', [], []),
    N(T(12, 'The next day,'), 'The next day, a passing Dutch liner picked them up.', 'Tàu khách lớn giấy dừng ngoài khơi; xuồng nhỏ chở người que đi lại giữa đảo và tàu', '', [], []),
    N(T(12, 'Two hundred'), 'Two hundred and sixty-four islanders went to Cape Town, and on to England.', 'Tàu khách nhỏ dần về phía chân trời; thẻ 264 islanders · Oct 1961', '', [], []),
    N(T(12, 'They took'), 'They took what they could carry.', 'Cận một chiếc va li nhỏ và một cái bọc vải trên boong tàu; không người, không gag', '', [], []),
    N(T(12, 'The lava'), 'The lava destroyed the cannery. Most of the houses survived, with nobody in them.', '[lui-cham-im-lang] Làng vắng: cửa đóng, không khói bếp, nhà máy đổ nát dưới dòng dung nham đen phía đông; camera lùi chậm, im lặng; Wob ngoài mép trang cúi đầu', '', [], []),
    ], ['264 islanders · Oct 1961'],
    'Lịch sử nặng: cắt giấy tông trầm, KHÔNG gag, KHÔNG sfx. C48–C51. Cuối đoạn cắt cứng về bàn (nhạc ngắt)')

b38 = B(13, 'In England,')
seg('d37', 'diorama', b37, b38, 'hien-tai',
    BAN + '; ĐÈN THẤP HƠN mọi lần, tông trầm; sổ đóng',
    NHA + '; cầm bưu thiếp rồi úp xuống bàn. ' + TRAM, 'cat', 'cat', [
    N(b37, 'Back home, I put the postcard face down for this part.', '[cat-cung-ve-hien-tai] Cắt cứng về bàn, không sfx; Wob úp bưu thiếp xuống bàn, ngồi xuống mép sổ, hai tay đặt lên lưng bưu thiếp; camera đẩy rất chậm', '', ['buu-thiep'], []),
    ], [], 'Cắt về hiện tại giữa chương nghiêm (ghi_chu_khung): diorama, KHÔNG gag, không sfx. Bưu thiếp úp xuống (khung hiện tại)')

b39 = B(13, 'By September,')
seg('d38', 'cat-giay', b38, b39, 'hoi-uc',
    'Trang sổ cắt giấy tông TRẦM (xám, xanh nhạt), Wob ở nhà đứng NGOÀI mép trang, tay lật mép trang như lật sách: dãy nhà một tầng giống nhau của trại cũ bên bờ nước xám, ống khói nhỏ; hàng móc áo lao động; tuyết rơi trên dãy nhà trại, cửa sổ đọng sương, ấm nước bốc hơi; lá thư đánh máy có dòng STAY gạch dưới; bản vẽ phác làng mái nhà còn nguyên, dòng dung nham dừng ở rìa đông',
    NHA + ' (không áo mưa, không ba lô). ' + TRAM + '; KHÔNG khẩu hình (Wob không nhìn người xem, chỉ lật trang)', 'cat', 'cat', [
    N(b38 + 0.05, 'In England, the islanders ended up at an old air force camp at Calshot, near Southampton,', '[lat-trang-so] Wob lật mép trang: dãy nhà một tầng giống nhau bên bờ nước xám, ống khói nhỏ; thẻ CALSHOT · Jan 1962', '', [], ['lat-giay']),
    N(T(13, 'from January'), 'from January nineteen sixty-two.', 'Camera lướt chậm dọc dãy nhà trại giống hệt nhau; khói mảnh bốc từ ống khói; Wob lật thêm một mép trang', '', [], []),
    N(T(13, 'They found'), 'They found work quickly. By the end of February, a hundred and thirteen of them had jobs.', 'Một hàng móc áo lao động treo kín lần lượt, mỗi móc một chiếc áo; thẻ 113', '', [], []),
    N(T(13, 'But they'), 'But they had little resistance to the flu going around, and the winter that followed was bitter.', 'Tuyết rơi trên dãy nhà trại; cửa sổ đọng sương; một ấm nước bốc hơi trên bếp; Wob đứng ngoài mép trang, tay ôm vai. KHÔNG gag, KHÔNG run cường điệu', '', [], []),
    N(T(13, 'In July'), 'In July nineteen sixty-two, the British government told Parliament the islanders should stay in England.', 'Một lá thư đánh máy đặt trên bàn gỗ, chỉ đọc được dòng STAY gạch dưới; Wob nhìn, không nói gì', '', [], []),
    N(T(13, 'Meanwhile,'), 'Meanwhile, a team of scientists visited the volcano and reported that most of the village was still there.', 'Wob lật trang: bản vẽ phác làng với các mái nhà còn nguyên, dòng dung nham dừng ở rìa đông; trang sáng lên một chút', '', [], ['lat-giay']),
    ], ['CALSHOT · Jan 1962', '113', 'STAY'],
    'Lịch sử nặng kể ở hiện tại: cắt giấy tông trầm (luật "đoạn lịch sử nặng: cat-giay"), Wob ở nhà lật trang (lop hoi-uc: trang lịch sử, không khẩu hình); diorama giữ ≤ 20%. Lệch y_hinh: các "trang sổ vẽ tay" của cảnh 13 dựng bằng cắt giấy tông trầm. Câu cúm/mùa đông KHÔNG gag. C52–C56')

b40 = B(14, 'Picture being')
seg('d39', 'diorama', b39, b40, 'hien-tai',
    'Như d37 nhưng đèn bàn sáng dần lên về mức thường; trên sổ một con tàu giấy nhỏ; rồi hộp phiếu gỗ nhỏ trên trang sổ, hai chồng phiếu',
    NHA + '; bưu thiếp úp trên bàn, Wob lật lên MỘT NỬA ở "back on Tristan"; rồi đặt hộp phiếu', 'cat', 'chen', [
    N(b39 + 0.05, 'By September, twelve islanders were back on Tristan to see it for themselves.', 'Wob đặt một con tàu giấy nhỏ lên trang sổ, mũi hướng về phía nam, đẩy nhẹ; rồi lật bưu thiếp lên lại một nửa (ngam-nghi); đèn bàn sáng dần', '', ['thuyen-giay', 'buu-thiep'], []),
    N(START[14], 'In December nineteen sixty-two, the islanders were given a ballot.', '[lat-trang-so] Wob lật sang trang sổ mới, đặt lên đó một hộp phiếu gỗ nhỏ; những lá phiếu gấp đôi (không chữ) rơi vào khe', '', ['hop-phieu', 'la-phieu'], ['lat-giay']),
    N(T(14, 'A hundred'), 'A hundred and forty-eight voted to go back. Five voted to stay.', '[lao-vao-can-canh] Hai chồng phiếu mọc lên: một chồng cao vút, một chồng lùn tịt; thẻ 148 to 5 hiện giữa hai chồng (≥ 45 px); Wob mắt mở to (soc)', '', ['la-phieu'], ['ting']),
    ], ['148 to 5'], 'Về bàn, mở chương bỏ phiếu: diorama. C57, C58')

b41 = B(14, 'I tried that')
seg('d40', 've-tay', b40, b41, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: chùm chìa khoá khổng lồ có móc hình xe buýt, cửa hàng, chữ thập bệnh viện (không chữ); một chiếc chìa nhỏ bằng sắt cũ treo trên móc hình núi lửa',
    'Wob vẽ tay trong bong bóng, đồ ở nhà; KHÔNG khẩu hình', 'chen', 'cat', [
    N(b40, 'Picture being handed the keys to a big city, with buses, shops and a doctor down the road.', '[bong-bong-tuong-tuong] Hình to: chùm chìa khoá khổng lồ được trao vào tay Wob, các móc khoá hình xe buýt, cửa hàng, chữ thập bệnh viện lần lượt lóe lên đúng chữ', '', ['chia-khoa'], ['whoosh', 'pop']),
    N(T(14, 'Now picture'), 'Now picture handing them back, and asking for the key to a small house beside a volcano that erupted the year before.', 'Wob đặt chùm chìa khoá to xuống, đổi lấy một chiếc chìa nhỏ bằng sắt cũ treo trên móc hình núi lửa; Wob cầm chìa nhỏ bằng hai tay, nhìn nó', '', ['chia-khoa'], []),
    ], [], 'So sánh đời thường (khuôn so-sanh-doi-thuong): vẽ tay chèn')

b42 = B(14, 'In April')
seg('d41', 'diorama', b41, b42, 'hien-tai',
    'Như d39 (bàn, đèn thường, hộp phiếu trên sổ)',
    NHA + '; tay không', 'cat', 'cat', [
    N(b41 + 0.05, 'I tried that vote on myself, about my own street. I like my street.', 'Wob đứng thẳng trên bàn, nhắm mắt ngẫm (ngam-nghi), tay phải đặt lên ngực', '', [], []),
    N(T(14, 'I raised'), 'I raised one hand. The other one stayed in my pocket.', '[leo-thang-ba-lan] Wob giơ một tay lên biểu quyết cho con phố nhà mình', 'Tay kia của Wob cứ thò lên nửa chừng rồi rụt về, ba lần; lần ba Wob dùng tay đang giơ ấn nó xuống (Wob không có túi: tay giấu ra sau lưng)', [], ['boing']),
    ], [], 'Gag tay ở bàn (khung hiện tại): diorama')

b43 = B(14, 'My best guess')
seg('d42', 'cat-giay', b42, b43, 'hoi-uc',
    'Trang sổ cắt giấy tông ấm dần (sau tông trầm của d38): hình hòn đảo và làng mái thấp; một con tàu giấy nhỏ cập đảo; rồi con tàu lớn hơn; khói bếp bốc lên lại từ từng mái nhà',
    'Wob ở nhà đứng ngoài mép trang lật trang (như d38), mặt dịu dần; KHÔNG khẩu hình', 'cat', 'cat', [
    N(b42 + 0.05, 'In April nineteen sixty-three, an advance party landed home first.', '[lat-trang-so] Wob lật trang: một con tàu giấy nhỏ cập vào hình hòn đảo, một nhóm nhỏ người que bước lên bờ (không ghi số); thẻ April 1963', '', [], ['lat-giay']),
    N(T(14, 'On the tenth'), 'On the tenth of November, the main group of a hundred and ninety-eight arrived.', 'Con tàu lớn hơn tới; khói bếp bốc lên lại lần lượt từ từng mái nhà trong làng; thẻ 198 · 10 Nov 1963; Wob mỉm cười nhẹ (tôn trọng, không gag)', '', [], []),
    ], ['April 1963', '198 · 10 Nov 1963'], 'Quay về 1963, khoảnh khắc lịch sử có cảm xúc: cắt giấy tông ấm dần, không gag. C59, C60')

b44 = G(14)
seg('d43', 'diorama', b43, b44, 'hien-tai',
    'Như d41; sổ mở trang hình hòn đảo vẽ tay',
    NHA + '; tay không', 'cat', 'cat', [
    N(b43 + 0.05, 'My best guess at why? England had more of almost everything.', 'Wob nhìn chùm chìa khoá giấy to (đạo cụ từ bong bóng d40, nay nằm trên bàn) rồi đẩy nó sang một bên', '', ['chia-khoa'], []),
    N(T(14, 'It didn\'t'), "It didn't have their land, shared between them, or their say in how it was run.", '[day-vao-cham] Wob đặt bàn tay lên hình hòn đảo trong sổ, nhìn xuống, gật nhẹ; camera đẩy chậm; giữ 0,6 s', '', ['so-du-lich'], []),
    ], [], 'Nhận định của Wob ở bàn: diorama')

# ================= CHƯƠNG 6 tiếp · sáng rời đảo ở bến Calshot (cảnh 15) =================
b45 = B(15, 'Think of a shop')
seg('d44', 'cat-giay', b44, b45, 'hoi-uc',
    'Bến cảng nhỏ xíu có đê chắn sóng bằng khối bê tông bốn chân, sóng xám đập vào, cọc buộc thuyền; tấm biển gỗ CALSHOT HARBOUR ở đầu bến; cửa bến hẹp',
    TRIP + ', ' + HA + '; ba lô nhỏ trên lưng', 'cat', 'chen', [
    N(b44, 'The next morning, I waited at the harbour for the small boat out to my ship.', '[tien-canh-khung] Khối bê tông bốn chân làm tiền cảnh; Wob ngồi trên cọc buộc thuyền, chân đung đưa, sóng xám đập vào đê', '', [], ['song']),
    N(T(15, 'It opened'), 'It opened in nineteen sixty-seven, a few years after the islanders came home.', 'Thẻ 1967 dán trên cọc; Wob nhìn ra cửa bến', '', [], []),
    N(T(15, 'They named'), 'They named it Calshot, after the village in England that took them in.', 'Tấm biển gỗ CALSHOT HARBOUR; Wob đọc, rồi đọc lại lần nữa, ngón tay dò theo chữ, rồi đặt tay lên ngực (hao-hung)', '', ['bien-calshot'], []),
    N(T(15, 'The entrance'), 'The entrance is about eleven metres wide, roughly thirty-six feet.', 'Wob dang hai tay đo cửa bến; thẻ 11 m · ~36 ft', 'Wob dang tay hết cỡ chỉ phủ được một mẩu nhỏ; Wob nằm ra đo tiếp bằng cả người, lăn từng vòng', [], ['boing']),
    N(T(15, 'And the'), 'And the island government reckons the weather lets boats in and out safely on only about seventy days a year.', 'Wob ngồi dậy; thẻ ~70 safe days a year; sóng lớn đánh tung bọt ở cửa bến', '', [], ['song']),
    ], ['CALSHOT HARBOUR', '1967', '11 m · ~36 ft', '~70 safe days a year'],
    'Bến nhiều lớp sóng: cắt giấy. C61, C62 (mức C: giữ ~70)')

b46 = B(15, 'While I waited,')
seg('d45', 've-tay', b45, b46, 'hoi-uc',
    'Bong bóng tưởng tượng vẽ tay: cửa hàng nhỏ có tấm biển hai mặt (mặt OPEN, mặt kia hình ổ khoá, không chữ) tự lật lung tung',
    'Wob vẽ tay cầm giỏ hàng, áo mưa cam mũ trùm hạ', 'chen', 'cat', [
    N(b45, 'Think of a shop that opens about one day in five, and never says which.', '[bong-bong-tuong-tuong] Tấm biển OPEN / ổ khoá tự lật lung tung; Wob đứng chờ trước cửa với giỏ hàng', 'Wob vừa với tay vào cửa thì biển lật sang ổ khoá; Wob rụt tay', ['gio-hang'], ['whoosh', 'bonk']),
    ], ['OPEN'], 'So sánh đời thường: vẽ tay chèn')

b47 = G(15)
seg('d46', 'cat-giay', b46, b47, 'hoi-uc',
    'Như d44 (bến, cọc); trang sổ của Wob (sketchbook); đêm: dãy mái nhà có bóng đèn; bậc bến và chiếc xuồng nhấp nhô',
    TRIP + ', ' + HA + ' tới "Then the boat came" thì kéo mũ trùm LÊN; sổ du lịch; ba lô nhỏ trên lưng', 'cat', 'cat', [
    N(b46 + 0.05, 'While I waited, I added up the rest.', 'Wob mở sổ trên đùi, đầu bút chạm trang', '', ['so-du-lich'], []),
    N(T(15, 'The hospital'), 'The hospital usually has two doctors, and serious cases go to Cape Town by sea.', 'Trang sổ: chữ thập y tế nhỏ trên hình hòn đảo, một đường nét đứt dài vắt sang mép trang về phía Cape Town; vẽ nghiêm túc, KHÔNG gag', '', ['so-du-lich'], []),
    N(T(15, 'In twenty'), "In twenty oh eight, the fish factory burned down and took the island's power station with it.", 'Đêm: bóng đèn trên các mái nhà tắt lần lượt; một ánh cam xa xa ở bến; KHÔNG vẽ lửa dữ, không gag; thẻ 2008', '', [], []),
    N(T(15, 'Full power'), 'Full power took about a month to come back.', 'Bóng đèn bật lại từng cái một rất chậm; Wob đếm theo trên sổ', '', [], []),
    N(T(15, 'My plan'), 'My plan to move here was losing pages.', 'Gió biển giật từng trang khỏi cuốn sổ của Wob', 'Các trang bay ra biển; một trang dán bẹp vào mặt Wob đúng lúc chiếc xuồng tới', ['so-du-lich'], ['lat-giay']),
    N(T(15, 'Then the'), "Then the boat came, and I almost didn't get in.", '[take-cham] Xuồng nhấp nhô ở bậc bến; Wob gỡ trang giấy khỏi mặt, kéo mũ trùm lên, một chân trên bậc, một chân lơ lửng trên xuồng, ngoái lại nhìn làng; giữ hình', '', [], ['song']),
    ], ['2008'], 'Cái giá của sự xa xôi + Wob đổi ý lần 2: cắt giấy. C63, C64; câu bệnh viện, cháy nhà máy không gag')

# ================= CHƯƠNG 8 · What the Postcard Says (cảnh 16) + đuôi (cảnh 17) =================
b48 = B(16, 'It says:')
seg('d47', 'cat-giay', b47, b48, 'hoi-uc',
    'Boong tàu rời đảo buổi sáng (cùng tàu cá d07–d09), lan can tiền cảnh; hòn đảo núi lửa nhỏ dần sau đuôi tàu, mây vẫn đội đỉnh',
    TRIP + ', ' + LEN + '; ba lô nhỏ đặt cạnh trên boong; cầm bưu thiếp + bút', 'cat', 'cat', [
    N(b47, 'So, the postcard.', '[tien-canh-khung] Lan can làm tiền cảnh: Wob ngồi trên boong, kê bưu thiếp lên ba lô nhỏ, bút trong tay', '', ['buu-thiep', 'ba-lo-nho'], []),
    N(T(16, 'I wrote'), "I wrote it on deck, with the island shrinking behind the ship, and I haven't read it since.", '[luot-smootherstep] Wob viết kín mặt bưu thiếp (nét nguệch ngoạc), thỉnh thoảng ngoái nhìn hòn đảo nhỏ dần sau đuôi tàu; viết xong úp bưu thiếp vào trong áo mưa', '', ['buu-thiep'], ['song']),
    ], [], 'Hồi ức khép vòng trên boong: cắt giấy, nối tiếp cảnh xuồng d46. Lệch y_hinh: y_hinh mở outro ở bàn rồi chèn boong; đảo thứ tự (boong trước, về bàn ở "It says:") để không đổi phong cách 3 lần trong 7 s')

b49 = B(16, 'The harbour opens')
seg('d48', 'diorama', b48, b49, 'hien-tai',
    BAN + ', sáng (đèn ấm thường); áo mưa cam trên móc tường, ba lô nhỏ dựa chân đèn; sổ mở có dãy chấm bút trên bàn (như d01); trên trang sổ hình cây phả hệ nhỏ của đảo (cành, lá, không chữ)',
    NHA + '; cầm bưu thiếp mặt viết quay về Wob; chiếc lá giấy nhỏ có mặt Wob', 'cat', 'chen', [
    N(b48 + 0.05, 'It says: Dear me. You can\'t move here.', '[lao-vao-can-canh] Cắt về bàn: Wob lật bưu thiếp sang mặt viết, camera cận: dòng đầu viết tay "Dear me," đọc được (≥ 45 px), các dòng sau nét nguệch ngoạc sáng lên khi Wob đọc tới', '', ['buu-thiep'], ['lat-giay']),
    N(T(16, 'Outsiders'), "Outsiders can't buy land, and you can't settle without family on the island. You asked anyway.", 'Trên trang sổ cạnh bưu thiếp: cây phả hệ nhỏ của đảo; Wob đặt một chiếc lá giấy mang mặt mình cạnh cây', 'Chiếc lá không dính vào cành nào, trượt xuống mặt bàn; Wob nhặt lên, thử dán lần nữa, lá lại rơi; Wob đặt nó nằm cạnh bưu thiếp', ['so-du-lich', 'la-giay'], []),
    ], ['Dear me,', 'TRISTAN DA CUNHA'], 'Outro ở bàn (khung hiện tại): diorama. C65. Wob đọc lá thư gửi chính mình (callback hook)')

b50 = B(16, 'Patient people')
seg('d49', 've-tay', b49, b50, 'hoi-uc',
    'Vẽ tay: những hình vẽ nguệch ngoạc bên lề bưu thiếp sống dậy, nét mực sôi: cửa bến nhỏ có con sóng; tàu nhỏ nối dài tới chữ thập bệnh viện; danh sách đi chợ dài và tờ lịch lật nhiều tháng',
    'Wob vẽ tay nhỏ, đồ ở nhà; KHÔNG khẩu hình (lop hoi-uc)', 'chen', 'cat', [
    N(b49, 'The harbour opens when the sea agrees.', '[chen-ve-tay] Hình to: cửa bến vẽ tay đóng chặt; một con sóng gật đầu thì cửa bến mới mở ra', 'Con sóng gật gù như người gác cổng', [], ['whoosh', 'song']),
    N(T(16, 'The big'), 'The big hospital is a week or so away by sea.', 'Một chữ thập bệnh viện ở mép xa; con tàu nhỏ bò từng nấc theo nét đứt dài, mặt trời mọc lặn vài lần trên đường; vẽ nghiêm, KHÔNG gag', '', [], []),
    N(T(16, 'Groceries'), 'Groceries get ordered months ahead.', 'Một danh sách đi chợ dài (nét nguệch ngoạc, không chữ) gấp lại bỏ vào phong bì; tờ lịch lật liền mấy tháng', 'Tờ lịch lật nhanh tới mức gió thổi tung danh sách', [], ['lat-giay']),
    ], [], 'Ba cái giá trong lá thư kể bằng hình vẽ tay bên lề bưu thiếp: vẽ tay chèn (giữ diorama ≤ 20%); câu bệnh viện không gag. C62, C66, C67')

t_wm = T(16, 'WOULD')
seg('d50', 'diorama', b50, DUOI_A, 'hien-tai',
    'Như d48 (bàn, đèn ấm); trang hộ chiếu (cùng mẫu thẻ d03: ' + HC + ') và con dấu cao su (api.conDauSVG) trên bàn; ngăn kéo bàn có ' + DAY + '; hình ' + BINH + ' vẽ nguệch ngoạc bên lề bưu thiếp',
    NHA + '; cầm bưu thiếp tới "I agree"; rồi con dấu; rồi cuộn dây thừng (cuối đoạn dây quấn Wob thành kiện hàng có nơ)', 'cat', 'cat', [
    N(b50 + 0.05, 'Patient people who like their neighbours do fine here. You are neither, yet.', 'Cận bưu thiếp, dòng chữ sáng lên khi Wob đọc; ở "neither, yet" Wob hạ bưu thiếp xuống nửa chừng, nhìn người xem, nhún vai', '', ['buu-thiep'], []),
    N(T(16, 'You slept'), 'You slept through the gong. Twice.', 'GỌI LẠI CỒNG: hình bình ôxy vẽ nguệch ngoạc bên lề bưu thiếp rung lên, vòng sóng âm mực lan ra; Wob nhăn mặt (dong-goi). Đúng "Twice." dòng chữ chạy tràn ra mép, Wob xoay bưu thiếp nghiêng 90 độ để đọc nốt phần viết dọc lề, giơ hai ngón tay ngượng ngùng', 'Wob xoay bưu thiếp 90 độ để đọc chữ viết dọc lề', ['buu-thiep'], ['ting']),
    N(T(16, 'You still'), 'You still want to live here. Love, me.', 'Dòng cuối "Love, me" đọc được (≥ 45 px); Wob mỉm cười với bưu thiếp', '', ['buu-thiep'], []),
    N(T(16, 'Reading'), 'Reading it at my desk, I agree with every word, including the part where they wouldn\'t have me.', 'Wob đặt bưu thiếp xuống (mặt tem lên), gật đầu chậm từng chữ', '', ['buu-thiep'], []),
    N(T(16, "It's their"), "It's their island, by family and by ballot.", 'Wob đặt chiếc lá giấy mặt mình cạnh hộp phiếu nhỏ, đứng nghiêm một nhịp', '', ['la-giay', 'hop-phieu'], []),
    N(T(16, "I'm stamping"), "I'm stamping it anyway.", 'Trang hộ chiếu lật trở lại GIỮA khung; Wob nhấc con dấu cao su, hà hơi vào mặt dấu', '', ['the-ho-chieu', 'con-dau'], ['lat-giay']),
    N(t_wm - 0.07, 'WOULD MOVE.', '[lao-vao-can-canh] Wob đóng dấu vào ô trống: dấu khung đôi nghiêng, chữ WOULD MOVE ≥ 120 px ép đúng bề rộng trong khung (cách ép như dấu NOPE tập 4), cả dấu nằm trọn vùng an toàn. Dấu to giữa khung GIỮ ≥ 3 s (tới ≈ ' + f'{t_wm + 3.2:.1f}' + ' s), rồi mới thu về trang hộ chiếu. Đúng một lần trong tập', '', ['the-ho-chieu', 'con-dau'], ['dau-wob']),
    N(T(16, 'become'), 'not become cargo, I\'m packed.', 'Dấu đã thu về. Wob lôi từ ngăn kéo ra cuộn dây thừng (cùng cuộn ở d28), quàng lên vai, đứng nghiêm', 'Đúng "packed" cuộn dây tự tuột ra, quấn Wob thành một kiện hàng gọn gàng có cả nơ (gọi lại "not become cargo")', ['day-thung'], ['boing']),
    N(T(16, 'What would'), 'What would you sail a week to get back to?', '[day-vao-cham] Wob (vẫn bị dây quấn thành kiện hàng) nghiêng người nhìn thẳng người xem, nhướng mày; camera đẩy chậm; giữ hình tới hết đoạn; nhạc hạ', '', ['day-thung'], []),
    ], ['Love, me', 'TRISTAN DA CUNHA', 'SOUTH ATLANTIC', 'Would Wob move here?', 'WOULD MOVE'],
    'Outro ở bàn (khung hiện tại, diorama): đọc lá thư → đồng ý từng chữ → RỒI MỚI đóng dấu (ghi_chu_khung, khác tập 4 đóng trước). Gọi lại cồng bình ôxy (d27) và dây thừng "not become cargo" (d28). GHI CHO THỢ (dung-diorama): tên nơi trên hộ chiếu hai dòng ≥ 72 px, dòng khác ≥ 54 px; WOULD MOVE ≥ 120 px ép bề rộng, giữ to ≥ 3 s; chữ viết tay chỉ "Dear me," và "Love, me" đọc được')

seg('d51', 'diorama', DUOI_A, END, 'duoi',
    'ĐUÔI TẬP theo skill mo-ket mục 2, dựng bằng templates/hoat-hinh/_chung/mo-ket/duoi-tap.js. Bàn kỷ vật (cùng bàn d01), đèn ấm. Bên trái (x 96–900): kệ gỗ giấy hai tầng: bình xịt còn niêm phong (binhXit, thẻ SANTA CRUZ / DEL ISLOTE), tờ lịch hầm còn băng dính (toLich, thẻ WHITTIER), lọ gần như không có opal (loOpal, thẻ COOBER PEDY), tủ đông nhỏ có cá (tuDong, thẻ OYMYAKON) cạnh kệ; BƯU THIẾP là kỷ vật MỚI (thêm khoá "buuThiep" vào VE của duoi-tap.js: chỉ thêm), đứng trên kệ, MẶT TEM QUAY RA, thẻ "TRISTAN" / "DA CUNHA" hai dòng. Thẻ kệ chữ ≥ 45 px. Bản đồ giấy trừu tượng trái dưới (x < 1100, không biên giới thật, không vùng Đông Nam Á), ghim KHÔNG nhãn. TẮT "mặt trời nhô" (ghimRung matTroi: false). Bên phải: vùng end screen để TRỐNG: endScreen {khung: [[1180,160],[1180,500]], vong: [1460,922]} (khung 560×315, vòng Ø200). CAMERA KHOÁ CỨNG cả đoạn',
    NHA + ' (bộ ở nhà như d48–d50; dây thừng đã gỡ, cuộn lại để trên bàn)', 'cat', 'cuoi-video', [
    N(DUOI_A, '', 'Khung đầu (cắt từ d50) đã đủ bàn, kệ, kỷ vật cũ; Wob cầm bưu thiếp. Hai khung và vòng giấy trống bật lên trong 0–1,2 s đầu đoạn (dt.endScreen) rồi ĐỨNG YÊN tuyệt đối tới khung cuối (≥ 18 s ổn định). Bên trong khung và vòng không vẽ gì, không chữ; sau giây 1,2 của đoạn toàn vùng x ≥ 1150 không vật chuyển động, không chữ', '', ['khung-anh-trong', 'vong-tron-trong'], ['pop']),
    N(START[17], "The postcard goes on the shelf, stamp out, beside the spray that's still sealed and the tunnel timetable.", 'Wob đặt bưu thiếp đứng lên kệ, MẶT TEM quay ra (dt.datLen), cạnh bình xịt (tem niêm phong nguyên) và tờ lịch hầm; thẻ TRISTAN / DA CUNHA dưới bưu thiếp', '', ['buu-thiep', 'binh-xit', 'to-lich-gio-ham'], []),
    N(T(17, 'The jar'), 'The jar of almost no opals rattles.', 'Lọ opal tự lắc lách cách một cái (dt.rung)', '', ['lo-opal'], []),
    N(T(17, 'The fish'), 'The fish keeps watch from the freezer.', 'Nắp tủ đông hé một khe, đôi mắt cá ló ra nhìn quanh như lính gác rồi nắp khép lại (KHÔNG vẫy đuôi như tập 4)', 'Cá canh gác từ tủ đông', ['tu-dong-nho', 'ca'], []),
    N(T(17, 'Somewhere'), 'Somewhere much colder, a town is moving out, house by house, away from the mine that feeds it.', 'CHỈ từ chữ "Somewhere": bản đồ giấy trừu tượng mở ra ở trái dưới; ghim đỏ mới (không nhãn) cắm vào vùng biển rộng phía nam (nơi vừa đi); từ ghim đó một dãy chấm bút nhỏ (GỌI LẠI dãy chấm cảnh 3) chạy lên tới một ghim trống KHÔNG nhãn rung ở vùng rất xa phía bắc, vài bông tuyết giấy rơi quanh; cạnh ghim một tháp giếng mỏ giấy tí hon và một dãy nhà giấy tí hon nhích từng căn sang ngang xa khỏi tháp. Wob run run (lanh-run). Không tên nơi, không số, không chữ', '', ['ban-do-giay', 'ghim'], ['drop', 'brr']),
    N(T(17, 'away'), '', 'Wob quay sang phải, chỉ tay về phía hai khung trống (bàn tay dừng ở x ≤ 1100), chớp mắt, đứng thở tới hết; nhạc nhỏ dần nhưng không tắt; không mờ đen', '', [], []),
    ], ['TRISTAN DA CUNHA', 'SANTA CRUZ DEL ISLOTE', 'WHITTIER', 'COOBER PEDY', 'OYMYAKON'],
    'Đuôi tập ở bàn kỷ vật = khung hiện tại, chỉ diorama (skill mo-ket). Đuôi 20,0 s: lời 16,1 s + 0,6 s trước + 3,3 s giữ sau lời; khung end screen đứng yên ≥ 18 s. Nhá tập 6 (thị trấn Bắc Cực tự dời đi) chỉ bằng hình: ghim trống phía bắc, tuyết, tháp mỏ, nhà nhích; không tên, không số. GHI CHO THỢ (dung-diorama): truyền `endScreen: {khung: [[1180,160],[1180,500]], vong: [1460,922]}` vào api.duoiTap; thêm khoá VE "buuThiep" (chỉ thêm); thẻ kệ ≥ 45 px hai dòng; tắt mặt trời trong ghimRung; vùng x ≥ 1150 đứng yên sau 1,2 s; camera khoá')

# ---------------- nhạc (chỉ bài có file trong music/ và dòng trong music/GIAY-PHEP.md) ----------------
NHAC = [
    {'src': 'music/wallpaper.mp3', 'bat_dau': 0.0, 'ket_thuc': b12, 'mood': 'to-mo'},
    {'src': 'music/inspired.mp3', 'bat_dau': b12, 'ket_thuc': b23, 'mood': 'to-mo'},
    {'src': 'music/sneaky-snitch.mp3', 'bat_dau': b23, 'ket_thuc': b31, 'mood': 'hai'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': b31, 'ket_thuc': b35, 'mood': 'to-mo'},
    {'src': 'music/lightless-dawn.mp3', 'bat_dau': round(b35 + 0.5, 3), 'ket_thuc': b37, 'mood': 'khac-nghiet'},   # ngắt đúng chỗ cắt cứng về bàn
    {'src': 'music/lightless-dawn.mp3', 'bat_dau': round(START[13] + 1.0, 3), 'ket_thuc': round(E(13) + 0.5, 3), 'mood': 'khac-nghiet'},
    {'src': 'music/inspired.mp3', 'bat_dau': round(START[14] - 0.3, 3), 'ket_thuc': b44, 'mood': 'to-mo'},
    {'src': 'music/wallpaper.mp3', 'bat_dau': b44, 'ket_thuc': b47, 'mood': 'to-mo'},
    {'src': 'music/inspired.mp3', 'bat_dau': b47, 'ket_thuc': END, 'mood': 'to-mo'},
]
for n in NHAC: n['bat_dau'] = round(n['bat_dau'], 3); n['ket_thuc'] = round(n['ket_thuc'], 3)

out = {
    '_ghi_chu': [
        'Tập 5 Tristan da Cunha, phân cảnh phối 3 phong cách (dao-dien-hoat-hinh), sinh bằng hoat-hinh/sinh-phan-canh.py từ audio/subtitles.json (17 cảnh, giọng Edge). Vòng 1, 28/11/2026.',
        'KHUNG XUẤT 2560×1440 (xuat); mọi toạ độ trong phân cảnh vẫn theo hệ thiết kế 1920×1080.',
        'THỨ TỰ KHUNG (ghi_chu_khung của script.json, khác tập 4): mở ở bàn với bưu thiếp vừa về (d01–d05: lời mở, lời chào, thẻ hộ chiếu ở chữ "Tristan da Cunha", lời hứa, manh mối hình) → chuyến đi (d06–d36) → cắt về bàn ở nửa sau chương 1961 và chương bỏ phiếu (d37–d43, bưu thiếp úp xuống ở d37, lật lên một nửa ở d39) → hồi ức sáng rời đảo ở bến (d44–d47, khép bằng cảnh viết bưu thiếp trên boong) → outro ở bàn: đọc to mặt sau bưu thiếp, đồng ý từng chữ, RỒI MỚI đóng dấu WOULD MOVE (d48–d50) → đuôi ở kệ (d51).',
        'KHOÁ TRANG PHỤC (chung 3 phong cách): chuyến đi = ' + TRIP + '. Mũ trùm: LÊN khi trên biển/gió (d07 boong, d09–d10, d27 nhịp ngồi ngủ cạnh bình, d28 trên thuyền, d46 cuối khi xuống xuồng, d47 boong); HẠ khi trên đảo, trong cabin. Áo mưa ướt bóng sau cú "met halfway" (d09) tới hết d10, khô dần d11. Ba lô nhỏ: trên lưng; tháo ra khi xếp đồ (d08), khi ngủ (d27: dưới giường; ngồi ngủ: ôm trước ngực), đặt cạnh trên boong (d47). Ở bàn (d01, d03, d05, d37, d39, d41, d43, d48, d50, d51): ' + NHA + '. Trong trang lịch sử kể ở hiện tại (d38, d42) Wob mặc đồ ở nhà, đứng ngoài mép trang lật trang.',
        'ĐẠO CỤ KHOÁ: ' + BUU + '. Con tem trên bưu thiếp KHÔNG có chim cánh cụt; tờ tem ĐỎ 1 penny có chim cánh cụt chỉ xuất hiện ở d32 (chỗ duy nhất cả tập). ' + BINH + ' (d27, d30 hình nhỏ trên sổ, d50 hình nguệch ngoạc bên lề bưu thiếp). ' + DAY + ' (d28 trên thuyền, d50 từ ngăn kéo). ' + CHI + ' (d03, d16). Chiếc mũ hai sừng đen phác, KHÔNG mặt, là hình DUY NHẤT của Napoleon và chỉ từ d16.',
        'MÔ-TÍP GỌI LẠI: (1) dãy chấm bút "one dot for every hour": trồng ở d01 (chấm tràn qua mặt bàn, chưa giải thích), giải ở d07, gọi lại ở d48 (chấm trên bàn) và d51 (dãy chấm trên bản đồ đuôi tới ghim tập sau); (2) cồng bình ôxy: d27 → d50 "slept through the gong"; (3) "hold a rope and not become cargo": d28 → d50 (dây quấn Wob thành kiện hàng); (4) củ khoai: d15 nhặt, cất ba lô → d34 bốn củ khoai ở quầy bưu điện; (5) thẻ hộ chiếu d03 → trang hộ chiếu đóng dấu d50.',
        'MANH MỐI TRƯỚC LỜI GIẢI (cảnh 6, d16): chỉ bằng hình: sợi chỉ kéo về phía bắc không tới đích (d03), hai bong bóng đoán sai (d05), chấm đảo phía bắc KHÔNG nhãn nháy một lần (d05), Wob nhìn về phía bắc (d15). KHÔNG chữ, hình Napoleon, St Helena, mũ, lính trước d16.',
        'ĐOẠN NGHIÊM (d35, d36 chương 1961; d37 bàn; d38 nước Anh, câu cúm/mùa đông): Wob mặt TRẦM, miệng thẳng, KHÔNG cười, KHÔNG gag, KHÔNG sfx (trừ tiếng lật trang d38); nhạc lightless-dawn lắng, ngắt ở chỗ cắt cứng về bàn (d37 lặng ~2 s). d42 (quay về 1963) tông ấm dần, không gag. Câu bệnh viện, cháy nhà máy (d46, d49) không gag.',
        'NGƯỜI DÂN: ' + NGUOI + '; gag luôn dồn vào Wob, đồ vật, con vật, con tàu (lệch y_hinh có chủ ý: người đứng lên hòn đá ở d21 và người cắm biển FOR SALE ở d24 đổi thành Wob). Không vẽ chân dung William Glass, Allan Crawford, Napoleon.',
        'BẢN ĐỒ: chỉ 3 bản đồ code trong assets/ (map-tristan d01/d03/d05, map-tristan-route d07, map-napoleon d16), dán lên trang sổ, nhãn do thợ đặt theo chu_tren_do_vat (SVG không có chữ). Chấm St Helena không nhãn ở d05 tính bằng cùng phép chiếu của map-tristan. Không ảnh AI (anh_ai rỗng): mọi phông vẽ bằng code. Bản đồ đuôi tập là giấy trừu tượng, không biên giới.',
        'LUẬT CHUNG · Đồ có mặt số (đồng hồ cabin, đồng hồ báo thức) chỉ có kim, vạch: KHÔNG chữ, KHÔNG số. Dấu "?" dùng làm hình (d12, d20, d27) đã ghi vào chu_tren_do_vat.',
        'CHỮ: chỉ chữ trong chu_tren_do_vat, ≥ 45 px hệ 1920 ở cỡ cảnh lúc chữ hiện (nhãn trên sổ chỉ hiện khi cận trang; chữ trên tem chỉ khi cận); không đặt chữ ở vùng logo x > 1500, y < 150. 20 s cuối (d51) không chữ ở x > 1150, y > 560.',
        'SFX chỉ chọn từ sfx/GIAY-PHEP.md. Sổ chưa có tiếng cồng kim loại: d27 và d50 tạm dùng ting (đề nghị thêm sfx "cong" bằng sfx/nguon/tao_sfx.py nếu phiên chính muốn). Nhạc chọn từ music/GIAY-PHEP.md (bài có file thật; calm-curiosity.mp3 có trong sổ nhưng chưa có file nên không dùng).',
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
for d in D:
    for n in d['nhip']:
        assert d['bat_dau'] - 0.001 <= n['tai'] < d['ket_thuc'], ('nhip ngoai doan', d['id'], n['tai'], n['loi'][:30])
    if d['vao'] == 'chen':
        assert 'whoosh' in d['nhip'][0]['sfx'], ('chen thieu whoosh', d['id'])
    if d['lop'] in ('hien-tai', 'duoi') and d['phong_cach'] != 'diorama':
        raise AssertionError(('khung hien tai khong phai diorama', d['id']))
sfx_so = set(re.findall(r'^\| ([a-z0-9-]+)\.wav', open('sfx/GIAY-PHEP.md', encoding='utf8').read(), re.M))
for d in D:
    for n in d['nhip']:
        for x in n['sfx']: assert x in sfx_so, ('sfx ngoai so', d['id'], x)
import os
for n in NHAC: assert os.path.exists(n['src']), ('thieu file nhac', n['src'])
# dấu WOULD MOVE đúng một lần
assert sum(1 for d in D for n in d['nhip'] if 'dau-wob' in n['sfx']) == 1
# thẻ hộ chiếu trước giây 40
assert t_tdc + 3.0 < 40
# không chữ Napoleon/St Helena trước d16
for d in D[:15]:
    for c in d['chu_tren_do_vat']: assert 'Helena' not in c and 'Napoleon' not in c, d['id']
json.dump(out, open(P + '/hoat-hinh/phan-canh.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
tong = {}
for d in D:
    tong.setdefault(d['phong_cach'], [0, []]); tong[d['phong_cach']][0] += d['ket_thuc'] - d['bat_dau']; tong[d['phong_cach']][1].append(d['id'])
print('so doan', len(D), 'thoi luong', END, 'loi canh 17 het o', E(17), 'the ho chieu', t_tdc, 'WOULD MOVE', t_wm)
for k, (s, ids) in tong.items(): print(k, round(s, 1), f'{100 * s / END:.1f}%', ' '.join(ids))
for d in D: print(d['id'], d['phong_cach'], d['bat_dau'], round(d['ket_thuc'] - d['bat_dau'], 2), d['vao'], d['ra'], len(d['nhip']))
the = [re.match(r'\[([a-z0-9-]+)\]', n['hanh_dong']) for d in D for n in d['nhip']]
the = [m.group(1) for m in the if m]
c = Counter(the); print('the', len(c), 'nhip co the', len(the), c.most_common(6))
ch = [d['bat_dau'] for a, d in zip(D, D[1:]) if a['phong_cach'] != d['phong_cach']]
for i in range(len(ch) - 2):
    if ch[i + 2] - ch[i] < 15: print('CANH BAO doi phong cach 3 lan trong 15 s quanh', ch[i])
run = [D[0]]
for d in D[1:] + [None]:
    if d is not None and d['phong_cach'] == run[-1]['phong_cach']: run.append(d)
    else:
        if run[-1]['ket_thuc'] - run[0]['bat_dau'] > 90: print('CANH BAO chuoi', run[0]['phong_cach'], run[0]['id'], run[-1]['id'])
        if d is not None: run = [d]
# khoảng dài nhất giữa hai nhịp liên tiếp (đổi hình 4–8 s)
tai = sorted([n['tai'] for d in D for n in d['nhip']] + [d['bat_dau'] for d in D])
gaps = sorted(((b - a, a) for a, b in zip(tai, tai[1:])), reverse=True)[:8]
print('khoang nhip dai nhat', [(round(g, 1), round(a, 1)) for g, a in gaps])
