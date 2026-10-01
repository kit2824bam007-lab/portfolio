"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface NeuralFieldProps {
  scrollProgress?: number;
}

export default function NeuralFieldCanvas({ scrollProgress = 0 }: NeuralFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070f, 0.0018);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 240;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 1. Rotating Icosahedron Wireframe
    const icoGeometry = new THREE.IcosahedronGeometry(130, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icosahedron);

    // 2. Neural Nodes (Particles)
    const particleCount = 150;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];
    const originalPositions: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 60 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      originalPositions.push({ x, y, z });
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleColors = new Float32Array(particleCount * 3);
    const teal = new THREE.Color(0x5ff0d2);
    const violet = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      const c = Math.random() > 0.4 ? teal : violet;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 3. Synapse Connections (Lines)
    const maxLineSegments = 350;
    const linePositions = new Float32Array(maxLineSegments * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5ff0d2,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      icosahedron.rotation.x = elapsedTime * 0.08 + mouse.y * 0.4;
      icosahedron.rotation.y = elapsedTime * 0.12 + mouse.x * 0.5;

      const currentScroll = scrollRef.current;
      camera.position.z = 240 - currentScroll * 120;
      camera.position.y = -currentScroll * 50;

      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const vel = particleVelocities[i];
        const orig = originalPositions[i];

        positions[idx] += vel.x;
        positions[idx + 1] += vel.y;
        positions[idx + 2] += vel.z;

        const distFromOrig = Math.sqrt(
          Math.pow(positions[idx] - orig.x, 2) +
          Math.pow(positions[idx + 1] - orig.y, 2) +
          Math.pow(positions[idx + 2] - orig.z, 2)
        );
        if (distFromOrig > 25) {
          vel.x = -vel.x;
          vel.y = -vel.y;
          vel.z = -vel.z;
        }

        const dx = positions[idx] - mouse.x * 100;
        const dy = positions[idx + 1] - mouse.y * 100;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 50) {
          positions[idx] += (dx / d) * 0.8;
          positions[idx + 1] += (dy / d) * 0.8;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      let lineIndex = 0;
      const maxConnectDist = 42;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex >= maxLineSegments * 6) break;
          const p1x = positions[i * 3];
          const p1y = positions[i * 3 + 1];
          const p1z = positions[i * 3 + 2];

          const p2x = positions[j * 3];
          const p2y = positions[j * 3 + 1];
          const p2z = positions[j * 3 + 2];

          const dist = Math.sqrt(
            Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2) + Math.pow(p1z - p2z, 2)
          );

          if (dist < maxConnectDist) {
            linePositions[lineIndex++] = p1x;
            linePositions[lineIndex++] = p1y;
            linePositions[lineIndex++] = p1z;
            linePositions[lineIndex++] = p2x;
            linePositions[lineIndex++] = p2y;
            linePositions[lineIndex++] = p2z;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      particleSystem.rotation.y = elapsedTime * 0.05;
      lineSegments.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
