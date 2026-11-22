/* dio-3d-nap.js: nạp three.js (module ES, MIT, lib/vendor/) rồi gắn vào window.THREE cho dio-3d.js (script thường).
 * Khung index.html luôn có thẻ module này; module chạy trễ (trước DOMContentLoaded) nên DIO.chay chờ sự kiện "dio-three"
 * khi canh.js dùng api.ngoaiTroi (hoặc đặt window.CANH_3D = true). Đoạn CSS 3D không dùng tới, không tốn gì thêm khi render.
 */
import * as THREE from "./vendor/three.module.min.js";
window.THREE = THREE;
window.dispatchEvent(new Event("dio-three"));
