"use client";

import React, { useState, useEffect } from "react";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navbar from "@/components/navigation/Navbar";
import PurpleAmbientBackground from "@/components/ui/PurpleAmbientBackground";
import DryBrushWipeHero from "@/components/hero/DryBrushWipeHero";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CodingSection from "@/components/sections/CodingSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import ResumeModal from "@/components/modals/ResumeModal";
import { useLenisScroll } from "@/lib/useLenis";

export default function PortfolioPage() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Lenis smooth scroll
  useLenisScroll();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
      }

      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "skills",
        "coding",
        "certifications",
        "achievements",
        "education",
        "contact",
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExploreWork = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#FAF7F2] text-[#1A1815] selection:bg-[#FF5C38]/20 selection:text-[#FF5C38] overflow-x-hidden">
      {/* Dynamic Ambient Background with soft warm radiance */}
      <PurpleAmbientBackground />

      {/* Tactile Magnetic Cursor */}
      <CustomCursor />

      {/* Editorial Top Bar Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenResume={() => setResumeOpen(true)}
        scrollProgress={scrollProgress}
      />

      {/* 01 // HERO — "Visible Portrait Cover + Dry-Brush Wipe Reveal" */}
      <DryBrushWipeHero
        onOpenResume={() => setResumeOpen(true)}
        onExploreWork={handleExploreWork}
      />

      {/* 02 // ABOUT — Beyond the Code */}
      <AboutSection />

      {/* 03 // EXPERIENCE — Abservetech Private Limited */}
      <ExperienceSection />

      {/* 04 // PROJECTS — Systems I've Built (Complete All 4 Projects) */}
      <ProjectsSection />

      {/* 05 // SKILLS — The Stack (All 5 Category Groups Visible on Load) */}
      <SkillsSection />

      {/* 06 // CODING — Proof of Practice (All CP Platform Stats) */}
      <CodingSection />

      {/* 07 // CERTIFICATIONS — Verified Credentials */}
      <CertificationsSection />

      {/* 08 // ACHIEVEMENTS — Proof of Practice Milestones */}
      <AchievementsSection />

      {/* 09 // EDUCATION — Academic Pedigree */}
      <EducationSection />

      {/* 10 // CONTACT — "Let's Build Something Intelligent." */}
      <ContactSection />

      {/* Editorial Footer */}
      <footer className="relative z-10 py-12 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#1A1815]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-editorial-mono text-[#1A1815]/70">
        <div>
          ARCHANA DEVI M © 2026 · ALL RIGHTS RESERVED · KIT COIMBATORE
        </div>
        <div className="flex items-center gap-2 text-[#2563EB]">
          <span className="w-2 h-2 rounded-full bg-[#FF5C38] animate-pulse" />
          <span className="font-bold tracking-wider uppercase">CRAFTING INTELLIGENT EXPERIENCES ✦</span>
        </div>
      </footer>

      {/* Verified Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}
