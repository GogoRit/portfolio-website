import React from "react";
import { Button } from "../ui/button";
import { Github, Linkedin, Download } from "lucide-react";
import { EmbeddedChat } from "../EmbeddedChat";
import { MapPin, GraduationCap, Building } from "lucide-react";

const HeroSection: React.FC = () => (
  <section id="home" className="pt-20 lg:pt-28 pb-8 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6 animate-slide-up">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Hi, I'm <span className="gradient-text">Gaurank</span> —
            building <span className="gradient-text">AI systems</span> with
            impact, adaptability, and curiosity.
          </h1>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
            AI Developer at Magic Spell Studios & MS Data Science student at
            RIT (4.0 GPA). Specializing in LangChain, Generative AI, and
            scalable ML systems for real-world applications.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Rochester, NY
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              RIT - Expected Dec 2025
            </span>
            <span className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              Magic Spell Studios
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Button size="lg" className="glow-hover">
              <Download className="w-5 h-5 mr-2" />
              Resume
            </Button>
            <Button variant="outline" size="lg" className="glass-card-hover">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="lg" className="glass-card-hover">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection; 