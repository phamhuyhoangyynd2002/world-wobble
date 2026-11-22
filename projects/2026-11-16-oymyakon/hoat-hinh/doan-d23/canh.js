/* d23 (diorama, cảnh ngoài trời 3D, hồi ức): quay lại ĐÚNG phố của d21 (cùng seed 18, cùng dungPho(), cùng chiếc xe XE0) sau
 * đoạn chèn vẽ tay d22; trời sáng hơn một chút. Wob vỗ mũi xe như vỗ ngựa → "The car kept running.": xe rung bần bật như
 * ngựa khịt mũi, phụt một luồng hơi trắng từ lưới tản nhiệt thổi tung khăn của Wob (gag "xe như ngựa"; ống xả phía sau vẫn
 * phụt khói từng cụm) → "It had places to be.": Wob giữ khăn, nhìn xe, tỉnh bơ; camera đẩy chậm [day-vao-cham], giữ.
 */
window.CANH = function (api, data) {
  "use strict";
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var N = data.nhip.map(function (n) { return n.tai; });   // 0, 2.82, 4.15
  function tuSau(k, sau, macDinh) {   // mốc từ k đầu tiên sau mốc `sau` ("car" có ở cả nhịp 1 và nhịp 2)
    var t = null;
    data.loi.forEach(function (L) { L.tu.forEach(function (w) { if (t == null && w.start >= sau && w.text.replace(/[^A-Za-z]/g, "").toLowerCase() === k) t = w.start; }); });
    return t == null ? macDinh : t;
  }

  // ---------------------------------------------------------------- thế giới: y hệt d21
  var DEM = { anhSang: "dem", troiDinh: "#1b2b48", chanTroi: "#4a5f84", troiSang: { tren: "#6680b4", duoi: "#34405e", manh: 1.45 }, nang: { huong: [-20, 30, 14], mau: "#b4c6ff", manh: 1.05 } };
  var d3 = api.ngoaiTroi(Object.assign({ suong: [16, 110], seed: 18, bong: { tam: [0, -2], rong: 34, sau: 22 } }, DEM));
  var XE0 = { x: 1.2, z: 0.6 };
  function dungPho() {   // GIỮ NGUYÊN Ở d21 VÀ d23
    d3.duong({ z: 0, dai: 150, rong: 6 });
    var nha0 = d3.nha(-4.5, -9.5, { w: 7, d: 6, h: 3.1, cuaSo: 2, seed: 71, loiCua: true, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: -44, x1: -10.5, z: -10.5, seed: 3, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: 1.5, x1: 44, z: -10.5, seed: 4, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: -40, x1: 40, z: -24, seed: 8, cuaSo: 1, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: -44, x1: -9, z: 12.5, yaw: Math.PI, seed: 5, khoi: { troi: 0.4 } });
    d3.dayNha({ x0: 13, x1: 44, z: 12.5, yaw: Math.PI, seed: 6, khoi: { troi: 0.4 } });
    d3.cotDien([-30, -16, -2, 12, 26], { z: -4.2 });
    d3.hangRao(-12.6, 4.6, 9);
    d3.dongTuyet(-14, 3.0, { r: 1.3, cao: 0.5 }); d3.dongTuyet(9.5, -3.4, { r: 1.5, cao: 0.5 }); d3.dongTuyet(19, 3.3, { r: 1.4, cao: 0.45 });
    d3.rungCay({ x0: -90, x1: 90, z0: -60, z1: -40, n: 70, loai: "tran", cao: [6, 10], seed: 4 });
    d3.nui([{ x: -70, z: -115, r: 38, cao: 26, loai: "nui" }, { x: 5, z: -135, r: 50, cao: 34, loai: "nui" }, { x: 80, z: -120, r: 42, cao: 24, loai: "nui" },
            { x: -30, z: -85, r: 30 }, { x: 45, z: -90, r: 34 }]);
    var dongHo = d3.dongHo(-4.5, 2.3, -6.46, { r: 0.3, gio: 8, phut: 56 });    // treo trên cửa, đèn hiên phía trên
    var xe0 = d3.xe(XE0.x, XE0.z, { yaw: Math.PI, mau: "#6f8a6a", denTrong: true, seed: 3 });
    d3.xe(-12, -1.0, { yaw: 0, mau: "#9a4a3a", seed: 5 });
    d3.xe(-17, 1.0, { yaw: Math.PI, mau: "#5b6b7a", seed: 11 });
    d3.xe(9.5, -1.0, { yaw: 0.04, mau: "#4f6f86", seed: 7 });
    d3.xe(17.5, 1.0, { yaw: Math.PI, mau: "#b9a46a", seed: 9 });
    d3.xe(27, -0.9, { yaw: 0, mau: "#7a6a8a", seed: 13 });
    return { nha0: nha0, dongHo: dongHo, xe0: xe0 };
  }
  var P = dungPho();
  P.dongHo.dat(9, 2);                                                         // ít phút sau d21
  d3.tuyetRoi({ n: 700, vung: [-14, 14, 0, 7, -9, 9], toc: 0.4, co: 0.04 });
  d3.anhSang(0, 0, "sang-som", 0.85);                                         // = cuối d21
  d3.anhSang(0, api.DUR, "ban-mai", 0.35);                                    // sáng thêm một chút

  // ---------------------------------------------------------------- Wob: mũ len, khăn, ba lô, lông mi đóng băng
  var w = d3.wob({ x: -0.12, z: 1.8, trangPhuc: { mu: true, khan: true, mi: true, muMau: "#C9463A", muVanh: "#A8352B", muBong: "#F6EEDC", khanMau: "#D9543C" }, sang: 0.4 });
  api.lidsSet(w, 0.2);
  api.quaySet(w, -0.3);
  api.look(w, 0, -12, 5, 0.01);                                               // nhìn xuống nắp capo bên trái
  // "I patted the car on the hood, like a horse." – Wob đứng cạnh capo, tay vỗ mép nắp 3 lần, nắp nhún theo
  api.armSet(w, "L", 110);
  var tVo = [0.3, (tu.hood || 1.1) - 0.08, (tu.horse || 1.92) - 0.08];
  tVo.forEach(function (t) {
    api.armTo(w, "L", t - 0.14, 0.13, 152, "power2.out");                   // nhấc tay
    api.armTo(w, "L", t, 0.07, 122, "power2.in");                           // vỗ xuống mép nắp capo
    P.xe0.nhun(t + 0.03, 0.32, 0.018);                                       // nắp lún rõ (~10 px) rồi bật lại
    api.tl.to(w.talk, { rotation: 2, svgOrigin: "200 290", duration: 0.06 }, t);
    api.tl.to(w.talk, { rotation: 0, svgOrigin: "200 290", duration: 0.2 }, t + 0.07);
  });
  api.lids(w, 0.9, 0.45, 0.2);                                                 // vỗ về, mãn nguyện
  api.blink(w, 2.2, 0.45);
  // "The car kept running." – xe khịt mũi: rung, phụt hơi từ lưới tản nhiệt, khăn bay
  var tKhit = tuSau("car", N[1], 2.95) - 0.08;
  P.xe0.rung(tKhit - 0.06, 0.7, 0.008); P.xe0.nhun(tKhit - 0.04, 0.35, 0.02); // xe khịt: chúc đầu, lắc như ngựa
  d3.phut(function () { return P.xe0.diem("mui"); }, tKhit, { huong: [-1, 0.12, 0.3], quang: 2.4, co: 0.15, n: 30, dai: 0.9, lan: 0.22, keo: 0.35, sang: 0.45, seed: 13 });   // phụt từ lưới tản nhiệt
  api.sfx("may-no", tKhit - 0.06, 0.6);
  api.sfx("hoi-nuoc", tKhit, 0.55);
  api.armTo(w, "L", tKhit - 0.02, 0.15, 20, "power2.out");                   // giật tay lại
  api.lids(w, tKhit + 0.02, 0.85, 0.08);                                      // nheo mắt trong hơi
  api.nghieng(w, tKhit + 0.02, -6, 0.15);
  api.khanBay(w, tKhit + 0.06, 1.0, 80, [1, 0.85, 1, 0.8, 0.9, 0.4, 0]);       // khăn bị luồng hơi hút bay ngang sang trái
  api.tl.to(w.khanDuoi, { scaleY: 1.9, scaleX: 1.25, svgOrigin: "142 276", duration: 0.14, ease: "power3.out" }, tKhit + 0.06);   // đuôi khăn căng ra trong gió
  api.tl.to(w.khanDuoi, { scaleY: 1, scaleX: 1, svgOrigin: "142 276", duration: 0.3, ease: "power2.inOut" }, tKhit + 0.85);
  api.tl.to(w.lift, { x: -10, duration: 0.15, ease: "power2.out" }, tKhit + 0.04);
  api.tl.to(w.lift, { x: 0, duration: 0.5, ease: "power2.inOut" }, tKhit + 0.6);
  // "It had places to be." – giữ khăn, nhìn xe, tỉnh bơ
  var tGiu = (tu.it || 4.2) - 0.3;
  api.armTo(w, "L", tGiu, 0.25, -46);
  api.nghieng(w, tGiu, 0, 0.3);
  api.lids(w, tGiu + 0.1, 0.5, 0.2);
  api.look(w, tGiu + 0.1, 11, 1, 0.25);
  api.look(w, (tu.be || 4.89) + 0.25, 0, 2, 0.3);                             // quay lại nhìn ống kính
  api.quay(w, (tu.be || 4.89) + 0.25, 0.1, 0.3);
  api.blink(w, 5.9, 0.5, true);

  // ---------------------------------------------------------------- camera
  d3.cameraDuong([
    { pos: [-1.75, 0.88, 3.85], nhin: [-0.38, 0.6, 1.2], mo: 9, day: 0.0018 },       // đủ gần thấy tay chạm nắp, lưới tản nhiệt bên trái Wob
    { tu: tGiu - 0.15, den: tGiu + 0.85, kieu: "em", pos: [-1.3, 0.8, 3.3], nhin: d3.theo(w, [0.3, 0.55, 0]), mo: 11, day: 0.0035 }
  ], { day: 0.0022 });
};
