"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, MapPin, RefreshCw } from "lucide-react";
import { soundFx } from "../audio/SoundEffects";

interface HudStatusProps {
  onReboot: () => void;
}

export default function HudStatus({ onReboot }: HudStatusProps) {
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(12 + Math.floor(Math.random() * 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-3 left-0 right-0 z-30 pointer-events-none flex justify-center px-4">
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 py-1.5 rounded-full bg-[#07070F]/80 border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-white/60 shadow-lg">
        <div className="flex items-center gap-1.5 text-teal-300">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-semibold tracking-wider">SYSTEM: ONLINE</span>
        </div>

        <div className="hidden sm:block w-px h-3 bg-white/10" />

        <div className="hidden sm:flex items-center gap-1">
          <Activity className="w-3 h-3 text-violet-400" />
          <span>LATENCY:</span>
          <span className="text-white/90">{latency}ms</span>
        </div>

        <div className="hidden md:block w-px h-3 bg-white/10" />

        <div className="hidden md:flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-white/80">TAMIL NADU, INDIA</span>
        </div>

        <div className="hidden lg:block w-px h-3 bg-white/10" />

        <div className="hidden lg:flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-300/90">PRE-FINAL YEAR CSE(AI & ML)</span>
        </div>

        <div className="w-px h-3 bg-white/10" />

        <button
          onClick={() => {
            soundFx.playChirp(840, 0.08);
            onReboot();
          }}
          className="flex items-center gap-1 hover:text-teal-300 transition-colors cursor-pointer group"
          title="Reboot Neural OS Sequence"
        >
          <RefreshCw className="w-2.5 h-2.5 group-hover:rotate-180 transition-transform duration-500 text-teal-400" />
          <span className="text-[10px]">REBOOT OS</span>
        </button>
      </div>
    </div>
  );
}
