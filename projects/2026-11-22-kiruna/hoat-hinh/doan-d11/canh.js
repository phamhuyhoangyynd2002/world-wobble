/* d11 · vẽ tay · chèn: bong bóng tưởng tượng "đồng hồ cát" (117,92–125,769 s tuyệt đối; 7,85 s). Vào "chen", ra "cat".
 * Viền mây dreamFrame suốt đoạn. Đồng hồ cát to, đế có ngăn kéo nhỏ; mấy mái nhà tí hon có ống khói đứng trên lớp cát trên cùng.
 * "Think of an hourglass." Wob đặt mũ bảo hộ xuống, đứng cạnh · "Pull" Wob kéo ngăn kéo ở đáy, cát chảy ra · "sinks." mặt cát trên lõm xuống
 * · "Kiruna's old centre is the top of the pile." camera đẩy vào lớp cát trên cùng; một mái nhà nghiêng theo cát lún, ống khói thò hai tay bám mép mái; giữ 0,6 s.
 * Đồ Wob (vẽ tay, mùa đông gọn): áo phao xanh lam một túi phải, mũ len xanh lá thông bông kem, khăn kem sọc xanh lá thông, ba lô ô liu cỡ thường, giày đỏ; mũ bảo hộ trắng cầm tay.
 * Không chữ.
 */
window.CANH = function (VT, D) {
  var key = VT.key, seg = VT.seg, E = VT.ease, C = VT.C, f = VT.f;
  var T_PULL = VT.tu("Pull"), T_SINKS = VT.tu("sinks"), T_KIR = VT.tu("Kiruna's"), T_TOP2 = VT.tu("top", 1), T_PILE2 = VT.tu("pile", 1);
  var DUR = D.thoi_luong, GROUND = 930, HX = 900, WS = 0.62;
  var HG = { x: HX, y: GROUND, h: 640, w: 340 };

  function W(t, o) {
    var b = { t: t, s: WS, puffer: true, beanie: "thong", scarf: "kem-xanh", packColor: "kiruna", keyRing: true, mouth: "X" };
    for (var k in o) b[k] = o[k];
    b.lid = Math.max(b.lid || 0, b.noBlink ? 0 : VT.blink(t, 2.8, 0.2));
    return VT.wob(b);
  }
  // trạng thái cát theo thời gian
  function sand(t) {
    var k = E.io(seg(t, T_PULL + 0.25, T_SINKS + 0.1));
    var k2 = E.io(seg(t, T_KIR, DUR - 0.5));
    return { top: 0.8 - 0.26 * k - 0.06 * k2, sink: 0.85 * k + 0.25 * k2, drawer: E.out(seg(t, T_PULL - 0.05, T_PULL + 0.3)), stream: t > T_PULL + 0.2 };
  }
  var HOUSES = [[-92, "#C9603A", 7], [-8, "#5B8A8A", 3], [80, "#E2B33C", 11]];
  function houses(t, sd, gag) {
    var o = { h: HG.h, w: HG.w, top: sd.top, sink: sd.sink }, hw = HG.w / 2 - 18, s = "";
    HOUSES.forEach(function (h, i) {
      var x = h[0], y = VT.dongHoCatMat(o, x), slope = (VT.dongHoCatMat(o, x + 4) - VT.dongHoCatMat(o, x - 4)) / 8;
      var lean = Math.atan(slope) * 57.3;
      var hands = 0;
      if (i === 2 && gag) { lean += key(t, [[T_KIR + 0.2, 0], [T_TOP2 - 0.1, 14, "io"], [T_PILE2, 22, "in2"], [T_PILE2 + 0.12, 19, "out"]]); hands = E.back(seg(t, T_TOP2 + 0.05, T_TOP2 + 0.35)); }
      s += VT.nhaTiHon({ x: HX + x, y: GROUND + y + 6, w: 50, lean: lean, col: h[1], hands: hands, eyes: hands > 0.2 });
    });
    return s;
  }
  function world(t, o) {
    o = o || {};
    var sd = sand(t), s = VT.rectS(-1200, -1200, 3100, GROUND, "#E9F1F4", { sw: 0, ox: 0, oy: 0 });
    s += VT.shape("M -1200 " + GROUND + " L 3100 " + GROUND + " L 3100 2400 L -1200 2400 Z", "#F6F2E8", { sw: 6, ox: 0, oy: 0 });
    if (sd.drawer > 0.5) {
      var pk = seg(t, T_PULL + 0.25, T_SINKS + 0.6), px = HX + 56 + 110 * sd.drawer + 34;
      s += VT.shape("M " + f(px - 90 * pk - 20) + " " + GROUND + " C " + f(px - 40) + " " + f(GROUND - 70 * pk - 6) + " " + f(px + 40) + " " + f(GROUND - 70 * pk - 6) + " " + f(px + 90 * pk + 20) + " " + GROUND + " Z", "#E2C27A", { sw: 5 });
      if (t < T_SINKS + 0.6) s += VT.line("M " + f(px - 20) + " " + (GROUND - 40) + " C " + f(px) + " " + (GROUND - 36) + " " + f(px + 2) + " " + (GROUND - 20) + " " + f(px + 2) + " " + f(GROUND - 70 * pk), 7, "#E2C27A");
    }
    s += VT.dongHoCat({ x: HX, y: GROUND, h: HG.h, w: HG.w, top: sd.top, sink: sd.sink, drawer: sd.drawer, stream: sd.stream, t: t });
    s += houses(t, sd, o.gag);
    if (o.hat) s += o.hat;
    return s;
  }

  var shots = [];
  function shot(a, b, ten, ve) { shots.push({ a: a, b: b, ten: ten, ve: ve }); }
  var HAT_DOWN = 0.95, HAT_POS = [1560, GROUND];

  // ===== S0 · đồng hồ cát trong viền mây; Wob đặt mũ bảo hộ xuống, đứng cạnh =====
  var B0 = T_PULL - 0.35;
  shot(0, B0, "đồng hồ cát, Wob đặt mũ xuống", function (t, lt, T) {
    var bend = E.io(seg(t, 0.45, HAT_DOWN)) * (1 - E.io(seg(t, HAT_DOWN + 0.1, HAT_DOWN + 0.45)));
    var o = { x: 1440, y: GROUND, flip: -1, lean: -14 * bend, px: -12, py: 6 + 8 * bend, brows: "up", mouth: "content" };
    var hat = "";
    if (t < HAT_DOWN) { o.armR = [VT.lerp(360, 420, bend), VT.lerp(250, 360, bend)]; o.handR = "nam"; o.propFront = VT.muBaoHo({ x: o.armR[0] + 10, y: o.armR[1] + 18, s: 0.36, rot: -10 }); }
    else hat = VT.muBaoHo({ x: HAT_POS[0], y: HAT_POS[1] - 4, s: 0.26 });
    if (t > HAT_DOWN + 0.3) { o.px = -14; o.py = -10; o.mouth = "smile"; }
    var out = world(t, { hat: hat }) + W(t, o);
    return { cam: [1100, 600, 1.08 + 0.04 * seg(T, 0, B0)], world: out, over: VT.dreamFrame(t), tint: null };
  });

  // ===== S1 · Wob kéo ngăn kéo ở đáy ("Pull"), cát chảy ra =====
  var B1 = T_PULL + 1.45;
  shot(B0, B1, "kéo ngăn kéo, cát chảy", function (t, lt, T) {
    var o = { x: 1270, y: GROUND, flip: -1, px: -14, py: 12, brows: "flat", mouth: "flat", lean: -8 };
    var dr = sand(t).drawer, hd = [HX + 56 + 110 * dr + 6, GROUND - 31];
    var reach = E.io(seg(t, B0, T_PULL - 0.08));
    var rest = VT.wobPt({ s: WS, x: o.x, y: o.y, flip: -1, lean: -8 }, 338, 300);
    var hx = VT.lerp(rest[0], hd[0], reach), hy = VT.lerp(rest[1], hd[1], reach);
    o.s = WS; o.armR = VT.wobLocal(o, hx, hy); o.handR = "nam"; o.legs = dr > 0.3 ? "apart" : "stand";
    if (dr > 0.6) { o.lean = -8 + 6 * Math.sin(Math.min(1, seg(t, T_PULL + 0.3, T_PULL + 0.6)) * Math.PI); o.eyes = "open"; o.py = 18; o.brows = "up"; o.mouth = "oSmall"; }
    var out = world(t, { hat: VT.muBaoHo({ x: HAT_POS[0], y: HAT_POS[1] - 4, s: 0.26 }) }) + W(t, o);
    return { cam: [1080, 720, 1.4 + 0.05 * seg(T, B0, B1)], world: out, over: VT.dreamFrame(t), tint: null };
  });

  // ===== S2 · cận bầu trên: mặt cát lõm dần xuống ("sinks."); Wob ló vào mép khung nhìn =====
  var B2 = T_KIR - 0.05;
  shot(B1, B2, "mặt cát trên lõm xuống", function (t, lt, T) {
    var out = world(t);
    out += W(t, { x: HX + 330, y: 780, flip: -1, px: -16, py: -12, brows: "up", mouth: t > T_SINKS ? "o" : "oSmall", lean: -6, armR: [360, 120], handR: "chi" });
    return { cam: [HX + 40, 420, 2.0 + 0.1 * seg(T, B1, B2)], world: out, over: VT.dreamFrame(t), tint: null };
  });

  // ===== S3 · đẩy vào lớp cát trên cùng: nhà tí hon; một mái nghiêng, ống khói thò tay bám mép mái; giữ =====
  shot(B2, DUR, "đẩy vào mái nhà tí hon", function (t, lt, T) {
    var out = world(t, { gag: true });
    var sd = sand(t), yS = GROUND + VT.dongHoCatMat({ h: HG.h, w: HG.w, top: sd.top, sink: sd.sink }, 40);
    out += W(t, { s: 0.3, x: HX + 205, y: yS + 92, flip: -1, px: -14, py: -14, brows: "worried", mouth: t > T_TOP2 ? "o" : "flat", noBlink: t > T_TOP2, armR: [300, 150], handR: "tron" });
    var push = E.io3(seg(T, B2, B2 + 0.9)), push2 = E.io3(seg(T, T_TOP2 - 0.3, T_TOP2 + 0.3));
    return { cam: [VT.lerp(HX + 40, HX + 50 + 50 * push2, push), VT.lerp(420, yS - 40 - 10 * push2, push), VT.lerp(2.1, 3.2, push) + 0.6 * push2 + 0.1 * seg(T, T_TOP2 + 0.3, DUR)], world: out, over: VT.dreamFrame(t), tint: null };
  });

  return shots;
};
