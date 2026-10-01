"use client";

import React, { useState, useEffect } from "react";
import { Shield, Radio, Terminal, AlertTriangle } from "lucide-react";
import CoastGuardTerrainCanvas from "../3d/CoastGuardTerrainCanvas";

const AUDIT_LOGS = [
  "[SEISMIC_NODE_04] Epicenter detected at lat: 11.012°N, lon: 79.845°E",
  "[DIGITAL_TWIN] Surge radius estimated at 4.2 nautical miles",
  "[SWARM_DISPATCH] 16 Autonomous Drone Agents rerouting to Sector Bravo",
  "[RISK_ASSESSMENT] Coastal barrier defense index: 99.2% nominal",
  "[TELEMETRY_LINK] Low latency socket response: 12ms",
];

export default function CoastGuardSimulation() {
  const [logs, setLogs] = useState<string[]>(AUDIT_LOGS.slice(0, 3));

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextIdx = prev.length % AUDIT_LOGS.length;
        const newLogs = [...prev, AUDIT_LOGS[nextIdx]];
        if (newLogs.length > 4) newLogs.shift();
        return newLogs;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#0D0D1A] to-[#07070F] border border-cyan-500/30 p-5 sm:p-6 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-cyan-300">
            COASTGUARD TWIN // AUTONOMOUS SWARM HUD
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-400/30 text-[10px] font-mono text-cyan-300">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>SEISMIC PING ACTIVE</span>
        </div>
      </div>

      {/* 3D Topographic Mesh Canvas */}
      <div className="relative h-[180px] w-full mb-3 rounded-xl overflow-hidden">
        <CoastGuardTerrainCanvas />
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-cyan-300 pointer-events-none">
          TOPOGRAPHY: 36×36 BATHYMETRY
        </div>
      </div>

      {/* Terminal Audit Log Stream */}
      <div className="p-3 rounded-xl bg-black/80 border border-cyan-500/20 font-mono text-[10px] text-white/70 space-y-1.5">
        <div className="flex items-center gap-1 text-cyan-400 text-[11px] font-bold pb-1 border-b border-white/5">
          <Terminal className="w-3 h-3" />
          <span>TELEMETRY & SWARM AUDIT LOG</span>
        </div>
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-1.5 leading-tight">
            <span className="text-teal-400 shrink-0">›</span>
            <span className={log.includes("Epicenter") ? "text-amber-300" : "text-white/80"}>
              {log}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
