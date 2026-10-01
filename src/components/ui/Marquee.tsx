"use client";

import React from "react";

interface MarqueeProps {
  text?: string;
  reverse?: boolean;
}

export default function Marquee({
  text = "AI × FULL-STACK × MACHINE LEARNING × COMPETITIVE PROGRAMMING × NEURAL ARCHITECTURES × DISTRIBUTED SYSTEMS",
  reverse = false,
}: MarqueeProps) {
  const content = `${text}  ✦  ${text}  ✦  `;

  return (
    <div className="w-full overflow-hidden py-4 border-y border-white/[0.05] bg-black/30 backdrop-blur-sm select-none">
      <div className={`flex whitespace-nowrap ${reverse ? "animate-marquee flex-row-reverse" : "animate-marquee"}`}>
        <span className="text-xl sm:text-2xl font-mono uppercase tracking-[0.25em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] hover:[-webkit-text-stroke:1px_rgba(95,240,210,0.8)] transition-all px-4">
          {content}
        </span>
        <span className="text-xl sm:text-2xl font-mono uppercase tracking-[0.25em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] hover:[-webkit-text-stroke:1px_rgba(95,240,210,0.8)] transition-all px-4">
          {content}
        </span>
      </div>
    </div>
  );
}
