/* d39 · vẽ tay · chèn: cận bưu thiếp mặt cắt ngọn đồi trong tay Wob (568,814–572,651 s; 3,837 s). Vào "chen", ra "cat".
 * Nửa trên: Wob nhỏ chảy nhão dưới mặt trời ("no chance"); lật xuống nửa dưới: Wob tròn trịa ngủ ngon trong phòng đá ("absolutely").
 * Khung hiện tại, Wob không mũ; chỉ thấy hai tay Wob cầm bưu thiếp (mặt Wob ngoài khung nên không cần khẩu hình). Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, DUR = D.thoi_luong;
  var T_NO = VT.tu("no", 0), T_BELOW = VT.tu("below", 0), T_ABS = VT.tu("absolutely", 0);
  var F0 = T_BELOW - 0.35, F1 = T_BELOW + 0.05;
  VT.sfx("de-kem", T_NO - 0.03, 0.4);
  VT.sfx("whoosh", F0, 0.4);
  VT.sfx("pop", T_ABS - 0.03, 0.4);

  var CX = 960, CY = 540, CW = 1100, CH = 700;
  function top(t) { // mặt đất nắng: đồi + Wob chảy
    var melt = seg(t, T_NO - 0.1, T_NO + 0.5), out = '<rect x="-550" y="-350" width="1100" height="700" fill="#FFF3D6"/>';
    out += VT.sunBig({ x: 330, y: -180, r: 90, t: t });
    out += VT.hillCut({ x: 0, y: 250, w: 900, h: 300, cut: false });
    out += VT.ell(-60, 0, 90 + 60 * melt, 12 + 6 * melt, "#5a9fb8", 4);
    out += VT.wob({ x: -60, y: 0, s: 0.42, t: t, packColor: "oliu", sq: 1 - 0.35 * melt, sxRaw: 1 + 0.4 * melt, lid: 0.5, brows: "worried", mouth: "wobbly", marks: "sweat" });
    out += VT.shape("M -550 250 L 550 250 L 550 350 L -550 350 Z", "#C99B6E", { sw: 5, ox: 0, oy: 0 });
    return out;
  }
  function bottom(t) { // dưới đất: phòng đá mát, Wob ngủ
    var out = '<rect x="-550" y="-350" width="1100" height="700" fill="#C99B6E"/>';
    out += VT.shape("M -360 -120 C -360 -260 360 -260 360 -120 L 360 240 L -360 240 Z", "#E8D3AE", { sw: 6 });
    out += VT.shape("M -240 200 L 240 200 L 240 240 L -240 240 Z", "#C68A55", { sw: 5 });
    var z = ((t * 1.2) % 1);
    out += VT.shape("M -170 150 C -170 120 -110 120 -110 150 L -110 200 L -170 200 Z", "#F6EEDC", { sw: 4 }); // gối
    out += VT.g("translate(-20 150) rotate(-80)", VT.wob({ x: 0, y: 160, s: 0.75, t: t, packColor: "oliu", noPack: true, eyes: "closed", mouth: "content", sq: 1 + 0.03 * Math.sin(t * 5) }));
    [0, 1].forEach(function (i) { var zz = ((t * 0.9 + i * 0.5) % 1), zs = 14 + 14 * zz, zx = 40 + 40 * zz + i * 10, zy = -20 - 110 * zz; // nét "z" vẽ tay (đường gấp khúc, không phải chữ)
      out += VT.line("M " + VT.f(zx) + " " + VT.f(zy) + " l " + VT.f(zs) + " 0 l " + VT.f(-zs) + " " + VT.f(zs) + " l " + VT.f(zs) + " 0", 5, "#1f2326", VT.f(1 - zz)); });
    return out;
  }
  var BG = VT.desk ? VT.desk(980) : "";

  var shots = [];
  shots.push({ a: 0, b: DUR, ten: "bưu thiếp: trên chảy, lật, dưới ngủ", ve: function (t, lt, T) {
    var k = seg(t, F0, F1), sy = Math.abs(Math.cos(k * Math.PI)) || 0.02, side = k < 0.5 ? top(t) : bottom(t);
    var card = VT.g("translate(" + CX + " " + CY + ") scale(1 " + VT.f(Math.max(0.02, sy)) + ")",
      VT.shape("M -570 -370 L 570 -370 L 570 370 L -570 370 Z", "#FFFDF6", { sw: 8, ox: 10, oy: 10 }) + '<clipPath id="pc"><rect x="-550" y="-350" width="1100" height="700"/></clipPath><g clip-path="url(#pc)">' + side + "</g>" +
      VT.line("M -550 -350 L 550 -350 L 550 350 L -550 350 Z", 6));
    var out = '<rect x="-1200" y="-1200" width="4320" height="3480" fill="#7A5236"/>' + card;
    // hai bàn tay Wob (nét mực + bàn tay tròn) cầm hai mép
    var hy = CY + 200 * sy;
    out += VT.line("M 200 1200 Q 300 " + VT.f(hy + 200) + " 390 " + VT.f(hy), 13) + VT.dot(390, hy, 22);
    out += VT.line("M 1720 1200 Q 1620 " + VT.f(hy + 200) + " 1530 " + VT.f(hy), 13) + VT.dot(1530, hy, 22);
    if (k > 0 && k < 1) out += VT.speedLines({ x0: 1560, y0: 300, n: 3, gap: 40, len: 70, dx: 0, dy: 1 });
    var cam = key(T, [[0, [960, 560, 1.05]], [F0, [960, 540, 1.08], "sine"], [T_ABS, [960, 640, 1.45], "io"], [DUR, [960, 640, 1.5], "sine"]]);
    return { cam: cam, world: out, tint: "warm" };
  } });
  return shots;
};
