"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Sparkles, Heart, Code2, Brain, Laptop, Star, Compass, Award } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LeetCodeIcon, CodeChefIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { soundFx } from "../audio/SoundEffects";
import InteractiveButterflies from "@/components/ui/InteractiveButterflies";
import PhotoCursorReveal from "@/components/ui/PhotoCursorReveal";

interface HeroSectionProps {
  onOpenResume: () => void;
  onExploreWork: () => void;
}

const TRAITS = [
  { icon: Code2, label: "Tech Enthusiast", color: "#7C3AED" },
  { icon: Brain, label: "AI & ML Explorer", color: "#9333EA" },
  { icon: Laptop, label: "Full Stack Learner", color: "#6D28D9" },
  { icon: Star, label: "Problem Solver", color: "#C026D3" },
  { icon: Compass, label: "Always Curious", color: "#4F46E5" },
];

const BOOK_PILLS = [
  { label: "Code ♡", bg: "bg-purple-900/90 text-purple-200" },
  { label: "Create ♡", bg: "bg-purple-800/90 text-purple-100" },
  { label: "Innovate ♡", bg: "bg-purple-700/90 text-white" },
  { label: "Better Me ♡", bg: "bg-purple-600/90 text-white" },
];

export default function HeroSection({ onOpenResume, onExploreWork }: HeroSectionProps) {
  const { personal } = PORTFOLIO_DATA;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex items-center justify-center px-4 sm:px-8 lg:px-12 py-20 sm:py-28 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Dynamic Animated Butterflies & Sparkles across Cover Page */}
      <InteractiveButterflies />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center w-full z-10">
        {/* Left Column: Hero Narrative & CTAs */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          {/* Top Pill with Butterfly Icon */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-purple-100/90 border border-purple-300 shadow-sm backdrop-blur-md"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping inline-block" />
            <span className="text-xs sm:text-sm font-editorial-mono font-bold tracking-wider text-purple-950 uppercase">
              ARCHANA DEVI M — AI & ML ENGINEER
            </span>
            <span className="text-purple-600 text-base">♡</span>
          </motion.div>

          {/* Main Display Headline with Bigger Font Size */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-8xl font-editorial-serif font-bold tracking-tight text-[#1B0A33] leading-[1.05]"
            >
              Building <span className="text-purple-gradient italic font-normal">Intelligent</span> Systems with Heart & Rigor.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-2xl text-[#3B0764]/85 font-editorial-sans max-w-2xl leading-relaxed mt-5 font-light"
            >
              Pre-final-year CSE (AI & ML) student at KIT Coimbatore. Merging mathematical deep learning algorithms with production-grade full-stack architectures.
            </motion.p>
          </div>

          {/* Resume-backed Metric Chips with Larger Text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 text-sm font-editorial-mono"
          >
            <div className="px-4 py-2 rounded-full bg-purple-100 border border-purple-300 text-purple-950 font-bold flex items-center gap-2 shadow-xs">
              <Award className="w-4 h-4 text-purple-700" />
              <span>GPA: 8.04 / 10</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-white/90 border border-purple-200 text-purple-950 font-semibold shadow-xs">
              1,561+ DSA Solved
            </div>

            <div className="px-4 py-2 rounded-full bg-white/90 border border-purple-200 text-purple-950 font-semibold shadow-xs">
              KIT Pre-Final Year (2024–2028)
            </div>
          </motion.div>

          {/* Action CTAs & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-3"
          >
            <button
              onClick={() => {
                soundFx.playChirp(720, 0.06);
                onExploreWork();
              }}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 text-white font-editorial-mono font-bold text-sm tracking-wider flex items-center gap-2 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>EXPLORE SYSTEMS</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                soundFx.playChirp(680, 0.06);
                onOpenResume();
              }}
              className="px-7 py-4 rounded-full purple-glass-card hover:bg-white text-purple-950 font-editorial-mono text-sm font-semibold tracking-wider hover:border-purple-400 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>VERIFIED RESUME</span>
            </button>

            {/* Social Icons Strip */}
            <div className="flex items-center gap-2.5 pl-2">
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="p-3 rounded-full bg-white/90 hover:bg-purple-100 border border-purple-200 text-purple-900 hover:text-purple-600 hover:scale-110 transition-all cursor-pointer shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={personal.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                title="LeetCode"
                className="p-3 rounded-full bg-white/90 hover:bg-purple-100 border border-purple-200 text-purple-900 hover:text-purple-600 hover:scale-110 transition-all cursor-pointer shadow-xs"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>

              <a
                href={personal.socials.codechef}
                target="_blank"
                rel="noopener noreferrer"
                title="CodeChef"
                className="p-3 rounded-full bg-white/90 hover:bg-purple-100 border border-purple-200 text-purple-900 hover:text-purple-600 hover:scale-110 transition-all cursor-pointer shadow-xs"
              >
                <CodeChefIcon className="w-4 h-4" />
              </a>

              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-3 rounded-full bg-white/90 hover:bg-purple-100 border border-purple-200 text-purple-900 hover:text-purple-600 hover:scale-110 transition-all cursor-pointer shadow-xs"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Showcase Card with Photo Cursor Reveal */}
        <div className="lg:col-span-5 relative flex justify-center">
          {/* Ambient Glow Aura */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/30 via-fuchsia-300/30 to-indigo-400/30 rounded-3xl blur-2xl animate-glow-pulse pointer-events-none" />

          {/* Interactive Tilt Card */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
              rotateX: tilt.x,
              rotateY: tilt.y,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{ perspective: 1000 }}
            className="relative z-10 w-full max-w-[420px] rounded-3xl overflow-hidden purple-glass-card border-2 border-purple-300/80 p-4 shadow-2xl transition-shadow duration-300 hover:shadow-purple-500/25"
          >
            {/* The Photo Cursor Reveal Component (Cursor wipe reveals photo) */}
            <PhotoCursorReveal />

            {/* Trait Tags Strip Underneath Photo */}
            <div className="pt-3 pb-1 px-1">
              <div className="flex items-center justify-between text-xs font-editorial-mono text-purple-950 font-bold mb-2">
                <span>LEARN · BUILD · GROW</span>
                <span className="text-purple-700">ARCHANA.M</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {TRAITS.map((t, idx) => {
                  const Icon = t.icon;
                  return (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-purple-50/90 border border-purple-200/90 text-[11px] font-editorial-mono text-purple-900 flex items-center gap-1 shadow-2xs"
                    >
                      <Icon className="w-3 h-3 text-purple-700" />
                      <span>{t.label}</span>
                    </span>
                  );
                })}
              </div>

              {/* "Code Create Innovate Better Me" Stack */}
              <div className="grid grid-cols-4 gap-1.5 mt-2.5 animate-book-lift">
                {BOOK_PILLS.map((b, idx) => (
                  <div
                    key={idx}
                    className={`py-1.5 rounded-md text-[10px] font-editorial-mono font-bold text-center shadow-xs ${b.bg}`}
                  >
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
