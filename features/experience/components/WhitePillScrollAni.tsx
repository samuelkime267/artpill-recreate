"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import PillWhite from "./PillWhite";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PillPlain from "./PillPlain";

export default function WhitePillScrollAni() {
  const scrollPillGroupRef = useRef<THREE.Group>(null);
  const scrollPillPlainGroupRef = useRef<THREE.Group>(null);

  // Pill coming down spinning down to the middle of the screen
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollContainer = document.getElementById("blend-creativity");
    if (!scrollContainer) return;

    const ctx = gsap.context(() => {
      if (!scrollPillPlainGroupRef.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top +=100%",
          end: "+=150%",
          // markers: true,
          scrub: true,
        },
      });

      tl.to(scrollPillPlainGroupRef.current.position, { y: 0 }).to(
        scrollPillPlainGroupRef.current.rotation,
        {
          z: Math.PI * 4,
          x: Math.PI * 2,
          y: Math.PI / 2 + Math.PI,
        },
        "<"
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Switching from plain pills to the inscribed one
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollContainer = document.getElementById("blend-creativity");

    const ctx = gsap.context(() => {
      if (
        !scrollContainer ||
        !scrollPillGroupRef.current ||
        !scrollPillPlainGroupRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: "+=30% top",
          end: "+=5px",
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });
      tl.set(scrollPillGroupRef.current.scale, { x: 1, y: 1, z: 1 }).set(
        scrollPillPlainGroupRef.current.scale,
        { x: 0, y: 0, z: 0 }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  //Pill falling down to the thread mill
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollContainer = document.getElementById("blend-creativity");

    const ctx = gsap.context(() => {
      if (
        !scrollContainer ||
        !scrollPillGroupRef.current ||
        !scrollPillPlainGroupRef.current
      )
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: "+=45% top",
          end: "+=150%",
          // markers: true,
          scrub: true,
        },
      });
      tl.to(scrollPillGroupRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI + Math.PI * 2,
        z: Math.PI * 2,
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <group
        ref={scrollPillGroupRef}
        position={[0, 0, 0]}
        rotation={[0, Math.PI / 2 + Math.PI, 0]}
        scale={[0, 0, 0]}
      >
        <PillWhite />
      </group>
      <group ref={scrollPillPlainGroupRef} position={[0, 1, 0]}>
        <PillPlain />
      </group>
    </>
  );
}
