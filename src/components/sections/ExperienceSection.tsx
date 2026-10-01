"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Terminal, Cpu, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ExperienceSection() {
  const exp = PORTFOLIO_DATA.experience[0];

  return (
    <section id="experience" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-purple-200/60">
      {/* Section Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20">
        <div>
          <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-2">
            03 // INDUSTRY RECORD
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
            Production Engineering.
          </h2>
        </div>

        <div className="text-sm font-editorial-mono text-[#1A1815]/70 font-bold">
          ABSERVETECH PRIVATE LIMITED · MADURAI, TN · MAY 2026 – JUN 2026
        </div>
      </div>

      {/* Main Experience Card (Luminous Light Luxury Card) */}
      <div className="p-8 sm:p-14 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-purple-200/90 shadow-xl shadow-purple-500/10 space-y-10">
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-200/80">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-editorial-mono font-bold bg-purple-100 text-purple-950 border border-purple-300 shadow-xs">
              {exp.status} · INTERNSHIP
            </span>
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-editorial-mono font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              VERIFIED RESUME RECORD
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm sm:text-base font-editorial-mono text-[#1A1815] font-bold bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            <span>{exp.period}</span>
          </div>
        </div>

        {/* Company & Role */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
              {exp.role}
            </h3>

            <div className="text-xl sm:text-2xl font-editorial-mono text-[#1A1815] font-bold flex flex-wrap items-center gap-2">
              <span className="text-[#2563EB]">{exp.company}</span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-[#1A1815]/80 font-medium text-lg">
                <MapPin className="w-5 h-5 text-[#FF5C38]" />
                {exp.location}
              </span>
            </div>

            <p className="text-lg sm:text-xl font-editorial-sans text-[#1A1815]/85 leading-relaxed font-normal pt-2">
              {exp.description}
            </p>

            {/* ALL THREE CONTRIBUTIONS LISTED AS READABLE CHIPS */}
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-editorial-mono font-bold uppercase tracking-wider text-[#2563EB]">
                Core Engineering Deliverables:
              </h4>

              {exp.contributions.map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-purple-50/70 border border-purple-200/90 shadow-xs hover:bg-white hover:border-[#2563EB] hover:shadow-md transition-all duration-300 group"
                >
                  <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center font-editorial-mono font-bold text-xs shrink-0 mt-0.5 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    0{i + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="text-base sm:text-lg font-bold font-editorial-sans text-[#1A1815]">
                      {c.title}
                    </div>
                    <div className="text-sm sm:text-base font-editorial-sans text-[#1A1815]/80 leading-relaxed font-light">
                      {c.details}
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {c.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-editorial-mono font-bold bg-white text-purple-900 border border-purple-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Luminous Production Metrics Card (Light Theme) */}
          <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-white to-[#EFF6FF] text-[#1A1815] border-2 border-blue-200/80 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200 text-xs font-editorial-mono">
              <span className="text-[#2563EB] font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#2563EB]" />
                // PRODUCTION LAB TELEMETRY
              </span>
              <span className="text-[11px] text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 font-bold">
                VERIFIED SHIPMENT
              </span>
            </div>

            <h4 className="text-xl font-editorial-mono font-bold text-[#1A1815]">
              Production Architecture & API Integration
            </h4>

            <div className="space-y-3.5 font-editorial-mono text-xs">
              <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs hover:border-blue-400 transition-colors">
                <div className="text-[#2563EB] font-bold mb-1">01 / NEWS AGGREGATION PIPELINE</div>
                <div className="text-[#334155] text-xs leading-relaxed">
                  Real-time aggregation engine built on Express microservices with deterministic endpoint routing and responsive client state.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs hover:border-blue-400 transition-colors">
                <div className="text-purple-700 font-bold mb-1">02 / JWT AUTHENTICATION & RBAC</div>
                <div className="text-[#334155] text-xs leading-relaxed">
                  HTTP-only secure cookie session storage & protected route guards shielding administrator endpoints.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-2xs hover:border-blue-400 transition-colors">
                <div className="text-cyan-800 font-bold mb-1">03 / INFINITE SCROLL EFFICIENCY</div>
                <div className="text-[#334155] text-xs leading-relaxed">
                  Intersection-observer pagination reducing initial payload transfers and client memory footprint by 40%.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-blue-200 flex items-center justify-between text-xs font-editorial-mono text-[#475569]">
              <span className="font-bold text-[#1A1815]">MERN · REST · JWT</span>
              <span className="text-emerald-700 font-bold">COMPLETED WITH DISTINCTION</span>
            </div>
          </div>
        </div>

        {/* Bottom Production Stack Strip */}
        <div className="pt-6 border-t border-purple-200/80 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-editorial-mono text-[#1A1815] font-bold">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#2563EB]">PRODUCTION STACK:</span>
            {["React.js", "Node.js", "Express.js", "REST APIs", "JWT Security", "Git"].map((tech, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-full bg-white border border-purple-200 shadow-2xs">
                {tech}
              </span>
            ))}
          </div>
          <span className="text-[#FF5C38]">ABSERVETECH // VERIFIED INTERN</span>
        </div>
      </div>
    </section>
  );
}
