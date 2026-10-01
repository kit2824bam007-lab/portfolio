"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Code2, Brain, Laptop, Terminal } from "lucide-react";

interface IllustratedPortraitAvatarProps {
  className?: string;
}

export default function IllustratedPortraitAvatar({ className = "" }: IllustratedPortraitAvatarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative w-full aspect-square max-w-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-gradient-to-br from-[#FFF8EE] via-[#FDF3E7] to-[#F7EAD7] ${className}`}>
      {/* Editorial Decorative Ring / Border */}
      <div className="absolute inset-0 border border-[#FF5C38]/20 rounded-3xl pointer-events-none z-20" />

      {/* Primary Illustrated Image */}
      {!imgError ? (
        <Image
          src="/api/avatar"
          alt="Archana Devi M — AI/ML Engineer Illustration"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          onError={() => setImgError(true)}
          className="object-cover object-center filter contrast-[1.04] saturate-[1.08] hover:scale-102 transition-transform duration-700 ease-out"
        />
      ) : (
        /* Bespoke Vector Illustration Fallback */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFF5EA] via-[#FCEEE2] to-[#F5E1D0]">
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-[#FF5C38] to-[#2563EB] p-1 shadow-xl mb-4">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Laptop className="w-16 h-16 text-[#FF5C38]" />
            </div>
            <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
              ✓
            </span>
          </div>
          <h4 className="text-2xl font-editorial-serif font-bold text-[#1A1815]">
            Archana Devi M
          </h4>
          <p className="text-sm font-editorial-mono text-[#FF5C38] font-bold mt-1">
            CSE (AI & ML) · KIT COIMBATORE
          </p>
          <div className="flex items-center gap-2 mt-4 text-xs font-editorial-mono text-[#1A1815]/70 bg-white/80 px-3.5 py-1.5 rounded-full border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5C38]" />
            <span>AI / ML & Full Stack Engineer</span>
          </div>
        </div>
      )}

      {/* Floating Graphic Badge: Editorial Accent */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#1A1815]/10 shadow-lg text-[#1A1815]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C38] animate-ping" />
          <span className="text-xs font-editorial-mono font-bold tracking-wider text-[#1A1815]">
            ARCHANA.DEV // AI-CORE
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-editorial-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
          <Terminal className="w-3 h-3" />
          <span>PORTRAIT COVER</span>
        </div>
      </div>
    </div>
  );
}
