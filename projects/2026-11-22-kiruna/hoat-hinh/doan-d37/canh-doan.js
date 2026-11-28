/* Đoạn d37 · cắt giấy · tháng 6, nắng nửa đêm.
   A lịch giấy dài treo tường: hai đầu trắng tuyết rất dài, giữa một dải xanh ngắn; hai ngón tay Wob kẹp dải xanh đo: chỉ bằng một đốt ngón.
   B phòng thuê (tủ gỗ như d34): kéo ngăn kéo, lấy chìa Kiruna ra đúng "key out", tới cửa sổ, giơ chìa lên nắng nửa đêm đúng "held".
   C ngôi sao loé trên răng chìa đúng "glinted." (ting), tia phản vào kính râm trên bậu cửa, kính loé theo; Wob nheo mắt (không đeo kính).
   D tay trái chùm chìa nhà, tay phải chìa Kiruna, nhìn bên này rồi bên kia, không luồn vào; giữ tới cắt. Vào "cat", ra "cat". Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, DUR = api.DUR, at = KR.at, M = KR.M, INK = D.INK, paper = D.paper, rRect = D.rRect, line = D.line;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var tI = T("i", 0, 2.003), tOut = T("out", 0, 2.628), tHeld = T("held", 0, 3.44), tSun = T("sun.", 0, 4.416), tGlint = T("glinted.", 0, 5.328),
    tI2 = T("i", 1, 6.103), tRing = T("ring.", 0, 7.303), tNot = T("not", 0, 7.928);
  var tB = tI - 0.12;

  // =================== B–D: phòng thuê tháng 6 (lớp) ===================
  var FG = 960, CX0 = 1150, CX1 = 1450, CT = 690;
  var nen = '<rect x="-800" y="-600" width="3600" height="2400" fill="#D6BE96"/><rect x="-800" y="-600" width="3600" height="2400" fill="url(#half)" opacity="0.06"/>';
  // cửa sổ trái: nắng nửa đêm thấp
  var cs = paper(rRect(230, 170, 460, 460, 2, 3701), "#6E5236", { stroke: true, sw: 6, shadow: false }) + '<rect x="255" y="195" width="410" height="410" fill="url(#krNuaDem)"/>';
  cs += '<circle cx="380" cy="520" r="46" fill="#FFE7A8" stroke="#E8B060" stroke-width="4"/><circle cx="380" cy="520" r="120" fill="url(#krNang)"/>';
  cs += KR.nuiXa(255, 665, 605, 40, "#B9A27A", 3702).replace("<path", '<path clip-path="url(#d37cs)"');
  cs += line("M 460 195 L 460 605 M 255 400 L 665 400", 8, "#6E5236");
  cs += paper(rRect(210, 620, 500, 30, 1, 3703), "#8A6440", { stroke: true, sw: 4, shadow: false });
  // kính râm trên bậu cửa
  cs += '<g id="kinhBau" transform="translate(590,612)">' + '<circle cx="-24" cy="-14" r="18" fill="#1F2326" opacity="0.9" stroke="' + INK + '" stroke-width="4"/><circle cx="24" cy="-14" r="18" fill="#1F2326" opacity="0.9" stroke="' + INK + '" stroke-width="4"/>' +
    line("M -6 -18 C 0 -24 0 -24 6 -18", 4) + '<g id="kinhLoe" opacity="0"><g transform="translate(26,-20)">' + D.sparkle(40, "#FFF6C8") + "</g></g></g>";
  nen += cs;
  nen += '<g id="tia" opacity="0"><path d="M 0 0 L 100 0" stroke="#FFE7A8" stroke-width="7" stroke-linecap="round"/></g>';
  nen += '<rect x="-800" y="' + FG + '" width="3600" height="600" fill="#8A6440"/>' + line("M -800 " + FG + " L 2800 " + FG, 6, "#5E4228");
  nen += '<path d="M 690 300 L 1500 760 L 1500 960 L 690 640 Z" fill="#FFE2A0" opacity="0.18"/>';
  // tủ gỗ (như d34), ngăn kéo trên
  nen += paper(rRect(CX0, CT, CX1 - CX0, FG - CT, 1.5, 3704), M.go, { stroke: true, sw: 5, sx: 5, sy: 6 });
  nen += paper(rRect(CX0 - 14, CT - 18, CX1 - CX0 + 28, 24, 1, 3705), M.goSang, { stroke: true, sw: 4, shadow: false });
  nen += paper(rRect(CX0 + 20, CT + 120, CX1 - CX0 - 40, 110, 1, 3706), M.goToi, { stroke: true, sw: 4, shadow: false }) + '<circle cx="' + ((CX0 + CX1) / 2) + '" cy="' + (CT + 175) + '" r="9" fill="#C9A24A" stroke="' + INK + '" stroke-width="3"/>';
  nen += '<g id="nkLong" opacity="0">' + paper(rRect(CX0 + 14, CT + 6, CX1 - CX0 - 28, 34, 1, 3707), "#3E2A1C", { stroke: true, sw: 3.5, shadow: false }) +
    '<g id="chiaNam" transform="translate(' + (CX0 + 90) + "," + (CT + 22) + ') rotate(-80) scale(0.55)">' + KR.chiaKiruna("", 1) + "</g></g>";
  nen += '<g id="nk">' + paper(rRect(CX0 + 20, CT + 20, CX1 - CX0 - 40, 86, 1, 3708), "#7A5634", { stroke: true, sw: 4.5, shadow: false }) +
    '<circle cx="' + (CX0 + 70) + '" cy="' + (CT + 63) + '" r="11" fill="#C9A24A" stroke="' + INK + '" stroke-width="3"/><circle cx="' + (CX1 - 70) + '" cy="' + (CT + 63) + '" r="11" fill="#C9A24A" stroke="' + INK + '" stroke-width="3"/></g>';
  var kR = '<g id="kR">' + KR.chiaKiruna("kRi", 1.0) + "</g>", rL = '<g id="rL">' + KR.chumChia("rLi", { kr: false }) + "</g>";
  var W = KR.wob(api, "W", { mua: "he", kinh: 0, holdR: kR, holdL: rL });
  var gi = W.svg;

  // =================== A: lịch giấy dài ===================
  var LY = 380, LH = 220, GX0 = 905, GX1 = 1015;
  var a = '<g id="sA"><g id="sAk">';
  a += '<rect x="-800" y="-600" width="3600" height="2400" fill="#D6BE96"/><rect x="-800" y="-600" width="3600" height="2400" fill="url(#half)" opacity="0.06"/>';
  a += paper(rRect(-300, LY, 2520, LH, 2, 3711), "#F6F8F9", { stroke: true, sw: 6, sx: 8, sy: 10 });
  for (var x = -260; x < 2200; x += 60) a += line("M " + x + " " + (LY + 14) + " L " + x + " " + (LY + LH - 14), 2, "#D2E1E8");
  a += '<rect x="' + GX0 + '" y="' + (LY + 4) + '" width="' + (GX1 - GX0) + '" height="' + (LH - 8) + '" fill="#86A95C"/>' + line("M " + GX0 + " " + (LY + 4) + " L " + GX0 + " " + (LY + LH - 4) + " M " + GX1 + " " + (LY + 4) + " L " + GX1 + " " + (LY + LH - 4), 4);
  for (var sx = -240; sx < 2200; sx += 140) if (sx < GX0 - 40 || sx > GX1 + 20) a += at(sx, LY + 70 + (sx % 280 ? 60 : 0), D.sparkle(14, "#C9DCE4"));
  a += line("M -300 " + (LY - 30) + " L 2220 " + (LY - 30), 6, "#8A6440");
  // tay Wob kẹp (ngón xanh như d23)
  var tay = '<g id="tay"><g transform="rotate(-24)">' + line("M 0 0 L 0 900", 44, INK) + line("M 0 0 L 0 900", 30, M.gile) + "</g>" +
    '<g id="ngL">' + line("M -8 -10 L -60 -120", 18, INK) + line("M -8 -10 L -60 -120", 9, "#5a9fb8") + "</g>" +
    '<g id="ngR">' + line("M 8 -10 L 60 -120", 18, INK) + line("M 8 -10 L 60 -120", 9, "#5a9fb8") + "</g>" +
    '<circle cx="0" cy="0" r="34" fill="' + INK + '"/>' + line("M -26 -6 L 26 -6", 3, "#3A4248") + "</g>";
  a += tay + "</g></g>";

  api.dat(KR.defs() + '<defs><clipPath id="d37cs"><rect x="255" y="195" width="410" height="410"/></clipPath></defs>' + nen + api.lop("giua", gi, 1, { mat: FG }) + a);
  api.noi({});
  api.show("#nkLong", 0, 0); api.show("#chiaNam", 0, 1); api.show("#kRi-loe", 0, 0); api.show("#kinhLoe", 0, 0);

  // =================== A ===================
  KR.cat(api, "#sA", 0, tB);
  KR.camNhom(api, [["#sAk", 1]], [[0, 960, 500, 1.0], [tB, 960, 494, 1.08, "sine.inOut"]]);
  var HX = (GX0 + GX1) / 2, HY = LY + LH + 150;
  api.origin("#tay", "0 0"); api.origin("#ngL", "0 0"); api.origin("#ngR", "0 0");
  api.key("#tay", "x", 0, HX + 380); api.key("#tay", "y", 0, HY + 520);
  api.key("#tay", "x", 0.12, HX + 380, "none"); api.key("#tay", "y", 0.12, HY + 520, "none");
  api.key("#tay", "x", 0.5, HX + 40, "power2.out"); api.key("#tay", "y", 0.5, HY, "power2.out");
  // hai ngón mở rộng rồi khép đúng mép dải xanh
  api.key("#ngL", "rotation", 0, -22); api.key("#ngR", "rotation", 0, 22);
  api.key("#ngL", "rotation", 0.55, -22, "none"); api.key("#ngR", "rotation", 0.55, 22, "none");
  api.key("#ngL", "rotation", 0.85, 6, "power2.inOut"); api.key("#ngR", "rotation", 0.85, -6, "power2.inOut");
  api.key("#tay", "x", 0.85, HX, "power2.inOut");
  for (var w = 0; w < 4; w++) api.key("#tay", "y", 1.0 + w * 0.2, HY + (w % 2 ? 4 : -4), "sine.inOut");

  // =================== B: ngăn kéo, chìa ra ===================
  api.camera([[0, 1060, 700, 1.5], [tB, 1060, 700, 1.5, "none"], [tOut + 0.2, 1040, 704, 1.55, "sine.inOut"], [tHeld - 0.5, 660, 640, 1.25, "power2.inOut"],
    [tGlint - 0.3, 640, 630, 1.3, "sine.inOut"], [tGlint + 0.4, 636, 640, 1.36, "power2.out"], [DUR, 640, 660, 1.44, "sine.inOut"]]);
  var WX = 1050;
  W.set(0, { x: WX, y: FG, size: 0.72, pupX: 14, pupY: 4 });
  W.mouth(0, "flat");
  api.show("#kR", 0, 0);
  // tay trái cầm chùm chìa thõng sẵn
  W.pose(tB, 0.25, { aRu: -160, aRf: 60, pupX: 16, pupY: 6 }, "power2.out");     // tay phải tới núm ngăn kéo
  api.origin("#nk", ((CX0 + CX1) / 2) + " " + (CT + 63));
  var tKeo = tB + 0.3;
  api.key("#nk", "y", 0, 0); api.key("#nk", "scale", 0, 1); api.key("#nk", "y", tKeo, 0, "none"); api.key("#nk", "scale", tKeo, 1, "none");
  api.key("#nk", "y", tKeo + 0.25, 24, "power2.out"); api.key("#nk", "scale", tKeo + 0.25, 1.06, "power2.out");
  api.show("#nkLong", tKeo + 0.05, 1);
  W.pose(tKeo, 0.25, { aRu: -66, aRf: -96 }, "power2.out");
  // lấy chìa ra đúng "key out"
  W.pose(tOut - 0.2, 0.2, { aRu: -160, aRf: 34, pupX: 16, pupY: 14 }, "power2.inOut");
  api.show("#chiaNam", tOut, 0); api.show("#kR", tOut, 1);
  W.pose(tOut + 0.02, 0.25, { aRu: 10, aRf: 88, pupX: 0, pupY: 10 }, "back.out(1.4)");
  W.mouth(tOut + 0.1, "smile");
  // tới cửa sổ
  var WX2 = 640;
  W.walk(tOut + 0.3, tHeld - 0.1, WX, WX2, { step: 0.24, arms: false });
  // giơ chìa lên nắng đúng "held"
  W.pose(tHeld - 0.05, 0.3, { aRu: 156, aRf: 34, pupX: -16, pupY: -22, upRot: -4 }, "power2.out");
  W.idle(tHeld + 0.4, tGlint - 0.1, { seed: 371, bien: 0.8 });

  // =================== C: loé, kính râm loé theo ===================
  var kp = function (t) { var h = W.hand("R", t); return [h.x, h.y - 40]; };
  api.sfx("ting", tGlint, 0.55);
  api.origin("#kRi-loe", "20 100");
  api.show("#kRi-loe", tGlint - 0.02, 1); api.key("#kRi-loe", "scale", tGlint - 0.02, 0.2); api.key("#kRi-loe", "scale", tGlint + 0.12, 1.3, "back.out(2)"); api.key("#kRi-loe", "scale", tGlint + 0.5, 0, "power2.in");
  var p0 = kp(tGlint);
  var dx = 610 - p0[0], dy = 592 - p0[1];
  api.origin("#tia", "0 0");
  api.set("#tia", 0, { x: p0[0], y: p0[1], rotation: Math.atan2(dy, dx) * 180 / Math.PI, scaleX: Math.sqrt(dx * dx + dy * dy) / 100 });
  api.key("#tia", "opacity", 0, 0); api.key("#tia", "opacity", tGlint + 0.05, 0, "none"); api.key("#tia", "opacity", tGlint + 0.12, 0.9, "none"); api.key("#tia", "opacity", tGlint + 0.4, 0, "power1.in");
  api.origin("#kinhLoe", "0 0");
  api.show("#kinhLoe", tGlint + 0.14, 1); api.key("#kinhLoe", "scale", tGlint + 0.14, 0.2); api.key("#kinhLoe", "scale", tGlint + 0.3, 1.3, "back.out(2)"); api.key("#kinhLoe", "scale", tGlint + 0.7, 0, "power2.in");
  W.pose(tGlint + 0.15, 0.12, { lid: 34, upRot: 3, lean: 2 }, "power2.out");
  W.mouth(tGlint + 0.15, "flat");
  W.pose(tGlint + 0.65, 0.3, { lid: 8, upRot: 0, lean: 0 }, "power2.inOut");

  // =================== D: chùm chìa trái, chìa Kiruna phải, không luồn ===================
  W.pose(tI2 - 0.1, 0.35, { aRu: -10, aRf: 60, aLu: 10, aLf: -60, pupX: -14, pupY: 10, lid: 4 }, "power2.inOut");
  W.pose(tI2 + 0.55, 0.35, { pupX: 14, pupY: 10, upRot: 2 }, "sine.inOut");
  W.pose(tRing - 0.05, 0.35, { pupX: -14, pupY: 10, upRot: -2 }, "sine.inOut");
  W.pose(tNot, 0.4, { pupX: 0, pupY: 4, upRot: 0, lid: 12 }, "sine.inOut");
  W.mouth(tNot + 0.2, "smirk");
  W.idle(tI2 + 0.3, DUR, { seed: 372, bien: 0.7 });
  W.autoBlink(tB, DUR, 3701);
  KR.thong(api, W, "L", "#rL", 0, DUR, { goc: 0, lac: 1.0 });
  KR.thong(api, W, "R", "#kR", 0, DUR, { goc: 0, lac: 0.5 });
};
