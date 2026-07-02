"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import ParticleRing from "./ParticleRing";

function Orb() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.y += 0.003;
    mesh.current.rotation.x += 0.001;

    mesh.current.position.y =
      Math.sin(state.clock.elapsedTime * 2) * 0.12;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 128, 128]} />

      <MeshDistortMaterial
        color="#00E5FF"
        distort={0.45}
        speed={2}
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
}

export default function AIOrb() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[5, 5, 5]} intensity={6} />
      <Orb />
      <ParticleRing />
    </Canvas>
  );
}