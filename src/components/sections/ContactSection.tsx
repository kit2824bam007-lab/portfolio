"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Copy, Check, Heart, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodeChefIcon } from "@/components/ui/SocialIcons";
import { soundFx } from "../audio/SoundEffects";

export default function ContactSection() {
  const { personal } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Intelligent Systems Engineering Collaboration",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playChirp(880, 0.08);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundFx.playLaser();

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ["#2563EB", "#FF5C38", "#10B981", "#7C3AED"],
      });
    }, 700);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    soundFx.playChirp(920, 0.05);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Header with Large Typography */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-3">
          10 // INITIATE TRANSMISSION
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
          Let&apos;s Build Something Intelligent.
        </h2>
        <p className="text-lg sm:text-2xl text-[#1A1815]/80 font-editorial-sans mt-4 font-normal">
          Have an interesting problem, project or collaboration idea?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
        {/* Left: Direct Coordinates & Socials */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-purple-200/90 shadow-xl space-y-6">
            <h3 className="text-2xl sm:text-3xl font-editorial-serif font-bold text-[#1A1815]">
              Direct Coordinates
            </h3>

            {/* Email Card with One-Click Copy */}
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-editorial-mono text-[#2563EB] font-bold uppercase tracking-wider">
                  Primary Email
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1 rounded-md text-xs font-editorial-mono font-bold bg-white hover:bg-blue-50 text-[#1A1815] flex items-center gap-1.5 cursor-pointer transition-colors border border-purple-200 shadow-2xs"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#2563EB]" />}
                  <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <a
                href={`mailto:${personal.email}`}
                className="text-base sm:text-lg font-editorial-mono font-bold text-[#1A1815] hover:text-[#2563EB] block break-all transition-colors"
              >
                {personal.email}
              </a>
            </div>

            {/* Phone */}
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
              <span className="text-xs font-editorial-mono text-[#2563EB] font-bold uppercase tracking-wider block">
                Direct Phone
              </span>
              <a
                href={`tel:${personal.phone}`}
                className="text-lg font-editorial-mono font-bold text-[#1A1815] hover:text-[#2563EB] transition-colors"
              >
                {personal.phone}
              </a>
            </div>

            {/* Location */}
            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
              <span className="text-xs font-editorial-mono text-[#2563EB] font-bold uppercase tracking-wider block">
                Location & Base
              </span>
              <div className="text-base sm:text-lg font-editorial-mono font-bold text-[#1A1815] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF5C38]" />
                <span>{personal.location}</span>
              </div>
            </div>

            {/* Social Handles (GitHub / LinkedIn / LeetCode / CodeChef) */}
            <div className="pt-2">
              <span className="text-xs font-editorial-mono text-[#1A1815]/70 uppercase font-bold block mb-3">
                Global Engineering Profiles
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-300 text-[#1A1815] hover:text-[#2563EB] hover:border-[#2563EB] hover:scale-110 transition-all shadow-xs"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-300 text-[#1A1815] hover:text-[#0A66C2] hover:border-[#0A66C2] hover:scale-110 transition-all shadow-xs"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={personal.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-300 text-[#1A1815] hover:text-[#FFA116] hover:border-[#FFA116] hover:scale-110 transition-all shadow-xs"
                  title="LeetCode"
                >
                  <LeetCodeIcon className="w-5 h-5" />
                </a>
                <a
                  href={personal.socials.codechef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-300 text-[#1A1815] hover:text-[#A855F7] hover:border-[#A855F7] hover:scale-110 transition-all shadow-xs"
                  title="CodeChef"
                >
                  <CodeChefIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Full Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-purple-200/90 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-2xl sm:text-3xl font-editorial-serif font-bold text-[#1A1815]">
                Send Transmission
              </h3>
              <span className="text-xs font-editorial-mono font-bold text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                ACTIVE STATUS
              </span>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-editorial-serif font-bold text-emerald-950">
                  Transmission received.
                </h4>
                <p className="text-base font-editorial-sans text-emerald-900/80">
                  Thank you for reaching out, {formData.name}! Your message has been logged and Archana will respond shortly to {formData.email}.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", subject: "Intelligent Systems Engineering Collaboration", message: "" });
                  }}
                  className="px-6 py-2.5 rounded-full bg-emerald-700 text-white font-editorial-mono text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-editorial-mono font-bold text-[#1A1815] uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Engineering Lead / Recruiter / Collaborator"
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-[#1A1815] text-base font-editorial-sans placeholder:text-[#64748B]/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-editorial-mono font-bold text-[#1A1815] uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@domain.com"
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-[#1A1815] text-base font-editorial-sans placeholder:text-[#64748B]/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-editorial-mono font-bold text-[#1A1815] uppercase tracking-wider mb-2">
                    Message / System Inquiries
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, team opportunity, or research collaboration..."
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-[#1A1815] text-base font-editorial-sans placeholder:text-[#64748B]/50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#2563EB] via-purple-700 to-[#FF5C38] text-white font-editorial-mono text-sm sm:text-base font-bold tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "TRANSMITTING..." : "SEND TRANSMISSION"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
