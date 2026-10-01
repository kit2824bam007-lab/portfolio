"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface DryBrushRevealProps {
  children: React.ReactNode; // Underneath revealed Dark Tech World
  coverContent: React.ReactNode; // Light Editorial Paper Layer
  brushRadius?: number;
  decayRate?: number; // 0 = permanent until reset, >0 = fades back like drying ink
  className?: string;
  paperColor?: string;
}

interface BrushPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  seed: number;
}

export default function DryBrushReveal({
  children,
  coverContent,
  brushRadius = 110,
  decayRate = 0.003, // subtle ink dry healing
  className = "",
  paperColor = "#F5F1EA",
}: DryBrushRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const prevMouse = useRef<{ x: number; y: number } | null>(null);
  const mouseTrail = useRef<BrushPoint[]>([]);
  const isVisibleRef = useRef<boolean>(true);
  const animFrameId = useRef<number | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);
  }, []);

  // Setup Canvas & Bristle Stamp
  useEffect(() => {
    if (isReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);

      // Re-fill paper
      ctx.fillStyle = paperColor;
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Procedural Dry-Brush Stamp with Bristle Marks & Micro-Texture
    const drawDryBrushStroke = (
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      radius: number,
      alpha = 1.0
    ) => {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";

      const dx = toX - fromX;
      const dy = toY - fromY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(dist / 5));
      const angle = Math.atan2(dy, dx);
      const normalAngle = angle + Math.PI / 2;

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const cx = fromX + dx * t;
        const cy = fromY + dy * t;

        // 1. Central jagged gouge with ragged edges
        ctx.beginPath();
        const numPoints = 16;
        for (let i = 0; i <= numPoints; i++) {
          const a = (i / numPoints) * Math.PI * 2;
          // Organic boundary jitter
          const jitter =
            Math.sin(a * 4 + s * 0.5) * 0.25 +
            Math.sin(a * 8 - s * 0.3) * 0.15 +
            (Math.random() - 0.5) * 0.2;
          const r = radius * 0.65 * (1 + jitter);
          const px = cx + Math.cos(a) * r;
          const py = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.9})`;
        ctx.fill();

        // 2. Individual dry bristles tearing the paper along normal
        const bristleCount = 26;
        for (let b = 0; b < bristleCount; b++) {
          const spreadRatio = (b / (bristleCount - 1) - 0.5) * 2; // -1 to 1
          const bristleDist = spreadRatio * (radius * 0.95);

          // Add dry drag streaks
          const bx = cx + Math.cos(normalAngle) * bristleDist + (Math.random() - 0.5) * 6;
          const by = cy + Math.sin(normalAngle) * bristleDist + (Math.random() - 0.5) * 6;

          const bristleLength = 8 + Math.random() * 16;
          const bristleThickness = 1.2 + Math.random() * 2.5;

          ctx.beginPath();
          ctx.lineWidth = bristleThickness;
          ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * (0.6 + Math.random() * 0.4)})`;
          ctx.lineCap = "round";

          ctx.moveTo(bx - Math.cos(angle) * (bristleLength / 2), by - Math.sin(angle) * (bristleLength / 2));
          ctx.lineTo(bx + Math.cos(angle) * (bristleLength / 2), by + Math.sin(angle) * (bristleLength / 2));
          ctx.stroke();

          // 3. Paint splatter / dry fiber speckles
          if (Math.random() > 0.65) {
            const splatterDist = bristleDist * (1.1 + Math.random() * 0.3);
            const sx = cx + Math.cos(normalAngle) * splatterDist;
            const sy = cy + Math.sin(normalAngle) * splatterDist;
            ctx.beginPath();
            ctx.arc(sx, sy, 0.8 + Math.random() * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha * 0.85})`;
            ctx.fill();
          }
        }
      }

      ctx.restore();
    };

    // Mouse Movement Handler
    const handleMove = (clientX: number, clientY: number) => {
      setHasInteracted(true);
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (!prevMouse.current) {
        prevMouse.current = { x, y };
      }

      drawDryBrushStroke(
        prevMouse.current.x,
        prevMouse.current.y,
        x,
        y,
        brushRadius,
        1.0
      );

      prevMouse.current = { x, y };
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      prevMouse.current = null;
    };

    // Touch Event Handler for Mobile/Tablets
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    };

    const onTouchEnd = () => {
      prevMouse.current = null;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    // Ink drying animation loop (slow decay if decayRate > 0)
    let lastTime = performance.now();
    const loop = (now: number) => {
      animFrameId.current = requestAnimationFrame(loop);
      if (!isVisibleRef.current || document.hidden) return;

      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (decayRate > 0) {
        const rect = container.getBoundingClientRect();
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(245, 241, 234, ${decayRate * 60 * dt})`;
        ctx.fillRect(0, 0, rect.width, rect.height);
        ctx.restore();
      }
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      observer.disconnect();
    };
  }, [brushRadius, decayRate, paperColor, isReducedMotion]);

  const handleResetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = container.getBoundingClientRect();
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = paperColor;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.restore();
    prevMouse.current = null;
    setHasInteracted(false);
  }, [paperColor]);

  // Reduced motion: Split view fallback
  if (isReducedMotion) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="bg-[#FAF7F1] p-6 rounded-2xl border border-black/10">
            {coverContent}
          </div>
          <div className="bg-[#0A0E1A] p-6 rounded-2xl border border-blue-500/20 text-[#EDEDF7]">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none cursor-crosshair ${className}`}
    >
      {/* LAYER 2: Revealed Underneath Dark Tech World */}
      <div className="absolute inset-0 z-0 bg-[#0A0E1A] text-[#EDEDF7]">
        {children}
      </div>

      {/* Canvas Paper Mask that physically gets scratched/wiped away */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* LAYER 1: Cover Editorial Content (stays clickable, passes pointer events to canvas through transparent areas) */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        <div className="w-full h-full [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_select]:pointer-events-auto [&_textarea]:pointer-events-auto">
          {coverContent}
        </div>
      </div>

      {/* Reset Paper Button when user wipes */}
      {hasInteracted && (
        <button
          onClick={handleResetCanvas}
          className="absolute bottom-4 right-4 z-30 px-3 py-1.5 rounded-full bg-[#1A1815]/85 hover:bg-[#1A1815] text-[#FAF7F1] text-[11px] font-editorial-mono tracking-wider shadow-md backdrop-blur-md transition-all cursor-pointer pointer-events-auto"
        >
          Clean Paper ↺
        </button>
      )}
    </div>
  );
}
