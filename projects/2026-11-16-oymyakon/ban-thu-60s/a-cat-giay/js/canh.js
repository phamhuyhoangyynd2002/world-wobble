/* Dữ liệu thời gian của bản thử A – nguồn duy nhất cho cả composition (dung-phim.js) và trộn âm (tao_timeline.mjs).
   Mốc giọng theo bảng phân cảnh chung (chung/bang-phan-canh.md); cảnh 5 kéo sớm về 55,4 s cho khớp cú cắt "Anyway.". */
(function (G) {
  "use strict";
  G.CANH = {
    duration: 60.5,
    scenes: [
      { id: 1, start: 0.4, dur: 10.704 },
      { id: 2, start: 12.6, dur: 12.624 },
      { id: 3, start: 27.0, dur: 13.32 },
      { id: 4, start: 42.2, dur: 12.264 },
      { id: 5, start: 55.4, dur: 3.72 }
    ],
    cut: { dive: 11.0, memIn: 11.9, presentOut: 12.0, closeIn: 38.15, closeOut: 40.5, home: 53.65 },
    /* đường đi của con rối: who, t0, t1, x0, x1, bước (giây), tay ("R" = chỉ tay phải đánh), steps = có tiếng bước tuyết */
    walks: [
      { who: "P", t0: 2.0, t1: 2.42, x0: 780, x1: 1000, step: 0.21, steps: false },
      { who: "P", t0: 3.3, t1: 3.72, x0: 1000, x1: 900, step: 0.21, steps: false },
      { who: "M", t0: 20.1, t1: 21.1, x0: 660, x1: 1100, step: 0.25, steps: true },
      { who: "M", t0: 25.4, t1: 27.45, x0: 1100, x1: 1850, step: 0.29, steps: true },
      { who: "M", t0: 40.55, t1: 43.0, x0: 1850, x1: 2960, step: 0.3, arms: "R", steps: true },
      { who: "M", t0: 47.6, t1: 49.3, x0: 2960, x1: 3500, step: 0.3, arms: "R", steps: true }
    ],
    /* hiệu ứng âm thanh đặt tay (tiếng bước tuyết sinh từ walks) */
    sfx: [
      { src: "bonk", at: 1.25, volume: 0.85 },
      { src: "bonk", at: 1.92, volume: 0.35 },
      { src: "whoosh", at: 2.5, volume: 0.3 },
      { src: "brr", at: 4.92, volume: 0.45 },
      { src: "ting", at: 8.95, volume: 0.25 },
      { src: "whoosh", at: 11.05, volume: 0.6 },
      { src: "drop", at: 15.72, volume: 0.5 },
      { src: "liu-lo-soc", at: 16.05, volume: 0.55 },
      { src: "pop", at: 22.14, volume: 0.75 },
      { src: "tach-bang", at: 22.62, volume: 0.6 },
      { src: "liu-lo-soc", at: 22.92, volume: 0.6 },
      { src: "liu-lo-vui", at: 27.62, volume: 0.5 },
      { src: "bonk", at: 30.82, volume: 0.45 },
      { src: "whoosh", at: 31.95, volume: 0.4 },
      { src: "drop", at: 32.35, volume: 0.75 },
      { src: "brr", at: 32.5, volume: 0.4 },
      { src: "whoosh", at: 33.45, volume: 0.3 },
      { src: "liu-lo-hoi", at: 34.15, volume: 0.6 },
      { src: "pop", at: 35.62, volume: 0.65 },
      { src: "drop", at: 36.6, volume: 0.35 },
      { src: "ting", at: 38.7, volume: 0.35 },
      { src: "ting", at: 39.3, volume: 0.55 },
      { src: "may-no", at: 41.0, volume: 0.22 },
      { src: "may-no", at: 42.6, volume: 0.3 },
      { src: "may-no", at: 44.2, volume: 0.32 },
      { src: "may-no", at: 45.8, volume: 0.3 },
      { src: "may-no", at: 47.4, volume: 0.24 },
      { src: "may-no", at: 49.0, volume: 0.16 },
      { src: "may-no", at: 50.6, volume: 0.12 },
      { src: "liu-lo-vui", at: 44.35, volume: 0.5 },
      { src: "drop", at: 49.95, volume: 0.4 },
      { src: "liu-lo-buon", at: 50.05, volume: 0.5 },
      { src: "hoi-nuoc", at: 50.85, volume: 0.45 },
      { src: "tach-bang", at: 52.52, volume: 0.6 },
      { src: "ting", at: 53.25, volume: 0.55 },
      { src: "brr", at: 54.55, volume: 0.5 },
      { src: "drop", at: 56.85, volume: 0.25 },
      { src: "drop", at: 57.65, volume: 0.2 },
      { src: "brr", at: 58.6, volume: 0.5 }
    ],
    music: { src: "music/frost-waltz.mp3", start: 12.0, end: 53.65, volume: 0.2 }
  };
})(typeof window !== "undefined" ? window : globalThis);
