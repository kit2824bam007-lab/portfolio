"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CoastGuardTerrainCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070f, 0.008);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    camera.position.set(0, 50, 75);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const gridX = 36;
    const gridY = 36;
    const terrainGeo = new THREE.PlaneGeometry(80, 80, gridX, gridY);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);
      const elevation = Math.sin(x * 0.12) * Math.cos(z * 0.12) * 5 + Math.sin(distFromCenter * 0.15) * 3;
      pos.setY(i, elevation);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x0e1b2e,
      wireframe: true,
      roughness: 0.8,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrainMesh);

    const ambLight = new THREE.AmbientLight(0x5ff0d2, 0.4);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0x8b5cf6, 1.2);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    const ringGeo = new THREE.RingGeometry(1, 1.6, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const sonarRing = new THREE.Mesh(ringGeo, ringMat);
    sonarRing.position.set(10, 4, -5);
    scene.add(sonarRing);

    const swarmCount = 16;
    const swarmGeo = new THREE.SphereGeometry(0.8, 8, 8);
    const swarmMat = new THREE.MeshBasicMaterial({ color: 0x5ff0d2 });
    const swarmGroup = new THREE.Group();

    const swarmData: { mesh: THREE.Mesh; target: THREE.Vector3; speed: number }[] = [];
    for (let i = 0; i < swarmCount; i++) {
      const agentMesh = new THREE.Mesh(swarmGeo, swarmMat);
      agentMesh.position.set(
        (Math.random() - 0.5) * 60,
        5 + Math.random() * 5,
        (Math.random() - 0.5) * 60
      );
      swarmGroup.add(agentMesh);
      swarmData.push({
        mesh: agentMesh,
        target: new THREE.Vector3(10 + (Math.random() - 0.5) * 8, 4, -5 + (Math.random() - 0.5) * 8),
        speed: 0.02 + Math.random() * 0.02,
      });
    }
    scene.add(swarmGroup);

    let mouseX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseX = x;
    };
    container.addEventListener("mousemove", handleMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animationId: number;
    let clock = new THREE.Clock();
    let ringScale = 1;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      terrainMesh.rotation.y = time * 0.08 + mouseX * 0.3;
      swarmGroup.rotation.y = terrainMesh.rotation.y;
      sonarRing.rotation.y = terrainMesh.rotation.y;

      ringScale += 0.25;
      if (ringScale > 22) {
        ringScale = 1;
      }
      sonarRing.scale.set(ringScale, ringScale, 1);
      ringMat.opacity = Math.max(0, 1 - ringScale / 22);

      swarmData.forEach((agent) => {
        agent.mesh.position.lerp(agent.target, agent.speed);
        agent.mesh.position.y += Math.sin(time * 3 + agent.speed * 100) * 0.05;
        if (agent.mesh.position.distanceTo(agent.target) < 2) {
          agent.target.set(
            (Math.random() - 0.5) * 40,
            4 + Math.random() * 4,
            (Math.random() - 0.5) * 40
          );
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      swarmGeo.dispose();
      swarmMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[260px] rounded-xl overflow-hidden bg-black/40 border border-cyan-500/20"
    />
  );
}
