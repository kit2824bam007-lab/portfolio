"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import CoverEditorialLayer from "./CoverEditorialLayer";
import TechDashboardLayer from "./TechDashboardLayer";
import InteractiveButterflies from "@/components/ui/InteractiveButterflies";
import { soundFx } from "../audio/SoundEffects";
import { Sparkles, Eye, Columns, Undo, Paintbrush, Heart } from "lucide-react";

interface DryBrushWipeHeroProps {
  onExploreWork: () => void;
  onOpenResume: () => void;
}

interface StrokePoint {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  size: number;
  angle: number;
  timestamp: number;
  opacity: number;
  seed: number;
}

export default function DryBrushWipeHero({ onExploreWork, onOpenResume }: DryBrushWipeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskImageRef = useRef<SVGImageElement | null>(null);

  // Interaction modes: 'wipe' | 'split' | 'revealed'
  const [viewMode, setViewMode] = useState<"wipe" | "split" | "revealed">("wipe");
  const [isWiping, setIsWiping] = useState(false);
  const [maskDataUrl, setMaskDataUrl] = useState<string>("");
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  const strokesRef = useRef<StrokePoint[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveTimeRef = useRef<number>(Date.now());
  const animFrameRef = useRef<number | null>(null);
  const isOffscreenRef = useRef<boolean>(false);

  // Setup offscreen mask canvas
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 320;
    maskCanvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setMaskDataUrl(canvas.toDataURL("image/png"));
    }
  }, []);

  // IntersectionObserver to pause animation when hero is off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isOffscreenRef.current = !entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Dry-brush bristle stamper function
  const drawDryBrushStamp = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      prevX: number,
      prevY: number,
      size: number,
      opacity: number,
      seed: number,
      time: number
    ) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";

      const dx = x - prevX;
      const dy = y - prevY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(dist / 4));

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const curX = prevX + dx * t;
        const curY = prevY + dy * t;

        // 1. Organic Ragged Torn-Paper Polygon
        ctx.beginPath();
        const numVertices = 14;
        const baseRadius = size * 0.55;

        for (let i = 0; i < numVertices; i++) {
          const a = (i / numVertices) * Math.PI * 2;
          // Organic jitter per vertex
          const noise =
            Math.sin(a * 4 + seed + time * 0.003) * 0.28 +
            Math.cos(a * 7 - seed) * 0.22;
          const r = baseRadius * (1 + noise);
          const px = curX + Math.cos(a) * r;
          const py = curY + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // 2. Dry-Brush Hair Bristles (Multi-striation bristle texture)
        const numBristles = 22;
        const perpX = -Math.sin(angle);
        const perpY = Math.cos(angle);

        for (let b = 0; b < numBristles; b++) {
          const bOffset = ((b - numBristles / 2) / numBristles) * size * 0.9;
          const bristleNoise = Math.sin(b * 3.7 + seed) * (size * 0.2);
          const startX = curX + perpX * bOffset;
          const startY = curY + perpY * bOffset;
          const strokeLen = size * 0.5 + bristleNoise;

          ctx.lineWidth = Math.random() * 2.2 + 1.2;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(
            startX + Math.cos(angle) * strokeLen,
            startY + Math.sin(angle) * strokeLen
          );
          ctx.stroke();
        }

        // 3. Fine Ink Drips & Splatters
        const numDrips = 4;
        for (let d = 0; d < numDrips; d++) {
          const dripAngle = angle + (Math.random() - 0.5) * 1.2;
          const dripDist = size * (0.6 + Math.random() * 0.7);
          const dripX = curX + Math.cos(dripAngle) * dripDist;
          const dripY = curY + Math.sin(dripAngle) * dripDist;
          const dripRadius = Math.random() * 2.5 + 0.8;

          ctx.beginPath();
          ctx.arc(dripX, dripY, dripRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    },
    []
  );

  // Render loop: dynamic morphing & slow elegant healing after ~3.5s idle
  useEffect(() => {
    let animId: number;

    const render = () => {
      if (isOffscreenRef.current || viewMode !== "wipe") {
        animId = requestAnimationFrame(render);
        return;
      }

      const canvas = maskCanvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animId = requestAnimationFrame(render);
        return;
      }

      const now = Date.now();
      const idleTime = now - lastMoveTimeRef.current;

      // Start slow elegant healing after 3500ms idle
      const isHealing = idleTime > 3500 && strokesRef.current.length > 0;
      if (isHealing) {
        strokesRef.current.forEach((stroke) => {
          stroke.opacity -= 0.015; // Slow smooth heal
        });
        strokesRef.current = strokesRef.current.filter((s) => s.opacity > 0.01);
      }

      // Re-render mask canvas
      ctx.fillStyle = "white"; // White = Top cover visible
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (strokesRef.current.length > 0) {
        strokesRef.current.forEach((stroke) => {
          drawDryBrushStamp(
            ctx,
            stroke.x,
            stroke.y,
            stroke.prevX,
            stroke.prevY,
            stroke.size,
            stroke.opacity,
            stroke.seed,
            now
          );
        });

        // Update the mask SVG image href
        const dataUrl = canvas.toDataURL("image/png");
        setMaskDataUrl(dataUrl);
        if (maskImageRef.current) {
          maskImageRef.current.setAttribute("href", dataUrl);
        }
      } else if (isHealing) {
        const dataUrl = canvas.toDataURL("image/png");
        setMaskDataUrl(dataUrl);
        if (maskImageRef.current) {
          maskImageRef.current.setAttribute("href", dataUrl);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [drawDryBrushStamp, viewMode]);

  // Pointer move handler (mouse or touch drag)
  const addBrushPoint = (clientX: number, clientY: number) => {
    if (!containerRef.current || !maskCanvasRef.current || viewMode !== "wipe") return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawX = clientX - rect.left;
    const rawY = clientY - rect.top;

    if (rawX < 0 || rawX > rect.width || rawY < 0 || rawY > rect.height) {
      lastPosRef.current = null;
      return;
    }

    setCursorPos({ x: rawX, y: rawY });
    setIsWiping(true);
    lastMoveTimeRef.current = Date.now();

    // Map to 480x320 internal mask canvas resolution
    const maskX = (rawX / rect.width) * maskCanvasRef.current.width;
    const maskY = (rawY / rect.height) * maskCanvasRef.current.height;

    const prevMaskX = lastPosRef.current ? lastPosRef.current.x : maskX;
    const prevMaskY = lastPosRef.current ? lastPosRef.current.y : maskY;

    // Brush stroke size: 45-65px (rough dry-brush width)
    const brushSize = 58;

    strokesRef.current.push({
      x: maskX,
      y: maskY,
      prevX: prevMaskX,
      prevY: prevMaskY,
      size: brushSize,
      angle: Math.atan2(maskY - prevMaskY, maskX - prevMaskX),
      timestamp: Date.now(),
      opacity: 1,
      seed: Math.random() * 100,
    });

    // Cap maximum active strokes for peak performance
    if (strokesRef.current.length > 180) {
      strokesRef.current.shift();
    }

    lastPosRef.current = { x: maskX, y: maskY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    addBrushPoint(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      addBrushPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseLeave = () => {
    lastPosRef.current = null;
    setIsWiping(false);
  };

  const handleResetWipe = () => {
    soundFx.playChirp(700, 0.05);
    strokesRef.current = [];
    if (maskCanvasRef.current) {
      const ctx = maskCanvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, maskCanvasRef.current.width, maskCanvasRef.current.height);
        const dataUrl = maskCanvasRef.current.toDataURL("image/png");
        setMaskDataUrl(dataUrl);
        if (maskImageRef.current) {
          maskImageRef.current.setAttribute("href", dataUrl);
        }
      }
    }
  };

  const handleScrollToAbout = () => {
    soundFx.playChirp(720, 0.05);
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] flex flex-col justify-center px-4 sm:px-8 lg:px-12 py-16 sm:py-24 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Cute Animated Floating Butterflies */}
      <InteractiveButterflies />

      {/* Top Floating Control Bar: View Modes & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 z-30">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C38] animate-ping" />
          <span className="text-xs sm:text-sm font-editorial-mono font-bold tracking-wider text-[#1A1815] uppercase">
            SIGNATURE INTERACTION // DRY-BRUSH WIPE
          </span>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#1A1815]/15 shadow-sm text-xs font-editorial-mono">
          <button
            onClick={() => {
              soundFx.playChirp(760, 0.04);
              setViewMode("wipe");
            }}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "wipe"
                ? "bg-[#1A1815] text-white shadow-xs"
                : "text-[#1A1815]/70 hover:text-[#1A1815]"
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5" />
            <span>Brush Wipe</span>
          </button>

          <button
            onClick={() => {
              soundFx.playChirp(800, 0.04);
              setViewMode("split");
            }}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "split"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-[#1A1815]/70 hover:text-[#2563EB]"
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>

          <button
            onClick={() => {
              soundFx.playChirp(840, 0.04);
              setViewMode(viewMode === "revealed" ? "wipe" : "revealed");
            }}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === "revealed"
                ? "bg-[#06B6D4] text-white shadow-xs"
                : "text-[#1A1815]/70 hover:text-[#06B6D4]"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{viewMode === "revealed" ? "Hide Deck" : "Show Deck"}</span>
          </button>

          {strokesRef.current.length > 0 && viewMode === "wipe" && (
            <button
              onClick={handleResetWipe}
              title="Reset Cover Wipe"
              className="p-1 rounded-full hover:bg-slate-100 text-[#1A1815]/60 hover:text-[#1A1815] cursor-pointer"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* SVG Mask Definition (Hardware Accelerated Masking) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <mask id="dryBrushHeroMask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            {/* Base White = Cover visible */}
            <rect width="100%" height="100%" fill="white" />
            {/* Mask canvas image: black brush strokes subtract and expose bottom layer */}
            {maskDataUrl && (
              <image
                ref={maskImageRef}
                href={maskDataUrl}
                width="100%"
                height="100%"
                preserveAspectRatio="none"
              />
            )}
          </mask>
        </defs>
      </svg>

      {/* ============================================================== */}
      {/* SCENARIO A: SPLIT VIEW (Prefers-reduced-motion / Split Mode)   */}
      {/* ============================================================== */}
      {viewMode === "split" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full z-10 animate-fadeIn">
          {/* Left: Cover */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-[#1A1815]/10">
            <CoverEditorialLayer
              onExploreWork={onExploreWork}
              onOpenAbout={handleScrollToAbout}
              onOpenResume={onOpenResume}
            />
          </div>

          {/* Right: Dashboard */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-200">
            <TechDashboardLayer
              onExploreWork={onExploreWork}
              onOpenResume={onOpenResume}
            />
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* SCENARIO B: SIGNATURE TWO-LAYER DRY-BRUSH WIPE HERO           */
        /* ============================================================== */
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl cursor-crosshair min-h-[680px]"
        >
          {/* LAYER 1 (BOTTOM): Luminous Tech Dashboard */}
          <div className="absolute inset-0 z-0">
            <TechDashboardLayer
              onExploreWork={onExploreWork}
              onOpenResume={onOpenResume}
            />
          </div>

          {/* LAYER 2 (TOP): Editorial Portrait Cover (Torn open by dry-brush mask) */}
          <div
            className="relative z-10 w-full h-full transition-opacity duration-300"
            style={{
              opacity: viewMode === "revealed" ? 0 : 1,
              pointerEvents: viewMode === "revealed" ? "none" : "auto",
              maskImage: viewMode === "wipe" && strokesRef.current.length > 0 ? "url(#dryBrushHeroMask)" : undefined,
              WebkitMaskImage: viewMode === "wipe" && strokesRef.current.length > 0 ? "url(#dryBrushHeroMask)" : undefined,
            }}
          >
            <CoverEditorialLayer
              onExploreWork={onExploreWork}
              onOpenAbout={handleScrollToAbout}
              onOpenResume={onOpenResume}
            />
          </div>

          {/* DYNAMIC DRY-BRUSH RETICLE AURA (Follows cursor over the canvas with cute sparkles) */}
          {isWiping && viewMode === "wipe" && cursorPos.x > 0 && (
            <div
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-75 ease-out"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
              }}
            >
              {/* Cute Ragged Bristle Reticle Ring with Pastel Halo */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#2563EB] animate-spin" style={{ animationDuration: "14s" }} />
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 blur-md animate-pulse" />
              <span className="absolute -top-3.5 -right-3 text-sm animate-bounce">✨</span>
              <span className="absolute -bottom-3 -right-2 text-xs animate-spin" style={{ animationDuration: "6s" }}>✦</span>
              <span className="absolute -bottom-2 -left-2 text-[10px] font-editorial-mono font-bold bg-[#1A1815] text-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <span>🖌️</span>
                <span>WIPING</span>
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
