"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Award, Briefcase, Code, GraduationCap, CheckCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFx } from "../audio/SoundEffects";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { personal, education, experience, projects, skills, codingStats, certifications } = PORTFOLIO_DATA;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playChirp(800, 0.05);
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Luminous Light Frosted Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-xl"
        />

        {/* Modal Window: Light Document Aesthetic */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border-2 border-slate-300 shadow-2xl p-6 sm:p-12 text-[#1A1815]"
        >
          {/* Top Actions Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs sm:text-sm font-editorial-mono text-[#2563EB] font-bold uppercase tracking-wider">
                VERIFIED RESUME // ARCHANA DEVI M
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs sm:text-sm font-editorial-mono font-bold text-[#1A1815] border border-slate-300 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#2563EB]" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 text-[#1A1815] transition-colors cursor-pointer"
                aria-label="Close resume"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Document Content with Large Professional Typography */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-editorial-serif font-black tracking-tight text-[#1A1815] mb-1">
                {personal.name}
              </h2>
              <div className="text-base sm:text-lg font-editorial-mono text-[#2563EB] font-bold mb-3">
                {personal.title} · {personal.batch}
              </div>

              <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-editorial-mono text-[#475569]">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Mail className="w-4 h-4 text-[#2563EB]" />
                  {personal.email}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <Phone className="w-4 h-4 text-[#2563EB]" />
                  {personal.phone}
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-4 h-4 text-[#FF5C38]" />
                  {personal.location}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-[#10B981]">
                  <Award className="w-4 h-4" />
                  GPA: {personal.gpa}
                </span>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-sm font-editorial-mono font-bold text-[#2563EB] uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                <GraduationCap className="w-4 h-4" />
                EDUCATION
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-[#1A1815]">{education.institution}</h4>
                    <p className="text-sm font-editorial-mono text-[#2563EB] font-semibold">{education.degree} in {education.major}</p>
                  </div>
                  <span className="text-xs font-editorial-mono font-bold text-[#64748B]">{education.timeline}</span>
                </div>
                <div className="mt-2 text-xs font-editorial-mono font-bold text-emerald-800">
                  Cumulative GPA: {education.gpa}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h3 className="text-sm font-editorial-mono font-bold text-[#2563EB] uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                <Briefcase className="w-4 h-4" />
                INDUSTRY EXPERIENCE
              </h3>
              {experience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1815]">{exp.role}</h4>
                      <p className="text-sm font-editorial-mono text-[#2563EB] font-semibold">{exp.company} · {exp.location}</p>
                    </div>
                    <span className="text-xs font-editorial-mono font-bold text-[#64748B]">{exp.period}</span>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed">{exp.description}</p>
                  <ul className="space-y-1.5 text-xs text-[#334155] pt-1">
                    {exp.contributions.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#2563EB] font-bold">›</span>
                        <span>
                          <strong className="text-[#1A1815]">{c.title}:</strong> {c.details}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <h3 className="text-sm font-editorial-mono font-bold text-[#2563EB] uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                <Code className="w-4 h-4" />
                FEATURED SYSTEMS ARCHITECTED
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-bold text-[#1A1815]">{proj.title}</h4>
                      {proj.badge && (
                        <span className="text-[10px] font-editorial-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                          {proj.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-editorial-mono text-[#2563EB] font-semibold">{proj.tagline}</p>
                    <p className="text-xs text-[#334155] leading-relaxed line-clamp-3">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.stack.map((s, idx) => (
                        <span key={idx} className="text-[10px] font-editorial-mono bg-white px-2 py-0.5 rounded border border-slate-300 text-[#1A1815]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h3 className="text-sm font-editorial-mono font-bold text-[#2563EB] uppercase tracking-wider border-b border-slate-200 pb-2">
                TECHNICAL SKILLS
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s.id} className="px-3 py-1 rounded-lg text-xs font-editorial-mono font-bold bg-slate-100 border border-slate-300 text-[#1A1815]">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Competitive Programming Stats */}
            <div className="space-y-3">
              <h3 className="text-sm font-editorial-mono font-bold text-[#2563EB] uppercase tracking-wider border-b border-slate-200 pb-2">
                COMPETITIVE PROGRAMMING RECORD
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xl font-bold font-editorial-mono text-[#1A1815]">1,561+</div>
                  <div className="text-[11px] font-editorial-mono text-[#64748B]">Total Solved</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xl font-bold font-editorial-mono text-[#1A1815]">425 Days</div>
                  <div className="text-[11px] font-editorial-mono text-[#64748B]">Codolio Streak</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xl font-bold font-editorial-mono text-[#1A1815]">1512</div>
                  <div className="text-[11px] font-editorial-mono text-[#64748B]">LeetCode Rating</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xl font-bold font-editorial-mono text-[#1A1815]">1469 ★★</div>
                  <div className="text-[11px] font-editorial-mono text-[#64748B]">CodeChef 2-Star</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
