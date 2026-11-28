/* d24 · vẽ tay (321,852–352,728 s; 30,876 s). Vào "cat", ra "cat". Hồi ức tháng 8, không khẩu hình.
 * Nhà thờ gỗ đỏ trên rơ-moóc hơn 200 bánh: Wob ngồi xổm sau dải băng rào giơ ống nhòm → camera MỘT MÌNH lao vào gầm (hàng bánh quay chậm,
 * người que cầm hộp điều khiển) → rơ-moóc đứng chờ: Wob đẩy thử từ phía sau, chân trượt tại chỗ đúng "tonnes." → sơ đồ nhìn từ trên: người que
 * trải thêm dải đường, thẻ 9 m → 24 m viết ở "nine metres", Wob vác dải cuối đặt vào ở "year" → Wob ngồi cạnh nón giao thông, bốn mùa quay vòng,
 * mặt trời mọc lặn hai lần ở "two days.", Wob phủi tuyết, giữ → ba lần vượt (Wob luôn ở NGOÀI dải băng rào): vượt ở "overtook", dừng, gõ chân chờ,
 * vượt lại ở "again."; hạt bồ công anh cũng vượt; đi lùi vẫn trôi lên trước; "Still too fast." Wob đứng yên nhìn thẳng người xem, nhà thờ nhích sau lưng.
 * Không chữ nào ngoài "9 m → 24 m". C27 không nhãn số tấn.
 */
window.CANH = function (VT, D) {
  var K = window.KB(VT, D), M = K.M, f = K.f, key = K.key, seg = K.seg, clamp = K.clamp, DUR = D.thoi_luong;
  var tu = function (w, n, e) { return VT.tu(w, n, e); };
  var T_WHEELS = tu("wheels."), T_TONNES = tu("tonnes."), T_NINE = tu("nine"), T_24 = tu("twenty-four,"), T_YEAR = tu("year,"),
    T_A = tu("A"), T_TWO = tu("two", 1), T_DAYS = tu("days."), T_DAYS_E = tu("days.", 0, "end"), T_SIMPLE = tu("simple."), T_WALK = tu("Walk"),
    T_OVER1 = tu("overtook"), T_STOP = tu("stopped."), T_WAIT = tu("waited."), T_OVER2 = tu("overtook", 1), T_AGAIN = tu("again."),
    T_SLOWER = tu("slower"), T_TRIED = tu("tried"), T_STILL = tu("Still"), T_FAST_E = tu("fast.", 0, "end");
  var WS = 0.5, GW = 1000;              // Wob đi trên lề cỏ (y chân) ngoài dải băng
  var DECK = 700, ROAD0 = 650, ROAD1 = 880, TAPE = 836;

  function nen(t, o) {
    o = o || {};
    var s = K.troiHe(o.sky) + K.doiXa(560, -80) + K.doiXa(610, 260, "#B5C9B0");
    for (var i = 0; i < 9; i++) s += K.bachDuong({ x: -700 + i * 470 + VT.hash(i * 3.3) * 140, y: ROAD0 + 6, s: 0.8 + VT.hash(i) * 0.25, col: o.la });
    s += K.rect(-1400, ROAD0, 3400, ROAD1, M.duong, { sw: 6, ox: 0, oy: 3 });
    for (var x = -1400; x < 3400; x += 160) s += VT.line("M " + x + " 768 L " + (x + 80) + " 768", 6, "#F3EEDF", 0.85);
    s += K.coDat(ROAD1 + 4) + K.coLa(-1300, 3300, 960, 1) + K.coLa(-1260, 3300, 1060, 7);
    return s;
  }
  function xeNhaTho(cx, t, quay, th) { return K.roMooc({ x: cx, y: DECK, w: 760, t: t, quay: quay }) + K.nhaTho({ x: cx, y: DECK, th: th || 0, L: 560 }); }
  function W(t, o) { var b = { s: WS, mua: "he", tuiChia: true, moc: "nha" }; for (var k in o) b[k] = o[k]; return K.wob(t, b); }

  // ---------- mốc, sfx ----------
  var B0 = 1.45, C0 = 3.95, D0 = 7.25, E0 = 13.55, F0 = 16.7, G0 = 20.05, H0 = 22.75, I0 = 25.05, J0 = 27.15, K0 = 28.85;
  VT.sfx("whoosh", B0, 0.35);
  var STRIPS = [[2, -1], [3, -1], [4, -1], [5, T_NINE - 1.0], [1, T_NINE - 0.35], [6, T_NINE + 0.45], [0, T_24 + 0.25], [7, T_YEAR]];
  STRIPS.forEach(function (s) { if (s[1] > 0) VT.sfx("pop", s[1] + 0.32, s[0] === 7 ? 0.55 : 0.35); });
  VT.sfx("whoosh", E0 + 0.25, 0.3);
  VT.sfx("ting", T_TWO, 0.35);
  VT.sfx("pop", T_DAYS_E + 0.02, 0.35);

  // vị trí chung đoạn đi bộ (F–K)
  function cxF(t) { return t < H0 ? 700 + 24 * (t - F0) : 1080 + 40 * (t - H0); }
  function wobX(t) {
    if (t < T_WALK) return 800;
    if (t < T_STOP) return 800 + 170 * (t - T_WALK);
    var xs = 800 + 170 * (T_STOP - T_WALK);
    if (t < T_OVER2) return xs;
    var xe = xs + 170 * Math.min(t - T_OVER2, 0.95);
    if (t < J0) return xe;
    return xe + 90 * (Math.min(t, K0) - J0);
  }

  return [
    // A · Wob ngồi xổm sau dải băng rào, ống nhòm; nhà thờ trên rơ-moóc lăn chậm
    { a: 0, b: B0, ten: "ong nhom sau rao", ve: function (t, lt, T) {
      var cx = 1270 + 30 * t, o = { x: 470, y: 1040, s: 0.64, legs: "tuck", bob: 22, flip: 1, armL: [160, 176], armR: [240, 176], handL: "nam", handR: "nam", noBlink: true, eyes: "closed", kinh: false,
        propFront: VT.binoculars({ x: 200, y: 156, s: 0.85, rot: -90 }) };
      var w = nen(t) + xeNhaTho(cx, t, 40) + K.nguoiQue({ x: cx - 470, y: 800, s: 0.95, phase: t * 0.55, remote: true, hat: true }) + K.bangRao(-600, 2600, TAPE, t) + W(t, o);
      return { cam: [960, 560, key(T, [[0, 1.0], [B0, 1.035, "sine"]])], world: w };
    } },
    // B · camera một mình lao vào gầm: hàng hàng bánh nhỏ quay rất chậm, người que đi bên cạnh
    { a: B0, b: C0, ten: "gam ro mooc", ve: function (t, lt, T) {
      var a = t * 22, s = "";
      s += '<rect x="-400" y="-400" width="2720" height="1880" fill="#EFE6CF"/>';
      s += K.rect(-400, 520, 2320, 900, "#DCE7E0", { sw: 0, ox: 0, oy: 0 }); // khe sáng phía xa
      s += K.coDat(560, "#B7CC9A");
      s += K.rect(-400, 640, 2320, 1500, M.duong, { sw: 6, ox: 0, oy: 4 });
      [[540, 40, 150, "#5b6468", 0.6], [640, 58, 210, "#3f474b", 0.8], [790, 84, 270, "#2b3134", 1]].forEach(function (row, ri) {
        var y = row[0], r = row[1], gap = row[2];
        s += VT.line("M -400 " + f(y) + " L 2320 " + f(y), r * 0.35, "#262b2e", row[4]);
        for (var x = -300 + ri * gap * 0.37; x < 2300; x += gap) {
          s += VT.g("translate(" + f(x) + " " + f(y) + ") rotate(" + f(a + x * 0.1) + ")", '<circle cx="0" cy="0" r="' + r + '" fill="' + row[3] + '" stroke="#1f2326" stroke-width="' + f(4 + ri * 2) + '"/>' +
            '<circle cx="0" cy="0" r="' + f(r * 0.4) + '" fill="#8C969B" stroke="#1f2326" stroke-width="3"/>' + VT.line("M 0 " + f(-r * 0.4) + " L 0 " + f(-r * 0.85), 5 + ri * 2, "#8C969B"));
        }
      });
      s += K.rect(-400, -400, 2320, 330, "#3a4044", { sw: 7, ox: 0, oy: 6 });
      for (var bx = -300; bx < 2300; bx += 260) s += K.rect(bx, 300, bx + 60, 470, "#2f3538", { sw: 5, ox: 2, oy: 2 });
      s += VT.line("M -400 400 L 2320 400", 18, "#2f3538") + VT.line("M -400 400 L 2320 400", 4, "#1f2326", 0.6);
      // người que đi bên cạnh (chỉ thấy chân và hộp điều khiển)
      var ph = t * 0.55 * 2 * Math.PI, sw = Math.sin(ph) * 60, px = 1560 + (t - B0) * 18;
      s += VT.line("M " + f(px) + " 360 L " + f(px - sw) + " 1000", 16) + VT.line("M " + f(px) + " 360 L " + f(px + sw) + " 1000", 16);
      s += VT.ell(px - sw + 18, 1004, 34, 12, "#2b3134", 4) + VT.ell(px + sw + 18, 1004, 34, 12, "#2b3134", 4);
      s += VT.line("M " + f(px) + " 200 L " + f(px - 60) + " 420", 16) + K.rect(px - 120, 400, px - 30, 470, "#3c4448", { sw: 5, ox: 2, oy: 2 }) + VT.line("M " + f(px - 44) + " 400 L " + f(px - 30) + " 330", 6) + VT.dot(px - 30, 326, 8, "#E04A3A") + VT.dot(px - 96, 430, 7, M.vang);
      var z = key(T, [[B0, 1.32], [B0 + 0.32, 1.0, "out"], [C0, 1.05, "sine"]]);
      return { cam: [960, 560, z], world: s, tint: "warm" };
    } },
    // C · rơ-moóc đứng chờ: Wob đẩy thử từ phía sau, chân trượt tại chỗ đúng "tonnes."
    { a: C0, b: D0, ten: "day thu", ve: function (t, lt, T) {
      var cx = 1150, rear = cx - 380, slip = t >= T_TONNES - 0.05 && t < T_TONNES + 0.5, push = t >= C0 + 0.55 && t < T_TONNES + 0.5;
      var wx = key(t, [[C0, rear - 420], [C0 + 0.5, rear - 128, "out"]]), lean = push ? (slip ? 30 : 22) : (t > T_TONNES + 0.5 ? 6 : 4);
      var o = { x: wx, y: 792, s: 0.56, flip: 1, lean: lean, eyes: push ? (slip ? "squint" : "open") : "open", brows: push ? "worried" : (t > T_TONNES + 0.5 ? "up" : "flat"),
        mouth: slip ? "chatter" : (push ? "wobbly" : "flat"), px: t > T_TONNES + 0.5 ? 6 : 8, py: t > T_TONNES + 0.5 ? -10 : 0, marks: slip ? "sweat" : "" };
      if (t < C0 + 0.5) { o.legs = "walk"; o.phase = (t - C0) * 2.4; o.stride = 30; }
      else if (push) { o.legs = "walk"; o.phase = slip ? (t - C0) * 7 : (t - C0) * 0.9; o.stride = slip ? 46 : 14; o.autoWalk = false; }
      if (push) { o.armR = VT.wobLocal(o, rear + 2, DECK + 6); o.armL = VT.wobLocal(o, rear + 2, DECK - 30); o.handL = "xoe"; o.handR = "xoe"; }
      var w = nen(t) + xeNhaTho(cx, t, 0) + K.nguoiQue({ x: cx + 470, y: 800, s: 0.95, remote: true, hat: true });
      if (slip) for (var i = 0; i < 3; i++) { var kk = ((t - T_TONNES) * 3 + i / 3) % 1; w += VT.puff({ x: wx - 60 - kk * 90, y: 794 - kk * 20, s: 0.35 + kk * 0.4, op: 0.8 - kk * 0.6, fill: "#E9E2D0" }); }
      w += W(t, o);
      var cam = [key(T, [[C0, rear - 60], [D0, rear - 40, "sine"]]), key(T, [[C0, 600], [D0, 610]]), key(T, [[C0, 1.34], [T_TONNES - 0.2, 1.4, "sine"], [T_TONNES, 1.46, "out"], [D0, 1.48]])];
      return { cam: cam, world: w, shake: slip ? VT.shake(T, T_TONNES, 0.25, 4) : [0, 0] };
    } },
    // D · sơ đồ nhìn từ trên: người que trải thêm dải đường; thẻ 9 m → 24 m; Wob vác dải cuối đặt vào
    { a: D0, b: E0, ten: "noi rong duong", ve: function (t, lt, T) {
      var s = '<rect x="-400" y="-400" width="2720" height="1880" fill="#A9C487"/>';
      for (var g = 0; g < 40; g++) s += VT.line("M " + f(VT.hash(g * 3.1) * 2000 - 40) + " " + f(VT.hash(g * 7.3) * 1080) + " l -5 -14 m 9 14 l 5 -12", 3, M.coToi, 0.7);
      var top = 300, H = 66, n = 0, wobS = "";
      STRIPS.forEach(function (st, si) {
        var i = st[0], t0 = st[1], y = top + i * H, k = t0 < 0 ? 1 : seg(t, t0, t0 + 0.4);
        if (k <= 0 && !(i === 7 && t > T_YEAR - 0.9)) return;
        var from = (si % 2 ? -1 : 1), dx = (1 - VT.ease.out(k)) * 2200 * from;
        if (i === 7) {
          // Wob vác dải cuối vào từ trái (dải trên đầu), thả vào đúng "year"
          var tA = T_YEAR - 0.9;
          if (t < tA) return;
          var wx = key(t, [[tA, 260], [T_YEAR - 0.05, 960, "lin"]]), down = seg(t, T_YEAR - 0.05, T_YEAR + 0.12), lift = (1 - VT.ease.in2(down)) * 130;
          var sx0 = wx - 1220, sx1 = wx + 1220;
          s += K.rect(sx0, y + 4 - lift, sx1, y + H - lift, "#8F9496", { sw: 5, ox: 4, oy: 5 }) + VT.line("M " + f(sx0 + 30) + " " + f(y + H / 2 - lift) + " L " + f(sx1 - 30) + " " + f(y + H / 2 - lift), 4, "#F3EEDF", 0.7);
          var wk = VT.buoc(t, { t0: tA, t1: T_YEAR - 0.05, x0: 260, x1: 960, chuKy: 0.42, s: 0.5 }), carry = t < T_YEAR + 0.1;
          var wo = { x: wx, y: y + H + 132, s: 0.5, flip: 1, legs: t < T_YEAR - 0.05 ? "walk" : "stand", phase: wk.phase, stride: wk.stride,
            sq: t < T_YEAR - 0.05 ? 0.95 : key(t, [[T_YEAR, 0.9], [T_YEAR + 0.25, 1, "back"]]), mouth: t < T_YEAR ? "wobbly" : "content", brows: t < T_YEAR ? "worried" : "flat" };
          if (carry) { wo.armL = VT.wobLocal(wo, wx - 70, y + H - lift); wo.armR = VT.wobLocal(wo, wx + 70, y + H - lift); wo.handL = "xoe"; wo.handR = "xoe"; }
          if (t > T_YEAR + 0.35) { var cl = Math.sin((t - T_YEAR) * 22) * 18; wo.armL = [172 + cl, 250]; wo.armR = [228 - cl, 250]; }
          wobS = W(t, wo);
          if (down > 0 && t < T_YEAR + 0.45) wobS += VT.puffBurst({ x: wx + 300, y: y + H + 6, k: seg(t, T_YEAR + 0.05, T_YEAR + 0.45), s: 0.7, spread: 120 }) + VT.puffBurst({ x: wx - 400, y: y + H + 6, k: seg(t, T_YEAR + 0.05, T_YEAR + 0.45), s: 0.6, spread: 110 });
          return;
        }
        n++;
        s += K.rect(-260 + dx, y + 4, 2180 + dx, y + H, "#8F9496", { sw: 5, ox: 4, oy: 5 }) + VT.line("M " + f(-230 + dx) + " " + f(y + H / 2) + " L " + f(2150 + dx) + " " + f(y + H / 2), 4, "#F3EEDF", 0.7);
        if (t0 > 0 && k < 1) s += K.nguoiQue({ x: (from > 0 ? -220 : 2140) + dx, y: y + H + 4, s: 0.55, phase: t * 1.6, hat: true, arms: [[from > 0 ? 40 : -40, -150], [from > 0 ? 44 : -44, -140]] });
      });
      // người que công nhân đứng chờ hai bên mép, đổi chỗ theo dải
      s += K.nguoiQue({ x: 180, y: 270, s: 0.55, hat: true }) + K.nguoiQue({ x: 1390, y: 270, s: 0.55, hat: true, phase: 0.25 });
      // mũi tên đo bề rộng (không số)
      var stripsNow = STRIPS.filter(function (st) { return st[1] < 0 || t >= st[1] + 0.4; }).map(function (st) { return st[0]; });
      var mn = Math.min.apply(null, stripsNow), mx = Math.max.apply(null, stripsNow), y0 = top + mn * H + 8, y1 = top + (mx + 1) * H - 4;
      s += VT.line("M 1880 " + f(y0) + " L 1880 " + f(y1), 6) + VT.line("M 1864 " + f(y0 + 18) + " L 1880 " + f(y0) + " L 1896 " + f(y0 + 18), 6) + VT.line("M 1864 " + f(y1 - 18) + " L 1880 " + f(y1) + " L 1896 " + f(y1 - 18), 6);
      // thẻ gỗ cắm cọc: 9 m → 24 m viết dần từ "nine" tới "twenty-four"
      s += VT.line("M 860 210 L 860 296", 9, "#6A4A30") + K.rect(540, 118, 1180, 216, "#F6EEDC", { sw: 6, ox: 6, oy: 6 });
      s += VT.textWrite(860, 190, "9 m → 24 m", 66, key(t, [[T_NINE - 0.05, 0], [T_NINE + 0.6, 0.45], [T_24 - 0.02, 0.45], [T_24 + 0.35, 1]]), { fill: "#2c4f6e" });
      if (!wobS) {
        // Wob đứng sát mép dưới mặt đường, dang tay: tay trái sải ngang, tay phải vươn dài tới mép trên để đo bề rộng; dải mới tới thì nhảy lùi xuống
        var wy = top + 5 * H + 215, hop = 0;
        [5, 6].forEach(function (row) { var st = STRIPS.filter(function (q) { return q[0] === row; })[0], ta = st[1] + 0.4, kk = seg(t, ta - 0.3, ta);
          wy += H * VT.ease.io(kk); if (kk > 0 && kk < 1) hop = Math.sin(kk * Math.PI) * 40; });
        var mo = { x: 300, y: wy - hop, s: 0.5, flip: 1, legs: hop > 0 ? "tuck" : "apart", eyes: "open", py: -16, px: 6, brows: "worried", mouth: "flat" };
        var reach = VT.ease.out(seg(t, D0 + 0.15, D0 + 0.5));
        mo.armR = VT.wobLocal(mo, 330, VT.lerp(wy - 120, y0 + 6, reach)); mo.handR = "xoe";
        mo.armL = VT.wobLocal(mo, VT.lerp(250, 150, reach), wy - 125); mo.handL = "xoe";
        if (hop > 0 || (t > T_24 + 0.2 && t < T_24 + 0.9)) { mo.eyes = "wide"; mo.mouth = "o"; mo.brows = "up"; }
        s += W(t, mo);
      }
      s += wobS;
      // đẩy vào cận Wob đang sải tay đo (Wob ~35% chiều cao khung), lùi ra trước "twenty-four" để thấy trọn thẻ khi viết xong
      var P0 = T_NINE - 0.2, P1 = T_NINE + 0.5;
      return { cam: [key(T, [[D0, 520], [P0, 500, "sine"], [P1, 960, "io"]]), key(T, [[D0, 700], [P0, 690, "sine"], [P1, 560, "io"], [E0, 575, "sine"]]), key(T, [[D0, 1.9], [P0, 2.0, "sine"], [P1, 1.0, "io"], [E0, 1.06, "sine"]])], world: s };
    } },
    // E · Wob ngồi cạnh nón giao thông; bốn mùa quay vòng; mặt trời mọc lặn hai lần ở "two days."; phủi tuyết; giữ
    { a: E0, b: F0, ten: "bon mua", ve: function (t, lt, T) {
      var sit = E0 + 0.28, ss = [[E0 + 0.3, "dong"], [E0 + 0.6, "xuan"], [E0 + 0.9, "thu"], [E0 + 1.2, "dong"]];
      var mua = "he"; ss.forEach(function (q) { if (t >= q[0]) mua = q[1]; });
      var snow = mua === "dong" && t < T_DAYS_E + 0.02;
      var sky = mua === "dong" ? "#DCE6EC" : mua === "thu" ? "#E9DCC0" : M.troiHe, la = mua === "dong" ? "#E8EEF0" : mua === "thu" ? "#D98A3A" : mua === "xuan" ? "#A8CC72" : null;
      var nightK = 0;
      if (t >= T_TWO - 0.02 && t < T_DAYS_E) { var q = ((t - T_TWO) / ((T_DAYS_E - T_TWO) / 2)) % 1; nightK = q > 0.78 ? 1 : 0; }
      var s = K.troiHe(sky) + K.doiXa(560, -80) + K.doiXa(610, 260, "#B5C9B0");
      if (t >= T_TWO - 0.02 && t < T_DAYS_E) { var qq = ((t - T_TWO) / ((T_DAYS_E - T_TWO) / 2)) % 1; s += K.matTroi({ x: VT.lerp(260, 1720, qq), y: 600 - Math.sin(qq * Math.PI) * 330, s: 0.75, t: t }); }
      else if (mua !== "dong") s += K.matTroi({ x: 1500, y: 330, s: 0.6, t: t });
      for (var i = 0; i < 6; i++) s += K.bachDuong({ x: -300 + i * 470 + VT.hash(i * 3.3) * 120, y: ROAD0 + 6, s: 0.85, col: la });
      s += K.rect(-1400, ROAD0, 3400, ROAD1, M.duong, { sw: 6, ox: 0, oy: 3 }) + K.coDat(ROAD1 + 4, mua === "thu" ? "#B7B46A" : M.co);
      if (snow) s += VT.shape("M -1400 " + (ROAD1 - 6) + " C 0 " + (ROAD1 - 20) + " 1200 " + (ROAD1 + 4) + " 3400 " + (ROAD1 - 10) + " L 3400 2600 L -1400 2600 Z", "#FBFDFE", { sw: 6, ox: 0, oy: 4 }) + K.rect(-1400, ROAD0, 3400, ROAD1 - 6, "#EEF3F5", { sw: 0, ox: 0, oy: 0 });
      if (mua === "xuan") for (var fl = 0; fl < 26; fl++) { var fx = 300 + VT.hash(fl * 4.1) * 1400, fy = 920 + VT.hash(fl * 2.3) * 140; s += VT.line("M " + f(fx) + " " + f(fy) + " l 0 22", 3, M.coToi) + VT.ell(fx, fy, 9, 9, ["#F2C14E", "#F6EEDC", "#E58BA0"][fl % 3], 3); }
      if (mua === "thu") for (var lf = 0; lf < 16; lf++) { var lx = 200 + VT.hash(lf * 5.7) * 1500, ly = 300 + ((VT.hash(lf * 1.9) * 700 + (t - E0) * 900) % 760); s += VT.g("translate(" + f(lx) + " " + f(ly) + ") rotate(" + f(lf * 40 + t * 300) + ")", VT.shape("M 0 -12 C 10 -6 10 6 0 12 C -10 6 -10 -6 0 -12 Z", lf % 2 ? "#D98A3A" : "#C9463A", { sw: 3, ox: 1, oy: 1 })); }
      if (snow && t < T_TWO) s += VT.snowfall(t, 40, [-200, -100, 2100, 1100], 300);
      var o = { x: 860, y: 905 + 92 * 0.6, s: 0.6, flip: 1, legs: t < sit ? "stand" : "sit", sq: key(t, [[sit - 0.01, 1], [sit, 0.88], [sit + 0.25, 1, "back"]]), mouth: "flat", brows: "flat", lid: 0.25, noBlink: t > T_DAYS_E,
        snowhat: (snow || (mua === "dong" && t < T_DAYS_E + 0.3)) ? true : false };
      if (t < sit) { o.y = key(t, [[E0, 905], [sit, 905 + 92 * 0.6, "in2"]]); o.legs = "tuck"; }
      if (t >= T_TWO - 0.02 && t < T_DAYS_E) { o.px = key(t, [[T_TWO, -10], [T_DAYS_E, 10, "lin"]]); o.py = -10; o.eyes = "open"; }
      if (t >= T_DAYS_E - 0.05 && t < T_DAYS_E + 0.35) { var bb = Math.sin((t - T_DAYS_E) * 30) * 22; o.armR = [250 + bb, 36]; o.handR = "xoe"; o.snowhat = t < T_DAYS_E + 0.12; }
      var cone = K.nonGT({ x: 1120, y: 960, s: 1.3, tuyet: snow || (mua === "dong" && t < T_DAYS_E + 0.3) });
      s += cone + W(t, o);
      if (t >= T_DAYS_E + 0.06 && t < T_DAYS_E + 0.4) s += VT.puffBurst({ x: VT.wobPt(o, 200, 20)[0], y: VT.wobPt(o, 200, 20)[1], k: seg(t, T_DAYS_E + 0.06, T_DAYS_E + 0.4), s: 0.6, spread: 70 });
      var cam = [990, key(T, [[E0, 640], [T_TWO - 0.3, 640], [T_DAYS_E + 0.1, 680, "io"]]), key(T, [[E0, 1.2], [T_TWO - 0.3, 1.24, "sine"], [T_DAYS_E + 0.1, 1.42, "io"], [F0, 1.5, "sine"]])];
      return { cam: cam, world: s + (nightK ? '<rect x="-400" y="-400" width="2720" height="1880" fill="#1E2A44" opacity="0.55"/>' : ""), tint: snow ? "cold" : "warm" };
    } },
    // F–J · đi bộ cạnh nhà thờ (Wob luôn ở lề cỏ ngoài dải băng)
    { a: F0, b: G0, ten: "di canh nha tho", ve: function (t, lt, T) { return diBo(t, T, "F"); } },
    { a: G0, b: H0, ten: "vuot lan 1", ve: function (t, lt, T) { return diBo(t, T, "G"); } },
    { a: H0, b: I0, ten: "cho roi vuot lai", ve: function (t, lt, T) { return diBo(t, T, "H"); } },
    { a: I0, b: J0, ten: "bo cong anh", ve: function (t, lt, T) { return diBo(t, T, "I"); } },
    { a: J0, b: K0, ten: "di lui", ve: function (t, lt, T) { return diBo(t, T, "J"); } },
    { a: K0, b: DUR, ten: "still too fast", ve: function (t, lt, T) { return diBo(t, T, "K"); } },
  ];

  function diBo(t, T, sh) {
    var cx = cxF(t), x = wobX(t), s = nen(t), o = { x: x, y: GW, flip: 1, mouth: "content", brows: "flat" };
    // người que đi bộ cùng nhà thờ (mép đường phía xa), rồi nhà thờ, người cầm hộp điều khiển đi sau rơ-moóc
    s += K.nguoiQue({ x: cx + 520, y: 676, s: 0.7, phase: t * 0.45 + 0.3 }) + K.nguoiQue({ x: cx - 560, y: 680, s: 0.72, phase: t * 0.45 + 0.6, fill: "#E9DDC3" }) + K.nguoiQue({ x: cx + 700, y: 672, s: 0.68, phase: t * 0.45 + 0.1 });
    s += xeNhaTho(cx, t, 34) + K.nguoiQue({ x: cx - 470, y: 800, s: 0.92, phase: t * 0.45, remote: true, hat: true });
    s += K.bangRao(-600, 3000, TAPE, t);
    // tư thế Wob theo mốc
    var walking = (t >= T_WALK && t < T_STOP) || (t >= T_OVER2 && t < T_OVER2 + 0.95) || (t >= J0 && t < K0);
    if (walking) {
      o.legs = "walk";
      if (t < T_STOP) o.phase = (t - T_WALK) / 0.52; else if (t < J0) o.phase = (t - T_OVER2) / 0.52; else o.phase = -(t - J0) / 0.62;
      o.stride = t >= J0 ? 26 : 44;
    }
    if (t < T_WALK) { // chỉnh kính râm
      var adj = seg(t, T_SIMPLE - 0.35, T_SIMPLE + 0.1), back = seg(t, T_SIMPLE + 0.25, T_SIMPLE + 0.5);
      if (adj > 0 && back < 1) { o.armR = [VT.lerp(338, 262, adj * (1 - back)), VT.lerp(300, 138, adj * (1 - back))]; o.handR = "chi"; }
      o.mouth = adj > 0 ? "smirk" : "content";
    }
    if (t >= T_OVER1 && t < T_STOP) { o.px = t > T_OVER1 + 0.4 && t < T_OVER1 + 1.3 ? -12 : 6; o.mouth = t > T_OVER1 + 0.4 ? "o" : "content"; o.brows = t > T_OVER1 + 0.4 ? "up" : "flat"; }
    if (t >= T_STOP && t < T_OVER2) { // dừng, gõ chân chờ, khoanh tay
      o.sq = key(t, [[T_STOP, 0.9], [T_STOP + 0.2, 1, "back"]]); o.lean = key(t, [[T_STOP, -8], [T_STOP + 0.25, 0, "out"]]);
      if (t >= T_WAIT - 0.1) { o.armL = [252, 252]; o.armR = [148, 252]; o.legs = Math.floor((t - T_WAIT) * 6) % 2 ? "tiptoe" : "stand"; o.px = -12; o.brows = "skeptic"; o.mouth = "flat"; }
      else { o.px = -12; o.mouth = "flat"; }
    }
    if (t >= T_OVER2 && t < I0) { o.mouth = "content"; o.px = 8; }
    var seedX = 0, seedY = 0;
    if (t >= I0 && t < J0) {
      var ks = (t - I0) / (J0 - I0); seedX = VT.lerp(980, 1700, ks) + Math.sin(ks * 9) * 14; seedY = VT.lerp(450, 860, ks) + Math.sin(ks * 13) * 24;
      var hc = VT.wobPt(o, 200, 156); o.px = clamp((seedX - hc[0]) * 0.03, -12, 12); o.py = clamp((seedY - hc[1]) * 0.03, -10, 10); o.mouth = "oSmall"; o.brows = "up"; o.noBlink = true;
      s += K.boCongAnh({ x: seedX, y: seedY, s: 1.9, rot: Math.sin(ks * 7) * 15 });
    }
    if (t >= J0 && t < K0) { o.flip = -1; o.px = 10; o.brows = "worried"; o.mouth = "flat"; }
    if (t >= K0) { // đứng yên hẳn, nhìn thẳng người xem, tỉnh bơ
      o.px = 0; o.py = 2; o.lid = key(t, [[K0, 0], [T_STILL + 0.3, 0.42]]); o.brows = "flat"; o.mouth = "flat"; o.noBlink = true;
      o.sq = key(t, [[K0, 0.94], [K0 + 0.2, 1, "back"]]);
      if (t > T_FAST_E + 0.2) o.lid = Math.max(o.lid, VT.slowBlink(t, T_FAST_E + 0.45, 0.3));
    }
    s += W(t, o);
    var cam;
    if (sh === "F") cam = [key(T, [[F0, 980], [T_WALK, 1000], [G0, 1270, "io"]]), 560, key(T, [[F0, 0.95], [G0, 0.98]])];
    else if (sh === "G") cam = [key(T, [[G0, 1300], [T_STOP, 1460, "io"], [H0, 1480]]), 640, key(T, [[G0, 1.18], [H0, 1.22]])];
    else if (sh === "H") cam = [key(T, [[H0, 1470], [T_OVER2, 1480], [I0, 1560, "io"]]), 680, key(T, [[H0, 1.4], [T_OVER2, 1.46, "sine"], [I0, 1.38]])];
    else if (sh === "I") cam = [key(T, [[I0, 1400], [J0, 1470, "sine"]]), 590, key(T, [[I0, 1.0], [J0, 1.04]])];
    else if (sh === "J") cam = [key(T, [[J0, 1640], [K0, 1760, "io"]]), 640, key(T, [[J0, 1.2], [K0, 1.24]])];
    else { var hp = VT.wobPt({ x: x, y: GW, s: WS }, 190, 190); cam = [hp[0] - 70, hp[1] - 20, key(T, [[K0, 2.1], [T_STILL, 2.12], [T_STILL + 0.15, 2.22, "out"], [DUR, 2.3, "sine"]])]; }
    return { cam: cam, world: s };
  }
};
