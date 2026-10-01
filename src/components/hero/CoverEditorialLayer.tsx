"use client";

import React, { useState } from "react";
import { ArrowUpRight, Award, Compass, Sparkles, FileText, Code2, Brain, Laptop, Terminal, Zap, Heart, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LeetCodeIcon, CodeChefIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { soundFx } from "../audio/SoundEffects";

interface CoverEditorialLayerProps {
  onExploreWork: () => void;
  onOpenAbout: () => void;
  onOpenResume: () => void;
}

export default function CoverEditorialLayer({
  onExploreWork,
  onOpenAbout,
  onOpenResume,
}: CoverEditorialLayerProps) {
  const { personal, stats } = PORTFOLIO_DATA;
  const [activeChip, setActiveChip] = useState("AI & ML");

  const CUTE_BADGES = [
    { label: "AI & ML Systems", icon: Brain, color: "text-purple-600 bg-purple-50 border-purple-200", tag: "Neural & Scikit" },
    { label: "Full-Stack Web", icon: Code2, color: "text-blue-600 bg-blue-50 border-blue-200", tag: "Next.js & Node" },
    { label: "Competitive DSA", icon: Zap, color: "text-amber-600 bg-amber-50 border-amber-200", tag: "1,561+ Problems" },
    { label: "Smart Agronomy", icon: Sparkles, color: "text-emerald-600 bg-emerald-50 border-emerald-200", tag: "~95% ML Accuracy" },
  ];

  return (
    <div className="relative w-full h-full min-h-[640px] bg-gradient-to-br from-[#FAF7F2] via-[#FFFDF9] to-[#F5EFE6] p-6 sm:p-10 lg:p-14 flex flex-col justify-between rounded-3xl border-2 border-[#1A1815]/10 shadow-2xl select-none overflow-hidden">
      {/* Subtle Warm Paper Grain Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(26, 24, 21, 0.08) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Cute Ambient Pastel Radiance Bubbles */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-rose-200/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid Content (Balanced 2-Column Showcase without any Photo Card) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Big Editorial Headline & Narrative */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
          {/* Small Label Pill with Cute Pulsing Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 border border-purple-200 shadow-xs backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C38] animate-ping inline-block" />
            <span className="text-xs sm:text-sm font-editorial-mono font-bold tracking-wider text-[#1A1815] uppercase">
              ARCHANA DEVI M — AI/ML ENGINEER
            </span>
            <span className="text-purple-600 text-sm">✦</span>
          </div>

          {/* Huge Headline: clamp(3.5rem, 10vw, 8rem) */}
          <div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.2rem] font-editorial-serif font-black tracking-tight text-[#1A1815] leading-[1.03]">
              Crafting <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5C38] via-[#8B5CF6] to-[#2563EB] italic font-normal">
                Intelligent
              </span>{" "}
              Experiences.
            </h1>

            {/* Sub-line */}
            <p className="text-xl sm:text-2xl text-[#1A1815]/85 font-editorial-sans max-w-2xl leading-relaxed mt-4 font-normal">
              Building intelligent systems where AI, software and real-world problems meet.
            </p>
          </div>

          {/* GPA & Resume Metric Chips */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-editorial-mono">
            {/* GPA chip 8.04/10 */}
            <div className="px-4 py-2 rounded-full bg-white border border-[#FF5C38]/40 text-[#1A1815] font-bold flex items-center gap-2 shadow-xs hover:scale-105 transition-transform">
              <Award className="w-4 h-4 text-[#FF5C38]" />
              <span className="text-[#FF5C38]">GPA: 8.04 / 10</span>
              <span className="text-xs text-[#1A1815]/60 font-medium">KIT Autonomous</span>
            </div>

            <div className="px-4 py-2 rounded-full bg-white border border-purple-200 text-[#1A1815] font-semibold shadow-xs hover:scale-105 transition-transform">
              1,561+ DSA Solved
            </div>

            <div className="px-4 py-2 rounded-full bg-white border border-blue-200 text-[#1A1815] font-semibold shadow-xs hover:scale-105 transition-transform">
              425 Active Days · Codolio #8706
            </div>
          </div>

          {/* Pill CTAs: "View Work ↗" (filled coral/blue) · "About Me" (outlined) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreWork}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5C38] to-[#EA580C] hover:from-[#E04B28] hover:to-[#D9480F] text-white font-editorial-mono font-bold text-sm tracking-wider flex items-center gap-2.5 shadow-xl shadow-[#FF5C38]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>View Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAbout}
              className="px-8 py-4 rounded-full bg-white/90 hover:bg-white text-[#1A1815] font-editorial-mono text-sm font-bold tracking-wider border-2 border-[#1A1815]/25 hover:border-[#2563EB] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#2563EB]" />
              <span>About Me</span>
            </button>

            <button
              onClick={onOpenResume}
              className="px-6 py-4 rounded-full bg-white/80 hover:bg-white text-[#1A1815] font-editorial-mono text-sm font-semibold border border-purple-200 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Catchy & Cute "Interactive Code Craft" Showcase (NO PHOTO CARD) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="p-7 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-purple-200/90 shadow-xl shadow-purple-500/10 space-y-6">
            {/* Top Interactive Code Pill Header */}
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="text-xs font-editorial-mono font-bold text-[#1A1815] ml-1">
                  archana.craft()
                </span>
              </div>
              <span className="text-[11px] font-editorial-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
                AI + RIGOR ✨
              </span>
            </div>

            {/* Cute Interactive Code Terminal Preview */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/80 via-white to-blue-50/80 border border-purple-200 space-y-2 font-editorial-mono text-xs">
              <div className="text-purple-700 font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>const Archana = &#123;</span>
              </div>
              <div className="pl-4 space-y-1 text-[#334155]">
                <div>focus: <span className="text-emerald-700 font-bold">&quot;AI & ML + Full Stack&quot;</span>,</div>
                <div>dsaMastery: <span className="text-blue-700 font-bold">&quot;1,561+ problems&quot;</span>,</div>
                <div>streak: <span className="text-amber-700 font-bold">&quot;425 active days (Codolio #8706)&quot;</span>,</div>
                <div>mindset: <span className="text-rose-600 font-bold">&quot;Code with Heart & Rigor ♡&quot;</span></div>
              </div>
              <div className="text-purple-700 font-bold">&#125;;</div>
            </div>

            {/* Cute Interactive Skill Badges with Spring Hover */}
            <div className="space-y-2">
              <div className="text-xs font-editorial-mono font-bold text-[#1A1815]/70 uppercase tracking-wider flex items-center justify-between">
                <span>Interactive Pillars</span>
                <span className="text-purple-600">CLICK TO EXPLORE ✦</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {CUTE_BADGES.map((b, idx) => {
                  const Icon = b.icon;
                  const isSelected = activeChip === b.label;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFx.playChirp(780 + idx * 40, 0.04);
                        setActiveChip(b.label);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all duration-300 cursor-pointer shadow-2xs hover:scale-103 active:scale-95 ${
                        isSelected
                          ? "bg-purple-900 text-white border-purple-900 shadow-md -translate-y-0.5"
                          : "bg-white hover:bg-purple-50 border-purple-200 text-[#1A1815]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-purple-200" : "text-purple-600"}`} />
                        <span className="text-xs font-bold font-editorial-mono leading-none">{b.label}</span>
                      </div>
                      <div className={`text-[10px] font-editorial-mono ${isSelected ? "text-purple-200" : "text-[#64748B]"}`}>
                        {b.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Status Strip */}
            <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-xs font-editorial-mono">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPEN TO HIGH-IMPACT ROLES</span>
              </div>
              <span className="text-purple-700 font-semibold">2024–2028 KIT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Social Icon Buttons & Wipe Hint */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 mt-4 border-t border-[#1A1815]/10">
        {/* Social icon buttons (GitHub / LeetCode / CodeChef / LinkedIn) */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-editorial-mono font-bold uppercase text-[#1A1815]/60 tracking-wider">
            CONNECT:
          </span>
          <a
            href={personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-3 rounded-full bg-white hover:bg-[#FF5C38]/10 border border-[#1A1815]/15 text-[#1A1815] hover:text-[#FF5C38] hover:scale-110 transition-all shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.socials.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode"
            className="p-3 rounded-full bg-white hover:bg-amber-50 border border-[#1A1815]/15 text-[#1A1815] hover:text-[#FFA116] hover:scale-110 transition-all shadow-xs"
          >
            <LeetCodeIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.socials.codechef}
            target="_blank"
            rel="noopener noreferrer"
            title="CodeChef"
            className="p-3 rounded-full bg-white hover:bg-purple-50 border border-[#1A1815]/15 text-[#1A1815] hover:text-[#A855F7] hover:scale-110 transition-all shadow-xs"
          >
            <CodeChefIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="p-3 rounded-full bg-white hover:bg-blue-50 border border-[#1A1815]/15 text-[#1A1815] hover:text-[#2563EB] hover:scale-110 transition-all shadow-xs"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Dynamic Wipe Interaction Indicator with Cute Icon */}
        <div className="flex items-center gap-2 text-xs font-editorial-mono text-[#1A1815]/80 bg-white/95 px-4 py-2 rounded-full border border-purple-200 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span className="font-bold">DRAG CURSOR / TOUCH TO WIPE REVEAL</span>
          <span className="text-[#FF5C38] animate-bounce">🖌️</span>
        </div>
      </div>
    </div>
  );
}
