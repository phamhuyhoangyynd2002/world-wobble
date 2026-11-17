import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';

// Nhảy 3 lần: lấy đà (bẹp) -> bật (kéo dài) -> bay theo cung -> chạm đất (bẹp) -> lò xo dội lại.
const JUMPS = [20, 65, 110]; // khung bắt đầu lấy đà
export const WobJump: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  let y = 0, sx = 1, sy = 1, x = 0;
  JUMPS.forEach((j, i) => {
    const t = frame - j;
    if (t < 0) return;
    // lấy đà 6 khung
    const crouch = interpolate(t, [0, 6, 8], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
    // bay 16 khung
    const air = interpolate(t, [8, 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const inAir = t >= 8 && t < 24;
    const h = inAir ? 4 * air * (1 - air) : 0; // parabol
    y -= h * 260;
    x += interpolate(air, [0, 1], [0, 300]);
    const vel = inAir ? Math.abs(1 - 2 * air) : 0; // nhanh nhất ở 2 đầu
    // chạm đất: lò xo
    const land = spring({frame: t - 24, fps, config: {damping: 7, stiffness: 260, mass: 0.6}});
    const bounce = t >= 24 ? (1 - land) : 0;
    sy *= 1 - 0.22 * crouch + 0.18 * vel - 0.35 * bounce;
    sx *= 1 + 0.18 * crouch - 0.1 * vel + 0.3 * bounce;
  });
  return (
    <AbsoluteFill style={{background: '#EFE3C8'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 820, height: 6, background: '#1E2A2B'}} />
      <div style={{position: 'absolute', left: 360 + x, top: 820 - 400 + y, width: 400, height: 400,
        transformOrigin: '50% 100%', transform: `scale(${sx}, ${sy})`}}>
        <Img src={staticFile('wob.svg')} style={{width: 400, height: 400}} />
      </div>
    </AbsoluteFill>
  );
};
