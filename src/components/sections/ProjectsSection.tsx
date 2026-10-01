"use client";

import React, { useState } from "react";
import { ArrowUpRight, ExternalLink, Sparkles, Layers, ChevronRight, Activity, Globe, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";
import DreamInkSimulation from "../projects/DreamInkSimulation";
import AgricultureSimulation from "../projects/AgricultureSimulation";
import TalentDnaSimulation from "../projects/TalentDnaSimulation";
import CoastGuardSimulation from "../projects/CoastGuardSimulation";
import ProjectDetailModal from "../modals/ProjectDetailModal";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { soundFx } from "../audio/SoundEffects";

export default function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const getSimulationComponent = (id: string) => {
    switch (id) {
      case "dreamink-ai":
        return <DreamInkSimulation />;
      case "smart-agriculture":
        return <AgricultureSimulation />;
      case "talentdna":
        return <TalentDnaSimulation />;
      case "coastguard-twin":
        return <CoastGuardSimulation />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-purple-200/60">
      {/* Editorial Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20">
        <div>
          <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-2">
            04 // SYSTEMS ARCHITECTED
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
            Systems I&apos;ve Built.
          </h2>
        </div>

        <div className="text-sm font-editorial-mono text-[#1A1815]/70 font-bold">
          COMPLETE VERIFIED SPECIFICATIONS · PRODUCTION CODE · LIVE SIMULATION
        </div>
      </div>

      {/* Editorial Project Rows with Large Typography & Directly Visible Content */}
      <div className="space-y-20">
        {projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-purple-200/90 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-300"
          >
            {/* Left Column: Deep Metadata, Descriptions, and Feature Chips */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Index & Badge */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-editorial-mono text-[#2563EB] font-bold">
                    0{idx + 1} //
                  </span>
                  {proj.badge && (
                    <span
                      className={`px-3.5 py-1 rounded-full text-xs font-editorial-mono font-bold tracking-wider shadow-xs ${
                        proj.badge === "LIVE"
                          ? "bg-amber-100 border border-amber-300 text-amber-950"
                          : "bg-blue-100 border border-blue-300 text-blue-950"
                      }`}
                    >
                      {proj.badge}
                    </span>
                  )}
                  <span className="text-xs font-editorial-mono text-[#1A1815]/50 uppercase tracking-wider font-semibold">
                    COMPLETE SYSTEM RECORD
                  </span>
                </div>

                {/* Large Title & Tagline */}
                <div>
                  <h3 className="text-3xl sm:text-5xl font-editorial-serif font-black text-[#1A1815] tracking-tight mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-base sm:text-xl font-editorial-mono text-[#2563EB] font-bold">
                    {proj.tagline}
                  </p>
                </div>

                {/* Full Visible Description (≥ 1.125rem / 18px body font) */}
                <p className="text-lg sm:text-xl font-editorial-sans text-[#1A1815]/90 leading-relaxed font-normal">
                  {proj.description}
                </p>

                {/* Visible Stack Pills */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs font-editorial-mono font-bold text-[#1A1815]/70 uppercase tracking-wider">
                    Core Stack:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3.5 py-1.5 rounded-full text-xs font-editorial-mono font-bold bg-purple-50 text-purple-950 border border-purple-200 shadow-2xs hover:border-purple-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visible Feature Chips (ALL VISIBLE AS REQUESTED) */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs font-editorial-mono font-bold text-[#1A1815]/70 uppercase tracking-wider">
                    Feature Capabilities:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-3 py-1 rounded-lg text-xs font-editorial-mono font-semibold bg-white border border-slate-300 text-[#1A1815] shadow-2xs flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Chips (Stats ≥ 2.5rem) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
                  {proj.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-left"
                    >
                      <div className="text-2xl sm:text-3xl font-editorial-mono font-bold text-[#1A1815]">
                        {m.value}
                      </div>
                      <div className="text-xs font-bold text-[#2563EB] mt-0.5">{m.label}</div>
                      <div className="text-[11px] font-editorial-mono text-[#64748B]">{m.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons: GitHub + Live Demo + View Architecture */}
              <div className="pt-6 border-t border-purple-200/80 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    soundFx.playChirp(820, 0.05);
                    setSelectedProject(proj);
                  }}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-700 to-blue-600 hover:from-purple-800 hover:to-blue-700 text-white font-editorial-mono font-bold text-sm tracking-wider flex items-center gap-2 shadow-md shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>SPECIFICATION</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#1A1815] font-editorial-mono font-semibold text-sm border border-slate-300 hover:border-slate-500 flex items-center gap-2 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-editorial-mono font-bold text-sm flex items-center gap-2 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Globe className="w-4 h-4" />
                    <span>LIVE DEMO</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Directly Visible Live Simulation Window */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 rounded-t-2xl bg-white border-t border-x border-purple-300 text-xs font-editorial-mono text-[#1A1815] shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-bold text-[#1A1815] ml-1.5 uppercase">{proj.id}.engine</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#2563EB] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>INTERACTIVE ENGINE</span>
                </div>
              </div>

              <div className="w-full flex-1 min-h-[420px] p-2 bg-gradient-to-br from-[#FAF5FF] via-white to-[#F0F4FF] rounded-b-2xl flex items-center justify-center border-b border-x border-purple-300 shadow-inner overflow-hidden relative">
                {getSimulationComponent(proj.id)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
