/* dio-ban.js: sân khấu "bàn kỷ vật" – khung HIỆN TẠI của kênh (Wob ở nhà kể chuyến đi), dùng lại mọi tập.
 * api.dungBan(o) dựng: tường + kệ sách, mặt bàn gỗ dưới đèn bàn ấm, hộp kỷ vật 3D mở nắp (đồ bên trong tuỳ chọn),
 * ống bút mờ phía trước, sổ du lịch pop-up (tuỳ chọn), Wob, và các đồ tuỳ chọn (cá cứng, cá mềm + vũng nước, cốc nóng, chăn).
 *
 * Toạ độ thế giới (px): mặt bàn y = TY = 260; x sang phải; z dương về phía người xem. Mặc định:
 *   hộp kỷ vật tâm (−300, −380), 340×230, cao 150 → mặt trước z = −265, miệng hộp y = 110
 *   sổ: gáy x = 330, tâm z = −330, trang 460×580
 *   Wob: (250, 60), s = 0.9
 */
(function () {
  "use strict";
  var DIO = (window.DIO = window.DIO || {});
  DIO.mo = DIO.mo || [];

  DIO.mo.push(function (api) {
    var tl = api.tl, C = api.C, sk = api.sk, fp = api.fp, INK = C.INK;

    var DO_HOP = {
      gang: function (bx, bz, TY, the) {
        api.cut(the, 120, 150, fp("M 30 150 L 26 60 C 24 30 40 14 60 18 C 70 4 96 8 96 34 L 98 150 Z", C.TERRA, 5) + fp("M 24 64 C 6 60 4 90 26 96", C.TERRA, 5) + sk("M 30 120 L 96 120", 5, C.PAPER),
          { pos: { x: bx - 100, y: TY - 30, z: bz - 30 }, f: api.F.AM });
      },
      anh: function (bx, bz, TY, the) {
        api.cut(the, 130, 170, fp("M 10 170 L 20 20 L 120 30 L 112 170 Z", C.PAPER, 5) + fp("M 34 50 L 98 56 L 92 120 L 30 114 Z", "#cfe3ec", 3) + fp("M 30 114 L 52 80 L 66 98 L 78 84 L 92 120 Z", C.SNOW, 3),
          { pos: { x: bx + 10, y: TY - 30, z: bz - 60, rotationZ: 6 }, f: api.F.AM });
      },
      thong: function (bx, bz, TY, the) {
        api.cut(the, 100, 120, fp("M 50 6 C 86 30 92 80 50 116 C 8 80 14 30 50 6 Z", "#8a5a3b", 5) + sk("M 30 40 L 70 40 M 24 64 L 76 64 M 30 88 L 70 88", 3, INK, ' opacity=".5"'),
          { pos: { x: bx + 110, y: TY - 30, z: bz - 20 }, f: api.F.AM });
      }
    };

    api.dungBan = function (o) {
      o = o || {};
      var TY = 260;
      var sk3 = api.sanKhau({ cha: o.cha });
      var the = sk3.the;
      var ban = { stage: sk3.stage, rig: sk3.rig, the: the, TY: TY };

      // tường + vùng sáng đèn
      api.plane(the, { x: 0, y: -900, z: -1300 }, 6200, 2600,
        "background:radial-gradient(ellipse 900px 700px at 2250px 1300px, rgba(255,196,110,.42), rgba(255,196,110,0) 70%), repeating-linear-gradient(90deg, rgba(255,240,220,.035) 0 70px, rgba(0,0,0,0) 70px 140px), #2e2522;");
      if (o.ke !== false) {
        var s = fp("M 0 250 L 900 250 L 900 272 L 0 272 Z", C.WOOD, 5);
        var cols = [C.TERRA, C.TEAL, C.PAPER2, "#9c5b3b", C.SEA, C.PAPER, "#7d6a4b", C.TERRA, C.TEAL], x = 30;
        for (var i = 0; i < 9; i++) {
          var bw = 44 + ((i * 17) % 30), bh = 150 + ((i * 37) % 70);
          s += fp("M " + x + " " + (250 - bh) + " h " + bw + " v " + bh + " h " + -bw + " Z", cols[i], 4) + sk("M " + (x + 8) + " " + (250 - bh + 20) + " h " + (bw - 16), 3, INK, ' opacity=".4"');
          x += bw + 6;
        }
        s += fp("M 640 250 C 640 200 700 196 712 250 Z", "#7d6a4b", 4) + fp("M 676 200 C 650 140 640 110 660 90 C 680 120 686 160 676 200 Z M 680 200 C 700 150 730 130 750 130 C 742 160 716 190 680 200 Z", "#5E9E6A", 4);
        s += fp("M 760 250 l 0 -100 l 110 0 l 0 100 Z", C.PAPER, 5) + fp("M 776 166 l 78 0 l 0 68 l -78 0 Z", "#cfe3ec", 3) + fp("M 776 234 l 26 -40 l 18 24 l 14 -16 l 20 32 Z", C.SNOW, 3);
        api.cut(the, 900, 280, s, { pos: { x: 620, y: -230, z: -1290 }, f: api.F.AM });
      }
      // mặt bàn gỗ
      api.floorPlane(the, 0, TY, -500, 4400, 2600,
        "background:radial-gradient(ellipse 1100px 900px at 1950px 1150px, rgba(255,205,130,.55), rgba(255,205,130,0) 70%), repeating-linear-gradient(90deg, rgba(0,0,0,0) 0 236px, rgba(40,20,8,.55) 236px 242px), repeating-linear-gradient(90deg, rgba(255,230,190,.05) 0 9px, rgba(0,0,0,0) 9px 31px), #7a4b2b;");
      // đèn bàn
      if (o.den !== false) {
        var d = '<circle cx="330" cy="300" r="230" fill="url(#dio-glowW)"/><path d="M 300 300 L 620 700 L 60 700 Z" fill="url(#dio-coneW)" opacity=".55"/>';
        d += fp("M 100 696 C 100 660 340 660 340 696 Z", "#2f3b3c", 6) + '<ellipse cx="220" cy="696" rx="124" ry="16" fill="#2f3b3c" stroke="' + INK + '" stroke-width="6"/>';
        d += sk("M 220 670 L 150 400", 18) + sk("M 220 670 L 150 400", 9, "#9aa39a") + '<circle cx="150" cy="400" r="15" fill="' + C.TERRA + '" stroke="' + INK + '" stroke-width="5"/>';
        d += sk("M 150 400 L 290 200", 18) + sk("M 150 400 L 290 200", 9, "#9aa39a") + '<circle cx="290" cy="200" r="15" fill="' + C.TERRA + '" stroke="' + INK + '" stroke-width="5"/>';
        d += '<g transform="rotate(-28 300 200)">' + fp("M 262 176 L 338 176 L 410 316 L 190 316 Z", C.TERRA, 7) + sk("M 250 200 L 350 200", 4, INK, ' opacity=".35"') +
          '<ellipse cx="300" cy="316" rx="110" ry="24" fill="#ffe6a3" stroke="' + INK + '" stroke-width="6"/><circle cx="300" cy="312" r="30" fill="#fff7d8"/></g>';
        var dn = o.den || {};
        ban.den = api.cut(the, 660, 720, d, { pos: { x: dn.x != null ? dn.x : -820, y: TY, z: dn.z != null ? dn.z : -600 }, f: api.F.AM });
      }
      // hộp kỷ vật (hộp 3D thật, nắp mở)
      var BOX = (ban.hop = Object.assign({ x: -300, z: -380, w: 340, d: 230, h: 150, do: ["gang", "anh", "thong"] }, o.hop || {}));
      (function () {
        var bx = BOX.x, bz = BOX.z, hw = BOX.w, hd = BOX.d, hh = BOX.h, yc = TY - hh / 2;
        var side = "background:linear-gradient(#4b7d84,#335a60);border:6px solid " + INK + ";";
        api.floorPlane(the, bx, TY - 2, bz, hw, hd, "background:#22393c;");
        api.plane(the, { x: bx, y: yc, z: bz - hd / 2 }, hw, hh, side);
        api.plane(the, { x: bx - hw / 2, y: yc, z: bz, rotationY: 90 }, hd, hh, side);
        api.plane(the, { x: bx + hw / 2, y: yc, z: bz, rotationY: 90 }, hd, hh, side);
        (BOX.do || []).forEach(function (k) { if (DO_HOP[k]) DO_HOP[k](bx, bz, TY, the); });
        ban.trongHop = api.P(the, { x: bx, y: TY, z: bz }); // canh.js gắn thêm đồ vào trong hộp ở đây
        api.plane(the, { x: bx, y: yc, z: bz + hd / 2 }, hw, hh, side + "box-shadow: inset 0 -10px 0 rgba(0,0,0,.18);");
        api.plane(the, { x: bx, y: yc + 6, z: bz + hd / 2 + 1 }, 150, 56, "background:" + C.PAPER + ";border:4px solid " + INK + ";border-radius:6px;");
        var lid = api.P(the, { x: bx, y: TY - hh, z: bz - hd / 2, rotationX: 18 });
        api.div("dio-face", lid, "left:" + -hw / 2 + "px;top:" + -hd + "px;width:" + hw + "px;height:" + hd + "px;background:linear-gradient(#5d9097,#3F6A70);border:6px solid " + INK + ";");
        BOX.mieng = TY - hh; BOX.truoc = bz + hd / 2;
      })();
      // ống bút phía trước (lớp gần, mờ nhoè) – tạo cảm giác chiều sâu
      if (o.ongBut !== false) {
        var ob = o.ongBut || {};
        api.cut(the, 220, 330, fp("M 30 330 L 20 120 L 200 120 L 190 330 Z", C.TEAL, 7) + sk("M 24 170 L 196 170", 5, C.PAPER) + fp("M 60 120 L 40 10 L 70 10 L 84 120 Z", "#e7b34b", 5) +
          fp("M 110 120 L 120 30 L 146 32 L 136 120 Z", C.TERRA, 5) + fp("M 150 120 L 176 0 L 196 6 L 170 120 Z", C.SEA, 5),
          { pos: { x: ob.x != null ? ob.x : -900, y: TY, z: ob.z != null ? ob.z : 380 }, f: api.F.AM_GAN });
      }
      // sổ du lịch pop-up
      if (o.so) {
        var so = o.so;
        ban.so = api.soPopup(the, { x: so.x != null ? so.x : 330, y: TY, z: so.z != null ? so.z : -330, w: so.w || 460, d: so.d || 580, lop: so.lop || [], biaTrong: so.biaTrong, mauBia: so.mauBia });
        if (so.moSan) ban.so.moSan();
      }
      // cá mềm oặt vắt trên mép hộp + vũng nước + giọt
      if (o.caMem) {
        var cm = o.caMem === true ? {} : o.caMem;
        var cx = BOX.x + (cm.dx != null ? cm.dx : 60);
        var el = api.cut(the, 440, 280, api.caMemSVG(), { pos: { x: cx, y: BOX.mieng + 6, z: BOX.truoc + 6 }, f: api.F.AM, ax: 250, ay: 72 });
        var dau = el.svg.querySelector(".lhead");
        gsap.set(dau, api.TF(0, 0, cm.goc != null ? cm.goc : 30));
        ban.caMem = {
          el: el, dau: dau,
          vung: api.vungNuoc(the, cx + 70, TY - 1, BOX.truoc + 75, 280, 120),
          giot: api.giotNuoc(the, cx + 82, BOX.mieng + 60, BOX.truoc + 20),
          giotX: cx + 82, giotTu: BOX.mieng + 60, giotToi: TY - 10
        };
        gsap.set(ban.caMem.giot, { opacity: 0 });
      }
      // cá cứng đứng trên bàn (ẩn; canh.js hiện khi Wob đặt xuống)
      if (o.caDung) {
        ban.caDung = api.cut(the, 120, 300, '<g transform="translate(60 150) rotate(-90)">' + api.fishSVG("") + "</g>", { pos: { x: 0, y: TY, z: 0 }, f: api.F.AM, ay: 300 });
        gsap.set(ban.caDung, { opacity: 0 });
      }
      // Wob
      if (o.wob !== false) {
        var wo = o.wob || {};
        var w = (ban.wob = api.makeWob(the, { x: wo.x != null ? wo.x : 250, y: TY, z: wo.z != null ? wo.z : 60, s: wo.s || 0.9, f: api.F.WOB_AM, trangPhuc: wo.trangPhuc }));
        if (o.caCung) { // cá cứng trong tay trái
          w.holdL.insertAdjacentHTML("beforeend", '<g class="hfish">' + api.fishSVG("") + "</g>");
          ban.ca = w.holdL.querySelector(".hfish");
        }
        if (o.coc) { // cốc nóng ôm hai tay (nằm trong nhóm tay phải)
          var co = o.coc === true ? {} : o.coc;
          var coc = api.cocNong({ caoHoi: co.caoHoi || 90, troiHoi: co.troiHoi == null ? 30 : co.troiHoi });
          w.holdR.insertAdjacentHTML("beforeend", coc.svg);
          ban.coc = { el: w.holdR.querySelector(".coc"), hoi: coc.hoi };
          coc.hoi.chay(w.holdR, null, null);
          // tư thế cầm cốc. p: { L, R (góc tay), x, y (tâm cốc trong hệ 400×400 của Wob), goc (nghiêng cốc) }
          // Mặc định cốc ở bên phải thân (hơi nước bốc cạnh mặt, không che mặt); nhấp: { R: 70, x: 236, y: 290, goc: -18 }
          ban.COC_THUONG = { L: -20, R: 40, x: 278, y: 292, goc: 0 };
          ban.omCoc = function (t, p, dur) {
            p = Object.assign({}, ban.COC_THUONG, p || {});
            var pose = api.holdPose("R", p.R, p.x, p.y, p.goc);
            if (t == null) { api.armSet(w, "L", p.L); api.armSet(w, "R", p.R); gsap.set(ban.coc.el, pose); }
            else { dur = dur || 0.35; api.armTo(w, "L", t, dur, p.L); api.armTo(w, "R", t, dur, p.R); tl.to(ban.coc.el, Object.assign(pose, { duration: dur, ease: "power2.inOut" }), t); }
          };
          ban.omCoc(null);
        }
      }
      api.vignette(sk3.stage, "am");
      return ban;
    };
  });
})();
