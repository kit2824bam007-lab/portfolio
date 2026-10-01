"use client";

import React, { useState, useEffect, useRef } from "react";
import { Brain, Layers, Cpu, Trophy, Sparkles, CheckCircle2, ArrowRight, Zap, Award, Flame, Heart, Compass, Laptop, Code2, BookOpen } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundFx } from "../audio/SoundEffects";

const IDENTITY_NODES = [
  {
    id: "ai",
    label: "Artificial Intelligence",
    tag: "AI Systems",
    icon: Brain,
    color: "#06B6D4",
    angle: 0,
    detail: "Neural networks, Autonomous multi-agent coordination & offline ML engines",
    skills: "Python, Scikit-learn, TensorFlow, Multi-agent physics"
  },
  {
    id: "fs",
    label: "Full-Stack Web Systems",
    tag: "Full-Stack",
    icon: Layers,
    color: "#2563EB",
    angle: 90,
    detail: "Production-grade MERN architectures, RESTful APIs, JWT Auth & responsive UI",
    skills: "React, Next.js, Node.js, Express, TailwindCSS, MongoDB"
  },
  {
    id: "ml",
    label: "Machine Learning & Data",
    tag: "ML & Scikit",
    icon: Cpu,
    color: "#7C3AED",
    angle: 180,
    detail: "Offline-first classifiers, predictive agronomy models & spatial sensor processing",
    skills: "Scikit-Learn, Random Forests, Pandas, NumPy, Predictive analytics"
  },
  {
    id: "cp",
    label: "Competitive Programming",
    tag: "CP (1560+)",
    icon: Trophy,
    color: "#F59E0B",
    angle: 270,
    detail: "Mathematical algorithmic rigor across 1,561+ problems and 425 consecutive coding days",
    skills: "C++, DSA, Dynamic Programming, Graph Theory, Greedy Heuristics"
  },
];

const PASSION_CHIPS = [
  { label: "AI & ML Architecture", icon: Brain, color: "text-purple-700 bg-purple-100/80 border-purple-300" },
  { label: "1,561+ DSA Mastery", icon: Trophy, color: "text-amber-700 bg-amber-100/80 border-amber-300" },
  { label: "Full-Stack Web Engineering", icon: Laptop, color: "text-blue-700 bg-blue-100/80 border-blue-300" },
  { label: "Offline Agronomy PWAs", icon: Sparkles, color: "text-emerald-700 bg-emerald-100/80 border-emerald-300" },
  { label: "Tamil Poetry Synthesis", icon: BookOpen, color: "text-rose-700 bg-rose-100/80 border-rose-300" },
  { label: "Autonomous Swarms", icon: Zap, color: "text-cyan-700 bg-cyan-100/80 border-cyan-300" },
  { label: "Code with Heart ♡", icon: Heart, color: "text-pink-700 bg-pink-100/80 border-pink-300" },
];

const HOW_I_BUILD_STEPS = [
  {
    step: "01",
    title: "Algorithmic Intuition",
    desc: "1,561+ problems mastered across LeetCode, CodeChef ★★, and Codeforces. Deep intuition in graphs, dynamic programming, and data structures.",
    tag: "DSA & Rigor",
    icon: Trophy,
    color: "#2563EB",
    bg: "bg-blue-50/70 border-blue-200",
  },
  {
    step: "02",
    title: "Intelligent Machine Learning",
    desc: "Training scikit-learn models, optimizing decision trees for ~95% crop accuracy, and orchestrating multi-key Gemini API rotation.",
    tag: "AI & Inference",
    icon: Brain,
    color: "#7C3AED",
    bg: "bg-purple-50/70 border-purple-200",
  },
  {
    step: "03",
    title: "Production Full-Stack Execution",
    desc: "Engineering responsive Next.js and React frontends backed by Express microservices, JWT authentication, and Docker containerization.",
    tag: "Full-Stack Web",
    icon: Layers,
    color: "#06B6D4",
    bg: "bg-cyan-50/70 border-cyan-200",
  },
  {
    step: "04",
    title: "Real-World Impact & Systems",
    desc: "Deploying offline-first tools for farmers in rural Tamil Nadu and digital-twin disaster response platforms with verifiable logs.",
    tag: "Human Impact",
    icon: Heart,
    color: "#10B981",
    bg: "bg-emerald-50/70 border-emerald-200",
  },
];

export default function AboutSection() {
  const { personal, stats } = PORTFOLIO_DATA;
  const [activeNode, setActiveNode] = useState(IDENTITY_NODES[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current) {
        setRotationAngle((prev) => (prev + 0.35) % 360);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouseX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastMouseX.current;
    lastMouseX.current = e.clientX;
    setRotationAngle((prev) => (prev + delta * 0.7) % 360);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-purple-200/60">
      {/* Section Header with Large Typography */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
        <div>
          <span className="text-sm sm:text-base font-editorial-mono uppercase tracking-[0.25em] text-[#2563EB] font-bold block mb-2">
            02 // BEYOND THE CODE
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial-serif font-black text-[#1A1815] tracking-tight">
            Engineering Rigor & Philosophy.
          </h2>
        </div>

        <div className="text-sm font-editorial-mono text-[#1A1815]/70 font-bold bg-white/90 px-4 py-2 rounded-full border border-purple-200 shadow-xs">
          PRE-FINAL YEAR CSE (AI & ML) · KIT COIMBATORE · GPA: 8.04/10
        </div>
      </div>

      {/* DENSE, CATCHY, RICH BENTO GRID (Zero Empty Space!) */}
      <div className="space-y-10">
        {/* ROW 1: Deep Narrative & Philosophy + Interactive Identity Molecule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Rich Catchy Story & Credentials */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-purple-200/90 shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Highlight Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-950 font-editorial-mono text-xs font-bold border border-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>MEET ARCHANA DEVI M</span>
                <span className="text-purple-600">✦</span>
              </div>

              {/* Bold Pull-Quote */}
              <blockquote className="text-xl sm:text-2xl font-editorial-serif italic text-[#1A1815] leading-snug border-l-4 border-[#2563EB] pl-5 py-2 bg-blue-50/50 rounded-r-2xl">
                &ldquo;Building software isn&apos;t just writing code; it&apos;s architecting living systems where machine learning models and deterministic web engines solve concrete human challenges.&rdquo;
              </blockquote>

              {/* Bio Narrative */}
              <p className="text-base sm:text-lg text-[#1A1815]/90 font-editorial-sans leading-relaxed">
                I am a pre-final-year Computer Science & Engineering (AI & ML) student at KIT Coimbatore with an <strong>8.04/10 GPA</strong>. My engineering foundation fuses mathematical algorithmic rigor (<strong>1,561+ problems solved</strong>, <strong>425 active days</strong>) with production-grade full-stack systems engineering.
              </p>

              <p className="text-base sm:text-lg text-[#1A1815]/90 font-editorial-sans leading-relaxed">
                From building offline-first crop classifiers for rural farmers to architecting coastal multi-agent simulations and low-latency generative studios, I deliver robust software that bridges cutting-edge AI with human utility.
              </p>
            </div>

            {/* Quick Skill Badges Strip */}
            <div className="pt-4 border-t border-purple-100 flex flex-wrap gap-2 text-xs font-editorial-mono font-bold">
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-100 text-blue-950 border border-blue-300">
                ⚡ Full-Stack Web
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-100 text-purple-950 border border-purple-300">
                🧠 AI & Deep Learning
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-cyan-100 text-cyan-950 border border-cyan-300">
                🌾 Offline ML Systems
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 border border-amber-300">
                🏆 1,561+ DSA Solved
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Orbiting Identity Molecule Card */}
          <div className="lg:col-span-5 p-7 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-purple-200/90 shadow-xl flex flex-col justify-between items-center text-center">
            <div className="w-full flex items-center justify-between pb-3 border-b border-purple-100 mb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#2563EB]" />
                <span className="text-xs sm:text-sm font-editorial-mono font-bold text-[#1A1815] uppercase tracking-wider">
                  IDENTITY MOLECULE
                </span>
              </div>
              <span className="text-[11px] font-editorial-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                DRAG OR CLICK ✦
              </span>
            </div>

            {/* Orbiting Rotating Molecule Canvas */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-[#2563EB]/40 flex items-center justify-center cursor-grab active:cursor-grabbing select-none bg-gradient-to-br from-blue-50/40 via-white to-purple-50/40 shadow-inner my-2"
            >
              {/* Outer Orbit Guide Ring */}
              <div className="absolute inset-4 rounded-full border border-purple-200 pointer-events-none" />

              {/* Core Hub */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#1A1815] to-[#2563EB] border-2 border-white flex flex-col items-center justify-center p-2 text-center shadow-lg shadow-blue-500/30">
                <Brain className="w-5 h-5 text-white mb-0.5 animate-pulse" />
                <span className="text-[11px] font-editorial-mono font-bold text-white tracking-wider">ARCHANA</span>
                <span className="text-[8px] font-editorial-mono text-blue-200 uppercase">AI Core</span>
              </div>

              {/* Orbiting Nodes */}
              {IDENTITY_NODES.map((node) => {
                const currentAngle = (node.angle + rotationAngle) * (Math.PI / 180);
                const radius = 100;
                const x = Math.cos(currentAngle) * radius;
                const y = Math.sin(currentAngle) * radius;
                const isCurrent = activeNode.id === node.id;
                const Icon = node.icon;

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      soundFx.playChirp(760, 0.05);
                      setActiveNode(node);
                    }}
                    className={`absolute w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer shadow-md backdrop-blur-md ${
                      isCurrent
                        ? "bg-[#1A1815] border-2 scale-110 shadow-xl"
                        : "bg-white border-2 border-slate-300 hover:scale-105 hover:border-[#2563EB]"
                    }`}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      borderColor: isCurrent ? node.color : undefined,
                      boxShadow: isCurrent ? `0 0 18px ${node.color}70` : undefined,
                    }}
                  >
                    <Icon
                      className="w-4 h-4 mb-0.5"
                      style={{ color: isCurrent ? node.color : "#2563EB" }}
                    />
                    <span
                      className={`text-[8px] font-editorial-mono font-bold text-center leading-none ${
                        isCurrent ? "text-white" : "text-[#1A1815]"
                      }`}
                    >
                      {node.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Domain Detail Card directly visible beneath */}
            <div className="w-full mt-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-left transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-editorial-mono font-bold uppercase tracking-wider text-[#2563EB]">
                  Active Focus
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-editorial-mono font-bold text-white shadow-xs"
                  style={{ backgroundColor: activeNode.color }}
                >
                  {activeNode.tag}
                </span>
              </div>
              <h4 className="text-base font-editorial-serif font-bold text-[#1A1815]">
                {activeNode.label}
              </h4>
              <p className="text-xs font-editorial-sans text-[#1A1815]/80 mt-0.5 leading-relaxed">
                {activeNode.detail}
              </p>
            </div>
          </div>
        </div>

        {/* ROW 2: "How I Architect Intelligent Systems" (4-Step Pipeline Cards) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xl sm:text-2xl font-editorial-serif font-bold text-[#1A1815] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
              <span>How I Build & Architect</span>
            </h3>
            <span className="text-xs font-editorial-mono font-bold text-[#2563EB] uppercase">
              END-TO-END ENGINEERING PIPELINE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_I_BUILD_STEPS.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl bg-white/95 border-2 ${st.bg} shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-3 group`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-editorial-mono font-bold text-[#2563EB]">
                        PHASE {st.step} //
                      </span>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: st.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h4 className="text-lg font-editorial-serif font-bold text-[#1A1815] group-hover:text-[#2563EB] transition-colors">
                      {st.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-editorial-sans text-[#475569] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 text-[11px] font-editorial-mono font-bold text-[#1A1815]">
                    {st.tag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 3: Catchy Stat Cards & Cute Passions Tag Cloud */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 4 Large Digit Stat Cards */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/95 border-2 border-purple-200/90 text-center shadow-sm hover:border-[#2563EB] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-editorial-mono font-black text-[#1A1815]">
                    <span>{s.value}</span>
                    <span className="text-lg text-[#2563EB] ml-0.5">{s.suffix}</span>
                  </div>
                  <div className="text-sm font-bold text-[#1A1815] mt-1.5">{s.label}</div>
                </div>
                <div className="text-xs font-editorial-mono text-[#64748B] mt-2 font-medium">{s.detail}</div>
              </div>
            ))}
          </div>

          {/* Cute Passions & Beyond The Terminal Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white/95 border-2 border-purple-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-editorial-mono font-bold text-[#1A1815] uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Passions & Beyond The Terminal</span>
              </span>
              <span className="text-[11px] font-editorial-mono text-[#2563EB] font-bold">CUTE CORNER ♡</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {PASSION_CHIPS.map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => soundFx.playChirp(820 + idx * 30, 0.04)}
                    className={`px-3 py-1.5 rounded-full text-xs font-editorial-mono font-bold border shadow-2xs flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer ${chip.color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-xs font-editorial-mono text-[#64748B]">
              <span>KALAIGNARKARUNANIDHI INST. OF TECH.</span>
              <span className="text-purple-700 font-bold">CLASS OF 2028</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
