"use client";

import React, { useEffect, useRef } from "react";
import { Terminal, Cpu, Database, Activity, GitBranch, Sparkles, ExternalLink, ArrowUpRight, Award, Zap, Code2, Globe } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GithubIcon, LeetCodeIcon, CodeChefIcon, LinkedinIcon } from "@/components/ui/SocialIcons";

interface TechDashboardLayerProps {
  onExploreWork?: () => void;
  onOpenResume?: () => void;
}

export default function TechDashboardLayer({ onExploreWork, onOpenResume }: TechDashboardLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { personal, stats, projects } = PORTFOLIO_DATA;

  // Mini live neural network background animation on the dashboard
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Neural nodes
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.5 + 1.5,
      color: Math.random() > 0.5 ? "#2563EB" : "#06B6D4",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and move nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[680px] bg-gradient-to-br from-[#EEF4FF] via-[#F4F8FE] to-[#EAF2FF] p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden border-2 border-blue-300/80 shadow-2xl rounded-3xl select-none">
      {/* Live Cyber-Grid Blueprint Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Background Neural Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ambient Luminous Color Spots */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-cyan-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* DASHBOARD CONTENT (Z-10) */}
      <div className="relative z-10 w-full space-y-8">
        {/* Top Header HUD Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-blue-200/80">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-sm font-editorial-mono font-bold tracking-wider text-[#0F172A] uppercase">
              ENGINEERING HUD // ARCHANA-DEVI-M
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-editorial-mono font-bold bg-blue-100 text-blue-900 border border-blue-300">
              LIGHT CYBER DECK
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-editorial-mono text-[#0F172A]/80 font-bold">
            <span className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              INFERENCE LATENCY: 12ms
            </span>
            <span className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-2xs">
              <Activity className="w-3.5 h-3.5 text-[#2563EB]" />
              RUNTIME: READY
            </span>
          </div>
        </div>

        {/* Floating Glass Tile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Tile 1: Live Core Tech Stack */}
          <div className="md:col-span-6 lg:col-span-5 p-6 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-blue-200/90 shadow-lg shadow-blue-500/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#2563EB]" />
                <h4 className="text-base font-editorial-mono font-bold text-[#0F172A] uppercase tracking-wide">
                  Core Technologies
                </h4>
              </div>
              <span className="text-xs font-editorial-mono text-[#2563EB] font-bold">PRODUCTION</span>
            </div>

            <p className="text-xs font-editorial-sans text-[#334155]">
              Real-world full-stack architectures & machine learning inference:
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { name: "TypeScript", color: "bg-blue-50 text-blue-800 border-blue-300" },
                { name: "JavaScript", color: "bg-yellow-50 text-yellow-800 border-yellow-300" },
                { name: "React.js", color: "bg-cyan-50 text-cyan-800 border-cyan-300" },
                { name: "Next.js", color: "bg-indigo-50 text-indigo-800 border-indigo-300" },
                { name: "Python", color: "bg-emerald-50 text-emerald-800 border-emerald-300" },
                { name: "C++", color: "bg-purple-50 text-purple-800 border-purple-300" },
                { name: "Node.js", color: "bg-green-50 text-green-800 border-green-300" },
                { name: "Express.js", color: "bg-slate-50 text-slate-800 border-slate-300" },
                { name: "scikit-learn", color: "bg-orange-50 text-orange-800 border-orange-300" },
                { name: "Docker", color: "bg-sky-50 text-sky-800 border-sky-300" },
              ].map((tech, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-xl text-xs font-editorial-mono font-bold border shadow-2xs ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Tile 2: Live Stat Chips */}
          <div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-blue-200/90 shadow-md flex flex-col justify-between">
              <span className="text-xs font-editorial-mono text-[#2563EB] font-bold">DSA SOLVED</span>
              <div className="text-3xl sm:text-4xl font-editorial-mono font-bold text-[#0F172A] my-1">
                1,561+
              </div>
              <span className="text-[11px] font-editorial-mono text-[#475569]">LeetCode · CodeChef · CF</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-blue-200/90 shadow-md flex flex-col justify-between">
              <span className="text-xs font-editorial-mono text-[#06B6D4] font-bold">ACTIVE DAYS</span>
              <div className="text-3xl sm:text-4xl font-editorial-mono font-bold text-[#06B6D4] my-1">
                425
              </div>
              <span className="text-[11px] font-editorial-mono text-[#475569]">Codolio Global #8706</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-blue-200/90 shadow-md flex flex-col justify-between col-span-2 sm:col-span-1">
              <span className="text-xs font-editorial-mono text-[#FF5C38] font-bold">GLOBAL CONTESTS</span>
              <div className="text-3xl sm:text-4xl font-editorial-mono font-bold text-[#FF5C38] my-1">
                144
              </div>
              <span className="text-[11px] font-editorial-mono text-[#475569]">Competitive Rounds</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-blue-200/90 shadow-md flex flex-col justify-between">
              <span className="text-xs font-editorial-mono text-[#10B981] font-bold">ACADEMIC GPA</span>
              <div className="text-3xl sm:text-4xl font-editorial-mono font-bold text-[#10B981] my-1">
                8.04
              </div>
              <span className="text-[11px] font-editorial-mono text-[#475569]">KIT Autonomous / 10.0</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-blue-200/90 shadow-md flex flex-col justify-between col-span-2 sm:col-span-2">
              <span className="text-xs font-editorial-mono text-[#8B5CF6] font-bold">ENGINEERING PROJECTS</span>
              <div className="text-3xl sm:text-4xl font-editorial-mono font-bold text-[#0F172A] my-1">
                10+ <span className="text-base text-[#8B5CF6] font-normal">End-to-End Systems</span>
              </div>
              <span className="text-[11px] font-editorial-mono text-[#475569]">AI Studios · Offline PWAs · Digital Twins</span>
            </div>
          </div>
        </div>

        {/* Featured Projects Thumbnail Strip */}
        <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-blue-200/90 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-editorial-mono font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>Uncovered Architecture Systems</span>
            </h4>
            <span className="text-xs font-editorial-mono text-[#2563EB] font-bold">
              4 VERIFIED CASE STUDIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 hover:border-blue-400 hover:bg-white transition-all text-left group"
              >
                <div className="flex items-center justify-between text-[11px] font-editorial-mono font-bold text-[#2563EB] mb-1">
                  <span>{proj.badge || "PROJECT"}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
                <div className="text-sm font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                  {proj.title}
                </div>
                <div className="text-xs text-[#475569] truncate mt-0.5">
                  {proj.stack.slice(0, 3).join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Social Strip & Quick Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-blue-200/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-editorial-mono font-bold text-[#0F172A]/70 uppercase">
              NETWORK NODES:
            </span>
            <div className="flex items-center gap-2">
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white border border-blue-200 text-[#0F172A] hover:text-[#2563EB] hover:scale-110 shadow-2xs transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white border border-blue-200 text-[#0F172A] hover:text-[#FFA116] hover:scale-110 shadow-2xs transition-all"
                title="LeetCode"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.socials.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white border border-blue-200 text-[#0F172A] hover:text-[#A855F7] hover:scale-110 shadow-2xs transition-all"
                title="CodeChef"
              >
                <CodeChefIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white border border-blue-200 text-[#0F172A] hover:text-[#2563EB] hover:scale-110 shadow-2xs transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreWork}
              className="px-6 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-editorial-mono text-xs font-bold tracking-wider shadow-md shadow-blue-500/30 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>INSPECT ARCHITECTURE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
