"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, Eye, Heart, Compass, Wand2 } from "lucide-react";
import { soundFx } from "../audio/SoundEffects";

interface PhotoCursorRevealProps {
  className?: string;
}

export default function PhotoCursorReveal({ className = "" }: PhotoCursorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensPos, setLensPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y });
    if (!isHovered) setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y });
    setIsHovered(true);
  };

  const toggleRevealAll = () => {
    soundFx.playChirp(740, 0.05);
    setRevealAll((prev) => !prev);
  };

  // Mask calculation: if revealAll, no mask; if not hovered yet, cover is opaque; if hovered, cut open spotlight at lensPos
  const getMaskStyle = () => {
    if (revealAll) return "none";
    if (!isHovered) return "none"; // mask is solid (handled by solid background)
    return `radial-gradient(circle 140px at ${lensPos.x}% ${lensPos.y}%, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.8) 85%, black 100%)`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setLensPos({ x: -100, y: -100 });
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsHovered(false)}
      className={`relative w-full aspect-[4/4.8] rounded-3xl overflow-hidden select-none cursor-crosshair group shadow-2xl border-2 border-purple-300/80 ${className}`}
    >
      {/* 1. Underlying High-Definition Photo */}
      <div className="absolute inset-0">
        <Image
          src="/archana-portrait.jpeg"
          alt="Archana Devi M"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 460px"
          className="object-cover object-center filter saturate-110 contrast-105"
        />

        {/* Ambient bottom contrast gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/85 via-purple-950/20 to-transparent pointer-events-none" />
      </div>

      {/* 2. Frosted Lavender Cover Mask (Revealed when moving cursor) */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(243, 232, 255, 0.94) 0%, rgba(233, 213, 255, 0.90) 50%, rgba(216, 180, 254, 0.95) 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          maskImage: isHovered ? getMaskStyle() : undefined,
          WebkitMaskImage: isHovered ? getMaskStyle() : undefined,
          opacity: revealAll ? 0 : 1,
        }}
      >
        {/* Editorial Pattern on the Unrevealed Mask */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-lg flex items-center justify-center text-purple-700 mb-3 animate-bounce">
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-xl font-editorial-serif font-bold text-purple-950">
            Archana Devi M
          </p>
          <p className="text-xs font-editorial-mono text-purple-800/80 mt-1 max-w-[240px] font-semibold">
            Move cursor over this card to reveal the portrait underneath ♡
          </p>
          <div className="mt-4 px-4 py-1.5 rounded-full bg-white/90 border border-purple-300 text-xs font-editorial-mono font-bold text-purple-900 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
            <span>MOVE CURSOR TO REVEAL</span>
          </div>
        </div>
      </div>

      {/* 3. Glowing Cursor Reticle Ring following the lens */}
      {isHovered && !revealAll && lensPos.x > 0 && (
        <div
          className="absolute pointer-events-none w-36 h-36 rounded-full border-2 border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.6)] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out z-10"
          style={{
            left: `${lensPos.x}%`,
            top: `${lensPos.y}%`,
          }}
        >
          <span className="absolute -top-3 -right-2 text-base animate-pulse">🦋</span>
          <span className="absolute -bottom-2 -left-2 text-xs text-purple-300 font-editorial-mono font-bold bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-400/40">
            REVEAL
          </span>
        </div>
      )}

      {/* 4. Bottom Photo Traits Badge */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-editorial-mono text-xs px-4 py-2.5 rounded-2xl bg-purple-950/85 backdrop-blur-md border border-white/20 z-20 shadow-lg">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
          <span className="font-bold tracking-wide">Small Steps Big Dreams</span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleRevealAll}
          className="px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-xs text-white flex items-center gap-1.5 font-bold cursor-pointer transition-all border border-white/20 shadow-xs"
        >
          <Eye className="w-3.5 h-3.5 text-purple-200" />
          <span>{revealAll ? "Wipe Mask" : "Reveal Full"}</span>
        </button>
      </div>
    </div>
  );
}
