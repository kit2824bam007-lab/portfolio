"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AuroraSingularityOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 24;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const sphereGeo = new THREE.SphereGeometry(6, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x5ff0d2,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    orbGroup.add(coreSphere);

    const innerGeo = new THREE.SphereGeometry(4.2, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    orbGroup.add(innerCore);

    const ring1Geo = new THREE.TorusGeometry(8.5, 0.08, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x5ff0d2,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    orbGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(10, 0.06, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xc026d3,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    orbGroup.add(ring2);

    const haloCount = 60;
    const haloGeo = new THREE.BufferGeometry();
    const haloPos = new Float32Array(haloCount * 3);
    for (let i = 0; i < haloCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 7 + Math.random() * 4;
      haloPos[i * 3] = Math.cos(angle) * r;
      haloPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      haloPos[i * 3 + 2] = Math.sin(angle) * r;
    }
    haloGeo.setAttribute("position", new THREE.BufferAttribute(haloPos, 3));
    const haloMat = new THREE.PointsMaterial({
      size: 0.25,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const haloPoints = new THREE.Points(haloGeo, haloMat);
    orbGroup.add(haloPoints);

    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotX = y * 0.8;
      targetRotY = x * 0.8;
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

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      orbGroup.rotation.x += (targetRotX - orbGroup.rotation.x) * 0.05;
      orbGroup.rotation.y += (targetRotY - orbGroup.rotation.y) * 0.05;

      coreSphere.rotation.y = elapsed * 0.2;
      coreSphere.rotation.z = elapsed * 0.1;

      ring1.rotation.z = elapsed * 0.4;
      ring2.rotation.x = elapsed * 0.35;
      haloPoints.rotation.y = -elapsed * 0.25;

      const scale = 1 + Math.sin(elapsed * 2) * 0.04;
      innerCore.scale.set(scale, scale, scale);

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
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-72 h-72 md:w-88 md:h-88 mx-auto flex items-center justify-center cursor-pointer select-none"
    />
  );
}
