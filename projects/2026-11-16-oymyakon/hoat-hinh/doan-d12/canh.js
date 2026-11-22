/* Đoạn d12 · cắt giấy · hồi ức · trung tâm làng, đài tưởng niệm (thẻ di-bo-parallax, tien-canh-khung). Vào "cat", ra "cat".
   Lời: "Next, I went to find the chilliest spot in town. That was the whole point of the move. Oymyakon has a monument
   for it, the Pole of Cold, so I stood next to it and tried to look famous."
   Đài tưởng niệm vẽ chung tối giản (D.monumentCold, không chép thiết kế thật). Chữ duy nhất: "POLE OF COLD" trên bệ.
   Trang phục: mũ len đỏ, khăn đỏ, ba lô, lông mi đóng băng; chai nước cất trong ba lô. Gag: sương giá đọng thành vương miện
   băng thật trên mũ (giữ sang d13). */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, at = api.at, g = api.g, DUR = api.DUR, C = api.C, INK = api.INK;
  var T = function (w, du, k) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };

  var tTown = T("town.", 2.35), tThat = T("That", 3.13), tPoint = T("point", 3.77), tOym = T("Oymyakon", 4.97), tMon = T("monument", 6.01),
    tPole = T("Pole", 7.22), tSo = T("so", 8.4), tStood = T("stood", 8.62), tLook = T("look", 10.07), tFam = T("famous.", 10.25);

  var MAT = 872, XMON = 1760, XW1 = 1050, XW2 = 1430;
  var nen = CN.langTuyet(api, {
    ten: "lang", seed: 1200, tu: -1400, den: 4400, mat: MAT,
    nha: [[-180, 330, 200], [560, 300, 190], [2450, 340, 210], [3060, 320, 200]],
    thong: [[1080, 690, 300], [2250, 650, 340]], rao: [[2600, 260]], cui: [[260, 150]], suong: 5
  });
  var crown = '<g transform="translate(200,40)"><g id="vm">' + D.iceCrown() + "</g></g>";
  var M = api.wob("M", { scarf: true, khan: "#D9543C", mu: "#C9463A", phuKien: crown });
  var mid = nen.giua + at(XMON, MAT + 12, '<g transform="scale(0.9)">' + D.monumentCold("dai", { chu: data.chu_tren_do_vat[0], co: 54 }) + "</g>") + M.svg;
  // bụi kim cương quanh vương miện
  mid += '<g id="lapVM">' + api.lapLanh("lv", 6, 1211, [XW2 - 110, MAT - 330, 220, 120], tLook - 0.1, DUR) + "</g>";
  // cột điện tiền cảnh (lớp gần) – đài hiện ra sau cột khi camera lướt
  var near = nen.gan + at(1460, 1180, '<g transform="scale(1.5)">' + D.pole(760, 0, 1220) + "</g>");

  api.dat(nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", near, 1.4, { mat: 1060 }));
  api.noi({});

  api.camera([
    [0, 560, 650, 1.18], [tTown, 900, 655, 1.22, "sine.inOut"],
    [tPoint - 0.2, XW1 + 20, 650, 1.3, "sine.inOut"],
    [tOym - 0.05, XMON - 80, 590, 1.02, "power2.inOut"],                  // lướt qua cột điện tiền cảnh, lộ đài: xong trước 'Oymyakon has a monument'
    [tPole - 0.1, XMON - 90, 594, 1.04, "sine.inOut"],
    [tSo - 0.1, XMON - 110, 600, 1.06, "sine.inOut"],
    [tLook - 0.2, XMON - 170, 650, 1.42, "power2.inOut"],
    [DUR, XMON - 176, 646, 1.56, "sine.inOut"]
  ]);

  // ---- Wob đi tìm chỗ lạnh nhất ----
  M.set(0, { x: 240, y: MAT + 28, size: 0.7, lashes: 1, ice: 1, aLu: 18, aLf: -10, aRu: -18, aRf: 10 });
  api.origin("#vm", "0 0"); api.set("#vm", 0, { scale: 0 });
  M.mouth(0, "X");
  M.walk(0.12, tThat - 0.15, 240, XW1, { step: 0.29, tieng: true });
  M.nhinQuanh(0.5, { nhip: 0.5 }); M.nhinQuanh(1.9, { nhip: 0.4 });
  // nắm tay hào hứng
  M.pose(tThat - 0.05, 0.1, { sy: 0.88, sx: 1.07 }, "power2.in");
  M.pose(tThat + 0.08, 0.2, { sy: 1.08, sx: 0.96, upY: -14, aRu: -108, aRf: -78 }, "back.out(2)");
  M.mouth(tThat + 0.08, "grin");
  for (var p = 0; p < 3; p++) M.pose(tPoint - 0.1 + p * 0.22, 0.11, { aRf: p % 2 ? -78 : -40 }, "sine.inOut");
  M.pose(tPoint + 0.65, 0.3, { sy: 1, sx: 1, upY: 0, aRu: -18, aRf: 10 }, "power2.inOut");
  M.mouth(tPoint + 0.8, "X");
  // thấy đài: mắt sáng, đi tới đứng cạnh
  M.pose(tOym + 0.2, 0.3, { pupX: 12, pupY: -6 }, "power2.out");
  M.walk(tMon - 0.2, tPole + 0.3, XW1, XW2, { step: 0.3, tieng: true });
  M.pose(tPole + 0.35, 0.25, { pupX: 10, pupY: -12, eye: 1.1 }, "power2.out");
  M.mouth(tPole + 0.4, "o");
  // tạo dáng nổi tiếng
  M.pose(tStood, 0.3, { aRu: -112, aRf: -16, aLu: 52, aLf: -104, lean: -4, upRot: -3, pupX: 0, pupY: -4, eye: 1, lid: 14 }, "back.out(1.6)");
  M.mouth(tStood + 0.1, "smirk");
  api.sfx("pop", tStood + 0.05, 0.3);
  // sương giá đọng thành vương miện băng
  api.key("#vm", "scale", tLook - 0.15, 0, "none"); api.key("#vm", "scale", tLook + 0.15, 1.15, "back.out(2.4)");
  api.sfx("tach-bang", tLook - 0.12, 0.55);
  M.pose(tLook + 0.2, 0.25, { pupX: 6, pupY: -16, eye: 1.08 }, "power2.out");   // liếc lên vương miện, vẫn giữ dáng
  M.shiver(tFam + 0.2, DUR, 1.4, 16);
  api.sfx("brr", tFam + 0.25, 0.5);
  M.breathe(0, DUR, 2.4);
  M.autoBlink(0.3, tStood - 0.2, 121);
};
