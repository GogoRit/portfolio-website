import React from "react";
import { Button } from "../ui/button";
import { Github, Linkedin, Download } from "lucide-react";
import { EmbeddedChat } from "../EmbeddedChat";
import { MapPin, GraduationCap, Building } from "lucide-react";

const HeroSection: React.FC = () => (
  <section id="home" className="pt-24 lg:pt-32 pb-12 relative overflow-hidden min-h-screen">
    {/* Apple-style background with subtle gradients */}
    <div className="absolute inset-0 bg-gradient-to-br from-silver/30 via-white to-blue/5"></div>
    
    {/* Floating geometric elements for depth */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue/10 to-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-green/10 to-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple/5 to-pink/5 rounded-full blur-3xl"></div>
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <div className="space-y-8 animate-slide-up">
          {/* Main heading with Apple-style typography */}
          <h1 className="text-6xl lg:text-8xl font-light leading-tight tracking-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue to-purple bg-clip-text text-transparent font-medium">
              Gaurank
            </span>
            <br />
            building{" "}
            <span className="bg-gradient-to-r from-green to-blue bg-clip-text text-transparent font-medium">
              AI systems
            </span>{" "}
            with
            <br />
            impact, adaptability, and curiosity.
          </h1>
          
          {/* Subtitle with improved typography */}
          <p className="text-xl lg:text-2xl text-graphite/80 max-w-4xl mx-auto font-light leading-relaxed">
            AI Developer at Magic Spell Studios & MS Data Science student at
            RIT (4.0 GPA). Specializing in LangChain, Generative AI, and
            scalable ML systems for real-world applications.
          </p>
          
          {/* Apple-style info badges */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-graphite/60">
            <span className="flex items-center gap-2 px-4 py-2 rounded-apple-pill bg-silver/50 backdrop-blur-sm border border-silver/30">
              <MapPin className="w-4 h-4" />
              Rochester, NY
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-apple-pill bg-silver/50 backdrop-blur-sm border border-silver/30">
              <GraduationCap className="w-4 h-4" />
              RIT - Expected Dec 2025
            </span>
            <span className="flex items-center gap-2 px-4 py-2 rounded-apple-pill bg-silver/50 backdrop-blur-sm border border-silver/30">
              <Building className="w-4 h-4" />
              Magic Spell Studios
            </span>
          </div>
          
          {/* Apple-style action buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-12">
            <Button 
              size="lg" 
              className="bg-blue text-white hover:bg-blue/90 shadow-apple-sm hover:shadow-apple-md transition-all duration-apple ease-apple-ease hover:scale-105 rounded-apple-pill px-8 py-3"
            >
              <Download className="w-5 h-5 mr-2" />
              Resume
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/80 backdrop-blur-sm border-silver/30 text-graphite hover:bg-white/90 hover:border-silver/50 shadow-apple-sm hover:shadow-apple-md transition-all duration-apple ease-apple-ease hover:scale-105 rounded-apple-pill px-8 py-3"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/80 backdrop-blur-sm border-silver/30 text-graphite hover:bg-white/90 hover:border-silver/50 shadow-apple-sm hover:shadow-apple-md transition-all duration-apple ease-apple-ease hover:scale-105 rounded-apple-pill px-8 py-3"
            >
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