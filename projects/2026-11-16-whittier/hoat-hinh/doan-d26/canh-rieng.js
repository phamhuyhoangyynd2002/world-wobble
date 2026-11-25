/* Đoạn d26 · cắt giấy · hồi ức mùa hè: Begich Towers (một khối kem 14 tầng, ba khối nối liền, vẽ bằng thư viện) dưới chân núi xanh có thác,
   cỏ xanh, người que áo phông dạng chung đi dạo. Vào "cat" (khung đầu là cửa toà nhà), ra "giay".
   Trang phục: mũ lưỡi trai xanh băng, không áo mưa, ba lô ô liu có cuộn thảm đỏ; cầm dép lê → cất vào ba lô; lôi ủng cao su ra (ủng run, lo lắng);
   tháo giày đỏ rồi xỏ ủng (từ đây đi ủng). Không chữ. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, at = api.at, g = api.g, DUR = api.DUR;
  var T = function (w, tMin, du) { var v = api.tuDung(w, tMin || 0); return v == null ? du : v; };
  var GROUND = 840, SZ = 0.3, BX = 1000;
  var dep = '<g id="W-dep" transform="translate(0,10) rotate(-20) scale(0.9)">' + WH.depLe("depc", 1) + "</g>";
  var W = WH.wob(api, "W", { mu: "luoi", holdR: dep });

  var xa = WH.nui(-800, 3000, 600, 2601, { mau: "#6F9E6C", tuyet: "#F4F8F8", cao: [380, 560], thac: true });
  var mid = WH.dat(-800, 3000, GROUND - 20, "#8DBB7C", 2602, { cao: 900 });
  mid += WH.nuoc("bay", 1700, 3200, GROUND - 22, 30, { grad: "whNuocHe", seed: 2603 });
  mid += at(BX, GROUND - 20, WH.begich("bt", { sc: 1.6 }));
  mid += D.paper("M " + (BX - 90) + " " + (GROUND - 20) + " L " + (BX + 90) + " " + (GROUND - 20) + " L " + (BX + 130) + " 1100 L " + (BX - 130) + " 1100 Z", "#C9BFA6", { shadow: false });
  var ng = [["n1", 300, "#D9776A"], ["n2", 1650, "#6FA8C0"], ["n3", 2000, "#E2B33C"]];
  ng.forEach(function (n) { mid += at(0, 0, g(n[0] + "p", '<g transform="scale(0.95)">' + WH.nguoi(n[0], { mau: n[2] }) + "</g>")); });
  mid += at(0, 0, g("UNG", '<g transform="scale(0.6)">' + WH.ungRoi("ung", 1) + "</g>"));
  mid += at(0, 0, g("GD", '<g transform="scale(0.32)">' + WH.giayDoRoi("gdc") + "</g>"));
  mid += W.svg;
  var gan = at(0, 0, g("n4p", '<g transform="scale(1.9)">' + WH.nguoi("n4", { mau: "#9E7BB5", da: "#8A6A55" }) + "</g>")) +
    at(-160, 1120, D.paper(D.rEll(0, -30, 260, 120, 3, 2604), "#5E8E5A", { stroke: true, sw: 4 }));

  api.dat('<rect width="1920" height="1080" fill="url(#whHe)"/>' + WH.defs() +
    api.lop("xa", xa, 0.35, { mat: 600 }) + api.lop("giua", mid, 1, { mat: GROUND }) + api.lop("gan", gan, 1.4, { mat: 1120 }));
  api.noi({});

  var tQuiet = T("quiet", 0, 0.21), tDoor = T("door", 0, 2.48), tBuild = T("building", 0, 4.21), tMount = T("mountain.", 0, 6.99), tPeople = T("people", 0, 8.07);
  var tShirts = T("t-shirts.", 0, 10.88), tPut = T("put", 0, 12.07), tSlip = T("slippers", 0, 12.34), tFound = T("found", 0, 13.28), tBoots = T("boots.", 0, 13.64), tNerv = T("nervous.", 0, 14.89);

  var DOORY = GROUND - 20 - 56;
  api.camera([
    [0, BX, DOORY - 20, 3.0], [0.5, BX + 20, DOORY - 20, 2.9, "sine.inOut"],
    [tDoor + 0.9, 1020, 520, 0.98, "power2.inOut"], [tPeople - 0.2, 980, 540, 1.02, "sine.inOut"],
    [tShirts + 0.3, 900, 560, 1.06, "sine.inOut"],
    [tPut - 0.1, 1250, GROUND - 60, 2.6, "power3.inOut"], [DUR, 1262, GROUND - 60, 2.72, "sine.inOut"]
  ]);

  // cửa mở, Wob bước ra cỏ
  api.origin("#bt-cua", "0 0");
  api.key("#bt-cua", "scaleX", 0, 1, "step"); api.key("#bt-cua", "scaleX", 0.1, 1, "none"); api.key("#bt-cua", "scaleX", 0.5, 0.1, "power3.out");
  api.key("#bt-cua", "scaleX", 2.6, 0.1, "none"); api.key("#bt-cua", "scaleX", 3.0, 1, "power2.inOut");
  W.set(0, { x: BX, y: GROUND - 22, size: SZ * 0.9, lashes: 0, ice: 0, aRu: -30, aRf: 20, aLu: 18, aLf: -10 });
  W.mouth(0, "grin");
  W.walk(0.45, 2.2, BX, 1250, { step: 0.3 });
  W.pose(0.45, 1.75, { size: SZ, y: GROUND - 6 }, "sine.inOut");
  W.pose(2.25, 0.3, { pupX: -8, pupY: -10 }, "power2.out");         // ngước nhìn toà nhà
  W.nhinQuanh(tBuild + 0.4);
  W.idle(2.6, tPut - 0.2, { seed: 261, bien: 1.2 });
  W.pose(tPeople, 0.3, { pupX: -12, pupY: 0 }, "power2.out");
  W.mouth(tShirts, "o");
  W.pose(tShirts + 0.1, 0.25, { eye: 1.15 }, "back.out(2)"); W.pose(tShirts + 0.7, 0.3, { eye: 1 }, "power2.out");
  // người que áo phông đi dạo (dạng chung)
  function diDao(id, x0, x1, y, t0, t1, buoc) {
    api.key("#" + id + "p", "x", 0, x0, "step"); api.key("#" + id + "p", "y", 0, y, "step");
    api.key("#" + id + "p", "x", t0, x0, "none"); api.key("#" + id + "p", "x", t1, x1, "none");
    api.origin("#" + id + "-cL", "0 0"); api.origin("#" + id + "-cR", "0 0");
    var n = Math.round((t1 - t0) / buoc);
    for (var i = 0; i <= n; i++) { var a = i % 2 ? 18 : -18; api.key("#" + id + "-cL", "rotation", t0 + i * buoc, a, "sine.inOut"); api.key("#" + id + "-cR", "rotation", t0 + i * buoc, -a, "sine.inOut"); }
  }
  diDao("n1", 200, 760, GROUND - 4, 0, DUR, 0.42);
  diDao("n2", 1800, 1420, GROUND + 4, 0, DUR, 0.45);
  diDao("n3", 2100, 1600, GROUND - 10, 2.5, DUR, 0.4);
  diDao("n4", -300, 900, 1180, tPeople - 0.6, tShirts + 1.6, 0.5);       // tiền cảnh đi ngang khung
  // cất dép lê vào ba lô
  W.pose(tPut - 0.1, 0.35, { aRu: -150, aRf: -60, pupX: 12, pupY: -6, upRot: 6 }, "power2.inOut");
  api.show("#W-dep", 0, 1); api.show("#W-dep", tSlip + 0.35, 0);
  W.pose(tSlip + 0.4, 0.3, { packY: -6 }, "back.out(2)"); W.pose(tSlip + 0.7, 0.2, { packY: 0 }, "power2.out");
  // lôi ủng ra: ủng đặt xuống cạnh chân, run, mắt lo lắng
  W.pose(tFound - 0.2, 0.3, { aRu: -150, aRf: -40 }, "power2.inOut");
  W.pose(tBoots - 0.05, 0.3, { aRu: -60, aRf: 30, upRot: 0, pupX: 12, pupY: 8 }, "power2.out");
  var UX = 1335, UY = GROUND - 2;
  api.show("#UNG", 0, 0); api.show("#UNG", tBoots - 0.05, 1);
  api.key("#UNG", "x", 0, UX - 30, "step"); api.key("#UNG", "y", 0, UY - 70, "step");
  api.key("#UNG", "x", tBoots - 0.05, UX - 30, "none"); api.key("#UNG", "x", tBoots + 0.3, UX, "power2.out");
  api.key("#UNG", "y", tBoots - 0.05, UY - 70, "none"); api.key("#UNG", "y", tBoots + 0.3, UY, "bounce.out");
  api.show("#ung-mat", 0, 0); api.show("#ung-mat", tBoots + 0.5, 1);
  var t = tNerv - 0.4, s = 1;
  while (t < tNerv + 0.9) { api.key("#UNG", "x", t, UX + s * 2.5, "sine.inOut"); s = -s; t += 0.06; }
  W.pose(tNerv - 0.2, 0.25, { pupX: 14, pupY: 10, lean: 6 }, "power2.out");
  W.mouth(tNerv, "flat");
  // tháo giày đỏ (văng ra cỏ), xỏ ủng
  var tGiay = tNerv + 0.55, tXo = tNerv + 0.95;
  W.pose(tGiay - 0.15, 0.15, { legR: -40 }, "power2.out"); W.pose(tGiay, 0.15, { legR: 0 }, "power2.in");
  api.show("#GD", 0, 0); api.show("#GD", tGiay, 1);
  api.key("#GD", "x", 0, 1255, "step"); api.key("#GD", "y", 0, GROUND - 6, "step");
  api.key("#GD", "x", tGiay, 1255, "none"); api.key("#GD", "x", tGiay + 0.4, 1170, "power1.out");
  api.key("#GD", "y", tGiay, GROUND - 6, "none"); api.key("#GD", "y", tGiay + 0.2, GROUND - 40, "power2.out"); api.key("#GD", "y", tGiay + 0.4, GROUND + 2, "power2.in");
  api.key("#GD", "rotation", tGiay, 0, "none"); api.key("#GD", "rotation", tGiay + 0.4, -160, "none");
  W.doiUng(tGiay, false);
  api.show("#W-giayL", tGiay, 0); api.show("#W-giayR", tGiay, 0);
  api.show("#UNG", tXo, 0); W.doiUng(tXo, true);
  W.pose(tXo - 0.1, 0.12, { y: GROUND - 20, sy: 0.92 }, "power2.out"); W.pose(tXo + 0.05, 0.25, { y: GROUND - 6, sy: 1 }, "back.out(2)");
  W.shiver(tXo + 0.1, tXo + 0.5, 1.2, 16);
  W.mouth(tXo + 0.2, "wobbly");
  W.autoBlink(0.8, DUR, 2605);
};
