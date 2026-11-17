/* ve-tay · nền giấy sổ phác thảo, vẽ bằng code lúc nạp trang (canvas, seed cố định) → không cần file ảnh.
 * Thay assets/giay.jpg của bản thử B (PIL). Hai lớp:
 *  - VT.giayNen(seed): giấy kem có hạt, thớ sợi, viền tối nhẹ (đặt dưới cùng).
 *  - VT.giayHat(seed): hạt + thớ trên nền trong suốt (đặt TRÊN cảnh, độ mờ thường, không mix-blend-mode),
 *    để cả mảng màu đặc cũng có thớ giấy như tô trên giấy thật.
 * Dựng một lần ở nửa độ phân giải (960×540) rồi phóng lên, nên mọi worker render ra cùng ảnh.
 */
(function () {
  var VT = window.VT;
  function canvas(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function gauss(r) { var u = r() || 1e-9, v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

  VT.giayNen = function (seed) {
    var W = 960, H = 540, r = VT.rng(seed || 1607);
    var small = canvas(160, 90), sx = small.getContext("2d"), si = sx.createImageData(160, 90);
    for (var i = 0; i < si.data.length; i += 4) { var v = 128 + gauss(r) * 18; si.data[i] = si.data[i + 1] = si.data[i + 2] = v; si.data[i + 3] = 255; }
    sx.putImageData(si, 0, 0);
    var c = canvas(W, H), x = c.getContext("2d");
    x.imageSmoothingEnabled = true;
    x.drawImage(small, 0, 0, W, H);
    var soft = x.getImageData(0, 0, W, H), img = x.createImageData(W, H);
    for (var y = 0; y < H; y++) for (var xx = 0; xx < W; xx++) {
      var j = (y * W + xx) * 4, d = (soft.data[j] - 128) * 0.35 + gauss(r) * 4.5;
      var vx = (xx - W / 2) / (W / 2), vy = (y - H / 2) / (H / 2), vg = -10 * Math.max(0, vx * vx + vy * vy - 0.45);
      img.data[j] = 241 + d + vg; img.data[j + 1] = 231 + d + vg; img.data[j + 2] = 207 + d * 1.1 + vg * 1.2; img.data[j + 3] = 255;
    }
    x.putImageData(img, 0, 0);
    for (var k = 0; k < 450; k++) {
      var px = r() * W, py = r() * H, a = r() * Math.PI, L = 3 + r() * 10, cc = [[120, 100, 70, 0.09], [255, 252, 240, 0.16], [90, 80, 60, 0.06]][Math.floor(r() * 3)];
      x.strokeStyle = "rgba(" + cc[0] + "," + cc[1] + "," + cc[2] + "," + cc[3] + ")"; x.lineWidth = 0.6;
      x.beginPath(); x.moveTo(px, py); x.lineTo(px + L * Math.cos(a), py + L * Math.sin(a)); x.stroke();
    }
    return c.toDataURL("image/png");
  };

  VT.giayHat = function (seed) {
    var W = 960, H = 540, r = VT.rng((seed || 1607) + 99);
    var c = canvas(W, H), x = c.getContext("2d"), img = x.createImageData(W, H);
    for (var j = 0; j < img.data.length; j += 4) {
      var v = gauss(r);
      if (v > 0) { img.data[j] = 255; img.data[j + 1] = 250; img.data[j + 2] = 236; } else { img.data[j] = 70; img.data[j + 1] = 58; img.data[j + 2] = 40; }
      img.data[j + 3] = Math.min(255, Math.abs(v) * 22);
    }
    x.putImageData(img, 0, 0);
    for (var k = 0; k < 600; k++) {
      var px = r() * W, py = r() * H, a = r() * Math.PI, L = 3 + r() * 9;
      x.strokeStyle = k % 3 ? "rgba(90,74,50,0.16)" : "rgba(255,252,240,0.25)"; x.lineWidth = 0.7;
      x.beginPath(); x.moveTo(px, py); x.lineTo(px + L * Math.cos(a), py + L * Math.sin(a)); x.stroke();
    }
    return c.toDataURL("image/png");
  };
})();
