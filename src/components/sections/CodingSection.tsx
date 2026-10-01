"use client";

import React, { useState } from "react";
import { Terminal, Flame, Code2, Sparkles, Trophy, CheckCircle2, Send, Zap, Award } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFx } from "../audio/SoundEffects";

export default function CodingSection() {
  const { codingStats } = PORTFOLIO_DATA;
  const [terminalInput, setTerminalInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([
    "$ archana --stats",
    "> LeetCode: 1512 (Peak 1579) · 379 problems",
    "> Codeforces: 745 (Peak 883) · 23 problems",
    "> CodeChef: 1469 ★★ · 1,159 problems · DSA Rating 1658",
    "> Overall: 1,561+ problems · 144 contests · 425 active coding days · Codolio #8706",
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    soundFx.playChirp(780, 0.05);

    let output = "";
    if (cmd === "help") {
      output = "Commands: stats, platforms, streak, rank, clear";
    } else if (cmd === "stats") {
      output = "1,561+ problems · 144 contests · 425 active days · Codolio Global Rank 8706";
    } else if (cmd === "platforms") {
      output = "LeetCode 1512 (379 solved) | CodeChef 1469 ★★ (1,159 solved) | Codeforces 745";
    } else if (cmd === "streak" || cmd === "rank") {
      output = "425 consecutive active coding days on Codolio | Global Rank: #8,706";
    } else if (cmd === "clear") {
      setCommandHistory([]);
      setTerminalInput("");
      return;
    } else {
      output = `command not found: "${cmd}". Type 'help' for commands.`;
    }

    setCommandHistory((prev) => [...prev, `$ ${terminalInput}`, `> ${output}`]);
    setTerminalInput("");
  };

  return (
    <section id="coding" className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-b border-purple-200/60">
      {/* Section Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-20">
        <div>
          <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-2">
            06 // PROOF OF PRACTICE
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
            Algorithmic Practice.
          </h2>
        </div>

        <div className="text-sm font-editorial-mono text-[#1A1815]/70 font-bold">
          1,561+ PROBLEMS · 144 CONTESTS · 425 ACTIVE DAYS · CODOLIO GLOBAL RANK 8706
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Column: LARGE Mono Platform Cards */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-purple-200/90 shadow-xl shadow-purple-500/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-purple-200/80">
              <span className="text-sm font-editorial-mono font-bold text-[#2563EB] uppercase tracking-wider">
                COMPETITIVE PROGRAMMING VERIFIED METRICS
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-editorial-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                OFFICIALLY AUDITED
              </span>
            </div>

            {/* Platform Grid with LARGE numbers (stats ≥ 2.5rem) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-editorial-mono">
              {/* LeetCode */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 to-white border-2 border-amber-200 text-left shadow-xs hover:border-amber-400 hover:shadow-md transition-all">
                <div className="text-xs text-amber-700 font-bold uppercase mb-1 flex items-center justify-between">
                  <span>LEETCODE</span>
                  <span className="text-[11px] text-amber-900 bg-amber-100 px-2 py-0.5 rounded font-bold">CONTEST</span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-[#1A1815] my-1">
                  1512
                </div>
                <div className="text-sm text-[#1A1815] font-semibold mt-1">
                  379 DSA Problems Solved
                </div>
                <div className="text-xs text-amber-800 font-medium mt-0.5">
                  Highest Rating: 1579
                </div>
              </div>

              {/* CodeChef */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/70 to-white border-2 border-purple-200 text-left shadow-xs hover:border-purple-400 hover:shadow-md transition-all">
                <div className="text-xs text-purple-700 font-bold uppercase mb-1 flex items-center justify-between">
                  <span>CODECHEF</span>
                  <span className="text-[11px] text-purple-900 bg-purple-100 px-2 py-0.5 rounded font-bold">2 STAR</span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-purple-700 my-1">
                  1469 <span className="text-2xl text-amber-500">★★</span>
                </div>
                <div className="text-sm text-[#1A1815] font-semibold mt-1">
                  1,159 Problems Solved
                </div>
                <div className="text-xs text-purple-800 font-medium mt-0.5">
                  DSA Rating: 1658
                </div>
              </div>

              {/* Codeforces */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/70 to-white border-2 border-blue-200 text-left shadow-xs hover:border-blue-400 hover:shadow-md transition-all">
                <div className="text-xs text-blue-700 font-bold uppercase mb-1 flex items-center justify-between">
                  <span>CODEFORCES</span>
                  <span className="text-[11px] text-blue-900 bg-blue-100 px-2 py-0.5 rounded font-bold">ROUND TRACK</span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-[#1A1815] my-1">
                  745
                </div>
                <div className="text-sm text-[#1A1815] font-semibold mt-1">
                  23 Problems Solved
                </div>
                <div className="text-xs text-blue-800 font-medium mt-0.5">
                  Highest Rating: 883
                </div>
              </div>

              {/* Overall Codolio Streak */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50/70 to-white border-2 border-orange-200 text-left shadow-xs hover:border-orange-400 hover:shadow-md transition-all">
                <div className="text-xs text-[#FF5C38] font-bold uppercase mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#FF5C38] animate-pulse" />
                    CODOLIO OVERALL
                  </span>
                  <span className="text-[11px] text-orange-900 bg-orange-100 px-2 py-0.5 rounded font-bold">GLOBAL</span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-[#FF5C38] my-1">
                  425 <span className="text-xl">Days</span>
                </div>
                <div className="text-sm text-[#1A1815] font-semibold mt-1">
                  1,561+ Problems · 144 Contests
                </div>
                <div className="text-xs text-orange-800 font-medium mt-0.5">
                  Global Rank: #8,706
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-200/80 flex items-center justify-between text-xs font-editorial-mono text-[#1A1815] font-semibold">
              <span>ALGORITHMIC RIGOR: GRAPHS · DP · TREES · MATH</span>
              <span className="text-[#2563EB] font-bold">100% PRACTICE-PROVEN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Luminous Light Developer Console with Live Typing Animation */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex-1 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FAF9F5] via-white to-[#F0F4FF] text-[#1A1815] border-2 border-purple-300 shadow-xl flex flex-col justify-between font-editorial-mono relative overflow-hidden">
            <div>
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-purple-200 mb-4 text-xs text-[#1A1815]/70">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  <span className="ml-2 font-bold text-[#1A1815]">archana@kit-coimbatore: ~ (competitive-programming)</span>
                </div>
                <span className="text-[11px] text-[#2563EB] bg-blue-100 px-3 py-1 rounded-full border border-blue-200 font-bold">
                  LIGHT CONSOLE
                </span>
              </div>

              {/* Output History */}
              <div className="space-y-2 text-sm sm:text-base max-h-[250px] overflow-y-auto mb-4 pr-2 font-editorial-mono leading-relaxed">
                <div className="text-[#2563EB] text-xs font-bold">
                  Type <span className="text-[#FF5C38]">&apos;help&apos;</span>, <span className="text-[#FF5C38]">&apos;stats&apos;</span>, <span className="text-[#FF5C38]">&apos;platforms&apos;</span>, or <span className="text-[#FF5C38]">&apos;streak&apos;</span>.
                </div>
                {commandHistory.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.startsWith("$")
                        ? "text-[#2563EB] font-bold mt-2"
                        : "text-[#1A1815] pl-3 bg-purple-50/60 py-1 rounded-lg border-l-2 border-[#2563EB]"
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Prompt Input */}
            <form onSubmit={handleCommandSubmit} className="pt-4 border-t border-purple-200 flex items-center gap-3">
              <span className="text-[#2563EB] font-bold text-lg">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'stats', 'streak', 'platforms'..."
                className="flex-1 bg-white border border-purple-200 rounded-xl px-4 py-2.5 text-[#1A1815] font-editorial-mono text-sm placeholder:text-[#1A1815]/40 outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold font-editorial-mono cursor-pointer transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                EXECUTE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
