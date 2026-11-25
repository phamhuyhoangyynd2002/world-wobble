/* Đoạn d37 (diorama, hồi ức, 22,62 s): Breakaways lúc chạng vạng. Chỉ phong cảnh: các lớp đồi đỉnh bằng tách xa nhau ở nhiều độ
 * sâu, trời chuyển tím, sao đầu tiên. Không người, không biểu tượng, không gag, không chữ. Wob nhỏ ở tiền cảnh trái nhìn xa,
 * cầm sổ; "I put my notebook away": gấp sổ đặt xuống cạnh ba lô; đồi tím dần, sao hiện. Lùi chậm, im lặng, giữ hình. Vào/ra `cat`.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  var sk3 = api.sanKhau(), R = sk3.rig, the = sk3.the;
  // trời: lớp chiều (cam-vàng) và lớp chạng vạng (tím) chồng nhau, hoà dần
  api.plane(the, { x: 0, y: -1400, z: -5200 }, 16000, 5200, "background:linear-gradient(#6f8fb8 0%, #e9b98a 62%, #f4c98a 80%);");
  var tim = api.plane(the, { x: 0, y: -1400, z: -5190 }, 16000, 5200, "background:linear-gradient(#2c2a5a 0%, #6b4b8a 50%, #d48a8a 80%);");
  gsap.set(tim, { opacity: 0 });
  var sao = api.cut(the, 80, 80, api.fp("M 40 4 L 48 32 L 76 40 L 48 48 L 40 76 L 32 48 L 4 40 L 32 32 Z", "#fff6d0", 4), { pos: { x: 700, y: -2300, z: -5100, scale: 2.6 } });
  gsap.set(sao, { opacity: 0 });
  // mặt đất sa mạc
  api.floorPlane(the, 0, 0, -2200, 16000, 7000, "background:linear-gradient(#b8733f, #d79a5e 60%, #c98451);");
  // các lớp đồi Breakaways (xa → gần), xa nhạt dần vì bụi
  var MAU = [["#efe4d6", "#e8c7a0", "#d9a07a"], ["#f3ead8", "#e6b86e", "#cf7a48"], ["#f3ead8", "#e3b36a", "#c4643a"], ["#f6eddc", "#dca058", "#b8552f"]];
  var DOI = [
    { x: -1500, z: -4200, w: 1400, h: 420, s: 2.2, m: 0, seed: 3, f: api.F.XA }, { x: 900, z: -4000, w: 1600, h: 380, s: 2.2, m: 0, seed: 4, f: api.F.XA },
    { x: -400, z: -3000, w: 1100, h: 400, s: 1.8, m: 1, seed: 7, f: api.F.XA }, { x: 1500, z: -2700, w: 900, h: 460, s: 1.7, m: 1, seed: 8, f: api.F.XA },
    { x: -1700, z: -2000, w: 900, h: 420, s: 1.4, m: 2, seed: 11, f: api.F.AM }, { x: 500, z: -1700, w: 1000, h: 360, s: 1.3, m: 2, seed: 12, f: api.F.AM },
    { x: 1400, z: -900, w: 700, h: 300, s: 1, m: 3, seed: 15, f: api.F.AM, dinh: 0.25 }
  ];
  var doiEl = DOI.map(function (d) {
    return api.cut(the, d.w, d.h, api.doiMesaSVG(d.w, d.h, { seed: d.seed, mau: MAU[d.m], dinh: d.dinh, net: 4 }), { pos: { x: d.x, y: 4, z: d.z, scale: d.s }, f: d.f });
  });
  // bụi xa (sương trùng màu chân trời)
  var bui = api.plane(the, { x: 0, y: -200, z: -3500 }, 16000, 600, "background:linear-gradient(rgba(244,201,138,0), rgba(244,201,138,.55) 70%, rgba(244,201,138,0));");
  // tiền cảnh: mỏm đá gần, Wob nhỏ, ba lô có cuộn thảm đỏ + cuộn cỏ xanh
  api.cut(the, 600, 160, api.fp("M 0 160 L 0 90 C 80 60 200 50 320 70 C 420 84 520 100 600 120 L 600 160 Z", "#c4643a", 5), { pos: { x: -560, y: 4, z: 120 }, f: api.F.AM });
  var W0 = { x: -400, z: 60 }, s = 0.62;
  var w = api.makeWob(the, { x: W0.x, y: -40, z: W0.z, s: s, f: api.F.WOB_AM });
  var baLo = api.cut(the, 200, 220,
    api.fp("M 30 80 C 30 50 170 50 170 80 L 176 210 L 24 210 Z", C.PACK, 6) + api.fp("M 60 120 L 140 120 L 138 180 L 62 180 Z", C.PACK_DARK, 5) +
    '<g transform="translate(70 46)">' + api.fp("M -46 -16 L 40 -16 L 40 16 L -46 16 Z", "#b8392f", 5) + '<ellipse cx="40" cy="0" rx="10" ry="16" fill="#8e2a22" stroke="' + C.INK + '" stroke-width="5"/></g>' +
    '<g transform="translate(118 30) scale(.8)">' + api.cuonCoSVG() + "</g>",
    { pos: { x: W0.x + 190, y: -40, z: W0.z - 10, scale: 0.9 }, f: api.F.AM });
  // sổ trong tay phải: mở → gấp; sổ đặt trên đá (ẩn)
  var soMo = api.fp("M -60 -40 L 0 -32 L 60 -40 L 60 30 L 0 38 L -60 30 Z", C.PAPER, 5) + api.sk("M 0 -32 L 0 38", 4) + api.sk("M -48 -20 L -12 -16 M -48 -6 L -12 -2 M 12 -16 L 48 -20 M 12 -2 L 48 -6", 3, "#9fb7c4");
  var soDong = api.fp("M -34 -42 L 34 -42 L 34 38 L -34 38 Z", "#a9522f", 5) + api.sk("M -26 -42 L -26 38", 4, "#2f3b3c");
  w.holdR.insertAdjacentHTML("beforeend", '<g class="so-mo">' + soMo + '</g><g class="so-dong" opacity="0">' + soDong + "</g>");
  var sMo = w.holdR.querySelector(".so-mo"), sDong = w.holdR.querySelector(".so-dong");
  var soDat = api.cut(the, 90, 40, api.fp("M 4 36 L 10 8 L 86 8 L 80 36 Z", "#a9522f", 5), { pos: { x: W0.x + 110, y: -40, z: W0.z + 30, scale: 0.8 }, f: api.F.AM_NHO });
  gsap.set(soDat, { opacity: 0 });
  var tay = function (arm, g) { var h = api.handWorld("R", arm); return api.holdPose("R", arm, h[0] - 20, h[1] - 30, g || 0); };
  api.armSet(w, "R", -70);
  gsap.set([sMo, sDong], tay(-70));
  api.quaySet(w, 0.35);
  gsap.set([w.pupL, w.pupR], { x: 10, y: -6 });
  api.lidsSet(w, 0.25);
  api.matKhongRong(w);

  // ---------------------------------------------------------------- camera: đi rất chậm giữa các lớp đồi, rồi lùi chậm
  api.camSet(R, null, { cx: -230, cy: -250, cz: -300, k: 150, rx: -3, ry: 7 });
  api.camTo(R, 0, 7.0, { cx: -200, cz: -340, k: 190, ry: 3 }, "sine.inOut");
  api.camTo(R, 7.0, 7.3, { cx: -170, cz: -380, k: 230, ry: -1 }, "sine.inOut");
  api.camTo(R, 14.3, 0.9, { cx: -300, cy: -200, cz: -300, k: 300, rx: -6, ry: 4 }, "power2.inOut"); // về Wob gấp sổ
  api.camTo(R, 15.2, 2.3, { k: 330 }, "sine.inOut");
  api.camTo(R, 17.5, 5.12, { cx: -80, cy: -300, cz: -300, k: 60, rx: -2, ry: 0 }, "sine.inOut");   // lùi chậm, im lặng

  // ---------------------------------------------------------------- Wob nhìn xa, thở chậm
  api.breathe(w, 0, 22.6);
  api.look(w, 6.0, 14, -8, 0.6);
  api.blink(w, 4.2, 0.25); api.blink(w, 10.6, 0.25);
  // "I put my notebook away": gấp sổ, đặt xuống cạnh
  var PUT = tu.put;
  api.quay(w, PUT - 0.2, 0.5, 0.3);
  api.look(w, PUT - 0.2, 10, 10, 0.2);
  tl.set(sMo, { opacity: 0 }, PUT + 0.1); tl.set(sDong, { opacity: 1 }, PUT + 0.1);
  api.armTo(w, "R", PUT + 0.4, 0.5, 10, "power2.inOut");
  tl.to(sDong, Object.assign(tay(10), { duration: 0.5, ease: "power2.inOut" }), PUT + 0.4);
  tl.set(sDong, { opacity: 0 }, PUT + 0.92); tl.set(soDat, { opacity: 1 }, PUT + 0.92);
  api.armTo(w, "R", PUT + 1.0, 0.4, 0, "power2.inOut");
  api.quay(w, PUT + 1.2, 0.3, 0.5);
  api.look(w, PUT + 1.3, 12, -10, 0.5);
  api.lids(w, PUT + 1.3, 0.35, 0.4);
  // đồi tím dần, sao đầu tiên
  tl.to(tim, { opacity: 1, duration: 6.5, ease: "sine.inOut" }, 13.5);
  tl.to(bui, { opacity: 0.3, duration: 6, ease: "sine.inOut" }, 14);
  var tia = api.div("dio-ovl", sk3.stage, "background:linear-gradient(rgba(60,40,110,.0), rgba(70,40,110,.38));");
  gsap.set(tia, { opacity: 0 });
  tl.to(tia, { opacity: 1, duration: 6.5, ease: "sine.inOut" }, 14);
  tl.to(sao, { opacity: 1, duration: 0.8, ease: "sine.out" }, tu.purple + 0.1);
  tl.fromTo(sao, { scale: 2 }, { scale: 2.6, duration: 0.8, ease: "back.out(2)", immediateRender: false }, tu.purple + 0.1);
  api.moiKhung(function (t) { if (t > tu.purple + 0.9) gsap.set(sao.svg, { opacity: 0.85 + 0.15 * Math.sin(t * 3) }); });
  api.vignette(sk3.stage, "am");
};
