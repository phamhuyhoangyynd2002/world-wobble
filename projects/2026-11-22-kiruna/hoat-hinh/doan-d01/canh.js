/* Đoạn d01 (diorama, hiện tại, 3,26 s) – mở video tập 6 Kiruna. Vào dau-video (khung 0 đã có hình), ra chen (cắt cứng).
 * Khung 0: Wob đứng trên bàn kỷ vật (nửa phải khung), giơ CHÌA KHOÁ KIRUNA cạnh mặt (thân chìa dựng đứng, mép trong cách mắt ≥ 60 px),
 * thẻ gỗ dây đỏ đung đưa. Camera đẩy chậm 1,0 → 1,05. Sổ mở trang map-kiruna KHÔNG nhãn, cụm mái nhà giấy tí hon đứng ở chấm thị trấn.
 * "room" (1,43): Wob thổi nhẹ vào răng chìa (chỉ việc này): nhúm bụi SỎI XÁM bay ra 1,50–2,10; nhìn nhúm bụi 2,10; nhìn người xem từ 2,60.
 */
window.CANH = function (api, data) {
  "use strict";
  var tl = api.tl, C = api.C, DUR = api.DUR, sk = api.sk, fp = api.fp;
  var tu = {};
  data.loi.forEach(function (L) { L.tu.forEach(function (w) { var k = w.text.replace(/[^A-Za-z]/g, "").toLowerCase(); if (w.start >= 0 && tu[k] == null) tu[k] = w.start; }); });
  // ---------------------------------------------------------------- BÀN TẬP 6 (khối chung d01 d03 d05 d38 d43 d44 d46; d47 dùng đuôi tập)
  // Sổ gáy x −120 z −240, trang 480×600 (map-kiruna dán trang phải, cắt quanh chấm Kiruna); đèn bàn (−380, −780) đế x −614…−366;
  // chìa "dưới chân đèn" ở CHAN_DEN (trước đế); ba lô nhỏ dựa đầu phải đế đèn (BALO); công tắc dây CT; cửa sổ ĐỨNG bên trái bàn (đinh cột phải);
  // áo phao xanh lam + mũ len xanh lá thông trên móc tường (x 300); hộp kỷ vật sau bên phải; cốc trà cạnh góc sổ.
  function banTap6(api, data, o) {
    o = o || {};
    var C = api.C, sk = api.sk, fp = api.fp;
    var SO = { x: -120, z: -240, w: 480, d: 600 };
    var MAP = { x0: 990, y0: 160, k: 1.1 };
    var mapUV = function (px, py) { return [(px - MAP.x0) / MAP.k, (py - MAP.y0) / MAP.k]; };
    var KIR = mapUV(1320, 520), BC_Y = (591.2 - MAP.y0) / MAP.k;          // chấm Kiruna, vòng Bắc Cực (66,56°N) trên trang
    var trangMap = function (them, src, mk) {
      var M = mk || MAP, vw = SO.w * M.k, vh = SO.d * M.k;
      return '<rect x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" fill="#3f6a70"/>' +
        '<svg x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" viewBox="' + (M.x0 + 14 * M.k) + " " + (M.y0 + 14 * M.k) + " " + (vw - 28 * M.k) + " " + (vh - 28 * M.k) +
        '" preserveAspectRatio="none"><image href="ban-do/' + (src || "map-kiruna") + '.svg" x="0" y="0" width="1920" height="1080"/></svg>' +
        '<rect x="14" y="14" width="' + (SO.w - 28) + '" height="' + (SO.d - 28) + '" fill="none" stroke="' + C.INK + '" stroke-width="5"/>' +
        fp("M 0 30 L 46 0 L 70 22 L 24 54 Z", "#e9dcb4", 2, ' opacity=".85"') + fp("M " + (SO.w - 70) + " 22 L " + (SO.w - 46) + " 0 L " + SO.w + " 30 L " + (SO.w - 24) + " 54 Z", "#e9dcb4", 2, ' opacity=".85"') + (them || "");
    };
    var biaTrong = fp("M 80 330 L 170 220 L 220 280 L 270 200 L 380 330 Z", "#9aa7a8", 4) + fp("M 150 244 L 170 220 L 190 244 Z M 252 222 L 270 200 L 288 222 Z", "#fbfbf6", 3) +
      sk("M 70 120 l 0 -40 M 50 100 l 40 0 M 56 86 l 28 28 M 84 86 l -28 28", 4, C.ICE2) + sk("M 80 470 C 160 440 260 500 380 460", 3, C.INK, ' stroke-dasharray="2 10"');
    var DEN = { x: -380, z: -780 };
    var ban = api.dungBan({ hop: { x: 760, z: -840 }, den: DEN, wob: o.wob, ongBut: o.ongBut, so: { x: SO.x, z: SO.z, w: SO.w, d: SO.d, lop: o.lop || [], biaTrong: biaTrong } });
    var w = ban.wob, so = ban.so, TY = ban.TY, the = ban.the;
    gsap.set(so.cover, { rotationY: -180 });
    if (w) { api.matKhongRong(w); w.pack.style.display = "none"; w.strap.style.display = "none"; }   // ở nhà: không đeo ba lô
    api.cut(the, 220, 330, api.aoPhaoTreoSVG({ mu: true }), { pos: { x: 300, y: -440, z: -1270, scale: 1.5 }, ay: 4, f: api.F.AM });   // áo phao + mũ len trên móc tường
    var BALO = { x: -330, z: -765 };
    var baLo = api.cut(the, 130, 160, api.baLoNhoSVG(), { pos: { x: BALO.x, y: TY, z: BALO.z, rotationZ: -7 }, f: api.F.AM_NHO });  // ba lô nhỏ dựa đầu phải chân đèn
    var CS = { x: -880, z: -1000, w: 380, h: 520 };
    var cuaSo = api.cut(the, CS.w + 30, CS.h, '<g transform="translate(15 0)">' + api.cuaSoSVG(CS.w, CS.h, { troi: o.troiCuaSo || "dem", giot: o.giotCuaSo, seed: 66 }) + "</g>", { pos: { x: CS.x, y: TY, z: CS.z }, f: api.F.AM });
    var DD = api.cuaSoDinh(CS.w, CS.h), DINH = { x: CS.x - CS.w / 2 + DD[0], y: TY - CS.h + DD[1], z: CS.z + 2 };
    // dây đèn trên mặt bàn + công tắc
    api.cut(the, 200, 40, sk("M 4 20 C 60 4 120 36 196 18", 5, "#2f3b3c"), { pos: { x: -380, y: TY - 2, z: -735, rotationX: 90, rotationZ: -24 }, ax: 0, ay: 20 });
    var CT = { x: -190, z: -655 };
    var congTac = api.cut(the, 120, 70, api.congTacSVG(), { pos: { x: CT.x, y: TY, z: CT.z, scale: 1.1 }, f: api.F.AM_NHO });
    var ctCan = congTac.svg.querySelector(".ct-can");
    gsap.set(ctCan, { rotation: o.denTat ? -30 : 30, svgOrigin: "80 46" });
    var CHAN_DEN = { x: -520, z: -690 };                                     // chỗ chìa nằm "dưới chân đèn" (trước đế, trong quầng đèn)
    // cốc trà (hơi mảnh)
    var cocT = api.cocNong({ caoHoi: 70, troiHoi: 6, seed: 61 });
    var COC = { x: 470, z: -470 };
    var coc = api.cut(the, 140, 240, '<g transform="translate(60 228)">' + cocT.svg + "</g>", { pos: { x: COC.x, y: TY, z: COC.z, scale: 0.8 }, ax: 60, ay: 228, f: api.F.AM_NHO });
    cocT.hoi.chay(coc.svg, null, null);
    var PIV = { L: [86, 212], R: [314, 212] }, REST = { L: [-14, 96], R: [14, 96] };
    var goc = function (side, x, y) {
      var a = Math.atan2(y - PIV[side][1], x - PIV[side][0]) - Math.atan2(REST[side][1], REST[side][0]);
      var d = a * 180 / Math.PI; while (d > 180) d -= 360; while (d < -180) d += 360; return d;
    };
    return { ban: ban, w: w, so: so, R: ban.rig, TY: TY, the: the, SO: SO, MAP: MAP, mapUV: mapUV, KIR: KIR, BC_Y: BC_Y, trangMap: trangMap,
      DEN: DEN, BALO: BALO, baLo: baLo, CS: CS, cuaSo: cuaSo, DINH: DINH, CT: CT, congTac: congTac, ctCan: ctCan, CHAN_DEN: CHAN_DEN, COC: COC, coc: coc, goc: goc,
      diemTrang: function (u, v, cao) { return { x: SO.x + u, y: TY - (cao || 10), z: SO.z - SO.d / 2 + v }; } };
  }
  // khẩu hình đoạn nghiêm: X, D (trông như cười) → N, C
  function khauHinhTram(api, w, o) {
    (api.data.loi || []).forEach(function (L) { (L.khau_hinh || []).forEach(function (c) { if (c.value === "X") c.value = "N"; else if (c.value === "D") c.value = "C"; }); });
    return api.khauHinh(w, Object.assign({ sau: "N" }, o || {}));
  }
  // mốc từ lần đọc đầu sau t0 (từ lặp trong câu)
  function tuSau(data, re, t0, mac) { var r = null; data.loi.forEach(function (L) { L.tu.forEach(function (x) { if (re.test(x.text) && x.start > t0 && r === null) r = x.start; }); }); return r === null ? mac : r; }
  // ---------------------------------------------------------------- hết khối chung
  var B = banTap6(api, data, { wob: { x: 640, z: -110, s: 0.9 } });
  var w = B.w, R = B.R, TY = B.TY, the = B.the, so = B.so;
  // trang map-kiruna (không nhãn) + viền nét đứt dưới cụm mái nhà
  var K = B.KIR;
  so.veTrang(B.trangMap('<rect x="' + (K[0] - 52) + '" y="' + (K[1] - 18) + '" width="104" height="40" rx="10" fill="none" stroke="' + C.INK + '" stroke-width="3" stroke-dasharray="8 7" opacity=".8"/>' +
    '<path d="M 16 ' + B.BC_Y.toFixed(1) + ' L ' + (B.SO.w - 16) + ' ' + B.BC_Y.toFixed(1) + '" stroke="#f6eedb" stroke-width="7" stroke-dasharray="16 11" opacity=".95"/>' +
    '<path d="M 16 ' + B.BC_Y.toFixed(1) + ' L ' + (B.SO.w - 16) + ' ' + B.BC_Y.toFixed(1) + '" stroke="' + C.INK + '" stroke-width="3" stroke-dasharray="16 11"/>'));
  var nhaTiHon = "";
  [[8, 34, "#e8d9b8"], [30, 40, "#c99a62"], [54, 32, "#e2b33c"], [76, 38, "#d98f6e"]].forEach(function (n) {
    nhaTiHon += fp("M " + n[0] + " 60 L " + n[0] + " " + (60 - n[1] * 0.55) + " L " + (n[0] + 9) + " " + (60 - n[1]) + " L " + (n[0] + 18) + " " + (60 - n[1] * 0.55) + " L " + (n[0] + 18) + " 60 Z", n[2], 2.5);
  });
  var pK = B.diemTrang(K[0], K[1], 4);
  api.cut(the, 100, 62, nhaTiHon, { pos: { x: pK.x, y: TY - 4, z: pK.z }, ax: 50, ay: 60, f: api.F.AM_NHO });

  // chìa khoá trong tay trái, dựng đứng cạnh mặt
  w.holdL.insertAdjacentHTML("beforeend", '<g class="ck">' + api.chiaKirunaSVG({ dai: 130 }) +
    '<g class="bui" opacity="0">' + [[0, 0, 7], [6, -12, 5], [10, 10, 6], [-4, 16, 4], [14, -4, 4], [2, -20, 4], [18, 14, 5]].map(function (p, i) {
      return '<circle class="bui-' + i + '" cx="' + (118 + p[0]) + '" cy="' + (18 + p[1]) + '" r="' + p[2] + '" fill="#9aa1a6" stroke="' + C.INK + '" stroke-width="1.6"/>'; }).join("") + "</g></g>");
  var ck = w.holdL.querySelector(".ck"), ckThe = ck.querySelector(".ck-the"), bui = ck.querySelector(".bui");
  var KA = -95, A0 = B.goc("L", 30, 190);
  api.armSet(w, "L", A0);
  var h0 = api.handWorld("L", A0);
  gsap.set(ck, api.holdPose("L", A0, h0[0], h0[1], KA, 1.3));
  api.quaySet(w, 0.1);
  api.look(w, 0, -4, 0, 0.01);
  // thẻ gỗ treo theo trọng lực, đung đưa tắt dần
  api.moiKhung(function (t) {
    var sw = 13 * Math.sin(2 * Math.PI * 0.95 * t + 0.6) * Math.exp(-t / 2.4) + (t > 1.45 ? 7 * Math.sin(2 * Math.PI * 1.3 * (t - 1.45)) * Math.exp(-(t - 1.45) / 0.7) : 0);
    ckThe.setAttribute("transform", "rotate(" + (-KA + sw).toFixed(2) + ")");
  });
  api.sfx("ting", 0.12, 0.3);

  // camera: đẩy chậm 1,0 → 1,05
  api.camSet(R, null, { cx: 470, cy: 10, cz: -150, k: 470, rx: -9, ry: 5 });
  api.camTo(R, 0, DUR, { k: 505, cx: 480 }, "sine.inOut");

  // "room": thổi vào răng chìa
  var tRoom = tu.room || 1.43;
  api.quay(w, tRoom - 0.3, -0.25, 0.2);
  api.look(w, tRoom - 0.28, -12, -8, 0.15);
  api.mouth(w, tRoom - 0.06, "O"); api.mouth(w, tRoom + 0.3, "X");
  w.upper.insertAdjacentHTML("beforeend", '<g class="thoi" opacity="0">' + sk("M 168 232 q -14 -8 -26 -2 q -12 -10 -24 -2", 4, "#9fb6c4") + sk("M 160 250 q -12 -6 -22 0", 3.5, "#9fb6c4") + "</g>");
  var thoi = w.upper.querySelector(".thoi");
  tl.fromTo(thoi, { opacity: 0, x: 0 }, { opacity: 0.95, x: -16, duration: 0.18, immediateRender: false }, tRoom - 0.02);
  tl.to(thoi, { opacity: 0, x: -34, duration: 0.2 }, tRoom + 0.2);
  // bụi sỏi bay ra 1,50–2,10 (trong hệ chìa: +x = dọc thân lên trên)
  var tBui = tRoom + 0.07;
  tl.set(bui, { opacity: 1 }, tBui);
  [[40, -26], [56, 10], [30, 34], [48, -44], [62, -8], [36, 20], [66, 30]].forEach(function (v, i) {
    var el = ck.querySelector(".bui-" + i);
    tl.fromTo(el, { x: 0, y: 0, scale: 0.4 }, { x: v[0], y: v[1], scale: 1.3, transformOrigin: "50% 50%", duration: 0.6, ease: "power2.out", immediateRender: false }, tBui + i * 0.02);
    tl.to(el, { opacity: 0, duration: 0.18 }, tBui + 0.42 + i * 0.02);
  });
  tl.to(ck, Object.assign(api.holdPose("L", A0, h0[0], h0[1] + 4, KA + 4, 1.3), { duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" }), tBui);
  // nhìn nhúm bụi, rồi nhìn người xem
  api.look(w, 2.1, -16, -18, 0.15);
  api.lids(w, 2.12, 0.15, 0.12);
  api.quay(w, 2.55, 0.05, 0.22);
  api.look(w, 2.6, 0, 3, 0.15);
  api.lids(w, 2.62, 0.42, 0.15);

  api.khauHinh(w, { bo: [[tRoom - 0.1, tRoom + 0.36]] });
  api.gatDau(w, { bo: [[tRoom - 0.3, DUR]] });
  api.breathe(w, 0, DUR);
};
