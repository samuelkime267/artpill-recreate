"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import PillYellow from "./PillYellow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function YellowPillScrollAni() {
  const yellowPillGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!yellowPillGroupRef.current) return;
    yellowPillGroupRef.current.rotation.y += 0.05;
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollContainer = document.getElementById("hero");
    if (!scrollContainer) return;

    const ctx = gsap.context(() => {
      if (!yellowPillGroupRef.current || !yellowPillGroupRef.current.scale)
        return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });

      tl.to(yellowPillGroupRef.current.scale, { x: 0, y: 0, z: 0 });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <group ref={yellowPillGroupRef} position={[-0.05, 0.18, 0]}>
        <PillYellow />
      </group>
    </>
  );
}
