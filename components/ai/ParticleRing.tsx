"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleRing() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y += 0.003;
    group.current.rotation.z += 0.001;

    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 2) * 0.05;
  });

  const particles = [];

  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2;

    particles.push(
      <mesh
        key={i}
        position={[
          Math.cos(angle) * 1.6,
          Math.sin(angle) * 1.6,
          0,
        ]}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={2}
        />
      </mesh>
    );
  }

  return <group ref={group}>{particles}</group>;
}