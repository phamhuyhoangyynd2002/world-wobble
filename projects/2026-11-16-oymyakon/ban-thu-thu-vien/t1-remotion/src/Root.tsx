import React from 'react';
import {Composition} from 'remotion';
import {WobJump} from './WobJump';
export const Root: React.FC = () => (
  <Composition id="WobJump" component={WobJump} durationInFrames={150} fps={30} width={1920} height={1080} />
);
