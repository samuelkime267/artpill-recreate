"use client";

import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import pillbgPic from "@/assets/imgs/pillbg.jpg";
import { useEffect } from "react";

export default function PillWhite() {
  const model = useGLTF("/models/pill_smiley_new_c_2.glb");
  const texture = useTexture(pillbgPic.src);

  useEffect(() => {
    if (!model.scene || !texture) return;

    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
        child.material.color = new THREE.Color("#ffffff");
      }
    });
  }, [model.scene, texture]);

  return <primitive object={model.scene} scale={0.055} />;
}
useGLTF.preload("/models/pill_smiley_new_c_2.glb");
