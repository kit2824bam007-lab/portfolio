"use client";

import React, { useState } from "react";
import { Award, ShieldCheck, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFx } from "../audio/SoundEffects";

export default function CertificationsSection() {
  const { certifications } = PORTFOLIO_DATA;
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="certifications" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-purple-200/60">
      {/* Section Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20">
        <div>
          <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-2">
            07 // VERIFIED ACCREDITATIONS
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
            Verified Credentials.
          </h2>
        </div>

        <div className="text-sm font-editorial-mono text-[#1A1815]/70 font-bold">
          INFOSYS · CISCO · COURSERA · SIMPLILEARN · ALL VISIBLE ON LOAD
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.map((cert) => {
          const isHovered = hoveredCard === cert.id;

          return (
            <div
              key={cert.id}
              onMouseEnter={() => {
                soundFx.playChirp(780, 0.04);
                setHoveredCard(cert.id);
              }}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-purple-200/90 transition-all duration-300 overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-purple-500/15 hover:-translate-y-2 hover:border-[#2563EB]"
            >
              {/* Glowing Issuer Seal Layer */}
              <div
                className={`absolute top-0 right-0 w-56 h-56 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 ${
                  isHovered ? "opacity-35" : "opacity-0"
                }`}
                style={{ backgroundColor: cert.color }}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: cert.color }}
                  />
                  <span className="text-sm sm:text-base font-editorial-mono font-bold uppercase tracking-wider text-[#1A1815]">
                    {cert.issuer}
                  </span>
                </div>

                <span className="px-3.5 py-1.5 rounded-full text-xs font-editorial-mono font-bold bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>VERIFIED RECORD</span>
                </span>
              </div>

              {/* Title with Large Typography */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-editorial-serif font-black text-[#1A1815] mb-4">
                {cert.title}
              </h3>

              {/* Topics Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {cert.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-editorial-mono font-bold bg-slate-50 border border-slate-300 text-[#1A1815] shadow-2xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Credential ID */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs sm:text-sm font-editorial-mono text-[#1A1815] font-bold">
                <span className="text-[#64748B]">CREDENTIAL ID: {cert.credentialId}</span>
                <span className="text-[#2563EB]">OFFICIALLY CERTIFIED</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
