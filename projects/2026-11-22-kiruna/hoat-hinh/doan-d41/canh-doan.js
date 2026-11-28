/* Đoạn d41 · cắt giấy · đoạn nghiêm, kể ở bàn kỷ vật (đồ ở nhà). Không gag, không sfx.
   Trang như d40: núi thấp, vệt đường còn lại sau núi. Khung ô vuông nét mực (khu mỏ dự kiến) đặt chồng lên vệt đường ở "right on the route", nhãn Per Geijer;
   tập hồ sơ không chữ; nam châm giấy + xe điện giấy đặt lặng lẽ cạnh khung. Hai thẻ CÙNG CỠ bật dựng ở mép trang, quay ra mặt bàn, đối xứng:
   GABNA (tuần lộc trước vệt đường bị chặn) ở "Gabna's", LKAB (tháp giếng mỏ, cùng mảnh đất) ở "LKAB's". Wob đứng trên mặt bàn giữa hai thẻ, nhìn như nhau.
   Không chân dung người. Vào "cat", ra "cat". Chữ: chỉ Per Geijer, GABNA, LKAB. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, CH = data.chu_tren_do_vat, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line, f1 = D.f1;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tRight = T("right", 0, 3.59), tLKAB = T("lkab", 1, 4.87), tCompany = T("company", 0, 11.89), tMagnets = T("magnets", 0, 14.05),
    tGabna = T("gabna's", 0, 15.49), tLKAB2 = T("lkab's", 0, 20.59), tBoth = T("both", 0, 25.07), tLand = T("land.", 0, 26.43);
  var B = KR.banTrang({ sd: 4101 }), P = B.P, TM = M.T;

  // ---------- trang (như d40) ----------
  var HY = 560;
  var tr = '<clipPath id="d41trang"><rect x="' + (P.x + 4) + '" y="' + (P.y + 4) + '" width="' + (P.w - 8) + '" height="' + (P.h - 8) + '"/></clipPath><g clip-path="url(#d41trang)">';
  tr += '<rect x="' + P.x + '" y="' + P.y + '" width="' + P.w + '" height="' + (HY - P.y) + '" fill="#D9D6CE"/><rect x="' + P.x + '" y="' + HY + '" width="' + P.w + '" height="' + (P.y + P.h - HY) + '" fill="#EEEDE8"/>';
  tr += '<path d="M 360 420 C 520 330 760 300 900 300 C 1080 300 1260 330 1380 420 C 1460 480 1560 520 1740 540" fill="none" stroke="' + TM.muc + '" stroke-width="6" stroke-dasharray="18 12" opacity="0.85"/>';
  tr += paper("M 520 " + HY + " C 640 430 760 370 880 366 C 1000 362 1120 420 1260 " + HY + " Z", "#9C968C", { stroke: true, sw: 4, shadow: false });
  tr += '<path d="M 760 392 C 820 372 940 368 1010 384" fill="none" stroke="#F4F4F0" stroke-width="10" stroke-linecap="round"/>';
  for (var i = 0; i < 22; i++) tr += at(260 + i * 78, HY + 8, KR.cayBachDuong(52 + (i % 3) * 10, 4110 + i), 1);
  tr += "</g>";
  // khung ô vuông nét mực (khu mỏ dự kiến) chồng lên vệt đường
  var FX = 1270, FY = 280, FW = 300, FH = 260, kh = '<rect x="' + FX + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" fill="#5A4A3A" opacity="0.08"/>';
  for (var g = 1; g < 5; g++) kh += line("M " + (FX + g * FW / 5) + " " + FY + " L " + (FX + g * FW / 5) + " " + (FY + FH) + " M " + FX + " " + (FY + g * FH / 5) + " L " + (FX + FW) + " " + (FY + g * FH / 5), 2.5, TM.muc, ' opacity="0.55"');
  kh += '<rect x="' + FX + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" fill="none" stroke="' + TM.muc + '" stroke-width="6"/>';
  var khung = '<g id="khung">' + kh + "</g>";
  var nhan = '<g id="nhanPG">' + at(FX + FW / 2, FY - 44, KR.the("nhanPGi", CH[0], 50, { seed: 4120, nen: "#F3EAD8" })) + "</g>";
  // tập hồ sơ không chữ
  var hs = '<g id="hs">' + at(1660, 470, '<g transform="rotate(6)">' + paper("M -100 -70 L -40 -70 L -28 -86 L 30 -86 L 40 -70 L 100 -70 L 100 80 L -100 80 Z", "#D9B97A", { stroke: true, sw: 4, shadow: false }) +
    paper(rRect(-92, -58, 184, 132, 1, 4121), "#E8CF94", { stroke: true, sw: 3, shadow: false }) + "</g>") + "</g>";
  // nam châm giấy + xe điện giấy
  var nc = '<g id="nc">' + at(960, 640, '<path d="M -46 -40 L -46 10 C -46 50 46 50 46 10 L 46 -40 L 20 -40 L 20 10 C 20 22 -20 22 -20 10 L -20 -40 Z" fill="#A8443A" stroke="' + INK + '" stroke-width="4"/>' +
    '<rect x="-46" y="-56" width="26" height="18" fill="#C9CDD2" stroke="' + INK + '" stroke-width="3"/><rect x="20" y="-56" width="26" height="18" fill="#C9CDD2" stroke="' + INK + '" stroke-width="3"/>') + "</g>";
  var xe = '<g id="xe">' + at(1150, 664, paper("M -80 0 L -80 -30 C -70 -40 -50 -42 -40 -42 L -20 -66 L 40 -66 L 60 -42 L 80 -38 L 84 0 Z", "#7E9AA0", { stroke: true, sw: 4, shadow: false }) +
    '<path d="M -14 -60 L 34 -60 L 50 -42 L -26 -42 Z" fill="#DDE6E8" stroke="' + INK + '" stroke-width="3"/>' +
    '<circle cx="-50" cy="2" r="16" fill="#2E2A28" stroke="' + INK + '" stroke-width="3"/><circle cx="52" cy="2" r="16" fill="#2E2A28" stroke="' + INK + '" stroke-width="3"/>' +
    line("M 84 -20 C 110 -20 110 10 130 10", 4) + '<rect x="126" y="2" width="16" height="14" fill="#C9CDD2" stroke="' + INK + '" stroke-width="3"/>') + "</g>";
  // hai thẻ pop-up CÙNG CỠ ở mép trang, đối xứng qua giữa trang (x 1050)
  var CW = 440, CHt = 300, CBY = P.y + P.h, CL = 620, CR = 1480;
  function dat() { return paper("M -170 60 C -100 40 100 40 170 60 L 170 110 L -170 110 Z", "#B9B2A2", { stroke: true, sw: 3, shadow: false }); }
  function the(id, x, chu, hinh, sd) {
    var s = paper(rRect(-CW / 2, -CHt, CW, CHt, 1.5, sd), "#EFE8D8", { stroke: true, sw: 5, sx: 6, sy: 8 });
    s += '<rect x="' + (-CW / 2 + 12) + '" y="' + (-CHt + 12) + '" width="' + (CW - 24) + '" height="' + (CHt - 24) + '" fill="none" stroke="' + TM.nau + '" stroke-width="2.5" opacity="0.6"/>';
    s += D.txt(0, -CHt + 66, chu, 56, { w: 800, fill: TM.muc });
    s += at(0, -150, dat() + hinh);
    s += line("M " + (-CW / 2 + 20) + " -4 L " + (CW / 2 - 20) + " -4", 4, "#8E8270", ' opacity="0.5"');
    return '<g id="' + id + '">' + at(x, CBY, s) + "</g>";
  }
  var hinhG = line("M -160 80 L 120 80", 5, TM.muc, ' stroke-dasharray="16 10"') + paper(rRect(110, 46, 16, 70, 1, 4130), "#6E5A4A", { stroke: true, sw: 3, shadow: false }) +
    at(-40, 92, D.reindeer("tlG", { mau: "#8A6A4E", seed: 4131 }), 0.34);
  var hinhL = at(40, 92, '<g>' + line("M -50 0 L -26 -170 M 50 0 L 26 -170 M -44 -40 L 44 -40 M -38 -90 L 38 -90 M -32 -134 L 32 -134 M -46 -40 L 36 -90 M 46 -40 L -36 -90", 6, "#4A5450") +
    '<circle cx="0" cy="-176" r="26" fill="none" stroke="' + INK + '" stroke-width="6"/><circle cx="0" cy="-176" r="5" fill="' + INK + '"/>' + paper(rRect(60, -60, 70, 60, 1, 4132), "#7E786E", { stroke: true, sw: 3, shadow: false }) + "</g>", 0.62);
  var theG = the("theG", CL, CH[1], hinhG, 4133), theL = the("theL", CR, CH[2], hinhL, 4134);

  var W = KR.wob(api, "W", { mua: "nha" });
  api.dat(KR.defs() + api.lop("ban", B.nen + KR.mocAo() + B.trang + tr + khung + nhan + hs + nc + xe + theG + theL + W.svg + B.den, 1, { mat: 1010 }));
  api.noi({});

  // ---------- camera ----------
  api.camera([[0, 1000, 540, 1.0], [tRight - 0.4, 1060, 500, 1.1, "sine.inOut"], [tRight + 0.8, 1300, 470, 1.36, "power2.inOut"], [tLKAB + 0.4, 1310, 470, 1.4, "sine.inOut"],
    [tLKAB + 1.6, 1100, 540, 1.08, "power2.inOut"], [tCompany - 0.2, 1080, 560, 1.12, "sine.inOut"], [tCompany + 0.8, 1060, 640, 1.3, "power2.inOut"],
    [tGabna - 0.5, 1060, 640, 1.32, "sine.inOut"], [tGabna + 0.6, 1050, 600, 1.0, "power2.inOut"], [DUR, 1050, 610, 1.06, "sine.inOut"]]);

  // ---------- khung mỏ đặt chồng lên vệt đường; nhãn ----------
  api.origin("#khung", (FX + FW / 2) + " " + (FY + FH / 2));
  api.key("#khung", "scale", 0, 1.25); api.key("#khung", "opacity", 0, 0);
  api.key("#khung", "scale", tRight - 0.15, 1.25, "none"); api.key("#khung", "opacity", tRight - 0.15, 0, "none");
  api.key("#khung", "scale", tRight + 0.45, 1, "power2.out"); api.key("#khung", "opacity", tRight + 0.3, 1, "power1.out");
  api.origin("#nhanPG", (FX + FW / 2) + " " + (FY - 44));
  api.pop("#nhanPG", tRight + 0.55, 0.28);
  // hồ sơ, nam châm, xe điện: trượt vào lặng lẽ
  [["#hs", tLKAB + 0.2, 0, -60], ["#nc", tCompany + 0.4, 0, 40], ["#xe", tMagnets - 0.2, 60, 0]].forEach(function (q) {
    api.key(q[0], "opacity", 0, 0); api.key(q[0], "x", 0, q[2]); api.key(q[0], "y", 0, q[3]);
    api.key(q[0], "opacity", q[1], 0, "none"); api.key(q[0], "x", q[1], q[2], "none"); api.key(q[0], "y", q[1], q[3], "none");
    api.key(q[0], "opacity", q[1] + 0.5, 1, "sine.out"); api.key(q[0], "x", q[1] + 0.7, 0, "sine.out"); api.key(q[0], "y", q[1] + 0.7, 0, "sine.out");
  });
  // hai thẻ bật dựng ở mép trang
  KR.batDung(api, "#theG", tGabna - 0.05, 0.5, CL, CBY);
  KR.batDung(api, "#theL", tLKAB2 - 0.05, 0.5, CR, CBY);

  // ---------- Wob ----------
  var WY = 1010, WX0 = 900;
  W.set(0, { x: WX0, y: WY, size: 0.6, pupX: 14, pupY: -20, aRu: -120, aRf: 40 });
  W.mouth(0, "thang");
  W.idle(0.3, tLKAB, { seed: 411, bien: 0.9 });
  W.pose(tRight, 0.5, { pupX: 18, pupY: -24, upRot: -2 }, "sine.inOut");
  // rút tay khỏi mép trang
  W.pose(tLKAB + 0.7, 0.5, { aRu: -18, aRf: 10, pupX: 16, pupY: -18, upRot: 0 }, "sine.inOut");
  W.mouth(tLKAB + 0.9, "buon");
  W.idle(tLKAB + 1.3, tGabna - 0.6, { seed: 412, bien: 0.8 });
  W.pose(tCompany + 0.6, 0.5, { pupX: 8, pupY: -10 }, "sine.inOut");
  W.pose(tMagnets + 0.2, 0.5, { pupX: 14, pupY: -8 }, "sine.inOut");
  // dưới thẻ GABNA
  var WXG = CL + 40, WXM = 1050;
  W.walk(tGabna - 0.6, tGabna + 0.5, WX0, WXG, { step: 0.34 });
  W.pose(tGabna + 0.6, 0.5, { pupX: -4, pupY: -26, upRot: -2 }, "sine.inOut");
  W.mouth(tGabna + 0.8, "thang");
  W.idle(tGabna + 1.2, tLKAB2 - 0.2, { seed: 413, bien: 0.8 });
  // giữa hai thẻ, nhìn thẻ này rồi thẻ kia như nhau
  W.walk(tLKAB2 - 0.1, tLKAB2 + 0.9, WXG, WXM, { step: 0.34 });
  W.pose(tLKAB2 + 1.0, 0.5, { pupX: 18, pupY: -20, upRot: 2 }, "sine.inOut");
  W.pose(tLKAB2 + 2.4, 0.6, { pupX: -18, pupY: -20, upRot: -2 }, "sine.inOut");
  W.pose(tBoth - 0.2, 0.5, { pupX: 18, pupY: -20, upRot: 2 }, "sine.inOut");
  W.pose(tLand - 0.4, 0.5, { pupX: 0, pupY: -8, upRot: 0, lid: 10 }, "sine.inOut");
  W.mouth(tLand, "buon");
  W.idle(tLKAB2 + 1.6, DUR, { seed: 414, bien: 0.6 });
  W.autoBlink(0.3, DUR, 4101);
};
