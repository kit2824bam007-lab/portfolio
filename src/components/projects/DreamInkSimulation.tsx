"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, RefreshCw, Feather } from "lucide-react";
import { soundFx } from "../audio/SoundEffects";

const TAMIL_VERSES = [
  "வானவில்லின் வண்ணமாய்...",
  "கவிதை பிறக்குது கணிணியில்,",
  "சிந்தனை சிறகுகள் விரிய...",
  "புதிய உலகம் மலர்கிறது!",
];

const ENGLISH_VERSES = [
  "Like threads of woven northern lights...",
  "Algorithms breathe into prose,",
  "Where silicon dreams meet human heart,",
  "A quiet digital aurora glows.",
];

export default function DreamInkSimulation() {
  const [lang, setLang] = useState<"tamil" | "english">("tamil");
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const activeVerses = lang === "tamil" ? TAMIL_VERSES : ENGLISH_VERSES;

  useEffect(() => {
    setDisplayedLines([""]);
    setCurrentLineIdx(0);
    setCurrentCharIdx(0);
  }, [lang]);

  useEffect(() => {
    if (currentLineIdx >= activeVerses.length) return;

    const fullLine = activeVerses[currentLineIdx];

    if (currentCharIdx < fullLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLineIdx] = fullLine.slice(0, currentCharIdx + 1);
          return updated;
        });
        setCurrentCharIdx((prev) => prev + 1);
      }, 45);
      return () => clearTimeout(timer);
    } else {
      const lineTimer = setTimeout(() => {
        setCurrentLineIdx((prev) => prev + 1);
        setCurrentCharIdx(0);
        setDisplayedLines((prev) => [...prev, ""]);
      }, 350);
      return () => clearTimeout(lineTimer);
    }
  }, [currentCharIdx, currentLineIdx, activeVerses]);

  const handleRestart = () => {
    soundFx.playChirp(700, 0.05);
    setDisplayedLines([""]);
    setCurrentLineIdx(0);
    setCurrentCharIdx(0);
  };

  const handleExport = () => {
    soundFx.playChirp(900, 0.08);
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1200);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#0D0D1A] to-[#07070F] border border-amber-500/30 p-5 sm:p-6 overflow-hidden select-none">
      {/* Top Studio Control Strip */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Feather className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-amber-300">
            DREAMINK STUDIO // GENERATOR
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
            <button
              onClick={() => setLang("tamil")}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                lang === "tamil" ? "bg-amber-500 text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLang("english")}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                lang === "english" ? "bg-amber-500 text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={handleRestart}
            title="Regenerate Verse"
            className="p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Writing Studio Canvas Surface */}
      <div className="relative min-h-[170px] bg-black/60 rounded-xl p-5 border border-white/5 flex flex-col justify-center">
        <div className="absolute right-4 bottom-2 text-7xl font-serif text-white/[0.02] pointer-events-none select-none">
          {lang === "tamil" ? "க" : "AI"}
        </div>

        <div className="space-y-2 z-10">
          {displayedLines.map((line, idx) => (
            <div
              key={idx}
              className={`text-sm sm:text-base md:text-lg font-mono tracking-wide ${
                lang === "tamil" ? "font-medium text-teal-200" : "font-light text-violet-200"
              }`}
            >
              {line}
              {idx === currentLineIdx && (
                <span className="inline-block w-2 h-4 ml-1 bg-amber-400 animate-pulse align-middle" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Export Card Action */}
      <div className="mt-4 flex items-center justify-between text-xs font-mono">
        <span className="text-white/40">ENGINE: GEMINI PRO GENERATIVE AI</span>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? "Canvas Exported!" : "Export Card"}</span>
        </button>
      </div>
    </div>
  );
}
