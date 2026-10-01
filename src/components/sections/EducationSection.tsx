"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, Calendar, MapPin, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function EducationSection() {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-purple-200/60">
      {/* Section Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20">
        <div>
          <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-2">
            09 // ACADEMIC RIGOR
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
            Academic Pedigree.
          </h2>
        </div>

        <div className="text-sm font-editorial-mono text-[#1A1815]/70 font-bold">
          KIT COIMBATORE (AUTONOMOUS) · 2024 – 2028 · GPA: 8.04 / 10
        </div>
      </div>

      <div className="relative pl-6 sm:pl-12">
        {/* Animated Line-Drawn Timeline */}
        <div className="absolute left-2.5 sm:left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2563EB] via-purple-400 to-transparent rounded-full" />

        {/* Glowing Timeline Node */}
        <div className="absolute left-0.5 sm:left-2 top-10 w-6 h-6 rounded-full bg-[#2563EB] border-4 border-white flex items-center justify-center shadow-lg shadow-blue-500/50">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>

        <div className="p-8 sm:p-14 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-purple-200/90 shadow-xl space-y-8">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <span className="px-5 py-2 rounded-full bg-blue-50 text-blue-950 border border-blue-300 font-editorial-mono text-sm sm:text-base font-bold flex items-center gap-2 shadow-xs">
              <Award className="w-4 h-4 text-[#2563EB]" />
              <span>CUMULATIVE GPA: {education.gpa}</span>
            </span>

            <div className="flex items-center gap-2 text-sm sm:text-base font-editorial-mono text-[#1A1815] font-bold bg-slate-100 px-4 py-2 rounded-full border border-slate-300">
              <Calendar className="w-4 h-4 text-[#2563EB]" />
              <span>{education.timeline}</span>
            </div>
          </div>

          <div>
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-editorial-serif font-black text-[#1A1815] mb-3">
              {education.degree} in {education.major}
            </h3>

            <div className="text-xl sm:text-2xl font-editorial-mono text-[#2563EB] font-bold mb-2">
              {education.institution}
            </div>

            <div className="flex items-center gap-2 text-base font-editorial-mono text-[#64748B] font-semibold">
              <MapPin className="w-4 h-4 text-[#FF5C38]" />
              <span>{education.location}</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <h4 className="text-xs sm:text-sm font-editorial-mono uppercase tracking-wider text-[#1A1815] font-bold mb-4">
              Core Academic Coursework:
            </h4>
            <div className="flex flex-wrap gap-3">
              {education.coursework.map((course, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-purple-50/80 border border-purple-200 text-sm sm:text-base font-editorial-mono text-[#1A1815] font-semibold shadow-2xs"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
