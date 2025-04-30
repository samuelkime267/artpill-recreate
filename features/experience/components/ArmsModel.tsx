"use client";

import * as THREE from "three";
import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function ArmsModel() {
  const { scene } = useGLTF("/models/arm_c.glb");
  const onScreenPos = useMemo(() => ({ leftArm: -19.3, rightArm: 19.3 }), []);
  const offScreenPos = useMemo(() => ({ leftArm: -60, rightArm: 60 }), []);
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.color = new THREE.Color("#0a0a0a");
      }
    });

    const [rightArm, leftArm] = scene.children;
    rightArm.position.x = offScreenPos.rightArm;
    leftArm.position.x = offScreenPos.leftArm;
  }, [scene, offScreenPos]);

  // Arms close animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollContainer = document.getElementById("blend-creativity");
    if (!scrollContainer || !scene) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: "+=5% top",
          end: "+=45%",
          // markers: true,
          scrub: true,
        },
      });
      tl.to(scene.children[0].position, { x: onScreenPos.rightArm }).to(
        scene.children[1].position,
        { x: onScreenPos.leftArm },
        "<"
      );
    });

    return () => {
      ctx.revert();
    };
  }, [scene, onScreenPos]);

  // Arms open animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollContainer = document.getElementById("blend-creativity");
    if (!scrollContainer || !scene) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: "+=30% top",
          end: "+=50%",
          // markers: true,
          scrub: true,
          pin: true,
        },
      });
      tl.to(scene.children[0].position, {
        x: offScreenPos.rightArm,
        delay: 0.5,
      }).to(scene.children[1].position, { x: offScreenPos.leftArm }, "<");
    });

    return () => {
      ctx.revert();
    };
  }, [scene, offScreenPos]);

  return (
    <>
      <primitive object={scene} scale={0.055} />
    </>
  );
}
