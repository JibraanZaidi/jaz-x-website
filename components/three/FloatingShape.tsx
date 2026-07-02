"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ShapeType = "torus" | "box" | "octahedron" | "capsule" | "torusKnot" | "sphere";

function Shape({ type, color }: { type: ShapeType; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.25;
      ref.current.rotation.y = t * 0.35;
      ref.current.position.y = Math.sin(t * 0.8) * 0.25;
    }
  });

  const geometry = () => {
    switch (type) {
      case "torus":
        return <torusGeometry args={[1.1, 0.35, 32, 100]} />;
      case "box":
        return <boxGeometry args={[1.6, 1.6, 1.6]} />;
      case "octahedron":
        return <octahedronGeometry args={[1.5, 0]} />;
      case "capsule":
        return <capsuleGeometry args={[0.6, 1.4, 8, 16]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[1, 0.32, 128, 16]} />;
      default:
        return <sphereGeometry args={[1.4, 32, 32]} />;
    }
  };

  return (
    <mesh ref={ref}>
      {geometry()}
      <meshStandardMaterial color={color} wireframe roughness={0.3} />
    </mesh>
  );
}

export default function FloatingShape({
  type = "torusKnot",
  color = "#6C63FF",
}: {
  type?: ShapeType;
  color?: string;
}) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00E5FF" />
        <Shape type={type} color={color} />
      </Canvas>
    </div>
  );
}
