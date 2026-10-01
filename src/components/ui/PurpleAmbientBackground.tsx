"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PurpleAmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Multi-layered Lavender & Soft Violet Radiance */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          background: `
            radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(254, 215, 170, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 15% 25%, rgba(191, 219, 254, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 85% 75%, rgba(233, 213, 255, 0.3) 0%, transparent 55%),
            linear-gradient(180deg, #FAF7F2 0%, #FFFDF9 50%, #FAF7F2 100%)
          `,
        }}
      />


      {/* 3. Floating Ethereal Butterflies (matching her portrait aesthetic) */}
      <div className="absolute top-[18%] left-[8%] animate-butterfly-1 text-purple-400/60 text-2xl select-none">
        <svg className="w-8 h-8 fill-purple-400/40 stroke-purple-600/70" viewBox="0 0 24 24">
          <path d="M12 4c-.5 0-.9.3-1.1.7C9.6 2.3 7.5 1 5 1 2.2 1 0 3.2 0 6c0 4.2 4.4 7.8 11.2 13.9.5.4 1.1.4 1.6 0C19.6 13.8 24 10.2 24 6c0-2.8-2.2-5-5-5-2.5 0-4.6 1.3-5.9 3.7-.2-.4-.6-.7-1.1-.7z" opacity="0.15" />
          <path d="M12 2C9 5 4 8 2 12c3-1 6-1 9 1 1-3 1-7 1-11zm0 0c3 3 8 6 10 10-3-1-6-1-9 1-1-3-1-7-1-11z" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-[52%] right-[10%] animate-butterfly-2 text-purple-400/50 text-xl select-none">
        <svg className="w-6 h-6 fill-purple-400/30 stroke-purple-500/60" viewBox="0 0 24 24">
          <path d="M12 2C9 5 4 8 2 12c3-1 6-1 9 1 1-3 1-7 1-11zm0 0c3 3 8 6 10 10-3-1-6-1-9 1-1-3-1-7-1-11z" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute bottom-[22%] left-[14%] animate-butterfly-1 text-purple-300/60 text-lg select-none" style={{ animationDelay: "-3s" }}>
        <svg className="w-5 h-5 fill-purple-300/30 stroke-purple-500/50" viewBox="0 0 24 24">
          <path d="M12 2C9 5 4 8 2 12c3-1 6-1 9 1 1-3 1-7 1-11zm0 0c3 3 8 6 10 10-3-1-6-1-9 1-1-3-1-7-1-11z" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 4. Subtle Shimmering Sparkles */}
      <div className="absolute top-[28%] left-[22%] w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping opacity-60" />
      <div className="absolute top-[68%] left-[78%] w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse opacity-50" />
      <div className="absolute top-[42%] right-[32%] w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping opacity-40" />
    </div>
  );
}
