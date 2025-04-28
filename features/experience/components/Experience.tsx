"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import fragmentShader from "../shaders/plane.fragment.glsl";
import vertexShader from "../shaders/plane.vertex.glsl";

export default function Experience() {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);
  useFrame(({ clock }) => {
    if (!shaderMaterialRef.current) return;
    shaderMaterialRef.current.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <>
      <OrbitControls />

      <mesh>
        <shaderMaterial
          ref={shaderMaterialRef}
          uniforms={{ time: { value: 0 } }}
          side={THREE.DoubleSide}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
        <planeGeometry args={[1, 1, 1, 1]} />
      </mesh>
    </>
  );
}
