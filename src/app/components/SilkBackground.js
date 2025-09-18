'use client';

import Silk from './Silk';

export default function SilkBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Silk
        speed={5.3}
        scale={0.6}
        color="#FAA836"
        noiseIntensity={1.9}
        rotation={0}
      />
    </div>
  );
} 