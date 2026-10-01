"use client";

import React, { useState } from "react";
import { Terminal, Globe, Cpu, Database, Wrench, Sparkles, Layers } from "lucide-react";
import { PORTFOLIO_DATA, SkillItem } from "@/data/portfolioData";
import { soundFx } from "../audio/SoundEffects";

const CATEGORIES = [
  {
    id: "Languages",
    title: "Languages",
    icon: Terminal,
    color: "#2563EB",
    bgAccent: "bg-blue-50/70",
    borderAccent: "border-blue-200",
    glow: "shadow-blue-500/20",
  },
  {
    id: "Web & Backend",
    title: "Web & Backend",
    icon: Globe,
    color: "#7C3AED",
    bgAccent: "bg-purple-50/70",
    borderAccent: "border-purple-200",
    glow: "shadow-purple-500/20",
  },
  {
    id: "AI & ML",
    title: "AI & Machine Learning",
    icon: Cpu,
    color: "#06B6D4",
    bgAccent: "bg-cyan-50/70",
    borderAccent: "border-cyan-200",
    glow: "shadow-cyan-500/20",
  },
  {
    id: "Databases",
    title: "Databases",
    icon: Database,
    color: "#10B981",
    bgAccent: "bg-emerald-50/70",
    borderAccent: "border-emerald-200",
    glow: "shadow-emerald-500/20",
  },
  {
    id: "Tools",
    title: "Tools & DevOps",
    icon: Wrench,
    color: "#F59E0B",
    bgAccent: "bg-amber-50/70",
    borderAccent: "border-amber-200",
    glow: "shadow-amber-500/20",
  },
];

export default function SkillsSection() {
  const { skills } = PORTFOLIO_DATA;
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-purple-200/60">
      {/* Section Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20">
        <div>
          <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-2">
            05 // THE STACK
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
            Technical Ecosystem.
          </h2>
        </div>

        <div className="text-sm font-editorial-mono text-[#1A1815]/70 font-bold">
          ALL 5 CATEGORY GROUPS VISIBLE ON LOAD · CONSTELLATION HOVER GLOW · NO ARBITRARY BARS
        </div>
      </div>

      {/* ALL 5 CATEGORY GROUPS VISIBLE ON LOAD */}
      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const categorySkills = skills.filter((s) => s.category === cat.id);
          const Icon = cat.icon;

          return (
            <div
              key={cat.id}
              className={`p-7 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border-2 ${cat.borderAccent} shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: cat.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-editorial-serif font-bold text-[#1A1815]">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-editorial-mono text-[#64748B] font-semibold uppercase">
                      {categorySkills.length} Production Technologies
                    </span>
                  </div>
                </div>

                <span className="text-xs font-editorial-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-[#1A1815] border border-slate-300">
                  VERIFIED PROFICIENCY
                </span>
              </div>

              {/* Skill Chips with Constellation Glow on Hover */}
              <div className="flex flex-wrap gap-3">
                {categorySkills.map((skill) => {
                  const isHovered = hoveredSkill === skill.id;

                  return (
                    <div
                      key={skill.id}
                      onMouseEnter={() => {
                        soundFx.playChirp(840, 0.03);
                        setHoveredSkill(skill.id);
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`px-5 py-3 rounded-2xl text-base font-editorial-mono font-bold transition-all duration-300 cursor-pointer flex items-center gap-2.5 select-none ${
                        isHovered
                          ? "bg-[#1A1815] text-white scale-105 shadow-xl -translate-y-1"
                          : "bg-white text-[#1A1815] border border-slate-300 hover:border-slate-500 shadow-2xs"
                      }`}
                      style={{
                        boxShadow: isHovered ? `0 10px 25px -5px ${cat.color}60` : undefined,
                        borderColor: isHovered ? cat.color : undefined,
                      }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full transition-transform duration-300"
                        style={{
                          backgroundColor: isHovered ? "#3EE6C4" : cat.color,
                          transform: isHovered ? "scale(1.4)" : "scale(1)",
                        }}
                      />
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm font-editorial-mono text-[#1A1815] font-bold px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2563EB]" />
          <span>PRODUCTION-TESTED STACK // CSE (AI & ML)</span>
        </div>
        <div>
          TOTAL PRODUCTION TOOLS: <span className="text-[#2563EB]">{skills.length} TOOLS</span>
        </div>
      </div>
    </section>
  );
}
