"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Activity, CheckCircle2, ArrowRight, Layers, BarChart3, ShieldCheck, Code2, Globe } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { ProjectItem } from "@/data/portfolioData";
import { soundFx } from "../audio/SoundEffects";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Luminous Light Frosted Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFx.playChirp(600, 0.05);
            onClose();
          }}
          className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xl"
        />

        {/* Modal Window: Luminous Light Glass Theme with Large Typography */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-2xl border-2 border-slate-200 shadow-2xl p-6 sm:p-12 text-[#1A1815]"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              soundFx.playChirp(600, 0.05);
              onClose();
            }}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1A1815] transition-colors cursor-pointer border border-slate-300 shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.badge && (
              <span className="px-3.5 py-1 rounded-full text-xs font-editorial-mono font-bold tracking-wider bg-orange-100 text-orange-950 border border-orange-300">
                {project.badge}
              </span>
            )}
            <span className="text-xs font-editorial-mono text-[#2563EB] font-bold uppercase tracking-wider">
              SYSTEM ARCHITECTURE SPECIFICATION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial-serif font-black text-[#1A1815] tracking-tight mb-3">
            {project.title}
          </h2>
          <p className="text-lg sm:text-2xl text-[#2563EB] font-editorial-mono font-bold mb-8">
            {project.tagline}
          </p>

          {/* NUMBERED BLOCKS SPECIFICATION (① to ⑧) */}
          <div className="space-y-8">
            {/* ① Problem & ② Solution Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ① Problem */}
              <div className="p-6 rounded-2xl bg-orange-50/70 border-2 border-orange-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-editorial-mono font-bold text-orange-800 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-orange-200 text-orange-900 flex items-center justify-center font-black">
                    ①
                  </span>
                  <span>CORE CHALLENGE / PROBLEM</span>
                </div>
                <p className="text-base sm:text-lg text-[#1A1815] leading-relaxed font-normal">
                  {project.problem}
                </p>
              </div>

              {/* ② Solution */}
              <div className="p-6 rounded-2xl bg-blue-50/70 border-2 border-blue-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-editorial-mono font-bold text-blue-800 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-black">
                    ②
                  </span>
                  <span>ARCHITECTED SOLUTION</span>
                </div>
                <p className="text-base sm:text-lg text-[#1A1815] leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* ③ System Architecture Pipeline */}
            <div className="p-7 rounded-2xl bg-slate-50/80 border-2 border-slate-200 space-y-5">
              <div className="flex items-center gap-2 text-xs font-editorial-mono font-bold text-[#1A1815] uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center font-black">
                  ③
                </span>
                <span>SYSTEM ARCHITECTURE LAYERS & DATA FLOW</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.architecture.layers.map((layer, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5"
                  >
                    <div className="text-xs font-editorial-mono font-bold text-[#2563EB]">
                      0{idx + 1} // {layer.name}
                    </div>
                    <div className="text-xs text-[#334155] leading-relaxed">
                      {layer.details}
                    </div>
                  </div>
                ))}
              </div>

              {/* Data Flow Steps */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="text-xs font-editorial-mono font-bold text-[#1A1815] uppercase">
                  Data Pipeline Execution:
                </div>
                <div className="space-y-1 text-sm font-editorial-mono text-[#334155]">
                  {project.architecture.dataFlow.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#2563EB] font-bold">→</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ④ Technologies Stack */}
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-editorial-mono font-bold text-[#1A1815] uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center font-black">
                  ④
                </span>
                <span>TECHNOLOGIES & FRAMEWORKS</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {project.stack.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl text-sm font-editorial-mono font-bold bg-slate-100 text-[#1A1815] border border-slate-300 shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* ⑤ Key Features (Full list from resume) */}
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-editorial-mono font-bold text-[#1A1815] uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-900 flex items-center justify-center font-black">
                  ⑤
                </span>
                <span>VERIFIED KEY FEATURES</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-editorial-sans text-[#1A1815]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ⑥ Results & Resume Metrics */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-xs font-editorial-mono font-bold text-emerald-800 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center font-black">
                  ⑥
                </span>
                <span>VERIFIED RESULTS & METRICS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-emerald-200 text-left shadow-2xs"
                  >
                    <div className="text-3xl font-editorial-mono font-bold text-emerald-800">
                      {m.value}
                    </div>
                    <div className="text-xs font-bold text-[#1A1815] mt-1">{m.label}</div>
                    <div className="text-xs font-editorial-mono text-[#475569]">{m.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ⑦ GitHub & ⑧ Live Demo Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* ⑦ GitHub */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-editorial-mono font-bold text-sm flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>⑦ GITHUB REPO</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                </a>

                {/* ⑧ Live Demo (when available) */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FF5C38] to-[#EA580C] hover:from-[#E04B28] hover:to-[#D9480F] text-white font-editorial-mono font-bold text-sm flex items-center gap-2 shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Globe className="w-4 h-4" />
                    <span>⑧ LIVE DEMO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1A1815] font-editorial-mono text-sm font-bold border border-slate-300 cursor-pointer"
              >
                Close Specification
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
