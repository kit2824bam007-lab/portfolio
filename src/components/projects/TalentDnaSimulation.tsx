"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Network, Zap, TrendingUp, Clock, Sparkles } from "lucide-react";
import { soundFx } from "../audio/SoundEffects";

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  role: string;
}

const INITIAL_NODES: GraphNode[] = [
  { id: "emp", label: "Employee", x: 45, y: 110, color: "#8B5CF6", role: "Backend Eng." },
  { id: "skills", label: "Current Skills", x: 125, y: 55, color: "#5FF0D2", role: "Python, SQL, APIs" },
  { id: "gap", label: "Identified Gap", x: 135, y: 165, color: "#F59E0B", role: "PyTorch & Vector DBs" },
  { id: "bridge", label: "Skill Bridge", x: 225, y: 80, color: "#C026D3", role: "Targeted Micro-Paths" },
  { id: "rec", label: "ML Engineer", x: 300, y: 135, color: "#10B981", role: "94% Match Target" },
];

const EDGES = [
  { from: "emp", to: "skills" },
  { from: "emp", to: "gap" },
  { from: "skills", to: "bridge" },
  { from: "gap", to: "bridge" },
  { from: "bridge", to: "rec" },
];

export default function TalentDnaSimulation() {
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_NODES);
  const [activeNode, setActiveNode] = useState<GraphNode | null>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  const handleDrag = (id: string, info: { point: { x: number; y: number }; delta: { x: number; y: number } }) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === id) {
          return {
            ...n,
            x: Math.max(20, Math.min(330, n.x + info.delta.x)),
            y: Math.max(25, Math.min(195, n.y + info.delta.y)),
          };
        }
        return n;
      })
    );
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#0D0D1A] to-[#07070F] border border-violet-500/30 p-5 sm:p-6 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-mono font-bold text-violet-300">
            TALENTDNA // FORCE-DIRECTED MOBILITY GRAPH
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/40">DRAGGABLE NODES</span>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative w-full h-[220px] bg-black/60 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Edges */}
          {EDGES.map((edge, idx) => {
            const source = nodes.find((n) => n.id === edge.from);
            const target = nodes.find((n) => n.id === edge.to);
            if (!source || !target) return null;

            const isHighlighted =
              activeNode && (activeNode.id === edge.from || activeNode.id === edge.to);

            return (
              <line
                key={idx}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={isHighlighted ? "#5FF0D2" : "rgba(139, 92, 246, 0.3)"}
                strokeWidth={isHighlighted ? 2.5 : 1.2}
                strokeDasharray={isHighlighted ? "4 2" : "none"}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isSelected = activeNode?.id === node.id;
          return (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              onDrag={(e, info) => handleDrag(node.id, info)}
              onMouseEnter={() => {
                soundFx.playChirp(740, 0.04);
                setActiveNode(node);
              }}
              onMouseLeave={() => setActiveNode(null)}
              style={{
                left: node.x - 28,
                top: node.y - 20,
              }}
              className="absolute z-10 w-14 h-10 rounded-xl cursor-grab active:cursor-grabbing flex flex-col items-center justify-center p-1 backdrop-blur-md shadow-lg transition-transform"
            >
              <div
                className="w-full h-full rounded-lg flex flex-col items-center justify-center border text-[9px] font-mono font-bold leading-tight text-center px-0.5"
                style={{
                  backgroundColor: "rgba(13, 13, 26, 0.88)",
                  borderColor: isSelected ? "#5FF0D2" : node.color,
                  boxShadow: isSelected ? `0 0 16px ${node.color}` : "none",
                  color: isSelected ? "#5FF0D2" : "white",
                }}
              >
                {node.label}
              </div>
            </motion.div>
          );
        })}

        {/* Hover inspector badge */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono bg-black/70 px-3 py-1.5 rounded-lg border border-white/10 pointer-events-none">
          <span className="text-white/60">
            {activeNode ? `NODE: ${activeNode.label}` : "HOVER / DRAG TO INSPECT EDGES"}
          </span>
          <span className="text-teal-300">
            {activeNode ? activeNode.role : "FORCE-DIRECTED VECTOR"}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-mono">
        <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-1 text-violet-300 font-bold">
            <Zap className="w-3 h-3 text-violet-400" />
            <span>30+</span>
          </div>
          <span className="text-[10px] text-white/50 text-center">SKILL PAIRS</span>
        </div>

        <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-1 text-teal-300 font-bold">
            <TrendingUp className="w-3 h-3 text-teal-400" />
            <span>94%</span>
          </div>
          <span className="text-[10px] text-white/50 text-center">READINESS</span>
        </div>

        <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
          <div className="flex items-center gap-1 text-amber-300 font-bold">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>-35%</span>
          </div>
          <span className="text-[10px] text-white/50 text-center">TRAINING TIME</span>
        </div>
      </div>
    </div>
  );
}
