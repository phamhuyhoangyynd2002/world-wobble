/* dio-noi.js: nối giữa hai đoạn (HOP-DONG mục 5) + hoàn tất đoạn.
 * `giay` ra : 0,3–0,6 s cuối phủ dần thành TOÀN KHUNG giấy phẳng #EFE3C8 (khung cuối phẳng tuyệt đối).
 * `giay` vào: 0,3–0,6 s đầu từ toàn khung #EFE3C8 hiện dần thành cảnh.
 * Lớp nối nằm trên cùng (z-index 100, trên hạt giấy) nên khung nối không có hạt, không viền tối.
 * Mặc định DIO.hoanTat tự thêm nối theo HH_DATA.vao / ra; canh.js tự làm thì gọi api.raGiay/vaoGiay (tự tắt nối tự động)
 * hoặc đặt api.noiTuDong.ra = false.
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];

  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C;
    var lop = null;
    function lopGiay() {
      if (!lop) {
        lop = api.div("dio-ovl dio-noi", api.root, "z-index:100;background:" + C.GIAY_NOI + ";");
        gsap.set(lop, { opacity: 0 });
      }
      return lop;
    }
    // Phủ giấy: từ t0, dài d; xong trước khung cuối 2 khung để khung cuối chắc chắn phẳng
    api.raGiay = function (t0, d) {
      d = d || 0.5;
      if (t0 == null) t0 = api.DUR - d - 2 / api.fps;
      tl.fromTo(lopGiay(), { opacity: 0 }, { opacity: 1, duration: d, ease: "power1.in", immediateRender: false }, t0);
      api.noiTuDong.ra = false;
    };
    api.vaoGiay = function (d) {
      d = d || 0.5;
      var el = lopGiay();
      gsap.set(el, { opacity: 1 });
      tl.fromTo(el, { opacity: 1 }, { opacity: 0, duration: d, ease: "power1.out", immediateRender: true }, 1 / api.fps);
      api.noiTuDong.vao = false;
    };
    // Camera lao vào một điểm (thường là lớp pop-up) trong [t, t+d]; kết hợp raGiay để khung cuối phẳng.
    // diem: {x,y,z} thế giới; kCuoi: độ gần cuối (≤ 1120)
    api.laoVao = function (rig, t, d, diem, kCuoi, ease) {
      api.camTo(rig, t, d, { cx: diem.x, cy: diem.y, cz: diem.z, k: kCuoi || 1100, rx: 0, ry: 0 }, ease || "power3.in");
    };
    // Ngược lại: camera bắt đầu sát một điểm rồi lùi ra (vào đoạn từ giấy). Gọi TRƯỚC các camTo khác của rig.
    api.lui = function (rig, diem, d, camSau, ease) {
      api.camSet(rig, null, { cx: diem.x, cy: diem.y, cz: diem.z, k: 1100, rx: 0, ry: 0 });
      api.camTo(rig, 0, d, camSau, ease || "power3.out");
    };
  });

  DIO.hoanTat = function (api) {
    var d = api.data;
    api.hatGiay();
    if (d.vao === "giay" && api.noiTuDong.vao) api.vaoGiay(0.5);
    if (d.ra === "giay" && api.noiTuDong.ra) api.raGiay(null, 0.5);
  };
})();
