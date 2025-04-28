"use client";

import * as THREE from "three";
import { Environment, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Pill from "./Pill";

export default function Experience() {
  const { pillColor } = useControls({
    pillColor: "#def947",
    // pillColor: "#48d9fa",
  });

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += 0.05;
  });

  return (
    <>
      <Environment backgroundIntensity={0} files="/environment/map.hdr" />
      <OrbitControls />

      <group ref={groupRef} position={[-0.05, 0.18, 0]}>
        <Pill pillColor={pillColor} />
      </group>
    </>
  );
}
