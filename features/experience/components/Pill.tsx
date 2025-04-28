"use client";

import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import pillbgPic from "@/assets/imgs/pillbg.jpg";
import { useEffect } from "react";

type PillProps = {
  pillColor: string;
};

export default function Pill({ pillColor }: PillProps) {
  const model = useGLTF("/models/pill_smiley_new_c_2.glb");
  const texture = useTexture(pillbgPic.src);

  useEffect(() => {
    if (!model.scene || !texture) return;

    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
        child.material.color = new THREE.Color(pillColor);
      }
    });
  }, [model.scene, pillColor, texture]);

  return <primitive object={model.scene} scale={0.055} />;
}
