"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DigitalCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 1000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x = t * 0.08;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.22;
      innerRef.current.rotation.x = t * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.03;
    }
    // subtle mouse-reactive camera drift
    state.camera.position.x += (state.mouse.x * 0.8 - state.camera.position.x) * 0.03;
    state.camera.position.y += (state.mouse.y * 0.6 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshBasicMaterial color="#6C63FF" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.3} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#FF4FD8" size={0.02} transparent opacity={0.7} />
      </points>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <DigitalCore />
      </Canvas>
    </div>
  );
}
