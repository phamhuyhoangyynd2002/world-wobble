/* Đoạn d24 · cắt giấy · hồi ức tháng Bảy: CÙNG CỔNG HẦM, CÙNG BỐ CỤC với d01 (vòm trong vách đá xám, đèn tín hiệu bên trái x 600,
   thanh chắn trục 760, cổng x 1000; dùng WT.tunnelPortal/signal3/barrier/convertible của cat-giay-wt-prelude.js), chỉ đổi mùa:
   tuyết thành cỏ xanh, trời xanh, bông hoa trên thanh chắn. Xe thuê mui trần đỏ gạch như d01–d04, mở mui.
   Vào "giay", ra "giay". Trang phục: mũ lưỡi trai xanh băng, không áo mưa, ba lô ô liu có cuộn thảm đỏ, giày đỏ.
   Chữ: 5:30, 23:15 trên tờ lịch mùa hè dán bảng cạnh cổng, hiện đúng "five thirty" / "eleven fifteen". */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var C = data.chu_tren_do_vat;
  var MAT = 900, CO = "#7FAE6E";
  function heHoa(svg) { return svg.split(D.C.snow).join(CO); }      // tuyết trên vách/cổng → mảng cỏ mùa hè
  var W = WH.wob(api, "W", { mu: "luoi" });
  var xe = WT.convertible("xe", { tuyet: 0 });

  var xa = heHoa(WT.nuiXa(-900, 3400, 760, 3, "#6E9A70", 420));
  var mid = "";
  mid += at(1000, MAT, heHoa(WT.tunnelPortal("ham", { seed: 801 })));
  mid += D.paper(D.rough([[-800, MAT - 4], [3400, MAT - 6], [3400, 1700], [-800, 1700]], 3, 811, 30), "#8DBB7C", { shadow: false });
  mid += '<path d="M 770 ' + MAT + ' L 1230 ' + MAT + ' L 1500 1300 L 500 1300 Z" fill="#5E6668" opacity="0.9"/>';
  mid += D.line("M 940 " + MAT + " L 860 1300 M 1060 " + MAT + " L 1140 1300", 7, "#C9CCC8");
  mid += at(600, MAT + 4, WT.signal3("den", { mau: "#5BC57A" }));
  // bảng dán tờ lịch mùa hè, bên phải cổng
  mid += at(1420, MAT, D.paper(D.rRect(-10, -470, 20, 470, 1.2, 2403), "#6B4E33", { stroke: true, sw: 4 }) +
    at(-150, -480, D.paper(D.rRect(0, 0, 300, 290, 1.6, 2404), "#8A6440", { stroke: true, sw: 4 }) +
      at(20, 18, WH.toLich("lich", { w: 260, h: 254, seed: 2405 }) +
        g("c0", D.txt(130, 108, C[0], 72, { fill: "#2B3A44" })) + g("c1", D.txt(130, 210, C[1], 72, { fill: "#2B3A44" })))));
  // xe đỏ (đầu bên trái) + Wob ghế lái
  mid += '<g id="XE">' + at(0, 924, xe.back) + W.svg + at(0, 924, xe.front) + "</g>";
  var vun = "";
  for (var v = 0; v < 6; v++) vun += '<rect id="vu' + v + '" x="-6" y="-4" width="14" height="8" rx="2" fill="#d9543c" stroke="' + D.INK + '" stroke-width="1.5"/>';
  mid += g("VUN", vun);
  // thanh chắn (trước cổng) + bông hoa
  mid += at(760, 818, WT.barrier("chan", 395));
  mid += g("HOA", at(0, 0, D.line("M 0 0 L 0 -40", 4, "#4E8A4A") +
    [0, 72, 144, 216, 288].map(function (a) { var r = a * Math.PI / 180; return '<circle cx="' + (Math.cos(r) * 12).toFixed(1) + '" cy="' + (-46 + Math.sin(r) * 12).toFixed(1) + '" r="9" fill="#F3B5C8" stroke="' + D.INK + '" stroke-width="2"/>'; }).join("") +
    '<circle cx="0" cy="-46" r="7" fill="#F2C94C" stroke="' + D.INK + '" stroke-width="2"/>'));
  var gan = D.paper(D.rough([[-400, 1080], [-200, 1010], [200, 990], [520, 1030], [700, 1090], [700, 1300], [-400, 1300]], 4, 813, 26), "#6E9E62", { stroke: true, sw: 4 }) +
    D.paper(D.rough([[1900, 1100], [2100, 1000], [2400, 980], [2700, 1040], [2800, 1300], [1900, 1300]], 4, 814, 26), "#6E9E62", { stroke: true, sw: 4 });

  api.dat(WT.defs() + WH.defs() + '<rect width="1920" height="1080" fill="url(#whHe)"/>' +
    api.lop("xa", xa, 0.35, { mat: 760 }) + api.lop("giua", mid, 1, { mat: MAT }) + api.lop("gan", gan, 1.4, { mat: 1060 }));
  api.noi({});

  var tJuly = T("july.", 0, 0.72), tSame = T("same", 0, 1.55), tDiff = T("different", 0, 2.55), tSummer = T("summer", 0, 4.03), tFive = T("five", 0, 5.11);
  var tEleven = T("eleven", 0, 7.94), tArr = T("arrived", 0, 9.79), tClos = T("closing,", 0, 10.97), tPurp = T("purpose,", 0, 11.85), tDrove = T("drove", 0, 12.75);
  var tGo = tPurp - 0.1, tIn = tGo + 1.0;

  api.camera([
    [0, 1100, 560, 0.9], [tSame + 0.6, 1150, 580, 0.94, "sine.inOut"],
    [tFive - 0.6, 1420, 520, 1.28, "power3.inOut"], [tEleven + 1.0, 1420, 520, 1.32, "sine.inOut"],
    [tArr - 0.1, 1350, 620, 1.0, "power2.inOut"], [tGo, 1300, 640, 1.04, "sine.inOut"],
    [tIn - 0.2, 1000, 760, 1.6, "power2.inOut"], [DUR, 990, 765, 1.68, "sine.inOut"]
  ]);

  // đèn xanh (hầm mở): chỉ bóng dưới sáng
  api.show("#den-b0", 0, 0); api.show("#den-b1", 0, 0); api.show("#den-b2", 0, 1);
  // thanh chắn dựng đứng, hoa mọc trên trụ
  api.origin("#chan-arm", "0 0"); api.key("#chan-arm", "rotation", 0, -86, "step");
  api.key("#HOA", "x", 0, 760, "step"); api.key("#HOA", "y", 0, 808, "step");
  api.origin("#HOA", "0 0"); api.set("#HOA", 0, { scale: 0 }); api.pop("#HOA", tJuly + 0.1, 0.45);
  api.key("#HOA", "rotation", tJuly + 0.7, 8, "sine.inOut"); api.key("#HOA", "rotation", tJuly + 1.5, -6, "sine.inOut"); api.key("#HOA", "rotation", tJuly + 2.3, 0, "sine.inOut");
  api.sfx("liu-lo-vui", tJuly + 0.1, 0.5);
  // giờ trên tờ lịch: đúng lời
  api.show("#c0", 0, 0); api.show("#c0", tFive - 0.08, 1);
  api.origin("#c0", "130 90"); api.key("#c0", "scale", 0, 1, "step"); api.key("#c0", "scale", tFive - 0.08, 1.3, "step"); api.key("#c0", "scale", tFive + 0.2, 1, "back.out(2)");
  api.show("#c1", 0, 0); api.show("#c1", tEleven - 0.08, 1);
  api.origin("#c1", "130 190"); api.key("#c1", "scale", 0, 1, "step"); api.key("#c1", "scale", tEleven - 0.08, 1.3, "step"); api.key("#c1", "scale", tEleven + 0.2, 1, "back.out(2)");
  api.sfx("ting", tFive - 0.06, 0.45); api.sfx("ting", tEleven - 0.06, 0.4);

  // xe chạy vào từ phải, dừng cạnh bảng
  var x0 = 2500, xStop = 1700;
  api.key("#XE", "x", 0, x0, "step"); api.key("#XE", "x", 0.3, x0, "none"); api.key("#XE", "x", tSame + 0.3, xStop, "power2.out");
  W.set(0, { x: 18, y: 884, size: 0.62, lashes: 0, ice: 0, aRu: -40, aRf: 20, aLu: 40, aLf: -20, pupX: -6 });
  W.mouth(0, "grin");
  W.idle(0.3, tDiff, { seed: 241, bien: 1.2 });
  W.pose(tSame + 0.3, 0.3, { pupX: -12, pupY: -6 }, "power2.out");
  W.pose(tDiff, 0.3, { aRu: -150, aRf: -30, pupX: 0, pupY: 0 }, "back.out(1.6)");
  api.origin("#W-cap", "200 100");
  api.key("#W-cap", "rotation", tDiff + 0.1, -10, "power2.out"); api.key("#W-cap", "rotation", tDiff + 0.6, 0, "back.out(2)");
  W.pose(tDiff + 0.8, 0.3, { aRu: -40, aRf: 20 }, "power2.inOut");
  W.pose(tSummer - 0.2, 0.3, { pupX: -14, pupY: -16, lean: -4 }, "power2.out");
  W.mouth(tFive, "o");
  W.nhonChan(tFive + 0.3, 0.4, {});
  W.mouth(tEleven + 0.2, "smirk");
  W.idle(tSummer + 0.5, tArr, { seed: 242, bien: 1.0, tho: false });
  W.pose(tArr, 0.3, { pupX: 0, pupY: 0, lean: 0 }, "power2.out");
  W.mouth(tClos, "smirk");
  api.key("#W-eyeR", "scaleY", 0, 1, "step"); api.key("#W-eyeR", "scaleY", tClos + 0.2, 1, "none"); api.key("#W-eyeR", "scaleY", tClos + 0.3, 0.08, "power2.out");
  api.key("#W-eyeR", "scaleY", tClos + 0.8, 0.08, "none"); api.key("#W-eyeR", "scaleY", tClos + 0.92, 1, "power2.in");
  // lao thẳng vào hầm; thanh chắn hạ ngay sau, sượt cuộn thảm (cận đuôi xe, giữ)
  W.pose(tGo - 0.1, 0.2, { aRu: -60, aRf: 50, aLu: 60, aLf: -50, lean: -6 }, "power2.out");
  api.key("#XE", "x", tGo, xStop, "none"); api.key("#XE", "x", tIn, 1010, "power2.in");
  api.origin("#XE", "0 924");
  api.key("#XE", "y", 0, 0, "step"); api.key("#XE", "y", tGo, 0, "none"); api.key("#XE", "y", tIn, -30, "power2.in");
  api.key("#XE", "scale", 0, 1, "step"); api.key("#XE", "scale", tGo + 0.4, 1, "none"); api.key("#XE", "scale", tIn, 0.56, "power2.in"); api.key("#XE", "scale", tIn + 0.35, 0.42, "none");
  api.key("#XE", "opacity", 0, 1, "step"); api.key("#XE", "opacity", tIn + 0.3, 1, "none"); api.key("#XE", "opacity", tIn + 0.4, 0, "none");
  api.sfx("whoosh", tGo, 0.55);
  api.key("#chan-arm", "rotation", tIn - 0.3, -86, "none"); api.key("#chan-arm", "rotation", tIn - 0.06, -40, "power2.in");
  api.key("#chan-arm", "rotation", tIn + 0.35, -34, "sine.inOut"); api.key("#chan-arm", "rotation", tIn + 0.6, 0, "bounce.out");
  api.sfx("bonk", tIn - 0.02, 0.4);
  W.pose(tIn - 0.05, 0.12, { upY: 14, eye: 1.25 }, "power2.out"); W.mouth(tIn - 0.05, "o");
  for (var k = 0; k < 6; k++) {
    var s = "#vu" + k, ang = -160 + k * 28, px = 1040, py = 790;
    api.show(s, 0, 0); api.show(s, tIn - 0.02, 1);
    api.key(s, "x", 0, px, "step"); api.key(s, "y", 0, py, "step");
    api.key(s, "x", tIn - 0.02, px, "none"); api.key(s, "x", tIn + 0.6, px + Math.cos(ang * Math.PI / 180) * 110, "power2.out");
    api.key(s, "y", tIn - 0.02, py, "none"); api.key(s, "y", tIn + 0.6, py + Math.sin(ang * Math.PI / 180) * 60 + 70, "power2.in");
    api.key(s, "rotation", tIn - 0.02, 0, "none"); api.key(s, "rotation", tIn + 0.6, 220 + k * 40, "none");
  }
  W.autoBlink(0.6, tClos, 2408);
};
