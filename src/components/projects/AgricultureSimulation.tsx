"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sprout, CloudRain, Thermometer, Wind, CheckCircle2, RefreshCw } from "lucide-react";
import { soundFx } from "../audio/SoundEffects";

const CROPS = [
  {
    nameEn: "Paddy (Rice)",
    nameTa: "நெல் (பாரம்பரியம்)",
    npk: "N: 80 | P: 40 | K: 40",
    waterReq: "High",
    confidence: "96.4%",
    suitability: "Optimal clay/loam profile",
  },
  {
    nameEn: "Pearl Millet (Bajra)",
    nameTa: "கம்பு (சிறுதானியம்)",
    npk: "N: 60 | P: 30 | K: 30",
    waterReq: "Low (Drought Resilient)",
    confidence: "94.8%",
    suitability: "High arid resistance",
  },
  {
    nameEn: "Finger Millet (Ragi)",
    nameTa: "கேழ்வரகு (ராகி)",
    npk: "N: 50 | P: 40 | K: 25",
    waterReq: "Moderate",
    confidence: "95.2%",
    suitability: "Rich calcium retention",
  },
];

export default function AgricultureSimulation() {
  const [lang, setLang] = useState<"ta" | "en">("ta");
  const [activeCropIdx, setActiveCropIdx] = useState(0);
  const [isInferencing, setIsInferencing] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState(68);

  const activeCrop = CROPS[activeCropIdx];

  const handleSimulateNewInput = () => {
    soundFx.playChirp(650, 0.05);
    setIsInferencing(true);
    setSoilMoisture(Math.floor(45 + Math.random() * 40));

    setTimeout(() => {
      setActiveCropIdx((prev) => (prev + 1) % CROPS.length);
      setIsInferencing(false);
      soundFx.playChirp(880, 0.08);
    }, 700);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#0D0D1A] to-[#07070F] border border-teal-500/30 p-5 sm:p-6 overflow-hidden select-none">
      {/* Header with dual-language toggle */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Sprout className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-mono font-bold text-teal-300">
            {lang === "ta" ? "மண் & பயிர் ஆலோசனை HUD" : "SOIL & CROP ADVISORY HUD"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
            <button
              onClick={() => setLang("ta")}
              className={`px-2 py-0.5 rounded ${
                lang === "ta" ? "bg-teal-400 text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded ${
                lang === "en" ? "bg-teal-400 text-black font-bold" : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <button
            onClick={handleSimulateNewInput}
            title="Simulate New Sensor Telemetry"
            className="p-1 rounded-md hover:bg-white/10 text-white/50 hover:text-teal-300 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isInferencing ? "animate-spin text-teal-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Realtime Sensor Telemetry Cards */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 flex flex-col items-center text-center">
          <Thermometer className="w-3.5 h-3.5 text-amber-400 mb-1" />
          <span className="text-[10px] font-mono text-white/50">TEMP</span>
          <span className="text-xs font-mono font-bold text-white">29.4°C</span>
        </div>

        <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 flex flex-col items-center text-center relative overflow-hidden">
          <CloudRain className="w-3.5 h-3.5 text-cyan-400 mb-1" />
          <span className="text-[10px] font-mono text-white/50">MOISTURE</span>
          <span className="text-xs font-mono font-bold text-teal-300">{soilMoisture}%</span>
          {/* Radar weather pulse animation */}
          <div className="absolute inset-0 border border-teal-400/20 rounded-xl animate-radar-pulse pointer-events-none" />
        </div>

        <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 flex flex-col items-center text-center">
          <Wind className="w-3.5 h-3.5 text-violet-400 mb-1" />
          <span className="text-[10px] font-mono text-white/50">SOIL pH</span>
          <span className="text-xs font-mono font-bold text-white">6.8 (Neutral)</span>
        </div>
      </div>

      {/* ML Core Inference State */}
      <div className="relative p-4 rounded-xl bg-[#090914] border border-teal-500/20 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isInferencing ? "bg-amber-400 animate-ping" : "bg-teal-400"}`} />
          <div>
            <div className="text-[11px] font-mono text-white/50">
              {isInferencing ? "EVALUATING SCIKIT RANDOM FOREST..." : "OPTIMAL CROP RECOMMENDATION"}
            </div>
            <div className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-teal-300">
                {lang === "ta" ? activeCrop.nameTa : activeCrop.nameEn}
              </span>
              <span className="text-xs font-normal text-amber-400 font-mono">
                {activeCrop.confidence} match
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] font-mono text-white/40">NPK RATIO</div>
          <div className="text-xs font-mono text-white/80">{activeCrop.npk}</div>
        </div>
      </div>

      {/* Bottom Status strip */}
      <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>OFFLINE READY · SERVICE WORKER PWA</span>
        </div>
        <span className="text-amber-400 font-semibold">~95% ACCURACY</span>
      </div>
    </div>
  );
}
