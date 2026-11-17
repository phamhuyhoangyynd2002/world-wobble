/* ve-tay · nối đoạn theo HOP-DONG.md mục 5. Bộ máy gọi tự động theo HH_DATA.vao / HH_DATA.ra.
 *  giay (vào): 0,45 s đầu, tờ giấy phẳng #EFE3C8 phủ kín khung bị kéo đi sang phải (mép cong như trang lật) → lộ cảnh.
 *  giay (ra):  0,45 s cuối, tờ giấy trượt vào từ trái phủ dần; khung cuối là giấy phẳng #EFE3C8 kín khung.
 *  chen (vào): khung đầu là cảnh đầy đủ; camera "đập" vào 0,3 s đầu (zoom 1,07 → 1, dội nhẹ); tự khai sfx whoosh ở 0.
 *  cat, dau-video, cuoi-video: không làm gì (khung đầu/cuối là cảnh đầy đủ).
 * Lớp nối vẽ TRÊN mọi thứ (kể cả hạt giấy, tint) và KHÔNG qua filter nét sôi, để mảng giấy phẳng đúng màu.
 */
(function () {
  var VT = window.VT, f = VT.f, PAPER = "#EFE3C8", INK = VT.C.ink;
  VT.NOI = { giay: 0.45, chen: 0.3 };

  // Tờ giấy phủ vùng x ≥ e (from = "phai") hoặc x ≤ e (from = "trai"); mép cong, có vệt gấp sáng và bóng mờ.
  function sheet(e, side) {
    var dir = side === "phai" ? 1 : -1, bulge = 70;
    var edge = "M " + f(e) + " -20 C " + f(e - dir * bulge) + " 300 " + f(e - dir * bulge) + " 780 " + f(e) + " 1100";
    var far = side === "phai" ? 2100 : -180;
    var area = edge + " L " + far + " 1100 L " + far + " -20 Z";
    var shadow = '<path d="' + area + '" fill="#000" opacity="0.10" transform="translate(' + (-dir * 18) + ' 0)"/>';
    var fold = '<path d="' + edge + '" fill="none" stroke="#FFF8E6" stroke-width="26" opacity="0.9" transform="translate(' + (dir * 16) + ' 0)"/>';
    return shadow + '<path d="' + area + '" fill="' + PAPER + '"/>' + fold +
      '<path d="' + edge + '" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round" opacity="0.55"/>';
  }
  var FULL = '<rect x="-20" y="-20" width="1960" height="1120" fill="' + PAPER + '"/>';

  /** SVG lớp nối ở thời điểm T (giây, liên tục). D = HH_DATA. */
  VT.noiLop = function (T, D) {
    var out = "", dur = D.thoi_luong, fr = 1 / (D.fps || 30);
    if (D.vao === "giay") {
      var k = VT.seg(T, 0, VT.NOI.giay);
      if (k <= 0) out += FULL;
      else if (k < 1) out += sheet(VT.lerp(-60, 2060, VT.ease.in2(k)), "phai");
    }
    if (D.ra === "giay") {
      var k2 = VT.seg(T, dur - VT.NOI.giay, dur - fr * 1.5);
      if (k2 >= 1) out += FULL;
      else if (k2 > 0) out += sheet(VT.lerp(-140, 2000, VT.ease.out2(k2)), "trai");
    }
    return out;
  };
  /** Hệ số zoom thêm của camera (đoạn chèn đập vào). */
  VT.noiZoom = function (T, D) {
    if (D.vao !== "chen") return 1;
    var k = VT.seg(T, 0, VT.NOI.chen);
    return 1 + 0.07 * (1 - VT.ease.back(k));
  };
})();
