"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionDividerProps {
  label?: string;
  tag?: string;
}

export default function SectionDivider({ label, tag }: SectionDividerProps) {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 py-12 flex items-center justify-between">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-violet-500/20 origin-left"
      />
      {(label || tag) && (
        <div className="px-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-teal-300/80 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400/80 glow-teal-sm" />
          {tag && <span className="text-white/40">{tag} //</span>}
          {label && <span>{label}</span>}
        </div>
      )}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 h-px bg-gradient-to-l from-transparent via-violet-500/30 to-teal-400/20 origin-right"
      />
    </div>
  );
}
