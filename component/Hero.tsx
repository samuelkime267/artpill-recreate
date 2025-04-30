"use client";

import React, { useEffect, useRef, useState } from "react";
import { SplitText } from "@/utils";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default function Hero() {
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(true);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroContainerRef.current) return;

    new SplitText(".hero-text-1", {
      type: "chars",
      scope: heroContainerRef.current,
      charClass: "translate-y-full",
    });
    new SplitText(".hero-text-2", {
      type: "chars",
      scope: heroContainerRef.current,
      charClass: "translate-y-full",
    });
    new SplitText(".hero-text-3", {
      type: "chars",
      scope: heroContainerRef.current,
      charClass: "translate-y-full",
    });
  }, []);

  useEffect(() => {
    if (progress !== 100 && isLoaded) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroContainerRef.current);
      const charsEl = q(".split-char");

      gsap.to(charsEl, {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        ease: "power3.inOut",
        duration: 1.5,
      });
    });

    return () => {
      ctx.revert();
    };
  }, [isLoaded, progress]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(heroContainerRef.current);
      const spacerEl = q(".hero-text-spacer");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "+=50%",
          scrub: true,
          // markers: true,
          pin: true,
        },
      });

      tl.fromTo(spacerEl, { width: 128 }, { width: 0 });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroContainerRef}
      className="w-full h-screen flex items-center justify-center"
      id="hero"
    >
      <h1 className="text-9xl flex items-center justify-center flex-col">
        <div className="flex items-center justify-center gap-2">
          <div className="hero-text-1 overflow-hidden leading-[1.1]">
            Global
          </div>
          <div className="w-32 hero-text-spacer" />
          <div className="hero-text-2 overflow-hidden leading-[1.1]">
            Design
          </div>
        </div>
        <div className="hero-text-3 overflow-hidden leading-[1.1]">Studio</div>
      </h1>
    </section>
  );
}
