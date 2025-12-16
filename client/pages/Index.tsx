import React from "react";
import HeroSection from "../components/sections/HeroSection";
import TimelineSection from "../components/sections/TimelineSection";
import ResearchSection from "../components/sections/ResearchSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import NowSection from "../components/sections/NowSection";
import SkillsSection from "../components/sections/SkillsSection";
import ContactSection from "../components/sections/ContactSection";
import CertificationsDeck from "../components/CertificationsDeck";

const Index: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-silver via-white to-silver">
      {/* Hero Section - First to appear */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Timeline Section - Career timeline and experience */}
      <section id="timeline">
        <TimelineSection />
      </section>

      {/* Research Section - Featured research projects */}
      <section id="research">
        <ResearchSection />
      </section>

      {/* Projects Section - Featured projects */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Now Section - Current status and activities */}
      <section id="now">
        <NowSection />
      </section>

      {/* Skills Section - Technical abilities and expertise */}
      <section id="skills">
        <SkillsSection />
      </section>

      {/* Certifications Section - Training and credentials */}
      <section id="certifications">
        <div className="max-w-6xl mx-auto px-4">
          <CertificationsDeck />
        </div>
      </section>

      {/* Contact Section - Final sections with landing impact */}
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
};

export default Index;
