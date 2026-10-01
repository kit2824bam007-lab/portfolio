"use client";

import React from "react";
import { Trophy, Code2, Flame, Award, Users, ArrowUpRight, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFx } from "../audio/SoundEffects";

const ACHIEVEMENTS = [
  {
    icon: Code2,
    number: "10+",
    label: "End-to-End Projects",
    detail: "Full-stack web apps, offline ML PWAs & autonomous digital twins",
    color: "#2563EB",
    bg: "bg-blue-50/80",
    border: "border-blue-200",
  },
  {
    icon: Trophy,
    number: "1,561+",
    label: "DSA Coding Problems",
    detail: "Mastery across LeetCode, CodeChef (★★ 2-Star), and Codeforces",
    color: "#7C3AED",
    bg: "bg-purple-50/80",
    border: "border-purple-200",
  },
  {
    icon: Flame,
    number: "144",
    label: "Global Contests",
    detail: "Timed competitive rounds solving greedy, DP and graph problems",
    color: "#FF5C38",
    bg: "bg-orange-50/80",
    border: "border-orange-200",
  },
  {
    icon: Sparkles,
    number: "425",
    label: "Active Coding Days",
    detail: "Codolio Global Rank #8706 demonstrating unwavering daily consistency",
    color: "#06B6D4",
    bg: "bg-cyan-50/80",
    border: "border-cyan-200",
  },
  {
    icon: Users,
    number: "Team",
    label: "Freelancing Team Lead",
    detail: "Collaborative systems engineering, client delivery & production deployments",
    color: "#10B981",
    bg: "bg-emerald-50/80",
    border: "border-emerald-200",
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-purple-200/60">
      {/* Section Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20">
        <div>
          <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-2">
            08 // PROOF OF PRACTICE
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
            Key Achievements.
          </h2>
        </div>

        <div className="text-sm font-editorial-mono text-[#1A1815]/70 font-bold">
          CONCRETE MILESTONES · ZERO FABRICATED METRICS
        </div>
      </div>

      {/* Visible Milestone Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onMouseEnter={() => soundFx.playChirp(800 + idx * 40, 0.03)}
              className={`p-8 rounded-3xl bg-white/95 backdrop-blur-xl border-2 ${item.border} shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: item.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-editorial-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-[#1A1815] border border-slate-200">
                    VERIFIED
                  </span>
                </div>

                {/* Big Stat Number: ≥ 2.5rem */}
                <div
                  className="text-4xl sm:text-5xl font-editorial-mono font-black tracking-tight"
                  style={{ color: item.color }}
                >
                  {item.number}
                </div>

                <div className="text-xl font-editorial-serif font-bold text-[#1A1815] mt-2">
                  {item.label}
                </div>

                <p className="text-sm font-editorial-sans text-[#475569] mt-2 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-editorial-mono text-[#64748B]">
                <span>PORTFOLIO RECORD</span>
                <span className="font-bold text-[#1A1815]">MILESTONE 0{idx + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
