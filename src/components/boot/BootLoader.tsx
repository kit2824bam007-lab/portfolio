"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, ChevronRight } from "lucide-react";
import { soundFx } from "../audio/SoundEffects";

interface BootLoaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { text: "> initializing neural core............ OK", delay: 200 },
  { text: "> loading model weights [███████░░░] 84%", delay: 650 },
  { text: "> establishing synapse grid........... OK", delay: 1100 },
  { text: "> compiling GPU shaders & telemetry... OK", delay: 1550 },
  { text: "> rendering: ARCHANA.EXE \"AI systems online.\"", delay: 1950 },
];

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(12);
  const [logoAssembled, setLogoAssembled] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    soundFx.playBootBeep(520);

    const timers: NodeJS.Timeout[] = [];

    BOOT_LOGS.forEach((log, index) => {
      const timer = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log.text]);
        setProgress(Math.min(100, Math.floor(((index + 1) / BOOT_LOGS.length) * 100)));
        soundFx.playBootBeep(440 + index * 60);
      }, log.delay);
      timers.push(timer);
    });

    const logoTimer = setTimeout(() => {
      setLogoAssembled(true);
    }, 1800);
    timers.push(logoTimer);

    const exitTimer = setTimeout(() => {
      handleSkip();
    }, 2850);
    timers.push(exitTimer);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    soundFx.playChirp(880, 0.08);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-[#07070F] text-[#EDEDF7] flex flex-col items-center justify-center p-6 select-none font-mono"
        >
          <div className="absolute inset-0 bg-grid-neural opacity-30 pointer-events-none" />
          <div className="absolute w-96 h-96 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none animate-pulse-glow" />

          <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: logoAssembled ? 1 : 0.85,
                opacity: 1,
              }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="relative mb-8 w-20 h-20 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-2xl border border-teal-400/40 bg-teal-950/20 backdrop-blur-md glow-teal-sm rotate-45 animate-pulse" />
              <div className="relative z-10 text-teal-300 flex flex-col items-center justify-center">
                <Cpu className="w-8 h-8 text-teal-300 drop-shadow-[0_0_10px_rgba(95,240,210,0.8)]" />
                <span className="text-[10px] tracking-widest text-violet-300 font-bold mt-1">A.EXE</span>
              </div>
            </motion.div>

            <div className="w-full bg-[#0D0D1A]/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/10 text-xs text-white/50">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-teal-400" />
                  <span className="tracking-wide">NEURAL AURORA ENGINE // BOOT SEQUENCE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span className="text-[11px] text-teal-300 font-medium">SYS_V2.6</span>
                </div>
              </div>

              <div className="p-5 text-xs sm:text-sm space-y-2 min-h-[140px] text-white/80 font-mono">
                {visibleLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span
                      className={
                        log.includes("ARCHANA.EXE")
                          ? "text-teal-300 font-semibold text-shadow"
                          : log.includes("weights")
                          ? "text-violet-300"
                          : "text-white/80"
                      }
                    >
                      {log}
                    </span>
                  </motion.div>
                ))}

                {visibleLogs.length < BOOT_LOGS.length && (
                  <div className="flex items-center gap-1 text-teal-400">
                    <span className="animate-pulse">_</span>
                  </div>
                )}
              </div>

              <div className="px-5 pb-4">
                <div className="flex items-center justify-between text-[11px] text-white/40 mb-1.5 font-mono">
                  <span>CORE INTEGRATION</span>
                  <span className="text-teal-300">{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-400 via-violet-500 to-fuchsia-500"
                    initial={{ width: "10%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between w-full px-2">
              <button
                onClick={handleSkip}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-teal-500/10 border border-white/10 hover:border-teal-400/40 text-xs text-white/70 hover:text-teal-300 transition-all cursor-pointer"
              >
                <span>Skip Boot</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-white/90 group-hover:bg-teal-400/20">
                  ESC
                </span>
              </button>

              <span className="text-[11px] text-white/40 tracking-wider">
                ARCHANA DEVI M · CSE(AI&ML)
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
