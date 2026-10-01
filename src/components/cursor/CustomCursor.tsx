"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringWipe, setIsHoveringWipe] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const onWipe = Boolean(target.closest(".cursor-crosshair") || target.closest("canvas"));
      setIsHoveringWipe(onWipe);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary Ink Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: isHoveringWipe ? "#9333EA" : "#581C87",
          width: isHoveringWipe ? 7 : 5,
          height: isHoveringWipe ? 7 : 5,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Trailing Brush Halo / Reticle on Wipe Layer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] rounded-full border shadow-xs"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: isHoveringWipe ? "rgba(147, 51, 234, 0.6)" : "rgba(107, 33, 168, 0.25)",
          backgroundColor: isHoveringWipe ? "rgba(192, 132, 252, 0.15)" : "transparent",
        }}
        animate={{
          width: isHoveringWipe ? 48 : 24,
          height: isHoveringWipe ? 48 : 24,
          borderStyle: isHoveringWipe ? "dashed" : "solid",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
}
