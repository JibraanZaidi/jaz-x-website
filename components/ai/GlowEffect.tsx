"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function GlowEffect() {
  return (
    <EffectComposer>
      <Bloom
        intensity={2}
        luminanceThreshold={0}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}