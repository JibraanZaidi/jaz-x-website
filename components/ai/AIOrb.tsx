"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import ParticleRing from "./ParticleRing";
import GlowEffect from "./GlowEffect";

function Orb() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.003;
    mesh.current.rotation.x += 0.001;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.8, 128, 128]} />

      <MeshDistortMaterial
        color="#00E5FF"
        distort={0.35}
        speed={2}
        roughness={0}
        metalness={1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

export default function AIOrb() {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      style={{
        background: "transparent",
      }}
    >
      <ambientLight intensity={2} />
      <pointLight position={[5, 5, 5]} intensity={8} />

      <Orb />
      <ParticleRing />
      <GlowEffect />
    </Canvas>
  );
}