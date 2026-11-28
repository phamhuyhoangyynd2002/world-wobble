/* Đoạn d42 · cắt giấy · đoạn nghiêm, kể ở bàn kỷ vật (đồ ở nhà). Không gag, không sfx.
   Trang tông trầm: phong bì giấy đi chầm chậm qua trang tới toà nhà có hàng cột (dạng chung, KHÔNG cờ, KHÔNG chữ) ở "European Court"; Wob nhìn theo.
   Tờ thoả thuận trên bàn giấy được gấp lại đúng "ended", đặt sang một bên (không xé). Tờ giấy trắng mới đặt lên bàn giữa hai ghế trống đối diện nhau;
   tay Wob từ mép trang đẩy góc tờ giấy cho nằm thẳng rồi rút tay; camera lùi chậm; Wob nhìn hai ghế trống. Vào "cat", ra "cat". Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tEuro = T("european", 0, 4.15), tCourt = T("court", 0, 4.55), tIn = T("in", 0, 7.05), tEnded = T("ended", 0, 8.71), tChanged = T("changed", 0, 12.67),
    tLKAB = T("lkab", 1, 13.41), tLook = T("look", 1, 14.71), tTalk = T("talk.", 0, 15.57);
  var B = KR.banTrang({ sd: 4201 }), P = B.P, TM = M.T;

  // ---------- trang ----------
  var tr = "";
  tr += line("M 360 560 L 1740 560", 4, TM.nau, ' opacity="0.5"');
  // toà nhà có hàng cột (KHÔNG cờ, KHÔNG chữ)
  var TX = 1520, TB = 560, ton = "";
  ton += paper(rRect(TX - 190, TB - 24, 380, 24, 1, 4202), "#BDB4A4", { stroke: true, sw: 3.5, shadow: false }) + paper(rRect(TX - 170, TB - 44, 340, 22, 1, 4203), "#C9C0B0", { stroke: true, sw: 3.5, shadow: false });
  ton += paper(rRect(TX - 160, TB - 220, 320, 176, 1, 4204), "#D2CABA", { stroke: true, sw: 4, shadow: false });
  for (var c = 0; c < 6; c++) ton += paper(rRect(TX - 140 + c * 54, TB - 214, 24, 168, 1, 4205 + c), "#E6DFD0", { stroke: true, sw: 3, shadow: false });
  ton += paper("M " + (TX - 186) + " " + (TB - 220) + " L " + TX + " " + (TB - 300) + " L " + (TX + 186) + " " + (TB - 220) + " Z", "#C9C0B0", { stroke: true, sw: 4, shadow: false });
  ton += '<rect x="' + (TX - 20) + '" y="' + (TB - 110) + '" width="40" height="64" fill="#6E6458" stroke="' + INK + '" stroke-width="3"/>';
  tr += ton;
  // phong bì
  var pb = '<g id="pb"><g id="pbT">' + paper(rRect(-48, -32, 96, 64, 1, 4211), "#F2EAD6", { stroke: true, sw: 4, shadow: false }) + line("M -48 -32 L 0 6 L 48 -32", 3.5) + "</g></g>";
  // bàn giấy 1 + tờ thoả thuận
  var B1X = 590, B1Y = 650;
  tr += paper(rRect(B1X - 200, B1Y, 400, 20, 1, 4212), "#8A7A66", { stroke: true, sw: 4, shadow: false }) + line("M " + (B1X - 180) + " " + (B1Y + 20) + " L " + (B1X - 180) + " " + (B1Y + 140) + " M " + (B1X + 180) + " " + (B1Y + 20) + " L " + (B1X + 180) + " " + (B1Y + 140), 8, "#6E604E");
  var tt = '<g id="tt"><g id="ttG">' + paper(rRect(-110, -70, 220, 70, 1, 4213), "#F6F0E2", { stroke: true, sw: 3.5, shadow: false });
  for (var l = 0; l < 4; l++) tt += line("M -94 " + (-58 + l * 14) + " L " + (l === 3 ? 20 : 94) + " " + (-58 + l * 14), 2.5, "#8E8270");
  tt += '<g id="nep" opacity="0">' + line("M -110 -35 L 110 -35", 3, "#B8AC94") + "</g></g></g>";
  // bàn 2 + hai ghế trống đối diện nhau, gần mép dưới trang
  var B2X = 1090, B2Y = 770;
  tr += paper("M " + (B2X - 120) + " " + B2Y + " L " + (B2X + 120) + " " + B2Y + " L " + (B2X + 104) + " " + (B2Y - 50) + " L " + (B2X - 104) + " " + (B2Y - 50) + " Z", "#8A7A66", { stroke: true, sw: 4, shadow: false });
  tr += paper(rRect(B2X - 120, B2Y, 240, 14, 1, 4214), "#6E604E", { stroke: true, sw: 3, shadow: false }) + line("M " + (B2X - 104) + " " + (B2Y + 14) + " L " + (B2X - 104) + " 872 M " + (B2X + 104) + " " + (B2Y + 14) + " L " + (B2X + 104) + " 872", 8, "#6E604E");
  function ghe(x, huong) {
    var s = line("M " + (x - 34) + " 872 L " + (x - 34) + " 800 M " + (x + 34) + " 872 L " + (x + 34) + " 800", 7, "#6E604E");
    s += paper(rRect(x - 44, 788, 88, 14, 1, 4215 + x), "#8A7A66", { stroke: true, sw: 3.5, shadow: false });
    var bx = huong > 0 ? x - 44 : x + 32;
    s += paper(rRect(bx, 690, 12, 100, 1, 4216 + x), "#8A7A66", { stroke: true, sw: 3.5, shadow: false });
    return s;
  }
  tr += ghe(B2X - 220, 1) + ghe(B2X + 220, -1);
  var gt = '<g id="gt">' + at(B2X, B2Y - 26, '<g id="gtR">' + paper("M -70 -16 L 64 -20 L 70 16 L -64 20 Z", "#FFFFFF", { stroke: true, sw: 3.5, shadow: false }) + "</g>") + "</g>";
  // tay Wob vươn từ mép dưới khung (như d23)
  var tay = '<g id="tay"><g transform="rotate(30)">' + line("M 0 0 L 0 900", 40, INK) + line("M 0 0 L 0 900", 24, "#2E3338") + "</g>" + '<circle cx="0" cy="0" r="30" fill="' + INK + '"/></g>';

  var W = KR.wob(api, "W", { mua: "nha" });
  api.dat(KR.defs() + api.lop("ban", B.nen + KR.mocAo() + B.trang + tr + tt + gt + pb + '<clipPath id="d42vai"><rect x="-1000" y="-1000" width="4000" height="1905"/></clipPath><g clip-path="url(#d42vai)">' + tay + "</g>" + W.svg + B.den, 1, { mat: 1010 }));
  api.noi({});

  // ---------- camera ----------
  api.camera([[0, 980, 560, 1.12], [tCourt + 0.3, 1100, 575, 1.18, "sine.inOut"], [tIn - 0.2, 1080, 575, 1.18, "sine.inOut"], [tIn + 0.9, 760, 640, 1.4, "power2.inOut"],
    [tLKAB - 0.3, 780, 650, 1.42, "sine.inOut"], [tLKAB + 0.7, 1000, 860, 2.1, "power2.inOut"], [tLook + 0.1, 1004, 864, 2.16, "sine.inOut"], [DUR, 1000, 700, 1.5, "sine.inOut"]]);

  // ---------- phong bì đi chầm chậm tới toà nhà ----------
  var d = api.duong([[420, 300], [700, 250], [1000, 260], [1300, 360], [TX, TB - 80]]);
  api.origin("#pb", "0 0"); api.origin("#pbT", "0 0");
  var p0 = 0.3, p1 = tCourt;
  for (var s = 0; s <= 16; s++) {
    var u = s / 16, t = p0 + (p1 - p0) * u, p = d.at(KR.ss(u));
    api.key("#pb", "x", t, p.x, s ? "none" : undefined); api.key("#pb", "y", t, p.y + (s % 2 ? -4 : 4), s ? "none" : undefined);
    api.key("#pbT", "rotation", t, (s % 2 ? 4 : -4), s ? "sine.inOut" : undefined);
  }
  api.key("#pb", "scale", 0, 1); api.key("#pb", "scale", tCourt, 1, "none"); api.key("#pb", "scale", tCourt + 0.4, 0.3, "power2.in");
  api.key("#pb", "opacity", 0, 1); api.key("#pb", "opacity", tCourt + 0.25, 1, "none"); api.key("#pb", "opacity", tCourt + 0.45, 0, "power1.in");

  // ---------- tờ thoả thuận: gấp đúng "ended", đặt sang bên ----------
  api.set("#tt", 0, { x: B1X, y: B1Y });
  api.origin("#ttG", "0 0");
  api.key("#ttG", "scaleY", 0, 1); api.key("#ttG", "scaleY", tEnded - 0.05, 1, "none"); api.key("#ttG", "scaleY", tEnded + 0.3, 0.5, "power2.inOut");
  api.show("#nep", 0, 0); api.show("#nep", tEnded + 0.3, 1);
  api.key("#tt", "x", 0, B1X); api.key("#tt", "x", tEnded + 0.6, B1X, "none"); api.key("#tt", "x", tEnded + 1.3, B1X - 90, "sine.inOut");
  api.origin("#tt", "0 0");
  api.key("#tt", "rotation", 0, 0); api.key("#tt", "rotation", tEnded + 0.6, 0, "none"); api.key("#tt", "rotation", tEnded + 1.3, -3, "sine.inOut");

  // ---------- tờ giấy trắng mới giữa hai ghế; tay Wob đẩy thẳng ----------
  api.origin("#gt", B2X + " " + (B2Y - 26)); api.origin("#gtR", "0 0");
  api.key("#gt", "opacity", 0, 0); api.key("#gt", "y", 0, -60);
  api.key("#gt", "opacity", tLKAB, 0, "none"); api.key("#gt", "y", tLKAB, -60, "none");
  api.key("#gt", "opacity", tLKAB + 0.3, 1, "sine.out"); api.key("#gt", "y", tLKAB + 0.5, 0, "power2.out");
  api.key("#gtR", "rotation", 0, -11);
  var tDay = tLook - 0.1;
  api.key("#gtR", "rotation", tDay, -11, "none"); api.key("#gtR", "rotation", tDay + 0.45, 0, "sine.inOut");
  api.key("#gtR", "x", 0, -6); api.key("#gtR", "x", tDay, -6, "none"); api.key("#gtR", "x", tDay + 0.45, 0, "sine.inOut");
  // tay vào từ mép dưới, đặt vào góc trái dưới tờ giấy, đẩy, rút ra
  var gx = B2X - 64, gy = B2Y - 6;
  api.origin("#tay", "0 0");
  api.key("#tay", "x", 0, gx - 300); api.key("#tay", "y", 0, gy + 520);
  api.key("#tay", "x", tDay - 0.55, gx - 300, "none"); api.key("#tay", "y", tDay - 0.55, gy + 520, "none");
  api.key("#tay", "x", tDay - 0.05, gx - 4, "power2.out"); api.key("#tay", "y", tDay - 0.05, gy + 6, "power2.out");
  api.key("#tay", "x", tDay + 0.45, gx + 4, "sine.inOut"); api.key("#tay", "y", tDay + 0.45, gy - 2, "sine.inOut");
  api.key("#tay", "x", tDay + 0.75, gx + 4, "none"); api.key("#tay", "y", tDay + 0.75, gy - 2, "none");
  api.key("#tay", "x", tDay + 1.25, gx - 300, "power2.in"); api.key("#tay", "y", tDay + 1.25, gy + 520, "power2.in");

  // ---------- Wob ----------
  var WX = 600, WY = 1010;
  W.set(0, { x: WX, y: WY, size: 0.6, pupX: -8, pupY: -24 });
  W.mouth(0, "thang");
  W.pose(0.6, 1.6, { pupX: 4, pupY: -26, upRot: -2 }, "sine.inOut");
  W.pose(2.4, 1.8, { pupX: 18, pupY: -24, upRot: 0 }, "sine.inOut");
  W.idle(0.3, tEnded + 1.4, { seed: 421, bien: 0.8 });
  W.walk(tEnded + 1.5, tEnded + 2.7, WX, 880, { step: 0.34 });
  W.idle(tEnded + 2.9, tLKAB, { seed: 423, bien: 0.6 });
  W.pose(tIn + 0.3, 0.6, { pupX: -6, pupY: -12, lid: 6 }, "sine.inOut");
  W.mouth(tEnded + 0.3, "buon");
  W.pose(tEnded + 0.8, 0.6, { pupX: -12, pupY: -10 }, "sine.inOut");
  W.pose(tChanged, 0.6, { pupX: 12, pupY: -6, lid: 10 }, "sine.inOut");
  W.pose(tDay - 0.6, 0.4, { aRu: -150, aRf: 0, pupX: 14, pupY: -16 }, "sine.inOut");
  W.pose(tDay + 1.0, 0.5, { aRu: -18, aRf: 10 }, "sine.inOut");
  // nhìn hai ghế trống
  W.pose(tTalk - 0.1, 0.6, { pupX: 16, pupY: -14, upRot: 2, lid: 12 }, "sine.inOut");
  W.mouth(tTalk + 0.2, "thang");
  W.idle(tLKAB + 0.1, DUR, { seed: 422, bien: 0.6 });
  W.autoBlink(0.3, DUR, 4201);
};
