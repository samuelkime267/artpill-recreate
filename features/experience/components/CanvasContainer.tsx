"use client";

import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";

export default function CanvasContainer() {
  // const width = 2;
  // const height = 1;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10">
      <Leva />
      <Canvas
        camera={{ position: [0, 0, 2], fov: 45, near: 0.001, far: 1000 }}
        dpr={[1, 2]}
        // orthographic
        // camera={{
        //   position: [0, 0, 1],
        //   top: height / 2,
        //   bottom: -height / 2,
        //   left: -width / 2,
        //   right: width / 2,
        //   near: 0.01,
        //   far: 1000,
        // }}
      >
        <Experience />
      </Canvas>
    </div>
  );
}
