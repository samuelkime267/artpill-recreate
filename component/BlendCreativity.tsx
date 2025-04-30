"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useRef } from "react";

export default function BlendCreativity() {
  const blendContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!blendContainerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: blendContainerRef.current,
        start: "-=20% top",
        end: "bottom bottom",
        onEnter: () => {
          document.querySelector("html")?.classList.add("dark-mode");
        },
        onLeaveBack: () => {
          document.querySelector("html")?.classList.remove("dark-mode");
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={blendContainerRef} id="blend-creativity">
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="flex items-center justify-center flex-col max-w-[70pc]">
          That blends Creativity, Strategy and Design
        </h1>
      </div>
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="flex items-center justify-center flex-col max-w-[60pc]">
          To imagine impactful stories
        </h1>
      </div>
    </section>
  );
}
