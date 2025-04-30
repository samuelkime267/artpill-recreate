"use client";

import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import pillbgPic from "@/assets/imgs/pillbg.jpg";
import { useEffect } from "react";

export default function ThreadMill() {
  const model = useGLTF("/models/cinta_final_ok_c.glb");
  const texture = useTexture(pillbgPic.src);

  useEffect(() => {
    if (!model.scene || !texture) return;
    console.log("scene", model.scene);

    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
        child.material.color = new THREE.Color("#5e5e5e");
      }
    });
  }, [model.scene, texture]);

  return <>{/* <primitive object={model.scene} scale={0.055} /> */}</>;
}
useGLTF.preload("/models/cinta_final_ok_c.glb");
