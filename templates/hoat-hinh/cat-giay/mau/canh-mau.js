/* Mẫu canh.js tối thiểu cho phong cách cắt giấy (chép vào doan-<id>/canh.js rồi sửa).
   Đọc HH_DATA (mốc từ đầu đoạn), dựng phông, đặt Wob, viết biên đạo theo data.nhip. Không đọc file nào khác. */
window.CANH = function (api, data) {
  "use strict";
  var D = api.D, CN = window.CanhNen, DUR = api.DUR;

  // 1. phông + nhân vật
  var nen = CN.langTuyet(api, { seed: 400, nha: [[400, 330, 200], [1500, 300, 190]], thong: [[900, 650, 330]], cot: [1200, 2300] });
  var W = api.wob("W", { scarf: true, khan: "#D9543C", mu: "#C9463A" });
  api.dat(nen.troi + api.lop("xa", nen.xa, 0.35, { mat: 780 }) + api.lop("giua", nen.giua + W.svg, 1, { mat: 872 }) + api.lop("gan", nen.gan, 1.4, { mat: 1060 }));

  // 2. nối vào/ra theo data.vao, data.ra (gọi để chỉnh; không gọi thì khung tự gọi với mặc định)
  api.noi({});

  // 3. camera: [t, cx, cy, zoom, ease] – điểm (cx, cy) ở lớp giữa nằm giữa khung
  api.camera([[0, 900, 600, 1.1], [DUR, 1100, 610, 1.2, "sine.inOut"]]);

  // 4. biên đạo theo nhịp: mốc lấy từ lời (api.tu) hoặc data.nhip[i].tai
  var t1 = api.tu("outside") || data.nhip[0].tai;
  W.set(0, { x: 700, y: 900, size: 0.7 });
  W.walk(t1, t1 + 1.2, 700, 1100, { step: 0.28, tieng: true });   // tiếng bước tự vào sfx.json
  W.soc(t1 + 1.6); api.sfx("liu-lo-soc", t1 + 1.6, 0.5);
  W.idle(t1 + 2.2, DUR, { seed: 3 });                              // không đứng chết chờ lời
  W.autoBlink(0, DUR, 7);
};
