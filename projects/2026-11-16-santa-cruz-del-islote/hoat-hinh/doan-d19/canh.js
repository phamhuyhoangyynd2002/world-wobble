/* Đoạn d19 · cắt giấy · hồi ức: cùng quảng trường d16 lúc chạng vạng (Wob đổi ý lần 1).
   Vào "cat" (khung đầu đủ cảnh), ra "giay" (lớp gập xuống thành giấy phẳng).
   Shot: dây đèn tiền cảnh, Wob ngồi ghế nhựa cạnh thánh giá, ba lô ngồi ghế bên → radio trên bậu cửa sổ → mùi thơm hình con cá
         → Wob cắn bánh quy thật chậm → CẬN túi hông: bình xịt, tem đỏ nguyên → lùi ra, Wob ngả lưng, sao đầu tiên.
   Trang phục: mũ cói; ba lô khổng lồ "ngồi" ghế bên (bình xịt cắm túi hông); Wob cầm gói bánh quy. Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, B = window.NhietDoiB, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }

  var QT = B.quangTruong(api, { seed: 1600, thanhGia: 1240, chieu: true, ghe: [[380, 905, "#F4F2EC"], [1640, 900, "#5FA8D3"]] });
  var NHA = QT.vt.nha;

  // ---------- cửa sổ sáng ấm (tính như NhietDoi.nha: cửa sổ đối bên với cửa) ----------
  function cuaSo(i) { var h = NHA[i], cxd = i % 2 ? -0.35 : 0.35; return [h[0] + (cxd < 0 ? h[1] * 0.18 : -h[1] * 0.2), 800 - h[2] * 0.66]; }
  var den = "";
  for (var i = 0; i < NHA.length; i++) { var p = cuaSo(i); den += '<circle cx="' + D.f1(p[0]) + '" cy="' + D.f1(p[1] + 35) + '" r="110" fill="url(#ndDen)"/><rect x="' + D.f1(p[0] - 32) + '" y="' + D.f1(p[1]) + '" width="64" height="70" fill="#FFD68A" opacity="0.82"/>'; }
  // dây đèn ngang qua các mái (lớp giữa) + bóng đèn tiền cảnh (lớp gần)
  var dayMai = D.stringLights([[-700, 470], [0, 520], [700, 470], [1400, 515], [2100, 470], [2800, 515]], { id: "dm", n: 7, vong: 30, r: 8 });
  var dayGan = D.stringLights([[-420, 70], [380, 120], [1180, 80], [1980, 126], [2700, 84]], { id: "dg", n: 6, vong: 46, r: 12 });

  // ---------- radio trên bậu cửa sổ nhà số 3 ----------
  var pR = cuaSo(3), RX = pR[0], RY = pR[1] + 82;
  var radio = at(RX, RY, sc(0.72, D.radioBox("rd")));
  var notes = "";
  for (var n = 0; n < 4; n++) notes += '<g id="nt' + n + '" opacity="0">' + D.musicNote(n % 2, "#FFF1CF") + "</g>";

  // ---------- mùi thơm hình con cá từ cửa sổ nhà số 5 ----------
  var pF = cuaSo(5);
  var ca = '<g id="caV">' + D.fishScent("cm") + "</g>";

  // ---------- người đi dạo phía sau ----------
  var nguoi = B.nguoiDat(api, "p0", -150, 852, 0.5, { ao: "#C77D8A", quan: "#3E4A50" }) +
    B.nguoiDat(api, "p1", 2300, 848, 0.48, { ao: "#E9C46A", quan: "#4F6A80", lat: -1 }) +
    B.nguoiDat(api, "p2", 300, 846, 0.46, { ao: "#5FA8D3", quan: "#2F3B40" }) +
    B.nguoiDat(api, "p3", 1900, 850, 0.34, { nho: true, ao: "#86CFB0", quan: "#4F6A80", lat: -1 });

  // ---------- ghế của Wob và ghế của ba lô ----------
  var XW = 1060, XB = 870, YG = 935, SW = 0.62;
  var gheW = at(XW, YG, sc(SW, ND.ghe({ mau: "#F4F2EC" }))), gheB = at(XB, YG, sc(SW, ND.ghe({ mau: "#EE9AAE", mauToi: "#C77D8A" })));
  var seatY = YG - 92 * SW;
  var baLo = at(XB, seatY + 4, '<g id="pk">' + sc(0.5, ND.baLo("pkb", {})) + "</g>");
  var CK = '<g transform="translate(6,-6) rotate(-10)">' + D.crackerPack("ck") + "</g>";
  var W = ND.wob(api, "W", { lung: 0, truoc: 0, holdL: CK });
  var YW = seatY + 102 * SW + 4;

  var bx = XB - 78, by = seatY - 80;   // bình xịt ở túi hông trái ba lô (tem đỏ ≈ by - 10)
  var sp = at(800, 776, '<g id="spk">' + D.sparkle(5, "#FFFFFF") + "</g>");
  // sao đầu tiên (lớp xa)
  var sao = at(1360, 250, '<g id="sao">' + D.sparkle(22, "#FFF6D0") + '<circle r="7" fill="#FFF6D0"/></g>');

  var giua = QT.nen + QT.nha + den + dayMai + radio + notes + QT.thanhGia + QT.ghe + nguoi + gheB + baLo + gheW + W.svg + ca;
  var gan = QT.gan + dayGan;
  api.dat(D.defsNhietDoi() + ND.defs() + QT.troi + api.lop("xa", QT.xa + sao, 0.35, { mat: 720 }) + api.lop("giua", giua, 1, { mat: 800 }) + api.lop("gan", gan, 1.4, { mat: 1090 }));
  api.noi({ raDai: 0.45 });

  // ---------- mốc lời ----------
  var tSquare = T("square,", 0, 1.59), tCross = T("cross,", 0, 2.81), tStroll = T("stroll", 0, 4.79);
  var tRadio = T("radio", 0, 7.13), tDinner = T("dinner", 0, 8.97), tSmelled = T("smelled", 0, 9.25), tMine = T("mine.", 0, 9.97);
  var tCrackers = T("crackers", 0, 11.14), tSlowly = T("slowly,", 0, 11.95), tLast = T("last", 0, 13.13), tSmell = T("smell.", 0, 14.07);
  var tAnd = (function () { var v = api.tuDung("And", 14); return v == null ? 14.84 : v; })(), tSpray = T("spray", 0, 15.16), tSealed = T("sealed.", 0, 15.93), tChanged = T("changed", 0, 16.86);
  var tSmall = T("Small", 0, 18.1), tFine = T("fine.", 0, 18.81), tGreat = T("great.", 0, 20.26);

  // ---------- camera ----------
  api.camera([
    [0, 980, 560, 1.06], [tStroll + 1.0, 1000, 590, 1.14, "sine.inOut"],
    [tRadio - 0.75, 830, 640, 1.42, "power2.inOut"],          // radio + Wob
    [tDinner - 0.5, 860, 640, 1.46, "sine.inOut"],
    [tSmelled + 0.2, 1170, 650, 1.4, "power2.inOut"],         // con cá mùi bay tới
    [tCrackers - 0.3, 1060, 700, 1.62, "power2.inOut"],       // Wob cắn bánh
    [tAnd - 0.25, 1070, 705, 1.68, "sine.inOut"],
    [tAnd + 0.1, 784, 793, 20.5, "expo.out"],                       // CẬN tem niêm phong đỏ (tem ≈ 1/4 bề ngang khung)
    [tSealed + 0.55, 784, 792, 21.5, "sine.inOut"],
    [tChanged + 0.3, 1000, 600, 1.16, "power2.inOut"],        // lùi ra: Wob ngả lưng, sao
    [DUR, 1010, 590, 1.22, "sine.inOut"]
  ]);

  // ---------- dây đèn: nhấp nháy rất nhẹ ----------
  for (var b = 0; b < 20; b += 3) {
    var sel = "#dg-b" + b;
    api.key(sel, "opacity", 0, 1, "step");
    for (var tt = 0.6 + (b % 5) * 0.4; tt < DUR - 0.5; tt += 2.6) { api.key(sel, "opacity", tt, 1, "none"); api.key(sel, "opacity", tt + 0.25, 0.7, "sine.inOut"); api.key(sel, "opacity", tt + 0.6, 1, "sine.inOut"); }
  }

  // ---------- người đi dạo (qua lại chậm) ----------
  B.nguoiDi(api, "p0", 0.0, 9.5, 900, { buoc: 0.44 }); B.nguoiDi(api, "p0", 9.8, DUR, 1700, { buoc: 0.44 });
  B.nguoiDi(api, "p1", 0.3, 11.0, 1300, { buoc: 0.46 }); B.nguoiDi(api, "p1", 11.5, DUR, 400, { buoc: 0.46 });
  B.nguoiDi(api, "p2", 1.0, 12.0, 1450, { buoc: 0.42 }); B.nguoiDi(api, "p2", 12.3, DUR, 2100, { buoc: 0.42 });
  B.nguoiDi(api, "p3", 0.5, 7.5, 600, { buoc: 0.28 }); B.nguoiDi(api, "p3", 8.0, DUR, 1800, { buoc: 0.28 });

  // ---------- Wob ngồi ----------
  W.set(0, { x: XW, y: YW, size: SW, legLs: 0.55, legRs: 0.55, aLu: -40, aLf: -40, aRu: -18, aRf: 10, pupX: -4, op: 1 });
  W.mouth(0, "X");
  W.idle(0.1, tRadio - 0.6, { seed: 3, bien: 1.2, liec: true });
  W.pose(tStroll - 0.2, 0.3, { pupX: -10 }, "power2.out"); W.pose(tStroll + 1.3, 0.4, { pupX: 8 }, "sine.inOut"); W.pose(tStroll + 2.6, 0.3, { pupX: 0 }, "sine.inOut");

  // radio: loa nhún, nốt nhạc bay; Wob nghiêng đầu nghe, đung đưa
  api.origin("#rd-loa", "0 0");
  for (var tr = tRadio - 0.5, kk = 0; tr < DUR; tr += 0.42, kk++) api.key("#rd-loa", "scale", tr, kk % 2 ? 1 : 1.12, "sine.inOut");
  for (var m = 0; m < 4; m++) {
    var nsel = "#nt" + m;
    api.origin(nsel, "0 0");
    for (var tn = tRadio - 0.4 + m * 0.55; tn < tSmelled + 0.6; tn += 2.2) {
      var x0 = RX - 30 + m * 14, y0 = RY - 90;
      api.key(nsel, "x", tn, x0, "step"); api.key(nsel, "y", tn, y0, "step"); api.key(nsel, "opacity", tn, 0, "step");
      api.key(nsel, "opacity", tn + 0.2, 1, "sine.out");
      api.key(nsel, "x", tn + 1.8, x0 + 120 + m * 30, "sine.inOut"); api.key(nsel, "y", tn + 1.8, y0 - 170 - m * 20, "sine.out");
      api.key(nsel, "rotation", tn, -10, "step"); api.key(nsel, "rotation", tn + 1.8, 14, "sine.inOut");
      api.key(nsel, "opacity", tn + 1.8, 0, "power2.in");
    }
  }
  W.pose(tRadio - 0.2, 0.3, { pupX: -12, pupY: -4, upRot: -7 }, "power2.out");
  for (var ts = tRadio + 0.3, s2 = 0; ts < tDinner - 0.2; ts += 0.42, s2++) W.pose(ts, 0.4, { lean: s2 % 2 ? -4 : 4, upRot: s2 % 2 ? -9 : -4 }, "sine.inOut");
  W.mouth(tRadio + 0.2, "smirk");

  // mùi thơm hình con cá: bơi từ cửa sổ tới trước mũi Wob rồi bơi đi
  var mui = [XW + 96, YW - 140];
  api.origin("#caV", "0 0"); api.origin("#cm-duoi", "0 0");
  api.set("#caV", 0, { x: pF[0], y: pF[1] + 30, scale: 0.4, opacity: 0 });
  var tc0 = tDinner - 0.25, tc1 = tSmelled + 0.75, tc2 = tMine + 0.55, tc3 = tCrackers - 0.15;
  api.key("#caV", "opacity", tc0, 0, "none"); api.key("#caV", "opacity", tc0 + 0.35, 0.95, "sine.out");
  api.key("#caV", "scale", tc0, 0.4, "none"); api.key("#caV", "scale", tc1, 1.05, "sine.out");
  api.key("#caV", "x", tc0, pF[0], "none"); api.key("#caV", "x", tc1 - 0.5, (pF[0] + mui[0]) / 2 + 40, "sine.inOut"); api.key("#caV", "x", tc1, mui[0], "sine.out");
  api.key("#caV", "y", tc0, pF[1] + 30, "none"); api.key("#caV", "y", tc1 - 0.5, mui[1] - 70, "sine.inOut"); api.key("#caV", "y", tc1, mui[1], "sine.out");
  api.key("#caV", "y", tc1 + 0.4, mui[1] - 8, "sine.inOut"); api.key("#caV", "y", tc2 - 0.2, mui[1] + 4, "sine.inOut");
  api.key("#caV", "x", tc2, mui[0] + 30, "sine.in"); api.key("#caV", "y", tc2, mui[1] - 10, "sine.in");
  api.key("#caV", "x", tc3, mui[0] + 520, "sine.inOut"); api.key("#caV", "y", tc3, mui[1] - 300, "sine.inOut");
  api.key("#caV", "opacity", tc3 - 0.4, 0.95, "none"); api.key("#caV", "opacity", tc3, 0, "power2.in");
  for (var td = tc0, q = 0; td < tc3; td += 0.22, q++) api.key("#cm-duoi", "rotation", td, q % 2 ? 16 : -16, "sine.inOut");
  // Wob ngửi, mắt theo con cá, nhìn gói bánh, cắn thật nhỏ
  W.pose(tc0 + 0.2, 0.3, { lean: 0, upRot: 2, pupX: 12, pupY: -6 }, "power2.out");
  W.pose(tc1 - 0.15, 0.25, { pupX: 6, pupY: -2, eye: 1.12, sy: 1.04 }, "back.out(2)");
  W.lid(tc1 + 0.1, 0.25, 30); W.mouth(tc1, "o");
  W.lid(tc2 - 0.3, 0.2, 0);
  W.pose(tc2, 0.4, { pupX: 14, pupY: -10, eye: 1, sy: 1, upRot: 4 }, "sine.inOut");
  W.mouth(tMine, "buon");
  // nhìn gói bánh quy
  W.pose(tCrackers - 0.4, 0.3, { pupX: -10, pupY: 12, upRot: -2 }, "power2.inOut");
  api.origin("#ck-mieng", "0 0");
  api.key("#ck-mieng", "scale", 0, 1, "step");
  function can(t, s) {
    W.pose(t - 0.35, 0.3, { aLu: -60, aLf: -72 }, "power2.inOut");
    W.mouth(t - 0.05, "E"); W.mouth(t + 0.08, "X");
    api.key("#ck-mieng", "scale", t, s + 0.06, "none"); api.key("#ck-mieng", "scale", t + 0.06, s, "power3.in");
    W.pose(t + 0.35, 0.4, { aLu: -40, aLf: -40 }, "sine.inOut");
  }
  can(tCrackers + 0.25, 0.94); can(tSlowly + 0.5, 0.88); can(tLast + 0.05, 0.83);
  W.pose(tLast + 0.6, 0.3, { pupX: 12, pupY: -8 }, "sine.inOut");
  W.mouth(tSmell, "flat");
  W.idle(tc3, tAnd, { seed: 5, bien: 1 });

  // CẬN bình xịt: tem đỏ nguyên (đẩy rất nhẹ, tem lấp lánh)

  // đổi ý: ngả lưng, hai tay sau gáy, mỉm cười
  var tLean = tChanged - 0.05;
  W.pose(tLean, 0.45, { aLu: 152, aLf: 118, aRu: -152, aRf: -118, sy: 0.97, upRot: 0, pupX: -2, pupY: -10 }, "back.out(1.4)");
  W.mouth(tLean + 0.2, "smirk");
  W.mouth(tSmall + 0.1, "grin");
  api.sfx("liu-lo-vui", tChanged, 0.5);
  for (var tb2 = tLean + 0.6, s3 = 0; tb2 < DUR - 0.3; tb2 += 1.1, s3++) W.pose(tb2, 1.0, { lean: s3 % 2 ? -2.5 : 2.5 }, "sine.inOut");
  // sao đầu tiên hiện
  api.origin("#sao", "0 0");
  api.key("#sao", "scale", 0, 0, "step"); api.key("#sao", "scale", tSmall - 0.05, 0, "none"); api.key("#sao", "scale", tSmall + 0.3, 1.2, "back.out(2.5)"); api.key("#sao", "scale", tSmall + 0.6, 1, "sine.out");
  api.key("#sao", "rotation", tSmall, 0, "none"); api.key("#sao", "rotation", DUR, 50, "sine.inOut");
  W.pose(tSmall + 0.1, 0.3, { pupX: 10, pupY: -14 }, "power2.out");
  W.lid(tGreat - 0.4, 0.3, 20);
  W.autoBlink(0.5, tc0 - 0.2, 71); W.autoBlink(tc3, tAnd, 72);
};
