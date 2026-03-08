"use client";

import { useState } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 pointer-events-none z-0"
    >
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-20 bg-[#d4af37]"
        style={{
          left: position.x - 200,
          top: position.y - 200,
        }}
      />
    </div>
  );
}