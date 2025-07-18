import React from "react";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TimelineSection from "../components/sections/TimelineSection";
import NowSection from "../components/sections/NowSection";
import SkillsSection from "../components/sections/SkillsSection";
import ContactSection from "../components/sections/ContactSection";
import { useAnimation } from "../contexts/AnimationContext";

const Index: React.FC = () => {
  const { showMainPage } = useAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-silver via-white to-silver">
      {/* Hero Section - First to appear */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Projects Section - Appears with energy */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Timeline Section - Wakes up with landing energy */}
      <section id="timeline">
        <TimelineSection />
      </section>

      {/* Now Section - Current status and activities */}
      <section id="now">
        <NowSection />
      </section>

      {/* Skills Section - Technical abilities and expertise */}
      <section id="skills">
        <SkillsSection />
      </section>

      {/* Contact Section - Final sections with landing impact */}
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
};

export default Index;
