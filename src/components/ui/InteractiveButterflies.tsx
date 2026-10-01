"use client";

import React, { useEffect, useState } from "react";

interface ButterflyConfig {
  id: number;
  top: string;
  left: string;
  size: number;
  animationClass: string;
  delay: string;
  color: string;
  secondaryColor: string;
}

const BUTTERFLIES: ButterflyConfig[] = [
  { id: 1, top: "12%", left: "5%", size: 40, animationClass: "animate-butterfly-1", delay: "0s", color: "#9333EA", secondaryColor: "#C084FC" },
  { id: 2, top: "25%", left: "38%", size: 30, animationClass: "animate-butterfly-3", delay: "-1.2s", color: "#A855F7", secondaryColor: "#F472B6" },
  { id: 3, top: "45%", left: "6%", size: 36, animationClass: "animate-butterfly-2", delay: "-2.8s", color: "#7C3AED", secondaryColor: "#A855F7" },
  { id: 4, top: "15%", left: "78%", size: 44, animationClass: "animate-butterfly-4", delay: "-0.5s", color: "#C026D3", secondaryColor: "#F472B6" },
  { id: 5, top: "60%", left: "85%", size: 32, animationClass: "animate-butterfly-1", delay: "-2.2s", color: "#8B5CF6", secondaryColor: "#DDD6FE" },
  { id: 6, top: "76%", left: "18%", size: 38, animationClass: "animate-butterfly-3", delay: "-3.6s", color: "#9333EA", secondaryColor: "#F0ABFC" },
  { id: 7, top: "32%", left: "90%", size: 28, animationClass: "animate-butterfly-2", delay: "-1.8s", color: "#6D28D9", secondaryColor: "#C084FC" },
  { id: 8, top: "80%", left: "64%", size: 34, animationClass: "animate-butterfly-4", delay: "-4.5s", color: "#A855F7", secondaryColor: "#E879F9" },
  // Extra butterflies requested by user:
  { id: 9, top: "8%", left: "48%", size: 32, animationClass: "animate-butterfly-2", delay: "-0.8s", color: "#EC4899", secondaryColor: "#FBCFE8" },
  { id: 10, top: "54%", left: "46%", size: 26, animationClass: "animate-butterfly-1", delay: "-3.2s", color: "#8B5CF6", secondaryColor: "#C4B5FD" },
  { id: 11, top: "68%", left: "3%", size: 34, animationClass: "animate-butterfly-4", delay: "-1.9s", color: "#7E22CE", secondaryColor: "#D8B4FE" },
  { id: 12, top: "38%", left: "72%", size: 36, animationClass: "animate-butterfly-3", delay: "-2.4s", color: "#A21CAF", secondaryColor: "#F5D0FE" },
  { id: 13, top: "88%", left: "36%", size: 28, animationClass: "animate-butterfly-2", delay: "-4.1s", color: "#9333EA", secondaryColor: "#E9D5FF" },
  { id: 14, top: "22%", left: "20%", size: 32, animationClass: "animate-butterfly-1", delay: "-1.4s", color: "#D946EF", secondaryColor: "#FDF4FF" },
];

export default function InteractiveButterflies() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden="true">
      {BUTTERFLIES.map((b) => (
        <div
          key={b.id}
          className={`absolute ${b.animationClass} select-none transition-transform duration-700 ease-out`}
          style={{
            top: b.top,
            left: b.left,
            animationDelay: b.delay,
            transform: `translate(${mousePos.x * (b.id % 2 === 0 ? 1.2 : -1.2)}px, ${mousePos.y * (b.id % 3 === 0 ? 1.2 : -1.2)}px)`,
          }}
        >
          {/* Detailed SVG Butterfly with Left and Right Flapping Wings */}
          <div className="relative flex items-center justify-center filter drop-shadow-[0_4px_12px_rgba(147,51,234,0.4)]">
            {/* Left Wing */}
            <svg
              width={b.size}
              height={b.size}
              viewBox="0 0 50 50"
              className="animate-wing-left -mr-[2px]"
            >
              <defs>
                <linearGradient id={`grad-left-${b.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={b.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={b.secondaryColor} stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {/* Upper Wing */}
              <path
                d="M 25 25 C 20 8, 4 4, 2 16 C 0 24, 12 30, 25 25 Z"
                fill={`url(#grad-left-${b.id})`}
                stroke={b.color}
                strokeWidth="1.2"
              />
              {/* Lower Wing */}
              <path
                d="M 25 25 C 18 30, 8 38, 10 44 C 12 48, 22 42, 25 25 Z"
                fill={`url(#grad-left-${b.id})`}
                stroke={b.color}
                strokeWidth="0.9"
              />
              {/* Wing Inner Lace Pattern */}
              <circle cx="12" cy="18" r="2.8" fill="#FFFFFF" fillOpacity="0.75" />
              <circle cx="16" cy="38" r="1.8" fill="#FFFFFF" fillOpacity="0.6" />
            </svg>

            {/* Central Butterfly Body & Antennae */}
            <div className="relative z-10 w-[2.5px] h-[20px] bg-purple-950 rounded-full flex flex-col items-center">
              {/* Antennae */}
              <div className="absolute -top-2.5 flex gap-1">
                <span className="w-1.5 h-2.5 border-l border-t border-purple-900 rounded-tl-full transform -rotate-12" />
                <span className="w-1.5 h-2.5 border-r border-t border-purple-900 rounded-tr-full transform rotate-12" />
              </div>
            </div>

            {/* Right Wing */}
            <svg
              width={b.size}
              height={b.size}
              viewBox="0 0 50 50"
              className="animate-wing-right -ml-[2px]"
            >
              <defs>
                <linearGradient id={`grad-right-${b.id}`} x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={b.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={b.secondaryColor} stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {/* Upper Wing */}
              <path
                d="M 25 25 C 30 8, 46 4, 48 16 C 50 24, 38 30, 25 25 Z"
                fill={`url(#grad-right-${b.id})`}
                stroke={b.color}
                strokeWidth="1.2"
              />
              {/* Lower Wing */}
              <path
                d="M 25 25 C 32 30, 42 38, 40 44 C 38 48, 28 42, 25 25 Z"
                fill={`url(#grad-right-${b.id})`}
                stroke={b.color}
                strokeWidth="0.9"
              />
              {/* Wing Inner Lace Pattern */}
              <circle cx="38" cy="18" r="2.8" fill="#FFFFFF" fillOpacity="0.75" />
              <circle cx="34" cy="38" r="1.8" fill="#FFFFFF" fillOpacity="0.6" />
            </svg>
          </div>
        </div>
      ))}

      {/* Floating Shimmer Sparkles & Heart Accents */}
      <div className="absolute top-[18%] left-[28%] text-pink-400/80 animate-ping text-sm">♡</div>
      <div className="absolute top-[62%] left-[14%] text-purple-500/70 animate-pulse text-base">✦</div>
      <div className="absolute top-[34%] right-[22%] text-fuchsia-400/80 animate-ping text-sm">♡</div>
      <div className="absolute top-[72%] right-[32%] text-indigo-400/70 animate-pulse text-base">✦</div>
      <div className="absolute top-[82%] left-[45%] text-purple-400/80 animate-bounce text-sm">✧</div>
      <div className="absolute top-[28%] left-[62%] text-fuchsia-400/70 animate-pulse text-sm">✦</div>
    </div>
  );
}
