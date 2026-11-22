/* d04 · vẽ tay · nhiệt kế kỷ lục trên trang sổ (21,7–33,0 s tuyệt đối; 11,3 s). Vào "chen", ra "cat". Đoạn mới 21/11/2026.
 * S0 (chen, khung đầu đã có trang sổ + nhiệt kế đang vẽ dở): bút Wob vẽ xong nhiệt kế; '(1933)' viết đúng "nineteen".
 * S0 tiếp: cột đỏ tụt chạm đáy đúng "sixty-eight", bầu đóng băng; '≈−68°C' viết cạnh vạch; đúng "ninety" viết nốt
 *   thành cả dòng '≈−68°C · ≈−90°F (1933)'; bút vẽ vết nứt băng lên bầu.
 * S1 (máy lùi nhẹ ở "July"): '(JULY 2010)' viết, dòng 1933 mờ 40 %; đúng "plus" cột vọt như tên lửa ra khỏi mép trang,
 *   mặt Wob (không mũ) ló vào mép phải giật mình; đúng "thirty-four" cột rơi về vạch '+34°C · +94°F', nảy; bút văng khỏi tay.
 * Tay: găng lò nướng trái cầm cá ở mép trái khung; tay phải (bàn tay mực) cầm bút. Chữ chỉ lấy từ chu_tren_do_vat.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, f = VT.f, C = VT.C, DUR = D.thoi_luong, INK = C.ink;
  var T_NINETEEN = VT.tu("nineteen"), T_MINUS = VT.tu("minus", 0), T_68 = VT.tu("sixty-eight"), T_CELS = VT.tu("celsius");
  var T_NINETY = VT.tu("ninety"), T_FAHR = VT.tu("fahrenheit"), T_JULY = VT.tu("july"), T_PLUS = VT.tu("plus"), T_34 = VT.tu("thirty-four");

  // ---- nhiệt kế ----
  var TX = 700, TOP = 150, BOT = 820, BY = 905, BR = 88, TW = 36;
  var LV_START = 0.45, LV_COLD = 0.05, LV_HOT = 0.93;
  function yLv(lv) { return BOT - (BOT - TOP) * lv; }
  var OUTLINE = "M " + (TX - TW) + " " + (BY - 70) + " L " + (TX - TW) + " " + (TOP + 10) + " C " + (TX - TW) + " " + (TOP - 46) + " " + (TX + TW) + " " + (TOP - 46) + " " + (TX + TW) + " " + (TOP + 10) + " L " + (TX + TW) + " " + (BY - 70);
  var BULB = "M " + (TX + TW) + " " + (BY - 70) + " A " + BR + " " + BR + " 0 1 1 " + (TX - TW) + " " + (BY - 70);
  var TICKS = []; for (var i = 0; i <= 10; i++) TICKS.push(yLv(i / 10));
  var CRACKS = ["M 650 880 L 678 902 L 664 930 L 690 952", "M 740 868 L 722 900 L 748 918", "M 700 975 L 712 946 L 736 950"];

  // mốc
  var DRAW1 = 0.9, T_DROP0 = T_MINUS - 0.1, T_ICE = T_68 + 0.1, CR0 = T_FAHR + 0.15, CR1 = CR0 + 0.75;
  var T_FLY = T_34 + 0.12, T_WOB = T_PLUS - 0.04;
  function level(t) {
    if (t < T_DROP0) return LV_START;
    if (t < T_PLUS) return key(t, [[T_DROP0, LV_START], [T_68, LV_COLD, "in2"], [T_68 + 0.3, LV_COLD + 0.03, "out"], [T_68 + 0.5, LV_COLD, "out"]]);
    return key(t, [[T_PLUS, LV_COLD], [T_PLUS + 0.15, 1.45, "in2"], [T_34 + 0.05, 1.45], [T_34 + 0.17, LV_HOT - 0.04, "in2"], [T_34 + 0.5, LV_HOT, "elastic"]]);
  }

  function page() {
    var s = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#6E4B32"/>';
    s += VT.shape("M 40 30 L 1880 30 L 1880 1050 L 40 1050 Z", "#FBF6E9", { sw: 7, ox: 10, oy: 8 });
    for (var y = 110; y < 1040; y += 56) s += VT.line("M 60 " + y + " L 1860 " + y, 2.5, "#9cc8dc", 0.45);
    s += VT.line("M 250 40 L 250 1040", 2.5, "#E88C8C", 0.6);
    return s;
  }
  // nhiệt kế: k là tiến độ vẽ nét (0..1: thân rồi bầu), lv mức cột đỏ
  function thermo(t, k, lv) {
    var out = "", kb = seg(k, 0, 0.7), kc = seg(k, 0.7, 1);
    if (k >= 1) {
      out += VT.shape(OUTLINE + " " + BULB.replace(/^M [^A]+/, "") + " Z", "#F4FAFC", { sw: 0, ox: 0, oy: 0 });
      // cột đỏ
      var top = yLv(Math.min(lv, 1.02));
      out += '<rect x="' + (TX - 15) + '" y="' + f(top) + '" width="30" height="' + f(BY - top) + '" fill="' + C.accent2 + '"/>';
      out += VT.ell(TX, BY, BR - 18, BR - 18, C.accent2, 0, { ox: 0, oy: 0 });
      out += VT.line("M " + (TX - 18) + " " + (TOP + 10) + " L " + (TX - 18) + " " + (BOT - 20), 5, "#ffffff", 0.7);
    }
    out += VT.lineDraw(OUTLINE, kb, 9) + VT.lineDraw(BULB, kc, 9);
    if (k >= 1) TICKS.forEach(function (y, j) { out += VT.line("M " + (TX - TW - 14) + " " + f(y) + " L " + (TX - TW - (j % 5 ? 40 : 58)) + " " + f(y), 5); });
    return out;
  }
  function ice(t) {
    if (t < T_ICE) return "";
    var g = VT.ease.back(seg(t, T_ICE, T_ICE + 0.3)), out = "";
    out += VT.g("translate(" + TX + " " + BY + ") scale(" + f(g) + ")",
      VT.shape("M -96 -10 C -104 -70 -50 -112 0 -110 C 60 -112 106 -66 98 -6 C 92 56 50 100 0 104 C -56 100 -92 56 -96 -10 Z", "#CFEFFB", { sw: 6, ox: 4, oy: 3, op: 0.85 }) +
      VT.line("M -60 -60 Q -40 -84 -10 -88", 6, "#ffffff", 0.9) +
      VT.shape("M -40 98 L -30 140 L -20 100 Z M 10 104 L 22 160 L 32 102 Z M 52 88 L 60 120 L 68 84 Z", "#DDF3FC", { sw: 4 }));
    CRACKS.forEach(function (d, j) { out += VT.lineDraw(d, seg(t, CR0 + j * 0.22, CR0 + j * 0.22 + 0.3), 4, "#3E7C96"); });
    return out;
  }
  // găng lò nướng tay trái cầm cá, ló ở mép trái
  function mitt(t, jolt) {
    var sway = Math.sin(Math.round(t * 12) * 0.5) * 2 + jolt;
    var out = VT.fish({ x: 190, y: 700, s: 0.9, rot: -78 + sway, eye: jolt ? "wide" : "open", frost: true });
    out += VT.line("M -80 1000 Q 60 980 150 880", 34) + VT.line("M -80 1000 Q 60 980 150 880", 22, "#7FB6D6");
    out += VT.g("translate(170 850) rotate(" + f(-30 + sway) + ") scale(1.5)",
      VT.shape("M -27 -30 L 27 -30 L 25 -4 L -25 -4 Z", C.paper, { sw: 4 }) +
      VT.shape("M -25 -6 C -32 22 -26 56 0 60 C 26 56 32 22 25 -6 Z", "#D9543C", { sw: 5 }) +
      VT.shape("M 23 6 C 42 2 48 24 33 32 C 27 34 23 30 22 24 Z", "#D9543C", { sw: 4 }) +
      VT.line("M -16 6 L 10 32 M -20 26 L 2 48 M 10 4 L -12 26", 2.5, INK, 0.4));
    return out;
  }
  // bàn tay phải (ống tay cao su mực) + bút; tip = điểm ngòi
  function penHand(tip, fly) {
    var hx = tip[0] + 120, hy = tip[1] + 150;
    var arm = "M 2100 1250 Q " + f((hx + 2100) / 2) + " " + f(hy + 260) + " " + f(hx) + " " + f(hy);
    var out = VT.line(arm, 40) + VT.line(arm, 26, "#7FB6D6");
    if (!fly) out += VT.pencilTo([hx, hy], tip, { s: 1 });
    out += VT.dot(hx, hy, 34);
    if (!fly) out += VT.ell(hx - 18, hy - 24, 16, 11, INK, 0, { ox: 0, oy: 0 });
    return out;
  }
  // chữ (mọi chuỗi là chuỗi con của chu_tren_do_vat)
  var L1933 = "≈−68°C · ≈−90°F (1933)", LHOT = "+34°C · +94°F", LJULY = "(JULY 2010)";
  var XL = 800;
  function labels(t) {
    var out = "";
    // (1933) tiêu đề góc trái, tới "ninety" thì nhập vào dòng đầy đủ
    if (t >= T_NINETEEN && t < T_NINETY + 0.2) {
      var op = 1 - seg(t, T_NINETY, T_NINETY + 0.2);
      out += '<g opacity="' + f(op) + '">' + VT.textWrite(330, 240, "(1933)", 72, seg(t, T_NINETEEN, T_NINETEEN + 0.5), { anchor: "start", w: 900 }) + "</g>";
    }
    var dim = 1 - 0.6 * seg(t, T_JULY, T_JULY + 0.3);
    var yC = yLv(LV_COLD) + 20;
    if (t >= T_68 && t < T_NINETY) out += VT.line("M " + (TX + TW + 6) + " " + f(yLv(LV_COLD)) + " L " + (XL - 16) + " " + f(yLv(LV_COLD)), 6, C.accent2) + VT.textWrite(XL, yC, "≈−68°C", 60, seg(t, T_68, T_68 + 0.35), { anchor: "start", w: 900 });
    if (t >= T_NINETY) out += '<g opacity="' + f(dim) + '">' + VT.line("M " + (TX + TW + 6) + " " + f(yLv(LV_COLD)) + " L " + (XL - 16) + " " + f(yLv(LV_COLD)), 6, C.accent2) +
      VT.text(XL, yC, "≈−68°C", 60, { anchor: "start", w: 900 }) + VT.textWrite(XL + 238, yC, "· ≈−90°F (1933)", 60, seg(t, T_NINETY - 0.05, T_NINETY + 0.45), { anchor: "start", w: 900 }) + "</g>";
    if (t >= T_JULY) out += VT.textWrite(XL, 330, LJULY, 60, seg(t, T_JULY, T_JULY + 0.5), { anchor: "start", w: 900, fill: "#2c4f54" });
    if (t >= T_34) {
      var pk = VT.ease.back(seg(t, T_34, T_34 + 0.25));
      out += VT.line("M " + (TX + TW + 6) + " " + f(yLv(LV_HOT)) + " L " + (XL - 16) + " " + f(yLv(LV_HOT)), 6, C.accent2) +
        VT.g("translate(" + XL + " " + f(yLv(LV_HOT) + 22) + ") scale(" + f(pk) + ")", VT.text(0, 0, LHOT, 68, { anchor: "start", w: 900, fill: C.accent2 }));
    }
    return out;
  }
  // đường bút (vị trí ngòi theo thời gian)
  var OUTPTS = [[TX - TW, BY - 70], [TX - TW, TOP + 10], [TX, TOP - 34], [TX + TW, TOP + 10], [TX + TW, BY - 70], [TX + 60, BY + 60], [TX, BY + BR], [TX - 70, BY + 40]];
  function tip(t) {
    if (t < DRAW1) return VT.alongPts(OUTPTS, VT.clamp(0.72 + 0.28 * seg(t, 0, DRAW1), 0, 1));
    if (t < T_NINETEEN + 0.5 && t >= T_NINETEEN) return [330 + 260 * seg(t, T_NINETEEN, T_NINETEEN + 0.5), 230];
    if (t < T_68) return [620 + Math.sin(Math.round(t * 12) * 0.7) * 6, 560];
    if (t < T_68 + 0.35) return [XL + 230 * seg(t, T_68, T_68 + 0.35), yLv(LV_COLD) + 10];
    if (t < T_NINETY - 0.05) return [XL + 260, yLv(LV_COLD) + 10];
    if (t < T_NINETY + 0.45) return [XL + 220 + 470 * seg(t, T_NINETY - 0.05, T_NINETY + 0.45), yLv(LV_COLD) + 10];
    if (t < CR0) return [1300, 700];
    if (t < CR1) { var j = Math.min(2, Math.floor((t - CR0) / 0.22)), u = seg(t, CR0 + j * 0.22, CR0 + j * 0.22 + 0.3); var pts = CRACKS[j].replace(/[ML]/g, "").trim().split(/\s+/).map(Number); var P = []; for (var q = 0; q < pts.length; q += 2) P.push([pts[q], pts[q + 1]]); return VT.alongPts(P, u); }
    if (t < T_JULY) return [1200, 620];
    if (t < T_JULY + 0.5) return [XL + 400 * seg(t, T_JULY, T_JULY + 0.5), 320];
    return [1250, 420];
  }

  VT.sfx("drop", T_68, 0.6); VT.sfx("tach-bang", T_ICE, 0.4);
  VT.sfx("boing", T_PLUS, 0.6); VT.sfx("liu-lo-soc", T_WOB + 0.05, 0.5); VT.sfx("drop", T_34 + 0.1, 0.55);

  function scene(t) {
    var lv = level(t), jolt = t >= T_PLUS ? key(t, [[T_PLUS, 0], [T_PLUS + 0.1, 10], [T_PLUS + 0.6, 0, "elastic"]]) : 0;
    var out = page() + thermo(t, t < DRAW1 ? 0.72 + 0.28 * seg(t, 0, DRAW1) : 1, lv) + ice(t);
    // tên lửa: cột vượt đỉnh ống, phụt ra khỏi trang
    if (lv > 1.0) {
      var yTop = yLv(lv);
      out += VT.line("M " + TX + " " + (TOP - 30) + " L " + TX + " " + f(yTop), 30, C.accent2) + VT.line("M " + TX + " " + (TOP - 30) + " L " + TX + " " + f(yTop), 30, INK, 0) +
        VT.speedLines({ x0: TX - 70, y0: TOP + 60, n: 4, gap: 46, len: 160, dx: 0, dy: 1, sw: 5 });
      out += VT.puffBurst({ x: TX, y: TOP - 30, k: seg(t, T_PLUS + 0.1, T_PLUS + 0.5), s: 0.6 });
    }
    if (t >= T_34 && t < T_34 + 0.3) out += VT.impact({ x: TX, y: yLv(LV_HOT), s: 0.5, seed: 4 });
    out += labels(t);
    out += mitt(t, jolt);
    // bút: văng ở "thirty-four"
    if (t < T_FLY) out += penHand(tip(t), false);
    else {
      var u = seg(t, T_FLY, T_FLY + 0.6), hp = [1370, 570];
      out += penHand([hp[0] - 120, hp[1] - 150], true);
      out += VT.pencil({ x: VT.lerp(hp[0] - 60, 2150, u), y: hp[1] - 80 - 700 * u + 500 * u * u, s: 1, rot: 30 + 900 * u });
      if (u < 0.3) out += VT.speedLines({ x0: hp[0] - 40, y0: hp[1] - 60, n: 3, gap: 30, len: 90, dx: -1, dy: 0.6, sw: 4 });
    }
    // mặt Wob ló vào mép phải ở "plus"
    if (t >= T_WOB) {
      var e = VT.ease.back(seg(t, T_WOB, T_WOB + 0.25));
      var o = { t: t, s: 1.35, x: VT.lerp(2300, 1820, e), y: 1300, flip: -1, lean: -14, eyes: "wide", brows: "up", mouth: "o", marks: "shock", noBlink: true, beanie: false, scarf: false, noPack: true,
        sq: key(t, [[T_WOB + 0.25, 1.1], [T_WOB + 0.6, 1, "elastic"]]), px: -14, py: -12, arms: "rest" };
      out += VT.wob(o);
    }
    return out;
  }

  return [
    { a: 0, b: T_JULY - 0.05, ten: "vẽ nhiệt kế, tụt −68", ve: function (t, lt, T) {
      var z = key(T, [[0, 1.0], [T_68, 1.04, "sine"], [T_JULY - 0.05, 1.06, "sine"]]);
      return { cam: [960, 560, z], shake: VT.shake(t, T_68, 0.2, 6), world: scene(t), tint: "warm" };
    } },
    { a: T_JULY - 0.05, b: DUR, ten: "lùi máy, cột vọt +34, Wob ló", ve: function (t, lt, T) {
      var z = key(T, [[T_JULY - 0.05, 1.06], [T_JULY + 0.6, 0.86, "io3"], [DUR, 0.88, "sine"]]);
      var cy = key(T, [[T_JULY - 0.05, 560], [T_JULY + 0.6, 520, "io3"]]);
      return { cam: [960, cy, z], shake: VT.shakes(t, [[T_PLUS + 0.1, 0.3, 10], [T_34 + 0.1, 0.2, 6]]), world: scene(t), tint: "warm" };
    } },
  ];
};
