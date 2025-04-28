import React from "react";

export default function Hero() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-9xl capitalize flex items-center justify-center flex-col">
        <div className="flex items-center justify-center gap-2">
          <div>Global</div>
          <div className="w-32" />
          <div>Design</div>
        </div>
        <div>Studio</div>
      </h1>
    </div>
  );
}
