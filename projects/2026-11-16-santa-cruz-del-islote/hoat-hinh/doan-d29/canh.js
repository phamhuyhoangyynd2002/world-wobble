/* Đoạn d29 · cắt giấy · hồi ức, NGHIÊM: không có chỗ cho nghĩa trang trên đảo.
   Vào "cat", ra "giay". KHÔNG gag, KHÔNG sfx (nhạc đã tắt từ đầu đoạn). Wob mặt trầm, miệng thẳng/buồn, không cười.
   Shot: đuôi thuyền, biển lặng buổi sáng, tông trầm (cùng thuyền d27) → trang sổ trong tay Wob: một đường nét đứt mảnh chạy từ hình đảo
         sang một hòn đảo khác; Wob đặt bông hoa giấy nhỏ ở cuối đường → Wob nhìn ra biển, camera lùi rất chậm → phủ dần thành giấy.
   Trang phục: mũ cói; ba lô còn ẩm ôm trước ngực; sổ du lịch; bông hoa giấy nhỏ. Không chữ; không vẽ mộ, không vẽ người. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, at = api.at, DUR = api.DUR, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }
  var SW = 0.55, BX = 1240, BY = 965, XW = 1020, YW = 852, H = 640;

  // ---------- mốc lời ----------
  var tOne = T("One", 0, 0.15), tQuiet = T("quietly.", 0, 1.35), tRoom = T("room", 0, 2.76), tCem = T("cemetery.", 0, 3.69);
  var tPeople = T("People", 0, 4.68), tAnother = T("another", 0, 5.66), tIsland2 = T("island.", 1, 5.98), tEven = T("Even", 0, 6.74), tCarry = T("carry.", 0, 8.41);

  // ---------- trời, biển lặng, đảo khác ở xa ----------
  var troi = '<rect width="1920" height="1080" fill="url(#skyTram)"/>';
  var xa = "";
  for (var m = 0; m < 4; m++) xa += at(-200 + m * 700, 180 + (m % 2) * 50, D.paper(D.rEll(0, 0, 170, 28, 3, 2910 + m), "#EEF0EE", { shadow: false, stroke: true, sw: 2 }));
  var bienXa = '<rect x="-1400" y="' + H + '" width="6000" height="900" fill="#9CC3C4"/>' + D.line("M -1400 " + H + " L 4600 " + H, 3, INK, ' opacity="0.3"');
  var daoKhac = at(300, H + 2, sc(0.3, ND.daoXanh({ w: 900, seed: 2911, cay: 5 })));
  var bien = ND.bien(api, "bs", { x0: -1400, x1: 4200, y: H + 60, n: 3, day: 56, bien: 8, chuKy: 5, mau: ["#93BDBE", "#7BAAAE", "#62979D"], bot: false });

  // ---------- sổ trên đùi: đảo → nét đứt mảnh → đảo khác; bông hoa ở cuối đường ----------
  var nd = "", N = 11, P0 = [-74, -112], P1 = [70, -150];
  var pt = function (u) { return [P0[0] + (P1[0] - P0[0]) * u, P0[1] + (P1[1] - P0[1]) * u - 34 * Math.sin(Math.PI * u)]; };
  for (var i = 0; i < N; i++) {
    var u0 = i / N, u1 = (i + 0.55) / N;
    var a = pt(u0), b = pt(u1);
    nd += '<g id="nd' + i + '">' + D.line("M " + D.f1(a[0]) + " " + D.f1(a[1]) + " L " + D.f1(b[0]) + " " + D.f1(b[1]), 2.2, "#4A5560") + "</g>";
  }
  var trang = at(-104, -100, D.sketchIcon("dao", 1.25, INK)) + at(96, -140, D.sketchIcon("dao", 0.95, "#4A5560")) + nd +
    at(P1[0] + 8, P1[1] + 12, '<g id="hoa">' + sc(1.3, D.paperFlower(12, { mau: "#F4E7EA" })) + "</g>") +
    // tay Wob (cùng nét tay của rig, quy về toạ độ sổ ×1/0,36) cầm hoa đưa vào từ phía vai trái
    at(P1[0] + 8, P1[1] + 12, '<g id="tay">' + D.line("M 0 0 C -30 70 -90 140 -170 230", 20, INK) +
      '<g id="tayHoa">' + sc(1.3, D.paperFlower(12, { mau: "#F4E7EA" })) + "</g>" + '<circle r="21" fill="' + INK + '"/></g>');
  var so = '<g id="soG">' + D.sketchbook("sb", 320, 240, {}) + trang + "</g>";

  // ---------- thuyền + Wob (ôm ba lô ẩm, sổ trên đùi) ----------
  var W = ND.wob(api, "W", { lung: 0, truoc: 1, truocTf: "translate(400,396) scale(0.9)", uot: true });
  var tb = ND.thuyen("tb", {});
  var SBX = XW + 6, SBY = YW - 40;
  var thuyen = '<g id="tbR">' + at(BX, BY, sc(0.95, tb.sau)) + W.svg + at(SBX, SBY, sc(0.36, so)) + at(BX, BY, sc(0.95, tb.truoc)) + "</g>";
  var giua = bienXa + daoKhac + bien + thuyen;
  var gan = ND.bien(api, "bg", { x0: -1400, x1: 3800, y: 1012, n: 2, day: 44, mau: ["#6FA3A6", "#558C92"], bien: 10, chuKy: 5, bot: false });
  var tram = '<rect width="1920" height="1080" fill="#5E6B78" opacity="0.16"/>';
  api.dat(D.defsNhietDoi() + ND.defs() + troi + api.lop("xa", xa, 0.35, { mat: H }) + api.lop("giua", giua, 1, { mat: 1000 }) + api.lop("gan", gan, 1.4, { mat: 1080 }) + tram);
  api.noi({ raDai: 0.5 });
  api.show(W.nd.uotT, 0, 1);

  // ---------- camera: vào trang sổ, rồi lùi rất chậm ra biển ----------
  var PX = SBX, PY = SBY - 0.36 * 125, HX = SBX + 0.36 * (P1[0] + 8) - 4, HY = SBY + 0.36 * (P1[1] + 12) + 10;
  var tN1 = tIsland2 + 0.1;
  api.camera([
    [0, 1010, 700, 1.62], [tRoom - 0.8, 1012, 705, 1.68, "sine.inOut"],
    [tRoom + 0.2, PX, PY + 4, 6.8, "power2.inOut"],
    [tN1 - 0.5, PX + 2, PY + 4, 7.0, "sine.inOut"],
    [tN1 + 0.1, HX, HY, 11.5, "power2.inOut"],                    // CẬN tay Wob đặt hoa giấy
    [tEven + 0.4, HX, HY, 12.0, "sine.inOut"],
    [DUR - 0.3, 820, 650, 1.22, "sine.inOut"],
    [DUR, 815, 648, 1.2, "sine.inOut"]
  ]);

  // thuyền bập bềnh rất nhẹ
  api.origin("#tbR", BX + " " + (BY - 60));
  for (var tt = 0, k = 0; tt < DUR + 2; tt += 2, k++) api.key("#tbR", "rotation", tt, k % 2 ? -0.6 : 0.5, "sine.inOut");

  // nét đứt mảnh tự vẽ dần sang đảo khác
  var tN0 = tPeople - 0.1;
  for (var j = 0; j < N; j++) { api.key("#nd" + j, "opacity", 0, 0, "step"); api.key("#nd" + j, "opacity", tN0 + (tN1 - tN0) * j / N, 1, "step"); }
  // bông hoa giấy đặt ở cuối đường
  api.origin("#hoa", "0 0");
  var dr = api.duaRut("#tay", tN1 - 0.3, { tu: [-240, 260], vao: 0.55, giu: 0.75, ra: 0.55 });
  api.key("#hoa", "opacity", 0, 0, "step"); api.key("#hoa", "opacity", dr.den + 0.05, 1, "step");
  api.key("#tayHoa", "opacity", 0, 1, "step"); api.key("#tayHoa", "opacity", dr.den + 0.05, 0, "step");

  // ---------- Wob: mặt trầm suốt đoạn ----------
  W.set(0, { x: XW, y: YW, size: SW, legLs: 0.55, legRs: 0.55, aLu: -36, aLf: -64, aRu: -50, aRf: 30, pupX: 6, pupY: 12, op: 1 });
  W.mouth(0, "thang");
  W.lid(0, 0.01, 18);
  W.breathe(0, DUR, 3.0);
  W.pose(tQuiet, 0.6, { upRot: 2 }, "sine.inOut");
  // tay đặt hoa
  W.pose(tN1 - 0.3, 0.5, { aLu: -50, aLf: -80 }, "sine.inOut");
  W.pose(tN1 + 0.6, 0.5, { aLu: -36, aLf: -64 }, "sine.inOut");
  // nhìn ra biển (về phía đảo khác)
  W.pose(tEven, 0.8, { pupX: -12, pupY: -2, upRot: -2, lid: 22 }, "sine.inOut");
  W.mouth(tEven + 0.4, "buon");
  W.blinkAt(tQuiet + 0.4); W.blinkAt(tCarry + 0.3);
};
