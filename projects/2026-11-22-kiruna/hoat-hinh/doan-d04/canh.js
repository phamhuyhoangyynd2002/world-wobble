/* d04 – Trang lịch sử tông cũ trên bàn kỷ vật nhìn từ trên: 1736 một người mặc áo choàng mùa đông (người giấy chung, không mặt)
   mang hòn đá đen tới bàn viên chức (bóng tóc giả); túi thưởng, tờ thuế bị gạch; thước thời gian 1736 → 1900, khoảng giữa chỉ có tuyết;
   Wob phủi tuyết thấy một cánh cửa nhỏ đóng băng (manh mối, không nhãn), nhún vai.
   Cắt giấy, nhóm A. Chữ: 1736, 1900. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, XL = window.XuLanh, ND = window.NhietDoi, DUR = api.DUR, at = api.at, line = D.line, paper = D.paper, CH = data.chu_tren_do_vat;
  function T(w, lo, k) { return api.tuDung(w, lo || 0, k || 0); }
  var t36 = T("thirty-six,"), tSami = T("sámi"), tRep = T("reported"), tOre = T("ore"), tRew = T("reward,"), tTax = T("taxes"), tThe = T("the", 9), tNin = T("nineteen"), tHun = T("hundred.");
  var S = XL.M.S || {};

  /* ---------- bàn kỷ vật nhìn từ trên + trang cũ ---------- */
  var ban = XL.banTuTren({ den: [1740, 100], coc: [140, 940] });
  var PX = 240, PY = 70, PW = 1380, PH = 880;
  var tr = at(PX, PY, XL.trangCu(PW, PH, { seed: 4040 }));
  // đồi tuyết tông cũ (không nhãn)
  var doi = paper(D.rough([[PX + 20, 640], [420, 520], [640, 600], [880, 470], [1120, 560], [1380, 450], [PX + PW - 20, 560], [PX + PW - 20, 830], [PX + 20, 830]], 5, 4041, 26), "#E9D9B4", { stroke: true, sw: 4, shadow: false });
  doi += paper(D.rough([[PX + 20, 760], [600, 720], [1000, 750], [1400, 715], [PX + PW - 20, 740], [PX + PW - 20, 900], [PX + 20, 900]], 4, 4042, 26), "#F1E6CC", { stroke: true, sw: 4, shadow: false });
  [[520, 548], [930, 500], [1380, 480]].forEach(function (p, i) { doi += paper("M " + (p[0] - 40) + " " + (p[1] + 40) + " L " + p[0] + " " + (p[1] - 10) + " L " + (p[0] + 40) + " " + (p[1] + 40) + " Z", "#F7F0DE", { stroke: true, sw: 3, shadow: false }); });
  // bàn gỗ viên chức (tông cũ)
  var BX = 1240, BY = 760;
  var banGo = paper(D.rRect(BX - 130, BY - 70, 260, 30, 1.5, 4043), "#9A7650", { stroke: true, sw: 4.5 }) + line("M " + (BX - 110) + " " + (BY - 40) + " L " + (BX - 110) + " " + (BY + 20) + " M " + (BX + 110) + " " + (BY - 40) + " L " + (BX + 110) + " " + (BY + 20), 12, "#7A5A3A");
  var da = '<path d="M -18 0 C -22 -16 -8 -26 6 -24 C 20 -22 24 -8 18 0 Z" fill="#2A2622" stroke="#1f2326" stroke-width="3"/><path d="M -6 -18 L 4 -20" stroke="#8A8F94" stroke-width="3" fill="none" opacity="0.7"/>';
  var ng = XL.nguoiQue(api, "ng", { s: 1.05, sep: true, dai: true, mu: "trum", ao: "#7E6A52", cam: '<g id="daCam">' + da + "</g>" });
  var qc = XL.nguoiQue(api, "qc", { s: 1.0, sep: true, mu: "toc", ao: "#5E4A3A", lat: -1 });
  var daBan = '<g id="daBan">' + at(BX - 70, BY - 70, da) + "</g>";
  var tui = '<g id="tui"><path d="M -18 0 C -26 -20 -12 -34 0 -34 C 12 -34 26 -20 18 0 Z" fill="#B08A56" stroke="#1f2326" stroke-width="3.5"/><path d="M -10 -30 L 10 -30" stroke="#5A3E22" stroke-width="4"/></g>';
  var thue = '<g id="thue">' + paper(D.rRect(BX - 20, BY - 60, 110, 56, 1, 4044), "#F6EDD6", { stroke: true, sw: 3.5, sx: 3, sy: 4 }) + line("M " + (BX + 4) + " " + (BY - 46) + " L " + (BX + 86) + " " + (BY - 46) + " M " + (BX + 4) + " " + (BY - 32) + " L " + (BX + 86) + " " + (BY - 32) + " M " + (BX + 4) + " " + (BY - 18) + " L " + (BX + 70) + " " + (BY - 18), 2.5, "#B89878") +
    '<g id="gach1">' + line("M " + (BX - 4) + " " + (BY - 56) + " L " + (BX + 96) + " " + (BY - 8), 7, "#3A2A1E") + '</g><g id="gach2">' + line("M " + (BX + 96) + " " + (BY - 56) + " L " + (BX - 4) + " " + (BY - 8), 7, "#3A2A1E") + "</g></g>";
  // con thiêu thân giấy (từ d03) đậu thành nhãn 1736
  var moth = '<g id="moth"><g id="mothW1">' + '<path d="M 0 0 C -30 -34 -62 -20 -50 6 C -40 22 -14 14 0 0 Z" fill="#D8C7A0" stroke="#1f2326" stroke-width="3.5"/></g><g id="mothW2"><path d="M 0 0 C 30 -34 62 -20 50 6 C 40 22 14 14 0 0 Z" fill="#D8C7A0" stroke="#1f2326" stroke-width="3.5"/></g>' +
    '<ellipse cx="0" cy="4" rx="7" ry="20" fill="#8A6E4A" stroke="#1f2326" stroke-width="3"/><path d="M -3 -14 C -10 -28 -16 -30 -20 -32 M 3 -14 C 10 -28 16 -30 20 -32" stroke="#1f2326" stroke-width="2.5" fill="none"/></g>';
  var the36 = '<g id="the36v"><g id="the36" transform="rotate(-4)">' + ND.theChu("", CH[0], 60, { seed: 4050, nen: "#F3E6C4" }) + "</g></g>";
  // thước thời gian giấy (trên mặt bàn, mép dưới trang)
  var RY = 1040, RX0 = 300, RX1 = 1560;
  var thuoc = '<g id="thuoc">' + paper(D.rRect(RX0 - 40, RY - 26, RX1 - RX0 + 80, 52, 1.5, 4060), "#F3E6C4", { stroke: true, sw: 4.5, sx: 6, sy: 8 });
  for (var x = RX0; x <= RX1; x += 42) thuoc += line("M " + x + " " + (RY - 24) + " L " + x + " " + (RY - ((x - RX0) % 210 ? 10 : 2)), 3, "#8E6E4A");
  thuoc += "</g>";
  var the00 = '<g id="the00" transform="translate(' + RX1 + "," + (RY - 92) + ') rotate(3)">' + ND.theChu("", CH[1], 60, { seed: 4051, nen: "#F3E6C4" }) + "</g>";
  var MID = 930;
  var dong = '<g transform="translate(' + MID + "," + (RY - 18) + ')"><g id="dong">' + D.snowPile(300, 120, 4070) + "</g></g>";
  var cua = '<g id="cua" transform="translate(' + MID + "," + (RY - 30) + ')">' + paper(D.rRect(-40, -70, 80, 74, 1.5, 4071), "#B9D6E2", { stroke: true, sw: 4, sx: 3, sy: 4 }) + '<rect x="-30" y="-60" width="60" height="56" fill="none" stroke="#7FA6B8" stroke-width="3"/>' +
    '<circle cx="22" cy="-30" r="5" fill="#5E86A0" stroke="#1f2326" stroke-width="2"/>' + line("M -38 -68 L -20 -52 L -30 -40 M 38 -70 L 26 -56", 3, "#F7FBFC") + "</g>";
  var tuyet = '<g id="tuyetRoi">';
  var rr = D.rng(4080);
  for (var k = 0; k < 26; k++) tuyet += '<circle id="sf' + k + '" cx="' + (MID - 240 + rr() * 480).toFixed(0) + '" cy="0" r="' + (4 + rr() * 5).toFixed(1) + '" fill="#FFFFFF" stroke="#C9D8DF" stroke-width="1.5"/>';
  tuyet += "</g>";
  var W = XL.wob(api, "W", { ao: null, noPack: true });

  var trang = '<g id="trangG">' + tr + doi + qc + banGo + daBan + thue + ng + '<g transform="translate(' + (BX - 40) + "," + (BY - 76) + ')">' + tui + "</g></g>";
  var lop = api.lop("ban", ban.nen + trang + W.svg + thuoc + dong + cua + tuyet + the00 + the36v() + moth + ban.den, 1, { mat: 900 });
  function the36v() { return the36; }
  api.dat(XL.defs() + lop);
  api.noi({});

  api.camera([[0, 960, 540, 1.0], [5.0, 940, 540, 1.04, "sine.inOut"], [tThe - 0.1, 930, 545, 1.05, "sine.inOut"], [tThe + 0.6, 945, 660, 1.1, "power2.inOut"], [DUR, 940, 670, 1.12, "sine.out"]], ["ban"]);
  api.sfx("lat-giay", 0.1, 0.5);

  /* thiêu thân bay vào, đậu góc trang thành nhãn 1736 */
  var LX = PX + 150, LY = PY + 90;
  api.key("#moth", "x", 0, 1700); api.key("#moth", "y", 0, 260);
  api.key("#moth", "x", t36 - 0.6, 900, "sine.inOut"); api.key("#moth", "y", t36 - 0.6, 120, "sine.inOut");
  api.key("#moth", "x", t36, LX + 70, "power2.out"); api.key("#moth", "y", t36, LY - 46, "power2.out");
  api.origin("#mothW1", "0 0"); api.origin("#mothW2", "0 0");
  for (var f = 0, tf = 0; tf < t36 + 0.05; tf += 0.09, f++) { api.key("#mothW1", "scaleY", tf, f % 2 ? 0.3 : 1, "none"); api.key("#mothW2", "scaleY", tf, f % 2 ? 0.3 : 1, "none"); }
  api.key("#mothW1", "scaleY", t36 + 0.1, 0.55, "power2.out"); api.key("#mothW2", "scaleY", t36 + 0.1, 0.55, "power2.out");
  api.key("#the36v", "x", 0, LX); api.key("#the36v", "y", 0, LY);
  api.pop("#the36", t36 - 0.05, 0.25);
  // nhãn 1736 + thiêu thân trượt về đầu thước lúc thước hiện
  api.key("#the36v", "x", tThe, LX, "none"); api.key("#the36v", "y", tThe, LY, "none");
  api.key("#the36v", "x", tThe + 0.5, RX0, "power2.inOut"); api.key("#the36v", "y", tThe + 0.5, RY - 92, "power2.inOut");
  api.key("#moth", "x", tThe, LX + 70, "none"); api.key("#moth", "y", tThe, LY - 46, "none");
  api.key("#moth", "x", tThe + 0.5, RX0 + 70, "power2.inOut"); api.key("#moth", "y", tThe + 0.5, RY - 138, "power2.inOut");

  /* người mặc áo choàng: chỉ về đồi, đi tới bàn, đặt đá đúng "reported" */
  var NG0 = 430, GY = 830;
  api.key("#ng-vt", "x", 0, NG0); api.key("#ng-vt", "y", 0, GY);
  api.key("#qc-vt", "x", 0, BX + 60); api.key("#qc-vt", "y", 0, BY + 40);
  api.key("#ng-tR", "rotation", 0, 0); api.key("#ng-tR", "rotation", tSami - 0.2, 0, "none"); api.key("#ng-tR", "rotation", tSami + 0.15, -150, "power2.out"); api.key("#ng-tR", "rotation", tSami + 0.9, -150, "none"); api.key("#ng-tR", "rotation", tSami + 1.1, -10, "power2.inOut");
  XL.queDi(api, "ng", tSami + 1.1, tRep - 0.3, BX - 190);
  api.key("#ng-tR", "rotation", tRep - 0.25, -10, "none"); api.key("#ng-tR", "rotation", tRep, -86, "power2.out");
  api.show("#daCam", 0, 1); api.show("#daCam", tRep + 0.02, 0);
  api.show("#daBan", 0, 0); api.show("#daBan", tRep + 0.02, 1);
  api.key("#daBan", "y", 0, 0); api.key("#daBan", "y", tRep + 0.02, -10, "none"); api.key("#daBan", "y", tRep + 0.14, 0, "bounce.out");
  api.key("#ng-tR", "rotation", tRep + 0.4, -20, "power2.inOut");
  // viên chức gật đầu
  api.key("#qc-dau", "rotation", 0, 0); api.key("#qc-dau", "rotation", tOre, 0, "none"); api.key("#qc-dau", "rotation", tOre + 0.15, 12, "power2.out"); api.key("#qc-dau", "rotation", tOre + 0.35, 0, "power2.inOut");
  api.key("#qc-dau", "rotation", tOre + 0.5, 12, "power2.out"); api.key("#qc-dau", "rotation", tOre + 0.7, 0, "power2.inOut");
  // túi thưởng trượt qua bàn đúng "reward,"
  api.pop("#tui", tRew - 0.25, 0.2);
  api.key("#tui", "x", 0, 60); api.key("#tui", "x", tRew - 0.05, 60, "none"); api.key("#tui", "x", tRew + 0.35, -95, "power2.inOut");
  api.key("#tui", "y", 0, 0); api.key("#tui", "y", tRew + 0.2, -20, "power2.out"); api.key("#tui", "y", tRew + 0.35, 0, "power2.in");

  api.key("#qc-tR", "rotation", 0, 0); api.key("#qc-tR", "rotation", tRew - 0.3, 0, "none"); api.key("#qc-tR", "rotation", tRew, 70, "power2.out"); api.key("#qc-tR", "rotation", tRew + 0.6, 0, "power2.inOut");
  // tờ thuế bị gạch chéo đúng "taxes"
  api.pop("#thue", tTax - 0.3, 0.2);
  api.origin("#gach1", (BX - 4) + " " + (BY - 56)); api.origin("#gach2", (BX + 96) + " " + (BY - 56));
  api.key("#gach1", "scale", 0, 0); api.key("#gach1", "scale", tTax - 0.02, 0, "none"); api.key("#gach1", "scale", tTax + 0.12, 1, "power2.out");
  api.key("#gach2", "scale", 0, 0); api.key("#gach2", "scale", tTax + 0.14, 0, "none"); api.key("#gach2", "scale", tTax + 0.28, 1, "power2.out");

  /* Wob đứng ngoài mép trang (trên mặt bàn), nghiêng người nhìn */
  var WX = 1760, WY = 1060;
  W.set(0, { x: WX, y: WY, size: 0.72, aLu: 18, aLf: -10, aRu: -18, aRf: 10, pupX: -12, pupY: -6 });
  W.mouth(0, "flat"); W.autoBlink(0.4, DUR, 41);
  W.idle(0.2, tSami, { seed: 4, bien: 2 });
  W.pose(tSami, 0.4, { lean: -10, pupX: -16, pupY: -10 }, "power2.inOut");
  W.pose(tRep - 0.2, 0.25, { lean: -14, eye: 1.08, pupX: -16, pupY: -4 }, "power2.out");
  W.pose(tRep + 0.4, 0.4, { lean: -6, eye: 1 }, "sine.inOut");
  // vỗ tay hai cái (không tiếng)
  var tv = tRew + 0.1;
  W.pose(tv, 0.12, { aLu: -60, aLf: -40, aRu: 60, aRf: 40, lean: 0 }, "power2.out");
  W.pose(tv + 0.14, 0.1, { aLu: -38, aLf: -84, aRu: 38, aRf: 84 }, "power2.in");
  W.pose(tv + 0.26, 0.12, { aLu: -60, aLf: -40, aRu: 60, aRf: 40 }, "power2.out");
  W.pose(tv + 0.4, 0.1, { aLu: -38, aLf: -84, aRu: 38, aRf: 84 }, "power2.in");
  W.mouth(tv, "grin");
  W.pose(tv + 0.7, 0.3, { aLu: 18, aLf: -10, aRu: -18, aRf: 10 }, "sine.inOut"); W.mouth(tv + 0.8, "flat");

  /* thước thời gian 1736 → 1900, tuyết rơi khoảng giữa */
  api.origin("#thuoc", RX0 + " " + RY);
  api.key("#thuoc", "scaleX", 0, 0); api.key("#thuoc", "scaleX", tThe - 0.05, 0, "none"); api.key("#thuoc", "scaleX", tThe + 0.6, 1, "power2.inOut");
  api.sfx("lat-giay", tThe, 0.35);
  api.pop("#the00", tNin - 0.1, 0.25);
  for (var j = 0; j < 26; j++) {
    var sel = "#sf" + j, t0 = tThe + 0.3 + (j % 9) * 0.17, ys = RY - 260 - (j * 37) % 120;
    api.show(sel, 0, 0); api.show(sel, t0, 1);
    api.key(sel, "y", 0, ys); api.key(sel, "y", t0, ys, "none"); api.key(sel, "y", t0 + 0.9, RY - 30 - (j % 4) * 8, "none"); api.show(sel, t0 + 0.9, 0);
  }
  api.origin("#dong", "0 0"); api.show("#dong", 0, 0); api.show("#dong", tThe + 0.5, 1);
  api.key("#dong", "scaleY", 0, 0); api.key("#dong", "scaleY", tThe + 0.5, 0.05, "none"); api.key("#dong", "scaleY", tThe + 1.3, 1, "power1.out");
  api.key("#dong", "scaleX", 0, 0.6); api.key("#dong", "scaleX", tThe + 1.3, 1, "power1.out");
  // Wob đi tới giữa thước, cúi phủi tuyết, thấy cánh cửa nhỏ, nhún vai
  W.pose(tThe - 0.1, 0.2, { lean: 0, pupX: -14, pupY: 4 }, "power2.out");
  W.walk(tThe + 0.1, tThe + 0.85, WX, MID + 170, { step: 0.25 });
  var tP = tThe + 0.95;
  W.pose(tP, 0.2, { lean: -24, aLu: 18, aLf: -10, aRu: -60, aRf: 20, pupX: -12, pupY: 14 }, "power2.out");
  for (var p = 0; p < 3; p++) { W.pose(tP + 0.2 + p * 0.2, 0.1, { aRu: -110, aRf: 30 }, "power2.out"); W.pose(tP + 0.3 + p * 0.2, 0.1, { aRu: -50, aRf: 10 }, "power2.in"); }
  api.key("#dong", "x", 0, 0); api.key("#dong", "x", tP + 0.2, 0, "none"); api.key("#dong", "x", tP + 0.8, -90, "power2.out");
  api.key("#dong", "scaleY", tP + 0.2, 1, "none"); api.key("#dong", "scaleY", tP + 0.8, 0.35, "power2.out");
  api.show("#cua", 0, 0); api.fade("#cua", tP + 0.45, 0.25, 1);
  var tS = tP + 0.85;
  W.pose(tS - 0.1, 0.2, { lean: -4, eye: 1.1, pupX: -10, pupY: 12 }, "power2.out"); W.mouth(tS - 0.1, "o");
  W.pose(tS + 0.15, 0.2, { lean: 0, aLu: 120, aLf: -40, aRu: -120, aRf: 40, upY: 6, pupX: 0, pupY: 0, eye: 1 }, "power2.out"); W.mouth(tS + 0.15, "thang");
  W.pose(DUR - 0.25, 0.2, { upY: 0 }, "sine.inOut");
};
