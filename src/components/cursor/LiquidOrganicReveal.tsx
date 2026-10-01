"use client";

import React, { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  seed: number;
}

interface LiquidOrganicRevealProps {
  children: React.ReactNode;
  coverContent?: React.ReactNode;
  revealSize?: number;
  trailLength?: number;
  irregularity?: number;
  className?: string;
  defaultCoverColor?: string;
  revealAlwaysOnTouch?: boolean;
}

export default function LiquidOrganicReveal({
  children,
  coverContent,
  revealSize = 130,
  trailLength = 12,
  irregularity = 0.22,
  className = "",
  defaultCoverColor = "rgba(7, 7, 15, 0.95)",
  revealAlwaysOnTouch = true,
}: LiquidOrganicRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [tapped, setTapped] = useState(false);

  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Intersection Observer to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Mouse handlers on container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y, active: true };

      // Push trail point
      trailRef.current.unshift({
        x,
        y,
        radius: revealSize * (0.85 + Math.random() * 0.3),
        alpha: 1.0,
        seed: Math.random() * 10,
      });

      if (trailRef.current.length > trailLength) {
        trailRef.current.pop();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.04;

      if (isVisibleRef.current && !document.hidden) {
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        ctx.clearRect(0, 0, width, height);

        // Fill with dark obsidian cover
        ctx.fillStyle = defaultCoverColor;
        ctx.fillRect(0, 0, width, height);

        // Cut out liquid organic aperture
        ctx.globalCompositeOperation = "destination-out";

        // Draw fading trail points
        for (let i = trailRef.current.length - 1; i >= 0; i--) {
          const pt = trailRef.current[i];
          pt.alpha *= 0.92; // Decay
          pt.radius *= 0.985;

          if (pt.alpha < 0.02) {
            trailRef.current.splice(i, 1);
            continue;
          }

          drawOrganicBlob(ctx, pt.x, pt.y, pt.radius, pt.alpha, time + pt.seed, irregularity);
        }

        // Draw current cursor blob if active
        if (mouseRef.current.active) {
          drawOrganicBlob(
            ctx,
            mouseRef.current.x,
            mouseRef.current.y,
            revealSize,
            1.0,
            time,
            irregularity
          );
        }

        // Reset composite operation
        ctx.globalCompositeOperation = "source-over";
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, [revealSize, trailLength, irregularity, defaultCoverColor]);

  // Organic blob drawing helper
  const drawOrganicBlob = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    baseRadius: number,
    alpha: number,
    t: number,
    irreg: number
  ) => {
    ctx.save();
    ctx.beginPath();
    const segments = 24;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      // Multi-frequency harmonic wave for evolving fluid contour
      const noise =
        Math.sin(angle * 3 + t * 2) * 0.4 +
        Math.sin(angle * 5 - t * 1.5) * 0.35 +
        Math.cos(angle * 2 + t * 0.8) * 0.25;

      const r = baseRadius * (1 + irreg * noise);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();

    // Soft feathered edge with radial gradient
    const gradient = ctx.createRadialGradient(cx, cy, baseRadius * 0.2, cx, cy, baseRadius * 1.25);
    gradient.addColorStop(0, `rgba(0, 0, 0, ${alpha})`);
    gradient.addColorStop(0.7, `rgba(0, 0, 0, ${alpha * 0.85})`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
  };

  // Touch fallback
  if (isTouchDevice && revealAlwaysOnTouch) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={() => setTapped(!tapped)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Underlying Living World / Visual Content */}
      <div className="relative z-0 w-full h-full">{children}</div>

      {/* Organic Liquid Mask Canvas (Cuts aperture directly to underlying world) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 w-full h-full transition-opacity duration-500"
        style={{ opacity: tapped ? 0 : 1 }}
      />

      {/* Optional decorative cover layer text/elements that fade away on tap */}
      {coverContent && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{ opacity: tapped ? 0 : 1 }}
        >
          {coverContent}
        </div>
      )}
    </div>
  );
}
