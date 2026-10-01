"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, FileText, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { soundFx } from "../audio/SoundEffects";

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
  scrollProgress: number;
}

const NAV_ITEMS = [
  { id: "hero", label: "Cover" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "coding", label: "Console" },
  { id: "certifications", label: "Verified" },
  { id: "achievements", label: "Milestones" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ activeSection, onOpenResume, scrollProgress }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    soundFx.playChirp(680, 0.05);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSound = () => {
    const newState = soundFx.toggle();
    setAudioActive(newState);
  };

  return (
    <>
      {/* Purple Gradient Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-purple-200/50">
        <div
          className="h-full bg-gradient-to-r from-purple-700 via-fuchsia-500 to-purple-400 transition-all duration-100 ease-out shadow-sm shadow-purple-500/50"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Minimal Purple Glass Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-8 py-3 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/85 backdrop-blur-xl border border-purple-200/70 shadow-lg shadow-purple-500/5 py-2 px-5"
              : "bg-white/40 backdrop-blur-sm border border-purple-200/40"
          }`}
        >
          {/* Wordmark Left */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 group-hover:scale-125 shadow-sm shadow-purple-500/50 transition-transform" />
            <span className="text-sm font-editorial-serif font-bold tracking-tight text-[#1B0A33]">
              ARCHANA<span className="text-purple-600">.DEVI</span>
            </span>
            <span className="hidden sm:inline text-[10px] font-editorial-mono text-[#3B0764]/60 ml-1">
              / CSE(AI&ML)
            </span>
          </button>

          {/* Nav Center */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-editorial-mono">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive ? "text-purple-700 font-bold" : "text-[#1B0A33]/70 hover:text-purple-700"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action CTAs Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Feedback Toggle */}
            <button
              onClick={toggleSound}
              title={audioActive ? "Mute Synthesizer" : "Enable Ambient Synthesizer"}
              className="p-2 rounded-full hover:bg-purple-100/60 text-purple-900/70 hover:text-purple-700 transition-colors cursor-pointer"
            >
              {audioActive ? <Volume2 className="w-4 h-4 text-purple-600" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                soundFx.playChirp(720, 0.06);
                onOpenResume();
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full purple-glass-card hover:bg-white text-xs font-editorial-mono text-purple-950 font-semibold shadow-xs hover:border-purple-400 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-purple-600" />
              <span>Resume</span>
            </button>

            {/* Vibrant Purple Accent CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 hover:opacity-95 text-white font-editorial-mono text-xs font-bold shadow-md shadow-purple-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-purple-950 hover:bg-purple-100/60 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#FAF5FF] flex flex-col justify-between p-8">
          <div className="flex items-center justify-between border-b border-purple-200 pb-4">
            <span className="font-editorial-serif font-bold text-lg text-[#1B0A33]">
              ARCHANA<span className="text-purple-600">.DEVI</span>
            </span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-purple-950">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-4 my-auto">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-2xl font-editorial-serif py-1 flex items-center justify-between ${
                  activeSection === item.id ? "text-purple-700 italic font-bold" : "text-[#1B0A33]"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-editorial-mono text-purple-400">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-purple-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-3 rounded-full border border-purple-300 purple-glass-card font-editorial-mono text-xs text-purple-950 font-bold"
            >
              View Verified Resume
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="w-full py-3 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white font-editorial-mono text-xs font-bold shadow-md shadow-purple-500/25"
            >
              Initiate Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
}
