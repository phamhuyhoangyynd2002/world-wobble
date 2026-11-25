/* Đoạn d08 · cắt giấy · trang sổ tông ấm: đèo Portage Pass. Vào "giay", ra "giay".
   Lịch sử con người, tôn trọng: người que nhỏ ở xa, không mặt, không trang phục cụ thể, không gag về người.
   Gag chỉ ở Wob (tháp giấy đổ) và cụm mây trên đầu Wob. Chữ: Portage Pass, Cook Inlet. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR, CH = data.chu_tren_do_vat, INK = D.INK;
  var T = function (w, k, du) { var v = api.tuDung(w, 0, k); return v == null ? du : v; };
  var W = WT.wob(api, "W", {});
  var NUI = "#C79A6B", NUI_D = "#A87B52", NUOC = "#8FB0B5";
  // ---- trang sổ (x 90..1530, y 110..980) ----
  var pg = "";
  pg += at(90, 110, D.journalPage(1440, 870, { seed: 311, mau: "#F5E6C8", ke: false }));
  // nước: vịnh phía trái (không nhãn), Cook Inlet phía phải
  pg += D.paper(D.rough([[150, 980], [160, 880], [260, 850], [380, 900], [420, 980]], 3, 821, 18), NUOC, { stroke: true, sw: 4, shadow: false });
  pg += D.paper(D.rough([[1120, 980], [1150, 860], [1300, 830], [1500, 850], [1520, 980]], 3, 822, 18), NUOC, { stroke: true, sw: 4, shadow: false });
  pg += D.line("M 1180 900 C 1220 890 1260 890 1300 900 M 200 930 C 240 920 280 920 320 930", 4, "#FFFFFF", ' opacity="0.6"');
  // hai sườn núi giấy cắt, đèo ở giữa
  pg += D.paper(D.rough([[160, 860], [300, 520], [480, 300], [600, 380], [720, 460], [800, 470], [760, 900], [160, 900]], 4, 831, 22), NUI, { stroke: true, sw: 5, half: 0.12 });
  pg += D.paper(D.rough([[740, 900], [800, 470], [880, 440], [1020, 260], [1200, 420], [1380, 640], [1460, 860], [1460, 900]], 4, 832, 22), NUI_D, { stroke: true, sw: 5, half: 0.12 });
  pg += D.paper(D.rough([[420, 352], [480, 300], [546, 352], [480, 340]], 2, 833, 12), "#F6EEDC", { shadow: false });
  pg += D.paper(D.rough([[960, 320], [1020, 260], [1090, 330], [1020, 312]], 2, 834, 12), "#F6EEDC", { shadow: false });
  // đường đèo nét đứt (vẽ dần)
  var P = api.duong([[300, 880], [470, 700], [640, 520], [800, 466], [960, 530], [1150, 660], [1330, 780], [1420, 812]]);
  pg += '<path id="duong" d="' + P.den(0) + '" fill="none" stroke="#7A3B2E" stroke-width="7" stroke-dasharray="18 14" stroke-linecap="round"/>';
  // nhãn
  pg += at(800, 300, g("nPass", WT.tag("tagPass", CH[0], 330, 74, 46, { seed: 841 })));
  pg += at(1310, 930, g("nCook", WT.tag("tagCook", CH[1], 300, 70, 44, { seed: 842, ghim: false })));
  // người que đi qua đèo (hai chiều), rồi người kéo xe trượt
  var NQ = [];
  [[0.05, 1, "#5C4A3E"], [0.22, 1, "#6B5444"], [0.38, 1, "#4E4038"], [0.9, -1, "#6B5444"], [0.72, -1, "#5C4A3E"], [0.58, -1, "#4E4038"]].forEach(function (c, i) {
    NQ.push({ id: "q" + i, u0: c[0], dir: c[1] });
    pg += g("qq" + i, WT.nguoiQue("q" + i, { mau: c[2], huong: c[1], goi: i % 2 ? "#9C8462" : "#B8A07E" }), "translate(-500,-500) scale(0.72)");
  });
  var NS = [];
  for (var k = 0; k < 3; k++) {
    NS.push({ id: "s" + k, u0: 0.2 - k * 0.11 });
    pg += g("ss" + k, '<g transform="translate(-30,0)">' + D.sled("sl" + k) + "</g>" + WT.nguoiQue("s" + k, { mau: "#6B5A4A", huong: 1 }), "translate(-500,-500) scale(0.7)");
  }
  // tháp giấy của Wob (3 khối) ở cuối nét đứt
  var thap = g("t0", D.paper(D.rRect(-30, -50, 60, 50, 1.5, 851), "#E9DCC4", { stroke: true, sw: 4 })) +
    g("t1", D.paper(D.rRect(-26, -96, 52, 46, 1.5, 852), "#DCCBAA", { stroke: true, sw: 4 })) +
    g("t2", D.paper(D.rRect(-20, -138, 40, 42, 1.5, 853), "#E9DCC4", { stroke: true, sw: 4 }) + D.paper("M -24 -138 L 0 -170 L 24 -138 Z", "#C9463A", { stroke: true, sw: 4, shadow: false }));
  pg += at(1440, 812, g("thap", thap));

  var mid = '<rect x="-600" y="-400" width="3200" height="2000" fill="#6B4E3A"/>' +
    '<rect x="-600" y="990" width="3200" height="700" fill="#5A4030"/>' + D.line("M -600 990 L 2600 990", 4, "#3E2C20", ' opacity="0.6"') + pg;
  var gan = W.svg + at(1700, 600, g("may", WT.cloudFace("mayM", 0.9)));
  api.dat(WT.defs() + '<rect width="1920" height="1080" fill="#6B4E3A"/>' + api.lop("giua", mid, 1, { mat: 980 }) + api.lop("gan", gan, 1, { mat: 1000 }));
  api.noi({});

  var tFor = T("for", 0, 0.15), tPortage = T("portage", 0, 4.5), tCook = T("cook", 0, 8.19), tLate = T("late", 0, 9.44), tGold = T("gold", 0, 11.0);
  var tBut = T("but", 0, 14.29), tBuild = T("building", 0, 16.29), tTower = T("tower", 0, 16.66), tGold2 = T("gold", 1, 17.5), tWeather = T("weather", 0, 19.27);

  api.camera([
    [0, 960, 560, 1.0], [tPortage - 0.3, 900, 560, 1.08, "sine.inOut"], [tCook - 0.2, 980, 580, 1.1, "sine.inOut"], [tBut - 1.0, 1060, 600, 1.12, "sine.inOut"],
    [tBut - 0.2, 1380, 700, 1.5, "power2.inOut"], [tGold2 - 0.2, 1500, 690, 1.6, "sine.inOut"], [DUR, 1560, 660, 1.66, "sine.inOut"]
  ]);

  // ---- nét đứt vẽ dần + người que đi theo đường ----
  var sp = 0.035;   // phần đường mỗi giây
  api.moiKhung(function (t) {
    if (typeof document === "undefined") return;
    var e = document.getElementById("duong"); if (e) e.setAttribute("d", P.den(Math.max(0, Math.min(1, (t - 0.4) / 2.6))));
    NQ.forEach(function (q, i) {
      var el = document.getElementById("qq" + i); if (!el) return;
      var u = q.u0 + q.dir * sp * t, op = (t > 1.2 + i * 0.25 && t < tLate) ? 1 : 0;
      u = Math.max(0, Math.min(1, u)); var p = P.at(u);
      el.setAttribute("transform", "translate(" + p.x.toFixed(1) + "," + (p.y + 4).toFixed(1) + ") scale(0.72)");
      el.setAttribute("opacity", op);
    });
    NS.forEach(function (q, i) {
      var el = document.getElementById("ss" + i); if (!el) return;
      var u = q.u0 + 0.05 * Math.max(0, t - tLate);
      var op = (t >= tLate + 0.1 && u >= 0 && u <= 0.98) ? 1 : 0; var p = P.at(Math.max(0, Math.min(1, u)));
      el.setAttribute("transform", "translate(" + p.x.toFixed(1) + "," + (p.y + 4).toFixed(1) + ") rotate(" + (p.a * 0.8).toFixed(1) + ") scale(0.7)");
      el.setAttribute("opacity", op);
    });
  }, { twos: true });
  NQ.forEach(function (q) { WT.buocQue(api, q.id, 1.2, tLate, 0.5); });
  NS.forEach(function (q) { WT.buocQue(api, q.id, tLate, DUR, 0.6); });
  api.origin("#nPass", "0 0"); api.origin("#nCook", "0 0");
  api.pop("#nPass", tPortage, 0.3); api.pop("#nCook", tCook, 0.3);
  api.sfx("pop", tPortage, 0.3); api.sfx("pop", tCook, 0.3);

  // ---- Wob đứng ngoài mép trang, quan sát ----
  W.set(0, { x: 1700, y: 1000, size: 0.75, lashes: 1, ice: 0, aLu: -6, aLf: -4, aRu: 6, aRf: 4, pupX: -10, pupY: 2 });
  W.mouth(0, "flat");
  W.idle(0.3, tBut, { seed: 81, bien: 1.8 });
  W.pose(2.0, 0.4, { pupX: -12, pupY: -4 }, "sine.inOut"); W.pose(4.6, 0.4, { pupX: -11, pupY: -8 }, "sine.inOut");
  W.pose(7.0, 0.4, { pupX: -6, pupY: 2 }, "sine.inOut"); W.pose(8.3, 0.3, { pupX: -4, pupY: 6 }, "sine.inOut");
  W.pose(10.0, 0.4, { pupX: -12, pupY: -2 }, "sine.inOut"); W.pose(12.4, 0.5, { pupX: -10, pupY: -6 }, "sine.inOut");
  W.blinkAt(3.2); W.blinkAt(6.1); W.blinkAt(9.9); W.blinkAt(12.9);
  W.pose(5.4, 0.3, { upY: 6 }, "sine.inOut"); W.pose(5.8, 0.3, { upY: 0 }, "sine.inOut");      // gật nhẹ
  // dựng tháp giấy bằng ngón tay
  var b0 = tBut + 0.2;
  W.pose(b0 - 0.3, 0.35, { aLu: 78, aLf: 8, pupX: -12, pupY: 6, lean: -5 }, "power2.out");
  W.mouth(b0, "smirk");
  ["#t0", "#t1", "#t2"].forEach(function (s, i) {
    var tt = b0 + i * 0.45;
    api.origin(s, "0 0");
    api.key(s, "y", 0, -80); api.key(s, "y", tt, -80, "none"); api.key(s, "y", tt + 0.2, 0, "bounce.out");
    api.show(s, 0, 0); api.show(s, tt, 1);
    W.pose(tt - 0.1, 0.12, { aLf: 18 }, "power2.out"); W.pose(tt + 0.05, 0.15, { aLf: 6 }, "power2.out");
    api.sfx("pop", tt + 0.1, 0.3);
  });
  W.pose(b0 + 1.5, 0.3, { aLu: 18, aLf: -10, lean: 0 }, "power2.inOut");
  W.mouth(b0 + 1.5, "grin");
  // tháp lung lay rồi đổ đúng "tower"
  api.origin("#thap", "-30 0");
  api.key("#thap", "rotation", 0, 0); api.key("#thap", "rotation", tBuild - 0.1, 0, "none");
  api.key("#thap", "rotation", tBuild + 0.1, -4, "sine.inOut"); api.key("#thap", "rotation", tTower - 0.1, 3, "sine.inOut");
  api.key("#thap", "rotation", tTower + 0.18, -88, "power2.in"); api.key("#thap", "rotation", tTower + 0.3, -80, "sine.out"); api.key("#thap", "rotation", tTower + 0.42, -86, "sine.in");
  api.sfx("drop", tTower + 0.18, 0.55);
  W.pose(tTower + 0.18, 0.1, { eye: 1.2, sy: 0.95 }, "power3.out"); W.pose(tTower + 0.4, 0.3, { eye: 1, sy: 1 }, "back.out(2)");
  W.mouth(tTower + 0.2, "o"); W.mouth(tTower + 0.7, "flat");
  W.nhunVai(tGold2 + 0.1, 0.5);
  W.idle(tBut + 2.5, DUR, { seed: 82, bien: 1.4 });
  // nhìn lên cụm mây; mây nháy mắt; giữ
  W.pose(tWeather - 0.15, 0.3, { pupX: 0, pupY: -14 }, "power2.out");
  W.mouth(tWeather + 0.4, "wobbly");
  api.origin("#mayM-mi", "10 -30");
  api.key("#mayM-mi", "scaleY", 0, 0); api.key("#mayM-mi", "scaleY", tWeather + 0.5, 0, "none"); api.key("#mayM-mi", "scaleY", tWeather + 0.62, 1, "power2.in"); api.key("#mayM-mi", "scaleY", tWeather + 0.85, 0, "power2.out");
  api.sfx("ting", tWeather + 0.6, 0.3);
  api.origin("#may", "0 0");
  for (var t = 0, n = 0; t < DUR; t += 1.1, n++) api.key("#may", "y", t, n % 2 ? 6 : -6, "sine.inOut");
  api.key("#may", "x", 0, 0); api.key("#may", "x", tWeather + 0.5, 0, "none"); api.key("#may", "x", tWeather + 0.7, 8, "sine.inOut"); api.key("#may", "x", tWeather + 1.0, 0, "sine.inOut");
};
