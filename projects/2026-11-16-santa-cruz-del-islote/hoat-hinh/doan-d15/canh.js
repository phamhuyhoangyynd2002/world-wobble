/* Đoạn d15 · cắt giấy · hồi ức: nửa đêm Wob nằm ngủ trên chiếu ở mép đảo, gối đầu lên ba lô, ôm bình xịt (tem nguyên) dựng đứng như kiếm,
   mũ cói đặt cạnh gối như mũ trụ; sáng ra (cắt cùng khung, chỉ trời đổi màu) vuốt tay như đọc chữ nổi, lật tay: trơn láng; khoanh tay hờn dỗi nhìn đảo đước.
   Vào "cat", ra "giay". Cùng nơi với d13 (MEP: chép giống hệt). Không mũ (mũ đặt cạnh gối). Không chữ trên hình. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, ND = window.NhietDoi, at = api.at, DUR = api.DUR;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  function sc(s, inner) { return '<g transform="scale(' + s + ')">' + inner + "</g>"; }

  function MEP(dem) {
    var troi = '<rect x="0" y="0" width="1920" height="1080" fill="url(#ndTroiDem)"/><g id="troiSang" opacity="0"><rect x="0" y="0" width="1920" height="1080" fill="url(#ndTroiSang)"/></g>';
    var xa = '<g id="saoDem">' + ND.sao(80, [-300, 0, 2600, 560], 1033) + at(1280, 210, ND.trang(52)) + "</g>" +
      '<rect x="-800" y="600" width="4000" height="700" fill="#24384A"/>' + at(1560, 612, sc(1.0, ND.daoDuoc({ w: 900, seed: 881, mau: "#1F3B2E" })));
    var MAT = 780, giua = "";
    giua += ND.bien(api, "bd", { x0: -600, x1: 2800, y: 640, n: 3, day: 48, dem: true, bien: 22, chuKy: 3.6 });
    var r = D.rng(91);
    for (var k = 0; k < 9; k++) giua += '<path d="' + D.rEll(1300 + r() * 700, 720 + r() * 260, 50 + r() * 60, 4 + r() * 3, 1.5, 900 + k) + '" fill="#FFD68A" opacity="' + (0.35 + r() * 0.3).toFixed(2) + '"/>';
    [[60, 380, 330, 2], [460, 400, 350, 0], [860, 380, 320, 3]].forEach(function (h, i) {
      giua += at(h[0], MAT - 70, sc(0.78, ND.nha({ w: h[1], h: h[2], mau: ["#7A5E6C", "#3F5E7A", "#4E6E64"][i % 3], seed: 1500 + i, cua: i % 2 ? 0.3 : -0.3, cuaMo: i === 1, so: 1, maiMau: "#6E777C" })));
      giua += at(h[0] + (i % 2 ? -70 : 60), MAT - 70 - h[2] * 0.78 * 0.6, '<circle r="70" fill="url(#ndDen)"/><rect x="-24" y="-26" width="48" height="52" fill="#FFD68A" opacity="0.9"/>');
    });
    giua += D.paper(D.rRect(-400, MAT - 70, 1560, 74, 2, 1510), "#8E8A80", { shadow: false, half: 0.08 });
    giua += D.paper(D.rough([[-400, MAT], [1180, MAT], [1188, MAT + 150], [-400, MAT + 156]], 2.5, 1511, 18), "#6E6A62", { stroke: true, sw: 4, shadow: false });
    giua += D.line("M -400 " + (MAT + 120) + " L 1186 " + (MAT + 118), 6, "#3E5A52", ' opacity="0.7"') + D.line("M -300 " + (MAT + 50) + " L -260 " + (MAT + 110) + " M 300 " + (MAT + 30) + " L 330 " + (MAT + 100) + " M 800 " + (MAT + 40) + " L 780 " + (MAT + 110), 2.5, "#4E4A44");
    giua += D.line("M -400 " + MAT + " L 1180 " + MAT, 4, D.INK, ' opacity="0.6"');
    var gan = '<g id="maiTien">' + D.paper("M -300 -60 L 1700 -60 L 1640 150 C 1100 170 400 200 -300 240 Z", "#2A3138", { stroke: true, sw: 5, shadow: false });
    for (var x = -280; x < 1640; x += 26) gan += D.line("M " + x + " -40 L " + (x - 8) + " " + (236 - (x + 300) * 0.045), 3, "#46505A");
    gan += "</g>";
    return { troi: troi, xa: xa, giua: giua, gan: gan, mat: MAT };
  }
  var P = MEP(true);

  var tSword = T("sword", 0, 3.88), tMorn = T("morning", 0, 5.94) - 0.3, tArm = T("arm", 0, 6.8), tNot = T("Not", 0, 7.45), tHave = T("have", 0, 8.63);
  var S = 0.6;
  // bình xịt dựng đứng trước ngực (toạ độ con rối; con rối nằm xoay -90 nên xoay bình +90)
  var BX = '<g id="W-bx"><g transform="translate(212,262) rotate(90) scale(1.15)">' + ND.binhXit("bxW") + "</g></g>";
  var W = ND.wob(api, "W", { lung: 0, khongMu: true, phuKien: BX });
  var MX = 760, MY = P.mat;   // chiếu trên mép đảo
  var giua = P.giua + at(MX, MY - 2, ND.chieu(560));
  // ba lô làm gối (nằm ngang), mũ cói cạnh gối
  giua += at(MX - 250, MY - 4, '<g transform="rotate(-90)">' + sc(0.5, ND.baLo("pk", { binh: false })) + "</g>");
  giua += at(190, MY - 16, '<g id="muGoi"><g transform="rotate(-6)">' + ND.muCoi("", 0.62) + "</g></g>");
  giua += at(MX + 130, MY - 2, '<g id="bxSang">' + sc(0.8, ND.binhXit("bxS")) + "</g>");
  giua += W.svg;

  api.dat(P.troi + api.lop("xa", P.xa, 0.35, { mat: 610 }) + api.lop("giua", giua, 1, { mat: P.mat }) + api.lop("gan", P.gan, 1.4, { mat: 0 }) + ND.defs() +
    '<rect id="phuDem" x="0" y="0" width="1920" height="1080" fill="#0E1A2C" opacity="0.18"/>');
  api.noi({ kieu: { gan: "truot-tren" } });

  // ---------- nửa đêm: nằm ngủ ôm bình như hiệp sĩ ôm kiếm ----------
  api.camera([[0, 820, 640, 1.18], [tMorn, 840, 650, 1.26, "sine.inOut"], [tMorn + 0.01, 860, 640, 1.2, "step"], [DUR, 880, 650, 1.3, "sine.inOut"]]);
  var lyY = MY - 6 - 122 * S;
  W.set(0, { x: 690, y: lyY, size: S, lean: -90, lid: 62, aLu: -40, aLf: -100, aRu: 40, aRf: 100 });
  W.mouth(0, "thang");
  W.breathe(0, tMorn, 2.2);
  // ngực phập phồng, bình xịt nhô lên ở "sword"
  api.origin("#W-bx", "212 262");
  api.key("#W-bx", "y", 0, 0, "step"); api.key("#W-bx", "y", tSword - 0.1, 0, "none"); api.key("#W-bx", "y", tSword + 0.25, -12, "back.out(2)"); api.key("#W-bx", "y", tSword + 0.9, 0, "sine.inOut");
  W.pose(tSword, 0.25, { aLf: -112, aRf: 112 }, "power2.out"); W.pose(tSword + 0.8, 0.3, { aLf: -100, aRf: 100 }, "sine.inOut");
  W.mouth(tSword + 0.1, "smirk"); W.mouth(tSword + 1.0, "thang");
  api.origin("#muGoi", "0 0");

  // ---------- sáng: cắt cùng khung, trời đổi màu ----------
  api.show("#troiSang", 0, 0); api.show("#troiSang", tMorn, 1);
  api.show("#saoDem", 0, 1); api.show("#saoDem", tMorn, 0);
  api.show("#phuDem", 0, 0.18); api.show("#phuDem", tMorn, 0);
  // ngồi dậy trên chiếu, chìa tay vuốt như đọc chữ nổi
  W.set(tMorn, { lean: 0, y: MY + 42, x: MX - 40, lid: 0, legL: 72, legR: -72, sy: 0.96, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: 0, pupY: 0 });
  api.show("#W-bx", 0, 1); api.show("#W-bx", tMorn, 0); api.show("#bxSang", 0, 0); api.show("#bxSang", tMorn, 1);
  W.mouth(tMorn, "X");
  W.pose(tMorn + 0.15, 0.3, { aRu: -96, aRf: 0, pupX: 10, pupY: 4 }, "power2.out");
  // tay trái vuốt dọc cánh tay phải
  W.pose(tArm - 0.25, 0.25, { aLu: -112, aLf: -6 }, "power2.out");
  W.pose(tArm + 0.05, 0.5, { aLu: -96, aLf: -2 }, "sine.inOut"); W.pose(tArm + 0.55, 0.15, { aLu: -112, aLf: -6 }, "sine.inOut");
  W.mouth(tArm, "thang");
  // lật tay xem mặt dưới: trơn láng
  api.origin("#W-hR", "0 0");
  api.key("#W-hR", "scaleX", 0, 1, "step"); api.key("#W-hR", "scaleX", tNot - 0.25, 1, "none"); api.key("#W-hR", "scaleX", tNot - 0.12, 0.1, "power2.in"); api.key("#W-hR", "scaleX", tNot, 1, "power2.out");
  W.pose(tNot - 0.2, 0.25, { aRf: -14, aLu: 18, aLf: -10, pupY: 8 }, "power2.out");
  W.pose(tNot + 0.2, 0.12, { eye: 1.12 }, "power2.out");
  W.mouth(tNot + 0.2, "o");
  // khoanh tay, phồng má, hờn dỗi nhìn sang đảo đước
  W.pose(tHave - 0.2, 0.3, { aLu: -128, aLf: -70, aRu: 128, aRf: 70, eye: 1, lid: 24, pupX: 12, pupY: -2, upRot: 4, sy: 0.98 }, "back.out(1.4)");
  W.mouth(tHave - 0.1, "flat");
  for (var t = tHave + 0.3, k = 0; t < DUR - 0.6; t += 0.55, k++) W.pose(t, 0.25, { sx: k % 2 ? 1 : 1.04, sy: k % 2 ? 0.98 : 0.95 }, "sine.inOut");
  W.autoBlink(tMorn + 0.3, tHave - 0.3, 27);
};
